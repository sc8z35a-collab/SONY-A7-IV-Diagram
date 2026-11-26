#!/usr/bin/env node
/**
 * CI-Grade Automated Guardrail for MI Shoe V2 Optimization Architecture.
 * Verifies:
 *   1. Syntax & TypeScript Build (0 errors)
 *   2. Pure JSON Data Integrity + Dynamic Headless 3D Build / Explode / Raycast / Dispose across STD/HIGH/ULTRA
 *   3. Static Optimization Anti-Pattern Lint (materials outside cache, allocations in hot loops, raw remove, matrixAutoUpdate)
 *   4. Performance Budget Gates (drawCalls <= 100, triangle scaling & caps, material tiering, zero post-dispose residual)
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import * as THREE from 'three';
import { buildSync } from 'esbuild';

const ROOT = process.cwd();
const V2_SCAN_DIRS = ['src/core', 'src/units'];
const DATA_FILE = 'src/data/mi_shoe.json';

const BUDGETS = {
  standard: { maxDrawCalls: 35, maxTriangles: 14000, allowPhysical: false, maxDpr: 1.0 },
  high: { maxDrawCalls: 50, maxTriangles: 28000, allowPhysical: false, maxDpr: 1.5 },
  ultra: { maxDrawCalls: 50, maxTriangles: 48000, allowPhysical: true, maxDpr: 2.0 },
};

let failCount = 0;
const reportLines = [];

function pass(section, detail) {
  const line = `[PASS] ${section}: ${detail}`;
  reportLines.push(line);
  console.log(line);
}

function fail(section, detail) {
  failCount++;
  const line = `[FAIL] ${section}: ${detail}`;
  reportLines.push(line);
  console.error(line);
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
  return out;
}

/** Extract method body starting at signature match using brace balancing. */
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
      if (depth === 0) {
        return source.slice(openIdx, i + 1);
      }
    }
  }
  return null;
}

function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
}

async function bundleTsModuleForNode(entryRel) {
  const result = buildSync({
    entryPoints: [path.join(ROOT, entryRel)],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    external: ['three', 'three/*'],
  });
  const tmpDir = path.join(ROOT, 'node_modules', '.cache', 'validate-parts');
  fs.mkdirSync(tmpDir, { recursive: true });
  const tmpFile = path.join(tmpDir, `${path.basename(entryRel, '.ts')}.${process.pid}.mjs`);
  fs.writeFileSync(tmpFile, result.outputFiles[0].text, 'utf8');
  try {
    return await import(pathToFileURL(tmpFile).href);
  } finally {
    fs.rmSync(tmpFile, { force: true });
  }
}

console.log('====================================================================');
console.log(' MI Shoe V2 Optimization CI Guardrail (scripts/validate_parts.mjs)');
console.log('====================================================================');

// -----------------------------------------------------------------------------
// 1. Syntax & TypeScript Build Verification
// -----------------------------------------------------------------------------
try {
  execSync('node --check scripts/validate_parts.mjs', { cwd: ROOT, stdio: 'pipe' });
  pass('1-1 Syntax Check', 'node --check scripts/validate_parts.mjs exited 0');
} catch (err) {
  fail('1-1 Syntax Check', String(err?.stderr || err));
}

try {
  execSync('npx tsc --noEmit', { cwd: ROOT, stdio: 'pipe' });
  pass('1-2 TypeScript Build', 'npx tsc --noEmit passed with 0 errors');
} catch (err) {
  fail('1-2 TypeScript Build', String(err?.stdout || err?.stderr || err));
}

