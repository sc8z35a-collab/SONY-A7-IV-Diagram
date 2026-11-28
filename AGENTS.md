# @FLOW_BOOK 1: ENV_OS (FLOW-V1-OS 1.0.0 | FLOW-SPEC/v1 | adapter=sony_a7iv_cad)
> AUDIENCE=AI_AGENTS_ONLY | BOOKS=2(AGENTS.md,README.md) | ALIAS:`flow`=`npm run flow --`=`node scripts/flow_os/flow.mjs` | CFG=`.flowrc.json`
> EXIT: 0=PASS 1=ERR 2=BLOCK/DEFECT/LEASE 3=WARN/ORPHAN 4=XSOLVER_MISMATCH 5=SOLVER_MISSING 6=SEC_BLOCK

## @IRON_LAWS (ZERO_EXCEPTIONS)
- I01 BOOT: Start EVERY session with `flow wake`. If exit 3 (orphan vault), run `npm run bg -- recover --mode=three-way --with-artifacts` before editing.
- I02 BRANCH: Never hold dirty edits on `main`; branch via `flow wake <slug> --unit=<U> --role=worker|integrator --goal="..."`.
- I03 SAVE: Checkpoint off-VM every 10-15 min via `flow park --checkpoint --artifacts=<DIR>`.
- I04 SEAL: Before user wait/question/turn-end, MUST run `flow park --next="..." --artifacts=<DIR>` (verifies remote OID + stops isolated Chrome).
- I05 EXAM_SOLE_GATE: ALL CAD/physics/FEA/CFD/SPICE/KiCad/EMC/optics/formal/BOM/visual verification MUST pass full unskipped `scripts/exam.mjs` (10 pillars, 36 engines, 530 tests, 4 tiers, 16/16 cross-locks, Chrome pp1.1+OpenCV). Standalone `sp`/`validate_parts`/ad-hoc checks NEVER authorize a verified claim.
- I06 SOLVER_32: On fresh VM or exit 5, MUST run `node scripts/exam.mjs setup` (16 toolchains 32/32 READY + 4 C++17 harnesses). No skipping/fallback.
- I07 ANTI_CHEAT: Never relax EXAM thresholds, omit engines at sign-off, delete parts, or shrink volume >5%. Edits in `scripts/exam/**` or `scripts/flow_os/**` require `node scripts/exam.mjs selftest` (75/75) + `flow security selftest` (30/30).
- I08 CHAINED_RECEIPT: Never claim done without `flow finish --policy=worker|integrator` and quoting **`FLOW-RECEIPT`** (binding fresh `BG-RECEIPT` + `TLX1-RECEIPT` + `SEC-RECEIPT` to Tree-SHA & Kernel-SHA).
- I09 NO_MANUAL_EXAM_LOOP: Legacy manual 1-by-1 EXAM reading/guessing loops are ABOLISHED. Run `flow heal --unit=<U> --apply` first (0-LLM-tok coupled solver fixes 85-95%), then inspect ONLY remaining Tier-B items via `flow inspect <partId> --defect --unit=<U>`.
- I10 HUMAN_CMD_LOCK: `flow human-report` is `HUMAN_REQUEST_ONLY`. AI MUST NEVER invoke autonomously; run ONLY on explicit human request for live stats, then hand the saved `.md` to the human.
- I11 ZERO_PROSE_WASTE: Never full-read giant `src/data/*.json`, `src/assemblies/*Parts.ts`, or `docs/`. Use `flow inspect`, Layer G `pose.tsv`, `dx read`, `flow slice`, `flow doc section 2 <@TAG>`.
- I12 HYGIENE: Write captures/reports/benchmarks only under `/tmp/...` or `<ARTIFACT_DIR>`. Zero root images/junk. Stop warm Chrome daemon on finish.

