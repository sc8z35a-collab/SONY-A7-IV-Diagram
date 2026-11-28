/**
 * FLOW V1.1 — On-Demand Tool Flag Reference Registry (`flow doc tool <name>`)
 *
 * Moves verbose legacy CLI flags out of every-turn `AGENTS.md` (saving ~870-2,600 tokens/turn)
 * into zero-extra-MD code storage queried strictly on demand via `flow doc tool <name>`.
 */

export const TOOL_SPECS = Object.freeze({
  permit: [
    'TOOL|permit (Edit Permit Gate — REQUIRED before edits/bg/ship/finish)',
    'USAGE|flow permit issue [--unit=U] [--ttl=1800] [--elevate-integrator --reason="..."]',
    'USAGE|flow permit status | verify | revoke | install-hooks | selftest',
    'BOUNDARY|Local VM=Class B tripwire; Hard Class C boundary=GitHub Branch Protection + flow-security.yml CI',
  ].join('\n'),

  auto: [
    'TOOL|auto (6 Built-In 14-30 Step Parallel DAG Pipelines)',
    'USAGE|flow auto <bootstrap|research|dev|certify|fabricate|factory|list> [--unit=U] [--target=T] [--visual] [--no-cache] [--dry-run]',
    'NOTES|dev auto-detects git diff (skips pp1.1 unless src/** changed); certify/finish always disable test cache.',
  ].join('\n'),

  macro: [
    'TOOL|macro (Signed AI Self-Registering Macro Registry — SEC-13 governed)',
    'USAGE|flow macro <register|run|list|inspect|verify|suggest|remove|selftest> [name] [--spec=F] [--dry-run]',
    'DELETE_RULE|Only AI-created macros prefixed `ai-` (.flow/macros/ai-*.macro.json) may be removed; core builtins immutable.',
  ].join('\n'),

  security: [
    'TOOL|security (FLOW Security 13-Layer Fortress + 48-Attack Red-Team Oracle + Keyless OIDC/Sigstore + Containment)',
    'USAGE|flow security audit [--full] | selftest | recover [--agent=ID] | sandbox-selftest | attest-status | verify-oidc <file> [--bundle=F]',
    'LAYERS|SEC-01 Secrets+Entropy | SEC-02 Chained Receipt+OIDC/Sigstore+Ed25519 | SEC-03 PI/Bidi/TLX11-Spoof | SEC-04 Sandbox+env-i | SEC-05 Realpath | SEC-06 SupplyChain+.git/config+6-Bins | SEC-07 SAST | SEC-08 AntiCheat+Salami+CoreImmutable | SEC-09 AuditLedger | SEC-10 Permit+Quarantine | SEC-11 Hygiene | SEC-12 48-Attack Oracle | SEC-13 Macro+V11Cert Guard',
  ].join('\n'),

  exam: [
    'TOOL|exam (THE LAST EXAM V1.1 — 12 Pillars / 48 Engines / 1,080 Fixed Tests / 48 Real Solvers / 28 Cross-Locks)',
    'USAGE|flow exec exam setup | setup --verify-only | selftest | cert-status | cert-verify --unit=U | --unit=U | --project=<exam.project.json> | --playground=<f.tlx11.json> | query <id> --status=FAIL | list',
    'MODES|CAD_PROXY (3D showcase units) vs REAL_ARTIFACT (--project=<exam.project.json> real STEP/KiCad/SPICE/RTL; missing artifacts reported honestly).',
    'OUTPUT|Default compact FAIL/WARN/DIFF-only (~70t PASS); pass --verbose for all 48 E| lines; lossless DB at /tmp/tlx_runs/<id>/results.ndjson.',
  ].join('\n'),

  bg: [
    'TOOL|bg (Buchigire Guard Off-VM Git Vault & Durability Gate)',
    'USAGE|flow exec bg <boot|start|snap|seal|status|recover|gate|sync|land|hooks|gc|selftest> [--ai]',
    'RESTRICTED|Bypass flags (--force, --allow-main, --ignore-orphans, --local-only) are blocked by FLOW Security.',
  ].join('\n'),

  pp: [
    'TOOL|pp (PP1.1 Warm Headless Chrome Visual & SSIM Audit)',
    'USAGE|flow exec pp --warm --out=/tmp/flow_ws/pp [--preset=audit|welcome|mobile|playground|tiers|ortho] [--mode=ui|cad|diagram|explanation|full|custom] [--unit=U] [--quality=standard_lite|standard|high|ultra] [--render=solid|xray|cad] [--explode=0..1] [--ortho-pack] [--turntable=N] [--contact-sheet=3] [--diff=DIR] [--json]',
    'CLEANUP|Always stop daemon via `flow park` or `flow exec pp --daemon=stop`. Build `docs/` first.',
  ].join('\n'),

  sokutei: [
    'TOOL|sokutei (10-Domain Rigorous Performance Benchmark Harness)',
    'USAGE|flow exec sokutei --target=build|v2_unit|webgl|pp|validate|catalog|mirai|wlk220|sim_app|bg_bench [--all|--quick|--rigorous] [--units=U] [--runs=N] [--save-baseline=F] [--compare=F] [--assert-speedup=X] [--json]',
  ].join('\n'),

  sp: [
    'TOOL|sp (0.001mm Spatial Engine — Coordinate Assist ONLY, NEVER verification gate)',
    'USAGE|flow exec sp <inspect|map|pockets|sim|ray|thermal-cog|diff|bench|selftest> [--unit=U] [--res=0.5] [--sdf] [--auto-fix] [--ai]',
  ].join('\n'),

  dx: [
    'TOOL|dx (AST Code Atlas, Semantic Search & Micro-DSL Surgical Reader)',
    'USAGE|flow exec dx <atlas|find|brief|read|slice|diff|part|cad|svg|schematic|preflight|checkpoint|resume|audit|selftest> [--ai] [--budget=N]',
  ].join('\n'),

  cache: [
    'TOOL|cache (Content-Hash Subsystem Test Cache & Parallel Runner)',
    'USAGE|flow cache status | flow cache clear | flow verify [--parallel] [--cached] [--no-cache]',
    'GUARD|Cache is strictly disabled on `flow finish`, `V1.1証明` engraving, `flow ship --full-exam`, and `--no-cache`.',
  ].join('\n'),
});

export function getToolSpec(name) {
  const key = String(name || 'list').toLowerCase().trim();
  if (key === 'list' || key === 'all') {
    return {
      ok: true,
      name: 'list',
      text: `TOOLS|available=${Object.keys(TOOL_SPECS).join(',')}|usage=flow doc tool <name>`,
    };
  }
  if (TOOL_SPECS[key]) {
    return { ok: true, name: key, text: TOOL_SPECS[key] };
  }
  return {
    ok: false,
    name: key,
    text: `TOOL_ERR|unknown=${key}|available=${Object.keys(TOOL_SPECS).join(',')}`,
  };
}
