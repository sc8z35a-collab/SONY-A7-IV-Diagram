/**
 * Buchigire Guard v1 (bg) — Off-VM Vault, Flight Recorder, Artifact Mirror,
 * 3-Mode Disaster Recovery, Watchdog Daemon, Boot Discovery & Vault GC Engine.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {
  EXIT_BLOCKED,
  EXIT_OK,
  EXIT_WARN,
  acquireLock,
  atomicWriteFileSync,
  buildWorkingManifest,
  createShadowSnapshotCommit,
  exportOfflineBundle,
  fetchRemoteVaults,
  getPorcelainStatus,
  getRepoContext,
  listWorkingFiles,
  pushVaultWithReadback,
  releaseLock,
  resolveLocalRef,
  runGit,
  runGitOrThrow,
  sanitizeSlug,
  sha256File,
  sha256String,
} from './git_plumbing.mjs';
import { scanHygieneAndBloat, scanSecrets } from './safety_scanners.mjs';

const FLIGHT_RECORDER_FILE = 'flight_recorder.json';
const JOURNAL_FILE = 'journal.jsonl';
const MAX_ARTIFACT_BYTES = 2 * 1024 * 1024; // 2 MB per mirrored artifact .md

export function readFlightRecorder(ctx) {
  const p = path.join(ctx.vaultDir, FLIGHT_RECORDER_FILE);
  if (!fs.existsSync(p)) {
    return {
      schema: 'bg-flight/v1',
      sessionId: `${ctx.slug}-${Date.now().toString(36)}`,
      branch: ctx.branch,
      goal: '',
      completed: [],
      verifiedGates: [],
      knownPitfalls: [],
      nextStep: '',
      artifactsMirrored: [],
      updatedAt: null,
      vmHost: ctx.hostname,
      baseSha: ctx.headSha,
    };
  }
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return {
      schema: 'bg-flight/v1',
      sessionId: `${ctx.slug}-${Date.now().toString(36)}`,
      branch: ctx.branch,
      goal: '',
      completed: [],
      verifiedGates: [],
      knownPitfalls: [],
      nextStep: '',
      artifactsMirrored: [],
      updatedAt: null,
      vmHost: ctx.hostname,
      baseSha: ctx.headSha,
    };
  }
}

export function writeFlightRecorder(ctx, patch = {}) {
  const cur = readFlightRecorder(ctx);
  const next = {
    ...cur,
    ...patch,
    branch: ctx.branch,
    vmHost: ctx.hostname,
    baseSha: ctx.headSha,
    updatedAt: new Date().toISOString(),
  };
  if (patch.addCompleted) {
    next.completed = [...new Set([...(cur.completed || []), patch.addCompleted])];
    delete next.addCompleted;
  }
  if (patch.addPitfall) {
    next.knownPitfalls = [...new Set([...(cur.knownPitfalls || []), patch.addPitfall])];
    delete next.addPitfall;
  }
  atomicWriteFileSync(path.join(ctx.vaultDir, FLIGHT_RECORDER_FILE), JSON.stringify(next, null, 2) + '\n');
  return next;
}

export function readJournal(ctx) {
  const p = path.join(ctx.vaultDir, JOURNAL_FILE);
  if (!fs.existsSync(p)) return [];
  const lines = fs.readFileSync(p, 'utf8').split('\n').filter(Boolean);
  const out = [];
  for (const l of lines) {
    try {
      out.push(JSON.parse(l));
    } catch {
      // ignore corrupted trailing line
    }
  }
  return out;
}

function appendJournal(ctx, entry) {
  const p = path.join(ctx.vaultDir, JOURNAL_FILE);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.appendFileSync(p, JSON.stringify(entry) + '\n', 'utf8');
}

/**
 * Collect .md / .json plan & walkthrough artifacts from --artifacts=<dir> (BG-12).
 */
function collectMirroredArtifacts(artifactsDir) {
  if (!artifactsDir) return [];
  const resolved = path.resolve(artifactsDir);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) return [];
  const entries = [];
  const items = fs.readdirSync(resolved);
  for (const name of items) {
    if (!name.endsWith('.md') && !name.endsWith('.json')) continue;
    if (name.startsWith('.')) continue;
    const abs = path.join(resolved, name);
    try {
      const st = fs.lstatSync(abs);
      if (!st.isFile() || st.size === 0 || st.size > MAX_ARTIFACT_BYTES) continue;
      const buf = fs.readFileSync(abs);
      entries.push({
        name,
        metaPath: `_bg_meta/artifacts/${name}`,
        content: buf,
        sha256: sha256String(buf.toString('utf8')),
        size: st.size,
      });
    } catch {
      // ignore
    }
  }
  entries.sort((a, b) => (a.name < b.name ? -1 : 1));
  return entries;
}

/**
 * Read current local vault parent OID for chaining history (BG-13).
 */
function getCurrentVaultParent(ctx) {
  const tier1Ref = `${ctx.cfg.vaultNamespace.replace(/\/+$/, '')}/${ctx.slug}`;
  const local = resolveLocalRef(ctx.gitDir, tier1Ref);
  if (local) return local;
  const rem = resolveLocalRef(ctx.gitDir, `refs/bg-remote/${ctx.slug}`);
  if (rem) return rem;
  return null;
}

/**
 * Inspect embedded _bg_meta/MANIFEST.json and _bg_meta/flight_recorder.json from a vault commit
 * via a single batched `git cat-file --batch` invocation (3 spawns -> 1 spawn).
 */
