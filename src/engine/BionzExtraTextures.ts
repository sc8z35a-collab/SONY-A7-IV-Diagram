import * as THREE from 'three';
import {
  GPU_PROFILE,
  NATIVE_HI_TEX_H,
  NATIVE_HI_TEX_W,
} from './GpuOptimizer';

/**
 * 18 Brand-New Forensic-Grade Bespoke PBR Materials for the 24 Real-World
 * Companion & Deep-Package Expansion Parts of Sony BIONZ XR / XR2 (XR47–XR70).
 *
 * Grounded in real Sony α7 IV (ILCE-7M4 SY-1122 / 1-009-592-41), α7R V (ILCE-7RM5
 * Dedicated AI Processing Unit + 2GB LPDDR4), OpenMemories (Renesas R2J30503LG "Bonobo",
 * ST STM32F031E6 "Genlock", always-on RTC Power IC), and verified component datasheets:
 *   - Murata Wi-Fi 6E 2x2 MIMO + BT 5.3 Shielded LGA SiP (LBEE5HY2BC / Type 1XL)
 *   - TI TPS65987D USB-C PD 3.1 Controller & TI TUSB1044 10 Gbps Redriver
 *   - TI BQ25713 Buck-Boost NVDC Charger & TI TPS25982 2.7mΩ 15A Smart eFuse
 *   - Renesas 9FGV0241 100 MHz PCIe Gen4 HCSL Clock Gen & Diodes PI3PCIE3412 MUX
 *   - Murata DLM0NSN900HY2 MIPI-DSI Common-Mode Chokes
 *   - AKM AK4619VN 32-QFN 4-Ch 24/32-Bit Audio CODEC
 *   - Epson XV7011BB Quartz Angular-Rate Gyro (5.0×3.2×1.3mm, ±1°/s)
 *   - TI DRV8837 WSON-8 1.8A Shutter/Aperture H-Bridge Driver
 *   - Epson FC-135 32.768 kHz Crystal & Seiko MS621FE 3V 5.5mAh Backup Cell
 *   - TI BQ27441-G1 Fuel Gauge, TI TMP117 ±0.1°C Temp Sensor & TI TPS3808 Supervisor
 */
export interface BionzExtraMaterials {
  bionzDieIoEsdRing: THREE.MeshPhysicalMaterial;
  bionzMtcmosGateRing: THREE.MeshPhysicalMaterial;
  bionzMbistDummySi: THREE.MeshPhysicalMaterial;
  bionzMgChassisPedestal: THREE.MeshPhysicalMaterial;
  bionzSy1122Mainboard: THREE.MeshPhysicalMaterial;
  bionzRearEmiShield: THREE.MeshPhysicalMaterial;
  bionzAiCoprocPkg: THREE.MeshPhysicalMaterial;
  bionzWifi6eSipCan: THREE.MeshPhysicalMaterial;
  bionzUsbcPdPcb: THREE.MeshPhysicalMaterial;
  bionzChargerEfusePcb: THREE.MeshPhysicalMaterial;
  bionzPcieCfxMuxPcb: THREE.MeshPhysicalMaterial;
  bionzMipiEvfBridgePcb: THREE.MeshPhysicalMaterial;
  bionzAkmAudioPcb: THREE.MeshPhysicalMaterial;
  bionzIbisServoPcb: THREE.MeshPhysicalMaterial;
  bionzEpsonGyroPcb: THREE.MeshPhysicalMaterial;
  bionzShutterDriverPcb: THREE.MeshPhysicalMaterial;
  bionzRtcCoinBackupPcb: THREE.MeshPhysicalMaterial;
  bionzTelemetryGuardPcb: THREE.MeshPhysicalMaterial;
  bionzTiQfnIc: THREE.MeshPhysicalMaterial;
  bionzAkmCodecIc: THREE.MeshPhysicalMaterial;
  bionzRenesasBonoboIc: THREE.MeshPhysicalMaterial;
  bionzSeikoCoinTop: THREE.MeshPhysicalMaterial;
  bionzEpsonQuartzLid: THREE.MeshPhysicalMaterial;
  extraList: THREE.Material[];
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

function toHiTex(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
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

function drawBrushedMetal(
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
    ctx.strokeStyle =
      pass === 0 ? `rgba(255,255,255,${lightAlpha})` : `rgba(10,16,28,${darkAlpha})`;
    ctx.lineWidth = 0.9;
    for (let i = 0; i < half; i++) {
      if (vertical) {
        const x = rng() * w;
        const y0 = rng() * h;
        const len = 55 + rng() * (h * 0.45);
        ctx.moveTo(x, y0);
        ctx.lineTo(x, Math.min(h, y0 + len));
      } else {
        const y = rng() * h;
        const x0 = rng() * w;
        const len = 55 + rng() * (w * 0.45);
        ctx.moveTo(x0, y);
        ctx.lineTo(Math.min(w, x0 + len), y);
      }
    }
    ctx.stroke();
  }
}

function drawQrMatrix(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  cells: number,
  seed: number,
  fg: string,
  bg: string
): void {
  const rng = mulberry32(seed);
  const c = size / cells;
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = fg;
  for (let r = 0; r < cells; r++) {
    for (let k = 0; k < cells; k++) {
      const border = r === 0 || k === 0 || ((r === cells - 1 || k === cells - 1) && (r + k) % 2 === 0);
      if (border || rng() > 0.48) {
        ctx.fillRect(x + k * c, y + r * c, c * 0.92, c * 0.92);
      }
    }
  }
}

function drawGoldPad(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r = 3
): void {
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, '#f3d47d');
  g.addColorStop(0.5, '#d5a844');
  g.addColorStop(1, '#a97d22');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function drawVia(ctx: CanvasRenderingContext2D, cx: number, cy: number, r = 5.2): void {
  ctx.fillStyle = '#d4aa4c';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#09110d';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.46, 0, Math.PI * 2);
  ctx.fill();
}

function drawEmeraldPcbBase(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  seed: number,
  tint: 'emerald' | 'deepTeal' | 'darkForest' = 'emerald'
): void {
  const grad = ctx.createLinearGradient(0, 0, w, h);
  if (tint === 'deepTeal') {
    grad.addColorStop(0, '#0a332d');
    grad.addColorStop(0.5, '#0d443c');
    grad.addColorStop(1, '#072722');
  } else if (tint === 'darkForest') {
    grad.addColorStop(0, '#0d311f');
    grad.addColorStop(0.5, '#12422b');
    grad.addColorStop(1, '#082115');
  } else {
    grad.addColorStop(0, '#0c3a25');
    grad.addColorStop(0.5, '#124d33');
    grad.addColorStop(1, '#092d1d');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle FR-4 woven glass-fiber under-relief
  ctx.strokeStyle = 'rgba(130, 215, 170, 0.045)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < w; i += 14) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
  }
  for (let j = 0; j < h; j += 14) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(w, j);
    ctx.stroke();
  }

