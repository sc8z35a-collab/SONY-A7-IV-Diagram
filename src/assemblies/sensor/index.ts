import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildMacroSensorParts } from './macroParts';
import { buildMicroPixelParts } from './microPixelParts';
import { createPhysicsOverlay } from './physicsOverlay';

/**
 * Assemble both the Macro 14-part Full-Frame Image Sensor / 5-Axis IBIS subsystem
 * and the Micro 7-layer 2x2 Bayer Pixel semiconductor cross-section subsystem
 * as independent AssemblyControllers.
 */
export function createSensorAssemblies(mats: MaterialLibrary): {
  sensor: AssemblyController;
  micro: AssemblyController;
} {
  const macroGroup = new THREE.Group();
  const microGroup = new THREE.Group();

  const macroParts = buildMacroSensorParts(mats);
  const microParts = buildMicroPixelParts(mats);

  for (const part of macroParts) {
    macroGroup.add(part.group);
  }
  for (const part of microParts) {
    microGroup.add(part.group);
  }

  const overlay = createPhysicsOverlay(mats.clippingPlanes);
  macroGroup.add(overlay.macroOverlay, overlay.macroExplodeGuides);
  microGroup.add(overlay.microOverlay, overlay.microExplodeGuides);

  const sensor: AssemblyController = {
    rootGroup: macroGroup,
    parts: macroParts,
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive, integrated) => {
      overlay.updateMacro(elapsed, explodeFactor, physicsActive, integrated, macroParts);
    },
    setPhysicsVisible: (visible: boolean) => {
      overlay.setMacroVisible(visible);
    },
    updateExplodeGuides: (explodeFactor: number, visible: boolean) => {
      overlay.updateMacroGuides(explodeFactor, visible, macroParts);
    },
  };

  const micro: AssemblyController = {
    rootGroup: microGroup,
    parts: microParts,
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive) => {
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
