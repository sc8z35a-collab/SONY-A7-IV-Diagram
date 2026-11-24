import * as THREE from 'three';
import { AssemblyController, CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createMicPhysicsOverlay } from './micPhysicsOverlay';

/**
 * Assemble the lazy-hydrated standalone Internal Stereo / 3-Capsule MEMS & ECM
 * Microphone Ultra-Dissection subsystem (32 parts: MC01–MC32).
 * Strictly visible ONLY in standalone 'mic' mode (zero startup cost!).
 */
export function createMicAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const parts: CadPart[] = [];

  const overlay = createMicPhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  let hydrated = false;

  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 32,
    hydrateStandalone: async () => {
      if (hydrated) return [];
      hydrated = true;
      const { buildMicParts } = await import('./micParts');
      controller.deferredStandaloneCount = 0;
      const built = buildMicParts(mats);
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
