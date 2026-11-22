import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildLcdParts } from './lcdParts';
import { createLcdPhysicsOverlay } from './lcdPhysicsOverlay';

/**
 * Assemble the complete 6-part Flagship 4-Axis Multi-Angle Rear LCD Monitor subsystem
 * with live optical-axis tilt & +X vari-angle articulation, BEF polarized backlight
 * collimation rays, and exploded CAD alignment guides.
 */
export function createLcdAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildLcdParts(mats);

  for (const part of parts) {
    rootGroup.add(part.group);
  }

  const overlay = createLcdPhysicsOverlay(mats.clippingPlanes);
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
