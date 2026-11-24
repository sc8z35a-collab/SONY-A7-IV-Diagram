import * as THREE from 'three';
import { AssemblyController, CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildBatteryParts } from './batteryParts';
import { createBatteryPhysicsOverlay } from './batteryPhysicsOverlay';

/**
 * Assemble the Standalone 30-part Flagship Camera Battery Pack Ultra-Dissection
 * (Sony NP-FZ100 + Next-Gen Si-C / USB-C PD / 4-LED Smart Pack, P01–P30).
 * 100% lazy-hydrated on first visit to 'battery' mode (0 startup overhead!).
 */
export function createBatteryAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const parts: CadPart[] = [];

  const overlay = createBatteryPhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  let hydrated = false;

  const controller: AssemblyController = {
    rootGroup,
    parts,
    deferredStandaloneCount: 30,
    hydrateStandalone: () => {
      if (hydrated) return [];
      hydrated = true;
      controller.deferredStandaloneCount = 0;
      const built = buildBatteryParts(mats);
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
