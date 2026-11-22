# DEMO DVC

---

## I. KHỞI CHẠY ASTRO

Hệ thống đã được thiết lập sẵn các lệnh chuẩn trong `package.json`:

Port mặc định cho localhost là 4321/4322, vào package.json để đổi

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

## II. DANH SÁCH CÁC TRANG CHÍNH TRÊN ASTRO

| Trang | Đường dẫn Astro | Ghi chú |
|:---|:---|:---|
| **Trang chủ chính** | `http://localhost:4321/` | Hero banner, tìm kiếm, khối 13 dịch vụ công trọng tâm, tabs phân loại Công dân & Doanh nghiệp |
| **Trang chủ Cổng (Alias)** | `http://localhost:4321/p/home/dvc-trang-chu.html` | Đường dẫn tương thích với định dạng cũ |
| **Tra cứu Thủ tục hành chính** | `http://localhost:4321/p/home/dvc-tthc-thu-tuc-hanh-chinh.html` | Tìm kiếm, lọc theo bộ ngành/lĩnh vực, phân trang thời gian thực với 129 TTHC |
| **Chi tiết Thủ tục hành chính** | `http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=...` | Hiển thị trình tự thực hiện, hồ sơ, cơ quan giải quyết, phí/lệ phí, căn cứ pháp lý & nút nộp trực tuyến |
| **Sự kiện đời thường Công dân** | `http://localhost:4321/p/home/dvc-chi-tiet-nhom-su-kien-cho-cong-dan.html?group=753` | 11 nhóm sự kiện công dân (Cư trú, Hôn nhân, Xây dựng...), accordion danh sách TTHC theo sự kiện |
| **Sự kiện đời thường Doanh nghiệp** | `http://localhost:4321/p/home/dvc-chi-tiet-nhom-su-kien-cho-doanh-nghiep.html?group=760` | 11 nhóm sự kiện doanh nghiệp (Khởi sự kinh doanh, Lao động, Đất đai, Thương mại, Sở hữu trí tuệ...) |
| **Câu hỏi thường gặp (FAQ)** | `http://localhost:4321/p/home/dvc-cau-hoi-pho-bien.html` | Tra cứu 237 câu hỏi thường gặp, tìm kiếm theo từ khoá, lọc theo lĩnh vực |
| **Chi tiết câu hỏi** | `http://localhost:4321/p/home/dvc-chi-tiet-cau-hoi.html?id=10334` | Hiển thị chi tiết nội dung giải đáp, căn cứ pháp luật, thủ tục liên quan |

---

## III. 13 DVC TRỌNG TÂM

| STT | Tên Dịch Vụ | Phân Loại | Nhóm Sự Kiện | Sự Kiện Con | Liên Kết (chỉ vào localhost) |
|:---:|:---|:---:|:---|:---|:---|
| **0** | **Cấp Giấy phép xây dựng** | Công dân & DN | Điện lực, nhà ở, đất đai (755) / Xây dựng (763) | Xây dựng công trình, nhà ở (313 / 283) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.002498) |
| **1** | **Cấp Giấy chứng nhận an toàn thực phẩm** | Doanh nghiệp | Thương mại, quảng cáo (764) | Kiểm tra chuyên ngành / ATTP (295) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000295) |
| **2** | **Đăng ký nuôi con nuôi** | Công dân | Hôn nhân và gia đình (754) | Nhận con nuôi (281) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=2.001263) |
| **3** | **Cấp giấy phép an ninh trật tự** | Doanh nghiệp | Khởi sự kinh doanh (760) | Kinh doanh có điều kiện (268) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000268) |
| **4** | **Cấp Giấy phép lao động cho người nước ngoài** | Công dân | Việc làm (752) | Cấp phép lao động cho NNN (267) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000267) |
| **5** | **Đăng ký tạm vắng** | Công dân | Cư trú và giấy tờ tùy thân (753) | Tạm vắng (363) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000363) |
| **6** | **Đăng ký trợ cấp bảo trợ xã hội** | Công dân | Việc làm, bảo hiểm, trợ cấp (752) | BHXH, thất nghiệp, trợ cấp (262) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000262) |
| **7** | **Đăng ký bảo hộ nhãn hiệu, logo** | Doanh nghiệp | Sở hữu trí tuệ, tài sản (765) | Nhãn hiệu (297) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000297) |
| **8** | **Thông báo hoạt động khuyến mại** | Doanh nghiệp | Thương mại, quảng cáo (764) | Quản lý cạnh tranh / Khuyến mại (292) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=2.000033) |
| **9** | **Cấp chứng chỉ hành nghề y dược** | Công dân | Việc làm (752) | Chứng chỉ hành nghề (264) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000264) |
| **10** | **Cấp đổi Hộ chiếu** *(Ảnh 2 #0)* | Công dân | Cư trú và giấy tờ tùy thân (753) | Hộ chiếu (273) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.001456) |
| **11** | **Đăng ký kết hôn** *(Ảnh 2 #1)* | Công dân | Hôn nhân và gia đình (754) | Kết hôn (274) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000274) |
| **12** | **Sang tên, đổi chủ xe** *(Ảnh 2 #2)* | Công dân | Phương tiện và người lái (757) | Đăng ký phương tiện (316) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000316) |

---

## IV. CẤU TRÚC MÃ NGUỒN

```
dvc-demo\
├── astro.config.mjs          # Cấu hình Astro v7 (output static, trailingSlash ignore)
├── package.json              # Khai báo dependency astro và npm scripts
├── public/                   # Thư mục tài nguyên tĩnh (junctions p/, theme/, js/, img/...)
├── src/
│   ├── layouts/
│   │   └── Layout.astro      # Master layout (Header, Meta, CSS, Scripts, Slot, Footer)
│   ├── components/
│   │   ├── Header.astro      # Thanh điều hướng
│   │   ├── Footer.astro      # Chân trang
│   │   ├── HeroBanner.astro  # Banner tìm kiếm và 4 nút thao tác nhanh
│   │   ├── FocusServicesSection.astro # Card grid 13 dịch vụ công trọng tâm
│   │   └── CitizenBusinessTabs.astro  # Danh mục nhóm sự kiện Công dân & Doanh nghiệp
│   └── pages/
│       ├── index.astro       # Trang chủ chính Astro
│       └── p/home/
│           ├── dvc-trang-chu.astro
│           ├── dvc-tthc-thu-tuc-hanh-chinh.astro
│           ├── dvc-chi-tiet-thu-tuc-hanh-chinh.astro
│           ├── dvc-chi-tiet-nhom-su-kien-cho-cong-dan.astro
│           ├── dvc-chi-tiet-nhom-su-kien-cho-doanh-nghiep.astro
│           ├── dvc-cau-hoi-pho-bien.astro
│           └── dvc-chi-tiet-cau-hoi.astro
└── dist/                     # Thư mục xuất bản sau khi build
```

---