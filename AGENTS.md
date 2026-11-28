# @FLOW_BOOK 1: ENV_OS (FLOW-V1.1-OS | FLOW-SPEC/v1.1 | adapter=sony_a7iv_cad)
<!-- @FLOW_AUTO:ENV_HEADER -->
FLOW-V1.1-OS 1.1.0 | modes=23(21+2) | parts=2937/3473 | EXAM=12p/48e/1080t/48sv/28x | PLYA=24s | AUTO=6
<!-- /@FLOW_AUTO:ENV_HEADER -->
> AI_ONLY | BOOKS=2(AGENTS.md,README.md) | `flow`=`npm run flow --` | CFG=`.flowrc.json` | FLAGS:`flow doc tool <name>`
> EXIT: 0=PASS 1=ERR 2=BLOCK/DRIFT 3=WARN/ORPHAN 4=XFAIL 5=NO_SOLVER 6=SEC_BLOCK

## @IRON_LAWS
- I00 NO_INFRA_DIVE (BLACK-BOX INFRA): `scripts/flow_os/*`, `scripts/exam/*`, `scripts/buchigire_guard/*`, `scripts/spatial_engine/*`, `src/core/*`, `.github/workflows/*` are PRE-VERIFIED BLACK-BOX INFRA. NEVER read their source during `/plan`, unit coding, OR EXAM FAIL debugging unless explicitly asked to modify OS/EXAM internals! Cold-start = Book 1 + Book 2 (`README.md`) + `npm run flow -- status --raw` (<150ms). Debug EXAM FAILs ONLY via `flow exec exam query <id> --status=FAIL`, `flow inspect <id> --defect --unit=<U>`, and Book 2 (`@EXAM_DEBUG_PLAYBOOK` + `@EXAM_IR_FLAGS_AND_MATERIAL_DB`). NEVER run 21-unit `sp audit` loops in `/plan`.
- I01 BOOT: Start with `flow status --raw` then `flow wake [--brief]` or `flow auto bootstrap` (default=`worker`). Exit 3->`flow exec bg recover --mode=three-way`.
- I02 PERMIT: Zero dirty edits on `main`. Issue `flow permit issue --unit=<U>` first; integrator needs `--elevate-integrator --reason="<6+>"`.
- I03 SEAL: Checkpoint 10-15m (`flow park --checkpoint`); before wait/turn-end run `flow park --next="..." --artifacts=<DIR>` (seal+Chrome stop+spill purge).
- I04 EXAM: Physics/CAD/FEA/CFD/EDA/EMC/optics/control/boot/SI/ESD/tribology/formal/BOM/visual claims MUST pass unskipped EXAM V1.1 (`flow ship --full-exam`/`flow auto certify`). `CAD_PROXY`!=physical validation; real artifacts use `--project=<exam.project.json>`.
- I05 SOLVER_48: Fresh VM/exit 5->`flow exec exam setup` (warm `<5s`; 48/48+6 C++17). Zero skip/fallback.
- I06 ANTI_CHEAT: Never relax thresholds, omit engines, delete core files/tests/macros, accumulate Salami drift, shrink vol >5%, or forge `V1.1証明`. Core edits need `flow exec exam selftest`(111/111)+`flow selftest`.
- I07 RECEIPT: Claim done ONLY with uncached `flow finish --policy=worker|integrator` + **`FLOW-RECEIPT`** (`BG-RECEIPT`+`TLX11-RECEIPT`+`SEC-RECEIPT`+`CI_ATTESTED|LOCAL_UNATTESTED`).
- I08 AUTO_FIRST: Prefer `flow status`, `flow auto`, `flow verify --parallel`, `flow heal --unit=<U> --apply` (0-tok), `flow macro`. Tier-B: `flow inspect <id> --defect --unit=<U>`.
- I09 HUMAN_LOCK: `flow human-report` is `HUMAN_REQUEST_ONLY`. NEVER invoke autonomously or in macros (`SEC-13` EXIT 6).
- I10 ZERO_WASTE: Never full-read giant `data/*.json`, `assemblies/*Parts.ts`, or `docs/`. Use `flow status`, `flow auto research`, `flow inspect`, `pose.tsv`, `flow slice`, `flow doc section 2 <@TAG>`, `flow doc tool <name>`.
- I11 SSOT: Run `flow doc sync` on metric/health edits (`flow doc audit --strict` fails `EXIT 2` on drift). Captures/reports ONLY in `/tmp/...` or `<ARTIFACT_DIR>`.

