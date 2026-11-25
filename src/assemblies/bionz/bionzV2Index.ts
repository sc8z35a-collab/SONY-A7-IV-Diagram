import * as THREE from 'three';
import { AssemblyController, CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createBionzV2PhysicsOverlay } from './bionzV2PhysicsOverlay';

/**
 * Assemble the lazy-hydrated standalone BIONZ XR / XR2 V2 Ultra-Microscopic
 * 2nm GAA Nanosheet / A16 BSPDN & 2026 Silicon Core subsystem (30 parts: X2-01 – X2-30).
 * Strictly visible ONLY in standalone 'bionz_v2' mode (zero startup cost!).
 */
export function createBionzV2Assembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const parts: CadPart[] = [];

  const overlay = createBionzV2PhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  let hydrated = false;

  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 30,
    hydrateStandalone: async () => {
      if (hydrated) return [];
      hydrated = true;
      const { buildBionzV2Parts } = await import('./bionzV2Parts');
      controller.deferredStandaloneCount = 0;
      const built = buildBionzV2Parts(mats);
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
