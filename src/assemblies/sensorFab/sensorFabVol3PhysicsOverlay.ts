//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol3PhysicsOverlay.ts|unit=sensorFab|lines=291|exports=SensorFabVol3PhysicsOverlayController,createSensorFabVol3PhysicsOverlay
import * as THREE from 'three';
import { CadPart } from '../types';
import { createRadialTrajectoryGuides, updateLine2PtsInPlace } from '../../engine/CadHelpers';

export interface SensorFabVol3PhysicsOverlayController {
  overlayGroup: THREE.Group;
  explodeGuides: THREE.Group;
  setVisible: (visible: boolean) => void;
  updateGuides: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  update: (elapsed: number, explodeFactor: number, physicsActive: boolean, parts: CadPart[]) => void;
}

interface Vol3FlowStream {
  line: THREE.Line;
  packets: THREE.Mesh[];
  speed: number;
  getEndpoints: (pos: Record<string, THREE.Vector3>) => [THREE.Vector3, THREE.Vector3];
}

/**
 * Real-time 3D design-to-photomask process flow & explode-guide overlay for
 * **Vol.3: フェーズ2 ── センサー設計と「ナノの型紙」フォトマスク製造 (`F3-01` – `F3-52`, P02-001–050)**:
 * - Block 2-A (Violet -> Rose): Product Spec -> Pixel Arch -> 3D TCAD -> Optical FDTD -> CRA -> PDAF -> TEG
 * - Block 2-B (Royal Blue -> Amber): 14-bit ADC -> AFE/DCG -> Row Driver -> 12.5Gbps SLVS-EC -> Cu-Cu 3D -> OASIS
 * - Block 2-C (Emerald -> Orange -> Gold): DRC/LVS/ERC -> 3D Mirror -> Single vs Stitch -> OPC Serifs -> 96-Layer Tape-Out
 * - Encrypted Fiber Drop (2-C -> 2-D): Mask Set Scheduling -> 6" Synthetic Quartz Blank
 * - Block 2-D (Sky Cyan -> Indigo): Quartz -> MoSi PSM -> Resist -> 260k Multi-Beam EB -> ICP Etch -> CD-SEM -> IPRO
 * - Block 2-E (Cyan -> Rose -> Emerald -> Gold): Die-to-DB -> Carl Zeiss MeRiT/AIMS -> 0.8µm Pellicle -> SMIF Pod -> 96-Mask Stocker
 */
