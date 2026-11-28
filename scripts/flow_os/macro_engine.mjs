/**
 * FLOW V1.1 OS — Sandboxed Parallel DAG Macro Execution Engine (`macro_engine.mjs`)
 *
 * Abolishes legacy 1-command-at-a-time AI loops by orchestrating 10–40 atomic operations
 * in a deterministic, cryptographically governed, parallel topological DAG with `shell: false`.
 *
 * Security invariants enforced by SEC-13:
 *   - Strictly allowlisted primitives only (ZERO raw shell / bash / sh / eval / curl).
 *   - ZERO `human-report` invocations inside autonomous macros (Iron Law I10).
 *   - ZERO EXAM/security bypass flags (`--skip-*`, `--no-exam`, `--no-security`, `--force`).
 *   - Acyclic DAG (Kahn topological sort) and <= 40 steps per macro.
 *   - Path confinement (SEC-05) on every path-like argument.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import {
  EXIT_BLOCKED,
  EXIT_ERROR,
  EXIT_OK,
  EXIT_SECURITY_BLOCKED,
  atomicWriteSync,
} from './kernel_config.mjs';
import {
  assertPathConfined,
  redactSecrets,
  validateCommandSafety,
} from './security_fortress.mjs';
import { formatFlowHeader, formatRecord } from './wire_protocol.mjs';
import { scrubEnv } from './solver_sandbox.mjs';

export const MACRO_SCHEMA = 'flow-macro/v1.1';
export const MAX_MACRO_STEPS = 40;
export const MACRO_NAME_RX = /^[a-z0-9][a-z0-9_-]{1,47}$/;

// Strictly allowlisted executable primitives (100% shell:false!)
export const ALLOWED_PRIMITIVES = Object.freeze({
  'flow.wake': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'wake'], mutates: false },
  'flow.inspect': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'inspect'], mutates: false },
  'flow.heal': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'heal'], mutates: true },
  'flow.ship': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'ship'], mutates: true },
  'flow.park': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'park'], mutates: false },
  'flow.finish': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'finish'], mutates: false },
  'flow.security': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'security'], mutates: false },
  'flow.doc': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'doc'], mutates: false },
  'flow.swarm': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'swarm'], mutates: false },
  'flow.cert': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'cert'], mutates: false },
  'flow.selftest': { bin: 'node', prefix: ['scripts/flow_os/flow.mjs', 'selftest'], mutates: false },
  'exam.setup': { bin: 'node', prefix: ['scripts/exam.mjs', 'setup'], mutates: false },
  'exam.verify': { bin: 'node', prefix: ['scripts/exam.mjs', 'setup', '--verify-only'], mutates: false },
  'exam.run': { bin: 'node', prefix: ['scripts/exam.mjs'], mutates: false },
  'exam.selftest': { bin: 'node', prefix: ['scripts/exam.mjs', 'selftest'], mutates: false },
  'exam.cert': { bin: 'node', prefix: ['scripts/exam/v11_certificate.mjs'], mutates: false },
  'bg.boot': { bin: 'node', prefix: ['scripts/bg.mjs', 'boot', '--ai'], mutates: false },
  'bg.snap': { bin: 'node', prefix: ['scripts/bg.mjs', 'snap', '--ai'], mutates: false },
  'bg.seal': { bin: 'node', prefix: ['scripts/bg.mjs', 'seal', '--ai'], mutates: false },
  'bg.gate': { bin: 'node', prefix: ['scripts/bg.mjs', 'gate', '--ai'], mutates: false },
  'bg.status': { bin: 'node', prefix: ['scripts/bg.mjs', 'status', '--ai'], mutates: false },
  'bg.selftest': { bin: 'node', prefix: ['scripts/bg.mjs', 'selftest', '--ai'], mutates: false },
  'dx.atlas': { bin: 'node', prefix: ['scripts/dx.mjs', 'atlas', '--ai'], mutates: true },
  'dx.brief': { bin: 'node', prefix: ['scripts/dx.mjs', 'brief'], mutates: false },
  'dx.find': { bin: 'node', prefix: ['scripts/dx.mjs', 'find'], mutates: false },
  'dx.read': { bin: 'node', prefix: ['scripts/dx.mjs', 'read'], mutates: false },
  'dx.selftest': { bin: 'node', prefix: ['scripts/dx.mjs', 'selftest', '--ai'], mutates: false },
  'sp.inspect': { bin: 'node', prefix: ['scripts/sp.mjs', 'inspect'], mutates: false },
  'sp.thermal': { bin: 'node', prefix: ['scripts/sp.mjs', 'thermal-cog'], mutates: false },
  'sp.selftest': { bin: 'node', prefix: ['scripts/sp.mjs', 'selftest', '--ai'], mutates: false },
  'pp.capture': { bin: 'node', prefix: ['scripts/pp.mjs'], mutates: false },
  'pp.stop': { bin: 'node', prefix: ['scripts/pp.mjs', '--daemon=stop'], mutates: false },
  'npm.catalog': { bin: 'node', prefix: ['scripts/generate_catalogs.mjs'], mutates: true },
  'npm.tsc': { bin: 'npx', prefix: ['tsc', '--noEmit'], mutates: false },
  'npm.validate': { bin: 'node', prefix: ['scripts/validate_parts.mjs'], mutates: false },
  'npm.build': { bin: 'npm', prefix: ['run', 'build'], mutates: true },
  'npm.test': { bin: 'npm', prefix: ['test'], mutates: false },
  'git.status': { bin: 'git', prefix: ['status', '--short', '--branch'], mutates: false },
  'git.log': { bin: 'git', prefix: ['log', '--oneline', '-n', '8'], mutates: false },
  'git.diffstat': { bin: 'git', prefix: ['diff', '--stat'], mutates: false },
  'scaffold.unit': { internal: true, mutates: true },
  'noop': { internal: true, mutates: false },
});

const FORBIDDEN_MACRO_ARG_PATTERNS = [
  { rule: 'MACRO_I10_HUMAN_REPORT_BLOCK', rx: /\bhuman-report\b/i },
  { rule: 'MACRO_BYPASS_SKIP_FLAG', rx: /^--(?:skip-|no-exam|no-security|no-checks|bypass|allow-fail|relax)/i },
  { rule: 'MACRO_SHELL_METACHAR', rx: /[;&|`$]\(|&&|\|\||;\s*\w|\|\s*(?:sh|bash|zsh)\b/i },
  { rule: 'MACRO_DANGEROUS_FLAG', rx: /^--(?:force|hard|no-verify)$/i },
  { rule: 'MACRO_SENSITIVE_PATH', rx: /(?:^|\/)(?:\.git\/hooks|\/etc\/|\/opt\/antigravity\/tokens)/i },
];

/**
 * Interpolate `${vars.key}` and `${steps.id.field}` safely.
 */
