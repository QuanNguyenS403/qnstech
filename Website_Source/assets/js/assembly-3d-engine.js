/**
 * AuraTech / QNSTech - Next-Gen 3D Automated Assembly Engine
 * Procedural Three.js Exploded View & Precision Assembly Simulation
 * Devices: Flagship Smartphone, Audiophile Headphones, Hi-Fi 360° Speaker
 * Features: Cinematic Camera Paths, Laser Guide Beams, PBR Materials, 3D Soundwaves
 */

(function () {
  "use strict";

  let scene, camera, renderer, container;
  let phoneGroup, headphoneGroup, speakerGroup;
  let pedestalGroup, particleSystem, laserBeamsGroup, soundwavesGroup;
  let ambientLight, keyLight, rimLightCyan, rimLightLime, underLight;

  // Component collections for animated exploded view
  const phoneParts = [];
  const headphoneParts = [];
  const speakerParts = [];
  const allBeams = [];
  const allSoundwaves = [];

  // Animation & Interaction state
  let currentProgress = 0;
  let manualExplodeFactor = 0; // 0 = follow scroll, > 0 = manual override
  let isManualOverride = false;
  let activeFocusTarget = "all"; // "all" | "phone" | "headphones" | "speaker"
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let orbitEuler = { x: 0, y: 0 };
  let isVisible = true;
  let animationFrameId = null;

  // Camera animation interpolation targets (using Vector3 initialized in init or dynamically)
  const camState = {
    pos: { x: 14, y: 8, z: 24, set(x, y, z) { this.x = x; this.y = y; this.z = z; } },
    target: { x: 0, y: 1.5, z: 0, set(x, y, z) { this.x = x; this.y = y; this.z = z; } },
    fov: 42
  };

  /* =========================================================================
     1. PROCEDURAL TEXTURE GENERATORS (NO EXTERNAL ASSETS NEEDED)
     ========================================================================= */

  function createChipTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Dark silicon substrate
    ctx.fillStyle = "#0c111a";
    ctx.fillRect(0, 0, 512, 512);

    // Micro grid traces
    ctx.strokeStyle = "rgba(0, 229, 255, 0.25)";
    ctx.lineWidth = 1;
    for (let i = 20; i < 512; i += 24) {
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i); ctx.lineTo(512, i);
      ctx.stroke();
    }

    // High-speed circuit bus lines
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur = 8;
    for (let j = 0; j < 8; j++) {
      const y = 80 + j * 45;
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(160, y);
      ctx.lineTo(210, y + 25);
      ctx.lineTo(320, y + 25);
      ctx.stroke();
    }

    // Gold contact pins on border
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffd166";
    for (let p = 15; p < 500; p += 16) {
      ctx.fillRect(p, 4, 10, 16);
      ctx.fillRect(p, 492, 10, 16);
      ctx.fillRect(4, p, 16, 10);
      ctx.fillRect(492, p, 16, 10);
    }

    // Central die & Laser engraving
    ctx.fillStyle = "#162030";
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 3;
    ctx.fillRect(156, 156, 200, 200);
    ctx.strokeRect(156, 156, 200, 200);

    // Glowing core logo
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AURA BIONIC", 256, 230);
    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 16px 'JetBrains Mono', monospace";
    ctx.fillText("3nm NEURAL CORE", 256, 265);
    ctx.fillStyle = "#e2fd52";
    ctx.font = "600 13px 'JetBrains Mono', monospace";
    ctx.fillText("48 TOPS • NPU v4", 256, 290);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  function createPhoneScreenTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1440;
    const ctx = canvas.getContext("2d");

    // Luxury Cyber/Spatial Wallpaper Gradient
    const grad = ctx.createLinearGradient(0, 0, 720, 1440);
    grad.addColorStop(0, "#080b14");
    grad.addColorStop(0.35, "#0d1b2a");
    grad.addColorStop(0.65, "#1b263b");
    grad.addColorStop(1, "#0a1128");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 720, 1440);

    // Ethereal luminous glow orbs
    const radGrad1 = ctx.createRadialGradient(240, 480, 10, 240, 480, 320);
    radGrad1.addColorStop(0, "rgba(0, 229, 255, 0.45)");
    radGrad1.addColorStop(1, "rgba(0, 229, 255, 0)");
    ctx.fillStyle = radGrad1;
    ctx.beginPath();
    ctx.arc(240, 480, 320, 0, Math.PI * 2);
    ctx.fill();

    const radGrad2 = ctx.createRadialGradient(500, 950, 10, 500, 950, 360);
    radGrad2.addColorStop(0, "rgba(226, 253, 82, 0.35)");
    radGrad2.addColorStop(1, "rgba(226, 253, 82, 0)");
    ctx.fillStyle = radGrad2;
    ctx.beginPath();
    ctx.arc(500, 950, 360, 0, Math.PI * 2);
    ctx.fill();

    // Dynamic Island at top
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(240, 40, 240, 55, 27) : ctx.rect(240, 40, 240, 55);
    ctx.fill();

    // Small camera and sensor glow
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(430, 67, 7, 0, Math.PI * 2);
    ctx.fill();

    // Status Bar Info
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 24px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("09:41", 60, 78);
    ctx.textAlign = "right";
    ctx.fillText("5G  100%", 660, 78);

    // Large Futuristic Clock
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 110px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("09:41", 360, 310);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "600 26px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Thứ Ba, 17 Tháng 11 • SpatialOS", 360, 370);

    // Holographic Audio Visualizer Card
    ctx.fillStyle = "rgba(16, 24, 38, 0.75)";
    ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(60, 520, 600, 380, 28) : ctx.rect(60, 520, 600, 380);
    ctx.fill();
    ctx.stroke();

    // Soundwaves inside Card
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("AuraSonic ANC Pro • Đang phát", 100, 580);
    ctx.fillStyle = "#00e5ff";
    ctx.font = "600 20px 'JetBrains Mono', monospace";
    ctx.fillText("SPATIAL 360° AUDIO • LOSSLESS 96kHz", 100, 615);

    // Visualizer Bars
    for (let b = 0; b < 28; b++) {
      const bx = 100 + b * 19;
      const h = 25 + Math.sin(b * 0.45) * 55 + Math.cos(b * 0.8) * 35;
      const barGrad = ctx.createLinearGradient(0, 780 - h, 0, 780);
      barGrad.addColorStop(0, "#00e5ff");
      barGrad.addColorStop(1, "#e2fd52");
      ctx.fillStyle = barGrad;
      ctx.fillRect(bx, 780 - Math.max(h, 8), 12, Math.max(h, 8));
    }

    // Audio Controls Row
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 34px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("⏮   ▶   ⏭", 360, 850);

    // Quick Action Bar at bottom
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.beginPath();
    ctx.arc(140, 1310, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(580, 1310, 45, 0, Math.PI * 2);
    ctx.fill();

    // Home Bar
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(240, 1400, 240, 8, 4) : ctx.rect(240, 1400, 240, 8);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  function createSpeakerGrilleTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#121720";
    ctx.fillRect(0, 0, 256, 256);

    // Hexagonal acoustic micro-perforations
    ctx.fillStyle = "#06090e";
    const r = 3.5;
    const dy = 10;
    const dx = 12;
    for (let y = 0; y < 256; y += dy) {
      const offsetX = ((y / dy) % 2 === 0) ? 0 : dx / 2;
      for (let x = -dx; x < 256 + dx; x += dx) {
        ctx.beginPath();
        ctx.arc(x + offsetX, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 4);
    return texture;
  }

  function createPedestalGridTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#04070c";
    ctx.fillRect(0, 0, 1024, 1024);

    // Concentric rings
    ctx.lineWidth = 2;
    for (let radius = 60; radius <= 480; radius += 50) {
      ctx.strokeStyle = radius % 100 === 0 ? "rgba(0, 229, 255, 0.45)" : "rgba(0, 229, 255, 0.15)";
      ctx.beginPath();
      ctx.arc(512, 512, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Radial ray guides
    for (let angle = 0; angle < 360; angle += 15) {
      const rad = (angle * Math.PI) / 180;
      ctx.strokeStyle = angle % 45 === 0 ? "rgba(226, 253, 82, 0.35)" : "rgba(255, 255, 255, 0.08)";
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
     2. PROCEDURAL 3D MESH BUILDERS
     ========================================================================= */

  // Helper to register parts for exploded animation
  function registerPart(collection, mesh, explodedOffset, basePos, baseRot) {
    mesh.userData = {
      basePos: basePos ? basePos.clone() : mesh.position.clone(),
      baseRot: baseRot ? baseRot.clone() : mesh.rotation.clone(),
      explodedOffset: explodedOffset.clone(),
      currentExplode: 0
    };
    collection.push(mesh);
    return mesh;
  }

  // --- DEVICE 1: FLAGSHIP SMARTPHONE (AuraPhone Titanium Pro) ---
  function buildPhone() {
    phoneGroup = new THREE.Group();
    phoneGroup.position.set(0, 1.8, 0);

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x222731,
      metalness: 0.92,
      roughness: 0.22,
      envMapIntensity: 1.5
    });

    const darkPlasticMat = new THREE.MeshStandardMaterial({
      color: 0x0a0d14,
      metalness: 0.2,
      roughness: 0.5
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xd97543,
      metalness: 0.95,
      roughness: 0.28
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf4c430,
      metalness: 0.9,
      roughness: 0.2
    });

    // 1. Titanium Chassis Unibody Frame
    const chassisGeo = new THREE.BoxGeometry(4.2, 8.4, 0.42);
    const chassis = new THREE.Mesh(chassisGeo, titaniumMat);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    registerPart(phoneParts, chassis, new THREE.Vector3(0, 0, 0));
    phoneGroup.add(chassis);

    // Antenna Bands & Edge Chamfers
    for (let side of [-2.11, 2.11]) {
      const bandGeo = new THREE.BoxGeometry(0.04, 0.2, 0.44);
      const band = new THREE.Mesh(bandGeo, darkPlasticMat);
      band.position.set(side, 2.5, 0);
      chassis.add(band);

      const band2 = band.clone();
      band2.position.set(side, -2.5, 0);
      chassis.add(band2);
    }

    // 2. Front Curved Sapphire Screen
    const screenGeo = new THREE.BoxGeometry(4.05, 8.25, 0.08);
    const screenTex = createPhoneScreenTexture();
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTex,
      roughness: 0.04,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: screenTex,
      emissiveIntensity: 0.65
    });
    const frontScreen = new THREE.Mesh(screenGeo, screenMat);
    frontScreen.position.set(0, 0, 0.26);
    // Explodes forward on Z+
    registerPart(phoneParts, frontScreen, new THREE.Vector3(0, 0, 4.2));
    phoneGroup.add(frontScreen);

    // 3. Frosted Matte Back Glass
    const backGeo = new THREE.BoxGeometry(4.1, 8.3, 0.08);
    const backMat = new THREE.MeshStandardMaterial({
      color: 0x181e28,
      roughness: 0.35,
      metalness: 0.4
    });
    const backGlass = new THREE.Mesh(backGeo, backMat);
    backGlass.position.set(0, 0, -0.26);
    // Explodes backwards on Z-
    registerPart(phoneParts, backGlass, new THREE.Vector3(0, 0, -3.8));
    phoneGroup.add(backGlass);

    // 4. Copper Vapor Chamber Heat Sink
    const vaporGeo = new THREE.BoxGeometry(3.2, 5.5, 0.04);
    const vaporChamber = new THREE.Mesh(vaporGeo, copperMat);
    vaporChamber.position.set(0, 0.4, 0.08);
    registerPart(phoneParts, vaporChamber, new THREE.Vector3(-1.2, 0, 1.8));
    phoneGroup.add(vaporChamber);

    // 5. Main Logic Board with Aura Bionic 3nm Chip
    const boardGeo = new THREE.BoxGeometry(3.6, 3.8, 0.06);
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x111a24,
      metalness: 0.7,
      roughness: 0.35
    });
    const motherboard = new THREE.Mesh(boardGeo, boardMat);
    motherboard.position.set(0, 1.8, 0.14);

    // 3nm Chip raised package
    const chipGeo = new THREE.BoxGeometry(1.6, 1.6, 0.08);
    const chipTex = createChipTexture();
    const chipMat = new THREE.MeshStandardMaterial({
      map: chipTex,
      roughness: 0.25,
      metalness: 0.8,
      emissive: 0x00e5ff,
      emissiveMap: chipTex,
      emissiveIntensity: 0.95
    });
    const bionicChip = new THREE.Mesh(chipGeo, chipMat);
    bionicChip.position.set(0, 0, 0.06);
    motherboard.add(bionicChip);

    // Gold connector headers on board
    for (let c = -1.2; c <= 1.2; c += 0.6) {
      const connGeo = new THREE.BoxGeometry(0.4, 0.15, 0.08);
      const conn = new THREE.Mesh(connGeo, goldMat);
      conn.position.set(c, -1.6, 0.04);
      motherboard.add(conn);
    }
    registerPart(phoneParts, motherboard, new THREE.Vector3(0, 2.2, 2.4));
    phoneGroup.add(motherboard);

    // 6. Graphene Battery Cell
    const battGeo = new THREE.BoxGeometry(3.5, 3.8, 0.15);
    const battMat = new THREE.MeshStandardMaterial({
      color: 0x0f1520,
      roughness: 0.4,
      metalness: 0.6
    });
    const battery = new THREE.Mesh(battGeo, battMat);
    battery.position.set(0, -1.8, 0.1);
    registerPart(phoneParts, battery, new THREE.Vector3(0, -2.4, 1.6));
    phoneGroup.add(battery);

    // 7. Triple Camera Module Island (Back)
    const camIslandGroup = new THREE.Group();
    camIslandGroup.position.set(0.9, 2.4, -0.36);

    const islandPlateGeo = new THREE.BoxGeometry(1.8, 2.0, 0.15);
    const islandPlate = new THREE.Mesh(islandPlateGeo, titaniumMat);
    camIslandGroup.add(islandPlate);

    // 3 Sapphire Camera Lenses
    const lensPositions = [
      { x: -0.45, y: 0.45 },
      { x: -0.45, y: -0.45 },
      { x: 0.45, y: 0 }
    ];

    lensPositions.forEach((pos, idx) => {
      // Ring barrel
      const ringGeo = new THREE.CylinderGeometry(0.36, 0.38, 0.22, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, titaniumMat);
      ring.position.set(pos.x, pos.y, -0.12);
      camIslandGroup.add(ring);

      // Glass lens element
      const glassGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.05, 32);
      glassGeo.rotateX(Math.PI / 2);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x102040,
        roughness: 0.05,
        transmission: 0.9,
        reflectivity: 0.9
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.set(pos.x, pos.y, -0.22);
      camIslandGroup.add(glass);
    });

    registerPart(phoneParts, camIslandGroup, new THREE.Vector3(2.5, 2.0, -4.5));
    phoneGroup.add(camIslandGroup);

    // 8. MagSafe Induction Copper Coil Ring
    const coilGeo = new THREE.RingGeometry(1.0, 1.5, 48);
    const coilMat = new THREE.MeshStandardMaterial({
      color: 0xd97543,
      metalness: 0.95,
      roughness: 0.25,
      side: THREE.DoubleSide
    });
    const coil = new THREE.Mesh(coilGeo, coilMat);
    coil.position.set(0, 0, -0.18);
    registerPart(phoneParts, coil, new THREE.Vector3(0, 0, -2.2));
    phoneGroup.add(coil);

    scene.add(phoneGroup);
  }

  // --- DEVICE 2: AUDIOPHILE HEADPHONES (AuraSonic ANC Pro X1) ---
  function buildHeadphones() {
    headphoneGroup = new THREE.Group();
    headphoneGroup.position.set(12, 1.8, 0); // Positioned for lateral stage transition

    const aluminumMat = new THREE.MeshStandardMaterial({
      color: 0x303642,
      metalness: 0.88,
      roughness: 0.22
    });

    const berylliumMat = new THREE.MeshStandardMaterial({
      color: 0x98a2ad,
      metalness: 0.95,
      roughness: 0.16
    });

    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x0e131c,
      roughness: 0.85,
      metalness: 0.15
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xd97543,
      metalness: 0.92,
      roughness: 0.25
    });

    // 1. Titanium Telescopic Headband Arch
    const bandCurve = new THREE.EllipseCurve(0, 0, 3.2, 3.4, 0, Math.PI, false, 0);
    const bandPoints = bandCurve.getPoints(50);
    const bandGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(bandPoints.map(p => new THREE.Vector3(p.x, p.y, 0))), 64, 0.18, 12, false);
    const headband = new THREE.Mesh(bandGeo, aluminumMat);
    headband.position.set(0, 0.4, 0);
    registerPart(headphoneParts, headband, new THREE.Vector3(0, 4.5, 0));
    headphoneGroup.add(headband);

    // 2. Ear Cups (Left & Right) with Exploded Acoustic Drivers
    [-1, 1].forEach((side) => {
      const cupSideGroup = new THREE.Group();
      cupSideGroup.position.set(side * 3.2, 0, 0);

      // Yoke Fork
      const yokeGeo = new THREE.TorusGeometry(1.2, 0.12, 12, 32, Math.PI);
      const yoke = new THREE.Mesh(yokeGeo, aluminumMat);
      yoke.rotation.z = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      cupSideGroup.add(yoke);

      // Outer Aluminum Acoustic Shell
      const shellGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.8, 36);
      shellGeo.rotateZ(Math.PI / 2);
      const shell = new THREE.Mesh(shellGeo, aluminumMat);
      shell.position.set(side * 0.4, 0, 0);
      registerPart(headphoneParts, shell, new THREE.Vector3(side * 3.0, 0, 0));
      cupSideGroup.add(shell);

      // Halo Ring Glow on Shell
      const haloGeo = new THREE.RingGeometry(1.3, 1.45, 36);
      haloGeo.rotateY(Math.PI / 2);
      const haloMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x00e5ff,
        emissiveIntensity: 1.2,
        side: THREE.DoubleSide
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(side * 0.81, 0, 0);
      shell.add(halo);

      // Neodymium Magnet Core (Exploded)
      const magnetGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.25, 32);
      magnetGeo.rotateZ(Math.PI / 2);
      const magnet = new THREE.Mesh(magnetGeo, aluminumMat);
      magnet.position.set(side * 0.15, 0, 0);
      registerPart(headphoneParts, magnet, new THREE.Vector3(side * 1.8, 0, 1.2));
      cupSideGroup.add(magnet);

      // Copper Voice Coil Cylinder (Exploded)
      const coilGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.2, 32, 1, true);
      coilGeo.rotateZ(Math.PI / 2);
      const voiceCoil = new THREE.Mesh(coilGeo, copperMat);
      voiceCoil.position.set(side * -0.05, 0, 0);
      registerPart(headphoneParts, voiceCoil, new THREE.Vector3(side * 1.2, 0, 2.2));
      cupSideGroup.add(voiceCoil);

      // 40mm Beryllium Diaphragm Driver (Exploded)
      const driverGeo = new THREE.CylinderGeometry(1.25, 1.35, 0.08, 36);
      driverGeo.rotateZ(Math.PI / 2);
      const driver = new THREE.Mesh(driverGeo, berylliumMat);
      driver.position.set(side * -0.25, 0, 0);
      registerPart(headphoneParts, driver, new THREE.Vector3(side * 0.5, 0, 3.4));
      cupSideGroup.add(driver);

      // Memory Foam Ear Cushion
      const cushionGeo = new THREE.TorusGeometry(1.35, 0.42, 16, 36);
      cushionGeo.rotateY(Math.PI / 2);
      const cushion = new THREE.Mesh(cushionGeo, cushionMat);
      cushion.position.set(side * -0.65, 0, 0);
      registerPart(headphoneParts, cushion, new THREE.Vector3(side * -2.4, 0, 0));
      cupSideGroup.add(cushion);

      headphoneGroup.add(cupSideGroup);
    });

    scene.add(headphoneGroup);
  }

  // --- DEVICE 3: SPATIAL HI-FI SPEAKER (AuraSphere 360°) ---
  function buildSpeaker() {
    speakerGroup = new THREE.Group();
    speakerGroup.position.set(-12, 1.5, 0); // Positioned for lateral stage transition

    const cabinetMat = new THREE.MeshStandardMaterial({
      color: 0x181e28,
      metalness: 0.85,
      roughness: 0.28
    });

    const grilleTex = createSpeakerGrilleTexture();
    const grilleMat = new THREE.MeshStandardMaterial({
      map: grilleTex,
      metalness: 0.9,
      roughness: 0.35
    });

    const wooferMat = new THREE.MeshStandardMaterial({
      color: 0x0b0e14,
      metalness: 0.6,
      roughness: 0.3
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xd97543,
      metalness: 0.95,
      roughness: 0.25
    });

    // 1. Main Inner Acoustic Chamber
    const coreGeo = new THREE.CylinderGeometry(2.1, 2.2, 5.2, 36);
    const core = new THREE.Mesh(coreGeo, cabinetMat);
    core.position.set(0, 0, 0);
    registerPart(speakerParts, core, new THREE.Vector3(0, 0, 0));
    speakerGroup.add(core);

    // 2. 360° Laser Micro-perforated Outer Grille Sleeve (Explodes upwards)
    const sleeveGeo = new THREE.CylinderGeometry(2.35, 2.35, 5.4, 36, 1, true);
    const sleeve = new THREE.Mesh(sleeveGeo, grilleMat);
    sleeve.position.set(0, 0, 0);
    registerPart(speakerParts, sleeve, new THREE.Vector3(0, 4.8, 0));
    speakerGroup.add(sleeve);

    // 3. Top CNC Knurled Volume Crown (Explodes upwards)
    const crownGeo = new THREE.CylinderGeometry(1.9, 2.0, 0.45, 48);
    const crownMat = new THREE.MeshStandardMaterial({
      color: 0x2e3544,
      metalness: 0.95,
      roughness: 0.18
    });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.set(0, 2.8, 0);
    registerPart(speakerParts, crown, new THREE.Vector3(0, 7.2, 0));
    speakerGroup.add(crown);

    // 4. Down-Firing High-Excursion Bass Woofer (Explodes downwards)
    const wooferGroup = new THREE.Group();
    wooferGroup.position.set(0, -2.6, 0);

    const coneGeo = new THREE.ConeGeometry(1.8, 0.9, 32, 1, true);
    coneGeo.rotateX(Math.PI);
    const cone = new THREE.Mesh(coneGeo, wooferMat);
    wooferGroup.add(cone);

    const dustCapGeo = new THREE.SphereGeometry(0.55, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const dustCap = new THREE.Mesh(dustCapGeo, wooferMat);
    dustCap.position.set(0, -0.3, 0);
    wooferGroup.add(dustCap);

    const wooferCoilGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.4, 32);
    const wooferCoil = new THREE.Mesh(wooferCoilGeo, copperMat);
    wooferCoil.position.set(0, 0.2, 0);
    wooferGroup.add(wooferCoil);

    registerPart(speakerParts, wooferGroup, new THREE.Vector3(0, -4.5, 0));
    speakerGroup.add(wooferGroup);

    // 5. Dual Symmetrical Side Passive Radiators (Explodes laterally X)
    [-1, 1].forEach((side) => {
      const radGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.25, 32);
      radGeo.rotateZ(Math.PI / 2);
      const radiator = new THREE.Mesh(radGeo, wooferMat);
      radiator.position.set(side * 2.1, 0, 0);
      registerPart(speakerParts, radiator, new THREE.Vector3(side * 3.8, 0, 0));
      speakerGroup.add(radiator);
    });

    // 6. Base Aura RGB Ambient Light Halo Ring
    const haloGeo = new THREE.TorusGeometry(2.35, 0.09, 16, 48);
    haloGeo.rotateX(Math.PI / 2);
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 1.5
    });
    const haloRing = new THREE.Mesh(haloGeo, haloMat);
    haloRing.position.set(0, -2.55, 0);
    registerPart(speakerParts, haloRing, new THREE.Vector3(0, -1.5, 0));
    speakerGroup.add(haloRing);

    scene.add(speakerGroup);
  }

  // --- ENVIRONMENT: PEDESTAL, PARTICLES, LASER GUIDES & SOUNDWAVES ---
  function buildEnvironment() {
    // 1. Dark Mirror Quantum Levitation Pedestal
    pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -3.2, 0);

    const pedestalGeo = new THREE.CylinderGeometry(14, 15, 0.8, 64);
    const pedestalTex = createPedestalGridTexture();
    const pedestalMat = new THREE.MeshStandardMaterial({
      map: pedestalTex,
      color: 0x0c111a,
      metalness: 0.95,
      roughness: 0.18
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.receiveShadow = true;
    pedestalGroup.add(pedestalMesh);

    // Glowing Concentric Laser Rings on Pedestal Top
    [5.0, 8.5, 12.0].forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.08, r + 0.08, 64);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 1 ? 0xe2fd52 : 0x00e5ff,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 0.42;
      pedestalGroup.add(ring);
    });

    scene.add(pedestalGroup);

    // 2. Floating Quantum Particles (1,200 micro motes)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00e5ff);
    const c2 = new THREE.Color(0xe2fd52);
    const c3 = new THREE.Color(0x8a2be2);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 36;

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

    // 3. Laser Assembly Guide Beams Group
    laserBeamsGroup = new THREE.Group();
    scene.add(laserBeamsGroup);

    // 4. 3D Holographic Acoustic Soundwaves Group
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

  // --- STUDIO 4-POINT LIGHTING SETUP ---
  function setupLighting() {
    ambientLight = new THREE.AmbientLight(0x060c18, 1.2);
    scene.add(ambientLight);

    // Key Light (Crisp Pure White)
    keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(12, 18, 14);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Intense Cyan Rim Light (Glancing edge specular)
    rimLightCyan = new THREE.DirectionalLight(0x00e5ff, 2.4);
    rimLightCyan.position.set(-14, 8, -10);
    scene.add(rimLightCyan);

    // Vivid Lime Accent Rim Light
    rimLightLime = new THREE.DirectionalLight(0xe2fd52, 1.8);
    rimLightLime.position.set(14, -4, -8);
    scene.add(rimLightLime);

    // Ethereal Underglow Violet Point Light
    underLight = new THREE.PointLight(0x8a2be2, 2.2, 25);
    underLight.position.set(0, -2.8, 0);
    scene.add(underLight);
  }

  /* =========================================================================
     3. DYNAMIC SCROLL ANIMATION ORCHESTRATION (THE 5 ACTS)
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

  function setStageProgress(p) {
    currentProgress = p;

    // Determine effective explosion factor
    let phoneExplode = 0;
    let hpExplode = 0;
    let spExplode = 0;

    // Stage Step UI pill updates
    updateStageHUD(p);

    // =========================================================================
    // ACT I (0.00 -> 0.22): Exploded Smartphone Universe
    // =========================================================================
    if (p <= 0.22) {
      const t = p / 0.22;
      // Phone is floating exploded at start, starts assembling as t approaches 1
      phoneExplode = Math.max(1.0 - t * 0.4, 0.6); // 1.0 -> 0.6
      hpExplode = 1.0;
      spExplode = 1.0;

      // Position devices
      phoneGroup.position.set(0, 1.8, 0);
      headphoneGroup.position.set(16, 1.8, -5);
      speakerGroup.position.set(-16, 1.5, -5);

      // Camera: Dramatic dynamic orbit around floating phone parts
      camState.pos.x = 12 * Math.cos(t * 0.8 + 0.4);
      camState.pos.y = 6 + Math.sin(t * 1.2) * 2.5;
      camState.pos.z = 18 * Math.sin(t * 0.8 + 0.4);
      camState.target.set(0, 1.8, 0);

      triggerCallout("phone", "CÔNG NGHỆ 3NM • KHUNG TITANIUM GRADE 5", "AuraPhone Pro: Phân rã đa tầng vi mạch và màn hình Sapphire.");
    }
    // =========================================================================
    // ACT II (0.22 -> 0.44): Precision Automated Robot Assembly
    // =========================================================================
    else if (p <= 0.44) {
      const t = (p - 0.22) / 0.22;
      // Phone smoothly snaps together 0.6 -> 0.0 (fully assembled)
      phoneExplode = Math.max(0.6 * (1.0 - t), 0);
      hpExplode = 1.0;
      spExplode = 1.0;

      phoneGroup.position.set(0, 1.8, 0);
      headphoneGroup.position.set(16 - t * 4, 1.8, -5);
      speakerGroup.position.set(-16 + t * 4, 1.5, -5);

      // Macro dive straight into the chip, then swooping back to reveal finished chassis
      if (t < 0.5) {
        const mt = t / 0.5;
        camState.pos.x = 4 + (1 - mt) * 4;
        camState.pos.y = 2.5 + (1 - mt) * 2;
        camState.pos.z = 7 + (1 - mt) * 8;
        camState.target.set(0, 1.8, 0);
      } else {
        const mt = (t - 0.5) / 0.5;
        camState.pos.x = 4 + mt * 6;
        camState.pos.y = 2.5 + mt * 2.5;
        camState.pos.z = 7 + mt * 9;
        camState.target.set(0, 1.8, 0);
      }

      triggerCallout("phone-assembled", "HOÀN TẤT LẮP RÁP • CHỐNG NƯỚC IP68", "Khung viền nguyên khối khóa từ tính, màn hình Sapphire liên kết nano.");
    }
    // =========================================================================
    // ACT III (0.44 -> 0.68): Audiophile Headphone Teardown & Synthesis
    // =========================================================================
    else if (p <= 0.68) {
      const t = (p - 0.44) / 0.24;
      phoneExplode = 0;
      // Headphones transition from exploded 1.0 -> 0.0 assembled
      hpExplode = Math.max(1.0 - t * 1.1, 0);
      spExplode = 1.0;

      // Phone glides to left stage, Headphones glide to center
      phoneGroup.position.set(-5.5 * t, 1.8, -2.5 * t);
      headphoneGroup.position.set(12 * (1.0 - t), 1.8, 0);
      speakerGroup.position.set(-16, 1.5, -5);

      // Camera orbits around the acoustic driver and Beryllium diaphragm
      camState.pos.x = headphoneGroup.position.x + 8 * Math.cos(t * 2.2);
      camState.pos.y = 3.5 + Math.sin(t * 1.5) * 1.8;
      camState.pos.z = 10 * Math.sin(t * 2.2) + 4;
      camState.target.set(headphoneGroup.position.x, 1.8, 0);

      // Trigger 3D soundwave ripple when snapping together (t > 0.75)
      if (t > 0.75) {
        animateSoundwaves(t - 0.75);
      }

      triggerCallout("headphone", "MÀNG LOA BERYLLIUM 40MM • THD < 0.01%", "Cuộn cảm đồng tinh khiết & nam châm Neodymium tái tạo dải âm 40kHz.");
    }
    // =========================================================================
    // ACT IV (0.68 -> 0.88): Omnidirectional Sound Sphere Architecture
    // =========================================================================
    else if (p <= 0.88) {
      const t = (p - 0.68) / 0.20;
      phoneExplode = 0;
      hpExplode = 0;
      // Speaker assembles 1.0 -> 0.0
      spExplode = Math.max(1.0 - t * 1.1, 0);

      phoneGroup.position.set(-6.5, 1.8, -3.0);
      headphoneGroup.position.set(6.5, 1.8, -3.0);
      speakerGroup.position.set(0, 1.5, 0);

      // Camera sweeps downward in a spiral focusing on the woofer and 360° grille
      camState.pos.x = 9 * Math.sin(t * 2.5);
      camState.pos.y = 5.5 - t * 2.0;
      camState.pos.z = 12 * Math.cos(t * 2.5);
      camState.target.set(0, 1.5, 0);

      triggerCallout("speaker", "BUỒNG ÂM KHÔNG GIAN 360° • MATTER 2.0", "Hệ màng rung thụ động kép và lưới kim loại khắc Laser vi mô.");
    }
    // =========================================================================
    // ACT V (0.88 -> 1.00): Grand Finale - The Triumvirate Ecosystem
    // =========================================================================
    else {
      const t = (p - 0.88) / 0.12;
      phoneExplode = 0;
      hpExplode = 0;
      spExplode = 0;

      // Golden Ratio 3D levitation arrangement on pedestal
      phoneGroup.position.set(-4.5, 1.8, 1.2);
      headphoneGroup.position.set(4.5, 1.8, 1.2);
      speakerGroup.position.set(0, 1.6, -2.8);

      // Gentle floating rotation
      phoneGroup.rotation.y = -0.35 + Math.sin(Date.now() * 0.001) * 0.08;
      headphoneGroup.rotation.y = 0.35 - Math.sin(Date.now() * 0.001) * 0.08;
      speakerGroup.rotation.y = Date.now() * 0.0004;

      // Camera: Grand sweeping panoramic studio hero view
      camState.pos.x = 0;
      camState.pos.y = 5.2 + Math.sin(t * Math.PI) * 1.0;
      camState.pos.z = 21.0 - t * 2.0;
      camState.target.set(0, 1.2, 0);

      triggerCallout("ecosystem", "HỆ SINH THÁI ĐỘT PHÁ AURATECH 2026", "Tất cả thiết bị kết nối liền mạch qua giao thức SpatialOS & Matter.");
    }

    // Apply manual explode override if user is using the interactive slider
    if (isManualOverride) {
      phoneExplode = manualExplodeFactor;
      hpExplode = manualExplodeFactor;
      spExplode = manualExplodeFactor;
    }

    // Apply exploded offsets to 3D meshes
    updateExplodedParts(phoneParts, phoneExplode);
    updateExplodedParts(headphoneParts, hpExplode);
    updateExplodedParts(speakerParts, spExplode);
  }

  function animateSoundwaves(intensity) {
    allSoundwaves.forEach((wave, idx) => {
      wave.visible = true;
      const progress = (intensity * 4 + idx * 0.25) % 1;
      wave.scale.setScalar(1 + progress * 2.2);
      wave.material.opacity = (1 - progress) * 0.7;
    });
  }

  /* =========================================================================
     4. HUD CALLOUTS & STEPPER SYNCHRONIZATION
     ========================================================================= */

  function updateStageHUD(progress) {
    const steps = [
      { id: "step-1", threshold: 0.22, name: "Khung Vỏ & Chip 3nm" },
      { id: "step-2", threshold: 0.44, name: "Lắp Ráp Robot" },
      { id: "step-3", threshold: 0.68, name: "Màng Loa Beryllium" },
      { id: "step-4", threshold: 0.88, name: "Loa Không Gian 360°" },
      { id: "step-5", threshold: 1.00, name: "Hệ Sinh Thái 2026" }
    ];

    let currentStepIdx = 0;
    for (let i = 0; i < steps.length; i++) {
      if (progress <= steps[i].threshold) {
        currentStepIdx = i;
        break;
      }
    }

    document.querySelectorAll(".assembly-step-pill").forEach((pill, idx) => {
      if (idx === currentStepIdx) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });

    const percentEl = document.getElementById("assembly-percent-text");
    if (percentEl) {
      percentEl.textContent = Math.round(progress * 100) + "%";
    }

    const progressBar = document.getElementById("assembly-live-progress");
    if (progressBar) {
      progressBar.style.width = Math.round(progress * 100) + "%";
    }
  }

  function triggerCallout(key, title, subtitle) {
    const titleEl = document.getElementById("assembly-callout-title");
    const descEl = document.getElementById("assembly-callout-desc");
    if (titleEl && titleEl.textContent !== title) {
      titleEl.textContent = title;
      if (descEl) descEl.textContent = subtitle;

      const card = document.getElementById("assembly-floating-callout");
      if (card) {
        card.classList.remove("animate-pulse-glow");
        void card.offsetWidth; // retrigger animation
        card.classList.add("animate-pulse-glow");
      }
    }
  }

  /* =========================================================================
     5. RENDER LOOP WITH VELVET PARALLAX & PERFORMANCE OPTIMIZATIONS
     ========================================================================= */

  function render() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    // Smooth Mouse Parallax Lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Apply Camera Target Interpolation
    camera.position.x += (camState.pos.x + mouse.x * 2.5 - camera.position.x) * 0.06;
    camera.position.y += (camState.pos.y - mouse.y * 1.8 - camera.position.y) * 0.06;
    camera.position.z += (camState.pos.z - camera.position.z) * 0.06;

    camera.lookAt(camState.target.x, camState.target.y, camState.target.z);

    // Subtle ambient particle floating rotation
    if (particleSystem) {
      particleSystem.rotation.y = Date.now() * 0.00015;
    }

    // Subtle pedestal laser rings breathing
    if (pedestalGroup) {
      pedestalGroup.rotation.y = Date.now() * 0.0001;
    }

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(render);
  }

  /* =========================================================================
     6. GSAP SCROLLTRIGGER BINDING (1150vh DURATION PRESERVED)
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
        if (!isManualOverride) {
          setStageProgress(self.progress);
        }
      }
    });
  }

  /* =========================================================================
     7. INTERACTIVE CONTROLS: SLIDER, FOCUS BUTTONS, MOUSE DRAG
     ========================================================================= */

  function bindUserInteractions() {
    const viewport = document.getElementById("assembly-3d-viewport");
    if (!viewport) return;

    // Mouse Move for 3D Specular Parallax
    window.addEventListener("mousemove", (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Manual Exploded View Slider
    const slider = document.getElementById("assembly-explode-slider");
    if (slider) {
      slider.addEventListener("input", (e) => {
        isManualOverride = true;
        manualExplodeFactor = parseFloat(e.target.value) / 100;
        setStageProgress(currentProgress);

        const resetBtn = document.getElementById("assembly-reset-btn");
        if (resetBtn) resetBtn.style.display = "inline-flex";
      });
    }

    // Reset Manual Inspection to Auto Scrollytelling
    window.resetAssemblyToScroll = function () {
      isManualOverride = false;
      const slider = document.getElementById("assembly-explode-slider");
      if (slider) slider.value = 0;
      const resetBtn = document.getElementById("assembly-reset-btn");
      if (resetBtn) resetBtn.style.display = "none";
      setStageProgress(currentProgress);
    };

    // Quick Focus Switcher Pills
    window.focusAssemblyDevice = function (target) {
      activeFocusTarget = target;
      isManualOverride = true;

      document.querySelectorAll(".device-focus-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.target === target);
      });

      if (target === "phone") {
        camState.pos.set(0, 2.2, 9.5);
        camState.target.set(0, 1.8, 0);
        manualExplodeFactor = 0.5;
      } else if (target === "headphones") {
        camState.pos.set(0, 2.5, 8.5);
        camState.target.set(0, 1.8, 0);
        manualExplodeFactor = 0.6;
      } else if (target === "speaker") {
        camState.pos.set(0, 2.8, 9.0);
        camState.target.set(0, 1.5, 0);
        manualExplodeFactor = 0.6;
      } else {
        camState.pos.set(0, 5.2, 20.0);
        camState.target.set(0, 1.2, 0);
        manualExplodeFactor = 0.0;
      }

      const resetBtn = document.getElementById("assembly-reset-btn");
      if (resetBtn) resetBtn.style.display = "inline-flex";

      setStageProgress(currentProgress);
    };

    // Stage stepper click to jump to stage
    window.jumpToAssemblyStage = function (stageIndex) {
      const section = document.getElementById("scrolly-masterpiece");
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const targetScroll = sectionTop + (stageIndex / 4) * sectionHeight;

      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(targetScroll, { duration: 1.6 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    };
  }

  /* =========================================================================
     8. INITIALIZATION & RESIZE HANDLING
     ========================================================================= */

  function init() {
    container = document.getElementById("assembly-3d-viewport");
    if (!container) return;

    if (typeof THREE === "undefined") {
      console.error("Three.js not loaded. Cannot start 3D Assembly Engine.");
      return;
    }

    // Create Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04070d, 0.022);

    // Create Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(camState.pos.x, camState.pos.y, camState.pos.z);
    camera.lookAt(camState.target.x, camState.target.y, camState.target.z);

    // Create WebGL Renderer with High-End Tone Mapping & ACES Filmic Look
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

    // Build Scene Objects
    setupLighting();
    buildEnvironment();
    buildPhone();
    buildHeadphones();
    buildSpeaker();

    // Set initial state
    setStageProgress(0);

    // Bind GSAP ScrollTrigger
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
