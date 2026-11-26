/**
 * Shared high-precision SVG diagram framework for BIONZ XR / XR2 (XR01–XR46).
 * Renders magazine-grade 560x400 vector cross-sections, zoom loupes, waveforms,
 * Before/After visual comparisons, and beginner-friendly Japanese analogies.
 * Every <defs> ID is uniquely namespaced per diagram code to prevent DOM collisions.
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
  /** Plain-Japanese headline (<= 17 full-width chars) */
  title: string;
  /** Key quantitative badge shown at top-right (<= 13 chars) */
  metric: string;
  /** Everyday beginner metaphor line 1 (<= 34 full-width chars) */
  analogyLine1: string;
  /** Everyday beginner metaphor line 2 (<= 34 full-width chars) */
  analogyLine2: string;
  /** Bottom takeaway chip 1: mechanism / feature (<= 13 full-width chars) */
  chipHow: string;
  /** Bottom takeaway chip 2: benefit for photo/video shooting (<= 13 full-width chars) */
  chipBenefit: string;
  /** Bottom takeaway chip 3: real hardware spec (<= 14 chars) */
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
    <circle cx="${cx}" cy="${cy}" r="8.5" fill="${fill}" stroke="#ffffff" stroke-width="1.5"/>
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
function fitFontSize(text: string, maxPx: number, maxSize: number, minSize = 8.0): number {
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

/** Render a complete 560x400 high-precision, beginner-friendly BIONZ XR diagram SVG */
export function renderBionzDiagram(spec: BionzDiagramSpec): string {
  const p = spec.code;
  const gridBg =
    spec.showGrid !== false
      ? `<rect x="12" y="52" width="536" height="230" rx="10" fill="url(#${p}_grid)" opacity="0.55"/>`
      : '';

  const titleFs = fitFontSize(spec.title, 304, 14.2, 11.2);
  const metricFs = fitFontSize(spec.metric, 146, 10.6, 8.6);
  const a1Fs = fitFontSize(spec.analogyLine1, 444, 11.2, 8.8);
  const a2Fs = fitFontSize(spec.analogyLine2, 444, 11.0, 8.8);
  const howFs = fitFontSize(spec.chipHow, 158, 11.0, 8.2);
  const benFs = fitFontSize(spec.chipBenefit, 158, 11.0, 8.2);
  const specFs = fitFontSize(spec.chipSpec, 158, 10.6, 8.0);

  return `<svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" data-bionz-diagram="${p}" style="font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic UI', system-ui, -apple-system, sans-serif;">
    <defs>
      <linearGradient id="${p}_sus" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#cbd5e1"/>
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
      <pattern id="${p}_grid" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#e2e8f0" stroke-width="0.65"/>
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

    <!-- Outer Technical Sheet Canvas -->
    <rect x="2" y="2" width="556" height="396" rx="12" fill="#f8fafc" stroke="#dbe3ee" stroke-width="1.2"/>

    <!-- Zone 1: Header Bar -->
    <rect x="12" y="10" width="54" height="30" rx="8" fill="${spec.accent}"/>
    <text x="39" y="30" text-anchor="middle" font-size="13.2" font-weight="800" fill="#ffffff" style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${escXml(spec.badge)}</text>
    <text x="74" y="30" font-size="${titleFs}" font-weight="800" fill="#0f172a">${escXml(spec.title)}</text>
    <rect x="386" y="12" width="162" height="26" rx="13" fill="${spec.accentSoft}" stroke="${spec.accent}" stroke-width="1.1"/>
    <text x="467" y="29" text-anchor="middle" font-size="${metricFs}" font-weight="700" fill="${spec.accentDark}">${escXml(spec.metric)}</text>

    <!-- Zone 2: Main High-Precision Technical Illustration Stage -->
    <rect x="12" y="52" width="536" height="230" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.1"/>
    ${gridBg}
    ${spec.art(p)}

    <!-- Zone 3A: Beginner Everyday Analogy Banner -->
    <rect x="12" y="288" width="536" height="48" rx="9" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2"/>
    <rect x="18" y="299" width="66" height="26" rx="6" fill="#f59e0b"/>
    <text x="51" y="316" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">たとえると</text>
    <text x="92" y="308.5" font-size="${a1Fs}" font-weight="700" fill="#78350f">${escXml(spec.analogyLine1)}</text>
    <text x="92" y="326" font-size="${a2Fs}" font-weight="500" fill="#92400e">${escXml(spec.analogyLine2)}</text>

    <!-- Zone 3B: 3 Beginner Takeaway Chips -->
    <rect x="12" y="342" width="174" height="48" rx="8" fill="${spec.accentSoft}" stroke="${spec.accent}" stroke-width="1"/>
    <text x="99" y="357" text-anchor="middle" font-size="9.2" font-weight="700" fill="${spec.accentDark}">しくみ・ポイント</text>
    <text x="99" y="378" text-anchor="middle" font-size="${howFs}" font-weight="800" fill="#0f172a">${escXml(spec.chipHow)}</text>

    <rect x="193" y="342" width="174" height="48" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="1"/>
    <text x="280" y="357" text-anchor="middle" font-size="9.2" font-weight="700" fill="#15803d">撮影へのメリット</text>
    <text x="280" y="378" text-anchor="middle" font-size="${benFs}" font-weight="800" fill="#14532d">${escXml(spec.chipBenefit)}</text>

    <rect x="374" y="342" width="174" height="48" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="461" y="357" text-anchor="middle" font-size="9.2" font-weight="700" fill="#475569">実機スペック</text>
    <text x="461" y="378" text-anchor="middle" font-size="${specFs}" font-weight="800" fill="#0f172a" style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${escXml(spec.chipSpec)}</text>
  </svg>`;
}
