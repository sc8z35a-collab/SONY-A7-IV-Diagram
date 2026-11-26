/**
 * Ultra-HD 720x470 Beginner-Friendly Technical Infographic SVG Framework
 * for all 55 Electronic Viewfinder (EVF) parts (E01–E55).
 *
 * Design principles:
 * - Spacious 720x470 vector canvas (over 7.5x the area of legacy 320x118 strips)
 * - Clean Japanese sans-serif editorial typography (no squinty 6pt monospace!)
 * - Unique per-part <defs> ID prefixes so simultaneous drawer + lightbox rendering
 *   never collides on gradient/pattern/filter IDs
 * - Consistent 3-zone museum-poster hierarchy:
 *     1. Header Banner (y 0..60): Part badge, clear title, everyday analogy pill
 *     2. High-Definition Technical Illustration Canvas (x 16..704, y 68..346)
 *     3. 3-Column Beginner Summary Strip (y 356..458): 役割 / スゴい工夫 / 撮影メリット
 */

export interface EvfHdCard {
  label: string;
  line1: string;
  line2: string;
  accent?: string;
}

export interface EvfHdSpec {
  /** Part code badge, e.g. 'E01' .. 'E55' (also used as unique <defs> ID prefix) */
  badge: string;
  /** Clear Japanese headline (concise enough to fit cleanly on header) */
  title: string;
  /** Plain everyday analogy for complete beginners (e.g. '冬の「ペアガラス二重窓」') */
  analogy: string;
  /** Primary theme accent hex color */
  accent: string;
  /** Soft pastel header tint hex color */
  accentSoft: string;
  /** Optional extra <defs> elements unique to this diagram */
  defsExtra?: string;
  /** Hero technical vector illustration positioned inside x∈[16,704], y∈[68,346] */
  body: string;
  /** 3 beginner-friendly takeaway cards at the bottom */
  cards: [EvfHdCard, EvfHdCard, EvfHdCard];
}

const FONT_STACK =
  "'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', system-ui, -apple-system, sans-serif";

/**
 * Wrap a bespoke EVF illustration into the unified 720x470 HD infographic poster.
 */
