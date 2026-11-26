import * as THREE from 'three';
import {
  GPU_PROFILE,
  NATIVE_HI_TEX_H,
  NATIVE_HI_TEX_W,
  NATIVE_TILE_TEX_SIZE,
} from './GpuOptimizer';

/**
 * Phase 36 — 12 Brand-New Ultra-HD Bespoke PBR Materials for the 40 Newly-Added
 * Missing/Omitted Standalone Microphone Parts (MC111–MC150 -> 150 parts total).
 *
 * Grounded in:
 * - Sony ILCE-7M4 Service Manual OEM BOM: JK-1028 (A5022316A), JK HOLDER (502789601),
 *   JACK PLATE (502789401), MB JACK SHIELD BLOCK (500972301), MAGNETIC FIELD CUT PLATE (502789501),
 *   MIS-2006 (A5001908A) + MI SHOE FPC WP RUBBER (501695501), SP901 (185921011)
 * - Infineon AN557 / IM73A135V01 / Cirrus WAN0284: Bottom-port 4-aperture NSMD SAC305 annular
 *   acoustic seal ring, black opaque ASIC glob-top light-shield, AuSn eutectic + Ti/Zr/V NEG getter
 * - ECM acoustic non-woven cloth screen & 360° crimp flange
 * - Susumu RG ±0.05% / ±5ppm/°C NiCr thin-film matched resistor network, C7701 two-piece audio EMI shield
 * - Sony ECM-M1 8-mode rotary directivity dial, Sony XLR-K3M / XLR-A4 32-bit float studio fascia,
 *   HDMI ACR N=6144/CTS & USB-C UAC 2.0 asynchronous audio bridge PCB/die
 */
export interface MicUltra36Materials {
  mc36Jk1028AudioFlex: THREE.MeshPhysicalMaterial;
  mc36Mis2006ShoeFpc: THREE.MeshPhysicalMaterial;
  mc36MagneticCutPlate: THREE.MeshPhysicalMaterial;
  mc36BottomPortSolderRing: THREE.MeshPhysicalMaterial;
  mc36GlobTopLightShield: THREE.MeshPhysicalMaterial;
  mc36NegGetterVacuumSeal: THREE.MeshPhysicalMaterial;
  mc36EcmAcousticCloth: THREE.MeshStandardMaterial;
  mc36ThinFilmResistorArray: THREE.MeshPhysicalMaterial;
  mc36C7701EmiShieldCan: THREE.MeshPhysicalMaterial;
  mc36EcmM1ControlDial: THREE.MeshPhysicalMaterial;
  mc36XlrA4AudioPanel: THREE.MeshPhysicalMaterial;
  mc36HdmiUacSyncDeck: THREE.MeshPhysicalMaterial;
  micUltra36List: THREE.Material[];
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

function seededRand(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) & 0xffffff) / 0x1000000;
  };
}

function drawMicroGrain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  count: number,
  seed: number,
  alpha = 0.04
): void {
  const rnd = seededRand(seed);
  for (let i = 0; i < count; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const v = rnd() > 0.5 ? 255 : 0;
    ctx.fillStyle = `rgba(${v},${v},${v},${(rnd() * alpha).toFixed(3)})`;
    ctx.fillRect(x, y, 2, 2);
  }
}

function drawBrushedStreaks(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  horizontal: boolean,
  count: number,
  seed: number,
  darkAlpha = 0.04,
  lightAlpha = 0.05
): void {
  const rnd = seededRand(seed);
  for (let i = 0; i < count; i++) {
    const light = rnd() > 0.48;
    ctx.fillStyle = light
      ? `rgba(255,255,255,${(rnd() * lightAlpha).toFixed(3)})`
      : `rgba(0,0,0,${(rnd() * darkAlpha).toFixed(3)})`;
    if (horizontal) {
      const y = rnd() * h;
      const x = rnd() * w * 0.5;
      ctx.fillRect(x, y, w * (0.3 + rnd() * 0.65), 1 + rnd() * 1.5);
    } else {
      const x = rnd() * w;
      const y = rnd() * h * 0.5;
      ctx.fillRect(x, y, 1 + rnd() * 1.5, h * (0.3 + rnd() * 0.65));
    }
  }
}

