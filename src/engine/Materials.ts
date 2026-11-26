import * as THREE from 'three';
import {
  GPU_PROFILE,
  NATIVE_HI_TEX_H,
  NATIVE_HI_TEX_W,
  NATIVE_TILE_TEX_SIZE,
  optimizeMaterialsForGpu,
} from './GpuOptimizer';
import {
  createUltraRealisticMaterials,
  UltraRealisticMaterials,
} from './UltraRealisticTextures';

export { NATIVE_HI_TEX_H, NATIVE_HI_TEX_W, NATIVE_TILE_TEX_SIZE };

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
  // Ultra-HD Photorealistic Component Materials (BIONZ XR / Mic / Battery / CFexpress)
  ultra: UltraRealisticMaterials;
  // Utility
  allMaterials: THREE.Material[];
}

function createScaledCanvas(
  baseW: number,
  baseH: number,
  desktopScale = 0.5,
  forceTile = false
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; w: number; h: number } {
  const s = GPU_PROFILE.isMobile ? desktopScale * 0.5 : desktopScale;
  const rawMax = Math.max(baseW * s, baseH * s);
  const heroMin = GPU_PROFILE.isMobile ? 180 : 300;
  const isHero = !forceTile && rawMax >= heroMin;
  const cw = isHero ? NATIVE_HI_TEX_W : NATIVE_TILE_TEX_SIZE;
  const ch = isHero ? NATIVE_HI_TEX_H : NATIVE_TILE_TEX_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  // Pre-flip vertically into OpenGL UV orientation so DualTierTextureArrayPacker reads getImageData directly with 0 scratch canvases!
  ctx.translate(0, ch);
  ctx.scale(cw / baseW, -ch / baseH);
  (canvas as unknown as { __ctx2d?: CanvasRenderingContext2D }).__ctx2d = ctx;
  return { canvas, ctx, w: baseW, h: baseH };
}

function parseHexRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function createSensorDieTexture(): { map: THREE.CanvasTexture; roughnessMap: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const { canvas: colorCanvas, ctx, w, h } = createScaledCanvas(1024, 682, 0.5);

  // Outer silicon scribe street & passivation bevel border
  ctx.fillStyle = '#11161f';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(3, 3, w - 6, h - 6);

  // Peripheral circuit region (row drivers left/right, column CDS/ADC & OB top/bottom)
  const marginX = 56;
  const marginY = 42;
  ctx.fillStyle = '#17202d';
  ctx.fillRect(10, 10, w - 20, h - 20);

  // Subtle metallic power-ring & peripheral driver routing tracks
  ctx.strokeStyle = 'rgba(186, 218, 248, 0.30)';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  for (let i = 16; i < marginY - 6; i += 3.6) {
    ctx.moveTo(marginX - 18, i);
    ctx.lineTo(w - marginX + 18, i);
    ctx.moveTo(marginX - 18, h - i);
    ctx.lineTo(w - marginX + 18, h - i);
  }
  for (let i = 20; i < marginX - 8; i += 4.2) {
    ctx.moveTo(i, marginY - 8);
    ctx.lineTo(i, h - marginY + 8);
    ctx.moveTo(w - i, marginY - 8);
    ctx.lineTo(w - i, h - marginY + 8);
  }
  ctx.stroke();

  // Top & Bottom Column CDS/ADC peripheral readout strips (warm copper-violet micro-cells)
  ctx.fillStyle = 'rgba(72, 118, 168, 0.36)';
  ctx.fillRect(marginX, marginY - 14, w - marginX * 2, 10);
  ctx.fillRect(marginX, h - marginY + 4, w - marginX * 2, 10);
  // Left & Right Row-Scanner driver strips
  ctx.fillStyle = 'rgba(128, 96, 178, 0.34)';
  ctx.fillRect(marginX - 15, marginY, 11, h - marginY * 2);
  ctx.fillRect(w - marginX + 4, marginY, 11, h - marginY * 2);

  // Dense perimeter Gold/Al wire-bond pads grouped in GSG differential clusters
  ctx.fillStyle = '#ecc85e';
  for (let x = 42; x < w - 42; x += 12) {
    const gap = Math.floor((x - 42) / 12) % 6 === 5;
    if (!gap) {
      ctx.fillRect(x, 6, 7.2, 9.5);
      ctx.fillRect(x, h - 15.5, 7.2, 9.5);
    }
  }
  for (let y = 38; y < h - 38; y += 12) {
    const gap = Math.floor((y - 38) / 12) % 5 === 4;
    if (!gap) {
      ctx.fillRect(6, y, 9.5, 7.2);
      ctx.fillRect(w - 15.5, y, 9.5, 7.2);
    }
  }

  // 4-corner semiconductor photolithography Vernier alignment crosshairs
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.0;
  for (const [fx, fy] of [
    [28, 24],
    [w - 28, 24],
    [28, h - 24],
    [w - 28, h - 24],
  ]) {
    ctx.beginPath();
    ctx.moveTo(fx - 8, fy);
    ctx.lineTo(fx + 8, fy);
    ctx.moveTo(fx, fy - 8);
    ctx.lineTo(fx, fy + 8);
    ctx.stroke();
    ctx.strokeRect(fx - 5, fy - 5, 10, 10);
  }

  // Optical Black (OB) tungsten light-shield frame around active 36x24mm region
  const actX = marginX;
  const actY = marginY;
  const actW = w - marginX * 2;
  const actH = h - marginY * 2;

  ctx.fillStyle = '#0c1016';
  ctx.fillRect(actX - 6, actY - 6, actW + 12, actH + 12);
  ctx.strokeStyle = '#94c5e8';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(actX - 2, actY - 2, actW + 4, actH + 4);

  // Active 36x24mm Full-Frame CMOS imaging array: jewel-like multi-order diffraction sheen
  const grad = ctx.createLinearGradient(actX, actY, actX + actW, actY + actH);
  grad.addColorStop(0.0, '#072a36');
  grad.addColorStop(0.18, '#0c5968');
  grad.addColorStop(0.36, '#144478');
  grad.addColorStop(0.55, '#2b2470');
  grad.addColorStop(0.76, '#125c64');
  grad.addColorStop(0.92, '#1d3c74');
  grad.addColorStop(1.0, '#0a3644');
  ctx.fillStyle = grad;
  ctx.fillRect(actX, actY, actW, actH);

  // Diagonal thin-film AR & CFA spectral interference rainbow bands
  const spec = ctx.createLinearGradient(actX, actY + actH * 0.15, actX + actW, actY + actH * 0.85);
  spec.addColorStop(0.0, 'rgba(16, 214, 186, 0.48)');
  spec.addColorStop(0.24, 'rgba(34, 148, 244, 0.44)');
  spec.addColorStop(0.48, 'rgba(130, 82, 238, 0.42)');
  spec.addColorStop(0.70, 'rgba(20, 204, 152, 0.46)');
  spec.addColorStop(0.88, 'rgba(56, 178, 248, 0.44)');
  spec.addColorStop(1.0, 'rgba(168, 85, 247, 0.38)');
  ctx.fillStyle = spec;
  ctx.fillRect(actX, actY, actW, actH);

  // Micro-pixel Bayer + dual-PD diffraction grating fine grid (batched single path)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.11)';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  for (let x = actX; x <= actX + actW; x += 10) {
    ctx.moveTo(x, actY);
    ctx.lineTo(x, actY + actH);
  }
  for (let y = actY; y <= actY + actH; y += 10) {
    ctx.moveTo(actX, y);
    ctx.lineTo(actX + actW, y);
  }
  ctx.stroke();

  // Subtle step-and-scan photolithography reticle stitch zones (3x2 full-frame exposure fields) & 16-col ADC banks
  ctx.strokeStyle = 'rgba(186, 236, 255, 0.24)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 1; i < 16; i++) {
    const gx = actX + (actW / 16) * i;
    ctx.moveTo(gx, actY);
    ctx.lineTo(gx, actY + actH);
  }
  ctx.moveTo(actX, actY + actH * 0.5);
  ctx.lineTo(actX + actW, actY + actH * 0.5);
  ctx.stroke();

  // Subtle PDAF cross-type phase-detection micro-zone glints
  ctx.fillStyle = 'rgba(125, 249, 255, 0.14)';
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 7; c++) {
      const px = actX + actW * (0.14 + c * 0.12);
      const py = actY + actH * (0.16 + r * 0.17);
      ctx.fillRect(px - 10, py - 1.2, 20, 2.4);
      ctx.fillRect(px - 1.2, py - 7, 2.4, 14);
    }
  }

  // Lightweight roughness & micro-bump canvas at NATIVE_TILE_TEX_SIZE
  const { canvas: roughCanvas, ctx: rctx } = createScaledCanvas(1024, 682, 0.25, true);
  rctx.fillStyle = '#3a3a3a';
  rctx.fillRect(0, 0, w, h);
  rctx.fillStyle = '#121212';
  rctx.fillRect(actX, actY, actW, actH);
  rctx.strokeStyle = '#262626';
  rctx.beginPath();
  for (let x = actX; x <= actX + actW; x += 10) {
    rctx.moveTo(x, actY);
    rctx.lineTo(x, actY + actH);
  }
  rctx.stroke();

  const map = new THREE.CanvasTexture(colorCanvas);
  map.flipY = false;
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = GPU_PROFILE.maxAnisotropy;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.flipY = false;
  roughnessMap.anisotropy = 2;

  return { map, roughnessMap, bumpMap: roughnessMap };
}

function createPcbTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const { canvas, ctx, w, h } = createScaledCanvas(1024, 820, 0.5);

  // 10-layer high-density Sony matte emerald-teal solder mask base
  ctx.fillStyle = '#0f2d26';
  ctx.fillRect(0, 0, w, h);

  // Subtle copper ground-plane weave & crosshatch beneath solder mask
  ctx.strokeStyle = 'rgba(134, 239, 172, 0.035)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let x = 0; x < w; x += 14) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0; y < h; y += 14) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();

  // Inner copper ground pour plane
  ctx.fillStyle = '#153b33';
  ctx.fillRect(24, 24, w - 48, h - 48);

  // Perimeter copper guard ring & Faraday stitching via fence
  ctx.strokeStyle = '#245e50';
  ctx.lineWidth = 5;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // 16-lane SLVS-EC 100-ohm differential length-matched serpentine traces (left & right banks)
  ctx.strokeStyle = '#2e7d69';
  ctx.lineWidth = 2.1;
  ctx.beginPath();
  for (let lane = 0; lane < 16; lane++) {
    const y0 = 148 + lane * 32;
    for (const dy of [-3.2, 3.2]) {
      ctx.moveTo(46, y0 + dy);
      ctx.lineTo(122, y0 + dy);
      for (let m = 0; m < 5; m++) {
        const mx = 130 + m * 15;
        ctx.lineTo(mx, y0 + dy - 5.5);
        ctx.lineTo(mx + 7.5, y0 + dy + 5.5);
      }
      ctx.lineTo(256, y0 + dy);

      ctx.moveTo(w - 46, y0 + dy);
      ctx.lineTo(w - 122, y0 + dy);
      for (let m = 0; m < 5; m++) {
        const mx = w - 130 - m * 15;
        ctx.lineTo(mx, y0 + dy - 5.5);
        ctx.lineTo(mx - 7.5, y0 + dy + 5.5);
      }
      ctx.lineTo(w - 256, y0 + dy);
    }
  }
  ctx.stroke();

  // Top analog LDO power bus & bottom clock/SPI routing buses
  ctx.strokeStyle = '#348c74';
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  for (let r = 0; r < 5; r++) {
    const ty = 58 + r * 11;
    ctx.moveTo(180, ty);
    ctx.lineTo(w - 180, ty);
    const by = h - 58 - r * 11;
    ctx.moveTo(180, by);
    ctx.lineTo(w - 180, by);
  }
  ctx.stroke();

  // Central segmented copper thermal pad islands (4x3 grid prevents solder voiding)
  ctx.fillStyle = '#b98f3c';
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      ctx.fillRect(390 + c * 62, 260 + r * 102, 54, 92);
    }
  }

  // ENIG gold LGA-320 landing pads + perimeter Faraday via fence + thermal via matrix
  ctx.fillStyle = '#dcb554';
  ctx.beginPath();
  for (let gx = 276; gx <= w - 276; gx += 24) {
    for (let gy = 132; gy <= h - 132; gy += 24) {
      if (gx > 378 && gx < w - 378 && gy > 246 && gy < h - 246) continue;
      ctx.moveTo(gx + 4.4, gy);
      ctx.arc(gx, gy, 4.4, 0, Math.PI * 2);
    }
  }
  for (let gx = 402; gx <= w - 402; gx += 20) {
    for (let gy = 272; gy <= h - 272; gy += 20) {
      ctx.moveTo(gx + 4.6, gy);
      ctx.arc(gx, gy, 4.6, 0, Math.PI * 2);
    }
  }
  for (let px = 36; px < w - 36; px += 22) {
    ctx.moveTo(px + 2.8, 20);
    ctx.arc(px, 20, 2.8, 0, Math.PI * 2);
    ctx.moveTo(px + 2.8, h - 20);
    ctx.arc(px, h - 20, 2.8, 0, Math.PI * 2);
  }
  for (let py = 36; py < h - 36; py += 22) {
    ctx.moveTo(20 + 2.8, py);
    ctx.arc(20, py, 2.8, 0, Math.PI * 2);
    ctx.moveTo(w - 20 + 2.8, py);
    ctx.arc(w - 20, py, 2.8, 0, Math.PI * 2);
  }
  ctx.fill();

  // Drill hole centers for all vias
  ctx.fillStyle = '#091815';
  ctx.beginPath();
  for (let gx = 276; gx <= w - 276; gx += 24) {
    for (let gy = 132; gy <= h - 132; gy += 24) {
      if (gx > 378 && gx < w - 378 && gy > 246 && gy < h - 246) continue;
      ctx.moveTo(gx + 1.8, gy);
      ctx.arc(gx, gy, 1.8, 0, Math.PI * 2);
    }
  }
  for (let gx = 402; gx <= w - 402; gx += 20) {
    for (let gy = 272; gy <= h - 272; gy += 20) {
      ctx.moveTo(gx + 2.0, gy);
      ctx.arc(gx, gy, 2.0, 0, Math.PI * 2);
    }
  }
  ctx.fill();

  // 4 corner ENIG grounding/mounting holes with radial star ground-stitching vias
  ctx.strokeStyle = '#e8c260';
  ctx.lineWidth = 6.5;
  ctx.beginPath();
  for (const [cx, cy] of [
    [60, 60],
    [w - 60, 60],
    [60, h - 60],
    [w - 60, h - 60],
  ]) {
    ctx.moveTo(cx + 21, cy);
    ctx.arc(cx, cy, 21, 0, Math.PI * 2);
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      const vx = cx + Math.cos(a) * 30;
      const vy = cy + Math.sin(a) * 30;
      ctx.moveTo(vx + 2.5, vy);
      ctx.arc(vx, vy, 2.5, 0, Math.PI * 2);
    }
  }
  ctx.stroke();

  // Crisp industrial white PCB silkscreen outlines, reference designators & fiducials
  ctx.strokeStyle = 'rgba(236, 245, 242, 0.72)';
  ctx.lineWidth = 2.0;
  ctx.strokeRect(262, 118, w - 524, h - 236); // LGA-320 courtyard
  ctx.strokeRect(36, 134, 62, h - 268);       // CN101 left B2B courtyard
  ctx.strokeRect(w - 98, 134, 62, h - 268);   // CN102 right B2B courtyard
  ctx.fillStyle = 'rgba(241, 248, 245, 0.85)';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('SY-1098  IMX-FF 10L-HDI', 124, 46);
  ctx.fillText('CN101 SLVS-L', 36, 124);
  ctx.fillText('IC101 PMIC', 274, 108);
  ctx.fillText('X101 72MHz', 620, 108);
  ctx.textAlign = 'right';
  ctx.fillText('CN102 SLVS-R', w - 36, 124);
  ctx.fillText('SONY CORP  RoHS Pb-F', w - 124, h - 32);

  // Pin-1 triangle & optical fiducial dots
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.moveTo(262, 118);
  ctx.lineTo(278, 118);
  ctx.lineTo(262, 134);
  ctx.closePath();
  ctx.fill();

  const map = new THREE.CanvasTexture(canvas);
  map.flipY = false;
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = GPU_PROFILE.maxAnisotropy;
  return { map, bumpMap: map };
}