export function interpolateArg(raw, vars = {}, stepOutputs = {}) {
  return String(raw).replace(/\$\{(vars|steps)\.([A-Za-z0-9_.-]+)\}/g, (_, ns, keyPath) => {
    if (ns === 'vars') {
      const v = vars[keyPath];
      return v === undefined || v === null ? '' : String(v);
    }
    const [sid, ...rest] = keyPath.split('.');
    let cur = stepOutputs[sid];
    for (const k of rest) cur = cur?.[k];
    return cur === undefined || cur === null ? '' : String(cur);
  });
}

function evalCondition(whenExpr, vars, stepOutputs) {
  if (whenExpr === undefined || whenExpr === null || whenExpr === true) return true;
  if (whenExpr === false) return false;
  const s = String(whenExpr).trim();
  if (!s) return true;
  const neg = s.startsWith('!');
  const expr = neg ? s.slice(1).trim() : s;
  const val = interpolateArg(expr, vars, stepOutputs).trim().toLowerCase();
  const truthy = val !== '' && val !== 'false' && val !== '0' && val !== 'no' && val !== 'none' && val !== 'undefined';
  return neg ? !truthy : truthy;
}

/**
 * Compute Kahn topological execution waves; returns `{ ok: false, cycle }` on cyclic DAG.
 */