function tagBump<T extends THREE.Material>(mat: T, bumpScale: number): T {
  mat.userData.megaBumpScale = bumpScale;
  return mat;
}

/** 1. MC111: Sony OEM JK-1028 (Ref.206 / A5022316A) Yellow Polyimide Audio Jack Sub-Board */
function createMc36Jk1028AudioFlexTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#b4690e');
  bg.addColorStop(0.5, '#cf7d15');
  bg.addColorStop(1, '#9c5608');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Embedded bright-copper hatched ground-shield copper mesh beneath amber Kapton
  ctx.strokeStyle = 'rgba(254, 215, 102, 0.24)';
  ctx.lineWidth = 2;
  for (let i = -h; i < w + h; i += 22) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i, h);
    ctx.lineTo(i + h, 0);
    ctx.stroke();
  }

  // Differential L/R MIC & HP copper trace bundles with teardrop vias
  const traceY = [155, 190, 225, 260, 490, 525, 560, 595];
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 7;
  for (const ty of traceY) {
    ctx.beginPath();
    ctx.moveTo(70, ty);
    ctx.lineTo(310, ty);
    ctx.lineTo(380, ty + (ty < 380 ? 36 : -36));
    ctx.lineTo(680, ty + (ty < 380 ? 36 : -36));
    ctx.stroke();
  }

  // Red MIC jack & Green HP jack silkscreen landing zones
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 8;
  ctx.strokeRect(54, 118, 220, 178);
  ctx.fillStyle = '#fef2f2';
  ctx.font = 'bold 26px monospace';
  ctx.fillText('MIC 3.5mm', 82, 162);
  ctx.font = 'bold 18px monospace';
  ctx.fillText('PIP 2.8V TRS', 82, 198);

  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 8;
  ctx.strokeRect(54, 456, 220, 178);
  ctx.fillStyle = '#f0fdf4';
  ctx.font = 'bold 26px monospace';
  ctx.fillText('HP  3.5mm', 82, 500);
  ctx.font = 'bold 18px monospace';
  ctx.fillText('CAPLESS OUT', 82, 536);

  // ENIG gold ZIF finger tail on right edge
  for (let i = 0; i < 12; i++) {
    const py = 195 + i * 32;
    ctx.fillStyle = '#facc15';
    ctx.fillRect(674, py, 74, 18);
    ctx.strokeStyle = '#a16207';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(674, py, 74, 18);
  }

  // Genuine Sony silkscreen markings
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('SONY JK-1028-11', 318, 378);
  ctx.font = 'bold 20px monospace';
  ctx.fillText('A-5022-316-A  >PI<', 318, 412);
  drawMicroGrain(ctx, w, h, 3800, 3601, 0.03);
  return toHiTex(canvas);
}

