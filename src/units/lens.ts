import * as THREE from 'three';
import lensJson from '../data/lens.json';
import { buildLensParts, buildLensStandaloneParts } from '../assemblies/lens/lensParts';
import { createLensPhysicsOverlay } from '../assemblies/lens/lensPhysicsOverlay';
import { sharedLensOpticalSim } from '../assemblies/lens/lensOpticalSim';
import { OptimizedUnit, UnitMeta, UnitPartMeta } from '../core/unit_contract';
import { CompiledV2Unit } from '../core/v2_unit_compiler';

const LENS_META: UnitMeta = {
  unitId: lensJson.unitId,
  version: lensJson.version,
  nameJa: lensJson.nameJa,
  nameEn: lensJson.nameEn,
  declaredPartCount: lensJson.declaredPartCount,
  parts: lensJson.parts as unknown as readonly UnitPartMeta[],
};

export function createLensUnit(): OptimizedUnit {
  return new CompiledV2Unit({
    unitId: 'lens',
    subsystem: 'lens',
    meta: LENS_META,
    isPartInSubView: (meta, subView) => {
      // subView === -1 represents LensOpticsStudio mode (all macro lens elements active)
      if (subView < 0 || sharedLensOpticalSim.studioOpen) {
        return !meta.standaloneOnly;
      }
      return (meta.lensSection ?? 2) === subView;
    },
    buildRaw: async (mats, _quality, { clippingPlanes }) => {
      const { parts, rig } = buildLensParts(mats, false);
      const extra = await buildLensStandaloneParts(mats);
      const allParts = [...parts, ...extra];
      const overlay = createLensPhysicsOverlay(clippingPlanes);

      const animatedNodes = new Set<THREE.Object3D>([
        ...rig.irisBlades,
        rig.irisCamRing,
        rig.irisPinionGear,
        rig.irisSpurGear,
        ...rig.focusGroupAParts.map((p) => p.group),
        ...rig.focusGroupBParts.map((p) => p.group),
        ...rig.moverCarriages,
        ...rig.mrScaleCarriages,
        rig.focusRingMesh,
        rig.apertureRingMesh,
        rig.mfEncoderWheel,
        rig.apertureHallRotor,
      ]);

      return {
        parts: allParts,
        animatedNodes,
        overlayGroup: overlay.overlayGroup,
        explodeGuides: overlay.explodeGuides,
        needsContinuousAnimation: (physicsActive) =>
          physicsActive || sharedLensOpticalSim.studioOpen,
        setOverlayVisible: (visible) =>
          overlay.setVisible(visible || sharedLensOpticalSim.studioOpen),
        updateGuides: (explodeFactor, visible, activeParts) =>
          overlay.updateGuides(explodeFactor, visible, activeParts),
        stepRigAndOverlay: (elapsed, delta, explodeFactor, physicsActive, integrated, activeParts) => {
          const active = physicsActive || sharedLensOpticalSim.studioOpen;
          if (!active) return false;
          sharedLensOpticalSim.step(elapsed, delta, physicsActive);
          rig.applyDynamics(sharedLensOpticalSim, explodeFactor, integrated);
          overlay.update(elapsed, active, activeParts, integrated, sharedLensOpticalSim);
          return true;
        },
      };
    },
  });
}
