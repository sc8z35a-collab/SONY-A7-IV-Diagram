//@FLOW_MAP|file=src/assemblies/body/bodyPhysicsOverlay.ts|unit=body|lines=168|exports=BodyPhysicsOverlayController,createBodyPhysicsOverlay
import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLinePointsInPlace } from '../../engine/CadHelpers';

export interface BodyPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  update: (elapsed: number, active: boolean, parts: CadPart[], integrated: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
}

/**
 * Real-time 3D Power Distribution & Trigger Telemetry Overlay for the 38-Part Flagship Camera Body:
 * 1. 7.2V / 6.0A High-Current Power Bus streaming from Dual-Cell Li-Ion Battery (B01)
 *    -> Gold Chamber Terminals (B02) -> Mainboard PMIC -> 55mm Lens Mount (4x XD Motors) & 21-Pin Hot Shoe (B06).
 * 2. Half-Press / Full-Press Shutter Release signal pulse racing from B04 -> Mainboard MCU.
 * 3. Radial 6-Way Exploded CAD Alignment Guides linking ALL 38 outer shell & internal watchmaker parts back to camera core.
 */
export function createBodyPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): BodyPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  overlayGroup.visible = false;

  const explodeGuides = new THREE.Group();
  explodeGuides.visible = false;

  // -------------------------------------------------------------------------
  // 1. 4 Power & Trigger Telemetry Bus Lines + Traveling Energy Pulses
  // -------------------------------------------------------------------------
  const busColors = [
    0xf59e0b, // 7.2V / 6A Main Power: Battery -> Chamber -> Mainboard PMIC
    0x10b981, // High-Current Lens Actuator Rail: PMIC -> 55mm Mount 12-Pin Bus
    0x0ea5e9, // Digital Audio & Hot Shoe VBUS: PMIC -> 21-Pin MI Hot Shoe
    0xef4444, // Shutter 2-Stage Trigger Bus: Shutter Button -> Mainboard
  ];

  const busLines: THREE.Line[] = [];
  const busPaths: THREE.Vector3[][] = [];
  const pulses: Array<{ mesh: THREE.Mesh; busIdx: number; phase: number; speed: number }> = [];
  const pulseGeo = new THREE.SphereGeometry(1.15, 10, 10);

  for (let i = 0; i < busColors.length; i++) {
    const pts = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({
        color: busColors[i],
        transparent: true,
        opacity: 0.82,
        clippingPlanes,
      })
    );
    overlayGroup.add(line);
    busLines.push(line);
    busPaths.push(pts);

    for (let k = 0; k < 2; k++) {
      const m = new THREE.Mesh(
        pulseGeo,
        new THREE.MeshBasicMaterial({
          color: busColors[i],
          transparent: true,
          opacity: 0.94,
          clippingPlanes,
        })
      );
      overlayGroup.add(m);
      pulses.push({
        mesh: m,
        busIdx: i,
        phase: k * 0.5 + i * 0.17,
        speed: 0.52,
      });
    }
  }

  // -------------------------------------------------------------------------
  // 2. Radial 6-Way Dashed Explode Alignment Guides (all 116 body assemblies!)
  // -------------------------------------------------------------------------
  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 140);
  explodeGuides.add(radialGuides.group);

  const tmpPos = new THREE.Vector3();
  const defBatt = new THREE.Vector3(-54.5, -6, 1.5);
  const defChamb = new THREE.Vector3(-54.5, -6, 1.5);
  const defShut = new THREE.Vector3(-54.5, 31, 9);
  const defShoe = new THREE.Vector3(0, 57.6, -7.5);
  const defFront = new THREE.Vector3(-3, 0, 27.6);
  const pmicHub = new THREE.Vector3(-18, -2, -20);

  let cachedPartsLen = -1;
  let cBatt: CadPart | undefined;
  let cChamb: CadPart | undefined;
  let cShut: CadPart | undefined;
  let cShoe: CadPart | undefined;
  let cFront: CadPart | undefined;

  return {
    overlayGroup,
    explodeGuides,
    setVisible: (visible: boolean) => {
      overlayGroup.visible = visible;
    },
    update: (elapsed, active, parts, _integrated) => {
      if (!active || !overlayGroup.visible) return;

      if (cachedPartsLen !== parts.length) {
        cachedPartsLen = parts.length;
        cBatt = parts.find((p) => p.id === 'body-battery-pack');
        cChamb = parts.find((p) => p.id === 'body-battery-chamber');
        cShut = parts.find((p) => p.id === 'body-shutter-dials');
        cShoe = parts.find((p) => p.id === 'body-mi-hotshoe');
        cFront = parts.find((p) => p.id === 'body-mg-front-shell');
      }

      const battPos = cBatt ? cBatt.group.position : defBatt;
      const chambPos = cChamb ? cChamb.group.position : defChamb;
      const shutPos = cShut ? cShut.group.position : defShut;
      const shoePos = cShoe ? cShoe.group.position : defShoe;
      const frontPos = cFront ? cFront.group.position : defFront;

      // Bus 0: Battery 7.2V -> Chamber Terminals -> Mainboard PMIC
      busPaths[0][0].set(battPos.x, battPos.y + 20, battPos.z);
      busPaths[0][1].set(chambPos.x + 8, chambPos.y + 24, chambPos.z - 6);
      busPaths[0][2].copy(pmicHub);

      // Bus 1: PMIC -> 55mm Lens Mount Power Contacts (driving 4x XD motors!)
      busPaths[1][0].copy(pmicHub);
      busPaths[1][1].set(0, -24, 6);
      busPaths[1][2].set(0, -25, frontPos.z);

      // Bus 2: PMIC -> 21-Pin Digital Audio Multi-Interface Hot Shoe
      busPaths[2][0].copy(pmicHub);
      busPaths[2][1].set(-6, 36, -18);
      busPaths[2][2].set(shoePos.x, shoePos.y + 1, shoePos.z);

      // Bus 3: Shutter 2-Stage Button -> Mainboard Trigger Bus
      busPaths[3][0].set(shutPos.x, shutPos.y + 8, shutPos.z + 12);
      busPaths[3][1].set(shutPos.x + 12, shutPos.y - 6, -8);
      busPaths[3][2].copy(pmicHub);

      for (let i = 0; i < busLines.length; i++) {
        updateLinePointsInPlace(busLines[i], busPaths[i]);
      }

      for (const p of pulses) {
        const pts = busPaths[p.busIdx];
        const t = (elapsed * p.speed + p.phase) % 1;
        if (t < 0.5) {
          tmpPos.lerpVectors(pts[0], pts[1], t * 2);
        } else {
          tmpPos.lerpVectors(pts[1], pts[2], (t - 0.5) * 2);
        }
        p.mesh.position.copy(tmpPos);
      }
    },
    updateGuides: (explodeFactor, visible, parts) => {
      const show = visible && explodeFactor > 0.04;
      explodeGuides.visible = show;
      if (!show) return;
      radialGuides.update(explodeFactor, visible, parts);
    },
  };
}

