/**
 * AURATECH - FULL FRONT-END APPLICATION LOGIC (app.js)
 * Dự án Thiết kế Web - Front-End Thuần (Vanilla ES6 JavaScript)
 * Lưu trữ trạng thái thực tế trên Trình duyệt qua localStorage (Giỏ hàng, Tài khoản, Liên hệ, Ứng tuyển)
 */

const AURATECH_PRODUCTS = [
  {
    id: "aura-anc-pro",
    name: "Tai nghe AuraSonic ANC Pro X1",
    category: "audio",
    categoryLabel: "Âm thanh Hi-Res",
    price: 7490000,
    oldPrice: 8990000,
    rating: 4.9,
    reviewsCount: 128,
    badge: "Bán chạy #1",
    badgeClass: "badge-hot",
    image: "assets/images/prod-headphones.jpg",
    gallery: [
      { src: "assets/images/prod-headphones.jpg", label: "Góc chính diện AirPods Max" },
      { src: "assets/images/prod-headphones-thumb2.jpg", label: "Sony WH-1000XM Matte Black" },
      { src: "assets/images/prod-headphones-thumb3.jpg", label: "Góc nghiêng Studio Bose ANC" },
      { src: "assets/images/prod-headphones-thumb4.jpg", label: "Góc làm việc thực tế" }
    ],
    shortDesc: "Tai nghe chống ồn chủ động 50dB, âm thanh vòm Spatial Audio 360° và thời lượng pin 60 giờ liên tục.",
    features: ["Chống ồn chủ động 50dB", "Pin 60 giờ", "LDAC Hi-Res", "Bluetooth 5.4"],
    colors: ["Đen Vũ Trụ", "Bạc Titan", "Xanh Bắc Cực"],
    specs: {
      "Màng loa (Driver)": "45mm Beryllium phủ Carbon Nano",
      "Chống ồn chủ động": "Hybrid ANC thích ứng 50dB (6 micro)",
      "Thời lượng pin": "60 giờ (tắt ANC) / 45 giờ (bật ANC), sạc nhanh 10 phút nghe 8 giờ",
      "Kết nối": "Bluetooth 5.4 Đa điểm, Codec LDAC / aptX Lossless, Jack 3.5mm & USB-C",
      "Trọng lượng": "248g (Khung hợp kim nhôm - magie siêu nhẹ)"
    }
  },
  {
    id: "aura-sphere-360",
    name: "Loa thông minh AuraSphere 360",
    category: "audio",
    categoryLabel: "Âm thanh Hi-Res",
    price: 5890000,
    oldPrice: 6500000,
    rating: 4.8,
    reviewsCount: 94,
    badge: "Mới ra mắt",
    badgeClass: "badge-new",
    image: "assets/images/prod-speaker.jpg",
    gallery: [
      { src: "assets/images/prod-speaker.jpg", label: "Loa trụ Studio Sphere nguyên khối" },
      { src: "assets/images/prod-speaker-thumb2.jpg", label: "Apple HomePod vải mesh âm học 3D" },
      { src: "assets/images/prod-speaker-thumb3.jpg", label: "Không gian phòng khách hiện đại" },
      { src: "assets/images/prod-speaker-thumb4.jpg", label: "Bàn làm việc thông minh" }
    ],
    shortDesc: "Loa đa hướng công suất 120W tích hợp trợ lý giọng nói tiếng Việt và tự động cân chỉnh âm học phòng.",
    features: ["Âm thanh 360° 120W", "Trợ lý ảo Tiếng Việt", "Chuẩn Matter/Wi-Fi 6", "Vòng LED Ambient"],
    colors: ["Xám Đá Phiến", "Xanh Ngọc Lục Bảo"],
    specs: {
      "Công suất âm thanh": "120W RMS (1 Subwoofer 5.25 inch + 4 loa Tweeter Neodymium)",
      "Tự động cân chỉnh": "Cảm biến đo phản xạ âm tường RoomSense tự động tối ưu EQ",
      "Kết nối không dây": "Wi-Fi 6, AirPlay 2, Spotify Connect, Bluetooth 5.3, Matter Hub",
      "Điều khiển thông minh": "Nhận diện giọng nói trường xa 8m bằng Tiếng Việt & Tiếng Anh",
      "Kích thước": "185 x 185 x 260 mm (2.8 kg)"
    }
  },
  {
    id: "aura-watch-ultra",
    name: "Đồng hồ thông minh AuraWatch Titanium S3",
    category: "wearable",
    categoryLabel: "Thiết bị đeo Thông minh",
    price: 9290000,
    oldPrice: 10500000,
    rating: 4.9,
    reviewsCount: 156,
    badge: "Cao cấp",
    badgeClass: "badge-hot",
    image: "assets/images/prod-watch.jpg",
    gallery: [
      { src: "assets/images/prod-watch.jpg", label: "Mặt AMOLED & Khung Titanium" },
      { src: "assets/images/prod-watch-thumb2.jpg", label: "Đeo trên tay phong cách thể thao" },
      { src: "assets/images/prod-watch-thumb3.jpg", label: "Mặt kính Sapphire nguyên khối" },
      { src: "assets/images/prod-watch-thumb4.jpg", label: "Cận cảnh viền vát siêu mỏng" }
    ],
    shortDesc: "Khung vỏ Titanium cấp hàng không, mặt kính Sapphire, cảm biến BioSense đo điện tâm đồ và giấc ngủ chuyên sâu.",
    features: ["Khung Titanium Grade 5", "Pin 14 ngày", "GPS Băng tần kép", "Chống nước 10ATM"],
    colors: ["Titan Tự Nhiên", "Đen Bóng Đêm"],
    specs: {
      "Màn hình": "LTPO AMOLED 1.5 inch, độ sáng đỉnh 3000 nits, kính Sapphire nguyên khối",
      "Cảm biến sức khỏe": "BioSense 5.0 (ECG, SpO2, Nhiệt độ da, Cảnh báo căng thẳng & Giấc ngủ REM)",
      "Định vị & Thể thao": "GNSS Băng tần kép L1+L5, hơn 150 chế độ luyện tập chuyên nghiệp",
      "Thời lượng pin": "Lên tới 14 ngày chế độ tiêu chuẩn / 48 giờ bật GPS liên tục",
      "Chuẩn độ bền": "Chống nước 10ATM (100m) + Chuẩn quân đội MIL-STD-810H"
    }
  },
  {
    id: "aura-buds-air",
    name: "Tai nghe True Wireless AuraBuds Air Pro 2",
    category: "audio",
    categoryLabel: "Âm thanh Hi-Res",
    price: 3690000,
    oldPrice: 4290000,
    rating: 4.7,
    reviewsCount: 210,
    badge: "Ưa chuộng",
    badgeClass: "badge-new",
    image: "assets/images/prod-earbuds.jpg",
    gallery: [
      { src: "assets/images/prod-earbuds.jpg", label: "Hộp sạc không dây mở nắp" },
      { src: "assets/images/prod-earbuds-thumb2.jpg", label: "Phiên bản Matte Black tối giản" },
      { src: "assets/images/prod-earbuds-thumb3.jpg", label: "Cặp củ tai đệm silicon" },
      { src: "assets/images/prod-earbuds-thumb4.jpg", label: "Góc chụp Flatlay chi tiết" }
    ],
    shortDesc: "Thiết kế công thái học siêu nhẹ 4.2g, lọc ồn đàm thoại 6 micro và hộp sạc không dây chuẩn Qi2.",
    features: ["Siêu nhẹ 4.2g", "Đàm thoại 6 Mic lọc ồn", "Chống nước IP55", "Sạc không dây Qi2"],
    colors: ["Trắng Sương Mai", "Xanh Đại Dương", "Đen Carbon"],
    specs: {
      "Cấu trúc âm thanh": "Màng loa kép đồng trục (Dynamic 11mm + Planar Tweeter 6mm)",
      "Khử tiếng ồn": "ANC chủ động 46dB + Chế độ xuyên âm nhận diện giọng nói tự động",
      "Thời lượng pin": "9 giờ trên tai nghe / 38 giờ kèm hộp sạc Qi2",
      "Độ trễ Gaming": "Siêu thấp 45ms với chế độ Ultra-Low Latency",
      "Kháng bụi & nước": "Chuẩn IP55 cho tai nghe và IPX4 cho hộp sạc"
    }
  },
  {
    id: "aura-glow-lamp",
    name: "Đèn bàn thông minh AuraGlow Circadian Halo",
    category: "smarthome",
    categoryLabel: "Nhà thông minh",
    price: 2490000,
    oldPrice: 2990000,
    rating: 4.8,
    reviewsCount: 73,
    badge: "Bảo vệ mắt",
    badgeClass: "badge-eco",
    image: "assets/images/prod-lamp.jpg",
    gallery: [
      { src: "assets/images/prod-lamp.jpg", label: "Đèn LED kiến trúc tối giản" },
      { src: "assets/images/prod-lamp-thumb2.jpg", label: "Ánh sáng vàng ấm thư giãn" },
      { src: "assets/images/prod-lamp-thumb3.jpg", label: "Thân kim loại xoay gập linh hoạt" },
      { src: "assets/images/prod-lamp-thumb4.jpg", label: "Setup bàn làm việc công thái học" }
    ],
    shortDesc: "Đèn LED quang phổ tự nhiên CRI 98, tự động điều chỉnh nhiệt độ màu theo nhịp sinh học và tích hợp đế sạc MagSafe.",
    features: ["Chỉ số hoàn màu CRI 98", "Theo nhịp sinh học", "Đế sạc nhanh 15W", "Đồng bộ nhạc RGB"],
    colors: ["Đen Nhám", "Vàng Champagne"],
    specs: {
      "Chỉ số ánh sáng": "Quang phổ mặt trời SunLike CRI >= 98, Không nhấp nháy (Flicker-Free RG0)",
      "Dải nhiệt độ màu": "2200K (Ánh nến thư giãn) - 6500K (Tập trung làm việc) + 16 triệu màu Ambient",
      "Sạc không dây": "Đế sạc từ tính chuẩn Qi2 công suất 15W tích hợp trên chân đế",
      "Tương thích": "Apple HomeKit, Google Home, Amazon Alexa & Ứng dụng AuraHome",
      "Công suất tiêu thụ": "Tiết kiệm điện năng 18W (Tuổi thọ bóng LED 50.000 giờ)"
    }
  },
  {
    id: "aura-key-mech",
    name: "Bàn phím cơ không dây AuraKey Low-Profile K8",
    category: "workspace",
    categoryLabel: "Góc làm việc",
    price: 3890000,
    oldPrice: 4490000,
    rating: 4.9,
    reviewsCount: 112,
    badge: "Cực phẩm",
    badgeClass: "badge-hot",
    image: "assets/images/prod-keyboard.jpg",
    gallery: [
      { src: "assets/images/prod-keyboard.jpg", label: "Khung nhôm CNC nguyên khối" },
      { src: "assets/images/prod-keyboard-thumb2.jpg", label: "Keycaps PBT Double-shot xám/đỏ" },
      { src: "assets/images/prod-keyboard-thumb3.jpg", label: "Hệ thống switch cơ quang học" },
      { src: "assets/images/prod-keyboard-thumb4.jpg", label: "Góc làm việc chuẩn Minimalist" }
    ],
    shortDesc: "Khung nhôm CNC nguyên khối, switch quang-cơ từ tính Hall Effect tùy chỉnh hành trình phím và kết nối 3 chế độ.",
    features: ["Khung nhôm CNC", "Switch Từ tính", "Kết nối 3 Mode", "Pin 4000mAh"],
    colors: ["Xám Không Gian", "Tím Cyber"],
    specs: {
      "Cấu trúc bàn phím": "Layout 75% (84 phím), Gasket Mount êm ái, Khung nhôm CNC Anodized",
      "Loại Switch": "Aura Magnetic Low-Profile (Tùy chỉnh điểm nhận phím từ 0.2mm đến 3.0mm)",
      "Keycap": "PBT Double-shot chống bóng mờ, xuyên LED RGB 16.8 triệu màu",
      "Kết nối": "Wireless 2.4GHz (Polling rate 1000Hz) + Bluetooth 5.3 (3 thiết bị) + USB-C",
      "Dung lượng pin": "4000mAh (Sử dụng lên tới 200 giờ khi tắt LED)"
    }
  },
  {
    id: "aura-vision-vr",
    name: "Kính thực tế ảo hỗn hợp AuraVision XR Pro",
    category: "wearable",
    categoryLabel: "Thiết bị đeo Thông minh",
    price: 15990000,
    oldPrice: 17990000,
    rating: 4.9,
    reviewsCount: 64,
    badge: "Đột phá 2026",
    badgeClass: "badge-new",
    image: "assets/images/prod-vr.jpg",
    gallery: [
      { src: "assets/images/prod-vr.jpg", label: "Kính Apple Vision Pro sang trọng" },
      { src: "assets/images/prod-vr-thumb2.jpg", label: "Kính VR Meta Quest & Controller" },
      { src: "assets/images/prod-vr-thumb3.jpg", label: "Quai đeo Solo Knit & Mặt kính cong" },
      { src: "assets/images/prod-vr-thumb4.jpg", label: "Trải nghiệm không gian ảo" }
    ],
    shortDesc: "Trải nghiệm không gian làm việc đa màn hình ảo 4K Micro-OLED sắc nét, theo dõi cử chỉ tay và ánh mắt không cần tay cầm.",
    features: ["Màn hình 4K Micro-OLED", "Theo dõi mắt & tay", "Passthrough Màu", "Siêu mỏng 380g"],
    colors: ["Trắng Pearl", "Đen Obsidian"],
    specs: {
      "Màn hình hiển thị": "Kép 4K Micro-OLED (3840 x 3552 mỗi mắt), tần số quét 120Hz, góc nhìn 112°",
      "Thấu kính": "Pancake quang học thế hệ 3 siêu mỏng, hỗ trợ chỉnh độ cận 0 - 6 Diop trực tiếp",
      "Hệ thống cảm biến": "6 Camera Passthrough màu độ trễ 12ms + 2 Camera hồng ngoại theo dõi ánh mắt",
      "Âm thanh tích hợp": "Loa định hướng Spatial Audio tích hợp trên gọng đeo kín đáo",
      "Vi xử lý": "Kiến trúc kép AuraXR Gen 2 + Bộ nhớ trong 256GB / RAM 16GB"
    }
  },
  {
    id: "aura-home-hub",
    name: "Trung tâm điều khiển nhà thông minh AuraHub Max 10",
    category: "smarthome",
    categoryLabel: "Nhà thông minh",
    price: 4990000,
    oldPrice: 5690000,
    rating: 4.8,
    reviewsCount: 88,
    badge: "Tiết kiệm điện",
    badgeClass: "badge-eco",
    image: "assets/images/prod-hub.jpg",
    gallery: [
      { src: "assets/images/prod-hub.jpg", label: "Màn hình cảm ứng 10.1 inch thông minh" },
      { src: "assets/images/prod-hub-thumb2.jpg", label: "Giao diện điều khiển Matter Hub" },
      { src: "assets/images/prod-hub-thumb3.jpg", label: "Widget hiển thị thông số thời tiết" },
      { src: "assets/images/prod-hub-thumb4.jpg", label: "Điều khiển nhà thông minh gắn tường" }
    ],
    shortDesc: "Màn hình cảm ứng 10.1 inch quản lý toàn bộ thiết bị IoT chuẩn Matter, Zigbee, Thread và phân tích điện năng tiêu thụ thông minh.",
    features: ["Màn hình 10.1\" IPS", "Tích hợp Zigbee/Matter", "Quản lý điện năng thông minh", "Camera góc rộng có nắp che"],
    colors: ["Trắng Tinh Khiết", "Xám Graphite"],
    specs: {
      "Màn hình": "Cảm ứng IPS 10.1 inch (1920 x 1200), lớp phủ chống bám vân tay",
      "Giao thức hỗ trợ": "Matter 1.3 Controller, Thread Border Router, Zigbee 3.0, Wi-Fi 6, Bluetooth Mesh",
      "Tính năng an ninh": "Camera góc rộng 1080p có nút gạt che vật lý, đàm thoại chuông cửa 2 chiều",
      "Quản lý năng lượng": "AuraEco dự báo và tự động giảm tới 28% hóa đơn điện hàng tháng",
      "Nguồn cấp": "Adapter DC 12V hoặc cấp nguồn âm tường PoE"
    }
  }
];

