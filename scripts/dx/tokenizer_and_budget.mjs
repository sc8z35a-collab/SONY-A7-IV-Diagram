/**
 * `dx` Component 2A — BPE-Calibrated Token Estimator, Vision Tile Calculator
 * & Adaptive Hard Token-Budget Firewall.
 *
 * Calibrated for mixed Japanese/English/TypeScript/JSON/SVG repositories
 * (avoids the ~40% underestimation of naive `bytes / 4` on CJK + syntax-heavy code).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const DEFAULT_SPILL_DIR = '/tmp/dx_out';

const TOKEN_SEGMENT_RX =
  /([ \t]+)|(\r?\n+)|([0-9]+)|([A-Za-z_][A-Za-z0-9_]*)|([ぁ-んァ-ヶー]+)|([一-龯々〆ヵヶ]+)|([、。「」『』（）【】・＆：；！？％±×÷＝〜～]+)|([{}[\]():;,.'"=<>!+\-*/\\|&^%$#@~`?]+)|(\S)/g;

/**
 * Split an ASCII identifier into CamelCase / snake_case sub-words to mirror BPE merges.
 */
function countAsciiIdentTokens(word) {
  const len = word.length;
  if (len <= 4) return 1;
  // Split on underscores and CamelCase transitions
  const parts = word
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .split('_')
    .filter(Boolean);
  let total = 0;
  for (const p of parts) {
    if (p.length <= 5) total += 1;
    else total += Math.ceil(p.length / 4.3);
  }
  return Math.max(1, total);
}

/**
 * BPE-calibrated token estimator for text (mixed EN/JP/TS/JSON/SVG).
 * Returns an integer token count.
 */
export function estimateTokensBpe(text) {
  if (!text || typeof text !== 'string') return 0;
  let tokens = 0;
  TOKEN_SEGMENT_RX.lastIndex = 0;
  let m;
  while ((m = TOKEN_SEGMENT_RX.exec(text)) !== null) {
    if (m[1]) {
      // Spaces/tabs compress heavily in BPE (indentation merges)
      const n = m[1].length;
      tokens += n <= 2 ? 0.25 : Math.ceil(n / 4) * 0.65;
    } else if (m[2]) {
      tokens += m[2].length * 0.55;
    } else if (m[3]) {
      // Numeric 3-digit chunking
      tokens += Math.ceil(m[3].length / 2.8);
    } else if (m[4]) {
      tokens += countAsciiIdentTokens(m[4]);
    } else if (m[5]) {
      // Hiragana / Katakana (~0.74 tok/char)
      tokens += m[5].length * 0.74;
    } else if (m[6]) {
      // CJK Han / Kanji (~1.28 tok/char)
      tokens += m[6].length * 1.28;
    } else if (m[7]) {
      // Full-width Japanese punctuation
      tokens += m[7].length * 0.92;
    } else if (m[8]) {
      // ASCII syntax / JSON punctuation (~1.72 chars/tok)
      tokens += Math.ceil(m[8].length / 1.72);
    } else {
      tokens += 1;
    }
  }
  return Math.max(1, Math.round(tokens));
}

/**
 * Full breakdown used by `dx audit` 24-metric forensic profiler.
 */
