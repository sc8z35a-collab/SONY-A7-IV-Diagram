import * as THREE from 'three';
import { CadPart } from '../types';

export interface MountPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  update: (elapsed: number, active: boolean, parts: CadPart[], integrated: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
}

interface PulseBead {
  mesh: THREE.Mesh;
  pathIndex: number;
  phase: number;
  speed: number;
}

/**
 * Real-time 3D Optical & Electromechanical Physics Overlay for the 55mm Large-Diameter Lens Mount:
 * 1. Large-diameter F0.95 / F1.2 converging optical ray bundle (shallow Chief Ray Angle!)
 *    passing cleanly through the 55mm stainless flange -> 36x24mm flare mask -> Full-Frame Sensor plane!
 * 2. High-angle stray light rays (amber) trapped & absorbed on the stepped velvet baffles & flare mask!
 * 3. Bidirectional 12-pin high-speed SPI/IBIS/Power signal pulses racing across gold pogo pins -> ESD PCB -> FPC!
 * 4. 60-degree bayonet twist-lock arc indicator at the front flange + 4-corner dashed exploded guides!
 */
export function createMountPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): MountPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  overlayGroup.visible = false;

  const explodeGuides = new THREE.Group();
  explodeGuides.visible = false;

  // -------------------------------------------------------------------------
  // 1. Subtle 36x24 mm Virtual Full-Frame Focal Plane Reference (standalone mount mode)
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
    const sensorOutline = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(framePts),
      new THREE.LineBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.78,
        clippingPlanes,
      })
    );
    const sensorGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 24),
      new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
        depthWrite: false,
        clippingPlanes,
      })
    );
    // Diagonal 43.27mm image-circle ring showing how 55mm mount swallows full-frame diagonal!
    const circlePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      circlePts.push(new THREE.Vector3(Math.cos(a) * 21.64, Math.sin(a) * 21.64, 0));
    }
    const diagCircle = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(circlePts),
      new THREE.LineDashedMaterial({
        color: 0x6366f1,
        dashSize: 1.8,
        gapSize: 1.4,
        transparent: true,
        opacity: 0.55,
        clippingPlanes,
      })
    );
    diagCircle.computeLineDistances();

    focalPlaneGroup.add(sensorGlass, sensorOutline, diagCircle);
  }
  overlayGroup.add(focalPlaneGroup);

  // -------------------------------------------------------------------------
  // 2. Wide-Aperture F0.95 / F1.2 Optical Rays (Shallow Chief Ray Angle!)
  // -------------------------------------------------------------------------
  const optSpecs = [
    { color: 0x0284c7, sx: -16.2, sy: 10.6, rx: -22.2, ry: 14.2 }, // Upper-left wide F0.95 ray
    { color: 0x0ea5e9, sx: 16.2, sy: 10.6, rx: 22.2, ry: 14.2 },   // Upper-right wide F0.95 ray
    { color: 0x6366f1, sx: -16.2, sy: -10.6, rx: -22.2, ry: -14.2 },
    { color: 0x06b6d4, sx: 16.2, sy: -10.6, rx: 22.2, ry: -14.2 },
    { color: 0xf59e0b, sx: 0, sy: 0, rx: 0, ry: 0 },               // Optical axis chief ray
    { color: 0x0284c7, sx: 0, sy: 11.0, rx: 0, ry: 22.5 },         // Top extreme wide marginal ray
    { color: 0x06b6d4, sx: 0, sy: -11.0, rx: 0, ry: -21.0 },       // Bottom marginal ray
  ];

  const optLines: THREE.Line[] = [];
  const optPaths: THREE.Vector3[][] = [];
  for (const spec of optSpecs) {
    const pts = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.78,
        clippingPlanes,
      })
    );
    overlayGroup.add(line);
    optLines.push(line);
    optPaths.push(pts);
  }

  // Oblique Stray-Light Flare Rays trapped & extinguished on M09 Knife-Edge Baffle & M10 Flare Mask!
  const straySpecs = [
    { startX: -14, startY: 22, hitX: 0, hitY: 25.0 },
    { startX: 14, startY: 22, hitX: 22.0, hitY: 16.5 },
  ];
  const strayLines: THREE.Line[] = [];
  const strayDots: THREE.Mesh[] = [];
  for (let i = 0; i < straySpecs.length; i++) {
    const pts = [new THREE.Vector3(), new THREE.Vector3()];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineDashedMaterial({
        color: 0xea580c,
        dashSize: 2.0,
        gapSize: 1.4,
        transparent: true,
        opacity: 0.82,
        clippingPlanes,
      })
    );
    const hitDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.68, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xdc2626, clippingPlanes })
    );
    overlayGroup.add(line, hitDot);
    strayLines.push(line);
    strayDots.push(hitDot);
  }

  // -------------------------------------------------------------------------
  // 3. 12-Pin Bidirectional High-Speed Communication & Power Pulses (M07 -> M08 -> FPC)
  // -------------------------------------------------------------------------
  const busLines: THREE.Line[] = [];
  const busPaths: THREE.Vector3[][] = [];
  const busPinIndices = [1, 4, 7, 10];
  const busColors = [0x10b981, 0x059669, 0xf59e0b, 0x10b981];
  busPinIndices.forEach((_pIdx, idx) => {
    const pts = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({
        color: busColors[idx],
        transparent: true,
        opacity: 0.85,
        clippingPlanes,
      })
    );
    overlayGroup.add(line);
    busLines.push(line);
    busPaths.push(pts);
  });

  // Animated photon & data signal beads
  const optBeads: PulseBead[] = [];
  const optBeadGeo = new THREE.SphereGeometry(0.52, 12, 10);
  optSpecs.forEach((spec, idx) => {
    const mat = new THREE.MeshBasicMaterial({ color: spec.color, clippingPlanes });
    for (let k = 0; k < 2; k++) {
      const m = new THREE.Mesh(optBeadGeo, mat);
      overlayGroup.add(m);
      optBeads.push({ mesh: m, pathIndex: idx, phase: k * 0.5 + idx * 0.13, speed: 0.44 });
    }
  });

  const busBeads: PulseBead[] = [];
  const busBeadGeo = new THREE.SphereGeometry(0.48, 12, 10);
  busColors.forEach((col, idx) => {
    const mat = new THREE.MeshBasicMaterial({ color: col, clippingPlanes });
    const m = new THREE.Mesh(busBeadGeo, mat);
    overlayGroup.add(m);
    busBeads.push({ mesh: m, pathIndex: idx, phase: idx * 0.24, speed: 0.68 });
  });

  // -------------------------------------------------------------------------
  // 4. 60-Degree Bayonet Twist-Lock Indicator Arc in front of Stainless Flange
  // -------------------------------------------------------------------------
  const twistArcPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 28; i++) {
    const a = THREE.MathUtils.degToRad(30 + (i / 28) * 60);
    twistArcPts.push(new THREE.Vector3(Math.cos(a) * 36.8, Math.sin(a) * 36.8, 0));
  }
  const twistArc = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(twistArcPts),
    new THREE.LineBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.78,
      clippingPlanes,
    })
  );
  overlayGroup.add(twistArc);

  // -------------------------------------------------------------------------
  // 5. 4-Corner Dashed CAD Exploded-View Alignment Guides + Lock/Contact Guides
  // -------------------------------------------------------------------------
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x64748b,
    dashSize: 2.2,
    gapSize: 1.6,
    transparent: true,
    opacity: 0.42,
    clippingPlanes,
  });
  const accentGuideMat = new THREE.LineDashedMaterial({
    color: 0xeab308,
    dashSize: 1.8,
    gapSize: 1.4,
    transparent: true,
    opacity: 0.52,
    clippingPlanes,
  });
  const cornerCoords: Array<[number, number]> = [
    [-31.3, 27.0],
    [31.3, 27.0],
    [-31.3, -27.0],
    [31.3, -27.0],
  ];
  const guideLines: THREE.Line[] = [];
  for (const [cx, cy] of cornerCoords) {
    const l = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(cx, cy, 32),
        new THREE.Vector3(cx, cy, 18),
      ]),
      guideMat
    );
    l.computeLineDistances();
    explodeGuides.add(l);
    guideLines.push(l);
  }
  const contactGuide = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    accentGuideMat
  );
  explodeGuides.add(contactGuide);

  const samplePolyline = (pts: THREE.Vector3[], t: number, out: THREE.Vector3) => {
    const segs = pts.length - 1;
    const scaled = THREE.MathUtils.clamp(t, 0, 0.9999) * segs;
    const idx = Math.floor(scaled);
    out.lerpVectors(pts[idx], pts[idx + 1], scaled - idx);
  };

  const findPart = (parts: CadPart[], id: string) => parts.find((p) => p.id === id);

  return {
    overlayGroup,
    explodeGuides,
    setVisible: (visible: boolean) => {
      overlayGroup.visible = visible;
    },
    update: (elapsed: number, active: boolean, parts: CadPart[], integrated: boolean) => {
      if (!active || !overlayGroup.visible) return;

      const pFlange = findPart(parts, 'mount-flange-ring');
      const pBaffle = findPart(parts, 'mount-anti-refl-baffle');
      const pMask = findPart(parts, 'mount-rect-flare-mask');
      const pContacts = findPart(parts, 'mount-contact-pins');
      const pPcb = findPart(parts, 'mount-contact-pcb');
      const pRear = findPart(parts, 'mount-chassis-interface');
      if (!pFlange || !pBaffle || !pMask || !pContacts || !pPcb || !pRear) return;

      const zFlange = pFlange.group.position.z;
      const zBaffle = pBaffle.group.position.z;
      const zMask = pMask.group.position.z;
      const zSensor = integrated ? 0.0 : pRear.group.position.z - 16.0;

      // Show virtual full-frame 36x24mm sensor focal plane in standalone mount mode
      focalPlaneGroup.visible = !integrated;
      focalPlaneGroup.position.set(0, 0, zSensor);

      // Bayonet 60° twist indicator hovers crisply in front of stainless flange
      twistArc.position.z = zFlange + 3.2;
      twistArc.rotation.z = Math.sin(elapsed * 1.6) * 0.22;

      // Update F0.95 / F1.2 converging wide-diameter optical rays
      const zLensIn = zFlange + 22.0;
      optSpecs.forEach((spec, idx) => {
        const pts = optPaths[idx];
        pts[0].set(spec.rx * 1.08, spec.ry * 1.08, zLensIn);
        pts[1].set(spec.rx, spec.ry, zFlange);
        pts[2].set(spec.sx * 1.08, spec.sy * 1.08, zMask);
        pts[3].set(spec.sx, spec.sy, zSensor);
        optLines[idx].geometry.setFromPoints(pts);
      });

      // Update oblique stray-light flare rays extinguished at velvet baffle wall!
      straySpecs.forEach((s, idx) => {
        const pts = [
          new THREE.Vector3(s.startX, s.startY, zFlange + 18.0),
          new THREE.Vector3(s.hitX, s.hitY, zBaffle),
        ];
        strayLines[idx].geometry.setFromPoints(pts);
        strayLines[idx].computeLineDistances();
        strayDots[idx].position.copy(pts[1]);
      });

      // Update 12-pin high-speed SPI/IBIS/Power signal paths
      const cPos = pContacts.group.position;
      const pcbPos = pPcb.group.position;
      busPinIndices.forEach((pinIdx, idx) => {
        const a = THREE.MathUtils.lerp(
          THREE.MathUtils.degToRad(-123),
          THREE.MathUtils.degToRad(-57),
          pinIdx / 11
        );
        const px = Math.cos(a) * 25.0;
        const py = Math.sin(a) * 25.0;
        const pts = busPaths[idx];
        pts[0].set(cPos.x + px, cPos.y + py, cPos.z + 4.5);
        pts[1].set(cPos.x + px, cPos.y + py, cPos.z - 2.2);
        pts[2].set(pcbPos.x + px, pcbPos.y + py, pcbPos.z - 1.0);
        pts[3].set(pcbPos.x + (idx - 1.5) * 2.2, pcbPos.y - 32.4, pcbPos.z - 13.5);
        busLines[idx].geometry.setFromPoints(pts);
      });

      // Animate photon beads along optical rays
      for (const b of optBeads) {
        const t = (elapsed * b.speed + b.phase) % 1;
        samplePolyline(optPaths[b.pathIndex], t, b.mesh.position);
      }

      // Animate bidirectional high-speed SPI/Power data pulses along 12-pin contact harness!
      for (const b of busBeads) {
        const rawT = (elapsed * b.speed + b.phase) % 1;
        const t = b.pathIndex % 2 === 0 ? rawT : 1 - rawT;
        samplePolyline(busPaths[b.pathIndex], t, b.mesh.position);
      }
    },
    updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => {
      const show = visible && explodeFactor > 0.04;
      explodeGuides.visible = show;
      if (!show) return;

      const pFront = findPart(parts, 'mount-bolts-6x');
      const pRear = findPart(parts, 'mount-chassis-interface');
      const pContacts = findPart(parts, 'mount-contact-pins');
      const pPcb = findPart(parts, 'mount-contact-pcb');
      if (!pFront || !pRear || !pContacts || !pPcb) return;

      const zFront = pFront.group.position.z + 1.0;
      const zRear = pRear.group.position.z - 1.5;

      cornerCoords.forEach(([cx, cy], i) => {
        guideLines[i].geometry.setFromPoints([
          new THREE.Vector3(cx, cy, zFront),
          new THREE.Vector3(cx, cy, zRear),
        ]);
        guideLines[i].computeLineDistances();
      });

      contactGuide.geometry.setFromPoints([
        new THREE.Vector3(0, pContacts.group.position.y - 25.0, pContacts.group.position.z),
        new THREE.Vector3(0, pPcb.group.position.y - 25.0, pPcb.group.position.z),
      ]);
      contactGuide.computeLineDistances();
    },
  };
}
