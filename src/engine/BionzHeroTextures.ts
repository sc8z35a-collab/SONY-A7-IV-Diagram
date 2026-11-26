import * as THREE from 'three';
import {
  GPU_PROFILE,
  NATIVE_HI_TEX_H,
  NATIVE_HI_TEX_W,
  NATIVE_TILE_TEX_SIZE,
} from './GpuOptimizer';

/**
 * 22 Brand-New Forensic-Grade Bespoke PBR Materials for the 35 Most Prominent
 * Hero Parts of the Standalone Sony BIONZ XR / XR2 Semiconductor Package (XR01–XR46).
 *
 * Grounded in Sony α7 IV (ILCE-7M4 SY-1122) & α7 V (ILCE-7M5 AT&S / Micron D8DNH PoP) teardowns,
 * OpenMemories (CXD90057 "Mira", CXD90058 "Cetus", 32-bit SA DSP "sabin"), Amkor SUS/Cu/SUS
 * conformal shielding, ARM Cortex-A35 8-stage pipeline, H.265/HEVC 64x64 CTU quadtree,
 * Active-Shield top-metal serpentine tamper mesh, Panasonic POSCAP TPF/TPB, Murata DFE252012F-R24M,
 * TI TDP2004 WQFN-40 (RNQ 4x6mm), Semtech RClamp0524P (SLP2510P8), MPS MP5475 LPDDR5X PMIC,
 * Sony OEM 500490202 Σ-shaped pyrolytic graphite sheet, Hirose BM28/DF40, and 4-point crown ATE pads.
 */
export interface BionzHeroMaterials {
  bionzStiffenerSteel: THREE.MeshPhysicalMaterial;
  bionzIpSlvsDie: THREE.MeshPhysicalMaterial;
  bionzIpIspDie: THREE.MeshPhysicalMaterial;
  bionzIpNpuDie: THREE.MeshPhysicalMaterial;
  bionzIpArmDie: THREE.MeshPhysicalMaterial;
  bionzIpSabinDie: THREE.MeshPhysicalMaterial;
  bionzIpHevcDie: THREE.MeshPhysicalMaterial;
  bionzIpSramDie: THREE.MeshPhysicalMaterial;
  bionzIpC2paDie: THREE.MeshPhysicalMaterial;
  bionzSac305Solder: THREE.MeshPhysicalMaterial;
  bionzPdnPcb: THREE.MeshPhysicalMaterial;
  bionzPoscapTop: THREE.MeshPhysicalMaterial;
  bionzTcxoPcb: THREE.MeshPhysicalMaterial;
  bionzNorPcb: THREE.MeshPhysicalMaterial;
  bionzSigmaGraphite: THREE.MeshPhysicalMaterial;
  bionzSlvsBusPcb: THREE.MeshPhysicalMaterial;
  bionzHdmiPcb: THREE.MeshPhysicalMaterial;
  bionzEsdRclampIc: THREE.MeshPhysicalMaterial;
  bionzSubPmicIc: THREE.MeshPhysicalMaterial;
  bionzInductorR24: THREE.MeshStandardMaterial;
  bionzSubPmicPcb: THREE.MeshPhysicalMaterial;
  bionzAteJtagPcb: THREE.MeshPhysicalMaterial;
  heroList: THREE.Material[];
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

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawBrushedStreaks(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  vertical: boolean,
  count: number,
  seed: number,
  lightAlpha = 0.06,
  darkAlpha = 0.065
): void {
  const rng = mulberry32(seed);
  const half = Math.max(1, count >> 1);
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0; i < half; i++) {
      if (vertical) {
        ctx.rect(rng() * w, 0, 0.8 + rng() * 2.1, h);
      } else {
        ctx.rect(0, rng() * h, w, 0.8 + rng() * 2.1);
      }
    }
    ctx.fillStyle =
      pass === 0
        ? `rgba(255,255,255,${lightAlpha.toFixed(3)})`
        : `rgba(0,0,0,${darkAlpha.toFixed(3)})`;
    ctx.fill();
  }
}

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
      const sz = 1.0 + rng() * 2.0;
      ctx.rect(rng() * w, rng() * h, sz, sz);
    }
    ctx.fillStyle =
      pass === 0
        ? `rgba(255,255,255,${alpha.toFixed(3)})`
        : `rgba(0,0,0,${(alpha * 1.2).toFixed(3)})`;
    ctx.fill();
  }
}

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

/** Shared EUV silicon die macro frame: crack-stop guard ring, CMP dummy fill, power mesh & Vernier ticks */
function drawEuvIpDieFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  c0: string,
  c1: string,
  c2: string,
  labelTop: string,
  labelBot: string,
  seed: number
): void {
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, c0);
  grad.addColorStop(0.5, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle photolithographic standard-cell rows + CMP metal dummy-fill checkerboard
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let y = 36; y < h - 36; y += 10) {
    ctx.fillRect(36, y, w - 72, 4);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 40; i < w - 40; i += 24) {
    ctx.moveTo(i, 36);
    ctx.lineTo(i, h - 36);
    ctx.moveTo(36, i);
    ctx.lineTo(w - 36, i);
  }
  ctx.stroke();

  // Golden power-delivery guard ring + inner Cu VDD/VSS rail + perimeter via stitch dots
  ctx.strokeStyle = '#f2c756';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.strokeStyle = '#d97736';
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  ctx.fillStyle = '#fde68a';
  for (let t = 44; t <= w - 44; t += 24) {
    ctx.fillRect(t - 3, 19, 6, 10);
    ctx.fillRect(t - 3, h - 29, 6, 10);
    ctx.fillRect(19, t - 3, 10, 6);
    ctx.fillRect(w - 29, t - 3, 10, 6);
  }

  // Subtle specular EUV diffraction micro-speckle
  drawMicroGrain(ctx, w, h, 900, seed, 0.032);

  // Crisp reticle macro banners inside upper/lower power guard margin
  ctx.fillStyle = 'rgba(8, 14, 26, 0.68)';
  ctx.fillRect(34, 30, w - 68, 28);
  ctx.fillRect(34, h - 58, w - 68, 28);
  ctx.fillStyle = '#fef3c7';
  ctx.font = '700 17px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(labelTop, w * 0.5, 44);
  ctx.fillStyle = 'rgba(226, 238, 252, 0.88)';
  ctx.font = '700 15px "Courier New", monospace';
  ctx.fillText(labelBot, w * 0.5, h - 44);
}

/** Shared high-density PCB base with matte dark-emerald soldermask, buried copper weave & silkscreen frame */
function drawPcbBackdrop(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  meshRgba: string,
  seed: number
): void {
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 1800, seed, 0.038);

  // Faint buried ground-plane hatched Cu lattice glowing through translucent LPI solder mask
  ctx.strokeStyle = meshRgba;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let i = 20; i < w - 20; i += 22) {
    ctx.moveTo(i, 18);
    ctx.lineTo(i, h - 18);
  }
  for (let j = 20; j < h - 20; j += 22) {
    ctx.moveTo(18, j);
    ctx.lineTo(w - 18, j);
  }
  ctx.stroke();

  // Crisp LPI white silkscreen courtyard border
  ctx.strokeStyle = 'rgba(232, 246, 240, 0.72)';
  ctx.lineWidth = 3;
  ctx.strokeRect(14, 14, w - 28, h - 28);
}

// =============================================================================
// 1. XR08: SUS430 Brushed Low-CTE Stainless Anti-Warpage Stiffener Frame
// =============================================================================
function createBionzStiffenerSteelTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#8d98a6');
  grad.addColorStop(0.28, '#bcc6d2');
  grad.addColorStop(0.55, '#96a1b0');
  grad.addColorStop(0.82, '#cad3de');
  grad.addColorStop(1, '#7f8b9a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Directional cold-rolled SUS430 stainless grain + fine cross-lapping
  drawBrushedStreaks(ctx, w, h, false, 880, 4008, 0.095, 0.09);
  drawBrushedStreaks(ctx, w, h, true, 160, 4009, 0.03, 0.03);

  // Chamfered outer & inner stiffener picture-frame bevel highlights
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, w - 24, h - 24);
  ctx.strokeStyle = 'rgba(34, 42, 54, 0.62)';
  ctx.lineWidth = 5;
  ctx.strokeRect(86, 86, w - 172, h - 172);

  // Pin-1 corner 45-degree laser chamfer index chevron
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(16, 16);
  ctx.lineTo(68, 16);
  ctx.lineTo(16, 68);
  ctx.closePath();
  ctx.fill();

  // Laser-etched stiffener metallurgy & revision stamp along top & bottom rails
  ctx.fillStyle = 'rgba(28, 36, 48, 0.84)';
  ctx.font = '700 20px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SUS430-STF  0.45mm  CTE 10.4ppm/K  LOW-WARP', w * 0.5, 48);
  ctx.fillText('mFCBGA ANTI-WARP RING  REV.C  SONY-XR2', w * 0.5, h - 48);

  return toHiTex(canvas);
}

