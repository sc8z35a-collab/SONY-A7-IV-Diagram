import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface MicroPixelV2PhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface QuantumFlow {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D quantum-photonic & sub-nanometer electron-cascade physics overlay
 * for Pixel V2 Ultra-Microscopic Anatomy (P2-01 – P2-30).
 */
export function createMicroPixelV2PhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): MicroPixelV2PhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();
  explodeGuides.userData.__isExplodeGuides = true;

  // 4 Vertical Nanoscale Corner Explode Axis Guides + Radial Guides
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x94a3b8,
    dashSize: 1.6,
    gapSize: 1.2,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const cornerLines: THREE.Line[] = [];
  const corners: Array<[number, number]> = [
    [-12.8, -12.8],
    [12.8, -12.8],
    [-12.8, 12.8],
    [12.8, 12.8],
  ];
  for (const [cx, cz] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, -16, cz),
      new THREE.Vector3(cx, 16, cz),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 44);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  const flows: QuantumFlow[] = [];
  const packetGeo = new THREE.SphereGeometry(0.42, 10, 8);

  const registerFlow = (
    color: number,
    speed: number,
    packetCount: number,
    dashed: boolean,
    getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3]
  ) => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1, 0),
    ]);
    const mat = dashed
      ? new THREE.LineDashedMaterial({
          color,
          dashSize: 1.1,
          gapSize: 0.85,
          transparent: true,
          opacity: 0.88,
          clippingPlanes,
        })
      : new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.86,
          clippingPlanes,
        });
    const line = new THREE.Line(geo, mat);
    overlayGroup.add(line);

    const pMat = new THREE.MeshBasicMaterial({ color, clippingPlanes });
    const packets: THREE.Mesh[] = [];
    for (let i = 0; i < packetCount; i++) {
      const m = new THREE.Mesh(packetGeo, pMat);
      overlayGroup.add(m);
      packets.push(m);
    }
    flows.push({ line, packets, speed, getEndpoints });
  };

  const _def = new THREE.Vector3();
  const _a = new THREE.Vector3();
  const _b = new THREE.Vector3();
  const _pair: [THREE.Vector3, THREE.Vector3] = [_a, _b];
  const _posMap: Record<string, THREE.Vector3> = {};

  const pt = (out: THREE.Vector3, map: Record<string, THREE.Vector3>, id: string, dx = 0, dy = 0, dz = 0) => {
    const p = map[id] ?? _def;
    return out.set(p.x + dx, p.y + dy, p.z + dz);
  };

  // 1. Incident Photons (RGB + SWIR) -> Brochosome AR -> Metasurface TiO2 Pillars
  registerFlow(0xf59e0b, 1.15, 3, false, (m) => {
    pt(_a, m, 'pv2-brochosome-ar', 2.2, 7.5, 2.2);
    pt(_b, m, 'pv2-meta-phase-pillars', 1.2, 0.6, 1.2);
    return _pair;
  });
  registerFlow(0x0ea5e9, 1.2, 3, false, (m) => {
    pt(_a, m, 'pv2-meta-phase-pillars', 1.2, 0.2, 1.2);
    pt(_b, m, 'pv2-si-diamond-lattice', 3.1, 0.4, 3.1);
    return _pair;
  });
  // 2. Photoelectron drift slide: Si Crystal Lattice -> Potential Well -> TG Halo Pocket -> FD Island
  registerFlow(0x2563eb, 1.35, 3, false, (m) => {
    pt(_a, m, 'pv2-si-diamond-lattice', 3.1, -0.4, 3.1);
    pt(_b, m, 'pv2-tg-halo-pocket', -2.5, -0.6, 0);
    return _pair;
  });
  registerFlow(0x38bdf8, 1.3, 2, false, (m) => {
    pt(_a, m, 'pv2-tg-halo-pocket', -1.0, -0.6, 0);
    pt(_b, m, 'pv2-fd-airgap-isolation', 0, 0.2, 0);
    return _pair;
  });
  // 3. Bright Highlight Overflow -> 3D Cylindrical LOFIC Trench Capacitor
  registerFlow(0x8b5cf6, 0.95, 2, true, (m) => {
    pt(_a, m, 'pv2-tg-halo-pocket', -3.6, -1.0, -1.5);
    pt(_b, m, 'pv2-lofic-3d-pillar-cap', 0, 1.4, 0);
    return _pair;
  });
  // 4. Sub-Micron 300nm Cu-Cu Hybrid Bond vertical plunge -> On-Sensor AI Remosaic & CIP MAC
  registerFlow(0xd97706, 1.4, 3, false, (m) => {
    pt(_a, m, 'pv2-fd-airgap-isolation', 0, -0.8, 0);
    pt(_b, m, 'pv2-hbond-protruding-cu', 2.8, 0.8, 2.8);
    return _pair;
  });
  registerFlow(0x6366f1, 1.25, 2, false, (m) => {
    pt(_a, m, 'pv2-hbond-protruding-cu', -2.8, -0.4, -2.8);
    pt(_b, m, 'pv2-on-sensor-ai-remosaic', 0, 0.8, 0);
    return _pair;
  });
  registerFlow(0x14b8a6, 1.25, 2, false, (m) => {
    pt(_a, m, 'pv2-hbond-protruding-cu', 2.8, -0.4, -2.8);
    pt(_b, m, 'pv2-compute-in-pixel-mac', 0, 0.8, 0);
    return _pair;
  });
  // 5. Fine12bit ADC -> HF-HDR Fusion & Quad-Pixel PUF Authenticity
  registerFlow(0xec4899, 1.1, 2, false, (m) => {
    pt(_a, m, 'pv2-fine12bit-dual-ramp', 0, -0.5, 0);
    pt(_b, m, 'pv2-hf-hdr-fusion-engine', 0, 0.7, 0);
    return _pair;
  });

  overlayGroup.visible = false;

  return {
    overlayGroup,
    explodeGuides,
    setVisible: (visible: boolean) => {
      overlayGroup.visible = visible;
    },
    updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => {
      const show = visible && explodeFactor > 0.04;
      explodeGuides.visible = show;
      if (!show) return;
      guideMat.opacity = 0.34 * THREE.MathUtils.smoothstep(explodeFactor, 0.04, 0.35);
      const yMin = -15.5 - explodeFactor * 56.0;
      const yMax = 15.5 + explodeFactor * 52.0;
      for (let i = 0; i < cornerLines.length; i++) {
        const [cx, cz] = corners[i];
        updateLine2PtsInPlace(cornerLines[i], cx, yMin, cz, cx, yMax, cz, true);
      }
      radialGuides.update(explodeFactor, visible, parts);
    },
    update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => {
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.group.position.copy(p.assembledPos).addScaledVector(p.explodeOffset, explodeFactor);
        _posMap[p.id] = p.group.position;
      }
      if (!physicsActive) return;

      for (let fi = 0; fi < flows.length; fi++) {
        const f = flows[fi];
        const [a, b] = f.getEndpoints(_posMap);
        updateLine2PtsInPlace(
          f.line,
          a.x,
          a.y,
          a.z,
          b.x,
          b.y,
          b.z,
          f.line.material instanceof THREE.LineDashedMaterial
        );
        const n = f.packets.length;
        for (let pi = 0; pi < n; pi++) {
          const t = (elapsed * f.speed + pi / n) % 1;
          f.packets[pi].position.lerpVectors(a, b, t);
        }
      }
    },
  };
}