  // Ground-pour copper hatch + edge stitching vias
  ctx.strokeStyle = 'rgba(38, 125, 84, 0.24)';
  ctx.lineWidth = 2.4;
  ctx.strokeRect(18, 18, w - 36, h - 36);

  const rng = mulberry32(seed);
  for (let i = 0; i < 16; i++) {
    const t = 42 + (i * (w - 84)) / 15;
    drawVia(ctx, t, 24, 4.4);
    drawVia(ctx, t, h - 24, 4.4);
    if (i > 0 && i < 15 && i % 2 === 0) {
      drawVia(ctx, 24, 42 + (i * (h - 84)) / 15, 4.4);
      drawVia(ctx, w - 24, 42 + (i * (h - 84)) / 15, 4.4);
    }
  }
  // Subtle copper internal planes under solder mask
  ctx.fillStyle = 'rgba(26, 108, 70, 0.16)';
  for (let k = 0; k < 6; k++) {
    const px = 48 + rng() * (w - 220);
    const py = 54 + rng() * (h - 200);
    ctx.fillRect(px, py, 70 + rng() * 110, 44 + rng() * 75);
  }
}

function drawDiffPairTraces(
  ctx: CanvasRenderingContext2D,
  pairs: Array<[number, number, number, number]>,
  color = 'rgba(54, 172, 114, 0.44)'
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.4;
  for (const [x0, y0, x1, y1] of pairs) {
    const mx = (x0 + x1) * 0.5;
    for (const off of [-3.2, 3.2]) {
      ctx.beginPath();
      ctx.moveTo(x0, y0 + off);
      ctx.lineTo(mx - 14, y0 + off);
      ctx.lineTo(mx + 14, y1 + off);
      ctx.lineTo(x1, y1 + off);
      ctx.stroke();
    }
  }
}

function drawLaserSilkHeader(
  ctx: CanvasRenderingContext2D,
  w: number,
  topText: string,
  botText: string,
  color = 'rgba(232, 244, 236, 0.88)'
): void {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(topText, w * 0.5, 46);
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillText(botText, w * 0.5, w - 46);
  ctx.restore();
}

// 1. XR47 — Die-Perimeter HBM/CDM ESD Clamp Diode & I/O Pad Ring
function createDieIoEsdRingTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  ctx.fillStyle = '#141e2e';
  ctx.fillRect(0, 0, w, h);

  // Outer passivation guard ring & inner power clamp bus
  ctx.strokeStyle = '#d4a33a';
  ctx.lineWidth = 10;
  ctx.strokeRect(24, 24, w - 48, h - 48);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 5;
  ctx.strokeRect(46, 46, w - 92, h - 92);

  // Perimeter I/O bond pads + dual ESD clamp diode fingers
  for (let i = 0; i < 16; i++) {
    const p = 76 + (i * (w - 152)) / 15;
    drawGoldPad(ctx, p - 12, 58, 24, 34, 4);
    drawGoldPad(ctx, p - 12, h - 92, 24, 34, 4);
    drawGoldPad(ctx, 58, p - 12, 34, 24, 4);
    drawGoldPad(ctx, w - 92, p - 12, 34, 24, 4);
    // P+/N+ diode stripes inward from pad
    ctx.fillStyle = i % 2 === 0 ? '#f43f5e' : '#38bdf8';
    ctx.fillRect(p - 9, 98, 18, 12);
    ctx.fillRect(p - 9, h - 110, 18, 12);
    ctx.fillRect(98, p - 9, 12, 18);
    ctx.fillRect(w - 110, p - 9, 12, 18);
  }
  drawLaserSilkHeader(ctx, w, 'HBM ±2kV / CDM ±500V  ESD DOUBLE-DIODE RING', 'VDD_IO / VSS_ESD CLAMP BUS  |  168 I/O CELLS', '#fde68a');
  return toHiTex(canvas);
}

// 2. XR48 — MTCMOS Fine-Grain Power-Gating Sleep-Transistor Header Ring
function createMtcmosGateRingTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#121c38');
  grad.addColorStop(0.5, '#1b2b52');
  grad.addColorStop(1, '#0e172f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // High-Vt pMOS header switch stripes around perimeter
  for (let s = 0; s < 24; s++) {
    const pos = 62 + (s * (w - 124)) / 23;
    ctx.fillStyle = s % 3 === 0 ? '#eab308' : '#60a5fa';
    ctx.fillRect(pos - 8, 52, 16, 46);
    ctx.fillRect(pos - 8, h - 98, 16, 46);
    ctx.fillRect(52, pos - 8, 46, 16);
    ctx.fillRect(w - 98, pos - 8, 46, 16);
  }
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 4;
  ctx.strokeRect(108, 108, w - 216, h - 216);
  drawLaserSilkHeader(ctx, w, 'MTCMOS HIGH-Vt pMOS HEADER SWITCH RING', '12 POWER DOMAINS  |  <40ns WAKE  |  LEAK -96%', '#93c5fd');
  return toHiTex(canvas);
}

