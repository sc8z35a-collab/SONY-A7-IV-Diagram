import micJson from '../data/mic.json';
import { buildMicParts } from '../assemblies/mic/micParts';
import { createMicPhysicsOverlay } from '../assemblies/mic/micPhysicsOverlay';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const MIC_META: UnitMeta = {
  unitId: micJson.unitId,
  version: micJson.version,
  nameJa: micJson.nameJa,
  nameEn: micJson.nameEn,
  declaredPartCount: micJson.declaredPartCount,
  parts: micJson.parts as unknown as readonly UnitPartMeta[],
};

export function createMicUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'mic',
    subsystem: 'mic',
    meta: MIC_META,
    buildRaw: (mats, _quality, { clippingPlanes }) => {
      const parts = buildMicParts(mats);
      const overlay = createMicPhysicsOverlay(clippingPlanes);
      return {
        parts,
        overlayGroup: overlay.overlayGroup,
        explodeGuides: overlay.explodeGuides,
        setOverlayVisible: (visible) => overlay.setVisible(visible),
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, _delta, explodeFactor, physicsActive, _integrated, activeParts) => {
          if (!physicsActive) return false;
          overlay.update(elapsed, explodeFactor, physicsActive, activeParts);
          return true;
        },
      };
    },
  });
}
