import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { MAINBOARD_EXPLANATIONS } from './mainboardExplanations';
import { buildMainboardMicroParts } from './mainboardMicroParts';
import { buildMainboardUltraAuditParts } from './mainboardUltraAuditParts';

export interface MainboardDynamicRig {
  npuSystolicGlow: THREE.Mesh;
  ispActiveGlow: THREE.Mesh;
  cfexActivityLed: THREE.Mesh;
  applyDynamics: (elapsed: number, physicsActive: boolean) => void;
}

/**
 * Create the signature asymmetrical flagship mirrorless motherboard PCB silhouette
 * (92 x 64 mm with top-center EVF optical tunnel notch & lower tripod clearance chamfer).
 */
function createMotherboardShape(w = 92.0, h = 64.0, r = 3.2): THREE.Shape {
  const hw = w / 2;
  const hh = h / 2;
  const notchHW = 12.6;
  const notchY = hh - 10.8;
  const nr = 2.2;

  const s = new THREE.Shape();
  // Start bottom-left corner, counter-clockwise
  s.moveTo(-hw + r, -hh);
  s.lineTo(hw - r, -hh);
  s.quadraticCurveTo(hw, -hh, hw, -hh + r);
  s.lineTo(hw, hh - r);
  s.quadraticCurveTo(hw, hh, hw - r, hh);
  // Top-right -> EVF top-center recess notch -> top-left
  s.lineTo(notchHW + nr, hh);
  s.quadraticCurveTo(notchHW, hh, notchHW, hh - nr);
  s.lineTo(notchHW, notchY + nr);
  s.quadraticCurveTo(notchHW, notchY, notchHW - nr, notchY);
  s.lineTo(-notchHW + nr, notchY);
  s.quadraticCurveTo(-notchHW, notchY, -notchHW, notchY + nr);
  s.lineTo(-notchHW, hh - nr);
  s.quadraticCurveTo(-notchHW, hh, -notchHW - nr, hh);
  s.lineTo(-hw + r, hh);
  s.quadraticCurveTo(-hw, hh, -hw, hh - r);
  s.lineTo(-hw, -hh + r);
  s.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
  return s;
}

function finalizeMainboardPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  integratedExplodeOffset: THREE.Vector3,
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
    integratedExplodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: MAINBOARD_EXPLANATIONS[id],
  };
}

/**
 * Build all 30 ultra-detailed CAD sub-assemblies of a 2024-2026 Flagship Mirrorless
 * Image Processing Engine & 12-Layer Any-Layer HDI Mainboard positioned directly behind
 * the 5-Axis IBIS Sensor Module (z = -15.6 .. -28.8 mm, rear component side faces -Z).
 */
