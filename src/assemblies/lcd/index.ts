import * as THREE from 'three';
import { AssemblyController } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { buildLcdParts } from './lcdParts';
import { createLcdPhysicsOverlay } from './lcdPhysicsOverlay';

/**
 * Assemble the complete 150-part Flagship 4-Axis Multi-Angle Rear LCD Monitor
 * subsystem (27 macro at startup + 123 lazy-hydrated standalone ultra-detail parts: D28–D150).
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
    deferredStandaloneCount: 123,
    hydrateStandalone: async () => {
      if (standaloneHydrated) return [];
      standaloneHydrated = true;
      const [mLcd, mOem, mTech, mDeep] = await Promise.all([
        import('./lcdMicroParts'),
        import('./lcdUltraOemParts'),
        import('./lcdUltraTechParts'),
        import('./lcdUltraDeepParts'),
      ]);
      const lcdMicro = mLcd.buildLcdMicroParts(mats);
      const lcdOem = mOem.buildLcdUltraOemParts(mats);
      const lcdTech = mTech.buildLcdUltraTechParts(mats);
      const lcdDeep = mDeep.buildLcdUltraDeepParts(mats);
      const allStandalone = [
        ...lcdMicro.parts,
        ...lcdOem.parts,
        ...lcdTech.parts,
        ...lcdDeep.parts,
      ];
      controller.deferredStandaloneCount = 0;
      for (const p of allStandalone) {
        parts.push(p);
        rootGroup.add(p.group);
      }
      rig.monitorParts.push(
        ...lcdMicro.monitorParts,
        ...lcdOem.monitorParts,
        ...lcdTech.monitorParts,
        ...lcdDeep.monitorParts
      );
      return allStandalone;
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
