/**
 * FLOW V1.1 OS — Formal AI Self-Registering Macro Registry (`flow macro ...`)
 *
 * Allows AI agents to formally register high-efficiency reusable multi-step automation
 * pipelines under `.flow/macros/` with cryptographic SHA-256 tamper protection, SEC-13
 * static/runtime governance, and 0-LLM-token pattern mining from `.git/flow_os/flow_audit.jsonl`.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {
  EXIT_BLOCKED,
  EXIT_ERROR,
  EXIT_OK,
  EXIT_SECURITY_BLOCKED,
  atomicWriteSync,
  loadFlowConfig,
  resolveAgentContext,
} from './kernel_config.mjs';
import {
  MACRO_NAME_RX,
  MACRO_SCHEMA,
  executeMacroDag,
  validateMacroSpec,
} from './macro_engine.mjs';
import { listBuiltinPipelines, getBuiltinPipeline } from './builtin_pipelines.mjs';
import { getLedgerPath } from './audit_ledger.mjs';
import { formatFlowHeader, formatRecord } from './wire_protocol.mjs';

export const MACRO_DIR_REL = '.flow/macros';
export const MACRO_REGISTRY_REL = '.flow/macros/registry.json';

function canonicalMacroJson(spec) {
  const clean = {
    schema: spec.schema || MACRO_SCHEMA,
    name: spec.name,
    description: spec.description || '',
    version: spec.version || '1.0.0',
    mutates: Boolean(spec.mutates),
    concurrency: Number(spec.concurrency || 4),
    defaults: spec.defaults || {},
    steps: spec.steps || [],
  };
  return JSON.stringify(clean, null, 2) + '\n';
}

export function computeMacroSha256(spec) {
  return crypto.createHash('sha256').update(canonicalMacroJson(spec)).digest('hex');
}

export function readMacroRegistry(repoRoot) {
  const regPath = path.join(repoRoot, MACRO_REGISTRY_REL);
  if (!fs.existsSync(regPath)) {
    return { schema: 'flow-macro-registry/v1.1', macros: {} };
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(regPath, 'utf8'));
    if (!parsed || typeof parsed !== 'object' || !parsed.macros) {
      return { schema: 'flow-macro-registry/v1.1', macros: {} };
    }
    return parsed;
  } catch {
    return { schema: 'flow-macro-registry/v1.1', macros: {}, corrupted: true };
  }
}

function writeMacroRegistry(repoRoot, reg) {
  const regPath = path.join(repoRoot, MACRO_REGISTRY_REL);
  fs.mkdirSync(path.dirname(regPath), { recursive: true });
  atomicWriteSync(regPath, JSON.stringify(reg, null, 2) + '\n');
}

/**
 * Formally register a new AI automation macro after SEC-13 validation + SHA-256 signing.
 */
export function registerMacro(ctx, spec, meta = {}) {
  const normalized = {
    schema: MACRO_SCHEMA,
    name: String(spec.name || '').trim(),
    description: String(spec.description || 'AI registered macro').trim(),
    version: String(spec.version || '1.0.0'),
    mutates: Boolean(spec.mutates),
    concurrency: Number(spec.concurrency || 4),
    defaults: spec.defaults || {},
    steps: spec.steps || [],
  };

  const val = validateMacroSpec(normalized, ctx.repoRoot);
  if (!val.ok) {
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      violations: val.violations,
      lines: [
        formatFlowHeader({ cmd: 'macro:register', status: 'SEC_BLOCK', name: normalized.name || 'invalid', violations: val.violations.length }),
        ...val.violations.map((v) => formatRecord('SEC_FAIL', { layer: v.layer, rule: v.rule, msg: v.msg })),
      ],
    };
  }

  const macroRel = `${MACRO_DIR_REL}/${normalized.name}.macro.json`;
  const macroAbs = path.join(ctx.repoRoot, macroRel);
  const content = canonicalMacroJson(normalized);
  const sha256 = crypto.createHash('sha256').update(content).digest('hex');

  fs.mkdirSync(path.dirname(macroAbs), { recursive: true });
  atomicWriteSync(macroAbs, content);

  const reg = readMacroRegistry(ctx.repoRoot);
  const origin = normalized.name.startsWith('ai-') ? 'ai-custom' : 'core-protected';
  reg.macros[normalized.name] = {
    name: normalized.name,
    file: macroRel,
    origin,
    description: normalized.description,
    version: normalized.version,
    steps: normalized.steps.length,
    waves: val.waves.length,
    mutates: normalized.mutates,
    sha256,
    registeredBy: meta.agentId || 'ai-agent',
    registeredAt: new Date().toISOString(),
  };
  writeMacroRegistry(ctx.repoRoot, reg);

  return {
    ok: true,
    exitCode: EXIT_OK,
    record: reg.macros[normalized.name],
    lines: [
      formatFlowHeader({
        cmd: 'macro:register',
        status: 'REGISTERED',
        name: normalized.name,
        origin,
        steps: normalized.steps.length,
        waves: val.waves.length,
        sha: sha256.slice(0, 12),
        file: macroRel,
      }),
    ],
  };
}

