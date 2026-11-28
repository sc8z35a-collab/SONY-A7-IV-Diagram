#!/usr/bin/env node
/**
 * THE LAST EXAM V1 (`node scripts/exam.mjs`)
 *
 * Single AI-native command running 10 Pillars / 36 Industrial Engines / 530 Fixed Atomic Tests
 * (750-1,400+ expanded checks) powered by 16 real external industrial toolchains:
 *   CalculiX ccx 2.21 · OpenFOAM 1912 · Gmsh 4.12 · TetGen · Berkeley ngspice 42 · GNU gnucap
 *   KiCad 7.0.11 · FreeFEM++ 4.13 · Microsoft Z3 4.8.12 · COIN-OR CBC · Bullet 3.24 · ODE
 *   FCL 0.7 · CGAL 5.6 · OpenCASCADE 7.6 · Yosys 0.33 · Verilator 5.020 · Icarus Verilog
 *   KLayout 0.28 · Netgen-LVS · NumPy/SciPy 100k MC · OpenCV/scikit-image · Chrome pp1.1 · sp Float64
 *
 * Output protocol: `TLX1` (zero fluff, AI-first ultra-dense wire format).
 * Exit codes: 0=PASS(TLX1-RECEIPT) 1=ERR 2=FAIL 3=WARN 4=INVARIANT_MISMATCH 5=SOLVER_MISSING
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { discoverRegisteredUnits } from './spatial_engine/scene_extractor.mjs';
import { ENGINES, PILLARS, TEST_REGISTRY } from './exam/test_registry.mjs';
import { compileUnitIr, compilePlaygroundIr } from './exam/ir_compiler.mjs';
import { runEngineDag } from './exam/scheduler.mjs';
import {
  emitTlx1Report,
  EXIT_ERROR,
  EXIT_PASS,
  EXIT_SOLVER_MISSING,
} from './exam/tlx1_protocol.mjs';
import { assertAllSolversReady, REPO_ROOT } from './exam/engines/solver_exec.mjs';
import { runEX01, runEX02, runEX03, runEX04, runEX05 } from './exam/engines/p01_geometry_contact.mjs';
import { runEX06, runEX07, runEX08, runEX09, runEX10, runEX25, runEX26 } from './exam/engines/p02_fea_multibody.mjs';
import { runEX11, runEX12, runEX13, runEX14, runEX27, runEX28 } from './exam/engines/p03_dfm_dfa_fasteners.mjs';
import { runEX29, runEX15, runEX16, runEX17, runEX30, runEX31 } from './exam/engines/p04_cfd_spice_wiring_emc.mjs';
import { runEX18, runEX19, runEX20, runEX21 } from './exam/engines/p05_optics_acoustics.mjs';
import { runEX22, runEX23, runEX24, runEX32, runEX33, runEX34, runEX35, runEX36 } from './exam/engines/p06_formal_fsm_chem_visual.mjs';
import { evaluateCrossSolverLocks } from './exam/engines/cross_solver_lock.mjs';
import { runSelfTestOracle } from './exam/engines/selftest_oracle.mjs';

const RUNNERS = Object.freeze({
  EX01: runEX01, EX02: runEX02, EX03: runEX03, EX04: runEX04, EX05: runEX05,
  EX06: runEX06, EX07: runEX07, EX08: runEX08, EX09: runEX09, EX10: runEX10,
  EX11: runEX11, EX12: runEX12, EX13: runEX13, EX14: runEX14, EX15: runEX15,
  EX16: runEX16, EX17: runEX17, EX18: runEX18, EX19: runEX19, EX20: runEX20,
  EX21: runEX21, EX22: runEX22, EX23: runEX23, EX24: runEX24, EX25: runEX25,
  EX26: runEX26, EX27: runEX27, EX28: runEX28, EX29: runEX29, EX30: runEX30,
  EX31: runEX31, EX32: runEX32, EX33: runEX33, EX34: runEX34, EX35: runEX35,
  EX36: runEX36,
});

function parseArgs(argv) {
  const pos = [];
  const flags = {};
  for (const a of argv) {
    if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq >= 0) flags[a.slice(2, eq)] = a.slice(eq + 1);
      else flags[a.slice(2)] = true;
    } else {
      pos.push(a);
    }
  }
  return { pos, flags };
}

function cmdHelp() {
  process.stdout.write(
    `TLX1_HELP|cmd=node scripts/exam.mjs|engines=36|tests=${TEST_REGISTRY.length}|locks=16\n` +
    `USAGE|node scripts/exam.mjs --unit=<id> [--only=EX01,EX02] [--pillar=P01] [--resume=<runId>] [--max-fails=120] [--progress]\n` +
    `USAGE|node scripts/exam.mjs --all-units | --playground=<file.tlx.json> | setup | selftest | query <runId> [--status=FAIL|--engine=EX02|--test=T021] | list\n` +
    `EXIT|0=PASS_RECEIPT|1=ERR|2=FAIL|3=WARN|4=INVARIANT_MISMATCH|5=SOLVER_MISSING\n`
  );
}

const TLX_RUNS_BASE = process.env.FLOW_TLX_RUNS_DIR || (process.env.FLOW_AGENT_WS ? path.join(process.env.FLOW_AGENT_WS, 'tlx_runs') : '/tmp/tlx_runs');

function cmdQuery(runId, flags) {
  const dbPath = runId.endsWith('.ndjson')
    ? runId
    : path.join(TLX_RUNS_BASE, runId, 'results.ndjson');
  if (!fs.existsSync(dbPath)) {
    process.stdout.write(`TLX1_QUERY_ERR|missing=${dbPath}\n`);
    process.exit(EXIT_ERROR);
  }
  const lines = fs.readFileSync(dbPath, 'utf8').split(/\r?\n/).filter(Boolean);
  let out = 0;
  for (const l of lines) {
    const r = JSON.parse(l);
    if (r.kind !== 'T') continue;
    if (flags.test && r.id !== flags.test) continue;
    if (flags.engine && r.engine !== flags.engine) continue;
    if (flags.status && r.status !== flags.status) continue;
    if (flags.part && !(r.parts || []).some((p) => p.includes(flags.part))) continue;
    process.stdout.write(JSON.stringify(r) + '\n');
    out++;
  }
  process.stdout.write(`TLX1_QUERY_END|matched=${out}|db=${dbPath}\n`);
}

function selectEngines(flags) {
  let list = [...ENGINES];
  let fullRun = true;
  if (flags.only) {
    const want = new Set(String(flags.only).split(',').map((s) => s.trim().toUpperCase()));
    // Automatically pull in required DAG dependencies so partial runs never starve
    const expanded = new Set(want);
    let changed = true;
    while (changed) {
      changed = false;
      for (const id of [...expanded]) {
        const eng = ENGINES.find((e) => e.id === id);
        for (const d of eng?.deps || []) {
          if (!expanded.has(d)) { expanded.add(d); changed = true; }
        }
      }
    }
    list = ENGINES.filter((e) => expanded.has(e.id));
    fullRun = list.length === ENGINES.length;
  } else if (flags.pillar) {
    const wantP = new Set(String(flags.pillar).split(',').map((s) => s.trim().toUpperCase()));
    const wantE = new Set(ENGINES.filter((e) => wantP.has(e.pillar)).map((e) => e.id));
    let changed = true;
    while (changed) {
      changed = false;
      for (const id of [...wantE]) {
        const eng = ENGINES.find((e) => e.id === id);
        for (const d of eng?.deps || []) {
          if (!wantE.has(d)) { wantE.add(d); changed = true; }
        }
      }
    }
    list = ENGINES.filter((e) => wantE.has(e.id));
    fullRun = list.length === ENGINES.length;
  }
  return { list, fullRun };
}

async function runSingleTarget({ ir, flags, runId, runDir, envCheck }) {
  const t0 = performance.now();
  const { list: selectedEngines, fullRun } = selectEngines(flags);
  const ctx = {
    ir,
    outputs: {},
    cache: {},
    opts: {
      skipChrome: Boolean(flags['skip-chrome']),
      skipRepoChecks: Boolean(flags['skip-repo']),
    },
  };

  const engineResults = await runEngineDag({
    engines: selectedEngines,
    runners: RUNNERS,
    ctx,
    runDir,
    resume: Boolean(flags.resume),
    progressLog: Boolean(flags.progress),
  });

  const allTests = [];
  for (const er of Object.values(engineResults)) {
    for (const tr of er.tests || []) allTests.push(tr);
  }
  const crossLocks = evaluateCrossSolverLocks(ir, engineResults);
  const durationSec = (performance.now() - t0) / 1000;

  const rep = emitTlx1Report({
    ir,
    runId,
    runDir,
    engineResults,
    testResults: allTests,
    crossLocks,
    durationSec,
    fullRun: fullRun && !flags['skip-chrome'] && !flags['skip-repo'],
    solversReady: envCheck.ready,
    solversTotal: envCheck.total,
    maxFails: flags['max-fails'] ? Number(flags['max-fails']) : 120,
  });

  process.stdout.write(rep.formatted);
  return rep;
}

async function main() {
  const { pos, flags } = parseArgs(process.argv.slice(2));
  const sub = pos[0] || '';

  if (flags.help || flags.h || sub === 'help') {
    cmdHelp();
    process.exit(EXIT_PASS);
  }

  if (sub === 'setup') {
    const r = spawnSync('bash', [path.join(REPO_ROOT, 'scripts/exam_setup.sh')], { stdio: 'inherit' });
    process.exit(r.status ?? 1);
  }

  if (sub === 'list') {
    const units = discoverRegisteredUnits(REPO_ROOT).map((u) => `${u.unitId}:${u.declaredPartCount}`).join(',');
    process.stdout.write(`TLX1_LIST|pillars=${PILLARS.length}|engines=${ENGINES.length}|tests=${TEST_REGISTRY.length}|units=${units}\n`);
    for (const e of ENGINES) {
      const nT = TEST_REGISTRY.filter((t) => t.engine === e.id).length;
      process.stdout.write(`ENG|${e.id}|${e.pillar}|t=${nT}|sv=${e.solvers.join('+')}|${e.name}\n`);
    }
    process.exit(EXIT_PASS);
  }

  if (sub === 'query') {
    cmdQuery(pos[1] || '', flags);
    process.exit(EXIT_PASS);
  }

  // Strict no-compromise gate: all 32 external solver toolchains & C++ harnesses MUST be installed!
  const envCheck = assertAllSolversReady();
  if (!envCheck.ok) {
    process.stdout.write(
      `TLX1|verdict=SOLVER_MISSING|sv=${envCheck.ready}/${envCheck.total}|missing=${envCheck.missing.join(',')}|fix=node scripts/exam.mjs setup\n`
    );
    process.exit(EXIT_SOLVER_MISSING);
  }

  if (sub === 'selftest') {
    const st = await runSelfTestOracle(RUNNERS);
    process.stdout.write(
      `TLX1_SELFTEST|verdict=${st.ok ? 'PASS' : 'FAIL'}|pass=${st.passed}/${st.total}|dur_s=${st.durS.toFixed(2)}|sv=${envCheck.ready}/${envCheck.total}\n`
    );
    for (const f of st.failed) {
      process.stdout.write(`ST_FAIL|${f.id}|expect=${f.expect}|actual=${f.actual}|${f.detail}\n`);
    }
    process.exit(st.ok ? EXIT_PASS : 2);
  }

  if (flags.playground) {
    const bpPath = path.resolve(flags.playground);
    const runId = flags.resume || `pg_${Date.now()}`;
    const runDir = path.join(TLX_RUNS_BASE, runId);
    const ir = await compilePlaygroundIr(bpPath, { runDir });
    const rep = await runSingleTarget({ ir, flags, runId, runDir, envCheck });
    process.exit(rep.exitCode);
  }

  if (flags['all-units']) {
    const units = discoverRegisteredUnits(REPO_ROOT);
    let worstExit = 0;
    for (const u of units) {
      const runId = `${u.unitId}_${Date.now()}`;
      const runDir = path.join(TLX_RUNS_BASE, runId);
      const ir = await compileUnitIr(u.unitId, { runDir, allTiers: true });
      const rep = await runSingleTarget({ ir, flags, runId, runDir, envCheck });
      if (rep.exitCode > worstExit) worstExit = rep.exitCode;
    }
    process.exit(worstExit);
  }

  const unitId = flags.unit || 'welcome';
  const runId = flags.resume || `${unitId}_${Date.now()}`;
  const runDir = path.join(TLX_RUNS_BASE, runId);
  const ir = await compileUnitIr(unitId, { runDir, allTiers: true, noCache: Boolean(flags['no-cache']) });
  const rep = await runSingleTarget({ ir, flags, runId, runDir, envCheck });
  process.exit(rep.exitCode);
}

main().catch((err) => {
  process.stdout.write(`TLX1|verdict=ERR|msg=${String(err?.stack || err?.message || err).replace(/\n/g, ' ')}\n`);
  process.exit(EXIT_ERROR);
});
