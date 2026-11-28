/**
 * FLOW V1 OS — 12-Layer Defense-in-Depth Security Fortress (`SEC-01`..`SEC-11`)
 * (SEC-12 is the 30-attack Red-Team chaos oracle in `security_selftest.mjs`.)
 *
 * Pure Node.js 22 (zero external runtime dependencies = minimal supply-chain attack surface).
 * Exit contract: EXIT_OK (0) on 11/11 clean pass -> SEC-RECEIPT issued;
 *                EXIT_SECURITY_BLOCKED (6) on ANY security violation.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  EXIT_OK,
  EXIT_SECURITY_BLOCKED,
  atomicWriteSync,
  getGitMeta,
  matchAnyGlob,
} from './kernel_config.mjs';
import { verifyAuditLedger } from './audit_ledger.mjs';
import { computeKernelSeal, computeTreeFingerprint } from './receipt_chain.mjs';
import { scrubEnv } from './solver_sandbox.mjs';
import { verifyEd25519Attestation } from './crypto_attestation.mjs';

const BINARY_EXTS = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.pdf', '.zip', '.gz',
  '.tar', '.wasm', '.ttf', '.woff', '.woff2', '.mp4', '.mp3', '.apk', '.jar',
  '.bgbundle', '.spbin', '.glb', '.gltf', '.bin', '.o', '.so', '.a',
]);

// Scanner definitions themselves are excluded from pattern self-matching
const SCANNER_SELF_PATHS = new Set([
  'scripts/flow_os/security_fortress.mjs',
  'scripts/flow_os/security_selftest.mjs',
  'scripts/buchigire_guard/safety_scanners.mjs',
  'scripts/buchigire_guard/selftest.mjs',
]);

// ---------------------------------------------------------------------------
// SEC-01: Dual-Engine Secret + Shannon Entropy Exfiltration Blocker
// ---------------------------------------------------------------------------
const SECRET_RULES = [
  { id: 'GH_CLASSIC_PAT', rx: new RegExp('gh' + 'p_[A-Za-z0-9]{20,}') },
  { id: 'GH_OAUTH_TOK', rx: new RegExp('gh' + 'o_[A-Za-z0-9]{20,}') },
  { id: 'GH_FINE_PAT', rx: new RegExp('github_' + 'pat_[A-Za-z0-9_]{30,}') },
  { id: 'AWS_ACCESS_KEY', rx: new RegExp('AK' + 'IA[0-9A-Z]{16}') },
  { id: 'PEM_PRIVATE_KEY', rx: new RegExp('-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRI' + 'VATE KEY-----') },
  { id: 'OPENAI_STRIPE_KEY', rx: new RegExp('\\b(?:sk-proj-|sk-live-|sk_live_)[A-Za-z0-9_-]{20,}') },
  { id: 'GOOGLE_API_KEY', rx: new RegExp('AI' + 'za[0-9A-Za-z_-]{35}') },
  { id: 'SLACK_TOKEN', rx: new RegExp('xox' + '[baprs]-[0-9A-Za-z-]{16,}') },
  { id: 'JWT_TOKEN', rx: new RegExp('\\bey' + 'J[A-Za-z0-9_-]{16,}\\.ey' + 'J[A-Za-z0-9_-]{16,}\\.[A-Za-z0-9_-]{16,}\\b') },
  { id: 'BASIC_AUTH_URL', rx: /https?:\/\/[A-Za-z0-9_.-]{2,}:[A-Za-z0-9_@!#$%^&*.-]{6,}@[A-Za-z0-9.-]+/ },
  { id: 'VM_TOKEN_DUMP', rx: /\/opt\/antigravity\/tokens\/[A-Za-z0-9_.-]+/i },
];

const HIGH_RISK_ASSIGN_RX = /\b(?:api[_-]?key|secret[_-]?key|access[_-]?token|auth[_-]?token|private[_-]?key|client[_-]?secret|password|passwd|bearer)\b\s*[:=]\s*['"`]([A-Za-z0-9+/=_!@#$%^&*.-]{24,})['"`]/i;

export function shannonEntropy(str) {
  if (!str || str.length === 0) return 0;
  const freq = new Map();
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }
  let ent = 0;
  const n = str.length;
  for (const c of freq.values()) {
    const p = c / n;
    ent -= p * Math.log2(p);
  }
  return ent;
}

export function redactSecrets(text) {
  let out = String(text ?? '');
  for (const rule of SECRET_RULES) {
    const gRx = new RegExp(rule.rx.source, rule.rx.flags.includes('g') ? rule.rx.flags : `${rule.rx.flags}g`);
    out = out.replace(gRx, `[REDACTED:${rule.id}]`);
  }
  return out;
}

function isLikelyText(relPath, buf) {
  if (BINARY_EXTS.has(path.extname(relPath).toLowerCase())) return false;
  const lim = Math.min(buf.length, 4096);
  for (let i = 0; i < lim; i++) {
    if (buf[i] === 0) return false;
  }
  return true;
}

export function runSec01Secrets(repoRoot, files, cfg) {
  const findings = [];
  const entLim = cfg.security?.entropyThreshold ?? 4.65;
  const entMinLen = cfg.security?.entropyMinLen ?? 28;

  for (const rel of files) {
    if (SCANNER_SELF_PATHS.has(rel)) continue;
    const base = path.basename(rel);
    if (base === '.env' || (base.startsWith('.env.') && !base.endsWith('.example') && !base.endsWith('.sample'))) {
      findings.push({ layer: 'SEC-01', rule: 'DOTENV_EXPOSURE', file: rel, line: 1, msg: 'Unignored .env file' });
      continue;
    }
    const abs = path.join(repoRoot, rel);
    let st;
    try {
      st = fs.lstatSync(abs);
    } catch {
      continue;
    }
    if (!st.isFile() || st.size === 0 || st.size > 4 * 1024 * 1024) continue;
    if (BINARY_EXTS.has(path.extname(rel).toLowerCase())) continue;

    let buf;
    try {
      buf = fs.readFileSync(abs);
    } catch {
      continue;
    }
    if (!isLikelyText(rel, buf)) continue;
    const lines = buf.toString('utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let hit = false;
      for (const rule of SECRET_RULES) {
        if (rule.rx.test(line)) {
          findings.push({ layer: 'SEC-01', rule: rule.id, file: rel, line: i + 1, msg: '[REDACTED SECRET]' });
          hit = true;
          break;
        }
      }
      if (!hit) {
        const m = line.match(HIGH_RISK_ASSIGN_RX);
        if (m && m[1].length >= entMinLen) {
          const ent = shannonEntropy(m[1]);
          if (ent >= entLim && !/^[a-f0-9]{32,64}$/i.test(m[1])) {
            findings.push({
              layer: 'SEC-01',
              rule: 'HIGH_ENTROPY_SECRET',
              file: rel,
              line: i + 1,
              msg: `entropy=${ent.toFixed(2)} len=${m[1].length}`,
            });
          }
        }
      }
      if (findings.length >= 25) return findings;
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// SEC-03: Prompt-Injection, Trojan Source Bidi, Zero-Width Stego & Receipt Spoof Firewall
// ---------------------------------------------------------------------------
// CVE-2021-42574 Trojan Source bidirectional overrides
const BIDI_TROJAN_RX = /[\u202A-\u202E\u2066-\u2069]/;
// Zero-width steganography cluster (3+ consecutive zero-width chars or mid-file BOM)
const ZERO_WIDTH_CLUSTER_RX = /[\u200B-\u200F\u2060]{3,}/;
// ANSI terminal escape hijacking (OSC 52 clipboard / CSI cursor hijack inside source/data)
const ANSI_HIJACK_RX = /\x1b\](?:52|0|2);|\x1b\[[0-9;]*[ABCDHJKh]/;
// Indirect prompt-injection payloads
const PROMPT_INJECTION_RXS = [
  { id: 'PI_IGNORE_INSTR', rx: /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+(?:instructions|directives|rules)/i },
  { id: 'PI_SYSTEM_OVERRIDE', rx: /disregard\s+(?:system\s+prompt|all\s+security|agents\.md)/i },
  { id: 'PI_BYPASS_EXAM', rx: /(?:skip|bypass|disable)\s+(?:the\s+last\s+exam|exam\s+v1(?:\.1)?|sec-0[1-9]|sec-1[0-3]|security\s+fortress|flow\s+security)/i },
  { id: 'PI_EXFIL_TOKENS', rx: /(?:cat|print|curl|exfiltrate|send)\s+[^\n]*\/opt\/antigravity\/tokens/i },
];
// Forged receipts & certificates embedded in code/data/PR payloads (covers TLX1, TLX11, V11-CERT, BG, FLOW, SEC)
const SPOOFED_RECEIPT_RX = new RegExp(
  '(?:TLX11?-RECEIPT|BG-RECEIPT|FLOW-RECEIPT|SEC-RECEIPT):[0-9a-f]{6,}:[A-Za-z0-9_.:/-]{4,}|V11-CERT:[A-Za-z0-9_-]+:[0-9a-f]{8,}:[0-9a-f]{6,}'
);

export function scanUntrustedText(text, sourceLabel = '<input>') {
  const findings = [];
  const lines = String(text ?? '').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (BIDI_TROJAN_RX.test(line)) {
      findings.push({ layer: 'SEC-03', rule: 'TROJAN_SOURCE_BIDI', file: sourceLabel, line: i + 1, msg: 'Bidi control override detected' });
    }
    if (ZERO_WIDTH_CLUSTER_RX.test(line)) {
      findings.push({ layer: 'SEC-03', rule: 'ZERO_WIDTH_STEGO', file: sourceLabel, line: i + 1, msg: 'Zero-width steganography cluster' });
    }
    if (ANSI_HIJACK_RX.test(line)) {
      findings.push({ layer: 'SEC-03', rule: 'ANSI_TERMINAL_HIJACK', file: sourceLabel, line: i + 1, msg: 'ANSI OSC/CSI hijack sequence' });
    }
    for (const p of PROMPT_INJECTION_RXS) {
      if (p.rx.test(line)) {
        findings.push({ layer: 'SEC-03', rule: p.id, file: sourceLabel, line: i + 1, msg: 'Prompt injection payload blocked' });
        break;
      }
    }
    if (SPOOFED_RECEIPT_RX.test(line)) {
      findings.push({ layer: 'SEC-03', rule: 'SPOOFED_RECEIPT_LITERAL', file: sourceLabel, line: i + 1, msg: 'Hardcoded/forged receipt or V11-CERT detected' });
    }
    if (findings.length >= 25) break;
  }
  return findings;
}

export function runSec03PromptAndUnicode(repoRoot, files) {
  const findings = [];
  for (const rel of files) {
    if (SCANNER_SELF_PATHS.has(rel)) continue;
    // Allow authentic generated/issued certificate artifacts (audited by SEC-13 cryptographic check instead)
    if (rel === 'src/units/v1_1_certificates.gen.ts' || rel.startsWith('verification/certificates/')) continue;
    const abs = path.join(repoRoot, rel);
    let st;
    try {
      st = fs.lstatSync(abs);
    } catch {
      continue;
    }
    if (!st.isFile() || st.size === 0 || st.size > 4 * 1024 * 1024) continue;
    if (BINARY_EXTS.has(path.extname(rel).toLowerCase())) continue;
    let buf;
    try {
      buf = fs.readFileSync(abs);
    } catch {
      continue;
    }
    if (!isLikelyText(rel, buf)) continue;
    const hits = scanUntrustedText(buf.toString('utf8'), rel);
    for (const h of hits) {
      findings.push(h);
      if (findings.length >= 25) return findings;
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// SEC-04: Command Execution Sandbox & Destructive-Op Interlock
// ---------------------------------------------------------------------------
const DANGEROUS_CMD_PATTERNS = [
  { id: 'DESTRUCTIVE_RM_ROOT', rx: /\brm\s+-[a-zA-Z]*r[a-zA-Z]*f[a-zA-Z]*\s+(?:\/(?:\s|$|\*)|~|\$HOME|\.git\b)/ },
  { id: 'FORCE_PUSH_PROTECTED', rx: /\bgit\s+push\b[^\n]*(?:--force|-f|--force-with-lease)[^\n]*\b(?:main|master)\b/ },
  { id: 'REMOTE_PIPE_SH', rx: /\b(?:curl|wget)\b[^\n|]*\|\s*(?:sudo\s+)?(?:ba)?sh\b/ },
  { id: 'CHMOD_WORLD_WRITABLE', rx: /\bchmod\s+(?:-R\s+)?0?777\b/ },
  { id: 'TOKEN_DIR_ACCESS', rx: /\/opt\/antigravity\/tokens/i },
  { id: 'SSH_KEY_ACCESS', rx: /~\/\.ssh\/|\/\.ssh\/id_/ },
  { id: 'GIT_HOOK_TAMPER', rx: /\.git\/hooks\// },
  { id: 'GIT_RESET_HARD', rx: /\bgit\s+reset\s+--hard\b/ },
];

export function validateCommandSafety(cmdOrArgv, opts = {}) {
  const joined = Array.isArray(cmdOrArgv) ? cmdOrArgv.join(' ') : String(cmdOrArgv ?? '');
  for (const p of DANGEROUS_CMD_PATTERNS) {
    if (opts.allowResetHard && p.id === 'GIT_RESET_HARD') continue;
    if (p.rx.test(joined)) {
      return { ok: false, layer: 'SEC-04', rule: p.id, msg: `Blocked dangerous command pattern (${p.id})` };
    }
  }
  return { ok: true };
}

/**
 * Hardened shell:false subprocess executor enforcing SEC-04 + env -i poison scrubbing.
 */
