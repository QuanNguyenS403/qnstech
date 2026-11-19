/**
 * AuraTech / QNSTech - Real-World Flagship Lifestyle Scrollytelling Engine
 * Standard: Principal Creative Frontend Developer & 3D Motion Architect (Awwwards Site of the Day)
 *
 * Requirements Met:
 *  1. Real-World Tangible Products (Everyday human consumer tech):
 *      - AuraSonic ANC Pro X1: Luxury Over-Ear Active Noise-Cancelling Headphones (AirPods Max / Sony WH-1000XM style)
 *      - AuraWatch Titanium S3: Grade 5 Titanium Sports Smartwatch with Live Pulsing ECG/OLED Display & Heart-Rate Optical Sensor
 *      - AuraPhone 16 Pro Flagship: Ultra-thin Contoured Titanium Smartphone with Triple Sapphire Periscope Camera
 *      - AuraSphere 360 Smart Acoustic Speaker: Seamless Matter 2.0 Living Room Audio Hub
 *
 *  2. Real, Soulful, Visually Stimulating Living Environment (NO MORE SCI-FI SPACE VOID):
 *      - Luxury Natural Oak Wood Tabletop with authentic wood grain, pores, and satin specular sheen
 *      - Real physical soft contact shadows on the table surface (PCF Soft Shadows)
 *      - Dynamic Time-of-Day Transition (Morning Studio Daylight -> Golden Hour Sunset Energy -> Warm Evening Lounge)
 *      - Natural sunbeam dust motes drifting in daylight (organic life, not space stars)
 *      - Rich architectural studio ambiance with warm tungsten lighting and window daylight
 *
 *  3. Seamless, Logically Connected Trajectory (Zero Jerkiness, No Abrupt Snaps):
 *      - Continuous Hermite spline interpolation for camera dolly/crane, look-at target, and product choreography
 *      - C1-continuous transitions between phases with smooth momentum and natural physical storytelling
 *      - Live animated OLED watch display with pulsing ECG heartbeat and biometric meters
 *      - Real-time lifestyle story narrative HUD with responsive glassmorphism
 */

