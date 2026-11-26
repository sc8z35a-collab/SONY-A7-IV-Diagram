import * as THREE from 'three';
import { AssemblyController, CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createDryboxPhysicsOverlay } from './dryboxPhysicsOverlay';

/**
 * Assemble the lazy-hydrated standalone 2026 Flagship Dual-Zone Hybrid Electronic
 * Camera Dry Cabinet Ultra-Dissection subsystem (44 parts: DB01–DB44).
 * Strictly visible ONLY in standalone 'drybox' mode (zero startup cost!).
 */
export function createDryboxAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const parts: CadPart[] = [];

  const overlay = createDryboxPhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  let hydrated = false;

  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 44,
    hydrateStandalone: async () => {
      if (hydrated) return [];
      hydrated = true;
      const { buildDryboxParts } = await import('./dryboxParts');
      controller.deferredStandaloneCount = 0;
      const built = buildDryboxParts(mats);
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
