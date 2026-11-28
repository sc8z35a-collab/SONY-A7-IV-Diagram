/**
 * FLOW V1 OS — Portable Kernel Configuration, Auto-Detection & Exit Code Contract
 * 100% repo-agnostic, zero external npm dependencies (Pure Node.js 22).
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

export const FLOW_OS_VERSION = '1.1.0';

// Deterministic OS Exit Code Contract (compatible with bg & EXAM V1.1 + SEC-13)
export const EXIT_OK = 0;
export const EXIT_ERROR = 1;
export const EXIT_BLOCKED = 2;
export const EXIT_WARN = 3;
export const EXIT_INVARIANT_FAIL = 4;
export const EXIT_SOLVER_MISSING = 5;
export const EXIT_SECURITY_BLOCKED = 6;

export const DEFAULT_FLOW_CONFIG = Object.freeze({
  schema: 'flow-os/v1.1',
  osVersion: FLOW_OS_VERSION,
  projectName: 'unknown-repo',
  defaultBranch: 'main',
  remote: 'origin',
  adapter: null,
  books: {
    envManual: 'AGENTS.md',
    domainManual: 'README.md',
    maxEnvTokens: 2200,
    maxDomainTokens: 5500,
    contentAssetDirs: ['reports', 'blueprints', 'docs', 'node_modules', 'dist', 'build', '.git', 'vendor', 'target'],
    requiredEnvTokens: [
      'flow wake',
      'flow permit',
      'flow inspect',
      'flow ship',
      'flow park',
      'flow finish',
      'flow auto',
      'flow macro',
      'flow verify',
      'flow doc tool',
      'flow human-report',
      'FLOW-RECEIPT',
      'SEC-01',
      'SEC-13',
      'HUMAN_REQUEST_ONLY',
    ],
  },
  budgets: {
    wake: 220,
    permit: 150,
    inspect: 300,
    heal: 400,
    ship: 350,
    park: 150,
    finish: 200,
    swarm: 300,
    exec: 400,
    security: 350,
    doc: 250,
    auto: 550,
    macro: 400,
    cert: 300,
    verify: 300,
    cache: 150,
  },
  security: {
    maxFileMb: 25,
    entropyThreshold: 4.65,
    entropyMinLen: 28,
    kernelSealPaths: ['scripts/flow_os'],
    forbidRootGlobs: ['*.png', '*.webp', '*.jpg', '*.jpeg', '*.tmp', 'tmp_*', 'debug_*', '='],
    healLimits: {
      maxShiftMm: 3.0,
      maxChassisShiftMm: 0.6,
      maxVolumeDeltaPct: 5.0,
      forbidPartDeletion: true,
    },
  },
  parallel: {
    leaseNamespace: 'refs/bg-vault/leases',
    leaseTtlSec: 1800,
    wsBaseDir: '/tmp/flow_ws',
  },
  policies: {
    worker: {
      protectedPaths: ['scripts/flow_os/**'],
      checks: [],
    },
    integrator: {
      protectedPaths: [],
      checks: [],
    },
  },
});

function deepMerge(base, override) {
  if (!override || typeof override !== 'object' || Array.isArray(override)) {
    return override === undefined ? base : override;
  }
  const out = Array.isArray(base) ? [...base] : { ...(base || {}) };
  for (const [k, v] of Object.entries(override)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && base && typeof base[k] === 'object' && !Array.isArray(base[k])) {
      out[k] = deepMerge(base[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

/**
 * Auto-detect repository language, test/build checks, and default branch for 30-second portability.
 */
