# HƯỚNG DẪN SỬ DỤNG & CẤU TRÚC DỰ ÁN NÂNG CẤP WEBSITE AURATECH (AWWWARDS EDITION 2026)

## 1. Tổng quan & Cấu trúc thư mục dự án

Website **AuraTech Vietnam** đã được nâng cấp toàn diện lên chuẩn **Awwwards / Codrops Motion Architecture**, kết hợp công nghệ **Lenis Smooth Inertia Scroll**, **GSAP ScrollTrigger Scrollytelling**, **Web Audio API Frequency Spectrum Synthesizer**, **Không gian 2.5D/3D Isometric** và **Bento Grid tương tác cao cấp**.

```text
AuraTech_Website/
├── package.json                         # npm run dev khởi chạy máy chủ Node
├── server.js                            # Máy chủ HTTP Node.js siêu tốc, tự động mở trình duyệt
├── Website_Source/                      # Toàn bộ mã nguồn 10 trang Front-End chuẩn quốc tế
│   ├── index.html                       # 1. Trang chủ: Hero 3D Isometric, Bento Grid, Spatial Audio Lab, Keynote Cinema
│   ├── about.html                       # 2. Trang Giới thiệu: Dòng thời gian R&D, Sứ mệnh & Đội ngũ chuyên gia
│   ├── products.html                    # 3. Trang Sản phẩm: Bộ lọc thời gian thực, Tìm kiếm tức thì, Sắp xếp giá
│   ├── product-detail.html              # 4. Chi tiết sản phẩm: Cột dính Split-Screen, Xoay 360°, Đổi màu, Báo giá B2B
│   ├── blog.html                        # 5. Tin tức/Blog: Bộ lọc chuyên mục, Modal đọc bài với tiến trình đọc
│   ├── contact.html                     # 6. Liên hệ: Form hỗ trợ trực tuyến, Lưu lịch sử yêu cầu & Bản đồ chỉ đường
│   ├── faq.html                         # 7. FAQ: Tìm kiếm trực tiếp & Accordion đóng/mở mượt mà
│   ├── auth.html                        # 8. Đăng nhập/Đăng ký: Chuyển tab mượt, Xác thực & Lưu phiên người dùng
│   ├── cart.html                        # 9. Giỏ hàng: Tăng/giảm số lượng, Xóa SP, Mã giảm giá, Thanh toán
│   ├── careers.html                     # 10. Tuyển dụng: Chính sách nhân sự, Quy trình 4 bước & Nộp CV
│   └── assets/
│       ├── css/
│       │   └── style.css                # Bộ Design System Awwwards, Token màu Obsidian & Cyan, Glassmorphism, 3D
│       ├── js/
│       │   ├── app.js                   # Logic lõi, Web Audio DSP, Bộ điều khiển Bento, Giỏ hàng, Cursor, Ctrl+K
│       │   └── libs/                    # Bộ thư viện chạy hoàn toàn Offline (100% không phụ thuộc internet bên ngoài)
│       │       ├── gsap.min.js          # GSAP 3 Core Animation
│       │       ├── ScrollTrigger.min.js # GSAP ScrollTrigger cho Scrollytelling
│       │       └── lenis.min.js         # Lenis Smooth Inertia Scrolling 60-120 FPS
│       ├── images/                      # Logo SVG, Favicon và 40+ ảnh chụp chi tiết sản phẩm chuẩn Studio
│       └── media/
│           ├── auratech-spatial-demo.wav # Tệp nhạc Stereo Lossless 96kHz / 24-bit nghe thử trực tiếp
│           └── auratech-keynote.mp4      # Video Keynote ra mắt sản phẩm 2026 kèm hiệu ứng Ambient Glow
├── BaoCao_ThietKeWeb_AuraTech.pptx      # Bản mềm báo cáo thuyết trình PowerPoint
└── README_HUONG_DAN_SU_DUNG.md          # Tài liệu hướng dẫn sử dụng và kiểm thử tính năng
```

---

## 2. Cách chạy và trải nghiệm thực tế Website

