import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  createVoiceCoilGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildSmdPassive,
  buildTantalumCap,
  createChamferedBoxGeo,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizePart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  integratedExplodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  options?: { ibisMovable?: boolean; ultrasonicElement?: boolean; edgeOpacity?: number }
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(
    group,
    clippingPlanes,
    26,
    options?.edgeOpacity ?? 0.2
  );

  return {
    id,
    subsystem: 'sensor',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    ibisMovable: options?.ibisMovable,
    ultrasonicElement: options?.ultrasonicElement,
  };
}

/**
 * Build ALL 40 macro watchmaker-grade CAD sub-assemblies of a 2024-2026 Flagship
 * Full-Frame 3-Wafer Stacked Global Shutter Sensor & 8.5-Stop 5-Axis IBIS Unit (S01–S40),
 * paired with 50 standalone-only OEM/next-gen parts (S41–S90) for 90 parts total.
 */
export function buildMacroSensorParts(mats: MaterialLibrary, _includeStandalone = true): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const dummy = new THREE.Object3D();

  // =========================================================================
  // S01. Optical Aperture Mask & Dust-Seal Bezel (z = +7.80 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Main CNC-machined matte-black anodized frame with 4 M1.4 screw bores + 2 asymmetric datum dowel holes
    const bezelShape = createFrameShape(50.0, 40.0, 3.0, 38.0, 26.0, 0.8);
    addCircleHoles(bezelShape, [
      [-21.5, 16.5, 1.3],
      [21.5, 16.5, 1.3],
      [-21.5, -16.5, 1.3],
      [21.5, -16.5, 1.3],
      [-22.2, 0.0, 0.85], // Primary circular datum dowel hole
      [22.2, 4.2, 0.85],  // Asymmetric poke-yoke datum hole
    ]);
    const bezelGeo = extrudeCentered(bezelShape, 1.15, 0.14, 0.14, 24);
    applyBoxUVs(bezelGeo, 14.0);
    g.add(new THREE.Mesh(bezelGeo, mats.ultra.sensorVelvetBaffle));

    // 3-tier sawtooth knife-edge anti-reflection light-trap ribs sloping down to the 36.6x24.6mm aperture
    const baffleTiers: Array<[number, number, number, number, number, number]> = [
      [40.6, 28.6, 38.2, 26.2, 0.36, 0.52],
      [39.4, 27.4, 37.2, 25.2, 0.32, 0.30],
      [38.2, 26.2, 36.6, 24.6, 0.28, 0.08],
    ];
    for (const [ow, oh, iw, ih, th, tz] of baffleTiers) {
      const bShape = createFrameShape(ow, oh, 0.8, iw, ih, 0.35);
      const bGeo = extrudeCentered(bShape, th, 0.05, 0.06, 16);
      applyBoxUVs(bGeo, 10.0);
      const bMesh = new THREE.Mesh(bGeo, mats.ultra.sensorVelvetBaffle);
      bMesh.position.z = tz;
      g.add(bMesh);
    }

    // Stepped stainless precision datum locating dowels inside asymmetric poke-yoke bores
    for (const [dx, dy] of [
      [-22.2, 0.0],
      [22.2, 4.2],
    ] as Array<[number, number]>) {
      const dowel = new THREE.Mesh(
        hiResCyl(0.76, 0.82, 1.55, 14).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      dowel.position.set(dx, dy, -0.15);
      dowel.userData.noEdges = true;
      g.add(dowel);
    }

    // Perimeter stiffening ridge & dual-bead closed-cell EPDM compression seal on rear (-Z)
    const gasketOuter = new THREE.Mesh(
      extrudeCentered(createFrameShape(47.4, 37.4, 2.4, 44.8, 34.8, 1.9), 0.42, 0.05, 0.05, 18),
      mats.epdmGasket
    );
    gasketOuter.position.z = -0.76;
    const gasketInner = new THREE.Mesh(
      extrudeCentered(createFrameShape(43.2, 33.2, 1.6, 39.4, 27.4, 1.0), 0.36, 0.04, 0.04, 16),
      mats.epdmGasket
    );
    gasketInner.position.z = -0.74;
    g.add(gasketOuter, gasketInner);

    // 4 countersunk stainless M1.4 screws with brass threaded boss inserts & flanged collars
    for (const [sx, sy] of [
      [-21.5, 16.5],
      [21.5, 16.5],
      [-21.5, -16.5],
      [21.5, -16.5],
    ] as Array<[number, number]>) {
      const brassInsert = new THREE.Mesh(
        hiResCyl(1.72, 1.72, 1.24, 14).rotateX(Math.PI / 2),
        mats.brassGear
      );
      brassInsert.position.set(sx, sy, 0.02);
      brassInsert.userData.noEdges = true;
      const collar = new THREE.Mesh(
        hiResCyl(2.05, 2.05, 0.16, 16).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      collar.position.set(sx, sy, 0.56);
      collar.userData.noEdges = true;
      const screw = createPrecisionScrew(1.55, 0.55, 1.4, mats.stainlessMachined);
      screw.position.set(sx, sy, 0.55);
      g.add(brassInsert, collar, screw);
    }

    parts.push(
      finalizePart(
        'aperture-mask',
        1,
        '#252932',
        g,
        new THREE.Vector3(0, 0, 7.8),
        new THREE.Vector3(0, 0, 82),
        new THREE.Vector3(0, 0, 12.2),
        cp,
        { ibisMovable: true, edgeOpacity: 0.25 }
      )
    );
  }

  // =========================================================================
  // S02. Ultrasonic Dust Reduction Glass Plate (SSWF) (z = +6.20 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision 0.55mm low-iron fluorophosphate glass plate with ground 45-deg optical bevels
    const glassShape = createRoundedRectShape(43.2, 31.2, 0.6);
    const glassMesh = new THREE.Mesh(
      extrudeCentered(glassShape, 0.55, 0.07, 0.07, 14),
      mats.sswfGlass
    );
    glassMesh.userData.edgeOpacity = 0.42;
    g.add(glassMesh);

    // Front multi-layer AR / ITO / Fluorine optical interference film with OFB-01-187 corner reticle
    const arCoatGeo = createChamferedBoxGeo(42.4, 30.4, 0.04, 0.45, 0.01, 'z');
    applyPlanarUVs(arCoatGeo, 42.4, 30.4, 'xy');
    const arCoatMesh = new THREE.Mesh(arCoatGeo, mats.ultra.sensorOpticalFilterCoating);
    arCoatMesh.position.z = 0.305;
    arCoatMesh.userData.noEdges = true;
    g.add(arCoatMesh);

    // Ground frosted glass optical perimeter edge collar
    const groundRim = new THREE.Mesh(
      extrudeCentered(createFrameShape(43.25, 31.25, 0.62, 42.3, 30.3, 0.48), 0.46, 0.02, 0.02, 12),
      mats.quartzEdge
    );
    groundRim.userData.noEdges = true;
    g.add(groundRim);

    // Front transparent ITO + Ag-frit perimeter antistatic drain bus + corner wrap electrodes
    const itoFrame = createFrameShape(43.0, 31.0, 0.55, 40.4, 28.4, 0.3);
    const itoMesh = new THREE.Mesh(
      extrudeCentered(itoFrame, 0.06, 0, 0, 12),
      mats.silverElectrode
    );
    itoMesh.position.z = 0.29;
    g.add(itoMesh);

    for (const sx of [-1, 1]) {
      const wrapTab = new THREE.Mesh(
        createChamferedBoxGeo(1.1, 3.6, 0.64, 0.15, 0.04, 'z'),
        mats.goldPlating
      );
      wrapTab.position.set(sx * 21.45, 7.2, 0);
      wrapTab.userData.noEdges = true;
      g.add(wrapTab);
    }

    // 4 stepped silicone damper cushions placed at flexural standing-wave nodal lines (~22.4% from edge)
    for (const [dx, dy] of [
      [-14.2, 14.95],
      [14.2, 14.95],
      [-21.2, -10.8],
      [21.2, -10.8],
    ] as Array<[number, number]>) {
      const horiz = Math.abs(dy) > 13;
      const damper = new THREE.Mesh(
        createChamferedBoxGeo(horiz ? 3.8 : 1.5, horiz ? 1.35 : 3.2, 0.92, 0.25, 0.08, 'z'),
        mats.epdmGasket
      );
      damper.position.set(dx, dy, -0.06);
      g.add(damper);
    }

    parts.push(
      finalizePart(
        'sswf-piezo',
        2,
        '#95c8e8',
        g,
        new THREE.Vector3(0, 0, 6.2),
        new THREE.Vector3(0, 0, 72),
        new THREE.Vector3(0, 0, 7.6),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.35 }
      )
    );
  }

  // =========================================================================
  // S03. SSWF Ultrasonic Nodal Suspension Holder & CuBe2 Clips (z = +5.75 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision glass-filled LCP damped suspension frame with corner datum bores & stainless guide pins
    const holderShape = createFrameShape(46.2, 34.4, 1.8, 41.0, 29.0, 0.7);
    addCircleHoles(holderShape, [
      [-21.5, 15.2, 0.75],
      [21.5, 15.2, 0.75],
      [-21.5, -15.2, 0.75],
      [21.5, -15.2, 0.75],
    ]);
    const holderGeo = extrudeCentered(holderShape, 0.46, 0.05, 0.05, 18);
    applyBoxUVs(holderGeo, 14.0);
    const holderFrame = new THREE.Mesh(holderGeo, mats.ultra.sensorVelvetBaffle);
    g.add(holderFrame);

    // 4 CNC-turned stainless guide bushings seated in corner alignment holes
    for (const [hx, hy] of [
      [-21.5, 15.2],
      [21.5, 15.2],
      [-21.5, -15.2],
      [21.5, -15.2],
    ] as Array<[number, number]>) {
      const bush = new THREE.Mesh(
        hiResCyl(1.12, 1.12, 0.56, 12).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      bush.position.set(hx, hy, 0);
      bush.userData.noEdges = true;
      g.add(bush);
    }

    // 4 stepped low-durometer pink silicone nodal isolation bosses (aligned to 35-42kHz standing-wave nodes)
    for (const [nx, ny] of [
      [-14.2, 15.6],
      [14.2, 15.6],
      [-14.2, -15.6],
      [14.2, -15.6],
    ] as Array<[number, number]>) {
      const padBase = new THREE.Mesh(
        createChamferedBoxGeo(5.4, 1.85, 0.56, 0.3, 0.06, 'z'),
        mats.thermalPadPink
      );
      padBase.position.set(nx, ny, 0.05);
      const padRib = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.75, 0.24, 0.12, 0.03, 'z'),
        mats.thermalPadPink
      );
      padRib.position.set(nx, ny, 0.34);
      padRib.userData.noEdges = true;
      g.add(padBase, padRib);
    }

    // Dual stamped bent-cantilever CuBe2 micro hold-down spring clips with riveted anchor tabs & contact dimples
    for (const sx of [-1, 1]) {
      const anchorGeo = createChamferedBoxGeo(1.75, 11.2, 0.26, 0.2, 0.03, 'z');
      applyBoxUVs(anchorGeo, 8.0);
      const anchor = new THREE.Mesh(anchorGeo, mats.ultra.sensorSusSpringSteel);
      anchor.position.set(sx * 22.1, 2.0, 0.32);
      // Bent inward CuBe2 spring arm pressing gently onto glass rim
      const arm = new THREE.Mesh(
        createChamferedBoxGeo(1.9, 3.2, 0.18, 0.15, 0.02, 'z'),
        mats.beCuSpring
      );
      arm.position.set(sx * 20.9, 2.0, 0.44);
      arm.rotation.y = sx * 0.16;
      const dimple = new THREE.Mesh(hiResSphere(0.32, 10, 8), mats.goldPlating);
      dimple.position.set(sx * 20.25, 2.0, 0.48);
      dimple.userData.noEdges = true;
      for (const ry of [-3.4, 7.4]) {
        const rivet = new THREE.Mesh(
          hiResCyl(0.42, 0.42, 0.36, 12).rotateX(Math.PI / 2),
          mats.titaniumRivet
        );
        rivet.position.set(sx * 22.1, ry, 0.34);
        rivet.userData.noEdges = true;
        g.add(rivet);
      }
      g.add(anchor, arm, dimple);
    }

    // Contoured lower electrostatic dust-catch trough with front/rear containment lips
    const troughBase = new THREE.Mesh(
      createChamferedBoxGeo(36.8, 1.45, 0.56, 0.2, 0.05, 'z'),
      mats.damperElastomer
    );
    troughBase.position.set(0, -16.8, -0.14);
    const troughLip = new THREE.Mesh(
      new THREE.BoxGeometry(36.4, 0.36, 0.26),
      mats.matteBlackAnodized
    );
    troughLip.position.set(0, -16.1, 0.14);
    troughLip.userData.noEdges = true;
    g.add(troughBase, troughLip);

    parts.push(
      finalizePart(
        'sensor-sswf-holder',
        3,
        '#f472b6',
        g,
        new THREE.Vector3(0, 0, 5.75),
        new THREE.Vector3(0, 0, 62),
        new THREE.Vector3(0, 0, 4.2),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S04. Multi-Layer PZT Piezoelectric Ultrasonic Actuator Bar (z = +6.88 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Co-fired multilayer sintered PZT-5H ceramic bar with stratified stack texture (US8966704)
    const pztGeo = createChamferedBoxGeo(36.0, 2.8, 0.9, 0.22, 0.07, 'z');
    applyBoxUVs(pztGeo, 12.0);
    const pztBar = new THREE.Mesh(pztGeo, mats.ultra.sensorPztStack);
    g.add(pztBar);

    // Dual symmetric fired Ag-Ni split front drive electrodes (anti-phase standing wave) + polarity dots
    for (const sx of [-1, 1]) {
      const elec = new THREE.Mesh(
        createChamferedBoxGeo(16.2, 2.32, 0.13, 0.14, 0.02, 'z'),
        mats.silverElectrode
      );
      elec.position.set(sx * 8.6, 0, 0.48);
      g.add(elec);

      // Fired solder landing fillets + protective strain-relief epoxy bead on outer ends
      const solder = new THREE.Mesh(hiResSphere(0.46, 10, 8), mats.solderBallSilver);
      solder.scale.set(1.5, 1.1, 0.42);
      solder.position.set(sx * 15.6, 0, 0.56);
      solder.userData.noEdges = true;
      const polDot = new THREE.Mesh(
        hiResCyl(0.36, 0.36, 0.06, 10).rotateX(Math.PI / 2),
        sx > 0 ? mats.mountRedIndexDot : mats.mountThreadLockBlue
      );
      polDot.position.set(sx * 2.4, 0.65, 0.55);
      polDot.userData.noEdges = true;
      g.add(solder, polDot);
    }

    // Rear wrap-around common ground electrode + rigid acoustic-impedance-matched epoxy bond film
    const gndElec = new THREE.Mesh(
      createChamferedBoxGeo(35.0, 2.25, 0.10, 0.12, 0.02, 'z'),
      mats.goldPlating
    );
    gndElec.position.z = -0.46;
    const bondFilm = new THREE.Mesh(
      new THREE.BoxGeometry(35.4, 2.55, 0.08),
      mats.opticalCementClear
    );
    bondFilm.position.z = -0.53;
    bondFilm.userData.noEdges = true;
    g.add(gndElec, bondFilm);

    // Sculpted high-voltage polyimide flex lead (flat rectangular cross-section ribbon + copper traces + ZIF pins)
    const leadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(16.2, 0, 0.52),
      new THREE.Vector3(21.2, 0, 0.18),
      new THREE.Vector3(23.5, 0.7, -1.05),
      new THREE.Vector3(24.0, 2.3, -2.25),
    ]);
    const leadGeo = markHiRes(new THREE.TubeGeometry(leadCurve, 24, 0.42, 8, false));
    leadGeo.scale(1, 0.65, 1);
    const leadRibbon = new THREE.Mesh(leadGeo, mats.polyimideFpc);
    const leadEndPlug = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 2.2, 0.72, 0.18, 0.06, 'z'),
      mats.zifIvoryPlastic
    );
    leadEndPlug.position.set(24.0, 2.55, -2.25);
    for (const py of [-0.45, 0.45]) {
      const zifPin = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.42, 0.18), mats.goldPlating);
      zifPin.position.set(24.0, 2.55 + py, -2.58);
      zifPin.userData.noEdges = true;
      g.add(zifPin);
    }
    g.add(leadRibbon, leadEndPlug);

    parts.push(
      finalizePart(
        'sensor-pzt-bar',
        4,
        '#eab308',
        g,
        new THREE.Vector3(0, -14.1, 6.88),
        new THREE.Vector3(0, -24, 72),
        new THREE.Vector3(0, -36, 6.2),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.3 }
      )
    );
  }

  // =========================================================================
  // S05. Front Birefringent Quartz OLPF (H-Split & ±45° Layer, z = +4.95 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision synthetic quartz optical low-pass plate with 45-deg ground optical chamfers
    const coreShape = createRoundedRectShape(40.2, 28.2, 0.4);
    const corePlate = new THREE.Mesh(
      extrudeCentered(coreShape, 0.56, 0.06, 0.06, 14),
      mats.quartzOlpf
    );
    corePlate.userData.edgeOpacity = 0.42;
    g.add(corePlate);

    // Front birefringent anti-reflection film with crystal optic-axis 45° laser micro-reticle
    const coatGeo = createChamferedBoxGeo(39.8, 27.8, 0.04, 0.35, 0.01, 'z');
    applyPlanarUVs(coatGeo, 39.8, 27.8, 'xy');
    const coatMesh = new THREE.Mesh(coatGeo, mats.ultra.sensorOpticalFilterCoating);
    coatMesh.position.z = 0.31;
    coatMesh.userData.noEdges = true;
    g.add(coatMesh);

    // Dual optical-ground quartz laminate edge frames + Sumi-nuri edge absorption collar
    for (const lz of [0.16, -0.16]) {
      const seamFrame = createFrameShape(40.85, 28.85, 0.5, 39.75, 27.75, 0.32);
      const seamMesh = new THREE.Mesh(
        extrudeCentered(seamFrame, 0.22, 0.02, 0.02, 12),
        mats.quartzEdge
      );
      seamMesh.position.z = lz;
      seamMesh.userData.edgeOpacity = 0.36;
      g.add(seamMesh);
    }

    // Crystal-axis orientation chamfer tab + etched 45-deg optical splitting datum tick
    const notch = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 0.58, 0.68, 0.08, 0.03, 'z'),
      mats.matteBlackAnodized
    );
    notch.position.set(19.4, 14.32, 0);
    const axisTick = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.18, 0.06), mats.goldPlating);
    axisTick.position.set(18.0, 13.6, 0.33);
    axisTick.rotation.z = Math.PI / 4;
    axisTick.userData.noEdges = true;
    g.add(notch, axisTick);

    parts.push(
      finalizePart(
        'olpf-16pt',
        5,
        '#79b7cf',
        g,
        new THREE.Vector3(0, 0, 4.95),
        new THREE.Vector3(0, 0, 52),
        new THREE.Vector3(0, 0, 0.55),
        cp,
        { ibisMovable: true, edgeOpacity: 0.34 }
      )
    );
  }

  // =========================================================================
  // S06. Zero-Order λ/4 Quarter-Wave Plate & Rear V-Split Quartz OLPF (z = +4.30 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Compound laminated optical assembly: front λ/4 dichroic waveplate + rear V-split quartz plate
    const qwpShape = createRoundedRectShape(40.2, 28.2, 0.4);
    const qwpFront = new THREE.Mesh(
      extrudeCentered(qwpShape, 0.26, 0.04, 0.04, 12),
      mats.evfDichroicMirror
    );
    qwpFront.position.z = 0.15;
    qwpFront.userData.edgeOpacity = 0.42;

    const qwpRear = new THREE.Mesh(
      extrudeCentered(qwpShape, 0.28, 0.04, 0.04, 12),
      mats.quartzOlpf
    );
    qwpRear.position.z = -0.14;
    qwpRear.userData.edgeOpacity = 0.38;

    // Inter-plate OCA lamination seam bevel ring
    const ocaSeam = new THREE.Mesh(
      extrudeCentered(createFrameShape(40.5, 28.5, 0.45, 39.8, 27.8, 0.36), 0.06, 0.01, 0.01, 10),
      mats.opticalCementClear
    );
    ocaSeam.userData.noEdges = true;
    g.add(qwpFront, qwpRear, ocaSeam);

    // Optical-ground perimeter edge ring sealing the compound crystal sandwich
    const rimShape = createFrameShape(40.9, 28.9, 0.5, 39.6, 27.6, 0.32);
    const rimMesh = new THREE.Mesh(
      extrudeCentered(rimShape, 0.56, 0.03, 0.03, 12),
      mats.quartzEdge
    );
    g.add(rimMesh);

    // Gold crystal fast-axis registration tab + orthogonal V-split alignment marker
    const axisTab = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 0.58, 0.64, 0.1, 0.03, 'z'),
      mats.goldPlating
    );
    axisTab.position.set(-19.1, 14.35, 0);
    const fastTick = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.2, 0.06), mats.goldPlating);
    fastTick.position.set(-19.1, 12.8, 0.31);
    fastTick.userData.noEdges = true;
    g.add(axisTab, fastTick);

    parts.push(
      finalizePart(
        'sensor-qwp-plate',
        6,
        '#a855f7',
        g,
        new THREE.Vector3(0, 0, 4.3),
        new THREE.Vector3(0, 0, 42),
        new THREE.Vector3(0, 0, -4.8),
        cp,
        { ibisMovable: true, edgeOpacity: 0.34 }
      )
    );
  }

  // =========================================================================
  // S07. Hybrid Phosphate IR-Absorption + Dichroic IR/UV Cut Filter (z = +3.25 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Deep cyan-blue Cu²⁺-doped Hoya CM500 phosphate IR-absorption glass substrate
    const irShape = createRoundedRectShape(40.0, 28.0, 0.45);
    const irMesh = new THREE.Mesh(
      extrudeCentered(irShape, 0.64, 0.06, 0.06, 12),
      mats.irCutGlass
    );
    irMesh.position.z = -0.04;
    irMesh.userData.edgeOpacity = 0.48;
    g.add(irMesh);

    // Front 42-layer dielectric hot-mirror dichroic reflection film stratum + coated reticle sheen
    const dichroicFilm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(39.6, 27.6, 0.4), 0.08, 0.01, 0.01, 10),
      mats.nanoArIridescent
    );
    dichroicFilm.position.z = 0.32;
    dichroicFilm.userData.noEdges = true;
    g.add(dichroicFilm);

    // Precision Sumi-nuri velvet-blackened perimeter carrier frame with corner adhesive relief pockets
    const spacerShape = createFrameShape(42.2, 30.2, 0.8, 40.05, 28.05, 0.45);
    const spacerGeo = extrudeCentered(spacerShape, 0.78, 0.05, 0.05, 14);
    applyBoxUVs(spacerGeo, 12.0);
    g.add(new THREE.Mesh(spacerGeo, mats.ultra.sensorVelvetBaffle));

    for (const [ax, ay] of [
      [-20.4, 14.4],
      [20.4, 14.4],
      [-20.4, -14.4],
      [20.4, -14.4],
    ] as Array<[number, number]>) {
      const pocket = new THREE.Mesh(
        hiResCyl(0.48, 0.48, 0.82, 10).rotateX(Math.PI / 2),
        mats.epdmGasket
      );
      pocket.position.set(ax, ay, 0);
      pocket.userData.noEdges = true;
      g.add(pocket);
    }
    // Orientation index gold dot on top-left corner
    const idxDot = new THREE.Mesh(
      hiResCyl(0.42, 0.42, 0.08, 10).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    idxDot.position.set(-19.2, 14.55, 0.41);
    idxDot.userData.noEdges = true;
    g.add(idxDot);

    parts.push(
      finalizePart(
        'ir-cut-filter',
        7,
        '#38b2da',
        g,
        new THREE.Vector3(0, 0, 3.25),
        new THREE.Vector3(0, 0, 32),
        new THREE.Vector3(0, 0, -9.75),
        cp,
        { ibisMovable: true, edgeOpacity: 0.36 }
      )
    );
  }

  // =========================================================================
  // S08. Low-Alpha AR Cover Glass & Kovar Hermetic Seal Ring (z = +2.05 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Low-alpha borosilicate optical window with 45-deg precision ground edge
    const winShape = createRoundedRectShape(43.8, 33.4, 0.5);
    const winMesh = new THREE.Mesh(
      extrudeCentered(winShape, 0.52, 0.06, 0.06, 12),
      mats.coverGlass
    );
    winMesh.userData.edgeOpacity = 0.38;
    g.add(winMesh);

    // Brazed Kovar (Fe-29Ni-17Co) CTE-matched hermetic seal frame with brushed metallic texture
    const sealShape = createFrameShape(47.4, 36.8, 1.4, 42.2, 31.8, 0.6);
    const sealGeo = extrudeCentered(sealShape, 0.62, 0.07, 0.07, 16);
    applyBoxUVs(sealGeo, 14.0);
    const sealMesh = new THREE.Mesh(sealGeo, mats.ultra.sensorSoftIronYoke);
    sealMesh.position.z = -0.1;
    g.add(sealMesh);

    // Laser parallel-seam weld track ridge + 4 corner laser start/stop weld dimples
    const weldTrack = new THREE.Mesh(
      extrudeCentered(createFrameShape(46.8, 36.2, 1.2, 45.4, 34.8, 1.0), 0.12, 0.02, 0.02, 14),
      mats.stainlessMachined
    );
    weldTrack.position.z = 0.22;
    weldTrack.userData.noEdges = true;
    g.add(weldTrack);

    for (const [wx, wy] of [
      [-22.6, 17.3],
      [22.6, 17.3],
      [-22.6, -17.3],
      [22.6, -17.3],
    ] as Array<[number, number]>) {
      const weldDot = new THREE.Mesh(
        hiResCyl(0.45, 0.45, 0.16, 10).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      weldDot.position.set(wx, wy, 0.25);
      weldDot.userData.noEdges = true;
      g.add(weldDot);
    }

    // Inner Au-Sn eutectic solder wetting lip framing the cover glass
    const goldLipShape = createFrameShape(44.1, 33.7, 0.7, 42.3, 31.9, 0.6);
    const goldLip = new THREE.Mesh(
      extrudeCentered(goldLipShape, 0.16, 0.02, 0.02, 12),
      mats.goldPlating
    );
    goldLip.position.z = 0.24;
    g.add(goldLip);

    parts.push(
      finalizePart(
        'cover-glass',
        8,
        '#8c99a8',
        g,
        new THREE.Vector3(0, 0, 2.05),
        new THREE.Vector3(0, 0, 22),
        new THREE.Vector3(0, 0, -14.55),
        cp,
        { ibisMovable: true, edgeOpacity: 0.32 }
      )
    );
  }

  // =========================================================================
  // S09. Wafer 1: Full-Frame Global Shutter BSI-CMOS Pixel Silicon Die (z = +0.97 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Primary full-frame Exmor RS / Global Shutter silicon die with stereo-microscope wafer floorplan texture
    const pixelDieGeo = new THREE.BoxGeometry(40.4, 28.4, 0.28);
    const pixelDieMats = [
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconSensorDie,
      mats.siliconBulk,
    ];
    g.add(new THREE.Mesh(pixelDieGeo, pixelDieMats));

    // Exposed chamfered silicon dicing street / seal-ring perimeter shoulder
    const scribeRim = new THREE.Mesh(
      extrudeCentered(createFrameShape(40.5, 28.5, 0.12, 39.7, 27.7, 0.08), 0.22, 0.02, 0.02, 8),
      mats.siliconBulk
    );
    scribeRim.position.z = -0.02;
    scribeRim.userData.noEdges = true;
    g.add(scribeRim);

    // Physical 3D raised copper moisture/crack-stop guard ring around outer silicon edge
    const cuSealRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(39.4, 27.4, 0.14, 38.9, 26.9, 0.12), 0.05, 0.01, 0.01, 8),
      mats.copperHybridBond
    );
    cuSealRing.position.z = 0.155;
    cuSealRing.userData.noEdges = true;
    g.add(cuSealRing);

    // Micro-raised 3D active 36x24mm microlens/CFA mesa lip + tungsten OB light-shield step
    const activeMesa = new THREE.Mesh(
      extrudeCentered(createFrameShape(36.6, 24.6, 0.15, 35.8, 23.8, 0.12), 0.06, 0.01, 0.01, 8),
      mats.tungstenLightShield
    );
    activeMesa.position.z = 0.16;
    activeMesa.userData.noEdges = true;
    g.add(activeMesa);

    // 88 Physical 3D raised gold wire-bond pads around all 4 wafer edges (InstancedMesh!)
    const padCoords: Array<[number, number, boolean]> = [];
    for (let i = 0; i < 28; i++) {
      const px = -17.6 + (i / 27) * 35.2;
      padCoords.push([px, 13.75, false], [px, -13.75, false]);
    }
    for (let i = 0; i < 16; i++) {
      const py = -11.4 + (i / 15) * 22.8;
      padCoords.push([-19.75, py, true], [19.75, py, true]);
    }
    const bondPadGeo = new THREE.BoxGeometry(0.56, 0.42, 0.065);
    const bondPadInst = new THREE.InstancedMesh(bondPadGeo, mats.goldPlating, padCoords.length);
    padCoords.forEach(([px, py, rot90], idx) => {
      dummy.position.set(px, py, 0.162);
      dummy.rotation.set(0, 0, rot90 ? Math.PI / 2 : 0);
      dummy.updateMatrix();
      bondPadInst.setMatrixAt(idx, dummy.matrix);
    });
    bondPadInst.instanceMatrix.needsUpdate = true;
    bondPadInst.userData.noEdges = true;
    g.add(bondPadInst);

    // 4-Corner 3D ASML Photolithography Box-in-Box Fiducial Alignment Reticle Tiles!
    const fidGeo = createChamferedBoxGeo(1.35, 1.35, 0.055, 0.06, 0.01, 'z');
    applyPlanarUVs(fidGeo, 1.35, 1.35, 'xy');
    for (const [fx, fy] of [
      [-18.8, 12.9],
      [18.8, 12.9],
      [-18.8, -12.9],
      [18.8, -12.9],
    ] as Array<[number, number]>) {
      const fid = new THREE.Mesh(fidGeo, mats.ultra.sensorFiducialTarget);
      fid.position.set(fx, fy, 0.165);
      fid.userData.noEdges = true;
      g.add(fid);
    }

    parts.push(
      finalizePart(
        'cmos-die',
        9,
        '#1d6d7c',
        g,
        new THREE.Vector3(0, 0, 0.97),
        new THREE.Vector3(0, 0, 12),
        new THREE.Vector3(0, 0, -19.47),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S10. 3μm-Pitch Cu-Cu Bumpless Direct Hybrid Bonding Matrix (z = +0.76 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Plasma-activated SiO2 hybrid-bond wafer plane with bespoke Cu-Cu micro-pad floorplan texture
    const oxideGeo = new THREE.BoxGeometry(40.2, 28.2, 0.12);
    const oxideCore = new THREE.Mesh(oxideGeo, [
      mats.quartzEdge,
      mats.quartzEdge,
      mats.quartzEdge,
      mats.quartzEdge,
      mats.ultra.sensorCuCuHybrid,
      mats.ultra.sensorCuCuHybrid,
    ]);
    g.add(oxideCore);

    // 3D micro-relief instanced Cu-Cu direct bond pads (16x10 dual-bank readout pillars)
    const padGeo = new THREE.BoxGeometry(1.38, 1.38, 0.18);
    const padInst = new THREE.InstancedMesh(padGeo, mats.copperHybridBond, 160);
    let idx = 0;
    for (let ix = 0; ix < 16; ix++) {
      const px = -17.25 + ix * 2.3;
      for (let iy = 0; iy < 10; iy++) {
        const py = -11.25 + iy * 2.5;
        dummy.position.set(px, py, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        padInst.setMatrixAt(idx++, dummy.matrix);
      }
    }
    padInst.instanceMatrix.needsUpdate = true;
    padInst.userData.noEdges = true;
    g.add(padInst);

    // Central horizontal Cu power/clock trunk + solid Cu hermetic crack-stop perimeter guard ring
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(36.8, 0.85, 0.19), mats.copperHybridBond);
    trunk.userData.noEdges = true;
    const guardRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(40.15, 28.15, 0.2, 38.4, 26.4, 0.2), 0.19, 0.015, 0.015, 8),
      mats.copperHybridBond
    );
    g.add(trunk, guardRing);

    // 4-Corner Wafer-to-Wafer Optical Overlay Alignment Vernier Targets (0.05um bonding tolerance)
    const ovlGeo = createChamferedBoxGeo(1.4, 1.4, 0.21, 0.06, 0.01, 'z');
    applyPlanarUVs(ovlGeo, 1.4, 1.4, 'xy');
    for (const [vx, vy] of [
      [-18.6, 12.6],
      [18.6, 12.6],
      [-18.6, -12.6],
      [18.6, -12.6],
    ] as Array<[number, number]>) {
      const ovl = new THREE.Mesh(ovlGeo, mats.ultra.sensorFiducialTarget);
      ovl.position.set(vx, vy, 0);
      ovl.userData.noEdges = true;
      g.add(ovl);
    }

    parts.push(
      finalizePart(
        'sensor-cucu-layer',
        10,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 0.76),
        new THREE.Vector3(0, 0, 4),
        new THREE.Vector3(0, 0, -24.76),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S11. Wafer 2: 4nm Column-Parallel CDS & ADC Logic Die (z = +0.46 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Wafer 2: 4nm Column-Parallel CDS/ADC & SLVS-EC PHY Die with bespoke high-DPI logic floorplan
    const logicDie = new THREE.Mesh(new THREE.BoxGeometry(40.4, 28.4, 0.30), [
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.ultra.sensorLogicAdcDie,
      mats.siliconLogicLayer,
    ]);
    g.add(logicDie);

    // Dual-bank 16-bit column-parallel ADC comparator rails (top + bottom banks flanking central DSP spine)
    const adcBarGeo = new THREE.BoxGeometry(1.12, 9.6, 0.06);
    const adcBars = new THREE.InstancedMesh(adcBarGeo, mats.goldPlating, 32);
    let ai = 0;
    for (let i = 0; i < 16; i++) {
      const ax = -15.0 + i * 2.0;
      for (const ay of [7.2, -7.2]) {
        dummy.position.set(ax, ay, 0.175);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        adcBars.setMatrixAt(ai++, dummy.matrix);
      }
    }
    adcBars.instanceMatrix.needsUpdate = true;
    adcBars.userData.noEdges = true;
    g.add(adcBars);

    // Central Ramp-DAC / Timing-Gen / LC-PLL bus spine + 3 raised 3D gold spiral LC-PLL inductor rings!
    const centralSpine = new THREE.Mesh(new THREE.BoxGeometry(31.2, 2.2, 0.07), mats.copperHybridBond);
    centralSpine.position.z = 0.18;
    centralSpine.userData.noEdges = true;
    g.add(centralSpine);

    for (const px of [-9.5, 0.0, 9.5]) {
      const pllOuter = new THREE.Mesh(hiResTorus(0.82, 0.09, 6, 16), mats.goldPlating);
      pllOuter.position.set(px, 0, 0.23);
      pllOuter.userData.noEdges = true;
      const pllInner = new THREE.Mesh(hiResTorus(0.45, 0.08, 6, 14), mats.goldPlating);
      pllInner.position.set(px, 0, 0.23);
      pllInner.userData.noEdges = true;
      g.add(pllOuter, pllInner);
    }

    // Left/right 8-lane SLVS-EC v3 SerDes PHY strips + 16 physical copper lane micro-bumps
    const phyBumpGeo = new THREE.BoxGeometry(1.3, 1.8, 0.06);
    const phyBumps = new THREE.InstancedMesh(phyBumpGeo, mats.copperHybridBond, 16);
    let pbi = 0;
    for (const sx of [-18.4, 18.4]) {
      const phyStrip = new THREE.Mesh(new THREE.BoxGeometry(2.1, 24.0, 0.07), mats.goldPlating);
      phyStrip.position.set(sx, 0, 0.18);
      phyStrip.userData.noEdges = true;
      g.add(phyStrip);
      for (let lane = 0; lane < 8; lane++) {
        dummy.position.set(sx, -9.8 + lane * 2.8, 0.225);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        phyBumps.setMatrixAt(pbi++, dummy.matrix);
      }
    }
    phyBumps.instanceMatrix.needsUpdate = true;
    phyBumps.userData.noEdges = true;
    g.add(phyBumps);

    // 2nd Cu-Cu interconnect seam facing Wafer 3 DRAM underneath
    const cucu2 = new THREE.Mesh(
      new THREE.BoxGeometry(40.25, 28.25, 0.08),
      mats.copperHybridBond
    );
    cucu2.position.z = -0.19;
    g.add(cucu2);

    parts.push(
      finalizePart(
        'sensor-logic-dram',
        11,
        '#4f46e5',
        g,
        new THREE.Vector3(0, 0, 0.46),
        new THREE.Vector3(0, 0, -3),
        new THREE.Vector3(0, 0, -29.2),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S12. Wafer 3: 3D-Stacked 120fps DRAM Buffer Die & Cu TSV Spine (z = +0.06 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Wafer 3 DRAM Die textured with bespoke 8-bank 120fps DRAM + central Cu TSV lithography
    const dramDie = new THREE.Mesh(new THREE.BoxGeometry(40.4, 28.4, 0.34), [
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.ultra.sensorDramDie,
      mats.ultra.sensorDramDie,
    ]);
    g.add(dramDie);

    // 8 Physically sculpted 3D raised 1T1C DRAM memory bank mesas + golden sense-amp rim bars!
    const bankGeo = new THREE.BoxGeometry(8.2, 9.6, 0.055);
    const senseGeo = new THREE.BoxGeometry(8.2, 0.62, 0.07);
    const bankInst = new THREE.InstancedMesh(bankGeo, mats.siliconLogicLayer, 8);
    const senseInst = new THREE.InstancedMesh(senseGeo, mats.goldPlating, 8);
    let bi = 0;
    for (let c = 0; c < 4; c++) {
      const bx = -13.8 + c * 9.2;
      for (const rowSign of [1, -1]) {
        dummy.position.set(bx, rowSign * 7.2, 0.19);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        bankInst.setMatrixAt(bi, dummy.matrix);

        dummy.position.set(bx, rowSign * 2.55, 0.205);
        dummy.updateMatrix();
        senseInst.setMatrixAt(bi, dummy.matrix);
        bi++;
      }
    }
    bankInst.instanceMatrix.needsUpdate = true;
    senseInst.instanceMatrix.needsUpdate = true;
    bankInst.userData.noEdges = true;
    senseInst.userData.noEdges = true;
    g.add(bankInst, senseInst);

    // Dual-row high-density copper Through-Silicon-Via (TSV) pillars + SiO2 dielectric liner collars
    const tsvGeo = hiResCyl(0.24, 0.24, 0.46, 10).rotateX(Math.PI / 2);
    const linerGeo = hiResCyl(0.36, 0.36, 0.38, 10).rotateX(Math.PI / 2);
    const tsvInst = new THREE.InstancedMesh(tsvGeo, mats.copperHybridBond, 48);
    const linerInst = new THREE.InstancedMesh(linerGeo, mats.ftiOxide, 48);
    let ti = 0;
    for (let i = 0; i < 24; i++) {
      const tx = -17.25 + i * 1.5;
      for (const ty of [-0.65, 0.65]) {
        dummy.position.set(tx, ty, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        tsvInst.setMatrixAt(ti, dummy.matrix);
        linerInst.setMatrixAt(ti, dummy.matrix);
        ti++;
      }
    }
    tsvInst.instanceMatrix.needsUpdate = true;
    linerInst.instanceMatrix.needsUpdate = true;
    tsvInst.userData.noEdges = true;
    linerInst.userData.noEdges = true;
    g.add(tsvInst, linerInst);

    // Copper RDL redistribution frame
    const rdlFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(39.8, 27.8, 0.3, 38.2, 26.2, 0.2), 0.08, 0.01, 0.01, 8),
      mats.copperHybridBond
    );
    rdlFrame.position.z = 0.21;
    g.add(rdlFrame);

    parts.push(
      finalizePart(
        'sensor-dram-wafer',
        12,
        '#312e81',
        g,
        new THREE.Vector3(0, 0, 0.06),
        new THREE.Vector3(0, 0, -11),
        new THREE.Vector3(0, 0, -34.0),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S13. 99.99% Au Ultra-Low-Loop Gold Wire Bonding Array (z = +0.55 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Realistic semiconductor ball-to-stitch ultra-low-loop reverse-kink wire profile
    const archSegments: THREE.TubeGeometry[] = [];
    const ballPositions: THREE.Vector3[] = [];
    const stitchPositions: THREE.Vector3[] = [];

    const buildArch = (p0: THREE.Vector3, p1: THREE.Vector3, peakZ: number, radius = 0.046) => {
      ballPositions.push(p0);
      stitchPositions.push(p1);
      const neck = p0.clone().lerp(p1, 0.08);
      neck.z = peakZ;
      const crown = p0.clone().lerp(p1, 0.36);
      crown.z = peakZ + 0.04;
      const shoulder = p0.clone().lerp(p1, 0.76);
      shoulder.z = THREE.MathUtils.lerp(peakZ, p1.z, 0.52);
      const curve = new THREE.CatmullRomCurve3([p0, neck, crown, shoulder, p1]);
      return new THREE.TubeGeometry(curve, 6, radius, 4, false);
    };

    const xCount = 44;
    for (let i = 0; i < xCount; i++) {
      const t = i / (xCount - 1);
      const x = -18.4 + t * 36.8;
      const altPeak = i % 2 === 0 ? 0.94 : 1.08;
      archSegments.push(
        buildArch(
          new THREE.Vector3(x, 13.75, 0.56),
          new THREE.Vector3(x * 1.045, 16.05, 0.16),
          altPeak
        ),
        buildArch(
          new THREE.Vector3(x, -13.75, 0.56),
          new THREE.Vector3(x * 1.045, -16.05, 0.16),
          altPeak
        )
      );
    }

    const yCount = 28;
    for (let i = 0; i < yCount; i++) {
      const t = i / (yCount - 1);
      const y = -12.2 + t * 24.4;
      const altPeak = i % 2 === 0 ? 0.94 : 1.08;
      archSegments.push(
        buildArch(
          new THREE.Vector3(-19.75, y, 0.56),
          new THREE.Vector3(-21.95, y * 1.05, 0.16),
          altPeak
        ),
        buildArch(
          new THREE.Vector3(19.75, y, 0.56),
          new THREE.Vector3(21.95, y * 1.05, 0.16),
          altPeak
        )
      );
    }

    // 4-corner dual heavy Kelvin VDD_PIX/VSS_ANA low-inductance power wire straps
    for (const [sx, sy] of [
      [-1, 1],
      [1, 1],
      [-1, -1],
      [1, -1],
    ] as Array<[number, number]>) {
      for (const d of [-0.28, 0.28]) {
        archSegments.push(
          buildArch(
            new THREE.Vector3(sx * (19.0 + d), sy * (13.2 - d), 0.56),
            new THREE.Vector3(sx * (21.4 + d), sy * (15.5 - d), 0.16),
            1.14,
            0.062
          )
        );
      }
    }

    const mergedPositions: number[] = [];
    const mergedNormals: number[] = [];
    const mergedIndices: number[] = [];
    let vertexOffset = 0;

    for (const seg of archSegments) {
      const pos = seg.attributes.position;
      const norm = seg.attributes.normal;
      const idx = seg.index!;
      for (let k = 0; k < pos.count; k++) {
        mergedPositions.push(pos.getX(k), pos.getY(k), pos.getZ(k));
        mergedNormals.push(norm.getX(k), norm.getY(k), norm.getZ(k));
      }
      for (let k = 0; k < idx.count; k++) {
        mergedIndices.push(idx.getX(k) + vertexOffset);
      }
      vertexOffset += pos.count;
      seg.dispose();
    }

    const mergedGeo = new THREE.BufferGeometry();
    mergedGeo.setAttribute('position', new THREE.Float32BufferAttribute(mergedPositions, 3));
    mergedGeo.setAttribute('normal', new THREE.Float32BufferAttribute(mergedNormals, 3));
    mergedGeo.setIndex(mergedIndices);

    const wiresMesh = new THREE.Mesh(mergedGeo, mats.goldPlating);
    wiresMesh.userData.noEdges = true;
    g.add(wiresMesh);

    // Instanced thermosonic Au ball-bond bumps (die pads) & flattened wedge-stitch feet (ceramic shelf)
    const ballGeo = new THREE.SphereGeometry(0.105, 6, 5);
    const ballInst = new THREE.InstancedMesh(ballGeo, mats.goldPlating, ballPositions.length);
    const stitchGeo = new THREE.BoxGeometry(0.18, 0.18, 0.06);
    const stitchInst = new THREE.InstancedMesh(stitchGeo, mats.goldPlating, stitchPositions.length);
    for (let i = 0; i < ballPositions.length; i++) {
      dummy.position.copy(ballPositions[i]);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      ballInst.setMatrixAt(i, dummy.matrix);

      dummy.position.copy(stitchPositions[i]);
      dummy.updateMatrix();
      stitchInst.setMatrixAt(i, dummy.matrix);
    }
    ballInst.instanceMatrix.needsUpdate = true;
    stitchInst.instanceMatrix.needsUpdate = true;
    ballInst.userData.noEdges = true;
    stitchInst.userData.noEdges = true;
    g.add(ballInst, stitchInst);

    parts.push(
      finalizePart(
        'wire-bonds',
        13,
        '#e3b952',
        g,
        new THREE.Vector3(0, 0, 0.55),
        new THREE.Vector3(0, 0, -19),
        new THREE.Vector3(0, 0, -38.8),
        cp,
        { ibisMovable: true }
      )
    );
  }

  // =========================================================================
  // S14. HTCC 12-Layer Alumina Ceramic LGA Package (z = -0.55 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Kyocera-style 12-layer dark sintered Al2O3 HTCC cavity package (textured micro-grain!)
    const baseShape = createFrameShape(49.2, 38.6, 1.8, 36.2, 24.2, 0.6);
    const baseGeo = extrudeCentered(baseShape, 1.1, 0.12, 0.12, 18);
    applyBoxUVs(baseGeo, 16.0);
    const baseMesh = new THREE.Mesh(baseGeo, mats.ultra.sensorHtccCeramic);
    baseMesh.position.z = -0.55;
    g.add(baseMesh);

    const shelfShape = createFrameShape(49.2, 38.6, 1.8, 41.6, 29.6, 0.7);
    const shelfGeo = extrudeCentered(shelfShape, 1.1, 0.08, 0.08, 18);
    applyBoxUVs(shelfGeo, 16.0);
    const shelfMesh = new THREE.Mesh(shelfGeo, mats.ultra.sensorHtccCeramic);
    shelfMesh.position.z = 0.55;
    g.add(shelfMesh);

    const upperWallShape = createFrameShape(49.2, 38.6, 1.8, 45.2, 34.4, 1.0);
    const upperGeo = extrudeCentered(upperWallShape, 0.95, 0.08, 0.08, 18);
    applyBoxUVs(upperGeo, 16.0);
    const upperWall = new THREE.Mesh(upperGeo, mats.ultra.sensorHtccCeramic);
    upperWall.position.z = 1.5;
    g.add(upperWall);

    // Top Kovar lid-brazing Ni/Au metallization seal ring + inner shelf ground ring + Pin-1 chamfer
    const topSealRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(48.4, 37.8, 1.5, 45.8, 35.0, 1.1), 0.08, 0.01, 0.01, 14),
      mats.goldPlating
    );
    topSealRing.position.z = 1.99;
    topSealRing.userData.noEdges = true;
    const innerGndRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(42.5, 30.5, 0.75, 41.7, 29.7, 0.7), 0.07, 0.01, 0.01, 12),
      mats.goldPlating
    );
    innerGndRing.position.z = 1.13;
    innerGndRing.userData.noEdges = true;
    const pin1Index = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 0.12), mats.goldPlating);
    pin1Index.position.set(-22.8, 17.5, 2.0);
    pin1Index.rotation.z = Math.PI / 4;
    pin1Index.userData.noEdges = true;
    g.add(topSealRing, innerGndRing, pin1Index);

    // Exposed co-fired tungsten-metallized ceramic strata side accent lines
    for (const lz of [-0.65, 0.05, 0.75, 1.45]) {
      const strata = new THREE.Mesh(
        extrudeCentered(createFrameShape(49.26, 38.66, 1.82, 48.7, 38.1, 1.65), 0.06, 0, 0, 12),
        mats.kovarSeal
      );
      strata.position.z = lz;
      strata.userData.noEdges = true;
      g.add(strata);
    }

    // 64 Physical 3D co-fired tungsten-Ni-Au outer-edge castellations around all 4 Kyocera HTCC walls!
    const castGeo = hiResCyl(0.28, 0.28, 2.65, 8).rotateX(Math.PI / 2);
    const castCoords: Array<[number, number]> = [];
    for (let i = 0; i < 18; i++) {
      const cx = -21.25 + (i / 17) * 42.5;
      castCoords.push([cx, 19.32], [cx, -19.32]);
    }
    for (let i = 0; i < 14; i++) {
      const cy = -16.2 + (i / 13) * 32.4;
      castCoords.push([-24.62, cy], [24.62, cy]);
    }
    const castInst = new THREE.InstancedMesh(castGeo, mats.goldPlating, castCoords.length);
    castCoords.forEach(([cx, cy], idx) => {
      dummy.position.set(cx, cy, 0.45);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      castInst.setMatrixAt(idx, dummy.matrix);
    });
    castInst.instanceMatrix.needsUpdate = true;
    castInst.userData.noEdges = true;
    g.add(castInst);

    // Radial tungsten/Ni/Au wire-bond landing fingers
    const fingerGeo = new THREE.BoxGeometry(0.45, 1.55, 0.08);
    const fingers = new THREE.InstancedMesh(fingerGeo, mats.goldPlating, 44 * 2 + 28 * 2);
    let fi = 0;
    for (let i = 0; i < 44; i++) {
      const x = -19.2 + (i / 43) * 38.4;
      dummy.position.set(x, 16.05, 1.14);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      fingers.setMatrixAt(fi++, dummy.matrix);

      dummy.position.set(x, -16.05, 1.14);
      dummy.updateMatrix();
      fingers.setMatrixAt(fi++, dummy.matrix);
    }
    for (let i = 0; i < 28; i++) {
      const y = -12.8 + (i / 27) * 25.6;
      dummy.position.set(-21.95, y, 1.14);
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.updateMatrix();
      fingers.setMatrixAt(fi++, dummy.matrix);

      dummy.position.set(21.95, y, 1.14);
      dummy.updateMatrix();
      fingers.setMatrixAt(fi++, dummy.matrix);
    }
    fingers.instanceMatrix.needsUpdate = true;
    fingers.userData.noEdges = true;
    g.add(fingers);

    // Rear (-Z) bespoke LGA-320 Ceramic Land-Grid Substrate Face + 3D ENIG gold pads
    const lgaBackGeo = extrudeCentered(createFrameShape(48.4, 37.8, 1.5, 36.2, 24.2, 0.6), 0.06, 0, 0, 14);
    applyPlanarUVs(lgaBackGeo, 48.4, 37.8, 'xy-back');
    const lgaBackFace = new THREE.Mesh(lgaBackGeo, mats.ultra.sensorLgaBallGrid);
    lgaBackFace.position.z = -1.12;
    lgaBackFace.userData.noEdges = true;
    g.add(lgaBackFace);

    const padGeo = new THREE.BoxGeometry(1.1, 1.1, 0.08);
    const padCoords: Array<[number, number]> = [];
    for (let x = -22; x <= 22; x += 2.2) {
      for (const y of [-17.2, -15.2, 15.2, 17.2]) padCoords.push([x, y]);
    }
    for (let y = -13; y <= 13; y += 2.2) {
      for (const x of [-22.4, -20.4, 20.4, 22.4]) padCoords.push([x, y]);
    }
    const lgaPads = new THREE.InstancedMesh(padGeo, mats.goldPlating, padCoords.length);
    padCoords.forEach(([px, py], idx) => {
      dummy.position.set(px, py, -1.16);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      lgaPads.setMatrixAt(idx, dummy.matrix);
    });
    lgaPads.instanceMatrix.needsUpdate = true;
    lgaPads.userData.noEdges = true;
    g.add(lgaPads);

    parts.push(
      finalizePart(
        'ceramic-package',
        14,
        '#3e424c',
        g,
        new THREE.Vector3(0, 0, -0.55),
        new THREE.Vector3(0, 0, -27),
        new THREE.Vector3(0, 0, -43.0),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S15. CTE-Matched CuW80 Thermal Slug & Sintered Nano-Silver Layer (z = -1.10 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Heavy Tungsten-Copper (W80/Cu20) machined slug with sintered CuW80 micro-grain & relief channels
    const slugGeo = extrudeCentered(createRoundedRectShape(36.0, 24.0, 0.5), 1.14, 0.09, 0.09, 14);
    applyPlanarUVs(slugGeo, 36.0, 24.0, 'xy');
    const slugBody = new THREE.Mesh(slugGeo, mats.ultra.sensorCuWAlloySinter);
    g.add(slugBody);

    // Pressure-sintered Nano-Silver (220 W/m·K) die-attach film with micro-waffle stress-relief islands
    const agBase = new THREE.Mesh(
      createChamferedBoxGeo(34.6, 22.6, 0.12, 0.3, 0.03, 'z'),
      mats.sinteredSilver
    );
    agBase.position.z = 0.62;
    g.add(agBase);

    const waffleGeo = new THREE.BoxGeometry(4.8, 3.6, 0.06);
    const waffles = new THREE.InstancedMesh(waffleGeo, mats.sinteredSilver, 30);
    let wi = 0;
    for (let ix = 0; ix < 6; ix++) {
      for (let iy = 0; iy < 5; iy++) {
        dummy.position.set(-14.0 + ix * 5.6, -8.8 + iy * 4.4, 0.70);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        waffles.setMatrixAt(wi++, dummy.matrix);
      }
    }
    waffles.instanceMatrix.needsUpdate = true;
    waffles.userData.noEdges = true;
    g.add(waffles);

    // Gold-plated Ag-Cu eutectic brazing flange rim locking slug to ceramic cavity
    const brazeRim = new THREE.Mesh(
      extrudeCentered(createFrameShape(37.6, 25.6, 0.6, 35.4, 23.4, 0.4), 0.24, 0.03, 0.03, 12),
      mats.goldPlating
    );
    brazeRim.position.z = -0.46;
    g.add(brazeRim);

    parts.push(
      finalizePart(
        'sensor-cuw-slug',
        15,
        '#92400e',
        g,
        new THREE.Vector3(0, 0, -1.1),
        new THREE.Vector3(0, 0, -35),
        new THREE.Vector3(0, 0, -46.8),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S16. Multi-Layer Sensor Main PCB & Analog/Digital Power Stage (z = -2.45 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 10-layer high-density Sensor PCB with upgraded SY-1122 SLVS-EC silkscreen & 12-layer copper edge laminate
    const pcbGeo = new THREE.BoxGeometry(56.0, 45.0, 1.25);
    g.add(
      new THREE.Mesh(pcbGeo, [
        mats.pcbEdgeLaminate,
        mats.pcbEdgeLaminate,
        mats.pcbEdgeLaminate,
        mats.pcbEdgeLaminate,
        mats.sensorPcb,
        mats.sensorPcb,
      ])
    );

    // 4 ENIG plated corner mounting rings with hollow bores & star ground-stitching collars
    for (const [rx, ry] of [
      [-24.8, 19.2],
      [24.8, 19.2],
      [-24.8, -19.2],
      [24.8, -19.2],
    ] as Array<[number, number]>) {
      const ringOuter = new THREE.Mesh(
        hiResCyl(1.95, 1.95, 1.32, 18).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      ringOuter.position.set(rx, ry, 0);
      const bore = new THREE.Mesh(
        hiResCyl(1.15, 1.15, 1.36, 14).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      bore.position.set(rx, ry, 0);
      bore.userData.noEdges = true;
      g.add(ringOuter, bore);
    }

    // FRONT (+Z) 3D SMD Population (strictly outside S14 ceramic footprint!): bypass MLCCs + ENIG Test Points + Fiducials
    const fCapGeo = new THREE.BoxGeometry(0.82, 0.48, 0.36);
    const fCapTermGeo = new THREE.BoxGeometry(0.24, 0.52, 0.40);
    const fCapCoords: Array<[number, number, number]> = [];
    for (let i = 0; i < 6; i++) {
      const cx = -15.0 + i * 6.0;
      fCapCoords.push([cx, 20.6, 0], [cx, -20.6, 0]);
    }
    for (let i = 0; i < 4; i++) {
      const cy = -9.0 + i * 6.0;
      fCapCoords.push([-26.0, cy, Math.PI / 2], [26.0, cy, Math.PI / 2]);
    }
    const fCapsBody = new THREE.InstancedMesh(fCapGeo, mats.smdCeramic, fCapCoords.length);
    const fCapsTerm = new THREE.InstancedMesh(fCapTermGeo, mats.solderBallSilver, fCapCoords.length * 2);
    fCapCoords.forEach(([cx, cy, rot], idx) => {
      dummy.position.set(cx, cy, 0.80);
      dummy.rotation.set(0, 0, rot);
      dummy.updateMatrix();
      fCapsBody.setMatrixAt(idx, dummy.matrix);

      const dx = Math.cos(rot) * 0.44;
      const dy = Math.sin(rot) * 0.44;
      dummy.position.set(cx - dx, cy - dy, 0.80);
      dummy.updateMatrix();
      fCapsTerm.setMatrixAt(idx * 2, dummy.matrix);
      dummy.position.set(cx + dx, cy + dy, 0.80);
      dummy.updateMatrix();
      fCapsTerm.setMatrixAt(idx * 2 + 1, dummy.matrix);
    });
    fCapsBody.instanceMatrix.needsUpdate = true;
    fCapsTerm.instanceMatrix.needsUpdate = true;
    fCapsBody.userData.noEdges = true;
    fCapsTerm.userData.noEdges = true;
    g.add(fCapsBody, fCapsTerm);

    // 12 Front-side ENIG gold probe test-point domes (TP1..TP12) along top & bottom service strips
    const tpGeo = hiResCyl(0.48, 0.48, 0.14, 10).rotateX(Math.PI / 2);
    const tpInst = new THREE.InstancedMesh(tpGeo, mats.goldPlating, 12);
    let tpi = 0;
    for (let t = 0; t < 6; t++) {
      const tx = -12.5 + t * 5.0;
      for (const ty of [21.5, -21.5]) {
        dummy.position.set(tx, ty, 0.66);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        tpInst.setMatrixAt(tpi++, dummy.matrix);
      }
    }
    tpInst.instanceMatrix.needsUpdate = true;
    tpInst.userData.noEdges = true;
    g.add(tpInst);

    // 4 Authentic QFN/DFN Sensor Power & Timing ICs on rear (-Z) with metallic leadframe pins & Pin-1 dimples
    const icSpecs: Array<[number, number, number, number, number, number]> = [
      [-17.5, 13.0, 4.6, 4.6, 0.72, 6],
      [-17.5, -13.0, 4.6, 4.6, 0.72, 6],
      [17.5, 13.0, 5.2, 4.2, 0.72, 7],
      [17.5, -13.0, 4.2, 4.2, 0.68, 5],
    ];
    for (const [ix, iy, iw, ih, iz, pins] of icSpecs) {
      const ic = buildChipPackage({
        w: iw,
        d: ih,
        h: iz,
        style: 'qfn',
        pinsPerSide: pins,
        bodyMat: mats.ultra.icEpoxyLaser,
        leadMat: mats.solderBallSilver,
        pin1Mat: mats.goldPlating,
        axis: 'z',
      });
      ic.rotation.y = Math.PI;
      ic.position.set(ix, iy, -0.625 - iz * 0.5);
      g.add(ic);
    }

    // Twin molded shielded ferrite buck inductors (2R2) + 2 yellow tantalum bulk caps on rear power stage
    for (const [lx, ly] of [
      [-10.8, 16.6],
      [10.8, 16.6],
    ] as Array<[number, number]>) {
      const indBody = new THREE.Mesh(
        createChamferedBoxGeo(3.2, 3.2, 0.92, 0.35, 0.08, 'z'),
        mats.icEpoxy
      );
      indBody.position.set(lx, ly, -1.08);
      for (const sx of [-1.45, 1.45]) {
        const indTerm = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2.4, 0.86), mats.solderBallSilver);
        indTerm.position.set(lx + sx, ly, -1.04);
        indTerm.userData.noEdges = true;
        g.add(indTerm);
      }
      g.add(indBody);
    }

    for (const [tx, ty] of [
      [-6.2, -16.8],
      [6.2, -16.8],
    ] as Array<[number, number]>) {
      const bulkCap = buildTantalumCap(
        3.2,
        1.8,
        0.88,
        mats.tantalumCapYellow,
        mats.copperHeatSpreader,
        mats.solderBallSilver,
        'z'
      );
      bulkCap.rotation.y = Math.PI;
      bulkCap.position.set(tx, ty, -1.06);
      g.add(bulkCap);
    }

    // Precision seam-welded 72.000MHz NDK Reference Crystal Oscillator (ceramic base + laser-etched gold lid!)
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(3.8, 2.8, 0.38, 0.2, 0.04, 'z'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(0, 16.5, -0.80);
    const xtalLidGeo = createChamferedBoxGeo(3.5, 2.5, 0.34, 0.2, 0.05, 'z');
    applyPlanarUVs(xtalLidGeo, 3.5, 2.5, 'xy-back');
    const xtalLid = new THREE.Mesh(xtalLidGeo, mats.ultra.sensorMemsTcxoLid);
    xtalLid.position.set(0, 16.5, -1.12);
    g.add(xtalBase, xtalLid);

    // 48 Two-Tone 0402 Decoupling MLCCs (tan BaTiO3 ceramic body + dual wrapped Ni-Sn end-caps via InstancedMesh!)
    const capBodyGeo = new THREE.BoxGeometry(0.72, 0.56, 0.50);
    const capTermGeo = new THREE.BoxGeometry(0.24, 0.60, 0.54);
    const capCoords: Array<[number, number, number]> = [];
    for (let i = 0; i < 12; i++) {
      const x = -11.0 + i * 2.0;
      capCoords.push([x, 12.6, 0], [x, -12.6, 0]);
    }
    for (let i = 0; i < 12; i++) {
      const y = -9.9 + i * 1.8;
      capCoords.push([-14.5, y, Math.PI / 2], [14.5, y, Math.PI / 2]);
    }
    const capsBody = new THREE.InstancedMesh(capBodyGeo, mats.smdCeramic, capCoords.length);
    const capsTerm = new THREE.InstancedMesh(capTermGeo, mats.solderBallSilver, capCoords.length * 2);
    capCoords.forEach(([cx, cy, rot], idx) => {
      dummy.position.set(cx, cy, -0.90);
      dummy.rotation.set(0, 0, rot);
      dummy.updateMatrix();
      capsBody.setMatrixAt(idx, dummy.matrix);

      const dx = Math.cos(rot) * 0.44;
      const dy = Math.sin(rot) * 0.44;
      dummy.position.set(cx - dx, cy - dy, -0.90);
      dummy.updateMatrix();
      capsTerm.setMatrixAt(idx * 2, dummy.matrix);
      dummy.position.set(cx + dx, cy + dy, -0.90);
      dummy.updateMatrix();
      capsTerm.setMatrixAt(idx * 2 + 1, dummy.matrix);
    });
    capsBody.instanceMatrix.needsUpdate = true;
    capsTerm.instanceMatrix.needsUpdate = true;
    capsBody.userData.noEdges = true;
    capsTerm.userData.noEdges = true;
    g.add(capsBody, capsTerm);

    // Twin 0.35mm-pitch High-Density SLVS-EC B2B Receptacles (chamfered housing + recessed channel + gold pin comb + metal hold-downs)
    const pinGeo = new THREE.BoxGeometry(0.82, 0.34, 0.20);
    const b2bPins = new THREE.InstancedMesh(pinGeo, mats.goldPlating, 2 * 2 * 24);
    let pIdx = 0;
    for (const side of [-1, 1]) {
      const conn = new THREE.Mesh(
        createChamferedBoxGeo(2.6, 22.0, 0.9, 0.25, 0.08, 'z'),
        mats.icEpoxy
      );
      conn.position.set(side * 24.4, 0, -1.06);
      const slot = new THREE.Mesh(
        new THREE.BoxGeometry(1.05, 19.6, 0.26),
        mats.matteBlackAnodized
      );
      slot.position.set(side * 24.4, 0, -1.44);
      slot.userData.noEdges = true;
      g.add(conn, slot);

      for (const ey of [-10.7, 10.7]) {
        const nail = new THREE.Mesh(
          createChamferedBoxGeo(2.85, 0.9, 0.85, 0.12, 0.04, 'z'),
          mats.stainlessMachined
        );
        nail.position.set(side * 24.4, ey, -1.02);
        nail.userData.noEdges = true;
        g.add(nail);
      }

      for (let k = 0; k < 24; k++) {
        const py = -9.2 + (k / 23) * 18.4;
        for (const ox of [-1.42, 1.42]) {
          dummy.position.set(side * 24.4 + ox, py, -0.74);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          b2bPins.setMatrixAt(pIdx++, dummy.matrix);
        }
      }
    }
    b2bPins.instanceMatrix.needsUpdate = true;
    b2bPins.userData.noEdges = true;
    g.add(b2bPins);

    parts.push(
      finalizePart(
        'sensor-pcb',
        16,
        '#1b5649',
        g,
        new THREE.Vector3(0, 0, -2.45),
        new THREE.Vector3(0, 0, -44),
        new THREE.Vector3(0, 0, -50.5),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S17. SLVS-EC v3 High-Speed Shielded Flex PCB Harness (z = -2.45 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const buildFlexRibbon = (side: -1 | 1) => {
      const ribbonGroup = new THREE.Group();
      const width = 18.6;
      const thickness = 0.24;

      const pts: Array<[number, number]> = [
        [side * 24.4, -1.45],
        [side * 31.0, -1.45],
        [side * 35.8, -2.2],
        [side * 37.8, -4.3],
        [side * 37.2, -6.9],
        [side * 34.4, -8.3],
        [side * 29.8, -8.4],
      ];

      const spline = new THREE.SplineCurve(pts.map(([x, z]) => new THREE.Vector2(x, z)));
      const samples = spline.getPoints(32);

      const upper: THREE.Vector2[] = [];
      const lower: THREE.Vector2[] = [];
      for (let i = 0; i < samples.length; i++) {
        const prev = samples[Math.max(0, i - 1)];
        const next = samples[Math.min(samples.length - 1, i + 1)];
        const tangent = new THREE.Vector2().subVectors(next, prev).normalize();
        const normal = new THREE.Vector2(-tangent.y, tangent.x);
        upper.push(samples[i].clone().addScaledVector(normal, thickness * 0.5));
        lower.push(samples[i].clone().addScaledVector(normal, -thickness * 0.5));
      }

      const shape = new THREE.Shape();
      shape.moveTo(upper[0].x, upper[0].y);
      for (let i = 1; i < upper.length; i++) shape.lineTo(upper[i].x, upper[i].y);
      for (let i = lower.length - 1; i >= 0; i--) shape.lineTo(lower[i].x, lower[i].y);
      shape.closePath();

      const extrudeGeo = new THREE.ExtrudeGeometry(shape, {
        depth: width,
        bevelEnabled: false,
        steps: 1,
      });
      extrudeGeo.translate(0, 0, -width / 2);
      extrudeGeo.rotateX(Math.PI / 2);
      extrudeGeo.computeVertexNormals();
      applyBoxUVs(extrudeGeo, 18.0);
      ribbonGroup.add(new THREE.Mesh(extrudeGeo, mats.ultra.sensorSlvsFlex));

      // Hatched conductive Ag-paste EMI shield film wrapped across the dynamic U-loop flex zone
      const shieldSamples = samples.slice(6, 26);
      const sUpper: THREE.Vector2[] = [];
      const sLower: THREE.Vector2[] = [];
      for (let i = 0; i < shieldSamples.length; i++) {
        const prev = shieldSamples[Math.max(0, i - 1)];
        const next = shieldSamples[Math.min(shieldSamples.length - 1, i + 1)];
        const tangent = new THREE.Vector2().subVectors(next, prev).normalize();
        const normal = new THREE.Vector2(-tangent.y, tangent.x);
        sUpper.push(shieldSamples[i].clone().addScaledVector(normal, thickness * 0.68));
        sLower.push(shieldSamples[i].clone().addScaledVector(normal, thickness * 0.45));
      }
      const shieldShape = new THREE.Shape();
      shieldShape.moveTo(sUpper[0].x, sUpper[0].y);
      for (let i = 1; i < sUpper.length; i++) shieldShape.lineTo(sUpper[i].x, sUpper[i].y);
      for (let i = sLower.length - 1; i >= 0; i--) shieldShape.lineTo(sLower[i].x, sLower[i].y);
      shieldShape.closePath();
      const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, {
        depth: width - 1.4,
        bevelEnabled: false,
      });
      shieldGeo.translate(0, 0, -(width - 1.4) / 2);
      shieldGeo.rotateX(Math.PI / 2);
      shieldGeo.computeVertexNormals();
      ribbonGroup.add(new THREE.Mesh(shieldGeo, mats.emiShieldFilm));

      // Stainless steel stiffener backing plate + twin brass alignment grommets on PCB-side end
      const pcbStiff = new THREE.Mesh(
        createChamferedBoxGeo(4.2, 19.2, 0.24, 0.25, 0.04, 'z'),
        mats.ultra.sensorSusSpringSteel
      );
      pcbStiff.position.set(side * 25.8, 0, -1.72);
      ribbonGroup.add(pcbStiff);
      for (const gy of [-7.6, 7.6]) {
        const grom = new THREE.Mesh(hiResTorus(0.58, 0.16, 6, 12), mats.goldPlating);
        grom.position.set(side * 27.6, gy, -1.56);
        grom.userData.noEdges = true;
        ribbonGroup.add(grom);
      }

      // Rear Mainboard-side B2B plug housing with stainless locking shield & gold contact comb
      const endPlug = new THREE.Mesh(
        createChamferedBoxGeo(3.2, 19.4, 0.9, 0.25, 0.08, 'z'),
        mats.icEpoxy
      );
      endPlug.position.set(side * 29.8, 0, -8.55);
      const endStiff = new THREE.Mesh(
        createChamferedBoxGeo(4.0, 19.0, 0.22, 0.2, 0.03, 'z'),
        mats.ultra.sensorSusSpringSteel
      );
      endStiff.position.set(side * 30.2, 0, -8.98);
      const endGold = new THREE.Mesh(new THREE.BoxGeometry(1.4, 17.8, 0.16), mats.goldPlating);
      endGold.position.set(side * 28.8, 0, -8.08);
      ribbonGroup.add(endPlug, endStiff, endGold);

      return ribbonGroup;
    };

    g.add(buildFlexRibbon(-1), buildFlexRibbon(1));

    parts.push(
      finalizePart(
        'slvs-fpc',
        17,
        '#c96b1c',
        g,
        new THREE.Vector3(0, 0, -2.45),
        new THREE.Vector3(0, 0, -52),
        new THREE.Vector3(0, 0, -55.8),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S18. Precision ±0.1°C NTC Die-Temperature Sensor Sub-Board (z = -2.55 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Chamfered emerald NTC thermistor rigid-flex daughterboard with bespoke sub-PCB silkscreen
    const boardGeo = createChamferedBoxGeo(11.6, 6.2, 0.65, 0.6, 0.06, 'z');
    applyPlanarUVs(boardGeo, 11.6, 6.2, 'xy');
    const board = new THREE.Mesh(boardGeo, mats.ultra.sensorHallSubPcb);
    board.position.set(-22.5, 19.8, 0);
    g.add(board);

    // Brass grounding/mounting eyelet on corner
    const eyelet = new THREE.Mesh(
      hiResCyl(0.85, 0.85, 0.72, 12).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    eyelet.position.set(-26.8, 21.8, 0);
    eyelet.userData.noEdges = true;
    g.add(eyelet);

    // Contoured stepped copper thermal bridge tongue contacting ceramic package rim
    const cuBridge = new THREE.Mesh(
      createChamferedBoxGeo(4.6, 4.0, 0.42, 0.3, 0.05, 'z'),
      mats.copperHeatSpreader
    );
    cuBridge.position.set(-16.2, 18.8, 0.45);
    const cuKnee = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.6, 0.48), mats.copperHeatSpreader);
    cuKnee.position.set(-18.2, 19.2, 0.22);
    cuKnee.userData.noEdges = true;

    // Two-tone 0603 precision thin-film NTC thermistor bead
    const ntcBead = buildSmdPassive(2.0, 1.15, 0.72, mats.tantalumCapYellow, mats.solderBallSilver, 'z');
    ntcBead.rotation.y = Math.PI;
    ntcBead.position.set(-18.2, 19.8, -0.58);

    // 24-bit Sigma-Delta Temp ADC QFN IC with pins + Pin-1 dimple + twin filter MLCCs
    const adcIc = buildChipPackage({
      w: 3.2,
      d: 3.2,
      h: 0.65,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    adcIc.rotation.y = Math.PI;
    adcIc.position.set(-24.0, 19.8, -0.58);

    for (const cy of [17.8, 21.8]) {
      const fCap = buildSmdPassive(1.0, 0.55, 0.44, mats.smdCeramic, mats.solderBallSilver, 'z');
      fCap.rotation.y = Math.PI;
      fCap.position.set(-20.8, cy, -0.48);
      g.add(fCap);
    }

    for (let k = 0; k < 4; k++) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.72, 0.22), mats.goldPlating);
      pad.position.set(-27.2, 18.15 + k * 1.1, -0.34);
      pad.userData.noEdges = true;
      g.add(pad);
    }

    g.add(cuBridge, cuKnee, ntcBead, adcIc);

    parts.push(
      finalizePart(
        'sensor-temp-ntc-board',
        18,
        '#22c55e',
        g,
        new THREE.Vector3(0, 0, -2.55),
        new THREE.Vector3(-36, 14, -44),
        new THREE.Vector3(-44, 18, -50.5),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S19. 5-Axis IBIS Topology-Optimized Magnesium Movable Stage (z = -4.30 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Die-cast AZ91D magnesium carrier plate with shot-blasted die-cast texture & CNC milled datum bosses!
    const carrierShape = createFrameShape(76.0, 62.0, 5.0, 44.0, 32.0, 2.5);
    addCircleHoles(carrierShape, [
      [-33.0, 26.0, 2.2],
      [33.0, 26.0, 2.2],
      [-33.0, -26.0, 2.2],
      [33.0, -26.0, 2.2],
      [-30.5, 21.5, 2.4],
    ]);
    const carrierGeo = extrudeCentered(carrierShape, 1.65, 0.14, 0.14, 24);
    applyPlanarUVs(carrierGeo, 76.0, 62.0, 'xy');
    g.add(new THREE.Mesh(carrierGeo, mats.ultra.sensorMgDieCast));

    // Raised topology-optimized stiffening collar framing central 44x32mm thermal cutout
    const innerRibGeo = extrudeCentered(createFrameShape(47.2, 35.2, 2.6, 44.2, 32.2, 2.5), 0.52, 0.06, 0.06, 18);
    applyBoxUVs(innerRibGeo, 20.0);
    const innerRib = new THREE.Mesh(innerRibGeo, mats.ultra.sensorMgDieCast);
    innerRib.position.z = 0.88;
    g.add(innerRib);

    // Diagonal cast truss stiffening ribs across top/left/right wings (maximizes flexural stiffness/mass)
    const trussSpecs: Array<[number, number, number, number, number]> = [
      [-15.0, 23.8, 12.0, 1.35, 0.35],
      [15.0, 23.8, 12.0, 1.35, -0.35],
      [0.0, 24.8, 22.0, 1.35, 0.0],
      [-30.2, -5.0, 1.35, 22.0, 0.0],
      [-28.5, 9.5, 8.5, 1.35, 0.55],
    ];
    for (const [tx, ty, tw, th, rot] of trussSpecs) {
      const ribGeo = createChamferedBoxGeo(tw, th, 0.45, 0.2, 0.05, 'z');
      applyBoxUVs(ribGeo, 14.0);
      const rib = new THREE.Mesh(ribGeo, mats.ultra.sensorMgDieCast);
      rib.position.set(tx, ty, 0.92);
      rib.rotation.z = rot;
      g.add(rib);
    }

    // 3 CNC-milled bright silver circular ceramic-ball thrust landing pads on rear (-Z) face
    for (const [bx, by] of [
      [0.0, 25.5],
      [-28.5, -18.5],
      [28.5, -18.5],
    ] as Array<[number, number]>) {
      const pad = new THREE.Mesh(
        hiResCyl(3.8, 3.8, 0.16, 18).rotateX(Math.PI / 2),
        mats.ultra.sensorSusSpringSteel
      );
      pad.position.set(bx, by, -0.88);
      pad.userData.noEdges = true;
      g.add(pad);
    }

    // Twin stamped stainless FPC routing guide clips along left/right moving-stage edges
    for (const sx of [-35.2, 35.2]) {
      const clip = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 8.5, 0.65, 0.2, 0.05, 'z'),
        mats.ultra.sensorSusSpringSteel
      );
      clip.position.set(sx, 2.0, 0.85);
      clip.userData.noEdges = true;
      g.add(clip);
    }

    // Tapered brass park-lock receiver bushing seated inside the (-30.5, 21.5) lock hole
    const lockBushing = new THREE.Mesh(
      hiResTorus(2.45, 0.42, 8, 20),
      mats.brassGear
    );
    lockBushing.position.set(-30.5, 21.5, -0.2);
    lockBushing.userData.noEdges = true;
    g.add(lockBushing);

    // 4 CNC-turned stepped stainless sensor-PCB mounting standoffs with flange collars & threaded bores
    for (const [bx, by] of [
      [-24.8, 19.2],
      [24.8, 19.2],
      [-24.8, -19.2],
      [24.8, -19.2],
    ] as Array<[number, number]>) {
      const flange = new THREE.Mesh(
        hiResCyl(2.9, 3.1, 0.42, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      flange.position.set(bx, by, 0.84);
      const boss = new THREE.Mesh(
        hiResCyl(2.15, 2.45, 1.25, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      boss.position.set(bx, by, 1.24);
      const threadHole = new THREE.Mesh(
        hiResCyl(0.95, 0.95, 0.22, 12).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      threadHole.position.set(bx, by, 1.82);
      threadHole.userData.noEdges = true;
      g.add(flange, boss, threadHole);
    }

    parts.push(
      finalizePart(
        'ibis-carrier',
        19,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -4.3),
        new THREE.Vector3(0, 0, -60),
        new THREE.Vector3(0, 0, -61.0),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S20. Dual-Sided IBIS Front Soft-Iron Flux-Closing Yoke Plate (z = -3.35 mm)
  // =========================================================================
  const coilConfigs: Array<{ x: number; y: number; w: number; h: number }> = [
    { x: -16.5, y: -24.0, w: 20.5, h: 9.8 },
    { x: 16.5, y: -24.0, w: 20.5, h: 9.8 },
    { x: 30.8, y: 4.5, w: 9.8, h: 22.0 },
  ];
  {
    const g = new THREE.Group();

    // 3 CNC-chamfered grain-oriented SPCC/Permalloy front flux-closing yoke plates with spot-weld dimples
    for (const cfg of coilConfigs) {
      const yokeGeo = createChamferedBoxGeo(cfg.w + 1.6, cfg.h + 1.6, 0.62, 1.0, 0.10, 'z');
      applyBoxUVs(yokeGeo, 14.0);
      const yokePlate = new THREE.Mesh(yokeGeo, mats.ultra.sensorSoftIronYoke);
      yokePlate.position.set(cfg.x, cfg.y, 0);
      const datum = new THREE.Mesh(
        hiResCyl(0.65, 0.65, 0.14, 12).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      datum.position.set(cfg.x, cfg.y, 0.32);
      datum.userData.noEdges = true;
      // Twin micro spot-weld dimples anchoring yoke laminations
      const horiz = cfg.w > cfg.h;
      for (const s of [-1, 1]) {
        const weld = new THREE.Mesh(
          hiResCyl(0.45, 0.45, 0.12, 10).rotateX(Math.PI / 2),
          mats.titaniumRivet
        );
        weld.position.set(cfg.x + (horiz ? s * 7.2 : 0), cfg.y + (horiz ? 0 : s * 7.2), 0.31);
        weld.userData.noEdges = true;
        g.add(weld);
      }
      g.add(yokePlate, datum);
    }

    // Embossed L-shaped brushed stainless structural tie bridge with stiffening bead ribs
    const tieHGeo = createChamferedBoxGeo(58.0, 2.8, 0.52, 0.5, 0.06, 'z');
    applyBoxUVs(tieHGeo, 16.0);
    const tieH = new THREE.Mesh(tieHGeo, mats.ultra.sensorSusSpringSteel);
    tieH.position.set(5.5, -29.2, 0.12);
    const beadH = new THREE.Mesh(new THREE.BoxGeometry(50.0, 0.85, 0.22), mats.stainlessMachined);
    beadH.position.set(5.5, -29.2, 0.42);
    beadH.userData.noEdges = true;

    const tieVGeo = createChamferedBoxGeo(2.8, 44.0, 0.52, 0.5, 0.06, 'z');
    applyBoxUVs(tieVGeo, 16.0);
    const tieV = new THREE.Mesh(tieVGeo, mats.ultra.sensorSusSpringSteel);
    tieV.position.set(36.2, -8.2, 0.12);
    const beadV = new THREE.Mesh(new THREE.BoxGeometry(0.85, 36.0, 0.22), mats.stainlessMachined);
    beadV.position.set(36.2, -8.2, 0.42);
    beadV.userData.noEdges = true;
    g.add(tieH, beadH, tieV, beadV);

    // 3 stepped precision titanium magnetic-gap standoff pillars with flanged seats & M1.4 cap screws
    for (const [px, py] of [
      [-28.5, -29.2],
      [36.2, -29.2],
      [36.2, 16.5],
    ] as Array<[number, number]>) {
      const pillar = new THREE.Mesh(
        hiResCyl(1.35, 1.35, 3.6, 16).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      pillar.position.set(px, py, -1.8);
      const collar = new THREE.Mesh(
        hiResCyl(1.95, 1.95, 0.42, 16).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      collar.position.set(px, py, -0.35);
      const capScrew = createPrecisionScrew(1.25, 0.42, 1.0, mats.stainlessMachined);
      capScrew.position.set(px, py, 0.42);
      g.add(pillar, collar, capScrew);
    }

    parts.push(
      finalizePart(
        'sensor-front-yoke-plate',
        20,
        '#475569',
        g,
        new THREE.Vector3(0, 0, -3.35),
        new THREE.Vector3(0, 0, -68),
        new THREE.Vector3(0, 0, -64.8),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S21. 3x Independent Air-Core Flat Copper VCM Voice Coils (z = -5.08 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    for (const cfg of coilConfigs) {
      const winding = Math.min(cfg.w, cfg.h) * 0.28;
      // Primary self-bonding rectangular flat copper coil body with orthocyclic strand winding texture
      const coilGeo = createVoiceCoilGeometry(cfg.w, cfg.h, winding, 1.38);
      applyBoxUVs(coilGeo, 9.0);
      const coilMesh = new THREE.Mesh(coilGeo, mats.ultra.sensorVcmCopperWinding);
      coilMesh.position.set(cfg.x, cfg.y, 0);
      g.add(coilMesh);

      // Stepped inner orthocyclic winding layer for crisp multi-turn depth & specular catch
      const innerGeo = createVoiceCoilGeometry(cfg.w - 0.9, cfg.h - 0.9, winding * 0.58, 1.44);
      applyBoxUVs(innerGeo, 9.0);
      const innerLayer = new THREE.Mesh(innerGeo, mats.ultra.sensorVcmCopperWinding);
      innerLayer.position.set(cfg.x, cfg.y, 0);
      innerLayer.userData.noEdges = true;
      g.add(innerLayer);

      // Amber Kapton polyimide orthocyclic winding tie-wrap stabilization bands clamping long coil limbs
      const isHoriz = cfg.w > cfg.h;
      for (const sideSign of [-1, 1]) {
        const band = new THREE.Mesh(
          isHoriz
            ? createChamferedBoxGeo(1.45, winding * 1.08, 1.50, 0.14, 0.03, 'z')
            : createChamferedBoxGeo(winding * 1.08, 1.45, 1.50, 0.14, 0.03, 'z'),
          mats.polyimideFpc
        );
        const bx = isHoriz ? cfg.x + sideSign * (cfg.w * 0.22) : cfg.x + sideSign * (cfg.w * 0.36);
        const by = isHoriz ? cfg.y + sideSign * (cfg.h * 0.36) : cfg.y + sideSign * (cfg.h * 0.22);
        band.position.set(bx, by, 0);
        band.userData.noEdges = true;
        g.add(band);
      }

      // Dual gold solder termination lands + silver solder fillets + insulated enamel wire lead-outs
      const padY = cfg.y + (cfg.h > cfg.w ? -cfg.h * 0.45 : cfg.h * 0.45);
      const pad = new THREE.Mesh(
        createChamferedBoxGeo(2.9, 1.4, 0.30, 0.18, 0.04, 'z'),
        mats.goldPlating
      );
      pad.position.set(cfg.x, padY, -0.72);
      g.add(pad);

      for (const sx of [-0.75, 0.75]) {
        const fillet = new THREE.Mesh(hiResSphere(0.34, 8, 6), mats.solderBallSilver);
        fillet.scale.set(1.2, 0.9, 0.55);
        fillet.position.set(cfg.x + sx, padY, -0.86);
        fillet.userData.noEdges = true;
        const wireLead = new THREE.Mesh(
          hiResCyl(0.12, 0.12, 1.25, 8).rotateX(Math.PI / 2),
          mats.copperHeatSpreader
        );
        wireLead.position.set(cfg.x + sx, padY, -0.22);
        wireLead.userData.noEdges = true;
        g.add(fillet, wireLead);
      }
    }

    // Contoured polyimide high-current VCM power bus with rolled copper trace ridges & gold strain-relief rivets
    const busBottom = new THREE.Mesh(
      createChamferedBoxGeo(58.0, 2.2, 0.22, 0.4, 0.03, 'z'),
      mats.polyimideFpc
    );
    busBottom.position.set(4.5, -18.2, -0.72);
    const traceBottom = new THREE.Mesh(new THREE.BoxGeometry(55.0, 0.9, 0.08), mats.copperHeatSpreader);
    traceBottom.position.set(4.5, -18.2, -0.84);
    traceBottom.userData.noEdges = true;

    const busRight = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 24.0, 0.22, 0.4, 0.03, 'z'),
      mats.polyimideFpc
    );
    busRight.position.set(32.4, -7.2, -0.72);
    const traceRight = new THREE.Mesh(new THREE.BoxGeometry(0.9, 22.0, 0.08), mats.copperHeatSpreader);
    traceRight.position.set(32.4, -7.2, -0.84);
    traceRight.userData.noEdges = true;
    g.add(busBottom, traceBottom, busRight, traceRight);

    parts.push(
      finalizePart(
        'sensor-vcm-coils',
        21,
        '#c86432',
        g,
        new THREE.Vector3(0, 0, -5.08),
        new THREE.Vector3(0, 0, -76),
        new THREE.Vector3(0, 0, -68.4),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S22. 3-Axis Sub-Micron Hall-Effect Position Sensor PCB & ICs (z = -5.05 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Contoured L-shaped emerald rigid-flex Hall feedback circuit with bespoke silkscreen & gold trace texture
    const traceHGeo = createChamferedBoxGeo(49.5, 2.4, 0.28, 0.4, 0.03, 'z');
    applyBoxUVs(traceHGeo, 14.0);
    const traceH = new THREE.Mesh(traceHGeo, mats.ultra.sensorHallSubPcb);
    traceH.position.set(7.5, -24.0, 0.35);

    const traceVGeo = createChamferedBoxGeo(2.4, 30.0, 0.28, 0.4, 0.03, 'z');
    applyBoxUVs(traceVGeo, 14.0);
    const traceV = new THREE.Mesh(traceVGeo, mats.ultra.sensorHallSubPcb);
    traceV.position.set(30.8, -9.8, 0.35);
    g.add(traceH, traceV);

    // 3 Precision DFN Hall-effect magnetic position sensor ICs centered inside each VCM coil window + 0402 RC & EMI beads + ENIG TP domes
    for (const cfg of coilConfigs) {
      const hallIc = buildChipPackage({
        w: 2.8,
        d: 2.8,
        h: 0.74,
        style: 'dfn',
        pinsPerSide: 4,
        bodyMat: mats.ultra.icEpoxyLaser,
        leadMat: mats.goldPlating,
        pin1Mat: mats.goldPlating,
        axis: 'z',
      });
      hallIc.position.set(cfg.x, cfg.y, 0);
      g.add(hallIc);

      const cap = buildSmdPassive(1.1, 0.62, 0.45, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(cfg.x + 2.45, cfg.y, 0.22);
      const emiBead = buildSmdPassive(1.0, 0.56, 0.44, mats.ferriteInductor, mats.solderBallSilver, 'z');
      emiBead.position.set(cfg.x - 2.45, cfg.y, 0.22);
      const tpDome = new THREE.Mesh(hiResCyl(0.36, 0.36, 0.14, 10).rotateX(Math.PI / 2), mats.goldPlating);
      tpDome.position.set(cfg.x + 3.8, cfg.y, 0.46);
      tpDome.userData.noEdges = true;
      g.add(cap, emiBead, tpDome);
    }

    // 3-channel low-noise differential Hall instrumentation amplifier QFN IC + twin feedback passives
    const ampIc = buildChipPackage({
      w: 4.2,
      d: 4.2,
      h: 0.82,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    ampIc.position.set(30.8, 16.5, 0.42);
    g.add(ampIc);

    for (const dy of [-3.1, 3.1]) {
      const ampCap = buildSmdPassive(1.0, 0.56, 0.42, mats.smdCeramic, mats.solderBallSilver, 'z');
      ampCap.position.set(30.8, 16.5 + dy, 0.44);
      g.add(ampCap);
    }

    // Polyimide ZIF flex tail + blue FR-4 backing stiffener with ZIF retention ears + 8-pin ENIG gold contact finger comb
    const zifTail = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 12.0, 0.26, 0.3, 0.03, 'z'),
      mats.polyimideFpc
    );
    zifTail.position.set(30.8, 23.0, 0.35);
    const zifStiff = new THREE.Mesh(
      createChamferedBoxGeo(6.2, 3.6, 0.22, 0.2, 0.03, 'z'),
      mats.mountShimBlue
    );
    zifStiff.position.set(30.8, 27.6, 0.14);
    g.add(zifTail, zifStiff);

    for (let k = 0; k < 8; k++) {
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.42, 2.3, 0.12), mats.goldPlating);
      finger.position.set(30.8 - 2.1 + k * 0.6, 28.0, 0.48);
      finger.userData.noEdges = true;
      g.add(finger);
    }

    parts.push(
      finalizePart(
        'sensor-hall-pcb',
        22,
        '#16a34a',
        g,
        new THREE.Vector3(0, 0, -5.05),
        new THREE.Vector3(0, 30, -76),
        new THREE.Vector3(0, 42, -68.4),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S23. 3-Point Si3N4 Ceramic Ball Bearings & Hardened Races (z = -5.70 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const ballPositions: Array<[number, number]> = [
      [0.0, 25.5],
      [-28.5, -18.5],
      [28.5, -18.5],
    ];

    const raceBodyGeo = hiResCyl(3.8, 3.95, 0.36, 24).rotateX(Math.PI / 2);
    applyBoxUVs(raceBodyGeo, 8.0);
    const raceLipGeo = hiResTorus(3.55, 0.20, 8, 24);
    const greaseMeniscusGeo = hiResTorus(1.12, 0.24, 8, 20);

    for (const [bx, by] of ballPositions) {
      // Grade-3 mirror-lapped Silicon Nitride (Si3N4) dark ceramic sphere + dual PFPE fluorinated grease menisci
      const ball = new THREE.Mesh(hiResSphere(1.38, 24, 18), mats.siliconNitrideBall);
      ball.position.set(bx, by, 0);
      ball.userData.noEdges = true;
      g.add(ball);

      for (const gz of [-0.95, 0.95]) {
        const meniscus = new THREE.Mesh(greaseMeniscusGeo, mats.opticalCementClear);
        meniscus.position.set(bx, by, gz);
        meniscus.userData.noEdges = true;
        g.add(meniscus);
      }

      // Stepped hardened cold-rolled SUS440C upper & lower planar thrust race discs with lapped wear track
      const upperRace = new THREE.Mesh(raceBodyGeo, mats.ultra.sensorSusSpringSteel);
      upperRace.position.set(bx, by, 1.48);
      const upperLip = new THREE.Mesh(raceLipGeo, mats.stainlessMachined);
      upperLip.position.set(bx, by, 1.32);
      upperLip.userData.noEdges = true;
      const upperTrack = new THREE.Mesh(hiResTorus(1.85, 0.08, 6, 20), mats.silverElectrode);
      upperTrack.position.set(bx, by, 1.29);
      upperTrack.userData.noEdges = true;

      const lowerRace = new THREE.Mesh(raceBodyGeo, mats.ultra.sensorSusSpringSteel);
      lowerRace.position.set(bx, by, -1.48);
      const lowerLip = new THREE.Mesh(raceLipGeo, mats.stainlessMachined);
      lowerLip.position.set(bx, by, -1.32);
      lowerLip.userData.noEdges = true;
      const lowerTrack = new THREE.Mesh(hiResTorus(1.85, 0.08, 6, 20), mats.silverElectrode);
      lowerTrack.position.set(bx, by, -1.29);
      lowerTrack.userData.noEdges = true;

      // Slotted low-friction POM annular anti-escape ball collar
      const retainerRing = new THREE.Mesh(hiResTorus(3.55, 0.32, 10, 28), mats.matteBlackAnodized);
      retainerRing.position.set(bx, by, -1.08);
      retainerRing.userData.noEdges = true;
      g.add(upperRace, upperLip, upperTrack, lowerRace, lowerLip, lowerTrack, retainerRing);
    }

    parts.push(
      finalizePart(
        'ceramic-balls',
        23,
        '#2c3240',
        g,
        new THREE.Vector3(0, 0, -5.7),
        new THREE.Vector3(0, 0, -86),
        new THREE.Vector3(0, 0, -73.8),
        cp,
        { ibisMovable: false, edgeOpacity: 0.25 }
      )
    );
  }

  // =========================================================================
  // S24. Magnetic Preload Ferromagnetic Plates & CuW Counterweight (z = -4.75 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const preloadPositions: Array<[number, number, number, number]> = [
      [-16.5, -24.0, 14.2, 5.4],
      [16.5, -24.0, 14.2, 5.4],
      [30.8, 4.5, 5.4, 14.2],
    ];
    for (const [px, py, pw, ph] of preloadPositions) {
      // Chamfered grain-oriented SPCC magnetic preload plate with locating dowel pins
      const plateGeo = createChamferedBoxGeo(pw, ph, 0.55, 0.65, 0.08, 'z');
      applyBoxUVs(plateGeo, 12.0);
      const plate = new THREE.Mesh(plateGeo, mats.ultra.sensorSoftIronYoke);
      plate.position.set(px, py, 0);
      const horiz = pw > ph;
      for (const s of [-1, 1]) {
        const pin = new THREE.Mesh(
          hiResCyl(0.45, 0.45, 0.62, 10).rotateX(Math.PI / 2),
          mats.stainlessMachined
        );
        pin.position.set(px + (horiz ? s * 4.8 : 0), py + (horiz ? 0 : s * 4.8), 0);
        pin.userData.noEdges = true;
        g.add(pin);
      }
      g.add(plate);
    }

    // CNC-milled sintered CuW80 dynamic-balance counterweight with CG datum crosshairs & twin M1.4 lock screws
    const weightGeo = createChamferedBoxGeo(6.8, 18.0, 1.2, 0.9, 0.14, 'z');
    applyBoxUVs(weightGeo, 12.0);
    const balanceWeight = new THREE.Mesh(weightGeo, mats.ultra.sensorCuWAlloySinter);
    balanceWeight.position.set(-30.8, 4.5, 0);
    const cgGrooveH = new THREE.Mesh(new THREE.BoxGeometry(6.9, 0.50, 0.24), mats.goldPlating);
    cgGrooveH.position.set(-30.8, 4.5, 0.56);
    cgGrooveH.userData.noEdges = true;
    const cgGrooveV = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.2, 0.24), mats.goldPlating);
    cgGrooveV.position.set(-30.8, 4.5, 0.56);
    cgGrooveV.userData.noEdges = true;
    g.add(balanceWeight, cgGrooveH, cgGrooveV);

    for (const sy of [-6.0, 6.0]) {
      const recess = new THREE.Mesh(
        hiResCyl(1.62, 1.62, 0.18, 14).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      recess.position.set(-30.8, 4.5 + sy, 0.58);
      recess.userData.noEdges = true;
      const belleville = new THREE.Mesh(hiResTorus(1.38, 0.16, 6, 16), mats.brassGear);
      belleville.position.set(-30.8, 4.5 + sy, 0.62);
      belleville.userData.noEdges = true;
      const sc = createPrecisionScrew(1.2, 0.45, 1.3, mats.stainlessMachined);
      sc.position.set(-30.8, 4.5 + sy, 0.64);
      g.add(recess, belleville, sc);
    }

    parts.push(
      finalizePart(
        'sensor-preload-plates',
        24,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -4.75),
        new THREE.Vector3(0, -32, -86),
        new THREE.Vector3(0, -40, -74.5),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S25. 4-Corner Progressive Elastomer IBIS Travel-Limit Stoppers (z = -5.85 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const stopperCorners: Array<[number, number]> = [
      [-37.5, 25.0],
      [37.5, 25.0],
      [-37.5, -25.0],
      [37.5, -25.0],
    ];
    for (const [sx, sy] of stopperCorners) {
      // Stepped stainless steel core shaft with base retaining flange & front retention C-clip collar
      const flange = new THREE.Mesh(
        hiResCyl(2.2, 2.4, 0.42, 16).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      flange.position.set(sx, sy, -1.55);
      const post = new THREE.Mesh(
        hiResCyl(1.05, 1.15, 3.6, 16).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      post.position.set(sx, sy, 0);
      const lockCollar = new THREE.Mesh(hiResTorus(1.18, 0.18, 8, 18), mats.titaniumRivet);
      lockCollar.position.set(sx, sy, 1.72);
      lockCollar.userData.noEdges = true;
      // Tapered progressive Shore-A45 elastomer sleeve with 3 progressive crush rings
      const bumper = new THREE.Mesh(
        hiResCyl(2.05, 2.75, 2.4, 20).rotateX(Math.PI / 2),
        mats.damperElastomer
      );
      bumper.position.set(sx, sy, 0.55);
      const lipFront = new THREE.Mesh(hiResTorus(2.22, 0.34, 8, 20), mats.antiVibRubber);
      lipFront.position.set(sx, sy, 1.42);
      lipFront.userData.noEdges = true;
      const lipMid = new THREE.Mesh(hiResTorus(2.50, 0.34, 8, 20), mats.antiVibRubber);
      lipMid.position.set(sx, sy, 0.55);
      lipMid.userData.noEdges = true;
      const lipRear = new THREE.Mesh(hiResTorus(2.74, 0.32, 8, 20), mats.antiVibRubber);
      lipRear.position.set(sx, sy, -0.32);
      lipRear.userData.noEdges = true;
      g.add(flange, post, lockCollar, bumper, lipFront, lipMid, lipRear);
    }

    parts.push(
      finalizePart(
        'sensor-ibis-stopper-bumper',
        25,
        '#ef4444',
        g,
        new THREE.Vector3(0, 0, -5.85),
        new THREE.Vector3(34, -22, -86),
        new THREE.Vector3(44, -28, -76.5),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S26. Power-Off Mechanical IBIS Park-Lock Solenoid & Latch Arm (z = -6.10 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Orthocyclically wound copper micro-solenoid drive coil on dual-flanged black LCP bobbin
    const solCoilGeo = hiResCyl(2.45, 2.45, 5.6, 20).rotateZ(Math.PI / 2);
    applyBoxUVs(solCoilGeo, 7.0);
    const solCoil = new THREE.Mesh(solCoilGeo, mats.ultra.sensorVcmCopperWinding);
    solCoil.position.set(-4.2, 0, 0);
    g.add(solCoil);

    for (const fx of [-7.0, -1.4]) {
      const flange = new THREE.Mesh(
        hiResCyl(2.85, 2.85, 0.42, 20).rotateZ(Math.PI / 2),
        mats.matteBlackAnodized
      );
      flange.position.set(fx, 0, 0);
      g.add(flange);
    }

    // Open-sided U-channel brushed soft-iron magnetic stator yoke frame (exposes copper windings!)
    const yokeRearGeo = createChamferedBoxGeo(7.8, 6.0, 0.72, 0.3, 0.08, 'z');
    applyBoxUVs(yokeRearGeo, 10.0);
    const yokeRear = new THREE.Mesh(yokeRearGeo, mats.ultra.sensorSoftIronYoke);
    yokeRear.position.set(-4.2, 0, -2.5);
    for (const sy of [-2.85, 2.85]) {
      const cheekGeo = createChamferedBoxGeo(7.8, 0.62, 4.4, 0.2, 0.06, 'z');
      applyBoxUVs(cheekGeo, 10.0);
      const cheek = new THREE.Mesh(cheekGeo, mats.ultra.sensorSoftIronYoke);
      cheek.position.set(-4.2, sy, -0.5);
      g.add(cheek);
    }
    g.add(yokeRear);

    // Moving stainless armature plunger + helical brass return spring
    const plunger = new THREE.Mesh(
      hiResCyl(0.85, 0.85, 4.4, 14).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    plunger.position.set(0.4, 0, 0);
    const retSpring = new THREE.Mesh(
      createHelicalSpringGeometry(1.15, 4.2, 6, 0.24).rotateY(Math.PI / 2),
      mats.brassGear
    );
    retSpring.position.set(1.2, 0, 0);
    retSpring.userData.noEdges = true;
    g.add(plunger, retSpring);

    // Sculpted chamfered stainless pivot latch arm + pivot pin with retaining E-clip ring
    const latchArm = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 2.4, 1.35, 0.8, 0.14, 'z'),
      mats.mountStainlessFlange
    );
    latchArm.position.set(3.4, 0, 0.4);
    const pivotPin = new THREE.Mesh(
      hiResCyl(0.75, 0.75, 2.2, 14).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    pivotPin.position.set(5.8, 0, 0.4);
    pivotPin.userData.noEdges = true;
    const eClip = new THREE.Mesh(hiResTorus(0.92, 0.14, 6, 16), mats.stainlessMachined);
    eClip.position.set(5.8, 0, 1.42);
    eClip.userData.noEdges = true;
    g.add(latchArm, pivotPin, eClip);

    // Tapered machined brass centering park-lock pin with chamfered conical tip, wear collar & flange base
    const parkBase = new THREE.Mesh(
      hiResCyl(2.2, 2.2, 0.55, 18).rotateX(Math.PI / 2),
      mats.brassGear
    );
    parkBase.position.set(0.0, 0.0, 0.62);
    const parkPin = new THREE.Mesh(
      hiResCyl(1.35, 2.05, 2.8, 18).rotateX(Math.PI / 2),
      mats.brassGear
    );
    parkPin.position.set(0.0, 0.0, 2.05);
    const tipCollar = new THREE.Mesh(hiResTorus(1.42, 0.12, 6, 16), mats.stainlessMachined);
    tipCollar.position.set(0.0, 0.0, 3.22);
    tipCollar.userData.noEdges = true;
    g.add(parkBase, parkPin, tipCollar);

    // Polyimide drive flex tail with twin gold coil-solder terminal pads & SAC305 solder fillets
    const solFpc = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 9.0, 0.28, 0.3, 0.03, 'z'),
      mats.polyimideFpc
    );
    solFpc.position.set(-6.5, -5.5, -0.5);
    for (const px of [-7.2, -5.8]) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.4, 0.18), mats.goldPlating);
      sp.position.set(px, -2.6, -0.32);
      sp.userData.noEdges = true;
      const bead = new THREE.Mesh(hiResSphere(0.28, 8, 6), mats.solderBallSilver);
      bead.scale.set(1.1, 1.3, 0.5);
      bead.position.set(px, -2.5, -0.22);
      bead.userData.noEdges = true;
      g.add(sp, bead);
    }
    g.add(solFpc);

    parts.push(
      finalizePart(
        'sensor-ibis-lock',
        26,
        '#f59e0b',
        g,
        new THREE.Vector3(-30.5, 21.5, -6.1),
        new THREE.Vector3(-28, 24, -96),
        new THREE.Vector3(-46, 34, -79.5),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S27. 3x Dual-Pole N52 Neodymium Magnet Arrays & Back Yokes (z = -6.05 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const magConfigs: Array<{ x: number; y: number; w: number; h: number; vertical: boolean }> = [
      { x: -16.5, y: -24.0, w: 22.0, h: 11.2, vertical: false },
      { x: 16.5, y: -24.0, w: 22.0, h: 11.2, vertical: false },
      { x: 30.8, y: 4.5, w: 11.2, h: 23.5, vertical: true },
    ];

    for (const mc of magConfigs) {
      // Stepped brushed soft-iron back-yoke cradle with magnetic-pole alignment pins
      const yokeGeo = createChamferedBoxGeo(mc.w + 1.4, mc.h + 1.4, 0.9, 0.8, 0.10, 'z');
      applyBoxUVs(yokeGeo, 14.0);
      const yoke = new THREE.Mesh(yokeGeo, mats.ultra.sensorSoftIronYoke);
      yoke.position.set(mc.x, mc.y, -0.3);
      g.add(yoke);

      for (const endSign of [-1, 1]) {
        const pin = new THREE.Mesh(
          hiResCyl(0.45, 0.45, 1.35, 10).rotateX(Math.PI / 2),
          mats.stainlessMachined
        );
        pin.position.set(
          mc.x + (!mc.vertical ? endSign * (mc.w * 0.5 + 0.25) : 0),
          mc.y + (mc.vertical ? endSign * (mc.h * 0.5 + 0.25) : 0),
          0.18
        );
        pin.userData.noEdges = true;
        g.add(pin);
      }

      if (!mc.vertical) {
        const halfH = mc.h * 0.455;
        // N-pole & S-pole chamfered Ni-Cu-Ni plated N52 blocks + crisp neutral-zone seam + subtle N/S polarity stripes
        const m1 = new THREE.Mesh(
          createChamferedBoxGeo(mc.w - 0.6, halfH, 1.25, 0.45, 0.10, 'z'),
          mats.neodymiumMagnet
        );
        m1.position.set(mc.x, mc.y + halfH * 0.56, 0.5);
        const nStripe = new THREE.Mesh(new THREE.BoxGeometry(mc.w - 2.4, 0.55, 0.08), mats.mountRedIndexDot);
        nStripe.position.set(mc.x, mc.y + halfH * 0.92, 1.13);
        nStripe.userData.noEdges = true;

        const m2 = new THREE.Mesh(
          createChamferedBoxGeo(mc.w - 0.6, halfH, 1.25, 0.45, 0.10, 'z'),
          mats.neodymiumMagnet
        );
        m2.position.set(mc.x, mc.y - halfH * 0.56, 0.5);
        const sStripe = new THREE.Mesh(new THREE.BoxGeometry(mc.w - 2.4, 0.55, 0.08), mats.mountThreadLockBlue);
        sStripe.position.set(mc.x, mc.y - halfH * 0.92, 1.13);
        sStripe.userData.noEdges = true;

        const neutralBar = new THREE.Mesh(new THREE.BoxGeometry(mc.w - 0.8, 0.42, 1.05), mats.matteBlackAnodized);
        neutralBar.position.set(mc.x, mc.y, 0.44);
        neutralBar.userData.noEdges = true;
        g.add(m1, m2, nStripe, sStripe, neutralBar);
      } else {
        const halfW = mc.w * 0.455;
        const m1 = new THREE.Mesh(
          createChamferedBoxGeo(halfW, mc.h - 0.6, 1.25, 0.45, 0.10, 'z'),
          mats.neodymiumMagnet
        );
        m1.position.set(mc.x - halfW * 0.56, mc.y, 0.5);
        const nStripe = new THREE.Mesh(new THREE.BoxGeometry(0.55, mc.h - 2.4, 0.08), mats.mountRedIndexDot);
        nStripe.position.set(mc.x - halfW * 0.92, mc.y, 1.13);
        nStripe.userData.noEdges = true;

        const m2 = new THREE.Mesh(
          createChamferedBoxGeo(halfW, mc.h - 0.6, 1.25, 0.45, 0.10, 'z'),
          mats.neodymiumMagnet
        );
        m2.position.set(mc.x + halfW * 0.56, mc.y, 0.5);
        const sStripe = new THREE.Mesh(new THREE.BoxGeometry(0.55, mc.h - 2.4, 0.08), mats.mountThreadLockBlue);
        sStripe.position.set(mc.x + halfW * 0.92, mc.y, 1.13);
        sStripe.userData.noEdges = true;

        const neutralBar = new THREE.Mesh(new THREE.BoxGeometry(0.42, mc.h - 0.8, 1.05), mats.matteBlackAnodized);
        neutralBar.position.set(mc.x, mc.y, 0.44);
        neutralBar.userData.noEdges = true;
        g.add(m1, m2, nStripe, sStripe, neutralBar);
      }
    }

    parts.push(
      finalizePart(
        'sensor-n52-magnets',
        27,
        '#3b82f6',
        g,
        new THREE.Vector3(0, 0, -6.05),
        new THREE.Vector3(0, 0, -98),
        new THREE.Vector3(0, 0, -80.5),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S28. Stationary Rigid Magnesium IBIS Base Chassis (z = -7.40 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Shot-blasted AZ91D die-cast magnesium IBIS baseplate with planar rear casting markings & CNC milled pads
    const baseShape = createFrameShape(82.0, 68.0, 6.0, 38.0, 28.0, 3.0);
    addCircleHoles(baseShape, [
      [-36.0, 29.0, 2.1],
      [36.0, 29.0, 2.1],
      [0.0, -30.5, 2.1],
    ]);
    const baseGeo = extrudeCentered(baseShape, 1.9, 0.16, 0.16, 24);
    applyPlanarUVs(baseGeo, 82.0, 68.0, 'xy-back');
    g.add(new THREE.Mesh(baseGeo, mats.ultra.sensorMgDieCast));

    // Raised structural stiffening flange collar around the central thermal window
    const winCollarGeo = extrudeCentered(
      createFrameShape(42.2, 32.2, 3.4, 38.2, 28.2, 3.0),
      0.56,
      0.08,
      0.08,
      18
    );
    applyBoxUVs(winCollarGeo, 18.0);
    const winCollar = new THREE.Mesh(winCollarGeo, mats.ultra.sensorMgDieCast);
    winCollar.position.z = -1.05;
    g.add(winCollar);

    // 3 Front (+Z) & Rear (-Z) CNC-machined bright stainless tripod calibration boss rings with counterbored seating pads
    const bossRingGeo = extrudeCentered(
      createFrameShape(9.4, 9.4, 4.7, 4.4, 4.4, 2.2),
      0.55,
      0.06,
      0.06,
      18
    );
    for (const [cx, cy] of [
      [-36.0, 29.0],
      [36.0, 29.0],
      [0.0, -30.5],
    ] as Array<[number, number]>) {
      const bossFront = new THREE.Mesh(bossRingGeo, mats.stainlessMachined);
      bossFront.position.set(cx, cy, 1.05);
      const bossRear = new THREE.Mesh(bossRingGeo, mats.stainlessMachined);
      bossRear.position.set(cx, cy, -1.05);
      g.add(bossFront, bossRear);
    }

    // 4 Pressed-in knurled brass M1.7 helicoil thread inserts around the rear thermal window flange
    for (const [hx, hy] of [
      [-23.5, 17.5],
      [23.5, 17.5],
      [-23.5, -17.5],
      [23.5, -17.5],
    ] as Array<[number, number]>) {
      const insertRing = new THREE.Mesh(hiResTorus(1.45, 0.36, 8, 18), mats.brassGear);
      insertRing.position.set(hx, hy, -1.02);
      insertRing.userData.noEdges = true;
      const bore = new THREE.Mesh(
        hiResCyl(1.05, 1.05, 0.35, 14).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      bore.position.set(hx, hy, -1.04);
      bore.userData.noEdges = true;
      g.add(insertRing, bore);
    }

    // 3 circular recessed ceramic-ball bearing seat cups on +Z face aligned with S23 ball positions
    for (const [bx, by] of [
      [0.0, 25.5],
      [-28.5, -18.5],
      [28.5, -18.5],
    ] as Array<[number, number]>) {
      const cup = new THREE.Mesh(hiResTorus(4.05, 0.38, 8, 22), mats.ultra.sensorMgDieCast);
      cup.position.set(bx, by, 0.96);
      cup.userData.noEdges = true;
      g.add(cup);
    }

    // Cast structural horizontal & diagonal truss stiffening ribs across rear (-Z) face
    for (const [rx, ry, rw, rh, rot] of [
      [-26.0, 12.0, 14.0, 1.8, 0],
      [26.0, 18.0, 14.0, 1.8, 0],
      [-24.0, -24.0, 16.0, 1.8, 0],
      [24.0, -24.0, 16.0, 1.8, 0],
      [-29.5, 22.0, 11.5, 1.4, -0.58],
      [29.5, 22.0, 11.5, 1.4, 0.58],
      [-29.0, -7.5, 11.0, 1.4, 0.45],
      [29.0, -7.5, 11.0, 1.4, -0.45],
      [-13.5, -26.5, 12.0, 1.4, -0.42],
      [13.5, -26.5, 12.0, 1.4, 0.42],
    ] as Array<[number, number, number, number, number]>) {
      const ribGeo = createChamferedBoxGeo(rw, rh, 0.56, 0.3, 0.06, 'z');
      applyBoxUVs(ribGeo, 14.0);
      const rib = new THREE.Mesh(ribGeo, mats.ultra.sensorMgDieCast);
      rib.position.set(rx, ry, -1.06);
      rib.rotation.z = rot;
      g.add(rib);
    }

    // 6 Circular die-casting ejector-pin boss rings on rear Mg surface (authentic Sony high-pressure die-cast!)
    for (const [ex, ey] of [
      [-34.0, 4.0],
      [34.0, 4.0],
      [-34.0, -14.0],
      [34.0, -14.0],
      [-12.0, 26.5],
      [12.0, 26.5],
    ] as Array<[number, number]>) {
      const ejPin = new THREE.Mesh(hiResTorus(1.15, 0.16, 6, 16), mats.titaniumRivet);
      ejPin.position.set(ex, ey, -0.98);
      ejPin.userData.noEdges = true;
      g.add(ejPin);
    }

    parts.push(
      finalizePart(
        'ibis-base-magnets',
        28,
        '#96a0ae',
        g,
        new THREE.Vector3(0, 0, -7.4),
        new THREE.Vector3(0, 0, -109),
        new THREE.Vector3(0, 0, -86.2),
        cp,
        { ibisMovable: false, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S29. 3-Point Micron Flange-Back Tilt Calibration Springs & Bolts (z = -7.40 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const calibPts: Array<[number, number]> = [
      [-36.0, 29.0],
      [36.0, 29.0],
      [0.0, -30.5],
    ];
    for (const [cx, cy] of calibPts) {
      // Multi-turn helical SUS304 compression spring with ground end-seat collars
      const spring = new THREE.Mesh(
        createHelicalSpringGeometry(3.1, 5.2, 6.0, 0.38),
        mats.stainlessMachined
      );
      spring.position.set(cx, cy, 3.2);
      spring.userData.noEdges = true;
      g.add(spring);

      // Precision coaxial alignment guide sleeve + knurled stainless lock collar + stepped brass thrust washer
      const guideSleeve = new THREE.Mesh(
        hiResCyl(2.25, 2.25, 3.8, 16).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      guideSleeve.position.set(cx, cy, 3.1);
      guideSleeve.userData.noEdges = true;

      const knurlCollar = new THREE.Mesh(hiResTorus(2.45, 0.24, 8, 20), mats.ultra.sensorSusSpringSteel);
      knurlCollar.position.set(cx, cy, 1.55);
      knurlCollar.userData.noEdges = true;

      const washer = new THREE.Mesh(
        hiResCyl(3.7, 3.7, 0.45, 22).rotateX(Math.PI / 2),
        mats.brassGear
      );
      washer.position.set(cx, cy, 1.25);

      const topSeat = new THREE.Mesh(
        hiResCyl(3.5, 3.5, 0.32, 20).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      topSeat.position.set(cx, cy, 5.72);
      topSeat.userData.noEdges = true;

      // Micro tension wave washer seated right under bolt flange head
      const waveWasher = new THREE.Mesh(hiResTorus(2.45, 0.16, 6, 18), mats.copperHeatSpreader);
      waveWasher.position.set(cx, cy, -0.58);
      waveWasher.userData.noEdges = true;

      const screw = createPrecisionScrew(2.2, 0.85, 7.0, mats.stainlessMachined);
      screw.position.set(cx, cy, -1.0);
      screw.rotation.y = Math.PI;
      g.add(guideSleeve, knurlCollar, washer, topSeat, waveWasher, screw);
    }

    parts.push(
      finalizePart(
        'sensor-tilt-springs',
        29,
        '#ca8a04',
        g,
        new THREE.Vector3(0, 0, -7.4),
        new THREE.Vector3(0, 0, -120),
        new THREE.Vector3(0, 0, -91.8),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S30. High-Conductivity Silicone TIM Thermal Interface Pad (z = -3.75 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Compliant fiberglass-reinforced silicone TIM pad with 45-deg diamond-waffle texture & peel-tab ear
    const timShape = createRoundedRectShape(28.0, 20.0, 1.6);
    const timGeo = extrudeCentered(timShape, 1.05, 0.14, 0.14, 16);
    applyBoxUVs(timGeo, 10.0);
    const timPad = new THREE.Mesh(timGeo, mats.ultra.sensorTimSiliconeWaffle);
    g.add(timPad);

    const peelTab = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 5.2, 0.48, 0.7, 0.06, 'z'),
      mats.thermalPadBlue
    );
    peelTab.position.set(14.8, 5.8, 0);
    const peelGrip = new THREE.Mesh(
      createChamferedBoxGeo(1.1, 3.2, 0.56, 0.2, 0.03, 'z'),
      mats.mylarInsulatorFilm
    );
    peelGrip.position.set(15.6, 5.8, 0);
    peelGrip.userData.noEdges = true;
    g.add(peelTab, peelGrip);

    // Dual-sided molded diamond/waffle air-bleed micro-grid pads preventing trapped air pockets
    const dimpleGeo = new THREE.BoxGeometry(2.6, 2.2, 0.14);
    applyBoxUVs(dimpleGeo, 10.0);
    const dimples = new THREE.InstancedMesh(dimpleGeo, mats.ultra.sensorTimSiliconeWaffle, 48);
    let di = 0;
    for (const sz of [0.55, -0.55]) {
      for (let ix = 0; ix < 6; ix++) {
        for (let iy = 0; iy < 4; iy++) {
          dummy.position.set(-10.0 + ix * 4.0, -6.0 + iy * 4.0, sz);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          dimples.setMatrixAt(di++, dummy.matrix);
        }
      }
    }
    dimples.instanceMatrix.needsUpdate = true;
    dimples.userData.noEdges = true;
    g.add(dimples);

    parts.push(
      finalizePart(
        'sensor-tim-pad',
        30,
        '#60a5fa',
        g,
        new THREE.Vector3(0, 0, -3.75),
        new THREE.Vector3(0, 0, -131),
        new THREE.Vector3(0, 0, -96.8),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S31. Σ-Folded Pyrolytic Graphite Thermal Bridge Sheet (z = -7.30 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const width = 26.0;
    const thick = 0.36;
    const pts: Array<[number, number]> = [
      [0.0, 2.9],
      [0.0, 1.8],
      [7.5, 1.1],
      [8.6, 0.1],
      [6.8, -0.7],
      [-7.2, -1.2],
      [-8.6, -2.0],
      [-6.6, -2.75],
      [0.0, -2.85],
    ];
    const curve = new THREE.SplineCurve(pts.map(([y, z]) => new THREE.Vector2(y, z)));
    const samples = curve.getPoints(44);
    const upper: THREE.Vector2[] = [];
    const lower: THREE.Vector2[] = [];
    for (let i = 0; i < samples.length; i++) {
      const prev = samples[Math.max(0, i - 1)];
      const next = samples[Math.min(samples.length - 1, i + 1)];
      const t = new THREE.Vector2().subVectors(next, prev).normalize();
      const n = new THREE.Vector2(-t.y, t.x);
      upper.push(samples[i].clone().addScaledVector(n, thick * 0.5));
      lower.push(samples[i].clone().addScaledVector(n, -thick * 0.5));
    }

    const shapeZY = new THREE.Shape();
    shapeZY.moveTo(upper[0].y, upper[0].x);
    for (let i = 1; i < upper.length; i++) shapeZY.lineTo(upper[i].y, upper[i].x);
    for (let i = lower.length - 1; i >= 0; i--) shapeZY.lineTo(lower[i].y, lower[i].x);
    shapeZY.closePath();

    // Anisotropic basal-plane crystalline PGS graphite core
    const sigmaGeo = new THREE.ExtrudeGeometry(shapeZY, { depth: width, bevelEnabled: false });
    sigmaGeo.translate(0, 0, -width / 2);
    sigmaGeo.rotateY(-Math.PI / 2);
    sigmaGeo.computeVertexNormals();
    applyBoxUVs(sigmaGeo, 14.0);
    g.add(new THREE.Mesh(sigmaGeo, mats.ultra.sensorPyroGraphite));

    // Laminated PET dielectric edge-sealing border strips (prevents graphite flaking/shorting)
    for (const sx of [-1, 1]) {
      const edgeGeo = new THREE.ExtrudeGeometry(shapeZY, { depth: 0.75, bevelEnabled: false });
      edgeGeo.translate(0, 0, sx * (width * 0.5 + 0.15) - 0.375);
      edgeGeo.rotateY(-Math.PI / 2);
      edgeGeo.computeVertexNormals();
      const edgeMesh = new THREE.Mesh(edgeGeo, mats.mylarInsulatorFilm);
      edgeMesh.userData.noEdges = true;
      g.add(edgeMesh);
    }

    // Front (+Z) & Rear (-Z) copper-foil thermal PSA bonding pads with gold die-cut locator eyelets
    const frontAnchor = new THREE.Mesh(
      createChamferedBoxGeo(24.0, 9.5, 0.24, 0.8, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    frontAnchor.position.set(0, 0.2, 2.95);
    const rearAnchor = new THREE.Mesh(
      createChamferedBoxGeo(24.0, 9.5, 0.24, 0.8, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    rearAnchor.position.set(0, 0.0, -3.02);
    g.add(frontAnchor, rearAnchor);

    for (const ax of [-9.5, 9.5]) {
      for (const [ay, az] of [
        [0.2, 3.09],
        [0.0, -3.16],
      ] as Array<[number, number]>) {
        const eyelet = new THREE.Mesh(hiResTorus(0.95, 0.22, 6, 16), mats.goldPlating);
        eyelet.position.set(ax, ay, az);
        eyelet.userData.noEdges = true;
        g.add(eyelet);
      }
    }

    parts.push(
      finalizePart(
        'sigma-graphite',
        31,
        '#334155',
        g,
        new THREE.Vector3(0, 0, -7.3),
        new THREE.Vector3(0, 0, -142),
        new THREE.Vector3(0, 0, -99.2),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S32. Perimeter Copper-Graphite Thermal-Transfer Bridge Tapes (z = -8.65 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 4-sided laminated copper-foil + PGS pyrolytic graphite thermal-transfer bridge tapes (a1 II / a7R VI)
    const topGeo = createChamferedBoxGeo(52.0, 6.2, 0.28, 0.6, 0.03, 'z');
    applyBoxUVs(topGeo, 16.0);
    const topStrip = new THREE.Mesh(topGeo, mats.ultra.sensorPyroGraphite);
    topStrip.position.set(0, 26.2, 0);
    const topCuEdge = new THREE.Mesh(
      createChamferedBoxGeo(50.0, 1.5, 0.34, 0.25, 0.03, 'z'),
      mats.copperHeatSpreader
    );
    topCuEdge.position.set(0, 29.0, -0.04);

    const botGeo = createChamferedBoxGeo(46.0, 5.4, 0.28, 0.6, 0.03, 'z');
    applyBoxUVs(botGeo, 16.0);
    const botStrip = new THREE.Mesh(botGeo, mats.ultra.sensorPyroGraphite);
    botStrip.position.set(0, -25.8, 0);
    const botCuEdge = new THREE.Mesh(
      createChamferedBoxGeo(44.0, 1.3, 0.34, 0.25, 0.03, 'z'),
      mats.copperHeatSpreader
    );
    botCuEdge.position.set(0, -28.4, -0.04);

    // 6 miniature stamped SUS301 thermal-grounding spring clips anchoring perimeter bridge tapes
    for (const cx of [-18.0, 0.0, 18.0]) {
      for (const cy of [29.0, -28.4]) {
        const clipGeo = createChamferedBoxGeo(2.8, 1.65, 0.42, 0.2, 0.03, 'z');
        applyBoxUVs(clipGeo, 8.0);
        const clip = new THREE.Mesh(clipGeo, mats.ultra.sensorSusSpringSteel);
        clip.position.set(cx, cy, -0.10);
        clip.userData.noEdges = true;
        g.add(clip);
      }
    }

    // Side stepped bridge wings with fold creases & exposed grounding copper anchor tabs
    for (const sx of [-1, 1]) {
      const wingGeo = createChamferedBoxGeo(7.2, 34.0, 0.28, 0.6, 0.03, 'z');
      applyBoxUVs(wingGeo, 16.0);
      const wing = new THREE.Mesh(wingGeo, mats.ultra.sensorPyroGraphite);
      wing.position.set(sx * 33.4, 0, -0.45);
      wing.rotation.y = sx * 0.22;

      const cuFlange = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 28.0, 0.32, 0.2, 0.03, 'z'),
        mats.copperHeatSpreader
      );
      cuFlange.position.set(sx * 30.0, 0, 0.25);
      const crease = new THREE.Mesh(new THREE.BoxGeometry(0.45, 32.0, 0.34), mats.matteBlackAnodized);
      crease.position.set(sx * 33.4, 0, -0.45);
      crease.userData.noEdges = true;
      g.add(wing, cuFlange, crease);
    }

    g.add(topStrip, topCuEdge, botStrip, botCuEdge);

    parts.push(
      finalizePart(
        'sensor-heat-transfer-tapes',
        32,
        '#4b5563',
        g,
        new THREE.Vector3(0, 0, -8.65),
        new THREE.Vector3(36, 18, -148),
        new THREE.Vector3(46, 22, -100.5),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S33. SLVS-EC B2B Connector Retention Clamp & RF EMI Bracket (z = -11.35 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Twin stamped C7521 nickel-silver left/right B2B retention clamps with embossed stiffening ribs & EMI spring fingers
    for (const side of [-1, 1]) {
      const clampGeo = createChamferedBoxGeo(6.8, 25.0, 0.72, 0.8, 0.08, 'z');
      applyBoxUVs(clampGeo, 18.0);
      const clampPlate = new THREE.Mesh(clampGeo, mats.ultra.sensorEmiShieldNickel);
      clampPlate.position.set(side * 29.8, 0, 0);

      // Embossed longitudinal stiffening rib on rear face (-Z)
      const ribGeo = createChamferedBoxGeo(2.2, 16.0, 0.32, 0.4, 0.05, 'z');
      applyBoxUVs(ribGeo, 14.0);
      const stiffRib = new THREE.Mesh(ribGeo, mats.ultra.sensorEmiShieldNickel);
      stiffRib.position.set(side * 29.8, 0, -0.42);
      stiffRib.userData.noEdges = true;

      // Folded anti-rotation locating tab hugging outer edge
      const locTabGeo = createChamferedBoxGeo(0.55, 6.2, 1.8, 0.15, 0.04, 'z');
      applyBoxUVs(locTabGeo, 12.0);
      const locTab = new THREE.Mesh(locTabGeo, mats.ultra.sensorEmiShieldNickel);
      locTab.position.set(side * 33.2, 0, 0.55);

      // 4 Bent perimeter EMI RF-grounding spring contact fingers along inner clamp edge
      for (const fy of [-7.2, -2.4, 2.4, 7.2]) {
        const finger = new THREE.Mesh(
          createChamferedBoxGeo(1.1, 1.4, 0.22, 0.12, 0.02, 'z'),
          mats.ultra.sensorSusSpringSteel
        );
        finger.position.set(side * 26.2, fy, 0.34);
        finger.rotation.y = side * 0.32;
        finger.userData.noEdges = true;
        g.add(finger);
      }

      // Chamfered micro-cellular urethane shock-absorption compression cushion facing B2B plug (+Z)
      const sponge = new THREE.Mesh(
        createChamferedBoxGeo(4.2, 19.6, 0.56, 0.45, 0.08, 'z'),
        mats.damperElastomer
      );
      sponge.position.set(side * 29.8, 0, 0.58);
      g.add(clampPlate, stiffRib, locTab, sponge);

      // Upper & lower precision M1.4 RF-grounding clamping screws + star ground washers
      for (const sy of [-10.8, 10.8]) {
        const wsh = new THREE.Mesh(
          hiResCyl(1.75, 1.75, 0.18, 14).rotateX(Math.PI / 2),
          mats.goldPlating
        );
        wsh.position.set(side * 29.8, sy, -0.40);
        wsh.userData.noEdges = true;
        const sc = createPrecisionScrew(1.25, 0.45, 1.8, mats.stainlessMachined);
        sc.position.set(side * 29.8, sy, -0.48);
        sc.rotation.y = Math.PI;
        g.add(wsh, sc);
      }
    }

    // Contoured C7521 cross-chassis RF ground bridge strap with stamped EMI contact dimples
    const rfStrapGeo = createChamferedBoxGeo(58.0, 2.8, 0.36, 0.5, 0.05, 'z');
    applyBoxUVs(rfStrapGeo, 20.0);
    const rfStrap = new THREE.Mesh(rfStrapGeo, mats.ultra.sensorEmiShieldNickel);
    rfStrap.position.set(0, -14.2, -0.2);
    g.add(rfStrap);
    for (const dx of [-20.0, -10.0, 0.0, 10.0, 20.0]) {
      const dimple = new THREE.Mesh(hiResSphere(0.52, 10, 8), mats.stainlessMachined);
      dimple.scale.set(1.2, 0.9, 0.45);
      dimple.position.set(dx, -14.2, -0.42);
      dimple.userData.noEdges = true;
      g.add(dimple);
    }

    parts.push(
      finalizePart(
        'sensor-b2b-rf-bracket',
        33,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -11.35),
        new THREE.Vector3(-36, -16, -150),
        new THREE.Vector3(-48, -18, -101.8),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S34. Rear Pure-Copper Micro-Fin Heatsink & Graphite Spreader (z = -10.85 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // CNC-machined C1020 oxygen-free pure-copper baseplate with 4 corner countersunk mounting bores
    const cuShape = createRoundedRectShape(48.0, 36.0, 3.0);
    addCircleHoles(cuShape, [
      [-21.2, 15.2, 1.2],
      [21.2, 15.2, 1.2],
      [-21.2, -15.2, 1.2],
      [21.2, -15.2, 1.2],
    ]);
    const cuPlate = new THREE.Mesh(
      extrudeCentered(cuShape, 1.1, 0.12, 0.12, 18),
      mats.copperHeatSpreader
    );
    g.add(cuPlate);

    // Beveled outer perimeter thermal frame rim around skived fin field
    const rimBevel = new THREE.Mesh(
      extrudeCentered(createFrameShape(47.4, 35.4, 2.8, 43.2, 31.2, 2.2), 0.36, 0.05, 0.05, 16),
      mats.vaporChamberCopper
    );
    rimBevel.position.z = -0.66;
    rimBevel.userData.noEdges = true;
    g.add(rimBevel);

    // 17 skived tapered micro-fins segmented by 2 cross-ventilation thermal-convection channels (3 rows x 17 = 51 segments!)
    const finSegGeo = createChamferedBoxGeo(0.92, 9.2, 0.96, 0.12, 0.06, 'z');
    const fins = new THREE.InstancedMesh(finSegGeo, mats.copperHeatSpreader, 17 * 3);
    let fIdx = 0;
    for (let i = 0; i < 17; i++) {
      const fx = (-8 + i) * 2.5;
      for (const fy of [-10.6, 0.0, 10.6]) {
        dummy.position.set(fx, fy, -0.94);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        fins.setMatrixAt(fIdx++, dummy.matrix);
      }
    }
    fins.instanceMatrix.needsUpdate = true;
    fins.userData.noEdges = true;
    g.add(fins);

    // Twin embedded flattened sintered-copper heat-pipe tubes seated inside the two horizontal fin-gap channels + crimped brazed end-caps!
    for (const hy of [-5.3, 5.3]) {
      const heatPipe = new THREE.Mesh(
        createChamferedBoxGeo(42.0, 1.25, 0.88, 0.35, 0.18, 'z'),
        mats.vaporChamberCopper
      );
      heatPipe.position.set(0, hy, -0.92);
      g.add(heatPipe);
      for (const ex of [-21.4, 21.4]) {
        const crimp = new THREE.Mesh(
          createChamferedBoxGeo(1.1, 0.95, 0.42, 0.12, 0.04, 'z'),
          mats.goldPlating
        );
        crimp.position.set(ex, hy, -0.88);
        crimp.userData.noEdges = true;
        g.add(crimp);
      }
    }

    // 4 Counterbored stainless M1.4 clamping screws with star ground washers seated in corner bores
    for (const [cx, cy] of [
      [-21.2, 15.2],
      [21.2, 15.2],
      [-21.2, -15.2],
      [21.2, -15.2],
    ] as Array<[number, number]>) {
      const wsh = new THREE.Mesh(hiResTorus(1.55, 0.22, 6, 16), mats.goldPlating);
      wsh.position.set(cx, cy, -0.62);
      wsh.userData.noEdges = true;
      const sc = createPrecisionScrew(1.2, 0.42, 1.35, mats.stainlessMachined);
      sc.position.set(cx, cy, -0.72);
      sc.rotation.y = Math.PI;
      g.add(wsh, sc);
    }

    // Front (+Z) laminated anisotropic pyrolytic graphite thermal spreader foil
    const foilGeo = extrudeCentered(createRoundedRectShape(38.0, 26.0, 2.0), 0.18, 0.02, 0.02, 14);
    applyBoxUVs(foilGeo, 16.0);
    const foil = new THREE.Mesh(foilGeo, mats.ultra.sensorPyroGraphite);
    foil.position.z = 0.64;
    g.add(foil);

    parts.push(
      finalizePart(
        'sensor-copper-sink',
        34,
        '#c86b3c',
        g,
        new THREE.Vector3(0, 0, -10.85),
        new THREE.Vector3(0, 0, -156),
        new THREE.Vector3(0, 0, -103.5),
        cp,
        { ibisMovable: false, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S35. Wrap-Around Fold-Over Sensor FPC Guide & Stress-Relief Bracket (z = -12.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Radius-controlled (R >= 1.8mm) brushed SUS301 wrap-around ribbon guide arch preventing SLVS-EC Cu fatigue
    const archCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-22.0, -24.5, 1.4),
      new THREE.Vector3(-22.0, -28.0, -0.4),
      new THREE.Vector3(0.0, -28.4, -0.6),
      new THREE.Vector3(22.0, -28.0, -0.4),
      new THREE.Vector3(22.0, -24.5, 1.4),
    ]);
    const archGeo = markHiRes(new THREE.TubeGeometry(archCurve, 32, 1.45, 10, false));
    archGeo.scale(1, 0.52, 1);
    applyBoxUVs(archGeo, 14.0);
    const archMesh = new THREE.Mesh(archGeo, mats.ultra.sensorSusSpringSteel);
    g.add(archMesh);

    // Flared side guide lip rails & anti-chafe black nylon edge grommet rings keeping folded SLVS-EC flex centered
    for (const sx of [-19.5, 19.5]) {
      const lipGeo = createChamferedBoxGeo(0.55, 2.2, 2.4, 0.15, 0.04, 'z');
      applyBoxUVs(lipGeo, 10.0);
      const lip = new THREE.Mesh(lipGeo, mats.ultra.sensorSusSpringSteel);
      lip.position.set(sx, -27.4, -0.45);
      const grommet = new THREE.Mesh(hiResTorus(1.12, 0.22, 8, 16), mats.epdmGasket);
      grommet.rotation.y = Math.PI / 2;
      grommet.position.set(sx + Math.sign(sx) * 0.45, -27.9, -0.45);
      grommet.userData.noEdges = true;
      g.add(lip, grommet);
    }

    // Low-friction amber PTFE/Kapton protective ribbon slide liner + chamfered mounting ears with screws
    const liner = new THREE.Mesh(
      createChamferedBoxGeo(44.0, 2.6, 0.32, 0.35, 0.03, 'z'),
      mats.polyimideFpc
    );
    liner.position.set(0, -27.5, -0.1);
    g.add(liner);

    for (const sx of [-24.5, 24.5]) {
      const earGeo = createChamferedBoxGeo(5.6, 4.4, 0.72, 0.8, 0.08, 'z');
      applyBoxUVs(earGeo, 12.0);
      const ear = new THREE.Mesh(earGeo, mats.ultra.sensorSusSpringSteel);
      ear.position.set(sx, -24.5, 1.2);
      const scr = createPrecisionScrew(1.05, 0.36, 1.2, mats.stainlessMachined);
      scr.rotation.x = Math.PI;
      scr.position.set(sx, -24.5, 0.7);
      g.add(ear, scr);
    }

    parts.push(
      finalizePart(
        'sensor-wrap-fpc-bracket',
        35,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -12.2),
        new THREE.Vector3(0, -26, -162),
        new THREE.Vector3(0, -30, -105.0),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S36. Factory Laser-Interferometer 3-Point Torx Calibration Collars & Seal (z = -8.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const calibPts: Array<[number, number]> = [
      [-36.0, 29.0],
      [36.0, 29.0],
      [0.0, -30.5],
    ];

    // True 6-lobe hexalobular Torx-T6 star socket cutout shape!
    const buildTorxStarShape = (rOuter: number, rInner: number): THREE.Shape => {
      const sh = new THREE.Shape();
      const pts = 36;
      for (let i = 0; i <= pts; i++) {
        const a = (i / pts) * Math.PI * 2;
        const r = rInner + (rOuter - rInner) * (0.5 + 0.5 * Math.cos(a * 6));
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) sh.moveTo(px, py);
        else sh.lineTo(px, py);
      }
      return sh;
    };
    const torxRecessGeo = extrudeCentered(buildTorxStarShape(1.85, 1.28), 0.36, 0.02, 0.02, 12);

    // Instanced 12-per-collar radial laser torque-index graduation ticks (3 x 12 = 36 ticks)
    const tickGeo = new THREE.BoxGeometry(0.62, 0.16, 0.08);
    const ticksInst = new THREE.InstancedMesh(tickGeo, mats.matteBlackAnodized, calibPts.length * 12);
    let ti = 0;

    for (const [cx, cy] of calibPts) {
      // Precision CNC flanged hex calibration collar nut + 6-lobe Torx-T6 tamper-resistant security socket
      const collar = new THREE.Mesh(
        hiResCyl(4.15, 4.4, 1.55, 6).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      collar.position.set(cx, cy, 0);

      const torxRecess = new THREE.Mesh(torxRecessGeo, mats.matteBlackAnodized);
      torxRecess.position.set(cx, cy, -0.68);
      torxRecess.userData.noEdges = true;

      const secPin = new THREE.Mesh(
        hiResCyl(0.42, 0.42, 0.42, 10).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      secPin.position.set(cx, cy, -0.66);
      secPin.userData.noEdges = true;

      for (let k = 0; k < 12; k++) {
        const ang = (k / 12) * Math.PI * 2;
        dummy.position.set(cx + Math.cos(ang) * 2.85, cy + Math.sin(ang) * 2.85, -0.79);
        dummy.rotation.set(0, 0, ang);
        dummy.updateMatrix();
        ticksInst.setMatrixAt(ti++, dummy.matrix);
      }

      // Stepped precision brass thrust shim washer
      const brassShim = new THREE.Mesh(
        hiResCyl(4.65, 4.65, 0.36, 22).rotateX(Math.PI / 2),
        mats.brassGear
      );
      brassShim.position.set(cx, cy, 0.96);

      // Authentic multi-lobe glossy blue factory calibration tamper-seal epoxy lacquer bead straddling collar & shim!
      const sealMain = new THREE.Mesh(hiResSphere(1.18, 12, 10), mats.mountThreadLockBlue);
      sealMain.scale.set(1.35, 0.82, 0.52);
      sealMain.position.set(cx + 2.6, cy + 1.8, -0.74);
      sealMain.userData.noEdges = true;
      const sealTrail = new THREE.Mesh(hiResSphere(0.75, 10, 8), mats.mountThreadLockBlue);
      sealTrail.scale.set(1.1, 1.4, 0.45);
      sealTrail.position.set(cx + 3.55, cy + 2.35, 0.25);
      sealTrail.userData.noEdges = true;

      g.add(collar, torxRecess, secPin, brassShim, sealMain, sealTrail);
    }
    ticksInst.instanceMatrix.needsUpdate = true;
    ticksInst.userData.noEdges = true;
    g.add(ticksInst);

    parts.push(
      finalizePart(
        'sensor-torx-spring-cal',
        36,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, -8.2),
        new THREE.Vector3(38, 28, -124),
        new THREE.Vector3(48, 32, -93.0),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S37. IBIS Moving-Stage Ultra-Flexible 25µm Perimeter Graphite Wings (z = -2.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Multi-pleat accordion-folded ultra-thin 25µm PGS graphite heat-spreading bellows wings (3 pleats per side!)
    for (const sx of [-1, 1]) {
      const wingGeo = createChamferedBoxGeo(7.6, 34.0, 0.22, 0.5, 0.02, 'z');
      applyBoxUVs(wingGeo, 14.0);
      const wingMain = new THREE.Mesh(wingGeo, mats.ultra.sensorPyroGraphite);
      wingMain.position.set(sx * 29.0, 0, 0);

      // 3 crisp accordion bellows pleats absorbing 5-axis IBIS motion with zero spring hysteresis
      for (let p = 0; p < 3; p++) {
        const pleatGeo = createChamferedBoxGeo(2.3, 32.0, 0.20, 0.2, 0.02, 'z');
        applyBoxUVs(pleatGeo, 12.0);
        const pleat = new THREE.Mesh(pleatGeo, mats.ultra.sensorPyroGraphite);
        const px = sx * (33.5 + p * 1.45);
        const pz = (p % 2 === 0 ? -0.45 : 0.15) - p * 0.18;
        pleat.position.set(px, 0, pz);
        pleat.rotation.y = sx * (p % 2 === 0 ? 0.52 : -0.52);
        pleat.userData.noEdges = true;
        g.add(pleat);
      }

      // Stepped inner moving-stage & outer stationary copper thermal-grounding anchor tabs
      const cuTab = new THREE.Mesh(
        createChamferedBoxGeo(2.5, 24.0, 0.28, 0.3, 0.03, 'z'),
        mats.copperHeatSpreader
      );
      cuTab.position.set(sx * 25.4, 0, 0.14);
      const outerCuBus = new THREE.Mesh(
        createChamferedBoxGeo(1.4, 28.0, 0.26, 0.2, 0.03, 'z'),
        mats.copperHeatSpreader
      );
      outerCuBus.position.set(sx * 37.6, 0, -0.78);
      outerCuBus.userData.noEdges = true;
      g.add(wingMain, cuTab, outerCuBus);
    }

    const topGeo = createChamferedBoxGeo(44.0, 5.2, 0.22, 0.6, 0.02, 'z');
    applyBoxUVs(topGeo, 16.0);
    const topBridge = new THREE.Mesh(topGeo, mats.ultra.sensorPyroGraphite);
    topBridge.position.set(0, 19.6, 0);
    for (const nx of [-16.0, 16.0]) {
      const locRing = new THREE.Mesh(hiResTorus(0.75, 0.16, 6, 14), mats.goldPlating);
      locRing.position.set(nx, 19.6, 0.14);
      locRing.userData.noEdges = true;
      g.add(locRing);
    }
    g.add(topBridge);

    parts.push(
      finalizePart(
        'sensor-perimeter-graphite',
        37,
        '#334155',
        g,
        new THREE.Vector3(0, 0, -2.2),
        new THREE.Vector3(-42, 24, -46),
        new THREE.Vector3(-48, 26, -54.0),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S38. On-Sensor-PCB Ultra-Low-Noise Analog LDO Rail & Star-Ground Bar (z = -1.65 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Heavy bare-copper star-ground busbar with ENIG via-stitching posts & Kelvin sense test pads
    const gndBar = new THREE.Mesh(
      createChamferedBoxGeo(42.0, 2.2, 0.42, 0.35, 0.05, 'z'),
      mats.copperHeatSpreader
    );
    gndBar.position.set(0, -19.2, 0);
    g.add(gndBar);

    const viaGeo = hiResCyl(0.32, 0.32, 0.50, 8).rotateX(Math.PI / 2);
    const gndVias = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 15);
    for (let i = 0; i < 15; i++) {
      dummy.position.set(-18.2 + i * 2.6, -19.2, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      gndVias.setMatrixAt(i, dummy.matrix);
    }
    gndVias.instanceMatrix.needsUpdate = true;
    gndVias.userData.noEdges = true;
    g.add(gndVias);

    // 6 Raised gold Kelvin-sense test-point domes along copper busbar flanks
    for (const kx of [-16.8, -10.2, -3.4, 3.4, 10.2, 16.8]) {
      const kPad = new THREE.Mesh(
        hiResCyl(0.48, 0.52, 0.14, 10).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      kPad.position.set(kx, -18.3, -0.26);
      kPad.userData.noEdges = true;
      g.add(kPad);
    }

    // 3 Independent Ultra-Low-Noise (<4 uVrms) QFN Analog LDO Regulators + Yellow Tantalum Caps + Ferrite EMI Beads + 0402 Decouplers
    for (const lx of [-13.5, 0.0, 13.5]) {
      const ldo = buildChipPackage({
        w: 4.4,
        d: 3.6,
        h: 0.78,
        style: 'qfn',
        pinsPerSide: 5,
        bodyMat: mats.ultra.icEpoxyLaser,
        leadMat: mats.solderBallSilver,
        pin1Mat: mats.goldPlating,
        axis: 'z',
      });
      ldo.rotation.y = Math.PI;
      ldo.position.set(lx, -15.6, -0.22);

      // Authentic yellow polymer tantalum cap with bold anode (+) polarity bar & folded J-leads!
      const cap = buildTantalumCap(
        3.2,
        1.8,
        0.95,
        mats.tantalumCapYellow,
        mats.copperHeatSpreader,
        mats.solderBallSilver,
        'z'
      );
      cap.rotation.y = Math.PI;
      cap.position.set(lx + 4.4, -15.6, -0.18);

      // Shielded 0603 ferrite EMI domain-isolation choke bead + paired input/output 0402 ceramic filter passives
      const ferriteBead = buildSmdPassive(1.6, 0.85, 0.68, mats.ferriteInductor, mats.solderBallSilver, 'z');
      ferriteBead.rotation.y = Math.PI;
      ferriteBead.position.set(lx - 3.6, -15.6, -0.22);
      g.add(ferriteBead);

      for (const my of [-14.4, -16.8]) {
        const mlcc = buildSmdPassive(1.0, 0.55, 0.48, mats.smdCeramic, mats.solderBallSilver, 'z');
        mlcc.rotation.y = Math.PI;
        mlcc.position.set(lx - 3.1, my, -0.15);
        g.add(mlcc);
      }
      g.add(ldo, cap);
    }

    parts.push(
      finalizePart(
        'sensor-analog-ldo-rail',
        38,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, -1.65),
        new THREE.Vector3(40, -18, -32),
        new THREE.Vector3(48, -20, -48.0),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S39. Front Chamber ITO Conductive Antistatic Dust-Repelling Ring (z = +7.1 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Conductive carbon-filled micro-flocked antistatic bezel with stepped inner dual-lip dust seal
    const ringShape = createFrameShape(47.2, 35.8, 2.4, 41.2, 29.8, 1.4);
    const ringGeo = extrudeCentered(ringShape, 0.55, 0.06, 0.06, 18);
    applyBoxUVs(ringGeo, 14.0);
    const ring = new THREE.Mesh(ringGeo, mats.ultra.sensorVelvetBaffle);
    g.add(ring);

    const innerLip = new THREE.Mesh(
      extrudeCentered(createFrameShape(42.8, 31.4, 1.5, 41.2, 29.8, 1.4), 0.26, 0.03, 0.03, 14),
      mats.antiVibRubber
    );
    innerLip.position.z = 0.28;
    innerLip.userData.noEdges = true;
    g.add(innerLip);

    // 4 stamped bent-cantilever gold-plated BeCu ESD grounding fingers with brushed SUS base tabs, rivets & contact dimples
    for (const [gx, gy] of [
      [-23.8, 10.5],
      [23.8, 10.5],
      [-23.8, -10.5],
      [23.8, -10.5],
    ] as Array<[number, number]>) {
      const sx = Math.sign(gx);
      const baseTabGeo = createChamferedBoxGeo(2.8, 2.2, 0.26, 0.2, 0.03, 'z');
      applyBoxUVs(baseTabGeo, 8.0);
      const baseTab = new THREE.Mesh(baseTabGeo, mats.ultra.sensorSusSpringSteel);
      baseTab.position.set(gx - sx * 0.3, gy, -0.15);
      const rivet = new THREE.Mesh(
        hiResCyl(0.36, 0.36, 0.34, 10).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      rivet.position.set(gx - sx * 0.45, gy, -0.16);
      rivet.userData.noEdges = true;
      const bentFinger = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 1.5, 0.18, 0.15, 0.02, 'z'),
        mats.beCuSpring
      );
      bentFinger.position.set(gx + sx * 1.1, gy, -0.34);
      bentFinger.rotation.y = -sx * 0.28;
      const dimple = new THREE.Mesh(hiResSphere(0.28, 8, 6), mats.goldPlating);
      dimple.position.set(gx + sx * 1.75, gy, -0.45);
      dimple.userData.noEdges = true;
      g.add(baseTab, rivet, bentFinger, dimple);
    }

    parts.push(
      finalizePart(
        'sensor-antistatic-ring',
        39,
        '#d9a326',
        g,
        new THREE.Vector3(0, 0, 7.1),
        new THREE.Vector3(0, 32, 74),
        new THREE.Vector3(0, 36, 4.0),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S40. Secondary Optical IBIS Home-Index Photo-Interrupter & Slit Target (z = -6.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Chamfered emerald Hall/Opto sub-PCB with silkscreen traces, gold TP domes & current-limiting 0402 resistor
    const refPcbGeo = createChamferedBoxGeo(10.5, 8.2, 0.7, 0.7, 0.06, 'z');
    applyBoxUVs(refPcbGeo, 10.0);
    const refPcb = new THREE.Mesh(refPcbGeo, mats.ultra.sensorHallSubPcb);
    refPcb.position.set(-34.2, -16.5, -1.8);
    const limRes = buildSmdPassive(1.2, 0.65, 0.45, mats.icEpoxy, mats.solderBallSilver, 'z');
    limRes.position.set(-37.8, -14.2, -1.25);
    g.add(refPcb, limRes);

    for (const [tx, ty] of [
      [-38.4, -18.8],
      [-37.0, -18.8],
      [-30.2, -18.8],
      [-30.2, -14.2],
    ] as Array<[number, number]>) {
      const tp = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.14, 10).rotateX(Math.PI / 2), mats.goldPlating);
      tp.position.set(tx, ty, -1.42);
      tp.userData.noEdges = true;
      g.add(tp);
    }

    // Molded U-slot Omron EE-SX1070-style Infrared Transmissive Photo-Interrupter + 0.5mm aperture slit bezels!
    const sensorBase = new THREE.Mesh(
      createChamferedBoxGeo(7.2, 5.4, 2.8, 0.4, 0.10, 'z'),
      mats.icEpoxy
    );
    sensorBase.position.set(-34.2, -16.5, 0);

    const slotCheek1 = new THREE.Mesh(
      createChamferedBoxGeo(2.5, 5.1, 2.4, 0.3, 0.08, 'z'),
      mats.matteBlackAnodized
    );
    slotCheek1.position.set(-36.2, -16.5, 2.0);
    const slotCheek2 = new THREE.Mesh(
      createChamferedBoxGeo(2.5, 5.1, 2.4, 0.3, 0.08, 'z'),
      mats.matteBlackAnodized
    );
    slotCheek2.position.set(-32.2, -16.5, 2.0);

    // Facing ruby-red GaAs IR LED emitter lens & dark photodiode window framed by 0.5mm precision slit bezels!
    const irLens = new THREE.Mesh(
      hiResCyl(0.72, 0.72, 0.32, 14).rotateZ(Math.PI / 2),
      mats.irLedLens
    );
    irLens.position.set(-34.92, -16.5, 2.15);
    irLens.userData.noEdges = true;
    const irSlitBezel = new THREE.Mesh(hiResTorus(0.76, 0.12, 6, 14).rotateY(Math.PI / 2), mats.titaniumRivet);
    irSlitBezel.position.set(-34.95, -16.5, 2.15);
    irSlitBezel.userData.noEdges = true;

    const pdWindow = new THREE.Mesh(
      hiResCyl(0.72, 0.72, 0.32, 14).rotateZ(Math.PI / 2),
      mats.evfIrWindowBlack
    );
    pdWindow.position.set(-33.48, -16.5, 2.15);
    pdWindow.userData.noEdges = true;
    const pdSlitBezel = new THREE.Mesh(hiResTorus(0.76, 0.12, 6, 14).rotateY(Math.PI / 2), mats.titaniumRivet);
    pdSlitBezel.position.set(-33.45, -16.5, 2.15);
    pdSlitBezel.userData.noEdges = true;

    // 4 bent metallic solder leads bridging photo-interrupter to sub-PCB
    for (const [lx, ly] of [
      [-36.5, -18.5],
      [-31.9, -18.5],
      [-36.5, -14.5],
      [-31.9, -14.5],
    ] as Array<[number, number]>) {
      const lead = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 1.3), mats.solderBallSilver);
      lead.position.set(lx, ly, -1.15);
      lead.userData.noEdges = true;
      g.add(lead);
    }

    // Photo-etched low-CTE stainless calibration target flag with TRUE 0.5mm central optical micro-slit & mounting foot!
    const flagTop = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.2, 3.0), mats.ultra.sensorSusSpringSteel);
    flagTop.position.set(-34.2, -14.65, 2.1);
    const flagBot = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.2, 3.0), mats.ultra.sensorSusSpringSteel);
    flagBot.position.set(-34.2, -18.35, 2.1);
    const flagBridge = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.55, 0.75), mats.stainlessMachined);
    flagBridge.position.set(-34.2, -16.5, 3.22);
    flagBridge.userData.noEdges = true;
    const flagFoot = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 4.4, 0.42, 0.2, 0.03, 'z'),
      mats.stainlessMachined
    );
    flagFoot.position.set(-34.2, -16.5, 3.72);
    flagFoot.userData.noEdges = true;

    g.add(
      sensorBase,
      slotCheek1,
      slotCheek2,
      irLens,
      irSlitBezel,
      pdWindow,
      pdSlitBezel,
      flagTop,
      flagBot,
      flagBridge,
      flagFoot
    );

    parts.push(
      finalizePart(
        'sensor-ibis-optical-ref',
        40,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, -6.4),
        new THREE.Vector3(-38, -28, -98),
        new THREE.Vector3(-46, -32, -82.0),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  return parts;
}

export async function buildSensorStandaloneParts(mats: MaterialLibrary): Promise<CadPart[]> {
  // Phase 14 (24 OEM) + Phase 19C (6 deep-audit) + Phase 25A (20 next-gen) = 50 standalone-only sensor/IBIS parts (S41–S90 -> 90 total)
  const [mMicro, mUltra, mNextGen] = await Promise.all([
    import('./sensorMicroParts'),
    import('./sensorMicroUltraAuditParts'),
    import('./sensorNextGenParts'),
  ]);
  return [
    ...mMicro.buildSensorMicroParts(mats),
    ...mUltra.buildSensorUltraAuditParts(mats),
    ...mNextGen.buildSensorNextGenParts(mats),
  ];
}
