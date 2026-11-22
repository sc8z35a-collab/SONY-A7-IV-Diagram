import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildShutterParts } from './shutterParts';
import { createShutterPhysicsOverlay } from './shutterPhysicsOverlay';

/**
 * Assemble the complete next-generation 12-part Dual-Driven Carbon-Fiber Focal-Plane Shutter
 * with real 4-bar parallelogram linkage kinematics, slow-motion slit exposure simulation,
 * and IR photo-interrupter speed diagnostics.
 */
export function createShutterAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildShutterParts(mats);

  for (const part of parts) {
    rootGroup.add(part.group);
  }

  const overlay = createShutterPhysicsOverlay(mats.clippingPlanes);
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
      rig.applyKinematics(elapsed, physicsActive);
      overlay.update(elapsed, physicsActive, integrated, parts, rig);
    },
    setPhysicsVisible: (visible: boolean) => {
      overlay.setVisible(visible);
    },
    updateExplodeGuides: (explodeFactor: number, visible: boolean) => {
      // Ensure positions are up-to-date before measuring front/back Z span for dashed guides
      overlay.updateGuides(explodeFactor, visible, parts);
    },
  };
}