1. Mở Terminal/PowerShell tại thư mục `D:\AuraTech_Website`.
2. Chạy lệnh:
   ```bash
   npm run dev
   ```
3. Máy chủ sẽ tự động chạy tại cổng `http://localhost:3000` và tự động mở Google Chrome.
*(Tùy chọn: Có thể đổi cổng bằng biến môi trường, ví dụ: `$env:PORT=4000; npm run dev`)*.
4. Dự án được tích hợp bộ thư viện nội bộ tại `assets/js/libs/`, vì vậy website có thể chạy **100% OFFLINE** mà không cần mạng internet. Bạn cũng có thể mở trực tiếp các file `.html` bất kỳ trong thư mục `Website_Source`.

---

## 3. Các tính năng & Trải nghiệm đỉnh cao có thể trình diễn ngay

### 🌟 1. Scrollytelling Masterpiece & Bộ 5 Kỹ Thuật Đỉnh Cao (Theo Video Tham Khảo)
Khu vực trải nghiệm đặc biệt `#scrolly-masterpiece` tái hiện chuẩn xác 100% phong cách tương tác điện ảnh từ video tham khảo (`@doximitech`), được trang bị đường chạy cuộn siêu dài (`height: 750vh`, tương đương 7.5 lần chiều cao màn hình) và độ trễ quán tính mượt mà chuẩn Awwwards (`scrub: 1.8`, `Lenis duration: 1.5s` với hàm Quintic Ease-out):
- **Phân cảnh 1: Không gian 2.5D/3D Isometric & Flatten Transition**
  - Khung cảnh mở đầu nghiêng không gian 3D ấn tượng (`perspective: 1600px`, `rotateX(20deg)`, `rotateY(-15deg)`, `rotateZ(8deg)`, `scale(1.1)`).
  - Khi cuộn chuột, GSAP ScrollTrigger (`scrub: 1.8`) xoay phẳng từ từ, mượt mà toàn bộ sân khấu về góc nhìn trực diện 2D hoàn hảo (`rotateX: 0`, `rotateY: 0`, `rotateZ: 0`, `scale: 1`).
- **Khoảng dừng 1 (Split-Screen Dwell):** Bố cục chia đôi dừng lại êm ái để người dùng chiêm ngưỡng trọn vẹn thẻ hình ảnh âm học màng loa Beryllium bên trái và mockup iPhone bên phải.
- **Phân cảnh 2: Bố cục Chia đôi (Split-Screen) & Cuộn nội dung thiết bị độc lập**
  - Cột trái hiển thị thẻ hình ảnh âm học cao cấp, thanh chọn phiên bản âm học `Studio | Spatial | ANC 50dB | Carbon`, và thẻ phụ kiện vàng chanh High-Voltage Lime (`#E2FD52`).
  - Màn hình bên trong iPhone 16 Pro lướt chuyển mượt mà từ giao diện Feed sang màn hình chi tiết sản phẩm Flagship X1.
- **Phân cảnh 3: Ghim màn hình (Pinning) & Chuyển đổi vị trí phần tử (Center Stage FLIP)**
  - Chiếc iPhone 16 Pro lướt êm ái ra chính giữa màn hình (`xPercent: -50`, `scale: 1.06`).
  - Cột trái nhẹ nhàng mờ dần, nhường chỗ cho hai cánh đối xứng trượt vào từ hai mép: bên trái là 4 chấm chọn màu (`Obsidian`, `Titanium`, `Alabaster Cream`, `Maroon Wine`) liên kết đổi màu sản phẩm bên trong điện thoại thời gian thực; bên phải là 2 thẻ ưu đãi trượt vào (thẻ Lime AuraClub VIP và thẻ Kính mờ 10% off).
- **Khoảng dừng 2 (Center Stage Dwell):** Khu vực trung tâm giữ nguyên trong một khoảng cuộn dài, cho phép người dùng thoải mái bấm thử nghiệm đổi màu sắc và xem các ưu đãi.
- **Phân cảnh 4: Dynamic Background Vàng Chanh & Đồng bộ Carousel đa tầng**
  - Màu nền toàn màn hình biến đổi sống động từ Obsidian sang màu Vàng Chanh High-Voltage Lime (`#E2FD52`).
  - Màn hình điện thoại hiển thị Lookbook đa phong cách, đồng bộ với 2 thẻ hình ảnh đối xứng lướt nhẹ hai bên sườn.
