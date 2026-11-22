import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  trailingSlash: 'ignore',
  build: {
    format: 'file'
  },
  vite: {
    plugins: [
      {
        name: 'dvc-portal-dev-middleware',
        configureServer(server) {
          return () => {
            // Loại bỏ devRouteGuard của Astro vì nó chặn nhầm các request /p/... khi thư mục p/ tồn tại ở root
            const guardIdx = server.middlewares.stack.findIndex(m => m.handle && m.handle.name === 'devRouteGuard');
            if (guardIdx !== -1) {
              server.middlewares.stack.splice(guardIdx, 1);
            }

            // Chèn middleware của chúng ta lên vị trí đầu tiên
            server.middlewares.stack.unshift({
              route: '',
              handle: (req, res, next) => {
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
                  res.writeHead(302, {
                    Location: '/p/home' + cleanUrl + (search ? '?' + search : '')
                  });
                  res.end();
                  return;
                }

                // 2. Phục vụ file tĩnh trong public/p/home/
                if (cleanUrl.startsWith('/p/home/')) {
                  let filePath = path.join(process.cwd(), 'public', cleanUrl);
                  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                    let ext = path.extname(filePath).toLowerCase();
                    let mimeTypes = {
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
            });
          };
        }
      }
    ]
  }
});