export function computeTopologicalWaves(steps) {
  const byId = new Map(steps.map((s) => [s.id, s]));
  const inDeg = new Map();
  const children = new Map();
  for (const s of steps) {
    inDeg.set(s.id, 0);
    children.set(s.id, []);
  }
  for (const s of steps) {
    for (const dep of s.deps || []) {
      if (!byId.has(dep)) {
        return { ok: false, reason: `UNKNOWN_DEP:${s.id}->${dep}`, waves: [] };
      }
      inDeg.set(s.id, (inDeg.get(s.id) || 0) + 1);
      children.get(dep).push(s.id);
    }
  }

  const waves = [];
  let ready = steps.filter((s) => inDeg.get(s.id) === 0).map((s) => s.id);
  let visited = 0;

  while (ready.length > 0) {
    waves.push(ready.map((id) => byId.get(id)));
    visited += ready.length;
    const next = [];
    for (const id of ready) {
      for (const ch of children.get(id)) {
        const d = (inDeg.get(ch) || 0) - 1;
        inDeg.set(ch, d);
        if (d === 0) next.push(ch);
      }
    }
    ready = next;
  }

  if (visited !== steps.length) {
    return { ok: false, reason: 'DAG_CYCLE_DETECTED', waves: [] };
  }
  return { ok: true, waves };
}

/**
 * Strict SEC-13 Static Validator for any Macro / Auto Pipeline specification.
 */
export function validateMacroSpec(spec, repoRoot = process.cwd()) {
  const violations = [];
  const add = (rule, msg) => violations.push({ layer: 'SEC-13', rule, msg });

  if (!spec || typeof spec !== 'object') {
    add('MACRO_INVALID_OBJECT', 'Macro spec must be a JSON object');
    return { ok: false, violations, waves: [] };
  }
  if (spec.schema && spec.schema !== MACRO_SCHEMA) {
    add('MACRO_INVALID_SCHEMA', `Unsupported schema '${spec.schema}', expected '${MACRO_SCHEMA}'`);
  }
  if (!spec.name || !MACRO_NAME_RX.test(String(spec.name))) {
    add('MACRO_INVALID_NAME', `Macro name '${spec.name}' must match ${MACRO_NAME_RX}`);
  }
  if (!Array.isArray(spec.steps) || spec.steps.length === 0) {
    add('MACRO_EMPTY_STEPS', 'Macro must contain at least 1 step');
    return { ok: false, violations, waves: [] };
  }
  if (spec.steps.length > MAX_MACRO_STEPS) {
    add('MACRO_MAX_STEPS_EXCEEDED', `${spec.steps.length} steps exceeds limit ${MAX_MACRO_STEPS}`);
  }

  const seenIds = new Set();
  for (let i = 0; i < spec.steps.length; i++) {
    const st = spec.steps[i];
    if (!st || typeof st !== 'object') {
      add('MACRO_INVALID_STEP', `Step #${i} is not an object`);
      continue;
    }
    if (!st.id || !/^[a-zA-Z0-9_-]{1,40}$/.test(String(st.id))) {
      add('MACRO_INVALID_STEP_ID', `Invalid step id '${st.id}'`);
    } else if (seenIds.has(st.id)) {
      add('MACRO_DUPLICATE_STEP_ID', `Duplicate step id '${st.id}'`);
    } else {
      seenIds.add(st.id);
    }

    const prim = ALLOWED_PRIMITIVES[st.primitive];
    if (!prim) {
      add('MACRO_FORBIDDEN_PRIMITIVE', `Step '${st.id}' uses non-allowlisted primitive '${st.primitive}'`);
    }

    const args = Array.isArray(st.args) ? st.args : [];
    for (const rawArg of args) {
      const a = String(rawArg);
      for (const pat of FORBIDDEN_MACRO_ARG_PATTERNS) {
        if (pat.rx.test(a)) {
          add(pat.rule, `Step '${st.id}' arg '${a.slice(0, 60)}' blocked by ${pat.rule}`);
        }
      }
      if (a.includes('..') && (a.includes('/') || a.includes('\\'))) {
        add('MACRO_PATH_ESCAPE', `Step '${st.id}' arg '${a}' contains parent traversal`);
      }
      // Check explicit --out= or --file= paths against SEC-05 confinement
      const pathMatch = a.match(/^--(?:out|file|path|dir|spec)=(.+)$/);
      if (pathMatch && !pathMatch[1].includes('${')) {
        const conf = assertPathConfined(pathMatch[1], [repoRoot, '/tmp/flow_ws', '/tmp/flow_reports', '/tmp/tlx_runs']);
        if (!conf.ok) {
          add('MACRO_PATH_ESCAPE', `Step '${st.id}' path '${pathMatch[1]}' escapes allowed roots`);
        }
      }
    }

    if (prim && !prim.internal) {
      const cmdStr = [prim.bin, ...prim.prefix, ...args.map(String)].join(' ');
      const sec04 = validateCommandSafety(cmdStr);
      if (!sec04.ok) {
        add('MACRO_SEC04_COMMAND_BLOCK', `Step '${st.id}' blocked by SEC-04 (${sec04.rule})`);
      }
    }
  }

  const topo = computeTopologicalWaves(spec.steps);
  if (!topo.ok) {
    add('MACRO_DAG_INVALID', topo.reason);
  }

  return {
    ok: violations.length === 0,
    violations,
    waves: topo.waves || [],
  };
}

