import bionzJson from '../data/bionz.json';
import { buildBionzParts } from '../assemblies/bionz/bionzParts';
import { buildBionzExtraParts } from '../assemblies/bionz/bionzExtraParts';
import { createBionzPhysicsOverlay } from '../assemblies/bionz/bionzPhysicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const BIONZ_META: UnitMeta = {
  unitId: bionzJson.unitId,
  version: bionzJson.version,
  nameJa: bionzJson.nameJa,
  nameEn: bionzJson.nameEn,
  declaredPartCount: bionzJson.declaredPartCount,
  parts: bionzJson.parts as unknown as readonly UnitPartMeta[],
};

const BIONZ_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  bionzDieFloorplan: {
    bucket: 'silicon_hero',
    width: 512,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.48,
    roughness: 0.16,
    fallbackColor: 0x162b4a,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0c1a33');
      grad.addColorStop(0.5, '#1d3c72');
      grad.addColorStop(1, '#0e1d36');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, w - 20, h - 20);
      const tiles: Array<[number, number, number, number, string, string]> = [
        [24, 24, 146, 150, '#0284c7', 'SLVS-EC'],
        [182, 24, 148, 150, '#2563eb', 'ISP CORE'],
        [342, 24, 146, 150, '#7c3aed', 'AI NPU'],
        [24, 188, 146, 140, '#0d9488', 'ARM CPU'],
        [182, 188, 148, 140, '#059669', 'SABIN AF'],
        [342, 188, 146, 140, '#d97706', 'HEVC 8K'],
        [24, 342, 224, 144, '#4f46e5', 'SRAM ARRAY'],
        [262, 342, 226, 144, '#be123c', 'C2PA / CRYPTO'],
      ];
      for (const [x, y, bw, bh, col, name] of tiles) {
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.56;
        ctx.fillRect(x, y, bw, bh);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#bfdbfe';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, bw, bh);
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 17px monospace';
        ctx.fillText(name, x + 12, y + bh * 0.55);
      }
    },
  },
};

export function createBionzUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'bionz',
    subsystem: 'bionz',
    meta: BIONZ_META,
    heroSpecs: BIONZ_HERO_SPECS,
    buildRaw: (mats, _quality, { clippingPlanes }) => {
      const parts = [...buildBionzParts(mats), ...buildBionzExtraParts(mats)];
      const overlay = createBionzPhysicsOverlay(clippingPlanes);
      return {
        parts,
        overlayGroup: overlay.overlayGroup,
        explodeGuides: overlay.explodeGuides,
        setOverlayVisible: (visible) => overlay.setVisible(visible),
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, _delta, explodeFactor, physicsActive, _integrated, activeParts) => {
          if (!physicsActive) return false;
          overlay.update(elapsed, explodeFactor, physicsActive, activeParts);
          return true;
        },
      };
    },
  });
}
