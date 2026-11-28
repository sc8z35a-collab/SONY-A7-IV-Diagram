# @FLOW_BOOK 1: ENV_OS (FLOW-V1.1-OS | FLOW-SPEC/v1.1 | adapter=sony_a7iv_cad)
<!-- @FLOW_AUTO:ENV_HEADER -->
FLOW-V1.1-OS 1.1.0 | modes=23(21+2) | parts=2937/3473 | EXAM=12p/48e/1080t/48sv/28x | PLYA=24s | AUTO=6
<!-- /@FLOW_AUTO:ENV_HEADER -->
> AI_ONLY | BOOKS=2(AGENTS.md,README.md) | `flow`=`npm run flow --` | CFG=`.flowrc.json` | FLAGS:`flow doc tool <name>`
> EXIT: 0=PASS 1=ERR 2=BLOCK/DRIFT 3=WARN/ORPHAN 4=XFAIL 5=NO_SOLVER 6=SEC_BLOCK

## @IRON_LAWS
- I01 BOOT: Start with `flow wake` or `flow auto bootstrap` (default=`worker`). Exit 3->`flow exec bg recover --mode=three-way`.
- I02 PERMIT: Zero dirty edits on `main`. Issue `flow permit issue --unit=<U>` first; integrator needs `--elevate-integrator --reason="<6+>"`.
- I03 SEAL: Checkpoint 10-15m (`flow park --checkpoint`); before wait/turn-end run `flow park --next="..." --artifacts=<DIR>` (seal+Chrome stop+spill purge).
- I04 EXAM: Physics/CAD/FEA/CFD/EDA/EMC/optics/control/boot/SI/ESD/tribology/formal/BOM/visual claims MUST pass unskipped EXAM V1.1 (`flow ship --full-exam`/`flow auto certify`). `CAD_PROXY`!=physical validation; real artifacts use `--project=<exam.project.json>`.
- I05 SOLVER_48: Fresh VM/exit 5->`flow exec exam setup` (warm cache `<1s`; 48/48+6 hardened C++17). Zero skip/fallback.
- I06 ANTI_CHEAT: Never relax thresholds, omit engines, delete core files/tests/macros, accumulate Salami drift, shrink vol >5%, or forge `V1.1証明`. Core edits need `flow exec exam selftest`(111/111)+`flow selftest`.
- I07 RECEIPT: Claim done ONLY with uncached `flow finish --policy=worker|integrator` + **`FLOW-RECEIPT`** (`BG-RECEIPT`+`TLX11-RECEIPT`+`SEC-RECEIPT`+`CI_ATTESTED|LOCAL_UNATTESTED`).
- I08 AUTO_FIRST: Prefer `flow auto`, `flow verify --parallel`, `flow heal --unit=<U> --apply` (0-tok), `flow macro`. Tier-B: `flow inspect <id> --defect --unit=<U>`.
- I09 HUMAN_LOCK: `flow human-report` is `HUMAN_REQUEST_ONLY`. NEVER invoke autonomously or in macros (`SEC-13` EXIT 6).
- I10 ZERO_WASTE: Never full-read giant `data/*.json`, `assemblies/*Parts.ts`, or `docs/`. Use `flow auto research`, `flow inspect`, `pose.tsv`, `flow slice`, `flow doc section 2 <@TAG>`, `flow doc tool <name>`.
- I11 SSOT: Run `flow doc sync` on metric edits (`flow doc audit --strict` fails `EXIT 2` on drift). Captures/reports ONLY in `/tmp/...` or `<ARTIFACT_DIR>`.

## @COMMANDS (`flow <cmd>` | Full flags: `flow doc tool <exam|bg|pp|sokutei|sp|dx|permit|auto|macro|security|cache>`)
- `flow auto <bootstrap|research|dev|certify|fabricate|factory|list>` (<=550t): 14-30+ step parallel DAGs (`dev` diff-aware; `certify`/`bootstrap` uncached).
- `flow permit <issue|status|verify|revoke|install-hooks|selftest>` | `flow wake [slug] [--unit=U]` | `flow inspect <t> [--defect]` | `flow heal --unit=<U> [--apply|--bake]`.
- `flow verify [--parallel] [--cached|--no-cache] [--suite=build|selftest|all]` (cache OFF on `finish`/`ship`/`V1.1証明`) | `flow cache <status|clear>`.
- `flow ship --unit=<U> [--policy=P] [--full-exam] [--visual]` | `flow park [--checkpoint|--next=N]` | `flow finish [--policy=P] [--pr|--merge]`.
- `flow macro <register|run|list|inspect|verify|suggest|remove|selftest>` (`ai-*` deletable; core locked) | `flow cert <status|verify|selftest>` | `flow swarm <plan|status|selftest>`.
- `flow security <audit [--full]|selftest|recover|sandbox-selftest|attest-status|verify-oidc>` | `flow doc <audit --strict|sync|tool <n>|section <1|2> <TAG>>` | `flow slice` | `flow exec <t>` | `flow human-report` | `flow selftest`.

## @SECURITY_AND_V2 (SEC-01..SEC-13 | 48 ATTACKS | EXIT 6)
- `SEC-01` Secrets/Entropy(0 inline bypass) | `SEC-02` `FLOW-RECEIPT`+Kernel Closure+OIDC/Sigstore(keyless)+Ed25519 | `SEC-03` PI/Bidi/Spoof | `SEC-04` `shell:false`+`env -i`+UserNS/NetNS+Docker `:ro` | `SEC-05` Realpath | `SEC-06` Lockfile+`.git/config`+6-Bin SHA | `SEC-07` SAST | `SEC-08` Anti-Cheat+Salami+Core Lock | `SEC-09` Ledger | `SEC-10` Worker+Permit+Quarantine | `SEC-11` Hygiene | `SEC-12` 48-Attack Oracle | `SEC-13` Macro+`V1.1証明`.
- Parallel: `FLOW_AGENT_ID`->`/tmp/flow_ws/<id>/`; worker edits ONLY `src/units/<U>.{ts,pose.tsv}`, `src/data/<U>.json`, `src/assemblies/<U>/**`.
- V2: G=`pose.tsv`, M=`assemblies/<U>/*.ts` (`ResourceCache` 38 buckets, Instanced/Batched, 0-GC, `JSON==3D`), L=1-line `data/<U>.json`. Protected: `reports/fh_mirai_2028/*.md`, `blueprints/riimos_e1/`.