export function safeSpawnSync(bin, args = [], opts = {}) {
  const check = validateCommandSafety([bin, ...args], opts);
  if (!check.ok) {
    return {
      status: EXIT_SECURITY_BLOCKED,
      stdout: '',
      stderr: `SEC_BLOCK|${check.layer}|${check.rule}|${check.msg}`,
      blocked: true,
    };
  }
  const cleanEnv = scrubEnv(opts.env || {}, opts.env || process.env);
  return spawnSync(bin, args, {
    cwd: opts.cwd || process.cwd(),
    env: cleanEnv,
    encoding: 'utf8',
    shell: false,
    maxBuffer: opts.maxBuffer || 32 * 1024 * 1024,
    timeout: opts.timeoutMs || 600_000,
  });
}

// ---------------------------------------------------------------------------
// SEC-05: Capability-Based Path Confinement & Symlink Escape Guard
// ---------------------------------------------------------------------------
function resolveCanonicalSafe(targetPath) {
  const abs = path.resolve(targetPath);
  if (fs.existsSync(abs)) return fs.realpathSync(abs);
  // Walk up to deepest existing ancestor to catch symlinked parent dirs
  const parts = [];
  let cur = abs;
  while (!fs.existsSync(cur)) {
    const parent = path.dirname(cur);
    if (parent === cur) break;
    parts.unshift(path.basename(cur));
    cur = parent;
  }
  const realBase = fs.existsSync(cur) ? fs.realpathSync(cur) : cur;
  return path.join(realBase, ...parts);
}

