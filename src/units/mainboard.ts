import * as THREE from 'three';
import mainboardJson from '../data/mainboard.json';
import {
  buildMainboardParts,
  buildMainboardStandaloneParts,
} from '../assemblies/mainboard/mainboardParts';
import { createMainboardPhysicsOverlay } from '../assemblies/mainboard/mainboardPhysicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const MAINBOARD_META: UnitMeta = {
  unitId: mainboardJson.unitId,
  version: mainboardJson.version,
  nameJa: mainboardJson.nameJa,
  nameEn: mainboardJson.nameEn,
  declaredPartCount: mainboardJson.declaredPartCount,
  parts: mainboardJson.parts as unknown as readonly UnitPartMeta[],
};

const MAINBOARD_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  ispSiliconDie: {
    bucket: 'silicon_hero',
    width: 512,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.48,
    roughness: 0.18,
    fallbackColor: 0x1b365d,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0f1f3d');
      grad.addColorStop(0.5, '#1e3a6e');
      grad.addColorStop(1, '#112240');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      // Die functional blocks
      const blocks: Array<[number, number, number, number, string, string]> = [
        [24, 24, 210, 180, '#2563eb', 'SLVS-EC / RAW ISP'],
        [254, 24, 234, 180, '#7c3aed', 'AI NPU SYSTOLIC'],
        [24, 224, 210, 140, '#0891b2', '8K HEVC CODEC'],
        [254, 224, 234, 140, '#0d9488', 'SRAM L2/L3 CACHE'],
        [24, 384, 464, 104, '#1d4ed8', 'BIONZ XR / LPDDR5X PHY'],
      ];
      for (const [x, y, bw, bh, c, label] of blocks) {
        ctx.fillStyle = c;
        ctx.globalAlpha = 0.52;
        ctx.fillRect(x, y, bw, bh);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, bw, bh);
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(label, x + 12, y + bh * 0.55);
      }
    },
  },
};

export function createMainboardUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'mainboard',
    subsystem: 'mainboard',
    meta: MAINBOARD_META,
    heroSpecs: MAINBOARD_HERO_SPECS,
    buildRaw: async (mats, _quality, { clippingPlanes }) => {
      const { parts, rig } = buildMainboardParts(mats, false);
      const extra = await buildMainboardStandaloneParts(mats);
      const allParts = [...parts, ...extra];
      const overlay = createMainboardPhysicsOverlay(clippingPlanes);

      const animatedNodes = new Set<THREE.Object3D>([
        rig.npuSystolicGlow,
        rig.ispActiveGlow,
        rig.cfexActivityLed,
      ]);

      return {
        parts: allParts,
        animatedNodes,
        overlayGroup: overlay.overlayGroup,
        explodeGuides: overlay.explodeGuides,
        setOverlayVisible: (visible) => overlay.setVisible(visible),
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, _delta, _explodeFactor, physicsActive, _integrated, activeParts) => {
          if (!physicsActive) return false;
          rig.applyDynamics(elapsed, physicsActive);
          overlay.update(elapsed, physicsActive, activeParts);
          return true;
        },
      };
    },
  });
}
