#!/usr/bin/env node
/**
 * THE LAST EXAM V1.1 (`node scripts/exam.mjs`)
 *
 * Single AI-native command running 12 Pillars / 48 Industrial Engines / 1,080 Fixed Atomic Tests
 * (2,500-5,000+ expanded checks) powered by 48 real external industrial solvers & 6 C++17 harnesses:
 *   CalculiX ccx 2.21 · OpenFOAM 1912 · Gmsh 4.12 · TetGen · Berkeley ngspice 42 · GNU gnucap
 *   KiCad 7.0.11 · FreeFEM++ 4.13 · GetDP 3.2 · Microsoft Z3 4.8 · Stanford CVC5 1.1 · Boolector · MiniSat
 *   COIN-OR CBC · GLPK · Bullet 3.24 · ODE · DART 6.13 · FCL 0.7 · CGAL 5.6 · OpenCASCADE 7.6 · ADMesh · GTS
 *   FFTW3 · NLopt · GNU Octave 8.4 · Maxima 5.46 · Yosys 0.33 · nextpnr-ice40 · Verilator 5.020 · Icarus · GHDL
 *   KLayout 0.28 · Magic · Netgen-LVS · CVXOPT · R-Tree · igraph · Pint · statsmodels · mpmath · VTK · Chrome pp1.1
 *
 * 100.0000% PASS (48/48 engines, 1,080/1,080 tests, 28/28 cross-locks, 48/48 solvers) engraves
 * tamper-evident cryptographic「V1.1証明」(auto-revoked immediately upon any 0.0001mm 3D state drift).
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { discoverRegisteredUnits } from './spatial_engine/scene_extractor.mjs';
import { CROSS_SOLVER_LOCKS, ENGINES, PILLARS, TEST_REGISTRY } from './exam/test_registry.mjs';
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
import { runEX37, runEX38, runEX39, runEX40, runEX41, runEX42 } from './exam/engines/p07_power_boot_control.mjs';
import { runEX43, runEX44, runEX45, runEX46, runEX47, runEX48 } from './exam/engines/p08_mfg_reliability_cert.mjs';
import { wrapWithV11DeepChecks } from './exam/engines/v11_deep_checks.mjs';
import { evaluateCrossSolverLocks } from './exam/engines/cross_solver_lock.mjs';
import { runSelfTestOracle } from './exam/engines/selftest_oracle.mjs';
import { CERT_DIR, regenerateCertificatesTs, revokeUnitCertificate, verifyV11CertificateAgainstScene } from './exam/v11_certificate.mjs';

const BASE_RUNNERS = {
  EX01: runEX01, EX02: runEX02, EX03: runEX03, EX04: runEX04, EX05: runEX05,
  EX06: runEX06, EX07: runEX07, EX08: runEX08, EX09: runEX09, EX10: runEX10,
  EX11: runEX11, EX12: runEX12, EX13: runEX13, EX14: runEX14, EX15: runEX15,
  EX16: runEX16, EX17: runEX17, EX18: runEX18, EX19: runEX19, EX20: runEX20,
  EX21: runEX21, EX22: runEX22, EX23: runEX23, EX24: runEX24, EX25: runEX25,
  EX26: runEX26, EX27: runEX27, EX28: runEX28, EX29: runEX29, EX30: runEX30,
  EX31: runEX31, EX32: runEX32, EX33: runEX33, EX34: runEX34, EX35: runEX35,
  EX36: runEX36,
};

const RUNNERS = Object.freeze({
  ...Object.fromEntries(Object.entries(BASE_RUNNERS).map(([k, fn]) => [k, wrapWithV11DeepChecks(k, fn)])),
  EX37: runEX37, EX38: runEX38, EX39: runEX39, EX40: runEX40, EX41: runEX41, EX42: runEX42,
  EX43: runEX43, EX44: runEX44, EX45: runEX45, EX46: runEX46, EX47: runEX47, EX48: runEX48,
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
    `TLX11_HELP|cmd=node scripts/exam.mjs|pillars=${PILLARS.length}|engines=${ENGINES.length}|tests=${TEST_REGISTRY.length}|locks=${CROSS_SOLVER_LOCKS.length}|solvers=48\n` +
    `USAGE|node scripts/exam.mjs --unit=<id> [--only=EX01,EX37] [--pillar=P11] [--resume=<runId>] [--max-fails=120] [--progress]\n` +
    `USAGE|node scripts/exam.mjs --all-units | --playground=<file.tlx11.json> | setup | selftest | cert-status | cert-verify --unit=<id> | query <runId> | list\n` +
    `EXIT|0=PASS_RECEIPT_V11CERT|1=ERR|2=FAIL|3=WARN|4=INVARIANT_MISMATCH|5=SOLVER_MISSING\n`
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
    maxFails: flags['max-fails'] ? Number(flags['max-fails']) : 40,
    verbose: Boolean(flags.verbose),
    certOutPath: flags['cert-out'] || null,
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
    if (flags['verify-only'] || flags.verify) {
      const sv = assertAllSolversReady();
      const readyCnt = sv.ready ?? sv.okCount ?? (sv.total - sv.missing.length);
      process.stdout.write(`TLX11_SOLVERS|ready=${readyCnt}/${sv.total}|missing=${sv.missing.length}|status=${sv.ok ? 'READY' : 'MISSING'}\n`);
      if (!sv.ok) process.stdout.write(`MISSING|${sv.missing.join(',')}\n`);
      process.exit(sv.ok ? EXIT_PASS : EXIT_SOLVER_MISSING);
    }
    const sArgs = [path.join(REPO_ROOT, 'scripts/exam_setup.sh')];
    if (flags['force-rebuild']) sArgs.push('--force-rebuild');
    if (flags['skip-apt']) sArgs.push('--skip-apt');
    if (flags['export-prebuild']) sArgs.push(`--export-prebuild=${flags['export-prebuild']}`);
    if (flags['import-prebuild']) sArgs.push(`--import-prebuild=${flags['import-prebuild']}`);
    const r = spawnSync('bash', sArgs, { stdio: 'inherit' });
    process.exit(r.status ?? 1);
  }

  if (flags.project) {
    const { runRealArtifactDirectChecks } = await import('./exam/real_artifact_loader.mjs');
    const res = runRealArtifactDirectChecks(String(flags.project));
    if (res.error) {
      process.stdout.write(`TLX11_REAL|status=ERR|msg=${res.error}\n`);
      process.exit(EXIT_ERROR);
    }
    process.stdout.write(
      `TLX11_REAL|project=${res.projectId}|mode=${res.verificationMode}|complete=${res.complete ? 1 : 0}|missing=${res.missingArtifacts.join(',') || 'none'}|sha=${res.bundleSha256.slice(0, 16)}\n`
    );
    for (const [dom, info] of Object.entries(res.domains)) {
      process.stdout.write(`REAL_DOM|${dom}|status=${info.status}|detail=${JSON.stringify(info)}\n`);
    }
    process.exit(res.ok ? EXIT_PASS : 2);
  }

  if (sub === 'list') {
    const units = discoverRegisteredUnits(REPO_ROOT).map((u) => `${u.unitId}:${u.declaredPartCount}`).join(',');
    process.stdout.write(`TLX11_LIST|pillars=${PILLARS.length}|engines=${ENGINES.length}|tests=${TEST_REGISTRY.length}|locks=${CROSS_SOLVER_LOCKS.length}|solvers=48|units=${units}\n`);
    for (const e of ENGINES) {
      const nT = TEST_REGISTRY.filter((t) => t.engine === e.id).length;
      process.stdout.write(`ENG|${e.id}|${e.pillar}|t=${nT}|sv=${e.solvers.join('+')}|${e.name}\n`);
    }
    process.exit(EXIT_PASS);
  }

  if (sub === 'cert-status') {
    const units = discoverRegisteredUnits(REPO_ROOT);
    let certCount = 0;
    const rows = [];
    for (const u of units) {
      const cp = path.join(CERT_DIR, `${u.unitId}.v1_1.cert.json`);
      if (fs.existsSync(cp)) {
        try {
          const c = JSON.parse(fs.readFileSync(cp, 'utf8'));
          const chk = verifyV11CertificateAgainstScene(c, null, { checkKernel: true });
          if (chk.valid && c.status === 'CERTIFIED') {
            certCount++;
            rows.push(`CERT|u=${u.unitId}|status=CERTIFIED|cert=${c.certId}|at=${c.issuedAt}`);
          } else {
            rows.push(`CERT|u=${u.unitId}|status=${chk.status}|reason=${chk.reason}`);
          }
        } catch {
          rows.push(`CERT|u=${u.unitId}|status=REVOKED_CORRUPT`);
        }
      } else {
        rows.push(`CERT|u=${u.unitId}|status=UNVERIFIED`);
      }
    }
    process.stdout.write(`TLX11_CERT_STATUS|certified=${certCount}/${units.length}\n${rows.join('\n')}\n`);
    process.exit(EXIT_PASS);
  }

  if (sub === 'cert-verify') {
    const unitId = flags.unit || pos[1] || 'welcome';
    const cp = path.join(CERT_DIR, `${unitId}.v1_1.cert.json`);
    if (!fs.existsSync(cp)) {
      process.stdout.write(`V11_CERT_VERIFY|u=${unitId}|status=UNVERIFIED|valid=0\n`);
      process.exit(EXIT_PASS);
    }
    const cert = JSON.parse(fs.readFileSync(cp, 'utf8'));
    const runDir = path.join(TLX_RUNS_BASE, `cert_verify_${unitId}_${Date.now()}`);
    const ir = await compileUnitIr(unitId, { runDir, allTiers: true });
    const chk = verifyV11CertificateAgainstScene(cert, ir, { checkKernel: true });
    if (!chk.valid) {
      revokeUnitCertificate(unitId, chk.reason);
      process.stdout.write(`V11_CERT_VERIFY|u=${unitId}|status=${chk.status}|valid=0|revoked=1|reason=${chk.reason}\n`);
      process.exit(2);
    }
    process.stdout.write(`V11_CERT_VERIFY|u=${unitId}|status=CERTIFIED|valid=1|cert=${cert.certId}\n`);
    process.exit(EXIT_PASS);
  }

  if (sub === 'query') {
    cmdQuery(pos[1] || '', flags);
    process.exit(EXIT_PASS);
  }

  // Strict no-compromise gate: all 48 external solver toolchains & 6 C++17 harnesses MUST be installed!
  const envCheck = assertAllSolversReady();
  if (!envCheck.ok) {
    process.stdout.write(
      `TLX1|v=1.1|verdict=SOLVER_MISSING|sv=${envCheck.ready}/${envCheck.total}|missing=${envCheck.missing.join(',')}|fix=node scripts/exam.mjs setup\n`
    );
    process.exit(EXIT_SOLVER_MISSING);
  }

  if (sub === 'selftest') {
    const st = await runSelfTestOracle(RUNNERS);
    process.stdout.write(
      `TLX11_SELFTEST|verdict=${st.ok ? 'PASS' : 'FAIL'}|pass=${st.passed}/${st.total}|engines=${ENGINES.length}|tests=${TEST_REGISTRY.length}|locks=${CROSS_SOLVER_LOCKS.length}|dur_s=${st.durS.toFixed(2)}|sv=${envCheck.ready}/${envCheck.total}\n`
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
    const certOutPath = flags['cert-out'] || bpPath.replace(/(\.tlx11|\.tlx)?\.json$/i, '.v1_1.cert.json');
    const rep = await runSingleTarget({ ir, flags: { ...flags, 'cert-out': certOutPath }, runId, runDir, envCheck });
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
    regenerateCertificatesTs(REPO_ROOT);
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