## @SUPER_COMMANDS (`flow <cmd>`)
- `flow wake [slug] [--unit=U] [--role=worker|integrator] [--goal=G] [--ignore-orphans]` (<=220t): bg boot+start+lease+`FLOW_AGENT_WS`+solver probe+atlas+brief.
- `flow inspect <unit|partId|file#Sym|query> [--defect --unit=U] [--budget=N]` (<=300t): brief, 1-line JSON part, AST symbol, search, or <=250t Tier-B defect capsule.
- `flow heal --unit=<U> [--apply] [--max-iter=25] [--bake]` | `flow heal selftest` (<=400t): full-defect clusterer + 0-LLM-tok FCL/SP_F64/Z3/QP/EX-DELTA solver -> `pose.tsv` + Tier-B capsules.
- `flow ship --unit=<U> [--policy=P] [--full-exam] [--visual] [--artifacts=D]` (<=350t): catalog+atlas+tsc+validate+build+FULL EXAM V1 (`TLX1-RECEIPT`)+pp1.1+bg snap.
- `flow park [--checkpoint] [--next=N] [--artifacts=DIR]` (<=150t): stop isolated pp+dx checkpoint+bg seal+lease heartbeat.
- `flow finish [--policy=P] [--unit=U] [--require-exam] [--pr] [--merge] [--title=T]` (<=200t): 12-layer security+receipt freshness+bg gate+`FLOW-RECEIPT`+PR/merge+lease release.
- `flow swarm <plan|status|selftest> [--units=active|all|u1,u2] [--workers=N]` (<=300t): LPT worker sharding, lease/quarantine monitor, parallel selftest.
- `flow exec <exam|bg|pp|sokutei|sp|dx> [args...]` (<=400t): SEC-04 sandboxed passthrough + FLOW-BUDGET spill.
- `flow human-report [--out=PATH] [--artifacts=DIR]` (`HUMAN_REQUEST_ONLY`): live zero-cache LOC/projects/all-23-unit parts/storage/token MD in `/tmp/flow_reports/`.
- `flow security <audit [--full]|selftest>` (<=350t): 11-layer audit (`SEC-RECEIPT`) or 30-attack Red-Team oracle (`SEC-12`).
- `flow doc <audit --strict | section <1|2> <TAG|toc>>` (<=250t): strict 2-book verifier / section reader.
- `flow slice <path> <start>-<end>`: SEC-05 confined line reader.
- `flow export-template --out=<DIR>` / `node scripts/flow_os/flow.mjs init`: 30-sec generic OS deploy to any Git repo.

## @HEAL_PROTOCOL
1. `flow heal --unit=<U> --apply`: extracts ALL defects (FCL, 4-tier SP_F64, CGAL, thermal, cones, galvanic, BOM), clusters root causes, runs local weighted QP+Z3+EX-DELTA 40ms BVH (4-tier clash=0 >=0.008mm, seat <=0.055mm, fastener >=2 contacts, TIM/EMI <=0.035mm, cone 0% occlusion, explode CCD=0), enforces SEC-08 bounds (shift<=3mm, chassis<=0.6mm, vol<=5%, 0 deletions), writes `src/units/<U>.pose.tsv` (optional `--bake`).
2. Fix ONLY remaining Tier-B shape items via `flow inspect <partId> --defect --unit=<U>` (AABB, clash vec, ASCII slice, 15-line stripped AST).
3. Final gate: `flow ship --unit=<U> --policy=integrator --full-exam` -> `TLX1-RECEIPT` (530/530, X16/16).

## @PARALLEL_KERNEL
- Unique `FLOW_AGENT_ID=<id>` per agent -> isolated `/tmp/flow_ws/<id>/` (`FLOW_PP_DAEMON_DIR`, `FLOW_TLX_RUNS_DIR`, `FLOW_SP_CACHE_DIR`), 0% Chrome/cache collision.
- `flow wake --unit=<U> --role=worker` claims atomic `unit:<U>` lease (TTL 1800s; clash -> exit 2).
- Worker writes ONLY `src/units/<U>.ts`, `src/units/<U>.pose.tsv`, `src/data/<U>.json`, `src/assemblies/<U>/**`. Touching `registry.ts`, `types.ts`, `src/core/**`, `src/ui/**`, `catalog/**`, `docs/**`, `scripts/exam/**`, `scripts/flow_os/**` triggers `EXIT 6 (SEC-10)` + auto-quarantine.

## @SECURITY_FORTRESS (SEC-01..SEC-12 | EXIT 6)
- SEC-01 Secrets + Shannon Entropy (>=4.65) + `.env`/VM-token block + stdout redaction.
- SEC-02 Chained `FLOW-RECEIPT` (Tree-SHA + Kernel-SHA + `BG-RECEIPT` + `TLX1-RECEIPT` + `SEC-RECEIPT`).
- SEC-03 Prompt-Injection + Trojan Source Bidi (`U+202A..202E,U+2066..2069`) + Zero-Width Stego + ANSI OSC-52 + Spoofed Receipt block.
- SEC-04 Command Sandbox (`shell:false`) blocking `rm -rf /`, `git push --force main`, `curl|sh`, `chmod 777`, `git reset --hard`, `.git/hooks`.
- SEC-05 `realpathSync` Path Confinement & Symlink Escape blocker.
- SEC-06 Supply-Chain Lockfile SHA-512, suspicious npm lifecycle & C++17 native binary SHA-256 check.
- SEC-07 Multi-Lang SAST (`eval`, `new Function`, prototype pollution, template `exec`, Python `pickle`/`yaml.load`/`shell=True`).
- SEC-08 Anti-Cheat Guard (blocks EXAM threshold tamper, part deletion/shrinkage, excess heal shift).
- SEC-09 SHA-256 Hash-Chained Audit Ledger (`.git/flow_os/flow_audit.jsonl`).
- SEC-10 Parallel Worker Scope & Blast-Radius Auto-Quarantine.
- SEC-11 Hygiene Firewall (root junk `*.png`/`tmp_*`/`=`, >25MB bloat, conflict markers, malformed JSON).
- SEC-12 30-Attack Red-Team Oracle (`flow security selftest` -> 30/30 PASS).

