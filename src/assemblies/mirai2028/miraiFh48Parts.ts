//@FLOW_MAP|file=src/assemblies/mirai2028/miraiFh48Parts.ts|unit=mirai2028|lines=988|exports=buildMiraiFh48Parts
import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import { createFrameShape, createRoundedRectShape } from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
} from '../../engine/UltraDetailBuilders';
import {
  addKnurledRingToGroup,
  addZAxisBolts,
  finalizeMiraiPart,
  InstanceTransform,
  makeHorizCncPlate,
  makeMiraiInstanced,
  makeZAxisCncRing,
} from './miraiShared';

/**
 * FH48 — Dec 2028 Endpoint: Physics- & Thermal-Compliant "~800g · 10–15W Sustained
 * Post-Camera Integrated Machine (Omni-Lightfield Flagship)".
 *
 * Full-scale ergonomic mirrorless flagship (128 × 90 × 58 mm) integrating all 8 volumes:
 *   - FH33 Hollow-Lattice Titanium Skeleton + CFRP Cutaway Shell & Self-Healing Grip (FH36)
 *   - FH34 Contactless 60GHz mmWave + Magnetic-Resonance IP68 E-Mount & Hot Shoe
 *   - FH01/02/17 Full-Frame Stacked Sensor + Magnetic-Levitation 10-Stop IBIS Core
 *   - FH20/23/39 2nm/A16 GAA + BSPDN 1,000 TOPS Chiplet Mainboard + PQC Enclave
 *   - FH32 IP68 Hermetic Ultrasonic MEMS Solid-State Air-Cooling Spine
 *   - FH25 30,000-nit Pancake EVF + FH29 Piezo Haptic Dials + FH31 All-Solid-State Battery
 *   - FH37 PCIe 5.0/6.0 CFexpress + STT-MRAM + FH38 Wi-Fi 8/LEO NTN + FH26/30 3D Rear Display
 *
 * Ergonomic orientation: +Z = lens front, -Z = rear 3D screen, -X = photographer right grip,
 * +X = photographer left cutaway lattice & USB4/Optical I/O, +Y = top EVF hump.
 *
 * 18 Watchmaker-Grade Explodable 3D CAD Parts (`miraiSubView = 8`, order 123..140).
 * Zero direct `new THREE.Mesh*Material` allocations; max 2 InstancedMeshes (`+4 dc` total!).
 */
