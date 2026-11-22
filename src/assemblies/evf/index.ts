import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildEvfParts } from './evfParts';
import { createEvfPhysicsOverlay } from './evfPhysicsOverlay';

/**
 * Assemble the complete 14-part Next-Generation Electronic Viewfinder (EVF) & Eye-Control AF
 * CAD subsystem with real-time visible OLED ray-tracing, 850nm infrared corneal-reflection
 * 90° dichroic gaze tracking, and live helical diopter focus kinematics.
 */
export function createEvfAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildEvfParts(mats);

  for (const part of parts) {
    rootGroup.add(part.group);
  }

  const overlay = createEvfPhysicsOverlay(mats.clippingPlanes);
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
      overlay.update(elapsed, physicsActive, parts);
    },
    setPhysicsVisible: (visible: boolean) => {
      overlay.setVisible(visible);
    },
    updateExplodeGuides: (explodeFactor: number, visible: boolean) => {
      overlay.updateGuides(explodeFactor, visible, parts);
    },
  };
}
