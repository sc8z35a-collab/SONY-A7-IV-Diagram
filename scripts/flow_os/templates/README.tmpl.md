# @FLOW_BOOK|id=2|role=DOMAIN_SPEC|spec=FLOW-SPEC/v1|project={{PROJECT_NAME}}
> LANG=AI_NATIVE_MIN_BPE|COMPANION=AGENTS.md(Book1:ENV_OS)

## @PROJECT_PROFILE
- `NAME`: {{PROJECT_NAME}}
- `DEFAULT_BRANCH`: {{DEFAULT_BRANCH}}
- `DETECTED_LANGS`: {{LANGS}}
- `DETECTED_CHECKS`: `{{CHECKS}}`
- `OS_CORE`: `scripts/flow_os/` (Pure Node.js 22, zero external npm dependencies)

## @DOMAIN_MODULES
- Add project-specific module tables, data schemas, and adapter hooks (`adapter` field in `.flowrc.json`) here in terse pipe-delimited `FLOW-SPEC/v1` format.

## @VERIFICATION_CONTRACT
- Self-proof: `node scripts/flow_os/flow.mjs selftest` (runs `SEC-12` 30-attack Red-Team + `swarm selftest` + `doc audit --strict`).
