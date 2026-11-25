import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface BionzV2PhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface NanoFlow {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D ballistic nanosheet electron transport, upward TSMC A16 Super Power Rail
 * backside current delivery, 14.4 Gb/s LPDDR6 & electro-optical CPO laser pulse overlay
 * for BIONZ XR / XR2 V2 Ultra-Microscopic Anatomy (X2-01 – X2-30).
 */
export function createBionzV2PhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): BionzV2PhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();
  explodeGuides.userData.__isExplodeGuides = true;

  const guideMat = new THREE.LineDashedMaterial({
    color: 0x94a3b8,
    dashSize: 1.8,
    gapSize: 1.4,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const cornerLines: THREE.Line[] = [];
  const corners: Array<[number, number]> = [
    [-15.6, -15.6],
    [15.6, -15.6],
    [-15.6, 15.6],
    [15.6, 15.6],
  ];
  for (const [cx, cz] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, -14, cz),
      new THREE.Vector3(cx, 16, cz),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 48);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  const flows: NanoFlow[] = [];
  const packetGeo = new THREE.SphereGeometry(0.45, 10, 8);

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
          dashSize: 1.2,
          gapSize: 0.9,
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

  // 1. Ballistic Electron Waves racing across ALL 4 Stacked GAA Nanosheets (Source -X -> Drain +X)!
  registerFlow(0x0ea5e9, 1.65, 3, false, (m) => {
    pt(_a, m, 'xv2-gaa-si-nanosheets', -8.0, 2.1, 3.2);
    pt(_b, m, 'xv2-gaa-si-nanosheets', 8.0, 2.1, 3.2);
    return _pair;
  });
  registerFlow(0x38bdf8, 1.65, 3, false, (m) => {
    pt(_a, m, 'xv2-gaa-si-nanosheets', -8.0, -0.7, 3.2);
    pt(_b, m, 'xv2-gaa-si-nanosheets', 8.0, -0.7, 3.2);
    return _pair;
  });
  // 2. TSMC A16 Super Power Rail: Upward Zero-Congestion Backside Power Delivery (Backside Grid -> VB -> S/D)!
  registerFlow(0xf59e0b, 1.35, 3, false, (m) => {
    pt(_a, m, 'xv2-backside-pdn-grid', -7.1, 0, 1.5);
    pt(_b, m, 'xv2-sd-epi-strain', -7.1, -2.0, 1.5);
    return _pair;
  });
  registerFlow(0xd97706, 1.35, 3, false, (m) => {
    pt(_a, m, 'xv2-backside-pdn-grid', 7.1, 0, 1.5);
    pt(_b, m, 'xv2-sd-epi-strain', 7.1, -2.0, 1.5);
    return _pair;
  });
  // 3. 1c LPDDR6 14.4 Gb/s PHY -> Coherent Unified Memory NoC -> AI NPU Systolic MAC!
  registerFlow(0x2563eb, 1.5, 3, false, (m) => {
    pt(_a, m, 'xv2-lpddr6-1c-phy', 0, -0.5, 0);
    pt(_b, m, 'xv2-xbit-sram-cell', 0, 0.8, 0);
    return _pair;
  });
  registerFlow(0x8b5cf6, 1.45, 3, false, (m) => {
    pt(_a, m, 'xv2-xbit-sram-cell', 3.0, 0.5, 0);
    pt(_b, m, 'xv2-npu-systolic-mac', -3.0, 0.8, 0);
    return _pair;
  });
  // 4. ISSCC 2026 Silicon Photonics Electro-Optical Laser Pulse -> CoWoS-L Active LSI!
  registerFlow(0xec4899, 1.8, 3, false, (m) => {
    pt(_a, m, 'xv2-electro-optical-cpo', -5.5, 0.7, 0);
    pt(_b, m, 'xv2-cowos-l-active-lsi', -6.0, 0.7, 0);
    return _pair;
  });
  // 5. Thermal Phonon Escape Streamlines (GAA Hotspots -> Thermal Dummy Vias -> CVD Diamond Spreader!)
  registerFlow(0xef4444, 0.85, 3, true, (m) => {
    pt(_a, m, 'xv2-gaa-si-nanosheets', 0, -2.2, 0);
    pt(_b, m, 'xv2-selfheating-phonon-via', 0, 0.8, 0);
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
      const yMin = -14.0 - explodeFactor * 56.0;
      const yMax = 16.0 + explodeFactor * 56.0;
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
