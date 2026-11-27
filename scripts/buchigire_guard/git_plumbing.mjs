/**
 * Buchigire Guard v1 (bg) — Low-Level Git Plumbing, Locking & Atomic I/O Kernel
 * Zero external dependencies (Pure Node.js 22 + Git 2.38+).
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';

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
 * Simple glob matcher supporting **, *, ? on POSIX relative paths.
 */
export function matchGlob(relPath, pattern) {
  const normPath = relPath.replace(/\\/g, '/').replace(/^\.\//, '');
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
  return new RegExp(rx).test(normPath);
}

export function sanitizeSlug(name) {
  return String(name || 'detached')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'session';
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
 * Detect full Git repository context.
 */
export function getRepoContext(cwd = process.cwd(), overrides = {}) {
  const top = runGit(['rev-parse', '--show-toplevel'], { cwd });
  if (top.status !== 0) {
    throw new Error(`Not inside a Git repository (cwd=${cwd}).`);
  }
  const repoRoot = top.stdout.trim();
  const gitDirRaw = runGitOrThrow(['rev-parse', '--git-dir'], { cwd: repoRoot }).trim();
  const gitDir = path.isAbsolute(gitDirRaw) ? gitDirRaw : path.resolve(repoRoot, gitDirRaw);
  const cfg = loadConfig(repoRoot, overrides);

  const headRes = runGit(['rev-parse', '--verify', 'HEAD'], { cwd: repoRoot });
  const headSha = headRes.status === 0 ? headRes.stdout.trim() : null;

  const branchRes = runGit(['symbolic-ref', '--short', 'HEAD'], { cwd: repoRoot });
  const isDetached = branchRes.status !== 0;
  const branch = isDetached ? 'HEAD' : branchRes.stdout.trim();

  // Resolve default branch from remote HEAD if available
  let defaultBranch = cfg.defaultBranch || 'main';
  const symRemote = runGit(['symbolic-ref', `refs/remotes/${cfg.remote}/HEAD`], { cwd: repoRoot });
  if (symRemote.status === 0) {
    const parts = symRemote.stdout.trim().split('/');
    if (parts.length > 0) defaultBranch = parts[parts.length - 1];
  }

  const remoteUrlRes = runGit(['remote', 'get-url', cfg.remote], { cwd: repoRoot });
  const hasRemote = remoteUrlRes.status === 0;
  const remoteUrl = hasRemote ? remoteUrlRes.stdout.trim() : null;

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
  const rawList = res.stdout.toString('utf8').split('\0').filter(Boolean);
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
    let st;
    try {
      st = fs.lstatSync(abs);
    } catch {
      deletedFiles.push(rel);
      continue;
    }
    if (st.isDirectory()) continue;
    if (st.size > maxBytes) {
      skippedLarge.push({ path: rel, bytes: st.size });
      continue;
    }
    liveFiles.push({
      path: rel,
      absPath: abs,
      size: st.size,
      isSymlink: st.isSymbolicLink(),
      mode: st.isSymbolicLink() ? '120000' : (st.mode & 0o111) !== 0 ? '100755' : '100644',
    });
  }
  liveFiles.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  deletedFiles.sort();
  return { liveFiles, deletedFiles, skippedLarge };
}

/**
 * Compute deterministic SHA-256 manifest + combined fingerprint of working tree.
 */
export function buildWorkingManifest(repoRoot, liveFiles, deletedFiles, metaDigest = '') {
  const entries = [];
  const fpHash = crypto.createHash('sha256');
  fpHash.update(`meta:${metaDigest}\n`);

  for (const f of liveFiles) {
    let digest;
    if (f.isSymlink) {
      const target = fs.readlinkSync(f.absPath);
      digest = sha256String(`symlink:${target}`);
    } else {
      digest = sha256File(f.absPath);
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

/**
 * Create a completely non-intrusive shadow snapshot commit using a temporary GIT_INDEX_FILE (BG-01).
 * Never alters HEAD, never touches .git/index, never modifies working tree files.
 */
export function createShadowSnapshotCommit({
  repoRoot,
  parentOid,
  baseSha,
  liveFiles,
  metaEntries = [],
  message,
}) {
  const tmpIndex = path.join(os.tmpdir(), `bg-idx-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const env = { GIT_INDEX_FILE: tmpIndex };

  try {
    // 1. Batch-hash regular files into git object database via git hash-object -w --stdin-paths
    const indexLines = [];
    const regularFiles = liveFiles.filter((f) => !f.isSymlink);
    const symlinks = liveFiles.filter((f) => f.isSymlink);

    if (regularFiles.length > 0) {
      // Chunk into groups of 500 paths to stay well within pipe buffers
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

    // 2. Hash embedded _bg_meta entries (MANIFEST.json, flight_recorder.json, artifacts)
    for (const m of metaEntries) {
      const contentBuf = Buffer.isBuffer(m.content) ? m.content : Buffer.from(String(m.content), 'utf8');
      const oid = runGitOrThrow(['hash-object', '-w', '--stdin'], { cwd: repoRoot, input: contentBuf }).trim();
      indexLines.push(`100644 ${oid}\t${m.path}`);
    }

    // 3. Populate isolated shadow index
    if (indexLines.length > 0) {
      runGitOrThrow(['update-index', '--index-info'], {
        cwd: repoRoot,
        env,
        input: indexLines.join('\n') + '\n',
      });
    }

    // 4. Write tree from shadow index
    const treeOid = runGitOrThrow(['write-tree'], { cwd: repoRoot, env }).trim();

    // 5. Build commit object chaining parent vault snapshot (or baseSha if first snapshot)
    const commitArgs = ['commit-tree', treeOid];
    if (parentOid) {
      commitArgs.push('-p', parentOid);
    } else if (baseSha) {
      commitArgs.push('-p', baseSha);
    }
    const commitEnv = {
      ...env,
      GIT_AUTHOR_NAME: getGitIdentity(repoRoot, 'user.name', 'Buchigire Guard'),
      GIT_AUTHOR_EMAIL: getGitIdentity(repoRoot, 'user.email', 'bg-guard@local'),
      GIT_COMMITTER_NAME: getGitIdentity(repoRoot, 'user.name', 'Buchigire Guard'),
      GIT_COMMITTER_EMAIL: getGitIdentity(repoRoot, 'user.email', 'bg-guard@local'),
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

function getGitIdentity(repoRoot, key, fallback) {
  const r = runGit(['config', '--get', key], { cwd: repoRoot });
  return r.status === 0 && r.stdout.trim() ? r.stdout.trim() : fallback;
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
