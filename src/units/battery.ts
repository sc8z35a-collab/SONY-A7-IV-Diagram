import batteryJson from '../data/battery.json';
import { buildBatteryParts } from '../assemblies/battery/batteryParts';
import { createBatteryPhysicsOverlay } from '../assemblies/battery/batteryPhysicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const BATTERY_META: UnitMeta = {
  unitId: batteryJson.unitId,
  version: batteryJson.version,
  nameJa: batteryJson.nameJa,
  nameEn: batteryJson.nameEn,
  declaredPartCount: batteryJson.declaredPartCount,
  parts: batteryJson.parts as unknown as readonly UnitPartMeta[],
};

const BATTERY_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  batFrontLabel: {
    bucket: 'pin_carrier_gloss',
    width: 512,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.22,
    roughness: 0.34,
    fallbackColor: 0x1e2430,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#141820');
      grad.addColorStop(1, '#202736');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.strokeRect(14, 14, w - 28, h - 28);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 46px sans-serif';
      ctx.fillText('SONY', 42, 86);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('InfoLITHIUM Z', 42, 134);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(42, 152, w - 84, 5);
      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 34px monospace';
      ctx.fillText('NP-FZ100', 42, 210);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '20px monospace';
      ctx.fillText('7.2V  16.4Wh  2280mAh', 42, 258);
      ctx.fillText('Li-ion  2INR19/50  CELLS', 42, 294);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(42, 340, 140, 22);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('2026 Si-C / SSB', 48, 356);
    },
  },
};

export function createBatteryUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'battery',
    subsystem: 'battery',
    meta: BATTERY_META,
    heroSpecs: BATTERY_HERO_SPECS,
    buildRaw: (mats, _quality, { clippingPlanes }) => {
      const parts = buildBatteryParts(mats);
      const overlay = createBatteryPhysicsOverlay(clippingPlanes);
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