const SENSITIVE_SYSTEM_PREFIXES = [
  '/opt/antigravity/tokens',
  '/etc/',
  '/root/',
];

export function assertPathConfined(targetPath, allowedRoots = []) {
  const canonical = resolveCanonicalSafe(targetPath);
  for (const pref of SENSITIVE_SYSTEM_PREFIXES) {
    if (canonical === pref.replace(/\/$/, '') || canonical.startsWith(pref)) {
      return { ok: false, layer: 'SEC-05', rule: 'SENSITIVE_PATH_BLOCK', path: canonical };
    }
  }
  if (canonical.includes('/.git/hooks/') || canonical.endsWith('/.git/hooks') || canonical.includes('/.ssh/')) {
    return { ok: false, layer: 'SEC-05', rule: 'FORBIDDEN_CONTROL_PATH', path: canonical };
  }
  const normAllowed = allowedRoots.map((r) => resolveCanonicalSafe(r));
  const inside = normAllowed.some((root) => canonical === root || canonical.startsWith(root + path.sep));
  if (!inside) {
    return { ok: false, layer: 'SEC-05', rule: 'PATH_ESCAPE_OR_SYMLINK', path: canonical };
  }
  return { ok: true, canonical };
}

export function runSec05SymlinkAudit(repoRoot, files) {
  const findings = [];
  const realRoot = fs.realpathSync(repoRoot);
  for (const rel of files) {
    const abs = path.join(repoRoot, rel);
    let lst;
    try {
      lst = fs.lstatSync(abs);
    } catch {
      continue;
    }
    if (lst.isSymbolicLink()) {
      const check = assertPathConfined(abs, [realRoot]);
      if (!check.ok) {
        findings.push({ layer: 'SEC-05', rule: check.rule, file: rel, line: 1, msg: `Symlink escapes repo -> ${check.path}` });
      }
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// SEC-06: Supply-Chain, Lockfile SHA-512 & Native Binary Integrity Shield
// ---------------------------------------------------------------------------
const SUSPICIOUS_SCRIPT_RX = /\b(?:curl|wget|nc|bash\s+-c|python3?\s+-c|eval\b|base64\s+-d)\b/i;

export function runSec06SupplyChain(repoRoot) {
  const findings = [];
  const pkgPath = path.join(repoRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      for (const hook of ['preinstall', 'install', 'postinstall', 'prepare']) {
        const val = pkg.scripts?.[hook];
        if (val && SUSPICIOUS_SCRIPT_RX.test(String(val))) {
          findings.push({ layer: 'SEC-06', rule: 'SUSPICIOUS_NPM_LIFECYCLE', file: 'package.json', line: 1, msg: `${hook} contains shell/network sink` });
        }
      }
    } catch {
      findings.push({ layer: 'SEC-06', rule: 'MALFORMED_PACKAGE_JSON', file: 'package.json', line: 1, msg: 'Cannot parse package.json' });
    }
  }

  const lockPath = path.join(repoRoot, 'package-lock.json');
  if (fs.existsSync(lockPath)) {
    try {
      const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
      const pkgs = lock.packages || {};
      let missingIntegrity = 0;
      for (const [k, v] of Object.entries(pkgs)) {
        if (!k || k === '' || v.link) continue;
        if (v.resolved && !v.integrity) {
          missingIntegrity++;
          if (missingIntegrity <= 3) {
            findings.push({ layer: 'SEC-06', rule: 'LOCKFILE_MISSING_INTEGRITY', file: 'package-lock.json', line: 1, msg: `Missing SHA integrity on ${k}` });
          }
        }
      }
    } catch {
      findings.push({ layer: 'SEC-06', rule: 'MALFORMED_LOCKFILE', file: 'package-lock.json', line: 1, msg: 'Cannot parse package-lock.json' });
    }
  }

  // Verify native harness binary manifest if EXAM native binaries exist (all non-dot binaries!)
  const binDir = path.join(repoRoot, 'scripts/exam/native/bin');
  if (fs.existsSync(binDir)) {
    const manifestPath = path.join(repoRoot, '.git/flow_os/native_bins_sha256.json');
    const bins = fs
      .readdirSync(binDir)
      .filter((f) => !f.startsWith('.') && fs.statSync(path.join(binDir, f)).isFile())
      .sort();
    const cur = {};
    for (const b of bins) {
      cur[b] = crypto.createHash('sha256').update(fs.readFileSync(path.join(binDir, b))).digest('hex');
    }
    if (fs.existsSync(manifestPath)) {
      try {
        const prev = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        for (const [b, h] of Object.entries(cur)) {
          if (!prev[b]) {
            findings.push({ layer: 'SEC-06', rule: 'NATIVE_BIN_UNTRACKED', file: `scripts/exam/native/bin/${b}`, line: 1, msg: 'Unregistered native binary detected (run exam setup to sync SHA manifest)' });
          } else if (prev[b] !== h) {
            findings.push({ layer: 'SEC-06', rule: 'NATIVE_BIN_DRIFT', file: `scripts/exam/native/bin/${b}`, line: 1, msg: 'Compiled binary SHA changed unexpectedly' });
          }
        }
      } catch {
        findings.push({ layer: 'SEC-06', rule: 'NATIVE_BIN_MANIFEST_CORRUPT', file: '.git/flow_os/native_bins_sha256.json', line: 1, msg: 'Corrupt native binary SHA manifest' });
      }
    } else if (bins.length > 0 && fs.existsSync(path.join(repoRoot, '.git'))) {
      atomicWriteSync(manifestPath, JSON.stringify(cur, null, 2) + '\n');
    }
  }

  // Audit .git/config for dangerous code-execution hooks (`fsmonitor`, `sshCommand`, external `hooksPath`, shell alias)
  const gitCfgPath = path.join(repoRoot, '.git', 'config');
  if (fs.existsSync(gitCfgPath)) {
    try {
      const gcfg = fs.readFileSync(gitCfgPath, 'utf8');
      const badKeys = [
        { rule: 'GIT_CONFIG_FSMONITOR', rx: /^\s*fsmonitor\s*=\s*(?!false\s*$)(\S.+)$/im },
        { rule: 'GIT_CONFIG_SSH_CMD', rx: /^\s*sshcommand\s*=\s*(\S.+)$/im },
        { rule: 'GIT_CONFIG_EXTERNAL_HOOKS', rx: /^\s*hookspath\s*=\s*(?!scripts\/flow_os\/git_hooks\s*$)(\S.+)$/im },
        { rule: 'GIT_CONFIG_SHELL_ALIAS', rx: /^\s*[a-z0-9_-]+\s*=\s*!\s*.*(?:curl|wget|bash|sh|python|nc|rm\s+-rf)/im },
      ];
      for (const bk of badKeys) {
        if (bk.rx.test(gcfg)) {
          findings.push({ layer: 'SEC-06', rule: bk.rule, file: '.git/config', line: 1, msg: `Dangerous git config directive (${bk.rule})` });
        }
      }
    } catch {
      // ignore unreadable git config
    }
  }

  return findings;
}

// ---------------------------------------------------------------------------
// SEC-07: Multi-Language Static Security Scanner (SAST for TS/JS/Python/C++)
// ---------------------------------------------------------------------------
const JS_SAST_RULES = [
  { id: 'JS_EVAL_SINK', rx: /\beval\s*\(/ },
  { id: 'JS_NEW_FUNCTION', rx: /\bnew\s+Function\s*\(/ },
  { id: 'JS_PROTO_POLLUTION', rx: /(?:\[['"]__proto__['"]\]|constructor\s*\.\s*prototype\s*\[)/ },
  { id: 'JS_EXEC_TEMPLATE', rx: /\bexec(?:Sync)?\s*\(\s*`[^`]*\$\{/ },
];
const PY_SAST_RULES = [
  { id: 'PY_PICKLE_LOADS', rx: /\bpickle\.loads?\s*\(/ },
  { id: 'PY_YAML_UNSAFE', rx: /\byaml\.load\s*\([^)]*\)(?!.*SafeLoader)/ },
  { id: 'PY_SUBPROC_SHELL_TRUE', rx: /\bsubprocess\.(?:run|Popen|call|check_output|check_call)\s*\([^\n]*shell\s*=\s*True/ },
  { id: 'PY_EVAL_SINK', rx: /\beval\s*\(/ },
];

export function runSec07Sast(repoRoot, files) {
  const findings = [];
  for (const rel of files) {
    if (SCANNER_SELF_PATHS.has(rel)) continue;
    const ext = path.extname(rel).toLowerCase();
    let rules = null;
    if (ext === '.ts' || ext === '.tsx' || ext === '.js' || ext === '.mjs' || ext === '.cjs') rules = JS_SAST_RULES;
    else if (ext === '.py') rules = PY_SAST_RULES;
    else continue;

    const abs = path.join(repoRoot, rel);
    let st;
    try {
      st = fs.lstatSync(abs);
    } catch {
      continue;
    }
    if (!st.isFile() || st.size > 2 * 1024 * 1024) continue;
    const lines = fs.readFileSync(abs, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('#')) continue;
      for (const r of rules) {
        if (r.rx.test(line)) {
          findings.push({ layer: 'SEC-07', rule: r.id, file: rel, line: i + 1, msg: `Dangerous sink ${r.id}` });
          break;
        }
      }
      if (findings.length >= 25) return findings;
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// SEC-08: Anti-Cheat, Salami Cumulative-Drift Guard & Core Immutable Protection
// ---------------------------------------------------------------------------
export function validateHealProposal(proposal, cfg) {
  const lim = cfg.security?.healLimits || { maxShiftMm: 3.0, maxChassisShiftMm: 0.6, maxVolumeDeltaPct: 5.0, forbidPartDeletion: true };
  const violations = [];
  if (lim.forbidPartDeletion && Number(proposal.deletedParts || 0) > 0) {
    violations.push({ layer: 'SEC-08', rule: 'FORBID_PART_DELETION', msg: `Attempted to delete ${proposal.deletedParts} part(s)` });
  }
  for (const p of proposal.patches || []) {
    const dx = Number(p.delta?.[0] || 0);
    const dy = Number(p.delta?.[1] || 0);
    const dz = Number(p.delta?.[2] || 0);
    const mag = Math.hypot(dx, dy, dz);
    const cap = p.isChassis ? lim.maxChassisShiftMm : lim.maxShiftMm;
    if (mag > cap + 1e-6) {
      violations.push({ layer: 'SEC-08', rule: 'EXCEED_SHIFT_LIMIT', part: p.id, msg: `shift=${mag.toFixed(3)}mm > ${cap}mm` });
    }
    const volPct = Math.abs(Number(p.volumeDeltaPct || 0));
    if (volPct > lim.maxVolumeDeltaPct + 1e-6) {
      violations.push({ layer: 'SEC-08', rule: 'EXCEED_VOLUME_SHRINK', part: p.id, msg: `volDelta=${volPct.toFixed(2)}% > ${lim.maxVolumeDeltaPct}%` });
    }
  }
  return { ok: violations.length === 0, violations };
}

/**
 * Salami-Attack Guard: compares current part positions/volumes against the immutable unit baseline
 * (not just single-step delta vs HEAD!) so sequential small edits cannot accumulate past limits.
 */
export function validateCumulativeDrift(baselineParts = [], currentParts = [], cfg = {}) {
  const lim = cfg.security?.healLimits || { maxShiftMm: 3.0, maxChassisShiftMm: 0.6, maxVolumeDeltaPct: 5.0, forbidPartDeletion: true };
  const violations = [];
  const curById = new Map(currentParts.map((p) => [p.id, p]));
  for (const bp of baselineParts) {
    const cp = curById.get(bp.id);
    if (!cp) {
      if (lim.forbidPartDeletion) {
        violations.push({ layer: 'SEC-08', rule: 'SALAMI_PART_DELETED', part: bp.id, msg: `Baseline part '${bp.id}' deleted` });
      }
      continue;
    }
    if (Array.isArray(bp.pos) && Array.isArray(cp.pos)) {
      const mag = Math.hypot(
        Number(cp.pos[0] || 0) - Number(bp.pos[0] || 0),
        Number(cp.pos[1] || 0) - Number(bp.pos[1] || 0),
        Number(cp.pos[2] || 0) - Number(bp.pos[2] || 0)
      );
      const cap = bp.isChassis ? lim.maxChassisShiftMm : lim.maxShiftMm;
      if (mag > cap + 1e-6) {
        violations.push({ layer: 'SEC-08', rule: 'SALAMI_CUMULATIVE_SHIFT', part: bp.id, msg: `cumulative shift=${mag.toFixed(3)}mm > ${cap}mm vs baseline` });
      }
    }
    if (Number(bp.volumeMm3) > 0 && Number.isFinite(Number(cp.volumeMm3))) {
      const volDeltaPct = (Math.abs(Number(cp.volumeMm3) - Number(bp.volumeMm3)) / Number(bp.volumeMm3)) * 100;
      if (volDeltaPct > lim.maxVolumeDeltaPct + 1e-6) {
        violations.push({ layer: 'SEC-08', rule: 'SALAMI_CUMULATIVE_VOLUME_SHRINK', part: bp.id, msg: `cumulative volDelta=${volDeltaPct.toFixed(2)}% > ${lim.maxVolumeDeltaPct}% vs baseline` });
      }
    }
  }
  return { ok: violations.length === 0, violations };
}

/**
 * Immutable Core Deletion Protection: unconditionally blocks deletion of core EXAM engines,
 * core fixed tests (T001..T1080), built-in pipelines, or FLOW OS kernel files regardless of role!
 */
export function runSec08CoreImmutableCheck(repoRoot) {
  const findings = [];
  const manifestPath = path.join(repoRoot, 'scripts/flow_os/core_immutable_manifest.json');
  if (!fs.existsSync(manifestPath)) return findings;
  let man;
  try {
    man = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    return [{ layer: 'SEC-08', rule: 'CORE_MANIFEST_CORRUPT', file: 'scripts/flow_os/core_immutable_manifest.json', line: 1, msg: 'Invalid immutable manifest JSON' }];
  }
  // Check only when this repository actually contains EXAM core (portable repos without EXAM skip EXAM files)
  const hasExam = fs.existsSync(path.join(repoRoot, 'scripts/exam.mjs'));
  for (const rel of man.protectedCoreFiles || []) {
    if (!hasExam && rel.startsWith('scripts/exam')) continue;
    if (!fs.existsSync(path.join(repoRoot, rel))) {
      findings.push({ layer: 'SEC-08', rule: 'CORE_IMMUTABLE_DELETED', file: rel, line: 1, msg: `Protected core file deleted: ${rel}` });
    }
  }
  return findings;
}

export function runSec08AntiCheat(repoRoot, dirtyFiles, opts = {}) {
  const findings = [...runSec08CoreImmutableCheck(repoRoot)];
  const examEdited = dirtyFiles.filter((f) => f.startsWith('scripts/exam/engines/') || f === 'scripts/exam/test_registry.mjs');
  if (examEdited.length > 0 && opts.role === 'worker') {
    findings.push({
      layer: 'SEC-08',
      rule: 'WORKER_EXAM_TAMPER',
      file: examEdited[0],
      line: 1,
      msg: 'Workers are strictly forbidden from modifying EXAM V1.1 engines/thresholds',
    });
  }
  // Check JSON part shrinkage vs HEAD
  for (const rel of dirtyFiles) {
    if (!rel.startsWith('src/data/') || !rel.endsWith('.json')) continue;
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      findings.push({ layer: 'SEC-08', rule: 'DATA_FILE_DELETED', file: rel, line: 1, msg: 'Unit data JSON deleted' });
      continue;
    }
    try {
      const cur = JSON.parse(fs.readFileSync(abs, 'utf8'));
      const prevRaw = execFileSync('git', ['show', `HEAD:${rel}`], {
        cwd: repoRoot,
        encoding: 'utf8',
        maxBuffer: 32 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'ignore'],
      });
      const prev = JSON.parse(prevRaw);
      if (Array.isArray(prev.parts) && Array.isArray(cur.parts) && cur.parts.length < prev.parts.length) {
        findings.push({
          layer: 'SEC-08',
          rule: 'PART_COUNT_REGRESSION',
          file: rel,
          line: 1,
          msg: `Parts shrunk ${prev.parts.length} -> ${cur.parts.length}`,
        });
      }
    } catch {
      // new file or non-git
    }
  }
  // Check cumulative drift against any unit baseline files (`verification/baselines/*.baseline.json`)
  const baseDir = path.join(repoRoot, 'verification/baselines');
  if (fs.existsSync(baseDir) && opts.unitPosesByUnit) {
    for (const [u, curParts] of Object.entries(opts.unitPosesByUnit)) {
      const bp = path.join(baseDir, `${u}.baseline.json`);
      if (!fs.existsSync(bp)) continue;
      try {
        const base = JSON.parse(fs.readFileSync(bp, 'utf8'));
        const res = validateCumulativeDrift(base.parts || [], curParts, opts.cfg || {});
        for (const v of res.violations) {
          findings.push({ layer: 'SEC-08', rule: v.rule, file: `src/units/${u}.pose.tsv`, line: 1, msg: v.msg });
        }
      } catch {
        // ignore invalid baseline
      }
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// SEC-10: Parallel Worker Scope Policy & Quarantine Enforcement
// ---------------------------------------------------------------------------
export function quarantineAgent(stateDir, agentId, reason, findings = []) {
  const qDir = path.join(stateDir, 'quarantine');
  fs.mkdirSync(qDir, { recursive: true });
  const qPath = path.join(qDir, `${agentId}.json`);
  const payload = {
    agentId,
    quarantinedAt: new Date().toISOString(),
    reason,
    findings: findings.slice(0, 10),
  };
  atomicWriteSync(qPath, JSON.stringify(payload, null, 2) + '\n');
  return qPath;
}

export function isAgentQuarantined(stateDir, agentId) {
  return fs.existsSync(path.join(stateDir, 'quarantine', `${agentId}.json`));
}

export function runSec10ParallelScope(ctx, dirtyFiles, { role = 'integrator', allowedUnit = null, agentId = 'default' } = {}) {
  const findings = [];
  if (isAgentQuarantined(ctx.stateDir, agentId)) {
    findings.push({ layer: 'SEC-10', rule: 'AGENT_QUARANTINED', file: '-', line: 0, msg: `Agent ${agentId} is quarantined` });
    return findings;
  }
  if (role !== 'worker') return findings;

  const protectedGlobs = ctx.cfg.policies?.worker?.protectedPaths || [];
  for (const rel of dirtyFiles) {
    const matched = matchAnyGlob(rel, protectedGlobs);
    if (matched) {
      findings.push({ layer: 'SEC-10', rule: 'WORKER_PROTECTED_PATH', file: rel, line: 1, msg: `Matches protected glob ${matched}` });
    }
    if (allowedUnit) {
      const unitHint = allowedUnit === 'mishoe' ? 'mishoe' : allowedUnit === 'sensor_fab' ? 'sensorFab' : allowedUnit === 'mirai_2028' ? 'mirai2028' : allowedUnit;
      const unitFile = allowedUnit === 'mishoe' ? 'src/units/mi_shoe.ts' : `src/units/${allowedUnit}.ts`;
      const dataFile = allowedUnit === 'mishoe' ? 'src/data/mi_shoe.json' : `src/data/${allowedUnit}.json`;
      const poseFile = `src/units/${allowedUnit}.pose.tsv`;
      const allowed =
        rel === unitFile ||
        rel === dataFile ||
        rel === poseFile ||
        rel.startsWith(`src/assemblies/${unitHint}/`);
      if (!allowed) {
        findings.push({ layer: 'SEC-10', rule: 'WORKER_LEASE_OUT_OF_SCOPE', file: rel, line: 1, msg: `Outside leased unit '${allowedUnit}'` });
      }
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// SEC-11: Repository Hygiene, Binary Bloat, Conflict Markers & Syntax Firewall
// ---------------------------------------------------------------------------
const CONFLICT_RX = /^(<{7}\s|={7}$|>{7}\s)/m;

export function runSec11Hygiene(repoRoot, files, cfg) {
  const findings = [];
  const maxBytes = (cfg.security?.maxFileMb ?? 25) * 1024 * 1024;
  const forbidRoot = cfg.security?.forbidRootGlobs || [];

  // Check root directory directly for forbidden clutter
  for (const entry of fs.readdirSync(repoRoot)) {
    if (entry === '.git' || entry === 'node_modules') continue;
    const hit = matchAnyGlob(entry, forbidRoot);
    if (hit) {
      findings.push({ layer: 'SEC-11', rule: 'ROOT_CLUTTER_FORBIDDEN', file: entry, line: 1, msg: `Matches forbidden glob '${hit}'` });
    }
  }

  for (const rel of files) {
    if (SCANNER_SELF_PATHS.has(rel)) continue;
    const abs = path.join(repoRoot, rel);
    let st;
    try {
      st = fs.lstatSync(abs);
    } catch {
      continue;
    }
    if (!st.isFile()) continue;
    if (st.size > maxBytes) {
      findings.push({ layer: 'SEC-11', rule: 'FILE_BLOAT_LIMIT', file: rel, line: 1, msg: `${(st.size / 1048576).toFixed(1)}MB > ${cfg.security?.maxFileMb ?? 25}MB` });
      continue;
    }
    if (BINARY_EXTS.has(path.extname(rel).toLowerCase())) continue;
    if (st.size > 16 * 1024 * 1024) continue;
    const buf = fs.readFileSync(abs);
    if (!isLikelyText(rel, buf)) continue;
    const text = buf.toString('utf8');
    if (CONFLICT_RX.test(text)) {
      findings.push({ layer: 'SEC-11', rule: 'UNRESOLVED_CONFLICT_MARKER', file: rel, line: 1, msg: 'Git conflict marker found' });
    }
    if (rel.endsWith('.json')) {
      try {
        JSON.parse(text);
      } catch (err) {
        findings.push({ layer: 'SEC-11', rule: 'MALFORMED_JSON', file: rel, line: 1, msg: err.message.slice(0, 80) });
      }
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// SEC-13: Macro Governance, Autonomous I10 Lock & V1.1 Certificate Forgery Guard
// ---------------------------------------------------------------------------
const SEC13_ALLOWED_PRIMITIVES = new Set([
  'flow.wake', 'flow.inspect', 'flow.heal', 'flow.ship', 'flow.park', 'flow.finish',
  'flow.security', 'flow.doc', 'flow.swarm', 'flow.cert', 'flow.selftest',
  'exam.setup', 'exam.verify', 'exam.run', 'exam.selftest', 'exam.cert',
  'bg.boot', 'bg.snap', 'bg.seal', 'bg.gate', 'bg.status', 'bg.selftest',
  'dx.atlas', 'dx.brief', 'dx.find', 'dx.read', 'dx.selftest',
  'sp.inspect', 'sp.thermal', 'sp.selftest', 'pp.capture', 'pp.stop',
  'npm.catalog', 'npm.tsc', 'npm.validate', 'npm.build', 'npm.test',
  'git.status', 'git.log', 'git.diffstat', 'scaffold.unit', 'noop',
]);
const SEC13_FORBID_ARGS = [
  { rule: 'MACRO_I10_HUMAN_REPORT_BLOCK', rx: /\bhuman-report\b/i },
  { rule: 'MACRO_BYPASS_SKIP_FLAG', rx: /^--(?:skip-|no-exam|no-security|no-checks|bypass|allow-fail|relax)/i },
  { rule: 'MACRO_SHELL_METACHAR', rx: /[;&|`$]\(|&&|\|\||;\s*\w|\|\s*(?:sh|bash|zsh)\b/i },
  { rule: 'MACRO_DANGEROUS_FLAG', rx: /^--(?:force|hard|no-verify)$/i },
  { rule: 'MACRO_SENSITIVE_PATH', rx: /(?:^|\/)(?:\.git\/hooks|\/etc\/|\/opt\/antigravity\/tokens)/i },
];
const V11_SEAL_DOMAIN_TAG = 'THE_LAST_EXAM_V1.1_SEAL_WARRANTY_v1';

export function validateMacroSpecSec13(spec, repoRoot) {
  const findings = [];
  const add = (rule, msg) => findings.push({ layer: 'SEC-13', rule, file: `.flow/macros/${spec?.name || 'spec'}.macro.json`, line: 1, msg });
  if (!spec || typeof spec !== 'object' || !Array.isArray(spec.steps) || spec.steps.length === 0) {
    add('MACRO_INVALID_SPEC', 'Macro spec must have non-empty steps[]');
    return findings;
  }
  if (spec.steps.length > 40) {
    add('MACRO_MAX_STEPS_EXCEEDED', `${spec.steps.length} steps exceeds cap 40`);
  }
  const byId = new Map();
  for (const st of spec.steps) {
    if (!st || typeof st !== 'object' || !st.id) {
      add('MACRO_INVALID_STEP', 'Step missing id');
      continue;
    }
    byId.set(st.id, st);
    if (!SEC13_ALLOWED_PRIMITIVES.has(st.primitive)) {
      add('MACRO_FORBIDDEN_PRIMITIVE', `Non-allowlisted primitive '${st.primitive}'`);
    }
    for (const rawArg of st.args || []) {
      const a = String(rawArg);
      for (const pat of SEC13_FORBID_ARGS) {
        if (pat.rx.test(a)) add(pat.rule, `Blocked arg '${a.slice(0, 60)}'`);
      }
      if (a.includes('..') && (a.includes('/') || a.includes('\\'))) {
        add('MACRO_PATH_ESCAPE', `Parent traversal in arg '${a}'`);
      }
      const pm = a.match(/^--(?:out|file|path|dir|spec)=(.+)$/);
      if (pm && !pm[1].includes('${')) {
        if (!assertPathConfined(pm[1], [repoRoot, '/tmp/flow_ws', '/tmp/flow_reports', '/tmp/tlx_runs']).ok) {
          add('MACRO_PATH_ESCAPE', `Path '${pm[1]}' escapes allowed workspace`);
        }
      }
    }
  }
  // Acyclic DAG verification (Kahn)
  const inDeg = new Map([...byId.keys()].map((id) => [id, 0]));
  const ch = new Map([...byId.keys()].map((id) => [id, []]));
  for (const st of spec.steps) {
    for (const d of st.deps || []) {
      if (!byId.has(d)) { add('MACRO_UNKNOWN_DEP', `Unknown dep '${d}'`); continue; }
      inDeg.set(st.id, (inDeg.get(st.id) || 0) + 1);
      ch.get(d).push(st.id);
    }
  }
  const q = [...inDeg.entries()].filter(([, deg]) => deg === 0).map(([id]) => id);
  let vis = 0;
  while (q.length > 0) {
    const id = q.shift();
    vis++;
    for (const nxt of ch.get(id) || []) {
      const nd = (inDeg.get(nxt) || 0) - 1;
      inDeg.set(nxt, nd);
      if (nd === 0) q.push(nxt);
    }
  }
  if (vis !== byId.size) {
    add('MACRO_DAG_CYCLE', 'Cyclic dependency graph detected in macro');
  }
  return findings;
}

export function runSec13MacroAndCertGuard(repoRoot) {
  const findings = [];

  // 1. Audit registered macros in .flow/macros/
  const macroDir = path.join(repoRoot, '.flow/macros');
  const regPath = path.join(macroDir, 'registry.json');
  if (fs.existsSync(macroDir)) {
    let reg = { macros: {} };
    const regFiles = new Set();
    if (fs.existsSync(regPath)) {
      try {
        reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));
      } catch (err) {
        findings.push({ layer: 'SEC-13', rule: 'MACRO_REGISTRY_CORRUPTED', file: '.flow/macros/registry.json', line: 1, msg: err.message });
      }
    }
    for (const [name, entry] of Object.entries(reg.macros || {})) {
      const rel = entry.file || `.flow/macros/${name}.macro.json`;
      regFiles.add(path.basename(rel));
      const abs = path.join(repoRoot, rel);
      if (!fs.existsSync(abs)) {
        findings.push({ layer: 'SEC-13', rule: 'MACRO_FILE_MISSING', file: rel, line: 1, msg: 'Registered macro file missing' });
        continue;
      }
      const raw = fs.readFileSync(abs, 'utf8');
      const actualSha = crypto.createHash('sha256').update(raw).digest('hex');
      if (actualSha !== entry.sha256) {
        findings.push({ layer: 'SEC-13', rule: 'MACRO_SHA_TAMPERED', file: rel, line: 1, msg: `SHA mismatch (${actualSha.slice(0, 10)} != ${String(entry.sha256).slice(0, 10)})` });
      }
      try {
        const parsed = JSON.parse(raw);
        for (const f of validateMacroSpecSec13(parsed, repoRoot)) findings.push(f);
      } catch (err) {
        findings.push({ layer: 'SEC-13', rule: 'MACRO_JSON_INVALID', file: rel, line: 1, msg: err.message });
      }
    }
    for (const f of fs.readdirSync(macroDir)) {
      if (f.endsWith('.macro.json') && !regFiles.has(f)) {
        findings.push({ layer: 'SEC-13', rule: 'MACRO_UNREGISTERED_FILE', file: `.flow/macros/${f}`, line: 1, msg: 'Unregistered macro file detected' });
      }
    }
  }

  // 2. Audit V1.1証明 certificates in verification/certificates/*.v1_1.cert.json against forgery
  const certDir = path.join(repoRoot, 'verification/certificates');
  if (fs.existsSync(certDir)) {
    for (const f of fs.readdirSync(certDir)) {
      if (!f.endsWith('.v1_1.cert.json')) continue;
      const rel = `verification/certificates/${f}`;
      try {
        const c = JSON.parse(fs.readFileSync(path.join(certDir, f), 'utf8'));
        const canonical = [
          V11_SEAL_DOMAIN_TAG,
          c.unitId,
          c.primarySha256,
          c.allTiersSha256,
          c.examKernelSha256,
          c.solverManifestSha256,
          `${c.enginesPassed}/${c.enginesTotal}`,
          `${c.testsPassed}/${c.testsTotal}`,
          `${c.locksPassed}/${c.locksTotal}`,
          `${c.solversReady}/${c.solversTotal}`,
          c.tlxReceipt,
        ].join('|');
        const expectedSig = crypto.createHash('sha256').update(canonical).digest('hex');
        const expectedId = `V11-CERT:${c.unitId}:${String(c.primarySha256 || '').slice(0, 12)}:${String(c.examKernelSha256 || '').slice(0, 8)}:${c.testsPassed}/${c.testsTotal}:${expectedSig.slice(0, 16)}`;
        const scoreOk =
          c.enginesPassed === c.enginesTotal && c.enginesTotal >= 48 &&
          c.testsPassed === c.testsTotal && c.testsTotal >= 1080 &&
          c.locksPassed === c.locksTotal && c.locksTotal >= 28 &&
          c.solversReady === c.solversTotal && c.solversTotal >= 48;
        if (!scoreOk || c.signature !== expectedSig || c.certId !== expectedId) {
          findings.push({ layer: 'SEC-13', rule: 'V11_CERT_FORGERY_BLOCKED', file: rel, line: 1, msg: 'Forged or invalid V1.1証明 certificate detected' });
        }
        if (c.ed25519Signature) {
          const edCheck = verifyEd25519Attestation('V11_CERT', c, { repoRoot });
          if (edCheck.status === 'FORGED_SIGNATURE' || edCheck.status === 'KEY_FINGERPRINT_MISMATCH') {
            findings.push({ layer: 'SEC-13', rule: 'V11_CERT_ED25519_INVALID', file: rel, line: 1, msg: `Ed25519 attestation failed (${edCheck.status})` });
          }
        }
      } catch (err) {
        findings.push({ layer: 'SEC-13', rule: 'V11_CERT_CORRUPTED', file: rel, line: 1, msg: err.message });
      }
    }
  }

  return findings;
}

// ---------------------------------------------------------------------------
// Unified 12-Active-Layer Fortress Runner (`SEC-01`..`SEC-11` + `SEC-13`) -> `SEC-RECEIPT`
// (`SEC-12` is the 36-attack Red-Team chaos oracle -> 13 Total Layers!)
// ---------------------------------------------------------------------------
export function runSecurityFortress(ctx, opts = {}) {
  const t0 = performance.now();
  const git = getGitMeta(ctx.repoRoot);
  const scanFiles = opts.files || (opts.full ? listTrackedAndUntracked(ctx.repoRoot) : git.dirtyFiles);
  const dirtyFiles = opts.dirtyFiles || git.dirtyFiles;

  const layers = {};
  const allFindings = [];
  const addLayer = (id, list) => {
    layers[id] = { ok: list.length === 0, count: list.length };
    for (const f of list) allFindings.push(f);
  };

  addLayer('SEC-01', runSec01Secrets(ctx.repoRoot, scanFiles, ctx.cfg));

  // SEC-02: Kernel seal computation
  const seal = computeKernelSeal(ctx.repoRoot, ctx.cfg.security?.kernelSealPaths || ['scripts/flow_os']);
  addLayer('SEC-02', []);

  addLayer('SEC-03', runSec03PromptAndUnicode(ctx.repoRoot, scanFiles));
  // SEC-04 is enforced inline on every command; clean when scanning tree
  addLayer('SEC-04', []);
  addLayer('SEC-05', runSec05SymlinkAudit(ctx.repoRoot, scanFiles));
  addLayer('SEC-06', runSec06SupplyChain(ctx.repoRoot));
  addLayer('SEC-07', runSec07Sast(ctx.repoRoot, scanFiles));
  addLayer('SEC-08', runSec08AntiCheat(ctx.repoRoot, dirtyFiles, opts));

  const ledger = verifyAuditLedger(ctx.stateDir);
  addLayer('SEC-09', ledger.ok ? [] : [{ layer: 'SEC-09', rule: 'AUDIT_LEDGER_TAMPERED', file: '.git/flow_os/flow_audit.jsonl', line: ledger.brokenAt || 1, msg: ledger.reason }]);

  addLayer('SEC-10', runSec10ParallelScope(ctx, dirtyFiles, opts));
  addLayer('SEC-11', runSec11Hygiene(ctx.repoRoot, scanFiles, ctx.cfg));
  addLayer('SEC-13', runSec13MacroAndCertGuard(ctx.repoRoot));

  // Quarantine rogue parallel worker automatically on any violation
  if (allFindings.length > 0 && opts.role === 'worker' && opts.agentId) {
    quarantineAgent(ctx.stateDir, opts.agentId, allFindings[0].rule, allFindings);
  }

  const passedCount = Object.values(layers).filter((l) => l.ok).length;
  const totalCount = Object.keys(layers).length;
  const ok = allFindings.length === 0;
  const treeSha = opts.treeSha || computeTreeFingerprint(ctx.repoRoot);
  const receipt = ok
    ? `SEC-RECEIPT:${treeSha.slice(0, 8)}:${passedCount}/${totalCount}:${crypto.createHash('sha256').update(`SEC|${treeSha}|${seal.sha}|${passedCount}`).digest('hex').slice(0, 8)}`
    : 'NONE';

  return {
    ok,
    exitCode: ok ? EXIT_OK : EXIT_SECURITY_BLOCKED,
    passedCount,
    totalCount,
    layers,
    findings: allFindings,
    treeSha,
    kernelSha: seal.sha,
    receipt,
    elapsedMs: Math.round(performance.now() - t0),
  };
}

function listTrackedAndUntracked(repoRoot) {
  try {
    const out = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], {
      cwd: repoRoot,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return out
      .split('\0')
      .filter((f) => f && !f.startsWith('docs/') && !f.startsWith('dist/') && !f.startsWith('android/'));
  } catch {
    return [];
  }
}
