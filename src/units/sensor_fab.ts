import * as THREE from 'three';
import sensorFabJson from '../data/sensor_fab.json';
import { CadPart, SensorFabVolume } from '../assemblies/types';
import { buildSensorFabParts } from '../assemblies/sensorFab/sensorFabParts';
import { buildSensorFabVol1Parts } from '../assemblies/sensorFab/sensorFabVol1Parts';
import { buildSensorFabVol2Parts } from '../assemblies/sensorFab/sensorFabVol2Parts';
import { buildSensorFabVol3Parts } from '../assemblies/sensorFab/sensorFabVol3Parts';
import { buildSensorFabVol4Parts } from '../assemblies/sensorFab/sensorFabVol4Parts';
import { createSensorFabPhysicsOverlay } from '../assemblies/sensorFab/sensorFabPhysicsOverlay';
import { createSensorFabVol1PhysicsOverlay } from '../assemblies/sensorFab/sensorFabVol1PhysicsOverlay';
import { createSensorFabVol2PhysicsOverlay } from '../assemblies/sensorFab/sensorFabVol2PhysicsOverlay';
import { createSensorFabVol3PhysicsOverlay } from '../assemblies/sensorFab/sensorFabVol3PhysicsOverlay';
import { createSensorFabVol4PhysicsOverlay } from '../assemblies/sensorFab/sensorFabVol4PhysicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const SENSOR_FAB_META: UnitMeta = {
  unitId: sensorFabJson.unitId,
  version: sensorFabJson.version,
  nameJa: sensorFabJson.nameJa,
  nameEn: sensorFabJson.nameEn,
  declaredPartCount: sensorFabJson.declaredPartCount,
  parts: sensorFabJson.parts as unknown as readonly UnitPartMeta[],
};

const SENSOR_FAB_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  fabWafer300mmDieMap: {
    bucket: 'silicon_wafer_dark',
    width: 512,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.78,
    roughness: 0.14,
    fallbackColor: 0x1e3a5f,
    painter: (ctx, w, h) => {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const r = w * 0.47;
      ctx.fillStyle = '#091526';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0f2848');
      grad.addColorStop(0.35, '#1e4b7a');
      grad.addColorStop(0.65, '#1f6c7a');
      grad.addColorStop(1, '#10223e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Full-frame 36x24mm CMOS die reticule map across 300mm wafer
      const dw = Math.max(24, Math.floor(w / 9));
      const dh = Math.max(16, Math.floor(dw * 0.67));
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.58)';
      ctx.lineWidth = Math.max(1, w / 256);
      for (let y = cy - r; y < cy + r; y += dh) {
        for (let x = cx - r; x < cx + r; x += dw) {
          const dx = x + dw * 0.5 - cx;
          const dy = y + dh * 0.5 - cy;
          if (Math.hypot(dx, dy) < r - dw * 0.42) {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
            ctx.fillRect(x + 2, y + 2, dw - 4, dh - 4);
            ctx.strokeRect(x + 2, y + 2, dw - 4, dh - 4);
          }
        }
      }
      ctx.restore();

      // Wafer bevel rim & alignment notch
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.72)';
      ctx.lineWidth = Math.max(2, w / 180);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    },
  },
};

export function createSensorFabUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'sensor_fab',
    subsystem: 'sensor_fab',
    meta: SENSOR_FAB_META,
    heroSpecs: SENSOR_FAB_HERO_SPECS,
    isPartInSubView: (meta, subView) => (meta.fabVolume ?? 0) === subView,
    buildRaw: (mats, _quality, { clippingPlanes }) => {
      const built0 = buildSensorFabParts(mats);
      for (const p of built0) p.fabVolume = 0;
      const built1 = buildSensorFabVol1Parts(mats);
      for (const p of built1) p.fabVolume = 1;
      const built2 = buildSensorFabVol2Parts(mats);
      for (const p of built2) p.fabVolume = 2;
      const built3 = buildSensorFabVol3Parts(mats);
      for (const p of built3) p.fabVolume = 3;
      const built4 = buildSensorFabVol4Parts(mats);
      for (const p of built4) p.fabVolume = 4;

      const allParts: CadPart[] = [...built0, ...built1, ...built2, ...built3, ...built4];

      const overlay0 = createSensorFabPhysicsOverlay(clippingPlanes);
      const overlay1 = createSensorFabVol1PhysicsOverlay(clippingPlanes);
      const overlay2 = createSensorFabVol2PhysicsOverlay(clippingPlanes);
      const overlay3 = createSensorFabVol3PhysicsOverlay(clippingPlanes);
      const overlay4 = createSensorFabVol4PhysicsOverlay(clippingPlanes);
      const overlays = [overlay0, overlay1, overlay2, overlay3, overlay4];

      const overlayRoot = new THREE.Group();
      overlayRoot.name = 'sensor-fab-overlays';
      const guidesRoot = new THREE.Group();
      guidesRoot.name = 'sensor-fab-guides';
      for (const ov of overlays) {
        overlayRoot.add(ov.overlayGroup);
        guidesRoot.add(ov.explodeGuides);
      }

      let activeVolume: SensorFabVolume = 0;
      let lastPhysicsVisible = false;

      const syncOverlayVisibility = () => {
        for (let i = 0; i < overlays.length; i++) {
          overlays[i].setVisible(lastPhysicsVisible && activeVolume === i);
        }
      };
      syncOverlayVisibility();

      return {
        parts: allParts,
        overlayGroup: overlayRoot,
        explodeGuides: guidesRoot,
        onSubViewChange: (subView: number) => {
          const clamped = Math.max(0, Math.min(4, subView)) as SensorFabVolume;
          activeVolume = clamped;
          syncOverlayVisibility();
        },
        setOverlayVisible: (visible: boolean) => {
          lastPhysicsVisible = visible;
          syncOverlayVisibility();
        },
        updateGuides: (explodeFactor, visible, activeParts) => {
          for (let i = 0; i < overlays.length; i++) {
            overlays[i].updateGuides(
              explodeFactor,
              visible && activeVolume === i,
              activeVolume === i ? activeParts : []
            );
          }
        },
        stepRigAndOverlay: (elapsed, _delta, explodeFactor, physicsActive, _integrated, activeParts) => {
          if (!physicsActive) return false;
          overlays[activeVolume].update(elapsed, explodeFactor, physicsActive, activeParts);
          return true;
        },
      };
    },
  });
}