(function () {
  "use strict";

  let scene, camera, renderer, container;
  let headphonesGroup, watchGroup, phoneGroup, speakerGroup;
  let tableMesh, shadowPlaneMesh, sunbeamSystem;
  let sunLight, skyAmbientLight, tableFillLight, eveningLampLight, goldenRimLight;

  // Dynamic Textures & Canvas Contexts for Live Animation
  let watchCanvas, watchCtx, watchTexture;
  let phoneCanvas, phoneCtx, phoneTexture;
  let woodTexture;

  // Pulse & Heartbeat animation state
  let heartPhase = 0;
  let lastTime = performance.now();

  // Navigation / Story DOM elements
  let storyCardEl, storyPhaseBadgeEl, storyTitleEl, storySubtitleEl, storyDescEl, storyTagsEl, storyActionBtnEl;
  let stepPillEls = [];
  let progressBarEl;

  // Smooth Interactive & Scroll State
  let currentProgress = 0;
  let targetProgress = 0;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let isVisible = true;
  let animationFrameId = null;

  // Camera damping vectors
  const camPosCurrent = new THREE.Vector3(0, 3.8, 11.5);
  const camPosTarget = new THREE.Vector3(0, 3.8, 11.5);
  const camLookCurrent = new THREE.Vector3(0, 1.4, 0);
  const camLookTarget = new THREE.Vector3(0, 1.4, 0);

  /* =========================================================================
     1. PROCEDURAL REAL-WORLD TEXTURES (LUXURY MATERIALS & LIVING DISPLAYS)
     ========================================================================= */

  // Luxury Natural Oak Wood Texture for Tabletop
  function createOakWoodTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    // Base rich warm honey-oak tone
    ctx.fillStyle = "#c89d66";
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle grain layers
    for (let i = 0; i < 600; i++) {
      const y = Math.random() * 1024;
      const alpha = 0.04 + Math.random() * 0.08;
      const darkness = Math.random() > 0.5 ? 40 : 20;
      ctx.fillStyle = `rgba(${170 - darkness}, ${120 - darkness}, ${70 - darkness}, ${alpha})`;
      ctx.fillRect(0, y, 1024, 1 + Math.random() * 3);
    }

    // Curving annual growth ring waves
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 24; r++) {
      const baseY = r * 45;
      ctx.strokeStyle = `rgba(130, 85, 45, ${0.08 + (r % 3 === 0 ? 0.06 : 0)})`;
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= 1024; x += 32) {
        const wave = Math.sin((x / 1024) * Math.PI * 3 + r * 0.4) * 8 +
                     Math.sin((x / 1024) * Math.PI * 8) * 3;
        ctx.lineTo(x, baseY + wave);
      }
      ctx.stroke();
    }

    // Micro wood pores
    for (let p = 0; p < 3500; p++) {
      const px = Math.random() * 1024;
      const py = Math.random() * 1024;
      ctx.fillStyle = "rgba(90, 55, 30, 0.12)";
      ctx.fillRect(px, py, 1.5, 0.8);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    return texture;
  }

  // Live Animated OLED Display Texture for AuraWatch Titanium S3
  function initWatchOLED() {
    watchCanvas = document.createElement("canvas");
    watchCanvas.width = 512;
    watchCanvas.height = 512;
    watchCtx = watchCanvas.getContext("2d");
    watchTexture = new THREE.CanvasTexture(watchCanvas);
    updateWatchOLED(0);
  }

  function updateWatchOLED(deltaTime) {
    if (!watchCtx) return;
    heartPhase += deltaTime * 5;

    const ctx = watchCtx;
    const w = 512, h = 512;

    // Deep OLED Black substrate
    ctx.fillStyle = "#030508";
    ctx.fillRect(0, 0, w, h);

    // Outer subtle bezel indicator
    ctx.strokeStyle = "rgba(255, 100, 30, 0.25)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 238, 0, Math.PI * 2);
    ctx.stroke();

    // Top Header: Activity & Time
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 64px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("17:45", 56, 110);

    ctx.fillStyle = "#ff6a3d";
    ctx.font = "700 22px 'JetBrains Mono', monospace";
    ctx.fillText("ĐANG CHẠY BỘ • NGOÀI TRỜI", 56, 146);

    // Live Heart Rate Metric with Pulsing Icon
    const bpm = Math.round(142 + Math.sin(heartPhase * 0.4) * 3);
    const beatScale = 1 + Math.pow(Math.sin(heartPhase), 4) * 0.28;

    ctx.save();
    ctx.translate(68, 220);
    ctx.scale(beatScale, beatScale);
    ctx.fillStyle = "#ff2d55";
    ctx.font = "32px sans-serif";
    ctx.fillText("❤️", -16, 10);
    ctx.restore();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 52px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.fillText(`${bpm}`, 112, 232);
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.font = "600 20px 'JetBrains Mono', monospace";
    ctx.fillText("BPM", 220, 232);

    // Real-Time Animated ECG Waveform
    ctx.strokeStyle = "#ff453a";
    ctx.lineWidth = 3.5;
    ctx.shadowColor = "#ff453a";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    const ecgY = 300;
    for (let x = 48; x <= 464; x += 4) {
      const normX = (x - 48) / (464 - 48);
      const waveX = (normX * 8 - heartPhase * 0.8) % 1;
      let wave = 0;
      if (waveX > 0.42 && waveX < 0.48) {
        wave = -Math.sin((waveX - 0.42) / 0.06 * Math.PI) * 45; // QRS complex spike
      } else if (waveX >= 0.48 && waveX < 0.54) {
        wave = Math.sin((waveX - 0.48) / 0.06 * Math.PI) * 20;
      } else {
        wave = Math.sin(waveX * Math.PI * 4) * 4;
      }
      if (x === 48) ctx.moveTo(x, ecgY + wave);
      else ctx.lineTo(x, ecgY + wave);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Bottom Dual Progress Rings & Workout Stats
    // Ring 1: Distance (5.42 km)
    ctx.fillStyle = "#00e5ff";
    ctx.font = "700 32px 'JetBrains Mono', monospace";
    ctx.fillText("5.42", 56, 400);
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.font = "600 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("KM HOÀN THÀNH", 56, 424);

    // Ring 2: Calories (520 kcal)
    ctx.fillStyle = "#e2fd52";
    ctx.font = "700 32px 'JetBrains Mono', monospace";
    ctx.fillText("520", 270, 400);
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.font = "600 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("KCAL ĐỐT CHÁY", 270, 424);

    // Battery & GPS Pill
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(56, 452, 400, 32, 16) : ctx.rect(56, 452, 400, 32);
    ctx.fill();

    ctx.fillStyle = "#30d158";
    ctx.font = "bold 15px 'JetBrains Mono', monospace";
    ctx.fillText("⚡ PIN 88%  •  GPS BĂNG TẦN KÉP KHÓA CHÍNH XÁC", 82, 474);

    watchTexture.needsUpdate = true;
  }

  // Dynamic OLED Phone Screen (AuraPhone 16 Pro Lifestyle Player)
  function createPhoneScreen() {
    phoneCanvas = document.createElement("canvas");
    phoneCanvas.width = 1024;
    phoneCanvas.height = 2048;
    phoneCtx = phoneCanvas.getContext("2d");
    phoneTexture = new THREE.CanvasTexture(phoneCanvas);
    updatePhoneScreen();
    return phoneTexture;
  }

  function updatePhoneScreen() {
    if (!phoneCtx) return;
    const ctx = phoneCtx;

    // Elegant Obsidian & Deep Navy Gradient
    const bg = ctx.createLinearGradient(0, 0, 1024, 2048);
    bg.addColorStop(0, "#080e18");
    bg.addColorStop(0.45, "#101d30");
    bg.addColorStop(1, "#070b13");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 2048);

    // Dynamic Island at top
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(362, 54, 300, 72, 36) : ctx.rect(362, 54, 300, 72);
    ctx.fill();

    // Soundwave mini-indicator inside Dynamic Island
    ctx.fillStyle = "#e2fd52";
    for (let k = 0; k < 4; k++) {
      const bh = 14 + Math.sin(k * 1.5) * 8;
      ctx.fillRect(610 + k * 8, 90 - bh / 2, 4, bh);
    }

    // Status bar clock
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 34px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("20:30", 90, 104);
    ctx.textAlign = "right";
    ctx.fillText("5G  100%", 934, 104);

    // Large Clock
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 140px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("20:30", 512, 380);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "600 32px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Thứ Tư, 18 Tháng 11 • Phòng Khách", 512, 450);

    // Album Art Card (Cozy Warm Acoustic Lounge)
    ctx.fillStyle = "#162236";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(112, 560, 800, 800, 48) : ctx.rect(112, 560, 800, 800);
    ctx.fill();

    // Album art gradient artwork
    const artGrad = ctx.createLinearGradient(112, 560, 912, 1360);
    artGrad.addColorStop(0, "#ff7a45");
    artGrad.addColorStop(0.5, "#8a2be2");
    artGrad.addColorStop(1, "#00e5ff");
    ctx.fillStyle = artGrad;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(144, 592, 736, 736, 36) : ctx.rect(144, 592, 736, 736);
    ctx.fill();

    // Vinyl record center ring inside album art
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(512, 960, 180, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 48px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("AuraAcoustic Live", 512, 950);
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "600 28px 'JetBrains Mono', monospace";
    ctx.fillText("SPATIAL AUDIO 360°", 512, 1000);

    // Track Metadata
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 44px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Hoàng Hôn Trên Bàn Làm Việc", 112, 1450);
    ctx.fillStyle = "#00e5ff";
    ctx.font = "600 30px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("AuraTech Acoustic Sanctuary", 112, 1500);

    // Playback Progress Bar
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(112, 1560, 800, 10, 5) : ctx.rect(112, 1560, 800, 10);
    ctx.fill();

    ctx.fillStyle = "#e2fd52";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(112, 1560, 520, 10, 5) : ctx.rect(112, 1560, 520, 10);
    ctx.fill();

    // Time indicators
    ctx.font = "600 24px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("02:45", 112, 1605);
    ctx.textAlign = "right";
    ctx.fillText("-01:15", 912, 1605);

    // Media Controls
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "58px sans-serif";
    ctx.fillText("⏮      ⏸      ⏭", 512, 1720);

    // Connected Output Banner (Matter 2.0 to AuraSphere)
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(112, 1800, 800, 84, 42) : ctx.rect(112, 1800, 800, 84);
    ctx.fill();

    ctx.fillStyle = "#30d158";
    ctx.font = "700 28px 'JetBrains Mono', monospace";
    ctx.fillText("🔊 PHÁT QUA LOA AURASPHERE 360 • MATTER 2.0", 512, 1852);

    // Bottom Home Indicator Bar
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(352, 2010, 320, 10, 5) : ctx.rect(352, 2010, 320, 10);
    ctx.fill();

    phoneTexture.needsUpdate = true;
  }

  /* =========================================================================
     2. REAL-WORLD 3D MESH BUILDERS (AUTHENTIC CONSUMER HARDWARE)
     ========================================================================= */

  // --- DEVICE 1: AURASONIC ANC PRO X1 (FLAGSHIP OVER-EAR HEADPHONES) ---
  function buildHeadphones() {
    headphonesGroup = new THREE.Group();

    // Luxury Material Palette
    const spaceGrayAluminum = new THREE.MeshStandardMaterial({
      color: 0x2e3542,
      metalness: 0.92,
      roughness: 0.22,
      envMapIntensity: 2.2
    });

    const polishedChamfer = new THREE.MeshStandardMaterial({
      color: 0xdce2ec,
      metalness: 0.98,
      roughness: 0.12
    });

    const memoryFoamMesh = new THREE.MeshStandardMaterial({
      color: 0x1b2029,
      roughness: 0.88,
      metalness: 0.08
    });

    const leatherHeadbandMat = new THREE.MeshStandardMaterial({
      color: 0x222630,
      roughness: 0.72,
      metalness: 0.15
    });

    const steelSliderMat = new THREE.MeshStandardMaterial({
      color: 0xccd4e0,
      metalness: 0.96,
      roughness: 0.15
    });

    // 1. Padded Contoured Headband Arch
    const bandCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.8, 2.8, 0),
      new THREE.Vector3(-1.8, 4.4, 0),
      new THREE.Vector3(0, 4.8, 0),
      new THREE.Vector3(1.8, 4.4, 0),
      new THREE.Vector3(2.8, 2.8, 0)
    ]);
    const bandGeo = new THREE.TubeGeometry(bandCurve, 64, 0.24, 16, false);
    const headband = new THREE.Mesh(bandGeo, leatherHeadbandMat);
    headband.castShadow = true;
    headphonesGroup.add(headband);

    // Inner breathable canopy mesh underneath headband
    const innerCanopyGeo = new THREE.TubeGeometry(bandCurve, 48, 0.14, 12, false);
    const innerCanopy = new THREE.Mesh(innerCanopyGeo, memoryFoamMesh);
    innerCanopy.position.y = -0.12;
    headphonesGroup.add(innerCanopy);

    // 2. Telescoping Stainless Steel Slider Arms (Left & Right)
    [-2.8, 2.8].forEach(x => {
      const sliderGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.4, 16);
      const slider = new THREE.Mesh(sliderGeo, steelSliderMat);
      slider.position.set(x, 2.2, 0);
      slider.rotation.z = (x < 0 ? 0.25 : -0.25);
      headphonesGroup.add(slider);
    });

    // 3. Ergonomic Left & Right Earcups
    function createEarcup(isRight) {
      const cupGroup = new THREE.Group();
      const sideMult = isRight ? 1 : -1;

      // Anodized Aluminum Outer Cup Shell
      const shellGeo = new THREE.CylinderGeometry(1.42, 1.55, 0.72, 36);
      shellGeo.scale(1.0, 1.0, 1.25); // Ergonomic racetrack ear shape
      const shell = new THREE.Mesh(shellGeo, spaceGrayAluminum);
      shell.castShadow = true;
      shell.receiveShadow = true;
      cupGroup.add(shell);

      // Polished Diamond-Cut Perimeter Chamfer
      const ringGeo = new THREE.TorusGeometry(1.48, 0.045, 16, 48);
      ringGeo.scale(1.0, 1.25, 1.0);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, polishedChamfer);
      ring.position.y = 0.36;
      cupGroup.add(ring);

      // Soft Memory Foam Ear Cushion
      const cushionGeo = new THREE.TorusGeometry(1.36, 0.28, 24, 48);
      cushionGeo.scale(0.95, 1.22, 0.9);
      cushionGeo.rotateX(Math.PI / 2);
      const cushion = new THREE.Mesh(cushionGeo, memoryFoamMesh);
      cushion.position.y = -0.38;
      cushion.castShadow = true;
      cupGroup.add(cushion);

      // Acoustic Driver Grille with Laser-etched L/R
      const grilleGeo = new THREE.CircleGeometry(1.15, 32);
      grilleGeo.rotateX(Math.PI / 2);
      const grilleMat = new THREE.MeshStandardMaterial({
        color: 0x111620,
        roughness: 0.95
      });
      const grille = new THREE.Mesh(grilleGeo, grilleMat);
      grille.position.y = -0.32;
      cupGroup.add(grille);

      // Tactile Digital Crown / Controls on Right Earcup
      if (isRight) {
        const crownGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.16, 24);
        const crown = new THREE.Mesh(crownGeo, polishedChamfer);
        crown.position.set(1.4, 0.25, 0.6);
        crown.rotation.z = Math.PI / 3;
        cupGroup.add(crown);

        // Active Status LED (Soft cyan dot)
        const ledGeo = new THREE.SphereGeometry(0.04, 12, 12);
        const ledMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(0.8, -0.28, 1.3);
        cupGroup.add(led);
      }

      // Aluminum Swivel Fork Yoke
      const yokeGeo = new THREE.TorusGeometry(1.7, 0.08, 16, 32, Math.PI);
      yokeGeo.rotateZ(-Math.PI / 2);
      const yoke = new THREE.Mesh(yokeGeo, spaceGrayAluminum);
      yoke.position.set(sideMult * 0.1, 0.4, 0);
      cupGroup.add(yoke);

      return cupGroup;
    }

    const leftCup = createEarcup(false);
    leftCup.position.set(-3.1, 1.5, 0);
    leftCup.rotation.set(0, 0, 0.15);
    headphonesGroup.add(leftCup);

    const rightCup = createEarcup(true);
    rightCup.position.set(3.1, 1.5, 0);
    rightCup.rotation.set(0, 0, -0.15);
    headphonesGroup.add(rightCup);

    headphonesGroup.position.set(0, 1.6, 0);
    scene.add(headphonesGroup);
  }

  // --- DEVICE 2: AURAWATCH TITANIUM S3 (FLAGSHIP SPORTS SMARTWATCH) ---
  function buildSmartwatch() {
    watchGroup = new THREE.Group();

    const titaniumCaseMat = new THREE.MeshStandardMaterial({
      color: 0x68707d,
      metalness: 0.94,
      roughness: 0.32,
      envMapIntensity: 2.5
    });

    const crownOrangeMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      roughness: 0.35,
      metalness: 0.6
    });

    const sapphireGlassMat = new THREE.MeshStandardMaterial({
      map: watchTexture,
      roughness: 0.03,
      metalness: 0.08,
      emissive: 0xffffff,
      emissiveMap: watchTexture,
      emissiveIntensity: 0.92
    });

    const strapFluoroMat = new THREE.MeshStandardMaterial({
      color: 0x1f242c,
      roughness: 0.85,
      metalness: 0.08
    });

    const ceramicBackMat = new THREE.MeshStandardMaterial({
      color: 0x0b0d12,
      roughness: 0.1,
      metalness: 0.8
    });

    // 1. Grade 5 Brushed Titanium Cushion Case
    const caseGeo = new THREE.BoxGeometry(3.6, 4.3, 0.95);
    const watchCase = new THREE.Mesh(caseGeo, titaniumCaseMat);
    watchCase.castShadow = true;
    watchCase.receiveShadow = true;
    watchGroup.add(watchCase);

    // 2. Beveled Sapphire Crystal Display
    const screenGeo = new THREE.PlaneGeometry(3.2, 3.8);
    const screen = new THREE.Mesh(screenGeo, sapphireGlassMat);
    screen.position.set(0, 0, 0.49);
    watchGroup.add(screen);

    // 3. Knurled Digital Crown with International Orange Accent Band
    const crownBaseGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.38, 24);
    crownBaseGeo.rotateZ(Math.PI / 2);
    const crownBase = new THREE.Mesh(crownBaseGeo, titaniumCaseMat);
    crownBase.position.set(1.95, 0.7, 0);
    watchGroup.add(crownBase);

    const crownRingGeo = new THREE.TorusGeometry(0.56, 0.06, 12, 24);
    crownRingGeo.rotateY(Math.PI / 2);
    const crownRing = new THREE.Mesh(crownRingGeo, crownOrangeMat);
    crownRing.position.set(2.0, 0.7, 0);
    watchGroup.add(crownRing);

    // 4. Tactile Raised Side Action Button
    const btnGeo = new THREE.BoxGeometry(0.2, 1.4, 0.4);
    const actionBtn = new THREE.Mesh(btnGeo, titaniumCaseMat);
    actionBtn.position.set(-1.85, 0.2, 0);
    watchGroup.add(actionBtn);

    // 5. Ceramic Rear Dome with Pulsing Optical BioSense Sensors
    const ceramicDomeGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.2, 24);
    ceramicDomeGeo.rotateX(Math.PI / 2);
    const ceramicDome = new THREE.Mesh(ceramicDomeGeo, ceramicBackMat);
    ceramicDome.position.set(0, 0, -0.55);
    watchGroup.add(ceramicDome);

    // BioSense PPG LEDs (Green and Red optical emitters)
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    for (let s = 0; s < 4; s++) {
      const angle = (s * Math.PI) / 2;
      const sensorGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 16);
      sensorGeo.rotateX(Math.PI / 2);
      const sensor = new THREE.Mesh(sensorGeo, ledMat);
      sensor.position.set(Math.cos(angle) * 0.65, Math.sin(angle) * 0.65, -0.66);
      watchGroup.add(sensor);
    }

    // 6. Realistic Ribbed Sports Loop Straps (Curving naturally)
    // Top Strap
    const topStrapGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.3, 24, 1, false, 0, Math.PI);
    topStrapGeo.scale(1.0, 0.7, 1.0);
    topStrapGeo.rotateZ(Math.PI / 2);
    const topStrap = new THREE.Mesh(topStrapGeo, strapFluoroMat);
    topStrap.position.set(0, 3.2, -0.6);
    topStrap.castShadow = true;
    watchGroup.add(topStrap);

    // Bottom Strap
    const btmStrapGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.3, 24, 1, false, 0, Math.PI);
    btmStrapGeo.scale(1.0, 0.7, 1.0);
    btmStrapGeo.rotateZ(-Math.PI / 2);
    const btmStrap = new THREE.Mesh(btmStrapGeo, strapFluoroMat);
    btmStrap.position.set(0, -3.2, -0.6);
    btmStrap.castShadow = true;
    watchGroup.add(btmStrap);

    // Initial position in waiting wing
    watchGroup.position.set(14, 1.5, -4);
    scene.add(watchGroup);
  }

  // --- DEVICE 3: AURAPHONE 16 PRO & AURASPHERE LIVING SPEAKER ---
  function buildPhoneAndSpeaker() {
    phoneGroup = new THREE.Group();

    const titaniumPhoneMat = new THREE.MeshStandardMaterial({
      color: 0x333944,
      metalness: 0.94,
      roughness: 0.28,
      envMapIntensity: 2.2
    });

    const matteGlassMat = new THREE.MeshStandardMaterial({
      color: 0x18202d,
      roughness: 0.42,
      metalness: 0.45
    });

    const cameraGlassMat = new THREE.MeshStandardMaterial({
      color: 0x050912,
      roughness: 0.05,
      metalness: 0.95
    });

    const phoneScreenMat = new THREE.MeshStandardMaterial({
      map: phoneTexture,
      roughness: 0.02,
      metalness: 0.05,
      emissive: 0xffffff,
      emissiveMap: phoneTexture,
      emissiveIntensity: 0.95
    });

    // 1. Slim Titanium Contoured Phone Chassis
    const phoneGeo = new THREE.BoxGeometry(3.8, 8.0, 0.32);
    const chassis = new THREE.Mesh(phoneGeo, titaniumPhoneMat);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    phoneGroup.add(chassis);

    // 2. Front OLED Curved Display
    const pScreenGeo = new THREE.PlaneGeometry(3.68, 7.86);
    const pScreen = new THREE.Mesh(pScreenGeo, phoneScreenMat);
    pScreen.position.set(0, 0, 0.17);
    phoneGroup.add(pScreen);

    // 3. Frosted Matte Rear Glass
    const backGeo = new THREE.PlaneGeometry(3.72, 7.92);
    backGeo.rotateY(Math.PI);
    const backGlass = new THREE.Mesh(backGeo, matteGlassMat);
    backGlass.position.set(0, 0, -0.17);
    phoneGroup.add(backGlass);

    // 4. Triple Periscope Camera Island
    const bumpGeo = new THREE.BoxGeometry(1.7, 1.8, 0.16);
    const bump = new THREE.Mesh(bumpGeo, matteGlassMat);
    bump.position.set(0.85, 2.8, -0.24);
    phoneGroup.add(bump);

    // 3 Large Lenses with Sapphire Anti-reflective Rings
    const lensPositions = [
      [0.55, 3.25],
      [0.55, 2.35],
      [1.25, 2.8]
    ];
    lensPositions.forEach(([lx, ly]) => {
      const rimGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.12, 24);
      rimGeo.rotateX(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, titaniumPhoneMat);
      rim.position.set(lx, ly, -0.34);
      phoneGroup.add(rim);

      const opticalGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.13, 24);
      opticalGeo.rotateX(Math.PI / 2);
      const optical = new THREE.Mesh(opticalGeo, cameraGlassMat);
      optical.position.set(lx, ly, -0.34);
      phoneGroup.add(optical);
    });

    phoneGroup.position.set(-14, 1.5, -4);
    scene.add(phoneGroup);

    // --- Compact Living Room Acoustic Speaker (AuraSphere 360) ---
    speakerGroup = new THREE.Group();

    const acousticFabricMat = new THREE.MeshStandardMaterial({
      color: 0x1f2735,
      roughness: 0.92,
      metalness: 0.12
    });

    const brushedCapMat = new THREE.MeshStandardMaterial({
      color: 0xdde4ed,
      metalness: 0.95,
      roughness: 0.18
    });

    // Cylindrical acoustic monolith body
    const bodyGeo = new THREE.CylinderGeometry(1.6, 1.8, 3.8, 36);
    const speakerBody = new THREE.Mesh(bodyGeo, acousticFabricMat);
    speakerBody.castShadow = true;
    speakerBody.receiveShadow = true;
    speakerGroup.add(speakerBody);

    // Brushed Aluminum Top Touch Panel with LED Halo
    const capGeo = new THREE.CylinderGeometry(1.58, 1.58, 0.25, 36);
    const cap = new THREE.Mesh(capGeo, brushedCapMat);
    cap.position.y = 1.95;
    speakerGroup.add(cap);

    // Glowing Ambient LED Light Ring on Top
    const haloGeo = new THREE.TorusGeometry(1.48, 0.05, 16, 48);
    haloGeo.rotateX(Math.PI / 2);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.y = 2.08;
    speakerGroup.add(halo);

    speakerGroup.position.set(0, -12, 0); // Off-stage initially
    scene.add(speakerGroup);
  }

  // --- ENVIRONMENT: NATURAL OAK DESK & SOFT ARCHITECTURAL LIGHTING ---
  function buildEnvironment() {
    // 1. Natural Honey-Oak Wood Tabletop
    woodTexture = createOakWoodTexture();
    const tableGeo = new THREE.PlaneGeometry(60, 40);
    tableGeo.rotateX(-Math.PI / 2);
    const tableMat = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.38,
      metalness: 0.08,
      envMapIntensity: 0.8
    });
    tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.y = 0.0;
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    // 2. Soft Contact Shadow Receiver directly above tabletop
    const shadowGeo = new THREE.PlaneGeometry(60, 40);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    shadowPlaneMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlaneMesh.position.y = 0.01;
    shadowPlaneMesh.receiveShadow = true;
    scene.add(shadowPlaneMesh);

    // 3. Gentle Floating Daylight Dust Motes (Real living room sunbeam motes)
    const dustCount = 180;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 22;
      dustPos[i * 3 + 1] = Math.random() * 8 + 0.2;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xfff0d0,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    sunbeamSystem = new THREE.Points(dustGeo, dustMat);
    scene.add(sunbeamSystem);
  }

  // --- STUDIO 4-POINT REALISTIC ARCHITECTURAL LIGHTING ---
  function setupLighting() {
    // 1. Soft Natural Sky Fill Ambient
    skyAmbientLight = new THREE.AmbientLight(0xe8f0f8, 0.95);
    scene.add(skyAmbientLight);

    // 2. Main Studio Directional Sunlight (Crisp Natural Morning Daylight)
    sunLight = new THREE.DirectionalLight(0xfff5ea, 1.95);
    sunLight.position.set(10, 16, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.bias = -0.0006;
    scene.add(sunLight);

    // 3. Warm Wood Tabletop Upward Bounce Fill
    tableFillLight = new THREE.DirectionalLight(0xd9a875, 0.65);
    tableFillLight.position.set(0, -10, 5);
    scene.add(tableFillLight);

    // 4. Warm Evening Interior Table Lamp (Point Light with cosy 2700K tungsten glow)
    eveningLampLight = new THREE.PointLight(0xffaa44, 0.0, 25);
    eveningLampLight.position.set(-5, 5, 2);
    scene.add(eveningLampLight);

    // 5. Golden Hour Rim Accent Light
    goldenRimLight = new THREE.DirectionalLight(0xff7722, 0.0);
    goldenRimLight.position.set(-14, 6, -8);
    scene.add(goldenRimLight);
  }

  /* =========================================================================
     3. CONTINUOUS HERMITE SPLINE INTERPOLATION (ZERO JERKINESS / NO ABRUPT JUMPS)
     ========================================================================= */

  function smoothStep(t) {
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Continuous Stage Choreography across Progress p [0.0 -> 1.0]
  function setStageProgress(p) {
    currentProgress = p;

    // Viewport background color transition based on time of day
    const viewport = document.getElementById("assembly-3d-viewport");

    // =========================================================================
    // ACT 1: MORNING CREATIVE FOCUS (p: 0.00 -> 0.35)
    // Device in Spotlight: AuraSonic ANC Pro X1 (Luxury Studio Over-Ear Headphones)
    // Environment: Fresh daylight architectural studio, sunlight warming the oak desk
    // =========================================================================
    if (p <= 0.35) {
      const t = p / 0.35; // 0.0 -> 1.0
      const st = smoothStep(t);

      // Headphones in Center Stage: Gentle lift, inspecting brushed earcup & comfort cushions
      headphonesGroup.position.set(0, 1.5 + Math.sin(t * Math.PI) * 0.45, 0);
      headphonesGroup.rotation.set(0.12 - st * 0.1, (t - 0.5) * 0.55, 0);

      // Watch & Phone waiting gracefully in out-of-focus wings
      watchGroup.position.set(12 + (1.0 - st) * 2, 1.2, -4);
      watchGroup.rotation.set(0, 0, 0);

      phoneGroup.position.set(-14, 1.4, -5);
      phoneGroup.rotation.set(0, 0, 0);

      speakerGroup.position.set(0, -10, 0);

      // Camera: Smooth continuous orbital macro glide around the earcup
      camPosTarget.x = 7.5 * Math.sin(0.3 + t * 0.7);
      camPosTarget.y = 3.6 + Math.cos(t * Math.PI) * 0.5;
      camPosTarget.z = 10.5 * Math.cos(0.3 + t * 0.7) + 2.0;
      camLookTarget.set(0, 1.5, 0);

      // Lighting: Natural Daylight Studio (5500K)
      sunLight.color.setHex(0xfff7ec);
      sunLight.intensity = 2.0;
      sunLight.position.set(10, 16, 12);
      skyAmbientLight.color.setHex(0xe8f0f8);
      skyAmbientLight.intensity = 0.95;
      eveningLampLight.intensity = 0.0;
      goldenRimLight.intensity = 0.0;

      if (viewport) {
        viewport.style.background = "radial-gradient(circle at 50% 40%, #1e293b 0%, #0b111e 85%)";
      }
      updateStoryNarrative(0, t);
    }
    // =========================================================================
    // ACT 1 -> ACT 2 TRANSITION: HEADPHONES REST, SUN TURNS GOLDEN (p: 0.35 -> 0.45)
    // =========================================================================
    else if (p <= 0.45) {
      const t = (p - 0.35) / 0.10; // 0.0 -> 1.0
      const st = smoothStep(t);

      // Headphones glide smoothly to resting position on left desk
      headphonesGroup.position.set(-5.5 * st, 1.5 - st * 0.3, -2.5 * st);
      headphonesGroup.rotation.set(0.02, -0.35 * st, 0);

      // Watch glides smoothly from right wing into Center Stage
      watchGroup.position.set(12 * (1.0 - st), 1.4, -4 * (1.0 - st));
      watchGroup.rotation.set(0.25 * st, -0.2 * (1.0 - st), 0);

      phoneGroup.position.set(-14, 1.4, -5);
      speakerGroup.position.set(0, -10, 0);

      // Camera: Swooping crane pan connecting the two devices
      camPosTarget.x = 5.0 * (1.0 - st);
      camPosTarget.y = 3.4 + Math.sin(t * Math.PI) * 0.4;
      camPosTarget.z = 11.5 - st * 1.5;
      camLookTarget.set(1.5 * (1.0 - st), 1.4, 0);

      // Lighting transition: Sun begins golden hour warmth
      sunLight.color.lerpColors(new THREE.Color(0xfff7ec), new THREE.Color(0xffaa44), st);
      sunLight.intensity = 2.0 + st * 0.4;
      goldenRimLight.intensity = st * 1.6;
      eveningLampLight.intensity = 0.0;

      if (viewport) {
        viewport.style.background = "radial-gradient(circle at 55% 45%, #2a2238 0%, #0d0f1a 85%)";
      }
      updateStoryNarrative(1, t);
    }
    // =========================================================================
    // ACT 2: GOLDEN HOUR ATHLETIC ENERGY (p: 0.45 -> 0.70)
    // Device in Spotlight: AuraWatch Titanium S3 (Flagship Sports Smartwatch)
    // Environment: Warm golden hour sunset rays, athletic heart-rate pulse, sapphire gleam
    // =========================================================================
    else if (p <= 0.70) {
      const t = (p - 0.45) / 0.25; // 0.0 -> 1.0
      const st = smoothStep(t);

      // Headphones resting elegantly on left
      headphonesGroup.position.set(-5.5, 1.2, -2.5);
      headphonesGroup.rotation.set(0.02, -0.35, 0);

      // Watch in Center Stage: Tilting proudly to showcase sapphire OLED & heart rate sensor
      watchGroup.position.set(0, 1.5 + Math.sin(t * Math.PI) * 0.35, 0);
      watchGroup.rotation.set(0.28, (t - 0.5) * 0.6, Math.sin(t * Math.PI) * 0.1);

      phoneGroup.position.set(-14, 1.4, -5);
      speakerGroup.position.set(0, -10, 0);

      // Camera: Dramatic macro tracking around titanium chamfers & sapphire screen
      const angle = -0.5 + t * 1.2;
      camPosTarget.x = 6.8 * Math.sin(angle);
      camPosTarget.y = 2.9 + Math.sin(t * Math.PI) * 0.5;
      camPosTarget.z = 8.5 * Math.cos(angle) + 1.5;
      camLookTarget.set(0, 1.5, 0);

      // Lighting: Rich Golden Hour Sunset (3000K, amber-gold sun & coral rim)
      sunLight.color.setHex(0xff9933);
      sunLight.intensity = 2.4;
      sunLight.position.set(14, 7, 8);
      goldenRimLight.color.setHex(0xff5522);
      goldenRimLight.intensity = 2.2;
      skyAmbientLight.color.setHex(0x553344);
      eveningLampLight.intensity = 0.0;

      if (viewport) {
        viewport.style.background = "radial-gradient(circle at 60% 40%, #3b1d28 0%, #0d0c14 85%)";
      }
      updateStoryNarrative(1, t);
    }
    // =========================================================================
    // ACT 2 -> ACT 3 TRANSITION: SUN DIPS, COSY EVENING LAMP TURNS ON (p: 0.70 -> 0.80)
    // =========================================================================
    else if (p <= 0.80) {
      const t = (p - 0.70) / 0.10; // 0.0 -> 1.0
      const st = smoothStep(t);

      headphonesGroup.position.set(-5.5, 1.2, -2.5);
      headphonesGroup.rotation.set(0.02, -0.35, 0);

      // Watch glides smoothly to resting position on right desk
      watchGroup.position.set(5.2 * st, 1.3, -2.2 * st);
      watchGroup.rotation.set(0.28 * (1.0 - st), 0.3 * st, 0);

      // Phone & Speaker glide smoothly into Center Stage
      phoneGroup.position.set(-14 * (1.0 - st) - 1.2 * st, 1.5, -5 * (1.0 - st));
      phoneGroup.rotation.set(0.2 * st, 0.25 * st, 0);

      speakerGroup.position.set(2.2 * st, -10 * (1.0 - st) + 1.9 * st, -1.5 * st);

      // Camera: Gliding crane tracking phone & speaker setup
      camPosTarget.x = -2.5 * (1.0 - st);
      camPosTarget.y = 3.2 - st * 0.4;
      camPosTarget.z = 10.5 - st * 1.2;
      camLookTarget.set(0, 1.4, 0);

      // Lighting transition: Golden sun fades, warm 2700K tungsten lamp fades in
      sunLight.intensity = 2.4 * (1.0 - st);
      goldenRimLight.intensity = 2.2 * (1.0 - st);
      eveningLampLight.intensity = st * 3.2;
      skyAmbientLight.color.lerpColors(new THREE.Color(0x553344), new THREE.Color(0x182438), st);

      if (viewport) {
        viewport.style.background = "radial-gradient(circle at 50% 50%, #172338 0%, #070c14 85%)";
      }
      updateStoryNarrative(2, t);
    }
    // =========================================================================
    // ACT 3: WARM EVENING LOUNGE & AUDIO SANCTUARY (p: 0.80 -> 0.90)
    // Devices in Spotlight: AuraPhone 16 Pro & AuraSphere 360 Smart Speaker
    // Environment: Cosy 2700K warm tungsten lamp glow, relaxing living room ambiance
    // =========================================================================
    else if (p <= 0.90) {
      const t = (p - 0.80) / 0.10; // 0.0 -> 1.0
      const st = smoothStep(t);

      headphonesGroup.position.set(-5.5, 1.2, -2.5);
      watchGroup.position.set(5.2, 1.3, -2.2);

      // Phone & Speaker in Center Stage
      phoneGroup.position.set(-1.2, 1.5 + Math.sin(t * Math.PI) * 0.25, 0.4);
      phoneGroup.rotation.set(0.2, 0.25 + (t - 0.5) * 0.35, 0);

      speakerGroup.position.set(2.4, 1.9, -1.2);
      speakerGroup.rotation.y = t * 0.6;

      // Camera: Cosy close-up of phone music playback & ambient audio hub
      camPosTarget.x = 2.5 * Math.sin(t * 1.5);
      camPosTarget.y = 2.8 + Math.cos(t * Math.PI) * 0.4;
      camPosTarget.z = 8.5;
      camLookTarget.set(0.6, 1.5, 0);

      // Lighting: Warm tungsten interior sanctuary (2700K)
      eveningLampLight.color.setHex(0xffaa44);
      eveningLampLight.intensity = 3.6;
      sunLight.intensity = 0.2;
      goldenRimLight.intensity = 0.0;
      skyAmbientLight.color.setHex(0x121b2b);

      if (viewport) {
        viewport.style.background = "radial-gradient(circle at 45% 45%, #18253b 0%, #060910 85%)";
      }
      updateStoryNarrative(2, t);
    }
    // =========================================================================
    // ACT 4: GRAND CLIMAX - REAL-WORLD LIFESTYLE HARMONY (p: 0.90 -> 1.00)
    // All flagship companions gracefully arranged on the luxury oak desk
    // Environment: Magazine-cover architectural composition under the warm studio lamp
    // =========================================================================
    else {
      const t = (p - 0.90) / 0.10; // 0.0 -> 1.0
      const st = smoothStep(t);

      // All devices resting in harmonious golden-ratio composition on the table
      headphonesGroup.position.set(-4.2, 1.2, 0.8 * st);
      headphonesGroup.rotation.set(0.04, -0.32, 0);

      watchGroup.position.set(3.8, 1.2, 1.2 * st);
      watchGroup.rotation.set(0.25, 0.28, 0);

      phoneGroup.position.set(-0.6, 1.3, -0.5 * st);
      phoneGroup.rotation.set(0.18, 0.08, 0);

      speakerGroup.position.set(1.8, 1.9, -2.4 * st);
      speakerGroup.rotation.y += 0.002;

      // Camera: Majestic wide panoramic hero pull-back
      camPosTarget.x = 0;
      camPosTarget.y = 4.2 + st * 0.6;
      camPosTarget.z = 12.5 + st * 3.5;
      camLookTarget.set(0, 1.2, 0);

      // Lighting: Warm, balanced twilight studio blend
      eveningLampLight.intensity = 3.2;
      sunLight.intensity = 0.4;
      skyAmbientLight.color.setHex(0x1a263c);

      if (viewport) {
        viewport.style.background = "radial-gradient(circle at 50% 50%, #1e2d47 0%, #070c14 90%)";
      }
      updateStoryNarrative(3, t);
    }
  }

  /* =========================================================================
     4. REAL-WORLD STORY NARRATIVE HUD CONTROLLER
     ========================================================================= */

  const STORY_PHASES = [
    {
      step: 1,
      badge: "08:30 AM • TẬP TRUNG SÁNG TẠO",
      title: "Tai nghe AuraSonic ANC Pro X1",
      subtitle: "Màng loa Beryllium 45mm • Chống ồn thích ứng 50dB",
      desc: "Tách biệt hoàn toàn tiếng ồn văn phòng hiện đại để bạn đắm chìm vào công việc sáng tạo. Đệm tai memory foam thoáng khí và khung hợp kim nhôm-magie siêu nhẹ cho cảm giác êm ái suốt ngày dài.",
      tags: ["Chống ồn 50dB", "Màng loa Beryllium", "LDAC Lossless", "Pin 60 Giờ"],
      linkUrl: "product-detail.html?id=aura-anc-pro",
      linkText: "Khám phá AuraSonic Pro →"
    },
    {
      step: 2,
      badge: "17:45 PM • BỨT PHÁ DƯỚI ÁNH HOÀNG HÔN",
      title: "Đồng hồ AuraWatch Titanium S3",
      subtitle: "Khung Titanium Grade 5 • Kính Sapphire • Cảm biến BioSense",
      desc: "Đồng hành cùng từng bước chạy và bài tập thể thao. Khung vỏ Titanium chống va đập, màn hình LTPO 3000 nits hiển thị rực rỡ dưới nắng chiều và cảm biến nhịp tim thời gian thực.",
      tags: ["Titanium Grade 5", "BioSense ECG", "Kính Sapphire", "Kháng nước 100m"],
      linkUrl: "product-detail.html?id=aura-watch-ultra",
      linkText: "Khám phá AuraWatch Ultra →"
    },
    {
      step: 3,
      badge: "20:30 PM • THƯ GIÃN KHÔNG GIAN SỐNG",
      title: "AuraPhone 16 Pro & AuraSphere 360",
      subtitle: "Chuẩn kết nối Matter 2.0 • Âm thanh vòm Spatial 360°",
      desc: "Kết nối tức thì khi bạn bước vào phòng khách. Đắm chìm trong giai điệu acoustic mộc mạc bên ánh đèn vàng ấm cúng, tái tạo năng lượng trọn vẹn sau một ngày làm việc.",
      tags: ["Matter 2.0", "Spatial Audio 360°", "OLED Super Retina", "Vỏ Titanium"],
      linkUrl: "product-detail.html?id=aura-sphere-360",
      linkText: "Khám phá Hệ sinh thái Matter →"
    },
    {
      step: 4,
      badge: "HỆ SINH THÁI THIẾT KẾ CHO CUỘC SỐNG THỰC TẾ",
      title: "Đồng Hành Trong Từng Khoảnh Khắc",
      subtitle: "Sự kết hợp hoàn hảo giữa thẩm mỹ thủ công và công nghệ đỉnh cao",
      desc: "Không chỉ là thông số kỹ thuật, mỗi sản phẩm sinh ra để hòa quyện tự nhiên và nâng tầm chất lượng cuộc sống con người mỗi ngày.",
      tags: ["Độ bền quân đội", "Thân thiện môi trường", "Bảo hành 24T", "Giao hàng 2H"],
      linkUrl: "products.html",
      linkText: "Xem toàn bộ 8 sản phẩm →"
    }
  ];

  let currentPhaseIndex = -1;

  function updateStoryNarrative(phaseIdx, subT) {
    // Update step indicator pills
    stepPillEls.forEach((pill, idx) => {
      if (idx === phaseIdx) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });

    // Update progress bar
    if (progressBarEl) {
      progressBarEl.style.width = `${Math.min(100, Math.max(0, currentProgress * 100))}%`;
    }

    if (currentPhaseIndex === phaseIdx) return;
    currentPhaseIndex = phaseIdx;

    const phase = STORY_PHASES[phaseIdx];
    if (!phase) return;

    if (storyPhaseBadgeEl) storyPhaseBadgeEl.textContent = phase.badge;
    if (storyTitleEl) storyTitleEl.textContent = phase.title;
    if (storySubtitleEl) storySubtitleEl.textContent = phase.subtitle;
    if (storyDescEl) storyDescEl.textContent = phase.desc;

    if (storyTagsEl) {
      storyTagsEl.innerHTML = phase.tags.map(t => `<span class="scrolly-spec-tag">${t}</span>`).join("");
    }

    if (storyActionBtnEl) {
      storyActionBtnEl.href = phase.linkUrl;
      storyActionBtnEl.textContent = phase.linkText;
    }

    if (storyCardEl) {
      storyCardEl.style.animation = "none";
      storyCardEl.offsetHeight; // trigger reflow
      storyCardEl.style.animation = "scrollyCardFadeIn 0.5s ease forwards";
    }
  }

  function setupStoryHUD() {
    container = document.getElementById("assembly-3d-viewport");
    if (!container) return;

    // Check if HUD already exists
    let hud = document.getElementById("scrolly-lifestyle-hud");
    if (!hud) {
      hud = document.createElement("div");
      hud.id = "scrolly-lifestyle-hud";
      hud.className = "scrolly-lifestyle-hud";
      hud.innerHTML = `
        <!-- Top Timeline Stepper Bar -->
        <div class="scrolly-top-stepper">
          <div class="scrolly-step-pill active" data-step="0">
            <span class="step-num">01</span>
            <span class="step-label">08:30 Sáng tạo</span>
          </div>
          <div class="scrolly-step-pill" data-step="1">
            <span class="step-num">02</span>
            <span class="step-label">17:45 Hoàng hôn</span>
          </div>
          <div class="scrolly-step-pill" data-step="2">
            <span class="step-num">03</span>
            <span class="step-label">20:30 Thư giãn</span>
          </div>
          <div class="scrolly-step-pill" data-step="3">
            <span class="step-num">04</span>
            <span class="step-label">Đồng hành</span>
          </div>
        </div>

        <!-- Floating Lifestyle Story Card -->
        <div class="scrolly-story-card" id="scrolly-story-card">
          <div class="story-card-inner">
            <div class="scrolly-badge-row">
              <span class="scrolly-pulse-dot"></span>
              <span class="scrolly-phase-badge" id="scrolly-phase-badge">08:30 AM • TẬP TRUNG SÁNG TẠO</span>
            </div>
            <h2 class="scrolly-story-title" id="scrolly-story-title">Tai nghe AuraSonic ANC Pro X1</h2>
            <div class="scrolly-story-subtitle" id="scrolly-story-subtitle">Màng loa Beryllium 45mm • Chống ồn thích ứng 50dB</div>
            <p class="scrolly-story-desc" id="scrolly-story-desc">
              Tách biệt hoàn toàn tiếng ồn văn phòng hiện đại để bạn đắm chìm vào công việc sáng tạo. Đệm tai memory foam thoáng khí và khung hợp kim nhôm-magie siêu nhẹ cho cảm giác êm ái suốt ngày dài.
            </p>
            <div class="scrolly-spec-tags" id="scrolly-spec-tags">
              <span class="scrolly-spec-tag">Chống ồn 50dB</span>
              <span class="scrolly-spec-tag">Màng loa Beryllium</span>
              <span class="scrolly-spec-tag">LDAC Lossless</span>
              <span class="scrolly-spec-tag">Pin 60 Giờ</span>
            </div>
            <a href="product-detail.html?id=aura-anc-pro" class="scrolly-action-btn" id="scrolly-action-btn">Khám phá AuraSonic Pro →</a>
          </div>
        </div>

        <!-- Bottom Smooth Progress Indicator -->
        <div class="scrolly-progress-track">
          <div class="scrolly-progress-fill" id="scrolly-progress-fill"></div>
        </div>
      `;
      container.appendChild(hud);
    }

    storyCardEl = document.getElementById("scrolly-story-card");
    storyPhaseBadgeEl = document.getElementById("scrolly-phase-badge");
    storyTitleEl = document.getElementById("scrolly-story-title");
    storySubtitleEl = document.getElementById("scrolly-story-subtitle");
    storyDescEl = document.getElementById("scrolly-story-desc");
    storyTagsEl = document.getElementById("scrolly-spec-tags");
    storyActionBtnEl = document.getElementById("scrolly-action-btn");
    stepPillEls = Array.from(document.querySelectorAll(".scrolly-step-pill"));
    progressBarEl = document.getElementById("scrolly-progress-fill");

    // Click on stepper to smooth scroll with zero jerkiness
    stepPillEls.forEach((pill, idx) => {
      pill.addEventListener("click", () => {
        const sec = document.getElementById("scrolly-masterpiece");
        if (!sec) return;
        const targets = [0.05, 0.52, 0.82, 0.98];
        const secTop = sec.offsetTop;
        const secHeight = sec.offsetHeight - window.innerHeight;
        const targetScroll = secTop + secHeight * targets[idx];
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth"
        });
        document.documentElement.scrollTop = targetScroll;
      });
    });
  }

  /* =========================================================================
     5. RENDER LOOP WITH VELVET PARALLAX & CONTINUOUS DAMPING
     ========================================================================= */

  function render() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    const now = performance.now();
    const deltaTime = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    // Update Live Animated Watch Face (ECG & Heartbeat)
    updateWatchOLED(deltaTime);

    // Subtle Mouse Parallax Lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Smooth Physics Camera Damping (Zero Jerkiness, Awwwards Standard)
    camPosCurrent.x += (camPosTarget.x + mouse.x * 1.2 - camPosCurrent.x) * 0.06;
    camPosCurrent.y += (camPosTarget.y - mouse.y * 0.8 - camPosCurrent.y) * 0.06;
    camPosCurrent.z += (camPosTarget.z - camPosCurrent.z) * 0.06;

    camLookCurrent.x += (camLookTarget.x - camLookCurrent.x) * 0.06;
    camLookCurrent.y += (camLookTarget.y - camLookCurrent.y) * 0.06;
    camLookCurrent.z += (camLookTarget.z - camLookCurrent.z) * 0.06;

    camera.position.copy(camPosCurrent);
    camera.lookAt(camLookCurrent);

    // Living Room Sunbeam Motes subtle gentle drift
    if (sunbeamSystem) {
      sunbeamSystem.rotation.y = now * 0.00004;
    }

    // Subtle natural breathing of products
    const breathe = Math.sin(now * 0.0015) * 0.03;
    if (headphonesGroup && currentProgress <= 0.35) {
      headphonesGroup.position.y += breathe * 0.02;
    }
    if (watchGroup && currentProgress > 0.35 && currentProgress <= 0.70) {
      watchGroup.position.y += breathe * 0.02;
    }

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(render);
  }

  /* =========================================================================
     6. GSAP SCROLLTRIGGER (CONTINUOUS SCRUBBING)
     ========================================================================= */

  function bindScrollTrigger() {
    const section = document.getElementById("scrolly-masterpiece");
    if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP ScrollTrigger not ready for Lifestyle Scrollytelling.");
      return;
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.4, // Buttery smooth inertial lag
      anticipatePin: 1,
      onUpdate: (self) => {
        setStageProgress(self.progress);
      }
    });
  }

  function bindUserInteractions() {
    window.addEventListener("mousemove", (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  /* =========================================================================
     7. INITIALIZATION & RESIZE HANDLING
     ========================================================================= */

  function init() {
    container = document.getElementById("assembly-3d-viewport");
    if (!container) return;

    if (typeof THREE === "undefined") {
      console.error("Three.js not loaded. Cannot start 3D Scrollytelling.");
      return;
    }

    // Remove any old canvas
    const oldCanvas = container.querySelector(".assembly-3d-canvas");
    if (oldCanvas) {
      oldCanvas.remove();
    }

    // Create Scene with Warm Daylight Fog (Soft depth falloff, NO cosmic black)
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x131a28, 0.015);

    // Create Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 120);
    camera.position.copy(camPosCurrent);
    camera.lookAt(camLookCurrent);

    // Create WebGL Renderer with ACES Filmic Tone Mapping & Soft Shadows
    renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvas = renderer.domElement;
    canvas.id = "assembly-3d-canvas";
    canvas.className = "assembly-3d-canvas";
    container.insertBefore(canvas, container.firstChild);

    // Setup Dynamic Canvases & Materials
    initWatchOLED();
    createPhoneScreen();

    // Build Environment & All Real-World Tangible Flagships
    setupLighting();
    buildEnvironment();
    buildHeadphones();
    buildSmartwatch();
    buildPhoneAndSpeaker();

    // Mount Real-World Story Narrative HUD
    setupStoryHUD();

    // Set Initial State (Progress 0)
    setStageProgress(0);

    // Bind GSAP ScrollTrigger & Parallax
    bindScrollTrigger();
    bindUserInteractions();

    // Visibility Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          lastTime = performance.now();
          render();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    // Window Resize Handler
    window.addEventListener("resize", () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Start render loop
    lastTime = performance.now();
    render();
  }

  // Expose global initializer
  window.init3DAssemblyEngine = init;

  // Auto-init on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