// 3. XR49 — MBIST / IEEE 1687 IJTAG DFT Controller & Silicon Dummy Thermal Spacer
function createMbistDummySiTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#2a3342');
  grad.addColorStop(0.45, '#3b485c');
  grad.addColorStop(1, '#1e2633');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedMetal(ctx, w, h, true, 160, 4901, 0.05, 0.05);

  // Dummy thermal silicon TSV array + MBIST march-test cell grid
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 8; c++) {
      const x = 96 + c * 78;
      const y = 84 + r * 44;
      ctx.fillStyle = (r + c) % 2 === 0 ? 'rgba(148,163,184,0.22)' : 'rgba(56,189,248,0.16)';
      ctx.fillRect(x, y, 60, 30);
      ctx.strokeStyle = 'rgba(226,232,240,0.32)';
      ctx.lineWidth = 1.1;
      ctx.strokeRect(x, y, 60, 30);
    }
  }
  // Lithography alignment vernier crosshair
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(w * 0.5 - 38, h * 0.5);
  ctx.lineTo(w * 0.5 + 38, h * 0.5);
  ctx.moveTo(w * 0.5, h * 0.5 - 38);
  ctx.lineTo(w * 0.5, h * 0.5 + 38);
  ctx.stroke();
  drawLaserSilkHeader(ctx, w, 'Si THERMAL DUMMY SPACER + IJTAG MBIST', 'CTE 2.6ppm/K SYMMETRY SHIM  |  MARCH-C+ BIST', '#e2e8f0');
  return toHiTex(canvas);
}

// 4. XR50 — Magnesium-Alloy Chassis Die-Cast Thermal Pedestal (AZ91D)
function createMgChassisPedestalTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#5c646d');
  grad.addColorStop(0.5, '#727b85');
  grad.addColorStop(1, '#4c535c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Fine bead-blasted die-cast magnesium grain
  const rng = mulberry32(5002);
  for (let i = 0; i < 3200; i++) {
    const x = rng() * w;
    const y = rng() * h;
    const v = rng() > 0.5 ? 'rgba(255,255,255,0.065)' : 'rgba(15,20,28,0.075)';
    ctx.fillStyle = v;
    ctx.fillRect(x, y, 2.2, 2.2);
  }
  // CNC milled structural ribs & recess pocket
  ctx.strokeStyle = 'rgba(226,232,240,0.42)';
  ctx.lineWidth = 4;
  ctx.strokeRect(44, 44, w - 88, h - 88);
  ctx.strokeStyle = 'rgba(30,41,59,0.5)';
  ctx.lineWidth = 3;
  ctx.strokeRect(110, 110, w - 220, h - 220);

  // Laser-stamped mold ID & QR
  drawQrMatrix(ctx, 560, 560, 88, 13, 5050, '#e2e8f0', '#334155');
  ctx.fillStyle = 'rgba(241,245,249,0.85)';
  ctx.font = '700 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('SONY  AZ91D-Mg  DIE-CAST', 132, 168);
  ctx.font = '600 17px "JetBrains Mono", monospace';
  ctx.fillText('FRAME-THM-PEDESTAL  k=72 W/mK', 132, 200);
  ctx.fillText('TIM3 GAP-FILLER ZONE  4.5 W/mK', 132, 608);
  ctx.fillText('M1.7 x 4  TORQUE 0.14 N·m', 132, 636);
  return toHiTex(canvas);
}