export function readVaultCommitMetadata(repoRoot, commitOid) {
  const input = `${commitOid}\n${commitOid}:_bg_meta/MANIFEST.json\n${commitOid}:_bg_meta/flight_recorder.json\n`;
  const res = runGit(['cat-file', '--batch'], { cwd: repoRoot, input, buffer: true });
  let commitTime = 0;
  let commitIso = null;
  let subject = '';
  let manifest = null;
  let flight = null;

  if (res.status === 0 && Buffer.isBuffer(res.stdout) && res.stdout.length > 0) {
    const buf = res.stdout;
    const objects = [];
    let offset = 0;
    while (offset < buf.length && objects.length < 3) {
      const nl = buf.indexOf(0x0a, offset);
      if (nl < 0) break;
      const header = buf.subarray(offset, nl).toString('utf8');
      offset = nl + 1;
      if (header.endsWith(' missing')) {
        objects.push(null);
        continue;
      }
      const parts = header.split(' ');
      const size = Number.parseInt(parts[2] || '0', 10);
      const body = buf.subarray(offset, offset + size).toString('utf8');
      offset += size + 1; // trailing LF after each object
      objects.push(body);
    }

    if (objects[0]) {
      const commitText = objects[0];
      const blankIdx = commitText.indexOf('\n\n');
      const hdr = blankIdx >= 0 ? commitText.slice(0, blankIdx) : commitText;
      const msg = blankIdx >= 0 ? commitText.slice(blankIdx + 2) : '';
      subject = msg.split('\n')[0] || '';
      const cm = hdr.match(/^committer .*> (\d+) ([+-]\d{4})$/m);
      if (cm) {
        commitTime = Number(cm[1]);
        commitIso = new Date(commitTime * 1000).toISOString();
      }
    }
    if (objects[1]) {
      try { manifest = JSON.parse(objects[1]); } catch { manifest = null; }
    }
    if (objects[2]) {
      try { flight = JSON.parse(objects[2]); } catch { flight = null; }
    }
  }
  return { commitOid, commitTime, commitIso, subject, manifest, flight };
}

/**
 * BG-01..BG-07, BG-11..BG-13, BG-18, BG-28: Create non-intrusive shadow snapshot & push off-VM.
 */