const AURATECH_BLOGS = [
  {
    id: "iphone-18-pro-max-launch",
    title: "Apple Chính Thức Ra Mắt iPhone 18 Pro Max: Khẩu Độ Biến Thiên Cơ Học, Chip A20 Pro 2nm và Màn Hình 3.000 Nits",
    category: "Điện thoại & Di động",
    date: "28/10/2026",
    author: "Ban Biên tập Công nghệ AuraTech",
    readTime: "5 phút đọc",
    image: "assets/images/blog-iphone-18.jpg",
    excerpt: "Đột phá lớn nhất trên cụm camera iPhone với hệ thống lá khẩu cơ học laser, Dynamic Island siêu gọn, chip 2nm đầu tiên và 4 màu sắc sang trọng dẫn đầu thị trường công nghệ.",
    content: `
      <p>Sự kiện ra mắt thế hệ <strong>iPhone 18 Pro Max</strong> đã chính thức tạo nên cơn sốt công nghệ toàn cầu. Đúng như những thông tin rò rỉ trước đó từ các chuyên trang công nghệ uy tín, Apple đã thực hiện một bước nhảy vọt toàn diện về phần cứng camera, màn hình và hiệu năng xử lý.</p>
      <h4 style="margin: 1.2rem 0 0.5rem; color: var(--accent-cyan);">1. Khẩu độ biến thiên cơ học (Variable Aperture) trên cụm 3 camera 48MP</h4>
      <p>Điểm nhấn lớn nhất là camera Fusion 48MP lần đầu tiên được trang bị hệ thống lá khẩu cắt laser điều khiển cơ học. Người dùng có thể chủ động chuyển đổi giữa các khẩu độ để kiểm soát lượng ánh sáng đi vào cảm biến, tạo hiệu ứng xóa phông quang học chân thực tương tự các dòng máy ảnh chuyên nghiệp DSLR/Mirrorless mà không cần giả lập phần mềm.</p>
      <h4 style="margin: 1.2rem 0 0.5rem; color: var(--accent-cyan);">2. Chip Apple A20 Pro tiến trình 2nm & Buồng hơi tản nhiệt Vapor Chamber</h4>
      <p>Sở hữu vi xử lý Apple A20 Pro chế tạo trên tiến trình 2nm tiên tiến nhất của TSMC, máy cải thiện hiệu năng đồ họa GPU thêm 35% và tiết kiệm năng lượng 25%. Đặc biệt, hệ thống buồng hơi tản nhiệt buồng kín (Vapor Chamber) giúp duy trì hiệu năng mượt mà, nhiệt độ luôn mát mẻ kể cả khi quay video ProRes 4K thời gian dài.</p>
      <h4 style="margin: 1.2rem 0 0.5rem; color: var(--accent-cyan);">3. Màn hình Super Retina XDR 6.9 inch 3.000 nits & Màu sắc Burgundy ấn tượng</h4>
      <p>iPhone 18 Pro Max sở hữu viền màn hình siêu mỏng, độ sáng kỷ lục 3.000 nits giúp hiển thị sắc nét dưới nắng gắt trưa hè. Dynamic Island được thu nhỏ tinh tế, đi cùng 4 tùy chọn màu sắc đẳng cấp: Đen Vũ Trụ (Black), Bạc (Silver), Xanh Băng (Glacier) và Đỏ Rượu Vang (Burgundy) cực kỳ sang trọng.</p>
    `
  },
  {
    id: "macbook-pro-m5-tandem-oled",
    title: "Trên Tay MacBook Pro Chip M5 Pro & M5 Max: Đột Phá Màn Hình Tandem OLED, Cảm Ứng Đa Điểm và Pin 24 Giờ",
    category: "Máy tính & Laptop",
    date: "22/10/2026",
    author: "Hoàng Nam - Chuyên gia Đánh giá Thiết bị Số",
    readTime: "6 phút đọc",
    image: "assets/images/blog-macbook-m5.jpg",
    excerpt: "Lần đầu tiên dòng máy tính xách tay cao cấp của Apple sở hữu tấm nền Tandem OLED PROLED XDR cảm ứng, biểu tượng quả táo phát sáng huyền thoại tái xuất cùng cổng Thunderbolt 5.",
    content: `
      <p>Apple vừa chính thức trình làng thế hệ <strong>MacBook Pro M5 Pro và M5 Max</strong>, đánh dấu một bước chuyển mình lịch sử của dòng máy tính xách tay chuyên nghiệp dành cho lập trình viên, nhà sáng tạo nội dung và kiến trúc sư đồ họa.</p>
      <h4 style="margin: 1.2rem 0 0.5rem; color: var(--accent-cyan);">1. Màn hình Tandem OLED PROLED XDR đỉnh cao</h4>
      <p>Tấm nền hai lớp phát sáng xếp chồng Tandem OLED mang lại tỷ lệ tương phản ngoạn mục 10.000.000:1, sắc đen sâu tuyệt đối và độ sáng toàn khung hình đạt 2.000 nits. Đặc biệt, màn hình hỗ trợ thao tác cảm ứng đa điểm mượt mà kết hợp tần số quét ProMotion 120Hz giúp trải nghiệm làm việc trở nên trực quan hơn bao giờ hết.</p>
      <h4 style="margin: 1.2rem 0 0.5rem; color: var(--accent-cyan);">2. Sức mạnh vượt trội từ M5 Pro/Max và RAM tới 128GB</h4>
      <p>Thế hệ chip M5 được tối ưu hóa kiến trúc đa nhân với băng thông bộ nhớ hợp nhất lên tới 400 GB/s. Máy dễ dàng dựng cùng lúc nhiều luồng video 8K định dạng RAW, render mô hình không gian 3D phức tạp mà hầu như không phát ra tiếng ồn quạt tản nhiệt.</p>
      <h4 style="margin: 1.2rem 0 0.5rem; color: var(--accent-cyan);">3. Logo quả táo phát sáng trở lại & Thời lượng pin 24 giờ</h4>
      <p>Biểu tượng logo Apple phát sáng huyền thoại ở mặt lưng đã chính thức trở lại với ánh sáng tinh tế, kết hợp cổng Thunderbolt 5 băng thông 120 Gbps và thời lượng pin ấn tượng lên tới 24 giờ làm việc liên tục chỉ với một lần sạc.</p>
    `
  },
  {
    id: "sony-wh-1000xm6-hands-on",
    title: "Đánh Giá Sony WH-1000XM6: Thiết Kế Khung Gập Trở Lại, Chip Chống Ồn QN3 Mạnh Gấp 7 Lần và 12 Micro Đàm Thoại",
    category: "Âm thanh & Phụ kiện",
    date: "15/10/2026",
    author: "Minh Quân - Chuyên gia Thiết bị Âm thanh Số",
    readTime: "7 phút đọc",
    image: "assets/images/blog-sony-xm6.jpg",
    excerpt: "Mẫu tai nghe chống ồn đầu bảng thế hệ mới của Sony chính thức mang thiết kế gập gọn linh hoạt trở lại, nâng cấp vi xử lý QN3 chuyên dụng và hệ thống 12 micro lọc ồn đỉnh cao.",
    content: `
      <p>Sau nhiều kỳ vọng từ cộng đồng người yêu âm thanh toàn cầu, <strong>Sony WH-1000XM6</strong> đã chính thức ra mắt, khẳng định vị thế dẫn đầu trong phân khúc tai nghe chống ồn cao cấp nhờ lắng nghe và hoàn thiện trọn vẹn những điểm người dùng mong đợi.</p>
      <h4 style="margin: 1.2rem 0 0.5rem; color: var(--accent-cyan);">1. Thiết kế gập gọn linh hoạt và hộp đựng nam châm cao cấp</h4>
      <p>Sau khi thế hệ tiền nhiệm lược bỏ khớp gập gây bất tiện khi di chuyển, Sony đã mang cơ chế xoay gập đa chiều trở lại trên WH-1000XM6. Khung tai nghe thanh thoát, đệm tai da protein công thái học êm ái cùng hộp đựng bọc vải kháng nước có nắp hít nam châm thông minh.</p>
      <h4 style="margin: 1.2rem 0 0.5rem; color: var(--accent-cyan);">2. Vi xử lý chống ồn thế hệ mới HD QN3 với 12 micro lọc ồn</h4>
      <p>Trang bị chip xử lý âm thanh HD Noise Cancelling Processor QN3 có tốc độ phân tích tín hiệu nhanh gấp 7 lần, kết hợp hệ thống 12 micro (6 micro mỗi bên tai). Thiết bị có khả năng triệt tiêu tiếng ồn tần số cao và trung âm như tiếng còi xe, tiếng nói chuyện ồn ào một cách êm ái, hoàn toàn không gây áp lực lên màng nhĩ.</p>
      <h4 style="margin: 1.2rem 0 0.5rem; color: var(--accent-cyan);">3. Chuẩn âm thanh Hi-Res LDAC và thời lượng pin 30 giờ</h4>
      <p>Driver 30mm màng sợi carbon tái tạo dải trầm uy lực, âm cao trong trẻo chuẩn Hi-Res không dây qua codec LDAC. Pin đạt 30 giờ khi bật chống ồn, tính năng sạc nhanh 3 phút cho 3 giờ nghe nhạc và hỗ trợ vừa sạc vừa nghe tiện lợi qua cổng Type-C.</p>
    `
  }
];

const AURATECH_JOBS = [
  {
    id: "fe-senior",
    title: "Chuyên viên Phát triển Giao diện Web (Senior Front-End Engineer)",
    department: "Khối Công nghệ & Sản phẩm Số",
    location: "Hà Nội / TP.HCM (Hybrid)",
    type: "Toàn thời gian",
    salary: "28.000.000đ - 45.000.000đ",
    deadline: "30/11/2026",
    desc: "Xây dựng và tối ưu hóa nền tảng thương mại điện tử tương tác 3D và bảng điều khiển WebApp cho hệ sinh thái thiết bị nhà thông minh AuraTech."
  },
  {
    id: "ai-audio",
    title: "Kỹ sư Thuật toán Xử lý Tín hiệu & Phần mềm Nhúng (DSP & Embedded Engineer)",
    department: "Trung tâm R&D Âm học",
    location: "Hà Nội (On-site)",
    type: "Toàn thời gian",
    salary: "35.000.000đ - 60.000.000đ",
    deadline: "15/12/2026",
    desc: "Nghiên cứu và huấn luyện mô hình mạng nơ-ron khử tiếng ồn chủ động (ANC) và thuật toán Spatial Audio 360° nhúng trên vi xử lý năng lượng thấp."
  },
  {
    id: "uiux-designer",
    title: "Chuyên viên Thiết kế Trải nghiệm Người dùng (Product UI/UX Designer)",
    department: "Studio Thiết kế Công nghiệp & Số",
    location: "TP.HCM / Hà Nội",
    type: "Toàn thời gian",
    salary: "22.000.000đ - 35.000.000đ",
    deadline: "25/11/2026",
    desc: "Thiết kế hệ thống Design System đồng nhất trên Website, ứng dụng di động AuraHome và giao diện cảm ứng của màn hình AuraHub Max 10."
  },
  {
    id: "iot-specialist",
    title: "Chuyên viên Tư vấn Giải pháp Nhà thông minh (Smart Home Solution Architect)",
    department: "Khối Kinh doanh Dự án B2B",
    location: "Hà Nội / Đà Nẵng / TP.HCM",
    type: "Toàn thời gian",
    salary: "18.000.000đ - 32.000.000đ + Thưởng dự án",
    deadline: "10/12/2026",
    desc: "Khảo sát, thiết kế sơ đồ lắp đặt thiết bị chuẩn Matter/Zigbee và tư vấn giải pháp tiết kiệm năng lượng cho căn hộ cao cấp, văn phòng hiện đại."
  }
];

function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}