// =============================================================================
// 2. XR10: SLVS-EC v3.0 8-Lane SerDes RX PHY Optical Die Micrograph
// =============================================================================
function createBionzIpSlvsDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEuvIpDieFrame(
    ctx,
    w,
    h,
    '#082438',
    '#0d4c63',
    '#092c3e',
    'XR10  SLVS-EC v3.0  8-LANE SERDES RX PHY',
    '4.75Gbps/LANE  CTLE+DFE  EMBEDDED-CLK CDR  ECC',
    4010
  );

  // 8 vertical differential lane strips with octagonal T-coil inductive peaking spirals at top
  const laneX0 = 64;
  const laneSpan = (w - 128) / 8;
  for (let i = 0; i < 8; i++) {
    const cx = laneX0 + (i + 0.5) * laneSpan;

    // Lane silicon well backdrop
    ctx.fillStyle = i % 2 === 0 ? 'rgba(6, 182, 212, 0.22)' : 'rgba(14, 116, 144, 0.24)';
    ctx.fillRect(cx - laneSpan * 0.42, 74, laneSpan * 0.84, 492);
    ctx.strokeStyle = 'rgba(103, 232, 249, 0.50)';
    ctx.lineWidth = 1.6;
    ctx.strokeRect(cx - laneSpan * 0.42, 74, laneSpan * 0.84, 492);

    // Octagonal T-coil peaking spiral (inductive bandwidth extension at sensor ingress)
    for (const r of [24, 17, 10]) {
      ctx.strokeStyle = r === 17 ? '#f59e0b' : '#facc15';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      for (let s = 0; s <= 8; s++) {
        const a = (s / 8) * Math.PI * 2 + Math.PI / 8;
        const px = cx + Math.cos(a) * r;
        const py = 124 + Math.sin(a) * r;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // Differential ± paired micro-lines feeding CTLE -> DFE -> 1:10 Deserializer
    ctx.fillStyle = '#f2c75c';
    ctx.fillRect(cx - 11, 166, 7, 386);
    ctx.fillStyle = '#e08134';
    ctx.fillRect(cx + 4, 166, 7, 386);

    // CTLE / DFE equalizer & Slicer horizontal sub-blocks
    for (const by of [224, 314, 412, 492]) {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
      ctx.fillRect(cx - 26, by, 52, 34);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      ctx.strokeRect(cx - 26, by, 52, 34);
    }

    // Lane ID tag
    ctx.fillStyle = '#e0f2fe';
    ctx.font = '700 14px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`L${i}±`, cx, 88);
  }

  // Lower 8b/10b-64b/66b Elastic FIFO, Deskew & CRC/ECC Packet Framer + Dual CDR PLL rings
  ctx.fillStyle = 'rgba(12, 74, 110, 0.88)';
  ctx.fillRect(62, 584, w - 124, 110);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(62, 584, w - 124, 110);

  for (const px of [126, w - 126]) {
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.arc(px, 639, 34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(px, 639, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 20px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CDR-PI  |  DESKEW FIFO  |  64b/66b ECC FRAMER', w * 0.5, 639);

  return toHiTex(canvas);
}

// =============================================================================
// 3. XR11: 16-Bit RAW Front-End ISP (Bayer Demosaic, DPC & Lens Warp) Micrograph
// =============================================================================
function createBionzIpIspDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEuvIpDieFrame(
    ctx,
    w,
    h,
    '#08253a',
    '#0c4a6e',
    '#0f3f4a',
    'XR11  16-BIT LINEAR RAW FRONT-END ISP',
    'DIRECTIONAL BAYER DEMOSAIC  BLC  3x3 DPC  LENS WARP',
    4011
  );

  // Left 4x4 RGBG Bayer directional-demosaic kernel pipeline array
  const colors = ['#dc2626', '#16a34a', '#16a34a', '#2563eb'];
  const labels = ['R16', 'Gr', 'Gb', 'B16'];
  const cell = 104;
  const gap = 10;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const idx = (r % 2) * 2 + (c % 2);
      const x = 66 + c * (cell + gap);
      const y = 78 + r * (cell + gap);
      ctx.fillStyle = colors[idx];
      ctx.fillRect(x, y, cell, cell);
      // Internal 5x5 convolution filter grid striations
      ctx.strokeStyle = 'rgba(255,255,255,0.28)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let k = 1; k < 5; k++) {
        ctx.moveTo(x + (k * cell) / 5, y);
        ctx.lineTo(x + (k * cell) / 5, y + cell);
        ctx.moveTo(x, y + (k * cell) / 5);
        ctx.lineTo(x + cell, y + (k * cell) / 5);
      }
      ctx.stroke();
      ctx.strokeStyle = '#fde68a';
      ctx.lineWidth = 2.2;
      ctx.strokeRect(x, y, cell, cell);
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.font = '800 18px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[idx], x + cell * 0.5, y + cell * 0.5);
    }
  }

  // Right column: 2D Geometric Lens Distortion & Focus Breathing Cubic-Spline Warp Engine
  const wx = 534;
  const wy = 78;
  const ww = 168;
  const wh = 446;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
  ctx.fillRect(wx, wy, ww, wh);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(wx, wy, ww, wh);

  // Curved barrel/pincushion distortion correction warp mesh grid
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.8;
  for (let g = 1; g <= 6; g++) {
    const t = g / 7;
    ctx.beginPath();
    ctx.moveTo(wx + 12, wy + 24 + t * (wh - 48));
    ctx.quadraticCurveTo(wx + ww * 0.5, wy + 24 + t * (wh - 48) + (t - 0.5) * 42, wx + ww - 12, wy + 24 + t * (wh - 48));
    ctx.stroke();
  }
  for (let g = 1; g <= 4; g++) {
    const t = g / 5;
    ctx.beginPath();
    ctx.moveTo(wx + 12 + t * (ww - 24), wy + 24);
    ctx.quadraticCurveTo(wx + 12 + t * (ww - 24) + (t - 0.5) * 32, wy + wh * 0.5, wx + 12 + t * (ww - 24), wy + wh - 24);
    ctx.stroke();
  }
  ctx.fillStyle = '#fde68a';
  ctx.font = '700 15px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BREATHING', wx + ww * 0.5, wy + 20);
  ctx.fillText('2D-WARP', wx + ww * 0.5, wy + wh - 18);

  // Bottom Optical Black Level Clamp (BLC) & 3x3 Defect Pixel Correction (DPC) bar
  ctx.fillStyle = '#0a0f18';
  ctx.fillRect(66, 548, 636, 138);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(66, 548, 636, 138);
  for (let i = 0; i < 16; i++) {
    ctx.fillStyle = i < 6 ? '#1e293b' : i % 3 === 0 ? '#d97736' : '#0284c7';
    ctx.fillRect(80 + i * 38, 566, 28, 72);
  }
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '700 17px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('OPTICAL BLACK CLAMP (BLC)  |  3x3 DPC MEDIAN  |  16b LINEAR WB', w * 0.5, 662);

  return toHiTex(canvas);
}

