/**
 * Buchigire Guard v1 (bg) — Industrial Safety Scanners
 * Implements:
 *   BG-14 Conflict-marker / hygiene verification
 *   BG-15 Worker vs Integrator Scope Policy Guard
 *   BG-17 Diff Sanity & Catastrophic Shrinkage Detector
 *   BG-18 Zero-Leak Secret & Credential Exfiltration Blocker
 *   BG-29 Large-File & Binary Bloat Guard
 */

import fs from 'node:fs';
import path from 'node:path';
import { matchGlob, runGit } from './git_plumbing.mjs';

const BINARY_EXTS = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.pdf', '.zip', '.gz',
  '.tar', '.wasm', '.ttf', '.woff', '.woff2', '.mp4', '.mp3', '.apk', '.jar',
  '.bgbundle', '.spbin', '.glb', '.gltf', '.bin',
]);

// Scanner skips self-definitions to avoid false-positive self-triggering
const SCANNER_SELF_PATHS = new Set([
  'scripts/buchigire_guard/safety_scanners.mjs',
  'scripts/buchigire_guard/selftest.mjs',
]);

// High-confidence secret signatures (assembled via parts so scanner file doesn't trigger naive greps)
const SECRET_RULES = [
  { id: 'GITHUB_CLASSIC_PAT', rx: new RegExp('gh' + 'p_[A-Za-z0-9]{20,}') },
  { id: 'GITHUB_OAUTH_TOKEN', rx: new RegExp('gh' + 'o_[A-Za-z0-9]{20,}') },
  { id: 'GITHUB_FINE_PAT', rx: new RegExp('github_' + 'pat_[A-Za-z0-9_]{30,}') },
  { id: 'AWS_ACCESS_KEY', rx: new RegExp('AK' + 'IA[0-9A-Z]{16}') },
  { id: 'PEM_PRIVATE_KEY', rx: new RegExp('-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRI' + 'VATE KEY-----') },
  { id: 'OPENAI_OR_STRIPE_KEY', rx: new RegExp('\\b(?:sk-proj-|sk-live-|sk_live_)[A-Za-z0-9_-]{20,}') },
  { id: 'GOOGLE_API_KEY', rx: new RegExp('AI' + 'za[0-9A-Za-z_-]{35}') },
  { id: 'SLACK_TOKEN', rx: new RegExp('xox' + '[baprs]-[0-9A-Za-z-]{16,}') },
  { id: 'ANTIGRAVITY_RAW_TOKEN_DUMP', rx: /\/opt\/antigravity\/tokens\/[A-Za-z0-9_.-]+.*(?:bearer|token|secret)/i },
];

// Combined fast-reject regexes (mathematically equivalent superset of SECRET_RULES; none span newlines)
const FAST_SECRET_RX = new RegExp(
  'gh' + 'p_[A-Za-z0-9]{20,}' +
  '|gh' + 'o_[A-Za-z0-9]{20,}' +
  '|github_' + 'pat_[A-Za-z0-9_]{30,}' +
  '|AK' + 'IA[0-9A-Z]{16}' +
  '|-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRI' + 'VATE KEY-----' +
  '|\\b(?:sk-proj-|sk-live-|sk_live_)[A-Za-z0-9_-]{20,}' +
  '|AI' + 'za[0-9A-Za-z_-]{35}' +
  '|xox' + '[baprs]-[0-9A-Za-z-]{16,}'
);
const FAST_ANTIGRAVITY_RX = /\/opt\/antigravity\/tokens\/[A-Za-z0-9_.-]+.*(?:bearer|token|secret)/i;

const CONFLICT_MARKER_RX = /^(<{7}\s|={7}$|>{7}\s)/;
const CONFLICT_MARKER_MULTILINE_RX = /^(?:<{7}\s|={7}$|>{7}\s)/m;

function isLikelyText(relPath, buf) {
  const ext = path.extname(relPath).toLowerCase();
  if (BINARY_EXTS.has(ext)) return false;
  const probeLen = Math.min(buf.length, 4096);
  for (let i = 0; i < probeLen; i++) {
    if (buf[i] === 0) return false;
  }
  return true;
}

/**
 * BG-18: Zero-Leak Secret & Credential Exfiltration Blocker.
 * Hard-aborts any vault push or commit if real credentials are found.
 */
export function scanSecrets(repoRoot, files) {
  const findings = [];
  for (const item of files) {
    const isObj = typeof item !== 'string';
    const rel = isObj ? item.path : item;
    if (SCANNER_SELF_PATHS.has(rel)) continue;
    const abs = isObj ? item.absPath : path.join(repoRoot, item);

    // Flag raw .env files (except .env.example / .env.sample) before reading contents
    let size;
    if (isObj && typeof item.size === 'number') {
      if (item.isSymlink) continue;
      size = item.size;
    } else {
      let st;
      try {
        st = fs.lstatSync(abs);
      } catch {
        continue;
      }
      if (!st.isFile()) continue;
      size = st.size;
    }
    if (size === 0 || size > 4 * 1024 * 1024) continue;

    const base = path.basename(rel);
    if ((base === '.env' || (base.startsWith('.env.') && !base.endsWith('.example') && !base.endsWith('.sample')))) {
      findings.push({
        rule: 'DOTENV_SECRET_FILE',
        path: rel,
        line: 1,
        preview: 'Unignored .env file detected',
      });
      continue;
    }

    if (BINARY_EXTS.has(path.extname(rel).toLowerCase())) continue;

    let buf;
    try {
      buf = fs.readFileSync(abs);
    } catch {
      continue;
    }
    if (!isLikelyText(rel, buf)) continue;
    const text = buf.toString('utf8');
    // Fast-reject: mathematically impossible for any line to match if whole-buffer superset regex misses
    if (!FAST_SECRET_RX.test(text) && !FAST_ANTIGRAVITY_RX.test(text)) continue;

    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('bg-ignore-secret')) continue;
      for (const rule of SECRET_RULES) {
        if (rule.rx.test(line)) {
          findings.push({
            rule: rule.id,
            path: rel,
            line: i + 1,
            preview: '[REDACTED SECRET MATCH]',
          });
          break;
        }
      }
      if (findings.length >= 25) return findings;
    }
  }
  return findings;
}

