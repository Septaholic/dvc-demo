# WEB DVC DEMO

Được thiêt lập trên Astro, đây là bản 2 của web demo

---

## I. [ASTRO](https://astro.build)

Phần này chỉ dành cho khi muốn clone về và tự thiết lập theo cách của b

Astro là một web framework với mã nguồn mở và được dùng cho content-driven websites

```bash
# Mặc định đầu tiên trước khi sử dụng, nên cài các dependencies
npm i
```

Máy ai chả có npm đúng ko :v

Hệ thống đã được thiết lập sẵn các lệnh chuẩn trong `package.json`

Port mặc định cho localhost là 4321/4322, vào package.json để đổi. Nếu bị trùng port thì Astro sẽ tự động chọn một port free xung quanh 4321 (check terminal để biết chi tiết)

[Đọc thêm về Astro dev server](https://docs.astro.build/en/develop-and-build/#start-the-astro-dev-server)

### 1. Astro Dev mode
Chạy server:
```bash
npm run dev
# hoặc: npx astro dev --port 4322 --host
```
Truy cập localhost theo port đã nhập

### 2. Build & Preview
Sẽ build website vào `dist/`, build và preview bằng:
```bash
npm run build
npm run preview
# hoặc: npx astro preview --port 4321 --host
```

---

## II. DANH SÁCH CÁC TRANG

Sẽ đc cập nhật sau khi hoàn thành

---

## III. CẤU TRÚC MÃ NGUỒN

```
dvc-demo\
├── astro.config.mjs              # Cấu hình Astro & Vite middleware giả lập API từ HAR
├── package.json                  # Cấu hình npm scripts & dependencies
├── public/                       # Tài nguyên tĩnh SPA & dữ liệu giả lập API
│   ├── api-mocks.json            # 163 API endpoints trích xuất từ file har (không có ở mã nguồn)
│   ├── assets/                   # Chunks JS, CSS, GeoJSON của React SPA portal
│   ├── fonts/                    # Font chữ Inter, Nunito Sans
│   ├── imgs/                     # Hình ảnh, icon, logo, quốc huy SVG
│   ├── index.html                # Single Page Application HTML chính
│   ├── file-preview-sw.js        # Service worker hỗ trợ xem trước tệp
│   ├── robots.txt, sitemap.xml   # Cấu hình SEO và danh sách 62+ route chính thức
│   └── site.webmanifest          # Manifest PWA của Cổng Dịch vụ công Quốc gia
├── src/
│   └── pages/                    # Các trang tĩnh Astro
│       ├── 404.astro             # Trang fallback 404 điều hướng SPA client-side
│       └── [...slug].astro       # Dynamic route sinh trước 62 trang tĩnh từ sitemap
└── dist/                         # Thư mục kết xuất sau khi chạy npm run build
```

---