import originalJson from '../data/original.json';
import { buildRiimosE1ChassisPowerMagParts } from '../assemblies/original/riimosE1ChassisPowerMagParts';
import { buildRiimosE1LauncherOpticsBrainParts } from '../assemblies/original/riimosE1LauncherOpticsBrainParts';
import { buildRiimosE1LegsAndAccessoriesParts } from '../assemblies/original/riimosE1LegsAndAccessoriesParts';
import { createRiimosE1DynamicRig } from '../assemblies/original/riimosE1DynamicRig';
import { ORIGINAL_HERO_SPECS } from '../assemblies/original/originalShared';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const ORIGINAL_META: UnitMeta = {
  unitId: originalJson.unitId,
  version: originalJson.version,
  nameJa: originalJson.nameJa,
  nameEn: originalJson.nameEn,
  declaredPartCount: originalJson.declaredPartCount,
  parts: originalJson.parts as unknown as readonly UnitPartMeta[],
};

/**
 * Original Manufacturable Showcase (`original`) V2 Optimized Unit:
 *   - subView = 1: #01 RIIMOS E1 — 9,700 JPY Ultra-Frugal 0.135J 8-Barrel Automatic-Loading
 *     XYZ-Omnidirectional Quadruped Competition Robot (128 Parts: OR01–OR128).
 *
 * Principles:
 *   1. Real-World Operational Guarantee (実動作保証)
 *   2. Extreme Lowest Cost (極限最安低コスト — 9,700 JPY hardware BOM ex. cells/BB/phone)
 *   3. Zero Compromise (妥協不可能) + Mandatory Human-Safe Interlock & 0.135J Legal Cap
 */
export function createOriginalUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'original',
    subsystem: 'original',
    meta: ORIGINAL_META,
    heroSpecs: ORIGINAL_HERO_SPECS,
    isPartInSubView: (meta, subView) => (meta.originalSubView ?? 1) === (subView || 1),
    buildRaw: (mats, _quality, opts) => {
      const clippingPlanes = opts?.clippingPlanes ?? [];
      const g123 = buildRiimosE1ChassisPowerMagParts(mats, clippingPlanes);
      const g456 = buildRiimosE1LauncherOpticsBrainParts(mats, clippingPlanes);
      const g78 = buildRiimosE1LegsAndAccessoriesParts(mats, clippingPlanes);
      const rig = createRiimosE1DynamicRig(g456.rigRefs, g78.legRigs);

      const allParts = [...g123, ...g456.parts, ...g78.parts].sort(
        (a, b) => a.order - b.order
      );

      return {
        parts: allParts,
        animatedNodes: rig.animatedNodes,
        stepRigAndOverlay: (elapsed, _delta, explodeFactor, physicsActive) => {
          rig.applyDynamics(elapsed, physicsActive, explodeFactor);
          return physicsActive;
        },
      };
    },
  });
}
