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
  // Mainboard & ISP Engine materials
  ispSiliconDie: THREE.MeshPhysicalMaterial;
  npuSiliconDie: THREE.MeshPhysicalMaterial;
  hdiMainboardPcb: THREE.MeshStandardMaterial;
  pcbEdgeLaminate: THREE.MeshStandardMaterial;
  abfSubstrate: THREE.MeshStandardMaterial;
  emiShieldCan: THREE.MeshStandardMaterial;
  vaporChamberCopper: THREE.MeshPhysicalMaterial;
  thermalPadPink: THREE.MeshStandardMaterial;
  thermalPadBlue: THREE.MeshStandardMaterial;
  ferriteInductor: THREE.MeshStandardMaterial;
  tantalumCapYellow: THREE.MeshStandardMaterial;
  zifIvoryPlastic: THREE.MeshStandardMaterial;
  coaxShieldCopper: THREE.MeshStandardMaterial;
  solderBallSilver: THREE.MeshPhysicalMaterial;
  // EVF Optical & Eye-Tracking materials
  evfEyecupRubber: THREE.MeshStandardMaterial;
  evfAntiFogGlass: THREE.MeshPhysicalMaterial;
  evfDichroicMirror: THREE.MeshPhysicalMaterial;
  evfLensAspheric: THREE.MeshPhysicalMaterial;
  evfLensEd: THREE.MeshPhysicalMaterial;
  evfLensField: THREE.MeshPhysicalMaterial;
  evfGlassEdgeRim: THREE.MeshPhysicalMaterial;
  evfOledActive: THREE.MeshStandardMaterial;
  evfIrEmitter: THREE.MeshPhysicalMaterial;
  evfHousingMg: THREE.MeshPhysicalMaterial;
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

/**
 * Procedural 4nm Main Image Signal Processor (ISP) bare silicon die floorplan.
 * Strictly zero text: pure metallic lithography IP macro blocks (SLVS-EC SerDes,
 * Dual-Stream 16-bit RAW Pipeline, 3D-LUT Color Engine, 8K60p Codec, Multi-Core ARM, SRAM).
 */
function createIspDieFloorplanTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const s = 512;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;

  // Deep metallic obsidian silicon substrate
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, s, s);

  // Outer I/O guard ring & perimeter power distribution mesh
  ctx.strokeStyle = '#d4a948';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, s - 16, s - 16);

  // Helper to draw dense metallic sub-block lithography cells
  const drawMacroBlock = (
    x: number,
    y: number,
    w: number,
    h: number,
    c1: string,
    c2: string,
    pitchX: number,
    pitchY: number
  ) => {
    const g = ctx.createLinearGradient(x, y, x + w, y + h);
    g.addColorStop(0, c1);
    g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
    ctx.lineWidth = 1;
    for (let px = x + pitchX; px < x + w; px += pitchX) {
      ctx.beginPath();
      ctx.moveTo(px, y);
      ctx.lineTo(px, y + h);
      ctx.stroke();
    }
    for (let py = y + pitchY; py < y + h; py += pitchY) {
      ctx.beginPath();
      ctx.moveTo(x, py);
      ctx.lineTo(x + w, py);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(226, 192, 92, 0.72)';
    ctx.lineWidth = 1.6;
    ctx.strokeRect(x, y, w, h);
  };

  // Top band: High-Speed SLVS-EC v3 & LPDDR5X PHY SerDes Lanes
  drawMacroBlock(22, 22, 468, 66, '#0e7490', '#1d4ed8', 14, 16);
  // Left-Mid: Dual-Stream 16-bit Linear RAW ISP Pipeline & Demosaic Engine
  drawMacroBlock(22, 102, 218, 178, '#0f766e', '#115e59', 10, 8);
  // Right-Mid: 8K60p Hardware Video Codec (HEVC / RAW) & 3D-LUT Color Matrix
  drawMacroBlock(254, 102, 236, 178, '#1d4ed8', '#4338ca', 12, 10);
  // Bottom-Left: Multi-Core ARM Cortex Real-Time Control Cluster (8 cores)
  drawMacroBlock(22, 294, 180, 124, '#3730a3', '#6d28d9', 22, 20);
  // Bottom-Center: Ultra-Dense On-Chip L2/L3 SRAM Cache Array
  drawMacroBlock(214, 294, 146, 124, '#b45309', '#d97706', 6, 6);
  // Bottom-Right: PCIe Gen4 x2 NVMe & Dual-Stream EVF Display Controller
  drawMacroBlock(372, 294, 118, 124, '#0369a1', '#0e7490', 10, 12);
  // Bottom perimeter: Analog PLL / High-Speed I/O Ring
  drawMacroBlock(22, 430, 468, 60, '#1e293b', '#334155', 12, 14);

  // Fine copper interconnect bus highways between macro blocks
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.55)';
  ctx.lineWidth = 1.3;
  for (let i = 0; i < 6; i++) {
    const yy = 92 + i * 1.6;
    ctx.beginPath();
    ctx.moveTo(22, yy);
    ctx.lineTo(490, yy);
    ctx.stroke();
    const yy2 = 283 + i * 1.6;
    ctx.beginPath();
    ctx.moveTo(22, yy2);
    ctx.lineTo(490, yy2);
    ctx.stroke();
  }

  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;

  const bumpMap = new THREE.CanvasTexture(c);
  return { map, bumpMap };
}

