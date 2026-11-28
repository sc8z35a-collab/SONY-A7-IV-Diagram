//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol1PhysicsOverlay.ts|unit=sensorFab|lines=222|exports=SensorFabVol1PhysicsOverlayController,createSensorFabVol1PhysicsOverlay
import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface SensorFabVol1PhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface Vol1FlowStream {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D optical, semiconductor-signal & wafer-yield physics overlay for
 * **Vol.1: 超入門 ── 一眼カメラセンサーのしくみと2026年最新アーキテクチャ (`F1-01` – `F1-32`)**:
 * - Ch.1 Photoelectric 5-Step Pipeline: Hero Prism -> PD Bucket -> TG Sluice -> FD/DCG -> SF/CDS -> Column ADC -> Pixel-Parallel ADC
 * - Ch.2 6+1 Architecture Evolution Tree: FSI -> BSI -> Partially Stacked / Full 2-Layer -> 3-Layer DRAM / GS / 2-Layer Tr Pixel
 * - Ch.3 Sony vs Canon AF & 3 Global Shutter Progression links
 * - Ch.4 Exposure Wall (26x33 overflow -> FPA-6300ESW / FPA-5550iX / Stitching) & 300mm Wafer Yield Curve (640 -> 134 -> 48 -> 26 -> Stacked Multiply)
 */
export function createSensorFabVol1PhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): SensorFabVol1PhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();
  explodeGuides.userData.__isExplodeGuides = true;

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
    [-51.5, -24.5],
    [51.5, -24.5],
    [-51.5, 19.5],
    [51.5, 19.5],
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

  const streams: Vol1FlowStream[] = [];
  const packetGeo = new THREE.SphereGeometry(0.52, 9, 7);

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
          dashSize: 1.4,
          gapSize: 1.0,
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

  const pt = (out: THREE.Vector3, map: Record<string, THREE.Vector3>, id: string, dy = 2.4) => {
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
    dyFrom = 2.4,
    dyTo = 2.4
  ) => {
    registerStream(color, speed, packets, dashed, (m) => {
      pt(_a, m, fromId, dyFrom);
      pt(_b, m, toId, dyTo);
      return _pair;
    });
  };

  // 1. Ch.1 Light-to-Photo Sequential 4T-PPD Signal Pipeline (Sky Cyan -> Gold -> Royal Blue -> Emerald)
  linkIds('fab1-step1-pd-bucket-fwc', 'fab1-step3-tg-sluice-gate', 0x0ea5e9, 0.95, 2);
  linkIds('fab1-step3-tg-sluice-gate', 'fab1-step4-fd-dcg-cups', 0x0284c7, 0.95, 2);
  linkIds('fab1-step4-fd-dcg-cups', 'fab1-step5-rst-sf-sel-cds', 0xd97706, 0.95, 2);
  linkIds('fab1-step5-rst-sf-sel-cds', 'fab1-column-14bit-adc', 0x7c3aed, 0.95, 2);
  linkIds('fab1-column-14bit-adc', 'fab1-pixel-parallel-adc', 0x10b981, 0.85, 2, true);
  linkIds('fab1-ccd-vs-cmos-arena', 'fab1-step1-pd-bucket-fwc', 0x64748b, 0.65, 1, true);

  // 2. Ch.2 Generational Architecture Evolution Tree (Rear Gallery: FSI -> BSI -> Partial/Full -> Gen4A/B/C)
  linkIds('fab1-arch1-fsi-r6m3', 'fab1-arch2-bsi-a7iv', 0x0ea5e9, 0.8, 2);
  linkIds('fab1-arch2-bsi-a7iv', 'fab1-arch3-partial-stack-a7v', 0x2563eb, 0.8, 2);
  linkIds('fab1-arch3-partial-stack-a7v', 'fab1-arch4-full-stack-a7rvi', 0xd97706, 0.8, 2);
  linkIds('fab1-arch4-full-stack-a7rvi', 'fab1-arch4b-3layer-dram', 0x4f46e5, 0.8, 2);
  linkIds('fab1-arch4b-3layer-dram', 'fab1-arch5-gs-stacked-a9iii', 0xdc2626, 0.8, 2);
  linkIds('fab1-arch5-gs-stacked-a9iii', 'fab1-arch6-2layer-tr-lytia', 0x9333ea, 0.8, 2);

  // Hero Optical Photonics Monument tie-in beam down to Reference Full-Stack & PD Bucket
  linkIds('fab1-hero-optics-photonics', 'fab1-arch4-full-stack-a7rvi', 0x0ea5e9, 0.6, 2, true, -2.5, 4.5);

  // 3. Ch.3 Sony vs Canon AF & 3 Global Shutter Technologies
  linkIds('fab1-canon-dpaf-standard', 'fab1-canon-r1-crosstype-af', 0xdc2626, 0.85, 2);
  linkIds('fab1-canon-r1-crosstype-af', 'fab1-sony-pdaf-mask-ocl', 0x7c3aed, 0.72, 2, true);
  linkIds('fab1-gs-rolling-vs-global', 'fab1-gs-charge-domain', 0xef4444, 0.85, 2, true);
  linkIds('fab1-gs-charge-domain', 'fab1-gs-voltage-domain-a9iii', 0xea580c, 0.9, 2);
  linkIds('fab1-gs-voltage-domain-a9iii', 'fab1-gs-pixel-adc-isscc2025', 0x9333ea, 0.9, 2);
  linkIds('fab1-pixel-parallel-adc', 'fab1-gs-pixel-adc-isscc2025', 0x10b981, 0.65, 2, true, 3.8, 4.4);

  // 4. Ch.4 Exposure Wall & 300mm Wafer Yield Curve (640 -> 134 -> 48 -> 26 -> Stacked Multiply)
  linkIds('fab1-wall-field-overflow', 'fab1-canon-fpa6300esw', 0xd97706, 0.88, 2);
  linkIds('fab1-canon-fpa6300esw', 'fab1-canon-fpa5550ix', 0x0284c7, 0.88, 2);
  linkIds('fab1-wall-field-overflow', 'fab1-stitching-exposure', 0x7c3aed, 0.62, 2, true, 1.5, 3.2);
  linkIds('fab1-wafer-smartphone-640', 'fab1-wafer-apsc-134', 0x10b981, 0.82, 2, false, 2.2, 2.2);
  linkIds('fab1-wafer-apsc-134', 'fab1-wafer-fullframe-48', 0x0ea5e9, 0.82, 2, false, 2.2, 2.2);
  linkIds('fab1-wafer-fullframe-48', 'fab1-wafer-mediumformat-26', 0xf59e0b, 0.82, 2, false, 2.2, 2.2);
  linkIds('fab1-wafer-mediumformat-26', 'fab1-stacked-yield-multiply', 0xdc2626, 0.82, 2, false, 2.2, 2.6);

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
      const yMin = -18.0 - explodeFactor * 26.0;
      const yMax = 22.0 + explodeFactor * 38.0;
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