/**
 * Verify all registered macros in `.flow/macros/` (SHA-256 integrity + SEC-13 compliance).
 */
export function verifyAllRegisteredMacros(repoRoot) {
  const dirAbs = path.join(repoRoot, MACRO_DIR_REL);
  const regPath = path.join(repoRoot, MACRO_REGISTRY_REL);
  const findings = [];

  if (!fs.existsSync(dirAbs) && !fs.existsSync(regPath)) {
    return { ok: true, checked: 0, findings: [] };
  }

  const reg = readMacroRegistry(repoRoot);
  if (reg.corrupted) {
    findings.push({ layer: 'SEC-13', rule: 'MACRO_REGISTRY_CORRUPTED', file: MACRO_REGISTRY_REL, line: 1, msg: 'Invalid registry.json' });
    return { ok: false, checked: 0, findings };
  }

  const registeredFiles = new Set();
  let checked = 0;

  for (const [name, entry] of Object.entries(reg.macros || {})) {
    checked++;
    if (!MACRO_NAME_RX.test(name)) {
      findings.push({ layer: 'SEC-13', rule: 'MACRO_INVALID_NAME', file: MACRO_REGISTRY_REL, line: 1, msg: `Invalid name '${name}'` });
      continue;
    }
    const rel = entry.file || `${MACRO_DIR_REL}/${name}.macro.json`;
    registeredFiles.add(path.basename(rel));
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      findings.push({ layer: 'SEC-13', rule: 'MACRO_FILE_MISSING', file: rel, line: 1, msg: `Registered macro missing on disk` });
      continue;
    }
    // Single-buffer read prevents TOCTOU drift between hash verify and JSON parse
    const rawBuf = fs.readFileSync(abs);
    const actualSha = crypto.createHash('sha256').update(rawBuf).digest('hex');
    if (actualSha !== entry.sha256) {
      findings.push({ layer: 'SEC-13', rule: 'MACRO_SHA_TAMPERED', file: rel, line: 1, msg: `SHA mismatch (${actualSha.slice(0, 10)} != ${String(entry.sha256).slice(0, 10)})` });
      continue;
    }
    try {
      const parsed = JSON.parse(rawBuf.toString('utf8'));
      const val = validateMacroSpec(parsed, repoRoot);
      if (!val.ok) {
        for (const v of val.violations) {
          findings.push({ layer: 'SEC-13', rule: v.rule, file: rel, line: 1, msg: v.msg });
        }
      }
    } catch (err) {
      findings.push({ layer: 'SEC-13', rule: 'MACRO_JSON_PARSE', file: rel, line: 1, msg: err.message });
    }
  }

  // Flag unregistered rogue `.macro.json` files sitting in `.flow/macros/`
  if (fs.existsSync(dirAbs)) {
    for (const f of fs.readdirSync(dirAbs)) {
      if (f.endsWith('.macro.json') && !registeredFiles.has(f)) {
        findings.push({ layer: 'SEC-13', rule: 'MACRO_UNREGISTERED_FILE', file: `${MACRO_DIR_REL}/${f}`, line: 1, msg: 'Unregistered macro file in .flow/macros/' });
      }
    }
  }

  return { ok: findings.length === 0, checked, findings };
}

/**
 * Execute a registered macro by name using TOCTOU-free single-read buffer verification!
 */
