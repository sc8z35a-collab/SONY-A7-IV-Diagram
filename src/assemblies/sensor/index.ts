import * as THREE from 'three';
import { AssemblyController, CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildMacroSensorParts, buildSensorStandaloneParts } from './macroParts';
import { createPhysicsOverlay } from './physicsOverlay';

/**
 * Assemble both the Macro 90-part Full-Frame Image Sensor / 5-Axis IBIS subsystem
 * (40 macro at startup + 50 lazy-hydrated standalone micro parts)
 * and the Micro 75-layer 2x2 Bayer Pixel semiconductor cross-section subsystem
 * (lazy-hydrated on first visit to Micro mode!).
 */
export function createSensorAssemblies(mats: MaterialLibrary): {
  sensor: AssemblyController;
  micro: AssemblyController;
} {
  const macroGroup = new THREE.Group();
  const microGroup = new THREE.Group();

  const macroParts = buildMacroSensorParts(mats, false);
  const microParts: CadPart[] = [];

  for (const part of macroParts) {
    macroGroup.add(part.group);
  }

  const overlay = createPhysicsOverlay(mats.clippingPlanes);
  macroGroup.add(overlay.macroOverlay, overlay.macroExplodeGuides);
  microGroup.add(overlay.microOverlay, overlay.microExplodeGuides);

  let sensorStandaloneHydrated = false;
  let microHydrated = false;

  const sensor: AssemblyController = {
    rootGroup: macroGroup,
    parts: macroParts,
    deferredStandaloneCount: 50,
    hydrateStandalone: async () => {
      if (sensorStandaloneHydrated) return [];
      sensorStandaloneHydrated = true;
      const extra = await buildSensorStandaloneParts(mats);
      sensor.deferredStandaloneCount = 0;
      for (const p of extra) {
        macroParts.push(p);
        macroGroup.add(p.group);
      }
      return extra;
    },
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive, integrated) => {
      overlay.updateMacro(elapsed, explodeFactor, physicsActive, integrated, macroParts);
    },
    setPhysicsVisible: (visible: boolean) => {
      overlay.setMacroVisible(visible);
    },
    updateExplodeGuides: (explodeFactor, visible) => {
      overlay.updateMacroGuides(explodeFactor, visible, macroParts);
    },
  };

  const micro: AssemblyController = {
    rootGroup: microGroup,
    parts: microParts,
    deferredStandaloneCount: 75,
    hydrateStandalone: async () => {
      if (microHydrated) return [];
      microHydrated = true;
      const mPix = await import('./microPixelParts');
      const built = mPix.buildMicroPixelParts(mats);
      micro.deferredStandaloneCount = 0;
      for (const p of built) {
        microParts.push(p);
        microGroup.add(p.group);
      }
      return built;
    },
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive) => {
      if (microParts.length === 0) return;
      overlay.updateMicro(elapsed, explodeFactor, physicsActive, microParts);
    },
    setPhysicsVisible: (visible: boolean) => {
      overlay.setMicroVisible(visible);
    },
    updateExplodeGuides: (explodeFactor: number, visible: boolean) => {
      overlay.updateMicroGuides(explodeFactor, visible);
    },
  };

  return { sensor, micro };
}
