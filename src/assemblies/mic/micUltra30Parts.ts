import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildGoldWirebondLoop,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeMicUltraPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.2
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 32, edgeOpacity);

  return {
    id,
    subsystem: 'mic',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

function makeTexturedPlate(
  w: number,
  d: number,
  h: number,
  r: number,
  mat: THREE.Material,
  bevel = 0.05
): THREE.Mesh {
  const geo = extrudeHiRes(createRoundedRectShape(w, d, r), h, bevel, bevel, 2, 18);
  geo.rotateX(-Math.PI / 2);
  applyPlanarUVs(geo, w, d, 'xz');
  return new THREE.Mesh(geo, mat);
}

/**
 * Phase 30B: 38 Ultra-Microscopic 2026 Microphone 3D CAD Sub-Assemblies (MC43–MC80).
 *
 * Strictly enclosed inside the assembled Sony Mic Bay magnesium housing (|x| <= 23.0,
 * y in [-11.8, +9.8], z in [-15.2, +11.2]) so the assembled exterior remains 100% spotless,
 * while exploding cleanly into 4 museum-grade radial/orbital constellations:
 *  - MC43–MC54: MEMS Sub-Micron Semiconductor & Acoustic Nanophysics (Left-Upper / Left-Front Wing)
 *  - MC55–MC62: 2025–2026 Optical MEMS (sensiBel 84 dBA), ScAlN Piezo, VPU, 32-bit Float Dual-ADC & TinyML (Hero Front Arc)
 *  - MC63–MC72: ECM Electret Micro-Physics, Directional Acoustics & Analog Craftsmanship (Right Wing)
 *  - MC73–MC80: Pro Cinema I/O, MI-Shoe 4ch Digital Bus, Master PLL, LTC Timecode, Ambisonics & OTP (Rear Constellation)
 */
export function buildMicUltra30Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // MC43. FDTS Hydrophobic Self-Assembled Monolayer (~1.5 nm Anti-Stiction Coat)
  // =========================================================================
  {
    const g = new THREE.Group();
    const siGeo = hiResCyl(2.45, 2.52, 0.34, 32);
    applyPlanarUVs(siGeo, 5.0, 5.0, 'xz');
    const siBase = new THREE.Mesh(siGeo, u.micMemsSiliconDiaphragm);
    // Thin Al2O3 ALD hydrophilic bonding seed layer between Si and FDTS siloxane heads
    const aldLayer = new THREE.Mesh(hiResCyl(2.38, 2.38, 0.08, 30), mats.ceramicAlumina);
    aldLayer.position.y = 0.2;
    aldLayer.userData.noEdges = true;

    // 48 instanced ordered fluorocarbon CF3(CF2)7(CH2)2SiCl3 SAM brush chains + Si-O anchor feet + CF3 tips!
    const chainGeo = hiResCyl(0.045, 0.068, 0.54, 7);
    const footGeo = hiResSphere(0.075, 7, 6);
    const tipGeo = hiResSphere(0.06, 7, 6);
    const rings: Array<[number, number]> = [
      [8, 0.62],
      [16, 1.32],
      [24, 1.98],
    ];
    const totalChains = 48;
    const chains = new THREE.InstancedMesh(chainGeo, mats.vcWorkingFluidCyan, totalChains);
    const feet = new THREE.InstancedMesh(footGeo, mats.goldPlating, totalChains);
    const tips = new THREE.InstancedMesh(tipGeo, mats.coverGlass, totalChains);
    const dm = new THREE.Object3D();
    let cIdx = 0;
    for (const [cnt, rad] of rings) {
      for (let i = 0; i < cnt; i++) {
        const a = (i / cnt) * Math.PI * 2 + (cnt === 16 ? Math.PI / 16 : 0);
        const cx = Math.cos(a) * rad;
        const cz = Math.sin(a) * rad;
        dm.position.set(cx, 0.50, cz);
        dm.updateMatrix();
        chains.setMatrixAt(cIdx, dm.matrix);
        dm.position.set(cx, 0.25, cz);
        dm.updateMatrix();
        feet.setMatrixAt(cIdx, dm.matrix);
        dm.position.set(cx, 0.78, cz);
        dm.updateMatrix();
        tips.setMatrixAt(cIdx, dm.matrix);
        cIdx++;
      }
    }
    chains.instanceMatrix.needsUpdate = true;
    chains.userData.noEdges = true;
    feet.instanceMatrix.needsUpdate = true;
    feet.userData.noEdges = true;
    tips.instanceMatrix.needsUpdate = true;
    tips.userData.noEdges = true;

    // 5 high-contact-angle (118 deg) hydrophobic micro-droplets with specular contact meniscus rings!
    for (const [dx, dz, rad] of [
      [-0.78, 0.42, 0.42],
      [0.84, -0.36, 0.35],
      [0.12, 0.96, 0.29],
      [-0.28, -0.95, 0.26],
      [1.15, 0.72, 0.22],
    ]) {
      const drop = new THREE.Mesh(hiResSphere(rad, 16, 12), mats.coverGlass);
      drop.position.set(dx, 0.78 + rad * 0.76, dz);
      drop.userData.noEdges = true;
      const meniscus = new THREE.Mesh(hiResTorus(rad * 0.56, 0.03, 6, 16), mats.vcWorkingFluidCyan);
      meniscus.rotation.x = Math.PI / 2;
      meniscus.position.set(dx, 0.80, dz);
      meniscus.userData.noEdges = true;
      g.add(drop, meniscus);
    }
    const rim = new THREE.Mesh(hiResTorus(2.48, 0.11, 10, 32), mats.goldPlating);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.16;
    g.add(siBase, aldLayer, chains, feet, tips, rim);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-fdts-sam-coat',
        43,
        '#06b6d4',
        g,
        new THREE.Vector3(-16.0, 3.2, 4.2),
        new THREE.Vector3(-22.0, 24.8, 11.8),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // MC44. 2 μm Barometric Pressure-Equalization Micro-Vent Hole (20 Hz LFRO)
  // =========================================================================
  {
    const g = new THREE.Group();
    const plateShape = new THREE.Shape();
    plateShape.absarc(0, 0, 2.5, 0, Math.PI * 2, false);
    const ventHole = new THREE.Path();
    ventHole.absarc(0, 0, 0.46, 0, Math.PI * 2, true);
    plateShape.holes.push(ventHole);
    const plateGeo = extrudeHiRes(plateShape, 0.42, 0.04, 0.04, 2, 30);
    plateGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(plateGeo, 5.0, 5.0, 'xz');
    const plate = new THREE.Mesh(plateGeo, u.micDrieSiliconBackplate);

    // Lathe-turned DRIE Venturi gold throat nozzle + 3 concentric acoustic baffle step rings + 8 radial grooves!
    const ventProf = [
      new THREE.Vector2(0.46, -0.24),
      new THREE.Vector2(0.62, -0.24),
      new THREE.Vector2(0.56, 0.0),
      new THREE.Vector2(0.68, 0.28),
      new THREE.Vector2(0.44, 0.28),
      new THREE.Vector2(0.40, 0.0),
      new THREE.Vector2(0.46, -0.24),
    ];
    const ventGeo = markHiRes(new THREE.LatheGeometry(ventProf, 28));
    ventGeo.computeVertexNormals();
    const ventNozzle = new THREE.Mesh(ventGeo, mats.goldPlating);
    for (const [rad, tube, mat] of [
      [1.08, 0.06, mats.goldPlating],
      [1.56, 0.075, mats.titaniumRivet],
      [2.16, 0.085, mats.stainlessMachined],
    ] as Array<[number, number, THREE.Material]>) {
      const baffle = new THREE.Mesh(hiResTorus(rad, tube, 8, 28), mat);
      baffle.rotation.x = Math.PI / 2;
      baffle.position.y = 0.24;
      baffle.userData.noEdges = true;
      g.add(baffle);
    }
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const groove = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.04, 0.09), mats.siliconDramLayer);
      groove.position.set(Math.cos(a) * 1.48, 0.23, Math.sin(a) * 1.48);
      groove.rotation.y = -a;
      groove.userData.noEdges = true;
      g.add(groove);
    }

    // Laminar DC-pressure bleed plume filament ringed with 3 flow streamline collars
    const bleedTube = new THREE.Mesh(hiResCyl(0.16, 0.26, 1.55, 16), mats.vcWorkingFluidCyan);
    bleedTube.position.y = 0.14;
    bleedTube.userData.noEdges = true;
    for (const fy of [-0.42, 0.18, 0.68]) {
      const fRing = new THREE.Mesh(hiResTorus(0.32 - fy * 0.06, 0.045, 6, 16), mats.coverGlass);
      fRing.rotation.x = Math.PI / 2;
      fRing.position.y = fy;
      fRing.userData.noEdges = true;
      g.add(fRing);
    }
    g.add(plate, ventNozzle, bleedTube);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-barometric-vent-hole',
        44,
        '#38bdf8',
        g,
        new THREE.Vector3(-16.0, 2.8, 4.2),
        new THREE.Vector3(-34.0, 19.2, 9.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC45. Squeeze-Film Viscous Air-Damping Zone & Brownian Thermal Noise Floor
  // =========================================================================
  {
    const g = new THREE.Group();
    const cushion = new THREE.Mesh(hiResCyl(2.44, 2.44, 0.54, 30), mats.coverGlass);
    // Upper & lower micro-perforated silicon confining plates framing the squeeze-film air gap!
    const plateRingTop = new THREE.Mesh(hiResTorus(2.42, 0.11, 10, 32), u.micDrieSiliconBackplate);
    plateRingTop.rotation.x = Math.PI / 2;
    plateRingTop.position.y = 0.30;
    const plateRingBot = plateRingTop.clone();
    plateRingBot.position.y = -0.30;
    // 4 precision 2-micron ceramic gap spacer beads around perimeter
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const bead = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.58, 10), mats.ceramicAlumina);
      bead.position.set(Math.cos(a) * 2.38, 0, Math.sin(a) * 2.38);
      bead.userData.noEdges = true;
      g.add(bead);
    }

    // 12 curved radial viscous squeeze-film airflow velocity streamlines radiating toward edge vents
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(a) * 0.35, 0.04, Math.sin(a) * 0.35),
        new THREE.Vector3(Math.cos(a + 0.14) * 1.15, 0.08, Math.sin(a + 0.14) * 1.15),
        new THREE.Vector3(Math.cos(a + 0.06) * 2.15, 0.04, Math.sin(a + 0.06) * 2.15),
      ]);
      const stream = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(curve, 14, 0.055, 6, false)),
        mats.vcWorkingFluidCyan
      );
      stream.userData.noEdges = true;
      g.add(stream);
    }

    // 20 instanced Brownian k_B*T thermal air molecules with momentum vector tails!
    const molGeo = hiResSphere(0.13, 10, 8);
    const tailGeo = hiResCyl(0.02, 0.06, 0.32, 6);
    const mols = new THREE.InstancedMesh(molGeo, mats.goldPlating, 20);
    const tails = new THREE.InstancedMesh(tailGeo, mats.copperCoil, 20);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2 * 1.618;
      const r = 0.55 + ((i * 7) % 15) * 0.11;
      const my = ((i % 3) - 1) * 0.24;
      const mx = Math.cos(a) * r;
      const mz = Math.sin(a) * r;
      dm.position.set(mx, my, mz);
      dm.rotation.set(0, 0, 0);
      dm.updateMatrix();
      mols.setMatrixAt(i, dm.matrix);
      dm.position.set(mx - Math.cos(a) * 0.16, my, mz - Math.sin(a) * 0.16);
      dm.rotation.set(0, -a, Math.PI / 2);
      dm.updateMatrix();
      tails.setMatrixAt(i, dm.matrix);
    }
    mols.instanceMatrix.needsUpdate = true;
    mols.userData.noEdges = true;
    tails.instanceMatrix.needsUpdate = true;
    tails.userData.noEdges = true;
    g.add(cushion, plateRingTop, plateRingBot, mols, tails);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-squeeze-film-zone',
        45,
        '#0ea5e9',
        g,
        new THREE.Vector3(-16.0, 2.3, 4.2),
        new THREE.Vector3(-22.0, 13.7, 21.8),
        cp,
        0.15
      )
    );
  }

  // =========================================================================
  // MC46. LPCVD Residual-Stress-Compensated Polysilicon Meander Spring Anchors
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer rigid DRIE silicon anchor frame with planar UVs + corner gold strain-gauge test pads!
    const frameGeo = extrudeHiRes(
      createFrameShape(5.2, 5.2, 0.7, 3.85, 3.85, 0.45),
      0.44,
      0.04,
      0.04,
      2,
      20
    );
    frameGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(frameGeo, 5.2, 5.2, 'xz');
    const anchorFrame = new THREE.Mesh(frameGeo, u.micDrieSiliconBackplate);

    // Central floating stress-free diaphragm hub with corrugated ring & gold sense dot
    const hubGeo = hiResCyl(1.18, 1.18, 0.28, 28);
    applyPlanarUVs(hubGeo, 2.36, 2.36, 'xz');
    const hub = new THREE.Mesh(hubGeo, u.micMemsSiliconDiaphragm);
    const hubRim = new THREE.Mesh(hiResTorus(1.14, 0.08, 8, 26), mats.goldPlating);
    hubRim.rotation.x = Math.PI / 2;
    hubRim.position.y = 0.14;
    hubRim.userData.noEdges = true;
    const hubDot = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.08, 18), mats.goldPlating);
    hubDot.position.y = 0.16;
    hubDot.userData.noEdges = true;

    // 4 multi-fold 5-bend S-meander LPCVD polysilicon stress-relief flexures + anchor fillets & gold test pads!
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(a) * 1.12, 0.04, Math.sin(a) * 1.12),
        new THREE.Vector3(Math.cos(a + 0.28) * 1.42, 0.08, Math.sin(a + 0.28) * 1.42),
        new THREE.Vector3(Math.cos(a - 0.26) * 1.72, 0.04, Math.sin(a - 0.26) * 1.72),
        new THREE.Vector3(Math.cos(a + 0.24) * 2.02, 0.08, Math.sin(a + 0.24) * 2.02),
        new THREE.Vector3(Math.cos(a - 0.18) * 2.28, 0.04, Math.sin(a - 0.18) * 2.28),
        new THREE.Vector3(Math.cos(a) * 2.52, 0.04, Math.sin(a) * 2.52),
      ]);
      const spr = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(curve, 26, 0.095, 8, false)),
        mats.titaniumRivet
      );
      spr.userData.noEdges = true;
      const strainPad = new THREE.Mesh(
        createChamferedBoxGeo(0.54, 0.14, 0.54, 0.06, 0.02, 'y'),
        mats.goldPlating
      );
      strainPad.position.set(Math.cos(a) * 2.86, 0.25, Math.sin(a) * 2.86);
      strainPad.userData.noEdges = true;
      g.add(spr, strainPad);
    }
    g.add(anchorFrame, hub, hubRim, hubDot);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-stress-relief-springs',
        46,
        '#f59e0b',
        g,
        new THREE.Vector3(-16.0, 3.0, 4.2),
        new THREE.Vector3(-36.0, 9.0, 19.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC47. Dual-Backplate (DBP) Differential Push-Pull Capacitive MEMS Sandwich
  // =========================================================================
  {
    const g = new THREE.Group();
    const makePerfPlate = (yPos: number, mat: THREE.Material) => {
      const sh = new THREE.Shape();
      sh.absarc(0, 0, 2.38, 0, Math.PI * 2, false);
      // Center + 6 inner + 6 outer = 13 true acoustic holes!
      const cHole = new THREE.Path();
      cHole.absarc(0, 0, 0.24, 0, Math.PI * 2, true);
      sh.holes.push(cHole);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const h1 = new THREE.Path();
        h1.absarc(Math.cos(a) * 0.92, Math.sin(a) * 0.92, 0.22, 0, Math.PI * 2, true);
        sh.holes.push(h1);
        const h2 = new THREE.Path();
        h2.absarc(Math.cos(a + Math.PI / 6) * 1.68, Math.sin(a + Math.PI / 6) * 1.68, 0.22, 0, Math.PI * 2, true);
        sh.holes.push(h2);
      }
      const geo = extrudeHiRes(sh, 0.26, 0.03, 0.03, 1, 26);
      geo.rotateX(-Math.PI / 2);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = yPos;
      return mesh;
    };
    const topBackplate = makePerfPlate(0.68, mats.goldPlating);
    const botBackplate = makePerfPlate(-0.68, mats.copperCoil);

    const midGeo = hiResCyl(2.26, 2.26, 0.18, 30);
    applyPlanarUVs(midGeo, 4.52, 4.52, 'xz');
    const midMembrane = new THREE.Mesh(midGeo, u.micMemsSiliconDiaphragm);
    for (const r of [1.15, 1.82]) {
      const corr = new THREE.Mesh(hiResTorus(r, 0.06, 8, 28), mats.siliconPhotodiode);
      corr.rotation.x = Math.PI / 2;
      corr.position.y = 0.08;
      corr.userData.noEdges = true;
      g.add(corr);
    }

    // 6 Al2O3 dielectric spacer pillars holding symmetric +C / -C air gaps
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const post = new THREE.Mesh(hiResCyl(0.14, 0.14, 1.38, 12), mats.ceramicAlumina);
      post.position.set(Math.cos(a) * 2.15, 0, Math.sin(a) * 2.15);
      post.userData.noEdges = true;
      g.add(post);
    }
    // Twin differential +C / -C sense lugs crowned with gold wirebond ball-studs!
    const posLug = new THREE.Mesh(createChamferedBoxGeo(0.95, 0.22, 0.58, 0.06, 0.02, 'y'), mats.goldPlating);
    posLug.position.set(2.55, 0.68, 0);
    const posStud = new THREE.Mesh(hiResSphere(0.14, 8, 6), mats.goldPlating);
    posStud.position.set(2.75, 0.84, 0);
    posStud.userData.noEdges = true;
    const negLug = new THREE.Mesh(createChamferedBoxGeo(0.95, 0.22, 0.58, 0.06, 0.02, 'y'), mats.vcWorkingFluidCyan);
    negLug.position.set(2.55, -0.68, 0);
    const negStud = new THREE.Mesh(hiResSphere(0.14, 8, 6), mats.goldPlating);
    negStud.position.set(2.75, -0.52, 0);
    negStud.userData.noEdges = true;
    g.add(topBackplate, midMembrane, botBackplate, posLug, posStud, negLug, negStud);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-dual-backplate-diff',
        47,
        '#eab308',
        g,
        new THREE.Vector3(-16.0, 1.7, 4.2),
        new THREE.Vector3(-20.0, 2.3, 27.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC48. Active Parasitic-Capacitance Guard Ring & Driven Coaxial Shield Trace
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = makeTexturedPlate(5.0, 4.6, 0.36, 0.55, u.micStarGroundPcb, 0.04);
    // 3-ring coaxial electrode stack: Copper GND -> Active Bootstrapped Cyan Guard -> Inner Gold Sense Pad!
    const outerGnd = new THREE.Mesh(hiResTorus(1.88, 0.13, 10, 30), mats.copperCoil);
    outerGnd.rotation.x = Math.PI / 2;
    outerGnd.position.y = 0.26;
    const activeGuard = new THREE.Mesh(hiResTorus(1.25, 0.15, 10, 30), mats.vcWorkingFluidCyan);
    activeGuard.rotation.x = Math.PI / 2;
    activeGuard.position.y = 0.28;
    const senseCenter = new THREE.Mesh(hiResCyl(0.62, 0.62, 0.24, 22), mats.goldPlating);
    senseCenter.position.y = 0.28;
    const senseStud = new THREE.Mesh(hiResSphere(0.14, 8, 6), mats.goldPlating);
    senseStud.position.y = 0.44;
    senseStud.userData.noEdges = true;

    // Unity-gain driven guard buffer ASIC micro-die linked via gold wirebond arch!
    const bufGeo = createChamferedBoxGeo(1.12, 0.34, 0.92, 0.08, 0.03, 'y');
    applyPlanarUVs(bufGeo, 1.12, 0.92, 'xz');
    const bufDie = new THREE.Mesh(bufGeo, u.micMemsAsicDie);
    bufDie.position.set(-1.68, 0.34, 1.38);
    const guardWire = buildGoldWirebondLoop(
      new THREE.Vector3(-1.32, 0.48, 1.12),
      new THREE.Vector3(-0.88, 0.34, 0.88),
      0.38,
      0.05,
      mats.goldPlating
    );

    // 12 instanced stitched coaxial perimeter ground shield vias
    const viaGeo = hiResCyl(0.11, 0.11, 0.42, 8);
    const vias = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 12);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      dm.position.set(Math.cos(a) * 1.92, 0.04, Math.sin(a) * 1.92);
      dm.updateMatrix();
      vias.setMatrixAt(i, dm.matrix);
    }
    vias.instanceMatrix.needsUpdate = true;
    vias.userData.noEdges = true;
    g.add(sub, outerGnd, activeGuard, senseCenter, senseStud, bufDie, guardWire, vias);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-guard-ring-parasitic',
        48,
        '#14b8a6',
        g,
        new THREE.Vector3(-15.0, 1.1, 4.2),
        new THREE.Vector3(-35.0, -3.1, 25.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC49. Ultra-Low-Modulus Silicone Die-Attach Thermal-Warp Isolator Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ceramic LGA base + soft pink silicone elastomer frame with 8 compliant bellows pillows + central O-ring!
    const lgaFloor = makeTexturedPlate(5.1, 5.1, 0.24, 0.72, u.micCeramicLgaSubstrate, 0.03);
    lgaFloor.position.y = -0.34;
    const basePad = makeHiResHorizPlate(
      createFrameShape(4.9, 4.9, 0.8, 3.1, 3.1, 0.55),
      0.48,
      mats.thermalPadPink,
      0.08,
      2,
      22
    );
    const portOring = new THREE.Mesh(hiResTorus(1.12, 0.22, 10, 26), mats.thermalPadPink);
    portOring.rotation.x = Math.PI / 2;
    portOring.position.y = 0.04;
    portOring.userData.noEdges = true;

    const pillowGeo = hiResSphere(0.46, 12, 10);
    const pillowCoords: Array<[number, number]> = [
      [-1.78, -1.78], [1.78, -1.78], [-1.78, 1.78], [1.78, 1.78],
      [0, -1.96], [0, 1.96], [-1.96, 0], [1.96, 0],
    ];
    const pillows = new THREE.InstancedMesh(pillowGeo, mats.damperElastomer, pillowCoords.length);
    const dm = new THREE.Object3D();
    for (let i = 0; i < pillowCoords.length; i++) {
      dm.position.set(pillowCoords[i][0], 0.32, pillowCoords[i][1]);
      dm.scale.set(1.0, 0.58, 1.0);
      dm.updateMatrix();
      pillows.setMatrixAt(i, dm.matrix);
    }
    pillows.instanceMatrix.needsUpdate = true;
    pillows.userData.noEdges = true;

    // Al2O3 ceramic MEMS carrier frame resting stress-free atop bellows + 4 gold corner alignment fiducials
    const carrier = makeHiResHorizPlate(
      createFrameShape(4.4, 4.4, 0.6, 3.4, 3.4, 0.4),
      0.22,
      mats.ceramicAlumina,
      0.03,
      1,
      18
    );
    carrier.position.y = 0.62;
    for (const [fx, fz] of [
      [-1.88, -1.88], [1.88, -1.88], [-1.88, 1.88], [1.88, 1.88],
    ]) {
      const fid = new THREE.Mesh(hiResCyl(0.16, 0.16, 0.06, 10), mats.goldPlating);
      fid.position.set(fx, 0.75, fz);
      fid.userData.noEdges = true;
      g.add(fid);
    }
    g.add(lgaFloor, basePad, portOring, pillows, carrier);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-die-attach-silicone',
        49,
        '#f472b6',
        g,
        new THREE.Vector3(-15.0, -0.3, 4.2),
        new THREE.Vector3(-29.0, -9.7, 17.8),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // MC50. On-ASIC 12 V Multi-Stage Dickson Charge Pump & RC Ripple Filter
  // =========================================================================
  {
    const g = new THREE.Group();
    const dieSub = makeTexturedPlate(5.2, 3.8, 0.42, 0.4, u.micMemsAsicDie, 0.04);
    // 6-stage voltage-doubler MIM capacitor ladder (1.8V -> 12V) + 5 inter-stage MOSFET transfer switches!
    for (let i = 0; i < 6; i++) {
      const x = -1.9 + i * 0.76;
      const cap = new THREE.Mesh(
        createChamferedBoxGeo(0.52, 0.24 + i * 0.065, 1.48, 0.05, 0.02, 'y'),
        i % 2 === 0 ? mats.goldPlating : mats.copperCoil
      );
      cap.position.set(x, 0.34 + i * 0.032, -0.52);
      cap.userData.noEdges = true;
      g.add(cap);
      if (i < 5) {
        const sw = new THREE.Mesh(
          createChamferedBoxGeo(0.24, 0.16, 0.56, 0.03, 0.01, 'y'),
          mats.siliconSensorDie
        );
        sw.position.set(x + 0.38, 0.30, -0.52);
        sw.userData.noEdges = true;
        g.add(sw);
      }
    }
    // Dual non-overlapping Φ1 / Φ2 copper clock bus rails
    for (const cz of [-1.42, 0.38]) {
      const clkRail = new THREE.Mesh(new THREE.BoxGeometry(4.45, 0.08, 0.16), mats.copperCoil);
      clkRail.position.set(0, 0.27, cz);
      clkRail.userData.noEdges = true;
      g.add(clkRail);
    }
    // Output HV RC ripple-filter bridge bar + gold 12V VBIAS terminal stud
    const filterBar = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.28, 0.65, 0.06, 0.02, 'y'),
      mats.vcWorkingFluidCyan
    );
    filterBar.position.set(-0.35, 0.35, 1.08);
    const vbiasPad = new THREE.Mesh(
      createChamferedBoxGeo(0.68, 0.24, 0.68, 0.06, 0.02, 'y'),
      mats.goldPlating
    );
    vbiasPad.position.set(1.92, 0.35, 1.08);
    vbiasPad.userData.noEdges = true;
    g.add(dieSub, filterBar, vbiasPad);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-dickson-chargepump',
        50,
        '#a855f7',
        g,
        new THREE.Vector3(-11.6, 0.9, 4.2),
        new THREE.Vector3(-22.4, -14.9, 27.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC51. >100 GΩ Back-to-Back PMOS Pseudo-Resistor Constant-Charge Bias Bridge
  // =========================================================================
  {
    const g = new THREE.Group();
    const wafer = makeTexturedPlate(4.8, 3.6, 0.38, 0.42, u.micMemsAsicDie, 0.04);
    // Twin symmetrical serpentine PMOS high-impedance diode chains studded with polysilicon gate fingers!
    for (const side of [-1, 1]) {
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k <= 8; k++) {
        const t = k / 8;
        pts.push(
          new THREE.Vector3(
            side * (0.32 + t * 1.68),
            0.34,
            k % 2 === 0 ? -0.68 : 0.68
          )
        );
      }
      const serp = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 28, 0.095, 8, false)),
        side < 0 ? mats.goldPlating : mats.vcWorkingFluidCyan
      );
      serp.userData.noEdges = true;
      // Polysilicon gate-finger rungs crossing serpentine channel
      for (let r = 0; r < 4; r++) {
        const rung = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 1.52), mats.gatePolysilicon);
        rung.position.set(side * (0.62 + r * 0.42), 0.27, 0);
        rung.userData.noEdges = true;
        g.add(rung);
      }
      // Wirebond tap from outer terminal to corner gold pad
      const tap = buildGoldWirebondLoop(
        new THREE.Vector3(side * 1.98, 0.36, -0.68),
        new THREE.Vector3(side * 2.02, 0.25, -1.32),
        0.34,
        0.045,
        mats.goldPlating
      );
      g.add(serp, tap);
    }
    // Center shielded ultra-high-Z crimson bias terminal dome encircled by driven guard ring!
    const node = new THREE.Mesh(hiResCyl(0.42, 0.5, 0.34, 20), mats.cinnabarAnodized);
    node.position.y = 0.36;
    const nodeGuard = new THREE.Mesh(hiResTorus(0.66, 0.065, 8, 24), mats.vcWorkingFluidCyan);
    nodeGuard.rotation.x = Math.PI / 2;
    nodeGuard.position.y = 0.26;
    nodeGuard.userData.noEdges = true;
    g.add(wafer, node, nodeGuard);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-pseudoresistor-100gohm',
        51,
        '#f43f5e',
        g,
        new THREE.Vector3(-11.6, 1.4, 4.2),
        new THREE.Vector3(-36.4, 24.6, -10.2),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC52. Chopper-Stabilized Low-Noise Amplifier (1/f Flicker-Noise Cancellation)
  // =========================================================================
  {
    const g = new THREE.Group();
    const substrate = makeTexturedPlate(5.0, 4.0, 0.42, 0.45, u.micMemsAsicDie, 0.04);
    // Input 4-Switch Chopper Modulator -> Common-Centroid Interdigitated LNA Core -> Output 4-Switch Demodulator!
    for (const [sx, sign] of [
      [-1.58, -1],
      [1.58, 1],
    ]) {
      const quadBase = new THREE.Mesh(
        createChamferedBoxGeo(1.08, 0.34, 2.3, 0.08, 0.03, 'y'),
        mats.vcWorkingFluidCyan
      );
      quadBase.position.set(sx, 0.38, 0);
      // 4 mini MOSFET chopper switch tiles on each modulator/demodulator block
      for (const [ox, oz] of [
        [-0.24, -0.58], [0.24, -0.58], [-0.24, 0.58], [0.24, 0.58],
      ]) {
        const fet = new THREE.Mesh(
          createChamferedBoxGeo(0.32, 0.14, 0.72, 0.03, 0.01, 'y'),
          mats.goldPlating
        );
        fet.position.set(sx + ox, 0.60, oz);
        fet.userData.noEdges = true;
        g.add(fet);
      }
      g.add(quadBase);
      void sign;
    }

    const lnaCore = new THREE.Mesh(createChamferedBoxGeo(1.48, 0.48, 2.55, 0.1, 0.04, 'y'), mats.siliconSensorDie);
    lnaCore.position.set(0, 0.45, 0);
    // 5 interleaved common-centroid matched differential transistor fingers on LNA core
    for (let i = -2; i <= 2; i++) {
      const finger = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.14, 2.1),
        i % 2 === 0 ? mats.goldPlating : mats.copperCoil
      );
      finger.position.set(i * 0.25, 0.73, 0);
      finger.userData.noEdges = true;
      g.add(finger);
    }

    // Twin cross-coupled f_chop gold clock modulation wirebond arches looping cleanly over LNA core!
    const clkBridgeA = buildGoldWirebondLoop(
      new THREE.Vector3(-1.58, 0.64, -0.82),
      new THREE.Vector3(1.58, 0.64, -0.82),
      0.86,
      0.068,
      mats.goldPlating
    );
    const clkBridgeB = buildGoldWirebondLoop(
      new THREE.Vector3(-1.58, 0.64, 0.82),
      new THREE.Vector3(1.58, 0.64, 0.82),
      0.86,
      0.068,
      mats.copperCoil
    );
    g.add(substrate, lnaCore, clkBridgeA, clkBridgeB);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-chopper-lna-1f',
        52,
        '#6366f1',
        g,
        new THREE.Vector3(-11.6, 0.3, 4.2),
        new THREE.Vector3(-24.4, 17.7, -16.2),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC53. 2026 399 μW / 114.3 dB DR Companding Ring-Oscillator VCO-ADC & ΣΔ Modulator
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(5.4, 4.2, 0.44, 0.45, u.micMemsAsicDie, 0.05);
    // Dual HSNR (x4) & HDR Ring-Oscillator VCO-ADC multi-phase torus rings!
    for (const [vx, mat] of [
      [-1.35, mats.vcWorkingFluidCyan],
      [0.35, mats.goldPlating],
    ] as Array<[number, THREE.Material]>) {
      const vcoRing = new THREE.Mesh(hiResTorus(0.68, 0.14, 10, 24), mat);
      vcoRing.rotation.x = Math.PI / 2;
      vcoRing.position.set(vx, 0.44, -0.62);
      const vcoCore = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.24, 14), mats.siliconSensorDie);
      vcoCore.position.set(vx, 0.36, -0.62);
      vcoCore.userData.noEdges = true;
      g.add(vcoRing, vcoCore);
    }
    // 5th-order 1-bit PDM digital noise-shaper block + crimson <2 us 5-cycle handover comparator!
    const shaper = new THREE.Mesh(
      createChamferedBoxGeo(1.05, 0.48, 2.05, 0.08, 0.03, 'y'),
      mats.ispSiliconDie
    );
    shaper.position.set(1.88, 0.46, -0.45);
    const handoverCmp = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.3, 0.78, 0.08, 0.03, 'y'),
      mats.cinnabarAnodized
    );
    handoverCmp.position.set(0, 0.38, 1.15);
    // 4 gold SPI trim/calibration pads along front edge
    for (let i = 0; i < 4; i++) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, 0.32), mats.goldPlating);
      pad.position.set(-1.5 + i * 1.0, 0.27, 1.78);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    g.add(base, shaper, handoverCmp);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-companding-sdm-2026',
        53,
        '#8b5cf6',
        g,
        new THREE.Vector3(-11.6, -0.1, 4.2),
        new THREE.Vector3(-36.4, 10.1, -22.2),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC54. PDM→PCM Cascaded Integrator-Comb (CIC) Decimation & Half-Band FIR Filter
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(5.4, 4.0, 0.44, 0.45, u.micAudioDsp32Float, 0.05);
    // 6 descending CIC decimation stages (3.072 MHz PDM -> 48 kHz PCM) on -Z half!
    for (let i = 0; i < 6; i++) {
      const barH = 0.86 - i * 0.1;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.56, barH, 1.25, 0.05, 0.02, 'y'),
        i < 3 ? mats.siliconSensorDie : mats.vcWorkingFluidCyan
      );
      bar.position.set(-1.95 + i * 0.78, 0.22 + barH * 0.5, -0.78);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    // 7 symmetric sinc-shaped half-band FIR filter coefficient pillars on +Z half!
    const sincH = [0.26, 0.42, 0.64, 0.92, 0.64, 0.42, 0.26];
    for (let i = 0; i < 7; i++) {
      const h = sincH[i];
      const tap = new THREE.Mesh(
        createChamferedBoxGeo(0.44, h, 0.92, 0.05, 0.02, 'y'),
        i === 3 ? mats.goldPlating : mats.copperCoil
      );
      tap.position.set(-1.86 + i * 0.62, 0.22 + h * 0.5, 0.76);
      tap.userData.noEdges = true;
      g.add(tap);
    }
    // Gold 24-bit I2S output busbar rail along front edge
    const i2sBar = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.14, 0.28), mats.goldPlating);
    i2sBar.position.set(0, 0.30, 1.56);
    i2sBar.userData.noEdges = true;
    g.add(base, i2sBar);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-cic-decimation-fir',
        54,
        '#3b82f6',
        g,
        new THREE.Vector3(-11.6, -0.5, 4.2),
        new THREE.Vector3(-24.4, -5.5, -22.2),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC55. HERO 2026 sensiBel SBM140B Optical MEMS VCSEL Laser Interferometer (84 dBA / 146 dB AOP)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Base optical ceramic substrate with bespoke diffractive grating interferometer texture!
    const optBase = makeTexturedPlate(6.4, 5.4, 0.52, 0.75, u.micOpticalInterferometer, 0.06);
    // Central 850 nm ruby VCSEL emitter seated in stepped gold TO-can header collar
    const vcselCollar = new THREE.Mesh(hiResTorus(0.76, 0.12, 10, 26), mats.goldPlating);
    vcselCollar.rotation.x = Math.PI / 2;
    vcselCollar.position.set(0, 0.34, 0);
    const vcsel = new THREE.Mesh(hiResCyl(0.62, 0.74, 0.62, 24), mats.cinnabarAnodized);
    vcsel.position.set(0, 0.56, 0);
    const vcselAperture = new THREE.Mesh(hiResCyl(0.26, 0.26, 0.7, 16), mats.evfIrEmitter);
    vcselAperture.position.set(0, 0.58, 0);
    vcselAperture.userData.noEdges = true;

    // Suspended Diffractive Optical Element (DOE) micro-grating lens disc hovering above VCSEL!
    const doeDisc = new THREE.Mesh(hiResCyl(0.95, 0.95, 0.12, 26), mats.coverGlass);
    doeDisc.position.set(0, 1.24, 0);
    doeDisc.userData.noEdges = true;
    const doeRim = new THREE.Mesh(hiResTorus(0.96, 0.06, 8, 26), mats.goldPlating);
    doeRim.rotation.x = Math.PI / 2;
    doeRim.position.set(0, 1.24, 0);
    doeRim.userData.noEdges = true;

    // Translucent ruby optical interferometric beam expanding upward to floating reflective diaphragm!
    const beamCone = new THREE.Mesh(hiResCyl(1.48, 0.32, 1.85, 26, true), mats.evfIrEmitter);
    beamCone.position.set(0, 1.65, 0);
    beamCone.userData.noEdges = true;

    // Floating reflective silicon optical diaphragm with planar grating UVs + gold clamping bezel!
    const mirrorGeo = hiResCyl(2.28, 2.28, 0.2, 34);
    applyPlanarUVs(mirrorGeo, 4.56, 4.56, 'xz');
    const optMirror = new THREE.Mesh(mirrorGeo, u.micOpticalInterferometer);
    optMirror.position.set(0, 2.58, 0);
    const mirrorRim = new THREE.Mesh(hiResTorus(2.3, 0.11, 10, 34), mats.goldPlating);
    mirrorRim.rotation.x = Math.PI / 2;
    mirrorRim.position.set(0, 2.58, 0);

    // 4 flanking corner quadrant photodiode detectors + +/-1st-order diffracted ruby beams + gold wirebonds!
    for (const [px, pz] of [
      [-1.95, -1.45],
      [1.95, -1.45],
      [-1.95, 1.45],
      [1.95, 1.45],
    ]) {
      const pd = new THREE.Mesh(createChamferedBoxGeo(1.08, 0.42, 0.94, 0.08, 0.03, 'y'), mats.siliconSensorDie);
      pd.position.set(px, 0.46, pz);
      const pdWindow = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.08, 0.56), mats.evfDichroicMirror);
      pdWindow.position.set(px, 0.69, pz);
      pdWindow.userData.noEdges = true;
      // Diffracted interference ray from floating mirror down onto quadrant photodiode!
      const rayCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(px * 0.32, 2.46, pz * 0.32),
        new THREE.Vector3(px, 0.72, pz),
      ]);
      const ray = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(rayCurve, 8, 0.055, 6, false)),
        mats.evfIrEmitter
      );
      ray.userData.noEdges = true;
      // Gold wirebond linking PD pad to ceramic substrate edge
      const wb = buildGoldWirebondLoop(
        new THREE.Vector3(px, 0.68, pz),
        new THREE.Vector3(px * 1.32, 0.30, pz * 1.18),
        0.38,
        0.045,
        mats.goldPlating
      );
      g.add(pd, pdWindow, ray, wb);
    }

    // 4 slender quartz spacer columns with gold ferrules supporting floating optical diaphragm
    for (const [sx, sz] of [
      [-2.55, -1.95],
      [2.55, -1.95],
      [-2.55, 1.95],
      [2.55, 1.95],
    ]) {
      const post = new THREE.Mesh(hiResCyl(0.14, 0.14, 2.35, 12), mats.coverGlass);
      post.position.set(sx, 1.4, sz);
      post.userData.noEdges = true;
      const cap = new THREE.Mesh(hiResCyl(0.22, 0.22, 0.22, 12), mats.goldPlating);
      cap.position.set(sx, 0.36, sz);
      cap.userData.noEdges = true;
      g.add(post, cap);
    }
    g.add(optBase, vcselCollar, vcsel, vcselAperture, doeDisc, doeRim, beamCone, optMirror, mirrorRim);

    parts.push(
      finalizeMicUltraPart(
        'mc-optical-mems-vcsel-2026',
        55,
        '#e11d48',
        g,
        new THREE.Vector3(-6.5, 2.2, 4.2),
        new THREE.Vector3(-9.5, 23.8, 23.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC56. 2026 Sc0.1Al0.9N Rotating-Sector Cantilever Piezoelectric MEMS (Zero-Bias / IP68)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bespoke ScAlN piezo silicon outer anchor frame ring + gold perimeter clamping ring!
    const frameRing = new THREE.Mesh(hiResTorus(2.65, 0.36, 14, 36), u.micScAlnPiezoDie);
    frameRing.rotation.x = Math.PI / 2;

    // 8 independent triangular Mo/Sc0.1Al0.9N/Mo bimorph piezoelectric cantilever sectors!
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0.26, -0.055);
    petalShape.lineTo(2.42, -0.66);
    petalShape.lineTo(2.42, 0.66);
    petalShape.lineTo(0.26, 0.055);
    petalShape.closePath();
    const petalGeo = extrudeHiRes(petalShape, 0.18, 0.02, 0.02, 1, 8);
    petalGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(petalGeo, 5.0, 5.0, 'xz');
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const petal = new THREE.Mesh(
        petalGeo,
        i % 2 === 0 ? u.micScAlnPiezoDie : mats.vcWorkingFluidCyan
      );
      petal.rotation.y = a;
      petal.position.y = 0.04;
      // Top Mo/Au sense electrode wedge + perimeter ENIG gold bond pad
      const elec = new THREE.Mesh(
        createChamferedBoxGeo(1.75, 0.08, 0.2, 0.03, 0.01, 'y'),
        mats.goldPlating
      );
      elec.rotation.y = -a;
      elec.position.set(Math.cos(a) * 1.48, 0.19, Math.sin(a) * 1.48);
      elec.userData.noEdges = true;
      const pad = new THREE.Mesh(
        createChamferedBoxGeo(0.36, 0.14, 0.36, 0.04, 0.01, 'y'),
        mats.goldPlating
      );
      pad.position.set(Math.cos(a) * 2.66, 0.36, Math.sin(a) * 2.66);
      pad.rotation.y = -a;
      pad.userData.noEdges = true;
      g.add(petal, elec, pad);
    }
    // Inner stress-balancing central coupling ring linking tips across 1 um compliance gap
    const centerRing = new THREE.Mesh(hiResTorus(0.32, 0.06, 8, 20), mats.goldPlating);
    centerRing.rotation.x = Math.PI / 2;
    centerRing.position.y = 0.15;
    centerRing.userData.noEdges = true;
    const goldRim = new THREE.Mesh(hiResTorus(2.65, 0.1, 10, 34), mats.goldPlating);
    goldRim.rotation.x = Math.PI / 2;
    goldRim.position.y = 0.34;
    g.add(frameRing, centerRing, goldRim);

    parts.push(
      finalizeMicUltraPart(
        'mc-piezo-scaln-cantilever-2026',
        56,
        '#0ea5e9',
        g,
        new THREE.Vector3(6.5, 2.2, 4.2),
        new THREE.Vector3(9.5, 23.8, 23.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC57. Wind-Immune Bone / Chassis-Conduction VPU MEMS Accelerometer (V2S200D / LIS25BA)
  // =========================================================================
  {
    const g = new THREE.Group();
    const housing = makeHiResHorizPlate(
      createFrameShape(5.6, 4.8, 0.65, 4.3, 3.5, 0.4),
      1.15,
      mats.titaniumRivet,
      0.06,
      2,
      20
    );
    // Bespoke MEMS comb-drive silicon substrate floor!
    const floor = makeTexturedPlate(5.2, 4.4, 0.32, 0.5, u.micVpuCombDriveDie, 0.04);
    floor.position.y = -0.52;

    // Suspended high-mass seismic tungsten-gold proof-mass perforated with 6 etch-release holes!
    const massShape = createRoundedRectShape(2.35, 1.85, 0.18);
    for (const [hx, hz] of [
      [-0.65, -0.45], [0, -0.45], [0.65, -0.45],
      [-0.65, 0.45], [0, 0.45], [0.65, 0.45],
    ]) {
      const hole = new THREE.Path();
      hole.absarc(hx, hz, 0.15, 0, Math.PI * 2, true);
      massShape.holes.push(hole);
    }
    const proofMass = makeHiResHorizPlate(massShape, 0.68, mats.goldPlating, 0.04, 2, 16);
    proofMass.position.y = 0.08;

    // 4 corner folded silicon suspension springs suspending proof mass from housing anchors
    for (const [sx, sz] of [
      [-1, -1], [1, -1], [-1, 1], [1, 1],
    ]) {
      const spCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sx * 1.15, 0.08, sz * 0.85),
        new THREE.Vector3(sx * 1.52, 0.08, sz * 1.38),
        new THREE.Vector3(sx * 1.98, 0.08, sz * 1.12),
        new THREE.Vector3(sx * 2.12, 0.08, sz * 1.68),
      ]);
      const sp = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(spCurve, 14, 0.065, 6, false)),
        mats.stainlessMachined
      );
      sp.userData.noEdges = true;
      g.add(sp);
    }

    // 24 instanced interdigitated rotor + stator capacitive comb-drive sense fingers on both flanks!
    const fingerGeo = createChamferedBoxGeo(0.76, 0.16, 0.11, 0.02, 0.01, 'y');
    const rotorFingers = new THREE.InstancedMesh(fingerGeo, mats.vcWorkingFluidCyan, 12);
    const statorFingers = new THREE.InstancedMesh(fingerGeo, mats.copperCoil, 12);
    const dm = new THREE.Object3D();
    let fIdx = 0;
    for (const side of [-1, 1]) {
      for (let k = 0; k < 6; k++) {
        const fz = -0.82 + k * 0.32;
        dm.position.set(side * 1.48, 0.10, fz);
        dm.updateMatrix();
        rotorFingers.setMatrixAt(fIdx, dm.matrix);
        dm.position.set(side * 1.82, 0.10, fz + 0.15);
        dm.updateMatrix();
        statorFingers.setMatrixAt(fIdx, dm.matrix);
        fIdx++;
      }
    }
    rotorFingers.instanceMatrix.needsUpdate = true;
    rotorFingers.userData.noEdges = true;
    statorFingers.instanceMatrix.needsUpdate = true;
    statorFingers.userData.noEdges = true;

    // Acoustic-coupling copper chassis contact foot + gold thermal flange underneath
    const foot = new THREE.Mesh(hiResCyl(1.12, 1.28, 0.38, 22), mats.copperCoil);
    foot.position.y = -0.86;
    const footRim = new THREE.Mesh(hiResTorus(1.26, 0.09, 8, 22), mats.goldPlating);
    footRim.rotation.x = Math.PI / 2;
    footRim.position.y = -0.72;
    footRim.userData.noEdges = true;
    g.add(housing, floor, proofMass, rotorFingers, statorFingers, foot, footRim);

    parts.push(
      finalizeMicUltraPart(
        'mc-vpu-bone-conduction-2026',
        57,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 2.2, 7.5),
        new THREE.Vector3(0, 13.8, 26.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC58. HERO 2026 In-Camera 32-Bit Float Dual-ADC Chiplet (Clip-Free 136+ dB)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pkgBase = makeTexturedPlate(6.8, 5.2, 0.56, 0.65, u.micAudioDsp32Float, 0.06);
    // Twin parallel ADC bare silicon dies: HSNR (+36 dB) cyan & HDR (0 dB) crimson with quantizer rails!
    const highGainDie = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 0.62, 2.05, 0.12, 0.04, 'y'),
      mats.vcWorkingFluidCyan
    );
    highGainDie.position.set(-1.62, 0.58, -0.78);
    const lowGainDie = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 0.62, 2.05, 0.12, 0.04, 'y'),
      mats.cinnabarAnodized
    );
    lowGainDie.position.set(1.62, 0.58, -0.78);
    // Stepped quantizer array stripes atop each ADC die
    for (const sx of [-1.62, 1.62]) {
      for (let q = -1.5; q <= 1.5; q += 1.0) {
        const qRail = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.08, 0.22), mats.goldPlating);
        qRail.position.set(sx, 0.92, -0.78 + q * 0.42);
        qRail.userData.noEdges = true;
        g.add(qRail);
      }
    }

    // IEEE-754 32-bit Float Exponent/Mantissa Stitcher Core fusing both streams cleanly!
    const floatFuser = new THREE.Mesh(
      createChamferedBoxGeo(4.85, 0.52, 1.35, 0.14, 0.04, 'y'),
      mats.goldPlating
    );
    floatFuser.position.set(0, 0.54, 1.38);
    const mantissaCore = new THREE.Mesh(
      createChamferedBoxGeo(3.4, 0.14, 0.72, 0.06, 0.02, 'y'),
      mats.siliconSensorDie
    );
    mantissaCore.position.set(0, 0.85, 1.38);
    mantissaCore.userData.noEdges = true;

    // 6 gold differential wirebond buses linking both ADCs to float stitcher + 4 corner 0201 C0G caps!
    for (const sx of [-1.62, 1.62]) {
      for (const dx of [-0.52, 0, 0.52]) {
        const bridge = buildGoldWirebondLoop(
          new THREE.Vector3(sx + dx, 0.88, 0.18),
          new THREE.Vector3((sx + dx) * 0.72, 0.8, 0.82),
          0.48,
          0.055,
          mats.goldPlating
        );
        g.add(bridge);
      }
    }
    for (const [cx, cz] of [
      [-2.85, 1.78], [2.85, 1.78], [-2.85, -1.92], [2.85, -1.92],
    ]) {
      const cap = buildSmdPassive(0.68, 0.36, 0.32, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(cx, 0.44, cz);
      g.add(cap);
    }
    g.add(pkgBase, highGainDie, lowGainDie, floatFuser, mantissaCore);

    parts.push(
      finalizeMicUltraPart(
        'mc-32bit-float-dual-adc-2026',
        58,
        '#10b981',
        g,
        new THREE.Vector3(-6.0, -9.2, 1.0),
        new THREE.Vector3(-12.0, -12.8, 31.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC59. Dual-Path Ultra-Low-Noise PGA Preamp & Phase-Matched Zero-Glitch Stitcher
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(6.2, 4.8, 0.48, 0.55, u.micAudioMainPcb, 0.05);
    const pgaIc = buildChipPackage({
      w: 2.8,
      d: 2.8,
      h: 0.64,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      topAccentMat: u.micAudioDsp32Float,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    pgaIc.position.set(0, 0.56, 0);

    // Flanking ultra-low-noise 0.05% precision thin-film gain-matching resistor ladders + phase-comp C0G caps!
    for (const sx of [-2.25, 2.25]) {
      for (const sz of [-1.2, 0, 1.2]) {
        const res = buildSmdPassive(0.98, 0.5, 0.36, mats.matteBlackAnodized, mats.goldPlating, 'y');
        res.position.set(sx, 0.42, sz);
        g.add(res);
      }
      const bus = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 3.1), mats.goldPlating);
      bus.position.set(sx * 0.72, 0.27, 0);
      bus.userData.noEdges = true;
      g.add(bus);
    }
    for (const sz of [-1.88, 1.88]) {
      const cap = buildSmdPassive(1.1, 0.54, 0.42, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(0, 0.44, sz);
      g.add(cap);
    }
    g.add(pcb, pgaIc);

    parts.push(
      finalizeMicUltraPart(
        'mc-dual-stage-pga-stitch',
        59,
        '#06b6d4',
        g,
        new THREE.Vector3(6.0, -9.2, 1.0),
        new THREE.Vector3(12.0, -12.8, 31.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC60. Sony ECM-B1M / ECM-M1 Compact 8-Capsule Digital Beamforming Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // Machined dark acoustic spine crowned with bespoke Sony 8-capsule faceplate texture!
    const spine = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 1.25, 4.4, 0.55, 0.1, 'y'),
      mats.matteBlackAnodized
    );
    const facePlate = makeTexturedPlate(10.8, 3.9, 0.16, 0.42, u.mic8CapsuleArrayFace, 0.02);
    facePlate.position.y = 0.62;
    facePlate.userData.noEdges = true;

    // 8 machined directional micro-capsules (stainless barrel + gold bezel + silk mesh + micro-coax feed via)
    for (let ix = 0; ix < 4; ix++) {
      for (const sz of [-1.05, 1.05]) {
        const cx = -3.9 + ix * 2.6;
        const cap = new THREE.Mesh(hiResCyl(0.76, 0.78, 0.44, 22), mats.stainlessMachined);
        cap.position.set(cx, 0.84, sz);
        const bezel = new THREE.Mesh(hiResTorus(0.72, 0.075, 8, 22), mats.goldPlating);
        bezel.rotation.x = Math.PI / 2;
        bezel.position.set(cx, 1.04, sz);
        bezel.userData.noEdges = true;
        const capMeshGeo = hiResCyl(0.62, 0.62, 0.46, 20);
        applyPlanarUVs(capMeshGeo, 1.24, 1.24, 'xz');
        const capMesh = new THREE.Mesh(capMeshGeo, u.micAcousticDelayCloth);
        capMesh.position.set(cx, 0.86, sz);
        capMesh.userData.noEdges = true;
        const coaxVia = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.35, 10), mats.goldPlating);
        coaxVia.position.set(cx, -0.68, sz);
        coaxVia.userData.noEdges = true;
        g.add(cap, bezel, capMesh, coaxVia);
      }
    }
    // Gold phase-matched digital delay spine rail + knurled rear directivity mode selector dial!
    const rail = new THREE.Mesh(
      createChamferedBoxGeo(10.2, 0.22, 0.34, 0.06, 0.02, 'y'),
      mats.goldPlating
    );
    rail.position.set(0, 0.76, 0);
    const modeDial = new THREE.Mesh(hiResCyl(0.68, 0.72, 0.56, 22), mats.titaniumRivet);
    modeDial.rotation.z = Math.PI / 2;
    modeDial.position.set(5.85, 0.06, 0);
    const dialIndex = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.14), mats.cinnabarAnodized);
    dialIndex.position.set(5.88, 0.52, 0);
    dialIndex.userData.noEdges = true;
    g.add(spine, facePlate, rail, modeDial, dialIndex);

    parts.push(
      finalizeMicUltraPart(
        'mc-8capsule-beamform-array',
        60,
        '#0284c7',
        g,
        new THREE.Vector3(0, 5.2, 4.2),
        new THREE.Vector3(0, 26.8, 17.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC61. Adaptive MVDR Beamformer & Eye-AF Subject-Tracking Null-Steering DSP
  // =========================================================================
  {
    const g = new THREE.Group();
    const dspBase = makeTexturedPlate(6.2, 5.0, 0.48, 0.55, u.micAiNpuDie, 0.05);
    // Central MVDR QFN DSP core beneath sculpted polar directivity pattern!
    const mvdrIc = buildChipPackage({
      w: 2.2,
      d: 2.0,
      h: 0.38,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    mvdrIc.position.set(0, 0.40, 0);

    // Sculpted 3D super-cardioid main lobe + dual concentric polar azimuth rings studded with 12 degree ticks!
    const mainLobe = new THREE.Mesh(hiResSphere(1.12, 20, 14), mats.vcWorkingFluidCyan);
    mainLobe.scale.set(0.68, 0.32, 1.62);
    mainLobe.position.set(0, 0.88, 0.58);
    mainLobe.userData.noEdges = true;
    const polarRing = new THREE.Mesh(hiResTorus(1.98, 0.08, 8, 32), mats.goldPlating);
    polarRing.rotation.x = Math.PI / 2;
    polarRing.position.y = 0.66;
    const innerRing = new THREE.Mesh(hiResTorus(1.26, 0.05, 8, 28), mats.vcWorkingFluidCyan);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.66;
    innerRing.userData.noEdges = true;
    const tickGeo = new THREE.BoxGeometry(0.24, 0.08, 0.07);
    const ticks = new THREE.InstancedMesh(tickGeo, mats.goldPlating, 12);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      dm.position.set(Math.cos(a) * 1.98, 0.72, Math.sin(a) * 1.98);
      dm.rotation.set(0, -a, 0);
      dm.updateMatrix();
      ticks.setMatrixAt(i, dm.matrix);
    }
    ticks.instanceMatrix.needsUpdate = true;
    ticks.userData.noEdges = true;

    // Twin crimson null-steering interference rejection wedges + 4 Eye-AF serial bus pads
    const nullBarL = new THREE.Mesh(createChamferedBoxGeo(1.18, 0.24, 0.28, 0.05, 0.02, 'y'), mats.cinnabarAnodized);
    nullBarL.position.set(-1.55, 0.76, -0.78);
    nullBarL.rotation.y = 0.65;
    const nullBarR = nullBarL.clone();
    nullBarR.position.x = 1.55;
    nullBarR.rotation.y = -0.65;
    for (let i = 0; i < 4; i++) {
      const afPad = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.1, 0.42), mats.goldPlating);
      afPad.position.set(-1.35 + i * 0.9, 0.29, -2.02);
      afPad.userData.noEdges = true;
      g.add(afPad);
    }
    g.add(dspBase, mvdrIc, mainLobe, polarRing, innerRing, ticks, nullBarL, nullBarR);

    parts.push(
      finalizeMicUltraPart(
        'mc-mvdr-adaptive-null-dsp',
        61,
        '#0d9488',
        g,
        new THREE.Vector3(6.0, -9.2, -5.5),
        new THREE.Vector3(16.0, -22.8, 27.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC62. 2026 On-Edge TinyML Transformer Real-Time 3-Stem Audio Separator
  // =========================================================================
  {
    const g = new THREE.Group();
    const npuBase = makeTexturedPlate(6.4, 5.2, 0.52, 0.6, u.micAiNpuDie, 0.06);
    // 3-layer stacked Q / K / V Multi-Head Self-Attention Transformer tensor block!
    for (let layer = 0; layer < 3; layer++) {
      const attnGeo = createChamferedBoxGeo(2.35 - layer * 0.14, 0.24, 3.55 - layer * 0.18, 0.1, 0.03, 'y');
      applyPlanarUVs(attnGeo, 2.35, 3.55, 'xz');
      const blk = new THREE.Mesh(attnGeo, layer === 1 ? mats.goldPlating : u.micAiNpuDie);
      blk.position.set(-1.42, 0.40 + layer * 0.26, 0);
      g.add(blk);
    }

    // 3 Parallel Output Stem Pipelines (Voice Cyan, Ambience Gold, Wind-Reject Crimson) + spectrogram bars & wirebonds!
    const stems: Array<[number, THREE.Material, number[]]> = [
      [-1.32, mats.vcWorkingFluidCyan, [0.22, 0.48, 0.34]],
      [0.0, mats.goldPlating, [0.32, 0.28, 0.44]],
      [1.32, mats.cinnabarAnodized, [0.46, 0.24, 0.16]],
    ];
    for (const [sz, mat, heights] of stems) {
      const bus = new THREE.Mesh(createChamferedBoxGeo(2.55, 0.28, 0.82, 0.08, 0.03, 'y'), mat);
      bus.position.set(1.42, 0.42, sz);
      g.add(bus);
      for (let b = 0; b < 3; b++) {
        const sBar = new THREE.Mesh(
          createChamferedBoxGeo(0.54, heights[b], 0.48, 0.04, 0.01, 'y'),
          mat
        );
        sBar.position.set(0.66 + b * 0.76, 0.56 + heights[b] * 0.5, sz);
        sBar.userData.noEdges = true;
        g.add(sBar);
      }
      const wb = buildGoldWirebondLoop(
        new THREE.Vector3(-0.32, 0.92, sz * 0.88),
        new THREE.Vector3(0.32, 0.58, sz),
        0.38,
        0.048,
        mats.goldPlating
      );
      g.add(wb);
    }
    g.add(npuBase);

    parts.push(
      finalizeMicUltraPart(
        'mc-tinyml-transformer-sep-2026',
        62,
        '#9333ea',
        g,
        new THREE.Vector3(-6.0, -9.2, -5.5),
        new THREE.Vector3(-16.0, -22.8, 27.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC63. ECM Corona-Charged FEP Permanently Trapped Space-Charge Dipole Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    const fepFilm = new THREE.Mesh(hiResCyl(2.48, 2.48, 0.24, 34), mats.polyimideFpc);
    // 16 instanced permanent electrostatic dipole pairs (+q crimson above, -q cyan below) linked by gold E-field flux columns!
    const posGeo = hiResSphere(0.16, 10, 8);
    const fluxGeo = hiResCyl(0.045, 0.045, 0.64, 6);
    const posInst = new THREE.InstancedMesh(posGeo, mats.cinnabarAnodized, 16);
    const negInst = new THREE.InstancedMesh(posGeo, mats.vcWorkingFluidCyan, 16);
    const fluxInst = new THREE.InstancedMesh(fluxGeo, mats.goldPlating, 16);
    const dm = new THREE.Object3D();
    let dIdx = 0;
    for (const [cnt, rad, phase] of [
      [6, 0.86, 0],
      [10, 1.72, Math.PI / 10],
    ]) {
      for (let i = 0; i < cnt; i++) {
        const a = (i / cnt) * Math.PI * 2 + phase;
        const dx = Math.cos(a) * rad;
        const dz = Math.sin(a) * rad;
        dm.position.set(dx, 0.36, dz);
        dm.updateMatrix();
        posInst.setMatrixAt(dIdx, dm.matrix);
        dm.position.set(dx, -0.36, dz);
        dm.updateMatrix();
        negInst.setMatrixAt(dIdx, dm.matrix);
        dm.position.set(dx, 0, dz);
        dm.updateMatrix();
        fluxInst.setMatrixAt(dIdx, dm.matrix);
        dIdx++;
      }
    }
    posInst.instanceMatrix.needsUpdate = true;
    posInst.userData.noEdges = true;
    negInst.instanceMatrix.needsUpdate = true;
    negInst.userData.noEdges = true;
    fluxInst.instanceMatrix.needsUpdate = true;
    fluxInst.userData.noEdges = true;

    // CNC brass tension collar + corona guard wire ring
    const brassRing = new THREE.Mesh(hiResTorus(2.48, 0.16, 12, 34), mats.brassGear);
    brassRing.rotation.x = Math.PI / 2;
    const coronaGuard = new THREE.Mesh(hiResTorus(2.26, 0.055, 8, 32), mats.goldPlating);
    coronaGuard.rotation.x = Math.PI / 2;
    coronaGuard.position.y = 0.16;
    coronaGuard.userData.noEdges = true;
    g.add(fepFilm, posInst, negInst, fluxInst, brassRing, coronaGuard);

    parts.push(
      finalizeMicUltraPart(
        'mc-ecm-corona-fep-dipole',
        63,
        '#f59e0b',
        g,
        new THREE.Vector3(14.2, 3.0, 4.2),
        new THREE.Vector3(23.8, 25.0, 11.8),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // MC64. Back-Electret 2.5 μm PET Diaphragm Pre-Tension Ring & Laser Perimeter Weld
  // =========================================================================
  {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(hiResTorus(2.42, 0.26, 14, 36), mats.brassGear);
    ring.rotation.x = Math.PI / 2;
    const innerLip = new THREE.Mesh(hiResTorus(2.14, 0.09, 8, 32), mats.copperCoil);
    innerLip.rotation.x = Math.PI / 2;
    innerLip.position.y = 0.12;
    innerLip.userData.noEdges = true;

    const petDisc = new THREE.Mesh(hiResCyl(2.26, 2.26, 0.1, 34), mats.goldPlating);
    for (const r of [0.92, 1.56]) {
      const hRing = new THREE.Mesh(hiResTorus(r, 0.028, 6, 28), mats.copperCoil);
      hRing.rotation.x = Math.PI / 2;
      hRing.position.y = 0.06;
      hRing.userData.noEdges = true;
      g.add(hRing);
    }

    // 24 precision perimeter laser spot-weld beads each encircled by a copper HAZ heat-affected halo ring!
    const beadGeo = hiResSphere(0.11, 8, 6);
    const hazGeo = hiResTorus(0.15, 0.032, 6, 12);
    hazGeo.rotateX(Math.PI / 2);
    const beads = new THREE.InstancedMesh(beadGeo, mats.stainlessMachined, 24);
    const halos = new THREE.InstancedMesh(hazGeo, mats.copperCoil, 24);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const wx = Math.cos(a) * 2.42;
      const wz = Math.sin(a) * 2.42;
      dm.position.set(wx, 0.25, wz);
      dm.updateMatrix();
      beads.setMatrixAt(i, dm.matrix);
      dm.position.set(wx, 0.23, wz);
      dm.updateMatrix();
      halos.setMatrixAt(i, dm.matrix);
    }
    beads.instanceMatrix.needsUpdate = true;
    beads.userData.noEdges = true;
    halos.instanceMatrix.needsUpdate = true;
    halos.userData.noEdges = true;
    g.add(ring, innerLip, petDisc, beads, halos);

    parts.push(
      finalizeMicUltraPart(
        'mc-ecm-back-electret-weld',
        64,
        '#eab308',
        g,
        new THREE.Vector3(14.2, 2.6, 4.2),
        new THREE.Vector3(35.8, 17.4, 9.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC65. ECM JFET 2SK596 Integrated 1 GΩ Anti-Parallel Gate-Bias Diode Die
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcbGeo = hiResCyl(2.42, 2.42, 0.36, 32);
    applyPlanarUVs(pcbGeo, 4.84, 4.84, 'xz');
    const pcbDisc = new THREE.Mesh(pcbGeo, u.micEcmJfetPcb);
    const shieldRim = new THREE.Mesh(hiResTorus(2.38, 0.09, 8, 30), mats.copperCoil);
    shieldRim.rotation.x = Math.PI / 2;
    shieldRim.position.y = 0.18;
    shieldRim.userData.noEdges = true;

    // Bare 2SK596-B JFET silicon die with 4 interdigitated S/G/D metallization fingers!
    const dieGeo = createChamferedBoxGeo(1.78, 0.42, 1.48, 0.08, 0.03, 'y');
    applyPlanarUVs(dieGeo, 1.78, 1.48, 'xz');
    const jfetDie = new THREE.Mesh(dieGeo, u.micMemsAsicDie);
    jfetDie.position.set(0, 0.38, 0);
    for (let i = 0; i < 4; i++) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 1.1), mats.goldPlating);
      f.position.set(-0.48 + i * 0.32, 0.61, 0);
      f.userData.noEdges = true;
      g.add(f);
    }

    // Twin anti-parallel 1 GΩ gate-bias PN diode bars flanking gate pad
    const d1 = new THREE.Mesh(createChamferedBoxGeo(0.55, 0.22, 0.32, 0.04, 0.01, 'y'), mats.cinnabarAnodized);
    d1.position.set(-0.44, 0.68, -0.26);
    const d2 = new THREE.Mesh(createChamferedBoxGeo(0.55, 0.22, 0.32, 0.04, 0.01, 'y'), mats.vcWorkingFluidCyan);
    d2.position.set(0.44, 0.68, 0.26);

    // 4 gold wirebond loops to 4 crescent ENIG pads (Drain / Source / Gate / Bulk)!
    for (const [p0, p1] of [
      [new THREE.Vector3(-0.68, 0.58, -0.28), new THREE.Vector3(-1.72, 0.22, -0.45)],
      [new THREE.Vector3(-0.68, 0.58, 0.28), new THREE.Vector3(-1.72, 0.22, 0.45)],
      [new THREE.Vector3(0.68, 0.58, -0.28), new THREE.Vector3(1.72, 0.22, -0.45)],
      [new THREE.Vector3(0.68, 0.58, 0.28), new THREE.Vector3(1.72, 0.22, 0.45)],
    ] as Array<[THREE.Vector3, THREE.Vector3]>) {
      g.add(buildGoldWirebondLoop(p0, p1, 0.52, 0.055, mats.goldPlating));
      const pad = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.08, 12), mats.goldPlating);
      pad.position.set(p1.x, 0.2, p1.z);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    g.add(pcbDisc, shieldRim, jfetDie, d1, d2);

    parts.push(
      finalizeMicUltraPart(
        'mc-ecm-1gohm-gate-diode',
        65,
        '#16a34a',
        g,
        new THREE.Vector3(14.2, -0.1, 4.2),
        new THREE.Vector3(23.8, 14.1, 21.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC66. In-Capsule Dual-Resonant 10 pF + 33 pF C0G/NP0 RF Bypass Micro-Caps
  // =========================================================================
  {
    const g = new THREE.Group();
    const arcGeo = hiResCyl(2.28, 2.28, 0.3, 30);
    applyPlanarUVs(arcGeo, 4.56, 4.56, 'xz');
    const arcBase = new THREE.Mesh(arcGeo, u.micEcmJfetPcb);
    // 10 pF (1.8-5 GHz Wi-Fi/5G resonance) + 33 pF (900 MHz GSM/LTE TDMA resonance) C0G caps + internal layer stripes!
    const cap10 = buildSmdPassive(1.55, 0.88, 0.64, mats.smdCeramic, mats.silverElectrode, 'y');
    cap10.position.set(-0.92, 0.48, 0.25);
    const cap33 = buildSmdPassive(1.85, 0.96, 0.72, mats.ceramicAlumina, mats.goldPlating, 'y');
    cap33.position.set(0.98, 0.52, -0.25);
    // Subtle laminated electrode stripes & silver solder fillet anchors
    for (const [cx, cz, len, yTop] of [
      [-0.92, 0.25, 0.85, 0.82],
      [0.98, -0.25, 1.05, 0.90],
    ]) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(len, 0.05, 0.62), mats.goldPlating);
      band.position.set(cx, yTop, cz);
      band.userData.noEdges = true;
      g.add(band);
    }
    // Central gold shunt bridge trace + copper Faraday ring + 6 stitched ground vias
    const shuntBus = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.07, 0.24), mats.goldPlating);
    shuntBus.position.set(0.05, 0.18, 0);
    shuntBus.userData.noEdges = true;
    const gndRing = new THREE.Mesh(hiResTorus(2.22, 0.11, 8, 30), mats.copperCoil);
    gndRing.rotation.x = Math.PI / 2;
    gndRing.position.y = 0.18;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const via = new THREE.Mesh(hiResCyl(0.12, 0.12, 0.36, 10), mats.goldPlating);
      via.position.set(Math.cos(a) * 1.92, 0, Math.sin(a) * 1.92);
      via.userData.noEdges = true;
      g.add(via);
    }
    g.add(arcBase, cap10, cap33, shuntBus, gndRing);

    parts.push(
      finalizeMicUltraPart(
        'mc-ecm-rf-tdma-bypass-caps',
        66,
        '#d97706',
        g,
        new THREE.Vector3(14.2, -0.4, 4.2),
        new THREE.Vector3(37.8, 8.4, 17.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC67. Cardioid Directional Rear Acoustic Phase-Delay Woven Silk Mesh
  // =========================================================================
  {
    const g = new THREE.Group();
    // Knurled CNC C3604 brass acoustic resistance collar (18 perimeter knurl ridges!) + 350-Rayl silk mesh!
    const brassCollar = new THREE.Mesh(hiResTorus(2.55, 0.24, 12, 34), mats.brassGear);
    brassCollar.rotation.x = Math.PI / 2;
    const knurlGeo = createChamferedBoxGeo(0.12, 0.36, 0.14, 0.02, 0.01, 'y');
    const knurls = new THREE.InstancedMesh(knurlGeo, mats.brassGear, 18);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      dm.position.set(Math.cos(a) * 2.76, 0, Math.sin(a) * 2.76);
      dm.rotation.set(0, -a, 0);
      dm.updateMatrix();
      knurls.setMatrixAt(i, dm.matrix);
    }
    knurls.instanceMatrix.needsUpdate = true;
    knurls.userData.noEdges = true;

    const silkGeo = hiResCyl(2.42, 2.42, 0.22, 32);
    applyPlanarUVs(silkGeo, 4.84, 4.84, 'xz');
    const silkDisc = new THREE.Mesh(silkGeo, u.micAcousticDelayCloth);

    // 8 chamfered rear cardioid phase-delay aperture ports underneath + gold calibration index dot!
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const port = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.36, 14), mats.matteBlackAnodized);
      port.position.set(Math.cos(a) * 1.52, -0.15, Math.sin(a) * 1.52);
      port.userData.noEdges = true;
      const pRim = new THREE.Mesh(hiResTorus(0.3, 0.045, 6, 14), mats.goldPlating);
      pRim.rotation.x = Math.PI / 2;
      pRim.position.set(Math.cos(a) * 1.52, -0.3, Math.sin(a) * 1.52);
      pRim.userData.noEdges = true;
      g.add(port, pRim);
    }
    const calDot = new THREE.Mesh(hiResCyl(0.18, 0.18, 0.08, 12), mats.goldPlating);
    calDot.position.set(0, 0.14, 2.02);
    calDot.userData.noEdges = true;
    g.add(brassCollar, knurls, silkDisc, calDot);

    parts.push(
      finalizeMicUltraPart(
        'mc-cardioid-rear-delay-mesh',
        67,
        '#b45309',
        g,
        new THREE.Vector3(14.2, 1.4, 4.2),
        new THREE.Vector3(23.8, 0.6, 27.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC68. Back-Volume Acoustic Bass-Tuning Micro-Vent Tube & Damping Felt Plug
  // =========================================================================
  {
    const g = new THREE.Group();
    // Coiled Helmholtz bass-tuning acoustic micro-duct with retention clamp strap, brass damping cup & stepped nozzle!
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 0.35, 0.8),
      new THREE.Vector3(-0.7, 0.45, -1.1),
      new THREE.Vector3(0.9, 0.1, -1.0),
      new THREE.Vector3(1.8, -0.25, 0.7),
    ]);
    const duct = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(curve, 30, 0.42, 16, false)),
      mats.stainlessMachined
    );
    // Mid-span brass mounting clamp ring gripping the Helmholtz tube
    const midPt = curve.getPoint(0.5);
    const clampRing = new THREE.Mesh(hiResTorus(0.52, 0.1, 8, 18), mats.brassGear);
    clampRing.position.copy(midPt);
    clampRing.rotation.y = Math.PI * 0.48;
    clampRing.userData.noEdges = true;

    // Poron acoustic felt damping plug seated inside flanged brass cup at inlet (-X)
    const feltCup = new THREE.Mesh(hiResCyl(0.98, 0.94, 0.56, 22), mats.brassGear);
    feltCup.position.set(-1.8, 0.25, 0.8);
    const feltGeo = hiResCyl(0.84, 0.84, 0.64, 22);
    applyBoxUVs(feltGeo, 3.0);
    const feltPlug = new THREE.Mesh(feltGeo, u.micAcousticFelt);
    feltPlug.position.set(-1.8, 0.38, 0.8);

    // Stepped Lathe-turned C3604 brass outlet nozzle with dark acoustic throat bore (+X)
    const nozProf = [
      new THREE.Vector2(0.32, -0.36),
      new THREE.Vector2(0.62, -0.36),
      new THREE.Vector2(0.56, 0.05),
      new THREE.Vector2(0.46, 0.38),
      new THREE.Vector2(0.28, 0.38),
      new THREE.Vector2(0.28, -0.36),
    ];
    const nozGeo = markHiRes(new THREE.LatheGeometry(nozProf, 22));
    nozGeo.computeVertexNormals();
    const brassNozzle = new THREE.Mesh(nozGeo, mats.brassGear);
    brassNozzle.position.set(1.8, -0.25, 0.7);
    const bore = new THREE.Mesh(hiResCyl(0.26, 0.26, 0.78, 14), mats.matteBlackAnodized);
    bore.position.set(1.8, -0.25, 0.7);
    bore.userData.noEdges = true;
    g.add(duct, clampRing, feltCup, feltPlug, brassNozzle, bore);

    parts.push(
      finalizeMicUltraPart(
        'mc-vent-tube-lfe-bass-port',
        68,
        '#64748b',
        g,
        new THREE.Vector3(0, 0.2, -12.5),
        new THREE.Vector3(48.0, -6.2, 36.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC69. Two-Stage Silicone Mass-Spring Inertial Vibration Isolator (AF Stepper Trap)
  // =========================================================================
  {
    const g = new THREE.Group();
    const topMount = new THREE.Mesh(hiResTorus(2.25, 0.24, 12, 32), u.micRubberBootBlack);
    topMount.rotation.x = Math.PI / 2;
    topMount.position.y = 0.68;
    const botMount = new THREE.Mesh(hiResTorus(2.25, 0.24, 12, 32), u.micRubberBootBlack);
    botMount.rotation.x = Math.PI / 2;
    botMount.position.y = -0.68;

    // 4 molded rubber alignment locator pins on top & bottom rings
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      for (const py of [0.96, -0.96]) {
        const pin = new THREE.Mesh(hiResCyl(0.16, 0.16, 0.28, 10), u.micRubberBootBlack);
        pin.position.set(Math.cos(a) * 2.25, py, Math.sin(a) * 2.25);
        pin.userData.noEdges = true;
        g.add(pin);
      }
    }

    // High-density CNC inertial brass tuned seismic mass ring studded with 8 dynamic balancing dimples!
    const tunedMass = new THREE.Mesh(hiResTorus(2.1, 0.34, 14, 32), mats.brassGear);
    tunedMass.rotation.x = Math.PI / 2;
    const dimpGeo = hiResCyl(0.14, 0.14, 0.72, 10);
    const dimps = new THREE.InstancedMesh(dimpGeo, mats.goldPlating, 8);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      dm.position.set(Math.cos(a) * 2.1, 0, Math.sin(a) * 2.1);
      dm.rotation.set(0, 0, 0);
      dm.updateMatrix();
      dimps.setMatrixAt(i, dm.matrix);
    }
    dimps.instanceMatrix.needsUpdate = true;
    dimps.userData.noEdges = true;

    // 8 angled soft elastomer shear spring legs bridging upper & lower isolation stages!
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const leg = new THREE.Mesh(hiResCyl(0.17, 0.17, 1.38, 10), mats.damperElastomer);
      leg.position.set(Math.cos(a) * 2.2, 0, Math.sin(a) * 2.2);
      leg.rotation.set(Math.sin(a) * 0.18, 0, -Math.cos(a) * 0.18);
      leg.userData.noEdges = true;
      g.add(leg);
    }
    g.add(topMount, tunedMass, dimps, botMount);

    parts.push(
      finalizeMicUltraPart(
        'mc-lens-af-stepper-vib-trap',
        69,
        '#475569',
        g,
        new THREE.Vector3(14.2, 0.4, -3.0),
        new THREE.Vector3(29.8, 23.6, -5.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC70. −10°C to +50°C Sensitivity Drift Compensation NTC Thermistor & LUT
  // =========================================================================
  {
    const g = new THREE.Group();
    const tongue = makeTexturedPlate(5.2, 3.2, 0.3, 0.55, u.micSh1035Flex, 0.03);
    // Circular copper thermal pad + crimson 0201 NTC glass thermistor bead + silver solder fillets!
    const cuPad = new THREE.Mesh(hiResCyl(0.88, 0.88, 0.14, 22), mats.copperCoil);
    cuPad.position.set(-1.55, 0.22, 0);
    const ntcBead = new THREE.Mesh(hiResSphere(0.4, 14, 12), mats.cinnabarAnodized);
    ntcBead.position.set(-1.55, 0.5, 0);
    for (const fx of [-1.92, -1.18]) {
      const fil = new THREE.Mesh(hiResSphere(0.14, 8, 6), mats.solderBallSilver);
      fil.position.set(fx, 0.32, 0);
      fil.userData.noEdges = true;
      g.add(fil);
    }
    // Meandering copper Kelvin 4-wire sense traces connecting NTC to LUT compensation IC!
    for (const tz of [-0.36, 0.36]) {
      const kTrace = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.06, 0.12), mats.goldPlating);
      kTrace.position.set(-0.35, 0.19, tz);
      kTrace.userData.noEdges = true;
      g.add(kTrace);
    }
    // QFN-16 LUT compensation IC + 2 precision thin-film bridge divider resistors
    const lutIc = buildChipPackage({
      w: 1.95,
      d: 1.75,
      h: 0.48,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    lutIc.position.set(1.05, 0.42, 0);
    for (const sz of [-1.18, 1.18]) {
      const rDiv = buildSmdPassive(0.88, 0.44, 0.32, mats.matteBlackAnodized, mats.goldPlating, 'y');
      rDiv.position.set(1.05, 0.34, sz);
      g.add(rDiv);
    }
    g.add(tongue, cuPad, ntcBead, lutIc);

    parts.push(
      finalizeMicUltraPart(
        'mc-thermal-drift-ntc-comp',
        70,
        '#ef4444',
        g,
        new THREE.Vector3(11.0, -3.2, -2.0),
        new THREE.Vector3(39.0, 15.2, -14.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC71. Dedicated Analog-Audio Star-Ground Copper Island & PCB Isolation Moat
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer audio PCB surround separated by milled air-gap isolation moat (planar XZ UVs!)
    const moatGeo = extrudeHiRes(
      createFrameShape(6.2, 5.2, 0.65, 4.55, 3.55, 0.45),
      0.44,
      0.04,
      0.04,
      2,
      20
    );
    moatGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(moatGeo, 6.2, 5.2, 'xz');
    const moatFrame = new THREE.Mesh(moatGeo, u.micStarGroundPcb);

    // Isolated inner analog-ground ENIG gold star hub + 8 radial copper spokes!
    const starHub = new THREE.Mesh(hiResCyl(0.76, 0.76, 0.36, 24), mats.goldPlating);
    const hubPin = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.52, 14), mats.copperCoil);
    hubPin.userData.noEdges = true;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const spoke = new THREE.Mesh(
        createChamferedBoxGeo(1.72, 0.18, 0.22, 0.04, 0.02, 'y'),
        mats.copperCoil
      );
      spoke.position.set(Math.cos(a) * 1.15, 0.06, Math.sin(a) * 1.15);
      spoke.rotation.y = -a;
      spoke.userData.noEdges = true;
      g.add(spoke);
    }

    // 16 instanced stitched perimeter ground-guard vias around isolation moat + 4 corner gold test posts!
    const viaGeo = hiResCyl(0.11, 0.11, 0.5, 8);
    const vias = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 16);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      dm.position.set(Math.cos(a) * 2.58, 0, Math.sin(a) * 2.12);
      dm.updateMatrix();
      vias.setMatrixAt(i, dm.matrix);
    }
    vias.instanceMatrix.needsUpdate = true;
    vias.userData.noEdges = true;

    // Single narrow 0-ohm ground tie-bridge tying analog star-ground to digital ground at 1 zero-loop point!
    const singleTie = new THREE.Mesh(
      createChamferedBoxGeo(0.58, 0.24, 1.18, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    singleTie.position.set(0, 0.06, 2.05);
    const tieZeroRes = buildSmdPassive(0.68, 0.42, 0.28, mats.matteBlackAnodized, mats.goldPlating, 'y');
    tieZeroRes.position.set(0, 0.30, 2.05);
    g.add(moatFrame, starHub, hubPin, vias, singleTie, tieZeroRes);

    parts.push(
      finalizeMicUltraPart(
        'mc-star-ground-audio-island',
        71,
        '#ea580c',
        g,
        new THREE.Vector3(0, -7.8, -1.5),
        new THREE.Vector3(40.0, -6.2, 19.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC72. Clickless Zero-Cross Anti-Pop Mute MOSFET & Soft-Ramp Audio Switch
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(5.2, 4.0, 0.42, 0.45, u.micAudioMainPcb, 0.04);
    // Dual back-to-back low-Rds(on) analog mute MOSFETs + central zero-cross detector die + soft-ramp passives!
    const fetL = buildChipPackage({
      w: 1.55,
      d: 1.55,
      h: 0.48,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    fetL.position.set(-1.38, 0.44, -0.35);
    const fetR = fetL.clone();
    fetR.position.set(1.38, 0.44, -0.35);

    const zcDieGeo = createChamferedBoxGeo(0.95, 0.34, 0.95, 0.08, 0.02, 'y');
    applyPlanarUVs(zcDieGeo, 0.95, 0.95, 'xz');
    const zcDie = new THREE.Mesh(zcDieGeo, u.micMemsAsicDie);
    zcDie.position.set(0, 0.38, -0.65);

    const rampCap = buildSmdPassive(1.25, 0.65, 0.5, mats.smdCeramic, mats.silverElectrode, 'y');
    rampCap.position.set(0, 0.46, 1.12);
    for (const sx of [-1.45, 1.45]) {
      const pdRes = buildSmdPassive(0.88, 0.44, 0.34, mats.matteBlackAnodized, mats.goldPlating, 'y');
      pdRes.position.set(sx, 0.38, 1.12);
      const bus = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 2.2), mats.goldPlating);
      bus.position.set(sx, 0.24, 0.1);
      bus.userData.noEdges = true;
      g.add(pdRes, bus);
    }
    g.add(pcb, fetL, fetR, zcDie, rampCap);

    parts.push(
      finalizeMicUltraPart(
        'mc-zero-cross-pop-mute-fet',
        72,
        '#14b8a6',
        g,
        new THREE.Vector3(8.0, -7.8, 3.5),
        new THREE.Vector3(34.0, -10.2, -7.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC73. External 3.5 mm Plug-In-Power 2.8 V Current-Limited Bias Injector
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(5.6, 4.2, 0.44, 0.5, u.micAudioMainPcb, 0.04);
    // Current-limit switch IC + twin 2.2 kΩ 0.1% PIP bias resistors + twin vented audio electrolytic blocking caps!
    const limIc = buildChipPackage({
      w: 1.85,
      d: 1.85,
      h: 0.52,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.cinnabarAnodized,
      axis: 'y',
    });
    limIc.position.set(-1.42, 0.46, 0);
    for (const sz of [-0.95, 0.95]) {
      const rBias = buildSmdPassive(1.35, 0.62, 0.42, mats.matteBlackAnodized, mats.goldPlating, 'y');
      rBias.position.set(0.55, 0.42, sz);
      // Audio-grade crimson electrolytic coupling cap with aluminum safety-vent score & polarity stripe!
      const cBlock = new THREE.Mesh(hiResCyl(0.54, 0.54, 0.78, 20), mats.cinnabarAnodized);
      cBlock.position.set(1.92, 0.60, sz);
      const cTop = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.06, 18), mats.silverElectrode);
      cTop.position.set(1.92, 1.00, sz);
      cTop.userData.noEdges = true;
      const score = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.06), mats.matteBlackAnodized);
      score.position.set(1.92, 1.04, sz);
      score.userData.noEdges = true;
      const polStripe = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.72, 0.16), mats.ceramicAlumina);
      polStripe.position.set(2.42, 0.60, sz);
      polStripe.userData.noEdges = true;
      // Tip / Ring gold output test pad
      const tp = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.08, 12), mats.goldPlating);
      tp.position.set(-1.85, 0.26, sz * 1.55);
      tp.userData.noEdges = true;
      g.add(rBias, cBlock, cTop, score, polStripe, tp);
    }
    g.add(pcb, limIc);

    parts.push(
      finalizeMicUltraPart(
        'mc-pip-28v-current-limit',
        73,
        '#dc2626',
        g,
        new THREE.Vector3(-16.0, -2.0, 2.0),
        new THREE.Vector3(-24.0, -16.0, -30.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC74. 3.5 mm Jack Mechanical Insertion-Detect Gold Leaf Switch & Auto-Route Mux
  // =========================================================================
  {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 1.35, 3.6, 0.3, 0.08, 'y'),
      mats.mountPpsInsulator
    );
    const topDeck = makeTexturedPlate(4.9, 3.3, 0.14, 0.24, u.micOemHolderResin, 0.02);
    topDeck.position.y = 0.68;
    topDeck.userData.noEdges = true;

    // Cantilevered phosphor-bronze/gold leaf switch arm flexed by incoming TRS plug tip + hemispherical contact dimple!
    const leafCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.1, 0.92, -0.7),
      new THREE.Vector3(-0.3, 1.24, -0.2),
      new THREE.Vector3(1.1, 1.0, 0.35),
      new THREE.Vector3(2.0, 1.34, 0.55),
    ]);
    const leafSpring = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(leafCurve, 22, 0.15, 8, false)),
      mats.goldPlating
    );
    const contactDimple = new THREE.Mesh(hiResSphere(0.2, 10, 8), mats.goldPlating);
    contactDimple.position.set(1.96, 1.22, 0.55);
    contactDimple.userData.noEdges = true;

    // Red insulated mechanical lift actuator plunger + silver fixed anvil + SOT-23 auto-route mux IC!
    const plunger = new THREE.Mesh(hiResCyl(0.38, 0.44, 0.88, 18), mats.cinnabarAnodized);
    plunger.position.set(0.2, 0.92, 0.78);
    const fixedContact = new THREE.Mesh(
      createChamferedBoxGeo(0.75, 0.34, 0.75, 0.06, 0.02, 'y'),
      mats.silverElectrode
    );
    fixedContact.position.set(1.95, 0.92, 0.55);
    const muxIc = buildChipPackage({
      w: 1.35,
      d: 0.92,
      h: 0.42,
      style: 'sot23',
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      axis: 'y',
    });
    muxIc.position.set(-1.35, 0.96, 0.85);
    g.add(body, topDeck, leafSpring, contactDimple, plunger, fixedContact, muxIc);

    parts.push(
      finalizeMicUltraPart(
        'mc-35mm-plug-detect-switch',
        74,
        '#f43f5e',
        g,
        new THREE.Vector3(-18.0, 2.5, 2.8),
        new THREE.Vector3(-26.0, -0.5, -30.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC75. MI-Shoe 4ch 24-bit Digital Audio Bus & XLR-K3M +48 V Phantom Interface
  // =========================================================================
  {
    const g = new THREE.Group();
    const board = makeTexturedPlate(6.4, 4.6, 0.5, 0.55, u.micAudioMainPcb, 0.05);

    // Authentic wound toroidal +48 V phantom boost inductor: ferrite ring encircled by 12 angled copper winding turns!
    const ferriteToroid = new THREE.Mesh(hiResTorus(1.06, 0.32, 12, 26), mats.ferriteInductor);
    ferriteToroid.rotation.x = Math.PI / 2;
    ferriteToroid.position.set(-1.52, 0.62, -0.25);
    const turnGeo = hiResTorus(0.38, 0.075, 8, 16);
    const turns = new THREE.InstancedMesh(turnGeo, mats.copperCoil, 12);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      dm.position.set(-1.52 + Math.cos(a) * 1.06, 0.62, -0.25 + Math.sin(a) * 1.06);
      dm.rotation.set(0, -a, 0);
      dm.updateMatrix();
      turns.setMatrixAt(i, dm.matrix);
    }
    turns.instanceMatrix.needsUpdate = true;
    turns.userData.noEdges = true;

    // Schottky flyback rectifier + HV ceramic output cap + QFN-20 XLR interface controller IC!
    const schottky = buildSmdPassive(0.95, 0.58, 0.42, mats.matteBlackAnodized, mats.silverElectrode, 'y');
    schottky.position.set(-0.08, 0.46, -1.45);
    const hvCap = buildSmdPassive(1.08, 0.62, 0.54, mats.smdCeramic, mats.goldPlating, 'y');
    hvCap.position.set(-0.08, 0.52, 0.25);
    const xlrIf = buildChipPackage({
      w: 2.15,
      d: 2.35,
      h: 0.56,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    xlrIf.position.set(1.52, 0.52, -0.35);

    // Bespoke MI-Shoe digital flex contact bar + 10 gleaming gold MI-Shoe digital pins along rear edge!
    const pinStrip = makeTexturedPlate(5.6, 1.15, 0.14, 0.16, u.micMiShoeDigitalFlex, 0.02);
    pinStrip.position.set(0, 0.30, 1.56);
    pinStrip.userData.noEdges = true;
    for (let i = 0; i < 10; i++) {
      const pin = new THREE.Mesh(createChamferedBoxGeo(0.36, 0.16, 0.88, 0.03, 0.01, 'y'), mats.goldPlating);
      pin.position.set(-2.25 + i * 0.5, 0.40, 1.58);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    g.add(board, ferriteToroid, turns, schottky, hvCap, xlrIf, pinStrip);

    parts.push(
      finalizeMicUltraPart(
        'mc-xlr-k3m-48v-phantom-if',
        75,
        '#eab308',
        g,
        new THREE.Vector3(16.5, -1.0, -3.0),
        new THREE.Vector3(21.5, 3.0, -27.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC76. <1 ps Ultra-Low-Jitter 24.576 MHz Audio Master Quartz PLL & Lip-Sync Lock
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(5.8, 4.4, 0.44, 0.5, u.micAudioMainPcb, 0.05);
    // Hermetic ceramic NDK NX3225GA base with 4 gold castellations & bespoke seam-welded 24.576 MHz gold lid!
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(2.58, 0.52, 1.98, 0.14, 0.04, 'y'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(-1.22, 0.48, -0.2);
    const lidGeo = createChamferedBoxGeo(2.4, 0.2, 1.8, 0.1, 0.03, 'y');
    applyPlanarUVs(lidGeo, 2.4, 1.8, 'xz');
    const xtalLid = new THREE.Mesh(lidGeo, u.micQuartzTcxoLid);
    xtalLid.position.set(-1.22, 0.83, -0.2);
    for (const [cx, cz] of [
      [-1.18, -0.88], [1.18, -0.88], [-1.18, 0.88], [1.18, 0.88],
    ]) {
      const cast = new THREE.Mesh(hiResCyl(0.18, 0.18, 0.56, 10), mats.goldPlating);
      cast.position.set(-1.22 + cx, 0.48, -0.2 + cz);
      cast.userData.noEdges = true;
      g.add(cast);
    }

    // Fractional-N Video-Frame Lip-Sync PLL Synthesizer QFN-20 IC + 3 RC loop-filter passives!
    const pllIc = buildChipPackage({
      w: 2.08,
      d: 2.08,
      h: 0.54,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      topAccentMat: u.micAudioDsp32Float,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    pllIc.position.set(1.42, 0.52, -0.2);
    for (let i = 0; i < 3; i++) {
      const lf = buildSmdPassive(0.95, 0.48, 0.36, i === 1 ? mats.matteBlackAnodized : mats.smdCeramic, mats.silverElectrode, 'y');
      lf.position.set(-1.45 + i * 1.45, 0.40, 1.48);
      g.add(lf);
    }
    g.add(pcb, xtalBase, xtalLid, pllIc);

    parts.push(
      finalizeMicUltraPart(
        'mc-24576mhz-audio-pll-jitter',
        76,
        '#0ea5e9',
        g,
        new THREE.Vector3(-6.0, -10.8, -8.5),
        new THREE.Vector3(-14.0, -23.2, -25.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC77. SMPTE LTC Timecode Audio-Track Injection & Multi-Cam Genlock Frame Sync
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(5.8, 4.4, 0.44, 0.5, u.micLufsMeterDisplay, 0.05);
    const ltcIc = buildChipPackage({
      w: 2.6,
      d: 2.2,
      h: 0.56,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.cinnabarAnodized,
      axis: 'y',
    });
    ltcIc.position.set(-1.05, 0.52, 0);

    // 3D Manchester Bi-Phase square-wave timecode pulse ribbon + 4 SMPTE 12M sync-word timing bars + genlock pad!
    const wavePts = [
      new THREE.Vector3(0.75, 0.48, -1.45),
      new THREE.Vector3(0.75, 0.96, -0.95),
      new THREE.Vector3(1.48, 0.96, -0.45),
      new THREE.Vector3(1.48, 0.48, 0.05),
      new THREE.Vector3(2.22, 0.48, 0.55),
      new THREE.Vector3(2.22, 0.96, 1.05),
      new THREE.Vector3(2.45, 0.48, 1.45),
    ];
    const pulseWave = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wavePts), 28, 0.125, 8, false)),
      mats.goldPlating
    );
    pulseWave.userData.noEdges = true;
    for (let i = 0; i < 4; i++) {
      const bitBar = new THREE.Mesh(
        createChamferedBoxGeo(0.24, 0.22 + (i % 2) * 0.24, 0.36, 0.03, 0.01, 'y'),
        i % 2 === 0 ? mats.vcWorkingFluidCyan : mats.cinnabarAnodized
      );
      bitBar.position.set(0.95 + i * 0.48, 0.36, 1.56);
      bitBar.userData.noEdges = true;
      g.add(bitBar);
    }
    // Coaxial gold Genlock sync micro-tap ring pad
    const genPad = new THREE.Mesh(hiResTorus(0.42, 0.11, 8, 18), mats.goldPlating);
    genPad.rotation.x = Math.PI / 2;
    genPad.position.set(1.98, 0.30, -1.48);
    genPad.userData.noEdges = true;
    g.add(pcb, ltcIc, pulseWave, genPad);

    parts.push(
      finalizeMicUltraPart(
        'mc-timecode-ltc-audio-sync',
        77,
        '#f59e0b',
        g,
        new THREE.Vector3(6.0, -10.8, -8.5),
        new THREE.Vector3(14.0, -23.2, -25.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC78. 3D Spatial Audio / First-Order Ambisonics (FOA W/X/Y/Z) Phase Matrix
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(6.0, 5.2, 0.46, 0.65, u.micBinauralHrtfMap, 0.05);
    // 4-capsule tetrahedral Ambisonics acoustic array: central W core + 4 tilted machined micro-capsules!
    const wSphere = new THREE.Mesh(hiResSphere(0.68, 18, 14), mats.goldPlating);
    wSphere.position.set(0, 1.42, 0);
    const verts: Array<[number, number, number, THREE.Material]> = [
      [1.35, 0.84, 0.96, mats.vcWorkingFluidCyan],
      [-1.35, 0.84, 0.96, mats.cinnabarAnodized],
      [0, 0.84, -1.52, mats.siliconSensorDie],
      [0, 2.48, 0, mats.goldPlating],
    ];
    for (const [vx, vy, vz, mat] of verts) {
      // Miniature machined cardioid capsule aimed radially outward from tetrahedral center!
      const capGroup = new THREE.Group();
      capGroup.position.set(vx, vy, vz);
      const dir = new THREE.Vector3(vx, vy - 1.42, vz).normalize();
      capGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      const barrel = new THREE.Mesh(hiResCyl(0.36, 0.38, 0.42, 16), mats.stainlessMachined);
      const meshFace = new THREE.Mesh(hiResCyl(0.30, 0.30, 0.08, 16), mats.brassGear);
      meshFace.position.y = 0.22;
      meshFace.userData.noEdges = true;
      const colorBand = new THREE.Mesh(hiResTorus(0.38, 0.06, 8, 16), mat);
      colorBand.rotation.x = Math.PI / 2;
      colorBand.userData.noEdges = true;
      capGroup.add(barrel, meshFace, colorBand);

      const strut = buildGoldWirebondLoop(
        new THREE.Vector3(0, 1.42, 0),
        new THREE.Vector3(vx, vy, vz),
        0.02,
        0.075,
        mats.stainlessMachined
      );
      g.add(capGroup, strut);
    }
    // Orthogonal X / Y / Z dipole spherical coordinate rings
    const eqRing = new THREE.Mesh(hiResTorus(1.88, 0.065, 8, 30), mats.vcWorkingFluidCyan);
    eqRing.rotation.x = Math.PI / 2;
    eqRing.position.y = 0.84;
    const merRing = new THREE.Mesh(hiResTorus(1.25, 0.055, 8, 28), mats.goldPlating);
    merRing.position.y = 1.42;
    merRing.userData.noEdges = true;
    g.add(base, wSphere, eqRing, merRing);

    parts.push(
      finalizeMicUltraPart(
        'mc-spatial-ambisonics-matrix',
        78,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 3.0, -6.5),
        new THREE.Vector3(0, 17.0, -27.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC79. 5 ms Look-Ahead True-Peak Limiter & Dynamic Wind-Ducking Safety Net
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(6.0, 4.6, 0.46, 0.55, u.micLufsMeterDisplay, 0.05);
    // Circular 5 ms look-ahead SRAM ring-buffer torus studded with 8 gold read/write pointer nodes!
    const ringBuf = new THREE.Mesh(hiResTorus(1.32, 0.25, 12, 30), mats.vcWorkingFluidCyan);
    ringBuf.rotation.x = Math.PI / 2;
    ringBuf.position.set(-1.15, 0.58, 0);
    const ptrGeo = hiResSphere(0.14, 8, 6);
    const ptrs = new THREE.InstancedMesh(ptrGeo, mats.goldPlating, 8);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      dm.position.set(-1.15 + Math.cos(a) * 1.32, 0.84, Math.sin(a) * 1.32);
      dm.updateMatrix();
      ptrs.setMatrixAt(i, dm.matrix);
    }
    ptrs.instanceMatrix.needsUpdate = true;
    ptrs.userData.noEdges = true;

    // 4x oversampling True-Peak Detector QFN die seated inside ring buffer
    const tpDie = buildChipPackage({
      w: 1.25,
      d: 1.25,
      h: 0.42,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      axis: 'y',
    });
    tpDie.position.set(-1.15, 0.44, 0);

    // Crimson -1.0 dBTP brick-wall ceiling limiter clamp bar crowned with beveled gold threshold cap!
    const clampBar = new THREE.Mesh(
      createChamferedBoxGeo(1.72, 0.64, 2.95, 0.1, 0.04, 'y'),
      mats.cinnabarAnodized
    );
    clampBar.position.set(1.55, 0.56, 0);
    const goldCap = new THREE.Mesh(
      createChamferedBoxGeo(1.86, 0.16, 3.08, 0.08, 0.02, 'y'),
      mats.goldPlating
    );
    goldCap.position.set(1.55, 0.96, 0);
    g.add(base, ringBuf, ptrs, tpDie, clampBar, goldCap);

    parts.push(
      finalizeMicUltraPart(
        'mc-true-peak-lookahead-limiter',
        79,
        '#e11d48',
        g,
        new THREE.Vector3(-10.0, -10.8, -2.5),
        new THREE.Vector3(-8.0, -31.2, -13.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC80. Factory Anechoic-Chamber 1 kHz / 94 dB SPL Sensitivity & Phase Cal OTP
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(6.0, 4.6, 0.46, 0.55, u.micAudioMainPcb, 0.05);
    // Gold-shielded Factory OTP Calibration EEPROM + 4 gold SPI trim test pads!
    const otpDie = buildChipPackage({
      w: 2.35,
      d: 2.35,
      h: 0.52,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      topAccentMat: mats.goldPlating,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    otpDie.position.set(-1.42, 0.5, -0.2);
    for (let i = 0; i < 4; i++) {
      const spiPad = new THREE.Mesh(hiResCyl(0.18, 0.18, 0.08, 12), mats.goldPlating);
      spiPad.position.set(-2.25 + i * 0.55, 0.28, 1.56);
      spiPad.userData.noEdges = true;
      g.add(spiPad);
    }

    // 4x4 miniature anechoic-chamber pyramid foam wedges + stainless 94 dB SPL @ 1 kHz calibration probe!
    const coneGeo = hiResCyl(0.025, 0.26, 0.66, 4);
    const wedges = new THREE.InstancedMesh(coneGeo, u.micAcousticFelt, 16);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 4; iz++) {
        dm.position.set(0.68 + ix * 0.52, 0.56, -0.78 + iz * 0.52);
        dm.rotation.set(0, Math.PI / 4, 0);
        dm.updateMatrix();
        wedges.setMatrixAt(idx++, dm.matrix);
      }
    }
    wedges.instanceMatrix.needsUpdate = true;
    wedges.userData.noEdges = true;

    const calProbe = new THREE.Mesh(hiResCyl(0.18, 0.22, 1.15, 16), mats.stainlessMachined);
    calProbe.rotation.z = Math.PI / 2;
    calProbe.position.set(1.45, 1.24, 0);
    const probeTip = new THREE.Mesh(hiResCyl(0.19, 0.19, 0.24, 14), mats.goldPlating);
    probeTip.rotation.z = Math.PI / 2;
    probeTip.position.set(0.84, 1.24, 0);
    probeTip.userData.noEdges = true;
    g.add(base, otpDie, wedges, calProbe, probeTip);

    parts.push(
      finalizeMicUltraPart(
        'mc-factory-anechoic-cal-otp',
        80,
        '#475569',
        g,
        new THREE.Vector3(10.0, -10.8, -2.5),
        new THREE.Vector3(8.0, -31.2, -13.5),
        cp,
        0.18
      )
    );
  }

  return parts;
}
