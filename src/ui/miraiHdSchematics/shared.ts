/**
 * Ultra-HD 720x500 Editorial Monograph SVG Framework for Future History MIRAI 2028 (`mirai_2028`).
 * Emits `class="evf-hd-svg mirai-hd-svg" data-mirai-hd="1"` so ExplanationDrawer automatically
 * enables full-bleed rendering and Interactive Fullscreen Schematic Lightbox (pinch/zoom/pan/90° rotate).
 */

export type MiraiStackZone = 'optic' | 'active' | 'link' | 'pkg' | 'cool';

export interface MiraiHdCard {
  label: string;
  line1: string;
  line2: string;
  accent?: string;
}

export interface MiraiHdSpec {
  badge: string; // e.g. 'FH01-04', 'FH02-06'
  fhTag: string; // e.g. 'FH01 · 86/100点', 'FH02 · 86/100点'
  zone: MiraiStackZone;
  title: string;
  analogy: string;
  metric: string;
  scaleLabel: string;
  accent: string;
  accentSoft: string;
  art: (p: string) => string;
  cards: [MiraiHdCard, MiraiHdCard, MiraiHdCard];
}

const FONT_SANS =
  "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic UI', system-ui, -apple-system, sans-serif";
const FONT_MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

export function escM(s: string): string {
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

function wrapTwoLines(text: string, maxUnitsPerLine: number): [string, string] | [string] {
  if (visualUnits(text) <= maxUnitsPerLine) return [text];
  const chars = Array.from(text);
  const target = Math.min(maxUnitsPerLine, visualUnits(text) * 0.54);
  let bestIdx = 1;
  let acc = 0;
  for (let i = 0; i < chars.length; i++) {
    acc += chars[i].charCodeAt(0) <= 0x7f ? 0.62 : 1.06;
    if (acc >= target) {
      bestIdx = i + 1;
      break;
    }
  }
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

const MIRAI_ZONES: ReadonlyArray<{ id: MiraiStackZone; code: string; short: string }> = [
  { id: 'optic', code: 'OPTIC', short: '窓/集光' },
  { id: 'active', code: 'CELL', short: '光電層' },
  { id: 'link', code: '3D-IO', short: '垂直配線' },
  { id: 'pkg', code: 'PKG', short: '気密/電源' },
  { id: 'cool', code: 'COOL', short: '放熱/基準' },
];

export function miraiPin(
  tx: number,
  ty: number,
  lx: number,
  ly: number,
  num: number | string,
  title: string,
  sub = '',
  color = '#0f766e',
  anchor: 'start' | 'end' | 'middle' = 'start'
): string {
  const pinX = anchor === 'end' ? lx + 12 : anchor === 'middle' ? lx : lx - 12;
  const textX = anchor === 'end' ? lx - 2 : anchor === 'middle' ? lx : lx + 2;
  const titleFs = fitFs(title, 220, 10.2, 7.8);
  const subFs = sub ? fitFs(sub, 220, 8.8, 6.8) : 8.8;
  return `
    <g>
      <polyline points="${tx},${ty} ${pinX},${ly}" fill="none" stroke="#ffffff" stroke-width="3.6" stroke-linecap="round"/>
      <polyline points="${tx},${ty} ${pinX},${ly}" fill="none" stroke="${color}" stroke-width="1.45" stroke-dasharray="3 2" stroke-linecap="round"/>
      <circle cx="${tx}" cy="${ty}" r="3.2" fill="${color}" stroke="#ffffff" stroke-width="1.4"/>
      <circle cx="${pinX}" cy="${ly}" r="8.6" fill="${color}" stroke="#ffffff" stroke-width="1.5"/>
      <text x="${pinX}" y="${ly + 3.4}" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">${num}</text>
      <text x="${textX}" y="${ly + (sub ? -1.2 : 3.5)}" text-anchor="${anchor}" font-size="${titleFs}" font-weight="800" fill="#0f172a">${escM(title)}</text>
      ${sub ? `<text x="${textX}" y="${ly + 11.2}" text-anchor="${anchor}" font-size="${subFs}" font-weight="600" fill="#475569">${escM(sub)}</text>` : ''}
    </g>`;
}

export function miraiKpi(
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string,
  sub: string,
  accent: string
): string {
  const valFs = fitFs(value, w - 14, 12.6, 8.0);
  const subFs = fitFs(sub, w - 12, 8.4, 6.6);
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="${h}" rx="8" fill="#ffffff" stroke="${accent}" stroke-width="1.25"/>
      <rect x="0" y="0" width="${w}" height="18" rx="8" fill="${accent}" fill-opacity="0.12"/>
      <rect x="0" y="10" width="${w}" height="8" fill="${accent}" fill-opacity="0.12"/>
      <text x="${w / 2}" y="12.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="${accent}">${escM(label)}</text>
      <text x="${w / 2}" y="${h * 0.62}" text-anchor="middle" font-size="${valFs}" font-weight="900" fill="#0f172a" style="font-family:${FONT_MONO};">${escM(value)}</text>
      <text x="${w / 2}" y="${h - 7}" text-anchor="middle" font-size="${subFs}" font-weight="600" fill="#475569">${escM(sub)}</text>
    </g>`;
}

export function miraiComparePill(x: number, y: number, w: number, text: string, future: boolean): string {
  const bg = future ? '#ecfdf5' : '#f1f5f9';
  const stroke = future ? '#059669' : '#94a3b8';
  const fg = future ? '#065f46' : '#475569';
  const prefix = future ? '2028' : '2026';
  const fs = fitFs(`${prefix} ${text}`, w - 16, 9.0, 6.8);
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="21" rx="6" fill="${bg}" stroke="${stroke}" stroke-width="1.05"/>
      <text x="8" y="14" font-size="${fs}" font-weight="800" fill="${fg}">[${prefix}] ${escM(text)}</text>
    </g>`;
}

export function renderMiraiMonographSvg(spec: MiraiHdSpec): string {
  const p = spec.badge.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const titleFs = fitFs(spec.title, 412, 13.8, 9.6);
  const fullAnalogy = `たとえると：${spec.analogy}`;
  const analogyFs = fitFs(fullAnalogy, 410, 10.2, 6.6);
  const analogyEstW = visualUnits(fullAnalogy) * analogyFs * 1.04;
  const analogyClamp = analogyEstW > 410 ? ' textLength="410" lengthAdjust="spacingAndGlyphs"' : '';
  const metricFs = fitFs(spec.metric, 168, 10.2, 7.4);
  const tagFs = fitFs(spec.fhTag, 174, 8.6, 6.8);
  const scaleW = Math.max(170, Math.min(316, Math.ceil(visualUnits(spec.scaleLabel) * 7.6 + 20)));
  const scaleX = 700 - scaleW;
  const scaleFs = fitFs(spec.scaleLabel, scaleW - 14, 7.8, 6.2);

  const railHtml = MIRAI_ZONES.map((z, idx) => {
    const active = z.id === spec.zone;
    const ry = 76 + idx * 55;
    return `
      <g transform="translate(14, ${ry})">
        <rect x="0" y="0" width="32" height="48" rx="6" fill="${active ? spec.accent : '#f8fafc'}" stroke="${active ? spec.accent : '#cbd5e1'}" stroke-width="${active ? '1.3' : '0.85'}"/>
        <text x="16" y="20" text-anchor="middle" font-size="7.4" font-weight="900" fill="${active ? '#ffffff' : '#334155'}" style="font-family:${FONT_MONO};">${z.code}</text>
        <text x="16" y="34" text-anchor="middle" font-size="6.8" font-weight="700" fill="${active ? '#ffffff' : '#64748b'}" opacity="${active ? '0.96' : '0.85'}">${z.short}</text>
      </g>`;
  }).join('');

  const renderCard = (card: MiraiHdCard, x: number, num: string, fallbackCol: string) => {
    const col = card.accent ?? fallbackCol;
    const l1 = wrapTwoLines(card.line1, 19.2);
    const l2 = wrapTwoLines(card.line2, 21.0);
    const l1Fs = fitFs(l1[0], 200, 10.1, 7.8);
    const l2Fs = fitFs(l2[0], 200, 9.0, 7.2);
    const p1 =
      l1.length === 2
        ? `<text x="11" y="42" font-size="${l1Fs}" font-weight="700" fill="#0f172a">${escM(l1[0])}<tspan x="11" dy="13">${escM(l1[1])}</tspan></text>`
        : `<text x="11" y="48" font-size="${l1Fs}" font-weight="700" fill="#0f172a">${escM(l1[0])}</text>`;
    const p2 =
      l2.length === 2
        ? `<text x="11" y="75" font-size="${l2Fs}" font-weight="600" fill="#334155">${escM(l2[0])}<tspan x="11" dy="12.5">${escM(l2[1])}</tspan></text>`
        : `<text x="11" y="81" font-size="${l2Fs}" font-weight="600" fill="#334155">${escM(l2[0])}</text>`;

    return `
      <g transform="translate(${x}, 366)">
        <rect x="0" y="0" width="224" height="122" rx="10" fill="#ffffff" stroke="#dbe3ee" stroke-width="1.15"/>
        <rect x="0" y="0" width="224" height="25" rx="10" fill="${col}" fill-opacity="0.11"/>
        <rect x="0" y="16" width="224" height="9" fill="${col}" fill-opacity="0.11"/>
        <line x1="0" y1="25" x2="224" y2="25" stroke="${col}" stroke-opacity="0.25" stroke-width="1"/>
        <text x="11" y="16.5" font-size="9.6" font-weight="800" fill="${col}">${num}  ${escM(card.label)}</text>
        ${p1}
        ${p2}
        <line x1="11" y1="103" x2="213" y2="103" stroke="#e2e8f0" stroke-width="0.8"/>
        <text x="11" y="115" font-size="7.4" font-weight="700" fill="#64748b" style="font-family:${FONT_MONO};">${escM(spec.badge)} · ${escM(spec.fhTag)}</text>
      </g>`;
  };

  const [c1, c2, c3] = spec.cards;

  return `<svg class="evf-hd-svg mirai-hd-svg" data-mirai-hd="1" data-mirai-badge="${escM(spec.badge)}" viewBox="0 0 720 500" xmlns="http://www.w3.org/2000/svg" style="font-family:${FONT_SANS};">
  <defs>
    <pattern id="${p}_grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#dbe4f0" stroke-width="0.65"/>
      <path d="M 12 0 L 12 24 M 0 12 L 24 12" fill="none" stroke="#f1f5f9" stroke-width="0.45"/>
    </pattern>
    <linearGradient id="${p}_si" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#334155"/><stop offset="55%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="${p}_cyan" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/><stop offset="55%" stop-color="#0284c7"/><stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="${p}_blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#60a5fa"/><stop offset="50%" stop-color="#2563eb"/><stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
    <linearGradient id="${p}_green" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/><stop offset="55%" stop-color="#059669"/><stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
    <linearGradient id="${p}_red" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fb7185"/><stop offset="55%" stop-color="#dc2626"/><stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <linearGradient id="${p}_cu" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdba74"/><stop offset="50%" stop-color="#d97706"/><stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="${p}_gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fde047"/><stop offset="52%" stop-color="#eab308"/><stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
    <linearGradient id="${p}_glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.92"/><stop offset="100%" stop-color="#7dd3fc" stop-opacity="0.58"/>
    </linearGradient>
    <linearGradient id="${p}_violet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#c4b5fd"/><stop offset="55%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#4c1d95"/>
    </linearGradient>
    <linearGradient id="${p}_metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e2e8f0"/><stop offset="55%" stop-color="#94a3b8"/><stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <marker id="${p}_arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="${spec.accent}"/>
    </marker>
    <marker id="${p}_arr_b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
    <marker id="${p}_arr_g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#059669"/>
    </marker>
    <marker id="${p}_arr_r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
  </defs>

  <rect x="1.5" y="1.5" width="717" height="497" rx="14" fill="#f8fafc" stroke="#d5dfe9" stroke-width="1.2"/>

  <!-- Zone 1: Header -->
  <rect x="12" y="10" width="696" height="52" rx="11" fill="#ffffff" stroke="#dbe3ee" stroke-width="1.15"/>
  <rect x="19" y="16.5" width="66" height="39" rx="8" fill="${spec.accent}"/>
  <text x="52" y="34" text-anchor="middle" font-size="11.2" font-weight="900" fill="#ffffff" style="font-family:${FONT_MONO};">${escM(spec.badge)}</text>
  <text x="52" y="47.5" text-anchor="middle" font-size="6.9" font-weight="800" fill="#ffffff" opacity="0.92">MIRAI 2028</text>

  <text x="94" y="31.5" font-size="${titleFs}" font-weight="800" fill="#0f172a">${escM(spec.title)}</text>
  <text x="94" y="50.5" font-size="${analogyFs}" font-weight="700" fill="${spec.accent}"${analogyClamp}>${escM(fullAnalogy)}</text>

  <rect x="518" y="15.5" width="182" height="22" rx="11" fill="${spec.accentSoft}" stroke="${spec.accent}" stroke-width="1.05"/>
  <text x="609" y="30" text-anchor="middle" font-size="${metricFs}" font-weight="800" fill="${spec.accent}">${escM(spec.metric)}</text>
  <text x="609" y="52.5" text-anchor="middle" font-size="${tagFs}" font-weight="700" fill="#64748b" style="font-family:${FONT_MONO};">${escM(spec.fhTag)}</text>

  <!-- Zone 2A: Stack Locator Rail -->
  <rect x="11" y="70" width="38" height="286" rx="8" fill="#ffffff" stroke="#dbe3ee" stroke-width="1"/>
  ${railHtml}

  <!-- Zone 2B: Artboard (654x286) -->
  <rect x="54" y="70" width="654" height="286" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.15"/>
  <rect x="55" y="71" width="652" height="284" rx="10" fill="url(#${p}_grid)"/>
  <path d="M 62 84 L 62 77 L 69 77 M 700 84 L 700 77 L 693 77 M 62 342 L 62 349 L 69 349 M 700 342 L 700 349 L 693 349" fill="none" stroke="#94a3b8" stroke-width="1" opacity="0.65"/>

  ${spec.art(p)}

  <rect x="${scaleX}" y="336" width="${scaleW}" height="15" rx="4" fill="#f8fafc" fill-opacity="0.95" stroke="#cbd5e1" stroke-width="0.85"/>
  <text x="${scaleX + scaleW / 2}" y="346.5" text-anchor="middle" font-size="${scaleFs}" font-weight="800" fill="#334155" style="font-family:${FONT_MONO};">${escM(spec.scaleLabel)}</text>

  <!-- Zone 3: 3-Column Monograph Cards -->
  ${renderCard(c1, 12, '01', spec.accent)}
  ${renderCard(c2, 248, '02', '#059669')}
  ${renderCard(c3, 484, '03', '#0284c7')}
</svg>`;
}
