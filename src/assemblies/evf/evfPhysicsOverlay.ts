import * as THREE from 'three';
import { CadPart } from '../types';
import { EVF_OPTICAL_Y } from './evfParts';
import { createRadialTrajectoryGuides } from '../../engine/CadHelpers';

export interface EvfPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  update: (elapsed: number, active: boolean, parts: CadPart[]) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
}

interface RayPacket {
  mesh: THREE.Mesh;
  pathIndex: number;
  phase: number;
  speed: number;
}

/**
 * Real-time 3D EVF Optical Ray-Tracing & Eye-Control AF Infrared Physics Overlay:
 * 1. Visible RGB/Gold OLED imaging rays: Micro-OLED -> G1 -> G2/G3 (live diopter!) -> G4 ->
 *    transmitting straight through 45° Dichroic Mirror & Anti-Fog Window -> 25mm Exit Pupil Eye!
 * 2. 850nm Eye-Control AF IR rays (Ruby Red): 8-LED Ring -> Human Cornea/Pupil ->
 *    returning -> 90° downward reflection off 45° Dichroic Mirror -> 307K-px NIR Gaze Camera!
 * 3. Sleek architectural 3D Stylized Optical Human Eye cross-section at the 25mm eyepoint.
 * 4. 4-corner optical-axis dashed CAD exploded-view guides + vertical IR branch guide.
 */
