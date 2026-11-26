import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createPrecisionScrew,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

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
    explanation: lazyExplanationStub(id),
    ibisMovable: options?.ibisMovable ?? false,
    ultrasonicElement: options?.ultrasonicElement ?? false,
    standaloneOnly: true,
  };
}

/**
 * Helper: build a smooth extruded flat-ribbon curve in the YZ or XY plane (authentic FPC / CuBe2 leaf!).
 */
function buildFlatRibbonExtrude(
  points2D: Array<[number, number]>,
  thickness: number,
  width: number,
  plane: 'xz' | 'yz' | 'xy'
): THREE.ExtrudeGeometry {
  const curve = new THREE.SplineCurve(points2D.map(([a, b]) => new THREE.Vector2(a, b)));
  const samples = curve.getPoints(32);
  const upper: THREE.Vector2[] = [];
  const lower: THREE.Vector2[] = [];
  for (let i = 0; i < samples.length; i++) {
    const prev = samples[Math.max(0, i - 1)];
    const next = samples[Math.min(samples.length - 1, i + 1)];
    const tang = new THREE.Vector2().subVectors(next, prev).normalize();
    const norm = new THREE.Vector2(-tang.y, tang.x);
    upper.push(samples[i].clone().addScaledVector(norm, thickness * 0.5));
    lower.push(samples[i].clone().addScaledVector(norm, -thickness * 0.5));
  }
  const shape = new THREE.Shape();
  shape.moveTo(upper[0].x, upper[0].y);
  for (let i = 1; i < upper.length; i++) shape.lineTo(upper[i].x, upper[i].y);
  for (let i = lower.length - 1; i >= 0; i--) shape.lineTo(lower[i].x, lower[i].y);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false, steps: 1 });
  geo.translate(0, 0, -width * 0.5);
  if (plane === 'xz') {
    geo.rotateX(Math.PI / 2);
  } else if (plane === 'yz') {
    geo.rotateY(-Math.PI / 2);
  }
  geo.computeVertexNormals();
  return markHiRes(geo);
}

/**
 * Helper: build a Sony OEM M1.7x2.5 NEW TRUSTER P2 tri-lobular (rounded 3-lobe Reuleaux) thread-rolling screw.
 */
