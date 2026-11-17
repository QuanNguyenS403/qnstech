/**
 * AuraTech / QNSTech - Next-Gen 3D Robotic Assembly & Continuous Cinematic Experience
 * Standard: Principal Creative Frontend Developer & UI/UX Motion Architect (Awwwards / Codrops)
 * Implements:
 *  - 3 Ultra-Modern 2026 Luxury Flagship Devices:
 *      1. AuraPhone 16 Horizon Ultra (Titanium Cyber-Translucent, Glowing Glyph, 3nm Bionic)
 *      2. AuraSonic Vision Max (Sculpted Aerodynamic Luxury Headset with Beryllium Acoustic Driver)
 *      3. AuraSphere Spatial Monolith (Devialet/B&O Luxury Aesthetic with Active Pulsing Lateral Woofers)
 *  - Continuous Center-Stage Choreography:
 *      * Phase 1 (0.00 -> 0.35): Phone in Center Stage (Exploded -> Precision Robot Assembly)
 *      * Phase 2 (0.35 -> 0.45): Fluid Continuous Crane Transition 1 (Phone glides, Headphones take Center Stage)
 *      * Phase 3 (0.45 -> 0.70): Headphones in Center Stage (Acoustic Teardown -> Beryllium Synthesis -> Soundwave Pulse)
 *      * Phase 4 (0.70 -> 0.80): Fluid Continuous Crane Transition 2 (Headphones glide, Sound Sculpture ascends)
 *      * Phase 5 (0.80 -> 0.90): Sound Sculpture in Center Stage (Active Pulsing Woofers & Vortex Grille)
 *      * Phase 6 (0.90 -> 1.00): Grand Climax (Golden Ratio Triumvirate Levitation on Glowing Pedestal)
 *  - Luminous Energy & Acoustic Data Ribbon connecting all 3 devices continuously in 3D space
 *  - Smooth Hermite/Catmull-Rom easing (Zero Jerkiness, 60–120 FPS guaranteed)
 *  - Pure scroll-driven scrollytelling (No text boxes or HUD clutter)
 */

