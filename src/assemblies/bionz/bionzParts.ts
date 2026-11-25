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
  applyPlanarUVs,
  buildChipPackage,
  buildGoldWirebondLoop,
  buildShieldedInductor,
  buildSmdPassive,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeBionzPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.22
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);

  return {
    id,
    subsystem: 'bionz',
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

/**
 * Build all 46 ultra-high-definition 3D CAD sub-assemblies of the Sony BIONZ XR / BIONZ XR2
 * Semiconductor Package & Mainboard Interface Ultra-Dissection (XR01–XR46).
 *
 * Magnified 2:1 CAD scale (16x16 mm real flagship PoP FC-BGA package -> 32x32 CAD units), centered at (0, 0, 0).
 * Preserves exact core part IDs, order, and physics overlay alignment while elevating every layer
 * with authentic Sony CXD90066GG / Micron D8DNH PoP laser markings, photolithographic silicon die
 * micro-architecture, ball-to-stitch gold wirebonds, AT&S ABF SAP copper routing, SAC305 BGA spheres,
 * plus full real-world mainboard PDN/TCXO/NOR/SLVS-EC/HDMI/Edge-Bond/JTAG peripheral hardware.
 * Strictly visible ONLY in standalone 'bionz' mode.
 */
export function buildBionzParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;
  const PKG_W = 32.0;
  const DIE_W = 20.8;

  // =========================================================================
  // XR01. Conformal Sputtered EMI Shield & Laser-Marked Top Lid (y = +9.8)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Chamfered outer nickel-silver EMI shield frame rim
    const lidFrame = makeHiResHorizPlate(
      createFrameShape(PKG_W + 0.5, PKG_W + 0.5, 2.0, PKG_W - 2.4, PKG_W - 2.4, 1.1),
      0.72,
      mats.emiShieldCan,
      0.14,
      2,
      24
    );
    g.add(lidFrame);

    // Laser-marked brushed sputtered top lid deck (SONY BIONZ XR / XR2 / CXD90066GG / DataMatrix)
    const topPlateGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 1.8, PKG_W - 1.8, 1.0), 0.36, 0.06, 0.06, 2, 22);
    topPlateGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(topPlateGeo, PKG_W - 1.8, PKG_W - 1.8, 'xz');
    const topCap = new THREE.Mesh(topPlateGeo, u.bionzEmiLid);
    topCap.position.y = 0.22;
    g.add(topCap);

    // Recessed gold Pin-1 triangular alignment chamfer inlay at (-X, -Z) corner
    const triShape = new THREE.Shape();
    triShape.moveTo(0, 0);
    triShape.lineTo(2.4, 0);
    triShape.lineTo(0, 2.4);
    triShape.closePath();
    const pin1Geo = extrudeHiRes(triShape, 0.12, 0.02, 0.02, 1, 6);
    pin1Geo.rotateX(-Math.PI / 2);
    const pin1 = new THREE.Mesh(pin1Geo, mats.goldPlating);
    pin1.position.set(-PKG_W * 0.42, 0.42, -PKG_W * 0.42);
    pin1.userData.noEdges = true;
    g.add(pin1);

    // 4 machined gold optical cross-fiducials & corner copper EMI grounding clip shoes
    for (const [fx, fz] of [
      [-13.8, 13.8],
      [13.8, -13.8],
      [13.8, 13.8],
    ]) {
      const fH = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.06, 0.18), mats.goldPlating);
      fH.position.set(fx, 0.44, fz);
      fH.userData.noEdges = true;
      const fV = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 1.15), mats.goldPlating);
      fV.position.set(fx, 0.44, fz);
      fV.userData.noEdges = true;
      g.add(fH, fV);
    }
    for (const [cx, cz] of [
      [-15.6, -15.6],
      [15.6, -15.6],
      [-15.6, 15.6],
      [15.6, 15.6],
    ]) {
      const cornerClip = new THREE.Mesh(
        createChamferedBoxGeo(1.85, 2.35, 1.85, 0.42, 0.08, 'y'),
        mats.copperHeatSpreader
      );
      cornerClip.position.set(cx, -1.15, cz);
      cornerClip.userData.noEdges = true;
      g.add(cornerClip);
    }

    // Precision bent EMI grounding skirt walls with slotted spring-finger grounding tabs on all 4 edges
    for (const [sx, sz, rotY] of [
      [0, PKG_W * 0.5 + 0.16, 0],
      [0, -PKG_W * 0.5 - 0.16, 0],
      [PKG_W * 0.5 + 0.16, 0, Math.PI / 2],
      [-PKG_W * 0.5 - 0.16, 0, Math.PI / 2],
    ] as Array<[number, number, number]>) {
      const skirtBar = new THREE.Mesh(
        createChamferedBoxGeo(PKG_W - 4.2, 1.05, 0.28, 0.08, 0.05, 'y'),
        mats.emiShieldCan
      );
      skirtBar.position.set(sx, -0.68, sz);
      skirtBar.rotation.y = rotY;
      g.add(skirtBar);

      // 6 discrete stamped EMI grounding spring fingers per side
      for (let i = -2.5; i <= 2.5; i += 1.0) {
        const finger = new THREE.Mesh(
          createChamferedBoxGeo(2.8, 1.35, 0.22, 0.06, 0.04, 'y'),
          mats.stainlessMachined
        );
        const along = i * 4.4;
        if (rotY === 0) {
          finger.position.set(along, -1.65, sz);
        } else {
          finger.position.set(sx, -1.65, along);
          finger.rotation.y = rotY;
        }
        finger.userData.noEdges = true;
        g.add(finger);
      }
    }

    parts.push(
      finalizeBionzPart(
        'xr-emi-conformal-shield',
        1,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 9.8, 0),
        new THREE.Vector3(0, 56.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR02. Nickel-Plated Oxygen-Free Copper IHS Heat Spreader (y = +8.6)
  // =========================================================================
  {
    const g = new THREE.Group();

    // CNC-beveled nickel-plated OFHC copper top deck
    const ihsTopGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 0.9, PKG_W - 0.9, 1.8), 1.05, 0.24, 0.22, 3, 24);
    ihsTopGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(ihsTopGeo, PKG_W - 0.9, PKG_W - 0.9, 'xz');
    const ihsTop = new THREE.Mesh(ihsTopGeo, u.cfeCopperThermal);
    g.add(ihsTop);

    // Nickel-plated satin outer bezel ring & thermal adhesive seating flange
    const flange = makeHiResHorizPlate(
      createFrameShape(PKG_W - 0.6, PKG_W - 0.6, 1.8, PKG_W - 4.2, PKG_W - 4.2, 1.1),
      1.55,
      mats.stainlessMachined,
      0.12,
      2,
      22
    );
    flange.position.y = -1.12;
    g.add(flange);

    // Stepped precision-lapped OFHC copper thermal contact pedestal pressing down onto TIM1
    const pedestal = makeHiResHorizPlate(
      createRoundedRectShape(DIE_W + 2.2, DIE_W + 2.2, 1.0),
      0.72,
      mats.vaporChamberCopper,
      0.14,
      2,
      20
    );
    pedestal.position.y = -0.82;
    g.add(pedestal);

    // 4 machined corner stress-relief breather vents in IHS skirt
    for (const [cx, cz] of [
      [-13.8, -13.8],
      [13.8, -13.8],
      [-13.8, 13.8],
      [13.8, 13.8],
    ]) {
      const relief = new THREE.Mesh(hiResCyl(0.75, 0.75, 1.62, 14), mats.matteBlackAnodized);
      relief.position.set(cx, -1.12, cz);
      relief.userData.noEdges = true;
      g.add(relief);
    }

    parts.push(
      finalizeBionzPart(
        'xr-nickel-cu-ihs',
        2,
        '#d97d4e',
        g,
        new THREE.Vector3(0, 8.6, 0),
        new THREE.Vector3(0, 48.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR03. Die-to-IHS Thermal Interface Material 1 (Indium STIM) (y = +7.3)
  // =========================================================================
  {
    const g = new THREE.Group();
    const timSheet = makeHiResHorizPlate(
      createRoundedRectShape(DIE_W + 1.4, DIE_W + 1.4, 0.8),
      0.38,
      mats.sinteredSilver,
      0.08,
      2,
      20
    );
    g.add(timSheet);

    // Reflowed Indium-gold thermal contact micro-grid array & compliant thermal elastomer core
    const innerPad = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 1.4, 0.46, DIE_W - 1.4, 0.5, 0.06, 'y'),
      mats.thermalPadPink
    );
    innerPad.position.y = 0.03;
    g.add(innerPad);

    // 4x4 micro-reflow indium solder thermal islands catching metallic highlights
    const cellGeo = createChamferedBoxGeo(3.6, 0.08, 3.6, 0.25, 0.02, 'y');
    for (let ix = -1.5; ix <= 1.5; ix += 1.0) {
      for (let iz = -1.5; iz <= 1.5; iz += 1.0) {
        const island = new THREE.Mesh(cellGeo, mats.sinteredSilver);
        island.position.set(ix * 4.5, 0.27, iz * 4.5);
        island.userData.noEdges = true;
        g.add(island);
      }
    }

    parts.push(
      finalizeBionzPart(
        'xr-tim1-indium-bond',
        3,
        '#f472b6',
        g,
        new THREE.Vector3(0, 7.3, 0),
        new THREE.Vector3(0, 41.5, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR04. Top PoP LPDDR5X DRAM & NAND MCP Molded Encapsulant (y = +6.1)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Matte silica-filled EMC outer mold wall with cutaway inspection window bevel
    const moldCap = makeHiResHorizPlate(
      createFrameShape(PKG_W - 2.2, PKG_W - 2.2, 1.5, 20.4, 20.4, 0.9),
      1.68,
      u.icEpoxyLaser,
      0.16,
      2,
      22
    );
    g.add(moldCap);

    // Authentic Micron D8DNH PoP LPDDR5X laser-marked top cover panel (cut away on front-right quadrant to peek inside!)
    const coverShape = createRoundedRectShape(PKG_W - 2.6, PKG_W - 2.6, 1.3);
    const windowHole = new THREE.Path();
    windowHole.moveTo(0.8, -9.8);
    windowHole.lineTo(9.8, -9.8);
    windowHole.lineTo(9.8, -0.8);
    windowHole.lineTo(0.8, -0.8);
    windowHole.closePath();
    coverShape.holes.push(windowHole);
    const coverGeo = extrudeHiRes(coverShape, 0.28, 0.05, 0.05, 1, 20);
    coverGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(coverGeo, PKG_W - 2.6, PKG_W - 2.6, 'xz');
    const laserTop = new THREE.Mesh(coverGeo, u.bionzPopDramTop);
    laserTop.position.y = 0.72;
    g.add(laserTop);

    // Crystal clear cutaway glass pane over the exposed inspection quadrant
    const glassPane = new THREE.Mesh(
      markHiRes(new THREE.BoxGeometry(9.0, 0.14, 9.0)),
      mats.opticalCementClear
    );
    glassPane.position.set(5.3, 0.74, 5.3);
    glassPane.userData.noEdges = true;
    g.add(glassPane);

    parts.push(
      finalizeBionzPart(
        'xr-pop-lpddr5x-package',
        4,
        '#334155',
        g,
        new THREE.Vector3(0, 6.1, 0),
        new THREE.Vector3(0, 35.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR05. Quad-Die Stacked LPDDR5X-8533 Frame-Buffer DRAM Silicon Stack (y = +5.9)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 stepped ultra-thin chamfered DRAM silicon dies with lithographic banks, gold bond pads & amber DAF adhesive
    for (let i = 0; i < 4; i++) {
      const w = 18.8 - i * 1.15;
      const d = 17.6 - i * 0.95;
      const offsetX = i * 0.34 - 0.5;
      const dieY = -0.52 + i * 0.36;

      const dieGeo = createChamferedBoxGeo(w, 0.24, d, 0.22, 0.03, 'y');
      const die = new THREE.Mesh(dieGeo, i % 2 === 0 ? mats.siliconTsvDram : u.bionzIpDieTile);
      die.position.set(offsetX, dieY, 0);
      g.add(die);

      // Gold wirebond pad rows along left & right staggered terraces of every DRAM die
      for (const side of [-1, 1]) {
        for (let k = -5; k <= 5; k++) {
          const pad = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.05, 0.42), mats.goldPlating);
          pad.position.set(offsetX + side * (w * 0.5 - 0.45), dieY + 0.13, k * 1.32);
          pad.userData.noEdges = true;
          g.add(pad);
        }
      }

      // Translucent golden-amber Die Attach Film (DAF) adhesive layer between stacked dies
      if (i > 0) {
        const daf = new THREE.Mesh(
          new THREE.BoxGeometry(w + 0.18, 0.08, d + 0.18),
          mats.mylarInsulatorFilm
        );
        daf.position.set(offsetX, dieY - 0.16, 0);
        daf.userData.noEdges = true;
        g.add(daf);
      }
    }

    parts.push(
      finalizeBionzPart(
        'xr-pop-dram-dies',
        5,
        '#2563eb',
        g,
        new THREE.Vector3(0, 5.9, 0),
        new THREE.Vector3(0, 29.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR06. Cascaded Gold Wire-Bond Array & Top PoP Interposer Substrate (y = +4.8)
  // =========================================================================
  {
    const g = new THREE.Group();
    const interposerGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 2.4, PKG_W - 2.4, 1.3), 0.52, 0.08, 0.08, 2, 22);
    interposerGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(interposerGeo, PKG_W - 2.4, PKG_W - 2.4, 'xz');
    const interposer = new THREE.Mesh(interposerGeo, u.bionzAbfSubstrate);
    g.add(interposer);

    // ENIG gold bond fingers & 28 ball-to-stitch cascaded gold wirebond arches linking the 4 DRAM dies!
    for (const side of [-1, 1]) {
      for (let i = -6; i <= 6; i++) {
        const z = i * 1.24;
        const tier = Math.abs(i) % 4;
        const startX = side * (7.0 + (3 - tier) * 0.56);
        const endX = side * 12.1;
        const startY = 0.58 + tier * 0.34;

        // Gold substrate bond finger
        const finger = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.08, 0.36), mats.goldPlating);
        finger.position.set(endX, 0.29, z);
        finger.userData.noEdges = true;
        g.add(finger);

        // True ball-to-stitch curved gold wirebond loop
        g.add(
          buildGoldWirebondLoop(
            new THREE.Vector3(startX, startY, z),
            new THREE.Vector3(endX, 0.32, z),
            0.85 + tier * 0.14,
            0.085,
            mats.goldPlating
          )
        );
      }
    }

    parts.push(
      finalizeBionzPart(
        'xr-pop-wirebond-interposer',
        6,
        '#eab308',
        g,
        new THREE.Vector3(0, 4.8, 0),
        new THREE.Vector3(0, 23.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR07. PoP Inter-Package Solder Balls & TMV / TIV Vertical Copper Pillars (y = +3.3)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ballGeo = hiResSphere(0.46, 12, 8);
    const padGeo = hiResCyl(0.42, 0.42, 0.12, 12);
    const pillarGeo = hiResCyl(0.28, 0.28, 2.25, 12);

    const coords: Array<[number, number]> = [];
    for (const ring of [12.4, 14.0]) {
      for (let t = -12; t <= 12; t += 2.0) {
        coords.push([t, ring], [t, -ring]);
        if (Math.abs(t) < ring - 0.5) {
          coords.push([ring, t], [-ring, t]);
        }
      }
    }

    const balls = new THREE.InstancedMesh(ballGeo, mats.solderBallSilver, coords.length);
    const ubmPads = new THREE.InstancedMesh(padGeo, mats.goldPlating, coords.length);
    const pillars = new THREE.InstancedMesh(pillarGeo, mats.copperHybridBond, coords.length);
    const dummy = new THREE.Object3D();
    coords.forEach(([x, z], idx) => {
      dummy.position.set(x, 0.92, z);
      dummy.updateMatrix();
      balls.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(x, 0.52, z);
      dummy.updateMatrix();
      ubmPads.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(x, -0.58, z);
      dummy.updateMatrix();
      pillars.setMatrixAt(idx, dummy.matrix);
    });
    balls.instanceMatrix.needsUpdate = true;
    ubmPads.instanceMatrix.needsUpdate = true;
    pillars.instanceMatrix.needsUpdate = true;
    g.add(balls, ubmPads, pillars);

    parts.push(
      finalizeBionzPart(
        'xr-tmv-pop-balls',
        7,
        '#d97736',
        g,
        new THREE.Vector3(0, 3.3, 0),
        new THREE.Vector3(0, 17.5, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // XR08. Low-Warpage Silica EMC Mold Frame & Stainless Anti-Warpage Stiffener (y = +1.7)
  // =========================================================================
  {
    const g = new THREE.Group();
    const emcFrame = makeHiResHorizPlate(
      createFrameShape(PKG_W - 0.4, PKG_W - 0.4, 1.6, DIE_W + 2.4, DIE_W + 2.4, 0.9),
      2.35,
      u.icEpoxyLaser,
      0.16,
      2,
      24
    );
    const stiffener = makeHiResHorizPlate(
      createFrameShape(PKG_W - 0.1, PKG_W - 0.1, 1.7, PKG_W - 3.6, PKG_W - 3.6, 1.0),
      0.56,
      mats.stainlessMachined,
      0.08,
      2,
      22
    );
    stiffener.position.y = 1.38;

    // 4 machined corner alignment datum notches on stiffener
    for (const [cx, cz] of [
      [-14.2, -14.2],
      [14.2, -14.2],
      [-14.2, 14.2],
      [14.2, 14.2],
    ]) {
      const datum = new THREE.Mesh(hiResCyl(0.55, 0.55, 0.64, 12), mats.goldPlating);
      datum.position.set(cx, 1.4, cz);
      datum.userData.noEdges = true;
      g.add(datum);
    }
    g.add(emcFrame, stiffener);

    parts.push(
      finalizeBionzPart(
        'xr-emc-mold-frame',
        8,
        '#475569',
        g,
        new THREE.Vector3(0, 1.7, 0),
        new THREE.Vector3(0, 12.2, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR09. Back-Grinded Silicon Bulk Substrate & Perimeter Crack-Stop Seal Ring (y = +1.65)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bulkGeo = extrudeHiRes(createRoundedRectShape(DIE_W, DIE_W, 0.48), 0.72, 0.08, 0.08, 2, 18);
    bulkGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(bulkGeo, DIE_W, DIE_W, 'xz');
    const bulkSi = new THREE.Mesh(bulkGeo, u.bionzDieFloorplan);

    // Dual copper/tungsten perimeter crack-stop & moisture-guard seal rings
    const sealOuter = makeHiResHorizPlate(
      createFrameShape(DIE_W + 0.35, DIE_W + 0.35, 0.58, DIE_W - 0.38, DIE_W - 0.38, 0.36),
      0.86,
      mats.copperHybridBond,
      0.04,
      2,
      18
    );
    const sealInner = makeHiResHorizPlate(
      createFrameShape(DIE_W - 0.65, DIE_W - 0.65, 0.42, DIE_W - 1.05, DIE_W - 1.05, 0.32),
      0.82,
      mats.goldPlating,
      0.03,
      1,
      16
    );
    // Raised gold Network-on-Chip (NoC) cross-die coherent interconnect highways between the 4x4 IP macros!
    for (const lane of [-4.6, 0, 4.6]) {
      const busX = new THREE.Mesh(new THREE.BoxGeometry(DIE_W - 2.0, 0.08, 0.24), mats.goldPlating);
      busX.position.set(0, 0.41, lane);
      busX.userData.noEdges = true;
      const busZ = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, DIE_W - 2.0), mats.goldPlating);
      busZ.position.set(lane, 0.41, 0);
      busZ.userData.noEdges = true;
      g.add(busX, busZ);
    }
    g.add(bulkSi, sealOuter, sealInner);

    parts.push(
      finalizeBionzPart(
        'xr-die-bulk-silicon',
        9,
        '#3b638f',
        g,
        new THREE.Vector3(0, 1.65, 0),
        new THREE.Vector3(0, 7.6, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR10–XR25. 16 INTERNAL SILICON DIE FUNCTIONAL IP BLOCKS (4x4 Floorplan at y = +1.1)
  // Each block is a chamfered photolithographic silicon sub-die framed by a gold guard ring
  // and crowned with bespoke micro-circuit architecture!
  // =========================================================================
  interface IpBlockDef {
    id: string;
    order: number;
    swatch: string;
    x: number;
    z: number;
    w: number;
    d: number;
    h: number;
    baseMat: THREE.Material;
    accentMat: THREE.Material;
    secondaryMat: THREE.Material;
    exY: number;
    detailKind: 'serdes' | 'bayer' | 'wavelet' | 'lut3d' | 'systolic' | 'arm' | 'af' | 'codec' | 'audio' | 'sram' | 'ddr' | 'vault' | 'pcie' | 'hdmi' | 'rf' | 'pll';
  }

  const ipBlocks: IpBlockDef[] = [
    // Row 0: Sensor Ingress & RAW ISP Pipeline
    {
      id: 'xr-slvsec-rx-phy',
      order: 10,
      swatch: '#06b6d4',
      x: -6.9,
      z: -6.9,
      w: 4.25,
      d: 4.25,
      h: 0.72,
      baseMat: u.bionzIpDieTile,
      accentMat: mats.goldPlating,
      secondaryMat: mats.copperHybridBond,
      exY: 4.2,
      detailKind: 'serdes',
    },
    {
      id: 'xr-raw-isp-frontend',
      order: 11,
      swatch: '#0ea5e9',
      x: -2.3,
      z: -6.9,
      w: 4.25,
      d: 4.25,
      h: 0.78,
      baseMat: mats.ispSiliconDie,
      accentMat: mats.cfaGreen,
      secondaryMat: mats.cfaBlue,
      exY: 4.6,
      detailKind: 'bayer',
    },
    {
      id: 'xr-nr-detail-engine',
      order: 12,
      swatch: '#14b8a6',
      x: 2.3,
      z: -6.9,
      w: 4.25,
      d: 4.25,
      h: 0.78,
      baseMat: mats.siliconSensorDie,
      accentMat: mats.copperHybridBond,
      secondaryMat: mats.goldPlating,
      exY: 4.6,
      detailKind: 'wavelet',
    },
    {
      id: 'xr-color-3dlut-engine',
      order: 13,
      swatch: '#f59e0b',
      x: 6.9,
      z: -6.9,
      w: 4.25,
      d: 4.25,
      h: 0.78,
      baseMat: u.bionzIpDieTile,
      accentMat: mats.cinnabarAnodized,
      secondaryMat: mats.cfaBlue,
      exY: 4.2,
      detailKind: 'lut3d',
    },
    // Row 1: Core Compute (AI NPU, Quad ARM CPU, SA-DSP AF, Video Codec)
    {
      id: 'xr-ai-npu-systolic',
      order: 14,
      swatch: '#8b5cf6',
      x: -6.9,
      z: -2.3,
      w: 4.25,
      d: 4.25,
      h: 0.88,
      baseMat: mats.npuSiliconDie,
      accentMat: mats.goldPlating,
      secondaryMat: mats.makeupSealViolet,
      exY: 5.8,
      detailKind: 'systolic',
    },
    {
      id: 'xr-arm-cpu-cluster',
      order: 15,
      swatch: '#2563eb',
      x: -2.3,
      z: -2.3,
      w: 4.25,
      d: 4.25,
      h: 0.86,
      baseMat: mats.siliconLogicLayer,
      accentMat: mats.goldPlating,
      secondaryMat: mats.copperHybridBond,
      exY: 6.2,
      detailKind: 'arm',
    },
    {
      id: 'xr-sa-dsp-af-core',
      order: 16,
      swatch: '#0d9488',
      x: 2.3,
      z: -2.3,
      w: 4.25,
      d: 4.25,
      h: 0.84,
      baseMat: mats.siliconSensorDie,
      accentMat: mats.goldPlating,
      secondaryMat: mats.siliconLogicLayer,
      exY: 6.2,
      detailKind: 'af',
    },
    {
      id: 'xr-video-codec-hevc',
      order: 17,
      swatch: '#e11d48',
      x: 6.9,
      z: -2.3,
      w: 4.25,
      d: 4.25,
      h: 0.86,
      baseMat: u.bionzIpDieTile,
      accentMat: mats.gMasterRedBadge,
      secondaryMat: mats.goldPlating,
      exY: 5.8,
      detailKind: 'codec',
    },
    // Row 2: Audio DSP, Shared SRAM, LPDDR5X Controller, C2PA Security Enclave
    {
      id: 'xr-audio-dsp-noisecut',
      order: 18,
      swatch: '#10b981',
      x: -6.9,
      z: 2.3,
      w: 4.25,
      d: 4.25,
      h: 0.76,
      baseMat: u.bionzIpDieTile,
      accentMat: mats.goldPlating,
      secondaryMat: mats.copperHybridBond,
      exY: 5.2,
      detailKind: 'audio',
    },
    {
      id: 'xr-sram-linebuffer',
      order: 19,
      swatch: '#38bdf8',
      x: -2.3,
      z: 2.3,
      w: 4.25,
      d: 4.25,
      h: 0.80,
      baseMat: mats.siliconTsvDram,
      accentMat: mats.goldPlating,
      secondaryMat: mats.dramCellArray,
      exY: 5.6,
      detailKind: 'sram',
    },
    {
      id: 'xr-ddr-mem-controller',
      order: 20,
      swatch: '#1d4ed8',
      x: 2.3,
      z: 2.3,
      w: 4.25,
      d: 4.25,
      h: 0.80,
      baseMat: mats.siliconLogicLayer,
      accentMat: mats.mountShimBlue,
      secondaryMat: mats.goldPlating,
      exY: 5.6,
      detailKind: 'ddr',
    },
    {
      id: 'xr-c2pa-crypto-enclave',
      order: 21,
      swatch: '#d97706',
      x: 6.9,
      z: 2.3,
      w: 4.25,
      d: 4.25,
      h: 0.82,
      baseMat: mats.dramCellArray,
      accentMat: mats.goldPlating,
      secondaryMat: mats.matteBlackAnodized,
      exY: 5.2,
      detailKind: 'vault',
    },
    // Row 3: Storage DMA, Display/HDMI, USB/Wi-Fi 6E, Clock PLL/DVFS
    {
      id: 'xr-pcie-cfx-dma',
      order: 22,
      swatch: '#ea580c',
      x: -6.9,
      z: 6.9,
      w: 4.25,
      d: 4.25,
      h: 0.74,
      baseMat: u.bionzIpDieTile,
      accentMat: mats.copperHybridBond,
      secondaryMat: mats.goldPlating,
      exY: 3.8,
      detailKind: 'pcie',
    },
    {
      id: 'xr-display-evf-hdmi-tx',
      order: 23,
      swatch: '#0284c7',
      x: -2.3,
      z: 6.9,
      w: 4.25,
      d: 4.25,
      h: 0.76,
      baseMat: mats.ispSiliconDie,
      accentMat: mats.mountShimBlue,
      secondaryMat: mats.goldPlating,
      exY: 4.2,
      detailKind: 'hdmi',
    },
    {
      id: 'xr-usb-network-hub',
      order: 24,
      swatch: '#6366f1',
      x: 2.3,
      z: 6.9,
      w: 4.25,
      d: 4.25,
      h: 0.74,
      baseMat: mats.varistorRingBlue,
      accentMat: mats.rfGoldCoax,
      secondaryMat: mats.copperHybridBond,
      exY: 4.2,
      detailKind: 'rf',
    },
    {
      id: 'xr-pll-clock-dvfs-ring',
      order: 25,
      swatch: '#ec4899',
      x: 6.9,
      z: 6.9,
      w: 4.25,
      d: 4.25,
      h: 0.74,
      baseMat: mats.siliconDramLayer,
      accentMat: mats.copperHybridBond,
      secondaryMat: mats.goldPlating,
      exY: 3.8,
      detailKind: 'pll',
    },
  ];

  for (const blk of ipBlocks) {
    const g = new THREE.Group();

    // Chamfered photolithographic silicon sub-die slab
    const baseGeo = createChamferedBoxGeo(blk.w, blk.h, blk.d, 0.22, 0.06, 'y');
    const base = new THREE.Mesh(baseGeo, blk.baseMat);
    g.add(base);

    // Golden power-delivery guard ring perimeter around every IP macro
    const guardRim = makeHiResHorizPlate(
      createFrameShape(blk.w - 0.14, blk.d - 0.14, 0.18, blk.w - 0.44, blk.d - 0.44, 0.12),
      0.08,
      mats.goldPlating,
      0.01,
      1,
      10
    );
    guardRim.position.y = blk.h * 0.5 + 0.03;
    guardRim.userData.noEdges = true;
    g.add(guardRim);

    const topY = blk.h * 0.5 + 0.09;

    if (blk.detailKind === 'serdes' || blk.detailKind === 'pcie' || blk.detailKind === 'hdmi') {
      // 8 high-speed differential SerDes copper/gold transmission lane pairs + end ESD coils
      for (let i = -1.4; i <= 1.41; i += 0.4) {
        const lane = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.12, blk.d - 0.9),
          Math.round((i + 1.4) * 5) % 2 === 0 ? blk.accentMat : blk.secondaryMat
        );
        lane.position.set(i, topY, 0);
        lane.userData.noEdges = true;
        g.add(lane);
      }
      const busBar = new THREE.Mesh(new THREE.BoxGeometry(blk.w - 0.7, 0.18, 0.42), mats.goldPlating);
      busBar.position.set(0, topY + 0.05, blk.detailKind === 'serdes' ? -1.4 : 1.4);
      busBar.userData.noEdges = true;
      g.add(busBar);
    } else if (blk.detailKind === 'bayer') {
      // 4x4 RGBG Bayer demosaic matrix + readout line buffer
      const cMats = [mats.cfaRed, mats.cfaGreen, mats.cfaGreen, mats.cfaBlue];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const m = cMats[(r % 2) * 2 + (c % 2)];
          const tile = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 0.68), m);
          tile.position.set(-1.17 + c * 0.78, topY + 0.02, -1.17 + r * 0.78);
          tile.userData.noEdges = true;
          g.add(tile);
        }
      }
    } else if (blk.detailKind === 'wavelet' || blk.detailKind === 'codec' || blk.detailKind === 'audio') {
      // Stepped multi-scale pipeline filter bank bars + cross bus
      for (let i = 0; i < 5; i++) {
        const barH = 0.12 + (i % 3) * 0.07;
        const bar = new THREE.Mesh(
          new THREE.BoxGeometry(blk.w - 0.85, barH, 0.36),
          i % 2 === 0 ? blk.accentMat : blk.secondaryMat
        );
        bar.position.set(0, topY + barH * 0.4, -1.36 + i * 0.68);
        bar.userData.noEdges = true;
        g.add(bar);
      }
    } else if (blk.detailKind === 'lut3d') {
      // 3x3 chromatic 3D-LUT tetrahedral lookup lattice
      const lutMats = [mats.cinnabarAnodized, mats.goldPlating, mats.mountShimBlue];
      for (let ix = -1; ix <= 1; ix++) {
        for (let iz = -1; iz <= 1; iz++) {
          const h = 0.16 + ((ix + iz + 2) % 3) * 0.10;
          const vox = new THREE.Mesh(new THREE.BoxGeometry(0.84, h, 0.84), lutMats[(ix + iz + 4) % 3]);
          vox.position.set(ix * 1.05, topY + h * 0.45, iz * 1.05);
          vox.userData.noEdges = true;
          g.add(vox);
        }
      }
    } else if (blk.detailKind === 'systolic') {
      // 5x5 dense AI NPU Tensor Systolic MAC array + weight SRAM spine
      for (let ix = -2; ix <= 2; ix++) {
        for (let iz = -2; iz <= 2; iz++) {
          const mac = new THREE.Mesh(
            new THREE.BoxGeometry(0.46, 0.16, 0.46),
            (ix + iz) % 2 === 0 ? mats.goldPlating : mats.makeupSealViolet
          );
          mac.position.set(ix * 0.62, topY + 0.03, iz * 0.62);
          mac.userData.noEdges = true;
          g.add(mac);
        }
      }
    } else if (blk.detailKind === 'arm' || blk.detailKind === 'af') {
      // 4 sculpted multi-tier processor cores + central gold L2 cache coherency crossbar
      for (const [cx, cz] of [
        [-0.95, -0.95],
        [0.95, -0.95],
        [-0.95, 0.95],
        [0.95, 0.95],
      ]) {
        const core = new THREE.Mesh(createChamferedBoxGeo(1.42, 0.20, 1.42, 0.12, 0.04, 'y'), blk.secondaryMat);
        core.position.set(cx, topY + 0.04, cz);
        core.userData.noEdges = true;
        const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.08, 0.82), blk.accentMat);
        l1.position.set(cx, topY + 0.16, cz);
        l1.userData.noEdges = true;
        g.add(core, l1);
      }
      const xbar1 = new THREE.Mesh(new THREE.BoxGeometry(blk.w - 0.8, 0.10, 0.24), mats.goldPlating);
      xbar1.position.y = topY + 0.06;
      const xbar2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.10, blk.d - 0.8), mats.goldPlating);
      xbar2.position.y = topY + 0.06;
      xbar1.userData.noEdges = true;
      xbar2.userData.noEdges = true;
      g.add(xbar1, xbar2);
    } else if (blk.detailKind === 'sram' || blk.detailKind === 'ddr') {
      // 8-bank high-density SRAM/PHY macro tiles flanking central decoder spine
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, blk.d - 0.7), mats.goldPlating);
      spine.position.y = topY + 0.04;
      spine.userData.noEdges = true;
      g.add(spine);
      for (const sx of [-1.05, 1.05]) {
        for (let iz = -1.2; iz <= 1.21; iz += 0.8) {
          const bank = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.14, 0.58), blk.accentMat);
          bank.position.set(sx, topY + 0.02, iz);
          bank.userData.noEdges = true;
          g.add(bank);
        }
      }
    } else if (blk.detailKind === 'vault') {
      // Octagonal hardware C2PA tamper-mesh security vault + gold active-shield key core
      const vaultHex = new THREE.Mesh(hiResCyl(1.48, 1.56, 0.22, 8), mats.matteBlackAnodized);
      vaultHex.position.y = topY + 0.05;
      const ring = new THREE.Mesh(hiResTorus(1.12, 0.12, 8, 24), mats.goldPlating);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = topY + 0.16;
      const keyDie = new THREE.Mesh(createChamferedBoxGeo(0.95, 0.26, 0.95, 0.1, 0.04, 'y'), mats.goldPlating);
      keyDie.position.y = topY + 0.12;
      vaultHex.userData.noEdges = true;
      ring.userData.noEdges = true;
      keyDie.userData.noEdges = true;
      g.add(vaultHex, ring, keyDie);
    } else if (blk.detailKind === 'rf') {
      // Twin on-die spiral copper RF inductors + gold baseband shield
      for (const sx of [-0.95, 0.95]) {
        for (const r of [0.32, 0.62]) {
          const coil = new THREE.Mesh(hiResTorus(r, 0.08, 8, 20), mats.rfGoldCoax);
          coil.rotation.x = Math.PI / 2;
          coil.position.set(sx, topY + 0.06, -0.55);
          coil.userData.noEdges = true;
          g.add(coil);
        }
      }
      const mac = new THREE.Mesh(createChamferedBoxGeo(3.1, 0.18, 1.2, 0.1, 0.04, 'y'), mats.copperHybridBond);
      mac.position.set(0, topY + 0.04, 1.0);
      mac.userData.noEdges = true;
      g.add(mac);
    } else {
      // PLL Clock & DVFS: concentric spiral LC-tank VCO copper inductor + center phase detector
      for (const r of [0.65, 1.05, 1.45]) {
        const coil = new THREE.Mesh(hiResTorus(r, 0.10, 8, 28), mats.copperHybridBond);
        coil.rotation.x = Math.PI / 2;
        coil.position.y = topY + 0.06;
        coil.userData.noEdges = true;
        g.add(coil);
      }
      const vco = new THREE.Mesh(hiResCyl(0.42, 0.42, 0.24, 16), mats.goldPlating);
      vco.position.y = topY + 0.08;
      vco.userData.noEdges = true;
      g.add(vco);
    }

    parts.push(
      finalizeBionzPart(
        blk.id,
        blk.order,
        blk.swatch,
        g,
        new THREE.Vector3(blk.x, 1.1, blk.z),
        new THREE.Vector3(blk.x * 1.48, blk.exY, blk.z * 1.48),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR26. FEOL FinFET / GAA Nanosheet Transistor Layer (y = +0.35)
  // =========================================================================
  {
    const g = new THREE.Group();
    const feolBase = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 0.6, 0.30, DIE_W - 0.6, 0.3, 0.04, 'y'),
      mats.siliconTransistorLayer
    );
    g.add(feolBase);

    // FinFET/GAA silicon nanosheet channels + High-k Metal Gate bridges + cobalt source/drain trenches
    const finGeo = new THREE.BoxGeometry(DIE_W - 2.0, 0.24, 0.28);
    for (let z = -8.4; z <= 8.41; z += 1.4) {
      const fin = new THREE.Mesh(finGeo, mats.siliconDepletion);
      fin.position.set(0, 0.24, z);
      fin.userData.noEdges = true;
      g.add(fin);
    }
    const gateGeo = new THREE.BoxGeometry(0.38, 0.34, DIE_W - 2.0);
    for (let x = -7.8; x <= 7.81; x += 2.6) {
      const gate = new THREE.Mesh(gateGeo, mats.gatePolysilicon);
      gate.position.set(x, 0.28, 0);
      gate.userData.noEdges = true;
      g.add(gate);

      // Cobalt M0 contact rails flanking each gate
      const contact = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.38, DIE_W - 2.4), mats.goldPlating);
      contact.position.set(x + 0.95, 0.28, 0);
      contact.userData.noEdges = true;
      g.add(contact);
    }

    parts.push(
      finalizeBionzPart(
        'xr-feol-finfet-gaa',
        26,
        '#d99b38',
        g,
        new THREE.Vector3(0, 0.35, 0),
        new THREE.Vector3(0, -3.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR27. BEOL 14-Layer Dual-Damascene Copper Interconnect Stack (y = -0.35)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ulkBlock = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 0.4, 0.82, DIE_W - 0.4, 0.35, 0.05, 'y'),
      mats.interlayerDielectric
    );
    g.add(ulkBlock);

    // 5-tier dual-damascene copper hierarchy (dense fine M1-M4 -> wide M12-M14 power rails) + vertical vias
    const viaGeo = hiResCyl(0.10, 0.10, 0.76, 8);
    const viaCoords: Array<[number, number]> = [];
    for (let layer = 0; layer < 5; layer++) {
      const y = -0.30 + layer * 0.16;
      const thick = 0.065 + layer * 0.022;
      const width = 0.18 + layer * 0.09;
      const isX = layer % 2 === 0;
      const count = 9 - layer;
      const span = DIE_W - 2.2;
      for (let i = 0; i < count; i++) {
        const offset = -span * 0.44 + (i / Math.max(1, count - 1)) * span * 0.88;
        const wire = new THREE.Mesh(
          new THREE.BoxGeometry(isX ? span : width, thick, isX ? width : span),
          layer >= 3 ? mats.goldPlating : mats.copperHybridBond
        );
        wire.position.set(isX ? 0 : offset, y, isX ? offset : 0);
        wire.userData.noEdges = true;
        g.add(wire);
        if (layer === 0 && i % 2 === 0) viaCoords.push([offset, offset]);
      }
    }
    for (const [vx, vz] of viaCoords) {
      const via = new THREE.Mesh(viaGeo, mats.copperHybridBond);
      via.position.set(vx, 0, vz);
      via.userData.noEdges = true;
      g.add(via);
    }

    parts.push(
      finalizeBionzPart(
        'xr-beol-cu-metals',
        27,
        '#c96b1c',
        g,
        new THREE.Vector3(0, -0.35, 0),
        new THREE.Vector3(0, -9.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR28. Secondary Image Processor Co-Processor Chiplet (CXD90058 "Cetus") (y = +0.8, side bay)
  // =========================================================================
  {
    const g = new THREE.Group();
    const cetusGeo = extrudeHiRes(createRoundedRectShape(4.6, 13.8, 0.48), 1.15, 0.1, 0.1, 2, 18);
    cetusGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(cetusGeo, 4.6, 13.8, 'xz');
    const cetusDie = new THREE.Mesh(cetusGeo, u.bionzCetusDie);
    g.add(cetusDie);

    // 4 raised Cortex-A35 core reliefs & gold perimeter bond-pad strip
    for (let i = -1.5; i <= 1.5; i += 1.0) {
      const tile = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.14, 2.2, 0.14, 0.03, 'y'), mats.goldPlating);
      tile.position.set(0.2, 0.62, i * 3.0);
      tile.userData.noEdges = true;
      g.add(tile);
    }
    const edgePhy = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.14, 12.2), mats.copperHybridBond);
    edgePhy.position.set(-1.85, 0.62, 0);
    edgePhy.userData.noEdges = true;
    g.add(edgePhy);

    parts.push(
      finalizeBionzPart(
        'xr-secondary-cetus-chiplet',
        28,
        '#7c3aed',
        g,
        new THREE.Vector3(13.2, 0.8, 0),
        new THREE.Vector3(26.0, 2.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR29. 2.5D Local Silicon Interconnect (LSI) Bridge & Fine Cu-RDL (y = -1.3)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bridgeGeo = extrudeHiRes(createRoundedRectShape(8.4, 15.6, 0.42), 0.52, 0.06, 0.06, 2, 16);
    bridgeGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(bridgeGeo, 8.4, 15.6, 'xz');
    const bridgeBody = new THREE.Mesh(bridgeGeo, u.bionzIpDieTile);
    bridgeBody.position.x = 10.2;
    g.add(bridgeBody);

    // Ultra-fine 2/2 um high-density parallel copper RDL interconnects & gold micro-bump landing bars
    for (let z = -6.4; z <= 6.41; z += 0.8) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.09, 0.20), mats.copperHybridBond);
      trace.position.set(10.2, 0.29, z);
      trace.userData.noEdges = true;
      g.add(trace);
    }
    for (const bx of [6.8, 13.6]) {
      const padBar = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 13.4), mats.goldPlating);
      padBar.position.set(bx, 0.30, 0);
      padBar.userData.noEdges = true;
      g.add(padBar);
    }

    const rdlRing = makeHiResHorizPlate(
      createFrameShape(DIE_W + 1.8, DIE_W + 1.8, 0.8, DIE_W - 2.6, DIE_W - 2.6, 0.5),
      0.32,
      mats.taNBarrierLiner,
      0.04,
      1,
      18
    );
    g.add(rdlRing);

    parts.push(
      finalizeBionzPart(
        'xr-silicon-bridge-lsi',
        29,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, -1.3, 0),
        new THREE.Vector3(8.5, -15.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR30. Flip-Chip C4 Copper-Pillar Micro-Bump Array (y = -2.1)
  // =========================================================================
  {
    const g = new THREE.Group();
    const gridN = 12;
    const total = gridN * gridN;
    const cuGeo = hiResCyl(0.32, 0.32, 0.52, 12);
    const capGeo = hiResSphere(0.35, 10, 8);
    const pillars = new THREE.InstancedMesh(cuGeo, mats.copperHybridBond, total);
    const caps = new THREE.InstancedMesh(capGeo, mats.solderBallSilver, total);

    const dummy = new THREE.Object3D();
    let idx = 0;
    const step = (DIE_W - 2.4) / (gridN - 1);
    for (let ix = 0; ix < gridN; ix++) {
      for (let iz = 0; iz < gridN; iz++) {
        const x = -(DIE_W - 2.4) * 0.5 + ix * step;
        const z = -(DIE_W - 2.4) * 0.5 + iz * step;
        dummy.position.set(x, 0.14, z);
        dummy.updateMatrix();
        pillars.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(x, -0.22, z);
        dummy.updateMatrix();
        caps.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    pillars.instanceMatrix.needsUpdate = true;
    caps.instanceMatrix.needsUpdate = true;
    g.add(pillars, caps);

    parts.push(
      finalizeBionzPart(
        'xr-c4-copper-bumps',
        30,
        '#d97736',
        g,
        new THREE.Vector3(0, -2.1, 0),
        new THREE.Vector3(0, -21.5, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // XR31. Capillary Underfill (CUF) Silica-Filled Epoxy Layer (y = -2.3)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculpted sloped capillary fillet collar hugging die perimeter + translucent silica-filled core
    const fillet = makeHiResHorizPlate(
      createFrameShape(DIE_W + 2.4, DIE_W + 2.4, 1.1, DIE_W - 1.0, DIE_W - 1.0, 0.5),
      0.86,
      mats.loficDielectric,
      0.22,
      2,
      20
    );
    const coreSheet = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 1.0, 0.38, DIE_W - 1.0, 0.4, 0.04, 'y'),
      mats.opticalCementClear
    );
    g.add(fillet, coreSheet);

    parts.push(
      finalizeBionzPart(
        'xr-capillary-underfill',
        31,
        '#64748b',
        g,
        new THREE.Vector3(0, -2.3, 0),
        new THREE.Vector3(-12.0, -26.5, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR32. Embedded Silicon Trench Capacitors (eSiCap) & Land-Side 01005 MLCCs (y = -7.8)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 embedded silicon trench capacitors (eSiCap) with gold electrode strips
    for (const [cx, cz] of [
      [-4.2, 0],
      [4.2, 0],
      [0, -4.2],
      [0, 4.2],
    ] as Array<[number, number]>) {
      const esicap = new THREE.Mesh(
        createChamferedBoxGeo(3.4, 0.34, 2.2, 0.16, 0.04, 'y'),
        u.bionzIpDieTile
      );
      esicap.position.set(cx, 4.5, cz);
      const padL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.38, 1.9), mats.goldPlating);
      padL.position.set(cx - 1.4, 4.5, cz);
      const padR = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.38, 1.9), mats.goldPlating);
      padR.position.set(cx + 1.4, 4.5, cz);
      padL.userData.noEdges = true;
      padR.userData.noEdges = true;
      g.add(esicap, padL, padR);
    }

    // 20 ultra-realistic Land-Side 01005 MLCC decoupling capacitors with metallic Ni-Sn end-caps!
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1.5; iz <= 1.5; iz += 1.0) {
        const cap = buildSmdPassive(1.38, 0.68, 0.62, mats.smdCeramic, mats.solderBallSilver, 'y');
        cap.position.set(ix * 2.15, -0.05, iz * 2.15);
        g.add(cap);
      }
    }

    parts.push(
      finalizeBionzPart(
        'xr-esicap-mlcc-decaps',
        32,
        '#c29258',
        g,
        new THREE.Vector3(0, -7.8, 0),
        new THREE.Vector3(14.0, -49.0, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR33. Top Ajinomoto Build-Up Film (ABF) Micro-Routing Layers (y = -3.4)
  // =========================================================================
  {
    const g = new THREE.Group();
    const abfGeo = extrudeHiRes(createRoundedRectShape(PKG_W, PKG_W, 1.6), 1.12, 0.12, 0.12, 2, 24);
    abfGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(abfGeo, PKG_W, PKG_W, 'xz');
    const abfTop = new THREE.Mesh(abfGeo, u.bionzAbfSubstrate);
    g.add(abfTop);

    // Top-side perimeter 01005 SMD decoupling capacitor ring flanking the die moat (real FC-BGA look!)
    for (let i = -4; i <= 4; i += 2) {
      for (const side of [-1, 1]) {
        const cap1 = buildSmdPassive(1.25, 0.64, 0.54, mats.smdCeramic, mats.solderBallSilver, 'y');
        cap1.position.set(i * 2.4, 0.84, side * 12.6);
        g.add(cap1);
        const cap2 = buildSmdPassive(1.25, 0.64, 0.54, mats.smdCeramic, mats.solderBallSilver, 'y');
        cap2.rotation.y = Math.PI / 2;
        cap2.position.set(side * 12.6, 0.84, i * 2.4);
        g.add(cap2);
      }
    }
    // 4 gold optical alignment fiducials + perimeter copper EMI ground fence trace on ABF shoulder
    for (const [fx, fz] of [
      [-14.2, -14.2],
      [14.2, -14.2],
      [-14.2, 14.2],
      [14.2, 14.2],
    ]) {
      const fidRing = new THREE.Mesh(hiResTorus(0.75, 0.12, 8, 18), mats.goldPlating);
      fidRing.rotation.x = Math.PI / 2;
      fidRing.position.set(fx, 0.62, fz);
      fidRing.userData.noEdges = true;
      const fidDot = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.14, 14), mats.goldPlating);
      fidDot.position.set(fx, 0.62, fz);
      fidDot.userData.noEdges = true;
      g.add(fidRing, fidDot);
    }

    parts.push(
      finalizeBionzPart(
        'xr-abf-top-buildup',
        33,
        '#15803d',
        g,
        new THREE.Vector3(0, -3.4, 0),
        new THREE.Vector3(0, -32.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR34. Low-CTE Glass-Cloth BT-Resin Rigid Core & PTH Core Vias (y = -4.9)
  // =========================================================================
  {
    const g = new THREE.Group();
    const coreGeo = extrudeHiRes(createRoundedRectShape(PKG_W, PKG_W, 1.6), 1.68, 0.1, 0.1, 2, 24);
    coreGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(coreGeo, PKG_W, PKG_W, 'xz');
    const core = new THREE.Mesh(coreGeo, u.bionzBtCore);

    // Copper reference ground/power planes laminated on top & bottom of BT glass-cloth core
    const gndTop = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W - 1.2, 0.14, PKG_W - 1.2, 1.2, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    gndTop.position.y = 0.88;
    const gndBot = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W - 1.2, 0.14, PKG_W - 1.2, 1.2, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    gndBot.position.y = -0.88;
    g.add(core, gndTop, gndBot);

    // 8x8 Plated Through-Hole (PTH) copper barrels with resin-plug dark centers
    const pthGeo = hiResCyl(0.38, 0.38, 1.98, 12);
    const plugGeo = hiResCyl(0.20, 0.20, 2.02, 10);
    const pthInst = new THREE.InstancedMesh(pthGeo, mats.copperHybridBond, 64);
    const plugInst = new THREE.InstancedMesh(plugGeo, mats.matteBlackAnodized, 64);
    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let ix = 0; ix < 8; ix++) {
      for (let iz = 0; iz < 8; iz++) {
        dummy.position.set(-12.6 + ix * 3.6, 0, -12.6 + iz * 3.6);
        dummy.updateMatrix();
        pthInst.setMatrixAt(idx, dummy.matrix);
        plugInst.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    pthInst.instanceMatrix.needsUpdate = true;
    plugInst.instanceMatrix.needsUpdate = true;
    g.add(pthInst, plugInst);

    parts.push(
      finalizeBionzPart(
        'xr-bt-glass-core-pth',
        34,
        '#92400e',
        g,
        new THREE.Vector3(0, -4.9, 0),
        new THREE.Vector3(0, -39.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR35. Bottom ABF Fan-Out Layers, Green Solder Resist Mask & ENEPIG Pads (y = -6.4)
  // =========================================================================
  {
    const g = new THREE.Group();
    const abfBotGeo = extrudeHiRes(createRoundedRectShape(PKG_W, PKG_W, 1.6), 1.12, 0.12, 0.12, 2, 24);
    abfBotGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(abfBotGeo, PKG_W, PKG_W, 'xz-bottom');
    const abfBot = new THREE.Mesh(abfBotGeo, u.bionzAbfSubstrate);
    g.add(abfBot);

    // 144 smooth ENEPIG (Ni/Pd/Au) SMD solder pad rings on bottom surface
    const padCoords: Array<[number, number]> = [];
    for (let ix = -6; ix <= 6; ix++) {
      for (let iz = -6; iz <= 6; iz++) {
        if (Math.abs(ix) <= 2 && Math.abs(iz) <= 2) continue;
        padCoords.push([ix * 2.25, iz * 2.25]);
      }
    }
    const padGeo = hiResCyl(0.60, 0.60, 0.14, 14);
    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, padCoords.length);
    const dummy = new THREE.Object3D();
    padCoords.forEach(([x, z], i) => {
      dummy.position.set(x, -0.60, z);
      dummy.updateMatrix();
      padInst.setMatrixAt(i, dummy.matrix);
    });
    padInst.instanceMatrix.needsUpdate = true;
    g.add(padInst);

    // 4 sculpted copper mainboard fan-out bus bridges linking BIONZ XR bottom perimeter to PMIC/SLVS-EC/HDMI/NOR
    for (const [bx, bz, bw, bd] of [
      [-16.8, 0, 2.2, 18.0],
      [16.8, 0, 2.2, 16.0],
      [-4.2, 16.8, 16.0, 2.2],
      [10.2, -16.8, 12.0, 2.2],
    ]) {
      const bus = new THREE.Mesh(new THREE.BoxGeometry(bw, 0.14, bd), mats.copperHeatSpreader);
      bus.position.set(bx, 0.56, bz);
      bus.userData.noEdges = true;
      g.add(bus);
    }

    parts.push(
      finalizeBionzPart(
        'xr-abf-bottom-solder-mask',
        35,
        '#166534',
        g,
        new THREE.Vector3(0, -6.4, 0),
        new THREE.Vector3(0, -45.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR36. SAC305 Lead-Free BGA Solder Ball Matrix (y = -7.65)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ballCoords: Array<[number, number]> = [];
    for (let ix = -6; ix <= 6; ix++) {
      for (let iz = -6; iz <= 6; iz++) {
        if (Math.abs(ix) <= 2 && Math.abs(iz) <= 2) continue;
        ballCoords.push([ix * 2.25, iz * 2.25]);
      }
    }
    // Smooth glossy metallic SAC305 solder spheres (never crushed to octahedrons!)
    const bgaGeo = hiResSphere(0.68, 14, 10);
    const bgaInst = new THREE.InstancedMesh(bgaGeo, mats.solderBallSilver, ballCoords.length);
    const dummy = new THREE.Object3D();
    ballCoords.forEach(([x, z], i) => {
      dummy.position.set(x, 0, z);
      dummy.updateMatrix();
      bgaInst.setMatrixAt(i, dummy.matrix);
    });
    bgaInst.instanceMatrix.needsUpdate = true;
    g.add(bgaInst);

    parts.push(
      finalizeBionzPart(
        'xr-sac305-bga-balls',
        36,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, -7.65, 0),
        new THREE.Vector3(0, -54.0, 0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // XR37. Dedicated Multi-Phase Core PMIC & Shielded 0.47μH Buck Inductor PDN
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dedicated power-delivery daughter zone flanking the BIONZ XR package
    const pdnPad = makeHiResHorizPlate(
      createRoundedRectShape(11.6, 26.0, 1.1),
      0.85,
      u.batBmsPcb,
      0.08,
      2,
      18
    );
    g.add(pdnPad);

    // Multi-phase QFN-48 Sony custom camera SoC PMIC (0.75V VDD_CORE / 1.1V LPDDR5X / 1.8V I/O)
    const pmic = buildChipPackage({
      w: 6.4,
      d: 6.4,
      h: 1.18,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzIpDieTile,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    pmic.position.set(-1.4, 1.02, -6.2);
    g.add(pmic);

    // 4 molded metal-composite shielded 0.47 μH power buck inductors lined up beside the PMIC
    for (let i = 0; i < 4; i++) {
      const ind = buildShieldedInductor(
        3.25,
        1.55,
        mats.ferriteInductor,
        mats.silverElectrode,
        mats.silverElectrode,
        'y'
      );
      ind.position.set(2.4, 1.22, -9.2 + i * 4.2);
      g.add(ind);
    }

    // 2 yellow molded polymer-tantalum bulk decoupling capacitors + 6 0201 MLCCs
    for (const tz of [6.4, 10.0]) {
      const tant = buildTantalumCap(
        4.6,
        2.5,
        1.15,
        mats.tantalumCapYellow,
        mats.cinnabarAnodized,
        mats.silverElectrode,
        'y'
      );
      tant.position.set(-1.6, 1.0, tz);
      g.add(tant);
    }
    for (let i = 0; i < 6; i++) {
      const cap = buildSmdPassive(1.2, 0.65, 0.48, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(-4.2, 0.68, -9.8 + i * 3.8);
      g.add(cap);
    }

    parts.push(
      finalizeBionzPart(
        'xr-pmic-vrm-rails',
        37,
        '#f59e0b',
        g,
        new THREE.Vector3(-23.2, -5.2, 0),
        new THREE.Vector3(-36.0, -14.0, 6.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR38. Ultra-Low-Jitter 24 MHz Hermetic Gold-Lid TCXO Reference Oscillator
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrier = makeHiResHorizPlate(
      createRoundedRectShape(7.2, 5.4, 0.65),
      0.55,
      u.bionzAbfSubstrate,
      0.06,
      1,
      16
    );
    // Ceramic hermetic crystal package base + seam-welded gold Kovar lid (24.000 MHz TCXO)
    const cerBase = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 0.62, 3.6, 0.25, 0.05, 'y'),
      mats.ceramicAlumina
    );
    cerBase.position.y = 0.58;
    const goldLid = new THREE.Mesh(
      createChamferedBoxGeo(4.75, 0.66, 3.15, 0.22, 0.06, 'y'),
      mats.goldPlating
    );
    goldLid.position.y = 1.18;
    // Pin-1 laser index dot + 4 gold castellated corner solder pads + 2 load capacitors
    const p1 = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.08, 12), mats.matteBlackAnodized);
    p1.position.set(-1.7, 1.54, -1.0);
    p1.userData.noEdges = true;
    for (const sx of [-2.4, 2.4]) {
      for (const sz of [-1.5, 1.5]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.65), mats.goldPlating);
        pad.position.set(sx, 0.45, sz);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }
    for (const cx of [-1.6, 1.6]) {
      const cap = buildSmdPassive(1.1, 0.6, 0.45, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(cx, 0.5, 2.1);
      g.add(cap);
    }
    g.add(carrier, cerBase, goldLid, p1);

    parts.push(
      finalizeBionzPart(
        'xr-tcxo-24mhz-clock',
        38,
        '#eab308',
        g,
        new THREE.Vector3(19.8, -5.2, 12.2),
        new THREE.Vector3(28.0, -8.0, 22.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR39. Dedicated 256 Mb Octal-SPI Boot NOR Flash & Factory Calibration ROM
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrier = makeHiResHorizPlate(
      createRoundedRectShape(9.4, 7.6, 0.7),
      0.58,
      u.bionzAbfSubstrate,
      0.06,
      1,
      16
    );
    // WSON-8 / SOIC-8 256Mb Octal-SPI NOR Flash storing BIONZ XR bootloader, lens LUTs & C2PA root cert
    const norFlash = buildChipPackage({
      w: 6.2,
      d: 5.0,
      h: 1.05,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzIpDieTile,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    norFlash.position.y = 0.85;
    // Pull-up resistor + bypass MLCC
    const cap = buildSmdPassive(1.25, 0.68, 0.5, mats.smdCeramic, mats.silverElectrode, 'y');
    cap.position.set(3.6, 0.54, -1.6);
    const res = buildSmdPassive(1.15, 0.6, 0.45, mats.matteBlackAnodized, mats.silverElectrode, 'y');
    res.position.set(3.6, 0.52, 1.6);
    g.add(carrier, norFlash, cap, res);

    parts.push(
      finalizeBionzPart(
        'xr-qspi-boot-nor-rom',
        39,
        '#8b5cf6',
        g,
        new THREE.Vector3(20.6, -5.2, -10.8),
        new THREE.Vector3(30.0, -10.0, -22.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR40. Sony α7 IV Σ-Shaped Pyrolytic Graphite Thermal Bridge & Press Clip
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic Sony α7 IV Σ-shaped high-orientation pyrolytic graphite bridge (k ≈ 1500 W/m·K in-plane)
    // Cutaway window over front-center so the SONY BIONZ XR CXD90066GG laser-etched lid stays 100% visible!
    const contactBar = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W + 2.4, 0.36, 7.6, 1.0, 0.05, 'y'),
      mats.pyroGraphite
    );
    contactBar.position.set(0, 0, -PKG_W * 0.5 - 1.2);
    // Iconic Σ-shaped double-fold thermal hinge rising gracefully behind the SoC toward the Mg chassis
    const sigmaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, -PKG_W * 0.5 - 4.4),
      new THREE.Vector3(0, 1.6, -PKG_W * 0.5 - 7.8),
      new THREE.Vector3(0, 3.4, -PKG_W * 0.5 - 5.2),
      new THREE.Vector3(0, 5.2, -PKG_W * 0.5 - 8.6),
    ]);
    const sigmaPts = sigmaCurve.getPoints(18);
    for (let i = 0; i < sigmaPts.length - 1; i++) {
      const a = sigmaPts[i];
      const b = sigmaPts[i + 1];
      const len = a.distanceTo(b) + 0.14;
      const seg = new THREE.Mesh(new THREE.BoxGeometry(PKG_W - 2.0, 0.24, len), mats.pyroGraphite);
      seg.position.copy(a).lerp(b, 0.5);
      seg.lookAt(b);
      seg.userData.noEdges = true;
      g.add(seg);
    }
    // Laminated copper foil thermal booster core along the contact flange
    const cuRibbon = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W - 1.6, 0.14, 4.8, 0.6, 0.02, 'y'),
      u.cfeCopperThermal
    );
    cuRibbon.position.set(0, 0.22, -PKG_W * 0.5 - 1.2);
    cuRibbon.userData.noEdges = true;

    // Twin stainless spring-steel press clips clamping the graphite flange cleanly onto the IHS shoulder
    for (const sx of [-11.5, 11.5]) {
      const clip = new THREE.Mesh(
        createChamferedBoxGeo(3.2, 0.56, 6.2, 0.4, 0.06, 'y'),
        mats.stainlessMachined
      );
      clip.position.set(sx, 0.34, -PKG_W * 0.5 - 1.0);
      const rivet = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.78, 14), mats.titaniumRivet);
      rivet.position.set(sx, 0.36, -PKG_W * 0.5 - 1.0);
      rivet.userData.noEdges = true;
      g.add(clip, rivet);
    }
    g.add(contactBar, cuRibbon);

    parts.push(
      finalizeBionzPart(
        'xr-sigma-graphite-clamp',
        40,
        '#334155',
        g,
        new THREE.Vector3(0, 10.15, 0),
        new THREE.Vector3(0, 62.0, -24.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // XR41. 8-Lane SLVS-EC 2.0 Differential Microstrip & AC-Coupling Cap Fan-Out
  // =========================================================================
  {
    const g = new THREE.Group();
    const busDeck = makeHiResHorizPlate(
      createRoundedRectShape(24.0, 9.6, 0.9),
      0.72,
      u.batBmsPcb,
      0.06,
      2,
      18
    );
    g.add(busDeck);

    // 8 matched-length 100-ohm SLVS-EC 2.0 differential lane pairs + 16 0201 AC-coupling caps
    for (let lane = 0; lane < 8; lane++) {
      const lx = -9.45 + lane * 2.7;
      for (const pol of [-0.36, 0.36]) {
        const trace = new THREE.Mesh(
          new THREE.BoxGeometry(0.24, 0.1, 7.6),
          pol < 0 ? mats.copperHybridBond : mats.goldPlating
        );
        trace.position.set(lx + pol, 0.42, 0.1);
        trace.userData.noEdges = true;
        g.add(trace);

        const acCap = buildSmdPassive(0.92, 0.46, 0.4, mats.smdCeramic, mats.silverElectrode, 'y');
        acCap.rotation.y = Math.PI / 2;
        acCap.position.set(lx + pol, 0.58, -1.55);
        g.add(acCap);
      }
    }
    // Shielded micro-B2B sensor-ribbon landing header along front edge (+Z)
    const b2bBody = new THREE.Mesh(
      createChamferedBoxGeo(21.6, 1.15, 2.2, 0.25, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    b2bBody.position.set(0, 0.92, 3.15);
    const b2bShield = makeHiResHorizPlate(
      createFrameShape(22.2, 2.6, 0.35, 20.6, 1.4, 0.2),
      0.42,
      mats.stainlessMachined,
      0.04,
      1,
      14
    );
    b2bShield.position.set(0, 1.38, 3.15);
    g.add(b2bBody, b2bShield);

    parts.push(
      finalizeBionzPart(
        'xr-slvs-ec-microcoax-bus',
        41,
        '#06b6d4',
        g,
        new THREE.Vector3(-4.2, -5.2, 21.8),
        new THREE.Vector3(-10.0, -10.0, 34.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR42. HDMI 2.1 / 48 Gbps FRL Retimer IC & ±15 kV Ultra-Low-Cap ESD Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrier = makeHiResHorizPlate(
      createRoundedRectShape(10.8, 13.8, 0.85),
      0.68,
      u.batBmsPcb,
      0.06,
      2,
      18
    );
    // QFN-40 HDMI 2.1 48Gbps FRL Retimer/Redriver IC
    const retimer = buildChipPackage({
      w: 5.8,
      d: 5.8,
      h: 0.96,
      style: 'qfn',
      pinsPerSide: 9,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzIpDieTile,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    retimer.position.set(-1.1, 0.85, -1.8);

    // Twin DFN-10 ±15 kV ultra-low-capacitance (<0.25 pF) TVS ESD protection diode arrays
    for (const ex of [-2.2, 2.2]) {
      const esd = buildChipPackage({
        w: 3.1,
        d: 1.5,
        h: 0.62,
        style: 'dfn',
        pinsPerSide: 5,
        bodyMat: u.icEpoxyLaser,
        leadMat: mats.goldPlating,
        pin1Mat: mats.silverElectrode,
        axis: 'y',
      });
      esd.position.set(ex, 0.65, 3.85);
      g.add(esd);
    }
    // 4 differential FRL AC coupling 0201 MLCCs flanking retimer
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(1.1, 0.56, 0.42, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(3.45, 0.54, -4.2 + i * 2.1);
      g.add(cap);
    }
    g.add(carrier, retimer);

    parts.push(
      finalizeBionzPart(
        'xr-hdmi21-retimer-esd',
        42,
        '#0284c7',
        g,
        new THREE.Vector3(22.4, -5.2, 1.4),
        new THREE.Vector3(38.0, -6.0, 4.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR43. Dedicated LPDDR5X PoP Memory Power Rail Sub-PMIC & Ceramic Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const subDeck = makeHiResHorizPlate(
      createRoundedRectShape(11.4, 10.6, 0.8),
      0.68,
      u.batBmsPcb,
      0.06,
      2,
      18
    );
    const subPmic = buildChipPackage({
      w: 4.8,
      d: 4.8,
      h: 0.94,
      style: 'qfn',
      pinsPerSide: 7,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzCetusDie,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    subPmic.position.set(-1.9, 0.82, 0);

    // Twin 0.24 uH compact high-frequency buck inductors (VDD2H 1.05V & VDDQ 0.5V)
    for (const iz of [-2.4, 2.4]) {
      const ind = buildShieldedInductor(
        2.65,
        1.18,
        mats.ferriteInductor,
        mats.silverElectrode,
        mats.silverElectrode,
        'y'
      );
      ind.position.set(2.85, 0.94, iz);
      g.add(ind);
    }
    // 4 low-ESL 0201 decoupling MLCCs
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(1.15, 0.6, 0.46, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(-3.6 + i * 1.9, 0.56, 3.85);
      g.add(cap);
    }
    g.add(subDeck, subPmic);

    parts.push(
      finalizeBionzPart(
        'xr-ddr5-vddq-pmic-sub',
        43,
        '#6366f1',
        g,
        new THREE.Vector3(-22.8, -5.2, -19.2),
        new THREE.Vector3(-38.0, -8.0, -32.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR44. Multi-Zone On-Die Thermal Sense Diode Array & Telemetry Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Octagonal precision gold on-die thermal telemetry analog sense bus ring
    const telRing = new THREE.Mesh(hiResTorus(7.4, 0.14, 10, 32), mats.goldPlating);
    telRing.rotation.x = Math.PI / 2;
    g.add(telRing);

    // 6 P-N junction thermal sense diode macros monitoring AI NPU, CPU, HEVC, ISP, DDR & Cetus
    const diodeCoords: Array<[number, number]> = [
      [-6.9, -2.3],
      [-2.3, -2.3],
      [6.9, -2.3],
      [-2.3, -6.9],
      [2.3, 2.3],
      [6.9, 6.9],
    ];
    for (const [dx, dz] of diodeCoords) {
      const pod = new THREE.Mesh(
        createChamferedBoxGeo(1.18, 0.34, 1.18, 0.16, 0.04, 'y'),
        mats.cinnabarAnodized
      );
      pod.position.set(dx, 0.04, dz);
      const pnDot = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.42, 14), mats.goldPlating);
      pnDot.position.set(dx, 0.06, dz);
      pnDot.userData.noEdges = true;
      g.add(pod, pnDot);
    }

    parts.push(
      finalizeBionzPart(
        'xr-die-thermal-diode-ring',
        44,
        '#f43f5e',
        g,
        new THREE.Vector3(0, 1.62, 0),
        new THREE.Vector3(0, 11.2, 19.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // XR45. Mainboard-Level Corner Epoxy Edge-Bonding & Drop-Shock Fillet Stakes
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 precision-dispensed matte-obsidian epoxy corner edge-bond L-stakes bracing all 4 BGA corners!
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const armX = new THREE.Mesh(
          createChamferedBoxGeo(5.4, 2.15, 1.65, 0.42, 0.24, 'y'),
          u.micRubberBootBlack
        );
        armX.position.set(sx * 14.3, 0, sz * 16.55);
        const armZ = new THREE.Mesh(
          createChamferedBoxGeo(1.65, 2.15, 5.4, 0.42, 0.24, 'y'),
          u.micRubberBootBlack
        );
        armZ.position.set(sx * 16.55, 0, sz * 14.3);
        const cornerBlob = new THREE.Mesh(hiResCyl(1.45, 1.75, 2.22, 16), u.micRubberBootBlack);
        cornerBlob.position.set(sx * 16.3, 0, sz * 16.3);
        cornerBlob.userData.noEdges = true;
        g.add(armX, armZ, cornerBlob);
      }
    }

    parts.push(
      finalizeBionzPart(
        'xr-bga-corner-underfill',
        45,
        '#334155',
        g,
        new THREE.Vector3(0, -6.15, 0),
        new THREE.Vector3(0, -58.0, 22.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // XR46. Factory ATE / JTAG / SWD Micro-Probe Test Pads & Security eFuse Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    const padDeck = makeHiResHorizPlate(
      createRoundedRectShape(14.2, 7.6, 0.75),
      0.62,
      u.bionzAbfSubstrate,
      0.06,
      2,
      16
    );
    g.add(padDeck);

    // 2×8 thick-ENIG gold factory pogo-pin ATE/JTAG/SWD micro-probe test pads
    for (let c = 0; c < 8; c++) {
      for (let r = 0; r < 2; r++) {
        const pad = new THREE.Mesh(hiResCyl(0.54, 0.54, 0.16, 16), mats.goldPlating);
        pad.position.set(-5.6 + c * 1.6, 0.38, -1.6 + r * 1.9);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }
    // OTP security eFuse blow-link block + 3 boot-mode strap 0201 resistors
    const efuseIc = buildChipPackage({
      w: 4.2,
      d: 1.85,
      h: 0.56,
      style: 'dfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      pin1Mat: mats.cinnabarAnodized,
      axis: 'y',
    });
    efuseIc.position.set(-3.4, 0.58, 2.35);
    for (let i = 0; i < 3; i++) {
      const strap = buildSmdPassive(1.1, 0.58, 0.42, mats.matteBlackAnodized, mats.silverElectrode, 'y');
      strap.position.set(1.4 + i * 1.85, 0.52, 2.35);
      g.add(strap);
    }
    g.add(efuseIc);

    parts.push(
      finalizeBionzPart(
        'xr-jtag-swd-debug-header',
        46,
        '#d97706',
        g,
        new THREE.Vector3(10.6, -5.2, -21.2),
        new THREE.Vector3(18.0, -14.0, -36.0),
        cp,
        0.2
      )
    );
  }

  return parts;
}