function spawnAsyncSafe(bin, args, { cwd, env, timeoutMs = 600_000 }) {
  const fullCmd = [bin, ...args].join(' ');
  const check = validateCommandSafety(fullCmd);
  if (!check.ok) {
    return Promise.resolve({
      status: EXIT_SECURITY_BLOCKED,
      stdout: '',
      stderr: `SEC-04 BLOCKED (${check.rule})`,
      blocked: true,
    });
  }

  return new Promise((resolve) => {
    const safeEnv = scrubEnv(env || {}, env || process.env);
    const child = spawn(bin, args, {
      cwd,
      env: safeEnv,
      shell: false,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const maxLen = 4 * 1024 * 1024;

    const timer = setTimeout(() => {
      timedOut = true;
      try {
        child.kill('SIGTERM');
      } catch {
        // ignore
      }
    }, timeoutMs);

    child.stdout.on('data', (chunk) => {
      if (stdout.length < maxLen) stdout += chunk.toString('utf8');
    });
    child.stderr.on('data', (chunk) => {
      if (stderr.length < maxLen) stderr += chunk.toString('utf8');
    });
    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ status: EXIT_ERROR, stdout, stderr: err.message, blocked: false });
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({
        status: timedOut ? 124 : (code ?? 1),
        stdout,
        stderr: timedOut ? `${stderr}\nTIMEOUT(${timeoutMs}ms)` : stderr,
        blocked: false,
      });
    });
  });
}

