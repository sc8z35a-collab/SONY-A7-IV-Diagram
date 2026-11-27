#!/usr/bin/env node
/**
 * CI-Grade Automated Guardrail for the Universal V2 WebGL Optimization Architecture.
 * Automatically scans EVERY unit registered in `src/units/registry.ts` and EVERY JSON in `src/data/`.
 *
 * Verifies:
 *   1. Syntax Check (`node --check`) & TypeScript Build (`npx tsc --noEmit`, 0 errors)
 *   2. Cross-Unit Pure JSON Data Integrity (0 duplicate IDs across all individual units, 0 NaN/Infinity, 100% metadata complete)
 *   3. Static Optimization Anti-Pattern Lint across all `src/core/` & `src/units/` (0 direct new THREE.Mesh*Material, 0 hot-path GC allocations, 0 raw scene.remove)
 *   4. Headless Runtime Verification across STD/HIGH/ULTRA for EVERY registered unit:
 *      - JSON declaredPartCount === 3D registered part count (1:1 match)
 *      - 100% matrixAutoUpdate === false
 *      - 100% reverse lookup (instanceId/batchId -> partId)
 *      - Zero-NaN differential explode + dirty skip
 *      - Two-stage AABB raycast + camera-drag pause + 30Hz hover throttle
 *      - Quality-tier scaling (STD < HIGH <= ULTRA triangles, DPR caps 1.0/1.5/2.0, shader tiers)
 *      - Solid Draw-Call Budget Gate (<= 100dc by default, or explicit documented unit maxDrawCallsBudget)
 *      - Sequential multi-unit & tier switch post-dispose ResourceCache refCount === 0
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import * as THREE from 'three';
import { buildSync } from 'esbuild';

const ROOT = process.cwd();
const V2_SCAN_DIRS = ['src/core', 'src/units'];
const DATA_DIR = 'src/data';
const COMPOSITE_UNIT_IDS = new Set(['integrated', 'camera_body']);

const TIER_DPR_CAPS = {
  standard_lite: 1.0,
  standard: 1.0,
  high: 1.5,
  ultra: 2.0,
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
  const tmpFile = path.join(
    tmpDir,
    `${path.basename(entryRel, '.ts')}.${process.pid}.${Math.random().toString(36).slice(2, 8)}.mjs`
  );
  fs.writeFileSync(tmpFile, result.outputFiles[0].text, 'utf8');
  try {
    return await import(pathToFileURL(tmpFile).href);
  } finally {
    fs.rmSync(tmpFile, { force: true });
  }
}

console.log('====================================================================');
console.log(' Universal V2 WebGL Optimization CI Guardrail (validate_parts.mjs)');
console.log('====================================================================');

// -----------------------------------------------------------------------------
// 1. Syntax & TypeScript Build Verification
// -----------------------------------------------------------------------------
try {
  execSync('node --check scripts/validate_parts.mjs && node --check scripts/generate_catalogs.mjs', {
    cwd: ROOT,
    stdio: 'pipe',
  });
  pass('1-1 Syntax Check', 'node --check scripts/validate_parts.mjs & scripts/generate_catalogs.mjs exited 0');
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
// 2. Cross-Unit Pure JSON Data Integrity Validation (src/data/*.json)
// -----------------------------------------------------------------------------
try {
  const jsonFiles = listJsonFiles(DATA_DIR);
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

  for (const relFile of jsonFiles) {
    const jsonData = JSON.parse(fs.readFileSync(path.join(ROOT, relFile), 'utf8'));
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
      for (const field of requiredStrings) {
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

  if (jsonFiles.length === 0) {
    fail('2-1 Data Integrity', 'No JSON files found in src/data/');
  } else if (dataErrors.length === 0) {
    pass(
      '2-1 Data Integrity',
      `${jsonFiles.length} JSON file(s), ${totalPartsChecked} parts (${globalIds.size} unique individual IDs) valid, 0 duplicates, 0 NaN/Infinity, 100% metadata complete`
    );
  } else {
    fail('2-1 Data Integrity', dataErrors.slice(0, 12).join('; ') + (dataErrors.length > 12 ? ` (+${dataErrors.length - 12} more)` : ''));
  }
} catch (err) {
  fail('2-1 Data Integrity', String(err));
}

// -----------------------------------------------------------------------------
// 3. Optimization Anti-Pattern Static Lint (All src/core/ + src/units/)
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
    const matMatches = clean.match(
      /new\s+THREE\.(Mesh\w*Material|Line\w*Material|PointsMaterial|SpriteMaterial|ShaderMaterial|RawShaderMaterial)\s*\(/g
    );
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
    const allocs = cleanBody.match(
      /new\s+THREE\.(Vector[234]|Matrix[34]|Quaternion|Color|Box3|Sphere|Euler|Ray)\s*\(|\.clone\s*\(/g
    );
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
  pass(
    '3-1 Lint: Cached Materials',
    `0 direct new THREE.Mesh*/Line*Material outside src/core/resource_cache.ts (${v2Files.length} files scanned)`
  );
} else {
  fail('3-1 Lint: Cached Materials', rawMatViolations.join(' | '));
}

if (allocHotPathViolations.length === 0) {
  pass(
    '3-2 Lint: Zero-GC Hot Paths',
    '0 Vector/Matrix/Quaternion/Color/Box3/clone allocations in updateExplode/updatePhysics/render/pickWithRay'
  );
} else {
  fail('3-2 Lint: Zero-GC Hot Paths', allocHotPathViolations.join(' | '));
}

if (unsafeRemoveViolations.length === 0) {
  pass('3-3 Lint: Safe Disposal', '0 raw scene.remove() calls bypassing disposeObject3D');
} else {
  fail('3-3 Lint: Safe Disposal', unsafeRemoveViolations.join(' | '));
}

// -----------------------------------------------------------------------------
// 4. Headless Runtime Verification & Quality-Tier Performance Budget Gate (ALL Registered Units)
// -----------------------------------------------------------------------------
try {
  const [cacheMod, raycastMod, registryMod] = await Promise.all([
    bundleTsModuleForNode('src/core/resource_cache.ts'),
    bundleTsModuleForNode('src/core/raycast_engine.ts'),
    bundleTsModuleForNode('src/units/registry.ts'),
  ]);

  const registeredUnits = registryMod.listRegisteredUnits();
  const globalIds = new Set();
  let dupGlobal = 0;
  for (const entry of registeredUnits) {
    const meta = await entry.loadMeta();
    if (meta.declaredPartCount !== entry.declaredPartCount) {
      fail(
        '2-2 Registry Count',
        `${entry.unitId}: registry=${entry.declaredPartCount}, json=${meta.declaredPartCount}`
      );
    }
    if (!COMPOSITE_UNIT_IDS.has(entry.unitId)) {
      for (const p of meta.parts) {
        if (globalIds.has(p.id)) dupGlobal++;
        globalIds.add(p.id);
      }
    }
  }

  if (registeredUnits.length > 0 && dupGlobal === 0) {
    pass(
      '2-2 Registry & Scope',
      `Registered units (${registeredUnits.length}): [${registeredUnits.map((u) => u.unitId).join(', ')}], unique individual IDs: ${globalIds.size}, 0 cross-unit duplicates`
    );
  } else {
    fail(
      '2-2 Registry & Scope',
      `Invalid registry state: count=${registeredUnits.length}, dup=${dupGlobal}`
    );
  }

  const cache = new cacheMod.ResourceCache();
  const raycaster = new raycastMod.TwoStageRaycaster(33.3);
  const allUnitMatrices = {};
  let totalRuntimeFailures = 0;

  for (const entry of registeredUnits) {
    const unitId = entry.unitId;
    const unitTierMetrics = {};

    for (const tier of ['standard_lite', 'standard', 'high', 'ultra']) {
      const unit = await entry.load();
      const meta = unit.getMeta();
      const built = await unit.build(tier, cache, {
        synchronous: true,
        integratedMode: COMPOSITE_UNIT_IDS.has(unitId),
      });

      const maxDrawCalls = meta.maxDrawCallsBudget ?? 100;

      // 4-A: Declared JSON part count === Registered 3D part count (1:1 match)
      const jsonIds = new Set(meta.parts.map((p) => p.id));
      const missing3d = [...jsonIds].filter((id) => !built.registeredPartIds.has(id));
      const extra3d = [...built.registeredPartIds].filter((id) => !jsonIds.has(id));
      if (
        built.registeredPartIds.size !== meta.declaredPartCount ||
        missing3d.length > 0 ||
        extra3d.length > 0
      ) {
        totalRuntimeFailures++;
        fail(
          `2-3 Part Match (${unitId}/${tier})`,
          `declared=${meta.declaredPartCount}, registered=${built.registeredPartIds.size}, missing=${missing3d.slice(0, 5).join(',')}, extra=${extra3d.slice(0, 5).join(',')}`
        );
      }

      // 4-B: matrixAutoUpdate === false on EVERY Object3D in built scene
      let autoUpdateViolations = 0;
      built.rootGroup.traverse((obj) => {
        if (obj.matrixAutoUpdate !== false) autoUpdateViolations++;
      });
      if (autoUpdateViolations > 0) {
        totalRuntimeFailures++;
        fail(
          `3-4 matrixAutoUpdate (${unitId}/${tier})`,
          `${autoUpdateViolations} Object3D nodes still have matrixAutoUpdate=true`
        );
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
        totalRuntimeFailures++;
        fail(
          `2-4 Reverse Lookup (${unitId}/${tier})`,
          `${reverseLookupErrors} invalid instanceId/batchId -> partId mappings`
        );
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
        totalRuntimeFailures++;
        fail(
          `4-1 Explode Dirty/Finite (${unitId}/${tier})`,
          `movedHalf=${movedHalf}, skippedSame=${skippedSame}, movedFull=${movedFull}, nan=${nanMatrixCount}`
        );
      }

      // 4-E: Visual states (solid / xray / cad) & Two-Stage AABB Raycast
      unit.updateExplode(0.0);
      const samplePart = built.raycastIndex.parts.find((p) => !p.worldBox.isEmpty());
      const firstId = samplePart?.partId ?? meta.parts[0].id;
      const secondId = meta.parts[Math.min(1, meta.parts.length - 1)].id;
      unit.setVisualState(firstId, secondId, new Set(), null, 'solid');
      unit.setVisualState(null, null, new Set(), null, 'xray');
      unit.setVisualState(null, null, new Set(), null, 'cad');
      unit.setVisualState(null, null, new Set(), null, 'solid');

      const testRc = new THREE.Raycaster();
      const missOrigin = new THREE.Vector3(5000, 5000, 5000);
      testRc.set(missOrigin, new THREE.Vector3(0, -1, 0));
      const missHit = raycaster.pickWithRay(testRc, built.raycastIndex, () => false, null);

      let hitOk = false;
      if (samplePart) {
        const center = samplePart.worldBox.getCenter(new THREE.Vector3());
        const size = samplePart.worldBox.getSize(new THREE.Vector3());
        const dist = Math.max(50, size.length() * 4);
        const dirs = [
          new THREE.Vector3(0, 0, -1),
          new THREE.Vector3(0, -1, 0),
          new THREE.Vector3(-1, 0, 0),
        ];
        for (const dir of dirs) {
          const origin = center.clone().addScaledVector(dir, -dist);
          testRc.set(origin, dir);
          const h = raycaster.pickWithRay(testRc, built.raycastIndex, () => false, null);
          if (h !== null && jsonIds.has(h)) {
            hitOk = true;
            break;
          }
        }
      }
      if (missHit !== null || !hitOk) {
        totalRuntimeFailures++;
        fail(
          `4-2 Two-Stage Raycast (${unitId}/${tier})`,
          `miss=${missHit}, hitOk=${hitOk}, samplePart=${firstId}`
        );
      }

      // Verify camera drag pause & 30Hz hover throttle (once per unit on high tier)
      if (tier === 'high') {
        const cam = new THREE.PerspectiveCamera(32, 1.6, 0.85, 4200);
        const uCenter = built.raycastIndex.unitWorldBox.getCenter(new THREE.Vector3());
        const uSize = built.raycastIndex.unitWorldBox.getSize(new THREE.Vector3());
        cam.position.set(uCenter.x, uCenter.y + Math.max(20, uSize.y), uCenter.z + Math.max(40, uSize.length() * 1.5));
        cam.lookAt(uCenter);
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
          totalRuntimeFailures++;
          fail(
            `4-3 Hover Drag/Throttle (${unitId})`,
            JSON.stringify({ dragRes, firstHover, throttledHover, nextHover })
          );
        }
      }

      // 4-F: Draw-Call & Shader Tier Budget Gate
      let visibleDrawCalls = 0;
      let matcapMatCount = 0;
      let physicalMatCount = 0;
      let lambertMatCount = 0;
      let phongMatCount = 0;
      let standardMatCount = 0;
      const seenMats = new Set();

      built.rootGroup.traverse((obj) => {
        if (!obj.visible) return;
        let p = obj.parent;
        while (p) {
          if (!p.visible) return;
          p = p.parent;
        }
        if (obj.isBatchedMesh || obj.isInstancedMesh || obj.isMesh || obj.isLineSegments || obj.isLine) {
          visibleDrawCalls++;
          const mat = obj.material;
          if (mat && !seenMats.has(mat)) {
            seenMats.add(mat);
            if (mat.isMeshMatcapMaterial) matcapMatCount++;
            else if (mat.isMeshPhysicalMaterial) physicalMatCount++;
            else if (mat.isMeshStandardMaterial) standardMatCount++;
            else if (mat.isMeshPhongMaterial) phongMatCount++;
            else if (mat.isMeshLambertMaterial) lambertMatCount++;
          }
        }
      });

      const tierCfg = cacheMod.QUALITY_TIER_CONFIG[tier];
      const tris = built.stats.estimatedTriangles;
      const tierMatOk =
        tier === 'standard_lite'
          ? physicalMatCount === 0 && standardMatCount === 0 && matcapMatCount > 0
          : tier === 'standard'
            ? physicalMatCount === 0 && standardMatCount === 0 && (lambertMatCount + phongMatCount > 0)
            : tier === 'high'
              ? physicalMatCount === 0 && standardMatCount > 0
              : physicalMatCount > 0;

      if (
        visibleDrawCalls > maxDrawCalls ||
        !tierMatOk ||
        tierCfg.maxPixelRatio !== TIER_DPR_CAPS[tier]
      ) {
        totalRuntimeFailures++;
        fail(
          `4-4 Budget Gate (${unitId}/${tier.toUpperCase()})`,
          `drawCalls=${visibleDrawCalls}/${maxDrawCalls}, tris=${tris}, dprCap=${tierCfg.maxPixelRatio}, mats={MC:${matcapMatCount},L:${lambertMatCount},Ph:${phongMatCount},S:${standardMatCount},P:${physicalMatCount}}`
        );
      }

      // 4-G: Dispose unit & assert ZERO leaked resources in ResourceCache!
      unit.dispose(cache);
      const postStats = cache.getStats();
      if (
        postStats.materials !== 0 ||
        postStats.geometries !== 0 ||
        postStats.textures !== 0 ||
        postStats.totalRefs !== 0
      ) {
        totalRuntimeFailures++;
        fail(`4-5 Zero-Leak Dispose (${unitId}/${tier.toUpperCase()})`, JSON.stringify(postStats));
      }

      unitTierMetrics[tier] = {
        drawCalls: visibleDrawCalls,
        maxDrawCalls,
        triangles: tris,
        dprCap: tierCfg.maxPixelRatio,
        instancedMeshes: built.stats.instancedMeshCount,
        totalInstances: built.stats.totalInstances,
        batchedMeshes: built.stats.batchedMeshCount,
        totalBatchedItems: built.stats.totalBatchedItems,
        mats: { matcap: matcapMatCount, lambert: lambertMatCount, phong: phongMatCount, standard: standardMatCount, physical: physicalMatCount },
        postDisposeRefs: postStats.totalRefs,
      };
    }

    // Assert triangle count scales monotonically across LITE <= STD <= HIGH <= ULTRA with LITE < ULTRA
    const liteT = unitTierMetrics.standard_lite.triangles;
    const stdT = unitTierMetrics.standard.triangles;
    const highT = unitTierMetrics.high.triangles;
    const ultraT = unitTierMetrics.ultra.triangles;
    if (!(liteT <= stdT && stdT <= highT && highT <= ultraT && liteT < ultraT)) {
      totalRuntimeFailures++;
      fail(
        `4-6 Tier Scaling (${unitId})`,
        `Expected LITE <= STD <= HIGH <= ULTRA & LITE < ULTRA, got LITE=${liteT}, STD=${stdT}, HIGH=${highT}, ULTRA=${ultraT}`
      );
    }

    allUnitMatrices[unitId] = unitTierMetrics;
  }

  if (totalRuntimeFailures === 0) {
    pass(
      '4-6 Tier Scaling & Budget Gates',
      `All ${registeredUnits.length} unit(s) passed draw-call budgets, LITE <= STD <= HIGH <= ULTRA scaling, DPR caps (1.0/1.0/1.5/2.0), and 0 post-dispose cache refs`
    );
    pass(
      '3-4 Runtime Invariants',
      `All ${registeredUnits.length} unit(s) verified: matrixAutoUpdate=false (100%), JSON=3D (100%), reverse-lookup (100%), zero-NaN explode, 2-stage AABB raycast + drag-pause + 30Hz throttle, zero-leak dispose`
    );
  }

  console.log('\n[Universal V2 4-Tier Matrix]');
  for (const [uid, m] of Object.entries(allUnitMatrices)) {
    console.log(
      `  ${uid.padEnd(13)} | LITE: ${String(m.standard_lite.drawCalls).padStart(2)}dc / ${String(m.standard_lite.triangles).padStart(7)} tris | STD: ${String(m.standard.drawCalls).padStart(2)}dc / ${String(m.standard.triangles).padStart(7)} tris | HIGH: ${String(m.high.drawCalls).padStart(2)}dc / ${String(m.high.triangles).padStart(7)} tris | ULTRA: ${String(m.ultra.drawCalls).padStart(2)}dc / ${String(m.ultra.triangles).padStart(7)} tris | Refs:0`
    );
  }
} catch (err) {
  fail('4 Runtime Verification', err instanceof Error ? err.stack || err.message : String(err));
}

// -----------------------------------------------------------------------------
// 5. 3-Tier Part Catalog Freshness Check (L0 / L1 / L2 + WORKER_RULE.md)
// -----------------------------------------------------------------------------
if (process.argv.includes('--skip-catalog')) {
  pass('5-1 Catalog Freshness', 'Skipped via --skip-catalog flag');
} else {
  try {
    const catErrors = [];
    const indexPath = path.join(ROOT, 'catalog/INDEX.tsv');
    const allNamesPath = path.join(ROOT, 'catalog/ALL_NAMES.txt');
    const workerRulePath = path.join(ROOT, 'catalog/WORKER_RULE.md');

    for (const [label, p] of [
      ['catalog/INDEX.tsv', indexPath],
      ['catalog/ALL_NAMES.txt', allNamesPath],
      ['catalog/WORKER_RULE.md', workerRulePath],
    ]) {
      if (!fs.existsSync(p)) catErrors.push(`Missing required file ${label}`);
    }

    if (fs.existsSync(workerRulePath)) {
      const ruleBytes = fs.statSync(workerRulePath).size;
      if (ruleBytes > 1536) {
        catErrors.push(`catalog/WORKER_RULE.md exceeds 1.5 kB budget (${ruleBytes} bytes > 1536)`);
      }
    }

    if (fs.existsSync(indexPath) && fs.existsSync(allNamesPath)) {
      const indexLines = fs
        .readFileSync(indexPath, 'utf8')
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

      const allNamesText = fs.readFileSync(allNamesPath, 'utf8');
      const jsonFiles = listJsonFiles(DATA_DIR);
      let checkedModes = 0;

      for (const relJson of jsonFiles) {
        const jsonData = JSON.parse(fs.readFileSync(path.join(ROOT, relJson), 'utf8'));
        const mode = jsonData.unitId;
        const jsonIds = new Set(jsonData.parts.map((p) => p.id));
        const expectedCount = jsonData.parts.length;
        const idxEntry = indexByMode.get(mode);
        if (!idxEntry) {
          catErrors.push(`catalog/INDEX.tsv missing mode '${mode}'`);
          continue;
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
          const firstLine = fs.readFileSync(l1Path, 'utf8').split('\n')[0] || '';
          if (!firstLine.includes(`# ${mode} (${expectedCount}p |`)) {
            catErrors.push(`${idxEntry.l1File} header count mismatch (${firstLine})`);
          }
        }

        if (!COMPOSITE_UNIT_IDS.has(mode)) {
          if (!allNamesText.includes(`# ${mode} (${expectedCount}p |`)) {
            catErrors.push(`catalog/ALL_NAMES.txt missing or stale section for '${mode}' (${expectedCount}p)`);
          }
        }

        if (!fs.existsSync(l2Path)) {
          catErrors.push(`Missing L2 file ${idxEntry.l2File}`);
        } else {
          const l2Lines = fs
            .readFileSync(l2Path, 'utf8')
            .split('\n')
            .filter((l) => l.trim().length > 0);
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
      }

      if (indexByMode.size !== jsonFiles.length) {
        catErrors.push(
          `INDEX.tsv mode count (${indexByMode.size}) !== src/data/*.json count (${jsonFiles.length})`
        );
      }

      if (catErrors.length === 0) {
        const ruleBytes = fs.statSync(workerRulePath).size;
        pass(
          '5-1 Catalog Freshness',
          `All ${checkedModes} modes L0/L1/L2 100% synchronized with src/data/*.json, WORKER_RULE.md=${ruleBytes}B (<=1.5 kB)`
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

console.log('====================================================================');
if (failCount === 0) {
  console.log(`ALL CHECKS PASSED (${reportLines.length} checks, 0 failures)`);
  process.exit(0);
} else {
  console.error(`VALIDATION FAILED (${failCount} failure(s))`);
  process.exit(1);
}