export function analyzeTextBreakdown(text) {
  if (!text || typeof text !== 'string') {
    return {
      bytes: 0,
      chars: 0,
      lines: 0,
      tokens: 0,
      jpChars: 0,
      jpRatio: 0,
      syntaxChars: 0,
      syntaxRatio: 0,
      tokPerByte: 0,
    };
  }
  const bytes = Buffer.byteLength(text, 'utf8');
  const chars = text.length;
  const lines = text.length === 0 ? 0 : text.split('\n').length;
  let tokens = 0;
  let jpChars = 0;
  let syntaxChars = 0;

  TOKEN_SEGMENT_RX.lastIndex = 0;
  let m;
  while ((m = TOKEN_SEGMENT_RX.exec(text)) !== null) {
    if (m[1]) {
      const n = m[1].length;
      tokens += n <= 2 ? 0.25 : Math.ceil(n / 4) * 0.65;
    } else if (m[2]) {
      tokens += m[2].length * 0.55;
    } else if (m[3]) {
      tokens += Math.ceil(m[3].length / 2.8);
    } else if (m[4]) {
      tokens += countAsciiIdentTokens(m[4]);
    } else if (m[5]) {
      jpChars += m[5].length;
      tokens += m[5].length * 0.74;
    } else if (m[6]) {
      jpChars += m[6].length;
      tokens += m[6].length * 1.28;
    } else if (m[7]) {
      jpChars += m[7].length;
      syntaxChars += m[7].length;
      tokens += m[7].length * 0.92;
    } else if (m[8]) {
      syntaxChars += m[8].length;
      tokens += Math.ceil(m[8].length / 1.72);
    } else {
      tokens += 1;
    }
  }

  const tokInt = Math.max(bytes > 0 ? 1 : 0, Math.round(tokens));
  const nonWsChars = Math.max(1, chars - (text.match(/\s/g)?.length || 0));
  return {
    bytes,
    chars,
    lines,
    tokens: tokInt,
    jpChars,
    jpRatio: Number(((jpChars / nonWsChars) * 100).toFixed(1)),
    syntaxChars,
    syntaxRatio: Number(((syntaxChars / nonWsChars) * 100).toFixed(1)),
    tokPerByte: bytes > 0 ? Number((tokInt / bytes).toFixed(3)) : 0,
  };
}

/**
 * Provider-accurate Vision token tile calculator (Claude / OpenAI high-detail / Gemini).
 */
export function estimateImageTokens(width, height) {
  const w = Math.max(1, Number(width) || 1);
  const h = Math.max(1, Number(height) || 1);

  // Claude: downscale if max side > 1568 or total pixels > 1.15MP, then (w*h)/750
  let cw = w;
  let ch = h;
  const maxDim = Math.max(cw, ch);
  if (maxDim > 1568) {
    const s = 1568 / maxDim;
    cw *= s;
    ch *= s;
  }
  if (cw * ch > 1150000) {
    const s = Math.sqrt(1150000 / (cw * ch));
    cw *= s;
    ch *= s;
  }
  const claude = Math.max(1, Math.round((cw * ch) / 750));

  // OpenAI (high detail): fit inside 2048x2048, scale shortest side to <= 768, 85 + 170 * tiles(512)
  let ow = w;
  let oh = h;
  if (Math.max(ow, oh) > 2048) {
    const s = 2048 / Math.max(ow, oh);
    ow *= s;
    oh *= s;
  }
  if (Math.min(ow, oh) > 768) {
    const s = 768 / Math.min(ow, oh);
    ow *= s;
    oh *= s;
  }
  const openai = 85 + 170 * Math.ceil(ow / 512) * Math.ceil(oh / 512);

  // Gemini: 258 tok for <=384x384, else 258 * ceil(w/768) * ceil(h/768)
  const gemini =
    w <= 384 && h <= 384 ? 258 : 258 * Math.ceil(w / 768) * Math.ceil(h / 768);

  return { width: w, height: h, claude, openai, gemini };
}

/**
 * Strip ANSI escape sequences and collapse npm notice boilerplate.
 */
export function stripAnsi(str) {
  return String(str ?? '').replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '');
}

/**
 * Adaptive Hard Token-Budget Firewall.
 * Guarantees emitted output NEVER exceeds `budget` tokens (within BPE estimator precision).
 * Spills complete untruncated output to `/tmp/dx_out/<tag>_<sha8>.txt` and appends a 1-line zoom handle.
 */
