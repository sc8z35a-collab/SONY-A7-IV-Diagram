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
import { MAINBOARD_MICRO_EXPLANATIONS } from './mainboardMicroExplanations';

function finalizeStandaloneMainboardMicroPart(
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
    explanation: MAINBOARD_MICRO_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Build 24 ultra-fine standalone-only Vapor Chamber, Two-Phase Cooling & Sony OEM Mainboard
 * micro-parts (M31–M54).
 * Rendered ONLY in standalone 'mainboard' view; completely omitted in whole-camera views
 * ('integrated', 'camera_body').
 *
 * Coordinate reference (matches mainboardParts.ts):
 * - PCB center: z = -19.2 mm (92 x 64 mm, rear component side faces -Z)
 * - Front Mg mid-frame (M16): z = -15.6 mm
 * - Rear Vapor Chamber (M01): z = -27.4 mm, centered around (-4.5, -1.0) + NPU bridge (18.0, 6.5)
 * - Rear RF Shield Bracket (M18): z = -28.8 mm
 */
export function buildMainboardMicroParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // M31. Vapor Chamber Evaporator-Side C1100 Copper Plate & Photo-Etched Micro-Grooves
  // =========================================================================
  {
    const g = new THREE.Group();

    // Thin C1100 bottom evaporator shell matching M01 footprint
    const evapPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(33.2, 28.2, 3.0), 0.18, 0.02, 0.02, 16),
      mats.copperHeatSpreader
    );
    evapPlate.position.set(-4.5, -1.0, 0);
    g.add(evapPlate);

    // Secondary evaporator tongue reaching AI NPU hotspot
    const npuEvap = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(15.2, 8.6, 1.8), 0.16, 0.02, 0.02, 12),
      mats.copperHeatSpreader
    );
    npuEvap.position.set(17.8, 6.5, 0);
    g.add(npuEvap);

    // Photo-etched radial hydrophilic micro-groove ridges on internal (-Z) face
    for (let gy = -11.5; gy <= 9.5; gy += 2.1) {
      const groove = new THREE.Mesh(
        new THREE.BoxGeometry(28.6, 0.32, 0.14),
        mats.vaporWickCopper
      );
      groove.position.set(-4.5, gy, -0.14);
      groove.userData.noEdges = true;
      g.add(groove);
    }
    // Cross-etched boiling nucleation grid over ISP hotspot (3.5, -1.5)
    for (let gx = -2.5; gx <= 9.5; gx += 2.0) {
      const xRib = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 13.0, 0.16),
        mats.goldPlating
      );
      xRib.position.set(gx, -1.5, -0.15);
      xRib.userData.noEdges = true;
      g.add(xRib);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-vc-evaporator-plate',
        31,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -26.82),
        new THREE.Vector3(-4, 4, -44.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // M32. Vapor Chamber Condenser-Side C1100 Copper Lid & Diffusion-Bonded Flange
  // =========================================================================
  {
    const g = new THREE.Group();

    // Raised peripheral diffusion-bonded hermetic sealing flange rim
    const flangeShape = createFrameShape(34.2, 29.2, 3.2, 30.8, 25.8, 2.4);
    const flange = new THREE.Mesh(
      extrudeCentered(flangeShape, 0.28, 0.03, 0.03, 16),
      mats.copperHybridBond
    );
    flange.position.set(-4.5, -1.0, 0.04);
    g.add(flange);

    // Ultra-thin condenser ceiling copper foil
    const condLid = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(32.2, 27.2, 2.7), 0.16, 0.02, 0.02, 16),
      mats.vaporChamberCopper
    );
    condLid.position.set(-4.5, -1.0, -0.06);
    g.add(condLid);

    // NPU branch condenser sealing collar
    const npuRim = new THREE.Mesh(
      extrudeCentered(createFrameShape(16.0, 9.4, 1.9, 13.6, 7.0, 1.2), 0.24, 0.02, 0.02, 12),
      mats.copperHybridBond
    );
    npuRim.position.set(18.0, 6.5, 0.02);
    g.add(npuRim);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-vc-condenser-plate',
        32,
        '#c26234',
        g,
        new THREE.Vector3(0, 0, -27.82),
        new THREE.Vector3(4, 4, -60.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // M33. 200-Mesh Woven Fine Copper Screen Hybrid Wick & Coarse Vapor Mesh
  // =========================================================================
  {
    const g = new THREE.Group();

    // Fine 200-mesh woven copper gauze carrier frame
    const meshFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(30.4, 25.4, 2.4, 27.8, 22.8, 1.8), 0.22, 0.02, 0.02, 14),
      mats.vcCopperMeshWick
    );
    meshFrame.position.set(-4.5, -1.0, 0);
    g.add(meshFrame);

    // Interlaced copper wire screen grid (warp & weft filaments)
    for (let wx = -17.5; wx <= 8.5; wx += 2.6) {
      const warp = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 23.4, 0.12),
        mats.vcCopperMeshWick
      );
      warp.position.set(wx, -1.0, -0.04);
      warp.userData.noEdges = true;
      g.add(warp);
    }
    for (let wy = -12.0; wy <= 10.0; wy += 2.4) {
      const weft = new THREE.Mesh(
        new THREE.BoxGeometry(27.8, 0.28, 0.12),
        mats.copperHeatSpreader
      );
      weft.position.set(-4.5, wy, 0.05);
      weft.userData.noEdges = true;
      g.add(weft);
    }

    // Secondary fine-mesh strip feeding AI NPU branch
    const npuMesh = new THREE.Mesh(
      new THREE.BoxGeometry(13.2, 6.2, 0.16),
      mats.vcCopperMeshWick
    );
    npuMesh.position.set(17.5, 6.5, 0);
    g.add(npuMesh);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-vc-woven-mesh-wick',
        33,
        '#e08955',
        g,
        new THREE.Vector3(0, 0, -27.14),
        new THREE.Vector3(-12, -2, -51.5),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // M34. Sub-Atmospheric Degassed DI-Water Working Fluid & Phase-Change Zone
  // =========================================================================
  {
    const g = new THREE.Group();

    // Translucent cyan liquid-vapor working fluid meniscus sheet inside chamber
    const fluidSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(29.0, 24.0, 2.2), 0.18, 0.02, 0.02, 14),
      mats.vcWorkingFluidCyan
    );
    fluidSheet.position.set(-4.5, -1.0, 0);
    g.add(fluidSheet);

    // Central amber-tinted vapor nucleation bubbles over ISP & NPU hotspots
    const bubbleCoords: Array<[number, number, number]> = [
      [3.5, -1.5, 1.35],
      [1.2, 1.4, 0.88],
      [5.8, -3.6, 0.92],
      [2.0, -4.2, 0.76],
      [-2.5, 0.2, 0.84],
      [17.8, 6.5, 1.05],
    ];
    for (const [bx, by, br] of bubbleCoords) {
      const bubble = new THREE.Mesh(
        new THREE.SphereGeometry(br, 14, 10),
        mats.vcWorkingFluidCyan
      );
      bubble.scale.set(1, 1, 0.34);
      bubble.position.set(bx, by, -0.06);
      bubble.userData.noEdges = true;
      g.add(bubble);
    }

    // Peripheral condensed liquid return droplets along cold edges
    for (const [dx, dy] of [
      [-16.2, 8.2],
      [-16.2, -10.2],
      [-10.2, 8.8],
      [-10.2, -10.8],
      [6.5, 8.5],
      [6.5, -10.5],
    ] as Array<[number, number]>) {
      const drop = new THREE.Mesh(
        new THREE.SphereGeometry(0.62, 10, 8),
        mats.evfAntiFogGlass
      );
      drop.scale.set(1.2, 0.9, 0.4);
      drop.position.set(dx, dy, 0.06);
      drop.userData.noEdges = true;
      g.add(drop);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-vc-working-fluid-zone',
        34,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, -27.36),
        new THREE.Vector3(10, -4, -56.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // M35. Vacuum Evacuation Pinch-Off Cold-Weld Seal & Ti-Zr NCG Getter Strip
  // =========================================================================
  {
    const g = new THREE.Group();

    // Copper fill-port tube + flattened ultrasonic cold-weld pinch-off blade + laser solder cap
    const portTube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.56, 0.56, 3.6, 12).rotateZ(Math.PI / 2),
      mats.vaporChamberCopper
    );
    portTube.position.set(-22.2, -10.5, 0);
    const pinchFlat = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 1.35, 0.34),
      mats.copperHybridBond
    );
    pinchFlat.position.set(-24.8, -10.5, 0);
    const weldCap = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 1.45, 0.44),
      mats.solderBallSilver
    );
    weldCap.position.set(-26.3, -10.5, 0);

    // Internal Ti-Zr-V porous Non-Condensable Gas (NCG) getter pill strip tucked in cold corner
    const getterTray = new THREE.Mesh(
      new THREE.BoxGeometry(5.6, 2.2, 0.32),
      mats.stainlessMachined
    );
    getterTray.position.set(-16.8, -10.5, 0);
    const getterCore = new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 1.5, 0.38),
      mats.invarScaleBar
    );
    getterCore.position.set(-16.8, -10.5, -0.04);

    g.add(portTube, pinchFlat, weldCap, getterTray, getterCore);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-vc-pinch-seal-getter',
        35,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -27.35),
        new THREE.Vector3(-34, -14, -54.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M36. Constant-Force Belleville-Spring Shoulder Screws & 4-Point Retention Bosses
  // =========================================================================
  {
    const g = new THREE.Group();

    const clampCoords: Array<[number, number]> = [
      [-18.8, 10.8],
      [9.8, 10.8],
      [-18.8, -12.8],
      [9.8, -12.8],
    ];
    for (const [cx, cy] of clampCoords) {
      // Precision stainless stepped shoulder screw
      const screw = createPrecisionScrew(1.38, 0.52, 2.2, mats.stainlessMachined);
      screw.rotation.x = Math.PI;
      screw.position.set(cx, cy, -0.45);
      g.add(screw);

      // Conical Belleville disc spring washer under screw head
      const belleville = new THREE.Mesh(
        new THREE.CylinderGeometry(1.55, 2.05, 0.42, 18, 1, true).rotateX(Math.PI / 2),
        mats.beCuSpring
      );
      belleville.position.set(cx, cy, -0.05);
      g.add(belleville);

      // Miniature secondary helical preload coil around shoulder shank
      const coil = new THREE.Mesh(
        createHelicalSpringGeometry(1.2, 1.25, 3, 0.16),
        mats.mountSpringSteel
      );
      coil.position.set(cx, cy, 0.42);
      coil.userData.noEdges = true;
      g.add(coil);

      // Brass threaded retention collar ring
      const collar = new THREE.Mesh(
        new THREE.TorusGeometry(1.75, 0.25, 8, 18),
        mats.brassGear
      );
      collar.position.set(cx, cy, 0.95);
      collar.userData.noEdges = true;
      g.add(collar);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-vc-spring-clamps',
        36,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, -28.02),
        new THREE.Vector3(14, 14, -68.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M37. 45°C Phase-Change Thermal Interface Material (PTM-Class PCM Film)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision die-cut PCM phase-change interface films on ISP IHS, AI NPU, and Dual DRAM
    const ispPcm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(15.2, 14.8, 0.8), 0.18, 0.02, 0.02, 12),
      mats.aluminaHighKFilm
    );
    ispPcm.position.set(3.5, -1.5, 0);
    const npuPcm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(9.8, 9.8, 0.6), 0.18, 0.02, 0.02, 10),
      mats.aluminaHighKFilm
    );
    npuPcm.position.set(22.5, 6.5, 0);
    const dram1Pcm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(9.4, 12.2, 0.5), 0.18, 0.02, 0.02, 10),
      mats.thermalPadPink
    );
    dram1Pcm.position.set(-14.2, 8.5, 0);
    const dram2Pcm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(9.4, 12.2, 0.5), 0.18, 0.02, 0.02, 10),
      mats.thermalPadPink
    );
    dram2Pcm.position.set(-14.2, -9.5, 0);

    // Subtle alignment peel-tab markers on corner of PCM sheet
    const tab = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 0.14), mats.goldPlating);
    tab.position.set(11.6, 5.4, 0);
    tab.userData.noEdges = true;

    g.add(ispPcm, npuPcm, dram1Pcm, dram2Pcm, tab);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-vc-pcm-tim-film',
        37,
        '#ec4899',
        g,
        new THREE.Vector3(0, 0, -25.85),
        new THREE.Vector3(6, -6, -34.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M38. Heat-Pipe Distal Tripod Cold-Sink Copper Coupling Block & Thermal Shim
  // =========================================================================
  {
    const g = new THREE.Group();

    // CNC C1100 copper saddle block clamping the distal flattened heat-pipe end
    const saddle = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.5, 6.8, 1.4), 2.1, 0.12, 0.12, 12),
      mats.copperHeatSpreader
    );
    saddle.position.set(-22.5, -26.5, 0);
    // Compliant sky-blue silicone thermal shim bridging to bottom tripod brass boss
    const shim = new THREE.Mesh(
      new THREE.BoxGeometry(15.2, 5.6, 0.72),
      mats.thermalPadBlue
    );
    shim.position.set(-22.5, -26.5, 1.42);
    // Thermal extension tongue toward central tripod brass block (-2.0, -33.2)
    const bridgeBar = new THREE.Mesh(
      new THREE.BoxGeometry(22.0, 3.8, 0.95),
      mats.vaporChamberCopper
    );
    bridgeBar.position.set(-12.5, -29.8, 0.4);
    bridgeBar.rotation.z = -0.18;

    // 2 M1.6 stainless compression bolts
    for (const sx of [-28.5, -16.5]) {
      const b = createPrecisionScrew(1.0, 0.36, 1.4, mats.stainlessMachined);
      b.rotation.x = Math.PI;
      b.position.set(sx, -26.5, -1.15);
      g.add(b);
    }
    g.add(saddle, shim, bridgeBar);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-vc-tripod-cold-bridge',
        38,
        '#b45309',
        g,
        new THREE.Vector3(0, 0, -26.4),
        new THREE.Vector3(-24, -30, -44.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M39. Sony OEM HEAT_PLATE_(89100) (Ref.355: 502789301) Wide-Area Mainboard Heat Plate
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision stamped aluminum-copper wide heat spreader frame flanking M01 & CFexpress
    const hpShape = createFrameShape(76.0, 48.0, 3.2, 34.4, 29.4, 2.8, -4.5, -1.0);
    const hpPlate = new THREE.Mesh(
      extrudeCentered(hpShape, 0.42, 0.04, 0.04, 16),
      mats.mountStainlessFlange
    );
    g.add(hpPlate);

    // Embossed heat-spreading wings over right I/O & left media bay
    const wingL = new THREE.Mesh(new THREE.BoxGeometry(11.0, 34.0, 0.35), mats.copperHeatSpreader);
    wingL.position.set(-29.5, 0, -0.22);
    const wingR = new THREE.Mesh(new THREE.BoxGeometry(12.5, 32.0, 0.35), mats.copperHeatSpreader);
    wingR.position.set(27.5, -1.0, -0.22);
    g.add(wingL, wingR);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-oem-heat-plate',
        39,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -28.28),
        new THREE.Vector3(0, 12, -72.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M40. Sony OEM HEAT TRANSFER SHEET A (Ref.357: 502860201) & Tape 631S #25 (Ref.360)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Multi-layer pyrolytic graphite thermal transfer sheet draping across rear hot zone
    const gSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(46.0, 34.0, 2.8), 0.16, 0.02, 0.02, 14),
      mats.pyroGraphite
    );
    gSheet.position.set(-2.0, 0.5, 0);
    g.add(gSheet);

    // High-emissivity black heat-resistant 3M/Sony 631S #25 7mm retention tape strips
    for (const [tx, ty, tw, th] of [
      [-24.5, 9.0, 7.0, 14.0],
      [21.0, 9.0, 7.0, 14.0],
      [-2.0, -16.8, 28.0, 5.2],
      [-2.0, 17.8, 24.0, 5.2],
    ] as Array<[number, number, number, number]>) {
      const tape = new THREE.Mesh(
        new THREE.BoxGeometry(tw, th, 0.18),
        mats.thermalTransferTape
      );
      tape.position.set(tx, ty, -0.14);
      g.add(tape);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-oem-heat-transfer-sheet',
        40,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, -28.56),
        new THREE.Vector3(-12, 18, -78.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // M41. Sony OEM INSULATING SHEET A (Ref.356: 502992401) Rear Dielectric Barrier
  // =========================================================================
  {
    const g = new THREE.Group();

    // Flame-retardant polycarbonate sheet with precision cutouts over ISP, NPU & DRAM TIMs
    const insA = createFrameShape(78.0, 52.0, 3.0, 17.6, 17.6, 1.0, 3.5, -1.5);
    // Cutout over NPU
    const npuCut = new THREE.Path();
    npuCut.moveTo(16.8, 0.8);
    npuCut.lineTo(28.2, 0.8);
    npuCut.lineTo(28.2, 12.2);
    npuCut.lineTo(16.8, 12.2);
    npuCut.closePath();
    insA.holes.push(npuCut);
    // Cutout over Dual LPDDR5X
    const dramCut = new THREE.Path();
    dramCut.moveTo(-20.2, -16.0);
    dramCut.lineTo(-8.2, -16.0);
    dramCut.lineTo(-8.2, 15.0);
    dramCut.lineTo(-20.2, 15.0);
    dramCut.closePath();
    insA.holes.push(dramCut);

    const sheetMesh = new THREE.Mesh(
      extrudeCentered(insA, 0.16, 0.01, 0.01, 14),
      mats.mylarInsulatorFilm
    );
    g.add(sheetMesh);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-oem-insulating-sheet-a',
        41,
        '#334155',
        g,
        new THREE.Vector3(0, 0, -25.45),
        new THREE.Vector3(0, -14, -36.5),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // M42. Sony OEM INSULATING SHEET B (Ref.361: 502992501) Front Chassis Barrier
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front (+Z) flame-retardant dielectric sheet shielding VRM & PCB from Mg mid-frame
    const insB = createFrameShape(84.0, 56.0, 3.2, 28.0, 8.2, 1.2, 2.0, -2.0);
    const sheetMesh = new THREE.Mesh(
      extrudeCentered(insB, 0.16, 0.01, 0.01, 14),
      mats.mylarInsulatorFilm
    );
    g.add(sheetMesh);

    // 4 orange Kapton positioning tabs
    for (const [tx, ty] of [
      [-39.0, 25.0],
      [39.0, 25.0],
      [-39.0, -25.0],
      [39.0, -25.0],
    ] as Array<[number, number]>) {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.2, 0.18), mats.polyimideFpc);
      tab.position.set(tx, ty, 0.08);
      tab.userData.noEdges = true;
      g.add(tab);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-oem-insulating-sheet-b',
        42,
        '#475569',
        g,
        new THREE.Vector3(0, 0, -16.85),
        new THREE.Vector3(0, -10, 20.5),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // M43. Sony OEM MAGNETIC FIELD CUT PLATE (Ref.352: 502789501) Permalloy Shield
  // =========================================================================
  {
    const g = new THREE.Group();

    // High-permeability permalloy plate blocking IBIS N52 & VRM stray magnetic flux
    const magPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(44.0, 20.5, 2.0), 0.36, 0.04, 0.04, 14),
      mats.lensPermalloyShield
    );
    magPlate.position.set(2.0, -18.5, 0);
    g.add(magPlate);

    // Stamped magnetic flux-diverting corner flanges
    for (const sx of [-20.5, 24.5]) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(3.2, 7.5, 0.42), mats.softIronYoke);
      ear.position.set(sx, -18.5, -0.1);
      g.add(ear);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-oem-mag-cut-plate',
        43,
        '#4f46e5',
        g,
        new THREE.Vector3(0, 0, -16.25),
        new THREE.Vector3(12, -24, 32.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M44. Sony OEM JACK PLATE (Ref.353: 502789401) Side I/O Strain-Relief Bracket
  // =========================================================================
  {
    const g = new THREE.Group();

    // Rigid SUS304 vertical reinforcement plate spanning all +X left-flank I/O ports
    const plateShape = createFrameShape(11.6, 54.0, 1.8, 7.2, 12.2, 0.8, 0, 15.8);
    // Cutout for HDMI 2.1 port
    const hCut = new THREE.Path();
    hCut.moveTo(-3.4, -6.2);
    hCut.lineTo(3.4, -6.2);
    hCut.lineTo(3.4, 9.2);
    hCut.lineTo(-3.4, 9.2);
    hCut.closePath();
    plateShape.holes.push(hCut);
    // Cutout for USB-C + 3.5mm jacks
    const uCut = new THREE.Path();
    uCut.moveTo(-3.2, -25.5);
    uCut.lineTo(3.2, -25.5);
    uCut.lineTo(3.2, -8.2);
    uCut.lineTo(-3.2, -8.2);
    uCut.closePath();
    plateShape.holes.push(uCut);

    const jp = new THREE.Mesh(
      extrudeCentered(plateShape, 0.85, 0.06, 0.06, 12).rotateY(Math.PI / 2),
      mats.mountStainlessFlange
    );
    jp.position.set(46.8, -1.0, 0);
    g.add(jp);

    // Top & bottom chassis anchor ears + M1.7 bolts
    for (const sy of [25.2, -26.8]) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.6, 1.1), mats.stainlessMachined);
      ear.position.set(43.8, sy, 0);
      const scr = createPrecisionScrew(0.95, 0.36, 1.2, mats.stainlessMachined);
      scr.rotation.x = Math.PI;
      scr.position.set(42.8, sy, -0.75);
      g.add(ear, scr);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-oem-jack-plate',
        44,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, -22.2),
        new THREE.Vector3(44, 0, -18.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M45. Sony OEM FP-2438 Inter-Board Flex (Ref.359: 198422111) & Press-On B2B Clamp
  // =========================================================================
  {
    const g = new THREE.Group();

    // Contoured 3D polyimide inter-board flex bridge (FP-2438)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(14.0, 19.5, 0.2),
      new THREE.Vector3(24.0, 19.5, 0.2),
      new THREE.Vector3(29.5, 13.0, -0.6),
      new THREE.Vector3(29.5, 2.0, -0.6),
    ]);
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 2.8, 6, false);
    tubeGeo.scale(1, 1, 0.14);
    const flexRibbon = new THREE.Mesh(tubeGeo, mats.polyimideFpc);
    g.add(flexRibbon);

    // Silver-ink EMI shield patch over high-speed differential section
    const emiPatch = new THREE.Mesh(new THREE.BoxGeometry(4.8, 9.6, 0.24), mats.emiShieldFilm);
    emiPatch.position.set(29.5, 8.0, -0.62);
    g.add(emiPatch);

    // Gold press-on B2B mezzanine plugs + stainless anti-pop-out retainer plate
    for (const [px, py, pz] of [
      [14.0, 19.5, 0.2],
      [29.5, 2.0, -0.6],
    ] as Array<[number, number, number]>) {
      const plug = new THREE.Mesh(new THREE.BoxGeometry(6.8, 2.6, 0.85), mats.zifIvoryPlastic);
      plug.position.set(px, py, pz);
      const pins = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.4, 0.26), mats.goldPlating);
      pins.position.set(px, py, pz + 0.45);
      const clamp = new THREE.Mesh(new THREE.BoxGeometry(8.2, 3.2, 0.35), mats.stainlessMachined);
      clamp.position.set(px, py, pz - 0.56);
      g.add(plug, pins, clamp);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-oem-fp2438-flex',
        45,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, -18.35),
        new THREE.Vector3(34, 18, 12.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M46. Sony OEM GY-1018 Gyro Sub-Board (Ref.408) & Dual Cushions (Ref.407/409)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Isolated green HDI gyro daughterboard (GY-1018)
    const pcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.4, 10.6, 1.0), 0.75, 0.04, 0.04, 10),
      mats.hdiMainboardPcb
    );
    pcb.position.set(-18.5, -23.0, 0);
    // 3-Axis ultra-low-noise MEMS gyro IC + gold fiducial
    const ic = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.8, 0.75), mats.icEpoxy);
    ic.position.set(-18.5, -23.0, -0.65);
    // Upper & lower dual-density urethane anti-vibration cushions (Ref.407 & Ref.409)
    const cushRear = new THREE.Mesh(new THREE.BoxGeometry(12.2, 11.4, 0.85), mats.butylDamperRubber);
    cushRear.position.set(-18.5, -23.0, -1.25);
    const cushFront = new THREE.Mesh(new THREE.BoxGeometry(12.2, 11.4, 0.85), mats.lensFoamSeal);
    cushFront.position.set(-18.5, -23.0, 0.92);
    // Flexible isolation FPC ribbon connecting to mainboard MCU
    const fpc = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.4, 0.16), mats.polyimideFpc);
    fpc.position.set(-12.0, -23.0, 0.05);

    g.add(pcb, ic, cushRear, cushFront, fpc);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-oem-gyro-cushion-sub',
        46,
        '#059669',
        g,
        new THREE.Vector3(0, 0, -16.85),
        new THREE.Vector3(-26, -32, 24.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M47. 12-Layer HDI PCB Copper-Filled VIPPO Thermal Via Matrix & 2oz Inner Planes
  // =========================================================================
  {
    const g = new THREE.Group();

    // Exposed internal 2oz heavy copper thermal spreader plane slice under ISP/NPU
    const innerPlane = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(36.0, 26.0, 2.0), 0.16, 0.01, 0.01, 12),
      mats.copperHybridBond
    );
    innerPlane.position.set(7.5, 0.5, 0);
    g.add(innerPlane);

    // Dense array of solid-copper-filled VIPPO thermal pillars piercing 1.48mm PCB thickness!
    const viaGeo = new THREE.CylinderGeometry(0.28, 0.28, 1.56, 8).rotateX(Math.PI / 2);
    for (let vx = -2.5; vx <= 9.5; vx += 1.5) {
      for (let vy = -7.5; vy <= 4.5; vy += 1.5) {
        const via = new THREE.Mesh(viaGeo, mats.copperHeatSpreader);
        via.position.set(vx, vy, 0);
        via.userData.noEdges = true;
        g.add(via);
      }
    }
    // Secondary VIPPO cluster under AI NPU die (22.5, 6.5)
    for (let vx = 18.5; vx <= 26.5; vx += 1.6) {
      for (let vy = 2.5; vy <= 10.5; vy += 1.6) {
        const via = new THREE.Mesh(viaGeo, mats.copperHeatSpreader);
        via.position.set(vx, vy, 0);
        via.userData.noEdges = true;
        g.add(via);
      }
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-pcb-vippo-thermal-vias',
        47,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, -19.2),
        new THREE.Vector3(18, 22, 8.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // M48. 4-Zone Precision 0402 Ceramic NTC Thermistor Network
  // =========================================================================
  {
    const g = new THREE.Group();

    // 4 critical temperature monitoring nodes: ISP, CFexpress, PMIC/Battery, Rear Skin
    const ntcNodes: Array<[number, number, number]> = [
      [12.5, -8.5, 0],     // Zone 1: 4nm ISP hotspot edge
      [-23.5, 14.5, 0],    // Zone 2: CFexpress 4.0 slot hotspot
      [-12.5, -24.5, 0],   // Zone 3: PMIC / Battery corridor
      [25.5, 14.2, 0],     // Zone 4: Upper-right rear skin / Wi-Fi RF
    ];
    for (const [nx, ny, nz] of ntcNodes) {
      // Ceramic NTC thermistor body + silver end electrodes + sense trace pad
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.95, 0.65), mats.pztCeramic);
      body.position.set(nx, ny, nz);
      const tL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.98, 0.68), mats.silverElectrode);
      tL.position.set(nx - 0.85, ny, nz);
      const tR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.98, 0.68), mats.silverElectrode);
      tR.position.set(nx + 0.85, ny, nz);
      // Subtle copper thermal sense halo ring
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.85, 16), mats.goldPlating);
      ring.rotation.y = Math.PI;
      ring.position.set(nx, ny, nz - 0.36);
      ring.userData.noEdges = true;
      g.add(body, tL, tR, ring);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-ntc-thermistor-array',
        48,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0, -20.45),
        new THREE.Vector3(-12, 24, -22.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M49. Conductive Ni/Cu Fabric-over-Foam EMI Grounding Gaskets
  // =========================================================================
  {
    const g = new THREE.Group();

    // 6 perimeter compressible Ni/Cu woven fabric-wrapped EMI foam gaskets
    const gasketSpecs: Array<[number, number, number, number]> = [
      [-18.0, 26.2, 16.0, 2.8],
      [20.0, 26.2, 16.0, 2.8],
      [-26.0, -26.8, 18.0, 2.8],
      [18.0, -26.8, 18.0, 2.8],
      [-43.2, 0.0, 2.8, 22.0],
      [38.2, -1.0, 2.8, 20.0],
    ];
    for (const [gx, gy, gw, gh] of gasketSpecs) {
      const foam = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(gw, gh, 0.7), 1.45, 0.12, 0.12, 10),
        mats.conductiveNiCuFoam
      );
      foam.position.set(gx, gy, 0);
      // Conductive gold-nickel PSA base strip
      const psa = new THREE.Mesh(new THREE.BoxGeometry(gw - 0.4, gh - 0.4, 0.16), mats.goldPlating);
      psa.position.set(gx, gy, 0.78);
      psa.userData.noEdges = true;
      g.add(foam, psa);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-emi-conductive-gaskets',
        49,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -28.08),
        new THREE.Vector3(24, 24, -64.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M50. Battery-Bay Thermal Isolation Air-Gap Baffle & Aluminum Radiation Wall
  // =========================================================================
  {
    const g = new THREE.Group();

    // Vertical PPS plastic air-gap baffle wall along -X grip/battery corridor
    const ppsWall = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.5, 56.0, 1.6), 1.25, 0.08, 0.08, 12).rotateY(Math.PI / 2),
      mats.mountPpsInsulator
    );
    ppsWall.position.set(-47.6, -1.0, 0);
    // High-reflectivity aluminum radiation foil bonded on mainboard-facing (+X) side
    const alFoil = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 52.0, 9.6),
      mats.sinteredSilver
    );
    alFoil.position.set(-46.8, -1.0, 0);
    // Top & bottom air-gap standoff ribs sealing dead-air pocket
    for (const sy of [-25.5, 0, 23.5]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 9.8), mats.epdmGasket);
      rib.position.set(-48.8, sy, 0);
      g.add(rib);
    }
    g.add(ppsWall, alFoil);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-battery-thermal-baffle',
        50,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, -21.8),
        new THREE.Vector3(-48, 0, -18.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M51. Rear LCD-Bay Low-k Silicone Foam Thermal-Break Cushion
  // =========================================================================
  {
    const g = new THREE.Group();

    // Dual closed-cell thermal-break silicone foam cushions on rearmost face (-Z)
    const padUpper = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(58.0, 11.5, 2.0), 1.15, 0.14, 0.14, 14),
      mats.butylDamperRubber
    );
    padUpper.position.set(0, 16.5, 0);
    const padLower = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(58.0, 11.5, 2.0), 1.15, 0.14, 0.14, 14),
      mats.butylDamperRubber
    );
    padLower.position.set(0, -16.5, 0);
    const padCenter = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 16.0, 2.0), 0.95, 0.12, 0.12, 12),
      mats.lensFoamSeal
    );
    padCenter.position.set(-2.0, 0, 0.08);

    g.add(padUpper, padLower, padCenter);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-rear-lcd-thermal-cushion',
        51,
        '#475569',
        g,
        new THREE.Vector3(0, 0, -29.38),
        new THREE.Vector3(0, -18, -86.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // M52. IBIS Sensor Σ-Graphite to Mainboard Thermal Bridge Interface
  // =========================================================================
  {
    const g = new THREE.Group();

    // Flexible folded multi-ply pyrolytic graphite thermal link docking on +Z front face of M16
    const sigCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-18.0, 14.0, 1.2),
      new THREE.Vector3(-8.0, 16.5, 0.2),
      new THREE.Vector3(8.0, 16.5, 0.2),
      new THREE.Vector3(18.0, 14.0, 1.2),
    ]);
    const sigGeo = new THREE.TubeGeometry(sigCurve, 22, 3.2, 6, false);
    sigGeo.scale(1, 1, 0.14);
    const sigStrap = new THREE.Mesh(sigGeo, mats.pyroGraphite);

    // Compliant pink thermal coupling pad & stainless clamping bar
    const pad = new THREE.Mesh(new THREE.BoxGeometry(28.0, 7.2, 0.72), mats.thermalPadPink);
    pad.position.set(0, 15.8, -0.35);
    const clip = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(32.0, 3.8, 0.8), 0.45, 0.04, 0.04, 10),
      mats.stainlessMachined
    );
    clip.position.set(0, 15.8, 0.52);

    g.add(sigStrap, pad, clip);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-sigma-sensor-thermal-link',
        52,
        '#374151',
        g,
        new THREE.Vector3(0, 0, -14.65),
        new THREE.Vector3(-18, 28, 36.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M53. High-Current VRM Copper Busbar & Schottky Transient Protection Array
  // =========================================================================
  {
    const g = new THREE.Group();

    // Solid thick C1100 copper power highway from Battery header (-32,-26.5) -> PMIC (1,-21.5) -> VRM (17,-21)
    const mainBar = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(46.0, 2.8, 0.6), 0.68, 0.04, 0.04, 10),
      mats.copperHeatSpreader
    );
    mainBar.position.set(-6.0, -25.6, 0);
    const branchBar = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(2.8, 12.0, 0.5), 0.68, 0.04, 0.04, 8),
      mats.copperHeatSpreader
    );
    branchBar.position.set(5.0, -20.5, 0);
    // Tin-gold solderable feet + 3 Schottky surge protection diodes
    for (const sx of [-24.0, -10.0, 12.0]) {
      const diode = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.8, 0.75), mats.icEpoxy);
      diode.position.set(sx, -27.5, -0.1);
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.82, 0.78), mats.silverElectrode);
      band.position.set(sx + 0.85, -27.5, -0.1);
      band.userData.noEdges = true;
      g.add(diode, band);
    }

    g.add(mainBar, branchBar);

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-vrm-copper-busbar',
        53,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -20.58),
        new THREE.Vector3(-6, -34, -18.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M54. Perimeter CuBe2 ESD Discharge & Multi-Point Chassis Grounding Spring Clips
  // =========================================================================
  {
    const g = new THREE.Group();

    // 8 gold-plated CuBe2 cantilever ground leaf clips arrayed along PCB perimeter
    const clipCoords: Array<[number, number, number]> = [
      [-35.0, 30.2, 0],
      [-15.0, 30.2, 0],
      [15.0, 30.2, 0],
      [35.0, 30.2, 0],
      [-35.0, -30.2, Math.PI],
      [-10.0, -30.2, Math.PI],
      [15.0, -30.2, Math.PI],
      [35.0, -30.2, Math.PI],
    ];
    for (const [cx, cy, rz] of clipCoords) {
      const clipGrp = new THREE.Group();
      clipGrp.position.set(cx, cy, 0);
      clipGrp.rotation.z = rz;

      const base = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.6, 0.35), mats.goldPlating);
      const springArm = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.4, 0.25), mats.beCuSpring);
      springArm.position.set(0, 0.25, -0.82);
      springArm.rotation.x = 0.36;
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), mats.goldPlating);
      tip.position.set(0, 0.65, -1.35);
      tip.userData.noEdges = true;
      clipGrp.add(base, springArm, tip);
      g.add(clipGrp);
    }

    parts.push(
      finalizeStandaloneMainboardMicroPart(
        'mb-esd-gnd-spring-clips',
        54,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, -19.85),
        new THREE.Vector3(28, -28, 16.0),
        cp,
        0.26
      )
    );
  }

  return parts;
}
