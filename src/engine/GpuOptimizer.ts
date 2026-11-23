import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { CadPart } from '../assemblies/types';

export interface GpuProfile {
  /** True on Android / iOS / Capacitor APK / narrow touch devices (or ?gpu=mobile) */
  isMobile: boolean;
  /** Maximum canvas devicePixelRatio cap (prevents 1.5K/2K Adreno GMEM tile overflow) */
  maxPixelRatio: number;
  /** WebGL MSAA flag (disabled on high-DPI mobile phones to save 75% GMEM/VRAM) */
  antialias: boolean;
  /** Procedural CanvasTexture resolution scale (0.5 on mobile -> 4x VRAM reduction) */
  textureScale: number;
  /** Maximum texture anisotropy */
  maxAnisotropy: number;
  /** Geometry curve/radial segment scale (0.62 on mobile -> ~40% fewer triangles) */
  curveScale: number;
  /** Extra angle threshold for CAD EdgesGeometry on mobile (reduces tiny noisy bevel lines) */
  edgeThresholdBoost: number;
  /** Consolidate secondary iridescent/clearcoat shader permutations on mobile Adreno */
  simplifyPhysicalShaders: boolean;
  /** Studio directional light count (reduced on mobile to shorten GLSL fragment compilation) */
  lightRigMode: 'full' | 'mobile';
}

function detectGpuProfile(): GpuProfile {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isMobile: false,
      maxPixelRatio: 2.0,
      antialias: true,
      textureScale: 1.0,
      maxAnisotropy: 4,
      curveScale: 1.0,
      edgeThresholdBoost: 0,
      simplifyPhysicalShaders: false,
      lightRigMode: 'full',
    };
  }

  const params = new URLSearchParams(window.location.search);
  const override = params.get('gpu');

  const ua = navigator.userAgent || '';
  const isCapacitor = Boolean((window as unknown as { Capacitor?: unknown }).Capacitor);
  const uaMobile = /Android|iPhone|iPad|iPod|Mobile|wv\)|POCO|Xiaomi|MIUI|HyperOS/i.test(ua);
  const narrowTouch =
    (navigator.maxTouchPoints ?? 0) > 0 && Math.min(window.screen.width, window.screen.height) <= 1024;

  const isMobile =
    override === 'mobile' ? true : override === 'desktop' ? false : isCapacitor || uaMobile || narrowTouch;

  if (isMobile) {
    return {
      isMobile: true,
      maxPixelRatio: 1.5,
      antialias: false,
      textureScale: 0.5,
      maxAnisotropy: 2,
      curveScale: 0.62,
      edgeThresholdBoost: 6,
      simplifyPhysicalShaders: true,
      lightRigMode: 'mobile',
    };
  }

  return {
    isMobile: false,
    maxPixelRatio: 2.0,
    antialias: true,
    textureScale: 1.0,
    maxAnisotropy: 4,
    curveScale: 1.0,
    edgeThresholdBoost: 0,
    simplifyPhysicalShaders: false,
    lightRigMode: 'full',
  };
}

/** Singleton GPU profile evaluated once at startup so geometry, materials & renderer match. */
export const GPU_PROFILE: GpuProfile = detectGpuProfile();

/** Scale a geometry segment count cleanly according to the active GPU profile. */
export function scaleSegments(segments: number, minSegments = 6): number {
  if (GPU_PROFILE.curveScale >= 0.999) return segments;
  return Math.max(minSegments, Math.round(segments * GPU_PROFILE.curveScale));
}

/**
 * Parts whose child sub-meshes animate independently inside live kinematic rigs.
 * These ~34 parts keep their exact internal child hierarchy untouched; all ~593 rigid
 * CadParts have their static same-material sub-meshes and CAD edge lines safely batched
 * inside their own part.group (preserving all 627 parts, selection, explode & isolation!).
 */
