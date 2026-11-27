import * as THREE from 'three';
import { listRegisteredUnits, loadRegisteredUnit } from '../units/registry';
import { ResourceCache } from '../core/resource_cache';
import { UnitMeta, UnitPartMeta } from '../core/unit_contract';

const COMPOSITE_UNIT_IDS = new Set(['integrated', 'camera_body']);

/**
 * Normalize zoomed-in standalone dissection units to authentic Sony α7 IV millimeter scale
 * so every part across all 2,051+ catalog entries fits together at real mechanical proportions.
 */
const REAL_CAMERA_UNIT_SCALE: Readonly<Record<string, number>> = {
  bionz: 0.56,
  bionz_v2: 0.35,
  cfexpress: 0.50,
  mishoe: 0.45,
  mic: 0.55,
  micro: 0.32,
  micro_v2: 0.32,
  sensor_fab: 0.32,
  drybox: 0.45,
  welcome: 0.65,
};

export type EngineeringRole =
  | 'lens'
  | 'mount'
  | 'shutter'
  | 'sensor'
  | 'mainboard'
  | 'bionz'
  | 'battery'
  | 'storage'
  | 'evf'
  | 'lcd'
  | 'body'
  | 'audio'
  | 'thermal_emi'
  | 'mishoe'
  | 'accessory'
  | 'sculpture';

export interface CatalogPartEntry {
  readonly key: string; // `${unitId}::${partId}`
  readonly unitId: string;
  readonly unitNameJa: string;
  readonly partId: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: string;
  readonly swatchColor: string;
  readonly assembledPos: readonly [number, number, number];
  readonly role: EngineeringRole;
}

export interface CatalogUnitSummary {
  readonly unitId: string;
  readonly nameJa: string;
  readonly nameEn: string;
  readonly count: number;
}

interface ExtractedMeshSpec {
  readonly geometry: THREE.BufferGeometry;
  readonly colorHex: number;
  readonly metalness: number;
  readonly roughness: number;
  readonly transparent: boolean;
  readonly opacity: number;
  readonly localMatrix: THREE.Matrix4;
}

export interface ExtractedPartBlueprint {
  readonly entry: CatalogPartEntry;
  readonly meshes: readonly ExtractedMeshSpec[];
  readonly naturalSize: THREE.Vector3;
  readonly naturalCenter: THREE.Vector3;
}

interface BatchedGeoInfoInternal {
  vertexStart: number;
  vertexCount: number;
  indexStart: number;
  indexCount: number;
}

interface BatchedInstInfoInternal {
  visible: boolean;
  active: boolean;
  geometryIndex: number;
}

export function classifyEngineeringRole(unitId: string, part: UnitPartMeta): EngineeringRole {
  const hay = `${part.id} ${part.title} ${part.subtitle} ${part.category}`.toLowerCase();
  if (unitId === 'welcome') return 'sculpture';
  if (unitId === 'lens') return 'lens';
  if (unitId === 'mount') return 'mount';
  if (unitId === 'shutter') return 'shutter';
  if (unitId === 'sensor' || unitId === 'micro' || unitId === 'micro_v2' || unitId === 'sensor_fab') {
    if (hay.includes('graphite') || hay.includes('copper') || hay.includes('sink') || hay.includes('tim') || hay.includes('放熱')) {
      return 'thermal_emi';
    }
    return 'sensor';
  }
  if (unitId === 'bionz' || unitId === 'bionz_v2') return 'bionz';
  if (unitId === 'mainboard') {
    if (hay.includes('vapor') || hay.includes('emi') || hay.includes('shield') || hay.includes('放熱') || hay.includes('シールド')) {
      return 'thermal_emi';
    }
    if (hay.includes('isp') || hay.includes('bionz') || hay.includes('npu') || hay.includes('die')) {
      return 'bionz';
    }
    if (hay.includes('cfexpress') || hay.includes('io') || hay.includes('slot') || hay.includes('port')) {
      return 'storage';
    }
    if (hay.includes('pmic') || hay.includes('power') || hay.includes('電源')) {
      return 'battery';
    }
    return 'mainboard';
  }
  if (unitId === 'battery') return 'battery';
  if (unitId === 'cfexpress') return 'storage';
  if (unitId === 'evf') return 'evf';
  if (unitId === 'lcd') return 'lcd';
  if (unitId === 'mic') return 'audio';
  if (unitId === 'mishoe') return 'mishoe';
  if (unitId === 'body') {
    const pid = part.id.toLowerCase();
    if (
      pid.includes('gasket') ||
      pid.includes('seal') ||
      pid.includes('heat') ||
      pid.includes('graphite') ||
      pid.includes('thermal') ||
      pid.includes('shield') ||
      pid.includes('emi')
    ) {
      return 'thermal_emi';
    }
    if (pid.includes('mic') || pid.includes('speaker')) return 'audio';
    if (pid.includes('card') || pid.includes('usb') || pid.includes('hdmi') || pid.includes('slot')) return 'storage';
    return 'body';
  }
  return 'accessory';
}