export function createSnapshot(ctx, opts = {}) {
  const lock = acquireLock(ctx.gitDir);
  try {
    const t0 = performance.now();
    const { liveFiles, deletedFiles, skippedLarge } = listWorkingFiles(ctx.repoRoot, ctx.cfg);
    const status = getPorcelainStatus(ctx.repoRoot);

    // BG-18: Unconditional zero-leak secret scan BEFORE anything leaves the VM
    const secretFindings = scanSecrets(ctx.repoRoot, liveFiles);
    if (secretFindings.length > 0) {
      return {
        exitCode: EXIT_BLOCKED,
        verdict: 'BLOCKED_SECRET_LEAK',
        secretFindings,
        message: `HARD ABORT (BG-18): Detected ${secretFindings.length} secret(s). Zero bytes pushed to remote.`,
      };
    }

    // Update Flight Recorder if caller supplied metadata
    const frPatch = {};
    if (opts.goal) frPatch.goal = opts.goal;
    if (opts.nextStep) frPatch.nextStep = opts.nextStep;
    if (opts.addCompleted) frPatch.addCompleted = opts.addCompleted;
    if (opts.addPitfall) frPatch.addPitfall = opts.addPitfall;
    const artifacts = collectMirroredArtifacts(opts.artifactsDir);
    if (artifacts.length > 0) {
      frPatch.artifactsMirrored = artifacts.map((a) => ({ name: a.name, sha256: a.sha256, size: a.size }));
    }
    const flight =
      Object.keys(frPatch).length > 0 || !fs.existsSync(path.join(ctx.vaultDir, FLIGHT_RECORDER_FILE))
        ? writeFlightRecorder(ctx, frPatch)
        : readFlightRecorder(ctx);

    const metaDigest = sha256String(
      JSON.stringify({
        flight: {
          goal: flight.goal,
          nextStep: flight.nextStep,
          completed: flight.completed,
          knownPitfalls: flight.knownPitfalls,
        },
        artifacts: artifacts.map((a) => `${a.name}:${a.sha256}`),
      })
    );

    const manifest = buildWorkingManifest(ctx.repoRoot, liveFiles, deletedFiles, metaDigest, {
      cachePath: path.join(ctx.vaultDir, 'sha_cache.json'),
    });

    // BG-28: No-Op deduplication if working tree + flight recorder match last verified remote snapshot
    const journal = readJournal(ctx);
    const lastEntry = journal.length > 0 ? journal[journal.length - 1] : null;
    if (
      !opts.force &&
      lastEntry &&
      lastEntry.slug === ctx.slug &&
      lastEntry.fingerprint === manifest.fingerprint &&
      lastEntry.headSha === ctx.headSha &&
      (lastEntry.remoteVerified || opts.localOnly)
    ) {
      const elapsedMs = Number((performance.now() - t0).toFixed(1));
      return {
        exitCode: EXIT_OK,
        verdict: 'NO_CHANGE',
        skipped: true,
        commitOid: lastEntry.commitOid,
        treeOid: lastEntry.treeOid,
        fingerprint: manifest.fingerprint,
        remoteVerified: lastEntry.remoteVerified,
        remoteRef: lastEntry.remoteRef,
        tier: lastEntry.tier,
        dirtyCount: status.allDirty.length,
        fileCount: liveFiles.length,
        elapsedMs,
      };
    }

    const parentOid = getCurrentVaultParent(ctx);
    const createdAt = new Date().toISOString();
    const manifestDoc = {
      schema: 'bg-manifest/v1',
      createdAt,
      slug: ctx.slug,
      branch: ctx.branch,
      baseSha: ctx.headSha,
      vmHost: ctx.hostname,
      reason: opts.reason || 'manual_snap',
      fingerprint: manifest.fingerprint,
      fileCount: manifest.entries.length,
      deletedFiles,
      dirtyCount: status.allDirty.length,
      skippedLarge,
      artifacts: artifacts.map((a) => ({ name: a.name, sha256: a.sha256, size: a.size })),
      files: manifest.entries,
    };

    const metaEntries = [
      { path: '_bg_meta/MANIFEST.json', content: JSON.stringify(manifestDoc, null, 2) + '\n' },
      { path: '_bg_meta/flight_recorder.json', content: JSON.stringify(flight, null, 2) + '\n' },
      ...artifacts.map((a) => ({ path: a.metaPath, content: a.content })),
    ];

    const commitMsg = [
      `bg-vault(${ctx.slug}): ${opts.reason || 'snap'} [${status.allDirty.length} dirty, ${liveFiles.length} files]`,
      '',
      `Base-SHA: ${ctx.headSha || 'none'}`,
      `Branch: ${ctx.branch}`,
      `VM-Host: ${ctx.hostname}`,
      `Fingerprint: ${manifest.fingerprint}`,
      `Timestamp: ${createdAt}`,
      opts.note ? `Note: ${opts.note}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const { treeOid, commitOid } = createShadowSnapshotCommit({
      repoRoot: ctx.repoRoot,
      parentOid,
      baseSha: ctx.headSha,
      liveFiles,
      metaEntries,
      message: commitMsg,
    });

    // Update local ref & push off-VM with ls-remote read-back verification (BG-02, BG-05)
    let pushInfo;
    if (opts.localOnly || !ctx.hasRemote) {
      const tier1Ref = `${ctx.cfg.vaultNamespace.replace(/\/+$/, '')}/${ctx.slug}`;
      runGitOrThrow(['update-ref', tier1Ref, commitOid], { cwd: ctx.repoRoot });
      pushInfo = {
        remoteVerified: false,
        tier: 'local_only',
        remoteRef: null,
        localRef: tier1Ref,
        remoteOid: null,
        error: ctx.hasRemote ? 'Skipped by --local-only' : `No remote '${ctx.remote}' configured`,
      };
    } else {
      pushInfo = pushVaultWithReadback({
        repoRoot: ctx.repoRoot,
        remote: ctx.remote,
        localOid: commitOid,
        slug: ctx.slug,
        cfg: ctx.cfg,
      });
    }

    // Optional offline bundle mirror (BG-07)
    let bundleInfo = null;
    if (opts.bundleOut || (!pushInfo.remoteVerified && !opts.localOnly)) {
      const targetBundle =
        opts.bundleOut ||
        path.join(ctx.vaultDir, 'bundles', `${ctx.slug}-${commitOid.slice(0, 8)}.bgbundle`);
      try {
        bundleInfo = exportOfflineBundle(ctx.repoRoot, pushInfo.localRef, targetBundle);
      } catch {
        // non-fatal
      }
    }

    const elapsedMs = Number((performance.now() - t0).toFixed(1));
    const journalEntry = {
      timestamp: createdAt,
      slug: ctx.slug,
      branch: ctx.branch,
      headSha: ctx.headSha,
      commitOid,
      treeOid,
      parentOid,
      fingerprint: manifest.fingerprint,
      fileCount: liveFiles.length,
      dirtyCount: status.allDirty.length,
      artifactsCount: artifacts.length,
      reason: opts.reason || 'snap',
      note: opts.note || null,
      remoteVerified: pushInfo.remoteVerified,
      tier: pushInfo.tier,
      remoteRef: pushInfo.remoteRef,
      localRef: pushInfo.localRef,
      pushError: pushInfo.error,
      vmHost: ctx.hostname,
      elapsedMs,
    };
    appendJournal(ctx, journalEntry);

    const hygiene = scanHygieneAndBloat(
      ctx.repoRoot,
      status.allDirty.map((d) => d.path),
      skippedLarge,
      ctx.cfg
    );

    const requireRemote = Boolean(opts.requireRemote);
    const exitCode = requireRemote && !pushInfo.remoteVerified ? EXIT_BLOCKED : EXIT_OK;

    return {
      exitCode,
      verdict: pushInfo.remoteVerified ? 'REMOTE_VERIFIED' : 'LOCAL_ONLY',
      skipped: false,
      ...journalEntry,
      bundleInfo,
      hygiene,
    };
  } finally {
    releaseLock(lock);
  }
}

/**
 * BG-08: Boot-start check — fetch origin & remote vaults, detect orphaned work from dead VMs.
 */
export function runBoot(ctx) {
  const t0 = performance.now();
  let upstreamFetchOk = false;
  let upstreamError = null;
  if (ctx.hasRemote) {
    const f = runGit(['fetch', '--prune', ctx.remote], { cwd: ctx.repoRoot });
    upstreamFetchOk = f.status === 0;
    if (!upstreamFetchOk) upstreamError = f.stderr.trim();
  }

  const vaultFetch = fetchRemoteVaults(ctx);
  const status = getPorcelainStatus(ctx.repoRoot);

  // Measure ahead/behind relative to origin/<defaultBranch>
  let aheadDefault = 0;
  let behindDefault = 0;
  if (ctx.hasRemote && ctx.headSha) {
    const ab = runGit(
      ['rev-list', '--left-right', '--count', `HEAD...${ctx.remote}/${ctx.defaultBranch}`],
      { cwd: ctx.repoRoot }
    );
    if (ab.status === 0) {
      const [a, b] = ab.stdout.trim().split(/\s+/).map(Number);
      aheadDefault = a || 0;
      behindDefault = b || 0;
    }
  }

  // Inspect discovered remote vaults for orphaned / unmerged work from prior VMs
  const orphanedVaults = [];
  const allVaults = [];
  for (const rv of vaultFetch.remoteVaults) {
    const meta = readVaultCommitMetadata(ctx.repoRoot, rv.oid);
    const baseSha = meta.manifest?.baseSha || null;
    const isMerged =
      baseSha &&
      ctx.headSha &&
      meta.manifest?.dirtyCount === 0 &&
      runGit(['merge-base', '--is-ancestor', baseSha, `${ctx.remote}/${ctx.defaultBranch}`], {
        cwd: ctx.repoRoot,
      }).status === 0;

    // If working tree is clean & vault has dirty work (or came from another host), flag recovery candidate!
    const fromOtherHost = Boolean(meta.manifest?.vmHost && meta.manifest.vmHost !== ctx.hostname);
    const hasWork = (meta.manifest?.dirtyCount || 0) > 0 || (meta.manifest?.artifacts?.length || 0) > 0;
    const isOrphanCandidate = !isMerged && (fromOtherHost || (status.isClean && hasWork));

    const rec = {
      slug: rv.slug,
      tier: rv.tier,
      remoteRef: rv.remoteRef,
      oid: rv.oid,
      commitIso: meta.commitIso,
      vmHost: meta.manifest?.vmHost || 'unknown',
      baseSha,
      dirtyCount: meta.manifest?.dirtyCount ?? null,
      fileCount: meta.manifest?.fileCount ?? null,
      goal: meta.flight?.goal || '',
      nextStep: meta.flight?.nextStep || '',
      artifactsCount: meta.manifest?.artifacts?.length || 0,
      fromOtherHost,
      isOrphanCandidate,
    };
    allVaults.push(rec);
    if (isOrphanCandidate) orphanedVaults.push(rec);
  }

  const elapsedMs = Number((performance.now() - t0).toFixed(1));
  const hasRecovery = orphanedVaults.length > 0;
  const hasDrift = behindDefault > 0;

  return {
    exitCode: hasRecovery ? EXIT_WARN : EXIT_OK,
    verdict: hasRecovery ? 'RECOVERY_AVAILABLE' : hasDrift ? 'UPSTREAM_BEHIND' : 'CLEAN_READY',
    branch: ctx.branch,
    defaultBranch: ctx.defaultBranch,
    headSha: ctx.headSha,
    hostname: ctx.hostname,
    upstreamFetchOk,
    upstreamError,
    aheadDefault,
    behindDefault,
    workingTreeClean: status.isClean,
    dirtyCount: status.allDirty.length,
    remoteVaultCount: allVaults.length,
    orphanedVaults,
    allVaults,
    elapsedMs,
  };
}

/**
 * BG-23: Safe branch bootstrapper from latest origin/<defaultBranch>.
 */
export function runStart(ctx, rawSlug, opts = {}) {
  const status = getPorcelainStatus(ctx.repoRoot);
  if (!status.isClean && !opts.allowDirty) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'DIRTY_WORKTREE',
      message: `Working tree has ${status.allDirty.length} uncommitted item(s). Run 'bg snap' or pass --allow-dirty.`,
    };
  }

  const boot = runBoot(ctx);
  if (boot.orphanedVaults.length > 0 && !opts.ignoreOrphans) {
    return {
      exitCode: EXIT_WARN,
      verdict: 'RECOVERY_AVAILABLE',
      orphanedVaults: boot.orphanedVaults,
      message: `Found ${boot.orphanedVaults.length} orphaned remote vault(s) from prior VM! Inspect with 'bg recover --mode=inspect' or pass --ignore-orphans.`,
    };
  }

  const branchName = rawSlug.includes('/') ? rawSlug : `feat/${sanitizeSlug(rawSlug)}`;
  const baseRef = ctx.hasRemote ? `${ctx.remote}/${ctx.defaultBranch}` : 'HEAD';

  runGitOrThrow(['checkout', '-B', branchName, baseRef], { cwd: ctx.repoRoot });

  // Reload context on new branch and record Flight Recorder + initial vault
  const newCtx = getRepoContext(ctx.repoRoot, { remote: ctx.remote });
  const flight = writeFlightRecorder(newCtx, {
    goal: opts.goal || `Feature branch ${branchName}`,
    nextStep: opts.nextStep || 'Begin implementation and checkpoint with bg snap',
  });

  // Push initial tracking branch immediately so branch exists off-VM from second 0
  let branchPushed = false;
  if (newCtx.hasRemote && !opts.noPush) {
    const p = runGit(['push', '-u', newCtx.remote, branchName], { cwd: newCtx.repoRoot });
    branchPushed = p.status === 0;
  }

  const snap = createSnapshot(newCtx, {
    reason: 'branch_start',
    goal: flight.goal,
    nextStep: flight.nextStep,
    artifactsDir: opts.artifactsDir,
    force: true,
  });

  return {
    exitCode: snap.exitCode === EXIT_BLOCKED ? EXIT_BLOCKED : EXIT_OK,
    verdict: 'STARTED',
    branch: branchName,
    baseRef,
    headSha: newCtx.headSha,
    branchPushed,
    vaultVerified: snap.remoteVerified,
    remoteRef: snap.remoteRef,
  };
}

/**
 * Resolve vault commit OID by slug + rev offset (e.g. rev=0 latest, rev=1 parent ~1).
 */
function resolveVaultTarget(ctx, opts = {}) {
  const vaultFetch = fetchRemoteVaults(ctx);
  const candidates = [];

  for (const rv of vaultFetch.remoteVaults) {
    candidates.push({ slug: rv.slug, ref: rv.localMirror, oid: rv.oid, remoteRef: rv.remoteRef, source: 'remote' });
  }

  // Also include local refs/bg-vault/*
  const ns1 = ctx.cfg.vaultNamespace.replace(/\/+$/, '');
  const localLs = runGit(['for-each-ref', '--format=%(objectname)\t%(refname)', ns1], { cwd: ctx.repoRoot });
  if (localLs.status === 0) {
    for (const line of localLs.stdout.trim().split('\n')) {
      if (!line.trim()) continue;
      const [oid, ref] = line.split('\t');
      const slug = ref.slice(ns1.length + 1);
      if (!candidates.some((c) => c.slug === slug)) {
        candidates.push({ slug, ref, oid, remoteRef: null, source: 'local' });
      }
    }
  }

  let chosen = null;
  if (opts.oid) {
    chosen = { slug: opts.slug || ctx.slug, ref: opts.oid, oid: opts.oid, source: 'explicit_oid' };
  } else if (opts.slug) {
    chosen = candidates.find((c) => c.slug === opts.slug || c.slug === sanitizeSlug(opts.slug));
  } else {
    // Prefer matching current slug, otherwise most recent remote vault
    chosen = candidates.find((c) => c.slug === ctx.slug) || null;
    if (!chosen && candidates.length > 0) {
      candidates.sort((a, b) => {
        const ma = readVaultCommitMetadata(ctx.repoRoot, a.oid);
        const mb = readVaultCommitMetadata(ctx.repoRoot, b.oid);
        return (mb.commitTime || 0) - (ma.commitTime || 0);
      });
      chosen = candidates[0];
    }
  }

  if (!chosen) return { chosen: null, candidates };

  // Apply --rev=N parent traversal (BG-13 time-machine)
  const revNum = Number(opts.rev || 0);
  let targetOid = chosen.oid;
  if (revNum > 0) {
    const revRes = runGit(['rev-parse', '--verify', `${chosen.oid}~${revNum}`], { cwd: ctx.repoRoot });
    if (revRes.status !== 0) {
      throw new Error(`Vault revision ~${revNum} does not exist on ${chosen.slug}`);
    }
    targetOid = revRes.stdout.trim();
  }

  return { chosen: { ...chosen, oid: targetOid }, candidates };
}

/**
 * Strip _bg_meta/* from a vault commit and produce a clean tree OID (and synthetic commit on baseSha).
 */
function buildCleanCommitFromVault(repoRoot, vaultOid, baseSha) {
  const tmpIndex = path.join(os.tmpdir(), `bg-clean-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const env = { GIT_INDEX_FILE: tmpIndex };
  try {
    runGitOrThrow(['read-tree', vaultOid], { cwd: repoRoot, env });
    // Remove all _bg_meta/* entries from temporary index
    const ls = runGitOrThrow(['ls-files', '_bg_meta'], { cwd: repoRoot, env }).trim();
    if (ls) {
      const paths = ls.split('\n').filter(Boolean);
      runGitOrThrow(['update-index', '--force-remove', '--stdin'], {
        cwd: repoRoot,
        env,
        input: paths.join('\n') + '\n',
      });
    }
    const cleanTree = runGitOrThrow(['write-tree'], { cwd: repoRoot, env }).trim();
    const args = ['commit-tree', cleanTree];
    if (baseSha) args.push('-p', baseSha);
    const cleanCommit = runGitOrThrow(args, {
      cwd: repoRoot,
      env: {
        ...env,
        GIT_AUTHOR_NAME: 'Buchigire Guard',
        GIT_AUTHOR_EMAIL: 'bg-guard@local',
        GIT_COMMITTER_NAME: 'Buchigire Guard',
        GIT_COMMITTER_EMAIL: 'bg-guard@local',
      },
      input: `bg-clean-tree from ${vaultOid}`,
    }).trim();
    return { cleanTree, cleanCommit };
  } finally {
    try {
      if (fs.existsSync(tmpIndex)) fs.unlinkSync(tmpIndex);
    } catch {
      // ignore
    }
  }
}

/**
 * Materialize every blob in a Git tree OID directly into repoRoot (skipping _bg_meta/)
 * without mutating HEAD or staging index.
 */
function materializeTreeToWorktree(repoRoot, treeOid, removeMissingFromManifest = []) {
  const lsOut = runGitOrThrow(['ls-tree', '-r', '-z', treeOid], { cwd: repoRoot, buffer: true }).toString('utf8');
  const records = lsOut.split('\0').filter(Boolean);
  const restoredFiles = [];

  for (const rec of records) {
    const tabIdx = rec.indexOf('\t');
    if (tabIdx < 0) continue;
    const header = rec.slice(0, tabIdx);
    const relPath = rec.slice(tabIdx + 1);
    if (relPath.startsWith('_bg_meta/')) continue;
    const [mode, type, blobOid] = header.split(' ');
    if (type !== 'blob') continue;

    const abs = path.join(repoRoot, relPath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    const data = runGit(['cat-file', 'blob', blobOid], { cwd: repoRoot, buffer: true });
    if (data.status !== 0) {
      throw new Error(`Failed reading blob ${blobOid} for ${relPath}`);
    }
    if (mode === '120000') {
      try {
        fs.unlinkSync(abs);
      } catch {
        // ignore
      }
      fs.symlinkSync(data.stdout.toString('utf8'), abs);
    } else {
      fs.writeFileSync(abs, data.stdout);
      if (mode === '100755') fs.chmodSync(abs, 0o755);
    }
    restoredFiles.push(relPath);
  }

  for (const delRel of removeMissingFromManifest) {
    const abs = path.join(repoRoot, delRel);
    try {
      if (fs.existsSync(abs)) fs.unlinkSync(abs);
    } catch {
      // ignore
    }
  }

  return restoredFiles;
}

/**
 * BG-09, BG-10, BG-12, BG-13: 3-Mode Disaster Recovery + SHA-256 Verification.
 */
export function runRecover(ctx, opts = {}) {
  const mode = opts.mode || 'worktree'; // inspect | worktree | three-way
  const { chosen, candidates } = resolveVaultTarget(ctx, opts);

  if (!chosen) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'NO_VAULT_FOUND',
      candidates,
      message: 'No local or remote Buchigire Guard vault found to recover.',
    };
  }

  const meta = readVaultCommitMetadata(ctx.repoRoot, chosen.oid);
  if (!meta.manifest) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'INVALID_VAULT',
      message: `Commit ${chosen.oid} does not contain _bg_meta/MANIFEST.json.`,
    };
  }

  // History chain for inspect
  const histRes = runGit(['log', '-n', '10', '--format=%h|%cI|%s', chosen.oid], { cwd: ctx.repoRoot });
  const history = histRes.status === 0
    ? histRes.stdout.trim().split('\n').filter(Boolean).map((l, idx) => {
        const [shortOid, iso, ...subj] = l.split('|');
        return { rev: idx, shortOid, iso, subject: subj.join('|') };
      })
    : [];

  if (mode === 'inspect') {
    return {
      exitCode: EXIT_OK,
      verdict: 'INSPECT_OK',
      slug: chosen.slug,
      oid: chosen.oid,
      remoteRef: chosen.remoteRef,
      baseSha: meta.manifest.baseSha,
      vmHost: meta.manifest.vmHost,
      createdAt: meta.manifest.createdAt,
      fileCount: meta.manifest.fileCount,
      dirtyCount: meta.manifest.dirtyCount,
      artifacts: meta.manifest.artifacts || [],
      flight: meta.flight,
      history,
      candidates: candidates.map((c) => ({ slug: c.slug, oid: c.oid.slice(0, 10), source: c.source })),
    };
  }

  // Safety backup before overwriting dirty working tree
  const preStatus = getPorcelainStatus(ctx.repoRoot);
  let safetySnapOid = null;
  if (!preStatus.isClean && !opts.noSafetySnap) {
    const safety = createSnapshot(ctx, { reason: 'pre_recover_safety', localOnly: true, force: true });
    safetySnapOid = safety.commitOid || null;
  }

  let restoredFiles = [];
  let shaVerified = 0;
  let shaMismatches = [];
  let mergeConflicts = [];

  if (mode === 'three-way') {
    const baseSha = meta.manifest.baseSha;
    if (!baseSha || runGit(['cat-file', '-e', `${baseSha}^{commit}`], { cwd: ctx.repoRoot }).status !== 0) {
      return {
        exitCode: EXIT_BLOCKED,
        verdict: 'MISSING_BASE_SHA',
        message: `Cannot perform 3-way recovery: base commit ${baseSha} is not present locally. Fetch origin or use --mode=worktree.`,
      };
    }
    const { cleanCommit } = buildCleanCommitFromVault(ctx.repoRoot, chosen.oid, baseSha);
    const mt = runGit(
      ['merge-tree', '--write-tree', '--name-only', `--merge-base=${baseSha}`, 'HEAD', cleanCommit],
      { cwd: ctx.repoRoot }
    );
    const lines = mt.stdout.split('\n');
    const mergedTree = (lines[0] || '').trim();
    if (mt.status === 1) {
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) break;
        mergeConflicts.push(lines[i].trim());
      }
      return {
        exitCode: EXIT_BLOCKED,
        verdict: 'THREE_WAY_CONFLICT',
        conflicts: mergeConflicts,
        safetySnapOid,
        message: `3-way merge hit ${mergeConflicts.length} conflicting file(s). Resolve manually or use --mode=worktree on a dedicated branch.`,
      };
    }
    if (mt.status !== 0 || !mergedTree) {
      throw new Error(`3-way merge-tree failed: ${mt.stderr}`);
    }
    restoredFiles = materializeTreeToWorktree(ctx.repoRoot, mergedTree, meta.manifest.deletedFiles || []);
    // Verify SHA-256 on files changed exclusively by the vault (skip files legitimately modified by new upstream HEAD)
    const upstreamChanged = new Set(
      runGit(['diff', '--name-only', `${baseSha}..HEAD`], { cwd: ctx.repoRoot })
        .stdout.trim()
        .split('\n')
        .filter(Boolean)
    );
    for (const entry of meta.manifest.files || []) {
      if (upstreamChanged.has(entry.path)) continue;
      const abs = path.join(ctx.repoRoot, entry.path);
      if (!fs.existsSync(abs)) {
        shaMismatches.push({ path: entry.path, reason: 'MISSING' });
        continue;
      }
      const actual = entry.mode === '120000'
        ? sha256String(`symlink:${fs.readlinkSync(abs)}`)
        : sha256File(abs);
      if (actual !== entry.sha256) {
        shaMismatches.push({ path: entry.path, expected: entry.sha256, actual });
      } else {
        shaVerified++;
      }
    }
  } else {
    // mode === 'worktree': exact full materialization + 100% SHA-256 verification (BG-10)
    restoredFiles = materializeTreeToWorktree(ctx.repoRoot, chosen.oid, meta.manifest.deletedFiles || []);
    for (const entry of meta.manifest.files || []) {
      const abs = path.join(ctx.repoRoot, entry.path);
      if (!fs.existsSync(abs)) {
        shaMismatches.push({ path: entry.path, reason: 'MISSING' });
        continue;
      }
      const actual = entry.mode === '120000'
        ? sha256String(`symlink:${fs.readlinkSync(abs)}`)
        : sha256File(abs);
      if (actual !== entry.sha256) {
        shaMismatches.push({ path: entry.path, expected: entry.sha256, actual });
      } else {
        shaVerified++;
      }
    }
  }

  // Restore Flight Recorder locally (BG-11)
  if (meta.flight) {
    atomicWriteFileSync(
      path.join(ctx.vaultDir, FLIGHT_RECORDER_FILE),
      JSON.stringify({ ...meta.flight, recoveredFrom: chosen.oid, recoveredAt: new Date().toISOString() }, null, 2) + '\n'
    );
  }

  // Restore mirrored artifacts if requested (BG-12)
  const restoredArtifacts = [];
  if (opts.withArtifacts && (meta.manifest.artifacts || []).length > 0) {
    const outArtDir = path.resolve(opts.artifactsDir || path.join(os.tmpdir(), `bg_recovered_artifacts_${chosen.slug}`));
    fs.mkdirSync(outArtDir, { recursive: true });
    for (const art of meta.manifest.artifacts) {
      const blob = runGit(['show', `${chosen.oid}:_bg_meta/artifacts/${art.name}`], {
        cwd: ctx.repoRoot,
        buffer: true,
      });
      if (blob.status === 0) {
        const dst = path.join(outArtDir, art.name);
        fs.writeFileSync(dst, blob.stdout);
        restoredArtifacts.push(dst);
      }
    }
  }

  if (shaMismatches.length > 0) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'SHA256_MISMATCH',
      mode,
      oid: chosen.oid,
      restoredCount: restoredFiles.length,
      shaVerified,
      shaMismatches,
      safetySnapOid,
    };
  }

  return {
    exitCode: EXIT_OK,
    verdict: 'RECOVERED_VERIFIED',
    mode,
    slug: chosen.slug,
    oid: chosen.oid,
    restoredCount: restoredFiles.length,
    shaVerified,
    restoredArtifacts,
    flight: meta.flight,
    safetySnapOid,
  };
}

