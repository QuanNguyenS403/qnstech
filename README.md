# QNSTech / AuraTech Vietnam - Hệ Sinh Thái Thiết Bị Âm Thanh & Smart Living

[![Live Domain](https://img.shields.io/badge/Live_Domain-quannguyens.id.vn-blue?style=for-the-badge&logo=cloudflare)](https://quannguyens.id.vn)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Standards](https://img.shields.io/badge/Awwwards-2026_Standard-black?style=for-the-badge)](https://quannguyens.id.vn)

Website chính thức của **QNSTech Vietnam (AuraTech)** - Thương hiệu công nghệ âm thanh Hi-Res Spatial Audio 360°, Thiết bị đeo thông minh và Thiết bị Smart Living theo chuẩn Matter 2.0.

🌐 **Địa chỉ truy cập chính thức:** [https://quannguyens.id.vn](https://quannguyens.id.vn) hoặc [https://www.quannguyens.id.vn](https://www.quannguyens.id.vn)

---

## 🚀 Tính Năng & Kiến Trúc Nổi Bật

- **Awwwards Motion Architecture:** Tích hợp **Lenis Smooth Inertia Scroll** (60–120 FPS) và **GSAP ScrollTrigger Scrollytelling**.
- **Web Audio API Real-time DSP Synthesizer:** Trình mô phỏng âm thanh không gian 360° với bộ trực quan hóa sóng âm thanh trực tiếp.
- **Bento Grid & 3D Isometric:** Thiết kế theo xu hướng Obsidian Dark Mode kết hợp Neon Cyan & Champagne Gold.
- **Toàn diện 10 Trang:**
  1. `index.html` - Trang chủ: Spatial Audio Lab, 3D Showcase, Keynote Cinema.
  2. `products.html` - Danh mục sản phẩm: Bộ lọc danh mục tức thì, tìm kiếm thời gian thực.
  3. `product-detail.html` - Chi tiết sản phẩm: Xem 360°, đổi màu phiên bản, âm thanh thử nghiệm.
  4. `about.html` - Giới thiệu: Lịch sử R&D và sứ mệnh công nghệ.
  5. `cart.html` - Giỏ hàng: Giảm giá voucher, tính thuế & phí vận chuyển tự động.
  6. `auth.html` - Đăng nhập & Đăng ký: Lưu phiên làm việc người dùng.
  7. `blog.html` - Tin tức công nghệ: Bộ lọc chuyên mục, đọc bài scrollytelling.
  8. `careers.html` - Tuyển dụng: Vị trí R&D và form nộp hồ sơ.
  9. `contact.html` - Liên hệ & Hỗ trợ kỹ thuật.
  10. `faq.html` - Câu hỏi thường gặp & giải đáp tự động.

---

## 📁 Cấu Trúc Dự Án

```text
AuraTech_Website/
├── Website_Source/                      # Toàn bộ mã nguồn Front-End 10 trang
│   ├── index.html                       # Trang chủ
│   ├── products.html                    # Danh mục sản phẩm
│   ├── product-detail.html              # Chi tiết sản phẩm
│   ├── about.html                       # Giới thiệu
│   ├── cart.html                        # Giỏ hàng
│   ├── auth.html                        # Tài khoản
│   ├── blog.html                        # Bài viết công nghệ
│   ├── contact.html                     # Liên hệ
│   ├── faq.html                         # Câu hỏi thường gặp
│   ├── careers.html                     # Tuyển dụng
│   ├── robots.txt                       # Tối ưu SEO cho crawler
│   ├── sitemap.xml                      # Sơ đồ trang web
│   └── assets/                          # CSS, JS, Thư viện và Media
├── server.js                            # Máy chủ HTTP Node.js cục bộ
├── chay-web-tunnel.bat                  # Script khởi động 1-click có menu
├── khoi-dong-ngam.vbs                   # Khởi chạy Node.js & Tunnel chạy ngầm
├── cai-dat-tu-khoi-dong-cung-windows.bat# Cài đặt tự khởi động cùng Windows
├── kiem-tra-trang-thai.bat              # Kiểm tra nhanh trạng thái server & domain
├── dung-web-tunnel.bat                  # Dừng hệ thống an toàn
├── cloudflared-config.yml               # Cấu hình Cloudflare Tunnel
└── README_HUONG_DAN_SU_DUNG.md          # Tài liệu hướng dẫn sử dụng chi tiết
```

---

## 🛠️ Hướng Dẫn Khởi Chạy

### Cách 1: Chạy cục bộ bằng Node.js
```bash
npm install
npm run dev
```
Trình duyệt sẽ tự động mở tại `http://localhost:3000`.

### Cách 2: Chạy Cloudflare Tunnel
Nhấp đúp chuột vào file `chay-web-tunnel.bat` hoặc `khoi-dong-ngam.vbs` để phát trực tiếp ra domain [https://quannguyens.id.vn](https://quannguyens.id.vn).

---

## 📄 Bản Quyền

© 2026 QNSTech Vietnam / AuraTech. All rights reserved.