// 5. XR51 — Sony SY-1122 (1-009-592-41) 12-Layer Any-Layer HDI Mainboard
function createSy1122MainboardTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 5101, 'emerald');

  // Center BIONZ XR BGA landing pad courtyard (gold ENIG ball grid!)
  const cx = w * 0.5;
  const cy = h * 0.5;
  ctx.fillStyle = '#072418';
  ctx.fillRect(cx - 134, cy - 134, 268, 268);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2.4;
  ctx.strokeRect(cx - 138, cy - 138, 276, 276);

  // 14x14 ENIG BGA landing pads with center ground courtyard
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 14; c++) {
      if (r >= 5 && r <= 8 && c >= 5 && c <= 8) continue;
      const px = cx - 117 + c * 18;
      const py = cy - 117 + r * 18;
      ctx.fillStyle = '#e5bc5b';
      ctx.beginPath();
      ctx.arc(px, py, 4.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#092418';
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // High-speed differential bus highways fanning out from BIONZ XR BGA to all 4 edges!
  drawDiffPairTraces(ctx, [
    [cx - 140, cy - 88, 62, cy - 110],
    [cx - 140, cy - 36, 62, cy - 36],
    [cx - 140, cy + 44, 62, cy + 62],
    [cx + 140, cy - 88, w - 62, cy - 110],
    [cx + 140, cy - 12, w - 62, cy - 12],
    [cx + 140, cy + 72, w - 62, cy + 92],
  ], 'rgba(74, 222, 128, 0.36)');

  // Vertical SLVS-EC / MIPI / IBIS buses
  ctx.strokeStyle = 'rgba(74, 222, 128, 0.34)';
  ctx.lineWidth = 2.2;
  for (let k = -5; k <= 5; k++) {
    ctx.beginPath();
    ctx.moveTo(cx + k * 14, cy + 140);
    ctx.lineTo(cx + k * 18, h - 54);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + k * 14, cy - 140);
    ctx.lineTo(cx + k * 18, 54);
    ctx.stroke();
  }

  // Corner mounting hole gold grounding petals
  for (const [mx, my] of [[52, 52], [w - 52, 52], [52, h - 52], [w - 52, h - 52]]) {
    ctx.fillStyle = '#e0b752';
    ctx.beginPath();
    ctx.arc(mx, my, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#071a11';
    ctx.beginPath();
    ctx.arc(mx, my, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  drawQrMatrix(ctx, w - 128, h - 134, 62, 11, 5112, '#072418', '#f1f5f9');
  ctx.fillStyle = 'rgba(241,245,249,0.92)';
  ctx.font = '700 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SONY  SY-1122  1-009-592-41  (ILCE-7M4)', cx, 50);
  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.fillText('12-LAYER ANY-LAYER HDI  |  μVIA STACK  |  IC1001 BIONZ XR', cx, h - 48);
  return toHiTex(canvas);
}

// 6. XR52 — Stamped SUS304 Stainless Rear EMI Faraday Shield Can
function createRearEmiShieldTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#9aa5b4');
  grad.addColorStop(0.5, '#cbd5e1');
  grad.addColorStop(1, '#7c8898');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedMetal(ctx, w, h, false, 260, 5201, 0.08, 0.07);

  // Embossed stiffening bead frame & dimpled clip perimeter
  ctx.strokeStyle = 'rgba(30,41,59,0.52)';
  ctx.lineWidth = 6;
  ctx.strokeRect(48, 48, w - 96, h - 96);
  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(54, 54, w - 108, h - 108);

  // Micro-ventilation / RF cutoff perforation matrix
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 10; c++) {
      const vx = 148 + c * 52;
      const vy = 228 + r * 52;
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(vx, vy, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
  }
  drawQrMatrix(ctx, 566, 90, 86, 12, 5252, '#1e293b', '#e2e8f0');
  ctx.fillStyle = '#1e293b';
  ctx.font = '700 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('SHIELD-SY1122-REAR  SUS304', 86, 122);
  ctx.font = '600 17px "JetBrains Mono", monospace';
  ctx.fillText('BGA-SHADOW 01005 MLCC FARADAY CAGE  -58dB', 86, 156);
  ctx.fillText('SNAP-IN EMI FENCE  |  0.20mm C7521 NICKEL SILVER', 86, 668);
  return toHiTex(canvas);
}

// 7. XR53 — Dedicated AI Processing Unit Companion BGA (α7R V / α9 III)
function createAiCoprocPkgTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#1e222b');
  grad.addColorStop(0.5, '#2b313e');
  grad.addColorStop(1, '#15181f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedMetal(ctx, w, h, true, 140, 5301, 0.04, 0.05);

  // Metallic chamfer border + pin-1 triangle
  ctx.strokeStyle = 'rgba(196,181,253,0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, w - 64, h - 64);
  ctx.fillStyle = '#c4b5fd';
  ctx.beginPath();
  ctx.moveTo(52, 52);
  ctx.lineTo(106, 52);
  ctx.lineTo(52, 106);
  ctx.closePath();
  ctx.fill();

  // Subtle violet NPU die-silhouette graphic & authentic laser marking
  ctx.strokeStyle = 'rgba(139,92,246,0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(120, 140, w - 240, h - 280);

  ctx.fillStyle = '#f1f5f9';
  ctx.textAlign = 'center';
  ctx.font = '700 44px "JetBrains Mono", monospace';
  ctx.fillText('SONY', w * 0.5, 224);
  ctx.font = '700 32px "JetBrains Mono", monospace';
  ctx.fillStyle = '#ddd6fe';
  ctx.fillText('AI PROCESSING UNIT', w * 0.5, 294);
  ctx.font = '600 24px "JetBrains Mono", monospace';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('CXD90066GG  α7R V / α9 III', w * 0.5, 354);
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillStyle = '#a5b4fc';
  ctx.fillText('DEEP LEARNING POSE / 7-SUBJECT AF', w * 0.5, 424);
  ctx.fillText('DEDICATED 2GB LPDDR4-3733 BUS', w * 0.5, 464);
  drawQrMatrix(ctx, w * 0.5 - 48, 522, 96, 13, 5353, '#f8fafc', '#1e222b');
  return toHiTex(canvas);
}

// 8. XR54 — Murata Wi-Fi 6E (2x2 MIMO) & Bluetooth 5.3 Shielded LGA SiP Lid
function createWifi6eSipCanTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#a6b1be');
  grad.addColorStop(0.5, '#d5dde6');
  grad.addColorStop(1, '#8b96a5');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedMetal(ctx, w, h, false, 240, 5401, 0.08, 0.06);

  ctx.strokeStyle = 'rgba(30,41,59,0.5)';
  ctx.lineWidth = 5;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  // Pin-1 laser dot
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(76, 76, 16, 0, Math.PI * 2);
  ctx.fill();

  // Authentic Murata laser marking
  ctx.textAlign = 'left';
  ctx.fillStyle = '#0f172a';
  ctx.font = '700 42px "JetBrains Mono", monospace';
  ctx.fillText('muRata', 120, 142);
  ctx.font = '700 30px "JetBrains Mono", monospace';
  ctx.fillText('LBEE5HY2BC  TYPE 2BC', 120, 214);
  ctx.font = '600 22px "JetBrains Mono", monospace';
  ctx.fillText('Wi-Fi 6E 2x2 MIMO + BT 5.3', 120, 272);
  ctx.fillText('2.4 / 5 / 6 GHz  802.11ax', 120, 314);
  ctx.fillText('CYW55573 / MHF4 ANT0 + ANT1', 120, 356);

  // Regulatory compliance badges (FCC / CE / TELEC)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3;
  ctx.strokeRect(120, 444, 152, 54);
  ctx.strokeRect(294, 444, 110, 54);
  ctx.font = '700 22px "JetBrains Mono", monospace';
  ctx.fillText('FCC / IC', 142, 478);
  ctx.fillText('CE  R', 316, 478);

  drawQrMatrix(ctx, 514, 424, 156, 15, 5454, '#0f172a', '#e2e8f0');
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText('LOT 2604J  SONY AN-1043 RF LINK', 120, 648);
  return toHiTex(canvas);
}

