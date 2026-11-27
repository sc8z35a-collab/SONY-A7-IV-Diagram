/**
 * Buchigire Guard v1 (bg) — AI Compact, bg/v1 JSON, Human CLI & Interactive HTML5 Dashboard Renderers.
 */

import fs from 'node:fs';
import path from 'node:path';
import { atomicWriteFileSync } from './git_plumbing.mjs';

function escHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function formatJson(command, result) {
  return JSON.stringify(
    {
      schema: 'bg/v1',
      command,
      timestamp: new Date().toISOString(),
      ...result,
    },
    null,
    2
  );
}

/**
 * BG-33: Ultra-compact AI-agent-friendly output (low token budget, crystal clear verdict).
 */
export function formatAi(command, r) {
  const lines = [];
  if (command === 'boot') {
    lines.push(
      `[bg boot] VERDICT=${r.verdict} (exit=${r.exitCode}) | branch=${r.branch} behind=${r.behindDefault} ahead=${r.aheadDefault} dirty=${r.dirtyCount} remoteVaults=${r.remoteVaultCount} orphans=${r.orphanedVaults.length} | ${r.elapsedMs}ms`
    );
    for (const o of r.orphanedVaults) {
      lines.push(
        `  ORPHAN_VAULT slug=${o.slug} oid=${o.oid.slice(0, 10)} host=${o.vmHost} dirty=${o.dirtyCount} artifacts=${o.artifactsCount} next="${o.nextStep || '-'}"`
      );
      lines.push(`  RECOVER_CMD: npm run bg -- recover --slug=${o.slug} --mode=three-way --with-artifacts`);
    }
  } else if (command === 'snap' || command === 'seal') {
    if (r.verdict === 'BLOCKED_SECRET_LEAK') {
      lines.push(`[bg ${command}] VERDICT=BLOCKED_SECRET_LEAK (exit=2) | ${r.message}`);
      for (const f of r.secretFindings || []) {
        lines.push(`  SECRET: ${f.rule} @ ${f.path}:${f.line}`);
      }
    } else {
      lines.push(
        `[bg ${command}] VERDICT=${r.verdict} (exit=${r.exitCode}) | oid=${(r.commitOid || '').slice(0, 10)} tier=${r.tier} ref=${r.remoteRef || r.localRef} dirty=${r.dirtyCount} files=${r.fileCount} ${r.skipped ? '(NO_CHANGE)' : `${r.elapsedMs}ms`}`
      );
      if (r.pushError) lines.push(`  PUSH_WARN: ${r.pushError}`);
      if (r.bundleInfo) lines.push(`  BUNDLE: ${r.bundleInfo.bundlePath} sha256=${r.bundleInfo.sha256.slice(0, 12)}`);
    }
  } else if (command === 'gate') {
    lines.push(
      `[bg gate] VERDICT=${r.verdict} (exit=${r.exitCode}) | policy=${r.policy} pass=${r.passedCount}/${r.totalChecks} warn=${r.warnCount} fail=${r.failCount}`
    );
    for (const c of r.checks || []) {
      if (c.status !== 'PASS') lines.push(`  [${c.status}] ${c.id}: ${c.detail}`);
    }
    if (r.receipt) lines.push(`  RECEIPT: ${r.receipt}`);
  } else if (command === 'status') {
    lines.push(
      `[bg status] VERDICT=${r.verdict} | score=${r.durabilityScore}/100 | offVmDurable=${r.offVmDurable} branch=${r.branch} dirty=${r.dirtyCount} rpoAgeSec=${r.rpoAgeSec ?? 'none'} watch=${r.watchRunning}`
    );
    if (r.lastRemote) {
      lines.push(`  LAST_REMOTE: ${r.lastRemote.remoteRef} @ ${r.lastRemote.commitOid.slice(0, 10)} (${r.lastRemote.timestamp})`);
    }
    if (r.flight?.nextStep) lines.push(`  FLIGHT_NEXT: ${r.flight.nextStep}`);
  } else if (command === 'recover') {
    lines.push(
      `[bg recover] VERDICT=${r.verdict} (exit=${r.exitCode}) | mode=${r.mode || 'inspect'} oid=${(r.oid || '').slice(0, 10)} restored=${r.restoredCount ?? r.fileCount ?? 0} shaVerified=${r.shaVerified ?? 0} artifacts=${(r.restoredArtifacts || r.artifacts || []).length}`
    );
    if (r.flight?.goal) lines.push(`  FLIGHT_GOAL: ${r.flight.goal}`);
    if (r.flight?.nextStep) lines.push(`  FLIGHT_NEXT: ${r.flight.nextStep}`);
    if (r.message) lines.push(`  MSG: ${r.message}`);
  } else if (command === 'sync') {
    lines.push(
      `[bg sync] VERDICT=${r.verdict} (exit=${r.exitCode}) | ${r.branch} vs ${r.targetRef} ahead=${r.ahead} behind=${r.behind} cleanMerge=${r.cleanMerge}`
    );
    for (const c of r.conflicts || []) lines.push(`  CONFLICT: ${c}`);
  } else if (command === 'land') {
    lines.push(
      `[bg land] VERDICT=${r.verdict} (exit=${r.exitCode}) | branch=${r.branch || '-'} pr=${r.prUrl || '-'} merged=${Boolean(r.merged)}`
    );
    if (r.receipt) lines.push(`  RECEIPT: ${r.receipt}`);
    if (r.message) lines.push(`  MSG: ${r.message}`);
  } else if (command === 'guard-exec') {
    lines.push(
      `[bg guard-exec] VERDICT=${r.verdict} (exit=${r.exitCode}) | safetyOid=${(r.safetyOid || '').slice(0, 10)} remote=${Boolean(r.safetyRemoteVerified)}`
    );
    if (r.exitCode !== 0 && r.rollbackCommand) lines.push(`  ROLLBACK: ${r.rollbackCommand}`);
  } else if (command === 'selftest') {
    lines.push(
      `[bg selftest] VERDICT=${r.verdict} (${r.passed}/${r.total} PASS) | ${r.elapsedMs}ms`
    );
    for (const t of r.cases || []) {
      if (!t.ok) lines.push(`  [FAIL] ${t.id} ${t.name}: ${t.error}`);
    }
  } else {
    lines.push(`[bg ${command}] VERDICT=${r.verdict} (exit=${r.exitCode}) ${r.message || ''}`.trim());
  }
  return lines.join('\n');
}