/**
 * BG-03: Background Auto-Watchdog Daemon loop (stops gracefully on SIGINT/SIGTERM).
 */
export async function runWatchDaemon(ctx, opts = {}) {
  const intervalSec = Math.max(5, Number(opts.intervalSec || ctx.cfg.watchIntervalSec || 120));
  const pidPath = path.join(ctx.vaultDir, 'watch.pid');
  atomicWriteFileSync(pidPath, JSON.stringify({ pid: process.pid, intervalSec, startedAt: new Date().toISOString(), slug: ctx.slug }));

  let stopped = false;
  const stop = () => {
    stopped = true;
    try {
      fs.unlinkSync(pidPath);
    } catch {
      // ignore
    }
  };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);

  const logLine = (msg) => {
    const ts = new Date().toISOString();
    process.stdout.write(`[bg watch ${ts}] ${msg}\n`);
  };

  logLine(`Started watchdog on branch=${ctx.branch} (slug=${ctx.slug}) interval=${intervalSec}s remote=${ctx.remote}`);

  let cycles = 0;
  const maxCycles = opts.maxCycles ? Number(opts.maxCycles) : Infinity;

  while (!stopped && cycles < maxCycles) {
    cycles++;
    try {
      const freshCtx = getRepoContext(ctx.repoRoot, { remote: ctx.remote });
      const res = createSnapshot(freshCtx, {
        reason: 'watchdog_auto',
        artifactsDir: opts.artifactsDir,
      });
      if (res.skipped) {
        logLine(`cycle #${cycles}: NO_CHANGE (${res.elapsedMs}ms)`);
      } else if (res.exitCode === EXIT_BLOCKED) {
        logLine(`cycle #${cycles}: BLOCKED (${res.verdict}) — ${res.message || ''}`);
      } else {
        logLine(
          `cycle #${cycles}: ${res.verdict} oid=${res.commitOid.slice(0, 10)} ref=${res.remoteRef || res.localRef} dirty=${res.dirtyCount} (${res.elapsedMs}ms)`
        );
      }
    } catch (err) {
      logLine(`cycle #${cycles}: ERROR ${err.message}`);
    }
    if (stopped || cycles >= maxCycles) break;
    await new Promise((r) => setTimeout(r, intervalSec * 1000));
  }

  stop();
  return { exitCode: EXIT_OK, verdict: 'WATCH_STOPPED', cycles };
}

