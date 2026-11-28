//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabPhysicsOverlay.ts|unit=sensorFab|lines=242|exports=SensorFabPhysicsOverlayController,createSensorFabPhysicsOverlay
import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface SensorFabPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface ProcessStream {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D semiconductor wafer-fab & camera-factory process-flow physics overlay
 * for Sensor Manufacturing Process Vol.0 (`F0-01` – `F0-32`):
 * - Dual-track parallel Pixel Wafer (P1->P3->P4->P6) & Logic Wafer (P1->P5->P6) merge
 * - Photomask 96-reticle feed beams (P2 -> P3/P4/P5)
 * - Downstream optical/packaging/IBIS/camera pipeline (P6->P7->P8->P9->P10->P11->P12)
 * - Closed-loop 12-step Lithography Unit Loop (L-01->L-02->...->L-12->L-01) + ADI L-08->L-01 rework gate!
 */
export function createSensorFabPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): SensorFabPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();
  explodeGuides.userData.__isExplodeGuides = true;

  // 4 Vertical Cleanroom Architectural Explode Guides + Radial CAD Trajectories
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x94a3b8,
    dashSize: 2.2,
    gapSize: 1.5,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const cornerLines: THREE.Line[] = [];
  const corners: Array<[number, number]> = [
    [-49.5, -24.5],
    [49.5, -24.5],
    [-49.5, 18.0],
    [49.5, 18.0],
  ];
  for (const [cx, cz] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, -18, cz),
      new THREE.Vector3(cx, 22, cz),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 48);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  const streams: ProcessStream[] = [];
  const packetGeo = new THREE.SphereGeometry(0.56, 10, 8);

  const registerStream = (
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
          dashSize: 1.5,
          gapSize: 1.1,
          transparent: true,
          opacity: 0.88,
          clippingPlanes,
        })
      : new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.88,
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
    streams.push({ line, packets, speed, getEndpoints });
  };

  const _def = new THREE.Vector3();
  const _a = new THREE.Vector3();
  const _b = new THREE.Vector3();
  const _pair: [THREE.Vector3, THREE.Vector3] = [_a, _b];
  const _posMap: Record<string, THREE.Vector3> = {};

  const pt = (out: THREE.Vector3, map: Record<string, THREE.Vector3>, id: string, dy = 2.6) => {
    const p = map[id] ?? _def;
    return out.set(p.x, p.y + dy, p.z);
  };

  const linkIds = (
    fromId: string,
    toId: string,
    color: number,
    speed: number,
    packets = 2,
    dashed = false,
    dyFrom = 2.6,
    dyTo = 2.6
  ) => {
    registerStream(color, speed, packets, dashed, (m) => {
      pt(_a, m, fromId, dyFrom);
      pt(_b, m, toId, dyTo);
      return _pair;
    });
  };

  // 1. Pixel Wafer Track (Cyan): P1 -> P3 -> P4 -> P6
  linkIds('fab0-p01-raw-wafer', 'fab0-p03-pixel-feol', 0x0ea5e9, 0.85, 2);
  linkIds('fab0-p03-pixel-feol', 'fab0-p04-pixel-beol', 0x0ea5e9, 0.85, 2);
  linkIds('fab0-p04-pixel-beol', 'fab0-p06-cucu-bond-bsi', 0x0ea5e9, 0.85, 2);

  // 2. Parallel Logic Wafer Track (Royal Blue — 720 steps!): P1 -> P5 -> P6
  linkIds('fab0-p01-raw-wafer', 'fab0-p05-logic-wafer', 0x2563eb, 0.72, 3);
  linkIds('fab0-p05-logic-wafer', 'fab0-p06-cucu-bond-bsi', 0x2563eb, 0.72, 3);

  // 3. Photomask 96-Reticle Feed (Violet Dashed): P2 -> P3 / P4 / P5
  linkIds('fab0-p02-design-photomask', 'fab0-p03-pixel-feol', 0x7c3aed, 0.95, 2, true, 2.2, 3.0);
  linkIds('fab0-p02-design-photomask', 'fab0-p04-pixel-beol', 0x7c3aed, 0.95, 2, true, 2.2, 3.0);
  linkIds('fab0-p02-design-photomask', 'fab0-p05-logic-wafer', 0x7c3aed, 0.8, 2, true, 2.2, 3.6);

  // 4. Merged Downstream Pipeline (Amber-Gold -> Crimson): P6 -> P7 -> P8 -> P9 -> P10 -> P11 -> P12
  linkIds('fab0-p06-cucu-bond-bsi', 'fab0-p07-cfa-microlens', 0xea580c, 0.92, 2);
  linkIds('fab0-p07-cfa-microlens', 'fab0-p08-wafer-cp-test', 0x16a34a, 0.92, 2);
  linkIds('fab0-p08-wafer-cp-test', 'fab0-p09-dicing-package', 0xf59e0b, 0.92, 2);
  linkIds('fab0-p09-dicing-package', 'fab0-p10-final-test-ft', 0x06b6d4, 0.92, 2);
  linkIds('fab0-p10-final-test-ft', 'fab0-p11-sensor-unit-ibis', 0xc2410c, 0.88, 2);
  linkIds('fab0-p11-sensor-unit-ibis', 'fab0-p12-camera-integration', 0xdc2626, 0.88, 2);

  // 5. Ascension Links to Hero Postage-Stamp City Crown (F0-01)
  linkIds('fab0-p06-cucu-bond-bsi', 'fab0-hero-city-sensor', 0x0284c7, 0.65, 2, true, 6.2, -1.6);
  linkIds('fab0-var-full-2stack', 'fab0-hero-city-sensor', 0xd97706, 0.58, 2, true, 4.5, -1.2);

  // 6. Closed-Loop 12-Step Lithography Unit Loop (L-01 -> L-02 -> ... -> L-12 -> L-01)
  const lithoIds = [
    'fab0-l01-preclean',
    'fab0-l02-hmds-barc',
    'fab0-l03-resist-coat',
    'fab0-l04-softbake-pab',
    'fab0-l05-exposure-align',
    'fab0-l06-peb',
    'fab0-l07-develop',
    'fab0-l08-adi-metrology',
    'fab0-l09-etch-implant',
    'fab0-l10-ashing-strip',
    'fab0-l11-postclean',
    'fab0-l12-aei-defect',
  ];
  for (let i = 0; i < lithoIds.length; i++) {
    const aId = lithoIds[i];
    const bId = lithoIds[(i + 1) % lithoIds.length];
    const col = i < 4 ? 0x0ea5e9 : i < 8 ? 0x6366f1 : 0xa855f7;
    linkIds(aId, bId, col, 1.15, 1, false, 1.8, 1.8);
  }

  // 7. Special ADI Rework Return Loop (L-08 -> L-01 dashed amber — Last Checkpoint Before Etching!)
  linkIds('fab0-l08-adi-metrology', 'fab0-l01-preclean', 0xf59e0b, 0.48, 3, true, 3.2, 3.2);

  // 8. Vertical Conduits Connecting the 96-Cycle Lithography Loop upward into P3 / P5 / P6
  linkIds('fab0-l05-exposure-align', 'fab0-p05-logic-wafer', 0x6366f1, 0.72, 2, true, 7.2, 0.4);
  linkIds('fab0-l09-etch-implant', 'fab0-p06-cucu-bond-bsi', 0xa855f7, 0.72, 2, true, 4.4, 0.4);

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
      guideMat.opacity = 0.32 * THREE.MathUtils.smoothstep(explodeFactor, 0.04, 0.35);
      const yMin = -18.0 - explodeFactor * 28.0;
      const yMax = 22.0 + explodeFactor * 40.0;
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

      for (let si = 0; si < streams.length; si++) {
        const s = streams[si];
        const [a, b] = s.getEndpoints(_posMap);
        updateLine2PtsInPlace(
          s.line,
          a.x,
          a.y,
          a.z,
          b.x,
          b.y,
          b.z,
          s.line.material instanceof THREE.LineDashedMaterial
        );
        const n = s.packets.length;
        for (let pi = 0; pi < n; pi++) {
          const t = (elapsed * s.speed + pi / n) % 1;
          s.packets[pi].position.lerpVectors(a, b, t);
        }
      }
    },
  };
}