export function wrapEvfHdSvg(spec: EvfHdSpec): string {
  const p = spec.badge.toLowerCase();
  const [c1, c2, c3] = spec.cards;

  const renderCard = (card: EvfHdCard, x: number, icon: string, defaultColor: string): string => {
    const col = card.accent || defaultColor;
    return `
      <g transform="translate(${x}, 356)">
        <rect x="0" y="0" width="222" height="102" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect x="0" y="0" width="222" height="27" rx="10" fill="${col}" fill-opacity="0.10"/>
        <rect x="0" y="18" width="222" height="9" fill="${col}" fill-opacity="0.10"/>
        <line x1="0" y1="27" x2="222" y2="27" stroke="${col}" stroke-opacity="0.22" stroke-width="1"/>
        <text x="10" y="18.5" font-size="11.2" font-weight="800" fill="${col}">${icon} ${card.label}</text>
        <text x="10" y="54" font-size="10.2" font-weight="600" fill="#1e293b">${card.line1}</text>
        <text x="10" y="76" font-size="10.2" font-weight="600" fill="#334155">${card.line2}</text>
      </g>`;
  };

  return `<svg class="evf-hd-svg" data-evf-hd="1" viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" style="font-family:${FONT_STACK};">
  <defs>
    <!-- Subtle engineering drafting grid -->
    <pattern id="${p}-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e2e8f0" stroke-width="0.65" opacity="0.65"/>
      <path d="M 12 0 L 12 24 M 0 12 L 24 12" fill="none" stroke="#f1f5f9" stroke-width="0.45"/>
    </pattern>
    <!-- Cross-section 45° metal hatching -->
    <pattern id="${p}-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#64748b" stroke-width="1.4" opacity="0.38"/>
    </pattern>
    <pattern id="${p}-hatchBlue" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#0284c7" stroke-width="1.3" opacity="0.28"/>
    </pattern>
    <!-- Fine woven stainless mesh -->
    <pattern id="${p}-mesh" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="#cbd5e1"/>
      <path d="M 0 3 L 6 3 M 3 0 L 3 6" stroke="#64748b" stroke-width="1.2"/>
    </pattern>
    <!-- Porous sponge / foam dots -->
    <pattern id="${p}-foam" width="7" height="7" patternUnits="userSpaceOnUse">
      <rect width="7" height="7" fill="#334155"/>
      <circle cx="2" cy="2" r="1.1" fill="#475569"/>
      <circle cx="5.5" cy="5.5" r="0.9" fill="#1e293b"/>
    </pattern>
    <!-- Optical glass gradients -->
    <linearGradient id="${p}-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.92"/>
      <stop offset="45%" stop-color="#7dd3fc" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.62"/>
    </linearGradient>
    <linearGradient id="${p}-glassEd" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ccfbf1" stop-opacity="0.92"/>
      <stop offset="50%" stop-color="#5eead4" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#0d9488" stop-opacity="0.65"/>
    </linearGradient>
    <linearGradient id="${p}-ar" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="35%" stop-color="#06b6d4"/>
      <stop offset="70%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <!-- Realistic metallic & material gradients -->
    <linearGradient id="${p}-steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f1f5f9"/>
      <stop offset="35%" stop-color="#cbd5e1"/>
      <stop offset="70%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>
    <linearGradient id="${p}-brass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="40%" stop-color="#eab308"/>
      <stop offset="85%" stop-color="#a16207"/>
      <stop offset="100%" stop-color="#713f12"/>
    </linearGradient>
    <linearGradient id="${p}-copper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdba74"/>
      <stop offset="45%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="${p}-mg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="${p}-rubber" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3f4654"/>
      <stop offset="50%" stop-color="#272c36"/>
      <stop offset="100%" stop-color="#14171f"/>
    </linearGradient>
    <linearGradient id="${p}-kapton" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="${p}-pcb" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="55%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>
    <linearGradient id="${p}-oled" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="35%" stop-color="#818cf8"/>
      <stop offset="70%" stop-color="#f472b6"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
    <radialGradient id="${p}-irGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fb7185" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#e11d48" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#e11d48" stop-opacity="0"/>
    </radialGradient>
    <filter id="${p}-sh" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#0f172a" flood-opacity="0.14"/>
    </filter>
    <!-- Crisp vector arrowheads -->
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

  <!-- Outer museum infographic poster background -->
  <rect x="0" y="0" width="720" height="470" rx="14" fill="#f8fafc"/>

  <!-- Zone 1: Editorial Header Banner -->
  <rect x="12" y="10" width="696" height="50" rx="11" fill="${spec.accentSoft}" stroke="${spec.accent}" stroke-opacity="0.32" stroke-width="1.2"/>
  <rect x="20" y="18" width="48" height="34" rx="8" fill="${spec.accent}"/>
  <text x="44" y="40" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff" letter-spacing="0.03em">${spec.badge}</text>
  <text x="78" y="33" font-size="14.5" font-weight="800" fill="#0f172a">${spec.title}</text>
  <g transform="translate(78, 40)">
    <text x="0" y="12" font-size="11.2" font-weight="700" fill="${spec.accent}">💡 たとえると：${spec.analogy}</text>
  </g>

  <!-- Zone 2: Ultra-HD Technical Illustration Artboard (696 x 278) -->
  <rect x="12" y="68" width="696" height="278" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
  <rect x="13" y="69" width="694" height="276" rx="11" fill="url(#${p}-grid)"/>
  ${spec.body}

  <!-- Zone 3: 3-Column Beginner Summary Cards -->
  ${renderCard(c1, 12, '🔍', spec.accent)}
  ${renderCard(c2, 249, '⚙️', '#0284c7')}
  ${renderCard(c3, 486, '📸', '#059669')}
</svg>`;
}

/**
 * Draw an unmistakable anatomical human eye cutaway (cornea, iris, pupil, lens, retina)
 * so beginners immediately know where the photographer's eye is looking from!
 */
