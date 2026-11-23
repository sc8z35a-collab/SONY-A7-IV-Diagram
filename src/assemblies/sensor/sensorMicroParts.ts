import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { MACRO_EXPLANATIONS } from './explanations';

function finalizeStandaloneSensorMicroPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  options?: { ibisMovable?: boolean; ultrasonicElement?: boolean; edgeOpacity?: number }
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(
    group,
    clippingPlanes,
    24,
    options?.edgeOpacity ?? 0.24
  );

  return {
    id,
    subsystem: 'sensor',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: MACRO_EXPLANATIONS[id],
    ibisMovable: options?.ibisMovable ?? false,
    ultrasonicElement: options?.ultrasonicElement ?? false,
    standaloneOnly: true,
  };
}

/**
 * Phase 14: 24 Standalone-Only Full-Frame Sensor & 5-Axis IBIS OEM Micro-Parts (S41–S64).
 * Omitted completely in whole-camera views ('integrated' / 'camera_body'); rendered ONLY in standalone 'sensor' view.
 */
export function buildSensorMicroParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // S41: IM PLATE (5000), GLASS RETAINER — Uniform Leaf-Spring Filter Clamp (Sony Ref.502)
  // =========================================================================
  {
    const g = new THREE.Group();
    const frameShape = createFrameShape(42.4, 30.8, 2.0, 36.8, 24.8, 0.8);
    const plate = new THREE.Mesh(
      extrudeCentered(frameShape, 0.28, 0.04, 0.04, 20),
      mats.matteBlackAnodized
    );
    g.add(plate);

    // 4 raised leaf-spring pressure tongues pressing evenly onto optical filter corners
    for (const [sx, sy] of [
      [-19.5, 13.8],
      [19.5, 13.8],
      [-19.5, -13.8],
      [19.5, -13.8],
    ] as Array<[number, number]>) {
      const springTab = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 1.5, 0.48),
        mats.mountSpringSteel
      );
      springTab.position.set(sx, sy, -0.22);
      springTab.rotation.z = sx * sy > 0 ? -0.35 : 0.35;
      g.add(springTab);
    }

    // 4 side snap-engagement claws hooking onto filter holder ears
    for (const sx of [-21.35, 21.35]) {
      for (const sy of [-8.0, 8.0]) {
        const claw = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 3.2, 1.65),
          mats.matteBlackAnodized
        );
        claw.position.set(sx, sy, -0.78);
        g.add(claw);
      }
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-glass-retainer-plate',
        41,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 6.55),
        new THREE.Vector3(44, 18, 78),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S42: IM MASK PLATE (5100) — Ultra-Thin Matte-Black Optical Stray-Light Mask (Sony Ref.503)
  // =========================================================================
  {
    const g = new THREE.Group();
    const maskShape = createFrameShape(40.8, 29.2, 1.5, 36.2, 24.2, 0.45);
    const maskMesh = new THREE.Mesh(
      extrudeCentered(maskShape, 0.14, 0.02, 0.02, 20),
      mats.velvetFlockTrap
    );
    g.add(maskMesh);

    // Micro-beveled inner light-trap edge frame strips along all 4 sides
    for (const sy of [-12.25, 12.25]) {
      const lip = new THREE.Mesh(new THREE.BoxGeometry(36.6, 0.38, 0.2), mats.matteBlackAnodized);
      lip.position.set(0, sy, 0.03);
      g.add(lip);
    }
    for (const sx of [-18.25, 18.25]) {
      const lip = new THREE.Mesh(new THREE.BoxGeometry(0.38, 24.6, 0.2), mats.matteBlackAnodized);
      lip.position.set(sx, 0, 0.03);
      g.add(lip);
    }

    // 2 factory orientation datum notches (asymmetric poke-yoke key)
    const notch = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 0.16), mats.goldPlating);
    notch.position.set(17.4, 14.0, 0.02);
    g.add(notch);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-im-mask-plate',
        42,
        '#0f172a',
        g,
        new THREE.Vector3(0, 0, 5.45),
        new THREE.Vector3(-44, 16, 66),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S43: Ultrasonic Fallen-Dust Adhesive Trap Strip (SSWF Lower Dust Catcher)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Black aluminum trough carrier bar at chamber bottom
    const trough = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(39.0, 3.0, 0.5), 1.0, 0.06, 0.06, 12),
      mats.matteBlackAnodized
    );
    g.add(trough);

    // Translucent non-outgassing tacky silicone dust-catcher gel strip
    const stickyGel = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(36.8, 2.0, 0.3), 0.55, 0.05, 0.05, 12),
      mats.dustCatcherGel
    );
    stickyGel.position.set(0, 0.15, 0.55);
    g.add(stickyGel);

    // Subtle captured microscopic dust specks visualized inside gel trough
    for (const [dx, dy] of [
      [-11.2, 0.2],
      [-4.8, -0.15],
      [2.6, 0.25],
      [9.4, -0.1],
      [14.1, 0.15],
    ] as Array<[number, number]>) {
      const speck = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), mats.ceramicAlumina);
      speck.position.set(dx, dy, 0.84);
      speck.userData.noEdges = true;
      g.add(speck);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-dust-catcher-tape',
        43,
        '#f59e0b',
        g,
        new THREE.Vector3(0, -17.2, 6.5),
        new THREE.Vector3(-32, -32, 72),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S44: Index-Matched UV Optical Cement Layers (OCA 3-Layer Stack Bond)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 thin crystal-clear index-matched (n≈1.52) optical bond films between OLPF / QWP / IR-cut
    for (const dz of [-0.62, 0.0, 0.62]) {
      const ocaFilm = new THREE.Mesh(
        new THREE.BoxGeometry(38.6, 26.8, 0.12),
        mats.opticalCementClear
      );
      ocaFilm.position.z = dz;
      g.add(ocaFilm);

      // Thin meniscus perimeter bead highlighting zero-bubble vacuum optical bond
      const beadShape = createFrameShape(39.0, 27.2, 0.8, 38.2, 26.4, 0.5);
      const bead = new THREE.Mesh(
        extrudeCentered(beadShape, 0.16, 0.02, 0.02, 14),
        mats.sswfGlass
      );
      bead.position.z = dz;
      g.add(bead);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-optical-cement-layers',
        44,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 4.1),
        new THREE.Vector3(46, -14, 46),
        cp,
        { ibisMovable: true, edgeOpacity: 0.3 }
      )
    );
  }

  // =========================================================================
  // S45: SHEET (5100), SPACER — Dust-Sealing Optical Gap Spacer (Sony Ref.505)
  // =========================================================================
  {
    const g = new THREE.Group();
    const spacerShape = createFrameShape(41.8, 30.2, 1.8, 36.8, 24.8, 0.7);
    const spacer = new THREE.Mesh(
      extrudeCentered(spacerShape, 0.36, 0.03, 0.03, 20),
      mats.butylDamperRubber
    );
    g.add(spacer);

    // Double-sided micro-seal gasket ridge running 360° around the inner border
    const lipShape = createFrameShape(39.8, 28.2, 1.1, 38.2, 26.6, 0.8);
    const lip = new THREE.Mesh(
      extrudeCentered(lipShape, 0.46, 0.03, 0.03, 18),
      mats.epdmGasket
    );
    g.add(lip);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-filter-spacer-sheet',
        45,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 2.65),
        new THREE.Vector3(-46, -16, 30),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S46: Dedicated High-Voltage Piezoelectric Ultrasonic Drive Flex Ribbon
  // =========================================================================
  {
    const g = new THREE.Group();
    // L-shaped slender amber polyimide ribbon routing from PZT bar end to rear board
    const mainStrip = new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.6, 0.18), mats.polyimideFpc);
    mainStrip.position.set(2.2, 0, 0);
    g.add(mainStrip);

    // Two parallel high-voltage silver/gold solder lands contacting PZT bar electrodes
    for (const dy of [-0.6, 0.6]) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.48, 0.22), mats.goldPlating);
      trace.position.set(2.2, dy, 0.02);
      g.add(trace);
    }

    // Rearward Z-bend flex leg with stress-relief meander loop
    const bendLeg = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 6.2), mats.polyimideFpc);
    bendLeg.position.set(6.8, 0, -3.0);
    g.add(bendLeg);

    // 2-pin micro ZIF gold contact tail
    const tail = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.8, 0.32), mats.zifIvoryPlastic);
    tail.position.set(6.8, -1.2, -6.1);
    g.add(tail);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-piezo-drive-fpc',
        46,
        '#ea580c',
        g,
        new THREE.Vector3(15.5, -14.2, 6.4),
        new THREE.Vector3(34, -32, 64),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S47: Hermetic Glass-Frit Seal Ring & Dry-Nitrogen (N2) Sealed Cavity
  // =========================================================================
  {
    const g = new THREE.Group();
    // Low-temp glass-frit hermetic seal bead bonding cover glass to ceramic cavity rim
    const fritShape = createFrameShape(42.0, 30.0, 1.6, 39.2, 27.2, 1.0);
    const fritRing = new THREE.Mesh(
      extrudeCentered(fritShape, 0.48, 0.05, 0.05, 22),
      mats.kovarSeal
    );
    g.add(fritRing);

    // Subtle translucent dry-nitrogen (N2) sealed micro-chamber volume indicator
    const n2Volume = new THREE.Mesh(
      new THREE.BoxGeometry(38.6, 26.6, 0.34),
      mats.opticalCementClear
    );
    n2Volume.userData.noEdges = true;
    g.add(n2Volume);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-hermetic-frit-n2',
        47,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 1.52),
        new THREE.Vector3(46, 22, 18),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S48: Perimeter Metal-Shielded Optical Black (OB) Reference Pixel Border
  // =========================================================================
  {
    const g = new THREE.Group();
    // Opaque tungsten/aluminum OB light-shield border frame right around the 35.9×24.0 active area
    const obShape = createFrameShape(37.6, 25.6, 0.3, 35.6, 23.6, 0.15);
    const obFrame = new THREE.Mesh(
      extrudeCentered(obShape, 0.12, 0.01, 0.01, 16),
      mats.tungstenLightShield
    );
    g.add(obFrame);

    // Inner gold dummy isolation guard ring separating OB pixels from active imaging pixels
    const guardShape = createFrameShape(35.8, 23.8, 0.18, 35.4, 23.4, 0.14);
    const guardRing = new THREE.Mesh(
      extrudeCentered(guardShape, 0.14, 0.01, 0.01, 16),
      mats.goldPlating
    );
    g.add(guardRing);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-ob-shield-border',
        48,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 1.06),
        new THREE.Vector3(-46, 22, 10),
        cp,
        { ibisMovable: true, edgeOpacity: 0.3 }
      )
    );
  }

  // =========================================================================
  // S49: 320-Pin Ceramic LGA/BGA Solder Interconnect Array & Corner Epoxy Underfill
  // =========================================================================
  {
    const g = new THREE.Group();
    // Instanced SAC305 lead-free solder balls around dual-row ceramic LGA perimeter
    const ballGeo = new THREE.SphereGeometry(0.32, 10, 8);
    const coords: Array<[number, number]> = [];
    for (let ix = -11; ix <= 11; ix++) {
      for (const ry of [-15.2, -13.8, 13.8, 15.2]) {
        coords.push([ix * 1.9, ry]);
      }
    }
    for (let iy = -6; iy <= 6; iy++) {
      for (const rx of [-21.4, -20.0, 20.0, 21.4]) {
        coords.push([rx, iy * 1.9]);
      }
    }
    const balls = new THREE.InstancedMesh(ballGeo, mats.solderBallSilver, coords.length);
    const dummy = new THREE.Object3D();
    coords.forEach(([bx, by], i) => {
      dummy.position.set(bx, by, 0);
      dummy.updateMatrix();
      balls.setMatrixAt(i, dummy.matrix);
    });
    balls.instanceMatrix.needsUpdate = true;
    balls.userData.noEdges = true;
    g.add(balls);

    // Central wide solder thermal pad coupling CuW slug to sensor PCB
    const thermalPad = new THREE.Mesh(
      new THREE.BoxGeometry(28.0, 18.0, 0.24),
      mats.sinteredSilver
    );
    g.add(thermalPad);

    // 4 Corner Epoxy Underfill L-brackets protecting solder balls from IBIS & drop shock
    for (const [cx, cy] of [
      [-21.8, 15.6],
      [21.8, 15.6],
      [-21.8, -15.6],
      [21.8, -15.6],
    ] as Array<[number, number]>) {
      const uf1 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.4, 0.55), mats.icEpoxy);
      uf1.position.set(cx - Math.sign(cx) * 1.6, cy, 0);
      const uf2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.6, 0.55), mats.icEpoxy);
      uf2.position.set(cx, cy - Math.sign(cy) * 1.6, 0);
      g.add(uf1, uf2);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-lga-solder-underfill',
        49,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, -1.55),
        new THREE.Vector3(-48, -14, -22),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S50: 48x Ultra-Low-ESL Backside Decoupling MLCC Capacitor Bank Under CMOS Die
  // =========================================================================
  {
    const g = new THREE.Group();
    // Subtle solder-mask carrier frame showing exact backside MLCC cavity layout
    const mlccGeo = new THREE.BoxGeometry(1.4, 0.75, 0.65);
    const termGeo = new THREE.BoxGeometry(0.32, 0.78, 0.68);
    const positions: Array<[number, number]> = [];
    for (let ix = -5; ix <= 5; ix++) {
      for (const py of [-9.5, -5.5, 5.5, 9.5]) {
        positions.push([ix * 2.5, py]);
      }
    }
    for (const px of [-14.8, 14.8]) {
      for (const py of [-2.0, 2.0]) {
        positions.push([px, py]);
      }
    }
    const bodies = new THREE.InstancedMesh(mlccGeo, mats.smdCeramic, positions.length);
    const terms = new THREE.InstancedMesh(termGeo, mats.solderBallSilver, positions.length * 2);
    const d = new THREE.Object3D();
    positions.forEach(([mx, my], idx) => {
      d.position.set(mx, my, 0);
      d.updateMatrix();
      bodies.setMatrixAt(idx, d.matrix);
      d.position.set(mx - 0.58, my, 0);
      d.updateMatrix();
      terms.setMatrixAt(idx * 2, d.matrix);
      d.position.set(mx + 0.58, my, 0);
      d.updateMatrix();
      terms.setMatrixAt(idx * 2 + 1, d.matrix);
    });
    bodies.instanceMatrix.needsUpdate = true;
    terms.instanceMatrix.needsUpdate = true;
    bodies.userData.noEdges = true;
    terms.userData.noEdges = true;
    g.add(bodies, terms);

    // Copper star-bus rail connecting MLCC ground terminals
    const bus = new THREE.Mesh(
      extrudeCentered(createFrameShape(32.0, 22.0, 1.2, 29.8, 19.8, 0.8), 0.14, 0.02, 0.02, 16),
      mats.copperCoil
    );
    bus.position.z = 0.34;
    g.add(bus);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-mlcc-decoupling-bank',
        50,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -2.95),
        new THREE.Vector3(46, 20, -34),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S51: ISL-2009 FLEXIBLE BOARD — IBIS Hall-Sensor & Logic Flex (Sony Ref.506)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Graceful low-stiffness S-curve polyimide ribbon isolated on left flank (-X)
    const curvePts = [
      new THREE.Vector3(0, 8.0, 0.6),
      new THREE.Vector3(-4.5, 4.0, 0.2),
      new THREE.Vector3(-7.2, -1.5, -1.6),
      new THREE.Vector3(-5.8, -8.5, -3.4),
      new THREE.Vector3(-1.5, -13.0, -4.6),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePts);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, 0.55, 6, false),
      mats.polyimideFpc
    );
    tube.scale.set(1.0, 1.0, 0.28);
    g.add(tube);

    // Shielded flat branch pad + gold differential Hall sense connector fingers
    const sensePad = new THREE.Mesh(new THREE.BoxGeometry(5.8, 16.0, 0.24), mats.polyimideFpc);
    sensePad.position.set(-4.6, 1.0, -0.5);
    g.add(sensePad);

    const emiCoat = new THREE.Mesh(new THREE.BoxGeometry(4.8, 13.2, 0.28), mats.emiShieldFilm);
    emiCoat.position.set(-4.6, 1.0, -0.5);
    g.add(emiCoat);

    // 10-pin gold ZIF terminal & blue FR-4 stiffener
    const stiffener = new THREE.Mesh(new THREE.BoxGeometry(6.2, 3.6, 0.42), mats.mountShimBlue);
    stiffener.position.set(-1.5, -13.0, -4.6);
    const goldFingers = new THREE.Mesh(new THREE.BoxGeometry(5.0, 1.8, 0.46), mats.goldPlating);
    goldFingers.position.set(-1.5, -13.8, -4.6);
    g.add(stiffener, goldFingers);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-isl-fpc',
        51,
        '#f97316',
        g,
        new THREE.Vector3(-22.0, 2.0, -4.4),
        new THREE.Vector3(-54, 4, -64),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S52: ISD-2002 FLEXIBLE BOARD — IBIS High-Current VCM Drive Flex (Sony Ref.507)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Thick-copper power ribbon on right flank (+X) physically separated from ISL-2009
    const driveSpine = new THREE.Mesh(new THREE.BoxGeometry(7.2, 18.5, 0.32), mats.polyimideFpc);
    driveSpine.position.set(4.8, 0, -0.8);
    g.add(driveSpine);

    // 3 heavy copper power bus bars feeding Y1 / Y2 / X1 voice coils
    for (const dx of [2.6, 4.8, 7.0]) {
      const cuTrace = new THREE.Mesh(new THREE.BoxGeometry(1.15, 16.5, 0.36), mats.copperCoil);
      cuTrace.position.set(dx, 0, -0.8);
      g.add(cuTrace);
    }

    // Zero-tension U-bend loop bridging movable carrier to fixed chassis
    const uLoop = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.45, 8, 22, Math.PI),
      mats.polyimideFpc
    );
    uLoop.rotation.y = Math.PI / 2;
    uLoop.position.set(4.8, -10.0, -2.8);
    g.add(uLoop);

    // High-current gold-plated 6-pin ZIF drive tail
    const tail = new THREE.Mesh(new THREE.BoxGeometry(7.4, 3.8, 0.45), mats.zifIvoryPlastic);
    tail.position.set(4.8, -13.4, -4.4);
    const pins = new THREE.Mesh(new THREE.BoxGeometry(6.0, 1.8, 0.5), mats.goldPlating);
    pins.position.set(4.8, -14.2, -4.4);
    g.add(tail, pins);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-isd-fpc',
        52,
        '#c2410c',
        g,
        new THREE.Vector3(22.5, -2.0, -4.6),
        new THREE.Vector3(54, 4, -64),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S53: TEX-5810 — Integrated 5-Axis Anti-Shake Core Module Sub-Frame (Sony Ref.510)
  // =========================================================================
  {
    const g = new THREE.Group();
    const coreShape = createFrameShape(62.0, 47.0, 4.2, 41.0, 29.0, 2.2);
    const coreFrame = new THREE.Mesh(
      extrudeCentered(coreShape, 1.8, 0.14, 0.14, 24),
      mats.magnesiumCast
    );
    g.add(coreFrame);

    // 3 precision magnetic-yoke pocket surrounds + 3 datum mounting ears
    for (const [ex, ey] of [
      [-28.5, 21.0],
      [28.5, 21.0],
      [0, -24.0],
    ] as Array<[number, number]>) {
      const ear = new THREE.Mesh(
        new THREE.CylinderGeometry(3.4, 3.6, 2.2, 20).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      ear.position.set(ex, ey, 0);
      g.add(ear);
    }

    // Precision black LCP cable-routing guide clips molded around perimeter
    for (const sx of [-31.4, 31.4]) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(1.4, 14.0, 2.1), mats.mountPpsInsulator);
      clip.position.set(sx, 0, 0.1);
      g.add(clip);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-tex-module',
        53,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -6.5),
        new THREE.Vector3(0, 44, -92),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S54: IM IMAGER FIX SHAFT (5300) — Single-Use Precision Alignment Shafts (Sony Ref.501, 3x)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 non-reusable stepped precision datum guide shafts arranged in kinematic triangle
    for (const [sx, sy] of [
      [-24.2, 17.5],
      [24.2, 17.5],
      [0, -19.2],
    ] as Array<[number, number]>) {
      const shaftBody = new THREE.Mesh(
        new THREE.CylinderGeometry(1.35, 1.35, 5.4, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      shaftBody.position.set(sx, sy, 0);

      const stepCollar = new THREE.Mesh(
        new THREE.CylinderGeometry(2.35, 2.35, 1.15, 20).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      stepCollar.position.set(sx, sy, -0.6);

      const tipChamfer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.85, 1.35, 0.9, 18).rotateX(Math.PI / 2),
        mats.pureIronArmature
      );
      tipChamfer.position.set(sx, sy, 3.15);

      g.add(shaftBody, stepCollar, tipChamfer);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-imager-fix-shafts',
        54,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -4.2),
        new THREE.Vector3(-50, 26, -68),
        cp,
        { ibisMovable: true, edgeOpacity: 0.3 }
      )
    );
  }

  // =========================================================================
  // S55: Low-Friction Acetal (POM) 3-Ball Retainer Cage Sheet & PFPE Grease Pockets
  // =========================================================================
  {
    const g = new THREE.Group();
    // Thin white/ivory self-lubricating POM retainer ring plate connecting 3 ceramic ball pockets
    const cageShape = createFrameShape(54.0, 41.0, 3.5, 45.0, 32.0, 2.4);
    const cagePlate = new THREE.Mesh(
      extrudeCentered(cageShape, 0.55, 0.05, 0.05, 22),
      mats.pomGear
    );
    g.add(cagePlate);

    // 3 precision ball-holding pocket collars with fluorinated grease micro-grooves
    for (const [bx, by] of [
      [-23.0, 17.0],
      [23.0, 17.0],
      [-23.0, -17.0],
    ] as Array<[number, number]>) {
      const pocket = new THREE.Mesh(
        new THREE.TorusGeometry(2.3, 0.45, 10, 24),
        mats.pomGear
      );
      pocket.position.set(bx, by, 0);
      const greaseRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.75, 0.16, 8, 20),
        mats.opticalCementClear
      );
      greaseRing.position.set(bx, by, 0.12);
      greaseRing.userData.noEdges = true;
      g.add(pocket, greaseRing);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-ball-retainer-cage',
        55,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 0, -5.7),
        new THREE.Vector3(48, -10, -84),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S56: High-Temp LCP VCM Coil Winding Formers (Bobbins) & Strain-Relieved Terminals
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 bobbin frames matching Y1 (bottom-left), Y2 (bottom-right), and X1 (right vertical) coils
    const bobbins: Array<{ x: number; y: number; w: number; h: number }> = [
      { x: -16.5, y: -20.5, w: 15.2, h: 6.4 },
      { x: 16.5, y: -20.5, w: 15.2, h: 6.4 },
      { x: 27.6, y: 4.5, w: 6.4, h: 16.2 },
    ];
    for (const b of bobbins) {
      const bShape = createFrameShape(b.w, b.h, 1.4, b.w - 3.6, b.h - 2.4, 0.6);
      const frame = new THREE.Mesh(
        extrudeCentered(bShape, 1.35, 0.06, 0.06, 18),
        mats.mountPpsInsulator
      );
      frame.position.set(b.x, b.y, 0);
      g.add(frame);

      // Pair of gold-plated lead-out solder termination pins per bobbin
      for (const offset of [-1.4, 1.4]) {
        const pin = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.95, 1.6), mats.goldPlating);
        pin.position.set(b.x + offset, b.y + b.h / 2 + 0.55, -0.1);
        g.add(pin);
      }
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-vcm-coil-bobbins',
        56,
        '#78350f',
        g,
        new THREE.Vector3(0, 0, -5.08),
        new THREE.Vector3(50, 26, -74),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S57: Linear-Gradient Hall Sensing Sub-Magnets & Permalloy Cross-Talk Flux Baffles (3x)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 paired N/S sensing target bars + Permalloy U-baffles guarding each Hall sensor
    const targets: Array<{ x: number; y: number; rotZ: number }> = [
      { x: -16.5, y: -15.8, rotZ: 0 },
      { x: 16.5, y: -15.8, rotZ: 0 },
      { x: 23.0, y: 4.5, rotZ: Math.PI / 2 },
    ];
    for (const t of targets) {
      const sub = new THREE.Group();
      sub.position.set(t.x, t.y, 0);
      sub.rotation.z = t.rotZ;

      const poleN = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 0.95), mats.neodymiumMagnet);
      poleN.position.x = -1.65;
      const poleS = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 0.95), mats.pureIronArmature);
      poleS.position.x = 1.65;

      // Permalloy cross-talk baffle shielding VCM drive flux away from Hall chip
      const baffle = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.42, 1.45), mats.lensPermalloyShield);
      baffle.position.set(0, -1.25, 0);

      sub.add(poleN, poleS, baffle);
      g.add(sub);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-hall-bias-magnets',
        57,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, -5.4),
        new THREE.Vector3(-44, 34, -84),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S58: IM RADIATION SHEET B (5800) — Primary Rear Graphite Sheet (Sony Ref.508)
  // =========================================================================
  {
    const g = new THREE.Group();
    const sheetShape = createRoundedRectShape(48.0, 34.0, 3.0);
    const sheet = new THREE.Mesh(
      extrudeCentered(sheetShape, 0.22, 0.02, 0.02, 20),
      mats.pyroGraphite
    );
    g.add(sheet);

    // Translucent PET dielectric insulation border laminating graphite sheet
    const petFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(49.2, 35.2, 3.2, 46.8, 32.8, 2.6), 0.26, 0.02, 0.02, 18),
      mats.mylarInsulatorFilm
    );
    g.add(petFrame);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-im-radiation-sheet-b',
        58,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, -9.4),
        new THREE.Vector3(0, 38, -138),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S59: IM RADIATION SHEET D (5510) — Secondary Side Thermal Bridge Sheet (Sony Ref.509)
  // =========================================================================
  {
    const g = new THREE.Group();
    // L-bent flexible graphite thermal bridge wrapping side flank of anti-shake unit
    const flankWall = new THREE.Mesh(new THREE.BoxGeometry(0.28, 26.0, 8.2), mats.pyroGraphite);
    flankWall.position.set(0, 0, 0);
    const rearTab = new THREE.Mesh(new THREE.BoxGeometry(9.5, 22.0, 0.26), mats.pyroGraphite);
    rearTab.position.set(-4.6, 0, -4.0);
    // Copper-foil thermal-contact patch bonding to main magnesium frame
    const cuPatch = new THREE.Mesh(new THREE.BoxGeometry(0.32, 18.0, 5.6), mats.thermalTransferTape);
    cuPatch.position.set(0.12, 0, 0.5);
    g.add(flankWall, rearTab, cuPatch);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-im-radiation-sheet-d',
        59,
        '#334155',
        g,
        new THREE.Vector3(28.5, 0, -7.8),
        new THREE.Vector3(54, -22, -124),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S60: AS HEAT PLATE TOP (Ref.453) + MB GRAPHITE SHEET TOP A (Ref.454) + SPACER (Ref.470)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 1. Aluminum top heat plate (Ref.453)
    const alPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(46.0, 9.6, 1.8), 0.9, 0.08, 0.08, 16).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    g.add(alPlate);

    // 2. Top graphite spreading sheet bonded to upper surface (Ref.454)
    const topGraphite = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(43.5, 8.2, 1.2), 0.24, 0.02, 0.02, 14).rotateX(Math.PI / 2),
      mats.pyroGraphite
    );
    topGraphite.position.y = 0.62;
    g.add(topGraphite);

    // 3. Precision clearance spacer strip underneath (Ref.470)
    const topSpacer = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(38.0, 6.0, 0.8), 0.55, 0.04, 0.04, 12).rotateX(Math.PI / 2),
      mats.thermalPadBlue
    );
    topSpacer.position.y = -0.74;
    g.add(topSpacer);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-as-heat-plate-top',
        60,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 25.4, -6.2),
        new THREE.Vector3(0, 52, -118),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S61: 6x M1.7×2.5 NEW TRUSTER P2 Tri-Lobular Self-Locking Micro Screws (Sony Ref.511)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [sx, sy] of [
      [-26.5, 19.5],
      [26.5, 19.5],
      [-26.5, 0],
      [26.5, 0],
      [-26.5, -19.5],
      [26.5, -19.5],
    ] as Array<[number, number]>) {
      const scr = createPrecisionScrew(1.35, 0.52, 2.6, mats.stainlessMachined);
      scr.position.set(sx, sy, 0);
      scr.rotation.x = Math.PI; // Rearward insertion into anti-shake plate
      g.add(scr);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-new-truster-screws',
        61,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, -8.4),
        new THREE.Vector3(-52, -2, -118),
        cp,
        { ibisMovable: false, edgeOpacity: 0.3 }
      )
    );
  }

  // =========================================================================
  // S62: Ultra-Compliant CuBe2 Floating IBIS-to-Chassis ESD Ground Leaf Spring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Whisper-soft S-folded gold-plated CuBe2 grounding leaf bridging ceramic-isolated stage to GND
    const pts = [
      new THREE.Vector3(0, 0, 1.4),
      new THREE.Vector3(-2.6, 2.2, 0.5),
      new THREE.Vector3(1.2, 4.6, -0.4),
      new THREE.Vector3(-2.2, 7.2, -1.2),
      new THREE.Vector3(0.4, 9.6, -2.0),
    ];
    const leafCurve = new THREE.CatmullRomCurve3(pts);
    const leafMesh = new THREE.Mesh(
      new THREE.TubeGeometry(leafCurve, 28, 0.38, 6, false),
      mats.beCuSpring
    );
    leafMesh.scale.set(1.8, 1.0, 0.25);
    g.add(leafMesh);

    // End mounting eyelets with gold contact pads
    for (const [ex, ey, ez] of [
      [0, 0, 1.4],
      [0.4, 9.6, -2.0],
    ] as Array<[number, number, number]>) {
      const eye = new THREE.Mesh(
        new THREE.TorusGeometry(1.1, 0.32, 8, 18),
        mats.goldPlating
      );
      eye.position.set(ex, ey, ez);
      g.add(eye);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-esd-ground-leaf',
        62,
        '#eab308',
        g,
        new THREE.Vector3(-28.0, -14.0, -5.8),
        new THREE.Vector3(-52, -30, -112),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S63: Factory Individual Calibration 2D QR Tag Plate (Sony "Imager DRA Data")
  // =========================================================================
  {
    const g = new THREE.Group();
    // Laser-etched aluminum/polyimide calibration tag carrier
    const plate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(8.4, 8.4, 0.7), 0.32, 0.04, 0.04, 12),
      mats.ceramicAlumina
    );
    g.add(plate);

    // Crisp 2D DataMatrix / QR finder-pattern tiles in matte black
    const qrCells: Array<[number, number, number, number]> = [
      [-2.4, 2.4, 1.8, 1.8],
      [2.4, 2.4, 1.8, 1.8],
      [-2.4, -2.4, 1.8, 1.8],
      [0.0, 2.4, 0.9, 0.9],
      [-0.8, 0.0, 0.9, 1.8],
      [1.0, 0.4, 1.6, 0.9],
      [0.6, -1.6, 0.9, 1.8],
      [2.4, -1.8, 1.2, 1.2],
      [-2.2, 0.2, 1.1, 0.9],
    ];
    for (const [qx, qy, qw, qh] of qrCells) {
      const cell = new THREE.Mesh(
        new THREE.BoxGeometry(qw, qh, 0.08),
        mats.matteBlackAnodized
      );
      cell.position.set(qx, qy, -0.18);
      cell.userData.noEdges = true;
      g.add(cell);
    }

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-dra-qr-plate',
        63,
        '#f8fafc',
        g,
        new THREE.Vector3(18.0, -15.5, -11.4),
        new THREE.Vector3(48, -32, -156),
        cp,
        { ibisMovable: true, edgeOpacity: 0.3 }
      )
    );
  }

  // =========================================================================
  // S64: Ultra-Thin Nickel-Silver Rear Sensor-PCB EMI Shield Can & Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    // Non-magnetic nickel-silver RF shield lid covering SLVS-EC serializer & PLL on sensor PCB rear
    const canOuter = createRoundedRectShape(34.0, 22.0, 2.0);
    const lid = new THREE.Mesh(
      extrudeCentered(canOuter, 0.24, 0.04, 0.04, 18),
      mats.emiShieldCan
    );
    lid.position.z = -0.55;
    g.add(lid);

    // Raised perimeter skirt wall with EMI clip notches
    const skirtShape = createFrameShape(34.0, 22.0, 2.0, 32.8, 20.8, 1.4);
    const skirt = new THREE.Mesh(
      extrudeCentered(skirtShape, 1.1, 0.04, 0.04, 18),
      mats.emiShieldCan
    );
    g.add(skirt);

    // Conductive sponge grounding gasket around bottom perimeter
    const gasketShape = createFrameShape(33.4, 21.4, 1.6, 32.0, 20.0, 1.2);
    const gasket = new THREE.Mesh(
      extrudeCentered(gasketShape, 0.35, 0.03, 0.03, 16),
      mats.emiShieldFilm
    );
    gasket.position.z = 0.65;
    g.add(gasket);

    parts.push(
      finalizeStandaloneSensorMicroPart(
        'sensor-pcb-emi-shield-can',
        64,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -3.15),
        new THREE.Vector3(-46, -34, -52),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  return parts;
}