// =============================================================================
// 4. XR14: BIONZ XR2 Integrated AI NPU Systolic Tensor Array Die Micrograph
// =============================================================================
function createBionzIpNpuDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEuvIpDieFrame(
    ctx,
    w,
    h,
    '#240b4d',
    '#4c1d95',
    '#1e1b4b',
    'XR14  BIONZ XR2 INTEGRATED AI NPU (TENSOR MAC)',
    '8x8 SYSTOLIC ARRAY  INT4/INT8/BF16  POSE-SKELETON ENGINE',
    4014
  );

  // North Weight-SRAM double-bank butterfly buffer
  ctx.fillStyle = '#0f2d52';
  ctx.fillRect(168, 74, 534, 82);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(168, 74, 534, 82);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.36)';
  for (let sx = 180; sx < 688; sx += 16) {
    ctx.fillRect(sx, 84, 10, 62);
  }
  ctx.fillStyle = '#e0f2fe';
  ctx.font = '700 17px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('WEIGHT-SRAM DOUBLE BUFFER (INT4/INT8)', 435, 116);

  // West Activation Vector FIFO & Zero-Skip Sparsity Gate
  ctx.fillStyle = '#3b1d0a';
  ctx.fillRect(66, 174, 84, 412);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(66, 174, 84, 412);
  ctx.fillStyle = 'rgba(245, 158, 11, 0.40)';
  for (let sy = 188; sy < 572; sy += 24) {
    ctx.fillRect(76, sy, 64, 14);
  }

  // 8x8 Systolic MAC Processing Element (PE) Matrix with diagonal wavefront rails!
  const gx0 = 172;
  const gy0 = 174;
  const peStep = 66;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const px = gx0 + c * peStep;
      const py = gy0 + r * 51.5;
      const diag = (r + c) % 4;
      ctx.fillStyle = diag === 0 ? '#7c3aed' : diag === 1 ? '#6d28d9' : diag === 2 ? '#5b21b6' : '#4338ca';
      ctx.fillRect(px, py, 56, 42);
      // Internal MAC multiplier + accumulator gold pad
      ctx.fillStyle = diag === 0 ? '#facc15' : 'rgba(248, 200, 88, 0.65)';
      ctx.fillRect(px + 6, py + 6, 18, 14);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.58)';
      ctx.fillRect(px + 28, py + 6, 22, 30);
      ctx.strokeStyle = '#f5d06e';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(px, py, 56, 42);
    }
  }

  // Diagonal systolic wavefront propagation streaks
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.42)';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  for (let d = -3; d <= 5; d++) {
    ctx.moveTo(gx0 + Math.max(0, d) * peStep, gy0 + Math.max(0, -d) * 51.5);
    ctx.lineTo(gx0 + Math.min(8, d + 8) * peStep, gy0 + Math.min(8, 8 - d) * 51.5);
  }
  ctx.stroke();

  // South Accumulator + ReLU/GELU + Human/Animal/Bird Pose-Keypoint Post-Processor
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(66, 604, 636, 86);
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(66, 604, 636, 86);
  ctx.fillStyle = '#f3e8ff';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BF16 ACCUMULATOR  |  ZERO-SKIP  |  6-SUBJECT POSE KEYPOINT', w * 0.5, 648);

  return toHiTex(canvas);
}

// =============================================================================
// 5. XR15: Quad-Core ARM Cortex-A35 AMP Cluster (8-Stage In-Order Pipeline)
// =============================================================================
function createBionzIpArmDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEuvIpDieFrame(
    ctx,
    w,
    h,
    '#0b1e48',
    '#17326e',
    '#0e2954',
    'XR15  QUAD-CORE ARM CORTEX-A35 (AMP DUAL-OS)',
    '8-STAGE IN-ORDER  NEON/VFPv4  SCU+L2  GIC-400',
    4015
  );

  // 4 distinct Cortex-A35 cores (Top 2 = Linux UI, Bottom 2 = uITRON RTOS)
  const cores: Array<[number, number, string, string]> = [
    [66, 76, 'A35 CORE 0  LINUX-UI', '#1d4ed8'],
    [408, 76, 'A35 CORE 1  LINUX-UI', '#1d4ed8'],
    [66, 412, 'A35 CORE 2  uITRON-RT', '#0f766e'],
    [408, 412, 'A35 CORE 3  uITRON-RT', '#0f766e'],
  ];
  for (const [cx, cy, title, tint] of cores) {
    const cw = 294;
    const ch = 266;
    ctx.fillStyle = tint;
    ctx.fillRect(cx, cy, cw, ch);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.strokeRect(cx, cy, cw, ch);

    // L1 I-Cache (top-left) & L1 D-Cache (top-right) structured SRAM mats
    for (const [sx, lbl] of [
      [cx + 12, 'L1-I$ 32KB'],
      [cx + 154, 'L1-D$ 32KB'],
    ] as Array<[number, string]>) {
      ctx.fillStyle = '#0c2348';
      ctx.fillRect(sx, cy + 36, 128, 92);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      ctx.strokeRect(sx, cy + 36, 128, 92);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.34)';
      for (let ry = cy + 44; ry < cy + 122; ry += 8) {
        ctx.fillRect(sx + 6, ry, 54, 4);
        ctx.fillRect(sx + 68, ry, 54, 4);
      }
      ctx.fillStyle = '#bae6fd';
      ctx.font = '700 13px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(lbl, sx + 64, cy + 84);
    }

    // 8-stage in-order pipeline strip (IF1-IF2-ID-ISS-EX1-EX2-WR)
    for (let st = 0; st < 8; st++) {
      ctx.fillStyle = st % 2 === 0 ? 'rgba(245, 197, 66, 0.72)' : 'rgba(217, 119, 54, 0.72)';
      ctx.fillRect(cx + 14 + st * 34, cy + 142, 28, 42);
    }

    // 128-bit NEON SIMD / VFPv4 FPU execution bar along bottom of core
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(cx + 12, cy + 196, cw - 24, 56);
    ctx.strokeStyle = '#f2c852';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(cx + 12, cy + 196, cw - 24, 56);
    ctx.fillStyle = '#fef3c7';
    ctx.font = '700 15px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('128b NEON SIMD / VFPv4 FPU', cx + cw * 0.5, cy + 225);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 15px "Courier New", monospace';
    ctx.fillText(title, cx + cw * 0.5, cy + 19);
  }

  // Central Coherent SCU + Shared L2 Cache + GIC-400 Crossbar Spine
  ctx.fillStyle = '#09152b';
  ctx.fillRect(66, 354, 636, 48);
  ctx.fillRect(368, 76, 32, 602);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.4;
  ctx.strokeRect(66, 354, 636, 48);
  ctx.fillStyle = '#fef08a';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SCU COHERENCY  |  SHARED L2$  |  GIC-400 INTERRUPT HUB', w * 0.5, 378);

  return toHiTex(canvas);
}

// =============================================================================
// 6. XR16: Sony Proprietary 32-Bit SA DSP ("sabin") + 759pt PDAF + 5-Axis IBIS
// =============================================================================
function createBionzIpSabinDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEuvIpDieFrame(
    ctx,
    w,
    h,
    '#062b2c',
    '#0f5257',
    '#0b3544',
    'XR16  SONY 32-BIT SA DSP "SABIN" + AF/IBIS CORE',
    '16-REG VLIW  759-PT L/R PDAF  60Hz AF/AE  5-AXIS IBIS PID',
    4016
  );

  // Left: Sony custom 32-bit SA DSP "sabin" 16-register VLIW Core + TCM SRAM
  ctx.fillStyle = '#113a3d';
  ctx.fillRect(66, 78, 286, 454);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 3;
  ctx.strokeRect(66, 78, 286, 454);
  // 16 discrete 32-bit register file rows
  for (let r = 0; r < 16; r++) {
    ctx.fillStyle = r % 2 === 0 ? 'rgba(250, 204, 21, 0.56)' : 'rgba(217, 119, 54, 0.52)';
    ctx.fillRect(82, 114 + r * 24, 122, 16);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.42)';
    ctx.fillRect(214, 114 + r * 24, 122, 16);
  }
  ctx.fillStyle = '#fef3c7';
  ctx.font = '700 17px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SA DSP "SABIN" R0..R15', 209, 98);
  ctx.fillText('32b VLIW + TCM SRAM', 209, 514);

  // Right: 759-Point Left/Right Interleaved PDAF Phase-Difference Correlator
  ctx.fillStyle = '#0c273d';
  ctx.fillRect(374, 78, 328, 454);
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 3;
  ctx.strokeRect(374, 78, 328, 454);
  for (let row = 0; row < 12; row++) {
    const ry = 118 + row * 31;
    // Left half-pixel & Right half-pixel correlation shift comb
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(392, ry, 134, 11);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(422 + (row % 3) * 14, ry + 13, 134, 11);
    // Phase-shift delta gauge ticks
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(622, ry + 6, 62, 12);
  }
  ctx.fillStyle = '#ccfbf1';
  ctx.font = '700 17px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('759-PT PDAF L/R CORRELATOR', 538, 98);
  ctx.fillText('PHASE Δx -> LENS VCM TARGET', 538, 514);

  // South: 5-Axis IBIS Gyro-Fusion PID Servo Ring (Pitch, Yaw, Roll, X, Y)
  const axes = ['PITCH', 'YAW', 'ROLL', 'SHIFT-X', 'SHIFT-Y'];
  for (let a = 0; a < 5; a++) {
    const ax = 66 + a * 129;
    ctx.fillStyle = a === 2 ? '#7c2d12' : '#134e4a';
    ctx.fillRect(ax, 554, 118, 136);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.4;
    ctx.strokeRect(ax, 554, 118, 136);
    ctx.strokeStyle = '#5eead4';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.arc(ax + 59, 616, 30, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#fef3c7';
    ctx.font = '700 14px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(axes[a], ax + 59, 574);
    ctx.fillText('PID 1kHz', ax + 59, 672);
  }

  return toHiTex(canvas);
}