export function drawHumanEye(
  cx: number,
  cy: number,
  scale = 1,
  facingRight = true,
  label = '撮影者の目'
): string {
  const dir = facingRight ? 1 : -1;
  return `
    <g transform="translate(${cx}, ${cy}) scale(${dir * scale}, ${scale})">
      <!-- Sclera eyeball -->
      <circle cx="0" cy="0" r="30" fill="#fffbeb" stroke="#64748b" stroke-width="2"/>
      <!-- Retina inner curve -->
      <path d="M -25 -13 A 27 27 0 0 0 -25 13" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <!-- Cornea bulge on facing side -->
      <path d="M 24 -16 Q 38 0 24 16" fill="#e0f2fe" fill-opacity="0.7" stroke="#0284c7" stroke-width="2"/>
      <!-- Iris top & bottom -->
      <rect x="21" y="-14" width="4.5" height="9" rx="2" fill="#475569"/>
      <rect x="21" y="5" width="4.5" height="9" rx="2" fill="#475569"/>
      <!-- Pupil gap -->
      <rect x="22" y="-5" width="3" height="10" fill="#0f172a"/>
      <!-- Crystalline lens -->
      <ellipse cx="14" cy="0" rx="5" ry="12" fill="#bae6fd" fill-opacity="0.75" stroke="#0284c7" stroke-width="1.3"/>
      <!-- Eyelid curves -->
      <path d="M 10 -32 Q 30 -28 36 -14" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      <path d="M 10 32 Q 30 28 36 14" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
    </g>
    ${
      label
        ? `<text x="${cx}" y="${cy + 44 * scale}" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">${label}</text>`
        : ''
    }`;
}

/**
 * Draw a crisp numbered callout pin (1..6) with leader line & clean label.
 */
export function drawCallout(
  targetX: number,
  targetY: number,
  labelX: number,
  labelY: number,
  num: number,
  title: string,
  sub = '',
  color = '#0f172a',
  anchor: 'start' | 'end' | 'middle' = 'start'
): string {
  const pinX = anchor === 'end' ? labelX + 12 : anchor === 'middle' ? labelX : labelX - 12;
  const textX = anchor === 'end' ? labelX - 2 : anchor === 'middle' ? labelX : labelX + 2;
  return `
    <g>
      <polyline points="${targetX},${targetY} ${pinX},${labelY}" fill="none" stroke="#ffffff" stroke-width="3.6" stroke-linecap="round"/>
      <polyline points="${targetX},${targetY} ${pinX},${labelY}" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 2" stroke-linecap="round"/>
      <circle cx="${targetX}" cy="${targetY}" r="3.4" fill="${color}" stroke="#ffffff" stroke-width="1.4"/>
      <circle cx="${pinX}" cy="${labelY}" r="9.5" fill="${color}" stroke="#ffffff" stroke-width="1.8"/>
      <text x="${pinX}" y="${labelY + 3.8}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">${num}</text>
      <text x="${textX}" y="${labelY + (sub ? -1 : 4)}" text-anchor="${anchor}" font-size="11.5" font-weight="800" fill="#0f172a">${title}</text>
      ${
        sub
          ? `<text x="${textX}" y="${labelY + 13}" text-anchor="${anchor}" font-size="10" font-weight="600" fill="#475569">${sub}</text>`
          : ''
      }
    </g>`;
}

/**
 * Draw an unmistakable OK (green) or NG (red) comparison badge pill.
 */
export function drawStatusPill(
  x: number,
  y: number,
  w: number,
  text: string,
  ok: boolean
): string {
  const bg = ok ? '#dcfce7' : '#ffe4e6';
  const border = ok ? '#16a34a' : '#e11d48';
  const fg = ok ? '#14532d' : '#881337';
  const icon = ok ? '✅' : '❌';
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="24" rx="12" fill="${bg}" stroke="${border}" stroke-width="1.4"/>
      <text x="${w / 2}" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="${fg}">${icon} ${text}</text>
    </g>`;
}

/**
 * Draw a crisp water droplet icon (rain/sweat/condensation).
 */
export function drawRaindrop(cx: number, cy: number, scale = 1, fill = '#38bdf8'): string {
  return `
    <g transform="translate(${cx}, ${cy}) scale(${scale})">
      <path d="M 0 -10 C 6 -2 8 3 8 6 A 8 8 0 1 1 -8 6 C -8 3 -6 -2 0 -10 Z" fill="${fill}" stroke="#0284c7" stroke-width="1.4"/>
      <path d="M -3 4 A 4 4 0 0 0 0 9" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity="0.8"/>
    </g>`;
}

/**
 * Draw a bright sun icon (for sunlight/stray-light/auto-brightness illustrations).
 */
export function drawSunIcon(cx: number, cy: number, r = 11): string {
  const rays: string[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const x1 = Math.cos(a) * (r + 3);
    const y1 = Math.sin(a) * (r + 3);
    const x2 = Math.cos(a) * (r + 8);
    const y2 = Math.sin(a) * (r + 8);
    rays.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>`);
  }
  return `
    <g transform="translate(${cx}, ${cy})">
      ${rays.join('')}
      <circle cx="0" cy="0" r="${r}" fill="#fde047" stroke="#ea580c" stroke-width="1.8"/>
    </g>`;
}

/**
 * Draw a microscope/magnifying zoom loupe frame for micron/nanometer cutaway callouts.
 */
export function drawLoupe(
  cx: number,
  cy: number,
  r: number,
  title: string,
  innerSvg: string,
  accent = '#0284c7',
  clipId = ''
): string {
  const cId = clipId || `loupe-${Math.round(cx)}-${Math.round(cy)}`;
  return `
    <g>
      <defs>
        <clipPath id="${cId}"><circle cx="${cx}" cy="${cy}" r="${r - 2}"/></clipPath>
      </defs>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${accent}" stroke-width="3"/>
      <g clip-path="url(#${cId})">
        ${innerSvg}
      </g>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${accent}" stroke-width="3"/>
      <rect x="${cx - 81}" y="${cy + r - 9}" width="162" height="20" rx="10" fill="${accent}"/>
      <text x="${cx}" y="${cy + r + 5}" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">🔍 ${title}</text>
    </g>`;
}