const DYNAMIC_PART_IDS = new Set<string>([
  // Body interactive controls
  'body-command-encoders',
  'body-rear-controls',
  'body-rear-wheel-encoder',
  'body-shutter-dials',
  'body-shutter-switch',
  // EVF live diopter & IR eye-tracking LEDs
  'evf-diopter-helicoid',
  'evf-diopter-lock-clutch',
  'evf-diopter-mech',
  'evf-ir-leds',
  // 50mm F1.2 GM live 11-blade iris, Quad XD movers, MR scales & rings
  'lens-aperture-11',
  'lens-aperture-ring',
  'lens-aperture-sensor',
  'lens-control-rings',
  'lens-iris-cam-ring',
  'lens-iris-stepper',
  'lens-mf-encoder',
  'lens-mr-magnet-scales',
  'lens-xd-motors',
  // Mainboard live activity glow indicators
  'mb-ai-npu',
  'mb-cfexpress',
  'mb-isp-die',
  // Mount live lock-pin, release button, detect switch & tally LED
  'mount-af-assist-module',
  'mount-lens-detect-switch',
  'mount-lock-pin',
  'mount-release-actuator',
  // Shutter live 4-bar curtain linkage, gears, cam, armatures & coils
  'shutter-armature-levers',
  'shutter-charge-gears',
  'shutter-cocking-cam',
  'shutter-counterweight',
  'shutter-curtain-1',
  'shutter-curtain-2',
  'shutter-dual-drive',
  'shutter-link-1',
  'shutter-link-2',
  'shutter-magnets',
  'shutter-x-sync-contact',
]);

function materialNeedsUv(mat: THREE.Material): boolean {
  const m = mat as THREE.MeshStandardMaterial;
  return Boolean(
    m.map || m.bumpMap || m.roughnessMap || m.metalnessMap || m.emissiveMap || m.alphaMap || m.normalMap
  );
}

function flipWindingNonIndexed(geo: THREE.BufferGeometry): void {
  const pos = geo.getAttribute('position');
  if (!pos) return;
  const attrs = Object.values(geo.attributes);
  const count = pos.count;
  for (let i = 0; i + 2 < count; i += 3) {
    for (const attr of attrs) {
      const itemSize = attr.itemSize;
      const arr = attr.array as Float32Array;
      const i1 = (i + 1) * itemSize;
      const i2 = (i + 2) * itemSize;
      for (let k = 0; k < itemSize; k++) {
        const tmp = arr[i1 + k];
        arr[i1 + k] = arr[i2 + k];
        arr[i2 + k] = tmp;
      }
    }
  }
}

function prepareMeshGeometryForMerge(
  sourceGeo: THREE.BufferGeometry,
  relMatrix: THREE.Matrix4,
  keepUv: boolean,
  keepColor: boolean
): THREE.BufferGeometry | null {
  const posAttr = sourceGeo.getAttribute('position');
  if (!posAttr || posAttr.count === 0) return null;

  const nonIdx = sourceGeo.index ? sourceGeo.toNonIndexed() : sourceGeo.clone();
  nonIdx.applyMatrix4(relMatrix);

  // Preserve valid outward-facing triangle winding if parent had a mirrored negative scale
  if (relMatrix.determinant() < 0) {
    flipWindingNonIndexed(nonIdx);
  }

  if (!nonIdx.getAttribute('normal')) {
    nonIdx.computeVertexNormals();
  }

  const vCount = nonIdx.getAttribute('position').count;
  const clean = new THREE.BufferGeometry();
  clean.setAttribute('position', nonIdx.getAttribute('position'));
  clean.setAttribute('normal', nonIdx.getAttribute('normal'));

  if (keepUv) {
    const uv = nonIdx.getAttribute('uv');
    if (uv) {
      clean.setAttribute('uv', uv);
    } else {
      clean.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(vCount * 2), 2));
    }
  }

  if (keepColor) {
    const col = nonIdx.getAttribute('color');
    if (col) {
      clean.setAttribute('color', col);
    } else {
      const white = new Float32Array(vCount * 3);
      white.fill(1);
      clean.setAttribute('color', new THREE.BufferAttribute(white, 3));
    }
  }

  nonIdx.dispose();
  return clean;
}

