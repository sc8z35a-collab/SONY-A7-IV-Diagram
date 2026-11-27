/**
 * Ultra-HD 720x500 Nanoscale TEM/SEM Editorial Monograph SVG Framework
 * for ALL 85 BIONZ XR / XR2 V2 Parts (X2-01 – X2-85).
 *
 * Emits `class="evf-hd-svg bionz-hd-svg" data-bionz-v2-hd="1" data-bionz-tier="v2"` so
 * ExplanationDrawer upgrades styling and enables full Interactive Schematic Atlas UX
 * (zoom/pan, keyboard prev/next stepping, CAD blueprint toggle, side-by-side monograph specs, SVG export).
 */

export type BionzV2StackZone = 'pkg35d' | 'beol' | 'feol' | 'isp_mem' | 'bspdn_cool';

export interface BionzV2HdCard {
  label: string;
  line1: string;
  line2: string;
  accent?: string;
}

export interface BionzV2HdSpec {
  /** Badge code e.g. 'X2-01'..'X2-85' (also unique <defs> ID prefix) */
  badge: string;
  /** Physical stack zone highlighted on left vertical 5-tier silicon locator rail */
  zone: BionzV2StackZone;
  /** Conference / node / camera pill shown top-right (e.g. 'IEDM 2026 · A14', 'α7 V BIONZ XR2') */
  nodeTag: string;
  /** Clear concise Japanese headline */
  title: string;
  /** Plain-Japanese everyday analogy */
  analogy: string;
  /** Quantitative hero metric shown inside top-right KPI pill */
  metric: string;
  /** Physical scale bar label shown at bottom-right of TEM/SEM stage (e.g. 'SCALE: 5 nm', 'PITCH: 4.5 μm') */
  scaleLabel: string;
  /** Primary theme accent hex */
  accent: string;
  /** Soft pastel header/card tint hex */
  accentSoft: string;
  /** Optional extra <defs> unique to this diagram (prefix with `p`) */
  defsExtra?: (p: string) => string;
  /** Bespoke Ultra-HD technical illustration strictly inside x ∈ [58, 702], y ∈ [74, 348] */
  art: (p: string) => string;
  /** 3 deep beginner-to-engineer summary cards (Mechanism / Shooting Benefit / Spec) */
  cards: [BionzV2HdCard, BionzV2HdCard, BionzV2HdCard];
}

const FONT_SANS =
  "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic UI', system-ui, -apple-system, sans-serif";
const FONT_MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

