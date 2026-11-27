#!/usr/bin/env node
/**
 * `sokutei` — High-Precision Statistical Benchmark & System Load Profiler
 * (Zero external npm dependencies: Pure Node.js 22 + Linux /proc + V8/GC/EventLoop + Chrome CDP)
 *
 * Measures ALL 10 repository domains (55+ metrics) in ONE command (`npm run sokutei`),
 * OR targets any specific location / unit / tier / custom JSON / arbitrary shell command.
 * Supports Before/After statistical comparison (95% CI, CV%, Welch's t-test, GeoMean speedup).
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  buildComparisonReport,
  renderMarkdownReport,
  roundNum,
  summarizeSamples,
} from './sokutei_core/stats.mjs';
import {
  collectEnvironmentFingerprint,
  hrMs,
  measureProcess,
} from './sokutei_core/telemetry.mjs';
import {
  ALL_DOMAIN_IDS,
  DOMAIN_CATALOG,
  DOMAIN_RUNNERS,
} from './sokutei_core/domains.mjs';

const ROOT = process.cwd();

const HELP_TEXT = `
sokutei — High-Precision Statistical Benchmark & Load Profiler (10 Domains / 55+ Metrics)

Usage: npm run sokutei -- [options]

Selection Modes (Full vs Custom Location/Metric):
  --all                       Measure ALL 10 domains automatically (default when no --target/--cmd)
  --target=<d1,d2,...>        Measure ONLY specific domain(s):
                              build | v2_unit | webgl | pp | validate | catalog | mirai | wlk220 | sim_app | bg_bench
  --units=<u1,u2,...|all>     Target 3D units for v2_unit (default: welcome,evf,integrated; or 'all' for 22 units)
  --tiers=<t1,t2,...>         Target quality tiers for v2_unit (default: standard_lite,high,ultra)
  --pp-presets=<p1,p2,...>    Target pp presets (default: audit,welcome,mobile,ui_only,single_cad)
  --custom='<json>'           Custom benchmark profile JSON:
                              {"targets":[...],"units":[...],"tiers":[...],"runs":3,"warmup":1,"ppPresets":[...]}
  --cmd="<shell command>"     Statistically profile ANY arbitrary command (wall, CPU%, Peak RSS, CI95)
  --list                      List all 10 measurable domains & metrics (instant, zero cost)

Precision & Sampling Controls:
  --quick                     Fast smoke profile (runs=1, warmup=0, light unit set)
  --rigorous                  Strict statistical profile (runs=3, warmup=1)
  --runs=<N>                  Timed statistical iterations per metric (default: 2 standard / 1 quick / 3 rigorous)
  --warmup=<N>                Discard warmup runs before timing (default: 0 standard / 1 rigorous)

Output, Comparison & Regression Gate:
  --save-baseline=<file.json> Save full statistical JSON report as a baseline
  --out=<file.json>           Write full JSON report to file
  --md=<file.md>              Write human/AI-readable Markdown report to file
  --compare=<baseline.json>   Compare current run against baseline (GeoMean speedup, Welch's t-test)
  --assert-speedup=<X>        Exit code 2 if overall geometric-mean speedup < X (requires --compare)
  --json                      Print pure JSON report to stdout (machine-readable for AI agents)
  --help, -h                  Show this help
`;

function parseArgs(argv) {
  const opts = {
    all: false,
    targets: null,
    units: ['welcome', 'evf', 'integrated'],
    tiers: ['standard_lite', 'high', 'ultra'],
    ppPresets: ['audit', 'welcome', 'mobile', 'ui_only', 'single_cad'],
    quick: false,
    rigorous: false,
    runs: null,
    warmup: null,
    customCmd: null,
    outJson: null,
    saveBaseline: null,
    outMd: null,
    comparePath: null,
    assertSpeedup: null,
    jsonStdout: false,
    list: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') {
      console.log(HELP_TEXT);
      process.exit(0);
    } else if (a === '--list') {
      opts.list = true;
    } else if (a === '--all') {
      opts.all = true;
    } else if (a === '--quick') {
      opts.quick = true;
    } else if (a === '--rigorous') {
      opts.rigorous = true;
    } else if (a === '--json') {
      opts.jsonStdout = true;
    } else if (a.startsWith('--target=') || a.startsWith('--targets=')) {
      const v = a.slice(a.indexOf('=') + 1);
      opts.targets = v.split(',').map((s) => s.trim()).filter(Boolean);
    } else if (a.startsWith('--units=')) {
      opts.units = a.slice(8).split(',').map((s) => s.trim()).filter(Boolean);
    } else if (a.startsWith('--tiers=')) {
      opts.tiers = a.slice(8).split(',').map((s) => s.trim()).filter(Boolean);
    } else if (a.startsWith('--pp-presets=')) {
      opts.ppPresets = a.slice(13).split(',').map((s) => s.trim()).filter(Boolean);
    } else if (a.startsWith('--runs=')) {
      opts.runs = Math.max(1, Number.parseInt(a.slice(7), 10) || 1);
    } else if (a.startsWith('--warmup=')) {
      opts.warmup = Math.max(0, Number.parseInt(a.slice(9), 10) || 0);
    } else if (a.startsWith('--cmd=')) {
      opts.customCmd = a.slice(6);
    } else if (a.startsWith('--out=')) {
      opts.outJson = path.resolve(a.slice(6));
    } else if (a.startsWith('--save-baseline=')) {
      opts.saveBaseline = path.resolve(a.slice(16));
    } else if (a.startsWith('--md=')) {
      opts.outMd = path.resolve(a.slice(5));
    } else if (a.startsWith('--compare=')) {
      opts.comparePath = path.resolve(a.slice(10));
    } else if (a.startsWith('--assert-speedup=')) {
      opts.assertSpeedup = Number.parseFloat(a.slice(17));
    } else if (a.startsWith('--custom=')) {
      const cfg = JSON.parse(a.slice(9));
      if (Array.isArray(cfg.targets)) opts.targets = cfg.targets;
      if (Array.isArray(cfg.units)) opts.units = cfg.units;
      if (Array.isArray(cfg.tiers)) opts.tiers = cfg.tiers;
      if (Array.isArray(cfg.ppPresets)) opts.ppPresets = cfg.ppPresets;
      if (typeof cfg.runs === 'number') opts.runs = Math.max(1, cfg.runs);
      if (typeof cfg.warmup === 'number') opts.warmup = Math.max(0, cfg.warmup);
      if (typeof cfg.cmd === 'string') opts.customCmd = cfg.cmd;
      if (typeof cfg.quick === 'boolean') opts.quick = cfg.quick;
      if (typeof cfg.rigorous === 'boolean') opts.rigorous = cfg.rigorous;
    }
  }

  if (opts.runs === null) opts.runs = opts.rigorous ? 3 : opts.quick ? 1 : 2;
  if (opts.warmup === null) opts.warmup = opts.rigorous ? 1 : 0;
  if (!opts.targets && !opts.customCmd) {
    opts.all = true;
    opts.targets = [...ALL_DOMAIN_IDS];
  } else if (opts.targets?.includes('all')) {
    opts.targets = [...ALL_DOMAIN_IDS];
  }
  return opts;
}

async function runCustomCommandBench(opts) {
  const wallSamples = [];
  const cpuSamples = [];
  const rssSamples = [];
  const parSamples = [];
  let lastExit = 0;

  for (let i = -opts.warmup; i < opts.runs; i++) {
    const r = await measureProcess(opts.customCmd, [], { cwd: ROOT, shell: true });
    lastExit = r.exitCode;
    if (i >= 0) {
      wallSamples.push(r.wallMs);
      cpuSamples.push(r.cpuPct);
      rssSamples.push(r.peakRssMb);
      parSamples.push(r.parallelEffPct);
    }
  }

  return {
    wallMs: roundNum(wallSamples.reduce((a, b) => a + b, 0), 2),
    metrics: {
      cmd_wall_ms: { ...summarizeSamples(wallSamples, 'ms'), lowerIsBetter: true, primarySpeedMetric: true },
      cmd_cpu_pct: { ...summarizeSamples(cpuSamples, '%', 1), lowerIsBetter: false, primarySpeedMetric: false },
      cmd_peak_rss_mb: { ...summarizeSamples(rssSamples, 'MB', 2), lowerIsBetter: true, primarySpeedMetric: false },
    },
    load: {
      command: opts.customCmd,
      lastExitCode: lastExit,
      avgParallelEffPct: roundNum(parSamples.reduce((a, b) => a + b, 0) / Math.max(1, parSamples.length), 1),
    },
  };
}

async function main() {
  const opts = parseArgs(process.argv);

  if (opts.list) {
    if (opts.jsonStdout) {
      console.log(JSON.stringify({ schema: 'sokutei/v1', domains: DOMAIN_CATALOG }, null, 2));
    } else {
      console.log('sokutei — Measurable Benchmark Domains (10 Domains / 55+ Metrics)\n');
      for (const d of Object.values(DOMAIN_CATALOG)) {
        console.log(`  ${d.id.padEnd(10)} | ${d.name}`);
        console.log(`             | ${d.description}`);
        console.log(`             | metrics: ${d.metrics.join(', ')}\n`);
      }
    }
    process.exit(0);
  }

  const tSuite0 = process.hrtime.bigint();
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'sokutei-run-'));
  const env = collectEnvironmentFingerprint(ROOT);
  const domainsOut = {};

  const log = (msg) => {
    if (!opts.jsonStdout) console.log(msg);
  };

  log('========================================================================');
  log(`  sokutei v1.0 — High-Precision Benchmark & Load Profiler`);
  log(`  CPU: ${env.cpuModel} (${env.cpuCores}c) | Node ${env.nodeVersion} | Git ${env.gitSha || '?'}`);
  log(`  Profile: ${opts.rigorous ? 'rigorous' : opts.quick ? 'quick' : 'standard'} (warmup=${opts.warmup}, runs=${opts.runs})`);
  log('========================================================================');

  try {
    if (opts.customCmd) {
      log(`[sokutei] Running custom command: ${opts.customCmd}`);
      domainsOut.custom_cmd = await runCustomCommandBench(opts);
      const st = domainsOut.custom_cmd.metrics.cmd_wall_ms;
      log(`  -> custom_cmd: p50=${st.median}ms mean=${st.mean}ms CV=${st.cvPct}% PeakRSS=${domainsOut.custom_cmd.metrics.cmd_peak_rss_mb.max}MB`);
    }

    for (const domId of opts.targets || []) {
      const runner = DOMAIN_RUNNERS[domId];
      if (!runner) {
        domainsOut[domId] = { error: `Unknown domain '${domId}'. Valid: ${ALL_DOMAIN_IDS.join(', ')}` };
        log(`[sokutei] [ERROR] Unknown domain '${domId}'`);
        continue;
      }
      log(`[sokutei] Measuring domain '${domId}' (${DOMAIN_CATALOG[domId].name})...`);
      const tDom = process.hrtime.bigint();
      try {
        const domTmp = path.join(tmpRoot, domId);
        fs.mkdirSync(domTmp, { recursive: true });
        const res = await runner({
          rootDir: ROOT,
          runs: opts.runs,
          warmup: opts.warmup,
          quick: opts.quick,
          rigorous: opts.rigorous,
          units: opts.units,
          tiers: opts.tiers,
          ppPresets: opts.ppPresets,
          tmpRoot: domTmp,
        });
        const domWallMs = roundNum(hrMs(tDom), 1);
        domainsOut[domId] = { wallMs: domWallMs, ...res };
        if (res.skipped) {
          log(`  -> [SKIP] ${domId}: ${res.reason}`);
        } else if (res.error) {
          log(`  -> [FAIL] ${domId}: ${res.error}`);
        } else {
          const summaryStr = Object.entries(res.metrics || {})
            .filter(([, m]) => m && typeof m.median === 'number')
            .slice(0, 5)
            .map(([k, m]) => `${k}=${m.median}${m.unit}`)
            .join(' | ');
          log(`  -> [OK] ${domId} (${domWallMs}ms): ${summaryStr}`);
        }
      } catch (err) {
        domainsOut[domId] = {
          wallMs: roundNum(hrMs(tDom), 1),
          error: err instanceof Error ? err.message : String(err),
        };
        log(`  -> [ERROR] ${domId}: ${domainsOut[domId].error}`);
      }
    }
  } finally {
    try { fs.rmSync(tmpRoot, { recursive: true, force: true, maxRetries: 6, retryDelay: 50 }); } catch {}
  }

  const totalWallMs = roundNum(hrMs(tSuite0), 1);
  const report = {
    schema: 'sokutei/v1',
    timestamp: new Date().toISOString(),
    totalWallMs,
    config: {
      profile: opts.rigorous ? 'rigorous' : opts.quick ? 'quick' : 'standard',
      targets: opts.targets || [],
      units: opts.units,
      tiers: opts.tiers,
      ppPresets: opts.ppPresets,
      runs: opts.runs,
      warmup: opts.warmup,
      customCmd: opts.customCmd,
    },
    env,
    domains: domainsOut,
  };

  let comparison = null;
  if (opts.comparePath) {
    const baseline = JSON.parse(fs.readFileSync(opts.comparePath, 'utf8'));
    comparison = buildComparisonReport(baseline, report);
    report.comparison = comparison;
  }

  if (opts.saveBaseline) {
    fs.mkdirSync(path.dirname(opts.saveBaseline), { recursive: true });
    fs.writeFileSync(opts.saveBaseline, JSON.stringify(report, null, 2));
    log(`[sokutei] Saved baseline to ${opts.saveBaseline}`);
  }
  if (opts.outJson) {
    fs.mkdirSync(path.dirname(opts.outJson), { recursive: true });
    fs.writeFileSync(opts.outJson, JSON.stringify(report, null, 2));
    log(`[sokutei] Wrote JSON report to ${opts.outJson}`);
  }
  if (opts.outMd) {
    fs.mkdirSync(path.dirname(opts.outMd), { recursive: true });
    fs.writeFileSync(opts.outMd, renderMarkdownReport(report, comparison));
    log(`[sokutei] Wrote Markdown report to ${opts.outMd}`);
  }

  if (opts.jsonStdout) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    log('------------------------------------------------------------------------');
    log(`[sokutei] Completed in ${totalWallMs}ms.`);
    if (comparison) {
      log(
        `[sokutei COMPARE] Metrics=${comparison.comparedMetrics} | GeoMean=${comparison.geoMeanSpeedupX}x | DomainGeoMean=${comparison.domainBalancedGeoMeanX}x | Max=${comparison.maxSpeedupX}x | >=6x:${comparison.countOver6x} | >=10x:${comparison.countOver10x}`
      );
      for (const [dom, ds] of Object.entries(comparison.domainSummary)) {
        log(`  - ${dom.padEnd(10)}: geo=${ds.geoMeanSpeedupX}x (max=${ds.maxSpeedupX}x, min=${ds.minSpeedupX}x, n=${ds.count})`);
      }
    }
    log('========================================================================');
  }

  if (comparison && typeof opts.assertSpeedup === 'number' && Number.isFinite(opts.assertSpeedup)) {
    const achieved = Math.max(comparison.geoMeanSpeedupX, comparison.domainBalancedGeoMeanX);
    if (achieved < opts.assertSpeedup) {
      console.error(
        `[sokutei GATE FAIL] Achieved speedup ${achieved}x < required ${opts.assertSpeedup}x`
      );
      process.exit(2);
    }
  }
}

main().catch((err) => {
  console.error('[sokutei ERROR]', err instanceof Error ? err.stack || err.message : err);
  process.exit(1);
});
