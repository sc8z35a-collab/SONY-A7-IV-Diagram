import * as THREE from 'three';
import { GPU_PROFILE, optimizeMaterialsForGpu } from './GpuOptimizer';

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
  // Large-Diameter Lens Mount materials
  mountStainlessFlange: THREE.MeshPhysicalMaterial;
  mountSpringSteel: THREE.MeshStandardMaterial;
  mountRedIndexDot: THREE.MeshPhysicalMaterial;
  mountVelvetBaffle: THREE.MeshStandardMaterial;
  mountShimBlue: THREE.MeshStandardMaterial;
  mountPpsInsulator: THREE.MeshStandardMaterial;
  mountMgBulkhead: THREE.MeshPhysicalMaterial;
  mountThreadLockBlue: THREE.MeshStandardMaterial;
  // 50mm F1.2 Lens, 4-Axis LCD & Complete Body Materials
  lensXaGlass: THREE.MeshPhysicalMaterial;
  lensEdGlass: THREE.MeshPhysicalMaterial;
  lensBarrelAnodized: THREE.MeshPhysicalMaterial;
  lensRubberGrip: THREE.MeshStandardMaterial;
  lensAccentRing: THREE.MeshPhysicalMaterial;
  lensFoamSeal: THREE.MeshStandardMaterial;
  lensPermalloyShield: THREE.MeshPhysicalMaterial;
  lcdCoverGlass: THREE.MeshPhysicalMaterial;
  lcdLiveViewActive: THREE.MeshStandardMaterial;
  lcdBacklightPrism: THREE.MeshPhysicalMaterial;
  bodyMgShell: THREE.MeshPhysicalMaterial;
  bodyLeatherette: THREE.MeshStandardMaterial;
  bodyBatteryShell: THREE.MeshPhysicalMaterial;
  bodyBatteryCell: THREE.MeshPhysicalMaterial;
  bodyTopSubOled: THREE.MeshStandardMaterial;
  bodyRecRed: THREE.MeshPhysicalMaterial;
  // Phase 11 Ultra-HD Watchmaker Materials (Micro-Surface PBR & Optical/Semiconductor Stacks)
  beCuSpring: THREE.MeshPhysicalMaterial;
  titaniumRivet: THREE.MeshPhysicalMaterial;
  invarScaleBar: THREE.MeshPhysicalMaterial;
  lcdPolarizerFilm: THREE.MeshPhysicalMaterial;
  evfMlaGlass: THREE.MeshPhysicalMaterial;
  sinteredSilver: THREE.MeshPhysicalMaterial;
  siliconTsvDram: THREE.MeshPhysicalMaterial;
  thermalTransferTape: THREE.MeshPhysicalMaterial;
  velvetFlockTrap: THREE.MeshStandardMaterial;
  // Phase 12 Ultra-HD 320-Part Materials
  vaporWickCopper: THREE.MeshPhysicalMaterial;
  rfGoldCoax: THREE.MeshPhysicalMaterial;
  loficDielectric: THREE.MeshPhysicalMaterial;
  tungstenLightShield: THREE.MeshPhysicalMaterial;
  // Phase 13 Standalone Ultra-Micro Materials
  cinnabarAnodized: THREE.MeshPhysicalMaterial;
  butylDamperRubber: THREE.MeshStandardMaterial;
  mylarInsulatorFilm: THREE.MeshPhysicalMaterial;
  pureIronArmature: THREE.MeshPhysicalMaterial;
  // Phase 14 Sensor & Nano-Pixel Materials
  opticalCementClear: THREE.MeshPhysicalMaterial;
  dustCatcherGel: THREE.MeshPhysicalMaterial;
  aluminaHighKFilm: THREE.MeshPhysicalMaterial;
  taNBarrierLiner: THREE.MeshPhysicalMaterial;
  // Phase 15 Rear LCD Monitor Optical Film Materials
  lcdOcaFilm: THREE.MeshPhysicalMaterial;
  lcdDiffuserMatte: THREE.MeshPhysicalMaterial;
  lcdDbefIridescent: THREE.MeshPhysicalMaterial;
  // Phase 16 Vapor Chamber, EVF & Body Deep-Audit Materials
  vcWorkingFluidCyan: THREE.MeshPhysicalMaterial;
  vcCopperMeshWick: THREE.MeshPhysicalMaterial;
  evfIrWindowBlack: THREE.MeshPhysicalMaterial;
  conductiveNiCuFoam: THREE.MeshStandardMaterial;
  // Phase 17 Mechanical Shutter & Surroundings Deep-Audit Materials
  aramidKevlarWeave: THREE.MeshPhysicalMaterial;
  oilTrapPorousPad: THREE.MeshStandardMaterial;
  varistorRingBlue: THREE.MeshPhysicalMaterial;
  // Phase 18 50mm F1.2 GM Lens & Mount Ultra-Anatomy Materials
  fluorineCoatCyan: THREE.MeshPhysicalMaterial;
  nanoArIridescent: THREE.MeshPhysicalMaterial;
  sinteredBronzeBushing: THREE.MeshPhysicalMaterial;
  // Phase 19 3-Section GM Lens & Deep-Audit Micro Materials
  thermalPuttyPink: THREE.MeshStandardMaterial;
  gMasterRedBadge: THREE.MeshPhysicalMaterial;
  makeupSealViolet: THREE.MeshPhysicalMaterial;
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

