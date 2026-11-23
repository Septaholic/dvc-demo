import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const assetExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.json'];

function getMimeType(urlOrPath) {
  let clean = urlOrPath.toLowerCase().split('?')[0].split('@')[0];
  let ext = path.extname(clean);
  if (mimeTypes[ext]) return mimeTypes[ext];
  if (clean.endsWith('.css')) return 'text/css; charset=utf-8';
  if (clean.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (clean.endsWith('.html') || clean.endsWith('.htm')) return 'text/html; charset=utf-8';
  return 'application/octet-stream';
}

function handleDvcRequest(req, res, next) {
  if (!req.url) return next();

  let [rawPath, search] = req.url.split('?');
  let cleanUrl = rawPath;
  try {
    cleanUrl = decodeURIComponent(rawPath);
  } catch (e) {
    cleanUrl = rawPath.replace(/%40/g, '@');
  }

  // 1. Root redirect or missing /p/home/ prefix
  if (cleanUrl.startsWith('/dvc-')) {
    let target = '/p/home' + cleanUrl;
    let publicCheck = path.join(process.cwd(), 'public', target);
    if (!fs.existsSync(publicCheck) && fs.existsSync(publicCheck + '.html')) {
      target += '.html';
    }
    res.writeHead(302, {
      Location: target + (search ? '?' + search : '')
    });
    res.end();
    return;
  }

  // 2. Static Asset handling (CSS, JS, Fonts, Images)
  let cleanLower = cleanUrl.toLowerCase();
  let isAsset = assetExtensions.some(ext => cleanLower.endsWith(ext));

  if (isAsset) {
    let relPath = cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl;
    let filePath = path.join(process.cwd(), 'public', relPath);

    // If file exists as-is, serve it directly with strict MIME type
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.setHeader('Content-Type', getMimeType(cleanUrl));
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // If search exists (e.g. ?version=9) and file was saved with @
    if (search) {
      let candidate = filePath + '@' + search;
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        res.setHeader('Content-Type', getMimeType(cleanUrl));
        fs.createReadStream(candidate).pipe(res);
        return;
      }
    }
  }

  // 3. Query string mapping for HTML pages (e.g. ?group=750 or ?ma_thu_tuc=...)
  if (search && !isAsset) {
    let candidate = cleanUrl + '@' + search;
    let candidateFile = path.join(process.cwd(), 'public', candidate.startsWith('/') ? candidate.slice(1) : candidate);
    let targetFound = null;
    if (fs.existsSync(candidateFile) && fs.statSync(candidateFile).isFile()) {
      targetFound = candidateFile;
    } else if (fs.existsSync(candidateFile + '.html') && fs.statSync(candidateFile + '.html').isFile()) {
      targetFound = candidateFile + '.html';
    }

    if (targetFound) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      fs.createReadStream(targetFound).pipe(res);
      return;
    }
  }

  // 4. Serve HTML / static files directly from public directory
  let relPath = cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl;
  let filePath = path.join(process.cwd(), 'public', relPath);

  // If no extension or missing .html, check if .html exists
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.setHeader('Content-Type', getMimeType(filePath));
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // 5. Default home fallback
  if (cleanUrl === '/p/home' || cleanUrl === '/p/home/' || cleanUrl === '/p/home/dvc-trang-chu') {
    let homeFile = path.join(process.cwd(), 'public', 'p', 'home', 'dvc-trang-chu.html');
    if (fs.existsSync(homeFile)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      fs.createReadStream(homeFile).pipe(res);
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
        ignored: ['**/backup/**', '**/dist/**', '**/.git/**', '**/.astro/**']
      }
    },
    plugins: [
      {
        name: 'dvc-portal-dev-middleware',
        configureServer(server) {
          server.middlewares.stack.unshift({
            route: '',
            handle: handleDvcRequest
          });
        }
      }
    ]
  }
});