## @LEGACY_TOOLS_COOKBOOK
- EXAM (`scripts/exam.mjs`, `npm run exam|tlx|sim20`): `setup`, `setup --verify-only`, `selftest` (75/75), `--unit=<U>`, `--all-units`, `--playground=<f>`, inner `--only=EX..`/`--pillar=P..`/`--resume=<id>`/`query <id> --status=FAIL`/`list`. Wire: `TLX1|..|rcpt=TLX1-RECEIPT:..`, `F|..|fix=SHIFT/RESIZE/THERM/ISOLATE/ROUTE/META|src=f:l`, `X_SUM|ok=16/16`.
- BG (`scripts/bg.mjs`, `npm run bg --`): `boot|start|snap|seal|watch|recover --mode=inspect|worktree|three-way|gate --policy=P --run-checks --require-checks|record-check|guard-exec|sync|land|status|hooks|gc|selftest` (20/20, `--ai`).
- PP1.1 (`scripts/pp.mjs`, `npm run pp --`): `--out=/tmp/...`, end `--daemon=stop`, build `docs/` first. Presets `audit|welcome|mobile|playground|tiers|ortho`; modes `ui|cad|diagram|explanation|full|custom`; flags `--warm --unit=U --quality=standard_lite|standard|high|ultra --render=solid|xray|cad --explode=0..1 --cam=.. --az --el --fov --zoom --roll --pan --cam-pos --cam-target --fit-part --fit-parts --section=x:0.52 --clip-plane --turntable=N --ortho-pack --explode-sweep --ssaa=2 --annotate=8 --contact-sheet=3 --diff=<dir> --fast --json --list-units --list-parts=U`.
- SOKUTEI (`scripts/sokutei.mjs`, `npm run sokutei --`): 10 domains `build,v2_unit,webgl,pp,validate,catalog,mirai,wlk220,sim_app,bg_bench`; `--all --quick --rigorous --target=D --units=U --tiers=T --runs=N --warmup=M --save-baseline=F --compare=F --assert-speedup=X --cmd=C --out=F --md=F --json --list`.
- SP (`scripts/sp.mjs`, `npm run sp --`): coord assist ONLY (NOT gate): `inspect|map --res=0.5 [--sdf]|pockets --fit=W,H,D --inside=ID --emit-ts|sim --candidates=F --auto-fix --ray=..|ray|thermal-cog|diff|bench|selftest` (20/20).
- DX (`scripts/dx.mjs`, `node scripts/dx.mjs`): `atlas|find|brief|read|slice|diff|tx|run|part|cad|svg|schematic|preflight|check|checkpoint|resume|audit|budget|selftest` (22/22).
- BUILD: `npm run catalog && npx tsc --noEmit && node scripts/validate_parts.mjs && npm run build` (in `flow ship`); `npm run mirai:content`; `npm run cap:sync`; `npm run android:apk`.

## @V2_CODE_AND_RECOVERY
- 3-Layer Code: Layer G `src/units/<U>.pose.tsv`; Layer M pure geom `src/assemblies/<U>/*.ts`+`cad_primitives.ts`+slim `types.ts`; Layer L 1-line JSON `src/data/<U>.json`.
- V2 Rules: `ResourceCache` 38 buckets ONLY (`new THREE.Mesh*Material`=0), `InstancedMesh`/`BatchedMesh`, `matrixAutoUpdate=false`, 0-GC, Solid <=100dc, full dispose, `JSON==3D`.
- Protected App Assets (NEVER delete): `reports/fh_mirai_2028/*.md`, `blueprints/riimos_e1/`.
- Errors: EXIT 2->`flow heal`/gate; EXIT 3->`bg recover --mode=three-way`; EXIT 4->check `X|`; EXIT 5->`exam.mjs setup`; EXIT 6->`SEC_FAIL`/quarantine.
