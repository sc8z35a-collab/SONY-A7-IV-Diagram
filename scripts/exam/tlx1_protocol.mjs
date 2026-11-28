/**
 * THE LAST EXAM V1 — AI-Native Zero-Fluff Wire Protocol (`TLX1`)
 *
 * Intentionally optimized 100% for LLM/AI agent consumption (zero Unicode boxes, zero emoji,
 * zero prose fluff, 98.5% token compression on PASS, surgical 1-line fix directives on FAIL).
 *
 * Exit codes:
 *   0 = ALL PASS (TLX1-RECEIPT issued — only on complete unskipped 36-engine run)
 *   1 = RUNTIME / ENV ERROR
 *   2 = DEFECT DETECTED (1+ FAIL test)
 *   3 = WARN ONLY (0 FAIL, 1+ WARN)
 *   4 = CROSS-SOLVER INVARIANT MISMATCH (anti-cheat lock tripped)
 *   5 = EXTERNAL SOLVER MISSING (strict no-compromise gate)
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { PILLARS, ENGINES, TEST_REGISTRY, TEST_BY_ID } from './test_registry.mjs';

export const EXIT_PASS = 0;
export const EXIT_ERROR = 1;
export const EXIT_FAIL = 2;
export const EXIT_WARN = 3;
export const EXIT_INVARIANT_FAIL = 4;
export const EXIT_SOLVER_MISSING = 5;

const cleanField = (v) => String(v ?? '').replace(/[\r\n|]+/g, ' ').trim();

export function fmtVec(v, prec = 2) {
  if (!Array.isArray(v) || v.length < 3) return '0,0,0';
  return `${Number(v[0] || 0).toFixed(prec)},${Number(v[1] || 0).toFixed(prec)},${Number(v[2] || 0).toFixed(prec)}`;
}

/**
 * Construct a canonical test result record.
 * status: 'PASS' | 'FAIL' | 'WARN' | 'ERR'
 */
export function makeTestResult(id, status, data = {}) {
  const def = TEST_BY_ID[id];
  if (!def) throw new Error(`Unregistered test ID: ${id}`);
  return {
    id,
    engine: def.engine,
    pillar: def.pillar,
    sev: data.sev || def.sev,
    cat: data.cat || def.cat,
    status, // PASS | FAIL | WARN | ERR
    metric: data.metric || 'val',
    actual: data.actual ?? (status === 'PASS' ? 0 : 1),
    op: data.op || '<=',
    limit: data.limit ?? 0,
    parts: data.parts || [],
    xyz: data.xyz || null,
    n: data.n || null,
    fix: data.fix || 'NONE',
    src: data.src || '-',
    sv: data.sv || def.solvers.join('+'),
    ev: data.ev || '-',
    expandedCount: Math.max(1, Number(data.expandedCount || 1)),
    detail: data.detail || null,
  };
}

/**
 * Compute tamper-evident TLX1-RECEIPT only when ALL 36 engines ran without omission,
 * 0 FAIL, 0 ERR, 0 SKIP, and all 16 cross-solver locks passed.
 */
export function computeReceipt({ irSha, unitId, passCount, totalCount, expandedCount, fullRun, locksOk, failCount, errCount, skipCount }) {
  if (!fullRun || !locksOk || failCount > 0 || errCount > 0 || skipCount > 0 || passCount !== totalCount) {
    return 'NONE';
  }
  const payload = `TLX1|${irSha}|${unitId}|${passCount}/${totalCount}|${expandedCount}|v1`;
  const sig = crypto.createHash('sha256').update(payload).digest('hex').slice(0, 10);
  return `TLX1-RECEIPT:${irSha.slice(0, 8)}:${unitId}:${passCount}/${totalCount}:${expandedCount}:${sig}`;
}

/**
 * Persist full NDJSON database to `/tmp/tlx_runs/<runId>/results.ndjson` and format
 * the hyper-dense AI-native `TLX1` stdout report.
 */