/**
 * Batch static same-material sub-meshes and merge CAD edge LineSegments within each rigid CadPart.
 * Cuts WebGL draw calls by ~75–85% and GPU geometries by ~80% while keeping ALL 627 parts,
 * individual selection, hover, highlight, explode trajectories, and live animations 100% intact.
 */
export function optimizePartSubtree(
  part: CadPart,
  clippingPlanes: THREE.Plane[]
): { meshesBefore: number; meshesAfter: number; edgesBefore: number; edgesAfter: number } {
  const meshesBefore = part.interactiveMeshes.length;
  const edgesBefore = part.edgeLines.length;

  // Dynamic rig parts: keep child meshes unmerged, but deduplicate duplicate LineBasicMaterials per opacity
  if (DYNAMIC_PART_IDS.has(part.id)) {
    const matByOp = new Map<number, THREE.LineBasicMaterial>();
    for (const line of part.edgeLines) {
      const baseOp = (line.userData.baseOpacity as number) ?? 0.2;
      const key = Math.round(baseOp * 100);
      let shared = matByOp.get(key);
      if (!shared) {
        shared = new THREE.LineBasicMaterial({
          color: 0x181c24,
          transparent: true,
          opacity: baseOp,
          clippingPlanes,
        });
        matByOp.set(key, shared);
      }
      const oldMat = line.material;
      if (oldMat !== shared) {
        line.material = shared;
        if (oldMat instanceof THREE.Material) oldMat.dispose();
      }
    }
    return { meshesBefore, meshesAfter: meshesBefore, edgesBefore, edgesAfter: edgesBefore };
  }

  // Ensure world transforms reflect the part's assembled hierarchy
  part.group.updateMatrixWorld(true);
  const invPartWorld = part.group.matrixWorld.clone().invert();
  const relMatrix = new THREE.Matrix4();

  // -------------------------------------------------------------------------
  // 1. Merge ALL CAD edge LineSegments inside this rigid part by opacity bucket
  // -------------------------------------------------------------------------
  const newEdgeLines: THREE.LineSegments[] = [];
  if (part.edgeLines.length > 0) {
    const edgeBuckets = new Map<
      number,
      { baseOpacity: number; lines: THREE.LineSegments[]; totalVerts: number }
    >();

    for (const line of part.edgeLines) {
      const pos = line.geometry.getAttribute('position');
      if (!pos || pos.count < 2) continue;
      const baseOp = (line.userData.baseOpacity as number) ?? 0.2;
      const key = Math.round(baseOp * 100);
      let bucket = edgeBuckets.get(key);
      if (!bucket) {
        bucket = { baseOpacity: baseOp, lines: [], totalVerts: 0 };
        edgeBuckets.set(key, bucket);
      }
      bucket.lines.push(line);
      bucket.totalVerts += pos.count;
    }

    const v = new THREE.Vector3();
    for (const bucket of edgeBuckets.values()) {
      const mergedArr = new Float32Array(bucket.totalVerts * 3);
      let offset = 0;

      for (const line of bucket.lines) {
        relMatrix.multiplyMatrices(invPartWorld, line.matrixWorld);
        const pos = line.geometry.getAttribute('position');
        for (let i = 0; i < pos.count; i++) {
          v.fromBufferAttribute(pos, i).applyMatrix4(relMatrix);
          mergedArr[offset++] = v.x;
          mergedArr[offset++] = v.y;
          mergedArr[offset++] = v.z;
        }
        line.removeFromParent();
        line.geometry.dispose();
        if (line.material instanceof THREE.Material) line.material.dispose();
      }

      const mergedEdgeGeo = new THREE.BufferGeometry();
      mergedEdgeGeo.setAttribute('position', new THREE.BufferAttribute(mergedArr, 3));
      const mergedEdgeMat = new THREE.LineBasicMaterial({
        color: 0x181c24,
        transparent: true,
        opacity: bucket.baseOpacity,
        clippingPlanes,
      });
      const mergedLine = new THREE.LineSegments(mergedEdgeGeo, mergedEdgeMat);
      mergedLine.userData.baseOpacity = bucket.baseOpacity;
      mergedLine.userData.partId = part.id;
      mergedLine.renderOrder = 2;
      part.group.add(mergedLine);
      newEdgeLines.push(mergedLine);
    }
    part.edgeLines = newEdgeLines;
  }

  // -------------------------------------------------------------------------
  // 2. Merge static same-material child meshes within this rigid part
  // -------------------------------------------------------------------------
  const meshesByMat = new Map<THREE.Material, THREE.Mesh[]>();
  const keptMeshes: THREE.Mesh[] = [];

  for (const mesh of part.interactiveMeshes) {
    if (
      (mesh as THREE.InstancedMesh).isInstancedMesh ||
      Array.isArray(mesh.material) ||
      mesh.userData.noMerge ||
      !mesh.visible
    ) {
      keptMeshes.push(mesh);
      continue;
    }
    const mat = mesh.material;
    let list = meshesByMat.get(mat);
    if (!list) {
      list = [];
      meshesByMat.set(mat, list);
    }
    list.push(mesh);
  }

  for (const [mat, list] of meshesByMat.entries()) {
    if (list.length < 2) {
      keptMeshes.push(list[0]);
      continue;
    }

    const keepUv = materialNeedsUv(mat);
    const keepColor = list.some((m) => Boolean(m.geometry.getAttribute('color')));
    const prepared: THREE.BufferGeometry[] = [];
    const sourceMeshes: THREE.Mesh[] = [];

    for (const mesh of list) {
      relMatrix.multiplyMatrices(invPartWorld, mesh.matrixWorld);
      const g = prepareMeshGeometryForMerge(mesh.geometry, relMatrix, keepUv, keepColor);
      if (g) {
        prepared.push(g);
        sourceMeshes.push(mesh);
      } else {
        keptMeshes.push(mesh);
      }
    }

    if (prepared.length < 2) {
      for (const g of prepared) g.dispose();
      keptMeshes.push(...sourceMeshes);
      continue;
    }

    const mergedGeo = mergeGeometries(prepared, false);
    for (const g of prepared) g.dispose();

    if (!mergedGeo) {
      keptMeshes.push(...sourceMeshes);
      continue;
    }

    mergedGeo.computeBoundingBox();
    mergedGeo.computeBoundingSphere();

    const mergedMesh = new THREE.Mesh(mergedGeo, mat);
    mergedMesh.userData.partId = part.id;
    mergedMesh.renderOrder = sourceMeshes[0].renderOrder;
    part.group.add(mergedMesh);
    keptMeshes.push(mergedMesh);

    // Safely re-parent any remaining unmerged children before removing source meshes
    for (const oldMesh of sourceMeshes) {
      while (oldMesh.children.length > 0) {
        part.group.attach(oldMesh.children[0]);
      }
      oldMesh.removeFromParent();
      oldMesh.geometry.dispose();
    }
  }

  // Prune empty intermediate THREE.Group containers to speed up traversal & raycasting
  const pruneEmptyGroups = (node: THREE.Object3D): void => {
    for (let i = node.children.length - 1; i >= 0; i--) {
      const child = node.children[i];
      if (child.type === 'Group' || child.type === 'Object3D') {
        pruneEmptyGroups(child);
        if (child.children.length === 0) {
          node.remove(child);
        }
      }
    }
  };
  pruneEmptyGroups(part.group);

  part.interactiveMeshes = keptMeshes;

  return {
    meshesBefore,
    meshesAfter: part.interactiveMeshes.length,
    edgesBefore,
    edgesAfter: part.edgeLines.length,
  };
}