// =============================================================================
// 7. XR17: 8K30p/4K120p 10-Bit 4:2:2 HEVC Hardware Video Codec Micrograph
// =============================================================================
function createBionzIpHevcDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEuvIpDieFrame(
    ctx,
    w,
    h,
    '#3d081d',
    '#7a1030',
    '#4c0b24',
    'XR17  8K30p / 4K120p 10-BIT 4:2:2 HEVC CODEC',
    '64x64 CTU QUADTREE  ME+INTRA35  SAO  600Mbps CABAC',
    4017
  );

  // Authentic recursive H.265/HEVC CTU 64->32->16->8 Quadtree Partitioning macro layout!
  // 64x64 top-left block
  ctx.fillStyle = '#9f1239';
  ctx.fillRect(66, 78, 306, 306);
  ctx.strokeStyle = '#fecdd3';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(66, 78, 306, 306);
  ctx.fillStyle = '#fff1f2';
  ctx.font = '800 28px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CTU 64×64', 219, 214);
  ctx.font = '700 16px "Courier New", monospace';
  ctx.fillText('MOTION ESTIMATION SRAM', 219, 256);

  // 32x32 top-right block
  ctx.fillStyle = '#be123c';
  ctx.fillRect(388, 78, 314, 148);
  ctx.strokeStyle = '#fde68a';
  ctx.lineWidth = 3;
  ctx.strokeRect(388, 78, 314, 148);
  ctx.fillStyle = '#fef3c7';
  ctx.font = '800 22px "Courier New", monospace';
  ctx.fillText('CU 32×32  INTRA-35', 545, 152);

  // 4x 16x16 sub-CUs + 4x 8x8 TU quadrants
  const subCUs: Array<[number, number, string, string]> = [
    [388, 240, '16×16', '#d97706'],
    [550, 240, '16×16', '#b45309'],
    [388, 318, '8×8 TU', '#0284c7'],
    [550, 318, '8×8 TU', '#0369a1'],
  ];
  for (const [sx, sy, lbl, col] of subCUs) {
    ctx.fillStyle = col;
    ctx.fillRect(sx, sy, 152, 66);
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2;
    ctx.strokeRect(sx, sy, 152, 66);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 17px "Courier New", monospace';
    ctx.fillText(lbl, sx + 76, sy + 33);
  }

  // Mid Deblocking + Sample Adaptive Offset (SAO) Loop Filter strip
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(66, 404, 636, 98);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(66, 404, 636, 98);
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.36)' : 'rgba(250, 204, 21, 0.36)';
    ctx.fillRect(80 + i * 51, 418, 42, 42);
  }
  ctx.fillStyle = '#e0f2fe';
  ctx.font = '700 17px "Courier New", monospace';
  ctx.fillText('DCT/DST 32x32  |  DEBLOCK + SAO IN-LOOP FILTER', w * 0.5, 482);

  // Bottom Pipelined Multi-Bin CABAC Entropy Coder (600Mbps XAVC S-I)
  ctx.fillStyle = '#7c2d12';
  ctx.fillRect(66, 520, 636, 170);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 3;
  ctx.strokeRect(66, 520, 636, 170);
  for (let b = 0; b < 8; b++) {
    ctx.fillStyle = b % 2 === 0 ? '#f59e0b' : '#ea580c';
    ctx.fillRect(84 + b * 76, 542, 62, 82);
  }
  ctx.fillStyle = '#fef3c7';
  ctx.font = '700 20px "Courier New", monospace';
  ctx.fillText('PIPELINED CABAC ENTROPY CODER  |  XAVC HS / S-I 600Mbps', w * 0.5, 658);

  return toHiTex(canvas);
}

// =============================================================================
// 8. XR19: Shared L2/L3 6T-SRAM & ISP Line-Buffer 8-Bank Butterfly Micrograph
// =============================================================================
function createBionzIpSramDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEuvIpDieFrame(
    ctx,
    w,
    h,
    '#091c38',
    '#123463',
    '#0a2244',
    'XR19  SHARED L2/L3 6T-SRAM & ISP LINE-BUFFER',
    '8-BANK BUTTERFLY  LOCAL SENSE-AMP  SEC-DED ECC  REPAIR',
    4019
  );

  // Central vertical Row Pre-Decoder & Wordline Driver spine
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(w * 0.5 - 32, 74, 64, h - 148);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(w * 0.5 - 32, 74, 64, h - 148);
  ctx.fillStyle = '#f2c852';
  for (let wy = 88; wy < h - 88; wy += 14) {
    ctx.fillRect(w * 0.5 - 22, wy, 44, 6);
  }

  // 8 Symmetric Butterfly 6T-SRAM Bitcell Sub-Arrays (4 Left + 4 Right)
  for (const side of [0, 1]) {
    const bx = side === 0 ? 64 : w * 0.5 + 42;
    const bw = 280;
    for (let b = 0; b < 4; b++) {
      const by = 78 + b * 154;
      const bh = 136;

      const bg = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
      bg.addColorStop(0, '#0284c7');
      bg.addColorStop(0.5, '#1d4ed8');
      bg.addColorStop(1, '#0369a1');
      ctx.fillStyle = bg;
      ctx.fillRect(bx, by, bw, bh);

      // Ultra-dense horizontal wordline & vertical bitline 6T-SRAM optical diffraction grating
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.38)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let y = by + 4; y < by + bh; y += 5) {
        ctx.moveTo(bx, y);
        ctx.lineTo(bx + bw, y);
      }
      for (let x = bx + 10; x < bx + bw; x += 10) {
        ctx.moveTo(x, by);
        ctx.lineTo(x, by + bh);
      }
      ctx.stroke();

      // Horizontal Local Sense-Amplifier + Write-Driver bar bisecting each sub-array
      ctx.fillStyle = '#facc15';
      ctx.fillRect(bx, by + bh * 0.5 - 8, bw, 16);
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 12px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`BANK ${side * 4 + b}  SENSE-AMP / WR-DRV`, bx + bw * 0.5, by + bh * 0.5);

      // Dedicated SEC-DED ECC parity column strip on outer flank
      ctx.fillStyle = 'rgba(217, 119, 54, 0.72)';
      ctx.fillRect(side === 0 ? bx : bx + bw - 26, by, 26, bh);

      ctx.strokeStyle = '#fde68a';
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, by, bw, bh);
    }
  }

  return toHiTex(canvas);
}

