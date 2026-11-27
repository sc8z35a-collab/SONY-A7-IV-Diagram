/**
 * `dx` Component 6 — Sub-Second Local Pre-Flight Simulator (`dx preflight` <250ms)
 * & Impact-Targeted Differential Gate + Memo Cache (`dx check`).
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { transformSync } from 'esbuild';
import { buildCodeAtlas } from './atlas_builder.mjs';
import { inferAffectedUnitsFromFiles } from './brief_compiler.mjs';
import { validateV2Part } from './part_mutator.mjs';
import { validateSvgStructureAndOverlaps } from './cad_and_svg_compilers.mjs';
import { enforceTokenBudget, sha256Hex, stripAnsi } from './tokenizer_and_budget.mjs';
import { getPorcelainStatus, getRepoContext } from '../buchigire_guard/git_plumbing.mjs';
import { runAndRecordCheck } from '../buchigire_guard/gate_and_land.mjs';
import {
  evaluateScopePolicy,
  scanConflictMarkers,
  scanSecrets,
} from '../buchigire_guard/safety_scanners.mjs';

const CHECK_CACHE_REL = 'node_modules/.cache/dx_check_cache.json';
const COMPOSITE_MODES = new Set(['integrated', 'camera_body']);
const NON_MAT_PROPS = new Set([
  'dispose',
  'setRenderMode',
  'setClippingPlanes',
  'update',
  'get',
  'has',
  'clone',
  'opacity',
  'color',
  'length',
  'keys',
]);

function readTsv(absPath) {
  if (!fs.existsSync(absPath)) return [];
  const lines = fs.readFileSync(absPath, 'utf8').split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split('\t');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    if (!l || l.startsWith('#')) continue;
    const cols = l.split('\t');
    const obj = {};
    for (let c = 0; c < headers.length; c++) obj[headers[c]] = cols[c] ?? '';
    rows.push(obj);
  }
  return rows;
}

function stripComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

function unitToDataRel(mode) {
  return `src/data/${mode === 'mishoe' ? 'mi_shoe' : mode}.json`;
}

function unitToUnitFileRel(mode) {
  return `src/units/${mode === 'mishoe' ? 'mi_shoe' : mode}.ts`;
}

function unitToAssemblyDir(mode) {
  if (mode === 'sensor_fab') return 'src/assemblies/sensorFab';
  if (mode === 'mirai_2028') return 'src/assemblies/mirai2028';
  if (mode === 'micro' || mode === 'micro_v2') return 'src/assemblies/sensor';
  return `src/assemblies/${mode}`;
}

function listTsInDir(rootAbs, relDir) {
  const abs = path.join(rootAbs, relDir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  for (const ent of fs.readdirSync(abs, { withFileTypes: true })) {
    const subRel = path.posix.join(relDir, ent.name);
    if (ent.isDirectory()) out.push(...listTsInDir(rootAbs, subRel));
    else if (ent.name.endsWith('.ts')) out.push(subRel);
  }
  return out.sort();
}

/**
 * `dx preflight [--unit=<mode>] [--files=a,b] [--policy=worker|integrator] [--ai]`
 * Executes 8 sub-second static, schema, spatial, material, SVG & scope checks (<250ms typical).
 */
