import * as THREE from 'three';
import { AssemblyController, CadPart, SensorFabVolume } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createSensorFabPhysicsOverlay } from './sensorFabPhysicsOverlay';
import { createSensorFabVol1PhysicsOverlay } from './sensorFabVol1PhysicsOverlay';

/**
 * Assemble the lazy-hydrated standalone **Sensor Manufacturing Process (センサー製造工程)**
 * multi-volume encyclopedia:
 * - **Vol.0 (`fabVolume: 0`, `F0-01`–`F0-32`, 32 parts)**: Master Process Map & 2,110-Step Cleanroom 3D Anatomy
 * - **Vol.1 (`fabVolume: 1`, `F1-01`–`F1-32`, 32 parts)**: 超入門・一眼カメラセンサーのしくみと2026年最新アーキテクチャ
 * Strictly visible ONLY in standalone `'sensor_fab'` mode, with only the active volume rendered on GPU!
 */
export function createSensorFabAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const parts: CadPart[] = [];
  const vol0Parts: CadPart[] = [];
  const vol1Parts: CadPart[] = [];

  const overlay0 = createSensorFabPhysicsOverlay(mats.clippingPlanes);
  const overlay1 = createSensorFabVol1PhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(
    overlay0.overlayGroup,
    overlay0.explodeGuides,
    overlay1.overlayGroup,
    overlay1.explodeGuides
  );

  let activeVolume: SensorFabVolume = 0;
  let lastPhysicsVisible = false;
  let hydrated = false;

  const syncOverlayVisibility = () => {
    overlay0.setVisible(lastPhysicsVisible && activeVolume === 0);
    overlay1.setVisible(lastPhysicsVisible && activeVolume === 1);
  };

  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 64,
    setActiveVolume: (vol: SensorFabVolume) => {
      activeVolume = vol;
      syncOverlayVisibility();
    },
    hydrateStandalone: async () => {
      if (hydrated) return [];
      hydrated = true;
      const [{ buildSensorFabParts }, { buildSensorFabVol1Parts }] = await Promise.all([
        import('./sensorFabParts'),
        import('./sensorFabVol1Parts'),
      ]);
      controller.deferredStandaloneCount = 0;

      const built0 = buildSensorFabParts(mats);
      for (const p of built0) {
        p.fabVolume = 0;
        vol0Parts.push(p);
        parts.push(p);
        rootGroup.add(p.group);
      }

      const built1 = buildSensorFabVol1Parts(mats);
      for (const p of built1) {
        p.fabVolume = 1;
        vol1Parts.push(p);
        parts.push(p);
        rootGroup.add(p.group);
      }

      syncOverlayVisibility();
      return [...built0, ...built1];
    },
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive) => {
      if (parts.length === 0) return;
      const activeList = activeVolume === 0 ? vol0Parts : vol1Parts;
      for (const p of activeList) {
        p.group.position.set(
          p.assembledPos.x + p.explodeOffset.x * explodeFactor,
          p.assembledPos.y + p.explodeOffset.y * explodeFactor,
          p.assembledPos.z + p.explodeOffset.z * explodeFactor
        );
      }
      if (activeVolume === 0) {
        overlay0.update(elapsed, explodeFactor, physicsActive, vol0Parts);
      } else {
        overlay1.update(elapsed, explodeFactor, physicsActive, vol1Parts);
      }
    },
    setPhysicsVisible: (visible: boolean) => {
      lastPhysicsVisible = visible;
      syncOverlayVisibility();
    },
    updateExplodeGuides: (explodeFactor: number, visible: boolean) => {
      overlay0.updateGuides(explodeFactor, visible && activeVolume === 0, vol0Parts);
      overlay1.updateGuides(explodeFactor, visible && activeVolume === 1, vol1Parts);
    },
  };

  return controller;
}
