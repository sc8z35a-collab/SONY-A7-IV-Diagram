# @FLOW_BOOK 1: ENV_OS (FLOW-V1.1-OS 1.1.0 | FLOW-SPEC/v1.1 | adapter=sony_a7iv_cad)
> AUDIENCE=AI_AGENTS_ONLY | BOOKS=2(AGENTS.md,README.md) | ALIAS:`flow`=`npm run flow --`=`node scripts/flow_os/flow.mjs` | CFG=`.flowrc.json`
> EXIT: 0=PASS 1=ERR 2=BLOCK/DEFECT/LEASE 3=WARN/ORPHAN 4=XSOLVER_MISMATCH 5=SOLVER_MISSING 6=SEC_BLOCK

## @IRON_LAWS (ZERO_EXCEPTIONS)
- I01 BOOT: Start EVERY session with `flow wake` (or `flow auto bootstrap`). Exit 3 (orphan vault) -> `npm run bg -- recover --mode=three-way --with-artifacts`.
- I02 BRANCH: Never hold dirty edits on `main`; branch via `flow wake <slug> --unit=<U> --role=worker|integrator --goal="..."`.
- I03 SAVE: Checkpoint off-VM every 10-15 min via `flow park --checkpoint --artifacts=<DIR>`.
- I04 SEAL: Before user wait/question/turn-end, MUST run `flow park --next="..." --artifacts=<DIR>` (verifies remote OID + stops Chrome).
- I05 EXAM_V11_SOLE_GATE: ALL CAD/physics/FEA/CFD/SPICE/KiCad/EMC/optics/control/boot/SI/ESD/tribology/formal/BOM/visual claims MUST pass full unskipped `scripts/exam.mjs` (THE LAST EXAM V1.1: 12 pillars, 48 engines, 1,080 tests `T001..T1080`, 4 tiers, 48 solvers, 28/28 cross-locks `X01..X28`, Chrome pp1.1+OpenCV). Standalone `sp`/`validate_parts` NEVER authorize verified claims.
- I06 SOLVER_48: On fresh VM or exit 5, run `node scripts/exam.mjs setup` (48/48 solvers + 6 C++17 harnesses). Zero skip/fallback.
- I07 ANTI_CHEAT_AND_SEAL: Never relax EXAM thresholds, omit engines, delete parts, shrink volume >5%, or forge `V1.1証明`. Edits in `scripts/exam/**` or `scripts/flow_os/**` require `node scripts/exam.mjs selftest` (111/111) + `flow selftest` (sec13=36/36, swarm=8/8, macro=12/12, books=2/2).
- I08 CHAINED_RECEIPT: Never claim done without `flow finish --policy=worker|integrator` and quoting **`FLOW-RECEIPT`** (binding fresh `BG-RECEIPT`+`TLX11-RECEIPT`+`SEC-RECEIPT` to Tree-SHA & Kernel-SHA).
- I09 HYPER_AUTO_FIRST: Abolish 1-cmd manual loops. Run `flow auto <bootstrap|research|dev|certify|fabricate|factory>` (14-30+ step parallel DAGs), `flow heal --unit=<U> --apply` (0-LLM-tok solver), or `flow macro register`. Inspect ONLY remaining Tier-B items via `flow inspect <partId> --defect --unit=<U>`.
- I10 HUMAN_CMD_LOCK: `flow human-report` is `HUMAN_REQUEST_ONLY`. NEVER invoke autonomously OR inside macros (`SEC-13` EXIT 6). Run ONLY on explicit human request, then hand the saved `.md` to human.
- I11 ZERO_PROSE_WASTE: Never full-read giant `src/data/*.json`, `src/assemblies/*Parts.ts`, or `docs/`. Use `flow auto research`, `flow inspect`, Layer G `pose.tsv`, `dx read`, `flow slice`, `flow doc section 2 <@TAG>`.
- I12 HYGIENE: Write captures/reports only under `/tmp/...` or `<ARTIFACT_DIR>`. Zero root junk. Stop Chrome daemon on finish.

