import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides } from '../../engine/CadHelpers';

export interface CfexpressPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  update: (elapsed: number, active: boolean, parts: CadPart[]) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
}

/**
 * Animated PCIe Gen4 NVMe High-Speed Data Flow + Thermal Diffusion Waves + 6-Way Dashed Explode Guides
 * for the Standalone CFexpress 4.0 Card Ultra-Dissection (C01–C60).
 */
export function createCfexpressPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): CfexpressPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  overlayGroup.visible = false;

  const explodeGuides = new THREE.Group();
  explodeGuides.visible = false;

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 72);
  explodeGuides.add(radialGuides.group);

  // High-speed data & thermal paths:
  // 1) 21-pin Gold Edge Connector -> AC-Coupling -> 7nm PCIe 4.0 SoC -> Primary 3D NAND (cyan)
  // 2) PCIe SoC -> LPDDR4 DRAM Cache -> Rear Interleaved 3D NAND (violet)
  // 3) Controller SoC Heat -> Copper Heat Spreader -> Metal Armor Shell (amber)
  const routeDefs: Array<{ pts: THREE.Vector3[]; color: number }> = [
    {
      pts: [
        new THREE.Vector3(-4, -26, 0.8),
        new THREE.Vector3(-4, -18, 0.8),
        new THREE.Vector3(-6, -9, 1.1),
        new THREE.Vector3(-4, 12, 1.2),
      ],
      color: 0x06b6d4, // PCIe Gen4 16 GT/s write data highway
    },
    {
      pts: [
        new THREE.Vector3(-6, -9, 1.1),
        new THREE.Vector3(9.4, -8.5, 1.1),
        new THREE.Vector3(6, 12, -1.1),
      ],
      color: 0x8b5cf6, // LPDDR4 FTL cache & dual-channel NAND interleave
    },
    {
      pts: [
        new THREE.Vector3(-6, -9, 1.2),
        new THREE.Vector3(-2, 0, 2.0),
        new THREE.Vector3(0, 14, 2.7),
      ],
      color: 0xf97316, // Copper heat spreader thermal dissipation
    },
  ];

  const curves = routeDefs.map((r) => new THREE.CatmullRomCurve3(r.pts));
  const pulses: Array<{ mesh: THREE.Mesh; curveIdx: number; phase: number; speed: number }> = [];
  const sphereGeo = new THREE.SphereGeometry(0.8, 10, 8);

  curves.forEach((curve, idx) => {
    const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(36));
    const lineMat = new THREE.LineBasicMaterial({
      color: routeDefs[idx].color,
      transparent: true,
      opacity: 0.48,
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
        phase: k / 3 + idx * 0.17,
        speed: 0.56,
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
