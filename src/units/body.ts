import * as THREE from 'three';
import bodyJson from '../data/body.json';
import { buildBodyParts, buildBodyStandaloneParts } from '../assemblies/body/bodyParts';
import { createBodyPhysicsOverlay } from '../assemblies/body/bodyPhysicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const BODY_META: UnitMeta = {
  unitId: bodyJson.unitId,
  version: bodyJson.version,
  nameJa: bodyJson.nameJa,
  nameEn: bodyJson.nameEn,
  declaredPartCount: bodyJson.declaredPartCount,
  parts: bodyJson.parts as unknown as readonly UnitPartMeta[],
};

const BODY_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  bodyTopSubOled: {
    bucket: 'emissive_glow',
    width: 256,
    height: 128,
    baseColor: 0xffffff,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.45,
    fallbackColor: 0x0f172a,
    painter: (ctx, w, h) => {
      ctx.fillStyle = '#090d14';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(4, 4, w - 8, h - 8);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('1/4000  F1.2', 14, 46);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('ISO 100   RAW+J', 14, 86);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(14, 100, 128, 12);
    },
  },
};

export function createBodyUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'body',
    subsystem: 'body',
    meta: BODY_META,
    heroSpecs: BODY_HERO_SPECS,
    buildRaw: async (mats, _quality, { clippingPlanes }) => {
      const { parts, rig } = buildBodyParts(mats, false);
      const extra = await buildBodyStandaloneParts(mats);
      const allParts = [...parts, ...extra];
      const overlay = createBodyPhysicsOverlay(clippingPlanes);

      const animatedNodes = new Set<THREE.Object3D>([
        rig.shutterButtonCap,
        rig.frontDialMesh,
        rig.rearDialMesh,
        rig.afJoystickCap,
      ]);

      return {
        parts: allParts,
        animatedNodes,
        overlayGroup: overlay.overlayGroup,
        explodeGuides: overlay.explodeGuides,
        setOverlayVisible: (visible) => overlay.setVisible(visible),
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, _delta, _explodeFactor, physicsActive, integrated, activeParts) => {
          if (!physicsActive) return false;
          rig.applyDynamics(elapsed, physicsActive);
          overlay.update(elapsed, physicsActive, activeParts, integrated);
          return true;
        },
      };
    },
  });
}