/**
 * Downscale procedural CanvasTextures & consolidate heavy mobile PBR shader variants
 * so Adreno / mobile GPUs keep VRAM low and compile GLSL programs without Watchdog stalls.
 */
export function optimizeMaterialsForGpu(
  allMaterials: THREE.Material[],
  heroOpticalMaterials: Set<THREE.Material>,
  profile: GpuProfile
): { texturesOptimized: number; shadersSimplified: number } {
  const seenTextures = new Set<THREE.Texture>();
  let texturesOptimized = 0;
  let shadersSimplified = 0;

  const texSlots = [
    'map',
    'bumpMap',
    'roughnessMap',
    'metalnessMap',
    'emissiveMap',
    'alphaMap',
    'normalMap',
  ] as const;

  for (const mat of allMaterials) {
    const std = mat as THREE.MeshStandardMaterial;
    for (const slot of texSlots) {
      const tex = std[slot];
      if (!tex || seenTextures.has(tex)) continue;
      seenTextures.add(tex);

      tex.anisotropy = Math.min(tex.anisotropy || 1, profile.maxAnisotropy);

      if (profile.textureScale < 0.999 && tex instanceof THREE.CanvasTexture) {
        const img = tex.image as HTMLCanvasElement | undefined;
        if (img && typeof img.width === 'number' && Math.max(img.width, img.height) >= 256) {
          const nw = Math.max(128, Math.round(img.width * profile.textureScale));
          const nh = Math.max(128, Math.round(img.height * profile.textureScale));
          const small = document.createElement('canvas');
          small.width = nw;
          small.height = nh;
          const ctx = small.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, nw, nh);
            tex.image = small;
            tex.needsUpdate = true;
            texturesOptimized++;
          }
        }
      }
    }

    if (profile.simplifyPhysicalShaders && mat instanceof THREE.MeshPhysicalMaterial) {
      const isHero = heroOpticalMaterials.has(mat);
      let touched = false;
      if (!isHero && mat.iridescence > 0) {
        mat.iridescence = 0;
        touched = true;
      }
      if (!isHero && !mat.transparent && mat.clearcoat > 0) {
        mat.clearcoat = 0;
        touched = true;
      }
      if (touched) {
        mat.needsUpdate = true;
        shadersSimplified++;
      }
    }
  }

  return { texturesOptimized, shadersSimplified };
}

