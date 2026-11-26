import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createDryboxPalette } from './dryboxPartsShared';
import { buildDryboxExteriorParts } from './dryboxExteriorParts';
import { buildDryboxInteriorCoreParts } from './dryboxInteriorCoreParts';
import { buildDryboxMicroDoorChassisParts } from './dryboxMicroDoorChassisParts';
import { buildDryboxMicroCoreElectricsParts } from './dryboxMicroCoreElectricsParts';
import { buildDryboxUltraConservationParts } from './dryboxUltraConservationParts';
import { buildDryboxUltraSafetyUtilityParts } from './dryboxUltraSafetyUtilityParts';
import { buildDryboxFrontier2026Parts } from './dryboxFrontier2026Parts';

/**
 * Build all 150 individually separable 3D CAD sub-assemblies of the
 * 2026 Flagship Hybrid Electronic Camera Dry Cabinet (DB01–DB150).
 * Strictly visible ONLY in standalone 'drybox' mode (zero startup cost).
 */
export function buildDryboxParts(mats: MaterialLibrary): CadPart[] {
  const cp = mats.clippingPlanes;
  const pal = createDryboxPalette(cp);
  const ctx = { mats, pal, cp };

  const allParts: CadPart[] = [
    ...buildDryboxExteriorParts(ctx),
    ...buildDryboxInteriorCoreParts(ctx),
    ...buildDryboxMicroDoorChassisParts(ctx),
    ...buildDryboxMicroCoreElectricsParts(ctx),
    ...buildDryboxUltraConservationParts(ctx),
    ...buildDryboxUltraSafetyUtilityParts(ctx),
    ...buildDryboxFrontier2026Parts(ctx),
  ];
  allParts.sort((a, b) => a.order - b.order);
  return allParts;
}
