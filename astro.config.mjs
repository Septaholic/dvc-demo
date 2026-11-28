import { defineConfig } from 'astro/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const moduleCache = {
  portal: { path: path.resolve('server/dvc-portal-engine.mjs'), mtime: 0, mod: null },
  search: { path: path.resolve('server/search-engine.mjs'), mtime: 0, mod: null }
};

async function loadFreshModule(entry) {
  const mtime = fs.statSync(entry.path).mtimeMs;
  if (!entry.mod || entry.mtime !== mtime) {
    entry.mod = await import(`${pathToFileURL(entry.path).href}?v=${mtime}`);
    entry.mtime = mtime;
  }
  return entry.mod;
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml; charset=utf-8'
};

const assetExtensions = ['.css', '.js', '.mjs', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.json', '.webmanifest', '.xml'];

const eioSessions = new Map();

function wakeEioWaiter(session) {
  if (!session || !session.waiter || session.pending.length === 0) return;
  const finish = session.waiter;
  session.waiter = null;
  const payload = session.pending.splice(0).join('\x1e');
  finish(payload);
}

function handleSocketIoRequest(req, res, query, method) {
  const qp = new URLSearchParams(query || '');
  const sid = qp.get('sid') || '';

  if (!sid && method === 'GET') {
    const newSid = crypto.randomBytes(12).toString('base64url');
    eioSessions.set(newSid, { pending: [], waiter: null });
    const body = '0' + JSON.stringify({
      sid: newSid,
      upgrades: [],
      pingInterval: 25000,
      pingTimeout: 20000,
      maxPayload: 1000000
    });
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(body);
    return;
  }

  let session = eioSessions.get(sid);
  if (!session && sid) {
    session = { pending: [], waiter: null };
    eioSessions.set(sid, session);
  }

  if (method === 'POST') {
    const readAndReply = (rawText) => {
      if (session) {
        const packets = String(rawText || '').split('\x1e').filter(Boolean);
        for (const pkt of packets) {
          if (pkt === '40' || pkt.startsWith('40{') || pkt.startsWith('40/')) {
            session.pending.push('40' + JSON.stringify({ sid: `${sid}-ns` }));
            session.pending.push('42["connected"]');
          }
        }
        wakeEioWaiter(session);
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('ok');
    };
    if (req.readableEnded) {
      readAndReply(typeof req.body === 'string' ? req.body : '');
    } else {
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => readAndReply(Buffer.concat(chunks).toString('utf8')));
      req.on('error', () => readAndReply(''));
    }
    return;
  }

  if (!session) {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ code: 1, message: 'Session ID unknown' }));
    return;
  }

  if (session.pending.length > 0) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(session.pending.splice(0).join('\x1e'));
    return;
  }

  // Long-poll safely with clean teardown instead of busy polling
  let settled = false;
  const cleanup = () => {
    clearTimeout(timer);
    if (session.waiter === finish) session.waiter = null;
  };
  const finish = (payload) => {
    if (settled) return;
    settled = true;
    cleanup();
    if (!res.writableEnded) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(payload);
    }
  };
  const timer = setTimeout(() => finish('2'), 20000);
  session.waiter = finish;
  req.on('close', () => {
    settled = true;
    cleanup();
  });
}

function getMimeType(urlOrPath) {
  let clean = urlOrPath.toLowerCase().split('?')[0].split('@')[0];
  let ext = path.extname(clean);
  if (mimeTypes[ext]) return mimeTypes[ext];
  if (clean.endsWith('.css')) return 'text/css; charset=utf-8';
  if (clean.endsWith('.js') || clean.endsWith('.mjs')) return 'application/javascript; charset=utf-8';
  if (clean.endsWith('.html') || clean.endsWith('.htm')) return 'text/html; charset=utf-8';
  return 'application/octet-stream';
}

// Load pre-extracted API mocks
let apiMocks = [];
try {
  const mocksFile = path.resolve('public/api-mocks.json');
  if (fs.existsSync(mocksFile)) {
    apiMocks = JSON.parse(fs.readFileSync(mocksFile, 'utf8'));
    console.log(`[DVC Portal] Loaded ${apiMocks.length} API mocks.`);
  }
} catch (e) {
  console.warn('[DVC Portal] Failed to load api-mocks.json:', e);
}

function similarity(s1, s2) {
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  let matches = 0;
  const shorterMap = {};
  for (let i = 0; i < shorter.length - 1; i++) {
    const bg = shorter.substring(i, i + 2);
    shorterMap[bg] = (shorterMap[bg] || 0) + 1;
  }
  for (let i = 0; i < longer.length - 1; i++) {
    const bg = longer.substring(i, i + 2);
    if (shorterMap[bg] > 0) {
      matches++;
      shorterMap[bg]--;
    }
  }
  return (2.0 * matches) / (s1.length + s2.length - 2);
}