/**
 * Procedural AI / NPU Deep-Learning Accelerator bare silicon die featuring a crisp
 * 2D Systolic Array MAC PE grid + flanking Weight SRAM banks (zero text).
 */
function createNpuSystolicDieTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const s = 512;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;

  ctx.fillStyle = '#140f2b';
  ctx.fillRect(0, 0, s, s);

  ctx.strokeStyle = '#e2b648';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, s - 16, s - 16);

  // Center-Left 16x16 Systolic Array Processing Element (PE) Matrix Grid!
  const gx0 = 28;
  const gy0 = 28;
  const cell = 19;
  for (let r = 0; r < 16; r++) {
    for (let col = 0; col < 16; col++) {
      const hue = 250 + ((r + col) % 8) * 9;
      ctx.fillStyle = `hsl(${hue}, 74%, ${34 + ((r * col) % 3) * 7}%)`;
      ctx.fillRect(gx0 + col * cell + 1.5, gy0 + r * cell + 1.5, cell - 3, cell - 3);
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.fillRect(gx0 + col * cell + 4, gy0 + r * cell + 4, 4, 4);
    }
  }
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(gx0 - 2, gy0 - 2, 16 * cell + 4, 16 * cell + 4);

  // Right flanking Weight SRAM & Activation FIFO Buffers
  const sramGrad = ctx.createLinearGradient(350, 28, 484, 332);
  sramGrad.addColorStop(0, '#0284c7');
  sramGrad.addColorStop(1, '#0d9488');
  ctx.fillStyle = sramGrad;
  ctx.fillRect(350, 28, 134, 304);
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 1;
  for (let y = 34; y < 330; y += 6) {
    ctx.beginPath();
    ctx.moveTo(350, y);
    ctx.lineTo(484, y);
    ctx.stroke();
  }
  ctx.strokeStyle = '#e2b648';
  ctx.lineWidth = 1.6;
  ctx.strokeRect(350, 28, 134, 304);

  // Bottom Transformer Attention / Vector DSP & High-Speed Die-to-Die Interconnect
  const botGrad = ctx.createLinearGradient(28, 352, 484, 484);
  botGrad.addColorStop(0, '#7c3aed');
  botGrad.addColorStop(0.5, '#2563eb');
  botGrad.addColorStop(1, '#0891b2');
  ctx.fillStyle = botGrad;
  ctx.fillRect(28, 352, 456, 132);
  ctx.strokeStyle = 'rgba(255,255,255,0.24)';
  for (let x = 44; x < 484; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 352);
    ctx.lineTo(x, 484);
    ctx.stroke();
  }
  ctx.strokeStyle = '#e2b648';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(28, 352, 456, 132);

  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const bumpMap = new THREE.CanvasTexture(c);
  return { map, bumpMap };
}

