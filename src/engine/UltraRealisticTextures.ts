import * as THREE from 'three';
import {
  GPU_PROFILE,
  NATIVE_HI_TEX_H,
  NATIVE_HI_TEX_W,
  NATIVE_TILE_TEX_SIZE,
} from './GpuOptimizer';
import { BionzHeroMaterials, createBionzHeroMaterials } from './BionzHeroTextures';

export interface UltraRealisticMaterials extends Omit<BionzHeroMaterials, 'heroList'> {
  // BIONZ XR / XR2 bespoke materials
  bionzEmiLid: THREE.MeshPhysicalMaterial;
  bionzPopDramTop: THREE.MeshPhysicalMaterial;
  bionzDieFloorplan: THREE.MeshPhysicalMaterial;
  bionzIpDieTile: THREE.MeshPhysicalMaterial;
  bionzCetusDie: THREE.MeshPhysicalMaterial;
  bionzAbfSubstrate: THREE.MeshPhysicalMaterial;
  bionzBtCore: THREE.MeshStandardMaterial;
  // Internal Microphone bespoke materials
  micDeadcatFur: THREE.MeshStandardMaterial;
  micTopDeckMg: THREE.MeshPhysicalMaterial;
  micStainlessWovenMesh: THREE.MeshPhysicalMaterial;
  micEptfeMembrane: THREE.MeshStandardMaterial;
  micMemsFaradayLid: THREE.MeshPhysicalMaterial;
  micMemsSiliconDiaphragm: THREE.MeshPhysicalMaterial;
  micSh1035Flex: THREE.MeshPhysicalMaterial;
  micRubberBootBlack: THREE.MeshStandardMaterial;
  micAcousticFelt: THREE.MeshStandardMaterial;
  micEcmJfetPcb: THREE.MeshStandardMaterial;
  micGreenJackCollar: THREE.MeshPhysicalMaterial;
  // Sony NP-FZ100 Battery Pack bespoke materials
  batPolycarbonateShell: THREE.MeshPhysicalMaterial;
  batFrontLabel: THREE.MeshPhysicalMaterial;
  batHologramFoil: THREE.MeshPhysicalMaterial;
  batRearLaser: THREE.MeshPhysicalMaterial;
  batCellWrapGreen: THREE.MeshPhysicalMaterial;
  batBmsPcb: THREE.MeshPhysicalMaterial;
  batElectrodeCoating: THREE.MeshStandardMaterial;
  batSocLedGlow: THREE.MeshPhysicalMaterial;
  // Sony CFexpress 4.0 Type A TOUGH bespoke materials
  cfeTopArmorShell: THREE.MeshPhysicalMaterial;
  cfeBackplateLaser: THREE.MeshPhysicalMaterial;
  cfeHdiPcb: THREE.MeshPhysicalMaterial;
  cfeControllerPkg: THREE.MeshPhysicalMaterial;
  cfeNandPkg: THREE.MeshPhysicalMaterial;
  cfeCopperThermal: THREE.MeshPhysicalMaterial;
  cfeBiCS10WaferDie: THREE.MeshPhysicalMaterial;
  cfeGlassWeaveCore: THREE.MeshPhysicalMaterial;
  cfeMolyWordlineMetal: THREE.MeshPhysicalMaterial;
  cfePqcSecurityDie: THREE.MeshPhysicalMaterial;
  cfeQuantumChargeTrapStack: THREE.MeshPhysicalMaterial;
  cfeSolderImcMicrostructure: THREE.MeshPhysicalMaterial;
  cfeSerdesEyeDiagramDie: THREE.MeshPhysicalMaterial;
  cfeFerroelectricHzoCrystal: THREE.MeshPhysicalMaterial;
  // Shared ultra-realistic IC molding compound
  icEpoxyLaser: THREE.MeshPhysicalMaterial;
  // Phase 28: Pixel V2 & BIONZ XR V2 Ultra-Microscopic Nanoscale Materials (2026)
  v2PixelMetasurface: THREE.MeshPhysicalMaterial;
  v2PixelSiLattice: THREE.MeshPhysicalMaterial;
  v2PixelHybridBondCu: THREE.MeshPhysicalMaterial;
  v2PixelAiCircuit: THREE.MeshPhysicalMaterial;
  v2BionzGaaNanosheet: THREE.MeshPhysicalMaterial;
  v2BionzSramArray: THREE.MeshPhysicalMaterial;
  v2BionzBacksidePdn: THREE.MeshPhysicalMaterial;
  v2BionzGlassCoreTgv: THREE.MeshPhysicalMaterial;
  // Phase 29: Sub-Nanometer Perovskite, Deuterium Si-D, 2D TMD Honeycomb & Microfluidic Cooler Materials
  v2PixelPerovskiteStack: THREE.MeshPhysicalMaterial;
  v2PixelDeuteriumInterface: THREE.MeshPhysicalMaterial;
  v2Bionz2dTmdLattice: THREE.MeshPhysicalMaterial;
  v2BionzMicrofluidicGrid: THREE.MeshPhysicalMaterial;
  // Phase 30: Full-Frame Image Sensor & 5-Axis IBIS Bespoke Ultra-CAD Materials (S01-S90)
  sensorCuCuHybrid: THREE.MeshPhysicalMaterial;
  sensorLogicAdcDie: THREE.MeshPhysicalMaterial;
  sensorDramDie: THREE.MeshPhysicalMaterial;
  sensorHtccCeramic: THREE.MeshStandardMaterial;
  sensorSlvsFlex: THREE.MeshPhysicalMaterial;
  sensorOemFlexIsl: THREE.MeshPhysicalMaterial;
  sensorDraQrPlate: THREE.MeshPhysicalMaterial;
  sensorOpticalScale: THREE.MeshPhysicalMaterial;
  sensorHalbachMagnet: THREE.MeshPhysicalMaterial;
  sensorWasherMarking: THREE.MeshPhysicalMaterial;
  sensorPztStack: THREE.MeshStandardMaterial;
  sensorPyroGraphite: THREE.MeshPhysicalMaterial;
  sensorEptfeVent: THREE.MeshStandardMaterial;
  // Phase 30: Battery 2026 Si-C/NMC/EIS & Microphone 2026 Optical/32-bit/Acoustic UHD PBR Materials
  batSiCNanoScaffold: THREE.MeshPhysicalMaterial;
  batSingleCrystalNmc: THREE.MeshPhysicalMaterial;
  batEisNyquistDie: THREE.MeshPhysicalMaterial;
  micOpticalInterferometer: THREE.MeshPhysicalMaterial;
  micAudioDsp32Float: THREE.MeshPhysicalMaterial;
  micAcousticDelayCloth: THREE.MeshPhysicalMaterial;
  // Phase 31: BIONZ XR / XR2 Semiconductor Package Forensic Ultra-CAD Materials (XR01-XR46)
  bionzIhsNickelCu: THREE.MeshPhysicalMaterial;
  bionzIndiumStim: THREE.MeshPhysicalMaterial;
  bionzLpddr5xDie: THREE.MeshPhysicalMaterial;
  bionzPopInterposer: THREE.MeshPhysicalMaterial;
  bionzEmcSilica: THREE.MeshStandardMaterial;
  bionzAbfBottomSr: THREE.MeshPhysicalMaterial;
  bionzFeolFinfet: THREE.MeshPhysicalMaterial;
  bionzBeolDamascene: THREE.MeshPhysicalMaterial;
  bionzLsiBridge: THREE.MeshPhysicalMaterial;
  bionzCufSilica: THREE.MeshPhysicalMaterial;
  bionzEsicapDie: THREE.MeshPhysicalMaterial;
  bionzPmicIc: THREE.MeshPhysicalMaterial;
  bionzInductorR47: THREE.MeshStandardMaterial;
  bionzTcxoGoldLid: THREE.MeshPhysicalMaterial;
  bionzNorFlashIc: THREE.MeshPhysicalMaterial;
  bionzHdmiRetimerIc: THREE.MeshPhysicalMaterial;
  // Phase 31: Battery 2026 Sulfide Argyrodite & FBG Optical + Microphone 2D Graphene & Acoustic Metamaterial UHD PBR Materials
  batSulfideArgyrodite: THREE.MeshPhysicalMaterial;
  batFiberBraggOptical: THREE.MeshPhysicalMaterial;
  micGrapheneHexMembrane: THREE.MeshPhysicalMaterial;
  micSpiralMetamaterial: THREE.MeshPhysicalMaterial;
  // Phase 30: Sensor Manufacturing Process (Fab Vol.0) Cleanroom, 300mm Wafer, Photomask & CP Yield Materials
  fabWafer300mmDieMap: THREE.MeshPhysicalMaterial;
  fabQuartzReticleMask: THREE.MeshPhysicalMaterial;
  fabCleanroomProcessDeck: THREE.MeshPhysicalMaterial;
  fabWaferBinningMap: THREE.MeshPhysicalMaterial;
  // Phase 31: Electronic Viewfinder (EVF) & Eye-Control AF Bespoke Ultra-CAD Materials (E01-E55)
  evfOledBackplaneQr: THREE.MeshPhysicalMaterial;
  evfOledSiliconFront: THREE.MeshPhysicalMaterial;
  evfTandemCavityStack: THREE.MeshPhysicalMaterial;
  evfTconPcb: THREE.MeshPhysicalMaterial;
  evfTconEmiCan: THREE.MeshPhysicalMaterial;
  evfOemFlexRibbon: THREE.MeshPhysicalMaterial;
  evfMipiShieldMesh: THREE.MeshPhysicalMaterial;
  evfVfRadiationSheet: THREE.MeshStandardMaterial;
  evfGazeNirDie: THREE.MeshPhysicalMaterial;
  evfDiopterDialCap: THREE.MeshPhysicalMaterial;
  evfFinderCoverMold: THREE.MeshStandardMaterial;
  evfShimEtchedBrass: THREE.MeshPhysicalMaterial;
  evfZeoliteBeadBed: THREE.MeshStandardMaterial;
  evfAmbientRgbDie: THREE.MeshPhysicalMaterial;
  // Phase 31: Sensor Manufacturing Process (Fab Vol.1) Exhibition Deck & 4-Size Wafer Yield Maps
  fab1ArchExhibitionDeck: THREE.MeshPhysicalMaterial;
  fab1WaferSmartphone640: THREE.MeshPhysicalMaterial;
  fab1WaferApsc134: THREE.MeshPhysicalMaterial;
  fab1WaferMediumFormat26: THREE.MeshPhysicalMaterial;
  // Phase 31: Extreme Micro-Detail Full-Frame Sensor & 5-Axis IBIS Materials (S01-S90)
  sensorMgDieCast: THREE.MeshPhysicalMaterial;
  sensorVcmCopperWinding: THREE.MeshPhysicalMaterial;
  sensorSoftIronYoke: THREE.MeshPhysicalMaterial;
  sensorOpticalFilterCoating: THREE.MeshPhysicalMaterial;
  sensorTimSiliconeWaffle: THREE.MeshPhysicalMaterial;
  sensorEmiShieldNickel: THREE.MeshPhysicalMaterial;
  sensorCarbonCurtainWeave: THREE.MeshPhysicalMaterial;
  sensorEndLiquidCrystal: THREE.MeshPhysicalMaterial;
  sensorPeltierCeramic: THREE.MeshPhysicalMaterial;
  sensorLgaBallGrid: THREE.MeshPhysicalMaterial;
  sensorVelvetBaffle: THREE.MeshStandardMaterial;
  sensorHallSubPcb: THREE.MeshPhysicalMaterial;
  sensorCuWAlloySinter: THREE.MeshPhysicalMaterial;
  sensorSusSpringSteel: THREE.MeshPhysicalMaterial;
  sensorMemsTcxoLid: THREE.MeshPhysicalMaterial;
  sensorFiducialTarget: THREE.MeshPhysicalMaterial;
  // Phase 32: Sensor Manufacturing Process (Fab Vol.2) Sand-to-Epi-Wafer PBR Materials
  fab2Phase1PlantDeck: THREE.MeshPhysicalMaterial;
  fab2IngotVgCrystalMap: THREE.MeshPhysicalMaterial;
  fab2LpdDefectMap: THREE.MeshPhysicalMaterial;
  fab2NanotopoMap: THREE.MeshPhysicalMaterial;
  // Phase 33: Sensor Manufacturing Process (Fab Vol.3) Design Studio & Photomask Fab PBR Materials
  fab3Phase2StudioDeck: THREE.MeshPhysicalMaterial;
  fab3OpcSerifMask: THREE.MeshPhysicalMaterial;
  fab3StitchVsSingleReticle: THREE.MeshPhysicalMaterial;
  fab3ChipLayoutOasis: THREE.MeshPhysicalMaterial;
  fab3MaskCdMap: THREE.MeshPhysicalMaterial;
  fab3BossungWindowMap: THREE.MeshPhysicalMaterial;
  // Phase 34: Sensor Manufacturing Process (Fab Vol.4) Pixel FEOL 380-Step PBR Materials
  fab4Phase3FeolDeck: THREE.MeshPhysicalMaterial;
  fab4RgbAbsorptionProfile: THREE.MeshPhysicalMaterial;
  fab4FdtiWallCrossSection: THREE.MeshPhysicalMaterial;
  fab4DualPixelSplitProfile: THREE.MeshPhysicalMaterial;
  fab4PpdPinningBarrier: THREE.MeshPhysicalMaterial;
  fab4SalicideBlockSplit: THREE.MeshPhysicalMaterial;
  // Phase 35: CFexpress 4.0 Type A Top-20 Hero Parts Ultra-HD Bespoke PBR Materials
  cfeHdiPcbRear: THREE.MeshPhysicalMaterial;
  cfeToughResinMold: THREE.MeshPhysicalMaterial;
  cfeHardGoldFingers: THREE.MeshPhysicalMaterial;
  cfeLpddr4Pkg: THREE.MeshPhysicalMaterial;
  cfeCopperSpreaderHero: THREE.MeshPhysicalMaterial;
  cfeTimSiliconeWaffle: THREE.MeshPhysicalMaterial;
  cfePyroGraphiteSheet: THREE.MeshPhysicalMaterial;
  cfeEmiShieldCan: THREE.MeshPhysicalMaterial;
  cfeMicroVaporWick: THREE.MeshPhysicalMaterial;
  cfeMrwg3CncAluminum: THREE.MeshPhysicalMaterial;
  cfeInnerArmorCnc: THREE.MeshPhysicalMaterial;
  cfeComboSlotShell: THREE.MeshPhysicalMaterial;
  // Phase 36: Standalone Microphone 110-Part (MC01-MC110) Bespoke Ultra-HD PBR Materials
  micOemHolderResin: THREE.MeshPhysicalMaterial;
  micTeraoka631sTape: THREE.MeshStandardMaterial;
  micDrieSiliconBackplate: THREE.MeshPhysicalMaterial;
  micMemsAsicDie: THREE.MeshPhysicalMaterial;
  micCeramicLgaSubstrate: THREE.MeshPhysicalMaterial;
  micEcmSpunAluminum: THREE.MeshPhysicalMaterial;
  micEcmBrassBackplate: THREE.MeshPhysicalMaterial;
  micAudioMainPcb: THREE.MeshPhysicalMaterial;
  micCodecQfnPackage: THREE.MeshPhysicalMaterial;
  micStarGroundPcb: THREE.MeshPhysicalMaterial;
  micAiNpuDie: THREE.MeshPhysicalMaterial;
  micMiShoeDigitalFlex: THREE.MeshPhysicalMaterial;
  micScAlnPiezoDie: THREE.MeshPhysicalMaterial;
  micVpuCombDriveDie: THREE.MeshPhysicalMaterial;
  mic8CapsuleArrayFace: THREE.MeshPhysicalMaterial;
  micQuartzTcxoLid: THREE.MeshPhysicalMaterial;
  micUwbRfModule: THREE.MeshPhysicalMaterial;
  micBinauralHrtfMap: THREE.MeshPhysicalMaterial;
  micLufsMeterDisplay: THREE.MeshPhysicalMaterial;
  micBoschScallopSi: THREE.MeshPhysicalMaterial;
  micPhotonicMziDie: THREE.MeshPhysicalMaterial;
  micOemScrewSteel: THREE.MeshPhysicalMaterial;
  micMgBeadBlast: THREE.MeshPhysicalMaterial;
  // List for pre-packing & GPU optimization
  list: THREE.Material[];
}

function makeHiCanvas(
  baseW = 768,
  baseH = 768
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; w: number; h: number } {
  const cw = NATIVE_HI_TEX_W;
  const ch = NATIVE_HI_TEX_H;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.translate(0, ch);
  ctx.scale(cw / baseW, -ch / baseH);
  (canvas as unknown as { __ctx2d?: CanvasRenderingContext2D }).__ctx2d = ctx;
  return { canvas, ctx, w: baseW, h: baseH };
}

function makeTileCanvas(
  baseSize = 256
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; s: number } {
  const cw = NATIVE_TILE_TEX_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = cw;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.translate(0, cw);
  ctx.scale(cw / baseSize, -cw / baseSize);
  (canvas as unknown as { __ctx2d?: CanvasRenderingContext2D }).__ctx2d = ctx;
  return { canvas, ctx, s: baseSize };
}

function toHiTex(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = GPU_PROFILE.maxAnisotropy;
  return tex;
}

function toTileTex(canvas: HTMLCanvasElement, rx = 1, ry = 1): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(rx, ry);
  tex.anisotropy = GPU_PROFILE.maxAnisotropy;
  return tex;
}

/** Deterministic PRNG for repeatable industrial grain & DataMatrix patterns */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Draw crisp brushed metallic horizontal or vertical micro-streaks (batched into 2 fast Canvas paths!) */
function drawBrushedStreaks(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  vertical: boolean,
  count: number,
  seed: number,
  lightAlpha = 0.055,
  darkAlpha = 0.06
): void {
  const rng = mulberry32(seed);
  const half = Math.max(1, count >> 1);
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0; i < half; i++) {
      if (vertical) {
        ctx.rect(rng() * w, 0, 0.8 + rng() * 2.2, h);
      } else {
        ctx.rect(0, rng() * h, w, 0.8 + rng() * 2.2);
      }
    }
    ctx.fillStyle =
      pass === 0
        ? `rgba(255,255,255,${(lightAlpha * 0.82).toFixed(3)})`
        : `rgba(0,0,0,${(darkAlpha * 0.82).toFixed(3)})`;
    ctx.fill();
  }
}

/** Draw authentic fine silica-epoxy / matte polycarbonate VDI-27 micro-speckle (batched into 2 fast paths!) */
function drawMicroGrain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  count: number,
  seed: number,
  alpha = 0.06
): void {
  const rng = mulberry32(seed);
  const half = Math.max(1, count >> 1);
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0; i < half; i++) {
      const sz = 1.1 + rng() * 2.1;
      ctx.rect(rng() * w, rng() * h, sz, sz);
    }
    ctx.fillStyle = pass === 0 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${(alpha * 1.2).toFixed(3)})`;
    ctx.fill();
  }
}

/** Draw a sharp ECC-200 2D DataMatrix barcode with L-finder pattern & clock track */
function drawDataMatrix(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  cells: number,
  fg: string,
  bg: string | null,
  seed: number
): void {
  if (bg) {
    ctx.fillStyle = bg;
    ctx.fillRect(x - 4, y - 4, size + 8, size + 8);
  }
  const cell = size / cells;
  const rng = mulberry32(seed);
  ctx.fillStyle = fg;
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const isLeftSolid = c === 0;
      const isBotSolid = r === cells - 1;
      const isTopClock = r === 0 && c % 2 === 0;
      const isRightClock = c === cells - 1 && r % 2 === 1;
      const isData = r > 0 && r < cells - 1 && c > 0 && c < cells - 1 && rng() > 0.48;
      if (isLeftSolid || isBotSolid || isTopClock || isRightClock || isData) {
        ctx.fillRect(x + c * cell, y + r * cell, Math.ceil(cell), Math.ceil(cell));
      }
    }
  }
}

/** Draw a crisp cinema clapperboard VPG badge (e.g. VPG 800 / VPG 400) */
function drawVpgBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  rating: string,
  fg: string,
  bg: string
): void {
  ctx.save();
  ctx.strokeStyle = fg;
  ctx.fillStyle = bg;
  ctx.lineWidth = 3.2;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);

  // Diagonal clapper stripes along top bar
  const barH = h * 0.28;
  ctx.fillStyle = fg;
  ctx.fillRect(x, y, w, barH);
  ctx.fillStyle = bg;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    const sx = x + 10 + i * (w * 0.23);
    ctx.moveTo(sx, y);
    ctx.lineTo(sx + 12, y);
    ctx.lineTo(sx + 4, y + barH);
    ctx.lineTo(sx - 8, y + barH);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `800 ${Math.round(h * 0.44)}px "Arial Black", "Helvetica Neue", sans-serif`;
  ctx.fillText(rating, x + w * 0.5, y + barH + (h - barH) * 0.54);
  ctx.restore();
}

/** Draw WEEE crossed-out wheelie bin icon */
function drawWeeeBin(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.4;
  // Bin body
  ctx.strokeRect(cx - s * 0.32, cy - s * 0.32, s * 0.64, s * 0.62);
  // Lid
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.38, cy - s * 0.34);
  ctx.lineTo(cx + s * 0.38, cy - s * 0.34);
  ctx.stroke();
  // Wheel
  ctx.beginPath();
  ctx.arc(cx + s * 0.26, cy + s * 0.34, s * 0.1, 0, Math.PI * 2);
  ctx.fill();
  // Crossed X
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.48, cy - s * 0.44);
  ctx.lineTo(cx + s * 0.48, cy + s * 0.42);
  ctx.moveTo(cx + s * 0.48, cy - s * 0.44);
  ctx.lineTo(cx - s * 0.48, cy + s * 0.42);
  ctx.stroke();
  // Bottom solid bar
  ctx.fillRect(cx - s * 0.36, cy + s * 0.46, s * 0.72, s * 0.11);
  ctx.restore();
}

/** Draw circular recycling chase-arrows with Li-ion 20 label */
function drawLiIonRecycle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.6;
  for (let i = 0; i < 3; i++) {
    const a0 = (i * Math.PI * 2) / 3 - Math.PI / 2 + 0.18;
    const a1 = ((i + 1) * Math.PI * 2) / 3 - Math.PI / 2 - 0.24;
    ctx.beginPath();
    ctx.arc(cx, cy, r, a0, a1);
    ctx.stroke();
    const tipX = cx + Math.cos(a1) * r;
    const tipY = cy + Math.sin(a1) * r;
    ctx.beginPath();
    ctx.arc(tipX, tipY, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.font = `700 ${Math.round(r * 0.52)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Li-ion', cx, cy - r * 0.14);
  ctx.font = `700 ${Math.round(r * 0.44)}px sans-serif`;
  ctx.fillText('20', cx, cy + r * 0.34);
  ctx.restore();
}

// =============================================================================
// 1. BIONZ XR / XR2 PROCEDURAL TEXTURES (7 Upgraded Core + 16 Phase 31 Bespoke)
// =============================================================================

function createBionzEmiLidTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Tri-layer Amkor/ASE PVD sputtered 0.18um SUS / 3.80um Cu / 0.18um SUS conformal EMI alloy
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#444d5c');
  grad.addColorStop(0.20, '#6e7b8e');
  grad.addColorStop(0.42, '#4d5768');
  grad.addColorStop(0.66, '#7a879b');
  grad.addColorStop(0.84, '#566274');
  grad.addColorStop(1, '#3b4350');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 840, 101, 0.095, 0.095);
  drawBrushedStreaks(ctx, w, h, true, 180, 103, 0.036, 0.036);
  drawMicroGrain(ctx, w, h, 2200, 102, 0.044);

  // Subtle concentric CNC thermal-lapping reflection arcs + inner heat-sink TIM2 contact zone sheen
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.062)';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  for (let r = 54; r <= 354; r += 18) {
    ctx.moveTo(w * 0.5 + r, h * 0.5);
    ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
  }
  ctx.stroke();

  // Laser-ablated outer EMI compartment ground-trench moat exposing 3.80um Cu core sub-layer glint!
  ctx.strokeStyle = 'rgba(238, 244, 254, 0.62)';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, w - 60, h - 60);
  ctx.strokeStyle = 'rgba(14, 18, 24, 0.84)';
  ctx.lineWidth = 6;
  ctx.strokeRect(38, 38, w - 76, h - 76);
  ctx.strokeStyle = 'rgba(218, 136, 68, 0.62)'; // Gleaming exposed 3.80um Cu conductive sputter sub-layer!
  ctx.lineWidth = 2.6;
  ctx.strokeRect(43, 43, w - 86, h - 86);
  ctx.strokeStyle = 'rgba(220, 232, 246, 0.36)';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(56, 56, w - 112, h - 112);

  // Internal compartment laser-sputter isolation divider groove separating SoC & RF/Audio zones
  ctx.strokeStyle = 'rgba(18, 24, 34, 0.45)';
  ctx.setLineDash([16, 8]);
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(64, 412);
  ctx.lineTo(w - 64, 412);
  ctx.stroke();
  ctx.setLineDash([]);

  // Perimeter BGA coordinate index ticks & micro-stitching ground-via markers (A..AF / 1..32)
  ctx.fillStyle = 'rgba(232, 240, 250, 0.58)';
  for (let t = 88; t <= w - 88; t += 20) {
    const isMajor = (t - 88) % 80 === 0;
    const len = isMajor ? 14 : 9;
    ctx.fillRect(t, 14, 2.5, len);
    ctx.fillRect(t, h - 14 - len, 2.5, len);
    ctx.fillRect(14, t, len, 2.5);
    ctx.fillRect(w - 14 - len, t, len, 2.5);
  }
  ctx.fillStyle = 'rgba(224, 234, 246, 0.68)';
  ctx.font = '700 13px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const colIdx = ['A', 'E', 'J', 'N', 'T', 'Y', 'AC', 'AF'];
  const rowIdx = ['1', '5', '9', '13', '17', '21', '26', '32'];
  for (let i = 0; i < 8; i++) {
    const pos = 116 + i * 76;
    ctx.fillText(colIdx[i], pos, 68);
    ctx.fillText(rowIdx[i], 68, pos);
  }

  // Gold Pin-1 triangular chamfer fiducial & concentric AOI alignment ring (top-left)
  ctx.fillStyle = '#f2cc5a';
  ctx.beginPath();
  ctx.moveTo(82, 82);
  ctx.lineTo(148, 82);
  ctx.lineTo(82, 148);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(244, 248, 255, 0.84)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(112, 112, 23, 0, Math.PI * 2);
  ctx.stroke();

  // Authentic dual-pass YAG laser-etched Sony BIONZ XR / CXD90057 "Mira" / CXD90066GG XR2 typography
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 76px Georgia, "Times New Roman", serif';
  ctx.fillStyle = 'rgba(10, 14, 20, 0.56)';
  ctx.fillText('SONY', 175, 175);
  ctx.fillStyle = 'rgba(246, 250, 255, 0.97)';
  ctx.fillText('SONY', 172, 172);

  // Engraved Alpha cinnabar accent bar with specular bevel line
  ctx.fillStyle = 'rgba(232, 122, 48, 0.96)';
  ctx.fillRect(172, 218, 440, 7.5);
  ctx.fillStyle = 'rgba(255, 228, 190, 0.64)';
  ctx.fillRect(172, 218, 440, 2.2);

  ctx.font = '800 58px "Helvetica Neue", Arial, sans-serif';
  ctx.fillStyle = 'rgba(10, 14, 20, 0.52)';
  ctx.fillText('BIONZ XR', 175, 283);
  ctx.fillStyle = 'rgba(248, 252, 255, 0.97)';
  ctx.fillText('BIONZ XR', 172, 280);

  // Authentic OpenMemories + teardown part codes
  ctx.fillStyle = 'rgba(226, 236, 248, 0.94)';
  ctx.font = '700 28px "Courier New", monospace';
  ctx.fillText('CXD90057 / CXD90066GG', 172, 338);
  ctx.fillStyle = 'rgba(210, 222, 238, 0.90)';
  ctx.font = '600 25px "Courier New", monospace';
  ctx.fillText('MIRA+CETUS  PoP-LPDDR5X', 172, 378);

  // Secondary fab, process & IEEE-verified 0.18/3.80/0.18um SUS/Cu/SUS sputter telemetry block
  ctx.fillStyle = 'rgba(216, 228, 242, 0.86)';
  ctx.font = '600 21px "Courier New", monospace';
  ctx.fillText('JAPAN    2548K104-B2', 172, 446);
  ctx.fillText('AT&S ABF-GX-T31  4nm EUV', 172, 478);
  ctx.fillText('SUS/Cu/SUS .18/3.8/.18um', 172, 510);
  ctx.fillText('C2PA-RoT  XR2 AI-NPU', 172, 542);

  ctx.font = '600 17px "Courier New", monospace';
  ctx.fillStyle = 'rgba(198, 212, 230, 0.76)';
  ctx.fillText('SONY SEMICONDUCTOR SOLUTIONS  A1..AF32', 172, 608);

  // Crisp 16x16 ECC-200 2D DataMatrix barcode with quiet zone in lower-right
  drawDataMatrix(ctx, 520, 446, 152, 16, 'rgba(246, 250, 255, 0.95)', 'rgba(14, 20, 28, 0.76)', 90066);
  ctx.strokeStyle = 'rgba(230, 240, 252, 0.46)';
  ctx.lineWidth = 2;
  ctx.strokeRect(512, 438, 168, 168);

  // 3-corner laser AOI crosshairs
  ctx.strokeStyle = 'rgba(236, 244, 254, 0.72)';
  ctx.lineWidth = 2.2;
  for (const [cx, cy] of [
    [w - 96, 96],
    [96, h - 96],
    [w - 96, h - 96],
  ]) {
    ctx.beginPath();
    ctx.moveTo(cx - 20, cy);
    ctx.lineTo(cx + 20, cy);
    ctx.moveTo(cx, cy - 20);
    ctx.lineTo(cx, cy + 20);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  return toHiTex(canvas);
}

function createBionzPopDramTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Matte dark charcoal high-silica (88wt%) EMC transfer-mold epoxy compound
  ctx.fillStyle = '#171b23';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 4200, 201, 0.072);

  // Subtle shimmering fused-silica quartz filler micro-beads embedded in EMC
  const rng = mulberry32(204);
  ctx.fillStyle = 'rgba(192, 204, 220, 0.16)';
  for (let i = 0; i < 820; i++) {
    ctx.fillRect(rng() * w, rng() * h, 1.3 + rng() * 1.9, 1.3 + rng() * 1.9);
  }

  // Mold parting chamfer frame & left-side transfer-mold gate runner witness mark
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.34)';
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.fillStyle = 'rgba(128, 142, 160, 0.28)';
  ctx.fillRect(8, h * 0.43, 18, h * 0.14); // Mold gate vestige scar on -X edge

  // 2 recessed circular mold ejector-pin witness depressions with molded cavity codes
  const ejectors: Array<[number, number, string]> = [
    [w - 92, 92, 'A2'],
    [92, h - 92, 'M4'],
  ];
  for (const [ex, ey, cid] of ejectors) {
    ctx.fillStyle = 'rgba(7, 9, 13, 0.76)';
    ctx.beginPath();
    ctx.arc(ex, ey, 27, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(164, 178, 196, 0.38)';
    ctx.lineWidth = 2.6;
    ctx.stroke();
    ctx.fillStyle = 'rgba(156, 170, 188, 0.48)';
    ctx.font = '700 15px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(cid, ex, ey);
  }

  // Deep laser Pin-1 orientation crater & corner chamfer arrow (top-left)
  ctx.fillStyle = '#080b10';
  ctx.beginPath();
  ctx.arc(92, 92, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(232, 240, 250, 0.78)';
  ctx.lineWidth = 3.4;
  ctx.stroke();
  ctx.fillStyle = 'rgba(232, 240, 250, 0.82)';
  ctx.beginPath();
  ctx.moveTo(46, 46);
  ctx.lineTo(74, 46);
  ctx.lineTo(46, 74);
  ctx.closePath();
  ctx.fill();

  // Authentic Micron CSN-11 2-line FBGA laser marking (verified from Sony A7 V BIONZ XR2 teardown!)
  // Line 1: Micron oval M + 5-char date/die-rev/COO code (5NB47: yr 2025, wk N, rev B, COO 47)
  // Line 2: 5-char FBGA decoder code (D8DNH -> 8GB LPDDR5X-8533 4266MHz 4-die PoP!)
  ctx.save();
  ctx.strokeStyle = 'rgba(236, 242, 250, 0.92)';
  ctx.fillStyle = 'rgba(236, 242, 250, 0.94)';
  ctx.lineWidth = 5.6;
  ctx.beginPath();
  ctx.ellipse(208, 194, 64, 34, -0.26, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = '800 54px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', 208, 196);
  ctx.restore();

  ctx.fillStyle = 'rgba(236, 242, 250, 0.92)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 52px "Courier New", monospace';
  ctx.fillText('5NB47', 306, 194);
  ctx.font = '700 74px "Courier New", monospace';
  ctx.fillText('D8DNH', 142, 308);

  ctx.fillStyle = 'rgba(202, 216, 232, 0.86)';
  ctx.font = '600 28px "Courier New", monospace';
  ctx.fillText('LPDDR5X-8533  8GB PoP', 142, 386);
  ctx.fillText('MT62F2G32D8DR-023 WT', 142, 428);
  ctx.fillText('1β 4-DIE 4266MHz 0.5V', 142, 470);
  ctx.font = '600 22px "Courier New", monospace';
  ctx.fillStyle = 'rgba(170, 186, 206, 0.76)';
  ctx.fillText('FBGA-561  0.35mm TMV  TW', 142, 520);

  // Cutaway inspection quadrant calibration tick ruler along lower-right border
  ctx.strokeStyle = 'rgba(236, 244, 254, 0.48)';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(398, 398, 286, 286);
  for (let tk = 414; tk <= 670; tk += 24) {
    ctx.fillStyle = 'rgba(226, 236, 248, 0.45)';
    ctx.fillRect(tk, 390, 2, 8);
    ctx.fillRect(390, tk, 8, 2);
  }

  drawDataMatrix(ctx, 146, 566, 124, 14, 'rgba(236, 242, 250, 0.90)', null, 58847);

  return toHiTex(canvas);
}

function createBionzDieFloorplanTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Iridescent 4nm EUV bare-silicon crystalline wafer diffraction backdrop
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#09162c');
  bg.addColorStop(0.24, '#0f3852');
  bg.addColorStop(0.50, '#241958');
  bg.addColorStop(0.76, '#0d404c');
  bg.addColorStop(1, '#152342');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Outer dicing scribe street with inline Process Control Monitor (PCM) test-key micro-bars
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, w - 8, h - 8);
  ctx.fillStyle = 'rgba(203, 213, 225, 0.55)';
  for (let p = 88; p < w - 88; p += 46) {
    ctx.fillRect(p, 2, 18, 5);
    ctx.fillRect(p, h - 7, 18, 5);
    ctx.fillRect(2, p, 5, 18);
    ctx.fillRect(w - 7, p, 5, 18);
  }

  // Dual copper/gold crack-stop & moisture-guard seal rings with 45-degree octagonal stress-relief corners!
  const drawOctFrame = (inset: number, color: string, lw: number) => {
    const ch = 22;
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(inset + ch, inset);
    ctx.lineTo(w - inset - ch, inset);
    ctx.lineTo(w - inset, inset + ch);
    ctx.lineTo(w - inset, h - inset - ch);
    ctx.lineTo(w - inset - ch, h - inset);
    ctx.lineTo(inset + ch, h - inset);
    ctx.lineTo(inset, h - inset - ch);
    ctx.lineTo(inset, inset + ch);
    ctx.closePath();
    ctx.stroke();
  };
  drawOctFrame(12, '#d98a36', 8);
  drawOctFrame(24, '#f2c852', 4);

  // 4-corner ASML EUV lithography Box-in-Box & Vernier overlay alignment targets
  for (const [vx, vy] of [
    [36, 36],
    [w - 36, 36],
    [36, h - 36],
    [w - 36, h - 36],
  ]) {
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(vx - 11, vy - 11, 22, 22);
    ctx.strokeRect(vx - 5, vy - 5, 10, 10);
    ctx.beginPath();
    ctx.moveTo(vx - 14, vy);
    ctx.lineTo(vx + 14, vy);
    ctx.moveTo(vx, vy - 14);
    ctx.lineTo(vx, vy + 14);
    ctx.stroke();
  }

  // Dense perimeter GSG I/O & ESD clamp gold bond-pad ring
  for (let i = 54; i < w - 54; i += 10) {
    const isGnd = Math.round(i / 10) % 3 === 0;
    ctx.fillStyle = isGnd ? '#d97736' : '#f4cb5e';
    ctx.fillRect(i, 30, 6, 13);
    ctx.fillRect(i, h - 43, 6, 13);
    ctx.fillRect(30, i, 13, 6);
    ctx.fillRect(w - 43, i, 13, 6);
  }

  // 16 individually detailed photolithographic IP macro floorplan tiles matching XR10–XR25
  const pad = 54;
  const gap = 12;
  const cell = (w - pad * 2 - gap * 3) / 4;
  const macros: Array<[string, string, string, 'serdes' | 'bayer' | 'wavelet' | 'lut3d' | 'systolic' | 'arm' | 'af' | 'codec' | 'audio' | 'sram' | 'ddr' | 'vault' | 'pcie' | 'hdmi' | 'rf' | 'pll']> = [
    ['#0e7490', '#164e63', 'SLVS-EC', 'serdes'],
    ['#0369a1', '#0f766e', 'RAW-ISP', 'bayer'],
    ['#0f766e', '#115e59', 'NR-7K', 'wavelet'],
    ['#b45309', '#92400e', '3D-LUT', 'lut3d'],
    ['#5b21b6', '#3730a3', 'AI-NPU', 'systolic'],
    ['#1d4ed8', '#1e3a8a', '4xA35', 'arm'],
    ['#0d9488', '#155e75', 'SA-DSP', 'af'],
    ['#9f1239', '#881337', 'HEVC8K', 'codec'],
    ['#047857', '#065f46', 'AUD-32', 'audio'],
    ['#0284c7', '#1e40af', '6T-SRAM', 'sram'],
    ['#1e40af', '#312e81', 'LPDDR5X', 'ddr'],
    ['#a16207', '#713f12', 'C2PA', 'vault'],
    ['#9a3412', '#7c2d12', 'PCIeG4', 'pcie'],
    ['#075985', '#0c4a6e', 'HDMI2.1', 'hdmi'],
    ['#4338ca', '#312e81', 'USB/6E', 'rf'],
    ['#86198f', '#581c87', 'PLL/HTR', 'pll'],
  ];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const [c1, c2, tag, kind] = macros[r * 4 + c];
      const x = pad + c * (cell + gap);
      const y = pad + r * (cell + gap);
      const g = ctx.createLinearGradient(x, y, x + cell, y + cell);
      g.addColorStop(0, c1);
      g.addColorStop(1, c2);
      ctx.fillStyle = g;
      ctx.fillRect(x, y, cell, cell);

      // Fine standard-cell photolithography grid
      ctx.strokeStyle = 'rgba(255,255,255,0.20)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = x + 9; gx < x + cell; gx += 9) {
        ctx.moveTo(gx, y);
        ctx.lineTo(gx, y + cell);
      }
      for (let gy = y + 9; gy < y + cell; gy += 9) {
        ctx.moveTo(x, gy);
        ctx.lineTo(x + cell, gy);
      }
      ctx.stroke();

      // Bespoke IP micro-circuit lithography pattern
      if (kind === 'systolic') {
        ctx.fillStyle = 'rgba(250, 204, 21, 0.48)';
        for (let sx = x + 8; sx < x + cell - 10; sx += 14) {
          for (let sy = y + 8; sy < y + cell - 10; sy += 14) {
            ctx.fillRect(sx, sy, 9, 9);
          }
        }
      } else if (kind === 'sram' || kind === 'ddr') {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.36)';
        for (let sy = y + 6; sy < y + cell - 6; sy += 8) {
          ctx.fillRect(x + 6, sy, cell * 0.42, 4);
          ctx.fillRect(x + cell * 0.54, sy, cell * 0.40, 4);
        }
        ctx.fillStyle = 'rgba(250, 204, 21, 0.70)';
        ctx.fillRect(x + cell * 0.48, y + 4, cell * 0.05, cell - 8);
      } else if (kind === 'serdes' || kind === 'pcie' || kind === 'hdmi') {
        ctx.fillStyle = 'rgba(245, 168, 42, 0.56)';
        for (let lx = x + 8; lx < x + cell - 8; lx += 14) {
          ctx.fillRect(lx, y + 6, 4, cell - 12);
          ctx.fillRect(lx + 5, y + 6, 3, cell - 12);
        }
      } else if (kind === 'vault') {
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.76)';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        for (let sy = y + 12; sy < y + cell - 10; sy += 12) {
          ctx.moveTo(x + 10, sy);
          ctx.lineTo(x + cell - 10, sy);
        }
        ctx.stroke();
      } else if (kind === 'pll' || kind === 'rf') {
        ctx.strokeStyle = 'rgba(248, 198, 84, 0.78)';
        ctx.lineWidth = 2.4;
        for (const rad of [18, 32, 46]) {
          ctx.beginPath();
          ctx.arc(x + cell * 0.5, y + cell * 0.5, rad, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (kind === 'codec') {
        ctx.strokeStyle = 'rgba(254, 205, 211, 0.68)';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(x + 8, y + 8, cell * 0.45, cell * 0.45);
        ctx.strokeRect(x + cell * 0.52, y + 8, cell * 0.40, cell * 0.22);
        ctx.strokeRect(x + cell * 0.52, y + cell * 0.34, cell * 0.19, cell * 0.19);
        ctx.strokeRect(x + cell * 0.73, y + cell * 0.34, cell * 0.19, cell * 0.19);
        ctx.strokeRect(x + 8, y + cell * 0.56, cell - 16, cell * 0.36);
      } else {
        ctx.fillStyle = 'rgba(186, 230, 253, 0.28)';
        for (let rx = x + 10; rx < x + cell - 20; rx += 32) {
          for (let ry = y + 10; ry < y + cell - 20; ry += 26) {
            ctx.fillRect(rx, ry, 24, 18);
          }
        }
      }

      // Gold power-delivery guard ring framing each IP macro + crisp reticle tag
      ctx.strokeStyle = 'rgba(245, 200, 78, 0.92)';
      ctx.lineWidth = 2.8;
      ctx.strokeRect(x, y, cell, cell);
      ctx.fillStyle = 'rgba(255, 248, 224, 0.84)';
      ctx.font = '700 13px "Courier New", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(tag, x + 6, y + 5);
    }
  }

  // Orthogonal coherent Network-on-Chip (NoC) copper/gold bus superhighways & router switch nodes
  ctx.strokeStyle = 'rgba(250, 208, 102, 0.84)';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  for (let i = 1; i < 4; i++) {
    const pos = pad + i * cell + (i - 0.5) * gap;
    ctx.moveTo(pad, pos - 2.6);
    ctx.lineTo(w - pad, pos - 2.6);
    ctx.moveTo(pad, pos + 2.6);
    ctx.lineTo(w - pad, pos + 2.6);
    ctx.moveTo(pos - 2.6, pad);
    ctx.lineTo(pos - 2.6, h - pad);
    ctx.moveTo(pos + 2.6, pad);
    ctx.lineTo(pos + 2.6, h - pad);
  }
  ctx.stroke();

  // Micro-lithographic reticle scribe legend along top/bottom seal lanes
  ctx.fillStyle = 'rgba(252, 232, 156, 0.88)';
  ctx.font = '700 13px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SONY CXD90057/CXD90066  4NM-EUV-FINFET  RETICLE REV.B2  AI-NPU/ISP/HEVC', w * 0.5, 48);
  ctx.fillText('SEAL-RING Cu/W  CRACK-STOP  PCM-KEY  NoC-COHERENT-MESH  16-IP FLOORPLAN', w * 0.5, h - 48);

  return toHiTex(canvas);
}

function createBionzIpTileTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Neutral high-contrast photolithographic EUV standard-cell & CMP dummy-fill wafer tile
  ctx.fillStyle = '#7b8ca8';
  ctx.fillRect(0, 0, s, s);

  for (let y = 0; y < s; y += 8) {
    ctx.fillStyle = (y / 8) % 2 === 0 ? 'rgba(255,255,255,0.22)' : 'rgba(12,20,38,0.34)';
    ctx.fillRect(0, y, s, 4);
  }
  ctx.strokeStyle = 'rgba(255, 240, 190, 0.42)';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  for (let i = 0; i <= s; i += 12) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.moveTo(0, i);
    ctx.lineTo(s, i);
  }
  ctx.stroke();

  // Stacked via-farm gold contact nodes & CMP dummy fill squares
  ctx.fillStyle = 'rgba(255, 222, 120, 0.68)';
  for (let x = 6; x < s; x += 24) {
    for (let y = 6; y < s; y += 24) {
      ctx.fillRect(x - 2, y - 2, 4, 4);
    }
  }
  ctx.strokeStyle = 'rgba(245, 200, 90, 0.82)';
  ctx.lineWidth = 4;
  ctx.strokeRect(3, 3, s - 6, s - 6);

  return toTileTex(canvas, 1, 1);
}

function createBionzCetusDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#2a0e64');
  bg.addColorStop(0.5, '#1b1a52');
  bg.addColorStop(1, '#0c3e58');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Dual copper/gold crack-stop perimeter seal rings with octagonal chamfer stress-relief corners
  ctx.strokeStyle = '#d98a36';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.strokeStyle = '#f2c852';
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // 4 stacked ARM Cortex-A35 real-time μITRON RTOS cores (L1 I$/D$ + 8-stage ALU + NEON SIMD)
  for (let i = 0; i < 4; i++) {
    const y0 = 64 + i * 162;
    const g = ctx.createLinearGradient(104, y0, w - 54, y0 + 138);
    g.addColorStop(0, '#4c1d95');
    g.addColorStop(0.55, '#2563eb');
    g.addColorStop(1, '#0d9488');
    ctx.fillStyle = g;
    ctx.fillRect(104, y0, w - 158, 138);

    // Split L1 instruction & data SRAM banks (right third of each core)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.54)';
    ctx.fillRect(w - 226, y0 + 10, 158, 54);
    ctx.fillRect(w - 226, y0 + 74, 158, 54);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.34)';
    for (let sy = y0 + 16; sy < y0 + 58; sy += 7) {
      ctx.fillRect(w - 218, sy, 142, 3.5);
      ctx.fillRect(w - 218, sy + 64, 142, 3.5);
    }

    // 8-stage Cortex-A35 pipeline & NEON SIMD stripe (left/mid of each core)
    for (let st = 0; st < 8; st++) {
      ctx.fillStyle = st % 2 === 0 ? 'rgba(250, 204, 21, 0.42)' : 'rgba(217, 119, 54, 0.38)';
      ctx.fillRect(118 + st * 48, y0 + 40, 38, 42);
    }
    ctx.fillStyle = 'rgba(248, 200, 88, 0.36)';
    ctx.fillRect(118, y0 + 94, 376, 30);

    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let gx = 116; gx < w - 56; gx += 16) {
      ctx.moveTo(gx, y0);
      ctx.lineTo(gx, y0 + 138);
    }
    ctx.stroke();

    ctx.strokeStyle = '#f5c542';
    ctx.lineWidth = 3;
    ctx.strokeRect(104, y0, w - 158, 138);

    ctx.fillStyle = 'rgba(255, 248, 224, 0.92)';
    ctx.font = '700 17px "Courier New", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`A35 CORE ${i}  8-STG  NEON  uITRON`, 118, y0 + 12);
    ctx.fillStyle = '#bae6fd';
    ctx.font = '700 13px "Courier New", monospace';
    ctx.fillText('L1-I$', w - 216, y0 + 28);
    ctx.fillText('L1-D$', w - 216, y0 + 92);
  }

  // Left-edge LSI high-density 2/2um silicon bridge D2D PHY 2-row staggered pad column (G-S-G)
  for (let py = 62; py < h - 62; py += 12) {
    ctx.fillStyle = Math.round(py / 12) % 3 === 0 ? '#d97736' : '#f4cc58';
    ctx.fillRect(34, py, 24, 7);
    ctx.fillRect(66, py + 5, 24, 7);
  }

  // Reticle legend
  ctx.fillStyle = 'rgba(252, 234, 166, 0.92)';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SONY CXD90058 "CETUS"  4xA35  LSI-D2D PHY', w * 0.54, 42);
  ctx.fillText('PRE-ISP / PDAF / IBIS RTOS CO-PROCESSOR  REV.A2', w * 0.54, h - 40);

  return toHiTex(canvas);
}

function createBionzAbfSubstrateTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic AT&S / Ibiden Ajinomoto Build-Up Film (ABF GX-T31) smooth emerald-teal solder resist
  ctx.fillStyle = '#0b4636';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 2000, 301, 0.036);

  // Hatched copper reference ground mesh visible beneath translucent green ABF film
  ctx.fillStyle = '#105c48';
  ctx.fillRect(32, 32, w - 64, h - 64);
  ctx.strokeStyle = 'rgba(52, 188, 140, 0.26)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let i = 40; i <= w - 40; i += 18) {
    ctx.moveTo(i, 36);
    ctx.lineTo(i, h - 36);
    ctx.moveTo(36, i);
    ctx.lineTo(w - 36, i);
  }
  ctx.stroke();

  // Dense radial 9/12 um SAP differential copper fan-out traces
  ctx.strokeStyle = '#36c996';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  const cx = w * 0.5;
  const cy = h * 0.5;
  for (let i = 0; i < 112; i++) {
    const a = (i / 112) * Math.PI * 2;
    const r0 = 132;
    const r1 = 216;
    const r2 = 346;
    const bend = a + (i % 2 === 0 ? 0.032 : -0.032);
    ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
    ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(bend) * r2, cy + Math.sin(bend) * r2);
  }
  ctx.stroke();

  // Length-matched serpentine trombone differential meander groups on ALL 4 cardinal sides!
  ctx.strokeStyle = '#6ee7b7';
  ctx.lineWidth = 1.9;
  for (let m = 0; m < 6; m++) {
    const base = 240 + m * 46;
    ctx.beginPath();
    for (let k = 0; k < 5; k++) {
      const yTop = 100 + k * 9;
      ctx.moveTo(base, yTop);
      ctx.lineTo(base + (k % 2 === 0 ? 18 : -18), yTop + 4);
      const yBot = h - 100 - k * 9;
      ctx.moveTo(base, yBot);
      ctx.lineTo(base + (k % 2 === 0 ? 18 : -18), yBot - 4);
      const xLeft = 100 + k * 9;
      ctx.moveTo(xLeft, base);
      ctx.lineTo(xLeft + 4, base + (k % 2 === 0 ? 18 : -18));
      const xRight = w - 100 - k * 9;
      ctx.moveTo(xRight, base);
      ctx.lineTo(xRight - 4, base + (k % 2 === 0 ? 18 : -18));
    }
    ctx.stroke();
  }

  // Center flip-chip C4 micro-bump solder-mask cavity (with resin-plugged VIPPO gold annular rings!)
  ctx.fillStyle = '#083328';
  ctx.fillRect(166, 166, w - 332, h - 332);
  ctx.strokeStyle = '#eebc4e';
  ctx.lineWidth = 3.4;
  ctx.strokeRect(166, 166, w - 332, h - 332);

  ctx.fillStyle = '#f0c65c';
  ctx.beginPath();
  for (let gx = 186; gx <= w - 186; gx += 18) {
    for (let gy = 186; gy <= h - 186; gy += 18) {
      ctx.moveTo(gx + 4.9, gy);
      ctx.arc(gx, gy, 4.9, 0, Math.PI * 2);
    }
  }
  ctx.fill();
  ctx.fillStyle = '#07241c';
  ctx.beginPath();
  for (let gx = 186; gx <= w - 186; gx += 18) {
    for (let gy = 186; gy <= h - 186; gy += 18) {
      ctx.moveTo(gx + 1.8, gy);
      ctx.arc(gx, gy, 1.8, 0, Math.PI * 2);
    }
  }
  ctx.fill();

  // Outer perimeter PoP TMV gold landing pad dual ring (0.35mm pitch, with laser-via centers)
  ctx.fillStyle = '#f2ca5e';
  ctx.beginPath();
  for (const ring of [46, 76]) {
    for (let t = 46; t <= w - 46; t += 24) {
      for (const [px, py] of [
        [t, ring],
        [t, h - ring],
        [ring, t],
        [w - ring, t],
      ]) {
        ctx.moveTo(px + 6.4, py);
        ctx.arc(px, py, 6.4, 0, Math.PI * 2);
      }
    }
  }
  ctx.fill();
  ctx.fillStyle = '#07251d';
  ctx.beginPath();
  for (const ring of [46, 76]) {
    for (let t = 46; t <= w - 46; t += 24) {
      for (const [px, py] of [
        [t, ring],
        [t, h - ring],
        [ring, t],
        [w - ring, t],
      ]) {
        ctx.moveTo(px + 2.3, py);
        ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      }
    }
  }
  ctx.fill();

  // 4 corner gold optical alignment fiducials with concentric solder-mask clearance moats
  for (const [fx, fy] of [
    [116, 116],
    [w - 116, 116],
    [116, h - 116],
    [w - 116, h - 116],
  ]) {
    ctx.fillStyle = '#06221a';
    ctx.beginPath();
    ctx.arc(fx, fy, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f5cf64';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.arc(fx, fy, 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#f5cf64';
    ctx.beginPath();
    ctx.arc(fx, fy, 7.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // White LPI silkscreen legend & Pin-1 triangle + decap courtyards
  ctx.fillStyle = '#f5cf64';
  ctx.beginPath();
  ctx.moveTo(92, 92);
  ctx.lineTo(116, 92);
  ctx.lineTo(92, 116);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(240, 252, 248, 0.90)';
  ctx.font = '700 17px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AT&S ABF-GX-T31 6-2-6  SAP 9/12um  CXD90057/66', w * 0.5, 148);
  ctx.fillText('C101..C144  01005 DECAP RING  VIPPO ENEPIG', w * 0.5, h - 148);

  return toHiTex(canvas);
}

function createBionzBtCoreTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Low-CTE Mitsubishi BT-resin impregnated with tightly woven T-glass fiber cloth
  ctx.fillStyle = '#5a4526';
  ctx.fillRect(0, 0, s, s);

  const pitch = 16;
  for (let y = 0; y < s; y += pitch) {
    for (let x = 0; x < s; x += pitch) {
      const overWarp = ((x / pitch + y / pitch) & 1) === 0;
      if (overWarp) {
        const g = ctx.createLinearGradient(x, y, x, y + pitch);
        g.addColorStop(0, 'rgba(30, 20, 8, 0.58)');
        g.addColorStop(0.32, 'rgba(226, 192, 128, 0.46)');
        g.addColorStop(0.55, 'rgba(252, 228, 174, 0.54)');
        g.addColorStop(1, 'rgba(30, 20, 8, 0.58)');
        ctx.fillStyle = g;
        ctx.fillRect(x, y + 1, pitch, pitch - 2);
      } else {
        const g = ctx.createLinearGradient(x, y, x + pitch, y);
        g.addColorStop(0, 'rgba(30, 20, 8, 0.58)');
        g.addColorStop(0.32, 'rgba(212, 178, 112, 0.42)');
        g.addColorStop(0.55, 'rgba(242, 216, 160, 0.50)');
        g.addColorStop(1, 'rgba(30, 20, 8, 0.58)');
        ctx.fillStyle = g;
        ctx.fillRect(x + 1, y, pitch - 2, pitch);
      }
    }
  }

  // Fine copper PTH core-via resin-plug reference grid & drilled annular rings
  ctx.strokeStyle = 'rgba(222, 152, 74, 0.34)';
  ctx.lineWidth = 1.4;
  for (let i = 0; i < s; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.moveTo(0, i);
    ctx.lineTo(s, i);
    ctx.stroke();
  }
  for (let x = 16; x < s; x += 64) {
    for (let y = 16; y < s; y += 64) {
      ctx.strokeStyle = 'rgba(232, 146, 62, 0.56)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(x, y, 5.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(22, 18, 14, 0.65)';
      ctx.beginPath();
      ctx.arc(x, y, 3.0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return toTileTex(canvas, 3, 3);
}

// --- PHASE 31+: 16 ULTRA-FORENSIC BESPOKE BIONZ XR / XR2 TEXTURE GENERATORS ---

/** XR02: CNC-lapped Electroless Nickel-Plated (4-8um) C1020 OFHC Copper IHS Top Surface */
function createBionzIhsNickelCuTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#c8b29e');
  grad.addColorStop(0.26, '#e3d8cb');
  grad.addColorStop(0.52, '#c4ad98');
  grad.addColorStop(0.76, '#e8dfd5');
  grad.addColorStop(1, '#b59a82');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Concentric CNC diamond-flycut lapping interference swirls + subtle electroless Ni-P micro-pits
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let r = 28; r <= 440; r += 12) {
    ctx.moveTo(w * 0.5 + r, h * 0.5);
    ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
  }
  ctx.stroke();
  drawBrushedStreaks(ctx, w, h, false, 480, 3102, 0.055, 0.048);
  drawMicroGrain(ctx, w, h, 1400, 3104, 0.032);

  // Stepped chamfered thermal-spreader perimeter rim with warm C1020 OFHC copper bevel reflection
  ctx.strokeStyle = 'rgba(218, 128, 70, 0.68)';
  ctx.lineWidth = 14;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.strokeStyle = 'rgba(72, 62, 54, 0.50)';
  ctx.lineWidth = 3;
  ctx.strokeRect(38, 38, w - 76, h - 76);

  // Inner Main-Die + Cetus-Chiplet pedestal thermal-contact dashed footprints
  ctx.strokeStyle = 'rgba(120, 96, 78, 0.42)';
  ctx.setLineDash([12, 8]);
  ctx.lineWidth = 2.4;
  ctx.strokeRect(148, 152, 412, 464);
  ctx.strokeRect(574, 212, 92, 344);
  ctx.setLineDash([]);

  // Corner air-breather cure vent arrow & Pin-1 chamfer index
  ctx.fillStyle = 'rgba(54, 44, 36, 0.78)';
  ctx.beginPath();
  ctx.moveTo(48, 48);
  ctx.lineTo(94, 48);
  ctx.lineTo(48, 94);
  ctx.closePath();
  ctx.fill();
  ctx.font = '700 16px "Courier New", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('VENT↗', w - 58, h - 58);

  // Crisp laser-etched IHS metallurgical stamp
  ctx.fillStyle = 'rgba(58, 48, 40, 0.78)';
  ctx.font = '700 22px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('C1020 OFHC Cu  EN-Ni 6um  k=398W/m·K', w * 0.5, 90);
  ctx.fillText('FLATNESS <25um  H-CAP IHS-XR2  REV.C', w * 0.5, h - 90);

  return toHiTex(canvas);
}

/** XR03: Full HiRes Coined & Vacuum-Reflowed Pure Indium Solder TIM1 (STIM, k=86W/mK) + AuIn2 Halo */
function createBionzIndiumStimTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#c6ced8');
  bg.addColorStop(0.35, '#dce2ea');
  bg.addColorStop(0.68, '#bfc8d4');
  bg.addColorStop(1, '#d4dce6');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Ductile pure-Indium (Tm=156.6°C) equiaxed polycrystalline reflow domains
  const rng = mulberry32(3103);
  for (let i = 0; i < 420; i++) {
    const cx = rng() * w;
    const cy = rng() * h;
    const r = 12 + rng() * 34;
    const shade = Math.round(176 + rng() * 68);
    ctx.fillStyle = `rgba(${shade}, ${shade + 4}, ${Math.min(255, shade + 10)}, 0.36)`;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Vacuum-coining 4x4 diamond-waffle pressure witness grid preventing trapped gas voids
  ctx.strokeStyle = 'rgba(110, 122, 138, 0.32)';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let d = -h; d < w + h; d += 36) {
    ctx.moveTo(d, 48);
    ctx.lineTo(d + h - 96, h - 48);
    ctx.moveTo(d, h - 48);
    ctx.lineTo(d + h - 96, 48);
  }
  ctx.stroke();

  // Golden AuIn2 intermetallic wetting halo around reflow perimeter (reaction with Ti/Ni/Ag/Au BSM!)
  ctx.strokeStyle = 'rgba(232, 184, 72, 0.88)';
  ctx.lineWidth = 24;
  ctx.strokeRect(20, 20, w - 40, h - 40);
  ctx.strokeStyle = 'rgba(254, 240, 168, 0.72)';
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  // Scattered microscopic AuIn2 intermetallic precipitates & C-SAM zero-void inspection ring
  for (let i = 0; i < 520; i++) {
    ctx.fillStyle = i % 4 === 0 ? 'rgba(234, 186, 78, 0.34)' : 'rgba(255, 255, 255, 0.28)';
    ctx.fillRect(rng() * w, rng() * h, 2 + rng() * 6, 1.8);
  }
  ctx.strokeStyle = 'rgba(72, 84, 100, 0.42)';
  ctx.setLineDash([14, 10]);
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, 244, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = 'rgba(42, 52, 66, 0.78)';
  ctx.font = '700 21px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PURE INDIUM STIM1  k=86W/m·K  Tm=156.6°C', w * 0.5, 68);
  ctx.fillText('BSM Ti/Ni/Ag/Au -> AuIn2  BLT 40um  C-SAM VOID <1%', w * 0.5, h - 68);

  return toHiTex(canvas);
}

/** XR05: Micron 1-beta LPDDR5X-8533 16-Bank DRAM Silicon Die Floorplan (SWD, LSA & Laser Fuses) */
function createBionzLpddr5xDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0d2244');
  bg.addColorStop(0.5, '#183d70');
  bg.addColorStop(1, '#0e2850');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Outer silicon crack-stop seal ring
  ctx.strokeStyle = '#eab949';
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  // 4 Bank Groups x 4 Banks = 16 symmetric high-density 1T1C DRAM cell array mats with SWD & LSA strips!
  const padX = 58;
  const padY = 44;
  const spineW = 48;
  const spineH = 44;
  const halfW = (w - padX * 2 - spineW) * 0.5;
  const halfH = (h - padY * 2 - spineH) * 0.5;
  const bankW = (halfW - 14) * 0.5;
  const bankH = (halfH - 28) / 4;

  for (let qx = 0; qx < 2; qx++) {
    for (let qy = 0; qy < 2; qy++) {
      const bx0 = padX + qx * (halfW + spineW);
      const by0 = padY + qy * (halfH + spineH);
      for (let c = 0; c < 2; c++) {
        for (let r = 0; r < 4; r++) {
          const x = bx0 + c * (bankW + 14);
          const y = by0 + r * (bankH + 9);
          const bgGrad = ctx.createLinearGradient(x, y, x + bankW, y + bankH);
          bgGrad.addColorStop(0, '#1d4ed8');
          bgGrad.addColorStop(0.5, '#0284c7');
          bgGrad.addColorStop(1, '#1e3a8a');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(x, y, bankW, bankH);

          // Ultra-dense horizontal wordline / vertical bitline 1T1C sub-array striations
          ctx.strokeStyle = 'rgba(186, 230, 253, 0.40)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let sy = y + 4; sy < y + bankH; sy += 5) {
            ctx.moveTo(x, sy);
            ctx.lineTo(x + bankW, sy);
          }
          for (let sx = x + 14; sx < x + bankW; sx += 16) {
            ctx.moveTo(sx, y);
            ctx.lineTo(sx, y + bankH);
          }
          ctx.stroke();

          // Sub-Wordline Driver (SWD) vertical gold stripe & Local Sense Amplifier (LSA) horizontal bar
          ctx.fillStyle = 'rgba(250, 204, 21, 0.46)';
          ctx.fillRect(x + bankW * 0.5 - 3, y, 6, bankH);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.52)';
          ctx.fillRect(x, y + bankH * 0.5 - 2.5, bankW, 5);

          ctx.strokeStyle = 'rgba(248, 208, 96, 0.78)';
          ctx.lineWidth = 1.6;
          ctx.strokeRect(x, y, bankW, bankH);
        }
      }
    }
  }

  // Central vertical Row/Column Decoder + Laser-Repair Redundancy eFuse spine & horizontal DQ/DLL/ZQ I/O bus
  ctx.fillStyle = '#0a1932';
  ctx.fillRect(w * 0.5 - spineW * 0.5, padY, spineW, h - padY * 2);
  ctx.fillRect(padX, h * 0.5 - spineH * 0.5, w - padX * 2, spineH);
  // Microscopic redundancy eFuse array ticks along central decoder spine
  ctx.fillStyle = '#d97736';
  for (let fy = padY + 12; fy < h - padY - 12; fy += 12) {
    if (Math.abs(fy - h * 0.5) < 28) continue;
    ctx.fillRect(w * 0.5 - 14, fy, 28, 5);
  }
  ctx.strokeStyle = '#f2c852';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(w * 0.5 - spineW * 0.5, padY, spineW, h - padY * 2);
  ctx.strokeRect(padX, h * 0.5 - spineH * 0.5, w - padX * 2, spineH);

  // Staggered gold Al-Cu wirebond pad rows on left/right stepped terraces
  ctx.fillStyle = '#f5cf5e';
  for (let py = 54; py < h - 54; py += 14) {
    ctx.fillRect(20, py, 26, 8);
    ctx.fillRect(w - 46, py, 26, 8);
  }
  ctx.fillStyle = 'rgba(252, 236, 168, 0.92)';
  ctx.font = '700 16px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('1β-LPDDR5X  16-BANK  SWD/LSA  ZQ-CAL  8533MT/s', w * 0.5, h * 0.5);

  return toHiTex(canvas);
}

/** XR06: Top PoP 4-Layer 120um BT Interposer Substrate with Double-Row Staggered ENIG Wirebond Fingers */
function createBionzPopInterposerTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#0d4032';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 1600, 3106, 0.036);

  // Central die-attach silver-filled conductive epoxy crosshatch landing island
  ctx.fillStyle = '#175443';
  ctx.fillRect(156, 156, w - 312, h - 312);
  ctx.strokeStyle = 'rgba(196, 224, 212, 0.34)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let i = 168; i <= w - 168; i += 16) {
    ctx.moveTo(i, 160);
    ctx.lineTo(i, h - 160);
    ctx.moveTo(160, i);
    ctx.lineTo(w - 160, i);
  }
  ctx.stroke();

  // Dark green solder-mask opening dam windows surrounding staggered bond-finger strips
  ctx.fillStyle = '#07271e';
  ctx.fillRect(88, 118, 60, h - 236);
  ctx.fillRect(w - 148, 118, 60, h - 236);
  ctx.fillRect(118, 88, w - 236, 60);
  ctx.fillRect(118, h - 148, w - 236, 60);

  // Matched-length serpentine DQ/DQS/CK copper traces fanning to outer PoP ball rings
  ctx.strokeStyle = '#38d39f';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let y = 128; y <= h - 128; y += 14) {
    ctx.moveTo(92, y);
    ctx.lineTo(66, y + ((y / 14) % 2 === 0 ? 6 : -6));
    ctx.lineTo(40, y);
    ctx.moveTo(w - 92, y);
    ctx.lineTo(w - 66, y + ((y / 14) % 2 === 0 ? -6 : 6));
    ctx.lineTo(w - 40, y);
  }
  ctx.stroke();

  // Double-row staggered ENIG gold wirebond fingers along all 4 edges (inner + outer tier!)
  ctx.fillStyle = '#f4ce5c';
  for (let i = 126; i <= h - 126; i += 14) {
    const stag = (Math.round(i / 14) % 2) * 14;
    ctx.fillRect(94 + stag, i, 34, 7);
    ctx.fillRect(w - 142 + (14 - stag), i, 34, 7);
    ctx.fillRect(i, 94 + stag, 7, 34);
    ctx.fillRect(i, h - 142 + (14 - stag), 7, 34);
  }

  // Outer perimeter PoP pad ring & substrate silkscreen
  ctx.strokeStyle = '#f2c856';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, w - 48, h - 48);
  ctx.fillStyle = 'rgba(238, 252, 246, 0.88)';
  ctx.font = '700 17px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('POP-INT4L 120um BT  D8DNH  2-TIER BSOB GOLD FINGERS', w * 0.5, 64);

  return toHiTex(canvas);
}

/** XR08 & XR45: Low-Alpha 88wt% Spherical Fused-Silica Epoxy Mold Compound (EMC) */
function createBionzEmcSilicaTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#1b2029';
  ctx.fillRect(0, 0, s, s);
  drawMicroGrain(ctx, s, s, 2600, 3108, 0.08);

  const rng = mulberry32(3109);
  for (let i = 0; i < 320; i++) {
    const x = rng() * s;
    const y = rng() * s;
    const r = 0.8 + rng() * 2.0;
    ctx.fillStyle = i % 3 === 0 ? 'rgba(186, 198, 216, 0.24)' : 'rgba(104, 118, 138, 0.22)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return toTileTex(canvas, 3, 3);
}

/** XR35: Bottom ABF Fan-Out & Taiyo PSR-4000 AUS703 Green Solder Resist with ENEPIG SMD BGA Pads */
function createBionzAbfBottomSrTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Rich glossy Taiyo PSR-4000 AUS703 halogen-free flip-chip green LPI solder resist mask
  ctx.fillStyle = '#0b4d2d';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 1600, 3135, 0.032);

  // Dog-bone fan-out copper routing + micro-via teardrop lands under translucent glossy SR
  const step = 48;
  for (let ix = -6; ix <= 6; ix++) {
    for (let iz = -6; iz <= 6; iz++) {
      if (Math.abs(ix) <= 2 && Math.abs(iz) <= 2) continue;
      const px = w * 0.5 + ix * step;
      const py = h * 0.5 + iz * step;
      const dx = Math.sign(ix) * 16;
      const dy = Math.sign(iz) * 16;
      ctx.strokeStyle = '#32b874';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + dx, py + dy);
      ctx.stroke();

      // Tent-plugged micro-via teardrop pad at dog-bone tip
      ctx.fillStyle = '#1f7a4a';
      ctx.beginPath();
      ctx.arc(px + dx, py + dy, 4.2, 0, Math.PI * 2);
      ctx.fill();

      // Solder-Mask Defined (SMD) dark green dam ring + gleaming pale-gold ENEPIG (Ni/Pd/Au) ball pad!
      ctx.fillStyle = '#06321c';
      ctx.beginPath();
      ctx.arc(px, py, 16.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ebd28a';
      ctx.beginPath();
      ctx.arc(px, py, 13.0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff6d4';
      ctx.beginPath();
      ctx.arc(px - 3, py - 3, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Central depopulated Land-Side Capacitor (LSC) 0204 LW-Reverse & 3-Terminal MLCC courtyard
  ctx.fillStyle = '#083a22';
  ctx.fillRect(w * 0.5 - 122, h * 0.5 - 122, 244, 244);
  ctx.strokeStyle = 'rgba(240, 253, 246, 0.78)';
  ctx.lineWidth = 2.4;
  ctx.strokeRect(w * 0.5 - 122, h * 0.5 - 122, 244, 244);
  for (let cx = -2; cx <= 2; cx++) {
    for (let cy = -1.5; cy <= 1.5; cy += 1.0) {
      const mx = w * 0.5 + cx * 44;
      const my = h * 0.5 + cy * 50;
      ctx.fillStyle = '#ecd38a';
      ctx.fillRect(mx - 15, my - 7, 9, 14);
      ctx.fillRect(mx + 6, my - 7, 9, 14);
      // Center ground pad on inner rows for authentic Murata 3-terminal low-ESL MLCCs!
      if (Math.abs(cy) < 0.8) {
        ctx.fillStyle = '#d98842';
        ctx.fillRect(mx - 4, my - 9, 8, 18);
      }
    }
  }

  // Perimeter BGA row/column coordinate index silkscreen (A..AF / 1..32) + Pin-1 triangle
  ctx.fillStyle = '#f5cf5e';
  ctx.beginPath();
  ctx.moveTo(26, 26);
  ctx.lineTo(76, 26);
  ctx.lineTo(26, 76);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(240, 252, 246, 0.90)';
  ctx.font = '700 15px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TAIYO PSR-4000 AUS703  ENEPIG Ni/Pd/Au  0.4mm BGA', w * 0.5, 22);
  ctx.fillText('LSC 0204/3-TERM C201-C224  100Ω DIFF DOG-BONE FANOUT', w * 0.5, h - 22);

  return toHiTex(canvas);
}

/** XR26: Full HiRes 4nm/5nm EUV FEOL FinFET / GAA Nanosheet Transistor Standard-Cell Wafer Pattern */
function createBionzFeolFinfetTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Deep STI (Shallow Trench Isolation) SiO2 oxide trench backdrop
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#132036');
  bg.addColorStop(0.5, '#1d3250');
  bg.addColorStop(1, '#122238');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Horizontal crystalline Si / SiGe active fins & stacked GAA nanosheet channel ribbons
  for (let y = 44; y < h - 44; y += 26) {
    ctx.fillStyle = '#336094';
    ctx.fillRect(32, y, w - 64, 11);
    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(32, y + 2, w - 64, 4);
    ctx.fillStyle = 'rgba(224, 242, 254, 0.55)';
    ctx.fillRect(32, y + 3, w - 64, 1.5);
  }

  // Orthogonal conformal HfO2 High-k + TiN Metal Gates (HKMG), SiN spacers, S/D epi nodes & Co M0 contacts!
  for (let x = 52; x < w - 52; x += 56) {
    // SiN/SiBCN dielectric sidewall spacers flanking gate
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(x - 4, 34, 22, h - 68);
    // HfO2 High-k + TiN Work-Function Metal Gate stripe
    ctx.fillStyle = '#d99b38';
    ctx.fillRect(x, 34, 14, h - 68);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x + 4, 34, 5, h - 68);

    // Self-Aligned Gate Contact (SAGC) gold tap vias
    for (let gy = 56; gy < h - 56; gy += 104) {
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 2, gy, 10, 14);
    }

    // Cobalt (Co) M0 wrap-around trench S/D contact bar & diamond-faceted {111} SiGe/SiP epi stressors
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(x + 28, 38, 12, h - 76);
    for (let y = 49; y < h - 44; y += 26) {
      ctx.fillStyle = (Math.round(y / 26) % 2 === 0) ? '#38bdf8' : '#a78bfa'; // SiP nMOS vs SiGe pMOS!
      ctx.beginPath();
      ctx.moveTo(x + 34, y - 7);
      ctx.lineTo(x + 42, y);
      ctx.lineTo(x + 34, y + 7);
      ctx.lineTo(x + 26, y);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Single Diffusion Break (SDB) cell-boundary isolation stripes
  ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
  ctx.fillRect(w * 0.5 - 10, 32, 20, h - 64);

  ctx.strokeStyle = '#f2c852';
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, w - 28, h - 28);
  ctx.fillStyle = 'rgba(8, 16, 30, 0.76)';
  ctx.fillRect(24, 18, w - 48, 24);
  ctx.fillRect(24, h - 42, w - 48, 24);
  ctx.fillStyle = '#fef3c7';
  ctx.font = '700 16px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('XR26  4nm/5nm EUV FEOL  FINFET / GAA NANOSHEET  HKMG HfO2/TiN', w * 0.5, 30);
  ctx.fillText('{111} SiGe/SiP EPI  SiN SPACER  SAGC  Co-M0 WRAP CONTACT  SDB', w * 0.5, h - 30);

  return toHiTex(canvas);
}

/** XR27: Full HiRes 14-Layer Dual-Damascene Copper Interconnect & Porous SiOC ULK Micrograph */
function createBionzBeolDamasceneTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Porous SiOC Ultra-Low-k dielectric (k ≈ 2.45)
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#132634');
  bg.addColorStop(0.5, '#1d3648');
  bg.addColorStop(1, '#112230');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 1800, 3127, 0.036);

  // Fine lower-tier M1–M6 horizontal dual-damascene Cu lines cradled in PVD TaN/Ta barrier liners
  for (let y = 46; y < h - 46; y += 22) {
    ctx.fillStyle = '#64748b'; // TaN/Ta diffusion barrier liner
    ctx.fillRect(28, y - 2, w - 56, 12);
    ctx.fillStyle = '#c86a26'; // Electroplated Cu
    ctx.fillRect(28, y, w - 56, 8);
    ctx.fillStyle = 'rgba(255, 224, 178, 0.34)';
    ctx.fillRect(28, y + 1, w - 56, 2);
  }

  // Orthogonal semi-global M7–M11 Cu lines with Cobalt (Co) anti-EM cap stripes
  for (let x = 52; x < w - 52; x += 58) {
    ctx.fillStyle = '#475569';
    ctx.fillRect(x - 3, 28, 22, h - 56);
    ctx.fillStyle = '#de8536';
    ctx.fillRect(x, 28, 16, h - 56);
    ctx.fillStyle = 'rgba(186, 230, 253, 0.32)'; // Co anti-EM cap sheen
    ctx.fillRect(x + 4, 28, 8, h - 56);
  }

  // Ultra-thick global M12–M14 AP Power Delivery Mesh + redundant double-via vertical Cu pads!
  for (const py of [152, 384, 616]) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(28, py - 18, w - 56, 36);
    ctx.fillStyle = '#f0a642';
    ctx.fillRect(28, py - 13, w - 56, 26);
    for (let x = 56; x < w - 56; x += 58) {
      // Redundant double-via Cu contact pairs (electromigration immunity!)
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(x + 3, py - 4, 4.2, 0, Math.PI * 2);
      ctx.arc(x + 13, py + 4, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.strokeStyle = '#e59246';
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, w - 28, h - 28);
  ctx.fillStyle = 'rgba(8, 18, 28, 0.78)';
  ctx.fillRect(24, 18, w - 48, 24);
  ctx.fillRect(24, h - 42, w - 48, 24);
  ctx.fillStyle = '#fef3c7';
  ctx.font = '700 16px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('XR27  BEOL 14-LAYER DUAL-DAMASCENE Cu  TaN/Ta BARRIER', w * 0.5, 30);
  ctx.fillText('POROUS SiOC ULK (k=2.45)  Co-CAP  REDUNDANT DOUBLE-VIA  AP MESH', w * 0.5, h - 30);

  return toHiTex(canvas);
}

/** XR29: TSMC CoWoS-L / InFO_LSI Embedded 2.5D Local Silicon Interconnect Bridge (2/2um RDL + eDTC) */
function createBionzLsiBridgeTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0d2645');
  bg.addColorStop(0.5, '#125072');
  bg.addColorStop(1, '#0b243e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Gold crack-stop bridge rim
  ctx.strokeStyle = '#f2c856';
  ctx.lineWidth = 8;
  ctx.strokeRect(12, 12, w - 24, h - 24);

  // Ultra-fine 2/2 um interleaved G-S-S-G horizontal copper RDL die-to-die data highway
  for (let y = 64; y <= h - 64; y += 9) {
    const idx = Math.round(y / 9) % 3;
    ctx.fillStyle = idx === 0 ? '#64748b' : idx === 1 ? '#e6903c' : '#f4cc5e';
    ctx.fillRect(142, y, w - 284, 4.2);
  }

  // Dual staggered 35um-pitch micro-bump landing pad banks on Left (Mira SoC) & Right (Cetus)
  for (const bx of [50, 92, w - 116, w - 74]) {
    for (let y = 58; y <= h - 58; y += 15) {
      const sy = y + (bx === 92 || bx === w - 74 ? 7.5 : 0);
      ctx.fillStyle = '#f5d268';
      ctx.beginPath();
      ctx.arc(bx + 12, sy + 5, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#c86a24';
      ctx.beginPath();
      ctx.arc(bx + 12, sy + 5, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Embedded Deep Trench Capacitor (eDTC) decoupling stripes at top & bottom of bridge
  ctx.fillStyle = 'rgba(56, 189, 248, 0.38)';
  ctx.fillRect(148, 24, w - 296, 28);
  ctx.fillRect(148, h - 52, w - 296, 28);
  ctx.fillStyle = 'rgba(254, 243, 199, 0.94)';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CoWoS-L LSI-BRIDGE  2/2um Cu-RDL  eDTC  <0.5pJ/bit', w * 0.5, 38);
  ctx.fillText('MIRA <-> CETUS  35um STAGGERED uBUMP D2D', w * 0.5, h - 38);

  return toHiTex(canvas);
}

/** XR31: Capillary Underfill (CUF) 65wt% Nano-Silica Filled Epoxy Flow Texture */
function createBionzCufSilicaTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#333d4b';
  ctx.fillRect(0, 0, s, s);
  const rng = mulberry32(3131);
  for (let y = 0; y < s; y += 12) {
    ctx.fillStyle = y % 24 === 0 ? 'rgba(148, 163, 184, 0.08)' : 'rgba(15, 23, 42, 0.12)';
    ctx.fillRect(0, y, s, 6);
  }
  for (let i = 0; i < 620; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(216, 226, 240, 0.24)' : 'rgba(94, 108, 126, 0.22)';
    ctx.beginPath();
    ctx.arc(rng() * s, rng() * s, 0.7 + rng() * 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  return toTileTex(canvas, 3, 3);
}

/** XR32: Murata ULSC/XBSC Embedded 3D Deep-Trench MIM Silicon Capacitor (eSiCap) Die */
function createBionzEsicapDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#1b1848');
  bg.addColorStop(0.5, '#312e81');
  bg.addColorStop(1, '#1c3b62');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Hexagonal close-packed 3D ultra-deep-trench MIM high-k capacitor pore matrix!
  for (let row = 0; row < 28; row++) {
    const y = 84 + row * 21.5;
    const xShift = (row % 2) * 11;
    for (let x = 128 + xShift; x <= w - 128; x += 22) {
      ctx.fillStyle = 'rgba(125, 211, 252, 0.42)';
      ctx.beginPath();
      ctx.arc(x, y, 6.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.beginPath();
      ctx.arc(x, y, 2.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // Interdigitated wide gold VDD / copper VSS comb bus electrodes
  for (let i = 0; i < 6; i++) {
    const y = 112 + i * 98;
    ctx.fillStyle = i % 2 === 0 ? '#f4cc58' : '#de7e38';
    ctx.fillRect(i % 2 === 0 ? 48 : 138, y, w - 186, 20);
  }
  // Wide left/right terminal copper-gold busbars
  ctx.fillStyle = '#f4cc58';
  ctx.fillRect(28, 36, 74, h - 72);
  ctx.fillStyle = '#de7e38';
  ctx.fillRect(w - 102, 36, 74, h - 72);

  ctx.fillStyle = 'rgba(255, 252, 236, 0.94)';
  ctx.font = '700 25px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MURATA eSiCap  1.0uF  <30pH ESL', w * 0.5, 46);
  ctx.fillText('3D DEEP-TRENCH MIM MONOLITHIC Si', w * 0.5, h - 46);

  return toHiTex(canvas);
}

/** XR37: Sony Custom Multi-Phase Core VRM PMIC QFN-48 Laser-Marked Epoxy Top */
function createBionzPmicIcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#161a21';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3200, 3137, 0.068);

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.36)';
  ctx.lineWidth = 8;
  ctx.strokeRect(22, 22, w - 44, h - 44);

  // Pin-1 laser index crater + gold chamfer arrow
  ctx.fillStyle = '#080a0e';
  ctx.beginPath();
  ctx.arc(106, 106, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(232, 240, 250, 0.84)';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = 'rgba(236, 242, 250, 0.94)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 62px Georgia, serif';
  ctx.fillText('SONY', 178, 182);
  ctx.fillStyle = 'rgba(232, 122, 48, 0.90)';
  ctx.fillRect(178, 224, 420, 6);
  ctx.fillStyle = 'rgba(236, 242, 250, 0.94)';
  ctx.font = '700 56px "Courier New", monospace';
  ctx.fillText('CXD5702GG', 110, 296);
  ctx.fillStyle = 'rgba(200, 214, 232, 0.86)';
  ctx.font = '600 34px "Courier New", monospace';
  ctx.fillText('4-PH CORE VRM PMIC', 110, 376);
  ctx.fillText('VDD_CORE 0.75V 32A', 110, 428);
  ctx.fillText('2546K08  QFN-48 JP', 110, 488);

  drawDataMatrix(ctx, 514, 514, 148, 12, 'rgba(236, 242, 250, 0.90)', null, 5702);
  return toHiTex(canvas);
}

/** XR37: Murata DFE252012F-R47M (0.47uH 4.9A 23mOhm) Molded Metal-Alloy Powder Shielded Power Inductor */
function createBionzInductorR47Texture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#2b3039';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3800, 3147, 0.090);

  // Subtle metallic carbonyl-iron powder glints
  const rng = mulberry32(3148);
  ctx.fillStyle = 'rgba(192, 204, 220, 0.18)';
  for (let i = 0; i < 480; i++) {
    ctx.fillRect(rng() * w, rng() * h, 2, 2);
  }

  ctx.strokeStyle = 'rgba(168, 182, 200, 0.36)';
  ctx.lineWidth = 10;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Winding-start polarity dot
  ctx.fillStyle = 'rgba(242, 248, 255, 0.92)';
  ctx.beginPath();
  ctx.arc(124, 128, 30, 0, Math.PI * 2);
  ctx.fill();

  // Authentic Murata DFE252012F-R47M laser-etched marking
  ctx.fillStyle = 'rgba(242, 248, 255, 0.94)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 184px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('R47', w * 0.5, h * 0.48);
  ctx.fillStyle = 'rgba(208, 220, 234, 0.82)';
  ctx.font = '700 42px "Courier New", monospace';
  ctx.fillText('5K2  0.47uH  4.9A', w * 0.5, h * 0.78);

  return toHiTex(canvas);
}

/** XR38: Epson TG2520SMN / Kyocera KT2520K Hermetic Double-Roller Seam-Welded Gold-Plated Kovar 24MHz TCXO Lid */
function createBionzTcxoGoldLidTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#c8a654');
  grad.addColorStop(0.30, '#edd48e');
  grad.addColorStop(0.58, '#cea84f');
  grad.addColorStop(0.84, '#f5e09e');
  grad.addColorStop(1, '#b69240');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 580, 3138, 0.085, 0.075);

  // Authentic double-pass roller-electrode seam-weld shimmer track framing the Kovar lid perimeter!
  ctx.strokeStyle = 'rgba(84, 60, 20, 0.82)';
  ctx.lineWidth = 16;
  ctx.strokeRect(22, 22, w - 44, h - 44);
  ctx.strokeStyle = 'rgba(255, 248, 212, 0.82)';
  ctx.lineWidth = 4.5;
  ctx.strokeRect(36, 36, w - 72, h - 72);
  ctx.strokeStyle = 'rgba(110, 82, 32, 0.55)';
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, w - 96, h - 96);

  // Pin-1 dark laser index dot + beveled corner notch
  ctx.fillStyle = '#20180a';
  ctx.beginPath();
  ctx.arc(116, 124, 28, 0, Math.PI * 2);
  ctx.fill();

  // Crisp laser-etched crystal frequency & Epson TG2520SMN / Kyocera KT2520K code
  ctx.fillStyle = 'rgba(38, 26, 10, 0.90)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 118px "Courier New", monospace';
  ctx.fillText('24.000', w * 0.52, h * 0.35);
  ctx.font = '700 50px "Courier New", monospace';
  ctx.fillText('TG2520SMN E548', w * 0.5, h * 0.61);
  ctx.font = '700 38px "Courier New", monospace';
  ctx.fillText('±0.5ppm  <150fs', w * 0.5, h * 0.77);

  return toHiTex(canvas);
}

/** XR39: Macronix MX25UM25645GMI00 256Mb 1.8V Octal-SPI 16-SOP Boot NOR Flash IC Top */
function createBionzNorFlashIcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#181c24';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3000, 3139, 0.066);

  // Authentic 16-SOP chamfered Pin-1 bevel stripe along left edge
  ctx.fillStyle = 'rgba(148, 163, 184, 0.26)';
  ctx.fillRect(16, 16, 52, h - 32);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.36)';
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, w - 36, h - 36);

  // Pin-1 laser dimple
  ctx.fillStyle = '#080a0e';
  ctx.beginPath();
  ctx.arc(118, 118, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(232, 240, 250, 0.80)';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Authentic Macronix MXIC brand bar + MX25UM25645GMI00 16-SOP Octal-SPI markings
  ctx.fillStyle = 'rgba(236, 242, 250, 0.95)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '900 68px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('MXIC', 186, 174);
  ctx.fillStyle = 'rgba(139, 92, 246, 0.84)';
  ctx.fillRect(186, 218, 464, 7);

  ctx.fillStyle = 'rgba(236, 242, 250, 0.94)';
  ctx.font = '700 46px "Courier New", monospace';
  ctx.fillText('MX25UM25645GMI', 102, 314);
  ctx.fillStyle = 'rgba(202, 216, 232, 0.88)';
  ctx.font = '600 34px "Courier New", monospace';
  ctx.fillText('1.8V 256Mb OCTAL-SPI', 102, 396);
  ctx.fillText('200MHz DTR  16-SOP', 102, 456);
  ctx.fillText('L254712   TAIWAN', 102, 524);

  drawDataMatrix(ctx, 540, 548, 128, 12, 'rgba(236, 242, 250, 0.88)', null, 25645);
  return toHiTex(canvas);
}

/** XR42: Texas Instruments TDP2004RNQ (4x6mm WQFN-40) 4-Ch 48Gbps HDMI 2.1 FRL / DP2.1 Retimer Top */
function createBionzHdmiRetimerIcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#171b23';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3000, 3142, 0.066);

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.36)';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Pin-1 laser index dot
  ctx.fillStyle = '#080a0e';
  ctx.beginPath();
  ctx.arc(106, 106, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.86)';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = 'rgba(238, 246, 254, 0.95)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '800 66px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('TI  TDP2004', 156, 198);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.88)';
  ctx.fillRect(112, 248, 544, 7);

  ctx.fillStyle = 'rgba(226, 238, 250, 0.92)';
  ctx.font = '700 44px "Courier New", monospace';
  ctx.fillText('HDMI 2.1  48G FRL', 112, 336);
  ctx.fillStyle = 'rgba(194, 212, 232, 0.86)';
  ctx.font = '600 34px "Courier New", monospace';
  ctx.fillText('4-CH 12G/20G CDR', 112, 412);
  ctx.fillText('RNQ 4x6mm WQFN-40', 112, 476);

  drawDataMatrix(ctx, 514, 516, 144, 12, 'rgba(236, 244, 252, 0.90)', null, 2004);
  return toHiTex(canvas);
}

// =============================================================================
// 2. SONY INTERNAL MICROPHONE PROCEDURAL TEXTURES (PHASE 34 ULTRA-HD OVERHAUL)
// =============================================================================

function createMicDeadcatFurTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Authentic Sony ZV-E1 (504179701) deep charcoal-obsidian synthetic acoustic plush fleece
  ctx.fillStyle = '#13161c';
  ctx.fillRect(0, 0, s, s);

  const rng = mulberry32(401);
  // 5-layer toroidally wrapped directional synthetic fleece: dense dark root undercoat,
  // mid-slate crimped body strands, charcoal-silver guard hairs, and wispy specular acoustic tips!
  const passes: Array<[string, number, number, number]> = [
    ['rgba(7, 9, 13, 0.86)', 1.45, 1150, 14],
    ['rgba(30, 35, 44, 0.74)', 1.15, 1550, 16],
    ['rgba(64, 72, 85, 0.56)', 0.86, 1350, 18],
    ['rgba(128, 138, 154, 0.36)', 0.58, 860, 19],
    ['rgba(206, 214, 226, 0.22)', 0.36, 460, 20],
  ];
  for (const [color, lw, n, maxLen] of passes) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = rng() * s;
      const y = rng() * s;
      const len = 6 + rng() * maxLen;
      const ang = -Math.PI * 0.5 + (rng() - 0.5) * 0.72;
      const dx = Math.cos(ang) * len;
      const dy = Math.sin(ang) * len;
      const crimp = (rng() - 0.5) * 0.36;
      const cx = Math.cos(ang + crimp) * len * 0.52;
      const cy = Math.sin(ang + crimp) * len * 0.52;
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + cx, y + cy, x + dx, y + dy);
      if (y + dy < 0) {
        ctx.moveTo(x, y + s);
        ctx.quadraticCurveTo(x + cx, y + s + cy, x + dx, y + s + dy);
      }
      if (x + dx < 0) {
        ctx.moveTo(x + s, y);
        ctx.quadraticCurveTo(x + s + cx, y + cy, x + s + dx, y + dy);
      } else if (x + dx > s) {
        ctx.moveTo(x - s, y);
        ctx.quadraticCurveTo(x - s + cx, y + cy, x - s + dx, y + dy);
      }
    }
    ctx.stroke();
  }

  return toTileTex(canvas, 5, 3);
}

function createMicTopDeckMgTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic Sony ILCE-7M4 / ZV-E1 powder-coated AZ91D fine-grain satin obsidian magnesium deck
  ctx.fillStyle = '#191d24';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 8200, 412, 0.032);
  drawBrushedStreaks(ctx, w, h, false, 180, 413, 0.018, 0.020);

  // Machined recessed acoustic deck perimeter groove (well clear of outer corner bevels)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(54, 54, w - 108, h - 108);
  ctx.strokeStyle = 'rgba(10, 14, 20, 0.55)';
  ctx.lineWidth = 2.0;
  ctx.strokeRect(58, 58, w - 116, h - 116);

  // Recessed machined L & R grille acoustic pocket shadows + laser perimeter hairline
  for (const gx of [182, 586]) {
    ctx.fillStyle = 'rgba(11, 14, 20, 0.48)';
    ctx.fillRect(gx - 68, 434, 136, 136);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.30)';
    ctx.lineWidth = 2.0;
    ctx.strokeRect(gx - 68, 434, 136, 136);
  }
  // Rear 3rd directional / voice-memo recessed pocket
  ctx.fillStyle = 'rgba(11, 14, 20, 0.46)';
  ctx.fillRect(w * 0.5 - 56, 108, 112, 112);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
  ctx.strokeRect(w * 0.5 - 56, 108, 112, 112);

  // Subtle Multi-Interface (MI) Shoe contact bay guide recess & 21-pin front registration ticks
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.20)';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(w * 0.5 - 118, 304, 236, 184);
  ctx.fillStyle = 'rgba(234, 179, 8, 0.52)';
  for (let i = 0; i < 21; i++) {
    ctx.fillRect(w * 0.5 - 92 + i * 9, 474, 5, 10);
  }

  // Crisp Sony laser-printed L & R stereo microphone badges & acoustic phase scale ticks
  ctx.fillStyle = 'rgba(241, 245, 249, 0.94)';
  ctx.font = '700 44px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('L', 182, 378);
  ctx.fillText('R', 586, 378);

  // Subtle Sony laser directional wave arcs beside L & R marks
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)';
  ctx.lineWidth = 2.2;
  for (const [cx, dir] of [
    [138, -1],
    [630, 1],
  ] as const) {
    for (const r of [14, 23]) {
      ctx.beginPath();
      ctx.arc(cx, 378, r, dir < 0 ? Math.PI * 0.72 : -Math.PI * 0.28, dir < 0 ? Math.PI * 1.28 : Math.PI * 0.28);
      ctx.stroke();
    }
  }

  // Rear 3rd directional / voice-memo indicator & Sony OEM chassis silkscreen
  ctx.fillStyle = 'rgba(203, 213, 225, 0.86)';
  ctx.font = '700 20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('REAR / VOICE MEMO', w * 0.5, 254);

  // Crisp Sony digital audio micro-stencil + focal-plane style datum mark along front apron
  ctx.fillStyle = 'rgba(203, 213, 225, 0.72)';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.fillText('SONY  ILCE-7M4 / ZV-E1  •  3-CAPSULE DIGITAL AUDIO', w * 0.5, 654);
  ctx.fillStyle = 'rgba(148, 163, 184, 0.48)';
  ctx.font = '600 14px "Courier New", monospace';
  ctx.fillText('AZ91D-MG  •  IP57 ACOUSTIC DECK  •  21-PIN MI-SHOE', w * 0.5, 684);

  // Sony microphone wave icon centered above front apron
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.78)';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.arc(w * 0.5, 566, 13, 0, Math.PI * 2);
  ctx.stroke();
  for (const r of [23, 33]) {
    ctx.beginPath();
    ctx.arc(w * 0.5, 566, r, -Math.PI * 0.34, Math.PI * 0.34);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w * 0.5, 566, r, Math.PI * 0.66, Math.PI * 1.34);
    ctx.stroke();
  }

  // Corner CNC datum crosshairs
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.34)';
  ctx.lineWidth = 1.6;
  for (const [fx, fy] of [
    [90, 90],
    [w - 90, 90],
    [90, h - 90],
    [w - 90, h - 90],
  ]) {
    ctx.beginPath();
    ctx.arc(fx, fy, 11, 0, Math.PI * 2);
    ctx.moveTo(fx - 17, fy);
    ctx.lineTo(fx + 17, fy);
    ctx.moveTo(fx, fy - 17);
    ctx.lineTo(fx, fy + 17);
    ctx.stroke();
  }

  return toHiTex(canvas);
}

function createMicStainlessMeshTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Deep matte-black acoustic void behind SUS304 2x2 Dutch-twill micro-woven wire screen
  ctx.fillStyle = '#090c12';
  ctx.fillRect(0, 0, s, s);

  const pitch = 10.6666667; // 24 wires across 256 px -> exact seamless wrap!
  for (let row = 0; row < 24; row++) {
    const y = row * pitch;
    for (let col = 0; col < 24; col++) {
      const x = col * pitch;
      // 2x2 twill weave parity creates unmistakable diagonal stainless acoustic shimmer!
      const overH = ((row + col) % 4) < 2;

      const hg = ctx.createLinearGradient(0, y + 1.5, 0, y + 6.5);
      hg.addColorStop(0, '#475264');
      hg.addColorStop(0.38, overH ? '#ffffff' : '#9aa8bc');
      hg.addColorStop(0.68, overH ? '#cbd5e1' : '#64748b');
      hg.addColorStop(1, '#293240');

      const vg = ctx.createLinearGradient(x + 1.5, 0, x + 6.5, 0);
      vg.addColorStop(0, '#444f60');
      vg.addColorStop(0.38, !overH ? '#ffffff' : '#91a0b4');
      vg.addColorStop(0.68, !overH ? '#c6d1e0' : '#5e6e82');
      vg.addColorStop(1, '#262e3c');

      if (overH) {
        ctx.fillStyle = vg;
        ctx.fillRect(x + 1.8, y, 4.6, pitch + 0.4);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.52)';
        ctx.fillRect(x, y + 6.2, pitch + 0.4, 1.5);
        ctx.fillStyle = hg;
        ctx.fillRect(x, y + 1.8, pitch + 0.4, 4.6);
      } else {
        ctx.fillStyle = hg;
        ctx.fillRect(x, y + 1.8, pitch + 0.4, 4.6);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.52)';
        ctx.fillRect(x + 6.2, y, 1.5, pitch + 0.4);
        ctx.fillStyle = vg;
        ctx.fillRect(x + 1.8, y, 4.6, pitch + 0.4);
      }
    }
  }

  return toTileTex(canvas, 4.2, 4.2);
}

function createMicEptfeTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Authentic W.L. Gore GORE® GAW333 expanded PTFE microporous node-and-fibril web (SEM accurate!)
  ctx.fillStyle = '#eef2f7';
  ctx.fillRect(0, 0, s, s);
  const rng = mulberry32(433);

  // Subtle pearlescent hydrophobic pores (3D tortuous sub-micron air channels)
  ctx.fillStyle = 'rgba(186, 198, 214, 0.34)';
  ctx.beginPath();
  for (let i = 0; i < 650; i++) {
    const x = rng() * s;
    const y = rng() * s;
    const rx = 1.2 + rng() * 3.0;
    const ry = 0.8 + rng() * 2.0;
    ctx.moveTo(x + rx, y);
    ctx.ellipse(x, y, rx, ry, rng() * Math.PI, 0, Math.PI * 2);
  }
  ctx.fill();

  // Stretched biaxial PTFE microfibril lattice strands connecting dense PTFE nodes
  for (const [col, lw, n] of [
    ['rgba(176, 190, 208, 0.55)', 0.9, 520],
    ['rgba(255, 255, 255, 0.82)', 0.75, 580],
    ['rgba(202, 216, 232, 0.42)', 0.5, 420],
  ] as const) {
    ctx.strokeStyle = col;
    ctx.lineWidth = lw;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = rng() * s;
      const y = rng() * s;
      const len = 7 + rng() * 22;
      const a = (i % 3 === 0 ? 0 : i % 3 === 1 ? Math.PI * 0.5 : rng() * Math.PI) + (rng() - 0.5) * 0.35;
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    }
    ctx.stroke();
  }

  // Dense crystalline PTFE anchor nodes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.beginPath();
  for (let i = 0; i < 240; i++) {
    const x = rng() * s;
    const y = rng() * s;
    const r = 1.0 + rng() * 1.9;
    ctx.moveTo(x + r, y);
    ctx.arc(x, y, r, 0, Math.PI * 2);
  }
  ctx.fill();

  return toTileTex(canvas, 2.5, 2.5);
}

function createMicMemsLidTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic Infineon XENSIV™ IM73A135V01 brushed C7521 nickel-silver Faraday cage shield roof
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#9faab9');
  g.addColorStop(0.32, '#d5dee9');
  g.addColorStop(0.62, '#9ca6b6');
  g.addColorStop(0.84, '#c7d0dc');
  g.addColorStop(1, '#8c96a6');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 640, 444, 0.095, 0.085);
  drawMicroGrain(ctx, w, h, 3200, 445, 0.025);

  // Precision double-step stamped perimeter chamfer crease
  ctx.strokeStyle = 'rgba(30, 38, 50, 0.65)';
  ctx.lineWidth = 7;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  // Stamped corner tooling registration dimples
  for (const [cx, cy] of [
    [54, 54],
    [w - 54, 54],
    [54, h - 54],
    [w - 54, h - 54],
  ]) {
    ctx.fillStyle = 'rgba(40, 48, 60, 0.35)';
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // Laser-ablated Infineon XENSIV IM73A135V01 production traceability legend
  ctx.fillStyle = 'rgba(20, 27, 38, 0.92)';
  ctx.textAlign = 'left';
  ctx.font = '800 32px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('Infineon  XENSIV™', 404, 152);
  ctx.font = '700 44px "Courier New", monospace';
  ctx.fillText('IM73A135V01', 404, 224);
  ctx.font = '700 28px "Courier New", monospace';
  ctx.fillText('SDM 73dBA 135dB', 404, 280);
  ctx.font = '600 24px "Courier New", monospace';
  ctx.fillText('IP57 LLGA-5-2', 404, 330);
  ctx.fillText('LOT 2642  A3-K', 404, 376);

  // Authentic laser-etched ECC-200 2D DataMatrix traceability code on lower-right roof
  drawDataMatrix(ctx, 412, 424, 156, 14, 'rgba(18, 24, 34, 0.88)', 'rgba(226, 232, 240, 0.32)', 448);

  // Pin-1 circular index laser crater & gold chamfer halo
  ctx.fillStyle = 'rgba(18, 24, 34, 0.92)';
  ctx.beginPath();
  ctx.arc(672, 104, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.72)';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Rolled brass/gold-plated collar marking around left circular top acoustic port
  ctx.strokeStyle = 'rgba(196, 148, 44, 0.88)';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(248, h * 0.5, 144, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(254, 243, 199, 0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(248, h * 0.5, 132, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(248, h * 0.5, 158, 0, Math.PI * 2);
  ctx.stroke();

  return toHiTex(canvas);
}

function createMicMemsDiaphragmTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic 0.8 µm LPCVD corrugated polysilicon MEMS diaphragm with thin-film Si iridescence
  const cx = w * 0.5;
  const cy = h * 0.5;
  const rg = ctx.createRadialGradient(cx, cy, 8, cx, cy, w * 0.5);
  rg.addColorStop(0, '#1e3a8a');
  rg.addColorStop(0.22, '#0284c7');
  rg.addColorStop(0.42, '#0d9488');
  rg.addColorStop(0.64, '#2563eb');
  rg.addColorStop(0.82, '#4f46e5');
  rg.addColorStop(1, '#0f172a');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, w, h);

  // Subtle crystalline polysilicon grain shimmer
  drawMicroGrain(ctx, w, h, 4200, 452, 0.04);

  // 10 crisp concentric sinusoidal stress-relief corrugations (alternating specular peak & shadow valley!)
  for (let r = 56; r < w * 0.45; r += 26) {
    ctx.strokeStyle = 'rgba(224, 242, 254, 0.62)';
    ctx.lineWidth = 6.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(8, 15, 32, 0.58)';
    ctx.lineWidth = 4.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 6.5, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Central gold electrostatic sense-electrode metallization disc & crosshairs
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 44, 0, Math.PI * 2);
  ctx.stroke();

  // 16 Knowles-style radial perimeter edge-stiffening fingers & 8 stress-relief spring slits!
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const isSlit = i % 2 === 0;
    ctx.strokeStyle = isSlit ? 'rgba(250, 204, 21, 0.88)' : 'rgba(125, 211, 252, 0.58)';
    ctx.lineWidth = isSlit ? 6.5 : 3.4;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * (isSlit ? 268 : 298), cy + Math.sin(a) * (isSlit ? 268 : 298));
    ctx.lineTo(cx + Math.cos(a) * 364, cy + Math.sin(a) * 364);
    ctx.stroke();
  }

  // Outer gold clamping anchor electrode ring
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, 366, 0, Math.PI * 2);
  ctx.stroke();

  return toHiTex(canvas);
}

function createMicSh1035FlexTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic Sony OEM amber-copper Kapton polyimide flex base (Ref.307 / A-5033-450-A)
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#a85710');
  g.addColorStop(0.35, '#cc761c');
  g.addColorStop(0.68, '#b96514');
  g.addColorStop(1, '#8f470a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 2600, 461, 0.03);

  // Embedded impedance-controlled differential copper trace pairs (L+/L-, R+/R-, C+/C-, MICBIAS, AGND)
  for (const [ty, lw, col] of [
    [168, 12, '#6d2e06'],
    [194, 8, '#8a3d0a'],
    [224, 10, '#6d2e06'],
    [252, 10, '#6d2e06'],
    [516, 10, '#6d2e06'],
    [544, 10, '#6d2e06'],
    [574, 8, '#8a3d0a'],
    [600, 12, '#6d2e06'],
  ] as const) {
    ctx.strokeStyle = col;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(26, ty);
    ctx.lineTo(w - 26, ty);
    ctx.stroke();
  }

  // Tatsuta SF-PC5600 hatched conductive silver-ink EMI shield film window over central trunk
  ctx.fillStyle = 'rgba(148, 163, 184, 0.72)';
  ctx.fillRect(118, 118, w - 236, h - 236);
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.65)';
  ctx.lineWidth = 3.2;
  ctx.strokeRect(118, 118, w - 236, h - 236);
  ctx.beginPath();
  for (let i = -h; i < w + h; i += 20) {
    ctx.moveTo(118 + i, 118);
    ctx.lineTo(118 + i - 360, h - 118);
    ctx.moveTo(118 + i - 360, 118);
    ctx.lineTo(118 + i, h - 118);
  }
  ctx.save();
  ctx.beginPath();
  ctx.rect(118, 118, w - 236, h - 236);
  ctx.clip();
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.32)';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  for (let i = -h; i < w + h; i += 24) {
    ctx.moveTo(118 + i, 118);
    ctx.lineTo(118 + i - 532, h - 118);
    ctx.moveTo(118 + i - 532, 118);
    ctx.lineTo(118 + i, h - 118);
  }
  ctx.stroke();
  ctx.restore();

  // Stitched ENIG gold ground-return vias flanking EMI shield perimeter
  for (let vx = 148; vx <= w - 148; vx += 48) {
    for (const vy of [136, h - 136]) {
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(vx, vy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(vx, vy, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Crisp white Sony ILCE-7M4 Service Manual silkscreen legend (verified: Ref.307 / SH-1035 / A-5033-450-A!)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
  ctx.font = '800 54px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SONY  SH-1035', w * 0.5, 294);
  ctx.font = '700 34px "Courier New", monospace';
  ctx.fillText('A-5033-450-A  REV.2', w * 0.5, 368);
  ctx.font = '700 24px "Courier New", monospace';
  ctx.fillStyle = 'rgba(241, 245, 249, 0.92)';
  ctx.fillText('L-MEMS +/-  •  AGND  •  R-ECM +/-', w * 0.5, 434);
  ctx.font = '600 20px "Courier New", monospace';
  ctx.fillStyle = 'rgba(254, 240, 138, 0.90)';
  ctx.fillText('>PI<  DIFF 90Ω SHIELD  •  CN307 10P', w * 0.5, 492);

  // ENIG gold capsule termination solder pads & optical fiducial targets on left/right wings
  for (const px of [34, w - 98]) {
    for (const py of [174, 332, 490]) {
      ctx.fillStyle = '#eab648';
      ctx.fillRect(px, py, 64, 58);
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 3;
      ctx.strokeRect(px, py, 64, 58);
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(px + 32, py + 29, 9, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return toHiTex(canvas);
}

function createMicEcmJfetPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;

  // Deep emerald circular ECM FR-4 PCB with woven glass-epoxy undertone
  ctx.fillStyle = '#0b462f';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(22, 101, 68, 0.25)';
  ctx.lineWidth = 2;
  for (let i = 0; i < w; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.moveTo(0, i);
    ctx.lineTo(w, i);
    ctx.stroke();
  }

  // Outer ENIG gold GND solder ring (crimped directly against spun aluminum ECM case!)
  const ringGrad = ctx.createLinearGradient(0, 0, w, h);
  ringGrad.addColorStop(0, '#d4a135');
  ringGrad.addColorStop(0.5, '#f5d26b');
  ringGrad.addColorStop(1, '#c59028');
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 48;
  ctx.beginPath();
  ctx.arc(cx, cy, 316, 0, Math.PI * 2);
  ctx.stroke();

  // Inner copper ground guard trace & radial vias
  ctx.strokeStyle = '#198754';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, 246, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * 246, cy + Math.sin(a) * 246, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#052e16';
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * 246, cy + Math.sin(a) * 246, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Center ENIG gold +SIG circular solder pad & SOT-23 2SK596 routing pads
  ctx.fillStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 88, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#052e16';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Dual C0G 10pF / 33pF RF bypass cap & 1G-ohm diode pad outlines
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.82)';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(184, 344, 96, 62);
  ctx.strokeRect(488, 344, 96, 62);
  ctx.strokeRect(334, 514, 100, 56);

  ctx.fillStyle = 'rgba(248, 250, 252, 0.92)';
  ctx.font = '700 30px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('2SK596-B  JFET', cx, 168);
  ctx.font = '700 22px "Courier New", monospace';
  ctx.fillText('C1 10pF', 232, 330);
  ctx.fillText('C2 33pF', 536, 330);
  ctx.fillText('R1 1GΩ BIAS', cx, 602);
  ctx.fillStyle = '#fde68a';
  ctx.fillText('+SIG / CASE GND', cx, 648);

  return toHiTex(canvas);
}

function createMicAcousticFeltTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Authentic Rogers PORON® 4790-79 / LE-20 micro-cellular open-cell urethane & acoustic felt
  ctx.fillStyle = '#14171e';
  ctx.fillRect(0, 0, s, s);
  const rng = mulberry32(477);

  // Multi-scale open micro-cells with bright rim walls and deep matte pore cavities
  for (const [col, minR, maxR, n] of [
    ['rgba(58, 66, 80, 0.42)', 1.6, 3.4, 480],
    ['rgba(6, 8, 12, 0.78)', 0.9, 2.3, 620],
    ['rgba(102, 114, 132, 0.24)', 0.6, 1.4, 360],
  ] as const) {
    ctx.fillStyle = col;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = rng() * s;
      const y = rng() * s;
      const r = minR + rng() * (maxR - minR);
      ctx.moveTo(x + r, y);
      ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    ctx.fill();
  }
  // Subtle non-woven acoustic felt entanglement fibers
  ctx.strokeStyle = 'rgba(130, 142, 160, 0.18)';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  for (let i = 0; i < 260; i++) {
    const x = rng() * s;
    const y = rng() * s;
    const a = rng() * Math.PI * 2;
    const l = 5 + rng() * 12;
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
  }
  ctx.stroke();

  return toTileTex(canvas, 3.5, 3.5);
}

/** Authentic Sony OEM RUBBER (885) 502687801 Shore-40A charcoal silicone/EPDM shock-isolation micro-stipple */
function createMicRubberBootTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#1a1d23';
  ctx.fillRect(0, 0, s, s);
  const rng = mulberry32(488);

  // Fine VDI-30 matte elastomer micro-pebble + mold release micro-pores (100% tileable)
  for (const [col, szMax, n] of [
    ['rgba(255, 255, 255, 0.055)', 1.4, 3200],
    ['rgba(0, 0, 0, 0.24)', 1.7, 3600],
    ['rgba(148, 163, 184, 0.045)', 0.9, 1800],
  ] as const) {
    ctx.fillStyle = col;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = rng() * s;
      const y = rng() * s;
      const sz = 0.45 + rng() * szMax;
      ctx.rect(x, y, sz, sz);
    }
    ctx.fill();
  }
  // Subtle injection-molded horizontal compression rib contour streaks
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.032)';
  ctx.lineWidth = 1.2;
  for (let y = 16; y < s; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(s, y);
    ctx.stroke();
  }
  return toTileTex(canvas, 3, 3);
}

// =============================================================================
// 3. SONY NP-FZ100 BATTERY PACK PROCEDURAL TEXTURES
// =============================================================================

function createMattePcShellTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Authentic genuine Sony jet-charcoal satin UL94 V-0 polycarbonate (100% seamlessly tileable VDI-27 EDM micro-pebble!)
  ctx.fillStyle = '#1b1e25';
  ctx.fillRect(0, 0, s, s);
  const rng = mulberry32(501);
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0; i < 4800; i++) {
      const x = rng() * s;
      const y = rng() * s;
      const sz = 0.45 + rng() * 0.72;
      ctx.rect(x, y, sz, sz);
      if (x + sz > s) ctx.rect(x - s, y, sz, sz);
      if (y + sz > s) ctx.rect(x, y - s, sz, sz);
    }
    ctx.fillStyle = pass === 0 ? 'rgba(255,255,255,0.024)' : 'rgba(0,0,0,0.048)';
    ctx.fill();
  }
  return toTileTex(canvas, 4, 4);
}

function createBatteryFrontLabelTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic genuine Sony NP-FZ100 matte slate-charcoal nameplate (verified: matte gray-charcoal, NOT glossy!)
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#2a2e36');
  bg.addColorStop(0.5, '#242830');
  bg.addColorStop(1, '#20242c');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 1800, 510, 0.04);

  // Fine silver-gray perimeter trim border
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.24)';
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, w - 36, h - 36);

  // Top-left crisp white SONY serif wordmark
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 84px Georgia, "Times New Roman", serif';
  ctx.fillText('SONY', 52, 96);

  // InfoLITHIUM Z-series emblem below SONY
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '700 32px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('InfoLITHIUM', 54, 162);

  // Signature Sony Z-Series boxed badge
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(284, 138, 48, 44);
  ctx.fillStyle = '#1e2128';
  ctx.font = '900 34px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Z', 308, 162);

  // Model & electrical ratings (exact genuine NP-FZ100 specs!)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 44px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('NP-FZ100', 54, 240);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '600 24px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('RECHARGEABLE BATTERY PACK', 54, 286);
  ctx.fillText('リチャージャブルバッテリーパック', 54, 318);

  // Electrical specification highlight band
  ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
  ctx.fillRect(48, 348, w - 96, 68);
  ctx.strokeStyle = 'rgba(217, 119, 54, 0.65)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(48, 348, w - 96, 68);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 34px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('7.2 V   2280 mAh   16.4 Wh', w * 0.5, 384);

  // Authentic genuine safety notice text (verified wording!)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '600 20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('CAUTION: Do not heat in a microwave, etc.', 54, 454);
  ctx.fillText('Do not short-circuit or disassemble. Do not incinerate.', 54, 482);
  ctx.fillText('Use specified Sony charger only.  2INR19/51', 54, 510);

  // Regulatory marks row: Li-ion 20 recycle, PSE, CE, UKCA, WEEE crossed bin
  drawLiIonRecycle(ctx, 108, 592, 42, '#e2e8f0');

  // PSE circle mark
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(212, 592, 34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '800 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PS', 212, 582);
  ctx.fillText('E', 212, 606);

  // CE & UKCA
  ctx.font = '800 44px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('CE', 322, 592);
  ctx.font = '800 26px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('UK', 416, 578);
  ctx.fillText('CA', 416, 608);

  // WEEE bin & EAC
  drawWeeeBin(ctx, 516, 592, 66, '#e2e8f0');
  ctx.font = '800 34px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('EAC', 636, 592);

  // Iconic Sony Alpha cinnabar-orange bottom accent bar + Sony Corporation footer
  ctx.fillStyle = '#d95b26';
  ctx.fillRect(48, 668, w - 96, 18);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 20px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Sony Corporation', 52, 718);
  ctx.textAlign = 'right';
  ctx.fillText('CELL ORIGIN JAPAN / PACK CHINA', w - 52, 718);

  // Subtle recessed dark seating square in top-right where the 3D hologram sticker sits!
  ctx.fillStyle = '#181c22';
  ctx.fillRect(498, 48, 214, 214);
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.35)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(498, 48, 214, 214);

  return toHiTex(canvas);
}

function createBatteryHologramTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);

  // Multi-prism rainbow security foil hologram pattern
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0.0, '#7dd3fc');
  g.addColorStop(0.22, '#c084fc');
  g.addColorStop(0.45, '#5eead4');
  g.addColorStop(0.68, '#fde047');
  g.addColorStop(0.85, '#818cf8');
  g.addColorStop(1.0, '#38bdf8');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Optical micro-diffraction guilloche concentric security rings
  const cx = w * 0.5;
  const cy = h * 0.5;
  ctx.strokeStyle = 'rgba(255,255,255,0.48)';
  ctx.lineWidth = 2.4;
  for (let r = 36; r < 240; r += 20) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Diagonal prismatic lenticular lines
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.16)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = -h; i < w + h; i += 18) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
  }
  ctx.stroke();

  // Sharp security wordmark & unique micro-serial
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '700 84px Georgia, serif';
  ctx.fillText('SONY', cx, cy - 32);
  ctx.font = '800 32px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('ORIGINAL', cx, cy + 42);
  ctx.font = '700 28px "Courier New", monospace';
  ctx.fillText('FZ 8942710K', cx, cy + 114);

  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  return toHiTex(canvas);
}

function createBatteryRearLaserTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Matte jet-charcoal polycarbonate back face with crisp laser-etched traceability block
  ctx.fillStyle = '#1d2027';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 2000, 520, 0.05);

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 5;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Crisp laser-etched DataMatrix on left
  drawDataMatrix(ctx, 56, 154, 210, 14, '#d6dee8', '#14171c', 52099);

  // Crisp high-contrast genuine laser-etched lot/date/cell-grade text on right
  ctx.fillStyle = '#dbe3ed';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 54px "Courier New", monospace';
  ctx.fillText('20250918', 306, 206);
  ctx.font = '700 44px "Courier New", monospace';
  ctx.fillText('LOT Z25J-04', 306, 276);
  ctx.fillStyle = '#aeb9c7';
  ctx.font = '600 34px "Courier New", monospace';
  ctx.fillText('2INR19/51  83g', 306, 342);

  // Molded polarity & insertion guide strip across bottom
  ctx.fillStyle = 'rgba(203, 213, 225, 0.65)';
  ctx.font = '800 44px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('▲   INSERT   +   T   S   -', w * 0.5, 592);

  return toHiTex(canvas);
}

function createBatteryCellWrapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic Sony / Murata US18500GR matte olive-emerald PVC heat-shrink sleeve!
  const g = ctx.createLinearGradient(0, 0, w, 0);
  g.addColorStop(0, '#145940');
  g.addColorStop(0.25, '#1c7554');
  g.addColorStop(0.5, '#176649');
  g.addColorStop(0.75, '#1e7b59');
  g.addColorStop(1, '#145940');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 240, 533, 0.04, 0.04);

  // Subtle top/bottom heat-shrink sheen bands
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.fillRect(0, 26, w, 12);
  ctx.fillRect(0, h - 38, w, 12);

  // Authentic black dot-matrix industrial cell laser-print markings (repeated twice around circumference)
  for (const offsetX of [48, 430]) {
    ctx.fillStyle = 'rgba(12, 18, 16, 0.86)';
    ctx.textAlign = 'left';
    ctx.font = '800 34px "Courier New", monospace';
    ctx.fillText('SE US18500GR', offsetX, 176);
    ctx.font = '700 28px "Courier New", monospace';
    ctx.fillText('MURATA / SONY', offsetX, 224);
    ctx.fillText('3.6V  2280mAh', offsetX, 272);
    ctx.fillText('8.2Wh  LI-ION', offsetX, 320);
    ctx.font = '700 24px "Courier New", monospace';
    ctx.fillText('G8B  K2548  04A', offsetX, 378);
    ctx.fillText('HIGH-DRAIN  6A', offsetX, 418);

    // Positive polarity marker ring at top
    ctx.font = '900 40px sans-serif';
    ctx.fillText('+  +  +  +', offsetX, 102);
    drawDataMatrix(ctx, offsetX, 468, 108, 10, 'rgba(12, 18, 16, 0.86)', null, 18500 + offsetX);
  }

  return toHiTex(canvas);
}

function createBatteryBmsPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Conformal-coated deep emerald-green Sony BMS PCB
  ctx.fillStyle = '#0c472e';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 1100, 544, 0.032);

  // Exposed thick 3-oz copper high-current charge/discharge bus rails under green solder mask
  ctx.fillStyle = '#1d8054';
  ctx.fillRect(42, 46, w - 84, 152);
  ctx.fillRect(42, h - 198, w - 84, 152);

  // Precision differential Kelvin sense traces & balancing lines
  ctx.strokeStyle = '#36bc80';
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const yy = 224 + i * 42;
    ctx.moveTo(64, yy);
    ctx.lineTo(230, yy);
    ctx.lineTo(268, yy + 20);
    ctx.lineTo(524, yy + 20);
    ctx.lineTo(562, yy - 12);
    ctx.lineTo(704, yy - 12);
  }
  ctx.stroke();

  // Heavy ENIG gold nickel-tab spot-weld pads on left (B-), center (BM), right (B+)
  ctx.fillStyle = '#ecc458';
  ctx.fillRect(32, 256, 104, 256);
  ctx.fillRect(w - 136, 256, 104, 256);
  ctx.fillRect(w * 0.5 - 48, 44, 96, 86);

  // 4 top terminal through-hole pads (+, T, S, -) + 6 factory calibration gold test-point pads (TP1-TP6)
  for (let i = 0; i < 4; i++) {
    const px = 210 + i * 116;
    ctx.fillStyle = '#ecc458';
    ctx.beginPath();
    ctx.arc(px, 676, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#071c12';
    ctx.beginPath();
    ctx.arc(px, 676, 12, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#f2cf68';
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const tx = 182 + i * 80;
    ctx.moveTo(tx + 11, 560);
    ctx.arc(tx, 560, 11, 0, Math.PI * 2);
  }
  ctx.fill();

  // Crisp SMT component silkscreen footprint brackets (U1 Fuel Gauge, U2 Crypto, Q1/Q2 MOSFET, R005 Shunt)
  ctx.strokeStyle = 'rgba(241, 245, 249, 0.72)';
  ctx.lineWidth = 3;
  ctx.strokeRect(224, 266, 122, 122);
  ctx.strokeRect(420, 266, 116, 116);
  ctx.strokeRect(160, 424, 150, 96);
  ctx.strokeRect(334, 434, 106, 72);

  // Crisp white SMT silkscreen designators & authentic Sony board part number
  ctx.fillStyle = 'rgba(241, 245, 249, 0.92)';
  ctx.font = '800 32px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('B-', 84, 230);
  ctx.fillText('B+', w - 84, 230);
  ctx.fillText('BM', w * 0.5, 160);
  ctx.fillText('P+    T     S    P-', w * 0.5, 616);
  ctx.font = '700 22px "Courier New", monospace';
  ctx.fillText('SONY NP-FZ100 BMS-V4  1-982-415-11  U1/U2/Q1/R005/Y1', w * 0.5, 214);

  return toHiTex(canvas);
}

function createBatteryElectrodeCoatingTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Calendered granular NMC cathode / Si-C graphite active electrode slurry texture
  ctx.fillStyle = '#232830';
  ctx.fillRect(0, 0, s, s);
  drawMicroGrain(ctx, s, s, 2600, 566, 0.08);
  drawBrushedStreaks(ctx, s, s, false, 140, 567, 0.04, 0.05);
  return toTileTex(canvas, 4, 2);
}

// =============================================================================
// 4. SONY CFEXPRESS 4.0 TYPE A TOUGH (CEA-G1920T) PROCEDURAL TEXTURES
// =============================================================================

function createCfeTopArmorTexture(): THREE.CanvasTexture {
  // Exact 0.751 aspect ratio matching 38.6 × 51.4 mm C01 Sony CEA-G1920T TOUGH armor plate (zero vertical stretch!)
  const { canvas, ctx, w, h } = makeHiCanvas(576, 768);

  // Dark PVD gunmetal-titanium brushed shell with anisotropic metallic sheen & fine CNC vertical brushing
  const bodyGrad = ctx.createLinearGradient(0, 0, w, h);
  bodyGrad.addColorStop(0, '#161a22');
  bodyGrad.addColorStop(0.22, '#272e3c');
  bodyGrad.addColorStop(0.46, '#181c25');
  bodyGrad.addColorStop(0.72, '#2c3342');
  bodyGrad.addColorStop(0.88, '#1b2029');
  bodyGrad.addColorStop(1, '#141820');
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(0, 0, w, h);

  // Anisotropic diagonal metallic studio sweep + ultra-fine vertical CNC brushing & titanium bead micro-grain
  const sheenGrad = ctx.createLinearGradient(0, h * 0.12, w, h * 0.72);
  sheenGrad.addColorStop(0, 'rgba(255,255,255,0)');
  sheenGrad.addColorStop(0.42, 'rgba(210,225,245,0.065)');
  sheenGrad.addColorStop(0.50, 'rgba(255,255,255,0.11)');
  sheenGrad.addColorStop(0.58, 'rgba(200,215,235,0.045)');
  sheenGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 920, 601, 0.058, 0.064);
  drawMicroGrain(ctx, w, h, 2400, 602, 0.026);

  // Subtle precision CNC machined double-step perimeter chamfer & shadow groove (rounded corners matching armorR=2.3)
  const rRect = (x: number, y: number, rw: number, rh: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + rw - r, y);
    ctx.quadraticCurveTo(x + rw, y, x + rw, y + r);
    ctx.lineTo(x + rw, y + rh - r);
    ctx.quadraticCurveTo(x + rw, y + rh, x + rw - r, y + rh);
    ctx.lineTo(x + r, y + rh);
    ctx.quadraticCurveTo(x, y + rh, x, y + rh - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };
  rRect(11, 11, w - 22, h - 22, 24);
  ctx.strokeStyle = 'rgba(226, 234, 244, 0.36)';
  ctx.lineWidth = 3.5;
  ctx.stroke();
  rRect(16, 16, w - 32, h - 32, 20);
  ctx.strokeStyle = 'rgba(6, 8, 12, 0.72)';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  rRect(20, 20, w - 40, h - 40, 18);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // === ICONIC SONY ALPHA CINNABAR-ORANGE ANODIZED TOP BAND + EMBOSSED WHITE "TOUGH" ===
  const bandX = 24;
  const bandY = 30;
  const bandW = w - 48;
  const bandH = 92;
  const stripeGrad = ctx.createLinearGradient(bandX, bandY, bandX + bandW, bandY + bandH);
  stripeGrad.addColorStop(0, '#c44614');
  stripeGrad.addColorStop(0.28, '#e86224');
  stripeGrad.addColorStop(0.52, '#f06d2e');
  stripeGrad.addColorStop(0.78, '#d45119');
  stripeGrad.addColorStop(1, '#b83e0f');
  rRect(bandX, bandY, bandW, bandH, 10);
  ctx.fillStyle = stripeGrad;
  ctx.fill();

  // Fine anodized horizontal satin brushing + subtle diagonal guilloché micro-hatch inside TOUGH band
  ctx.save();
  rRect(bandX, bandY, bandW, bandH, 10);
  ctx.clip();
  drawBrushedStreaks(ctx, w, bandY + bandH + 4, false, 180, 603, 0.055, 0.055);
  ctx.strokeStyle = 'rgba(255, 224, 196, 0.07)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let gx = -80; gx < w + 80; gx += 11) {
    ctx.moveTo(gx, bandY);
    ctx.lineTo(gx + 54, bandY + bandH);
  }
  ctx.stroke();
  // Top metallic specular highlight & bottom recessed shadow groove
  ctx.fillStyle = 'rgba(255, 232, 210, 0.52)';
  ctx.fillRect(bandX, bandY, bandW, 3.5);
  ctx.fillStyle = 'rgba(46, 12, 3, 0.62)';
  ctx.fillRect(bandX, bandY + bandH - 4, bandW, 4);
  ctx.restore();

  // Crisp embossed white "TOUGH" wordmark with subtle micro-drop shadow
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 50px "Arial Black", "Helvetica Neue", Arial, sans-serif';
  ctx.fillStyle = 'rgba(54, 15, 4, 0.48)';
  ctx.fillText('T O U G H', w * 0.5 + 1.5, bandY + bandH * 0.5 + 2.5);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('T O U G H', w * 0.5, bandY + bandH * 0.5 + 1);

  // === CRISP WHITE "SONY" SERIF WORDMARK + DIAMOND-CUT BRUSHED GOLD "G" SERIES BADGE ===
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 68px Georgia, "Times New Roman", serif';
  ctx.fillText('SONY', 36, 190);

  // True 1:1 square diamond-cut metallic brushed gold G-Series emblem (84 × 84 px!)
  const gx = w - 122;
  const gy = 148;
  const gs = 84;
  const goldGrad = ctx.createLinearGradient(gx, gy, gx + gs, gy + gs);
  goldGrad.addColorStop(0, '#f5d97e');
  goldGrad.addColorStop(0.28, '#c89222');
  goldGrad.addColorStop(0.55, '#fae298');
  goldGrad.addColorStop(0.80, '#b57e16');
  goldGrad.addColorStop(1, '#e6bd56');
  rRect(gx, gy, gs, gs, 7);
  ctx.fillStyle = goldGrad;
  ctx.fill();
  ctx.save();
  rRect(gx, gy, gs, gs, 7);
  ctx.clip();
  // Fine horizontal metallic spin-grain on gold badge
  ctx.fillStyle = 'rgba(255,255,255,0.09)';
  for (let by = gy; by < gy + gs; by += 3) {
    ctx.fillRect(gx, by, gs, 1);
  }
  ctx.restore();
  rRect(gx + 2, gy + 2, gs - 4, gs - 4, 5);
  ctx.strokeStyle = 'rgba(255, 250, 224, 0.72)';
  ctx.lineWidth = 2;
  ctx.stroke();
  rRect(gx + 5, gy + 5, gs - 10, gs - 10, 3);
  ctx.strokeStyle = 'rgba(84, 54, 8, 0.42)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.fillStyle = '#151921';
  ctx.textAlign = 'center';
  ctx.font = '900 58px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('G', gx + gs * 0.5, gy + gs * 0.5 + 3);

  // === CFexpress + BOXED TYPE "A" + CINNABAR "4.0" BADGE (ZERO STRETCH!) ===
  ctx.fillStyle = '#eef2f7';
  ctx.textAlign = 'left';
  ctx.font = '800 44px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('CFexpress', 36, 286);

  // Crisp boxed Type "A" emblem
  const ax = 286;
  const ay = 260;
  rRect(ax, ay, 48, 52, 5);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 3.8;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = '900 38px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('A', ax + 24, ay + 28);

  // Metallic cinnabar "4.0" CFexpress 4 standard badge
  const bx = 350;
  const by = 260;
  const bw = 92;
  const bh = 52;
  const b4Grad = ctx.createLinearGradient(bx, by, bx, by + bh);
  b4Grad.addColorStop(0, '#f06a2b');
  b4Grad.addColorStop(0.5, '#db521a');
  b4Grad.addColorStop(1, '#b83f0f');
  rRect(bx, by, bw, bh, 5);
  ctx.fillStyle = b4Grad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 220, 190, 0.45)';
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('4.0', bx + bw * 0.5, by + bh * 0.5 + 2);

  // Subtle gold/platinum technical micro-label beside 4.0
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'right';
  ctx.font = '700 15px "Courier New", monospace';
  ctx.fillText('PCIe', w - 38, 275);
  ctx.fillStyle = '#eab308';
  ctx.fillText('GEN4', w - 38, 297);

  // Graduated brushed-gold metallic separator hairline
  const ruleGrad = ctx.createLinearGradient(36, 338, w - 36, 338);
  ruleGrad.addColorStop(0, 'rgba(212, 162, 48, 0.25)');
  ruleGrad.addColorStop(0.25, 'rgba(246, 206, 94, 0.92)');
  ruleGrad.addColorStop(0.75, 'rgba(218, 168, 52, 0.88)');
  ruleGrad.addColorStop(1, 'rgba(212, 162, 48, 0.25)');
  ctx.fillStyle = ruleGrad;
  ctx.fillRect(36, 338, w - 72, 3.5);

  // === LARGE CAPACITY CALLOUT ("1920 GB") ===
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 94px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('1920', 34, 424);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '700 44px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('GB', 274, 439);

  // Subtle dark telemetry bay behind Read/Write speeds & VPG clapperboards
  rRect(34, 496, w - 68, 146, 10);
  ctx.fillStyle = 'rgba(10, 14, 22, 0.42)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // === READ / WRITE SPEED RATINGS (SONY CEA-G1920T: R 1800 / W 1700 MB/s!) ===
  ctx.textAlign = 'left';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '800 20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('R:', 50, 534);
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 38px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('1800', 78, 534);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 18px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('MB/s', 176, 539);
  // Mini throughput accent bar
  ctx.fillStyle = 'rgba(226, 232, 240, 0.22)';
  ctx.fillRect(50, 558, 178, 4);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(50, 558, 170, 4);

  ctx.fillStyle = '#d4a336';
  ctx.font = '800 20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('W:', 50, 594);
  ctx.fillStyle = '#f5c758';
  ctx.font = '800 38px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('1700', 78, 594);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '700 18px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('MB/s', 176, 599);
  ctx.fillStyle = 'rgba(245, 199, 88, 0.22)';
  ctx.fillRect(50, 618, 178, 4);
  ctx.fillStyle = '#f5c758';
  ctx.fillRect(50, 618, 160, 4);

  // === TRUE-PROPORTION VPG 400 & VPG 800 CLAPPERBOARD BADGES ===
  drawVpgBadge(ctx, 268, 514, 118, 108, '400', '#e2e8f0', '#141822');
  drawVpgBadge(ctx, 404, 514, 118, 108, '800', '#f5c758', '#141822');

  // Crisp bottom technical micro-engraving & centered Sony insertion arrow
  ctx.fillStyle = 'rgba(214, 224, 236, 0.86)';
  ctx.font = '700 17px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('CEA-G1920T', 38, 678);
  ctx.fillStyle = 'rgba(160, 176, 196, 0.85)';
  ctx.textAlign = 'center';
  ctx.fillText('IP57 · 150N · 7.5m', w * 0.5, 678);
  ctx.textAlign = 'right';
  ctx.fillText('NVMe 2.4', w - 38, 678);

  // Recessed precision directional insertion chevron at bottom center
  ctx.fillStyle = 'rgba(232, 238, 246, 0.86)';
  ctx.beginPath();
  ctx.moveTo(w * 0.5 - 15, 704);
  ctx.lineTo(w * 0.5 + 15, 704);
  ctx.lineTo(w * 0.5, 725);
  ctx.closePath();
  ctx.fill();

  return toHiTex(canvas);
}

function createCfeBackplateLaserTexture(): THREE.CanvasTexture {
  // Exact 0.766 aspect ratio matching 38.6 × 50.4 mm C02 SUS304 stainless dissipation backplate!
  const { canvas, ctx, w, h } = makeHiCanvas(588, 768);

  // Anisotropic cold-rolled brushed SUS304 stainless steel base with studio metallic reflection bands
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#a4b0bf');
  bg.addColorStop(0.24, '#cdd6e2');
  bg.addColorStop(0.48, '#9aa6b5');
  bg.addColorStop(0.74, '#cfd8e4');
  bg.addColorStop(1, '#aab6c5');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 960, 611, 0.088, 0.082);
  drawMicroGrain(ctx, w, h, 1800, 612, 0.022);

  // Double-step machined laser-clinch perimeter groove
  const rRect = (x: number, y: number, rw: number, rh: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + rw - r, y);
    ctx.quadraticCurveTo(x + rw, y, x + rw, y + r);
    ctx.lineTo(x + rw, y + rh - r);
    ctx.quadraticCurveTo(x + rw, y + rh, x + rw - r, y + rh);
    ctx.lineTo(x + r, y + rh);
    ctx.quadraticCurveTo(x, y + rh, x, y + rh - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };
  rRect(15, 15, w - 30, h - 30, 22);
  ctx.strokeStyle = 'rgba(24, 34, 48, 0.56)';
  ctx.lineWidth = 4.5;
  ctx.stroke();
  rRect(21, 21, w - 42, h - 42, 18);
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.45)';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // MOPA 1064nm fiber-laser dark-oxide annealed charcoal markings
  const etch = 'rgba(18, 24, 34, 0.92)';
  const etchSub = 'rgba(34, 44, 58, 0.84)';
  ctx.fillStyle = etch;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 54px Georgia, "Times New Roman", serif';
  ctx.fillText('SONY', 38, 86);

  ctx.textAlign = 'right';
  ctx.font = '800 31px "Courier New", monospace';
  ctx.fillText('CEA-G1920T', w - 38, 72);
  ctx.fillStyle = etchSub;
  ctx.font = '700 20px "Courier New", monospace';
  ctx.fillText('CFexpress™ 4.0 Type A', w - 38, 104);

  // Fine dual horizontal MOPA laser divider rule
  ctx.fillStyle = etch;
  ctx.fillRect(38, 134, w - 76, 3);
  ctx.fillStyle = 'rgba(30, 41, 59, 0.35)';
  ctx.fillRect(38, 140, w - 76, 1.2);

  // === VPG 800 CLAPPERBOARD — EXACTLY ALIGNED INSIDE C37 GOLD BEZEL (center x=108, y=266!) ===
  drawVpgBadge(ctx, 48, 202, 120, 126, '800', etch, 'rgba(226, 232, 240, 0.28)');

  // Center technical spec block (ultra-crisp MOPA micro-stencil, zero overlap!)
  ctx.fillStyle = etch;
  ctx.textAlign = 'left';
  ctx.font = '800 17px "Courier New", monospace';
  ctx.fillText('1920 GB  PCIe G4×1', 194, 210);
  ctx.fillStyle = etchSub;
  ctx.font = '700 16px "Courier New", monospace';
  ctx.fillText('3.3V ⎓ 1.8A  NVMe 2.4', 194, 238);
  ctx.fillText('IP57 · 150N · 7.5m', 194, 266);
  ctx.fillText('R:1800 / W:1700 MB/s', 194, 294);
  ctx.fillText('-12°C ~ +72°C TOUGH', 194, 322);

  // TRUE 1:1 SQUARE 16×16 ECC-200 2D DataMatrix barcode on right (134 × 134 px!)
  ctx.fillStyle = 'rgba(241, 245, 249, 0.35)';
  ctx.fillRect(w - 174, 194, 140, 140);
  drawDataMatrix(ctx, w - 170, 198, 132, 16, etch, null, 61920);
  ctx.fillStyle = etchSub;
  ctx.textAlign = 'center';
  ctx.font = '700 13px "Courier New", monospace';
  ctx.fillText('A4-1920-2638K', w - 104, 349);

  // Hairline separator above regulatory certification row
  ctx.fillStyle = 'rgba(30, 41, 59, 0.30)';
  ctx.fillRect(38, 376, w - 76, 1.8);

  // === AUTHENTIC GLOBAL REGULATORY COMPLIANCE MARKS (CE, FC, UKCA, VCCI, KC, RCM, WEEE) ===
  ctx.fillStyle = etch;
  ctx.textAlign = 'center';
  ctx.font = '800 36px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('CE', 76, 428);
  ctx.fillText('FC', 156, 428);
  ctx.font = '800 21px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('UK', 230, 416);
  ctx.fillText('CA', 230, 439);
  // Boxed VCCI Class B mark
  ctx.strokeStyle = etch;
  ctx.lineWidth = 2.4;
  ctx.strokeRect(274, 408, 78, 38);
  ctx.font = '800 24px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('VCCI', 313, 428);
  // KC Korea compliance mark + ISO 7816-1 X-Ray badge
  ctx.font = '800 28px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('KC', 390, 428);
  ctx.font = '700 13px "Courier New", monospace';
  ctx.fillText('ISO7816', 456, 418);
  ctx.fillText('X-RAY', 456, 436);
  // WEEE crossed-out wheelie bin on right
  drawWeeeBin(ctx, 524, 428, 56, etch);

  // === LASER-FROSTED RECESSED SERIAL NUMBER & 1D CODE-128 BARCODE PANEL ===
  rRect(38, 488, w - 76, 128, 8);
  ctx.fillStyle = 'rgba(22, 30, 42, 0.13)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(22, 30, 42, 0.38)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = etch;
  ctx.textAlign = 'center';
  ctx.font = '800 28px "Courier New", monospace';
  ctx.fillText('S/N  0482917A-2548K', w * 0.5, 518);

  // Crisp micro 1D Code-128 traceability barcode strip inside serial bar
  const rngBar = mulberry32(192077);
  let bx = 92;
  while (bx < w - 92) {
    const bw = rngBar() > 0.55 ? 4.2 : 2.1;
    if (rngBar() > 0.38) {
      ctx.fillRect(bx, 540, bw, 32);
    }
    bx += bw + (rngBar() > 0.5 ? 2.8 : 1.8);
  }

  ctx.fillStyle = etchSub;
  ctx.font = '700 18px "Courier New", monospace';
  ctx.fillText('MADE IN TAIWAN   SONY CORPORATION', w * 0.5, 594);

  // Bottom ESD / 21-pin contact warning band + directional arrows
  ctx.fillStyle = etch;
  ctx.font = '800 18px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('▼  DO NOT TOUCH 21-PIN PCIe CONTACTS  ▼', w * 0.5, 678);
  ctx.fillStyle = etchSub;
  ctx.font = '700 14px "Courier New", monospace';
  ctx.fillText('RoHS COMPLIANT · Pb-FREE · HIGH-EMISSIVITY SUS304', w * 0.5, 712);

  return toHiTex(canvas);
}

function createCfeHdiPcbTexture(): THREE.CanvasTexture {
  // Exact 0.726 aspect ratio matching 34.0 × 46.8 mm C07 Sony 8-Layer Megtron-7 HDI PCB (TOP SIDE)!
  const { canvas, ctx, w, h } = makeHiCanvas(558, 768);

  // Deep translucent emerald-obsidian solder mask over Megtron-7 core
  const maskGrad = ctx.createLinearGradient(0, 0, w, h);
  maskGrad.addColorStop(0, '#07241c');
  maskGrad.addColorStop(0.5, '#0b352a');
  maskGrad.addColorStop(1, '#062019');
  ctx.fillStyle = maskGrad;
  ctx.fillRect(0, 0, w, h);

  // Subtle 10°-rotated spread E-glass weave texture glowing dimly beneath solder mask!
  ctx.save();
  ctx.translate(w * 0.5, h * 0.5);
  ctx.rotate((10 * Math.PI) / 180);
  ctx.strokeStyle = 'rgba(42, 152, 114, 0.075)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let g = -520; g <= 520; g += 14) {
    ctx.moveTo(g, -520);
    ctx.lineTo(g, 520);
    ctx.moveTo(-520, g);
    ctx.lineTo(520, g);
  }
  ctx.stroke();
  ctx.restore();
  drawMicroGrain(ctx, w, h, 1800, 622, 0.028);

  // Inner L1 copper GND plane flood island (slightly brighter emerald copper-under-mask tone!)
  ctx.fillStyle = '#0e4234';
  ctx.fillRect(22, 22, w - 44, h - 44);
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.22)';
  ctx.lineWidth = 2;
  ctx.strokeRect(22, 22, w - 44, h - 44);

  // === 85-OHM DIFFERENTIAL PCIe GEN4 TROMBONE SERPENTINE PAIRS (FROM 21-PIN BOTTOM EDGE -> U1 CONTROLLER) ===
  const drawTrombonePair = (baseX: number, yBot: number, yTop: number, jogs: number, amp: number, color: string) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.6;
    for (const side of [-3.6, 3.6]) {
      const x = baseX + side;
      ctx.beginPath();
      ctx.moveTo(x, yBot);
      const yStart = yBot - 36;
      ctx.lineTo(x, yStart);
      for (let j = 0; j < jogs; j++) {
        const y0 = yStart - j * 22;
        const dir = j % 2 === 0 ? 1 : -1;
        ctx.lineTo(x + dir * amp, y0 - 4);
        ctx.lineTo(x + dir * amp, y0 - 14);
        ctx.lineTo(x, y0 - 18);
      }
      ctx.lineTo(x, yTop);
      ctx.stroke();
    }
  };
  drawTrombonePair(118, h - 26, 560, 4, 9, '#34b888');
  drawTrombonePair(178, h - 26, 560, 5, 10, '#2ea47a');
  drawTrombonePair(238, h - 26, 560, 4, 9, '#34b888');
  drawTrombonePair(298, h - 26, 560, 3, 8, '#2ea47a');

  // === HIGH-DENSITY 8-CHANNEL ONFI / TOGGLE DDR 6.0 BUS ROUTING (U1 CONTROLLER -> U2 PRIMARY NAND!) ===
  ctx.strokeStyle = '#25906a';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  for (let ch = 0; ch < 16; ch++) {
    const sx = 94 + ch * 14.5;
    const tx = 66 + ch * 26.5;
    ctx.moveTo(sx, 404);
    ctx.lineTo(sx, 366);
    ctx.lineTo(tx, 318);
    ctx.lineTo(tx, 76);
  }
  ctx.stroke();

  // Horizontal LPDDR4X DQ/DQS/CA serpentine bus between U1 Controller (left) & U3 DRAM (right)
  ctx.strokeStyle = '#38c090';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let k = 0; k < 10; k++) {
    const ly = 434 + k * 14.5;
    ctx.moveTo(286, ly);
    ctx.lineTo(306, ly);
    ctx.lineTo(312, ly + (k % 2 === 0 ? 4 : -4));
    ctx.lineTo(324, ly + (k % 2 === 0 ? 4 : -4));
    ctx.lineTo(330, ly);
    ctx.lineTo(352, ly);
  }
  ctx.stroke();

  // === AUTHENTIC U2 PRIMARY 3D NAND BGA-152 ENIG GOLD PAD FOOTPRINT (DUAL-WING DEPOPULATED CENTER!) ===
  ctx.fillStyle = '#07221b';
  ctx.fillRect(68, 66, 422, 246);
  ctx.fillStyle = '#e8c156';
  ctx.beginPath();
  for (let row = 0; row < 11; row++) {
    const py = 84 + row * 21;
    // Left 4 columns + Right 4 columns (wide central depopulated routing channel!)
    for (const col of [0, 1, 2, 3, 9, 10, 11, 12]) {
      const px = 92 + col * 31;
      ctx.moveTo(px + 5.2, py);
      ctx.arc(px, py, 5.2, 0, Math.PI * 2);
    }
  }
  ctx.fill();
  // Dark VIPPO microvia-in-pad centers inside NAND BGA lands
  ctx.fillStyle = '#0a2a21';
  ctx.beginPath();
  for (let row = 0; row < 11; row++) {
    const py = 84 + row * 21;
    for (const col of [0, 1, 2, 3, 9, 10, 11, 12]) {
      const px = 92 + col * 31;
      ctx.moveTo(px + 1.8, py);
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
    }
  }
  ctx.fill();

  // === AUTHENTIC U1 CONTROLLER FCBGA FOOTPRINT (PERIMETER SIGNAL RING + CENTRAL 5×5 COPPER THERMAL VIA ARRAY!) ===
  ctx.fillStyle = '#07221b';
  ctx.fillRect(76, 404, 212, 206);
  ctx.fillStyle = '#e8c156';
  ctx.beginPath();
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const isEdge = r < 2 || r > 7 || c < 2 || c > 7;
      const isCore = r >= 3 && r <= 6 && c >= 3 && c <= 6;
      if (!isEdge && !isCore) continue;
      const px = 94 + c * 19.5;
      const py = 420 + r * 19.2;
      ctx.moveTo(px + 4.4, py);
      ctx.arc(px, py, 4.4, 0, Math.PI * 2);
    }
  }
  ctx.fill();

  // === AUTHENTIC U3 LPDDR4X 200-BALL SPLIT-CHANNEL FBGA FOOTPRINT ===
  ctx.fillStyle = '#07221b';
  ctx.fillRect(352, 412, 146, 184);
  ctx.fillStyle = '#e8c156';
  ctx.beginPath();
  for (let r = 0; r < 10; r++) {
    const py = 426 + r * 17.2;
    for (const c of [0, 1, 2, 3, 6, 7, 8, 9]) {
      const px = 366 + c * 13.2;
      ctx.moveTo(px + 3.4, py);
      ctx.arc(px, py, 3.4, 0, Math.PI * 2);
    }
  }
  ctx.fill();

  // === PERIMETER λ/20 GOLD GND STITCHING VIA FENCE + JTAG/UART PADS + OPTICAL FIDUCIAL BULLSEYES ===
  ctx.fillStyle = '#ebc358';
  ctx.beginPath();
  for (let x = 34; x <= w - 34; x += 18) {
    ctx.moveTo(x + 3.8, 30);
    ctx.arc(x, 30, 3.8, 0, Math.PI * 2);
    ctx.moveTo(x + 3.8, h - 30);
    ctx.arc(x, h - 30, 3.8, 0, Math.PI * 2);
  }
  for (let y = 34; y <= h - 34; y += 18) {
    ctx.moveTo(30 + 3.8, y);
    ctx.arc(30, y, 3.8, 0, Math.PI * 2);
    ctx.moveTo(w - 30 + 3.8, y);
    ctx.arc(w - 30, y, 3.8, 0, Math.PI * 2);
  }
  // 8-pad factory JTAG / UART gold test strip along right margin
  for (let i = 0; i < 8; i++) {
    const ty = 132 + i * 28;
    ctx.moveTo(w - 46 + 7.5, ty);
    ctx.arc(w - 46, ty, 7.5, 0, Math.PI * 2);
  }
  ctx.fill();

  // Dark resin-plugged centers for stitching vias
  ctx.fillStyle = '#061a14';
  ctx.beginPath();
  for (let x = 34; x <= w - 34; x += 18) {
    ctx.moveTo(x + 1.5, 30);
    ctx.arc(x, 30, 1.5, 0, Math.PI * 2);
    ctx.moveTo(x + 1.5, h - 30);
    ctx.arc(x, h - 30, 1.5, 0, Math.PI * 2);
  }
  for (let y = 34; y <= h - 34; y += 18) {
    ctx.moveTo(30 + 1.5, y);
    ctx.arc(30, y, 1.5, 0, Math.PI * 2);
    ctx.moveTo(w - 30 + 1.5, y);
    ctx.arc(w - 30, y, 1.5, 0, Math.PI * 2);
  }
  ctx.fill();

  // Dual optical SMT alignment fiducial bullseyes (gold dot + dark keepout halo!)
  for (const [fx, fy] of [
    [54, 344],
    [w - 54, 622],
  ]) {
    ctx.fillStyle = '#041410';
    ctx.beginPath();
    ctx.arc(fx, fy, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f5ce62';
    ctx.beginPath();
    ctx.arc(fx, fy, 5.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dashed cyan PCIe AC-cap ground-reference antipad void window & yellow ZQ 240Ω ±0.1% pads
  ctx.save();
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(104, 626, 206, 46);
  ctx.restore();

  ctx.strokeStyle = 'rgba(250, 204, 21, 0.90)';
  ctx.lineWidth = 2;
  ctx.strokeRect(436, 336, 48, 22);
  ctx.strokeRect(436, 364, 48, 22);

  // Crisp white legend silkscreen component courtyards, Pin-1 triangles & engineering metadata
  ctx.strokeStyle = 'rgba(241, 245, 249, 0.80)';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(64, 62, 430, 254); // U2 Primary NAND
  ctx.strokeRect(72, 400, 220, 214); // U1 Controller
  ctx.strokeRect(348, 408, 154, 192); // U3 LPDDR4X

  ctx.fillStyle = 'rgba(248, 250, 252, 0.92)';
  ctx.textAlign = 'left';
  ctx.font = '800 18px "Courier New", monospace';
  ctx.fillText('U2  BiCS10-332L 16DP  BGA152', 74, 52);
  ctx.fillText('U1  PS5027-G4', 76, 390);
  ctx.fillText('U3  LPDDR4X', 350, 398);
  ctx.font = '700 14px "Courier New", monospace';
  ctx.fillStyle = 'rgba(250, 204, 21, 0.92)';
  ctx.fillText('R_ZQ 240Ω±0.1%', 312, 360);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.92)';
  ctx.fillText('C_AC 220nF ANTIPAD', 118, 654);
  ctx.fillStyle = 'rgba(241, 245, 249, 0.90)';
  ctx.font = '800 16px "Courier New", monospace';
  ctx.fillText('SONY CFE-A 8L-HDI REV4.2 · Z0=85Ω · 10°WEAVE', 44, 704);
  ctx.font = '700 13px "Courier New", monospace';
  ctx.fillStyle = 'rgba(186, 230, 253, 0.78)';
  ctx.fillText('MEGTRON-7 · UL94V-0 · Pb-FREE · 2638 · TOP', 44, 726);

  return toHiTex(canvas);
}

function createCfeControllerPkgTexture(): THREE.CanvasTexture {
  // Exact 1:1 square matching 13.2 × 13.2 mm C08 Sony / Phison PS5027-E27T FCBGA Controller!
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Ultra-low-alpha (ULA) 88wt% silica-filled matte obsidian-charcoal EMC mold compound
  const baseGrad = ctx.createLinearGradient(0, 0, w, h);
  baseGrad.addColorStop(0, '#161a22');
  baseGrad.addColorStop(0.5, '#1d222c');
  baseGrad.addColorStop(1, '#12151c');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 4200, 633, 0.056);

  // Double-step molded package draft bevel specular edge & recessed mold-parting line
  ctx.strokeStyle = 'rgba(168, 180, 198, 0.34)';
  ctx.lineWidth = 7;
  ctx.strokeRect(16, 16, w - 32, h - 32);
  ctx.strokeStyle = 'rgba(8, 10, 14, 0.75)';
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, w - 48, h - 48);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, w - 64, h - 64);

  // Authentic circular mold ejector-pin indentations with concentric lathe rings (real IC macro signature!)
  for (const [ex, ey] of [
    [w - 86, 86],
    [86, h - 86],
  ]) {
    const ejGrad = ctx.createRadialGradient(ex - 4, ey - 4, 2, ex, ey, 26);
    ejGrad.addColorStop(0, 'rgba(6, 8, 12, 0.80)');
    ejGrad.addColorStop(0.75, 'rgba(20, 24, 32, 0.55)');
    ejGrad.addColorStop(1, 'rgba(168, 182, 200, 0.32)');
    ctx.fillStyle = ejGrad;
    ctx.beginPath();
    ctx.arc(ex, ey, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(168, 182, 200, 0.28)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ex, ey, 14, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Metallic gold Pin-1 corner chamfer triangle + recessed Pin-1 laser index crater
  ctx.fillStyle = '#eec65a';
  ctx.beginPath();
  ctx.moveTo(46, 46);
  ctx.lineTo(126, 46);
  ctx.lineTo(46, 126);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(12, 16, 24, 0.72)';
  ctx.beginPath();
  ctx.arc(106, 106, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#eec65a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Crisp laser-ablated silver-ivory markings (authentic Phison / Sony industrial layout!)
  ctx.fillStyle = 'rgba(240, 246, 252, 0.94)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 60px Georgia, "Times New Roman", serif';
  ctx.fillText('SONY', 152, 134);

  // Subtle laser-etched PHISON silicon badge right of SONY
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.62)';
  ctx.lineWidth = 2.4;
  ctx.strokeRect(392, 108, 184, 48);
  ctx.fillStyle = 'rgba(216, 226, 238, 0.90)';
  ctx.textAlign = 'center';
  ctx.font = '800 30px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('PHISON', 484, 134);

  // Laser hairline divider
  ctx.fillStyle = 'rgba(203, 213, 225, 0.36)';
  ctx.fillRect(86, 188, w - 172, 2.5);

  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(244, 248, 254, 0.95)';
  ctx.font = '800 50px "Courier New", monospace';
  ctx.fillText('PS5027-E27T-S', 86, 246);

  ctx.fillStyle = 'rgba(204, 214, 228, 0.88)';
  ctx.font = '700 32px "Courier New", monospace';
  ctx.fillText('PCIe Gen4×1 · NVMe 2.4', 86, 314);
  ctx.fillText('6nm ARM-R8 · 4K-LDPC', 86, 364);
  ctx.fillText('AES-256 · PQC-PUF · VPG', 86, 414);

  // Lot code, country of fab & wafer traceability block
  ctx.fillStyle = 'rgba(182, 196, 214, 0.82)';
  ctx.font = '700 28px "Courier New", monospace';
  ctx.fillText('TW   2638   G4A2', 86, 492);
  ctx.fillText('LOT  B8194C-07', 86, 534);
  ctx.font = '700 22px "Courier New", monospace';
  ctx.fillStyle = 'rgba(238, 198, 90, 0.84)';
  ctx.fillText('e1  Pb-FREE  RoHS', 86, 586);

  // Crisp 14×14 laser-ablated ECC-200 2D DataMatrix in lower-right quadrant
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.32)';
  ctx.lineWidth = 2;
  ctx.strokeRect(498, 492, 184, 184);
  drawDataMatrix(ctx, 508, 502, 164, 14, 'rgba(240, 246, 252, 0.92)', null, 50274);

  return toHiTex(canvas);
}

function createCfeNandPkgTexture(): THREE.CanvasTexture {
  // Exact 1.477 landscape aspect ratio matching 24.9 × 16.9 mm C12 & C13 Kioxia 16DP FBGA-152 NAND! (ZERO horizontal stretch!)
  const { canvas, ctx, w, h } = makeHiCanvas(768, 520);

  // Matte high-thermal ULA silica-filled dark charcoal EMC resin
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#151921');
  bg.addColorStop(0.5, '#1c212b');
  bg.addColorStop(1, '#12161d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3800, 644, 0.056);

  // Double-stepped molded draft lip specular rim
  ctx.strokeStyle = 'rgba(156, 168, 186, 0.32)';
  ctx.lineWidth = 6;
  ctx.strokeRect(16, 16, w - 32, h - 32);
  ctx.strokeStyle = 'rgba(6, 8, 12, 0.72)';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(23, 23, w - 46, h - 46);

  // Authentic twin circular mold ejector-pin witness craters with concentric lathe rings
  for (const [ex, ey] of [
    [w - 64, 64],
    [64, h - 64],
  ]) {
    ctx.fillStyle = 'rgba(7, 9, 13, 0.72)';
    ctx.beginPath();
    ctx.arc(ex, ey, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(156, 168, 186, 0.30)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ex, ey, 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Recessed Pin-1 circular laser index dimple (top-left)
  ctx.fillStyle = 'rgba(240, 246, 252, 0.88)';
  ctx.beginPath();
  ctx.arc(64, 64, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(18, 24, 34, 0.65)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Authentic KIOXIA laser-marked semiconductor typography (zero distortion!)
  ctx.fillStyle = 'rgba(244, 248, 254, 0.95)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '800 58px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('KIOXIA', 108, 96);

  // Subtle boxed BiCS10 generation emblem
  ctx.strokeStyle = 'rgba(214, 224, 236, 0.68)';
  ctx.lineWidth = 2.4;
  ctx.strokeRect(388, 72, 168, 44);
  ctx.fillStyle = 'rgba(232, 240, 248, 0.92)';
  ctx.textAlign = 'center';
  ctx.font = '800 26px "Courier New", monospace';
  ctx.fillText('BiCS10 CBA', 472, 95);

  ctx.fillStyle = 'rgba(203, 213, 225, 0.32)';
  ctx.fillRect(62, 138, w - 124, 2.2);

  // Authentic Toshiba/Kioxia part code & specs
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(238, 244, 252, 0.94)';
  ctx.font = '800 38px "Courier New", monospace';
  ctx.fillText('TH58LKT2T25BA8C', 62, 188);

  ctx.fillStyle = 'rgba(202, 214, 230, 0.88)';
  ctx.font = '700 25px "Courier New", monospace';
  ctx.fillText('332L 3D TLC · 16DP FBGA-152', 62, 242);
  ctx.fillText('TOGGLE DDR 6.0 · 4.8 Gb/s', 62, 282);
  ctx.fillText('960 GB  (8Tb)  1.2V VCCQL', 62, 322);

  ctx.fillStyle = 'rgba(182, 196, 214, 0.84)';
  ctx.font = '700 24px "Courier New", monospace';
  ctx.fillText('JAPAN   2634K   9AE', 62, 384);
  ctx.font = '700 18px "Courier New", monospace';
  ctx.fillStyle = 'rgba(238, 198, 90, 0.82)';
  ctx.fillText('YOKKAICHI FAB · LOT M16-409', 62, 424);

  // TRUE 1:1 SQUARE 14×14 laser ECC-200 DataMatrix on lower-right!
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.34)';
  ctx.lineWidth = 2;
  ctx.strokeRect(542, 286, 166, 166);
  drawDataMatrix(ctx, 551, 295, 148, 14, 'rgba(240, 246, 252, 0.92)', null, 21816);

  return toHiTex(canvas);
}

function createCfeCopperThermalTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Cold-rolled C11000 pure-copper brushed thermal sheet with subtle micro-capillary relief
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, '#c66a32');
  g.addColorStop(0.45, '#e2894c');
  g.addColorStop(0.72, '#cf7136');
  g.addColorStop(1, '#b55924');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  drawBrushedStreaks(ctx, s, s, true, 220, 655, 0.085, 0.075);
  drawMicroGrain(ctx, s, s, 600, 656, 0.025);

  ctx.strokeStyle = 'rgba(92, 36, 8, 0.20)';
  ctx.lineWidth = 1.6;
  for (let i = 0; i < s; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.stroke();
  }
  return toTileTex(canvas, 3, 4);
}

function createCfeBiCS10WaferDieTexture(): THREE.CanvasTexture {
  // Exact 4:3 landscape aspect ratio matching C50 (14.8×11.6) & C86 (16.8×12.2) Kioxia BiCS10 CBA Silicon Die!
  const { canvas, ctx, w, h } = makeHiCanvas(768, 576);

  // Iridescent monocrystalline silicon wafer base with thin-film optical interference bands
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#07192d');
  bg.addColorStop(0.24, '#0f365e');
  bg.addColorStop(0.48, '#174c78');
  bg.addColorStop(0.72, '#272b66');
  bg.addColorStop(0.88, '#123e5c');
  bg.addColorStop(1, '#081d33');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Multi-ring Wafer Crack-Stopper & Moisture Seal Ring Fortress (gold-copper BEOL moat)
  ctx.strokeStyle = '#dca93e';
  ctx.lineWidth = 9;
  ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.8;
  ctx.strokeRect(22, 22, w - 44, h - 44);
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.28)';
  ctx.lineWidth = 1.4;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  // 4 corner ASML box-in-box lithography overlay vernier targets
  for (const [fx, fy] of [
    [34, 34],
    [w - 34, 34],
    [34, h - 34],
    [w - 34, h - 34],
  ]) {
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(fx - 7, fy - 7, 14, 14);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(fx - 3, fy - 3, 6, 6);
  }

  // === 6 INDEPENDENT MEMORY PLANES (3×2 MPIR) WITH CBL DIFFRACTION GRATING & WORDLINE STAIRCASE TAPS ===
  const planeColors = ['#0c5875', '#124c88', '#254289', '#0e5e6c', '#184682', '#313885'];
  const padX = 44;
  const padY = 42;
  const gapX = 22;
  const gapY = 38;
  const pw = (w - padX * 2 - gapX * 2) / 3;
  const ph = (h - padY * 2 - gapY - 38) / 2;

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      const px = padX + c * (pw + gapX);
      const py = padY + r * (ph + gapY);

      const pg = ctx.createLinearGradient(px, py, px + pw, py + ph);
      pg.addColorStop(0, planeColors[idx]);
      pg.addColorStop(0.48, '#1a7ea0');
      pg.addColorStop(1, '#0e264d');
      ctx.fillStyle = pg;
      ctx.fillRect(px, py, pw, ph);

      // Ultra-fine vertical Crossed Bit Line (CBL) diffraction grating lines
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.30)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (let bx = px + 22; bx < px + pw - 6; bx += 6) {
        ctx.moveTo(bx, py + 6);
        ctx.lineTo(bx, py + ph - 6);
      }
      ctx.stroke();

      // Subtle horizontal sub-block slit-trench divisions (4 sub-blocks per plane!)
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.55)';
      ctx.lineWidth = 2;
      for (let sb = 1; sb < 4; sb++) {
        const sy = py + (ph * sb) / 4;
        ctx.beginPath();
        ctx.moveTo(px + 20, sy);
        ctx.lineTo(px + pw - 4, sy);
        ctx.stroke();
      }

      // Left vertical Wordline Staircase Row-Decoder gold tap strip
      ctx.fillStyle = 'rgba(234, 179, 8, 0.82)';
      ctx.fillRect(px + 3, py + 4, 14, ph - 8);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
      for (let wy = py + 8; wy < py + ph - 8; wy += 7) {
        ctx.fillRect(px + 5, wy, 10, 2.5);
      }

      // Dedicated per-plane LBUS Coupling Sense-Amp & 16KB Page Buffer bar along center spine
      const saY = r === 0 ? py + ph - 18 : py + 4;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.fillRect(px + 20, saY, pw - 24, 14);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.78)';
      for (let sx = px + 24; sx < px + pw - 10; sx += 12) {
        ctx.fillRect(sx, saY + 3, 6, 8);
      }

      ctx.strokeStyle = 'rgba(241, 245, 249, 0.58)';
      ctx.lineWidth = 1.8;
      ctx.strokeRect(px, py, pw, ph);

      // Micro lithography plane stamp
      ctx.fillStyle = 'rgba(10, 18, 34, 0.65)';
      ctx.fillRect(px + pw * 0.5 - 48, py + ph * 0.5 - 14, 102, 28);
      ctx.fillStyle = 'rgba(248, 250, 252, 0.94)';
      ctx.font = '800 17px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`PLANE ${idx}`, px + pw * 0.5 + 3, py + ph * 0.5);
    }
  }

  // Central horizontal CBA BWWPC (Wafer-to-Wafer Power Connection) Cu-Cu Hybrid-Bond Spine
  const midY = padY + ph + gapY * 0.5;
  ctx.fillStyle = '#081220';
  ctx.fillRect(42, midY - 14, w - 84, 28);
  ctx.fillStyle = '#e59942';
  for (let x = 52; x < w - 54; x += 18) {
    ctx.fillRect(x, midY - 7, 10, 14);
  }
  ctx.fillStyle = 'rgba(248, 250, 252, 0.82)';
  ctx.font = '700 12px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KIOXIA BiCS10 · 332L CBA · 29Gb/mm² · BWWPC Cu-Cu HYBRID BOND', w * 0.5, midY + 1);

  // Bottom overhang ENEPIG gold wirebond pad row (DQ[7:0], DQS, CE#, VCCQL)
  ctx.fillStyle = '#091526';
  ctx.fillRect(42, h - 56, w - 84, 24);
  for (let x = 52; x < w - 52; x += 16) {
    ctx.fillStyle = '#eab308';
    ctx.fillRect(x, h - 52, 10, 16);
    ctx.strokeStyle = '#713f12';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, h - 52, 10, 16);
  }

  return toHiTex(canvas);
}

function createCfeGlassWeaveCoreTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Low-Dk / Low-Df Megtron-7 emerald-amber epoxy resin base
  ctx.fillStyle = '#1c3b2e';
  ctx.fillRect(0, 0, s, s);

  // Flat-spread 1067 E-Glass perpendicular warp & weft fiber yarn bundles!
  const pitch = 32;
  for (let y = 0; y < s; y += pitch) {
    const yg = ctx.createLinearGradient(0, y, 0, y + 18);
    yg.addColorStop(0, 'rgba(182, 214, 178, 0.12)');
    yg.addColorStop(0.5, 'rgba(222, 240, 206, 0.58)');
    yg.addColorStop(1, 'rgba(182, 214, 178, 0.12)');
    ctx.fillStyle = yg;
    ctx.fillRect(0, y + 6, s, 18);
  }
  for (let x = 0; x < s; x += pitch) {
    const xg = ctx.createLinearGradient(x, 0, x + 18, 0);
    xg.addColorStop(0, 'rgba(164, 204, 172, 0.14)');
    xg.addColorStop(0.5, 'rgba(235, 248, 224, 0.62)');
    xg.addColorStop(1, 'rgba(164, 204, 172, 0.14)');
    ctx.fillStyle = xg;
    ctx.fillRect(x + 6, 0, 18, s);
  }

  // Subtle woven over-under intersection specular glints
  ctx.fillStyle = 'rgba(255, 255, 245, 0.26)';
  for (let y = 0; y < s; y += pitch) {
    for (let x = 0; x < s; x += pitch) {
      if (((x + y) / pitch) % 2 === 0) {
        ctx.fillRect(x + 8, y + 8, 14, 14);
      }
    }
  }
  return toTileTex(canvas, 4, 4);
}

function createCfeMolyWordlineMetalTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Barrierless ALD Molybdenum (Mo) cool silver-blue metallic crystal grain
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, '#96adc4');
  g.addColorStop(0.45, '#c8daec');
  g.addColorStop(0.75, '#89a1ba');
  g.addColorStop(1, '#b4c9df');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  drawBrushedStreaks(ctx, s, s, false, 180, 677, 0.08, 0.065);
  drawMicroGrain(ctx, s, s, 1400, 678, 0.04);

  // Subtle nanometer ALD deposition horizontal crystal seam highlights
  ctx.strokeStyle = 'rgba(241, 248, 255, 0.24)';
  ctx.lineWidth = 1.5;
  for (let y = 8; y < s; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(s, y);
    ctx.stroke();
  }
  return toTileTex(canvas, 2, 2);
}

function createCfePqcSecurityDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Obsidian-indigo silicon enclave with golden ML-DSA Post-Quantum Lattice & PUF SRAM Fingerprint!
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#101222');
  bg.addColorStop(0.5, '#1d1b3a');
  bg.addColorStop(1, '#0d101e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Armored Faraday perimeter shield ring
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Top-left: Silicon PUF Fingerprint unique random bit-cell matrix
  const rng = mulberry32(202608);
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 14; c++) {
      ctx.fillStyle = rng() > 0.48 ? 'rgba(250, 204, 21, 0.85)' : 'rgba(56, 189, 248, 0.28)';
      ctx.fillRect(62 + c * 20, 62 + r * 20, 14, 14);
    }
  }

  // Right: Post-Quantum ML-DSA / Kyber Lattice Cryptographic Accelerator Grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.72)';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  for (let i = 0; i <= 10; i++) {
    ctx.moveTo(410 + i * 28, 66);
    ctx.lineTo(410 + i * 28, 346);
    ctx.moveTo(410, 66 + i * 28);
    ctx.lineTo(690, 66 + i * 28);
  }
  ctx.stroke();

  // Bottom: Laser-etched OTP eFuse Root-of-Trust key tracks + 2026 NVMe 2.4 PQC stamp
  ctx.fillStyle = 'rgba(234, 179, 8, 0.22)';
  ctx.fillRect(62, 412, w - 124, 286);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(62, 412, w - 124, 286);

  ctx.fillStyle = '#fde68a';
  ctx.font = '800 44px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('NVMe 2.4  PQC + PUF', w * 0.5, 494);
  ctx.fillStyle = '#7dd3fc';
  ctx.font = '700 32px "Courier New", monospace';
  ctx.fillText('ML-DSA  AES-256  C2PA', w * 0.5, 566);
  ctx.fillStyle = 'rgba(248, 250, 252, 0.84)';
  ctx.font = '700 26px "Courier New", monospace';
  ctx.fillText('HARDWARE ROOT OF TRUST', w * 0.5, 636);

  return toHiTex(canvas);
}

function createCfeQuantumChargeTrapStackTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Sub-nanometer atomic cutaway: Poly-Si Channel -> O1/N1/O2 BE-SONOS -> a-Si3N4 Trap Wells -> Al2O3 High-k -> Mo Wordline
  const bg = ctx.createLinearGradient(0, 0, w, 0);
  bg.addColorStop(0.0, '#0f172a');
  bg.addColorStop(0.18, '#38bdf8');
  bg.addColorStop(0.24, '#fef08a');
  bg.addColorStop(0.30, '#f59e0b');
  bg.addColorStop(0.36, '#fef08a');
  bg.addColorStop(0.58, '#7c3aed');
  bg.addColorStop(0.76, '#0284c7');
  bg.addColorStop(0.84, '#94a3b8');
  bg.addColorStop(1.0, '#cbd5e1');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Crisp vertical atomic interface stratification boundaries
  const bands = [142, 186, 230, 274, 446, 584, 646];
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.lineWidth = 3;
  for (const bx of bands) {
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx, h);
    ctx.stroke();
  }

  // Glowing trapped electron quantum clouds inside amorphous Si3N4 (0.87 eV trap wells!)
  const rng = mulberry32(2026101);
  for (let i = 0; i < 42; i++) {
    const ex = 295 + rng() * 130;
    const ey = 64 + rng() * (h - 128);
    const rg = ctx.createRadialGradient(ex, ey, 2, ex, ey, 18);
    rg.addColorStop(0, 'rgba(253, 224, 71, 0.96)');
    rg.addColorStop(0.5, 'rgba(192, 132, 252, 0.45)');
    rg.addColorStop(1, 'rgba(124, 58, 237, 0)');
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(ex, ey, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  // Quantum tunneling sinusoidal wavepackets penetrating O1/N1/O2 barrier
  ctx.strokeStyle = 'rgba(254, 249, 195, 0.9)';
  ctx.lineWidth = 3.2;
  for (let row = 0; row < 5; row++) {
    const y0 = 132 + row * 126;
    ctx.beginPath();
    for (let x = 70; x <= 340; x += 6) {
      const amp = x < 142 ? 15 : x < 274 ? 15 * Math.exp(-(x - 142) / 90) : 7;
      const yy = y0 + Math.sin((x - 70) * 0.14) * amp;
      if (x === 70) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }

  // Clean dark telemetry footer ribbon
  ctx.fillStyle = 'rgba(15, 23, 42, 0.86)';
  ctx.fillRect(24, h - 108, w - 48, 84);
  ctx.fillStyle = '#fef08a';
  ctx.font = '800 28px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Si | O1/N1/O2 | a-Si3N4 (0.87eV) | Al2O3 | Mo', w * 0.5, h - 56);

  return toHiTex(canvas);
}

function createCfeSolderImcMicrostructureTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // SEM metallographic cross-section: SAC305 Tin-Silver-Copper dendrites + scalloped Cu6Sn5 + planar Cu3Sn + Copper UBM
  const bg = ctx.createLinearGradient(0, 0, 0, s);
  bg.addColorStop(0.0, '#cbd5e1');
  bg.addColorStop(0.55, '#94a3b8');
  bg.addColorStop(0.72, '#d97706');
  bg.addColorStop(0.84, '#b45309');
  bg.addColorStop(1.0, '#ea580c');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, s, s);

  // β-Sn & Ag3Sn grain boundaries in upper solder matrix
  const rng = mulberry32(2026109);
  ctx.strokeStyle = 'rgba(241, 245, 249, 0.28)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 36; i++) {
    const cx = rng() * s;
    const cy = rng() * (s * 0.54);
    const r = 6 + rng() * 14;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Iconic scalloped η-Cu6Sn5 intermetallic domes along the solder/Cu reaction zone
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.6;
  for (let x = 8; x < s; x += 22) {
    const hDom = 12 + (rng() * 8);
    ctx.beginPath();
    ctx.arc(x, s * 0.71, hDom, Math.PI, 0);
    ctx.fill();
    ctx.stroke();
  }

  // Planar ε-Cu3Sn diffusion layer
  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, s * 0.72, s, 14);
  drawMicroGrain(ctx, s, s, 1600, 1091, 0.05);

  return toTileTex(canvas, 2, 2);
}

function createCfeSerdesEyeDiagramDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // 6nm FinFET / GAA SerDes PHY die with glowing golden-cyan open 16/32 GT/s Eye Diagram + LC-Tank spiral inductors!
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#071324');
  bg.addColorStop(0.5, '#0c2240');
  bg.addColorStop(1, '#05101e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Fine FinFET / 6T SRAM background grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 32; i < w; i += 32) {
    ctx.moveTo(i, 32);
    ctx.lineTo(i, h - 32);
    ctx.moveTo(32, i);
    ctx.lineTo(w - 32, i);
  }
  ctx.stroke();

  // Golden die seal ring
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Centerpiece: Crisp Equalized 16/32 GT/s NRZ Eye Diagram (CTLE + DFE open eye!)
  const eyY = 265;
  const eyH = 148;
  for (let trace = -4; trace <= 4; trace++) {
    const jitter = trace * 4.5;
    ctx.strokeStyle = trace === 0 ? '#22d3ee' : 'rgba(56, 189, 248, 0.42)';
    ctx.lineWidth = trace === 0 ? 5 : 2.2;
    ctx.beginPath();
    for (let x = 76; x <= w - 76; x += 6) {
      const ph = ((x - 76 + jitter) / (w - 152)) * Math.PI * 2;
      const yTop = eyY - Math.sin(ph) * eyH * 0.65;
      if (x === 76) ctx.moveTo(x, yTop);
      else ctx.lineTo(x, yTop);
    }
    ctx.stroke();
    ctx.beginPath();
    for (let x = 76; x <= w - 76; x += 6) {
      const ph = ((x - 76 - jitter) / (w - 152)) * Math.PI * 2;
      const yBot = eyY + Math.sin(ph) * eyH * 0.65;
      if (x === 76) ctx.moveTo(x, yBot);
      else ctx.lineTo(x, yBot);
    }
    ctx.stroke();
  }

  // Golden sampling crosshair inside open eye
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, eyY - 96);
  ctx.lineTo(w * 0.5, eyY + 96);
  ctx.moveTo(w * 0.5 - 92, eyY);
  ctx.lineTo(w * 0.5 + 92, eyY);
  ctx.stroke();

  // Bottom dual octagonal LC-Tank PLL spiral inductors
  for (const cx of [210, 558]) {
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 5;
    for (let r = 24; r <= 88; r += 16) {
      ctx.strokeRect(cx - r, 556 - r, r * 2, r * 2);
    }
  }

  ctx.fillStyle = '#e0f2fe';
  ctx.font = '800 32px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PCIe Gen4/5 16-32GT/s SERDES', w * 0.5, 92);
  ctx.fillStyle = '#fde047';
  ctx.font = '700 26px "Courier New", monospace';
  ctx.fillText('FFE + CTLE + DFE + LC-PLL', w * 0.5, 706);

  return toHiTex(canvas);
}

function createCfeFerroelectricHzoCrystalTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // 2026 imec/arXiv Orthorhombic Hf0.5Zr0.5O2 (HZO) Ferroelectric Dipole Crystal + a-IGZO Oxide Channel
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#1e1b4b');
  bg.addColorStop(0.38, '#312e81');
  bg.addColorStop(0.68, '#0f766e');
  bg.addColorStop(1, '#083344');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Ferroelectric orthorhombic crystal domain tessellation with upward/downward polarization arrows
  const cols = 6;
  const rows = 5;
  const cw = (w - 96) / cols;
  const ch = (h - 176) / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const up = (r + c) % 2 === 0;
      const x = 48 + c * cw;
      const y = 48 + r * ch;
      ctx.fillStyle = up ? 'rgba(56, 189, 248, 0.24)' : 'rgba(244, 114, 182, 0.24)';
      ctx.fillRect(x + 4, y + 4, cw - 8, ch - 8);
      ctx.strokeStyle = up ? '#38bdf8' : '#f472b6';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 4, y + 4, cw - 8, ch - 8);

      // Polarization dipole arrow inside crystal unit cell
      const mx = x + cw * 0.5;
      const my = y + ch * 0.5;
      ctx.beginPath();
      ctx.moveTo(mx, my + (up ? 28 : -28));
      ctx.lineTo(mx, my + (up ? -28 : 28));
      ctx.stroke();
      ctx.beginPath();
      const tipY = my + (up ? -28 : 28);
      const dir = up ? 1 : -1;
      ctx.moveTo(mx - 12, tipY + dir * 14);
      ctx.lineTo(mx, tipY);
      ctx.lineTo(mx + 12, tipY + dir * 14);
      ctx.stroke();
    }
  }

  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(36, h - 104, w - 72, 74);
  ctx.fillStyle = '#f0abfc';
  ctx.font = '800 30px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('2026 FeNAND  HZO (Hf0.5Zr0.5O2) + a-IGZO', w * 0.5, h - 56);

  return toHiTex(canvas);
}

// =============================================================================
// PHASE 34: CFEXPRESS 4.0 TYPE A TOP-20 HERO PARTS BESPOKE ULTRA-HD TEXTURES
// =============================================================================

/** C07 Rear: Sony 8-Layer Megtron-7 HDI PCB Bottom Side (U2B Secondary NAND, U4 PMIC, L1-L3, C_PLP, TVS, SPI NOR) */
function createCfeHdiPcbRearTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(558, 768);

  const maskGrad = ctx.createLinearGradient(0, 0, w, h);
  maskGrad.addColorStop(0, '#06211a');
  maskGrad.addColorStop(0.5, '#0a3328');
  maskGrad.addColorStop(1, '#061f18');
  ctx.fillStyle = maskGrad;
  ctx.fillRect(0, 0, w, h);

  // Subtle 10°-rotated Megtron-7 E-glass weave beneath solder mask
  ctx.save();
  ctx.translate(w * 0.5, h * 0.5);
  ctx.rotate((-10 * Math.PI) / 180);
  ctx.strokeStyle = 'rgba(42, 152, 114, 0.072)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let g = -520; g <= 520; g += 14) {
    ctx.moveTo(g, -520);
    ctx.lineTo(g, 520);
    ctx.moveTo(-520, g);
    ctx.lineTo(520, g);
  }
  ctx.stroke();
  ctx.restore();
  drawMicroGrain(ctx, w, h, 1600, 3401, 0.028);

  ctx.fillStyle = '#0d3e31';
  ctx.fillRect(22, 22, w - 44, h - 44);
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.22)';
  ctx.lineWidth = 2;
  ctx.strokeRect(22, 22, w - 44, h - 44);

  // Heavy 2-oz copper buck power-pour islands linking U4 PMIC -> L1-L3 inductors -> C_PLP hold-up caps
  ctx.fillStyle = '#185c48';
  ctx.fillRect(46, 360, 212, 74); // L1-L3 buck switch-node pour
  ctx.fillRect(306, 496, 178, 128); // C_PLP +3V3_HOLD copper flood
  ctx.strokeStyle = '#30ad80';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  for (let i = 0; i < 12; i++) {
    const x = 86 + i * 34;
    ctx.moveTo(x, 314);
    ctx.lineTo(x, 424);
  }
  ctx.stroke();

  // Straight zero-stub flow-through PCIe TVS ESD rails near bottom edge (D1 / D2)
  ctx.strokeStyle = '#38c090';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  for (let lane = 0; lane < 10; lane++) {
    const lx = 104 + lane * 38;
    ctx.moveTo(lx, h - 28);
    ctx.lineTo(lx, 636);
  }
  ctx.stroke();

  // === U2B SECONDARY 3D NAND BGA-152 FOOTPRINT (REAR SIDE UPPER BAY!) ===
  ctx.fillStyle = '#062019';
  ctx.fillRect(68, 66, 422, 246);
  ctx.fillStyle = '#e8c156';
  ctx.beginPath();
  for (let row = 0; row < 11; row++) {
    const py = 84 + row * 21;
    for (const col of [0, 1, 2, 3, 9, 10, 11, 12]) {
      const px = 92 + col * 31;
      ctx.moveTo(px + 5.0, py);
      ctx.arc(px, py, 5.0, 0, Math.PI * 2);
    }
  }
  ctx.fill();

  // === U4 PMIC QFN-48 FOOTPRINT WITH 3×3 SEGMENTED THERMAL E-PAD (LEFT-LOWER BAY!) ===
  ctx.fillStyle = '#062019';
  ctx.fillRect(68, 464, 134, 134);
  ctx.fillStyle = '#e8c156';
  // 3×3 segmented solder-stencil thermal E-pad
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      ctx.fillRect(98 + c * 25, 494 + r * 25, 20, 20);
    }
  }
  // 4×12 perimeter QFN-48 leads
  for (let p = 0; p < 12; p++) {
    const off = 76 + p * 10;
    ctx.fillRect(off, 466, 6, 14);
    ctx.fillRect(off, 582, 6, 14);
    ctx.fillRect(70, 472 + p * 10, 14, 6);
    ctx.fillRect(186, 472 + p * 10, 14, 6);
  }

  // === C_PLP1 / C_PLP2 TANTALUM HOLD-UP CAPACITOR GOLD PADS (RIGHT-LOWER BAY!) ===
  ctx.fillStyle = '#eab308';
  for (const py of [508, 566]) {
    ctx.fillRect(324, py, 26, 40);
    ctx.fillRect(436, py, 26, 40);
  }

  // === U5 SPI NOR SOIC-8 PADS (RIGHT-MID) & L1-L3 INDUCTOR PADS (LEFT-MID) ===
  for (let i = 0; i < 3; i++) {
    const lx = 58 + i * 64;
    ctx.fillRect(lx, 372, 16, 48);
    ctx.fillRect(lx + 34, 372, 16, 48);
  }
  for (let i = 0; i < 4; i++) {
    const nx = 374 + i * 24;
    ctx.fillRect(nx, 356, 12, 20);
    ctx.fillRect(nx, 424, 12, 20);
  }

  // Perimeter λ/20 stitching via fence
  ctx.fillStyle = '#ebc358';
  ctx.beginPath();
  for (let x = 34; x <= w - 34; x += 18) {
    ctx.moveTo(x + 3.6, 30);
    ctx.arc(x, 30, 3.6, 0, Math.PI * 2);
    ctx.moveTo(x + 3.6, h - 30);
    ctx.arc(x, h - 30, 3.6, 0, Math.PI * 2);
  }
  for (let y = 34; y <= h - 34; y += 18) {
    ctx.moveTo(30 + 3.6, y);
    ctx.arc(30, y, 3.6, 0, Math.PI * 2);
    ctx.moveTo(w - 30 + 3.6, y);
    ctx.arc(w - 30, y, 3.6, 0, Math.PI * 2);
  }
  ctx.fill();

  // Crisp bottom-side legend silkscreen
  ctx.strokeStyle = 'rgba(241, 245, 249, 0.78)';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(64, 62, 430, 254);
  ctx.strokeRect(64, 460, 142, 142);
  ctx.strokeRect(318, 502, 150, 110);
  ctx.strokeRect(366, 350, 108, 100);

  ctx.fillStyle = 'rgba(248, 250, 252, 0.90)';
  ctx.font = '800 18px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('U2B  BiCS10-332L 16DP  REAR', 74, 52);
  ctx.fillText('L1   L2   L3  BUCK', 56, 354);
  ctx.fillText('U5 SPI-NOR', 366, 340);
  ctx.fillText('U4 PMIC QFN48', 64, 448);
  ctx.fillText('C_PLP1/2 470uF+', 316, 492);
  ctx.font = '800 16px "Courier New", monospace';
  ctx.fillText('SONY CFE-A 8L-HDI BOTTOM · REV4.2 · 2638', 46, 704);
  ctx.fillStyle = 'rgba(186, 230, 253, 0.78)';
  ctx.font = '700 13px "Courier New", monospace';
  ctx.fillText('D1/D2 ±15kV TVS · Cu-SLUG VIA ARRAY · Pb-FREE', 46, 726);

  return toHiTex(canvas);
}

/** C03 / C06 / C30 / C64: Sony TOUGH Monolithic PPS-GF40 Glass-Fiber Molded Resin (VDI-24 Micro-EDM Stipple) */
function createCfeToughResinMoldTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  const bg = ctx.createLinearGradient(0, 0, s, s);
  bg.addColorStop(0, '#181b22');
  bg.addColorStop(0.5, '#20242e');
  bg.addColorStop(1, '#14171e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, s, s);

  // VDI-24 EDM spark-eroded matte mold cavity grain (dense isotropic micro-dimple speckle!)
  const rng = mulberry32(3402);
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0; i < 4600; i++) {
      const sz = 0.55 + rng() * 0.95;
      ctx.rect(rng() * s, rng() * s, sz, sz);
    }
    ctx.fillStyle = pass === 0 ? 'rgba(255,255,255,0.036)' : 'rgba(0,0,0,0.068)';
    ctx.fill();
  }

  // Subtle chopped 40% glass-fiber short-strand directional flow micro-flecks
  ctx.strokeStyle = 'rgba(180, 195, 215, 0.048)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let f = 0; f < 320; f++) {
    const fx = rng() * s;
    const fy = rng() * s;
    const ang = (rng() - 0.5) * 0.45;
    const len = 3 + rng() * 7;
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx + Math.cos(ang) * len, fy + Math.sin(ang) * len);
  }
  ctx.stroke();

  return toTileTex(canvas, 3, 3);
}

/** C05: 30 μin Cobalt-Hardened Electroplated Gold Contact Fingers with Longitudinal Slot-Wiper Mating Tracks */
function createCfeHardGoldFingersTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 256);

  // Rich cobalt-hardened 24K electroplated gold base gradient
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#c8921c');
  g.addColorStop(0.18, '#f0c64e');
  g.addColorStop(0.45, '#ffe07a');
  g.addColorStop(0.75, '#dba428');
  g.addColorStop(1, '#b68014');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Fine electroplated micro-crystalline gold grain
  drawMicroGrain(ctx, w, h, 2400, 3403, 0.035);

  // Realistic longitudinal camera-slot gold-wiper sliding micro-wear tracks down center of finger!
  drawBrushedStreaks(ctx, w, h, true, 420, 3404, 0.072, 0.064);
  const trackGrad = ctx.createLinearGradient(w * 0.34, 0, w * 0.66, 0);
  trackGrad.addColorStop(0, 'rgba(255,255,255,0)');
  trackGrad.addColorStop(0.35, 'rgba(255,248,210,0.22)');
  trackGrad.addColorStop(0.5, 'rgba(130,85,10,0.16)');
  trackGrad.addColorStop(0.65, 'rgba(255,248,210,0.20)');
  trackGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = trackGrad;
  ctx.fillRect(w * 0.34, 24, w * 0.32, h - 48);

  // Subtle bright nickel-barrier outer plating edge border
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.34)';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, w - 8, h - 8);

  return toHiTex(canvas);
}

/** C16: Bespoke SK hynix H9HCNNN8GUMUXR LPDDR4X-4266 200-Ball TFBGA Package Top (Exact 0.842 Aspect!) */
function createCfeLpddr4PkgTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(646, 768);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#141820');
  bg.addColorStop(0.5, '#1c212c');
  bg.addColorStop(1, '#11141b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3600, 3405, 0.056);

  // Double-step molded TFBGA draft bevel edge
  ctx.strokeStyle = 'rgba(156, 170, 188, 0.34)';
  ctx.lineWidth = 6;
  ctx.strokeRect(16, 16, w - 32, h - 32);
  ctx.strokeStyle = 'rgba(6, 8, 12, 0.72)';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Corner ejector dimples & circular Pin-1 laser index crater
  for (const [ex, ey] of [
    [w - 72, 72],
    [72, h - 72],
  ]) {
    ctx.fillStyle = 'rgba(6, 8, 12, 0.75)';
    ctx.beginPath();
    ctx.arc(ex, ey, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(156, 170, 188, 0.30)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(240, 246, 252, 0.90)';
  ctx.beginPath();
  ctx.arc(72, 72, 18, 0, Math.PI * 2);
  ctx.fill();

  // Authentic SK hynix laser-ablated markings
  ctx.fillStyle = 'rgba(242, 247, 254, 0.94)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '800 54px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('SK hynix', 118, 126);

  ctx.fillStyle = 'rgba(203, 213, 225, 0.36)';
  ctx.fillRect(58, 178, w - 116, 2.5);

  ctx.fillStyle = 'rgba(240, 246, 252, 0.94)';
  ctx.font = '800 38px "Courier New", monospace';
  ctx.fillText('H9HCNNN8GUMU', 58, 242);
  ctx.fillText('XR-NEE  200b', 58, 294);

  ctx.fillStyle = 'rgba(198, 210, 226, 0.86)';
  ctx.font = '700 28px "Courier New", monospace';
  ctx.fillText('LPDDR4X-4266', 58, 366);
  ctx.fillText('16Gb · 512Mx32', 58, 412);
  ctx.fillText('VDDQ 0.6V · FTL', 58, 458);

  ctx.fillStyle = 'rgba(178, 192, 212, 0.82)';
  ctx.font = '700 26px "Courier New", monospace';
  ctx.fillText('KOR  2636A', 58, 536);
  ctx.fillStyle = 'rgba(238, 198, 90, 0.82)';
  ctx.font = '700 20px "Courier New", monospace';
  ctx.fillText('TFBGA · DUAL-CH', 58, 582);

  // TRUE 1:1 SQUARE 12×12 ECC-200 DataMatrix
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.34)';
  ctx.lineWidth = 2;
  ctx.strokeRect(410, 520, 166, 166);
  drawDataMatrix(ctx, 420, 530, 146, 12, 'rgba(240, 246, 252, 0.90)', null, 3406);

  return toHiTex(canvas);
}

/** C25: Bespoke Sony Pure C11000 Cold-Rolled Copper Internal Heat Spreader Hero Plate (Exact 0.786 Aspect!) */
function createCfeCopperSpreaderHeroTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(604, 768);

  // Anisotropic cold-rolled C11000 electrolytic tough-pitch pure copper metallic sheen
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#ba5e28');
  bg.addColorStop(0.24, '#e38a4c');
  bg.addColorStop(0.48, '#c76b32');
  bg.addColorStop(0.74, '#ea9456');
  bg.addColorStop(1, '#ae5420');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Dense directional rolling-mill copper brushing + micro-oxidation grain
  drawBrushedStreaks(ctx, w, h, true, 880, 3407, 0.085, 0.078);
  drawMicroGrain(ctx, w, h, 2200, 3408, 0.028);

  // Stamped outer perimeter flange bevel shadow & highlight
  ctx.strokeStyle = 'rgba(255, 222, 190, 0.44)';
  ctx.lineWidth = 5;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.strokeStyle = 'rgba(72, 26, 4, 0.52)';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Stamped deep-drawn thermal-contact pedestal contours (Primary NAND top, Controller SoC bottom-left, DRAM bottom-right!)
  const drawStampedZone = (x: number, y: number, rw: number, rh: number, label: string) => {
    const zg = ctx.createLinearGradient(x, y, x + rw, y + rh);
    zg.addColorStop(0, 'rgba(255, 212, 170, 0.24)');
    zg.addColorStop(0.5, 'rgba(128, 52, 12, 0.16)');
    zg.addColorStop(1, 'rgba(255, 206, 162, 0.22)');
    ctx.fillStyle = zg;
    ctx.fillRect(x, y, rw, rh);
    ctx.strokeStyle = 'rgba(68, 22, 4, 0.60)';
    ctx.lineWidth = 3.2;
    ctx.strokeRect(x, y, rw, rh);
    ctx.strokeStyle = 'rgba(255, 226, 194, 0.48)';
    ctx.lineWidth = 1.6;
    ctx.strokeRect(x + 4, y + 4, rw - 8, rh - 8);
    ctx.fillStyle = 'rgba(68, 24, 6, 0.72)';
    ctx.font = '800 16px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, x + rw * 0.5, y + rh * 0.5 + 5);
  };
  drawStampedZone(92, 66, 420, 278, 'NAND 16DP CONTACT BOSS');
  drawStampedZone(78, 444, 236, 236, 'SoC HOTSPOT BOSS');
  drawStampedZone(372, 466, 162, 194, 'DRAM BOSS');

  // Subtle concentric heat-dispersion radiating contour grooves
  ctx.strokeStyle = 'rgba(84, 30, 8, 0.22)';
  ctx.lineWidth = 1.8;
  for (let i = 0; i < 8; i++) {
    const gy = 368 + i * 9;
    ctx.beginPath();
    ctx.moveTo(42, gy);
    ctx.lineTo(w - 42, gy);
    ctx.stroke();
  }

  // Crisp die-stamped Sony copper heat-spreader engineering part stamp
  ctx.fillStyle = 'rgba(62, 20, 4, 0.80)';
  ctx.textAlign = 'center';
  ctx.font = '800 18px "Courier New", monospace';
  ctx.fillText('SONY  CU-HS1920T · C1100-1/2H · 401W/mK · t=0.18mm', w * 0.5, 722);

  return toHiTex(canvas);
}

/** C26: Fiberglass-Mesh-Reinforced Silicone Thermal Gap Pad (Fujipoly Sarcon / Bergquist 45° Diamond Waffle) */
function createCfeTimSiliconeWaffleTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Soft compliant blush-pink thermal-silicone elastomer base
  ctx.fillStyle = '#e78ca8';
  ctx.fillRect(0, 0, s, s);

  // Embedded woven E-glass reinforcement cloth carrier mesh (fine orthogonal micro-yarns!)
  ctx.strokeStyle = 'rgba(255, 235, 242, 0.30)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let i = 0; i < s; i += 8) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.moveTo(0, i);
    ctx.lineTo(s, i);
  }
  ctx.stroke();

  // 45° diamond compliance micro-waffle embossing (captures air-bleed relief channels!)
  ctx.strokeStyle = 'rgba(146, 48, 82, 0.42)';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  for (let d = -s; d < s * 2; d += 22) {
    ctx.moveTo(d, 0);
    ctx.lineTo(d + s, s);
    ctx.moveTo(d, 0);
    ctx.lineTo(d - s, s);
  }
  ctx.stroke();
  // Specular highlight edge next to each diamond groove
  ctx.strokeStyle = 'rgba(255, 224, 236, 0.34)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let d = -s + 2; d < s * 2; d += 22) {
    ctx.moveTo(d, 0);
    ctx.lineTo(d + s, s);
  }
  ctx.stroke();

  drawMicroGrain(ctx, s, s, 900, 3409, 0.035);
  return toTileTex(canvas, 3, 3);
}

/** C26 Rear: Panasonic PGS (Pyrolytic Graphite Sheet, EYGS 25μm, 1950 W/m·K) with Hexagonal Flake Sheen */
function createCfePyroGraphiteSheetTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(604, 768);

  // Anisotropic metallic charcoal-slate pyrolytic graphite base
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#181c24');
  bg.addColorStop(0.28, '#2d3340');
  bg.addColorStop(0.52, '#1d212b');
  bg.addColorStop(0.76, '#353c4a');
  bg.addColorStop(1, '#171b23');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Crystalline hexagonal graphite platelet micro-facets (authentic Panasonic PGS sheen!)
  const rng = mulberry32(3410);
  const hexR = 14;
  const dx = hexR * 1.732;
  const dy = hexR * 1.5;
  for (let row = 0; row < h / dy + 2; row++) {
    for (let col = 0; col < w / dx + 2; col++) {
      const cx = col * dx + (row % 2 === 1 ? dx * 0.5 : 0);
      const cy = row * dy;
      const shade = rng();
      ctx.fillStyle = shade > 0.55 ? `rgba(210, 222, 240, ${(0.025 + shade * 0.055).toFixed(3)})` : `rgba(6, 8, 14, ${(0.04 + (1 - shade) * 0.06).toFixed(3)})`;
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k * Math.PI) / 3 + Math.PI / 6;
        const px = cx + Math.cos(a) * hexR;
        const py = cy + Math.sin(a) * hexR;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }
  }
  drawBrushedStreaks(ctx, w, h, false, 320, 3411, 0.04, 0.04);

  // Subtle compression witness imprints of Secondary NAND & PMIC/Controller thermal zone
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.24)';
  ctx.lineWidth = 2.4;
  ctx.strokeRect(86, 68, 432, 276);
  ctx.strokeRect(84, 444, 224, 224);

  // Die-cut corner registration crosshairs
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)';
  ctx.lineWidth = 1.8;
  for (const [fx, fy] of [
    [46, 46],
    [w - 46, 46],
    [46, h - 46],
    [w - 46, h - 46],
  ]) {
    ctx.beginPath();
    ctx.moveTo(fx - 10, fy);
    ctx.lineTo(fx + 10, fy);
    ctx.moveTo(fx, fy - 10);
    ctx.lineTo(fx, fy + 10);
    ctx.stroke();
  }

  // Crisp silver-ink Panasonic PGS technical stencil
  ctx.fillStyle = 'rgba(226, 234, 246, 0.78)';
  ctx.textAlign = 'center';
  ctx.font = '800 20px "Courier New", monospace';
  ctx.fillText('PGS-EYGS 25μm · PYROLYTIC GRAPHITE', w * 0.5, 386);
  ctx.font = '700 16px "Courier New", monospace';
  ctx.fillStyle = 'rgba(186, 200, 220, 0.72)';
  ctx.fillText('k = 1950 W/m·K (X-Y) · PET INSULATED EDGE', w * 0.5, 414);

  return toHiTex(canvas);
}

/** C27: Progressive-Die Stamped C7521 Nickel-Silver / Permalloy RF EMI Shield Can Surface */
function createCfeEmiShieldCanTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);

  // Warm cold-rolled C7521 Nickel-Silver satin metallic sheen (Cu 65% / Ni 18% / Zn 17%)
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#c0c7d0');
  bg.addColorStop(0.32, '#dde2e8');
  bg.addColorStop(0.58, '#b5bdc7');
  bg.addColorStop(0.85, '#d6dce3');
  bg.addColorStop(1, '#b8c0ca');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 520, 3412, 0.075, 0.068);
  drawMicroGrain(ctx, w, h, 1400, 3413, 0.026);

  // Progressive-die stamped perimeter bend-line specular bevels
  ctx.strokeStyle = 'rgba(40, 50, 64, 0.42)';
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.52)';
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Stamped lot & alloy designation micro-marking
  ctx.fillStyle = 'rgba(30, 41, 59, 0.78)';
  ctx.textAlign = 'center';
  ctx.font = '800 22px "Courier New", monospace';
  ctx.fillText('C7521-R1  EMI-G4  2638', w * 0.5, 52);

  return toHiTex(canvas);
}

/** C36: Ultra-Thin 0.30 mm Copper Micro-Vapor Chamber (UTVC) Internal Sintered Wick & Micro-Channels */
function createCfeMicroVaporWickTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(604, 768);

  // Diffusion-bonded vacuum copper chamber base with subtle rainbow brazing heat-tint around perimeter
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#b95b26');
  bg.addColorStop(0.35, '#da7d42');
  bg.addColorStop(0.68, '#c2652e');
  bg.addColorStop(1, '#a84f1e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Diffusion-bonded perimeter weld band with authentic vacuum-furnace oxidation edge sheen
  ctx.strokeStyle = 'rgba(92, 34, 14, 0.72)';
  ctx.lineWidth = 24;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.strokeStyle = 'rgba(252, 198, 134, 0.50)';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, w - 64, h - 64);

  // Porous sintered 65–75 μm copper-powder capillary wick interior (sparkling granular sintered micro-spheres!)
  const rng = mulberry32(3414);
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0; i < 6500; i++) {
      const px = 42 + rng() * (w - 84);
      const py = 42 + rng() * (h - 84);
      const r = 0.8 + rng() * 1.4;
      ctx.rect(px, py, r, r);
    }
    ctx.fillStyle = pass === 0 ? 'rgba(255, 214, 168, 0.16)' : 'rgba(66, 22, 6, 0.22)';
    ctx.fill();
  }

  // 13 Photo-etched longitudinal vapor-flow micro-channels + lateral condenser return arteries
  for (let i = 0; i < 13; i++) {
    const cx = 66 + i * 39;
    ctx.fillStyle = 'rgba(72, 24, 6, 0.36)';
    ctx.fillRect(cx - 5, 58, 10, h - 116);
    ctx.fillStyle = 'rgba(255, 206, 154, 0.26)';
    ctx.fillRect(cx - 1.5, 58, 3, h - 116);
  }

  // Boiling evaporator nucleation copper-mesh pad directly over Controller SoC hotspot (lower-left!)
  ctx.fillStyle = 'rgba(234, 88, 12, 0.28)';
  ctx.fillRect(72, 444, 232, 224);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
  ctx.lineWidth = 2;
  ctx.strokeRect(72, 444, 232, 224);
  ctx.strokeStyle = 'rgba(255, 228, 196, 0.34)';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  for (let mx = 80; mx < 298; mx += 10) {
    ctx.moveTo(mx, 448);
    ctx.lineTo(mx, 664);
  }
  for (let my = 452; my < 664; my += 10) {
    ctx.moveTo(76, my);
    ctx.lineTo(300, my);
  }
  ctx.stroke();

  // Condenser top & evaporator bottom DI-H2O working-fluid manifold glow bands
  ctx.fillStyle = 'rgba(56, 189, 248, 0.24)';
  ctx.fillRect(46, 46, w - 92, 24);
  ctx.fillRect(46, h - 70, w - 92, 24);

  // Laser-etched UTVC engineering spec stamp
  ctx.fillStyle = 'rgba(46, 14, 4, 0.82)';
  ctx.textAlign = 'center';
  ctx.font = '800 17px "Courier New", monospace';
  ctx.fillText('UTVC-0.30mm · Cu-SINTER 70μm · DI-H2O · >5000W/mK', w * 0.5, 412);

  return toHiTex(canvas);
}

/** C99: Sony MRW-G3 USB4 40 Gbps Reader CNC-Anodized Bead-Blasted Aluminum Thermal Dock Crown (Exact 18.5:1 High-Clarity Aspect!) */
function createCfeMrwg3CncAluminumTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(960, 52);

  // Dark bead-blasted anodized aluminum Sony MRW-G3 gunmetal body
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#161a22');
  bg.addColorStop(0.28, '#28303e');
  bg.addColorStop(0.58, '#1b202b');
  bg.addColorStop(0.84, '#242b38');
  bg.addColorStop(1, '#13171f');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 2600, 3415, 0.040);
  drawBrushedStreaks(ctx, w, h, false, 140, 3416, 0.030, 0.030);

  // Machined diamond-chamfer top & bottom highlight rails
  ctx.fillStyle = 'rgba(226, 236, 248, 0.44)';
  ctx.fillRect(0, 1.5, w, 2.5);
  ctx.fillStyle = 'rgba(6, 8, 12, 0.74)';
  ctx.fillRect(0, h - 4, w, 3.5);

  // Bold, high-contrast silkscreen / laser markings matching real Sony MRW-G3 reader
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(250, 252, 255, 0.96)';
  ctx.font = '700 26px Georgia, "Times New Roman", serif';
  ctx.fillText('SONY', 74, h * 0.5);

  ctx.fillStyle = 'rgba(216, 228, 244, 0.94)';
  ctx.font = '800 20px "Courier New", monospace';
  ctx.fillText('MRW-G3', 178, h * 0.5 + 0.5);

  // Fine vertical machined divider tick
  ctx.fillStyle = 'rgba(148, 163, 184, 0.55)';
  ctx.fillRect(272, 11, 2, h - 22);

  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(242, 248, 255, 0.96)';
  ctx.font = '800 20px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('CFexpress A', 376, h * 0.5 + 0.5);

  // Iconic amber-gold USB4 40Gbps PCIe Tunnel badge pill
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
  ctx.lineWidth = 2;
  ctx.strokeRect(482, 8, 244, h - 16);
  ctx.fillStyle = '#fbbf24';
  ctx.font = '800 20px "Courier New", monospace';
  ctx.fillText('USB4  40Gbps', 604, h * 0.5 + 0.5);

  // Right-side ACCESS LED silkscreen legend cleanly beside emerald jewel LED
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(226, 236, 248, 0.92)';
  ctx.font = '800 16px "Courier New", monospace';
  ctx.fillText('ACCESS', 846, h * 0.5 + 0.5);

  return toHiTex(canvas);
}

/** C01 (-Z) & C02 (+Z) Inner CNC-Milled Titanium / Stainless Pocket Surface with Trochoidal End-Mill Toolpaths */
function createCfeInnerArmorCncTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(576, 768);

  // Raw CNC-machined titanium-stainless satin metallic base
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#8d98a6');
  bg.addColorStop(0.38, '#aeb8c6');
  bg.addColorStop(0.72, '#828d9c');
  bg.addColorStop(1, '#9ea8b6');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Overlapping circular CNC end-mill trochoidal machining toolpath swirls!
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 1.4;
  for (let y = 36; y < h - 24; y += 26) {
    for (let x = 36; x < w - 24; x += 26) {
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 1.65);
      ctx.stroke();
    }
  }
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.11)';
  ctx.lineWidth = 1.1;
  for (let y = 49; y < h - 24; y += 26) {
    for (let x = 49; x < w - 24; x += 26) {
      ctx.beginPath();
      ctx.arc(x, y, 16, Math.PI * 0.4, Math.PI * 1.9);
      ctx.stroke();
    }
  }
  drawMicroGrain(ctx, w, h, 1400, 3417, 0.028);

  // Recessed machined stiffening pocket borders & thermal contact witness zones
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.48)';
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, w - 48, h - 48);
  ctx.strokeStyle = 'rgba(241, 245, 249, 0.42)';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, w - 60, h - 60);

  // Laser-etched internal manufacturing lot code & cavity stamp
  ctx.fillStyle = 'rgba(24, 32, 46, 0.78)';
  ctx.textAlign = 'center';
  ctx.font = '800 18px "Courier New", monospace';
  ctx.fillText('SONY  CEA-G1920T-A4  CNC-SUS/TI', w * 0.5, 386);
  ctx.font = '700 15px "Courier New", monospace';
  ctx.fillText('CAV-02  150N TOUGH  LOT 2638J', w * 0.5, 412);

  return toHiTex(canvas);
}

/** C64: Sony α7 IV Genuine Stamped SUS301 Stainless Combo-Slot EMI Chassis Plate (Exact 7.88:1 Aspect!) */
function createCfeComboSlotShellTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(1024, 130);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#a6b0be');
  bg.addColorStop(0.32, '#d8e0ea');
  bg.addColorStop(0.66, '#9aa4b4');
  bg.addColorStop(1, '#c4cdd9');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 340, 3418, 0.075, 0.072);

  // Progressive-die stamped perimeter crease & 5 crisp circular dimple witness rings
  ctx.strokeStyle = 'rgba(22, 30, 44, 0.56)';
  ctx.lineWidth = 3;
  ctx.strokeRect(8, 7, w - 16, h - 14);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.50)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(12, 11, w - 24, h - 22);
  for (const dx of [74, 248, 512, 776, 950]) {
    ctx.strokeStyle = 'rgba(22, 30, 44, 0.48)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(dx, 26, 9, 0, Math.PI * 2);
    ctx.stroke();
  }

  // High-contrast Sony service-manual combo-slot laser stencil & 21-pin alignment ruler ticks (1:1 aspect!)
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(10, 16, 28, 0.94)';
  ctx.font = '800 26px "Courier New", monospace';
  ctx.fillText('SONY  1-849-712-11  ·  CFE TYPE A / SD UHS-II COMBO', w * 0.5, 62);
  ctx.fillStyle = 'rgba(16, 24, 38, 0.88)';
  ctx.font = '800 17px "Courier New", monospace';
  ctx.fillText('21-PIN PCIe 4.0 WIPER BLOCK · SUS301 EMI SHIELD · PUSH-PUSH CAM', w * 0.5, 92);

  // 21 fine pin-alignment graduation ticks along bottom edge matching exact 1.5mm pitch
  ctx.fillStyle = 'rgba(12, 18, 30, 0.84)';
  for (let p = 0; p < 21; p++) {
    const px = 92 + p * 42;
    const isKey = p === 0 || p === 9 || p === 11 || p === 20;
    ctx.fillRect(px - 1.5, h - (isKey ? 26 : 19), 3, isKey ? 18 : 11);
  }

  return toHiTex(canvas);
}

function createIcEpoxyLaserTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Fine matte dark silica-filled semiconductor molding compound with realistic laser-etch contrast
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, '#181b22');
  g.addColorStop(0.5, '#1d212a');
  g.addColorStop(1, '#14171d');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const rng = mulberry32(701);
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0; i < 4200; i++) {
      const sz = 0.45 + rng() * 0.7;
      ctx.rect(rng() * s, rng() * s, sz, sz);
    }
    ctx.fillStyle = pass === 0 ? 'rgba(255,255,255,0.032)' : 'rgba(0,0,0,0.055)';
    ctx.fill();
  }
  return toTileTex(canvas, 3, 3);
}

// =============================================================================
// PHASE 28: PIXEL V2 & BIONZ XR V2 ULTRA-MICROSCOPIC NANOSCALE TEXTURES (2026)
// =============================================================================

function createV2PixelMetasurfaceTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 18, w * 0.5, h * 0.5, w * 0.56);
  grad.addColorStop(0, '#0ea5e9');
  grad.addColorStop(0.28, '#2563eb');
  grad.addColorStop(0.56, '#0284c7');
  grad.addColorStop(0.82, '#0f766e');
  grad.addColorStop(1, '#1e3a5f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Concentric multi-level Fresnel diffraction rings
  for (let r = 34; r < w * 0.48; r += 34) {
    ctx.strokeStyle = r % 68 === 0 ? 'rgba(186, 230, 253, 0.55)' : 'rgba(103, 232, 249, 0.28)';
    ctx.lineWidth = r % 68 === 0 ? 3.2 : 1.5;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Sub-wavelength TiO2 asymmetric phase-gradient nano-pillar grid
  const step = 24;
  for (let y = 18; y < h - 12; y += step) {
    for (let x = 18; x < w - 12; x += step) {
      const dx = (x - w * 0.5) / (w * 0.5);
      const dy = (y - h * 0.5) / (h * 0.5);
      const rad = Math.hypot(dx, dy);
      const pw = Math.max(4, Math.min(14, 14 - rad * 9.5));
      ctx.fillStyle = rad < 0.42 ? 'rgba(224, 242, 254, 0.72)' : 'rgba(125, 211, 252, 0.48)';
      ctx.fillRect(x - pw * 0.5, y - pw * 0.5, pw, pw);
    }
  }
  return toHiTex(canvas);
}

function createV2PixelSiLatticeTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#0b253a');
  grad.addColorStop(0.35, '#103f5c');
  grad.addColorStop(0.7, '#134e6f');
  grad.addColorStop(1, '#092033');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Potential-well contour bands (graded N1/N2/N3 doping profile)
  for (let i = 1; i <= 7; i++) {
    const pad = i * 44;
    ctx.strokeStyle = `rgba(56, 189, 248, ${(0.09 + i * 0.035).toFixed(2)})`;
    ctx.lineWidth = 2.0;
    ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);
  }

  // (100) Diamond cubic silicon atomic bond lattice micro-pattern
  const step = 32;
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.24)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let y = 16; y < h; y += step) {
    for (let x = 16; x < w; x += step) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + step * 0.5, y + step * 0.5);
      ctx.moveTo(x + step, y);
      ctx.lineTo(x + step * 0.5, y + step * 0.5);
    }
  }
  ctx.stroke();

  ctx.fillStyle = 'rgba(186, 230, 253, 0.52)';
  for (let y = 16; y < h; y += step) {
    for (let x = 16; x < w; x += step) {
      ctx.beginPath();
      ctx.arc(x, y, 2.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return toHiTex(canvas);
}

function createV2PixelHybridBondCuTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Dark SiCN plasma-activated dielectric matrix
  ctx.fillStyle = '#1b2638';
  ctx.fillRect(0, 0, w, h);

  // Subtle dielectric CMP polish swirls
  const rng = mulberry32(2801);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i < 42; i++) {
    const r = 40 + i * 14;
    ctx.arc(w * 0.5, h * 0.5, r, rng() * 6.28, rng() * 6.28 + 1.8);
  }
  ctx.stroke();

  // 300nm-pitch protruding nanotwin Cu-Cu pad array with TaN/SiCN barrier halo rings
  const step = 64;
  for (let y = 48; y < h - 32; y += step) {
    for (let x = 48; x < w - 32; x += step) {
      // TaN diffusion barrier halo
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Nanotwin copper pad gradient
      const cg = ctx.createRadialGradient(x - 5, y - 5, 2, x, y, 17);
      cg.addColorStop(0, '#fcd39d');
      cg.addColorStop(0.55, '#d97736');
      cg.addColorStop(1, '#92400e');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(x, y, 16.5, 0, Math.PI * 2);
      ctx.fill();

      // Nanotwin lamellar striations
      ctx.strokeStyle = 'rgba(255, 237, 213, 0.34)';
      ctx.lineWidth = 1.1;
      for (let k = -10; k <= 10; k += 5) {
        ctx.beginPath();
        ctx.moveTo(x - 11, y + k);
        ctx.lineTo(x + 11, y + k);
        ctx.stroke();
      }
    }
  }
  return toHiTex(canvas);
}

function createV2PixelAiCircuitTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#132a46');
  grad.addColorStop(0.5, '#1d3b5c');
  grad.addColorStop(1, '#0f243d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // On-Sensor AI Remosaicing & Compute-in-Pixel (CIP) MAC systolic sub-tiles
  const blocks = [
    { x: 26, y: 26, bw: 344, bh: 344, col: '#0284c7', label: 'AI REMOSAIC' },
    { x: 398, y: 26, bw: 344, bh: 344, col: '#0d9488', label: 'CIP MAC' },
    { x: 26, y: 398, bw: 344, bh: 344, col: '#d97706', label: 'FINE12 ADC' },
    { x: 398, y: 398, bw: 344, bh: 344, col: '#2563eb', label: 'CIS-PUF / HF-HDR' },
  ];
  for (const b of blocks) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.62)';
    ctx.fillRect(b.x, b.y, b.bw, b.bh);
    ctx.strokeStyle = b.col;
    ctx.lineWidth = 3;
    ctx.strokeRect(b.x, b.y, b.bw, b.bh);
    // Micro-cell matrix inside each block
    ctx.fillStyle = b.col;
    ctx.globalAlpha = 0.28;
    for (let cy = b.y + 18; cy < b.y + b.bh - 14; cy += 22) {
      for (let cx = b.x + 18; cx < b.x + b.bw - 14; cx += 22) {
        ctx.fillRect(cx, cy, 14, 14);
      }
    }
    ctx.globalAlpha = 1.0;
    // Copper bus traces
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let k = 0; k < 5; k++) {
      const py = b.y + 52 + k * 64;
      ctx.moveTo(b.x + 8, py);
      ctx.lineTo(b.x + b.bw - 8, py);
    }
    ctx.stroke();
  }
  return toHiTex(canvas);
}

function createV2BionzGaaNanosheetTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#141e2e';
  ctx.fillRect(0, 0, w, h);

  // Sub-2nm TSMC N2 / A16 GAA nanosheet multi-work-function metal gate stripes
  for (let x = 24; x < w - 16; x += 48) {
    const g = ctx.createLinearGradient(x, 0, x + 26, 0);
    g.addColorStop(0, '#64748b');
    g.addColorStop(0.5, '#cbd5e1');
    g.addColorStop(1, '#475569');
    ctx.fillStyle = g;
    ctx.fillRect(x, 20, 26, h - 40);

    // High-k HfO2 dielectric border lines
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(x - 3, 20, 3, h - 40);
    ctx.fillRect(x + 26, 20, 3, h - 40);
  }

  // Orthogonal M0 Ruthenium local metal tracks
  for (let y = 36; y < h - 20; y += 36) {
    ctx.fillStyle = y % 72 === 0 ? 'rgba(245, 158, 11, 0.72)' : 'rgba(148, 163, 184, 0.56)';
    ctx.fillRect(16, y, w - 32, 9);
  }
  return toHiTex(canvas);
}

function createV2BionzSramArrayTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#0f2942');
  grad.addColorStop(0.5, '#173e61');
  grad.addColorStop(1, '#0c2238');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Ultra-dense ISSCC 2026 xBIT 10T & N2 0.0175um^2 SRAM bitcell banks
  const banks = 4;
  const pad = 22;
  const cellW = (w - pad * (banks + 1)) / banks;
  for (let by = 0; by < banks; by++) {
    for (let bx = 0; bx < banks; bx++) {
      const rx = pad + bx * (cellW + pad);
      const ry = pad + by * (cellW + pad);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.fillRect(rx, ry, cellW, cellW);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(rx, ry, cellW, cellW);

      // Bitlines & Wordlines grid
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.34)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 14; i < cellW - 8; i += 14) {
        ctx.moveTo(rx + i, ry + 6);
        ctx.lineTo(rx + i, ry + cellW - 6);
        ctx.moveTo(rx + 6, ry + i);
        ctx.lineTo(rx + cellW - 6, ry + i);
      }
      ctx.stroke();

      // Sense-amp golden strip
      ctx.fillStyle = '#d97706';
      ctx.fillRect(rx + 6, ry + cellW * 0.48, cellW - 12, 8);
    }
  }
  return toHiTex(canvas);
}

function createV2BionzBacksidePdnTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // TSMC A16 Super Power Rail (BSPDN) backside silicon/oxide substrate
  ctx.fillStyle = '#1b2230';
  ctx.fillRect(0, 0, w, h);

  // Heavy backside VDD (gold-copper) and VSS (blue-silver) power rails
  for (let y = 24; y < h - 16; y += 64) {
    const isVdd = ((y - 24) / 64) % 2 === 0;
    const g = ctx.createLinearGradient(0, y, 0, y + 36);
    if (isVdd) {
      g.addColorStop(0, '#f59e0b');
      g.addColorStop(0.5, '#d97736');
      g.addColorStop(1, '#92400e');
    } else {
      g.addColorStop(0, '#94a3b8');
      g.addColorStop(0.5, '#64748b');
      g.addColorStop(1, '#334155');
    }
    ctx.fillStyle = g;
    ctx.fillRect(18, y, w - 36, 36);

    // Direct vertical backside contacts (VB / nano-TSV pads) along rails
    ctx.fillStyle = isVdd ? '#fef3c7' : '#e0f2fe';
    for (let x = 44; x < w - 32; x += 52) {
      ctx.beginPath();
      ctx.arc(x, y + 18, 8.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Orthogonal heavy backside power straps
  for (let x = 68; x < w - 40; x += 128) {
    ctx.fillStyle = 'rgba(217, 119, 54, 0.35)';
    ctx.fillRect(x, 12, 22, h - 24);
  }
  return toHiTex(canvas);
}

function createV2BionzGlassCoreTgvTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Ultra-flat borosilicate glass core interposer tint
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#cbd5e1');
  grad.addColorStop(0.45, '#e0f2fe');
  grad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Fine copper RDL traces over glass core
  ctx.strokeStyle = 'rgba(180, 83, 9, 0.52)';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let i = 36; i < w - 24; i += 36) {
    ctx.moveTo(20, i);
    ctx.lineTo(w - 20, i);
    ctx.moveTo(i, 20);
    ctx.lineTo(i, h - 20);
  }
  ctx.stroke();

  // Laser-drilled Through-Glass Vias (TGV) with copper lining
  for (let y = 54; y < h - 36; y += 72) {
    for (let x = 54; x < w - 36; x += 72) {
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return toHiTex(canvas);
}

function createV2PixelPerovskiteStackTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Vertically stacked Halide Perovskite R/G/B filterless color bands (ETH Zurich / Empa 2025)
  const bands = [
    { y0: 0, bh: h / 3, c0: '#1d4ed8', c1: '#38bdf8', dot: 'rgba(224,242,254,0.75)' },
    { y0: h / 3, bh: h / 3, c0: '#047857', c1: '#34d399', dot: 'rgba(209,250,229,0.75)' },
    { y0: (2 * h) / 3, bh: h / 3, c0: '#b91c1c', c1: '#fb7185', dot: 'rgba(255,228,230,0.75)' },
  ];
  for (const b of bands) {
    const g = ctx.createLinearGradient(0, b.y0, w, b.y0 + b.bh);
    g.addColorStop(0, b.c0);
    g.addColorStop(0.5, b.c1);
    g.addColorStop(1, b.c0);
    ctx.fillStyle = g;
    ctx.fillRect(0, b.y0, w, b.bh);

    // Corner-sharing ABX3 octahedral perovskite crystal diamond lattice
    const step = 42;
    ctx.strokeStyle = 'rgba(255,255,255,0.34)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let y = b.y0 + 21; y < b.y0 + b.bh - 8; y += step) {
      for (let x = 21; x < w - 8; x += step) {
        ctx.moveTo(x, y - 16);
        ctx.lineTo(x + 16, y);
        ctx.lineTo(x, y + 16);
        ctx.lineTo(x - 16, y);
        ctx.closePath();
      }
    }
    ctx.stroke();

    ctx.fillStyle = b.dot;
    for (let y = b.y0 + 21; y < b.y0 + b.bh - 8; y += step) {
      for (let x = 21; x < w - 8; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, 4.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  // Transparent ITO micro-electrode dividers between R/G/B perovskite layers
  ctx.fillStyle = 'rgba(226, 232, 240, 0.85)';
  ctx.fillRect(0, h / 3 - 5, w, 10);
  ctx.fillRect(0, (2 * h) / 3 - 5, w, 10);
  return toHiTex(canvas);
}

function createV2PixelDeuteriumInterfaceTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.42, '#134e4a');
  grad.addColorStop(0.58, '#0f766e');
  grad.addColorStop(1, '#1e3a5f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Horizontal Si/SiO2 atomic bond plane with heavy Deuterium (2H / D) passivation caps
  const step = 48;
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
  ctx.lineWidth = 2.0;
  for (let y = 36; y < h - 20; y += step) {
    ctx.beginPath();
    ctx.moveTo(16, y);
    ctx.lineTo(w - 16, y);
    ctx.stroke();
    for (let x = 36; x < w - 20; x += step) {
      // Si lattice atom
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(x, y, 6.2, 0, Math.PI * 2);
      ctx.fill();
      // Si-D heavy deuterium bond upward
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(x, y - 6);
      ctx.lineTo(x, y - 20);
      ctx.stroke();
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(x, y - 22, 4.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return toHiTex(canvas);
}

function createV2Bionz2dTmdLatticeTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#1e1b4b');
  grad.addColorStop(0.5, '#312e81');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Authentic hexagonal 2H-MoS2 / WSe2 atomic monolayer honeycomb lattice (0.7nm thick!)
  const r = 24;
  const dx = r * 1.5;
  const dy = r * Math.sqrt(3);
  ctx.strokeStyle = 'rgba(165, 180, 252, 0.45)';
  ctx.lineWidth = 2.0;
  for (let row = -1; row < h / dy + 2; row++) {
    for (let col = -1; col < w / dx + 2; col++) {
      const cx = col * dx;
      const cy = row * dy + (col % 2 === 0 ? 0 : dy * 0.5);
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const ang = (Math.PI / 3) * k;
        const vx = cx + Math.cos(ang) * r;
        const vy = cy + Math.sin(ang) * r;
        if (k === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.stroke();

      // Alternating Mo/W (gold) and S/Se (cyan) vertices
      for (let k = 0; k < 6; k++) {
        const ang = (Math.PI / 3) * k;
        const vx = cx + Math.cos(ang) * r;
        const vy = cy + Math.sin(ang) * r;
        ctx.fillStyle = k % 2 === 0 ? '#f59e0b' : '#22d3ee';
        ctx.beginPath();
        ctx.arc(vx, vy, k % 2 === 0 ? 4.2 : 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  return toHiTex(canvas);
}

function createV2BionzMicrofluidicGridTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  // Direct-to-silicon parallel micro-channel liquid cooling manifold (imec IEDM 2025 17-3)
  for (let y = 18; y < h - 18; y += 44) {
    // Coolant channel glow (cold cyan -> warm amber gradient across chip)
    const cg = ctx.createLinearGradient(24, y, w - 24, y);
    cg.addColorStop(0, '#0284c7');
    cg.addColorStop(0.45, '#06b6d4');
    cg.addColorStop(0.82, '#38bdf8');
    cg.addColorStop(1, '#f97316');
    ctx.fillStyle = cg;
    ctx.fillRect(24, y, w - 48, 26);

    // Etched silicon micro-pin-fin turbulators inside each coolant channel
    ctx.fillStyle = '#334155';
    for (let x = 44; x < w - 44; x += 36) {
      ctx.fillRect(x, y + 5, 14, 16);
      ctx.strokeStyle = 'rgba(224,242,254,0.45)';
      ctx.lineWidth = 1.0;
      ctx.strokeRect(x, y + 5, 14, 16);
    }
  }
  // Inlet/outlet distribution plenums on left & right edges
  ctx.fillStyle = '#0ea5e9';
  ctx.fillRect(4, 16, 18, h - 32);
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(w - 22, 16, 18, h - 32);
  return toHiTex(canvas);
}

// =============================================================================
// PHASE 30: FULL-FRAME IMAGE SENSOR & 5-AXIS IBIS BESPOKE TEXTURES (S01-S90)
// =============================================================================

function createSensorCuCuHybridTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Plasma-activated SiO2 hybrid bonding dielectric field (deep sapphire-indigo)
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0b1c36');
  bg.addColorStop(0.5, '#132a4f');
  bg.addColorStop(1, '#09172e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Solid Cu perimeter hermetic moisture/crack seal ring
  ctx.strokeStyle = '#d98448';
  ctx.lineWidth = 14;
  ctx.strokeRect(14, 14, w - 28, h - 28);
  ctx.strokeStyle = '#f5b87a';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Dual-tier 3um pitch Cu-Cu direct hybrid-bond copper micro-pad matrix (8 column readout banks)
  const marginX = 44;
  const marginY = 38;
  const padStep = 14;
  ctx.fillStyle = '#df8d4c';
  for (let y = marginY; y <= h - marginY; y += padStep) {
    for (let x = marginX; x <= w - marginX; x += padStep) {
      // Bank separator streets every 8 columns & center horizontal bus
      if (Math.abs(y - h * 0.5) < 10) continue;
      if (((x - marginX) / padStep) % 8 === 7) continue;
      ctx.fillRect(x - 3.6, y - 3.6, 7.2, 7.2);
    }
  }
  // Specular center dimples on pads (CMP dishing highlight)
  ctx.fillStyle = '#fcd2a2';
  for (let y = marginY; y <= h - marginY; y += padStep) {
    for (let x = marginX; x <= w - marginX; x += padStep) {
      if (Math.abs(y - h * 0.5) < 10) continue;
      if (((x - marginX) / padStep) % 8 === 7) continue;
      ctx.fillRect(x - 1.5, y - 1.5, 3.0, 3.0);
    }
  }

  // Central horizontal copper power/clock redistribution trunk
  ctx.fillStyle = '#b96934';
  ctx.fillRect(marginX, h * 0.5 - 6, w - marginX * 2, 12);
  ctx.strokeStyle = '#fbd0a0';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(marginX, h * 0.5);
  ctx.lineTo(w - marginX, h * 0.5);
  ctx.stroke();

  // 4-corner wafer-to-wafer sub-micron overlay Vernier targets
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.2;
  for (const [vx, vy] of [
    [34, 32],
    [w - 34, 32],
    [34, h - 32],
    [w - 34, h - 32],
  ]) {
    ctx.strokeRect(vx - 6, vy - 6, 12, 12);
    ctx.beginPath();
    ctx.moveTo(vx - 9, vy);
    ctx.lineTo(vx + 9, vy);
    ctx.moveTo(vx, vy - 9);
    ctx.lineTo(vx, vy + 9);
    ctx.stroke();
  }
  return toHiTex(canvas);
}

function createSensorLogicAdcDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Wafer 2: 4nm FinFET Column-Parallel 16-bit CDS/ADC & SLVS-EC v3.0 PHY Floorplan
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0a162b');
  bg.addColorStop(0.5, '#14264a');
  bg.addColorStop(1, '#091426');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Outer golden seal ring + peripheral I/O cells
  ctx.strokeStyle = '#d4a644';
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, w - 24, h - 24);

  // Top & Bottom symmetrical 16-bit Column-Parallel ADC banks (16 interleaved slices each)
  const bankX = 88;
  const bankW = w - 176;
  const sliceW = bankW / 16;
  for (let row = 0; row < 2; row++) {
    const by = row === 0 ? 34 : h - 196;
    const bh = 162;
    for (let c = 0; c < 16; c++) {
      const sx = bankX + c * sliceW;
      const g = ctx.createLinearGradient(sx, by, sx, by + bh);
      g.addColorStop(0, c % 2 === 0 ? '#1d4ed8' : '#0f766e');
      g.addColorStop(0.45, c % 2 === 0 ? '#0369a1' : '#1e40af');
      g.addColorStop(1, '#0f172a');
      ctx.fillStyle = g;
      ctx.fillRect(sx + 2, by, sliceW - 4, bh);

      // Column CDS comparator fine grating lines
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.34)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      for (let gx = sx + 6; gx < sx + sliceW - 4; gx += 5) {
        ctx.moveTo(gx, by + 4);
        ctx.lineTo(gx, by + bh - 4);
      }
      ctx.stroke();

      // Golden ramp-DAC & counter strip along inner edge
      ctx.fillStyle = 'rgba(234, 179, 8, 0.72)';
      ctx.fillRect(sx + 2, row === 0 ? by + bh - 14 : by + 2, sliceW - 4, 12);
    }
  }

  // Central DSP / Timing Generator / Ramp-DAC / PLL Spine
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(bankX, 208, bankW, 96);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.4;
  ctx.strokeRect(bankX, 208, bankW, 96);
  // Central spiral LC-PLL & bandgap reference macro tiles
  for (const cx of [186, 384, 582]) {
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.4;
    for (let r = 10; r <= 30; r += 7) {
      ctx.strokeRect(cx - r, 256 - r, r * 2, r * 2);
    }
  }

  // Left & Right 8-lane SLVS-EC v3.0 High-Speed SerDes PHY vertical stacks
  for (const sx of [26, w - 76]) {
    for (let lane = 0; lane < 8; lane++) {
      const ly = 42 + lane * 54;
      ctx.fillStyle = '#0c4a6e';
      ctx.fillRect(sx, ly, 50, 44);
      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(sx, ly, 50, 44);
      ctx.fillStyle = '#eab308';
      ctx.fillRect(sx + 6, ly + 16, 38, 12);
    }
  }

  return toHiTex(canvas);
}

function createSensorDramDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Wafer 3: 120fps High-Speed 3D-Stacked Frame-Buffer DRAM + Central Cu TSV Bus
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#130f2c');
  bg.addColorStop(0.5, '#1e1b4b');
  bg.addColorStop(1, '#0d1024');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Outer copper TSV power guard ring
  ctx.strokeStyle = '#c87d45';
  ctx.lineWidth = 7;
  ctx.strokeRect(14, 14, w - 28, h - 28);

  // 8 Ultra-High-Bandwidth DRAM Memory Banks (4 top x 4 bottom)
  const padX = 36;
  const padY = 34;
  const gapX = 18;
  const spineH = 54;
  const bw = (w - padX * 2 - gapX * 3) / 4;
  const bh = (h - padY * 2 - spineH) / 2;

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const bx = padX + c * (bw + gapX);
      const by = r === 0 ? padY : padY + bh + spineH;
      const g = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
      g.addColorStop(0, (r + c) % 2 === 0 ? '#312e81' : '#3b2478');
      g.addColorStop(0.5, '#4338ca');
      g.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = g;
      ctx.fillRect(bx, by, bw, bh);

      // Dense 1T1C trench capacitor wordline/bitline micro-grid
      ctx.strokeStyle = 'rgba(196, 181, 253, 0.25)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      for (let gx = bx + 6; gx < bx + bw - 4; gx += 7) {
        ctx.moveTo(gx, by + 4);
        ctx.lineTo(gx, by + bh - 4);
      }
      for (let gy = by + 18; gy < by + bh - 12; gy += 22) {
        ctx.moveTo(bx + 4, gy);
        ctx.lineTo(bx + bw - 4, gy);
      }
      ctx.stroke();

      // Bank Sense-Amp copper bar
      ctx.fillStyle = '#e2a349';
      ctx.fillRect(bx + 4, r === 0 ? by + bh - 12 : by + 2, bw - 8, 10);
      ctx.strokeStyle = 'rgba(224, 231, 255, 0.55)';
      ctx.lineWidth = 1.6;
      ctx.strokeRect(bx, by, bw, bh);
    }
  }

  // Central Cu Through-Silicon-Via (TSV) I/O spine
  const sy = padY + bh + 6;
  ctx.fillStyle = '#0a0f1f';
  ctx.fillRect(padX, sy, w - padX * 2, spineH - 12);
  ctx.fillStyle = '#e08e4c';
  for (let tx = padX + 14; tx < w - padX - 10; tx += 16) {
    ctx.beginPath();
    ctx.arc(tx, sy + 13, 4.2, 0, Math.PI * 2);
    ctx.arc(tx, sy + 29, 4.2, 0, Math.PI * 2);
    ctx.fill();
  }

  return toHiTex(canvas);
}

function createSensorHtccCeramicTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  // Kyocera dark 92% Al2O3 co-fired HTCC ceramic micro-sintered grain (low stray reflection)
  ctx.fillStyle = '#24272e';
  ctx.fillRect(0, 0, s, s);
  drawMicroGrain(ctx, s, s, 4200, 304, 0.065);
  // Subtle co-fired tape-cast alumina micro-lamination striations
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let y = 8; y < s; y += 20) {
    ctx.moveTo(0, y);
    ctx.lineTo(s, y);
  }
  ctx.stroke();
  return toTileTex(canvas, 3, 3);
}

function createSensorSlvsFlexTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Kapton polyimide amber substrate
  const bg = ctx.createLinearGradient(0, 0, w, 0);
  bg.addColorStop(0, '#9c4e12');
  bg.addColorStop(0.5, '#b85f19');
  bg.addColorStop(1, '#8c440e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle hatched Ag-paste EMI diamond shield mesh (keeps flex supple while blocking 4.7Gbps EMI!)
  ctx.strokeStyle = 'rgba(28, 32, 38, 0.34)';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let d = -h; d < w + h; d += 22) {
    ctx.moveTo(d, 0);
    ctx.lineTo(d + h, h);
    ctx.moveTo(d + h, 0);
    ctx.lineTo(d, h);
  }
  ctx.stroke();

  // 16 impedance-controlled 100-ohm differential rolled-annealed copper pairs
  ctx.strokeStyle = '#f2b163';
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  for (let lane = 0; lane < 16; lane++) {
    const y = 34 + lane * 28;
    for (const dy of [-4.2, 4.2]) {
      ctx.moveTo(24, y + dy);
      ctx.lineTo(240, y + dy);
      // Skew-matching trombone wiggle in center
      for (let m = 0; m < 4; m++) {
        const mx = 256 + m * 24;
        ctx.lineTo(mx, y + dy - 4.5);
        ctx.lineTo(mx + 12, y + dy + 4.5);
      }
      ctx.lineTo(w - 24, y + dy);
    }
  }
  ctx.stroke();

  // Left & Right ENIG gold B2B landing fingers
  ctx.fillStyle = '#f2cc61';
  for (let y = 26; y < h - 22; y += 14) {
    ctx.fillRect(4, y, 22, 8);
    ctx.fillRect(w - 26, y, 22, 8);
  }

  // Bend-zone white dashed fold lines & technical silkscreen
  ctx.strokeStyle = 'rgba(255, 250, 235, 0.72)';
  ctx.setLineDash([10, 8]);
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(180, 12);
  ctx.lineTo(180, h - 12);
  ctx.moveTo(w - 180, 12);
  ctx.lineTo(w - 180, h - 12);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = 'rgba(255, 248, 225, 0.90)';
  ctx.font = '800 22px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SLVS-EC v3.0  100Ω DIFF  16-LANE', w * 0.5, h - 14);
  return toHiTex(canvas);
}

function createSensorOemFlexIslTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Sony OEM ISL-2009 / ISD-2002 polyimide ribbon base
  ctx.fillStyle = '#ad5512';
  ctx.fillRect(0, 0, w, h);

  // Rolled-copper high-current VCM rails (wide) + differential Hall feedback traces (fine)
  ctx.fillStyle = '#e59a47';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(36, 42 + i * 52, w - 72, 26);
  }
  ctx.strokeStyle = '#f6c57a';
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const y = 236 + i * 32;
    ctx.moveTo(36, y);
    ctx.lineTo(w - 36, y);
  }
  ctx.stroke();

  // Matte-black Ag-paste conductive EMI shield patch in central run
  ctx.fillStyle = 'rgba(22, 26, 32, 0.78)';
  ctx.fillRect(190, 24, w - 380, h - 48);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.strokeRect(190, 24, w - 380, h - 48);

  // Gold ZIF terminal finger comb on both ends
  ctx.fillStyle = '#f3cc62';
  for (let y = 38; y < h - 38; y += 26) {
    ctx.fillRect(4, y, 36, 15);
    ctx.fillRect(w - 40, y, 36, 15);
  }

  // Crisp Sony ILCE-7M4 service-manual OEM designation silkscreen (Ref.506 & Ref.507)
  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 32px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SONY  ISL-2009 / ISD-2002', w * 0.5, h * 0.42);
  ctx.fillStyle = '#fde68a';
  ctx.font = '700 20px "Courier New", monospace';
  ctx.fillText('1-982-424-11 · 1-009-994-11', w * 0.5, h * 0.54);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.fillText('IBIS HALL + VCM DRIVE FPC', w * 0.5, h * 0.66);

  // Boss locating hole crosshairs
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 3;
  for (const bx of [135, w - 135]) {
    ctx.beginPath();
    ctx.arc(bx, h * 0.5, 16, 0, Math.PI * 2);
    ctx.stroke();
  }
  return toHiTex(canvas);
}

function createSensorDraQrPlateTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Laser-etched dark anodized/ceramic Sony Imager DRA Data calibration plate (Ref.512 A-5039-877-A)
  ctx.fillStyle = '#14171d';
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 180, 307, 0.05, 0.045);

  // Laser-etched outer precision border + corner datum ticks
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 5;
  ctx.strokeRect(20, 20, w - 40, h - 40);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, w - 60, h - 60);

  // Left side: High-contrast authentic 18x18 ECC200 DataMatrix 2D calibration symbol!
  const dmX = 56;
  const dmY = 66;
  const cells = 18;
  const cellSz = 20;
  ctx.fillStyle = '#eef2f7';
  ctx.fillRect(dmX - 14, dmY - 14, cells * cellSz + 28, cells * cellSz + 28);

  const rng = mulberry32(740063);
  ctx.fillStyle = '#0f141c';
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      let dark = false;
      if (c === 0 || r === cells - 1) dark = true;
      else if (r === 0) dark = c % 2 === 0;
      else if (c === cells - 1) dark = r % 2 === 1;
      else dark = rng() > 0.46;
      if (dark) {
        ctx.fillRect(dmX + c * cellSz, dmY + r * cellSz, cellSz, cellSz);
      }
    }
  }

  // Right side: Authentic Sony ILCE-7M4 Imager DRA (Defect Pixel / PRNU / Shading / Optical Axis) laser text
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'left';
  ctx.font = '800 36px "Courier New", monospace';
  ctx.fillText('SONY  IMX-FF', 448, 114);
  ctx.fillStyle = '#93c5fd';
  ctx.font = '700 24px "Courier New", monospace';
  ctx.fillText('IMAGER DRA DATA', 448, 158);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '700 22px "Courier New", monospace';
  ctx.fillText('P/N: A-5039-877-A', 448, 210);
  ctx.fillText('LOT: ILCE-7M4 33M', 448, 248);
  ctx.fillText('S/N: 2641-08941-K', 448, 286);
  ctx.fillText('DZ:+0.012  T:0.02', 448, 324);
  ctx.fillText('DPC/PRNU/SHAD  OK', 448, 362);

  // Micro calibration barcode footer
  ctx.fillStyle = '#e2e8f0';
  for (let bx = 448; bx < w - 48; bx += 7) {
    const bw = rng() > 0.5 ? 4 : 2;
    ctx.fillRect(bx, 392, bw, 46);
  }
  return toHiTex(canvas);
}

function createSensorOpticalScaleTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 256);
  // Mirror-lapped quartz / Invar-36 optical linear encoder substrate
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#cfd8e3');
  bg.addColorStop(0.45, '#f1f6fc');
  bg.addColorStop(0.75, '#b4c2d2');
  bg.addColorStop(1, '#dce5ef');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Dark chrome border rails
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, w, 24);
  ctx.fillRect(0, h - 24, w, 24);

  // Top track: Ultra-fine incremental 0.5-pixel chromium diffraction grating rulings!
  ctx.fillStyle = '#0f172a';
  for (let x = 16; x < w - 16; x += 8) {
    const major = ((x - 16) / 8) % 10 === 0;
    const med = ((x - 16) / 8) % 5 === 0;
    const len = major ? 88 : med ? 68 : 48;
    ctx.fillRect(x, 28, major ? 3.5 : 2.2, len);
  }

  // Bottom track: Binary pseudo-random Absolute Reference Mark (ARM) optical barcode track
  const rng = mulberry32(770500);
  ctx.fillStyle = '#1e293b';
  for (let x = 20; x < w - 20; x += 14) {
    if (rng() > 0.42) {
      ctx.fillRect(x, 148, 8, 72);
    }
  }
  // Golden center optical zero-home reference diamond + label
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(w * 0.5, 118);
  ctx.lineTo(w * 0.5 + 16, 134);
  ctx.lineTo(w * 0.5, 150);
  ctx.lineTo(w * 0.5 - 16, 134);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '800 16px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('INVAR-36  0.5px  0.1um  Moire', 16, 18);
  ctx.textAlign = 'right';
  ctx.fillText('ABS-REF  IBIS-SCALE', w - 16, h - 6);

  return toHiTex(canvas);
}

function createSensorHalbachMagnetTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 256);
  // 5-segment Ni-Cu-Ni plated N52H NdFeB Halbach flux-focusing array with polarity vectors!
  const segs = 5;
  const sw = w / segs;
  const dirs = ['↑', '→', '↓', '←', '↑'];
  const labels = ['N-Z', 'H+X', 'S-Z', 'H-X', 'N-Z'];
  const tints = ['#b4c3d4', '#9aa9bc', '#c2cfde', '#9aa9bc', '#b4c3d4'];

  for (let i = 0; i < segs; i++) {
    const sx = i * sw;
    const g = ctx.createLinearGradient(sx, 0, sx + sw, h);
    g.addColorStop(0, tints[i]);
    g.addColorStop(0.5, '#e2ebf4');
    g.addColorStop(1, '#8c9cb0');
    ctx.fillStyle = g;
    ctx.fillRect(sx, 0, sw, h);

    if (i > 0) {
      ctx.fillStyle = '#1e242c';
      ctx.fillRect(sx - 5, 0, 10, h);
    }

    ctx.fillStyle = i === 0 || i === 4 ? '#dc2626' : i === 2 ? '#2563eb' : '#d97706';
    ctx.fillRect(sx + 8, 12, sw - 16, 18);
    ctx.fillRect(sx + 8, h - 30, sw - 16, 18);

    ctx.fillStyle = '#111827';
    ctx.textAlign = 'center';
    ctx.font = '900 92px sans-serif';
    ctx.fillText(dirs[i], sx + sw * 0.5, 148);
    ctx.font = '800 30px "Courier New", monospace';
    ctx.fillText(labels[i], sx + sw * 0.5, 206);
  }
  drawBrushedStreaks(ctx, w, h, true, 120, 760, 0.04, 0.04);
  return toHiTex(canvas);
}

function createSensorWasherMarkingTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);
  // Concentric precision-lapped SUS304 Sony IM ADJUST WASHER D (Ref.456, P/N 455838741 = "25")
  const cx = w * 0.5;
  const cy = h * 0.5;
  const rg = ctx.createRadialGradient(cx, cy, 40, cx, cy, w * 0.5);
  rg.addColorStop(0, '#c8d2de');
  rg.addColorStop(0.45, '#ecf2f8');
  rg.addColorStop(0.78, '#b5c1cf');
  rg.addColorStop(1, '#d8e1eb');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(30, 41, 59, 0.16)';
  ctx.lineWidth = 1.6;
  for (let r = 82; r < w * 0.49; r += 8) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Authentic Sony ILCE-7M4 Service Manual Ref.456 thickness stamp ("25" = 250um)
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.font = '900 58px "Courier New", monospace';
  ctx.fillText('25', cx, 108);
  ctx.font = '800 34px "Courier New", monospace';
  ctx.fillText('IM-D', cx, h - 66);
  ctx.font = '800 28px "Courier New", monospace';
  ctx.fillText('250u', 94, cy + 10);
  ctx.fillText('456', w - 94, cy + 10);

  return toHiTex(canvas);
}

function createSensorPztStackTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  // Co-fired multilayer PZT-5H piezoelectric ceramic stack (18um alternating ceramic & Pd-Ag strata)
  ctx.fillStyle = '#dcd2ba';
  ctx.fillRect(0, 0, s, s);
  drawMicroGrain(ctx, s, s, 2600, 311, 0.055);
  for (let y = 6; y < s; y += 12) {
    ctx.fillStyle = 'rgba(110, 98, 82, 0.40)';
    ctx.fillRect(0, y, s, 3);
    ctx.fillStyle = 'rgba(255, 250, 238, 0.34)';
    ctx.fillRect(0, y + 3, s, 2);
  }
  return toTileTex(canvas, 3, 2);
}

function createSensorPyroGraphiteTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  // Panasonic PGS / Sony IM RADIATION SHEET B/D anisotropic pyrolytic graphite obsidian sheen
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, '#1b1e24');
  g.addColorStop(0.35, '#373e4b');
  g.addColorStop(0.65, '#171a20');
  g.addColorStop(1, '#2f3641');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  drawBrushedStreaks(ctx, s, s, true, 240, 312, 0.09, 0.075);
  drawMicroGrain(ctx, s, s, 2400, 313, 0.06);
  const rng = mulberry32(31400);
  ctx.fillStyle = 'rgba(203, 213, 225, 0.16)';
  for (let i = 0; i < 48; i++) {
    ctx.fillRect(rng() * s, rng() * s, 8 + rng() * 18, 2 + rng() * 4);
  }
  return toTileTex(canvas, 3, 3);
}

function createSensorEptfeVentTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);
  const cx = w * 0.5;
  const cy = h * 0.5;
  // Outer dark acrylic PSA adhesive mounting ring (W.L. Gore GAW-series breather)
  ctx.fillStyle = '#181c22';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#3b485b';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, 224, 0, Math.PI * 2);
  ctx.stroke();

  // Inner bright white hydrophobic micro-porous ePTFE membrane (0.2um pore size)
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.arc(cx, cy, 166, 0, Math.PI * 2);
  ctx.fill();

  const rng = mulberry32(70011);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.42)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let i = 0; i < 280; i++) {
    const a = rng() * Math.PI * 2;
    const rad = Math.sqrt(rng()) * 156;
    const px = cx + Math.cos(a) * rad;
    const py = cy + Math.sin(a) * rad;
    const ang2 = rng() * Math.PI * 2;
    ctx.moveTo(px, py);
    ctx.lineTo(px + Math.cos(ang2) * 15, py + Math.sin(ang2) * 15);
  }
  ctx.stroke();

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, 166, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle laser marking on outer adhesive collar
  ctx.fillStyle = '#94a3b8';
  ctx.font = '800 22px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GORE ePTFE  0.2um', cx, 48);
  ctx.fillText('IP67 BARO VENT', cx, h - 26);

  return toHiTex(canvas);
}

// =============================================================================
// PHASE 31: EXTREME MICRO-DETAIL FULL-FRAME SENSOR & IBIS TEXTURES (16 NEW)
// =============================================================================

/** 1. Thixomolded AZ91D Magnesium Die-Cast Chassis Texture with CNC Milled Pads & TEX-5810 Code */
function createSensorMgDieCastTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#5a6370');
  bg.addColorStop(0.5, '#687382');
  bg.addColorStop(1, '#505966');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Fine shot-blasted die-cast magnesium crystal stipple
  drawMicroGrain(ctx, w, h, 8500, 3101, 0.085);

  // Structural cast rib shadow grid & truss pockets
  ctx.strokeStyle = 'rgba(26, 32, 42, 0.36)';
  ctx.lineWidth = 5;
  ctx.strokeRect(22, 22, w - 44, h - 44);
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.24)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(27, 27, w - 54, h - 54);

  // CNC-machined bright silver circular datum bosses (3-point IBIS reference planes)
  for (const [bx, by] of [
    [92, 86],
    [w - 92, 86],
    [w * 0.5, h - 84],
  ]) {
    const rg = ctx.createRadialGradient(bx, by, 6, bx, by, 42);
    rg.addColorStop(0, '#cbd5e1');
    rg.addColorStop(0.65, '#e2e8f0');
    rg.addColorStop(1, '#94a3b8');
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(bx, by, 42, 0, Math.PI * 2);
    ctx.fill();
    // Concentric CNC face-milling swirl rings
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.28)';
    ctx.lineWidth = 1.4;
    for (let r = 12; r <= 38; r += 6) {
      ctx.beginPath();
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Die-cast ejector-pin witness circles
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.42)';
  ctx.lineWidth = 2;
  for (const [ex, ey] of [
    [220, 74],
    [w - 220, 74],
    [130, h - 76],
    [w - 130, h - 76],
  ]) {
    ctx.beginPath();
    ctx.arc(ex, ey, 11, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Raised cast mold designation (Sony ILCE-7M4 Ref.510 TEX-5810)
  ctx.fillStyle = 'rgba(226, 232, 240, 0.62)';
  ctx.font = '800 24px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SONY  TEX-5810  Mg-AZ91D  CAV-2', w * 0.5, 58);
  return toHiTex(canvas);
}

/** 2. Orthocyclic Enameled Flat Copper Wire VCM Voice-Coil Winding Texture */
function createSensorVcmCopperWindingTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#7c3410';
  ctx.fillRect(0, 0, s, s);

  // Tightly packed horizontal enameled copper magnet wire strands with specular ridge
  const pitch = 7;
  for (let y = 0; y < s; y += pitch) {
    const wg = ctx.createLinearGradient(0, y, 0, y + pitch);
    wg.addColorStop(0.0, '#4e1e07');
    wg.addColorStop(0.28, '#c86024');
    wg.addColorStop(0.52, '#f5a560');
    wg.addColorStop(0.76, '#a94816');
    wg.addColorStop(1.0, '#3f1705');
    ctx.fillStyle = wg;
    ctx.fillRect(0, y, s, pitch);
  }
  // Subtle diagonal layer-transition orthocyclic crossover glint
  ctx.strokeStyle = 'rgba(255, 214, 165, 0.16)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(s * 0.44, 0);
  ctx.lineTo(s * 0.56, s);
  ctx.stroke();
  drawBrushedStreaks(ctx, s, s, true, 140, 3102, 0.05, 0.05);
  return toTileTex(canvas, 2, 3);
}

/** 3. Grain-Oriented Laminated Soft-Iron / Permalloy Magnetic Flux Yoke Texture */
function createSensorSoftIronYokeTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, '#8e98a6');
  g.addColorStop(0.35, '#b6c0ce');
  g.addColorStop(0.7, '#7e8896');
  g.addColorStop(1, '#a4aebc');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  drawBrushedStreaks(ctx, s, s, true, 320, 3103, 0.09, 0.07);
  // Subtle electro-galvanized grain-oriented steel rolling striations
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let y = 12; y < s; y += 24) {
    ctx.moveTo(0, y);
    ctx.lineTo(s, y);
  }
  ctx.stroke();
  return toTileTex(canvas, 2, 2);
}

/** 4. Multi-Layer Optical Filter Block Coating Texture (OFB-01-187 · λ/4 · CM500) */
function createSensorOpticalFilterCoatingTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Subtle cyan-teal-violet multi-layer dichroic & birefringent AR interference wash
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0.0, '#67e8f9');
  g.addColorStop(0.28, '#38bdf8');
  g.addColorStop(0.54, '#a78bfa');
  g.addColorStop(0.78, '#2dd4bf');
  g.addColorStop(1.0, '#60a5fa');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Sumi-nuri edge-blackened anti-stray-light perimeter frame
  ctx.strokeStyle = '#090d14';
  ctx.lineWidth = 26;
  ctx.strokeRect(13, 13, w - 26, h - 26);

  // Precision 45-degree ground optical bevel specular border
  ctx.strokeStyle = 'rgba(240, 249, 255, 0.72)';
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  // Corner crystal optic-axis orientation reticle & Sony Service Manual Ref.504 OFB-01-187 code
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(52, 84);
  ctx.lineTo(94, 42);
  ctx.moveTo(78, 42);
  ctx.lineTo(94, 42);
  ctx.lineTo(94, 58);
  ctx.stroke();

  ctx.fillStyle = 'rgba(248, 250, 252, 0.88)';
  ctx.font = '800 20px "Courier New", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('OFB-01-187  45°  λ/4  CM500', w - 44, h - 38);
  return toHiTex(canvas);
}

/** 5. Waffle-Embossed High-Conductivity Fiberglass-Reinforced Silicone TIM Thermal Pad */
function createSensorTimSiliconeWaffleTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  // High-k Fujipoly/Shin-Etsu pale slate-lavender thermal silicone elastomer
  ctx.fillStyle = '#9aa8b8';
  ctx.fillRect(0, 0, s, s);
  drawMicroGrain(ctx, s, s, 2800, 3105, 0.055);

  // Embedded fiberglass reinforcement weave micro-grid
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.25)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i < s; i += 8) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.moveTo(0, i);
    ctx.lineTo(s, i);
  }
  ctx.stroke();

  // Molded 45° diamond air-bleed waffle embossing grooves
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.42)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let d = -s; d < s * 2; d += 32) {
    ctx.moveTo(d, 0);
    ctx.lineTo(d + s, s);
    ctx.moveTo(d + s, 0);
    ctx.lineTo(d, s);
  }
  ctx.stroke();
  ctx.strokeStyle = 'rgba(241, 245, 249, 0.40)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let d = -s + 3; d < s * 2; d += 32) {
    ctx.moveTo(d, 0);
    ctx.lineTo(d + s, s);
  }
  ctx.stroke();
  return toTileTex(canvas, 3, 2);
}

/** 6. Stamped C7521 Nickel-Silver EMI Shield Can & RF Clamp Texture */
function createSensorEmiShieldNickelTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#c7ced6');
  g.addColorStop(0.45, '#e2e7ed');
  g.addColorStop(0.8, '#aeb7c2');
  g.addColorStop(1, '#d1d7de');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 240, 3106, 0.06, 0.05);

  // Embossed stamped stiffening rib frame & diagonal X-bead
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.46)';
  ctx.lineWidth = 9;
  ctx.strokeRect(36, 36, w - 72, h - 72);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.62)';
  ctx.lineWidth = 3;
  ctx.strokeRect(42, 42, w - 84, h - 84);

  // Photo-etched RF-cutoff thermal vent micro-perforation array (center zone)
  ctx.fillStyle = '#1e2530';
  for (let y = 112; y <= h - 140; y += 26) {
    for (let x = 108; x <= w - 108; x += 26) {
      ctx.beginPath();
      ctx.arc(x, y, 6.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Laser-etched Sony Service Part ID & ESD caution mark
  ctx.fillStyle = '#1e293b';
  ctx.font = '800 28px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SONY  A-5039-877-A  C7521-EMI', w * 0.5, h - 68);
  return toHiTex(canvas);
}

/** 7. 0.04mm CFRP Carbon-Fiber Twill Dust-Shield Blade Weave Texture */
function createSensorCarbonCurtainWeaveTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#14171d';
  ctx.fillRect(0, 0, s, s);
  const step = 16;
  for (let y = 0; y < s; y += step) {
    for (let x = 0; x < s; x += step) {
      const phase = ((x / step + y / step) & 3);
      const horiz = phase < 2;
      const g = horiz
        ? ctx.createLinearGradient(x, y, x + step, y)
        : ctx.createLinearGradient(x, y, x, y + step);
      g.addColorStop(0.0, '#101318');
      g.addColorStop(0.5, horiz ? '#363d49' : '#2b313c');
      g.addColorStop(1.0, '#0f1217');
      ctx.fillStyle = g;
      ctx.fillRect(x + 1, y + 1, step - 2, step - 2);
    }
  }
  drawMicroGrain(ctx, s, s, 1800, 3107, 0.04);
  return toTileTex(canvas, 4, 2);
}

/** 8. Sony Nov 2026 Patent US 2026/0358663 A1 e-ND Liquid-Crystal Filter Cell Texture */
function createSensorEndLiquidCrystalTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Variable neutral-density guest-host nematic LC active dimming field (1/4 to 1/128 ND tint)
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0.0, '#1f2937');
  bg.addColorStop(0.35, '#334155');
  bg.addColorStop(0.68, '#1e293b');
  bg.addColorStop(1.0, '#0f172a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle ITO transparent electrode segment lines & 8um glass micro-spacer bead glints
  const rng = mulberry32(20261112);
  ctx.fillStyle = 'rgba(226, 232, 240, 0.24)';
  for (let i = 0; i < 240; i++) {
    ctx.beginPath();
    ctx.arc(52 + rng() * (w - 104), 52 + rng() * (h - 104), 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Printed UV-cured epoxy perimeter cell seal wall
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 16;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Gold ITO electrode perimeter busbar inside seal ring
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 5;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  // Patented US 2026/0358663 A1 Corner LC Injection Ports + Asymmetric Flow-Splitting Barrier Walls!
  // Bottom-left & top-right corner ports with stepped internal flow-asymmetry walls
  for (const [px, py, sx, sy] of [
    [22, h - 22, 1, -1],
    [w - 22, 22, -1, 1],
  ]) {
    // Injection port plug (UV-cured resin stopper)
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(px - 14, py - 14, 28, 28);
    // Asymmetric stepped barrier wall splitting short center flow vs long edge flow
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(px + sx * 24, py + sy * 18);
    ctx.lineTo(px + sx * 84, py + sy * 48);
    ctx.lineTo(px + sx * 124, py + sy * 48);
    ctx.stroke();
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(px + sx * 18, py + sy * 62);
    ctx.lineTo(px + sx * 54, py + sy * 92);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(241, 245, 249, 0.85)';
  ctx.font = '800 20px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SONY e-ND  LC-CELL  1/4–1/128  ITO', w * 0.5, 64);
  return toHiTex(canvas);
}

/** 9. White 96% Al2O3 Peltier TEC Ceramic Substrate with Laser Polarity & Model Silkscreen */
function createSensorPeltierCeramicTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Crisp high-purity 96% white Al2O3 alumina thermoelectric plate
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#eef2f6');
  g.addColorStop(0.5, '#f8fafc');
  g.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3500, 3109, 0.032);

  // Subtle translucent inner copper serpentine bridge shadow grid (9x7 Bi2Te3 couple layout)
  ctx.strokeStyle = 'rgba(180, 118, 72, 0.16)';
  ctx.lineWidth = 4;
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.strokeRect(72 + c * 70, 56 + r * 58, 54, 42);
    }
  }

  // Outer precision laser-scribed perimeter border & corner alignment ticks
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 5;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Crisp industrial laser silkscreen
  ctx.fillStyle = '#1e293b';
  ctx.textAlign = 'center';
  ctx.font = '900 42px "Courier New", monospace';
  ctx.fillText('TEC1-FF63  Bi₂Te₃', w * 0.5, 198);
  ctx.fillStyle = '#0f4c81';
  ctx.font = '800 30px "Courier New", monospace';
  ctx.fillText('SONY IMX-COLD  ΔT 35°C', w * 0.5, 256);
  ctx.fillStyle = '#334155';
  ctx.font = '700 24px "Courier New", monospace';
  ctx.fillText('96% Al₂O₃  HERMETIC RTV SEAL', w * 0.5, 312);

  // Polarity terminal legend bottom-right (aligned with Red + / Black - leads)
  ctx.fillStyle = '#dc2626';
  ctx.font = '900 28px "Courier New", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('+12V RED', w - 58, h - 76);
  ctx.fillStyle = '#0f172a';
  ctx.fillText('-GND BLK', w - 58, h - 42);

  return toHiTex(canvas);
}

/** 10. 320-Pin Ceramic LGA/BGA Gold Land-Grid Array & Thermal Pad Texture */
function createSensorLgaBallGridTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Kyocera dark alumina ceramic bottom substrate
  ctx.fillStyle = '#20242c';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3600, 3110, 0.05);

  // Outer perimeter metallization guard trace
  ctx.strokeStyle = '#c89b3c';
  ctx.lineWidth = 5;
  ctx.strokeRect(18, 18, w - 36, h - 36);

  // 3-row perimeter ENIG gold LGA-320 landing pads with solder-ball highlights
  for (let gx = 46; gx <= w - 46; gx += 26) {
    for (let gy = 42; gy <= h - 42; gy += 26) {
      const inCenter = gx > 152 && gx < w - 152 && gy > 118 && gy < h - 118;
      if (inCenter) continue;
      ctx.fillStyle = '#d9ad42';
      ctx.fillRect(gx - 8, gy - 8, 16, 16);
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(gx, gy, 4.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Central segmented 4x3 CuW thermal ground pad islands + thermal vias
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const px = 178 + c * 106;
      const py = 132 + r * 86;
      ctx.fillStyle = '#cf9e3a';
      ctx.fillRect(px, py, 92, 72);
      ctx.fillStyle = '#181c24';
      for (let vx = px + 18; vx < px + 82; vx += 24) {
        for (let vy = py + 18; vy < py + 60; vy += 24) {
          ctx.beginPath();
          ctx.arc(vx, vy, 4.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // Pin-1 bright gold bevel chevron
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.moveTo(22, 22);
  ctx.lineTo(62, 22);
  ctx.lineTo(22, 62);
  ctx.closePath();
  ctx.fill();

  return toHiTex(canvas);
}

/** 11. Ultra-Black Micro-Flocked Optical Velvet / Sumi-nuri Light-Trap Baffle Texture */
function createSensorVelvetBaffleTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#090b0e';
  ctx.fillRect(0, 0, s, s);
  // Dense micro-flocked vertical fibers absorbing stray grazing light (<0.5% reflectance)
  const rng = mulberry32(31110);
  for (let i = 0; i < 4200; i++) {
    const v = 12 + Math.floor(rng() * 24);
    ctx.fillStyle = `rgb(${v},${v + 1},${v + 3})`;
    ctx.fillRect(rng() * s, rng() * s, 2.2, 2.2);
  }
  // Micro-serrated optical baffle parallel ridges
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.22)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let y = 8; y < s; y += 16) {
    ctx.moveTo(0, y);
    ctx.lineTo(s, y);
  }
  ctx.stroke();
  return toTileTex(canvas, 4, 4);
}

/** 12. High-Density Rigid-Flex Hall / NTC / SLVS-EC Interposer Sub-PCB Texture */
function createSensorHallSubPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  ctx.fillStyle = '#0d2e24';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#154436';
  ctx.fillRect(18, 18, w - 36, h - 36);

  // Differential Kelvin copper routing tracks beneath emerald mask
  ctx.strokeStyle = '#34a080';
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const y = 56 + i * 44;
    ctx.moveTo(36, y);
    ctx.lineTo(w - 36, y);
  }
  ctx.stroke();

  // ENIG gold SMD pads & stitching vias
  ctx.fillStyle = '#f2cc5a';
  for (let x = 44; x <= w - 44; x += 36) {
    ctx.fillRect(x - 8, 24, 16, 20);
    ctx.fillRect(x - 8, h - 44, 16, 20);
  }
  for (let x = 84; x <= w - 84; x += 64) {
    for (let y = 110; y <= h - 110; y += 72) {
      ctx.beginPath();
      ctx.arc(x, y, 6.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.strokeStyle = 'rgba(248, 250, 252, 0.85)';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(28, 28, w - 56, h - 56);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 24px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HALL-XYZ · NTC · SLVS-EC SUB-PCB', w * 0.5, h * 0.5 + 8);
  return toHiTex(canvas);
}

/** 13. CuW80 Sintered Tungsten-Copper Thermal Slug & Nano-Silver Die-Attach Texture */
function createSensorCuWAlloySinterTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Sintered CuW80 warm tungsten-copper metallic base
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#8b6f5c');
  g.addColorStop(0.5, '#a8876e');
  g.addColorStop(1, '#79604f');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 7200, 3113, 0.11);

  // Laser-machined cross-hatch CTE thermal stress-relief micro-channels
  ctx.strokeStyle = 'rgba(38, 28, 22, 0.56)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  for (let x = 96; x < w; x += 96) {
    ctx.moveTo(x, 36);
    ctx.lineTo(x, h - 36);
  }
  for (let y = 85; y < h; y += 85) {
    ctx.moveTo(36, y);
    ctx.lineTo(w - 36, y);
  }
  ctx.stroke();

  // Bright sintered nano-Ag metallic center die-attach plateau & silver meniscus border
  ctx.fillStyle = 'rgba(226, 232, 240, 0.65)';
  ctx.fillRect(68, 56, w - 136, h - 112);
  drawMicroGrain(ctx, w - 136, h - 112, 3200, 3114, 0.08);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 6;
  ctx.strokeRect(68, 56, w - 136, h - 112);

  ctx.fillStyle = '#1e293b';
  ctx.font = '800 22px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CuW80  CTE 7.2ppm/K  SINTERED NANO-Ag', w * 0.5, h - 18);
  return toHiTex(canvas);
}

/** 14. Cold-Rolled Directional Brushed SUS301-CSP / CuBe2 Spring-Steel Retainer Texture */
function createSensorSusSpringSteelTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, '#c0c9d4');
  g.addColorStop(0.45, '#e6ecf2');
  g.addColorStop(0.8, '#aab4c0');
  g.addColorStop(1, '#d5dde6');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  drawBrushedStreaks(ctx, s, s, true, 360, 3115, 0.10, 0.075);
  return toTileTex(canvas, 3, 2);
}

/** 15. Seam-Welded Gold-Plated Kovar 72.000 MHz TCXO & MEMS Accelerometer Lid Texture */
function createSensorMemsTcxoLidTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);
  // Gold-over-Nickel seam-welded Kovar hermetic crystal/MEMS lid
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#c89b32');
  g.addColorStop(0.45, '#f4d36e');
  g.addColorStop(0.85, '#b88924');
  g.addColorStop(1, '#e8c252');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 180, 3116, 0.05, 0.05);

  // Laser seam-weld perimeter bezel track
  ctx.strokeStyle = '#6b4d0e';
  ctx.lineWidth = 14;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, w - 60, h - 60);

  // Pin-1 recessed laser index dot
  ctx.fillStyle = '#1f2937';
  ctx.beginPath();
  ctx.arc(84, 84, 22, 0, Math.PI * 2);
  ctx.fill();

  // Sharp laser-engraved oscillator / MEMS markings
  ctx.fillStyle = '#1f2937';
  ctx.textAlign = 'center';
  ctx.font = '900 54px "Courier New", monospace';
  ctx.fillText('72.000M', w * 0.5, 226);
  ctx.font = '800 36px "Courier New", monospace';
  ctx.fillText('±0.5ppm TCXO', w * 0.5, 294);
  ctx.font = '800 30px "Courier New", monospace';
  ctx.fillText('NDK · S2641', w * 0.5, 368);
  return toHiTex(canvas);
}

/** 16. ASML Photolithography Wafer-Edge Optical Alignment Fiducial & Vernier Reticle Texture */
function createSensorFiducialTargetTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);
  const cx = w * 0.5;
  const cy = h * 0.5;
  ctx.fillStyle = '#121a28';
  ctx.fillRect(0, 0, w, h);

  // Concentric gold ASML box-in-box lithography overlay target
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 10;
  ctx.strokeRect(36, 36, w - 72, h - 72);
  ctx.lineWidth = 7;
  ctx.strokeRect(108, 108, w - 216, h - 216);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 6;
  ctx.strokeRect(178, 178, w - 356, h - 356);

  // High-contrast 10um dual-axis crosshair + Vernier grating ticks
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(20, cy);
  ctx.lineTo(w - 20, cy);
  ctx.moveTo(cx, 20);
  ctx.lineTo(cx, h - 20);
  ctx.stroke();

  ctx.fillStyle = '#fde047';
  for (let d = 56; d <= 164; d += 18) {
    ctx.fillRect(cx + d - 3, cy - 26, 6, 52);
    ctx.fillRect(cx - d - 3, cy - 26, 6, 52);
    ctx.fillRect(cx - 26, cy + d - 3, 52, 6);
    ctx.fillRect(cx - 26, cy - d - 3, 52, 6);
  }

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '800 22px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('FID-A1', 50, 74);
  ctx.textAlign = 'right';
  ctx.fillText('0.05um', w - 50, h - 52);
  return toHiTex(canvas);
}

// =============================================================================
// PHASE 30 UHD PROCEDURAL PBR TEXTURES: BATTERY 2026 & MICROPHONE 2026
// =============================================================================

/** Battery 2026 CVD Porous Carbon Scaffold containing Amorphous Nano-Si Cores & Void Buffers */
function createBatSiCNanoScaffoldTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#131720');
  bg.addColorStop(0.5, '#1d2432');
  bg.addColorStop(1, '#11151d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Hexagonal CVD porous carbon scaffold wall mesh
  const rng = mulberry32(3071);
  const stepX = 68;
  const stepY = 58;
  for (let row = -1; row <= h / stepY + 1; row++) {
    for (let col = -1; col <= w / stepX + 1; col++) {
      const cx = col * stepX + (row % 2 === 0 ? 0 : stepX * 0.5);
      const cy = row * stepY;
      // Carbon pore cavity void buffer
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k * Math.PI) / 3 + Math.PI / 6;
        const px = cx + Math.cos(a) * 32;
        const py = cy + Math.sin(a) * 32;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = '#090d14';
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4.2;
      ctx.stroke();

      // Inner CVD-deposited glowing metallic-amber nano-Si droplet (leaves void space for 300% expansion!)
      const rSi = 13 + rng() * 5.5;
      const ox = (rng() - 0.5) * 4;
      const oy = (rng() - 0.5) * 4;
      const sg = ctx.createRadialGradient(cx + ox - 4, cy + oy - 4, 2, cx + ox, cy + oy, rSi);
      sg.addColorStop(0, '#fef08a');
      sg.addColorStop(0.45, '#f59e0b');
      sg.addColorStop(0.85, '#b45309');
      sg.addColorStop(1, '#451a03');
      ctx.beginPath();
      ctx.arc(cx + ox, cy + oy, rSi, 0, Math.PI * 2);
      ctx.fillStyle = sg;
      ctx.fill();

      // Thin LiF artificial SEI halo ring around nano-Si
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
  }
  drawMicroGrain(ctx, w, h, 2600, 3072, 0.05);
  return toHiTex(canvas);
}

/** Battery 2026 Single-Crystal Ni-Rich NMC811 Layered Oxide Lattice & ALD Barrier Sheen */
function createBatSingleCrystalNmcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0f223d');
  bg.addColorStop(0.5, '#1d4ed8');
  bg.addColorStop(1, '#0c4a6e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Diagonal single-crystal layered transition-metal oxide (Ni/Mn/Co) slabs & Li+ intercalation galleries
  for (let y = -w; y < h + w; y += 26) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y - w * 0.38);
    ctx.strokeStyle = 'rgba(125, 211, 252, 0.42)';
    ctx.lineWidth = 5.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, y + 11);
    ctx.lineTo(w, y + 11 - w * 0.38);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.35)';
    ctx.lineWidth = 2.0;
    ctx.setLineDash([8, 10]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Faceted octahedral crystal grain highlights + ALD Al2O3/LiNbO3 thin-film iridescent interference bands
  const rng = mulberry32(3073);
  for (let i = 0; i < 18; i++) {
    const cx = rng() * w;
    const cy = rng() * h;
    const sz = 48 + rng() * 68;
    const fg = ctx.createLinearGradient(cx - sz, cy - sz, cx + sz, cy + sz);
    fg.addColorStop(0, 'rgba(186, 230, 253, 0.28)');
    fg.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
    fg.addColorStop(1, 'rgba(12, 74, 110, 0.28)');
    ctx.beginPath();
    ctx.moveTo(cx, cy - sz * 0.7);
    ctx.lineTo(cx + sz * 0.65, cy);
    ctx.lineTo(cx, cy + sz * 0.7);
    ctx.lineTo(cx - sz * 0.65, cy);
    ctx.closePath();
    ctx.fillStyle = fg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(224, 242, 254, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  drawBrushedStreaks(ctx, w, h, false, 180, 3074, 0.05, 0.05);
  return toHiTex(canvas);
}

/** Battery 2026 Smart EIS Predictive BMS / USB PD 3.2 AVS / EU Battery Passport Silicon Die */
function createBatEisNyquistDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#0c1322';
  ctx.fillRect(0, 0, w, h);

  // Subtle gold/cyan silicon macro sub-grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
  ctx.lineWidth = 1.2;
  for (let i = 32; i < w; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 20);
    ctx.lineTo(i, h - 20);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(20, i);
    ctx.lineTo(w - 20, i);
    ctx.stroke();
  }

  // Left quadrant: EIS Nyquist impedance semicircle spectroscopy DSP core
  ctx.fillStyle = '#11223a';
  ctx.fillRect(42, 44, 330, 310);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.strokeRect(42, 44, 330, 310);
  // Glowing EIS Nyquist arc + Warburg diffusion tail
  ctx.beginPath();
  ctx.arc(160, 278, 86, Math.PI, 0, false);
  ctx.lineTo(334, 152);
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.fillText('EIS 0.1Hz-10kHz', 62, 86);
  ctx.font = 'bold 18px ui-monospace, monospace';
  ctx.fillStyle = '#facc15';
  ctx.fillText('R_ct / SEI / Li-PLATE', 62, 332);

  // Right quadrant: EU Battery Passport 2027 PQC Secure Vault & DataMatrix
  ctx.fillStyle = '#1e1636';
  ctx.fillRect(396, 44, 330, 310);
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 3;
  ctx.strokeRect(396, 44, 330, 310);
  drawDataMatrix(ctx, 434, 108, 176, 14, '#e9d5ff', '#1e1636', 3095);
  ctx.fillStyle = '#f3e8ff';
  ctx.font = 'bold 22px ui-monospace, monospace';
  ctx.fillText('EU-DPP 71 / PQC', 420, 86);
  ctx.fillStyle = '#c084fc';
  ctx.font = 'bold 18px ui-monospace, monospace';
  ctx.fillText('2026-2027 PASS', 432, 326);

  // Bottom strip: USB PD 3.2 SPR AVS 100mV ladder & GaN 2MHz Buck-Boost stage
  ctx.fillStyle = '#162521';
  ctx.fillRect(42, 384, 684, 340);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(42, 384, 684, 340);
  for (let i = 0; i < 12; i++) {
    const bh = 55 + i * 16;
    ctx.fillStyle = i < 4 ? '#0ea5e9' : i < 8 ? '#10b981' : '#f59e0b';
    ctx.fillRect(70 + i * 52, 678 - bh, 38, bh);
  }
  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 26px ui-monospace, monospace';
  ctx.fillText('USB PD 3.2 SPR AVS · 100mV STEP · 2MHz GaN', 66, 434);

  // Perimeter gold wirebond pads
  ctx.fillStyle = '#eab308';
  for (let i = 54; i <= w - 54; i += 28) {
    ctx.fillRect(i - 6, 8, 12, 16);
    ctx.fillRect(i - 6, h - 24, 12, 16);
    ctx.fillRect(8, i - 6, 16, 12);
    ctx.fillRect(w - 24, i - 6, 16, 12);
  }
  return toHiTex(canvas);
}

/** Microphone 2026 Optical MEMS VCSEL Laser Interferometer & Diffractive Grating Substrate */
function createMicOpticalInterferometerTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 24, w * 0.5, h * 0.5, w * 0.62);
  bg.addColorStop(0, '#0f172a');
  bg.addColorStop(0.55, '#1e293b');
  bg.addColorStop(1, '#090d16');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Concentric Fabry-Perot / diffractive interferometer rainbow fringes
  const fringeColors = ['#38bdf8', '#22d3ee', '#a855f7', '#ec4899', '#f59e0b', '#10b981'];
  for (let r = 340; r >= 40; r -= 16) {
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
    ctx.strokeStyle = fringeColors[(r / 16) % fringeColors.length];
    ctx.globalAlpha = 0.34;
    ctx.lineWidth = 6.5;
    ctx.stroke();
  }
  ctx.globalAlpha = 1.0;

  // Precision sub-wavelength diffractive optical grating parallel slits across center
  for (let x = 160; x <= w - 160; x += 14) {
    ctx.fillStyle = x % 28 === 0 ? 'rgba(56, 189, 248, 0.58)' : 'rgba(250, 204, 21, 0.42)';
    ctx.fillRect(x, 180, 5, h - 360);
  }

  // Central VCSEL 850nm ruby-cyan laser aperture & 4 surrounding photodiode quadrants
  const quadCoords: Array<[number, number]> = [
    [130, 130],
    [w - 130, 130],
    [130, h - 130],
    [w - 130, h - 130],
  ];
  for (const [qx, qy] of quadCoords) {
    ctx.fillStyle = '#0e7490';
    ctx.fillRect(qx - 58, qy - 58, 116, 116);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 4;
    ctx.strokeRect(qx - 58, qy - 58, 116, 116);
  }
  const laserG = ctx.createRadialGradient(w * 0.5, h * 0.5, 4, w * 0.5, h * 0.5, 68);
  laserG.addColorStop(0, '#ffffff');
  laserG.addColorStop(0.28, '#f43f5e');
  laserG.addColorStop(0.65, '#38bdf8');
  laserG.addColorStop(1, 'rgba(15,23,42,0)');
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, 68, 0, Math.PI * 2);
  ctx.fillStyle = laserG;
  ctx.fill();

  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 26px ui-monospace, monospace';
  ctx.fillText('OPTICAL MEMS · 84dBA SNR · 146dB AOP', 92, 62);
  return toHiTex(canvas);
}

/** Microphone 2026 32-Bit Float Dual-ADC & TinyML Neural Speech-Separation DSP Silicon Die */
function createMicAudioDsp32FloatTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#0d1424';
  ctx.fillRect(0, 0, w, h);

  // Fine copper/gold interconnect routing mesh
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.16)';
  ctx.lineWidth = 1.4;
  for (let i = 24; i < w; i += 24) {
    ctx.beginPath();
    ctx.moveTo(i, 24);
    ctx.lineTo(i, h - 24);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(24, i);
    ctx.lineTo(w - 24, i);
    ctx.stroke();
  }

  // Top-Left: High-Gain ADC (-130 dBFS whisper capture)
  ctx.fillStyle = '#0c2d48';
  ctx.fillRect(40, 44, 330, 270);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3.2;
  ctx.strokeRect(40, 44, 330, 270);
  ctx.fillStyle = '#bae6fd';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.fillText('ADC-1 HIGH GAIN', 64, 88);
  ctx.font = 'bold 18px ui-monospace, monospace';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('WHISPER / -130 dBFS', 64, 120);

  // Top-Right: Low-Gain ADC (146 dB SPL clip-free capture)
  ctx.fillStyle = '#3b1f0b';
  ctx.fillRect(398, 44, 330, 270);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3.2;
  ctx.strokeRect(398, 44, 330, 270);
  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.fillText('ADC-2 LOW GAIN', 424, 88);
  ctx.font = 'bold 18px ui-monospace, monospace';
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('EXPLOSION / 0% CLIP', 424, 120);

  // Glowing sine waveform traversing both ADCs seamlessly into IEEE-754 32-bit float stitcher
  ctx.beginPath();
  for (let x = 60; x <= 700; x += 6) {
    const t = (x - 60) / 640;
    const amp = 26 + Math.sin(t * Math.PI) * 58;
    const y = 216 + Math.sin(t * Math.PI * 10) * amp;
    if (x === 60) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Bottom Half: TinyML Transformer 3-Stem Spectrogram & MVDR Beamformer Core
  ctx.fillStyle = '#1b1335';
  ctx.fillRect(40, 344, 688, 380);
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(40, 344, 688, 380);
  ctx.fillStyle = '#f3e8ff';
  ctx.font = 'bold 26px ui-monospace, monospace';
  ctx.fillText('32-BIT FLOAT STITCH · TinyML VOICE NPU', 66, 392);

  // 16×6 neural systolic MAC spectrogram tiles
  const rng = mulberry32(3058);
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 14; c++) {
      const v = rng();
      ctx.fillStyle = v > 0.65 ? '#f59e0b' : v > 0.35 ? '#06b6d4' : '#6366f1';
      ctx.globalAlpha = 0.45 + v * 0.5;
      ctx.fillRect(68 + c * 45, 424 + r * 44, 36, 34);
    }
  }
  ctx.globalAlpha = 1.0;

  // Perimeter gold pads
  ctx.fillStyle = '#eab308';
  for (let i = 54; i <= w - 54; i += 28) {
    ctx.fillRect(i - 6, 8, 12, 16);
    ctx.fillRect(i - 6, h - 24, 12, 16);
    ctx.fillRect(8, i - 6, 16, 12);
    ctx.fillRect(w - 24, i - 6, 16, 12);
  }
  return toHiTex(canvas);
}

/** Microphone Acoustic Phase-Delay Woven Silk Mesh & Electret Corona-Dipole Micro-Texture */
function createMicAcousticDelayClothTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#1e242c';
  ctx.fillRect(0, 0, w, h);

  // Precision twill acoustic-resistance weave controlling rear cardioid phase delay
  const step = 16;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const parity = ((x / step + y / step) & 1) === 0;
      ctx.fillStyle = parity ? '#475569' : '#334155';
      ctx.fillRect(x + 1, y + 1, step - 3, step - 3);
      ctx.fillStyle = parity ? 'rgba(226,232,240,0.22)' : 'rgba(234,179,8,0.16)';
      ctx.fillRect(x + 3, y + 3, step - 7, 3);
    }
  }
  // Subtle concentric acoustic calibration reticles
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.34)';
  ctx.lineWidth = 3;
  for (const rad of [110, 210, 310]) {
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, rad, 0, Math.PI * 2);
    ctx.stroke();
  }
  drawMicroGrain(ctx, w, h, 2400, 3067, 0.05);
  return toHiTex(canvas);
}

/** Phase 31A: 2026 Sulfide Argyrodite (Li6PS5Cl) Cubic Lattice & Ag-C Anode-Free Interlayer UHD Texture */
function createBatSulfideArgyroditeTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0f172a');
  bg.addColorStop(0.5, '#16253b');
  bg.addColorStop(1, '#0c1f2e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Argyrodite cubic F-43m crystal polyhedra mosaic + glowing cyan Li+ cage hopping corridors
  const rng = mulberry32(3101);
  const step = 64;
  for (let row = 0; row < h / step + 1; row++) {
    for (let col = 0; col < w / step + 1; col++) {
      const cx = col * step + ((row & 1) ? step * 0.5 : 0);
      const cy = row * step;
      const rad = step * 0.48;
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (Math.PI / 3) * k + Math.PI / 6;
        const px = cx + Math.cos(a) * rad;
        const py = cy + Math.sin(a) * rad;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const tone = Math.floor(28 + rng() * 34);
      ctx.fillStyle = `rgb(${tone}, ${tone + 26}, ${tone + 46})`;
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // PS4 tetrahedron amber core + Li+ ion cyan hopping nodes
      ctx.fillStyle = rng() > 0.45 ? '#f59e0b' : '#eab308';
      ctx.beginPath();
      ctx.arc(cx, cy, 7.5, 0, Math.PI * 2);
      ctx.fill();

      for (let j = 0; j < 3; j++) {
        const a = (Math.PI * 2 * j) / 3 + rng() * 0.4;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * 19, cy + Math.sin(a) * 19, 4.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Lithiophilic silver nanoparticle (Ag-C) micro-seeds shimmering along grain boundaries
  for (let i = 0; i < 95; i++) {
    const sx = rng() * w;
    const sy = rng() * h;
    ctx.fillStyle = 'rgba(248, 250, 252, 0.85)';
    ctx.beginPath();
    ctx.arc(sx, sy, 2.5 + rng() * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  drawMicroGrain(ctx, w, h, 2600, 3102, 0.05);
  return toHiTex(canvas);
}

/** Phase 31A: 2026 Embedded Fiber Bragg Grating (FBG) Optical Sensor & Ultrasonic Phased-Array CT UHD Texture */
function createBatFiberBraggOpticalTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#09111f');
  bg.addColorStop(1, '#102438');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle diagnostic grid
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
  ctx.lineWidth = 1.5;
  for (let p = 0; p < w; p += 48) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, p);
    ctx.lineTo(w, p);
    ctx.stroke();
  }

  // Central 0.125 mm silica optical fiber cladding + core
  ctx.fillStyle = 'rgba(14, 165, 233, 0.22)';
  ctx.fillRect(0, 270, w, 228);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 270, w, 228);

  const coreGrad = ctx.createLinearGradient(0, 344, 0, 424);
  coreGrad.addColorStop(0, '#0284c7');
  coreGrad.addColorStop(0.5, '#67e8f9');
  coreGrad.addColorStop(1, '#0284c7');
  ctx.fillStyle = coreGrad;
  ctx.fillRect(0, 346, w, 76);

  // Periodic UV-inscribed Bragg grating refractive-index notches (10.24 pm/C thermal shift)
  for (let x = 84; x <= w - 84; x += 26) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.fillRect(x, 342, 8, 84);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
    ctx.fillRect(x - 3, 294, 14, 46);
    ctx.fillRect(x - 3, 428, 14, 46);
  }

  // Ultrasonic CT phased-array wave fronts above & below fiber
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.65)';
  ctx.lineWidth = 3.5;
  for (let r = 64; r <= 230; r += 38) {
    ctx.beginPath();
    ctx.arc(w * 0.5, 110, r, 0.18 * Math.PI, 0.82 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w * 0.5, h - 110, r, 1.18 * Math.PI, 1.82 * Math.PI);
    ctx.stroke();
  }

  // Crisp instrumentation silkscreen
  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 26px ui-monospace, monospace';
  ctx.fillText('FBG 1550nm · 10.24 pm/°C · US-CT', 72, 64);
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 22px ui-monospace, monospace';
  ctx.fillText('INTERNAL CORE TEMP & GAS SCAN', 132, h - 42);
  drawMicroGrain(ctx, w, h, 2000, 3103, 0.04);
  return toHiTex(canvas);
}

/** Phase 31B: 2026 2D Graphene Atomically Thin Honeycomb Membrane & Fabry-Perot Interference UHD Texture */
function createMicGrapheneHexMembraneTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 24, w * 0.5, h * 0.5, w * 0.56);
  bg.addColorStop(0, '#1e293b');
  bg.addColorStop(0.55, '#0f172a');
  bg.addColorStop(1, '#020617');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Atomically regular sp2 carbon hexagonal graphene lattice
  const r = 24;
  const dx = r * 1.5;
  const dy = r * Math.sqrt(3);
  ctx.lineWidth = 2.4;
  for (let col = -1; col < w / dx + 2; col++) {
    for (let row = -1; row < h / dy + 2; row++) {
      const cx = col * dx;
      const cy = row * dy + ((col & 1) ? dy * 0.5 : 0);
      const dist = Math.hypot(cx - w * 0.5, cy - h * 0.5) / (w * 0.5);
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (Math.PI / 3) * k;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle =
        dist < 0.38
          ? 'rgba(56, 189, 248, 0.82)'
          : dist < 0.72
            ? 'rgba(168, 85, 247, 0.62)'
            : 'rgba(20, 184, 166, 0.45)';
      ctx.stroke();

      // Carbon atoms at vertices
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(cx + r, cy, 3.0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Concentric Fabry-Perot optical interference & corrugated stress-relief rings
  const ringColors = [
    'rgba(56, 189, 248, 0.55)',
    'rgba(192, 132, 252, 0.52)',
    'rgba(45, 212, 191, 0.48)',
    'rgba(250, 204, 21, 0.44)',
  ];
  for (let i = 0; i < 8; i++) {
    ctx.strokeStyle = ringColors[i % ringColors.length];
    ctx.lineWidth = 4.2;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, 58 + i * 42, 0, Math.PI * 2);
    ctx.stroke();
  }
  drawMicroGrain(ctx, w, h, 2200, 3104, 0.04);
  return toHiTex(canvas);
}

/** Phase 31B: 2026 Coiled-Space Spiral Helmholtz Acoustic Metamaterial Wind-Trap UHD Texture */
function createMicSpiralMetamaterialTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#181c24';
  ctx.fillRect(0, 0, w, h);

  // 4×4 matrix of coiled-space labyrinthine Helmholtz spiral acoustic resonators
  const cell = 192;
  for (let gy = 0; gy < 4; gy++) {
    for (let gx = 0; gx < 4; gx++) {
      const cx = gx * cell + cell * 0.5;
      const cy = gy * cell + cell * 0.5;

      // Machined dark aluminum cell frame
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.strokeRect(gx * cell + 8, gy * cell + 8, cell - 16, cell - 16);

      // Archimedean coiled acoustic waveguide spiral
      ctx.beginPath();
      const turns = 3.2;
      const maxR = cell * 0.39;
      for (let s = 0; s <= 120; s++) {
        const t = s / 120;
        const ang = t * Math.PI * 2 * turns + ((gx + gy) & 1 ? Math.PI : 0);
        const rad = 10 + t * (maxR - 10);
        const px = cx + Math.cos(ang) * rad;
        const py = cy + Math.sin(ang) * rad;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = (gx + gy) % 2 === 0 ? '#f59e0b' : '#38bdf8';
      ctx.lineWidth = 6.5;
      ctx.stroke();

      // Inner phase-cancellation acoustic aperture
      ctx.fillStyle = '#090d14';
      ctx.beginPath();
      ctx.arc(cx, cy, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
  }
  drawMicroGrain(ctx, w, h, 2600, 3105, 0.05);
  return toHiTex(canvas);
}

// =============================================================================
// PHASE 31: ELECTRONIC VIEWFINDER (EVF) & EYE-CONTROL AF BESPOKE TEXTURES (E01-E55)
// =============================================================================

/** E14 Rear: Sony LCD902 (ECX337AA-1 / ECX343E 0.64" QXGA) HTCC Ceramic Backplate with Factory 2D Calibration QR/DataMatrix */
function createEvfOledBackplaneQrTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Warm slate-alumina HTCC ceramic carrier substrate
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#c8c4b8');
  bg.addColorStop(0.5, '#d5d1c6');
  bg.addColorStop(1, '#bcb7aa');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle recessed metallic Kovar perimeter rim + Pin-1 chamfer triangle
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 10;
  ctx.strokeRect(14, 14, w - 28, h - 28);
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(24, 24);
  ctx.lineTo(68, 24);
  ctx.lineTo(24, 68);
  ctx.closePath();
  ctx.fill();

  // Central gleaming ENIG gold thermal die-attach contact pad (mates with E17 TIM!)
  const padGrad = ctx.createLinearGradient(256, 72, 704, 420);
  padGrad.addColorStop(0, '#c99732');
  padGrad.addColorStop(0.45, '#f0ca68');
  padGrad.addColorStop(0.75, '#d4a33a');
  padGrad.addColorStop(1, '#b68624');
  ctx.fillStyle = padGrad;
  ctx.fillRect(284, 72, 430, 310);
  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 3;
  ctx.strokeRect(284, 72, 430, 310);
  drawBrushedStreaks(ctx, w, h, false, 90, 3101, 0.04, 0.04);

  // Authentic Sony LCD902 Service-Manual Factory EVF Calibration 2D DataMatrix/QR Code (left bay!)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(42, 86, 212, 212);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(42, 86, 212, 212);
  drawDataMatrix(ctx, 56, 100, 184, 16, '#0f172a', '#f8fafc', 3102);

  // Authentic crisp Sony laser-etched microdisplay stencil markings
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 26px ui-monospace, monospace';
  ctx.fillText('SONY  LCD902', 44, 336);
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('ECX343E / 0.64" QXGA', 44, 368);
  ctx.fillStyle = '#475569';
  ctx.font = 'bold 17px ui-monospace, monospace';
  ctx.fillText('EVF CAL DATA · 9.44M', 44, 398);
  ctx.fillText('9440K · 240Hz · LF', 44, 424);

  // Laser-etched thermal-pad crosshair alignment fiducials & part lot stamp
  ctx.fillStyle = '#713f12';
  ctx.font = 'bold 22px ui-monospace, monospace';
  ctx.fillText('TANDEM OLEDoS · 4000cd/m²', 312, 114);
  ctx.font = 'bold 18px ui-monospace, monospace';
  ctx.fillText('8-756-074-19  LOT 26K4A', 312, 356);
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 2;
  for (const [fx, fy] of [
    [306, 94],
    [692, 94],
    [306, 360],
    [692, 360],
  ]) {
    ctx.beginPath();
    ctx.moveTo(fx - 8, fy);
    ctx.lineTo(fx + 8, fy);
    ctx.moveTo(fx, fy - 8);
    ctx.lineTo(fx, fy + 8);
    ctx.stroke();
  }

  // Bottom 60-pin FPC root pad strip
  ctx.fillStyle = '#eab308';
  for (let x = 86; x <= w - 86; x += 12) {
    ctx.fillRect(x, h - 38, 7, 18);
  }
  drawMicroGrain(ctx, w, h, 1800, 3103, 0.045);
  return toHiTex(canvas);
}

/** E14 Front: Monocrystalline CMOS Silicon Backplane Surround (4P-2C pixel compensation + 240fps dual-line scanners) */
function createEvfOledSiliconFrontTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Deep iridescent monocrystalline silicon wafer base
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0f172a');
  bg.addColorStop(0.5, '#1e293b');
  bg.addColorStop(1, '#0c1322');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Outer silicon scribe street & passivation bevel
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, w - 16, h - 16);

  // Top & Bottom 240fps Dual-Line Progressive Column Source Drivers & DAC banks
  const mx = 68;
  const my = 54;
  ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
  ctx.fillRect(mx, 22, w - mx * 2, 24);
  ctx.fillRect(mx, h - 46, w - mx * 2, 24);
  ctx.strokeStyle = 'rgba(125, 211, 252, 0.45)';
  ctx.lineWidth = 1.4;
  for (let x = mx + 8; x < w - mx; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 22);
    ctx.lineTo(x, 46);
    ctx.moveTo(x, h - 46);
    ctx.lineTo(x, h - 22);
    ctx.stroke();
  }

  // Left & Right Row-Scanner Gate Driver & 4P-2C Luminance Compensation Logic Columns
  ctx.fillStyle = 'rgba(139, 92, 246, 0.30)';
  ctx.fillRect(22, my, 36, h - my * 2);
  ctx.fillRect(w - 58, my, 36, h - my * 2);
  ctx.strokeStyle = 'rgba(196, 181, 253, 0.42)';
  for (let y = my + 6; y < h - my; y += 12) {
    ctx.beginPath();
    ctx.moveTo(24, y);
    ctx.lineTo(56, y);
    ctx.moveTo(w - 56, y);
    ctx.lineTo(w - 24, y);
    ctx.stroke();
  }

  // Dense perimeter Au wire-bond pad banks along top & bottom edges
  ctx.fillStyle = '#facc15';
  for (let x = 76; x <= w - 76; x += 14) {
    ctx.fillRect(x - 4, 6, 8, 12);
    ctx.fillRect(x - 4, h - 18, 8, 12);
  }

  // 4-corner photolithography stepper Vernier alignment targets
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2.2;
  for (const [fx, fy] of [
    [38, 30],
    [w - 38, 30],
    [38, h - 30],
    [w - 38, h - 30],
  ]) {
    ctx.strokeRect(fx - 7, fy - 7, 14, 14);
    ctx.beginPath();
    ctx.moveTo(fx - 11, fy);
    ctx.lineTo(fx + 11, fy);
    ctx.moveTo(fx, fy - 11);
    ctx.lineTo(fx, fy + 11);
    ctx.stroke();
  }

  // Inner active matrix backplane subtle grid (framed by OLED display)
  ctx.fillStyle = '#0a1220';
  ctx.fillRect(mx, my, w - mx * 2, h - my * 2);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
  ctx.lineWidth = 1;
  for (let x = mx; x <= w - mx; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, my);
    ctx.lineTo(x, h - my);
    ctx.stroke();
  }
  for (let y = my; y <= h - my; y += 18) {
    ctx.beginPath();
    ctx.moveTo(mx, y);
    ctx.lineTo(w - mx, y);
    ctx.stroke();
  }
  return toHiTex(canvas);
}

/** E46: 2-Stack Tandem WOLED + Charge Generation Layer + Fabry-Perot Optical Micro-Cavity & Symmetrical OCCF Pixel Lattice */
function createEvfTandemCavityStackTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Deep Fabry-Perot micro-cavity optical interference substrate
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#071022');
  bg.addColorStop(0.5, '#0f1c38');
  bg.addColorStop(1, '#081326');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Sony symmetrical OCCF (On-Chip Color Filter) 6.3um RGB micro-cavity pixel emitters
  const pitchX = 24;
  const pitchY = 24;
  const subPal = [
    { fill: '#ef4444', glow: '#fca5a5' }, // Red cavity (d_c tuned 630nm)
    { fill: '#10b981', glow: '#6ee7b7' }, // Green cavity (d_c tuned 532nm)
    { fill: '#3b82f6', glow: '#93c5fd' }, // Blue cavity (d_c tuned 460nm)
  ];
  for (let row = 0; row < h / pitchY; row++) {
    for (let col = 0; col < w / pitchX; col++) {
      const x = col * pitchX + 2;
      const y = row * pitchY + 2;
      // Symmetrical Sony color array order alternates cleanly per row to cancel oblique color shift!
      const idx = row % 2 === 0 ? col % 3 : (2 - (col % 3) + 3) % 3;
      const pal = subPal[idx];
      ctx.fillStyle = pal.fill;
      ctx.fillRect(x + 2, y + 2, pitchX - 7, pitchY - 7);
      // Reflective Al/Ag pixel anode micro-cavity bright center resonance spot
      ctx.fillStyle = pal.glow;
      ctx.fillRect(x + 6, y + 6, pitchX - 15, pitchY - 15);
    }
  }

  // Diagonal spectral Fabry-Perot optical interference resonance sheen bands
  const irid = ctx.createLinearGradient(0, 0, w, h);
  irid.addColorStop(0.0, 'rgba(56, 189, 248, 0.22)');
  irid.addColorStop(0.28, 'rgba(168, 85, 247, 0.20)');
  irid.addColorStop(0.55, 'rgba(250, 204, 21, 0.18)');
  irid.addColorStop(0.82, 'rgba(16, 185, 129, 0.22)');
  irid.addColorStop(1.0, 'rgba(244, 63, 94, 0.20)');
  ctx.fillStyle = irid;
  ctx.fillRect(0, 0, w, h);

  // Subtle horizontal metallic CGL (Charge Generation Layer) & MgAg cathode bus grid
  ctx.strokeStyle = 'rgba(253, 224, 71, 0.34)';
  ctx.lineWidth = 1.4;
  for (let y = 0; y < h; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.48)';
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, w - 12, h - 12);
  return toHiTex(canvas);
}

/** E16 / E04 / E07 / E30: 8-Layer Emerald HDI 240Hz MIPI-DSI TCON PCB with Meander Diff Pairs & Silkscreen */
function createEvfTconPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Deep high-Tg emerald solder mask
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0a442d');
  bg.addColorStop(0.5, '#0e583b');
  bg.addColorStop(1, '#083a26');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle internal copper power plane pour blocks visible under translucent green solder mask
  ctx.fillStyle = 'rgba(22, 124, 82, 0.45)';
  ctx.fillRect(36, 36, 280, 210);
  ctx.fillRect(356, 36, 376, 190);
  ctx.fillRect(36, 270, 696, 200);

  // Length-matched 4+4 lane MIPI-DSI differential meander serpentine traces routing down to CN901 ZIF!
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2.6;
  for (let lane = 0; lane < 8; lane++) {
    const lx = 240 + lane * 34;
    ctx.beginPath();
    ctx.moveTo(lx, 210);
    for (let s = 0; s < 6; s++) {
      const sy = 236 + s * 28;
      const amp = (lane % 2 === 0 ? 1 : -1) * 10;
      ctx.lineTo(lx + amp, sy);
      ctx.lineTo(lx - amp, sy + 14);
    }
    ctx.lineTo(lx, 444);
    ctx.stroke();
  }

  // Horizontal high-speed bus traces & ELVDD/ELVSS wide power rails
  ctx.strokeStyle = 'rgba(110, 231, 183, 0.55)';
  ctx.lineWidth = 4.2;
  ctx.beginPath();
  ctx.moveTo(52, 118);
  ctx.lineTo(716, 118);
  ctx.moveTo(52, 152);
  ctx.lineTo(716, 152);
  ctx.stroke();

  // Perimeter ENIG gold RF guard via stitching fence
  ctx.fillStyle = '#eab308';
  for (let x = 22; x <= w - 22; x += 22) {
    ctx.beginPath();
    ctx.arc(x, 16, 3.6, 0, Math.PI * 2);
    ctx.arc(x, h - 16, 3.6, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let y = 36; y <= h - 36; y += 22) {
    ctx.beginPath();
    ctx.arc(16, y, 3.6, 0, Math.PI * 2);
    ctx.arc(w - 16, y, 3.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4-corner ENIG gold plated mounting ring pads with via petals
  for (const [mx, my] of [
    [42, 42],
    [w - 42, 42],
    [42, h - 42],
    [w - 42, h - 42],
  ]) {
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(mx, my, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#092d1e';
    ctx.beginPath();
    ctx.arc(mx, my, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  // Crisp white PCB engineering silkscreen outlines & Sony board designation legends
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.82)';
  ctx.lineWidth = 2.0;
  ctx.strokeRect(216, 76, 176, 146); // IC901 TCON courtyard
  ctx.strokeRect(472, 68, 128, 108); // IC902 OLED PMIC courtyard
  ctx.strokeRect(228, 412, 312, 64); // CN901 60-pin ZIF outline

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('VF-TCON-240  1-012-844-11', 76, 54);
  ctx.font = 'bold 17px ui-monospace, monospace';
  ctx.fillText('IC901 DSC-TCON', 222, 70);
  ctx.fillText('IC902 ELVDD/SS', 474, 62);
  ctx.fillText('CN901 MIPI-DSI 4+4L', 252, 405);
  ctx.fillText('X901 27MHz', 82, 422);
  ctx.fillText('LF', 686, 444);

  // Gold circular test points (TP1..TP8)
  ctx.fillStyle = '#facc15';
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.arc(82 + i * 24, 344, 5.2, 0, Math.PI * 2);
    ctx.fill();
  }
  return toHiTex(canvas);
}

/** E24 / E36: Stamped Nickel-Silver (Cu-Ni-Zn) RF EMI Faraday Shield Cage Texture */
function createEvfTconEmiCanTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#c6cdd6');
  bg.addColorStop(0.35, '#dce2ea');
  bg.addColorStop(0.7, '#b8c1cd');
  bg.addColorStop(1, '#cfd6df');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Fine directional cold-rolled Cu-Ni-Zn metal grain
  drawBrushedStreaks(ctx, w, h, false, 240, 3105, 0.055, 0.055);

  // Embossed stamping stiffening channel borders & corner relief crease highlights
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.lineWidth = 4;
  ctx.strokeRect(26, 26, w - 52, h - 52);
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.42)';
  ctx.lineWidth = 3;
  ctx.strokeRect(32, 32, w - 64, h - 64);

  // Perimeter laser-spot grounding dimple witness marks
  for (let x = 72; x <= w - 72; x += 88) {
    for (const y of [44, h - 44]) {
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(x, y, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(x - 1.5, y - 1.5, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Subtle laser-etched Sony EMI shield part identification
  ctx.fillStyle = 'rgba(51, 65, 85, 0.62)';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.fillText('VF-SHD-89100  CuNi18Zn20', 54, 92);
  ctx.font = 'bold 18px ui-monospace, monospace';
  ctx.fillText('RF FARADAY >35dB · 240Hz MIPI', 54, h - 64);
  return toHiTex(canvas);
}

/** E34 / E38 / E41 / E48 / E16: Authentic Sony Amber Polyimide OEM Flexible Circuit Texture */
function createEvfOemFlexRibbonTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Translucent amber Kapton polyimide substrate over rolled-annealed copper
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#b45309');
  bg.addColorStop(0.5, '#d97706');
  bg.addColorStop(1, '#92400e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Dense parallel impedance-controlled differential copper trace lanes gleaming beneath Kapton coverlay
  for (let x = 28; x <= w - 28; x += 14) {
    const isDiffGap = Math.floor((x - 28) / 14) % 3 === 2;
    ctx.fillStyle = isDiffGap ? 'rgba(120, 53, 15, 0.42)' : 'rgba(251, 191, 36, 0.56)';
    ctx.fillRect(x, 12, isDiffGap ? 4 : 7, h - 24);
  }

  // Cross-hatched ground mesh band along upper & lower margins
  ctx.strokeStyle = 'rgba(253, 224, 71, 0.25)';
  ctx.lineWidth = 1.4;
  for (let i = -h; i < w + h; i += 22) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 80, 80);
    ctx.moveTo(i, h);
    ctx.lineTo(i + 80, h - 80);
    ctx.stroke();
  }

  // Perimeter gold micro-vias & stiffener boundary line
  ctx.fillStyle = '#fde047';
  for (let y = 36; y <= h - 36; y += 34) {
    ctx.beginPath();
    ctx.arc(16, y, 4.5, 0, Math.PI * 2);
    ctx.arc(w - 16, y, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Crisp white Sony OEM flex silkscreen designation legends
  ctx.fillStyle = 'rgba(255, 255, 255, 0.90)';
  ctx.font = 'bold 26px ui-monospace, monospace';
  ctx.fillText('SONY  VF-FPC · LCD902 / ES-1008', 48, 72);
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('JK-1028 / MIS-2006  >PI<  LF  100Ω', 48, 108);
  ctx.fillText('▲ PIN 1     240Hz SUB-LVDS / MIPI', 48, h - 36);
  return toHiTex(canvas);
}

/** E55 / E16: Silver-Ink Hatched EMI-Shielded 240Hz MIPI-DSI Flex Jacket Texture */
function createEvfMipiShieldMeshTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Matte anthracite silver-paste conductive laminate
  ctx.fillStyle = '#202630';
  ctx.fillRect(0, 0, w, h);

  // Diagonal micro-hatched metallic silver-ink EMI Faraday shielding mesh
  ctx.strokeStyle = 'rgba(186, 200, 218, 0.34)';
  ctx.lineWidth = 2.2;
  for (let i = -h; i < w + h; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.moveTo(i + h, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
  }

  // Left & right laser-ablated conductive adhesive ground-via stitching strips
  ctx.fillStyle = '#cbd5e1';
  for (let y = 26; y <= h - 26; y += 26) {
    ctx.beginPath();
    ctx.arc(24, y, 5.5, 0, Math.PI * 2);
    ctx.arc(w - 24, y, 5.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(46, 0, 6, h);
  ctx.fillRect(w - 52, 0, 6, h);

  // Crisp metallic silver technical stencil
  ctx.fillStyle = 'rgba(226, 232, 240, 0.78)';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.fillText('EMI-SHD  Ag-MESH  Zdiff=100Ω ±5%', 76, 76);
  ctx.font = 'bold 19px ui-monospace, monospace';
  ctx.fillText('240Hz MIPI-DSI  FERRITE FILTERED', 76, h - 52);
  drawMicroGrain(ctx, w, h, 2000, 3107, 0.05);
  return toHiTex(canvas);
}

/** E35 / E17: Authentic Sony OEM 4-575-780-01 VF SHEET, RADIATION (795) Blue Thermal Pad + Coral-Pink Strip */
function createEvfVfRadiationSheetTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Signature Sony sky-blue high-k silicone thermal radiation pad
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#4ea3d8');
  bg.addColorStop(0.5, '#62b5e6');
  bg.addColorStop(1, '#3d91c7');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Authentic Sony coral-pink thermal-border lower edge strip (4-575-780-01!)
  const pinkY = h - 108;
  const pGrad = ctx.createLinearGradient(0, pinkY, w, h);
  pGrad.addColorStop(0, '#f472b6');
  pGrad.addColorStop(0.5, '#fb7185');
  pGrad.addColorStop(1, '#ec4899');
  ctx.fillStyle = pGrad;
  ctx.fillRect(0, pinkY, w, 108);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.fillRect(0, pinkY - 3, w, 5);

  // Subtle silicone micro-embossed anti-air-bubble diamond grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 1.4;
  for (let i = -h; i < w + h; i += 28) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.moveTo(i + h, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
  }

  // Faint Sony OEM service-part identification stencil & alignment fiducials
  ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.font = 'bold 28px ui-monospace, monospace';
  ctx.fillText('SONY  4-575-780-01', 48, 72);
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('VF SHEET, RADIATION (795) · 8.0 W/m·K', 48, 108);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
  ctx.fillText('ANTI-ADHESION BORDER · REF.203', 48, h - 42);
  drawMicroGrain(ctx, w, h, 2600, 3108, 0.045);
  return toHiTex(canvas);
}

/** E07 / E04: Canon/Flagship 307K-Pixel (640x480) 850nm NIR Line-of-Sight Gaze CMOS Sensor Die */
function createEvfGazeNirDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  // Deep ruby-indigo NIR-enhanced BSI silicon base
  ctx.fillStyle = '#120a1c';
  ctx.fillRect(0, 0, w, h);

  // Peripheral optical-black & readout logic frame
  const mx = 74;
  const my = 58;
  ctx.fillStyle = '#1f1630';
  ctx.fillRect(14, 14, w - 28, h - 28);

  // Active 640x480 (307K-px) NIR photodiode matrix with subtle 850nm crimson-violet diffraction sheen
  const act = ctx.createLinearGradient(mx, my, w - mx, h - my);
  act.addColorStop(0.0, '#2e1036');
  act.addColorStop(0.35, '#7f1d4e');
  act.addColorStop(0.65, '#3b1c63');
  act.addColorStop(1.0, '#1e1038');
  ctx.fillStyle = act;
  ctx.fillRect(mx, my, w - mx * 2, h - my * 2);

  // Fine pixel readout matrix lines & Purkinje-centroid calibration crosshairs
  ctx.strokeStyle = 'rgba(251, 113, 133, 0.24)';
  ctx.lineWidth = 1.2;
  for (let x = mx; x <= w - mx; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, my);
    ctx.lineTo(x, h - my);
    ctx.stroke();
  }
  for (let y = my; y <= h - my; y += 20) {
    ctx.beginPath();
    ctx.moveTo(mx, y);
    ctx.lineTo(w - mx, y);
    ctx.stroke();
  }

  // Optical-black light shield border + perimeter gold wire-bond pads
  ctx.strokeStyle = '#fb7185';
  ctx.lineWidth = 3;
  ctx.strokeRect(mx, my, w - mx * 2, h - my * 2);

  ctx.fillStyle = '#facc15';
  for (let x = 64; x <= w - 64; x += 22) {
    ctx.fillRect(x - 5, 16, 10, 14);
    ctx.fillRect(x - 5, h - 30, 10, 14);
  }
  for (let y = 54; y <= h - 54; y += 22) {
    ctx.fillRect(16, y - 5, 14, 10);
    ctx.fillRect(w - 30, y - 5, 14, 10);
  }

  // 4-corner silicon alignment targets
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 2;
  for (const [fx, fy] of [
    [42, 36],
    [w - 42, 36],
    [42, h - 36],
    [w - 42, h - 36],
  ]) {
    ctx.strokeRect(fx - 7, fy - 7, 14, 14);
  }
  return toHiTex(canvas);
}

/** E12 / E37: Sony CV DIOPTER ADJUST DIAL (500367201) Circular Spun-Black Cap with Laser - / 0 / + Scale */
function createEvfDiopterDialCapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);
  const cx = w * 0.5;
  const cy = h * 0.5;
  // Satin anodized aluminum radial spun cap base
  const radG = ctx.createRadialGradient(cx, cy, 12, cx, cy, 250);
  radG.addColorStop(0, '#272c35');
  radG.addColorStop(0.55, '#191d24');
  radG.addColorStop(0.88, '#2b313c');
  radG.addColorStop(1, '#14171d');
  ctx.fillStyle = radG;
  ctx.fillRect(0, 0, w, h);

  // Fine concentric lathe-turned metallic sheen rings
  for (let r = 26; r <= 238; r += 6) {
    ctx.strokeStyle = r % 12 === 0 ? 'rgba(255,255,255,0.065)' : 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Crisp white laser-engraved diopter adjustment scale arc (-4.0 .. 0 .. +3.0 m^-1)
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 178, -Math.PI * 0.78, -Math.PI * 0.22);
  ctx.stroke();

  // Graduated tick marks along upper arc
  for (let i = -4; i <= 4; i++) {
    const a = -Math.PI * 0.5 + i * 0.22;
    const r0 = i === 0 ? 156 : 164;
    const r1 = 186;
    ctx.strokeStyle = i === 0 ? '#38bdf8' : '#e2e8f0';
    ctx.lineWidth = i === 0 ? 6 : 3;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
    ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.stroke();
  }

  // Bold white engraved "-" (left) and "+" (right) optical diopter symbols + top zero triangle
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(88, cy - 8, 56, 16); // "-" symbol
  ctx.fillRect(w - 144, cy - 8, 56, 16); // "+" horizontal
  ctx.fillRect(w - 124, cy - 28, 16, 56); // "+" vertical

  // Zero-diopter index triangle pip at 12 o'clock
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(cx, 92);
  ctx.lineTo(cx - 18, 126);
  ctx.lineTo(cx + 18, 126);
  ctx.closePath();
  ctx.fill();

  // Recessed central service screw bezel ring
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, 56, 0, Math.PI * 2);
  ctx.stroke();
  return toHiTex(canvas);
}

/** E32 / E01: Sony OEM FINDER COVER (89100) (A5038709A) Matte GF-PC Pebble Grain & Cavity Mold Marks */
function createEvfFinderCoverMoldTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  ctx.fillStyle = '#252931';
  ctx.fillRect(0, 0, w, h);

  // VDI-27 fine camera-body polycarbonate pebble grain
  drawMicroGrain(ctx, w, h, 5200, 3111, 0.065);

  // Subtle molded labyrinth boundary steps & mold ejector pin witness rings
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, w - 48, h - 48);
  for (const [ex, ey] of [
    [68, 68],
    [w - 68, 68],
    [68, h - 68],
    [w - 68, h - 68],
  ]) {
    ctx.beginPath();
    ctx.arc(ex, ey, 16, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Authentic Sony internal plastic mold cavity stencil
  ctx.fillStyle = 'rgba(203, 213, 225, 0.34)';
  ctx.font = 'bold 26px ui-monospace, monospace';
  ctx.fillText('SONY  89100  >PC-GF20<', 56, 72);
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('A5038709A · CAV-2 · FDA-EP19/21', 56, h - 48);
  return toHiTex(canvas);
}

/** E28 / E51: Chemical Photo-Etched Precision Optical Calibration Shim (0.01 / 0.02 / 0.05 mm) */
function createEvfShimEtchedBrassTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#c2922c');
  bg.addColorStop(0.45, '#e8be58');
  bg.addColorStop(0.75, '#cca038');
  bg.addColorStop(1, '#a97d22');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 180, 3112, 0.06, 0.06);

  // Chemical half-etched optical datum circles & calibration thickness callouts
  ctx.strokeStyle = 'rgba(69, 26, 3, 0.45)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, 210, 0, Math.PI * 2);
  ctx.arc(w * 0.5, h * 0.5, 164, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(69, 26, 3, 0.72)';
  ctx.font = 'bold 30px ui-monospace, monospace';
  ctx.fillText('t=0.02mm  OPT-SHIM  ±2μm', 58, 72);
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.fillText('C2680-H · EYE-AF / G2-G4', 58, h - 48);
  return toHiTex(canvas);
}

/** E29: Close-Packed 3A Synthetic Zeolite Molecular-Sieve Desiccant Spherical Bead Bed (256px seamless tile) */
function createEvfZeoliteBeadBedTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#6b6456';
  ctx.fillRect(0, 0, s, s);

  const rng = mulberry32(3113);
  const step = 28;
  for (let row = -1; row <= s / (step * 0.866) + 1; row++) {
    for (let col = -1; col <= s / step + 1; col++) {
      const cx = col * step + (row % 2 === 0 ? 0 : step * 0.5) + (rng() - 0.5) * 3;
      const cy = row * step * 0.866 + (rng() - 0.5) * 3;
      const r = 12.2 + rng() * 1.8;
      // Spherical ceramic zeolite 3A bead with warm specular highlight & ambient-occlusion rim
      const g = ctx.createRadialGradient(cx - r * 0.32, cy - r * 0.32, 1.5, cx, cy, r);
      g.addColorStop(0.0, '#fbf8f0');
      g.addColorStop(0.45, '#e8dfd0');
      g.addColorStop(0.82, '#bfb39e');
      g.addColorStop(1.0, '#6e6556');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  drawMicroGrain(ctx, s, s, 900, 3114, 0.05);
  return toTileTex(canvas, 2, 3);
}

/** E30 / E04: V(lambda) Ambient Light & Color-Temperature RGB+Clear 4-Quadrant Photodiode IC Die */
function createEvfAmbientRgbDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  // Outer metallic Al light-shield guard frame
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 10;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // 4 distinct optical interference filter photodiode quadrants: Red, Green, Blue, Clear/V(lambda)
  const quads: Array<[number, number, string, string, string]> = [
    [48, 48, '#dc2626', '#fca5a5', 'R'],
    [268, 48, '#10b981', '#6ee7b7', 'G'],
    [48, 268, '#2563eb', '#93c5fd', 'B'],
    [268, 268, '#e2e8f0', '#ffffff', 'C/Vλ'],
  ];
  for (const [qx, qy, fill, hi, label] of quads) {
    const qg = ctx.createLinearGradient(qx, qy, qx + 196, qy + 196);
    qg.addColorStop(0, hi);
    qg.addColorStop(0.4, fill);
    qg.addColorStop(1, '#0f172a');
    ctx.fillStyle = qg;
    ctx.fillRect(qx, qy, 196, 196);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 4;
    ctx.strokeRect(qx, qy, 196, 196);
    // Fine interdigitated photodiode finger grid
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1.6;
    for (let i = 14; i < 190; i += 14) {
      ctx.beginPath();
      ctx.moveTo(qx + i, qy + 8);
      ctx.lineTo(qx + i, qy + 188);
      ctx.stroke();
    }
    ctx.fillStyle = label === 'C/Vλ' ? '#0f172a' : '#f8fafc';
    ctx.font = 'bold 42px ui-monospace, monospace';
    ctx.fillText(label, qx + 20, qy + 62);
  }

  // Perimeter gold bond pads
  ctx.fillStyle = '#facc15';
  for (let i = 72; i <= w - 72; i += 44) {
    ctx.fillRect(i - 8, 6, 16, 12);
    ctx.fillRect(i - 8, h - 18, 16, 12);
  }
  return toHiTex(canvas);
}

// =============================================================================
// PHASE 30: SENSOR MANUFACTURING PROCESS (VOL.0) PROCEDURAL PBR TEXTURES
// =============================================================================

function createFabWafer300mmDieMapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const R = w * 0.485;

  // Iridescent monocrystalline 300mm silicon wafer base
  const bg = ctx.createRadialGradient(cx - 90, cy - 110, 30, cx, cy, R);
  bg.addColorStop(0, '#1e3a5f');
  bg.addColorStop(0.32, '#0f4c5c');
  bg.addColorStop(0.62, '#1d2d62');
  bg.addColorStop(0.88, '#132238');
  bg.addColorStop(1, '#0b1220');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Diagonal diffraction sheen across full-frame reticle array
  const sheen = ctx.createLinearGradient(0, 0, w, h);
  sheen.addColorStop(0.0, 'rgba(34, 211, 238, 0.28)');
  sheen.addColorStop(0.28, 'rgba(59, 130, 246, 0.24)');
  sheen.addColorStop(0.55, 'rgba(139, 92, 246, 0.26)');
  sheen.addColorStop(0.82, 'rgba(16, 185, 129, 0.28)');
  sheen.addColorStop(1.0, 'rgba(14, 165, 233, 0.22)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);

  // 36x24mm Full-Frame Sensor Dies tiled across 300mm wafer (~42 complete dies!)
  const dieW = 92;
  const dieH = 62;
  const gap = 8;
  const stepX = dieW + gap;
  const stepY = dieH + gap;

  for (let row = -5; row <= 5; row++) {
    for (let col = -4; col <= 4; col++) {
      const dx = cx + col * stepX - dieW * 0.5;
      const dy = cy + row * stepY - dieH * 0.5;
      const corners = [
        [dx, dy],
        [dx + dieW, dy],
        [dx, dy + dieH],
        [dx + dieW, dy + dieH],
      ];
      const maxDist = Math.max(...corners.map(([x, y]) => Math.hypot(x - cx, y - cy)));
      if (maxDist > R - 18) continue;

      // Active 3:2 photodiode imaging area with micro-rainbow hue shift
      const hue = 175 + ((col * 17 + row * 23 + 360) % 95);
      const dieGrad = ctx.createLinearGradient(dx, dy, dx + dieW, dy + dieH);
      dieGrad.addColorStop(0, `hsla(${hue}, 74%, 40%, 0.92)`);
      dieGrad.addColorStop(0.5, `hsla(${(hue + 38) % 360}, 68%, 34%, 0.92)`);
      dieGrad.addColorStop(1, `hsla(${(hue + 72) % 360}, 72%, 38%, 0.92)`);
      ctx.fillStyle = dieGrad;
      ctx.fillRect(dx + 4, dy + 4, dieW - 8, dieH - 8);

      // Optical black & peripheral logic readout collar
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.55)';
      ctx.lineWidth = 1.6;
      ctx.strokeRect(dx + 1, dy + 1, dieW - 2, dieH - 2);

      // Gold perimeter bond pad ticks along top/bottom of each die
      ctx.fillStyle = '#eab308';
      for (let px = dx + 8; px < dx + dieW - 8; px += 8) {
        ctx.fillRect(px, dy + 1.5, 4, 2.5);
        ctx.fillRect(px, dy + dieH - 4, 4, 2.5);
      }

      // Column ADC vertical stripe dividers inside active die
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.24)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      for (let s = 1; s < 4; s++) {
        const sx = dx + 4 + ((dieW - 8) / 4) * s;
        ctx.moveTo(sx, dy + 4);
        ctx.lineTo(sx, dy + dieH - 4);
      }
      ctx.stroke();
    }
  }

  // Scribe-street alignment fiducials & outer exclusion bevel ring
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.42)';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(cx, cy, R - 10, 0, Math.PI * 2);
  ctx.stroke();

  // Bottom crystal orientation V-notch indicator
  ctx.fillStyle = '#090d16';
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy + R - 2);
  ctx.lineTo(cx, cy + R - 24);
  ctx.lineTo(cx + 14, cy + R - 2);
  ctx.closePath();
  ctx.fill();

  return toHiTex(canvas);
}

function createFabQuartzReticleMaskTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Dark chrome absorber frame on synthetic fused quartz
  ctx.fillStyle = '#181d26';
  ctx.fillRect(0, 0, w, h);

  // Pellicle silver mounting border
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 10;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  // Central translucent quartz exposure field (4x magnified full-frame 3:2 reticle)
  const fx = 92;
  const fy = 148;
  const fw = w - 184;
  const fh = h - 296;
  const qGrad = ctx.createLinearGradient(fx, fy, fx + fw, fy + fh);
  qGrad.addColorStop(0, '#bae6fd');
  qGrad.addColorStop(0.5, '#e0f2fe');
  qGrad.addColorStop(1, '#c7d2fe');
  ctx.fillStyle = qGrad;
  ctx.fillRect(fx, fy, fw, fh);

  // Micro-etched Cr/MoSi OPC circuit pattern inside quartz window
  ctx.fillStyle = '#1e293b';
  for (let y = fy + 16; y < fy + fh - 16; y += 22) {
    for (let x = fx + 16; x < fx + fw - 16; x += 28) {
      ctx.fillRect(x, y, 18, 12);
      // OPC corner serif squares
      ctx.fillRect(x - 2, y - 2, 4, 4);
      ctx.fillRect(x + 16, y + 10, 4, 4);
    }
  }

  // Peripheral column-ADC & SLVS-EC mask strips
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(fx, fy, fw, 26);
  ctx.fillRect(fx, fy + fh - 26, fw, 26);
  ctx.fillStyle = '#38bdf8';
  for (let x = fx + 14; x < fx + fw - 14; x += 18) {
    ctx.fillRect(x, fy + 6, 8, 14);
    ctx.fillRect(x, fy + fh - 20, 8, 14);
  }

  // Corner optical alignment vernier crosshairs
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  for (const [ax, ay] of [
    [66, 118],
    [w - 66, 118],
    [66, h - 118],
    [w - 66, h - 118],
  ]) {
    ctx.beginPath();
    ctx.moveTo(ax - 16, ay);
    ctx.lineTo(ax + 16, ay);
    ctx.moveTo(ax, ay - 16);
    ctx.lineTo(ax, ay + 16);
    ctx.stroke();
    ctx.strokeRect(ax - 9, ay - 9, 18, 18);
  }

  // Top & bottom laser reticle barcode bands
  ctx.fillStyle = '#cbd5e1';
  const rng = mulberry32(3002);
  for (let x = 140; x < w - 140; x += 10) {
    const bw = rng() > 0.45 ? 5 : 2;
    ctx.fillRect(x, 64, bw, 32);
    ctx.fillRect(x, h - 96, bw, 32);
  }

  return toHiTex(canvas);
}

function createFabCleanroomProcessDeckTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Satin white-aluminum ISO Class-1 cleanroom floor deck
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#f1f5f9');
  bg.addColorStop(0.5, '#e6ecf5');
  bg.addColorStop(1, '#dce4f0');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Cleanroom HEPA perforated raised-floor tile grid
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.22)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let x = 0; x <= w; x += 48) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0; y <= h; y += 48) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();

  // Subtle airflow vent micro-dots on floor tiles
  ctx.fillStyle = 'rgba(71, 85, 105, 0.16)';
  for (let y = 24; y < h; y += 48) {
    for (let x = 24; x < w; x += 48) {
      ctx.fillRect(x - 3, y - 3, 6, 6);
    }
  }

  // Dual-Track Parallel Fab Flow Guide Lanes (Pixel Wafer cyan + Logic Wafer royal-blue merging at center -> gold-amber downstream!)
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Upper track: P1 -> P3 -> P4 -> P6 (Pixel Wafer)
  ctx.strokeStyle = '#0ea5e9';
  ctx.beginPath();
  ctx.moveTo(64, 384);
  ctx.lineTo(185, 290);
  ctx.lineTo(310, 290);
  ctx.lineTo(372, 384);
  ctx.stroke();

  // Lower track: P1 -> P5 -> P6 (Parallel Logic Wafer — 720 steps)
  ctx.strokeStyle = '#2563eb';
  ctx.beginPath();
  ctx.moveTo(64, 384);
  ctx.lineTo(240, 515);
  ctx.lineTo(372, 384);
  ctx.stroke();

  // Downstream merged track: P6 -> P7 -> P8 -> P9 -> P10 -> P11 -> P12
  ctx.strokeStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(372, 384);
  ctx.lineTo(706, 384);
  ctx.lineTo(706, 585);
  ctx.lineTo(540, 595);
  ctx.stroke();

  // Photomask feed dashes from P2
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 5;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.moveTo(160, 140);
  ctx.lineTo(185, 290);
  ctx.moveTo(160, 140);
  ctx.lineTo(310, 290);
  ctx.moveTo(160, 140);
  ctx.lineTo(240, 515);
  ctx.stroke();
  ctx.setLineDash([]);

  // 5-stage 180-day (6-month) T1..T5 progress bar bands along bottom edge
  const bandColors = ['#64748b', '#0ea5e9', '#8b5cf6', '#d97706', '#059669'];
  const bandW = (w - 80) / 5;
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = bandColors[i];
    ctx.fillRect(40 + i * bandW + 4, h - 42, bandW - 8, 16);
  }

  // Outer anodized framing border
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  return toHiTex(canvas);
}

function createFabWaferBinningMapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const R = w * 0.475;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  // Outer wafer metallic edge
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();

  // EMVA 1288 CP Wafer Probe Yield / Binning Map across 36x24mm dies
  const dieW = 84;
  const dieH = 56;
  const gap = 8;
  const stepX = dieW + gap;
  const stepY = dieH + gap;
  const rng = mulberry32(1288);

  for (let row = -5; row <= 5; row++) {
    for (let col = -4; col <= 4; col++) {
      const dx = cx + col * stepX - dieW * 0.5;
      const dy = cy + row * stepY - dieH * 0.5;
      const dist = Math.hypot(dx + dieW * 0.5 - cx, dy + dieH * 0.5 - cy);
      if (dist > R - 52) continue;

      const roll = rng();
      // Center dies have higher Grade-A yield; edge dies show realistic defect roll-off
      const edgePenalty = dist / R;
      let fill = '#10b981'; // Pass Standard (Emerald)
      if (roll < 0.08 + edgePenalty * 0.14) {
        fill = '#ef4444'; // Defect / Reject (Crimson)
      } else if (roll < 0.24 + edgePenalty * 0.12) {
        fill = '#f59e0b'; // Bin-B Optical Spec (Amber)
      } else if (dist < R * 0.58 && roll > 0.55) {
        fill = '#06b6d4'; // Flagship Grade-A Low-Dark-Current (Cyan)
      }

      ctx.fillStyle = fill;
      ctx.fillRect(dx, dy, dieW, dieH);

      // Probe needle contact mark grid inside each tested die
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(dx + 2, dy + 2, dieW - 4, dieH - 4);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
      for (let px = dx + 10; px < dx + dieW - 10; px += 12) {
        ctx.fillRect(px, dy + 5, 4, 3);
        ctx.fillRect(px, dy + dieH - 8, 4, 3);
      }
    }
  }

  // Probe target reticle ring around active center test die
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 4;
  ctx.strokeRect(cx - dieW * 0.5 - 4, cy - dieH * 0.5 - 4, dieW + 8, dieH + 8);

  return toHiTex(canvas);
}

// =============================================================================
// PHASE 31: SENSOR MANUFACTURING PROCESS (VOL.1) PROCEDURAL PBR TEXTURES
// =============================================================================

/** Vol.1 4-Chapter Architectural Exhibition Floor (Ch.1 Photonics, Ch.2 6-Arch, Ch.3 Sony vs Canon, Ch.4 Exposure Wall) */
function createFab1ArchExhibitionDeckTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Crisp studio ceramic-white cleanroom plinth surface
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#f8fafc');
  bg.addColorStop(0.5, '#f1f5f9');
  bg.addColorStop(1, '#e8eef5');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Fine CAD 1mm-style orthographic floor grid
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.14)';
  ctx.lineWidth = 1.2;
  for (let x = 0; x <= w; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // 4 Color-Coded Chapter Zone Pads (matching Row 3 Rear, Row 2 Mid, Row 1 Front)
  // Zone 2 (Top / Rear Z=-20): 6 Major Architectures Gallery (Royal Blue tint)
  ctx.fillStyle = 'rgba(37, 99, 235, 0.08)';
  ctx.fillRect(36, 28, w - 72, 186);
  ctx.strokeStyle = 'rgba(37, 99, 235, 0.36)';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 28, w - 72, 186);

  // Zone 3 (Middle-Left/Center Z=-3): Sony vs Canon AF & GS Duel (Violet tint)
  ctx.fillStyle = 'rgba(124, 58, 237, 0.075)';
  ctx.fillRect(36, 240, 444, 214);
  ctx.strokeStyle = 'rgba(124, 58, 237, 0.34)';
  ctx.strokeRect(36, 240, 444, 214);

  // Zone 4 (Middle-Right Z=-3): Exposure Wall & Scanners (Amber tint)
  ctx.fillStyle = 'rgba(217, 119, 6, 0.085)';
  ctx.fillRect(502, 240, w - 538, 214);
  ctx.strokeStyle = 'rgba(217, 119, 6, 0.42)';
  ctx.strokeRect(502, 240, w - 538, 214);

  // Zone 1 (Front-Left Z=+12): 5-Step Light-to-Photo & 4T-PPD (Sky Cyan tint)
  ctx.fillStyle = 'rgba(14, 165, 233, 0.085)';
  ctx.fillRect(36, 482, 468, 248);
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.42)';
  ctx.strokeRect(36, 482, 468, 248);

  // Zone 3B (Front-Right Z=+12): 3 Global Shutter Architectures (Indigo-Teal tint)
  ctx.fillStyle = 'rgba(79, 70, 229, 0.085)';
  ctx.fillRect(524, 482, w - 560, 248);
  ctx.strokeStyle = 'rgba(79, 70, 229, 0.40)';
  ctx.strokeRect(524, 482, w - 560, 248);

  // Clean signal bus traces etched into floor connecting stations
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.55)';
  ctx.beginPath();
  ctx.moveTo(64, 606);
  ctx.lineTo(480, 606);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(37, 99, 235, 0.50)';
  ctx.beginPath();
  ctx.moveTo(76, 122);
  ctx.lineTo(w - 76, 122);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(217, 119, 6, 0.55)';
  ctx.beginPath();
  ctx.moveTo(532, 348);
  ctx.lineTo(w - 58, 348);
  ctx.stroke();

  // Outer perimeter technical hairline bezel
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, w - 24, h - 24);

  return toHiTex(canvas);
}

/** Shared helper for 300mm wafer die-count & 10-particle yield comparison textures (Vol.1 Ch.4) */
function drawVol1WaferYieldCanvas(
  dieW: number,
  dieH: number,
  gap: number,
  seed: number,
  defectCount: number,
  accentA: string,
  accentB: string
): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const R = w * 0.482;
  const usableR = R * 0.945; // 3mm edge-exclusion margin on 300mm wafer

  // Monocrystalline silicon wafer substrate gradient
  const bg = ctx.createRadialGradient(cx - 80, cy - 90, 25, cx, cy, R);
  bg.addColorStop(0, '#1e3a5f');
  bg.addColorStop(0.55, '#132744');
  bg.addColorStop(1, '#0b1324');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle 3mm edge-exclusion ring (amber dashed)
  ctx.save();
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.52)';
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 7]);
  ctx.beginPath();
  ctx.arc(cx, cy, usableR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Generate exact complete dies inside usableR
  const stepX = dieW + gap;
  const stepY = dieH + gap;
  const maxC = Math.ceil(usableR / stepX) + 1;
  const maxR = Math.ceil(usableR / stepY) + 1;
  const dies: Array<{ x: number; y: number }> = [];

  for (let r = -maxR; r <= maxR; r++) {
    for (let c = -maxC; c <= maxC; c++) {
      const dx = cx + c * stepX - dieW * 0.5;
      const dy = cy + r * stepY - dieH * 0.5;
      const corners = [
        [dx, dy],
        [dx + dieW, dy],
        [dx, dy + dieH],
        [dx + dieW, dy + dieH],
      ];
      const allInside = corners.every(([px, py]) => Math.hypot(px - cx, py - cy) <= usableR);
      if (allInside) dies.push({ x: dx, y: dy });
    }
  }

  // Deterministic 10-particle dust defect hits distributed across usable area
  const rng = mulberry32(seed);
  const hitSet = new Set<number>();
  const dustPts: Array<{ px: number; py: number }> = [];
  for (let k = 0; k < defectCount && dies.length > 0; k++) {
    const idx = Math.floor(rng() * dies.length);
    hitSet.add(idx);
    const d = dies[idx];
    dustPts.push({
      px: d.x + dieW * (0.25 + rng() * 0.5),
      py: d.y + dieH * (0.25 + rng() * 0.5),
    });
  }

  // Draw all complete dies: iridescent good vs crimson defect-hit
  for (let i = 0; i < dies.length; i++) {
    const d = dies[i];
    const isBad = hitSet.has(i);
    if (isBad) {
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(d.x, d.y, dieW, dieH);
      ctx.strokeStyle = '#fecaca';
      ctx.lineWidth = Math.max(1.2, Math.min(3.5, dieW * 0.04));
      ctx.strokeRect(d.x + 1, d.y + 1, dieW - 2, dieH - 2);
    } else {
      const dg = ctx.createLinearGradient(d.x, d.y, d.x + dieW, d.y + dieH);
      dg.addColorStop(0, accentA);
      dg.addColorStop(1, accentB);
      ctx.fillStyle = dg;
      ctx.fillRect(d.x, d.y, dieW, dieH);
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.58)';
      ctx.lineWidth = Math.max(0.8, Math.min(2.5, dieW * 0.025));
      ctx.strokeRect(d.x, d.y, dieW, dieH);

      // Active pixel imaging rectangle inside larger dies
      if (dieW >= 32) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
        ctx.fillRect(d.x + dieW * 0.1, d.y + dieH * 0.12, dieW * 0.8, dieH * 0.76);
      }
    }
  }

  // Draw 10 glowing orange-red dust defect impact stars
  for (const pt of dustPts) {
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(pt.px, pt.py, Math.max(4.5, Math.min(9, dieW * 0.12)), 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Standard 300mm wafer orientation V-notch at bottom edge
  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.moveTo(cx - 12, cy + R - 2);
  ctx.lineTo(cx, cy + R - 20);
  ctx.lineTo(cx + 12, cy + R - 2);
  ctx.closePath();
  ctx.fill();

  return toHiTex(canvas);
}

function createFab1WaferSmartphone640Texture(): THREE.CanvasTexture {
  // ~11x9mm scaled onto 768px 300mm disc -> ~25x20px dies (~600+ dies, 10 hits -> ~98% yield!)
  return drawVol1WaferYieldCanvas(24, 19, 3, 3101, 10, '#059669', '#0284c7');
}

function createFab1WaferApsc134Texture(): THREE.CanvasTexture {
  // ~25x17mm scaled onto 768px 300mm disc -> ~56x38px dies (~134 dies, 10 hits -> ~93% yield!)
  return drawVol1WaferYieldCanvas(55, 38, 5, 3102, 10, '#0ea5e9', '#2563eb');
}

function createFab1WaferMediumFormat26Texture(): THREE.CanvasTexture {
  // ~46x35mm scaled onto 768px 300mm disc -> ~106x80px dies (~26 dies, 10 hits -> ~68% yield!)
  return drawVol1WaferYieldCanvas(104, 79, 8, 3103, 10, '#6366f1', '#7c3aed');
}

// =============================================================================
// PHASE 32: SENSOR MANUFACTURING PROCESS VOL.2 (PHASE 1: SAND -> EPI WAFER)
// =============================================================================

function createFab2Phase1PlantDeckTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 512);
  ctx.fillStyle = '#eef2f7';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(15, 23, 42, 0.055)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 24; x < w; x += 24) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 24; y < h; y += 24) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();

  const drawZone = (
    x: number,
    y: number,
    zw: number,
    zh: number,
    fill: string,
    stroke: string,
    accent: string
  ) => {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, zw, zh);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2.4;
    ctx.strokeRect(x, y, zw, zh);
    ctx.fillStyle = accent;
    ctx.fillRect(x, y, zw, 7);
  };

  drawZone(18, 22, 336, 134, 'rgba(234, 88, 12, 0.09)', 'rgba(234, 88, 12, 0.42)', '#ea580c');
  drawZone(368, 22, 382, 134, 'rgba(14, 116, 144, 0.09)', 'rgba(14, 116, 144, 0.42)', '#0e7490');
  drawZone(18, 186, 448, 140, 'rgba(79, 70, 229, 0.09)', 'rgba(79, 70, 229, 0.44)', '#4f46e5');
  drawZone(480, 186, 270, 140, 'rgba(2, 132, 199, 0.09)', 'rgba(2, 132, 199, 0.42)', '#0284c7');
  drawZone(18, 354, 362, 136, 'rgba(5, 150, 105, 0.09)', 'rgba(5, 150, 105, 0.44)', '#059669');
  drawZone(394, 354, 356, 136, 'rgba(192, 38, 211, 0.09)', 'rgba(192, 38, 211, 0.44)', '#c026d3');

  ctx.strokeStyle = 'rgba(15, 23, 42, 0.24)';
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 6]);
  ctx.beginPath();
  ctx.moveTo(46, 90);
  ctx.lineTo(724, 90);
  ctx.lineTo(724, 170);
  ctx.lineTo(44, 170);
  ctx.lineTo(44, 256);
  ctx.lineTo(724, 256);
  ctx.lineTo(724, 338);
  ctx.lineTo(44, 338);
  ctx.lineTo(44, 422);
  ctx.lineTo(724, 422);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = 'rgba(14, 165, 233, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(12, 170);
  ctx.lineTo(w - 12, 170);
  ctx.moveTo(12, 338);
  ctx.lineTo(w - 12, 338);
  ctx.stroke();

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  for (const [cx, cy] of [
    [28, 34],
    [w - 28, 34],
    [28, h - 24],
    [w - 28, h - 24],
  ]) {
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.moveTo(cx - 11, cy);
    ctx.lineTo(cx + 11, cy);
    ctx.moveTo(cx, cy - 11);
    ctx.lineTo(cx, cy + 11);
    ctx.stroke();
  }

  return toHiTex(canvas);
}

function createFab2IngotVgCrystalMapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#1e293b');
  bg.addColorStop(0.5, '#334155');
  bg.addColorStop(1, '#0f172a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  for (let y = 0; y < h; y += 6) {
    const alpha = 0.04 + 0.03 * Math.sin(y * 0.22);
    ctx.fillStyle = `rgba(226, 232, 240, ${alpha.toFixed(3)})`;
    ctx.fillRect(0, y, w, 2);
  }

  const radGrad = ctx.createLinearGradient(0, 0, w, 0);
  radGrad.addColorStop(0.0, 'rgba(56, 189, 248, 0.28)');
  radGrad.addColorStop(0.18, 'rgba(16, 185, 129, 0.42)');
  radGrad.addColorStop(0.5, 'rgba(248, 250, 252, 0.34)');
  radGrad.addColorStop(0.82, 'rgba(16, 185, 129, 0.42)');
  radGrad.addColorStop(1.0, 'rgba(56, 189, 248, 0.28)');
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
  ctx.lineWidth = 2.0;
  for (let y = 44; y < h; y += 54) {
    ctx.beginPath();
    ctx.moveTo(28, y - 16);
    ctx.quadraticCurveTo(w * 0.5, y + 26, w - 28, y - 16);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 32; x < w; x += 32) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  ctx.stroke();

  return toHiTex(canvas);
}

function createFab2LpdDefectMapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const r = w * 0.46;

  ctx.fillStyle = '#070c18';
  ctx.fillRect(0, 0, w, h);

  const disc = ctx.createRadialGradient(cx - 50, cy - 50, 20, cx, cy, r);
  disc.addColorStop(0, '#1e3a5f');
  disc.addColorStop(0.45, '#0f2547');
  disc.addColorStop(0.85, '#0c1a33');
  disc.addColorStop(1, '#1e293b');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = disc;
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.24)';
  ctx.lineWidth = 1.4;
  for (const frac of [0.25, 0.5, 0.75, 0.94]) {
    ctx.beginPath();
    ctx.arc(cx, cy, r * frac, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let a = 0; a < 8; a++) {
    const ang = (a * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
    ctx.stroke();
  }

  const rng = mulberry32(3201);
  for (let i = 0; i < 14; i++) {
    const ang = rng() * Math.PI * 2;
    const rr = Math.sqrt(rng()) * r * 0.88;
    const px = cx + Math.cos(ang) * rr;
    const py = cy + Math.sin(ang) * rr;
    ctx.fillStyle = i < 4 ? '#f43f5e' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(px, py, i < 4 ? 5.2 : 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = i < 4 ? 'rgba(244, 63, 94, 0.65)' : 'rgba(56, 189, 248, 0.55)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.moveTo(cx - 11, cy + r + 2);
  ctx.lineTo(cx, cy + r - 14);
  ctx.lineTo(cx + 11, cy + r + 2);
  ctx.closePath();
  ctx.fill();

  return toHiTex(canvas);
}

function createFab2NanotopoMapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(512, 512);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const r = w * 0.46;

  ctx.fillStyle = '#0b1120';
  ctx.fillRect(0, 0, w, h);

  const fringe = ctx.createRadialGradient(cx + 18, cy - 16, 10, cx, cy, r);
  fringe.addColorStop(0.0, '#10b981');
  fringe.addColorStop(0.22, '#06b6d4');
  fringe.addColorStop(0.42, '#3b82f6');
  fringe.addColorStop(0.62, '#14b8a6');
  fringe.addColorStop(0.80, '#22c55e');
  fringe.addColorStop(0.93, '#eab308');
  fringe.addColorStop(1.0, '#0284c7');

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = fringe;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.34)';
  ctx.lineWidth = 1.6;
  for (let rr = 34; rr < r; rr += 34) {
    ctx.beginPath();
    ctx.arc(cx + 10, cy - 8, rr, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = '#ffffff';
  for (let gx = -3; gx <= 3; gx++) {
    for (let gy = -3; gy <= 3; gy++) {
      const px = cx + gx * 56;
      const py = cy + gy * 56;
      if (Math.hypot(px - cx, py - cy) < r * 0.88) {
        ctx.beginPath();
        ctx.arc(px, py, 3.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.restore();

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#0b1120';
  ctx.beginPath();
  ctx.moveTo(cx - 11, cy + r + 2);
  ctx.lineTo(cx, cy + r - 14);
  ctx.lineTo(cx + 11, cy + r + 2);
  ctx.closePath();
  ctx.fill();

  return toHiTex(canvas);
}

// =============================================================================
// PHASE 33: SENSOR FAB VOL.3 — DESIGN STUDIO & PHOTOMASK FAB PBR TEXTURES
// =============================================================================

function createFab3Phase2StudioDeckTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0f172a');
  bg.addColorStop(0.5, '#131d33');
  bg.addColorStop(1, '#0b1324');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Cleanroom & EDA precision drafting grid
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.10)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Three horizontal EDA lane strips (2-A TCAD, 2-B Layout, 2-C OPC/Verify)
  const lanes: Array<{ y: number; h: number; color: string; title: string; sub: string }> = [
    { y: 54, h: 196, color: '#8b5cf6', title: '2-A  TCAD / OPTICAL FDTD / CRA', sub: 'P02-001 -> P02-010' },
    { y: 286, h: 196, color: '#3b82f6', title: '2-B  ADC / SERDES / 3D Cu-Cu / OASIS', sub: 'P02-011 -> P02-022' },
    { y: 518, h: 196, color: '#f59e0b', title: '2-C  DRC / SINGLE vs STITCH / OPC / 96-LAYER TAPE-OUT', sub: 'P02-023 -> P02-032' },
  ];
  for (const lane of lanes) {
    ctx.fillStyle = `${lane.color}18`;
    ctx.fillRect(28, lane.y, w - 56, lane.h);
    ctx.strokeStyle = `${lane.color}aa`;
    ctx.lineWidth = 3;
    ctx.strokeRect(28, lane.y, w - 56, lane.h);

    ctx.fillStyle = lane.color;
    ctx.fillRect(28, lane.y, w - 56, 8);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(lane.title, 42, lane.y + 30);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(lane.sub, w - 210, lane.y + 30);

    // Subtle directional process chevrons
    ctx.strokeStyle = `${lane.color}66`;
    ctx.lineWidth = 2;
    for (let x = 90; x < w - 80; x += 68) {
      const cy = lane.y + lane.h - 18;
      ctx.beginPath();
      ctx.moveTo(x - 10, cy - 6);
      ctx.lineTo(x, cy);
      ctx.lineTo(x - 10, cy + 6);
      ctx.stroke();
    }
  }

  // Top & bottom reticle ruler strip
  ctx.fillStyle = '#0ea5e9';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('PHASE 2: SENSOR DESIGN & 6-INCH SYNTHETIC QUARTZ RETICLE FAB (50 STEPS / ~96 MASKS)', 30, 34);
  ctx.fillStyle = '#10b981';
  ctx.fillText('LOWER DECK: 2-D QUARTZ BLANKS & 260K MULTI-BEAM EB  |  2-E NANO REPAIR / 0.8um PELLICLE / STOCKER', 30, 748);

  return toHiTex(canvas);
}

function createFab3OpcSerifMaskTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Synthetic quartz transparent deep-blue/teal illuminated background
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#071c2c');
  bg.addColorStop(0.5, '#0c2a3e');
  bg.addColorStop(1, '#081b29');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Sub-nm grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= w; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(w, i);
    ctx.stroke();
  }

  // Repeating MoSi/Cr OPC hammerhead & dog-ear serif geometries
  const drawOpcCell = (ox: number, oy: number) => {
    // Sub-resolution assist features (SRAF scattering bars)
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(ox + 12, oy + 46, 10, 144);
    ctx.fillRect(ox + 214, oy + 46, 10, 144);
    ctx.fillRect(ox + 46, oy + 12, 144, 10);

    // Main L-shaped + gate OPC polygon (distorted with dog-ear serifs & jogs)
    ctx.fillStyle = '#cbd5e1';
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2;
    // Vertical trunk
    ctx.fillRect(ox + 56, oy + 52, 42, 134);
    // Horizontal bar
    ctx.fillRect(ox + 56, oy + 144, 128, 42);
    // Corner dog-ear serifs (outward ears at outer corners)
    const ears: Array<[number, number, number, number]> = [
      [ox + 42, oy + 38, 22, 22],
      [ox + 90, oy + 38, 22, 22],
      [ox + 42, oy + 178, 22, 22],
      [ox + 176, oy + 130, 22, 22],
      [ox + 176, oy + 178, 22, 22],
    ];
    ctx.fillStyle = '#f59e0b';
    for (const [ex, ey, ew, eh] of ears) {
      ctx.fillRect(ex, ey, ew, eh);
    }
    // Inner corner anti-serif notch cut
    ctx.fillStyle = '#0c2a3e';
    ctx.fillRect(ox + 92, oy + 138, 16, 16);

    // Target printed wafer contour (crisp rounded rectangle in luminous cyan)
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(ox + 62, oy + 58);
    ctx.lineTo(ox + 92, oy + 58);
    ctx.lineTo(ox + 92, oy + 150);
    ctx.lineTo(ox + 178, oy + 150);
    ctx.lineTo(ox + 178, oy + 180);
    ctx.lineTo(ox + 62, oy + 180);
    ctx.closePath();
    ctx.stroke();

    // Isolated square contact with 4 hammerhead serifs
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(ox + 132, oy + 62, 46, 46);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(ox + 122, oy + 52, 18, 18);
    ctx.fillRect(ox + 170, oy + 52, 18, 18);
    ctx.fillRect(ox + 122, oy + 100, 18, 18);
    ctx.fillRect(ox + 170, oy + 100, 18, 18);
    ctx.strokeStyle = '#22d3ee';
    ctx.strokeRect(ox + 137, oy + 67, 36, 36);
  };

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      drawOpcCell(24 + c * 244, 24 + r * 244);
    }
  }

  return toHiTex(canvas);
}

function createFab3StitchVsSingleReticleTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#0b1120';
  ctx.fillRect(0, 0, w, h);

  // Outer chrome light-shield border
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 18;
  ctx.strokeRect(18, 18, w - 36, h - 36);

  // Left half: Single-Shot Full-Frame Reticle (36x24mm seamless)
  ctx.fillStyle = '#0c2742';
  ctx.fillRect(46, 78, 316, 610);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 4;
  ctx.strokeRect(46, 78, 316, 610);

  // Seamless pixel grid inside single-shot
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
  ctx.lineWidth = 1;
  for (let x = 66; x < 358; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 128);
    ctx.lineTo(x, 646);
    ctx.stroke();
  }
  for (let y = 128; y < 646; y += 20) {
    ctx.beginPath();
    ctx.moveTo(58, y);
    ctx.lineTo(352, y);
    ctx.stroke();
  }
  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('SINGLE-SHOT (1x)', 74, 112);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('36x24mm SEAMLESS', 86, 672);

  // Right half: 3-Shot Stitching Reticle (LEFT | CENTER | RIGHT + overlap seam bands)
  ctx.fillStyle = '#24180b';
  ctx.fillRect(406, 78, 316, 610);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.strokeRect(406, 78, 316, 610);

  const blocks = [
    { y: 128, bh: 158, col: 'rgba(245, 158, 11, 0.22)', lbl: 'SHOT A: LEFT BLOCK' },
    { y: 304, bh: 158, col: 'rgba(251, 146, 60, 0.24)', lbl: 'SHOT B: CENTER PIXELS' },
    { y: 480, bh: 158, col: 'rgba(234, 88, 12, 0.22)', lbl: 'SHOT C: RIGHT BLOCK' },
  ];
  for (const b of blocks) {
    ctx.fillStyle = b.col;
    ctx.fillRect(422, b.y, 284, b.bh);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(422, b.y, 284, b.bh);
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 15px monospace';
    ctx.fillText(b.lbl, 444, b.y + 84);
  }
  // Highlight two glowing stitching overlap dose-gradient seams
  for (const sy of [295, 471]) {
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(418, sy - 6, 292, 12);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('OVERLAP DOSE GRADIENT SEAM', 456, sy + 4);
  }
  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('STITCHING (2-3x)', 432, 112);
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('26x33mm FIELD SPLIT', 442, 672);

  // Corner fiducial alignment crosses
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 3;
  for (const [fx, fy] of [
    [46, 48],
    [722, 48],
    [46, 720],
    [722, 720],
  ]) {
    ctx.beginPath();
    ctx.moveTo(fx - 12, fy);
    ctx.lineTo(fx + 12, fy);
    ctx.moveTo(fx, fy - 12);
    ctx.lineTo(fx, fy + 12);
    ctx.stroke();
  }

  return toHiTex(canvas);
}

function createFab3ChipLayoutOasisTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#090f1d';
  ctx.fillRect(0, 0, w, h);

  // Copper seal / guard ring wall
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 14;
  ctx.strokeRect(24, 24, w - 48, h - 48);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, w - 80, h - 80);

  // Peripheral bonding pads & SLVS-EC SerDes macros (top & bottom)
  for (let x = 76; x <= w - 92; x += 26) {
    ctx.fillStyle = '#facc15';
    ctx.fillRect(x, 54, 16, 22);
    ctx.fillRect(x, h - 76, 16, 22);
  }

  // Dual-edge Column-Parallel ADC & Logic bands
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(58, 92, w - 116, 62);
  ctx.fillRect(58, h - 154, w - 116, 62);
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 1.5;
  for (let x = 66; x < w - 66; x += 14) {
    ctx.beginPath();
    ctx.moveTo(x, 94);
    ctx.lineTo(x, 152);
    ctx.moveTo(x, h - 152);
    ctx.lineTo(x, h - 94);
    ctx.stroke();
  }

  // Left/Right Row Driver & Timing Gen vertical macros
  ctx.fillStyle = '#312e81';
  ctx.fillRect(58, 166, 56, h - 332);
  ctx.fillRect(w - 114, 166, 56, h - 332);

  // Optical Black (OB) + Dummy Pixel dark shield frame around 36x24mm active area
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(126, 166, w - 252, h - 332);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  ctx.strokeRect(126, 166, w - 252, h - 332);

  // Central Active Full-Frame Pixel Array (36x24mm Bayer iridescent mosaic)
  const ax = 158;
  const ay = 198;
  const aw = w - 316;
  const ah = h - 396;
  const grad = ctx.createLinearGradient(ax, ay, ax + aw, ay + ah);
  grad.addColorStop(0, '#0ea5e9');
  grad.addColorStop(0.35, '#10b981');
  grad.addColorStop(0.7, '#6366f1');
  grad.addColorStop(1, '#ec4899');
  ctx.fillStyle = grad;
  ctx.fillRect(ax, ay, aw, ah);

  // Micro Bayer pixel cells
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.lineWidth = 1;
  for (let x = ax; x <= ax + aw; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, ay);
    ctx.lineTo(x, ay + ah);
    ctx.stroke();
  }
  for (let y = ay; y <= ay + ah; y += 16) {
    ctx.beginPath();
    ctx.moveTo(ax, y);
    ctx.lineTo(ax + aw, y);
    ctx.stroke();
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('FULL-FRAME 36x24mm PIXEL ARRAY', 202, 392);
  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('OB + DUMMY BORDER', 310, 187);
  ctx.fillText('14-BIT COLUMN ADC / SLVS-EC 12.5Gbps', 236, 128);
  ctx.fillText('3D Cu-Cu HYBRID BOND PAD MATRIX', 252, h - 118);

  return toHiTex(canvas);
}

function createFab3MaskCdMapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // 6-inch synthetic quartz chrome border
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 14;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // CD-SEM 2D uniformity contour grid (CDU 1-3nm 3-sigma)
  const gx = 76;
  const gy = 76;
  const cell = 38;
  const cols = 16;
  const rows = 16;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c - 7.5) / 7.5;
      const dy = (r - 7.5) / 7.5;
      const val = Math.sin(dx * 2.1) * 0.35 + Math.cos(dy * 2.3) * 0.35 + (dx * dx + dy * dy) * 0.25;
      const hue = Math.max(130, Math.min(220, 178 - val * 42));
      ctx.fillStyle = `hsl(${hue}, 78%, 42%)`;
      ctx.fillRect(gx + c * cell + 2, gy + r * cell + 2, cell - 4, cell - 4);

      // KLA IPRO registration tiny vector arrow per site
      const cx = gx + c * cell + cell * 0.5;
      const cy = gy + r * cell + cell * 0.5;
      const vx = dx * 8 + Math.sin(r) * 2;
      const vy = dy * 8 + Math.cos(c) * 2;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + vx, cy + vy);
      ctx.stroke();
    }
  }

  // Mask barcode & telemetry header
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 17px monospace';
  ctx.fillText('6" RETICLE CD-SEM & IPRO MAP  |  CDU 1.4nm (3s)  |  REG < 2.0nm', 52, 58);
  for (let i = 0; i < 34; i++) {
    ctx.fillStyle = i % 3 === 0 ? '#f8fafc' : '#94a3b8';
    ctx.fillRect(84 + i * 18, 704, i % 2 === 0 ? 10 : 5, 24);
  }

  return toHiTex(canvas);
}

function createFab3BossungWindowMapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#09111f';
  ctx.fillRect(0, 0, w, h);

  // Coordinate axes (Focus vs CD & Dose)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
  ctx.lineWidth = 1.2;
  for (let x = 84; x <= 684; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 84);
    ctx.lineTo(x, 664);
    ctx.stroke();
  }
  for (let y = 84; y <= 664; y += 58) {
    ctx.beginPath();
    ctx.moveTo(84, y);
    ctx.lineTo(684, y);
    ctx.stroke();
  }

  // Safe target CD tolerance band (±10%)
  ctx.fillStyle = 'rgba(16, 185, 129, 0.14)';
  ctx.fillRect(84, 270, 600, 196);
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([10, 6]);
  ctx.beginPath();
  ctx.moveTo(84, 270);
  ctx.lineTo(684, 270);
  ctx.moveTo(84, 466);
  ctx.lineTo(684, 466);
  ctx.stroke();
  ctx.setLineDash([]);

  // Bossung Smile Curves across 7 exposure doses
  const colors = ['#f43f5e', '#fb923c', '#facc15', '#38bdf8', '#22d3ee', '#818cf8', '#c084fc'];
  for (let d = 0; d < 7; d++) {
    const k = (d - 3) * 0.48;
    const baseY = 368 + (d - 3) * 42;
    ctx.strokeStyle = colors[d];
    ctx.lineWidth = d === 3 ? 4.5 : 3;
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const t = (i / 60) * 2 - 1; // -1..+1 focus
      const x = 84 + i * 10;
      const y = baseY - k * t * t * 115;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Inscribed Process Window (DOF x EL) green rectangle
  ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
  ctx.fillRect(244, 286, 280, 164);
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 4;
  ctx.strokeRect(244, 286, 280, 164);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('LRC BOSSUNG PROCESS WINDOW (FOCUS vs DOSE +/-5%)', 86, 56);
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('SAFE PROCESS WINDOW (DOF / EL)', 256, 374);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('DEFOCUS (-nm)   <----   BEST FOCUS   ---->   DEFOCUS (+nm)', 116, 712);

  return toHiTex(canvas);
}

// =============================================================================
// PHASE 35: STANDALONE MICROPHONE 110-PART (MC01-MC110) ULTRA-HD PBR TEXTURES
// =============================================================================

/** MC09/MC36/MC98: Sony OEM MIC HOLDER (89100) 502790401 30% Glass-Filled Polycarbonate (>PC-GF30<) */
function createMicOemHolderResinTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#1e232c');
  g.addColorStop(0.5, '#252b36');
  g.addColorStop(1, '#1a1e26');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Authentic glass-fiber directional injection-molding micro-streaks + fine EDM matte grain
  drawBrushedStreaks(ctx, w, h, false, 480, 3401, 0.036, 0.042);
  drawMicroGrain(ctx, w, h, 5200, 3402, 0.034);

  // Subtle recessed mold cavity panel outline & circular ejector-pin witness rings
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.24)';
  ctx.lineWidth = 3;
  ctx.strokeRect(42, 42, w - 84, h - 84);
  for (const [ex, ey] of [
    [118, 128],
    [w - 118, 128],
    [118, h - 128],
    [w - 118, h - 128],
  ]) {
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.32)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ex, ey, 26, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(9, 13, 20, 0.55)';
    ctx.beginPath();
    ctx.arc(ex, ey, 22, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Embossed Sony ILCE-7M4 OEM Service Manual molded cavity legends (Ref.308 / 502790401!)
  ctx.fillStyle = 'rgba(203, 213, 225, 0.56)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 44px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('SONY  89100', w * 0.5, 250);
  ctx.font = '700 32px "Courier New", monospace';
  ctx.fillText('502790401  >PC-GF30<', w * 0.5, 340);
  ctx.font = '700 24px "Courier New", monospace';
  ctx.fillStyle = 'rgba(148, 163, 184, 0.48)';
  ctx.fillText('MIC HOLDER (89100)  •  CAV-2  •  JAPAN', w * 0.5, 420);

  // Molded manufacturing date-wheel dial icon
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.42)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(w * 0.5, 558, 46, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.5 + Math.cos(a) * 32, 558 + Math.sin(a) * 32);
    ctx.lineTo(w * 0.5 + Math.cos(a) * 44, 558 + Math.sin(a) * 44);
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(203, 213, 225, 0.62)';
  ctx.font = '700 22px "Courier New", monospace';
  ctx.fillText('26', w * 0.5, 558);

  return toHiTex(canvas);
}

/** MC11/MC04/MC21: Sony OEM TAPE (631S #25) Teraoka Matte-Black Woven Acetate/Polyester Light-Trap Cloth Tape */
function createMicTeraoka631sTapeTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#0d1015';
  ctx.fillRect(0, 0, s, s);

  // Tight plain-weave matte black acetate fabric threads (32 threads across 256 px -> seamless!)
  const p = 8;
  for (let y = 0; y < s; y += p) {
    for (let x = 0; x < s; x += p) {
      const over = (((x / p) + (y / p)) & 1) === 0;
      ctx.fillStyle = over ? '#1e242e' : '#141820';
      ctx.fillRect(x, y + 1, p, 5.5);
      ctx.fillStyle = over ? '#151922' : '#232935';
      ctx.fillRect(x + 1, y, 5.5, p);
      ctx.fillStyle = over ? 'rgba(148, 163, 184, 0.14)' : 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(x + 1.5, y + 2.2, 4.5, 2.0);
    }
  }
  drawMicroGrain(ctx, s, s, 1400, 3404, 0.03);
  return toTileTex(canvas, 4, 4);
}

/** MC15/MC16/MC18/MC44/MC46/MC47/MC87/MC88: Monocrystalline <100> Silicon Backplate & DRIE Honeycomb Die */
function createMicDrieSiliconBackplateTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;

  // Deep iridescent monocrystalline <100> silicon substrate with gold guard rings
  const bg = ctx.createRadialGradient(cx, cy, 18, cx, cy, w * 0.58);
  bg.addColorStop(0, '#1e293b');
  bg.addColorStop(0.45, '#172554');
  bg.addColorStop(0.8, '#0f172a');
  bg.addColorStop(1, '#090d16');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Dense hexagonal honeycomb acoustic ventilation micro-perforations + Si3N4 anti-stiction dimple dots
  const hexR = 26;
  const dx = hexR * 1.5;
  const dy = hexR * Math.sqrt(3);
  for (let col = -1; col < w / dx + 2; col++) {
    for (let row = -1; row < h / dy + 2; row++) {
      const px = col * dx;
      const py = row * dy + ((col & 1) ? dy * 0.5 : 0);
      const dist = Math.hypot(px - cx, py - cy);
      if (dist < 312) {
        // Dark etched acoustic ventilation pore with beveled silicon rim highlight
        ctx.fillStyle = '#030712';
        ctx.beginPath();
        ctx.arc(px, py, 9.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.55)';
        ctx.lineWidth = 2.2;
        ctx.stroke();
        // Tiny amber Si3N4 anti-stiction bump between acoustic pores
        ctx.fillStyle = 'rgba(250, 204, 21, 0.65)';
        ctx.beginPath();
        ctx.arc(px + dx * 0.5, py, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Concentric gold bias & guard electrode rings + wafer scribe alignment crosses
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, 326, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.72)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 344, 0, Math.PI * 2);
  ctx.stroke();

  // Dicing street gold corner fiducials
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 4;
  for (const [fx, fy] of [
    [48, 48],
    [w - 48, 48],
    [48, h - 48],
    [w - 48, h - 48],
  ]) {
    ctx.strokeRect(fx - 20, fy - 20, 40, 40);
    ctx.beginPath();
    ctx.moveTo(fx - 28, fy);
    ctx.lineTo(fx + 28, fy);
    ctx.moveTo(fx, fy - 28);
    ctx.lineTo(fx, fy + 28);
    ctx.stroke();
  }
  drawMicroGrain(ctx, w, h, 2400, 3405, 0.03);
  return toHiTex(canvas);
}

/** MC19/MC50-MC53/MC65/MC84: Infineon 0.13 µm MEMS Mixed-Signal Readout ASIC Bare Silicon Die Floorplan */
function createMicMemsAsicDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#0c1324';
  ctx.fillRect(0, 0, w, h);

  // Fine copper/gold M4-M6 metal routing grid
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.18)';
  ctx.lineWidth = 1.6;
  for (let i = 28; i < w; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 28);
    ctx.lineTo(i, h - 28);
    ctx.moveTo(28, i);
    ctx.lineTo(w - 28, i);
    ctx.stroke();
  }

  // Block 1 (Top): 6-Stage 12V Dickson MIM Charge Pump Capacitor Ladder
  ctx.fillStyle = '#312009';
  ctx.fillRect(46, 48, 676, 178);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3.2;
  ctx.strokeRect(46, 48, 676, 178);
  for (let i = 0; i < 6; i++) {
    const bx = 66 + i * 106;
    ctx.fillStyle = i % 2 === 0 ? '#ca8a04' : '#b45309';
    ctx.fillRect(bx, 102, 86, 104);
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2;
    ctx.strokeRect(bx + 6, 108, 74, 92);
  }
  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 22px ui-monospace, monospace';
  ctx.fillText('12V DICKSON MIM CHARGE PUMP (6-STAGE)', 66, 84);

  // Block 2 (Mid-Left): >100 GΩ Back-to-Back PMOS Pseudo-Resistor & Chopper LNA
  ctx.fillStyle = '#0c2b44';
  ctx.fillRect(46, 250, 326, 232);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3.2;
  ctx.strokeRect(46, 250, 326, 232);
  ctx.fillStyle = '#bae6fd';
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('CHOPPER LNA + 100GΩ', 64, 286);
  // Common-centroid interdigitated diff-pair finger layout
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 12; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#0ea5e9' : '#14b8a6';
      ctx.fillRect(68 + c * 23, 308 + r * 25, 16, 18);
    }
  }

  // Block 3 (Mid-Right): 2026 399 µW 114.3 dB Companding VCO-ADC & 5th-Order ΣΔ PDM
  ctx.fillStyle = '#251445';
  ctx.fillRect(396, 250, 326, 232);
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 3.2;
  ctx.strokeRect(396, 250, 326, 232);
  ctx.fillStyle = '#f3e8ff';
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('399µW 114.3dB VCO-ΣΔ', 414, 286);
  // Twin ring-oscillator multi-phase circles (HSNR + HDR channels!)
  for (const [rx, col] of [
    [492, '#38bdf8'],
    [626, '#f43f5e'],
  ] as const) {
    ctx.strokeStyle = col;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(rx, 386, 48, 0, Math.PI * 2);
    ctx.stroke();
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(rx + Math.cos(a) * 48, 386 + Math.sin(a) * 48, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Block 4 (Bottom): Bandgap, LDO, OTP Trim & Single-Bit PDM Shaper
  ctx.fillStyle = '#0e2c24';
  ctx.fillRect(46, 506, 676, 212);
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3.2;
  ctx.strokeRect(46, 506, 676, 212);
  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 22px ui-monospace, monospace';
  ctx.fillText('BANDGAP  •  5th-ORDER PDM SHAPER  •  OTP TRIM', 68, 546);
  const rng = mulberry32(3406);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 18; c++) {
      ctx.fillStyle = rng() > 0.5 ? '#10b981' : '#0284c7';
      ctx.globalAlpha = 0.5 + rng() * 0.45;
      ctx.fillRect(68 + c * 35, 572 + r * 32, 26, 22);
    }
  }
  ctx.globalAlpha = 1.0;

  // Perimeter ENIG gold wirebond pad ring
  ctx.fillStyle = '#facc15';
  for (let p = 52; p <= w - 52; p += 32) {
    ctx.fillRect(p - 8, 8, 16, 18);
    ctx.fillRect(p - 8, h - 26, 16, 18);
    ctx.fillRect(8, p - 8, 18, 16);
    ctx.fillRect(w - 26, p - 8, 18, 16);
  }
  return toHiTex(canvas);
}

/** MC20/MC32/MC49/MC90: Multi-Layer Ceramic / BT-Resin MEMS LGA Package Substrate */
function createMicCeramicLgaSubstrateTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Deep pine-emerald BT/ceramic laminate substrate
  ctx.fillStyle = '#0d3627';
  ctx.fillRect(0, 0, w, h);
  // Fine fiberglass weave grid
  ctx.strokeStyle = 'rgba(22, 101, 68, 0.28)';
  ctx.lineWidth = 2;
  for (let i = 0; i < w; i += 14) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.moveTo(0, i);
    ctx.lineTo(w, i);
    ctx.stroke();
  }

  // Continuous outer ENIG gold Faraday lid-sealing solder ring!
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 28;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Left MEMS acoustic port gold seal ring & inner cavity bore outline
  ctx.strokeStyle = '#f5d061';
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(248, h * 0.5, 134, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#071c15';
  ctx.beginPath();
  ctx.arc(248, h * 0.5, 118, 0, Math.PI * 2);
  ctx.fill();

  // Right ASIC silver-epoxy die-attach pad & ENIG gold wirebond fingers
  ctx.fillStyle = '#14533a';
  ctx.fillRect(434, 178, 224, 412);
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 4;
  ctx.strokeRect(434, 178, 224, 412);
  ctx.fillStyle = '#facc15';
  for (let y = 196; y <= 556; y += 44) {
    ctx.fillRect(674, y, 42, 22);
    ctx.fillRect(386, y, 36, 20);
  }

  // Stitched ground vias & LGA pinout silkscreen
  for (let i = 96; i <= w - 96; i += 48) {
    for (const vy of [74, h - 74]) {
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(i, vy, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#062016';
      ctx.beginPath();
      ctx.arc(i, vy, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.fillStyle = 'rgba(248, 250, 252, 0.88)';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.fillText('LLGA-5 CERAMIC SUB  •  VDD GND OUT CLK L/R', 84, 126);
  ctx.fillStyle = '#fde047';
  ctx.fillText('Au φ20µm WIREBOND PAD RING', 194, h - 108);

  return toHiTex(canvas);
}

/** MC21/MC26/MC92/MC94/MC99: Crimped Spun-Aluminum ECM Faraday Can & CNC Turned Metal Micro-Grooves */
function createMicEcmSpunAluminumTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  const g = ctx.createLinearGradient(0, 0, 0, s);
  g.addColorStop(0, '#c8d1dc');
  g.addColorStop(0.25, '#e6edf5');
  g.addColorStop(0.5, '#b6c1ce');
  g.addColorStop(0.75, '#dce4ee');
  g.addColorStop(1, '#c8d1dc');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);

  // Fine circumferential lathe/spinning micro-grooves
  const rng = mulberry32(3408);
  for (let y = 0; y < s; y += 2) {
    const v = rng();
    ctx.fillStyle = v > 0.5 ? `rgba(255,255,255,${(0.06 + v * 0.14).toFixed(3)})` : `rgba(30,41,59,${(0.05 + v * 0.12).toFixed(3)})`;
    ctx.fillRect(0, y, s, 1.1);
  }
  drawMicroGrain(ctx, s, s, 900, 3409, 0.024);
  return toTileTex(canvas, 3, 2);
}

/** MC22/MC23/MC63/MC64/MC67/MC69/MC97: CNC-Turned C3604 Perforated Brass Backplate & Electret Gold Mirror */
function createMicEcmBrassBackplateTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;

  const rg = ctx.createRadialGradient(cx, cy, 16, cx, cy, w * 0.52);
  rg.addColorStop(0, '#f6d679');
  rg.addColorStop(0.35, '#dfb046');
  rg.addColorStop(0.72, '#c8952e');
  rg.addColorStop(1, '#8f6518');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, w, h);

  // Fine concentric CNC lathe-turned brass grooves
  const rng = mulberry32(3410);
  for (let r = 12; r < w * 0.52; r += 4) {
    ctx.strokeStyle = rng() > 0.5 ? 'rgba(255, 248, 220, 0.22)' : 'rgba(92, 60, 12, 0.20)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Radial brushed specular glint sectors + perimeter laser spot-weld calibration ticks
  ctx.strokeStyle = 'rgba(254, 249, 195, 0.52)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 342, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * 342, cy + Math.sin(a) * 342, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  // Micro-etched C3604 / FEP electret specification ring
  ctx.fillStyle = 'rgba(66, 32, 6, 0.72)';
  ctx.font = 'bold 22px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('C3604 BRASS • 25µm PTFE GAP • CORONA FEP -250V', cx, 108);

  return toHiTex(canvas);
}

/** MC28-MC31/MC38-MC40/MC59/MC72-MC77/MC80/MC102/MC106-MC109: Sony Audio Subsystem Matte-Emerald HDI PCB */
function createMicAudioMainPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic Sony dark studio-emerald audio soldermask (distinct from battery BMS PCB!)
  ctx.fillStyle = '#093827';
  ctx.fillRect(0, 0, w, h);

  // Subtle woven FR-4 prepreg grid + heavy copper ground-pour zone tint
  ctx.strokeStyle = 'rgba(16, 120, 82, 0.24)';
  ctx.lineWidth = 2;
  for (let i = 0; i < w; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.moveTo(0, i);
    ctx.lineTo(w, i);
    ctx.stroke();
  }

  // Impedance-matched differential audio pair copper traces (light emerald beneath soldermask)
  ctx.strokeStyle = '#136b4b';
  ctx.lineWidth = 8;
  for (const offset of [-190, -162, -74, -46, 46, 74, 162, 190]) {
    ctx.beginPath();
    ctx.moveTo(56, h * 0.5 + offset);
    ctx.lineTo(240, h * 0.5 + offset);
    ctx.lineTo(296, h * 0.5 + offset * 0.65);
    ctx.lineTo(472, h * 0.5 + offset * 0.65);
    ctx.lineTo(528, h * 0.5 + offset);
    ctx.lineTo(w - 56, h * 0.5 + offset);
    ctx.stroke();
  }

  // Perimeter stitched Faraday AGND via fence (ENIG gold rings with drilled dark barrels)
  for (let p = 52; p <= w - 52; p += 38) {
    for (const [vx, vy] of [
      [p, 34],
      [p, h - 34],
      [34, p],
      [w - 34, p],
    ]) {
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(vx, vy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#041a12';
      ctx.beginPath();
      ctx.arc(vx, vy, 3.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Gold audio calibration test points (TP_L+, TP_R+, TP_BIAS, AGND)
  for (const [tx, ty, lbl] of [
    [106, 108, 'TP_L+'],
    [w - 106, 108, 'TP_R+'],
    [106, h - 108, 'MICBIAS'],
    [w - 106, h - 108, 'AGND'],
  ] as const) {
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(tx, ty, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = 'rgba(241, 245, 249, 0.90)';
    ctx.font = 'bold 18px ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(lbl, tx, ty + 36);
  }

  // Crisp white Sony audio PCB silkscreen legend & fiducial markers
  ctx.fillStyle = 'rgba(248, 250, 252, 0.90)';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SONY  AU-1035  •  24/32-BIT AUDIO HDI', w * 0.5, 86);
  ctx.font = 'bold 18px ui-monospace, monospace';
  ctx.fillStyle = 'rgba(167, 243, 208, 0.85)';
  ctx.fillText('BLM15HD EMI  •  C0G/NP0  •  2.8V MICBIAS  •  STAR AGND', w * 0.5, h - 76);

  return toHiTex(canvas);
}

/** MC29/MC30/MC31/MC37-MC40/MC59/MC72-MC77/MC80/MC85/MC101/MC105/MC107/MC109: AKM/Sony Audio Codec & DSP QFN Laser Lid */
function createMicCodecQfnPackageTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic matte silica-filled black epoxy molding compound (EMC)
  ctx.fillStyle = '#181b21';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 9500, 3412, 0.048);

  // Subtle molded chamfer bevel border
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.24)';
  ctx.lineWidth = 6;
  ctx.strokeRect(26, 26, w - 52, h - 52);

  // Crisp Pin-1 laser-ablated circular index crater (top-left)
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(98, 98, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(98, 98, 16, 0, Math.PI * 2);
  ctx.fill();

  // Authentic laser-etched AKM / Sony Audio Codec IC marking
  ctx.fillStyle = 'rgba(226, 232, 240, 0.86)';
  ctx.textAlign = 'left';
  ctx.font = '800 56px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('AKM', 164, 186);
  ctx.font = '700 44px "Courier New", monospace';
  ctx.fillText('AK5704VN', 164, 268);
  ctx.font = '700 32px "Courier New", monospace';
  ctx.fillStyle = 'rgba(148, 163, 184, 0.85)';
  ctx.fillText('32-BIT AUDIO PGA', 164, 336);
  ctx.fillText('24.576M  115dB DR', 164, 392);
  ctx.fillText('2642  K4A  JAPAN', 164, 448);

  // ECC-200 2D laser lot DataMatrix on lower right
  drawDataMatrix(ctx, 514, 512, 168, 14, 'rgba(226, 232, 240, 0.78)', null, 3414);

  // Subtle molded circular ejector mark on lower left
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(138, 608, 42, 0, Math.PI * 2);
  ctx.stroke();

  return toHiTex(canvas);
}

/** MC48/MC71: Analog-Audio Star-Ground Copper Island & Milled FR-4 Isolation Moat PCB */
function createMicStarGroundPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;

  // Outer digital ground PCB surround
  ctx.fillStyle = '#093827';
  ctx.fillRect(0, 0, w, h);

  // Deep milled air-gap/FR-4 isolation moat trench separating AGND from DGND!
  ctx.strokeStyle = '#060a0f';
  ctx.lineWidth = 44;
  ctx.strokeRect(118, 118, w - 236, h - 236);
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 4;
  ctx.strokeRect(140, 140, w - 280, h - 280);

  // Single narrow 0-ohm star tie-bridge crossing moat at bottom center (ZERO ground loop!)
  ctx.fillStyle = '#eab308';
  ctx.fillRect(cx - 32, h - 144, 64, 88);
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 3;
  ctx.strokeRect(cx - 26, h - 138, 52, 76);

  // Inner isolated heavy-copper analog ground island with 8 radial ENIG gold star-ground spokes
  ctx.fillStyle = '#0e4933';
  ctx.fillRect(144, 144, w - 288, h - 288);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * 210, cy + Math.sin(a) * 210);
    ctx.stroke();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * 210, cy + Math.sin(a) * 210, 16, 0, Math.PI * 2);
    ctx.fill();
  }
  // Central zero-loop star-ground ENIG hub
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(cx, cy, 62, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 26px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ISOLATED STAR-AGND MOAT • ZERO LOOP', cx, 66);
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 22px ui-monospace, monospace';
  ctx.fillText('AGND', cx, cy + 7);
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('SINGLE 0Ω TIE', cx, h - 36);

  return toHiTex(canvas);
}

/** MC30/MC31/MC32/MC61/MC62/MC101/MC104: 2026 BIONZ XR2 AI Audio NPU, MVDR & Dereverb Bare Silicon Die */
function createMicAiNpuDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0f1029');
  bg.addColorStop(0.5, '#1b1442');
  bg.addColorStop(1, '#0b182e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Fine copper/violet BEOL interconnect bus grid
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.22)';
  ctx.lineWidth = 1.6;
  for (let i = 24; i < w; i += 24) {
    ctx.beginPath();
    ctx.moveTo(i, 24);
    ctx.lineTo(i, h - 24);
    ctx.moveTo(24, i);
    ctx.lineTo(w - 24, i);
    ctx.stroke();
  }

  // 3x3 Systolic Transformer Attention & AI Voice Separation Core Tiles
  const rng = mulberry32(3416);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const tx = 58 + c * 226;
      const ty = 92 + r * 174;
      ctx.fillStyle = (r + c) % 2 === 0 ? '#1e1b4b' : '#132a46';
      ctx.fillRect(tx, ty, 202, 150);
      ctx.strokeStyle = (r + c) % 2 === 0 ? '#a855f7' : '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(tx, ty, 202, 150);
      // Sub-tile neural MAC grid
      for (let sr = 0; sr < 4; sr++) {
        for (let sc = 0; sc < 6; sc++) {
          const v = rng();
          ctx.fillStyle = v > 0.66 ? '#f59e0b' : v > 0.33 ? '#38bdf8' : '#a855f7';
          ctx.globalAlpha = 0.42 + v * 0.5;
          ctx.fillRect(tx + 12 + sc * 30, ty + 14 + sr * 31, 22, 22);
        }
      }
      ctx.globalAlpha = 1.0;
    }
  }

  // Bottom STFT / MVDR / 3-Stem Voice-Wind-Ambience SRAM Bank
  ctx.fillStyle = '#0e293b';
  ctx.fillRect(58, 622, 652, 92);
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 3;
  ctx.strokeRect(58, 622, 652, 92);
  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BIONZ XR2 AUDIO NPU • AI NOISE CUT • DEREVERB', w * 0.5, 56);
  ctx.fillStyle = '#67e8f9';
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('STFT 512-PT • MVDR NULL STEER • 3-STEM TRANSFORMER', w * 0.5, 676);

  // Perimeter gold micro-bump pad ring
  ctx.fillStyle = '#facc15';
  for (let p = 52; p <= w - 52; p += 26) {
    ctx.fillRect(p - 6, 8, 12, 16);
    ctx.fillRect(p - 6, h - 24, 12, 16);
    ctx.fillRect(8, p - 6, 16, 12);
    ctx.fillRect(w - 24, p - 6, 16, 12);
  }
  return toHiTex(canvas);
}

/** MC35/MC75: Sony Multi-Interface (MI) Shoe 21-Pin Digital Audio Bus (MIS-2006) Flex & Pinout */
function createMicMiShoeDigitalFlexTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#9c4e0c');
  g.addColorStop(0.5, '#c26b17');
  g.addColorStop(1, '#823f08');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // 21 Authentic Sony Multi-Interface Shoe gold contact fingers across top edge!
  const pinW = 24;
  const startX = 48;
  for (let i = 0; i < 21; i++) {
    const px = startX + i * 32.5;
    // Copper trace feeding each pin vertically down trunk
    ctx.strokeStyle = i >= 7 && i <= 12 ? '#fef08a' : '#5e2806';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(px + pinW * 0.5, 164);
    ctx.lineTo(px + pinW * 0.5, h - 80);
    ctx.stroke();

    // Gold plated finger tip
    ctx.fillStyle = '#facc15';
    ctx.fillRect(px, 34, pinW, 136);
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 2;
    ctx.strokeRect(px, 34, pinW, 136);
  }

  // Hatched conductive silver-ink EMI shield jacket over central routing zone
  ctx.fillStyle = 'rgba(148, 163, 184, 0.78)';
  ctx.fillRect(58, 224, w - 116, 360);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(58, 224, w - 116, 360);

  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.font = '800 40px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('SONY  MIS-2006  21-PIN', w * 0.5, 316);
  ctx.font = '700 26px ui-monospace, monospace';
  ctx.fillText('I2S 24-BIT / 48kHz  4CH DIGITAL BUS', w * 0.5, 382);
  ctx.fillText('ID1-3 • MIC_L/R • +3.1V • XLR-K3M +48V', w * 0.5, 444);
  ctx.fillStyle = '#1e3a8a';
  ctx.font = '700 22px ui-monospace, monospace';
  ctx.fillText('BCLK / LRCLK / SDATA0-1 / PGND', w * 0.5, 512);

  // Bottom board-to-board mezzanine gold pad row
  ctx.fillStyle = '#facc15';
  for (let i = 0; i < 16; i++) {
    ctx.fillRect(72 + i * 40, h - 98, 24, 62);
  }

  return toHiTex(canvas);
}

/** MC56/MC86: 2026 Sc0.1Al0.9N Rotating-Sector Cantilever Piezoelectric MEMS & AlN PMUT Die */
function createMicScAlnPiezoDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;

  // Iridescent sputtered Mo/Sc0.1Al0.9N/Mo piezoelectric wafer
  const rg = ctx.createRadialGradient(cx, cy, 12, cx, cy, w * 0.56);
  rg.addColorStop(0, '#0d9488');
  rg.addColorStop(0.35, '#0284c7');
  rg.addColorStop(0.68, '#4f46e5');
  rg.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, w, h);

  // 8 Rotating-sector triangular cantilever release slits + Mo/Au sense electrodes
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const aMid = a + Math.PI / 8;
    // Deep DRIE release slit separating adjacent piezoelectric cantilevers
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * 32, cy + Math.sin(a) * 32);
    ctx.lineTo(cx + Math.cos(a) * 316, cy + Math.sin(a) * 316);
    ctx.stroke();

    // Sputtered gold top sense electrode wedge on each ScAlN sector
    ctx.fillStyle = 'rgba(250, 204, 21, 0.72)';
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(aMid) * 86, cy + Math.sin(aMid) * 86);
    ctx.lineTo(cx + Math.cos(a + 0.14) * 282, cy + Math.sin(a + 0.14) * 282);
    ctx.lineTo(cx + Math.cos(a + Math.PI / 4 - 0.14) * 282, cy + Math.sin(a + Math.PI / 4 - 0.14) * 282);
    ctx.closePath();
    ctx.fill();
  }

  // Concentric stress-concentration trench & perimeter gold collector ring
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 316, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(cx, cy, 344, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 22px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Sc0.1Al0.9N BIMORPH PIEZO • ZERO-BIAS IP68', cx, 52);
  return toHiTex(canvas);
}

/** MC57: Knowles V2S200D / ST LIS25BA Bone-Conduction VPU Accelerometer Comb-Drive SEM Die */
function createMicVpuCombDriveDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, w, h);

  // Outer fixed silicon anchor frame
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 22;
  ctx.strokeRect(32, 32, w - 64, h - 64);

  // Central suspended high-mass silicon/tungsten proof mass with vapor-HF etch-release hole matrix
  ctx.fillStyle = '#334155';
  ctx.fillRect(210, 148, 348, 472);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 5;
  ctx.strokeRect(210, 148, 348, 472);
  for (let y = 178; y <= 590; y += 36) {
    for (let x = 238; x <= 530; x += 36) {
      ctx.fillStyle = '#030712';
      ctx.fillRect(x, y, 16, 16);
    }
  }

  // Dense interdigitated capacitive comb-drive sense fingers on left and right flanks!
  for (let y = 158; y <= 596; y += 22) {
    // Rotor fingers attached to proof mass (gold)
    ctx.fillStyle = '#eab308';
    ctx.fillRect(96, y, 114, 7);
    ctx.fillRect(558, y, 114, 7);
    // Stator fingers attached to outer frame (cyan)
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(54, y + 10, 118, 7);
    ctx.fillRect(596, y + 10, 118, 7);
  }

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('V2S200D / LIS25BA  •  VPU COMB-DRIVE MEMS', w * 0.5, 92);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('SEISMIC PROOF MASS • TDM BONE-CONDUCTION', w * 0.5, h - 76);

  return toHiTex(canvas);
}

/** MC60/MC95/MC100: Sony ECM-B1M / ECM-M1 8-Capsule Digital Beamforming Faceplate */
function createMic8CapsuleArrayFaceTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#181c24';
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 360, 3420, 0.045, 0.05);
  drawMicroGrain(ctx, w, h, 3800, 3421, 0.03);

  // CNC chamfered perimeter border + acoustic phase-spacing scale ruler (d = 12.0 mm)
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.42)';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  // 4x2 Endfire micro-capsule acoustic grille target circles with phase-delay ticks
  for (let c = 0; c < 4; c++) {
    const px = 132 + c * 168;
    for (const py of [256, 512]) {
      ctx.fillStyle = '#090d14';
      ctx.beginPath();
      ctx.arc(px, py, 64, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(px, py, 74, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Center gold phase-delay axis & Sony ECM-M1 / ECM-B1M directivity dial icons
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(64, h * 0.5);
  ctx.lineTo(w - 64, h * 0.5);
  ctx.stroke();

  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 28px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SONY  ECM-B1M / ECM-M1  •  8-CAPSULE BEAMFORM', w * 0.5, 92);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('SUPER-DIR  •  UNI  •  OMNI  •  ULTRA-DIR  •  F+R  •  STEREO', w * 0.5, h - 72);

  return toHiTex(canvas);
}

/** MC29/MC76/MC108: NDK NX3225GA / SiTime 24.576 MHz Seam-Welded Gold-Lid Audio Master Oscillator */
function createMicQuartzTcxoLidTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#c9972c');
  g.addColorStop(0.32, '#f6d878');
  g.addColorStop(0.65, '#cfa035');
  g.addColorStop(1, '#a97b1c');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 480, 3424, 0.085, 0.075);

  // Seam-welded Kovar outer bevel border & Pin-1 corner chamfer triangle
  ctx.strokeStyle = 'rgba(66, 32, 6, 0.72)';
  ctx.lineWidth = 14;
  ctx.strokeRect(24, 24, w - 48, h - 48);
  ctx.strokeStyle = 'rgba(254, 249, 195, 0.65)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, w - 80, h - 80);

  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.moveTo(46, 46);
  ctx.lineTo(138, 46);
  ctx.lineTo(46, 138);
  ctx.closePath();
  ctx.fill();

  // Crisp laser-etched NDK 24.576 MHz master audio crystal marking
  ctx.fillStyle = 'rgba(24, 20, 14, 0.90)';
  ctx.textAlign = 'center';
  ctx.font = '800 54px "Courier New", monospace';
  ctx.fillText('NDK  24.576M', w * 0.5, 290);
  ctx.font = '700 36px "Courier New", monospace';
  ctx.fillText('NX3225GA  <1ps', w * 0.5, 386);
  ctx.font = '700 28px "Courier New", monospace';
  ctx.fillText('AT-CUT  •  SS-PDM  •  2642', w * 0.5, 474);

  drawDataMatrix(ctx, w * 0.5 - 56, 540, 112, 10, 'rgba(24, 20, 14, 0.85)', null, 3425);
  return toHiTex(canvas);
}

/** MC103: 2026 <2 ms Lossless 2.4 GHz / UWB Wireless Diversity Receiver RF Shield & Dual Antenna Substrate */
function createMicUwbRfModuleTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // High-frequency Rogers RO4350B pale ivory-slate RF substrate around central nickel-silver shield
  ctx.fillStyle = '#1b2636';
  ctx.fillRect(0, 0, w, h);

  // Central brushed nickel-silver RF Faraday shield can
  const sg = ctx.createLinearGradient(84, 84, w - 84, h - 84);
  sg.addColorStop(0, '#94a3b8');
  sg.addColorStop(0.45, '#d8e1ec');
  sg.addColorStop(0.8, '#8d9bae');
  sg.addColorStop(1, '#bcc7d6');
  ctx.fillStyle = sg;
  ctx.fillRect(88, 128, w - 176, h - 256);
  drawBrushedStreaks(ctx, w, h, true, 320, 3428, 0.06, 0.055);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 8;
  ctx.strokeRect(88, 128, w - 176, h - 256);

  // Twin 50-ohm gold coplanar waveguide feedlines with ground-stitch via fences!
  ctx.fillStyle = '#facc15';
  ctx.fillRect(28, 360, 62, 48);
  ctx.fillRect(w - 90, 360, 62, 48);
  for (let i = 96; i <= w - 96; i += 44) {
    for (const vy of [64, h - 64]) {
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(i, vy, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Crisp laser-etched UWB / 2.4GHz lossless diversity wireless legend
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.font = '800 38px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('UWB + 2.4GHz DIVERSITY', w * 0.5, 254);
  ctx.font = '700 30px ui-monospace, monospace';
  ctx.fillText('<2ms LOSSLESS • 48kHz/24b', w * 0.5, 328);
  ctx.fillText('ANT-A (H)   •   ANT-B (V)', w * 0.5, 404);
  ctx.fillText('FCC ID: AK8-ECMW3  •  6.5-8GHz', w * 0.5, 478);

  drawDataMatrix(ctx, w * 0.5 - 52, 514, 104, 10, '#0f172a', null, 3429);
  return toHiTex(canvas);
}

/** MC78/MC110: 2026 SOFA / MIT KEMAR 3D HRTF Binaural & Ambisonics FOA (W/X/Y/Z) Spherical Harmonics Map */
function createMicBinauralHrtfMapTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const bg = ctx.createRadialGradient(cx, cy, 16, cx, cy, w * 0.58);
  bg.addColorStop(0, '#0f2942');
  bg.addColorStop(0.55, '#0b162c');
  bg.addColorStop(1, '#040914');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Concentric azimuth/elevation HRIR polar measurement reticle rings
  for (const [r, col] of [
    [92, 'rgba(56, 189, 248, 0.55)'],
    [176, 'rgba(56, 189, 248, 0.42)'],
    [260, 'rgba(250, 204, 21, 0.45)'],
    [336, 'rgba(192, 132, 252, 0.52)'],
  ] as const) {
    ctx.strokeStyle = col;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  // 12 radial azimuth degree spokes (every 30 deg)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * 336, cy + Math.sin(a) * 336);
    ctx.stroke();
  }

  // First-Order Ambisonics X/Y figure-8 lobes & binaural ITD/ILD acoustic waves
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy - 115, 115, 0, Math.PI * 2);
  ctx.arc(cx, cy + 115, 115, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(cx - 115, cy, 115, 0, Math.PI * 2);
  ctx.arc(cx + 115, cy, 115, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SOFA HRTF / FOA (W·X·Y·Z) 3D SPATIAL MATRIX', cx, 52);
  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('ITD 0.65ms • ILD >4kHz • PINNA NOTCH 6-9kHz', cx, h - 42);

  return toHiTex(canvas);
}

/** MC77/MC79/MC105/MC109: ITU-R BS.1770-5 -14/-24 LUFS K-Weighted Loudness, LTC & EVF Anomaly Telemetry Panel */
function createMicLufsMeterDisplayTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#090e1a';
  ctx.fillRect(0, 0, w, h);

  // Subtle calibration graticule
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
  ctx.lineWidth = 1.6;
  for (let i = 48; i < w; i += 48) {
    ctx.beginPath();
    ctx.moveTo(i, 48);
    ctx.lineTo(i, h - 48);
    ctx.moveTo(48, i);
    ctx.lineTo(w - 48, i);
    ctx.stroke();
  }

  // Top Header: ITU-R BS.1770-5 & SMPTE 12M Timecode Lock Bar
  ctx.fillStyle = '#111d33';
  ctx.fillRect(42, 42, w - 84, 96);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.strokeRect(42, 42, w - 84, 96);
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 28px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ITU-R BS.1770-5  •  -14 / -24 LUFS', w * 0.5, 86);
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 22px ui-monospace, monospace';
  ctx.fillText('TC 01:00:00:00  •  TRUE-PEAK -1.0 dBTP', w * 0.5, 120);

  // Dual Stereo L/R Segmented Broadcast Loudness LED Bars
  const segColors = ['#10b981', '#10b981', '#10b981', '#22c55e', '#22c55e', '#eab308', '#f59e0b', '#ef4444'];
  for (let i = 0; i < 8; i++) {
    const bx = 66 + i * 82;
    ctx.fillStyle = segColors[i];
    ctx.fillRect(bx, 184, 66, 76);
    ctx.fillRect(bx, 286, 66, 76);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 18px ui-monospace, monospace';
    const dbs = ['-48', '-36', '-24', '-18', '-14', '-6', '-3', '-1'];
    ctx.fillText(dbs[i], bx + 33, 394);
  }

  // K-Weighting Pre-Filter Shelf Curve (+4 dB > 1.5 kHz) + RLB High-Pass Graph
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(64, 620);
  ctx.quadraticCurveTo(130, 520, 240, 514);
  ctx.lineTo(420, 514);
  ctx.quadraticCurveTo(510, 456, 700, 450);
  ctx.stroke();

  // Bottom EVF Anomaly Alert Status Pills (OK / WIND / CLIP)
  const pills: Array<[number, string, string]> = [
    [156, '#10b981', 'MIC OK'],
    [384, '#f59e0b', 'WIND HPF'],
    [612, '#ef4444', 'CLIP GUARD'],
  ];
  for (const [px, col, txt] of pills) {
    ctx.fillStyle = col;
    ctx.fillRect(px - 92, 650, 184, 56);
    ctx.fillStyle = '#090e1a';
    ctx.font = 'bold 22px ui-monospace, monospace';
    ctx.fillText(txt, px, 686);
  }

  return toHiTex(canvas);
}

/** MC18/MC89: Bosch DRIE SF6/C4F8 Cyclic Plasma Etched Vertical Silicon Scallop Trench Wall (SEM Texture) */
function createMicBoschScallopSiTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, s, s);

  // 16 cyclic horizontal SF6 isotropic etch / C4F8 passivation scallop troughs (seamless vertical tile!)
  const band = s / 16;
  for (let i = 0; i < 16; i++) {
    const y0 = i * band;
    const g = ctx.createLinearGradient(0, y0, 0, y0 + band);
    g.addColorStop(0, '#94a3b8'); // Sharp bright C4F8 passivation cusp ridge
    g.addColorStop(0.18, '#334155');
    g.addColorStop(0.55, '#0f172a'); // Deep concave SF6 plasma undercut shadow
    g.addColorStop(0.86, '#475569');
    g.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = g;
    ctx.fillRect(0, y0, s, band + 0.5);
  }
  // Subtle vertical plasma grass micro-striations
  drawBrushedStreaks(ctx, s, s, true, 160, 3432, 0.07, 0.06);
  return toTileTex(canvas, 3, 2);
}

/** MC82/MC83: 2026 Silicon Photonics Mach-Zehnder Interferometer (MZI) & SOI Optical Waveguide Die */
function createMicPhotonicMziDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#09152b');
  bg.addColorStop(0.5, '#132448');
  bg.addColorStop(1, '#080e20');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // SOI SiO2 cladding reticle grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
  ctx.lineWidth = 1.5;
  for (let p = 32; p < w; p += 32) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, h);
    ctx.moveTo(0, p);
    ctx.lineTo(w, p);
    ctx.stroke();
  }

  // Twin curved silicon rib Mach-Zehnder waveguide interferometer arms (1550nm cyan/ruby glow!)
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#f43f5e';
  ctx.beginPath();
  ctx.moveTo(46, h * 0.5);
  ctx.lineTo(156, h * 0.5);
  ctx.bezierCurveTo(230, 176, 538, 176, 612, h * 0.5);
  ctx.lineTo(w - 46, h * 0.5);
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(156, h * 0.5);
  ctx.bezierCurveTo(230, h - 176, 538, h - 176, 612, h * 0.5);
  ctx.stroke();

  // 1x2 MMI optical splitter & combiner boxes + sub-wavelength grating couplers
  for (const mx of [138, 594]) {
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(mx, h * 0.5 - 32, 36, 64);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.strokeRect(mx, h * 0.5 - 32, 36, 64);
  }
  // Gold thermo-optic phase tuner heater trace on lower arm
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 8;
  ctx.strokeRect(274, h - 224, 220, 44);

  // Ormia-ochracea inspired dual-wing acoustic strain modulator outline on upper arm
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 5;
  ctx.strokeRect(250, 146, 120, 120);
  ctx.strokeRect(398, 146, 120, 120);

  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SOI Si-PHOTONICS MZI • 1550nm ACOUSTIC MOD', w * 0.5, 62);
  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 20px ui-monospace, monospace';
  ctx.fillText('1x2 MMI SPLITTER • THERMO-OPTIC PHASE BIAS', w * 0.5, h - 46);

  return toHiTex(canvas);
}

/** MC10/MC02/MC34/MC37: Sony OEM BTITE 1.4x5.0 mm (430010611) CNC Micro-Turned Zinc-Nickel Steel Sheen */
function createMicOemScrewSteelTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, '#9aa5b4');
  g.addColorStop(0.3, '#dce4ee');
  g.addColorStop(0.6, '#8793a3');
  g.addColorStop(1, '#c4cedb');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);

  // Fine helical/radial CNC thread-turning lines
  const rng = mulberry32(3436);
  for (let y = 0; y < s; y += 3) {
    ctx.fillStyle = y % 6 === 0 ? 'rgba(255,255,255,0.22)' : 'rgba(15,23,42,0.20)';
    ctx.fillRect(0, y, s, 1.4);
  }
  drawMicroGrain(ctx, s, s, 1200, 3437, 0.03 + rng() * 0.01);
  return toTileTex(canvas, 3, 3);
}

/** MC02/MC06: Seamless Tileable Sony α7 IV Bead-Blasted AZ91D Die-Cast Magnesium Powder-Coat Alloy */
function createMicMgBeadBlastTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#333b46';
  ctx.fillRect(0, 0, s, s);

  // Subtle seamless multi-scale pebble bead-blast micro-stipple (zero edge seams!)
  const rng = mulberry32(3439);
  for (let i = 0; i < 4200; i++) {
    const x = rng() * s;
    const y = rng() * s;
    const r = 0.6 + rng() * 1.4;
    const bright = rng() > 0.48;
    ctx.fillStyle = bright
      ? `rgba(186,198,214,${(0.05 + rng() * 0.07).toFixed(3)})`
      : `rgba(10,14,22,${(0.10 + rng() * 0.12).toFixed(3)})`;
    // Wrap dots across tile boundary for 100% seamless tiling
    for (const ox of [-s, 0, s]) {
      for (const oy of [-s, 0, s]) {
        const px = x + ox;
        const py = y + oy;
        if (px >= -2 && px <= s + 2 && py >= -2 && py <= s + 2) {
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
  drawMicroGrain(ctx, s, s, 2600, 3440, 0.04);
  return toTileTex(canvas, 3, 3);
}

// =============================================================================
// PHASE 34: SENSOR FAB VOL.4 — PIXEL WAFER FEOL (380 STEPS / 25 MASKS) PBR TEXTURES
// =============================================================================

function createFab4Phase3FeolDeckTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0d1526');
  bg.addColorStop(0.5, '#132038');
  bg.addColorStop(1, '#0b1424');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle nanometer lithography grid
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.10)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= w; i += 24) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(w, i);
    ctx.stroke();
  }

  // Three horizontal FEOL upper cleanroom lanes (3-A/3-B STI+DTI, 3-C RGB MeV PPD, 3-D VTG & Gate)
  const lanes: Array<{ y: number; h: number; color: string; title: string; sub: string }> = [
    { y: 54, h: 196, color: '#0ea5e9', title: '3-A/3-B  ALIGN / STI MOAT / DEEP F-DTI WALLS', sub: 'P03-001 -> P03-084 (M#01-04)' },
    { y: 286, h: 196, color: '#ec4899', title: '3-C  WELLS / RGB 3-DEPTH MeV PPD / DUAL PIXEL SPLIT', sub: 'P03-085 -> P03-248 (M#05-16)' },
    { y: 518, h: 196, color: '#8b5cf6', title: '3-D  VTG STRAW GATE / 3-7nm GATE OX / POLY-Si GATE', sub: 'P03-249 -> P03-296 (M#17-19)' },
  ];
  for (const lane of lanes) {
    ctx.fillStyle = `${lane.color}18`;
    ctx.fillRect(26, lane.y, w - 52, lane.h);
    ctx.strokeStyle = `${lane.color}bb`;
    ctx.lineWidth = 3;
    ctx.strokeRect(26, lane.y, w - 52, lane.h);
    ctx.fillStyle = lane.color;
    ctx.fillRect(26, lane.y, w - 52, 8);
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 15px monospace';
    ctx.fillText(lane.title, 40, lane.y + 30);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(lane.sub, w - 268, lane.y + 30);

    ctx.strokeStyle = `${lane.color}66`;
    ctx.lineWidth = 2;
    for (let x = 86; x < w - 80; x += 68) {
      const cy = lane.y + lane.h - 16;
      ctx.beginPath();
      ctx.moveTo(x - 10, cy - 6);
      ctx.lineTo(x, cy);
      ctx.lineTo(x - 10, cy + 6);
      ctx.stroke();
    }
  }

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 14.5px monospace';
  ctx.fillText('PHASE 3: PIXEL WAFER FEOL — 380 STEPS (25 MASKS x 12 + 80 NON-LITHO) · 90-65nm CIS', 26, 34);
  ctx.fillStyle = '#10b981';
  ctx.fillText('LOWER TERRACE: 3-E LDD / SPACER / SURFACE P+ PINNING  |  3-F SPIKE RTA / SAB / H2 SINTER', 26, 748);
  return toHiTex(canvas);
}

function createFab4RgbAbsorptionProfileTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#09101f';
  ctx.fillRect(0, 0, w, h);

  // Silicon bulk background with depth scale ticks (0um to 5um)
  ctx.fillStyle = '#132036';
  ctx.fillRect(72, 92, 624, 592);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 1.5;
  for (let d = 0; d <= 5; d++) {
    const y = 92 + d * 112;
    ctx.beginPath();
    ctx.moveTo(72, y);
    ctx.lineTo(696, y);
    ctx.stroke();
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`${d}.0um`, 12, y + 6);
  }

  // Deep P-Well Floor (Mask #05) at bottom (4.4 - 5.0 um)
  ctx.fillStyle = 'rgba(139, 92, 246, 0.48)';
  ctx.fillRect(72, 588, 624, 96);
  ctx.fillStyle = '#e9d5ff';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('DEEP P-WELL FLOOR (MASK #05 — REFLECTS ELECTRONS UP!)', 92, 642);

  // 3 Stacked N-Type Photodiode Doping Zones (Shallow Blue, Mid Green, Deep Red)
  // Blue zone (0.49 um)
  ctx.fillStyle = 'rgba(56, 189, 248, 0.42)';
  ctx.fillRect(102, 114, 564, 96);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.strokeRect(102, 114, 564, 96);

  // Green zone (1.73 um)
  ctx.fillStyle = 'rgba(34, 197, 94, 0.36)';
  ctx.fillRect(102, 224, 564, 146);
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 3;
  ctx.strokeRect(102, 224, 564, 146);

  // Red deep zone (4.0 um MeV implant)
  ctx.fillStyle = 'rgba(244, 63, 94, 0.36)';
  ctx.fillRect(102, 386, 564, 188);
  ctx.strokeStyle = '#fb7185';
  ctx.lineWidth = 3;
  ctx.strokeRect(102, 386, 564, 188);

  // Surface P+ Pinning Lid (Mask #22) on top
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(102, 92, 564, 20);

  // RGB vertical photon rays plunging to exact physical 1/alpha depths
  const drawRay = (x: number, endY: number, col: string, label: string) => {
    ctx.strokeStyle = col;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(x, 38);
    ctx.lineTo(x, endY);
    ctx.stroke();
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x, endY, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 17px monospace';
    ctx.fillText(label, x - 62, endY + 34);
  };
  drawRay(210, 152, '#38bdf8', 'BLUE 450nm (0.49um)');
  drawRay(384, 290, '#4ade80', 'GREEN 550nm (1.73um)');
  drawRay(558, 512, '#fb7185', 'RED 650nm (4.0um MeV)');

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('3-STAGE RGB PHOTODIODE DEPTH MAP (MASK #11-13)', 96, 32);
  return toHiTex(canvas);
}

function createFab4FdtiWallCrossSectionTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#0a1220';
  ctx.fillRect(0, 0, w, h);

  // Adjacent Red & Green Pixels separated by a razor-deep F-DTI Wall (AR 15-30)
  ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
  ctx.fillRect(36, 92, 312, 608);
  ctx.fillStyle = 'rgba(34, 197, 94, 0.25)';
  ctx.fillRect(420, 92, 312, 608);

  // Deep F-DTI Trench Wall (width 100-200nm, depth 2-5um, AR 15-30)
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(348, 92, 72, 578);
  // Inner Poly-Si optical mirror core
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(368, 108, 32, 544);
  // ALD negative fixed-charge / P+ passivation sidewalls (glowing violet)
  ctx.fillStyle = '#a855f7';
  ctx.fillRect(340, 92, 10, 578);
  ctx.fillRect(418, 92, 10, 578);

  // Oblique red ray bouncing cleanly off the F-DTI mirror back into Red PD!
  ctx.strokeStyle = '#fb7185';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(120, 110);
  ctx.lineTo(340, 390);
  ctx.lineTo(180, 600);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('FRONT DTI DEEP WALL (W:100-200nm / D:2-5um / AR 15-30)', 48, 48);
  ctx.fillStyle = '#fda4af';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('PIXEL R (REFLECTED!)', 64, 160);
  ctx.fillStyle = '#86efac';
  ctx.fillText('PIXEL G (ZERO CROSSTALK)', 442, 160);
  ctx.fillStyle = '#e9d5ff';
  ctx.fillText('P+ / ALD NEGATIVE CHARGE SIDEWALL', 190, 736);
  return toHiTex(canvas);
}

function createFab4DualPixelSplitProfileTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#0b1120';
  ctx.fillRect(0, 0, w, h);

  // Single pixel split down the middle into A-Image PD (Cyan) and B-Image PD (Rose) by Mask #14 P-Wall!
  const gA = ctx.createRadialGradient(220, 390, 20, 220, 390, 170);
  gA.addColorStop(0, '#22d3ee');
  gA.addColorStop(1, '#0c4a6e');
  ctx.fillStyle = gA;
  ctx.fillRect(54, 120, 304, 520);

  const gB = ctx.createRadialGradient(548, 390, 20, 548, 390, 170);
  gB.addColorStop(0, '#fb7185');
  gB.addColorStop(1, '#881337');
  ctx.fillStyle = gB;
  ctx.fillRect(410, 120, 304, 520);

  // Central Mask #14 P-Type Separation Barrier Wall
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(358, 120, 52, 520);
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 4;
  ctx.strokeRect(358, 120, 52, 520);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 21px monospace';
  ctx.fillText('MASK #14: CROSS-TYPE DUAL PIXEL SPLIT (EOS R1)', 82, 60);
  ctx.font = 'bold 28px monospace';
  ctx.fillText('PD-A', 166, 400);
  ctx.fillText('PD-B', 524, 400);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 17px monospace';
  ctx.save();
  ctx.translate(390, 505);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('P-TYPE SPLIT BARRIER', 0, 0);
  ctx.restore();
  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 17px monospace';
  ctx.fillText('DUAL INDEPENDENT ELECTRON BUCKETS -> INSTANT PHASE AF!', 92, 704);
  return toHiTex(canvas);
}

function createFab4PpdPinningBarrierTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#09111f';
  ctx.fillRect(0, 0, w, h);

  // Top Oxide Interface with Dangling Bonds (red traps)
  ctx.fillStyle = '#334155';
  ctx.fillRect(36, 92, 696, 86);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('SiO2 SURFACE (DANGLING-BOND TRAPS -> DARK ELECTRONS)', 84, 142);

  // Crimson-Gold Ultra-Shallow P+ Pinning Lid (Mask #22) annihilating dark electrons!
  const lid = ctx.createLinearGradient(0, 178, 0, 290);
  lid.addColorStop(0, '#f43f5e');
  lid.addColorStop(1, '#be123c');
  ctx.fillStyle = lid;
  ctx.fillRect(36, 178, 696, 114);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('MASK #22: SURFACE P+ PINNING LID (B+ / BF2+)', 68, 242);

  // Positive holes (+) sealing out dark electrons
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 26px monospace';
  for (let x = 72; x < 700; x += 72) {
    ctx.fillText('⊕', x, 278);
  }

  // Buried Clean N-Type Photodiode Deep Inside Crystal
  const pd = ctx.createLinearGradient(0, 292, 0, 680);
  pd.addColorStop(0, '#0284c7');
  pd.addColorStop(1, '#0c4a6e');
  ctx.fillStyle = pd;
  ctx.fillRect(36, 292, 696, 386);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('BURIED N-TYPE PINNED PHOTODIODE (PPD)', 116, 470);
  ctx.fillStyle = '#6ee7b7';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('DARK CURRENT CUT BY 1/100 TO 1/1,000!', 126, 540);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('CLEAN PHOTO-ELECTRONS SAFE INSIDE CRYSTAL', 148, 728);
  return toHiTex(canvas);
}

function createFab4SalicideBlockSplitTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#0b1120';
  ctx.fillRect(0, 0, w, h);

  // Left Half: Pixel Area PROTECTED under Salicide Block (SAB 30-50nm Oxide Cap)
  ctx.fillStyle = '#0c2742';
  ctx.fillRect(28, 92, 344, 594);
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 6;
  ctx.strokeRect(28, 92, 344, 594);
  // SAB Protective Blanket
  ctx.fillStyle = '#10b981';
  ctx.fillRect(46, 224, 308, 74);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('PIXEL AREA (SAB SHIELD!)', 56, 146);
  ctx.fillStyle = '#064e3b';
  ctx.font = 'bold 19px monospace';
  ctx.fillText('SAB CAP (30-50nm SiO2)', 66, 268);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(46, 310, 308, 250);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('ZERO Co/Ni METAL', 96, 430);
  ctx.fillText('ZERO WHITE SPOTS!', 92, 472);

  // Right Half: Periphery Logic OPEN -> Self-Aligned Metallic NiSi / CoSi2!
  ctx.fillStyle = '#24180b';
  ctx.fillRect(396, 92, 344, 594);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 6;
  ctx.strokeRect(396, 92, 344, 594);
  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('PERIPHERY (OPEN WINDOW)', 428, 146);
  // Metallic CoSi2 / NiSi contact strips
  const met = ctx.createLinearGradient(396, 224, 720, 298);
  met.addColorStop(0, '#f8fafc');
  met.addColorStop(0.5, '#f59e0b');
  met.addColorStop(1, '#cbd5e1');
  ctx.fillStyle = met;
  ctx.fillRect(414, 224, 308, 74);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 19px monospace';
  ctx.fillText('NiSi / CoSi2 SALICIDE', 446, 268);
  ctx.fillStyle = '#475569';
  ctx.fillRect(414, 310, 308, 250);
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('ULTRA-LOW RESISTANCE', 444, 430);
  ctx.fillText('HIGH-SPEED SWITCHING', 444, 472);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('MASK #25 SALICIDE BLOCK (CIS SECRET vs CPU)', 110, 52);
  return toHiTex(canvas);
}

// =============================================================================
// FACTORY: CREATE ALL BESPOKE ULTRA-REALISTIC MATERIALS
// =============================================================================

export function createUltraRealisticMaterials(clippingPlanes: THREE.Plane[]): UltraRealisticMaterials {
  const common = {
    clippingPlanes,
    clipShadows: true,
    side: THREE.FrontSide as THREE.Side,
  };

  const tagBump = <T extends THREE.Material>(mat: T, strength: number): T => {
    mat.userData.texBumpStrength = strength;
    return mat;
  };

  // --- BIONZ XR / XR2 ---
  const bionzEmiLid = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzEmiLidTexture(),
      metalness: 0.72,
      roughness: 0.30,
      clearcoat: 0.22,
    }),
    0.09
  );

  const bionzPopDramTop = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzPopDramTexture(),
      metalness: 0.08,
      roughness: 0.62,
      clearcoat: 0.14,
    }),
    0.08
  );

  const bionzDieFloorplan = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzDieFloorplanTexture(),
      metalness: 0.56,
      roughness: 0.28,
      clearcoat: 0.42,
      iridescence: 0.65,
      iridescenceIOR: 1.65,
    }),
    0.11
  );

  const bionzIpDieTile = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzIpTileTexture(),
      metalness: 0.52,
      roughness: 0.30,
      clearcoat: 0.35,
      iridescence: 0.45,
      iridescenceIOR: 1.58,
    }),
    0.10
  );

  const bionzCetusDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzCetusDieTexture(),
      metalness: 0.56,
      roughness: 0.28,
      clearcoat: 0.40,
      iridescence: 0.55,
      iridescenceIOR: 1.62,
    }),
    0.10
  );

  const bionzAbfSubstrate = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzAbfSubstrateTexture(),
      metalness: 0.16,
      roughness: 0.44,
      clearcoat: 0.32,
    }),
    0.09
  );

  const bionzBtCore = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzBtCoreTexture(),
      metalness: 0.10,
      roughness: 0.68,
    }),
    0.08
  );

  // --- SONY INTERNAL MICROPHONE ---
  const micDeadcatFur = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createMicDeadcatFurTexture(),
      metalness: 0.02,
      roughness: 0.96,
    }),
    0.16
  );

  const micTopDeckMg = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicTopDeckMgTexture(),
      metalness: 0.28,
      roughness: 0.56,
      clearcoat: 0.12,
    }),
    0.08
  );

  const micStainlessWovenMesh = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicStainlessMeshTexture(),
      metalness: 0.78,
      roughness: 0.32,
      clearcoat: 0.18,
    }),
    0.14
  );

  const micEptfeMembrane = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createMicEptfeTexture(),
      metalness: 0.02,
      roughness: 0.88,
    }),
    0.08
  );

  const micMemsFaradayLid = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicMemsLidTexture(),
      metalness: 0.78,
      roughness: 0.28,
      clearcoat: 0.20,
    }),
    0.08
  );

  const micMemsSiliconDiaphragm = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicMemsDiaphragmTexture(),
      metalness: 0.54,
      roughness: 0.24,
      clearcoat: 0.55,
      iridescence: 0.72,
      iridescenceIOR: 1.65,
    }),
    0.11
  );

  const micSh1035Flex = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicSh1035FlexTexture(),
      metalness: 0.22,
      roughness: 0.38,
      clearcoat: 0.36,
    }),
    0.08
  );

  const mattePcTex = createMattePcShellTexture();

  const micRubberBootBlack = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createMicRubberBootTexture(),
      metalness: 0.02,
      roughness: 0.88,
    }),
    0.12
  );

  const micAcousticFelt = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createMicAcousticFeltTexture(),
      metalness: 0.01,
      roughness: 0.96,
    }),
    0.12
  );

  const micEcmJfetPcb = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createMicEcmJfetPcbTexture(),
      metalness: 0.22,
      roughness: 0.42,
    }),
    0.08
  );

  // Iconic Sony anodized emerald-green 3.5mm headphone monitor jack bezel collar (100% opaque!)
  const micGreenJackCollar = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x0f8f58,
    metalness: 0.72,
    roughness: 0.26,
    clearcoat: 0.42,
  });

  // --- SONY NP-FZ100 BATTERY PACK ---
  const batPolycarbonateShell = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: mattePcTex,
      metalness: 0.05,
      roughness: 0.58,
      clearcoat: 0.14,
    }),
    0.08
  );

  const batFrontLabel = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatteryFrontLabelTexture(),
      metalness: 0.06,
      roughness: 0.48,
      clearcoat: 0.22,
    }),
    0.06
  );

  const batHologramFoil = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatteryHologramTexture(),
      metalness: 0.74,
      roughness: 0.14,
      clearcoat: 0.92,
      iridescence: 1.0,
      iridescenceIOR: 1.72,
    }),
    0.10
  );

  const batRearLaser = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatteryRearLaserTexture(),
      metalness: 0.06,
      roughness: 0.56,
      clearcoat: 0.12,
    }),
    0.08
  );

  const batCellWrapGreen = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatteryCellWrapTexture(),
      metalness: 0.12,
      roughness: 0.34,
      clearcoat: 0.48,
      side: THREE.DoubleSide,
    }),
    0.05
  );

  const batBmsPcb = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatteryBmsPcbTexture(),
      metalness: 0.18,
      roughness: 0.38,
      clearcoat: 0.46,
    }),
    0.08
  );

  const batElectrodeCoating = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createBatteryElectrodeCoatingTexture(),
      metalness: 0.24,
      roughness: 0.72,
    }),
    0.12
  );

  // Crisp opaque illuminated emerald-green LED lens for the 4-level SOC fuel gauge (ZERO hollow translucency!)
  const batSocLedGlow = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0x34d399,
    emissive: 0x10b981,
    emissiveIntensity: 0.65,
    metalness: 0.08,
    roughness: 0.12,
    clearcoat: 0.95,
  });

  // --- SONY CFEXPRESS 4.0 TYPE A TOUGH ---
  const cfeTopArmorShell = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeTopArmorTexture(),
      metalness: 0.48,
      roughness: 0.30,
      clearcoat: 0.42,
    }),
    0.08
  );

  const cfeBackplateLaser = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeBackplateLaserTexture(),
      metalness: 0.80,
      roughness: 0.26,
      clearcoat: 0.22,
    }),
    0.09
  );

  const cfeHdiPcb = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeHdiPcbTexture(),
      metalness: 0.16,
      roughness: 0.40,
      clearcoat: 0.34,
    }),
    0.09
  );

  const cfeControllerPkg = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeControllerPkgTexture(),
      metalness: 0.08,
      roughness: 0.56,
      clearcoat: 0.16,
    }),
    0.08
  );

  const cfeNandPkg = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeNandPkgTexture(),
      metalness: 0.08,
      roughness: 0.58,
      clearcoat: 0.16,
    }),
    0.08
  );

  const cfeCopperThermal = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeCopperThermalTexture(),
      metalness: 0.88,
      roughness: 0.26,
      clearcoat: 0.24,
    }),
    0.09
  );

  const cfeBiCS10WaferDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeBiCS10WaferDieTexture(),
      metalness: 0.58,
      roughness: 0.22,
      clearcoat: 0.52,
      iridescence: 0.78,
      iridescenceIOR: 1.68,
    }),
    0.11
  );

  const cfeGlassWeaveCore = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeGlassWeaveCoreTexture(),
      metalness: 0.08,
      roughness: 0.42,
      clearcoat: 0.36,
    }),
    0.12
  );

  const cfeMolyWordlineMetal = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeMolyWordlineMetalTexture(),
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.35,
    }),
    0.09
  );

  const cfePqcSecurityDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfePqcSecurityDieTexture(),
      metalness: 0.52,
      roughness: 0.26,
      clearcoat: 0.48,
      iridescence: 0.62,
      iridescenceIOR: 1.62,
    }),
    0.10
  );

  const cfeQuantumChargeTrapStack = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeQuantumChargeTrapStackTexture(),
      metalness: 0.34,
      roughness: 0.22,
      clearcoat: 0.65,
      iridescence: 0.72,
      iridescenceIOR: 1.54,
    }),
    0.09
  );

  const cfeSolderImcMicrostructure = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeSolderImcMicrostructureTexture(),
      metalness: 0.86,
      roughness: 0.26,
      clearcoat: 0.28,
    }),
    0.14
  );

  const cfeSerdesEyeDiagramDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeSerdesEyeDiagramDieTexture(),
      metalness: 0.46,
      roughness: 0.22,
      clearcoat: 0.55,
      iridescence: 0.58,
      iridescenceIOR: 1.65,
    }),
    0.09
  );

  const cfeFerroelectricHzoCrystal = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeFerroelectricHzoCrystalTexture(),
      metalness: 0.38,
      roughness: 0.18,
      clearcoat: 0.78,
      iridescence: 0.88,
      iridescenceIOR: 1.72,
    }),
    0.08
  );

  const icEpoxyLaser = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createIcEpoxyLaserTexture(),
      metalness: 0.06,
      roughness: 0.62,
      clearcoat: 0.12,
    }),
    0.08
  );

  // --- Phase 28: Pixel V2 & BIONZ XR V2 Ultra-Microscopic Nanoscale Materials ---
  const v2PixelMetasurface = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2PixelMetasurfaceTexture(),
      metalness: 0.36,
      roughness: 0.18,
      clearcoat: 0.85,
      iridescence: 0.88,
      iridescenceIOR: 1.85,
    }),
    0.12
  );

  const v2PixelSiLattice = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2PixelSiLatticeTexture(),
      metalness: 0.62,
      roughness: 0.22,
      clearcoat: 0.56,
      iridescence: 0.65,
      iridescenceIOR: 1.75,
    }),
    0.11
  );

  const v2PixelHybridBondCu = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2PixelHybridBondCuTexture(),
      metalness: 0.82,
      roughness: 0.24,
      clearcoat: 0.34,
    }),
    0.12
  );

  const v2PixelAiCircuit = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2PixelAiCircuitTexture(),
      metalness: 0.54,
      roughness: 0.28,
      clearcoat: 0.44,
      iridescence: 0.58,
      iridescenceIOR: 1.65,
    }),
    0.11
  );

  const v2BionzGaaNanosheet = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2BionzGaaNanosheetTexture(),
      metalness: 0.72,
      roughness: 0.24,
      clearcoat: 0.42,
      iridescence: 0.52,
      iridescenceIOR: 1.70,
    }),
    0.12
  );

  const v2BionzSramArray = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2BionzSramArrayTexture(),
      metalness: 0.56,
      roughness: 0.26,
      clearcoat: 0.48,
      iridescence: 0.62,
      iridescenceIOR: 1.68,
    }),
    0.11
  );

  const v2BionzBacksidePdn = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2BionzBacksidePdnTexture(),
      metalness: 0.84,
      roughness: 0.25,
      clearcoat: 0.28,
    }),
    0.12
  );

  const v2BionzGlassCoreTgv = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2BionzGlassCoreTgvTexture(),
      metalness: 0.30,
      roughness: 0.16,
      clearcoat: 0.76,
      iridescence: 0.45,
      iridescenceIOR: 1.52,
    }),
    0.10
  );

  // --- Phase 29: Sub-Nanometer Perovskite, Deuterium Si-D, 2D TMD Honeycomb & Microfluidic Cooler ---
  const v2PixelPerovskiteStack = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2PixelPerovskiteStackTexture(),
      metalness: 0.24,
      roughness: 0.18,
      clearcoat: 0.88,
      iridescence: 0.92,
      iridescenceIOR: 1.92,
    }),
    0.12
  );

  const v2PixelDeuteriumInterface = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2PixelDeuteriumInterfaceTexture(),
      metalness: 0.58,
      roughness: 0.22,
      clearcoat: 0.56,
      iridescence: 0.62,
      iridescenceIOR: 1.72,
    }),
    0.12
  );

  const v2Bionz2dTmdLattice = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2Bionz2dTmdLatticeTexture(),
      metalness: 0.66,
      roughness: 0.20,
      clearcoat: 0.64,
      iridescence: 0.84,
      iridescenceIOR: 1.88,
    }),
    0.12
  );

  const v2BionzMicrofluidicGrid = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createV2BionzMicrofluidicGridTexture(),
      metalness: 0.48,
      roughness: 0.20,
      clearcoat: 0.72,
      iridescence: 0.38,
      iridescenceIOR: 1.48,
    }),
    0.13
  );

  // --- Phase 30: Full-Frame Image Sensor & 5-Axis IBIS Bespoke Ultra-CAD Materials (S01-S90) ---
  const sensorCuCuHybrid = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorCuCuHybridTexture(),
      metalness: 0.78,
      roughness: 0.24,
      clearcoat: 0.45,
      iridescence: 0.42,
      iridescenceIOR: 1.65,
    }),
    0.12
  );

  const sensorLogicAdcDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorLogicAdcDieTexture(),
      metalness: 0.62,
      roughness: 0.24,
      clearcoat: 0.56,
      iridescence: 0.72,
      iridescenceIOR: 1.78,
    }),
    0.12
  );

  const sensorDramDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorDramDieTexture(),
      metalness: 0.58,
      roughness: 0.24,
      clearcoat: 0.54,
      iridescence: 0.66,
      iridescenceIOR: 1.72,
    }),
    0.12
  );

  const sensorHtccCeramic = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorHtccCeramicTexture(),
      metalness: 0.14,
      roughness: 0.58,
    }),
    0.09
  );

  const sensorSlvsFlex = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorSlvsFlexTexture(),
      metalness: 0.28,
      roughness: 0.34,
      clearcoat: 0.46,
    }),
    0.10
  );

  const sensorOemFlexIsl = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorOemFlexIslTexture(),
      metalness: 0.26,
      roughness: 0.36,
      clearcoat: 0.42,
    }),
    0.10
  );

  const sensorDraQrPlate = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorDraQrPlateTexture(),
      metalness: 0.36,
      roughness: 0.34,
      clearcoat: 0.32,
    }),
    0.09
  );

  const sensorOpticalScale = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorOpticalScaleTexture(),
      metalness: 0.76,
      roughness: 0.16,
      clearcoat: 0.68,
      iridescence: 0.52,
      iridescenceIOR: 1.54,
    }),
    0.11
  );

  const sensorHalbachMagnet = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorHalbachMagnetTexture(),
      metalness: 0.84,
      roughness: 0.24,
      clearcoat: 0.26,
    }),
    0.09
  );

  const sensorWasherMarking = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorWasherMarkingTexture(),
      metalness: 0.86,
      roughness: 0.26,
      clearcoat: 0.18,
    }),
    0.08
  );

  const sensorPztStack = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorPztStackTexture(),
      metalness: 0.12,
      roughness: 0.56,
    }),
    0.10
  );

  const sensorPyroGraphite = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorPyroGraphiteTexture(),
      metalness: 0.58,
      roughness: 0.34,
      clearcoat: 0.32,
    }),
    0.11
  );

  const sensorEptfeVent = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorEptfeVentTexture(),
      metalness: 0.04,
      roughness: 0.82,
    }),
    0.10
  );

  // --- Phase 30: Battery 2026 & Microphone 2026 Ultra-Microscopic UHD PBR Materials ---
  const batSiCNanoScaffold = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatSiCNanoScaffoldTexture(),
      metalness: 0.38,
      roughness: 0.34,
      clearcoat: 0.48,
      iridescence: 0.36,
      iridescenceIOR: 1.62,
    }),
    0.14
  );

  const batSingleCrystalNmc = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatSingleCrystalNmcTexture(),
      metalness: 0.44,
      roughness: 0.22,
      clearcoat: 0.82,
      iridescence: 0.78,
      iridescenceIOR: 1.84,
    }),
    0.13
  );

  const batEisNyquistDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatEisNyquistDieTexture(),
      metalness: 0.54,
      roughness: 0.24,
      clearcoat: 0.62,
      iridescence: 0.54,
      iridescenceIOR: 1.72,
    }),
    0.11
  );

  const micOpticalInterferometer = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicOpticalInterferometerTexture(),
      metalness: 0.62,
      roughness: 0.16,
      clearcoat: 0.92,
      iridescence: 0.96,
      iridescenceIOR: 1.92,
    }),
    0.12
  );

  const micAudioDsp32Float = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicAudioDsp32FloatTexture(),
      metalness: 0.56,
      roughness: 0.22,
      clearcoat: 0.64,
      iridescence: 0.58,
      iridescenceIOR: 1.74,
    }),
    0.11
  );

  const micAcousticDelayCloth = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicAcousticDelayClothTexture(),
      metalness: 0.22,
      roughness: 0.58,
      clearcoat: 0.16,
    }),
    0.15
  );

  // --- Phase 31: Battery 2026 Sulfide Argyrodite & FBG Optical + Microphone 2D Graphene & Acoustic Metamaterial ---
  const batSulfideArgyrodite = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatSulfideArgyroditeTexture(),
      metalness: 0.42,
      roughness: 0.24,
      clearcoat: 0.78,
      iridescence: 0.68,
      iridescenceIOR: 1.72,
    }),
    0.14
  );

  const batFiberBraggOptical = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBatFiberBraggOpticalTexture(),
      metalness: 0.34,
      roughness: 0.16,
      clearcoat: 0.92,
      iridescence: 0.85,
      iridescenceIOR: 1.54,
    }),
    0.11
  );

  const micGrapheneHexMembrane = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicGrapheneHexMembraneTexture(),
      metalness: 0.72,
      roughness: 0.15,
      clearcoat: 0.88,
      iridescence: 0.94,
      iridescenceIOR: 1.98,
    }),
    0.12
  );

  const micSpiralMetamaterial = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicSpiralMetamaterialTexture(),
      metalness: 0.52,
      roughness: 0.30,
      clearcoat: 0.48,
      iridescence: 0.35,
      iridescenceIOR: 1.62,
    }),
    0.16
  );

  // --- Phase 30: Sensor Manufacturing Process (Fab Vol.0) Cleanroom, 300mm Wafer, Photomask & CP Yield ---
  const fabWafer300mmDieMap = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFabWafer300mmDieMapTexture(),
      metalness: 0.68,
      roughness: 0.16,
      clearcoat: 0.90,
      iridescence: 0.94,
      iridescenceIOR: 1.78,
    }),
    0.11
  );

  const fabQuartzReticleMask = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFabQuartzReticleMaskTexture(),
      metalness: 0.42,
      roughness: 0.14,
      clearcoat: 0.86,
      iridescence: 0.54,
      iridescenceIOR: 1.54,
    }),
    0.10
  );

  const fabCleanroomProcessDeck = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFabCleanroomProcessDeckTexture(),
      metalness: 0.22,
      roughness: 0.36,
      clearcoat: 0.28,
    }),
    0.07
  );

  const fabWaferBinningMap = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFabWaferBinningMapTexture(),
      metalness: 0.34,
      roughness: 0.24,
      clearcoat: 0.62,
    }),
    0.09
  );

  // --- PHASE 31: ELECTRONIC VIEWFINDER (EVF) & EYE-CONTROL AF BESPOKE ULTRA-CAD MATERIALS (E01-E55) ---
  const evfOledBackplaneQr = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfOledBackplaneQrTexture(),
      metalness: 0.34,
      roughness: 0.34,
      clearcoat: 0.24,
    }),
    0.09
  );

  const evfOledSiliconFront = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfOledSiliconFrontTexture(),
      metalness: 0.62,
      roughness: 0.22,
      clearcoat: 0.62,
      iridescence: 0.72,
      iridescenceIOR: 1.72,
    }),
    0.10
  );

  const evfTandemCavityStack = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfTandemCavityStackTexture(),
      metalness: 0.42,
      roughness: 0.18,
      clearcoat: 0.85,
      iridescence: 0.92,
      iridescenceIOR: 1.82,
    }),
    0.11
  );

  const evfTconPcb = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfTconPcbTexture(),
      metalness: 0.22,
      roughness: 0.40,
      clearcoat: 0.36,
    }),
    0.10
  );

  const evfTconEmiCan = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfTconEmiCanTexture(),
      metalness: 0.86,
      roughness: 0.26,
      clearcoat: 0.22,
    }),
    0.09
  );

  const evfOemFlexRibbon = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfOemFlexRibbonTexture(),
      metalness: 0.38,
      roughness: 0.30,
      clearcoat: 0.56,
    }),
    0.08
  );

  const evfMipiShieldMesh = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfMipiShieldMeshTexture(),
      metalness: 0.58,
      roughness: 0.38,
      clearcoat: 0.18,
    }),
    0.12
  );

  const evfVfRadiationSheet = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfVfRadiationSheetTexture(),
      metalness: 0.04,
      roughness: 0.76,
    }),
    0.10
  );

  const evfGazeNirDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfGazeNirDieTexture(),
      metalness: 0.54,
      roughness: 0.18,
      clearcoat: 0.78,
      iridescence: 0.84,
      iridescenceIOR: 1.76,
    }),
    0.10
  );

  const evfDiopterDialCap = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfDiopterDialCapTexture(),
      metalness: 0.66,
      roughness: 0.32,
      clearcoat: 0.28,
    }),
    0.11
  );

  const evfFinderCoverMold = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfFinderCoverMoldTexture(),
      metalness: 0.08,
      roughness: 0.68,
    }),
    0.11
  );

  const evfShimEtchedBrass = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfShimEtchedBrassTexture(),
      metalness: 0.88,
      roughness: 0.26,
      clearcoat: 0.24,
    }),
    0.09
  );

  const evfZeoliteBeadBed = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfZeoliteBeadBedTexture(),
      metalness: 0.04,
      roughness: 0.84,
    }),
    0.18
  );

  const evfAmbientRgbDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createEvfAmbientRgbDieTexture(),
      metalness: 0.44,
      roughness: 0.18,
      clearcoat: 0.86,
      iridescence: 0.65,
      iridescenceIOR: 1.64,
    }),
    0.09
  );

  // --- Phase 31: Sensor Manufacturing Process (Fab Vol.1) Exhibition Deck & 4-Size Wafer Yield Maps ---
  const fab1ArchExhibitionDeck = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab1ArchExhibitionDeckTexture(),
      metalness: 0.18,
      roughness: 0.36,
      clearcoat: 0.28,
    }),
    0.06
  );

  const fab1WaferSmartphone640 = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab1WaferSmartphone640Texture(),
      metalness: 0.56,
      roughness: 0.18,
      clearcoat: 0.85,
      iridescence: 0.82,
      iridescenceIOR: 1.76,
    }),
    0.09
  );

  const fab1WaferApsc134 = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab1WaferApsc134Texture(),
      metalness: 0.58,
      roughness: 0.18,
      clearcoat: 0.86,
      iridescence: 0.86,
      iridescenceIOR: 1.78,
    }),
    0.09
  );

  const fab1WaferMediumFormat26 = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab1WaferMediumFormat26Texture(),
      metalness: 0.60,
      roughness: 0.18,
      clearcoat: 0.88,
      iridescence: 0.88,
      iridescenceIOR: 1.80,
    }),
    0.09
  );

  // --- Phase 31: Extreme Micro-Detail Full-Frame Sensor & 5-Axis IBIS Materials (S01-S90) ---
  const sensorMgDieCast = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorMgDieCastTexture(),
      metalness: 0.68,
      roughness: 0.36,
      clearcoat: 0.14,
    }),
    0.13
  );

  const sensorVcmCopperWinding = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorVcmCopperWindingTexture(),
      metalness: 0.86,
      roughness: 0.24,
      clearcoat: 0.38,
    }),
    0.16
  );

  const sensorSoftIronYoke = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorSoftIronYokeTexture(),
      metalness: 0.84,
      roughness: 0.28,
      clearcoat: 0.18,
    }),
    0.11
  );

  const sensorOpticalFilterCoating = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorOpticalFilterCoatingTexture(),
      metalness: 0.08,
      roughness: 0.06,
      transparent: true,
      opacity: 0.44,
      clearcoat: 0.96,
      iridescence: 0.92,
      iridescenceIOR: 1.56,
      depthWrite: false,
    }),
    0.05
  );

  const sensorTimSiliconeWaffle = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorTimSiliconeWaffleTexture(),
      metalness: 0.04,
      roughness: 0.62,
      clearcoat: 0.14,
    }),
    0.16
  );

  const sensorEmiShieldNickel = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorEmiShieldNickelTexture(),
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 0.22,
    }),
    0.13
  );

  const sensorCarbonCurtainWeave = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorCarbonCurtainWeaveTexture(),
      metalness: 0.24,
      roughness: 0.44,
      clearcoat: 0.26,
    }),
    0.15
  );

  const sensorEndLiquidCrystal = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorEndLiquidCrystalTexture(),
      metalness: 0.12,
      roughness: 0.08,
      transparent: true,
      opacity: 0.72,
      clearcoat: 0.92,
      iridescence: 0.86,
      iridescenceIOR: 1.62,
      depthWrite: false,
    }),
    0.08
  );

  const sensorPeltierCeramic = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorPeltierCeramicTexture(),
      metalness: 0.06,
      roughness: 0.34,
      clearcoat: 0.28,
    }),
    0.09
  );

  const sensorLgaBallGrid = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorLgaBallGridTexture(),
      metalness: 0.72,
      roughness: 0.26,
      clearcoat: 0.32,
    }),
    0.14
  );

  const sensorVelvetBaffle = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorVelvetBaffleTexture(),
      metalness: 0.03,
      roughness: 0.95,
    }),
    0.16
  );

  const sensorHallSubPcb = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorHallSubPcbTexture(),
      metalness: 0.34,
      roughness: 0.32,
      clearcoat: 0.36,
    }),
    0.11
  );

  const sensorCuWAlloySinter = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorCuWAlloySinterTexture(),
      metalness: 0.86,
      roughness: 0.26,
      clearcoat: 0.22,
    }),
    0.13
  );

  const sensorSusSpringSteel = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorSusSpringSteelTexture(),
      metalness: 0.90,
      roughness: 0.22,
      clearcoat: 0.24,
    }),
    0.10
  );

  const sensorMemsTcxoLid = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorMemsTcxoLidTexture(),
      metalness: 0.88,
      roughness: 0.20,
      clearcoat: 0.34,
    }),
    0.10
  );

  const sensorFiducialTarget = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createSensorFiducialTargetTexture(),
      metalness: 0.78,
      roughness: 0.18,
      clearcoat: 0.56,
      iridescence: 0.54,
      iridescenceIOR: 1.72,
    }),
    0.11
  );

  // --- Phase 31: BIONZ XR / XR2 Semiconductor Package Forensic Ultra-CAD Materials (XR01-XR46) ---
  const bionzIhsNickelCu = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzIhsNickelCuTexture(),
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.28,
    }),
    0.09
  );

  const bionzIndiumStim = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzIndiumStimTexture(),
      metalness: 0.86,
      roughness: 0.26,
      clearcoat: 0.34,
    }),
    0.11
  );

  const bionzLpddr5xDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzLpddr5xDieTexture(),
      metalness: 0.58,
      roughness: 0.24,
      clearcoat: 0.52,
      iridescence: 0.68,
      iridescenceIOR: 1.72,
    }),
    0.11
  );

  const bionzPopInterposer = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzPopInterposerTexture(),
      metalness: 0.18,
      roughness: 0.42,
      clearcoat: 0.36,
    }),
    0.09
  );

  const bionzEmcSilica = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzEmcSilicaTexture(),
      metalness: 0.08,
      roughness: 0.68,
    }),
    0.12
  );

  const bionzAbfBottomSr = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzAbfBottomSrTexture(),
      metalness: 0.20,
      roughness: 0.36,
      clearcoat: 0.48,
    }),
    0.10
  );

  const bionzFeolFinfet = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzFeolFinfetTexture(),
      metalness: 0.64,
      roughness: 0.24,
      clearcoat: 0.54,
      iridescence: 0.72,
      iridescenceIOR: 1.76,
    }),
    0.13
  );

  const bionzBeolDamascene = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzBeolDamasceneTexture(),
      metalness: 0.70,
      roughness: 0.26,
      clearcoat: 0.42,
      iridescence: 0.38,
      iridescenceIOR: 1.56,
    }),
    0.13
  );

  const bionzLsiBridge = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzLsiBridgeTexture(),
      metalness: 0.62,
      roughness: 0.22,
      clearcoat: 0.58,
      iridescence: 0.64,
      iridescenceIOR: 1.68,
    }),
    0.11
  );

  const bionzCufSilica = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzCufSilicaTexture(),
      metalness: 0.08,
      roughness: 0.42,
      clearcoat: 0.38,
      transparent: true,
      opacity: 0.88,
    }),
    0.10
  );

  const bionzEsicapDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzEsicapDieTexture(),
      metalness: 0.60,
      roughness: 0.24,
      clearcoat: 0.52,
      iridescence: 0.62,
      iridescenceIOR: 1.66,
    }),
    0.11
  );

  const bionzPmicIc = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzPmicIcTexture(),
      metalness: 0.08,
      roughness: 0.60,
      clearcoat: 0.16,
    }),
    0.09
  );

  const bionzInductorR47 = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzInductorR47Texture(),
      metalness: 0.24,
      roughness: 0.66,
    }),
    0.11
  );

  const bionzTcxoGoldLid = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzTcxoGoldLidTexture(),
      metalness: 0.90,
      roughness: 0.22,
      clearcoat: 0.26,
    }),
    0.10
  );

  const bionzNorFlashIc = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzNorFlashIcTexture(),
      metalness: 0.08,
      roughness: 0.58,
      clearcoat: 0.16,
    }),
    0.09
  );

  const bionzHdmiRetimerIc = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzHdmiRetimerIcTexture(),
      metalness: 0.08,
      roughness: 0.58,
      clearcoat: 0.16,
    }),
    0.09
  );

  // --- Phase 32: Sensor Manufacturing Process (Fab Vol.2) Sand-to-Epi-Wafer PBR Materials ---
  const fab2Phase1PlantDeck = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab2Phase1PlantDeckTexture(),
      metalness: 0.16,
      roughness: 0.36,
      clearcoat: 0.26,
    }),
    0.06
  );

  const fab2IngotVgCrystalMap = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab2IngotVgCrystalMapTexture(),
      metalness: 0.78,
      roughness: 0.16,
      clearcoat: 0.90,
      iridescence: 0.54,
      iridescenceIOR: 1.72,
    }),
    0.07
  );

  const fab2LpdDefectMap = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab2LpdDefectMapTexture(),
      metalness: 0.56,
      roughness: 0.15,
      clearcoat: 0.92,
      iridescence: 0.82,
      iridescenceIOR: 1.76,
    }),
    0.08
  );

  const fab2NanotopoMap = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab2NanotopoMapTexture(),
      metalness: 0.44,
      roughness: 0.14,
      clearcoat: 0.94,
      iridescence: 0.92,
      iridescenceIOR: 1.82,
    }),
    0.07
  );

  // --- Phase 33: Sensor Fab Vol.3 (Design Studio & 6" Photomask Fab) ---
  const fab3Phase2StudioDeck = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab3Phase2StudioDeckTexture(),
      metalness: 0.34,
      roughness: 0.32,
      clearcoat: 0.42,
    }),
    0.05
  );

  const fab3OpcSerifMask = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab3OpcSerifMaskTexture(),
      metalness: 0.62,
      roughness: 0.16,
      clearcoat: 0.92,
      iridescence: 0.65,
      iridescenceIOR: 1.65,
    }),
    0.10
  );

  const fab3StitchVsSingleReticle = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab3StitchVsSingleReticleTexture(),
      metalness: 0.58,
      roughness: 0.18,
      clearcoat: 0.90,
      iridescence: 0.55,
      iridescenceIOR: 1.58,
    }),
    0.09
  );

  const fab3ChipLayoutOasis = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab3ChipLayoutOasisTexture(),
      metalness: 0.52,
      roughness: 0.15,
      clearcoat: 0.94,
      iridescence: 0.86,
      iridescenceIOR: 1.78,
    }),
    0.08
  );

  const fab3MaskCdMap = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab3MaskCdMapTexture(),
      metalness: 0.48,
      roughness: 0.16,
      clearcoat: 0.88,
      iridescence: 0.62,
      iridescenceIOR: 1.66,
    }),
    0.07
  );

  const fab3BossungWindowMap = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab3BossungWindowMapTexture(),
      metalness: 0.30,
      roughness: 0.22,
      clearcoat: 0.78,
    }),
    0.06
  );

  // --- Phase 35: Standalone Microphone 110-Part (MC01-MC110) Bespoke Ultra-HD PBR Materials ---
  const micOemHolderResin = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicOemHolderResinTexture(),
      metalness: 0.08,
      roughness: 0.56,
      clearcoat: 0.16,
    }),
    0.10
  );

  const micTeraoka631sTape = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createMicTeraoka631sTapeTexture(),
      metalness: 0.03,
      roughness: 0.92,
    }),
    0.14
  );

  const micDrieSiliconBackplate = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicDrieSiliconBackplateTexture(),
      metalness: 0.62,
      roughness: 0.20,
      clearcoat: 0.72,
      iridescence: 0.74,
      iridescenceIOR: 1.72,
    }),
    0.12
  );

  const micMemsAsicDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicMemsAsicDieTexture(),
      metalness: 0.58,
      roughness: 0.18,
      clearcoat: 0.80,
      iridescence: 0.82,
      iridescenceIOR: 1.76,
    }),
    0.11
  );

  const micCeramicLgaSubstrate = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicCeramicLgaSubstrateTexture(),
      metalness: 0.22,
      roughness: 0.40,
      clearcoat: 0.38,
    }),
    0.10
  );

  const micEcmSpunAluminum = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicEcmSpunAluminumTexture(),
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 0.28,
    }),
    0.10
  );

  const micEcmBrassBackplate = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicEcmBrassBackplateTexture(),
      metalness: 0.86,
      roughness: 0.26,
      clearcoat: 0.26,
    }),
    0.11
  );

  const micAudioMainPcb = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicAudioMainPcbTexture(),
      metalness: 0.18,
      roughness: 0.38,
      clearcoat: 0.42,
    }),
    0.10
  );

  const micCodecQfnPackage = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicCodecQfnPackageTexture(),
      metalness: 0.08,
      roughness: 0.54,
      clearcoat: 0.18,
    }),
    0.09
  );

  const micStarGroundPcb = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicStarGroundPcbTexture(),
      metalness: 0.32,
      roughness: 0.34,
      clearcoat: 0.45,
    }),
    0.11
  );

  const micAiNpuDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicAiNpuDieTexture(),
      metalness: 0.56,
      roughness: 0.18,
      clearcoat: 0.82,
      iridescence: 0.86,
      iridescenceIOR: 1.80,
    }),
    0.11
  );

  const micMiShoeDigitalFlex = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicMiShoeDigitalFlexTexture(),
      metalness: 0.28,
      roughness: 0.34,
      clearcoat: 0.42,
    }),
    0.09
  );

  const micScAlnPiezoDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicScAlnPiezoDieTexture(),
      metalness: 0.60,
      roughness: 0.18,
      clearcoat: 0.78,
      iridescence: 0.90,
      iridescenceIOR: 1.85,
    }),
    0.12
  );

  const micVpuCombDriveDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicVpuCombDriveDieTexture(),
      metalness: 0.64,
      roughness: 0.22,
      clearcoat: 0.64,
      iridescence: 0.52,
      iridescenceIOR: 1.66,
    }),
    0.13
  );

  const mic8CapsuleArrayFace = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMic8CapsuleArrayFaceTexture(),
      metalness: 0.52,
      roughness: 0.36,
      clearcoat: 0.26,
    }),
    0.10
  );

  const micQuartzTcxoLid = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicQuartzTcxoLidTexture(),
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.36,
    }),
    0.09
  );

  const micUwbRfModule = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicUwbRfModuleTexture(),
      metalness: 0.72,
      roughness: 0.28,
      clearcoat: 0.28,
    }),
    0.10
  );

  const micBinauralHrtfMap = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicBinauralHrtfMapTexture(),
      metalness: 0.44,
      roughness: 0.20,
      clearcoat: 0.84,
      iridescence: 0.76,
      iridescenceIOR: 1.72,
    }),
    0.09
  );

  const micLufsMeterDisplay = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicLufsMeterDisplayTexture(),
      metalness: 0.26,
      roughness: 0.22,
      clearcoat: 0.86,
    }),
    0.08
  );

  const micBoschScallopSi = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicBoschScallopSiTexture(),
      metalness: 0.66,
      roughness: 0.24,
      clearcoat: 0.52,
      iridescence: 0.58,
      iridescenceIOR: 1.70,
    }),
    0.16
  );

  const micPhotonicMziDie = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicPhotonicMziDieTexture(),
      metalness: 0.54,
      roughness: 0.16,
      clearcoat: 0.92,
      iridescence: 0.92,
      iridescenceIOR: 1.88,
    }),
    0.11
  );

  const micOemScrewSteel = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicOemScrewSteelTexture(),
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.28,
    }),
    0.12
  );

  const micMgBeadBlast = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMicMgBeadBlastTexture(),
      metalness: 0.54,
      roughness: 0.44,
      clearcoat: 0.14,
    }),
    0.11
  );

  // --- Phase 34: Sensor Fab Vol.4 (Pixel Wafer FEOL 380-Step / 25-Mask PBR) ---
  const fab4Phase3FeolDeck = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab4Phase3FeolDeckTexture(),
      metalness: 0.34,
      roughness: 0.30,
      clearcoat: 0.44,
    }),
    0.05
  );

  const fab4RgbAbsorptionProfile = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab4RgbAbsorptionProfileTexture(),
      metalness: 0.42,
      roughness: 0.16,
      clearcoat: 0.92,
      iridescence: 0.72,
      iridescenceIOR: 1.72,
    }),
    0.08
  );

  const fab4FdtiWallCrossSection = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab4FdtiWallCrossSectionTexture(),
      metalness: 0.56,
      roughness: 0.18,
      clearcoat: 0.88,
      iridescence: 0.58,
      iridescenceIOR: 1.62,
    }),
    0.09
  );

  const fab4DualPixelSplitProfile = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab4DualPixelSplitProfileTexture(),
      metalness: 0.48,
      roughness: 0.17,
      clearcoat: 0.90,
      iridescence: 0.66,
      iridescenceIOR: 1.68,
    }),
    0.08
  );

  const fab4PpdPinningBarrier = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab4PpdPinningBarrierTexture(),
      metalness: 0.46,
      roughness: 0.15,
      clearcoat: 0.94,
      iridescence: 0.74,
      iridescenceIOR: 1.74,
    }),
    0.09
  );

  const fab4SalicideBlockSplit = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createFab4SalicideBlockSplitTexture(),
      metalness: 0.62,
      roughness: 0.16,
      clearcoat: 0.90,
      iridescence: 0.54,
      iridescenceIOR: 1.56,
    }),
    0.09
  );

  // --- Phase 35: CFexpress 4.0 Type A Top-20 Hero Parts Ultra-HD Bespoke Materials ---
  const cfeHdiPcbRear = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeHdiPcbRearTexture(),
      metalness: 0.16,
      roughness: 0.38,
      clearcoat: 0.36,
    }),
    0.09
  );

  const cfeToughResinMold = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeToughResinMoldTexture(),
      metalness: 0.08,
      roughness: 0.56,
      clearcoat: 0.14,
    }),
    0.11
  );

  const cfeHardGoldFingers = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeHardGoldFingersTexture(),
      metalness: 0.96,
      roughness: 0.16,
      clearcoat: 0.34,
    }),
    0.07
  );

  const cfeLpddr4Pkg = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeLpddr4PkgTexture(),
      metalness: 0.08,
      roughness: 0.56,
      clearcoat: 0.16,
    }),
    0.08
  );

  const cfeCopperSpreaderHero = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeCopperSpreaderHeroTexture(),
      metalness: 0.90,
      roughness: 0.24,
      clearcoat: 0.28,
    }),
    0.10
  );

  const cfeTimSiliconeWaffle = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeTimSiliconeWaffleTexture(),
      metalness: 0.02,
      roughness: 0.62,
      clearcoat: 0.12,
    }),
    0.13
  );

  const cfePyroGraphiteSheet = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfePyroGraphiteSheetTexture(),
      metalness: 0.62,
      roughness: 0.30,
      clearcoat: 0.28,
      iridescence: 0.24,
      iridescenceIOR: 1.48,
    }),
    0.10
  );

  const cfeEmiShieldCan = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeEmiShieldCanTexture(),
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 0.22,
    }),
    0.08
  );

  const cfeMicroVaporWick = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeMicroVaporWickTexture(),
      metalness: 0.88,
      roughness: 0.28,
      clearcoat: 0.26,
      iridescence: 0.26,
      iridescenceIOR: 1.52,
    }),
    0.13
  );

  const cfeMrwg3CncAluminum = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeMrwg3CncAluminumTexture(),
      metalness: 0.72,
      roughness: 0.34,
      clearcoat: 0.24,
    }),
    0.08
  );

  const cfeInnerArmorCnc = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeInnerArmorCncTexture(),
      metalness: 0.86,
      roughness: 0.26,
      clearcoat: 0.20,
    }),
    0.09
  );

  const cfeComboSlotShell = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createCfeComboSlotShellTexture(),
      metalness: 0.88,
      roughness: 0.25,
      clearcoat: 0.22,
    }),
    0.08
  );

  const bionzHero = createBionzHeroMaterials(clippingPlanes);
  const { heroList: bionzHeroList, ...bionzHeroMap } = bionzHero;

  const list: THREE.Material[] = [
    ...bionzHeroList,
    bionzEmiLid,
    bionzPopDramTop,
    bionzDieFloorplan,
    bionzIpDieTile,
    bionzCetusDie,
    bionzAbfSubstrate,
    bionzBtCore,
    micDeadcatFur,
    micTopDeckMg,
    micStainlessWovenMesh,
    micEptfeMembrane,
    micMemsFaradayLid,
    micMemsSiliconDiaphragm,
    micSh1035Flex,
    micRubberBootBlack,
    micAcousticFelt,
    micEcmJfetPcb,
    micGreenJackCollar,
    batPolycarbonateShell,
    batFrontLabel,
    batHologramFoil,
    batRearLaser,
    batCellWrapGreen,
    batBmsPcb,
    batElectrodeCoating,
    batSocLedGlow,
    cfeTopArmorShell,
    cfeBackplateLaser,
    cfeHdiPcb,
    cfeControllerPkg,
    cfeNandPkg,
    cfeCopperThermal,
    cfeBiCS10WaferDie,
    cfeGlassWeaveCore,
    cfeMolyWordlineMetal,
    cfePqcSecurityDie,
    cfeQuantumChargeTrapStack,
    cfeSolderImcMicrostructure,
    cfeSerdesEyeDiagramDie,
    cfeFerroelectricHzoCrystal,
    icEpoxyLaser,
    v2PixelMetasurface,
    v2PixelSiLattice,
    v2PixelHybridBondCu,
    v2PixelAiCircuit,
    v2BionzGaaNanosheet,
    v2BionzSramArray,
    v2BionzBacksidePdn,
    v2BionzGlassCoreTgv,
    v2PixelPerovskiteStack,
    v2PixelDeuteriumInterface,
    v2Bionz2dTmdLattice,
    v2BionzMicrofluidicGrid,
    sensorCuCuHybrid,
    sensorLogicAdcDie,
    sensorDramDie,
    sensorHtccCeramic,
    sensorSlvsFlex,
    sensorOemFlexIsl,
    sensorDraQrPlate,
    sensorOpticalScale,
    sensorHalbachMagnet,
    sensorWasherMarking,
    sensorPztStack,
    sensorPyroGraphite,
    sensorEptfeVent,
    batSiCNanoScaffold,
    batSingleCrystalNmc,
    batEisNyquistDie,
    micOpticalInterferometer,
    micAudioDsp32Float,
    micAcousticDelayCloth,
    bionzIhsNickelCu,
    bionzIndiumStim,
    bionzLpddr5xDie,
    bionzPopInterposer,
    bionzEmcSilica,
    bionzAbfBottomSr,
    bionzFeolFinfet,
    bionzBeolDamascene,
    bionzLsiBridge,
    bionzCufSilica,
    bionzEsicapDie,
    bionzPmicIc,
    bionzInductorR47,
    bionzTcxoGoldLid,
    bionzNorFlashIc,
    bionzHdmiRetimerIc,
    batSulfideArgyrodite,
    batFiberBraggOptical,
    micGrapheneHexMembrane,
    micSpiralMetamaterial,
    fabWafer300mmDieMap,
    fabQuartzReticleMask,
    fabCleanroomProcessDeck,
    fabWaferBinningMap,
    evfOledBackplaneQr,
    evfOledSiliconFront,
    evfTandemCavityStack,
    evfTconPcb,
    evfTconEmiCan,
    evfOemFlexRibbon,
    evfMipiShieldMesh,
    evfVfRadiationSheet,
    evfGazeNirDie,
    evfDiopterDialCap,
    evfFinderCoverMold,
    evfShimEtchedBrass,
    evfZeoliteBeadBed,
    evfAmbientRgbDie,
    fab1ArchExhibitionDeck,
    fab1WaferSmartphone640,
    fab1WaferApsc134,
    fab1WaferMediumFormat26,
    sensorMgDieCast,
    sensorVcmCopperWinding,
    sensorSoftIronYoke,
    sensorOpticalFilterCoating,
    sensorTimSiliconeWaffle,
    sensorEmiShieldNickel,
    sensorCarbonCurtainWeave,
    sensorEndLiquidCrystal,
    sensorPeltierCeramic,
    sensorLgaBallGrid,
    sensorVelvetBaffle,
    sensorHallSubPcb,
    sensorCuWAlloySinter,
    sensorSusSpringSteel,
    sensorMemsTcxoLid,
    sensorFiducialTarget,
    fab2Phase1PlantDeck,
    fab2IngotVgCrystalMap,
    fab2LpdDefectMap,
    fab2NanotopoMap,
    fab3Phase2StudioDeck,
    fab3OpcSerifMask,
    fab3StitchVsSingleReticle,
    fab3ChipLayoutOasis,
    fab3MaskCdMap,
    fab3BossungWindowMap,
    fab4Phase3FeolDeck,
    fab4RgbAbsorptionProfile,
    fab4FdtiWallCrossSection,
    fab4DualPixelSplitProfile,
    fab4PpdPinningBarrier,
    fab4SalicideBlockSplit,
    cfeHdiPcbRear,
    cfeToughResinMold,
    cfeHardGoldFingers,
    cfeLpddr4Pkg,
    cfeCopperSpreaderHero,
    cfeTimSiliconeWaffle,
    cfePyroGraphiteSheet,
    cfeEmiShieldCan,
    cfeMicroVaporWick,
    cfeMrwg3CncAluminum,
    cfeInnerArmorCnc,
    cfeComboSlotShell,
    micOemHolderResin,
    micTeraoka631sTape,
    micDrieSiliconBackplate,
    micMemsAsicDie,
    micCeramicLgaSubstrate,
    micEcmSpunAluminum,
    micEcmBrassBackplate,
    micAudioMainPcb,
    micCodecQfnPackage,
    micStarGroundPcb,
    micAiNpuDie,
    micMiShoeDigitalFlex,
    micScAlnPiezoDie,
    micVpuCombDriveDie,
    mic8CapsuleArrayFace,
    micQuartzTcxoLid,
    micUwbRfModule,
    micBinauralHrtfMap,
    micLufsMeterDisplay,
    micBoschScallopSi,
    micPhotonicMziDie,
    micOemScrewSteel,
    micMgBeadBlast,
  ];

  return {
    ...bionzHeroMap,
    bionzEmiLid,
    bionzPopDramTop,
    bionzDieFloorplan,
    bionzIpDieTile,
    bionzCetusDie,
    bionzAbfSubstrate,
    bionzBtCore,
    micDeadcatFur,
    micTopDeckMg,
    micStainlessWovenMesh,
    micEptfeMembrane,
    micMemsFaradayLid,
    micMemsSiliconDiaphragm,
    micSh1035Flex,
    micRubberBootBlack,
    micAcousticFelt,
    micEcmJfetPcb,
    micGreenJackCollar,
    batPolycarbonateShell,
    batFrontLabel,
    batHologramFoil,
    batRearLaser,
    batCellWrapGreen,
    batBmsPcb,
    batElectrodeCoating,
    batSocLedGlow,
    cfeTopArmorShell,
    cfeBackplateLaser,
    cfeHdiPcb,
    cfeControllerPkg,
    cfeNandPkg,
    cfeCopperThermal,
    cfeBiCS10WaferDie,
    cfeGlassWeaveCore,
    cfeMolyWordlineMetal,
    cfePqcSecurityDie,
    cfeQuantumChargeTrapStack,
    cfeSolderImcMicrostructure,
    cfeSerdesEyeDiagramDie,
    cfeFerroelectricHzoCrystal,
    icEpoxyLaser,
    v2PixelMetasurface,
    v2PixelSiLattice,
    v2PixelHybridBondCu,
    v2PixelAiCircuit,
    v2BionzGaaNanosheet,
    v2BionzSramArray,
    v2BionzBacksidePdn,
    v2BionzGlassCoreTgv,
    v2PixelPerovskiteStack,
    v2PixelDeuteriumInterface,
    v2Bionz2dTmdLattice,
    v2BionzMicrofluidicGrid,
    sensorCuCuHybrid,
    sensorLogicAdcDie,
    sensorDramDie,
    sensorHtccCeramic,
    sensorSlvsFlex,
    sensorOemFlexIsl,
    sensorDraQrPlate,
    sensorOpticalScale,
    sensorHalbachMagnet,
    sensorWasherMarking,
    sensorPztStack,
    sensorPyroGraphite,
    sensorEptfeVent,
    batSiCNanoScaffold,
    batSingleCrystalNmc,
    batEisNyquistDie,
    micOpticalInterferometer,
    micAudioDsp32Float,
    micAcousticDelayCloth,
    bionzIhsNickelCu,
    bionzIndiumStim,
    bionzLpddr5xDie,
    bionzPopInterposer,
    bionzEmcSilica,
    bionzAbfBottomSr,
    bionzFeolFinfet,
    bionzBeolDamascene,
    bionzLsiBridge,
    bionzCufSilica,
    bionzEsicapDie,
    bionzPmicIc,
    bionzInductorR47,
    bionzTcxoGoldLid,
    bionzNorFlashIc,
    bionzHdmiRetimerIc,
    batSulfideArgyrodite,
    batFiberBraggOptical,
    micGrapheneHexMembrane,
    micSpiralMetamaterial,
    fabWafer300mmDieMap,
    fabQuartzReticleMask,
    fabCleanroomProcessDeck,
    fabWaferBinningMap,
    evfOledBackplaneQr,
    evfOledSiliconFront,
    evfTandemCavityStack,
    evfTconPcb,
    evfTconEmiCan,
    evfOemFlexRibbon,
    evfMipiShieldMesh,
    evfVfRadiationSheet,
    evfGazeNirDie,
    evfDiopterDialCap,
    evfFinderCoverMold,
    evfShimEtchedBrass,
    evfZeoliteBeadBed,
    evfAmbientRgbDie,
    fab1ArchExhibitionDeck,
    fab1WaferSmartphone640,
    fab1WaferApsc134,
    fab1WaferMediumFormat26,
    sensorMgDieCast,
    sensorVcmCopperWinding,
    sensorSoftIronYoke,
    sensorOpticalFilterCoating,
    sensorTimSiliconeWaffle,
    sensorEmiShieldNickel,
    sensorCarbonCurtainWeave,
    sensorEndLiquidCrystal,
    sensorPeltierCeramic,
    sensorLgaBallGrid,
    sensorVelvetBaffle,
    sensorHallSubPcb,
    sensorCuWAlloySinter,
    sensorSusSpringSteel,
    sensorMemsTcxoLid,
    sensorFiducialTarget,
    fab2Phase1PlantDeck,
    fab2IngotVgCrystalMap,
    fab2LpdDefectMap,
    fab2NanotopoMap,
    fab3Phase2StudioDeck,
    fab3OpcSerifMask,
    fab3StitchVsSingleReticle,
    fab3ChipLayoutOasis,
    fab3MaskCdMap,
    fab3BossungWindowMap,
    fab4Phase3FeolDeck,
    fab4RgbAbsorptionProfile,
    fab4FdtiWallCrossSection,
    fab4DualPixelSplitProfile,
    fab4PpdPinningBarrier,
    fab4SalicideBlockSplit,
    cfeHdiPcbRear,
    cfeToughResinMold,
    cfeHardGoldFingers,
    cfeLpddr4Pkg,
    cfeCopperSpreaderHero,
    cfeTimSiliconeWaffle,
    cfePyroGraphiteSheet,
    cfeEmiShieldCan,
    cfeMicroVaporWick,
    cfeMrwg3CncAluminum,
    cfeInnerArmorCnc,
    cfeComboSlotShell,
    micOemHolderResin,
    micTeraoka631sTape,
    micDrieSiliconBackplate,
    micMemsAsicDie,
    micCeramicLgaSubstrate,
    micEcmSpunAluminum,
    micEcmBrassBackplate,
    micAudioMainPcb,
    micCodecQfnPackage,
    micStarGroundPcb,
    micAiNpuDie,
    micMiShoeDigitalFlex,
    micScAlnPiezoDie,
    micVpuCombDriveDie,
    mic8CapsuleArrayFace,
    micQuartzTcxoLid,
    micUwbRfModule,
    micBinauralHrtfMap,
    micLufsMeterDisplay,
    micBoschScallopSi,
    micPhotonicMziDie,
    micOemScrewSteel,
    micMgBeadBlast,
    list,
  };
}
