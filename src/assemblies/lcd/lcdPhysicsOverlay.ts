import * as THREE from 'three';
import { CadPart } from '../types';
import { LCD_CENTER_X, LCD_CENTER_Y, LCD_HEIGHT, LCD_WIDTH } from './lcdParts';
import { createRadialTrajectoryGuides } from '../../engine/CadHelpers';

export interface LcdPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  update: (elapsed: number, active: boolean, parts: CadPart[], integrated: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
}

/**
 * Real-time 3D Display Optics & 4-Axis Kinematics Overlay for the Rear LCD Monitor:
 * 1. Polarized backlight emission rays streaming from Edge LED -> BEF prism collimation -> IPS Cell -> OCA Cover Glass.
 * 2. 4-Axis Articulation Motion Arcs showing both Optical-Axis Tilt (cyan) and +X Vari-Angle Swivel (amber).
 * 3. 4-Corner Dashed CAD Exploded Alignment Guides.
 */
export function createLcdPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): LcdPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  overlayGroup.visible = false;

  const explodeGuides = new THREE.Group();
  explodeGuides.visible = false;

  // -------------------------------------------------------------------------
  // 1. Backlight Collimation Light Rays (5 emission streams from LGP -> Eye)
  // -------------------------------------------------------------------------
  const rayOffsets: Array<[number, number, number]> = [
    [-22, 11, 0x0284c7],
    [0, 12, 0x10b981],
    [22, 11, 0x0ea5e9],
    [-16, -11, 0x6366f1],
    [16, -11, 0xf59e0b],
  ];

  const rayLines: THREE.Line[] = [];
  const photonBeads: Array<{ mesh: THREE.Mesh; idx: number; phase: number }> = [];
  const beadGeo = new THREE.SphereGeometry(0.85, 10, 10);

  for (let i = 0; i < rayOffsets.length; i++) {
    const [, , col] = rayOffsets[i];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
      new THREE.LineBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.78,
        clippingPlanes,
      })
    );
    overlayGroup.add(line);
    rayLines.push(line);

    const bead = new THREE.Mesh(
      beadGeo,
      new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.92,
        clippingPlanes,
      })
    );
    overlayGroup.add(bead);
    photonBeads.push({ mesh: bead, idx: i, phase: i * 0.21 });
  }

  // -------------------------------------------------------------------------
  // 2. 4-Axis Articulation Arc Indicators (Optical-Axis Tilt + Side Vari-Angle)
  // -------------------------------------------------------------------------
  // Tilt arc along bottom-right edge (in Y-Z plane)
  const tiltArcPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * THREE.MathUtils.degToRad(75);
    tiltArcPts.push(
      new THREE.Vector3(
        LCD_CENTER_X - LCD_WIDTH * 0.52,
        LCD_CENTER_Y + 20 - Math.cos(a) * 44,
        -32 - Math.sin(a) * 44
      )
    );
  }
  const tiltArc = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(tiltArcPts),
    new THREE.LineDashedMaterial({
      color: 0x0284c7,
      dashSize: 2.2,
      gapSize: 1.4,
      transparent: true,
      opacity: 0.78,
      clippingPlanes,
    })
  );
  tiltArc.computeLineDistances();
  overlayGroup.add(tiltArc);

  // Side-opening vari-angle swivel arc around +X hinge (in X-Z plane)
  const swivelArcPts: THREE.Vector3[] = [];
  const hingeX = LCD_CENTER_X + LCD_WIDTH * 0.5 + 1.8;
  for (let i = 0; i <= 28; i++) {
    const a = (i / 28) * THREE.MathUtils.degToRad(135);
    swivelArcPts.push(
      new THREE.Vector3(
        hingeX - Math.cos(a) * 52,
        LCD_CENTER_Y + LCD_HEIGHT * 0.54,
        -31 - Math.sin(a) * 52
      )
    );
  }
  const swivelArc = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(swivelArcPts),
    new THREE.LineDashedMaterial({
      color: 0xf59e0b,
      dashSize: 2.2,
      gapSize: 1.4,
      transparent: true,
      opacity: 0.78,
      clippingPlanes,
    })
  );
  swivelArc.computeLineDistances();
  overlayGroup.add(swivelArc);

  // -------------------------------------------------------------------------
  // 3. 4-Corner Dashed Exploded Alignment Guides
  // -------------------------------------------------------------------------
  const guideLines: THREE.Line[] = [];
  const corners: Array<[number, number]> = [
    [LCD_CENTER_X - LCD_WIDTH * 0.45, LCD_CENTER_Y + LCD_HEIGHT * 0.44],
    [LCD_CENTER_X + LCD_WIDTH * 0.45, LCD_CENTER_Y + LCD_HEIGHT * 0.44],
    [LCD_CENTER_X - LCD_WIDTH * 0.45, LCD_CENTER_Y - LCD_HEIGHT * 0.44],
    [LCD_CENTER_X + LCD_WIDTH * 0.45, LCD_CENTER_Y - LCD_HEIGHT * 0.44],
  ];
  for (const [gx, gy] of corners) {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(gx, gy, -28),
        new THREE.Vector3(gx, gy, -36),
      ]),
      new THREE.LineDashedMaterial({
        color: 0x64748b,
        dashSize: 2.4,
        gapSize: 1.8,
        transparent: true,
        opacity: 0.48,
        clippingPlanes,
      })
    );
    line.computeLineDistances();
    explodeGuides.add(line);
    guideLines.push(line);
  }
  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 48);
  explodeGuides.add(radialGuides.group);

  return {
    overlayGroup,
    explodeGuides,
    setVisible: (visible: boolean) => {
      overlayGroup.visible = visible;
    },
    update: (elapsed, active, parts, _integrated) => {
      if (!active || !overlayGroup.visible) return;

      const pGlass = parts.find((p) => p.id === 'lcd-rear-bezel-glass');
      const pBl =
        parts.find((p) => p.id === 'lcd-lgp-led-bar') ??
        parts.find((p) => p.id === 'lcd-backlight-stack');
      const pCradle = parts.find((p) => p.id === 'lcd-4axis-tilt-frame');

      const zBl = pBl ? pBl.group.position.z : -32.45;
      const zGlass = pGlass ? pGlass.group.position.z : -35.8;
      const zEye = zGlass - 26.0;
      const zBase = pCradle ? pCradle.group.position.z : -28.8;

      tiltArc.position.z = zBase + 28.8;
      swivelArc.position.z = zBase + 28.8;

      for (let i = 0; i < rayOffsets.length; i++) {
        const [ox, oy] = rayOffsets[i];
        const p0 = new THREE.Vector3(LCD_CENTER_X + ox, LCD_CENTER_Y - LCD_HEIGHT * 0.44, zBl);
        const p1 = new THREE.Vector3(LCD_CENTER_X + ox, LCD_CENTER_Y + oy, zBl);
        const p2 = new THREE.Vector3(LCD_CENTER_X + ox, LCD_CENTER_Y + oy, zEye);
        rayLines[i].geometry.setFromPoints([p0, p1, p2]);

        const b = photonBeads[i];
        const t = (elapsed * 0.55 + b.phase) % 1;
        if (t < 0.38) {
          b.mesh.position.lerpVectors(p0, p1, t / 0.38);
        } else {
          b.mesh.position.lerpVectors(p1, p2, (t - 0.38) / 0.62);
        }
      }
    },
    updateGuides: (explodeFactor, visible, parts) => {
      const show = visible && explodeFactor > 0.04;
      explodeGuides.visible = show;
      if (!show) return;

      const pGlass = parts.find((p) => p.id === 'lcd-rear-bezel-glass');
      const pFront =
        parts.find((p) => p.id === 'lcd-bulkhead-b2b-pcb') ??
        parts.find((p) => p.id === 'lcd-4axis-tilt-frame');
      const zFront = pFront ? pFront.group.position.z + 2 : -27;
      const zRear = pGlass ? pGlass.group.position.z - 2 : -36;

      for (let i = 0; i < guideLines.length; i++) {
        const [gx, gy] = corners[i];
        guideLines[i].geometry.setFromPoints([
          new THREE.Vector3(gx, gy, zFront),
          new THREE.Vector3(gx, gy, zRear),
        ]);
        guideLines[i].computeLineDistances();
      }
      radialGuides.update(explodeFactor, visible, parts);
    },
  };
}