/** 2. MC116: Sony OEM MIS-2006 (Ref.325 / A5001908A) 21-Pin MI-Shoe Digital Audio Contact FPC */
function createMc36Mis2006ShoeFpcTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#131820');
  bg.addColorStop(0.5, '#1b2230');
  bg.addColorStop(1, '#10151d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // 21 precision hard-gold MI-Shoe contact fingers (0.5mm pitch, digital audio pins 8-12 highlighted)
  const padW = 24;
  const pitch = 33;
  const startX = 38;
  for (let i = 0; i < 21; i++) {
    const px = startX + i * pitch;
    const isDigitalAudio = i >= 7 && i <= 11;
    const g = ctx.createLinearGradient(px, 120, px + padW, 380);
    g.addColorStop(0, isDigitalAudio ? '#fef08a' : '#facc15');
    g.addColorStop(0.5, isDigitalAudio ? '#f59e0b' : '#ca8a04');
    g.addColorStop(1, '#eab308');
    ctx.fillStyle = g;
    ctx.fillRect(px, 120, padW, 270);
    ctx.strokeStyle = isDigitalAudio ? '#38bdf8' : '#713f12';
    ctx.lineWidth = isDigitalAudio ? 2.5 : 1.5;
    ctx.strokeRect(px, 120, padW, 270);

    // Pin numbers
    ctx.fillStyle = isDigitalAudio ? '#7dd3fc' : '#94a3b8';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(String(i + 1).padStart(2, '0'), px + 3, 106);

    // Differential routing below pads
    ctx.strokeStyle = isDigitalAudio ? '#38bdf8' : '#b45309';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px + padW * 0.5, 390);
    ctx.lineTo(px + padW * 0.5, 510);
    ctx.stroke();
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(px + padW * 0.5, 514, 5.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Digital audio pin group callout bar (Pins 8-12: BCLK/LRCLK/SD0/SD1/MCLK)
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.strokeRect(startX + 7 * pitch - 4, 82, 5 * pitch + 2, 320);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('PIN 08-12: 4ch 24-BIT DIGITAL I2S/TDM', 162, 64);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('SONY MIS-2006  A5001908A', 168, 608);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 19px monospace';
  ctx.fillText('21-PIN HARD-Au 0.5um  +5V / 4CH AUDIO / UART', 132, 650);
  drawMicroGrain(ctx, w, h, 3600, 3602, 0.03);
  return toHiTex(canvas);
}

/** 3. MC115: Sony OEM MAGNETIC FIELD CUT PLATE (Ref.352 / 502789501) High-Permeability Mu-Metal */
function createMc36MagneticCutPlateTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#333b46');
  bg.addColorStop(0.45, '#4b5563');
  bg.addColorStop(0.55, '#3b4450');
  bg.addColorStop(1, '#272e38');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 640, 3603, 0.055, 0.065);

  // Subtle magnetic flux diversion contour lines (Permalloy 80% Ni-Fe mu_r > 80,000)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.24)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 9; i++) {
    const y = 110 + i * 68;
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.bezierCurveTo(220, y - 48, 540, y + 48, 728, y);
    ctx.stroke();
  }

  // Laser-etched Sony OEM stamping
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.36)';
  ctx.lineWidth = 4;
  ctx.strokeRect(52, 52, w - 104, h - 104);
  ctx.fillStyle = 'rgba(226, 232, 240, 0.78)';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('502789501  (891)', 96, 132);
  ctx.font = 'bold 22px monospace';
  ctx.fillText('MAGNETIC FIELD CUT PLATE', 96, 174);
  ctx.fillStyle = 'rgba(125, 211, 252, 0.75)';
  ctx.font = 'bold 19px monospace';
  ctx.fillText('HIGH-MU PERMALLOY  IBIS VCM FLUX SHUNT', 96, 650);
  drawMicroGrain(ctx, w, h, 3500, 3604, 0.035);
  return toHiTex(canvas);
}