export function formatHuman(command, r) {
  const lines = [formatAi(command, r)];
  if (command === 'gate' && Array.isArray(r.checks)) {
    lines.push('--- Gate Invariants ---');
    for (const c of r.checks) {
      lines.push(`  [${c.status.padEnd(4)}] ${c.id.padEnd(24)} ${c.detail}`);
    }
  } else if (command === 'selftest' && Array.isArray(r.cases)) {
    lines.push('--- 20-Case Adversarial Chaos Oracle ---');
    for (const t of r.cases) {
      lines.push(`  [${t.ok ? 'PASS' : 'FAIL'}] ${t.id.padEnd(5)} ${t.name} (${t.ms}ms)${t.ok ? '' : ` — ${t.error}`}`);
    }
  } else if (command === 'recover' && r.verdict === 'INSPECT_OK') {
    lines.push(`  Created: ${r.createdAt} | VM: ${r.vmHost} | Base: ${r.baseSha?.slice(0, 10)}`);
    if (r.history?.length) {
      lines.push('--- Vault Time-Machine History ---');
      for (const h of r.history) lines.push(`  ~${h.rev}  ${h.shortOid}  ${h.iso}  ${h.subject}`);
    }
  } else if (command === 'gc') {
    lines.push(`  Pruned remote (${r.prunedRemote.length}): ${r.prunedRemote.join(', ') || 'none'}`);
    lines.push(`  Kept (${r.kept.length}): ${r.kept.map((k) => k.slug).join(', ') || 'none'}`);
  } else if (command === 'hooks') {
    for (const [k, v] of Object.entries(r.hooks || {})) lines.push(`  hook ${k}: ${v}`);
  }
  return lines.join('\n');
}

/**
 * BG-34: Generate standalone single-file dark-mode HTML5 Flight-Recorder & Durability Dashboard.
 */
