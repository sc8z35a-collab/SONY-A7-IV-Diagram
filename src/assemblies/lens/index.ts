import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildLensParts, buildLensStandaloneParts } from './lensParts';
import { createLensPhysicsOverlay } from './lensPhysicsOverlay';
import { sharedLensOpticalSim } from './lensOpticalSim';

/**
 * Assemble the complete 128-part Flagship 50mm F1.2 Prime Lens & Quad XD Linear AF Motors
 * subsystem (74 macro at startup + 54 lazy-hydrated standalone micro parts across 3 sections).
 */
export function createLensAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildLensParts(mats, false);

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

  let standaloneHydrated = false;
  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 54,
    hydrateStandalone: async () => {
      if (standaloneHydrated) return [];
      standaloneHydrated = true;
      const extra = await buildLensStandaloneParts(mats);
      controller.deferredStandaloneCount = 0;
      for (const p of extra) {
        parts.push(p);
        rootGroup.add(p.group);
      }
      return extra;
    },
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

  return controller;
}
