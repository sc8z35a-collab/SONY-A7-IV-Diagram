#!/usr/bin/env node
/**
 * `sp` — 0.0001 mm Certified Automatic Spatial Map & Pre-Collision Simulation Engine
 * 10 Modes: inspect | map | pockets | sim | audit | ray | thermal-cog | diff | bench | selftest
 * Exit Codes: 0=PASS, 1=ERROR, 2=FAIL, 3=WARN
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';
import { ensureUnifiedV2RuntimeBundlePath } from './lib/hyper_cache.mjs';
import {
  SP_EXIT_ERROR,
  SP_EXIT_FAIL,
  SP_EXIT_PASS,
  diffSnapshot,
  runCandidateSim,
  runRayConeCheck,
  runSpatialSelfTest,
  runThermalCogAnalysis,
  runUnitAudit,
  saveSnapshot,
} from './spatial_engine/audit_physics.mjs';
import {
  RAY_PRESETS,
  discoverRegisteredUnits,
  listAllNonWelcomeAuditTargets,
  listUnitAuditTargets,
  loadSpatialScene,
} from './spatial_engine/scene_extractor.mjs';
import {
  buildAutoMultiLayerMap,
  buildSpatialSlice,
  findCertifiedPockets,
  getFrameOrigin,
} from './spatial_engine/voxel_pockets.mjs';
import {
  emitThreeSnippet,
  renderSpatialSliceText,
  writeSpatialHtmlViewer,
} from './spatial_engine/renderers.mjs';

const ALL_TIERS = ['standard_lite', 'standard', 'high', 'ultra'];

// ============================================================================
// Worker Thread Entry Point (parallel multi-unit / multi-tier batch auditing)
// ============================================================================
if (!isMainThread && parentPort) {
  parentPort.on('message', async (msg) => {
    if (!msg || msg.cmd !== 'run') return;
    const { taskId, target, quality, noCache, auditOpts } = msg;
    try {
      const sc = await loadSpatialScene(target.unitId, {
        quality,
        subView: target.subView,
        noCache,
      });
      const res = runUnitAudit(sc, auditOpts);
      res.label = target.label;
      res.physicalAssembly = Boolean(target.physicalAssembly);
      res.uiSubView = Boolean(target.uiSubView);
      res.loadMs = sc.loadMs;
      res.fromCache = sc.fromCache;
      parentPort.postMessage({ taskId, ok: true, result: res });
    } catch (err) {
      parentPort.postMessage({
        taskId,
        ok: false,
        target,
        quality,
        error: err?.stack || err?.message || String(err),
      });
    }
  });
}

const HELP = `
sp — 0.0001 mm Certified Automatic Spatial Map & Pre-Collision Simulation Engine
Usage: npm run sp -- <mode> [options]

Modes:
  inspect      Unit/group summary & bounds (--unit=U [--subview=N] [--group=G] [--list-units])
  map          Auto multi-layer TRI-SAT or 0.001mm SDF zoom map (--zoom=x0..x1,y0..y1,z0..z1 --res=R [--sdf] [--html=PATH])
  pockets      0.001mm certified free-pocket search (--fit=W,H,D [--inside=ID] [--emit-ts])
  sim          Pre-collision candidate simulation (--candidates=JSON [--auto-fix] [--ray=PRESETS] [--inside=ID])
  audit        Full exact triangle audit (0.0001mm strict / 7-axis):
                 [--unit=U | --all-non-welcome] [--subview=N|all] [--all-tiers] [--quality=Q]
                 [--strict] [--tol=0.0001] [--include-smt-as-fail] [--group=G]
                 [--explode-steps=16] [--explode-tol=0.0001]
                 [--check-floating] [--float-tol=0.05] [--connect-tol=0.10]
                 [--check-protrusion] [--check-alignment]
                 [--workers=N] [--out-json=PATH] [--no-ui-subviews]
  ray          Optical/RF sightline cone raycasting (--preset=welcome-tof,welcome-lux,welcome-rf)
  thermal-cog  Mass, volume, world CoG, tipping angles & heat-source clearances
  diff         Save snapshot (--save-snapshot=PATH) or compare (--from-snapshot=PATH)
  bench        Cold/warm cache & exact SDF/audit speed benchmark
  selftest     27-case 0.0001 mm mathematical oracle self-test
`;

function parseArgs(argv) {
  const mode = argv[0] || 'help';
  const flags = {};
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-h' || a === '--help') flags.help = true;
    else if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq >= 0) flags[a.slice(2, eq)] = a.slice(eq + 1);
      else flags[a.slice(2)] = true;
    }
  }
  return { mode, flags };
}

function parseZoom(str) {
  const parts = String(str).split(',').map((seg) => seg.split('..').map(Number));
  if (parts.length !== 3 || parts.some((p) => p.length !== 2 || p.some(Number.isNaN))) {
    throw new Error(`Invalid --zoom='${str}'. Expected x0..x1,y0..y1,z0..z1`);
  }
  return {
    xMin: parts[0][0], xMax: parts[0][1],
    yMin: parts[1][0], yMax: parts[1][1],
    zMin: parts[2][0], zMax: parts[2][1],
  };
}

function parseSubViewFlag(val) {
  if (val === undefined || val === null || val === false) return null;
  if (val === 'all') return 'all';
  const n = Number(val);
  if (Number.isNaN(n)) throw new Error(`Invalid --subview='${val}'. Expected integer or 'all'`);
  return n;
}

function buildAuditOptsFromFlags(flags) {
  const opts = {
    group: flags.group || null,
    strict: Boolean(flags.strict),
    includeSmtAsFail: Boolean(flags['include-smt-as-fail']),
    explodeSteps: Number(flags['explode-steps'] || 0),
    checkFloating: Boolean(flags['check-floating']),
    checkProtrusion: Boolean(flags['check-protrusion']),
    checkAlignment: Boolean(flags['check-alignment']),
  };
  if (flags.tol !== undefined) opts.tolMm = Number(flags.tol);
  if (flags['explode-tol'] !== undefined) opts.explodeTolMm = Number(flags['explode-tol']);
  if (flags['float-tol'] !== undefined) opts.floatTolMm = Number(flags['float-tol']);
  if (flags['connect-tol'] !== undefined) opts.connectTolMm = Number(flags['connect-tol']);
  if (flags['near-miss'] !== undefined) opts.nearMissMm = Number(flags['near-miss']);
  return opts;
}

function outJson(obj) {
  process.stdout.write(JSON.stringify(obj, null, 2) + '\n');
}

function writeOutJsonFile(filePath, obj) {
  fs.mkdirSync(path.dirname(path.resolve(filePath)), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf8');
}

function formatAuditSummaryLine(r) {
  const svPart = r.subView !== null && r.subView !== undefined ? `:${r.subViewTag}` : '';
  const protCnt = r.protrusion ? r.protrusion.envelopeProtrusions.filter((p) => !p.exposedExternalHint).length : 0;
  const driftCnt = r.alignment ? r.alignment.coordDrifts.length : 0;
  const islCnt = r.disconnectedIslands ? r.disconnectedIslands.length : 0;
  return (
    `[sp audit] VERDICT=${r.verdict} (exit=${r.exitCode}) | unit=${r.unitId}${svPart} (${r.quality}) | ` +
    `parts=${r.partCount} tris=${r.triCount.toLocaleString()} | tol=${r.precisionMm}mm | ` +
    `col=${r.collisions.length} (mech=${r.mechanicalCollisionCount ?? r.collisions.length}, smt=${r.smtSeatingCount}) | ` +
    `flush=${r.coplanarFlushCount ?? r.kissingCount} | float=${r.floating.length} isl=${islCnt} | ` +
    `prot=${protCnt} drift=${driftCnt} | exp=${r.explodeCollisions.length} | ${r.elapsedMs}ms`
  );
}

/**
 * Parallel LPT work-stealing worker_threads batch runner for multi-unit / multi-tier audits,
 * with optional atomic per-task checkpointing (--resume-dir=DIR).
 */