/** OMEGA-14: Zero-DOM pure TypedArray 128x128 copper winding synthesizer (0ms Canvas2D overhead!) */
function createCopperCoilTexture(): { map: THREE.DataTexture; bumpMap: THREE.DataTexture } {
  const size = NATIVE_TILE_TEX_SIZE;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    const mod4 = y & 3;
    let r = 168, g = 76, b = 32;
    if (mod4 <= 2) {
      if ((y & 7) < 3) {
        r = 216; g = 118; b = 63;
      } else {
        r = 138; g = 57; b = 21;
      }
    }
    const row = y * size * 4;
    for (let x = 0; x < size; x++) {
      const o = row + x * 4;
      data[o] = r;
      data[o + 1] = g;
      data[o + 2] = b;
      data[o + 3] = 255;
    }
  }
  const map = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(3, 6);
  map.needsUpdate = true;
  return { map, bumpMap: map };
}

/** OMEGA-14: Zero-DOM pure TypedArray 128x128 pyrolytic graphite synthesizer */
function createGraphiteTexture(): THREE.DataTexture {
  const size = NATIVE_TILE_TEX_SIZE;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    const yEven = y & ~1;
    const v = 28 + Math.floor(Math.sin(yEven * 0.7) * 6 + ((yEven * 37) % 9));
    const r = (y & 1) === 0 ? v : 32;
    const g = (y & 1) === 0 ? v + 2 : 34;
    const b = (y & 1) === 0 ? v + 6 : 40;
    const row = y * size * 4;
    for (let x = 0; x < size; x++) {
      const o = row + x * 4;
      data[o] = r;
      data[o + 1] = g;
      data[o + 2] = b;
      data[o + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.needsUpdate = true;
  return tex;
}

/** OMEGA-14: Zero-DOM pure TypedArray 128x128 carbon/aramid twill weave synthesizer */
function createCarbonFiberTexture(tintHex: string): { map: THREE.DataTexture; bumpMap: THREE.DataTexture } {
  const size = NATIVE_TILE_TEX_SIZE;
  const data = new Uint8Array(size * size * 4);
  const [br, bg, bb] = parseHexRgb(tintHex);
  const cell = 16;
  for (let y = 0; y < size; y++) {
    const cy = Math.floor(y / cell);
    const ty = (y % cell) / (cell - 1);
    const row = y * size * 4;
    for (let x = 0; x < size; x++) {
      const cx = Math.floor(x / cell);
      const tx = (x % cell) / (cell - 1);
      const t = ((cx + cy) & 1) === 0 ? tx : ty;
      let r = br, g = bg, b = bb;
      if (t <= 0.5) {
        const a = 0.03 + (t * 2) * 0.13;
        r = Math.round(br * (1 - a) + 255 * a);
        g = Math.round(bg * (1 - a) + 255 * a);
        b = Math.round(bb * (1 - a) + 255 * a);
      } else {
        const u = (t - 0.5) * 2;
        const wht = 0.16 * (1 - u);
        const blk = 0.22 * u;
        r = Math.round((br * (1 - wht) + 255 * wht) * (1 - blk));
        g = Math.round((bg * (1 - wht) + 255 * wht) * (1 - blk));
        b = Math.round((bb * (1 - wht) + 255 * wht) * (1 - blk));
      }
      const o = row + x * 4;
      data[o] = r;
      data[o + 1] = g;
      data[o + 2] = b;
      data[o + 3] = 255;
    }
  }
  const map = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(5, 2);
  map.anisotropy = GPU_PROFILE.maxAnisotropy;
  map.needsUpdate = true;
  return { map, bumpMap: map };
}

/**
 * Procedural 4nm Main Image Signal Processor (ISP) bare silicon die floorplan.
 */
function createIspDieFloorplanTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const { canvas: c, ctx, w: s } = createScaledCanvas(512, 512, 0.5);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, s, s);

  ctx.strokeStyle = '#d4a948';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, s - 16, s - 16);

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
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let px = x + pitchX; px < x + w; px += pitchX) {
      ctx.moveTo(px, y);
      ctx.lineTo(px, y + h);
    }
    for (let py = y + pitchY; py < y + h; py += pitchY) {
      ctx.moveTo(x, py);
      ctx.lineTo(x + w, py);
    }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(226, 192, 92, 0.72)';
    ctx.lineWidth = 1.6;
    ctx.strokeRect(x, y, w, h);
  };

  drawMacroBlock(22, 22, 468, 66, '#0e7490', '#1d4ed8', 14, 16);
  drawMacroBlock(22, 102, 218, 178, '#0f766e', '#115e59', 10, 8);
  drawMacroBlock(254, 102, 236, 178, '#1d4ed8', '#4338ca', 12, 10);
  drawMacroBlock(22, 294, 180, 124, '#3730a3', '#6d28d9', 22, 20);
  drawMacroBlock(214, 294, 146, 124, '#b45309', '#d97706', 8, 8);
  drawMacroBlock(372, 294, 118, 124, '#0369a1', '#0e7490', 10, 12);
  drawMacroBlock(22, 430, 468, 60, '#1e293b', '#334155', 12, 14);

  ctx.strokeStyle = 'rgba(250, 204, 21, 0.55)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const yy = 92 + i * 1.6;
    ctx.moveTo(22, yy);
    ctx.lineTo(490, yy);
    const yy2 = 283 + i * 1.6;
    ctx.moveTo(22, yy2);
    ctx.lineTo(490, yy2);
  }
  ctx.stroke();

  const map = new THREE.CanvasTexture(c);
  map.flipY = false;
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = GPU_PROFILE.maxAnisotropy;
  return { map, bumpMap: map };
}

