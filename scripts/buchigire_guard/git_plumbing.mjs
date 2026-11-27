/**
 * Buchigire Guard v1 (bg) — Low-Level Git Plumbing, Locking & Atomic I/O Kernel
 * Zero external dependencies (Pure Node.js 22 + Git 2.38+).
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execFileSync, spawn, spawnSync } from 'node:child_process';

export const EXIT_OK = 0;
export const EXIT_ERROR = 1;
export const EXIT_BLOCKED = 2;
export const EXIT_WARN = 3;

export const DEFAULT_CONFIG = Object.freeze({
  schema: 'bg-config/v1',
  defaultBranch: 'main',
  remote: 'origin',
  vaultNamespace: 'refs/bg-vault',
  vaultFallbackNamespace: 'refs/heads/bg-vault',
  watchIntervalSec: 120,
  retentionDays: 7,
  maxFileMb: 25,
  forbidRootGlobs: ['*.png', '*.webp', '*.jpg', '*.jpeg', '*.tmp', 'captures/**', 'tmp_*', 'debug_*'],
  excludeVaultGlobs: ['node_modules/**', '.git/**', 'dist/**', '.next/**', 'target/**', '__pycache__/**', '*.log'],
  policies: {
    default: {
      protectedPaths: [],
      checks: [],
    },
  },
});

export function sha256Buffer(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

export function sha256String(str) {
  return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
}

export function sha256File(filePath) {
  const hash = crypto.createHash('sha256');
  const fd = fs.openSync(filePath, 'r');
  try {
    const buf = Buffer.allocUnsafe(65536);
    let bytesRead = 0;
    while ((bytesRead = fs.readSync(fd, buf, 0, buf.length, null)) > 0) {
      hash.update(bytesRead === buf.length ? buf : buf.subarray(0, bytesRead));
    }
  } finally {
    fs.closeSync(fd);
  }
  return hash.digest('hex');
}

/**
 * Atomic file write via temp sibling + renameSync (BG-31).
 */
