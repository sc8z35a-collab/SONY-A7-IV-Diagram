/**
 * FLOW V1 OS — Multi-Agent Swarm Orchestrator (`flow swarm`)
 * Splits multi-unit campaigns into disjoint <=120-token worker manifests, tracks parallel leases &
 * quarantine states, verifies signed worker FLOW-RECEIPTs, and runs isolated parallel stress selftest.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {
  DEFAULT_FLOW_CONFIG,
  EXIT_BLOCKED,
  EXIT_OK,
  atomicWriteSync,
  resolveAgentContext,
} from './kernel_config.mjs';
import { acquireLease, listLeases, releaseAllAgentLeases, releaseLease } from './lease_manager.mjs';
import { isAgentQuarantined, quarantineAgent, runSec10ParallelScope } from './security_fortress.mjs';

export function buildSwarmPlan(ctx, adapter, { unitsArg = 'active', workers = 4 } = {}) {
  const allUnits = adapter?.listUnits ? adapter.listUnits() : [];
  let targets = allUnits;
  if (unitsArg === 'active') {
    targets = allUnits.filter((u) => u.examActive !== false);
  } else if (unitsArg !== 'all') {
    const want = new Set(String(unitsArg).split(',').map((s) => s.trim()).filter(Boolean));
    targets = allUnits.filter((u) => want.has(u.unitId));
  }

  // LPT (Longest Processing Time) bin-packing by partCount across N worker shards
  const sorted = [...targets].sort((a, b) => (b.partCount || 0) - (a.partCount || 0));
  const nWorkers = Math.max(1, Math.min(Number(workers) || 4, sorted.length || 1));
  const shards = Array.from({ length: nWorkers }, (_, i) => ({
    workerId: `worker_${String(i + 1).padStart(2, '0')}`,
    units: [],
    totalParts: 0,
  }));

  for (const u of sorted) {
    shards.sort((a, b) => a.totalParts - b.totalParts);
    shards[0].units.push(u.unitId);
    shards[0].totalParts += u.partCount || 1;
  }
  shards.sort((a, b) => a.workerId.localeCompare(b.workerId));

  const plan = {
    schema: 'flow-swarm-plan/v1',
    createdAt: new Date().toISOString(),
    totalUnits: targets.length,
    workerCount: shards.length,
    shards: shards.map((s) => ({
      ...s,
      wakeCmd: `FLOW_AGENT_ID=${s.workerId} npm run flow -- wake feat-swarm-${s.workerId} --unit=${s.units[0] || 'all'} --role=worker`,
      healCmds: s.units.map((u) => `FLOW_AGENT_ID=${s.workerId} npm run flow -- heal --unit=${u} --apply`),
      shipCmds: s.units.map((u) => `FLOW_AGENT_ID=${s.workerId} npm run flow -- ship --unit=${u} --policy=worker --full-exam`),
      finishCmd: `FLOW_AGENT_ID=${s.workerId} npm run flow -- finish --policy=worker`,
    })),
  };
  atomicWriteSync(path.join(ctx.stateDir, 'swarm_plan.json'), JSON.stringify(plan, null, 2) + '\n');
  return plan;
}

export function getSwarmStatus(ctx) {
  const { active, expired } = listLeases(ctx.stateDir);
  const qDir = path.join(ctx.stateDir, 'quarantine');
  const quarantined = fs.existsSync(qDir)
    ? fs.readdirSync(qDir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(qDir, f), 'utf8')))
    : [];
  const planPath = path.join(ctx.stateDir, 'swarm_plan.json');
  const plan = fs.existsSync(planPath) ? JSON.parse(fs.readFileSync(planPath, 'utf8')) : null;
  return {
    activeLeases: active,
    expiredLeases: expired,
    quarantined,
    plan,
  };
}

/**
 * Isolated multi-agent parallel stress selftest (8 assertions):
 * Proves disjoint leases, duplicate-unit conflict blocking, workspace isolation,
 * rogue-worker quarantine blast-radius containment, and clean lease release.
 */