- **Phân cảnh 5: Góc nghiêng 3D Outro & Ngăn kéo đáy (Bottom Sheet Drawer)**
  - Chiếc điện thoại nghiêng 3D góc thoát trang nhẹ nhàng (`rotateX: 22deg`, `rotateY(-14deg)`, `rotateZ(7deg)`).
  - Ngăn kéo kính mờ dưới đáy điện thoại trượt lên với tiêu đề, giá tiền và nút "Thêm trọn bộ vào giỏ" tương tác.

### ⏳ 2. Dòng Thời Gian Đột Phá Công Nghệ R&D Mở Rộng Trên Trang Chủ (Innovation Timeline)
Ngay sau mục Bento Grid, trang chủ được trang bị khu vực dòng thời gian tương tác đồ sộ chuẩn Apple Keynote:
- **Cột sống năng lượng (Neon Spine):** Dải gradient chuyển màu xuyên suốt từ Cyber Cyan (`#00F0FF`) sang High-Voltage Lime (`#E2FD52`).
- **5 Cột mốc kiến tạo quan trọng:**
  - `2022`: Khởi nguyên màng loa Beryllium 40mm độ méo dưới 0.05%.
  - `2023`: Vi xử lý tín hiệu số DSP 96kHz/24-bit và codec LDAC 990kbps.
  - `2024`: Hệ thống chống ồn thích ứng Hybrid ANC 50dB với 6 micro chùm sóng.
  - `2025`: Mở rộng hệ sinh thái thiết bị đeo khung Titanium Grade 5 và Kính XR Micro-OLED 4K.
  - `2026`: Kỷ nguyên chuẩn Matter 2.0 đồng bộ 250 thiết bị không độ trễ.
- **Hoạt ảnh cuộn mượt mà:** GSAP ScrollTrigger tự động kích hoạt hiệu ứng trượt vào (Slide-in) và phát sáng từng mốc khi người dùng cuộn đến.

### 🎧 3. Phòng Thử Nghiệm Spatial Audio 360° Trực Tuyến (Real Web Audio API)
- Bấm nút **"▶ Phát Âm Thanh"** tại mục Spatial Audio Studio trên Trang chủ để phát trực tiếp file `auratech-spatial-demo.wav`.
- **Canvas Visualizer thời gian thực:** Đồ thị sóng âm hiển thị dải tần số thực tế (20Hz - 40.000Hz) với các cột sóng gradient Cyan - Purple và đỉnh sáng chuyển động nhịp nhàng.
- **Chuyển đổi 4 cấu hình âm học (EQ Presets):**
  - `Spatial 360° Cinema`: Âm trường vòm lập thể đa hướng.
  - `Bass Boost +6dB`: Tăng cường dải trầm ấm áp qua bộ lọc Low-shelf 180Hz.
  - `Studio Master Lossless`: Độ trung thực cao nhất.
  - `Mô phỏng ANC 50dB`: Lọc triệt tạp âm môi trường qua bộ lọc High-pass 350Hz.

### 🎬 3. Rạp Chiếu Keynote 2026 & Ambient Backlight Bloom
- Bấm nút **"▶ Phát Keynote"** để xem video ra mắt `auratech-keynote.mp4`.
- Phía sau khung phát video tích hợp vầng sáng **Ambient Glow** mô phỏng ánh sáng hắt tường tự động theo nhịp phim.