function buildTrilobularNewTrusterScrew(
  headR: number,
  headH: number,
  shankR: number,
  shankL: number,
  headMat: THREE.Material,
  slotMat: THREE.Material,
  threadMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();

  // Washer-faced pan head
  const flange = new THREE.Mesh(hiResCyl(headR * 1.15, headR * 1.15, headH * 0.25, 20), headMat);
  flange.position.y = -headH * 0.125;
  const dome = new THREE.Mesh(hiResCyl(headR * 0.85, headR * 1.02, headH * 0.78, 20), headMat);
  dome.position.y = -headH * 0.62;
  g.add(flange, dome);

  // Crisp Phillips #0 cross recess on top of pan head (-Y)
  for (const rotY of [0, Math.PI / 2]) {
    const slot = new THREE.Mesh(
      new THREE.BoxGeometry(headR * 1.15, headH * 0.28, headR * 0.24),
      slotMat
    );
    slot.position.y = -headH * 0.94;
    slot.rotation.y = rotY;
    slot.userData.noEdges = true;
    g.add(slot);
  }

  // Authentic tri-lobular (TAPTITE / NEW TRUSTER) 3-lobe rounded triangular cross-section shank!
  const triShape = new THREE.Shape();
  const segs = 36;
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    const r = shankR * (0.94 + 0.11 * Math.cos(a * 3));
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) triShape.moveTo(x, y);
    else triShape.lineTo(x, y);
  }
  const shankGeo = extrudeHiRes(triShape, shankL, 0.04, 0.04, 1, 18);
  shankGeo.rotateX(Math.PI / 2);
  const shank = new THREE.Mesh(shankGeo, headMat);
  shank.position.y = shankL * 0.5;
  g.add(shank);

  // Rolled self-tapping helical thread rings along tri-lobular shank
  const turns = 6;
  for (let i = 0; i < turns; i++) {
    const ty = 0.35 + (i / (turns - 1)) * (shankL - 0.65);
    const ring = new THREE.Mesh(
      hiResTorus(shankR * 1.03, shankR * 0.12, 6, 18).rotateX(Math.PI / 2),
      threadMat
    );
    ring.position.y = ty;
    ring.userData.noEdges = true;
    g.add(ring);
  }

  // Rotate so head sits at +Z and shank extends into -Z (matching createPrecisionScrew convention)
  g.rotation.x = -Math.PI / 2;
  return g;
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
      extrudeHiRes(frameShape, 0.28, 0.04, 0.04, 2, 24),
      mats.matteBlackAnodized
    );
    g.add(plate);

    // Stamped longitudinal stiffening bead embossings along top/bottom retainer edges
    for (const sy of [-14.2, 14.2]) {
      const bead = new THREE.Mesh(
        createChamferedBoxGeo(26.0, 0.65, 0.16, 0.2, 0.03, 'z'),
        mats.matteBlackAnodized
      );
      bead.position.set(0, sy, 0.16);
      bead.userData.noEdges = true;
      g.add(bead);
    }

    // 4 arched SUS301-CSP leaf-spring pressure tongues with curved contact dimples & relief root slots
    for (const [sx, sy] of [
      [-19.2, 13.6],
      [19.2, 13.6],
      [-19.2, -13.6],
      [19.2, -13.6],
    ] as Array<[number, number]>) {
      const springTab = new THREE.Mesh(
        createChamferedBoxGeo(4.4, 1.55, 0.36, 0.22, 0.04, 'z'),
        mats.mountSpringSteel
      );
      springTab.position.set(sx, sy, -0.22);
      springTab.rotation.z = sx * sy > 0 ? -0.35 : 0.35;
      springTab.rotation.y = Math.sign(sx) * 0.12;
      const dimple = new THREE.Mesh(hiResSphere(0.36, 10, 8), mats.mountSpringSteel);
      dimple.scale.set(1.2, 0.9, 0.55);
      dimple.position.set(sx - Math.sign(sx) * 1.1, sy - Math.sign(sy) * 0.4, -0.44);
      dimple.userData.noEdges = true;
      g.add(springTab, dimple);
    }

    // 4 side snap-engagement claws with true inward barbed retention hooks
    for (const sx of [-21.35, 21.35]) {
      const dir = Math.sign(sx);
      for (const sy of [-8.0, 8.0]) {
        const claw = new THREE.Mesh(
          createChamferedBoxGeo(0.42, 3.2, 1.65, 0.08, 0.03, 'z'),
          mats.matteBlackAnodized
        );
        claw.position.set(sx, sy, -0.78);
        const barb = new THREE.Mesh(
          createChamferedBoxGeo(0.75, 2.4, 0.36, 0.06, 0.02, 'z'),
          mats.mountSpringSteel
        );
        barb.position.set(sx - dir * 0.36, sy, -1.48);
        barb.userData.noEdges = true;
        g.add(claw, barb);
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
    addCircleHoles(maskShape, [
      [-19.4, 12.6, 0.55],
      [19.4, -12.6, 0.55],
    ]);
    const maskMesh = new THREE.Mesh(
      extrudeHiRes(maskShape, 0.14, 0.02, 0.02, 1, 22),
      mats.velvetFlockTrap
    );
    g.add(maskMesh);

    // 2-tier stepped knife-edge anti-glare bevel strips around inner 36.2x24.2mm aperture
    const innerStep = new THREE.Mesh(
      extrudeHiRes(createFrameShape(37.4, 25.4, 0.55, 36.0, 24.0, 0.4), 0.22, 0.03, 0.04, 2, 18),
      mats.matteBlackAnodized
    );
    innerStep.position.z = 0.04;
    g.add(innerStep);

    // 2 asymmetric factory poke-yoke orientation datum keys (gold top-right + notched bottom-left)
    const notch1 = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 0.85, 0.18, 0.12, 0.02, 'z'),
      mats.goldPlating
    );
    notch1.position.set(17.4, 14.0, 0.02);
    const notch2 = new THREE.Mesh(
      createChamferedBoxGeo(1.4, 0.72, 0.18, 0.1, 0.02, 'z'),
      mats.goldPlating
    );
    notch2.position.set(-18.2, -13.9, 0.02);
    g.add(notch1, notch2);

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
    // Extruded matte-black aluminum U-channel trough carrier with raised containment side lips & end mounting ears
    const trough = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(39.0, 3.0, 0.5), 0.72, 0.06, 0.06, 2, 16),
      mats.matteBlackAnodized
    );
    g.add(trough);

    for (const dy of [-1.32, 1.32]) {
      const wall = new THREE.Mesh(
        createChamferedBoxGeo(38.4, 0.36, 0.85, 0.1, 0.03, 'z'),
        mats.matteBlackAnodized
      );
      wall.position.set(0, dy, 0.45);
      g.add(wall);
    }

    // Translucent non-outgassing tacky optical silicone gel strip with glossy concave meniscus rim
    const stickyGel = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(36.8, 2.05, 0.35), 0.56, 0.06, 0.06, 2, 14),
      mats.dustCatcherGel
    );
    stickyGel.position.set(0, 0.05, 0.52);
    g.add(stickyGel);

    // Realistic captured microscopic dust, fiber & pollen particulates of varied sizes embedded in gel!
    const dustSpecs: Array<[number, number, number, number]> = [
      [-14.2, 0.25, 0.22, 1.0],
      [-11.2, -0.22, 0.16, 1.8],
      [-7.4, 0.32, 0.12, 1.0],
      [-4.8, -0.15, 0.24, 1.2],
      [-1.1, 0.18, 0.14, 2.4],
      [2.6, 0.28, 0.20, 1.0],
      [6.2, -0.28, 0.15, 1.5],
      [9.4, -0.10, 0.23, 1.0],
      [14.1, 0.16, 0.17, 1.9],
    ];
    for (const [dx, dy, r, stretch] of dustSpecs) {
      const speck = new THREE.Mesh(hiResSphere(r, 8, 6), mats.ceramicAlumina);
      speck.scale.set(stretch, 0.9, 0.65);
      speck.rotation.z = dx * 0.4;
      speck.position.set(dx, dy, 0.82);
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
    // 3 crystal-clear index-matched (n≈1.52) UV-cured OCA optical films with perimeter meniscus rims & staggered alignment tabs
    const layers: Array<[number, number]> = [
      [-0.62, -14.5],
      [0.0, 0.0],
      [0.62, 14.5],
    ];
    for (const [dz, tabX] of layers) {
      const ocaFilm = new THREE.Mesh(
        extrudeHiRes(createRoundedRectShape(38.6, 26.8, 0.6), 0.12, 0.02, 0.02, 1, 14),
        mats.opticalCementClear
      );
      ocaFilm.position.z = dz;
      g.add(ocaFilm);

      // Zero-bubble vacuum-bond glossy perimeter meniscus bead
      const beadShape = createFrameShape(39.05, 27.25, 0.8, 38.2, 26.4, 0.5);
      const bead = new THREE.Mesh(
        extrudeHiRes(beadShape, 0.16, 0.02, 0.02, 1, 16),
        mats.sswfGlass
      );
      bead.position.z = dz;
      g.add(bead);

      // Optical registration alignment tab on top edge
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(3.2, 1.1, 0.14, 0.2, 0.02, 'z'),
        mats.fluorineCoatCyan
      );
      tab.position.set(tabX, 13.85, dz);
      tab.userData.noEdges = true;
      g.add(tab);
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
    addCircleHoles(spacerShape, [
      [-19.5, 13.5, 0.65],
      [19.5, 13.5, 0.65],
      [-19.5, -13.5, 0.65],
      [19.5, -13.5, 0.65],
    ]);
    const spacer = new THREE.Mesh(
      extrudeHiRes(spacerShape, 0.36, 0.04, 0.04, 2, 22),
      mats.butylDamperRubber
    );
    g.add(spacer);

    // Dual concentric 360-deg raised compression sealing ribs (inner + outer dual-barrier)
    for (const [ow, oh, iw, ih] of [
      [40.6, 29.0, 39.6, 28.0],
      [38.6, 27.0, 37.6, 26.0],
    ] as Array<[number, number, number, number]>) {
      const lip = new THREE.Mesh(
        extrudeHiRes(createFrameShape(ow, oh, 1.2, iw, ih, 0.9), 0.48, 0.03, 0.03, 1, 18),
        mats.epdmGasket
      );
      g.add(lip);
    }

    // Micro barometric breather relief notch indicator on lower border
    const ventTab = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 0.55, 0.42, 0.1, 0.02, 'z'),
      mats.ultra.micEptfeMembrane
    );
    ventTab.position.set(0, -14.1, 0);
    ventTab.userData.noEdges = true;
    g.add(ventTab);

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
    // Graceful continuous Z-bend flat polyimide ribbon routing from PZT electrode end to mainboard ZIF
    const ribbonGeo = buildFlatRibbonExtrude(
      [
        [-2.6, 0.0],
        [4.8, 0.0],
        [6.6, -0.5],
        [7.0, -2.6],
        [6.8, -5.8],
      ],
      0.22,
      2.65,
      'xz'
    );
    g.add(new THREE.Mesh(ribbonGeo, mats.polyimideFpc));

    // Widened high-voltage gold PZT solder contact pads + silver solder fillets + parallel HV traces
    for (const dy of [-0.65, 0.65]) {
      const trace = new THREE.Mesh(
        createChamferedBoxGeo(7.6, 0.48, 0.08, 0.08, 0.02, 'z'),
        mats.goldPlating
      );
      trace.position.set(1.6, dy, 0.13);
      const solder = new THREE.Mesh(hiResSphere(0.32, 8, 6), mats.solderBallSilver);
      solder.scale.set(1.6, 1.0, 0.45);
      solder.position.set(-1.8, dy, 0.18);
      solder.userData.noEdges = true;
      g.add(trace, solder);
    }

    // 2-pin micro ZIF ivory stiffener with locating ears + exposed dual gold insertion fingers
    const tail = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 3.8, 0.34, 0.25, 0.04, 'z'),
      mats.zifIvoryPlastic
    );
    tail.position.set(6.8, -1.2, -6.1);
    for (const dx of [-0.6, 0.6]) {
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.8, 0.12), mats.goldPlating);
      finger.position.set(6.8 + dx, -2.2, -5.88);
      finger.userData.noEdges = true;
      g.add(finger);
    }
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
    // Low-temp vitreous glass-frit continuous hermetic seal meniscus bonding cover glass to HTCC rim
    const fritShape = createFrameShape(42.0, 30.0, 1.6, 39.2, 27.2, 1.0);
    const fritRing = new THREE.Mesh(
      extrudeHiRes(fritShape, 0.48, 0.08, 0.08, 2, 24),
      mats.kovarSeal
    );
    g.add(fritRing);

    // Inner reflow glass-frit solder fillet bead
    const innerFillet = new THREE.Mesh(
      extrudeHiRes(createFrameShape(39.6, 27.6, 1.1, 38.8, 26.8, 0.9), 0.34, 0.05, 0.05, 2, 18),
      mats.goldPlating
    );
    innerFillet.position.z = -0.04;
    innerFillet.userData.noEdges = true;
    g.add(innerFillet);

    // Subtle translucent dry-nitrogen (N2) sealed micro-chamber gas volume shimmer
    const n2Volume = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(38.6, 26.6, 0.8), 0.34, 0.04, 0.04, 1, 14),
      mats.opticalCementClear
    );
    n2Volume.userData.noEdges = true;
    g.add(n2Volume);

    // Miniature brazed gold-alloy dry-N2 hermetic backfill / helium-leak-test pinch boss
    const pinchBoss = new THREE.Mesh(
      hiResCyl(0.75, 0.92, 0.56, 14).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    pinchBoss.position.set(-20.4, 13.8, 0.06);
    g.add(pinchBoss);

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
    // Dual-tier opaque W/Al Optical Black (OB) light-shield border frame (wider top VOB & left HOB calibration strips!)
    const obShape = createFrameShape(38.0, 26.0, 0.3, 35.6, 23.6, 0.15);
    const obFrame = new THREE.Mesh(
      extrudeHiRes(obShape, 0.12, 0.02, 0.02, 1, 16),
      mats.tungstenLightShield
    );
    g.add(obFrame);

    // Wider Vertical-OB (VOB) top calibration strip & Horizontal-OB (HOB) left black-level clamp strip
    const vobStrip = new THREE.Mesh(new THREE.BoxGeometry(36.2, 1.05, 0.16), mats.tungstenGrid);
    vobStrip.position.set(0, 12.65, 0.03);
    const hobStrip = new THREE.Mesh(new THREE.BoxGeometry(1.15, 24.4, 0.16), mats.tungstenGrid);
    hobStrip.position.set(-18.6, 0, 0.03);
    g.add(vobStrip, hobStrip);

    // Inner gold dummy-pixel isolation guard ring preventing blooming cross-talk from active pixels into OB
    const guardShape = createFrameShape(35.85, 23.85, 0.18, 35.4, 23.4, 0.14);
    const guardRing = new THREE.Mesh(
      extrudeHiRes(guardShape, 0.15, 0.015, 0.015, 1, 16),
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
    // Instanced SAC305 lead-free solder balls + ENIG gold landing pad collars around dual-row perimeter
    const ballGeo = hiResSphere(0.32, 10, 8);
    const padGeo = hiResCyl(0.38, 0.38, 0.08, 10).rotateX(Math.PI / 2);
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
    const pads = new THREE.InstancedMesh(padGeo, mats.goldPlating, coords.length);
    const dummy = new THREE.Object3D();
    coords.forEach(([bx, by], i) => {
      dummy.position.set(bx, by, 0);
      dummy.updateMatrix();
      balls.setMatrixAt(i, dummy.matrix);
      dummy.position.set(bx, by, 0.24);
      dummy.updateMatrix();
      pads.setMatrixAt(i, dummy.matrix);
    });
    balls.instanceMatrix.needsUpdate = true;
    pads.instanceMatrix.needsUpdate = true;
    balls.userData.noEdges = true;
    pads.userData.noEdges = true;
    g.add(balls, pads);

    // Central segmented 4x3 thermal solder pad matrix (outgassing channels eliminate reflow solder voiding!)
    const segGeo = createChamferedBoxGeo(6.4, 5.4, 0.26, 0.4, 0.04, 'z');
    const thermalSegs = new THREE.InstancedMesh(segGeo, mats.sinteredSilver, 12);
    let si = 0;
    for (let ix = 0; ix < 4; ix++) {
      for (let iy = 0; iy < 3; iy++) {
        dummy.position.set(-10.5 + ix * 7.0, -6.0 + iy * 6.0, 0);
        dummy.updateMatrix();
        thermalSegs.setMatrixAt(si++, dummy.matrix);
      }
    }
    thermalSegs.instanceMatrix.needsUpdate = true;
    thermalSegs.userData.noEdges = true;
    g.add(thermalSegs);

    // 4 Corner Glossy Black Epoxy Underfill L-fillets protecting corner LGA balls from IBIS G-shock
    for (const [cx, cy] of [
      [-21.8, 15.6],
      [21.8, 15.6],
      [-21.8, -15.6],
      [21.8, -15.6],
    ] as Array<[number, number]>) {
      const uf1 = new THREE.Mesh(
        createChamferedBoxGeo(4.8, 1.45, 0.56, 0.35, 0.12, 'z'),
        mats.icEpoxy
      );
      uf1.position.set(cx - Math.sign(cx) * 1.6, cy, 0);
      const uf2 = new THREE.Mesh(
        createChamferedBoxGeo(1.45, 4.8, 0.56, 0.35, 0.12, 'z'),
        mats.icEpoxy
      );
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
    // 48 authentic two-tone chamfered BaTiO3 ceramic MLCCs with wrapped Ni-Sn end-caps & solder fillets
    const mlccGeo = createChamferedBoxGeo(0.92, 0.72, 0.62, 0.08, 0.04, 'z');
    const termGeo = createChamferedBoxGeo(0.34, 0.78, 0.68, 0.08, 0.04, 'z');
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
      d.position.set(mx - 0.56, my, 0);
      d.updateMatrix();
      terms.setMatrixAt(idx * 2, d.matrix);
      d.position.set(mx + 0.56, my, 0);
      d.updateMatrix();
      terms.setMatrixAt(idx * 2 + 1, d.matrix);
    });
    bodies.instanceMatrix.needsUpdate = true;
    terms.instanceMatrix.needsUpdate = true;
    bodies.userData.noEdges = true;
    terms.userData.noEdges = true;
    g.add(bodies, terms);

    // Copper star-ground bus frame + inner horizontal VDD/GND distribution rails & gold micro-vias
    const bus = new THREE.Mesh(
      extrudeHiRes(createFrameShape(32.0, 22.0, 1.2, 29.8, 19.8, 0.8), 0.14, 0.02, 0.02, 1, 18),
      mats.copperHeatSpreader
    );
    bus.position.z = 0.34;
    g.add(bus);
    for (const ry of [-7.5, 0.0, 7.5]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(29.8, 0.65, 0.12), mats.goldPlating);
      rail.position.set(0, ry, 0.35);
      rail.userData.noEdges = true;
      g.add(rail);
    }

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
    // Authentic S-curve flat polyimide flexible ribbon isolated on left flank (-X)
    const sCurveGeo = buildFlatRibbonExtrude(
      [
        [8.0, 0.6],
        [4.0, 0.2],
        [-1.5, -1.6],
        [-8.5, -3.4],
        [-13.0, -4.6],
      ],
      0.24,
      5.2,
      'yz'
    );
    const sRibbon = new THREE.Mesh(sCurveGeo, mats.polyimideFpc);
    sRibbon.position.x = -3.8;
    g.add(sRibbon);

    // Shielded flat branch pad with bespoke Sony ISL-2009 silkscreen & differential Hall trace texture!
    const senseGeo = createChamferedBoxGeo(5.8, 16.0, 0.24, 0.5, 0.03, 'z');
    applyPlanarUVs(senseGeo, 5.8, 16.0, 'xy');
    const sensePad = new THREE.Mesh(senseGeo, mats.ultra.sensorOemFlexIsl);
    sensePad.position.set(-4.6, 1.0, -0.5);
    g.add(sensePad);

    // Dual Sony service-manual boss alignment locating holes ("remove ISL-2009 from two bosses")
    for (const by of [-4.5, 6.2]) {
      const bossRing = new THREE.Mesh(
        hiResTorus(0.75, 0.16, 6, 16),
        mats.goldPlating
      );
      bossRing.position.set(-4.6, by, -0.35);
      bossRing.userData.noEdges = true;
      g.add(bossRing);
    }

    // Blue FR-4 ZIF stiffener + 10 individual ENIG gold ZIF insertion fingers
    const stiffener = new THREE.Mesh(
      createChamferedBoxGeo(6.2, 3.6, 0.42, 0.35, 0.04, 'z'),
      mats.mountShimBlue
    );
    stiffener.position.set(-1.5, -13.0, -4.6);
    g.add(stiffener);
    for (let k = 0; k < 10; k++) {
      const fg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.9, 0.12), mats.goldPlating);
      fg.position.set(-3.75 + k * 0.5, -13.8, -4.35);
      fg.userData.noEdges = true;
      g.add(fg);
    }

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
    // Thick-copper VCM power flex with Sony OEM silkscreen & 3 wide rolled-annealed copper bus traces
    const spineGeo = createChamferedBoxGeo(7.2, 18.5, 0.30, 0.5, 0.03, 'z');
    applyPlanarUVs(spineGeo, 7.2, 18.5, 'xy');
    const driveSpine = new THREE.Mesh(spineGeo, mats.ultra.sensorOemFlexIsl);
    driveSpine.position.set(4.8, 0, -0.8);
    g.add(driveSpine);

    // 3 heavy rolled-copper power traces feeding Y1 / Y2 / X1 coils
    for (const dx of [2.6, 4.8, 7.0]) {
      const cuTrace = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 16.5, 0.36, 0.15, 0.02, 'z'),
        mats.copperHeatSpreader
      );
      cuTrace.position.set(dx, 0, -0.8);
      g.add(cuTrace);
    }

    // Authentic zero-tension flat-ribbon U-bend loop (replaces cylindrical tube!) bridging carrier to chassis
    const uLoopGeo = buildFlatRibbonExtrude(
      [
        [-8.8, -0.8],
        [-12.6, -1.0],
        [-13.8, -2.6],
        [-12.6, -4.2],
        [-13.4, -4.4],
      ],
      0.28,
      6.4,
      'yz'
    );
    const uLoop = new THREE.Mesh(uLoopGeo, mats.polyimideFpc);
    uLoop.position.x = 4.8;
    g.add(uLoop);

    // High-current ivory ZIF stiffener with locating ears + 6 wide ENIG gold power fingers
    const tail = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 3.8, 0.45, 0.35, 0.05, 'z'),
      mats.zifIvoryPlastic
    );
    tail.position.set(4.8, -13.4, -4.4);
    g.add(tail);
    for (let k = 0; k < 6; k++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.74, 1.9, 0.14), mats.goldPlating);
      pin.position.set(2.3 + k * 1.0, -14.2, -4.14);
      pin.userData.noEdges = true;
      g.add(pin);
    }

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
      extrudeHiRes(coreShape, 1.8, 0.14, 0.14, 2, 26),
      mats.magnesiumCast
    );
    g.add(coreFrame);

    // Molded stiffening web ribs & inner aperture strengthening lip
    const innerFlange = new THREE.Mesh(
      extrudeHiRes(createFrameShape(44.2, 32.2, 2.4, 41.0, 29.0, 2.2), 0.55, 0.06, 0.06, 2, 18),
      mats.magnesiumCast
    );
    innerFlange.position.z = 1.05;
    g.add(innerFlange);

    // 3 CNC stainless tripod datum mounting bushings with hollow alignment bores
    for (const [ex, ey] of [
      [-28.5, 21.0],
      [28.5, 21.0],
      [0, -24.0],
    ] as Array<[number, number]>) {
      const ear = new THREE.Mesh(
        hiResCyl(3.4, 3.6, 2.2, 22).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      ear.position.set(ex, ey, 0);
      const bore = new THREE.Mesh(
        hiResCyl(1.75, 1.75, 2.3, 16).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      bore.position.set(ex, ey, 0);
      bore.userData.noEdges = true;
      g.add(ear, bore);
    }

    // Molded black GF-PPS cable-routing retention clips with snap-in hook arms
    for (const sx of [-31.4, 31.4]) {
      const dir = Math.sign(sx);
      const clipBody = new THREE.Mesh(
        createChamferedBoxGeo(1.4, 14.0, 2.1, 0.25, 0.06, 'z'),
        mats.mountPpsInsulator
      );
      clipBody.position.set(sx, 0, 0.1);
      for (const cy of [-4.5, 4.5]) {
        const hook = new THREE.Mesh(
          createChamferedBoxGeo(1.6, 2.2, 0.45, 0.15, 0.03, 'z'),
          mats.mountPpsInsulator
        );
        hook.position.set(sx + dir * 0.65, cy, 0.95);
        g.add(hook);
      }
      g.add(clipBody);
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
    // 3 non-reusable centerless-ground stepped datum guide shafts with micro-knurled press-fit bands
    for (const [sx, sy] of [
      [-24.2, 17.5],
      [24.2, 17.5],
      [0, -19.2],
    ] as Array<[number, number]>) {
      const shaftBody = new THREE.Mesh(
        hiResCyl(1.35, 1.35, 5.4, 20).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      shaftBody.position.set(sx, sy, 0);

      // Stepped titanium thrust flange collar + undercut relief groove
      const stepCollar = new THREE.Mesh(
        hiResCyl(2.4, 2.4, 1.15, 22).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      stepCollar.position.set(sx, sy, -0.6);

      // Micro-knurled single-use press-fit interference band (3 ribbed rings)
      for (const kz of [-2.1, -1.7, -1.3]) {
        const knurl = new THREE.Mesh(hiResTorus(1.38, 0.11, 6, 18), mats.pureIronArmature);
        knurl.position.set(sx, sy, kz);
        knurl.userData.noEdges = true;
        g.add(knurl);
      }

      // Bullet-nose chamfered pilot lead-in tip
      const tipChamfer = new THREE.Mesh(
        hiResCyl(0.75, 1.35, 0.95, 20).rotateX(Math.PI / 2),
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
    // Self-lubricating ivory POM retainer cage with weight-relief cutouts & 3 ball pockets
    const cageShape = createFrameShape(54.0, 41.0, 3.5, 45.0, 32.0, 2.4);
    addCircleHoles(cageShape, [
      [-12.0, 18.2, 1.35],
      [12.0, 18.2, 1.35],
      [0.0, -18.2, 1.35],
      [-24.8, 0.0, 1.35],
      [24.8, 0.0, 1.35],
    ]);
    const cagePlate = new THREE.Mesh(
      extrudeHiRes(cageShape, 0.55, 0.05, 0.05, 2, 24),
      mats.pomGear
    );
    g.add(cagePlate);

    // 3 chamfered ball-holding pocket collars with dual PFPE fluorinated grease micro-reservoirs
    for (const [bx, by] of [
      [-23.0, 17.0],
      [23.0, 17.0],
      [-23.0, -17.0],
    ] as Array<[number, number]>) {
      const pocket = new THREE.Mesh(hiResTorus(2.35, 0.46, 10, 26), mats.pomGear);
      pocket.position.set(bx, by, 0);
      const greaseFront = new THREE.Mesh(hiResTorus(1.75, 0.16, 8, 22), mats.opticalCementClear);
      greaseFront.position.set(bx, by, 0.16);
      greaseFront.userData.noEdges = true;
      const greaseRear = new THREE.Mesh(hiResTorus(1.75, 0.16, 8, 22), mats.opticalCementClear);
      greaseRear.position.set(bx, by, -0.16);
      greaseRear.userData.noEdges = true;
      g.add(pocket, greaseFront, greaseRear);
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
    const bobbins: Array<{ x: number; y: number; w: number; h: number }> = [
      { x: -16.5, y: -20.5, w: 15.2, h: 6.4 },
      { x: 16.5, y: -20.5, w: 15.2, h: 6.4 },
      { x: 27.6, y: 4.5, w: 6.4, h: 16.2 },
    ];
    for (const b of bobbins) {
      // Inner winding barrel core
      const coreShape = createFrameShape(b.w - 1.2, b.h - 1.2, 1.0, b.w - 3.6, b.h - 2.4, 0.6);
      const barrel = new THREE.Mesh(
        extrudeHiRes(coreShape, 1.35, 0.04, 0.04, 1, 18),
        mats.mountPpsInsulator
      );
      barrel.position.set(b.x, b.y, 0);
      g.add(barrel);

      // Front & rear overhanging bobbin winding-retaining flanges!
      const flangeShape = createFrameShape(b.w + 0.5, b.h + 0.5, 1.4, b.w - 3.4, b.h - 2.2, 0.6);
      const flangeGeo = extrudeHiRes(flangeShape, 0.20, 0.03, 0.03, 1, 18);
      for (const fz of [-0.62, 0.62]) {
        const fl = new THREE.Mesh(flangeGeo, mats.matteBlackAnodized);
        fl.position.set(b.x, b.y, fz);
        g.add(fl);
      }

      // Pair of gold-plated phosphor-bronze wire-wrap solder terminal posts with copper coil wrap collars
      for (const offset of [-1.4, 1.4]) {
        const pin = new THREE.Mesh(
          createChamferedBoxGeo(0.95, 0.95, 1.75, 0.14, 0.04, 'z'),
          mats.goldPlating
        );
        pin.position.set(b.x + offset, b.y + b.h / 2 + 0.55, -0.1);
        const wrap = new THREE.Mesh(
          hiResCyl(0.62, 0.62, 0.42, 12).rotateX(Math.PI / 2),
          mats.copperCoil
        );
        wrap.position.set(b.x + offset, b.y + b.h / 2 + 0.55, -0.45);
        wrap.userData.noEdges = true;
        g.add(pin, wrap);
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
    const targets: Array<{ x: number; y: number; rotZ: number }> = [
      { x: -16.5, y: -15.8, rotZ: 0 },
      { x: 16.5, y: -15.8, rotZ: 0 },
      { x: 23.0, y: 4.5, rotZ: Math.PI / 2 },
    ];
    for (const t of targets) {
      const sub = new THREE.Group();
      sub.position.set(t.x, t.y, 0);
      sub.rotation.z = t.rotZ;

      // Chamfered dual-pole N/S linear-gradient sensing blocks + crisp neutral zero-crossing seam + N/S laser ticks
      const poleN = new THREE.Mesh(
        createChamferedBoxGeo(3.1, 1.8, 0.95, 0.25, 0.08, 'z'),
        mats.neodymiumMagnet
      );
      poleN.position.x = -1.68;
      const nDot = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.36, 0.08), mats.mountRedIndexDot);
      nDot.position.set(-1.68, 0.55, 0.49);
      nDot.userData.noEdges = true;

      const poleS = new THREE.Mesh(
        createChamferedBoxGeo(3.1, 1.8, 0.95, 0.25, 0.08, 'z'),
        mats.pureIronArmature
      );
      poleS.position.x = 1.68;
      const sDot = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.36, 0.08), mats.mountThreadLockBlue);
      sDot.position.set(1.68, 0.55, 0.49);
      sDot.userData.noEdges = true;

      // 3-sided U-channel Permalloy cross-talk shielding trough isolating VCM drive flux!
      const baffleBack = new THREE.Mesh(
        createChamferedBoxGeo(7.8, 0.42, 1.55, 0.12, 0.04, 'z'),
        mats.lensPermalloyShield
      );
      baffleBack.position.set(0, -1.25, 0);
      for (const sx of [-3.7, 3.7]) {
        const wing = new THREE.Mesh(
          createChamferedBoxGeo(0.42, 2.2, 1.55, 0.1, 0.04, 'z'),
          mats.lensPermalloyShield
        );
        wing.position.set(sx, -0.35, 0);
        sub.add(wing);
      }

      sub.add(poleN, nDot, poleS, sDot, baffleBack);
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
    // Anisotropic basal-plane PGS pyrolytic graphite sheet with screw-clearance holes
    const sheetShape = createRoundedRectShape(48.0, 34.0, 3.0);
    addCircleHoles(sheetShape, [
      [-20.5, 13.5, 1.4],
      [20.5, 13.5, 1.4],
      [-20.5, -13.5, 1.4],
      [20.5, -13.5, 1.4],
    ]);
    const sheetGeo = extrudeHiRes(sheetShape, 0.22, 0.02, 0.02, 1, 22);
    applyBoxUVs(sheetGeo, 16.0);
    const sheet = new THREE.Mesh(sheetGeo, mats.ultra.sensorPyroGraphite);
    g.add(sheet);

    // Translucent PET dielectric insulation border laminating graphite sheet
    const petFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(49.2, 35.2, 3.2, 46.8, 32.8, 2.6), 0.26, 0.02, 0.02, 1, 20),
      mats.mylarInsulatorFilm
    );
    g.add(petFrame);

    // Dual exposed copper-foil thermal-grounding contact strips
    for (const sy of [-12.5, 12.5]) {
      const cuTab = new THREE.Mesh(
        createChamferedBoxGeo(16.0, 2.2, 0.28, 0.3, 0.02, 'z'),
        mats.copperHeatSpreader
      );
      cuTab.position.set(0, sy, -0.04);
      g.add(cuTab);
    }

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
    // Smooth radiused L-bent anisotropic PGS graphite thermal bridge (curved bend instead of sharp 90° box!)
    const bendGeo = buildFlatRibbonExtrude(
      [
        [0.0, 4.1],
        [0.0, -2.8],
        [-0.8, -3.9],
        [-2.2, -4.0],
        [-9.4, -4.0],
      ],
      0.26,
      25.6,
      'xz'
    );
    applyBoxUVs(bendGeo, 14.0);
    g.add(new THREE.Mesh(bendGeo, mats.ultra.sensorPyroGraphite));

    // Flex-relief transverse stress slits along bend radius + stepped copper-foil contact patch
    for (const sy of [-7.0, 0.0, 7.0]) {
      const slit = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.45, 0.55), mats.matteBlackAnodized);
      slit.position.set(-0.6, sy, -3.7);
      slit.userData.noEdges = true;
      g.add(slit);
    }
    const cuPatch = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 18.0, 5.6, 0.3, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    cuPatch.position.set(0.18, 0, 0.8);
    g.add(cuPatch);

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
    // 1. Stamped aluminum top heat plate (Ref.453) with mounting ears, stiffening rib & M1.4 screws
    const alShape = createRoundedRectShape(46.0, 9.6, 1.8);
    addCircleHoles(alShape, [
      [-19.8, 0, 1.1],
      [19.8, 0, 1.1],
    ]);
    const alPlate = new THREE.Mesh(
      extrudeHiRes(alShape, 0.9, 0.08, 0.08, 2, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    g.add(alPlate);

    for (const sx of [-19.8, 19.8]) {
      const sc = createPrecisionScrew(1.35, 0.42, 1.4, mats.stainlessMachined);
      sc.rotation.x = Math.PI / 2;
      sc.position.set(sx, 0.56, 0);
      g.add(sc);
    }

    // 2. Top anisotropic PGS graphite spreading sheet bonded to upper surface (Ref.454)
    const grGeo = extrudeHiRes(createRoundedRectShape(34.5, 8.2, 1.2), 0.24, 0.02, 0.02, 1, 16).rotateX(
      Math.PI / 2
    );
    applyBoxUVs(grGeo, 14.0);
    const topGraphite = new THREE.Mesh(grGeo, mats.ultra.sensorPyroGraphite);
    topGraphite.position.y = 0.60;
    g.add(topGraphite);

    // 3. Precision chamfered blue silicone clearance gap-pad spacer underneath (Ref.470)
    const topSpacer = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(36.0, 6.0, 0.8), 0.55, 0.05, 0.05, 2, 14).rotateX(
        Math.PI / 2
      ),
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
      // Authentic tri-lobular Reuleaux thread-rolling shank + washer-faced pan head + Phillips #0 recess
      const scr = buildTrilobularNewTrusterScrew(
        1.42,
        0.56,
        0.85,
        2.6,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.position.set(sx, sy, 0);
      scr.rotation.x += Math.PI; // Rearward insertion into anti-shake plate
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
    // True flat rectangular-ribbon S-folded gold-plated CuBe2 grounding leaf spring!
    const leafGeo = buildFlatRibbonExtrude(
      [
        [0.0, 0.0],
        [-2.6, 2.2],
        [1.2, 4.6],
        [-2.2, 7.2],
        [0.4, 9.6],
      ],
      0.24,
      1.85,
      'xy'
    );
    const leafMesh = new THREE.Mesh(leafGeo, mats.beCuSpring);
    leafMesh.rotation.y = 0.24;
    leafMesh.position.z = -0.3;
    g.add(leafMesh);

    // Stamped gold mounting eyelets with flanged micro-rivets at both terminals
    for (const [ex, ey, ez] of [
      [0, 0, 1.1],
      [0.4, 9.6, -1.7],
    ] as Array<[number, number, number]>) {
      const eye = new THREE.Mesh(hiResTorus(1.1, 0.32, 8, 20), mats.goldPlating);
      eye.position.set(ex, ey, ez);
      const rivet = new THREE.Mesh(
        hiResCyl(0.58, 0.58, 0.45, 14).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      rivet.position.set(ex, ey, ez);
      rivet.userData.noEdges = true;
      g.add(eye, rivet);
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
    // Chamfered laser-etched ceramic/anodized calibration plate with high-DPI Sony Imager DRA DataMatrix texture!
    const plateGeo = extrudeHiRes(createRoundedRectShape(11.4, 7.6, 0.65), 0.34, 0.04, 0.04, 2, 16);
    const plate = new THREE.Mesh(plateGeo, mats.matteBlackAnodized);
    g.add(plate);

    // High-DPI laser-etched DataMatrix & serial decal on both rear (-Z) and front (+Z) inspection faces
    const rearLabelGeo = markHiRes(new THREE.PlaneGeometry(10.6, 6.8));
    applyPlanarUVs(rearLabelGeo, 10.6, 6.8, 'xy');
    const rearLabel = new THREE.Mesh(rearLabelGeo, mats.ultra.sensorDraQrPlate);
    rearLabel.rotation.y = Math.PI;
    rearLabel.position.z = -0.19;
    rearLabel.userData.noEdges = true;

    const frontLabelGeo = markHiRes(new THREE.PlaneGeometry(10.6, 6.8));
    applyPlanarUVs(frontLabelGeo, 10.6, 6.8, 'xy');
    const frontLabel = new THREE.Mesh(frontLabelGeo, mats.ultra.sensorDraQrPlate);
    frontLabel.position.z = 0.19;
    frontLabel.userData.noEdges = true;

    // Micro PSA acrylic adhesive mounting strip peeking cleanly at edge
    const psaBacking = new THREE.Mesh(
      createChamferedBoxGeo(11.0, 7.2, 0.08, 0.5, 0.02, 'z'),
      mats.mylarInsulatorFilm
    );
    psaBacking.position.z = 0.14;
    psaBacking.userData.noEdges = true;

    g.add(rearLabel, frontLabel, psaBacking);

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
    // Stamped C7521 nickel-silver 2-piece RF shield lid with thermal vent holes & embossed X-stiffening ribs
    const lidShape = createRoundedRectShape(34.0, 22.0, 2.0);
    addCircleHoles(lidShape, [
      [-11.5, 6.8, 0.95],
      [11.5, 6.8, 0.95],
      [-11.5, -6.8, 0.95],
      [11.5, -6.8, 0.95],
    ]);
    const lid = new THREE.Mesh(
      extrudeHiRes(lidShape, 0.24, 0.04, 0.04, 2, 20),
      mats.emiShieldCan
    );
    lid.position.z = -0.55;
    g.add(lid);

    // Embossed diagonal stiffening X-ribs on lid exterior (-Z)
    for (const ang of [0.54, -0.54]) {
      const xRib = new THREE.Mesh(
        createChamferedBoxGeo(22.0, 1.35, 0.16, 0.3, 0.03, 'z'),
        mats.emiShieldCan
      );
      xRib.position.z = -0.70;
      xRib.rotation.z = ang;
      xRib.userData.noEdges = true;
      g.add(xRib);
    }

    // Raised perimeter skirt wall with snap-in EMI clip detent dimples along all 4 sides
    const skirtShape = createFrameShape(34.0, 22.0, 2.0, 32.8, 20.8, 1.4);
    const skirt = new THREE.Mesh(
      extrudeHiRes(skirtShape, 1.1, 0.04, 0.04, 2, 20),
      mats.emiShieldCan
    );
    g.add(skirt);

    for (const dx of [-10.0, 0.0, 10.0]) {
      for (const sy of [-11.02, 11.02]) {
        const detent = new THREE.Mesh(hiResSphere(0.32, 8, 6), mats.stainlessMachined);
        detent.scale.set(1.6, 0.5, 1.0);
        detent.position.set(dx, sy, 0.12);
        detent.userData.noEdges = true;
        g.add(detent);
      }
    }

    // Conductive Ni-Cu fabric-over-foam grounding gasket around bottom perimeter
    const gasketShape = createFrameShape(33.4, 21.4, 1.6, 32.0, 20.0, 1.2);
    const gasket = new THREE.Mesh(
      extrudeHiRes(gasketShape, 0.38, 0.04, 0.04, 1, 18),
      mats.conductiveNiCuFoam
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