// 9. XR55 — USB Type-C PD 3.1 (TI TPS65987D) & 10 Gbps Redriver (TI TUSB1044) PCB
function createUsbcPdPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 5501, 'deepTeal');

  drawDiffPairTraces(ctx, [
    [90, 210, 678, 210],
    [90, 280, 678, 280],
    [90, 490, 678, 490],
    [90, 560, 678, 560],
  ], 'rgba(56, 189, 248, 0.45)');

  // Gold Type-C 24-pin landing finger strip
  for (let i = 0; i < 12; i++) {
    drawGoldPad(ctx, 590, 144 + i * 40, 88, 18, 3);
  }
  drawLaserSilkHeader(ctx, w, 'USB-C 10Gbps  TI TPS65987D + TUSB1044', '90Ω DIFF TX/RX  |  USB-PD 3.1  |  CC1/CC2', '#bae6fd');
  return toHiTex(canvas);
}

// 10. XR56 — USB-C PD Buck-Boost Charger (TI BQ25713) & 15A Smart eFuse (TI TPS25982)
function createChargerEfusePcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 5601, 'darkForest');

  // Heavy 2oz copper power pour polygons
  ctx.fillStyle = 'rgba(217, 165, 62, 0.25)';
  ctx.fillRect(72, 124, 280, 236);
  ctx.fillRect(410, 124, 286, 236);
  ctx.fillRect(72, 412, 624, 234);

  // Thermal via arrays under buck-boost MOSFETs & eFuse
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      drawVia(ctx, 118 + c * 36, 178 + r * 36, 5.2);
      drawVia(ctx, 456 + c * 36, 178 + r * 36, 5.2);
    }
  }
  drawLaserSilkHeader(ctx, w, 'TI BQ25713 NVDC BUCK-BOOST + TPS25982', '2.7mΩ 15A SMART eFUSE  |  2oz Cu  |  R010 SHUNT', '#fde68a');
  return toHiTex(canvas);
}

// 11. XR57 — 100 MHz PCIe Gen4 Clock Gen (Renesas 9FGV0241) & CFx/UHS-II MUX (PI3PCIE3412)
function createPcieCfxMuxPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 5701, 'emerald');

  // Serpentine length-matched 85Ω PCIe Gen4 differential meanders
  ctx.strokeStyle = 'rgba(244, 114, 182, 0.48)';
  ctx.lineWidth = 2.6;
  for (let lane = 0; lane < 4; lane++) {
    const baseY = 172 + lane * 136;
    for (const off of [-4, 4]) {
      ctx.beginPath();
      ctx.moveTo(64, baseY + off);
      for (let x = 140; x <= 600; x += 48) {
        ctx.lineTo(x, baseY + off);
        ctx.lineTo(x + 12, baseY + off + (lane % 2 === 0 ? -18 : 18));
        ctx.lineTo(x + 28, baseY + off + (lane % 2 === 0 ? -18 : 18));
        ctx.lineTo(x + 40, baseY + off);
      }
      ctx.lineTo(704, baseY + off);
      ctx.stroke();
    }
  }
  drawLaserSilkHeader(ctx, w, 'RENESAS 9FGV0241 100MHz HCSL + PI3PCIE3412', '85Ω LENGTH-MATCHED  |  CFexpress-A / SD UHS-II', '#fbcfe8');
  return toHiTex(canvas);
}

// 12. XR58 — Dual-Stream MIPI-DSI 240Hz EVF & LCD Bridge + Murata DLM0NSN Chokes
function createMipiEvfBridgePcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 5801, 'deepTeal');

  // 5-lane MIPI D-PHY differential trace corridors (4 Data + 1 Clock)
  for (let i = 0; i < 5; i++) {
    const x = 148 + i * 118;
    ctx.strokeStyle = 'rgba(103, 232, 249, 0.48)';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(x - 4, 84);
    ctx.lineTo(x - 4, h - 84);
    ctx.moveTo(x + 4, 84);
    ctx.lineTo(x + 4, h - 84);
    ctx.stroke();
    drawGoldPad(ctx, x - 20, 128, 40, 22, 3);
    drawGoldPad(ctx, x - 20, h - 150, 40, 22, 3);
  }
  drawLaserSilkHeader(ctx, w, 'MIPI-DSI 240Hz EVF / LCD BRIDGE  100Ω DIFF', 'MURATA DLM0NSN900HY2 CM CHOKE BANK', '#a5f3fc');
  return toHiTex(canvas);
}

// 13. XR59 — High-Res Audio CODEC (AKM AK4619VN) Split-Ground Audio Island PCB
function createAkmAudioPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 5901, 'darkForest');

  // Visible gold AGND / DGND isolation moat (authentic audiophile layout!)
  ctx.fillStyle = '#05150e';
  ctx.fillRect(w * 0.5 - 12, 86, 24, h - 172);
  ctx.strokeStyle = '#f5c85b';
  ctx.lineWidth = 4;
  ctx.strokeRect(56, 94, w * 0.5 - 78, h - 188);
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 3;
  ctx.strokeRect(w * 0.5 + 22, 94, w * 0.5 - 78, h - 188);

  ctx.fillStyle = '#fde68a';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('AGND (ANALOG)', w * 0.26, 134);
  ctx.fillStyle = '#93c5fd';
  ctx.fillText('DGND (I2S/TDM)', w * 0.74, 134);
  drawLaserSilkHeader(ctx, w, 'AKM AK4619VN  4-CH 24b/32b 192kHz CODEC', 'SPLIT AGND/DGND MOAT  |  SNR 106dB  |  LOW-Z LDO', '#fef08a');
  return toHiTex(canvas);
}

