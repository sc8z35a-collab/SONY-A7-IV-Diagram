#!/usr/bin/env node
/**
 * `bg` — Buchigire Guard v1 (ぶち切れ対策ツール v1)
 * Aerospace-Grade Off-VM Durability, Crash/VM-Wipe Disaster Recovery,
 * Pre-Claim Completion Gatekeeper & Anti-Amnesia Engine for AI Agents & Humans.
 *
 * Zero external npm dependencies (Pure Node.js 22 + Git 2.38+).
 * Exit codes: 0=PASS/DURABLE, 1=RUNTIME_ERR, 2=BLOCKED/FAIL, 3=WARN/RECOVERY_AVAILABLE
 */

import {
  EXIT_BLOCKED,
  EXIT_ERROR,
  EXIT_OK,
  getRepoContext,
} from './buchigire_guard/git_plumbing.mjs';
import {
  computeStatus,
  createSnapshot,
  runBoot,
  runGc,
  runRecover,
  runStart,
  runWatchDaemon,
} from './buchigire_guard/vault_engine.mjs';
import {
  manageHooks,
  runAndRecordCheck,
  runGate,
  runGuardExec,
  runHookCheck,
  runLand,
  runSyncCheck,
} from './buchigire_guard/gate_and_land.mjs';
import {
  formatAi,
  formatHuman,
  formatJson,
  writeHtmlDashboard,
} from './buchigire_guard/renderers.mjs';
import { runSelfTest } from './buchigire_guard/selftest.mjs';

const HELP_TEXT = `
bg — Buchigire Guard v1 (ぶち切れ対策ツール v1)
Industrial 36-Safeguard Durability, Recovery & Pre-Claim Gatekeeper CLI

Usage: npm run bg -- <command> [options]

Commands:
  boot                          Fetch origin & vaults; detect orphaned work from dead VMs (exit 3 if found)
  start <slug>                  Create safe feature branch from latest origin/<default> + initial off-VM push
  snap | checkpoint             Non-intrusive shadow snapshot (tracked + untracked + artifacts) -> off-VM vault
  seal                          Mandatory pre-idle / pre-pause flush (require-remote=true, updates Flight Recorder)
  watch                         Background watchdog daemon (auto off-VM vaulting on dirty changes every --interval s)
  recover                       3-mode disaster recovery (--mode=inspect|worktree|three-way --rev=N --with-artifacts)
  gate                          8-invariant Pre-Claim Completion Gatekeeper (emits tamper-evident BG-RECEIPT)
  record-check --name=K -- CMD  Run verification command and bind PASS receipt to exact current Git tree SHA
  guard-exec -- <CMD...>        Capture remote safety snapshot BEFORE risky command; prints 1-line rollback on fail
  sync                          Zero-mutation virtual merge conflict prediction (git merge-tree) vs origin/main
  land                          Atomic PR creation & optional merge (push + gate + gh pr create + [--merge-pr] + gc)
  status                        Durability score (0-100), RPO timer, timeline & optional --html=/tmp/bg_dashboard.html
  hooks [install|uninstall|status]  Manage local pre-commit & pre-push safety hooks (chain-preserving)
  gc                            Prune merged or expired local/remote vault refs (--dry-run, --days=7, --slug=S, --all)
  selftest                      Run 20-case isolated adversarial chaos self-test oracle (incl. real rm -rf VM wipe)

Common Options:
  --ai                          Compact low-token summary for AI agents
  --json                        Structured bg/v1 JSON output
  --policy=<worker|integrator|default>   Scope & verification policy from .bgrc.json
  --artifacts=<dir>             Mirror / restore .md & .json plan/walkthrough artifacts inside remote vault
  --goal="<text>"               Update AI Flight Recorder goal
  --next="<text>"               Update AI Flight Recorder next step
  --completed="<text>"          Append completed milestone to AI Flight Recorder
  --pitfall="<text>"            Append known pitfall/fix to AI Flight Recorder
  --note="<text>"               Attach note to snapshot commit
  --bundle=<path>               Also write portable offline .bgbundle + .sha256 archive
  --html=<path>                 Write interactive HTML5 telemetry dashboard (for 'status')
  --run-checks                  Execute policy checks during 'gate' / 'land'
  --require-checks              Require fresh tree-SHA receipts for all policy checks in 'gate'
  --merge-pr                    Merge PR after creation in 'land' (--method=squash|merge|rebase)
  --interval=<sec>              Watchdog poll interval in seconds (default 120)
  --mode=<inspect|worktree|three-way>   Recovery mode for 'recover'
  --slug=<slug> | --oid=<sha> | --rev=<N>  Target vault / generation for 'recover' or 'gc'
  --with-artifacts              Also restore mirrored artifacts in 'recover'
  --force / --local-only / --dry-run / --allow-main / --skip-sync

Exit Codes: 0=PASS/DURABLE  1=RUNTIME_ERROR  2=BLOCKED/FAIL  3=WARN/RECOVERY_AVAILABLE
`;

