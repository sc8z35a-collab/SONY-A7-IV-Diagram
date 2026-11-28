//@FLOW_MAP|file=src/assemblies/battery/batteryPhysicsOverlay.ts|unit=battery|lines=153|exports=BatteryPhysicsOverlayController,createBatteryPhysicsOverlay
import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides } from '../../engine/CadHelpers';

export interface BatteryPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  update: (elapsed: number, active: boolean, parts: CadPart[]) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
}

/**
 * Animated Li+ Ion / Electron Power-Flow, 2026 Online EIS Diagnostic, Active 2S Balancing,
 * Embedded FBG Optical Fiber Laser & Ultrasonic Phased-Array CT Overlay
 * + 6-Way Dashed Explode Guides for the Standalone 130-Part Battery Pack Ultra-Dissection (P01–P130).
 */
export function createBatteryPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): BatteryPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  overlayGroup.visible = false;

  const explodeGuides = new THREE.Group();
  explodeGuides.visible = false;

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 145);
  explodeGuides.add(radialGuides.group);

  // Power, Ion, EIS, Active-Balance, 2026 FBG Optical Fiber & Ultrasonic CT paths
  const routeDefs: Array<{ pts: THREE.Vector3[]; color: number }> = [
    {
      pts: [
        new THREE.Vector3(-9.5, 16, 0),
        new THREE.Vector3(-9.5, -22, 0),
        new THREE.Vector3(9.5, -22, 0),
        new THREE.Vector3(9.5, 18, 0),
      ],
      color: 0x06b6d4, // Li+ ionic internal series loop (cyan)
    },
    {
      pts: [
        new THREE.Vector3(9.5, 18.5, 0),
        new THREE.Vector3(4.5, 21.2, 1.5),
        new THREE.Vector3(0, 24.0, 0),
      ],
      color: 0xf59e0b, // High-current discharge bus to 4-pin terminal (amber)
    },
    {
      pts: [
        new THREE.Vector3(-9.5, 18.5, 0),
        new THREE.Vector3(-9.0, 21.2, -2.0),
        new THREE.Vector3(-4.5, 21.5, 1.8),
        new THREE.Vector3(2.5, 24.0, 0),
      ],
      color: 0x8b5cf6, // InfoLITHIUM S-Data telemetry & EU Battery Passport path (violet)
    },
    {
      pts: [
        new THREE.Vector3(-4.2, 21.6, 0.2),
        new THREE.Vector3(0.0, 14.0, 5.2),
        new THREE.Vector3(9.5, 2.0, 5.5),
        new THREE.Vector3(9.5, -14.0, 4.2),
      ],
      color: 0x10b981, // 2026 Online EIS AC impedance spectroscopy diagnostic probe wave (emerald)
    },
    {
      pts: [
        new THREE.Vector3(-9.5, 17.5, -3.5),
        new THREE.Vector3(0.0, 21.5, -3.2),
        new THREE.Vector3(4.4, 21.5, -2.8),
        new THREE.Vector3(9.5, 17.5, -3.5),
      ],
      color: 0xec4899, // Lossless switched-capacitor active 2S balancing shuttle (magenta)
    },
    {
      pts: [
        new THREE.Vector3(-9.2, 16.5, 2.8),
        new THREE.Vector3(-9.2, 4.0, 3.6),
        new THREE.Vector3(-9.2, -12.0, 2.8),
        new THREE.Vector3(0.0, -17.5, 2.2),
      ],
      color: 0x38bdf8, // 2026 Embedded 0.125 mm FBG 1550 nm optical fiber internal thermal laser pulse (sky)
    },
    {
      pts: [
        new THREE.Vector3(-12.0, 6.0, 4.5),
        new THREE.Vector3(-3.0, 2.0, 5.4),
        new THREE.Vector3(6.0, -2.0, 5.4),
        new THREE.Vector3(12.0, -6.0, 4.5),
      ],
      color: 0x22c55e, // 2026 Ultrasonic phased-array Battery CT gas & SOH acoustic scan sweep (lime)
    },
  ];

  const curves = routeDefs.map((r) => new THREE.CatmullRomCurve3(r.pts));
  const pulses: Array<{ mesh: THREE.Mesh; curveIdx: number; phase: number; speed: number }> = [];
  const sphereGeo = new THREE.SphereGeometry(0.85, 10, 8);

  curves.forEach((curve, idx) => {
    const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(36));
    const lineMat = new THREE.LineBasicMaterial({
      color: routeDefs[idx].color,
      transparent: true,
      opacity: 0.45,
      clippingPlanes,
    });
    overlayGroup.add(new THREE.Line(lineGeo, lineMat));

    for (let k = 0; k < 3; k++) {
      const m = new THREE.Mesh(
        sphereGeo,
        new THREE.MeshBasicMaterial({
          color: routeDefs[idx].color,
          transparent: true,
          opacity: 0.94,
          clippingPlanes,
        })
      );
      overlayGroup.add(m);
      pulses.push({
        mesh: m,
        curveIdx: idx,
        phase: k / 3 + idx * 0.13,
        speed: 0.45,
      });
    }
  });

  const tmpPos = new THREE.Vector3();

  return {
    overlayGroup,
    explodeGuides,
    setVisible: (visible: boolean) => {
      overlayGroup.visible = visible;
    },
    update: (elapsed, active) => {
      if (!active || !overlayGroup.visible) return;
      for (const p of pulses) {
        const t = (elapsed * p.speed + p.phase) % 1;
        curves[p.curveIdx].getPoint(t, tmpPos);
        p.mesh.position.copy(tmpPos);
      }
    },
    updateGuides: (explodeFactor, visible, parts) => {
      explodeGuides.visible = visible && explodeFactor > 0.03;
      if (!explodeGuides.visible) return;
      radialGuides.update(explodeFactor, visible, parts);
    },
  };
}
