# WEB DVC DEMO

## Vẫn còn khá nhiều chỗ bị sai, nhma để mai sửa, buồn ngủ vãi 😴

---

Don't mind

```
https://video.twimg.com/amplify_video/2121488887247712256/vid/avc1/320x320/R_DUcOdyTHn7UbXU.mp4
```

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

## II. DANH SÁCH CÁC TRANG CHÍNH

| Trang | Đường dẫn | Ghi chú |
|:---|:---|:---|
| **Trang chủ chính** | `/index.html` | Hero banner, tìm kiếm, khối 13 dịch vụ công trọng tâm, tabs phân loại Công dân & Doanh nghiệp |
| **Trang chủ Cổng (Alias)** | `/p/home/dvc-trang-chu.html` | Đường dẫn tương thích với định dạng cũ |
| **Tra cứu Thủ tục hành chính** | `/p/home/dvc-tthc-thu-tuc-hanh-chinh.html` | Tìm kiếm, lọc theo bộ ngành/lĩnh vực, phân trang thời gian thực với 129 TTHC |
| **Chi tiết Thủ tục hành chính** | `/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=...` | Hiển thị trình tự thực hiện, hồ sơ, cơ quan giải quyết, phí/lệ phí, căn cứ pháp lý & nút nộp trực tuyến |
| **Tra cứu hồ sơ** | `/p/home/dvc-tra-cuu-ho-so.html` | Tra cứu trạng thái hồ sơ hành chính theo mã hồ sơ |
| **Sự kiện đời thường Công dân** | `/p/home/dvc-chi-tiet-nhom-su-kien-cho-cong-dan.html@group=753.html` | 11 nhóm sự kiện công dân (Cư trú, Hôn nhân, Xây dựng...), accordion danh sách TTHC theo sự kiện |
| **Sự kiện đời thường Doanh nghiệp** | `/p/home/dvc-chi-tiet-nhom-su-kien-cho-doanh-nghiep.html@group=760.html` | 11 nhóm sự kiện doanh nghiệp (Khởi sự kinh doanh, Lao động, Đất đai, Thương mại, Sở hữu trí tuệ...) |
| **Câu hỏi thường gặp (FAQ)** | `/p/home/dvc-cau-hoi-pho-bien.html` | Tra cứu 237 câu hỏi thường gặp, tìm kiếm theo từ khoá, lọc theo lĩnh vực |
| **Chi tiết câu hỏi** | `/p/home/dvc-chi-tiet-cau-hoi.html?id=10334` | Hiển thị chi tiết nội dung giải đáp, căn cứ pháp luật, thủ tục liên quan |
| **Cổng xác thực / Đăng nhập** | `/authenticationendpoint/login.do.html` | Giao diện đăng nhập xacthuc.dichvucong.gov.vn (mô phỏng đăng nhập giả lập) |
| **Dịch vụ công của tôi** | `/p/home/dvc-dich-vu-cong-cua-toi.html` | Trang quản lý thông tin cá nhân và hồ sơ DVC sau khi đăng nhập |

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
| **10** | **Cấp đổi Hộ chiếu** | Công dân | Cư trú và giấy tờ tùy thân (753) | Hộ chiếu (273) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.001456) |
| **11** | **Đăng ký kết hôn** | Công dân | Hôn nhân và gia đình (754) | Kết hôn (274) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000274) |
| **12** | **Sang tên, đổi chủ xe** | Công dân | Phương tiện và người lái (757) | Đăng ký phương tiện (316) | [Xem chi tiết](http://localhost:4321/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.000316) |

---

## IV. CẤU TRÚC MÃ NGUỒN

```
dvc\
├── astro.config.mjs              # Cấu hình Astro (static output, trailingSlash ignore)
├── package.json                  # Cấu hình npm scripts & dependencies
├── public/                       # Tài nguyên tĩnh & junction liên kết
│   ├── authenticationendpoint/   # Junction chứa tài nguyên tĩnh cổng xác thực
│   ├── css/, img/, js/           # Junction tài nguyên CSS, hình ảnh, JavaScript
│   ├── theme/, uploads/, vendor/ # Junction giao diện và thư viện phụ trợ
│   ├── xacthuc.dichvucong.gov.vn/# Junction mô phỏng domain xác thực
│   └── p/home/                   # Chứa hơn 530+ file HTML tĩnh pre-rendered (*.html@...html)
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Layout dùng chung (header, navigation, auth state, footer)
│   └── pages/                    # Các trang template Astro
│       ├── index.astro           # Trang chủ chính
│       ├── dvc-dich-vu-cong-cua-toi.astro # Trang cá nhân / DVC của tôi
│       ├── authenticationendpoint/
│       │   └── login.do.astro    # Cổng đăng nhập xác thực
│       ├── oauth2/
│       │   └── authorize.astro   # Xử lý điều hướng OAuth2
│       ├── xacthuc.dichvucong.gov.vn/authenticationendpoint/
│       │   └── login.do.astro    # Alias đăng nhập theo domain
│       └── p/home/
│           ├── dvc-trang-chu.astro                   # Alias trang chủ
│           ├── dvc-tthc-thu-tuc-hanh-chinh.astro     # Tra cứu danh mục TTHC
│           ├── dvc-chi-tiet-thu-tuc-hanh-chinh.astro # Chi tiết TTHC (đọc param ma_thu_tuc)
│           ├── dvc-tra-cuu-ho-so.astro               # Tra cứu hồ sơ
│           ├── dvc-cau-hoi-pho-bien.astro            # Tra cứu câu hỏi thường gặp
│           ├── dvc-chi-tiet-cau-hoi.astro            # Chi tiết câu hỏi (đọc param id)
│           └── dvc-dich-vu-cong-cua-toi.astro        # Quản lý DVC của tôi (broken, will fix soon :>)
└── dist/                         # Thư mục kết xuất sau khi chạy npm run build
```

---