## @SUPER_COMMANDS (`flow <cmd>`)
- `flow auto <bootstrap|research|dev|certify|fabricate|factory|list> [--unit=U] [--target=T] [--dry-run]` (<=550t): 1-cmd parallel DAGs (`bootstrap` 16s, `research` 14s read-only dossier, `dev` 18s, `certify` 24s V1.1証明 campaign, `fabricate` 22s, `factory` 30s multi-unit swarm).
- `flow macro <register|run|list|inspect|verify|suggest|remove|selftest> [name] [--spec=F] [--dry-run]` (<=400t): signed AI macro registry (`.flow/macros/*.macro.json`, SHA-256, `SEC-13` `shell:false`, <=40 steps acyclic) + 0-tok ledger miner (`suggest`).
- `flow cert <status|verify|selftest> [--unit=U]` (<=300t): inspect/verify/selftest cryptographic `V1.1証明` (0.0001mm 3D SHA-256 + instant auto-revocation).
- `flow wake [slug] [--unit=U] [--role=worker|integrator] [--goal=G] [--ignore-orphans]` (<=220t): bg boot+start+lease+`FLOW_AGENT_WS`+48-solver probe+atlas+brief.
- `flow inspect <unit|partId|file#Sym|query> [--defect --unit=U] [--budget=N]` (<=300t): brief, 1-line JSON, AST symbol, search, or <=250t Tier-B defect capsule.
- `flow heal --unit=<U> [--apply] [--max-iter=25] [--bake]` | `flow heal selftest` (<=400t): 0-LLM-tok FCL/SP_F64/Z3/QP/EX-DELTA coupled solver -> `pose.tsv` + Tier-B capsules.
- `flow ship --unit=<U> [--policy=P] [--full-exam] [--visual] [--artifacts=D]` (<=350t): catalog+atlas+tsc+validate+build+FULL EXAM V1.1 (`TLX11-RECEIPT`+`V1.1証明`)+pp1.1+bg snap.
- `flow park [--checkpoint] [--next=N] [--artifacts=DIR]` (<=150t): stop Chrome+dx checkpoint+bg seal+lease heartbeat.
- `flow finish [--policy=P] [--unit=U] [--require-exam] [--pr] [--merge] [--title=T]` (<=200t): 13-layer security+receipt freshness+bg gate+`FLOW-RECEIPT`+PR/merge+lease release.
- `flow swarm <plan|status|selftest> [--units=active|all|u1,u2] [--workers=N]` (<=300t): LPT sharding, lease/quarantine monitor, parallel selftest.
- `flow exec <exam|bg|pp|sokutei|sp|dx> [args...]` (<=400t): SEC-04 sandboxed passthrough + FLOW-BUDGET spill.
- `flow human-report [--out=PATH] [--artifacts=DIR]` (`HUMAN_REQUEST_ONLY`): live zero-cache LOC/projects/all-23-unit parts/storage/token MD in `/tmp/flow_reports/`.
- `flow security <audit [--full]|selftest>` (<=350t): 13-layer audit (`SEC-RECEIPT`) or 36-attack Red-Team oracle (`SEC-12`).
- `flow doc <audit --strict | section <1|2> <TAG|toc>>` (<=250t): strict 2-book verifier / section reader.
- `flow slice <path> <start>-<end>`: SEC-05 confined line reader.
- `flow export-template --out=<DIR>` / `flow init` / `flow selftest`: 30-sec portable OS deploy & full self-proof.

## @V11_CERT_AND_HEAL_PROTOCOL
- **`V1.1証明` Seal**: Auto-engraved ONLY on 100.0000% PASS (`48/48` engines, `1,080/1,080` tests, `0` FAIL/WARN/ERR/SKIP, `28/28` locks, `48/48` solvers). Binds 0.0001mm canonical 3D SHA-256 + 4 tiers + EXAM kernel SHA -> `verification/certificates/<U>.v1_1.cert.json` & `src/units/v1_1_certificates.gen.ts`. ANY 0.0001mm/1-vertex/material/spec/kernel drift IMMEDIATELY revokes the seal (CLI, 3D Viewer HUD, Playground, `SEC-13`); re-engraving requires fresh 100% PASS.
- **Auto Certify**: `flow auto certify --unit=<U>` (or `flow heal --unit=<U> --apply` -> Tier-B `flow inspect <id> --defect` -> `flow ship --unit=<U> --policy=integrator --full-exam`).

## @PARALLEL_KERNEL
- Unique `FLOW_AGENT_ID=<id>` -> isolated `/tmp/flow_ws/<id>/` (`FLOW_PP_DAEMON_DIR`, `FLOW_TLX_RUNS_DIR`, `FLOW_SP_CACHE_DIR`), 0% Chrome/cache collision.
- `flow wake --unit=<U> --role=worker` claims atomic `unit:<U>` lease (TTL 1800s; clash -> exit 2).
- Worker writes ONLY `src/units/<U>.ts`, `src/units/<U>.pose.tsv`, `src/data/<U>.json`, `src/assemblies/<U>/**`. Touching `registry.ts`, `types.ts`, `src/core/**`, `src/ui/**`, `catalog/**`, `docs/**`, `scripts/exam/**`, `scripts/flow_os/**` triggers `EXIT 6 (SEC-10)` + auto-quarantine.