/**
 * BG-30: Automated Vault Garbage Collector for expired / merged vaults.
 */
export function runGc(ctx, opts = {}) {
  const retentionDays = Number(opts.retentionDays ?? ctx.cfg.retentionDays ?? 7);
  const cutoffSec = Math.floor(Date.now() / 1000) - retentionDays * 86400;
  const dryRun = Boolean(opts.dryRun);
  const all = Boolean(opts.all);
  const targetSlug = opts.slug ? sanitizeSlug(opts.slug) : null;

  const vaultFetch = fetchRemoteVaults(ctx);
  const prunedLocal = [];
  const prunedRemote = [];
  const kept = [];

  for (const rv of vaultFetch.remoteVaults) {
    const meta = readVaultCommitMetadata(ctx.repoRoot, rv.oid);
    const expired = (meta.commitTime || 0) > 0 && meta.commitTime < cutoffSec;
    const isTarget = targetSlug && rv.slug === targetSlug;
    // Check if branch with same slug was merged into origin/defaultBranch and no longer exists on remote
    const branchExists =
      runGit(['ls-remote', '--heads', ctx.remote, rv.slug], { cwd: ctx.repoRoot }).stdout.trim().length > 0;
    const baseMerged =
      meta.manifest?.baseSha &&
      runGit(['merge-base', '--is-ancestor', meta.manifest.baseSha, `${ctx.remote}/${ctx.defaultBranch}`], {
        cwd: ctx.repoRoot,
      }).status === 0 &&
      (meta.manifest?.dirtyCount || 0) === 0;

    const shouldPrune = Boolean(isTarget || all || expired || (!branchExists && baseMerged && rv.slug !== ctx.slug));
    if (shouldPrune) {
      if (!dryRun) {
        const del = runGit(['push', ctx.remote, `:${rv.remoteRef}`], { cwd: ctx.repoRoot });
        if (del.status === 0) prunedRemote.push(rv.remoteRef);
        runGit(['update-ref', '-d', rv.localMirror], { cwd: ctx.repoRoot });
        runGit(['update-ref', '-d', `${ctx.cfg.vaultNamespace.replace(/\/+$/, '')}/${rv.slug}`], { cwd: ctx.repoRoot });
        prunedLocal.push(rv.slug);
      } else {
        prunedRemote.push(`[dry-run] ${rv.remoteRef}`);
      }
    } else {
      kept.push({ slug: rv.slug, remoteRef: rv.remoteRef, commitIso: meta.commitIso });
    }
  }

  return {
    exitCode: EXIT_OK,
    verdict: 'GC_COMPLETE',
    dryRun,
    retentionDays,
    prunedRemote,
    prunedLocal,
    kept,
  };
}