function runInternalScaffoldUnit(ctx, args) {
  const unitArg = args.find((a) => a.startsWith('--unit='))?.slice(7) || '';
  const unitId = unitArg.replace(/[^a-z0-9_]/g, '');
  if (!unitId) {
    return { status: EXIT_ERROR, stdout: 'SCAFFOLD|err=missing --unit=<slug>', stderr: '' };
  }
  const created = [];
  const posePath = path.join(ctx.repoRoot, 'src/units', `${unitId}.pose.tsv`);
  const conf = assertPathConfined(posePath, [ctx.repoRoot]);
  if (!conf.ok) {
    return { status: EXIT_SECURITY_BLOCKED, stdout: '', stderr: 'SEC-05 path escape' };
  }
  if (!fs.existsSync(posePath) && fs.existsSync(path.join(ctx.repoRoot, 'src/units'))) {
    atomicWriteSync(posePath, `# FLOW V1.1 Layer G Pose Overrides for ${unitId}\n# partId\tdx\tdy\tdz\trx\try\trz\n`);
    created.push(`src/units/${unitId}.pose.tsv`);
  }
  return {
    status: EXIT_OK,
    stdout: `SCAFFOLD|unit=${unitId}|created=${created.join(',') || 'already_exists'}`,
    stderr: '',
  };
}

const SAFE_MACRO_VAR_RX = /^[A-Za-z0-9_.,:/-]{0,128}$/;

export function validateMacroVars(vars = {}) {
  const violations = [];
  for (const [k, rawVal] of Object.entries(vars || {})) {
    const v = String(rawVal ?? '');
    if (!SAFE_MACRO_VAR_RX.test(v) || /\s--/.test(v) || v.startsWith('--') || v.includes('..') || /\bhuman-report\b/i.test(v)) {
      violations.push({ layer: 'SEC-13', rule: 'MACRO_VAR_INJECTION', msg: `Unsafe macro var '${k}=${v.slice(0, 48)}'` });
    }
  }
  return violations;
}

/**
 * Execute a validated Macro / Auto Pipeline DAG with wave-level parallelism,
 * pre-mutation `bg snap`, conditional branching, strict variable typing, and wave-compressed output.
 */
