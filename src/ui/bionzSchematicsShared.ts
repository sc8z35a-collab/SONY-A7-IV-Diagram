/**
 * Ultra-HD 720x500 Editorial Engineering Monograph SVG Framework for BIONZ XR / XR2 V1 (XR01–XR70).
 * Upgrades all 70 bespoke BIONZ XR package & SY-1122 mainboard schematics with:
 *   - Left 6-tier physical stack/board locator rail (auto-derived from XR01–XR70)
 *   - Dual-density precision blueprint drafting grid + corner calibration ticks
 *   - 1.185x vector-scaled artboard preserving every pixel of all 70 hand-crafted diagrams
 *   - Refined editorial header, beginner analogy strip, and 3-column technical monograph cards
 *   - Full compatibility with ExplanationDrawer Ultra-HD Lightbox (zoom/pan/blueprint/export)
 */

export interface BionzDiagramSpec {
  /** Unique diagram code & <defs> ID namespace (e.g. 'xr01') */
  code: string;
  /** Badge label shown at top-left (e.g. 'XR01') */
  badge: string;
  /** Primary theme accent hex color */
  accent: string;
  /** Soft tint background for right metric pill & header */
  accentSoft: string;
  /** Dark readable text color matching accent */
  accentDark: string;
  /** Plain-Japanese headline */
  title: string;
  /** Key quantitative badge shown at top-right */
  metric: string;
  /** Everyday beginner metaphor line 1 */
  analogyLine1: string;
  /** Everyday beginner metaphor line 2 */
  analogyLine2: string;
  /** Bottom takeaway chip 1: mechanism / feature */
  chipHow: string;
  /** Bottom takeaway chip 2: benefit for photo/video shooting */
  chipBenefit: string;
  /** Bottom takeaway chip 3: real hardware spec */
  chipSpec: string;
  /** Whether to show faint engineering blueprint grid on illustration stage */
  showGrid?: boolean;
  /** Custom SVG artwork strictly inside x in [18, 542], y in [58, 276] */
  art: (p: string) => string;
}

export function escXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Crisp numbered callout circle ① ② ③ ④ */
export function stepBadge(cx: number, cy: number, num: string, fill: string): string {
  return `
    <circle cx="${cx}" cy="${cy}" r="8.5" fill="${fill}" stroke="#ffffff" stroke-width="1.6"/>
    <text x="${cx}" y="${cy + 3.8}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">${num}</text>
  `;
}

/** Comparison panel badge (× Bad / ○ Good) for instant beginner comprehension */
export function comparePill(
  x: number,
  y: number,
  w: number,
  ok: boolean,
  label: string
): string {
  const fill = ok ? '#dcfce7' : '#fee2e2';
  const stroke = ok ? '#16a34a' : '#dc2626';
  const textCol = ok ? '#166534' : '#991b1b';
  const mark = ok ? '○' : '×';
  return `
    <rect x="${x}" y="${y}" width="${w}" height="22" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>
    <text x="${x + w * 0.5}" y="${y + 15}" text-anchor="middle" font-size="11" font-weight="800" fill="${textCol}">${mark} ${escXml(label)}</text>
  `;
}

/** Estimate visual full-width character units (Japanese/CJK = 1.0, ASCII/digits = 0.56) */
function visualLen(s: string): number {
  let n = 0;
  for (const ch of s) {
    n += ch.charCodeAt(0) <= 0x7f ? 0.56 : 1.0;
  }
  return n;
}

/** Pick crisp font-size so text fits strictly inside maxPx width with comfortable padding */
function fitFontSize(text: string, maxPx: number, maxSize: number, minSize = 8.2): number {
  const units = Math.max(1, visualLen(text));
  const ideal = maxPx / (units * 1.04);
  return Math.max(minSize, Math.min(maxSize, +ideal.toFixed(2)));
}