## @SECURITY_FORTRESS (SEC-01..SEC-13 | 36 ATTACKS | EXIT 6)
- SEC-01 Secrets+Entropy(>=4.65)+`.env`/VM-token block+redact | SEC-02 Chained `FLOW-RECEIPT`+Kernel-SHA
- SEC-03 Prompt-Injection+Bidi+Zero-Width+OSC-52+Spoofed Receipt | SEC-04 Sandbox(`shell:false`): blocks `rm -rf /`, `git push --force`, `curl|sh`, `chmod 777`, `git reset --hard`, `.git/hooks`
- SEC-05 `realpathSync` Path Confinement+Symlink Escape | SEC-06 Lockfile SHA-512+npm lifecycle+C++17 binary SHA-256
- SEC-07 Multi-Lang SAST(`eval`/`new Function`/proto/`pickle`/`yaml.load`/`shell=True`) | SEC-08 Anti-Cheat(EXAM tamper/delete/shrink/excess shift)
- SEC-09 SHA-256 Hash-Chained Audit Ledger(`.git/flow_os/flow_audit.jsonl`) | SEC-10 Worker Scope+Auto-Quarantine
- SEC-11 Hygiene(root junk/bloat>25MB/conflicts/bad JSON) | SEC-12 36-Attack Red-Team Oracle(`flow security selftest`->36/36)
- SEC-13 Macro Governance & `V1.1証明` Guard(allowlisted `shell:false`, forbids `--skip-*` & `human-report`, SHA-256 signed `.flow/macros/*.macro.json`, acyclic `<=40` steps, blocks forged `.v1_1.cert.json`).

## @LEGACY_TOOLS_COOKBOOK
- EXAM V1.1 (`scripts/exam.mjs`, `npm run exam|tlx|sim20`): `setup` (48/48+6 C++17), `setup --verify-only`, `selftest` (111/111), `cert-status`, `cert-verify --unit=U`, `--unit=U`, `--all-units`, `--playground=f.tlx11.json`, `--only=EX..`/`--pillar=P..`/`--resume=id`/`query id --status=FAIL`/`list`. Wire: `TLX11|..|rcpt=TLX11-RECEIPT:..`, `V11_CERT|..`, `X_SUM|ok=28/28`.
- BG (`scripts/bg.mjs`, `npm run bg --`): `boot|start|snap|seal|watch|recover --mode=inspect|worktree|three-way|gate --policy=P --run-checks --require-checks|record-check|guard-exec|sync|land|status|hooks|gc|selftest` (20/20, `--ai`).
- PP1.1 (`scripts/pp.mjs`, `npm run pp --`): `--out=/tmp/...`, end `--daemon=stop`, build `docs/` first. Presets `audit|welcome|mobile|playground|tiers|ortho`; modes `ui|cad|diagram|explanation|full|custom`; flags `--warm --unit=U --quality=standard_lite|standard|high|ultra --render=solid|xray|cad --explode=0..1 --cam --az --el --fov --zoom --roll --pan --fit-part --section --turntable=N --ortho-pack --explode-sweep --ssaa=2 --annotate=8 --contact-sheet=3 --diff=D --fast --json`.
- SOKUTEI (`scripts/sokutei.mjs`, `npm run sokutei --`): 10 domains `build,v2_unit,webgl,pp,validate,catalog,mirai,wlk220,sim_app,bg_bench`; `--all --quick --rigorous --target=D --units=U --runs=N --save-baseline=F --compare=F --assert-speedup=X --json`.
- SP (`scripts/sp.mjs`, `npm run sp --`): coord assist ONLY: `inspect|map --res=0.5 [--sdf]|pockets --fit=W,H,D --inside=ID|sim --candidates=F --auto-fix|ray|thermal-cog|diff|bench|selftest` (20/20).
- DX (`scripts/dx.mjs`, `node scripts/dx.mjs`): `atlas|find|brief|read|slice|diff|tx|run|part|cad|svg|schematic|preflight|check|checkpoint|resume|audit|budget|selftest` (22/22).
- BUILD: `npm run catalog && npx tsc --noEmit && node scripts/validate_parts.mjs && npm run build`; `npm run mirai:content`; `npm run cap:sync`; `npm run android:apk`.

## @V2_CODE_AND_RECOVERY
- 3-Layer Code: Layer G `src/units/<U>.pose.tsv`; Layer M `src/assemblies/<U>/*.ts`+`cad_primitives.ts`+slim `types.ts`; Layer L 1-line JSON `src/data/<U>.json`.
- V2 Rules: `ResourceCache` 38 buckets ONLY (`new THREE.Mesh*Material`=0), `InstancedMesh`/`BatchedMesh`, `matrixAutoUpdate=false`, 0-GC, Solid <=100dc, full dispose, `JSON==3D`.
- Protected Assets (NEVER delete): `reports/fh_mirai_2028/*.md`, `blueprints/riimos_e1/`.
- Errors: EXIT 2->`flow heal`/gate; EXIT 3->`bg recover --mode=three-way`; EXIT 4->check `X|`; EXIT 5->`exam.mjs setup`; EXIT 6->`SEC_FAIL`/quarantine.
