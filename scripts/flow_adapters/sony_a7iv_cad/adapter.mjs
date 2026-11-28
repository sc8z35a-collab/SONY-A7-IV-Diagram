/**
 * FLOW V1 OS — SONY-A7-IV-Diagram Project Domain Adapter
 * Plugs EXAM V1 (36 engines / 530 tests), bg v1, pp1.1, sokutei, sp, dx, V2 catalog,
 * live 23-unit telemetry, and the 0-token `flow heal` coupled solver into the portable FLOW OS core.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  EXIT_BLOCKED,
  EXIT_OK,
  EXIT_SOLVER_MISSING,
  EXIT_WARN,
} from '../../flow_os/kernel_config.mjs';
import { safeSpawnSync } from '../../flow_os/security_fortress.mjs';
import { formatFlowHeader, formatRecord } from '../../flow_os/wire_protocol.mjs';

const EXCLUDED_EXAM_UNITS = new Set(['mirai_2028', 'sensor_fab']);

function readTsvRows(absPath) {
  if (!fs.existsSync(absPath)) return [];
  const lines = fs.readFileSync(absPath, 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
  if (lines.length < 2) return [];
  const hdr = lines[0].split('\t');
  return lines.slice(1).map((l) => {
    const cols = l.split('\t');
    const o = {};
    for (let i = 0; i < hdr.length; i++) o[hdr[i]] = cols[i] ?? '';
    return o;
  });
}

function countPoseOverrides(repoRoot, unitId) {
  const p = path.join(repoRoot, 'src/units', `${unitId}.pose.tsv`);
  if (!fs.existsSync(p)) return 0;
  return fs
    .readFileSync(p, 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('#')).length;
}

export function createAdapter(ctx) {
  const root = ctx.repoRoot;

  function listUnits() {
    const rows = readTsvRows(path.join(root, 'catalog/INDEX.tsv'));
    return rows.map((r) => ({
      unitId: r.mode,
      kind: r.kind,
      partCount: Number(r.parts || 0),
      slugPrefix: r.slug_prefix,
      codeRange: r.code_min && r.code_max && r.code_min !== '-' ? `${r.code_min}..${r.code_max}` : '-',
      unitFile: r.unit_file,
      dataFile: r.data_file,
      examActive: !EXCLUDED_EXAM_UNITS.has(r.mode),
    }));
  }

  function runNode(scriptRel, args, agent, timeoutMs = 600_000) {
    return safeSpawnSync('node', [path.join(root, scriptRel), ...args], {
      cwd: root,
      env: { ...process.env, ...(agent?.envOverlay || {}) },
      timeoutMs,
    });
  }

  return {
    name: 'sony_a7iv_cad',
    listUnits,

    /**
     * `flow wake`: bg boot + optional bg start + solver manifest probe + incremental atlas + unit brief
     */
    async onWake({ slug, unit, role, goal, next, ignoreOrphans, agent }) {
      const boot = runNode('scripts/bg.mjs', ['boot', '--ai'], agent, 60_000);
      const bootLine = (boot.stdout || '').split('\n').find((l) => l.includes('[bg boot]')) || (boot.stdout || '').trim().split('\n')[0] || '';
      const briefLines = [];

      if (slug) {
        const sArgs = ['start', slug, '--ai'];
        if (ignoreOrphans) sArgs.push('--ignore-orphans');
        if (goal) sArgs.push(`--goal=${goal}`);
        if (next) sArgs.push(`--next=${next}`);
        const st = runNode('scripts/bg.mjs', sArgs, agent, 60_000);
        const sLine = (st.stdout || '').split('\n').find((l) => l.includes('[bg start]')) || `exit=${st.status}`;
        briefLines.push(`START|${sLine}`);
      } else if (boot.status === 3) {
        const orphans = (boot.stdout || '').split('\n').filter((l) => l.includes('ORPHAN_VAULT')).slice(0, 3);
        for (const o of orphans) briefLines.push(o.trim());
      }

      // Fast 0-download solver readiness check from /tmp/tlx_env_manifest.json
      let solvers = '0/32(run:flow exec exam setup)';
      let solversMissing = true;
      const manPath = '/tmp/tlx_env_manifest.json';
      if (fs.existsSync(manPath)) {
        try {
          const m = JSON.parse(fs.readFileSync(manPath, 'utf8'));
          const ready = Number(m.ready ?? 0);
          const total = Number(m.total ?? 32);
          solvers = `${ready}/${total}`;
          solversMissing = ready < total;
        } catch {
          solversMissing = true;
        }
      }

      // Ensure code atlas exists (sub-second)
      if (!fs.existsSync(path.join(root, 'catalog/code/SYMBOLS.tsv'))) {
        runNode('scripts/dx.mjs', ['atlas', '--ai'], agent, 30_000);
      }

      if (unit) {
        const uInfo = listUnits().find((u) => u.unitId === unit);
        if (uInfo) {
          briefLines.push(
            formatRecord('UNIT', {
              id: uInfo.unitId,
              parts: uInfo.partCount,
              codes: uInfo.codeRange,
              entry: uInfo.unitFile,
              data: uInfo.dataFile,
              pose_overrides: countPoseOverrides(root, unit),
            })
          );
        }
      } else {
        const all = listUnits();
        const indiv = all.filter((u) => u.kind === 'individual');
        briefLines.push(
          formatRecord('REPO', {
            modes: all.length,
            indiv_parts: indiv.reduce((s, u) => s + u.partCount, 0),
            role,
            books: 'AGENTS.md+README.md',
          })
        );
      }

      return {
        bootExit: boot.status,
        bootSummary: bootLine,
        solvers,
        solversMissing,
        briefLines,
      };
    },

    /**
     * `flow inspect`: auto-routes to defect capsule, pose.tsv row, dx read, or semantic find
     */
    async onInspect({ target, defect, unit, runId, agent }) {
      // Defect capsule route (Phase 1 module if available)
      if (defect) {
        const capModPath = path.join(root, 'scripts/flow_adapters/sony_a7iv_cad/defect_capsule.mjs');
        if (fs.existsSync(capModPath)) {
          const { buildDefectCapsule } = await import(`file://${capModPath}`);
          const cap = await buildDefectCapsule(ctx, { partId: target, unitId: unit, runId });
          return { exitCode: cap.ok ? EXIT_OK : EXIT_BLOCKED, lines: cap.lines, legacyTokens: 15000 };
        }
      }

      const units = listUnits();
      const matchedUnit = units.find((u) => u.unitId === target);
      if (matchedUnit) {
        const r = runNode('scripts/dx.mjs', ['brief', `--unit=${target}`, '--budget=240'], agent, 30_000);
        const poseCnt = countPoseOverrides(root, target);
        return {
          exitCode: r.status ?? 0,
          lines: [
            formatFlowHeader({ cmd: 'inspect:unit', unit: target, parts: matchedUnit.partCount, pose_overrides: poseCnt }),
            ...(r.stdout || '').trim().split('\n'),
          ],
          legacyTokens: 12000,
        };
      }

      // Check if target is a symbol `file#Symbol`
      if (target.includes('#')) {
        const r = runNode('scripts/dx.mjs', ['read', target, '--budget=260'], agent, 30_000);
        return {
          exitCode: r.status ?? 0,
          lines: [formatFlowHeader({ cmd: 'inspect:symbol', target }), ...(r.stdout || '').trim().split('\n')],
          legacyTokens: 9000,
        };
      }

      // Check if target looks like a partId (exists in ALL_NAMES or spatial TSV)
      const allNamesPath = path.join(root, 'catalog/ALL_NAMES.txt');
      if (fs.existsSync(allNamesPath) && fs.readFileSync(allNamesPath, 'utf8').includes(target)) {
        const r = runNode('scripts/dx.mjs', ['read', `--part=${target}`, '--budget=240'], agent, 30_000);
        return {
          exitCode: r.status ?? 0,
          lines: [formatFlowHeader({ cmd: 'inspect:part', part: target }), ...(r.stdout || '').trim().split('\n')],
          legacyTokens: 14000,
        };
      }

      // Default: cross-domain semantic search
      const r = runNode('scripts/dx.mjs', ['find', target, '--top=8', '--budget=250'], agent, 30_000);
      return {
        exitCode: r.status ?? 0,
        lines: [formatFlowHeader({ cmd: 'inspect:find', query: target }), ...(r.stdout || '').trim().split('\n')],
        legacyTokens: 10000,
      };
    },

    /**
     * `flow heal`: delegates to Phase 1 0-LLM-token coupled multi-physics auto-solver
     */
    async onHeal(opts) {
      const bridgePath = path.join(root, 'scripts/flow_adapters/sony_a7iv_cad/solver_bridge.mjs');
      if (!fs.existsSync(bridgePath)) {
        return {
          exitCode: EXIT_BLOCKED,
          lines: ['FLOW1|cmd=heal|status=NOT_READY|msg=Phase 1 solver_bridge.mjs not installed yet'],
        };
      }
      const mod = await import(`file://${bridgePath}`);
      if (opts.selftest) return mod.runHealSelftest(ctx);
      if (opts.bake) return mod.bakePoseToSource(ctx, opts.unit, { apply: opts.apply });
      return mod.runFlowHeal(ctx, opts);
    },

    /**
     * `flow ship`: catalog + atlas + tsc + validate + build + FULL unskipped EXAM V1 + optional pp1.1 + bg snap
     */
    async onShip({ unit, policy, fullExam, visual, skipBuild, artifacts, agent }) {
      const steps = [];
      const runStep = (name, bin, args, timeoutMs = 600_000) => {
        const t0 = performance.now();
        const r = safeSpawnSync(bin, args, {
          cwd: root,
          env: { ...process.env, ...(agent?.envOverlay || {}) },
          timeoutMs,
        });
        const ms = Math.round(performance.now() - t0);
        steps.push({ name, ok: r.status === 0, exit: r.status, ms, out: (r.stdout || '').trim(), err: (r.stderr || '').trim() });
        return r;
      };

      if (!skipBuild) {
        if (policy === 'integrator') {
          if (runStep('catalog', 'node', ['scripts/generate_catalogs.mjs']).status !== 0) return failShip(unit, steps);
          runStep('atlas', 'node', ['scripts/dx.mjs', 'atlas', '--ai']);
        }
        if (runStep('tsc', 'npx', ['tsc', '--noEmit']).status !== 0) return failShip(unit, steps);
        const valArgs = policy === 'worker' ? ['scripts/validate_parts.mjs', `--unit=${unit}`, '--ai'] : ['scripts/validate_parts.mjs', '--ai'];
        if (runStep('validate', 'node', valArgs).status !== 0) return failShip(unit, steps);
        if (policy === 'integrator') {
          if (runStep('vite_build', 'npm', ['run', 'build']).status !== 0) return failShip(unit, steps);
        }
      }

      let domainReceipt = 'NONE';
      let tlxHeader = '';
      if (fullExam) {
        const ex = runStep('exam_full', 'node', ['scripts/exam.mjs', `--unit=${unit}`], 900_000);
        const outLines = (ex.stdout || '').split('\n');
        tlxHeader = outLines.find((l) => l.startsWith('TLX1|')) || '';
        const mRcpt = tlxHeader.match(/rcpt=(TLX1-RECEIPT:[^\s|]+)/);
        if (mRcpt) domainReceipt = mRcpt[1];
        if (ex.status !== 0) {
          const fails = outLines.filter((l) => l.startsWith('F|') || l.startsWith('X|') || l.startsWith('S|')).slice(0, 12);
          return {
            exitCode: ex.status,
            domainReceipt: 'NONE',
            lines: [
              formatFlowHeader({ cmd: 'ship', status: `EXAM_EXIT_${ex.status}`, unit, policy }),
              tlxHeader,
              ...fails,
            ],
          };
        }
      }

      if (visual) {
        const ppOut = path.join(agent.agentWs, `pp_ship_${unit}`);
        runStep('pp_visual', 'node', ['scripts/pp.mjs', '--warm', '--mode=cad', `--unit=${unit}`, '--quality=high', '--ortho-pack', '--contact-sheet=3', `--out=${ppOut}`], 180_000);
        runStep('pp_stop', 'node', ['scripts/pp.mjs', '--daemon=stop'], 30_000);
      }

      // Off-VM snapshot via bg snap
      const snapArgs = ['scripts/bg.mjs', 'snap', `--completed=flow ship ${unit}`, '--next=ready_for_finish', '--ai'];
      if (artifacts) snapArgs.push(`--artifacts=${artifacts}`);
      runStep('bg_snap', 'node', snapArgs, 60_000);

      const lines = [
        formatFlowHeader({
          cmd: 'ship',
          status: 'PASS',
          unit,
          policy,
          tlx_rcpt: domainReceipt,
          steps: steps.map((s) => `${s.name}:${s.ms}ms`).join(','),
        }),
      ];
      if (tlxHeader) lines.push(tlxHeader);
      return { exitCode: EXIT_OK, domainReceipt, lines, meta: { tlxHeader } };
    },

    /**
     * `flow park`: stop isolated pp daemon + dx checkpoint + bg seal
     */
    async onPark({ next, artifacts, checkpointOnly, agent }) {
      runNode('scripts/pp.mjs', ['--daemon=stop'], agent, 20_000);
      runNode('scripts/dx.mjs', ['checkpoint', `--next=${next}`, '--ai'], agent, 20_000);
      const verb = checkpointOnly ? 'snap' : 'seal';
      const args = [verb, `--next=${next}`, '--ai'];
      if (artifacts) args.push(`--artifacts=${artifacts}`);
      const r = runNode('scripts/bg.mjs', args, agent, 60_000);
      const bgLine = (r.stdout || '').split('\n').find((l) => l.includes(`[bg ${verb}]`)) || (r.stdout || '').trim().split('\n')[0] || '';
      return {
        exitCode: r.status ?? 1,
        lines: [
          formatFlowHeader({ cmd: 'park', status: r.status === 0 ? 'SEALED' : 'BLOCKED', mode: verb }),
          `BG|${bgLine}`,
        ],
      };
    },

    /**
     * `flow finish`: bg gate (+ optional bg land) returning verified BG-RECEIPT
     */
    async onFinish({ policy, pr, merge, title, body, runChecks, agent }) {
      if (pr || merge) {
        const args = ['land', `--policy=${policy}`, '--ai'];
        if (title) args.push(`--title=${title}`);
        if (body) args.push(`--body=${body}`);
        if (merge) args.push('--merge-pr');
        const r = runNode('scripts/bg.mjs', args, agent, 300_000);
        const m = (r.stdout || '').match(/BG-RECEIPT:[^\s|]+/);
        return {
          exitCode: r.status ?? 1,
          bgReceipt: m ? m[0] : 'NONE',
          lines: (r.stdout || '').trim().split('\n').slice(0, 10),
        };
      }

      const args = ['gate', `--policy=${policy}`, '--ai'];
      if (runChecks) args.push('--run-checks', '--require-checks');
      const r = runNode('scripts/bg.mjs', args, agent, 300_000);
      const m = (r.stdout || '').match(/BG-RECEIPT:[^\s|]+/);
      return {
        exitCode: r.status ?? 1,
        bgReceipt: m ? m[0] : 'NONE',
        lines: (r.stdout || '').trim().split('\n').slice(0, 12),
      };
    },

    /**
     * Real-time domain metrics for `flow human-report` (0 cache, live JSON parsing)
     */
    async collectHumanReportMetrics() {
      const idxUnits = listUnits();
      const detailed = [];
      let uniqueParts = 0;
      let compositeParts = 0;
      let parityOk = 0;

      for (const u of idxUnits) {
        const jsonAbs = path.join(root, u.dataFile);
        let actualParts = 0;
        let declaredParts = u.partCount;
        let nameJa = '';
        let nameEn = '';
        let jsonBytes = 0;
        if (fs.existsSync(jsonAbs)) {
          jsonBytes = fs.statSync(jsonAbs).size;
          const j = JSON.parse(fs.readFileSync(jsonAbs, 'utf8'));
          actualParts = Array.isArray(j.parts) ? j.parts.length : 0;
          declaredParts = Number(j.declaredPartCount ?? actualParts);
          nameJa = j.nameJa || '';
          nameEn = j.nameEn || '';
        }
        if (actualParts === declaredParts) parityOk++;
        if (u.kind === 'composite') compositeParts += actualParts;
        else uniqueParts += actualParts;

        detailed.push({
          unitId: u.unitId,
          kind: u.kind,
          actualParts,
          declaredParts,
          codeRange: u.codeRange,
          poseOverrides: countPoseOverrides(root, u.unitId),
          jsonBytes,
          nameJa,
          nameEn,
        });
      }

      let solversStr = '未検証';
      if (fs.existsSync('/tmp/tlx_env_manifest.json')) {
        try {
          const m = JSON.parse(fs.readFileSync('/tmp/tlx_env_manifest.json', 'utf8'));
          solversStr = `${m.ready}/${m.total} READY`;
        } catch { /* ignore */ }
      }

      return {
        totalModes: detailed.length,
        individualModes: detailed.filter((d) => d.kind === 'individual').length,
        compositeModes: detailed.filter((d) => d.kind === 'composite').length,
        uniqueParts,
        compositeParts,
        totalPartEntries: uniqueParts + compositeParts,
        parityOk,
        subProjects: ['Play Ground 1.1', 'RIIMOS E1', 'FH MIRAI 2028', 'Sensor Fab 6巻', 'Android APK'],
        toolSummary: `FLOW V1 OS (12層セキュリティ + 0トークン自動修復 flow heal) / EXAM V1 (10柱・36エンジン・530固定テスト・16クロスロック・外部ソルバ ${solversStr}) / bg v1 / pp1.1 / sokutei / sp / dx`,
        units: detailed,
      };
    },
  };
}

function failShip(unit, steps) {
  const last = steps[steps.length - 1];
  return {
    exitCode: last?.exit || EXIT_BLOCKED,
    domainReceipt: 'NONE',
    lines: [
      formatFlowHeader({ cmd: 'ship', status: 'STEP_FAIL', unit, failed_step: last?.name, exit: last?.exit }),
      ...(last?.err ? last.err.split('\n').slice(-10) : (last?.out || '').split('\n').slice(-10)),
    ],
  };
}
