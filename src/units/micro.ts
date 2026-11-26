import * as THREE from 'three';
import microJson from '../data/micro.json';
import { buildMicroPixelParts } from '../assemblies/sensor/microPixelParts';
import { createPhysicsOverlay } from '../assemblies/sensor/physicsOverlay';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const MICRO_META: UnitMeta = {
  unitId: microJson.unitId,
  version: microJson.version,
  nameJa: microJson.nameJa,
  nameEn: microJson.nameEn,
  declaredPartCount: microJson.declaredPartCount,
  parts: microJson.parts as unknown as readonly UnitPartMeta[],
};

function disposeUnusedGroup(group: THREE.Object3D): void {
  const seenMats = new Set<THREE.Material>();
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        for (const m of mesh.material) seenMats.add(m);
      } else {
        seenMats.add(mesh.material);
      }
    }
  });
  for (const m of seenMats) m.dispose();
  group.clear();
}

export function createMicroUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'micro',
    subsystem: 'micro',
    meta: MICRO_META,
    buildRaw: (mats, _quality, { clippingPlanes }) => {
      const parts = buildMicroPixelParts(mats);
      const overlay = createPhysicsOverlay(clippingPlanes);
      // Dispose the unused macro sibling overlay so zero orphan GPU objects exist
      disposeUnusedGroup(overlay.macroOverlay);
      disposeUnusedGroup(overlay.macroExplodeGuides);

      return {
        parts,
        overlayGroup: overlay.microOverlay,
        explodeGuides: overlay.microExplodeGuides,
        setOverlayVisible: (visible) => overlay.setMicroVisible(visible),
        updateGuides: (explodeFactor, visible, activeParts) => {
          // Ensure latestMicroParts is synced before updating radial guides
          overlay.updateMicro(0, explodeFactor, false, activeParts);
          overlay.updateMicroGuides(explodeFactor, visible);
        },
        stepRigAndOverlay: (elapsed, _delta, explodeFactor, physicsActive, _integrated, activeParts) => {
          if (!physicsActive) return false;
          overlay.updateMicro(elapsed, explodeFactor, physicsActive, activeParts);
          return true;
        },
      };
    },
  });
}