export function writeHtmlDashboard(statusData, outPath) {
  const absOut = path.resolve(outPath);
  const scoreColor = statusData.durabilityScore >= 85 ? '#22c55e' : statusData.durabilityScore >= 50 ? '#f59e0b' : '#ef4444';
  const rows = (statusData.recentJournal || [])
    .map(
      (j) => `<tr>
        <td><code>${escHtml((j.commitOid || '').slice(0, 10))}</code></td>
        <td>${escHtml(j.timestamp)}</td>
        <td><span class="pill ${j.remoteVerified ? 'ok' : 'warn'}">${j.remoteVerified ? 'REMOTE_VERIFIED' : 'LOCAL_ONLY'}</span></td>
        <td><code>${escHtml(j.remoteRef || j.localRef || '-')}</code></td>
        <td>${escHtml(j.dirtyCount)} dirty / ${escHtml(j.fileCount)} files</td>
        <td>${escHtml(j.reason)}</td>
        <td>${escHtml(j.elapsedMs)} ms</td>
      </tr>`
    )
    .join('\n');

  const recoverCmd = statusData.lastRemote
    ? `npm run bg -- recover --slug=${statusData.lastRemote.slug} --mode=three-way --with-artifacts`
    : `npm run bg -- seal --next="Resume checkpoint"`;

  const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Buchigire Guard v1 — Durability Telemetry Dashboard</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background:#0b0f17; color:#e2e8f0; padding:24px; }
  .wrap { max-width:1120px; margin:0 auto; }
  .header { display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1e293b; padding-bottom:16px; margin-bottom:20px; }
  h1 { margin:0; font-size:22px; letter-spacing:.02em; }
  .badge { padding:6px 12px; border-radius:999px; font-weight:700; font-size:12px; background:${scoreColor}22; color:${scoreColor}; border:1px solid ${scoreColor}; }
  .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; margin-bottom:20px; }
  .card { background:#111827; border:1px solid #1f2937; border-radius:12px; padding:16px; }
  .label { font-size:11px; text-transform:uppercase; color:#94a3b8; letter-spacing:.06em; }
  .val { font-size:26px; font-weight:800; margin-top:6px; }
  .sub { font-size:12px; color:#94a3b8; margin-top:4px; }
  .box { background:#111827; border:1px solid #1f2937; border-radius:12px; padding:16px; margin-bottom:18px; }
  .cmd { display:flex; gap:10px; align-items:center; background:#020617; border:1px solid #334155; border-radius:8px; padding:10px 12px; font-family:ui-monospace,monospace; font-size:13px; }
  button { background:#2563eb; color:#fff; border:none; border-radius:6px; padding:6px 12px; cursor:pointer; font-weight:600; }
  button:hover { background:#1d4ed8; }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  th, td { text-align:left; padding:9px 10px; border-bottom:1px solid #1e293b; }
  th { color:#94a3b8; font-size:11px; text-transform:uppercase; }
  .pill { padding:2px 8px; border-radius:999px; font-size:11px; font-weight:700; }
  .pill.ok { background:#16a34a26; color:#4ade80; border:1px solid #16a34a; }
  .pill.warn { background:#f59e0b26; color:#fbbf24; border:1px solid #f59e0b; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div>
      <h1>🛡️ Buchigire Guard v1 (<code>bg</code>) — Off-VM Durability Telemetry</h1>
      <div class="sub">Branch: <code>${escHtml(statusData.branch)}</code> · HEAD: <code>${escHtml((statusData.headSha || '-').slice(0, 12))}</code> · Generated: ${escHtml(new Date().toISOString())}</div>
    </div>
    <div class="badge">${escHtml(statusData.verdict)} · ${statusData.durabilityScore}/100</div>
  </div>

  <div class="grid">
    <div class="card">
      <div class="label">Durability Score</div>
      <div class="val" style="color:${scoreColor}">${statusData.durabilityScore} / 100</div>
      <div class="sub">Off-VM Durable: ${statusData.offVmDurable ? 'YES (Verified)' : 'NO — Seal Now!'}</div>
    </div>
    <div class="card">
      <div class="label">RPO Age (Last Off-VM Push)</div>
      <div class="val">${statusData.rpoAgeSec != null ? `${statusData.rpoAgeSec}s` : 'N/A'}</div>
      <div class="sub">Watchdog Daemon: ${statusData.watchRunning ? 'ACTIVE' : 'STOPPED'}</div>
    </div>
    <div class="card">
      <div class="label">Working Tree State</div>
      <div class="val">${statusData.dirtyCount} dirty</div>
      <div class="sub">mod=${statusData.modifiedCount} · staged=${statusData.stagedCount} · untracked=${statusData.untrackedCount}</div>
    </div>
    <div class="card">
      <div class="label">Vault Generations</div>
      <div class="val">${statusData.journalCount}</div>
      <div class="sub">Ref: <code>${escHtml(statusData.lastRemote?.remoteRef || 'none')}</code></div>
    </div>
  </div>

  <div class="box">
    <div class="label" style="margin-bottom:8px">AI Flight Recorder (Compaction & VM-Wipe Proof Memory)</div>
    <div><strong>Goal:</strong> ${escHtml(statusData.flight?.goal || '(unset)')}</div>
    <div style="margin-top:6px"><strong>Next Step:</strong> ${escHtml(statusData.flight?.nextStep || '(unset)')}</div>
    <div style="margin-top:6px"><strong>Completed:</strong> ${escHtml((statusData.flight?.completed || []).join(' · ') || '(none)')}</div>
    <div style="margin-top:12px" class="cmd">
      <span id="rcmd" style="flex:1;overflow:auto">${escHtml(recoverCmd)}</span>
      <button onclick="navigator.clipboard?.writeText(document.getElementById('rcmd').textContent)">Copy</button>
    </div>
  </div>

  <div class="box">
    <div class="label" style="margin-bottom:10px">Recent Vault Snapshot Timeline</div>
    <table>
      <thead><tr><th>OID</th><th>Timestamp</th><th>Durability</th><th>Vault Ref</th><th>Scope</th><th>Reason</th><th>Latency</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="7">No snapshots yet. Run <code>npm run bg -- snap</code>.</td></tr>'}</tbody>
    </table>
  </div>
</div>
</body>
</html>`;

  fs.mkdirSync(path.dirname(absOut), { recursive: true });
  atomicWriteFileSync(absOut, html);
  return absOut;
}
