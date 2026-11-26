import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createDryboxPalette } from './dryboxPartsShared';
import { buildDryboxExteriorParts } from './dryboxExteriorParts';
import { buildDryboxInteriorCoreParts } from './dryboxInteriorCoreParts';
import { buildDryboxMicroDoorChassisParts } from './dryboxMicroDoorChassisParts';
import { buildDryboxMicroCoreElectricsParts } from './dryboxMicroCoreElectricsParts';

/**
 * Build all 90 individually separable 3D CAD sub-assemblies of the
 * 2026 Flagship Hybrid Electronic Camera Dry Cabinet (DB01–DB90).
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
  ];
  allParts.sort((a, b) => a.order - b.order);
  return allParts;
}
