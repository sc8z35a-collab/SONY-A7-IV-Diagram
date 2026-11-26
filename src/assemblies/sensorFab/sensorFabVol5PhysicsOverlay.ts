import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface SensorFabVol5PhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface Vol5FlowStream {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time zero-GC 3D Pixel Wafer BEOL Copper-Highway process flow & explode-guide overlay for
 * **Vol.5: フェーズ4 ── 画素ウェーハ配線工程（BEOL）：銅の立体高速道路と接合面 (`F5-01`–`F5-38`, P04-001–210 / 13 Masks)**:
 * - Row 1 (4-A Slate/Silver W-Nails -> 4-B Copper M1 Damascene): CESL -> PMD -> Mask #26 Contact -> W-CVD Nails -> W-CMP -> Low-k -> Mask #27 M1 -> TaN/Ta Barrier -> Cu ECD Superfill -> 2-Stage CMP
 * - Row 2 (4-C Copper/Amber/Cyan M2–M4 Dual-Damascene ×3 Floors, 90 Steps): M2 Row Drive -> M3 VSL+Shield -> M4 VDD/VSS Power Mesh
 * - Row 3 (4-D Copper/Silver/Emerald M5 Trunk + Al-Cu Pad + Pre-Bond WAT Gate): Thick IMD -> Via 4 -> M5 Top Trunk -> Al-Cu -> Mask #36 Al Pad/IR -> Keysight WAT Prober
 * - Step-Wall Drop (4-D -> 4-E): Cleanroom Hybrid-Bonding conduit drop onto Lower Terrace
 * - Row 4 (4-E Cyan/Orange/Gold Cu-Cu Hybrid Bonding Surface -> Vol.6 Logic Portal): SiCN Dielectric -> Mask #37 HB-Via -> Mask #38 50.4M HB-Pad -> 2–5nm Cu Recess CMP -> AFM Zero-Dust -> 700-Step Vol.6 Portal
 */
export function createSensorFabVol5PhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): SensorFabVol5PhysicsOverlayController {
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
    [-61.0, 44.0],
    [61.0, 44.0],
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

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 44);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  const streams: Vol5FlowStream[] = [];
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

  // Row 1: Blocks 4-A (W Contact Nails) & 4-B (M1 Copper Single Damascene)
  const row1 = [
    'fab5-p001-cesl-sin-stopper',
    'fab5-p002-pmd-bpsg-cmp',
    'fab5-p005-pmd-clean-metro',
    'fab5-m26-contact-hole-etch',
    'fab5-p019-titin-w-cvd-nail',
    'fab5-p021-w-cmp-inspect',
    'fab5-p023-m1-sicn-lowk',
    'fab5-m27-m1-single-damascene',
    'fab5-p038-tantal-barrier-seed',
    'fab5-p040-cu-ecd-superfill',
    'fab5-p042-cu-2stage-cmp-bta',
  ];
  for (let i = 0; i < row1.length - 1; i++) {
    linkIds(row1[i], row1[i + 1], i < 5 ? 0x0284c7 : 0xea580c, 0.9, 1);
  }

  // Hand-Off 4-B -> 4-C (M1 CMP -> M2 Dual-Damascene Floor)
  linkIds('fab5-p042-cu-2stage-cmp-bta', 'fab5-p045-m2-sicn-lowk', 0xea580c, 0.44, 2, true, 3.0, 3.0);

  // Row 2: Block 4-C (M2 -> M3 -> M4 Dual Damascene x3 Floors = 90 Steps)
  const row2 = [
    'fab5-p045-m2-sicn-lowk',
    'fab5-m28-via1-pattern',
    'fab5-m29-m2-row-drive',
    'fab5-p072-m2-dual-fill-cmp',
    'fab5-p075-m3-sicn-lowk',
    'fab5-m30-via2-pattern',
    'fab5-m31-m3-vsl-shield',
    'fab5-p102-m3-dual-fill-cmp',
    'fab5-p105-m4-sicn-imd',
    'fab5-m32-via3-pattern',
    'fab5-m33-m4-power-mesh',
    'fab5-p132-m4-dual-fill-cmp',
  ];
  for (let i = 0; i < row2.length - 1; i++) {
    const col = i < 4 ? 0xf59e0b : i < 8 ? 0x0ea5e9 : 0x8b5cf6;
    linkIds(row2[i], row2[i + 1], col, 0.9, 1);
  }

  // Hand-Off 4-C -> 4-D (M4 CMP -> M5 Thick IMD)
  linkIds('fab5-p132-m4-dual-fill-cmp', 'fab5-p135-m5-thick-imd', 0xd97706, 0.44, 2, true, 3.2, 3.2);

  // Row 3: Block 4-D (M5 Top Metal + Al-Cu Pad + Pre-Bond WAT Gate)
  const row3 = [
    'fab5-p135-m5-thick-imd',
    'fab5-m34-via4-heavy',
    'fab5-m35-m5-top-trunk',
    'fab5-p161-m5-fill-cmp',
    'fab5-p163-alcu-pad-sputter',
    'fab5-m36-al-pad-ir-mark',
    'fab5-p177-prebond-wat-gate',
  ];
  for (let i = 0; i < row3.length - 1; i++) {
    linkIds(row3[i], row3[i + 1], i < 3 ? 0xea580c : i < 5 ? 0x64748b : 0x10b981, 0.85, 2);
  }

  // Cleanroom Step-Wall Drop 4-D -> 4-E (Pre-Bond WAT Gate -> Hybrid Bonding SiCN Dielectric)
  linkIds('fab5-p177-prebond-wat-gate', 'fab5-p179-hb-sicn-dielectric', 0x06b6d4, 0.44, 2, true, 3.2, 3.4);

  // Lower Row 4: Block 4-E (Cu-Cu Hybrid Bonding Surface & 2-5nm Cu Recess CMP -> Vol.6 Logic Portal)
  const row4 = [
    'fab5-p179-hb-sicn-dielectric',
    'fab5-m37-hb-via-pattern',
    'fab5-m38-hb-cu-pad-50m',
    'fab5-p206-hb-recess-cmp',
    'fab5-p209-afm-surfscan-zero',
    'fab5-beol-700-to-vol6-logic',
  ];
  const row4Cols = [0x06b6d4, 0xea580c, 0xe11d48, 0x10b981, 0xf59e0b];
  for (let i = 0; i < row4.length - 1; i++) {
    linkIds(row4[i], row4[i + 1], row4Cols[i], 0.85, 2);
  }

  // Hero 5-Floor Copper Highway Monument optical tie-ins to the 5 Vol.5 Crown Jewels!
  linkIds('fab5-hero-beol-5floor-highway', 'fab5-p038-tantal-barrier-seed', 0x7c3aed, 0.55, 2, true, -2.5, 5.6);
  linkIds('fab5-hero-beol-5floor-highway', 'fab5-p040-cu-ecd-superfill', 0xea580c, 0.6, 2, true, -2.5, 5.6);
  linkIds('fab5-hero-beol-5floor-highway', 'fab5-p177-prebond-wat-gate', 0x10b981, 0.52, 2, true, -2.5, 5.6);
  linkIds('fab5-hero-beol-5floor-highway', 'fab5-m38-hb-cu-pad-50m', 0xf97316, 0.5, 2, true, -2.5, 5.6);
  linkIds('fab5-hero-beol-5floor-highway', 'fab5-p206-hb-recess-cmp', 0xe11d48, 0.52, 2, true, -2.5, 6.0);

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
