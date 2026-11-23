import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildBodyParts, buildBodyStandaloneParts } from './bodyParts';
import { createBodyPhysicsOverlay } from './bodyPhysicsOverlay';

/**
 * Assemble the complete 76-part Flagship Camera Magnesium Monocoque Body
 * subsystem (38 macro at startup + 38 lazy-hydrated standalone micro parts).
 */
export function createBodyAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildBodyParts(mats, false);

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

  let standaloneHydrated = false;
  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 38,
    hydrateStandalone: () => {
      if (standaloneHydrated) return [];
      standaloneHydrated = true;
      controller.deferredStandaloneCount = 0;
      const extra = buildBodyStandaloneParts(mats);
      for (const p of extra) {
        parts.push(p);
        rootGroup.add(p.group);
      }
      return extra;
    },
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
  return controller;
}