function sliceBatchedGeometry(
  batchedGeo: THREE.BufferGeometry,
  info: BatchedGeoInfoInternal
): THREE.BufferGeometry | null {
  const posAttr = batchedGeo.getAttribute('position');
  if (!posAttr || info.vertexCount < 3) return null;
  const vStart = info.vertexStart;
  const vCount = info.vertexCount;

  const posOut = new Float32Array(vCount * 3);
  for (let i = 0; i < vCount; i++) {
    const si = vStart + i;
    const o = i * 3;
    posOut[o] = posAttr.getX(si);
    posOut[o + 1] = posAttr.getY(si);
    posOut[o + 2] = posAttr.getZ(si);
  }

  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(posOut, 3));

  const normAttr = batchedGeo.getAttribute('normal');
  if (normAttr) {
    const normOut = new Float32Array(vCount * 3);
    for (let i = 0; i < vCount; i++) {
      const si = vStart + i;
      const o = i * 3;
      normOut[o] = normAttr.getX(si);
      normOut[o + 1] = normAttr.getY(si);
      normOut[o + 2] = normAttr.getZ(si);
    }
    out.setAttribute('normal', new THREE.BufferAttribute(normOut, 3));
  }

  const srcIdx = batchedGeo.getIndex();
  if (srcIdx && info.indexCount >= 3 && info.indexStart >= 0) {
    const iCount = info.indexCount;
    const iStart = info.indexStart;
    const srcArr = srcIdx.array;
    const idxArr = vCount <= 65535 ? new Uint16Array(iCount) : new Uint32Array(iCount);
    for (let i = 0; i < iCount; i++) {
      const v = srcArr[iStart + i] - vStart;
      idxArr[i] = v >= 0 && v < vCount ? v : 0;
    }
    out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  }

  if (!normAttr) {
    out.computeVertexNormals();
  }
  out.computeBoundingBox();
  out.computeBoundingSphere();
  return out;
}

function readMatParams(mat: THREE.Material | null | undefined, colorHex: number): {
  colorHex: number;
  metalness: number;
  roughness: number;
  transparent: boolean;
  opacity: number;
} {
  const m = mat as THREE.MeshStandardMaterial | undefined;
  return {
    colorHex,
    metalness: typeof m?.metalness === 'number' ? m.metalness : 0.35,
    roughness: typeof m?.roughness === 'number' ? m.roughness : 0.42,
    transparent: Boolean(mat?.transparent),
    opacity: typeof mat?.opacity === 'number' ? mat.opacity : 1.0,
  };
}

/**
 * Universal Zero-Leak Catalog & Real-Geometry Extractor for Play Ground.
 * Dynamically discovers ALL registered individual units from `src/units/registry.ts`
 * (automatically reflecting any newly added parts!) and extracts authentic centered
 * millimeter-scale 3D CAD meshes on demand.
 */