/** 4. MC121: Infineon AN557 / Cirrus WAN0284 Bottom-Port 360° 4-Aperture NSMD Solder Seal Ring */
function createMc36BottomPortSolderRingTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Deep emerald audio PCB solder mask
  const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 40, w * 0.5, h * 0.5, w * 0.65);
  bg.addColorStop(0, '#0a4a35');
  bg.addColorStop(1, '#062c20');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  // Copper stitching via fence ring (24 ground vias)
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const vx = cx + Math.cos(a) * 285;
    const vy = cy + Math.sin(a) * 285;
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(vx, vy, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(vx, vy, 6.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4-aperture segmented SAC305 annular solder seal ring (Cirrus WAN0284 anti-void stencil)
  for (let q = 0; q < 4; q++) {
    const a0 = q * (Math.PI / 2) + 0.08;
    const a1 = (q + 1) * (Math.PI / 2) - 0.08;
    ctx.beginPath();
    ctx.arc(cx, cy, 224, a0, a1);
    ctx.arc(cx, cy, 134, a1, a0, true);
    ctx.closePath();
    const sg = ctx.createLinearGradient(cx - 220, cy - 220, cx + 220, cy + 220);
    sg.addColorStop(0, '#e2e8f0');
    sg.addColorStop(0.5, '#94a3b8');
    sg.addColorStop(1, '#f8fafc');
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  // Central 0.8 mm PCB acoustic port barrel
  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.arc(cx, cy, 102, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('NSMD 360° ACOUSTIC SEAL RING', 192, 68);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 19px monospace';
  ctx.fillText('PCB PORT DIA 0.80mm  SAC305 VOID-FREE', 176, 718);
  drawMicroGrain(ctx, w, h, 3600, 3605, 0.03);
  return toHiTex(canvas);
}

/** 5. MC123: MEMS ASIC Opaque Black Epoxy Glob-Top Photoelectric Light-Shield */
function createMc36GlobTopLightShieldTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createRadialGradient(w * 0.42, h * 0.40, 30, w * 0.5, h * 0.5, w * 0.58);
  bg.addColorStop(0, '#2a303a');
  bg.addColorStop(0.45, '#14181f');
  bg.addColorStop(1, '#07090d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle carbon-black silica-filled encapsulant micro-speckle
  drawMicroGrain(ctx, w, h, 6400, 3606, 0.055);

  // Concentric glossy dome specular contours + blocked-photon optical density callout
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
  ctx.lineWidth = 3;
  for (let r = 90; r <= 320; r += 55) {
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(248, 250, 252, 0.72)';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('OPAQUE CARBON EPOXY GLOB-TOP', 184, 126);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.80)';
  ctx.font = 'bold 19px monospace';
  ctx.fillText('OD > 6.0  BLOCKS STROBE PHOTOELECTRIC POP', 152, 668);
  return toHiTex(canvas);
}

/** 6. MC124: SDM AuSn Eutectic Hermetic Seal Frame & Ti/Zr/V NEG Vacuum Getter Film */
function createMc36NegGetterVacuumSealTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // Outer silicon rim
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, w, h);

  // Au80/Sn20 eutectic gold-tin hermetic seal ring
  const au = ctx.createLinearGradient(0, 0, w, h);
  au.addColorStop(0, '#fde047');
  au.addColorStop(0.5, '#d97706');
  au.addColorStop(1, '#facc15');
  ctx.fillStyle = au;
  ctx.fillRect(46, 46, w - 92, h - 92);

  // Inner porous nanostructured Ti/Zr/V Non-Evaporable Getter (NEG) thin-film cavity
  const neg = ctx.createRadialGradient(w * 0.5, h * 0.5, 20, w * 0.5, h * 0.5, 290);
  neg.addColorStop(0, '#2e3848');
  neg.addColorStop(0.65, '#1d2430');
  neg.addColorStop(1, '#121822');
  ctx.fillStyle = neg;
  ctx.fillRect(104, 104, w - 208, h - 208);

  // Columnar getter nano-pores
  const rnd = seededRand(3607);
  for (let i = 0; i < 1600; i++) {
    const x = 114 + rnd() * (w - 228);
    const y = 114 + rnd() * (h - 228);
    const r = 1.5 + rnd() * 3.5;
    ctx.fillStyle = rnd() > 0.5 ? 'rgba(56, 189, 248, 0.22)' : 'rgba(148, 163, 184, 0.26)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 23px monospace';
  ctx.fillText('Au80Sn20 EUTECTIC HERMETIC FRAME', 156, 86);
  ctx.fillStyle = '#7dd3fc';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('Ti/Zr/V NEG GETTER  P < 20 mbar', 176, 628);
  return toHiTex(canvas);
}

/** 7. MC129: Seamless Tileable ECM Front Woven Black Non-Woven Acoustic Cloth Disc */
function createMc36EcmAcousticClothTexture(): THREE.CanvasTexture {
  const { canvas, ctx, s } = makeTileCanvas(256);
  ctx.fillStyle = '#15171c';
  ctx.fillRect(0, 0, s, s);

  const rnd = seededRand(3608);
  // Seamless wrap-around non-woven acoustic felt micro-fibers
  for (let i = 0; i < 420; i++) {
    const x = rnd() * s;
    const y = rnd() * s;
    const ang = rnd() * Math.PI * 2;
    const len = 14 + rnd() * 28;
    const shade = Math.floor(34 + rnd() * 44);
    ctx.strokeStyle = `rgba(${shade},${shade + 2},${shade + 6},0.65)`;
    ctx.lineWidth = 1.1 + rnd() * 1.1;
    for (const ox of [-s, 0, s]) {
      for (const oy of [-s, 0, s]) {
        const sx = x + ox;
        const sy = y + oy;
        const ex = sx + Math.cos(ang) * len;
        const ey = sy + Math.sin(ang) * len;
        if (Math.max(sx, ex) >= -4 && Math.min(sx, ex) <= s + 4 && Math.max(sy, ey) >= -4 && Math.min(sy, ey) <= s + 4) {
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }
    }
  }
  drawMicroGrain(ctx, s, s, 2200, 3609, 0.05);
  return toTileTex(canvas, 3, 3);
}

/** 8. MC132/MC144: Susumu RG ±0.05% / ±5ppm/°C Laser-Trimmed NiCr Thin-Film Resistor Array */
function createMc36ThinFilmResistorArrayTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  // High-purity alumina ceramic substrate with inorganic dark-teal passivation
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0f2933');
  bg.addColorStop(0.5, '#133a47');
  bg.addColorStop(1, '#0b1f27');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // End wrap-around matte-Sn / Ni barrier terminations
  const tGrad = ctx.createLinearGradient(0, 0, 110, 0);
  tGrad.addColorStop(0, '#cbd5e1');
  tGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = tGrad;
  ctx.fillRect(0, 0, 96, h);
  ctx.fillRect(w - 96, 0, 96, h);

  // Precision serpentine NiCr metallic thin-film meander + laser-trim L-cut kerfs
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 10;
  for (let row = 0; row < 2; row++) {
    const y0 = row === 0 ? 155 : 445;
    ctx.beginPath();
    for (let k = 0; k < 14; k++) {
      const x = 148 + k * 34;
      if (k === 0) ctx.moveTo(114, y0 + 80);
      ctx.lineTo(x, k % 2 === 0 ? y0 : y0 + 165);
      ctx.lineTo(x + 22, k % 2 === 0 ? y0 : y0 + 165);
    }
    ctx.lineTo(w - 114, y0 + 80);
    ctx.stroke();

    // Fine gold laser-trim kerf line
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(350, y0 + 180);
    ctx.lineTo(350, y0 + 115);
    ctx.lineTo(418, y0 + 115);
    ctx.stroke();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 10;
  }

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('RG1608  6.81kΩ ±0.05%', 196, 98);
  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('NiCr THIN-FILM  ±5ppm/°C  -40dB CNI', 148, 706);
  drawMicroGrain(ctx, w, h, 3200, 3610, 0.03);
  return toHiTex(canvas);
}

/** 9. MC136: Two-Piece C7701 Nickel-Silver (CuNi18Zn20) Audio-Island EMI Faraday Shield Can */
function createMc36C7701EmiShieldCanTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#c8ced6');
  bg.addColorStop(0.45, '#e2e8f0');
  bg.addColorStop(0.55, '#b8c0ca');
  bg.addColorStop(1, '#9ca6b2');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, false, 680, 3611, 0.045, 0.055);

  // Embossed perimeter snap-lock dimples around lid skirt
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 5;
  ctx.strokeRect(36, 36, w - 72, h - 72);
  for (let i = 0; i < 6; i++) {
    const pos = 128 + i * 102;
    for (const [dx, dy] of [
      [pos, 58],
      [pos, h - 58],
      [58, pos],
      [w - 58, pos],
    ]) {
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(dx, dy, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.arc(dx - 3, dy - 3, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Acoustic/thermal micro-vent array + laser engraving
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(216 + c * 66, 200 + r * 52, 11, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 30px monospace';
  ctx.fillText('C7701 CuNi18Zn20', 228, 466);
  ctx.font = 'bold 24px monospace';
  ctx.fillText('SY-1122 AUDIO AFE SHIELD', 194, 514);
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('TWO-PIECE SNAP-CAN  >60 dB @ 2.4GHz', 162, 560);
  drawMicroGrain(ctx, w, h, 3600, 3612, 0.03);
  return toHiTex(canvas);
}

/** 10. MC142: Sony ECM-M1 Matte-Black 8-Mode Rotary Directivity Dial Face */
function createMc36EcmM1ControlDialTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const bg = ctx.createRadialGradient(cx, cy, 40, cx, cy, 384);
  bg.addColorStop(0, '#272c35');
  bg.addColorStop(0.7, '#161a21');
  bg.addColorStop(1, '#0b0d12');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Outer knurled dial tick ring
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 336, 0, Math.PI * 2);
  ctx.stroke();

  // 8 ECM-M1 polar directivity positions around 360°
  const labels = ['SUPER', 'UNI', 'OMNI', 'REAR', 'F+R', 'SPLIT', 'STEREO', 'ULTRA'];
  const colors = ['#38bdf8', '#22c55e', '#facc15', '#fb923c', '#f472b6', '#a78bfa', '#2dd4bf', '#ef4444'];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const rx = cx + Math.cos(a) * 246;
    const ry = cy + Math.sin(a) * 246;
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.arc(rx, ry, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], rx, ry + 5);
  }
  ctx.textAlign = 'left';

  // Center lock push-button
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.arc(cx, cy, 108, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 28px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('LOCK', cx, cy - 4);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('ECM-M1 8-MODE', cx, cy + 32);
  ctx.textAlign = 'left';
  drawMicroGrain(ctx, w, h, 3600, 3613, 0.035);
  return toHiTex(canvas);
}

/** 11. MC144/MC145: Sony XLR-K3M / XLR-A4 Studio Control Fascia & +48V / 32-bit Float Panel */
function createMc36XlrA4AudioPanelTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#181c24');
  bg.addColorStop(0.5, '#202631');
  bg.addColorStop(1, '#12151c');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  drawBrushedStreaks(ctx, w, h, true, 520, 3614, 0.04, 0.045);

  // Header bar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(36, 36, w - 72, 92);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, w - 72, 92);
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 30px monospace';
  ctx.fillText('SONY XLR-A4 / XLR-K3M', 66, 86);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('32-BIT FLOAT  96 kHz  4CH MI-SHOE', 66, 116);

  // Input 1 / Input 2 switch blocks
  for (let ch = 0; ch < 2; ch++) {
    const bx = 48 + ch * 348;
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.strokeRect(bx, 162, 324, 380);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(`INPUT ${ch + 1}`, bx + 22, 206);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(bx + 172, 178, 128, 36);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('+48V ON', bx + 188, 203);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('LINE / MIC / MIC+48V', bx + 22, 260);
    ctx.fillText('ATT: 0 / 10 / 20 dB', bx + 22, 306);
    ctx.fillText('LOW CUT: 100 / 300 Hz', bx + 22, 352);
    ctx.fillStyle = '#facc15';
    ctx.fillText('6.81kΩ ±0.1% IEC 61938', bx + 22, 412);
    ctx.fillStyle = '#34d399';
    ctx.fillText('DUAL-ADC 136 dB DR', bx + 22, 460);
  }

  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 21px monospace';
  ctx.fillText('DIGITAL / ANALOG DIRECT MI-SHOE  +  USB-C', 112, 650);
  drawMicroGrain(ctx, w, h, 3800, 3615, 0.035);
  return toHiTex(canvas);
}

/** 12. MC147/MC148/MC149/MC150: Digital Transport Engine (HDMI ACR N=6144 / UAC 2.0 / XAVC DMA / Shutter Sync) */
function createMc36HdmiUacSyncDeckTexture(): THREE.CanvasTexture {
  const { canvas, ctx, w, h } = makeHiCanvas(768, 768);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#071324');
  bg.addColorStop(0.5, '#0c1f3a');
  bg.addColorStop(1, '#060f1e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Fine high-speed differential clock grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
  ctx.lineWidth = 1.5;
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

  // 4 functional SoC / Audio Transport blocks
  const blocks: [number, number, string, string, string][] = [
    [42, 64, 'HDMI ACR ENGINE', 'N=6144  CTS=148500  4ch LPCM', '#38bdf8'],
    [396, 64, 'USB-C UAC 2.0', 'ASYNC ISOCH EXPLICIT FEEDBACK', '#22c55e'],
    [42, 404, 'XAVC-S/HS DMA', 'PING-PONG FIFO  24b/48kHz', '#f59e0b'],
    [396, 404, 'SHUTTER SYNC', 'AFE-3360 <15ms CLICK INPAINT', '#f43f5e'],
  ];
  for (const [bx, by, title, sub, col] of blocks) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
    ctx.fillRect(bx, by, 330, 290);
    ctx.strokeStyle = col;
    ctx.lineWidth = 4;
    ctx.strokeRect(bx, by, 330, 290);
    ctx.fillStyle = col;
    ctx.font = 'bold 24px monospace';
    ctx.fillText(title, bx + 20, by + 46);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(sub, bx + 20, by + 84);

    // Mini oscilloscope / packet timing waveform
    ctx.strokeStyle = col;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x <= 280; x += 10) {
      const y = by + 188 + Math.sin(x * 0.08 + bx) * 42 * Math.cos(x * 0.02);
      if (x === 0) ctx.moveTo(bx + 24 + x, y);
      else ctx.lineTo(bx + 24 + x, y);
    }
    ctx.stroke();
  }
  drawMicroGrain(ctx, w, h, 3400, 3616, 0.028);
  return toHiTex(canvas);
}

export function createMicUltra36Materials(clippingPlanes: THREE.Plane[]): MicUltra36Materials {
  const common = {
    clippingPlanes,
    clipShadows: true,
    side: THREE.FrontSide as THREE.Side,
  };

  const mc36Jk1028AudioFlex = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36Jk1028AudioFlexTexture(),
      metalness: 0.24,
      roughness: 0.34,
      clearcoat: 0.56,
    }),
    0.09
  );

  const mc36Mis2006ShoeFpc = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36Mis2006ShoeFpcTexture(),
      metalness: 0.52,
      roughness: 0.26,
      clearcoat: 0.48,
    }),
    0.10
  );

  const mc36MagneticCutPlate = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36MagneticCutPlateTexture(),
      metalness: 0.78,
      roughness: 0.32,
      clearcoat: 0.28,
    }),
    0.09
  );

  const mc36BottomPortSolderRing = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36BottomPortSolderRingTexture(),
      metalness: 0.36,
      roughness: 0.28,
      clearcoat: 0.52,
    }),
    0.11
  );

  const mc36GlobTopLightShield = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36GlobTopLightShieldTexture(),
      metalness: 0.10,
      roughness: 0.22,
      clearcoat: 0.84,
    }),
    0.08
  );

  const mc36NegGetterVacuumSeal = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36NegGetterVacuumSealTexture(),
      metalness: 0.68,
      roughness: 0.30,
      clearcoat: 0.36,
      iridescence: 0.32,
      iridescenceIOR: 1.5,
    }),
    0.12
  );

  const mc36EcmAcousticCloth = tagBump(
    new THREE.MeshStandardMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36EcmAcousticClothTexture(),
      metalness: 0.04,
      roughness: 0.92,
    }),
    0.16
  );

  const mc36ThinFilmResistorArray = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36ThinFilmResistorArrayTexture(),
      metalness: 0.34,
      roughness: 0.26,
      clearcoat: 0.64,
    }),
    0.09
  );

  const mc36C7701EmiShieldCan = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36C7701EmiShieldCanTexture(),
      metalness: 0.86,
      roughness: 0.26,
      clearcoat: 0.24,
    }),
    0.10
  );

  const mc36EcmM1ControlDial = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36EcmM1ControlDialTexture(),
      metalness: 0.18,
      roughness: 0.42,
      clearcoat: 0.34,
    }),
    0.10
  );

  const mc36XlrA4AudioPanel = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36XlrA4AudioPanelTexture(),
      metalness: 0.46,
      roughness: 0.36,
      clearcoat: 0.32,
    }),
    0.09
  );

  const mc36HdmiUacSyncDeck = tagBump(
    new THREE.MeshPhysicalMaterial({
      ...common,
      color: 0xffffff,
      map: createMc36HdmiUacSyncDeckTexture(),
      metalness: 0.38,
      roughness: 0.22,
      clearcoat: 0.72,
      iridescence: 0.42,
      iridescenceIOR: 1.55,
    }),
    0.08
  );

  const micUltra36List: THREE.Material[] = [
    mc36Jk1028AudioFlex,
    mc36Mis2006ShoeFpc,
    mc36MagneticCutPlate,
    mc36BottomPortSolderRing,
    mc36GlobTopLightShield,
    mc36NegGetterVacuumSeal,
    mc36EcmAcousticCloth,
    mc36ThinFilmResistorArray,
    mc36C7701EmiShieldCan,
    mc36EcmM1ControlDial,
    mc36XlrA4AudioPanel,
    mc36HdmiUacSyncDeck,
  ];

  return {
    mc36Jk1028AudioFlex,
    mc36Mis2006ShoeFpc,
    mc36MagneticCutPlate,
    mc36BottomPortSolderRing,
    mc36GlobTopLightShield,
    mc36NegGetterVacuumSeal,
    mc36EcmAcousticCloth,
    mc36ThinFilmResistorArray,
    mc36C7701EmiShieldCan,
    mc36EcmM1ControlDial,
    mc36XlrA4AudioPanel,
    mc36HdmiUacSyncDeck,
    micUltra36List,
  };
}