## @COMMANDS (`flow <cmd>` | Flags: `flow doc tool <status|exam|bg|pp|sokutei|sp|dx|permit|auto|macro|security|cache>`)
- `flow status [--unit=U] [--refresh-health] [--raw]` (<300ms, <=450t): Git/Permit/OIDC/Sandbox/Books + VM(CPU/RAM/Disk/Chrome/48sv/Cache) + Cert/DAG + 21u health (`catalog/UNIT_HEALTH.tsv`).
- `flow auto <bootstrap|research|dev|certify|fabricate|factory|list>` (<=550t) | `flow permit <issue|status|verify|revoke|install-hooks|selftest>` | `flow wake [slug] [--unit=U] [--brief]`.
- `flow inspect <t> [--defect]` | `flow heal --unit=<U> [--apply|--bake]` | `flow verify [--parallel] [--cached|--no-cache] [--suite=build|selftest|all]` (cache OFF on `finish`/`ship`/`V1.1証明`) | `flow cache <status|clear>`.
- `flow ship --unit=<U> [--policy=P] [--full-exam] [--visual]` | `flow park [--checkpoint|--next=N]` | `flow finish [--policy=P] [--pr|--merge]`.
- `flow macro <register|run|list|inspect|verify|suggest|remove|selftest>` | `flow cert <status|verify|selftest>` | `flow swarm <plan|status|selftest>`.
- `flow security <audit [--full]|selftest|recover|sandbox-selftest|attest-status|verify-oidc>` | `flow doc <audit --strict|sync|tool <n>|section <1|2> <TAG>>` | `flow slice` | `flow exec <t>` | `flow human-report` | `flow selftest`.

## @CONTRACTS_QUICKREF (ZERO-SOURCE-LOOKUP SPECS)
- Permit (`SEC-10`): Default `worker` (ONLY `src/units/<U>.{ts,pose.tsv}`, `src/data/<U>.json`, `src/assemblies/<U>/**`; protected: `src/core/**`, `src/ui/**`, `catalog/**`, `docs/**`, `scripts/exam/**`, `scripts/flow_os/**`; TTL `1800s`; `main` forbidden). `integrator` needs `--elevate-integrator --reason="<6+>"`. Breach -> `EXIT 6` + quarantine (`flow security recover`).
- `SEC-08` Limits: Shift `<=3.0mm` (chassis `<=0.6mm`), vol delta `<=5.0%` (Salami baseline guard), 0 part deletion. `core_immutable_manifest.json` locks 48e/`T001..T1080`/28x/6 DAGs/core files (ONLY `ai-*` macros & `scripts/exam/custom/ai_*.mjs` deletable).
- `flow heal`: 0-LLM-tok SciPy HiGHS LP + EX-DELTA (`<40ms`) fixes Tier-A (4-tier clash, float/seat, SMT, explode, cones) -> `src/units/<U>.pose.tsv` + `flow_poses.gen.ts` (`--bake` -> TS; integrator auto-syncs `UNIT_HEALTH.tsv` + `doc sync`). Tier-B (`>3.0mm`, containment, non-manifold, mat/galvanic/thermal/meta) -> `<=250 tok` surgical capsules.
- `flow auto` (6 DAGs): `bootstrap`(16s, uncached, 48sv+all selftests) | `research`(14s, RO) | `dev`(18s, diff-aware, `pp` only if `src/**`) | `certify`(24s, uncached, snap->heal->build->EXAM 1080t->`V1.1証明`->finish) | `fabricate`(22s, new unit) | `factory`(30s, multi-unit parallel).
- Sandbox/OIDC/CI: 2ms UserNS/NetNS (`lo`-only, 0 egress, `NoNewPrivs=1`, `prlimit`, `env -i`) + 1-container Docker `:ro`; GitHub Actions `FLOW Security Gate` keyless OIDC+Sigstore (Fulcio+Rekor, 0 static keys, opt Ed25519).

## @SECURITY_AND_V2 (SEC-01..SEC-13 | 48 ATTACKS | EXIT 6)
- `SEC-01` Secrets/Entropy | `SEC-02` `FLOW-RECEIPT`+Closure+OIDC/Sigstore+Ed25519 | `SEC-03` PI/Bidi/Spoof | `SEC-04` `shell:false`+`env -i`+Sandbox | `SEC-05` Realpath | `SEC-06` Lockfile+`.git/config`+6-Bin SHA | `SEC-07` SAST | `SEC-08` AntiCheat+Salami+CoreLock | `SEC-09` Ledger | `SEC-10` Permit+Quarantine | `SEC-11` Hygiene | `SEC-12` 48-Attack Oracle | `SEC-13` Macro+`V1.1証明`.
- Parallel: `FLOW_AGENT_ID`->`/tmp/flow_ws/<id>/`. V2: G=`pose.tsv`, M=`assemblies/<U>/*.ts` (`ResourceCache` 38 buckets, Instanced/Batched, 0-GC, `JSON==3D`), L=1-line `data/<U>.json`. Protected: `reports/fh_mirai_2028/*.md`, `blueprints/riimos_e1/`.
