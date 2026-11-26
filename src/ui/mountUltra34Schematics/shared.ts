/**
 * Shared SVG frame, scoped arrow markers, and typography helpers for
 * Phase 34 Ultra-Detailed Lens Mount Technical Schematics (M61–M100).
 *
 * Canvas: viewBox="0 0 360 176" (data-mount-hd="1")
 *   - Header strip:  y = 2..23  (badge M61..M100 + concise title + view tag)
 *   - Diagram zone:  x = 10..350, y = 26..150
 *   - Caption strip: y = 152..172
 */

export const FONT_SANS =
  "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic UI', sans-serif";

export const FONT_MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

export interface MountHdFrameOptions {
  /** Part code badge, e.g. "M61" .. "M100" */
  code: string;
  /** Concise Japanese schematic header title (<= 22 chars) */
  title: string;
  /** View-angle / diagram-type badge on top right, e.g. "断面構造", "電気物理層" */
  viewTag: string;
  /** Accent hex color for badge, view tag, and highlights */
  accent: string;
  /** Soft background tint for the header strip */
  headerBg?: string;
  /** Optional custom <defs> content (prefix IDs with code!) */
  defs?: string;
  /** Inner SVG markup placed inside x=[10..350], y=[26..150] */
  body: string;
  /** Concise 1-line Japanese takeaway caption (<= 38 chars) */
  caption: string;
}

/**
 * Generates a self-contained, collision-free 360x176 technical schematic SVG
 * with scoped arrowhead markers (`#a-${code}-blue`, `-cyan`, `-red`, `-amber`, `-green`, `-purple`, `-slate`).
 */
export function mountHdFrame(opts: MountHdFrameOptions): string {
  const {
    code,
    title,
    viewTag,
    accent,
    headerBg = '#f8fafc',
    defs = '',
    body,
    caption,
  } = opts;

  const mk = (name: string, color: string) =>
    `<marker id="a-${code}-${name}" viewBox="0 0 8 8" refX="6.8" refY="4" markerWidth="5.2" markerHeight="5.2" orient="auto-start-reverse"><path d="M0.8,1.2 L7.2,4 L0.8,6.8 z" fill="${color}"/></marker>`;

  const badgeW = code.length >= 4 ? 36 : 31;
  const badgeCx = 8 + badgeW / 2;
  const titleX = 8 + badgeW + 6;

  const estTagW = Array.from(viewTag).reduce(
    (sum, ch) => sum + (ch.charCodeAt(0) > 0x7f ? 7.4 : 4.6),
    0
  );
  const tagW = Math.max(56, Math.ceil(estTagW + 14));
  const tagX = 352 - tagW;
  const tagCx = tagX + tagW / 2;

  return `<svg viewBox="0 0 360 176" data-mount-hd="1" xmlns="http://www.w3.org/2000/svg" style="font-family: ${FONT_SANS};">
  <defs>
    ${mk('blue', '#2563eb')}
    ${mk('cyan', '#0284c7')}
    ${mk('red', '#dc2626')}
    ${mk('amber', '#d97706')}
    ${mk('green', '#059669')}
    ${mk('purple', '#7c3aed')}
    ${mk('slate', '#475569')}
    ${defs}
  </defs>
  <rect x="1.5" y="1.5" width="357" height="173" rx="8" fill="#ffffff" stroke="#d5dde8" stroke-width="1"/>
  <path d="M2,9.5 Q2,2 9.5,2 L350.5,2 Q358,2 358,9.5 L358,23 L2,23 Z" fill="${headerBg}"/>
  <line x1="2" y1="23" x2="358" y2="23" stroke="#e2e8f0" stroke-width="0.9"/>
  <rect x="8" y="5.5" width="${badgeW}" height="13.5" rx="3.5" fill="${accent}"/>
  <text x="${badgeCx}" y="15" text-anchor="middle" font-size="7.8" font-weight="800" fill="#ffffff" style="font-family:${FONT_MONO};">${code}</text>
  <text x="${titleX}" y="15.2" font-size="8.1" font-weight="700" fill="#0f172a">${title}</text>
  <rect x="${tagX}" y="5.5" width="${tagW}" height="13.5" rx="3.5" fill="#ffffff" stroke="${accent}" stroke-width="0.8" opacity="0.95"/>
  <text x="${tagCx}" y="14.8" text-anchor="middle" font-size="6.9" font-weight="700" fill="${accent}">${viewTag}</text>
  ${body}
  <line x1="10" y1="152" x2="350" y2="152" stroke="#e2e8f0" stroke-width="0.85"/>
  <text x="180" y="166" text-anchor="middle" font-size="7.5" font-weight="600" fill="#1e293b">${caption}</text>
</svg>`;
}

/** Crisp pill label with generous padding */
export function pill(
  cx: number,
  cy: number,
  w: number,
  h: number,
  label: string,
  fill: string,
  stroke: string,
  textColor: string,
  fontSize = 7.0
): string {
  const x = cx - w / 2;
  const y = cy - h / 2;
  return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w}" height="${h}" rx="3.5" fill="${fill}" stroke="${stroke}" stroke-width="0.85"/>
  <text x="${cx}" y="${(cy + fontSize * 0.36).toFixed(1)}" text-anchor="middle" font-size="${fontSize}" font-weight="700" fill="${textColor}">${label}</text>`;
}
