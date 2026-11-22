import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildLensParts } from './lensParts';
import { createLensPhysicsOverlay } from './lensPhysicsOverlay';

/**
 * Assemble the complete 10-part Flagship 50mm F1.2 Prime Lens & Quad XD Linear AF Motors
 * subsystem with live 11-blade iris modulation, dual floating focus differential actuation,
 * wide-aperture F1.2 converging optical ray-tracing, and exploded CAD alignment guides.
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
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive, integrated) => {
      updatePositions(explodeFactor, integrated);
      rig.applyDynamics(elapsed, physicsActive, explodeFactor, integrated);
      overlay.update(elapsed, physicsActive, parts, integrated);
    },
    setPhysicsVisible: (visible: boolean) => {
      overlay.setVisible(visible);
    },
    updateExplodeGuides: (explodeFactor: number, visible: boolean) => {
      overlay.updateGuides(explodeFactor, visible, parts);
    },
  };
}