/**
 * Compute live durability telemetry score (0..100) and full status payload (BG-34).
 */
export function computeStatus(ctx, opts = {}) {
  const status = opts.porcelain || getPorcelainStatus(ctx.repoRoot);
  const working = opts.working || listWorkingFiles(ctx.repoRoot, ctx.cfg);
  const { liveFiles, deletedFiles, skippedLarge } = working;
  const flight = readFlightRecorder(ctx);
  const journal = readJournal(ctx);
  const lastEntry = journal.length > 0 ? journal[journal.length - 1] : null;
  const lastRemote = [...journal].reverse().find((j) => j.remoteVerified) || null;

  // Check if current tree matches last remote-verified snapshot or pushed branch HEAD
  const curMetaDigest = sha256String(
    JSON.stringify({
      flight: {
        goal: flight.goal,
        nextStep: flight.nextStep,
        completed: flight.completed,
        knownPitfalls: flight.knownPitfalls,
      },
      artifacts: (flight.artifactsMirrored || []).map((a) => `${a.name}:${a.sha256}`),
    })
  );
  const curManifest = buildWorkingManifest(ctx.repoRoot, liveFiles, deletedFiles, curMetaDigest, {
    cachePath: path.join(ctx.vaultDir, 'sha_cache.json'),
  });

  const vaultMatchesCurrent = Boolean(
    lastRemote &&
      lastRemote.slug === ctx.slug &&
      lastRemote.fingerprint === curManifest.fingerprint &&
      lastRemote.headSha === ctx.headSha
  );

  // Also check if branch HEAD itself is pushed to origin/<branch> and working tree is clean.
  // Fast path: check local remote-tracking ref (updated by every git push/fetch);
  // runGate / --verify-remote always perform live `git ls-remote` verification.
  let branchHeadPushed = false;
  if (ctx.hasRemote && !ctx.isDetached && ctx.headSha) {
    const trackingRef = `refs/remotes/${ctx.remote}/${ctx.branch}`;
    const localTrackedSha = resolveLocalRef(ctx.gitDir, trackingRef);
    const isLocalFileRemote = ctx.remoteUrl && !/^(?:https?:\/\/|ssh:\/\/|git@|git:\/\/)/i.test(ctx.remoteUrl);
    if (!opts.verifyRemote && !isLocalFileRemote && localTrackedSha) {
      branchHeadPushed = localTrackedSha === ctx.headSha;
    } else if (opts.verifyRemote || isLocalFileRemote || (status.isClean && !vaultMatchesCurrent)) {
      const ls = runGit(['ls-remote', ctx.remote, `refs/heads/${ctx.branch}`], { cwd: ctx.repoRoot });
      if (ls.status === 0) {
        const line = ls.stdout.trim().split('\n')[0] || '';
        branchHeadPushed = line.startsWith(ctx.headSha);
      }
    }
  }

  const offVmDurable = (status.isClean && branchHeadPushed) || vaultMatchesCurrent;
  const rpoAgeSec = lastRemote ? Math.max(0, Math.round((Date.now() - Date.parse(lastRemote.timestamp)) / 1000)) : null;

  // Score calculation (0..100)
  let score = 0;
  if (offVmDurable) score += 50;
  else if (lastRemote) score += 20;
  if (!ctx.isDetached && ctx.branch !== ctx.defaultBranch) score += 15;
  else if (status.isClean) score += 15;
  if (ctx.hasRemote) score += 10;
  if (flight.goal || flight.nextStep) score += 10;
  if (skippedLarge.length === 0) score += 10;
  if (branchHeadPushed) score += 5;
  score = Math.min(100, score);

  // Check active watchdog PID
  let watchRunning = false;
  const pidFile = path.join(ctx.vaultDir, 'watch.pid');
  if (fs.existsSync(pidFile)) {
    try {
      const info = JSON.parse(fs.readFileSync(pidFile, 'utf8'));
      process.kill(info.pid, 0);
      watchRunning = true;
    } catch {
      watchRunning = false;
    }
  }

  return {
    exitCode: offVmDurable ? EXIT_OK : EXIT_WARN,
    verdict: offVmDurable ? 'DURABLE' : 'UNPUSHED_WORK_AT_RISK',
    durabilityScore: score,
    offVmDurable,
    vaultMatchesCurrent,
    branchHeadPushed,
    rpoAgeSec,
    branch: ctx.branch,
    defaultBranch: ctx.defaultBranch,
    headSha: ctx.headSha,
    remote: ctx.remote,
    hasRemote: ctx.hasRemote,
    workingTreeClean: status.isClean,
    dirtyCount: status.allDirty.length,
    untrackedCount: status.untracked.length,
    modifiedCount: status.modified.length,
    stagedCount: status.staged.length,
    watchRunning,
    lastEntry,
    lastRemote,
    journalCount: journal.length,
    recentJournal: journal.slice(-10).reverse(),
    flight,
    skippedLarge,
  };
}