(function () {
  "use strict";

  let scene, camera, renderer, container;
  let phoneGroup, headphoneGroup, speakerGroup;
  let pedestalGroup, particleSystem, energyConduitMesh, soundwavesGroup;
  let ambientLight, keyLight, rimLightCyan, rimLightLime, underLight;

  // Component collections for animated exploded view
  const phoneParts = [];
  const headphoneParts = [];
  const speakerParts = [];
  const allSoundwaves = [];

  // Active pulsing lateral woofers on speaker
  let wooferLeftGroup, wooferRightGroup;

  // Interactive & Scroll State
  let currentProgress = 0;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let isVisible = true;
  let animationFrameId = null;

  // Camera damping vectors
  const camPosCurrent = new THREE.Vector3(0, 3.5, 14.5);
  const camPosTarget = new THREE.Vector3(0, 3.5, 14.5);
  const camLookCurrent = new THREE.Vector3(0, 1.8, 0);
  const camLookTarget = new THREE.Vector3(0, 1.8, 0);

  /* =========================================================================
     1. HIGH-PRECISION PROCEDURAL TEXTURES (2026 LUXURY TECH AESTHETIC)
     ========================================================================= */

  function createChipTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Deep obsidian-blue silicon substrate
    ctx.fillStyle = "#090d15";
    ctx.fillRect(0, 0, 512, 512);

    // Micro grid traces
    ctx.strokeStyle = "rgba(0, 229, 255, 0.2)";
    ctx.lineWidth = 1;
    for (let i = 24; i < 512; i += 24) {
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i); ctx.lineTo(512, i);
      ctx.stroke();
    }

    // High-speed gold and cyan data buses
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur = 10;
    for (let j = 0; j < 10; j++) {
      const y = 60 + j * 40;
      ctx.beginPath();
      ctx.moveTo(25, y);
      ctx.lineTo(150, y);
      ctx.lineTo(200, y + 20);
      ctx.lineTo(330, y + 20);
      ctx.stroke();
    }

    // Central die & Laser engraving
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#121926";
    ctx.strokeStyle = "#e2fd52";
    ctx.lineWidth = 3;
    ctx.fillRect(150, 150, 212, 212);
    ctx.strokeRect(150, 150, 212, 212);

    // Glowing core typography
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AURA BIONIC", 256, 225);
    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 16px 'JetBrains Mono', monospace";
    ctx.fillText("3nm NEURAL V4", 256, 260);
    ctx.fillStyle = "#e2fd52";
    ctx.font = "700 13px 'JetBrains Mono', monospace";
    ctx.fillText("48 TOPS • QUANTUM NPU", 256, 288);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  function createPhoneScreenTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");

    // Luxury Cyber/Spatial Wallpaper Gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 2048);
    grad.addColorStop(0, "#05070d");
    grad.addColorStop(0.3, "#0a1322");
    grad.addColorStop(0.7, "#152238");
    grad.addColorStop(1, "#070b14");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 2048);

    // Ethereal luminous glow orbs
    const radGrad1 = ctx.createRadialGradient(350, 650, 20, 350, 650, 480);
    radGrad1.addColorStop(0, "rgba(0, 229, 255, 0.5)");
    radGrad1.addColorStop(1, "rgba(0, 229, 255, 0)");
    ctx.fillStyle = radGrad1;
    ctx.beginPath();
    ctx.arc(350, 650, 480, 0, Math.PI * 2);
    ctx.fill();

    const radGrad2 = ctx.createRadialGradient(700, 1350, 20, 700, 1350, 520);
    radGrad2.addColorStop(0, "rgba(226, 253, 82, 0.38)");
    radGrad2.addColorStop(1, "rgba(226, 253, 82, 0)");
    ctx.fillStyle = radGrad2;
    ctx.beginPath();
    ctx.arc(700, 1350, 520, 0, Math.PI * 2);
    ctx.fill();

    // Dynamic Island at top
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(362, 50, 300, 75, 37.5) : ctx.rect(362, 50, 300, 75);
    ctx.fill();

    // Dynamic island sensor glow
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(610, 88, 9, 0, Math.PI * 2);
    ctx.fill();

    // Status Bar Info
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 32px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("09:41", 80, 100);
    ctx.textAlign = "right";
    ctx.fillText("5G  100%", 944, 100);

    // Large Futuristic Clock
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 150px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("09:41", 512, 430);
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "600 36px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Thứ Ba, 17 Tháng 11 • SpatialOS", 512, 510);

    // Holographic Audio Visualizer Card
    ctx.fillStyle = "rgba(12, 18, 30, 0.8)";
    ctx.strokeStyle = "rgba(0, 229, 255, 0.45)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(80, 720, 864, 560, 40) : ctx.rect(80, 720, 864, 560);
    ctx.fill();
    ctx.stroke();

    // Soundwaves inside Card
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("AuraSonic ANC Pro • Đang phát", 140, 810);
    ctx.fillStyle = "#00e5ff";
    ctx.font = "600 28px 'JetBrains Mono', monospace";
    ctx.fillText("SPATIAL 360° AUDIO • LOSSLESS 96kHz", 140, 860);

    // Animated Visualizer Spectrum Bars
    for (let b = 0; b < 32; b++) {
      const bx = 140 + b * 24;
      const h = 40 + Math.sin(b * 0.45) * 80 + Math.cos(b * 0.8) * 45;
      const barGrad = ctx.createLinearGradient(0, 1100 - h, 0, 1100);
      barGrad.addColorStop(0, "#00e5ff");
      barGrad.addColorStop(1, "#e2fd52");
      ctx.fillStyle = barGrad;
      ctx.fillRect(bx, 1100 - Math.max(h, 12), 16, Math.max(h, 12));
    }

    // Audio Controls Row
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("⏮   ▶   ⏭", 512, 1210);

    // Quick Action Bar at bottom
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.beginPath();
    ctx.arc(200, 1880, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(824, 1880, 60, 0, Math.PI * 2);
    ctx.fill();

    // Home Bar
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(352, 2000, 320, 10, 5) : ctx.rect(352, 2000, 320, 10);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  function createCyberGlyphBackTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");

    // Dark frosted translucent cyberplate
    ctx.fillStyle = "#0a0e16";
    ctx.fillRect(0, 0, 1024, 2048);

    // Glowing Glyph matrix lines (Nothing Phone aesthetic)
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 10;
    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur = 25;

    // Camera island perimeter glyph
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(540, 140, 400, 520, 60) : ctx.rect(540, 140, 400, 520);
    ctx.stroke();

    // Wireless charging coil glyph
    ctx.beginPath();
    ctx.arc(512, 1100, 260, 0, Math.PI * 2);
    ctx.stroke();

    // Bottom diagonal slash glyphs
    ctx.beginPath();
    ctx.moveTo(140, 1800); ctx.lineTo(340, 1800);
    ctx.moveTo(512, 1720); ctx.lineTo(512, 1880);
    ctx.stroke();

    // Micro laser printed typography
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.font = "bold 20px 'JetBrains Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText("AURATECH DESIGN IN CALIFORNIA & VIETNAM", 120, 1940);
    ctx.fillText("MODEL: A2601 TITANIUM ULTRA • CE FC", 120, 1975);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  function createSpeakerVortexTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#101520";
    ctx.fillRect(0, 0, 512, 512);

    // Aerodynamic vortex acoustic sound slots
    ctx.fillStyle = "#06080d";
    for (let y = 10; y < 512; y += 18) {
      for (let x = 10; x < 512; x += 28) {
        ctx.beginPath();
        const slant = Math.sin(y * 0.05) * 8;
        ctx.ellipse ? ctx.ellipse(x + slant, y, 9, 3.5, 0.25, 0, Math.PI * 2) : ctx.rect(x, y, 16, 5);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 2);
    return texture;
  }

  function createPedestalGridTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#03060a";
    ctx.fillRect(0, 0, 1024, 1024);

    // Concentric laser rings
    ctx.lineWidth = 2.5;
    for (let radius = 60; radius <= 480; radius += 45) {
      ctx.strokeStyle = radius % 90 === 0 ? "rgba(0, 229, 255, 0.5)" : "rgba(0, 229, 255, 0.15)";
      ctx.beginPath();
      ctx.arc(512, 512, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Radial ray guides
    for (let angle = 0; angle < 360; angle += 15) {
      const rad = (angle * Math.PI) / 180;
      ctx.strokeStyle = angle % 45 === 0 ? "rgba(226, 253, 82, 0.4)" : "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = angle % 45 === 0 ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(512 + Math.cos(rad) * 60, 512 + Math.sin(rad) * 60);
      ctx.lineTo(512 + Math.cos(rad) * 490, 512 + Math.sin(rad) * 490);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /* =========================================================================
     2. PROCEDURAL 3D MESH BUILDERS (2026 LUXURY FLAGSHIP DESIGN)
     ========================================================================= */

  function registerPart(collection, mesh, explodedOffset, basePos) {
    mesh.userData = {
      basePos: basePos ? basePos.clone() : mesh.position.clone(),
      explodedOffset: explodedOffset.clone(),
      currentExplode: 0
    };
    collection.push(mesh);
    return mesh;
  }

  // --- DEVICE 1: AURA PHONE 16 HORIZON ULTRA (CYBER-TRANSLUCENT TITANIUM) ---
  function buildPhone() {
    phoneGroup = new THREE.Group();
    phoneGroup.position.set(0, 1.8, 0); // Center Stage initially

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x242a36,
      metalness: 0.96,
      roughness: 0.14,
      envMapIntensity: 2.2
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xd97543,
      metalness: 0.95,
      roughness: 0.2
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf4c430,
      metalness: 0.92,
      roughness: 0.15
    });

    // 1. Titanium Unibody Chassis with Diamond-cut Chamfer
    const chassisGeo = new THREE.BoxGeometry(3.9, 8.2, 0.34);
    const chassis = new THREE.Mesh(chassisGeo, titaniumMat);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    registerPart(phoneParts, chassis, new THREE.Vector3(0, 0, 0));
    phoneGroup.add(chassis);

    // 2. Front Curved Waterfall Sapphire Screen
    const screenGeo = new THREE.BoxGeometry(3.76, 8.08, 0.08);
    const screenTex = createPhoneScreenTexture();
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTex,
      roughness: 0.02,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: screenTex,
      emissiveIntensity: 0.75
    });
    const frontScreen = new THREE.Mesh(screenGeo, screenMat);
    frontScreen.position.set(0, 0, 0.22);
    registerPart(phoneParts, frontScreen, new THREE.Vector3(0, 0, 4.0));
    phoneGroup.add(frontScreen);

    // 3. Translucent Cyber-Glyph Backplate (Nothing Phone / Vision Luxury)
    const backGeo = new THREE.BoxGeometry(3.8, 8.1, 0.08);
    const glyphTex = createCyberGlyphBackTexture();
    const backMat = new THREE.MeshStandardMaterial({
      map: glyphTex,
      roughness: 0.15,
      metalness: 0.5,
      emissive: 0x00e5ff,
      emissiveMap: glyphTex,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.95
    });
    const backGlass = new THREE.Mesh(backGeo, backMat);
    backGlass.position.set(0, 0, -0.22);
    registerPart(phoneParts, backGlass, new THREE.Vector3(0, 0, -3.8));
    phoneGroup.add(backGlass);

    // 4. Copper Vapor Chamber Heat Sink
    const vaporGeo = new THREE.BoxGeometry(3.0, 5.2, 0.04);
    const vaporChamber = new THREE.Mesh(vaporGeo, copperMat);
    vaporChamber.position.set(0, 0.3, 0.06);
    registerPart(phoneParts, vaporChamber, new THREE.Vector3(-1.0, 0, 1.8));
    phoneGroup.add(vaporChamber);

    // 5. Main Logic Board & 3nm Bionic Chip
    const boardGeo = new THREE.BoxGeometry(3.4, 3.6, 0.06);
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x0f1622,
      metalness: 0.8,
      roughness: 0.25
    });
    const motherboard = new THREE.Mesh(boardGeo, boardMat);
    motherboard.position.set(0, 1.8, 0.12);

    const chipGeo = new THREE.BoxGeometry(1.6, 1.6, 0.08);
    const chipTex = createChipTexture();
    const chipMat = new THREE.MeshStandardMaterial({
      map: chipTex,
      roughness: 0.18,
      metalness: 0.88,
      emissive: 0x00e5ff,
      emissiveMap: chipTex,
      emissiveIntensity: 1.15
    });
    const bionicChip = new THREE.Mesh(chipGeo, chipMat);
    bionicChip.position.set(0, 0, 0.06);
    motherboard.add(bionicChip);

    // Gold contact pins
    for (let c = -1.1; c <= 1.1; c += 0.55) {
      const connGeo = new THREE.BoxGeometry(0.35, 0.12, 0.08);
      const conn = new THREE.Mesh(connGeo, goldMat);
      conn.position.set(c, -1.5, 0.04);
      motherboard.add(conn);
    }
    registerPart(phoneParts, motherboard, new THREE.Vector3(0, 2.2, 2.4));
    phoneGroup.add(motherboard);

    // 6. Graphene Battery Cell
    const battGeo = new THREE.BoxGeometry(3.3, 3.6, 0.14);
    const battMat = new THREE.MeshStandardMaterial({
      color: 0x0b1018,
      roughness: 0.35,
      metalness: 0.65
    });
    const battery = new THREE.Mesh(battGeo, battMat);
    battery.position.set(0, -1.8, 0.08);
    registerPart(phoneParts, battery, new THREE.Vector3(0, -2.2, 1.6));
    phoneGroup.add(battery);

    // 7. Triple Sapphire Periscope Camera Module
    const camIslandGroup = new THREE.Group();
    camIslandGroup.position.set(0.85, 2.3, -0.32);

    const islandPlateGeo = new THREE.BoxGeometry(1.7, 1.9, 0.15);
    const islandPlate = new THREE.Mesh(islandPlateGeo, titaniumMat);
    camIslandGroup.add(islandPlate);

    const lensPositions = [
      { x: -0.42, y: 0.42 },
      { x: -0.42, y: -0.42 },
      { x: 0.42, y: 0 }
    ];

    lensPositions.forEach((pos) => {
      const ringGeo = new THREE.CylinderGeometry(0.34, 0.36, 0.22, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, titaniumMat);
      ring.position.set(pos.x, pos.y, -0.12);
      camIslandGroup.add(ring);

      const glassGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.05, 32);
      glassGeo.rotateX(Math.PI / 2);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x08162e,
        roughness: 0.03,
        transmission: 0.94,
        reflectivity: 0.98
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.set(pos.x, pos.y, -0.22);
      camIslandGroup.add(glass);
    });

    registerPart(phoneParts, camIslandGroup, new THREE.Vector3(2.4, 1.8, -4.5));
    phoneGroup.add(camIslandGroup);

    // 8. MagSafe Induction Copper Coil Ring
    const coilGeo = new THREE.RingGeometry(0.9, 1.4, 48);
    const coilMat = new THREE.MeshStandardMaterial({
      color: 0xd97543,
      metalness: 0.96,
      roughness: 0.2,
      side: THREE.DoubleSide
    });
    const coil = new THREE.Mesh(coilGeo, coilMat);
    coil.position.set(0, 0, -0.16);
    registerPart(phoneParts, coil, new THREE.Vector3(0, 0, -2.2));
    phoneGroup.add(coil);

    scene.add(phoneGroup);
  }

  // --- DEVICE 2: AURASONIC VISION MAX (AERODYNAMIC LUXURY SPATIAL AUDIO HEADSET) ---
  function buildHeadphones() {
    headphoneGroup = new THREE.Group();
    headphoneGroup.position.set(16, 1.8, -5); // Positioned for lateral stage transition

    const aluminumMat = new THREE.MeshStandardMaterial({
      color: 0x384152,
      metalness: 0.94,
      roughness: 0.14
    });

    const berylliumMat = new THREE.MeshStandardMaterial({
      color: 0xa8b4c2,
      metalness: 0.96,
      roughness: 0.12
    });

    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x121720,
      roughness: 0.75,
      metalness: 0.18
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xd97543,
      metalness: 0.94,
      roughness: 0.22
    });

    // 1. Dual-Rail Arched Titanium Headband
    const bandCurve = new THREE.EllipseCurve(0, 0, 3.4, 3.6, 0, Math.PI, false, 0);
    const bandPoints = bandCurve.getPoints(60);
    const bandGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(bandPoints.map(p => new THREE.Vector3(p.x, p.y, 0))), 64, 0.16, 16, false);
    const headband = new THREE.Mesh(bandGeo, aluminumMat);
    headband.position.set(0, 0.35, 0);
    registerPart(headphoneParts, headband, new THREE.Vector3(0, 4.5, 0));
    headphoneGroup.add(headband);

    // Inner breathable suspension knit canopy
    const innerCanopyGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(bandPoints.slice(10, 50).map(p => new THREE.Vector3(p.x, p.y - 0.2, 0))), 48, 0.08, 12, false);
    const innerCanopyMat = new THREE.MeshStandardMaterial({ color: 0x0a0e14, roughness: 0.9 });
    const innerCanopy = new THREE.Mesh(innerCanopyGeo, innerCanopyMat);
    headband.add(innerCanopy);

    // 2. Sculpted Aerodynamic Ear Cups (Left & Right)
    [-1, 1].forEach((side) => {
      const cupSideGroup = new THREE.Group();
      cupSideGroup.position.set(side * 3.4, 0, 0);

      // CNC Dual-Axis Gimbal Yoke
      const yokeGeo = new THREE.TorusGeometry(1.25, 0.11, 14, 36, Math.PI);
      const yoke = new THREE.Mesh(yokeGeo, aluminumMat);
      yoke.rotation.z = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      cupSideGroup.add(yoke);

      // Outer Aluminum Acoustic Shell (Sculpted Chamfered Cylinder)
      const shellGeo = new THREE.CylinderGeometry(1.65, 1.75, 0.75, 48);
      shellGeo.rotateZ(Math.PI / 2);
      const shell = new THREE.Mesh(shellGeo, aluminumMat);
      shell.position.set(side * 0.4, 0, 0);
      registerPart(headphoneParts, shell, new THREE.Vector3(side * 3.2, 0, 0));
      cupSideGroup.add(shell);

      // Glowing Aura Touch Halo Ring
      const haloGeo = new THREE.RingGeometry(1.35, 1.5, 48);
      haloGeo.rotateY(Math.PI / 2);
      const haloMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x00e5ff,
        emissiveIntensity: 1.4,
        side: THREE.DoubleSide
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(side * 0.76, 0, 0);
      shell.add(halo);

      // Neodymium Motor Core
      const magnetGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.22, 36);
      magnetGeo.rotateZ(Math.PI / 2);
      const magnet = new THREE.Mesh(magnetGeo, aluminumMat);
      magnet.position.set(side * 0.15, 0, 0);
      registerPart(headphoneParts, magnet, new THREE.Vector3(side * 1.8, 0, 1.2));
      cupSideGroup.add(magnet);

      // Pure Copper Voice Coil
      const coilGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.2, 36, 1, true);
      coilGeo.rotateZ(Math.PI / 2);
      const voiceCoil = new THREE.Mesh(coilGeo, copperMat);
      voiceCoil.position.set(side * -0.05, 0, 0);
      registerPart(headphoneParts, voiceCoil, new THREE.Vector3(side * 1.2, 0, 2.2));
      cupSideGroup.add(voiceCoil);

      // 40mm Beryllium Diaphragm Driver
      const driverGeo = new THREE.CylinderGeometry(1.3, 1.4, 0.08, 48);
      driverGeo.rotateZ(Math.PI / 2);
      const driver = new THREE.Mesh(driverGeo, berylliumMat);
      driver.position.set(side * -0.25, 0, 0);
      registerPart(headphoneParts, driver, new THREE.Vector3(side * 0.5, 0, 3.4));
      cupSideGroup.add(driver);

      // Ergonomic Contoured Memory Foam Cushion
      const cushionGeo = new THREE.TorusGeometry(1.4, 0.44, 20, 48);
      cushionGeo.rotateY(Math.PI / 2);
      const cushion = new THREE.Mesh(cushionGeo, cushionMat);
      cushion.position.set(side * -0.65, 0, 0);
      registerPart(headphoneParts, cushion, new THREE.Vector3(side * -2.4, 0, 0));
      cupSideGroup.add(cushion);

      headphoneGroup.add(cupSideGroup);
    });

    scene.add(headphoneGroup);
  }

  // --- DEVICE 3: AURASPHERE SPATIAL MONOLITH (HIGH-END ACOUSTIC SCULPTURE) ---
  function buildSpeaker() {
    speakerGroup = new THREE.Group();
    speakerGroup.position.set(-16, 1.5, -5); // Positioned for lateral stage transition

    const cabinetMat = new THREE.MeshStandardMaterial({
      color: 0x161c26,
      metalness: 0.9,
      roughness: 0.2
    });

    const vortexTex = createSpeakerVortexTexture();
    const vortexMat = new THREE.MeshStandardMaterial({
      map: vortexTex,
      metalness: 0.92,
      roughness: 0.28
    });

    const wooferMat = new THREE.MeshStandardMaterial({
      color: 0xedf2f7,
      metalness: 0.95,
      roughness: 0.12
    });

    // 1. Sculptural Aerodynamic Acoustic Enclosure (Sphere / Ellipsoid)
    const bodyGeo = new THREE.SphereGeometry(2.4, 48, 48);
    bodyGeo.scale(1.0, 1.25, 1.0);
    const body = new THREE.Mesh(bodyGeo, cabinetMat);
    registerPart(speakerParts, body, new THREE.Vector3(0, 0, 0));
    speakerGroup.add(body);

    // 2. 360° Laser Vortex Grille Ring
    const sleeveGeo = new THREE.CylinderGeometry(2.46, 2.46, 3.2, 48, 1, true);
    const sleeve = new THREE.Mesh(sleeveGeo, vortexMat);
    sleeve.position.set(0, 0, 0);
    registerPart(speakerParts, sleeve, new THREE.Vector3(0, 4.6, 0));
    speakerGroup.add(sleeve);

    // 3. Top Floating Acoustic Dispersion Dome & Capacitive Glass Dial
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 3.0, 0);

    const domeGeo = new THREE.SphereGeometry(1.6, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({ color: 0x242d3d, metalness: 0.95, roughness: 0.16 });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    crownGroup.add(dome);

    const haloTopGeo = new THREE.TorusGeometry(1.5, 0.06, 16, 48);
    haloTopGeo.rotateX(Math.PI / 2);
    const haloTopMat = new THREE.MeshStandardMaterial({ color: 0xe2fd52, emissive: 0xe2fd52, emissiveIntensity: 1.5 });
    const haloTop = new THREE.Mesh(haloTopGeo, haloTopMat);
    haloTop.position.set(0, 0.1, 0);
    crownGroup.add(haloTop);

    registerPart(speakerParts, crownGroup, new THREE.Vector3(0, 6.8, 0));
    speakerGroup.add(crownGroup);

    // 4. Dual Active Lateral Bass Woofers (Left & Right - Deviated Pulsing Diaphragms)
    // Left Woofer
    wooferLeftGroup = new THREE.Group();
    wooferLeftGroup.position.set(-2.2, 0, 0);
    const coneGeoL = new THREE.CylinderGeometry(1.4, 0.5, 0.35, 36);
    coneGeoL.rotateZ(-Math.PI / 2);
    const leftCone = new THREE.Mesh(coneGeoL, wooferMat);
    wooferLeftGroup.add(leftCone);
    registerPart(speakerParts, wooferLeftGroup, new THREE.Vector3(-4.0, 0, 0));
    speakerGroup.add(wooferLeftGroup);

    // Right Woofer
    wooferRightGroup = new THREE.Group();
    wooferRightGroup.position.set(2.2, 0, 0);
    const coneGeoR = new THREE.CylinderGeometry(1.4, 0.5, 0.35, 36);
    coneGeoR.rotateZ(Math.PI / 2);
    const rightCone = new THREE.Mesh(coneGeoR, wooferMat);
    wooferRightGroup.add(rightCone);
    registerPart(speakerParts, wooferRightGroup, new THREE.Vector3(4.0, 0, 0));
    speakerGroup.add(wooferRightGroup);

    // 5. Anti-Gravity Floating Light Ring at Base
    const baseHaloGeo = new THREE.TorusGeometry(2.35, 0.08, 16, 48);
    baseHaloGeo.rotateX(Math.PI / 2);
    const baseHaloMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 1.6
    });
    const baseHalo = new THREE.Mesh(baseHaloGeo, baseHaloMat);
    baseHalo.position.set(0, -2.6, 0);
    registerPart(speakerParts, baseHalo, new THREE.Vector3(0, -2.0, 0));
    speakerGroup.add(baseHalo);

    scene.add(speakerGroup);
  }

  // --- ENVIRONMENT: PEDESTAL, PARTICLES & INTERCONNECTED ENERGY CONDUIT ---
  function buildEnvironment() {
    // 1. Dark Mirror Quantum Levitation Pedestal
    pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -3.2, 0);

    const pedestalGeo = new THREE.CylinderGeometry(15, 16, 0.8, 64);
    const pedestalTex = createPedestalGridTexture();
    const pedestalMat = new THREE.MeshStandardMaterial({
      map: pedestalTex,
      color: 0x080c14,
      metalness: 0.95,
      roughness: 0.16
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.receiveShadow = true;
    pedestalGroup.add(pedestalMesh);

    // Glowing Concentric Laser Rings on Pedestal Top
    [5.0, 9.0, 13.0].forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.08, r + 0.08, 64);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 1 ? 0xe2fd52 : 0x00e5ff,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 0.42;
      pedestalGroup.add(ring);
    });

    scene.add(pedestalGroup);

    // 2. Continuous Interconnected Energy & Acoustic Data Ribbon
    const conduitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8.0, 1.5, 0),
      new THREE.Vector3(-4.0, 3.2, 2.5),
      new THREE.Vector3(0, 1.6, -1.0),
      new THREE.Vector3(4.0, 3.2, 2.5),
      new THREE.Vector3(8.0, 1.5, 0),
      new THREE.Vector3(4.0, -2.5, -3.0),
      new THREE.Vector3(-4.0, -2.5, -3.0),
      new THREE.Vector3(-8.0, 1.5, 0)
    ]);
    const conduitGeo = new THREE.TubeGeometry(conduitCurve, 128, 0.045, 12, true);
    const conduitMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    energyConduitMesh = new THREE.Mesh(conduitGeo, conduitMat);
    scene.add(energyConduitMesh);

    // 3. Floating Quantum Particles (1,200 micro motes)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00e5ff);
    const c2 = new THREE.Color(0xe2fd52);
    const c3 = new THREE.Color(0x8a2be2);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 38;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 38;

      const pickColor = Math.random() > 0.6 ? c1 : Math.random() > 0.5 ? c2 : c3;
      colors[i * 3] = pickColor.r;
      colors[i * 3 + 1] = pickColor.g;
      colors[i * 3 + 2] = pickColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. 3D Holographic Acoustic Soundwaves
    soundwavesGroup = new THREE.Group();
    for (let w = 0; w < 4; w++) {
      const waveGeo = new THREE.TorusGeometry(2.0 + w * 1.5, 0.05, 16, 64);
      const waveMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending
      });
      const wave = new THREE.Mesh(waveGeo, waveMat);
      wave.position.set(0, 1.8, 0);
      wave.visible = false;
      allSoundwaves.push(wave);
      soundwavesGroup.add(wave);
    }
    scene.add(soundwavesGroup);
  }

  // --- STUDIO 5-POINT LIGHTING SETUP ---
  function setupLighting() {
    ambientLight = new THREE.AmbientLight(0x081020, 1.4);
    scene.add(ambientLight);

    // Main Key Light
    keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(12, 18, 14);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Electric Cyan Rim Light
    rimLightCyan = new THREE.DirectionalLight(0x00e5ff, 2.6);
    rimLightCyan.position.set(-14, 8, -10);
    scene.add(rimLightCyan);

    // Vivid Lime Accent Light
    rimLightLime = new THREE.DirectionalLight(0xe2fd52, 2.0);
    rimLightLime.position.set(14, -4, -8);
    scene.add(rimLightLime);

    // Deep Violet Underglow Point Light
    underLight = new THREE.PointLight(0x8a2be2, 2.5, 30);
    underLight.position.set(0, -2.8, 0);
    scene.add(underLight);
  }

  /* =========================================================================
     3. CONTINUOUS FLUID CHOREOGRAPHY: ZERO JERKINESS, SEAMLESS CONTINUITY
     ========================================================================= */

  function updateExplodedParts(collection, factor) {
    for (let i = 0; i < collection.length; i++) {
      const part = collection[i];
      if (!part.userData || !part.userData.basePos) continue;

      const offset = part.userData.explodedOffset;
      part.position.x = part.userData.basePos.x + offset.x * factor;
      part.position.y = part.userData.basePos.y + offset.y * factor;
      part.position.z = part.userData.basePos.z + offset.z * factor;
    }
  }

  function smoothStep(t) {
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
  }

  function setStageProgress(p) {
    currentProgress = p;

    // =========================================================================
    // PHASE 1: SMARTPHONE SPOTLIGHT (p: 0.00 -> 0.35)
    // =========================================================================
    if (p <= 0.35) {
      const t = p / 0.35; // 0.0 -> 1.0

      // Phone is at Center Stage (0, 1.8, 0)
      phoneGroup.position.set(0, 1.8, 0);
      phoneGroup.rotation.set(0, Math.sin(t * 1.5) * 0.25, 0);

      // Headphones & Speaker wait gracefully off-stage
      headphoneGroup.position.set(16, 1.8, -8);
      headphoneGroup.rotation.set(0, 0, 0);
      speakerGroup.position.set(-16, 1.5, -8);
      speakerGroup.rotation.set(0, 0, 0);

      // Component explosion:
      // t = 0.0 -> 0.65: Exploded view smoothly collapsing
      // t = 0.65 -> 1.0: Fully assembled, floating with pride
      const explodeT = Math.min(t / 0.65, 1.0);
      const phoneExplode = Math.max(0, 1.0 - smoothStep(explodeT));
      updateExplodedParts(phoneParts, phoneExplode);
      updateExplodedParts(headphoneParts, 1.0);
      updateExplodedParts(speakerParts, 1.0);

      // Camera: Smooth continuous orbital macro dive
      const camOrbitAngle = 0.4 + t * 0.9;
      camPosTarget.x = 9.5 * Math.sin(camOrbitAngle);
      camPosTarget.y = 3.6 + Math.cos(t * Math.PI) * 1.2;
      camPosTarget.z = 12.0 * Math.cos(camOrbitAngle) + 4.0;
      camLookTarget.set(0, 1.8, 0);

      allSoundwaves.forEach(w => w.visible = false);
    }
    // =========================================================================
    // PHASE 2: FLUID TRANSITION: PHONE GLIDES, HEADPHONES TAKE CENTER STAGE (p: 0.35 -> 0.45)
    // =========================================================================
    else if (p <= 0.45) {
      const t = (p - 0.35) / 0.10; // 0.0 -> 1.0
      const st = smoothStep(t);

      // Phone glides smoothly to left wing (-6.5, 1.8, -3.5)
      phoneGroup.position.set(-6.5 * st, 1.8, -3.5 * st);
      phoneGroup.rotation.y = -0.35 * st;
      updateExplodedParts(phoneParts, 0.0); // Assembled

      // Headphones glide smoothly from right wing into Center Stage (0, 1.8, 0)
      headphoneGroup.position.set(16.0 * (1.0 - st), 1.8, -8.0 * (1.0 - st));
      headphoneGroup.rotation.y = 0.25 * (1.0 - st);
      updateExplodedParts(headphoneParts, 1.0); // Entering exploded

      speakerGroup.position.set(-16, 1.5, -8);
      updateExplodedParts(speakerParts, 1.0);

      // Camera: Continuous swooping crane flight following the energy ribbon
      camPosTarget.x = 4.0 * (1.0 - st);
      camPosTarget.y = 4.0 + Math.sin(t * Math.PI) * 0.8;
      camPosTarget.z = 13.5 - st * 2.0;
      camLookTarget.set(2.0 * (1.0 - st), 1.8, 0);

      allSoundwaves.forEach(w => w.visible = false);
    }
    // =========================================================================
    // PHASE 3: AUDIOPHILE HEADPHONES SPOTLIGHT (p: 0.45 -> 0.70)
    // =========================================================================
    else if (p <= 0.70) {
      const t = (p - 0.45) / 0.25; // 0.0 -> 1.0

      // Headphones are in Center Stage (0, 1.8, 0)
      headphoneGroup.position.set(0, 1.8, 0);
      headphoneGroup.rotation.set(0, (t - 0.5) * 0.4, 0);

      phoneGroup.position.set(-6.5, 1.8, -3.5);
      phoneGroup.rotation.y = -0.35;
      updateExplodedParts(phoneParts, 0.0);

      speakerGroup.position.set(-16, 1.5, -8);
      updateExplodedParts(speakerParts, 1.0);

      // Acoustic assembly:
      // t = 0.0 -> 0.65: Exploded Beryllium driver & voice coil collapsing into earcups
      // t = 0.65 -> 1.0: Fully assembled, radiating 3D soundwave ripple!
      const explodeT = Math.min(t / 0.65, 1.0);
      const hpExplode = Math.max(0, 1.0 - smoothStep(explodeT));
      updateExplodedParts(headphoneParts, hpExplode);

      // Camera: Orbiting macro focus around the Beryllium acoustic driver
      const camOrbitAngle = -0.6 + t * 1.4;
      camPosTarget.x = 8.5 * Math.sin(camOrbitAngle);
      camPosTarget.y = 3.2 + Math.sin(t * Math.PI) * 0.9;
      camPosTarget.z = 9.5 * Math.cos(camOrbitAngle) + 2.0;
      camLookTarget.set(0, 1.8, 0);

      // Trigger 3D Soundwaves when assembled (t > 0.65)
      if (t > 0.65) {
        animateSoundwaves((t - 0.65) / 0.35);
      } else {
        allSoundwaves.forEach(w => w.visible = false);
      }
    }
    // =========================================================================
    // PHASE 4: FLUID TRANSITION: HEADPHONES GLIDE, SPEAKER ASCENDS (p: 0.70 -> 0.80)
    // =========================================================================
    else if (p <= 0.80) {
      const t = (p - 0.70) / 0.10; // 0.0 -> 1.0
      const st = smoothStep(t);

      phoneGroup.position.set(-6.5, 1.8, -3.5);
      updateExplodedParts(phoneParts, 0.0);

      // Headphones glide smoothly to right wing (6.5, 1.8, -3.5)
      headphoneGroup.position.set(6.5 * st, 1.8, -3.5 * st);
      headphoneGroup.rotation.y = 0.35 * st;
      updateExplodedParts(headphoneParts, 0.0);

      // Speaker ascends smoothly into Center Stage (0, 1.5, 0)
      speakerGroup.position.set(-16.0 * (1.0 - st), 1.5, -8.0 * (1.0 - st));
      updateExplodedParts(speakerParts, 1.0);

      // Camera: Swooping descent towards speaker core
      camPosTarget.x = -3.0 * (1.0 - st);
      camPosTarget.y = 3.5 - st * 0.8;
      camPosTarget.z = 12.0 - st * 1.5;
      camLookTarget.set(0, 1.5, 0);

      allSoundwaves.forEach(w => w.visible = false);
    }
    // =========================================================================
    // PHASE 5: SPATIAL SOUND SCULPTURE SPOTLIGHT (p: 0.80 -> 0.90)
    // =========================================================================
    else if (p <= 0.90) {
      const t = (p - 0.80) / 0.10; // 0.0 -> 1.0

      // Speaker is in Center Stage (0, 1.5, 0)
      speakerGroup.position.set(0, 1.5, 0);
      speakerGroup.rotation.y = t * 0.8;

      phoneGroup.position.set(-6.5, 1.8, -3.5);
      updateExplodedParts(phoneParts, 0.0);

      headphoneGroup.position.set(6.5, 1.8, -3.5);
      updateExplodedParts(headphoneParts, 0.0);

      // Speaker assembly:
      const explodeT = Math.min(t / 0.65, 1.0);
      const spExplode = Math.max(0, 1.0 - smoothStep(explodeT));
      updateExplodedParts(speakerParts, spExplode);

      // Active pulsing lateral woofers (Devialet style)
      if (wooferLeftGroup && wooferRightGroup) {
        const pulse = Math.sin(t * Math.PI * 12) * 0.18;
        wooferLeftGroup.position.x = -2.2 - Math.max(0, pulse);
        wooferRightGroup.position.x = 2.2 + Math.max(0, pulse);
      }

      // Camera: Circling around the 360° vortex acoustic grille and top dome
      const camOrbitAngle = 0.2 + t * 1.6;
      camPosTarget.x = 8.5 * Math.sin(camOrbitAngle);
      camPosTarget.y = 2.5 + Math.cos(t * Math.PI) * 0.8;
      camPosTarget.z = 9.0 * Math.cos(camOrbitAngle);
      camLookTarget.set(0, 1.5, 0);

      allSoundwaves.forEach(w => w.visible = false);
    }
    // =========================================================================
    // PHASE 6: GRAND CLIMAX - GOLDEN RATIO TRIUMVIRATE LEVITATION (p: 0.90 -> 1.00)
    // =========================================================================
    else {
      const t = (p - 0.90) / 0.10; // 0.0 -> 1.0
      const st = smoothStep(t);

      // All 3 fully assembled flagship devices hover in golden-ratio harmony on pedestal
      phoneGroup.position.set(-4.5, 1.8, 1.2 * st);
      phoneGroup.rotation.set(0, -0.32 + Math.sin(Date.now() * 0.001) * 0.06, 0);
      updateExplodedParts(phoneParts, 0.0);

      headphoneGroup.position.set(4.5, 1.8, 1.2 * st);
      headphoneGroup.rotation.set(0, 0.32 - Math.sin(Date.now() * 0.001) * 0.06, 0);
      updateExplodedParts(headphoneParts, 0.0);

      speakerGroup.position.set(0, 1.6, -2.8 * st);
      speakerGroup.rotation.y = Date.now() * 0.0004;
      updateExplodedParts(speakerParts, 0.0);

      // Active pulsing woofers continuing subtly
      if (wooferLeftGroup && wooferRightGroup) {
        const pulse = Math.sin(Date.now() * 0.008) * 0.08;
        wooferLeftGroup.position.x = -2.2 - pulse;
        wooferRightGroup.position.x = 2.2 + pulse;
      }

      // Camera: Majestic wide panoramic hero crane shot pulling back smoothly
      camPosTarget.x = 0;
      camPosTarget.y = 4.8 + Math.sin(st * Math.PI) * 1.0;
      camPosTarget.z = 19.5 + st * 4.0;
      camLookTarget.set(0, 1.3, 0);

      allSoundwaves.forEach(w => w.visible = false);
    }

    // Energy conduit illumination pulse
    if (energyConduitMesh) {
      energyConduitMesh.material.opacity = 0.45 + Math.sin(p * Math.PI * 6) * 0.35;
    }
  }

  function animateSoundwaves(intensity) {
    allSoundwaves.forEach((wave, idx) => {
      wave.visible = true;
      const progress = (intensity * 3.5 + idx * 0.25) % 1;
      wave.scale.setScalar(1 + progress * 2.2);
      wave.material.opacity = (1 - progress) * 0.75;
    });
  }

  /* =========================================================================
     4. RENDER LOOP WITH VELVET PARALLAX & PHYSICS INERTIA DAMPING
     ========================================================================= */

  function render() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    // Smooth Mouse Parallax Lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Smooth Physics Damping on Camera (Awwwards 60-120 FPS Standard)
    camPosCurrent.x += (camPosTarget.x + mouse.x * 1.8 - camPosCurrent.x) * 0.06;
    camPosCurrent.y += (camPosTarget.y - mouse.y * 1.4 - camPosCurrent.y) * 0.06;
    camPosCurrent.z += (camPosTarget.z - camPosCurrent.z) * 0.06;

    camLookCurrent.x += (camLookTarget.x - camLookCurrent.x) * 0.06;
    camLookCurrent.y += (camLookTarget.y - camLookCurrent.y) * 0.06;
    camLookCurrent.z += (camLookTarget.z - camLookCurrent.z) * 0.06;

    camera.position.copy(camPosCurrent);
    camera.lookAt(camLookCurrent);

    // Subtle ambient particle floating rotation
    if (particleSystem) {
      particleSystem.rotation.y = Date.now() * 0.00012;
    }

    // Subtle pedestal laser rings breathing
    if (pedestalGroup) {
      pedestalGroup.rotation.y = Date.now() * 0.00008;
    }

    // Energy conduit subtle rotation pulse
    if (energyConduitMesh) {
      energyConduitMesh.rotation.y = Date.now() * 0.0001;
    }

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(render);
  }

  /* =========================================================================
     5. GSAP SCROLLTRIGGER (1150vh PURE SCROLL DRIVEN)
     ========================================================================= */

  function bindScrollTrigger() {
    const section = document.getElementById("scrolly-masterpiece");
    if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP ScrollTrigger not ready for 3D Assembly Engine.");
      return;
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        setStageProgress(self.progress);
      }
    });
  }

  function bindUserInteractions() {
    // Mouse Move for subtle 3D Specular Parallax
    window.addEventListener("mousemove", (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  /* =========================================================================
     6. INITIALIZATION & RESIZE HANDLING
     ========================================================================= */

  function init() {
    container = document.getElementById("assembly-3d-viewport");
    if (!container) return;

    if (typeof THREE === "undefined") {
      console.error("Three.js not loaded. Cannot start 3D Assembly Engine.");
      return;
    }

    // Create Scene with Atmospheric Fog
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04070d, 0.018);

    // Create Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 120);
    camera.position.copy(camPosCurrent);
    camera.lookAt(camLookCurrent);

    // Create WebGL Renderer with High-End ACES Filmic Tone Mapping
    renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvas = renderer.domElement;
    canvas.id = "assembly-3d-canvas";
    canvas.className = "assembly-3d-canvas";
    container.insertBefore(canvas, container.firstChild);

    // Build All 3 Ultra-Modern 2026 Devices & Environment
    setupLighting();
    buildEnvironment();
    buildPhone();
    buildHeadphones();
    buildSpeaker();

    // Set Initial State (Progress 0)
    setStageProgress(0);

    // Bind GSAP ScrollTrigger & Mouse Parallax
    bindScrollTrigger();
    bindUserInteractions();

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
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
