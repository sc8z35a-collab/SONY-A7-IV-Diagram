import integratedJson from '../data/integrated.json';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';
import { buildCameraMacroRaw, CAMERA_MACRO_HERO_SPECS } from './camera_macro_shared';

const INTEGRATED_META: UnitMeta = {
  unitId: integratedJson.unitId,
  version: integratedJson.version,
  nameJa: integratedJson.nameJa,
  nameEn: integratedJson.nameEn,
  declaredPartCount: integratedJson.declaredPartCount,
  parts: integratedJson.parts as unknown as readonly UnitPartMeta[],
};

export function createIntegratedUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'integrated',
    subsystem: 'body',
    meta: INTEGRATED_META,
    heroSpecs: CAMERA_MACRO_HERO_SPECS,
    buildRaw: (mats, _quality, { clippingPlanes, yieldChunk }) =>
      buildCameraMacroRaw(mats, clippingPlanes, true, yieldChunk),
  });
}