export function createEvfPhysicsOverlay(clippingPlanes: THREE.Plane[]): EvfPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  overlayGroup.visible = false;

  const explodeGuides = new THREE.Group();
  explodeGuides.visible = false;

  // -------------------------------------------------------------------------
  // 1. Stylized 3D Optical Human Eye Cross-Section at 25 mm Exit Pupil
  // -------------------------------------------------------------------------
  const eyeGroup = new THREE.Group();
  {
    const eyeLineMat = new THREE.LineBasicMaterial({
      color: 0x334155,
      transparent: true,
      opacity: 0.72,
      clippingPlanes,
    });
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      roughness: 0.08,
      metalness: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
      clippingPlanes,
    });
    const irisMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.52,
      side: THREE.DoubleSide,
      clippingPlanes,
    });
    const retinaMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.85,
      clippingPlanes,
    });

    // Translucent Cornea Dome facing +Z (toward the EVF eyepiece)
    const corneaGeo = new THREE.SphereGeometry(5.6, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.42);
    corneaGeo.rotateX(Math.PI / 2);
    const cornea = new THREE.Mesh(corneaGeo, corneaMat);
    cornea.position.z = 5.2;
    eyeGroup.add(cornea);

    // Iris Annular Aperture Ring + Dark Pupil Center
    const iris = new THREE.Mesh(new THREE.RingGeometry(2.1, 4.9, 32), irisMat);
    iris.position.z = 6.2;
    eyeGroup.add(iris);

    const pupil = new THREE.Mesh(
      new THREE.CircleGeometry(2.05, 28),
      new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        transparent: true,
        opacity: 0.72,
        side: THREE.DoubleSide,
        clippingPlanes,
      })
    );
    pupil.position.z = 6.18;
    eyeGroup.add(pupil);

    // Purkinje Corneal Glint Sparkle (subtle glowing ruby-white pinpoint reflected off cornea!)
    const glint = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xfb7185, clippingPlanes })
    );
    glint.position.set(1.1, 0.8, 8.2);
    eyeGroup.add(glint);

    // Eyeball sagittal & horizontal meridian wireframe circles (radius 10.5 mm)
    const rEye = 10.2;
    const buildArc = (axis: 'yz' | 'xz', startA: number, endA: number, r: number, mat: THREE.LineBasicMaterial) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 36; i++) {
        const a = THREE.MathUtils.lerp(startA, endA, i / 36);
        if (axis === 'yz') pts.push(new THREE.Vector3(0, Math.sin(a) * r, Math.cos(a) * r));
        else pts.push(new THREE.Vector3(Math.sin(a) * r, 0, Math.cos(a) * r));
      }
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    };

    // Main sclera profile arcs (rear hemisphere)
    eyeGroup.add(buildArc('yz', 0.48, Math.PI * 2 - 0.48, rEye, eyeLineMat));
    eyeGroup.add(buildArc('xz', 0.48, Math.PI * 2 - 0.48, rEye, eyeLineMat));
    // Highlighted Golden Retina focal arc at the back of the eyeball (-Z side)
    eyeGroup.add(buildArc('yz', Math.PI * 0.68, Math.PI * 1.32, rEye - 0.35, retinaMat));
    eyeGroup.add(buildArc('xz', Math.PI * 0.68, Math.PI * 1.32, rEye - 0.35, retinaMat));
  }
  overlayGroup.add(eyeGroup);

  // -------------------------------------------------------------------------
  // 2. Dynamic Visible OLED Imaging Rays (5 optical ray lines: top/bot/left/right/chief)
  // -------------------------------------------------------------------------
  const visRaySpecs = [
    { color: 0x0284c7, oy: 4.2, ox: 0.0 },   // Upper field ray (Cyan)
    { color: 0xd97706, oy: 0.0, ox: 0.0 },   // Central optical axis chief ray (Gold)
    { color: 0x6366f1, oy: -4.2, ox: 0.0 },  // Lower field ray (Indigo)
    { color: 0x10b981, oy: 0.0, ox: -5.4 },  // Left marginal field ray (Emerald)
    { color: 0x0ea5e9, oy: 0.0, ox: 5.4 },   // Right marginal field ray (Sky)
  ];

  const visLines: THREE.Line[] = [];
  const visPaths: THREE.Vector3[][] = [];

  for (const spec of visRaySpecs) {
    const pts = Array.from({ length: 8 }, () => new THREE.Vector3());
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: spec.color,
      transparent: true,
      opacity: 0.82,
      clippingPlanes,
    });
    const line = new THREE.Line(geo, mat);
    overlayGroup.add(line);
    visLines.push(line);
    visPaths.push(pts);
  }

  // -------------------------------------------------------------------------
  // 3. Dynamic 850nm Eye-Control AF IR Ray Paths (Ruby Red!)
  //    (a) 4 Outgoing IR illumination beams: 8-LED ring -> Eye Cornea
  //    (b) 3 Reflected IR gaze-imaging rays: Cornea/Pupil -> 45° Dichroic Mirror ->
  //        90° DOWNWARD bounce -> IR Relay Lens -> 307K-px NIR CMOS Gaze Sensor!
  // -------------------------------------------------------------------------
  const irEmitMat = new THREE.LineBasicMaterial({
    color: 0xf43f5e,
    transparent: true,
    opacity: 0.62,
    clippingPlanes,
  });
  const irReturnMat = new THREE.LineBasicMaterial({
    color: 0xe11d48,
    transparent: true,
    opacity: 0.94,
    clippingPlanes,
  });

  const irEmitOrigins: Array<[number, number]> = [
    [-10.8, 6.8],
    [10.8, 6.8],
    [-10.8, -6.8],
    [10.8, -6.8],
  ];
  const irEmitLines: THREE.Line[] = [];
  const irEmitPaths: THREE.Vector3[][] = [];
  for (let i = 0; i < irEmitOrigins.length; i++) {
    const pts = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), irEmitMat);
    overlayGroup.add(line);
    irEmitLines.push(line);
    irEmitPaths.push(pts);
  }

  // 3 Reflected Gaze Imaging Rays (upper pupil margin, chief ray, lower pupil margin)
  const irReturnOffsets: Array<[number, number]> = [
    [0, 2.2],
    [0, 0],
    [0, -2.2],
  ];
  const irReturnLines: THREE.Line[] = [];
  const irReturnPaths: THREE.Vector3[][] = [];
  for (let i = 0; i < irReturnOffsets.length; i++) {
    const pts = Array.from({ length: 5 }, () => new THREE.Vector3());
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), irReturnMat);
    overlayGroup.add(line);
    irReturnLines.push(line);
    irReturnPaths.push(pts);
  }

  // Glowing Animated Photon Beads along both Visible OLED Rays and 90° Reflected IR Rays!
  const visPackets: RayPacket[] = [];
  const visGeo = new THREE.SphereGeometry(0.46, 12, 10);
  visRaySpecs.forEach((spec, idx) => {
    const mat = new THREE.MeshBasicMaterial({ color: spec.color, clippingPlanes });
    for (let k = 0; k < 2; k++) {
      const m = new THREE.Mesh(visGeo, mat);
      overlayGroup.add(m);
      visPackets.push({ mesh: m, pathIndex: idx, phase: k * 0.5 + idx * 0.14, speed: 0.42 });
    }
  });

  const irPackets: RayPacket[] = [];
  const irGeo = new THREE.SphereGeometry(0.48, 12, 10);
  const irBeadMat = new THREE.MeshBasicMaterial({ color: 0xe11d48, clippingPlanes });
  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 2; k++) {
      const m = new THREE.Mesh(irGeo, irBeadMat);
      overlayGroup.add(m);
      irPackets.push({ mesh: m, pathIndex: i, phase: k * 0.5 + i * 0.16, speed: 0.52 });
    }
  }

  // -------------------------------------------------------------------------
  // 4. 4-Corner Dashed CAD Exploded-View Alignment Guides + Vertical IR Drop Guide
  // -------------------------------------------------------------------------
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x64748b,
    dashSize: 2.2,
    gapSize: 1.6,
    transparent: true,
    opacity: 0.42,
    clippingPlanes,
  });
  const irGuideMat = new THREE.LineDashedMaterial({
    color: 0xe11d48,
    dashSize: 1.8,
    gapSize: 1.4,
    transparent: true,
    opacity: 0.5,
    clippingPlanes,
  });

  const cornerOffsets: Array<[number, number]> = [
    [-12.5, 10.5],
    [12.5, 10.5],
    [-12.5, -10.5],
    [12.5, -10.5],
  ];
  const guideLines: THREE.Line[] = [];
  for (const [cx, cy] of cornerOffsets) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, EVF_OPTICAL_Y + cy, 10),
      new THREE.Vector3(cx, EVF_OPTICAL_Y + cy, -37),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    guideLines.push(line);
  }

  const verticalIrGuide = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, EVF_OPTICAL_Y, -22.2),
      new THREE.Vector3(0, 25.4, -22.2),
    ]),
    irGuideMat
  );
  verticalIrGuide.computeLineDistances();
  explodeGuides.add(verticalIrGuide);

  const diopterGuideMat = new THREE.LineDashedMaterial({
    color: 0xd97706,
    dashSize: 1.8,
    gapSize: 1.4,
    transparent: true,
    opacity: 0.55,
    clippingPlanes,
  });
  const diopterGuide = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(14.8, EVF_OPTICAL_Y, -9.2),
      new THREE.Vector3(15.0, EVF_OPTICAL_Y - 24, -9.2),
    ]),
    diopterGuideMat
  );
  diopterGuide.computeLineDistances();
  explodeGuides.add(diopterGuide);
  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 64);
  explodeGuides.add(radialGuides.group);

  // Utility to sample a piecewise-linear path at normalized t in [0, 1]
  const samplePolyline = (pts: THREE.Vector3[], t: number, out: THREE.Vector3) => {
    const segs = pts.length - 1;
    const scaled = THREE.MathUtils.clamp(t, 0, 0.9999) * segs;
    const idx = Math.floor(scaled);
    const localT = scaled - idx;
    out.lerpVectors(pts[idx], pts[idx + 1], localT);
  };

  const findPart = (parts: CadPart[], id: string) => parts.find((p) => p.id === id);

  return {
    overlayGroup,
    explodeGuides,
    setVisible: (visible: boolean) => {
      overlayGroup.visible = visible;
    },
    update: (elapsed: number, active: boolean, parts: CadPart[]) => {
      if (!active || !overlayGroup.visible) return;

      const pOled = findPart(parts, 'evf-oled-panel');
      const pG1 = findPart(parts, 'evf-lens-field');
      const pEd = findPart(parts, 'evf-lens-ed-doublet');
      const pG4 = findPart(parts, 'evf-lens-rear');
      const pDic = findPart(parts, 'evf-dichroic-mirror');
      const pIrLed = findPart(parts, 'evf-ir-leds');
      const pAf = findPart(parts, 'evf-antifog-window');
      const pCup = findPart(parts, 'evf-eyecup');
      const pGaze = findPart(parts, 'evf-gaze-camera');

      if (!pOled || !pG1 || !pEd || !pG4 || !pDic || !pIrLed || !pAf || !pCup || !pGaze) return;

      const axisY = pOled.group.position.y;
      const zOled = pOled.group.position.z - 0.85;
      const zG1 = pG1.group.position.z;
      const zEd = pEd.group.position.z;
      const zG4 = pG4.group.position.z;
      const zDic = pDic.group.position.z;
      const zIr = pIrLed.group.position.z - 1.3;
      const zAf = pAf.group.position.z;
      const zCup = pCup.group.position.z;

      // Position Stylized Human Eye at the 25mm high eyepoint behind the eyecup!
      const eyeCenterZ = zCup - 26.5;
      const eyePupilZ = eyeCenterZ + 6.2;
      const eyeCorneaZ = eyeCenterZ + 8.2;
      const eyeRetinaZ = eyeCenterZ - 9.8;
      eyeGroup.position.set(0, axisY, eyeCenterZ);

      // Update Visible OLED Image Ray Cones (refracting cleanly through G1 -> G2/G3 -> G4 -> Dichroic -> Pupil -> Retina!)
      const diopterMod = (pEd.group.position.z - (pEd.assembledPos.z + (zG1 - pG1.assembledPos.z))) * 0.08;
      visRaySpecs.forEach((spec, idx) => {
        const pts = visPaths[idx];
        const sx = spec.ox;
        const sy = spec.oy;
        // 0: OLED emissive point
        pts[0].set(sx, axisY + sy, zOled);
        // 1: G1 Field Flattener (gentle expansion from OLED MLA)
        pts[1].set(sx * 1.28, axisY + sy * 1.28, zG1);
        // 2: G2/G3 Movable ED Cemented Doublet (collimated wide beam modulated by live diopter!)
        pts[2].set(sx * (1.58 + diopterMod), axisY + sy * (1.58 + diopterMod), zEd);
        // 3: G4 Large-Aperture Double Aspheric (bends sharply inward toward 25mm Exit Pupil!)
        pts[3].set(sx * 1.46, axisY + sy * 1.46, zG4);
        // 4: Passes straight through 45° Dichroic Hot Mirror (>98.5% visible transmission!)
        pts[4].set(sx * 0.96, axisY + sy * 0.96, zDic);
        // 5: Passes through Anti-Fog Double Glass Window
        pts[5].set(sx * 0.56, axisY + sy * 0.56, zAf);
        // 6: Crosses neatly through the Human Eye Pupil at the 25mm Exit Pupil!
        pts[6].set(sx * 0.14, axisY + sy * 0.14, eyePupilZ);
        // 7: Projects inverted sharp virtual image onto the Golden Retina!
        pts[7].set(-sx * 0.72, axisY - sy * 0.72, eyeRetinaZ);

        visLines[idx].geometry.setFromPoints(pts);
      });

      // Update 850nm IR Outgoing Beams (4 key LEDs on ring -> Anti-Fog -> Cornea/Pupil)
      irEmitOrigins.forEach(([lx, ly], idx) => {
        const pts = irEmitPaths[idx];
        pts[0].set(lx, axisY + ly, zIr);
        pts[1].set(lx * 0.85, axisY + ly * 0.85, zAf);
        pts[2].set(lx * 0.14, axisY + ly * 0.14, eyeCorneaZ);
        irEmitLines[idx].geometry.setFromPoints(pts);
      });

      // Update 850nm IR Return Gaze Rays (Cornea/Pupil -> Anti-Fog -> 45° Dichroic Mirror -> 90° DOWNWARD -> Gaze Camera!)
      const gazeLensY = pGaze.group.position.y + 3.0;
      const gazeSensorY = pGaze.group.position.y - 0.55;
      irReturnOffsets.forEach(([ox, oy], idx) => {
        const pts = irReturnPaths[idx];
        // 0: Cornea/Pupil reflection point
        pts[0].set(ox, axisY + oy, eyeCorneaZ);
        // 1: Passes straight back through Anti-Fog Window
        pts[1].set(ox * 1.1, axisY + oy * 1.15, zAf);
        // 2: Strikes exact plane of 45° Dichroic Hot Mirror (z = zDic + oy on a 45° plane!)
        const hitY = axisY + oy * 1.25;
        const hitZ = zDic + oy * 1.25;
        pts[2].set(ox * 1.15, hitY, hitZ);
        // 3: Bounces EXACTLY 90° DOWNWARD (-Y) into Aspheric IR Relay Lens!
        pts[3].set(ox * 0.65, gazeLensY, zDic + oy * 0.85);
        // 4: Focuses onto 307K-pixel NIR CMOS Gaze Sensor Die!
        pts[4].set(-ox * 0.35, gazeSensorY, zDic - oy * 0.32);

        irReturnLines[idx].geometry.setFromPoints(pts);
      });

      // Animate glowing Visible OLED photon packets
      for (const pkt of visPackets) {
        const t = (elapsed * pkt.speed + pkt.phase) % 1;
        samplePolyline(visPaths[pkt.pathIndex], t, pkt.mesh.position);
      }

      // Animate glowing 850nm Ruby IR Gaze-Tracking photon packets (Cornea -> Dichroic 90° -> Gaze Sensor)
      for (const pkt of irPackets) {
        const t = (elapsed * pkt.speed + pkt.phase) % 1;
        samplePolyline(irReturnPaths[pkt.pathIndex], t, pkt.mesh.position);
      }
    },
    updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => {
      const show = visible && explodeFactor > 0.04;
      explodeGuides.visible = show;
      if (!show) return;

      const pFront = findPart(parts, 'evf-thermal-sink');
      const pRear = findPart(parts, 'evf-eyecup');
      const pDic = findPart(parts, 'evf-dichroic-mirror');
      const pGaze = findPart(parts, 'evf-gaze-camera');
      const pEd = findPart(parts, 'evf-lens-ed-doublet');
      const pDio = findPart(parts, 'evf-diopter-mech');
      if (!pFront || !pRear || !pDic || !pGaze || !pEd || !pDio) return;

      const axisY = pFront.group.position.y;
      const zStart = pFront.group.position.z + 2.5;
      const zEnd = pRear.group.position.z - 4.0;

      cornerOffsets.forEach(([cx, cy], i) => {
        const line = guideLines[i];
        line.geometry.setFromPoints([
          new THREE.Vector3(cx, axisY + cy, zStart),
          new THREE.Vector3(cx, axisY + cy, zEnd),
        ]);
        line.computeLineDistances();
      });

      verticalIrGuide.geometry.setFromPoints([
        new THREE.Vector3(0, pDic.group.position.y, pDic.group.position.z),
        new THREE.Vector3(0, pGaze.group.position.y, pGaze.group.position.z),
      ]);
      verticalIrGuide.computeLineDistances();

      diopterGuide.geometry.setFromPoints([
        new THREE.Vector3(pEd.group.position.x + 14.8, pEd.group.position.y, pEd.group.position.z),
        new THREE.Vector3(pDio.group.position.x - 0.2, pDio.group.position.y, pDio.group.position.z),
      ]);
      diopterGuide.computeLineDistances();
      radialGuides.update(explodeFactor, visible, parts);
    },
  };
}