function getCart() {
  try {
    const raw = localStorage.getItem("auratech_cart");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  const initialCart = [
    { id: "aura-anc-pro", qty: 1, color: "Đen Vũ Trụ" },
    { id: "aura-glow-lamp", qty: 1, color: "Đen Nhám" }
  ];
  localStorage.setItem("auratech_cart", JSON.stringify(initialCart));
  return initialCart;
}

function saveCart(cart) {
  localStorage.setItem("auratech_cart", JSON.stringify(cart));
  updateHeaderBadges();
}

function addToCart(productId, qty = 1, selectedColor = null, sourceEl = null) {
  const product = AURATECH_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const color = selectedColor || product.colors[0];
  const cart = getCart();
  const existing = cart.find(item => item.id === productId && item.color === color);
  if (existing) {
    existing.qty += Number(qty);
  } else {
    cart.push({ id: productId, qty: Number(qty), color });
  }
  saveCart(cart);
  playUiSound("cart");

  if (sourceEl) {
    const card = sourceEl.closest(".product-card") || sourceEl.closest(".card") || sourceEl.parentElement;
    const img = (card && card.querySelector("img")) || sourceEl;
    if (img && img.getBoundingClientRect) {
      animateFlyToCart(img.src || product.image, img.getBoundingClientRect());
    } else {
      bumpCartBadge();
    }
  } else {
    bumpCartBadge();
  }

  showToast(`Đã thêm "${product.name}" (${color}) vào giỏ hàng!`);
}

function bumpCartBadge() {
  document.querySelectorAll(".cart-badge, .js-cart-count").forEach(badge => {
    badge.classList.remove("bump");
    void badge.offsetWidth;
    badge.classList.add("bump");
    setTimeout(() => badge.classList.remove("bump"), 500);
  });
}

function handleFormSubmitWithFeedback(form, callback, delayMs = 450) {
  const submitBtn = form.querySelector("button[type='submit']") || form.querySelector(".btn-primary");
  if (!submitBtn) {
    callback();
    return;
  }
  if (submitBtn.classList.contains("btn-loading")) return;

  const originalHtml = submitBtn.innerHTML;
  submitBtn.classList.add("btn-loading");
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <span class="btn-text-hide">${originalHtml}</span>
    <span class="btn-spinner"></span>
  `;

  setTimeout(() => {
    submitBtn.classList.remove("btn-loading");
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHtml;
    callback();
  }, delayMs);
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem("auratech_user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function updateHeaderBadges() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + Number(item.qty), 0);
  document.querySelectorAll(".js-cart-count").forEach(el => {
    el.textContent = totalCount;
  });

  const user = getCurrentUser();
  document.querySelectorAll(".js-auth-label").forEach(el => {
    if (user && user.name) {
      el.textContent = user.name.split(" ").slice(-2).join(" ");
    } else {
      el.textContent = "Tài khoản";
    }
  });
}

function showToast(message, type = "success") {
  // Completely disabled pop-up toast notifications as requested
  return;
}

function initThemeAndNav() {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("auratech_theme", "dark");

  const mobileBtn = document.querySelector(".js-mobile-toggle");
  const navMenu = document.querySelector(".js-nav-menu");
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }
}

function updateThemeButtons() {
  // Theme toggle removed - permanent luxury dark mode
}

function renderProductCard(p) {
  return `
    <article class="product-card spotlight-card animate-fade-up">
      <div class="product-thumb">
        <a href="product-detail.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </a>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.categoryLabel} • ★ ${p.rating} (${p.reviewsCount})</div>
        <h3 class="product-title">
          <a href="product-detail.html?id=${p.id}">${p.name}</a>
        </h3>
        <p class="product-desc">${p.shortDesc}</p>
        <div class="product-features">
          ${p.features.map(f => `<span class="feature-pill">${f}</span>`).join("")}
        </div>
        <div class="product-footer">
          <div class="price-wrap">
            <span class="price-current">${formatVND(p.price)}</span>
            <span class="price-old">${formatVND(p.oldPrice)}</span>
          </div>
          <div class="product-actions">
            <a href="product-detail.html?id=${p.id}" class="btn btn-outline btn-sm" title="Xem chi tiết">Chi tiết</a>
            <button type="button" class="btn btn-primary btn-sm" onclick="addToCart('${p.id}', 1, null, this)">+ Giỏ</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function initHomePage() {
  const featuredGrid = document.getElementById("home-featured-grid");
  if (featuredGrid) {
    featuredGrid.innerHTML = AURATECH_PRODUCTS.slice(0, 4).map(renderProductCard).join("");
  }
}

function initProductsPage() {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  const searchInput = document.getElementById("catalog-search");
  const sortSelect = document.getElementById("catalog-sort");
  const countLabel = document.getElementById("catalog-count");
  let currentCategory = "all";

  function updateCatalog() {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const sortBy = sortSelect ? sortSelect.value : "featured";

    let list = AURATECH_PRODUCTS.filter(p => {
      const matchCat = currentCategory === "all" || p.category === currentCategory;
      const matchQuery = !query || p.name.toLowerCase().includes(query) || p.shortDesc.toLowerCase().includes(query) || p.features.some(f => f.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

    if (countLabel) countLabel.textContent = `Hiển thị ${list.length} sản phẩm`;

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align:center; padding:3rem;">
          <h3 style="margin-bottom:0.5rem;">Không tìm thấy sản phẩm phù hợp</h3>
          <p style="color:var(--text-secondary); margin-bottom:1.25rem;">Hãy thử từ khóa khác hoặc chọn "Tất cả danh mục".</p>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('catalog-search').value=''; document.querySelector('[data-cat=all]').click();">Xem tất cả sản phẩm</button>
        </div>
      `;
    } else {
      grid.innerHTML = list.map(renderProductCard).join("");
    }
  }

  document.querySelectorAll(".js-cat-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".js-cat-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-cat");
      updateCatalog();
    });
  });

  if (searchInput) searchInput.addEventListener("input", updateCatalog);
  if (sortSelect) sortSelect.addEventListener("change", updateCatalog);

  updateCatalog();
}

function initProductDetailPage() {
  const detailContainer = document.getElementById("product-detail-root");
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const prodId = params.get("id") || "aura-anc-pro";
  const product = AURATECH_PRODUCTS.find(p => p.id === prodId) || AURATECH_PRODUCTS[0];

  const selectorContainer = document.getElementById("product-quick-switcher");
  if (selectorContainer) {
    selectorContainer.innerHTML = AURATECH_PRODUCTS.map(p => `
      <a href="product-detail.html?id=${p.id}" class="filter-pill ${p.id === product.id ? 'active' : ''}">${p.name.replace("Tai nghe ", "").replace("Đồng hồ thông minh ", "").replace("Loa thông minh ", "").replace("Đèn bàn thông minh ", "").replace("Bàn phím cơ không dây ", "").replace("Kính thực tế ảo hỗn hợp ", "").replace("Trung tâm điều khiển nhà thông minh ", "")}</a>
    `).join("");
  }

  const discountPercent = Math.round((1 - product.price / product.oldPrice) * 100);

  // Check wishlist state
  let wishlist = [];
  try {
    wishlist = JSON.parse(localStorage.getItem("auratech_wishlist") || "[]");
  } catch(e) {}
  const isWishlisted = wishlist.includes(product.id);

  detailContainer.innerHTML = `
    <div class="grid-2" style="align-items: start; gap: 2.75rem;">
      <div class="pdp-sticky-column">
        <div class="card pdp-main-img-wrap spotlight-card" style="padding: 0; overflow: hidden; margin-bottom: 1rem; position: relative;">
          <div class="pdp-360-badge" onclick="cyclePdp360View()">
            <span>🔄</span> <span>Xem 360° Đa góc</span>
          </div>
          <img id="main-prod-img" src="${product.image}" alt="${product.name}" style="width:100%; aspect-ratio: 4/3; object-fit: cover;">
        </div>
        <div class="grid-4" style="gap: 0.75rem;">
          ${(product.gallery || [
            { src: product.image, label: "Góc chính diện" },
            { src: product.image.replace('.jpg', '-thumb2.jpg'), label: "Góc nghiêng" },
            { src: product.image.replace('.jpg', '-thumb3.jpg'), label: "Chi tiết thiết kế" },
            { src: product.image.replace('.jpg', '-thumb4.jpg'), label: "Không gian thực tế" }
          ]).map((item, idx) => `
            <button type="button" class="card pdp-thumb-btn ${idx === 0 ? 'active' : ''}" style="padding:0; overflow:hidden; cursor:pointer;" onclick="switchPdpThumb('${item.src}', this)">
              <img src="${item.src}" alt="${item.label}" title="${item.label}" style="aspect-ratio:4/3; object-fit:cover;">
            </button>
          `).join("")}
        </div>
      </div>

      <div class="card spotlight-card" style="padding: 2.25rem;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem;">
          <span style="font-size:0.86rem; color:var(--accent-cyan); font-weight:700;">${product.categoryLabel}</span>
          <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.25rem 0.65rem; background:rgba(16, 185, 129, 0.1); border:1px solid var(--accent-emerald); border-radius:var(--radius-full); font-size:0.75rem; font-weight:700; color:var(--accent-emerald);">
            <span style="width:6px; height:6px; border-radius:50%; background:var(--accent-emerald); box-shadow:0 0 6px var(--accent-emerald);"></span> Còn hàng • Giao nhanh 2h
          </div>
        </div>

        <h1 style="font-size: clamp(1.6rem, 2.5vw, 2.25rem); font-weight:800; line-height:1.2; margin-bottom:0.75rem;">${product.name}</h1>
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1.1rem;">
          <span style="color:var(--accent-amber); font-weight:700;">★ ${product.rating}/5.0</span>
          <span style="color:var(--text-muted); font-size:0.88rem;">(${product.reviewsCount} đánh giá từ khách hàng đã mua)</span>
        </div>
        <p style="color:var(--text-secondary); margin-bottom:1.35rem; line-height:1.7;">${product.shortDesc}</p>

        <div class="product-price-box" style="display:flex; align-items:baseline; gap:1rem; padding:1.1rem 1.35rem; background:rgba(0, 229, 255, 0.08); border:1px solid var(--border-hover); border-radius:var(--radius-md); margin-bottom:1.5rem;">
          <span style="font-size:1.85rem; font-weight:800; color:var(--accent-cyan);">${formatVND(product.price)}</span>
          <span style="font-size:1.05rem; color:var(--text-muted); text-decoration:line-through;">${formatVND(product.oldPrice)}</span>
          <span style="margin-left:auto; font-weight:700; color:var(--accent-rose); font-size:0.9rem;">Tiết kiệm ${discountPercent}%</span>
        </div>

        <div class="form-group">
          <label class="form-label">Phiên bản màu sắc:</label>
          <div style="display:flex; flex-wrap:wrap; gap:0.6rem;" id="detail-color-options">
            ${product.colors.map((c, idx) => `
              <button type="button" class="filter-pill js-color-btn ${idx === 0 ? 'active' : ''}" data-color="${c}">${c}</button>
            `).join("")}
          </div>
        </div>

        <!-- Quantity & Action Buttons -->
        <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center; margin-top:1.75rem;">
          <div style="display:flex; align-items:center; border:1px solid var(--border-color); border-radius:var(--radius-sm); overflow:hidden;">
            <button type="button" style="padding:0.75rem 1rem; font-weight:800;" onclick="const ip=document.getElementById('detail-qty'); ip.value=Math.max(1, Number(ip.value)-1);">−</button>
            <input id="detail-qty" type="number" value="1" min="1" max="20" style="width:52px; text-align:center; font-weight:700;">
            <button type="button" style="padding:0.75rem 1rem; font-weight:800;" onclick="const ip=document.getElementById('detail-qty'); ip.value=Number(ip.value)+1;">+</button>
          </div>

          <button type="button" id="btn-detail-add-cart" class="btn btn-primary" style="flex:1.2;">
            🛒 Thêm vào giỏ hàng
          </button>
          <button type="button" id="btn-detail-buy-now" class="btn btn-primary" style="flex:1; background:linear-gradient(135deg, #00E5FF, #0284C7); border:none; color:#0A0D12; font-weight:800;">
            ⚡ Mua ngay
          </button>
        </div>

        <div style="display:flex; gap:0.75rem; margin-top:0.75rem; align-items:center;">
          <button type="button" id="btn-detail-wishlist" class="btn btn-outline btn-sm" style="flex:1;">
            ${isWishlisted ? '<span style="color:#EF4444;">❤️</span> Đã lưu yêu thích' : '<span>🤍</span> Lưu vào yêu thích'}
          </button>
          <button type="button" class="btn btn-outline btn-sm" style="flex:1;" onclick="document.getElementById('quote-modal').classList.add('open')">
            🏢 Yêu cầu Báo giá B2B
          </button>
        </div>

        <div id="pdp-status-feedback" style="display:none; margin-top:1rem; padding:0.75rem 1rem; border-radius:var(--radius-sm); background:rgba(16, 185, 129, 0.15); border:1px solid var(--accent-emerald); font-size:0.88rem; color:#FFFFFF;"></div>
      </div>
    </div>

    <!-- Specifications Table -->
    <div style="margin-top: 2.75rem;">
      <div class="card">
        <span class="kicker">Specifications</span>
        <h2 style="font-size:1.45rem; margin-bottom:1.1rem;">Thông số kỹ thuật chi tiết</h2>
        <div class="table-responsive">
          <table class="data-table">
            <tbody>
              ${Object.entries(product.specs).map(([k, v]) => `
                <tr>
                  <th style="width:38%; color:var(--text-primary); text-transform:none; font-size:0.92rem;">${k}</th>
                  <td style="color:var(--text-secondary); font-size:0.92rem;">${v}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Customer Reviews & Rating Section -->
    <div style="margin-top: 2.5rem;" id="pdp-reviews-section">
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <span class="kicker">Verified Customer Reviews</span>
            <h2 style="font-size:1.45rem;">Đánh Giá &amp; Nhận Xét Của Khách Hàng</h2>
          </div>
          <div style="display:flex; align-items:center; gap:0.65rem;">
            <span style="font-size:1.6rem; font-weight:800; color:var(--accent-amber);">★ ${product.rating}</span>
            <span style="color:var(--text-muted); font-size:0.88rem;">/ 5.0 (${product.reviewsCount} lượt mua)</span>
          </div>
        </div>

        <!-- Add Review Form -->
        <div style="padding:1.25rem; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:var(--radius-md); margin-bottom:1.75rem;">
          <h3 style="font-size:1.05rem; margin-bottom:0.75rem;">✍️ Viết đánh giá của bạn cho sản phẩm này</h3>
          <div id="review-status-alert" style="display:none; margin-bottom:1rem;"></div>
          <form id="pdp-review-form">
            <div class="grid-2" style="gap:1rem; margin-bottom:0.75rem;">
              <div class="form-group" style="margin:0;">
                <label class="form-label" for="review-author">Họ và tên của bạn *</label>
                <input type="text" id="review-author" class="form-control" placeholder="VD: Nguyễn Văn Anh" required>
              </div>
              <div class="form-group" style="margin:0;">
                <label class="form-label" for="review-rating">Mức độ hài lòng *</label>
                <select id="review-rating" class="form-control">
                  <option value="5">★★★★★ Tuyệt vời (5 sao)</option>
                  <option value="4">★★★★☆ Rất tốt (4 sao)</option>
                  <option value="3">★★★☆☆ Bình thường (3 sao)</option>
                  <option value="2">★★☆☆☆ Chưa hài lòng (2 sao)</option>
                  <option value="1">★☆☆☆☆ Kém (1 sao)</option>
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-bottom:0.75rem;">
              <label class="form-label" for="review-comment">Nhận xét chi tiết *</label>
              <textarea id="review-comment" class="form-control" rows="3" placeholder="Chia sẻ cảm nhận về chất âm, thiết kế, thời lượng pin..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">⭐ Gửi đánh giá &amp; Lưu nhận xét</button>
          </form>
        </div>

        <!-- Reviews List Container -->
        <div id="pdp-reviews-list" style="display:flex; flex-direction:column; gap:1rem;"></div>
      </div>
    </div>
  `;

  // Sample default reviews
  const defaultReviews = [
    {
      id: "REV-1",
      author: "Hoàng Minh Quân",
      rating: 5,
      date: "14/11/2026",
      comment: "Chất âm Spatial Audio 360 độ cực kỳ ấn tượng, bass sâu mà không bị lấn mid. Đeo êm tai không bị mỏi. Xứng đáng với mức giá!",
      verified: true
    },
    {
      id: "REV-2",
      author: "Trần Bảo Nam",
      rating: 5,
      date: "10/11/2026",
      comment: "Đóng gói sang trọng như Apple, hoàn thiện titanium cực kỳ sắc sảo. Kết nối mượt mà chuẩn Bluetooth 5.4.",
      verified: true
    }
  ];

  function renderReviews() {
    const listEl = document.getElementById("pdp-reviews-list");
    if (!listEl) return;
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem(`auratech_reviews_${product.id}`) || "[]");
    } catch(e) {}
    const all = [...stored, ...defaultReviews];
    listEl.innerHTML = all.map(r => `
      <div style="padding:1rem 1.25rem; border-radius:var(--radius-md); background:rgba(255,255,255,0.02); border:1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <strong>${r.author}</strong>
            ${r.verified ? '<span style="font-size:0.72rem; padding:0.1rem 0.45rem; border-radius:4px; background:rgba(16,185,129,0.15); color:var(--accent-emerald); font-weight:700;">✓ Đã xác thực</span>' : ''}
          </div>
          <span style="font-size:0.8rem; color:var(--text-muted);">${r.date}</span>
        </div>
        <div style="color:var(--accent-amber); font-size:0.9rem; margin-bottom:0.35rem;">
          ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}
        </div>
        <p style="margin:0; font-size:0.9rem; color:var(--text-secondary); line-height:1.55;">${r.comment}</p>
      </div>
    `).join("");
  }
  renderReviews();

  const reviewForm = document.getElementById("pdp-review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("review-author").value.trim();
      const rating = Number(document.getElementById("review-rating").value) || 5;
      const comment = document.getElementById("review-comment").value.trim();
      if (!author || !comment) return;

      const newRev = {
        id: "REV-" + Date.now(),
        author,
        rating,
        date: new Date().toLocaleDateString("vi-VN"),
        comment,
        verified: true
      };

      let stored = [];
      try {
        stored = JSON.parse(localStorage.getItem(`auratech_reviews_${product.id}`) || "[]");
      } catch(e) {}
      stored.unshift(newRev);
      localStorage.setItem(`auratech_reviews_${product.id}`, JSON.stringify(stored));

      const alertEl = document.getElementById("review-status-alert");
      if (alertEl) {
        alertEl.style.display = "block";
        alertEl.innerHTML = `<div style="padding:0.75rem 1rem; border-radius:var(--radius-sm); background:rgba(16, 185, 129, 0.15); border:1px solid var(--accent-emerald); color:#FFFFFF; font-size:0.88rem;">✓ Cảm ơn bạn! Đánh giá đã được lưu và hiển thị thành công.</div>`;
        setTimeout(() => { alertEl.style.display = "none"; }, 3500);
      }

      reviewForm.reset();
      renderReviews();
    });
  }

  let chosenColor = product.colors[0];
  document.querySelectorAll(".js-color-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".js-color-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      chosenColor = btn.getAttribute("data-color");
      if (typeof playUiSound === "function") playUiSound("click");
      const mainImg = document.getElementById("main-prod-img");
      if (mainImg) {
        mainImg.classList.add("img-swapping");
        setTimeout(() => mainImg.classList.remove("img-swapping"), 200);
      }
    });
  });

  const addCartBtn = document.getElementById("btn-detail-add-cart");
  if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
      const qty = Number(document.getElementById("detail-qty").value) || 1;
      addToCart(product.id, qty, chosenColor, document.getElementById("main-prod-img"));
      playUiSound("cart");

      const origText = addCartBtn.innerHTML;
      addCartBtn.innerHTML = `<span style="color:#0A0D12; font-weight:800;">✓ Đã thêm ${qty} sản phẩm!</span>`;
      addCartBtn.style.background = "#10B981";
      addCartBtn.style.borderColor = "#10B981";

      const feedback = document.getElementById("pdp-status-feedback");
      if (feedback) {
        feedback.style.display = "block";
        feedback.innerHTML = `✓ Đã thêm <strong>${qty}x ${product.name} (${chosenColor})</strong> vào giỏ hàng thành công! <a href="cart.html" style="color:var(--accent-cyan); font-weight:700; text-decoration:underline; margin-left:0.5rem;">Xem giỏ hàng →</a>`;
        setTimeout(() => { feedback.style.display = "none"; }, 4000);
      }

      setTimeout(() => {
        addCartBtn.innerHTML = origText;
        addCartBtn.style.background = "";
        addCartBtn.style.borderColor = "";
      }, 1600);
    });
  }

  const buyNowBtn = document.getElementById("btn-detail-buy-now");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const qty = Number(document.getElementById("detail-qty").value) || 1;
      addToCart(product.id, qty, chosenColor);
      window.location.href = "cart.html";
    });
  }

  const wishlistBtn = document.getElementById("btn-detail-wishlist");
  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      let wl = [];
      try {
        wl = JSON.parse(localStorage.getItem("auratech_wishlist") || "[]");
      } catch(e) {}
      const idx = wl.indexOf(product.id);
      if (idx > -1) {
        wl.splice(idx, 1);
        wishlistBtn.innerHTML = `<span>🤍</span> Lưu vào yêu thích`;
      } else {
        wl.push(product.id);
        wishlistBtn.innerHTML = `<span style="color:#EF4444;">❤️</span> Đã lưu yêu thích`;
        playUiSound("toggle");
      }
      localStorage.setItem("auratech_wishlist", JSON.stringify(wl));
    });
  }

  window.switchPdpThumb = function(src, btnEl) {
    const mainImg = document.getElementById("main-prod-img");
    if (!mainImg) return;
    document.querySelectorAll(".pdp-thumb-btn").forEach(b => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    mainImg.classList.add("img-swapping");
    setTimeout(() => {
      mainImg.src = src;
      mainImg.onload = () => mainImg.classList.remove("img-swapping");
      setTimeout(() => mainImg.classList.remove("img-swapping"), 140);
    }, 120);
  };

  const quoteForm = document.getElementById("quote-form");
  if (quoteForm) {
    quoteForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = (document.getElementById("quote-name") || {}).value || "";
      const company = (document.getElementById("quote-company") || {}).value || "";
      const email = (document.getElementById("quote-email") || {}).value || "";
      const qty = (document.getElementById("quote-qty") || {}).value || "10";
      const notes = (document.getElementById("quote-notes") || {}).value || "";

      const quote = {
        id: "B2B-" + Math.floor(100000 + Math.random() * 900000),
        productId: product.id,
        productName: product.name,
        name, company, email, qty, notes,
        createdAt: new Date().toLocaleString("vi-VN"),
        status: "Đã tiếp nhận yêu cầu B2B"
      };

      let quotes = [];
      try {
        quotes = JSON.parse(localStorage.getItem("auratech_b2b_quotes") || "[]");
      } catch(err) {}
      quotes.unshift(quote);
      localStorage.setItem("auratech_b2b_quotes", JSON.stringify(quotes));

      const statusBox = document.getElementById("quote-status-alert");
      if (statusBox) {
        statusBox.style.display = "block";
        statusBox.innerHTML = `
          <div style="padding:0.75rem 1rem; border-radius:var(--radius-sm); background:rgba(16, 185, 129, 0.15); border:1px solid var(--accent-emerald); color:#FFFFFF; font-size:0.88rem;">
            ✓ Đã lưu yêu cầu báo giá dự án (Mã: <strong>${quote.id}</strong>)! Chuyên viên B2B sẽ phản hồi tới <strong>${email}</strong> trong 30 phút.
          </div>
        `;
      }

      setTimeout(() => {
        document.getElementById("quote-modal").classList.remove("open");
        quoteForm.reset();
        if (statusBox) statusBox.style.display = "none";
      }, 2000);
    });
  }
}