function findApiMock(method, host, reqPath, query, bodyText) {
  const candidates = apiMocks.filter(m => m.method === method && m.path === reqPath);
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];

  for (let i = candidates.length - 1; i >= 0; i--) {
    if (candidates[i].query === query && candidates[i].bodyText === bodyText) {
      return candidates[i];
    }
  }

  const sig = `${query}\n${bodyText}`;
  let best = candidates[0];
  let bestScore = -1;
  for (const c of candidates) {
    const score = similarity(sig, `${c.query}\n${c.bodyText}`);
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

function rewriteUrls(text, reqHost) {
  if (typeof text !== 'string') return text;
  const base = `http://${reqHost || 'localhost:4321'}`;
  return text
    .replace(/https:\/\/dichvucong\.gov\.vn/g, base)
    .replace(/http:\/\/dichvucong\.gov\.vn/g, base);
}

function handleDvcRequest(req, res, next) {
  if (!req.url) return next();

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const [rawPath, rawQuery] = req.url.split('?');
  let cleanUrl = rawPath;
  try {
    cleanUrl = decodeURIComponent(rawPath);
  } catch (e) {
    cleanUrl = decodeURI(rawPath);
  }
  const query = rawQuery || '';
  const method = (req.method || 'GET').toUpperCase();

  // Special direct overrides
  if (cleanUrl === '/file-preview-sw.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
    res.end('self.addEventListener("install",()=>self.skipWaiting());self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));');
    return;
  }

  if (cleanUrl === '/auth') {
    const ssoHtmlPath = path.resolve('public/sso-auth.html');
    if (fs.existsSync(ssoHtmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(rewriteUrls(fs.readFileSync(ssoHtmlPath, 'utf8'), req.headers.host));
      return;
    }
  }

  if (cleanUrl.startsWith('/TSbd/')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
    res.end('/* local stub */\n');
    return;
  }

  if (cleanUrl === '/_next/image') {
    const qp = new URLSearchParams(query);
    const targetUrl = qp.get('url') || '';
    const baseName = path.basename(targetUrl.split('?')[0]);
    const cacheDir = path.resolve('public/_next/image-cache');
    const webpCandidate = path.join(cacheDir, `${baseName}.webp`);
    const svgCandidate = path.join(cacheDir, `${baseName}.svg`);
    const relTarget = targetUrl.startsWith('/') ? targetUrl.slice(1) : targetUrl;
    const directCandidate = path.resolve('public', relTarget);

    if (baseName && fs.existsSync(webpCandidate)) {
      res.writeHead(200, { 'Content-Type': 'image/webp' });
      fs.createReadStream(webpCandidate).pipe(res);
      return;
    }
    if (baseName && fs.existsSync(svgCandidate)) {
      res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
      fs.createReadStream(svgCandidate).pipe(res);
      return;
    }
    if (relTarget && directCandidate.startsWith(path.resolve('public')) && fs.existsSync(directCandidate) && fs.statSync(directCandidate).isFile()) {
      res.writeHead(200, { 'Content-Type': getMimeType(directCandidate) });
      fs.createReadStream(directCandidate).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Image not found');
    return;
  }

  if (cleanUrl === '/favicon.ico' && !fs.existsSync(path.resolve('public/favicon.ico'))) {
    const vneidIco = path.resolve('public/favicon-vneid.ico');
    if (fs.existsSync(vneidIco)) {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      fs.createReadStream(vneidIco).pipe(res);
      return;
    }
  }

  if (cleanUrl === '/socket.io/' || cleanUrl === '/socket.io') {
    handleSocketIoRequest(req, res, query, method);
    return;
  }

  const host = 'dichvucong.gov.vn';
  const lookupPath = cleanUrl;

  // 1. Stateful Portal Backend, Dynamic Search, and API Mock Matching
  const isApi = cleanUrl.includes('/api/') || cleanUrl.includes('/oauth2/') || method !== 'GET';
  if (isApi) {
    const dispatchMock = async (rawBody) => {
      try {
        const bodyText = Buffer.isBuffer(rawBody) ? rawBody.toString('utf8') : String(rawBody || '');

        const { handlePortalApi } = await loadFreshModule(moduleCache.portal);
        const portalResult = handlePortalApi(method, host, lookupPath, query, rawBody, req);
        if (portalResult) {
          if (portalResult.isBinary && portalResult.buffer) {
            res.writeHead(portalResult.status || 200, {
              'Content-Type': portalResult.mime || 'application/octet-stream',
              'Content-Length': portalResult.buffer.length,
              'Access-Control-Allow-Origin': '*'
            });
            res.end(portalResult.buffer);
            return;
          }
          let payload = JSON.stringify(portalResult.body);
          payload = rewriteUrls(payload, req.headers.host);
          const buf = Buffer.from(payload, 'utf8');
          const extraHeaders = {};
          if (portalResult.headers && typeof portalResult.headers === 'object') {
            for (const [k, v] of Object.entries(portalResult.headers)) {
              extraHeaders[k] = typeof v === 'string' ? rewriteUrls(v, req.headers.host) : v;
            }
          }
          res.writeHead(portalResult.status || 201, {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': buf.length,
            'Access-Control-Allow-Origin': '*',
            ...extraHeaders
          });
          res.end(buf);
          return;
        }

        const { handleSearchApi } = await loadFreshModule(moduleCache.search);
        const searchResult = handleSearchApi(method, lookupPath, query, bodyText);
        if (searchResult) {
          let payload = JSON.stringify(searchResult.body);
          payload = rewriteUrls(payload, req.headers.host);
          const buf = Buffer.from(payload, 'utf8');
          res.writeHead(searchResult.status || 201, {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': buf.length,
            'Access-Control-Allow-Origin': '*'
          });
          res.end(buf);
          return;
        }

        const mock = findApiMock(method, host, lookupPath, query, bodyText);
        if (mock) {
          let payload = mock.text;
          if (payload !== null) {
            payload = rewriteUrls(payload, req.headers.host);
            const buf = Buffer.from(payload, 'utf8');
            res.writeHead(mock.status || 200, {
              'Content-Type': mock.mime || 'application/json; charset=utf-8',
              'Content-Length': buf.length,
              'Access-Control-Allow-Origin': '*'
            });
            res.end(buf);
            return;
          } else if (mock.rawB64) {
            const buf = Buffer.from(mock.rawB64, 'base64');
            res.writeHead(mock.status || 200, {
              'Content-Type': mock.mime || 'application/octet-stream',
              'Content-Length': buf.length,
              'Access-Control-Allow-Origin': '*'
            });
            res.end(buf);
            return;
          }
        }
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'not captured in demo.har', path: lookupPath }));
      } catch (err) {
        if (!res.writableEnded) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'internal error', message: err?.message || String(err) }));
        }
      }
    };

    if (req.readableEnded) {
      const b = req.body ? (typeof req.body === 'string' ? Buffer.from(req.body, 'utf8') : Buffer.from(JSON.stringify(req.body), 'utf8')) : Buffer.alloc(0);
      dispatchMock(b);
    } else {
      let bodyChunks = [];
      req.on('data', chunk => bodyChunks.push(chunk));
      req.on('end', () => {
        dispatchMock(Buffer.concat(bodyChunks));
      });
      req.on('error', () => dispatchMock(Buffer.alloc(0)));
    }
    return;
  }

  // 2. Static Assets (CSS, JS, Images, Fonts, JSON)
  const cleanLower = cleanUrl.toLowerCase();
  const isAsset = assetExtensions.some(ext => cleanLower.endsWith(ext));
  if (isAsset) {
    const relPath = cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl;
    const filePath = path.resolve('public', relPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const mime = getMimeType(cleanUrl);
      res.setHeader('Content-Type', mime);
      if (mime.includes('text') || mime.includes('javascript') || mime.includes('json')) {
        let text = fs.readFileSync(filePath, 'utf8');
        text = rewriteUrls(text, req.headers.host);
        res.end(text);
      } else {
        fs.createReadStream(filePath).pipe(res);
      }
      return;
    }
  }

  // 3. SPA Fallback for client-side React routes (extensionless GET)
  const hasExt = path.extname(cleanUrl);
  if (!hasExt && method === 'GET') {
    const indexPath = path.resolve('public/index.html');
    if (fs.existsSync(indexPath)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      let text = fs.readFileSync(indexPath, 'utf8');
      text = rewriteUrls(text, req.headers.host);
      res.end(text);
      return;
    }
  }

  next();
}

export default defineConfig({
  trailingSlash: 'ignore',
  build: {
    format: 'file'
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/backup/**', '**/backupv1/**', '**/backupv2/**', '**/dist/**', '**/.git/**', '**/.astro/**']
      }
    },
    plugins: [
      {
        name: 'dvc-portal-v2-dev-middleware',
        configureServer(server) {
          server.middlewares.stack.unshift({
            route: '',
            handle: handleDvcRequest
          });
        },
        configurePreviewServer(server) {
          server.middlewares.stack.unshift({
            route: '',
            handle: handleDvcRequest
          });
        }
      }
    ]
  }
});