export class PartGeometryExtractor {
  private catalogLoaded = false;
  private catalogEntries: CatalogPartEntry[] = [];
  private entryByKey = new Map<string, CatalogPartEntry>();
  private unitSummaries: CatalogUnitSummary[] = [];
  private unitMetaById = new Map<string, UnitMeta>();

  private extractedUnits = new Set<string>();
  private inflightUnitLoads = new Map<string, Promise<void>>();
  private blueprintByKey = new Map<string, ExtractedPartBlueprint>();
  private sharedMatCache = new Map<string, THREE.MeshStandardMaterial>();

  public async ensureCatalogLoaded(): Promise<{
    units: readonly CatalogUnitSummary[];
    entries: readonly CatalogPartEntry[];
  }> {
    if (this.catalogLoaded) {
      return { units: this.unitSummaries, entries: this.catalogEntries };
    }
    const registered = listRegisteredUnits().filter((u) => !COMPOSITE_UNIT_IDS.has(u.unitId));
    const metas = await Promise.all(registered.map((u) => u.loadMeta()));

    this.catalogEntries = [];
    this.unitSummaries = [];
    this.entryByKey.clear();
    this.unitMetaById.clear();

    for (let i = 0; i < registered.length; i++) {
      const reg = registered[i];
      const meta = metas[i];
      this.unitMetaById.set(reg.unitId, meta);
      this.unitSummaries.push({
        unitId: reg.unitId,
        nameJa: meta.nameJa,
        nameEn: meta.nameEn,
        count: meta.parts.length,
      });
      for (let p = 0; p < meta.parts.length; p++) {
        const pm = meta.parts[p];
        const key = `${reg.unitId}::${pm.id}`;
        const entry: CatalogPartEntry = {
          key,
          unitId: reg.unitId,
          unitNameJa: meta.nameJa,
          partId: pm.id,
          title: pm.title,
          subtitle: pm.subtitle,
          category: pm.category,
          swatchColor: pm.swatchColor,
          assembledPos: pm.assembledPos,
          role: classifyEngineeringRole(reg.unitId, pm),
        };
        this.catalogEntries.push(entry);
        this.entryByKey.set(key, entry);
      }
    }

    this.catalogLoaded = true;
    return { units: this.unitSummaries, entries: this.catalogEntries };
  }

  public getEntry(key: string): CatalogPartEntry | undefined {
    return this.entryByKey.get(key);
  }

  public getAllEntries(): readonly CatalogPartEntry[] {
    return this.catalogEntries;
  }

  public getUnitSummaries(): readonly CatalogUnitSummary[] {
    return this.unitSummaries;
  }