export async function runRegisteredMacro(ctx, agent, name, opts = {}) {
  const reg = readMacroRegistry(ctx.repoRoot);
  const entry = reg.macros?.[name];
  if (!entry) {
    return {
      ok: false,
      exitCode: EXIT_ERROR,
      lines: [formatFlowHeader({ cmd: 'macro:run', status: 'NOT_FOUND', name })],
    };
  }
  const abs = path.join(ctx.repoRoot, entry.file);
  if (!fs.existsSync(abs)) {
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      lines: [formatFlowHeader({ cmd: 'macro:run', status: 'SEC_BLOCK', rule: 'MACRO_FILE_MISSING', name })],
    };
  }
  const rawBuf = fs.readFileSync(abs);
  const actualSha = crypto.createHash('sha256').update(rawBuf).digest('hex');
  if (actualSha !== entry.sha256) {
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      lines: [
        formatFlowHeader({ cmd: 'macro:run', status: 'SEC_BLOCK', rule: 'MACRO_SHA_TAMPERED', name }),
        formatRecord('SEC_FAIL', { layer: 'SEC-13', rule: 'MACRO_SHA_TAMPERED', expected: entry.sha256.slice(0, 12), actual: actualSha.slice(0, 12) }),
      ],
    };
  }
  const spec = JSON.parse(rawBuf.toString('utf8'));
  return executeMacroDag(spec, ctx, agent, opts);
}

/**
 * Deletion Privilege Control: ONLY AI-created custom macros (`ai-*` / `origin === 'ai-custom'`)
 * may be removed! Existing core/built-in macros are unconditionally protected (`EXIT 6`).
 */
export function removeRegisteredMacro(ctx, name) {
  const builtinNames = new Set(listBuiltinPipelines().map((b) => b.key));
  if (builtinNames.has(name) || String(name).startsWith('auto-')) {
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      lines: [formatFlowHeader({ cmd: 'macro:remove', status: 'SEC_BLOCK', rule: 'CORE_MACRO_DELETE_FORBIDDEN', name })],
    };
  }
  const reg = readMacroRegistry(ctx.repoRoot);
  const entry = reg.macros?.[name];
  if (!entry) {
    return { ok: false, exitCode: EXIT_ERROR, lines: [formatFlowHeader({ cmd: 'macro:remove', status: 'NOT_FOUND', name })] };
  }
  if (!String(name).startsWith('ai-') && entry.origin !== 'ai-custom') {
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      lines: [
        formatFlowHeader({
          cmd: 'macro:remove',
          status: 'SEC_BLOCK',
          rule: 'PROTECTED_MACRO_DELETE_FORBIDDEN',
          name,
          hint: 'Only AI-created macros prefixed `ai-` may be deleted',
        }),
      ],
    };
  }
  const abs = path.join(ctx.repoRoot, entry.file);
  if (fs.existsSync(abs)) fs.unlinkSync(abs);
  delete reg.macros[name];
  writeMacroRegistry(ctx.repoRoot, reg);
  return { ok: true, exitCode: EXIT_OK, lines: [formatFlowHeader({ cmd: 'macro:remove', status: 'REMOVED', name })] };
}

/**
 * 0-LLM-Token Pattern Miner: mines `.git/flow_os/flow_audit.jsonl` for repeated
 * 3-to-5 command chains and suggests ready-to-register macros!
 */
