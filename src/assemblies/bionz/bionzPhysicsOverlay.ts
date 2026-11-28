//@FLOW_MAP|file=src/assemblies/bionz/bionzPhysicsOverlay.ts|unit=bionz|lines=246|exports=BionzPhysicsOverlayController,createBionzPhysicsOverlay
import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface BionzPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface PackageFlow {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D high-speed silicon data-pipeline & vertical thermal-flux overlay
 * for the BIONZ XR / XR2 Package Internal Ultra-Dissection (XR01–XR36).
 */
export function createBionzPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): BionzPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();

  // 4 Vertical Corner Explode Axis Guides + Radial Guides
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
    [-15.2, -15.2],
    [15.2, -15.2],
    [-15.2, 15.2],
    [15.2, 15.2],
  ];
  for (const [cx, cz] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, -10, cz),
      new THREE.Vector3(cx, 14, cz),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 76);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  // High-speed internal bus & thermal pathways
  const flows: PackageFlow[] = [];
  const packetGeo = new THREE.SphereGeometry(0.48, 10, 8);

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
          opacity: 0.85,
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

  // 1. BGA Balls -> SLVS-EC RX PHY (Sensor RAW ingress)
  registerFlow(0x06b6d4, 1.0, 3, false, (m) => {
    pt(_a, m, 'xr-sac305-bga-balls', -8.0, 0, -8.0);
    pt(_b, m, 'xr-slvsec-rx-phy', 0, 0, 0);
    return _pair;
  });
  // 2. SLVS-EC RX -> RAW ISP -> NR/Detail -> Video Codec
  registerFlow(0x0284c7, 1.25, 2, false, (m) => {
    pt(_a, m, 'xr-slvsec-rx-phy');
    pt(_b, m, 'xr-raw-isp-frontend');
    return _pair;
  });
  registerFlow(0x14b8a6, 1.2, 2, false, (m) => {
    pt(_a, m, 'xr-raw-isp-frontend');
    pt(_b, m, 'xr-nr-detail-engine');
    return _pair;
  });
  // 3. RAW ISP -> Integrated AI NPU Systolic Array
  registerFlow(0x8b5cf6, 1.35, 3, false, (m) => {
    pt(_a, m, 'xr-raw-isp-frontend');
    pt(_b, m, 'xr-ai-npu-systolic');
    return _pair;
  });
  // 4. Vertical PoP Memory Link: DDR Controller <-> TMV Pillars <-> Quad LPDDR5X DRAM
  registerFlow(0x2563eb, 1.4, 3, false, (m) => {
    pt(_a, m, 'xr-ddr-mem-controller');
    pt(_b, m, 'xr-pop-dram-dies', 2.0, 0, 2.0);
    return _pair;
  });
  // 5. 2.5D Silicon Bridge Link: Main Die <-> Companion CXD90058 Cetus Chiplet
  registerFlow(0x7c3aed, 1.15, 2, false, (m) => {
    pt(_a, m, 'xr-sa-dsp-af-core');
    pt(_b, m, 'xr-secondary-cetus-chiplet');
    return _pair;
  });
  // 6. Video Codec -> CFexpress PCIe DMA -> BGA Output
  registerFlow(0xe11d48, 1.1, 3, false, (m) => {
    pt(_a, m, 'xr-video-codec-hevc');
    pt(_b, m, 'xr-pcie-cfx-dma');
    return _pair;
  });
  // 7. Vertical Thermal Heat-Flux Streamlines: Silicon Die -> Copper IHS -> Mg Chassis Pedestal
  registerFlow(0xef4444, 0.72, 3, true, (m) => {
    pt(_a, m, 'xr-die-bulk-silicon', -3.0, 0.4, -2.0);
    pt(_b, m, 'xr-nickel-cu-ihs', -3.0, 0.2, -2.0);
    return _pair;
  });
  registerFlow(0xf97316, 0.72, 3, true, (m) => {
    pt(_a, m, 'xr-die-bulk-silicon', 4.0, 0.4, 3.0);
    pt(_b, m, 'xr-nickel-cu-ihs', 4.0, 0.2, 3.0);
    return _pair;
  });
  registerFlow(0xdc2626, 0.68, 3, true, (m) => {
    pt(_a, m, 'xr-nickel-cu-ihs', 0, 0.5, 0);
    pt(_b, m, 'xr-mg-chassis-tim3-sink', 0, -0.4, 0);
    return _pair;
  });
  // 8. Companion SY-1122 High-Speed & Real-Time Servo Buses (XR53–XR70)
  registerFlow(0xa855f7, 1.2, 3, false, (m) => {
    pt(_a, m, 'xr-ai-npu-systolic', -4.0, -2.0, -4.0);
    pt(_b, m, 'xr-dedicated-ai-coproc', 0, 1.2, 0);
    return _pair;
  });
  registerFlow(0x10b981, 1.15, 2, false, (m) => {
    pt(_a, m, 'xr-usb-network-hub', 4.0, -2.0, -4.0);
    pt(_b, m, 'xr-wifi6e-bt-sip-module', 0, 1.4, 0);
    return _pair;
  });
  registerFlow(0x06b6d4, 1.3, 3, false, (m) => {
    pt(_a, m, 'xr-usb-network-hub', 4.0, -2.0, 0);
    pt(_b, m, 'xr-usbc-pd-10g-redriver', 0, 1.2, 0);
    return _pair;
  });
  registerFlow(0xec4899, 1.25, 3, false, (m) => {
    pt(_a, m, 'xr-pcie-cfx-dma', 4.0, -2.0, 4.0);
    pt(_b, m, 'xr-pcie-cfx-clock-mux', 0, 1.2, 0);
    return _pair;
  });
  registerFlow(0xeab308, 1.1, 2, false, (m) => {
    pt(_a, m, 'xr-epson-quartz-gyro-imu', 0, 1.2, 0);
    pt(_b, m, 'xr-ibis-servo-mcu', 0, 1.2, 0);
    return _pair;
  });
  registerFlow(0xf59e0b, 1.1, 2, false, (m) => {
    pt(_a, m, 'xr-ibis-servo-mcu', 0, 1.2, 0);
    pt(_b, m, 'xr-sa-dsp-af-core', 0, -1.5, -4.0);
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
      const yMin = -12.0 - explodeFactor * 82.0;
      const yMax = 15.4 + explodeFactor * 75.0;
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
        updateLine2PtsInPlace(f.line, a.x, a.y, a.z, b.x, b.y, b.z, f.line.material instanceof THREE.LineDashedMaterial);
        const n = f.packets.length;
        for (let pi = 0; pi < n; pi++) {
          const t = (elapsed * f.speed + pi / n) % 1;
          f.packets[pi].position.lerpVectors(a, b, t);
        }
      }
    },
  };
}
