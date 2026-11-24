import * as THREE from 'three';
import { AssemblyController, CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createCfexpressPhysicsOverlay } from './cfexpressPhysicsOverlay';

/**
 * Assemble the Standalone 60-part CFexpress 4.0 Card Ultra-Dissection
 * (Sony CEA-G Type A TOUGH / PCIe Gen4 NVMe 2.0 / 16DP / BiCS8 CBA 3D NAND, C01–C60).
 * 100% lazy-hydrated on first visit to 'cfexpress' mode (0 startup overhead!).
 */
export function createCfexpressAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const parts: CadPart[] = [];

  const overlay = createCfexpressPhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  let hydrated = false;

  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 60,
    hydrateStandalone: async () => {
      if (hydrated) return [];
      hydrated = true;
      const { buildCfexpressParts } = await import('./cfexpressParts');
      controller.deferredStandaloneCount = 0;
      const built = await buildCfexpressParts(mats);
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
      overlay.update(elapsed, physicsActive, parts);
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