/**
 * Procedural 12-Layer Any-Layer HDI Camera Motherboard PCB texture:
 * Deep emerald solder mask, serpentine 100-ohm SLVS-EC / 85-ohm PCIe differential traces,
 * gold ENIG BGA pads, copper-filled laser microvias, and ground stitching vias (zero text).
 */
function createHdiMotherboardTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const w = 1024;
  const h = 712;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  // Rich flagship dark emerald-teal HDI solder mask
  ctx.fillStyle = '#0e3b2e';
  ctx.fillRect(0, 0, w, h);

  // Subtle buried copper ground pour zones
  ctx.fillStyle = '#124939';
  ctx.fillRect(24, 24, w - 48, h - 48);

  // High-speed 100-ohm differential bus highways (SLVS-EC, LPDDR5X, PCIe Gen4)
  ctx.strokeStyle = '#1d7a5b';
  ctx.lineWidth = 2.2;
  for (let lane = 0; lane < 18; lane++) {
    const y = 76 + lane * 11;
    ctx.beginPath();
    ctx.moveTo(64, y);
    ctx.lineTo(290, y);
    ctx.lineTo(324, y + 18);
    ctx.lineTo(660, y + 18);
    ctx.lineTo(695, y - 6);
    ctx.lineTo(940, y - 6);
    ctx.stroke();
  }

  // Serpentine length-matched meander delay lines (signature high-speed LPDDR5X/SLVS-EC traces)
  ctx.strokeStyle = '#289e74';
  ctx.lineWidth = 2.0;
  for (let m = 0; m < 8; m++) {
    const baseY = 340 + m * 24;
    ctx.beginPath();
    ctx.moveTo(110, baseY);
    for (let sx = 140; sx < 440; sx += 24) {
      ctx.lineTo(sx, baseY);
      ctx.lineTo(sx + 6, baseY - 7);
      ctx.lineTo(sx + 12, baseY - 7);
      ctx.lineTo(sx + 18, baseY + 7);
      ctx.lineTo(sx + 24, baseY);
    }
    ctx.lineTo(860, baseY);
    ctx.stroke();
  }

  // Vertical power/data bus trunks
  ctx.strokeStyle = '#1b6e53';
  ctx.lineWidth = 2;
  for (let vx = 80; vx < w - 80; vx += 26) {
    ctx.beginPath();
    ctx.moveTo(vx, 42);
    ctx.lineTo(vx, h - 42);
    ctx.stroke();
  }

  // Fine gold ENIG laser microvia stitching grids & BGA escape pads
  for (let gy = 54; gy < h - 54; gy += 36) {
    for (let gx = 54; gx < w - 54; gx += 36) {
      if ((gx + gy) % 72 === 0) {
        ctx.fillStyle = '#e0b94f';
        ctx.beginPath();
        ctx.arc(gx, gy, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#09241c';
        ctx.beginPath();
        ctx.arc(gx, gy, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Perimeter EMI ground stitching via ring + gold fiducial pads
  ctx.fillStyle = '#e6c25a';
  for (let px = 32; px < w - 32; px += 18) {
    ctx.beginPath();
    ctx.arc(px, 20, 2.4, 0, Math.PI * 2);
    ctx.arc(px, h - 20, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let py = 32; py < h - 32; py += 18) {
    ctx.beginPath();
    ctx.arc(20, py, 2.4, 0, Math.PI * 2);
    ctx.arc(w - 20, py, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }

  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const bumpMap = new THREE.CanvasTexture(c);
  return { map, bumpMap };
}

/**
 * Procedural 12-layer copper + FR-4 dielectric cross-section striation texture
 * visible along the exposed edge of the HDI motherboard PCB!
 */
function createPcbLaminateEdgeTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#5c5838'; // Low-Df FR-4 prepreg resin
  ctx.fillRect(0, 0, 64, 128);
  // 12 crisp laminated copper foil layers
  ctx.fillStyle = '#d4864b';
  for (let i = 0; i < 12; i++) {
    const y = Math.round(6 + (i / 11) * 112);
    ctx.fillRect(0, y, 64, 3);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

/**
 * Procedural 0.64-inch 9.44M-dot Quad-XGA Tandem Micro-OLED (OLEDoS) viewfinder display texture.
 * STRICTLY ZERO TEXT / ZERO DIGITS: displays a vivid DCI-P3 4,000-nit HDR alpine twilight scene,
 * subtle 3,300+ PPI RGB micro-subpixel structure, geometric framing brackets, rule-of-thirds lines,
 * glowing cyan Eye-Control AF reticle ring, and pure-graphical histogram curve (no letters/numbers).
 */
function createOledViewfinderTexture(): THREE.CanvasTexture {
  const w = 640;
  const h = 480;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  // True-black OLED border (0.000 cd/m² pixel-off state)
  ctx.fillStyle = '#03050a';
  ctx.fillRect(0, 0, w, h);

  // Active 3:2 full-frame live-view viewport inside 4:3 Quad-XGA OLED
  const vx = 24;
  const vy = 42;
  const vw = w - 48;
  const vh = 394;

  // Vivid DCI-P3 HDR golden-hour alpine twilight sky
  const sky = ctx.createLinearGradient(vx, vy, vx, vy + vh * 0.68);
  sky.addColorStop(0.0, '#0a1d4e');
  sky.addColorStop(0.32, '#1d4ed8');
  sky.addColorStop(0.62, '#7c3aed');
  sky.addColorStop(0.84, '#f43f5e');
  sky.addColorStop(1.0, '#fbbf24');
  ctx.fillStyle = sky;
  ctx.fillRect(vx, vy, vw, vh * 0.68);

  // 4,000-nit specular HDR sun bloom
  const sunX = vx + vw * 0.62;
  const sunY = vy + vh * 0.44;
  const sunGlow = ctx.createRadialGradient(sunX, sunY, 6, sunX, sunY, 130);
  sunGlow.addColorStop(0.0, '#ffffff');
  sunGlow.addColorStop(0.18, '#fef08a');
  sunGlow.addColorStop(0.45, 'rgba(251, 146, 60, 0.55)');
  sunGlow.addColorStop(1.0, 'rgba(244, 63, 94, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(vx, vy, vw, vh * 0.72);

  // Mirror lake reflection (bottom 32%)
  const lakeY = vy + vh * 0.68;
  const lakeH = vh * 0.32;
  const lake = ctx.createLinearGradient(vx, lakeY, vx, lakeY + lakeH);
  lake.addColorStop(0.0, '#fb923c');
  lake.addColorStop(0.35, '#4338ca');
  lake.addColorStop(1.0, '#091124');
  ctx.fillStyle = lake;
  ctx.fillRect(vx, lakeY, vw, lakeH);

  // Crisp layered alpine mountain silhouettes
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(vx, lakeY);
  ctx.lineTo(vx + vw * 0.14, vy + vh * 0.48);
  ctx.lineTo(vx + vw * 0.28, vy + vh * 0.56);
  ctx.lineTo(vx + vw * 0.46, vy + vh * 0.34);
  ctx.lineTo(vx + vw * 0.60, vy + vh * 0.52);
  ctx.lineTo(vx + vw * 0.79, vy + vh * 0.38);
  ctx.lineTo(vx + vw * 0.92, vy + vh * 0.50);
  ctx.lineTo(vx + vw, vy + vh * 0.46);
  ctx.lineTo(vx + vw, lakeY);
  ctx.closePath();
  ctx.fill();

  // Foreground dark ridge silhouette
  ctx.fillStyle = '#0b1020';
  ctx.beginPath();
  ctx.moveTo(vx, lakeY);
  ctx.lineTo(vx + vw * 0.22, vy + vh * 0.56);
  ctx.lineTo(vx + vw * 0.40, vy + vh * 0.62);
  ctx.lineTo(vx + vw * 0.68, vy + vh * 0.54);
  ctx.lineTo(vx + vw * 0.88, vy + vh * 0.60);
  ctx.lineTo(vx + vw, vy + vh * 0.57);
  ctx.lineTo(vx + vw, lakeY);
  ctx.closePath();
  ctx.fill();

  // Horizontal golden specular water shimmer streaks
  ctx.fillStyle = 'rgba(254, 240, 138, 0.42)';
  for (let i = 0; i < 9; i++) {
    const wy = lakeY + 8 + i * 11;
    const ww = 92 - i * 7;
    ctx.fillRect(sunX - ww * 0.5 + Math.sin(i * 1.9) * 8, wy, ww, 2.5);
  }

  // Subtle rule-of-thirds composition hairlines (pure geometry, zero text)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 2; i++) {
    const gx = vx + (vw / 3) * i;
    ctx.beginPath();
    ctx.moveTo(gx, vy);
    ctx.lineTo(gx, vy + vh);
    ctx.stroke();

    const gy = vy + (vh / 3) * i;
    ctx.beginPath();
    ctx.moveTo(vx, gy);
    ctx.lineTo(vx + vw, gy);
    ctx.stroke();
  }

  // Crisp white 4-corner frame crop brackets
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
  ctx.lineWidth = 2.4;
  const br = 20;
  const corners = [
    [vx + 10, vy + 10, 1, 1],
    [vx + vw - 10, vy + 10, -1, 1],
    [vx + 10, vy + vh - 10, 1, -1],
    [vx + vw - 10, vy + vh - 10, -1, -1],
  ];
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * br);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * br, cy);
    ctx.stroke();
  }

  // Electronic Horizon Level Indicator (center pitch bar — zero numbers)
  const midX = vx + vw * 0.5;
  const midY = vy + vh * 0.5;
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(midX - 52, midY);
  ctx.lineTo(midX - 18, midY);
  ctx.moveTo(midX + 18, midY);
  ctx.lineTo(midX + 52, midY);
  ctx.stroke();

  // Glowing Cyan-Emerald Eye-Control AF Gaze Reticle locked onto main peak
  const afX = vx + vw * 0.46;
  const afY = vy + vh * 0.36;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.arc(afX, afY, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 1.6;
  ctx.strokeRect(afX - 30, afY - 22, 60, 44);
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(afX, afY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Pure-graphical live-view luminance histogram curve in bottom-right black bar (ZERO text/digits)
  const hx = vx + vw - 110;
  const hy = h - 34;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.fillRect(hx, hy, 102, 24);
  ctx.fillStyle = 'rgba(226, 232, 240, 0.85)';
  ctx.beginPath();
  ctx.moveTo(hx + 2, hy + 22);
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const amp =
      Math.exp(-Math.pow((t - 0.32) / 0.18, 2)) * 16 +
      Math.exp(-Math.pow((t - 0.72) / 0.14, 2)) * 13;
    ctx.lineTo(hx + 2 + t * 98, hy + 22 - amp);
  }
  ctx.lineTo(hx + 100, hy + 22);
  ctx.closePath();
  ctx.fill();

  // Pure-graphical exposure meter tick dots in bottom-center black bar (ZERO numbers)
  for (let i = -4; i <= 4; i++) {
    ctx.fillStyle = i === 0 ? '#34d399' : 'rgba(226, 232, 240, 0.55)';
    const r = i === 0 ? 3.5 : 2.0;
    ctx.beginPath();
    ctx.arc(w * 0.5 + i * 16, h - 22, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Subtle RGB Micro-OLED subpixel stripe grid shimmer
  ctx.fillStyle = 'rgba(255, 255, 255, 0.045)';
  for (let x = vx; x < vx + vw; x += 4) {
    ctx.fillRect(x, vy, 1, vh);
  }
  for (let y = vy; y < vy + vh; y += 4) {
    ctx.fillRect(vx, y, vw, 1);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function createMaterialLibrary(clippingPlanes: THREE.Plane[]): MaterialLibrary {
  const dieTex = createSensorDieTexture();
  const pcbTex = createPcbTexture();
  const coilTex = createCopperCoilTexture();
  const graphiteTex = createGraphiteTexture();
  const carbon1Tex = createCarbonFiberTexture('#1d2128');
  const carbon2Tex = createCarbonFiberTexture('#262d38');
  const ispDieTex = createIspDieFloorplanTexture();
  const npuDieTex = createNpuSystolicDieTexture();
  const hdiPcbTex = createHdiMotherboardTexture();
  const pcbEdgeTex = createPcbLaminateEdgeTexture();
  const oledViewfinderTex = createOledViewfinderTexture();

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

  // --- Mainboard & ISP Engine PBR Materials ---
  const ispSiliconDie = new THREE.MeshPhysicalMaterial({
    ...common,
    map: ispDieTex.map,
    emissiveMap: ispDieTex.map,
    emissive: 0xffffff,
    emissiveIntensity: 0.24,
    bumpMap: ispDieTex.bumpMap,
    bumpScale: 0.03,
    metalness: 0.62,
    roughness: 0.2,
    iridescence: 0.95,
    iridescenceIOR: 2.0,
    iridescenceThicknessRange: [280, 620],
    clearcoat: 0.45,
    clearcoatRoughness: 0.12,
  });

  const npuSiliconDie = new THREE.MeshPhysicalMaterial({
    ...common,
    map: npuDieTex.map,
    emissiveMap: npuDieTex.map,
    emissive: 0xffffff,
    emissiveIntensity: 0.28,
    bumpMap: npuDieTex.bumpMap,
    bumpScale: 0.03,
    metalness: 0.58,
    roughness: 0.22,
    iridescence: 1.0,
    iridescenceIOR: 2.1,
    iridescenceThicknessRange: [320, 680],
    clearcoat: 0.48,
    clearcoatRoughness: 0.12,
  });

  const hdiMainboardPcb = new THREE.MeshStandardMaterial({
    ...common,
    map: hdiPcbTex.map,
    bumpMap: hdiPcbTex.bumpMap,
    bumpScale: 0.04,
    metalness: 0.24,
    roughness: 0.42,
  });

  const pcbEdgeLaminate = new THREE.MeshStandardMaterial({
    ...common,
    map: pcbEdgeTex,
    metalness: 0.36,
    roughness: 0.52,
  });

  const abfSubstrate = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x164a41,
    metalness: 0.22,
    roughness: 0.44,
  });

  const emiShieldCan = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xc2cbd6,
    metalness: 0.92,
    roughness: 0.22,
  });

  const vaporChamberCopper = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd97d4e,
    metalness: 0.94,
    roughness: 0.2,
    clearcoat: 0.2,
    clearcoatRoughness: 0.24,
  });

  const thermalPadPink = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xe8798e,
    metalness: 0.02,
    roughness: 0.82,
  });

  const thermalPadBlue = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x62a8d8,
    metalness: 0.02,
    roughness: 0.8,
  });

  const ferriteInductor = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x3a3f4a,
    metalness: 0.32,
    roughness: 0.62,
  });

  const tantalumCapYellow = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xe3a82b,
    metalness: 0.06,
    roughness: 0.42,
  });

  const zifIvoryPlastic = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xece7dc,
    metalness: 0.04,
    roughness: 0.46,
  });

  const coaxShieldCopper = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xd27a44,
    metalness: 0.9,
    roughness: 0.24,
  });

  const solderBallSilver = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd9e0e8,
    metalness: 0.96,
    roughness: 0.14,
    clearcoat: 0.35,
  });

  // -------------------------------------------------------------------------
  // EVF Optical & Eye-Tracking Materials (crisp optical readability on #FFFFFF)
  // -------------------------------------------------------------------------
  const evfEyecupRubber = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x262930,
    metalness: 0.04,
    roughness: 0.86,
  });

  const evfAntiFogGlass = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x6ec3f0,
    metalness: 0.0,
    roughness: 0.05,
    opacity: 0.24,
    iridescence: 0.82,
    iridescenceIOR: 1.44,
    iridescenceThicknessRange: [240, 420],
    clearcoat: 0.4,
  });

  // 45-degree multi-layer dielectric Dichroic Hot Mirror (magenta-gold IR reflection sheen!)
  const evfDichroicMirror = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0xd9569c,
    metalness: 0.08,
    roughness: 0.04,
    opacity: 0.36,
    iridescence: 1.0,
    iridescenceIOR: 1.72,
    iridescenceThicknessRange: [340, 620],
    clearcoat: 0.55,
  });

  // Rear Large-Aperture Double-Sided Aspheric Eyepiece Glass (ZEISS T* emerald-cyan sheen)
  const evfLensAspheric = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x38bdf8,
    metalness: 0.0,
    roughness: 0.04,
    opacity: 0.30,
    iridescence: 0.9,
    iridescenceIOR: 1.56,
    iridescenceThicknessRange: [280, 520],
    clearcoat: 0.45,
  });

  // Movable Diopter ED Low-Dispersion + High-Index Lanthanum Cemented Doublet (emerald-teal optical flint/crown)
  const evfLensEd = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x10b981,
    metalness: 0.0,
    roughness: 0.04,
    opacity: 0.32,
    iridescence: 0.92,
    iridescenceIOR: 1.62,
    iridescenceThicknessRange: [300, 540],
    clearcoat: 0.48,
  });

  // Front Aspheric Field-Flattener Condenser Lens (cobalt-indigo optical glass)
  const evfLensField = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x6366f1,
    metalness: 0.0,
    roughness: 0.05,
    opacity: 0.30,
    iridescence: 0.88,
    iridescenceIOR: 1.52,
    iridescenceThicknessRange: [260, 480],
    clearcoat: 0.42,
  });

  // Polished frosted ground-glass outer bevel rim for razor-sharp optical silhouettes on white
  const evfGlassEdgeRim = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x76b8db,
    metalness: 0.04,
    roughness: 0.28,
    transparent: true,
    opacity: 0.72,
  });

  // Self-luminous 4,000-nit DCI-P3 0.64-inch Tandem Micro-OLED active surface (strictly zero text)
  const evfOledActive = new THREE.MeshStandardMaterial({
    ...common,
    map: oledViewfinderTex,
    emissive: 0xffffff,
    emissiveMap: oledViewfinderTex,
    emissiveIntensity: 0.72,
    metalness: 0.08,
    roughness: 0.14,
  });

  // 850nm Near-Infrared Illumination Emitter Dome (deep ruby optical resin)
  const evfIrEmitter = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xbe123c,
    emissive: 0xe11d48,
    emissiveIntensity: 0.55,
    metalness: 0.08,
    roughness: 0.12,
    clearcoat: 0.75,
  });

  // Weather-sealed magnesium-aluminum EVF optical housing shell (distinct cool slate gunmetal)
  const evfHousingMg = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x4b5563,
    metalness: 0.68,
    roughness: 0.36,
    clearcoat: 0.14,
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
    ispSiliconDie,
    npuSiliconDie,
    hdiMainboardPcb,
    pcbEdgeLaminate,
    abfSubstrate,
    emiShieldCan,
    vaporChamberCopper,
    thermalPadPink,
    thermalPadBlue,
    ferriteInductor,
    tantalumCapYellow,
    zifIvoryPlastic,
    coaxShieldCopper,
    solderBallSilver,
    evfEyecupRubber,
    evfAntiFogGlass,
    evfDichroicMirror,
    evfLensAspheric,
    evfLensEd,
    evfLensField,
    evfGlassEdgeRim,
    evfOledActive,
    evfIrEmitter,
    evfHousingMg,
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
    ispSiliconDie,
    npuSiliconDie,
    hdiMainboardPcb,
    pcbEdgeLaminate,
    abfSubstrate,
    emiShieldCan,
    vaporChamberCopper,
    thermalPadPink,
    thermalPadBlue,
    ferriteInductor,
    tantalumCapYellow,
    zifIvoryPlastic,
    coaxShieldCopper,
    solderBallSilver,
    evfEyecupRubber,
    evfAntiFogGlass,
    evfDichroicMirror,
    evfLensAspheric,
    evfLensEd,
    evfLensField,
    evfGlassEdgeRim,
    evfOledActive,
    evfIrEmitter,
    evfHousingMg,
    allMaterials,
  };
}
