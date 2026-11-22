import * as THREE from 'three';
import { CadPart } from '../types';

export interface LensPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  update: (elapsed: number, active: boolean, parts: CadPart[], integrated: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
}

interface PhotonBead {
  mesh: THREE.Mesh;
  rayIndex: number;
  phase: number;
  speed: number;
}

/**
 * Real-time 3D Optical & Electromagnetic Physics Overlay for the 50mm F1.2 Prime Lens:
 * 1. Wide-aperture F1.2 multi-element refracting rays (XA Front -> ED Doublet -> live 11-blade Iris
 *    -> Floating Focus Group A & B -> Rear Hero Element -> Full-Frame Focal Plane).
 * 2. Animated photon packets streaming from subject infinity to focal plane.
 * 3. Quad XD Linear Motor electromagnetic Lorentz force vector pulses (amber/copper) gliding along
 *    all 4 symmetrical guide rails (45°, 135°, 225°, 315°).
 * 4. Dashed axial CAD exploded alignment guides.
 */
export function createLensPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): LensPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  overlayGroup.visible = false;

  const explodeGuides = new THREE.Group();
  explodeGuides.visible = false;

  // -------------------------------------------------------------------------
  // 1. Virtual 36x24 mm Full-Frame Sensor Plane (visible only in standalone lens mode)
  // -------------------------------------------------------------------------
  const focalPlaneGroup = new THREE.Group();
  {
    const framePts = [
      new THREE.Vector3(-18, -12, 0),
      new THREE.Vector3(18, -12, 0),
      new THREE.Vector3(18, 12, 0),
      new THREE.Vector3(-18, 12, 0),
      new THREE.Vector3(-18, -12, 0),
    ];
    const outline = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(framePts),
      new THREE.LineBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.72,
        clippingPlanes,
      })
    );
    const fill = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 24),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false,
        clippingPlanes,
      })
    );
    focalPlaneGroup.add(fill, outline);
  }
  overlayGroup.add(focalPlaneGroup);

  // -------------------------------------------------------------------------
  // 2. 7 Refracting F1.2 Wide-Aperture Optical Rays (7 vertices each)
  // -------------------------------------------------------------------------
  const raySpecs = [
    { color: 0x0284c7, ux: 0, uy: 1, rFront: 24.5, rSensorY: 0, rSensorX: 0 },
    { color: 0x0284c7, ux: 0, uy: -1, rFront: 24.5, rSensorY: 0, rSensorX: 0 },
    { color: 0x0ea5e9, ux: 1, uy: 0, rFront: 24.5, rSensorY: 0, rSensorX: 0 },
    { color: 0x0ea5e9, ux: -1, uy: 0, rFront: 24.5, rSensorY: 0, rSensorX: 0 },
    { color: 0x10b981, ux: 0.707, uy: 0.707, rFront: 23.0, rSensorY: -9.5, rSensorX: -12.0 },
    { color: 0x6366f1, ux: -0.707, uy: -0.707, rFront: 23.0, rSensorY: 9.5, rSensorX: 12.0 },
    { color: 0xf59e0b, ux: 0, uy: 0, rFront: 0, rSensorY: 0, rSensorX: 0 }, // Chief optical axis
  ];

  const rayLines: THREE.Line[] = [];
  const rayPaths: THREE.Vector3[][] = [];

  for (const spec of raySpecs) {
    const pts = Array.from({ length: 8 }, () => new THREE.Vector3());
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.8,
        clippingPlanes,
      })
    );
    overlayGroup.add(line);
    rayLines.push(line);
    rayPaths.push(pts);
  }

  // Animated photon packets streaming through the lens elements
  const beads: PhotonBead[] = [];
  const beadGeo = new THREE.SphereGeometry(0.95, 10, 10);
  for (let r = 0; r < raySpecs.length; r++) {
    for (let k = 0; k < 2; k++) {
      const mesh = new THREE.Mesh(
        beadGeo,
        new THREE.MeshBasicMaterial({
          color: raySpecs[r].color,
          transparent: true,
          opacity: 0.92,
          clippingPlanes,
        })
      );
      overlayGroup.add(mesh);
      beads.push({
        mesh,
        rayIndex: r,
        phase: k * 0.5 + r * 0.13,
        speed: 0.42,
      });
    }
  }

  // -------------------------------------------------------------------------
  // 3. Quad XD Linear Motor Electromagnetic Thrust Pulses
  // -------------------------------------------------------------------------
  const thrustPulses: THREE.Mesh[] = [];
  const motorAnglesDeg = [45, 135, 225, 315];
  const thrustGeo = new THREE.ConeGeometry(1.6, 5.2, 12);
  thrustGeo.rotateX(Math.PI / 2);

  for (let i = 0; i < 4; i++) {
    const pulse = new THREE.Mesh(
      thrustGeo,
      new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xf59e0b : 0x10b981,
        transparent: true,
        opacity: 0.88,
        clippingPlanes,
      })
    );
    overlayGroup.add(pulse);
    thrustPulses.push(pulse);
  }

  // -------------------------------------------------------------------------
  // 4. Axial Dashed CAD Explode Alignment Guides
  // -------------------------------------------------------------------------
  const guideLines: THREE.Line[] = [];
  const guideOffsets: Array<[number, number]> = [
    [34, 0],
    [-34, 0],
    [0, 34],
    [0, -34],
  ];
  for (const [gx, gy] of guideOffsets) {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(gx, gy, 34),
        new THREE.Vector3(gx, gy, 136),
      ]),
      new THREE.LineDashedMaterial({
        color: 0x64748b,
        dashSize: 3.0,
        gapSize: 2.2,
        transparent: true,
        opacity: 0.48,
        clippingPlanes,
      })
    );
    line.computeLineDistances();
    explodeGuides.add(line);
    guideLines.push(line);
  }

  const tmpPos = new THREE.Vector3();

  return {
    overlayGroup,
    explodeGuides,
    setVisible: (visible: boolean) => {
      overlayGroup.visible = visible;
    },
    update: (elapsed, active, parts, integrated) => {
      if (!active || !overlayGroup.visible) return;

      const pFront = parts.find((p) => p.id === 'lens-front-xa');
      const pEd = parts.find((p) => p.id === 'lens-ed-group');
      const pIris = parts.find((p) => p.id === 'lens-aperture-11');
      const pFocusA = parts.find((p) => p.id === 'lens-focus-group-a');
      const pXd = parts.find((p) => p.id === 'lens-xd-motors');
      const pFocusB = parts.find((p) => p.id === 'lens-focus-group-b');
      const pRear = parts.find((p) => p.id === 'lens-rear-element');

      const zFront = pFront ? pFront.group.position.z : 108.5;
      const zEd = pEd ? pEd.group.position.z : 95.5;
      const zIris = pIris ? pIris.group.position.z : 82.0;
      const zFocusA = pFocusA ? pFocusA.group.position.z : 71.0;
      const zFocusB = pFocusB ? pFocusB.group.position.z : 56.5;
      const zRear = pRear ? pRear.group.position.z : 42.0;
      const zSensor = integrated ? 0.0 : zRear - 36.0;

      focalPlaneGroup.visible = !integrated;
      focalPlaneGroup.position.set(0, 0, zSensor);

      // Sync ray bundle aperture constriction with live 11-blade iris wave!
      const irisWave = 0.5 - 0.5 * Math.cos(elapsed * 1.15);
      const apertureScale = 1.0 - irisWave * 0.56; // shrinks rays as diaphragm stops down to F11

      for (let i = 0; i < raySpecs.length; i++) {
        const s = raySpecs[i];
        const pts = rayPaths[i];
        const rIn = s.rFront * apertureScale;
        const rEd = rIn * 0.88;
        const rIris = rIn * 0.74;
        const rFA = rIn * 0.62;
        const rFB = rIn * 0.45;
        const rRear = rIn * 0.30;

        pts[0].set(s.ux * rIn, s.uy * rIn, zFront + 32.0);
        pts[1].set(s.ux * rIn, s.uy * rIn, zFront);
        pts[2].set(s.ux * rEd, s.uy * rEd, zEd);
        pts[3].set(s.ux * rIris, s.uy * rIris, zIris);
        pts[4].set(s.ux * rFA + s.rSensorX * 0.22, s.uy * rFA + s.rSensorY * 0.22, zFocusA);
        pts[5].set(s.ux * rFB + s.rSensorX * 0.48, s.uy * rFB + s.rSensorY * 0.48, zFocusB);
        pts[6].set(s.ux * rRear + s.rSensorX * 0.72, s.uy * rRear + s.rSensorY * 0.72, zRear);
        pts[7].set(s.rSensorX, s.rSensorY, zSensor);

        rayLines[i].geometry.setFromPoints(pts);
      }

      // Move photon beads along multi-segment refracted paths
      for (const b of beads) {
        const pts = rayPaths[b.rayIndex];
        const t = (elapsed * b.speed + b.phase) % 1;
        const segFloat = t * (pts.length - 1);
        const segIdx = Math.min(pts.length - 2, Math.floor(segFloat));
        const localT = segFloat - segIdx;
        tmpPos.lerpVectors(pts[segIdx], pts[segIdx + 1], localT);
        b.mesh.position.copy(tmpPos);
      }

      // Animate 4 electromagnetic Lorentz thrust indicators along the 4 XD Linear Motor rails
      const zXd = pXd ? pXd.group.position.z : 64.5;
      const focusVel = Math.cos(elapsed * 1.85);
      for (let i = 0; i < 4; i++) {
        const a = THREE.MathUtils.degToRad(motorAnglesDeg[i]);
        const dirSign = (i % 2 === 0 ? 1 : -1) * (focusVel >= 0 ? 1 : -1);
        const travel = Math.sin(elapsed * 1.85) * (i % 2 === 0 ? 5.2 : -4.2);
        const pulse = thrustPulses[i];
        pulse.position.set(
          Math.cos(a) * 35.8,
          Math.sin(a) * 35.8,
          zXd + (i % 2 === 0 ? 5.5 : -6.5) + travel + dirSign * 4.5
        );
        pulse.rotation.x = dirSign >= 0 ? 0 : Math.PI;
      }
    },
    updateGuides: (explodeFactor, visible, parts) => {
      const show = visible && explodeFactor > 0.04;
      explodeGuides.visible = show;
      if (!show) return;

      const pFront = parts.find((p) => p.id === 'lens-front-hood');
      const pRear = parts.find((p) => p.id === 'lens-rear-element');
      const zMax = pFront ? pFront.group.position.z + 10 : 140;
      const zMin = pRear ? pRear.group.position.z - 6 : 36;

      for (let i = 0; i < guideLines.length; i++) {
        const [gx, gy] = guideOffsets[i];
        guideLines[i].geometry.setFromPoints([
          new THREE.Vector3(gx, gy, zMin),
          new THREE.Vector3(gx, gy, zMax),
        ]);
        guideLines[i].computeLineDistances();
      }
    },
  };
}
