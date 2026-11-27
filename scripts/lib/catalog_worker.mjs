/**
 * Parallel V2 STD Spatial & PBR Material Bucket Extractor Worker (`scripts/lib/catalog_worker.mjs`)
 * Uses unified cached ESM bundle + `{ skipEdges: true }` (zero visual impact; catalog only reads Box3 & material buckets!).
 */

import { parentPort, workerData } from 'node:worker_threads';
import { pathToFileURL } from 'node:url';
import * as THREE from 'three';

const COMPOSITE_MODES = new Set(['integrated', 'camera_body']);
const _boxSize = new THREE.Vector3();
const _tmpBox = new THREE.Box3();

function fmtNum(v) {
  if (typeof v !== 'number' || !Number.isFinite(v)) return '0';
  const r = Math.round(v * 100) / 100;
  return Object.is(r, -0) || r === 0 ? '0' : String(r);
}

async function run() {
  const { bundlePath, modes } = workerData;
  const runtimeMod = await import(pathToFileURL(bundlePath).href);
  const { loadRegisteredUnit, ResourceCache } = runtimeMod;
  const cache = new ResourceCache();
  const out = {};

  for (const mode of modes) {
    const unit = await loadRegisteredUnit(mode);
    const built = await unit.build('standard', cache, {
      synchronous: true,
      integratedMode: COMPOSITE_MODES.has(mode),
      skipEdges: true,
    });

    const sizeEntries = {};
    for (const [partId, pb] of built.raycastIndex.partBoundsById.entries()) {
      if (pb.localBox && !pb.localBox.isEmpty()) {
        pb.localBox.getSize(_boxSize);
        sizeEntries[partId] = `${fmtNum(_boxSize.x)},${fmtNum(_boxSize.y)},${fmtNum(_boxSize.z)}`;
      } else {
        sizeEntries[partId] = '-';
      }
    }

    const matTallies = new Map();
    const addTally = (partId, bucket, weight) => {
      if (!partId || !bucket) return;
      let m = matTallies.get(partId);
      if (!m) {
        m = new Map();
        matTallies.set(partId, m);
      }
      m.set(bucket, (m.get(bucket) || 0) + weight);
    };

    for (const binding of built.raycastIndex.bindings) {
      const mat = binding.mesh?.material;
      const bucket = mat?.userData?.__materialBucket || null;
      if (!bucket) continue;
      if (binding.kind === 'batched') {
        const bm = binding.mesh;
        for (let bi = 0; bi < binding.batchIdToPartId.length; bi++) {
          const pid = binding.batchIdToPartId[bi];
          if (!pid) continue;
          let weight = 2;
          try {
            if (typeof bm.getGeometryIdAt === 'function' && typeof bm.getBoundingBoxAt === 'function') {
              const gid = bm.getGeometryIdAt(bi);
              if (bm.getBoundingBoxAt(gid, _tmpBox) && !_tmpBox.isEmpty()) {
                _tmpBox.getSize(_boxSize);
                weight = Math.max(0.5, _boxSize.x + _boxSize.y + _boxSize.z);
              }
            }
          } catch {
            weight = 2;
          }
          addTally(pid, bucket, weight);
        }
      } else if (binding.kind === 'instanced') {
        const geo = binding.mesh?.geometry;
        let instW = 0.8;
        if (geo) {
          if (!geo.boundingBox) geo.computeBoundingBox();
          if (geo.boundingBox && !geo.boundingBox.isEmpty()) {
            geo.boundingBox.getSize(_boxSize);
            instW = Math.max(0.25, (_boxSize.x + _boxSize.y + _boxSize.z) * 0.5);
          }
        }
        for (const pid of binding.instanceIdToPartId) {
          addTally(pid, bucket, instW);
        }
      }
    }

    const matEntries = {};
    for (const [partId, tally] of matTallies.entries()) {
      let bestBucket = '-';
      let bestW = -1;
      for (const [bucket, w] of tally.entries()) {
        if (w > bestW || (w === bestW && bucket < bestBucket)) {
          bestBucket = bucket;
          bestW = w;
        }
      }
      matEntries[partId] = bestBucket;
    }

    unit.dispose(cache);
    const post = cache.getStats();
    if (post.totalRefs !== 0 || post.materials !== 0 || post.geometries !== 0 || post.textures !== 0) {
      throw new Error(`Zero-leak violation during catalog build of '${mode}': ${JSON.stringify(post)}`);
    }

    out[mode] = { sizeEntries, matEntries };
  }

  parentPort.postMessage({ ok: true, out });
}

run().catch((err) => {
  parentPort.postMessage({
    ok: false,
    error: err instanceof Error ? err.stack || err.message : String(err),
  });
});