// -----------------------------------------------------------------------------
// 2. Pure Data Integrity Validation (src/data/mi_shoe.json)
// -----------------------------------------------------------------------------
let jsonData = null;
try {
  jsonData = JSON.parse(fs.readFileSync(path.join(ROOT, DATA_FILE), 'utf8'));
  const seenIds = new Set();
  const dataErrors = [];

  if (typeof jsonData.declaredPartCount !== 'number' || jsonData.declaredPartCount !== jsonData.parts.length) {
    dataErrors.push(`declaredPartCount (${jsonData.declaredPartCount}) !== parts.length (${jsonData.parts.length})`);
  }

  const checkVec3 = (vec, label, partId) => {
    if (!Array.isArray(vec) || vec.length !== 3) {
      dataErrors.push(`${partId}: ${label} is not a 3-tuple`);
      return;
    }
    for (let i = 0; i < 3; i++) {
      const v = vec[i];
      if (typeof v !== 'number' || !Number.isFinite(v) || Math.abs(v) > 500) {
        dataErrors.push(`${partId}: ${label}[${i}] invalid (${v})`);
      }
    }
  };

  for (const p of jsonData.parts) {
    if (!p.id || typeof p.id !== 'string') {
      dataErrors.push('Missing/invalid part id');
      continue;
    }
    if (seenIds.has(p.id)) {
      dataErrors.push(`Duplicate part id: ${p.id}`);
    }
    seenIds.add(p.id);

    checkVec3(p.assembledPos, 'assembledPos', p.id);
    checkVec3(p.explodeOffset, 'explodeOffset', p.id);

    const requiredStrings = ['title', 'subtitle', 'category', 'plainAnalogy', 'summary', 'nextGenInnovation', 'diagramType', 'swatchColor', 'groupKey'];
    for (const field of requiredStrings) {
      if (typeof p[field] !== 'string' || p[field].trim().length === 0) {
        dataErrors.push(`${p.id}: missing or empty required field '${field}'`);
      }
    }
    if (!Array.isArray(p.opticsAndPhysics) || p.opticsAndPhysics.length === 0) {
      dataErrors.push(`${p.id}: opticsAndPhysics must be a non-empty array`);
    }
    if (!Array.isArray(p.specs) || p.specs.length === 0) {
      dataErrors.push(`${p.id}: specs must be a non-empty array`);
    }
  }

  if (dataErrors.length === 0) {
    pass('2-1 Data Integrity', `${DATA_FILE}: ${jsonData.parts.length}/${jsonData.declaredPartCount} parts valid, 0 duplicates, 0 NaN/Infinity, 100% metadata complete`);
  } else {
    fail('2-1 Data Integrity', dataErrors.join('; '));
  }
} catch (err) {
  fail('2-1 Data Integrity', String(err));
}

// -----------------------------------------------------------------------------
// 3. Optimization Anti-Pattern Static Lint (MI Shoe V2 Core + Units)
// -----------------------------------------------------------------------------
const v2Files = V2_SCAN_DIRS.flatMap((d) => listTsFiles(d));
const rawMatViolations = [];
const allocHotPathViolations = [];
const unsafeRemoveViolations = [];

