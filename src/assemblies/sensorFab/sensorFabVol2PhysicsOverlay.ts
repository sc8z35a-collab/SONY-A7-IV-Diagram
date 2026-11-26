import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface SensorFabVol2PhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface Vol2FlowStream {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D process-flow, purity-escalation & metrology physics overlay for
 * **Vol.2: フェーズ1 ── 砂（珪石）から超純度エピタキシャルウェーハまで (`F2-01` – `F2-36`, P01-001–060)**:
 * - Block 1-A (Molten Amber): Quartzite Mine -> Reductant Blend -> 2,000°C Arc Furnace -> MG-Si Refining
 * - Block 1-B (Chemical Cyan): TCS Fluidized Bed -> Multi-Stage Distillation -> H2/Slim Rods -> Siemens 11N -> Clean Nuggets
 * - Block 1-C (Royal Indigo/Gold): Spruce Pine 32" Crucible -> Poly+B Load -> MCZ 0.3-0.4T Magnet -> Dash Neck -> 300mm V/G Ingot -> Tail Unload
 * - Block 1-D (Sky Blue): Crop/OD 300mm -> X-Ray/V-Notch -> 1,000-Wire Saw -> Debond/T7 Laser ID
 * - Block 1-E (Emerald): Edge Bevel/Grind -> Etch/Donor Killer -> DSP 775µm -> Finish CMP Ra<0.1nm -> RCA Megasonic/PW
 * - Block 1-F (Magenta): Backside Seal/DHF -> Molecular Ion Implanter -> 2026 SUMCO 5nm CI Gettering -> Single-Wafer Epi 4-10µm -> Double-Epi
 * - Block 1-G (Metrology Blue -> Gold Vol.3 Portal): Surfscan 19-30nm -> WaferSight/FTIR -> VPD-ICP-MS/Hotspot -> 25-Wafer FOSB -> Logistics -> Vol.3
 */
export function createSensorFabVol2PhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): SensorFabVol2PhysicsOverlayController {
  const overlayGroup = new THREE.Group();
  const explodeGuides = new THREE.Group();
  explodeGuides.userData.__isExplodeGuides = true;

  const guideMat = new THREE.LineDashedMaterial({
    color: 0x94a3b8,
    dashSize: 2.4,
    gapSize: 1.6,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const cornerLines: THREE.Line[] = [];
  const corners: Array<[number, number]> = [
    [-55.0, -28.0],
    [55.0, -28.0],
    [-55.0, 28.0],
    [55.0, 28.0],
  ];
  for (const [cx, cz] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, -18, cz),
      new THREE.Vector3(cx, 24, cz),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 48);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  const streams: Vol2FlowStream[] = [];
  const packetGeo = new THREE.SphereGeometry(0.5, 8, 6);

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

  // Block 1-A (Back-Left: Silica -> 2,000°C Arc Furnace -> 99% MG-Si)
  linkIds('fab2-quartzite-mine-crusher', 'fab2-carbon-reductant-blender', 0xea580c, 0.85, 2);
  linkIds('fab2-carbon-reductant-blender', 'fab2-submerged-arc-furnace', 0xdc2626, 0.9, 2);
  linkIds('fab2-submerged-arc-furnace', 'fab2-ladle-refining-grinding', 0xf59e0b, 0.9, 2);

  // Transition 1-A -> 1-B (MG-Si Powder -> TCS Chemical Distillation -> Siemens 11N)
  linkIds('fab2-ladle-refining-grinding', 'fab2-tcs-fluidized-cyclone', 0x0891b2, 0.85, 2);
  linkIds('fab2-tcs-fluidized-cyclone', 'fab2-multistage-distillation', 0x06b6d4, 0.85, 2);
  linkIds('fab2-multistage-distillation', 'fab2-h2-purifier-slimrods', 0x0284c7, 0.85, 2);
  linkIds('fab2-h2-purifier-slimrods', 'fab2-siemens-cvd-reactor', 0x14b8a6, 0.9, 2);
  linkIds('fab2-siemens-cvd-reactor', 'fab2-nonmetal-crush-acid-pack', 0x10b981, 0.85, 2);

  // Cleanroom Airlock Hand-Off 1-B -> 1-C (11N Nuggets -> Spruce Pine Crucible & MCZ)
  linkIds('fab2-nonmetal-crush-acid-pack', 'fab2-poly-boron-dopant-load', 0x6366f1, 0.55, 2, true, 3.5, 4.2);
  linkIds('fab2-spruce-pine-crucible', 'fab2-poly-boron-dopant-load', 0xf59e0b, 0.9, 2);
  linkIds('fab2-poly-boron-dopant-load', 'fab2-mcz-superconducting-magnet', 0x4f46e5, 0.9, 2);
  linkIds('fab2-mcz-superconducting-magnet', 'fab2-seed-dash-necking', 0x3b82f6, 0.95, 2);
  linkIds('fab2-seed-dash-necking', 'fab2-mcz-body-pulling-vg', 0x2563eb, 0.95, 2, false, 5.4, 6.2);
  linkIds('fab2-mcz-body-pulling-vg', 'fab2-tail-detachment-unloading', 0x0ea5e9, 0.85, 2, false, 6.0, 5.2);

  // Block 1-D (Ingot Shaping -> 1,000-Wire Slicing -> T7 ID)
  linkIds('fab2-tail-detachment-unloading', 'fab2-crop-od-grinding', 0x0284c7, 0.85, 2);
  linkIds('fab2-crop-od-grinding', 'fab2-xray-notch-grinding', 0x0369a1, 0.85, 2);
  linkIds('fab2-xray-notch-grinding', 'fab2-multiwire-saw-slicing', 0x06b6d4, 0.95, 2);
  linkIds('fab2-multiwire-saw-slicing', 'fab2-debond-laser-id', 0x0891b2, 0.85, 2);

  // S-Curve Hand-Off 1-D -> 1-E (As-Sliced Wafer -> Bevel -> Etch -> DSP -> Atomic CMP -> RCA)
  linkIds('fab2-debond-laser-id', 'fab2-edge-bevel-grinding', 0x10b981, 0.55, 2, true, 3.2, 3.2);
  linkIds('fab2-edge-bevel-grinding', 'fab2-chem-etch-donor-killer', 0x059669, 0.85, 2);
  linkIds('fab2-chem-etch-donor-killer', 'fab2-edge-mirror-dsp', 0x0d9488, 0.9, 2);
  linkIds('fab2-edge-mirror-dsp', 'fab2-final-finish-cmp', 0x06b6d4, 0.95, 2);
  linkIds('fab2-final-finish-cmp', 'fab2-rca-megasonic-pw-check', 0x0ea5e9, 0.9, 2);

  // Block 1-F (CIS-Exclusive Molecular Ion Implantation + 5nm CI Gettering + Single-Wafer Epi)
  linkIds('fab2-rca-megasonic-pw-check', 'fab2-backside-seal-preclean', 0x8b5cf6, 0.9, 2);
  linkIds('fab2-backside-seal-preclean', 'fab2-molecular-ion-implanter', 0xa855f7, 0.95, 2);
  linkIds('fab2-molecular-ion-implanter', 'fab2-ci-complex-gettering-cutaway', 0xd946ef, 1.0, 2, false, 3.4, 4.2);
  linkIds('fab2-ci-complex-gettering-cutaway', 'fab2-single-wafer-epi-reactor', 0xc026d3, 0.95, 2, false, 4.2, 3.6);
  linkIds('fab2-single-wafer-epi-reactor', 'fab2-double-epi-post-clean', 0x9333ea, 0.9, 2);

  // Hero Monument tie-in beam down to MCZ Ingot & 2026 SUMCO CI-Gettering Crown Jewels
  linkIds('fab2-hero-purity-mirror-monument', 'fab2-mcz-body-pulling-vg', 0x0ea5e9, 0.65, 2, true, -2.0, 10.6);
  linkIds('fab2-hero-purity-mirror-monument', 'fab2-ci-complex-gettering-cutaway', 0xd946ef, 0.65, 2, true, -2.0, 6.8);

  // Drop-Down Elevator into Lower ISO Class 1 Metrology & FOSB Shipping Bay (Block 1-G)
  linkIds('fab2-double-epi-post-clean', 'fab2-surfscan-lpd-inspection', 0x2563eb, 0.55, 2, true, 1.6, 3.5);
  linkIds('fab2-surfscan-lpd-inspection', 'fab2-wafersight-epi-mapping', 0x06b6d4, 0.85, 2);
  linkIds('fab2-wafersight-epi-mapping', 'fab2-vpd-icpms-edge-check', 0xf43f5e, 0.85, 2);
  linkIds('fab2-vpd-icpms-edge-check', 'fab2-fosb-25wafer-clean-load', 0x10b981, 0.9, 2);
  linkIds('fab2-fosb-25wafer-clean-load', 'fab2-controlled-logistics-fab-bridge', 0xf59e0b, 0.95, 2);

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
      const yMax = 24.0 + explodeFactor * 36.0;
      for (let i = 0; i < cornerLines.length; i++) {
        const [cx, cz] = corners[i];
        updateLine2PtsInPlace(cornerLines[i], cx, yMin, cz, cx, yMax, cz, true);
      }
      radialGuides.update(explodeFactor, visible, parts);
    },
    update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => {
      if (parts.length === 0) return;

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.group.position.copy(p.assembledPos).addScaledVector(p.explodeOffset, explodeFactor);
        _posMap[p.id] = p.group.position;
      }
      if (!physicsActive || !overlayGroup.visible) return;

      for (let s = 0; s < streams.length; s++) {
        const st = streams[s];
        const [a, b] = st.getEndpoints(_posMap);
        updateLine2PtsInPlace(
          st.line,
          a.x,
          a.y,
          a.z,
          b.x,
          b.y,
          b.z,
          st.line.material instanceof THREE.LineDashedMaterial
        );
        for (let k = 0; k < st.packets.length; k++) {
          const u = (elapsed * st.speed + k / st.packets.length) % 1;
          st.packets[k].position.lerpVectors(a, b, u);
        }
      }
    },
  };
}
