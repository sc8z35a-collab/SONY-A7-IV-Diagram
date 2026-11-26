/**
 * Ultra-HD 720x470 Museum-Poster Vector Infographic Framework
 * for all 52 Sensor Fab Vol.3 parts (F3-01–F3-52: Phase 2 Design & Photomask Fab P02-001–050).
 *
 * Emits `class="evf-hd-svg" data-fab-hd="1"` so ExplanationDrawer automatically upgrades
 * styling (.is-hd-schematic) and enables click-to-zoom Fullscreen Vector Lightbox!
 */

export interface Fab3HdCard {
  label: string;
  line1: string;
  line2: string;
  accent?: string;
}

export interface Fab3HdSpec {
  /** Badge e.g. 'F3-01'..'F3-52' (also unique <defs> ID prefix) */
  badge: string;
  /** Optional step tag shown on top-right pill, e.g. 'P02-028 [業界標準]' */
  stepTag: string;
  /** Clear concise Japanese headline */
  title: string;
  /** Plain everyday analogy */
  analogy: string;
  /** Theme primary accent hex */
  accent: string;
  /** Soft pastel header tint hex */
  accentSoft: string;
  /** Optional extra <defs> elements unique to this diagram */
  defsExtra?: string;
  /** Hero technical vector illustration inside x∈[14,706], y∈[70,344] */
  body: string;
  /** 3 beginner-to-engineer summary cards at bottom */
  cards: [Fab3HdCard, Fab3HdCard, Fab3HdCard];
}

const FONT_STACK =
  "'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', system-ui, -apple-system, sans-serif";

export function wrapFab3HdSvg(spec: Fab3HdSpec): string {
  const p = spec.badge.toLowerCase().replace(/[^a-z0-9]/g, '');
  const [c1, c2, c3] = spec.cards;

  const renderCard = (card: Fab3HdCard, x: number, icon: string, defaultColor: string): string => {
    const col = card.accent || defaultColor;
    return `
      <g transform="translate(${x}, 356)">
        <rect x="0" y="0" width="222" height="102" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect x="0" y="0" width="222" height="27" rx="10" fill="${col}" fill-opacity="0.10"/>
        <rect x="0" y="18" width="222" height="9" fill="${col}" fill-opacity="0.10"/>
        <line x1="0" y1="27" x2="222" y2="27" stroke="${col}" stroke-opacity="0.22" stroke-width="1"/>
        <text x="10" y="18.5" font-size="11" font-weight="800" fill="${col}">${icon} ${card.label}</text>
        <text x="10" y="54" font-size="10.2" font-weight="600" fill="#1e293b">${card.line1}</text>
        <text x="10" y="76" font-size="10.2" font-weight="600" fill="#334155">${card.line2}</text>
      </g>`;
  };

  const titleSize = spec.title.length > 35 ? 11.4 : spec.title.length > 30 ? 12.2 : 13.4;

  return `<svg class="evf-hd-svg" data-fab-hd="1" viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" style="font-family:${FONT_STACK};">
  <defs>
    <pattern id="${p}-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e2e8f0" stroke-width="0.65" opacity="0.65"/>
      <path d="M 12 0 L 12 24 M 0 12 L 24 12" fill="none" stroke="#f1f5f9" stroke-width="0.45"/>
    </pattern>
    <pattern id="${p}-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#64748b" stroke-width="1.4" opacity="0.35"/>
    </pattern>
    <linearGradient id="${p}-quartz" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.92"/>
      <stop offset="50%" stop-color="#bae6fd" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.58"/>
    </linearGradient>
    <linearGradient id="${p}-si" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#64748b"/>
      <stop offset="50%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="${p}-cu" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdba74"/>
      <stop offset="50%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="${p}-uv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.16"/>
    </linearGradient>
    <linearGradient id="${p}-eb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.22"/>
    </linearGradient>
    <linearGradient id="${p}-mosi" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4338ca"/>
      <stop offset="50%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#312e81"/>
    </linearGradient>
    <linearGradient id="${p}-steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f1f5f9"/>
      <stop offset="45%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>
    <marker id="${p}-arrBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#0284c7"/>
    </marker>
    <marker id="${p}-arrRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#e11d48"/>
    </marker>
    <marker id="${p}-arrAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#d97706"/>
    </marker>
    <marker id="${p}-arrGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#059669"/>
    </marker>
    <marker id="${p}-arrPurple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#7c3aed"/>
    </marker>
    <marker id="${p}-arrSlate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#475569"/>
    </marker>
    ${spec.defsExtra || ''}
  </defs>

  <!-- Poster outer sheet -->
  <rect x="0" y="0" width="720" height="470" rx="14" fill="#f8fafc"/>

  <!-- Zone 1: Editorial Header Banner -->
  <rect x="12" y="10" width="696" height="50" rx="11" fill="${spec.accentSoft}" stroke="${spec.accent}" stroke-opacity="0.34" stroke-width="1.2"/>
  <rect x="20" y="18" width="54" height="34" rx="8" fill="${spec.accent}"/>
  <text x="47" y="40" text-anchor="middle" font-size="13.5" font-weight="900" fill="#ffffff">${spec.badge}</text>
  <text x="84" y="32" font-size="${titleSize}" font-weight="800" fill="#0f172a">${spec.title}</text>
  <text x="84" y="51" font-size="10.4" font-weight="700" fill="${spec.accent}">💡 たとえると：${spec.analogy}</text>
  <rect x="558" y="16" width="142" height="22" rx="11" fill="#ffffff" stroke="${spec.accent}" stroke-opacity="0.45" stroke-width="1"/>
  <text x="629" y="30.5" text-anchor="middle" font-size="9.4" font-weight="800" fill="${spec.accent}">${spec.stepTag}</text>

  <!-- Zone 2: Ultra-HD Technical Artboard (696 x 278) -->
  <rect x="12" y="68" width="696" height="278" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
  <rect x="13" y="69" width="694" height="276" rx="11" fill="url(#${p}-grid)"/>
  ${spec.body}

  <!-- Zone 3: 3-Column Beginner-to-Engineer Summary Cards -->
  ${renderCard(c1, 12, '🔍', spec.accent)}
  ${renderCard(c2, 249, '⚙️', '#0284c7')}
  ${renderCard(c3, 486, '📸', '#e11d48')}
</svg>`;
}

