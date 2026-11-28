//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol4PhysicsOverlay.ts|unit=sensorFab|lines=301|exports=SensorFabVol4PhysicsOverlayController,createSensorFabVol4PhysicsOverlay
import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface SensorFabVol4PhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface Vol4FlowStream {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time zero-GC 3D Pixel Wafer FEOL process flow & explode-guide overlay for
 * **Vol.4: フェーズ3 ── 画素ウェーハ前工程（FEOL）：光を受け止める心臓部 (`F4-01`–`F4-45`, P03-001–380 / 25 Masks)**:
 * - Row 1 (3-A Sky Blue -> 3-B Violet): RCA Clean -> Pad Ox -> Mask #01 Align -> Mask #02 STI -> HDP Fill -> Mask #03 -> CMP -> Mask #04 Deep F-DTI -> Passivation -> Optical Mirror Fill
 * - Row 2 (3-C Indigo -> Red -> Green -> Blue -> Gold -> Rose): Masks #05–#10 Wells/Vt -> Masks #11–#13 RGB 3-Depth MeV PD -> Mask #14 Dual-Pixel -> Mask #15–#16 -> Recovery Anneal
 * - Row 3 (3-D Violet -> Sky -> Amber -> Emerald): Mask #17 VTG Straw -> 3.3V Gate Ox -> Mask #18 Dual Ox -> 2–3nm Ox & Poly-Si -> Mask #19 Gate Etch -> Re-Ox & CD-SEM
 * - Step-Wall Drop (3-D -> 3-E): Cleanroom thermal/ion conduit drop from Upper Terrace down to Lower Terrace
 * - Row 4 (3-E Cyan -> Amber -> Crimson P+ Pinning -> Royal): Offset Spacer -> Masks #20–#21 LDD -> Sidewall Shoulder Pads -> Mask #22 P+ Pinning Lid -> Masks #23–#24 S/D
 * - Row 5 (3-F Orange -> Emerald SAB -> Silver NiSi -> Cyan H2 -> Gold Vol.5 BEOL): Spike RTA -> Mask #25 Salicide Block -> CoSi2/NiSi -> 400°C H2 Sinter -> Vol.5 BEOL 210-Step Portal
 */
export function createSensorFabVol4PhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): SensorFabVol4PhysicsOverlayController {
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
    [-61.0, -37.0],
    [61.0, -37.0],
    [-61.0, 50.0],
    [61.0, 50.0],
  ];
  for (const [cx, cz] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, -18, cz),
      new THREE.Vector3(cx, 26, cz),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 50);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  const streams: Vol4FlowStream[] = [];
  const packetGeo = new THREE.SphereGeometry(0.46, 8, 6);

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

  // Row 1: Blocks 3-A & 3-B (P03-001 -> P03-084)
  const row1 = [
    'fab4-p001-incoming-rca-clean',
    'fab4-p004-initial-pad-oxide',
    'fab4-m01-zero-layer-align',
    'fab4-p019-sti-pad-sin-lpcvd',
    'fab4-m02-sti-trench-etch',
    'fab4-p037-sti-liner-hdp-fill',
    'fab4-m03-sti-reverse-etch',
    'fab4-p053-sti-cmp-sin-strip',
    'fab4-p059-dti-hardmask-dep',
    'fab4-m04-front-dti-deep-etch',
    'fab4-p073-dti-sidewall-passiv',
    'fab4-p079-dti-fill-optic-mirror',
  ];
  for (let i = 0; i < row1.length - 1; i++) {
    linkIds(row1[i], row1[i + 1], i < 7 ? 0x0284c7 : 0x7c3aed, 0.9, 1);
  }

  // Hand-Off 3-B -> 3-C (F-DTI Optical Mirror Fill -> Deep P-Well Floor)
  linkIds('fab4-p079-dti-fill-optic-mirror', 'fab4-m05-deep-pwell-floor', 0x8b5cf6, 0.42, 2, true, 3.0, 3.0);

  // Row 2: Block 3-C (P03-085 -> P03-248, 12 Masks + 20-step Recovery Anneal)
  const row2 = [
    'fab4-m05-deep-pwell-floor',
    'fab4-m06-pixel-iso-pbarrier',
    'fab4-m07-periph-nwell',
    'fab4-m08-pixel-pwell-nmos',
    'fab4-m09-pixel-vt-lownoise',
    'fab4-m10-periph-vt-adjust',
    'fab4-m11-pd-deep-red-mev',
    'fab4-m12-pd-mid-green-n',
    'fab4-m13-pd-shallow-blue-tilt',
    'fab4-m14-dualpixel-pd-split',
    'fab4-m15-antibloom-overflow',
    'fab4-m16-gs-mem-dcg-implant',
    'fab4-p229-pd-recovery-anneal',
  ];
  const row2Colors = [
    0x7c3aed,
    0x6366f1,
    0x2563eb,
    0x10b981,
    0x06b6d4,
    0xe11d48,
    0xe11d48,
    0x22c55e,
    0x38bdf8,
    0xf59e0b,
    0xea580c,
    0xf43f5e,
  ];
  for (let i = 0; i < row2.length - 1; i++) {
    linkIds(row2[i], row2[i + 1], row2Colors[i] ?? 0xe11d48, 0.9, 1);
  }

  // Hand-Off 3-C -> 3-D (Recovery Anneal -> Mask #17 VTG Straw Trench)
  linkIds('fab4-p229-pd-recovery-anneal', 'fab4-m17-vtg-straw-trench', 0x8b5cf6, 0.42, 2, true, 3.2, 3.2);

  // Row 3: Block 3-D (P03-249 -> P03-296, VTG + Dual Gate Ox + Poly-Si Gate)
  const row3 = [
    'fab4-m17-vtg-straw-trench',
    'fab4-p261-thick-gate-ox-33v',
    'fab4-m18-dual-gate-ox-etch',
    'fab4-p277-thin-gate-polysilicon',
    'fab4-m19-poly-gate-etch',
    'fab4-p295-gate-reox-cdsem',
  ];
  for (let i = 0; i < row3.length - 1; i++) {
    linkIds(row3[i], row3[i + 1], i < 2 ? 0x0ea5e9 : i < 4 ? 0xf59e0b : 0x10b981, 0.85, 2);
  }

  // Cleanroom Step-Wall Drop 3-D -> 3-E (Gate Re-Ox -> 10nm Offset Spacer on Lower Terrace)
  linkIds('fab4-p295-gate-reox-cdsem', 'fab4-p297-offset-spacer', 0x06b6d4, 0.42, 2, true, 3.2, 3.4);

  // Row 4: Block 3-E (P03-297 -> P03-364, LDD + Sidewalls + Crown Jewel Mask #22 P+ Pinning + S/D)
  const row4 = [
    'fab4-p297-offset-spacer',
    'fab4-m20-pixel-nldd-fd',
    'fab4-m21-periph-ldd',
    'fab4-p323-sidewall-spacer',
    'fab4-m22-surface-pinning-ppd',
    'fab4-m23-nplus-sd-contact',
    'fab4-m24-pplus-sd-welltap',
  ];
  for (let i = 0; i < row4.length - 1; i++) {
    linkIds(row4[i], row4[i + 1], i === 3 || i === 4 ? 0xe11d48 : i < 3 ? 0x3b82f6 : 0xf59e0b, 0.85, 2);
  }

  // Hand-Off 3-E -> 3-F (Mask #24 P+ S/D -> Spike RTA Flash Activation)
  linkIds('fab4-m24-pplus-sd-welltap', 'fab4-p365-spike-rta-flash', 0xf97316, 0.45, 2, true, 3.2, 3.2);

  // Row 5: Block 3-F (P03-365 -> P03-380 + Vol.5 BEOL 210-Step Portal)
  const row5 = [
    'fab4-p365-spike-rta-flash',
    'fab4-m25-salicide-block-sab',
    'fab4-p379-salicide-cosi-nisi',
    'fab4-p380-h2-sinter-feol-wat',
    'fab4-feol-380-to-vol5-beol',
  ];
  const row5Colors = [0xf97316, 0x10b981, 0x38bdf8, 0xf59e0b];
  for (let i = 0; i < row5.length - 1; i++) {
    linkIds(row5[i], row5[i + 1], row5Colors[i], 0.85, 2);
  }

  // Hero 4T-PPD Pixel Heart tie-in optical beams to the 5 Crown-Jewel FEOL Stations!
  linkIds('fab4-hero-feol-pixel-heart', 'fab4-m04-front-dti-deep-etch', 0x7c3aed, 0.55, 2, true, -2.5, 6.2);
  linkIds('fab4-hero-feol-pixel-heart', 'fab4-m11-pd-deep-red-mev', 0xe11d48, 0.6, 2, true, -2.5, 6.8);
  linkIds('fab4-hero-feol-pixel-heart', 'fab4-m17-vtg-straw-trench', 0x0ea5e9, 0.55, 2, true, -2.5, 5.4);
  linkIds('fab4-hero-feol-pixel-heart', 'fab4-m22-surface-pinning-ppd', 0xf43f5e, 0.5, 2, true, -2.5, 6.0);
  linkIds('fab4-hero-feol-pixel-heart', 'fab4-m25-salicide-block-sab', 0x10b981, 0.5, 2, true, -2.5, 6.0);

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
      const yMin = -22.0 - explodeFactor * 26.0;
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
