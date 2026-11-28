/**
 * FLOW V1.1 OS — 6 Built-In Hyper-Automated 14–30+ Step Mega-Pipelines (`flow auto <name>`)
 *
 * Replaces 14 to 30+ manual AI CLI turns with a single zero-waste parallel DAG command:
 *   1. bootstrap  (16 steps) — Full VM/repo bootstrap: 48 solvers + bg + catalog + atlas + all selftests + SEC-13
 *   2. research   (14 steps) — Massively parallel read-only dossier (AST, CAD, SP, Thermal, Cert, Git, Swarm)
 *   3. dev        (18 steps) — Guarded dev loop: wake/snap -> catalog/atlas/tsc/validate -> heal -> build -> visual -> sec -> park
 *   4. certify    (24 steps) — Full「V1.1証明」certification campaign (48 solvers + heal + build + EXAM V1.1 1,080 tests + receipt)
 *   5. fabricate  (22 steps) — New unit/feature end-to-end fabrication (scaffold Layer G/M/L -> validate -> heal -> build -> pp -> EXAM)
 *   6. factory    (30 steps) — Multi-unit parallel swarm factory orchestrator (LPT sharding + batch audit + build + SEC-13)
 */

import { MACRO_SCHEMA } from './macro_engine.mjs';

export function buildBuiltinPipelines(vars = {}) {
  const unit = String(vars.unit || vars.target || 'welcome');
  const query = String(vars.query || vars.target || unit);
  const policy = String(vars.policy || 'integrator');
  const workers = String(vars.workers || '4');
  const unitsList = String(vars.units || 'welcome,mi_shoe,evf,shutter,battery').split(',').map((s) => s.trim()).filter(Boolean).slice(0, 6);

  return {
    // 1. BOOTSTRAP — 16 Steps across 5 waves
    bootstrap: {
      schema: MACRO_SCHEMA,
      name: 'auto-bootstrap',
      description: '16-step full VM/repo environment bootstrap, 48-solver verification, catalog/atlas, and complete selftest proof',
      mutates: true,
      concurrency: 4,
      defaults: { policy },
      steps: [
        { id: 'git_status', primitive: 'git.status', args: [] },
        { id: 'bg_boot', primitive: 'bg.boot', args: [], onFail: 'continue' },
        { id: 'exam_verify', primitive: 'exam.verify', args: [], onFail: 'continue' },
        { id: 'exam_setup', primitive: 'exam.setup', args: [], deps: ['exam_verify'], when: '!${steps.exam_verify.ok}' },
        { id: 'catalog', primitive: 'npm.catalog', args: [], deps: ['git_status'] },
        { id: 'atlas', primitive: 'dx.atlas', args: [], deps: ['catalog'] },
        { id: 'tsc', primitive: 'npm.tsc', args: [], deps: ['atlas'] },
        { id: 'validate', primitive: 'npm.validate', args: ['--ai'], deps: ['atlas'] },
        { id: 'st_sec', primitive: 'flow.security', args: ['selftest', '--raw'], deps: ['tsc', 'validate'] },
        { id: 'st_swarm', primitive: 'flow.swarm', args: ['selftest', '--raw'], deps: ['tsc', 'validate'] },
        { id: 'st_bg', primitive: 'bg.selftest', args: [], deps: ['tsc', 'validate'] },
        { id: 'st_dx', primitive: 'dx.selftest', args: [], deps: ['tsc', 'validate'] },
        { id: 'st_sp', primitive: 'sp.selftest', args: [], deps: ['tsc', 'validate'] },
        { id: 'st_cert', primitive: 'exam.cert', args: ['selftest'], deps: ['tsc', 'validate'] },
        { id: 'doc_audit', primitive: 'flow.doc', args: ['audit', '--strict', '--raw'], deps: ['st_sec', 'st_swarm'] },
        { id: 'sec_full', primitive: 'flow.security', args: ['audit', '--full', '--raw'], deps: ['doc_audit', 'st_bg', 'st_dx', 'st_sp', 'st_cert'] },
      ],
    },

    // 2. RESEARCH — 14 Steps (100% Read-Only Parallel Dossier!)
    research: {
      schema: MACRO_SCHEMA,
      name: 'auto-research',
      description: '14-step massively parallel read-only dossier (git, AST, unit brief, semantic search, SP geometry, thermal CoG, V1.1 cert, security)',
      mutates: false,
      concurrency: 6,
      defaults: { target: query, unit },
      steps: [
        { id: 'git_status', primitive: 'git.status', args: [] },
        { id: 'git_log', primitive: 'git.log', args: [] },
        { id: 'git_diff', primitive: 'git.diffstat', args: [] },
        { id: 'bg_status', primitive: 'bg.status', args: [], onFail: 'continue' },
        { id: 'swarm_status', primitive: 'flow.swarm', args: ['status', '--raw'], onFail: 'continue' },
        { id: 'doc_audit', primitive: 'flow.doc', args: ['audit', '--strict', '--raw'], onFail: 'continue' },
        { id: 'exam_verify', primitive: 'exam.verify', args: [], onFail: 'continue' },
        { id: 'cert_status', primitive: 'flow.cert', args: ['status', '--raw'], onFail: 'continue' },
        { id: 'inspect_target', primitive: 'flow.inspect', args: ['${vars.target}', '--raw'], onFail: 'continue' },
        { id: 'dx_brief', primitive: 'dx.brief', args: ['--unit=${vars.unit}', '--budget=180'], onFail: 'continue' },
        { id: 'dx_find', primitive: 'dx.find', args: ['${vars.target}', '--top=5', '--budget=160'], onFail: 'continue' },
        { id: 'sp_inspect', primitive: 'sp.inspect', args: ['--unit=${vars.unit}', '--ai'], onFail: 'continue' },
        { id: 'sp_thermal', primitive: 'sp.thermal', args: ['--unit=${vars.unit}', '--ai'], onFail: 'continue' },
        { id: 'sec_audit', primitive: 'flow.security', args: ['audit', '--raw'], deps: ['git_status', 'doc_audit', 'cert_status'], onFail: 'continue' },
      ],
    },

    // 3. DEV — 18 Steps Guarded Development Loop
    dev: {
      schema: MACRO_SCHEMA,
      name: 'auto-dev',
      description: '18-step guarded dev cycle: boot -> pre-snap -> inspect -> heal -> catalog/atlas/tsc/validate/build -> optional pp -> SEC-13 -> park',
      mutates: true,
      concurrency: 4,
      defaults: { unit, policy, visual: 'false', heal: 'false' },
      steps: [
        { id: 'git_status', primitive: 'git.status', args: [] },
        { id: 'bg_boot', primitive: 'bg.boot', args: [], onFail: 'continue' },
        { id: 'sec_pre', primitive: 'flow.security', args: ['audit', '--raw'], onFail: 'continue' },
        { id: 'snap_pre', primitive: 'bg.snap', args: [], deps: ['bg_boot'] },
        { id: 'inspect_u', primitive: 'flow.inspect', args: ['${vars.unit}', '--raw'], deps: ['snap_pre'], onFail: 'continue' },
        { id: 'cert_pre', primitive: 'flow.cert', args: ['status', '--raw'], deps: ['snap_pre'], onFail: 'continue' },
        { id: 'heal_opt', primitive: 'flow.heal', args: ['--unit=${vars.unit}', '--apply', '--raw'], deps: ['inspect_u'], when: '${vars.heal}' },
        { id: 'catalog', primitive: 'npm.catalog', args: [], deps: ['heal_opt'] },
        { id: 'atlas', primitive: 'dx.atlas', args: [], deps: ['catalog'] },
        { id: 'tsc', primitive: 'npm.tsc', args: [], deps: ['atlas'] },
        { id: 'validate', primitive: 'npm.validate', args: ['--ai'], deps: ['atlas'] },
        { id: 'build', primitive: 'npm.build', args: [], deps: ['tsc', 'validate'] },
        { id: 'pp_vis', primitive: 'pp.capture', args: ['--warm', '--mode=cad', '--unit=${vars.unit}', '--quality=high', '--out=/tmp/flow_ws/pp_dev'], deps: ['build'], when: '${vars.visual}' },
        { id: 'pp_stop', primitive: 'pp.stop', args: [], deps: ['pp_vis'], when: '${vars.visual}', onFail: 'continue' },
        { id: 'doc_audit', primitive: 'flow.doc', args: ['audit', '--strict', '--raw'], deps: ['build'] },
        { id: 'sec_post', primitive: 'flow.security', args: ['audit', '--raw'], deps: ['doc_audit', 'pp_stop'] },
        { id: 'snap_post', primitive: 'bg.snap', args: [], deps: ['sec_post'] },
        { id: 'park_chk', primitive: 'flow.park', args: ['--checkpoint', '--raw'], deps: ['snap_post'] },
      ],
    },

    // 4. CERTIFY — 24 Steps Full「V1.1証明」Certification Campaign
    certify: {
      schema: MACRO_SCHEMA,
      name: 'auto-certify',
      description: '24-step full THE LAST EXAM V1.1 certification campaign (48 solvers + 0-tok heal + full build + 48 engines/1,080 tests + V1.1証明 engraving + FLOW-RECEIPT)',
      mutates: true,
      concurrency: 4,
      defaults: { unit, policy, visual: 'false', heal: 'true' },
      steps: [
        { id: 'git_status', primitive: 'git.status', args: [] },
        { id: 'bg_boot', primitive: 'bg.boot', args: [], onFail: 'continue' },
        { id: 'exam_verify', primitive: 'exam.verify', args: [] },
        { id: 'snap_pre', primitive: 'bg.snap', args: [], deps: ['bg_boot'] },
        { id: 'inspect_u', primitive: 'flow.inspect', args: ['${vars.unit}', '--raw'], deps: ['snap_pre'] },
        { id: 'sp_inspect', primitive: 'sp.inspect', args: ['--unit=${vars.unit}', '--ai'], deps: ['snap_pre'], onFail: 'continue' },
        { id: 'sp_thermal', primitive: 'sp.thermal', args: ['--unit=${vars.unit}', '--ai'], deps: ['snap_pre'], onFail: 'continue' },
        { id: 'cert_pre', primitive: 'flow.cert', args: ['status', '--raw'], deps: ['snap_pre'], onFail: 'continue' },
        { id: 'heal_apply', primitive: 'flow.heal', args: ['--unit=${vars.unit}', '--apply', '--raw'], deps: ['inspect_u', 'sp_inspect', 'sp_thermal'], when: '${vars.heal}', onFail: 'continue' },
        { id: 'catalog', primitive: 'npm.catalog', args: [], deps: ['heal_apply'] },
        { id: 'atlas', primitive: 'dx.atlas', args: [], deps: ['catalog'] },
        { id: 'tsc', primitive: 'npm.tsc', args: [], deps: ['atlas'] },
        { id: 'validate', primitive: 'npm.validate', args: ['--ai'], deps: ['atlas'] },
        { id: 'build', primitive: 'npm.build', args: [], deps: ['tsc', 'validate'] },
        { id: 'exam_v11', primitive: 'exam.run', args: ['--unit=${vars.unit}'], deps: ['build', 'exam_verify'], timeoutMs: 900_000 },
        { id: 'cert_verify', primitive: 'flow.cert', args: ['verify', '--unit=${vars.unit}', '--raw'], deps: ['exam_v11'], onFail: 'continue' },
        { id: 'cert_status', primitive: 'flow.cert', args: ['status', '--raw'], deps: ['cert_verify'] },
        { id: 'pp_vis', primitive: 'pp.capture', args: ['--warm', '--mode=cad', '--unit=${vars.unit}', '--quality=high', '--ortho-pack', '--contact-sheet=3', '--out=/tmp/flow_ws/pp_cert'], deps: ['exam_v11'], when: '${vars.visual}' },
        { id: 'pp_stop', primitive: 'pp.stop', args: [], deps: ['pp_vis'], when: '${vars.visual}', onFail: 'continue' },
        { id: 'doc_audit', primitive: 'flow.doc', args: ['audit', '--strict', '--raw'], deps: ['cert_status'] },
        { id: 'sec_selftest', primitive: 'flow.security', args: ['selftest', '--raw'], deps: ['cert_status'] },
        { id: 'sec_full', primitive: 'flow.security', args: ['audit', '--full', '--raw'], deps: ['doc_audit', 'sec_selftest', 'pp_stop'] },
        { id: 'snap_post', primitive: 'bg.snap', args: [], deps: ['sec_full'] },
        { id: 'finish_gate', primitive: 'flow.finish', args: ['--policy=${vars.policy}', '--unit=${vars.unit}', '--raw'], deps: ['snap_post'] },
      ],
    },

    // 5. FABRICATE — 22 Steps New Unit / Feature Fabrication Pipeline
    fabricate: {
      schema: MACRO_SCHEMA,
      name: 'auto-fabricate',
      description: '22-step new unit/feature end-to-end fabrication: scaffold Layer G -> validate -> heal -> catalog/atlas/tsc/build -> pp ortho -> EXAM V1.1 -> SEC-13 -> snap',
      mutates: true,
      concurrency: 4,
      defaults: { unit, policy, visual: 'false', exam: 'false' },
      steps: [
        { id: 'git_status', primitive: 'git.status', args: [] },
        { id: 'bg_boot', primitive: 'bg.boot', args: [], onFail: 'continue' },
        { id: 'exam_verify', primitive: 'exam.verify', args: [], onFail: 'continue' },
        { id: 'snap_pre', primitive: 'bg.snap', args: [], deps: ['bg_boot'] },
        { id: 'scaffold', primitive: 'scaffold.unit', args: ['--unit=${vars.unit}'], deps: ['snap_pre'] },
        { id: 'dx_find', primitive: 'dx.find', args: ['${vars.unit}', '--top=5'], deps: ['scaffold'], onFail: 'continue' },
        { id: 'sp_inspect', primitive: 'sp.inspect', args: ['--unit=${vars.unit}', '--ai'], deps: ['scaffold'], onFail: 'continue' },
        { id: 'heal_opt', primitive: 'flow.heal', args: ['--unit=${vars.unit}', '--apply', '--raw'], deps: ['sp_inspect'], onFail: 'continue' },
        { id: 'catalog', primitive: 'npm.catalog', args: [], deps: ['heal_opt'] },
        { id: 'atlas', primitive: 'dx.atlas', args: [], deps: ['catalog'] },
        { id: 'tsc', primitive: 'npm.tsc', args: [], deps: ['atlas'] },
        { id: 'validate', primitive: 'npm.validate', args: ['--ai'], deps: ['atlas'] },
        { id: 'build', primitive: 'npm.build', args: [], deps: ['tsc', 'validate'] },
        { id: 'pp_ortho', primitive: 'pp.capture', args: ['--warm', '--mode=cad', '--unit=${vars.unit}', '--quality=high', '--ortho-pack', '--out=/tmp/flow_ws/pp_fab'], deps: ['build'], when: '${vars.visual}' },
        { id: 'pp_stop', primitive: 'pp.stop', args: [], deps: ['pp_ortho'], when: '${vars.visual}', onFail: 'continue' },
        { id: 'exam_opt', primitive: 'exam.run', args: ['--unit=${vars.unit}'], deps: ['build'], when: '${vars.exam}', timeoutMs: 900_000 },
        { id: 'cert_status', primitive: 'flow.cert', args: ['status', '--raw'], deps: ['exam_opt', 'pp_stop'], onFail: 'continue' },
        { id: 'doc_audit', primitive: 'flow.doc', args: ['audit', '--strict', '--raw'], deps: ['cert_status'] },
        { id: 'sec_audit', primitive: 'flow.security', args: ['audit', '--raw'], deps: ['doc_audit'] },
        { id: 'swarm_status', primitive: 'flow.swarm', args: ['status', '--raw'], deps: ['sec_audit'] },
        { id: 'snap_post', primitive: 'bg.snap', args: [], deps: ['swarm_status'] },
        { id: 'park_chk', primitive: 'flow.park', args: ['--checkpoint', '--raw'], deps: ['snap_post'] },
      ],
    },

    // 6. FACTORY — 30 Steps Multi-Unit Parallel Swarm Factory Orchestrator
    factory: {
      schema: MACRO_SCHEMA,
      name: 'auto-factory',
      description: '30-step parallel swarm factory orchestrator across multiple units: LPT sharding, batch spatial/thermal/brief audits, unified build, SEC-13, and snap',
      mutates: true,
      concurrency: 6,
      defaults: { workers, policy, units: unitsList.join(',') },
      steps: [
        { id: 'git_status', primitive: 'git.status', args: [] },
        { id: 'bg_boot', primitive: 'bg.boot', args: [], onFail: 'continue' },
        { id: 'exam_verify', primitive: 'exam.verify', args: [], onFail: 'continue' },
        { id: 'swarm_plan', primitive: 'flow.swarm', args: ['plan', '--units=active', '--workers=${vars.workers}', '--raw'], deps: ['git_status'] },
        { id: 'snap_pre', primitive: 'bg.snap', args: [], deps: ['bg_boot'] },
        // 5 units x 3 parallel diagnostic passes = 15 parallel factory shard steps
        ...unitsList.slice(0, 5).flatMap((u, idx) => [
          { id: `u${idx + 1}_brief`, primitive: 'dx.brief', args: [`--unit=${u}`, '--budget=140'], deps: ['swarm_plan', 'snap_pre'], onFail: 'continue' },
          { id: `u${idx + 1}_sp`, primitive: 'sp.inspect', args: [`--unit=${u}`, '--ai'], deps: ['swarm_plan', 'snap_pre'], onFail: 'continue' },
          { id: `u${idx + 1}_th`, primitive: 'sp.thermal', args: [`--unit=${u}`, '--ai'], deps: ['swarm_plan', 'snap_pre'], onFail: 'continue' },
        ]),
        // 10-step unified convergence & fortress verification tail (total = 5 + 15 + 10 = 30 steps!)
        { id: 'catalog', primitive: 'npm.catalog', args: [], deps: unitsList.slice(0, 5).map((_, idx) => `u${idx + 1}_brief`) },
        { id: 'atlas', primitive: 'dx.atlas', args: [], deps: ['catalog'] },
        { id: 'tsc', primitive: 'npm.tsc', args: [], deps: ['atlas'] },
        { id: 'validate', primitive: 'npm.validate', args: ['--ai'], deps: ['atlas'] },
        { id: 'build', primitive: 'npm.build', args: [], deps: ['tsc', 'validate'] },
        { id: 'cert_status', primitive: 'flow.cert', args: ['status', '--raw'], deps: ['build'] },
        { id: 'doc_audit', primitive: 'flow.doc', args: ['audit', '--strict', '--raw'], deps: ['build'] },
        { id: 'sec_full', primitive: 'flow.security', args: ['audit', '--full', '--raw'], deps: ['cert_status', 'doc_audit'] },
        { id: 'swarm_status', primitive: 'flow.swarm', args: ['status', '--raw'], deps: ['sec_full'] },
        { id: 'snap_post', primitive: 'bg.snap', args: [], deps: ['swarm_status'] },
      ],
    },
  };
}

export function listBuiltinPipelines() {
  const all = buildBuiltinPipelines();
  return Object.entries(all).map(([key, spec]) => ({
    key,
    name: spec.name,
    steps: spec.steps.length,
    mutates: Boolean(spec.mutates),
    description: spec.description,
  }));
}

export function getBuiltinPipeline(name, vars = {}) {
  const all = buildBuiltinPipelines(vars);
  return all[name] || null;
}