/**
 * Mark all CanvasTextures & Materials dirty after a WebGL context restore so every surface
 * immediately re-uploads cleanly to the new GPU context.
 */
export function refreshMaterialsAfterContextRestore(allMaterials: THREE.Material[]): void {
  const seenTextures = new Set<THREE.Texture>();
  const texSlots = [
    'map',
    'bumpMap',
    'roughnessMap',
    'metalnessMap',
    'emissiveMap',
    'alphaMap',
    'normalMap',
  ] as const;

  for (const mat of allMaterials) {
    const std = mat as THREE.MeshStandardMaterial;
    for (const slot of texSlots) {
      const tex = std[slot];
      if (tex && !seenTextures.has(tex)) {
        seenTextures.add(tex);
        tex.needsUpdate = true;
      }
    }
    mat.needsUpdate = true;
  }
}

/**
 * Evict WebGL GPU VBOs/VAOs of hidden parts while keeping CPU TypedArrays intact.
 * Three.js seamlessly re-uploads a geometry's VBO on demand whenever that mode is revisited,
 * preventing VRAM accumulation across all 11 modes / 627 parts on mobile Adreno GPUs!
 */
export function evictHiddenGpuGeometries(
  allParts: CadPart[],
  renderer: THREE.WebGLRenderer
): number {
  const activeGeos = new Set<THREE.BufferGeometry>();

  for (const part of allParts) {
    if (!part.group.visible) continue;
    part.group.traverse((obj) => {
      const geo = (obj as THREE.Mesh | THREE.LineSegments).geometry;
      if (geo) activeGeos.add(geo);
    });
  }

  const evicted = new Set<THREE.BufferGeometry>();
  for (const part of allParts) {
    if (part.group.visible) continue;
    part.group.traverse((obj) => {
      const geo = (obj as THREE.Mesh | THREE.LineSegments).geometry;
      if (geo && !activeGeos.has(geo) && !evicted.has(geo)) {
        evicted.add(geo);
        geo.dispose();
      }
    });
  }

  renderer.renderLists.dispose();
  return evicted.size;
}