/** Crisp numbered callout pin with white halo leader line */
export function drawPin(
  tx: number,
  ty: number,
  lx: number,
  ly: number,
  num: number,
  title: string,
  sub = '',
  color = '#0f172a',
  anchor: 'start' | 'end' | 'middle' = 'start'
): string {
  const pinX = anchor === 'end' ? lx + 12 : anchor === 'middle' ? lx : lx - 12;
  const textX = anchor === 'end' ? lx - 2 : anchor === 'middle' ? lx : lx + 2;
  return `
    <g>
      <polyline points="${tx},${ty} ${pinX},${ly}" fill="none" stroke="#ffffff" stroke-width="3.6" stroke-linecap="round"/>
      <polyline points="${tx},${ty} ${pinX},${ly}" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 2" stroke-linecap="round"/>
      <circle cx="${tx}" cy="${ty}" r="3.4" fill="${color}" stroke="#ffffff" stroke-width="1.4"/>
      <circle cx="${pinX}" cy="${ly}" r="9.2" fill="${color}" stroke="#ffffff" stroke-width="1.7"/>
      <text x="${pinX}" y="${ly + 3.6}" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">${num}</text>
      <text x="${textX}" y="${ly + (sub ? -1 : 4)}" text-anchor="${anchor}" font-size="11.2" font-weight="800" fill="#0f172a">${title}</text>
      ${sub ? `<text x="${textX}" y="${ly + 12.5}" text-anchor="${anchor}" font-size="9.8" font-weight="600" fill="#475569">${sub}</text>` : ''}
    </g>`;
}

/** OK (green) or NG (red) comparison pill */
export function drawPill(x: number, y: number, w: number, text: string, ok: boolean): string {
  const bg = ok ? '#dcfce7' : '#ffe4e6';
  const border = ok ? '#16a34a' : '#e11d48';
  const fg = ok ? '#14532d' : '#881337';
  const icon = ok ? '✅' : '❌';
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="24" rx="12" fill="${bg}" stroke="${border}" stroke-width="1.3"/>
      <text x="${w / 2}" y="15.8" text-anchor="middle" font-size="10.5" font-weight="800" fill="${fg}">${icon} ${text}</text>
    </g>`;
}

/** Clean metric KPI tile inside artboard */
export function drawKpiBox(
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string,
  sub: string,
  accent: string
): string {
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="${h}" rx="9" fill="#ffffff" stroke="${accent}" stroke-width="1.4"/>
      <rect x="0" y="0" width="${w}" height="21" rx="9" fill="${accent}" fill-opacity="0.12"/>
      <rect x="0" y="13" width="${w}" height="8" fill="${accent}" fill-opacity="0.12"/>
      <text x="${w / 2}" y="14.5" text-anchor="middle" font-size="9.8" font-weight="800" fill="${accent}">${label}</text>
      <text x="${w / 2}" y="${h * 0.62}" text-anchor="middle" font-size="14" font-weight="900" fill="#0f172a">${value}</text>
      <text x="${w / 2}" y="${h - 8}" text-anchor="middle" font-size="9.4" font-weight="600" fill="#475569">${sub}</text>
    </g>`;
}

/** Split left/right comparison panel frame */
export function drawCompareFrame(
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  border: string,
  bg: string
): string {
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="${h}" rx="10" fill="${bg}" stroke="${border}" stroke-width="1.5"/>
      <rect x="0" y="0" width="${w}" height="26" rx="10" fill="${border}"/>
      <rect x="0" y="18" width="${w}" height="8" fill="${border}"/>
      <text x="${w / 2}" y="17.5" text-anchor="middle" font-size="11.2" font-weight="800" fill="#ffffff">${title}</text>
    </g>`;
}
