import * as THREE from 'three';
import { RiimosLauncherOpticsRigRefs } from './riimosE1LauncherOpticsBrainParts';
import { RiimosLegRigRef } from './riimosE1LegsAndAccessoriesParts';

/**
 * Zero-GC Live Kinematics Rig for RIIMOS E1 (activated via the Original "稼働デモ" / Physics toggle).
 * Demonstrates:
 *   1. XYZ + Diagonal Omnidirectional Crab Gait (alternating diagonal leg pairs FL+RR / FR+RL)
 *      with vertical foot lift and horizontal stride swing.
 *   2. Front & Rear 1-Axis Camera Pitch Counter-Stabilization.
 *   3. Primary 4-Barrel Target-Tracking Aiming Sweep.
 *   4. Periodic Fail-Closed Physical Vision-Shutout Hood Demonstration.
 */
export interface RiimosE1DynamicRig {
  readonly animatedNodes: Set<THREE.Object3D>;
  applyDynamics: (elapsed: number, physicsActive: boolean, explodeFactor: number) => void;
}

export function createRiimosE1DynamicRig(
  launcherOptics: RiimosLauncherOpticsRigRefs,
  legRigs: readonly RiimosLegRigRef[]
): RiimosE1DynamicRig {
  const animatedNodes = new Set<THREE.Object3D>();
  for (const g of launcherOptics.frontLauncherGroups) animatedNodes.add(g);
  for (const g of launcherOptics.rearLauncherGroups) animatedNodes.add(g);
  for (const g of launcherOptics.frontCamGimbalGroups) animatedNodes.add(g);
  for (const g of launcherOptics.rearCamGimbalGroups) animatedNodes.add(g);
  animatedNodes.add(launcherOptics.frontShutterGroup);
  animatedNodes.add(launcherOptics.rearShutterGroup);
  for (const leg of legRigs) {
    animatedNodes.add(leg.coxaBracket);
    animatedNodes.add(leg.femurServo);
    animatedNodes.add(leg.femurLink);
    animatedNodes.add(leg.tibiaServo);
    animatedNodes.add(leg.tibiaFoot);
  }

  // Cache initial positions for barrels & cameras so resting pose restores cleanly at physicsActive=false
  const frontLauncherBase = launcherOptics.frontLauncherGroups.map((g) => g.position.clone());
  const rearLauncherBase = launcherOptics.rearLauncherGroups.map((g) => g.position.clone());
  const frontCamBase = launcherOptics.frontCamGimbalGroups.map((g) => g.position.clone());
  const rearCamBase = launcherOptics.rearCamGimbalGroups.map((g) => g.position.clone());
  const frontShutterBase = launcherOptics.frontShutterGroup.position.clone();
  const rearShutterBase = launcherOptics.rearShutterGroup.position.clone();

  const applyDynamics = (elapsed: number, physicsActive: boolean, explodeFactor: number) => {
    // Attenuate live kinematics smoothly when exploded so exploded view remains crisp
    const damp = physicsActive ? Math.max(0, 1 - explodeFactor * 1.15) : 0;

    // 1. Primary Front 4-Barrel Aiming Sweep (smooth horizontal & pitch lock-on tracking)
    const aimYaw = Math.sin(elapsed * 1.9) * 0.16 * damp;
    const aimPitch = Math.sin(elapsed * 1.35 + 0.6) * 0.12 * damp;
    for (let i = 0; i < launcherOptics.frontLauncherGroups.length; i++) {
      const g = launcherOptics.frontLauncherGroups[i];
      g.position.copy(frontLauncherBase[i]);
      g.rotation.set(aimPitch, aimYaw, 0);
      g.updateMatrixWorld(true);
    }
    for (let i = 0; i < launcherOptics.rearLauncherGroups.length; i++) {
      const g = launcherOptics.rearLauncherGroups[i];
      g.position.copy(rearLauncherBase[i]);
      g.rotation.set(-aimPitch * 0.45, -aimYaw * 0.55, 0);
      g.updateMatrixWorld(true);
    }

    // 2. Front & Rear Camera 1-Axis Physical Pitch Counter-Stabilization
    const camStabPitch = -Math.sin(elapsed * 3.2) * 0.11 * damp;
    for (let i = 0; i < launcherOptics.frontCamGimbalGroups.length; i++) {
      const g = launcherOptics.frontCamGimbalGroups[i];
      g.position.copy(frontCamBase[i]);
      g.rotation.set(camStabPitch, 0, 0);
      g.updateMatrixWorld(true);
    }
    for (let i = 0; i < launcherOptics.rearCamGimbalGroups.length; i++) {
      const g = launcherOptics.rearCamGimbalGroups[i];
      g.position.copy(rearCamBase[i]);
      g.rotation.set(-camStabPitch, 0, 0);
      g.updateMatrixWorld(true);
    }

    // 3. Periodic Fail-Closed Physical Vision-Shutout Hood Demo (briefly closes every 8s cycle)
    const cycle = elapsed % 8.0;
    const shutFactor =
      damp > 0 && cycle > 6.2 && cycle < 7.6
        ? Math.sin(((cycle - 6.2) / 1.4) * Math.PI) * damp
        : 0;
    launcherOptics.frontShutterGroup.position.set(
      frontShutterBase.x,
      frontShutterBase.y - shutFactor * 12.2,
      frontShutterBase.z
    );
    launcherOptics.frontShutterGroup.updateMatrixWorld(true);
    launcherOptics.rearShutterGroup.position.set(
      rearShutterBase.x,
      rearShutterBase.y - shutFactor * 12.2,
      rearShutterBase.z
    );
    launcherOptics.rearShutterGroup.updateMatrixWorld(true);

    // 4. 4-Leg X-Radial XYZ + Diagonal Crab Trot Gait
    const gaitOmega = 4.6;
    const bodyHeave = Math.sin(elapsed * 2.1) * 6.0 * damp;
    for (const leg of legRigs) {
      const phi = elapsed * gaitOmega + leg.phase;
      const swing = Math.sin(phi) * damp;
      const lift = Math.max(0, Math.cos(phi)) * 18.0 * damp;
      // Lateral crab stride vector along X + subtle diagonal Y/Z shift
      const strideX = swing * 16.0;
      const strideZ = Math.sin(elapsed * 0.7) * swing * 8.0;
      const coxaYawDelta = swing * 0.16;

      leg.coxaBracket.position.set(
        leg.basePositions.coxaBracket.x,
        leg.basePositions.coxaBracket.y + bodyHeave * 0.25,
        leg.basePositions.coxaBracket.z
      );
      leg.coxaBracket.rotation.set(0, coxaYawDelta, 0);
      leg.coxaBracket.updateMatrixWorld(true);

      leg.femurServo.position.set(
        leg.basePositions.femurServo.x + strideX * 0.22,
        leg.basePositions.femurServo.y + lift * 0.25 + bodyHeave * 0.35,
        leg.basePositions.femurServo.z + strideZ * 0.22
      );
      leg.femurServo.rotation.set(0, coxaYawDelta, 0);
      leg.femurServo.updateMatrixWorld(true);

      leg.femurLink.position.set(
        leg.basePositions.femurLink.x + strideX * 0.55,
        leg.basePositions.femurLink.y + lift * 0.58 + bodyHeave * 0.45,
        leg.basePositions.femurLink.z + strideZ * 0.55
      );
      leg.femurLink.rotation.set(0, coxaYawDelta, 0);
      leg.femurLink.updateMatrixWorld(true);

      leg.tibiaServo.position.set(
        leg.basePositions.tibiaServo.x + strideX * 0.85,
        leg.basePositions.tibiaServo.y + lift * 0.85 + bodyHeave * 0.5,
        leg.basePositions.tibiaServo.z + strideZ * 0.85
      );
      leg.tibiaServo.rotation.set(0, coxaYawDelta, 0);
      leg.tibiaServo.updateMatrixWorld(true);

      leg.tibiaFoot.position.set(
        leg.basePositions.tibiaFoot.x + strideX,
        leg.basePositions.tibiaFoot.y + lift,
        leg.basePositions.tibiaFoot.z + strideZ
      );
      leg.tibiaFoot.rotation.set(0, coxaYawDelta, 0);
      leg.tibiaFoot.updateMatrixWorld(true);
    }
  };

  return { animatedNodes, applyDynamics };
}
