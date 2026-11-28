//@FLOW_MAP|file=src/assemblies/mainboard/mainboardUltraAuditParts.ts|unit=mainboard|lines=269|exports=buildMainboardUltraAuditParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';

function createRingShape(outerR: number, innerR: number): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

function finalizeMainboardAuditPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.24
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

  return {
    id,
    subsystem: 'mainboard',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

/**
 * Phase 19D — 6 Standalone-Only Vapor Chamber & Flagship Mainboard Deep-Audit Parts (M55–M60 -> 60 total).
 * Rendered ONLY in standalone 'mainboard' view; omitted completely in whole-camera views.
 * Coordinates match mainboardParts.ts (PCB centered at z = -19.2 mm, 92 x 64 mm, rear faces -Z).
 */
export function buildMainboardUltraAuditParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // M55. Sony OEM RF-Shield Structural Retention Screws (4x) & Multi-Point EMI Grounding Bosses
  {
    const g = new THREE.Group();
    const bossCoords: Array<[number, number]> = [
      [-34.0, 22.0],
      [26.0, 22.0],
      [-34.0, -22.0],
      [26.0, -22.0],
    ];
    for (const [bx, by] of bossCoords) {
      const boss = new THREE.Mesh(
        extrudeCentered(createRingShape(2.4, 0.95), 0.45, 0.04, 0.04, 16),
        mats.goldPlating
      );
      boss.position.set(bx, by, 0.2);
      const screw = createPrecisionScrew(1.65, 0.65, 3.6, mats.stainlessMachined);
      screw.position.set(bx, by, -0.5);
      screw.rotation.x = Math.PI;
      g.add(boss, screw);
    }

    parts.push(
      finalizeMainboardAuditPart(
        'mb-rf-shield-4screws',
        55,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -29.2),
        new THREE.Vector3(-42, 34, -84),
        cp,
        0.28
      )
    );
  }

  // M56. CFexpress Type B / SD Combo Card-Detect Switches, Write-Protect Leaf & Push-Push Heart-Cam Ejector
  {
    const g = new THREE.Group();
    // Dual slot ejector rails mounted along right (-X = grip/media side) card cage
    for (const sy of [-7.5, 7.5]) {
      const heartPlate = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(4.6, 12.2, 0.8), 0.9, 0.06, 0.06, 10),
        mats.stainlessMachined
      );
      heartPlate.position.set(-38.5, sy, 0);
      const ejectSpring = new THREE.Mesh(
        createHelicalSpringGeometry(0.72, 9.4, 12, 0.14).rotateX(Math.PI / 2),
        mats.mountSpringSteel
      );
      ejectSpring.position.set(-36.2, sy, 0);
      ejectSpring.userData.noEdges = true;
      const detectLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.8, 0.8), mats.goldPlating);
      detectLeaf.position.set(-34.6, sy + 2.2, 0.6);
      g.add(heartPlate, ejectSpring, detectLeaf);
    }

    parts.push(
      finalizeMainboardAuditPart(
        'mb-card-detect-heartcam',
        56,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -23.6),
        new THREE.Vector3(-76, -24, -46),
        cp,
        0.26
      )
    );
  }

  // M57. HDMI 2.1 (48 Gbps) & USB-C (10 Gbps) Ultra-Low-Cap (0.2 pF) ESD TVS Array & Common-Mode Chokes
  {
    const g = new THREE.Group();
    // 4 flow-through TVS DFN packages + 4 miniature ceramic common-mode chokes near left I/O (+X side)
    for (let i = 0; i < 4; i++) {
      const py = -12.0 + i * 7.8;
      const tvs = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.2, 0.55), mats.icEpoxy);
      tvs.position.set(35.2, py, 0);
      const choke = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 0.85), mats.ferriteInductor);
      choke.position.set(31.8, py, -0.15);
      const capDot = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.35, 0.88), mats.silverElectrode);
      capDot.position.set(31.8, py, -0.15);
      g.add(tvs, choke, capDot);
    }

    parts.push(
      finalizeMainboardAuditPart(
        'mb-io-lowcap-esd-chokes',
        57,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, -20.5),
        new THREE.Vector3(74, 22, -32),
        cp,
        0.28
      )
    );
  }

  // M58. BIONZ XR / LPDDR5X BGA Capillary Underfill Epoxy Fillet & Gold AOI Fiducial Alignment Marks
  {
    const g = new THREE.Group();
    // BIONZ XR perimeter epoxy underfill bead
    const socFillet = new THREE.Mesh(
      extrudeCentered(createFrameShape(19.4, 19.4, 1.2, 17.6, 17.6, 0.8), 0.72, 0.14, 0.14, 12),
      mats.icEpoxy
    );
    socFillet.position.set(-4.5, -1.0, 0);
    // 3 diagonal ENIG gold AOI fiducial target discs on PCB corners
    for (const [fx, fy] of [
      [-42.0, 28.0],
      [42.0, 28.0],
      [-42.0, -28.0],
    ] as Array<[number, number]>) {
      const fidDot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 0.14, 16).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      fidDot.position.set(fx, fy, -0.2);
      const fidRing = new THREE.Mesh(
        extrudeCentered(createRingShape(1.45, 1.05), 0.1, 0.01, 0.01, 16),
        mats.goldPlating
      );
      fidRing.position.set(fx, fy, -0.2);
      g.add(fidDot, fidRing);
    }
    g.add(socFillet);

    parts.push(
      finalizeMainboardAuditPart(
        'mb-bga-underfill-fiducials',
        58,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, -20.3),
        new THREE.Vector3(46, -42, -52),
        cp,
        0.26
      )
    );
  }

  // M59. 4-Channel Precision Current-Sense INA Shunt Amplifiers & 1% Battery Fuel-Gauge IC
  {
    const g = new THREE.Group();
    const gaugeIc = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.4, 4.4, 0.4), 0.85, 0.05, 0.05, 8),
      mats.icEpoxy
    );
    gaugeIc.position.set(-22.5, -17.5, 0);
    g.add(gaugeIc);
    for (let i = 0; i < 4; i++) {
      const shunt = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.4, 0.52), mats.sinteredBronzeBushing);
      shunt.position.set(-16.0 + i * 3.8, -19.5, 0.1);
      g.add(shunt);
    }

    parts.push(
      finalizeMainboardAuditPart(
        'mb-ina-fuel-gauge-ic',
        59,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, -20.6),
        new THREE.Vector3(-56, -54, -38),
        cp,
        0.28
      )
    );
  }

  // M60. NP-FZ100 Main Input 5A Fast-Blow Ceramic Chip Fuse & Reverse-Polarity Protection MOSFET Stage
  {
    const g = new THREE.Group();
    // White alumina ceramic 5A chip fuse with silver end caps
    const fuseBody = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 1.35), mats.ceramicAlumina);
    fuseBody.position.set(-28.5, -23.5, 0);
    for (const sx of [-1.85, 1.85]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.85, 2.32, 1.42), mats.silverElectrode);
      cap.position.set(-28.5 + sx, -23.5, 0);
      g.add(cap);
    }
    // Dual back-to-back low-RDS(on) protection MOSFETs
    for (const mx of [-22.5, -18.2]) {
      const fet = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.4, 0.85), mats.icEpoxy);
      fet.position.set(mx, -23.8, 0.1);
      g.add(fet);
    }
    g.add(fuseBody);

    parts.push(
      finalizeMainboardAuditPart(
        'mb-5a-fuse-rev-mosfet',
        60,
        '#ef4444',
        g,
        new THREE.Vector3(0, 0, -20.8),
        new THREE.Vector3(-72, -52, -62),
        cp,
        0.28
      )
    );
  }

  return parts;
}
