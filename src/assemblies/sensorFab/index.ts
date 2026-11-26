import * as THREE from 'three';
import { AssemblyController, CadPart, SensorFabVolume } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createSensorFabPhysicsOverlay } from './sensorFabPhysicsOverlay';
import { createSensorFabVol1PhysicsOverlay } from './sensorFabVol1PhysicsOverlay';
import { createSensorFabVol2PhysicsOverlay } from './sensorFabVol2PhysicsOverlay';
import { createSensorFabVol3PhysicsOverlay } from './sensorFabVol3PhysicsOverlay';
import { createSensorFabVol4PhysicsOverlay } from './sensorFabVol4PhysicsOverlay';

/**
 * Assemble the lazy-hydrated standalone **Sensor Manufacturing Process (センサー製造工程)**
 * multi-volume encyclopedia:
 * - **Vol.0 (`fabVolume: 0`, `F0-01`–`F0-32`, 32 parts)**: Master Process Map & 2,110-Step Cleanroom 3D Anatomy
 * - **Vol.1 (`fabVolume: 1`, `F1-01`–`F1-32`, 32 parts)**: 超入門・一眼カメラセンサーのしくみと2026年最新アーキテクチャ
 * - **Vol.2 (`fabVolume: 2`, `F2-01`–`F2-36`, 36 parts)**: フェーズ1・砂から超純度エピタキシャルウェーハまで（P01-001〜060）
 * - **Vol.3 (`fabVolume: 3`, `F3-01`–`F3-52`, 52 parts)**: フェーズ2・センサー設計と「ナノの型紙」フォトマスク製造（P02-001〜050）
 * - **Vol.4 (`fabVolume: 4`, `F4-01`–`F4-45`, 45 parts)**: フェーズ3・画素ウェーハ前工程FEOL：光を受け止める心臓部（P03-001〜380 / 全25マスク）
 * Strictly visible ONLY in standalone `'sensor_fab'` mode, with only the active volume rendered on GPU!
 */
export function createSensorFabAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const parts: CadPart[] = [];
  const vol0Parts: CadPart[] = [];
  const vol1Parts: CadPart[] = [];
  const vol2Parts: CadPart[] = [];
  const vol3Parts: CadPart[] = [];
  const vol4Parts: CadPart[] = [];

  const overlay0 = createSensorFabPhysicsOverlay(mats.clippingPlanes);
  const overlay1 = createSensorFabVol1PhysicsOverlay(mats.clippingPlanes);
  const overlay2 = createSensorFabVol2PhysicsOverlay(mats.clippingPlanes);
  const overlay3 = createSensorFabVol3PhysicsOverlay(mats.clippingPlanes);
  const overlay4 = createSensorFabVol4PhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(
    overlay0.overlayGroup,
    overlay0.explodeGuides,
    overlay1.overlayGroup,
    overlay1.explodeGuides,
    overlay2.overlayGroup,
    overlay2.explodeGuides,
    overlay3.overlayGroup,
    overlay3.explodeGuides,
    overlay4.overlayGroup,
    overlay4.explodeGuides
  );

  let activeVolume: SensorFabVolume = 0;
  let lastPhysicsVisible = false;
  let hydrated = false;

  const syncOverlayVisibility = () => {
    overlay0.setVisible(lastPhysicsVisible && activeVolume === 0);
    overlay1.setVisible(lastPhysicsVisible && activeVolume === 1);
    overlay2.setVisible(lastPhysicsVisible && activeVolume === 2);
    overlay3.setVisible(lastPhysicsVisible && activeVolume === 3);
    overlay4.setVisible(lastPhysicsVisible && activeVolume === 4);
  };

  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 197,
    setActiveVolume: (vol: SensorFabVolume) => {
      activeVolume = vol;
      syncOverlayVisibility();
    },
    hydrateStandalone: async () => {
      if (hydrated) return [];
      hydrated = true;
      const [
        { buildSensorFabParts },
        { buildSensorFabVol1Parts },
        { buildSensorFabVol2Parts },
        { buildSensorFabVol3Parts },
        { buildSensorFabVol4Parts },
      ] = await Promise.all([
        import('./sensorFabParts'),
        import('./sensorFabVol1Parts'),
        import('./sensorFabVol2Parts'),
        import('./sensorFabVol3Parts'),
        import('./sensorFabVol4Parts'),
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

      const built2 = buildSensorFabVol2Parts(mats);
      for (const p of built2) {
        p.fabVolume = 2;
        vol2Parts.push(p);
        parts.push(p);
        rootGroup.add(p.group);
      }

      const built3 = buildSensorFabVol3Parts(mats);
      for (const p of built3) {
        p.fabVolume = 3;
        vol3Parts.push(p);
        parts.push(p);
        rootGroup.add(p.group);
      }

      const built4 = buildSensorFabVol4Parts(mats);
      for (const p of built4) {
        p.fabVolume = 4;
        vol4Parts.push(p);
        parts.push(p);
        rootGroup.add(p.group);
      }

      syncOverlayVisibility();
      return [...built0, ...built1, ...built2, ...built3, ...built4];
    },
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive) => {
      if (parts.length === 0) return;
      const activeList =
        activeVolume === 0
          ? vol0Parts
          : activeVolume === 1
            ? vol1Parts
            : activeVolume === 2
              ? vol2Parts
              : activeVolume === 3
                ? vol3Parts
                : vol4Parts;
      for (const p of activeList) {
        p.group.position.set(
          p.assembledPos.x + p.explodeOffset.x * explodeFactor,
          p.assembledPos.y + p.explodeOffset.y * explodeFactor,
          p.assembledPos.z + p.explodeOffset.z * explodeFactor
        );
      }
      if (activeVolume === 0) {
        overlay0.update(elapsed, explodeFactor, physicsActive, vol0Parts);
      } else if (activeVolume === 1) {
        overlay1.update(elapsed, explodeFactor, physicsActive, vol1Parts);
      } else if (activeVolume === 2) {
        overlay2.update(elapsed, explodeFactor, physicsActive, vol2Parts);
      } else if (activeVolume === 3) {
        overlay3.update(elapsed, explodeFactor, physicsActive, vol3Parts);
      } else {
        overlay4.update(elapsed, explodeFactor, physicsActive, vol4Parts);
      }
    },
    setPhysicsVisible: (visible: boolean) => {
      lastPhysicsVisible = visible;
      syncOverlayVisibility();
    },
    updateExplodeGuides: (explodeFactor: number, visible: boolean) => {
      overlay0.updateGuides(explodeFactor, visible && activeVolume === 0, vol0Parts);
      overlay1.updateGuides(explodeFactor, visible && activeVolume === 1, vol1Parts);
      overlay2.updateGuides(explodeFactor, visible && activeVolume === 2, vol2Parts);
      overlay3.updateGuides(explodeFactor, visible && activeVolume === 3, vol3Parts);
      overlay4.updateGuides(explodeFactor, visible && activeVolume === 4, vol4Parts);
    },
  };

  return controller;
}