export function buildMainboardParts(
  mats: MaterialLibrary
): { parts: CadPart[]; rig: MainboardDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const boardMountHoles: Array<[number, number]> = [
    [-41.5, 27.5],
    [41.5, 27.5],
    [-41.5, -27.5],
    [41.5, -27.5],
    [-20.5, 27.5],
    [16.5, -27.8],
  ];

  // =========================================================================
  // M01. Two-Phase Copper Vapor Chamber, Heat Pipe & Pyrolytic Graphite Module (z = -27.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sculpted precision flagship copper vapor chamber (stepped over ISP + LPDDR5X hotspots
    // while leaving AI NPU, PMIC inductors, C2PA/TCXO, and EVF notch clearly visible!)
    const vcShape = createRoundedRectShape(34.0, 29.0, 3.2);
    const vcPlate = new THREE.Mesh(
      extrudeCentered(vcShape, 1.0, 0.14, 0.14, 18),
      mats.vaporChamberCopper
    );
    vcPlate.position.set(-4.5, -1.0, 0);
    g.add(vcPlate);

    // Sleek secondary copper thermal bridge finger reaching across to AI NPU hotspot
    const npuBridge = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 9.5, 2.0), 0.85, 0.1, 0.1, 14),
      mats.vaporChamberCopper
    );
    npuBridge.position.set(18.0, 6.5, 0.05);
    g.add(npuBridge);

    // Embossed internal capillary micro-pillar dimple matrix on rear (-Z) face of vapor chamber
    const dimpleGeo = new THREE.CylinderGeometry(0.58, 0.68, 0.22, 10);
    dimpleGeo.rotateX(Math.PI / 2);
    for (let dx = -17.5; dx <= 8.5; dx += 5.2) {
      for (let dy = -11.5; dy <= 9.5; dy += 5.2) {
        const dimple = new THREE.Mesh(dimpleGeo, mats.copperHeatSpreader);
        dimple.position.set(dx, dy, -0.56);
        dimple.userData.noEdges = true;
        g.add(dimple);
      }
    }

    // Flattened sintered copper heat-pipe thermal bridge routing heat down to tripod/chassis mount
    const pipePath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(3.0, -1.5, -0.52),
      new THREE.Vector3(2.5, -13.5, -0.56),
      new THREE.Vector3(-6.0, -24.0, -0.56),
      new THREE.Vector3(-24.0, -26.5, -0.56),
    ]);
    const pipeGeo = new THREE.TubeGeometry(pipePath, 28, 1.35, 12, false);
    pipeGeo.scale(1, 1, 0.46);
    const heatPipe = new THREE.Mesh(pipeGeo, mats.vaporChamberCopper);
    g.add(heatPipe);

    // High-conductivity Pyrolytic Graphite Sheet (PGS) heat spreader wing tucked cleanly on upper-right PCB lobe (clear of EVF notch!)
    const pgsShape = createRoundedRectShape(23.0, 7.6, 1.8);
    const pgsWing = new THREE.Mesh(
      extrudeCentered(pgsShape, 0.22, 0.02, 0.02, 14),
      mats.pyroGraphite
    );
    pgsWing.position.set(-29.0, 23.6, -0.2);
    g.add(pgsWing);

    // Vivid Pink & Sky-Blue Silicone Thermal Interface Pads (TIM) on inner (+Z) face pressing onto ICs!
    const timIsp = new THREE.Mesh(new THREE.BoxGeometry(15.5, 15.5, 0.72), mats.thermalPadPink);
    timIsp.position.set(3.5, -1.5, 0.88);
    const timNpu = new THREE.Mesh(new THREE.BoxGeometry(9.6, 9.6, 0.72), mats.thermalPadPink);
    timNpu.position.set(22.5, 6.5, 0.88);
    const timDram1 = new THREE.Mesh(new THREE.BoxGeometry(9.2, 12.0, 0.72), mats.thermalPadBlue);
    timDram1.position.set(-14.2, 8.5, 0.88);
    const timDram2 = new THREE.Mesh(new THREE.BoxGeometry(9.2, 12.0, 0.72), mats.thermalPadBlue);
    timDram2.position.set(-14.2, -9.5, 0.88);
    g.add(timIsp, timNpu, timDram1, timDram2);

    // 4 perimeter spring-loaded retention screws
    for (const [sx, sy] of [
      [-18.8, 10.8],
      [9.8, 10.8],
      [-18.8, -12.8],
      [9.8, -12.8],
    ] as Array<[number, number]>) {
      const screw = createPrecisionScrew(1.25, 0.42, 1.0, mats.stainlessMachined);
      screw.rotation.x = Math.PI; // Head faces -Z rear side
      screw.position.set(sx, sy, -0.54);
      g.add(screw);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-vapor-chamber',
        1,
        '#d97d4e',
        g,
        new THREE.Vector3(0, 0, -27.4),
        new THREE.Vector3(0, 0, -54.0),
        new THREE.Vector3(0, 0, -190.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M02. Multi-Compartment Nickel-Silver EMI/RF Shielding Frame (z = -24.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision stamped EMI shield perimeter wall + internal compartment dividers
    // Open relief windows over ISP & AI NPU allow direct thermal pad contact & visual die inspection!
    const emiOuter = createFrameShape(54.0, 39.0, 2.6, 18.6, 18.6, 1.0, -1.0, 1.5);
    // Secondary relief cutout over AI NPU bay
    const npuWin = new THREE.Path();
    npuWin.moveTo(13.5, 0.8);
    npuWin.lineTo(24.5, 0.8);
    npuWin.lineTo(24.5, 11.8);
    npuWin.lineTo(13.5, 11.8);
    npuWin.closePath();
    emiOuter.holes.push(npuWin);
    // Relief cutout over LPDDR5X DRAM bay
    const dramWin = new THREE.Path();
    dramWin.moveTo(-23.0, -14.5);
    dramWin.lineTo(-11.5, -14.5);
    dramWin.lineTo(-11.5, 14.5);
    dramWin.lineTo(-23.0, 14.5);
    dramWin.closePath();
    emiOuter.holes.push(dramWin);

    const emiTop = new THREE.Mesh(
      extrudeCentered(emiOuter, 0.32, 0.04, 0.04, 14),
      mats.emiShieldCan
    );
    emiTop.position.set(3.5, -0.5, -0.95);
    g.add(emiTop);

    // Side fence walls descending toward PCB (+Z) to form true Faraday cage compartments
    const wallSpecs: Array<[number, number, number, number]> = [
      [3.5, 18.8, 53.6, 0.45], // Top outer fence
      [3.5, -19.8, 53.6, 0.45], // Bottom outer fence
      [-23.2, -0.5, 0.45, 38.6], // Right (-X) outer fence
      [30.2, -0.5, 0.45, 38.6], // Left (+X) outer fence
      [-7.8, -0.5, 0.42, 37.8], // Divider between DRAM and ISP
      [14.8, -0.5, 0.42, 37.8], // Divider between ISP and AI NPU / C2PA
    ];
    for (const [wx, wy, ww, wh] of wallSpecs) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(ww, wh, 2.2), mats.emiShieldCan);
      wall.position.set(wx, wy, 0.15);
      g.add(wall);
    }

    // Gold-plated BeCu EMI grounding contact finger springs around shield perimeter
    for (let gx = -18; gx <= 25; gx += 7.2) {
      for (const gy of [19.1, -20.1]) {
        const clip = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.45, 1.3), mats.goldPlating);
        clip.position.set(gx, gy, 0.65);
        g.add(clip);
      }
    }

    // Separate miniature RF shield cap over Wi-Fi 6E/7 module (upper-left +X,+Y)
    const rfCap = new THREE.Mesh(new THREE.BoxGeometry(13.2, 11.2, 1.5), mats.emiShieldCan);
    rfCap.position.set(24.0, 22.2, 0.55);
    g.add(rfCap);

    parts.push(
      finalizeMainboardPart(
        'mb-emi-shield',
        2,
        '#c2cbd6',
        g,
        new THREE.Vector3(0, 0, -24.6),
        new THREE.Vector3(0, 0, -40.5),
        new THREE.Vector3(0, 0, -178.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M03. ISP Main Engine Nickel-Plated Copper IHS Lid & Thermal Gel (z = -23.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision stepped nickel-plated copper Integrated Heat Spreader over ISP SoC
    const baseRim = createFrameShape(19.2, 19.2, 1.2, 15.0, 15.0, 0.7);
    const rimMesh = new THREE.Mesh(
      extrudeCentered(baseRim, 0.95, 0.08, 0.08, 16),
      mats.stainlessMachined
    );
    rimMesh.position.set(3.5, -1.5, 0.42);
    g.add(rimMesh);

    const topPlateShape = createRoundedRectShape(16.6, 16.6, 1.0);
    const topPlate = new THREE.Mesh(
      extrudeCentered(topPlateShape, 0.58, 0.08, 0.08, 16),
      mats.neodymiumMagnet
    );
    topPlate.position.set(3.5, -1.5, -0.25);
    g.add(topPlate);

    // Subtle exposed copper inner thermal spreader core rim
    const cuCore = new THREE.Mesh(
      new THREE.BoxGeometry(14.4, 13.4, 0.36),
      mats.vaporChamberCopper
    );
    cuCore.position.set(3.5, -1.5, 0.22);
    g.add(cuCore);

    // Thin translucent sky-blue high-k thermal gel interface film on underside (+Z)
    const gel = new THREE.Mesh(
      new THREE.BoxGeometry(13.2, 12.0, 0.16),
      mats.thermalPadBlue
    );
    gel.position.set(3.5, -1.5, 0.48);
    g.add(gel);

    parts.push(
      finalizeMainboardPart(
        'mb-isp-ihs',
        3,
        '#9aa5b5',
        g,
        new THREE.Vector3(0, 0, -23.4),
        new THREE.Vector3(0, 0, -29.0),
        new THREE.Vector3(0, 0, -169.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M04. 4nm Flagship Main Image Processing Engine (ISP) Bare Silicon Die (z = -22.2 mm)
  // =========================================================================
  let ispActiveGlow!: THREE.Mesh;
  {
    const g = new THREE.Group();

    // Bare 4nm silicon bulk die body (13.8 x 12.6 x 0.72 mm)
    const dieBulk = new THREE.Mesh(
      new THREE.BoxGeometry(13.8, 12.6, 0.68),
      mats.siliconBulk
    );
    dieBulk.position.set(3.5, -1.5, 0.05);
    g.add(dieBulk);

    // Iridescent metallic lithography active floorplan face facing -Z (rear inspection side!)
    const dieFace = new THREE.Mesh(
      new THREE.PlaneGeometry(13.5, 12.3),
      mats.ispSiliconDie
    );
    dieFace.rotation.y = Math.PI; // Normal points -Z toward viewer
    dieFace.position.set(3.5, -1.5, -0.31);
    dieFace.userData.noEdges = true;
    g.add(dieFace);

    // Perimeter metallic silicon bevel collar
    const collarShape = createFrameShape(14.1, 12.9, 0.35, 13.5, 12.3, 0.2);
    const collar = new THREE.Mesh(
      extrudeCentered(collarShape, 0.76, 0.04, 0.04, 10),
      mats.goldPlating
    );
    collar.position.set(3.5, -1.5, 0.02);
    g.add(collar);

    // Subtle live pipeline pulse frame (activates during physics simulation)
    ispActiveGlow = new THREE.Mesh(
      new THREE.RingGeometry(6.8, 7.35, 4),
      new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        clippingPlanes: cp,
      })
    );
    ispActiveGlow.rotation.z = Math.PI / 4;
    ispActiveGlow.position.set(3.5, -1.5, -0.38);
    ispActiveGlow.userData.noEdges = true;
    g.add(ispActiveGlow);

    parts.push(
      finalizeMainboardPart(
        'mb-isp-die',
        4,
        '#0f766e',
        g,
        new THREE.Vector3(0, 0, -22.2),
        new THREE.Vector3(0, 0, -18.5),
        new THREE.Vector3(0, 0, -160.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M05. Flip-Chip BGA ABF Organic Interposer Substrate & Micro-Bumps (z = -20.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Multi-layer ABF build-up organic package substrate (20.5 x 20.5 x 1.05 mm)
    const subShape = createRoundedRectShape(20.5, 20.5, 0.9);
    const subMesh = new THREE.Mesh(
      extrudeCentered(subShape, 0.96, 0.06, 0.06, 12),
      mats.abfSubstrate
    );
    subMesh.position.set(3.5, -1.5, 0);
    g.add(subMesh);

    // Epoxy silica-filled capillary underfill fillet framing silicon die footprint
    const filletShape = createFrameShape(14.8, 13.6, 0.4, 13.4, 12.2, 0.2);
    const fillet = new THREE.Mesh(
      extrudeCentered(filletShape, 0.42, 0.06, 0.06, 10),
      mats.icEpoxy
    );
    fillet.position.set(3.5, -1.5, -0.58);
    g.add(fillet);

    // Top-side 01005 silicon decoupling MLCC capacitors ringing the ISP die
    for (let i = -3; i <= 3; i++) {
      for (const sy of [-8.6, 8.6]) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.62, 0.42), mats.smdCeramic);
        cap.position.set(3.5 + i * 2.1, -1.5 + sy, -0.64);
        cap.userData.noEdges = true;
        g.add(cap);
      }
      for (const sx of [-8.6, 8.6]) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.2, 0.42), mats.smdCeramic);
        cap.position.set(3.5 + sx, -1.5 + i * 2.1, -0.64);
        cap.userData.noEdges = true;
        g.add(cap);
      }
    }

    // Upper micro-bump Copper Pillar array under die footprint (-Z face)
    const uBumpGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.34, 8);
    uBumpGeo.rotateX(Math.PI / 2);
    for (let bx = -5.4; bx <= 5.41; bx += 1.35) {
      for (let by = -4.8; by <= 4.81; by += 1.2) {
        const bump = new THREE.Mesh(uBumpGeo, mats.copperHybridBond);
        bump.position.set(3.5 + bx, -1.5 + by, -0.62);
        bump.userData.noEdges = true;
        g.add(bump);
      }
    }

    // Underside (+Z face) SnAgCu BGA Solder Ball Grid Array connecting to 12-Layer HDI PCB!
    const ballGeo = new THREE.SphereGeometry(0.32, 8, 6);
    for (let gx = -8.4; gx <= 8.41; gx += 1.4) {
      for (let gy = -8.4; gy <= 8.41; gy += 1.4) {
        // Leave realistic central thermal/ground island break
        if (Math.abs(gx) < 2.2 && Math.abs(gy) < 2.2 && (Math.round(gx * 10) + Math.round(gy * 10)) % 2 !== 0) {
          continue;
        }
        const ball = new THREE.Mesh(ballGeo, mats.solderBallSilver);
        ball.position.set(3.5 + gx, -1.5 + gy, 0.68);
        ball.userData.noEdges = true;
        g.add(ball);
      }
    }

    parts.push(
      finalizeMainboardPart(
        'mb-isp-interposer',
        5,
        '#164a41',
        g,
        new THREE.Vector3(0, 0, -20.8),
        new THREE.Vector3(0, 0, -9.0),
        new THREE.Vector3(0, 0, -151.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M06. Dedicated AI / NPU Deep-Learning Accelerator (Systolic Array) (z = -21.2 mm)
  // =========================================================================
  let npuSystolicGlow!: THREE.Mesh;
  {
    const g = new THREE.Group();
    const nx = 22.5;
    const ny = 6.5;

    // BGA ABF organic package substrate (13.2 x 13.2 mm)
    const sub = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(13.2, 13.2, 0.7), 0.72, 0.05, 0.05, 10),
      mats.abfSubstrate
    );
    sub.position.set(nx, ny, 0.45);
    g.add(sub);

    // Exposed bare AI NPU silicon die (9.6 x 9.6 mm) showcasing 2D Systolic Array MAC PE grid!
    const dieBody = new THREE.Mesh(new THREE.BoxGeometry(9.6, 9.6, 0.62), mats.siliconBulk);
    dieBody.position.set(nx, ny, -0.2);
    g.add(dieBody);

    const dieFace = new THREE.Mesh(new THREE.PlaneGeometry(9.3, 9.3), mats.npuSiliconDie);
    dieFace.rotation.y = Math.PI;
    dieFace.position.set(nx, ny, -0.53);
    dieFace.userData.noEdges = true;
    g.add(dieFace);

    // Gold perimeter frame + substrate micro-caps
    const rim = new THREE.Mesh(
      extrudeCentered(createFrameShape(9.9, 9.9, 0.25, 9.3, 9.3, 0.15), 0.66, 0.03, 0.03, 8),
      mats.goldPlating
    );
    rim.position.set(nx, ny, -0.2);
    g.add(rim);

    // BGA solder ball ring underneath
    const ballGeo = new THREE.SphereGeometry(0.26, 8, 6);
    for (let bx = -5.2; bx <= 5.21; bx += 1.3) {
      for (let by = -5.2; by <= 5.21; by += 1.3) {
        if (Math.abs(bx) < 3.6 && Math.abs(by) < 3.6) continue;
        const ball = new THREE.Mesh(ballGeo, mats.solderBallSilver);
        ball.position.set(nx + bx, ny + by, 0.96);
        ball.userData.noEdges = true;
        g.add(ball);
      }
    }

    // Pulsing violet systolic-array inference indicator ring
    npuSystolicGlow = new THREE.Mesh(
      new THREE.RingGeometry(4.9, 5.4, 4),
      new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        clippingPlanes: cp,
      })
    );
    npuSystolicGlow.rotation.z = Math.PI / 4;
    npuSystolicGlow.position.set(nx, ny, -0.6);
    npuSystolicGlow.userData.noEdges = true;
    g.add(npuSystolicGlow);

    parts.push(
      finalizeMainboardPart(
        'mb-ai-npu',
        6,
        '#6d28d9',
        g,
        new THREE.Vector3(0, 0, -21.2),
        new THREE.Vector3(5.5, 2.5, -18.0),
        new THREE.Vector3(4.0, 2.0, -158.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M07. Quad-Channel LPDDR5X-8533 High-Speed Frame Buffer DRAM x 2 (z = -21.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const buildLpddr5xPackage = (x: number, y: number) => {
      const sub = new THREE.Group();
      sub.position.set(x, y, 0);

      // Multi-die stacked FBGA molding package (10.8 x 13.6 x 1.05 mm)
      const pkg = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(10.8, 13.6, 0.45), 1.02, 0.06, 0.06, 10),
        mats.icEpoxy
      );
      sub.add(pkg);

      // Laser-etched pin-1 orientation gold dot + subtle die-stack metallic step rim
      const pinDot = new THREE.Mesh(new THREE.CircleGeometry(0.55, 14), mats.goldPlating);
      pinDot.rotation.y = Math.PI;
      pinDot.position.set(3.8, 5.0, -0.53);
      pinDot.userData.noEdges = true;
      sub.add(pinDot);

      const carrier = new THREE.Mesh(new THREE.BoxGeometry(11.1, 13.9, 0.28), mats.abfSubstrate);
      carrier.position.z = 0.54;
      sub.add(carrier);

      // Perimeter BGA balls
      const bGeo = new THREE.SphereGeometry(0.22, 8, 6);
      for (let bx = -4.2; bx <= 4.21; bx += 1.4) {
        for (let by = -5.6; by <= 5.61; by += 1.4) {
          if (Math.abs(bx) < 2.6 && Math.abs(by) < 3.6) continue;
          const b = new THREE.Mesh(bGeo, mats.solderBallSilver);
          b.position.set(bx, by, 0.8);
          b.userData.noEdges = true;
          sub.add(b);
        }
      }

      // Flanking high-frequency decoupling MLCC strip
      for (let cy = -5.0; cy <= 5.0; cy += 2.0) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.15, 0.55), mats.smdCeramic);
        cap.position.set(6.2, cy, 0.45);
        cap.userData.noEdges = true;
        sub.add(cap);
      }

      return sub;
    };

    g.add(buildLpddr5xPackage(-14.2, 8.5));
    g.add(buildLpddr5xPackage(-14.2, -9.5));

    parts.push(
      finalizeMainboardPart(
        'mb-lpddr5x',
        7,
        '#2b3545',
        g,
        new THREE.Vector3(0, 0, -21.0),
        new THREE.Vector3(-4.5, 0, -11.5),
        new THREE.Vector3(-4.0, 0, -152.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M08. Multi-Phase Synchronous Buck PMIC & High-Current VRM Bank (z = -21.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Main Digital PMIC QFN/BGA IC
    const pmic = new THREE.Mesh(new THREE.BoxGeometry(7.6, 7.6, 0.95), mats.icEpoxy);
    pmic.position.set(1.0, -21.5, 0.25);
    g.add(pmic);
    const pmicDot = new THREE.Mesh(new THREE.CircleGeometry(0.42, 12), mats.goldPlating);
    pmicDot.rotation.y = Math.PI;
    pmicDot.position.set(3.5, -18.8, -0.25);
    pmicDot.userData.noEdges = true;
    g.add(pmicDot);

    // 6 Sculpted Molded Ferrite Power Choke Inductors (multi-phase buck stages!)
    const indCoords: Array<[number, number]> = [
      [8.0, -18.8],
      [12.6, -18.8],
      [17.2, -18.8],
      [8.0, -23.8],
      [12.6, -23.8],
      [17.2, -23.8],
    ];
    for (const [ix, iy] of indCoords) {
      const body = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.5, 3.5, 0.45), 1.85, 0.08, 0.08, 10),
        mats.ferriteInductor
      );
      body.position.set(ix, iy, -0.15);
      g.add(body);

      // Dual silver solderable end-cap terminals
      for (const tx of [-1.72, 1.72]) {
        const term = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.2, 1.25), mats.silverElectrode);
        term.position.set(ix + tx, iy, 0.15);
        g.add(term);
      }
    }

    // 3 Vivid Yellow Polymer Tantalum Bulk Output Filter Capacitors
    for (const ty of [-18.5, -21.6, -24.7]) {
      const tant = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.1, 1.45), mats.tantalumCapYellow);
      tant.position.set(-6.2, ty, 0.0);
      g.add(tant);
      // Anode polarity bar + silver leads
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.12, 0.12), mats.coaxShieldCopper);
      bar.position.set(-4.7, ty, -0.74);
      bar.userData.noEdges = true;
      g.add(bar);
      for (const tx of [-1.92, 1.92]) {
        const lead = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.4, 1.15), mats.silverElectrode);
        lead.position.set(-6.2 + tx, ty, 0.18);
        g.add(lead);
      }
    }

    parts.push(
      finalizeMainboardPart(
        'mb-pmic-vrm',
        8,
        '#e3a82b',
        g,
        new THREE.Vector3(0, 0, -21.2),
        new THREE.Vector3(0, -6.5, -10.5),
        new THREE.Vector3(0, -5.5, -148.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M09. Dual CFexpress 4.0 Type B (PCIe Gen4 x2) & SD UHS-II Card Cage (z = -22.8 mm)
  // =========================================================================
  let cfexActivityLed!: THREE.Mesh;
  {
    const g = new THREE.Group();

    // Upper Main Slot: CFexpress 4.0 Type B Stainless Steel Cage (24 x 33 x 4.4 mm, opens toward -X)
    const cfeTop = new THREE.Mesh(new THREE.BoxGeometry(24.0, 32.0, 0.42), mats.emiShieldCan);
    cfeTop.position.set(-34.2, 2.5, -2.0);
    const cfeSide1 = new THREE.Mesh(new THREE.BoxGeometry(24.0, 0.55, 4.1), mats.emiShieldCan);
    cfeSide1.position.set(-34.2, 18.2, 0.0);
    const cfeSide2 = new THREE.Mesh(new THREE.BoxGeometry(24.0, 0.55, 4.1), mats.emiShieldCan);
    cfeSide2.position.set(-34.2, -13.2, 0.0);
    const cfeBack = new THREE.Mesh(new THREE.BoxGeometry(2.4, 31.0, 3.8), mats.icEpoxy);
    cfeBack.position.set(-23.2, 2.5, 0.1);
    g.add(cfeTop, cfeSide1, cfeSide2, cfeBack);

    // 28 Gold PCIe Gen4 Edge Contact Pins visible inside the CFexpress 4.0 slot header!
    for (let py = -10.2; py <= 15.2; py += 1.25) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.45, 0.25), mats.goldPlating);
      pin.position.set(-25.8, py, 0.35);
      pin.userData.noEdges = true;
      g.add(pin);
    }

    // Inserted sleek cutaway CFexpress 4.0 Type B card edge peeking out cleanly at -X lip
    const cardBody = new THREE.Mesh(new THREE.BoxGeometry(19.5, 29.2, 2.6), mats.matteBlackAnodized);
    cardBody.position.set(-36.4, 2.5, -0.1);
    const cardStripe = new THREE.Mesh(new THREE.BoxGeometry(1.6, 28.8, 2.66), mats.goldPlating);
    cardStripe.position.set(-44.6, 2.5, -0.1);
    g.add(cardBody, cardStripe);

    // Secondary lower SDXC UHS-II Card Cage bracket
    const sdCage = new THREE.Mesh(new THREE.BoxGeometry(21.5, 9.2, 2.8), mats.stainlessMachined);
    sdCage.position.set(-35.2, -19.2, 0.6);
    g.add(sdCage);

    // Dedicated PCIe Gen4 x2 Redriver / Switch IC right above card cage
    const pcieIc = new THREE.Mesh(new THREE.BoxGeometry(5.6, 5.6, 0.8), mats.icEpoxy);
    pcieIc.position.set(-25.0, 22.8, 1.9);
    g.add(pcieIc);

    // Subtle amber NVMe write activity indicator LED
    cfexActivityLed = new THREE.Mesh(
      new THREE.SphereGeometry(0.65, 10, 8),
      new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.25,
        clippingPlanes: cp,
      })
    );
    cfexActivityLed.position.set(-24.2, 16.2, -2.35);
    cfexActivityLed.userData.noEdges = true;
    g.add(cfexActivityLed);

    parts.push(
      finalizeMainboardPart(
        'mb-cfexpress',
        9,
        '#98a2b0',
        g,
        new THREE.Vector3(0, 0, -22.8),
        new THREE.Vector3(-12.5, 0, -15.0),
        new THREE.Vector3(-11.0, 0, -156.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M10. 6-Axis Quartz MEMS Gyro/Accel IMU & Real-Time IBIS/Lens MCU (z = -20.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision ceramic-packaged 6-Axis Quartz MEMS IMU with gold lid
    const imuBase = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.8, 1.25), mats.ceramicAlumina);
    imuBase.position.set(-18.5, -23.0, 0.05);
    const imuLid = new THREE.Mesh(new THREE.BoxGeometry(4.3, 4.3, 0.24), mats.goldPlating);
    imuLid.position.set(-18.5, -23.0, -0.62);
    g.add(imuBase, imuLid);

    // Dedicated 32-bit Real-Time Control MCU (drives 2,000 Hz IBIS & Lens OIS servo loop)
    const mcu = new THREE.Mesh(new THREE.BoxGeometry(6.8, 6.8, 0.95), mats.icEpoxy);
    mcu.position.set(-11.4, -23.2, 0.2);
    g.add(mcu);
    // Fine gull-wing QFP lead frames around MCU perimeter
    for (let k = -2.6; k <= 2.61; k += 0.65) {
      const leadH1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.65, 0.16), mats.silverElectrode);
      leadH1.position.set(-11.4 + k, -23.2 + 3.65, 0.58);
      const leadH2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.65, 0.16), mats.silverElectrode);
      leadH2.position.set(-11.4 + k, -23.2 - 3.65, 0.58);
      leadH1.userData.noEdges = true;
      leadH2.userData.noEdges = true;
      g.add(leadH1, leadH2);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-imu-mcu',
        10,
        '#d4a948',
        g,
        new THREE.Vector3(0, 0, -20.8),
        new THREE.Vector3(-3.5, -6.5, -9.5),
        new THREE.Vector3(-3.0, -5.5, -146.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M11. C2PA Hardware Security Chip & ±0.5 ppm TCXO Master Clock (z = -20.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // C2PA Hardware Security Element (tamper-resistant cryptographic signing IC)
    const hsePkg = new THREE.Mesh(new THREE.BoxGeometry(5.6, 5.6, 0.92), mats.icEpoxy);
    hsePkg.position.set(20.2, -6.8, 0.2);
    const hseShieldDot = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.14), mats.goldPlating);
    hseShieldDot.position.set(20.2, -6.8, -0.3);
    g.add(hsePkg, hseShieldDot);

    // ±0.5 ppm Temperature-Compensated Quartz Crystal Oscillator (TCXO) metallic gold canister
    const tcxoBase = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.4, 0.8), mats.ceramicAlumina);
    tcxoBase.position.set(26.8, -6.5, 0.22);
    const tcxoCan = new THREE.Mesh(new THREE.BoxGeometry(4.1, 3.1, 0.55), mats.goldPlating);
    tcxoCan.position.set(26.8, -6.5, -0.35);
    g.add(tcxoBase, tcxoCan);

    // Secondary 32.768 kHz ultra-low-drift tuning-fork quartz RTC crystal resonator
    const xtalBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.5, 0.65), mats.ceramicAlumina);
    xtalBase.position.set(26.8, -9.8, 0.28);
    const xtalLid = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.25, 0.26), mats.silverElectrode);
    xtalLid.position.set(26.8, -9.8, -0.14);
    g.add(xtalBase, xtalLid);

    parts.push(
      finalizeMainboardPart(
        'mb-security-clock',
        11,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, -20.8),
        new THREE.Vector3(3.5, -3.0, -9.5),
        new THREE.Vector3(3.0, -2.5, -146.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M12. Pro External I/O Port Cluster (2.5GbE LAN / USB-C 10Gbps / ESD Array) (z = -22.2 mm)
  // (HDMI 2.1 daughterboard decoupled into M19; 3.5mm Audio Jack board decoupled into M20)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 1. 2.5GBASE-T Wired RJ45 Ethernet Jack (with integrated magnetic transformer shell)
    const rjShell = new THREE.Mesh(new THREE.BoxGeometry(12.4, 13.4, 7.6), mats.stainlessMachined);
    rjShell.position.set(40.4, 15.8, -1.6);
    const rjCavity = new THREE.Mesh(new THREE.BoxGeometry(1.2, 9.8, 5.4), mats.icEpoxy);
    rjCavity.position.set(46.3, 15.8, -1.6);
    g.add(rjShell, rjCavity);
    for (let k = -3.2; k <= 3.21; k += 0.92) {
      const rjPin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.28, 0.35), mats.goldPlating);
      rjPin.position.set(45.2, 15.8 + k, -3.5);
      rjPin.userData.noEdges = true;
      g.add(rjPin);
    }

    // Dedicated 2.5GBASE-T Ethernet PHY + Magnetics Controller IC beside RJ45
    const ethPhy = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.8, 0.85), mats.icEpoxy);
    ethPhy.position.set(31.8, 15.8, 1.75);
    const ethDot = new THREE.Mesh(new THREE.CircleGeometry(0.32, 10), mats.goldPlating);
    ethDot.rotation.y = Math.PI;
    ethDot.position.set(33.4, 17.4, 1.3);
    ethDot.userData.noEdges = true;
    g.add(ethPhy, ethDot);

    // 2. USB Type-C 3.2 Gen 2 (10 Gbps + USB-PD) Shielded Receptacle
    const usbcGeo = extrudeCentered(createRoundedRectShape(8.8, 3.2, 1.45), 10.2, 0.06, 0.06, 14);
    usbcGeo.rotateY(Math.PI / 2);
    usbcGeo.rotateX(Math.PI / 2);
    const usbc = new THREE.Mesh(usbcGeo, mats.stainlessMachined);
    usbc.position.set(41.2, -10.8, 0.3);
    const usbcTongue = new THREE.Mesh(new THREE.BoxGeometry(2.4, 6.2, 0.65), mats.icEpoxy);
    usbcTongue.position.set(45.2, -10.8, 0.3);
    g.add(usbc, usbcTongue);

    // 3. ESD TVS Surge Protection Diode Array guarding RJ45 & USB-C ports
    for (const ey of [11.5, 16.0, 20.5, -8.5, -13.0]) {
      const esd = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.4, 0.55), mats.icEpoxy);
      esd.position.set(33.4, ey, 1.85);
      esd.userData.noEdges = true;
      g.add(esd);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-io-ports',
        12,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -22.2),
        new THREE.Vector3(12.5, 0, -12.0),
        new THREE.Vector3(11.0, 0, -150.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M13. Wi-Fi 6E / Wi-Fi 7 (2x2 MIMO) & Bluetooth 5.3 RF Module + Coax (z = -21.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Shielded Tri-Band RF SiP Module (12.4 x 10.4 x 1.5 mm)
    const rfBase = new THREE.Mesh(new THREE.BoxGeometry(12.4, 10.4, 0.45), mats.abfSubstrate);
    rfBase.position.set(24.0, 22.2, 0.65);
    const rfCan = new THREE.Mesh(new THREE.BoxGeometry(11.6, 9.6, 1.15), mats.emiShieldCan);
    rfCan.position.set(24.0, 22.2, -0.12);
    g.add(rfBase, rfCan);

    // Ceramic 6 GHz / 5 GHz Bandpass Filters
    for (const fy of [19.4, 24.8]) {
      const flt = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 0.65), mats.pztCeramic);
      flt.position.set(16.2, fy, 0.5);
      g.add(flt);
    }

    // Dual Gold U.FL / IPEX Micro-Coaxial Connectors + 50-ohm Copper Coax Jumpers (2x2 MIMO!)
    for (const [uy, tx, ty] of [
      [25.6, 13.5, 30.2],
      [18.8, 32.8, 29.8],
    ] as Array<[number, number, number]>) {
      const uflGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.9, 14);
      uflGeo.rotateX(Math.PI / 2);
      const ufl = new THREE.Mesh(uflGeo, mats.goldPlating);
      ufl.position.set(16.6, uy, 0.15);
      g.add(ufl);

      const coaxPath = new THREE.CatmullRomCurve3([
        new THREE.Vector3(16.6, uy, -0.25),
        new THREE.Vector3((16.6 + tx) * 0.5, uy + 2.8, -0.7),
        new THREE.Vector3(tx, ty, -0.35),
      ]);
      const coax = new THREE.Mesh(
        new THREE.TubeGeometry(coaxPath, 16, 0.38, 8, false),
        mats.coaxShieldCopper
      );
      g.add(coax);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-rf-wifi',
        13,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, -21.0),
        new THREE.Vector3(6.0, 7.0, -13.0),
        new THREE.Vector3(5.5, 6.0, -154.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M14. 12-Layer Any-Layer HDI Main Motherboard PCB (z = -19.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const pcbShape = createMotherboardShape(92.0, 64.0, 3.2);
    addCircleHoles(
      pcbShape,
      boardMountHoles.map(([hx, hy]) => [hx, hy, 1.55])
    );

    // Extruded PCB body using multi-material: [0] = top/bottom emerald HDI traces, [1] = 12-layer copper edge laminate!
    const pcbGeo = extrudeCentered(pcbShape, 1.48, 0.05, 0.05, 16);
    // Normalize face UVs so the procedural high-speed trace canvas spans [0..1] neatly across 92x64 mm
    const pos = pcbGeo.attributes.position;
    const uv = pcbGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(i, (pos.getX(i) + 46.0) / 92.0, (pos.getY(i) + 32.0) / 64.0);
    }
    uv.needsUpdate = true;

    const pcbMesh = new THREE.Mesh(pcbGeo, [mats.hdiMainboardPcb, mats.pcbEdgeLaminate]);
    g.add(pcbMesh);

    // Gold ENIG plated mounting hole grounding rings (6 points)
    const ringGeo = new THREE.RingGeometry(1.55, 2.75, 22);
    for (const [hx, hy] of boardMountHoles) {
      const rRear = new THREE.Mesh(ringGeo, mats.goldPlating);
      rRear.rotation.y = Math.PI;
      rRear.position.set(hx, hy, -0.78);
      rRear.userData.noEdges = true;
      const rFront = new THREE.Mesh(ringGeo, mats.goldPlating);
      rFront.position.set(hx, hy, 0.78);
      rFront.userData.noEdges = true;
      g.add(rRear, rFront);
    }

    // Perimeter 0201 SMD MLCC decoupling arrays along upper/lower PCB zones
    for (let sx = -10; sx <= 12; sx += 2.2) {
      const smd = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.55, 0.42), mats.smdCeramic);
      smd.position.set(sx, 16.5, -0.95);
      smd.userData.noEdges = true;
      g.add(smd);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-hdi-pcb',
        14,
        '#0e5a44',
        g,
        new THREE.Vector3(0, 0, -19.2),
        new THREE.Vector3(0, 0, 4.5),
        new THREE.Vector3(0, 0, -132.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M15. High-Density Board-to-Board SLVS-EC & ZIF FPC Connector Harness (12 Ports) (z = -17.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 1. Primary 80-Pin Shielded High-Speed SLVS-EC Sensor Mezzanine Receptacle (+Z sensor-facing!)
    const slvsShell = new THREE.Mesh(new THREE.BoxGeometry(26.5, 4.6, 1.45), mats.emiShieldCan);
    slvsShell.position.set(2.0, -2.0, 0.0);
    const slvsCore = new THREE.Mesh(new THREE.BoxGeometry(24.6, 2.4, 1.55), mats.icEpoxy);
    slvsCore.position.set(2.0, -2.0, 0.05);
    g.add(slvsShell, slvsCore);
    for (let px = -10.8; px <= 14.8; px += 0.9) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.6, 0.35), mats.goldPlating);
      p.position.set(px, -2.0, 0.72);
      p.userData.noEdges = true;
      g.add(p);
    }

    // Helper for ultra-crisp ZIF FPC connectors with ivory LCP housing + black flip-lock actuator + amber flex stub
    const addZifConnector = (
      x: number,
      y: number,
      z: number,
      len: number,
      vertical = false,
      flexDir: 1 | -1 = 1
    ) => {
      const cGrp = new THREE.Group();
      cGrp.position.set(x, y, z);
      if (vertical) cGrp.rotation.z = Math.PI / 2;

      const base = new THREE.Mesh(new THREE.BoxGeometry(len, 3.2, 1.15), mats.zifIvoryPlastic);
      const latch = new THREE.Mesh(new THREE.BoxGeometry(len - 0.6, 1.1, 0.52), mats.icEpoxy);
      latch.position.set(0, -0.55 * flexDir, 0.65);
      const flex = new THREE.Mesh(new THREE.BoxGeometry(len - 1.4, 4.6, 0.16), mats.polyimideFpc);
      flex.position.set(0, 3.2 * flexDir, 0.15);
      cGrp.add(base, latch, flex);
      g.add(cGrp);
    };

    // EVF MIPI-DSI ZIF x2 (flanking top EVF notch)
    addZifConnector(-24.0, 26.5, 0.0, 12.0, false, 1);
    addZifConnector(16.0, 26.5, 0.0, 11.0, false, 1);
    // Rear Vari-Angle LCD MIPI-DSI ZIF (rear side -Z)
    addZifConnector(0.0, -28.2, -2.6, 15.0, false, -1);
    // Lens Mount 12-Pin High-Speed Comm ZIF (front +Z)
    addZifConnector(22.5, 13.5, 0.0, 11.5, false, 1);
    // Shutter Dual-Drive & IR Sensor ZIF (front +Z)
    addZifConnector(22.5, -14.5, 0.0, 10.5, false, -1);
    // Top-Dial / Hot-Shoe / Shutter Release ZIFs
    addZifConnector(-34.5, 26.5, 0.0, 9.5, false, 1);
    addZifConnector(33.0, 26.5, 0.0, 9.5, false, 1);
    // Battery / Grip High-Current B2B Header (-X bottom)
    addZifConnector(-32.0, -26.5, 0.0, 13.5, false, -1);

    parts.push(
      finalizeMainboardPart(
        'mb-b2b-connectors',
        15,
        '#c76414',
        g,
        new THREE.Vector3(0, 0, -17.6),
        new THREE.Vector3(0, 0, 15.0),
        new THREE.Vector3(0, 0, -118.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M16. Front Thermal-Isolation Magnesium Structural Mid-Frame (z = -15.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Rigid die-cast magnesium mid-frame separating Sensor/IBIS bay from Mainboard bay
    const midShape = createMotherboardShape(95.0, 67.0, 3.8);
    // Central pass-through window for Sensor SLVS-EC U-loop flex & air-gap thermal isolation
    const slvsHole = new THREE.Path();
    slvsHole.moveTo(-13.0, -7.5);
    slvsHole.lineTo(17.0, -7.5);
    slvsHole.lineTo(17.0, 4.5);
    slvsHole.lineTo(-13.0, 4.5);
    slvsHole.closePath();
    midShape.holes.push(slvsHole);

    // Weight-relief stiffening pocket cutouts
    for (const [px, py, pw, ph] of [
      [-32.0, 0.0, 14.0, 28.0],
      [30.0, -14.0, 12.0, 16.0],
    ] as Array<[number, number, number, number]>) {
      const p = new THREE.Path();
      p.moveTo(px - pw / 2, py - ph / 2);
      p.lineTo(px + pw / 2, py - ph / 2);
      p.lineTo(px + pw / 2, py + ph / 2);
      p.lineTo(px - pw / 2, py + ph / 2);
      p.closePath();
      midShape.holes.push(p);
    }

    const frameMesh = new THREE.Mesh(
      extrudeCentered(midShape, 1.55, 0.14, 0.14, 18),
      mats.magnesiumCast
    );
    g.add(frameMesh);

    // 6 Stainless M1.6 Board Standoff Bosses facing Mainboard (-Z)
    const bossGeo = new THREE.CylinderGeometry(2.4, 2.7, 2.1, 16);
    bossGeo.rotateX(Math.PI / 2);
    for (const [hx, hy] of boardMountHoles) {
      const boss = new THREE.Mesh(bossGeo, mats.stainlessMachined);
      boss.position.set(hx, hy, -1.55);
      g.add(boss);
    }

    // Bottom Tripod Thermal-Coupling Brass Boss Insert
    const tripodBossGeo = new THREE.CylinderGeometry(4.2, 4.2, 3.2, 20);
    const tripodBoss = new THREE.Mesh(tripodBossGeo, mats.brassGear);
    tripodBoss.position.set(-2.0, -33.2, 0.0);
    g.add(tripodBoss);

    parts.push(
      finalizeMainboardPart(
        'mb-chassis-frame',
        16,
        '#7c8694',
        g,
        new THREE.Vector3(0, 0, -15.6),
        new THREE.Vector3(0, 0, 26.5),
        new THREE.Vector3(0, 0, -104.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M17. Internal Sintered Porous Copper Capillary Wick & Micro-Support Pillar Matrix (z = -26.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Porous sintered copper capillary wick core plate inside M01 vapor chamber
    const wickPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(31.2, 26.2, 2.6), 0.36, 0.04, 0.04, 14),
      mats.vaporWickCopper
    );
    wickPlate.position.set(-4.5, -1.0, 0);
    g.add(wickPlate);

    // Secondary capillary branch core reaching NPU thermal bridge
    const npuWick = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(14.2, 7.6, 1.4), 0.32, 0.03, 0.03, 10),
      mats.vaporWickCopper
    );
    npuWick.position.set(17.5, 6.5, 0);
    g.add(npuWick);

    // Sintered copper vapor-return micro-support pillar matrix (prevents vacuum collapse)
    const pillarGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.56, 8);
    pillarGeo.rotateX(Math.PI / 2);
    for (let px = -17.5; px <= 8.5; px += 4.3) {
      for (let py = -11.5; py <= 9.5; py += 4.2) {
        const pillar = new THREE.Mesh(pillarGeo, mats.copperHeatSpreader);
        pillar.position.set(px, py, -0.04);
        pillar.userData.noEdges = true;
        g.add(pillar);
      }
    }

    // Etched arterial vapor-flow channel rails
    for (const cy of [-7.5, -1.0, 5.5]) {
      const channel = new THREE.Mesh(new THREE.BoxGeometry(27.0, 0.55, 0.44), mats.copperHeatSpreader);
      channel.position.set(-4.5, cy, -0.08);
      channel.userData.noEdges = true;
      g.add(channel);
    }

    // Vacuum degassing & sealed pinch-off copper fill tube stub
    const fillTubeGeo = new THREE.CylinderGeometry(0.48, 0.48, 4.6, 10);
    fillTubeGeo.rotateZ(Math.PI / 2);
    const fillTube = new THREE.Mesh(fillTubeGeo, mats.vaporChamberCopper);
    fillTube.position.set(-22.0, -10.5, 0);
    g.add(fillTube);

    parts.push(
      finalizeMainboardPart(
        'mb-vapor-wick-core',
        17,
        '#b86332',
        g,
        new THREE.Vector3(0, 0, -26.6),
        new THREE.Vector3(0, 0, -48.0),
        new THREE.Vector3(0, 0, -185.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // M18. Rear RF Shield Structural Retaining Bracket & Threaded Heat-Transfer Tape (z = -28.8 mm)
  // (Sony A1 II / A7R VI Kolari Vision teardown signature architecture)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Full-width stamped stainless structural RF shield retaining frame with open relief bays
    const brkShape = createFrameShape(84.0, 54.0, 3.0, 36.0, 29.0, 2.0, -4.0, -1.0);
    // Secondary relief bay over CFexpress copper plate (-X)
    const cfxWin = new THREE.Path();
    cfxWin.moveTo(-39.0, -12.0);
    cfxWin.lineTo(-26.0, -12.0);
    cfxWin.lineTo(-26.0, 16.0);
    cfxWin.lineTo(-39.0, 16.0);
    cfxWin.closePath();
    brkShape.holes.push(cfxWin);
    // Secondary relief bay over right-side I/O & NPU (+X)
    const ioWin = new THREE.Path();
    ioWin.moveTo(19.0, -14.0);
    ioWin.lineTo(36.0, -14.0);
    ioWin.lineTo(36.0, 14.0);
    ioWin.lineTo(19.0, 14.0);
    ioWin.closePath();
    brkShape.holes.push(ioWin);

    const brkMesh = new THREE.Mesh(
      extrudeCentered(brkShape, 0.42, 0.05, 0.05, 16),
      mats.stainlessMachined
    );
    g.add(brkMesh);

    // Embossed longitudinal stiffening bridge bars
    for (const ry of [21.5, -21.5]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(74.0, 2.2, 0.62), mats.emiShieldCan);
      rib.position.set(0, ry, -0.25);
      g.add(rib);
    }

    // Two pyrolytic graphite heat-transfer tape ribbons threaded through bracket slits (A1 II / A7R VI style)
    const tape1Curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-18.0, 14.0, 0.35),
      new THREE.Vector3(-4.0, 16.5, -0.38),
      new THREE.Vector3(12.0, 16.5, -0.38),
      new THREE.Vector3(24.0, 12.0, 0.32),
    ]);
    const tape2Curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-18.0, -14.5, 0.35),
      new THREE.Vector3(-4.0, -17.5, -0.38),
      new THREE.Vector3(12.0, -17.5, -0.38),
      new THREE.Vector3(24.0, -14.5, 0.32),
    ]);
    for (const curve of [tape1Curve, tape2Curve]) {
      const tGeo = new THREE.TubeGeometry(curve, 22, 1.35, 8, false);
      tGeo.scale(1, 1, 0.16);
      const tapeMesh = new THREE.Mesh(tGeo, mats.thermalTransferTape);
      g.add(tapeMesh);
    }

    // 4 signature corner M1.4 stainless retaining screws
    for (const [sx, sy] of [
      [-39.2, 24.2],
      [39.2, 24.2],
      [-39.2, -24.2],
      [39.2, -24.2],
    ] as Array<[number, number]>) {
      const screw = createPrecisionScrew(1.2, 0.38, 0.95, mats.stainlessMachined);
      screw.rotation.x = Math.PI;
      screw.position.set(sx, sy, -0.3);
      g.add(screw);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-rf-shield-bracket',
        18,
        '#a5b0be',
        g,
        new THREE.Vector3(0, 0, -28.8),
        new THREE.Vector3(0, 0, -64.0),
        new THREE.Vector3(0, 0, -200.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M19. Modular Removable HDMI 2.1 (48 Gbps FRL) Daughterboard & Redriver IC (z = -22.2 mm)
  // (Canon EOS R5 Mark II modular serviceability architecture — decoupled from M12)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Independent removable 6-layer HDI HDMI daughterboard PCB
    const pcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.2, 18.8, 1.0), 0.95, 0.04, 0.04, 10),
      mats.hdiMainboardPcb
    );
    pcb.position.set(39.0, 1.5, 1.85);
    g.add(pcb);

    // Reinforced Full-Size HDMI 2.1 Type A (48 Gbps FRL) stainless port shell + gold contact tongue
    const hdmiShell = new THREE.Mesh(new THREE.BoxGeometry(11.4, 14.8, 4.8), mats.emiShieldCan);
    hdmiShell.position.set(40.8, 1.5, -0.4);
    const hdmiTongue = new THREE.Mesh(new THREE.BoxGeometry(2.6, 11.4, 1.2), mats.icEpoxy);
    hdmiTongue.position.set(45.5, 1.5, -0.4);
    const hdmiGold = new THREE.Mesh(new THREE.BoxGeometry(2.2, 10.6, 0.25), mats.goldPlating);
    hdmiGold.position.set(45.5, 1.5, -1.05);
    g.add(hdmiShell, hdmiTongue, hdmiGold);

    // Dedicated 4ch 12Gbps FRL Equalizer / Redriver QFN IC + ultra-low-C TVS diode pack
    const redriver = new THREE.Mesh(new THREE.BoxGeometry(3.8, 4.8, 0.68), mats.icEpoxy);
    redriver.position.set(33.2, 1.5, 1.05);
    const tvs1 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.8, 0.48), mats.icEpoxy);
    tvs1.position.set(33.2, 6.2, 1.12);
    const tvs2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.8, 0.48), mats.icEpoxy);
    tvs2.position.set(33.2, -3.2, 1.12);
    g.add(redriver, tvs1, tvs2);

    // Shielded 100-ohm differential ZIF jumper FPC connecting daughterboard to mainboard
    const flex = new THREE.Mesh(new THREE.BoxGeometry(6.2, 7.6, 0.2), mats.polyimideFpc);
    flex.position.set(29.8, 1.5, 1.88);
    const flexEmi = new THREE.Mesh(new THREE.BoxGeometry(4.8, 6.8, 0.24), mats.emiShieldCan);
    flexEmi.position.set(29.8, 1.5, 1.88);
    g.add(flex, flexEmi);

    // 2 stainless modular service retention screws
    for (const sy of [-6.4, 9.4]) {
      const scr = createPrecisionScrew(1.05, 0.35, 0.85, mats.stainlessMachined);
      scr.rotation.x = Math.PI;
      scr.position.set(34.0, sy, 1.25);
      g.add(scr);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-hdmi-daughterboard',
        19,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, -22.2),
        new THREE.Vector3(28.0, 12.0, -24.0),
        new THREE.Vector3(28.0, 10.0, -162.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M20. Shielded 3.5mm Mic/Headphone TRS Jack Sub-Board & 24-Bit Codec (z = -22.2 mm)
  // (Sony A7R VI 2-screw shielded audio jack module — decoupled from M12)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Isolated low-noise analog audio sub-PCB
    const audioPcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.5, 13.8, 0.9), 0.9, 0.04, 0.04, 10),
      mats.hdiMainboardPcb
    );
    audioPcb.position.set(38.5, -21.3, 1.95);
    g.add(audioPcb);

    // Dual 3.5 mm Gold-Collared Mic & Headphone TRS Audio Jacks
    for (const ay of [-18.4, -24.2]) {
      const block = new THREE.Mesh(new THREE.BoxGeometry(9.6, 4.8, 4.4), mats.icEpoxy);
      block.position.set(40.2, ay, -0.1);
      const collarGeo = new THREE.CylinderGeometry(2.15, 2.15, 2.2, 18);
      collarGeo.rotateZ(Math.PI / 2);
      const collar = new THREE.Mesh(collarGeo, mats.goldPlating);
      collar.position.set(45.8, ay, -0.1);
      const boreGeo = new THREE.CylinderGeometry(1.45, 1.45, 2.3, 14);
      boreGeo.rotateZ(Math.PI / 2);
      const bore = new THREE.Mesh(boreGeo, mats.matteBlackAnodized);
      bore.position.set(45.85, ay, -0.1);
      g.add(block, collar, bore);
    }

    // Dedicated 24-bit/96kHz Audio ADC/DAC Codec IC + analog coupling caps
    const codec = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.4, 0.8), mats.icEpoxy);
    codec.position.set(32.8, -21.2, 1.25);
    g.add(codec);
    for (const cy of [-18.4, -24.0]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.65), mats.tantalumCapYellow);
      cap.position.set(32.8, cy, 1.32);
      cap.userData.noEdges = true;
      g.add(cap);
    }

    // 2-screw stainless steel RF shield cover bracket spanning audio jacks
    const shieldCover = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.4, 12.6, 0.8), 0.36, 0.04, 0.04, 10),
      mats.emiShieldCan
    );
    shieldCover.position.set(39.6, -21.3, -2.52);
    g.add(shieldCover);
    for (const sy of [-16.2, -26.4]) {
      const scr = createPrecisionScrew(1.0, 0.34, 0.8, mats.stainlessMachined);
      scr.rotation.x = Math.PI;
      scr.position.set(35.4, sy, -2.72);
      g.add(scr);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-audio-jack-board',
        20,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -22.2),
        new THREE.Vector3(28.0, -18.0, -22.0),
        new THREE.Vector3(28.0, -18.0, -160.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M21. Wi-Fi 6E/7 (2x2 MIMO) Ceramic Patch Antennas & Gold-Braided Coax (z = -21.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Orthogonal Dual-Band 2.4/5/6 GHz MIMO Ceramic Patch Antenna Modules along top RF window
    const antSpecs: Array<{ x: number; y: number; w: number; h: number; fx: number; fy: number }> = [
      { x: 14.5, y: 34.4, w: 11.0, h: 4.2, fx: 13.5, fy: 30.2 },
      { x: 34.0, y: 33.8, w: 4.6, h: 9.8, fx: 32.8, fy: 29.8 },
    ];

    for (const a of antSpecs) {
      // LDS polymer non-metallic carrier block
      const carrier = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(a.w, a.h, 0.6), 1.4, 0.06, 0.06, 10),
        mats.ceramicAlumina
      );
      carrier.position.set(a.x, a.y, -0.2);
      g.add(carrier);

      // Gold serpentine radiating patch pattern on outer face
      const patch = new THREE.Mesh(
        new THREE.BoxGeometry(a.w - 1.6, a.h - 1.2, 0.16),
        mats.goldPlating
      );
      patch.position.set(a.x, a.y, -0.96);
      g.add(patch);

      // Gold-braided 50-ohm 0.81mm micro-coaxial jumper feeding from M13 U.FL endpoint
      const coaxCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(a.fx, a.fy, -0.2),
        new THREE.Vector3((a.fx + a.x) * 0.5, (a.fy + a.y) * 0.5, -0.85),
        new THREE.Vector3(a.x, a.y - (a.h > 6 ? 2.5 : 0.8), -0.35),
      ]);
      const coax = new THREE.Mesh(
        new THREE.TubeGeometry(coaxCurve, 14, 0.42, 8, false),
        mats.rfGoldCoax
      );
      g.add(coax);

      // Micro IPEX gold snap connector at antenna feedpoint
      const snap = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.7), mats.goldPlating);
      snap.position.set(a.fx, a.fy, -0.22);
      g.add(snap);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-wifi-mimo-antennas',
        21,
        '#d9a326',
        g,
        new THREE.Vector3(0, 0, -21.4),
        new THREE.Vector3(22.0, 26.0, -24.0),
        new THREE.Vector3(22.0, 26.0, -166.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M22. 13.56 MHz NFC Planar Copper Coil Antenna & Ferrite Backing Sheet (z = -23.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const nfcGrp = new THREE.Group();
    nfcGrp.position.set(-48.4, -3.5, 0);
    nfcGrp.rotation.y = Math.PI / 2;

    // High-permeability sintered ferrite magnetic shielding sheet (blocks Mg-body eddy currents)
    const ferriteSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 22.0, 1.2), 0.35, 0.03, 0.03, 10),
      mats.ferriteInductor
    );
    ferriteSheet.position.z = 0.25;
    nfcGrp.add(ferriteSheet);

    // Flexible polyimide coil substrate
    const polySub = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(15.2, 21.2, 1.0), 0.16, 0.02, 0.02, 10),
      mats.polyimideFpc
    );
    polySub.position.z = -0.05;
    nfcGrp.add(polySub);

    // 5 Concentric etched planar copper 13.56 MHz coil turns
    for (let t = 0; t < 5; t++) {
      const cw = 13.8 - t * 1.4;
      const ch = 19.6 - t * 1.4;
      const turnShape = createFrameShape(cw, ch, 0.6, cw - 0.85, ch - 0.85, 0.35);
      const turn = new THREE.Mesh(
        extrudeCentered(turnShape, 0.14, 0.01, 0.01, 8),
        mats.copperHeatSpreader
      );
      turn.position.z = -0.18;
      turn.userData.noEdges = true;
      nfcGrp.add(turn);
    }

    // Dual gold spring contact tail routing inward toward mainboard
    const tail = new THREE.Mesh(new THREE.BoxGeometry(2.6, 5.2, 0.2), mats.polyimideFpc);
    tail.position.set(0, -13.2, 0.1);
    const pad1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 0.26), mats.goldPlating);
    pad1.position.set(-0.6, -15.0, 0.1);
    const pad2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 0.26), mats.goldPlating);
    pad2.position.set(0.6, -15.0, 0.1);
    nfcGrp.add(tail, pad1, pad2);

    g.add(nfcGrp);

    parts.push(
      finalizeMainboardPart(
        'mb-nfc-coil',
        22,
        '#b45309',
        g,
        new THREE.Vector3(0, 0, -23.8),
        new THREE.Vector3(-30.0, -14.0, -30.0),
        new THREE.Vector3(-30.0, -14.0, -172.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M23. USB-PD 3.1 (45W EPR) Controller IC & Back-to-Back MOSFET Protection (z = -20.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // USB-PD 3.1 PPS Protocol Controller QFN-32 IC
    const pdIc = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.4, 0.78), mats.icEpoxy);
    pdIc.position.set(30.4, -10.8, 0.22);
    const pdDot = new THREE.Mesh(new THREE.CircleGeometry(0.32, 10), mats.goldPlating);
    pdDot.rotation.y = Math.PI;
    pdDot.position.set(32.0, -9.2, -0.19);
    pdDot.userData.noEdges = true;
    g.add(pdIc, pdDot);

    // Dual Back-to-Back Low-Rds(on) N-Channel Power MOSFETs (reverse-current & OVP block)
    for (const my of [-7.0, -14.6]) {
      const fet = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.4, 0.72), mats.icEpoxy);
      fet.position.set(30.6, my, 0.26);
      const drain = new THREE.Mesh(new THREE.BoxGeometry(0.45, 2.2, 0.45), mats.silverElectrode);
      drain.position.set(32.3, my, 0.35);
      const source = new THREE.Mesh(new THREE.BoxGeometry(0.45, 2.2, 0.45), mats.silverElectrode);
      source.position.set(28.9, my, 0.35);
      g.add(fet, drain, source);
    }

    // Current-sense shunt + CC1/CC2 24V protection micro-IC
    const shunt = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 0.48), mats.copperHeatSpreader);
    shunt.position.set(26.2, -10.8, 0.38);
    const ccProt = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.0, 0.52), mats.icEpoxy);
    ccProt.position.set(34.6, -10.8, 0.34);
    g.add(shunt, ccProt);

    parts.push(
      finalizeMainboardPart(
        'mb-usb-pd-ctrl',
        23,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, -20.8),
        new THREE.Vector3(20.0, -6.0, -16.0),
        new THREE.Vector3(18.0, -6.0, -152.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M24. 512Mb Octal-SPI NOR Boot Firmware Flash & Factory Calibration EEPROM (z = -20.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 512 Mb Octal-SPI DDR NOR Boot Flash (BGA-24 / WSON-8 high-reliability package)
    const norPkg = new THREE.Mesh(new THREE.BoxGeometry(6.4, 5.2, 0.88), mats.icEpoxy);
    norPkg.position.set(-18.2, 22.8, 0.18);
    const norDot = new THREE.Mesh(new THREE.CircleGeometry(0.36, 12), mats.goldPlating);
    norDot.rotation.y = Math.PI;
    norDot.position.set(-15.8, 24.6, -0.28);
    norDot.userData.noEdges = true;
    g.add(norPkg, norDot);

    // 1 Mb Serial Calibration EEPROM (stores per-unit sensor defect map & shutter speed table)
    const eepPkg = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.4, 0.72), mats.icEpoxy);
    eepPkg.position.set(-10.8, 22.8, 0.26);
    const eepBar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.0, 0.14), mats.silverElectrode);
    eepBar.position.set(-9.1, 22.8, -0.12);
    g.add(eepPkg, eepBar);

    // Quad gull-wing silver leads on EEPROM + SPI damping resistor network
    for (let lx = -1.3; lx <= 1.31; lx += 0.86) {
      for (const ly of [-1.95, 1.95]) {
        const lead = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.55, 0.18), mats.silverElectrode);
        lead.position.set(-10.8 + lx, 22.8 + ly, 0.52);
        lead.userData.noEdges = true;
        g.add(lead);
      }
    }
    for (let rx = -19.8; rx <= -16.6; rx += 1.05) {
      const res = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.15, 0.35), mats.smdCeramic);
      res.position.set(rx, 18.8, 0.42);
      res.userData.noEdges = true;
      g.add(res);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-nor-flash-eeprom',
        24,
        '#334155',
        g,
        new THREE.Vector3(0, 0, -20.8),
        new THREE.Vector3(-16.0, 14.0, -18.0),
        new THREE.Vector3(-14.0, 14.0, -154.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M25. Rechargeable ML414 Lithium-Manganese RTC Backup Coin Cell & Holder (z = -20.8 mm)
  // (Decoupled cleanly from M11 for zero z-fighting)
  // =========================================================================
  {
    const g = new THREE.Group();

    // ML414 rechargeable lithium-manganese dioxide coin cell body
    const cellGeo = new THREE.CylinderGeometry(3.1, 3.1, 1.35, 22);
    cellGeo.rotateX(Math.PI / 2);
    const cell = new THREE.Mesh(cellGeo, mats.neodymiumMagnet);
    cell.position.set(24.2, -13.5, -0.05);
    const cathodeRim = new THREE.Mesh(
      new THREE.TorusGeometry(2.68, 0.22, 8, 22),
      mats.goldPlating
    );
    cathodeRim.position.set(24.2, -13.5, -0.72);
    cathodeRim.userData.noEdges = true;
    g.add(cell, cathodeRim);

    // Gold-plated phosphor-bronze spring retention cradle & top contact arm
    const cradle = new THREE.Mesh(
      new THREE.TorusGeometry(3.42, 0.26, 8, 20, Math.PI * 1.45),
      mats.beCuSpring
    );
    cradle.rotation.z = -Math.PI * 0.22;
    cradle.position.set(24.2, -13.5, 0.1);
    const topArm = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.25, 0.24), mats.beCuSpring);
    topArm.position.set(24.2, -13.5, -0.82);
    // Trickle-charge current-limiting diode & resistor
    const diode = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.85, 0.5), mats.icEpoxy);
    diode.position.set(20.0, -13.5, 0.38);
    g.add(cradle, topArm, diode);

    parts.push(
      finalizeMainboardPart(
        'mb-rtc-coin-cell',
        25,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, -20.8),
        new THREE.Vector3(14.0, -18.0, -16.0),
        new THREE.Vector3(14.0, -18.0, -152.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M26. 6ch Full-Bridge IBIS/Shutter/Lens Power Driver SoC & Shunts (z = -20.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 6-Channel Ultrasonic PWM H-Bridge Power Driver QFN-48 SoC
    const drv = new THREE.Mesh(new THREE.BoxGeometry(7.2, 7.2, 0.92), mats.icEpoxy);
    drv.position.set(11.6, -12.6, 0.18);
    const thermalSlug = new THREE.Mesh(new THREE.BoxGeometry(4.2, 4.2, 0.12), mats.copperHeatSpreader);
    thermalSlug.position.set(11.6, -12.6, -0.32);
    g.add(drv, thermalSlug);

    // Fine gold QFN perimeter pad stubs
    for (let k = -2.6; k <= 2.61; k += 0.86) {
      for (const s of [-3.75, 3.75]) {
        const pH = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 0.25), mats.silverElectrode);
        pH.position.set(11.6 + k, -12.6 + s, 0.54);
        pH.userData.noEdges = true;
        g.add(pH);
      }
    }

    // 6 Precision 20 mOhm Manganin Metal-Foil Current-Sense Shunt Resistors (IBIS 3ch + Shutter 3ch)
    for (let i = 0; i < 6; i++) {
      const sy = -9.6 - i * 1.25;
      const shuntBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.72, 0.42), mats.copperHeatSpreader);
      shuntBody.position.set(17.4, sy, 0.42);
      const tL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.74, 0.46), mats.silverElectrode);
      tL.position.set(16.25, sy, 0.42);
      const tR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.74, 0.46), mats.silverElectrode);
      tR.position.set(18.55, sy, 0.42);
      shuntBody.userData.noEdges = true;
      tL.userData.noEdges = true;
      tR.userData.noEdges = true;
      g.add(shuntBody, tL, tR);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-motor-driver-soc',
        26,
        '#4f46e5',
        g,
        new THREE.Vector3(0, 0, -20.8),
        new THREE.Vector3(8.0, -24.0, -14.0),
        new THREE.Vector3(8.0, -24.0, -150.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M27. Dedicated CFexpress 4.0 NVMe Copper Thermal Spreader Plate & TIM Pad (z = -25.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // C1100 Oxygen-Free Copper Spreader Plate over M09 CFexpress 4.0 card cage
    const plate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(23.6, 31.4, 1.8), 0.52, 0.06, 0.06, 12),
      mats.copperHeatSpreader
    );
    plate.position.set(-34.2, 2.5, -0.2);
    g.add(plate);

    // High-k 6.0 W/m·K sky-blue silicone TIM interface pad pressing onto stainless CFx cage
    const timPad = new THREE.Mesh(new THREE.BoxGeometry(20.4, 27.6, 0.56), mats.thermalPadBlue);
    timPad.position.set(-34.2, 2.5, 0.38);
    g.add(timPad);

    // Thermal ground extension ear bridging toward Mg grip frame + 2 retention tabs
    const ear = new THREE.Mesh(new THREE.BoxGeometry(5.2, 10.5, 0.48), mats.copperHeatSpreader);
    ear.position.set(-46.8, 2.5, -0.2);
    g.add(ear);
    for (const ty of [-11.5, 16.5]) {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.0, 0.9), mats.beCuSpring);
      tab.position.set(-23.2, ty, 0.15);
      g.add(tab);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-cfx-heat-plate',
        27,
        '#cd6a3a',
        g,
        new THREE.Vector3(0, 0, -25.4),
        new THREE.Vector3(-28.0, 6.0, -34.0),
        new THREE.Vector3(-26.0, 6.0, -176.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M28. Front-Side (+Z Face) 6-Phase Molded-Alloy Power Inductor & MLCC Bank (z = -18.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 6-Phase Closed-Magnetic-Circuit Molded Alloy Power Inductors backing ISP/NPU on +Z PCB face
    for (let i = 0; i < 6; i++) {
      const ix = -8.5 + i * 4.6;
      const ind = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.4, 3.4, 0.42), 1.32, 0.06, 0.06, 10),
        mats.ferriteInductor
      );
      ind.position.set(ix, -13.5, 0.1);
      g.add(ind);
      for (const tx of [-1.65, 1.65]) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2.0, 0.95), mats.silverElectrode);
        cap.position.set(ix + tx, -13.5, -0.05);
        cap.userData.noEdges = true;
        g.add(cap);
      }
    }

    // 4 Ultra-Low-ESR Conductive Polymer Tantalum Bulk Filter Capacitors
    for (let i = 0; i < 4; i++) {
      const tx = -6.0 + i * 5.8;
      const tant = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.2, 1.12), mats.tantalumCapYellow);
      tant.position.set(tx, -18.4, 0.08);
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2.22, 0.14), mats.coaxShieldCopper);
      stripe.position.set(tx + 1.3, -18.4, 0.68);
      stripe.userData.noEdges = true;
      g.add(tant, stripe);
    }

    // High-density 0402 MLCC bypass decoupling matrix directly behind 4nm ISP BGA core
    for (let mx = -4.0; mx <= 11.0; mx += 2.5) {
      for (let my = -6.5; my <= 4.5; my += 2.75) {
        const mlcc = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.65, 0.48), mats.smdCeramic);
        mlcc.position.set(mx, my, -0.18);
        mlcc.userData.noEdges = true;
        g.add(mlcc);
      }
    }

    parts.push(
      finalizeMainboardPart(
        'mb-power-inductor-bank',
        28,
        '#475569',
        g,
        new THREE.Vector3(0, 0, -18.0),
        new THREE.Vector3(-18.0, -18.0, 10.0),
        new THREE.Vector3(-16.0, -16.0, -124.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M29. 12-Branch Mainboard Perimeter & Under-Board Wrap-Around Shielded FPC Harness (z = -17.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const addRibbonBranch = (pts: Array<[number, number, number]>, width: number, shielded = true) => {
      const curve = new THREE.CatmullRomCurve3(pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
      const geo = new THREE.TubeGeometry(curve, 18, width * 0.5, 6, false);
      geo.scale(1, 1, 0.12);
      const ribbon = new THREE.Mesh(geo, mats.polyimideFpc);
      g.add(ribbon);

      if (shielded) {
        const mid = curve.getPoint(0.5);
        const emiPatch = new THREE.Mesh(new THREE.BoxGeometry(width * 0.88, width * 0.88, 0.24), mats.emiShieldCan);
        emiPatch.position.copy(mid);
        emiPatch.userData.noEdges = true;
        g.add(emiPatch);
      }

      // Gold ZIF termination finger at distal end
      const endPt = curve.getPoint(1);
      const goldTip = new THREE.Mesh(new THREE.BoxGeometry(width * 0.85, 1.3, 0.28), mats.goldPlating);
      goldTip.position.copy(endPt);
      goldTip.userData.noEdges = true;
      g.add(goldTip);
    };

    // Upper EVF + Top-Deck Dial & Hot-Shoe branches (4 ribbons)
    addRibbonBranch([[-24.0, 26.5, 0.2], [-24.0, 32.5, 0.8], [-20.0, 36.2, 2.2]], 5.4, true);
    addRibbonBranch([[16.0, 26.5, 0.2], [16.0, 32.5, 0.8], [13.0, 36.2, 2.2]], 5.0, true);
    addRibbonBranch([[-34.5, 26.5, 0.2], [-37.0, 32.8, 1.0], [-40.0, 35.8, 2.0]], 4.4, false);
    addRibbonBranch([[33.0, 26.5, 0.2], [36.5, 32.5, 1.0], [39.0, 35.4, 2.0]], 4.4, false);

    // Right (+X) Mount 12-Pin, Shutter & Side-Port branches (3 ribbons)
    addRibbonBranch([[22.5, 13.5, 0.3], [32.0, 14.5, 1.4], [43.5, 14.0, 3.6]], 5.2, true);
    addRibbonBranch([[22.5, -14.5, 0.3], [33.0, -14.5, 1.4], [43.5, -13.0, 3.8]], 4.8, true);
    addRibbonBranch([[28.0, 1.5, 0.2], [35.5, 1.5, -0.6], [42.0, 1.5, -2.0]], 4.4, true);

    // Left (-X) Grip, Card-Door Switch & Vertical-Grip Contact branches (3 ribbons)
    addRibbonBranch([[-32.0, -26.5, 0.3], [-42.5, -26.5, 0.8], [-48.2, -23.0, 1.6]], 6.0, false);
    addRibbonBranch([[-40.0, 12.0, 0.2], [-47.5, 12.0, -0.8], [-49.5, 8.0, -2.2]], 3.8, false);
    addRibbonBranch([[-40.0, -12.0, 0.2], [-47.5, -12.0, -0.8], [-49.5, -15.5, -2.2]], 3.8, false);

    // Bottom Under-Board Wrap-Around Rear LCD & Rear Button Panel branches (2 ribbons — A1 II signature!)
    addRibbonBranch([[0.0, -28.2, -2.4], [0.0, -34.2, -1.6], [0.0, -35.8, 1.2], [0.0, -30.5, 2.8]], 7.4, true);
    addRibbonBranch([[-16.0, -28.0, -2.0], [-16.0, -34.0, -1.2], [-18.5, -35.2, 1.0]], 4.6, false);

    parts.push(
      finalizeMainboardPart(
        'mb-perimeter-ribbons',
        29,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, -17.8),
        new THREE.Vector3(0, 26.0, 14.0),
        new THREE.Vector3(0, 24.0, -118.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // M30. EVF Cavity Internal Ribbon Retention Clamp & 2-Screw Structural Tie Bracket (z = -16.4 mm)
  // (Sony A1 II / A7R VI EVF cavity breakdown architecture)
  // =========================================================================
  {
    const g = new THREE.Group();

    // High-rigidity SUS304 structural tie bridge spanning top EVF notch
    const bridgeShape = createRoundedRectShape(34.0, 5.2, 1.1);
    const bridge = new THREE.Mesh(
      extrudeCentered(bridgeShape, 0.65, 0.06, 0.06, 12),
      mats.stainlessMachined
    );
    bridge.position.set(0, 26.8, 0);
    g.add(bridge);

    // Recessed stepped clamping flange pressing gently onto EVF MIPI-DSI ZIF flex connectors
    const flange = new THREE.Mesh(new THREE.BoxGeometry(22.0, 3.4, 0.72), mats.emiShieldCan);
    flange.position.set(0, 25.0, -0.32);
    const cushion = new THREE.Mesh(new THREE.BoxGeometry(20.6, 2.4, 0.48), mats.epdmGasket);
    cushion.position.set(0, 25.0, -0.82);
    g.add(flange, cushion);

    // 2 signature M1.4 stainless retaining screws at left & right notch shoulders
    for (const sx of [-14.2, 14.2]) {
      const scr = createPrecisionScrew(1.1, 0.36, 1.05, mats.stainlessMachined);
      scr.rotation.x = Math.PI;
      scr.position.set(sx, 26.8, -0.45);
      g.add(scr);
    }

    parts.push(
      finalizeMainboardPart(
        'mb-evf-cavity-bracket',
        30,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -16.4),
        new THREE.Vector3(0, 32.0, 24.0),
        new THREE.Vector3(0, 30.0, -108.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // LIVE DYNAMICS (ISP Pipeline Pulse, NPU Systolic Heartbeat, CFexpress Activity)
  // =========================================================================
  const applyDynamics = (elapsed: number, physicsActive: boolean) => {
    const ispMat = ispActiveGlow.material as THREE.MeshBasicMaterial;
    const npuMat = npuSystolicGlow.material as THREE.MeshBasicMaterial;
    const ledMat = cfexActivityLed.material as THREE.MeshBasicMaterial;

    if (!physicsActive) {
      ispMat.opacity = 0;
      npuMat.opacity = 0;
      ledMat.opacity = 0.25;
      return;
    }

    ispMat.opacity = 0.45 + 0.35 * Math.sin(elapsed * 5.2);
    npuMat.opacity = 0.5 + 0.4 * Math.sin(elapsed * 8.4 + 1.1);
    ledMat.opacity = 0.35 + 0.65 * Math.abs(Math.sin(elapsed * 11.0));
  };

  // Append 24 Phase 16A standalone-only Vapor Chamber & Sony OEM Mainboard micro-parts (M31–M54; omitted in whole-camera views!)
  parts.push(...buildMainboardMicroParts(mats));

  // Append 6 Phase 19D standalone-only Mainboard deep-audit micro-parts (M55–M60; omitted in whole-camera views!)
  parts.push(...buildMainboardUltraAuditParts(mats));

  return {
    parts,
    rig: {
      npuSystolicGlow,
      ispActiveGlow,
      cfexActivityLed,
      applyDynamics,
    },
  };
}