/**
 * BG-14: Scan dirty text files for unresolved Git conflict markers.
 */
export function scanConflictMarkers(repoRoot, relPaths) {
  const findings = [];
  for (const rel of relPaths) {
    if (SCANNER_SELF_PATHS.has(rel)) continue;
    if (BINARY_EXTS.has(path.extname(rel).toLowerCase())) continue;
    const abs = path.join(repoRoot, rel);
    let st;
    try {
      st = fs.lstatSync(abs);
    } catch {
      continue;
    }
    if (!st.isFile() || st.size > 8 * 1024 * 1024) continue;
    const buf = fs.readFileSync(abs);
    if (!isLikelyText(rel, buf)) continue;
    const text = buf.toString('utf8');
    if (!CONFLICT_MARKER_MULTILINE_RX.test(text)) continue;
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (CONFLICT_MARKER_RX.test(lines[i])) {
        findings.push({ path: rel, line: i + 1, marker: lines[i].slice(0, 24) });
        if (findings.length >= 25) return findings;
      }
    }
  }
  return findings;
}

/**
 * BG-29 & BG-14: Detect stray root clutter, oversized files, and 0-byte source files.
 */
export function scanHygieneAndBloat(repoRoot, relPaths, skippedLarge, cfg) {
  const rootClutter = [];
  const zeroByteFiles = [];
  const forbidGlobs = cfg.forbidRootGlobs || [];
  const sourceExts = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.css', '.html', '.py', '.go', '.rs']);

  for (const rel of relPaths) {
    if (forbidGlobs.some((pat) => matchGlob(rel, pat))) {
      rootClutter.push(rel);
    }
    const abs = path.join(repoRoot, rel);
    try {
      const st = fs.lstatSync(abs);
      if (st.isFile() && st.size === 0 && sourceExts.has(path.extname(rel).toLowerCase())) {
        zeroByteFiles.push(rel);
      }
    } catch {
      // ignore
    }
  }

  return {
    rootClutter,
    zeroByteFiles,
    oversizedFiles: skippedLarge || [],
  };
}

/**
 * BG-17: Catastrophic shrinkage & JSON part-count regression detector.
 */
export function scanShrinkage(repoRoot, modifiedPaths, headSha) {
  const warnings = [];
  if (!headSha) return warnings;

  for (const rel of modifiedPaths) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) continue;
    let curBuf;
    try {
      const st = fs.lstatSync(abs);
      if (!st.isFile() || st.size > 15 * 1024 * 1024) continue;
      curBuf = fs.readFileSync(abs);
    } catch {
      continue;
    }

    const oldRes = runGit(['show', `${headSha}:${rel}`], { cwd: repoRoot, buffer: true });
    if (oldRes.status !== 0) continue;
    const oldBuf = oldRes.stdout;
    if (oldBuf.length >= 1024 && curBuf.length < oldBuf.length * 0.5) {
      warnings.push({
        type: 'SEVERE_SHRINKAGE',
        path: rel,
        beforeBytes: oldBuf.length,
        afterBytes: curBuf.length,
        ratio: Number((curBuf.length / oldBuf.length).toFixed(3)),
      });
    }

    // Specific JSON part-array regression check (works for any JSON containing `parts: [...]`)
    if (rel.endsWith('.json')) {
      try {
        const oldJson = JSON.parse(oldBuf.toString('utf8'));
        const curJson = JSON.parse(curBuf.toString('utf8'));
        if (Array.isArray(oldJson.parts) && Array.isArray(curJson.parts) && curJson.parts.length < oldJson.parts.length) {
          warnings.push({
            type: 'JSON_PARTS_SHRANK',
            path: rel,
            beforeCount: oldJson.parts.length,
            afterCount: curJson.parts.length,
          });
        }
      } catch {
        // invalid JSON caught separately by JSON syntax check
      }
    }
  }
  return warnings;
}

/**
 * BG-15: Evaluate modified/untracked files against worker vs integrator scope policy.
 */
export function evaluateScopePolicy(changedPaths, cfg, policyName = 'default') {
  const policy = (cfg.policies && cfg.policies[policyName]) || { protectedPaths: [], checks: [] };
  const protectedGlobs = policy.protectedPaths || [];
  const violations = [];
  for (const rel of changedPaths) {
    for (const pat of protectedGlobs) {
      if (matchGlob(rel, pat)) {
        violations.push({ path: rel, rule: pat });
        break;
      }
    }
  }
  return {
    policyName,
    protectedGlobs,
    checks: policy.checks || [],
    violations,
  };
}
