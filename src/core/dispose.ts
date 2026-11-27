import * as THREE from 'three';
import type { ResourceCache } from './resource_cache';

const TEXTURE_SLOTS = [
  'map',
  'bumpMap',
  'normalMap',
  'roughnessMap',
  'metalnessMap',
  'emissiveMap',
  'alphaMap',
  'aoMap',
  'envMap',
  'clearcoatMap',
  'clearcoatRoughnessMap',
  'clearcoatNormalMap',
  'iridescenceMap',
] as const;

export interface DisposeReport {
  disposedObjects: number;
  releasedCachedGeometries: number;
  disposedUniqueGeometries: number;
  releasedCachedMaterials: number;
  disposedUniqueMaterials: number;
  disposedUniqueTextures: number;
  disposedInstancedMeshes: number;
  disposedBatchedMeshes: number;
}

function disposeOrReleaseMaterial(
  mat: THREE.Material,
  cache: ResourceCache | null,
  report: DisposeReport,
  seenUniqueMaterials: Set<THREE.Material>,
  seenUniqueTextures: Set<THREE.Texture>
): void {
  const key = mat.userData?.__cacheKey as string | undefined;
  if (cache && key && cache.hasMaterial(key)) {
    cache.releaseMaterial(key);
    report.releasedCachedMaterials++;
    return;
  }

  if (seenUniqueMaterials.has(mat)) return;
  seenUniqueMaterials.add(mat);

  const rec = mat as unknown as Record<string, unknown>;
  for (let i = 0; i < TEXTURE_SLOTS.length; i++) {
    const tex = rec[TEXTURE_SLOTS[i]];
    if (tex instanceof THREE.Texture && !seenUniqueTextures.has(tex)) {
      const texKey = tex.userData?.__cacheKey as string | undefined;
      if (cache && texKey) {
        cache.releaseTexture(texKey);
      } else {
        tex.dispose();
        report.disposedUniqueTextures++;
      }
      seenUniqueTextures.add(tex);
    }
  }
  mat.dispose();
  report.disposedUniqueMaterials++;
}

function disposeOrReleaseGeometry(
  geo: THREE.BufferGeometry,
  cache: ResourceCache | null,
  report: DisposeReport,
  seenUniqueGeometries: Set<THREE.BufferGeometry>
): void {
  const key = geo.userData?.__cacheKey as string | undefined;
  if (cache && key && cache.hasGeometry(key)) {
    cache.releaseGeometry(key);
    report.releasedCachedGeometries++;
    return;
  }
  if (seenUniqueGeometries.has(geo)) return;
  seenUniqueGeometries.add(geo);
  geo.dispose();
  report.disposedUniqueGeometries++;
}

/**
 * Complete recursive GPU resource disposal utility.
 * Disposes BatchedMesh, InstancedMesh (including instanceMatrix/instanceColor buffers),
 * unique BufferGeometries, non-cached Materials & Textures, and decrements ResourceCache
 * ref-counts before detaching from the scene graph.
 */
