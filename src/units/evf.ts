import * as THREE from 'three';
import evfJson from '../data/evf.json';
import { buildEvfParts, buildEvfStandaloneParts } from '../assemblies/evf/evfParts';
import { createEvfPhysicsOverlay } from '../assemblies/evf/evfPhysicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const EVF_META: UnitMeta = {
  unitId: evfJson.unitId,
  version: evfJson.version,
  nameJa: evfJson.nameJa,
  nameEn: evfJson.nameEn,
  declaredPartCount: evfJson.declaredPartCount,
  parts: evfJson.parts as unknown as readonly UnitPartMeta[],
};

const EVF_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  evfOledActive: {
    bucket: 'emissive_glow',
    width: 512,
    height: 384,
    baseColor: 0xffffff,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.42,
    fallbackColor: 0x0b1628,
    painter: (ctx, w, h) => {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#0f294a');
      sky.addColorStop(0.6, '#1e40af');
      sky.addColorStop(1, '#0c1322');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.72)';
      ctx.lineWidth = 3;
      ctx.strokeRect(w * 0.32, h * 0.28, w * 0.36, h * 0.38);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 4;
      ctx.strokeRect(w * 0.44, h * 0.36, w * 0.12, h * 0.16);
      ctx.fillStyle = '#090d14';
      ctx.fillRect(0, h - 54, w, 54);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('1/2000  F1.2  ISO100  AF-C  EYE', 24, h - 20);
    },
  },
};

export function createEvfUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'evf',
    subsystem: 'evf',
    meta: EVF_META,
    heroSpecs: EVF_HERO_SPECS,
    buildRaw: async (mats, _quality, { clippingPlanes }) => {
      const { parts, rig } = buildEvfParts(mats, false);
      const extra = await buildEvfStandaloneParts(mats);
      const allParts = [...parts, ...extra];
      const overlay = createEvfPhysicsOverlay(clippingPlanes);

      const animatedNodes = new Set<THREE.Object3D>([
        rig.edLensPart.group,
        rig.diopterDialGroup,
        rig.leadScrewGroup,
        rig.oledScreenMesh,
        ...rig.irLedMeshes,
      ]);

      return {
        parts: allParts,
        animatedNodes,
        overlayGroup: overlay.overlayGroup,
        explodeGuides: overlay.explodeGuides,
        setOverlayVisible: (visible) => overlay.setVisible(visible),
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, _delta, explodeFactor, physicsActive, integrated, activeParts) => {
          if (!physicsActive) return false;
          rig.applyDynamics(elapsed, physicsActive, explodeFactor, integrated);
          overlay.update(elapsed, physicsActive, activeParts);
          return true;
        },
      };
    },
  });
}
