import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildLcdParts } from './lcdParts';
import { createLcdPhysicsOverlay } from './lcdPhysicsOverlay';

/**
 * Assemble the complete 51-part Flagship 4-Axis Multi-Angle Rear LCD Monitor
 * subsystem (27 macro at startup + 24 lazy-hydrated standalone micro parts).
 */
export function createLcdAssembly(mats: MaterialLibrary): AssemblyController {
  const rootGroup = new THREE.Group();
  const { parts, rig } = buildLcdParts(mats, false);

  for (const part of parts) {
    rootGroup.add(part.group);
  }

  const overlay = createLcdPhysicsOverlay(mats.clippingPlanes);
  rootGroup.add(overlay.overlayGroup, overlay.explodeGuides);

  const updatePositions = (explodeFactor: number, integrated: boolean) => {
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
    deferredStandaloneCount: 24,
    hydrateStandalone: async () => {
      if (standaloneHydrated) return [];
      standaloneHydrated = true;
      const mLcd = await import('./lcdMicroParts');
      const lcdMicro = mLcd.buildLcdMicroParts(mats);
      controller.deferredStandaloneCount = 0;
      for (const p of lcdMicro.parts) {
        parts.push(p);
        rootGroup.add(p.group);
      }
      rig.monitorParts.push(...lcdMicro.monitorParts);
      return lcdMicro.parts;
    },
    updateAnimation: (elapsed, _delta, explodeFactor, physicsActive, integrated) => {
      updatePositions(explodeFactor, integrated);
      rig.applyDynamics(elapsed, physicsActive, explodeFactor, integrated);
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