export function disposeObject3D(
  root: THREE.Object3D,
  cache: ResourceCache | null = null,
  detachRootFromParent = true
): DisposeReport {
  const report: DisposeReport = {
    disposedObjects: 0,
    releasedCachedGeometries: 0,
    disposedUniqueGeometries: 0,
    releasedCachedMaterials: 0,
    disposedUniqueMaterials: 0,
    disposedUniqueTextures: 0,
    disposedInstancedMeshes: 0,
    disposedBatchedMeshes: 0,
  };

  const seenUniqueGeometries = new Set<THREE.BufferGeometry>();
  const seenUniqueMaterials = new Set<THREE.Material>();
  const seenUniqueTextures = new Set<THREE.Texture>();

  const visit = (node: THREE.Object3D): void => {
    // Copy children list since recursive detaching mutates node.children
    const children = node.children.slice();
    for (let i = 0; i < children.length; i++) {
      visit(children[i]);
    }

    report.disposedObjects++;

    if ((node as THREE.BatchedMesh).isBatchedMesh) {
      const batched = node as THREE.BatchedMesh;
      if (Array.isArray(batched.material)) {
        for (let i = 0; i < batched.material.length; i++) {
          disposeOrReleaseMaterial(
            batched.material[i],
            cache,
            report,
            seenUniqueMaterials,
            seenUniqueTextures
          );
        }
      } else if (batched.material) {
        disposeOrReleaseMaterial(
          batched.material,
          cache,
          report,
          seenUniqueMaterials,
          seenUniqueTextures
        );
      }
      batched.dispose();
      report.disposedBatchedMeshes++;
    } else if ((node as THREE.InstancedMesh).isInstancedMesh) {
      const inst = node as THREE.InstancedMesh;
      if (inst.geometry) {
        disposeOrReleaseGeometry(inst.geometry, cache, report, seenUniqueGeometries);
      }
      if (Array.isArray(inst.material)) {
        for (let i = 0; i < inst.material.length; i++) {
          disposeOrReleaseMaterial(
            inst.material[i],
            cache,
            report,
            seenUniqueMaterials,
            seenUniqueTextures
          );
        }
      } else if (inst.material) {
        disposeOrReleaseMaterial(
          inst.material,
          cache,
          report,
          seenUniqueMaterials,
          seenUniqueTextures
        );
      }
      inst.dispose();
      report.disposedInstancedMeshes++;
    } else if (
      (node as THREE.Mesh).isMesh ||
      (node as THREE.Line).isLine ||
      (node as THREE.Points).isPoints
    ) {
      const renderable = node as THREE.Mesh | THREE.Line | THREE.Points;
      if (renderable.geometry) {
        disposeOrReleaseGeometry(renderable.geometry, cache, report, seenUniqueGeometries);
      }
      if (Array.isArray(renderable.material)) {
        for (let i = 0; i < renderable.material.length; i++) {
          disposeOrReleaseMaterial(
            renderable.material[i],
            cache,
            report,
            seenUniqueMaterials,
            seenUniqueTextures
          );
        }
      } else if (renderable.material) {
        disposeOrReleaseMaterial(
          renderable.material,
          cache,
          report,
          seenUniqueMaterials,
          seenUniqueTextures
        );
      }
    } else if ((node as THREE.Light).isLight) {
      const light = node as THREE.Light;
      if (typeof light.dispose === 'function') {
        light.dispose();
      }
    }

    if (node !== root && node.parent) {
      node.parent.remove(node);
    }
  };

  visit(root);

  if (detachRootFromParent && root.parent) {
    root.parent.remove(root);
  }

  return report;
}

export interface VramSnapshot {
  readonly geometries: number;
  readonly textures: number;
  readonly timestampMs: number;
}

export interface VramLeakVerification {
  readonly baseline: VramSnapshot;
  readonly peak: VramSnapshot;
  readonly afterDispose: VramSnapshot;
  readonly deltaGeometries: number;
  readonly deltaTextures: number;
  readonly cacheRemainingRefs: number;
  readonly passed: boolean;
}

/**
 * Automatic VRAM Leak Detector comparing renderer.info.memory before unit activation vs after disposal.
 */
export class VramLeakMonitor {
  private baseline: VramSnapshot | null = null;
  private peak: VramSnapshot | null = null;
  private lastVerification: VramLeakVerification | null = null;
  private switchCount = 0;

  public captureBaseline(renderer: THREE.WebGLRenderer): VramSnapshot {
    const snap: VramSnapshot = {
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      timestampMs: typeof performance !== 'undefined' ? performance.now() : Date.now(),
    };
    this.baseline = snap;
    this.peak = snap;
    return snap;
  }

  public recordActivePeak(renderer: THREE.WebGLRenderer): VramSnapshot {
    const snap: VramSnapshot = {
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      timestampMs: typeof performance !== 'undefined' ? performance.now() : Date.now(),
    };
    if (
      !this.peak ||
      snap.geometries > this.peak.geometries ||
      snap.textures > this.peak.textures
    ) {
      this.peak = snap;
    }
    return snap;
  }

  public verifyAfterDispose(
    renderer: THREE.WebGLRenderer,
    cache: ResourceCache,
    expectedTextureDelta = 0
  ): VramLeakVerification {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const after: VramSnapshot = {
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      timestampMs: now,
    };
    const base = this.baseline ?? after;
    const peak = this.peak ?? after;
    const cacheStats = cache.getStats();
    const deltaGeometries = after.geometries - base.geometries;
    const deltaTextures = after.textures - base.textures - expectedTextureDelta;
    const passed =
      deltaGeometries <= 0 &&
      deltaTextures <= 0 &&
      cacheStats.totalRefs === 0 &&
      cacheStats.geometries === 0 &&
      cacheStats.materials === 0 &&
      cacheStats.textures === 0;

    this.switchCount++;
    const result: VramLeakVerification = {
      baseline: base,
      peak,
      afterDispose: after,
      deltaGeometries,
      deltaTextures,
      cacheRemainingRefs: cacheStats.totalRefs,
      passed,
    };
    this.lastVerification = result;

    if (!passed) {
      console.warn('[MI Shoe V2 VRAM Leak Detector] Residual GPU/cache resources detected!', {
        ...result,
        cacheStats,
      });
    }
    return result;
  }

  public getLastVerification(): VramLeakVerification | null {
    return this.lastVerification;
  }

  public getSwitchCount(): number {
    return this.switchCount;
  }
}
