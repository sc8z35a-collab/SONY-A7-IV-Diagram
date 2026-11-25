import * as THREE from 'three';
import {
  GPU_PROFILE,
  NATIVE_HI_TEX_H,
  NATIVE_HI_TEX_W,
  NATIVE_TILE_TEX_SIZE,
} from './GpuOptimizer';

export interface UltraRealisticMaterials {
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
// 1. BIONZ XR / XR2 PROCEDURAL TEXTURES
// =============================================================================

function createBionzEmiLidTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Anisotropic brushed nickel-silver sputtered EMI shield alloy with realistic CNC lapping sheen
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#495160');
  grad.addColorStop(0.24, '#667183');
  grad.addColorStop(0.46, '#505968');
  grad.addColorStop(0.72, '#6f7b8e');
  grad.addColorStop(1, '#414854');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 640, 101, 0.085, 0.085);
  drawMicroGrain(ctx, w, h, 1400, 102, 0.038);

  // Subtle concentric CNC thermal-lapping reflection arcs
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let r = 80; r <= 340; r += 26) {
    ctx.moveTo(w * 0.5 + r, h * 0.5);
    ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
  }
  ctx.stroke();

  // Recessed stepped thermal-spreader moat border with crisp studio light/shadow bevels
  ctx.strokeStyle = 'rgba(232, 240, 250, 0.52)';
  ctx.lineWidth = 4;
  ctx.strokeRect(38, 38, w - 76, h - 76);
  ctx.strokeStyle = 'rgba(14, 18, 24, 0.65)';
  ctx.lineWidth = 4;
  ctx.strokeRect(45, 45, w - 90, h - 90);
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.28)';
  ctx.lineWidth = 2;
  ctx.strokeRect(54, 54, w - 108, h - 108);

  // Corner laser alignment fiducials & Pin-1 triangular chamfer index (top-left)
  ctx.fillStyle = '#ecc45e';
  ctx.beginPath();
  ctx.moveTo(74, 74);
  ctx.lineTo(138, 74);
  ctx.lineTo(74, 138);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = 'rgba(241, 245, 249, 0.72)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(106, 106, 24, 0, Math.PI * 2);
  ctx.stroke();

  // Authentic crisp laser-etched Sony BIONZ XR / XR2 semiconductor typography (dual-pass micro-etch shadow + bright mark)
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 74px Georgia, "Times New Roman", serif';
  ctx.fillStyle = 'rgba(12, 16, 22, 0.48)';
  ctx.fillText('SONY', 176, 180);
  ctx.fillStyle = 'rgba(238, 244, 252, 0.94)';
  ctx.fillText('SONY', 174, 178);

  // Subtle engraved copper-orange Sony Alpha accent rule
  ctx.fillStyle = 'rgba(226, 126, 56, 0.90)';
  ctx.fillRect(174, 224, 424, 6);
  ctx.fillStyle = 'rgba(255, 214, 170, 0.45)';
  ctx.fillRect(174, 224, 424, 2);

  ctx.font = '800 58px "Helvetica Neue", Arial, sans-serif';
  ctx.fillStyle = 'rgba(12, 16, 22, 0.42)';
  ctx.fillText('BIONZ XR', 176, 288);
  ctx.fillStyle = 'rgba(245, 248, 252, 0.95)';
  ctx.fillText('BIONZ XR', 174, 286);

  ctx.fillStyle = 'rgba(214, 224, 236, 0.90)';
  ctx.font = '600 32px "Courier New", monospace';
  ctx.fillText('CXD90066GG / XR2', 174, 348);
  ctx.fillText('PoP-LPDDR5X  AI-NPU', 174, 392);

  // Secondary fab & lot code micro-block
  ctx.fillStyle = 'rgba(208, 218, 232, 0.78)';
  ctx.font = '600 24px "Courier New", monospace';
  ctx.fillText('JAPAN   2548K104', 174, 464);
  ctx.fillText('AT&S-HDI  4nm EUV', 174, 500);
  ctx.fillText('EMI-SPUTTER Cu/Ni', 174, 536);
  ctx.font = '600 18px "Courier New", monospace';
  ctx.fillStyle = 'rgba(190, 204, 222, 0.65)';
  ctx.fillText('SONY SEMICONDUCTOR SOLUTIONS  A1..AF32', 174, 578);

  // Sharp laser-etched 2D DataMatrix in bottom-right
  drawDataMatrix(ctx, 514, 456, 148, 14, 'rgba(240, 246, 252, 0.92)', 'rgba(20, 26, 34, 0.62)', 90066);

  // Laser-etched corner micro-crosshairs & perimeter alignment ticks
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.58)';
  ctx.lineWidth = 2;
  for (const [cx, cy] of [
    [w - 92, 92],
    [92, h - 92],
  ]) {
    ctx.beginPath();
    ctx.moveTo(cx - 18, cy);
    ctx.lineTo(cx + 18, cy);
    ctx.moveTo(cx, cy - 18);
    ctx.lineTo(cx, cy + 18);
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(226, 232, 240, 0.45)';
  for (let t = 140; t <= w - 140; t += 48) {
    ctx.fillRect(t, 24, 3, 10);
    ctx.fillRect(t, h - 34, 3, 10);
    ctx.fillRect(24, t, 10, 3);
    ctx.fillRect(w - 34, t, 10, 3);
  }

  return toHiTex(canvas);
}

function createBionzPopDramTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Matte dark charcoal silica-filled EMC epoxy mold compound
  ctx.fillStyle = '#1b1f27';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 2800, 201, 0.058);

  // Fine perimeter mold bevel highlight + authentic molded circular ejector-pin marks in corners
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, w - 40, h - 40);
  for (const [ex, ey] of [
    [w - 92, 92],
    [92, h - 92],
  ]) {
    ctx.fillStyle = 'rgba(10, 12, 16, 0.55)';
    ctx.beginPath();
    ctx.arc(ex, ey, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Pin-1 circular molded crater dot (top-left)
  ctx.fillStyle = '#0e1116';
  ctx.beginPath();
  ctx.arc(92, 92, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(203, 213, 225, 0.62)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Authentic Micron PoP LPDDR5X marking (D8DNH verified from A7 V BIONZ XR2 teardown!)
  ctx.save();
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.86)';
  ctx.fillStyle = 'rgba(226, 232, 240, 0.88)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(210, 200, 62, 34, -0.25, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = '800 54px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', 210, 202);
  ctx.restore();

  ctx.fillStyle = 'rgba(226, 232, 240, 0.86)';
  ctx.textAlign = 'left';
  ctx.font = '700 50px "Courier New", monospace';
  ctx.fillText('4NA47', 310, 198);
  ctx.font = '700 66px "Courier New", monospace';
  ctx.fillText('D8DNH', 150, 326);

  ctx.fillStyle = 'rgba(186, 200, 218, 0.78)';
  ctx.font = '600 30px "Courier New", monospace';
  ctx.fillText('LPDDR5X-8533  8GB PoP', 150, 412);
  ctx.fillText('MT62F2G32D8DR-023 WT', 150, 456);
  ctx.fillText('QUAD-DIE  64-BIT  0.5V', 150, 500);

  drawDataMatrix(ctx, 520, 520, 140, 12, 'rgba(226, 232, 240, 0.84)', null, 58847);

  return toHiTex(canvas);
}

function createBionzDieFloorplanTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Deep iridescent crystalline bare-silicon wafer base
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0c1c36');
  bg.addColorStop(0.28, '#123a52');
  bg.addColorStop(0.54, '#241b54');
  bg.addColorStop(0.78, '#0f3d47');
  bg.addColorStop(1, '#1a2748');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Dual copper/gold perimeter seal & crack-stop guard rings
  ctx.strokeStyle = '#e5b347';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Perimeter gold/copper I/O bond pad ring
  ctx.fillStyle = '#eab64d';
  for (let i = 40; i < w - 40; i += 14) {
    ctx.fillRect(i, 30, 8, 14);
    ctx.fillRect(i, h - 44, 8, 14);
    ctx.fillRect(30, i, 14, 8);
    ctx.fillRect(w - 44, i, 14, 8);
  }

  // Draw dense photolithographic 4x4 IP macro floorplan zones matching XR10-XR25!
  const drawMacro = (
    x: number,
    y: number,
    mw: number,
    mh: number,
    c1: string,
    c2: string,
    pitchX: number,
    pitchY: number,
    kind: 'sram' | 'systolic' | 'logic' | 'lanes'
  ) => {
    const g = ctx.createLinearGradient(x, y, x + mw, y + mh);
    g.addColorStop(0, c1);
    g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.fillRect(x, y, mw, mh);

    ctx.strokeStyle = 'rgba(255,255,255,0.24)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    for (let px = x + pitchX; px < x + mw; px += pitchX) {
      ctx.moveTo(px, y);
      ctx.lineTo(px, y + mh);
    }
    for (let py = y + pitchY; py < y + mh; py += pitchY) {
      ctx.moveTo(x, py);
      ctx.lineTo(x + mw, py);
    }
    ctx.stroke();

    if (kind === 'systolic') {
      ctx.fillStyle = 'rgba(250, 204, 21, 0.38)';
      for (let gx = x + 6; gx < x + mw - 8; gx += 14) {
        for (let gy = y + 6; gy < y + mh - 8; gy += 14) {
          ctx.fillRect(gx, gy, 8, 8);
        }
      }
    } else if (kind === 'sram') {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.30)';
      for (let sy = y + 6; sy < y + mh - 6; sy += 10) {
        ctx.fillRect(x + 5, sy, mw - 10, 4.5);
      }
    } else if (kind === 'lanes') {
      ctx.fillStyle = 'rgba(245, 158, 11, 0.44)';
      for (let lx = x + 8; lx < x + mw - 8; lx += 16) {
        ctx.fillRect(lx, y + 7, 6, mh - 14);
      }
    } else {
      ctx.fillStyle = 'rgba(186, 230, 253, 0.22)';
      for (let rx = x + 8; rx < x + mw - 14; rx += 22) {
        for (let ry = y + 8; ry < y + mh - 14; ry += 18) {
          ctx.fillRect(rx, ry, 14, 9);
        }
      }
    }

    // Gold power-delivery guard ring framing each IP macro
    ctx.strokeStyle = 'rgba(238, 188, 62, 0.84)';
    ctx.lineWidth = 2.4;
    ctx.strokeRect(x, y, mw, mh);
  };

  const pad = 54;
  const gap = 12;
  const cell = (w - pad * 2 - gap * 3) / 4;
  const palette: Array<[string, string, number, number, 'sram' | 'systolic' | 'logic' | 'lanes']> = [
    ['#0e7490', '#164e63', 10, 14, 'lanes'],
    ['#0369a1', '#0f766e', 12, 10, 'logic'],
    ['#0f766e', '#115e59', 10, 8, 'sram'],
    ['#b45309', '#92400e', 14, 14, 'systolic'],
    ['#5b21b6', '#3730a3', 16, 16, 'systolic'],
    ['#1d4ed8', '#1e3a8a', 14, 14, 'logic'],
    ['#0d9488', '#155e75', 12, 12, 'logic'],
    ['#9f1239', '#881337', 10, 14, 'lanes'],
    ['#047857', '#065f46', 12, 10, 'sram'],
    ['#0284c7', '#1e40af', 8, 12, 'sram'],
    ['#1e40af', '#312e81', 10, 16, 'lanes'],
    ['#a16207', '#713f12', 14, 14, 'systolic'],
    ['#9a3412', '#7c2d12', 12, 12, 'lanes'],
    ['#075985', '#0c4a6e', 12, 14, 'lanes'],
    ['#4338ca', '#312e81', 14, 14, 'logic'],
    ['#86198f', '#581c87', 12, 12, 'systolic'],
  ];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const [c1, c2, px, py, kind] = palette[r * 4 + c];
      drawMacro(pad + c * (cell + gap), pad + r * (cell + gap), cell, cell, c1, c2, px, py, kind);
    }
  }

  // Orthogonal BEOL copper power-distribution NoC bus highways between macro rows/cols
  ctx.strokeStyle = 'rgba(248, 200, 92, 0.72)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 1; i < 4; i++) {
    const pos = pad + i * cell + (i - 0.5) * gap;
    ctx.moveTo(pad, pos - 2);
    ctx.lineTo(w - pad, pos - 2);
    ctx.moveTo(pad, pos + 2);
    ctx.lineTo(w - pad, pos + 2);
    ctx.moveTo(pos - 2, pad);
    ctx.lineTo(pos - 2, h - pad);
    ctx.moveTo(pos + 2, pad);
    ctx.lineTo(pos + 2, h - pad);
  }
  ctx.stroke();

  // Micro-lithographic reticle scribe legend along top die seal lane
  ctx.fillStyle = 'rgba(248, 224, 140, 0.78)';
  ctx.font = '700 13px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SONY CXD90066  4NM-EUV-FINFET  RETICLE REV.B  AI-NPU/ISP/HEVC', w * 0.5, 48);

  return toHiTex(canvas);
}

function createBionzIpTileTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Neutral high-contrast photolithographic wafer micro-circuitry tile (multiplies cleanly with block material color!)
  ctx.fillStyle = '#7e8fa8';
  ctx.fillRect(0, 0, s, s);

  // Sub-block SRAM & logic standard-cell striations
  for (let y = 0; y < s; y += 12) {
    ctx.fillStyle = (y / 12) % 2 === 0 ? 'rgba(255,255,255,0.20)' : 'rgba(15,23,42,0.30)';
    ctx.fillRect(0, y, s, 6);
  }
  ctx.strokeStyle = 'rgba(255, 240, 190, 0.38)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i <= s; i += 12) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.moveTo(0, i);
    ctx.lineTo(s, i);
  }
  ctx.stroke();

  // Micro-via contact dots at cell intersections
  ctx.fillStyle = 'rgba(255, 224, 130, 0.62)';
  for (let x = 6; x < s; x += 24) {
    for (let y = 6; y < s; y += 24) {
      ctx.fillRect(x - 1.8, y - 1.8, 3.6, 3.6);
    }
  }

  // Perimeter gold bus border
  ctx.strokeStyle = 'rgba(245, 200, 90, 0.78)';
  ctx.lineWidth = 4;
  ctx.strokeRect(3, 3, s - 6, s - 6);

  return toTileTex(canvas, 1, 1);
}

function createBionzCetusDieTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#2e1065');
  bg.addColorStop(0.5, '#1e1b4b');
  bg.addColorStop(1, '#0f3d56');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#eab64d';
  ctx.lineWidth = 10;
  ctx.strokeRect(14, 14, w - 28, h - 28);

  // 4 stacked Cortex-A35 real-time ISP co-processor core banks along length
  for (let i = 0; i < 4; i++) {
    const y0 = 48 + i * 172;
    const g = ctx.createLinearGradient(60, y0, w - 60, y0 + 148);
    g.addColorStop(0, '#4c1d95');
    g.addColorStop(0.5, '#2563eb');
    g.addColorStop(1, '#0d9488');
    ctx.fillStyle = g;
    ctx.fillRect(68, y0, w - 136, 148);

    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let gx = 84; gx < w - 68; gx += 16) {
      ctx.moveTo(gx, y0);
      ctx.lineTo(gx, y0 + 148);
    }
    for (let gy = y0 + 16; gy < y0 + 148; gy += 16) {
      ctx.moveTo(68, gy);
      ctx.lineTo(w - 68, gy);
    }
    ctx.stroke();

    ctx.strokeStyle = '#f5c542';
    ctx.lineWidth = 3;
    ctx.strokeRect(68, y0, w - 136, 148);
  }

  // Left-edge LSI high-speed silicon bridge PHY pad strip
  ctx.fillStyle = '#e5a838';
  for (let py = 54; py < h - 54; py += 16) {
    ctx.fillRect(28, py, 24, 9);
  }

  return toHiTex(canvas);
}

function createBionzAbfSubstrateTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic AT&S emerald-teal Ajinomoto Build-Up Film (ABF) solder resist green
  ctx.fillStyle = '#0e4a3b';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 1400, 301, 0.032);

  // Inner copper ground plane sheen with cross-hatched EMI reference texture
  ctx.fillStyle = '#125c49';
  ctx.fillRect(36, 36, w - 72, h - 72);
  ctx.strokeStyle = 'rgba(42, 165, 122, 0.22)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let i = 48; i <= w - 48; i += 24) {
    ctx.moveTo(i, 40);
    ctx.lineTo(i, h - 40);
    ctx.moveTo(40, i);
    ctx.lineTo(w - 40, i);
  }
  ctx.stroke();

  // Dense radial 9/12 um SAP copper fan-out routing traces from center die to perimeter BGA pads
  ctx.strokeStyle = '#30b585';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  const cx = w * 0.5;
  const cy = h * 0.5;
  for (let i = 0; i < 88; i++) {
    const a = (i / 88) * Math.PI * 2;
    const r0 = 136;
    const r1 = 226;
    const r2 = 344;
    const bend = a + (i % 2 === 0 ? 0.035 : -0.035);
    ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
    ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(bend) * r2, cy + Math.sin(bend) * r2);
  }
  ctx.stroke();

  // Center flip-chip C4 micro-bump solder-mask opening matrix
  ctx.fillStyle = '#0b382d';
  ctx.fillRect(174, 174, w - 348, h - 348);
  ctx.strokeStyle = '#dfb04b';
  ctx.lineWidth = 3;
  ctx.strokeRect(174, 174, w - 348, h - 348);

  // Gold VIPPO annular rings + tiny resin-plugged dark drill centers inside flip-chip pad array
  ctx.fillStyle = '#e5bd54';
  ctx.beginPath();
  for (let gx = 194; gx <= w - 194; gx += 20) {
    for (let gy = 194; gy <= h - 194; gy += 20) {
      ctx.moveTo(gx + 5.0, gy);
      ctx.arc(gx, gy, 5.0, 0, Math.PI * 2);
    }
  }
  ctx.fill();
  ctx.fillStyle = '#0a2b22';
  ctx.beginPath();
  for (let gx = 194; gx <= w - 194; gx += 20) {
    for (let gy = 194; gy <= h - 194; gy += 20) {
      ctx.moveTo(gx + 1.8, gy);
      ctx.arc(gx, gy, 1.8, 0, Math.PI * 2);
    }
  }
  ctx.fill();

  // Outer perimeter PoP TMV gold landing pad dual ring (with dark via centers!)
  ctx.fillStyle = '#ebc35c';
  ctx.beginPath();
  for (const ring of [52, 82]) {
    for (let t = 52; t <= w - 52; t += 28) {
      for (const [px, py] of [
        [t, ring],
        [t, h - ring],
        [ring, t],
        [w - ring, t],
      ]) {
        ctx.moveTo(px + 6.8, py);
        ctx.arc(px, py, 6.8, 0, Math.PI * 2);
      }
    }
  }
  ctx.fill();
  ctx.fillStyle = '#0a2b22';
  ctx.beginPath();
  for (const ring of [52, 82]) {
    for (let t = 52; t <= w - 52; t += 28) {
      for (const [px, py] of [
        [t, ring],
        [t, h - ring],
        [ring, t],
        [w - ring, t],
      ]) {
        ctx.moveTo(px + 2.4, py);
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
      }
    }
  }
  ctx.fill();

  // Gold optical alignment fiducials in corners + subtle substrate silkscreen
  for (const [fx, fy] of [
    [118, 118],
    [w - 118, 118],
    [118, h - 118],
    [w - 118, h - 118],
  ]) {
    ctx.strokeStyle = '#f3cd66';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(fx, fy, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#f3cd66';
    ctx.beginPath();
    ctx.arc(fx, fy, 7.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = 'rgba(232, 245, 240, 0.80)';
  ctx.font = '700 18px "Courier New", monospace';
  ctx.fillText('AT&S ABF-14L-SAP  CXD90066GG  A1..AF32', 194, 146);

  return toHiTex(canvas);
}

function createBionzBtCoreTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Woven glass-cloth BT-resin core laminate texture
  ctx.fillStyle = '#5c4b2c';
  ctx.fillRect(0, 0, s, s);
  for (let y = 0; y < s; y += 16) {
    for (let x = 0; x < s; x += 16) {
      const alt = ((x + y) / 16) % 2 === 0;
      ctx.fillStyle = alt ? 'rgba(210, 175, 105, 0.28)' : 'rgba(42, 32, 16, 0.34)';
      ctx.fillRect(x, y, 14, 14);
    }
  }
  ctx.strokeStyle = 'rgba(225, 152, 74, 0.35)';
  ctx.lineWidth = 2;
  for (let i = 0; i < s; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.moveTo(0, i);
    ctx.lineTo(s, i);
    ctx.stroke();
  }
  return toTileTex(canvas, 3, 3);
}

// =============================================================================
// 2. SONY INTERNAL MICROPHONE PROCEDURAL TEXTURES
// =============================================================================

function createMicDeadcatFurTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Deep velvety charcoal-obsidian acoustic plush fleece (100% seamlessly tileable!)
  ctx.fillStyle = '#17191f';
  ctx.fillRect(0, 0, s, s);

  const rng = mulberry32(401);
  // Ultra-fine high-density directional synthetic fleece micro-strands (wrapped toroidally across edges!)
  const passes: Array<[string, number, number]> = [
    ['rgba(9, 11, 15, 0.80)', 1.25, 1100],
    ['rgba(38, 43, 52, 0.68)', 1.0, 1500],
    ['rgba(78, 86, 98, 0.50)', 0.78, 1250],
    ['rgba(156, 166, 182, 0.28)', 0.52, 720],
  ];
  for (const [color, lw, n] of passes) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = rng() * s;
      const y = rng() * s;
      const len = 7 + rng() * 14;
      const ang = -Math.PI * 0.5 + (rng() - 0.5) * 0.65;
      const dx = Math.cos(ang) * len;
      const dy = Math.sin(ang) * len;
      const cx = Math.cos(ang + 0.16) * len * 0.5;
      const cy = Math.sin(ang + 0.16) * len * 0.5;
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

  // Authentic Sony Alpha powder-coated fine-grain magnesium satin obsidian-black
  // (Uniform dark base extending cleanly to edges -> ZERO bright border smearing across curved corner bevels!)
  ctx.fillStyle = '#1b1f26';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 5200, 412, 0.028);

  // Subtle inset machined acoustic deck perimeter line WELL INSIDE the flat top plane (clear of bevels!)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(58, 58, w - 116, h - 116);

  // Crisp Sony laser-printed L & R stereo microphone icons beside the L/R grilles
  ctx.fillStyle = 'rgba(241, 245, 249, 0.92)';
  ctx.font = '700 44px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('L', 182, 344);
  ctx.fillText('R', 586, 344);

  // Subtle rear 3rd directional / voice-memo mic indicator (clear of rear grille bezel)
  ctx.fillStyle = 'rgba(186, 198, 214, 0.80)';
  ctx.font = '600 21px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('VOICE MEMO / REAR MIC', w * 0.5, 268);

  // Crisp Sony digital audio micro-stencil along front top-deck apron
  ctx.fillStyle = 'rgba(186, 198, 214, 0.62)';
  ctx.font = '700 18px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('DIGITAL AUDIO  •  3-CAPSULE ARRAY', w * 0.5, 654);

  // Subtle top-deck Sony microphone wave icon
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.68)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(w * 0.5, 510, 14, 0, Math.PI * 2);
  ctx.stroke();
  for (const r of [24, 34]) {
    ctx.beginPath();
    ctx.arc(w * 0.5, 510, r, -Math.PI * 0.32, Math.PI * 0.32);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w * 0.5, 510, r, Math.PI * 0.68, Math.PI * 1.32);
    ctx.stroke();
  }

  return toHiTex(canvas);
}

function createMicStainlessMeshTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Dark acoustic cavity void behind ultra-fine woven 304 stainless twill wire mesh
  ctx.fillStyle = '#0e1218';
  ctx.fillRect(0, 0, s, s);

  const pitch = 12;
  for (let y = 0; y < s; y += pitch) {
    for (let x = 0; x < s; x += pitch) {
      const overH = ((Math.round(x / pitch) + Math.round(y / pitch)) & 1) === 0;
      // Horizontal wire segment with cylindrical metallic highlight & under-wire shadow
      const hg = ctx.createLinearGradient(0, y + 2, 0, y + 7);
      hg.addColorStop(0, '#5a6575');
      hg.addColorStop(0.45, overH ? '#f4f8ff' : '#a9b5c6');
      hg.addColorStop(1, '#3f4856');
      ctx.fillStyle = hg;
      ctx.fillRect(x, y + 2.2, pitch, 4.8);

      // Vertical wire segment
      const vg = ctx.createLinearGradient(x + 2, 0, x + 7, 0);
      vg.addColorStop(0, '#566070');
      vg.addColorStop(0.45, !overH ? '#f7faff' : '#a0acb8');
      vg.addColorStop(1, '#3b4350');
      ctx.fillStyle = vg;
      ctx.fillRect(x + 2.2, y, 4.8, pitch);

      // Re-draw top crossing wire with subtle drop shadow for genuine woven twill 3D depth
      if (overH) {
        ctx.fillStyle = 'rgba(0,0,0,0.38)';
        ctx.fillRect(x + 1, y + 6.8, pitch - 2, 1.4);
        ctx.fillStyle = hg;
        ctx.fillRect(x + 0.5, y + 2.2, pitch - 1, 4.8);
      }
    }
  }

  return toTileTex(canvas, 3.5, 3.5);
}

function createMicEptfeTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Authentic crisp matte-white fibrous Gore-Tex hydrophobic ePTFE membrane
  ctx.fillStyle = '#f2f5f9';
  ctx.fillRect(0, 0, s, s);
  const rng = mulberry32(433);
  ctx.lineWidth = 0.9;
  for (const [col, n] of [
    ['rgba(210, 220, 232, 0.55)', 320],
    ['rgba(255, 255, 255, 0.7)', 320],
  ] as const) {
    ctx.strokeStyle = col;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = rng() * s;
      const y = rng() * s;
      const len = 8 + rng() * 18;
      const a = rng() * Math.PI * 2;
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    }
    ctx.stroke();
  }
  return toTileTex(canvas, 2, 2);
}

function createMicMemsLidTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Brushed nickel-silver Faraday cage shield roof
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#a6b0bf');
  g.addColorStop(0.45, '#cfd8e4');
  g.addColorStop(0.75, '#9ea8b8');
  g.addColorStop(1, '#bcc6d4');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 380, 444, 0.08, 0.07);

  // Perimeter chamfer line
  ctx.strokeStyle = 'rgba(40, 48, 60, 0.55)';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Laser-etched Infineon XENSIV / Sony MEMS part marking on right side of lid
  ctx.fillStyle = 'rgba(30, 38, 48, 0.85)';
  ctx.textAlign = 'left';
  ctx.font = '700 44px "Courier New", monospace';
  ctx.fillText('IM73A135', 430, 240);
  ctx.font = '700 32px "Courier New", monospace';
  ctx.fillText('SDM 72dB', 430, 304);
  ctx.font = '600 26px "Courier New", monospace';
  ctx.fillText('IP57 MEMS', 430, 360);
  ctx.fillText('2542  A3', 430, 412);

  // Pin-1 circular index dot
  ctx.beginPath();
  ctx.arc(680, 100, 20, 0, Math.PI * 2);
  ctx.fill();

  // Rolled brass/gold-tinted collar marking around left circular acoustic port
  ctx.strokeStyle = 'rgba(180, 134, 48, 0.72)';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(250, h * 0.5, 136, 0, Math.PI * 2);
  ctx.stroke();

  return toHiTex(canvas);
}

function createMicMemsDiaphragmTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Iridescent polysilicon corrugated MEMS membrane with radial diffraction sheen
  const cx = w * 0.5;
  const cy = h * 0.5;
  const rg = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.5);
  rg.addColorStop(0, '#1e40af');
  rg.addColorStop(0.28, '#0ea5e9');
  rg.addColorStop(0.55, '#0d9488');
  rg.addColorStop(0.8, '#4f46e5');
  rg.addColorStop(1, '#1e293b');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, w, h);

  // Fine concentric sinusoidal stress-relief corrugations
  for (let r = 68; r < w * 0.46; r += 26) {
    ctx.strokeStyle = 'rgba(224, 242, 254, 0.48)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(15, 23, 42, 0.42)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 8 radial stress-relief cantilever spring slits near outer anchor
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.72)';
  ctx.lineWidth = 5;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * 280, cy + Math.sin(a) * 280);
    ctx.lineTo(cx + Math.cos(a) * 356, cy + Math.sin(a) * 356);
    ctx.stroke();
  }

  return toHiTex(canvas);
}

function createMicSh1035FlexTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Authentic Sony OEM amber-copper Kapton polyimide flex base
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#b56314');
  g.addColorStop(0.5, '#cc771c');
  g.addColorStop(1, '#9e510e');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Embedded dark-copper differential shielded signal trace pairs (L+/L-, R+/R-, GND)
  ctx.strokeStyle = '#733508';
  ctx.lineWidth = 10;
  for (const ty of [220, 260, 320, 360, 440, 480, 540, 580]) {
    ctx.beginPath();
    ctx.moveTo(30, ty);
    ctx.lineTo(w - 30, ty);
    ctx.stroke();
  }

  // Hatched silver-ink conductive EMI shield overlay band across central trunk
  ctx.fillStyle = 'rgba(162, 174, 190, 0.62)';
  ctx.fillRect(140, 140, w - 280, h - 280);
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = -h; i < w + h; i += 22) {
    ctx.moveTo(140 + i, 140);
    ctx.lineTo(140 + i - 300, h - 140);
  }
  ctx.stroke();

  // Crisp white Sony OEM PCB silkscreen legend (verified: SH-1035 / A5033450A!)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
  ctx.font = '800 54px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SONY  SH-1035', w * 0.5, 310);
  ctx.font = '700 34px "Courier New", monospace';
  ctx.fillText('A-5033-450-A  REV.2', w * 0.5, 390);
  ctx.font = '700 26px "Courier New", monospace';
  ctx.fillText('L-MEMS      GND      R-ECM', w * 0.5, 470);

  // Gold solder pads on left and right capsule terminals
  ctx.fillStyle = '#eab648';
  for (const px of [44, w - 104]) {
    for (const py of [200, 340, 480]) {
      ctx.fillRect(px, py, 60, 52);
    }
  }

  return toHiTex(canvas);
}

function createMicEcmJfetPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;

  // Deep emerald circular ECM PCB substrate
  ctx.fillStyle = '#0e4b34';
  ctx.fillRect(0, 0, w, h);

  // Concentric gold solder rings & copper ground pour
  ctx.strokeStyle = '#dfb54c';
  ctx.lineWidth = 42;
  ctx.beginPath();
  ctx.arc(cx, cy, 310, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#1f7a55';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, 235, 0, Math.PI * 2);
  ctx.stroke();

  // Center gold signal pad & copper traces to JFET footprint
  ctx.fillStyle = '#e5bc55';
  ctx.beginPath();
  ctx.arc(cx, cy, 96, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(241, 245, 249, 0.85)';
  ctx.font = '700 30px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('2SK596', cx, 165);
  ctx.fillText('+SIG / GND', cx, 622);

  return toHiTex(canvas);
}

function createMicAcousticFeltTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#14171d';
  ctx.fillRect(0, 0, s, s);
  const rng = mulberry32(477);
  for (const [col, n] of [
    ['rgba(65, 74, 88, 0.35)', 420],
    ['rgba(6, 8, 12, 0.6)', 420],
  ] as const) {
    ctx.fillStyle = col;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = rng() * s;
      const y = rng() * s;
      const r = 1.0 + rng() * 2.4;
      ctx.moveTo(x + r, y);
      ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    ctx.fill();
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
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Dark anodized gunmetal-titanium metallic shell body with fine vertical micro-brushing & specular sweep
  const bodyGrad = ctx.createLinearGradient(0, 0, w, h);
  bodyGrad.addColorStop(0, '#1c2029');
  bodyGrad.addColorStop(0.28, '#2b3240');
  bodyGrad.addColorStop(0.54, '#1b1f28');
  bodyGrad.addColorStop(0.80, '#2a303d');
  bodyGrad.addColorStop(1, '#1c212a');
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 680, 601, 0.062, 0.068);
  drawMicroGrain(ctx, w, h, 1600, 602, 0.032);

  // Machined double perimeter bezel highlight & recessed inner shadow
  ctx.strokeStyle = 'rgba(216, 226, 238, 0.34)';
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.strokeStyle = 'rgba(8, 10, 14, 0.60)';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // === ICONIC SONY ALPHA CINNABAR-ORANGE TOP STRIPE + EMBOSSED WHITE "TOUGH" ===
  const stripeGrad = ctx.createLinearGradient(0, 34, w, 134);
  stripeGrad.addColorStop(0, '#c84b18');
  stripeGrad.addColorStop(0.42, '#ea6628');
  stripeGrad.addColorStop(0.68, '#d9541c');
  stripeGrad.addColorStop(1, '#be4312');
  ctx.fillStyle = stripeGrad;
  ctx.fillRect(28, 34, w - 56, 98);
  drawBrushedStreaks(ctx, w, 132, false, 140, 603, 0.055, 0.055);
  // Crisp embossed top rim highlight & bottom shadow bevel on TOUGH stripe
  ctx.fillStyle = 'rgba(255, 220, 190, 0.48)';
  ctx.fillRect(28, 34, w - 56, 4);
  ctx.fillStyle = 'rgba(50, 14, 4, 0.55)';
  ctx.fillRect(28, 128, w - 56, 4);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 62px "Arial Black", "Helvetica Neue", sans-serif';
  ctx.fillStyle = 'rgba(60, 18, 5, 0.45)';
  ctx.fillText('T O U G H', w * 0.5 + 2, 88);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('T O U G H', w * 0.5, 86);

  // === CRISP WHITE "SONY" SERIF LOGO + METALLIC GOLD "G" SERIES BADGE ===
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'left';
  ctx.font = '700 84px Georgia, "Times New Roman", serif';
  ctx.fillText('SONY', 54, 210);

  // Chamfered metallic gold G-Series square emblem on right
  const goldGrad = ctx.createLinearGradient(604, 164, 706, 256);
  goldGrad.addColorStop(0, '#fae08c');
  goldGrad.addColorStop(0.45, '#d49e2a');
  goldGrad.addColorStop(0.72, '#f4d36e');
  goldGrad.addColorStop(1, '#b88218');
  ctx.fillStyle = goldGrad;
  ctx.fillRect(606, 166, 98, 86);
  ctx.strokeStyle = 'rgba(255, 248, 220, 0.65)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(608, 168, 94, 82);
  ctx.fillStyle = '#161a22';
  ctx.textAlign = 'center';
  ctx.font = '900 66px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('G', 655, 212);

  // === CFexpress 4.0 + BOXED TYPE "A" EMBLEM ===
  ctx.fillStyle = '#e8eef6';
  ctx.textAlign = 'left';
  ctx.font = '800 56px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('CFexpress', 54, 316);

  // Boxed "A" badge
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 5;
  ctx.strokeRect(378, 282, 58, 62);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = '900 48px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('A', 407, 316);

  // Bold "4.0" PCIe Gen4 badge with subtle top sheen
  ctx.fillStyle = '#e25e22';
  ctx.fillRect(462, 282, 108, 62);
  ctx.fillStyle = 'rgba(255, 220, 190, 0.35)';
  ctx.fillRect(462, 282, 108, 4);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 44px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('4.0', 516, 316);

  // Thin metallic gold hairline separator
  ctx.fillStyle = 'rgba(222, 172, 56, 0.80)';
  ctx.fillRect(54, 376, w - 108, 4);

  // === LARGE CAPACITY CALLOUT ("1920 GB") ===
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 108px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('1920', 52, 466);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '700 54px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('GB', 332, 482);

  // === READ / WRITE SPEED RATINGS (CFexpress 4.0 Type A!) ===
  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 38px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('R: 1800', 56, 566);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 24px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('MB/s', 226, 570);

  ctx.fillStyle = '#f5c252';
  ctx.font = '800 38px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('W: 1700', 56, 624);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 24px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('MB/s', 226, 628);

  // === VPG 800 & VPG 400 CLAPPERBOARD BADGES ===
  drawVpgBadge(ctx, 434, 536, 126, 108, '400', '#e2e8f0', '#181c24');
  drawVpgBadge(ctx, 578, 536, 126, 108, '800', '#f5c252', '#181c24');

  // Subtle bottom specs & directional insertion chevron
  ctx.fillStyle = 'rgba(214, 224, 236, 0.84)';
  ctx.font = '700 21px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('CEA-G1920T   IP57  150N  7.5m', 56, 706);
  ctx.textAlign = 'right';
  ctx.fillText('PCIe Gen4 NVMe 2.0  ▼', w - 56, 706);

  return toHiTex(canvas);
}

function createCfeBackplateLaserTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Brushed stainless-steel heat-dissipation backplate
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#aeb8c6');
  bg.addColorStop(0.35, '#d0d8e4');
  bg.addColorStop(0.65, '#9ea9b8');
  bg.addColorStop(1, '#bec8d6');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 640, 611, 0.09, 0.085);

  // Recessed laser perimeter & crimp seam bevel
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.50)';
  ctx.lineWidth = 6;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  // Dark laser-etched Sony specification & certification markings
  const etch = 'rgba(20, 26, 36, 0.90)';
  ctx.fillStyle = etch;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = '700 60px Georgia, serif';
  ctx.fillText('SONY', 62, 104);

  ctx.textAlign = 'right';
  ctx.font = '800 34px "Courier New", monospace';
  ctx.fillText('CEA-G1920T', w - 62, 92);
  ctx.font = '700 24px "Courier New", monospace';
  ctx.fillText('CFexpress™ 4.0 Type A', w - 62, 128);

  // Horizontal laser divider
  ctx.fillRect(62, 162, w - 124, 3);

  // Laser-etched VPG800 clapperboard & DataMatrix (clean breathing room — zero overlap!)
  drawVpgBadge(ctx, 58, 198, 160, 134, '800', etch, 'rgba(226, 232, 240, 0.25)');
  drawDataMatrix(ctx, 536, 196, 166, 14, etch, null, 61920);

  // Technical spec block
  ctx.textAlign = 'left';
  ctx.font = '700 22px "Courier New", monospace';
  ctx.fillText('3.3V   NVMe 2.0', 238, 224);
  ctx.fillText('IP57  150N TOUGH', 238, 266);
  ctx.fillText('R:1800   W:1700', 238, 308);

  // Compliance icon row (CE, FC, UKCA, VCCI, WEEE)
  ctx.textAlign = 'center';
  ctx.font = '800 44px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('CE', 112, 434);
  ctx.fillText('FC', 226, 434);
  ctx.font = '800 26px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('UK', 332, 420);
  ctx.fillText('CA', 332, 448);
  ctx.font = '800 32px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('VCCI', 456, 434);
  drawWeeeBin(ctx, 612, 434, 70, etch);

  // Serial number & origin laser bar
  ctx.fillStyle = 'rgba(22, 28, 38, 0.14)';
  ctx.fillRect(62, 520, w - 124, 86);
  ctx.fillStyle = etch;
  ctx.textAlign = 'center';
  ctx.font = '700 34px "Courier New", monospace';
  ctx.fillText('S/N  0482917A-2548K', w * 0.5, 550);
  ctx.font = '700 24px "Courier New", monospace';
  ctx.fillText('MADE IN TAIWAN   SONY CORPORATION', w * 0.5, 588);

  // Bottom directional contact warning arrow
  ctx.font = '700 22px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('DO NOT TOUCH 21-PIN PCIe CONTACTS  ▼', w * 0.5, 686);

  return toHiTex(canvas);
}

function createCfeHdiPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  // Deep emerald-black 8-layer impedance-controlled HDI solder mask
  ctx.fillStyle = '#092b22';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 1200, 622, 0.032);

  ctx.fillStyle = '#0f3c30';
  ctx.fillRect(28, 28, w - 56, h - 56);

  // 85-ohm matched-length serpentine PCIe Gen4 differential trace pairs rising from 21-pin bottom edge
  ctx.strokeStyle = '#2ba076';
  ctx.lineWidth = 3.8;
  ctx.beginPath();
  for (let lane = 0; lane < 8; lane++) {
    const bx = 136 + lane * 44;
    ctx.moveTo(bx, h - 34);
    ctx.lineTo(bx, 624);
    // Trombone serpentine skew-matching jogs
    for (let s = 0; s < 4; s++) {
      const sy = 612 - s * 22;
      ctx.lineTo(bx + (s % 2 === 0 ? 12 : -12), sy);
      ctx.lineTo(bx + (s % 2 === 0 ? 12 : -12), sy - 11);
      ctx.lineTo(bx, sy - 11);
    }
    ctx.lineTo(bx, 466);
  }
  ctx.stroke();

  // Horizontal NAND ONFI Toggle 5.0 8-channel bus routing connecting Controller to Upper NAND BGA
  ctx.strokeStyle = '#228360';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  for (let i = 0; i < 20; i++) {
    const x = 84 + i * 31;
    ctx.moveTo(x, 420);
    ctx.lineTo(x, 90);
  }
  ctx.stroke();

  // Gold VIPPO blind micro-vias & ground-stitching perimeter via fence (with dark resin-plugged centers!)
  ctx.fillStyle = '#ebc358';
  ctx.beginPath();
  for (let i = 44; i <= w - 44; i += 22) {
    ctx.moveTo(i + 4.4, 38);
    ctx.arc(i, 38, 4.4, 0, Math.PI * 2);
    ctx.moveTo(i + 4.4, h - 38);
    ctx.arc(i, h - 38, 4.4, 0, Math.PI * 2);
    ctx.moveTo(38 + 4.4, i);
    ctx.arc(38, i, 4.4, 0, Math.PI * 2);
    ctx.moveTo(w - 38 + 4.4, i);
    ctx.arc(w - 38, i, 4.4, 0, Math.PI * 2);
  }
  // JTAG / UART gold test pad strip on right edge
  for (let i = 0; i < 8; i++) {
    const ty = 220 + i * 34;
    ctx.moveTo(w - 68 + 9.5, ty);
    ctx.arc(w - 68, ty, 9.5, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.fillStyle = '#071d17';
  ctx.beginPath();
  for (let i = 44; i <= w - 44; i += 22) {
    ctx.moveTo(i + 1.8, 38);
    ctx.arc(i, 38, 1.8, 0, Math.PI * 2);
    ctx.moveTo(i + 1.8, h - 38);
    ctx.arc(i, h - 38, 1.8, 0, Math.PI * 2);
    ctx.moveTo(38 + 1.8, i);
    ctx.arc(38, i, 1.8, 0, Math.PI * 2);
    ctx.moveTo(w - 38 + 1.8, i);
    ctx.arc(w - 38, i, 1.8, 0, Math.PI * 2);
  }
  ctx.fill();

  // Crisp SMT component silkscreen outlines & designators
  ctx.strokeStyle = 'rgba(241, 245, 249, 0.72)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(102, 74, 564, 274); // U2 Primary 3D NAND footprint
  ctx.strokeRect(114, 412, 260, 210); // U1 NVMe Gen4 Controller
  ctx.strokeRect(434, 424, 186, 176); // U3 LPDDR4 DRAM Cache

  ctx.fillStyle = 'rgba(241, 245, 249, 0.88)';
  ctx.font = '700 22px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('U2  BiCS8-NAND-16DP  TOGGLE5', 114, 102);
  ctx.fillText('U1  PS5027-G4', 124, 438);
  ctx.fillText('U3  LPDDR4', 446, 450);
  ctx.fillText('SONY CFE-A 8L-HDI  Z0=85Ω  REV.4A', 114, 678);

  return toHiTex(canvas);
}

function createCfeControllerPkgTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  ctx.fillStyle = '#181c24';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 2600, 633, 0.058);

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.30)';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Authentic molded circular IC ejector-pin indentations in corners (macro-photo signature!)
  for (const [ex, ey] of [
    [w - 86, 86],
    [86, h - 86],
  ]) {
    ctx.fillStyle = 'rgba(8, 10, 14, 0.62)';
    ctx.beginPath();
    ctx.arc(ex, ey, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  // Pin-1 chamfer triangle
  ctx.fillStyle = '#ecc458';
  ctx.beginPath();
  ctx.moveTo(54, 54);
  ctx.lineTo(124, 54);
  ctx.lineTo(54, 124);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(236, 242, 250, 0.92)';
  ctx.textAlign = 'left';
  ctx.font = '700 56px Georgia, serif';
  ctx.fillText('SONY', 150, 152);
  ctx.font = '700 44px "Courier New", monospace';
  ctx.fillText('PS5027-E27T', 100, 260);
  ctx.fillStyle = 'rgba(192, 204, 220, 0.82)';
  ctx.font = '700 32px "Courier New", monospace';
  ctx.fillText('PCIe Gen4 NVMe 2.0', 100, 326);
  ctx.fillText('7nm ARM  4K-LDPC', 100, 378);
  ctx.fillText('AES-256  VPG800', 100, 430);
  ctx.fillText('TW  2548  G4A1', 100, 502);

  drawDataMatrix(ctx, 514, 514, 164, 12, 'rgba(236, 242, 250, 0.88)', null, 50274);

  return toHiTex(canvas);
}

function createCfeNandPkgTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);

  ctx.fillStyle = '#171b22';
  ctx.fillRect(0, 0, w, h);
  drawMicroGrain(ctx, w, h, 2800, 644, 0.058);

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Authentic molded circular IC ejector-pin indentations in corners
  for (const [ex, ey] of [
    [w - 86, 86],
    [86, h - 86],
  ]) {
    ctx.fillStyle = 'rgba(8, 10, 14, 0.62)';
    ctx.beginPath();
    ctx.arc(ex, ey, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  // Pin-1 laser dot
  ctx.fillStyle = 'rgba(236, 242, 250, 0.82)';
  ctx.beginPath();
  ctx.arc(82, 82, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(240, 246, 252, 0.92)';
  ctx.textAlign = 'left';
  ctx.font = '800 66px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('KIOXIA', 142, 164);

  ctx.fillStyle = 'rgba(208, 218, 232, 0.88)';
  ctx.font = '700 40px "Courier New", monospace';
  ctx.fillText('TH58LKT2T25BA8C', 82, 276);
  ctx.font = '700 34px "Courier New", monospace';
  ctx.fillText('BiCS8 3D TLC  218L-CBA', 82, 352);
  ctx.fillText('16DP  TOGGLE 5.0  3.2Gb/s', 82, 408);
  ctx.fillText('JAPAN   2546K   960GB', 82, 488);

  drawDataMatrix(ctx, 520, 520, 160, 12, 'rgba(236, 242, 250, 0.88)', null, 21816);

  return toHiTex(canvas);
}

function createCfeCopperThermalTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);

  // Brushed pure-copper heat spreader with micro-capillary vapor wick channels
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, '#c86c34');
  g.addColorStop(0.5, '#df8448');
  g.addColorStop(1, '#b65b26');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  drawBrushedStreaks(ctx, s, s, true, 160, 655, 0.08, 0.07);

  // Subtle etched thermal spreader capillary grid
  ctx.strokeStyle = 'rgba(92, 36, 8, 0.24)';
  ctx.lineWidth = 2;
  for (let i = 0; i < s; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, s);
    ctx.stroke();
  }
  return toTileTex(canvas, 3, 4);
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

// =============================================================================
// FACTORY: CREATE ALL 41 BESPOKE ULTRA-REALISTIC MATERIALS
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
      color: 0x22252b,
      map: mattePcTex,
      metalness: 0.02,
      roughness: 0.90,
    }),
    0.09
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

  const list: THREE.Material[] = [
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
    icEpoxyLaser,
    v2PixelMetasurface,
    v2PixelSiLattice,
    v2PixelHybridBondCu,
    v2PixelAiCircuit,
    v2BionzGaaNanosheet,
    v2BionzSramArray,
    v2BionzBacksidePdn,
    v2BionzGlassCoreTgv,
  ];

  return {
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
    icEpoxyLaser,
    v2PixelMetasurface,
    v2PixelSiLattice,
    v2PixelHybridBondCu,
    v2PixelAiCircuit,
    v2BionzGaaNanosheet,
    v2BionzSramArray,
    v2BionzBacksidePdn,
    v2BionzGlassCoreTgv,
    list,
  };
}
