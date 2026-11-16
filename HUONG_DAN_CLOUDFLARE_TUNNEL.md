# HƯỚNG DẪN KẾT NỐI WEBSITE LOCAL RA DOMAIN quannguyens.id.vn QUA CLOUDFLARE TUNNEL

Tài liệu này hướng dẫn chi tiết cách phát trực tiếp website từ máy tính cá nhân (`http://localhost:3000`) ra internet với tên miền chính thức **`https://quannguyens.id.vn`** bằng công nghệ **Cloudflare Tunnel (Argo Tunnel)** mà không cần mở port modem (không cần NAT/Port Forwarding), có sẵn chứng chỉ bảo mật HTTPS SSL tự động.

---

## 📌 1. Nguyên lý hoạt động
```
[Người dùng truy cập https://quannguyens.id.vn]
                     │
                     ▼
          [Mạng Cloudflare Toàn Cầu]
                     │
           (Đường hầm mã hóa QUIC/HTTP2 ngầm)
                     │
                     ▼
   [Phần mềm cloudflared trên máy tính của bạn]
                     │
                     ▼
       [Website chạy tại http://localhost:3000]
```

---

## 🚀 2. Các bước thiết lập Tên miền quannguyens.id.vn trên Cloudflare

Hiện tại tên miền `quannguyens.id.vn` của bạn đang dùng Name Server mặc định của PA Việt Nam (`ns1.dotvndns.vn`, `ns2.dotvndns.vn`). Để Cloudflare Tunnel nhận diện và tự động tạo bản ghi DNS cho tên miền:

### Bước 1: Thêm tên miền vào Cloudflare (Miễn phí 100%)
1. Truy cập [cloudflare.com](https://dash.cloudflare.com/) và đăng nhập tài khoản Cloudflare của bạn.
2. Bấm nút **Add a domain** (Thêm trang web) -> Nhập `quannguyens.id.vn` -> Chọn gói **Free** ($0).
3. Cloudflare sẽ quét các bản ghi hiện tại và cấp cho bạn **2 địa chỉ Name Server mới** (ví dụ: `adam.ns.cloudflare.com` và `lucy.ns.cloudflare.com`).

### Bước 2: Cập nhật Name Server tại nhà đăng ký PA Việt Nam
1. Đăng nhập trang quản trị tên miền tại PA Việt Nam (hoặc `dotvndns.vn` / `support.pavietnam.vn`).
2. Tìm tên miền `quannguyens.id.vn` -> Chọn **Đổi Name Server (Thay đổi máy chủ DNS)**.
3. Thay thế 2 Name Server cũ bằng 2 Name Server mới của Cloudflare được cấp ở Bước 1.
4. Bấm **Lưu**. (Thời gian đồng bộ DNS thường từ 5 đến 30 phút).

---

## ⚡ 3. Hai cách khởi chạy Tunnel trên máy tính

### Cách 1: Sử dụng Script tự động có sẵn trong thư mục (Khuyên dùng)
Trong thư mục `D:\AuraTech_Website`, nhấp đúp chuột vào file:
👉 **`chay-web-tunnel.bat`**

Hệ thống sẽ hiển thị menu:
* **Phím [2] - Chạy Quick Tunnel**: Tạo ngay một link HTTPS công khai tạm thời để bạn kiểm tra thử website trên điện thoại hoặc chia sẻ người khác ngay lập tức mà chưa cần đăng nhập.
* **Phím [3] - Đăng nhập Cloudflare**: Tự động mở trình duyệt để bạn bấm ủy quyền tên miền `quannguyens.id.vn`. Sau khi bấm ủy quyền, hệ thống sẽ tự động tạo Tunnel tên `auratech` và tạo bản ghi DNS định tuyến.
* **Phím [1] - Chạy Tunnel chính thức**: Bật kết nối trực tiếp từ máy của bạn ra domain `https://quannguyens.id.vn`.

---

### Cách 2: Thiết lập qua Cloudflare Zero Trust (Phương thức Token - Cực kỳ ổn định)
Nếu bạn quản lý nhiều thiết bị hoặc muốn tunnel chạy ổn định như một Windows Service:
1. Đăng nhập [one.dash.cloudflare.com](https://one.dash.cloudflare.com) (Cloudflare Zero Trust).
2. Vào menu **Networks** > **Tunnels** > Bấm **Create a tunnel**.
3. Chọn loại **Cloudflared** > Đặt tên: `auratech` > Bấm **Save tunnel**.
4. Tại màn hình tiếp theo, chọn hệ điều hành **Windows (64-bit)**.
5. Sao chép dòng lệnh cài đặt Service, ví dụ có dạng:
   ```cmd
   cloudflared.exe service install eyJh...
   ```
6. Mở Command Prompt (Admin) tại máy tính và dán lệnh trên vào để cài đặt.
7. Quay lại giao diện web Cloudflare, bấm **Next** sang tab **Public Hostnames**:
   * **Subdomain**: để trống (hoặc `www`)
   * **Domain**: chọn `quannguyens.id.vn`
   * **Type**: chọn `HTTP`
   * **URL**: nhập `localhost:3000`
8. Bấm **Save Hostname**.

---

## 🛠️ 4. Tệp cấu hình cục bộ sẵn sàng trong dự án
- [cloudflared-config.yml](file:///d:/AuraTech_Website/cloudflared-config.yml): Tệp cấu hình Ingress Rules cho domain `quannguyens.id.vn`.
- [chay-web-tunnel.bat](file:///d:/AuraTech_Website/chay-web-tunnel.bat): File thực thi 1-click trên Windows (có cửa sổ điều khiển).
- [khoi-dong-ngam.vbs](file:///d:/AuraTech_Website/khoi-dong-ngam.vbs): Khởi động Node.js & Tunnel chạy ngầm ẩn hoàn toàn (không hiện cửa sổ đen).
- [cai-dat-tu-khoi-dong-cung-windows.bat](file:///d:/AuraTech_Website/cai-dat-tu-khoi-dong-cung-windows.bat): Thiết lập tự khởi động website cùng Windows.
- [dung-web-tunnel.bat](file:///d:/AuraTech_Website/dung-web-tunnel.bat): Dừng an toàn website và tunnel khi không sử dụng.
- [kiem-tra-trang-thai.bat](file:///d:/AuraTech_Website/kiem-tra-trang-thai.bat): Kiểm tra nhanh trạng thái máy chủ, tunnel và mã HTTP.

---

## ⚠️ 5. Xử lý sự cố: Error 1033 (Cloudflare Tunnel error)
- **Hiện tượng:** Truy cập `https://quannguyens.id.vn` hiển thị "Error 1033 - Cloudflare Tunnel error".
- **Nguyên nhân:** Cloudflare không tìm thấy tiến trình `cloudflared tunnel run auratech` đang kết nối từ máy tính của bạn (do bạn tắt cửa sổ lệnh, máy tính Sleep/Tắt nguồn hoặc chưa bật).
- **Cách khắc phục nhanh:**
  1. Nhấp đúp chuột vào file [chay-web-tunnel.bat](file:///d:/AuraTech_Website/chay-web-tunnel.bat) (hoặc [khoi-dong-ngam.vbs](file:///d:/AuraTech_Website/khoi-dong-ngam.vbs)).
  2. Chờ 3-5 giây và tải lại trang `https://quannguyens.id.vn`.
- **Khắc phục vĩnh viễn (Khuyên dùng):**
  - Chạy file [cai-dat-tu-khoi-dong-cung-windows.bat](file:///d:/AuraTech_Website/cai-dat-tu-khoi-dong-cung-windows.bat) để Windows luôn tự bật website khi mở máy.
  - HOẶC triển khai trực tiếp thư mục `Website_Source` lên **Cloudflare Pages** để website chạy 24/7 trên Cloud không cần bật máy tính.
