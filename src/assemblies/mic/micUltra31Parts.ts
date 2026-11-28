//@FLOW_MAP|file=src/assemblies/mic/micUltra31Parts.ts|unit=mic|lines=1846|exports=buildMicUltra31Parts
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

function finalizeMicUltra31Part(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  targetExplodedPos: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.2
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 32, edgeOpacity);
  const explodeOffset = targetExplodedPos.clone().sub(assembledPos);

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

function makeTexturedHorizRect(
  w: number,
  d: number,
  h: number,
  r: number,
  mat: THREE.Material,
  bevel = 0.04
): THREE.Mesh {
  const geo = extrudeHiRes(createRoundedRectShape(w, d, r), h, bevel, bevel, 2, 18);
  geo.rotateX(-Math.PI / 2);
  applyPlanarUVs(geo, w, d, 'xz');
  return new THREE.Mesh(geo, mat);
}

/**
 * Phase 31B — Standalone Sony Internal Microphone 110-Part Ultra-Microscopic 2026 Frontier (+30 Parts: MC81–MC110).
 *
 * Strictly enclosed inside the assembled Sony Mic Bay housing (|x| <= 18.0, y in [-9.5, +7.2],
 * z in [-11.5, +7.8], local radius <= 2.6 mm) so the assembled exterior stays 100% spotless,
 * while exploding cleanly (>= 15 mm clearance from all 109 other parts) into 3 outer museum constellations:
 *  - MC81–MC90 (Left Outer Wing): 2026 2D Graphene, Fabry-Perot Optical, Si Photonics, 3D-TSV, 5uA AAD, PMUT & DRIE MEMS Nanophysics
 *  - MC91–MC100 (Right Outer Wing): 2026 Spiral Helmholtz Acoustic Metamaterial, Tubular Wind Cavity, LF Booster & Acoustic Precision
 *  - MC101–MC110 (Front & Rear Showcase Arcs): 2026 Real-Time AI Dereverb, Multi-Speaker Diarization, UWB Lossless Rx, -20dB Safety & 3D HRTF Binaural
 */