  private async ensureUnitExtracted(unitId: string): Promise<void> {
    if (this.extractedUnits.has(unitId)) return;
    const inflight = this.inflightUnitLoads.get(unitId);
    if (inflight) return inflight;

    const promise = (async () => {
      await this.ensureCatalogLoaded();
      const tempCache = new ResourceCache();
      const unit = await loadRegisteredUnit(unitId);
      try {
        const built = await unit.build('high', tempCache, {
          synchronous: true,
          integratedMode: false,
        });
        unit.updateExplode(0, true);

        const rawSpecsByPart = new Map<string, ExtractedMeshSpec[]>();
        const tmpMat = new THREE.Matrix4();
        const tmpCol = new THREE.Color();

        for (let bi = 0; bi < built.raycastIndex.bindings.length; bi++) {
          const binding = built.raycastIndex.bindings[bi];
          if (binding.kind === 'instanced') {
            const im = binding.mesh;
            const mat = Array.isArray(im.material) ? im.material[0] : im.material;
            // Clone canonical geometry once per InstancedMesh binding so we can dispose tempCache cleanly
            const clonedGeo = im.geometry.clone();
            for (let ii = 0; ii < im.count; ii++) {
              const partId = binding.instanceIdToPartId[ii];
              if (!partId) continue;
              im.getMatrixAt(ii, tmpMat);
              let hex = 0x8b95a5;
              if (im.instanceColor) {
                im.getColorAt(ii, tmpCol);
                hex = tmpCol.getHex();
              }
              const mp = readMatParams(mat, hex);
              let list = rawSpecsByPart.get(partId);
              if (!list) {
                list = [];
                rawSpecsByPart.set(partId, list);
              }
              list.push({
                geometry: clonedGeo,
                ...mp,
                localMatrix: tmpMat.clone(),
              });
            }
          } else {
            const bm = binding.mesh;
            const mat = Array.isArray(bm.material) ? bm.material[0] : bm.material;
            const internal = bm as unknown as {
              _geometryInfo?: BatchedGeoInfoInternal[];
              _instanceInfo?: BatchedInstInfoInternal[];
            };
            const geoInfos = internal._geometryInfo ?? [];
            const instInfos = internal._instanceInfo ?? [];
            const slicedByGeoIdx = new Map<number, THREE.BufferGeometry | null>();

            for (let bid = 0; bid < binding.batchIdToPartId.length; bid++) {
              const partId = binding.batchIdToPartId[bid];
              if (!partId) continue;
              const iInfo = instInfos[bid];
              if (!iInfo || !iInfo.active) continue;
              const gIdx = iInfo.geometryIndex;
              let sliced = slicedByGeoIdx.get(gIdx);
              if (sliced === undefined) {
                const gInfo = geoInfos[gIdx];
                sliced = gInfo ? sliceBatchedGeometry(bm.geometry, gInfo) : null;
                slicedByGeoIdx.set(gIdx, sliced);
              }
              if (!sliced) continue;

              bm.getMatrixAt(bid, tmpMat);
              let hex = 0x8b95a5;
              try {
                bm.getColorAt(bid, tmpCol);
                hex = tmpCol.getHex();
              } catch {
                hex = 0x8b95a5;
              }
              const mp = readMatParams(mat, hex);
              let list = rawSpecsByPart.get(partId);
              if (!list) {
                list = [];
                rawSpecsByPart.set(partId, list);
              }
              list.push({
                geometry: sliced,
                ...mp,
                localMatrix: tmpMat.clone(),
              });
            }
          }
        }

        // Normalize each part's mesh stack so its local origin (0,0,0) is its exact geometric center!
        const meta = this.unitMetaById.get(unitId);
        const partsList = meta?.parts ?? [];
        const box = new THREE.Box3();
        const subBox = new THREE.Box3();
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        const shiftMat = new THREE.Matrix4();

        for (let i = 0; i < partsList.length; i++) {
          const pm = partsList[i];
          const key = `${unitId}::${pm.id}`;
          const entry = this.entryByKey.get(key);
          if (!entry) continue;
          const specs = rawSpecsByPart.get(pm.id) ?? [];

          box.makeEmpty();
          for (let s = 0; s < specs.length; s++) {
            const sp = specs[s];
            if (!sp.geometry.boundingBox) sp.geometry.computeBoundingBox();
            if (sp.geometry.boundingBox) {
              subBox.copy(sp.geometry.boundingBox).applyMatrix4(sp.localMatrix);
              box.union(subBox);
            }
          }

          if (box.isEmpty()) {
            center.set(pm.assembledPos[0], pm.assembledPos[1], pm.assembledPos[2]);
            size.set(8, 8, 8);
          } else {
            box.getCenter(center);
            box.getSize(size);
          }

          const unitScale = REAL_CAMERA_UNIT_SCALE[unitId] ?? 1.0;
          const scaleMat = new THREE.Matrix4().makeScale(unitScale, unitScale, unitScale);
          shiftMat.makeTranslation(-center.x, -center.y, -center.z);
          const normMat = new THREE.Matrix4().multiplyMatrices(scaleMat, shiftMat);
          const centeredSpecs: ExtractedMeshSpec[] = specs.map((sp) => ({
            ...sp,
            localMatrix: new THREE.Matrix4().multiplyMatrices(normMat, sp.localMatrix),
          }));

          this.blueprintByKey.set(key, {
            entry,
            meshes: centeredSpecs,
            naturalSize: size.clone().multiplyScalar(unitScale),
            naturalCenter: center.clone().multiplyScalar(unitScale),
          });
        }

        this.extractedUnits.add(unitId);
      } finally {
        unit.dispose(tempCache);
        tempCache.disposeAll();
      }
    })();

    this.inflightUnitLoads.set(unitId, promise);
    try {
      await promise;
    } finally {
      this.inflightUnitLoads.delete(unitId);
    }
  }

