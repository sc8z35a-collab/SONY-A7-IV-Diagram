import * as THREE from 'three';
import sensorJson from '../data/sensor.json';
import { buildMacroSensorParts, buildSensorStandaloneParts } from '../assemblies/sensor/macroParts';
import { createPhysicsOverlay } from '../assemblies/sensor/physicsOverlay';
import { HeroMaterialSpec } from '../core/resource_cache';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const SENSOR_META: UnitMeta = {
  unitId: sensorJson.unitId,
  version: sensorJson.version,
  nameJa: sensorJson.nameJa,
  nameEn: sensorJson.nameEn,
  declaredPartCount: sensorJson.declaredPartCount,
  parts: sensorJson.parts as unknown as readonly UnitPartMeta[],
};

const SENSOR_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  siliconSensorDie: {
    bucket: 'silicon_photodiode',
    width: 512,
    height: 512,
    baseColor: 0xffffff,
    metalness: 0.72,
    roughness: 0.14,
    fallbackColor: 0x1e4d6b,
    painter: (ctx, w, h) => {
      // 33MP Full-Frame Exmor R BSI CMOS Imaging Die with Bayer iridescence
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#0a263d');
      bg.addColorStop(0.28, '#164d6d');
      bg.addColorStop(0.54, '#246b78');
      bg.addColorStop(0.78, '#1d3e6f');
      bg.addColorStop(1, '#0e2240');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Subtle micro-pixel RGGB diffraction grid
      const step = Math.max(4, Math.floor(w / 64));
      for (let y = 24; y < h - 24; y += step) {
        for (let x = 24; x < w - 24; x += step) {
          const evenX = ((x / step) & 1) === 0;
          const evenY = ((y / step) & 1) === 0;
          ctx.fillStyle =
            evenX && evenY
              ? 'rgba(239, 68, 68, 0.14)'
              : !evenX && !evenY
                ? 'rgba(59, 130, 246, 0.16)'
                : 'rgba(34, 197, 94, 0.14)';
          ctx.fillRect(x, y, step - 1, step - 1);
        }
      }

      // Column ADC bus bars & gold bond pad periphery
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.72)';
      ctx.lineWidth = Math.max(2, w / 160);
      ctx.strokeRect(12, 12, w - 24, h - 24);
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.45)';
      ctx.lineWidth = Math.max(1, w / 256);
      ctx.strokeRect(22, 22, w - 44, h - 44);
    },
  },
};

function disposeUnusedGroup(group: THREE.Object3D): void {
  const seenMats = new Set<THREE.Material>();
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        for (const m of mesh.material) seenMats.add(m);
      } else {
        seenMats.add(mesh.material);
      }
    }
  });
  for (const m of seenMats) m.dispose();
  group.clear();
}

export function createSensorUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'sensor',
    subsystem: 'sensor',
    meta: SENSOR_META,
    heroSpecs: SENSOR_HERO_SPECS,
    buildRaw: async (mats, _quality, { clippingPlanes }) => {
      const macroParts = buildMacroSensorParts(mats, false);
      const [extraParts, { buildSensorUltraPrecisionParts }] = await Promise.all([
        buildSensorStandaloneParts(mats),
        import('../assemblies/sensor/sensorUltraPrecisionParts'),
      ]);
      const ultraPrecisionParts = buildSensorUltraPrecisionParts(mats);
      const allParts = [...macroParts, ...extraParts, ...ultraPrecisionParts];
      const overlay = createPhysicsOverlay(clippingPlanes);
      // Dispose the unused micro sibling overlay so zero orphan GPU objects exist
      disposeUnusedGroup(overlay.microOverlay);
      disposeUnusedGroup(overlay.microExplodeGuides);

      const animatedNodes = new Set<THREE.Object3D>();
      for (const p of allParts) {
        if (p.ibisMovable || p.ultrasonicElement) {
          animatedNodes.add(p.group);
        }
      }

      return {
        parts: allParts,
        animatedNodes,
        overlayGroup: overlay.macroOverlay,
        explodeGuides: overlay.macroExplodeGuides,
        setOverlayVisible: (visible) => {
          overlay.setMacroVisible(visible);
          if (!visible) {
            for (const p of allParts) {
              if (p.ibisMovable) {
                p.group.rotation.z = 0;
              }
            }
          }
        },
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateMacroGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, _delta, explodeFactor, physicsActive, integrated, activeParts) => {
          if (!physicsActive) return false;
          overlay.updateMacro(elapsed, explodeFactor, physicsActive, integrated, activeParts);
          return true;
        },
      };
    },
  });
}
