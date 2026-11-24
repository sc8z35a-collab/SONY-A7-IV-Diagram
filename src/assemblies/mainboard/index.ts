import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildMainboardParts, buildMainboardStandaloneParts } from './mainboardParts';
import { createMainboardPhysicsOverlay } from './mainboardPhysicsOverlay';

/**
 * Assemble the complete 60-part Image Processing Engine & 12-Layer HDI Mainboard
 * subsystem (30 macro at startup + 30 lazy-hydrated standalone micro parts).
 */
export function createMainboardAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildMainboardParts(mats, false);

  for (const part of parts) {
    rootGroup.add(part.group);
  }

  const overlay = createMainboardPhysicsOverlay(mats.clippingPlanes);
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
    deferredStandaloneCount: 30,
    hydrateStandalone: async () => {
      if (standaloneHydrated) return [];
      standaloneHydrated = true;
      const extra = await buildMainboardStandaloneParts(mats);
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