/**
 * Procedural AI / NPU Deep-Learning Accelerator bare silicon die.
 */
function createNpuSystolicDieTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const { canvas: c, ctx, w: s } = createScaledCanvas(512, 512, 0.5);

  ctx.fillStyle = '#140f2b';
  ctx.fillRect(0, 0, s, s);

  ctx.strokeStyle = '#e2b648';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, s - 16, s - 16);

  const gx0 = 28;
  const gy0 = 28;
  const cell = 19;
  for (let r = 0; r < 16; r++) {
    for (let col = 0; col < 16; col++) {
      const hue = 250 + ((r + col) % 8) * 9;
      ctx.fillStyle = `hsl(${hue}, 74%, ${34 + ((r * col) % 3) * 7}%)`;
      ctx.fillRect(gx0 + col * cell + 1.5, gy0 + r * cell + 1.5, cell - 3, cell - 3);
    }
  }
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  for (let r = 0; r < 16; r++) {
    for (let col = 0; col < 16; col++) {
      ctx.fillRect(gx0 + col * cell + 4, gy0 + r * cell + 4, 4, 4);
    }
  }
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(gx0 - 2, gy0 - 2, 16 * cell + 4, 16 * cell + 4);

  const sramGrad = ctx.createLinearGradient(350, 28, 484, 332);
  sramGrad.addColorStop(0, '#0284c7');
  sramGrad.addColorStop(1, '#0d9488');
  ctx.fillStyle = sramGrad;
  ctx.fillRect(350, 28, 134, 304);
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let y = 34; y < 330; y += 8) {
    ctx.moveTo(350, y);
    ctx.lineTo(484, y);
  }
  ctx.stroke();
  ctx.strokeStyle = '#e2b648';
  ctx.lineWidth = 1.6;
  ctx.strokeRect(350, 28, 134, 304);

  const botGrad = ctx.createLinearGradient(28, 352, 484, 484);
  botGrad.addColorStop(0, '#7c3aed');
  botGrad.addColorStop(0.5, '#2563eb');
  botGrad.addColorStop(1, '#0891b2');
  ctx.fillStyle = botGrad;
  ctx.fillRect(28, 352, 456, 132);
  ctx.strokeStyle = 'rgba(255,255,255,0.24)';
  ctx.beginPath();
  for (let x = 44; x < 484; x += 16) {
    ctx.moveTo(x, 352);
    ctx.lineTo(x, 484);
  }
  ctx.stroke();
  ctx.strokeStyle = '#e2b648';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(28, 352, 456, 132);

  const map = new THREE.CanvasTexture(c);
  map.flipY = false;
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = GPU_PROFILE.maxAnisotropy;
  return { map, bumpMap: map };
}

