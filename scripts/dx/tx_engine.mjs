/**
 * `dx` Component 4B — Macro-Turn Batch Transaction Engine (`dx tx`)
 * & Universal CLI Stdout Token Firewall (`dx run -- <cmd...>`).
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  enforceTokenBudget,
  estimateTokensBpe,
  sha256Hex,
  stripAnsi,
} from './tokenizer_and_budget.mjs';

const LOG_DIR = '/tmp/dx_logs';

/**
 * Compress noisy CLI tool output by 95-99% while preserving complete raw logs under `/tmp/dx_logs/`.
 */
function compressCommandOutput(cmdStr, rawOut, exitCode) {
  const cleaned = stripAnsi(rawOut)
    .split('\n')
    .filter((l) => !l.startsWith('npm notice'))
    .join('\n')
    .trim();

  const lowerCmd = cmdStr.toLowerCase();

  // 1. TypeScript compiler (`tsc`) — deduplicate cascading TS errors per file:code
  if (/\btsc\b/.test(lowerCmd)) {
    if (exitCode === 0) return `[tsc] PASS 0 errors`;
    const errLines = cleaned.split('\n').filter((l) => /error TS\d+:/.test(l));
    const dedup = new Map();
    for (const l of errLines) {
      const m = l.match(/^([^(]+)\((\d+),(\d+)\):\s+error\s+(TS\d+):\s+(.*)$/);
      if (m) {
        const key = `${m[1]}:${m[4]}`;
        if (!dedup.has(key)) {
          dedup.set(key, { line: m[2], code: m[4], file: m[1], msg: m[5], count: 1 });
        } else {
          dedup.get(key).count++;
        }
      } else {
        dedup.set(l.slice(0, 80), { raw: l, count: 1 });
      }
    }
    const summary = [`[tsc] FAIL exit=${exitCode} rawErrors=${errLines.length} uniqueGroups=${dedup.size}`];
    for (const item of [...dedup.values()].slice(0, 15)) {
      if (item.raw) summary.push(`  ${item.raw}`);
      else summary.push(`  ${item.file}:${item.line} ${item.code}${item.count > 1 ? ` (x${item.count})` : ''}: ${item.msg}`);
    }
    if (dedup.size > 15) summary.push(`  ... (+${dedup.size - 15} more unique error groups)`);
    return summary.join('\n');
  }

  // 2. Vite / `npm run build` — collapse 170-line asset table to 1 line (~28 tok)
  if (/\bvite\s+build\b/.test(lowerCmd) || /\bnpm\s+run\s+build\b/.test(lowerCmd)) {
    const assetCount = (cleaned.match(/^dist\/\S+/gm) || []).length;
    const builtMatch = cleaned.match(/built in ([0-9.]+s)/i);
    const modMatch = cleaned.match(/(\d+)\s+modules transformed/i);
    if (exitCode === 0) {
      return `[vite build] PASS modules=${modMatch ? modMatch[1] : '?'} assets=${assetCount} time=${builtMatch ? builtMatch[1] : '?'}`;
    }
    const errLines = cleaned
      .split('\n')
      .filter((l) => /error|fail|TS\d+|Cannot find/i.test(l))
      .slice(0, 12);
    return `[vite build] FAIL exit=${exitCode}\n${errLines.join('\n')}`;
  }

  // 3. `validate_parts.mjs` — collapse 42-line matrix to 1 line on PASS
  if (lowerCmd.includes('validate_parts')) {
    const passMatch = cleaned.match(/ALL CHECKS PASSED \(([^)]+)\)/);
    const unitLines = (cleaned.match(/Refs:0/g) || []).length;
    if (exitCode === 0) {
      return `[validate_parts] PASS ${passMatch ? passMatch[1] : 'OK'} unitsZeroLeak=${unitLines}`;
    }
    const fails = cleaned.split('\n').filter((l) => l.includes('[FAIL]') || l.includes('VALIDATION FAILED'));
    return `[validate_parts] FAIL exit=${exitCode}\n${fails.slice(0, 12).join('\n')}`;
  }

  // 4. `generate_catalogs.mjs` / `npm run catalog`
  if (lowerCmd.includes('generate_catalogs') || /\bnpm\s+run\s+catalog\b/.test(lowerCmd)) {
    const doneLine = cleaned.split('\n').find((l) => l.includes('[CATALOG] Generated') || l.startsWith('[catalog]'));
    if (exitCode === 0 && doneLine) return doneLine.trim();
  }

  // 5. Generic compressor: drop blank/progress noise, keep high-signal lines
  const lines = cleaned.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length <= 16) return lines.join('\n') || `(empty output, exit=${exitCode})`;
  const head = lines.slice(0, 6);
  const important = lines
    .slice(6, -6)
    .filter((l) => /error|fail|warn|pass|verdict|receipt|total/i.test(l))
    .slice(0, 8);
  const tail = lines.slice(-6);
  return [...head, ...important, ...tail].join('\n');
}

/**
 * `dx run [--budget=400] [--ai] -- <cmd...>`
 */