/** Authentic circular microscope loupe frame + clip-path declaration helper */
export function loupeRing(cx: number, cy: number, r: number, title: string, accent: string): string {
  const pillW = 122;
  const fs = fitFontSize(title, pillW - 14, 9.4, 7.8);
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${accent}" stroke-width="2.6"/>
    <circle cx="${cx}" cy="${cy}" r="${r + 2.5}" fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.9"/>
    <rect x="${cx - pillW * 0.5}" y="${cy - r - 18}" width="${pillW}" height="17" rx="8.5" fill="${accent}"/>
    <text x="${cx}" y="${cy - r - 6}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="#ffffff">${escXml(title)}</text>
  `;
}

const V1_TIERS: ReadonlyArray<{ id: number; short: string; range: [number, number]; scale: string; tag: string }> = [
  { id: 0, short: '蓋・PoP', range: [1, 8], scale: 'PACKAGE / 100 μm – 1 mm', tag: 'PKG 放熱・PoP階層' },
  { id: 1, short: 'ISP/AI', range: [9, 25], scale: 'SILICON DIE / 0.1 – 12 mm', tag: 'SoC 演算コア階層' },
  { id: 2, short: 'FEOL', range: [26, 31], scale: 'TRANSISTOR / 4 nm – 50 μm', tag: '微細配線・2.5D接合' },
  { id: 3, short: 'ABF', range: [32, 36], scale: 'SUBSTRATE / 9 μm – 400 μm', tag: 'ABF基板・BGA階層' },
  { id: 4, short: '電源・基板', range: [37, 53], scale: 'SY-1122 / 0.4 – 30 mm', tag: '電源PDN・メイン基板' },
  { id: 5, short: '周辺IC', range: [54, 70], scale: 'SYSTEM I/O / 0.5 – 20 mm', tag: 'SY-1122 周辺システム' },
];

function resolveV1Tier(badge: string): (typeof V1_TIERS)[number] {
  const num = parseInt(badge.replace(/[^0-9]/g, ''), 10) || 1;
  return V1_TIERS.find((t) => num >= t.range[0] && num <= t.range[1]) ?? V1_TIERS[0];
}

/** Render an Ultra-HD 720x500 Editorial Engineering Monograph SVG for BIONZ XR / XR2 V1 (XR01–XR70) */
export function renderBionzDiagram(spec: BionzDiagramSpec): string {
  const p = spec.code;
  const tier = resolveV1Tier(spec.badge);

  const titleFs = fitFontSize(spec.title, 396, 15.2, 11.4);
  const metricFs = fitFontSize(spec.metric, 174, 11.0, 8.8);
  const a1Fs = fitFontSize(spec.analogyLine1, 560, 11.4, 9.0);
  const a2Fs = fitFontSize(spec.analogyLine2, 560, 11.0, 8.8);
  const howFs = fitFontSize(spec.chipHow, 198, 12.0, 8.8);
  const benFs = fitFontSize(spec.chipBenefit, 198, 12.0, 8.8);
  const specFs = fitFontSize(spec.chipSpec, 198, 11.6, 8.6);

  // Left vertical 6-tier physical stack locator rail (x=12..48, y=70..356)
  const railHtml = V1_TIERS.map((t, idx) => {
    const ry = 76 + idx * 45;
    const active = t.id === tier.id;
    return `
      <rect x="14" y="${ry}" width="32" height="39" rx="6" fill="${active ? spec.accent : '#f1f5f9'}" stroke="${active ? spec.accent : '#cbd5e1'}" stroke-width="${active ? '1.3' : '0.9'}"/>
      <text x="30" y="${ry + 16}" text-anchor="middle" font-size="7.4" font-weight="800" fill="${active ? '#ffffff' : '#64748b'}" style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">L${idx + 1}</text>
      <text x="30" y="${ry + 29}" text-anchor="middle" font-size="6.8" font-weight="700" fill="${active ? '#f8fafc' : '#475569'}">${t.short}</text>
      ${active ? `<polygon points="46,${ry + 15} 52,${ry + 19.5} 46,${ry + 24}" fill="${spec.accent}"/>` : ''}
    `;
  }).join('');

  const gridBg =
    spec.showGrid !== false
      ? `<rect x="55" y="71" width="652" height="284" rx="10" fill="url(#${p}_grid)" opacity="0.65"/>`
      : '';

  // Map original 560x400 art stage [12..548, 52..282] (536x230) crisply into HD stage [54..708, 70..356] (654x286)
  // tx = 54 + (654 - 536*1.185)/2 - 12*1.185 = 54 + 9.42 - 14.22 = 49.2
  // ty = 70 + (286 - 230*1.185)/2 - 52*1.185 = 70 + 6.725 - 61.62 = 15.1
  return `<svg class="evf-hd-svg bionz-hd-svg" data-bionz-diagram="${p}" data-bionz-tier="v1" data-bionz-zone="L${tier.id + 1}" data-bionz-badge="${escXml(spec.badge)}" viewBox="0 0 720 500" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic UI', system-ui, -apple-system, sans-serif;">
    <defs>
      <linearGradient id="${p}_sus" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e2e8f0"/>
        <stop offset="48%" stop-color="#94a3b8"/>
        <stop offset="100%" stop-color="#475569"/>
      </linearGradient>
      <linearGradient id="${p}_cu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fb923c"/>
        <stop offset="50%" stop-color="#d97706"/>
        <stop offset="100%" stop-color="#9a3412"/>
      </linearGradient>
      <linearGradient id="${p}_gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fde047"/>
        <stop offset="55%" stop-color="#eab308"/>
        <stop offset="100%" stop-color="#a16207"/>
      </linearGradient>
      <linearGradient id="${p}_si" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="55%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#334155"/>
      </linearGradient>
      <linearGradient id="${p}_si_blue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="50%" stop-color="#0284c7"/>
        <stop offset="100%" stop-color="#1e3a8a"/>
      </linearGradient>
      <linearGradient id="${p}_dram" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#60a5fa"/>
        <stop offset="50%" stop-color="#2563eb"/>
        <stop offset="100%" stop-color="#1e3a8a"/>
      </linearGradient>
      <linearGradient id="${p}_pcb" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#22c55e"/>
        <stop offset="45%" stop-color="#15803d"/>
        <stop offset="100%" stop-color="#14532d"/>
      </linearGradient>
      <linearGradient id="${p}_emc" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#475569"/>
        <stop offset="50%" stop-color="#334155"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <linearGradient id="${p}_heat" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#dc2626"/>
        <stop offset="55%" stop-color="#f97316"/>
        <stop offset="100%" stop-color="#facc15"/>
      </linearGradient>
      <linearGradient id="${p}_violet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#a78bfa"/>
        <stop offset="50%" stop-color="#7c3aed"/>
        <stop offset="100%" stop-color="#4c1d95"/>
      </linearGradient>
      <linearGradient id="${p}_teal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2dd4bf"/>
        <stop offset="55%" stop-color="#0d9488"/>
        <stop offset="100%" stop-color="#115e59"/>
      </linearGradient>
      <radialGradient id="${p}_solder" cx="35%" cy="30%" r="68%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="45%" stop-color="#cbd5e1"/>
        <stop offset="100%" stop-color="#64748b"/>
      </radialGradient>
      <pattern id="${p}_grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#dbe4f0" stroke-width="0.65"/>
        <path d="M 12 0 L 12 24 M 0 12 L 24 12" fill="none" stroke="#f1f5f9" stroke-width="0.45"/>
      </pattern>
      <pattern id="${p}_hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#94a3b8" stroke-width="1.2" opacity="0.45"/>
      </pattern>
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
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#16a34a"/>
      </marker>
      <marker id="${p}_arr_purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#7c3aed"/>
      </marker>
      <marker id="${p}_arr_dark" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#334155"/>
      </marker>
      <filter id="${p}_shadow" x="-8%" y="-8%" width="116%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#0f172a" flood-opacity="0.12"/>
      </filter>
    </defs>

    <!-- Outer Engineering Monograph Sheet -->
    <rect x="1.5" y="1.5" width="717" height="497" rx="14" fill="#f8fafc" stroke="#d5dfe9" stroke-width="1.2"/>

    <!-- Zone 1: Editorial Monograph Header -->
    <rect x="12" y="10" width="696" height="52" rx="11" fill="#ffffff" stroke="#dbe3ee" stroke-width="1.1"/>
    <rect x="19" y="17" width="60" height="38" rx="8" fill="${spec.accent}"/>
    <text x="49" y="34" text-anchor="middle" font-size="13.8" font-weight="900" fill="#ffffff" style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${escXml(spec.badge)}</text>
    <text x="49" y="47" text-anchor="middle" font-size="7.4" font-weight="700" fill="#ffffff" opacity="0.88">BIONZ V1</text>

    <text x="88" y="32" font-size="${titleFs}" font-weight="800" fill="#0f172a">${escXml(spec.title)}</text>
    <text x="88" y="49" font-size="9.4" font-weight="700" fill="#64748b" style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${escXml(tier.tag)}  ·  ${escXml(tier.scale)}</text>

    <rect x="514" y="20" width="186" height="32" rx="16" fill="${spec.accentSoft}" stroke="${spec.accent}" stroke-width="1.15"/>
    <text x="607" y="40" text-anchor="middle" font-size="${metricFs}" font-weight="800" fill="${spec.accentDark}">${escXml(spec.metric)}</text>

    <!-- Zone 2A: Left 6-Tier Package / SY-1122 Stack Locator Rail -->
    <rect x="11" y="70" width="38" height="286" rx="8" fill="#ffffff" stroke="#dbe3ee" stroke-width="1"/>
    ${railHtml}

    <!-- Zone 2B: Main Ultra-HD Vector Technical Illustration Stage (654x286) -->
    <rect x="54" y="70" width="654" height="286" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.15"/>
    ${gridBg}
    <!-- Precision CAD corner registration marks -->
    <path d="M 62 84 L 62 77 L 69 77 M 700 84 L 700 77 L 693 77 M 62 342 L 62 349 L 69 349 M 700 342 L 700 349 L 693 349" fill="none" stroke="#94a3b8" stroke-width="1" opacity="0.65"/>

    <g transform="translate(49.2, 15.1) scale(1.185)">
      ${spec.art(p)}
    </g>

    <!-- Bottom-right engineering calibration watermark inside stage -->
    <rect x="540" y="336" width="160" height="15" rx="4" fill="#f8fafc" fill-opacity="0.9" stroke="#e2e8f0" stroke-width="0.8"/>
    <text x="620" y="346.5" text-anchor="middle" font-size="7.6" font-weight="700" fill="#475569" style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${escXml(spec.badge)} · ${escXml(tier.scale)}</text>

    <!-- Zone 3A: Editorial Plain-Japanese Analogy Strip -->
    <rect x="12" y="364" width="696" height="46" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-opacity="0.55" stroke-width="1.1"/>
    <rect x="20" y="373" width="76" height="28" rx="7" fill="#d97706"/>
    <text x="58" y="391" text-anchor="middle" font-size="10.4" font-weight="800" fill="#ffffff">たとえると</text>
    <text x="106" y="383" font-size="${a1Fs}" font-weight="700" fill="#78350f">${escXml(spec.analogyLine1)}</text>
    <text x="106" y="400" font-size="${a2Fs}" font-weight="500" fill="#92400e">${escXml(spec.analogyLine2)}</text>

    <!-- Zone 3B: 3-Column Deep Monograph Summary Cards -->
    <g transform="translate(12, 418)">
      <rect x="0" y="0" width="224" height="72" rx="10" fill="#ffffff" stroke="#dbe3ee" stroke-width="1.1"/>
      <rect x="0" y="0" width="224" height="24" rx="10" fill="${spec.accentSoft}"/>
      <rect x="0" y="15" width="224" height="9" fill="${spec.accentSoft}"/>
      <line x1="0" y1="24" x2="224" y2="24" stroke="${spec.accent}" stroke-opacity="0.22" stroke-width="1"/>
      <text x="12" y="16" font-size="9.6" font-weight="800" fill="${spec.accentDark}">01  構造・しくみの要点</text>
      <text x="112" y="52" text-anchor="middle" font-size="${howFs}" font-weight="800" fill="#0f172a">${escXml(spec.chipHow)}</text>
    </g>

    <g transform="translate(248, 418)">
      <rect x="0" y="0" width="224" height="72" rx="10" fill="#ffffff" stroke="#dbe3ee" stroke-width="1.1"/>
      <rect x="0" y="0" width="224" height="24" rx="10" fill="#ecfdf5"/>
      <rect x="0" y="15" width="224" height="9" fill="#ecfdf5"/>
      <line x1="0" y1="24" x2="224" y2="24" stroke="#16a34a" stroke-opacity="0.22" stroke-width="1"/>
      <text x="12" y="16" font-size="9.6" font-weight="800" fill="#15803d">02  撮影・画質へのメリット</text>
      <text x="112" y="52" text-anchor="middle" font-size="${benFs}" font-weight="800" fill="#14532d">${escXml(spec.chipBenefit)}</text>
    </g>

    <g transform="translate(484, 418)">
      <rect x="0" y="0" width="224" height="72" rx="10" fill="#ffffff" stroke="#dbe3ee" stroke-width="1.1"/>
      <rect x="0" y="0" width="224" height="24" rx="10" fill="#f1f5f9"/>
      <rect x="0" y="15" width="224" height="9" fill="#f1f5f9"/>
      <line x1="0" y1="24" x2="224" y2="24" stroke="#64748b" stroke-opacity="0.24" stroke-width="1"/>
      <text x="12" y="16" font-size="9.6" font-weight="800" fill="#334155">03  実機物理・設計諸元</text>
      <text x="112" y="52" text-anchor="middle" font-size="${specFs}" font-weight="800" fill="#0f172a" style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${escXml(spec.chipSpec)}</text>
    </g>
  </svg>`;
}
