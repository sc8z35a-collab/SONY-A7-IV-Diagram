import * as THREE from 'three';
import { AssemblyController, ScaleMode } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildMacroSensorParts } from './macroParts';
import { buildMicroPixelParts } from './microPixelParts';
import { createPhysicsOverlay } from './physicsOverlay';

/**
 * Assemble the complete next-generation full-frame image sensor CAD system
 * (Macro 14-part assembly + Micro 7-layer 2x2 pixel semiconductor cross-section + physics overlay).
 */
export function createSensorAssembly(mats: MaterialLibrary): AssemblyController {
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

  microGroup.visible = false;

  return {
    macroGroup,
    microGroup,
    parts: [...macroParts, ...microParts],
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive, mode) => {
      overlay.update(elapsed, explodeFactor, physicsActive, mode, macroParts, microParts);
    },
    setPhysicsVisible: (visible: boolean, mode: ScaleMode) => {
      overlay.setVisible(visible, mode);
    },
    updateExplodeGuides: (explodeFactor: number, mode: ScaleMode) => {
      overlay.updateGuides(explodeFactor, mode);
    },
  };
}