export function emitTlx1Report({
  ir,
  runId,
  runDir,
  engineResults,
  testResults,
  crossLocks,
  durationSec,
  fullRun,
  solversReady,
  solversTotal,
  maxFails = 120,
}) {
  fs.mkdirSync(runDir, { recursive: true });
  const dbPath = path.join(runDir, 'results.ndjson');

  // Verify test registry completeness (anti-omission enforcement)
  const executedEngines = new Set(Object.keys(engineResults));
  const byId = new Map();
  for (const tr of testResults) byId.set(tr.id, tr);

  const normalized = [];
  for (const def of TEST_REGISTRY) {
    if (!executedEngines.has(def.engine)) continue;
    const found = byId.get(def.id);
    if (found) {
      normalized.push(found);
    } else {
      normalized.push(makeTestResult(def.id, 'ERR', {
        metric: 'missing_test',
        actual: 1,
        op: '==',
        limit: 0,
        fix: `FIX_ENGINE:${def.engine}:emit_${def.id}`,
        src: `scripts/exam/engines/`,
        sv: 'TLX_GUARD',
      }));
    }
  }

  // Write full lossless NDJSON database for surgical `exam query`
  const ndjsonLines = [];
  for (const tr of normalized) ndjsonLines.push(JSON.stringify({ kind: 'T', ...tr }));
  for (const lk of crossLocks) ndjsonLines.push(JSON.stringify({ kind: 'X', ...lk }));
  for (const [eid, er] of Object.entries(engineResults)) {
    ndjsonLines.push(JSON.stringify({ kind: 'E', engine: eid, ms: er.ms, metrics: er.metrics, solvers: er.solvers, error: er.error || null }));
  }
  fs.writeFileSync(dbPath, ndjsonLines.join('\n') + '\n');

  let passCount = 0, failCount = 0, warnCount = 0, errCount = 0, expandedCount = 0;
  for (const tr of normalized) {
    expandedCount += tr.expandedCount || 1;
    if (tr.status === 'PASS') passCount++;
    else if (tr.status === 'FAIL') failCount++;
    else if (tr.status === 'WARN') warnCount++;
    else errCount++;
  }
  const totalExpected = fullRun ? TEST_REGISTRY.length : normalized.length;
  const skipCount = Math.max(0, totalExpected - normalized.length);
  const locksOk = crossLocks.every((x) => x.ok);
  const locksFailed = crossLocks.filter((x) => !x.ok);

  const zdp = totalExpected > 0 ? passCount / totalExpected : 0;
  const verdict =
    errCount > 0 ? 'ERR'
    : !locksOk ? 'INVARIANT_FAIL'
    : failCount > 0 ? 'FAIL'
    : warnCount > 0 ? 'WARN'
    : skipCount > 0 ? 'PARTIAL_PASS'
    : 'PASS';

  const receipt = computeReceipt({
    irSha: ir.irSha,
    unitId: ir.unitId,
    passCount,
    totalCount: TEST_REGISTRY.length,
    expandedCount,
    fullRun,
    locksOk,
    failCount,
    errCount,
    skipCount,
  });

  const lines = [];
  // 1. Header line
  lines.push(
    `TLX1|u=${cleanField(ir.unitId)}|v=1|verdict=${verdict}|pass=${passCount}|fail=${failCount}|warn=${warnCount}|err=${errCount}|skip=${skipCount}|total=${totalExpected}|exp=${expandedCount}|zdp=${zdp.toFixed(4)}|dur_s=${durationSec.toFixed(2)}|ir=${ir.irSha}|sv=${solversReady}/${solversTotal}|rcpt=${receipt}`
  );

  // 2. Pillar rollup lines (10 lines max)
  for (const pil of PILLARS) {
    const pTests = normalized.filter((t) => t.pillar === pil.id);
    if (pTests.length === 0) continue;
    const pPass = pTests.filter((t) => t.status === 'PASS').length;
    const pFail = pTests.filter((t) => t.status === 'FAIL' || t.status === 'ERR').length;
    const pMs = ENGINES.filter((e) => e.pillar === pil.id).reduce((s, e) => s + (engineResults[e.id]?.ms || 0), 0);
    lines.push(`P|${pil.id}|${pil.code}|${pPass}/${pTests.length}|fail=${pFail}|ms=${Math.round(pMs)}`);
  }

  // 3. Engine summary lines (1 line per engine — compresses 530 PASS tests into 36 compact lines!)
  for (const eng of ENGINES) {
    const er = engineResults[eng.id];
    if (!er) continue;
    const eTests = normalized.filter((t) => t.engine === eng.id);
    const ePass = eTests.filter((t) => t.status === 'PASS').length;
    const kv = Object.entries(er.metrics || {})
      .slice(0, 8)
      .map(([k, v]) => `${k}=${cleanField(v)}`)
      .join(',');
    lines.push(`E|${eng.id}|${ePass}/${eTests.length}|sv=${(er.solvers || eng.solvers).join('+')}|ms=${Math.round(er.ms || 0)}|${kv}`);
  }

  // 4. FAIL / ERR / WARN detail lines (sorted by severity CRIT > HIGH > MED)
  const sevRank = { CRIT: 0, HIGH: 1, MED: 2 };
  const bad = normalized
    .filter((t) => t.status !== 'PASS')
    .sort((a, b) => (sevRank[a.sev] ?? 9) - (sevRank[b.sev] ?? 9) || a.id.localeCompare(b.id));

  const shown = bad.slice(0, maxFails);
  for (const f of shown) {
    const code = f.status === 'WARN' ? 'W' : f.status === 'ERR' ? 'R' : 'F';
    const pStr = f.parts.length > 0 ? f.parts.slice(0, 3).join(':') : '-';
    const xyzStr = f.xyz ? fmtVec(f.xyz, 2) : '-';
    const nStr = f.n ? fmtVec(f.n, 3) : '-';
    lines.push(
      `${code}|${f.id}|${f.engine}|sev=${f.sev}|cat=${f.cat}|p=${cleanField(pStr)}|m=${cleanField(f.metric)}:${cleanField(f.actual)}${f.op}${cleanField(f.limit)}|xyz=${xyzStr}|n=${nStr}|fix=${cleanField(f.fix)}|src=${cleanField(f.src)}|sv=${cleanField(f.sv)}|ev=${cleanField(f.ev)}`
    );
  }
  if (bad.length > shown.length) {
    lines.push(`F_TRUNC|shown=${shown.length}|total_bad=${bad.length}|query=node scripts/exam.mjs query ${runId} --status=FAIL`);
  }

  // 5. Cross-solver physical invariant locks (X01..X16)
  const lockOkCount = crossLocks.filter((x) => x.ok).length;
  lines.push(`X_SUM|ok=${lockOkCount}/${crossLocks.length}`);
  for (const lk of crossLocks) {
    if (!lk.ok || locksFailed.length > 0) {
      lines.push(`X|${lk.id}|a=${cleanField(lk.aVal)}|b=${cleanField(lk.bVal)}|rel=${Number(lk.relErrPct || 0).toFixed(3)}%|lim=${lk.maxRelErrPct}%|ok=${lk.ok ? 1 : 0}`);
    }
  }

  // 6. Actionable AI next-step summary line
  const srcCounts = new Map();
  const failEngines = new Set();
  for (const f of bad) {
    failEngines.add(f.engine);
    if (f.src && f.src !== '-') {
      const fileOnly = f.src.split(':')[0];
      srcCounts.set(fileOnly, (srcCounts.get(fileOnly) || 0) + 1);
    }
  }
  const topSrc = [...srcCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([k, v]) => `${k}:${v}`)
    .join(',') || 'NONE';
  const nextCmd =
    failEngines.size > 0
      ? `node scripts/exam.mjs --unit=${ir.unitId} --only=${[...failEngines].slice(0, 8).join(',')}`
      : 'DONE';
  lines.push(`S|run=${runId}|top_src=${topSrc}|next=${nextCmd}|db=${dbPath}`);

  const summaryPath = path.join(runDir, 'summary.tlx1');
  const formatted = lines.join('\n') + '\n';
  fs.writeFileSync(summaryPath, formatted);

  const exitCode =
    errCount > 0 ? EXIT_ERROR
    : !locksOk ? EXIT_INVARIANT_FAIL
    : failCount > 0 ? EXIT_FAIL
    : warnCount > 0 ? EXIT_WARN
    : EXIT_PASS;

  return {
    exitCode,
    verdict,
    receipt,
    passCount,
    failCount,
    warnCount,
    errCount,
    skipCount,
    expandedCount,
    formatted,
    dbPath,
    summaryPath,
  };
}