function parseArgs(argv) {
  const dashIdx = argv.indexOf('--');
  const headArgs = dashIdx >= 0 ? argv.slice(0, dashIdx) : argv;
  const tailCmd = dashIdx >= 0 ? argv.slice(dashIdx + 1) : [];

  const cmd = headArgs[0] || 'help';
  const positionals = [];
  const flags = {};

  for (let i = 1; i < headArgs.length; i++) {
    const a = headArgs[i];
    if (a === '-h' || a === '--help') {
      flags.help = true;
    } else if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq >= 0) {
        flags[a.slice(2, eq)] = a.slice(eq + 1);
      } else {
        flags[a.slice(2)] = true;
      }
    } else {
      positionals.push(a);
    }
  }
  return { cmd, positionals, flags, tailCmd };
}

function outputResult(cmd, result, flags) {
  if (flags.json) {
    process.stdout.write(formatJson(cmd, result) + '\n');
  } else if (flags.ai) {
    process.stdout.write(formatAi(cmd, result) + '\n');
  } else {
    process.stdout.write(formatHuman(cmd, result) + '\n');
  }
}

async function main() {
  const { cmd, positionals, flags, tailCmd } = parseArgs(process.argv.slice(2));
  if (cmd === 'help' || flags.help) {
    process.stdout.write(HELP_TEXT.trimStart() + '\n');
    process.exit(EXIT_OK);
  }

  try {
    if (cmd === 'selftest') {
      const res = runSelfTest();
      outputResult('selftest', res, flags);
      process.exit(res.exitCode);
    }

    const ctx = getRepoContext(flags.cwd || process.cwd(), {
      remote: typeof flags.remote === 'string' ? flags.remote : undefined,
      maxFileMb: flags['max-file-mb'],
      retentionDays: flags.days,
    });

    let res;
    switch (cmd) {
      case 'boot':
        res = runBoot(ctx);
        break;

      case 'start': {
        const slug = positionals[0] || flags.slug;
        if (!slug) {
          throw new Error('Usage: npm run bg -- start <branch-slug> [--goal="..."]');
        }
        res = runStart(ctx, slug, {
          goal: flags.goal,
          nextStep: flags.next,
          artifactsDir: flags.artifacts,
          allowDirty: Boolean(flags['allow-dirty']),
          ignoreOrphans: Boolean(flags['ignore-orphans']),
          noPush: Boolean(flags['no-push']),
        });
        break;
      }

      case 'snap':
      case 'checkpoint':
        res = createSnapshot(ctx, {
          reason: flags.reason || 'snap',
          note: flags.note,
          goal: flags.goal,
          nextStep: flags.next,
          addCompleted: flags.completed,
          addPitfall: flags.pitfall,
          artifactsDir: flags.artifacts,
          bundleOut: flags.bundle,
          force: Boolean(flags.force),
          localOnly: Boolean(flags['local-only']),
          requireRemote: Boolean(flags['require-remote']),
        });
        break;

      case 'seal':
        res = createSnapshot(ctx, {
          reason: 'seal_pre_idle',
          note: flags.note || 'Pre-idle mandatory flush',
          goal: flags.goal,
          nextStep: flags.next,
          addCompleted: flags.completed,
          addPitfall: flags.pitfall,
          artifactsDir: flags.artifacts,
          bundleOut: flags.bundle,
          force: Boolean(flags.force),
          localOnly: Boolean(flags['local-only']),
          requireRemote: !flags['local-only'],
        });
        break;

      case 'watch':
        res = await runWatchDaemon(ctx, {
          intervalSec: flags.interval,
          artifactsDir: flags.artifacts,
          maxCycles: flags['max-cycles'],
        });
        break;

      case 'recover':
        res = runRecover(ctx, {
          mode: flags.mode || 'worktree',
          slug: flags.slug || positionals[0],
          oid: flags.oid,
          rev: flags.rev,
          withArtifacts: Boolean(flags['with-artifacts']),
          artifactsDir: flags.artifacts,
          noSafetySnap: Boolean(flags['no-safety-snap']),
        });
        break;

      case 'gate':
        res = runGate(ctx, {
          policy: flags.policy,
          runChecks: Boolean(flags['run-checks']),
          requireChecks: Boolean(flags['require-checks']),
          allowMain: Boolean(flags['allow-main']),
          allowShrinkage: Boolean(flags['allow-shrinkage']),
          skipSync: Boolean(flags['skip-sync']),
          noFetch: Boolean(flags['no-fetch']),
        });
        break;

      case 'record-check': {
        const name = flags.name || 'custom_check';
        const command = tailCmd.length > 0 ? tailCmd.join(' ') : positionals.join(' ');
        if (!command) throw new Error('Usage: npm run bg -- record-check --name=<key> -- <command>');
        const r = runAndRecordCheck(ctx, name, command);
        res = {
          exitCode: r.passed ? EXIT_OK : EXIT_BLOCKED,
          verdict: r.passed ? 'CHECK_RECORDED_PASS' : 'CHECK_FAILED',
          ...r,
        };
        break;
      }

      case 'guard-exec': {
        const execArgs = tailCmd.length > 0 ? tailCmd : positionals;
        res = runGuardExec(ctx, execArgs, { localOnly: Boolean(flags['local-only']) });
        break;
      }

      case 'sync':
        res = runSyncCheck(ctx, { target: flags.target, noFetch: Boolean(flags['no-fetch']) });
        break;

      case 'land':
        res = runLand(ctx, {
          policy: flags.policy || 'integrator',
          title: flags.title,
          body: flags.body,
          runChecks: Boolean(flags['run-checks']),
          requireChecks: Boolean(flags['require-checks']),
          mergePr: Boolean(flags['merge-pr']),
          mergeMethod: flags.method || 'squash',
          keepBranch: Boolean(flags['keep-branch']),
        });
        break;

      case 'status':
        res = computeStatus(ctx);
        if (typeof flags.html === 'string') {
          res.htmlDashboardPath = writeHtmlDashboard(res, flags.html);
        }
        break;

      case 'hooks': {
        const act = positionals[0] || 'status';
        if (!['install', 'uninstall', 'status'].includes(act)) {
          throw new Error(`Invalid hooks action '${act}'. Use install | uninstall | status.`);
        }
        res = manageHooks(ctx, act);
        break;
      }

      case 'hook-check':
        res = runHookCheck(ctx);
        break;

      case 'gc':
        res = runGc(ctx, {
          retentionDays: flags.days,
          dryRun: Boolean(flags['dry-run']),
          all: Boolean(flags.all),
          slug: flags.slug,
        });
        break;

      default:
        throw new Error(`Unknown command '${cmd}'. Run 'npm run bg -- --help'.`);
    }

    outputResult(cmd, res, flags);
    process.exit(res.exitCode ?? EXIT_OK);
  } catch (err) {
    if (flags.json) {
      process.stdout.write(formatJson(cmd, { exitCode: EXIT_ERROR, verdict: 'ERROR', error: err.message }) + '\n');
    } else {
      process.stderr.write(`[bg ${cmd} ERROR] ${err.message}\n`);
    }
    process.exit(EXIT_ERROR);
  }
}

main();