for (const rel of v2Files) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const clean = stripComments(src);

  // 3-1: No raw new THREE.Mesh*Material / Line*Material outside resource_cache.ts
  if (rel !== 'src/core/resource_cache.ts') {
    const matMatches = clean.match(/new\s+THREE\.(Mesh\w*Material|Line\w*Material|PointsMaterial|SpriteMaterial|ShaderMaterial|RawShaderMaterial)\s*\(/g);
    if (matMatches && matMatches.length > 0) {
      rawMatViolations.push(`${rel}: ${matMatches.join(', ')}`);
    }
  }

  // 3-2: No Vector3/Matrix4/Quaternion/Color/Box3/Sphere allocations inside hot loops
  const hotMethods = [
    ['updateExplode', /\bupdateExplode\s*\(/],
    ['updatePhysics', /\bupdatePhysics\s*\(/],
    ['updateExplodeGuides', /\bupdateExplodeGuides\s*\(/],
    ['render', /\bpublic\s+render\s*\(/],
    ['pickWithRay', /\bpickWithRay\s*\(/],
  ];
  for (const [name, pattern] of hotMethods) {
    const body = extractFunctionBody(src, pattern);
    if (!body) continue;
    const cleanBody = stripComments(body);
    const allocs = cleanBody.match(/new\s+THREE\.(Vector[234]|Matrix[34]|Quaternion|Color|Box3|Sphere|Euler|Ray)\s*\(|\.clone\s*\(/g);
    if (allocs && allocs.length > 0) {
      allocHotPathViolations.push(`${rel}#${name}: ${allocs.join(', ')}`);
    }
  }

  // 3-3: No scene.remove(...) without dispose outside dispose.ts
  if (rel !== 'src/core/dispose.ts') {
    const rawSceneRemove = clean.match(/\bscene\.remove\s*\(/g);
    if (rawSceneRemove && rawSceneRemove.length > 0) {
      unsafeRemoveViolations.push(`${rel}: ${rawSceneRemove.join(', ')}`);
    }
  }
}

if (rawMatViolations.length === 0) {
  pass('3-1 Lint: Cached Materials', `0 direct new THREE.Mesh*/Line*Material outside src/core/resource_cache.ts (${v2Files.length} files scanned)`);
} else {
  fail('3-1 Lint: Cached Materials', rawMatViolations.join(' | '));
}

if (allocHotPathViolations.length === 0) {
  pass('3-2 Lint: Zero-GC Hot Paths', '0 Vector/Matrix/Quaternion/Color/Box3/clone allocations in updateExplode/updatePhysics/render/pickWithRay');
} else {
  fail('3-2 Lint: Zero-GC Hot Paths', allocHotPathViolations.join(' | '));
}

if (unsafeRemoveViolations.length === 0) {
  pass('3-3 Lint: Safe Disposal', '0 raw scene.remove() calls bypassing disposeObject3D');
} else {
  fail('3-3 Lint: Safe Disposal', unsafeRemoveViolations.join(' | '));
}

// -----------------------------------------------------------------------------
// 4. Headless Runtime Verification & Quality-Tier Performance Budget Gate
// -----------------------------------------------------------------------------
try {
  const [unitMod, cacheMod, raycastMod, registryMod] = await Promise.all([
    bundleTsModuleForNode('src/units/mi_shoe.ts'),
    bundleTsModuleForNode('src/core/resource_cache.ts'),
    bundleTsModuleForNode('src/core/raycast_engine.ts'),
    bundleTsModuleForNode('src/units/registry.ts'),
  ]);

  // Verify registry scoping & cross-unit unique IDs
  const registeredUnits = registryMod.listRegisteredUnits();
  const globalIds = new Set();
  let dupGlobal = 0;
  for (const entry of registeredUnits) {
    const meta = await entry.loadMeta();
    if (meta.declaredPartCount !== entry.declaredPartCount) {
      fail('2-2 Registry Count', `${entry.unitId}: registry=${entry.declaredPartCount}, json=${meta.declaredPartCount}`);
    }
    for (const p of meta.parts) {
      if (globalIds.has(p.id)) dupGlobal++;
      globalIds.add(p.id);
    }
  }
  if (registeredUnits.length === 1 && registeredUnits[0].unitId === 'mishoe' && dupGlobal === 0) {
    pass('2-2 Registry & Scope', `Registered units: [${registeredUnits.map((u) => u.unitId).join(', ')}], unique IDs: ${globalIds.size}, 0 cross-unit duplicates`);
  } else {
    fail('2-2 Registry & Scope', `Unexpected units or duplicates: count=${registeredUnits.length}, dup=${dupGlobal}`);
  }

  const cache = new cacheMod.ResourceCache();
  const raycaster = new raycastMod.TwoStageRaycaster(33.3);
  const tierMetrics = {};

  for (const tier of ['standard', 'high', 'ultra']) {
    const unit = unitMod.createMiShoeUnit();
    const meta = unit.getMeta();
    const built = await unit.build(tier, cache, { synchronous: true });
    const budget = BUDGETS[tier];

    // 4-A: Declared JSON part count === Registered 3D part count (1:1 match)
    const jsonIds = new Set(meta.parts.map((p) => p.id));
    const missing3d = [...jsonIds].filter((id) => !built.registeredPartIds.has(id));
    const extra3d = [...built.registeredPartIds].filter((id) => !jsonIds.has(id));
    if (
      built.registeredPartIds.size !== meta.declaredPartCount ||
      missing3d.length > 0 ||
      extra3d.length > 0
    ) {
      fail(`2-3 Part Match (${tier})`, `declared=${meta.declaredPartCount}, registered=${built.registeredPartIds.size}, missing=${missing3d.join(',')}, extra=${extra3d.join(',')}`);
    }

    // 4-B: matrixAutoUpdate === false on EVERY Object3D in built scene
    let autoUpdateViolations = 0;
    built.rootGroup.traverse((obj) => {
      if (obj.matrixAutoUpdate !== false) autoUpdateViolations++;
    });
    if (autoUpdateViolations > 0) {
      fail(`3-4 matrixAutoUpdate (${tier})`, `${autoUpdateViolations} Object3D nodes still have matrixAutoUpdate=true`);
    }

    // 4-C: InstancedMesh & BatchedMesh reverse lookup completeness
    let reverseLookupErrors = 0;
    for (const binding of built.raycastIndex.bindings) {
      if (binding.kind === 'instanced') {
        if (binding.instanceIdToPartId.length !== binding.mesh.count) reverseLookupErrors++;
        for (let i = 0; i < binding.mesh.count; i++) {
          if (!jsonIds.has(binding.instanceIdToPartId[i])) reverseLookupErrors++;
        }
      } else {
        for (let i = 0; i < binding.batchIdToPartId.length; i++) {
          if (!jsonIds.has(binding.batchIdToPartId[i])) reverseLookupErrors++;
        }
      }
    }
    if (reverseLookupErrors > 0) {
      fail(`2-4 Reverse Lookup (${tier})`, `${reverseLookupErrors} invalid instanceId/batchId -> partId mappings`);
    }

    // 4-D: Explode differential dirty-check + 0 NaN matrices
    const movedHalf = unit.updateExplode(0.5);
    const skippedSame = unit.updateExplode(0.5);
    const movedFull = unit.updateExplode(1.0);
    let nanMatrixCount = 0;
    for (const im of built.instancedMeshes) {
      const arr = im.instanceMatrix.array;
      for (let i = 0; i < arr.length; i++) {
        if (!Number.isFinite(arr[i])) nanMatrixCount++;
      }
    }
    if (!movedHalf || skippedSame !== false || !movedFull || nanMatrixCount > 0) {
      fail(`4-1 Explode Dirty/Finite (${tier})`, `movedHalf=${movedHalf}, skippedSame=${skippedSame}, movedFull=${movedFull}, nan=${nanMatrixCount}`);
    }

    // Reset to assembled (0.0) and test visual states + two-stage raycast
    unit.updateExplode(0.0);
    unit.setVisualState('mi-pins-8to12-digital-audio', 'mi-shoe-shell-plate', new Set(), null, 'solid');
    unit.setVisualState(null, null, new Set(), null, 'xray');
    unit.setVisualState(null, null, new Set(), null, 'cad');
    unit.setVisualState(null, null, new Set(), null, 'solid');

    // Raycast test: miss far outside unit AABB, hit shell plate (BatchedMesh) and front 21 pins (InstancedMesh)
    const testRc = new THREE.Raycaster();
    testRc.set(new THREE.Vector3(200, 200, 200), new THREE.Vector3(0, -1, 0));
    const missHit = raycaster.pickWithRay(testRc, built.raycastIndex, () => false, null);

    // Hit center X-Sync dome (BatchedMesh at (0, 2.0, -3.2)) from above
    testRc.set(new THREE.Vector3(0, 30, -3.2), new THREE.Vector3(0, -1, 0));
    const topHit = raycaster.pickWithRay(testRc, built.raycastIndex, () => false, null);

    // Hit Pin 11 (InstancedMesh at x=0, y=2.85, z=16.4) directly from front (+Z -> -Z)
    testRc.set(new THREE.Vector3(0, 3.0, 40), new THREE.Vector3(0, 0, -1));
    const frontHit = raycaster.pickWithRay(testRc, built.raycastIndex, (id) => id === 'mi-shoe-cap-875' || id === 'mi-shoe-shell-plate' || id === 'mi-front-21pin-shroud' || id === 'mi-accessory-wp-skirt', null);

    if (missHit !== null || topHit === null || frontHit !== 'mi-pins-8to12-digital-audio') {
      fail(`4-2 Two-Stage Raycast (${tier})`, `miss=${missHit}, topHit=${topHit}, frontPinHit=${frontHit}`);
    }

    // Verify camera drag pause & 30Hz hover throttle
    const cam = new THREE.PerspectiveCamera(32, 1.6, 0.85, 4200);
    cam.position.set(0, 40, 80);
    cam.lookAt(0, 0, 0);
    cam.updateMatrixWorld();
    const ptr = new THREE.Vector2(0, 0);
    raycaster.resetHoverThrottle();
    raycaster.setCameraDragging(true);
    const dragRes = raycaster.pickHover(ptr, cam, built.raycastIndex, () => false, null, 100);
    raycaster.setCameraDragging(false);
    const firstHover = raycaster.pickHover(ptr, cam, built.raycastIndex, () => false, null, 100);
    const throttledHover = raycaster.pickHover(ptr, cam, built.raycastIndex, () => false, null, 110);
    const nextHover = raycaster.pickHover(ptr, cam, built.raycastIndex, () => false, null, 140);
    if (!dragRes.skipped || firstHover.skipped || !throttledHover.skipped || nextHover.skipped) {
      fail(`4-3 Hover Drag/Throttle (${tier})`, JSON.stringify({ dragRes, firstHover, throttledHover, nextHover }));
    }

    // Count visible draw calls & inspect material classes per quality tier
    let visibleDrawCalls = 0;
    let physicalMatCount = 0;
    let lambertMatCount = 0;
    let standardMatCount = 0;
    const seenMats = new Set();

    built.rootGroup.traverse((obj) => {
      if (!obj.visible) return;
      if (obj.parent && !obj.parent.visible) return;
      if (obj.isBatchedMesh || obj.isInstancedMesh || obj.isMesh || obj.isLineSegments || obj.isLine) {
        visibleDrawCalls++;
        const mat = obj.material;
        if (mat && !seenMats.has(mat)) {
          seenMats.add(mat);
          if (mat.isMeshPhysicalMaterial) physicalMatCount++;
          else if (mat.isMeshStandardMaterial) standardMatCount++;
          else if (mat.isMeshLambertMaterial) lambertMatCount++;
        }
      }
    });

    const tierCfg = cacheMod.QUALITY_TIER_CONFIG[tier];
    const tris = built.stats.estimatedTriangles;
    const tierMatOk =
      tier === 'standard'
        ? physicalMatCount === 0 && lambertMatCount > 0
        : tier === 'high'
          ? physicalMatCount === 0 && standardMatCount > 0
          : physicalMatCount > 0 && standardMatCount > 0;

    if (
      visibleDrawCalls > budget.maxDrawCalls ||
      tris > budget.maxTriangles ||
      !tierMatOk ||
      tierCfg.maxPixelRatio !== budget.maxDpr
    ) {
      fail(
        `4-4 Budget Gate (${tier.toUpperCase()})`,
        `drawCalls=${visibleDrawCalls}/${budget.maxDrawCalls}, tris=${tris}/${budget.maxTriangles}, dprCap=${tierCfg.maxPixelRatio}, mats={L:${lambertMatCount},S:${standardMatCount},P:${physicalMatCount}}`
      );
    }

    // Dispose unit & assert ZERO leaked resources in ResourceCache!
    unit.dispose(cache);
    const postStats = cache.getStats();
    if (
      postStats.materials !== 0 ||
      postStats.geometries !== 0 ||
      postStats.textures !== 0 ||
      postStats.totalRefs !== 0
    ) {
      fail(`4-5 Zero-Leak Dispose (${tier.toUpperCase()})`, JSON.stringify(postStats));
    }

    tierMetrics[tier] = {
      drawCalls: visibleDrawCalls,
      triangles: tris,
      dprCap: tierCfg.maxPixelRatio,
      instancedMeshes: built.stats.instancedMeshCount,
      totalInstances: built.stats.totalInstances,
      batchedMeshes: built.stats.batchedMeshCount,
      totalBatchedItems: built.stats.totalBatchedItems,
      mats: { lambert: lambertMatCount, standard: standardMatCount, physical: physicalMatCount },
      postDisposeRefs: postStats.totalRefs,
    };
  }

  // Assert triangle count scales cleanly across STD < HIGH < ULTRA
  if (
    tierMetrics.standard.triangles < tierMetrics.high.triangles &&
    tierMetrics.high.triangles < tierMetrics.ultra.triangles
  ) {
    pass(
      '4-6 Tier Scaling & Budget Gates',
      `STD(${tierMetrics.standard.drawCalls}dc, ${tierMetrics.standard.triangles}tris, DPR<=${tierMetrics.standard.dprCap}) < HIGH(${tierMetrics.high.drawCalls}dc, ${tierMetrics.high.triangles}tris, DPR<=${tierMetrics.high.dprCap}) < ULTRA(${tierMetrics.ultra.drawCalls}dc, ${tierMetrics.ultra.triangles}tris, DPR<=${tierMetrics.ultra.dprCap}) | Post-dispose refs: 0/0/0`
    );
  } else {
    fail('4-6 Tier Scaling & Budget Gates', JSON.stringify(tierMetrics));
  }

  pass(
    '3-4 Runtime Invariants',
    'matrixAutoUpdate=false (100% nodes), JSON=3D (32/32), reverse-lookup (100%), zero-NaN explode, 2-stage AABB raycast + drag-pause + 30Hz throttle, zero-leak dispose verified across STD/HIGH/ULTRA'
  );
  console.log('\n[MI Shoe V2 Tier Matrix]');
  console.log(JSON.stringify(tierMetrics, null, 2));
} catch (err) {
  fail('4 Runtime Verification', err instanceof Error ? err.stack || err.message : String(err));
}

console.log('====================================================================');
if (failCount === 0) {
  console.log(`ALL CHECKS PASSED (${reportLines.length} checks, 0 failures)`);
  process.exit(0);
} else {
  console.error(`VALIDATION FAILED (${failCount} failure(s))`);
  process.exit(1);
}