export function atomicWriteFileSync(targetPath, content) {
  const dir = path.dirname(targetPath);
  fs.mkdirSync(dir, { recursive: true });
  const tmpPath = `${targetPath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmpPath, content);
  fs.renameSync(tmpPath, targetPath);
}

/**
 * Check whether a PID is still alive on Linux/POSIX.
 */
function isPidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return err && err.code === 'EPERM';
  }
}

/**
 * Acquire PID-verified exclusive lock inside .git/bg-vault/bg.lock (BG-31).
 */
export function acquireLock(gitDir, timeoutMs = 8000) {
  const vaultDir = path.join(gitDir, 'bg-vault');
  fs.mkdirSync(vaultDir, { recursive: true });
  const lockPath = path.join(vaultDir, 'bg.lock');
  const deadline = Date.now() + timeoutMs;

  while (true) {
    try {
      const fd = fs.openSync(lockPath, 'wx');
      const payload = JSON.stringify({ pid: process.pid, host: os.hostname(), createdAt: new Date().toISOString() });
      fs.writeSync(fd, payload);
      fs.closeSync(fd);
      return { lockPath, pid: process.pid };
    } catch (err) {
      if (!err || err.code !== 'EEXIST') throw err;
      // Inspect stale lock
      try {
        const raw = fs.readFileSync(lockPath, 'utf8');
        const info = JSON.parse(raw);
        if (info && info.host === os.hostname() && !isPidAlive(info.pid)) {
          fs.unlinkSync(lockPath);
          continue;
        }
        const st = fs.statSync(lockPath);
        if (Date.now() - st.mtimeMs > 120_000 && !isPidAlive(info?.pid)) {
          fs.unlinkSync(lockPath);
          continue;
        }
      } catch {
        // Lock disappeared or corrupted; retry
        try {
          fs.unlinkSync(lockPath);
        } catch {
          // ignore
        }
        continue;
      }
      if (Date.now() > deadline) {
        throw new Error(`Timed out waiting for Buchigire Guard lock (${lockPath}).`);
      }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
    }
  }
}

export function releaseLock(handle) {
  if (!handle || !handle.lockPath) return;
  try {
    const raw = fs.readFileSync(handle.lockPath, 'utf8');
    const info = JSON.parse(raw);
    if (info && info.pid === handle.pid) {
      fs.unlinkSync(handle.lockPath);
    }
  } catch {
    // ignore
  }
}

/**
 * Execute git safely with optional stdin/env and return structured result.
 */
export function runGit(args, opts = {}) {
  const res = spawnSync('git', args, {
    cwd: opts.cwd || process.cwd(),
    env: opts.env ? { ...process.env, ...opts.env } : process.env,
    input: opts.input,
    encoding: opts.buffer ? undefined : 'utf8',
    maxBuffer: opts.maxBuffer || 64 * 1024 * 1024,
  });
  return {
    status: res.status ?? 1,
    stdout: res.stdout ?? (opts.buffer ? Buffer.alloc(0) : ''),
    stderr: res.stderr ? (opts.buffer ? res.stderr.toString('utf8') : res.stderr) : '',
    error: res.error || null,
  };
}

export function runGitAsync(args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn('git', args, {
      cwd: opts.cwd || process.cwd(),
      env: opts.env ? { ...process.env, ...opts.env } : process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const outChunks = [];
    const errChunks = [];
    child.stdout.on('data', (c) => outChunks.push(c));
    child.stderr.on('data', (c) => errChunks.push(c));
    child.on('error', (err) => {
      resolve({ status: 1, stdout: opts.buffer ? Buffer.alloc(0) : '', stderr: String(err), error: err });
    });
    child.on('close', (code) => {
      const outBuf = Buffer.concat(outChunks);
      const errStr = Buffer.concat(errChunks).toString('utf8');
      resolve({
        status: code ?? 1,
        stdout: opts.buffer ? outBuf : outBuf.toString('utf8'),
        stderr: errStr,
        error: null,
      });
    });
  });
}

export function runGitOrThrow(args, opts = {}) {
  const res = runGit(args, opts);
  if (res.status !== 0) {
    const err = new Error(`git ${args.join(' ')} failed (exit ${res.status}): ${res.stderr.trim()}`);
    err.gitResult = res;
    throw err;
  }
  return res.stdout;
}

export function runShell(command, opts = {}) {
  const res = spawnSync(command, {
    cwd: opts.cwd || process.cwd(),
    env: opts.env ? { ...process.env, ...opts.env } : process.env,
    shell: true,
    encoding: 'utf8',
    maxBuffer: opts.maxBuffer || 64 * 1024 * 1024,
    timeout: opts.timeoutMs || 300_000,
  });
  return {
    status: res.status ?? 1,
    stdout: res.stdout || '',
    stderr: res.stderr || '',
  };
}

/**
 * Simple glob matcher supporting **, *, ? on POSIX relative paths (memoized RegExp cache).
 */
const _globRxCache = new Map();
export function matchGlob(relPath, pattern) {
  const normPath =
    relPath.indexOf('\\') === -1 && !relPath.startsWith('./')
      ? relPath
      : relPath.replace(/\\/g, '/').replace(/^\.\//, '');
  let compiled = _globRxCache.get(pattern);
  if (!compiled) {
    const normPat = pattern.replace(/\\/g, '/').replace(/^\.\//, '');
    let rx = '^';
    for (let i = 0; i < normPat.length; i++) {
      const ch = normPat[i];
      if (ch === '*') {
        if (normPat[i + 1] === '*') {
          if (normPat[i + 2] === '/') {
            rx += '(?:.*/)?';
            i += 2;
          } else {
            rx += '.*';
            i += 1;
          }
        } else {
          rx += '[^/]*';
        }
      } else if (ch === '?') {
        rx += '[^/]';
      } else if ('\\^$.|+()[]{}'.includes(ch)) {
        rx += '\\' + ch;
      } else {
        rx += ch;
      }
    }
    rx += '$';
    compiled = new RegExp(rx);
    if (_globRxCache.size > 512) _globRxCache.clear();
    _globRxCache.set(pattern, compiled);
  }
  return compiled.test(normPath);
}

export function sanitizeSlug(name) {
  return String(name || 'detached')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'session';
}

/**
 * Resolve a local Git ref (loose or packed-refs) directly in Node.js without spawning git.
 */
export function resolveLocalRef(gitDir, refName) {
  try {
    const loosePath = path.join(gitDir, refName);
    if (fs.existsSync(loosePath)) {
      const raw = fs.readFileSync(loosePath, 'utf8').trim();
      if (raw.startsWith('ref: ')) {
        return resolveLocalRef(gitDir, raw.slice(5).trim());
      }
      if (/^[0-9a-f]{40}$/i.test(raw)) return raw;
    }
    const packedPath = path.join(gitDir, 'packed-refs');
    if (fs.existsSync(packedPath)) {
      const lines = fs.readFileSync(packedPath, 'utf8').split('\n');
      const suffix = ` ${refName}`;
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        if (!l || l[0] === '#' || l[0] === '^') continue;
        if (l.endsWith(suffix) && l.length === 40 + suffix.length) {
          return l.slice(0, 40);
        }
      }
    }
  } catch {
    // fallback handled by caller
  }
  return null;
}

function findGitRepoFast(startCwd) {
  if (process.env.GIT_DIR || process.env.GIT_WORK_TREE) return null;
  let dir = path.resolve(startCwd);
  while (true) {
    const dotGit = path.join(dir, '.git');
    try {
      const st = fs.lstatSync(dotGit);
      if (st.isDirectory()) {
        return { repoRoot: dir, gitDir: dotGit };
      }
      if (st.isFile()) {
        const raw = fs.readFileSync(dotGit, 'utf8').trim();
        const m = raw.match(/^gitdir:\s*(.+)$/);
        if (m) {
          const gd = path.isAbsolute(m[1]) ? m[1] : path.resolve(dir, m[1]);
          return { repoRoot: dir, gitDir: gd };
        }
      }
    } catch {
      // keep walking up
    }
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function parseGitConfigSectionValue(configText, sectionHeader, key) {
  const lines = configText.split('\n');
  let inSection = false;
  const target = sectionHeader.toLowerCase();
  const keyLower = key.toLowerCase();
  let found = null;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed || trimmed[0] === '#' || trimmed[0] === ';') continue;
    if (trimmed[0] === '[') {
      const close = trimmed.indexOf(']');
      const hdr = close > 0 ? trimmed.slice(1, close).trim().toLowerCase() : '';
      inSection = hdr === target;
      continue;
    }
    if (!inSection) continue;
    const eq = trimmed.indexOf('=');
    if (eq > 0) {
      const k = trimmed.slice(0, eq).trim().toLowerCase();
      if (k === keyLower) {
        found = trimmed.slice(eq + 1).trim();
      }
    }
  }
  return found;
}

/**
 * Auto-detect repository build/typecheck checks for zero-config cross-repo portability (BG-27).
 */
function autoDetectRepoDefaults(repoRoot) {
  const detectedChecks = [];
  const pkgPath = path.join(repoRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (fs.existsSync(path.join(repoRoot, 'tsconfig.json'))) {
        detectedChecks.push('npx tsc --noEmit');
      } else if (pkg.scripts?.test && !String(pkg.scripts.test).includes('no test specified')) {
        detectedChecks.push('npm test');
      }
    } catch {
      // ignore
    }
  } else if (fs.existsSync(path.join(repoRoot, 'go.mod'))) {
    detectedChecks.push('go test ./...');
  } else if (fs.existsSync(path.join(repoRoot, 'Cargo.toml'))) {
    detectedChecks.push('cargo check');
  } else if (fs.existsSync(path.join(repoRoot, 'pyproject.toml'))) {
    detectedChecks.push('python3 -m py_compile');
  }
  return detectedChecks;
}

export function loadConfig(repoRoot, overrides = {}) {
  const rcPath = path.join(repoRoot, '.bgrc.json');
  let userCfg = {};
  if (fs.existsSync(rcPath)) {
    try {
      userCfg = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
    } catch (err) {
      throw new Error(`Invalid .bgrc.json: ${err.message}`);
    }
  }

  const autoChecks = autoDetectRepoDefaults(repoRoot);
  const merged = {
    ...DEFAULT_CONFIG,
    ...userCfg,
    policies: {
      default: {
        protectedPaths: [],
        checks: autoChecks,
      },
      ...(userCfg.policies || {}),
    },
  };

  if (overrides.remote) merged.remote = overrides.remote;
  if (overrides.maxFileMb != null) merged.maxFileMb = Number(overrides.maxFileMb);
  if (overrides.retentionDays != null) merged.retentionDays = Number(overrides.retentionDays);
  if (overrides.vaultNamespace) merged.vaultNamespace = overrides.vaultNamespace;
  return merged;
}

/**
 * Detect full Git repository context (zero-fork direct .git inspection with git fallback).
 */
export function getRepoContext(cwd = process.cwd(), overrides = {}) {
  let repoRoot;
  let gitDir;
  const fastRepo = findGitRepoFast(cwd);
  if (fastRepo) {
    repoRoot = fastRepo.repoRoot;
    gitDir = fastRepo.gitDir;
  } else {
    const top = runGit(['rev-parse', '--show-toplevel'], { cwd });
    if (top.status !== 0) {
      throw new Error(`Not inside a Git repository (cwd=${cwd}).`);
    }
    repoRoot = top.stdout.trim();
    const gitDirRaw = runGitOrThrow(['rev-parse', '--git-dir'], { cwd: repoRoot }).trim();
    gitDir = path.isAbsolute(gitDirRaw) ? gitDirRaw : path.resolve(repoRoot, gitDirRaw);
  }
  const cfg = loadConfig(repoRoot, overrides);

  // Resolve HEAD & current branch directly from .git/HEAD
  let headSha = null;
  let isDetached = true;
  let branch = 'HEAD';
  const headPath = path.join(gitDir, 'HEAD');
  let resolvedHeadDirectly = false;
  if (fs.existsSync(headPath)) {
    try {
      const headRaw = fs.readFileSync(headPath, 'utf8').trim();
      if (headRaw.startsWith('ref: ')) {
        const refName = headRaw.slice(5).trim();
        isDetached = false;
        branch = refName.startsWith('refs/heads/') ? refName.slice('refs/heads/'.length) : refName;
        headSha = resolveLocalRef(gitDir, refName);
        resolvedHeadDirectly = true;
      } else if (/^[0-9a-f]{40}$/i.test(headRaw)) {
        isDetached = true;
        branch = 'HEAD';
        headSha = headRaw;
        resolvedHeadDirectly = true;
      }
    } catch {
      resolvedHeadDirectly = false;
    }
  }
  if (!resolvedHeadDirectly) {
    const headRes = runGit(['rev-parse', '--verify', 'HEAD'], { cwd: repoRoot });
    headSha = headRes.status === 0 ? headRes.stdout.trim() : null;
    const branchRes = runGit(['symbolic-ref', '--short', 'HEAD'], { cwd: repoRoot });
    isDetached = branchRes.status !== 0;
    branch = isDetached ? 'HEAD' : branchRes.stdout.trim();
  }

  // Resolve default branch from remote HEAD ref file if available
  let defaultBranch = cfg.defaultBranch || 'main';
  const remoteHeadPath = path.join(gitDir, 'refs', 'remotes', cfg.remote, 'HEAD');
  if (fs.existsSync(remoteHeadPath)) {
    try {
      const raw = fs.readFileSync(remoteHeadPath, 'utf8').trim();
      if (raw.startsWith('ref: ')) {
        const parts = raw.slice(5).trim().split('/');
        if (parts.length > 0) defaultBranch = parts[parts.length - 1];
      }
    } catch {
      // keep cfg default
    }
  } else {
    const symRemote = runGit(['symbolic-ref', `refs/remotes/${cfg.remote}/HEAD`], { cwd: repoRoot });
    if (symRemote.status === 0) {
      const parts = symRemote.stdout.trim().split('/');
      if (parts.length > 0) defaultBranch = parts[parts.length - 1];
    }
  }

  // Resolve remote URL directly from .git/config when present (fallback to git remote get-url)
  let remoteUrl = null;
  const gitConfigPath = path.join(gitDir, 'config');
  if (fs.existsSync(gitConfigPath)) {
    try {
      const cfgText = fs.readFileSync(gitConfigPath, 'utf8');
      if (!/^\s*\[include/mi.test(cfgText)) {
        remoteUrl = parseGitConfigSectionValue(cfgText, `remote "${cfg.remote}"`, 'url');
      } else {
        const remoteUrlRes = runGit(['remote', 'get-url', cfg.remote], { cwd: repoRoot });
        remoteUrl = remoteUrlRes.status === 0 ? remoteUrlRes.stdout.trim() : null;
      }
    } catch {
      const remoteUrlRes = runGit(['remote', 'get-url', cfg.remote], { cwd: repoRoot });
      remoteUrl = remoteUrlRes.status === 0 ? remoteUrlRes.stdout.trim() : null;
    }
  } else {
    const remoteUrlRes = runGit(['remote', 'get-url', cfg.remote], { cwd: repoRoot });
    remoteUrl = remoteUrlRes.status === 0 ? remoteUrlRes.stdout.trim() : null;
  }
  const hasRemote = Boolean(remoteUrl);

  const vaultDir = path.join(gitDir, 'bg-vault');
  fs.mkdirSync(vaultDir, { recursive: true });

  const slug = sanitizeSlug(isDetached ? `detached-${(headSha || 'init').slice(0, 8)}` : branch);

  return {
    repoRoot,
    gitDir,
    vaultDir,
    cfg,
    headSha,
    branch,
    isDetached,
    defaultBranch,
    remote: cfg.remote,
    hasRemote,
    remoteUrl,
    slug,
    hostname: os.hostname(),
  };
}

function parseWorkingFilesRaw(repoRoot, cfg, stdoutBuf) {
  const rawList = stdoutBuf.toString('utf8').split('\0').filter(Boolean);
  const seen = new Set();
  const liveFiles = [];
  const deletedFiles = [];
  const skippedLarge = [];
  const maxBytes = Math.max(1, Number(cfg.maxFileMb || 25)) * 1024 * 1024;
  const excludes = cfg.excludeVaultGlobs || [];

  for (const rel of rawList) {
    if (seen.has(rel)) continue;
    seen.add(rel);
    if (rel.startsWith('_bg_meta/')) continue;
    if (excludes.some((pat) => matchGlob(rel, pat))) continue;

    const abs = path.join(repoRoot, rel);
    const st = fs.lstatSync(abs, { bigint: true, throwIfNoEntry: false });
    if (!st) {
      deletedFiles.push(rel);
      continue;
    }
    if (st.isDirectory()) continue;
    const sizeNum = Number(st.size);
    if (sizeNum > maxBytes) {
      skippedLarge.push({ path: rel, bytes: sizeNum });
      continue;
    }
    const isSym = st.isSymbolicLink();
    liveFiles.push({
      path: rel,
      absPath: abs,
      size: sizeNum,
      ino: st.ino.toString(),
      mtimeNs: st.mtimeNs,
      ctimeNs: st.ctimeNs,
      isSymlink: isSym,
      mode: isSym ? '120000' : (Number(st.mode) & 0o111) !== 0 ? '100755' : '100644',
    });
  }
  liveFiles.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  deletedFiles.sort();
  return { liveFiles, deletedFiles, skippedLarge };
}

function parsePorcelainRaw(stdoutBuf) {
  const tokens = stdoutBuf.toString('utf8').split('\0');
  const modified = [];
  const staged = [];
  const untracked = [];
  const deleted = [];
  const allDirty = [];

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (!tok) continue;
    const x = tok[0];
    const y = tok[1];
    const rel = tok.slice(3);
    if (x === 'R' || x === 'C' || y === 'R' || y === 'C') {
      i += 1; // skip original rename path token
    }
    if (x === '?' && y === '?') {
      untracked.push(rel);
      allDirty.push({ code: '??', path: rel });
    } else {
      if (x !== ' ' && x !== '?') staged.push(rel);
      if (y === 'D' || x === 'D') deleted.push(rel);
      else if (y !== ' ') modified.push(rel);
      allDirty.push({ code: `${x}${y}`, path: rel });
    }
  }
  return {
    isClean: allDirty.length === 0,
    modified,
    staged,
    untracked,
    deleted,
    allDirty,
  };
}

/**
 * List tracked + untracked non-ignored working files (filtered by excludeVaultGlobs).
 */
export function listWorkingFiles(repoRoot, cfg) {
  const res = runGit(['ls-files', '--cached', '--others', '--exclude-standard', '-z'], {
    cwd: repoRoot,
    buffer: true,
  });
  if (res.status !== 0) {
    throw new Error(`git ls-files failed: ${res.stderr}`);
  }
  return parseWorkingFilesRaw(repoRoot, cfg, res.stdout);
}

/**
 * Run git status & git ls-files concurrently for minimal wall latency.
 */
export async function getPorcelainAndWorkingFilesAsync(repoRoot, cfg) {
  const [stRes, lsRes] = await Promise.all([
    runGitAsync(['status', '--porcelain=v1', '-uall', '-z'], { cwd: repoRoot, buffer: true }),
    runGitAsync(['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { cwd: repoRoot, buffer: true }),
  ]);
  if (stRes.status !== 0) throw new Error(`git status failed: ${stRes.stderr}`);
  if (lsRes.status !== 0) throw new Error(`git ls-files failed: ${lsRes.stderr}`);
  return {
    porcelain: parsePorcelainRaw(stRes.stdout),
    working: parseWorkingFilesRaw(repoRoot, cfg, lsRes.stdout),
  };
}

/**
 * Compute deterministic SHA-256 manifest + combined fingerprint of working tree.
 * Uses racy-git-safe (size, ino, mtimeNs, ctimeNs) SHA-256 cache under .git/bg-vault/sha_cache.json.
 * Any file modified within the last 2 seconds is ALWAYS re-hashed fresh to guarantee 0% racy staleness.
 */
export function buildWorkingManifest(repoRoot, liveFiles, deletedFiles, metaDigest = '', opts = {}) {
  const entries = [];
  const fpHash = crypto.createHash('sha256');
  fpHash.update(`meta:${metaDigest}\n`);

  const defaultCachePath = path.join(repoRoot, '.git', 'bg-vault', 'sha_cache.json');
  const cachePath = opts.cachePath || (fs.existsSync(path.dirname(defaultCachePath)) ? defaultCachePath : null);
  let shaCache = null;
  let cacheDirty = false;
  if (cachePath && fs.existsSync(cachePath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      if (parsed && parsed.v === 1 && parsed.files && typeof parsed.files === 'object') {
        shaCache = parsed.files;
      }
    } catch {
      shaCache = null;
    }
  }
  if (!shaCache && cachePath) {
    shaCache = {};
  }
  const nowNs = BigInt(Date.now()) * 1_000_000n;
  const RACY_WINDOW_NS = 2_000_000_000n; // 2s racy-git protection window

  for (const f of liveFiles) {
    let digest;
    if (f.isSymlink) {
      const target = fs.readlinkSync(f.absPath);
      digest = sha256String(`symlink:${target}`);
    } else {
      const hasStat = typeof f.mtimeNs === 'bigint' && typeof f.ctimeNs === 'bigint' && f.ino != null;
      const isRacy = !hasStat || (nowNs - f.mtimeNs < RACY_WINDOW_NS && nowNs >= f.mtimeNs);
      const sig = hasStat ? `${f.size}:${f.ino}:${f.mtimeNs.toString()}:${f.ctimeNs.toString()}` : null;
      const cached = shaCache && sig && !isRacy ? shaCache[f.path] : null;
      if (cached && cached.sig === sig && typeof cached.sha === 'string') {
        digest = cached.sha;
      } else {
        digest = sha256File(f.absPath);
        if (shaCache && sig && !isRacy) {
          shaCache[f.path] = { sig, sha: digest };
          cacheDirty = true;
        }
      }
    }
    entries.push({
      path: f.path,
      sha256: digest,
      size: f.size,
      mode: f.mode,
    });
    fpHash.update(`${f.mode} ${digest} ${f.path}\n`);
  }
  for (const d of deletedFiles) {
    fpHash.update(`DELETED ${d}\n`);
    if (shaCache && d in shaCache) {
      delete shaCache[d];
      cacheDirty = true;
    }
  }

  if (cachePath && cacheDirty && shaCache) {
    try {
      atomicWriteFileSync(cachePath, JSON.stringify({ v: 1, files: shaCache }));
    } catch {
      // non-fatal cache write error
    }
  }

  return {
    entries,
    deletedFiles,
    fingerprint: fpHash.digest('hex'),
  };
}

/**
 * Get short git status summary (tracked modified, staged, untracked, deleted).
 */
export function getPorcelainStatus(repoRoot) {
  const res = runGit(['status', '--porcelain=v1', '-uall', '-z'], { cwd: repoRoot, buffer: true });
  if (res.status !== 0) {
    throw new Error(`git status failed: ${res.stderr}`);
  }
  const tokens = res.stdout.toString('utf8').split('\0');
  const modified = [];
  const staged = [];
  const untracked = [];
  const deleted = [];
  const allDirty = [];

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (!tok) continue;
    const x = tok[0];
    const y = tok[1];
    const rel = tok.slice(3);
    if (x === 'R' || x === 'C' || y === 'R' || y === 'C') {
      i += 1; // skip original rename path token
    }
    if (x === '?' && y === '?') {
      untracked.push(rel);
      allDirty.push({ code: '??', path: rel });
    } else {
      if (x !== ' ' && x !== '?') staged.push(rel);
      if (y === 'D' || x === 'D') deleted.push(rel);
      else if (y !== ' ') modified.push(rel);
      allDirty.push({ code: `${x}${y}`, path: rel });
    }
  }
  return {
    isClean: allDirty.length === 0,
    modified,
    staged,
    untracked,
    deleted,
    allDirty,
  };
}

function formatFastImportPath(relPath) {
  if (/[\n"\\]/.test(relPath) || relPath.startsWith('"')) {
    return `"${relPath.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  return relPath;
}

