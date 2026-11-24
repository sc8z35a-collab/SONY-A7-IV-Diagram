import * as THREE from 'three';
import { AssemblyController, CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildMiShoeParts } from './miShoeParts';
import { createMiShoePhysicsOverlay } from './miShoePhysicsOverlay';

/**
 * Assemble the lazy-hydrated standalone Sony Multi Interface (MI) Shoe
 * Ultra-Dissection subsystem (32 parts: MI01–MI32).
 * Strictly visible ONLY in standalone 'mishoe' mode (zero startup cost!).
 */
export function createMiShoeAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const parts: CadPart[] = [];

  const overlay = createMiShoePhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  let hydrated = false;

  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 32,
    hydrateStandalone: () => {
      if (hydrated) return [];
      hydrated = true;
      controller.deferredStandaloneCount = 0;
      const built = buildMiShoeParts(mats);
      for (const p of built) {
        parts.push(p);
        rootGroup.add(p.group);
      }
      return built;
    },
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive) => {
      if (parts.length === 0) return;
      for (const p of parts) {
        p.group.position.set(
          p.assembledPos.x + p.explodeOffset.x * explodeFactor,
          p.assembledPos.y + p.explodeOffset.y * explodeFactor,
          p.assembledPos.z + p.explodeOffset.z * explodeFactor
        );
      }
      overlay.update(elapsed, explodeFactor, physicsActive, parts);
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