/**
 * Procedural 12-Layer Any-Layer HDI Camera Motherboard PCB texture (batched Canvas2D paths).
 */
function createHdiMotherboardTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const { canvas: c, ctx, w, h } = createScaledCanvas(1024, 712, 0.5);

  ctx.fillStyle = '#0e3b2e';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#124939';
  ctx.fillRect(24, 24, w - 48, h - 48);

  ctx.strokeStyle = '#1d7a5b';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  for (let lane = 0; lane < 18; lane++) {
    const y = 76 + lane * 11;
    ctx.moveTo(64, y);
    ctx.lineTo(290, y);
    ctx.lineTo(324, y + 18);
    ctx.lineTo(660, y + 18);
    ctx.lineTo(695, y - 6);
    ctx.lineTo(940, y - 6);
  }
  ctx.stroke();

  ctx.strokeStyle = '#289e74';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let m = 0; m < 8; m++) {
    const baseY = 340 + m * 24;
    ctx.moveTo(110, baseY);
    for (let sx = 140; sx < 440; sx += 24) {
      ctx.lineTo(sx, baseY);
      ctx.lineTo(sx + 6, baseY - 7);
      ctx.lineTo(sx + 12, baseY - 7);
      ctx.lineTo(sx + 18, baseY + 7);
      ctx.lineTo(sx + 24, baseY);
    }
    ctx.lineTo(860, baseY);
  }
  ctx.stroke();

  ctx.strokeStyle = '#1b6e53';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let vx = 80; vx < w - 80; vx += 26) {
    ctx.moveTo(vx, 42);
    ctx.lineTo(vx, h - 42);
  }
  ctx.stroke();

  ctx.fillStyle = '#e0b94f';
  ctx.beginPath();
  for (let gy = 54; gy < h - 54; gy += 36) {
    for (let gx = 54; gx < w - 54; gx += 36) {
      if ((gx + gy) % 72 === 0) {
        ctx.moveTo(gx + 3.2, gy);
        ctx.arc(gx, gy, 3.2, 0, Math.PI * 2);
      }
    }
  }
  for (let px = 32; px < w - 32; px += 18) {
    ctx.moveTo(px + 2.4, 20);
    ctx.arc(px, 20, 2.4, 0, Math.PI * 2);
    ctx.moveTo(px + 2.4, h - 20);
    ctx.arc(px, h - 20, 2.4, 0, Math.PI * 2);
  }
  for (let py = 32; py < h - 32; py += 18) {
    ctx.moveTo(20 + 2.4, py);
    ctx.arc(20, py, 2.4, 0, Math.PI * 2);
    ctx.moveTo(w - 20 + 2.4, py);
    ctx.arc(w - 20, py, 2.4, 0, Math.PI * 2);
  }
  ctx.fill();

  ctx.fillStyle = '#09241c';
  ctx.beginPath();
  for (let gy = 54; gy < h - 54; gy += 36) {
    for (let gx = 54; gx < w - 54; gx += 36) {
      if ((gx + gy) % 72 === 0) {
        ctx.moveTo(gx + 1.3, gy);
        ctx.arc(gx, gy, 1.3, 0, Math.PI * 2);
      }
    }
  }
  ctx.fill();

  const map = new THREE.CanvasTexture(c);
  map.flipY = false;
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = GPU_PROFILE.maxAnisotropy;
  return { map, bumpMap: map };
}