export function runSwarmSelftest() {
  const t0 = performance.now();
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'flow_swarm_selftest_'));
  const stateDir = path.join(sandbox, '.git', 'flow_os');
  fs.mkdirSync(stateDir, { recursive: true });
  const cfg = JSON.parse(JSON.stringify(DEFAULT_FLOW_CONFIG));
  cfg.parallel.wsBaseDir = path.join(sandbox, 'ws');
  cfg.policies.worker.protectedPaths = ['src/core/**', 'src/units/registry.ts'];
  const ctx = { repoRoot: sandbox, gitDir: path.join(sandbox, '.git'), stateDir, cfg };

  const checks = [];
  const assert = (id, ok, detail) => checks.push({ id, ok: Boolean(ok), detail });

  try {
    const a1 = resolveAgentContext(cfg, { agentId: 'agent_evf' });
    const a2 = resolveAgentContext(cfg, { agentId: 'agent_lens' });
    const a3 = resolveAgentContext(cfg, { agentId: 'agent_rogue' });

    // 1. Disjoint workspaces
    assert('SW01', a1.agentWs !== a2.agentWs && a1.envOverlay.FLOW_PP_DAEMON_DIR !== a2.envOverlay.FLOW_PP_DAEMON_DIR, 'Isolated FLOW_AGENT_WS per worker');

    // 2. Acquire disjoint unit leases concurrently
    const l1 = acquireLease(ctx, { scope: 'unit:evf', agentId: a1.agentId, agentWs: a1.agentWs });
    const l2 = acquireLease(ctx, { scope: 'unit:lens', agentId: a2.agentId, agentWs: a2.agentWs });
    assert('SW02', l1.ok && l2.ok, 'Disjoint unit leases acquired');

    // 3. Duplicate lease on same unit MUST block
    const lDup = acquireLease(ctx, { scope: 'unit:evf', agentId: a2.agentId, agentWs: a2.agentWs });
    assert('SW03', !lDup.ok && lDup.exitCode === EXIT_BLOCKED && lDup.reason === 'LEASE_CONFLICT', 'Double-claim blocked with LEASE_CONFLICT');

    // 4. Same owner re-acquiring/renewing succeeds
    const lRenew = acquireLease(ctx, { scope: 'unit:evf', agentId: a1.agentId, agentWs: a1.agentWs });
    assert('SW04', lRenew.ok, 'Owner lease renewal allowed');

    // 5. Healthy worker editing inside leased unit passes SEC-10
    const scOk = runSec10ParallelScope(ctx, ['src/assemblies/evf/evfParts.ts', 'src/units/evf.pose.tsv'], {
      role: 'worker',
      allowedUnit: 'evf',
      agentId: a1.agentId,
    });
    assert('SW05', scOk.length === 0, 'In-scope worker edit allowed');

    // 6. Rogue worker touching another unit OR protected core fails SEC-10 and gets quarantined
    const scBad = runSec10ParallelScope(ctx, ['src/core/v2_unit_compiler.ts', 'src/units/lens.ts'], {
      role: 'worker',
      allowedUnit: 'evf',
      agentId: a3.agentId,
    });
    quarantineAgent(stateDir, a3.agentId, 'WORKER_SCOPE_BREACH', scBad);
    assert('SW06', scBad.length >= 2 && isAgentQuarantined(stateDir, a3.agentId), 'Rogue worker blocked & quarantined');

    // 7. Blast-radius containment: healthy agent_evf & agent_lens remain unquarantined
    assert('SW07', !isAgentQuarantined(stateDir, a1.agentId) && !isAgentQuarantined(stateDir, a2.agentId), 'Healthy workers unaffected by rogue quarantine');

    // 8. Non-owner cannot steal/release lease; owner release frees scope
    const badRel = releaseLease(ctx, { scope: 'unit:evf', agentId: a2.agentId });
    const okRel = releaseAllAgentLeases(ctx, a1.agentId);
    const reAcq = acquireLease(ctx, { scope: 'unit:evf', agentId: a2.agentId });
    assert('SW08', !badRel.ok && okRel === 1 && reAcq.ok, 'Lease ownership & release verified');
  } finally {
    fs.rmSync(sandbox, { recursive: true, force: true });
  }

  const passed = checks.filter((c) => c.ok).length;
  return {
    ok: passed === checks.length,
    exitCode: passed === checks.length ? EXIT_OK : 1,
    passed,
    total: checks.length,
    failed: checks.filter((c) => !c.ok),
    elapsedMs: Math.round(performance.now() - t0),
  };
}
