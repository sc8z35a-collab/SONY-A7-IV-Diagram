import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildLensParts } from './lensParts';
import { createLensPhysicsOverlay } from './lensPhysicsOverlay';
import { sharedLensOpticalSim } from './lensOpticalSim';

/**
 * Assemble the complete 62-part Flagship 50mm F1.2 Prime Lens & Quad XD Linear AF Motors
 * subsystem with live 11-blade iris modulation, dual floating focus differential actuation,
 * exact 14-element Snell optical ray-tracing, and exploded CAD alignment guides.
 */
export function createLensAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildLensParts(mats);

  for (const part of parts) {
    rootGroup.add(part.group);
  }

  const overlay = createLensPhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  const updatePositions = (explodeFactor: number, integrated: boolean) => {
    for (const p of parts) {
      if (!p.group.visible) continue;
      const offset =
        integrated && p.integratedExplodeOffset ? p.integratedExplodeOffset : p.explodeOffset;
      p.group.position.set(
        p.assembledPos.x + offset.x * explodeFactor,
        p.assembledPos.y + offset.y * explodeFactor,
        p.assembledPos.z + offset.z * explodeFactor
      );
    }
  };

  return {
    rootGroup,
    parts,
    updateAnimation: (elapsed, delta, explodeFactor, physicsActive, integrated) => {
      sharedLensOpticalSim.step(elapsed, delta, physicsActive);
      updatePositions(explodeFactor, integrated);
      rig.applyDynamics(sharedLensOpticalSim, explodeFactor, integrated);
      overlay.update(
        elapsed,
        physicsActive || sharedLensOpticalSim.studioOpen,
        parts,
        integrated,
        sharedLensOpticalSim
      );
    },
    setPhysicsVisible: (visible: boolean) => {
      overlay.setVisible(visible);
    },
    updateExplodeGuides: (explodeFactor: number, visible: boolean) => {
      overlay.updateGuides(explodeFactor, visible, parts);
    },
  };
}
