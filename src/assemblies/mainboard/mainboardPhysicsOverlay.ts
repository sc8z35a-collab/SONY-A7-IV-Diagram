import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides } from '../../engine/CadHelpers';

export interface MainboardPhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface DataBusFlow {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D high-speed signal-flow & two-phase thermal dissipation overlay
 * for the 30-Part Image Processing Engine & 12-Layer HDI Mainboard.
 */
export function createMainboardPhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): MainboardPhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();

  // =========================================================================
  // 1. CAD EXPLODED-VIEW AXIS + RADIAL ALIGNMENT GUIDES
  // =========================================================================
  const guideCorners: Array<[number, number]> = [
    [-41.5, 27.5],
    [41.5, 27.5],
    [-41.5, -27.5],
    [41.5, -27.5],
  ];
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x9aa3b2,
    dashSize: 1.8,
    gapSize: 1.4,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const guideLines: THREE.Line[] = [];
  for (const [gx, gy] of guideCorners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(gx, gy, -15),
      new THREE.Vector3(gx, gy, -29),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    guideLines.push(line);
  }
  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 32);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  // =========================================================================
  // 2. HIGH-SPEED DATA BUS & THERMAL HEAT-FLOW PATHWAYS
  // =========================================================================
  const flows: DataBusFlow[] = [];
  const packetGeo = new THREE.SphereGeometry(0.74, 12, 10);

  const registerFlow = (
    color: number,
    speed: number,
    packetCount: number,
    dashed: boolean,
    getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3]
  ) => {
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -20),
      new THREE.Vector3(1, 0, -20),
    ]);
    const lineMat = dashed
      ? new THREE.LineDashedMaterial({
          color,
          dashSize: 1.5,
          gapSize: 1.0,
          transparent: true,
          opacity: 0.85,
          clippingPlanes,
        })
      : new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.82,
          clippingPlanes,
        });
    const line = new THREE.Line(lineGeo, lineMat);
    overlayGroup.add(line);

    const packets: THREE.Mesh[] = [];
    const pMat = new THREE.MeshBasicMaterial({ color, clippingPlanes });
    for (let i = 0; i < packetCount; i++) {
      const m = new THREE.Mesh(packetGeo, pMat);
      overlayGroup.add(m);
      packets.push(m);
    }

    flows.push({ line, packets, speed, getEndpoints });
  };

  const pt = (
    pos: Record<string, THREE.Vector3>,
    id: string,
    dx: number,
    dy: number,
    dz: number
  ) => {
    const base = pos[id] ?? new THREE.Vector3(0, 0, -20);
    return new THREE.Vector3(base.x + dx, base.y + dy, base.z + dz);
  };

  // A. SLVS-EC v3 160 Gbps RAW stream: B2B Mezzanine -> 4nm ISP Silicon Die
  registerFlow(0x06b6d4, 0.95, 3, false, (p) => [
    pt(p, 'mb-b2b-connectors', 2.0, -2.0, 0.5),
    pt(p, 'mb-isp-die', 3.5, -1.5, 0.0),
  ]);

  // B. AI Tensor & Pose-Estimation link: ISP Die <-> AI NPU Systolic Array
  registerFlow(0x7c3aed, 1.25, 2, false, (p) => [
    pt(p, 'mb-isp-die', 8.5, 2.5, -0.4),
    pt(p, 'mb-ai-npu', 22.5, 6.5, -0.6),
  ]);

  // C. Quad-Channel LPDDR5X-8533 Ring Buffer (Upper & Lower Channels)
  registerFlow(0x2563eb, 1.35, 2, false, (p) => [
    pt(p, 'mb-isp-die', -1.5, 3.0, -0.4),
    pt(p, 'mb-lpddr5x', -14.2, 8.5, -0.5),
  ]);
  registerFlow(0x2563eb, 1.35, 2, false, (p) => [
    pt(p, 'mb-isp-die', -1.5, -5.5, -0.4),
    pt(p, 'mb-lpddr5x', -14.2, -9.5, -0.5),
  ]);

  // D. PCIe Gen4 x2 NVMe (4 GB/s): ISP Die -> CFexpress 4.0 Type B Card Cage
  registerFlow(0xd97706, 1.05, 3, false, (p) => [
    pt(p, 'mb-isp-die', -2.5, -1.5, -0.4),
    pt(p, 'mb-cfexpress', -25.0, 2.5, -0.6),
  ]);

  // E. HDMI 2.1 (48 Gbps FRL) Video Output: ISP Die -> Modular HDMI 2.1 Daughterboard
  registerFlow(0x0284c7, 0.9, 2, false, (p) => [
    pt(p, 'mb-isp-die', 9.0, -1.5, -0.4),
    pt(p, 'mb-hdmi-daughterboard', 38.0, 1.5, -0.5),
  ]);

  // F. Two-Phase Thermal Dissipation Vectors: ISP & NPU Silicon -> Copper Vapor Chamber
  registerFlow(0xea580c, 0.72, 2, true, (p) => [
    pt(p, 'mb-isp-die', 3.5, -1.5, -0.5),
    pt(p, 'mb-vapor-chamber', 3.5, -1.5, 0.6),
  ]);
  registerFlow(0xea580c, 0.72, 2, true, (p) => [
    pt(p, 'mb-ai-npu', 22.5, 6.5, -0.6),
    pt(p, 'mb-vapor-chamber', 22.5, 6.5, 0.6),
  ]);

  // G. Radial Two-Phase Vapor Heat Spreading inside Vapor Chamber
  registerFlow(0xf97316, 0.65, 2, true, (p) => [
    pt(p, 'mb-vapor-chamber', 3.5, -1.5, -0.7),
    pt(p, 'mb-vapor-chamber', -22.0, -25.5, -0.7),
  ]);

  overlayGroup.visible = false;

  const setVisible = (visible: boolean) => {
    overlayGroup.visible = visible;
  };

  const updateGuides = (explodeFactor: number, visible: boolean, parts: CadPart[]) => {
    const opacity = THREE.MathUtils.clamp((explodeFactor - 0.04) * 0.55, 0, 0.42);
    explodeGuides.visible = visible && opacity > 0.01;
    guideMat.opacity = opacity;

    if (!explodeGuides.visible) return;
    const front = parts.find((p) => p.id === 'mb-chassis-frame');
    const rear =
      parts.find((p) => p.id === 'mb-rf-shield-bracket') ??
      parts.find((p) => p.id === 'mb-vapor-chamber');
    const zFront = (front ? front.group.position.z : -15.6) + 2.0;
    const zRear = (rear ? rear.group.position.z : -28.8) - 2.0;

    guideLines.forEach((line, i) => {
      const [gx, gy] = guideCorners[i];
      const attr = line.geometry.attributes.position as THREE.BufferAttribute;
      attr.setXYZ(0, gx, gy, zFront);
      attr.setXYZ(1, gx, gy, zRear);
      attr.needsUpdate = true;
      line.computeLineDistances();
    });
    radialGuides.update(explodeFactor, visible, parts);
  };

  const update = (elapsed: number, physicsActive: boolean, parts: CadPart[]) => {
    if (!physicsActive) return;

    const posMap: Record<string, THREE.Vector3> = {};
    for (const p of parts) {
      posMap[p.id] = p.group.position;
    }

    flows.forEach((flow, fIdx) => {
      const [a, b] = flow.getEndpoints(posMap);
      const attr = flow.line.geometry.attributes.position as THREE.BufferAttribute;
      attr.setXYZ(0, a.x, a.y, a.z);
      attr.setXYZ(1, b.x, b.y, b.z);
      attr.needsUpdate = true;
      if ((flow.line.material as THREE.LineDashedMaterial).isLineDashedMaterial) {
        flow.line.computeLineDistances();
      }

      const n = flow.packets.length;
      flow.packets.forEach((pkt, pi) => {
        const u = (elapsed * flow.speed + pi / n + fIdx * 0.13) % 1;
        pkt.position.lerpVectors(a, b, u);
      });
    });
  };

  return {
    overlayGroup,
    explodeGuides,
    setVisible,
    updateGuides,
    update,
  };
}
