# @FLOW_BOOK|id=1|role=ENV_OS|spec=FLOW-SPEC/v1.1|os=FLOW-V1.1-OS-{{OS_VERSION}}|project={{PROJECT_NAME}}
> LANG=AI_NATIVE_MIN_BPE|BOOKS=2(Book1:AGENTS.md,Book2:README.md)|EXIT=0:OK,1:ERR,2:BLOCK,3:WARN,4:XFAIL,5:NO_SOLVER,6:SEC_BLOCK

## @IRON_LAWS
- `I01|BOOT`: Session first command MUST be `node scripts/flow_os/flow.mjs wake` or `flow auto bootstrap`.
- `I02|BRANCH`: Never hold dirty edits on `{{DEFAULT_BRANCH}}`. Start a feature branch via `flow wake <slug>`.
- `I03|PARK`: Before waiting on human input or ending a turn, run `flow park --next="..." --artifacts=<DIR>`.
- `I04|RECEIPT`: Never claim completion without `FLOW-RECEIPT` from `flow finish --policy=worker|integrator`.
- `I05|SECURITY`: All 13 layers (`SEC-01`..`SEC-13`) are mandatory. `EXIT 6` halts all writes/pushes immediately.
- `I06|HUMAN_CMD_LOCK`: `flow human-report` is `HUMAN_REQUEST_ONLY`. AI MUST NEVER run it autonomously or inside macros.

## @SUPER_COMMANDS (ALIAS: `flow` = `node scripts/flow_os/flow.mjs`)
| CMD | USAGE | REPLACES | MAX_TOK |
|---|---|---|---:|
| `auto` | `flow auto <bootstrap\|research\|dev\|certify\|fabricate\|factory\|list>` | 14-30+ step parallel DAGs | 550 |
| `macro` | `flow macro <register\|run\|list\|inspect\|verify\|suggest\|remove\|selftest>` | AI self-registered signed DAGs | 400 |
| `wake` | `flow wake [slug] [--unit=U] [--role=worker\|integrator]` | boot+branch+lease+ws+brief | 220 |
| `inspect` | `flow inspect <target> [--slice]` | search+read+metadata | 300 |
| `ship` | `flow ship [--policy=P]` | checks+build+snapshot | 350 |
| `park` | `flow park [--next=N] [--artifacts=DIR]` | checkpoint+seal+lease_hb | 150 |
| `finish` | `flow finish [--policy=P]` | sec_fortress+gate+FLOW-RECEIPT | 200 |
| `swarm` | `flow swarm <plan\|status\|selftest>` | parallel_orchestration | 300 |
| `security` | `flow security <audit\|selftest>` | SEC-01..SEC-13 (36 attacks) | 350 |
| `doc` | `flow doc <audit --strict\|section 1\|2 TAG>` | 2-book_gate | 250 |
| `human-report` | `flow human-report [--out=PATH]` | `HUMAN_REQUEST_ONLY` live MD stats | PATH |

## @SECURITY_FORTRESS (SEC-01..SEC-13)
`SEC-01`:Secrets+Entropy+Redact | `SEC-02`:Chained_FLOW-RECEIPT+KernelSeal | `SEC-03`:PromptInjection+BidiTrojan+SpoofReceipt | `SEC-04`:CmdSandbox+shell:false | `SEC-05`:RealpathConfinement+SymlinkGuard | `SEC-06`:LockfileSHA512+SupplyChain | `SEC-07`:MultiLang_SAST | `SEC-08`:AntiCheatGuard | `SEC-09`:HashChainedAuditLedger | `SEC-10`:ParallelWorkerQuarantine | `SEC-11`:Hygiene+Bloat+ConflictGuard | `SEC-12`:36Attack_RedTeam_Oracle | `SEC-13`:MacroGovernance+I10Lock+CertForgeryGuard

## @PARALLEL_KERNEL
- Set unique `FLOW_AGENT_ID` per worker. Isolated workspace auto-provisioned at `/tmp/flow_ws/<AGENT_ID>`.
- Workers acquire exclusive unit/scope lease on `flow wake`; protected paths in `.flowrc.json` trigger `EXIT 6` + quarantine.
