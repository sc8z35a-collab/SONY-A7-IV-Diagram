import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface MiShoePhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface MiFlow {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D Multi Interface Shoe signal, digital audio (I2S/TDM), 1.6A UNREG power,
 * ID resistor polling, and ISO-518 X-Sync / TTL flash physics overlay (MI01–MI32).
 */
export function createMiShoePhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): MiShoePhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();

  // 4 Vertical Corner Explode Axis Guides + Radial Guides
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x94a3b8,
    dashSize: 2.0,
    gapSize: 1.5,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const cornerLines: THREE.Line[] = [];
  const corners: Array<[number, number]> = [
    [-22.0, -18.0],
    [22.0, -18.0],
    [-22.0, 18.0],
    [22.0, 18.0],
  ];
  for (const [cx, cz] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, -12, cz),
      new THREE.Vector3(cx, 12, cz),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 40);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  const flows: MiFlow[] = [];
  const packetGeo = new THREE.SphereGeometry(0.58, 10, 8);

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
          dashSize: 1.4,
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

  // 1. Cyan Digital Audio 4-ch I2S/TDM (Pins 8–12 -> MIS-2006 -> Audio Mux -> ZIF)
  registerFlow(0x06b6d4, 1.3, 3, false, (m) => {
    pt(_a, m, 'mi-pins-8to12-digital-audio', -2.0, 0, 0);
    pt(_b, m, 'mi-audio-mux-emi-choke', 0, 1.0, 0);
    return _pair;
  });
  registerFlow(0x0891b2, 1.2, 2, false, (m) => {
    pt(_a, m, 'mi-audio-mux-emi-choke', 0, 0.8, 0);
    pt(_b, m, 'mi-mainboard-zif-connector', 3.0, 1.5, 0);
    return _pair;
  });

  // 2. Amber High-Current UNREG 6.1–8.4V 1.6A Power (ZIF -> eFuse/TVS -> Pin 17)
  registerFlow(0xf59e0b, 1.15, 3, false, (m) => {
    pt(_a, m, 'mi-mainboard-zif-connector', -3.0, 1.5, 0);
    pt(_b, m, 'mi-esd-tvs-protection', 0, 1.0, 0);
    return _pair;
  });
  registerFlow(0xea580c, 1.25, 3, false, (m) => {
    pt(_a, m, 'mi-esd-tvs-protection', 0, 1.2, 0);
    pt(_b, m, 'mi-pin-17-unreg-power', 10.0, 0, 0);
    return _pair;
  });

  // 3. Sky-Blue 3.15V LOGIC_VDD Supply (ZIF -> Pin 13)
  registerFlow(0x3b82f6, 1.0, 2, true, (m) => {
    pt(_a, m, 'mi-mainboard-zif-connector', 0, 1.5, 0);
    pt(_b, m, 'mi-pin-13-logic-vdd', 3.5, 0, 0);
    return _pair;
  });

  // 4. Emerald ID1–ID3 6-Level Ratiometric Polling (ID ADC Net -> Pins 1–3)
  registerFlow(0x10b981, 0.95, 2, true, (m) => {
    pt(_a, m, 'mi-id-resistor-adc-net', 0, 1.0, 0);
    pt(_b, m, 'mi-pins-1to3-id', -15.5, 0, 0);
    return _pair;
  });

  // 5. Gold Central ISO-518 X-Sync High-Voltage Trigger (IGBT -> Center Dome Pin 22)
  registerFlow(0xeab308, 1.45, 3, false, (m) => {
    pt(_a, m, 'mi-xsync-igbt-isolator', 0, 1.2, 0);
    pt(_b, m, 'mi-center-xsync-contact', 0, 0.5, 0);
    return _pair;
  });

  // 6. Crimson TTL/ADI/HSS Bidirectional Flash Bus (ZIF <-> Pins 18–20)
  registerFlow(0xef4444, 1.35, 3, true, (m) => {
    pt(_a, m, 'mi-mainboard-zif-connector', 5.0, 1.5, 0);
    pt(_b, m, 'mi-pins-18to20-ttl-flash', 13.5, 0, 0);
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
      const show = visible && explodeFactor > 0.02;
      explodeGuides.visible = show;
      if (!show) return;
      guideMat.opacity = Math.min(0.42, explodeFactor * 0.55);
      const yTop = 8 + explodeFactor * 20;
      const yBot = -10 - explodeFactor * 26;
      for (let i = 0; i < corners.length; i++) {
        const [cx, cz] = corners[i];
        updateLine2PtsInPlace(cornerLines[i], cx, yBot, cz, cx, yTop, cz, true);
      }
      radialGuides.update(explodeFactor, visible, parts);
    },
    update: (elapsed: number, _explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => {
      overlayGroup.visible = physicsActive;
      if (!physicsActive) return;

      for (const p of parts) {
        _posMap[p.id] = p.group.position;
      }

      for (let fi = 0; fi < flows.length; fi++) {
        const flow = flows[fi];
        const [a, b] = flow.getEndpoints(_posMap);
        updateLine2PtsInPlace(
          flow.line,
          a.x,
          a.y,
          a.z,
          b.x,
          b.y,
          b.z,
          flow.line.material instanceof THREE.LineDashedMaterial
        );
        const count = flow.packets.length;
        for (let i = 0; i < count; i++) {
          const t = ((elapsed * flow.speed + i / count + fi * 0.17) % 1 + 1) % 1;
          flow.packets[i].position.lerpVectors(a, b, t);
          const pulse = 0.8 + 0.35 * Math.sin(elapsed * 7.5 + i * 2.1 + fi);
          flow.packets[i].scale.setScalar(pulse);
        }
      }
    },
  };
}
