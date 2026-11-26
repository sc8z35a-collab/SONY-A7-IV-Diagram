import cameraBodyJson from '../data/camera_body.json';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';
import { buildCameraMacroRaw, CAMERA_MACRO_HERO_SPECS } from './camera_macro_shared';

const CAMERA_BODY_META: UnitMeta = {
  unitId: cameraBodyJson.unitId,
  version: cameraBodyJson.version,
  nameJa: cameraBodyJson.nameJa,
  nameEn: cameraBodyJson.nameEn,
  declaredPartCount: cameraBodyJson.declaredPartCount,
  parts: cameraBodyJson.parts as unknown as readonly UnitPartMeta[],
};

export function createCameraBodyUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'camera_body',
    subsystem: 'body',
    meta: CAMERA_BODY_META,
    heroSpecs: CAMERA_MACRO_HERO_SPECS,
    buildRaw: (mats, _quality, { clippingPlanes }) =>
      buildCameraMacroRaw(mats, clippingPlanes, false),
  });
}
