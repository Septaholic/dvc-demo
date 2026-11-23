import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
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
  '.ttf': 'font/ttf'
};

function handleDvcRequest(req, res, next) {
  if (!req.url) return next();

  let [rawPath, search] = req.url.split('?');
  let cleanUrl = rawPath;
  try {
    cleanUrl = decodeURIComponent(rawPath);
  } catch (e) {
    cleanUrl = rawPath.replace(/%40/g, '@');
  }

  // 1. Tự động chuyển hướng nếu người dùng truy cập /dvc-* ở root (thiếu /p/home/)
  if (cleanUrl.startsWith('/dvc-')) {
    let target = '/p/home' + cleanUrl;
    // Nếu file tương ứng có đuôi .html thì gắn thêm .html
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

  // 2. Phục vụ file tĩnh trong public/p/home/
  if (cleanUrl.startsWith('/p/home/')) {
    let filePath = path.join(process.cwd(), 'public', cleanUrl);
    // Nếu truy cập không có .html nhưng trên đĩa có file .html
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      let ext = path.extname(filePath).toLowerCase();
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // 3. Nếu truy cập file .html tương ứng với page .astro (ví dụ /p/home/dvc-trang-chu.html)
    if (cleanUrl.endsWith('.html')) {
      let astroCandidate = cleanUrl.slice(0, -5) + '.astro';
      let astroFile = path.join(process.cwd(), 'src', 'pages', astroCandidate);
      if (fs.existsSync(astroFile)) {
        res.writeHead(302, {
          Location: rawPath.replace(/\.html$/, '') + (search ? '?' + search : '')
        });
        res.end();
        return;
      }
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
          // Pre-middleware để xử lý sớm nhất
          server.middlewares.use(handleDvcRequest);

          return () => {
            // Post-middleware dự phòng
            server.middlewares.stack.unshift({
              route: '',
              handle: handleDvcRequest
            });
          };
        }
      }
    ]
  }
});