// 14. XR63 — 5-Axis IBIS Servo MCU (Renesas R2J30503LG "Bonobo") PCB
function createIbisServoPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 6301, 'emerald');

  // 3-Axis Hall-Effect Differential Sense Channels + VCM PWM Gate Traces
  drawDiffPairTraces(ctx, [
    [76, 188, 360, 290],
    [76, 384, 360, 384],
    [76, 580, 360, 478],
    [408, 290, 692, 188],
    [408, 384, 692, 384],
    [408, 478, 692, 580],
  ], 'rgba(251, 191, 36, 0.45)');

  // 5-Axis coordinate crosshair stencil
  ctx.strokeStyle = 'rgba(253, 224, 71, 0.35)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, 132, 0, Math.PI * 2);
  ctx.stroke();

  drawLaserSilkHeader(ctx, w, 'RENESAS R2J30503LG "BONOBO" 5-AXIS IBIS', 'IBIS TEX-5810  |  HALL X/Y/θ  |  1kHz PID SERVO', '#fde047');
  return toHiTex(canvas);
}

// 15. XR64 — Dual Orthogonal Epson XV7011BB Quartz Gyro Module PCB
function createEpsonGyroPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 6401, 'deepTeal');

  // Anti-resonance moat slots around the 2 orthogonal gyro islands
  ctx.strokeStyle = '#e5b84b';
  ctx.lineWidth = 5;
  ctx.strokeRect(72, 128, 280, 240);
  ctx.strokeRect(416, 128, 280, 240);

  // Pitch (0°) & Yaw (90°) vector arrows
  ctx.fillStyle = '#fde68a';
  ctx.font = '700 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PITCH GYRO 0°', 212, 412);
  ctx.fillText('YAW GYRO 90°', 556, 412);
  ctx.fillStyle = '#a5f3fc';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText('EPSON XV7011BB  5.0×3.2mm  ±1°/s BIAS', w * 0.5, 514);
  ctx.fillText('DOUBLE-T QUARTZ TUNING FORK  |  24b SPI', w * 0.5, 558);

  drawLaserSilkHeader(ctx, w, 'DUAL ORTHOGONAL QUARTZ GYRO + 3-AXIS IMU', 'ANTI-RESONANCE ISOLATION DECK  |  STEADYSHOT', '#fef08a');
  return toHiTex(canvas);
}

// 16. XR65 / XR60 / XR61 / XR62 — Actuator, Shutter H-Bridge & Interface Carrier PCB
function createShutterDriverPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 6501, 'emerald');

  // Wide high-current solenoid / motor traces + gold contact fingers
  ctx.fillStyle = 'rgba(248, 113, 113, 0.24)';
  ctx.fillRect(68, 130, 632, 118);
  ctx.fillStyle = 'rgba(96, 165, 250, 0.24)';
  ctx.fillRect(68, 520, 632, 118);
  for (let i = 0; i < 10; i++) {
    drawGoldPad(ctx, 94 + i * 60, 650, 34, 42, 4);
  }
  drawLaserSilkHeader(ctx, w, 'TI DRV8837 1.8A H-BRIDGE  |  EBL / MIS-2006', '280mΩ RDS(on)  |  SHUTTER / LENS / SYNC BUS', '#fecaca');
  return toHiTex(canvas);
}

// 17. XR66 — Always-On RTC Power IC + Epson FC-135 32.768kHz + Seiko MS621FE Coin Cell
function createRtcCoinBackupPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 6601, 'darkForest');

  // Circular keep-out guard ring for Seiko MS621FE Ø6.8mm backup battery
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 3.5;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.arc(236, h * 0.5, 162, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Low-leakage guard ring around 32.768 kHz Epson FC-135 crystal
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 3;
  ctx.strokeRect(444, 152, 232, 146);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '700 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BAT_RTC +3.0V', 236, h * 0.5 + 196);
  ctx.fillText('FC-135 32.768kHz', 560, 336);
  drawLaserSilkHeader(ctx, w, 'SONY RTC POWER IC + SEIKO MS621FE 5.5mAh', 'ALWAYS-ON WAKE SEQUENCER  |  ±20ppm QUARTZ', '#e2e8f0');
  return toHiTex(canvas);
}

// 18. XR67 / XR68 / XR69 / XR70 — Precision Telemetry, Fuel Gauge & Watchdog Guard PCB
function createTelemetryGuardPcbTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  drawEmeraldPcbBase(ctx, w, h, 6801, 'deepTeal');

  // 4 Kelvin 4-wire sensing channels (NTC / Battery Shunt / Power-Good Ladder)
  for (let i = 0; i < 4; i++) {
    const y = 164 + i * 144;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(52, 211, 153, 0.52)' : 'rgba(251, 191, 36, 0.52)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(64, y - 6);
    ctx.lineTo(704, y - 6);
    ctx.moveTo(64, y + 6);
    ctx.lineTo(704, y + 6);
    ctx.stroke();
    drawGoldPad(ctx, 64, y - 16, 48, 32, 4);
    drawGoldPad(ctx, 656, y - 16, 48, 32, 4);
  }
  drawLaserSilkHeader(ctx, w, 'TI TMP117 ±0.1°C  |  BQ27441  |  TPS3808', '400kHz I2C SMBus  |  KELVIN SHUNT  |  PG-LADDER', '#6ee7b7');
  return toHiTex(canvas);
}