function initBlogPage() {
  const blogGrid = document.getElementById("blog-list-grid");
  if (!blogGrid) return;

  function renderBlogs(filterCat = "all") {
    const items = filterCat === "all" ? AURATECH_BLOGS : AURATECH_BLOGS.filter(b => b.category === filterCat);
    blogGrid.innerHTML = items.map(b => `
      <article class="card" style="padding:0; overflow:hidden; display:flex; flex-direction:column;">
        <img src="${b.image}" alt="${b.title}" style="aspect-ratio:16/9; object-fit:cover;">
        <div style="padding:1.5rem; display:flex; flex-direction:column; flex:1;">
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--accent-cyan); font-weight:700; margin-bottom:0.5rem;">
            <span>${b.category}</span>
            <span>📅 ${b.date} • ⏱️ ${b.readTime}</span>
          </div>
          <h2 style="font-size:1.22rem; margin-bottom:0.65rem; line-height:1.35;">${b.title}</h2>
          <p style="font-size:0.92rem; color:var(--text-secondary); margin-bottom:1.25rem;">${b.excerpt}</p>
          <div style="margin-top:auto; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.82rem; color:var(--text-muted);">${b.author}</span>
            <button type="button" class="btn btn-primary btn-sm" onclick="openBlogModal('${b.id}')">Đọc chi tiết</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  document.querySelectorAll(".js-blog-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".js-blog-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderBlogs(btn.getAttribute("data-cat"));
    });
  });

  renderBlogs("all");

  const params = new URLSearchParams(window.location.search);
  const postId = params.get("post");
  if (postId) openBlogModal(postId);
}

window.openBlogModal = function(blogId) {
  const post = AURATECH_BLOGS.find(b => b.id === blogId) || AURATECH_BLOGS[0];
  const modal = document.getElementById("blog-modal");
  const body = document.getElementById("blog-modal-body");
  if (!modal || !body) return;
  body.innerHTML = `
    <span class="kicker">${post.category}</span>
    <h2 style="font-size:1.6rem; margin-bottom:0.5rem;">${post.title}</h2>
    <p style="font-size:0.86rem; color:var(--text-muted); margin-bottom:1.25rem;">Đăng ngày ${post.date} bởi <strong>${post.author}</strong> (${post.readTime})</p>
    <img src="${post.image}" alt="${post.title}" style="width:100%; border-radius:var(--radius-md); margin-bottom:1.35rem; max-height:320px; object-fit:cover;">
    <div style="color:var(--text-secondary); line-height:1.75; font-size:0.98rem;">
      ${post.content}
    </div>
  `;
  modal.classList.add("open");
};

function initContactPage() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  function renderContactHistory() {
    const box = document.getElementById("contact-history-box");
    const clearBtn = document.getElementById("btn-clear-contacts");
    if (!box) return;
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem("auratech_contacts") || "[]");
    } catch (err) {}

    if (history.length === 0) {
      if (clearBtn) clearBtn.style.display = "none";
      box.innerHTML = `<p style="font-size:0.88rem; color:var(--text-muted); margin:0;">Chưa có phiếu hỗ trợ nào được lưu trên trình duyệt này.</p>`;
    } else {
      if (clearBtn) clearBtn.style.display = "inline-block";
      box.innerHTML = history.slice(0, 5).map(h => `
        <div style="padding:0.85rem 1rem; border-radius:var(--radius-sm); background:rgba(56, 189, 248, 0.08); border:1px solid var(--border-color); margin-bottom:0.65rem; font-size:0.88rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem; flex-wrap:wrap; gap:0.35rem;">
            <div>
              <strong style="color:var(--accent-cyan);">${h.id}</strong>
              <span style="font-weight:700; margin-left:0.35rem;">${h.subject}</span>
            </div>
            <span style="font-size:0.75rem; padding:0.15rem 0.5rem; border-radius:var(--radius-full); background:rgba(16, 185, 129, 0.15); color:var(--accent-emerald); border:1px solid var(--accent-emerald); font-weight:700;">
              ${h.status || 'Đã tiếp nhận'}
            </span>
          </div>
          <div style="color:var(--text-secondary); font-size:0.82rem; margin-bottom:0.35rem;">
            Người gửi: <strong>${h.name}</strong> • Email: <em>${h.email}</em> • SĐT: ${h.phone} • Thời gian: ${h.time || h.createdAt}
          </div>
          <div style="padding:0.45rem 0.65rem; background:rgba(0,0,0,0.2); border-radius:4px; font-size:0.82rem; color:var(--text-muted); font-style:italic;">
            "${h.message}"
          </div>
        </div>
      `).join("");
    }
  }

  window.clearContactHistory = function() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử phiếu liên hệ đã lưu?")) {
      localStorage.removeItem("auratech_contacts");
      renderContactHistory();
    }
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("ct-name").value.trim();
    const email = document.getElementById("ct-email").value.trim();
    const phone = document.getElementById("ct-phone").value.trim();
    const subject = document.getElementById("ct-subject").value;
    const message = document.getElementById("ct-message").value.trim();

    if (!name || !email || !phone || !message) return;

    handleFormSubmitWithFeedback(form, () => {
      const ticket = {
        id: "TK-" + Math.floor(100000 + Math.random() * 900000),
        name, email, phone, subject, message,
        createdAt: new Date().toLocaleString("vi-VN"),
        status: "Đã tiếp nhận • Đang xử lý"
      };

      let history = [];
      try {
        history = JSON.parse(localStorage.getItem("auratech_contacts") || "[]");
      } catch (err) {}
      history.unshift(ticket);
      localStorage.setItem("auratech_contacts", JSON.stringify(history));

      const statusBox = document.getElementById("contact-status-alert");
      if (statusBox) {
        statusBox.style.display = "block";
        statusBox.innerHTML = `
          <div style="padding:1rem 1.25rem; border-radius:var(--radius-md); background:rgba(16, 185, 129, 0.15); border:1px solid var(--accent-emerald); color:#FFFFFF; display:flex; align-items:flex-start; gap:0.75rem;">
            <span style="font-size:1.4rem; color:var(--accent-emerald); line-height:1;">✓</span>
            <div>
              <strong style="color:var(--accent-emerald); font-size:1rem; display:block; margin-bottom:0.25rem;">Gửi Yêu Cầu Liên Hệ &amp; Lưu Phiếu Thành Công!</strong>
              <p style="margin:0; font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">
                Mã phiếu hỗ trợ của bạn là <strong style="color:var(--accent-cyan);">${ticket.id}</strong>. Dữ liệu đã được lưu trữ an toàn trong hệ thống. Đội ngũ kỹ thuật viên QNSTech sẽ liên hệ trực tiếp tới số điện thoại <strong>${phone}</strong> hoặc email <strong>${email}</strong> trong vòng 15 phút.
              </p>
            </div>
          </div>
        `;
        statusBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      form.reset();
      renderContactHistory();
    }, 450);
  });

  renderContactHistory();
}

function initFaqPage() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    if (btn) {
      btn.addEventListener("click", () => {
        item.classList.toggle("open");
      });
    }
  });

  const searchInput = document.getElementById("faq-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const match = !q || text.includes(q);
        item.style.display = match ? "block" : "none";
        if (q && match) item.classList.add("open");
      });
    });
  }
}

function initAuthPage() {
  const loginTab = document.getElementById("tab-login");
  const registerTab = document.getElementById("tab-register");
  const loginPanel = document.getElementById("panel-login");
  const registerPanel = document.getElementById("panel-register");
  const profilePanel = document.getElementById("panel-profile");

  if (!loginTab || !registerTab) return;

  function checkUserView() {
    const user = getCurrentUser();
    if (user && profilePanel) {
      loginPanel.style.display = "none";
      registerPanel.style.display = "none";
      profilePanel.style.display = "block";
      document.getElementById("prof-name").textContent = user.name;
      document.getElementById("prof-email").textContent = user.email;
      document.getElementById("prof-role").textContent = user.tier || "Thành viên AuraVIP Platinum";
    } else if (profilePanel) {
      profilePanel.style.display = "none";
      loginPanel.style.display = "block";
    }
  }

  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginPanel.style.display = "block";
    registerPanel.style.display = "none";
  });

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerPanel.style.display = "block";
    loginPanel.style.display = "none";
  });

  const loginForm = document.getElementById("form-login");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const nameFromEmail = email.split("@")[0].replace(/[._]/g, " ");
      const userObj = {
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
        email,
        tier: "AuraVIP Gold Member"
      };
      handleFormSubmitWithFeedback(loginForm, () => {
        localStorage.setItem("auratech_user", JSON.stringify(userObj));
        updateHeaderBadges();
        checkUserView();
        showToast(`Chào mừng ${userObj.name} đã đăng nhập thành công!`);
      }, 400);
    });
  }

  const regForm = document.getElementById("form-register");
  if (regForm) {
    regForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const pass = document.getElementById("reg-pass").value;
      const confirm = document.getElementById("reg-confirm").value;
      if (pass !== confirm) {
        showToast("Mật khẩu xác nhận không khớp, vui lòng kiểm tra lại!", "info");
        return;
      }
      const userObj = { name, email, tier: "Thành viên Mới (Ưu đãi -10%)" };
      handleFormSubmitWithFeedback(regForm, () => {
        localStorage.setItem("auratech_user", JSON.stringify(userObj));
        updateHeaderBadges();
        checkUserView();
        showToast(`Đăng ký tài khoản thành công cho ${name}!`);
      }, 400);
    });
  }

  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("auratech_user");
      updateHeaderBadges();
      checkUserView();
      showToast("Đã đăng xuất khỏi tài khoản.");
    });
  }

  checkUserView();
}

function initCartPage() {
  const cartBody = document.getElementById("cart-items-body");
  if (!cartBody) return;

  let discountRate = 0;
  let appliedCode = "";

  // Check saved coupon from session/local storage
  try {
    const savedCoupon = sessionStorage.getItem("auratech_coupon");
    if (savedCoupon === "AURATECH10") { discountRate = 0.10; appliedCode = "AURATECH10"; }
    else if (savedCoupon === "NEU2026") { discountRate = 0.15; appliedCode = "NEU2026"; }
    else if (savedCoupon === "QNSVIP") { discountRate = 0.20; appliedCode = "QNSVIP"; }
  } catch(e) {}

  function renderSavedOrders() {
    const container = document.getElementById("saved-orders-container");
    const clearBtn = document.getElementById("btn-clear-orders");
    if (!container) return;

    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem("auratech_orders") || "[]");
    } catch(e) {}

    if (orders.length === 0) {
      if (clearBtn) clearBtn.style.display = "none";
      container.innerHTML = `
        <div class="card" style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">
          <span>📦 Bạn chưa có đơn hàng nào được lưu. Khi đặt hàng thành công, thông tin đơn sẽ xuất hiện tại đây.</span>
        </div>
      `;
      return;
    }

    if (clearBtn) clearBtn.style.display = "inline-block";
    container.innerHTML = orders.map(ord => `
      <div class="card" style="margin-bottom:1.25rem; border:1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <strong style="color:var(--accent-cyan); font-size:1.05rem;">${ord.id}</strong>
            <span style="color:var(--text-muted); font-size:0.82rem; margin-left:0.5rem;">(${ord.createdAt})</span>
          </div>
          <span style="padding:0.25rem 0.65rem; border-radius:var(--radius-full); font-size:0.75rem; font-weight:700; background:rgba(16, 185, 129, 0.15); color:var(--accent-emerald); border:1px solid var(--accent-emerald);">
            ${ord.status}
          </span>
        </div>

        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
          <div style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6;">
            <div>Người nhận: <strong style="color:var(--text-primary);">${ord.receiver}</strong> • SĐT: <strong>${ord.phone}</strong></div>
            <div>Địa chỉ giao: <em>${ord.address}</em></div>
            <div>Thanh toán: <span>${ord.payment}</span></div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.82rem; color:var(--text-muted);">Tổng thanh toán:</div>
            <strong style="font-size:1.3rem; color:var(--accent-cyan);">${formatVND(ord.total)}</strong>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.02); border-radius:var(--radius-sm); padding:0.75rem; font-size:0.85rem;">
          ${(ord.items || []).map(it => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.35rem 0; border-bottom:1px dashed rgba(255,255,255,0.06);">
              <div style="display:flex; align-items:center; gap:0.65rem;">
                <img src="${it.image}" alt="${it.name}" style="width:36px; height:28px; object-fit:cover; border-radius:4px;">
                <span>${it.name} (${it.color}) × <strong>${it.qty}</strong></span>
              </div>
              <strong style="color:var(--text-primary);">${formatVND(it.total)}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  window.clearOrderHistory = function() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử đơn hàng đã lưu trên trình duyệt?")) {
      localStorage.removeItem("auratech_orders");
      renderSavedOrders();
    }
  };

  function renderCart() {
    const cart = getCart();
    const emptyState = document.getElementById("cart-empty-state");
    const contentState = document.getElementById("cart-content-state");
    const receiptBox = document.getElementById("order-success-banner");

    // Don't show empty state if success receipt is active
    if (cart.length === 0) {
      if (!receiptBox || receiptBox.style.display !== "block") {
        if (emptyState) emptyState.style.display = "block";
      }
      if (contentState) contentState.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (contentState) contentState.style.display = "grid";

    let subtotal = 0;
    cartBody.innerHTML = cart.map((item, idx) => {
      const prod = AURATECH_PRODUCTS.find(p => p.id === item.id) || AURATECH_PRODUCTS[0];
      const lineTotal = prod.price * item.qty;
      subtotal += lineTotal;
      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:1rem;">
              <img src="${prod.image}" alt="${prod.name}" style="width:72px; height:54px; object-fit:cover; border-radius:8px;">
              <div>
                <a href="product-detail.html?id=${prod.id}" style="font-weight:700; display:block;">${prod.name}</a>
                <span style="font-size:0.82rem; color:var(--text-muted);">Phiên bản: ${item.color}</span>
              </div>
            </div>
          </td>
          <td style="font-weight:600;">${formatVND(prod.price)}</td>
          <td>
            <div style="display:inline-flex; align-items:center; border:1px solid var(--border-color); border-radius:8px;">
              <button type="button" style="padding:0.35rem 0.7rem; font-weight:800;" onclick="changeCartQty(${idx}, -1)">−</button>
              <span style="padding:0.35rem 0.65rem; font-weight:700;">${item.qty}</span>
              <button type="button" style="padding:0.35rem 0.7rem; font-weight:800;" onclick="changeCartQty(${idx}, 1)">+</button>
            </div>
          </td>
          <td style="font-weight:800; color:var(--accent-cyan);">${formatVND(lineTotal)}</td>
          <td>
            <button type="button" class="btn btn-outline btn-sm" style="color:var(--accent-rose);" onclick="removeCartItem(${idx})">Xóa</button>
          </td>
        </tr>
      `;
    }).join("");

    const discountAmount = Math.round(subtotal * discountRate);
    const finalTotal = subtotal - discountAmount;

    document.getElementById("summary-subtotal").textContent = formatVND(subtotal);
    document.getElementById("summary-discount").textContent = discountAmount > 0 ? `-${formatVND(discountAmount)} (${appliedCode})` : "0₫";
    document.getElementById("summary-total").textContent = formatVND(finalTotal);
  }

  window.changeCartQty = function(index, delta) {
    const cart = getCart();
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
    renderCart();
  };

  window.removeCartItem = function(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  };

  const couponBtn = document.getElementById("btn-apply-coupon");
  if (couponBtn) {
    couponBtn.addEventListener("click", () => {
      const code = (document.getElementById("coupon-input").value || "").trim().toUpperCase();
      if (code === "AURATECH10") {
        discountRate = 0.10;
        appliedCode = code;
        try { sessionStorage.setItem("auratech_coupon", code); } catch(e) {}
        renderCart();
        alert(`Áp dụng mã ${code} thành công: Giảm 10% tổng đơn hàng!`);
      } else if (code === "NEU2026") {
        discountRate = 0.15;
        appliedCode = code;
        try { sessionStorage.setItem("auratech_coupon", code); } catch(e) {}
        renderCart();
        alert(`Áp dụng mã ${code} thành công: Giảm 15% tổng đơn hàng!`);
      } else if (code === "QNSVIP") {
        discountRate = 0.20;
        appliedCode = code;
        try { sessionStorage.setItem("auratech_coupon", code); } catch(e) {}
        renderCart();
        alert(`Áp dụng mã VIP thành công: Giảm 20% tổng đơn hàng!`);
      } else {
        alert("Mã giảm giá không hợp lệ! Hãy thử: AURATECH10 hoặc NEU2026");
      }
    });
  }

  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();
      const cart = getCart();
      if (!cart || cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước khi đặt hàng.");
        return;
      }

      const receiver = document.getElementById("ck-name").value.trim();
      const phone = document.getElementById("ck-phone").value.trim();
      const address = document.getElementById("ck-address").value.trim();
      const payment = document.getElementById("ck-payment").value;

      // Compile items with prices
      const orderItems = cart.map(it => {
        const prod = AURATECH_PRODUCTS.find(p => p.id === it.id) || AURATECH_PRODUCTS[0];
        return {
          id: it.id,
          name: prod.name,
          image: prod.image,
          color: it.color,
          qty: it.qty,
          price: prod.price,
          total: prod.price * it.qty
        };
      });

      const subtotal = orderItems.reduce((acc, it) => acc + it.total, 0);
      const discountAmount = Math.round(subtotal * discountRate);
      const finalTotal = subtotal - discountAmount;
      const orderId = "QNS-" + Math.floor(100000 + Math.random() * 900000);

      const orderRecord = {
        id: orderId,
        createdAt: new Date().toLocaleString("vi-VN"),
        receiver,
        phone,
        address,
        payment,
        items: orderItems,
        subtotal,
        discount: discountAmount,
        couponCode: appliedCode || null,
        total: finalTotal,
        status: "Đã xác nhận • Đang đóng gói (Giao nhanh 2h)"
      };

      handleFormSubmitWithFeedback(checkoutForm, () => {
        // Save order to localStorage
        let orders = [];
        try {
          orders = JSON.parse(localStorage.getItem("auratech_orders") || "[]");
        } catch(err) {}
        orders.unshift(orderRecord);
        localStorage.setItem("auratech_orders", JSON.stringify(orders));

        // Clear active cart & update badge
        localStorage.setItem("auratech_cart", JSON.stringify([]));
        updateHeaderBadges();

        const contentState = document.getElementById("cart-content-state");
        const emptyState = document.getElementById("cart-empty-state");
        if (contentState) contentState.style.display = "none";
        if (emptyState) emptyState.style.display = "none";

        const receiptBox = document.getElementById("order-success-banner");
        if (receiptBox) {
          receiptBox.style.display = "block";
          receiptBox.innerHTML = `
            <div style="padding:1.5rem 1.75rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span style="font-size:2rem; color:var(--accent-emerald);">🎉</span>
                  <div>
                    <h2 style="font-size:1.45rem; color:var(--accent-emerald); margin:0;">Đặt Hàng &amp; Lưu Đơn Thành Công!</h2>
                    <span style="font-size:0.85rem; color:var(--text-muted);">Mã đơn hàng: <strong style="color:var(--accent-cyan);">${orderId}</strong> • Thời gian: ${orderRecord.createdAt}</span>
                  </div>
                </div>
                <span style="padding:0.35rem 0.85rem; border-radius:var(--radius-full); font-size:0.8rem; font-weight:800; background:rgba(16, 185, 129, 0.15); color:var(--accent-emerald); border:1px solid var(--accent-emerald);">
                  ${orderRecord.status}
                </span>
              </div>

              <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:1.5rem; margin-bottom:1.5rem; border-top:1px solid var(--border-color); border-bottom:1px solid var(--border-color); padding:1rem 0;">
                <div>
                  <h4 style="font-size:0.95rem; margin-bottom:0.5rem; color:var(--text-primary);">Thông tin nhận hàng:</h4>
                  <div style="font-size:0.88rem; color:var(--text-secondary); line-height:1.65;">
                    <div>Họ và tên: <strong style="color:var(--text-primary);">${receiver}</strong></div>
                    <div>Số điện thoại: <strong>${phone}</strong></div>
                    <div>Địa chỉ giao hàng: <em>${address}</em></div>
                    <div>Hình thức: <span>${payment}</span></div>
                  </div>
                </div>
                <div>
                  <h4 style="font-size:0.95rem; margin-bottom:0.5rem; color:var(--text-primary);">Chi tiết thanh toán:</h4>
                  <div style="font-size:0.88rem; color:var(--text-secondary); line-height:1.65;">
                    <div style="display:flex; justify-content:space-between;"><span>Tạm tính:</span> <strong>${formatVND(subtotal)}</strong></div>
                    ${discountAmount > 0 ? `<div style="display:flex; justify-content:space-between; color:var(--accent-emerald);"><span>Giảm giá (${appliedCode}):</span> <strong>-${formatVND(discountAmount)}</strong></div>` : ''}
                    <div style="display:flex; justify-content:space-between; color:var(--accent-cyan);"><span>Phí vận chuyển 2h:</span> <strong>Miễn phí</strong></div>
                    <div style="display:flex; justify-content:space-between; font-size:1.15rem; color:var(--accent-cyan); padding-top:0.35rem; border-top:1px dashed var(--border-color);">
                      <span>Tổng thanh toán:</span> <strong>${formatVND(finalTotal)}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <h4 style="font-size:0.95rem; margin-bottom:0.65rem;">Sản phẩm trong đơn hàng:</h4>
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.75rem; margin-bottom:1.25rem;">
                ${orderItems.map(it => `
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                      <img src="${it.image}" alt="${it.name}" style="width:48px; height:36px; object-fit:cover; border-radius:6px;">
                      <div>
                        <strong>${it.name}</strong>
                        <div style="font-size:0.78rem; color:var(--text-muted);">Phiên bản: ${it.color} • Số lượng: ${it.qty}</div>
                      </div>
                    </div>
                    <strong style="color:var(--accent-cyan);">${formatVND(it.total)}</strong>
                  </div>
                `).join("")}
              </div>

              <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                <a href="products.html" class="btn btn-primary btn-sm">🛍️ Tiếp tục mua sắm</a>
                <button type="button" class="btn btn-outline btn-sm" onclick="window.print()">🖨️ In hóa đơn / Lưu biên lai</button>
              </div>
            </div>
          `;
          receiptBox.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        renderSavedOrders();
      }, 500);
    });
  }

  renderCart();
  renderSavedOrders();
}

function initCareersPage() {
  const jobsContainer = document.getElementById("careers-jobs-list");
  if (!jobsContainer) return;

  jobsContainer.innerHTML = AURATECH_JOBS.map(j => `
    <div class="card" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:1.25rem;">
      <div style="flex:1; min-width:260px;">
        <div style="display:flex; flex-wrap:wrap; align-items:center; gap:0.5rem; margin-bottom:0.45rem;">
          <span style="font-weight:700; color:var(--accent-cyan); font-size:0.88rem;">${j.department}</span>
          <span class="feature-pill">📍 ${j.location}</span>
          <span class="feature-pill">⏰ Hạn nộp: ${j.deadline}</span>
        </div>
        <h3 style="font-size:1.2rem; margin-bottom:0.4rem;">${j.title}</h3>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.5rem;">${j.desc}</p>
        <div style="font-size:0.92rem; font-weight:700; color:var(--accent-cyan);">Mức lương: ${j.salary}</div>
      </div>
      <div>
        <button type="button" class="btn btn-primary" onclick="selectJobToApply('${j.title}')">Ứng tuyển ngay</button>
      </div>
    </div>
  `).join("");

  window.selectJobToApply = function(jobTitle) {
    const select = document.getElementById("apply-position");
    if (select) {
      select.value = jobTitle;
      select.scrollIntoView({ behavior: "smooth", block: "center" });
      document.getElementById("apply-fullname").focus();
    }
  };

  const applyForm = document.getElementById("careers-apply-form");
  if (applyForm) {
    applyForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("apply-fullname").value.trim();
      const pos = document.getElementById("apply-position").value;
      handleFormSubmitWithFeedback(applyForm, () => {
        applyForm.reset();
        showToast(`Hồ sơ ứng tuyển vị trí "${pos}" của ${name} đã được ghi nhận!`);
      }, 400);
    });
  }
}

/* ==========================================================================
   ADVANCED MOTION & MICRO-INTERACTIONS ENGINE
   ========================================================================== */

function initPageTransitions() {
  let loader = document.getElementById("global-page-loader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "global-page-loader";
    document.body.prepend(loader);
  }

  // Animate loader completion on load
  loader.classList.add("is-loading");
  loader.style.width = "100%";
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.classList.remove("is-loading");
      loader.style.width = "0%";
      loader.style.opacity = "";
    }, 220);
  }, 180);

  // Reset if navigating via browser back/forward cache
  window.addEventListener("pageshow", () => {
    const main = document.querySelector("main");
    if (main) main.classList.remove("page-exit");
    if (loader) {
      loader.classList.remove("is-loading");
      loader.style.width = "0%";
    }
  });

  // Intercept internal navigation clicks for smooth transition
  document.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    const target = link.getAttribute("target");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("javascript:") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      target === "_blank" ||
      e.ctrlKey || e.metaKey || e.shiftKey || e.altKey
    ) {
      return;
    }

    const isInternal = !href.startsWith("http") || href.startsWith(window.location.origin);
    if (isInternal) {
      e.preventDefault();
      if (loader) {
        loader.classList.add("is-loading");
        loader.style.width = "40%";
        setTimeout(() => { loader.style.width = "85%"; }, 80);
      }
      const main = document.querySelector("main");
      if (main) {
        main.classList.add("page-exit");
      }
      setTimeout(() => {
        window.location.href = href;
      }, 140);
    }
  });
}

function initScrollEffects() {
  // 1. Reading Progress Bar
  let progressBar = document.getElementById("scroll-progress-bar");
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.id = "scroll-progress-bar";
    document.body.appendChild(progressBar);
  }

  // 2. Floating Back To Top with Circular Progress
  let backToTop = document.getElementById("back-to-top");
  if (!backToTop) {
    backToTop = document.createElement("button");
    backToTop.id = "back-to-top";
    backToTop.type = "button";
    backToTop.className = "back-to-top-btn";
    backToTop.setAttribute("aria-label", "Lên đầu trang");
    backToTop.innerHTML = `
      <svg class="progress-ring" width="48" height="48" viewBox="0 0 48 48">
        <circle class="progress-ring__circle" stroke-width="2.5" stroke-dasharray="125.66" stroke-dashoffset="125.66" cx="24" cy="24" r="20"></circle>
      </svg>
      <span class="arrow-icon">↑</span>
    `;
    document.body.appendChild(backToTop);
  }

  const ringCircle = backToTop.querySelector(".progress-ring__circle");
  const circumference = 2 * Math.PI * 20; // ~125.66

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

        // Update progress bar width
        if (progressBar) {
          progressBar.style.width = (progress * 100) + "%";
        }

        // Update SVG circle stroke
        if (ringCircle) {
          const offset = circumference - (progress * circumference);
          ringCircle.style.strokeDashoffset = offset;
        }

        // Toggle back to top visibility
        if (scrollTop > 280) {
          backToTop.classList.add("is-visible");
        } else {
          backToTop.classList.remove("is-visible");
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".card, .product-card, .bento-item, .section-header, .table-container, .faq-item, .page-banner .container, .auth-box, .stat-card, .blog-card"
  );

  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.08
  });

  targets.forEach(el => {
    el.classList.add("reveal-on-scroll");
    // Add subtle stagger if within grid container
    const parent = el.parentElement;
    if (parent && (parent.classList.contains("grid-2") || parent.classList.contains("grid-3") || parent.classList.contains("grid-4") || parent.id === "catalog-grid" || parent.id === "blog-list-grid")) {
      const idx = Array.prototype.indexOf.call(parent.children, el);
      if (idx > 0) {
        el.style.transitionDelay = `${(idx % 4) * 60}ms`;
      }
    }
    observer.observe(el);
  });
}

function initClickRipple() {
  document.addEventListener("pointerdown", e => {
    const target = e.target.closest(".btn, .icon-btn, .filter-pill, .color-chip, .pdp-thumb-btn, .auth-tab");
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple-wave";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}



/* ==========================================================================
   AWWWARDS INTERACTIVE ENGINES: LENIS, WEB AUDIO DSP, 3D HERO, & SFX
   ========================================================================== */

let lenisInstance = null;

function initSmoothScroll() {
  if (typeof Lenis !== "undefined") {
    lenisInstance = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });
    window.lenisInstance = lenisInstance;
    lenisInstance.on("scroll", () => {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.update();
    });
    if (typeof gsap !== "undefined") {
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }
}

/* Synthesized Web Audio UI SFX */
let sfxAudioCtx = null;
let soundEnabled = true;

function getSfxAudioContext() {
  if (!sfxAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) sfxAudioCtx = new AudioContextClass();
  }
  if (sfxAudioCtx && sfxAudioCtx.state === "suspended") {
    sfxAudioCtx.resume();
  }
  return sfxAudioCtx;
}

function playUiSound(type = "click") {
  if (!soundEnabled) return;
  try {
    const ctx = getSfxAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "cart") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === "toggle") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(950, now + 0.03);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {}
}

function initAudioSfx() {
  document.querySelectorAll(".js-sound-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      document.querySelectorAll(".js-sound-icon").forEach(icon => {
        icon.textContent = soundEnabled ? "🔊" : "🔇";
      });
      showToast(soundEnabled ? "Đã bật âm thanh tương tác UI" : "Đã tắt âm thanh tương tác UI");
      if (soundEnabled) playUiSound("click");
    });
  });

  // Attach click sound to buttons
  document.addEventListener("click", (e) => {
    if (e.target.closest("button, .btn, .icon-btn, .filter-pill")) {
      playUiSound("click");
    }
  });
}

/* ==========================================================================
   4D HYPERSPACE WARP FIELD ENGINE (60-120 FPS 3D DEPTH CANVAS)
   ========================================================================== */
function initHyperspaceCanvas() {
  const canvas = document.getElementById("hyperspace-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth);
  let height = (canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight);

  window.addEventListener("resize", () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const numStars = 190;
  const stars = [];
  const fov = 340;

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2200,
      y: (Math.random() - 0.5) * 2200,
      z: Math.random() * 1000 + 1,
      prevZ: 1000,
      color: Math.random() > 0.45 ? "#00E5FF" : (Math.random() > 0.5 ? "#E2FD52" : "#8B5CF6"),
      size: Math.random() * 1.8 + 0.6
    });
  }

  let animationFrameId;
  let isVisible = true;

  // Pause when offscreen for high efficiency
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) {
        render();
      }
    });
  }, { threshold: 0.05 });
  observer.observe(canvas);

  function render() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    // Read current scroll velocity from Lenis or timeline telemetry
    let velocity = 0;
    if (window.lenisInstance && typeof window.lenisInstance.velocity === "number") {
      velocity = Math.abs(window.lenisInstance.velocity * 30);
    } else if (typeof window.__currentScrollVelocity === "number") {
      velocity = window.__currentScrollVelocity;
    }
    const warpBoost = Math.min(velocity * 0.025, 35);
    const speed = 1.6 + warpBoost;

    for (let i = 0; i < numStars; i++) {
      const s = stars[i];
      s.prevZ = s.z;
      s.z -= speed;

      if (s.z <= 1) {
        s.z = 1000;
        s.prevZ = 1000;
        s.x = (Math.random() - 0.5) * 2200;
        s.y = (Math.random() - 0.5) * 2200;
      }

      const k = fov / s.z;
      const px = cx + s.x * k;
      const py = cy + s.y * k;

      if (px < 0 || px > width || py < 0 || py > height) continue;

      const prevK = fov / s.prevZ;
      const prevPx = cx + s.x * prevK;
      const prevPy = cy + s.y * prevK;

      // Draw light streak or particle
      const alpha = Math.min((1000 - s.z) / 400, 0.85);
      ctx.strokeStyle = s.color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = s.size * (1 + warpBoost * 0.06);

      if (warpBoost > 2) {
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.stroke();
      } else {
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(px, py, s.size * (1 - s.z / 1200), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1.0;
    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   VIDEO-INSPIRED SCROLLYTELLING MASTERPIECE (6-PHASE 4D AWWWARDS SYSTEM)
   ========================================================================== */

function initScrollytellingMasterpiece() {
  const section = document.getElementById("scrolly-masterpiece");
  if (!section) return;

  // Next-Gen 3D Robotic Assembly Engine handles #scrolly-masterpiece
  if (typeof window.init3DAssemblyEngine === "function") {
    return;
  }
  const leftCol = document.getElementById("scrolly-left-column");
  const deviceCol = document.getElementById("scrolly-device-column");
  const iphone = document.getElementById("scrolly-iphone");
  const wingLeft = document.getElementById("scrolly-wing-left");
  const wingRight = document.getElementById("scrolly-wing-right");
  const lookbookLeft = document.getElementById("scrolly-lookbook-left");
  const lookbookRight = document.getElementById("scrolly-lookbook-right");

  const layerFeed = document.getElementById("iphone-layer-feed");
  const layerPdp = document.getElementById("iphone-layer-pdp");
  const layerLookbook = document.getElementById("iphone-layer-lookbook");
  const layerBundle = document.getElementById("iphone-layer-bundle");

  const spatialRings = document.getElementById("spatial-4d-rings");
  const badgeSpatial = document.getElementById("badge-spatial-audio");
  const badgeLossless = document.getElementById("badge-lossless");
  const tesseractWidget = document.getElementById("tesseract-4d");
  const spacetimeGrid = document.getElementById("spacetime-grid");

  const hudX = document.getElementById("hud-x");
  const hudY = document.getElementById("hud-y");
  const hudZ = document.getElementById("hud-z");
  const hudT = document.getElementById("hud-t");
  const hudMode = document.getElementById("hud-mode");
  const hudWarpPercent = document.getElementById("hud-warp-percent");
  const hudWarpBar = document.getElementById("hud-warp-bar");

  if (!section || !stage || !deviceCol) return;
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Initialize the 4D Hyperspace Warp Canvas
  initHyperspaceCanvas();

  // Initial State: Deep 4D Isometric Hyper-Perspective
  gsap.set(stage, {
    rotateX: 28,
    rotateY: -22,
    rotateZ: 12,
    scale: 1.25,
    z: -400,
    transformOrigin: "center center"
  });

  if (wingLeft) gsap.set(wingLeft, { opacity: 0, x: -70, z: -100 });
  if (wingRight) gsap.set(wingRight, { opacity: 0, x: 70, z: -100 });
  if (lookbookLeft) gsap.set(lookbookLeft, { opacity: 0, x: -90, z: -350, rotateY: -20, scale: 0.86 });
  if (lookbookRight) gsap.set(lookbookRight, { opacity: 0, x: 90, z: -350, rotateY: 20, scale: 0.86 });

  if (spatialRings) gsap.set(spatialRings, { opacity: 0, scale: 0.65, z: -80 });
  if (badgeSpatial) gsap.set(badgeSpatial, { opacity: 0, y: 30, z: 90 });
  if (badgeLossless) gsap.set(badgeLossless, { opacity: 0, y: 30, z: 90 });

  // Interactive 3D/4D Mouse Parallax
  const viewport = section.querySelector(".scrolly-pinned-viewport");
  if (viewport) {
    viewport.addEventListener("mousemove", (e) => {
      const rect = viewport.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Subtle live 3D tilting on stage
      gsap.to(stage, {
        rotationX: `-=${y * 8}`,
        rotationY: `+=${x * 12}`,
        duration: 0.8,
        ease: "power1.out",
        overwrite: "auto"
      });

      if (tesseractWidget) {
        gsap.to(tesseractWidget, {
          x: x * 25,
          y: y * 25,
          duration: 1.0,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });
  }

  // Master GSAP Scrolly Timeline (28 Time Units with 6 Epic Dimensional Acts)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 2.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        const vel = Math.abs(typeof self.getVelocity === "function" ? (self.getVelocity() || 0) : 0);
        window.__currentScrollVelocity = vel;

        // Update Spacetime HUD Telemetry
        if (hudX) hudX.textContent = (Math.sin(p * Math.PI * 3.5) * 65).toFixed(1) + "mm";
        if (hudY) hudY.textContent = (-Math.cos(p * Math.PI * 2.8) * 35).toFixed(1) + "mm";
        if (hudZ) hudZ.textContent = Math.round(-400 * (1 - p) + (p > 0.4 && p < 0.8 ? 120 : 0)) + "px";
        if (hudT) hudT.textContent = (1.0 + p * 3.0).toFixed(2) + "D";

        const warpFactor = 1.0 + Math.min(vel / 300, 3.8);
        if (hudWarpPercent) hudWarpPercent.textContent = warpFactor.toFixed(2) + "x";
        if (hudWarpBar) hudWarpBar.style.width = Math.min((warpFactor / 4.8) * 100, 100) + "%";

        // Dynamic Spacetime Curvature Grid distortion
        if (spacetimeGrid) {
          const gridTilt = 68 + p * 10;
          const gridTranslate = -18 + p * 22;
          const gridDepth = -350 + p * 180;
          spacetimeGrid.style.transform = `perspective(700px) rotateX(${gridTilt}deg) translateY(${gridTranslate}%) translateZ(${gridDepth}px)`;
        }
      }
    }
  });

  // =========================================================================
  // ACT 1 (0.0 -> 4.5): 4D Hyperspace Awakening & Smooth Flattening to 2D
  // =========================================================================
  tl.to(stage, {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    z: 0,
    duration: 4.5,
    ease: "power2.out",
    onStart: () => { if (hudMode) hudMode.textContent = "WARP: ACT I [4D -> 2D]"; }
  }, 0);

  // [Hold 1: 4.5 -> 6.0] Split-Screen Showcase Hold

  // =========================================================================
  // ACT 2 (6.0 -> 10.5): Spatial Soundwave Expansion & Acoustic PDP Morph
  // =========================================================================
  tl.to(layerFeed, {
    opacity: 0,
    duration: 1.8,
    ease: "power2.inOut",
    onStart: () => {
      if (layerFeed) layerFeed.classList.remove("active");
      if (layerPdp) layerPdp.classList.add("active");
      if (hudMode) hudMode.textContent = "WARP: ACT II [SPATIAL 360°]";
    },
    onReverseComplete: () => {
      if (layerFeed) layerFeed.classList.add("active");
      if (layerPdp) layerPdp.classList.remove("active");
      if (hudMode) hudMode.textContent = "WARP: ACT I [4D -> 2D]";
    }
  }, 6.0);

  // 4D Spatial Audio Holographic Rings bloom in 3D
  if (spatialRings) {
    tl.to(spatialRings, {
      opacity: 0.95,
      scale: 1.0,
      z: 50,
      duration: 2.2,
      ease: "power2.out"
    }, 6.5);
  }

  // Floating Depth Badges slide in
  if (badgeSpatial) {
    tl.to(badgeSpatial, {
      opacity: 1,
      y: 0,
      z: 90,
      duration: 1.6,
      ease: "power2.out"
    }, 7.0);
  }
  if (badgeLossless) {
    tl.to(badgeLossless, {
      opacity: 1,
      y: 0,
      z: 90,
      duration: 1.6,
      ease: "power2.out"
    }, 7.3);
  }

  // Left cards gain subtle dimensional elevation
  tl.to(leftCol, {
    z: 50,
    scale: 1.02,
    duration: 2.0,
    ease: "power1.out"
  }, 6.8);

  // [Hold 2: 10.5 -> 12.0] Hold to admire PDP & Spatial Audio 3D Rings

  // =========================================================================
  // ACT 3 (12.0 -> 17.0): Center Stage Hyper-Focus & Symmetrical Convergence
  // =========================================================================
  tl.to(leftCol, {
    opacity: 0,
    x: -160,
    z: -400,
    rotateY: 24,
    scale: 0.85,
    duration: 3.0,
    ease: "power2.inOut",
    onStart: () => { if (hudMode) hudMode.textContent = "WARP: ACT III [CENTER STAGE]"; }
  }, 12.0);

  tl.to(deviceCol, {
    x: "-50%",
    left: "50%",
    scale: 1.14,
    z: 120,
    duration: 3.2,
    ease: "power2.inOut"
  }, 12.0);

  if (spatialRings) {
    tl.to(spatialRings, {
      scale: 1.25,
      z: 90,
      duration: 2.5,
      ease: "power2.out"
    }, 12.5);
  }

  // Wings glide in with 3D Parallax
  tl.to(wingLeft, {
    opacity: 1,
    x: 0,
    z: 80,
    duration: 2.0,
    ease: "power2.out",
    onStart: () => { if (wingLeft) wingLeft.classList.add("active"); },
    onReverseComplete: () => { if (wingLeft) wingLeft.classList.remove("active"); }
  }, 13.5);

  tl.to(wingRight, {
    opacity: 1,
    x: 0,
    z: 80,
    duration: 2.0,
    ease: "power2.out",
    onStart: () => { if (wingRight) wingRight.classList.add("active"); },
    onReverseComplete: () => { if (wingRight) wingRight.classList.remove("active"); }
  }, 13.8);

  // [Hold 3: 17.0 -> 19.5] Generous interactive hold for Colors & VIP cards

  // =========================================================================
  // ACT 4 (19.5 -> 24.0): High-Voltage Lime Quantum Shift & Lookbook Parallax
  // =========================================================================
  tl.to(section, {
    backgroundColor: "#E2FD52",
    duration: 2.5,
    ease: "power2.inOut",
    onStart: () => { if (hudMode) hudMode.textContent = "WARP: ACT IV [LIME LOOKBOOK]"; }
  }, 19.5);

  // Fade out wings and depth badges
  tl.to([wingLeft, wingRight], {
    opacity: 0,
    z: -120,
    duration: 1.2,
    ease: "power2.in",
    onComplete: () => {
      if (wingLeft) wingLeft.classList.remove("active");
      if (wingRight) wingRight.classList.remove("active");
    }
  }, 19.5);

  if (badgeSpatial && badgeLossless) {
    tl.to([badgeSpatial, badgeLossless], {
      opacity: 0,
      y: -20,
      duration: 1.0,
      ease: "power2.in"
    }, 19.5);
  }

  // Inside phone: PDP -> Lookbook
  tl.to(layerPdp, {
    opacity: 0,
    duration: 1.4,
    ease: "power2.inOut",
    onStart: () => {
      if (layerPdp) layerPdp.classList.remove("active");
      if (layerLookbook) layerLookbook.classList.add("active");
    },
    onReverseComplete: () => {
      if (layerPdp) layerPdp.classList.add("active");
      if (layerLookbook) layerLookbook.classList.remove("active");
    }
  }, 20.0);

  // Lookbook Cards burst from 3D depth
  tl.to(lookbookLeft, {
    opacity: 0.96,
    x: 0,
    z: 40,
    rotateY: -8,
    scale: 1,
    duration: 2.4,
    ease: "power2.out",
    onStart: () => { if (lookbookLeft) lookbookLeft.classList.add("active"); },
    onReverseComplete: () => { if (lookbookLeft) lookbookLeft.classList.remove("active"); }
  }, 20.5);

  tl.to(lookbookRight, {
    opacity: 0.96,
    x: 0,
    z: 40,
    rotateY: 8,
    scale: 1,
    duration: 2.4,
    ease: "power2.out",
    onStart: () => { if (lookbookRight) lookbookRight.classList.add("active"); },
    onReverseComplete: () => { if (lookbookRight) lookbookRight.classList.remove("active"); }
  }, 20.8);

  // [Hold 4: 24.0 -> 25.5] High-Voltage Lime Visual Hold

  // =========================================================================
  // ACT 5 (25.5 -> 28.0): 4D Outro Relativistic Warp & Signature Kit Release
  // =========================================================================
  tl.to([lookbookLeft, lookbookRight], {
    opacity: 0,
    z: -300,
    scale: 0.8,
    duration: 1.4,
    ease: "power2.in",
    onComplete: () => {
      if (lookbookLeft) lookbookLeft.classList.remove("active");
      if (lookbookRight) lookbookRight.classList.remove("active");
    }
  }, 25.5);

  tl.to(stage, {
    rotateX: 25,
    rotateY: -16,
    rotateZ: 9,
    scale: 1.12,
    z: 80,
    duration: 2.5,
    ease: "power2.inOut",
    onStart: () => { if (hudMode) hudMode.textContent = "WARP: ACT V [ECOSYSTEM RELEASE]"; }
  }, 25.5);

  tl.to(layerLookbook, {
    opacity: 0,
    duration: 1.2,
    ease: "power2.inOut",
    onStart: () => {
      if (layerLookbook) layerLookbook.classList.remove("active");
      if (layerBundle) layerBundle.classList.add("active");
    },
    onReverseComplete: () => {
      if (layerLookbook) layerLookbook.classList.add("active");
      if (layerBundle) layerBundle.classList.remove("active");
    }
  }, 25.8);

  if (spatialRings) {
    tl.to(spatialRings, {
      opacity: 0,
      scale: 1.6,
      z: 200,
      duration: 2.0,
      ease: "power2.in"
    }, 26.0);
  }

  // [Hold 5: 28.0] - Perfect release into Bento Grid section
}

window.switchScrollyDeviceColor = function(colorName, el) {
  playUiSound("toggle");
  document.querySelectorAll(".wing-swatch-circle").forEach(c => c.classList.remove("active"));
  if (el) el.classList.add("active");

  const img = document.getElementById("iphone-pdp-main-img");
  const title = document.getElementById("iphone-pdp-title");
  const price = document.getElementById("iphone-pdp-price");

  if (!img) return;
  img.style.opacity = "0.3";

  setTimeout(() => {
    if (colorName === "black") {
      img.src = "assets/images/prod-headphones.jpg";
      if (title) title.textContent = "AuraSonic Pro X1 • Đen Vũ Trụ";
      if (price) price.textContent = "$145 (7.490.000₫)";
    } else if (colorName === "titanium") {
      img.src = "assets/images/prod-headphones-thumb2.jpg";
      if (title) title.textContent = "AuraSonic Pro X1 • Bạc Titan";
      if (price) price.textContent = "$155 (7.890.000₫)";
    } else if (colorName === "cream") {
      img.src = "assets/images/prod-headphones-thumb3.jpg";
      if (title) title.textContent = "AuraSonic Pro X1 • Trắng Kem Alabaster";
      if (price) price.textContent = "$145 (7.490.000₫)";
    } else if (colorName === "maroon") {
      img.src = "assets/images/team-2.jpg";
      if (title) title.textContent = "Ribbed Quarter-Zip Sweater • Đỏ Mận";
      if (price) price.textContent = "$145 (3.690.000₫)";
    }
    img.style.opacity = "1";
    showToast(`Đã đổi màu sắc trên điện thoại: ${colorName.toUpperCase()}`);
  }, 180);
};

window.selectScrollySize = function(edition, el) {
  playUiSound("toggle");
  document.querySelectorAll(".glass-size-btn").forEach(b => b.classList.remove("active"));
  if (el) el.classList.add("active");
  showToast(`Đã chọn phiên bản âm học: ${edition}`);
};

window.copyCouponCode = function(code) {
  playUiSound("click");
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Đã sao chép mã ưu đãi: ${code}!`);
    }).catch(() => {
      showToast(`Mã ưu đãi: ${code}`);
    });
  } else {
    showToast(`Mã ưu đãi: ${code}`);
  }
};


/* Real-time Web Audio API Spectrum Visualizer & Spatial DSP Studio */
let spatialAudioSource = null;
let spatialAnalyser = null;
let spatialBiquadFilter = null;
let isSpatialVisualizerRunning = false;

function initSpatialAudioStudio() {
  const audioEl = document.getElementById("spatial-audio-player");
  const canvas = document.getElementById("spatial-audio-canvas");
  if (!audioEl || !canvas) return;

  const ctx2d = canvas.getContext("2d");
  const playBtn = document.getElementById("btn-spatial-play");
  const playIcon = document.getElementById("spatial-play-icon");
  const playText = document.getElementById("spatial-play-text");
  const curTime = document.getElementById("audio-current-time");
  const totTime = document.getElementById("audio-total-time");
  const statusText = document.getElementById("audio-status-text");

  function setupNodes() {
    if (spatialAudioSource) return;
    const ctx = getSfxAudioContext();
    if (!ctx) return;
    try {
      spatialAudioSource = ctx.createMediaElementSource(audioEl);
      spatialAnalyser = ctx.createAnalyser();
      spatialAnalyser.fftSize = 128;
      spatialBiquadFilter = ctx.createBiquadFilter();
      
      spatialAudioSource.connect(spatialBiquadFilter);
      spatialBiquadFilter.connect(spatialAnalyser);
      spatialAnalyser.connect(ctx.destination);
    } catch (err) {
      console.warn("Audio node setup notice:", err);
    }
  }

  window.toggleSpatialAudio = function() {
    setupNodes();
    getSfxAudioContext();
    if (audioEl.paused) {
      audioEl.play().then(() => {
        if (playIcon) playIcon.textContent = "⏸";
        if (playText) playText.textContent = "Tạm dừng";
        if (statusText) statusText.textContent = "ĐANG PHÁT LOSSLESS • SPATIAL 360° AUDIO ACTIVE • 96kHz / 24-bit";
        if (!isSpatialVisualizerRunning) renderVisualizer();
      }).catch(e => console.log(e));
    } else {
      audioEl.pause();
      if (playIcon) playIcon.textContent = "▶";
      if (playText) playText.textContent = "Phát Âm Thanh";
      if (statusText) statusText.textContent = "DSP TẠM DỪNG • BẤM PHÁT ĐỂ TIẾP TỤC TRẢI NGHIỆM";
    }
  };

  audioEl.addEventListener("timeupdate", () => {
    if (curTime) {
      const m = Math.floor(audioEl.currentTime / 60);
      const s = Math.floor(audioEl.currentTime % 60);
      curTime.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    if (totTime && audioEl.duration) {
      const dm = Math.floor(audioEl.duration / 60);
      const ds = Math.floor(audioEl.duration % 60);
      totTime.textContent = `${String(dm).padStart(2, "0")}:${String(ds).padStart(2, "0")}`;
    }
  });

  audioEl.addEventListener("ended", () => {
    if (playIcon) playIcon.textContent = "▶";
    if (playText) playText.textContent = "Phát Âm Thanh";
    if (statusText) statusText.textContent = "BẢN THỬ NGHIỆM HOÀN TẤT • BẤM ĐỂ PHÁT LẠI";
  });

  window.setAudioPreset = function(preset, btn) {
    playUiSound("toggle");
    document.querySelectorAll(".audio-mode-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    setupNodes();
    if (!spatialBiquadFilter) return;

    if (preset === "spatial") {
      spatialBiquadFilter.type = "allpass";
      showToast("Đã kích hoạt cấu hình: Spatial 360° Cinema Soundstage");
    } else if (preset === "bass") {
      spatialBiquadFilter.type = "lowshelf";
      spatialBiquadFilter.frequency.value = 180;
      spatialBiquadFilter.gain.value = 6;
      showToast("Đã kích hoạt cấu hình: Bass Boost +6dB Deep Punch");
    } else if (preset === "studio") {
      spatialBiquadFilter.type = "allpass";
      showToast("Đã kích hoạt cấu hình: Studio Master Reference Neutral");
    } else if (preset === "anc") {
      spatialBiquadFilter.type = "highpass";
      spatialBiquadFilter.frequency.value = 350;
      showToast("Đã kích hoạt cấu hình: Mô phỏng triệt tiêu tạp âm ANC 50dB");
    }
  };

  window.setSpatialVolume = function(val) {
    audioEl.volume = Number(val);
  };

  function renderVisualizer() {
    isSpatialVisualizerRunning = true;
    requestAnimationFrame(renderVisualizer);
    ctx2d.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle Grid background
    ctx2d.strokeStyle = "rgba(0, 229, 255, 0.05)";
    ctx2d.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx2d.beginPath();
      ctx2d.moveTo(x, 0);
      ctx2d.lineTo(x, canvas.height);
      ctx2d.stroke();
    }

    if (!spatialAnalyser || audioEl.paused) {
      // Idle animated soundwave
      ctx2d.beginPath();
      ctx2d.strokeStyle = "rgba(0, 229, 255, 0.35)";
      ctx2d.lineWidth = 2;
      const time = Date.now() * 0.003;
      for (let x = 0; x < canvas.width; x += 6) {
        const y = canvas.height / 2 + Math.sin(x * 0.015 + time) * 14 * Math.sin(time * 0.6);
        if (x === 0) ctx2d.moveTo(x, y);
        else ctx2d.lineTo(x, y);
      }
      ctx2d.stroke();
      return;
    }

    const bufferLength = spatialAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    spatialAnalyser.getByteFrequencyData(dataArray);

    const barWidth = (canvas.width / bufferLength) * 1.8;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * (canvas.height - 20);

      const grad = ctx2d.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
      grad.addColorStop(0, "rgba(0, 229, 255, 0.2)");
      grad.addColorStop(0.5, "rgba(0, 229, 255, 0.85)");
      grad.addColorStop(1, "rgba(167, 139, 250, 1)");

      ctx2d.fillStyle = grad;
      ctx2d.fillRect(x, canvas.height - barHeight, barWidth - 3, barHeight);

      ctx2d.fillStyle = "#FFFFFF";
      ctx2d.fillRect(x, canvas.height - barHeight - 4, barWidth - 3, 2);

      x += barWidth;
      if (x > canvas.width) break;
    }
  }
  renderVisualizer();
}

/* Keynote Cinema Controller */
function initKeynoteCinema() {
  const video = document.getElementById("keynote-video-player");
  const playIcon = document.getElementById("video-play-icon");
  const playText = document.getElementById("video-play-text");
  const curTime = document.getElementById("video-current-time");
  const duration = document.getElementById("video-duration");
  const ambientGlow = document.getElementById("video-ambient-glow");
  if (!video) return;

  window.toggleKeynoteVideo = function() {
    playUiSound("click");
    if (video.paused) {
      video.play();
      if (playIcon) playIcon.textContent = "⏸";
      if (playText) playText.textContent = "Tạm dừng";
      if (ambientGlow) ambientGlow.style.opacity = "0.9";
    } else {
      video.pause();
      if (playIcon) playIcon.textContent = "▶";
      if (playText) playText.textContent = "Phát Keynote";
      if (ambientGlow) ambientGlow.style.opacity = "0.4";
    }
  };

  video.addEventListener("timeupdate", () => {
    if (curTime) {
      const m = Math.floor(video.currentTime / 60);
      const s = Math.floor(video.currentTime % 60);
      curTime.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    if (duration && video.duration) {
      const dm = Math.floor(video.duration / 60);
      const ds = Math.floor(video.duration % 60);
      duration.textContent = `${String(dm).padStart(2, "0")}:${String(ds).padStart(2, "0")}`;
    }
  });

  video.addEventListener("ended", () => {
    if (playIcon) playIcon.textContent = "▶";
    if (playText) playText.textContent = "Phát Lại";
    if (ambientGlow) ambientGlow.style.opacity = "0.4";
  });

  window.toggleVideoFullscreen = function() {
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
  };
}

/* Bento Switches & Live Simulated Pulse */
window.toggleBentoAnc = function(el) {
  playUiSound("toggle");
  const isActive = el.classList.toggle("active");
  const label = document.getElementById("bento-anc-label");
  const desc = document.getElementById("bento-anc-desc");
  const icon = document.getElementById("bento-anc-icon");
  if (isActive) {
    if (label) label.textContent = "Hybrid ANC: Đang bật (50dB)";
    if (desc) desc.textContent = "Triệt tiêu tạp âm văn phòng & máy bay";
    if (icon) icon.textContent = "🛡️";
    showToast("Đã kích hoạt Hybrid ANC: Khử ồn tối đa 50dB");
  } else {
    if (label) label.textContent = "Transparency: Xuyên âm tự nhiên";
    if (desc) desc.textContent = "Khuếch đại giọng nói đàm thoại xung quanh";
    if (icon) icon.textContent = "👂";
    showToast("Đã chuyển sang chế độ Xuyên âm (Transparency Mode)");
  }
};

window.toggleSmartDevice = function(el, name) {
  playUiSound("toggle");
  const isActive = el.classList.toggle("active");
  showToast(`Đã ${isActive ? "bật" : "tắt"} thiết bị Matter: ${name}`);
};

function initHeartRateSim() {
  const bpmEl = document.getElementById("live-bpm-counter");
  if (!bpmEl) return;
  setInterval(() => {
    const variation = Math.floor(Math.random() * 5) - 2;
    bpmEl.textContent = 72 + variation;
  }, 2800);
}

/* Custom Cursor & Spotlight Tracking */
function initCustomCursorAndSpotlights() {
  if (window.matchMedia("(pointer: fine)").matches) {
    let dot = document.querySelector(".custom-cursor-dot");
    let ring = document.querySelector(".custom-cursor-ring");
    if (!dot) {
      dot = document.createElement("div");
      dot.className = "custom-cursor-dot";
      document.body.appendChild(dot);
    }
    if (!ring) {
      ring = document.createElement("div");
      ring.className = "custom-cursor-ring";
      document.body.appendChild(ring);
    }

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function renderCursorRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    document.addEventListener("mousedown", () => ring.classList.add("cursor-active"));
    document.addEventListener("mouseup", () => ring.classList.remove("cursor-active"));

    const hoverTargets = "a, button, input, select, textarea, .spotlight-card, .bento-tile, .card";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.add("cursor-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.remove("cursor-hover");
    });
  }

  // Spotlight cards
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".spotlight-card, .bento-tile, .card");
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/* Fly-to-Cart Animation Clone */
function animateFlyToCart(imgSrc, startRect) {
  const cartBadge = document.querySelector(".js-cart-count") || document.querySelector(".cart-badge");
  if (!cartBadge || !startRect) return;
  const endRect = cartBadge.getBoundingClientRect();

  const flying = document.createElement("img");
  flying.src = imgSrc;
  flying.className = "fly-to-cart-item";
  flying.style.left = `${startRect.left}px`;
  flying.style.top = `${startRect.top}px`;
  flying.style.width = `${startRect.width}px`;
  flying.style.height = `${startRect.height}px`;
  document.body.appendChild(flying);

  requestAnimationFrame(() => {
    flying.style.left = `${endRect.left}px`;
    flying.style.top = `${endRect.top}px`;
    flying.style.width = "24px";
    flying.style.height = "24px";
    flying.style.opacity = "0.2";
    flying.style.transform = "scale(0.5) rotate(360deg)";
  });

  setTimeout(() => {
    flying.remove();
    bumpCartBadge();
  }, 650);
}

/* Global Command Palette (Ctrl+K) */
function initCommandPalette() {
  const backdrop = document.getElementById("cmd-palette-backdrop");
  const input = document.getElementById("cmd-palette-input");
  const results = document.getElementById("cmd-palette-results");
  if (!backdrop || !input || !results) return;

  window.toggleCommandPalette = function(open = true) {
    if (open) {
      playUiSound("click");
      backdrop.classList.add("open");
      input.value = "";
      renderResults("");
      setTimeout(() => input.focus(), 80);
    } else {
      backdrop.classList.remove("open");
    }
  };

  document.querySelectorAll(".js-cmd-toggle").forEach(btn => {
    btn.addEventListener("click", () => toggleCommandPalette(true));
  });

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      toggleCommandPalette(!backdrop.classList.contains("open"));
    }
    if (e.key === "Escape" && backdrop.classList.contains("open")) {
      toggleCommandPalette(false);
    }
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) toggleCommandPalette(false);
  });

  function renderResults(q) {
    const query = q.trim().toLowerCase();
    let items = [];

    const pages = [
      { title: "Trang chủ (Homepage)", url: "index.html", icon: "🏠" },
      { title: "Sản phẩm & Dịch vụ (Catalog)", url: "products.html", icon: "🛍️" },
      { title: "Chi tiết sản phẩm (Specification)", url: "product-detail.html", icon: "🔍" },
      { title: "Câu hỏi thường gặp (FAQ)", url: "faq.html", icon: "❓" },
      { title: "Cơ hội nghề nghiệp & Tuyển dụng", url: "careers.html", icon: "🚀" },
      { title: "Liên hệ & Văn phòng R&D", url: "contact.html", icon: "📞" },
      { title: "Giỏ hàng & Đặt hàng", url: "cart.html", icon: "🛒" }
    ];

    items = items.concat(pages.filter(p => !query || p.title.toLowerCase().includes(query)));

    AURATECH_PRODUCTS.forEach(p => {
      if (!query || p.name.toLowerCase().includes(query) || p.categoryLabel.toLowerCase().includes(query)) {
        items.push({
          title: p.name,
          desc: `${p.categoryLabel} • ${formatVND(p.price)}`,
          url: `product-detail.html?id=${p.id}`,
          icon: "⚡"
        });
      }
    });

    if (items.length === 0) {
      results.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-muted);">Không tìm thấy kết quả phù hợp cho "${query}"</div>`;
      return;
    }

    results.innerHTML = items.slice(0, 8).map((it, idx) => `
      <a href="${it.url}" class="command-result-item ${idx === 0 ? 'selected' : ''}">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <span style="font-size:1.2rem;">${it.icon}</span>
          <div>
            <div style="font-weight:700; font-size:0.95rem;">${it.title}</div>
            ${it.desc ? `<div style="font-size:0.78rem; color:var(--text-muted);">${it.desc}</div>` : ''}
          </div>
        </div>
        <span class="kbd-tag">Mở ↵</span>
      </a>
    `).join("");
  }

  input.addEventListener("input", (e) => renderResults(e.target.value));
}

