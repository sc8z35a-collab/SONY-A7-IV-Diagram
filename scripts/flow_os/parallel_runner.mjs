/**
 * FLOW V1.1 Speedup — CPU-Core-Aware Parallel Verification & Build Orchestrator (`parallel_runner.mjs`)
 *
 * Runs independent build checks (`tsc`, `catalog`, `validate_parts`, `dx_atlas`) and independent
 * core selftest suites (`flow`, `bg`, `dx`, `sp`, `exam`) concurrently across available CPU cores,
 * backed by `test_cache.mjs` during intermediate development runs and strictly uncached on final gates!
 */

import os from 'node:os';
import { spawn } from 'node:child_process';
import { EXIT_BLOCKED, EXIT_OK } from './kernel_config.mjs';
import { lookupCachedPass, recordCachedPass } from './test_cache.mjs';
import { scrubEnv } from './solver_sandbox.mjs';
import { formatFlowHeader, formatRecord } from './wire_protocol.mjs';

const CHECK_SPECS = Object.freeze({
  tsc: { bin: './node_modules/.bin/tsc', args: ['--noEmit'], mutates: false },
  catalog: { bin: 'node', args: ['scripts/generate_catalogs.mjs'], mutates: true },
  dx_atlas: { bin: 'node', args: ['scripts/dx.mjs', 'atlas', '--ai'], mutates: true },
  validate_parts: { bin: 'node', args: ['scripts/validate_parts.mjs', '--ai'], mutates: false },
  flow_selftest: { bin: 'node', args: ['scripts/flow_os/flow.mjs', 'selftest', '--raw'], mutates: false },
  bg_selftest: { bin: 'node', args: ['scripts/bg.mjs', 'selftest', '--ai'], mutates: false },
  dx_selftest: { bin: 'node', args: ['scripts/dx.mjs', 'selftest', '--ai'], mutates: false },
  sp_selftest: { bin: 'node', args: ['scripts/sp.mjs', 'selftest', '--ai'], mutates: false },
  exam_selftest: { bin: 'node', args: ['scripts/exam.mjs', 'selftest'], mutates: false },
});

function spawnStepAsync(bin, args, { cwd, env, timeoutMs = 300_000 }) {
  return new Promise((resolve) => {
    const child = spawn(bin, args, { cwd, env, shell: false, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => {
      try { child.kill('SIGTERM'); } catch {}
    }, timeoutMs);
    child.stdout.on('data', (c) => { if (stdout.length < 1_000_000) stdout += c.toString('utf8'); });
    child.stderr.on('data', (c) => { if (stderr.length < 1_000_000) stderr += c.toString('utf8'); });
    child.on('error', (e) => { clearTimeout(timer); resolve({ status: 1, stdout, stderr: e.message }); });
    child.on('close', (code) => { clearTimeout(timer); resolve({ status: code ?? 1, stdout, stderr }); });
  });
}

/**
 * Execute a set of named verification/build jobs concurrently with bounded parallelism
 * and optional content-hash caching (STRICTLY disabled when `allowCache === false`).
 */
export async function runParallelChecks(ctx, agent, jobNames, { allowCache = false, concurrency = null } = {}) {
  const t0 = performance.now();
  const maxConc = Math.max(1, Math.min(8, Number(concurrency || os.availableParallelism?.() || os.cpus().length || 2)));
  const queue = jobNames.filter((n) => CHECK_SPECS[n]);
  const results = [];
  const env = scrubEnv(agent?.envOverlay || {});

  const runOne = async (name) => {
    const spec = CHECK_SPECS[name];
    const hit = lookupCachedPass(ctx.stateDir, ctx.repoRoot, name, { allowCache });
    if (hit.hit) {
      return { name, ok: true, cached: true, ms: 1, summary: `CACHE_HIT(${hit.sha.slice(0, 8)},age=${hit.ageSec}s)` };
    }
    const st0 = performance.now();
    const r = await spawnStepAsync(spec.bin, spec.args, { cwd: ctx.repoRoot, env });
    const ms = Math.round(performance.now() - st0);
    const summary = (r.stdout || r.stderr || '').split('\n').map((l) => l.trim()).find((l) => l && !l.startsWith('npm notice')) || `exit=${r.status}`;
    const ok = r.status === 0;
    if (ok) {
      recordCachedPass(ctx.stateDir, ctx.repoRoot, name, { summary, ms, sha: hit.sha });
    }
    return { name, ok, cached: false, exit: r.status, ms, summary: summary.slice(0, 120) };
  };

  let cursor = 0;
  const workers = Array.from({ length: Math.min(maxConc, queue.length) }, async () => {
    while (cursor < queue.length) {
      const idx = cursor++;
      results[idx] = await runOne(queue[idx]);
    }
  });
  await Promise.all(workers);

  const elapsedMs = Math.round(performance.now() - t0);
  const passed = results.filter((r) => r.ok).length;
  const cachedCnt = results.filter((r) => r.cached).length;
  const ok = passed === results.length;

  const lines = [
    formatFlowHeader({
      cmd: 'verify:parallel',
      status: ok ? 'PASS' : 'FAIL',
      pass: `${passed}/${results.length}`,
      cached: cachedCnt,
      workers: maxConc,
      ms: elapsedMs,
    }),
    ...results.map((r) =>
      formatRecord('JOB', { name: r.name, st: r.ok ? (r.cached ? 'HIT' : 'PASS') : 'FAIL', ms: r.ms, out: r.summary })
    ),
  ];

  return { ok, exitCode: ok ? EXIT_OK : EXIT_BLOCKED, results, cacheHits: cachedCnt, elapsedMs, lines };
}
