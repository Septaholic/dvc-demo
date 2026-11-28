# Tài liệu hướng dẫn vận hành & demo Cổng Dịch vụ công Quốc gia

---

## 1. Khởi tạo và chạy hệ thống
- **Cài đặt thư viện (lần đầu):** `npm install` hoặc `npm i`
- **Khởi chạy máy chủ phát triển (bắt buộc):** `npm run dev`
- **Địa chỉ truy cập mặc định:** `http://localhost:4321`
- **Lưu ý kỹ thuật:** Phải chạy bằng `npm run dev` để kích hoạt Vite/Astro middleware mô phỏng API (`server/dvc-portal-engine.mjs`, `server/search-engine.mjs`), đăng nhập VNeID SSO (`/auth`) và định tuyến SPA. Không dùng `astro preview` cho luồng tương tác đầy đủ.
- **Lưu trữ trạng thái cục bộ:** Tài khoản, hồ sơ đã nộp, tệp đính kèm và giao dịch thanh toán được lưu tự động tại `.astro/dvc-state.json` và `.astro/dvc-uploads/`.

---

## 2. Tài khoản công dân mẫu & luồng đăng nhập
Hệ thống sử dụng công dân mẫu sau:
- **Họ và tên:** `Nguyễn Văn A`
- **Số định danh cá nhân (CCCD):** `012345678912`
- **Mật khẩu mặc định:** `Demo@123`
- **Ngày sinh:** `01/01/2000`
- **Địa chỉ mặc định:** `Số 10, Phường Ba Đình, Thành phố Hà Nội` (`provinceCode: "01"`, `communeCode: "00004"`)
- **Điện thoại / Email:** `0912345678` / `nguyenvana@example.com`

**Cách hướng dẫn người dùng đăng nhập:**
1. **Qua cổng VNeID SSO mô phỏng (`/auth`):** Bấm nút **Đăng nhập** trên thanh đầu trang → trang chuyển sang giao diện VNeID SSO (`/auth?...`) với mã QR giả lập đã làm mờ. Chỉ cần bấm trực tiếp nút **Đăng nhập** (có thể để trống hoặc nhập `012345678912` / `Demo@123`), hệ thống tự xác thực và chuyển về `/sso` với tên `Nguyễn Văn A` và số CCCD `012345678912`.
2. **Qua trang đăng nhập nội bộ (`/dang-nhap`):** Nhập `012345678912` và `Demo@123`.
3. **Tạo tài khoản thử nghiệm mới (`/dang-ky`):** Khai báo CCCD mới để kiểm thử nhiều tài khoản.

---

## 3. Hướng dẫn demo 4 dịch vụ công trọng tâm

### Dịch vụ 1: Đăng ký khai sinh
- **Mã thủ tục:** `1.001193` (hoặc liên thông `3.000722`, `2.002868`).
- **Cách mở:** Tại Trang chủ mục **CÔNG DÂN → Có con nhỏ → Khai sinh**, hoặc gõ từ khóa `"khai sinh"` vào ô tìm kiếm.
- **Cơ quan thực hiện:** Chọn `Thành phố Hà Nội` → `Phường Ba Đình` → bấm **Nộp hồ sơ** → **Nộp trực tuyến**.
- **Thao tác điền tờ khai (`/nop-ho-so`):** Thông tin người yêu cầu (`Nguyễn Văn A`) tự động điền từ CSDL mẫu. Nhập thông tin trẻ em, cha/mẹ, đính kèm Giấy chứng sinh (`PDF`, `PNG` hoặc `JPG`, dung lượng `< 2 MB`), rồi chọn **Lưu hồ sơ** *(lưu nháp)* hoặc **Lưu và nộp hồ sơ**.

### Dịch vụ 2: Cấp Phiếu lý lịch tư pháp
### Lưu ý: Dịch vụ này chưa được đẩy lên web DVC mới nên đây chỉ lả một bản giả của dịch vụ này thôi, có thể không đúng.
- **Mã thủ tục:** `3.000333`.
- **Cách mở:** Tại Trang chủ chọn **Cư trú và giấy tờ tùy thân → Lý lịch tư pháp**, hoặc tìm kiếm `"lý lịch tư pháp"`.
- **Cơ quan thực hiện:** Chọn `Bộ Công an` → `Công an Thành phố Hà Nội` (hoặc `Thành phố Hà Nội` → `Phường Ba Đình`) → bấm **Nộp hồ sơ** → **Nộp trực tuyến**.
- **Thao tác & thanh toán:** Chọn loại phiếu (Phiếu số 1 hoặc số 2), mục đích cấp, số lượng bản giấy, khai thông tin gia đình và quá trình cư trú từ đủ 14 tuổi. Thủ tục có lệ phí `200.000 VNĐ`. Sau khi bấm **Lưu và nộp hồ sơ**, hệ thống chuyển sang màn thanh toán `/thanh-toan-truc-tuyen/dvc-thanh-toan-phi-le-phi-ho-so-tong-hop/:id` → bấm **Tiếp tục** → **Thanh toán** để nhận **Biên lai điện tử (PDF)**.

### Dịch vụ 3: Cấp Giấy xác nhận tình trạng hôn nhân
- **Mã thủ tục:** `1.004873`.
- **Cách mở:** Tại Trang chủ chọn **Hôn nhân và gia đình → Xác nhận tình trạng hôn nhân**, hoặc tìm kiếm `"tình trạng hôn nhân"`.
- **Cơ quan thực hiện:** Chọn `Thành phố Hà Nội` → `Phường Ba Đình` → bấm **Nộp hồ sơ** → **Nộp trực tuyến**.
- **Thao tác:** Khai báo tình trạng hôn nhân hiện tại, mục đích sử dụng (đăng ký kết hôn hoặc mục đích khác), đính kèm giấy tờ nếu có và nộp hồ sơ (`0 VNĐ`).

### Dịch vụ 4: Đăng ký khai tử
- **Mã thủ tục:** `1.000656` (hoặc liên thông `2.002913`, `2.002869`).
- **Cách mở:** Tại Trang chủ chọn **Người thân qua đời → Khai tử**, hoặc tìm kiếm `"khai tử"`.
- **Cơ quan thực hiện:** Chọn `Thành phố Hà Nội` → `Phường Ba Đình` → bấm **Nộp hồ sơ** → **Nộp trực tuyến**.
- **Thao tác:** Khai báo thông tin người đi khai tử, thông tin người đã mất, sự kiện tử, đính kèm Giấy báo tử (`PDF`, `PNG` hoặc `JPG`, `< 2 MB`) và bấm **Lưu hồ sơ** / **Lưu và nộp hồ sơ**.

---

## 4. Tra cứu hồ sơ & quản lý kết quả
- **Hồ sơ công dân (`/ho-so-cong-dan/dvc-dich-vu-cong-cua-toi`):** Xem danh sách hồ sơ nháp, đang xử lý hoặc đã hoàn thành (có sẵn hồ sơ mẫu `000.00.04.H26-20261128-0001`), tải bản kết quả điện tử PDF, xem biên lai thanh toán hoặc rút/xóa hồ sơ.
- **Tra cứu hồ sơ công khai (`/tra-cuu-ho-so`):** Nhập mã hồ sơ (ví dụ `000.00.04.H26-20261128-0001`) cùng 5 ký tự mã bảo mật hiển thị trên ảnh SVG để xem tiến độ xử lý.
