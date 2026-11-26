import dryboxJson from '../data/drybox.json';
import { buildDryboxExteriorParts } from '../assemblies/drybox/dryboxExteriorParts';
import { buildDryboxInteriorCoreParts } from '../assemblies/drybox/dryboxInteriorCoreParts';
import { buildDryboxMicroDoorChassisParts } from '../assemblies/drybox/dryboxMicroDoorChassisParts';
import { buildDryboxMicroCoreElectricsParts } from '../assemblies/drybox/dryboxMicroCoreElectricsParts';
import type { DryboxPalette } from '../assemblies/drybox/dryboxPartsShared';
import { createDryboxPhysicsOverlay } from '../assemblies/drybox/dryboxPhysicsOverlay';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const DRYBOX_META: UnitMeta = {
  unitId: dryboxJson.unitId,
  version: dryboxJson.version,
  nameJa: dryboxJson.nameJa,
  nameEn: dryboxJson.nameEn,
  declaredPartCount: dryboxJson.declaredPartCount,
  parts: dryboxJson.parts as unknown as readonly UnitPartMeta[],
};

export function createDryboxUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'drybox',
    subsystem: 'drybox',
    meta: DRYBOX_META,
    buildRaw: (mats, _quality, { clippingPlanes, dryboxPalette }) => {
      // Zero inline new THREE.Mesh*Material: route all 32 DryboxPalette materials through ResourceCache!
      const ctx = {
        mats,
        pal: dryboxPalette as unknown as DryboxPalette,
        cp: clippingPlanes,
      };
      const parts = [
        ...buildDryboxExteriorParts(ctx),
        ...buildDryboxInteriorCoreParts(ctx),
        ...buildDryboxMicroDoorChassisParts(ctx),
        ...buildDryboxMicroCoreElectricsParts(ctx),
      ].sort((a, b) => a.order - b.order);

      const overlay = createDryboxPhysicsOverlay(clippingPlanes);
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