export function buildMicUltra31Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // GROUP 1 (MC81–MC90): 2026 2D GRAPHENE, PHOTONICS, 3D-TSV & MEMS NANOPHYSICS
  // =========================================================================

  // MC81. 2026 Atomically Thin 2D Graphene Acoustic Membrane
  {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(hiResTorus(2.25, 0.24, 12, 34), mats.goldPlating);
    ring.rotation.x = Math.PI / 2;
    const sinFrame = new THREE.Mesh(hiResTorus(1.98, 0.08, 8, 30), mats.siliconNitrideBall);
    sinFrame.rotation.x = Math.PI / 2;
    sinFrame.position.y = 0.08;
    sinFrame.userData.noEdges = true;

    const discGeo = hiResCyl(2.15, 2.15, 0.14, 34);
    applyPlanarUVs(discGeo, 4.3, 4.3, 'xz');
    const grapheneDisc = new THREE.Mesh(discGeo, u.micGrapheneHexMembrane);

    // 6 perimeter gold micro-clamping studs around outer collar
    const studGeo = hiResCyl(0.12, 0.12, 0.34, 10);
    const studs = new THREE.InstancedMesh(studGeo, mats.goldPlating, 6);
    const dm = new THREE.Object3D();
    for (let k = 0; k < 6; k++) {
      const a = (Math.PI / 3) * k;
      dm.position.set(Math.cos(a) * 2.25, 0.14, Math.sin(a) * 2.25);
      dm.updateMatrix();
      studs.setMatrixAt(k, dm.matrix);
    }
    studs.instanceMatrix.needsUpdate = true;
    studs.userData.noEdges = true;

    // Sculpted 3D sp2 hexagonal carbon lattice (6 inner + 6 outer atoms + 12 glowing C-C covalent bond struts + 3nm Au dot!)
    const innerPts: THREE.Vector3[] = [];
    for (let k = 0; k < 6; k++) {
      const a = (Math.PI / 3) * k;
      const pIn = new THREE.Vector3(Math.cos(a) * 0.85, 0.28, Math.sin(a) * 0.85);
      const pOut = new THREE.Vector3(Math.cos(a) * 1.56, 0.28, Math.sin(a) * 1.56);
      innerPts.push(pIn);
      const atomIn = new THREE.Mesh(hiResSphere(0.14, 10, 8), mats.evfDichroicMirror);
      atomIn.position.copy(pIn);
      atomIn.userData.noEdges = true;
      const atomOut = new THREE.Mesh(hiResSphere(0.11, 8, 6), mats.vcWorkingFluidCyan);
      atomOut.position.copy(pOut);
      atomOut.userData.noEdges = true;
      // Radial C-C bond to outer lattice ring
      const radBond = buildGoldWirebondLoop(pIn, pOut, 0.01, 0.042, mats.vcWorkingFluidCyan);
      g.add(atomIn, atomOut, radBond);
    }
    for (let k = 0; k < 6; k++) {
      const pA = innerPts[k];
      const pB = innerPts[(k + 1) % 6];
      g.add(buildGoldWirebondLoop(pA, pB, 0.01, 0.045, mats.evfDichroicMirror));
    }
    // 3 nm plasmonic gold optical/conductive nanocoating dot at membrane center
    const auDot = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.06, 18), mats.goldPlating);
    auDot.position.y = 0.11;
    auDot.userData.noEdges = true;
    g.add(ring, sinFrame, grapheneDisc, studs, auDot);

    parts.push(
      finalizeMicUltra31Part(
        'mc-graphene-2d-membrane-2026',
        81,
        '#38bdf8',
        g,
        new THREE.Vector3(-13.8, 4.4, 3.8),
        new THREE.Vector3(-64, 34, 24),
        cp,
        0.18
      )
    );
  }

  // MC82. 2026 Fabry-Perot Optical Micro-Cavity & Fiber-Optic Interferometer
  {
    const g = new THREE.Group();
    const baseMirrorGeo = hiResCyl(2.02, 2.02, 0.28, 30);
    applyPlanarUVs(baseMirrorGeo, 4.04, 4.04, 'xz');
    const baseMirror = new THREE.Mesh(baseMirrorGeo, u.micPhotonicMziDie);
    baseMirror.position.y = -0.62;
    const hrRing = new THREE.Mesh(hiResTorus(1.96, 0.09, 8, 28), mats.evfDichroicMirror);
    hrRing.rotation.x = Math.PI / 2;
    hrRing.position.y = -0.48;
    hrRing.userData.noEdges = true;

    const topMirrorGeo = hiResCyl(1.95, 1.95, 0.16, 30);
    applyPlanarUVs(topMirrorGeo, 3.9, 3.9, 'xz');
    const topMirror = new THREE.Mesh(topMirrorGeo, u.micGrapheneHexMembrane);
    topMirror.position.y = 0.62;
    const topCollar = new THREE.Mesh(hiResTorus(1.96, 0.11, 8, 28), mats.goldPlating);
    topCollar.rotation.x = Math.PI / 2;
    topCollar.position.y = 0.62;
    topCollar.userData.noEdges = true;

    // Standing-wave Fabry-Perot ruby laser beam + 4 glowing lambda/2 antinode interference beads!
    const laserBeam = new THREE.Mesh(hiResCyl(0.24, 0.24, 1.18, 16), mats.evfIrEmitter);
    laserBeam.userData.noEdges = true;
    for (let n = 0; n < 4; n++) {
      const node = new THREE.Mesh(hiResSphere(0.32, 12, 8), mats.evfIrEmitter);
      node.scale.set(1.0, 0.42, 1.0);
      node.position.y = -0.36 + n * 0.24;
      node.userData.noEdges = true;
      g.add(node);
    }

    // Zirconia ceramic 125 um optical fiber ferrule + cleaved glass core + UV-epoxy adhesive meniscus!
    const ferrule = new THREE.Mesh(hiResCyl(0.54, 0.54, 1.18, 20), mats.ceramicAlumina);
    ferrule.position.y = -1.32;
    const fiberCore = new THREE.Mesh(hiResCyl(0.18, 0.18, 1.38, 14), mats.coverGlass);
    fiberCore.position.y = -1.34;
    fiberCore.userData.noEdges = true;
    const uvMeniscus = new THREE.Mesh(hiResTorus(0.56, 0.12, 8, 18), mats.opticalCementClear);
    uvMeniscus.rotation.x = Math.PI / 2;
    uvMeniscus.position.y = -0.78;
    uvMeniscus.userData.noEdges = true;

    // 3 quartz cavity spacer pillars each encircled by a gold piezo-tuning collar ring
    for (let k = 0; k < 3; k++) {
      const a = (Math.PI * 2 * k) / 3;
      const sx = Math.cos(a) * 1.65;
      const sz = Math.sin(a) * 1.65;
      const spacer = new THREE.Mesh(hiResCyl(0.16, 0.16, 1.24, 12), mats.coverGlass);
      spacer.position.set(sx, 0, sz);
      spacer.userData.noEdges = true;
      const pztCollar = new THREE.Mesh(hiResTorus(0.19, 0.06, 6, 14), mats.goldPlating);
      pztCollar.rotation.x = Math.PI / 2;
      pztCollar.position.set(sx, 0, sz);
      pztCollar.userData.noEdges = true;
      g.add(spacer, pztCollar);
    }
    g.add(baseMirror, hrRing, topMirror, topCollar, laserBeam, ferrule, fiberCore, uvMeniscus);

    parts.push(
      finalizeMicUltra31Part(
        'mc-fabry-perot-fiber-cavity',
        82,
        '#f43f5e',
        g,
        new THREE.Vector3(-14.6, 2.8, 4.4),
        new THREE.Vector3(-68, 18, 34),
        cp,
        0.18
      )
    );
  }

  // MC83. 2026 Silicon Photonics Mach-Zehnder Waveguide Acoustic Modulator
  {
    const g = new THREE.Group();
    const chip = makeTexturedHorizRect(4.8, 3.8, 0.42, 0.34, u.micPhotonicMziDie);
    g.add(chip);

    // 1x2 MMI optical splitter & combiner blocks + fiber grating coupler pads at left/right edges!
    for (const mx of [-1.72, 1.72]) {
      const mmi = new THREE.Mesh(
        createChamferedBoxGeo(0.58, 0.18, 0.48, 0.04, 0.01, 'y'),
        mats.evfDichroicMirror
      );
      mmi.position.set(mx, 0.30, 0);
      mmi.userData.noEdges = true;
      const gcPad = new THREE.Mesh(
        createChamferedBoxGeo(0.32, 0.1, 0.62, 0.03, 0.01, 'y'),
        mats.goldPlating
      );
      gcPad.position.set(mx * 1.24, 0.26, 0);
      gcPad.userData.noEdges = true;
      g.add(mmi, gcPad);
    }

    // Split Mach-Zehnder silicon photonic waveguide arms curving around central acoustic strain zone
    const armA = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.95, 0.34, 0),
      new THREE.Vector3(-0.92, 0.34, 1.05),
      new THREE.Vector3(0.92, 0.34, 1.05),
      new THREE.Vector3(1.95, 0.34, 0),
    ]);
    const armB = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.95, 0.34, 0),
      new THREE.Vector3(-0.92, 0.34, -1.05),
      new THREE.Vector3(0.92, 0.34, -1.05),
      new THREE.Vector3(1.95, 0.34, 0),
    ]);
    g.add(
      new THREE.Mesh(markHiRes(new THREE.TubeGeometry(armA, 28, 0.12, 10, false)), mats.evfIrEmitter),
      new THREE.Mesh(markHiRes(new THREE.TubeGeometry(armB, 28, 0.12, 10, false)), mats.evfDichroicMirror)
    );

    // Ormia-ochracea bionic dual-wing torsional silicon acoustic diaphragm coupled to armA!
    for (const wx of [-0.52, 0.52]) {
      const wing = new THREE.Mesh(
        createChamferedBoxGeo(0.84, 0.14, 0.86, 0.08, 0.02, 'y'),
        mats.siliconSensorDie
      );
      wing.position.set(wx, 0.44, 1.02);
      wing.rotation.z = wx < 0 ? 0.08 : -0.08;
      wing.userData.noEdges = true;
      g.add(wing);
    }
    const fulcrum = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.24, 1.08), mats.goldPlating);
    fulcrum.position.set(0, 0.44, 1.02);
    fulcrum.userData.noEdges = true;

    // Gold TiN thermo-optic phase-bias heater meander running over reference armB
    const heater = new THREE.Mesh(
      createChamferedBoxGeo(1.52, 0.1, 0.32, 0.04, 0.01, 'y'),
      mats.goldPlating
    );
    heater.position.set(0, 0.42, -1.05);
    heater.userData.noEdges = true;
    g.add(fulcrum, heater);

    parts.push(
      finalizeMicUltra31Part(
        'mc-silicon-photonics-waveguide',
        83,
        '#a855f7',
        g,
        new THREE.Vector3(-13.2, 1.2, 5.0),
        new THREE.Vector3(-66, 2, 40),
        cp,
        0.18
      )
    );
  }

  // MC84. 2026 Wafer-Level 3D-TSV Vertical MEMS-on-CMOS Hermetic Stack
  {
    const g = new THREE.Group();
    const cmosBase = makeTexturedHorizRect(4.4, 4.4, 0.48, 0.3, u.micMemsAsicDie);
    cmosBase.position.y = -0.78;
    // Upper MEMS wafer with true circular top acoustic port hole + gold bezel!
    const memsShape = createRoundedRectShape(4.2, 4.2, 0.28);
    const pHole = new THREE.Path();
    pHole.absarc(0, 0, 0.82, 0, Math.PI * 2, true);
    memsShape.holes.push(pHole);
    const memsGeo = extrudeHiRes(memsShape, 0.42, 0.04, 0.04, 2, 22);
    memsGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(memsGeo, 4.2, 4.2, 'xz');
    const memsTop = new THREE.Mesh(memsGeo, u.micMemsSiliconDiaphragm);
    memsTop.position.y = 0.72;
    const portRing = new THREE.Mesh(hiResTorus(0.86, 0.08, 8, 24), mats.goldPlating);
    portRing.rotation.x = Math.PI / 2;
    portRing.position.y = 0.94;
    portRing.userData.noEdges = true;

    // Continuous Al-Ge eutectic perimeter hermetic seal ring locking CMOS and MEMS wafers!
    const eutecticSeal = makeHiResHorizPlate(
      createFrameShape(4.0, 4.0, 0.26, 3.55, 3.55, 0.2),
      0.24,
      mats.goldPlating,
      0.03,
      1,
      16
    );
    eutecticSeal.position.y = 0.0;
    eutecticSeal.userData.noEdges = true;

    // 12 vertical copper Through-Silicon Vias (TSVs) framed by SiO2 isolation liner collars!
    const tsvCoords: Array<[number, number]> = [
      [-1.35, -1.35], [-0.45, -1.35], [0.45, -1.35], [1.35, -1.35],
      [-1.35, 1.35], [-0.45, 1.35], [0.45, 1.35], [1.35, 1.35],
      [-1.35, -0.45], [-1.35, 0.45], [1.35, -0.45], [1.35, 0.45],
    ];
    const tsvGeo = hiResCyl(0.14, 0.14, 1.42, 10);
    const linerGeo = hiResTorus(0.18, 0.04, 6, 12);
    linerGeo.rotateX(Math.PI / 2);
    const tsvs = new THREE.InstancedMesh(tsvGeo, mats.copperHybridBond, tsvCoords.length);
    const liners = new THREE.InstancedMesh(linerGeo, mats.ceramicAlumina, tsvCoords.length);
    const dm = new THREE.Object3D();
    for (let i = 0; i < tsvCoords.length; i++) {
      dm.position.set(tsvCoords[i][0], 0, tsvCoords[i][1]);
      dm.updateMatrix();
      tsvs.setMatrixAt(i, dm.matrix);
      dm.position.set(tsvCoords[i][0], -0.46, tsvCoords[i][1]);
      dm.updateMatrix();
      liners.setMatrixAt(i, dm.matrix);
    }
    tsvs.instanceMatrix.needsUpdate = true;
    tsvs.userData.noEdges = true;
    liners.instanceMatrix.needsUpdate = true;
    liners.userData.noEdges = true;

    // Underside 4x4 Au/In micro-bump flip-chip grid beneath CMOS wafer!
    const bumpGeo = hiResSphere(0.14, 8, 6);
    const bumps = new THREE.InstancedMesh(bumpGeo, mats.solderBallSilver, 16);
    let bIdx = 0;
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 4; iz++) {
        dm.position.set(-1.35 + ix * 0.9, -1.08, -1.35 + iz * 0.9);
        dm.updateMatrix();
        bumps.setMatrixAt(bIdx++, dm.matrix);
      }
    }
    bumps.instanceMatrix.needsUpdate = true;
    bumps.userData.noEdges = true;
    g.add(cmosBase, memsTop, portRing, eutecticSeal, tsvs, liners, bumps);

    parts.push(
      finalizeMicUltra31Part(
        'mc-3d-tsv-mems-cmos-stack',
        84,
        '#d97706',
        g,
        new THREE.Vector3(-14.2, -1.8, 4.2),
        new THREE.Vector3(-68, -14, 34),
        cp,
        0.18
      )
    );
  }

  // MC85. 2026 5 uA Always-On Wake-On-Sound (AAD) Smart Voice Trigger MEMS (T5838 / T5848)
  {
    const g = new THREE.Group();
    const pkg = buildChipPackage({
      w: 4.4,
      d: 4.0,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.solderBallSilver,
    });
    // Triple concentric emerald-green sonar trigger wake-on-sound rings + active OLED core!
    for (const [r, t, dy] of [
      [0.72, 0.075, 0.44],
      [1.12, 0.09, 0.47],
      [1.52, 0.065, 0.44],
    ]) {
      const wakeRing = new THREE.Mesh(hiResTorus(r, t, 8, 28), mats.cfaGreen);
      wakeRing.rotation.x = Math.PI / 2;
      wakeRing.position.y = dy;
      wakeRing.userData.noEdges = true;
      g.add(wakeRing);
    }
    const coreDot = new THREE.Mesh(hiResCyl(0.4, 0.4, 0.2, 20), mats.evfOledActive);
    coreDot.position.y = 0.46;
    coreDot.userData.noEdges = true;
    // Programmable acoustic bandpass window strip + gold WAKE_IRQ interrupt pin lug!
    const bpBar = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 0.1, 0.3, 0.04, 0.01, 'y'),
      mats.vcWorkingFluidCyan
    );
    bpBar.position.set(0, 0.43, -1.52);
    bpBar.userData.noEdges = true;
    const irqPad = new THREE.Mesh(
      createChamferedBoxGeo(0.55, 0.14, 0.55, 0.05, 0.01, 'y'),
      mats.goldPlating
    );
    irqPad.position.set(1.62, 0.43, 1.42);
    irqPad.userData.noEdges = true;
    g.add(pkg, coreDot, bpBar, irqPad);

    parts.push(
      finalizeMicUltra31Part(
        'mc-wake-on-sound-5ua-aad',
        85,
        '#10b981',
        g,
        new THREE.Vector3(-13.4, -4.6, 3.6),
        new THREE.Vector3(-70, -30, 32),
        cp,
        0.18
      )
    );
  }

  // MC86. 2026 30-60 kHz PMUT Ultrasonic Room-Reflection & Distance Co-Sensor
  {
    const g = new THREE.Group();
    const carrier = makeTexturedHorizRect(4.4, 4.4, 0.42, 0.34, u.micScAlnPiezoDie);
    const bezelRim = makeHiResHorizPlate(
      createFrameShape(4.4, 4.4, 0.34, 3.8, 3.8, 0.22),
      0.16,
      mats.emiShieldCan,
      0.03,
      1,
      18
    );
    bezelRim.position.y = 0.26;
    bezelRim.userData.noEdges = true;
    g.add(carrier, bezelRim);

    // 2x2 Piezoelectric Micromachined Ultrasonic Transducer (PMUT) Mo/AlN/Mo domes with flared horn collars & wirebonds!
    for (const [px, pz] of [
      [-0.95, -0.95],
      [0.95, -0.95],
      [-0.95, 0.95],
      [0.95, 0.95],
    ]) {
      const hornCollar = new THREE.Mesh(hiResCyl(0.84, 0.68, 0.36, 22, true), mats.stainlessMachined);
      hornCollar.position.set(px, 0.42, pz);
      hornCollar.userData.noEdges = true;
      const dome = new THREE.Mesh(hiResCyl(0.62, 0.72, 0.32, 22), mats.pztCeramic);
      dome.position.set(px, 0.36, pz);
      dome.userData.noEdges = true;
      const elecRing = new THREE.Mesh(hiResTorus(0.48, 0.06, 8, 20), mats.goldPlating);
      elecRing.rotation.x = Math.PI / 2;
      elecRing.position.set(px, 0.54, pz);
      elecRing.userData.noEdges = true;
      const goldCap = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.08, 16), mats.goldPlating);
      goldCap.position.set(px, 0.55, pz);
      goldCap.userData.noEdges = true;
      const wb = buildGoldWirebondLoop(
        new THREE.Vector3(px, 0.56, pz),
        new THREE.Vector3(px * 1.88, 0.34, pz * 1.88),
        0.34,
        0.04,
        mats.goldPlating
      );
      g.add(hornCollar, dome, elecRing, goldCap, wb);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-pmut-ultrasonic-range-2026',
        86,
        '#06b6d4',
        g,
        new THREE.Vector3(-12.2, 4.2, -3.5),
        new THREE.Vector3(-64, 34, -16),
        cp,
        0.18
      )
    );
  }

  // MC87. Concentric Corrugated Polysilicon Membrane Stress-Dispersion Ripples
  {
    const g = new THREE.Group();
    const baseGeo = hiResCyl(2.2, 2.2, 0.16, 36);
    applyPlanarUVs(baseGeo, 4.4, 4.4, 'xz');
    const base = new THREE.Mesh(baseGeo, u.micMemsSiliconDiaphragm);
    const outerClamp = new THREE.Mesh(hiResTorus(2.26, 0.15, 10, 34), u.micDrieSiliconBackplate);
    outerClamp.rotation.x = Math.PI / 2;
    g.add(base, outerClamp);

    // 5 alternating crest/trough concentric sinusoidal corrugation wave rings + 8 Knowles edge-stiffening fingers!
    for (const [rad, ht, dy, mat] of [
      [0.48, 0.085, 0.13, mats.siliconSensorDie],
      [0.86, 0.095, -0.02, mats.gatePolysilicon],
      [1.24, 0.11, 0.14, mats.siliconSensorDie],
      [1.62, 0.11, -0.02, mats.gatePolysilicon],
      [1.98, 0.12, 0.14, mats.siliconPhotodiode],
    ] as Array<[number, number, number, THREE.Material]>) {
      const ripple = new THREE.Mesh(hiResTorus(rad, ht, 10, 34), mat);
      ripple.rotation.x = Math.PI / 2;
      ripple.position.y = dy;
      ripple.userData.noEdges = true;
      g.add(ripple);
    }
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const finger = new THREE.Mesh(
        createChamferedBoxGeo(0.46, 0.12, 0.14, 0.03, 0.01, 'y'),
        mats.goldPlating
      );
      finger.position.set(Math.cos(a) * 2.02, 0.14, Math.sin(a) * 2.02);
      finger.rotation.y = -a;
      finger.userData.noEdges = true;
      g.add(finger);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-corrugated-poly-si-rings',
        87,
        '#0ea5e9',
        g,
        new THREE.Vector3(-13.8, 1.8, -5.2),
        new THREE.Vector3(-68, 16, -28),
        cp,
        0.18
      )
    );
  }

  // MC88. Vapor-HF SiO2 Sacrificial Etch-Release Channels & Si3N4 Etch-Stop Pillars
  {
    const g = new THREE.Group();
    const floor = makeTexturedHorizRect(4.4, 4.4, 0.34, 0.3, u.micDrieSiliconBackplate);
    floor.position.y = -0.52;

    // Suspended polysilicon roof pierced by 16 true 0.8 um Vapor-HF etch-release perforations (4x4 array!)
    const roofShape = createRoundedRectShape(4.4, 4.4, 0.34);
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 4; iz++) {
        const hole = new THREE.Path();
        hole.absarc(-1.05 + ix * 0.7, -1.05 + iz * 0.7, 0.18, 0, Math.PI * 2, true);
        roofShape.holes.push(hole);
      }
    }
    const roofGeo = extrudeHiRes(roofShape, 0.24, 0.03, 0.03, 2, 18);
    roofGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(roofGeo, 4.4, 4.4, 'xz');
    const roof = new THREE.Mesh(roofGeo, u.micMemsSiliconDiaphragm);
    roof.position.y = 0.48;

    // Translucent residual SiO2 undercut ring showing Vapor-HF lateral release front
    const sio2Ring = makeHiResHorizPlate(
      createFrameShape(4.2, 4.2, 0.3, 3.3, 3.3, 0.22),
      0.56,
      mats.opticalCementClear,
      0.03,
      1,
      16
    );
    sio2Ring.userData.noEdges = true;

    // 8 Si3N4 etch-stop pillars each capped with an Al2O3 alumina protective collar disc
    const pilCoords: Array<[number, number]> = [
      [-1.62, -1.62], [1.62, -1.62], [-1.62, 1.62], [1.62, 1.62],
      [0, -1.68], [0, 1.68], [-1.68, 0], [1.68, 0],
    ];
    for (const [px, pz] of pilCoords) {
      const pillar = new THREE.Mesh(hiResCyl(0.24, 0.26, 0.96, 14), mats.siliconNitrideBall);
      pillar.position.set(px, 0, pz);
      pillar.userData.noEdges = true;
      const alCap = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.1, 14), mats.ceramicAlumina);
      alCap.position.set(px, 0.38, pz);
      alCap.userData.noEdges = true;
      g.add(pillar, alCap);
    }
    g.add(floor, roof, sio2Ring);

    parts.push(
      finalizeMicUltra31Part(
        'mc-sio2-sacrificial-etch-stops',
        88,
        '#6366f1',
        g,
        new THREE.Vector3(-12.6, -0.8, -6.5),
        new THREE.Vector3(-66, -2, -36),
        cp,
        0.18
      )
    );
  }

  // MC89. Bosch DRIE Vertical Silicon Scallop Trench Wall & Back-Volume Cavity
  {
    const g = new THREE.Group();
    // Bespoke SF6/C4F8 Bosch-scallop textured vertical cutaway cylinder + 8 cyclic micro-scallop plasma ridges!
    const wallCyl = new THREE.Mesh(
      hiResCyl(1.88, 1.88, 1.88, 34, true, Math.PI * 0.22, Math.PI * 1.56),
      u.micBoschScallopSi
    );
    for (let i = 0; i < 8; i++) {
      const scallop = new THREE.Mesh(
        hiResTorus(1.84, 0.14, 10, 32, Math.PI * 1.56),
        i % 2 === 0 ? mats.siliconBulk : mats.siliconPhotodiode
      );
      scallop.rotation.x = Math.PI / 2;
      scallop.rotation.z = -Math.PI * 0.22;
      scallop.position.y = -0.82 + i * 0.235;
      scallop.userData.noEdges = true;
      g.add(scallop);
    }
    // Top SiO2 hard-mask etch collar + bottom DRIE silicon wafer flange rim
    const topMask = new THREE.Mesh(hiResTorus(1.94, 0.14, 10, 32), mats.ceramicAlumina);
    topMask.rotation.x = Math.PI / 2;
    topMask.position.y = 0.96;
    const baseGeo = extrudeHiRes(
      createFrameShape(4.6, 4.6, 0.4, 3.3, 3.3, 0.25),
      0.34,
      0.04,
      0.04,
      2,
      20
    );
    baseGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(baseGeo, 4.6, 4.6, 'xz');
    const baseRim = new THREE.Mesh(baseGeo, u.micDrieSiliconBackplate);
    baseRim.position.y = -0.98;
    g.add(wallCyl, topMask, baseRim);

    parts.push(
      finalizeMicUltra31Part(
        'mc-drie-bosch-scallop-wall',
        89,
        '#475569',
        g,
        new THREE.Vector3(-11.4, -3.6, -7.2),
        new THREE.Vector3(-64, -20, -34),
        cp,
        0.2
      )
    );
  }

  // MC90. 360-Deg Continuous LGA Metal-Lid Solder-Ring Acoustic & GHz Faraday Seal
  {
    const g = new THREE.Group();
    // Top brushed Faraday lid flange (planar XZ UVs!) with 4 corner alignment tabs
    const lidGeo = extrudeHiRes(
      createFrameShape(4.8, 4.2, 0.44, 3.4, 2.8, 0.28),
      0.42,
      0.04,
      0.04,
      2,
      20
    );
    lidGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(lidGeo, 4.8, 4.2, 'xz');
    const lidBase = new THREE.Mesh(lidGeo, u.micMemsFaradayLid);
    for (const [tx, tz] of [
      [-2.15, -1.85], [2.15, -1.85], [-2.15, 1.85], [2.15, 1.85],
    ]) {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.42), mats.stainlessMachined);
      tab.position.set(tx, 0.24, tz);
      tab.userData.noEdges = true;
      g.add(tab);
    }

    // Continuous gleaming SAC305 reflowed solder meniscus fillet ring + ceramic/gold ground ring + 16 stitched vias!
    const solderRing = makeHiResHorizPlate(
      createFrameShape(4.64, 4.04, 0.42, 3.76, 3.16, 0.3),
      0.28,
      mats.solderBallSilver,
      0.06,
      2,
      20
    );
    solderRing.position.y = -0.34;
    const goldPadRing = makeHiResHorizPlate(
      createFrameShape(4.74, 4.14, 0.42, 3.68, 3.08, 0.3),
      0.16,
      mats.goldPlating,
      0.03,
      2,
      20
    );
    goldPadRing.position.y = -0.56;
    const subRimGeo = extrudeHiRes(
      createFrameShape(4.9, 4.3, 0.44, 3.5, 2.9, 0.28),
      0.22,
      0.03,
      0.03,
      1,
      20
    );
    subRimGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(subRimGeo, 4.9, 4.3, 'xz');
    const subRim = new THREE.Mesh(subRimGeo, u.micCeramicLgaSubstrate);
    subRim.position.y = -0.75;

    const viaGeo = hiResCyl(0.09, 0.09, 0.42, 8);
    const vias = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 16);
    const dm = new THREE.Object3D();
    let vIdx = 0;
    for (let i = 0; i < 5; i++) {
      const vx = -1.7 + i * 0.85;
      dm.position.set(vx, -0.68, -1.82);
      dm.updateMatrix();
      vias.setMatrixAt(vIdx++, dm.matrix);
      dm.position.set(vx, -0.68, 1.82);
      dm.updateMatrix();
      vias.setMatrixAt(vIdx++, dm.matrix);
    }
    for (let i = 0; i < 3; i++) {
      const vz = -0.92 + i * 0.92;
      dm.position.set(-2.12, -0.68, vz);
      dm.updateMatrix();
      vias.setMatrixAt(vIdx++, dm.matrix);
      dm.position.set(2.12, -0.68, vz);
      dm.updateMatrix();
      vias.setMatrixAt(vIdx++, dm.matrix);
    }
    vias.instanceMatrix.needsUpdate = true;
    vias.userData.noEdges = true;
    g.add(lidBase, solderRing, goldPadRing, subRim, vias);

    parts.push(
      finalizeMicUltra31Part(
        'mc-metal-lid-solder-ring-seal',
        90,
        '#eab308',
        g,
        new THREE.Vector3(-10.4, -6.2, -5.6),
        new THREE.Vector3(-60, -38, -22),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // GROUP 2 (MC91–MC100): 2026 ACOUSTIC METAMATERIALS & WIND/SPL ACOUSTIC PRECISION
  // =========================================================================

  // MC91. 2026 Spiral-Neck Coiled Helmholtz Acoustic Metamaterial Wind-Noise Absorber
  {
    const g = new THREE.Group();
    const tile = makeTexturedHorizRect(4.8, 4.8, 0.62, 0.42, u.micSpiralMetamaterial);
    // Physical 3D 3-turn Archimedean coiled acoustic waveguide wall + central phase-cancellation aperture!
    const spPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const t = i / 64;
      const a = t * Math.PI * 2 * 3.0;
      const r = 0.34 + t * 1.66;
      spPts.push(new THREE.Vector3(Math.cos(a) * r, 0.44, Math.sin(a) * r));
    }
    const spMesh = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(spPts), 72, 0.11, 8, false)),
      mats.goldPlating
    );
    const centerPort = new THREE.Mesh(hiResTorus(0.32, 0.08, 8, 20), mats.brassGear);
    centerPort.rotation.x = Math.PI / 2;
    centerPort.position.y = 0.40;
    centerPort.userData.noEdges = true;
    // 8 folded quarter-wavelength outer perimeter crown resonator vanes + 4 corner mounting studs
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const vane = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 0.32, 0.14, 0.03, 0.01, 'y'),
        mats.copperCoil
      );
      vane.position.set(Math.cos(a) * 2.15, 0.42, Math.sin(a) * 2.15);
      vane.rotation.y = -a;
      vane.userData.noEdges = true;
      g.add(vane);
    }
    for (const [cx, cz] of [
      [-2.05, -2.05], [2.05, -2.05], [-2.05, 2.05], [2.05, 2.05],
    ]) {
      const stud = new THREE.Mesh(hiResCyl(0.16, 0.16, 0.78, 10), mats.brassGear);
      stud.position.set(cx, 0.08, cz);
      stud.userData.noEdges = true;
      g.add(stud);
    }
    g.add(tile, spMesh, centerPort);

    parts.push(
      finalizeMicUltra31Part(
        'mc-spiral-helmholtz-metamaterial',
        91,
        '#f59e0b',
        g,
        new THREE.Vector3(13.8, 4.4, 3.8),
        new THREE.Vector3(64, 34, 24),
        cp,
        0.18
      )
    );
  }

  // MC92. 2026 Tubular Front Acoustic Cavity Vortex-Separation Wind Suppressor
  {
    const g = new THREE.Group();
    const housingGeo = hiResCyl(2.08, 2.16, 1.35, 32);
    applyBoxUVs(housingGeo, 5.5);
    const housing = new THREE.Mesh(housingGeo, u.micEcmSpunAluminum);
    const topLip = new THREE.Mesh(hiResTorus(2.04, 0.12, 10, 32), mats.stainlessMachined);
    topLip.rotation.x = Math.PI / 2;
    topLip.position.y = 0.68;
    topLip.userData.noEdges = true;

    // 3 parallel tuned stainless laminar micro-tubes in equilateral vortex-separation triad with flared mouths!
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
      const tx = Math.cos(a) * 0.86;
      const tz = Math.sin(a) * 0.86;
      const tube = new THREE.Mesh(hiResCyl(0.42, 0.42, 1.88, 20), mats.stainlessMachined);
      tube.position.set(tx, 0.12, tz);
      const flare = new THREE.Mesh(hiResTorus(0.42, 0.075, 8, 20), mats.goldPlating);
      flare.rotation.x = Math.PI / 2;
      flare.position.set(tx, 1.04, tz);
      flare.userData.noEdges = true;
      const vortexSlot = new THREE.Mesh(hiResTorus(0.44, 0.04, 6, 18), mats.matteBlackAnodized);
      vortexSlot.rotation.x = Math.PI / 2;
      vortexSlot.position.set(tx, 0.78, tz);
      vortexSlot.userData.noEdges = true;
      const inner = new THREE.Mesh(hiResCyl(0.28, 0.28, 1.96, 16), mats.matteBlackAnodized);
      inner.position.set(tx, 0.12, tz);
      inner.userData.noEdges = true;
      g.add(tube, flare, vortexSlot, inner);
    }
    g.add(housing, topLip);

    parts.push(
      finalizeMicUltra31Part(
        'mc-tubular-front-cavity-wind',
        92,
        '#0284c7',
        g,
        new THREE.Vector3(14.4, 2.8, 4.4),
        new THREE.Vector3(68, 18, 34),
        cp,
        0.2
      )
    );
  }

  // MC93. 2026 Low-Frequency Bass-Sensitivity Boosting Acoustic Metamaterial Lens
  {
    const g = new THREE.Group();
    const base = makeTexturedHorizRect(4.6, 4.6, 0.44, 0.42, u.micSpiralMetamaterial);
    g.add(base);
    // 4 stepped Gradient-Index (GRIN) acoustic funnel rings + 8 radial subwavelength impedance vanes!
    for (const [rad, yy, mat] of [
      [1.92, 0.34, mats.copperCoil],
      [1.46, 0.52, mats.brassGear],
      [1.02, 0.70, mats.copperCoil],
      [0.58, 0.88, mats.goldPlating],
    ] as Array<[number, number, THREE.Material]>) {
      const funnelRing = new THREE.Mesh(hiResTorus(rad, 0.13, 10, 32), mat);
      funnelRing.rotation.x = Math.PI / 2;
      funnelRing.position.y = yy;
      funnelRing.userData.noEdges = true;
      g.add(funnelRing);
    }
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const vane = new THREE.Mesh(
        createChamferedBoxGeo(1.42, 0.26, 0.08, 0.02, 0.01, 'y'),
        mats.goldPlating
      );
      vane.position.set(Math.cos(a) * 1.24, 0.48, Math.sin(a) * 1.24);
      vane.rotation.set(0, -a, 0.26);
      vane.userData.noEdges = true;
      g.add(vane);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-lowfreq-metamaterial-booster',
        93,
        '#14b8a6',
        g,
        new THREE.Vector3(13.2, 1.2, 5.0),
        new THREE.Vector3(66, 2, 40),
        cp,
        0.18
      )
    );
  }

  // MC94. Top-Deck Micro-Chamfer Acoustic Horn Suppressing Edge-Diffraction Coloration
  {
    const g = new THREE.Group();
    const deck = makeTexturedHorizRect(4.8, 4.2, 0.42, 0.4, u.micTopDeckMg);
    // True Lathe-turned exponential flared stainless acoustic bell horn eliminating edge comb-filtering!
    const hornProf: THREE.Vector2[] = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const r = 0.56 + 1.08 * Math.pow(t, 2.2);
      const y = -0.1 + t * 0.68;
      hornProf.push(new THREE.Vector2(r, y));
    }
    hornProf.push(new THREE.Vector2(1.74, 0.58));
    hornProf.push(new THREE.Vector2(1.74, 0.22));
    hornProf.push(new THREE.Vector2(0.72, -0.1));
    const hornGeo = markHiRes(new THREE.LatheGeometry(hornProf, 34));
    hornGeo.computeVertexNormals();
    const bellHorn = new THREE.Mesh(hornGeo, mats.stainlessMachined);
    const throat = new THREE.Mesh(hiResCyl(0.56, 0.52, 0.55, 22), mats.matteBlackAnodized);
    throat.position.y = 0.08;
    throat.userData.noEdges = true;
    const reticle = new THREE.Mesh(hiResTorus(1.66, 0.06, 8, 30), mats.goldPlating);
    reticle.rotation.x = Math.PI / 2;
    reticle.position.y = 0.58;
    reticle.userData.noEdges = true;
    g.add(deck, bellHorn, throat, reticle);

    parts.push(
      finalizeMicUltra31Part(
        'mc-acoustic-edge-diffraction-chamfer',
        94,
        '#94a3b8',
        g,
        new THREE.Vector3(14.0, -1.8, 4.2),
        new THREE.Vector3(68, -14, 34),
        cp,
        0.2
      )
    );
  }

  // MC95. Dual-Pitch Acoustic Impedance-Matched Wind Boundary-Layer Splitter Mesh
  {
    const g = new THREE.Group();
    const coarseGeo = extrudeHiRes(createRoundedRectShape(4.4, 4.0, 0.34), 0.18, 0.02, 0.02, 1, 16);
    coarseGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(coarseGeo, 3.8);
    const coarseMesh = new THREE.Mesh(coarseGeo, u.micStainlessWovenMesh);
    coarseMesh.position.y = 0.46;
    const topBezel = makeHiResHorizPlate(
      createFrameShape(4.65, 4.25, 0.38, 3.95, 3.55, 0.26),
      0.24,
      mats.stainlessMachined,
      0.03,
      1,
      18
    );
    topBezel.position.y = 0.46;
    for (const [wx, wz] of [
      [-2.05, -1.85], [2.05, -1.85], [-2.05, 1.85], [2.05, 1.85],
    ]) {
      const tack = new THREE.Mesh(hiResSphere(0.11, 8, 6), mats.goldPlating);
      tack.position.set(wx, 0.58, wz);
      tack.userData.noEdges = true;
      g.add(tack);
    }

    const fineMesh = makeTexturedHorizRect(4.4, 4.0, 0.22, 0.34, u.micAcousticDelayCloth);
    fineMesh.position.y = -0.34;

    // Middle PPS spacer frame with 4 lateral boundary-layer pressure-bleed relief slots
    const airSpacer = makeHiResHorizPlate(
      createFrameShape(4.5, 4.1, 0.35, 3.5, 3.1, 0.25),
      0.56,
      mats.mountPpsInsulator,
      0.03,
      2,
      18
    );
    for (const [sx, sz, w, d] of [
      [0, -2.06, 1.6, 0.18], [0, 2.06, 1.6, 0.18], [-2.26, 0, 0.18, 1.4], [2.26, 0, 0.18, 1.4],
    ]) {
      const bleed = new THREE.Mesh(new THREE.BoxGeometry(w, 0.24, d), mats.matteBlackAnodized);
      bleed.position.set(sx, 0.06, sz);
      bleed.userData.noEdges = true;
      g.add(bleed);
    }
    g.add(coarseMesh, topBezel, airSpacer, fineMesh);

    parts.push(
      finalizeMicUltra31Part(
        'mc-dual-layer-wind-boundary-mesh',
        95,
        '#64748b',
        g,
        new THREE.Vector3(13.2, -4.4, 3.6),
        new THREE.Vector3(62, -28, 22),
        cp,
        0.18
      )
    );
  }

  // MC96. Hydrophobic + Oleophobic Sebum/Oil-Repellent Acoustic Port Nano-Protector
  {
    const g = new THREE.Group();
    const memGeo = hiResCyl(2.15, 2.15, 0.22, 34);
    applyPlanarUVs(memGeo, 4.3, 4.3, 'xz');
    const membrane = new THREE.Mesh(memGeo, u.micEptfeMembrane);
    const frame = new THREE.Mesh(hiResTorus(2.18, 0.18, 10, 34), mats.matteBlackAnodized);
    frame.rotation.x = Math.PI / 2;
    // W.L. Gore GAW333 3M PSA outer sealing adhesive ring + corner peel-off alignment pull-tab
    const psaRing = new THREE.Mesh(hiResTorus(1.94, 0.08, 8, 30), mats.opticalCementClear);
    psaRing.rotation.x = Math.PI / 2;
    psaRing.position.y = -0.14;
    psaRing.userData.noEdges = true;
    const pullTab = new THREE.Mesh(
      createChamferedBoxGeo(0.75, 0.14, 0.56, 0.1, 0.02, 'y'),
      mats.mountShimBlue
    );
    pullTab.position.set(2.15, 0.04, 0);
    pullTab.userData.noEdges = true;

    // 3 Cassie-Baxter 155-deg crystal water droplets + 2 amber sebum/oil droplets each with meniscus ring!
    for (const [dx, dz, rad, mat, ringMat] of [
      [-0.84, 0.42, 0.44, mats.coverGlass, mats.vcWorkingFluidCyan],
      [-0.18, -0.82, 0.32, mats.coverGlass, mats.vcWorkingFluidCyan],
      [0.24, 0.94, 0.28, mats.coverGlass, mats.vcWorkingFluidCyan],
      [0.88, -0.34, 0.38, mats.tantalumCapYellow, mats.goldPlating],
      [0.72, 0.56, 0.26, mats.tantalumCapYellow, mats.goldPlating],
    ] as Array<[number, number, number, THREE.Material, THREE.Material]>) {
      const drop = new THREE.Mesh(hiResSphere(rad, 14, 10), mat);
      drop.position.set(dx, 0.12 + rad * 0.84, dz);
      drop.userData.noEdges = true;
      const men = new THREE.Mesh(hiResTorus(rad * 0.52, 0.03, 6, 14), ringMat);
      men.rotation.x = Math.PI / 2;
      men.position.set(dx, 0.14, dz);
      men.userData.noEdges = true;
      g.add(drop, men);
    }
    g.add(membrane, frame, psaRing, pullTab);

    parts.push(
      finalizeMicUltra31Part(
        'mc-hydrophobic-oleophobic-mesh',
        96,
        '#22d3ee',
        g,
        new THREE.Vector3(12.2, 4.2, -3.5),
        new THREE.Vector3(64, 34, -16),
        cp,
        0.16
      )
    );
  }

  // MC97. Proximity-Effect Bass-Buildup Auto-Balancing Variable-D Pressure-Gradient EQ Baffle
  {
    const g = new THREE.Group();
    const body = makeTexturedHorizRect(4.8, 4.2, 0.46, 0.34, u.micAcousticDelayCloth);
    // 3 Electro-Voice Variable-D graded-distance acoustic ports (HF brass, Mid copper, LF damped steel)!
    for (const [px, r, mat] of [
      [-1.42, 0.54, mats.brassGear],
      [0, 0.46, mats.copperCoil],
      [1.42, 0.40, mats.titaniumRivet],
    ] as Array<[number, number, THREE.Material]>) {
      const port = new THREE.Mesh(hiResCyl(r, r, 0.72, 20), mat);
      port.position.set(px, 0.34, 0);
      const bore = new THREE.Mesh(hiResCyl(r * 0.6, r * 0.6, 0.78, 16), mats.matteBlackAnodized);
      bore.position.set(px, 0.34, 0);
      bore.userData.noEdges = true;
      g.add(port, bore);
    }
    // CNC stainless Variable-D phase-delay manifold channel with 3 calibrated acoustic resistance slots
    const bridgeChannel = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 0.36, 0.86, 0.08, 0.03, 'y'),
      mats.stainlessMachined
    );
    bridgeChannel.position.set(0, 0.42, 0);
    for (const sx of [-0.72, 0, 0.72]) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.74), mats.matteBlackAnodized);
      slot.position.set(sx, 0.60, 0);
      slot.userData.noEdges = true;
      g.add(slot);
    }
    g.add(body, bridgeChannel);

    parts.push(
      finalizeMicUltra31Part(
        'mc-proximity-effect-eq-baffle',
        97,
        '#d97706',
        g,
        new THREE.Vector3(13.8, 1.8, -5.2),
        new THREE.Vector3(68, 16, -28),
        cp,
        0.18
      )
    );
  }

  // MC98. L / R / Rear Internal Cavity Silicone Acoustic-Crosstalk Isolation Bulkhead
  {
    const g = new THREE.Group();
    // Sculpted 3-way silicone acoustic isolation wall with twin dual-lip compression sealing beads & dowel pins!
    const wxGeo = createChamferedBoxGeo(4.8, 1.45, 0.56, 0.14, 0.04, 'y');
    applyBoxUVs(wxGeo, 4.0);
    const wallX = new THREE.Mesh(wxGeo, u.micRubberBootBlack);
    const wzGeo = createChamferedBoxGeo(0.56, 1.45, 4.2, 0.14, 0.04, 'y');
    applyBoxUVs(wzGeo, 4.0);
    const wallZ = new THREE.Mesh(wzGeo, u.micRubberBootBlack);

    // Dual-lip top & bottom compression sealing beads along both bulkhead wings
    for (const sy of [-0.78, 0.78]) {
      const beadX = new THREE.Mesh(createChamferedBoxGeo(4.65, 0.18, 0.28, 0.06, 0.02, 'y'), mats.butylDamperRubber);
      beadX.position.set(0, sy, 0);
      beadX.userData.noEdges = true;
      const beadZ = new THREE.Mesh(createChamferedBoxGeo(0.28, 0.18, 4.05, 0.06, 0.02, 'y'), mats.butylDamperRubber);
      beadZ.position.set(0, sy, 0);
      beadZ.userData.noEdges = true;
      g.add(beadX, beadZ);
    }
    // 4 molded stiffening buttress ribs + 3 stainless alignment dowel pins at wing tips
    for (const [bx, bz] of [
      [-1.35, 0], [1.35, 0], [0, -1.2], [0, 1.2],
    ]) {
      const buttress = new THREE.Mesh(
        createChamferedBoxGeo(bx === 0 ? 0.88 : 0.22, 1.25, bz === 0 ? 0.88 : 0.22, 0.05, 0.02, 'y'),
        u.micRubberBootBlack
      );
      buttress.position.set(bx, 0, bz);
      buttress.userData.noEdges = true;
      g.add(buttress);
    }
    for (const [px, pz] of [
      [-2.15, 0], [2.15, 0], [0, -1.88],
    ]) {
      const pin = new THREE.Mesh(hiResCyl(0.14, 0.14, 1.82, 10), mats.stainlessMachined);
      pin.position.set(px, 0, pz);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    const sealCap = new THREE.Mesh(hiResCyl(0.62, 0.62, 1.66, 22), mats.damperElastomer);
    g.add(wallX, wallZ, sealCap);

    parts.push(
      finalizeMicUltra31Part(
        'mc-acoustic-crosstalk-barrier',
        98,
        '#334155',
        g,
        new THREE.Vector3(12.6, -0.8, -6.5),
        new THREE.Vector3(66, -2, -36),
        cp,
        0.2
      )
    );
  }

  // MC99. 148 dB Explosion/Gust Shock-Wave Relief Micro-Slit Diaphragm Safety Flap
  {
    const g = new THREE.Group();
    const ringGeo = hiResTorus(2.05, 0.22, 12, 32);
    ringGeo.rotateX(Math.PI / 2);
    applyBoxUVs(ringGeo, 4.5);
    const ring = new THREE.Mesh(ringGeo, u.micEcmSpunAluminum);

    const baseGeo = hiResCyl(1.92, 1.92, 0.14, 32);
    applyPlanarUVs(baseGeo, 3.84, 3.84, 'xz');
    const baseMem = new THREE.Mesh(baseGeo, u.micMemsSiliconDiaphragm);
    // Etched recessed shock-relief slot beneath open flap
    const reliefAperture = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.18, 1.42), mats.matteBlackAnodized);
    reliefAperture.position.set(0.18, 0.02, 0);
    reliefAperture.userData.noEdges = true;

    // Hinged gold cantilever safety flap tilted open at 22 deg + 2 torsion hinge bars + mechanical stop lug!
    const flap = new THREE.Mesh(
      createChamferedBoxGeo(1.48, 0.12, 1.48, 0.14, 0.02, 'y'),
      mats.goldPlating
    );
    flap.position.set(0.24, 0.38, 0);
    flap.rotation.z = 0.38;
    for (const hz of [-0.46, 0.46]) {
      const hinge = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.09, 0.14), mats.copperCoil);
      hinge.position.set(-0.62, 0.14, hz);
      hinge.userData.noEdges = true;
      g.add(hinge);
    }
    const stopLug = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 0.62, 0.42, 0.06, 0.02, 'y'),
      mats.stainlessMachined
    );
    stopLug.position.set(1.18, 0.36, 0);
    stopLug.userData.noEdges = true;
    g.add(ring, baseMem, reliefAperture, flap, stopLug);

    parts.push(
      finalizeMicUltra31Part(
        'mc-high-spl-membrane-vent-flap',
        99,
        '#ef4444',
        g,
        new THREE.Vector3(11.4, -3.6, -7.2),
        new THREE.Vector3(64, -20, -34),
        cp,
        0.18
      )
    );
  }

  // MC100. 6-9 kHz Sibilance Peak-Taming 2D Quadratic Residue Diffuser (QRD) Lattice
  {
    const g = new THREE.Group();
    const discGeo = hiResCyl(2.15, 2.15, 0.28, 34);
    applyPlanarUVs(discGeo, 4.3, 4.3, 'xz');
    const disc = new THREE.Mesh(discGeo, u.mic8CapsuleArrayFace);
    const bezel = new THREE.Mesh(hiResTorus(2.16, 0.11, 10, 34), mats.stainlessMachined);
    bezel.rotation.x = Math.PI / 2;
    bezel.position.y = 0.08;
    g.add(disc, bezel);

    // 19-element 2D Quadratic Residue Diffuser (n^2 mod 7 stepped heights!) CNC brass micro-pillar lattice!
    const qrdSeq = [0.26, 0.44, 0.78, 0.56, 0.56, 0.78, 0.44];
    const coords: Array<[number, number, number]> = [[0, 0, qrdSeq[0]]];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      coords.push([Math.cos(a) * 0.78, Math.sin(a) * 0.78, qrdSeq[(i + 1) % 7]]);
    }
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
      coords.push([Math.cos(a) * 1.52, Math.sin(a) * 1.52, qrdSeq[(i * 2 + 2) % 7]]);
    }
    const pegGeo = hiResCyl(0.18, 0.20, 1.0, 14);
    const pegs = new THREE.InstancedMesh(pegGeo, mats.brassGear, coords.length);
    const dm = new THREE.Object3D();
    for (let i = 0; i < coords.length; i++) {
      const [px, pz, h] = coords[i];
      dm.position.set(px, 0.14 + h * 0.5, pz);
      dm.scale.set(1, h, 1);
      dm.updateMatrix();
      pegs.setMatrixAt(i, dm.matrix);
    }
    pegs.instanceMatrix.needsUpdate = true;
    pegs.userData.noEdges = true;
    g.add(pegs);

    parts.push(
      finalizeMicUltra31Part(
        'mc-sibilance-acoustic-diffuser',
        100,
        '#ec4899',
        g,
        new THREE.Vector3(10.4, -6.2, -5.6),
        new THREE.Vector3(68, -42, -32),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // GROUP 3 (MC101–MC110): 2026 AI DEREVERB, MULTI-SPEAKER, UWB RX & 3D HRTF BINAURAL
  // =========================================================================

  // MC101. 2026 Real-Time AI Dereverberation / Room-Echo Canceller NPU Stage
  {
    const g = new THREE.Group();
    const pkg = buildChipPackage({
      w: 4.8,
      d: 4.4,
      h: 0.76,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.solderBallSilver,
    });
    // Recessed bare-die NPU window textured with bespoke AI NPU die + 2x4 elevated gold systolic tiles!
    const npuCore = makeTexturedHorizRect(2.8, 2.4, 0.22, 0.16, u.micAiNpuDie);
    npuCore.position.y = 0.48;
    const tileGeo = createChamferedBoxGeo(0.48, 0.12, 0.72, 0.04, 0.01, 'y');
    const tiles = new THREE.InstancedMesh(tileGeo, mats.goldPlating, 8);
    const dm = new THREE.Object3D();
    let tIdx = 0;
    for (let ix = 0; ix < 4; ix++) {
      for (const iz of [-0.52, 0.52]) {
        dm.position.set(-0.96 + ix * 0.64, 0.64, iz);
        dm.updateMatrix();
        tiles.setMatrixAt(tIdx++, dm.matrix);
      }
    }
    tiles.instanceMatrix.needsUpdate = true;
    tiles.userData.noEdges = true;
    // 4 flanking 0201 C0G decoupling MLCCs around die perimeter
    for (const [cx, cz] of [
      [-1.85, -1.35], [1.85, -1.35], [-1.85, 1.35], [1.85, 1.35],
    ]) {
      const cap = buildSmdPassive(0.56, 0.3, 0.26, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(cx, 0.48, cz);
      g.add(cap);
    }
    g.add(pkg, npuCore, tiles);

    parts.push(
      finalizeMicUltra31Part(
        'mc-ai-dereverb-room-cancel-2026',
        101,
        '#8b5cf6',
        g,
        new THREE.Vector3(-6.2, -5.8, 4.2),
        new THREE.Vector3(-32, 42, 34),
        cp,
        0.18
      )
    );
  }

  // MC102. 2026 Real-Time Multi-Speaker Voiceprint Diarization & Dual-Person Separator
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect(4.8, 4.2, 0.38, 0.3, u.micAudioMainPcb);
    // Twin voiceprint speaker-embedding accelerator cores (Speaker A cyan + Speaker B gold) + SRAM embedding tiles!
    const stemA = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.42, 2.25, 0.14, 0.03, 'y'),
      mats.vcWorkingFluidCyan
    );
    stemA.position.set(-1.18, 0.36, -0.25);
    const stemB = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.42, 2.25, 0.14, 0.03, 'y'),
      mats.goldPlating
    );
    stemB.position.set(1.18, 0.36, -0.25);
    for (const sx of [-1.18, 1.18]) {
      for (const sz of [-0.68, 0.18]) {
        const sram = new THREE.Mesh(
          createChamferedBoxGeo(1.18, 0.14, 0.56, 0.04, 0.01, 'y'),
          mats.siliconSensorDie
        );
        sram.position.set(sx, 0.62, sz);
        sram.userData.noEdges = true;
        g.add(sram);
      }
    }
    // Cross-attention bridge bus linking both speaker embeddings + dual ENIG track output pads
    const crossBus = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 0.45), mats.copperCoil);
    crossBus.position.set(0, 0.42, -0.25);
    crossBus.userData.noEdges = true;
    for (const [px, mat] of [
      [-1.18, mats.vcWorkingFluidCyan],
      [1.18, mats.goldPlating],
    ] as Array<[number, THREE.Material]>) {
      const outPad = new THREE.Mesh(createChamferedBoxGeo(1.45, 0.12, 0.58, 0.06, 0.02, 'y'), mat);
      outPad.position.set(px, 0.25, 1.42);
      outPad.userData.noEdges = true;
      g.add(outPad);
    }
    g.add(pcb, stemA, stemB, crossBus);

    parts.push(
      finalizeMicUltra31Part(
        'mc-speaker-diarization-track-2026',
        102,
        '#0ea5e9',
        g,
        new THREE.Vector3(-2.4, -6.2, 4.8),
        new THREE.Vector3(-10, 44, 38),
        cp,
        0.18
      )
    );
  }

  // MC103. 2026 <2 ms Lossless 2.4 GHz / UWB Wireless Mic Diversity Receiver IF
  {
    const g = new THREE.Group();
    const shield = makeTexturedHorizRect(4.8, 4.0, 0.62, 0.3, u.micUwbRfModule);
    // 8 perimeter stainless EMI shield snap-clips around RF can border
    for (const [cx, cz] of [
      [-1.6, -2.02], [0, -2.02], [1.6, -2.02],
      [-1.6, 2.02], [0, 2.02], [1.6, 2.02],
      [-2.42, 0], [2.42, 0],
    ]) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.46, 0.12), mats.stainlessMachined);
      clip.position.set(cx, 0.02, cz);
      if (Math.abs(cx) > 2.0) clip.rotation.y = Math.PI / 2;
      clip.userData.noEdges = true;
      g.add(clip);
    }

    // Twin orthogonal 90-deg diversity ceramic chip antennas embossed with silver meander radiator traces!
    const antA = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 0.34, 0.68, 0.08, 0.02, 'y'),
      mats.ceramicAlumina
    );
    antA.position.set(-0.9, 0.48, 1.15);
    const traceA = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.06, 0.18), mats.silverElectrode);
    traceA.position.set(-0.9, 0.67, 1.15);
    traceA.userData.noEdges = true;

    const antB = new THREE.Mesh(
      createChamferedBoxGeo(0.68, 0.34, 2.2, 0.08, 0.02, 'y'),
      mats.ceramicAlumina
    );
    antB.position.set(1.45, 0.48, -0.35);
    const traceB = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 1.85), mats.silverElectrode);
    traceB.position.set(1.45, 0.67, -0.35);
    traceB.userData.noEdges = true;

    // Gold coaxial U.FL RF test jack (outer ground barrel + center signal pin) + 50-ohm gold microstrip lines!
    const uflRing = new THREE.Mesh(hiResTorus(0.32, 0.09, 8, 18), mats.goldPlating);
    uflRing.rotation.x = Math.PI / 2;
    uflRing.position.set(-0.85, 0.46, -0.65);
    const uflPin = new THREE.Mesh(hiResCyl(0.1, 0.1, 0.42, 12), mats.goldPlating);
    uflPin.position.set(-0.85, 0.46, -0.65);
    uflPin.userData.noEdges = true;
    const microstrip = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.07, 0.16), mats.goldPlating);
    microstrip.position.set(0.25, 0.35, -0.65);
    microstrip.userData.noEdges = true;
    g.add(shield, antA, traceA, antB, traceB, uflRing, uflPin, microstrip);

    parts.push(
      finalizeMicUltra31Part(
        'mc-uwb-24g-lossless-rx-2026',
        103,
        '#14b8a6',
        g,
        new THREE.Vector3(2.4, -6.2, 4.8),
        new THREE.Vector3(12, 44, 38),
        cp,
        0.2
      )
    );
  }

  // MC104. Sony ECM-M1 4ch Safety-Track (-20 dB Backup & Simultaneous Omni) Mux
  {
    const g = new THREE.Group();
    const board = makeTexturedHorizRect(4.8, 4.2, 0.38, 0.3, u.micAudioDsp32Float);
    // Central QFN-16 4ch crosspoint mux IC + 4 parallel impedance-matched audio routing rails!
    const muxIc = buildChipPackage({
      w: 1.45,
      d: 3.1,
      h: 0.42,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    muxIc.position.set(-1.18, 0.40, 0);

    for (let i = 0; i < 4; i++) {
      const rz = -1.2 + i * 0.8;
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(2.35, 0.24, 0.42, 0.06, 0.02, 'y'),
        i < 2 ? mats.cfaGreen : mats.goldPlating
      );
      rail.position.set(0.88, 0.32, rz);
      rail.userData.noEdges = true;
      g.add(rail);
      // Dedicated precision SMD -20 dB attenuator pad resistors on CH3 & CH4 safety tracks!
      if (i >= 2) {
        const attRes = buildSmdPassive(0.68, 0.36, 0.28, mats.matteBlackAnodized, mats.goldPlating, 'y');
        attRes.position.set(0.88, 0.56, rz);
        g.add(attRes);
      }
    }
    g.add(board, muxIc);

    parts.push(
      finalizeMicUltra31Part(
        'mc-safety-track-minus20db-mux',
        104,
        '#22c55e',
        g,
        new THREE.Vector3(6.2, -5.8, 4.2),
        new THREE.Vector3(32, 42, 34),
        cp,
        0.18
      )
    );
  }

  // MC105. Broadcast / YouTube -14 & -24 LUFS K-Weighted Real-Time Loudness DSP
  {
    const g = new THREE.Group();
    const pkg = buildChipPackage({
      w: 4.6,
      d: 4.2,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.solderBallSilver,
    });
    // Recessed LUFS meter faceplate + 6 sculpted stepped K-weighted loudness meter columns (-36 to -1 dBTP)!
    const face = makeTexturedHorizRect(3.9, 3.5, 0.1, 0.18, u.micLufsMeterDisplay, 0.01);
    face.position.y = 0.39;
    face.userData.noEdges = true;
    const barColors = [
      mats.cfaGreen,
      mats.cfaGreen,
      mats.vcWorkingFluidCyan,
      mats.goldPlating,
      mats.goldPlating,
      mats.cfaRed,
    ];
    for (let i = 0; i < 6; i++) {
      const h = 0.14 + i * 0.11;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.42, h, 2.25, 0.04, 0.01, 'y'),
        barColors[i]
      );
      bar.position.set(-1.35 + i * 0.54, 0.44 + h * 0.5, 0);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    g.add(pkg, face);

    parts.push(
      finalizeMicUltra31Part(
        'mc-lufs-broadcast-loudness-dsp',
        105,
        '#f59e0b',
        g,
        new THREE.Vector3(0, -7.2, 3.6),
        new THREE.Vector3(0, -38, 40),
        cp,
        0.18
      )
    );
  }

  // MC106. 30-100 kHz IBIS Ultrasonic PWM Anti-Aliasing Steep Analog/Digital Filter
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect(4.8, 3.8, 0.36, 0.28, u.micAudioMainPcb);
    g.add(pcb);
    // 3rd-order elliptic Cauer LC ladder: 3 ferrite-core copper-wound toroid inductors + 4 C0G notch caps!
    for (let i = -1; i <= 1; i++) {
      const ix = i * 1.38;
      const fCore = new THREE.Mesh(hiResTorus(0.42, 0.13, 10, 20), mats.ferriteInductor);
      fCore.rotation.x = Math.PI / 2;
      fCore.position.set(ix, 0.44, 0.72);
      fCore.userData.noEdges = true;
      for (let w = 0; w < 6; w++) {
        const a = (w / 6) * Math.PI * 2;
        const turn = new THREE.Mesh(hiResTorus(0.16, 0.04, 6, 12), mats.copperCoil);
        turn.position.set(ix + Math.cos(a) * 0.42, 0.44, 0.72 + Math.sin(a) * 0.42);
        turn.rotation.y = -a;
        turn.userData.noEdges = true;
        g.add(turn);
      }
      g.add(fCore);
    }
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(0.86, 0.48, 0.46, mats.smdCeramic, mats.solderBallSilver, 'y');
      cap.position.set(-1.62 + i * 1.08, 0.42, -0.82);
      g.add(cap);
    }
    // Twin gold differential microstrip signal rails along center
    for (const tz of [-0.14, 0.14]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.06, 0.1), mats.goldPlating);
      rail.position.set(0, 0.21, tz);
      rail.userData.noEdges = true;
      g.add(rail);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-ultrasonic-shutter-vcm-filter',
        106,
        '#ea580c',
        g,
        new THREE.Vector3(-7.6, -7.2, 1.4),
        new THREE.Vector3(-38, -46, 20),
        cp,
        0.18
      )
    );
  }

  // MC107. <0.5 Hz Subsonic DC-Offset Servo Integrator (Preserving Full Headroom)
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect(4.6, 3.8, 0.36, 0.28, u.micAudioMainPcb);
    // Precision chopper op-amp QFN-16 + beveled WIMA/PPS yellow film integrator cap + 3x 10 MOhm servo resistors!
    const opamp = buildChipPackage({
      w: 1.75,
      d: 1.75,
      h: 0.48,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    opamp.position.set(-1.08, 0.42, -0.25);

    const filmCap = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.78, 2.25, 0.14, 0.04, 'y'),
      mats.tantalumCapYellow
    );
    filmCap.position.set(1.12, 0.56, 0);
    for (const lz of [-0.72, 0.72]) {
      const leadTab = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.22), mats.copperCoil);
      leadTab.position.set(1.12, 0.22, lz);
      leadTab.userData.noEdges = true;
      g.add(leadTab);
    }
    for (let i = 0; i < 3; i++) {
      const r10m = buildSmdPassive(0.68, 0.34, 0.26, mats.matteBlackAnodized, mats.goldPlating, 'y');
      r10m.position.set(-1.72 + i * 0.72, 0.32, 1.32);
      g.add(r10m);
    }
    // Gold Kelvin guard trace framing high-impedance inverting summing node
    const guardTrace = new THREE.Mesh(hiResTorus(0.95, 0.045, 6, 22), mats.goldPlating);
    guardTrace.rotation.x = Math.PI / 2;
    guardTrace.position.set(-1.08, 0.21, -0.25);
    guardTrace.userData.noEdges = true;
    g.add(pcb, opamp, filmCap, guardTrace);

    parts.push(
      finalizeMicUltra31Part(
        'mc-dc-servo-subsonic-integrator',
        107,
        '#eab308',
        g,
        new THREE.Vector3(7.6, -7.2, 1.4),
        new THREE.Vector3(38, -46, 20),
        cp,
        0.18
      )
    );
  }

  // MC108. Spread-Spectrum PDM / TDM Audio Clock (Zero CMOS Sensor Banding EMI)
  {
    const g = new THREE.Group();
    // Alumina ceramic base with 4 gold castellations + seam-welded 24.576 MHz gold lid + exposed AT-cut quartz blank!
    const ceramicBase = new THREE.Mesh(
      createChamferedBoxGeo(4.3, 0.42, 3.3, 0.22, 0.04, 'y'),
      mats.ceramicAlumina
    );
    ceramicBase.position.y = -0.22;
    for (const [cx, cz] of [
      [-2.05, -1.55], [2.05, -1.55], [-2.05, 1.55], [2.05, 1.55],
    ]) {
      const cast = new THREE.Mesh(hiResCyl(0.22, 0.22, 0.48, 12), mats.goldPlating);
      cast.position.set(cx, -0.22, cz);
      cast.userData.noEdges = true;
      g.add(cast);
    }

    const lidGeo = createChamferedBoxGeo(4.1, 0.48, 3.1, 0.2, 0.04, 'y');
    applyPlanarUVs(lidGeo, 4.1, 3.1, 'xz');
    const xtalCan = new THREE.Mesh(lidGeo, u.micQuartzTcxoLid);
    xtalCan.position.y = 0.20;
    const goldRim = makeHiResHorizPlate(
      createFrameShape(4.4, 3.4, 0.26, 3.8, 2.8, 0.2),
      0.18,
      mats.goldPlating,
      0.03,
      2,
      16
    );
    goldRim.position.y = -0.44;

    // Exposed AT-cut quartz blank window embossed with silver keyhole excitation electrode + flanking SS-PLL die!
    const quartzCore = new THREE.Mesh(
      createChamferedBoxGeo(2.05, 0.2, 1.55, 0.08, 0.02, 'y'),
      mats.quartzOlpf
    );
    quartzCore.position.set(-0.62, 0.52, 0);
    const keyhole = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.06, 18), mats.silverElectrode);
    keyhole.position.set(-0.62, 0.64, 0);
    keyhole.userData.noEdges = true;
    const pllDie = buildChipPackage({
      w: 1.15,
      d: 1.45,
      h: 0.28,
      style: 'qfn',
      pinsPerSide: 3,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      axis: 'y',
    });
    pllDie.position.set(1.18, 0.54, 0);
    g.add(ceramicBase, xtalCan, goldRim, quartzCore, keyhole, pllDie);

    parts.push(
      finalizeMicUltra31Part(
        'mc-pdm-tdm-clk-spread-spectrum',
        108,
        '#06b6d4',
        g,
        new THREE.Vector3(-5.8, -5.2, -7.8),
        new THREE.Vector3(-24, 36, -40),
        cp,
        0.18
      )
    );
  }

  // MC109. Real-Time Audio Anomaly Alert (Wind / Clip / Cable-Fault) & EVF Meter Hook
  {
    const g = new THREE.Group();
    const carrier = makeTexturedHorizRect(4.8, 3.8, 0.4, 0.3, u.micLufsMeterDisplay);
    const monitorChip = buildChipPackage({
      w: 2.2,
      d: 2.0,
      h: 0.48,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    monitorChip.position.set(-0.92, 0.42, -0.1);

    // 3 status alert indicator domes (Green OK / Amber WIND / Crimson CLIP) in stainless bezel collars + 3 wirebonds!
    const ledColors = [mats.cfaGreen, mats.goldPlating, mats.cfaRed];
    for (let i = 0; i < 3; i++) {
      const lz = -0.95 + i * 0.95;
      const bezel = new THREE.Mesh(hiResTorus(0.36, 0.08, 8, 18), mats.stainlessMachined);
      bezel.rotation.x = Math.PI / 2;
      bezel.position.set(1.38, 0.34, lz);
      bezel.userData.noEdges = true;
      const led = new THREE.Mesh(hiResSphere(0.30, 14, 10), ledColors[i]);
      led.position.set(1.38, 0.46, lz);
      led.userData.noEdges = true;
      const bond = buildGoldWirebondLoop(
        new THREE.Vector3(0.18, 0.56, lz * 0.65),
        new THREE.Vector3(1.06, 0.34, lz),
        0.4,
        0.05,
        mats.goldPlating
      );
      g.add(bezel, led, bond);
    }
    // Front gold EVF OSD telemetry edge strip
    const osdStrip = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.1, 0.28), mats.goldPlating);
    osdStrip.position.set(0, 0.24, 1.56);
    osdStrip.userData.noEdges = true;
    g.add(carrier, monitorChip, osdStrip);

    parts.push(
      finalizeMicUltra31Part(
        'mc-headphone-sidetone-eq-monitor',
        109,
        '#10b981',
        g,
        new THREE.Vector3(5.8, -5.2, -7.8),
        new THREE.Vector3(24, 36, -40),
        cp,
        0.18
      )
    );
  }

  // MC110. 2026 Real-Time HRTF (Head-Related Transfer Function) 3D Binaural Renderer
  {
    const g = new THREE.Group();
    const base = makeTexturedHorizRect(4.8, 4.4, 0.42, 0.36, u.micBinauralHrtfMap);
    // Sculpted 3D KEMAR acoustic head sphere flanked by twin L/R gold pinna-ear receiver cups!
    const sphereCore = new THREE.Mesh(hiResSphere(0.72, 20, 16), mats.evfDichroicMirror);
    sphereCore.position.y = 1.15;
    for (const side of [-1, 1]) {
      const pinna = new THREE.Mesh(hiResTorus(0.26, 0.08, 8, 18), mats.goldPlating);
      pinna.rotation.y = Math.PI / 2;
      pinna.position.set(side * 0.76, 1.15, 0);
      pinna.userData.noEdges = true;
      const canal = new THREE.Mesh(hiResCyl(0.12, 0.12, 0.22, 12), mats.matteBlackAnodized);
      canal.rotation.z = Math.PI / 2;
      canal.position.set(side * 0.72, 1.15, 0);
      canal.userData.noEdges = true;
      g.add(pinna, canal);
    }

    // Orthogonal cyan azimuth & gold elevation HRIR orbit rings studded with 8 instanced spatial node spheres!
    const azRing = new THREE.Mesh(hiResTorus(1.44, 0.085, 10, 32), mats.vcWorkingFluidCyan);
    azRing.rotation.x = Math.PI / 2;
    azRing.position.y = 1.15;
    const elRing = new THREE.Mesh(hiResTorus(1.44, 0.085, 10, 32), mats.goldPlating);
    elRing.position.y = 1.15;

    const nodeGeo = hiResSphere(0.14, 10, 8);
    const nodes = new THREE.InstancedMesh(nodeGeo, mats.goldPlating, 8);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      dm.position.set(Math.cos(a) * 1.44, 1.15, Math.sin(a) * 1.44);
      dm.updateMatrix();
      nodes.setMatrixAt(i, dm.matrix);
    }
    nodes.instanceMatrix.needsUpdate = true;
    nodes.userData.noEdges = true;

    // Dual-ear HRIR convolution DSP micro-tile seated on substrate pedestal
    const convTile = makeTexturedHorizRect(2.1, 1.35, 0.2, 0.14, u.micAiNpuDie, 0.02);
    convTile.position.set(0, 0.30, 1.25);
    g.add(base, sphereCore, azRing, elRing, nodes, convTile);

    parts.push(
      finalizeMicUltra31Part(
        'mc-anechoic-3d-hrtf-binaural-2026',
        110,
        '#c026d3',
        g,
        new THREE.Vector3(0, -6.6, -8.4),
        new THREE.Vector3(0, -50, -36),
        cp,
        0.18
      )
    );
  }

  return parts;
}
