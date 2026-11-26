import microV2Json from '../data/micro_v2.json';
import { buildMicroPixelV2Parts } from '../assemblies/sensor/microPixelV2Parts';
import { buildMicroPixelV2DeepParts } from '../assemblies/sensor/microPixelV2DeepParts';
import { createMicroPixelV2PhysicsOverlay } from '../assemblies/sensor/microPixelV2PhysicsOverlay';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const MICRO_V2_META: UnitMeta = {
  unitId: microV2Json.unitId,
  version: microV2Json.version,
  nameJa: microV2Json.nameJa,
  nameEn: microV2Json.nameEn,
  declaredPartCount: microV2Json.declaredPartCount,
  parts: microV2Json.parts as unknown as readonly UnitPartMeta[],
};

export function createMicroV2Unit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'micro_v2',
    subsystem: 'micro_v2',
    meta: MICRO_V2_META,
    buildRaw: (mats, _quality, { clippingPlanes }) => {
      const parts = [...buildMicroPixelV2Parts(mats), ...buildMicroPixelV2DeepParts(mats)];
      const overlay = createMicroPixelV2PhysicsOverlay(clippingPlanes);
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
