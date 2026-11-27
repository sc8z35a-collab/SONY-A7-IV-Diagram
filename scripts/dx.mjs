#!/usr/bin/env node
/**
 * `dx` — Zero-Deletion 12-Innovation Zero-Token AI Development Pipeline CLI
 * Pure Node.js 22 (zero new npm dependencies).
 *
 * Exit codes:
 *   0 = PASS / OK
 *   1 = RUNTIME_ERROR
 *   2 = BLOCKED / VALIDATION_FAIL
 *   3 = WARN / BUDGET_ALERT
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { buildCodeAtlas } from './dx/atlas_builder.mjs';
import { runSemanticSearch } from './dx/semantic_search.mjs';
import { compileBrief, runDxCheckpoint, runDxResume } from './dx/brief_compiler.mjs';
import {
  readAstSymbol,
  readCssSurgical,
  readFileOutline,
  readHeadFolded,
  readPartSurgical,
  readSchematicSurgical,
  runDxDiff,
  runDxSlice,
} from './dx/surgical_reader.mjs';
import { parseTxOps, runDxRun, runDxTx } from './dx/tx_engine.mjs';
import {
  runCheckSpace,
  runPartCompile,
  runPartPatch,
  runPartScaffold,
  runPartUpsert,
} from './dx/part_mutator.mjs';
import {
  compileCadDsl,
  compileSvgDsl,
  runSchematicAudit,
  runSchematicFind,
} from './dx/cad_and_svg_compilers.mjs';
import { runDxCheck, runDxPreflight } from './dx/preflight_and_check.mjs';
import { runDxAudit, runDxBudget, runDxSelftest } from './dx/audit_and_selftest.mjs';

const HELP_TEXT = `
dx — Zero-Deletion 12-Innovation Zero-Token AI Development Pipeline
Usage: node scripts/dx.mjs <command> [subcommand] [options]
   or: npm run -s dx -- <command> [options]

Commands:
  atlas                          Build 7 deterministic AST/Graph/Mat/Helper/Schematic/CSS TSVs under catalog/code/
  find "<query>"                 Local hybrid BM25+AST+JP cross-domain search (<80ms, <300 tok)
  brief                          Compile <=1.5-2.5KB zero-explore context capsule (--unit|--part|--area|--query|--files|--out)
  read <file>#<Symbol>           AST surgical symbol extraction with 1-indexed lines
       --outline <file>          Structural outline only
       --head <file>             Fold giant union lists (e.g. types.ts -95%+) & keep core interfaces
       --part=<partId>           Extract 1 part from giant src/data/*.json with exact line span
       --schematic=<type>        Extract exact SVG schematic case block
       --css="<selector>"        Extract matching CSS rule block(s) from src/styles/main.css
  slice <path> <start>-<end>     Zoom exact line range (ideal for /tmp/dx_out/* spill files)
  diff [--base=<ref>]            Noise-free symbol & part-level diff (excludes docs/ & minified blobs)
  tx --ops='[...]'|--file=f.json Execute multiple ops in ONE tool turn inside --budget
  run [--budget=450] -- <cmd>    Universal CLI stdout compressor (95-99% reduction, raw log -> /tmp/dx_logs/)
  part compile|upsert|patch|scaffold|check-space   Part Micro-DSL compiler, Box3 checker & dry-run/atomic mutator
  cad compile --from=<f.dsl>     3D CAD Micro-DSL -> V2-clean TypeScript compiler (verifies mats.* keys)
  svg compile --from=<f.dsl>     HD 720x470 SVG Schematic Micro-DSL compiler (tag & overlap checked)
  schematic find|audit           Locate diagramType implementation or audit unit/repo schematic coverage
  preflight [--unit=<mode>]      Sub-second 8-check static/schema/Box3/V2/mats/SVG/bg-scope simulator (<250ms)
  check [--unit=u|--changed|--full] [--record-bg]  Impact-targeted differential gate & memo cache
  pp-sheet <dir> [--out=<dir>]   Composite existing screenshot directory into ONE lightweight WebP contact sheet
  checkpoint [--goal=...]        Save delta capsule to .git/bg_vault/dx_capsule.json (+ sync bg Flight Recorder)
  resume                         Reconstruct <250-token instant session resume briefing
  audit [--html=<path>]          Live 24-metric forensic BPE token audit & O(T^2) workflow simulator
  budget                         0-100 token-efficiency health scorecard & regression alarms
  selftest                       22-case isolated automated proof oracle covering all 12 innovations

Global Flags: --ai  --json  --budget=<N>  --level=0|1|2  --policy=worker|integrator  --help
Exit Codes:   0=OK  1=RUNTIME_ERROR  2=BLOCKED/VALIDATION_FAIL  3=WARN/BUDGET_ALERT
`;

function parseCli(argv) {
  const dashIdx = argv.indexOf('--');
  const head = dashIdx >= 0 ? argv.slice(0, dashIdx) : argv;
  const tail = dashIdx >= 0 ? argv.slice(dashIdx + 1) : [];

  const cmd = head[0] || 'help';
  const positionals = [];
  const flags = {};

  for (let i = 1; i < head.length; i++) {
    const a = head[i];
    if (a === '-h' || a === '--help') {
      flags.help = true;
    } else if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq >= 0) flags[a.slice(2, eq)] = a.slice(eq + 1);
      else flags[a.slice(2)] = true;
    } else {
      positionals.push(a);
    }
  }
  return { cmd, positionals, flags, tail };
}

function resolveBudget(flags, defaultBudget) {
  if (flags.budget !== undefined) return Number(flags.budget);
  if (flags.level === '0') return Math.min(defaultBudget, 280);
  if (flags.level === '1') return Math.min(defaultBudget, 700);
  if (flags.level === '2') return Math.max(defaultBudget, 1800);
  return defaultBudget;
}

function emit(res, flags) {
  if (flags.json) {
    const clean = { ...res };
    delete clean.tsCode;
    process.stdout.write(JSON.stringify(clean, null, 2) + '\n');
  } else {
    process.stdout.write(String(res.formatted ?? '') + '\n');
  }
}

async function main() {
  const { cmd, positionals, flags, tail } = parseCli(process.argv.slice(2));
  const root = flags.cwd ? path.resolve(flags.cwd) : process.cwd();

  if (cmd === 'help' || flags.help) {
    process.stdout.write(HELP_TEXT.trimStart() + '\n');
    process.exit(0);
  }

  try {
    let res;

    switch (cmd) {
      case 'atlas': {
        const stats = buildCodeAtlas({ root });
        const line = flags.ai
          ? `[dx atlas] OK files=7 bytes=${stats.totalBytes} ts=${stats.tsFiles} sym=${stats.symbols} graph=${stats.graphNodes} buckets=${stats.buckets} mats=${stats.matKeys} helpers=${stats.helpers} schem=${stats.mappedSchematics}/${stats.schematics} css=${stats.cssRules} ${stats.elapsedMs}ms`
          : [
              `[dx atlas] Generated 7 deterministic TSVs under catalog/code/ (${(stats.totalBytes / 1024).toFixed(1)} KB in ${stats.elapsedMs}ms):`,
              ...Object.entries(stats.files).map(
                ([k, v]) => `  catalog/code/${k.padEnd(15)} ${String(v.rows).padStart(5)} rows | ${(v.bytes / 1024).toFixed(1)} KB`
              ),
            ].join('\n');
        res = { exitCode: 0, ...stats, formatted: line };
        break;
      }

      case 'find': {
        const query = positionals.join(' ') || flags.query || '';
        res = runSemanticSearch(query, {
          root,
          top: flags.top,
          domain: flags.domain,
          unit: flags.unit,
          budget: resolveBudget(flags, 600),
        });
        break;
      }

      case 'brief': {
        res = compileBrief({
          root,
          unit: flags.unit || positionals[0],
          part: flags.part,
          area: flags.area,
          query: flags.query,
          files: flags.files,
          policy: flags.policy || 'worker',
          out: flags.out,
          budget: resolveBudget(flags, 780),
        });
        break;
      }

      case 'read': {
        const budget = resolveBudget(flags, 1200);
        if (flags.part) {
          res = readPartSurgical(flags.part, { root, unit: flags.unit, budget });
        } else if (flags.schematic) {
          res = readSchematicSurgical(flags.schematic, { root, budget });
        } else if (flags.css) {
          res = readCssSurgical(flags.css, { root, budget });
        } else if (flags.outline) {
          const target = typeof flags.outline === 'string' ? flags.outline : positionals[0];
          res = readFileOutline(target, { root, budget });
        } else if (flags.head) {
          const target = typeof flags.head === 'string' ? flags.head : positionals[0];
          res = readHeadFolded(target, { root, budget });
        } else if (positionals[0] && positionals[0].includes('#')) {
          res = readAstSymbol(positionals[0], { root, budget });
        } else if (positionals[0]) {
          res = readFileOutline(positionals[0], { root, budget });
        } else {
          res = {
            exitCode: 2,
            formatted: '[dx read] Usage: dx read <file>#<Symbol> | --outline <file> | --head <file> | --part=<id> | --schematic=<type> | --css="<sel>"',
          };
        }
        break;
      }

      case 'slice': {
        res = runDxSlice(positionals[0], positionals[1], {
          root,
          budget: resolveBudget(flags, 1400),
        });
        break;
      }

      case 'diff': {
        res = runDxDiff({
          root,
          base: flags.base,
          ai: Boolean(flags.ai),
          budget: resolveBudget(flags, 800),
        });
        break;
      }

      case 'tx': {
        const opsRaw = flags.file
          ? fs.readFileSync(path.resolve(root, flags.file), 'utf8')
          : flags.ops || positionals.join(';');
        const ops = parseTxOps(opsRaw);
        res = await runDxTx(
          ops,
          async (step, stepBudget) => {
            const op = step.op;
            if (op === 'find') {
              return runSemanticSearch(step.query || step.arg || '', {
                root,
                top: step.top || 8,
                domain: step.domain,
                unit: step.unit,
                budget: stepBudget,
              });
            }
            if (op === 'brief') {
              return compileBrief({
                root,
                unit: step.unit || step.arg,
                part: step.part,
                area: step.area,
                query: step.query,
                files: step.files,
                policy: step.policy || flags.policy || 'worker',
                budget: stepBudget,
              });
            }
            if (op === 'read' || op === 'read-head' || op === 'read-outline') {
              const target = step.target || step.arg || '';
              if (step.part) return readPartSurgical(step.part, { root, unit: step.unit, budget: stepBudget });
              if (step.schematic) return readSchematicSurgical(step.schematic, { root, budget: stepBudget });
              if (step.css) return readCssSurgical(step.css, { root, budget: stepBudget });
              if (op === 'read-head' || step.head) return readHeadFolded(target, { root, budget: stepBudget });
              if (op === 'read-outline' || step.outline) return readFileOutline(target, { root, budget: stepBudget });
              return readAstSymbol(target, { root, budget: stepBudget });
            }
            if (op === 'schematic-find' || op === 'schematic') {
              return runSchematicFind(step.diagramType || step.arg || '', { root });
            }
            if (op === 'schematic-audit') {
              return runSchematicAudit({ root, unit: step.unit || step.arg });
            }
            if (op === 'preflight') {
              return runDxPreflight({
                root,
                unit: step.unit || step.arg,
                policy: step.policy || flags.policy || 'worker',
                ai: true,
                budget: stepBudget,
              });
            }
            if (op === 'diff') {
              return runDxDiff({ root, base: step.base, ai: true, budget: stepBudget });
            }
            if (op === 'check-space') {
              return runCheckSpace({ root, unit: step.unit || step.arg, pos: step.pos, size: step.size, budget: stepBudget });
            }
            return { exitCode: 2, formatted: `[dx tx] unknown op '${op}'` };
          },
          { budget: resolveBudget(flags, 1800) }
        );
        break;
      }

      case 'run': {
        const execArgs = tail.length > 0 ? tail : positionals;
        res = runDxRun(execArgs, {
          root,
          budget: resolveBudget(flags, 450),
          ai: Boolean(flags.ai),
        });
        break;
      }

      case 'part': {
        const sub = positionals[0];
        const common = { root, ...flags, budget: resolveBudget(flags, 1400) };
        if (sub === 'compile') res = runPartCompile(common);
        else if (sub === 'upsert') res = runPartUpsert(common);
        else if (sub === 'patch') res = runPartPatch(common);
        else if (sub === 'scaffold') res = runPartScaffold(common);
        else if (sub === 'check-space') res = runCheckSpace(common);
        else {
          res = {
            exitCode: 2,
            formatted: '[dx part] Usage: dx part compile|upsert|patch|scaffold|check-space [options]',
          };
        }
        break;
      }

      case 'cad': {
        const sub = positionals[0];
        if (sub === 'compile') {
          const fromPath = flags.from || flags.dsl || positionals[1];
          if (!fromPath) {
            res = { exitCode: 2, formatted: '[dx cad compile] ERROR: --from=<spec.dsl> required.' };
          } else {
            const abs = path.resolve(root, fromPath);
            const dslText = fs.readFileSync(abs, 'utf8');
            res = compileCadDsl(dslText, {
              root,
              ...flags,
              budget: resolveBudget(flags, 1500),
            });
          }
        } else {
          res = { exitCode: 2, formatted: '[dx cad] Usage: dx cad compile --from=<spec.dsl> [--unit=<mode>] [--out=<file.ts>] [--dry-run|--apply]' };
        }
        break;
      }

      case 'svg': {
        const sub = positionals[0];
        if (sub === 'compile') {
          const fromPath = flags.from || flags.dsl || positionals[1];
          if (!fromPath) {
            res = { exitCode: 2, formatted: '[dx svg compile] ERROR: --from=<spec.dsl> required.' };
          } else {
            const abs = path.resolve(root, fromPath);
            const dslText = fs.readFileSync(abs, 'utf8');
            res = compileSvgDsl(dslText, {
              root,
              ...flags,
              budget: resolveBudget(flags, 1500),
            });
          }
        } else {
          res = { exitCode: 2, formatted: '[dx svg] Usage: dx svg compile --from=<spec.dsl> [--out=<file.ts>] [--dry-run|--apply]' };
        }
        break;
      }

      case 'schematic': {
        const sub = positionals[0];
        if (sub === 'find') {
          res = runSchematicFind(positionals[1] || flags.type || '', { root });
        } else if (sub === 'audit') {
          res = runSchematicAudit({ root, unit: flags.unit || positionals[1] });
        } else {
          res = { exitCode: 2, formatted: '[dx schematic] Usage: dx schematic find <diagramType> | audit [--unit=<mode>]' };
        }
        break;
      }

      case 'preflight': {
        res = runDxPreflight({
          root,
          unit: flags.unit || positionals[0],
          files: flags.files,
          policy: flags.policy || 'worker',
          ai: Boolean(flags.ai),
          budget: resolveBudget(flags, 500),
        });
        break;
      }

      case 'check': {
        res = runDxCheck({
          root,
          unit: flags.unit,
          changed: Boolean(flags.changed),
          full: Boolean(flags.full),
          'record-bg': Boolean(flags['record-bg']),
          'no-cache': Boolean(flags['no-cache']),
          ai: Boolean(flags.ai),
        });
        break;
      }

      case 'pp-sheet': {
        const srcDir = positionals[0] || flags.dir;
        if (!srcDir) {
          res = { exitCode: 2, formatted: '[dx pp-sheet] Usage: dx pp-sheet <imagesDir> [--out=<outDir>] [--sheet=3x2]' };
        } else {
          const ppArgs = ['scripts/pp.mjs', `--sheet-only=${path.resolve(root, srcDir)}`];
          if (flags.out) ppArgs.push(`--out=${path.resolve(root, flags.out)}`);
          else ppArgs.push(`--out=${path.resolve(root, srcDir)}`);
          if (typeof flags.sheet === 'string') ppArgs.push(`--sheet=${flags.sheet}`);
          const pr = spawnSync('node', ppArgs, { cwd: root, encoding: 'utf8' });
          res = {
            exitCode: pr.status ?? 1,
            formatted: (pr.stdout || pr.stderr || '').trim(),
          };
        }
        break;
      }

      case 'checkpoint': {
        res = runDxCheckpoint({
          root,
          goal: flags.goal,
          completed: flags.completed,
          next: flags.next,
          pitfall: flags.pitfall,
          note: flags.note,
        });
        break;
      }

      case 'resume': {
        res = runDxResume({ root, budget: resolveBudget(flags, 240) });
        break;
      }

      case 'audit': {
        res = runDxAudit({ root, ai: Boolean(flags.ai), html: flags.html });
        break;
      }

      case 'budget': {
        res = runDxBudget({ root, ai: Boolean(flags.ai) });
        break;
      }

      case 'selftest': {
        res = await runDxSelftest({ root, ai: Boolean(flags.ai) });
        break;
      }

      default:
        res = {
          exitCode: 2,
          formatted: `[dx] Unknown command '${cmd}'. Run 'node scripts/dx.mjs --help'.`,
        };
    }

    emit(res, flags);
    process.exit(res.exitCode ?? 0);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (flags.json) {
      process.stdout.write(JSON.stringify({ exitCode: 1, error: msg }) + '\n');
    } else {
      process.stderr.write(`[dx ${cmd} ERROR] ${msg}\n`);
    }
    process.exit(1);
  }
}

main();
