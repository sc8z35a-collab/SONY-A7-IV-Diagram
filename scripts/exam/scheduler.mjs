/**
 * THE LAST EXAM V1 — DAG Dependency & RAM-Budget Aware Execution Scheduler
 *
 * Safely orchestrates 36 heavy industrial engines (OpenFOAM, CalculiX, Gmsh, Bullet+ODE,
 * FCL, CGAL, OCCT, ngspice, gnucap, KiCad, FreeFEM++, Z3, Yosys, Verilator, 100k MC,
 * Chrome pp1.1) on 2-vCPU / 7.8GiB RAM VMs with:
 *   - Strict DAG dependency resolution
 *   - Live `/proc/meminfo` memory budget admission control (prevents OOM kills)
 *   - Atomic per-engine checkpoint persistence (`checkpoint.ndjson`) enabling instant `--resume`
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

function getAvailableMemMb() {
  try {
    const txt = fs.readFileSync('/proc/meminfo', 'utf8');
    const m = txt.match(/MemAvailable:\s+(\d+)\s+kB/);
    if (m) return Math.floor(Number(m[1]) / 1024);
  } catch {
    // Fallback
  }
  return Math.floor(os.freemem() / (1024 * 1024));
}

export function loadCheckpoint(runDir) {
  const cpPath = path.join(runDir, 'checkpoint.ndjson');
  const completed = {};
  if (!fs.existsSync(cpPath)) return completed;
  const lines = fs.readFileSync(cpPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const rec = JSON.parse(line);
      if (rec && rec.engineId && rec.result) {
        completed[rec.engineId] = rec.result;
      }
    } catch {
      // Ignore partial tail line on abrupt VM crash
    }
  }
  return completed;
}

function appendCheckpoint(runDir, engineId, result) {
  fs.mkdirSync(runDir, { recursive: true });
  const cpPath = path.join(runDir, 'checkpoint.ndjson');
  // Strip huge raw buffers before checkpointing; keep tests, metrics, and compact cross-data
  const payload = {
    engineId,
    ts: Date.now(),
    result: {
      ms: result.ms,
      solvers: result.solvers,
      metrics: result.metrics,
      tests: result.tests,
      cross: result.cross,
      error: result.error || null,
    },
  };
  fs.appendFileSync(cpPath, JSON.stringify(payload) + '\n');
}

/**
 * Execute selected engines respecting DAG dependencies, CPU slots, and RAM budgets.
 */
export async function runEngineDag({
  engines,
  runners,
  ctx,
  runDir,
  resume = false,
  maxCpuSlots = Math.max(1, Math.min(2, os.cpus().length)),
  progressLog = false,
}) {
  const engineMap = new Map(engines.map((e) => [e.id, e]));
  const selectedIds = new Set(engines.map((e) => e.id));
  const results = resume ? loadCheckpoint(runDir) : {};

  // Populate ctx.outputs with already checkpointed engines
  for (const [eid, res] of Object.entries(results)) {
    if (selectedIds.has(eid)) {
      ctx.outputs[eid] = res;
    }
  }

  const pending = new Set(engines.filter((e) => !results[e.id]).map((e) => e.id));
  const running = new Map();
  let usedSlots = 0;
  let usedMemMb = 0;

  return new Promise((resolve) => {
    const tryDispatch = () => {
      if (pending.size === 0 && running.size === 0) {
        resolve(results);
        return;
      }

      const availMem = getAvailableMemMb();
      // Find all ready engines (all in-scope deps completed)
      const ready = [];
      for (const eid of pending) {
        const eng = engineMap.get(eid);
        const depsSatisfied = (eng.deps || []).every((d) => !selectedIds.has(d) || Boolean(results[d]));
        if (depsSatisfied) ready.push(eng);
      }
      // Prioritize heavy bottleneck engines first (critical path scheduling)
      ready.sort((a, b) => (b.memMb + b.cpuSlots * 500) - (a.memMb + a.cpuSlots * 500));

      for (const eng of ready) {
        const slotsNeed = Math.min(maxCpuSlots, eng.cpuSlots || 1);
        const memNeed = eng.memMb || 500;
        const canFitCpu = usedSlots + slotsNeed <= maxCpuSlots;
        // Allow running at least 1 engine even if MemAvailable is temporarily tight (swap protects)
        const canFitMem = running.size === 0 || (usedMemMb + memNeed <= Math.max(2500, availMem - 900));
        if (!canFitCpu || !canFitMem) continue;

        pending.delete(eng.id);
        usedSlots += slotsNeed;
        usedMemMb += memNeed;

        const t0 = performance.now();
        if (progressLog) {
          process.stderr.write(`[TLX-SCHED] START ${eng.id} (${eng.name}) slots=${slotsNeed} mem=${memNeed}MB\n`);
        }
        const fn = runners[eng.id];
        const runPromise = (async () => {
          try {
            if (!fn) throw new Error(`Missing runner implementation for ${eng.id}`);
            const out = await fn(ctx);
            const ms = performance.now() - t0;
            return {
              ms,
              solvers: out.solvers || eng.solvers,
              metrics: out.metrics || {},
              tests: out.tests || [],
              cross: out.cross || {},
              error: null,
            };
          } catch (err) {
            const ms = performance.now() - t0;
            return {
              ms,
              solvers: eng.solvers,
              metrics: { runtime_err: 1 },
              tests: [],
              cross: {},
              error: String(err?.stack || err?.message || err),
            };
          }
        })();

        running.set(eng.id, runPromise);
        runPromise.then((res) => {
          running.delete(eng.id);
          usedSlots -= slotsNeed;
          usedMemMb -= memNeed;
          results[eng.id] = res;
          ctx.outputs[eng.id] = res;
          appendCheckpoint(runDir, eng.id, res);
          if (progressLog) {
            const passN = (res.tests || []).filter((t) => t.status === 'PASS').length;
            process.stderr.write(`[TLX-SCHED] DONE  ${eng.id} ${passN}/${(res.tests || []).length} ${(res.ms / 1000).toFixed(2)}s${res.error ? ' ERR' : ''}\n`);
          }
          tryDispatch();
        });
      }
    };

    tryDispatch();
  });
}