async function runParallelAuditBatch(tasks, noCache, auditOpts, workerCount, quiet = false, resumeDir = null) {
  // Pre-build unified V2 runtime bundle once on main thread so all workers share cached ESM file (~10ms import)
  ensureUnifiedV2RuntimeBundlePath();
  if (resumeDir) fs.mkdirSync(resumeDir, { recursive: true });

  const taskFile = (item) =>
    resumeDir ? path.join(resumeDir, `${item.target.unitId}__${item.target.subViewTag}__${item.quality}.json`) : null;

  // LPT scheduling: run heaviest units first to minimize tail latency
  const weightOf = (unitId) => {
    if (unitId === 'integrated') return 1000;
    if (unitId === 'camera_body') return 900;
    if (unitId === 'lcd') return 880;
    if (unitId === 'cfexpress') return 850;
    if (unitId === 'evf') return 820;
    if (unitId === 'drybox') return 800;
    if (unitId === 'shutter') return 750;
    if (unitId === 'mic') return 700;
    if (unitId === 'sensor') return 680;
    if (unitId === 'battery') return 650;
    if (unitId === 'lens' || unitId === 'mount' || unitId === 'original') return 600;
    if (unitId === 'body' || unitId === 'mishoe') return 500;
    return 300;
  };
  const allIndexed = tasks.map((t, origIdx) => ({ ...t, origIdx, weight: weightOf(t.target.unitId) }));
  const results = new Array(tasks.length);
  const errors = [];
  const indexed = [];
  let completed = 0;

  for (const item of allIndexed) {
    const tf = taskFile(item);
    if (tf && fs.existsSync(tf)) {
      try {
        results[item.origIdx] = JSON.parse(fs.readFileSync(tf, 'utf8'));
        completed++;
        continue;
      } catch {}
    }
    indexed.push(item);
  }
  indexed.sort((a, b) => b.weight - a.weight || a.origIdx - b.origIdx);

  if (indexed.length === 0) {
    if (!quiet) process.stderr.write(`  [resume] All ${tasks.length} tasks loaded from ${resumeDir}\n`);
    return { results: results.filter(Boolean), errors };
  }
  if (completed > 0 && !quiet) {
    process.stderr.write(`  [resume] Reused ${completed}/${tasks.length} cached tasks from ${resumeDir}; running remaining ${indexed.length}\n`);
  }

  const saveTaskCheckpoint = (item, res) => {
    const tf = taskFile(item);
    if (!tf) return;
    const tmp = `${tf}.${process.pid}.${Math.random().toString(36).slice(2, 7)}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(res), 'utf8');
    fs.renameSync(tmp, tf);
  };

  const nWorkers = Math.max(1, Math.min(workerCount, indexed.length));
  let cursor = 0;

  if (nWorkers === 1) {
    for (let i = 0; i < indexed.length; i++) {
      const item = indexed[i];
      try {
        const sc = await loadSpatialScene(item.target.unitId, {
          quality: item.quality,
          subView: item.target.subView,
          noCache,
        });
        const res = runUnitAudit(sc, auditOpts);
        res.label = item.target.label;
        res.physicalAssembly = Boolean(item.target.physicalAssembly);
        res.uiSubView = Boolean(item.target.uiSubView);
        res.loadMs = sc.loadMs;
        res.fromCache = sc.fromCache;
        results[item.origIdx] = res;
        saveTaskCheckpoint(item, res);
      } catch (err) {
        errors.push({ target: item.target, quality: item.quality, error: err?.message || String(err) });
      }
      completed++;
      if (!quiet) {
        process.stderr.write(`  [${completed}/${tasks.length}] ${item.target.unitId}:${item.target.subViewTag} (${item.quality}) done\n`);
      }
    }
    return { results: results.filter(Boolean), errors };
  }

  const workerUrl = new URL('./sp.mjs', import.meta.url);
  await new Promise((resolveAll) => {
    let alive = nWorkers;
    for (let w = 0; w < nWorkers; w++) {
      const worker = new Worker(workerUrl);
      const itemByTaskId = new Map();
      const dispatch = () => {
        if (cursor >= indexed.length) {
          worker.terminate();
          return;
        }
        const item = indexed[cursor++];
        itemByTaskId.set(item.origIdx, item);
        worker.postMessage({
          cmd: 'run',
          taskId: item.origIdx,
          target: item.target,
          quality: item.quality,
          noCache,
          auditOpts,
        });
      };

      worker.on('message', (msg) => {
        completed++;
        const item = itemByTaskId.get(msg.taskId);
        itemByTaskId.delete(msg.taskId);
        if (msg.ok) {
          results[msg.taskId] = msg.result;
          if (item) saveTaskCheckpoint(item, msg.result);
          if (!quiet) {
            const r = msg.result;
            process.stderr.write(
              `  [${completed}/${tasks.length}] ${r.unitId}:${r.subViewTag} (${r.quality}) ` +
              `${r.partCount}p col=${r.collisions.length} flt=${r.floating.length} isl=${r.disconnectedIslands.length} ` +
              `exp=${r.explodeCollisions.length} (${r.elapsedMs}ms)\n`
            );
          }
        } else {
          errors.push({ target: msg.target, quality: msg.quality, error: msg.error });
          process.stderr.write(`  [ERR ${completed}/${tasks.length}] ${msg.target.unitId}:${msg.target.subViewTag} (${msg.quality}): ${msg.error}\n`);
        }
        dispatch();
      });

      worker.on('error', (err) => {
        errors.push({ target: { unitId: 'worker' }, quality: 'n/a', error: err.message });
      });

      worker.on('exit', () => {
        alive--;
        if (alive <= 0) resolveAll();
      });

      dispatch();
    }
  });

  return { results: results.filter(Boolean), errors };
}

function summarizeBatchAudit(targets, tiers, results, errors, auditOpts, elapsedMs) {
  const uniqueModes = new Set(targets.map((t) => t.unitId));
  const physicalTargets = targets.filter((t) => t.physicalAssembly);

  // Sum extracted part count across physical assemblies at highest available tier (ultra preferred)
  const refTier = tiers.includes('ultra') ? 'ultra' : tiers[tiers.length - 1];
  let totalPhysicalParts = 0;
  let zeroMeshTotal = 0;
  const byTier = {};
  const byMode = {};

  for (const t of tiers) {
    byTier[t] = {
      tasks: 0,
      pass: 0,
      fail: 0,
      collisionsTotal: 0,
      mechanicalCollisions: 0,
      smtSeating: 0,
      coplanarFlush: 0,
      floatingParts: 0,
      floatingIslands: 0,
      nonExposedProtrusions: 0,
      explodeCollisions: 0,
      coordDrifts: 0,
      meshHealthIssues: 0,
      severityCounts: { S0_CRITICAL: 0, S1_MAJOR: 0, S2_MINOR: 0, S3_MICRO: 0, SMT_SEAT: 0 },
    };
  }

  for (const r of results) {
    const bt = byTier[r.quality];
    const nonExpProt = r.protrusion ? r.protrusion.envelopeProtrusions.filter((p) => !p.exposedExternalHint).length : 0;
    const drifts = r.alignment ? r.alignment.coordDrifts.length : 0;
    const health = r.alignment ? r.alignment.meshHealthIssues.length : 0;

    if (r.physicalAssembly && r.quality === refTier) {
      totalPhysicalParts += r.partCount;
      zeroMeshTotal += r.extractionAudit?.zeroMeshParts?.length || 0;
    }

    if (bt && r.physicalAssembly) {
      bt.tasks++;
      if (r.exitCode === SP_EXIT_PASS) bt.pass++;
      else bt.fail++;
      bt.collisionsTotal += r.collisions.length;
      bt.mechanicalCollisions += r.mechanicalCollisionCount ?? 0;
      bt.smtSeating += r.smtSeatingCount ?? 0;
      bt.coplanarFlush += r.coplanarFlushCount ?? 0;
      bt.floatingParts += r.floating.length;
      bt.floatingIslands += r.disconnectedIslands?.length || 0;
      bt.nonExposedProtrusions += nonExpProt;
      bt.explodeCollisions += r.explodeCollisions.length;
      bt.coordDrifts += drifts;
      bt.meshHealthIssues += health;
      if (r.severityCounts) {
        for (const k of Object.keys(bt.severityCounts)) {
          bt.severityCounts[k] += r.severityCounts[k] || 0;
        }
      }
    }

    if (!byMode[r.unitId]) {
      byMode[r.unitId] = { unitId: r.unitId, physicalAssemblies: 0, parts: 0, tiers: {} };
    }
    if (r.physicalAssembly && r.quality === refTier) {
      byMode[r.unitId].physicalAssemblies++;
      byMode[r.unitId].parts += r.partCount;
    }
    if (r.physicalAssembly) {
      if (!byMode[r.unitId].tiers[r.quality]) {
        byMode[r.unitId].tiers[r.quality] = {
          collisions: 0,
          mechanical: 0,
          smt: 0,
          flush: 0,
          floating: 0,
          islands: 0,
          protrusions: 0,
          explodeHits: 0,
          drifts: 0,
          healthIssues: 0,
          s0: 0,
          s1: 0,
          s2: 0,
          s3: 0,
        };
      }
      const mt = byMode[r.unitId].tiers[r.quality];
      mt.collisions += r.collisions.length;
      mt.mechanical += r.mechanicalCollisionCount ?? 0;
      mt.smt += r.smtSeatingCount ?? 0;
      mt.flush += r.coplanarFlushCount ?? 0;
      mt.floating += r.floating.length;
      mt.islands += r.disconnectedIslands?.length || 0;
      mt.protrusions += nonExpProt;
      mt.explodeHits += r.explodeCollisions.length;
      mt.drifts += drifts;
      mt.healthIssues += health;
      mt.s0 += r.severityCounts?.S0_CRITICAL || 0;
      mt.s1 += r.severityCounts?.S1_MAJOR || 0;
      mt.s2 += r.severityCounts?.S2_MINOR || 0;
      mt.s3 += r.severityCounts?.S3_MICRO || 0;
    }
  }

  const allPass = errors.length === 0 && results.every((r) => r.exitCode === SP_EXIT_PASS);
  return {
    schema: 'sp-audit-batch/v2',
    generatedAt: new Date().toISOString(),
    verdict: errors.length > 0 ? 'ERROR' : allPass ? 'PASS' : 'FAIL',
    exitCode: errors.length > 0 ? SP_EXIT_ERROR : allPass ? SP_EXIT_PASS : SP_EXIT_FAIL,
    elapsedMs: Number(elapsedMs.toFixed(1)),
    options: auditOpts,
    summary: {
      modeCount: uniqueModes.size,
      physicalAssemblyCount: physicalTargets.length,
      totalViewStates: targets.length,
      tiers,
      totalTasks: targets.length * tiers.length,
      completedTasks: results.length,
      extractionErrors: errors.length,
      totalUniquePartsAudited: totalPhysicalParts,
      zeroMeshPartsTotal: zeroMeshTotal,
      byTier,
      byMode,
    },
    errors,
    results,
  };
}

async function main() {
  if (!isMainThread) return;
  const { mode, flags } = parseArgs(process.argv.slice(2));
  if (mode === 'help' || flags.help) {
    process.stdout.write(HELP.trimStart() + '\n');
    process.exit(SP_EXIT_PASS);
  }

  try {
    if (mode === 'selftest') {
      const res = runSpatialSelfTest();
      if (flags.json) outJson(res);
      else {
        console.log(`[sp selftest] VERDICT=${res.verdict} (${res.passed}/${res.total} PASS) | precision=${res.precisionMm}mm | ${res.elapsedMs}ms`);
        if (!flags.ai || res.verdict !== 'PASS') {
          for (const c of res.cases) {
            console.log(`  [${c.ok ? 'PASS' : 'FAIL'}] ${c.id} ${c.name} (${c.ms}ms)${c.ok ? '' : ` — ${c.error}`}`);
          }
        }
      }
      process.exit(res.exitCode);
    }

    if (mode === 'inspect' && flags['list-units']) {
      const units = discoverRegisteredUnits();
      if (flags.json) outJson({ units });
      else {
        console.log(`[sp inspect] Registered units (${units.length}):`);
        for (const u of units) console.log(`  - ${u.unitId.padEnd(14)} declared=${u.declaredPartCount}p`);
      }
      process.exit(SP_EXIT_PASS);
    }

    const unitId = flags.unit || 'welcome';
    const quality = flags.quality || 'ultra';
    const noCache = Boolean(flags['no-cache']);
    const subViewFlag = parseSubViewFlag(flags.subview);

    if (mode === 'bench') {
      const sCold = await loadSpatialScene(unitId, { quality, subView: subViewFlag, noCache: true });
      const sWarm = await loadSpatialScene(unitId, { quality, subView: subViewFlag, noCache: false });
      const aRes = runUnitAudit(sWarm, { group: flags.group || null });
      const out = {
        verdict: 'PASS',
        unitId, quality,
        parts: sWarm.parts.length,
        meshes: sWarm.meshes.length,
        tris: sWarm.totalTris,
        coldMs: sCold.loadMs,
        warmMs: sWarm.loadMs,
        auditMs: aRes.elapsedMs,
      };
      if (flags.json) outJson(out);
      else {
        console.log(
          `[sp bench] unit=${unitId} (${quality}) | parts=${out.parts} meshes=${out.meshes} tris=${out.tris.toLocaleString()} | cold=${out.coldMs}ms warm=${out.warmMs}ms audit=${out.auditMs}ms`
        );
      }
      process.exit(SP_EXIT_PASS);
    }

    // Batch audit mode: --all-non-welcome OR --units=... OR --subview=all OR --all-tiers
    if (mode === 'audit' && (flags['all-non-welcome'] || flags.units || subViewFlag === 'all' || flags['all-tiers'])) {
      const t0 = performance.now();
      const auditOpts = buildAuditOptsFromFlags(flags);
      const includeUiSubViews = !flags['no-ui-subviews'];
      const tiers = flags['all-tiers'] ? ALL_TIERS : [quality];
      let targets;
      if (flags['all-non-welcome']) {
        targets = listAllNonWelcomeAuditTargets({ includeUiSubViews });
      } else if (flags.units) {
        const wanted = String(flags.units).split(',').map((s) => s.trim()).filter(Boolean);
        targets = [];
        for (const u of wanted) targets.push(...listUnitAuditTargets(u, { includeUiSubViews }));
      } else if (subViewFlag === 'all') {
        targets = listUnitAuditTargets(unitId, { includeUiSubViews });
      } else {
        targets = [{
          unitId,
          subView: subViewFlag,
          subViewTag: subViewFlag === null ? 'all' : (subViewFlag < 0 ? `svm${Math.abs(subViewFlag)}` : `sv${subViewFlag}`),
          label: subViewFlag === null ? 'Full Assembly' : `SubView ${subViewFlag}`,
          physicalAssembly: true,
        }];
      }

      const tasks = [];
      for (const target of targets) {
        for (const q of tiers) {
          tasks.push({ target, quality: q });
        }
      }

      const defaultWorkers = Math.max(1, Math.min(os.cpus().length, 6));
      const workerCount = flags.workers !== undefined ? Math.max(1, Number(flags.workers)) : (tasks.length >= 4 ? defaultWorkers : 1);
      const quietProgress = Boolean(flags.json && !flags['out-json']);
      const resumeDir = flags['resume-dir'] || null;
      if (!quietProgress && tasks.length > 4) {
        process.stderr.write(
          `[sp audit batch] targets=${targets.length} (${targets.filter((t) => t.physicalAssembly).length} physical) × tiers=${tiers.length} = ${tasks.length} tasks | workers=${workerCount} | tol=${auditOpts.tolMm ?? (auditOpts.strict ? 0.0001 : 0.002)}mm${resumeDir ? ` | resume=${resumeDir}` : ''}\n`
        );
      }

      const { results, errors } = await runParallelAuditBatch(tasks, noCache, auditOpts, workerCount, quietProgress, resumeDir);
      const batchReport = summarizeBatchAudit(targets, tiers, results, errors, auditOpts, performance.now() - t0);

      if (flags['out-json']) {
        writeOutJsonFile(flags['out-json'], batchReport);
      }

      if (flags.json) {
        outJson(batchReport);
      } else {
        const s = batchReport.summary;
        console.log(
          `[sp audit batch] VERDICT=${batchReport.verdict} (exit=${batchReport.exitCode}) | ` +
          `modes=${s.modeCount} physical=${s.physicalAssemblyCount} views=${s.totalViewStates} parts=${s.totalUniquePartsAudited} | ` +
          `tasks=${s.completedTasks}/${s.totalTasks} errs=${s.extractionErrors} | ${batchReport.elapsedMs}ms`
        );
        for (const [tier, bt] of Object.entries(s.byTier)) {
          console.log(
            `  TIER ${tier.padEnd(13)} | pass=${bt.pass}/${bt.tasks} | col=${bt.collisionsTotal} (mech=${bt.mechanicalCollisions} smt=${bt.smtSeating}) ` +
            `[S0=${bt.severityCounts.S0_CRITICAL} S1=${bt.severityCounts.S1_MAJOR} S2=${bt.severityCounts.S2_MINOR} S3=${bt.severityCounts.S3_MICRO}] ` +
            `flush=${bt.coplanarFlush} | float=${bt.floatingParts} isl=${bt.floatingIslands} prot=${bt.nonExposedProtrusions} exp=${bt.explodeCollisions} drift=${bt.coordDrifts}`
          );
        }
        if (!flags['all-non-welcome'] && !flags.ai) {
          for (const r of results) {
            console.log(formatAuditSummaryLine(r));
            for (const c of r.collisions.slice(0, 12)) {
              console.log(`  COL [${c.severity}]: ${c.partA} <-> ${c.partB} pen=${c.penMm}mm at=${JSON.stringify(c.centroidWorld)}`);
            }
            for (const e of r.explodeCollisions.slice(0, 8)) {
              console.log(`  EXP: ${e.partA} <-> ${e.partB} t=${e.tFirst}..${e.tWorst} pen=${e.penMm}mm`);
            }
          }
        }
        if (flags['out-json']) {
          console.log(`  OUT_JSON: ${flags['out-json']}`);
        }
      }
      process.exit(batchReport.exitCode);
    }

    const scene = await loadSpatialScene(unitId, { quality, subView: subViewFlag, noCache });

    if (mode === 'inspect') {
      const groups = {};
      for (const p of scene.parts) {
        if (!groups[p.groupKey]) groups[p.groupKey] = { count: 0, origin: scene.groupOrigins[p.groupKey] };
        groups[p.groupKey].count++;
      }
      if (flags.json) {
        outJson({
          unitId, subView: scene.subView, quality,
          parts: scene.parts.length, meshes: scene.meshes.length, tris: scene.totalTris,
          extractionAudit: scene.extractionAudit, groups, loadMs: scene.loadMs,
        });
      } else {
        console.log(`[sp inspect] unit=${unitId}:${scene.subViewTag} (${quality}) | parts=${scene.parts.length} meshes=${scene.meshes.length} tris=${scene.totalTris.toLocaleString()} | load=${scene.loadMs}ms (${scene.fromCache ? 'CACHE' : 'COLD'})`);
        for (const [gk, g] of Object.entries(groups)) {
          console.log(`  group=${gk.padEnd(18)} parts=${g.count} origin=${JSON.stringify(g.origin)}`);
        }
      }
      process.exit(SP_EXIT_PASS);
    }

    if (mode === 'map') {
      const origin = getFrameOrigin(scene, { frame: flags.frame, group: flags.group });
      const candidates = flags.candidates ? JSON.parse(fs.readFileSync(flags.candidates, 'utf8')) : [];
      let slices;
      if (flags.zoom) {
        const zb = parseZoom(flags.zoom);
        slices = [
          buildSpatialSlice(scene, {
            name: `ZOOM_${flags.res || 0.25}mm`,
            origin,
            ...zb,
            res: Number(flags.res || 0.25),
            group: flags.group || null,
            sdfMode: Boolean(flags.sdf),
            candidates,
          }),
        ];
      } else {
        slices = buildAutoMultiLayerMap(scene, {
          group: flags.group || null,
          frame: flags.frame,
          layers: flags.layers,
          res: flags.res,
          candidates,
        });
      }
      if (flags.html) writeSpatialHtmlViewer(unitId, slices, flags.html);
      if (flags.json) {
        outJson({ unitId, quality, slices: slices.map((s) => ({ ...s, grid: undefined, sdfGrid: undefined })) });
      } else {
        console.log(`[sp map] unit=${unitId} (${quality}) | load=${scene.loadMs}ms (${scene.fromCache ? 'CACHE' : 'COLD'}) | slices=${slices.length}`);
        for (const s of slices) console.log(renderSpatialSliceText(s, Boolean(flags.ascii)));
      }
      process.exit(SP_EXIT_PASS);
    }

    if (mode === 'pockets') {
      const fitSize = flags.fit ? String(flags.fit).split(',').map(Number) : [8, 2, 4];
      const pockets = findCertifiedPockets(scene, {
        fitSize,
        group: flags.group || null,
        insidePartId: flags.inside || null,
        minClearance: Number(flags.clearance ?? 0.25),
        topK: Number(flags.top || 6),
      });
      if (flags.json) outJson({ unitId, fitSize, pockets });
      else {
        console.log(`[sp pockets] unit=${unitId} fit=${fitSize.join('x')}mm | found=${pockets.length}`);
        pockets.forEach((p, i) => console.log(`  #${i + 1} local=${JSON.stringify(p.posLocal)} minGap=${p.minGapMm}mm nearest=${p.nearestPart}`));
        if (flags['emit-ts'] && pockets.length > 0) console.log('\n' + emitThreeSnippet(pockets));
      }
      process.exit(pockets.length > 0 ? SP_EXIT_PASS : SP_EXIT_FAIL);
    }

    if (mode === 'sim') {
      if (!flags.candidates) throw new Error('sim requires --candidates=<file.json> or inline JSON');
      const raw = fs.existsSync(flags.candidates) ? fs.readFileSync(flags.candidates, 'utf8') : flags.candidates;
      const cands = JSON.parse(raw);
      const list = Array.isArray(cands) ? cands : [cands];
      const res = runCandidateSim(scene, list, {
        group: flags.group || null,
        frame: flags.frame,
        minClearance: Number(flags.clearance ?? 0.2),
        insidePartId: flags.inside || null,
        autoFix: Boolean(flags['auto-fix']),
        rayPresets: flags.ray ? String(flags.ray).split(',') : [],
      });
      if (flags.json) outJson(res);
      else {
        console.log(`[sp sim] VERDICT=${res.verdict} (exit=${res.exitCode}) | candidates=${res.results.length} | ${res.elapsedMs}ms`);
        for (const r of res.results) {
          console.log(`  [${r.verdict}] ${r.id} minGap=${r.minGapMm}mm nearest=${r.nearestPart || 'none'} hits=${r.hits.length} outside=${r.outsideShell}`);
          if (r.autoFix) console.log(`    AUTO-FIX: newPosLocal=${JSON.stringify(r.autoFix.newPosLocal)} shift=${r.autoFix.shiftMm}mm gap=${r.autoFix.minGapMm}mm`);
        }
      }
      process.exit(res.exitCode);
    }

    if (mode === 'audit') {
      const r = runUnitAudit(scene, buildAuditOptsFromFlags(flags));
      if (flags['out-json']) writeOutJsonFile(flags['out-json'], r);
      if (flags.json) outJson(r);
      else {
        console.log(formatAuditSummaryLine(r));
        if (!flags.ai) {
          for (const c of r.collisions.slice(0, 20)) {
            console.log(`  COL [${c.severity}]: ${c.partA} <-> ${c.partB} pen=${c.penMm}mm`);
          }
          for (const e of r.explodeCollisions.slice(0, 10)) {
            console.log(`  EXP: ${e.partA} <-> ${e.partB} t=${e.t} pen=${e.penMm}mm`);
          }
        }
      }
      process.exit(r.exitCode);
    }

    if (mode === 'ray') {
      const presetNames = String(flags.preset || 'welcome-tof').split(',').map((s) => s.trim()).filter(Boolean);
      const results = presetNames.map((pn) => {
        const spec = RAY_PRESETS[pn];
        if (!spec) throw new Error(`Unknown ray preset '${pn}'. Available: ${Object.keys(RAY_PRESETS).join(', ')}`);
        return runRayConeCheck(scene, spec);
      });
      const allPass = results.every((r) => r.exitCode === SP_EXIT_PASS);
      if (flags.json) outJson({ verdict: allPass ? 'PASS' : 'FAIL', results });
      else {
        for (const r of results) {
          console.log(`[sp ray] ${r.verdict} | ${r.name} | fov=${r.fovDeg}° rays=${r.rayCount} occluded=${r.occludedCount} (${r.occludedPct}%) | ${r.elapsedMs}ms`);
          for (const oc of r.occluders) console.log(`  OCCLUDER: ${oc.part} (${oc.count} rays)`);
        }
      }
      process.exit(allPass ? SP_EXIT_PASS : SP_EXIT_FAIL);
    }

    if (mode === 'thermal-cog') {
      const tc = runThermalCogAnalysis(scene);
      if (flags.json) outJson(tc);
      else {
        console.log(
          `[sp thermal-cog] VERDICT=${tc.verdict} | unit=${tc.unitId} | mass=${tc.massG}g | vol=${tc.volumeCm3}cm³ | CoG_WORLD=(${tc.cogWorld.join(',')})mm | minTip=${tc.tippingDeg.min}° | ${tc.elapsedMs}ms`
        );
        console.log(
          `  Tipping Angles: front=${tc.tippingDeg.front}° rear=${tc.tippingDeg.rear}° left=${tc.tippingDeg.left}° right=${tc.tippingDeg.right}° (h_CoG=${tc.hCogMm}mm)`
        );
        for (const p of tc.thermalPairs) {
          console.log(`    [${p.status.padEnd(13)}] ${p.distMm.toFixed(3)}mm | ${p.source} <-> ${p.sensitive}`);
        }
      }
      process.exit(tc.exitCode);
    }

    if (mode === 'diff') {
      if (flags['save-snapshot']) {
        const snap = saveSnapshot(scene, flags['save-snapshot']);
        console.log(`[sp diff] Saved snapshot: ${flags['save-snapshot']} (${snap.unitId} ${snap.partCount}p ${snap.massG}g)`);
        process.exit(SP_EXIT_PASS);
      }
      if (flags['from-snapshot']) {
        const d = diffSnapshot(scene, flags['from-snapshot']);
        if (flags.json) outJson(d);
        else {
          console.log(
            `[sp diff] ${d.from} -> ${d.to} | Δparts=${d.deltaParts >= 0 ? '+' : ''}${d.deltaParts} Δtris=${d.deltaTris} Δmass=${d.deltaMassG}g Δvol=${d.deltaVolCm3}cm³ ΔCoG=(${d.deltaCog.join(',')})mm`
          );
        }
        process.exit(SP_EXIT_PASS);
      }
      throw new Error('diff requires --save-snapshot=<path> or --from-snapshot=<path>');
    }

    throw new Error(`Unknown sp mode '${mode}'. Run 'npm run sp -- --help'.`);
  } catch (err) {
    process.stderr.write(`[sp ${mode} ERROR] ${err.message}\n`);
    process.exit(SP_EXIT_ERROR);
  }
}

main();
