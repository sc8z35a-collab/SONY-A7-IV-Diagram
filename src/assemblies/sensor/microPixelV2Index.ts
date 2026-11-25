import * as THREE from 'three';
import { AssemblyController, CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createMicroPixelV2PhysicsOverlay } from './microPixelV2PhysicsOverlay';

/**
 * Assemble the lazy-hydrated standalone Pixel V2 Ultra-Microscopic Atomic & 2026 Quantum
 * Dissection subsystem (30 parts: P2-01 – P2-30).
 * Strictly visible ONLY in standalone 'micro_v2' mode (zero startup cost!).
 */
export function createMicroPixelV2Assembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const parts: CadPart[] = [];

  const overlay = createMicroPixelV2PhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  let hydrated = false;

  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 55,
    hydrateStandalone: async () => {
      if (hydrated) return [];
      hydrated = true;
      const [{ buildMicroPixelV2Parts }, { buildMicroPixelV2DeepParts }] = await Promise.all([
        import('./microPixelV2Parts'),
        import('./microPixelV2DeepParts'),
      ]);
      controller.deferredStandaloneCount = 0;
      const built = [...buildMicroPixelV2Parts(mats), ...buildMicroPixelV2DeepParts(mats)];
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
