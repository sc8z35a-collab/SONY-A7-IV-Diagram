import miraiJson from '../data/mirai_2028.json';
import { buildMiraiFh01Parts } from '../assemblies/mirai2028/miraiFh01Parts';
import { buildMiraiFh02Parts } from '../assemblies/mirai2028/miraiFh02Parts';
import { MIRAI_HERO_SPECS } from '../assemblies/mirai2028/miraiShared';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const MIRAI_2028_META: UnitMeta = {
  unitId: miraiJson.unitId,
  version: miraiJson.version,
  nameJa: miraiJson.nameJa,
  nameEn: miraiJson.nameEn,
  declaredPartCount: miraiJson.declaredPartCount,
  parts: miraiJson.parts as unknown as readonly UnitPartMeta[],
};

/**
 * Future History MIRAI 2028 (`mirai_2028`) V2 Optimized Unit.
 * Prototype Stage: First TWO full watchmaker-grade 3D CAD assemblies:
 *   - subView = 1: FH01 Full-Frame Single-Photon SPAD / QIS 3D Stacked Sensor (16 parts)
 *   - subView = 2: FH02 Filterless Perovskite / OPF 3-Layer Vertical RGB Sensor (16 parts)
 *
 * Strictly adheres to:
 *   - 4-tier quality scaling (LITE / STD / HIGH / ULTRA) via ResourceCache & geometry_quality
 *   - Zero dynamic physics ray animations (pure watchmaker architectural CAD dissection)
 *   - Zero direct `new THREE.Mesh*Material` allocations
 */
export function createMirai2028Unit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'mirai_2028',
    subsystem: 'mirai_2028',
    meta: MIRAI_2028_META,
    heroSpecs: MIRAI_HERO_SPECS,
    isPartInSubView: (meta, subView) => (meta.miraiSubView ?? 1) === (subView || 1),
    buildRaw: (mats) => {
      const fh01Parts = buildMiraiFh01Parts(mats);
      const fh02Parts = buildMiraiFh02Parts(mats);
      const allParts = [...fh01Parts, ...fh02Parts].sort((a, b) => a.order - b.order);
      return { parts: allParts };
    },
  });
}