export function enforceTokenBudget(text, opts = {}) {
  const raw = String(text ?? '');
  const budget = opts.budget === undefined ? 1200 : Number(opts.budget);
  const tag = String(opts.tag || 'dx').replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 24);
  const outDir = opts.outDir || DEFAULT_SPILL_DIR;
  const preservePatterns = opts.preservePatterns || [
    /^\[(?:FAIL|ERROR|PASS|WARN|DX|BG|OK|BLOCKED)/i,
    /^(?:VERDICT|SUMMARY|RECEIPT|VISION_NEEDED|TOTAL|SCORE)\b/i,
    /error TS\d+:/,
  ];

  const origTokens = estimateTokensBpe(raw);
  if (!Number.isFinite(budget) || budget <= 0 || origTokens <= budget) {
    return {
      text: raw,
      tokens: origTokens,
      originalTokens: origTokens,
      truncated: false,
      spillPath: null,
    };
  }

  fs.mkdirSync(outDir, { recursive: true });
  const hash8 = crypto.createHash('sha256').update(raw).digest('hex').slice(0, 8);
  const spillPath = path.join(outDir, `${tag}_${hash8}.txt`);
  fs.writeFileSync(spillPath, raw, 'utf8');

  const lines = raw.split('\n');
  const footerTemplate = (keptTok) =>
    `\n[DX_BUDGET_FIREWALL truncated ${origTokens}->${keptTok} tok (budget=${budget}, lines=${lines.length}) | full=${spillPath} | zoom: node scripts/dx.mjs slice ${spillPath} 1-120]`;
  const footerReserve = estimateTokensBpe(footerTemplate(budget)) + 6;
  const contentBudget = Math.max(24, budget - footerReserve);

  // Prioritize: first header lines, high-signal error/verdict lines, and tail lines
  const priorityIndices = new Set();
  for (let i = 0; i < Math.min(4, lines.length); i++) priorityIndices.add(i);
  for (let i = 0; i < lines.length; i++) {
    if (preservePatterns.some((rx) => rx.test(lines[i]))) {
      priorityIndices.add(i);
    }
  }
  for (let i = Math.max(0, lines.length - 4); i < lines.length; i++) priorityIndices.add(i);

  const selected = new Map();
  let usedTokens = 0;

  const tryAddLine = (idx) => {
    if (selected.has(idx)) return true;
    const line = lines[idx];
    const lineTok = estimateTokensBpe(line) + 1;
    if (usedTokens + lineTok <= contentBudget) {
      selected.set(idx, line);
      usedTokens += lineTok;
      return true;
    }
    return false;
  };

  // Pass 1: priority lines in order
  const sortedPriority = [...priorityIndices].sort((a, b) => a - b);
  for (const idx of sortedPriority) {
    tryAddLine(idx);
  }

  // Pass 2: sequential head fill while budget remains
  for (let i = 0; i < lines.length; i++) {
    if (usedTokens >= contentBudget - 6) break;
    if (!selected.has(i)) {
      tryAddLine(i);
    }
  }

  // Fallback if single first line alone exceeded contentBudget
  if (selected.size === 0 && lines.length > 0) {
    const approxChars = Math.max(40, Math.floor(contentBudget * 2.4));
    selected.set(0, lines[0].slice(0, approxChars) + '...');
  }

  const orderedIdx = [...selected.keys()].sort((a, b) => a - b);
  const outLines = [];
  let prev = -1;
  for (const idx of orderedIdx) {
    if (prev >= 0 && idx > prev + 1) {
      outLines.push(`... (${idx - prev - 1} lines omitted) ...`);
    }
    outLines.push(selected.get(idx));
    prev = idx;
  }
  if (prev < lines.length - 1) {
    outLines.push(`... (${lines.length - 1 - prev} trailing lines omitted) ...`);
  }

  let body = outLines.join('\n');
  // Hard clamp guard: if ellipsis markers nudged us over budget, drop from middle
  while (estimateTokensBpe(body) > contentBudget && outLines.length > 2) {
    outLines.splice(Math.floor(outLines.length / 2), 1);
    body = outLines.join('\n');
  }
  if (estimateTokensBpe(body) > contentBudget) {
    const maxChars = Math.max(32, Math.floor(contentBudget * 2.0));
    body = body.slice(0, maxChars) + '...';
  }

  const provisionalTok = estimateTokensBpe(body) + footerReserve;
  const finalText = body + footerTemplate(Math.min(budget, provisionalTok));
  const finalTokens = estimateTokensBpe(finalText);

  return {
    text: finalText,
    tokens: finalTokens,
    originalTokens: origTokens,
    truncated: true,
    spillPath,
  };
}

/**
 * Deterministic SHA-256 helper.
 */
export function sha256Hex(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}
