import * as THREE from 'three';
import shutterJson from '../data/shutter.json';
import { buildShutterParts, buildShutterStandaloneParts } from '../assemblies/shutter/shutterParts';
import { createShutterPhysicsOverlay } from '../assemblies/shutter/shutterPhysicsOverlay';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const SHUTTER_META: UnitMeta = {
  unitId: shutterJson.unitId,
  version: shutterJson.version,
  nameJa: shutterJson.nameJa,
  nameEn: shutterJson.nameEn,
  declaredPartCount: shutterJson.declaredPartCount,
  parts: shutterJson.parts as unknown as readonly UnitPartMeta[],
};

export function createShutterUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'shutter',
    subsystem: 'shutter',
    meta: SHUTTER_META,
    buildRaw: async (mats, _quality, { clippingPlanes }) => {
      const { parts, rig } = buildShutterParts(mats, false);
      const extra = await buildShutterStandaloneParts(mats);
      const allParts = [...parts, ...extra];
      const overlay = createShutterPhysicsOverlay(clippingPlanes);

      const animatedNodes = new Set<THREE.Object3D>([
        ...rig.curtain1Blades,
        ...rig.curtain2Blades,
        ...rig.shieldBlades,
        ...rig.chargeGears,
        rig.link1Main,
        rig.link1Sub,
        rig.link2Main,
        rig.link2Sub,
        rig.chargeCam,
        rig.counterweightLever,
        rig.armatureLever1,
        rig.armatureLever2,
        rig.dualBoostCoilGlow,
        rig.magnet1Glow,
        rig.magnet2Glow,
      ]);

      return {
        parts: allParts,
        animatedNodes,
        overlayGroup: overlay.overlayGroup,
        explodeGuides: overlay.explodeGuides,
        setOverlayVisible: (visible) => overlay.setVisible(visible),
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, _delta, _explodeFactor, physicsActive, integrated, activeParts) => {
          if (!physicsActive) return false;
          rig.applyKinematics(elapsed, physicsActive);
          overlay.update(elapsed, physicsActive, integrated, activeParts, rig);
          return true;
        },
      };
    },
  });
}