// 19. Dedicated TI Laser-Marked WQFN / WSON Package Top (TPS65987D / TUSB1044 / BQ25713 / TPS25982 / DRV8837 / TMP117)
function createTiQfnIcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#1e232c');
  grad.addColorStop(0.5, '#2b313d');
  grad.addColorStop(1, '#161a21');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedMetal(ctx, w, h, false, 120, 7101, 0.035, 0.045);

  ctx.strokeStyle = 'rgba(148,163,184,0.34)';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, w - 56, h - 56);
  // Pin-1 laser crater dot
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(88, 88, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f1f5f9';
  ctx.textAlign = 'center';
  ctx.font = '700 48px "JetBrains Mono", monospace';
  ctx.fillText('TI  26A', w * 0.5, 240);
  ctx.font = '700 32px "JetBrains Mono", monospace';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('TEXAS INSTRUMENTS', w * 0.5, 316);
  ctx.font = '600 24px "JetBrains Mono", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('WQFN / WSON  SY-1122', w * 0.5, 384);
  ctx.fillText('LOT 64K  G4  Pb-FREE', w * 0.5, 434);
  drawQrMatrix(ctx, w * 0.5 - 52, 494, 104, 12, 7119, '#f8fafc', '#1e232c');
  return toHiTex(canvas);
}

// 20. Dedicated AKM AK4619VN 32-QFN Velvet Sound Audio CODEC Top
function createAkmCodecIcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#1a1d26');
  grad.addColorStop(0.5, '#272c38');
  grad.addColorStop(1, '#13161d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(216,180,254,0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, w - 56, h - 56);
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(88, 88, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 54px "JetBrains Mono", monospace';
  ctx.fillText('AKM', w * 0.5, 224);
  ctx.font = '700 40px "JetBrains Mono", monospace';
  ctx.fillStyle = '#e9d5ff';
  ctx.fillText('AK4619VN', w * 0.5, 304);
  ctx.font = '600 24px "JetBrains Mono", monospace';
  ctx.fillStyle = '#fde68a';
  ctx.fillText('VELVET SOUND  4-CH', w * 0.5, 372);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('24b/32b 192kHz  106dB', w * 0.5, 422);
  drawQrMatrix(ctx, w * 0.5 - 50, 488, 100, 12, 7120, '#f8fafc', '#1a1d26');
  return toHiTex(canvas);
}

// 21. Dedicated Renesas R2J30503LG "Bonobo" 5-Axis IBIS Servo MCU Top
function createRenesasBonoboIcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#1c222c');
  grad.addColorStop(0.5, '#293140');
  grad.addColorStop(1, '#141920');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(250,204,21,0.42)';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, w - 56, h - 56);
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(88, 88, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 44px "JetBrains Mono", monospace';
  ctx.fillText('RENESAS', w * 0.5, 224);
  ctx.font = '700 36px "JetBrains Mono", monospace';
  ctx.fillStyle = '#fde047';
  ctx.fillText('R2J30503LG', w * 0.5, 300);
  ctx.font = '600 24px "JetBrains Mono", monospace';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('"BONOBO" 5-AXIS IBIS', w * 0.5, 368);
  ctx.fillText('1kHz PID SERVO  JAPAN', w * 0.5, 418);
  drawQrMatrix(ctx, w * 0.5 - 50, 488, 100, 12, 7121, '#f8fafc', '#1c222c');
  return toHiTex(canvas);
}

// 22. Dedicated Seiko MS621FE 3.0V Rechargeable Manganese-Lithium Coin Cell Top Disc
function createSeikoCoinTopTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const grad = ctx.createRadialGradient(cx - 80, cy - 80, 40, cx, cy, w * 0.5);
  grad.addColorStop(0, '#eef2f6');
  grad.addColorStop(0.55, '#cbd5e1');
  grad.addColorStop(1, '#8b97a8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Concentric lathe-spun stainless grain rings
  ctx.strokeStyle = 'rgba(30,41,59,0.16)';
  ctx.lineWidth = 2;
  for (let r = 64; r < 370; r += 26) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, 336, 0, Math.PI * 2);
  ctx.stroke();

  // Authentic Seiko MS621FE laser engraving
  ctx.fillStyle = '#1e293b';
  ctx.textAlign = 'center';
  ctx.font = '800 76px "JetBrains Mono", monospace';
  ctx.fillText('+', cx, 186);
  ctx.font = '700 54px "JetBrains Mono", monospace';
  ctx.fillText('SEIKO', cx, 326);
  ctx.font = '700 46px "JetBrains Mono", monospace';
  ctx.fillText('MS621FE', cx, 404);
  ctx.font = '600 32px "JetBrains Mono", monospace';
  ctx.fillText('3.0V  5.5mAh', cx, 488);
  ctx.font = '600 26px "JetBrains Mono", monospace';
  ctx.fillText('Li-MnO2  JAPAN', cx, 558);
  return toHiTex(canvas);
}

// 23. Dedicated Epson Quartz Seam-Welded Gold-Ceramic Lid (XV7011BB / FC-135 / VCXO)
function createEpsonQuartzLidTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#f3d47a');
  grad.addColorStop(0.5, '#d9ab43');
  grad.addColorStop(1, '#b68524');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  drawBrushedMetal(ctx, w, h, false, 180, 7123, 0.08, 0.06);

  ctx.strokeStyle = 'rgba(120,53,15,0.58)';
  ctx.lineWidth = 10;
  ctx.strokeRect(32, 32, w - 64, h - 64);

  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.arc(96, 96, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.font = '800 56px "JetBrains Mono", monospace';
  ctx.fillText('EPSON', w * 0.5, 290);
  ctx.font = '700 42px "JetBrains Mono", monospace';
  ctx.fillText('XV7011BB / QTZ', w * 0.5, 386);
  ctx.font = '600 30px "JetBrains Mono", monospace';
  ctx.fillText('DOUBLE-T QUARTZ  JAPAN', w * 0.5, 474);
  return toHiTex(canvas);
}