/**
 * Procedural fine pebble-grain elastomer camera grip leatherette texture (strictly zero text).
 */
function createLeatheretteTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;

  ctx.fillStyle = '#1b1d22';
  ctx.fillRect(0, 0, s, s);

  // Deterministic pseudo-random leatherette pebble micro-relief
  let seed = 4219;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 950; i++) {
    const x = rand() * s;
    const y = rand() * s;
    const r = 1.6 + rand() * 3.1;
    const shade = Math.floor(32 + rand() * 24);
    ctx.fillStyle = `rgb(${shade},${shade + 1},${shade + 4})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(3, 3);

  const bumpMap = new THREE.CanvasTexture(c);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(3, 3);
  return { map, bumpMap };
}

/**
 * Procedural monochrome top-deck sub-status OLED texture:
 * STRICTLY ZERO TEXT / ZERO NUMBERS — displays pure geometric battery bars,
 * aperture circle pictogram, exposure meter dots, and wireless signal arcs.
 */
function createTopStatusOledTexture(): THREE.CanvasTexture {
  const w = 256;
  const h = 160;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  ctx.fillStyle = '#070a10';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.strokeRect(8, 8, w - 16, h - 16);

  // Pure geometric battery icon (top-right, 4 charge bars)
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 3;
  ctx.strokeRect(178, 22, 54, 24);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(232, 28, 6, 12);
  ctx.fillStyle = '#34d399';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(184 + i * 11, 27, 8, 14);
  }

  // Pure geometric aperture blades icon (top-left)
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.arc(44, 46, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(44, 46, 8, 0, Math.PI * 2);
  ctx.stroke();

  // Pure geometric signal strength bars (center-top)
  ctx.fillStyle = '#38bdf8';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(92 + i * 13, 56 - i * 7, 8, 12 + i * 7);
  }

  // Pure geometric exposure scale dot bar (bottom)
  for (let i = -5; i <= 5; i++) {
    ctx.fillStyle = i === 0 ? '#34d399' : '#94a3b8';
    ctx.beginPath();
    ctx.arc(w / 2 + i * 18, 118, i === 0 ? 5.5 : 3.0, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Procedural CNC lathe radial/linear brushed stainless steel micro-groove bump map */
function createCncBrushedMetalTexture(): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, s, s);
  for (let y = 0; y < s; y += 2) {
    const shade = 112 + ((y * 53) % 32);
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    ctx.fillRect(0, y, s, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 6);
  return tex;
}

/** Procedural bead-blasted thixomolded AZ91D magnesium micro-grain bump texture */
function createMagnesiumGrainTexture(): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(s, s);
  let seed = 1337;
  for (let i = 0; i < img.data.length; i += 4) {
    seed = (seed * 16807) % 2147483647;
    const v = 108 + (seed % 40);
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  return tex;
}

/** Procedural 200um-pitch SmFeN multi-pole Vernier magnetic scale bar texture (zero text) */
function createMagneticScaleTexture(): THREE.CanvasTexture {
  const w = 128;
  const h = 512;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#1e2430';
  ctx.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y += 8) {
    ctx.fillStyle = (y / 8) % 2 === 0 ? '#475569' : '#0f172a';
    ctx.fillRect(10, y, w - 20, 4);
    ctx.fillStyle = (y / 8) % 2 === 0 ? '#38bdf8' : '#f59e0b';
    ctx.fillRect(10, y + 4, 18, 2);
  }
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, w - 4, h - 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 3);
  return tex;
}

/** Procedural crossed polarizer + RGB wide-gamut color-filter optical micro-lattice */
function createPolarizerLatticeTexture(): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#101828';
  ctx.fillRect(0, 0, s, s);
  const colors = ['rgba(239,68,68,0.42)', 'rgba(34,197,94,0.42)', 'rgba(59,130,246,0.42)'];
  for (let x = 0; x < s; x += 6) {
    ctx.fillStyle = colors[(x / 6) % 3];
    ctx.fillRect(x, 0, 4, s);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  for (let i = -s; i < s * 2; i += 12) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + s, s);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 3);
  return tex;
}

/** Procedural hexagonal On-Chip Micro-Lens Array (MLA) light-extraction optical cap texture */
function createHexMlaTexture(): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(0, 0, s, s);
  const step = 16;
  for (let r = 0; r < s / step + 2; r++) {
    for (let col = 0; col < s / step + 2; col++) {
      const cx = col * step + (r % 2 === 0 ? 0 : step * 0.5);
      const cy = r * step * 0.866;
      const g = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, step * 0.48);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.55, '#7dd3fc');
      g.addColorStop(1, '#0284c7');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, step * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 3);
  return tex;
}

/** Procedural 3rd-Wafer Stacked DRAM & TSV Micro-Bump Lithography Texture (zero text) */
function createTsvDramTexture(): THREE.CanvasTexture {
  const s = 512;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0c1629';
  ctx.fillRect(0, 0, s, s);
  // 8 high-speed DRAM memory banks separated by copper TSV power/data spines
  for (let bx = 0; bx < 4; bx++) {
    for (let by = 0; by < 2; by++) {
      const x0 = 20 + bx * 120;
      const y0 = 24 + by * 236;
      const grad = ctx.createLinearGradient(x0, y0, x0 + 106, y0 + 218);
      grad.addColorStop(0, '#1e3a5f');
      grad.addColorStop(0.5, '#0f4c75');
      grad.addColorStop(1, '#1b262c');
      ctx.fillStyle = grad;
      ctx.fillRect(x0, y0, 106, 218);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1;
      for (let ly = y0 + 8; ly < y0 + 214; ly += 8) {
        ctx.beginPath();
        ctx.moveTo(x0 + 4, ly);
        ctx.lineTo(x0 + 102, ly);
        ctx.stroke();
      }
      ctx.strokeStyle = '#d97736';
      ctx.lineWidth = 2;
      ctx.strokeRect(x0, y0, 106, 218);
    }
  }
  // Central horizontal copper TSV via spine
  ctx.fillStyle = '#e6b85c';
  for (let vx = 24; vx < s - 24; vx += 14) {
    ctx.beginPath();
    ctx.arc(vx, s / 2, 3.2, 0, Math.PI * 2);
    ctx.fill();
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
  const leatherTex = createLeatheretteTexture();
  const topOledTex = createTopStatusOledTexture();
  const cncBrushedTex = createCncBrushedMetalTexture();
  const mgGrainTex = createMagnesiumGrainTexture();
  const magScaleTex = createMagneticScaleTexture();
  const polarizerTex = createPolarizerLatticeTexture();
  const hexMlaTex = createHexMlaTexture();
  const tsvDramTex = createTsvDramTexture();

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

  // Weather-sealed magnesium-aluminum EVF optical housing shell (distinct cool slate gunmetal with bead-blast micro-grain)
  const evfHousingMg = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x4b5563,
    bumpMap: mgGrainTex,
    bumpScale: 0.035,
    metalness: 0.68,
    roughness: 0.36,
    clearcoat: 0.14,
  });

  // -------------------------------------------------------------------------
  // Large-Diameter Mirrorless Lens Mount Materials
  // -------------------------------------------------------------------------
  // CNC mirror-lapped hardened stainless steel (SUS420J2 / hard-chrome bayonet flange with fine CNC sheen)
  const mountStainlessFlange = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd8dee6,
    bumpMap: cncBrushedTex,
    bumpScale: 0.018,
    metalness: 0.94,
    roughness: 0.16,
    clearcoat: 0.44,
    clearcoatRoughness: 0.11,
  });

  // Tempered phosphor-bronze / beryllium-copper bayonet clamping leaf spring
  const mountSpringSteel = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xc98a3c,
    bumpMap: cncBrushedTex,
    bumpScale: 0.016,
    metalness: 0.86,
    roughness: 0.28,
  });

  // Iconic red anodized circular lens alignment index dot (strictly zero text)
  const mountRedIndexDot = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xdc2626,
    metalness: 0.18,
    roughness: 0.22,
    clearcoat: 0.72,
  });

  // Ultra-low-reflectance optical light-trap velvet matte black (rho < 0.8%)
  const mountVelvetBaffle = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x15171c,
    metalness: 0.08,
    roughness: 0.96,
  });

  // Factory color-coded 0.05 mm precision calibration shim foil (cobalt blue)
  const mountShimBlue = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x2563eb,
    metalness: 0.72,
    roughness: 0.32,
  });

  // Glass-fiber reinforced PPS precision pogo-pin insulator block
  const mountPpsInsulator = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x272a33,
    metalness: 0.08,
    roughness: 0.62,
  });

  // Thixomolded AZ91D magnesium-aluminum structural front bulkhead (bead-blasted cast texture)
  const mountMgBulkhead = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x5c6675,
    bumpMap: mgGrainTex,
    bumpScale: 0.045,
    metalness: 0.72,
    roughness: 0.42,
    clearcoat: 0.1,
  });

  // Blue anaerobic vibration-proof thread-locker coating on mount bolts
  const mountThreadLockBlue = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x0284c7,
    metalness: 0.12,
    roughness: 0.56,
  });

  // -------------------------------------------------------------------------
  // 50mm F1.2 Prime Lens, 4-Axis Multi-Angle LCD & Complete Camera Body Materials
  // -------------------------------------------------------------------------
  // Nano AR II + Fluorine coated XA (Extreme Aspherical 0.01um) high-index glass
  const lensXaGlass = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x5cc4f5,
    metalness: 0.0,
    roughness: 0.03,
    opacity: 0.27,
    iridescence: 0.96,
    iridescenceIOR: 1.58,
    iridescenceThicknessRange: [260, 520],
    clearcoat: 0.52,
  });

  // Super ED (Extra-Low Dispersion) fluorite-class optical glass
  const lensEdGlass = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x10b981,
    metalness: 0.0,
    roughness: 0.035,
    opacity: 0.29,
    iridescence: 0.92,
    iridescenceIOR: 1.62,
    iridescenceThicknessRange: [300, 560],
    clearcoat: 0.48,
  });

  // Satin matte-black anodized aluminum/magnesium flagship lens barrel
  const lensBarrelAnodized = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x282d36,
    metalness: 0.62,
    roughness: 0.38,
    clearcoat: 0.16,
  });

  // Deep vulcanized EPDM tactile focus/control ring rubber
  const lensRubberGrip = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x1b1f26,
    metalness: 0.05,
    roughness: 0.92,
  });

  // Flagship signature metallic anodized lens identity band
  const lensAccentRing = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd97706,
    metalness: 0.88,
    roughness: 0.22,
    clearcoat: 0.45,
  });

  // Closed-cell micro-porous EPDM/urethane weather-sealing foam gasket
  const lensFoamSeal = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x262932,
    metalness: 0.02,
    roughness: 0.96,
  });

  // High-permeability Ni-Fe Mu-metal / Permalloy magnetic flux & EMI shield
  const lensPermalloyShield = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x526072,
    metalness: 0.88,
    roughness: 0.25,
    clearcoat: 0.22,
  });

  // OCA optically bonded tempered aluminosilicate PCAP touch cover glass
  const lcdCoverGlass = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0xdbeafe,
    metalness: 0.0,
    roughness: 0.04,
    opacity: 0.16,
    iridescence: 0.65,
    iridescenceIOR: 1.51,
    iridescenceThicknessRange: [240, 420],
    clearcoat: 0.65,
  });

  // High-brightness 2.1M-dot 3.2-inch IPS live-view active display (strictly zero text)
  const lcdLiveViewActive = new THREE.MeshStandardMaterial({
    ...common,
    map: oledViewfinderTex,
    emissive: 0xffffff,
    emissiveMap: oledViewfinderTex,
    emissiveIntensity: 0.64,
    metalness: 0.06,
    roughness: 0.16,
  });

  // Dual BEF micro-prism luminance-collimating backlight stack
  const lcdBacklightPrism = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xf1f5f9,
    emissive: 0xbae6fd,
    emissiveIntensity: 0.42,
    metalness: 0.16,
    roughness: 0.18,
    iridescence: 0.72,
    iridescenceIOR: 1.56,
  });

  // Thixomolded AZ91D magnesium-aluminum flagship monocoque body shell
  const bodyMgShell = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x2c323d,
    bumpMap: mgGrainTex,
    bumpScale: 0.06,
    metalness: 0.66,
    roughness: 0.39,
    clearcoat: 0.15,
  });

  // Ergonomic pebble-grained elastomer leatherette grip skin
  const bodyLeatherette = new THREE.MeshStandardMaterial({
    ...common,
    map: leatherTex.map,
    bumpMap: leatherTex.bumpMap,
    bumpScale: 0.22,
    metalness: 0.06,
    roughness: 0.86,
  });

  // Flame-retardant PC/ABS sealed dual-cell battery housing shell
  const bodyBatteryShell = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x313846,
    metalness: 0.14,
    roughness: 0.46,
    clearcoat: 0.18,
  });

  // High-discharge 6.0A Li-Ion 18650 cell with cobalt-blue PVC heat-shrink wrap
  const bodyBatteryCell = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x0284c7,
    metalness: 0.26,
    roughness: 0.28,
    clearcoat: 0.42,
  });

  // High-contrast top-deck graphical status sub-OLED (strictly zero text/digits)
  const bodyTopSubOled = new THREE.MeshStandardMaterial({
    ...common,
    map: topOledTex,
    emissive: 0xffffff,
    emissiveMap: topOledTex,
    emissiveIntensity: 0.75,
    metalness: 0.08,
    roughness: 0.14,
  });

  // Anodized crimson movie REC button & signature lock index accent
  const bodyRecRed = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xdc2626,
    metalness: 0.24,
    roughness: 0.22,
    clearcoat: 0.72,
  });

  // ── Phase 11 Ultra-HD Watchmaker Materials ──────────────────────────────────
  // Beryllium-copper (CuBe2) high-elasticity ESD ground fingers & contact springs
  const beCuSpring = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd89143,
    bumpMap: cncBrushedTex,
    bumpScale: 0.025,
    metalness: 0.90,
    roughness: 0.22,
    clearcoat: 0.22,
  });

  // Machined Ti-6Al-4V micro-rivets, helicoil inserts & reinforcing steel/Ti pins
  const titaniumRivet = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xaab4c0,
    bumpMap: cncBrushedTex,
    bumpScale: 0.03,
    metalness: 0.93,
    roughness: 0.19,
    clearcoat: 0.18,
  });

  // SmFeN high-coercivity magnetic Vernier scale strip on Invar zero-CTE backing
  const invarScaleBar = new THREE.MeshPhysicalMaterial({
    ...common,
    map: magScaleTex,
    metalness: 0.44,
    roughness: 0.26,
    clearcoat: 0.45,
  });

  // Crossed-polarizer / TAC / quarter-wave retarder optical film stack
  const lcdPolarizerFilm = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    map: polarizerTex,
    color: 0x3b6796,
    metalness: 0.06,
    roughness: 0.10,
    opacity: 0.34,
    iridescence: 0.88,
    iridescenceIOR: 1.54,
    iridescenceThicknessRange: [260, 520],
    clearcoat: 0.60,
  });

  // Hexagonal Micro-Lens Array (MLA) + Thin-Film Encapsulation cap for high-nit Micro-OLED
  const evfMlaGlass = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    map: hexMlaTex,
    color: 0x8ad6f5,
    metalness: 0.02,
    roughness: 0.06,
    opacity: 0.30,
    iridescence: 0.94,
    iridescenceIOR: 1.52,
    iridescenceThicknessRange: [280, 540],
    clearcoat: 0.72,
  });

  // Pressure-sintered nano-silver die-attach & thermal interface alloy (220 W/m·K)
  const sinteredSilver = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd8e0ea,
    metalness: 0.96,
    roughness: 0.20,
    clearcoat: 0.24,
  });

  // 3rd-wafer stacked LPDDR/DRAM silicon die with copper TSV via spine
  const siliconTsvDram = new THREE.MeshPhysicalMaterial({
    ...common,
    map: tsvDramTex,
    metalness: 0.64,
    roughness: 0.24,
    clearcoat: 0.36,
    iridescence: 0.35,
    iridescenceIOR: 1.65,
  });

  // Copper-laminated graphite thermal-transfer bridge tape (chassis-to-sensor heatsink)
  const thermalTransferTape = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x3a4350,
    map: graphiteTex,
    bumpMap: graphiteTex,
    bumpScale: 0.06,
    metalness: 0.58,
    roughness: 0.32,
    clearcoat: 0.28,
  });

  // Ultra-black flocked velvet / carbon-nanotube stray-light trap (reflectance < 0.1%)
  const velvetFlockTrap = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x0b0d10,
    bumpMap: mgGrainTex,
    bumpScale: 0.14,
    metalness: 0.01,
    roughness: 0.98,
  });

  // Phase 12: Sintered porous micro-copper capillary wick inside two-phase vapor chamber
  const vaporWickCopper = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xc86432,
    bumpMap: mgGrainTex,
    bumpScale: 0.16,
    metalness: 0.86,
    roughness: 0.44,
    clearcoat: 0.15,
  });

  // Phase 12: Gold-braided micro-coaxial RF antenna cable & EMI shielding jacket
  const rfGoldCoax = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd4a437,
    bumpMap: cncBrushedTex,
    bumpScale: 0.08,
    metalness: 0.92,
    roughness: 0.22,
    clearcoat: 0.35,
  });

  // Phase 12: High-k MIM/MOM LOFIC lateral overflow capacitor dielectric (cyan-iridescent)
  const loficDielectric = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x0891b2,
    metalness: 0.38,
    roughness: 0.16,
    clearcoat: 0.65,
    iridescence: 0.55,
    iridescenceIOR: 1.8,
  });

  // Phase 12: Dense dark tungsten optical light-shield cap for global shutter MEM node
  const tungstenLightShield = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x262c36,
    bumpMap: cncBrushedTex,
    bumpScale: 0.05,
    metalness: 0.94,
    roughness: 0.24,
    clearcoat: 0.18,
  });

  // Phase 13: Iconic Alpha Cinnabar anodized aluminum mount accent collar
  const cinnabarAnodized = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd95b26,
    bumpMap: cncBrushedTex,
    bumpScale: 0.04,
    metalness: 0.8,
    roughness: 0.26,
    clearcoat: 0.45,
    clearcoatRoughness: 0.18,
  });

  // Phase 13: High-hysteresis chlorobutyl shock-absorbing damper & acoustic muffle rubber
  const butylDamperRubber = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x2b2624,
    bumpMap: mgGrainTex,
    bumpScale: 0.1,
    metalness: 0.02,
    roughness: 0.9,
  });

  // Phase 13: Translucent dielectric Mylar / amber Kapton electrical & magnetic-gap insulator film
  const mylarInsulatorFilm = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xc2852a,
    metalness: 0.08,
    roughness: 0.18,
    transparent: true,
    opacity: 0.72,
    clearcoat: 0.55,
  });

  // Phase 13: Mirror-lapped low-coercivity pure-iron armature & magnetic field-cut shield alloy
  const pureIronArmature = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xbcc6d4,
    bumpMap: cncBrushedTex,
    bumpScale: 0.03,
    metalness: 0.95,
    roughness: 0.14,
    clearcoat: 0.25,
  });

  // Phase 14: Index-matched UV optical cement (n≈1.52) & dry-N2 hermetic glass seal
  const opticalCementClear = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xa5f3fc,
    metalness: 0.0,
    roughness: 0.05,
    transparent: true,
    opacity: 0.42,
    ior: 1.52,
    clearcoat: 0.9,
    clearcoatRoughness: 0.06,
    depthWrite: false,
  });

  // Phase 14: Non-outgassing tacky silicone adhesive gel strip for SSWF ultrasonic dust catcher
  const dustCatcherGel = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xf59e0b,
    metalness: 0.02,
    roughness: 0.22,
    transparent: true,
    opacity: 0.86,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12,
  });

  // Phase 14: Atomic-layer-deposited High-k negative fixed-charge Al2O3/HfO2 & SiN passivation nanolayer
  const aluminaHighKFilm = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x7c3aed,
    metalness: 0.28,
    roughness: 0.14,
    transparent: true,
    opacity: 0.78,
    iridescence: 0.85,
    iridescenceIOR: 1.76,
    clearcoat: 0.8,
  });

  // Phase 14: TaN/SiCN copper diffusion barrier liner & SOI FinFET metallic alloy
  const taNBarrierLiner = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xc8a46e,
    bumpMap: cncBrushedTex,
    bumpScale: 0.03,
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 0.35,
  });

  // Phase 15: Rear LCD Optical Clear Adhesive (OCA 150um) crystal-clear index-matched film
  const lcdOcaFilm = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0xe0f2fe,
    metalness: 0.0,
    roughness: 0.03,
    opacity: 0.22,
    iridescence: 0.45,
    iridescenceIOR: 1.49,
    iridescenceThicknessRange: [220, 380],
    clearcoat: 0.85,
  });

  // Phase 15: Frosted pearl-white micro-bead PET optical diffuser sheet
  const lcdDiffuserMatte = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xf8fafc,
    emissive: 0xe2e8f0,
    emissiveIntensity: 0.14,
    metalness: 0.02,
    roughness: 0.72,
    transparent: true,
    opacity: 0.86,
  });

  // Phase 15: Multi-layer pearlescent reflective polarizer DBEF light-recycling film
  const lcdDbefIridescent = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xe2f1ff,
    metalness: 0.25,
    roughness: 0.12,
    transparent: true,
    opacity: 0.78,
    iridescence: 1.0,
    iridescenceIOR: 1.65,
    iridescenceThicknessRange: [300, 680],
    clearcoat: 0.9,
  });

  // Phase 16: Vapor Chamber Sub-Atmospheric Degassed DI-Water & Two-Phase Meniscus Glow
  const vcWorkingFluidCyan = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.22,
    metalness: 0.05,
    roughness: 0.08,
    opacity: 0.56,
    iridescence: 0.65,
    iridescenceIOR: 1.33,
    iridescenceThicknessRange: [180, 420],
    clearcoat: 1.0,
  });

  // Phase 16: 200-Mesh Woven Fine Copper Wire Capillary Screen Wick
  const vcCopperMeshWick = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd9804c,
    metalness: 0.86,
    roughness: 0.36,
    clearcoat: 0.2,
    clearcoatRoughness: 0.4,
  });

  // Phase 16: EVF Eye-Sensor 940nm IR-Pass Deep-Ruby Black Polycarbonate Window
  const evfIrWindowBlack = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x1b0814,
    emissive: 0x4c0519,
    emissiveIntensity: 0.18,
    metalness: 0.04,
    roughness: 0.05,
    opacity: 0.88,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  });

  // Phase 16: Conductive Ni/Cu Woven Fabric-over-Foam EMI Grounding Gasket
  const conductiveNiCuFoam = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x8e99a8,
    metalness: 0.64,
    roughness: 0.52,
  });

  // Phase 17: Golden-Amber Cross-Ply Aramid (Kevlar) Tough Shutter Blade Core Weave
  const aramidTex = createCarbonFiberTexture('#c59b2d');
  const aramidKevlarWeave = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd9b040,
    map: aramidTex.map,
    bumpMap: aramidTex.bumpMap,
    bumpScale: 0.08,
    metalness: 0.08,
    roughness: 0.44,
    clearcoat: 0.18,
    clearcoatRoughness: 0.38,
  });

  // Phase 17: Sintered Microporous Oil-Wicking Lubricant Trap Barrier Felt
  const oilTrapPorousPad = new THREE.MeshStandardMaterial({
    ...common,
    color: 0x2c3440,
    metalness: 0.04,
    roughness: 0.94,
  });

  // Phase 17: Zinc-Oxide (ZnO) Cobalt-Blue Ceramic Spark-Suppressing Ring Varistor
  const varistorRingBlue = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x1d63b8,
    metalness: 0.06,
    roughness: 0.3,
    clearcoat: 0.55,
    clearcoatRoughness: 0.22,
  });

  // Phase 18: 15 nm Front-Element Hydrophobic/Oleophobic Fluorine Coating Glint
  const fluorineCoatCyan = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x38bdf8,
    metalness: 0.04,
    roughness: 0.04,
    opacity: 0.34,
    iridescence: 0.72,
    iridescenceIOR: 1.32,
    iridescenceThicknessRange: [120, 320],
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  });

  // Phase 18: Sony Nano AR Coating II Sub-Wavelength Porous Silica Iridescent Layer
  const nanoArIridescent = new THREE.MeshPhysicalMaterial({
    ...glassCommon,
    color: 0x6366f1,
    metalness: 0.08,
    roughness: 0.05,
    opacity: 0.36,
    iridescence: 1.0,
    iridescenceIOR: 1.24,
    iridescenceThicknessRange: [140, 480],
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  });

  // Phase 18: Sintered Oil-Impregnated Bronze Linear Slide Sleeve Bushing
  const sinteredBronzeBushing = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xb67b3d,
    metalness: 0.76,
    roughness: 0.36,
    clearcoat: 0.18,
    clearcoatRoughness: 0.42,
  });

  // Phase 19: Compliant Silicone PCB Thermal Heatsink Putty (Lensrentals Sony FE PCB discovery)
  const thermalPuttyPink = new THREE.MeshStandardMaterial({
    ...common,
    color: 0xe89ca8,
    metalness: 0.02,
    roughness: 0.82,
  });

  // Phase 19: Sony G Master Signature Anodized Crimson-Orange Aluminum Emblem Badge
  const gMasterRedBadge = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xd9381e,
    metalness: 0.62,
    roughness: 0.24,
    clearcoat: 0.9,
    clearcoatRoughness: 0.14,
  });

  // Phase 19: Front-Element Thick Blue-Violet Weather-Sealing Silicone Ring (Lensrentals GM teardown)
  const makeupSealViolet = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x6c63c9,
    metalness: 0.04,
    roughness: 0.56,
    clearcoat: 0.22,
    clearcoatRoughness: 0.4,
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
    mountStainlessFlange,
    mountSpringSteel,
    mountRedIndexDot,
    mountVelvetBaffle,
    mountShimBlue,
    mountPpsInsulator,
    mountMgBulkhead,
    mountThreadLockBlue,
    lensXaGlass,
    lensEdGlass,
    lensBarrelAnodized,
    lensRubberGrip,
    lensAccentRing,
    lensFoamSeal,
    lensPermalloyShield,
    lcdCoverGlass,
    lcdLiveViewActive,
    lcdBacklightPrism,
    bodyMgShell,
    bodyLeatherette,
    bodyBatteryShell,
    bodyBatteryCell,
    bodyTopSubOled,
    bodyRecRed,
    beCuSpring,
    titaniumRivet,
    invarScaleBar,
    lcdPolarizerFilm,
    evfMlaGlass,
    sinteredSilver,
    siliconTsvDram,
    thermalTransferTape,
    velvetFlockTrap,
    vaporWickCopper,
    rfGoldCoax,
    loficDielectric,
    tungstenLightShield,
    cinnabarAnodized,
    butylDamperRubber,
    mylarInsulatorFilm,
    pureIronArmature,
    opticalCementClear,
    dustCatcherGel,
    aluminaHighKFilm,
    taNBarrierLiner,
    lcdOcaFilm,
    lcdDiffuserMatte,
    lcdDbefIridescent,
    vcWorkingFluidCyan,
    vcCopperMeshWick,
    evfIrWindowBlack,
    conductiveNiCuFoam,
    aramidKevlarWeave,
    oilTrapPorousPad,
    varistorRingBlue,
    fluorineCoatCyan,
    nanoArIridescent,
    sinteredBronzeBushing,
    thermalPuttyPink,
    gMasterRedBadge,
    makeupSealViolet,
  ];

  // Optimize procedural texture VRAM & mobile Adreno GLSL shader permutations automatically
  optimizeMaterialsForGpu(
    allMaterials,
    new Set<THREE.Material>([
      siliconSensorDie,
      irCutGlass,
      nanoArIridescent,
      lcdDbefIridescent,
      lensXaGlass,
      lensEdGlass,
      evfDichroicMirror,
      fluorineCoatCyan,
    ]),
    GPU_PROFILE
  );

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
    mountStainlessFlange,
    mountSpringSteel,
    mountRedIndexDot,
    mountVelvetBaffle,
    mountShimBlue,
    mountPpsInsulator,
    mountMgBulkhead,
    mountThreadLockBlue,
    lensXaGlass,
    lensEdGlass,
    lensBarrelAnodized,
    lensRubberGrip,
    lensAccentRing,
    lensFoamSeal,
    lensPermalloyShield,
    lcdCoverGlass,
    lcdLiveViewActive,
    lcdBacklightPrism,
    bodyMgShell,
    bodyLeatherette,
    bodyBatteryShell,
    bodyBatteryCell,
    bodyTopSubOled,
    bodyRecRed,
    beCuSpring,
    titaniumRivet,
    invarScaleBar,
    lcdPolarizerFilm,
    evfMlaGlass,
    sinteredSilver,
    siliconTsvDram,
    thermalTransferTape,
    velvetFlockTrap,
    vaporWickCopper,
    rfGoldCoax,
    loficDielectric,
    tungstenLightShield,
    cinnabarAnodized,
    butylDamperRubber,
    mylarInsulatorFilm,
    pureIronArmature,
    opticalCementClear,
    dustCatcherGel,
    aluminaHighKFilm,
    taNBarrierLiner,
    lcdOcaFilm,
    lcdDiffuserMatte,
    lcdDbefIridescent,
    vcWorkingFluidCyan,
    vcCopperMeshWick,
    evfIrWindowBlack,
    conductiveNiCuFoam,
    aramidKevlarWeave,
    oilTrapPorousPad,
    varistorRingBlue,
    fluorineCoatCyan,
    nanoArIridescent,
    sinteredBronzeBushing,
    thermalPuttyPink,
    gMasterRedBadge,
    makeupSealViolet,
    allMaterials,
  };
}