// =============================================================================
// 9. XR21: C2PA Hardware Root-of-Trust Active-Shield Serpentine Vault Micrograph
// =============================================================================
function createBionzIpC2paDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEuvIpDieFrame(
    ctx,
    w,
    h,
    '#2a1b06',
    '#4a2e0a',
    '#1f1407',
    'XR21  C2PA HARDWARE ROOT-OF-TRUST ENCLAVE',
    'ACTIVE-SHIELD MESH  SRAM-PUF  TRNG  ECDSA-P384 / SHA-384',
    4021
  );

  // Dark octagonal cryptographic vault chamber
  ctx.fillStyle = '#0c1018';
  ctx.beginPath();
  const cx = w * 0.5;
  const cy = h * 0.5;
  const R = 290;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const px = cx + Math.cos(a) * R;
    const py = cy + Math.sin(a) * R;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Continuous golden Active-Shield top-metal serpentine anti-tamper labyrinth!
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 4.2;
  ctx.beginPath();
  const xL = 176;
  const xR = w - 176;
  let dir = 1;
  for (let y = 148; y <= h - 148; y += 22) {
    if (y === 148) ctx.moveTo(xL, y);
    else ctx.lineTo(dir > 0 ? xL : xR, y);
    ctx.lineTo(dir > 0 ? xR : xL, y);
    dir = -dir;
  }
  ctx.stroke();

  // Secondary orthogonal differential tamper-sense under-mesh
  ctx.strokeStyle = 'rgba(217, 119, 54, 0.55)';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let x = 196; x <= w - 196; x += 28) {
    ctx.moveTo(x, 154);
    ctx.lineTo(x, h - 154);
  }
  ctx.stroke();

  // 4 corner optical/voltage/clock-glitch fault-injection detectors
  const detectors: Array<[number, number, string]> = [
    [106, 116, 'LIGHT'],
    [w - 106, 116, 'VDD-G'],
    [106, h - 116, 'CLK-G'],
    [w - 106, h - 116, 'TEMP'],
  ];
  for (const [dx, dy, tag] of detectors) {
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.arc(dx, dy, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.6;
    ctx.stroke();
    ctx.fillStyle = '#fef3c7';
    ctx.font = '700 13px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tag, dx, dy);
  }

  // Central ECDSA-P384 & SRAM-PUF Key-Vault emblem
  ctx.fillStyle = 'rgba(153, 27, 27, 0.90)';
  ctx.fillRect(cx - 122, cy - 72, 244, 144);
  ctx.strokeStyle = '#fde68a';
  ctx.lineWidth = 4;
  ctx.strokeRect(cx - 122, cy - 72, 244, 144);
  ctx.fillStyle = '#fffbeb';
  ctx.font = '800 28px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('C2PA RoT', cx, cy - 22);
  ctx.font = '700 18px "Courier New", monospace';
  ctx.fillText('SRAM-PUF / TRNG', cx, cy + 16);
  ctx.fillText('ECDSA-P384 SIGN', cx, cy + 44);

  return toHiTex(canvas);
}

