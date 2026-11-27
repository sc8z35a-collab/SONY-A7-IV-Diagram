import miraiJson from '../data/mirai_2028.json';
import { buildMiraiFh01Parts } from '../assemblies/mirai2028/miraiFh01Parts';
import { buildMiraiFh02Parts } from '../assemblies/mirai2028/miraiFh02Parts';
import { buildMiraiFh08Parts } from '../assemblies/mirai2028/miraiFh08Parts';
import { buildMiraiFh32Parts } from '../assemblies/mirai2028/miraiFh32Parts';
import { buildMiraiFh25Parts } from '../assemblies/mirai2028/miraiFh25Parts';
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
 * Future History MIRAI 2028 (`mirai_2028`) V2 Optimized Unit — 5 Watchmaker-Grade 3D CAD Assemblies (86 Parts):
 *   - subView = 1: FH01 Full-Frame Single-Photon SPAD / QIS 3D Stacked Sensor (16 parts)
 *   - subView = 2: FH02 Filterless Perovskite / OPF 3-Layer Vertical RGB Sensor (16 parts)
 *   - subView = 3: FH08 ASI Inverse-Design 28mm · 180g 50mm F1.4 Freeform Meta-Optics Pancake Lens (18 parts)
 *   - subView = 4: FH32 IP68 Hermetically Isolated Ultrasonic MEMS Solid-State Air-Cooling Module (18 parts)
 *   - subView = 5: FH25 30,000-nit · 240Hz True-RGB Tandem Micro-OLED / MicroLED Pancake EVF Unit (18 parts)
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
      const allParts = [
        ...buildMiraiFh01Parts(mats),
        ...buildMiraiFh02Parts(mats),
        ...buildMiraiFh08Parts(mats),
        ...buildMiraiFh32Parts(mats),
        ...buildMiraiFh25Parts(mats),
      ].sort((a, b) => a.order - b.order);
      return { parts: allParts };
    },
  });
}