  private getSharedMaterial(spec: ExtractedMeshSpec): THREE.MeshStandardMaterial {
    const mk = `${spec.colorHex.toString(16)}_${Math.round(spec.metalness * 20)}_${Math.round(spec.roughness * 20)}_${spec.transparent ? Math.round(spec.opacity * 20) : 20}`;
    let mat = this.sharedMatCache.get(mk);
    if (!mat) {
      mat = new THREE.MeshStandardMaterial({
        color: spec.colorHex,
        metalness: spec.metalness,
        roughness: spec.roughness,
        transparent: spec.transparent,
        opacity: spec.opacity,
        depthWrite: !spec.transparent,
        envMapIntensity: 1.05,
      });
      this.sharedMatCache.set(mk, mat);
    }
    return mat;
  }

  public async getBlueprint(key: string): Promise<ExtractedPartBlueprint | null> {
    await this.ensureCatalogLoaded();
    const entry = this.entryByKey.get(key);
    if (!entry) return null;
    await this.ensureUnitExtracted(entry.unitId);
    return this.blueprintByKey.get(key) ?? null;
  }

  /**
   * Instantiate a clean, pickable THREE.Group for placement in the Play Ground CAD scene.
   */
  public async instantiatePartGroup(key: string, instanceUid: string): Promise<{
    group: THREE.Group;
    blueprint: ExtractedPartBlueprint;
  } | null> {
    const bp = await this.getBlueprint(key);
    if (!bp) return null;

    const group = new THREE.Group();
    group.name = `pg-part-${instanceUid}`;
    group.userData.pgInstanceId = instanceUid;
    group.userData.pgPartKey = key;

    if (bp.meshes.length === 0) {
      const fallback = new THREE.Mesh(
        new THREE.BoxGeometry(8, 8, 8),
        this.getSharedMaterial({
          geometry: new THREE.BufferGeometry(),
          colorHex: new THREE.Color(bp.entry.swatchColor || '#64748b').getHex(),
          metalness: 0.4,
          roughness: 0.45,
          transparent: false,
          opacity: 1,
          localMatrix: new THREE.Matrix4(),
        })
      );
      fallback.userData.pgInstanceId = instanceUid;
      group.add(fallback);
    } else {
      for (let i = 0; i < bp.meshes.length; i++) {
        const sp = bp.meshes[i];
        const mat = this.getSharedMaterial(sp);
        const m = new THREE.Mesh(sp.geometry, mat);
        m.applyMatrix4(sp.localMatrix);
        m.castShadow = !sp.transparent;
        m.receiveShadow = !sp.transparent;
        m.userData.pgInstanceId = instanceUid;
        group.add(m);
      }
    }

    return { group, blueprint: bp };
  }

  public dispose(): void {
    const disposedGeos = new Set<THREE.BufferGeometry>();
    for (const bp of this.blueprintByKey.values()) {
      for (const sp of bp.meshes) {
        if (!disposedGeos.has(sp.geometry)) {
          disposedGeos.add(sp.geometry);
          sp.geometry.dispose();
        }
      }
    }
    this.blueprintByKey.clear();
    this.extractedUnits.clear();
    for (const mat of this.sharedMatCache.values()) {
      mat.dispose();
    }
    this.sharedMatCache.clear();
  }
}
