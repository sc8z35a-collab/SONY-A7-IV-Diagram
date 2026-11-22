import * as THREE from 'three';

export interface MaterialLibrary {
  clippingPlanes: THREE.Plane[];
  // Macro materials
  matteBlackAnodized: THREE.MeshPhysicalMaterial;
  epdmGasket: THREE.MeshStandardMaterial;
  sswfGlass: THREE.MeshPhysicalMaterial;
  pztCeramic: THREE.MeshStandardMaterial;
  silverElectrode: THREE.MeshStandardMaterial;
  quartzOlpf: THREE.MeshPhysicalMaterial;
  quartzEdge: THREE.MeshPhysicalMaterial;
  irCutGlass: THREE.MeshPhysicalMaterial;
  coverGlass: THREE.MeshPhysicalMaterial;
  kovarSeal: THREE.MeshStandardMaterial;
  siliconSensorDie: THREE.MeshPhysicalMaterial;
  siliconBulk: THREE.MeshPhysicalMaterial;
  siliconLogicLayer: THREE.MeshPhysicalMaterial;
  siliconDramLayer: THREE.MeshPhysicalMaterial;
  goldPlating: THREE.MeshStandardMaterial;
  ceramicAlumina: THREE.MeshStandardMaterial;
  tungstenCopper: THREE.MeshStandardMaterial;
  sensorPcb: THREE.MeshStandardMaterial;
  pcbSide: THREE.MeshStandardMaterial;
  smdCeramic: THREE.MeshStandardMaterial;
  icEpoxy: THREE.MeshStandardMaterial;
  polyimideFpc: THREE.MeshPhysicalMaterial;
  emiShieldFilm: THREE.MeshStandardMaterial;
  magnesiumCast: THREE.MeshStandardMaterial;
  stainlessMachined: THREE.MeshStandardMaterial;
  copperCoil: THREE.MeshStandardMaterial;
  copperHeatSpreader: THREE.MeshStandardMaterial;
  neodymiumMagnet: THREE.MeshPhysicalMaterial;
  softIronYoke: THREE.MeshStandardMaterial;
  siliconNitrideBall: THREE.MeshPhysicalMaterial;
  pyroGraphite: THREE.MeshPhysicalMaterial;
  thermalPadTim: THREE.MeshStandardMaterial;
  // Micro pixel materials
  microlensGlass: THREE.MeshPhysicalMaterial;
  cfaRed: THREE.MeshPhysicalMaterial;
  cfaGreen: THREE.MeshPhysicalMaterial;
  cfaBlue: THREE.MeshPhysicalMaterial;
  tungstenGrid: THREE.MeshStandardMaterial;
  siliconPhotodiode: THREE.MeshPhysicalMaterial;
  siliconDepletion: THREE.MeshPhysicalMaterial;
  ftiOxide: THREE.MeshPhysicalMaterial;
  siliconTransistorLayer: THREE.MeshPhysicalMaterial;
  gatePolysilicon: THREE.MeshStandardMaterial;
  memoryNodeShield: THREE.MeshStandardMaterial;
  copperHybridBond: THREE.MeshStandardMaterial;
  interlayerDielectric: THREE.MeshPhysicalMaterial;
  dramCellArray: THREE.MeshStandardMaterial;
  // Shutter materials
  carbonFiberBlade: THREE.MeshPhysicalMaterial;
  carbonFiberBladeRear: THREE.MeshPhysicalMaterial;
  shutterShieldBlade: THREE.MeshStandardMaterial;
  shutterChassis: THREE.MeshStandardMaterial;
  midPlateSteel: THREE.MeshStandardMaterial;
  linkArmSteel: THREE.MeshStandardMaterial;
  brassGear: THREE.MeshStandardMaterial;
  pomGear: THREE.MeshStandardMaterial;
  damperElastomer: THREE.MeshStandardMaterial;
  antiVibRubber: THREE.MeshStandardMaterial;
  irLedLens: THREE.MeshPhysicalMaterial;
  // Utility
  allMaterials: THREE.Material[];
}

