import * as THREE from 'three';
import lcdJson from '../data/lcd.json';
import { buildLcdParts } from '../assemblies/lcd/lcdParts';
import { buildLcdMicroParts } from '../assemblies/lcd/lcdMicroParts';
import { buildLcdUltraOemParts } from '../assemblies/lcd/lcdUltraOemParts';
import { buildLcdUltraTechParts } from '../assemblies/lcd/lcdUltraTechParts';
import { buildLcdUltraDeepParts } from '../assemblies/lcd/lcdUltraDeepParts';
import { createLcdPhysicsOverlay } from '../assemblies/lcd/lcdPhysicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const LCD_META: UnitMeta = {
  unitId: lcdJson.unitId,
  version: lcdJson.version,
  nameJa: lcdJson.nameJa,
  nameEn: lcdJson.nameEn,
  declaredPartCount: lcdJson.declaredPartCount,
  parts: lcdJson.parts as unknown as readonly UnitPartMeta[],
};

const LCD_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  lcdLiveViewActive: {
    bucket: 'emissive_glow',
    width: 512,
    height: 340,
    baseColor: 0xffffff,
    emissive: 0x1e3a8a,
    emissiveIntensity: 0.35,
    fallbackColor: 0x10203a,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0f2847');
      grad.addColorStop(0.55, '#1d4ed8');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      // Rule-of-thirds composition grid
      ctx.strokeStyle = 'rgba(255,255,255,0.28)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w / 3, 0); ctx.lineTo(w / 3, h);
      ctx.moveTo((w * 2) / 3, 0); ctx.lineTo((w * 2) / 3, h);
      ctx.moveTo(0, h / 3); ctx.lineTo(w, h / 3);
      ctx.moveTo(0, (h * 2) / 3); ctx.lineTo(w, (h * 2) / 3);
      ctx.stroke();
      // AF tracking reticle & bottom telemetry bar
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.strokeRect(w * 0.42, h * 0.32, w * 0.16, h * 0.24);
      ctx.fillStyle = 'rgba(9,13,20,0.88)';
      ctx.fillRect(0, h - 46, w, 46);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('1/1000   F1.2   ISO 100   4K60 10bit', 18, h - 16);
    },
  },
};

export function createLcdUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'lcd',
    subsystem: 'lcd',
    meta: LCD_META,
    heroSpecs: LCD_HERO_SPECS,
    buildRaw: (mats, _quality, { clippingPlanes }) => {
      const { parts, rig } = buildLcdParts(mats, false);
      const micro = buildLcdMicroParts(mats);
      const oem = buildLcdUltraOemParts(mats);
      const tech = buildLcdUltraTechParts(mats);
      const deep = buildLcdUltraDeepParts(mats);
      const allParts = [...parts, ...micro.parts, ...oem.parts, ...tech.parts, ...deep.parts];
      rig.monitorParts.push(
        ...micro.monitorParts,
        ...oem.monitorParts,
        ...tech.monitorParts,
        ...deep.monitorParts
      );

      const overlay = createLcdPhysicsOverlay(clippingPlanes);
      const animatedNodes = new Set<THREE.Object3D>([
        ...rig.monitorParts.map((p) => p.group),
        ...rig.tiltCradleLinks,
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
          overlay.update(elapsed, physicsActive, activeParts, integrated);
          return true;
        },
      };
    },
  });
}
