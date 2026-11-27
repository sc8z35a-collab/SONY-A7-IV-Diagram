/**
 * Parallel V2 Runtime Verification Worker (`scripts/lib/validate_worker.mjs`)
 * Executes full 4-tier (LITE / STD / HIGH / ULTRA) runtime invariants for an assigned batch
 * of units using ONE shared unified ESM bundle + compiler-verified pure rawBuild sharing.
 */

import { parentPort, workerData } from 'node:worker_threads';
import { pathToFileURL } from 'node:url';
import * as THREE from 'three';

const COMPOSITE_UNIT_IDS = new Set(['integrated', 'camera_body']);
const TIER_DPR_CAPS = {
  standard_lite: 1.0,
  standard: 1.0,
  high: 1.5,
  ultra: 2.0,
};

async function run() {
  const { bundlePath, unitIds } = workerData;
  const runtimeMod = await import(pathToFileURL(bundlePath).href);
  const {
    loadRegisteredUnit,
    ResourceCache,
    QUALITY_TIER_CONFIG,
    TwoStageRaycaster,
    disposeSharedRawBuildCache,
  } = runtimeMod;

  const cache = new ResourceCache();
  const raycaster = new TwoStageRaycaster(33.3);
  const failures = [];
  const results = {};

  const recordFail = (section, detail) => {
    failures.push({ section, detail });
  };

  for (const unitId of unitIds) {
    const unitTierMetrics = {};
    const sharedRawBuildCache = new Map();
    const isComposite = COMPOSITE_UNIT_IDS.has(unitId);

    try {
      for (const tier of ['standard_lite', 'standard', 'high', 'ultra']) {
        const unit = await loadRegisteredUnit(unitId);
        const meta = unit.getMeta();
        const built = await unit.build(tier, cache, {
          synchronous: true,
          integratedMode: isComposite,
          sharedRawBuildCache,
          keepSharedRawAlive: true,
        });

        const maxDrawCalls = meta.maxDrawCallsBudget ?? 100;

        // 4-A: Declared JSON part count === Registered 3D part count (1:1 match)
        const jsonIds = new Set(meta.parts.map((p) => p.id));
        const missing3d = [];
        for (const id of jsonIds) {
          if (!built.registeredPartIds.has(id)) missing3d.push(id);
        }
        const extra3d = [];
        for (const id of built.registeredPartIds) {
          if (!jsonIds.has(id)) extra3d.push(id);
        }
        if (
          built.registeredPartIds.size !== meta.declaredPartCount ||
          missing3d.length > 0 ||
          extra3d.length > 0
        ) {
          recordFail(
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
          recordFail(
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
          recordFail(
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
          recordFail(
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
          recordFail(
            `4-2 Two-Stage Raycast (${unitId}/${tier})`,
            `miss=${missHit}, hitOk=${hitOk}, samplePart=${firstId}`
          );
        }

        // Verify camera drag pause & 30Hz hover throttle (once per unit on high tier)
        if (tier === 'high') {
          const cam = new THREE.PerspectiveCamera(32, 1.6, 0.85, 4200);
          const uCenter = built.raycastIndex.unitWorldBox.getCenter(new THREE.Vector3());
          const uSize = built.raycastIndex.unitWorldBox.getSize(new THREE.Vector3());
          cam.position.set(
            uCenter.x,
            uCenter.y + Math.max(20, uSize.y),
            uCenter.z + Math.max(40, uSize.length() * 1.5)
          );
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
            recordFail(
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

        const tierCfg = QUALITY_TIER_CONFIG[tier];
        const tris = built.stats.estimatedTriangles;
        const tierMatOk =
          tier === 'standard_lite'
            ? physicalMatCount === 0 && standardMatCount === 0 && matcapMatCount > 0
            : tier === 'standard'
              ? physicalMatCount === 0 && standardMatCount === 0 && lambertMatCount + phongMatCount > 0
              : tier === 'high'
                ? physicalMatCount === 0 && standardMatCount > 0
                : physicalMatCount > 0;

        if (
          visibleDrawCalls > maxDrawCalls ||
          !tierMatOk ||
          tierCfg.maxPixelRatio !== TIER_DPR_CAPS[tier]
        ) {
          recordFail(
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
          recordFail(`4-5 Zero-Leak Dispose (${unitId}/${tier.toUpperCase()})`, JSON.stringify(postStats));
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
          mats: {
            matcap: matcapMatCount,
            lambert: lambertMatCount,
            phong: phongMatCount,
            standard: standardMatCount,
            physical: physicalMatCount,
          },
          postDisposeRefs: postStats.totalRefs,
        };
      }

      const liteT = unitTierMetrics.standard_lite.triangles;
      const stdT = unitTierMetrics.standard.triangles;
      const highT = unitTierMetrics.high.triangles;
      const ultraT = unitTierMetrics.ultra.triangles;
      if (!(liteT <= stdT && stdT <= highT && highT <= ultraT && liteT < ultraT)) {
        recordFail(
          `4-6 Tier Scaling (${unitId})`,
          `Expected LITE <= STD <= HIGH <= ULTRA & LITE < ULTRA, got LITE=${liteT}, STD=${stdT}, HIGH=${highT}, ULTRA=${ultraT}`
        );
      }

      results[unitId] = unitTierMetrics;
    } finally {
      disposeSharedRawBuildCache(sharedRawBuildCache);
    }
  }

  parentPort.postMessage({ results, failures });
}

run().catch((err) => {
  parentPort.postMessage({
    results: {},
    failures: [{ section: '4 Runtime Worker', detail: err instanceof Error ? err.stack || err.message : String(err) }],
  });
});
