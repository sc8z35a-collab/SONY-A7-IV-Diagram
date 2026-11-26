import cfexpressJson from '../data/cfexpress.json';
import { buildCfexpressParts } from '../assemblies/cfexpress/cfexpressParts';
import { createCfexpressPhysicsOverlay } from '../assemblies/cfexpress/cfexpressPhysicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const CFEXPRESS_META: UnitMeta = {
  unitId: cfexpressJson.unitId,
  version: cfexpressJson.version,
  nameJa: cfexpressJson.nameJa,
  nameEn: cfexpressJson.nameEn,
  declaredPartCount: cfexpressJson.declaredPartCount,
  parts: cfexpressJson.parts as unknown as readonly UnitPartMeta[],
};

const CFEXPRESS_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  cfeTopArmorShell: {
    bucket: 'pin_carrier_gloss',
    width: 512,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.34,
    roughness: 0.30,
    fallbackColor: 0x161b26,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#111620');
      grad.addColorStop(1, '#1c2434');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(0, 0, w, 54);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText('TOUGH', 28, 38);
      ctx.font = 'bold 42px sans-serif';
      ctx.fillText('SONY', 28, 120);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('CFexpress Type A', 28, 174);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 54px monospace';
      ctx.fillText('1920 GB', 28, 260);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px monospace';
      ctx.fillText('PCIe Gen4 · VPG400', 28, 324);
      ctx.fillText('R 1850 / W 1750 MB/s', 28, 364);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.strokeRect(24, 412, w - 48, 66);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('BiCS10 3D NAND · PQC', 44, 454);
    },
  },
};

export function createCfexpressUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'cfexpress',
    subsystem: 'cfexpress',
    meta: CFEXPRESS_META,
    heroSpecs: CFEXPRESS_HERO_SPECS,
    buildRaw: (mats, _quality, { clippingPlanes }) => {
      const parts = buildCfexpressParts(mats);
      const overlay = createCfexpressPhysicsOverlay(clippingPlanes);
      return {
        parts,
        overlayGroup: overlay.overlayGroup,
        explodeGuides: overlay.explodeGuides,
        setOverlayVisible: (visible) => overlay.setVisible(visible),
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, _delta, _explodeFactor, physicsActive, _integrated, activeParts) => {
          if (!physicsActive) return false;
          overlay.update(elapsed, physicsActive, activeParts);
          return true;
        },
      };
    },
  });
}