export function suggestMacrosFromLedger(stateDir, minCount = 2) {
  const lp = getLedgerPath(stateDir);
  if (!fs.existsSync(lp)) {
    return { ok: true, suggestions: [], ledgerEvents: 0 };
  }
  const lines = fs.readFileSync(lp, 'utf8').split('\n').filter(Boolean);
  const cmds = [];
  for (const l of lines) {
    try {
      const rec = JSON.parse(l);
      if (rec.cmd && rec.cmd !== 'human-report') {
        cmds.push(rec.cmd);
      }
    } catch {
      // skip
    }
  }
  const counts = new Map();
  for (const n of [3, 4]) {
    for (let i = 0; i <= cmds.length - n; i++) {
      const seq = cmds.slice(i, i + n);
      // Avoid trivial identical repeats like wake,wake,wake
      if (new Set(seq).size < 2) continue;
      const key = seq.join(' -> ');
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  const suggestions = [...counts.entries()]
    .filter(([, cnt]) => cnt >= minCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([seq, count], idx) => ({
      suggestedName: `auto-seq-${idx + 1}`,
      sequence: seq,
      occurrences: count,
      estTokenSavingsPct: Math.min(82, 45 + count * 8),
    }));
  return { ok: true, suggestions, ledgerEvents: cmds.length };
}

/**
 * Comprehensive Isolated Selftest for FLOW V1.1 Macro Engine, Registry, Pattern Miner & 6 Built-in Pipelines!
 */
export async function runMacroSelftest() {
  const t0 = performance.now();
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'flow_macro_st_'));
  const results = [];
  const check = (id, ok, detail) => results.push({ id, ok: Boolean(ok), detail });

  try {
    fs.mkdirSync(path.join(sandbox, '.git', 'flow_os'), { recursive: true });
    const ctx = loadFlowConfig(sandbox);
    const agent = resolveAgentContext(ctx.cfg, { agentId: 'macro_st_agent', agentWs: path.join(sandbox, 'ws') });

    // 1. Validate all 6 built-in mega-pipelines (14 to 30+ steps each) pass SEC-13 + acyclic dry-run!
    const builtins = listBuiltinPipelines();
    check('M01', builtins.length === 6, `6 builtin pipelines present (${builtins.length})`);
    for (const b of builtins) {
      const spec = getBuiltinPipeline(b.key, { unit: 'welcome' });
      const dry = await executeMacroDag(spec, ctx, agent, { dryRun: true });
      check(`M_AUTO_${b.key}`, dry.ok && spec.steps.length >= 14, `${b.key}: ${spec.steps.length} steps dry-run OK`);
    }

    // 2. Formal registration & live parallel DAG execution of a custom AI macro
    const customSpec = {
      schema: MACRO_SCHEMA,
      name: 'demo-parallel-check',
      description: 'Parallel 4-step wave macro selftest',
      mutates: false,
      steps: [
        { id: 's1', primitive: 'noop', args: ['wave1-a'] },
        { id: 's2', primitive: 'noop', args: ['wave1-b'] },
        { id: 's3', primitive: 'noop', args: ['wave2-${vars.tag}'], deps: ['s1', 's2'] },
        { id: 's4', primitive: 'noop', args: ['skipped'], deps: ['s3'], when: '${vars.enableExtra}' },
      ],
      defaults: { tag: 'v11', enableExtra: 'false' },
    };
    const regRes = registerMacro(ctx, customSpec, { agentId: 'selftest' });
    check('M02', regRes.ok && regRes.record?.waves === 3, 'Register signed custom macro');

    const runRes = await runRegisteredMacro(ctx, agent, 'demo-parallel-check', { vars: { tag: 'ok' } });
    check(
      'M03',
      runRes.ok && runRes.stepResults.length === 4 && runRes.stepResults[3].status === 'SKIP',
      'Execute registered parallel DAG + conditional skip'
    );

    const verOk = verifyAllRegisteredMacros(sandbox);
    check('M04', verOk.ok && verOk.checked === 1, 'Verify macro registry SHA-256 clean');

    // 3. Tamper detection (modify 1 byte in .macro.json -> immediate EXIT 6 block!)
    const mf = path.join(sandbox, MACRO_DIR_REL, 'demo-parallel-check.macro.json');
    fs.writeFileSync(mf, fs.readFileSync(mf, 'utf8').replace('wave1-a', 'wave1-TAMPERED'));
    const tamRun = await runRegisteredMacro(ctx, agent, 'demo-parallel-check');
    const tamVer = verifyAllRegisteredMacros(sandbox);
    check('M05', !tamRun.ok && tamRun.exitCode === EXIT_SECURITY_BLOCKED && !tamVer.ok, 'Tampered macro blocked with EXIT 6');

    // 4. Ledger pattern miner (`flow macro suggest`)
    const lp = getLedgerPath(ctx.stateDir);
    const seq = ['wake', 'inspect', 'heal', 'ship', 'wake', 'inspect', 'heal', 'ship'];
    fs.writeFileSync(lp, seq.map((cmd, i) => JSON.stringify({ seq: i + 1, cmd })).join('\n') + '\n');
    const sug = suggestMacrosFromLedger(ctx.stateDir, 2);
    check('M06', sug.ok && sug.suggestions.length >= 1 && sug.suggestions[0].occurrences >= 2, '0-LLM-tok ledger miner detects repeated 3-4 cmd chains');
  } finally {
    fs.rmSync(sandbox, { recursive: true, force: true });
  }

  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);
  return {
    ok: failed.length === 0,
    exitCode: failed.length === 0 ? EXIT_OK : EXIT_BLOCKED,
    passed,
    total: results.length,
    failed,
    elapsedMs: Math.round(performance.now() - t0),
  };
}