export function escV2(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function visualUnits(s: string): number {
  let n = 0;
  for (const ch of s) n += ch.charCodeAt(0) <= 0x7f ? 0.62 : 1.06;
  return Math.max(1, n);
}

function fitFs(s: string, maxPx: number, maxSize: number, minSize = 6.8): number {
  return Math.max(minSize, Math.min(maxSize, +(maxPx / (visualUnits(s) * 1.04)).toFixed(2)));
}

/**
 * Wrap Japanese/mixed monograph copy cleanly into up to 2 balanced lines
 * so every 224px card remains crisp, generous, and 100% inside card bounds.
 */
function wrapSvgTwoLines(text: string, maxUnitsPerLine: number): [string, string] | [string] {
  if (visualUnits(text) <= maxUnitsPerLine) return [text];
  const chars = Array.from(text);
  const total = visualUnits(text);
  const target = Math.min(maxUnitsPerLine, total * 0.54);
  let bestIdx = 1;
  let acc = 0;
  for (let i = 0; i < chars.length; i++) {
    acc += chars[i].charCodeAt(0) <= 0x7f ? 0.62 : 1.06;
    if (acc >= target) {
      bestIdx = i + 1;
      break;
    }
  }
  // Prefer breaking cleanly right after Japanese punctuation / separators if within +/-3 chars
  const breakAfter = new Set(['、', '・', '）', '」', '／', '/', ' ', '＋', '：']);
  for (let offset = 0; offset <= 3; offset++) {
    for (const dir of [0, -1, 1]) {
      const idx = bestIdx + dir * offset;
      if (idx > 4 && idx < chars.length - 3 && breakAfter.has(chars[idx - 1])) {
        bestIdx = idx;
        offset = 99;
        break;
      }
    }
  }
  const l1 = chars.slice(0, bestIdx).join('').trim();
  const l2 = chars.slice(bestIdx).join('').trim();
  return l2 ? [l1, l2] : [l1];
}

const V2_ZONES: ReadonlyArray<{ id: BionzV2StackZone; code: string; short: string }> = [
  { id: 'pkg35d', code: '3.5D', short: '光/実装' },
  { id: 'beol', code: 'BEOL', short: '配線層' },
  { id: 'feol', code: 'FEOL', short: 'GAA/14A' },
  { id: 'isp_mem', code: 'SoC', short: 'AI/ISP' },
  { id: 'bspdn_cool', code: 'BACK', short: '裏面/冷' },
];

/** Numbered engineering callout pin with white halo leader line */
export function nanoPin(
  tx: number,
  ty: number,
  lx: number,
  ly: number,
  num: number | string,
  title: string,
  sub = '',
  color = '#0f172a',
  anchor: 'start' | 'end' | 'middle' = 'start'
): string {
  const pinX = anchor === 'end' ? lx + 12 : anchor === 'middle' ? lx : lx - 12;
  const textX = anchor === 'end' ? lx - 2 : anchor === 'middle' ? lx : lx + 2;
  const titleFs = fitFs(title, 262, 10.4, 8.0);
  const subFs = sub ? fitFs(sub, 262, 9.0, 6.8) : 9.0;
  return `
    <g>
      <polyline points="${tx},${ty} ${pinX},${ly}" fill="none" stroke="#ffffff" stroke-width="3.6" stroke-linecap="round"/>
      <polyline points="${tx},${ty} ${pinX},${ly}" fill="none" stroke="${color}" stroke-width="1.45" stroke-dasharray="3 2" stroke-linecap="round"/>
      <circle cx="${tx}" cy="${ty}" r="3.2" fill="${color}" stroke="#ffffff" stroke-width="1.4"/>
      <circle cx="${pinX}" cy="${ly}" r="8.8" fill="${color}" stroke="#ffffff" stroke-width="1.5"/>
      <text x="${pinX}" y="${ly + 3.4}" text-anchor="middle" font-size="9.8" font-weight="800" fill="#ffffff">${num}</text>
      <text x="${textX}" y="${ly + (sub ? -1.2 : 3.6)}" text-anchor="${anchor}" font-size="${titleFs}" font-weight="800" fill="#0f172a">${escV2(title)}</text>
      ${sub ? `<text x="${textX}" y="${ly + 11.4}" text-anchor="${anchor}" font-size="${subFs}" font-weight="600" fill="#475569">${escV2(sub)}</text>` : ''}
    </g>`;
}

/** Authentic TEM / SEM microscope scale bar */
export function scaleBar(x: number, y: number, pxLen: number, label: string, color = '#334155'): string {
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="-6" y="-12" width="${pxLen + 12}" height="24" rx="5" fill="#ffffff" fill-opacity="0.92" stroke="#cbd5e1" stroke-width="0.85"/>
      <line x1="0" y1="4" x2="${pxLen}" y2="4" stroke="${color}" stroke-width="2"/>
      <line x1="0" y1="0" x2="0" y2="8" stroke="${color}" stroke-width="1.6"/>
      <line x1="${pxLen}" y1="0" x2="${pxLen}" y2="8" stroke="${color}" stroke-width="1.6"/>
      <text x="${pxLen / 2}" y="-2" text-anchor="middle" font-size="8.2" font-weight="800" fill="${color}" style="font-family:${FONT_MONO};">${escV2(label)}</text>
    </g>`;
}

/** Crisp quantitative KPI box inside illustration stage */
export function kpiCard(
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string,
  sub: string,
  accent: string
): string {
  const valFs = fitFs(value, w - 16, 13.0, 8.2);
  const subFs = fitFs(sub, w - 14, 8.6, 6.8);
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="${h}" rx="8" fill="#ffffff" stroke="${accent}" stroke-width="1.25"/>
      <rect x="0" y="0" width="${w}" height="18" rx="8" fill="${accent}" fill-opacity="0.12"/>
      <rect x="0" y="10" width="${w}" height="8" fill="${accent}" fill-opacity="0.12"/>
      <text x="${w / 2}" y="12.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="${accent}">${escV2(label)}</text>
      <text x="${w / 2}" y="${h * 0.62}" text-anchor="middle" font-size="${valFs}" font-weight="900" fill="#0f172a" style="font-family:${FONT_MONO};">${escV2(value)}</text>
      <text x="${w / 2}" y="${h - 7}" text-anchor="middle" font-size="${subFs}" font-weight="600" fill="#475569">${escV2(sub)}</text>
    </g>`;
}

/** Comparison status pill (Before/Conventional × vs Next-Gen ○) */
export function cmpBanner(x: number, y: number, w: number, text: string, ok: boolean): string {
  const bg = ok ? '#dcfce7' : '#fee2e2';
  const stroke = ok ? '#16a34a' : '#dc2626';
  const fg = ok ? '#14532d' : '#991b1b';
  const mark = ok ? '○' : '×';
  const fs = fitFs(`${mark} ${text}`, w - 14, 9.8, 7.2);
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="21" rx="6" fill="${bg}" stroke="${stroke}" stroke-width="1.15"/>
      <text x="${w / 2}" y="14.2" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${fg}">${mark} ${escV2(text)}</text>
    </g>`;
}

/** Dimension line with end ticks and centered label */
export function dimArrow(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  label: string,
  color = '#475569'
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const horiz = Math.abs(y2 - y1) < Math.abs(x2 - x1);
  const w = Math.max(36, Math.ceil(visualUnits(label) * 7.5 + 10));
  return `
    <g>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.2"/>
      ${
        horiz
          ? `<line x1="${x1}" y1="${y1 - 4}" x2="${x1}" y2="${y1 + 4}" stroke="${color}" stroke-width="1.2"/>
             <line x1="${x2}" y1="${y2 - 4}" x2="${x2}" y2="${y2 + 4}" stroke="${color}" stroke-width="1.2"/>`
          : `<line x1="${x1 - 4}" y1="${y1}" x2="${x1 + 4}" y2="${y1}" stroke="${color}" stroke-width="1.2"/>
             <line x1="${x2 - 4}" y1="${y2}" x2="${x2 + 4}" y2="${y2}" stroke="${color}" stroke-width="1.2"/>`
      }
      <rect x="${mx - w / 2}" y="${my - 7.5}" width="${w}" height="15" rx="4" fill="#ffffff" stroke="${color}" stroke-opacity="0.35" stroke-width="0.8"/>
      <text x="${mx}" y="${my + 3.2}" text-anchor="middle" font-size="8.4" font-weight="800" fill="${color}" style="font-family:${FONT_MONO};">${escV2(label)}</text>
    </g>`;
}

/** Circular TEM/SEM microscope loupe ring */
export function loupeFrame(cx: number, cy: number, r: number, label: string, accent: string): string {
  const pw = Math.max(96, Math.ceil(visualUnits(label) * 8.6 + 16));
  const fs = fitFs(label, pw - 12, 9.2, 7.4);
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${accent}" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="${r + 2.4}" fill="none" stroke="#ffffff" stroke-width="1.4"/>
    <rect x="${cx - pw / 2}" y="${cy - r - 17}" width="${pw}" height="16" rx="8" fill="${accent}"/>
    <text x="${cx}" y="${cy - r - 5.8}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="#ffffff">${escV2(label)}</text>
  `;
}

/** Render a complete 720x500 Ultra-HD BIONZ V2 Nanoscale Monograph SVG */
export function renderBionzV2Hd(spec: BionzV2HdSpec): string {
  const p = spec.badge.toLowerCase().replace(/[^a-z0-9]/g, '');
  const [c1, c2, c3] = spec.cards;

  const analogyFull = `たとえると：${spec.analogy}`;
  const titleFs = fitFs(spec.title, 412, 13.4, 7.8);
  const analogyFs = fitFs(analogyFull, 412, 9.4, 6.6);
  const metricFs = fitFs(spec.metric, 170, 9.8, 7.6);
  const nodeFs = fitFs(spec.nodeTag, 172, 8.2, 6.8);

  const railHtml = V2_ZONES.map((z, idx) => {
    const ry = 76 + idx * 54;
    const active = z.id === spec.zone;
    return `
      <rect x="14" y="${ry}" width="32" height="47" rx="6" fill="${active ? spec.accent : '#f1f5f9'}" stroke="${active ? spec.accent : '#cbd5e1'}" stroke-width="${active ? '1.3' : '0.9'}"/>
      <text x="30" y="${ry + 18}" text-anchor="middle" font-size="7.6" font-weight="900" fill="${active ? '#ffffff' : '#475569'}" style="font-family:${FONT_MONO};">${z.code}</text>
      <text x="30" y="${ry + 33}" text-anchor="middle" font-size="6.8" font-weight="700" fill="${active ? '#f8fafc' : '#64748b'}">${z.short}</text>
      ${active ? `<polygon points="46,${ry + 19} 52,${ry + 23.5} 46,${ry + 28}" fill="${spec.accent}"/>` : ''}
    `;
  }).join('');

  const renderCard = (card: BionzV2HdCard, x: number, num: string, fallbackAccent: string) => {
    const col = card.accent || fallbackAccent;
    const p1Lines = wrapSvgTwoLines(card.line1, 21.5);
    const p2Lines = wrapSvgTwoLines(card.line2, 22.0);
    const l1Max = Math.max(...p1Lines.map(visualUnits));
    const l2Max = Math.max(...p2Lines.map(visualUnits));
    const l1Fs = Math.max(7.2, Math.min(9.4, +(200 / (l1Max * 1.03)).toFixed(2)));
    const l2Fs = Math.max(7.0, Math.min(9.0, +(200 / (l2Max * 1.03)).toFixed(2)));
    const p1Html =
      p1Lines.length === 2
        ? `<text x="11" y="42" font-size="${l1Fs}" font-weight="700" fill="#0f172a">${escV2(p1Lines[0])}<tspan x="11" dy="13">${escV2(p1Lines[1])}</tspan></text>`
        : `<text x="11" y="48" font-size="${l1Fs}" font-weight="700" fill="#0f172a">${escV2(p1Lines[0])}</text>`;
    const p2Html =
      p2Lines.length === 2
        ? `<text x="11" y="75" font-size="${l2Fs}" font-weight="600" fill="#334155">${escV2(p2Lines[0])}<tspan x="11" dy="12.5">${escV2(p2Lines[1])}</tspan></text>`
        : `<text x="11" y="81" font-size="${l2Fs}" font-weight="600" fill="#334155">${escV2(p2Lines[0])}</text>`;

    return `
      <g transform="translate(${x}, 366)">
        <rect x="0" y="0" width="224" height="122" rx="10" fill="#ffffff" stroke="#dbe3ee" stroke-width="1.15"/>
        <rect x="0" y="0" width="224" height="25" rx="10" fill="${col}" fill-opacity="0.10"/>
        <rect x="0" y="16" width="224" height="9" fill="${col}" fill-opacity="0.10"/>
        <line x1="0" y1="25" x2="224" y2="25" stroke="${col}" stroke-opacity="0.24" stroke-width="1"/>
        <text x="11" y="16.5" font-size="9.8" font-weight="800" fill="${col}">${num}  ${escV2(card.label)}</text>
        ${p1Html}
        ${p2Html}
        <line x1="11" y1="103" x2="213" y2="103" stroke="#e2e8f0" stroke-width="0.8"/>
        <text x="11" y="115" font-size="7.4" font-weight="700" fill="#64748b" style="font-family:${FONT_MONO};">${escV2(spec.badge)} · ${escV2(spec.nodeTag)}</text>
      </g>`;
  };

  return `<svg class="evf-hd-svg bionz-hd-svg" data-bionz-v2-hd="1" data-bionz-tier="v2" data-bionz-zone="${spec.zone}" data-bionz-badge="${escV2(spec.badge)}" viewBox="0 0 720 500" xmlns="http://www.w3.org/2000/svg" style="font-family:${FONT_SANS};">
  <defs>
    <pattern id="${p}_grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#dbe4f0" stroke-width="0.65"/>
      <path d="M 12 0 L 12 24 M 0 12 L 24 12" fill="none" stroke="#f1f5f9" stroke-width="0.45"/>
    </pattern>
    <pattern id="${p}_hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="7" stroke="#64748b" stroke-width="1.1" opacity="0.35"/>
    </pattern>
    <linearGradient id="${p}_si" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="55%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="${p}_cyan" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="55%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="${p}_sige" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fb7185"/>
      <stop offset="55%" stop-color="#e11d48"/>
      <stop offset="100%" stop-color="#9f1239"/>
    </linearGradient>
    <linearGradient id="${p}_cu" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdba74"/>
      <stop offset="50%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="${p}_gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="52%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
    <linearGradient id="${p}_hfo2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="50%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#4c1d95"/>
    </linearGradient>
    <linearGradient id="${p}_ru" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="${p}_glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.92"/>
      <stop offset="50%" stop-color="#bae6fd" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#7dd3fc" stop-opacity="0.58"/>
    </linearGradient>
    <linearGradient id="${p}_emerald" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="55%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
    <linearGradient id="${p}_laser" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <linearGradient id="${p}_heat" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="55%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#facc15"/>
    </linearGradient>
    <linearGradient id="${p}_blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="50%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
    <marker id="${p}_arr_blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0284c7"/>
    </marker>
    <marker id="${p}_arr_red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
    <marker id="${p}_arr_gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#d97706"/>
    </marker>
    <marker id="${p}_arr_green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#059669"/>
    </marker>
    <marker id="${p}_arr_pink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#db2777"/>
    </marker>
    <marker id="${p}_arr_dark" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#334155"/>
    </marker>
    ${spec.defsExtra ? spec.defsExtra(p) : ''}
  </defs>

  <!-- Outer Monograph Canvas -->
  <rect x="1.5" y="1.5" width="717" height="497" rx="14" fill="#f8fafc" stroke="#d5dfe9" stroke-width="1.2"/>

  <!-- Zone 1: Editorial Monograph Header -->
  <rect x="12" y="10" width="696" height="52" rx="11" fill="#ffffff" stroke="#dbe3ee" stroke-width="1.15"/>
  <rect x="19" y="16.5" width="62" height="39" rx="8" fill="${spec.accent}"/>
  <text x="50" y="34" text-anchor="middle" font-size="${spec.badge.length > 5 ? '11.2' : '13.2'}" font-weight="900" fill="#ffffff" style="font-family:${FONT_MONO};">${escV2(spec.badge)}</text>
  <text x="50" y="47.5" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff" opacity="0.9">BIONZ V2</text>

  <text x="90" y="31.5" font-size="${titleFs}" font-weight="800" fill="#0f172a">${escV2(spec.title)}</text>
  <text x="90" y="50.5" font-size="${analogyFs}" font-weight="700" fill="${spec.accent}">たとえると：${escV2(spec.analogy)}</text>

  <rect x="520" y="15.5" width="180" height="22" rx="11" fill="${spec.accentSoft}" stroke="${spec.accent}" stroke-width="1.05"/>
  <text x="610" y="30" text-anchor="middle" font-size="${metricFs}" font-weight="800" fill="${spec.accent}">${escV2(spec.metric)}</text>
  <text x="610" y="52.5" text-anchor="middle" font-size="${nodeFs}" font-weight="700" fill="#64748b" style="font-family:${FONT_MONO};">${escV2(spec.nodeTag)}</text>

  <!-- Zone 2A: Left 5-Tier Nanoscale Silicon Stack Locator Rail -->
  <rect x="11" y="70" width="38" height="286" rx="8" fill="#ffffff" stroke="#dbe3ee" stroke-width="1"/>
  ${railHtml}

  <!-- Zone 2B: Ultra-HD TEM/SEM Nanoscale Technical Artboard (654x286) -->
  <rect x="54" y="70" width="654" height="286" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.15"/>
  <rect x="55" y="71" width="652" height="284" rx="10" fill="url(#${p}_grid)"/>
  <path d="M 62 84 L 62 77 L 69 77 M 700 84 L 700 77 L 693 77 M 62 342 L 62 349 L 69 349 M 700 342 L 700 349 L 693 349" fill="none" stroke="#94a3b8" stroke-width="1" opacity="0.65"/>

  ${spec.art(p)}

  <!-- Precision TEM/SEM Scale Bar Strip -->
  <rect x="536" y="336" width="164" height="15" rx="4" fill="#f8fafc" fill-opacity="0.94" stroke="#cbd5e1" stroke-width="0.85"/>
  <text x="618" y="346.5" text-anchor="middle" font-size="7.8" font-weight="800" fill="#334155" style="font-family:${FONT_MONO};">${escV2(spec.scaleLabel)}</text>

  <!-- Zone 3: 3-Column Beginner-to-Engineer Deep Monograph Cards -->
  ${renderCard(c1, 12, '01', spec.accent)}
  ${renderCard(c2, 248, '02', '#059669')}
  ${renderCard(c3, 484, '03', '#0284c7')}
</svg>`;
}