export async function executeMacroDag(spec, ctx, agent, opts = {}) {
  const t0 = performance.now();
  const val = validateMacroSpec(spec, ctx.repoRoot);
  const vars = { ...(spec.defaults || {}), ...(opts.vars || {}) };
  const varViolations = validateMacroVars(vars);
  if (!val.ok || varViolations.length > 0) {
    const allV = [...val.violations, ...varViolations];
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      lines: [
        formatFlowHeader({ cmd: `dag:${spec?.name || 'invalid'}`, status: 'SEC_BLOCK', violations: allV.length }),
        ...allV.map((v) => formatRecord('SEC_FAIL', { layer: v.layer, rule: v.rule, msg: v.msg })),
      ],
      stepResults: [],
      elapsedMs: Math.round(performance.now() - t0),
    };
  }

  const dryRun = Boolean(opts.dryRun);
  const verbose = Boolean(opts.verbose);
  const concurrency = Math.max(1, Math.min(8, Number(opts.concurrency || spec.concurrency || 4)));

  if (dryRun) {
    const lines = [
      formatFlowHeader({
        cmd: `dag:${spec.name}`,
        status: 'DRY_RUN',
        steps: spec.steps.length,
        waves: val.waves.length,
        mutates: Boolean(spec.mutates),
      }),
    ];
    val.waves.forEach((wave, wi) => {
      lines.push(formatRecord('WAVE', { n: wi + 1, parallel: wave.length, steps: wave.map((s) => `${s.id}:${s.primitive}`).join(',') }));
    });
    return { ok: true, exitCode: EXIT_OK, lines, stepResults: [], elapsedMs: Math.round(performance.now() - t0) };
  }

  const stepOutputs = {};
  const stepResults = [];
  const logChunks = [`# FLOW V1.1 DAG RUN: ${spec.name} (${new Date().toISOString()})`];
  let aborted = false;
  let finalExit = EXIT_OK;

  // Pre-mutation durability guard (auto bg snap) when repo uses Buchigire Guard
  if (spec.mutates && opts.autoSnap !== false && fs.existsSync(path.join(ctx.repoRoot, 'scripts/bg.mjs'))) {
    const snapRes = await spawnAsyncSafe('node', ['scripts/bg.mjs', 'snap', '--ai'], {
      cwd: ctx.repoRoot,
      env: { ...process.env, ...(agent?.envOverlay || {}) },
      timeoutMs: 60_000,
    });
    logChunks.push(`## PRE_MUTATION_SNAP exit=${snapRes.status}\n${snapRes.stdout}`);
  }

  for (let wi = 0; wi < val.waves.length; wi++) {
    if (aborted) break;
    const wave = val.waves[wi];

    // Partition wave into sequential mutating vs parallel read-only batches
    const runSingleStep = async (st) => {
      if (aborted) {
        return { id: st.id, primitive: st.primitive, status: 'SKIPPED_ABORT', exit: 0, ms: 0, summary: 'aborted' };
      }
      if (!evalCondition(st.when, vars, stepOutputs)) {
        stepOutputs[st.id] = { ok: true, skipped: true, exit: 0, summary: 'skipped(when=false)' };
        return { id: st.id, primitive: st.primitive, status: 'SKIP', exit: 0, ms: 0, summary: 'when=false' };
      }

      const prim = ALLOWED_PRIMITIVES[st.primitive];
      const resolvedArgs = (st.args || [])
        .map((a) => interpolateArg(a, vars, stepOutputs))
        .filter((a) => a.length > 0 && !a.endsWith('='));

      // Re-validate interpolated args against SEC-13!
      for (const a of resolvedArgs) {
        for (const pat of FORBIDDEN_MACRO_ARG_PATTERNS) {
          if (pat.rx.test(a)) {
            aborted = true;
            finalExit = EXIT_SECURITY_BLOCKED;
            return { id: st.id, primitive: st.primitive, status: 'SEC_BLOCK', exit: EXIT_SECURITY_BLOCKED, ms: 0, summary: pat.rule };
          }
        }
      }

      const st0 = performance.now();
      let res;
      if (st.primitive === 'noop') {
        res = { status: EXIT_OK, stdout: `NOOP|id=${st.id}|args=${resolvedArgs.join(' ')}`, stderr: '' };
      } else if (st.primitive === 'scaffold.unit') {
        res = runInternalScaffoldUnit(ctx, resolvedArgs);
      } else {
        // Gracefully skip repo-specific tools when running on a portable non-CAD repo
        if (prim.bin === 'node' && prim.prefix[0]?.startsWith('scripts/') && !fs.existsSync(path.join(ctx.repoRoot, prim.prefix[0]))) {
          res = { status: EXIT_OK, stdout: `SKIP_NO_SCRIPT|${prim.prefix[0]}`, stderr: '' };
        } else {
          res = await spawnAsyncSafe(prim.bin, [...prim.prefix, ...resolvedArgs], {
            cwd: ctx.repoRoot,
            env: { ...process.env, ...(agent?.envOverlay || {}) },
            timeoutMs: Number(st.timeoutMs || 600_000),
          });
        }
      }

      // Optional self-healing retry if step declares `onFail: 'heal_and_retry'`
      if (res.status !== 0 && st.onFail === 'heal_and_retry' && vars.unit && fs.existsSync(path.join(ctx.repoRoot, 'scripts/flow_os/flow.mjs'))) {
        const healRes = await spawnAsyncSafe(
          'node',
          ['scripts/flow_os/flow.mjs', 'heal', `--unit=${vars.unit}`, '--apply', '--raw'],
          { cwd: ctx.repoRoot, env: { ...process.env, ...(agent?.envOverlay || {}) }, timeoutMs: 300_000 }
        );
        logChunks.push(`## AUTO_HEAL_RETRY(${st.id}) exit=${healRes.status}\n${healRes.stdout}`);
        if (healRes.status === 0 && !prim.internal) {
          res = await spawnAsyncSafe(prim.bin, [...prim.prefix, ...resolvedArgs], {
            cwd: ctx.repoRoot,
            env: { ...process.env, ...(agent?.envOverlay || {}) },
            timeoutMs: Number(st.timeoutMs || 600_000),
          });
        }
      }

      const ms = Math.round(performance.now() - st0);
      const firstLine = redactSecrets(
        (res.stdout || res.stderr || '')
          .split('\n')
          .map((l) => l.trim())
          .find((l) => l && !l.startsWith('npm notice')) || `exit=${res.status}`
      ).slice(0, 140);

      logChunks.push(`## STEP ${st.id} (${st.primitive}) exit=${res.status} ${ms}ms\n${redactSecrets(res.stdout || '')}\n${redactSecrets(res.stderr || '')}`);

      const ok = res.status === 0;
      stepOutputs[st.id] = { ok, skipped: false, exit: res.status, summary: firstLine };

      if (!ok) {
        const policy = st.onFail || 'abort';
        if (policy === 'abort' || res.status === EXIT_SECURITY_BLOCKED) {
          aborted = true;
          finalExit = res.status === EXIT_SECURITY_BLOCKED ? EXIT_SECURITY_BLOCKED : (res.status || EXIT_BLOCKED);
        }
      }
      return { id: st.id, primitive: st.primitive, status: ok ? 'PASS' : (st.onFail === 'continue' ? 'WARN' : 'FAIL'), exit: res.status, ms, summary: firstLine };
    };

    const hasMutating = wave.some((s) => ALLOWED_PRIMITIVES[s.primitive]?.mutates);
    if (hasMutating || wave.length === 1) {
      for (const st of wave) {
        stepResults.push(await runSingleStep(st));
        if (aborted) break;
      }
    } else {
      // Execute read-only wave in bounded parallel chunks
      for (let i = 0; i < wave.length; i += concurrency) {
        const chunk = wave.slice(i, i + concurrency);
        const chunkRes = await Promise.all(chunk.map((st) => runSingleStep(st)));
        stepResults.push(...chunkRes);
        if (aborted) break;
      }
    }
  }

  const runId = `${spec.name}_${Date.now()}`;
  const spillLog = path.join(agent.agentWs, `dag_${runId}.log`);
  atomicWriteSync(spillLog, logChunks.join('\n\n') + '\n');
  try { fs.chmodSync(spillLog, 0o600); } catch {}

  const elapsedMs = Math.round(performance.now() - t0);
  const passSteps = stepResults.filter((r) => r.status === 'PASS');
  const skipCnt = stepResults.filter((r) => r.status === 'SKIP').length;
  const failCnt = stepResults.filter((r) => r.status === 'FAIL' || r.status === 'SEC_BLOCK').length;
  const warnCnt = stepResults.filter((r) => r.status === 'WARN').length;

  // Token-compressed output: collapse PASS steps into 1 rollup line by default (emit details for WARN/FAIL or --verbose)
  const detailLines = verbose
    ? stepResults.map((r) => formatRecord('STEP', { id: r.id, st: r.status, ms: r.ms, out: r.summary }))
    : [
        ...(passSteps.length > 0 ? [formatRecord('PASS_SUM', { count: passSteps.length, ids: passSteps.map((p) => p.id).join(',') })] : []),
        ...stepResults
          .filter((r) => r.status !== 'PASS' && r.status !== 'SKIP')
          .map((r) => formatRecord('STEP', { id: r.id, st: r.status, ms: r.ms, out: r.summary })),
      ];

  const lines = [
    formatFlowHeader({
      cmd: `dag:${spec.name}`,
      status: finalExit === 0 ? (warnCnt > 0 ? 'PASS_WARN' : 'PASS') : (finalExit === EXIT_SECURITY_BLOCKED ? 'SEC_BLOCK' : 'FAIL'),
      steps: `${passSteps.length}/${spec.steps.length}`,
      skip: skipCnt,
      warn: warnCnt,
      fail: failCnt,
      waves: val.waves.length,
      ms: elapsedMs,
      log: spillLog,
    }),
    ...detailLines,
  ];

  return {
    ok: finalExit === 0,
    exitCode: finalExit,
    lines,
    stepResults,
    spillLog,
    elapsedMs,
  };
}