export function buildMiraiFh48Parts(
  mats: V2MaterialLibrary,
  clippingPlanes?: THREE.Plane[]
): CadPart[] {
  const cp = clippingPlanes ?? [];
  const parts: CadPart[] = [];

  // =========================================================================
  // FH48-01 (123): FH34 Contactless 60GHz mmWave + Magnetic-Resonance IP68 Titanium E-Mount
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main machined titanium bayonet flange ring (zero exposed metal contact pins!)
    g.add(makeZAxisCncRing(28.5, 22.8, 4.2, mats.mountStainlessFlange, { bevel: 0.16, curveSegs: 48 }));

    // 3 internal precision bayonet locking lug ears
    for (let i = 0; i < 3; i++) {
      const ang = (i * Math.PI * 2) / 3 + 0.35;
      const lug = new THREE.Mesh(
        createChamferedBoxGeo(11.0, 2.4, 1.35, 0.35, 0.06, 'z'),
        mats.welcomeTitaniumFace
      );
      lug.position.set(Math.cos(ang) * 23.0, Math.sin(ang) * 23.0, 0.5);
      lug.rotation.z = ang + Math.PI / 2;
      g.add(lug);
    }

    // Embedded concentric copper magnetic-resonance wireless power transfer coil ring
    const powerCoil = makeZAxisCncRing(22.6, 20.6, 1.2, mats.copperCoil, { bevel: 0.06, curveSegs: 44 });
    powerCoil.position.z = -1.2;
    g.add(powerCoil);

    // Hermetic sapphire-cyan 60GHz ST60 mmWave contactless data transceiver window (bottom arc)
    const mmWaveWin = new THREE.Mesh(
      createChamferedBoxGeo(16.0, 2.8, 1.1, 0.45, 0.06, 'z'),
      mats.blue450Glow
    );
    mmWaveWin.position.set(0, -21.2, 0.6);
    g.add(mmWaveWin);

    // 4 precision M2 titanium mount flange screws
    addZAxisBolts(
      g,
      [
        [18.2, 18.2, 2.15],
        [-18.2, 18.2, 2.15],
        [-18.2, -18.2, 2.15],
        [18.2, -18.2, 2.15],
      ],
      mats,
      1.35,
      1.6
    );

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-contactless-mount',
        8,
        123,
        '#cbd5e1',
        g,
        new THREE.Vector3(6.0, -3.0, 21.5),
        new THREE.Vector3(0, 0, 50.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-02 (124): FH08/FH10 Meta-Optics Pancake Interface Collar & dToF Alignment Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-slim dark titanium meta-optics mount throat collar
    g.add(makeZAxisCncRing(30.6, 25.0, 5.2, mats.welcomeCoreSlate, { bevel: 0.18, curveSegs: 48 }));

    // Signature MIRAI 2028 luminous emerald accent ring
    const emRing = makeZAxisCncRing(30.9, 29.2, 1.2, mats.mofEmerald, { bevel: 0.05, curveSegs: 48 });
    emRing.position.z = 2.2;
    g.add(emRing);

    // Classic ruby optical mount alignment index dot at 12 o'clock
    const dot = new THREE.Mesh(hiResCyl(1.1, 1.1, 0.45, 14), mats.mountRedIndexDot);
    dot.rotation.x = Math.PI / 2;
    dot.position.set(0, 27.6, 2.75);
    g.add(dot);

    // Crystal-clear translucent AR optical meta-interface window revealing contactless E-mount coil & stacked sensor!
    const arGlass = new THREE.Mesh(hiResCyl(24.6, 24.6, 0.36, 40), mats.opticalCementClear);
    arGlass.rotation.x = Math.PI / 2;
    arGlass.position.z = 1.6;
    arGlass.userData.noEdges = true;
    g.add(arGlass);

    // Subtle concentric machined inner aperture step rim inside meta-collar
    const innerStep = makeZAxisCncRing(25.2, 23.6, 1.4, mats.matteBlackAnodized, { bevel: 0.06, curveSegs: 44 });
    innerStep.position.z = 0.8;
    g.add(innerStep);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-meta-lens-collar',
        8,
        124,
        '#10b981',
        g,
        new THREE.Vector3(6.0, -3.0, 26.8),
        new THREE.Vector3(0, 0, 62.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH48-03 (125): FH33/FH36 Aerospace Twill CFRP Front Shell & Self-Healing Ergonomic Grip
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main front CFRP composite body shell with circular mount hole + architectural +X lattice cutaway!
    const frontShape = createRoundedRectShape(118.0, 74.0, 6.2);
    const mountHole = new THREE.Path();
    mountHole.absarc(6.0, -1.0, 28.8, 0, Math.PI * 2, true);
    frontShape.holes.push(mountHole);
    // Right-front (+X, viewer's right) sleek cutaway window revealing internal titanium hollow lattice!
    const cutWin = new THREE.Path();
    cutWin.moveTo(39.0, -24.0);
    cutWin.lineTo(54.5, -24.0);
    cutWin.lineTo(54.5, 24.0);
    cutWin.lineTo(39.0, 24.0);
    cutWin.closePath();
    frontShape.holes.push(cutWin);

    const frontGeo = extrudeHiRes(frontShape, 9.5, 0.35, 0.35, 2, 24);
    applyPlanarUVs(frontGeo, 118.0, 74.0, 'xy');
    const frontShell = new THREE.Mesh(frontGeo, mats.fh48CarbonLatticeMap);
    g.add(frontShell);

    // Titanium cutaway bevel frame accentuating the +X hollow-lattice showcase window
    const cutTrim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(17.5, 50.0, 1.4, 15.2, 47.6, 0.8), 1.4, 0.08, 0.08, 1, 14),
      mats.welcomeTitaniumFace
    );
    cutTrim.position.set(46.75, 0, 4.75);
    g.add(cutTrim);

    // Deep sculpted ergonomic right-hand grip (-X) wrapped in self-healing elastomer (FH36)
    const gripShape = createRoundedRectShape(24.0, 72.0, 8.5);
    const gripGeo = extrudeHiRes(gripShape, 17.5, 1.6, 1.6, 3, 24);
    applyBoxUVs(gripGeo, 16.0);
    const grip = new THREE.Mesh(gripGeo, mats.bodyLeatherette);
    grip.position.set(-50.5, -0.5, 11.2);
    g.add(grip);

    // Sculpted angled finger rest & knurled front command dial inside grip shoulder
    const frontDial = new THREE.Group();
    addKnurledRingToGroup(frontDial, 6.2, 4.4, 2.8, 28, mats.welcomeCoreSlate, mats.welcomeTitaniumFace);
    frontDial.rotation.x = Math.PI / 2 - 0.35;
    frontDial.position.set(-48.0, 24.5, 17.5);
    g.add(frontDial);

    // Emerald FH48 front signature bar along grip seam
    const gripAccent = new THREE.Mesh(
      createChamferedBoxGeo(1.6, 56.0, 1.4, 0.3, 0.06, 'z'),
      mats.mofEmerald
    );
    gripAccent.position.set(-37.2, 0, 5.2);
    g.add(gripAccent);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-cfrp-front-shell',
        8,
        125,
        '#1e293b',
        g,
        new THREE.Vector3(0, -2.0, 13.5),
        new THREE.Vector3(0, 0, 32.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-04 (126): CORE #1 (FH33) — ASI Topology-Optimized Hollow-Lattice Titanium Main Skeleton
  // =========================================================================
  {
    const g = new THREE.Group();
    // Perimeter titanium main monocoque box frame bridging front CFRP shell to rear cover with 0mm air gap!
    const topBeam = new THREE.Mesh(
      createChamferedBoxGeo(115.0, 4.4, 29.6, 1.4, 0.16, 'y'),
      mats.welcomeTitaniumFace
    );
    topBeam.position.set(0, 34.5, -1.8);
    g.add(topBeam);

    const botBeam = new THREE.Mesh(
      createChamferedBoxGeo(115.0, 4.4, 29.6, 1.4, 0.16, 'y'),
      mats.welcomeTitaniumFace
    );
    botBeam.position.set(0, -34.5, -1.8);
    g.add(botBeam);

    // Left (+X) & right (-X) structural ribs enclosing the lattice bays flush between front & rear shells
    for (const sx of [-55.8, -34.0, 36.0, 54.5]) {
      const col = new THREE.Mesh(
        createChamferedBoxGeo(3.2, 66.0, 27.6, 0.8, 0.14, 'z'),
        mats.stainlessMachined
      );
      col.position.set(sx, 0, -1.8);
      g.add(col);
    }

    // 36 diagonal ASI-optimized hollow-lattice titanium truss struts (1 single InstancedMesh!)
    const strutGeo = hiResCyl(0.85, 0.85, 18.0, 8);
    const strutTransforms: InstanceTransform[] = [];
    // Populate the +X visible cutaway truss bay & top/bottom structural bays
    for (let i = 0; i < 6; i++) {
      const y = -22.5 + i * 9.0;
      for (const z of [-8.0, -1.0, 6.0]) {
        strutTransforms.push({ pos: [45.2, y, z], rot: [0, 0, Math.PI / 4] });
        strutTransforms.push({ pos: [45.2, y, z], rot: [0, 0, -Math.PI / 4] });
      }
    }
    g.add(makeMiraiInstanced(strutGeo, mats.welcomeTitaniumFace, strutTransforms, false));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-ti-lattice-skeleton',
        8,
        126,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -2.0, 1.5),
        new THREE.Vector3(0, 0, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // FH48-05 (127): FH01/02/17 Full-Frame Stacked SPAD/3-Layer Sensor + MagLev IBIS Core
  // =========================================================================
  {
    const g = new THREE.Group();
    // MagLev outer yoke cradle
    const yoke = new THREE.Mesh(
      extrudeHiRes(createFrameShape(54.0, 42.0, 2.4, 37.2, 25.2, 1.2), 3.6, 0.14, 0.14, 2, 16),
      mats.softIronYoke
    );
    g.add(yoke);

    // 4-side copper MagLev voice coils + N52 magnets
    for (const sy of [17.8, -17.8]) {
      const coil = new THREE.Mesh(
        createChamferedBoxGeo(26.0, 4.2, 2.2, 0.4, 0.08, 'z'),
        mats.copperCoil
      );
      coil.position.set(0, sy, 0.6);
      g.add(coil);
    }
    for (const sx of [-23.2, 23.2]) {
      const coil = new THREE.Mesh(
        createChamferedBoxGeo(4.2, 22.0, 2.2, 0.4, 0.08, 'z'),
        mats.copperCoil
      );
      coil.position.set(sx, 0, 0.6);
      g.add(coil);
    }

    // Active full-frame 36×24mm iridescent stacked photon-counting silicon die facing +Z!
    const dieGeo = extrudeHiRes(createRoundedRectShape(36.0, 24.0, 0.5), 0.75, 0.05, 0.05, 1, 14);
    applyPlanarUVs(dieGeo, 36.0, 24.0, 'xy');
    const die = new THREE.Mesh(dieGeo, mats.miraiSpadArrayMap);
    die.position.z = 1.4;
    die.userData.noEdges = true;
    g.add(die);

    // Gold perimeter sensor carrier frame
    const goldFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(39.0, 27.0, 0.8, 36.2, 24.2, 0.4), 0.45, 0.04, 0.04, 1, 14),
      mats.goldPlating
    );
    goldFrame.position.z = 1.2;
    g.add(goldFrame);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-sensor-maglev-core',
        8,
        127,
        '#0ea5e9',
        g,
        new THREE.Vector3(6.0, -3.0, 8.0),
        new THREE.Vector3(0, 0, 16.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH48-06 (128): FH20/23/39 2nm/A16 GAA+BSPDN 1,000 TOPS Chiplet Mainboard
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(76.0, 56.0, 2.8), 1.4, 0.10, 0.10, 2, 16),
      mats.hdiMainboardPcb
    );
    g.add(pcb);

    // 2nm/A16 GAA 1,000 TOPS Chiplet SoC package on rear (-Z) face
    const socGeo = extrudeHiRes(createRoundedRectShape(24.0, 24.0, 0.8), 1.2, 0.08, 0.08, 1, 14);
    applyPlanarUVs(socGeo, 24.0, 24.0, 'xy');
    const soc = new THREE.Mesh(socGeo, mats.fh20ChipletDieMap);
    soc.position.set(-4.0, 2.0, -1.25);
    soc.userData.noEdges = true;
    g.add(soc);

    // Gold PQC/PUF hardware root-of-trust security chip (FH39)
    const pqc = new THREE.Mesh(
      createChamferedBoxGeo(9.0, 9.0, 1.0, 0.4, 0.06, 'z'),
      mats.goldPlating
    );
    pqc.position.set(20.0, 12.0, -1.15);
    g.add(pqc);

    // Companion LPDDR6/HBM PMIC & EMI shield can
    const emi = new THREE.Mesh(
      createChamferedBoxGeo(16.0, 18.0, 1.4, 0.6, 0.08, 'z'),
      mats.emiShieldCan
    );
    emi.position.set(20.0, -8.0, -1.35);
    g.add(emi);

    // Cyan optical I/O micro-connector (FH21)
    const optIo = new THREE.Mesh(
      createChamferedBoxGeo(12.0, 6.0, 1.1, 0.3, 0.06, 'z'),
      mats.blue450Glow
    );
    optIo.position.set(-24.0, -12.0, -1.15);
    g.add(optIo);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-2nm-soc-mainboard',
        8,
        128,
        '#059669',
        g,
        new THREE.Vector3(2.0, -2.0, -2.2),
        new THREE.Vector3(0, 0, -15.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH48-07 (129): CORE #2 (FH32) — Sustained 10–15W IP68 Ultrasonic MEMS Cooling Spine
  // =========================================================================
  {
    const g = new THREE.Group();
    // Pure-copper vapor chamber baseplate directly interfacing SoC + Sensor heat
    const vc = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(64.0, 44.0, 2.8), 1.6, 0.14, 0.14, 2, 18),
      mats.vaporChamberCopper
    );
    g.add(vc);

    // Hermetic laser-welded IP68 SUS304 isolation barrier plate
    const isoWall = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(60.0, 40.0, 2.2), 0.75, 0.06, 0.06, 1, 16),
      mats.stainlessMachined
    );
    isoWall.position.z = -1.15;
    g.add(isoWall);

    // Active 2×3 Ultrasonic Si-MEMS AirJet-class cooling array (reuses cached Hero map!)
    const memsGeo = extrudeHiRes(createRoundedRectShape(46.0, 30.0, 1.4), 0.85, 0.06, 0.06, 1, 14);
    applyPlanarUVs(memsGeo, 46.0, 30.0, 'xy');
    const mems = new THREE.Mesh(memsGeo, mats.fh32MemsChipMap);
    mems.position.z = -1.95;
    mems.userData.noEdges = true;
    g.add(mems);

    // Left-flank (+X) waterproof labyrinth exhaust nozzle bar
    const exhaust = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 34.0, 3.8, 0.8, 0.12, 'z'),
      mats.welcomeCoreSlate
    );
    exhaust.position.set(34.5, 0, -0.8);
    g.add(exhaust);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-mems-cooling-spine',
        8,
        129,
        '#ea580c',
        g,
        new THREE.Vector3(6.0, -2.0, -8.8),
        new THREE.Vector3(0, 0, -28.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-08 (130): FH25/27 Pentaprism Hump — 30,000-nit · 240Hz True-RGB Pancake EVF Unit
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculpted pentaprism EVF housing
    const hump = new THREE.Mesh(
      createChamferedBoxGeo(44.0, 21.0, 36.0, 4.2, 0.8, 'z'),
      mats.welcomeCoreSlate
    );
    g.add(hump);

    // Front EVF nose emerald accent bezel
    const nose = new THREE.Mesh(
      createChamferedBoxGeo(32.0, 12.0, 2.4, 2.2, 0.3, 'z'),
      mats.welcomeCoreMid
    );
    nose.position.set(0, 0.5, 18.2);
    g.add(nose);

    const emStripe = new THREE.Mesh(
      createChamferedBoxGeo(22.0, 1.4, 0.6, 0.3, 0.05, 'z'),
      mats.mofEmerald
    );
    emStripe.position.set(0, 4.2, 19.5);
    g.add(emStripe);

    // Rear sculpted ergonomic silicone eyecup protruding rearward (-Z)
    const eyecup = new THREE.Mesh(
      extrudeHiRes(createFrameShape(32.0, 24.0, 6.2, 19.6, 14.2, 3.2), 7.4, 0.9, 0.9, 2, 20),
      mats.evfEyecupRubber
    );
    eyecup.position.set(0, -0.5, -20.5);
    g.add(eyecup);

    // Vivid 30,000-nit True-RGB Tandem EVF glow visible inside the eyecup!
    const oledGeo = extrudeHiRes(createRoundedRectShape(19.0, 13.6, 1.2), 0.35, 0.04, 0.04, 1, 14);
    applyPlanarUVs(oledGeo, 19.0, 13.6, 'xy');
    const oled = new THREE.Mesh(oledGeo, mats.fh25TandemOledMap);
    oled.position.set(0, -0.5, -17.2);
    oled.userData.noEdges = true;
    g.add(oled);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-pancake-evf-hump',
        8,
        130,
        '#334155',
        g,
        new THREE.Vector3(6.0, 45.0, 1.5),
        new THREE.Vector3(0, 21.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-09 (131): FH34 Contactless 60GHz mmWave + Magnetic-Resonance IP68 Hot Shoe
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeHorizCncPlate(
      createRoundedRectShape(23.0, 22.0, 1.8),
      1.6,
      mats.welcomeTitaniumFace,
      { bevel: 0.14, bevelSegs: 2, curveSegs: 16 }
    );
    g.add(base);

    // Side C-rails (no exposed front 21-pin strip!)
    for (const sx of [-9.4, 9.4]) {
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(3.2, 2.2, 20.5, 0.35, 0.08, 'y'),
        mats.stainlessMachined
      );
      rail.position.set(sx, 1.6, 0);
      g.add(rail);
    }

    // Hermetic sapphire-cyan 60GHz data + wireless power top pad
    const pad = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 0.45, 13.6, 0.8, 0.06, 'y'),
      mats.blue450Glow
    );
    pad.position.set(0, 0.95, 0);
    g.add(pad);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-contactless-mishoe',
        8,
        131,
        '#38bdf8',
        g,
        new THREE.Vector3(6.0, 56.6, 2.0),
        new THREE.Vector3(0, 35.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-10 (132): FH29 Piezo Solid-State Shutter Button & Magnetic Haptic Top Dials
  // =========================================================================
  {
    const g = new THREE.Group();
    // Right-shoulder CNC titanium top control deck (-X)
    const deck = makeHorizCncPlate(
      createRoundedRectShape(40.0, 28.0, 4.2),
      4.2,
      mats.welcomeCoreMid,
      { bevel: 0.4, bevelSegs: 2, curveSegs: 18 }
    );
    g.add(deck);

    // 2 magnetic-coupled variable-detent haptic top dials (Mode & Exposure Comp)
    for (const [dx, dz, rad] of [
      [-6.0, -3.0, 8.4],
      [11.5, -5.0, 6.4],
    ]) {
      const dial = new THREE.Group();
      addKnurledRingToGroup(dial, rad, rad * 0.55, 5.2, 32, mats.welcomeCoreSlate, mats.welcomeTitaniumFace);
      dial.rotation.x = Math.PI / 2;
      dial.position.set(dx, 4.4, dz);
      g.add(dial);

      const cap = new THREE.Mesh(hiResCyl(rad * 0.72, rad * 0.72, 1.0, 24), mats.matteBlackAnodized);
      cap.position.set(dx, 6.8, dz);
      g.add(cap);
    }

    // Solid-state piezo shutter release button with emerald collar seated flush on grip crest
    const shCollar = new THREE.Mesh(hiResCyl(5.4, 5.8, 2.2, 22), mats.mofEmerald);
    shCollar.position.set(-10.0, 2.4, 9.6);
    shCollar.rotation.x = 0.20;
    g.add(shCollar);

    const shBtn = new THREE.Mesh(hiResCyl(4.2, 4.2, 2.6, 22), mats.welcomeTitaniumFace);
    shBtn.position.set(-10.0, 3.4, 9.8);
    shBtn.rotation.x = 0.20;
    g.add(shBtn);

    // Crimson solid-state movie REC button
    const rec = new THREE.Mesh(hiResCyl(2.4, 2.4, 1.8, 16), mats.bodyRecRed);
    rec.position.set(3.5, 3.0, 7.5);
    g.add(rec);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-piezo-haptic-dials',
        8,
        132,
        '#10b981',
        g,
        new THREE.Vector3(-37.0, 36.8, 2.0),
        new THREE.Vector3(-16.0, 21.0, 6.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-11 (133): CORE #3 (FH31) — Sulfide All-Solid-State Battery (ASSB 24Wh) Pack
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main solid-state battery cartridge (fits cleanly inside -X ergonomic grip)
    const housing = new THREE.Mesh(
      createChamferedBoxGeo(20.0, 52.0, 28.0, 2.6, 0.45, 'y'),
      mats.bodyBatteryShell
    );
    g.add(housing);

    // Side cutaway revealing 6-layer bipolar sulfide solid-state electrolyte cell stack!
    for (let i = 0; i < 6; i++) {
      const y = -17.5 + i * 7.0;
      const cell = new THREE.Mesh(
        createChamferedBoxGeo(20.6, 4.4, 22.0, 0.5, 0.08, 'y'),
        i % 2 === 0 ? mats.bodyBatteryCell : mats.mofEmerald
      );
      cell.position.set(0, y, 0);
      g.add(cell);
    }

    // Gold 4-pin high-current 3C-4C fast-charge contact terminal block on top
    const term = new THREE.Mesh(
      createChamferedBoxGeo(11.0, 2.2, 6.0, 0.4, 0.06, 'y'),
      mats.goldPlating
    );
    term.position.set(0, 26.8, -4.0);
    g.add(term);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-assb-battery-pack',
        8,
        133,
        '#0284c7',
        g,
        new THREE.Vector3(-47.5, -6.0, 4.5),
        new THREE.Vector3(-46.0, -14.0, 14.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-12 (134): FH37 PCIe 5.0/6.0 Dual CFexpress + Non-Volatile STT-MRAM Bay
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stainless shielded dual CFexpress card cage
    const cage = new THREE.Mesh(
      createChamferedBoxGeo(11.0, 38.0, 24.0, 1.2, 0.18, 'z'),
      mats.emiShieldCan
    );
    g.add(cage);

    // Protruding PCIe 5.0/6.0 7–10 GB/s CFexpress Type B card with emerald stripe
    const card = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 32.0, 24.0, 0.6, 0.08, 'z'),
      mats.welcomeCoreSlate
    );
    card.position.set(-4.5, 0, -2.0);
    g.add(card);

    const cardStripe = new THREE.Mesh(
      createChamferedBoxGeo(4.5, 5.0, 22.0, 0.2, 0.04, 'z'),
      mats.mofEmerald
    );
    cardStripe.position.set(-4.5, 10.0, -2.0);
    g.add(cardStripe);

    // Companion non-volatile STT-MRAM emergency frame-buffer chip on bay PCB
    const mram = buildChipPackage({
      w: 8.5,
      d: 8.5,
      h: 1.1,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      pin1Mat: mats.mofEmerald,
    });
    mram.rotation.z = Math.PI / 2;
    mram.position.set(6.2, -6.0, 0);
    g.add(mram);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-cfexpress-mram-bay',
        8,
        134,
        '#f59e0b',
        g,
        new THREE.Vector3(-44.0, -4.0, -10.5),
        new THREE.Vector3(-44.0, 14.0, -20.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-13 (135): FH38 Wi-Fi 8 (802.11bn) + 3GPP Rel-19 LEO Satellite NTN Antenna Module
  // =========================================================================
  {
    const g = new THREE.Group();
    // Non-conductive alumina ceramic RF radome deck on left top shoulder (+X)
    const radome = makeHorizCncPlate(
      createRoundedRectShape(28.0, 26.0, 3.2),
      3.4,
      mats.aluminaCeramic,
      { bevel: 0.35, bevelSegs: 2, curveSegs: 16 }
    );
    g.add(radome);

    // 4×2 Gold Phased-Array LEO Satellite NTN patch antenna elements on top surface
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const patch = new THREE.Mesh(
          createChamferedBoxGeo(4.8, 0.28, 7.6, 0.25, 0.04, 'y'),
          mats.goldPlating
        );
        patch.position.set(-8.7 + c * 5.8, 1.9, -5.0 + r * 10.0);
        g.add(patch);
      }
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-wifi8-ntn-antenna',
        8,
        135,
        '#eab308',
        g,
        new THREE.Vector3(40.5, 36.6, 0.5),
        new THREE.Vector3(24.0, 23.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH48-14 (136): FH40 Capacitive + Optical-Interference MEMS 4-Capsule Spatial Mic Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const bar = new THREE.Mesh(
      createChamferedBoxGeo(38.0, 5.2, 6.4, 1.2, 0.16, 'z'),
      mats.welcomeTitaniumFace
    );
    g.add(bar);

    // 4 gleaming gold/silicon optical-MEMS directional acoustic capsules
    for (const mx of [-13.5, -4.8, 4.8, 13.5]) {
      const cap = new THREE.Mesh(hiResCyl(2.1, 2.1, 1.4, 16), mats.goldPlating);
      cap.rotation.x = Math.PI / 2;
      cap.position.set(mx, 0, 3.2);
      g.add(cap);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-spatial-mic-array',
        8,
        136,
        '#d97706',
        g,
        new THREE.Vector3(6.0, 36.2, 16.2),
        new THREE.Vector3(0, 17.0, 24.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH48-15 (137): Left-Flank IP68 USB4 v2 (80Gbps) + Optical Fiber Cinema I/O Block
  // =========================================================================
  {
    const g = new THREE.Group();
    const tower = new THREE.Mesh(
      createChamferedBoxGeo(7.5, 48.0, 24.0, 1.6, 0.25, 'z'),
      mats.welcomeCoreSlate
    );
    g.add(tower);

    // Dual USB4 v2 Type-C stainless port collars + HDMI 2.1b
    for (const py of [15.0, 5.5, -5.0]) {
      const port = new THREE.Mesh(
        createChamferedBoxGeo(1.6, 5.4, 11.4, 0.9, 0.08, 'z'),
        mats.stainlessMachined
      );
      port.position.set(3.8, py, 0);
      g.add(port);
    }

    // Glowing cyan FH21 CPO Optical Fiber external link port at bottom
    const optPort = new THREE.Mesh(hiResCyl(3.4, 3.4, 1.8, 18), mats.blue450Glow);
    optPort.rotation.z = Math.PI / 2;
    optPort.position.set(3.8, -15.5, 0);
    g.add(optPort);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-io-usb4-optical-port',
        8,
        137,
        '#06b6d4',
        g,
        new THREE.Vector3(57.2, -2.5, -0.5),
        new THREE.Vector3(42.0, 0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-16 (138): FH26/30 Blue-PHOLED + Metasurface Naked-Eye 3D Rear Display
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-slim machined titanium display chassis
    const frame = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(76.0, 52.0, 3.0), 3.0, 0.22, 0.22, 2, 18),
      mats.welcomeCoreSlate
    );
    g.add(frame);

    // Vivid 1024px Blue-PHOLED + Naked-Eye 3D Live-View Telemetry screen facing rearward (-Z)!
    const screenGeo = extrudeHiRes(createRoundedRectShape(71.4, 47.4, 1.8), 0.24, 0.03, 0.03, 1, 14);
    applyPlanarUVs(screenGeo, 71.4, 47.4, 'xy');
    // Flip horizontal UVs by rotating Y=PI so text reads left-to-right when viewed from -Z rear!
    const screen = new THREE.Mesh(screenGeo, mats.fh48RearDisplay3dMap);
    screen.rotation.y = Math.PI;
    screen.position.z = -1.62;
    screen.userData.noEdges = true;
    g.add(screen);

    // Dual-axis vari-angle magnesium tilt hinge knuckle on +X side
    const hinge = new THREE.Mesh(hiResCyl(3.0, 3.0, 26.0, 16), mats.welcomeTitaniumFace);
    hinge.position.set(40.0, 0, 0.4);
    g.add(hinge);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-rear-3d-display',
        8,
        138,
        '#38bdf8',
        g,
        new THREE.Vector3(8.0, -7.0, -20.8),
        new THREE.Vector3(0, -8.0, -54.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH48-17 (139): Rear CFRP Weather-Sealed Back Cover & Piezo Multi-Selector Controls
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rear CFRP backplate with recessed display window pocket seated flush against Ti monocoque
    const back = new THREE.Mesh(
      extrudeHiRes(createFrameShape(118.0, 74.0, 6.2, 74.0, 50.0, 2.8), 5.6, 0.35, 0.35, 2, 22),
      mats.welcomeCoreSlate
    );
    g.add(back);

    // Solid-state piezo rear control wheel + AF-ON joystick on photographer's right (-X!)
    const rearWheel = new THREE.Group();
    addKnurledRingToGroup(rearWheel, 9.6, 5.2, 2.2, 32, mats.welcomeCoreMid, mats.welcomeTitaniumFace);
    rearWheel.position.set(-44.0, -10.0, -3.2);
    g.add(rearWheel);

    const joy = new THREE.Mesh(hiResCyl(3.0, 3.2, 2.8, 16), mats.mofEmerald);
    joy.rotation.x = Math.PI / 2;
    joy.position.set(-43.0, 12.0, -3.6);
    g.add(joy);

    // Rear perimeter IP68 EPDM waterproof gasket frame sealing tightly onto Ti skeleton
    const gasket = new THREE.Mesh(
      extrudeHiRes(createFrameShape(116.0, 72.0, 5.8, 113.0, 69.0, 5.2), 1.4, 0.08, 0.08, 1, 18),
      mats.epdmGasket
    );
    gasket.position.z = 3.1;
    g.add(gasket);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-rear-cfrp-shell',
        8,
        139,
        '#475569',
        g,
        new THREE.Vector3(0, -2.0, -15.4),
        new THREE.Vector3(0, 0, -37.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH48-18 (140): Bottom CNC Titanium Baseplate (Arca-Swiss Groove & Battery Door)
  // =========================================================================
  {
    const g = new THREE.Group();
    const plate = makeHorizCncPlate(
      createRoundedRectShape(120.0, 44.0, 5.8),
      4.6,
      mats.welcomeTitaniumFace,
      { bevel: 0.4, bevelSegs: 2, curveSegs: 20 }
    );
    g.add(plate);

    // Integrated Arca-Swiss dovetail tripod rail + stainless 1/4"-20 socket at optical axis
    const arca = new THREE.Mesh(
      createChamferedBoxGeo(54.0, 1.8, 38.0, 1.8, 0.25, 'y'),
      mats.welcomeCoreSlate
    );
    arca.position.set(6.0, -2.8, 0);
    g.add(arca);

    const socket = new THREE.Mesh(hiResCyl(4.4, 4.4, 2.4, 18), mats.stainlessMachined);
    socket.position.set(6.0, -2.9, 0);
    g.add(socket);

    // IP68 latched ASSB solid-state battery trapdoor on -X
    const batDoor = new THREE.Mesh(
      createChamferedBoxGeo(24.0, 1.2, 32.0, 2.2, 0.14, 'y'),
      mats.welcomeCoreMid
    );
    batDoor.position.set(-46.0, -2.4, 2.0);
    g.add(batDoor);

    // 10 stainless chassis fasteners (1 single InstancedMesh!)
    const boltGeo = hiResCyl(1.15, 1.15, 2.4, 10);
    const boltTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 5; i++) {
      const bx = -48.0 + i * 24.0;
      boltTransforms.push({ pos: [bx, -2.1, 17.5] });
      boltTransforms.push({ pos: [bx, -2.1, -17.5] });
    }
    g.add(makeMiraiInstanced(boltGeo, mats.stainlessMachined, boltTransforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh48-titanium-baseplate',
        8,
        140,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, -40.5, 0.2),
        new THREE.Vector3(0, -24.0, 0),
        cp,
        0.24
      )
    );
  }

  return parts;
}
