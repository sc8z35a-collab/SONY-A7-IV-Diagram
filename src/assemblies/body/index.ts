import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildBodyParts } from './bodyParts';
import { createBodyPhysicsOverlay } from './bodyPhysicsOverlay';

/**
 * Assemble the complete 12-part Flagship Camera Magnesium Monocoque Body,
 * 7.2V/6A Dual-Cell Battery, Deep Leatherette Grip, 21-Pin Digital Audio Hot Shoe,
 * Top/Rear Dials, 8-Way AF Joystick, Weather-Sealed Doors & Optical-Axis Tripod Baseplate.
 */
export function createBodyAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildBodyParts(mats);

  for (const part of parts) {
    rootGroup.add(part.group);
  }

  const overlay = createBodyPhysicsOverlay(mats.clippingPlanes);
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
      rig.applyDynamics(elapsed, physicsActive);
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
