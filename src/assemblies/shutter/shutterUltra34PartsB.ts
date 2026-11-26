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
  buildChipPackage,
  buildPhillipsScrew,
  buildShieldedInductor,
  buildSmdPassive,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizePhase34ShutterPartB(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  targetExplodedPos: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.28
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);
  const explodeOffset = targetExplodedPos.clone().sub(assembledPos);

  return {
    id,
    subsystem: 'shutter',
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
 * Phase 34 Shutter Standalone Exhaustive Ultra-Dissection — Part B (SH105–SH130, 26 parts).
 * Strictly `standaloneOnly: true`: omitted in whole-camera modes, lazy-hydrated in standalone shutter mode.
 *
 * - Group C-2 (SH105–SH108): Rebound Latch, Viscous Damper, Passive Mount Barrier & Acoustic Liner
 * - Group D (SH109–SH119): Dual-Coil Stator, Reverse-Demag MOSFET, Armature Seat, NTC, Schmitt IC, Boost Caps, EMI Filter, Tape 631S, AMR, X-Sync Thyristor & JIS Metrology
 * - Group E (SH120–SH130): Sony OEM Heat/Mask/Adjust Washers, AFE-3379 Truss Rib, Micro Fasteners/E-Rings, d_s Bokeh Baffle, Idler Shafts, Hybrid GS Bus & Z9/Z8 Thick Shield Comparison
 */
export function buildShutterUltra34PartsB(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // SH105. Blade-Tip Secondary Kinetic Rebound One-Way Catch Hook & Micro Leaf Spring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ratchet-jaw one-way rebound catch hook pivoting against a micro BeCu return leaf spring
    const baseMount = new THREE.Mesh(
      createChamferedBoxGeo(11.5, 4.2, 0.85, 0.6, 0.08, 'z'),
      mats.shutterChassis
    );
    baseMount.position.set(0, -1.6, -0.5);
    g.add(baseMount);

    const hookShape = new THREE.Shape();
    hookShape.moveTo(-4.8, -1.0);
    hookShape.lineTo(3.6, -1.0);
    hookShape.lineTo(5.6, 1.4);
    hookShape.lineTo(4.0, 2.4);
    hookShape.lineTo(2.4, 0.6);
    hookShape.lineTo(-4.8, 0.8);
    hookShape.closePath();
    const hook = new THREE.Mesh(
      extrudeHiRes(hookShape, 0.95, 0.08, 0.08, 2, 14),
      mats.titaniumRivet
    );
    hook.position.set(0, 0.4, 0.35);

    const pivotPin = new THREE.Mesh(
      hiResCyl(0.75, 0.75, 2.4, 18).rotateX(Math.PI / 2),
      mats.brassGear
    );
    pivotPin.position.set(-3.2, 0.2, 0.2);

    // Preloaded BeCu leaf bias spring pressing hook back into catch readiness
    const leafPts = [
      new THREE.Vector3(-4.5, -1.2, 0.4),
      new THREE.Vector3(-1.2, -0.4, 0.4),
      new THREE.Vector3(2.2, -1.0, 0.4),
    ];
    const leafGeo = markHiRes(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(leafPts), 24, 0.18, 8, false)
    );
    const leafSpring = new THREE.Mesh(leafGeo, mats.beCuSpring);
    leafSpring.userData.noEdges = true;

    // Elastomer silent-catch nose cushion
    const tipPad = new THREE.Mesh(
      createChamferedBoxGeo(1.1, 1.3, 1.0, 0.25, 0.06, 'z'),
      mats.damperElastomer
    );
    tipPad.position.set(3.8, 1.35, 0.35);

    g.add(hook, pivotPin, leafSpring, tipPad);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-blade-rebound-latch',
        105,
        '#f59e0b',
        g,
        new THREE.Vector3(-20.0, -14.0, 13.4),
        new THREE.Vector3(-52.0, -70.0, -16.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH106. Silicone-Oil Viscous Rotary Fluid Damper Capsule (Silent Mechanical Mode)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cutaway rotary fluid damper capsule revealing viscous dimethyl-silicone oil ring, 4 shear vanes & POM pinion gear
    const cupProf = [
      new THREE.Vector2(1.2, -1.6),
      new THREE.Vector2(4.6, -1.6),
      new THREE.Vector2(4.6, 1.4),
      new THREE.Vector2(3.85, 1.4),
      new THREE.Vector2(3.85, -0.9),
      new THREE.Vector2(1.2, -0.9),
    ];
    const housingGeo = markHiRes(new THREE.LatheGeometry(cupProf, 32, 0, Math.PI * 1.65)).rotateX(Math.PI / 2);
    const housing = new THREE.Mesh(housingGeo, mats.matteBlackAnodized);
    g.add(housing);

    // Translucent cyan silicone-oil viscous fluid annulus visible through the 270-deg cutaway
    const fluid = new THREE.Mesh(
      hiResCyl(3.7, 3.7, 1.75, 28).rotateX(Math.PI / 2),
      mats.fluorineCoatCyan
    );
    fluid.position.set(0, 0, 0.15);
    g.add(fluid);

    // 4-vane rotor hub shearing the silicone oil for velocity-proportional damping (tau = c * omega)
    const hub = new THREE.Mesh(
      hiResCyl(1.45, 1.45, 3.6, 22).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    hub.position.set(0, 0, 0.55);
    g.add(hub);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const vane = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 0.42, 1.65, 0.1, 0.04, 'z'),
        mats.brassGear
      );
      vane.position.set(Math.cos(a) * 2.1, Math.sin(a) * 2.1, 0.15);
      vane.rotation.z = a;
      g.add(vane);
    }

    // Viton O-ring fluid seal + external drive pinion
    const oRing = new THREE.Mesh(hiResTorus(2.2, 0.24, 8, 24), mats.epdmGasket);
    oRing.position.set(0, 0, 1.35);
    oRing.userData.noEdges = true;
    const pinion = new THREE.Mesh(
      hiResCyl(2.0, 2.0, 1.0, 16).rotateX(Math.PI / 2),
      mats.pomGear
    );
    pinion.position.set(0, 0, 2.25);
    g.add(oRing, pinion);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-viscous-rotary-damper',
        106,
        '#06b6d4',
        g,
        new THREE.Vector3(25.0, -19.5, 12.1),
        new THREE.Vector3(78.0, -66.0, -12.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH107. Passive Bayonet-Coupled Mechanical Dust-Barrier Linkage (JP2019-234718A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Arcuate bayonet-cam follower ring + bell-crank transfer lever + zero-power torsion return spring
    const arcShape = new THREE.Shape();
    arcShape.absarc(6.0, 0, 9.6, Math.PI * 0.68, Math.PI * 1.32, false);
    arcShape.absarc(6.0, 0, 7.8, Math.PI * 1.32, Math.PI * 0.68, true);
    arcShape.closePath();
    const bayonetArc = new THREE.Mesh(
      extrudeHiRes(arcShape, 0.9, 0.08, 0.08, 2, 24),
      mats.mountStainlessFlange
    );
    bayonetArc.position.set(2.0, 0, 0.45);
    g.add(bayonetArc);

    // Bayonet-lug catch finger engaging lens rotation
    const lugFinger = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 1.6, 1.5, 0.3, 0.06, 'z'),
      mats.cinnabarAnodized
    );
    lugFinger.position.set(-2.2, 5.2, 1.15);
    g.add(lugFinger);

    // Bell-crank linkage transferring bayonet twist into vertical protective barrier closure
    const crank = new THREE.Mesh(
      createChamferedBoxGeo(8.4, 1.8, 0.72, 0.45, 0.08, 'z'),
      mats.linkArmSteel
    );
    crank.position.set(2.4, -3.2, -0.35);
    crank.rotation.z = -0.35;

    const pivot = new THREE.Mesh(
      hiResCyl(1.15, 1.15, 2.2, 20).rotateX(Math.PI / 2),
      mats.brassGear
    );
    pivot.position.set(-1.2, -1.8, 0);

    // Zero-power return spring loop
    const retSpring = new THREE.Mesh(
      hiResTorus(1.85, 0.22, 8, 24, Math.PI * 1.65),
      mats.beCuSpring
    );
    retSpring.position.set(-1.2, -1.8, 1.15);
    retSpring.userData.noEdges = true;
    g.add(crank, pivot, retSpring);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-mount-passive-barrier',
        107,
        '#94a3b8',
        g,
        new THREE.Vector3(-24.0, 0.0, 16.9),
        new THREE.Vector3(-22.0, -74.0, -34.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH108. Drive-Bay Micro-Cellular Acoustic Absorption Foam & Constrained-Layer Damping Sheet
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3-layer constrained-layer acoustic stack: Aluminum foil constraining skin + viscoelastic damping gum + micro-pyramid acoustic foam
    const foilSkin = new THREE.Mesh(
      createChamferedBoxGeo(13.5, 16.0, 0.25, 0.9, 0.04, 'z'),
      mats.emiShieldFilm
    );
    foilSkin.position.set(0, 0, -0.95);

    const viscoLayer = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 15.6, 0.55, 0.85, 0.06, 'z'),
      mats.butylDamperRubber
    );
    viscoLayer.position.set(0, 0, -0.45);

    const foamBase = new THREE.Mesh(
      createChamferedBoxGeo(12.8, 15.2, 0.72, 0.8, 0.08, 'z'),
      mats.lensFoamSeal
    );
    foamBase.position.set(0, 0, 0.28);
    g.add(foilSkin, viscoLayer, foamBase);

    // 4x5 anechoic micro-pyramid sound-trapping baffle dimples on front face
    const pyrGeo = markHiRes(new THREE.ConeGeometry(0.95, 0.95, 4)).rotateX(Math.PI / 2);
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 4; c++) {
        const pyr = new THREE.Mesh(pyrGeo, mats.velvetFlockTrap);
        pyr.position.set(-4.2 + c * 2.8, -5.6 + r * 2.8, 1.05);
        pyr.rotation.z = Math.PI / 4;
        pyr.userData.noEdges = true;
        g.add(pyr);
      }
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-acoustic-chamber-liner',
        108,
        '#334155',
        g,
        new THREE.Vector3(31.5, -2.0, 11.5),
        new THREE.Vector3(16.0, -74.0, -42.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH109. Dual-Independent-Coil Unconnected Stator Electromagnetic Actuator (JP2015-111219A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Shared laminated silicon-steel H-stator wound with TWO electrically isolated independent coils (Coil A & Coil B) with separate terminal buses
    for (let k = 0; k < 5; k++) {
      const lamShape = new THREE.Shape();
      lamShape.moveTo(-6.2, -4.4);
      lamShape.lineTo(6.2, -4.4);
      lamShape.lineTo(6.2, -2.2);
      lamShape.lineTo(2.0, -2.2);
      lamShape.lineTo(2.0, 2.2);
      lamShape.lineTo(6.2, 2.2);
      lamShape.lineTo(6.2, 4.4);
      lamShape.lineTo(-6.2, 4.4);
      lamShape.lineTo(-6.2, 2.2);
      lamShape.lineTo(-2.0, 2.2);
      lamShape.lineTo(-2.0, -2.2);
      lamShape.lineTo(-6.2, -2.2);
      lamShape.closePath();
      const lam = new THREE.Mesh(
        extrudeHiRes(lamShape, 0.34, 0.03, 0.03, 1, 8),
        k % 2 === 0 ? mats.softIronYoke : mats.lensPermalloyShield
      );
      lam.position.set(0, 0, -0.8 + k * 0.4);
      g.add(lam);
    }

    // Coil 1 (Upper leg, copper) & Coil 2 (Lower leg, insulated independent winding) + central air-gap barrier
    for (const [cy, bobMat] of [
      [3.3, mats.polyimideFpc],
      [-3.3, mats.mountShimBlue],
    ] as Array<[number, THREE.Material]>) {
      const coil = new THREE.Mesh(
        createChamferedBoxGeo(7.6, 2.6, 3.0, 0.45, 0.14, 'z'),
        mats.copperCoil
      );
      coil.position.set(0, cy, 0);
      for (const sx of [-4.0, 4.0]) {
        const flg = new THREE.Mesh(
          createChamferedBoxGeo(0.45, 3.2, 3.4, 0.15, 0.05, 'z'),
          bobMat
        );
        flg.position.set(sx, cy, 0);
        g.add(flg);
      }
      // Isolated terminal pair per coil
      for (const tx of [-1.2, 1.2]) {
        const pin = new THREE.Mesh(hiResCyl(0.24, 0.24, 1.8, 12), mats.goldPlating);
        pin.position.set(tx, cy + (cy > 0 ? 2.1 : -2.1), 0);
        g.add(pin);
      }
      g.add(coil);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-unconnected-dual-stator',
        109,
        '#ea580c',
        g,
        new THREE.Vector3(33.5, 16.5, 12.5),
        new THREE.Vector3(72.0, 74.0, 24.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH110. Reverse-Flux Cancellation & Active Demagnetization Pulse MOSFET Stage (TDK Magnetics)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sub-PCB holding twin complementary N/P-channel Power MOSFETs (DFN-8), TVS clamp diode & RC snubber network for active reverse-pulse demag
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(13.8, 8.6, 0.75, 0.7, 0.08, 'z'),
      mats.hdiMainboardPcb
    );
    g.add(pcb);

    // Twin power MOSFET packages (High-side Hold + Low-side Reverse-Demag Pulse)
    for (const mx of [-3.4, 1.2]) {
      const mosfet = buildChipPackage({
        w: 3.4,
        d: 3.4,
        h: 0.9,
        style: 'dfn',
        pinsPerSide: 4,
        bodyMat: mats.icEpoxy,
        leadMat: mats.solderBallSilver,
        pin1Mat: mats.goldPlating,
        axis: 'z',
      });
      mosfet.position.set(mx, 0.9, 0.85);
      g.add(mosfet);
    }

    // RC Snubber resistors & high-voltage ceramic snubber capacitors
    for (let i = 0; i < 3; i++) {
      const cap = buildSmdPassive(1.8, 1.0, 0.75, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(-4.2 + i * 2.6, -2.4, 0.75);
      g.add(cap);
    }

    // Fast-recovery Schottky clamping diode (SOD-123)
    const diode = buildSmdPassive(2.8, 1.5, 1.0, mats.icEpoxy, mats.solderBallSilver, 'z', mats.silverElectrode);
    diode.position.set(4.8, 0.9, 0.88);
    g.add(diode);

    // Gold current-pulse busbars on PCB edge
    const bus = new THREE.Mesh(
      createChamferedBoxGeo(12.2, 0.85, 0.16, 0.12, 0.02, 'z'),
      mats.goldPlating
    );
    bus.position.set(0, 3.4, 0.46);
    g.add(bus);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-reverse-demag-mosfet',
        110,
        '#16a34a',
        g,
        new THREE.Vector3(30.0, 22.5, 10.6),
        new THREE.Vector3(94.0, 70.0, -8.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH111. Armature Shaft Micro C-Ring Retainer, Conical Self-Centering Seat & Over-Stroke Flange
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-detailed gimbaled armature assembly: Mirror-lapped pure-iron contact disc + conical spherical self-centering seat + over-stroke flange + C-ring!
    const ironDisc = new THREE.Mesh(
      hiResCyl(3.8, 3.8, 1.05, 30).rotateX(Math.PI / 2),
      mats.pureIronArmature
    );
    ironDisc.position.set(0, 0, 2.2);

    // Conical self-centering collar & spherical gimbal bead (allows ±1.5 deg tilt compliance for 0.5µm flat contact on yoke poles)
    const coneProf = [
      new THREE.Vector2(0.85, -0.9),
      new THREE.Vector2(2.35, -0.9),
      new THREE.Vector2(1.55, 0.6),
      new THREE.Vector2(0.85, 0.6),
    ];
    const coneSeat = new THREE.Mesh(
      markHiRes(new THREE.LatheGeometry(coneProf, 28)).rotateX(Math.PI / 2),
      mats.brassGear
    );
    coneSeat.position.set(0, 0, 0.85);

    const gimbalBall = new THREE.Mesh(hiResSphere(1.18, 20, 14), mats.siliconNitrideBall);
    gimbalBall.position.set(0, 0, 0.05);

    // Hardened armature pivot stem with machined circlip groove
    const stem = new THREE.Mesh(
      hiResCyl(0.82, 0.82, 6.2, 22).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    stem.position.set(0, 0, -0.35);

    // Over-stroke arrest flange collar
    const flange = new THREE.Mesh(
      hiResCyl(2.75, 2.75, 0.62, 26).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    flange.position.set(0, 0, -1.6);

    // Open-C spring-steel micro retainer clip snapped into rear stem groove
    const cringShape = new THREE.Shape();
    cringShape.absarc(0, 0, 1.85, 0.38, Math.PI * 2 - 0.38, false);
    cringShape.absarc(0, 0, 0.92, Math.PI * 2 - 0.38, 0.38, true);
    cringShape.closePath();
    const cring = new THREE.Mesh(
      extrudeHiRes(cringShape, 0.28, 0.03, 0.03, 1, 22),
      mats.mountSpringSteel
    );
    cring.position.set(0, 0, -2.8);

    g.add(ironDisc, coneSeat, gimbalBall, stem, flange, cring);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-armature-cring-seat',
        111,
        '#94a3b8',
        g,
        new THREE.Vector3(34.5, 19.5, 12.7),
        new THREE.Vector3(46.0, 78.0, 36.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH112. Drive-Bay NTC Thermistor Temperature Sensor (Cold-Weather -10°C Compensation)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Polyimide flexible sensor probe tongue carrying a glass-encapsulated 10kΩ NTC thermistor bead + reference divider resistor + thermal coupling pad
    const tongueShape = createRoundedRectShape(12.6, 5.0, 1.0);
    const flexTongue = new THREE.Mesh(
      extrudeHiRes(tongueShape, 0.24, 0.03, 0.03, 1, 14),
      mats.polyimideFpc
    );
    g.add(flexTongue);

    // Twin copper differential Kelvin sense traces along the flex strip
    for (const ty of [-0.75, 0.75]) {
      const trace = new THREE.Mesh(
        createChamferedBoxGeo(10.0, 0.32, 0.08, 0.05, 0.02, 'z'),
        mats.copperHeatSpreader
      );
      trace.position.set(-0.5, ty, 0.16);
      g.add(trace);
    }

    // Precision 0402/0603 NTC thermistor element + sapphire-blue thermal coupling pad beneath tip
    const ntcElement = buildSmdPassive(2.6, 1.45, 1.05, mats.cinnabarAnodized, mats.goldPlating, 'z');
    ntcElement.position.set(3.2, 0, 0.68);
    const refRes = buildSmdPassive(2.0, 1.1, 0.72, mats.icEpoxy, mats.solderBallSilver, 'z');
    refRes.position.set(-1.6, 0, 0.54);
    const timPad = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 3.6, 0.65, 0.5, 0.08, 'z'),
      mats.thermalPadBlue
    );
    timPad.position.set(3.2, 0, -0.45);
    g.add(ntcElement, refRes, timPad);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-curtain-ntc-thermistor',
        112,
        '#0284c7',
        g,
        new THREE.Vector3(25.0, 21.0, 11.8),
        new THREE.Vector3(18.0, 76.0, 44.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH113. Dual-Channel 940 nm IR Schmitt-Trigger Optical Comparator IC
  // =========================================================================
  {
    const g = new THREE.Group();
    // Shielded micro-PCB hosting a dual-channel high-speed TSSOP/SOIC Schmitt-trigger comparator + hysteresis feedback resistor bridge
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(12.4, 8.2, 0.72, 0.6, 0.08, 'z'),
      mats.sensorPcb
    );
    g.add(pcb);

    const compIc = buildChipPackage({
      w: 5.0,
      d: 3.8,
      h: 1.05,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    compIc.position.set(-1.0, 0.4, 0.92);
    g.add(compIc);

    // 4 precision 0.1% hysteresis threshold resistors + decoupling MLCC
    for (let i = 0; i < 4; i++) {
      const r = buildSmdPassive(1.5, 0.85, 0.55, mats.smdCeramic, mats.solderBallSilver, 'z');
      r.position.set(4.1, -2.2 + i * 1.45, 0.64);
      g.add(r);
    }
    const decCap = buildSmdPassive(1.8, 1.0, 0.75, mats.tantalumCapYellow, mats.solderBallSilver, 'z');
    decCap.position.set(-1.0, -2.6, 0.72);
    g.add(decCap);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-ir-schmitt-comparator',
        113,
        '#10b981',
        g,
        new THREE.Vector3(-21.5, 16.0, 11.4),
        new THREE.Vector3(-14.0, 78.0, 32.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH114. 1/400 s Dual-Drive Low-ESR High-Current Boost Capacitor Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heavy-copper 2oz pulse-reservoir carrier PCB populated with 2x polymer tantalum bulk caps + 4x high-ripple MLCCs
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(15.0, 8.8, 0.85, 0.7, 0.08, 'z'),
      mats.hdiMainboardPcb
    );
    g.add(pcb);

    // Twin yellow molded low-ESR polymer-tantalum pulse capacitors (100µF / 16V)
    for (const cx of [-3.6, 3.6]) {
      const tCap = buildTantalumCap(
        5.8,
        3.4,
        2.15,
        mats.tantalumCapYellow,
        mats.cinnabarAnodized,
        mats.solderBallSilver,
        'z'
      );
      tCap.position.set(cx, 1.2, 1.48);
      g.add(tCap);
    }

    // 4x high-frequency low-ESL X7R ceramic bypass capacitors in parallel row
    for (let i = 0; i < 4; i++) {
      const mlcc = buildSmdPassive(2.3, 1.4, 1.15, mats.smdCeramic, mats.solderBallSilver, 'z');
      mlcc.position.set(-4.8 + i * 3.2, -2.35, 1.0);
      g.add(mlcc);
    }

    // Thick copper pulse busbar along top edge
    const bus = new THREE.Mesh(
      createChamferedBoxGeo(13.6, 1.0, 0.32, 0.15, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    bus.position.set(0, 3.65, 0.58);
    g.add(bus);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-boost-cap-bank',
        114,
        '#eab308',
        g,
        new THREE.Vector3(35.5, 22.5, 10.7),
        new THREE.Vector3(68.0, 74.0, -32.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH115. Charge-Motor EMI Pi-Filter Ferrite Beads, Bypass Caps & Resettable PTC Polyfuse
  // =========================================================================
  {
    const g = new THREE.Group();
    // Motor-tail EMI filter PCB carrying twin shielded ferrite chokes, pi-network MLCCs & green/gold resettable PTC stall polyfuse
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(13.6, 7.6, 0.75, 0.65, 0.08, 'z'),
      mats.hdiMainboardPcb
    );
    g.add(pcb);

    // Twin shielded ferrite power chokes (Pi-filter series impedance blocking brush arcing RF)
    for (const lx of [-3.6, 1.0]) {
      const choke = buildShieldedInductor(
        3.2,
        1.75,
        mats.ferriteInductor,
        mats.solderBallSilver,
        mats.silverElectrode,
        'z'
      );
      choke.position.set(lx, 0.8, 1.25);
      g.add(choke);
    }

    // Resettable polymeric PTC stall-protection polyfuse (amber/gold striped element)
    const ptc = buildSmdPassive(3.4, 2.2, 1.15, mats.varistorRingBlue, mats.goldPlating, 'z', mats.beCuSpring);
    ptc.position.set(4.6, 0.8, 0.96);
    g.add(ptc);

    // 3x Pi-filter shunt ceramic bypass capacitors (0.1µF + 1000pF RF traps)
    for (let i = 0; i < 3; i++) {
      const cap = buildSmdPassive(2.0, 1.2, 0.85, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(-3.6 + i * 3.6, -2.15, 0.8);
      g.add(cap);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-motor-emi-pifilter',
        115,
        '#3b82f6',
        g,
        new THREE.Vector3(38.0, -12.0, 11.2),
        new THREE.Vector3(96.0, 66.0, -42.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH116. Sony OEM Light-Blocking Tape (Ref.468: 631S #25) & Conductive Ni-Cu EMI Shield Foil
  // =========================================================================
  {
    const g = new THREE.Group();
    // Layered FPC routing dress-kit: Matte black Kapton/polyester Tape 631S #25 strip + woven Ni-Cu conductive EMI shield fabric + ESD ground clip
    const tapeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-7.0, 0, -0.4),
      new THREE.Vector3(-2.5, 1.6, 0.25),
      new THREE.Vector3(2.8, 1.4, 0.35),
      new THREE.Vector3(7.2, -0.6, -0.25),
    ]);
    const ribbonShape = new THREE.Shape();
    ribbonShape.moveTo(-0.22, -2.8);
    ribbonShape.lineTo(0.22, -2.8);
    ribbonShape.lineTo(0.22, 2.8);
    ribbonShape.lineTo(-0.22, 2.8);
    ribbonShape.closePath();

    const blackTape = new THREE.Mesh(
      markHiRes(
        new THREE.ExtrudeGeometry(ribbonShape, {
          steps: 28,
          bevelEnabled: false,
          extrudePath: tapeCurve,
        })
      ),
      mats.velvetFlockTrap
    );
    blackTape.position.set(0, 0, 0.55);
    g.add(blackTape);

    // Underlying metallic woven Ni-Cu conductive EMI shield foil strip
    const emiFoil = new THREE.Mesh(
      createChamferedBoxGeo(13.6, 5.2, 0.28, 0.4, 0.04, 'z'),
      mats.conductiveNiCuFoam
    );
    emiFoil.position.set(0, -0.2, -0.45);

    // BeCu chassis grounding finger tab contacting the conductive foil
    const gndClip = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 3.8, 0.75, 0.3, 0.06, 'z'),
      mats.beCuSpring
    );
    gndClip.position.set(6.2, -0.2, -0.75);
    g.add(emiFoil, gndClip);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-fpc-shield-tape-631s',
        116,
        '#475569',
        g,
        new THREE.Vector3(22.0, 25.5, 11.1),
        new THREE.Vector3(42.0, 78.0, -46.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH117. Anisotropic Magnetoresistive (AMR) / Dual-Hall Curtain-Arm Linear Angle Encoder
  // =========================================================================
  {
    const g = new THREE.Group();
    // Diametrically magnetized N52 target magnet on arm shaft + opposing AMR Wheatstone-bridge sensor IC on rigid-flex board
    const magN = new THREE.Mesh(
      hiResCyl(2.4, 2.4, 1.35, 28, false, 0, Math.PI).rotateX(Math.PI / 2),
      mats.neodymiumMagnet
    );
    const magS = new THREE.Mesh(
      hiResCyl(2.4, 2.4, 1.35, 28, false, Math.PI, Math.PI).rotateX(Math.PI / 2),
      mats.cinnabarAnodized
    );
    magN.position.set(0, 0, 1.85);
    magS.position.set(0, 0, 1.85);
    g.add(magN, magS);

    // Sense carrier PCB facing the rotating magnet across a 0.8mm air gap
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(10.6, 7.2, 0.65, 0.6, 0.06, 'z'),
      mats.sensorPcb
    );
    pcb.position.set(0, 0, -1.05);
    g.add(pcb);

    // QFN AMR / Hall sinusoidal angle encoder IC centered directly on shaft axis
    const amrIc = buildChipPackage({
      w: 3.8,
      d: 3.8,
      h: 0.85,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      topAccentMat: mats.siliconLogicLayer,
      axis: 'z',
    });
    amrIc.position.set(0, 0, -0.32);
    g.add(amrIc);

    // Twin precision decoupling caps flanking the encoder IC
    for (const cx of [-3.6, 3.6]) {
      const cap = buildSmdPassive(1.5, 0.9, 0.6, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(cx, 0, -0.45);
      g.add(cap);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-amr-linear-angle-sensor',
        117,
        '#8b5cf6',
        g,
        new THREE.Vector3(27.0, 9.0, 11.5),
        new THREE.Vector3(14.0, 76.0, -34.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH118. X-Sync High-Voltage Semiconductor Isolation Trigger Stage (Thyristor / Optocoupler)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Isolation PCB with white 250V-rated optical coupler barrier + high-voltage SCR/IGBT thyristor switch + creepage isolation slot
    const pcbShape = createRoundedRectShape(13.4, 8.2, 0.7);
    const creepSlot = new THREE.Path();
    creepSlot.moveTo(-0.4, -2.6);
    creepSlot.lineTo(0.4, -2.6);
    creepSlot.lineTo(0.4, 2.6);
    creepSlot.lineTo(-0.4, 2.6);
    creepSlot.closePath();
    pcbShape.holes.push(creepSlot);
    const pcb = new THREE.Mesh(
      extrudeHiRes(pcbShape, 0.78, 0.06, 0.06, 2, 12),
      mats.hdiMainboardPcb
    );
    g.add(pcb);

    // White high-voltage optical isolator bridging across the air-gap creepage slot
    const opto = buildChipPackage({
      w: 4.8,
      d: 3.4,
      h: 1.45,
      style: 'soic',
      pinsPerSide: 2,
      bodyMat: mats.zifIvoryPlastic,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.cinnabarAnodized,
      axis: 'z',
    });
    opto.position.set(0, 0.8, 1.15);
    g.add(opto);

    // High-voltage 250V SCR/IGBT strobe sync switch package on hot-shoe side
    const thyristor = buildChipPackage({
      w: 3.4,
      d: 3.0,
      h: 1.1,
      style: 'sot23',
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      axis: 'z',
    });
    thyristor.position.set(4.5, -1.6, 0.95);
    g.add(thyristor);

    // Current-limiting input resistor & ESD TVS protection diode on camera MCU side
    const limR = buildSmdPassive(2.2, 1.2, 0.75, mats.smdCeramic, mats.solderBallSilver, 'z');
    limR.position.set(-4.4, -1.6, 0.78);
    g.add(limR);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-xsync-thyristor-isolator',
        118,
        '#f43f5e',
        g,
        new THREE.Vector3(-23.0, -15.5, 11.5),
        new THREE.Vector3(-42.0, 74.0, 10.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH119. JIS B 7091 3-Point Exposure-Uniformity Optical Metrology Reference Port (0.2 mm Slits)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame calibration metrology border frame clearing 36x24mm optical window, with 3 JIS B 7091 0.2mm reference slit ports on left margin
    const jigShape = createFrameShape(47.0, 34.5, 1.8, 39.0, 26.8, 0.8, 0, 0);
    const jig = new THREE.Mesh(
      extrudeHiRes(jigShape, 0.65, 0.07, 0.07, 2, 18),
      mats.invarScaleBar
    );
    g.add(jig);

    // Left-flank vertical metrology bar carrying 3 standardized Top / Center / Bottom 0.2 mm reference photodiodes
    const spine = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 26.0, 0.72, 0.35, 0.05, 'z'),
      mats.matteBlackAnodized
    );
    spine.position.set(-21.2, 0, 0.15);
    g.add(spine);

    for (const sy of [8.6, 0.0, -8.6]) {
      const pd = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 0.65, 0.75, 0.08, 0.03, 'z'),
        mats.siliconSensorDie
      );
      pd.position.set(-21.2, sy, 0.28);
      const slitMask = new THREE.Mesh(
        createChamferedBoxGeo(3.4, 0.2, 0.26, 0.04, 0.02, 'z'),
        mats.goldPlating
      );
      slitMask.position.set(-21.2, sy, 0.72);
      g.add(pd, slitMask);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-jis-metrology-slit-target',
        119,
        '#0ea5e9',
        g,
        new THREE.Vector3(0.0, 0.0, 11.2),
        new THREE.Vector3(-24.0, 76.0, -24.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH120. Sony OEM Top Heat Dissipation Plate (Ref.453: 474824101 AS HEAT PLATE TOP)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stamped copper/aluminum alloy crown heat bridge spanning above the shutter mecha device with 4 mounting ears & cooling ribs
    const plateShape = createRoundedRectShape(34.0, 7.6, 1.4);
    for (const hx of [-13.5, 13.5]) {
      const h = new THREE.Path();
      h.absarc(hx, 0, 1.05, 0, Math.PI * 2, true);
      plateShape.holes.push(h);
    }
    const plate = new THREE.Mesh(
      extrudeHiRes(plateShape, 0.72, 0.08, 0.08, 2, 16),
      mats.copperHeatSpreader
    );
    plate.rotation.x = Math.PI / 2;
    g.add(plate);

    // Stepped vertical thermal pickup flange descending onto the solenoid bay
    const pickupTab = new THREE.Mesh(
      createChamferedBoxGeo(11.0, 4.2, 0.65, 0.6, 0.06, 'z'),
      mats.copperHeatSpreader
    );
    pickupTab.position.set(9.2, -2.0, -2.6);
    g.add(pickupTab);

    // Micro heat-spreader fin ribs on upper crown face
    for (let i = 0; i < 6; i++) {
      const fin = new THREE.Mesh(
        createChamferedBoxGeo(18.0, 0.42, 0.45, 0.08, 0.04, 'z'),
        mats.stainlessMachined
      );
      fin.position.set(-2.5, 0.52, -2.2 + i * 0.88);
      g.add(fin);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-oem-heat-plate-top',
        120,
        '#d97706',
        g,
        new THREE.Vector3(7.5, 26.8, 15.0),
        new THREE.Vector3(6.0, 48.0, 108.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH121. Sony OEM Top Heat Plate Thermal Spacer (Ref.470: 503058201 AS HEAT PLT SPACER TOP)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded thermal-gap elastomer/silicone interface spacer seated between mecha crown & Ref.453 top heat plate
    const spacerShape = createRoundedRectShape(24.0, 6.2, 1.1);
    const cutout = new THREE.Path();
    cutout.absarc(0, 0, 1.5, 0, Math.PI * 2, true);
    spacerShape.holes.push(cutout);
    const mainSpacer = new THREE.Mesh(
      extrudeHiRes(spacerShape, 1.25, 0.14, 0.14, 2, 16),
      mats.thermalPadBlue
    );
    mainSpacer.rotation.x = Math.PI / 2;
    g.add(mainSpacer);

    // Twin precision standoff compression limiters preventing over-squishing of the TIM spacer
    for (const sx of [-9.2, 9.2]) {
      const collar = new THREE.Mesh(
        hiResCyl(1.45, 1.45, 1.35, 20),
        mats.brassGear
      );
      collar.position.set(sx, 0, 0);
      g.add(collar);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-oem-heat-spacer-top',
        121,
        '#38bdf8',
        g,
        new THREE.Vector3(7.5, 25.6, 15.0),
        new THREE.Vector3(44.0, 34.0, 102.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH122. Sony OEM Pyrolytic Graphite Sheet Top A (Ref.454: 500490202 MB GRAPHITE SHEET TOP A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Die-cut L-shaped 25µm pyrolytic graphite sheet (PGS) with acrylic transfer adhesive & polyimide insulating edge border
    const pgsShape = new THREE.Shape();
    pgsShape.moveTo(-15.0, -3.2);
    pgsShape.lineTo(15.0, -3.2);
    pgsShape.lineTo(15.0, 3.6);
    pgsShape.lineTo(4.0, 3.6);
    pgsShape.lineTo(4.0, 1.2);
    pgsShape.lineTo(-15.0, 1.2);
    pgsShape.closePath();
    const pgs = new THREE.Mesh(
      extrudeHiRes(pgsShape, 0.24, 0.03, 0.03, 1, 10),
      mats.pyroGraphite
    );
    pgs.rotation.x = Math.PI / 2;
    g.add(pgs);

    // Amber polyimide PET protective edge frame preventing carbon-dust flaking near optics
    const border = new THREE.Mesh(
      createChamferedBoxGeo(30.8, 0.16, 7.4, 0.8, 0.03, 'y'),
      mats.thermalTransferTape
    );
    border.position.set(0, -0.18, 0.2);
    g.add(border);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-oem-graphite-top',
        122,
        '#1e293b',
        g,
        new THREE.Vector3(7.5, 27.5, 15.0),
        new THREE.Vector3(-34.0, 36.0, 106.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH123. Sony OEM Front Mount-Box Mask Sheet & PSA Tape (Ref.566/567: 502816301 / 502816401)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-matte black polyester aperture baffle sheet (Ref.566) + die-cut pressure-sensitive adhesive ring (Ref.567) just behind E-mount box
    const maskShape = createFrameShape(48.0, 35.0, 2.4, 37.8, 25.8, 0.9, 0, 0);
    const maskSheet = new THREE.Mesh(
      extrudeHiRes(maskShape, 0.28, 0.03, 0.03, 1, 18),
      mats.mountVelvetBaffle
    );
    maskSheet.position.set(0, 0, 0.45);

    // Die-cut double-sided PSA tape gasket (Ref.567) with corner pull-tabs
    const tapeShape = createFrameShape(46.8, 33.8, 2.2, 39.4, 27.4, 0.8, 0, 0);
    const psaTape = new THREE.Mesh(
      extrudeHiRes(tapeShape, 0.18, 0.02, 0.02, 1, 16),
      mats.thermalTransferTape
    );
    psaTape.position.set(0, 0, -0.45);

    // 4 precision corner alignment ears
    for (const [ex, ey] of [
      [-23.8, 16.5],
      [23.8, 16.5],
      [-23.8, -16.5],
      [23.8, -16.5],
    ] as Array<[number, number]>) {
      const ear = new THREE.Mesh(
        hiResCyl(1.45, 1.45, 0.35, 18).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      ear.position.set(ex, ey, 0.45);
      g.add(ear);
    }

    g.add(maskSheet, psaTape);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-oem-mb-mask-sheet',
        123,
        '#0f172a',
        g,
        new THREE.Vector3(0.0, 0.0, 19.35),
        new THREE.Vector3(0.0, 0.0, 122.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH124. Sony OEM 12-Grade Selection Adjustment Washers (Ref.456: IM ADJUST WASHER D 25–600 µm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Fan display of 6 graduated thickness calibration shims (representing the 12-grade 0.025–0.600 mm Sony OEM selection kit!)
    const grades: Array<{ t: number; mat: THREE.Material; z: number; dx: number }> = [
      { t: 0.14, mat: mats.stainlessMachined, z: -2.2, dx: -5.0 },
      { t: 0.24, mat: mats.mountShimBlue, z: -1.3, dx: -3.0 },
      { t: 0.36, mat: mats.brassGear, z: -0.4, dx: -1.0 },
      { t: 0.50, mat: mats.titaniumRivet, z: 0.5, dx: 1.0 },
      { t: 0.68, mat: mats.beCuSpring, z: 1.5, dx: 3.0 },
      { t: 0.90, mat: mats.cinnabarAnodized, z: 2.6, dx: 5.0 },
    ];
    const shimShape = new THREE.Shape();
    shimShape.absarc(0, 0, 3.6, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 1.65, 0, Math.PI * 2, true);
    shimShape.holes.push(hole);

    for (const gr of grades) {
      const washer = new THREE.Mesh(
        extrudeHiRes(shimShape, gr.t, 0.03, 0.03, 1, 24),
        gr.mat
      );
      washer.position.set(gr.dx, 0, gr.z);
      g.add(washer);

      // Identification ear tab (differing angle per thickness grade for instant factory visual sorting!)
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(1.4, 1.0, gr.t, 0.2, 0.02, 'z'),
        gr.mat
      );
      tab.position.set(gr.dx, 3.9, gr.z);
      g.add(tab);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-oem-adjust-washer-d',
        124,
        '#2563eb',
        g,
        new THREE.Vector3(7.5, 22.5, 9.15),
        new THREE.Vector3(-42.0, 26.0, -88.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH125. Flagship 500,000-Cycle (AFE-3379) Truss-Reinforced Chassis Rib & Sub-Mount
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame high-stiffness triangulated aerospace truss reinforcing frame (clearing 36x24mm aperture!) + dual damped sub-mount ears
    const outerBar = createFrameShape(72.0, 52.0, 3.0, 42.0, 30.0, 1.4, -7.5, 0);
    const frame = new THREE.Mesh(
      extrudeHiRes(outerBar, 1.15, 0.1, 0.1, 2, 18),
      mats.magnesiumCast
    );
    g.add(frame);

    // Triangulated diagonal stiffening truss struts strictly along upper & lower perimeter beams (y = ±20.4, zero window intrusion!)
    for (const ty of [20.4, -20.4]) {
      for (let i = 0; i < 6; i++) {
        const tx = -22.0 + i * 8.6;
        const strut = new THREE.Mesh(
          createChamferedBoxGeo(1.05, 8.2, 1.05, 0.16, 0.05, 'z'),
          mats.shutterChassis
        );
        strut.position.set(tx, ty, 0);
        strut.rotation.z = i % 2 === 0 ? 0.56 : -0.56;
        g.add(strut);
      }
    }

    // Twin isolated silicone sub-mount grommet bosses at left/right flanks
    for (const ex of [-37.2, 37.2]) {
      const ear = new THREE.Mesh(
        hiResCyl(2.5, 2.5, 1.85, 22).rotateX(Math.PI / 2),
        mats.butylDamperRubber
      );
      ear.position.set(ex, 0, 0);
      const sleeve = new THREE.Mesh(
        hiResCyl(1.15, 1.15, 2.35, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      sleeve.position.set(ex, 0, 0);
      g.add(ear, sleeve);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-afe3379-500k-rib',
        125,
        '#475569',
        g,
        new THREE.Vector3(7.5, 0.0, 10.35),
        new THREE.Vector3(0.0, 16.0, -98.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH126. Micro M1.0/M1.2 Pan Screws, SUS304 E-Ring Circlips & Blue Anaerobic Thread-Locker
  // =========================================================================
  {
    const g = new THREE.Group();
    // Watchmaker fastener showcase: 3x precision Phillips micro-screws with blue anaerobic thread-locker collars + 3x SUS304 E-ring circlips!
    for (let i = 0; i < 3; i++) {
      const sx = -4.8 + i * 4.8;
      const screw = buildPhillipsScrew(
        1.45,
        0.72,
        0.62,
        4.6,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      screw.rotation.x = Math.PI / 2;
      screw.position.set(sx, 2.2, -1.6);
      g.add(screw);

      // Vivid blue anaerobic thread-locking resin collar coating the lower threads
      const lockBand = new THREE.Mesh(
        hiResCyl(0.76, 0.72, 1.65, 18).rotateX(Math.PI / 2),
        mats.mountThreadLockBlue
      );
      lockBand.position.set(sx, 2.2, 1.65);
      lockBand.userData.noEdges = true;
      g.add(lockBand);

      // Matching SUS304 3-prong E-ring circlip below each screw
      const eringShape = new THREE.Shape();
      eringShape.absarc(0, 0, 1.95, 0.55, Math.PI * 2 - 0.55, false);
      eringShape.absarc(0, 0, 1.15, Math.PI * 2 - 0.55, 0.55, true);
      eringShape.closePath();
      const ering = new THREE.Mesh(
        extrudeHiRes(eringShape, 0.34, 0.04, 0.04, 1, 20),
        mats.mountSpringSteel
      );
      ering.position.set(sx, -2.6, 0);
      // 3 inward retention prongs gripping the shaft groove
      for (const ang of [Math.PI * 0.5, Math.PI, Math.PI * 1.5]) {
        const prong = new THREE.Mesh(
          createChamferedBoxGeo(0.55, 0.55, 0.36, 0.08, 0.02, 'z'),
          mats.mountSpringSteel
        );
        prong.position.set(sx + Math.cos(ang) * 1.0, -2.6 + Math.sin(ang) * 1.0, 0);
        g.add(prong);
      }
      g.add(ering);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-micro-fasteners-ecirc',
        126,
        '#3b82f6',
        g,
        new THREE.Vector3(28.0, 0.0, 11.4),
        new THREE.Vector3(48.0, 22.0, -92.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH127. Shutter-to-Sensor Optical Distance d_s Spacer & F1.2 Bokeh Knife-Edge Baffle
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame CNC anodized knife-edge optical aperture spacer clearing 36x24mm aperture (Optica JOSA efficiency η = W / (W + d_s/A))
    const outerFrame = createFrameShape(46.5, 34.0, 2.0, 38.4, 26.4, 0.8, 0, 0);
    const body = new THREE.Mesh(
      extrudeHiRes(outerFrame, 0.72, 0.08, 0.08, 2, 18),
      mats.matteBlackAnodized
    );
    g.add(body);

    // Tapered inner knife-edge optical baffle lip (razor chamfered to stop oblique F1.2 cone clipping & specular bounce)
    const innerLip = createFrameShape(40.2, 28.2, 0.9, 37.8, 25.8, 0.5, 0, 0);
    const lip = new THREE.Mesh(
      extrudeHiRes(innerLip, 0.34, 0.12, 0.12, 2, 16),
      mats.velvetFlockTrap
    );
    lip.position.set(0, 0, 0.48);
    g.add(lip);

    // 4 sapphire-cyan optical gauge pillars indicating the calibrated d_s air-gap to the CMOS focal plane
    for (const [gx, gy] of [
      [-20.8, 14.6],
      [20.8, 14.6],
      [-20.8, -14.6],
      [20.8, -14.6],
    ] as Array<[number, number]>) {
      const pillar = new THREE.Mesh(
        hiResCyl(0.78, 0.78, 1.85, 16).rotateX(Math.PI / 2),
        mats.fluorineCoatCyan
      );
      pillar.position.set(gx, gy, -1.1);
      g.add(pillar);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-ds-bokeh-knife-baffle',
        127,
        '#06b6d4',
        g,
        new THREE.Vector3(0.0, 0.0, 9.55),
        new THREE.Vector3(-46.0, -24.0, 98.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH128. Precision-Turned SUS304/Brass Charge-Unit Idler Stub Shafts & Press-Fit Collars
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sub-plate with 3 Swiss-lathe-turned stepped idler stub shafts (h6 tolerance) + knurled press-fit brass retaining collars
    const base = new THREE.Mesh(
      createChamferedBoxGeo(14.5, 8.0, 0.72, 0.9, 0.08, 'z'),
      mats.shutterChassis
    );
    base.position.set(0, 0, -1.5);
    g.add(base);

    const shaftProf = [
      new THREE.Vector2(0.01, -1.4),
      new THREE.Vector2(1.45, -1.4),
      new THREE.Vector2(1.45, -0.45),
      new THREE.Vector2(0.95, -0.35),
      new THREE.Vector2(0.95, 2.15),
      new THREE.Vector2(0.72, 2.55),
      new THREE.Vector2(0.01, 2.55),
    ];
    const shaftGeo = markHiRes(new THREE.LatheGeometry(shaftProf, 26)).rotateX(Math.PI / 2);

    for (const [sx, sy] of [
      [-4.6, 1.2],
      [0.0, -1.4],
      [4.6, 1.2],
    ] as Array<[number, number]>) {
      const pin = new THREE.Mesh(shaftGeo, mats.stainlessMachined);
      pin.position.set(sx, sy, 0.15);
      const collar = new THREE.Mesh(
        hiResCyl(1.75, 1.75, 0.95, 24).rotateX(Math.PI / 2),
        mats.brassGear
      );
      collar.position.set(sx, sy, -0.75);
      const oilGroove = new THREE.Mesh(hiResTorus(0.96, 0.08, 8, 22), mats.goldPlating);
      oilGroove.position.set(sx, sy, 1.15);
      oilGroove.userData.noEdges = true;
      g.add(pin, collar, oilGroove);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-charge-idler-stub-shafts',
        128,
        '#cbd5e1',
        g,
        new THREE.Vector3(33.0, -14.0, 11.8),
        new THREE.Vector3(54.0, -30.0, -96.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH129. Hybrid Mechanical / EFCS / Global-Shutter Synchronization Trigger Bus
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-speed FPGA/timer arbitration sub-module + precision 48 MHz crystal oscillator + differential LVDS shutter-to-CMOS sync ribbon
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(16.0, 9.0, 0.8, 0.7, 0.08, 'z'),
      mats.sensorPcb
    );
    g.add(pcb);

    // Real-time microsecond sync arbiter QFN ASIC
    const arbiterIc = buildChipPackage({
      w: 5.2,
      d: 5.2,
      h: 0.95,
      style: 'qfn',
      pinsPerSide: 7,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      topAccentMat: mats.siliconDramLayer,
      axis: 'z',
    });
    arbiterIc.position.set(-1.6, 0, 0.88);
    g.add(arbiterIc);

    // Hermetic gold-lid 48 MHz quartz timing crystal (1 ppm sync clock)
    const xtal = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 2.4, 0.85, 0.25, 0.08, 'z'),
      mats.goldPlating
    );
    xtal.position.set(4.5, 1.8, 0.85);
    g.add(xtal);

    // 4 differential gold LVDS timing lanes running to the CMOS row-reset bus
    for (let i = 0; i < 4; i++) {
      const lane = new THREE.Mesh(
        createChamferedBoxGeo(4.8, 0.28, 0.12, 0.05, 0.02, 'z'),
        mats.copperHeatSpreader
      );
      lane.position.set(4.6, -2.5 + i * 0.72, 0.48);
      g.add(lane);
    }

    // Decoupling ceramic capacitors on left rail
    for (const cy of [-2.0, 2.0]) {
      const c = buildSmdPassive(1.6, 0.95, 0.65, mats.smdCeramic, mats.solderBallSilver, 'z');
      c.position.set(-6.0, cy, 0.72);
      g.add(c);
    }

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-hybrid-gs-sync-bus',
        129,
        '#6366f1',
        g,
        new THREE.Vector3(18.0, -23.0, 10.2),
        new THREE.Vector3(-44.0, -36.0, -96.0),
        cp
      )
    );
  }

  // =========================================================================
  // SH130. Dedicated Thick-Blade Mechanical Sensor-Shield Comparison Module (Z9/Z8 Shutterless Era)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame armored 3-blade thick aluminum sensor shield module (0.25mm rigid blades retracted in upper pocket when powered ON, clearing 36x24mm aperture!)
    const frameShape = createFrameShape(47.5, 36.0, 2.2, 38.8, 26.8, 0.9, 0, 0);
    const frame = new THREE.Mesh(
      extrudeHiRes(frameShape, 0.95, 0.08, 0.08, 2, 18),
      mats.matteBlackAnodized
    );
    g.add(frame);

    // 3 armored interlocking thick aluminum-alloy shield blades with rigid stiffening swage beads parked cleanly in upper pocket (y = +15.0..+16.2)
    for (let i = 0; i < 3; i++) {
      const by = 16.0 - i * 0.55;
      const bz = 0.22 + i * 0.34;
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(38.4, 2.6, 0.28, 0.16, 0.04, 'z'),
        i % 2 === 0 ? mats.shutterShieldBlade : mats.stainlessMachined
      );
      blade.position.set(0, by, bz);
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(36.2, 0.44, 0.16, 0.08, 0.03, 'z'),
        mats.titaniumRivet
      );
      rib.position.set(0, by, bz + 0.18);
      g.add(blade, rib);
    }

    // Dedicated micro stepper motor + lead-screw seated cleanly on right drive-bay flank (outside optical window!)
    const stepper = new THREE.Mesh(
      hiResCyl(2.2, 2.2, 6.2, 24),
      mats.emiShieldCan
    );
    stepper.position.set(27.2, 6.4, 0.1);
    const leadScrew = new THREE.Mesh(
      hiResCyl(0.65, 0.65, 11.2, 16),
      mats.brassGear
    );
    leadScrew.position.set(27.2, -2.6, 0.1);
    const sliderNut = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.0, 1.8, 0.3, 0.08, 'z'),
      mats.pomGear
    );
    sliderNut.position.set(27.2, -1.8, 0.1);
    g.add(stepper, leadScrew, sliderNut);

    parts.push(
      finalizePhase34ShutterPartB(
        'shutter-thick-blade-sensor-shield',
        130,
        '#0f766e',
        g,
        new THREE.Vector3(0.0, 0.0, 17.15),
        new THREE.Vector3(54.0, -22.0, 104.0),
        cp
      )
    );
  }

  return parts;
}
