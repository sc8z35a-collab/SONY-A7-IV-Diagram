import bionzV2Json from '../data/bionz_v2.json';
import { buildBionzV2Parts } from '../assemblies/bionz/bionzV2Parts';
import { buildBionzV2DeepParts } from '../assemblies/bionz/bionzV2DeepParts';
import { createBionzV2PhysicsOverlay } from '../assemblies/bionz/bionzV2PhysicsOverlay';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const BIONZ_V2_META: UnitMeta = {
  unitId: bionzV2Json.unitId,
  version: bionzV2Json.version,
  nameJa: bionzV2Json.nameJa,
  nameEn: bionzV2Json.nameEn,
  declaredPartCount: bionzV2Json.declaredPartCount,
  parts: bionzV2Json.parts as unknown as readonly UnitPartMeta[],
};

export function createBionzV2Unit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'bionz_v2',
    subsystem: 'bionz_v2',
    meta: BIONZ_V2_META,
    buildRaw: (mats, _quality, { clippingPlanes }) => {
      const parts = [...buildBionzV2Parts(mats), ...buildBionzV2DeepParts(mats)];
      const overlay = createBionzV2PhysicsOverlay(clippingPlanes);
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