/* 360 Degree View Interactive Turntable Simulation */
let pdp360Index = 0;
window.cyclePdp360View = function() {
  playUiSound("toggle");
  const thumbs = document.querySelectorAll(".pdp-thumb-btn");
  if (!thumbs || thumbs.length === 0) return;
  pdp360Index = (pdp360Index + 1) % thumbs.length;
  thumbs[pdp360Index].click();
  showToast(`Đang xoay góc nhìn 360° (${pdp360Index + 1}/${thumbs.length})`);
};


function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (!timelineItems.length) return;
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  timelineItems.forEach((item, idx) => {
    const card = item.querySelector(".timeline-card");
    const pin = item.querySelector(".timeline-node-pin");
    const isOdd = idx % 2 === 0;

    if (card) {
      gsap.from(card, {
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          toggleActions: "play none none none"
        },
        x: isOdd ? -40 : 40,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out"
      });
    }

    if (pin) {
      gsap.from(pin, {
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          toggleActions: "play none none none"
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        ease: "back.out(2)"
      });
    }
  });
}

function initHeaderScrollReveal() {
  const headerWrapper = document.getElementById("main-header-wrapper");
  const bentoSection = document.getElementById("bento-section");
  if (!headerWrapper || !headerWrapper.classList.contains("header-auto-hide") || !bentoSection) return;
  if (typeof ScrollTrigger === "undefined") return;

  ScrollTrigger.create({
    trigger: bentoSection,
    start: "top 80%",
    onEnter: () => headerWrapper.classList.add("is-revealed"),
    onLeaveBack: () => headerWrapper.classList.remove("is-revealed"),
    onRefresh: (self) => {
      if (self.progress > 0 || (self.scroll && self.scroll() > self.start)) {
        headerWrapper.classList.add("is-revealed");
      } else {
        headerWrapper.classList.remove("is-revealed");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initAudioSfx();
  initThemeAndNav();
  initHeaderScrollReveal();
  updateHeaderBadges();
  initCustomCursorAndSpotlights();
  initCommandPalette();
  initPageTransitions();
  initScrollEffects();
  initClickRipple();
  initHomePage();
  initSpatialAudioStudio();
  initKeynoteCinema();
  initScrollytellingMasterpiece();
  initTimelineAnimation();
  initHeartRateSim();
  initProductsPage();
  initProductDetailPage();
  initBlogPage();
  initContactPage();
  initFaqPage();
  initAuthPage();
  initCartPage();
  initCareersPage();
  initScrollReveal();
});


/* ==========================================================================
   SCOUT MOTORS FORMAT UI/UX LOGIC EXTENSION FOR AURATECH
   - 4-Mode Tech Inspector (Exterior Hotspots, Interior, 360 Drag, CAD Blueprint)
   - Fullscreen Frosted Glass Navigation Drawer
   - Slide-Out Reservation Drawer ($100 Deposit Flow)
   - Auto-hiding Floating Pill Navbar
   ========================================================================== */

// Hotspots Data for AuraSonic ANC Pro X1
const SCOUT_HOTSPOTS_DATA = [
  {
    badge: "HOTSPOT #01 • MÀNG LOA VẬT LIỆU CAO CẤP",
    title: "Màng Loa Beryllium 45mm Carbon Nano",
    desc: "Cấu trúc màng loa siêu nhẹ với độ cứng gấp 4 lần Titanium, tái tạo dải tần rộng từ 10Hz đến 45.000Hz, triệt tiêu hoàn toàn méo tiếng ở âm lượng cực đại.",
    spec: "THD < 0.05%"
  },
  {
    badge: "HOTSPOT #02 • TRIỆT TIÊU TẠP ÂM ĐA ĐIỂM",
    title: "Hệ Thống 6 Microphone Hybrid ANC 50dB",
    desc: "3 micro chùm sóng hướng ngoài bắt tạp âm và 3 micro buồng âm phân tích phản hồi tần số 38.000 lần/giây, triệt tiêu tiếng ồn động cơ và văn phòng hoàn hảo.",
    spec: "Khử ồn 50dB"
  },
  {
    badge: "HOTSPOT #03 • CÔNG THÁI HỌC VÀ CÁCH ÂM",
    title: "Đệm Tai Memory Foam Bọc Da Protein",
    desc: "Chất liệu bọt hoạt tính phân tán áp lực đều 360°, cấu trúc lưới thoáng khí tản nhiệt thụ động, cách âm thụ động lên đến 22dB ngay cả khi chưa bật nguồn.",
    spec: "Áp suất 4.2N"
  },
  {
    badge: "HOTSPOT #04 • CƠ KHÍ CHÍNH XÁC & ĐIỀU KHIỂN",
    title: "Khung Hợp Kim Nhôm-Magie & Digital Crown",
    desc: "Khung hợp kim nhôm-magie cấp hàng không gia công CNC nguyên khối, núm xoay Digital Crown cảm ứng từ tính điều chỉnh âm lượng mượt mà từng nấc 1%.",
    spec: "Khối lượng 248g"
  },
  {
    badge: "HOTSPOT #05 • TRUYỀN DẪN TÍN HIỆU ĐỈNH CAO",
    title: "Cổng Type-C Lossless & Jack 3.5mm Mạ Vàng",
    desc: "Tích hợp bộ giải mã DAC 96kHz/24-bit trực tiếp qua cáp Type-C và cổng analog 3.5mm mạ vàng 24K, tương thích hoàn hảo chuẩn audiophile LDAC và aptX Lossless.",
    spec: "96kHz/24-bit"
  }
];

// 1. Switch Inspector Mode
window.switchInspectorMode = function (mode) {
  const tabs = document.querySelectorAll(".inspector-tab-btn");
  tabs.forEach(tab => {
    if (tab.getAttribute("data-mode") === mode) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  const panes = document.querySelectorAll(".inspector-view-pane");
  panes.forEach(pane => pane.classList.remove("active"));

  const targetPane = document.getElementById("pane-" + mode);
  if (targetPane) {
    targetPane.classList.add("active");
  }
};

// 2. Select Hotspot Pin
window.selectHotspot = function (index) {
  const pins = document.querySelectorAll("#pane-exterior .hotspot-pin");
  pins.forEach((pin, i) => {
    if (i === index) {
      pin.classList.add("active");
    } else {
      pin.classList.remove("active");
    }
  });

  const data = SCOUT_HOTSPOTS_DATA[index];
  if (!data) return;

  const badgeEl = document.getElementById("hotspot-card-badge");
  const titleEl = document.getElementById("hotspot-card-title");
  const descEl = document.getElementById("hotspot-card-desc");

  if (badgeEl) badgeEl.textContent = data.badge;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
};

// 3. 360 Drag Rotator (Using 4 Real Perspective Angles)
const ROTATOR_IMAGES = [
  "assets/images/prod-headphones.jpg",
  "assets/images/prod-headphones-thumb2.jpg",
  "assets/images/prod-headphones-thumb3.jpg",
  "assets/images/prod-headphones-thumb4.jpg"
];
let rotatorIndex = 0;
let isDragging360 = false;
let start360X = 0;

window.start360Drag = function (e) {
  isDragging360 = true;
  start360X = e.pageX || (e.touches && e.touches[0].pageX) || 0;
  document.body.style.userSelect = "none";

  const onMove = function (moveEvent) {
    if (!isDragging360) return;
    const currentX = moveEvent.pageX || (moveEvent.touches && moveEvent.touches[0].pageX) || 0;
    const deltaX = currentX - start360X;

    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        rotatorIndex = (rotatorIndex + 1) % ROTATOR_IMAGES.length;
      } else {
        rotatorIndex = (rotatorIndex - 1 + ROTATOR_IMAGES.length) % ROTATOR_IMAGES.length;
      }
      const imgEl = document.getElementById("img-rotator-360");
      if (imgEl) {
        imgEl.src = ROTATOR_IMAGES[rotatorIndex];
      }
      start360X = currentX;
    }
  };

  const onEnd = function () {
    isDragging360 = false;
    document.body.style.userSelect = "";
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onEnd);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", onEnd);
  };

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onEnd);
  window.addEventListener("touchmove", onMove);
  window.addEventListener("touchend", onEnd);
};

// 4. Fullscreen Frosted Glass Navigation Drawer
window.toggleScoutFullscreenMenu = function (forceState) {
  const menuEl = document.getElementById("scout-fullscreen-menu");
  const triggerBtn = document.getElementById("scout-menu-trigger");
  if (!menuEl) return;

  const shouldOpen = typeof forceState === "boolean" ? forceState : !menuEl.classList.contains("open");
  if (shouldOpen) {
    menuEl.classList.add("open");
    if (triggerBtn) triggerBtn.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    menuEl.classList.remove("open");
    if (triggerBtn) triggerBtn.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// 5. Reservation Slide-Out Drawer
let selectedReservationProductId = "aura-anc-pro";

window.openReservationDrawer = function (productId) {
  const drawerEl = document.getElementById("scout-reservation-drawer");
  const backdropEl = document.getElementById("scout-drawer-backdrop");
  if (!drawerEl || !backdropEl) return;

  if (productId) {
    selectedReservationProductId = productId;
    const cards = document.querySelectorAll(".scout-select-card");
    cards.forEach(card => {
      const match = card.getAttribute("onclick") && card.getAttribute("onclick").includes(productId);
      if (match) {
        card.classList.add("active");
        const check = card.querySelector("span:last-child");
        if (check) check.style.display = "inline-block";
      } else {
        card.classList.remove("active");
        const check = card.querySelector("span:last-child");
        if (check) check.style.display = "none";
      }
    });

    const priceEl = document.getElementById("deposit-full-price");
    if (priceEl) {
      if (productId === "aura-anc-pro") priceEl.textContent = "7.490.000₫";
      if (productId === "aura-watch-ultra") priceEl.textContent = "9.290.000₫";
      if (productId === "aura-vision-vr") priceEl.textContent = "15.990.000₫";
    }
  }

  drawerEl.classList.add("open");
  backdropEl.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeReservationDrawer = function () {
  const drawerEl = document.getElementById("scout-reservation-drawer");
  const backdropEl = document.getElementById("scout-drawer-backdrop");
  if (drawerEl) drawerEl.classList.remove("open");
  if (backdropEl) backdropEl.classList.remove("open");
  document.body.style.overflow = "";
};

window.selectDrawerProduct = function (id, name, price, cardEl) {
  selectedReservationProductId = id;
  const cards = document.querySelectorAll(".scout-select-card");
  cards.forEach(c => {
    c.classList.remove("active");
    const check = c.querySelector("span:last-child");
    if (check) check.style.display = "none";
  });
  if (cardEl) {
    cardEl.classList.add("active");
    const check = cardEl.querySelector("span:last-child");
    if (check) check.style.display = "inline-block";
  }
  const priceEl = document.getElementById("deposit-full-price");
  if (priceEl) {
    priceEl.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
};

window.handleScoutReservationSubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("deposit-customer-name") ? document.getElementById("deposit-customer-name").value : "";
  const phone = document.getElementById("deposit-customer-phone") ? document.getElementById("deposit-customer-phone").value : "";
  const email = document.getElementById("deposit-customer-email") ? document.getElementById("deposit-customer-email").value : "";

  const reservation = {
    productId: selectedReservationProductId,
    customerName: name,
    customerPhone: phone,
    customerEmail: email,
    depositAmount: 500000,
    timestamp: new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem("auratech_reservations") || "[]");
    existing.push(reservation);
    localStorage.setItem("auratech_reservations", JSON.stringify(existing));
  } catch (err) {
    console.warn("Storage err:", err);
  }

  window.closeReservationDrawer();
  if (typeof window.showToast === "function") {
    window.showToast("🎉 Đặt cọc thành công! Mã giữ chỗ đã được gửi về email " + email);
  } else {
    alert("🎉 Đặt cọc thành công! Mã giữ chỗ đã được gửi về email " + email);
  }
};

// 6. Floating Navbar Auto-Hide on Rapid Scroll Down
(function initFloatingNavScroll() {
  let lastScrollY = window.scrollY;
  const navEl = document.getElementById("scout-floating-pill-nav");
  if (!navEl) return;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 150 && currentScrollY > lastScrollY + 15) {
      navEl.classList.add("hidden-nav");
    } else if (currentScrollY < lastScrollY - 10 || currentScrollY < 100) {
      navEl.classList.remove("hidden-nav");
    }
    lastScrollY = currentScrollY;
  }, { passive: true });
})();