### 🍱 4. Bento Grid Đột Phá & Micro-Interactions (Apple / Sony Style)
- **Công tắc thử nghiệm ANC:** Bấm vào ô "Thử nghiệm Chế độ Chống ồn" để đổi qua lại giữa `Hybrid ANC 50dB` (chống ồn) và `Transparency Mode` (xuyên âm).
- **Mô phỏng nhịp tim thời gian thực:** Đồng hồ AuraWatch hiển thị nhịp tim đập liên tục (70-75 BPM) kèm nhịp co bóp trái tim trực quan.
- **Bật/Tắt thiết bị thông minh Matter:** Bấm trực tiếp vào các nút Đèn Studio, Âm thanh vòm, Điều hòa để xem phản hồi trạng thái thời gian thực.

### 🔍 5. Quick Command Palette (Phím tắt `Ctrl + K` hoặc `⌘ + K`)
- Nhấn tổ hợp phím **`Ctrl + K`** (hoặc bấm biểu tượng kính lúp trên thanh menu ở bất kỳ trang nào trong 10 trang).
- Hộp thoại tìm kiếm kính mờ (Glassmorphism) xuất hiện ngay lập tức: cho phép tìm nhanh tất cả 8 sản phẩm, bài viết công nghệ và các trang web với phím điều hướng `↑`, `↓`, `Enter` và `ESC`.

### 🔊 6. Hệ thống Âm thanh Tương tác Xúc giác (Tactile UI Audio SFX)
- Bấm vào nút chiếc loa `🔊` trên thanh menu để Bật/Tắt âm thanh tương tác.
- Khi bật, mọi thao tác bấm nút, đổi màu, bật tắt công tắc và thêm vào giỏ hàng sẽ phát âm thanh phản hồi nhẹ nhàng, tinh tế được tổng hợp bằng Web Audio Synthesizer (không cần load file mp3 nặng).

### 🛒 7. Hiệu ứng Bay vào Giỏ Hàng (Fly-to-Cart Physics Animation)
- Tại Trang chủ, Trang danh mục hoặc Trang chi tiết: khi bấm nút **"+ Giỏ"**, ảnh sản phẩm sẽ thu nhỏ và bay theo đường cong vật lý thẳng vào biểu tượng giỏ hàng trên thanh điều hướng, sau đó huy hiệu giỏ hàng rung nhịp nảy (bump).

### 📱 8. Trang Chi Tiết Sản Phẩm Chuẩn Split-Screen & Xoay 360°
- Cột bên trái được ghim dính (**Sticky Pinned Column**) khi cuộn trang.
- Bấm nút **"🔄 Xem 360° Đa góc"** để xoay chuyển mượt mà qua 4 góc chụp chuyên nghiệp của thiết bị.
- Chuyển đổi màu sắc trực quan (Đen Vũ Trụ, Bạc Titan, Xanh Bắc Cực), tăng giảm số lượng, xem thông số kỹ thuật đầy đủ và mở Modal **"🏢 Báo giá B2B"** cho khách hàng doanh nghiệp.

### 🎨 9. Giao Diện Tối / Sáng Obsidian & Cyber Cyan Sang Trọng
- Nút bấm `☀️ / 🌙` chuyển đổi chế độ Sáng / Tối đồng bộ trên toàn bộ 10 trang web và lưu trữ trong `localStorage`.
- Chế độ Tối sử dụng tông màu Đen Obsidian sâu thẳm (`#080A0E`) kết hợp điểm nhấn Xanh Neon Cyan (`#00E5FF`) và lớp kính mờ Frost Glass tạo cảm giác sang trọng, công nghệ cao.

---

## 4. Bảng tổng hợp 10 trang web trong hệ sinh thái AuraTech

