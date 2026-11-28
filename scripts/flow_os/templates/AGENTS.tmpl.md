# @FLOW_BOOK|id=1|role=ENV_OS|spec=FLOW-SPEC/v1.1|os=FLOW-V1.1-OS-{{OS_VERSION}}|project={{PROJECT_NAME}}
> LANG=AI_NATIVE_MIN_BPE|BOOKS=2(Book1:AGENTS.md,Book2:README.md)|EXIT=0:OK,1:ERR,2:BLOCK,3:WARN,4:XFAIL,5:NO_SOLVER,6:SEC_BLOCK

## @IRON_LAWS
- `I00|NO_INFRA_DIVE`: `scripts/flow_os/*` and `.github/workflows/*` are PRE-VERIFIED BLACK-BOX INFRA. NEVER read their source files during `/plan` or feature work unless explicitly asked to modify OS internals. Cold-start = Book 1 (`AGENTS.md`) + Book 2 (`README.md`) + ONE command (`flow status --raw`, <300ms).
- `I01|BOOT`: Session first command MUST be `flow wake` or `flow auto bootstrap` (default role=`worker`).
- `I02|PERMIT`: Never hold dirty edits on `{{DEFAULT_BRANCH}}`. Issue an Edit Permit (`flow permit issue --unit=<U>`) before editing; integrator elevation requires `--elevate-integrator --reason="..."`.
- `I03|PARK`: Before waiting on human input or ending a turn, run `flow park --next="..." --artifacts=<DIR>`.
- `I04|RECEIPT`: Never claim completion without uncached `FLOW-RECEIPT` from `flow finish --policy=worker|integrator`.
- `I05|SECURITY`: All 13 layers (`SEC-01`..`SEC-13`, 48 attacks) are mandatory. `EXIT 6` halts all writes/pushes and quarantines rogue agents.
- `I06|HUMAN_CMD_LOCK`: `flow human-report` is `HUMAN_REQUEST_ONLY`. AI MUST NEVER run it autonomously or inside macros.

## @SUPER_COMMANDS (ALIAS: `flow` = `node scripts/flow_os/flow.mjs`)
| CMD | USAGE | REPLACES | MAX_TOK |
|---|---|---|---:|
| `status` | `flow status [--unit=U] [--refresh-health] [--raw]` | 1-shot <300ms env+VM+sec+health | 450 |
| `auto` | `flow auto <bootstrap\|research\|dev\|certify\|fabricate\|factory\|list>` | 14-30+ step parallel DAGs | 550 |
| `macro` | `flow macro <register\|run\|list\|inspect\|verify\|suggest\|remove\|selftest>` | AI self-registered signed DAGs | 400 |
| `permit` | `flow permit <issue\|status\|verify\|revoke\|install-hooks\|selftest>` | Edit Permit Gate + hooks | 150 |
| `wake` | `flow wake [slug] [--unit=U] [--role=worker\|integrator] [--brief]` | boot+branch+lease+ws+brief | 220 |
| `inspect` | `flow inspect <target> [--slice]` | search+read+metadata | 300 |
| `verify` | `flow verify [--parallel] [--cached\|--no-cache] [--suite=build\|selftest\|all]` | parallel checks + cache | 300 |
| `ship` | `flow ship [--policy=P]` | uncached checks+build+snapshot | 350 |
| `park` | `flow park [--next=N] [--artifacts=DIR]` | checkpoint+seal+spill_purge | 150 |
| `finish` | `flow finish [--policy=P]` | uncached sec+gate+FLOW-RECEIPT | 200 |
| `swarm` | `flow swarm <plan\|status\|selftest>` | parallel_orchestration | 300 |
| `security` | `flow security <audit\|selftest\|recover\|sandbox-selftest\|attest-status\|verify-oidc>` | SEC-01..SEC-13 (48 attacks) | 350 |
| `doc` | `flow doc <audit --strict\|sync\|tool <name>\|section 1\|2 TAG>` | SSOT 2-book gate + tool specs | 250 |
| `human-report` | `flow human-report [--out=PATH]` | `HUMAN_REQUEST_ONLY` live MD stats | PATH |

## @SECURITY_FORTRESS (SEC-01..SEC-13 | 48 ATTACKS)
`SEC-01`:Secrets+Entropy+Redact | `SEC-02`:Chained_FLOW-RECEIPT+OIDC_Sigstore+Ed25519+KernelSeal | `SEC-03`:PromptInjection+BidiTrojan+SpoofReceipt | `SEC-04`:CmdSandbox+UserNS_NetNS | `SEC-05`:RealpathConfinement+SymlinkGuard | `SEC-06`:LockfileSHA512+GitConfig+NativeBinSHA | `SEC-07`:MultiLang_SAST | `SEC-08`:AntiCheat+Salami+CoreImmutable | `SEC-09`:HashChainedAuditLedger | `SEC-10`:PermitGate+Quarantine | `SEC-11`:Hygiene+Bloat+ConflictGuard | `SEC-12`:48Attack_RedTeam_Oracle | `SEC-13`:MacroGovernance+I10Lock+CertForgeryGuard

## @PARALLEL_KERNEL
- Set unique `FLOW_AGENT_ID` per worker. Isolated workspace auto-provisioned at `/tmp/flow_ws/<AGENT_ID>`.
- Workers acquire exclusive unit/scope lease + Edit Permit on `flow wake`; protected paths in `.flowrc.json` trigger `EXIT 6` + quarantine.
- Full CLI options on demand: `flow doc tool <name>`.