// =============================================================================
// 10. XR36: SAC305 (Sn-3.0Ag-0.5Cu) Solidified β-Sn Dendritic Eutectic Solder Tile
// =============================================================================
function createBionzSac305SolderTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#cfd6e0';
  ctx.fillRect(0, 0, s, s);

  // Solidified β-Sn polycrystalline lobes + fine Ag3Sn / Cu6Sn5 eutectic sparkle network
  const rng = mulberry32(4036);
  for (let i = 0; i < 96; i++) {
    const x = rng() * s;
    const y = rng() * s;
    const r = 9 + rng() * 24;
    const v = Math.round(186 + rng() * 62);
    ctx.fillStyle = `rgba(${v}, ${v + 2}, ${Math.min(255, v + 6)}, 0.44)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // Dendritic eutectic grain boundaries
  ctx.strokeStyle = 'rgba(92, 102, 118, 0.22)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i < 70; i++) {
    const x = rng() * s;
    const y = rng() * s;
    const ang = rng() * Math.PI * 2;
    const len = 10 + rng() * 26;
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
  }
  ctx.stroke();

  // Bright Ag3Sn specular micro-needles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.34)';
  for (let i = 0; i < 180; i++) {
    ctx.fillRect(rng() * s, rng() * s, 1.5 + rng() * 2.4, 1.2);
  }

  return toTileTex(canvas, 2, 2);
}

// =============================================================================
// 11. XR37: SY-1122 4-Phase Core VRM Heavy-Copper PDN PCB Texture
// =============================================================================
function createBionzPdnPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawPcbBackdrop(ctx, w, h, '#0b3d2e', 'rgba(42, 168, 122, 0.20)', 4037);

  // Heavy 2oz VDD_CORE (right) and PGND (left) copper power pours
  ctx.fillStyle = 'rgba(205, 124, 58, 0.42)';
  ctx.fillRect(548, 36, 178, h - 72);
  ctx.strokeStyle = '#e59246';
  ctx.lineWidth = 3;
  ctx.strokeRect(548, 36, 178, h - 72);

  ctx.fillStyle = 'rgba(222, 184, 78, 0.32)';
  ctx.fillRect(42, 36, 130, h - 72);
  ctx.strokeStyle = '#f2c852';
  ctx.lineWidth = 3;
  ctx.strokeRect(42, 36, 130, h - 72);

  // 4-phase switching-node copper islands linking U101 PMIC to L101–L104
  for (let ph = 0; ph < 4; ph++) {
    const py = 92 + ph * 124;
    ctx.fillStyle = 'rgba(56, 189, 148, 0.34)';
    ctx.fillRect(360, py, 178, 86);
    ctx.strokeStyle = 'rgba(232, 248, 242, 0.78)';
    ctx.lineWidth = 2;
    ctx.strokeRect(360, py, 178, 86);
    ctx.fillStyle = '#e6faf2';
    ctx.font = '700 18px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`L10${ph + 1} SW${ph}`, 449, py + 48);
  }

  // Stitched thermal via farm rings along VDD_CORE & PGND pours
  for (let vy = 62; vy <= h - 62; vy += 34) {
    for (const vx of [82, 126, 608, 668]) {
      ctx.fillStyle = '#f2cb58';
      ctx.beginPath();
      ctx.arc(vx, vy, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#07241c';
      ctx.beginPath();
      ctx.arc(vx, vy, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // QFN-48 PMIC & Dual POSCAP courtyard outlines + silkscreen legends
  ctx.strokeStyle = 'rgba(240, 252, 246, 0.85)';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(184, 108, 160, 172);
  ctx.strokeRect(184, 526, 168, 92);
  ctx.strokeRect(184, 636, 168, 92);
  ctx.fillStyle = '#f0fdf4';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SY-1122 4-PH VRM  0.75V 32A', w * 0.5, 32);
  ctx.fillText('U101 CXD5702', 264, 96);
  ctx.fillText('C151/C152 POSCAP', 268, 514);
  ctx.fillText('R010 KELVIN SHUNT', 268, 434);

  return toHiTex(canvas);
}

// =============================================================================
// 12. XR37: Authentic Panasonic POSCAP (TPF/TPB) Polymer-Tantalum Top Marking
// =============================================================================
function createBionzPoscapTopTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Real Panasonic POSCAPs have a sleek dark charcoal-black molded epoxy body!
  ctx.fillStyle = '#181c22';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3000, 4137, 0.068);

  // Subtle molded chamfer border
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.34)';
  ctx.lineWidth = 10;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Crisp Panasonic white/silver laser-etched ANODE (+) polarity bar on left end!
  ctx.fillStyle = 'rgba(236, 242, 248, 0.92)';
  ctx.fillRect(44, 44, 112, h - 88);
  ctx.fillStyle = '#181c22';
  ctx.font = '900 108px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('+', 100, h * 0.5);

  // Authentic Panasonic POSCAP capacitance/voltage/lot laser code (330uF 2.5V TPF low-ESR)
  ctx.fillStyle = 'rgba(236, 242, 250, 0.94)';
  ctx.textAlign = 'left';
  ctx.font = '800 144px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('330', 214, h * 0.33);
  ctx.fillStyle = 'rgba(206, 218, 232, 0.88)';
  ctx.font = '700 84px "Courier New", monospace';
  ctx.fillText('e8  2R5', 218, h * 0.62);
  ctx.fillStyle = 'rgba(176, 192, 210, 0.78)';
  ctx.font = '700 44px "Courier New", monospace';
  ctx.fillText('POSCAP TPF  6mΩ', 218, h * 0.82);

  return toHiTex(canvas);
}

// =============================================================================
// 13. XR38: Isolated 24.000 MHz TCXO Clock-Island PCB with 360° GND Guard Moat
// =============================================================================
function createBionzTcxoPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawPcbBackdrop(ctx, w, h, '#0a3d31', 'rgba(48, 178, 134, 0.22)', 4038);

  // Isolated concentric copper GND guard ring enclosing crystal oscillator
  ctx.strokeStyle = '#e5a846';
  ctx.lineWidth = 18;
  ctx.strokeRect(46, 46, w - 92, h - 92);
  ctx.strokeStyle = '#07271f';
  ctx.lineWidth = 12;
  ctx.strokeRect(72, 72, w - 144, h - 144);

  // 4 corner gold ENIG castellation solder pads for 2520 TCXO footprint
  for (const [px, py] of [
    [164, 184],
    [w - 164, 184],
    [164, 520],
    [w - 164, 520],
  ]) {
    ctx.fillStyle = '#f2cb58';
    ctx.fillRect(px - 52, py - 42, 104, 84);
  }

  // Coplanar 50-ohm shielded 24.000MHz clock output trace exiting lower edge
  ctx.fillStyle = '#38d39f';
  ctx.fillRect(w * 0.5 - 12, 520, 24, 210);
  ctx.strokeStyle = '#f2c852';
  ctx.lineWidth = 4;
  ctx.strokeRect(w * 0.5 - 26, 520, 52, 210);

  // Silkscreen reference designators & Pin-1 dot
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(108, 132, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = '700 24px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('X101  24.000MHz TCXO  GND-ISLAND', w * 0.5, 114);
  ctx.font = '700 20px "Courier New", monospace';
  ctx.fillText('C181 C0G       R181 50Ω       C182 C0G', w * 0.5, 654);

  return toHiTex(canvas);
}

// =============================================================================
// 14. XR39: 256Mb Octal-SPI Boot NOR Flash 16-SOP PCB Texture
// =============================================================================
function createBionzNorPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawPcbBackdrop(ctx, w, h, '#0b3e30', 'rgba(46, 174, 130, 0.22)', 4039);

  // 8 length-matched Octal-SPI (D0..D7 / SCLK / DQS / CS#) traces with serpentine jogs
  for (let i = 0; i < 8; i++) {
    const x = 96 + i * 62;
    ctx.strokeStyle = i % 2 === 0 ? '#34d399' : '#f2c852';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, 60);
    ctx.lineTo(x, 168);
    if (i === 0 || i === 1 || i === 6 || i === 7) {
      ctx.lineTo(x + 14, 184);
      ctx.lineTo(x - 14, 200);
      ctx.lineTo(x, 216);
    }
    ctx.lineTo(x, 708);
    ctx.stroke();

    // Top & bottom 16-SOP gull-wing gold ENIG solder pads
    ctx.fillStyle = '#f2cb58';
    ctx.fillRect(x - 14, 142, 28, 56);
    ctx.fillRect(x - 14, 570, 28, 56);
  }

  // Right bypass MLCC + pull-up resistor courtyards & crisp white silkscreen
  ctx.strokeStyle = 'rgba(240, 253, 244, 0.85)';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(72, 214, 496, 340);
  ctx.fillStyle = '#f0fdf4';
  ctx.font = '700 22px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('U204  MX25UM25645G  16-SOP  OCTAL-SPI', 320, 42);
  ctx.font = '700 18px "Courier New", monospace';
  ctx.fillText('D0 D1 D2 D3 D4 D5 D6 D7  200MHz DTR', 320, 732);
  ctx.fillText('C204', 654, 176);
  ctx.fillText('R201-3', 654, 444);

  return toHiTex(canvas);
}

// =============================================================================
// 15. XR40: Sony OEM 500490202 Σ-Shaped Pyrolytic Graphite Thermal Sheet (PGS)
// =============================================================================
function createBionzSigmaGraphiteTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Anisotropic metallic-charcoal Pyrolytic Graphite Sheet (k ≈ 1700 W/m·K)
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#1e222a');
  grad.addColorStop(0.24, '#363c48');
  grad.addColorStop(0.48, '#232831');
  grad.addColorStop(0.72, '#3d4452');
  grad.addColorStop(1, '#1a1e25');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Directional graphitic basal-plane micro-sheen & crystalline carbon-flake specular grain
  drawBrushedStreaks(ctx, w, h, false, 780, 4040, 0.085, 0.08);
  const rng = mulberry32(4041);
  for (let i = 0; i < 620; i++) {
    const fx = rng() * w;
    const fy = rng() * h;
    ctx.fillStyle = i % 3 === 0 ? 'rgba(203, 213, 225, 0.16)' : 'rgba(100, 116, 139, 0.14)';
    ctx.fillRect(fx, fy, 4 + rng() * 14, 1.5 + rng() * 2.5);
  }

  // Subtle horizontal Σ-fold bend crease witness lines
  for (const fy of [196, 384, 572]) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(0, fy - 4, w, 3);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.fillRect(0, fy, w, 4);
  }

  // Translucent amber PET/Polyimide perimeter die-cut flake-seal tape edge
  ctx.strokeStyle = 'rgba(217, 152, 54, 0.64)';
  ctx.lineWidth = 18;
  ctx.strokeRect(12, 12, w - 24, h - 24);
  ctx.strokeStyle = 'rgba(253, 230, 138, 0.34)';
  ctx.lineWidth = 3;
  ctx.strokeRect(26, 26, w - 52, h - 52);

  // Authentic Sony OEM service-manual laser stencil
  ctx.fillStyle = 'rgba(226, 234, 244, 0.78)';
  ctx.font = '700 28px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SONY  500490202  MB GRAPHITE TOP A (5800)', w * 0.5, 118);
  ctx.font = '700 22px "Courier New", monospace';
  ctx.fillStyle = 'rgba(203, 213, 225, 0.68)';
  ctx.fillText('PYROLYTIC GRAPHITE  k=1700W/m·K  Σ-FOLD BRIDGE', w * 0.5, 652);

  return toHiTex(canvas);
}

// =============================================================================
// 16. XR41: 8-Lane SLVS-EC 2.0 100Ω Differential Microstrip Bus PCB (Megtron-6)
// =============================================================================
function createBionzSlvsBusPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawPcbBackdrop(ctx, w, h, '#093433', 'rgba(34, 197, 174, 0.20)', 4041);

  // 8 length-matched 100-ohm differential pair channels with trombone skew-matching meanders
  for (let lane = 0; lane < 8; lane++) {
    const cx = 78 + lane * 87.5;
    for (const pol of [-10, 10]) {
      ctx.strokeStyle = pol < 0 ? '#e08134' : '#f2c852';
      ctx.lineWidth = 4.2;
      ctx.beginPath();
      ctx.moveTo(cx + pol, 48);
      ctx.lineTo(cx + pol, 320);
      if (lane <= 1 || lane >= 6) {
        for (let m = 0; m < 4; m++) {
          const my = 320 + m * 24;
          ctx.lineTo(cx + pol + (m % 2 === 0 ? 12 : -12), my + 12);
          ctx.lineTo(cx + pol, my + 24);
        }
      }
      ctx.lineTo(cx + pol, 560);
      ctx.stroke();
    }

    // Coplanar GND guard-via stitching fence between lanes
    if (lane < 7) {
      const gx = cx + 43.75;
      for (let gy = 80; gy <= 520; gy += 56) {
        ctx.fillStyle = '#f2cb58';
        ctx.beginPath();
        ctx.arc(gx, gy, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#06201f';
        ctx.beginPath();
        ctx.arc(gx, gy, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = '#ccfbf1';
    ctx.font = '700 16px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`L${lane}±`, cx, 68);
  }

  // 48-pin Hirose BM28/DF40 B2B connector landing courtyard along lower strip
  ctx.fillStyle = '#072221';
  ctx.fillRect(46, 566, w - 92, 152);
  ctx.strokeStyle = '#f0fdfa';
  ctx.lineWidth = 3;
  ctx.strokeRect(46, 566, w - 92, 152);
  ctx.fillStyle = '#f2cb58';
  for (let p = 0; p < 24; p++) {
    const px = 72 + p * 26.5;
    ctx.fillRect(px, 580, 12, 34);
    ctx.fillRect(px, 668, 12, 34);
  }
  ctx.fillStyle = '#f0fdfa';
  ctx.font = '700 20px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CN401  HIROSE 48P B2B  SLVS-EC 2.0  100Ω DIFF', w * 0.5, 642);

  return toHiTex(canvas);
}

// =============================================================================
// 17. XR42: HDMI 2.1 48Gbps FRL Flow-Through Retimer & ESD PCB
// =============================================================================
function createBionzHdmiPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawPcbBackdrop(ctx, w, h, '#0a3a30', 'rgba(42, 178, 134, 0.22)', 4042);

  // 4 straight-through 100-ohm HDMI 2.1 FRL differential lanes (D0±, D1±, D2±, D3/CLK±)
  const laneLabels = ['FRL0±', 'FRL1±', 'FRL2±', 'FRL3±'];
  for (let ch = 0; ch < 4; ch++) {
    const lx = 148 + ch * 114;
    for (const pol of [-10, 10]) {
      ctx.strokeStyle = pol < 0 ? '#e08134' : '#f2c852';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(lx + pol, 46);
      ctx.lineTo(lx + pol, 722);
      ctx.stroke();
    }
    ctx.fillStyle = '#e0f2fe';
    ctx.font = '700 17px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(laneLabels[ch], lx, 62);
  }

  // Rectangular 4x6mm WQFN-40 (RNQ) Retimer courtyard & exposed thermal center pad
  ctx.fillStyle = 'rgba(242, 200, 82, 0.24)';
  ctx.fillRect(184, 126, 256, 368);
  ctx.strokeStyle = '#f0fdfa';
  ctx.lineWidth = 3;
  ctx.strokeRect(172, 114, 280, 392);

  // Twin Semtech RClamp0524P flow-through ESD courtyards straddling the 4 differential lanes
  for (const ex of [140, 368]) {
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.strokeRect(ex, 548, 198, 92);
    // Central GND pad (pins 3 & 8) with stitched ground vias
    ctx.fillStyle = '#f2cb58';
    ctx.fillRect(ex + 82, 558, 34, 72);
  }

  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 19px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('U601 TI TDP2004 WQFN-40', 312, 98);
  ctx.fillText('D601 / D602  RCLAMP0524P FLOW-THROUGH', 338, 672);
  ctx.fillText('Q601 5V-SW', 642, 650);

  return toHiTex(canvas);
}

// =============================================================================
// 18. XR42: Semtech RClamp0524P (SLP2510P8) Flow-Through ±15kV ESD Top Mark
// =============================================================================
function createBionzEsdRclampIcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#161a22';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 2600, 4142, 0.068);

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.36)';
  ctx.lineWidth = 10;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Authentic Semtech vertical Pin-1 orientation laser stripe on left edge
  ctx.fillStyle = 'rgba(236, 242, 250, 0.92)';
  ctx.fillRect(58, 76, 36, h - 152);

  // Crisp laser marking: "0524P" + date lot + 0.3pF ±15kV spec
  ctx.fillStyle = 'rgba(236, 244, 252, 0.94)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 156px "Courier New", monospace';
  ctx.fillText('0524P', w * 0.54, h * 0.38);
  ctx.fillStyle = 'rgba(186, 206, 228, 0.84)';
  ctx.font = '700 66px "Courier New", monospace';
  ctx.fillText('5K4  0.3pF', w * 0.54, h * 0.70);

  return toHiTex(canvas);
}

// =============================================================================
// 19. XR43: MPS MP5475 LPDDR5X Quad-Buck Sub-PMIC QFN-28 Laser-Marked Top
// =============================================================================
function createBionzSubPmicIcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#171b22';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 2800, 4043, 0.064);

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.34)';
  ctx.lineWidth = 8;
  ctx.strokeRect(22, 22, w - 44, h - 44);

  // Pin-1 laser index crater
  ctx.fillStyle = '#090b0f';
  ctx.beginPath();
  ctx.arc(106, 106, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(129, 140, 248, 0.84)';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = 'rgba(236, 242, 250, 0.94)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '900 68px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('MPS', 178, 176);
  ctx.fillStyle = 'rgba(99, 102, 241, 0.88)';
  ctx.fillRect(178, 224, 464, 7);

  ctx.fillStyle = 'rgba(236, 242, 250, 0.92)';
  ctx.font = '700 62px "Courier New", monospace';
  ctx.fillText('MP5475-L5X', 108, 304);
  ctx.fillStyle = 'rgba(196, 210, 228, 0.86)';
  ctx.font = '600 34px "Courier New", monospace';
  ctx.fillText('VDD2H 1.05V / VDDQ 0.5V', 108, 384);
  ctx.fillText('DVFSQ 0.3V  QUAD-BUCK', 108, 438);
  ctx.fillText('2549M3  QFN-28', 108, 502);

  drawDataMatrix(ctx, 520, 520, 142, 12, 'rgba(232, 238, 246, 0.88)', null, 5475);
  return toHiTex(canvas);
}

// =============================================================================
// 20. XR43: Murata DFE252012F-R24M (0.24μH 6.2A) Metal-Alloy Inductor Top
// =============================================================================
function createBionzInductorR24Texture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#2a3039';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 3600, 4143, 0.088);

  const rng = mulberry32(4144);
  ctx.fillStyle = 'rgba(186, 198, 214, 0.17)';
  for (let i = 0; i < 420; i++) {
    ctx.fillRect(rng() * w, rng() * h, 2, 2);
  }

  ctx.strokeStyle = 'rgba(164, 178, 196, 0.36)';
  ctx.lineWidth = 10;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Winding-start polarity dot
  ctx.fillStyle = 'rgba(240, 246, 252, 0.92)';
  ctx.beginPath();
  ctx.arc(124, 128, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(242, 248, 255, 0.94)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 184px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('R24', w * 0.5, h * 0.48);
  ctx.fillStyle = 'rgba(204, 216, 230, 0.80)';
  ctx.font = '700 44px "Courier New", monospace';
  ctx.fillText('5K8  0.24uH  6.2A', w * 0.5, h * 0.78);

  return toHiTex(canvas);
}

// =============================================================================
// 21. XR43: Segmented LPDDR5X Sub-PMIC Power PCB (VDD2H 1.05V / VDDQ 0.5V)
// =============================================================================
function createBionzSubPmicPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawPcbBackdrop(ctx, w, h, '#0b3c32', 'rgba(46, 174, 134, 0.22)', 4243);

  // Isolated VDD2H 1.05V copper island (upper-right) & VDDQ 0.5V gold island (lower-right)
  ctx.fillStyle = 'rgba(217, 119, 54, 0.40)';
  ctx.fillRect(422, 66, 294, 286);
  ctx.strokeStyle = '#e6903c';
  ctx.lineWidth = 4;
  ctx.strokeRect(422, 66, 294, 286);

  ctx.fillStyle = 'rgba(242, 200, 82, 0.34)';
  ctx.fillRect(422, 412, 294, 286);
  ctx.strokeStyle = '#f2c852';
  ctx.lineWidth = 4;
  ctx.strokeRect(422, 412, 294, 286);

  // Clean dark guard moat separating VDD2H & VDDQ rails
  ctx.fillStyle = '#07221c';
  ctx.fillRect(410, 362, 316, 40);

  // Stitched thermal/current via columns
  for (let vy = 96; vy <= 670; vy += 44) {
    if (vy > 340 && vy < 420) continue;
    ctx.fillStyle = '#f2cb58';
    ctx.beginPath();
    ctx.arc(684, vy, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#07221c';
    ctx.beginPath();
    ctx.arc(684, vy, 3.0, 0, Math.PI * 2);
    ctx.fill();
  }

  // QFN-28 courtyard & silkscreen
  ctx.strokeStyle = 'rgba(240, 253, 244, 0.86)';
  ctx.lineWidth = 3;
  ctx.strokeRect(84, 168, 280, 280);
  ctx.fillStyle = '#f0fdf4';
  ctx.font = '700 20px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('U108  MP5475 LPDDR5X PMIC', 224, 146);
  ctx.fillText('L108 VDD2H 1.05V', 568, 96);
  ctx.fillText('L109 VDDQ 0.5V', 568, 672);
  ctx.fillText('C181..C184 LOW-ESL MLCC', 224, 676);

  return toHiTex(canvas);
}

// =============================================================================
// 22. XR46: Factory ATE / JTAG / SWD Micro-Probe & OTP Security eFuse PCB
// =============================================================================
function createBionzAteJtagPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawPcbBackdrop(ctx, w, h, '#0b3c2e', 'rgba(42, 168, 126, 0.22)', 4046);

  // 2x8 factory ATE/JTAG/SWD silkscreen pinout matrix & routed copper traces
  const row0 = ['VTREF', 'SWDIO', 'SWCLK', 'TDI', 'TDO', 'TMS', 'TCK', 'TRST'];
  const row1 = ['NRST', 'GND', 'BOOT0', 'UTX', 'URX', 'ACLK', 'C2PA', 'VPP'];

  for (let c = 0; c < 8; c++) {
    const px = 80 + c * 87;
    // Routed copper trace linking each test pad down toward OTP eFuse & strap bank
    ctx.strokeStyle = c % 2 === 0 ? '#34d399' : '#f2c852';
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.moveTo(px, 162);
    ctx.lineTo(px, 496);
    ctx.stroke();

    // Row 0 pad ring & label
    if (c === 0) {
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 4;
      ctx.strokeRect(px - 28, 134, 56, 56);
    } else {
      ctx.strokeStyle = '#f2c852';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(px, 162, 26, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = '#f0fdf4';
    ctx.font = '700 17px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(row0[c], px, 108);

    // Row 1 pad ring & label
    ctx.strokeStyle = '#f2c852';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(px, 348, 26, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillText(row1[c], px, 404);
  }

  // Lower-left OTP Security eFuse lock courtyard & lower-right Boot-Strap resistor labels
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 3;
  ctx.strokeRect(64, 504, 290, 178);
  ctx.fillStyle = '#fecaca';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('U901 OTP eFUSE LOCK (BLOWN)', 209, 488);

  ctx.strokeStyle = '#f0fdf4';
  ctx.lineWidth = 2.4;
  ctx.strokeRect(396, 514, 314, 158);
  ctx.fillStyle = '#f0fdf4';
  ctx.fillText('R901-R904 BOOT STRAPS + NRST', 553, 496);
  ctx.fillText('SONY FACTORY ATE / JTAG / SWD  4-PT CROWN PROBE', w * 0.5, 42);

  return toHiTex(canvas);
}

// =============================================================================
// FACTORY: Create all 22 Brand-New Bespoke BIONZ XR Hero PBR Materials
// =============================================================================
export function createBionzHeroMaterials(clippingPlanes: THREE.Plane[]): BionzHeroMaterials {
  const common = {
    clippingPlanes,
    clipShadows: true,
  };

  const tagBump = <T extends THREE.Material>(mat: T, bumpScale = 0.08): T => {
    mat.userData.megaBumpScale = bumpScale;
    return mat;
  };

  const bionzStiffenerSteel = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzStiffenerSteelTexture(),
      metalness: 0.90,
      roughness: 0.28,
      clearcoat: 0.18,
    }),
    0.09
  );

  const makeIpMat = (tex: THREE.CanvasTexture, iridescence = 0.62, iridIOR = 1.66) =>
    tagBump(
      new THREE.MeshPhysicalMaterial({
        ...common,
        color: 0xffffff,
        map: tex,
        metalness: 0.58,
        roughness: 0.24,
        clearcoat: 0.50,
        iridescence,
        iridescenceIOR: iridIOR,
      }),
      0.11
    );

  const bionzIpSlvsDie = makeIpMat(createBionzIpSlvsDieTexture(), 0.60, 1.64);
  const bionzIpIspDie = makeIpMat(createBionzIpIspDieTexture(), 0.58, 1.62);
  const bionzIpNpuDie = makeIpMat(createBionzIpNpuDieTexture(), 0.70, 1.72);
  const bionzIpArmDie = makeIpMat(createBionzIpArmDieTexture(), 0.62, 1.66);
  const bionzIpSabinDie = makeIpMat(createBionzIpSabinDieTexture(), 0.60, 1.65);
  const bionzIpHevcDie = makeIpMat(createBionzIpHevcDieTexture(), 0.58, 1.63);
  const bionzIpSramDie = makeIpMat(createBionzIpSramDieTexture(), 0.72, 1.74);
  const bionzIpC2paDie = makeIpMat(createBionzIpC2paDieTexture(), 0.55, 1.60);

  const bionzSac305Solder = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzSac305SolderTexture(),
      metalness: 0.94,
      roughness: 0.17,
      clearcoat: 0.32,
    }),
    0.08
  );

  const makePcbMat = (tex: THREE.CanvasTexture) =>
    tagBump(
      new THREE.MeshPhysicalMaterial({
        ...common,
        color: 0xffffff,
        map: tex,
        metalness: 0.18,
        roughness: 0.40,
        clearcoat: 0.36,
      }),
      0.09
    );

  const bionzPdnPcb = makePcbMat(createBionzPdnPcbTexture());

  const bionzPoscapTop = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzPoscapTopTexture(),
      metalness: 0.08,
      roughness: 0.54,
      clearcoat: 0.22,
    }),
    0.09
  );

  const bionzTcxoPcb = makePcbMat(createBionzTcxoPcbTexture());
  const bionzNorPcb = makePcbMat(createBionzNorPcbTexture());

  const bionzSigmaGraphite = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzSigmaGraphiteTexture(),
      metalness: 0.54,
      roughness: 0.32,
      clearcoat: 0.28,
    }),
    0.11
  );

  const bionzSlvsBusPcb = makePcbMat(createBionzSlvsBusPcbTexture());
  const bionzHdmiPcb = makePcbMat(createBionzHdmiPcbTexture());

  const bionzEsdRclampIc = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzEsdRclampIcTexture(),
      metalness: 0.08,
      roughness: 0.58,
      clearcoat: 0.16,
    }),
    0.09
  );

  const bionzSubPmicIc = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzSubPmicIcTexture(),
      metalness: 0.08,
      roughness: 0.58,
      clearcoat: 0.18,
    }),
    0.09
  );

  const bionzInductorR24 = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createBionzInductorR24Texture(),
      metalness: 0.24,
      roughness: 0.66,
    }),
    0.11
  );

  const bionzSubPmicPcb = makePcbMat(createBionzSubPmicPcbTexture());
  const bionzAteJtagPcb = makePcbMat(createBionzAteJtagPcbTexture());

  const heroList: THREE.Material[] = [
    bionzStiffenerSteel,
    bionzIpSlvsDie,
    bionzIpIspDie,
    bionzIpNpuDie,
    bionzIpArmDie,
    bionzIpSabinDie,
    bionzIpHevcDie,
    bionzIpSramDie,
    bionzIpC2paDie,
    bionzSac305Solder,
    bionzPdnPcb,
    bionzPoscapTop,
    bionzTcxoPcb,
    bionzNorPcb,
    bionzSigmaGraphite,
    bionzSlvsBusPcb,
    bionzHdmiPcb,
    bionzEsdRclampIc,
    bionzSubPmicIc,
    bionzInductorR24,
    bionzSubPmicPcb,
    bionzAteJtagPcb,
  ];

  return {
    bionzStiffenerSteel,
    bionzIpSlvsDie,
    bionzIpIspDie,
    bionzIpNpuDie,
    bionzIpArmDie,
    bionzIpSabinDie,
    bionzIpHevcDie,
    bionzIpSramDie,
    bionzIpC2paDie,
    bionzSac305Solder,
    bionzPdnPcb,
    bionzPoscapTop,
    bionzTcxoPcb,
    bionzNorPcb,
    bionzSigmaGraphite,
    bionzSlvsBusPcb,
    bionzHdmiPcb,
    bionzEsdRclampIc,
    bionzSubPmicIc,
    bionzInductorR24,
    bionzSubPmicPcb,
    bionzAteJtagPcb,
    heroList,
  };
}