function createSensorDieTexture(): { map: THREE.CanvasTexture; roughnessMap: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const w = 1024;
  const h = 682;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = w;
  colorCanvas.height = h;
  const ctx = colorCanvas.getContext('2d')!;

  // Base silicon wafer deep jewel-like emerald-indigo-violet
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#0a2b36');
  grad.addColorStop(0.24, '#0f5460');
  grad.addColorStop(0.5, '#143c6b');
  grad.addColorStop(0.76, '#2a2463');
  grad.addColorStop(1, '#0c3b47');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Outer peripheral logic & optical black border
  const marginX = 48;
  const marginY = 36;
  ctx.fillStyle = '#181e28';
  ctx.fillRect(0, 0, w, marginY);
  ctx.fillRect(0, h - marginY, w, marginY);
  ctx.fillRect(0, 0, marginX, h);
  ctx.fillRect(w - marginX, 0, marginX, h);

  // Subtle bus traces in periphery
  ctx.strokeStyle = 'rgba(186, 212, 240, 0.34)';
  ctx.lineWidth = 1.2;
  for (let i = 6; i < marginY - 6; i += 4) {
    ctx.beginPath();
    ctx.moveTo(marginX - 16, i);
    ctx.lineTo(w - marginX + 16, i);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(marginX - 16, h - i);
    ctx.lineTo(w - marginX + 16, h - i);
    ctx.stroke();
  }

  // Gold/Al bond pads around perimeter
  ctx.fillStyle = '#e6c05a';
  for (let x = 28; x < w - 28; x += 14) {
    ctx.fillRect(x, 6, 7, 10);
    ctx.fillRect(x, h - 16, 7, 10);
  }
  for (let y = 26; y < h - 26; y += 14) {
    ctx.fillRect(6, y, 10, 7);
    ctx.fillRect(w - 16, y, 10, 7);
  }

  // Active 36x24mm imaging area frame (Optical Black + Readout Ring)
  ctx.strokeStyle = '#7bb0d4';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(marginX - 3, marginY - 3, w - marginX * 2 + 6, h - marginY * 2 + 6);

  // Fine diffraction micro-grid inside active area
  const actX = marginX;
  const actY = marginY;
  const actW = w - marginX * 2;
  const actH = h - marginY * 2;

  // Spectral diffraction sheen bands (signature CMOS sensor optical interference)
  const spec = ctx.createLinearGradient(actX, actY, actX + actW, actY + actH);
  spec.addColorStop(0.0, 'rgba(16, 198, 174, 0.52)');
  spec.addColorStop(0.28, 'rgba(28, 134, 232, 0.48)');
  spec.addColorStop(0.55, 'rgba(112, 72, 224, 0.44)');
  spec.addColorStop(0.80, 'rgba(24, 188, 146, 0.50)');
  spec.addColorStop(1.0, 'rgba(42, 144, 236, 0.46)');
  ctx.fillStyle = spec;
  ctx.fillRect(actX, actY, actW, actH);

  // Sub-block readout columns & fine pixel pitch texture
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.11)';
  ctx.lineWidth = 1;
  for (let x = actX; x <= actX + actW; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, actY);
    ctx.lineTo(x, actY + actH);
    ctx.stroke();
  }
  for (let y = actY; y <= actY + actH; y += 8) {
    ctx.beginPath();
    ctx.moveTo(actX, y);
    ctx.lineTo(actX + actW, y);
    ctx.stroke();
  }

  // Subtle column ADC zone dividers (top/bottom bands of readout)
  ctx.strokeStyle = 'rgba(160, 235, 255, 0.22)';
  ctx.lineWidth = 1.5;
  for (let i = 1; i < 8; i++) {
    const gx = actX + (actW / 8) * i;
    ctx.beginPath();
    ctx.moveTo(gx, actY);
    ctx.lineTo(gx, actY + actH);
    ctx.stroke();
  }

  // Roughness & bump canvas
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = w;
  roughCanvas.height = h;
  const rctx = roughCanvas.getContext('2d')!;
  rctx.fillStyle = '#383838'; // Periphery slightly rougher
  rctx.fillRect(0, 0, w, h);
  rctx.fillStyle = '#141414'; // Active mirror-like wafer surface
  rctx.fillRect(actX, actY, actW, actH);
  rctx.strokeStyle = '#282828';
  for (let x = actX; x <= actX + actW; x += 6) {
    rctx.beginPath();
    rctx.moveTo(x, actY);
    rctx.lineTo(x, actY + actH);
    rctx.stroke();
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.anisotropy = 4;

  const bumpMap = new THREE.CanvasTexture(roughCanvas);
  bumpMap.anisotropy = 4;

  return { map, roughnessMap, bumpMap };
}

function createPcbTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const w = 1024;
  const h = 820;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // Modern flagship matte dark emerald-slate solder mask
  ctx.fillStyle = '#14332d';
  ctx.fillRect(0, 0, w, h);

  // Subtle fiberglass weave grid
  ctx.strokeStyle = 'rgba(255,255,255,0.025)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 8) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Copper ground plane inner relief
  ctx.fillStyle = '#194139';
  ctx.fillRect(28, 28, w - 56, h - 56);

  // High-speed SLVS-EC impedance-matched differential trace bundles
  ctx.strokeStyle = '#2d6e5e';
  ctx.lineWidth = 2.2;
  for (let lane = 0; lane < 16; lane++) {
    const y0 = 150 + lane * 32;
    // Left differential pair
    for (const dy of [-3, 3]) {
      ctx.beginPath();
      ctx.moveTo(44, y0 + dy);
      ctx.lineTo(130, y0 + dy);
      // Length-matching serpentine meander
      for (let m = 0; m < 4; m++) {
        const mx = 138 + m * 16;
        ctx.lineTo(mx, y0 + dy - 5);
        ctx.lineTo(mx + 8, y0 + dy + 5);
      }
      ctx.lineTo(255, y0 + dy);
      ctx.stroke();

      // Right differential pair
      ctx.beginPath();
      ctx.moveTo(w - 44, y0 + dy);
      ctx.lineTo(w - 130, y0 + dy);
      for (let m = 0; m < 4; m++) {
        const mx = w - 138 - m * 16;
        ctx.lineTo(mx, y0 + dy - 5);
        ctx.lineTo(mx - 8, y0 + dy + 5);
      }
      ctx.lineTo(w - 255, y0 + dy);
      ctx.stroke();
    }
  }

  // Central LGA breakout via matrix
  ctx.fillStyle = '#c9a653';
  for (let gx = 280; gx <= w - 280; gx += 26) {
    for (let gy = 135; gy <= h - 135; gy += 26) {
      if (gx > 380 && gx < w - 380 && gy > 235 && gy < h - 235) continue;
      ctx.beginPath();
      ctx.arc(gx, gy, 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0c1c19';
      ctx.beginPath();
      ctx.arc(gx, gy, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#c9a653';
    }
  }

  // Thermal via array at center back of ceramic package
  for (let gx = 400; gx <= w - 400; gx += 22) {
    for (let gy = 255; gy <= h - 255; gy += 22) {
      ctx.fillStyle = '#d4af59';
      ctx.beginPath();
      ctx.arc(gx, gy, 5.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#102420';
      ctx.beginPath();
      ctx.arc(gx, gy, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Gold fiducial & ground mounting rings at corners
  const corners = [
    [60, 60],
    [w - 60, 60],
    [60, h - 60],
    [w - 60, h - 60],
  ];
  for (const [cx, cy] of corners) {
    ctx.strokeStyle = '#dfb85c';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.stroke();
  }

  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;

  const bumpMap = new THREE.CanvasTexture(canvas);
  bumpMap.anisotropy = 4;

  return { map, bumpMap };
}

function createCopperCoilTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#a84c20';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < size; i += 4) {
    const shade = i % 8 === 0 ? '#d8763f' : '#8a3915';
    ctx.fillStyle = shade;
    ctx.fillRect(0, i, size, 2.5);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(3, 6);

  const bumpMap = new THREE.CanvasTexture(canvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(3, 6);

  return { map, bumpMap };
}

function createGraphiteTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#202228';
  ctx.fillRect(0, 0, size, size);
  for (let y = 0; y < size; y += 2) {
    const v = 28 + Math.floor(Math.sin(y * 0.7) * 6 + ((y * 37) % 9));
    ctx.fillStyle = `rgb(${v},${v + 2},${v + 6})`;
    ctx.fillRect(0, y, size, 1.5);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createCarbonFiberTexture(tintHex: string): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = tintHex;
  ctx.fillRect(0, 0, size, size);

  const cell = 16;
  for (let y = 0; y < size; y += cell) {
    for (let x = 0; x < size; x += cell) {
      const phase = ((x / cell + y / cell) % 2) === 0;
      const g = phase
        ? ctx.createLinearGradient(x, y, x + cell, y)
        : ctx.createLinearGradient(x, y, x, y + cell);
      g.addColorStop(0, 'rgba(255,255,255,0.03)');
      g.addColorStop(0.5, 'rgba(255,255,255,0.16)');
      g.addColorStop(1, 'rgba(0,0,0,0.22)');
      ctx.fillStyle = g;
      ctx.fillRect(x, y, cell, cell);
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(5, 2);
  map.anisotropy = 8;

  const bumpMap = new THREE.CanvasTexture(canvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(5, 2);

  return { map, bumpMap };
}

export function createMaterialLibrary(clippingPlanes: THREE.Plane[]): MaterialLibrary {
  const dieTex = createSensorDieTexture();
  const pcbTex = createPcbTexture();
  const coilTex = createCopperCoilTexture();
  const graphiteTex = createGraphiteTexture();
  const carbon1Tex = createCarbonFiberTexture('#1d2128');
  const carbon2Tex = createCarbonFiberTexture('#262d38');

  const common = {
    clippingPlanes,
    clipShadows: true,
    side: THREE.DoubleSide,
  };

  const matteBlackAnodized = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x202328,
    metalness: 0.65,
    roughness: 0.48,
    clearcoat: 0.08,
  });

  const epdmGasket = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x353840,
    metalness: 0.05,
    roughness: 0.88,
  });

  const glassCommon = {
    clippingPlanes,
    clipShadows: true,
    side: THREE.FrontSide,
    depthWrite: false,
    transparent: true,
    envMapIntensity: 0.35,
  };

  // Ultrasonic SSWF AR-coated ultra-clear thin optical glass
  const sswfGlass = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x8fd0f5,
    metalness: 0.0,
    roughness: 0.08,
    opacity: 0.10,
    iridescence: 0.85,
    iridescenceIOR: 1.46,
    iridescenceThicknessRange: [280, 480],
    clearcoat: 0.18,
  });

  const pztCeramic = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xe6decb,
    metalness: 0.08,
    roughness: 0.34,
  });

  const silverElectrode = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xb6c0cc,
    metalness: 0.88,
    roughness: 0.24,
  });

  // 16-Point Birefringent Synthetic Quartz OLPF
  const quartzOlpf = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0xaadbf0,
    metalness: 0.0,
    roughness: 0.06,
    opacity: 0.11,
    iridescence: 0.45,
    iridescenceIOR: 1.544,
    iridescenceThicknessRange: [300, 560],
    clearcoat: 0.15,
  });

  const quartzEdge = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x4b93b0,
    metalness: 0.12,
    roughness: 0.18,
    transparent: true,
    opacity: 0.62,
  });

  // Hybrid Phosphate Blue-Cyan IR-Absorption + Dichroic Multilayer IR/UV Cut Filter
  const irCutGlass = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x0e94c8,
    metalness: 0.02,
    roughness: 0.08,
    opacity: 0.20,
    iridescence: 0.95,
    iridescenceIOR: 1.62,
    iridescenceThicknessRange: [380, 700],
    clearcoat: 0.22,
  });

  // Low-alpha borosilicate hermetic cover glass
  const coverGlass = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x9ecbe0,
    metalness: 0.0,
    roughness: 0.08,
    opacity: 0.08,
    iridescence: 0.3,
    iridescenceIOR: 1.47,
    iridescenceThicknessRange: [220, 380],
    clearcoat: 0.12,
  });

  const kovarSeal = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x727c8a,
    metalness: 0.86,
    roughness: 0.28,
  });

  // Full-frame 3D-stacked BSI CMOS Silicon Die surface — unmistakable deep emerald/sapphire/violet wafer diffraction
  const siliconSensorDie = new THREE.MeshPhysicalMaterial({
    ...common,
    map: dieTex.map,
    emissiveMap: dieTex.map,
    emissive: 0xffffff,
    emissiveIntensity: 0.28,
    roughnessMap: dieTex.roughnessMap,
    bumpMap: dieTex.bumpMap,
    bumpScale: 0.04,
    metalness: 0.56,
    roughness: 0.24,
    iridescence: 1.0,
    iridescenceIOR: 2.1,
    iridescenceThicknessRange: [300, 680],
    clearcoat: 0.28,
    clearcoatRoughness: 0.14,
    envMapIntensity: 0.52,
  });

  const siliconBulk = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x2d3542,
    metalness: 0.78,
    roughness: 0.24,
  });

  const siliconLogicLayer = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x213a5a,
    metalness: 0.72,
    roughness: 0.26,
    iridescence: 0.45,
  });

  const siliconDramLayer = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x1c2330,
    metalness: 0.74,
    roughness: 0.28,
  });

  const goldPlating = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xe2b648,
    metalness: 0.94,
    roughness: 0.18,
  });

  const ceramicAlumina = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x2a2e36,
    metalness: 0.14,
    roughness: 0.58,
  });

  const tungstenCopper = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x85664e,
    metalness: 0.84,
    roughness: 0.34,
  });

  const sensorPcb = new THREE.MeshStandardMaterial({
    ...common,
    map: pcbTex.map,
    bumpMap: pcbTex.bumpMap,
    bumpScale: 0.04,
    metalness: 0.22,
    roughness: 0.44,
  });

  const pcbSide = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x6b6140,
    metalness: 0.12,
    roughness: 0.65,
  });

  const smdCeramic = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x9c7b58,
    metalness: 0.1,
    roughness: 0.36,
  });

  const icEpoxy = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x1d2026,
    metalness: 0.14,
    roughness: 0.48,
  });

  // Polyimide (Kapton amber) high-speed flex PCB
  const polyimideFpc = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xc76414,
    metalness: 0.28,
    roughness: 0.26,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
  });

  const emiShieldFilm = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x242830,
    metalness: 0.55,
    roughness: 0.38,
  });

  // Die-cast magnesium alloy tuned with crisp industrial contrast against pure white background
  const magnesiumCast = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x7c8694,
    metalness: 0.68,
    roughness: 0.42,
  });

  const stainlessMachined = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x98a2b0,
    metalness: 0.88,
    roughness: 0.24,
  });

  const copperCoil = new THREE.MeshStandardMaterial({
    ...common,
    map: coilTex.map,
    bumpMap: coilTex.bumpMap,
    bumpScale: 0.06,
    metalness: 0.88,
    roughness: 0.24,
  });

  const copperHeatSpreader = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xd07447,
    metalness: 0.93,
    roughness: 0.22,
  });

  const neodymiumMagnet = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd8dee6,
    metalness: 0.96,
    roughness: 0.11,
    clearcoat: 0.4,
  });

  const softIronYoke = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x626a75,
    metalness: 0.86,
    roughness: 0.32,
  });

  const siliconNitrideBall = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x232730,
    metalness: 0.28,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  });

  const pyroGraphite = new THREE.MeshPhysicalMaterial({
    ...common,
    map: graphiteTex,
    metalness: 0.72,
    roughness: 0.28,
    clearcoat: 0.25,
    clearcoatRoughness: 0.32,
  });

  const thermalPadTim = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x7aa4b8,
    metalness: 0.04,
    roughness: 0.76,
  });

  // --- Micro Pixel Scale Materials ---
  const microlensGlass = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xdcf0ff,
    metalness: 0.04,
    roughness: 0.04,
    transparent: true,
    opacity: 0.48,
    iridescence: 0.85,
    iridescenceIOR: 1.52,
    iridescenceThicknessRange: [250, 520],
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    depthWrite: false,
  });

  const cfaRed = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xdc3a44,
    metalness: 0.04,
    roughness: 0.12,
    transparent: true,
    opacity: 0.78,
    clearcoat: 0.7,
  });

  const cfaGreen = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x2ca861,
    metalness: 0.04,
    roughness: 0.12,
    transparent: true,
    opacity: 0.78,
    clearcoat: 0.7,
  });

  const cfaBlue = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x2a6ee0,
    metalness: 0.04,
    roughness: 0.12,
    transparent: true,
    opacity: 0.78,
    clearcoat: 0.7,
  });

  const tungstenGrid = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x565d6a,
    metalness: 0.9,
    roughness: 0.28,
  });

  const siliconPhotodiode = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x3b638f,
    metalness: 0.42,
    roughness: 0.2,
    transparent: true,
    opacity: 0.88,
    clearcoat: 0.5,
  });

  const siliconDepletion = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x5c96d6,
    emissive: 0x183d6b,
    emissiveIntensity: 0.22,
    metalness: 0.35,
    roughness: 0.16,
  });

  const ftiOxide = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd4e4f2,
    metalness: 0.12,
    roughness: 0.18,
    transparent: true,
    opacity: 0.82,
  });

  const siliconTransistorLayer = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x4b5568,
    metalness: 0.55,
    roughness: 0.26,
    transparent: true,
    opacity: 0.88,
  });

  const gatePolysilicon = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xd99b38,
    metalness: 0.78,
    roughness: 0.26,
  });

  const memoryNodeShield = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x262a33,
    metalness: 0.88,
    roughness: 0.24,
  });

  const copperHybridBond = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xd87342,
    metalness: 0.95,
    roughness: 0.16,
  });

  const interlayerDielectric = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xdce7f2,
    metalness: 0.05,
    roughness: 0.14,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });

  const dramCellArray = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x2b3648,
    metalness: 0.68,
    roughness: 0.3,
  });

  // --- Shutter Mechanism PBR Materials ---
  const carbonFiberBlade = new THREE.MeshPhysicalMaterial({
    ...common,
    map: carbon1Tex.map,
    bumpMap: carbon1Tex.bumpMap,
    bumpScale: 0.035,
    metalness: 0.28,
    roughness: 0.34,
    clearcoat: 0.25,
    clearcoatRoughness: 0.32,
  });

  const carbonFiberBladeRear = new THREE.MeshPhysicalMaterial({
    ...common,
    map: carbon2Tex.map,
    bumpMap: carbon2Tex.bumpMap,
    bumpScale: 0.035,
    color: 0xcbd5e4,
    metalness: 0.42,
    roughness: 0.32,
    clearcoat: 0.28,
    clearcoatRoughness: 0.3,
  });

  const shutterShieldBlade = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x454f5e,
    metalness: 0.72,
    roughness: 0.36,
  });

  const shutterChassis = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x2a2e37,
    metalness: 0.22,
    roughness: 0.56,
  });

  const midPlateSteel = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x3b424f,
    metalness: 0.78,
    roughness: 0.3,
  });

  const linkArmSteel = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xbac4d1,
    metalness: 0.92,
    roughness: 0.2,
  });

  const brassGear = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xd4a948,
    metalness: 0.9,
    roughness: 0.24,
  });

  const pomGear = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xebe6db,
    metalness: 0.05,
    roughness: 0.38,
  });

  const damperElastomer = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xc44536,
    metalness: 0.04,
    roughness: 0.78,
  });

  const antiVibRubber = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x246eb9,
    metalness: 0.04,
    roughness: 0.76,
  });

  const irLedLens = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xbe123c,
    emissive: 0x9f1239,
    emissiveIntensity: 0.45,
    metalness: 0.05,
    roughness: 0.12,
    clearcoat: 0.9,
  });

  const allMaterials: THREE.Material[] = [
    matteBlackAnodized,
    epdmGasket,
    sswfGlass,
    pztCeramic,
    silverElectrode,
    quartzOlpf,
    quartzEdge,
    irCutGlass,
    coverGlass,
    kovarSeal,
    siliconSensorDie,
    siliconBulk,
    siliconLogicLayer,
    siliconDramLayer,
    goldPlating,
    ceramicAlumina,
    tungstenCopper,
    sensorPcb,
    pcbSide,
    smdCeramic,
    icEpoxy,
    polyimideFpc,
    emiShieldFilm,
    magnesiumCast,
    stainlessMachined,
    copperCoil,
    copperHeatSpreader,
    neodymiumMagnet,
    softIronYoke,
    siliconNitrideBall,
    pyroGraphite,
    thermalPadTim,
    microlensGlass,
    cfaRed,
    cfaGreen,
    cfaBlue,
    tungstenGrid,
    siliconPhotodiode,
    siliconDepletion,
    ftiOxide,
    siliconTransistorLayer,
    gatePolysilicon,
    memoryNodeShield,
    copperHybridBond,
    interlayerDielectric,
    dramCellArray,
    carbonFiberBlade,
    carbonFiberBladeRear,
    shutterShieldBlade,
    shutterChassis,
    midPlateSteel,
    linkArmSteel,
    brassGear,
    pomGear,
    damperElastomer,
    antiVibRubber,
    irLedLens,
  ];

  return {
    clippingPlanes,
    matteBlackAnodized,
    epdmGasket,
    sswfGlass,
    pztCeramic,
    silverElectrode,
    quartzOlpf,
    quartzEdge,
    irCutGlass,
    coverGlass,
    kovarSeal,
    siliconSensorDie,
    siliconBulk,
    siliconLogicLayer,
    siliconDramLayer,
    goldPlating,
    ceramicAlumina,
    tungstenCopper,
    sensorPcb,
    pcbSide,
    smdCeramic,
    icEpoxy,
    polyimideFpc,
    emiShieldFilm,
    magnesiumCast,
    stainlessMachined,
    copperCoil,
    copperHeatSpreader,
    neodymiumMagnet,
    softIronYoke,
    siliconNitrideBall,
    pyroGraphite,
    thermalPadTim,
    microlensGlass,
    cfaRed,
    cfaGreen,
    cfaBlue,
    tungstenGrid,
    siliconPhotodiode,
    siliconDepletion,
    ftiOxide,
    siliconTransistorLayer,
    gatePolysilicon,
    memoryNodeShield,
    copperHybridBond,
    interlayerDielectric,
    dramCellArray,
    carbonFiberBlade,
    carbonFiberBladeRear,
    shutterShieldBlade,
    shutterChassis,
    midPlateSteel,
    linkArmSteel,
    brassGear,
    pomGear,
    damperElastomer,
    antiVibRubber,
    irLedLens,
    allMaterials,
  };
}
