#!/usr/bin/env node
/**
 * FLOW V1 OS — Unified AI-Native Zero-Waste-Token Operating System CLI
 *
 * Super-Commands (replaces 5-7 chained legacy commands per verb):
 *   wake          Boot + branch + lease + isolated WS + solver probe + context brief
 *   inspect       Auto-routed minimal-token surgical inspection (unit|part|defect|symbol|query)
 *   heal          0-LLM-token local multi-physics coupled repair + Tier-B <=250tok capsules
 *   ship          catalog + atlas + tsc + validate + build + FULL unskipped EXAM V1 + optional pp1.1 + bg snap
 *   park          Stop isolated pp daemon + checkpoint + bg seal (remote verified) + lease heartbeat
 *   finish        12-layer security fortress + fresh receipt check + bg gate -> chained FLOW-RECEIPT + optional PR/merge
 *   swarm         Multi-agent LPT sharding, status, safe topological merge & isolated parallel selftest
 *   exec          Passthrough wrapper for legacy tools (exam|bg|pp|sokutei|sp|dx) with FLOW-BUDGET & SEC-04
 *   human-report  [HUMAN_REQUEST_ONLY] Live zero-cache LOC/project/part/storage MD report
 *   security      Run 12-layer security fortress (`audit [--full]`) or 30-attack Red-Team oracle (`selftest`)
 *   doc           Strict 2-book validator (`audit --strict`) or surgical `@SECTION` reader (`section 1|2 TAG`)
 *   slice         Exact line-range reader for spilled logs or source files
 *   init          Bootstrap FLOW V1 OS into any repository (<30s)
 *   export-template  Export standalone portable OS starter kit
 *   selftest      Full portable OS self-proof (SEC-12 30/30 + Swarm 8/8 + Doc 2-book audit)
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  EXIT_BLOCKED,
  EXIT_ERROR,
  EXIT_OK,
  EXIT_SECURITY_BLOCKED,
  EXIT_WARN,
  FLOW_OS_VERSION,
  getGitMeta,
  loadDomainAdapter,
  loadFlowConfig,
  resolveAgentContext,
} from './kernel_config.mjs';
import {
  enforceFlowBudget,
  estimateTokens,
  formatFlowHeader,
  formatRecord,
  recordTokenTelemetry,
} from './wire_protocol.mjs';
import { appendAuditRecord } from './audit_ledger.mjs';
import {
  buildChainedFlowReceipt,
  computeKernelSeal,
  computeTreeFingerprint,
  readReceiptStore,
  recordDomainReceipt,
  recordSecurityReceipt,
  writeReceiptStore,
} from './receipt_chain.mjs';
import {
  assertPathConfined,
  redactSecrets,
  runSecurityFortress,
  safeSpawnSync,
} from './security_fortress.mjs';
import { runSecuritySelftest } from './security_selftest.mjs';
import {
  acquireLease,
  heartbeatLease,
  listLeases,
  releaseAllAgentLeases,
} from './lease_manager.mjs';
import {
  buildSwarmPlan,
  getSwarmStatus,
  runSwarmSelftest,
} from './swarm_orchestrator.mjs';
import { auditTwoBooks, readBookSection } from './doc_compiler.mjs';
import { generateHumanReport } from './human_report.mjs';
import { exportFlowTemplate, initFlowRepo } from './template_exporter.mjs';
import { executeMacroDag, validateMacroSpec } from './macro_engine.mjs';
import { getBuiltinPipeline, listBuiltinPipelines } from './builtin_pipelines.mjs';
import {
  readMacroRegistry,
  registerMacro,
  removeRegisteredMacro,
  runMacroSelftest,
  runRegisteredMacro,
  suggestMacrosFromLedger,
  verifyAllRegisteredMacros,
} from './macro_registry.mjs';

function parseCli(argv) {
  const dashIdx = argv.indexOf('--');
  const head = dashIdx >= 0 ? argv.slice(0, dashIdx) : argv;
  const tail = dashIdx >= 0 ? argv.slice(dashIdx + 1) : [];
  const allPos = [];
  const flags = {};
  for (let i = 0; i < head.length; i++) {
    const a = head[i];
    if (a === '-h' || a === '--help') flags.help = true;
    else if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq >= 0) flags[a.slice(2, eq)] = a.slice(eq + 1);
      else flags[a.slice(2)] = true;
    } else {
      allPos.push(a);
    }
  }
  const cmd = allPos[0] || 'help';
  const pos = allPos.slice(1);
  return { cmd, pos, flags, tail };
}

function printHelp() {
  process.stdout.write(
    [
      `FLOW1_HELP|os=FLOW-V1.1-OS-${FLOW_OS_VERSION}|exit=0:OK,1:ERR,2:BLOCK,3:WARN,4:XFAIL,5:NO_SOLVER,6:SEC_BLOCK`,
      `CMD|auto <bootstrap|research|dev|certify|fabricate|factory|list> [--unit=U] [--target=T] [--dry-run]`,
      `CMD|macro <register|run|list|inspect|verify|suggest|remove|selftest> [name] [--spec=F] [--dry-run]`,
      `CMD|cert <status|verify|selftest> [--unit=U]`,
      `CMD|wake [slug] [--unit=U] [--role=worker|integrator] [--goal=G]`,
      `CMD|inspect <unit|part|symbol|query> [--defect] [--slice] [--budget=N]`,
      `CMD|heal [--unit=U] [--apply] [--max-iter=25] [--bake] | heal selftest`,
      `CMD|ship [--unit=U] [--policy=worker|integrator] [--full-exam] [--visual]`,
      `CMD|park [--next=N] [--artifacts=DIR]`,
      `CMD|finish [--policy=worker|integrator] [--pr] [--merge] [--title=T]`,
      `CMD|swarm <plan|status|selftest> [--units=active|all|u1,u2] [--workers=N]`,
      `CMD|exec <exam|bg|pp|sokutei|sp|dx> [args...]`,
      `CMD|human-report [--out=PATH] [--artifacts=DIR]  # HUMAN_REQUEST_ONLY`,
      `CMD|security <audit [--full]|selftest>  # 13 layers, 36 attacks`,
      `CMD|doc <audit [--strict]|section <1|2> <TAG|toc>>`,
      `CMD|slice <path> <start>-<end>`,
      `CMD|init [--project-name=N] [--force] | export-template --out=DIR | selftest`,
    ].join('\n') + '\n'
  );
}

function finalizeOutput({ ctx, agent, cmd, args, lines, exitCode, budgetKey, flags, legacyTokens, healStats }) {
  const rawText = redactSecrets(Array.isArray(lines) ? lines.join('\n') : String(lines ?? ''));
  const budget = flags.budget !== undefined
    ? Number(flags.budget)
    : (flags.raw ? 0 : (ctx.cfg.budgets?.[budgetKey || cmd] ?? 350));

  const enforced = enforceFlowBudget(rawText, {
    cmd,
    budgetTokens: budget,
    agentWs: agent.agentWs,
    rawBaselineTokens: legacyTokens,
  });

  if (ctx.stateDir && fs.existsSync(ctx.stateDir)) {
    try {
      recordTokenTelemetry(ctx.stateDir, {
        cmd,
        emittedTokens: enforced.emittedTokens,
        legacyTokens: legacyTokens || enforced.rawTokens,
        ...(healStats || {}),
      });
      if (cmd !== 'security' && cmd !== 'selftest' && cmd !== 'slice') {
        const git = getGitMeta(ctx.repoRoot);
        appendAuditRecord(ctx.stateDir, {
          agentId: agent.agentId,
          cmd,
          args: args.slice(0, 8),
          treeSha: git.head,
          exitCode,
          detail: enforced.text.split('\n')[0].slice(0, 180),
        });
      }
    } catch {
      // never fail primary command on telemetry write
    }
  }

  process.stdout.write(enforced.text + '\n');
  process.exit(exitCode);
}

async function main() {
  const rawArgv = process.argv.slice(2);
  const { cmd, pos, flags, tail } = parseCli(rawArgv);

  if (cmd === 'help' || (flags.help && pos.length === 0)) {
    printHelp();
    process.exit(EXIT_OK);
  }

  // Standalone commands that may run outside an existing git repo
  if (cmd === 'export-template') {
    const outDir = flags.out || pos[0];
    if (!outDir) {
      process.stdout.write('FLOW1|cmd=export-template|status=ERR|msg=missing --out=<DIR>\n');
      process.exit(EXIT_ERROR);
    }
    const res = exportFlowTemplate(outDir, { projectName: flags['project-name'] });
    process.stdout.write(
      formatFlowHeader({ cmd: 'export-template', status: 'OK', out: res.outDir, files: res.files.length }) + '\n'
    );
    process.exit(EXIT_OK);
  }

  if (cmd === 'init') {
    const target = flags.dir || process.cwd();
    const res = initFlowRepo(target, { projectName: flags['project-name'], force: Boolean(flags.force) });
    process.stdout.write(
      formatFlowHeader({
        cmd: 'init',
        status: 'OK',
        project: res.projectName,
        branch: res.profile.defaultBranch,
        langs: res.profile.langs.join(',') || 'generic',
        written: res.filesWritten.join(','),
      }) + '\n'
    );
    process.exit(EXIT_OK);
  }

  const ctx = loadFlowConfig(flags.cwd ? path.resolve(flags.cwd) : process.cwd());
  const agent = resolveAgentContext(ctx.cfg, { agentId: flags.agent, agentWs: flags.ws });
  const adapter = await loadDomainAdapter(ctx);
  const role = String(flags.role || flags.policy || 'integrator');

  // -------------------------------------------------------------------------
  // SLICE: Exact line range extraction (SEC-05 path confined)
  // -------------------------------------------------------------------------
  if (cmd === 'slice') {
    const target = pos[0];
    const range = pos[1] || '1-80';
    if (!target) {
      process.stdout.write('FLOW1|cmd=slice|status=ERR|msg=usage: flow slice <path> <start>-<end>\n');
      process.exit(EXIT_ERROR);
    }
    const conf = assertPathConfined(target, [ctx.repoRoot, '/tmp/flow_ws', '/tmp/flow_reports', '/tmp/dx_out', '/tmp/dx_logs', '/tmp/tlx_runs']);
    if (!conf.ok) {
      process.stdout.write(`FLOW1|cmd=slice|status=SEC_BLOCK|layer=${conf.layer}|rule=${conf.rule}\n`);
      process.exit(EXIT_SECURITY_BLOCKED);
    }
    if (!fs.existsSync(conf.canonical)) {
      process.stdout.write(`FLOW1|cmd=slice|status=ERR|msg=file_not_found:${target}\n`);
      process.exit(EXIT_ERROR);
    }
    const [sRaw, eRaw] = range.split('-').map((n) => Number(n));
    const s = Math.max(1, Number.isFinite(sRaw) ? sRaw : 1);
    const e = Math.max(s, Number.isFinite(eRaw) ? eRaw : s + 79);
    const allLines = fs.readFileSync(conf.canonical, 'utf8').split('\n');
    const slice = allLines.slice(s - 1, e).map((l, idx) => `${s + idx}: ${l}`);
    process.stdout.write(
      `FLOW1|cmd=slice|file=${path.basename(conf.canonical)}|span=${s}-${Math.min(e, allLines.length)}/${allLines.length}\n` +
        redactSecrets(slice.join('\n')) +
        '\n'
    );
    process.exit(EXIT_OK);
  }

  // -------------------------------------------------------------------------
  // SECURITY: 12-Layer Fortress Audit or 30-Attack Red-Team Selftest
  // -------------------------------------------------------------------------
  if (cmd === 'security') {
    const sub = pos[0] || 'audit';
    if (sub === 'selftest') {
      const st = runSecuritySelftest();
      const lines = [
        formatFlowHeader({
          cmd: 'security:selftest',
          status: st.ok ? 'PASS' : 'FAIL',
          attacks_blocked: `${st.passed}/${st.total}`,
          ms: st.elapsedMs,
        }),
        ...st.failed.map((f) => formatRecord('SEC_ST_FAIL', { id: f.id, layer: f.layer, detail: f.detail })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'security', args: rawArgv, lines, exitCode: st.exitCode, flags, legacyTokens: 2500 });
    }
    const fort = runSecurityFortress(ctx, {
      full: Boolean(flags.full),
      role,
      allowedUnit: flags.unit || null,
      agentId: agent.agentId,
    });
    if (fort.ok) {
      recordSecurityReceipt(ctx, {
        receipt: fort.receipt,
        treeSha: fort.treeSha,
        kernelSha: fort.kernelSha,
        layersPassed: fort.passedCount,
        layersTotal: fort.totalCount,
      });
    }
    const lines = [
      formatFlowHeader({
        cmd: 'security:audit',
        status: fort.ok ? 'PASS' : 'SEC_BLOCK',
        layers: `${fort.passedCount}/${fort.totalCount}`,
        findings: fort.findings.length,
        rcpt: fort.receipt,
        ms: fort.elapsedMs,
      }),
      ...fort.findings.slice(0, 15).map((f) =>
        formatRecord('SEC_FAIL', { layer: f.layer, rule: f.rule, file: `${f.file}:${f.line}`, msg: f.msg })
      ),
    ];
    return finalizeOutput({ ctx, agent, cmd: 'security', args: rawArgv, lines, exitCode: fort.exitCode, flags, legacyTokens: 3200 });
  }

  // -------------------------------------------------------------------------
  // DOC: Strict 2-Book Audit or Surgical Section Lookup
  // -------------------------------------------------------------------------
  if (cmd === 'doc') {
    const sub = pos[0] || 'audit';
    if (sub === 'section') {
      const bookNum = pos[1] || '1';
      const tag = pos[2] || 'toc';
      const sec = readBookSection(ctx, bookNum, tag);
      const lines = [
        formatFlowHeader({ cmd: 'doc:section', status: sec.ok ? 'OK' : 'ERR', file: sec.file, span: sec.start ? `${sec.start}-${sec.end}` : 'toc' }),
        sec.text,
      ];
      return finalizeOutput({ ctx, agent, cmd: 'doc', args: rawArgv, lines, exitCode: sec.ok ? EXIT_OK : EXIT_ERROR, flags, legacyTokens: 4500 });
    }
    const res = auditTwoBooks(ctx, { strict: Boolean(flags.strict) });
    const lines = [
      formatFlowHeader({
        cmd: 'doc:audit',
        status: res.ok ? 'PASS' : 'FAIL',
        books: `${res.bookCount}/2`,
        tok: res.totalTokens,
        bytes: res.totalBytes,
      }),
      ...Object.entries(res.stats).map(([f, s]) =>
        formatRecord('BOOK', { file: f, lines: s.lines, bytes: s.bytes, tok: s.tokens })
      ),
      ...res.violations.map((v) => `DOC_FAIL|${v}`),
    ];
    return finalizeOutput({ ctx, agent, cmd: 'doc', args: rawArgv, lines, exitCode: res.exitCode, flags, legacyTokens: 15000 });
  }

  // -------------------------------------------------------------------------
  // SWARM: Multi-Agent Sharding, Status, Selftest
  // -------------------------------------------------------------------------
  if (cmd === 'swarm') {
    const sub = pos[0] || 'status';
    if (sub === 'selftest') {
      const st = runSwarmSelftest();
      const lines = [
        formatFlowHeader({ cmd: 'swarm:selftest', status: st.ok ? 'PASS' : 'FAIL', pass: `${st.passed}/${st.total}`, ms: st.elapsedMs }),
        ...st.failed.map((f) => formatRecord('SW_FAIL', { id: f.id, detail: f.detail })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'swarm', args: rawArgv, lines, exitCode: st.exitCode, flags, legacyTokens: 2000 });
    }
    if (sub === 'plan') {
      const plan = buildSwarmPlan(ctx, adapter, { unitsArg: flags.units || 'active', workers: Number(flags.workers || 4) });
      const lines = [
        formatFlowHeader({ cmd: 'swarm:plan', status: 'OK', units: plan.totalUnits, workers: plan.workerCount, saved: '.git/flow_os/swarm_plan.json' }),
        ...plan.shards.map((s) => formatRecord('SHARD', { id: s.workerId, parts: s.totalParts, units: s.units.join(',') })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'swarm', args: rawArgv, lines, exitCode: EXIT_OK, flags, legacyTokens: 4000 });
    }
    const st = getSwarmStatus(ctx);
    const lines = [
      formatFlowHeader({
        cmd: 'swarm:status',
        status: st.quarantined.length > 0 ? 'WARN' : 'OK',
        active_leases: st.activeLeases.length,
        quarantined: st.quarantined.length,
      }),
      ...st.activeLeases.map((l) => formatRecord('LEASE', { scope: l.scope, agent: l.agentId, branch: l.branch, exp: l.expiresAt })),
      ...st.quarantined.map((q) => formatRecord('QUARANTINE', { agent: q.agentId, reason: q.reason })),
    ];
    return finalizeOutput({ ctx, agent, cmd: 'swarm', args: rawArgv, lines, exitCode: st.quarantined.length > 0 ? EXIT_WARN : EXIT_OK, flags, legacyTokens: 1500 });
  }

  // -------------------------------------------------------------------------
  // HUMAN-REPORT: Dedicated Human-Only Live Telemetry MD Generator
  // -------------------------------------------------------------------------
  if (cmd === 'human-report') {
    const rep = await generateHumanReport(ctx, adapter, {
      out: flags.out || null,
      artifacts: flags.artifacts || null,
    });
    const lines = [
      formatFlowHeader({
        cmd: 'human-report',
        status: 'OK',
        policy: 'HUMAN_REQUEST_ONLY',
        ms: rep.elapsedMs,
        md: rep.outPath,
        artifact_copy: rep.artifactCopyPath || 'NONE',
      }),
      formatRecord('STATS', {
        files: rep.summary.totalFiles,
        total_lines: rep.summary.totalLines,
        prog_lines: rep.summary.progTotalLines,
        modes: rep.summary.totalModes ?? '-',
        unique_parts: rep.summary.uniqueParts ?? '-',
        doc_tok: rep.summary.docTokens,
      }),
    ];
    return finalizeOutput({ ctx, agent, cmd: 'human-report', args: rawArgv, lines, exitCode: EXIT_OK, flags: { ...flags, budget: 0 }, legacyTokens: 0 });
  }

  // -------------------------------------------------------------------------
  // WAKE: Replaces bg boot + bg start + lease + WS + solver probe + atlas + brief
  // -------------------------------------------------------------------------
  if (cmd === 'wake') {
    const slug = pos[0] || flags.slug || null;
    const unit = flags.unit || null;
    const lines = [];
    let exitCode = EXIT_OK;

    // 1. Optional lease acquisition for parallel isolation
    let leaseInfo = 'none';
    if (unit) {
      const acq = acquireLease(ctx, {
        scope: `unit:${unit}`,
        agentId: agent.agentId,
        role,
        branch: getGitMeta(ctx.repoRoot).branch,
        agentWs: agent.agentWs,
      });
      if (!acq.ok) {
        lines.push(formatFlowHeader({ cmd: 'wake', status: 'LEASE_CONFLICT', scope: `unit:${unit}`, holder: acq.holder, agent: agent.agentId }));
        return finalizeOutput({ ctx, agent, cmd: 'wake', args: rawArgv, lines, exitCode: EXIT_BLOCKED, flags, legacyTokens: 2500 });
      }
      leaseInfo = `unit:${unit}`;
    }

    // 2. Domain wake hook (bg boot / start / solver probe / atlas / brief)
    const wakeInfo = adapter?.onWake
      ? await adapter.onWake({ slug, unit, role, goal: flags.goal, next: flags.next, ignoreOrphans: Boolean(flags['ignore-orphans']), agent })
      : { bootExit: 0, bootSummary: 'no_adapter', solvers: 'n/a', briefLines: [] };

    if (wakeInfo.bootExit === 3 && !slug) exitCode = EXIT_WARN;
    if (wakeInfo.solversMissing) exitCode = 5;

    const git = getGitMeta(ctx.repoRoot);
    lines.push(
      formatFlowHeader({
        cmd: 'wake',
        status: exitCode === 0 ? 'READY' : exitCode === 3 ? 'ORPHAN_VAULT' : 'SOLVER_MISSING',
        agent: agent.agentId,
        role,
        branch: git.branch,
        head: git.head,
        dirty: git.dirtyCount,
        lease: leaseInfo,
        ws: agent.agentWs,
        sv: wakeInfo.solvers || 'n/a',
      })
    );
    if (wakeInfo.bootSummary) lines.push(`BOOT|${wakeInfo.bootSummary}`);
    for (const bl of wakeInfo.briefLines || []) lines.push(bl);

    return finalizeOutput({ ctx, agent, cmd: 'wake', args: rawArgv, lines, exitCode, flags, legacyTokens: 6500 });
  }

  // -------------------------------------------------------------------------
  // INSPECT: Unified minimal-token surgical inspection
  // -------------------------------------------------------------------------
  if (cmd === 'inspect') {
    const target = pos.join(' ') || flags.unit || flags.part || flags.query || '';
    if (!target) {
      process.stdout.write('FLOW1|cmd=inspect|status=ERR|msg=specify unit, partId, symbol, or query\n');
      process.exit(EXIT_ERROR);
    }
    const res = adapter?.onInspect
      ? await adapter.onInspect({ target, defect: Boolean(flags.defect), unit: flags.unit, runId: flags.run, slice: Boolean(flags.slice), agent })
      : { exitCode: EXIT_OK, lines: [`INSPECT|target=${target}|adapter=none`], legacyTokens: 3000 };
    return finalizeOutput({ ctx, agent, cmd: 'inspect', args: rawArgv, lines: res.lines, exitCode: res.exitCode, flags, legacyTokens: res.legacyTokens || 8000 });
  }

  // -------------------------------------------------------------------------
  // HEAL: 0-LLM-Token Multi-Physics Coupled Auto-Repair Engine
  // -------------------------------------------------------------------------
  if (cmd === 'heal') {
    if (!adapter?.onHeal) {
      process.stdout.write('FLOW1|cmd=heal|status=ERR|msg=no domain heal adapter configured\n');
      process.exit(EXIT_ERROR);
    }
    const sub = pos[0];
    const res = await adapter.onHeal({
      selftest: sub === 'selftest',
      bake: Boolean(flags.bake),
      unit: flags.unit || (sub && sub !== 'selftest' ? sub : 'welcome'),
      apply: Boolean(flags.apply),
      maxIter: Number(flags['max-iter'] || 25),
      verify: Boolean(flags.verify),
      runId: flags.run || null,
      agent,
    });
    return finalizeOutput({
      ctx,
      agent,
      cmd: 'heal',
      args: rawArgv,
      lines: res.lines,
      exitCode: res.exitCode,
      flags,
      legacyTokens: res.legacyTokens || 250000,
      healStats: res.healStats,
    });
  }

  // -------------------------------------------------------------------------
  // SHIP: catalog + atlas + tsc + validate + build + FULL EXAM V1 + pp + snap
  // -------------------------------------------------------------------------
  if (cmd === 'ship') {
    const unit = flags.unit || 'welcome';
    const res = adapter?.onShip
      ? await adapter.onShip({
          unit,
          policy: role,
          fullExam: Boolean(flags['full-exam'] || !flags['no-exam']),
          visual: Boolean(flags.visual),
          skipBuild: Boolean(flags['skip-build']),
          artifacts: flags.artifacts || null,
          agent,
        })
      : { exitCode: EXIT_OK, lines: ['FLOW1|cmd=ship|status=OK|adapter=none'], domainReceipt: 'NONE' };

    if (res.domainReceipt && res.domainReceipt !== 'NONE') {
      const treeSha = computeTreeFingerprint(ctx.repoRoot);
      const seal = computeKernelSeal(ctx.repoRoot, ctx.cfg.security?.kernelSealPaths || ['scripts/flow_os']);
      recordDomainReceipt(ctx, {
        target: unit,
        receipt: res.domainReceipt,
        treeSha,
        kernelSha: seal.sha,
        meta: res.meta || {},
      });
    }
    return finalizeOutput({ ctx, agent, cmd: 'ship', args: rawArgv, lines: res.lines, exitCode: res.exitCode, flags, legacyTokens: 18000 });
  }

  // -------------------------------------------------------------------------
  // PARK: Stop isolated pp daemon + checkpoint + bg seal + lease heartbeat
  // -------------------------------------------------------------------------
  if (cmd === 'park') {
    const res = adapter?.onPark
      ? await adapter.onPark({ next: flags.next || 'awaiting_next_step', artifacts: flags.artifacts || null, checkpointOnly: Boolean(flags.checkpoint), agent })
      : { exitCode: EXIT_OK, lines: ['FLOW1|cmd=park|status=OK|adapter=none'] };

    // Refresh active leases held by this agent
    const { active } = listLeases(ctx.stateDir);
    let refreshed = 0;
    for (const l of active) {
      if (l.agentId === agent.agentId) {
        heartbeatLease(ctx, { scope: l.scope, agentId: agent.agentId });
        refreshed++;
      }
    }
    const lines = [...res.lines, `PARK_LEASES|agent=${agent.agentId}|refreshed=${refreshed}`];
    return finalizeOutput({ ctx, agent, cmd: 'park', args: rawArgv, lines, exitCode: res.exitCode, flags, legacyTokens: 3000 });
  }

  // -------------------------------------------------------------------------
  // FINISH: 12-Layer Security + Fresh Domain Receipt + bg gate -> FLOW-RECEIPT
  // -------------------------------------------------------------------------
  if (cmd === 'finish') {
    const policy = String(flags.policy || role || 'integrator');
    const unit = flags.unit || null;
    const treeSha = computeTreeFingerprint(ctx.repoRoot);

    // 1. Run 12-layer Security Fortress
    const fort = runSecurityFortress(ctx, {
      full: Boolean(flags.full),
      role: policy,
      allowedUnit: unit,
      agentId: agent.agentId,
      treeSha,
    });
    if (!fort.ok) {
      const lines = [
        formatFlowHeader({ cmd: 'finish', status: 'SEC_BLOCK', layers: `${fort.passedCount}/${fort.totalCount}`, findings: fort.findings.length }),
        ...fort.findings.slice(0, 12).map((f) => formatRecord('SEC_FAIL', { layer: f.layer, rule: f.rule, file: `${f.file}:${f.line}`, msg: f.msg })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'finish', args: rawArgv, lines, exitCode: EXIT_SECURITY_BLOCKED, flags, legacyTokens: 5000 });
    }
    recordSecurityReceipt(ctx, {
      receipt: fort.receipt,
      treeSha,
      kernelSha: fort.kernelSha,
      layersPassed: fort.passedCount,
      layersTotal: fort.totalCount,
    });

    // 2. Check domain receipt freshness if required or present
    const store = readReceiptStore(ctx.stateDir);
    let domainReceipt = 'NONE';
    let domainFresh = true;
    const domEntries = Object.values(store.domain || {});
    const matchedDom = unit ? store.domain?.[unit] : domEntries.sort((a, b) => String(b.recordedAt).localeCompare(String(a.recordedAt)))[0];
    if (matchedDom) {
      domainReceipt = matchedDom.receipt;
      domainFresh = matchedDom.treeSha === treeSha && matchedDom.kernelSha === fort.kernelSha;
    }
    if (flags['require-exam'] && (!matchedDom || !domainFresh)) {
      const lines = [
        formatFlowHeader({
          cmd: 'finish',
          status: 'BLOCKED',
          reason: matchedDom ? 'STALE_TLX1_RECEIPT_AFTER_EDIT' : 'MISSING_TLX1_RECEIPT',
          fix: `npm run flow -- ship --unit=${unit || 'welcome'} --policy=${policy} --full-exam`,
        }),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'finish', args: rawArgv, lines, exitCode: EXIT_BLOCKED, flags, legacyTokens: 4000 });
    }

    // 3. Run adapter durability gate (`bg gate` / optional `bg land`)
    const gateRes = adapter?.onFinish
      ? await adapter.onFinish({
          policy,
          pr: Boolean(flags.pr),
          merge: Boolean(flags.merge),
          title: flags.title || null,
          body: flags.body || null,
          runChecks: !flags['no-checks'],
          agent,
        })
      : { exitCode: EXIT_OK, bgReceipt: `BG-LOCAL:${treeSha.slice(0, 8)}:${policy}`, lines: [] };

    if (gateRes.exitCode !== EXIT_OK) {
      const lines = [
        formatFlowHeader({ cmd: 'finish', status: 'GATE_BLOCKED', policy, sec_rcpt: fort.receipt }),
        ...(gateRes.lines || []),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'finish', args: rawArgv, lines, exitCode: gateRes.exitCode, flags, legacyTokens: 5000 });
    }

    // 4. Forge cryptographic 3-way chained FLOW-RECEIPT
    const chained = buildChainedFlowReceipt({
      treeSha,
      kernelSha: fort.kernelSha,
      bgReceipt: gateRes.bgReceipt,
      secReceipt: fort.receipt,
      domainReceipt: domainFresh ? domainReceipt : 'NONE',
      policy,
    });
    store.bg = { receipt: gateRes.bgReceipt, treeSha, recordedAt: new Date().toISOString() };
    store.flow = { receipt: chained.receipt, treeSha, kernelSha: fort.kernelSha, recordedAt: new Date().toISOString() };
    writeReceiptStore(ctx.stateDir, store);

    const released = releaseAllAgentLeases(ctx, agent.agentId);
    const lines = [
      formatFlowHeader({
        cmd: 'finish',
        status: 'PASS',
        policy,
        flow_rcpt: chained.receipt,
        leases_released: released,
      }),
      formatRecord('CHAIN', {
        bg: gateRes.bgReceipt,
        sec: fort.receipt,
        domain: domainFresh ? domainReceipt : 'NONE(STALE_OR_UNRUN)',
      }),
    ];
    return finalizeOutput({ ctx, agent, cmd: 'finish', args: rawArgv, lines, exitCode: EXIT_OK, flags, legacyTokens: 6000 });
  }

  // -------------------------------------------------------------------------
  // EXEC: Passthrough for legacy tools with SEC-04 + FLOW-BUDGET + FLOW_AGENT_WS
  // -------------------------------------------------------------------------
  if (cmd === 'exec') {
    const tool = pos[0];
    const passArgs = [...pos.slice(1), ...tail];
    // Re-attach flags not consumed by flow itself
    for (const [k, v] of Object.entries(flags)) {
      if (k === 'budget' || k === 'raw' || k === 'agent' || k === 'ws' || k === 'cwd') continue;
      passArgs.push(v === true ? `--${k}` : `--${k}=${v}`);
    }
    const toolMap = {
      exam: ['node', 'scripts/exam.mjs'],
      bg: ['node', 'scripts/bg.mjs'],
      pp: ['node', 'scripts/pp.mjs'],
      sokutei: ['node', 'scripts/sokutei.mjs'],
      sp: ['node', 'scripts/sp.mjs'],
      dx: ['node', 'scripts/dx.mjs'],
    };
    const spec = toolMap[tool];
    if (!spec) {
      process.stdout.write(`FLOW1|cmd=exec|status=ERR|msg=unknown_tool:${tool}|valid=${Object.keys(toolMap).join(',')}\n`);
      process.exit(EXIT_ERROR);
    }
    const r = safeSpawnSync(spec[0], [spec[1], ...passArgs], {
      cwd: ctx.repoRoot,
      env: { ...process.env, ...agent.envOverlay },
    });
    const combined = `${r.stdout || ''}${r.stderr ? '\n' + r.stderr : ''}`.trim();
    const rawTok = estimateTokens(combined);
    const lines = [
      formatFlowHeader({ cmd: `exec:${tool}`, status: r.status === 0 ? 'OK' : `EXIT_${r.status}`, raw_tok: rawTok }),
      combined,
    ];
    return finalizeOutput({ ctx, agent, cmd: 'exec', args: rawArgv, lines, exitCode: r.status ?? 1, flags, legacyTokens: rawTok });
  }

  // -------------------------------------------------------------------------
  // AUTO: 6 Built-In 14-30+ Step Parallel DAG Mega-Pipelines
  // -------------------------------------------------------------------------
  if (cmd === 'auto') {
    const sub = pos[0] || 'list';
    if (sub === 'list') {
      const list = listBuiltinPipelines();
      const lines = [
        formatFlowHeader({ cmd: 'auto:list', status: 'OK', pipelines: list.length }),
        ...list.map((p) => formatRecord('AUTO', { name: p.key, steps: p.steps, mutates: p.mutates, desc: p.description })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'auto', args: rawArgv, lines, exitCode: EXIT_OK, flags, legacyTokens: 3000 });
    }
    const vars = {};
    for (const [k, v] of Object.entries(flags)) {
      if (['budget', 'raw', 'agent', 'ws', 'cwd', 'dry-run', 'concurrency'].includes(k)) continue;
      vars[k] = v === true ? 'true' : String(v);
    }
    if (pos[1] && !vars.target && !vars.unit) {
      vars.target = pos[1];
      vars.unit = pos[1];
    }
    const spec = getBuiltinPipeline(sub, vars);
    if (!spec) {
      const valid = listBuiltinPipelines().map((p) => p.key).join(',');
      return finalizeOutput({
        ctx, agent, cmd: 'auto', args: rawArgv,
        lines: [formatFlowHeader({ cmd: 'auto', status: 'ERR', msg: `unknown_pipeline:${sub}`, valid })],
        exitCode: EXIT_ERROR, flags, legacyTokens: 500,
      });
    }
    const res = await executeMacroDag(spec, ctx, agent, {
      vars,
      dryRun: Boolean(flags['dry-run']),
      concurrency: flags.concurrency ? Number(flags.concurrency) : undefined,
      autoSnap: !flags['no-snap'],
    });
    return finalizeOutput({
      ctx, agent, cmd: 'auto', args: rawArgv,
      lines: res.lines, exitCode: res.exitCode, flags,
      legacyTokens: spec.steps.length * 1800,
    });
  }

  // -------------------------------------------------------------------------
  // MACRO: Formal AI Self-Registering Signed Automation Registry (SEC-13)
  // -------------------------------------------------------------------------
  if (cmd === 'macro') {
    const sub = pos[0] || 'list';
    if (sub === 'selftest') {
      const st = await runMacroSelftest();
      const lines = [
        formatFlowHeader({ cmd: 'macro:selftest', status: st.ok ? 'PASS' : 'FAIL', pass: `${st.passed}/${st.total}`, ms: st.elapsedMs }),
        ...st.failed.map((f) => formatRecord('MACRO_FAIL', { id: f.id, detail: f.detail })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'macro', args: rawArgv, lines, exitCode: st.exitCode, flags, legacyTokens: 4000 });
    }
    if (sub === 'list') {
      const reg = readMacroRegistry(ctx.repoRoot);
      const custom = Object.values(reg.macros || {});
      const builtins = listBuiltinPipelines();
      const lines = [
        formatFlowHeader({ cmd: 'macro:list', status: 'OK', custom: custom.length, builtins: builtins.length }),
        ...custom.map((m) => formatRecord('MACRO', { name: m.name, steps: m.steps, waves: m.waves, sha: String(m.sha256 || '').slice(0, 12), desc: m.description })),
        ...builtins.map((b) => formatRecord('BUILTIN', { cmd: `flow auto ${b.key}`, steps: b.steps })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'macro', args: rawArgv, lines, exitCode: EXIT_OK, flags, legacyTokens: 2000 });
    }
    if (sub === 'verify') {
      const v = verifyAllRegisteredMacros(ctx.repoRoot);
      const lines = [
        formatFlowHeader({ cmd: 'macro:verify', status: v.ok ? 'PASS' : 'SEC_BLOCK', checked: v.checked, findings: v.findings.length }),
        ...v.findings.map((f) => formatRecord('SEC_FAIL', { layer: f.layer, rule: f.rule, file: f.file, msg: f.msg })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'macro', args: rawArgv, lines, exitCode: v.ok ? EXIT_OK : EXIT_SECURITY_BLOCKED, flags, legacyTokens: 1500 });
    }
    if (sub === 'suggest') {
      const sug = suggestMacrosFromLedger(ctx.stateDir, Number(flags.min || 2));
      const lines = [
        formatFlowHeader({ cmd: 'macro:suggest', status: 'OK', ledger_events: sug.ledgerEvents, candidates: sug.suggestions.length }),
        ...sug.suggestions.map((s) => formatRecord('SUGGEST', { name: s.suggestedName, count: s.occurrences, save_pct: s.estTokenSavingsPct, seq: s.sequence })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'macro', args: rawArgv, lines, exitCode: EXIT_OK, flags, legacyTokens: 3000 });
    }
    if (sub === 'register') {
      let spec = null;
      if (flags.spec) {
        const conf = assertPathConfined(String(flags.spec), [ctx.repoRoot, '/tmp/flow_ws', '/tmp']);
        if (!conf.ok) {
          return finalizeOutput({
            ctx, agent, cmd: 'macro', args: rawArgv,
            lines: [formatFlowHeader({ cmd: 'macro:register', status: 'SEC_BLOCK', rule: conf.rule })],
            exitCode: EXIT_SECURITY_BLOCKED, flags, legacyTokens: 500,
          });
        }
        spec = JSON.parse(fs.readFileSync(conf.canonical, 'utf8'));
      } else if (flags.name && flags.steps) {
        spec = {
          name: String(flags.name),
          description: String(flags.desc || 'AI registered macro'),
          mutates: Boolean(flags.mutates),
          steps: JSON.parse(String(flags.steps)),
        };
      } else {
        return finalizeOutput({
          ctx, agent, cmd: 'macro', args: rawArgv,
          lines: [formatFlowHeader({ cmd: 'macro:register', status: 'ERR', msg: 'provide --spec=<file.json> or --name=<N> --steps=<json>' })],
          exitCode: EXIT_ERROR, flags, legacyTokens: 500,
        });
      }
      const res = registerMacro(ctx, spec, { agentId: agent.agentId });
      return finalizeOutput({ ctx, agent, cmd: 'macro', args: rawArgv, lines: res.lines, exitCode: res.exitCode, flags, legacyTokens: 2000 });
    }
    if (sub === 'inspect') {
      const name = pos[1] || flags.name;
      const reg = readMacroRegistry(ctx.repoRoot);
      const entry = reg.macros?.[name];
      if (!entry) {
        return finalizeOutput({
          ctx, agent, cmd: 'macro', args: rawArgv,
          lines: [formatFlowHeader({ cmd: 'macro:inspect', status: 'NOT_FOUND', name: name || '' })],
          exitCode: EXIT_ERROR, flags, legacyTokens: 500,
        });
      }
      const spec = JSON.parse(fs.readFileSync(path.join(ctx.repoRoot, entry.file), 'utf8'));
      const val = validateMacroSpec(spec, ctx.repoRoot);
      const lines = [
        formatFlowHeader({ cmd: 'macro:inspect', status: val.ok ? 'OK' : 'SEC_BLOCK', name, steps: spec.steps.length, waves: val.waves.length, sha: entry.sha256.slice(0, 12) }),
        ...val.waves.map((w, i) => formatRecord('WAVE', { n: i + 1, steps: w.map((s) => `${s.id}:${s.primitive}`).join(',') })),
      ];
      return finalizeOutput({ ctx, agent, cmd: 'macro', args: rawArgv, lines, exitCode: val.ok ? EXIT_OK : EXIT_SECURITY_BLOCKED, flags, legacyTokens: 1500 });
    }
    if (sub === 'remove') {
      const name = pos[1] || flags.name;
      const res = removeRegisteredMacro(ctx, name);
      return finalizeOutput({ ctx, agent, cmd: 'macro', args: rawArgv, lines: res.lines, exitCode: res.exitCode, flags, legacyTokens: 500 });
    }
    if (sub === 'run') {
      const name = pos[1] || flags.name;
      const vars = {};
      for (const [k, v] of Object.entries(flags)) {
        if (['budget', 'raw', 'agent', 'ws', 'cwd', 'dry-run', 'name', 'concurrency'].includes(k)) continue;
        vars[k] = v === true ? 'true' : String(v);
      }
      const res = await runRegisteredMacro(ctx, agent, name, { vars, dryRun: Boolean(flags['dry-run']) });
      return finalizeOutput({ ctx, agent, cmd: 'macro', args: rawArgv, lines: res.lines, exitCode: res.exitCode, flags, legacyTokens: 8000 });
    }
    return finalizeOutput({
      ctx, agent, cmd: 'macro', args: rawArgv,
      lines: [formatFlowHeader({ cmd: 'macro', status: 'ERR', msg: `unknown_subcmd:${sub}` })],
      exitCode: EXIT_ERROR, flags, legacyTokens: 500,
    });
  }

  // -------------------------------------------------------------------------
  // CERT: THE LAST EXAM V1.1 Cryptographic「V1.1証明」Status, Verify & Selftest
  // -------------------------------------------------------------------------
  if (cmd === 'cert') {
    const sub = pos[0] || 'status';
    const certScript = path.join(ctx.repoRoot, 'scripts/exam/v11_certificate.mjs');
    if (!fs.existsSync(certScript)) {
      return finalizeOutput({
        ctx, agent, cmd: 'cert', args: rawArgv,
        lines: [formatFlowHeader({ cmd: `cert:${sub}`, status: 'NO_CERT_MODULE', msg: 'EXAM V1.1 cert engine not present in repo' })],
        exitCode: EXIT_OK, flags, legacyTokens: 500,
      });
    }
    const cArgs = [certScript, sub];
    if (flags.unit) cArgs.push(`--unit=${flags.unit}`);
    if (pos[1]) cArgs.push(pos[1]);
    const r = safeSpawnSync('node', cArgs, {
      cwd: ctx.repoRoot,
      env: { ...process.env, ...agent.envOverlay },
    });
    const out = `${r.stdout || ''}${r.stderr ? '\n' + r.stderr : ''}`.trim();
    const lines = [
      formatFlowHeader({ cmd: `cert:${sub}`, status: r.status === 0 ? 'OK' : `EXIT_${r.status}` }),
      ...(out ? out.split('\n') : []),
    ];
    return finalizeOutput({ ctx, agent, cmd: 'cert', args: rawArgv, lines, exitCode: r.status ?? 1, flags, legacyTokens: 2000 });
  }

  // -------------------------------------------------------------------------
  // SELFTEST: Portable OS Complete Self-Proof (SEC-12/13 + Swarm + Macro + 2-Book)
  // -------------------------------------------------------------------------
  if (cmd === 'selftest') {
    const sec = runSecuritySelftest();
    const sw = runSwarmSelftest();
    const mac = await runMacroSelftest();
    const doc = auditTwoBooks(ctx, { strict: true });
    const ok = sec.ok && sw.ok && mac.ok && doc.ok;
    const lines = [
      formatFlowHeader({
        cmd: 'selftest',
        status: ok ? 'PASS' : 'FAIL',
        sec13: `${sec.passed}/${sec.total}`,
        swarm: `${sw.passed}/${sw.total}`,
        macro: `${mac.passed}/${mac.total}`,
        books: `${doc.bookCount}/2(${doc.totalTokens}tok)`,
      }),
      ...sec.failed.map((f) => `SEC_FAIL|${f.id}|${f.detail}`),
      ...sw.failed.map((f) => `SW_FAIL|${f.id}|${f.detail}`),
      ...mac.failed.map((f) => `MACRO_FAIL|${f.id}|${f.detail}`),
      ...doc.violations.map((v) => `DOC_FAIL|${v}`),
    ];
    return finalizeOutput({ ctx, agent, cmd: 'selftest', args: rawArgv, lines, exitCode: ok ? EXIT_OK : EXIT_BLOCKED, flags, legacyTokens: 8000 });
  }

  process.stdout.write(`FLOW1|status=ERR|msg=unknown_cmd:${cmd}|hint=flow help\n`);
  process.exit(EXIT_ERROR);
}

main().catch((err) => {
  process.stdout.write(`FLOW1|status=ERR|msg=${String(err?.message || err).replace(/\n/g, ' ')}\n`);
  process.exit(EXIT_ERROR);
});