/**
 * Create a completely non-intrusive shadow snapshot commit (BG-01).
 * Never alters HEAD, never touches .git/index, never modifies working tree files.
 * Fast path: single-process `git fast-import` stream (<= 48 MB total payload).
 * Fallback: chunked `git hash-object` + temporary GIT_INDEX_FILE for huge trees.
 */
export function createShadowSnapshotCommit({
  repoRoot,
  parentOid,
  baseSha,
  liveFiles,
  metaEntries = [],
  message,
}) {
  const ident = getGitIdentityPair(repoRoot);
  const totalBytes =
    liveFiles.reduce((acc, f) => acc + (f.size || 0), 0) +
    metaEntries.reduce((acc, m) => acc + (Buffer.isBuffer(m.content) ? m.content.length : Buffer.byteLength(String(m.content), 'utf8')), 0);

  // Fast path: single-process `git fast-import` (eliminates 8+ git subprocess spawns & temp index I/O)
  if (totalBytes <= 48 * 1024 * 1024) {
    const fastRepo = findGitRepoFast(repoRoot);
    const gitDir = fastRepo ? fastRepo.gitDir : path.join(repoRoot, '.git');
    if (fs.existsSync(gitDir)) {
      const tmpRef = `refs/bg-tmp/snap-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
      const unixSec = Math.floor(Date.now() / 1000);
      const msgBuf = Buffer.from(String(message), 'utf8');
      const chunks = [];
      chunks.push(
        Buffer.from(
          `commit ${tmpRef}\n` +
            `author ${ident.name} <${ident.email}> ${unixSec} +0000\n` +
            `committer ${ident.name} <${ident.email}> ${unixSec} +0000\n` +
            `data ${msgBuf.length}\n`,
          'utf8'
        )
      );
      chunks.push(msgBuf, Buffer.from('\n', 'utf8'));
      const parent = parentOid || baseSha;
      if (parent) {
        chunks.push(Buffer.from(`from ${parent}\n`, 'utf8'));
      }
      chunks.push(Buffer.from('deleteall\n', 'utf8'));

      for (const f of liveFiles) {
        const contentBuf = f.isSymlink
          ? Buffer.from(fs.readlinkSync(f.absPath), 'utf8')
          : fs.readFileSync(f.absPath);
        chunks.push(
          Buffer.from(`M ${f.mode} inline ${formatFastImportPath(f.path)}\ndata ${contentBuf.length}\n`, 'utf8'),
          contentBuf,
          Buffer.from('\n', 'utf8')
        );
      }
      for (const m of metaEntries) {
        const contentBuf = Buffer.isBuffer(m.content) ? m.content : Buffer.from(String(m.content), 'utf8');
        chunks.push(
          Buffer.from(`M 100644 inline ${formatFastImportPath(m.path)}\ndata ${contentBuf.length}\n`, 'utf8'),
          contentBuf,
          Buffer.from('\n', 'utf8')
        );
      }
      chunks.push(Buffer.from('done\n', 'utf8'));

      const fiRes = runGit(['fast-import', '--quiet', '--done', '--force'], {
        cwd: repoRoot,
        input: Buffer.concat(chunks),
        maxBuffer: 16 * 1024 * 1024,
      });
      if (fiRes.status === 0) {
        try {
          const commitOid =
            resolveLocalRef(gitDir, tmpRef) ||
            runGitOrThrow(['rev-parse', '--verify', tmpRef], { cwd: repoRoot }).trim();
          const treeOid = runGitOrThrow(['rev-parse', `${commitOid}^{tree}`], { cwd: repoRoot }).trim();
          return { treeOid, commitOid };
        } finally {
          try {
            const refFile = path.join(gitDir, tmpRef);
            if (fs.existsSync(refFile)) fs.unlinkSync(refFile);
            else runGit(['update-ref', '-d', tmpRef], { cwd: repoRoot });
          } catch {
            // ignore
          }
        }
      }
    }
  }

  // Fallback path for >48MB repos: streaming chunked hash-object + temp GIT_INDEX_FILE
  const tmpIndex = path.join(os.tmpdir(), `bg-idx-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const env = { GIT_INDEX_FILE: tmpIndex };

  try {
    const indexLines = [];
    const regularFiles = liveFiles.filter((f) => !f.isSymlink);
    const symlinks = liveFiles.filter((f) => f.isSymlink);

    if (regularFiles.length > 0) {
      const chunkSize = 500;
      for (let i = 0; i < regularFiles.length; i += chunkSize) {
        const chunk = regularFiles.slice(i, i + chunkSize);
        const input = chunk.map((f) => f.absPath).join('\n') + '\n';
        const out = runGitOrThrow(['hash-object', '-w', '--stdin-paths'], { cwd: repoRoot, input });
        const oids = out.trim().split('\n');
        if (oids.length !== chunk.length) {
          throw new Error(`hash-object count mismatch (${oids.length} vs ${chunk.length})`);
        }
        for (let j = 0; j < chunk.length; j++) {
          indexLines.push(`${chunk[j].mode} ${oids[j].trim()}\t${chunk[j].path}`);
        }
      }
    }

    for (const sym of symlinks) {
      const target = fs.readlinkSync(sym.absPath);
      const oid = runGitOrThrow(['hash-object', '-w', '--stdin'], { cwd: repoRoot, input: target }).trim();
      indexLines.push(`120000 ${oid}\t${sym.path}`);
    }

    for (const m of metaEntries) {
      const contentBuf = Buffer.isBuffer(m.content) ? m.content : Buffer.from(String(m.content), 'utf8');
      const oid = runGitOrThrow(['hash-object', '-w', '--stdin'], { cwd: repoRoot, input: contentBuf }).trim();
      indexLines.push(`100644 ${oid}\t${m.path}`);
    }

    if (indexLines.length > 0) {
      runGitOrThrow(['update-index', '--index-info'], {
        cwd: repoRoot,
        env,
        input: indexLines.join('\n') + '\n',
      });
    }

    const treeOid = runGitOrThrow(['write-tree'], { cwd: repoRoot, env }).trim();

    const commitArgs = ['commit-tree', treeOid];
    if (parentOid) {
      commitArgs.push('-p', parentOid);
    } else if (baseSha) {
      commitArgs.push('-p', baseSha);
    }
    const commitEnv = {
      ...env,
      GIT_AUTHOR_NAME: ident.name,
      GIT_AUTHOR_EMAIL: ident.email,
      GIT_COMMITTER_NAME: ident.name,
      GIT_COMMITTER_EMAIL: ident.email,
    };
    const commitOid = runGitOrThrow(commitArgs, {
      cwd: repoRoot,
      env: commitEnv,
      input: message,
    }).trim();

    return { treeOid, commitOid };
  } finally {
    try {
      if (fs.existsSync(tmpIndex)) fs.unlinkSync(tmpIndex);
    } catch {
      // ignore
    }
  }
}

function getGitIdentityPair(repoRoot) {
  let name = null;
  let email = null;
  try {
    const cfgPath = path.join(repoRoot, '.git', 'config');
    if (fs.existsSync(cfgPath)) {
      const text = fs.readFileSync(cfgPath, 'utf8');
      name = parseGitConfigSectionValue(text, 'user', 'name');
      email = parseGitConfigSectionValue(text, 'user', 'email');
    }
  } catch {
    // fallback below
  }
  if (!name) {
    const r = runGit(['config', '--get', 'user.name'], { cwd: repoRoot });
    name = r.status === 0 && r.stdout.trim() ? r.stdout.trim() : 'Buchigire Guard';
  }
  if (!email) {
    const r = runGit(['config', '--get', 'user.email'], { cwd: repoRoot });
    email = r.status === 0 && r.stdout.trim() ? r.stdout.trim() : 'bg-guard@local';
  }
  return { name, email };
}

/**
 * Push vault snapshot to remote with Dual-Tier Namespace Fallback (BG-02)
 * AND strict `git ls-remote` OID read-back verification (BG-05).
 */
export function pushVaultWithReadback({ repoRoot, remote, localOid, slug, cfg }) {
  const tier1Ref = `${cfg.vaultNamespace.replace(/\/+$/, '')}/${slug}`;
  const tier2Ref = `${cfg.vaultFallbackNamespace.replace(/\/+$/, '')}/${slug}`;

  // Always update local vault ref mirror first
  runGitOrThrow(['update-ref', tier1Ref, localOid], { cwd: repoRoot });

  const tryPush = (targetRef) => {
    const pushRes = runGit(['push', '--force', remote, `${localOid}:${targetRef}`], { cwd: repoRoot });
    if (pushRes.status !== 0) {
      return { ok: false, targetRef, error: pushRes.stderr.trim() || pushRes.stdout.trim() };
    }
    // BG-05: Strict remote read-back verification
    const verifyRes = runGit(['ls-remote', remote, targetRef], { cwd: repoRoot });
    if (verifyRes.status !== 0) {
      return { ok: false, targetRef, error: `ls-remote verification failed: ${verifyRes.stderr.trim()}` };
    }
    const line = verifyRes.stdout
      .trim()
      .split('\n')
      .find((l) => l.endsWith(`\t${targetRef}`));
    const remoteOid = line ? line.split('\t')[0].trim() : null;
    if (remoteOid !== localOid) {
      return {
        ok: false,
        targetRef,
        error: `Remote OID read-back mismatch (expected ${localOid}, got ${remoteOid || 'NONE'})`,
      };
    }
    return { ok: true, targetRef, remoteOid };
  };

  // Attempt Tier 1: invisible custom ref refs/bg-vault/<slug>
  const t1 = tryPush(tier1Ref);
  if (t1.ok) {
    return {
      remoteVerified: true,
      tier: 'tier1_custom_ref',
      remoteRef: tier1Ref,
      localRef: tier1Ref,
      remoteOid: t1.remoteOid,
      error: null,
    };
  }

  // Attempt Tier 2 fallback: refs/heads/bg-vault/<slug>
  const t2 = tryPush(tier2Ref);
  if (t2.ok) {
    return {
      remoteVerified: true,
      tier: 'tier2_fallback_branch',
      remoteRef: tier2Ref,
      localRef: tier1Ref,
      remoteOid: t2.remoteOid,
      fallbackReason: t1.error,
      error: null,
    };
  }

  return {
    remoteVerified: false,
    tier: 'local_only',
    remoteRef: null,
    localRef: tier1Ref,
    remoteOid: null,
    error: `Tier1(${t1.error}) | Tier2(${t2.error})`,
  };
}

/**
 * Fetch remote vault refs (both Tier 1 and Tier 2) cleanly without failing when empty.
 */
export function fetchRemoteVaults(ctx) {
  if (!ctx.hasRemote) return { fetched: false, remoteVaults: [] };
  const ns1 = ctx.cfg.vaultNamespace.replace(/\/+$/, '');
  const ns2 = ctx.cfg.vaultFallbackNamespace.replace(/\/+$/, '');

  const ls = runGit(['ls-remote', ctx.remote, `${ns1}/*`, `${ns2}/*`], { cwd: ctx.repoRoot });
  if (ls.status !== 0) {
    return { fetched: false, remoteVaults: [], error: ls.stderr.trim() };
  }

  const remoteVaults = [];
  const fetchSpecs = [];
  for (const rawLine of ls.stdout.trim().split('\n')) {
    if (!rawLine.trim()) continue;
    const [oid, ref] = rawLine.split('\t');
    if (!oid || !ref) continue;
    let slug = null;
    let tier = 'tier1_custom_ref';
    if (ref.startsWith(`${ns1}/`)) {
      slug = ref.slice(ns1.length + 1);
      tier = 'tier1_custom_ref';
    } else if (ref.startsWith(`${ns2}/`)) {
      slug = ref.slice(ns2.length + 1);
      tier = 'tier2_fallback_branch';
    }
    if (!slug) continue;
    const localMirror = `refs/bg-remote/${slug}`;
    fetchSpecs.push(`+${ref}:${localMirror}`);
    remoteVaults.push({ oid, remoteRef: ref, localMirror, slug, tier });
  }

  if (fetchSpecs.length > 0) {
    runGit(['fetch', '--no-tags', ctx.remote, ...fetchSpecs], { cwd: ctx.repoRoot });
  }

  return { fetched: true, remoteVaults };
}

/**
 * Zero-mutation in-memory virtual merge simulation using git merge-tree --write-tree (BG-24).
 */
export function simulateVirtualMerge(repoRoot, headRef, targetRef) {
  const res = runGit(['merge-tree', '--write-tree', '--name-only', '--messages', headRef, targetRef], {
    cwd: repoRoot,
  });
  const lines = res.stdout.split('\n');
  const treeOid = (lines[0] || '').trim();

  if (res.status === 0) {
    return { clean: true, treeOid, conflicts: [], messages: [] };
  }
  if (res.status === 1) {
    // Parse conflicted file list between treeOid and blank line
    const conflicts = [];
    const messages = [];
    let inMessages = false;
    for (let i = 1; i < lines.length; i++) {
      const l = lines[i];
      if (!inMessages) {
        if (l.trim() === '') {
          inMessages = true;
        } else {
          conflicts.push(l.trim());
        }
      } else if (l.trim()) {
        messages.push(l.trim());
      }
    }
    return { clean: false, treeOid, conflicts: [...new Set(conflicts)], messages };
  }
  return {
    clean: false,
    treeOid: null,
    conflicts: [],
    messages: [res.stderr.trim() || `merge-tree failed with exit ${res.status}`],
  };
}

/**
 * Export portable offline .bgbundle + .sha256 archive (BG-07).
 */
export function exportOfflineBundle(repoRoot, refName, outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  runGitOrThrow(['bundle', 'create', outPath, refName], { cwd: repoRoot });
  const digest = sha256File(outPath);
  const shaPath = `${outPath}.sha256`;
  atomicWriteFileSync(shaPath, `${digest}  ${path.basename(outPath)}\n`);
  return { bundlePath: outPath, shaPath, sha256: digest, bytes: fs.statSync(outPath).size };
}

export function isGhAvailable(cwd) {
  try {
    execFileSync('gh', ['auth', 'status'], { cwd, stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}