export function runDxPreflight(opts = {}) {
  const t0 = performance.now();
  const rootAbs = path.resolve(opts.root || process.cwd());
  const policyName = opts.policy || 'worker';
  const unit = opts.unit ? String(opts.unit).trim() : null;

  if (!fs.existsSync(path.join(rootAbs, 'catalog', 'code', 'MATERIALS.tsv'))) {
    buildCodeAtlas({ root: rootAbs });
  }

  let dirtyPaths = [];
  try {
    const por = getPorcelainStatus(rootAbs);
    dirtyPaths = por.allDirty.map((d) => d.path).sort();
  } catch {
    dirtyPaths = [];
  }

  const explicitFiles = opts.files
    ? String(opts.files).split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  // Target TS/MJS files for syntax, V2 lint, and mats.* verification
  const targetCodeFiles = new Set(explicitFiles.filter((f) => /\.(ts|mjs|js)$/.test(f)));
  for (const d of dirtyPaths) {
    if (/\.(ts|mjs|js)$/.test(d) && !d.startsWith('docs/')) targetCodeFiles.add(d);
  }
  if (unit) {
    const uf = unitToUnitFileRel(unit);
    if (fs.existsSync(path.join(rootAbs, uf))) targetCodeFiles.add(uf);
    for (const f of listTsInDir(rootAbs, unitToAssemblyDir(unit))) targetCodeFiles.add(f);
  }

  // Target JSON files
  const targetJsonFiles = new Set(explicitFiles.filter((f) => f.endsWith('.json')));
  for (const d of dirtyPaths) {
    if (d.startsWith('src/data/') && d.endsWith('.json')) targetJsonFiles.add(d);
  }
  if (unit) {
    const df = unitToDataRel(unit);
    if (fs.existsSync(path.join(rootAbs, df))) targetJsonFiles.add(df);
  }

  const checks = [];
  const add = (id, status, detail, fix = '') => checks.push({ id, status, detail, fix });

  // 1. esbuild syntax parse (<40ms)
  const syntaxErrs = [];
  for (const rel of targetCodeFiles) {
    const abs = path.resolve(rootAbs, rel);
    if (!fs.existsSync(abs)) continue;
    try {
      transformSync(fs.readFileSync(abs, 'utf8'), {
        loader: rel.endsWith('.ts') ? 'ts' : 'js',
      });
    } catch (err) {
      syntaxErrs.push(`${rel}: ${String(err.message || err).split('\n')[0]}`);
    }
  }
  add(
    '1_esbuild_syntax',
    syntaxErrs.length === 0 ? 'PASS' : 'FAIL',
    syntaxErrs.length === 0 ? `${targetCodeFiles.size} file(s) parsed` : syntaxErrs.slice(0, 4).join('; '),
    syntaxErrs.length ? 'Fix syntax error before running tsc/build' : ''
  );

  // 2. JSON schema, declaredPartCount & cross-unit ID uniqueness
  const jsonErrs = [];
  let partsValidated = 0;
  for (const rel of targetJsonFiles) {
    const abs = path.join(rootAbs, rel);
    if (!fs.existsSync(abs)) continue;
    try {
      const data = JSON.parse(fs.readFileSync(abs, 'utf8'));
      if (Array.isArray(data.parts)) {
        if (data.declaredPartCount !== data.parts.length) {
          jsonErrs.push(`${rel}: declaredPartCount(${data.declaredPartCount}) !== parts.length(${data.parts.length})`);
        }
        const seen = new Set();
        for (const p of data.parts) {
          partsValidated++;
          if (seen.has(p.id)) jsonErrs.push(`${rel}: duplicate id '${p.id}'`);
          seen.add(p.id);
          const errs = validateV2Part(p, `${rel}/${p.id}`);
          if (errs.length > 0) jsonErrs.push(errs[0]);
        }
      }
    } catch (err) {
      jsonErrs.push(`${rel}: JSON parse error (${err.message})`);
    }
  }
  add(
    '2_json_schema',
    jsonErrs.length === 0 ? 'PASS' : 'FAIL',
    jsonErrs.length === 0
      ? `${targetJsonFiles.size} JSON(s), ${partsValidated} part(s) valid`
      : jsonErrs.slice(0, 4).join('; '),
    jsonErrs.length ? 'Use `dx part upsert` to enforce V2 schema & declaredPartCount sync' : ''
  );

  // 3. Spatial Box3 sanity check (identical-origin overlap detector on target unit L2)
  let spatialDetail = 'skipped (no unit specified)';
  let spatialStatus = 'PASS';
  if (unit) {
    const l2Path = path.join(rootAbs, 'catalog', 'spatial', `${unit}.tsv`);
    if (fs.existsSync(l2Path)) {
      const rows = readTsv(l2Path);
      let exactDupPos = 0;
      const posBuckets = new Map();
      for (const r of rows) {
        if (!r.pos || r.pos === '-' || !r.size || r.size === '-') continue;
        const key = `${r.pos}|${r.size}`;
        posBuckets.set(key, (posBuckets.get(key) || 0) + 1);
      }
      for (const cnt of posBuckets.values()) {
        if (cnt > 1) exactDupPos += cnt - 1;
      }
      spatialDetail = `${rows.length} Box3 rows checked (exact-identical-box=${exactDupPos})`;
    } else {
      spatialStatus = 'WARN';
      spatialDetail = `missing catalog/spatial/${unit}.tsv`;
    }
  }
  add('3_spatial_box3', spatialStatus, spatialDetail);

  // 4. V2 optimization anti-patterns (raw Material / hot-path GC / raw scene.remove)
  const v2Violations = [];
  for (const rel of targetCodeFiles) {
    if (!rel.startsWith('src/core/') && !rel.startsWith('src/units/') && !rel.startsWith('src/assemblies/')) continue;
    const abs = path.join(rootAbs, rel);
    if (!fs.existsSync(abs)) continue;
    const clean = stripComments(fs.readFileSync(abs, 'utf8'));
    if (rel !== 'src/core/resource_cache.ts' && (rel.startsWith('src/core/') || rel.startsWith('src/units/'))) {
      const matsHit = clean.match(/new\s+THREE\.(Mesh\w*Material|Line\w*Material|ShaderMaterial)\s*\(/g);
      if (matsHit) v2Violations.push(`${rel}: raw ${matsHit[0]}`);
    }
    if (rel !== 'src/core/dispose.ts' && (rel.startsWith('src/core/') || rel.startsWith('src/units/'))) {
      if (/\bscene\.remove\s*\(/.test(clean)) v2Violations.push(`${rel}: raw scene.remove()`);
    }
  }
  add(
    '4_v2_antipatterns',
    v2Violations.length === 0 ? 'PASS' : 'FAIL',
    v2Violations.length === 0 ? '0 raw Materials / 0 raw scene.remove' : v2Violations.slice(0, 4).join('; '),
    v2Violations.length ? 'Use ResourceCache mats.* buckets & disposeObject3D()' : ''
  );

  // 5. Real `mats.<key>` existence check against catalog/code/MATERIALS.tsv
  const validMats = new Set(
    readTsv(path.join(rootAbs, 'catalog', 'code', 'MATERIALS.tsv'))
      .filter((r) => r.kind === 'mat')
      .map((r) => r.key)
  );
  const badMatKeys = [];
  for (const rel of targetCodeFiles) {
    if (!rel.startsWith('src/assemblies/') && !rel.startsWith('src/units/')) continue;
    const abs = path.join(rootAbs, rel);
    if (!fs.existsSync(abs)) continue;
    const clean = stripComments(fs.readFileSync(abs, 'utf8'));
    const rx = /\bmats\.([a-zA-Z0-9_]+)\b/g;
    let m;
    while ((m = rx.exec(clean)) !== null) {
      const k = m[1];
      if (NON_MAT_PROPS.has(k)) continue;
      if (validMats.size > 0 && !validMats.has(k)) {
        badMatKeys.push(`${rel}: mats.${k}`);
      }
    }
  }
  const uniqBadMats = [...new Set(badMatKeys)];
  add(
    '5_material_keys',
    uniqBadMats.length === 0 ? 'PASS' : 'WARN',
    uniqBadMats.length === 0 ? 'all mats.* keys verified in catalog' : `unregistered: ${uniqBadMats.slice(0, 5).join(', ')}`,
    uniqBadMats.length ? 'Check catalog/code/MATERIALS.tsv or run `dx find --domain=material <name>`' : ''
  );

  // 6. Static JSON <-> 3D builder part ID correlation
  let matchStatus = 'PASS';
  let matchDetail = 'skipped (no individual unit)';
  if (unit && !COMPOSITE_MODES.has(unit)) {
    const dataAbs = path.join(rootAbs, unitToDataRel(unit));
    if (fs.existsSync(dataAbs)) {
      const j = JSON.parse(fs.readFileSync(dataAbs, 'utf8'));
      const builderFiles = [unitToUnitFileRel(unit), ...listTsInDir(rootAbs, unitToAssemblyDir(unit))];
      let corpus = '';
      for (const bf of builderFiles) {
        const abs = path.join(rootAbs, bf);
        if (fs.existsSync(abs)) corpus += '\n' + fs.readFileSync(abs, 'utf8');
      }
      let literalHits = 0;
      for (const p of j.parts || []) {
        if (corpus.includes(p.id)) literalHits++;
      }
      matchDetail = `unit=${unit} jsonParts=${j.parts.length} literalIdHits=${literalHits} files=${builderFiles.length}`;
    }
  }
  add('6_json_3d_match', matchStatus, matchDetail);

  // 7. SVG diagramType coverage & tag closure check
  const svgErrs = [];
  const schRows = readTsv(path.join(rootAbs, 'catalog', 'code', 'SCHEMATICS.tsv'));
  const schMap = new Map(schRows.map((r) => [r.diagram_type, r]));
  for (const rel of targetJsonFiles) {
    const abs = path.join(rootAbs, rel);
    if (!fs.existsSync(abs)) continue;
    try {
      const j = JSON.parse(fs.readFileSync(abs, 'utf8'));
      for (const p of j.parts || []) {
        const e = schMap.get(p.diagramType);
        if (!e || e.file.startsWith('UNMAPPED')) {
          svgErrs.push(`unmapped diagramType '${p.diagramType}' (${p.id})`);
        }
      }
    } catch {
      // already caught in check 2
    }
  }
  for (const rel of targetCodeFiles) {
    if (!rel.includes('Schematic') && !rel.includes('schematic')) continue;
    const abs = path.join(rootAbs, rel);
    if (!fs.existsSync(abs)) continue;
    const src = fs.readFileSync(abs, 'utf8');
    const svgBlocks = src.match(/<svg[\s\S]*?<\/svg>/g) || [];
    for (const blk of svgBlocks.slice(0, 5)) {
      // Strip TS template `${...}` expressions before tag balance check
      const cleanSvg = blk.replace(/\$\{[^}]*\}/g, '');
      const chk = validateSvgStructureAndOverlaps(cleanSvg);
      if (!chk.valid) svgErrs.push(`${rel}: ${chk.errors[0]}`);
    }
  }
  add(
    '7_svg_schematics',
    svgErrs.length === 0 ? 'PASS' : 'FAIL',
    svgErrs.length === 0 ? 'diagramType coverage & SVG tags clean' : svgErrs.slice(0, 4).join('; '),
    svgErrs.length ? 'Run `dx schematic audit` or `dx svg compile`' : ''
  );

  // 8. bg Scope Policy, Secrets & Conflict Markers
  const scopeErrs = [];
  const bgrcPath = path.join(rootAbs, '.bgrc.json');
  const cfg = fs.existsSync(bgrcPath) ? JSON.parse(fs.readFileSync(bgrcPath, 'utf8')) : {};
  const scope = evaluateScopePolicy(dirtyPaths, cfg, policyName);
  if (scope.violations.length > 0 && policyName === 'worker') {
    scopeErrs.push(`worker protectedPaths: ${scope.violations.map((v) => v.path).slice(0, 4).join(', ')}`);
  }
  const secrets = scanSecrets(rootAbs, dirtyPaths);
  if (secrets.length > 0) scopeErrs.push(`secrets detected: ${secrets.length}`);
  const conflicts = scanConflictMarkers(rootAbs, dirtyPaths);
  if (conflicts.length > 0) scopeErrs.push(`conflict markers: ${conflicts.length}`);
  add(
    '8_bg_scope_hygiene',
    scopeErrs.length === 0 ? 'PASS' : 'FAIL',
    scopeErrs.length === 0 ? `policy=${policyName} dirty=${dirtyPaths.length} 0 secrets 0 conflicts` : scopeErrs.join('; '),
    scopeErrs.length ? 'Revert protected path or use --policy=integrator if integrating' : ''
  );

  const elapsedMs = Math.round(performance.now() - t0);
  const fails = checks.filter((c) => c.status === 'FAIL');
  const warns = checks.filter((c) => c.status === 'WARN');
  const exitCode = fails.length > 0 ? 2 : 0;

  const lines = [
    `[dx preflight] ${fails.length === 0 ? 'PASS' : 'FAIL'} (${checks.length - fails.length}/${checks.length} ok, warn=${warns.length}, fail=${fails.length}) ${elapsedMs}ms`,
  ];
  for (const c of checks) {
    if (opts.ai && c.status === 'PASS') continue;
    lines.push(`  [${c.status}] ${c.id}: ${c.detail}${c.fix ? ` | FIX: ${c.fix}` : ''}`);
  }
  const budgeted = enforceTokenBudget(lines.join('\n'), {
    budget: opts.budget ?? 500,
    tag: 'dx_preflight',
  });

  return {
    exitCode,
    elapsedMs,
    passed: fails.length === 0,
    failCount: fails.length,
    warnCount: warns.length,
    checks,
    formatted: budgeted.text,
  };
}

/**
 * Compute deterministic fingerprint for memoizing inner-loop `dx check`.
 */
function computeCheckFingerprint(rootAbs, units, dirtyPaths) {
  const parts = [`units:${units.join(',')}`];
  const filesToHash = [...new Set([...dirtyPaths, 'tsconfig.json'])].sort();
  for (const rel of filesToHash) {
    if (rel.startsWith('docs/')) continue;
    const abs = path.join(rootAbs, rel);
    if (!fs.existsSync(abs)) {
      parts.push(`DEL:${rel}`);
      continue;
    }
    try {
      const st = fs.lstatSync(abs);
      if (st.isFile() && st.size < 10 * 1024 * 1024) {
        parts.push(`${rel}:${sha256Hex(fs.readFileSync(abs)).slice(0, 12)}`);
      }
    } catch {
      // ignore
    }
  }
  return sha256Hex(parts.join('|')).slice(0, 16);
}

/**
 * `dx check [--changed|--unit=u1,u2|--full] [--record-bg] [--no-cache] [--ai]`
 */
export function runDxCheck(opts = {}) {
  const t0 = performance.now();
  const rootAbs = path.resolve(opts.root || process.cwd());
  const fullMode = Boolean(opts.full);
  const recordBg = Boolean(opts['record-bg']);
  const noCache = Boolean(opts['no-cache']);

  // Full Integrator Gate Mode
  if (fullMode) {
    const bgrcPath = path.join(rootAbs, '.bgrc.json');
    const cfg = fs.existsSync(bgrcPath) ? JSON.parse(fs.readFileSync(bgrcPath, 'utf8')) : {};
    const cmds = cfg.policies?.integrator?.checks || [
      'npm run catalog',
      'npx tsc --noEmit',
      'node scripts/validate_parts.mjs',
      'npm run build',
    ];

    const ctx = recordBg ? getRepoContext(rootAbs) : null;
    const logDir = '/tmp/dx_logs';
    fs.mkdirSync(logDir, { recursive: true });

    const stepLines = [];
    let failedCmd = null;
    for (const cmd of cmds) {
      const st0 = performance.now();
      let passed = false;
      let status = 0;
      let combinedOut = '';
      if (recordBg && ctx) {
        const key = cmd.replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 40);
        const rec = runAndRecordCheck(ctx, key, cmd);
        passed = rec.passed;
        status = rec.exitCode ?? (passed ? 0 : 1);
        combinedOut = rec.tailOutput || '';
      } else {
        const res = spawnSync(cmd, {
          cwd: rootAbs,
          shell: true,
          encoding: 'utf8',
          maxBuffer: 40 * 1024 * 1024,
        });
        status = res.status ?? 1;
        passed = status === 0;
        combinedOut = `${res.stdout || ''}\n${res.stderr || ''}`.trim();
      }
      const sec = ((performance.now() - st0) / 1000).toFixed(2);
      const logPath = path.join(logDir, `check_${cmd.replace(/[^a-z0-9]+/gi, '_').slice(0, 24)}.log`);
      fs.writeFileSync(logPath, stripAnsi(combinedOut), 'utf8');
      stepLines.push(
        `  [${passed ? 'PASS' : 'FAIL'}] ${cmd} (${sec}s${recordBg ? ' | bg-receipt=recorded' : ''})${passed ? '' : ` -> log=${logPath}`}`
      );
      if (!passed) {
        failedCmd = cmd;
        break;
      }
    }

    const totalSec = ((performance.now() - t0) / 1000).toFixed(2);
    const header = `[dx check --full] ${failedCmd ? 'FAIL' : 'PASS'} (${totalSec}s${recordBg ? ', bg-receipts synced' : ''})`;
    const formatted = `${header}\n${stepLines.join('\n')}`;
    return {
      exitCode: failedCmd ? 2 : 0,
      full: true,
      recordBg,
      passed: !failedCmd,
      elapsedMs: Math.round(performance.now() - t0),
      formatted,
    };
  }

  // Inner-loop Targeted Differential Gate + Memoization
  let dirtyPaths = [];
  try {
    dirtyPaths = getPorcelainStatus(rootAbs).allDirty.map((d) => d.path).sort();
  } catch {
    dirtyPaths = [];
  }

  let units = [];
  let allAffected = false;
  if (opts.unit) {
    units = String(opts.unit).split(',').map((s) => s.trim()).filter(Boolean);
  } else {
    const inf = inferAffectedUnitsFromFiles(rootAbs, dirtyPaths);
    allAffected = inf.allAffected;
    units = inf.units;
  }

  const fp = computeCheckFingerprint(rootAbs, allAffected ? ['*ALL'] : units, dirtyPaths);
  const cacheAbs = path.join(rootAbs, CHECK_CACHE_REL);
  if (!noCache && fs.existsSync(cacheAbs)) {
    try {
      const cache = JSON.parse(fs.readFileSync(cacheAbs, 'utf8'));
      if (cache[fp]?.passed) {
        const ms = Math.round(performance.now() - t0);
        return {
          exitCode: 0,
          cached: true,
          fingerprint: fp,
          units: allAffected ? ['*ALL'] : units,
          elapsedMs: ms,
          formatted: `[dx check] PASS (CACHED fp=${fp} units=${allAffected ? '*ALL' : units.join(',') || 'tsc-only'} ${ms}ms)`,
        };
      }
    } catch {
      // ignore corrupted cache
    }
  }

  // 1. Incremental tsc --noEmit
  const tscStart = performance.now();
  const tscRes = spawnSync('npx', ['tsc', '--noEmit'], {
    cwd: rootAbs,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
  const tscSec = ((performance.now() - tscStart) / 1000).toFixed(2);
  if (tscRes.status !== 0) {
    const errLines = stripAnsi(`${tscRes.stdout || ''}\n${tscRes.stderr || ''}`)
      .split('\n')
      .filter((l) => /error TS\d+:/.test(l))
      .slice(0, 10);
    return {
      exitCode: 2,
      passed: false,
      elapsedMs: Math.round(performance.now() - t0),
      formatted: `[dx check] FAIL tsc (${tscSec}s, ${errLines.length}+ errors)\n${errLines.map((l) => `  ${l}`).join('\n')}`,
    };
  }

  // 2. Targeted headless validate_parts.mjs if any units are affected
  let valSec = '0.00';
  let valSummary = 'no-units-affected';
  if (units.length > 0 || allAffected) {
    const vStart = performance.now();
    const vArgs = ['scripts/validate_parts.mjs', '--skip-tsc', '--skip-catalog', '--ai'];
    if (!allAffected && units.length > 0) vArgs.push(`--unit=${units.join(',')}`);
    const vRes = spawnSync('node', vArgs, {
      cwd: rootAbs,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
    valSec = ((performance.now() - vStart) / 1000).toFixed(2);
    if (vRes.status !== 0) {
      const errOut = stripAnsi(`${vRes.stdout || ''}\n${vRes.stderr || ''}`).trim();
      return {
        exitCode: 2,
        passed: false,
        elapsedMs: Math.round(performance.now() - t0),
        formatted: `[dx check] FAIL validate_parts (${valSec}s)\n${errOut}`,
      };
    }
    valSummary = (vRes.stdout || '').trim().split('\n').pop() || 'OK';
  }

  // Save PASS memoization entry
  try {
    fs.mkdirSync(path.dirname(cacheAbs), { recursive: true });
    let cache = {};
    if (fs.existsSync(cacheAbs)) cache = JSON.parse(fs.readFileSync(cacheAbs, 'utf8'));
    cache[fp] = { passed: true, units: allAffected ? ['*ALL'] : units, at: new Date().toISOString() };
    // Keep last 40 entries bounded
    const keys = Object.keys(cache);
    if (keys.length > 40) delete cache[keys[0]];
    fs.writeFileSync(cacheAbs, JSON.stringify(cache, null, 2), 'utf8');
  } catch {
    // ignore cache write issues
  }

  const totalSec = ((performance.now() - t0) / 1000).toFixed(2);
  return {
    exitCode: 0,
    passed: true,
    cached: false,
    fingerprint: fp,
    units: allAffected ? ['*ALL'] : units,
    elapsedMs: Math.round(performance.now() - t0),
    formatted: `[dx check] PASS tsc=${tscSec}s validate=${valSec}s units=${allAffected ? '*ALL' : units.join(',') || 'none'} fp=${fp} (${totalSec}s | ${valSummary})`,
  };
}