export function createBionzExtraMaterials(clippingPlanes: THREE.Plane[]): BionzExtraMaterials {
  const common = {
    clippingPlanes,
    clipShadows: true,
    side: THREE.DoubleSide,
  };

  const bionzDieIoEsdRing = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createDieIoEsdRingTexture(),
    metalness: 0.72,
    roughness: 0.24,
    clearcoat: 0.55,
    clearcoatRoughness: 0.14,
  });

  const bionzMtcmosGateRing = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createMtcmosGateRingTexture(),
    metalness: 0.68,
    roughness: 0.26,
    clearcoat: 0.5,
    clearcoatRoughness: 0.16,
  });

  const bionzMbistDummySi = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createMbistDummySiTexture(),
    metalness: 0.78,
    roughness: 0.18,
    clearcoat: 0.72,
    clearcoatRoughness: 0.08,
  });

  const bionzMgChassisPedestal = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createMgChassisPedestalTexture(),
    metalness: 0.66,
    roughness: 0.46,
    clearcoat: 0.12,
  });

  const bionzSy1122Mainboard = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createSy1122MainboardTexture(),
    metalness: 0.18,
    roughness: 0.42,
    clearcoat: 0.34,
    clearcoatRoughness: 0.26,
  });

  const bionzRearEmiShield = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createRearEmiShieldTexture(),
    metalness: 0.88,
    roughness: 0.28,
    clearcoat: 0.22,
  });

  const bionzAiCoprocPkg = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createAiCoprocPkgTexture(),
    metalness: 0.28,
    roughness: 0.38,
    clearcoat: 0.32,
  });

  const bionzWifi6eSipCan = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createWifi6eSipCanTexture(),
    metalness: 0.86,
    roughness: 0.26,
    clearcoat: 0.2,
  });

  const bionzUsbcPdPcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createUsbcPdPcbTexture(),
    metalness: 0.18,
    roughness: 0.42,
    clearcoat: 0.32,
  });

  const bionzChargerEfusePcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createChargerEfusePcbTexture(),
    metalness: 0.22,
    roughness: 0.44,
    clearcoat: 0.28,
  });

  const bionzPcieCfxMuxPcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createPcieCfxMuxPcbTexture(),
    metalness: 0.2,
    roughness: 0.42,
    clearcoat: 0.32,
  });

  const bionzMipiEvfBridgePcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createMipiEvfBridgePcbTexture(),
    metalness: 0.2,
    roughness: 0.42,
    clearcoat: 0.32,
  });

  const bionzAkmAudioPcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createAkmAudioPcbTexture(),
    metalness: 0.22,
    roughness: 0.4,
    clearcoat: 0.34,
  });

  const bionzIbisServoPcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createIbisServoPcbTexture(),
    metalness: 0.2,
    roughness: 0.42,
    clearcoat: 0.32,
  });

  const bionzEpsonGyroPcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createEpsonGyroPcbTexture(),
    metalness: 0.22,
    roughness: 0.4,
    clearcoat: 0.34,
  });

  const bionzShutterDriverPcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createShutterDriverPcbTexture(),
    metalness: 0.2,
    roughness: 0.44,
    clearcoat: 0.28,
  });

  const bionzRtcCoinBackupPcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createRtcCoinBackupPcbTexture(),
    metalness: 0.2,
    roughness: 0.42,
    clearcoat: 0.3,
  });

  const bionzTelemetryGuardPcb = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createTelemetryGuardPcbTexture(),
    metalness: 0.2,
    roughness: 0.42,
    clearcoat: 0.32,
  });

  const bionzTiQfnIc = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createTiQfnIcTexture(),
    metalness: 0.22,
    roughness: 0.44,
    clearcoat: 0.24,
  });

  const bionzAkmCodecIc = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createAkmCodecIcTexture(),
    metalness: 0.24,
    roughness: 0.42,
    clearcoat: 0.28,
  });

  const bionzRenesasBonoboIc = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createRenesasBonoboIcTexture(),
    metalness: 0.24,
    roughness: 0.42,
    clearcoat: 0.28,
  });

  const bionzSeikoCoinTop = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createSeikoCoinTopTexture(),
    metalness: 0.86,
    roughness: 0.26,
    clearcoat: 0.18,
  });

  const bionzEpsonQuartzLid = new THREE.MeshPhysicalMaterial({
    ...common,
    color: 0xffffff,
    map: createEpsonQuartzLidTexture(),
    metalness: 0.88,
    roughness: 0.24,
    clearcoat: 0.22,
  });

  const extraList: THREE.Material[] = [
    bionzDieIoEsdRing,
    bionzMtcmosGateRing,
    bionzMbistDummySi,
    bionzMgChassisPedestal,
    bionzSy1122Mainboard,
    bionzRearEmiShield,
    bionzAiCoprocPkg,
    bionzWifi6eSipCan,
    bionzUsbcPdPcb,
    bionzChargerEfusePcb,
    bionzPcieCfxMuxPcb,
    bionzMipiEvfBridgePcb,
    bionzAkmAudioPcb,
    bionzIbisServoPcb,
    bionzEpsonGyroPcb,
    bionzShutterDriverPcb,
    bionzRtcCoinBackupPcb,
    bionzTelemetryGuardPcb,
    bionzTiQfnIc,
    bionzAkmCodecIc,
    bionzRenesasBonoboIc,
    bionzSeikoCoinTop,
    bionzEpsonQuartzLid,
  ];

  return {
    bionzDieIoEsdRing,
    bionzMtcmosGateRing,
    bionzMbistDummySi,
    bionzMgChassisPedestal,
    bionzSy1122Mainboard,
    bionzRearEmiShield,
    bionzAiCoprocPkg,
    bionzWifi6eSipCan,
    bionzUsbcPdPcb,
    bionzChargerEfusePcb,
    bionzPcieCfxMuxPcb,
    bionzMipiEvfBridgePcb,
    bionzAkmAudioPcb,
    bionzIbisServoPcb,
    bionzEpsonGyroPcb,
    bionzShutterDriverPcb,
    bionzRtcCoinBackupPcb,
    bionzTelemetryGuardPcb,
    bionzTiQfnIc,
    bionzAkmCodecIc,
    bionzRenesasBonoboIc,
    bionzSeikoCoinTop,
    bionzEpsonQuartzLid,
    extraList,
  };
}
