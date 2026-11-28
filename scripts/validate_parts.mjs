#!/usr/bin/env node
/**
 * CI-Grade Hyper-Accelerated Automated Guardrail for the Universal V2 WebGL Optimization Architecture.
 * Automatically scans EVERY unit registered in `src/units/registry.ts` and EVERY JSON in `src/data/`.
 *
 * Hyper-Optimizations (100% lossless verification invariants preserved):
 *   - Async overlapped Syntax Check + Incremental `tsc --noEmit` concurrent with static checks & Worker Pool
 *   - Content-fingerprinted unified V2 ESM bundle (`scripts/lib/hyper_cache.mjs`) shared across all workers
 *   - Multi-core `worker_threads` pool with LPT unit scheduling + compiler-verified pure rawBuild sharing
 *   - Cryptographically sound transitive SHA-256 per-unit cache (1-byte change in core/engine/unit/assembly/JSON
 *     immediately invalidates affected units; pass `--full` or `--no-cache` to force all 88 builds from scratch!)
 *   - Parallel async I/O for JSON integrity, static lints, and catalog freshness checks
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execSync, spawn } from 'node:child_process';
import { Worker } from 'node:worker_threads';
import { pathToFileURL } from 'node:url';
import {
  computeFilesSha256,
  ensureUnifiedV2RuntimeBundlePath,
  readCacheJson,
  writeCacheJson,
} from './lib/hyper_cache.mjs';

const ROOT = process.cwd();
const V2_SCAN_DIRS = ['src/core', 'src/units'];
const DATA_DIR = 'src/data';
const COMPOSITE_UNIT_IDS = new Set(['integrated', 'camera_body']);
const FORCE_FULL = process.argv.includes('--full') || process.argv.includes('--no-cache');
const SKIP_CATALOG = process.argv.includes('--skip-catalog');
const CACHE_KEY = 'validate_parts_v2';

// Opt-in targeted / low-token CLI flags (default no-arg execution remains 100% identical!)
const ARGV = process.argv.slice(2);
const AI_MODE = ARGV.includes('--ai');
const SKIP_TSC = ARGV.includes('--skip-tsc');
const CHANGED_ONLY = ARGV.includes('--changed');
const UNIT_ARG = ARGV.find((a) => a.startsWith('--unit='));
let UNIT_FILTER = UNIT_ARG
  ? new Set(UNIT_ARG.slice(7).split(',').map((s) => s.trim()).filter(Boolean))
  : null;

if (CHANGED_ONLY && !UNIT_FILTER) {
  try {
    const por = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' });
    const dirty = por
      .split('\n')
      .map((l) => l.slice(3).trim().split(' -> ').pop())
      .filter(Boolean);
    const graphPath = path.join(ROOT, 'catalog/code/GRAPH.tsv');
    const inferred = new Set();
    let allHit = false;
    if (fs.existsSync(graphPath)) {
      const gMap = new Map();
      for (const line of fs.readFileSync(graphPath, 'utf8').split('\n').slice(1)) {
        if (!line) continue;
        const cols = line.split('\t');
        if (cols[0] && cols[3]) gMap.set(cols[0], cols[3]);
      }
      for (const rel of dirty) {
        const aff = gMap.get(rel);
        if (!aff || aff === '-') continue;
        if (aff.startsWith('*ALL')) allHit = true;
        else aff.split(',').forEach((u) => u && inferred.add(u));
      }
    }
    if (!allHit && inferred.size > 0) UNIT_FILTER = inferred;
  } catch {
    // fallback to full unit scan
  }
}

let failCount = 0;
const reportLines = [];

function pass(section, detail) {
  const line = `[PASS] ${section}: ${detail}`;
  reportLines.push(line);
  if (!AI_MODE) console.log(line);
}

function fail(section, detail) {
  failCount++;
  const line = `[FAIL] ${section}: ${detail}`;
  reportLines.push(line);
  console.error(line);
}

function spawnAsync(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd: opts.cwd || ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: Boolean(opts.shell),
    });
    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (d) => (stdout += d.toString('utf8')));
    child.stderr?.on('data', (d) => (stderr += d.toString('utf8')));
    child.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
    child.on('error', (err) => resolve({ code: 1, stdout, stderr: String(err) }));
  });
}

function listTsFiles(dirRel) {
  const abs = path.join(ROOT, dirRel);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const full = path.join(abs, entry.name);
    if (entry.isDirectory()) {
      out.push(...listTsFiles(path.relative(ROOT, full)));
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) {
      out.push(path.relative(ROOT, full));
    }
  }
  return out.sort();
}

function listJsonFiles(dirRel) {
  const abs = path.join(ROOT, dirRel);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => path.join(dirRel, f));
}

function extractFunctionBody(source, methodPattern) {
  const m = source.match(methodPattern);
  if (!m || m.index === undefined) return null;
  const openIdx = source.indexOf('{', m.index + m[0].length - 1);
  if (openIdx === -1) return null;
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  for (let i = openIdx; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }
    if (inSingle) {
      if (ch === '\\') i++;
      else if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      if (ch === '\\') i++;
      else if (ch === '"') inDouble = false;
      continue;
    }
    if (inTemplate) {
      if (ch === '\\') i++;
      else if (ch === '`') inTemplate = false;
      continue;
    }
    if (ch === '/' && next === '/') {
      inLineComment = true;
      i++;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      continue;
    }
    if (ch === '`') {
      inTemplate = true;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return source.slice(openIdx, i + 1);
    }
  }
  return null;
}

function stripComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

function parseRegistryFileMap() {
  const src = fs.readFileSync(path.join(ROOT, 'src/units/registry.ts'), 'utf8');
  const map = new Map();
  const re =
    /unitId:\s*'([^']+)',\s*declaredPartCount:\s*(\d+),\s*loadMeta:\s*makeLazyJsonMetaLoader\('[^']+',\s*\(\)\s*=>\s*import\('\.\.\/data\/([^']+)'\)\),\s*load:\s*async\s*\(\)\s*=>\s*\(await import\('\.\/([^']+)'\)\)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    map.set(m[1], {
      unitId: m[1],
      declaredPartCount: Number(m[2]),
      dataFile: `src/data/${m[3]}`,
      unitFile: `src/units/${m[4]}.ts`,
    });
  }
  return map;
}

function computeUnitDependencyHash(unitId, regInfo, coreHash, allAssembliesHash) {
  const deps = [regInfo.unitFile, regInfo.dataFile];
  if (COMPOSITE_UNIT_IDS.has(unitId)) {
    return computeFilesSha256(deps) + ':' + coreHash + ':' + allAssembliesHash;
  }
  const asmSub = path.join(ROOT, 'src/assemblies', unitId);
  if (fs.existsSync(asmSub)) deps.push(`src/assemblies/${unitId}`);
  // Special mappings where assembly directory name differs slightly from unitId
  if (unitId === 'micro_v2' && fs.existsSync(path.join(ROOT, 'src/assemblies/micro'))) {
    deps.push('src/assemblies/micro');
  }
  if (unitId === 'bionz_v2' && fs.existsSync(path.join(ROOT, 'src/assemblies/bionz'))) {
    deps.push('src/assemblies/bionz');
  }
  if (unitId === 'mishoe' && fs.existsSync(path.join(ROOT, 'src/assemblies/mi_shoe'))) {
    deps.push('src/assemblies/mi_shoe');
  }
  // Common assembly helpers imported across units
  for (const shared of ['src/assemblies/types.ts', 'src/assemblies/materials.ts', 'src/assemblies/camera_macro_shared.ts']) {
    if (fs.existsSync(path.join(ROOT, shared))) deps.push(shared);
  }
  return computeFilesSha256(deps) + ':' + coreHash;
}

function runWorkerBatch(bundlePath, unitIds) {
  return new Promise((resolve, reject) => {
    const workerPath = path.join(ROOT, 'scripts/lib/validate_worker.mjs');
    const w = new Worker(workerPath, { workerData: { bundlePath, unitIds } });
    let settled = false;
    w.on('message', (msg) => {
      settled = true;
      resolve(msg);
    });
    w.on('error', (err) => {
      if (!settled) {
        settled = true;
        reject(err);
      }
    });
    w.on('exit', (code) => {
      if (!settled) {
        settled = true;
        reject(new Error(`validate_worker exited unexpectedly with code ${code}`));
      }
    });
  });
}

if (!AI_MODE) {
  console.log('====================================================================');
  console.log(' Universal V2 WebGL Optimization CI Guardrail (validate_parts.mjs)');
  console.log('====================================================================');
}

// Launch 1-1 Syntax Check & 1-2 TypeScript Build ASYNCHRONOUSLY right away so they overlap!
const syntaxPromise = Promise.all([
  spawnAsync(process.execPath, ['--check', 'scripts/validate_parts.mjs']),
  spawnAsync(process.execPath, ['--check', 'scripts/generate_catalogs.mjs']),
  spawnAsync(process.execPath, ['--check', 'scripts/lib/validate_worker.mjs']),
]).then((results) => results.find((r) => r.code !== 0) || results[0]);

const tscBin = path.join(ROOT, 'node_modules', '.bin', 'tsc');
const tscPromise = SKIP_TSC
  ? Promise.resolve({ code: 0, skipped: true, stdout: '', stderr: '' })
  : fs.existsSync(tscBin)
    ? spawnAsync(tscBin, ['--noEmit'])
    : spawnAsync('npx', ['tsc', '--noEmit']);

// -----------------------------------------------------------------------------
// 2. Cross-Unit Pure JSON Data Integrity Validation (src/data/*.json) — Async Parallel
// -----------------------------------------------------------------------------
const jsonFiles = listJsonFiles(DATA_DIR);
const parsedJsonsByRel = new Map();

const dataIntegrityPromise = (async () => {
  try {
    const contents = await Promise.all(
      jsonFiles.map(async (rel) => [rel, JSON.parse(await fsp.readFile(path.join(ROOT, rel), 'utf8'))])
    );
    const globalIds = new Map();
    const dataErrors = [];
    let totalPartsChecked = 0;

    const checkVec3 = (vec, label, partId, file) => {
      if (!Array.isArray(vec) || vec.length !== 3) {
        dataErrors.push(`${file}/${partId}: ${label} is not a 3-tuple`);
        return;
      }
      for (let i = 0; i < 3; i++) {
        const v = vec[i];
        if (typeof v !== 'number' || !Number.isFinite(v) || Math.abs(v) > 2000) {
          dataErrors.push(`${file}/${partId}: ${label}[${i}] invalid (${v})`);
        }
      }
    };

    const requiredStrings = [
      'title',
      'subtitle',
      'category',
      'plainAnalogy',
      'summary',
      'nextGenInnovation',
      'diagramType',
      'swatchColor',
      'groupKey',
    ];

    for (const [relFile, jsonData] of contents) {
      parsedJsonsByRel.set(relFile, jsonData);
      const isComposite = COMPOSITE_UNIT_IDS.has(jsonData.unitId);
      const localIds = new Set();

      if (
        typeof jsonData.declaredPartCount !== 'number' ||
        jsonData.declaredPartCount !== jsonData.parts.length
      ) {
        dataErrors.push(
          `${relFile}: declaredPartCount (${jsonData.declaredPartCount}) !== parts.length (${jsonData.parts.length})`
        );
      }

      for (const p of jsonData.parts) {
        if (!p.id || typeof p.id !== 'string') {
          dataErrors.push(`${relFile}: missing/invalid part id`);
          continue;
        }
        if (localIds.has(p.id)) {
          dataErrors.push(`${relFile}: duplicate local part id '${p.id}'`);
        }
        localIds.add(p.id);

        if (!isComposite) {
          if (globalIds.has(p.id)) {
            dataErrors.push(
              `Cross-unit duplicate part id '${p.id}' in ${relFile} and ${globalIds.get(p.id)}`
            );
          } else {
            globalIds.set(p.id, relFile);
          }
        }

        checkVec3(p.assembledPos, 'assembledPos', p.id, relFile);
        checkVec3(p.explodeOffset, 'explodeOffset', p.id, relFile);
        if (p.integratedExplodeOffset !== undefined) {
          checkVec3(p.integratedExplodeOffset, 'integratedExplodeOffset', p.id, relFile);
        }

        for (let s = 0; s < requiredStrings.length; s++) {
          const field = requiredStrings[s];
          if (typeof p[field] !== 'string' || p[field].trim().length === 0) {
            dataErrors.push(`${relFile}/${p.id}: missing or empty required field '${field}'`);
          }
        }
        if (!Array.isArray(p.opticsAndPhysics) || p.opticsAndPhysics.length === 0) {
          dataErrors.push(`${relFile}/${p.id}: opticsAndPhysics must be a non-empty array`);
        }
        if (!Array.isArray(p.specs) || p.specs.length === 0) {
          dataErrors.push(`${relFile}/${p.id}: specs must be a non-empty array`);
        }
        totalPartsChecked++;
      }
    }

    return { ok: jsonFiles.length > 0 && dataErrors.length === 0, dataErrors, totalPartsChecked, uniqueCount: globalIds.size };
  } catch (err) {
    return { ok: false, dataErrors: [String(err)], totalPartsChecked: 0, uniqueCount: 0 };
  }
})();

// -----------------------------------------------------------------------------
// 3. Optimization Anti-Pattern Static Lint (All src/core/ + src/units/) — Async Parallel
// -----------------------------------------------------------------------------
const v2Files = V2_SCAN_DIRS.flatMap((d) => listTsFiles(d));
const staticLintPromise = (async () => {
  const sources = await Promise.all(
    v2Files.map(async (rel) => [rel, await fsp.readFile(path.join(ROOT, rel), 'utf8')])
  );
  const rawMatViolations = [];
  const allocHotPathViolations = [];
  const unsafeRemoveViolations = [];

  const hotMethods = [
    ['updateExplode', /\bupdateExplode\s*\(/],
    ['updatePhysics', /\bupdatePhysics\s*\(/],
    ['updateExplodeGuides', /\bupdateExplodeGuides\s*\(/],
    ['render', /\bpublic\s+render\s*\(/],
    ['pickWithRay', /\bpickWithRay\s*\(/],
  ];

  for (const [rel, src] of sources) {
    const clean = stripComments(src);

    if (rel !== 'src/core/resource_cache.ts') {
      const matMatches = clean.match(
        /new\s+THREE\.(Mesh\w*Material|Line\w*Material|PointsMaterial|SpriteMaterial|ShaderMaterial|RawShaderMaterial)\s*\(/g
      );
      if (matMatches && matMatches.length > 0) {
        rawMatViolations.push(`${rel}: ${matMatches.join(', ')}`);
      }
    }

    for (const [name, pattern] of hotMethods) {
      const body = extractFunctionBody(src, pattern);
      if (!body) continue;
      const cleanBody = stripComments(body);
      const allocs = cleanBody.match(
        /new\s+THREE\.(Vector[234]|Matrix[34]|Quaternion|Color|Box3|Sphere|Euler|Ray)\s*\(|\.clone\s*\(/g
      );
      if (allocs && allocs.length > 0) {
        allocHotPathViolations.push(`${rel}#${name}: ${allocs.join(', ')}`);
      }
    }

    if (rel !== 'src/core/dispose.ts') {
      const rawSceneRemove = clean.match(/\bscene\.remove\s*\(/g);
      if (rawSceneRemove && rawSceneRemove.length > 0) {
        unsafeRemoveViolations.push(`${rel}: ${rawSceneRemove.join(', ')}`);
      }
    }
  }

  return { rawMatViolations, allocHotPathViolations, unsafeRemoveViolations };
})();

// Wait for Syntax + Data Integrity + Static Lint first (tsc continues running concurrently!)
const [syntaxRes, dataRes, lintRes] = await Promise.all([
  syntaxPromise,
  dataIntegrityPromise,
  staticLintPromise,
]);

if (syntaxRes.code === 0) {
  pass('1-1 Syntax Check', 'node --check scripts/validate_parts.mjs & scripts/generate_catalogs.mjs exited 0');
} else {
  fail('1-1 Syntax Check', syntaxRes.stderr || syntaxRes.stdout);
}

// -----------------------------------------------------------------------------
// 4. Headless Runtime Verification (Parallel Worker Pool + Transitive SHA-256 Cache)
// -----------------------------------------------------------------------------
let runtimeSectionOk = true;
const allUnitMatrices = {};
let registryList = [];
let cachedUnitsReused = 0;
let runtimeUnitsVerified = 0;

try {
  const regMap = parseRegistryFileMap();
  const regEntries = [...regMap.values()];
  registryList = regEntries.map((e) => e.unitId);

  const globalIds = new Set();
  let dupGlobal = 0;
  let countMismatch = false;
  for (const e of regEntries) {
    const jsonData = parsedJsonsByRel.get(e.dataFile);
    if (!jsonData || jsonData.declaredPartCount !== e.declaredPartCount) {
      countMismatch = true;
      fail(
        '2-2 Registry Count',
        `${e.unitId}: registry=${e.declaredPartCount}, json=${jsonData?.declaredPartCount}`
      );
    }
    if (jsonData && !COMPOSITE_UNIT_IDS.has(e.unitId)) {
      for (const p of jsonData.parts) {
        if (globalIds.has(p.id)) dupGlobal++;
        globalIds.add(p.id);
      }
    }
  }

  if (dataRes.ok) {
    pass(
      '2-1 Data Integrity',
      `${jsonFiles.length} JSON file(s), ${dataRes.totalPartsChecked} parts (${dataRes.uniqueCount} unique individual IDs) valid, 0 duplicates, 0 NaN/Infinity, 100% metadata complete`
    );
  } else {
    fail(
      '2-1 Data Integrity',
      dataRes.dataErrors.slice(0, 12).join('; ') +
        (dataRes.dataErrors.length > 12 ? ` (+${dataRes.dataErrors.length - 12} more)` : '')
    );
  }

  if (lintRes.rawMatViolations.length === 0) {
    pass(
      '3-1 Lint: Cached Materials',
      `0 direct new THREE.Mesh*/Line*Material outside src/core/resource_cache.ts (${v2Files.length} files scanned)`
    );
  } else {
    fail('3-1 Lint: Cached Materials', lintRes.rawMatViolations.join(' | '));
  }

  if (lintRes.allocHotPathViolations.length === 0) {
    pass(
      '3-2 Lint: Zero-GC Hot Paths',
      '0 Vector/Matrix/Quaternion/Color/Box3/clone allocations in updateExplode/updatePhysics/render/pickWithRay'
    );
  } else {
    fail('3-2 Lint: Zero-GC Hot Paths', lintRes.allocHotPathViolations.join(' | '));
  }

  if (lintRes.unsafeRemoveViolations.length === 0) {
    pass('3-3 Lint: Safe Disposal', '0 raw scene.remove() calls bypassing disposeObject3D');
  } else {
    fail('3-3 Lint: Safe Disposal', lintRes.unsafeRemoveViolations.join(' | '));
  }

  if (regEntries.length > 0 && dupGlobal === 0 && !countMismatch) {
    pass(
      '2-2 Registry & Scope',
      `Registered units (${regEntries.length}): [${registryList.join(', ')}], unique individual IDs: ${globalIds.size}, 0 cross-unit duplicates`
    );
  } else if (!countMismatch) {
    fail('2-2 Registry & Scope', `Invalid registry state: count=${regEntries.length}, dup=${dupGlobal}`);
  }

  // Compute transitive SHA-256 hashes per unit to skip cryptographically unchanged units unless --full
  const coreHash = computeFilesSha256([
    'src/core',
    'src/engine',
    'src/units/registry.ts',
    'scripts/validate_parts.mjs',
    'scripts/lib/validate_worker.mjs',
  ]);
  const allAssembliesHash = computeFilesSha256(['src/assemblies']);
  const prevCache = FORCE_FULL ? null : readCacheJson(CACHE_KEY);
  const prevEntries = prevCache?.version === 2 ? prevCache.units || {} : {};
  const nextCacheUnits = { ...prevEntries };

  const unitsToVerify = UNIT_FILTER
    ? regEntries.filter((e) => UNIT_FILTER.has(e.unitId))
    : regEntries;

  const unitHashes = new Map();
  const unitsToRun = [];
  for (const e of unitsToVerify) {
    const h = computeUnitDependencyHash(e.unitId, e, coreHash, allAssembliesHash);
    unitHashes.set(e.unitId, h);
    const hit = prevEntries[e.unitId];
    if (!FORCE_FULL && hit && hit.hash === h && hit.metrics) {
      allUnitMatrices[e.unitId] = hit.metrics;
      cachedUnitsReused++;
    } else {
      unitsToRun.push(e);
    }
  }

  if (unitsToRun.length > 0) {
    const bundlePath = ensureUnifiedV2RuntimeBundlePath();
    // LPT scheduling: heaviest units first across worker_threads!
    unitsToRun.sort((a, b) => b.declaredPartCount - a.declaredPartCount);
    const workerCount = Math.min(Math.max(1, os.cpus().length), unitsToRun.length);
    const buckets = Array.from({ length: workerCount }, () => ({ ids: [], load: 0 }));
    for (const u of unitsToRun) {
      buckets.sort((a, b) => a.load - b.load);
      buckets[0].ids.push(u.unitId);
      buckets[0].load += u.declaredPartCount;
    }

    const workerOutputs = await Promise.all(
      buckets.filter((b) => b.ids.length > 0).map((b) => runWorkerBatch(bundlePath, b.ids))
    );

    const failedUnitIds = new Set();
    for (const out of workerOutputs) {
      for (const f of out.failures) {
        runtimeSectionOk = false;
        fail(f.section, f.detail);
        const m = f.section.match(/\(([^/)]+)/);
        if (m) failedUnitIds.add(m[1]);
      }
      for (const [uid, metrics] of Object.entries(out.results)) {
        allUnitMatrices[uid] = metrics;
        runtimeUnitsVerified++;
        if (!failedUnitIds.has(uid)) {
          nextCacheUnits[uid] = { hash: unitHashes.get(uid), metrics };
        }
      }
    }
    writeCacheJson(CACHE_KEY, { version: 2, updatedAt: new Date().toISOString(), units: nextCacheUnits });
  }

  if (runtimeSectionOk) {
    const modeNote =
      cachedUnitsReused > 0
        ? ` (${runtimeUnitsVerified} built fresh, ${cachedUnitsReused} SHA-256 verified cached)`
        : ` (${runtimeUnitsVerified} built fresh across ${Math.min(os.cpus().length, Math.max(1, unitsToVerify.length))} workers)`;
    pass(
      '4-6 Tier Scaling & Budget Gates',
      `All ${unitsToVerify.length} unit(s) passed draw-call budgets, LITE <= STD <= HIGH <= ULTRA scaling, DPR caps (1.0/1.0/1.5/2.0), and 0 post-dispose cache refs${modeNote}`
    );
    pass(
      '3-4 Runtime Invariants',
      `All ${unitsToVerify.length} unit(s) verified: matrixAutoUpdate=false (100%), JSON=3D (100%), reverse-lookup (100%), zero-NaN explode, 2-stage AABB raycast + drag-pause + 30Hz throttle, zero-leak dispose`
    );
  }

  if (!AI_MODE) {
    console.log('\n[Universal V2 4-Tier Matrix]');
    for (const uid of registryList) {
      const m = allUnitMatrices[uid];
      if (!m) continue;
      console.log(
        `  ${uid.padEnd(13)} | LITE: ${String(m.standard_lite.drawCalls).padStart(2)}dc / ${String(m.standard_lite.triangles).padStart(7)} tris | STD: ${String(m.standard.drawCalls).padStart(2)}dc / ${String(m.standard.triangles).padStart(7)} tris | HIGH: ${String(m.high.drawCalls).padStart(2)}dc / ${String(m.high.triangles).padStart(7)} tris | ULTRA: ${String(m.ultra.drawCalls).padStart(2)}dc / ${String(m.ultra.triangles).padStart(7)} tris | Refs:0`
      );
    }
  }
} catch (err) {
  fail('4 Runtime Verification', err instanceof Error ? err.stack || err.message : String(err));
}

// Await overlapped TypeScript check
const tscRes = await tscPromise;
if (tscRes.skipped) {
  pass('1-2 TypeScript Build', 'Skipped via --skip-tsc flag');
} else if (tscRes.code === 0) {
  pass('1-2 TypeScript Build', 'npx tsc --noEmit passed with 0 errors');
} else {
  fail('1-2 TypeScript Build', tscRes.stdout || tscRes.stderr);
}

// -----------------------------------------------------------------------------
// 5. 3-Tier Part Catalog Freshness Check (L0 / L1 / L2 + FLOW 2-Book Manuals)
// -----------------------------------------------------------------------------
if (SKIP_CATALOG) {
  pass('5-1 Catalog Freshness', 'Skipped via --skip-catalog flag');
} else {
  try {
    const catErrors = [];
    const indexPath = path.join(ROOT, 'catalog/INDEX.tsv');
    const allNamesPath = path.join(ROOT, 'catalog/ALL_NAMES.txt');
    const book1Path = path.join(ROOT, 'AGENTS.md');
    const book2Path = path.join(ROOT, 'README.md');

    for (const [label, p] of [
      ['catalog/INDEX.tsv', indexPath],
      ['catalog/ALL_NAMES.txt', allNamesPath],
      ['AGENTS.md', book1Path],
      ['README.md', book2Path],
    ]) {
      if (!fs.existsSync(p)) catErrors.push(`Missing required file ${label}`);
    }

    if (fs.existsSync(book1Path)) {
      const b1Bytes = fs.statSync(book1Path).size;
      if (b1Bytes > 24576) {
        catErrors.push(`AGENTS.md (FLOW Book 1) exceeds 24 kB budget (${b1Bytes} bytes)`);
      }
    }

    if (fs.existsSync(indexPath) && fs.existsSync(allNamesPath)) {
      const [indexRaw, allNamesText] = await Promise.all([
        fsp.readFile(indexPath, 'utf8'),
        fsp.readFile(allNamesPath, 'utf8'),
      ]);
      const indexLines = indexRaw
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0 && !l.startsWith('#'));
      const indexByMode = new Map();
      for (let i = 1; i < indexLines.length; i++) {
        const cols = indexLines[i].split('\t');
        if (cols.length >= 11) {
          indexByMode.set(cols[0], {
            kind: cols[1],
            parts: Number.parseInt(cols[2], 10),
            dataFile: cols[8],
            l1File: cols[9],
            l2File: cols[10],
          });
        }
      }

      let checkedModes = 0;
      await Promise.all(
        jsonFiles.map(async (relJson) => {
          const jsonData = parsedJsonsByRel.get(relJson);
          if (!jsonData) return;
          const mode = jsonData.unitId;
          const jsonIds = new Set(jsonData.parts.map((p) => p.id));
          const expectedCount = jsonData.parts.length;
          const idxEntry = indexByMode.get(mode);
          if (!idxEntry) {
            catErrors.push(`catalog/INDEX.tsv missing mode '${mode}'`);
            return;
          }
          if (idxEntry.parts !== expectedCount) {
            catErrors.push(
              `INDEX.tsv part count mismatch for '${mode}' (catalog=${idxEntry.parts}, json=${expectedCount})`
            );
          }

          const l1Path = path.join(ROOT, idxEntry.l1File);
          const l2Path = path.join(ROOT, idxEntry.l2File);
          if (!fs.existsSync(l1Path)) {
            catErrors.push(`Missing L1 file ${idxEntry.l1File}`);
          } else {
            const l1Raw = await fsp.readFile(l1Path, 'utf8');
            const firstLine = l1Raw.slice(0, l1Raw.indexOf('\n'));
            if (!firstLine.includes(`# ${mode} (${expectedCount}p |`)) {
              catErrors.push(`${idxEntry.l1File} header count mismatch (${firstLine})`);
            }
          }

          if (!COMPOSITE_UNIT_IDS.has(mode)) {
            if (!allNamesText.includes(`# ${mode} (${expectedCount}p |`)) {
              catErrors.push(
                `catalog/ALL_NAMES.txt missing or stale section for '${mode}' (${expectedCount}p)`
              );
            }
          }

          if (!fs.existsSync(l2Path)) {
            catErrors.push(`Missing L2 file ${idxEntry.l2File}`);
          } else {
            const l2Raw = await fsp.readFile(l2Path, 'utf8');
            const l2Lines = l2Raw.split('\n').filter((l) => l.trim().length > 0);
            const l2Ids = new Set();
            for (let i = 1; i < l2Lines.length; i++) {
              const id = l2Lines[i].split('\t')[0];
              if (id) l2Ids.add(id);
            }
            if (l2Ids.size !== expectedCount) {
              catErrors.push(
                `${idxEntry.l2File} row count mismatch (catalog=${l2Ids.size}, json=${expectedCount})`
              );
            } else {
              for (const jid of jsonIds) {
                if (!l2Ids.has(jid)) {
                  catErrors.push(`${idxEntry.l2File} missing part id '${jid}'`);
                  break;
                }
              }
            }
          }
          checkedModes++;
        })
      );

      if (indexByMode.size !== jsonFiles.length) {
        catErrors.push(
          `INDEX.tsv mode count (${indexByMode.size}) !== src/data/*.json count (${jsonFiles.length})`
        );
      }

      if (catErrors.length === 0) {
        const b1Bytes = fs.statSync(book1Path).size;
        pass(
          '5-1 Catalog Freshness',
          `All ${checkedModes} modes L0/L1/L2 100% synchronized with src/data/*.json, FLOW Book1(AGENTS.md)=${b1Bytes}B`
        );
      } else {
        fail(
          '5-1 Catalog Freshness',
          `${catErrors.slice(0, 8).join('; ')}${catErrors.length > 8 ? ` (+${catErrors.length - 8} more)` : ''} — Run "npm run catalog" to synchronize catalogs`
        );
      }
    } else {
      fail(
        '5-1 Catalog Freshness',
        `${catErrors.join('; ')} — Run "npm run catalog" to generate catalogs`
      );
    }
  } catch (err) {
    fail('5-1 Catalog Freshness', String(err));
  }
}

if (AI_MODE) {
  const scopeTag = UNIT_FILTER ? `units=[${[...UNIT_FILTER].join(',')}]` : 'units=ALL';
  if (failCount === 0) {
    console.log(`[validate_parts] PASS checks=${reportLines.length} failures=0 ${scopeTag} Refs:0`);
    process.exit(0);
  } else {
    console.error(`[validate_parts] FAIL failures=${failCount} ${scopeTag}`);
    process.exit(1);
  }
}

console.log('====================================================================');
if (failCount === 0) {
  console.log(`ALL CHECKS PASSED (${reportLines.length} checks, 0 failures)`);
  process.exit(0);
} else {
  console.error(`VALIDATION FAILED (${failCount} failure(s))`);
  process.exit(1);
}