export function detectRepoProfile(repoRoot) {
  const checks = [];
  const langs = [];
  let projectName = path.basename(repoRoot);

  const pkgPath = path.join(repoRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    langs.push('node');
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.name) projectName = pkg.name;
      if (fs.existsSync(path.join(repoRoot, 'tsconfig.json'))) {
        langs.push('typescript');
        checks.push('npx tsc --noEmit');
      }
      if (pkg.scripts?.test && !String(pkg.scripts.test).includes('no test specified')) {
        checks.push('npm test');
      }
      if (pkg.scripts?.build) {
        checks.push('npm run build');
      }
    } catch {
      // ignore malformed package.json
    }
  }
  if (fs.existsSync(path.join(repoRoot, 'pyproject.toml')) || fs.existsSync(path.join(repoRoot, 'requirements.txt'))) {
    langs.push('python');
    checks.push('python3 -m pytest -q');
  }
  if (fs.existsSync(path.join(repoRoot, 'Cargo.toml'))) {
    langs.push('rust');
    checks.push('cargo test');
  }
  if (fs.existsSync(path.join(repoRoot, 'go.mod'))) {
    langs.push('go');
    checks.push('go test ./...');
  }
  if (fs.existsSync(path.join(repoRoot, 'CMakeLists.txt'))) {
    langs.push('cpp');
  }

  let defaultBranch = 'main';
  try {
    const sym = execFileSync('git', ['symbolic-ref', '--short', 'refs/remotes/origin/HEAD'], {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (sym.includes('/')) defaultBranch = sym.split('/').slice(1).join('/');
  } catch {
    try {
      const br = execFileSync('git', ['branch', '--show-current'], {
        cwd: repoRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      if (br === 'master' || br === 'main') defaultBranch = br;
    } catch {
      // keep main
    }
  }

  return { projectName, langs, checks, defaultBranch };
}

export function resolveRepoRoot(startDir = process.cwd()) {
  let cur = path.resolve(startDir);
  try {
    const top = execFileSync('git', ['rev-parse', '--show-toplevel'], {
      cwd: cur,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (top) return fs.realpathSync(top);
  } catch {
    // non-git fallback
  }
  return fs.existsSync(cur) ? fs.realpathSync(cur) : cur;
}

export function resolveGitDir(repoRoot) {
  try {
    const gd = execFileSync('git', ['rev-parse', '--git-dir'], {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return path.resolve(repoRoot, gd);
  } catch {
    return path.join(repoRoot, '.git');
  }
}

export function resolveAgentContext(cfg, opts = {}) {
  const rawId = opts.agentId || process.env.FLOW_AGENT_ID || `default-${os.hostname()}`;
  const agentId = String(rawId).replace(/[^A-Za-z0-9_.-]/g, '_').slice(0, 48);
  const wsBase = cfg.parallel?.wsBaseDir || '/tmp/flow_ws';
  const sameAgentAsEnv = !opts.agentId || opts.agentId === process.env.FLOW_AGENT_ID;
  const agentWs = opts.agentWs || (sameAgentAsEnv ? process.env.FLOW_AGENT_WS : null) || path.join(wsBase, agentId);
  fs.mkdirSync(agentWs, { recursive: true });
  return {
    agentId,
    agentWs,
    envOverlay: {
      FLOW_AGENT_ID: agentId,
      FLOW_AGENT_WS: agentWs,
      FLOW_SP_CACHE_DIR: path.join(agentWs, 'sp_cache'),
      FLOW_TLX_RUNS_DIR: path.join(agentWs, 'tlx_runs'),
      FLOW_PP_DAEMON_DIR: path.join(agentWs, 'pp_daemon'),
    },
  };
}

export function loadFlowConfig(repoRoot = resolveRepoRoot()) {
  const profile = detectRepoProfile(repoRoot);
  const rcPath = path.join(repoRoot, '.flowrc.json');
  let userCfg = {};
  if (fs.existsSync(rcPath)) {
    try {
      userCfg = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
    } catch (err) {
      throw new Error(`Invalid .flowrc.json: ${err.message}`);
    }
  }
  const autoBase = deepMerge(DEFAULT_FLOW_CONFIG, {
    projectName: profile.projectName,
    defaultBranch: profile.defaultBranch,
    policies: {
      integrator: { checks: profile.checks },
    },
  });
  const cfg = deepMerge(autoBase, userCfg);
  const gitDir = resolveGitDir(repoRoot);
  const stateDir = path.join(gitDir, 'flow_os');
  fs.mkdirSync(stateDir, { recursive: true });
  return {
    repoRoot,
    gitDir,
    stateDir,
    rcPath,
    hasRc: fs.existsSync(rcPath),
    profile,
    cfg,
  };
}

/**
 * Dynamically load project-specific Domain Adapter if configured.
 */
export async function loadDomainAdapter(ctx) {
  const rel = ctx.cfg.adapter;
  if (!rel) return null;
  const abs = path.resolve(ctx.repoRoot, rel);
  if (!fs.existsSync(abs)) return null;
  const mod = await import(`file://${abs}`);
  if (typeof mod.createAdapter === 'function') {
    return mod.createAdapter(ctx);
  }
  return mod.default || mod;
}

export function sha256Text(text) {
  return crypto.createHash('sha256').update(String(text)).digest('hex');
}

export function sha256File(absPath) {
  return crypto.createHash('sha256').update(fs.readFileSync(absPath)).digest('hex');
}

export function atomicWriteSync(targetPath, content) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const tmp = `${targetPath}.tmp.${process.pid}.${Date.now()}`;
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, targetPath);
}

export function globToRegex(glob) {
  let rx = '^';
  let i = 0;
  while (i < glob.length) {
    const ch = glob[i];
    if (ch === '*') {
      if (glob[i + 1] === '*') {
        rx += glob[i + 2] === '/' ? '(?:.*/)?' : '.*';
        i += glob[i + 2] === '/' ? 3 : 2;
      } else {
        rx += '[^/]*';
        i += 1;
      }
    } else if (ch === '?') {
      rx += '[^/]';
      i += 1;
    } else if ('\\^$.|+()[]{}'.includes(ch)) {
      rx += '\\' + ch;
      i += 1;
    } else {
      rx += ch;
      i += 1;
    }
  }
  rx += '$';
  return new RegExp(rx);
}

export function matchAnyGlob(relPath, globs = []) {
  const norm = relPath.replace(/\\/g, '/').replace(/^\.\//, '');
  for (const g of globs) {
    if (globToRegex(g).test(norm)) return g;
  }
  return null;
}

export function getGitMeta(repoRoot) {
  const safeGit = (args) => {
    try {
      return execFileSync('git', args, {
        cwd: repoRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
    } catch {
      return '';
    }
  };
  const branch = safeGit(['branch', '--show-current']) || 'DETACHED';
  const head = safeGit(['rev-parse', '--short=10', 'HEAD']) || 'NONE';
  const headFull = safeGit(['rev-parse', 'HEAD']) || 'NONE';
  const porcelain = safeGit(['status', '--porcelain']);
  const dirtyLines = porcelain ? porcelain.split('\n').filter(Boolean) : [];
  return {
    branch,
    head,
    headFull,
    dirtyCount: dirtyLines.length,
    dirtyFiles: dirtyLines.map((l) => l.slice(3).trim().split(' -> ').pop()).filter(Boolean),
  };
}
