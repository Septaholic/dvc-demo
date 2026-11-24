import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

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
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml; charset=utf-8'
};

const assetExtensions = ['.css', '.js', '.mjs', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.json', '.webmanifest', '.xml'];

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
    .replace(/https:\/\/lienthong\.dichvucong\.gov\.vn/g, `${base}/_ext/lienthong.dichvucong.gov.vn`)
    .replace(/http:\/\/lienthong\.dichvucong\.gov\.vn/g, `${base}/_ext/lienthong.dichvucong.gov.vn`)
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

  let host = 'dichvucong.gov.vn';
  let lookupPath = cleanUrl;
  if (cleanUrl.startsWith('/_ext/')) {
    const rest = cleanUrl.slice('/_ext/'.length);
    const slashIdx = rest.indexOf('/');
    if (slashIdx !== -1) {
      host = rest.slice(0, slashIdx);
      lookupPath = rest.slice(slashIdx);
    } else {
      host = rest;
      lookupPath = '/';
    }
  }

  // 1. API Mock Matching
  const isApi = cleanUrl.includes('/api/') || cleanUrl.includes('/oauth2/') || method !== 'GET';
  if (isApi) {
    const dispatchMock = (bodyText) => {
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
    };

    if (req.readableEnded) {
      const b = req.body ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) : '';
      dispatchMock(b);
    } else {
      let bodyChunks = [];
      req.on('data', chunk => bodyChunks.push(chunk));
      req.on('end', () => {
        const bodyText = Buffer.concat(bodyChunks).toString('utf8');
        dispatchMock(bodyText);
      });
      req.on('error', () => dispatchMock(''));
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