export function runDxRun(cmdArgs, opts = {}) {
  const rootAbs = path.resolve(opts.root || process.cwd());
  const budget = opts.budget !== undefined ? Number(opts.budget) : 450;
  if (!cmdArgs || cmdArgs.length === 0) {
    return {
      exitCode: 2,
      formatted: '[dx run] ERROR: missing command. Usage: node scripts/dx.mjs run [--budget=400] -- <command...>',
    };
  }

  const cmdStr = cmdArgs.join(' ');
  const t0 = performance.now();
  const hasShellOp =
    cmdArgs.length === 1 ||
    cmdArgs.some((a) => ['&&', '||', '|', ';', '>', '>>', '<'].includes(a));
  const proc = hasShellOp
    ? spawnSync(cmdStr, {
        cwd: rootAbs,
        shell: true,
        encoding: 'utf8',
        maxBuffer: 40 * 1024 * 1024,
      })
    : spawnSync(cmdArgs[0], cmdArgs.slice(1), {
        cwd: rootAbs,
        shell: false,
        encoding: 'utf8',
        maxBuffer: 40 * 1024 * 1024,
      });
  const elapsedMs = Math.round(performance.now() - t0);
  const exitCode = proc.status ?? 1;
  const rawCombined = `${proc.stdout || ''}${proc.stderr ? (proc.stdout ? '\n' : '') + proc.stderr : ''}`;
  const rawTokens = estimateTokensBpe(rawCombined);

  fs.mkdirSync(LOG_DIR, { recursive: true });
  const logName = `${Date.now().toString(36)}_${sha256Hex(cmdStr + rawCombined).slice(0, 6)}.log`;
  const logPath = path.join(LOG_DIR, logName);
  fs.writeFileSync(logPath, rawCombined, 'utf8');

  const compressed = compressCommandOutput(cmdStr, rawCombined, exitCode);
  const header = `[dx run] exit=${exitCode} ${elapsedMs}ms rawTok=${rawTokens} log=${logPath}`;
  const combined = `${header}\n${compressed}`;
  const budgeted = enforceTokenBudget(combined, { budget, tag: 'dx_run' });

  const reductionPct =
    rawTokens > 0 ? Number((100 * (1 - budgeted.tokens / rawTokens)).toFixed(1)) : 0;

  return {
    exitCode,
    command: cmdStr,
    elapsedMs,
    rawTokens,
    outputTokens: budgeted.tokens,
    reductionPct,
    logPath,
    truncated: budgeted.truncated,
    formatted: budgeted.text,
  };
}

/**
 * Parse shorthand `--ops` strings or JSON arrays into structured tx operations.
 * Supports:
 *   1. JSON array: `[{"op":"find","query":"evf-eyecup"},{"op":"read","target":"src/assemblies/types.ts","head":true}]`
 *   2. Semicolon shorthand: `find:evf-eyecup;read-head:src/assemblies/types.ts;preflight:evf`
 */
export function parseTxOps(opsInput) {
  if (Array.isArray(opsInput)) return opsInput;
  const s = String(opsInput || '').trim();
  if (!s) return [];
  if (s.startsWith('[')) {
    const parsed = JSON.parse(s);
    if (!Array.isArray(parsed)) throw new Error('tx ops JSON must be an array');
    return parsed;
  }
  return s
    .split(';')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const idx = chunk.indexOf(':');
      if (idx < 0) return { op: chunk };
      const op = chunk.slice(0, idx).trim();
      const arg = chunk.slice(idx + 1).trim();
      return { op, arg };
    });
}

/**
 * `dx tx` — Execute multiple read/find/brief/schematic/preflight/diff operations
 * in ONE tool turn, strictly packed inside `--budget` tokens (default 1800).
 */
export async function runDxTx(ops, executorFn, opts = {}) {
  const t0 = performance.now();
  const totalBudget = opts.budget !== undefined ? Number(opts.budget) : 1800;
  if (!Array.isArray(ops) || ops.length === 0) {
    return {
      exitCode: 2,
      formatted: '[dx tx] ERROR: no operations supplied. Use --ops=\'[...]\' or --file=ops.json',
    };
  }

  const headerReserve = 60;
  let remainingBudget = Math.max(120, totalBudget - headerReserve);
  const stepResults = [];
  const blocks = [];
  let worstExit = 0;

  for (let i = 0; i < ops.length; i++) {
    const step = ops[i];
    const stepsLeft = ops.length - i;
    const stepBudget = Math.max(80, Math.floor(remainingBudget / stepsLeft));
    let res;
    try {
      res = await executorFn(step, stepBudget);
    } catch (err) {
      res = {
        exitCode: 1,
        formatted: `[tx step ${i + 1} ERROR] ${err instanceof Error ? err.message : String(err)}`,
      };
    }
    if ((res.exitCode ?? 0) !== 0 && worstExit === 0) {
      worstExit = res.exitCode;
    }
    const text = res.formatted || JSON.stringify(res);
    const used = estimateTokensBpe(text);
    remainingBudget = Math.max(60, remainingBudget - used);

    stepResults.push({
      index: i + 1,
      op: step.op,
      exitCode: res.exitCode ?? 0,
      tokens: used,
    });
    blocks.push(`=== TX[${i + 1}/${ops.length}] ${step.op} (exit=${res.exitCode ?? 0}, ${used} tok) ===\n${text}`);
  }

  const elapsedMs = Math.round(performance.now() - t0);
  const summaryHeader = `[dx tx] ops=${ops.length} exit=${worstExit} ${elapsedMs}ms budget=${totalBudget}`;
  const raw = `${summaryHeader}\n${blocks.join('\n')}`;
  const budgeted = enforceTokenBudget(raw, { budget: totalBudget, tag: 'dx_tx' });

  return {
    exitCode: worstExit,
    elapsedMs,
    opsCount: ops.length,
    steps: stepResults,
    tokens: budgeted.tokens,
    truncated: budgeted.truncated,
    spillPath: budgeted.spillPath,
    formatted: budgeted.text,
  };
}