export function createSensorFabVol3PhysicsOverlay(
  clippingPlanes: THREE.Plane[]
): SensorFabVol3PhysicsOverlayController {
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
    [-58.0, -35.0],
    [58.0, -35.0],
    [-58.0, 48.0],
    [58.0, 48.0],
  ];
  for (const [cx, cz] of corners) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cx, -16, cz),
      new THREE.Vector3(cx, 24, cz),
    ]);
    const line = new THREE.Line(geo, guideMat);
    line.computeLineDistances();
    explodeGuides.add(line);
    cornerLines.push(line);
  }

  const radialGuides = createRadialTrajectoryGuides(clippingPlanes, 0x64748b, 56);
  explodeGuides.add(radialGuides.group);
  explodeGuides.visible = false;

  const streams: Vol3FlowStream[] = [];
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

  // Sequential Chain: Block 2-A (P02-001 -> P02-010)
  const block2A = [
    'fab3-p01-product-spec',
    'fab3-p02-pixel-arch-select',
    'fab3-p03-process-tcad-3d',
    'fab3-p04-device-tcad-potential',
    'fab3-p05-dark-current-blooming',
    'fab3-p06-optical-fdtd-3d',
    'fab3-p07-cra-angle-shift',
    'fab3-p08-pdaf-pupil-response',
    'fab3-p09-thermal-stress-sim',
    'fab3-p10-pixel-teg-validation',
  ];
  for (let i = 0; i < block2A.length - 1; i++) {
    linkIds(block2A[i], block2A[i + 1], i < 5 ? 0x8b5cf6 : 0xec4899, 0.9, 1);
  }

  // Hand-Off 2-A -> 2-B (TEG Validation -> 14-Bit ADC Circuit Design)
  linkIds('fab3-p10-pixel-teg-validation', 'fab3-p11-adc-circuit-design', 0x3b82f6, 0.45, 2, true, 3.0, 3.0);

  // Sequential Chain: Block 2-B (P02-011 -> P02-022)
  const block2B = [
    'fab3-p11-adc-circuit-design',
    'fab3-p12-afe-cds-dcg-design',
    'fab3-p13-row-driver-tg',
    'fab3-p14-serdes-slvsec-design',
    'fab3-p15-on-sensor-isp-sram',
    'fab3-p16-cucu-3d-floorplan',
    'fab3-p17-pixel-array-layout',
    'fab3-p18-ob-dummy-border',
    'fab3-p19-logic-place-route',
    'fab3-p20-partial-stack-chiplet',
    'fab3-p21-cmp-dummy-alignment',
    'fab3-p22-fullchip-oasis-guard',
  ];
  for (let i = 0; i < block2B.length - 1; i++) {
    linkIds(block2B[i], block2B[i + 1], i < 5 ? 0x2563eb : 0x0ea5e9, 0.9, 1);
  }

  // Hand-Off 2-B -> 2-C (Full-Chip OASIS -> DRC Geometry Check)
  linkIds('fab3-p22-fullchip-oasis-guard', 'fab3-p23-drc-geometry-check', 0x10b981, 0.45, 2, true, 3.0, 3.0);

  // Sequential Chain: Block 2-C (P02-023 -> P02-032)
  const block2C = [
    'fab3-p23-drc-geometry-check',
    'fab3-p24-lvs-netlist-match',
    'fab3-p25-erc-antenna-esd',
    'fab3-p26-3d-mirror-stack-verify',
    'fab3-p27-single-vs-stitch-split',
    'fab3-p28-opc-serif-correction',
    'fab3-p29-lrc-bossung-window',
    'fab3-p30-mdp-fracture-pec',
    'fab3-p31-tapeout-96layers',
    'fab3-p32-mask-set-scheduling',
  ];
  for (let i = 0; i < block2C.length - 1; i++) {
    linkIds(block2C[i], block2C[i + 1], i < 4 ? 0x10b981 : 0xf59e0b, 0.9, 1);
  }

  // Encrypted Tape-Out Fiber Step-Down 2-C -> 2-D (Mask Scheduling -> 6" Synthetic Quartz Blank)
  linkIds('fab3-p32-mask-set-scheduling', 'fab3-p33-synthetic-quartz-sub', 0x38bdf8, 0.45, 2, true, 3.2, 3.4);

  // Sequential Chain: Block 2-D (P02-033 -> P02-042)
  const block2D = [
    'fab3-p33-synthetic-quartz-sub',
    'fab3-p34-cr-mosi-psm-sputter',
    'fab3-p35-eb-resist-coat-bake',
    'fab3-p36-multibeam-eb-writer',
    'fab3-p37-mask-peb-develop',
    'fab3-p38-mask-icp-dry-etch',
    'fab3-p39-mask-strip-spm-clean',
    'fab3-p40-second-level-border',
    'fab3-p41-mask-cd-sem-metrology',
    'fab3-p42-registration-ipro',
  ];
  for (let i = 0; i < block2D.length - 1; i++) {
    linkIds(block2D[i], block2D[i + 1], i < 4 ? 0x0284c7 : 0x06b6d4, 0.9, 1);
  }

  // Hand-Off 2-D -> 2-E (KLA IPRO Registration -> Die-to-DB Inspection)
  linkIds('fab3-p42-registration-ipro', 'fab3-p43-die-to-db-inspection', 0x10b981, 0.45, 2, true, 3.2, 3.2);

  // Sequential Chain: Block 2-E (P02-043 -> P02-050)
  const block2E = [
    'fab3-p43-die-to-db-inspection',
    'fab3-p44-nano-defect-repair',
    'fab3-p45-aims-aerial-image',
    'fab3-p46-final-haze-ultraclean',
    'fab3-p47-pellicle-08um-mount',
    'fab3-p48-starlight-post-pellicle',
    'fab3-p49-reticle-smif-pod',
    'fab3-p50-stocker-96set-bridge',
  ];
  for (let i = 0; i < block2E.length - 1; i++) {
    linkIds(block2E[i], block2E[i + 1], i < 3 ? 0xe11d48 : i < 6 ? 0x10b981 : 0xf59e0b, 0.9, 2);
  }

  // Hero Monument tie-in optical beams down to the 3 Crown Jewels (OPC, 260k Multi-Beam EB, 0.8µm Pellicle)
  linkIds('fab3-hero-reticle-96set-monument', 'fab3-p28-opc-serif-correction', 0xf59e0b, 0.6, 2, true, -2.0, 5.2);
  linkIds('fab3-hero-reticle-96set-monument', 'fab3-p36-multibeam-eb-writer', 0x0ea5e9, 0.55, 2, true, -2.0, 10.6);
  linkIds('fab3-hero-reticle-96set-monument', 'fab3-p47-pellicle-08um-mount', 0x10b981, 0.5, 2, true, -2.0, 4.8);

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
