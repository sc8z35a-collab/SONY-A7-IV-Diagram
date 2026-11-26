import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildMountParts, buildMountStandaloneParts } from './mountParts';
import { createMountPhysicsOverlay } from './mountPhysicsOverlay';

/**
 * Assemble the complete 100-part Flagship 55mm Large-Diameter Mirrorless Lens Mount
 * subsystem (26 macro at startup + 74 lazy-hydrated standalone ultra-HD micro parts).
 */
export function createMountAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildMountParts(mats, false);

  for (const part of parts) {
    rootGroup.add(part.group);
  }

  const overlay = createMountPhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  let lastExp = -1;
  let lastInt = false;
  let lastLen = -1;
  const updatePositions = (explodeFactor: number, integrated: boolean) => {
    if (lastExp === explodeFactor && lastInt === integrated && lastLen === parts.length) return;
    lastExp = explodeFactor;
    lastInt = integrated;
    lastLen = parts.length;
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
    deferredStandaloneCount: 74,
    hydrateStandalone: async () => {
      if (standaloneHydrated) return [];
      standaloneHydrated = true;
      const extra = await buildMountStandaloneParts(mats);
      controller.deferredStandaloneCount = 0;
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
