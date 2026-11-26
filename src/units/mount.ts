import * as THREE from 'three';
import mountJson from '../data/mount.json';
import { buildMountParts, buildMountStandaloneParts } from '../assemblies/mount/mountParts';
import { createMountPhysicsOverlay } from '../assemblies/mount/mountPhysicsOverlay';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const MOUNT_META: UnitMeta = {
  unitId: mountJson.unitId,
  version: mountJson.version,
  nameJa: mountJson.nameJa,
  nameEn: mountJson.nameEn,
  declaredPartCount: mountJson.declaredPartCount,
  parts: mountJson.parts as unknown as readonly UnitPartMeta[],
};

export function createMountUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'mount',
    subsystem: 'mount',
    meta: MOUNT_META,
    buildRaw: async (mats, _quality, { clippingPlanes }) => {
      const { parts, rig } = buildMountParts(mats, false);
      const extra = await buildMountStandaloneParts(mats);
      const allParts = [...parts, ...extra];
      const overlay = createMountPhysicsOverlay(clippingPlanes);

      const animatedNodes = new Set<THREE.Object3D>([
        rig.lockPinPlunger,
        rig.releaseButtonGroup,
        rig.rockerLever,
      ]);

      return {
        parts: allParts,
        animatedNodes,
        overlayGroup: overlay.overlayGroup,
        explodeGuides: overlay.explodeGuides,
        setOverlayVisible: (visible) => overlay.setVisible(visible),
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, _delta, _explodeFactor, physicsActive, integrated, activeParts) => {
          if (!physicsActive) return false;
          rig.applyDynamics(elapsed, physicsActive);
          overlay.update(elapsed, physicsActive, activeParts, integrated);
          return true;
        },
      };
    },
  });
}