/** OMEGA-14: Zero-DOM 128x128 12-layer copper + FR-4 laminate cross-section DataTexture */
function createPcbLaminateEdgeTexture(): THREE.DataTexture {
  const size = NATIVE_TILE_TEX_SIZE;
  const data = new Uint8Array(size * size * 4);
  const copperRows = new Uint8Array(size);
  const bandH = Math.max(3, Math.round(size / 42));
  for (let i = 0; i < 12; i++) {
    const y0 = Math.round(size * 0.05 + (i / 11) * (size * 0.88));
    for (let dy = 0; dy < bandH && y0 + dy < size; dy++) copperRows[size - 1 - (y0 + dy)] = 1;
  }
  for (let y = 0; y < size; y++) {
    const isCu = copperRows[y] === 1;
    const r = isCu ? 212 : 92;
    const g = isCu ? 134 : 88;
    const b = isCu ? 75 : 56;
    const row = y * size * 4;
    for (let x = 0; x < size; x++) {
      const o = row + x * 4;
      data[o] = r;
      data[o + 1] = g;
      data[o + 2] = b;
      data[o + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Procedural 0.64-inch 9.44M-dot Quad-XGA Tandem Micro-OLED (OLEDoS) viewfinder display texture.
 */
function createOledViewfinderTexture(): THREE.CanvasTexture {
  const { canvas: c, ctx, w, h } = createScaledCanvas(640, 480, 0.5);

  ctx.fillStyle = '#020408';
  ctx.fillRect(0, 0, w, h);

  const vx = 24;
  const vy = 42;
  const vw = w - 48;
  const vh = 392;

  // DCI-P3 4,000-nit HDR golden-hour alpine twilight sky
  const sky = ctx.createLinearGradient(vx, vy, vx, vy + vh * 0.68);
  sky.addColorStop(0.0, '#07153d');
  sky.addColorStop(0.28, '#1d4ed8');
  sky.addColorStop(0.56, '#6d28d9');
  sky.addColorStop(0.80, '#e11d48');
  sky.addColorStop(0.94, '#fb923c');
  sky.addColorStop(1.0, '#fde047');
  ctx.fillStyle = sky;
  ctx.fillRect(vx, vy, vw, vh * 0.68);

  // Subtle HDR cirrus cloud strata catching sunset rim light
  ctx.fillStyle = 'rgba(253, 186, 116, 0.22)';
  for (let i = 0; i < 4; i++) {
    const cy = vy + 46 + i * 32;
    ctx.beginPath();
    ctx.ellipse(vx + vw * (0.28 + i * 0.14), cy, 96 - i * 12, 9, -0.05, 0, Math.PI * 2);
    ctx.fill();
  }

  // Intense 4,000-nit HDR solar specular disc + atmospheric corona
  const sunX = vx + vw * 0.62;
  const sunY = vy + vh * 0.44;
  const sunGlow = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, 145);
  sunGlow.addColorStop(0.0, '#ffffff');
  sunGlow.addColorStop(0.14, '#fef9c3');
  sunGlow.addColorStop(0.38, 'rgba(251, 146, 60, 0.64)');
  sunGlow.addColorStop(0.75, 'rgba(244, 63, 94, 0.18)');
  sunGlow.addColorStop(1.0, 'rgba(244, 63, 94, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(vx, vy, vw, vh * 0.72);

  // Alpine lake water reflection
  const lakeY = vy + vh * 0.68;
  const lakeH = vh * 0.32;
  const lake = ctx.createLinearGradient(vx, lakeY, vx, lakeY + lakeH);
  lake.addColorStop(0.0, '#fb923c');
  lake.addColorStop(0.28, '#6366f1');
  lake.addColorStop(0.65, '#1e1b4b');
  lake.addColorStop(1.0, '#070c1a');
  ctx.fillStyle = lake;
  ctx.fillRect(vx, lakeY, vw, lakeH);

  // Distant snowy mountain range silhouette with sunlit crest highlights
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(vx, lakeY);
  ctx.lineTo(vx + vw * 0.14, vy + vh * 0.48);
  ctx.lineTo(vx + vw * 0.28, vy + vh * 0.56);
  ctx.lineTo(vx + vw * 0.46, vy + vh * 0.32);
  ctx.lineTo(vx + vw * 0.60, vy + vh * 0.52);
  ctx.lineTo(vx + vw * 0.79, vy + vh * 0.37);
  ctx.lineTo(vx + vw * 0.92, vy + vh * 0.50);
  ctx.lineTo(vx + vw, vy + vh * 0.46);
  ctx.lineTo(vx + vw, lakeY);
  ctx.closePath();
  ctx.fill();

  // Golden rim highlights along right-facing mountain ridges facing the sun
  ctx.strokeStyle = 'rgba(253, 224, 71, 0.55)';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(vx + vw * 0.46, vy + vh * 0.32);
  ctx.lineTo(vx + vw * 0.54, vy + vh * 0.44);
  ctx.moveTo(vx + vw * 0.79, vy + vh * 0.37);
  ctx.lineTo(vx + vw * 0.71, vy + vh * 0.46);
  ctx.stroke();

  // Foreground dark mountain ridge
  ctx.fillStyle = '#090e1c';
  ctx.beginPath();
  ctx.moveTo(vx, lakeY);
  ctx.lineTo(vx + vw * 0.22, vy + vh * 0.55);
  ctx.lineTo(vx + vw * 0.40, vy + vh * 0.62);
  ctx.lineTo(vx + vw * 0.68, vy + vh * 0.54);
  ctx.lineTo(vx + vw * 0.88, vy + vh * 0.60);
  ctx.lineTo(vx + vw, vy + vh * 0.57);
  ctx.lineTo(vx + vw, lakeY);
  ctx.closePath();
  ctx.fill();

  // Shimmering solar reflection ripples on alpine lake
  ctx.fillStyle = 'rgba(254, 240, 138, 0.52)';
  for (let i = 0; i < 11; i++) {
    const wy = lakeY + 6 + i * 10;
    const ww = 98 - i * 6.5;
    ctx.fillRect(sunX - ww * 0.5 + Math.sin(i * 1.9) * 8, wy, ww, 2.4);
  }

  // Rule-of-thirds composition grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 1; i <= 2; i++) {
    const gx = vx + (vw / 3) * i;
    ctx.moveTo(gx, vy);
    ctx.lineTo(gx, vy + vh);
    const gy = vy + (vh / 3) * i;
    ctx.moveTo(vx, gy);
    ctx.lineTo(vx + vw, gy);
  }
  ctx.stroke();

  // 4-corner white framing brackets
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.90)';
  ctx.lineWidth = 2.4;
  const br = 22;
  const corners = [
    [vx + 10, vy + 10, 1, 1],
    [vx + vw - 10, vy + 10, -1, 1],
    [vx + 10, vy + vh - 10, 1, -1],
    [vx + vw - 10, vy + vh - 10, -1, -1],
  ];
  ctx.beginPath();
  for (const [cx, cy, dx, dy] of corners) {
    ctx.moveTo(cx, cy + dy * br);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * br, cy);
  }
  ctx.stroke();

  // Dual-axis emerald digital horizon & pitch electronic spirit level
  const midX = vx + vw * 0.5;
  const midY = vy + vh * 0.5;
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(midX - 58, midY);
  ctx.lineTo(midX - 20, midY);
  ctx.moveTo(midX + 20, midY);
  ctx.lineTo(midX + 58, midY);
  ctx.arc(midX, midY, 16, -0.35, 0.35);
  ctx.moveTo(midX - 16 * Math.cos(0.35), midY - 16 * Math.sin(0.35));
  ctx.arc(midX, midY, 16, Math.PI - 0.35, Math.PI + 0.35);
  ctx.stroke();

  // Eye-Control AF glowing cyan gaze reticle + real-time subject lock tracking frame
  const afX = vx + vw * 0.46;
  const afY = vy + vh * 0.35;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.arc(afX, afY, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(244, 114, 182, 0.85)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(afX, afY, 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(afX - 32, afY - 24, 64, 48);
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(afX, afY, 3.6, 0, Math.PI * 2);
  ctx.fill();

  // Top telemetry bar icons (pure sharp geometric HUD icons — battery, dual card slots, 240fps/HDR badge)
  // Top-left battery gauge
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2.0;
  ctx.strokeRect(vx + 6, 12, 34, 16);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(vx + 40, 16, 4, 8);
  ctx.fillStyle = '#34d399';
  for (let b = 0; b < 4; b++) ctx.fillRect(vx + 9 + b * 7, 15, 5, 10);
  // Top-right dual card slot & IBIS icons
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(vx + vw - 52, 11, 16, 19);
  ctx.strokeRect(vx + vw - 30, 11, 16, 19);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(vx + vw - 48, 15, 8, 11);

  // Bottom HUD bar: live luminance histogram (right) + exposure EV meter dots (center) + aperture/shutter bars (left)
  const hx = vx + vw - 114;
  const hy = h - 35;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.fillRect(hx, hy, 106, 25);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
  ctx.lineWidth = 1;
  ctx.strokeRect(hx, hy, 106, 25);
  ctx.fillStyle = 'rgba(226, 232, 240, 0.88)';
  ctx.beginPath();
  ctx.moveTo(hx + 2, hy + 23);
  for (let i = 0; i <= 26; i++) {
    const t = i / 26;
    const amp =
      Math.exp(-Math.pow((t - 0.30) / 0.17, 2)) * 18 +
      Math.exp(-Math.pow((t - 0.72) / 0.14, 2)) * 15;
    ctx.lineTo(hx + 2 + t * 102, hy + 23 - amp);
  }
  ctx.lineTo(hx + 104, hy + 23);
  ctx.closePath();
  ctx.fill();

  // Bottom-center EV scale dots (-3 .. 0 .. +3)
  for (let i = -5; i <= 5; i++) {
    ctx.fillStyle = i === 0 ? '#34d399' : Math.abs(i) === 3 ? '#facc15' : 'rgba(226, 232, 240, 0.55)';
    const r = i === 0 ? 3.8 : Math.abs(i) === 3 ? 2.6 : 1.8;
    ctx.beginPath();
    ctx.arc(w * 0.5 + i * 14, h - 22, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // Bottom-left geometric shutter/aperture/ISO indicator pills
  ctx.fillStyle = 'rgba(248, 250, 252, 0.78)';
  ctx.fillRect(vx + 6, h - 27, 46, 9);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(vx + 60, h - 27, 34, 9);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(vx + 102, h - 27, 38, 9);

  // Subtle 9.44M-dot OLED sub-pixel matrix lattice shimmer
  ctx.fillStyle = 'rgba(255, 255, 255, 0.045)';
  for (let x = vx; x < vx + vw; x += 6) {
    ctx.fillRect(x, vy, 1.2, vh);
  }
  for (let y = vy; y < vy + vh; y += 6) {
    ctx.fillRect(vx, y, vw, 1.2);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = GPU_PROFILE.maxAnisotropy;
  return tex;
}

/**
 * Procedural fine pebble-grain elastomer camera grip leatherette texture (direct 128x128 tile).
 */
function createLeatheretteTexture(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const { canvas: c, ctx, w: s } = createScaledCanvas(128, 128, 1.0, true);

  ctx.fillStyle = '#1b1d22';
  ctx.fillRect(0, 0, s, s);

  let seed = 4219;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const shades = ['#22242a', '#2b2d34', '#35373f'];
  for (let b = 0; b < 3; b++) {
    ctx.fillStyle = shades[b];
    ctx.beginPath();
    for (let i = 0; i < 110; i++) {
      const x = rand() * s;
      const y = rand() * s;
      const r = 1.0 + rand() * 1.9;
      ctx.moveTo(x + r, y);
      ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  const map = new THREE.CanvasTexture(c);
  map.flipY = false;
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(3, 3);
  return { map, bumpMap: map };
}

/**
 * Procedural monochrome top-deck sub-status OLED texture.
 */
function createTopStatusOledTexture(): THREE.CanvasTexture {
  const { canvas: c, ctx, w, h } = createScaledCanvas(256, 160, 0.75, true);

  ctx.fillStyle = '#070a10';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.strokeRect(8, 8, w - 16, h - 16);

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 3;
  ctx.strokeRect(178, 22, 54, 24);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(232, 28, 6, 12);
  ctx.fillStyle = '#34d399';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(184 + i * 11, 27, 8, 14);
  }

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.arc(44, 46, 20, 0, Math.PI * 2);
  ctx.moveTo(52, 46);
  ctx.arc(44, 46, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(92 + i * 13, 56 - i * 7, 8, 12 + i * 7);
  }

  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue;
    const cx = w / 2 + i * 18;
    ctx.moveTo(cx + 3.0, 118);
    ctx.arc(cx, 118, 3.0, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.fillStyle = '#34d399';
  ctx.beginPath();
  ctx.arc(w / 2, 118, 5.5, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(c);
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Lightweight zero-canvas sentinel tag for CNC brushed steel micro-bump */
function createCncBrushedMetalTexture(): THREE.Texture {
  const tex = new THREE.Texture();
  tex.name = 'cnc-brushed-bump-sentinel';
  return tex;
}

/** Lightweight zero-canvas sentinel tag for bead-blasted AZ91D magnesium grain bump */
function createMagnesiumGrainTexture(): THREE.Texture {
  const tex = new THREE.Texture();
  tex.name = 'mg-grain-bump-sentinel';
  return tex;
}

/** OMEGA-14: Zero-DOM 128x128 200um-pitch SmFeN multi-pole Vernier magnetic scale DataTexture */
function createMagneticScaleTexture(): THREE.DataTexture {
  const s = NATIVE_TILE_TEX_SIZE;
  const data = new Uint8Array(s * s * 4);
  for (let y = 0; y < s; y++) {
    const row = y * s * 4;
    const band = Math.floor(y / 4);
    const even = (band & 1) === 0;
    const subY = y & 3;
    for (let x = 0; x < s; x++) {
      let r = 30, g = 36, b = 48;
      if (x <= 2 || x >= s - 3 || y <= 1 || y >= s - 2) {
        r = 148; g = 163; b = 184;
      } else if (x >= 10 && x < s - 10) {
        if (subY < 2) {
          if (even) { r = 71; g = 85; b = 105; }
          else { r = 15; g = 23; b = 42; }
        } else if (subY === 2 && x < 28) {
          if (even) { r = 56; g = 189; b = 248; }
          else { r = 245; g = 158; b = 11; }
        }
      }
      const o = row + x * 4;
      data[o] = r;
      data[o + 1] = g;
      data[o + 2] = b;
      data[o + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, s, s, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 3);
  tex.needsUpdate = true;
  return tex;
}

/** OMEGA-14: Zero-DOM 128x128 crossed polarizer + RGB wide-gamut optical micro-lattice DataTexture */
function createPolarizerLatticeTexture(): THREE.DataTexture {
  const s = NATIVE_TILE_TEX_SIZE;
  const data = new Uint8Array(s * s * 4);
  const rgbCols = [
    [106, 43, 52],
    [24, 97, 63],
    [34, 68, 127],
  ];
  for (let y = 0; y < s; y++) {
    const row = y * s * 4;
    for (let x = 0; x < s; x++) {
      let r = 16, g = 24, b = 40;
      const m6 = x % 6;
      if (m6 < 4) {
        const c = rgbCols[Math.floor(x / 6) % 3];
        r = c[0]; g = c[1]; b = c[2];
      }
      if (((x - y + 256) % 12) === 0) {
        r = Math.min(255, r + 28);
        g = Math.min(255, g + 28);
        b = Math.min(255, b + 28);
      }
      const o = row + x * 4;
      data[o] = r;
      data[o + 1] = g;
      data[o + 2] = b;
      data[o + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, s, s, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 3);
  tex.needsUpdate = true;
  return tex;
}

/** Procedural hexagonal On-Chip Micro-Lens Array (MLA) over Sony symmetrical OCCF RGB sub-pixels */
function createHexMlaTexture(): THREE.CanvasTexture {
  const { canvas: c, ctx, w: s } = createScaledCanvas(256, 256, 1.0, true);
  ctx.fillStyle = '#0c1f35';
  ctx.fillRect(0, 0, s, s);
  const step = 20;
  const rowH = step * 0.866;
  const subColors = ['#f43f5e', '#10b981', '#38bdf8'];
  for (let r = -1; r < s / rowH + 2; r++) {
    for (let col = -1; col < s / step + 2; col++) {
      const cx = col * step + (r % 2 === 0 ? 0 : step * 0.5);
      const cy = r * rowH;
      const rad = step * 0.48;
      // Symmetrical Sony OCCF RGB sub-pixel tint glowing softly beneath each hexagonal micro-lens dome
      const subTint = subColors[(((col + r) % 3) + 3) % 3];
      const grad = ctx.createRadialGradient(cx - rad * 0.25, cy - rad * 0.25, rad * 0.08, cx, cy, rad);
      grad.addColorStop(0.0, '#f0f9ff');
      grad.addColorStop(0.32, '#bae6fd');
      grad.addColorStop(0.70, subTint);
      grad.addColorStop(1.0, '#0f2942');
      ctx.fillStyle = grad;
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k * Math.PI) / 3 + Math.PI / 6;
        const px = cx + Math.cos(a) * rad;
        const py = cy + Math.sin(a) * rad;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.42)';
      ctx.lineWidth = 0.85;
      ctx.stroke();

      // Specular apex glint on each micro-lens dome
      ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
      ctx.beginPath();
      ctx.arc(cx - rad * 0.24, cy - rad * 0.24, rad * 0.19, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 4);
  return tex;
}

/** Procedural 3rd-Wafer Stacked DRAM & TSV Micro-Bump Lithography Texture */
function createTsvDramTexture(): THREE.CanvasTexture {
  const { canvas: c, ctx, w: s } = createScaledCanvas(512, 512, 0.5);
  ctx.fillStyle = '#0c1629';
  ctx.fillRect(0, 0, s, s);
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
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let ly = y0 + 8; ly < y0 + 214; ly += 10) {
        ctx.moveTo(x0 + 4, ly);
        ctx.lineTo(x0 + 102, ly);
      }
      ctx.stroke();
      ctx.strokeStyle = '#d97736';
      ctx.lineWidth = 2;
      ctx.strokeRect(x0, y0, 106, 218);
    }
  }
  ctx.fillStyle = '#e6b85c';
  ctx.beginPath();
  for (let vx = 24; vx < s - 24; vx += 14) {
    ctx.moveTo(vx + 3.2, s / 2);
    ctx.arc(vx, s / 2, 3.2, 0, Math.PI * 2);
  }
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = GPU_PROFILE.maxAnisotropy;
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
    bumpMap: mgGrainTex,
    bumpScale: 0.018,
    metalness: 0.04,
    roughness: 0.88,
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

  const ultra = createUltraRealisticMaterials(clippingPlanes);
  allMaterials.push(...ultra.list);

  // Tag procedural micro-bump channels so GpuMegaBatch folds all 287 bump-mapped meshes
  // directly into ONE single Opaque LUT draw call with screen-space dual-channel bump!
  // Also eliminate redundant duplicate bumpMap shader permutations on dynamic parts.
  for (const mat of allMaterials) {
    const std = mat as THREE.MeshStandardMaterial;
    if (std.bumpMap === cncBrushedTex) {
      mat.userData.bumpChannel = 1;
    } else if (std.bumpMap === mgGrainTex) {
      mat.userData.bumpChannel = 2;
    } else if (std.bumpMap && (std.bumpMap === std.map || std.bumpMap === std.roughnessMap)) {
      // Avoid compiling a separate USE_BUMPMAP shader permutation when map/roughnessMap already conveys surface detail
      std.bumpMap = null;
    }
  }

  // Optimize procedural texture VRAM & GLSL shader permutations automatically
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
      ultra.batHologramFoil,
      ultra.bionzDieFloorplan,
      ultra.micMemsSiliconDiaphragm,
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
    ultra,
    allMaterials,
  };
}