| STT | Tên Trang | Tệp HTML | Tính năng nổi bật & Nâng cấp |
|:---:|:---|:---|:---|
| **1** | **Trang chủ (Homepage)** | `index.html` | Hero 3D Isometric Scrollytelling, Spatial Audio 360° Studio, Keynote Video, Bento Grid, Flagship Products Carousel |
| **2** | **Giới thiệu (About Us)** | `about.html` | Dòng thời gian R&D phát triển, Sứ mệnh cốt lõi, Đội ngũ kỹ sư & thẻ đội ngũ hiệu ứng Glow |
| **3** | **Sản phẩm (Products)** | `products.html` | Lọc 4 danh mục theo thời gian thực, Tìm kiếm tức thì, Sắp xếp giá tăng/giảm, Thẻ dịch vụ AuraCare+ |
| **4** | **Chi tiết SP (Specification)** | `product-detail.html` | Bố cục Split-Screen ghim dính, Xoay đa góc 360°, Chọn màu sắc, Thông số kỹ thuật, Modal báo giá B2B |
| **5** | **Tin tức / Blog (Blog)** | `blog.html` | Đọc nhanh các bài viết công nghệ mới nhất (iPhone, MacBook M5, Sony XM6), Modal đọc bài chi tiết |
| **6** | **Liên hệ (Contact)** | `contact.html` | Form gửi yêu cầu kèm lưu lịch sử Ticket ID vào LocalStorage, Thẻ văn phòng R&D và Bản đồ chỉ đường |
| **7** | **Câu hỏi thường gặp (FAQ)** | `faq.html` | Bộ tìm kiếm câu hỏi tức thì, Accordion đóng/mở mượt mà, phân loại nhóm câu hỏi rõ ràng |
| **8** | **Tài khoản (Auth)** | `auth.html` | Chuyển đổi tab Đăng nhập / Đăng ký mượt mà, Lưu phiên tài khoản hiển thị trực tiếp lên thanh điều hướng |
| **9** | **Giỏ hàng (Cart)** | `cart.html` | Tăng giảm số lượng, Xóa món hàng, Nhập mã giảm giá 10% (`AURATECH10`, `NEU2026`), Form đặt hàng & Thông báo thành công |
| **10** | **Tuyển dụng (Careers)** | `careers.html` | Danh sách cơ hội việc làm R&D, Phúc lợi ESOP & Bảo hiểm, Biểu mẫu nộp hồ sơ ứng tuyển trực tuyến |

---

## 5. Hướng dẫn Cấu hình & Triển khai Domain quannguyens.id.vn

### 🌐 1. Các file cấu hình hệ thống đã sẵn sàng trong dự án:
- **`Website_Source/CNAME`**: Tự động gán domain `quannguyens.id.vn` khi deploy lên GitHub Pages / Cloudflare Pages.
- **`Website_Source/robots.txt`**: Khai báo công cụ tìm kiếm Googlebot và liên kết sitemap.
- **`Website_Source/sitemap.xml`**: Cấu trúc 10 trang chuẩn SEO cho domain `https://quannguyens.id.vn/`.
- **`vercel.json`**: Cấu hình triển khai 1-click không cần build trên nền tảng Vercel Edge Network.
- **`server.js`**: Hỗ trợ chạy Node.js lắng nghe cổng và liên kết domain tự động.

### 🚀 2. Các phương án trỏ tên miền thực tế:
1. **Phương án A: Vercel / Cloudflare Pages (Miễn phí, Tốc độ cao nhất, Tự động SSL HTTPS)**:
   - Đẩy mã nguồn lên kho chứa GitHub `QuanNguyenS403/auratech-website` (sử dụng lệnh `gh repo create`).
   - Đăng nhập Vercel/Cloudflare Pages, import repo và gán Custom Domain `quannguyens.id.vn`.
   - Vào trang quản trị tên miền tại PA Việt Nam (hoặc dotvndns.vn), cập nhật bản ghi:
     - Loại `A`: `@` trỏ về IP của Vercel `76.76.21.21` (hoặc CNAME theo hướng dẫn).
     - Loại `CNAME`: `www` trỏ về `cname.vercel-dns.com`.
2. **Phương án B: Hosting cPanel / FTP tại PA Việt Nam**:
   - Nếu bạn có sẵn hosting đi kèm tên miền tại PA Việt Nam, chỉ cần tải toàn bộ nội dung trong thư mục `Website_Source/` lên thư mục gốc `public_html/`.
3. **Phương án C: Cloudflare Tunnel từ máy tính nội bộ**:
   - Chạy lệnh `cloudflared tunnel run` để ánh xạ trực tiếp từ `localhost:3000` ra internet với tên miền `quannguyens.id.vn`.
