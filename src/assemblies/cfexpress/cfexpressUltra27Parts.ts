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
  buildSmdPassive,
  buildSpotWeldNuggets,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeCfexpressUltra27Part(
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
    subsystem: 'cfexpress',
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
 * Phase 27B — Standalone CFexpress 4.0 Card Ultra-Deep Expansion (+40 Parts C31–C70 -> 70 Total).
 * 2× inspection scale of true CFexpress Type A (40.0 × 56.0 × 5.6 mm), centered at (0, 0, 0).
 * Every part sits authentically inside the card envelope when assembled and fans out cleanly when exploded.
 */
export function buildCfexpressUltra27Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // C31. 20°–30° Leading-Edge PCB Chamfer Bevel
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual-sided 30° CNC-milled fiberglass mating bevel nose
    const bevelShape = new THREE.Shape();
    bevelShape.moveTo(-16.2, 0);
    bevelShape.lineTo(16.2, 0);
    bevelShape.lineTo(15.35, -1.08);
    bevelShape.lineTo(-15.35, -1.08);
    bevelShape.closePath();
    const bevel = new THREE.Mesh(
      extrudeHiRes(bevelShape, 0.74, 0.24, 0.24, 2, 10),
      mats.pcbEdgeLaminate
    );

    // Exposed internal copper/prepreg strata visible along the CNC-cut leading edge
    for (const lz of [-0.18, 0.18]) {
      const strata = new THREE.Mesh(new THREE.BoxGeometry(30.4, 0.14, 0.08), mats.copperCoil);
      strata.position.set(0, -0.58, lz);
      strata.userData.noEdges = true;
      g.add(strata);
    }

    // Upper gold contact entry lip + 21 chamfered micro lead-in pin tongues
    const goldLip = new THREE.Mesh(
      createChamferedBoxGeo(31.2, 0.24, 0.98, 0.1, 0.04, 'z'),
      mats.goldPlating
    );
    goldLip.position.y = 0.24;

    const tipGeo = createChamferedBoxGeo(0.76, 0.52, 0.16, 0.12, 0.03, 'z');
    const tipInst = new THREE.InstancedMesh(tipGeo, mats.goldPlating, 42);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let pin = 0; pin < 21; pin++) {
      const px = -15.0 + pin * 1.5;
      for (const sz of [-0.42, 0.42]) {
        dm.position.set(px, -0.18, sz);
        dm.rotation.set(sz > 0 ? 0.38 : -0.38, 0, 0);
        dm.updateMatrix();
        tipInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    tipInst.instanceMatrix.needsUpdate = true;
    tipInst.userData.noEdges = true;
    g.add(bevel, goldLip, tipInst);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-edge-bevel-chamfer',
        31,
        '#ca8a04',
        g,
        new THREE.Vector3(0, -27.2, 0),
        new THREE.Vector3(-32, -64, 14),
        cp
      )
    );
  }

  // =========================================================================
  // C32. Staggered Hot-Plug Contact Pins (First-Make GND/+3V3, Last-Make INS#)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Exact verified CFexpress Type A 21-pin staggered sequence:
    // First-make longer GND (1,4,15,18,21) & +3V3 (10); Last-make recessed INS# card detect (12)
    const firstMake = new Set([1, 4, 10, 15, 18, 21]);
    const viaGeo = hiResCyl(0.24, 0.24, 0.3, 10).rotateX(Math.PI / 2);

    for (let pin = 1; pin <= 21; pin++) {
      const px = -15.0 + (pin - 1) * 1.5;
      const isLong = firstMake.has(pin);
      const isIns = pin === 12;
      const len = isLong ? 5.9 : isIns ? 3.7 : 4.9;
      const yShift = isLong ? -0.45 : isIns ? 0.52 : -0.04;
      const mat = isLong
        ? mats.goldPlating
        : isIns
          ? mats.mountRedIndexDot
          : mats.copperCoil;

      // Underlying nickel diffusion barrier pedestal + top gold/copper/INS# contact finger
      const niBase = new THREE.Mesh(
        createChamferedBoxGeo(0.96, len + 0.12, 0.12, 0.2, 0.02, 'z'),
        mats.stainlessMachined
      );
      niBase.position.set(px, yShift, -0.08);
      niBase.userData.noEdges = true;

      const finger = new THREE.Mesh(
        createChamferedBoxGeo(0.84, len, 0.20, 0.2, 0.04, 'z'),
        mat
      );
      finger.position.set(px, yShift, 0.02);
      finger.userData.noEdges = true;

      const escapeVia = new THREE.Mesh(viaGeo, mats.goldPlating);
      escapeVia.position.set(px, 2.75, 0);
      escapeVia.userData.noEdges = true;
      g.add(niBase, finger, escapeVia);
    }

    // 3 ultra-fine horizontal mating-sequence datum reference rails (Stage 1 GND/3.3V -> Stage 2 PCIe -> Stage 3 INS#)
    const stageDefs: Array<[number, THREE.Material]> = [
      [-3.18, mats.goldPlating],
      [-2.35, mats.copperCoil],
      [-1.32, mats.mountRedIndexDot],
    ];
    for (const [sy, mat] of stageDefs) {
      const datum = new THREE.Mesh(new THREE.BoxGeometry(31.4, 0.12, 0.06), mat);
      datum.position.set(0, sy, -0.18);
      datum.userData.noEdges = true;
      g.add(datum);
    }

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-staggered-hotplug-pins',
        32,
        '#eab308',
        g,
        new THREE.Vector3(0, -24.8, 0.56),
        new THREE.Vector3(34, -64, 20),
        cp
      )
    );
  }

  // =========================================================================
  // C33. Asymmetric Side Guide Rails & Push-Push Eject Detent Notch
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left asymmetric poka-yoke guide rail with stepped sliding channel & lower lead-in chamfer ramp
    const leftRail = new THREE.Mesh(
      createChamferedBoxGeo(1.12, 44.0, 2.6, 0.3, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    leftRail.position.set(-19.5, 0, -0.35);

    const leftGroove = new THREE.Mesh(createChamferedBoxGeo(0.45, 38.0, 1.15, 0.14, 0.04, 'z'), mats.matteBlackAnodized);
    leftGroove.position.set(-20.02, 1.5, -0.35);
    leftGroove.userData.noEdges = true;

    const leftLeadIn = new THREE.Mesh(createChamferedBoxGeo(0.92, 3.2, 2.1, 0.2, 0.08, 'z'), mats.titaniumRivet);
    leftLeadIn.position.set(-19.45, -21.8, -0.35);
    leftLeadIn.userData.noEdges = true;

    // Right rail split by the precision push-push heart-cam eject detent pocket + stainless wear strike liner!
    const rightTop = new THREE.Mesh(
      createChamferedBoxGeo(1.12, 21.0, 2.6, 0.3, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    rightTop.position.set(19.5, 11.5, 0.35);
    const rightBot = new THREE.Mesh(
      createChamferedBoxGeo(1.12, 17.0, 2.6, 0.3, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    rightBot.position.set(19.5, -13.5, 0.35);

    const detentAccent = new THREE.Mesh(
      createChamferedBoxGeo(1.32, 5.2, 2.8, 0.35, 0.1, 'z'),
      mats.cinnabarAnodized
    );
    detentAccent.position.set(19.3, -2.0, 0.35);

    // Wear-resistant stainless latch-hook strike walls at top & bottom of the detent notch
    const strikeGeo = createChamferedBoxGeo(1.42, 0.48, 2.85, 0.1, 0.04, 'z');
    for (const sy of [-4.65, 0.65]) {
      const strike = new THREE.Mesh(strikeGeo, mats.stainlessMachined);
      strike.position.set(19.38, sy, 0.35);
      strike.userData.noEdges = true;
      g.add(strike);
    }

    // Subtle molded upper extraction tactile grip ticks on both rails
    const tickGeo = new THREE.BoxGeometry(0.24, 0.55, 2.2);
    for (let i = 0; i < 4; i++) {
      const tL = new THREE.Mesh(tickGeo, mats.titaniumRivet);
      tL.position.set(-20.06, 15.5 + i * 1.45, -0.35);
      tL.userData.noEdges = true;
      const tR = new THREE.Mesh(tickGeo, mats.titaniumRivet);
      tR.position.set(20.06, 15.5 + i * 1.45, 0.35);
      tR.userData.noEdges = true;
      g.add(tL, tR);
    }

    g.add(leftRail, leftGroove, leftLeadIn, rightTop, rightBot, detentAccent);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-side-guide-rails-notch',
        33,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-92, 0, 26),
        cp
      )
    );
  }

  // =========================================================================
  // C34. Top/Bottom Metal Armor Micro-Laser Spot Welds & Crimp Seam
  // =========================================================================
  {
    const g = new THREE.Group();
    const seamRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(39.4, 52.0, 2.2, 37.9, 50.5, 1.8), 0.7, 0.06, 0.06, 2, 20),
      mats.titaniumRivet
    );
    // Secondary inner precision crimp step flange
    const crimpStep = new THREE.Mesh(
      extrudeHiRes(createFrameShape(38.1, 50.7, 1.85, 37.2, 49.8, 1.65), 0.38, 0.03, 0.03, 1, 18),
      mats.stainlessMachined
    );
    crimpStep.userData.noEdges = true;

    // 32 precision perimeter micro-laser fusion weld nuggets along ALL 4 edges (flanks + top/bottom!)
    const weldCoords: Array<[number, number, number]> = [];
    for (let i = -5; i <= 5; i++) {
      weldCoords.push([-18.85, i * 4.4, 0.36], [18.85, i * 4.4, 0.36]);
    }
    for (let j = -2; j <= 2; j++) {
      weldCoords.push([j * 6.2, 25.25, 0.36], [j * 6.2, -25.25, 0.36]);
    }
    const welds = buildSpotWeldNuggets(weldCoords, 0.44, 'z', mats.titaniumRivet, mats.solderBallSilver);

    // 8 micro mechanical interlock clinch teeth along left/right inner rim
    const toothGeo = new THREE.BoxGeometry(0.62, 1.35, 0.56);
    for (const sx of [-18.2, 18.2]) {
      for (const sy of [-18.0, -6.0, 6.0, 18.0]) {
        const tooth = new THREE.Mesh(toothGeo, mats.goldPlating);
        tooth.position.set(sx, sy, 0);
        tooth.userData.noEdges = true;
        g.add(tooth);
      }
    }
    g.add(seamRim, crimpStep, welds);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-armor-laser-welds',
        34,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 1.4, 0),
        new THREE.Vector3(92, 0, -24),
        cp
      )
    );
  }

  // =========================================================================
  // C35. Shell-to-PCB EMI Grounding Spring Clips & Conductive Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    const clipCoords: Array<[number, number]> = [
      [-15.6, -15.0],
      [15.6, -15.0],
      [-15.6, 17.5],
      [15.6, 17.5],
    ];
    for (const [cx, cy] of clipCoords) {
      const dir = cx < 0 ? 1 : -1;
      // SMT gold solder base pad + BeCu C-shaped spring body + curved leaf-spring contact dome!
      const smtPad = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.0, 0.12), mats.goldPlating);
      smtPad.position.set(cx, cy, -0.52);
      smtPad.userData.noEdges = true;

      const clipBase = new THREE.Mesh(
        createChamferedBoxGeo(2.5, 1.75, 0.36, 0.22, 0.04, 'z'),
        mats.beCuSpring
      );
      clipBase.position.set(cx, cy, -0.28);

      // Curved cantilevered spring leaf arch rising smoothly from U-bend to gold contact dimple
      const archCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(cx - dir * 0.95, cy, -0.18),
        new THREE.Vector3(cx - dir * 1.15, cy, 0.38),
        new THREE.Vector3(cx, cy, 0.78),
        new THREE.Vector3(cx + dir * 0.95, cy, 0.42),
      ]);
      const leaf = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(archCurve, 14, 0.18, 6, false)),
        mats.beCuSpring
      );
      leaf.scale.set(1.0, 2.2, 0.75);
      leaf.position.y = cy * (1 - 2.2);
      leaf.userData.noEdges = true;

      const contactDome = new THREE.Mesh(hiResSphere(0.32, 10, 8), mats.goldPlating);
      contactDome.scale.set(1.0, 1.35, 0.6);
      contactDome.position.set(cx, cy, 0.84);
      contactDome.userData.noEdges = true;

      g.add(smtPad, clipBase, leaf, contactDome);
    }

    // Conductive Ni-Cu woven fabric EMI grounding gaskets along top & bottom edges with conductive mesh ribs
    const ribGeo = new THREE.BoxGeometry(0.18, 1.05, 0.12);
    for (const cy of [-21.2, 23.2]) {
      const gasket = new THREE.Mesh(
        createChamferedBoxGeo(26.2, 1.15, 0.68, 0.3, 0.06, 'z'),
        mats.conductiveNiCuFoam
      );
      gasket.position.set(0, cy, 0.22);
      const psa = new THREE.Mesh(new THREE.BoxGeometry(25.6, 1.05, 0.08), mats.copperCoil);
      psa.position.set(0, cy, -0.16);
      psa.userData.noEdges = true;
      g.add(gasket, psa);

      for (let m = -10; m <= 10; m += 2) {
        const meshRib = new THREE.Mesh(ribGeo, mats.silverElectrode);
        meshRib.position.set(m * 1.15, cy, 0.56);
        meshRib.userData.noEdges = true;
        g.add(meshRib);
      }
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-emi-ground-spring-clips',
        35,
        '#d97706',
        g,
        new THREE.Vector3(0, 1.0, 0.9),
        new THREE.Vector3(-86, -18, -32),
        cp
      )
    );
  }

  // =========================================================================
  // C36. Next-Gen Ultra-Thin Micro-Vapor Spreader / Thermal Fin Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    const plateGeo = extrudeHiRes(createRoundedRectShape(32.2, 42.2, 2.0), 0.28, 0.05, 0.05, 2, 20);
    applyPlanarUVs(plateGeo, 32.2, 42.2, 'xy');
    const plate = new THREE.Mesh(plateGeo, u.cfeCopperThermal);

    // Diffusion-bonded vacuum-sealed copper perimeter rim
    const sealRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(32.4, 42.4, 2.0, 30.2, 40.2, 1.65), 0.14, 0.02, 0.02, 1, 18),
      mats.copperHeatSpreader
    );
    sealRim.position.z = 0.18;
    sealRim.userData.noEdges = true;

    // 13 longitudinal sintered-copper micro-capillary vapor wick channels + top/bottom vapor manifold headers!
    const finGeo = createChamferedBoxGeo(0.64, 37.0, 0.18, 0.14, 0.03, 'z');
    for (let i = -6; i <= 6; i++) {
      const fin = new THREE.Mesh(finGeo, mats.vcCopperMeshWick);
      fin.position.set(i * 2.2, 0, 0.19);
      fin.userData.noEdges = true;
      g.add(fin);
    }
    for (const my of [-18.8, 18.8]) {
      const manifold = new THREE.Mesh(createChamferedBoxGeo(27.8, 1.15, 0.18, 0.2, 0.03, 'z'), mats.vcWorkingFluidCyan);
      manifold.position.set(0, my, 0.19);
      manifold.userData.noEdges = true;
      g.add(manifold);
    }

    // 4×6 micro-etched copper support pillars preventing ultra-thin vacuum-chamber collapse (InstancedMesh!)
    const pilGeo = hiResCyl(0.28, 0.28, 0.24, 10).rotateX(Math.PI / 2);
    const pilInst = new THREE.InstancedMesh(pilGeo, mats.goldPlating, 24);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        dm.position.set(-9.9 + c * 6.6, -15.0 + r * 6.0, 0.20);
        dm.updateMatrix();
        pilInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    pilInst.instanceMatrix.needsUpdate = true;
    pilInst.userData.noEdges = true;
    g.add(plate, sealRim, pilInst);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-micro-vapor-fin-plate',
        36,
        '#ea580c',
        g,
        new THREE.Vector3(0, 2.2, 2.02),
        new THREE.Vector3(46, 20, 26),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C37. High-Emissivity Thermal Coating & Laser VPG800 / Serial Badge
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-emissivity pyro-graphite thermal liner seated cleanly on the INNER side of C02 backplate
    const thermalCoat = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(34.0, 41.0, 1.8), 0.16, 0.03, 0.03, 1, 18),
      mats.pyroGraphite
    );
    thermalCoat.position.z = 0.62;

    // Micro-embossed high-emissivity infrared radiation spreader bars on inner graphite coat
    const radGeo = new THREE.BoxGeometry(28.4, 0.36, 0.06);
    for (let i = -4; i <= 4; i++) {
      const rad = new THREE.Mesh(radGeo, mats.matteBlackAnodized);
      rad.position.set(0, i * 4.2, 0.72);
      rad.userData.noEdges = true;
      g.add(rad);
    }

    // Delicate gold-beveled VPG800 clapperboard outline framing the rear laser-etched VPG800 mark cleanly!
    const vpgFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(9.4, 9.8, 0.6, 8.2, 8.6, 0.35), 0.12, 0.02, 0.02, 1, 14),
      mats.goldPlating
    );
    vpgFrame.position.set(12.2, 9.3, -0.2);
    vpgFrame.userData.noEdges = true;

    g.add(thermalCoat, vpgFrame);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-vpg800-laser-serial',
        37,
        '#facc15',
        g,
        new THREE.Vector3(0, 0, -2.68),
        new THREE.Vector3(28, -26, -74),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C38. PCIe Gen4 85-Ohm Differential Pairs & Serpentine Length-Matching Traces
  // =========================================================================
  {
    const g = new THREE.Group();
    // Subtle reference dielectric carrier bar beneath the matched differential pairs
    const subStrip = new THREE.Mesh(createChamferedBoxGeo(11.4, 11.4, 0.08, 0.3, 0.015, 'z'), mats.pcbEdgeLaminate);
    subStrip.position.set(-2.8, -0.1, -0.12);
    subStrip.userData.noEdges = true;
    g.add(subStrip);

    // Smooth 3D TubeGeometry serpentine differential PCIe Gen4 TX/RX trace pairs + teardrop pads!
    const padGeo = hiResCyl(0.32, 0.32, 0.12, 12).rotateX(Math.PI / 2);
    for (const pairIdx of [0, 1]) {
      const baseX = -5.4 + pairIdx * 5.2;
      for (const polarity of [-0.46, 0.46]) {
        const px = baseX + polarity;
        const pts: THREE.Vector3[] = [
          new THREE.Vector3(px, -5.6, 0),
          new THREE.Vector3(px, -2.2, 0),
          new THREE.Vector3(px + 0.72, -1.6, 0.02),
          new THREE.Vector3(px + 0.72, -0.8, 0.02),
          new THREE.Vector3(px - 0.72, -0.2, 0.02),
          new THREE.Vector3(px - 0.72, 0.6, 0.02),
          new THREE.Vector3(px + 0.72, 1.2, 0.02),
          new THREE.Vector3(px, 2.0, 0),
          new THREE.Vector3(px, 5.4, 0),
        ];
        const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.25);
        const mat = polarity < 0 ? mats.copperCoil : mats.goldPlating;
        const trace = new THREE.Mesh(
          markHiRes(new THREE.TubeGeometry(curve, 36, 0.14, 6, false)),
          mat
        );
        trace.userData.noEdges = true;
        g.add(trace);

        for (const py of [-5.55, 5.35]) {
          const pad = new THREE.Mesh(padGeo, mats.goldPlating);
          pad.position.set(px, py, 0);
          pad.userData.noEdges = true;
          g.add(pad);
        }
      }
    }

    // 24 flanking coplanar ground-stitching shield vias suppressing TX-to-RX crosstalk (InstancedMesh!)
    const viaGeo = hiResCyl(0.18, 0.18, 0.28, 10).rotateX(Math.PI / 2);
    const viaInst = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 24);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (const gx of [-7.5, -2.8, 1.9]) {
      for (let r = 0; r < 8; r++) {
        dm.position.set(gx, -4.9 + r * 1.4, -0.04);
        dm.updateMatrix();
        viaInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    viaInst.instanceMatrix.needsUpdate = true;
    viaInst.userData.noEdges = true;
    g.add(viaInst);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-diff-85ohm-serpentine',
        38,
        '#f59e0b',
        g,
        new THREE.Vector3(-4.0, -16.8, 0.52),
        new THREE.Vector3(-56, -68, 36),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C39. Laser Blind Micro-Vias & Stub-Free Back-Drilled High-Speed Vias
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 translucent cutaway HDI laminate planes visualizing L1 -> L4 -> L8 blind/buried/back-drilled transitions!
    for (let d = 0; d < 3; d++) {
      const deck = new THREE.Mesh(
        createChamferedBoxGeo(10.8, 8.2, 0.08, 0.25, 0.015, 'z'),
        d === 1 ? u.cfeGlassWeaveCore : u.cfeHdiPcb
      );
      deck.position.z = -0.46 + d * 0.46;
      g.add(deck);
    }

    const barrelBlind = hiResCyl(0.32, 0.24, 0.56, 14).rotateX(Math.PI / 2);
    const barrelBackdrilled = hiResCyl(0.30, 0.30, 0.68, 14).rotateX(Math.PI / 2);
    const backdrillCounterbore = hiResCyl(0.46, 0.46, 0.42, 14, true).rotateX(Math.PI / 2);
    const padGeo = hiResCyl(0.56, 0.56, 0.1, 16).rotateX(Math.PI / 2);

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        const isBlind = (r + c) % 2 === 0;
        const vx = -4.4 + c * 2.2;
        const vy = -3.3 + r * 2.2;
        const barrel = new THREE.Mesh(
          isBlind ? barrelBlind : barrelBackdrilled,
          isBlind ? mats.copperHybridBond : mats.goldPlating
        );
        barrel.position.set(vx, vy, isBlind ? 0.24 : 0.18);
        barrel.userData.noEdges = true;

        const capPad = new THREE.Mesh(padGeo, mats.goldPlating);
        capPad.position.set(vx, vy, 0.56);
        capPad.userData.noEdges = true;
        g.add(barrel, capPad);

        // Stub-removal back-drill counterbore sleeve on rear side of high-speed vias!
        if (!isBlind) {
          const bore = new THREE.Mesh(backdrillCounterbore, mats.vcWorkingFluidCyan);
          bore.position.set(vx, vy, -0.34);
          bore.userData.noEdges = true;
          g.add(bore);
        }
      }
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-backdrilled-microvias',
        39,
        '#d97706',
        g,
        new THREE.Vector3(-2.0, -4.5, 0),
        new THREE.Vector3(-30, -20, -56),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C40. Integrated 3.3 V eFuse & Soft-Start Inrush Load Switch IC
  // =========================================================================
  {
    const g = new THREE.Group();
    // Wide 2-oz copper 3.3V VIN / VOUT power planes under the eFuse MOSFET switch
    for (const px of [-1.25, 1.25]) {
      const plane = new THREE.Mesh(createChamferedBoxGeo(2.2, 4.2, 0.08, 0.14, 0.015, 'z'), mats.copperHeatSpreader);
      plane.position.set(px, 0, -0.38);
      plane.userData.noEdges = true;
      g.add(plane);
    }

    const efuse = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.74,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    // Low-mΩ current-sense shunt resistor (R_sense), slew-rate dV/dt MLCC & I_LIM resistor
    const rSense = buildSmdPassive(1.75, 0.92, 0.44, mats.matteBlackAnodized, mats.copperHeatSpreader, 'z');
    rSense.position.set(-2.95, 0, -0.08);
    const slewCap = buildSmdPassive(1.25, 0.68, 0.50, mats.smdCeramic, mats.silverElectrode, 'z');
    slewCap.position.set(2.85, 0.75, -0.08);
    const iLimRes = buildSmdPassive(1.15, 0.58, 0.40, mats.mountShimBlue, mats.silverElectrode, 'z');
    iLimRes.position.set(2.85, -0.75, -0.10);

    g.add(efuse, rSense, slewCap, iLimRes);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-efuse-hotplug-switch',
        40,
        '#0284c7',
        g,
        new THREE.Vector3(4.5, -19.8, 0.72),
        new THREE.Vector3(54, -68, 18),
        cp
      )
    );
  }

  // =========================================================================
  // C41. Multi-Rail Power Ferrite Beads & High-Frequency Noise Filters
  // =========================================================================
  {
    const g = new THREE.Group();
    // Local GND copper return rail tying the Pi-filter decoupling caps
    const gndBar = new THREE.Mesh(createChamferedBoxGeo(7.6, 0.55, 0.08, 0.12, 0.015, 'z'), mats.copperHeatSpreader);
    gndBar.position.set(0.1, -1.45, 0.34);
    gndBar.userData.noEdges = true;
    g.add(gndBar);

    for (let i = 0; i < 4; i++) {
      const fx = -2.4 + i * 1.65;
      const bead = buildSmdPassive(1.65, 0.88, 0.68, mats.ferriteInductor, mats.silverElectrode, 'z');
      bead.position.set(fx, 0.82, 0);

      // Visible internal copper micro-winding band wrapped on the alternating common-mode chokes
      if (i % 2 === 0) {
        const wind = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.94, 0.14), mats.copperCoil);
        wind.position.set(fx, 0.82, -0.34);
        wind.userData.noEdges = true;
        g.add(wind);
      }

      const capIn = buildSmdPassive(1.18, 0.64, 0.54, mats.smdCeramic, mats.silverElectrode, 'z');
      capIn.position.set(fx, -0.58, 0);
      const capOut = buildSmdPassive(1.02, 0.54, 0.44, mats.smdCeramic, mats.silverElectrode, 'z');
      capOut.position.set(fx, 2.02, 0.04);
      g.add(bead, capIn, capOut);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-ferrite-cm-choke',
        41,
        '#475569',
        g,
        new THREE.Vector3(6.5, -13.8, -0.78),
        new THREE.Vector3(80, -42, -26),
        cp
      )
    );
  }

  // =========================================================================
  // C42. PCIe Sideband Control Logic (PERST# Reset & CLKREQ# L1.2 Power Saving)
  // =========================================================================
  {
    const g = new THREE.Group();
    const logicIc = buildChipPackage({
      w: 2.65,
      d: 2.25,
      h: 0.66,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.cfaGreen,
      axis: 'z',
    });

    // 3 color-coded sideband signal lanes (PERST# red, CLKREQ# green, WAKE# gold) + pull-up resistors + RC delay cap!
    const laneMats = [mats.cinnabarAnodized, mats.cfaGreen, mats.goldPlating];
    const tpGeo = hiResCyl(0.24, 0.24, 0.12, 12).rotateX(Math.PI / 2);
    for (let i = 0; i < 3; i++) {
      const lx = -1.25 + i * 1.25;
      const pullup = buildSmdPassive(1.05, 0.58, 0.44, mats.matteBlackAnodized, mats.silverElectrode, 'z');
      pullup.position.set(lx, -2.05, -0.05);
      const lane = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 0.08), laneMats[i]);
      lane.position.set(lx, -0.75, -0.28);
      lane.userData.noEdges = true;
      const tp = new THREE.Mesh(tpGeo, mats.goldPlating);
      tp.position.set(lx, 1.95, -0.24);
      tp.userData.noEdges = true;
      g.add(pullup, lane, tp);
    }
    const rcCap = buildSmdPassive(1.05, 0.56, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
    rcCap.position.set(2.4, 0, -0.06);
    g.add(logicIc, rcCap);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-pcie-sideband-logic',
        42,
        '#16a34a',
        g,
        new THREE.Vector3(-10.8, -19.6, 0.72),
        new THREE.Vector3(-78, -62, 16),
        cp
      )
    );
  }

  // =========================================================================
  // C43. PLP Hold-Up Capacitor Health Monitor Circuit & Bleed-Check Resistors
  // =========================================================================
  {
    const g = new THREE.Group();
    const monIc = buildChipPackage({
      w: 2.85,
      d: 2.85,
      h: 0.66,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.tantalumCapYellow,
      axis: 'z',
    });
    monIc.rotation.y = Math.PI;

    // MOSFET pulse-discharge test switch (SOT-23) + twin precision bleed resistors + Kelvin sense bus
    const mosfet = buildChipPackage({
      w: 1.85,
      d: 1.45,
      h: 0.54,
      style: 'sot23',
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    mosfet.rotation.y = Math.PI;
    mosfet.position.set(-2.95, 0, 0.04);

    for (let i = 0; i < 2; i++) {
      const bleed = buildSmdPassive(1.85, 0.92, 0.5, mats.matteBlackAnodized, mats.copperHeatSpreader, 'z');
      bleed.position.set(-1.1 + i * 2.2, 2.25, 0);
      g.add(bleed);
    }
    const divCap = buildSmdPassive(1.15, 0.60, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
    divCap.position.set(2.55, 0, 0.04);
    const senseBus = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.22, 0.08), mats.goldPlating);
    senseBus.position.set(-0.2, 1.15, 0.30);
    senseBus.userData.noEdges = true;

    g.add(monIc, mosfet, divCap, senseBus);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-plp-cap-health-mcu',
        43,
        '#eab308',
        g,
        new THREE.Vector3(-10.2, -5.2, -0.82),
        new THREE.Vector3(-82, -2, -42),
        cp
      )
    );
  }

  // =========================================================================
  // C44. Factory JTAG / UART / ROM-Recovery Micro Test Pads
  // =========================================================================
  {
    const g = new THREE.Group();
    const strip = new THREE.Mesh(
      createChamferedBoxGeo(2.65, 15.6, 0.16, 0.35, 0.02, 'z'),
      u.cfeHdiPcb
    );
    g.add(strip);

    const padGeo = hiResCyl(0.62, 0.62, 0.22, 18).rotateX(Math.PI / 2);
    const ringGeo = hiResTorus(0.76, 0.06, 6, 18);
    const viaGeo = hiResCyl(0.18, 0.18, 0.26, 10).rotateX(Math.PI / 2);

    for (let i = 0; i < 8; i++) {
      const px = i % 2 === 0 ? -0.45 : 0.45;
      const py = -6.3 + i * 1.8;
      // Pin-1 square ROM-recovery pad + 7 circular ENIG gold pogo-pin pads with clearance rings & breakout vias!
      const pad =
        i === 0
          ? new THREE.Mesh(createChamferedBoxGeo(1.15, 1.15, 0.22, 0.12, 0.03, 'z'), mats.goldPlating)
          : new THREE.Mesh(padGeo, mats.goldPlating);
      pad.position.set(px, py, -0.08);
      pad.userData.noEdges = true;

      const clearRing = new THREE.Mesh(ringGeo, mats.silverElectrode);
      clearRing.position.set(px, py, -0.14);
      clearRing.userData.noEdges = true;

      const breakout = new THREE.Mesh(viaGeo, mats.copperCoil);
      breakout.position.set(-px * 1.9, py, 0);
      breakout.userData.noEdges = true;
      g.add(pad, clearRing, breakout);
    }

    // Silkscreen orientation index bar along left edge of JTAG header
    const silkBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 14.2, 0.06), mats.silverElectrode);
    silkBar.position.set(-1.15, 0, -0.12);
    silkBar.userData.noEdges = true;
    g.add(silkBar);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-jtag-uart-test-pads',
        44,
        '#f59e0b',
        g,
        new THREE.Vector3(15.2, 2.5, -0.56),
        new THREE.Vector3(86, 22, -36),
        cp
      )
    );
  }

  // =========================================================================
  // C45. SMT Optical Alignment Fiducial Marks (Pick-and-Place Bullseyes)
  // =========================================================================
  {
    const g = new THREE.Group();
    const fidPos: Array<[number, number]> = [
      [-15.2, -20.5],
      [15.2, -20.5],
      [15.2, 21.8],
    ];
    const clearGeo = hiResCyl(1.55, 1.55, 0.14, 24).rotateX(Math.PI / 2);
    const guardGeo = hiResTorus(1.48, 0.08, 6, 24);
    const bullGeo = hiResCyl(0.84, 0.84, 0.22, 22).rotateX(Math.PI / 2);
    const crossHGeo = new THREE.BoxGeometry(2.6, 0.08, 0.06);
    const crossVGeo = new THREE.BoxGeometry(0.08, 2.6, 0.06);

    for (const [fx, fy] of fidPos) {
      const clearanceRing = new THREE.Mesh(clearGeo, mats.pcbEdgeLaminate);
      clearanceRing.position.set(fx, fy, 0);
      clearanceRing.userData.noEdges = true;

      const guardRing = new THREE.Mesh(guardGeo, mats.copperCoil);
      guardRing.position.set(fx, fy, 0.09);
      guardRing.userData.noEdges = true;

      const bullseye = new THREE.Mesh(bullGeo, mats.goldPlating);
      bullseye.position.set(fx, fy, 0.04);
      bullseye.userData.noEdges = true;

      const crossH = new THREE.Mesh(crossHGeo, mats.silverElectrode);
      crossH.position.set(fx, fy, 0.16);
      crossH.userData.noEdges = true;
      const crossV = new THREE.Mesh(crossVGeo, mats.silverElectrode);
      crossV.position.set(fx, fy, 0.16);
      crossV.userData.noEdges = true;
      g.add(clearanceRing, guardRing, bullseye, crossH, crossV);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-optical-fiducials',
        45,
        '#fbbf24',
        g,
        new THREE.Vector3(0, 0, 0.54),
        new THREE.Vector3(84, -18, 40),
        cp
      )
    );
  }

  // =========================================================================
  // C46. Plasma Hydrophobic Nano-Coating (Sub-500 nm Moisture Barrier)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Crisp hollow cyan perimeter hydrophobic vapor-seal frame + inner stepped molecular lip
    const nanoRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(33.2, 44.8, 1.5, 31.8, 43.4, 1.2), 0.16, 0.02, 0.02, 1, 20),
      mats.fluorineCoatCyan
    );
    const uvTracer = new THREE.Mesh(
      extrudeHiRes(createFrameShape(32.1, 43.7, 1.25, 31.5, 43.1, 1.15), 0.10, 0.015, 0.015, 1, 18),
      mats.vcWorkingFluidCyan
    );
    uvTracer.position.z = 0.08;
    uvTracer.userData.noEdges = true;
    g.add(nanoRim, uvTracer);

    // 8 gleaming micro-scale hydrophobic beading droplets (>115° contact angle!) around frame perimeter
    const dropGeo = hiResSphere(0.42, 12, 10);
    for (const [dx, dy, sc] of [
      [-14.8, 20.6, 1.05],
      [14.8, 20.6, 0.95],
      [-14.8, -20.6, 0.92],
      [14.8, -20.6, 1.05],
      [-16.2, 6.2, 0.78],
      [16.2, 6.2, 0.82],
      [-16.2, -7.8, 0.85],
      [16.2, -7.8, 0.76],
    ]) {
      const drop = new THREE.Mesh(dropGeo, mats.vcWorkingFluidCyan);
      drop.position.set(dx, dy, 0.18);
      drop.scale.set(sc, sc, sc * 0.72);
      drop.userData.noEdges = true;
      g.add(drop);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-conformal-nano-coat',
        46,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 1.5, 0.65),
        new THREE.Vector3(-76, 36, 8),
        cp,
        0.14
      )
    );
  }

  // =========================================================================
  // C47. Low-Dk / Low-Df Dielectric Solder Mask & Solid Copper Reference GND Plane
  // =========================================================================
  {
    const g = new THREE.Group();
    const gndGeo = extrudeHiRes(createRoundedRectShape(34.2, 46.5, 1.5), 0.16, 0.03, 0.03, 1, 18);
    applyPlanarUVs(gndGeo, 34.2, 46.5, 'xy');
    const gndPlane = new THREE.Mesh(gndGeo, u.cfeCopperThermal);

    // Anti-pad thermal relief clearances & ground plane isolation moat ribs embossed on L2 copper face
    const moatGeo = createChamferedBoxGeo(12.2, 12.2, 0.06, 0.5, 0.01, 'z');
    const socMoat = new THREE.Mesh(moatGeo, mats.copperHeatSpreader);
    socMoat.position.set(-6.2, -10.0, 0.10);
    socMoat.userData.noEdges = true;

    const maskGeo = extrudeHiRes(createRoundedRectShape(34.6, 47.0, 1.6), 0.14, 0.02, 0.02, 1, 18);
    applyPlanarUVs(maskGeo, 34.6, 47.0, 'xy-back');
    const maskSheet = new THREE.Mesh(maskGeo, u.cfeHdiPcb);
    maskSheet.position.z = -0.16;

    // White/silver silkscreen reference perimeter index & component outline border on rear mask face
    const silkFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(33.0, 45.2, 1.4, 32.4, 44.6, 1.3), 0.05, 0.01, 0.01, 1, 16),
      mats.silverElectrode
    );
    silkFrame.position.z = -0.25;
    silkFrame.userData.noEdges = true;

    g.add(gndPlane, socMoat, maskSheet, silkFrame);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-solder-mask-silkscreen',
        47,
        '#15803d',
        g,
        new THREE.Vector3(0, 1.2, -0.52),
        new THREE.Vector3(0, -34, -66),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C48. Controller SoC Flip-Chip C4 Solder Bumps & Copper Pillar Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const dieGeo = createChamferedBoxGeo(9.6, 9.6, 0.24, 0.25, 0.03, 'z');
    applyPlanarUVs(dieGeo, 9.6, 9.6, 'xy');
    const siliconBase = new THREE.Mesh(dieGeo, u.bionzDieFloorplan);
    siliconBase.position.z = 0.24;

    // Polyimide passivation guard collar around flipped die perimeter
    const passRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(9.5, 9.5, 0.24, 8.7, 8.7, 0.18), 0.10, 0.02, 0.02, 1, 14),
      mats.polyimideFpc
    );
    passRing.position.z = 0.10;
    passRing.userData.noEdges = true;
    g.add(siliconBase, passRing);

    // 7×7 smooth hi-res UBM + Copper Pillar + spherical SAC305 C4 micro-bump array (InstancedMesh!)
    const ubmGeo = hiResCyl(0.32, 0.32, 0.08, 12).rotateX(Math.PI / 2);
    const pillarGeo = hiResCyl(0.26, 0.26, 0.24, 12).rotateX(Math.PI / 2);
    const ballGeo = hiResSphere(0.26, 8, 6);
    const ubmInst = new THREE.InstancedMesh(ubmGeo, mats.titaniumRivet, 49);
    const pillarInst = new THREE.InstancedMesh(pillarGeo, mats.copperHybridBond, 49);
    const ballInst = new THREE.InstancedMesh(ballGeo, mats.solderBallSilver, 49);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const bx = -3.9 + c * 1.3;
        const by = -3.9 + r * 1.3;
        dm.position.set(bx, by, 0.10);
        dm.updateMatrix();
        ubmInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(bx, by, -0.04);
        dm.updateMatrix();
        pillarInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(bx, by, -0.22);
        dm.updateMatrix();
        ballInst.setMatrixAt(idx, dm.matrix);
        idx++;
      }
    }
    for (const inst of [ubmInst, pillarInst, ballInst]) {
      inst.instanceMatrix.needsUpdate = true;
      inst.userData.noEdges = true;
      g.add(inst);
    }

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-flipchip-c4-bumps',
        48,
        '#b45309',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.88),
        new THREE.Vector3(-96, -38, 22),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C49. Multi-Layer ABF / BT Package Interposer Substrate & RDL Fan-Out
  // =========================================================================
  {
    const g = new THREE.Group();
    const abfGeo = extrudeHiRes(createRoundedRectShape(12.0, 12.0, 0.75), 0.34, 0.05, 0.05, 2, 18);
    applyPlanarUVs(abfGeo, 12.0, 12.0, 'xy');
    const abfCore = new THREE.Mesh(abfGeo, u.bionzAbfSubstrate);

    // Visible 6-layer ABF build-up copper strata ring along substrate perimeter edge
    for (const lz of [-0.10, 0.0, 0.10]) {
      const strata = new THREE.Mesh(
        extrudeHiRes(createFrameShape(12.06, 12.06, 0.76, 11.78, 11.78, 0.70), 0.04, 0.01, 0.01, 1, 14),
        mats.copperCoil
      );
      strata.position.z = lz;
      strata.userData.noEdges = true;
      g.add(strata);
    }

    // Inner flip-chip landing frame + 16 radiating golden RDL fan-out microstrips!
    const dieRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(5.2, 5.2, 0.35, 4.4, 4.4, 0.25), 0.10, 0.02, 0.02, 1, 12),
      mats.goldPlating
    );
    dieRing.position.z = 0.20;
    dieRing.userData.noEdges = true;

    const rdlGeo = new THREE.BoxGeometry(3.8, 0.20, 0.08);
    for (let k = 0; k < 16; k++) {
      const ang = (k * Math.PI) / 8;
      const rdl = new THREE.Mesh(rdlGeo, k % 2 === 0 ? mats.goldPlating : mats.copperCoil);
      rdl.position.set(Math.cos(ang) * 3.85, Math.sin(ang) * 3.85, 0.20);
      rdl.rotation.z = ang;
      rdl.userData.noEdges = true;
      g.add(rdl);
    }

    // 24 perimeter micro-vias terminating the RDL fan-out ring (InstancedMesh!)
    const mvGeo = hiResCyl(0.20, 0.20, 0.42, 10).rotateX(Math.PI / 2);
    const mvInst = new THREE.InstancedMesh(mvGeo, mats.goldPlating, 24);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 24; i++) {
      const side = Math.floor(i / 6);
      const t = ((i % 6) - 2.5) * 1.75;
      const vx = side === 0 ? t : side === 1 ? 5.15 : side === 2 ? -t : -5.15;
      const vy = side === 0 ? 5.15 : side === 1 ? -t : side === 2 ? -5.15 : t;
      dm.position.set(vx, vy, 0.02);
      dm.updateMatrix();
      mvInst.setMatrixAt(i, dm.matrix);
    }
    mvInst.instanceMatrix.needsUpdate = true;
    mvInst.userData.noEdges = true;

    g.add(abfCore, dieRing, mvInst);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-abf-package-substrate',
        49,
        '#0f766e',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.66),
        new THREE.Vector3(-94, -14, 48),
        cp
      )
    );
  }

  // =========================================================================
  // C50. 16-Die Staggered Offset Stacked 3D NAND Dies (16DP) & Dummy Spacer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic 16-die dual opposing-staircase 3D TLC NAND stack (8-die lower +X staircase -> alumina spacer -> 8-die upper -X staircase!)
    const dieGeo = createChamferedBoxGeo(14.8, 11.6, 0.068, 0.14, 0.014, 'z');
    applyPlanarUVs(dieGeo, 14.8, 11.6, 'xy');
    const dafGeo = new THREE.BoxGeometry(14.5, 11.3, 0.022);
    const ledgeGeo = new THREE.BoxGeometry(0.24, 10.4, 0.025);

    for (let d = 0; d < 17; d++) {
      const isSpacer = d === 8;
      const zPos = -0.78 + d * 0.095;
      const xOff = d < 8 ? -1.55 + d * 0.36 : d === 8 ? 0 : 1.55 - (d - 9) * 0.36;
      const die = new THREE.Mesh(dieGeo, isSpacer ? mats.ceramicAlumina : d % 2 === 0 ? u.bionzIpDieTile : u.cfeBiCS10WaferDie);
      die.position.set(xOff, 0, zPos);
      g.add(die);

      if (!isSpacer) {
        const daf = new THREE.Mesh(dafGeo, mats.polyimideFpc);
        daf.position.set(xOff, 0, zPos - 0.044);
        daf.userData.noEdges = true;
        // Gold wirebond pad shelf exposed cleanly on the stepped overhang edge of EVERY die!
        const ledge = new THREE.Mesh(ledgeGeo, mats.goldPlating);
        ledge.position.set(xOff + (d < 8 ? 7.12 : -7.12), 0, zPos + 0.042);
        ledge.userData.noEdges = true;
        g.add(daf, ledge);
      }
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-staggered-16die',
        50,
        '#0284c7',
        g,
        new THREE.Vector3(0, 12.6, 1.05),
        new THREE.Vector3(-76, 56, 36),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C51. Die Attach Film (DAF) & Multi-Tier Ultra-Fine Gold/Copper Bond Wires
  // =========================================================================
  {
    const g = new THREE.Group();
    for (let tier = 0; tier < 6; tier++) {
      const daf = new THREE.Mesh(
        createChamferedBoxGeo(14.8, 11.2, 0.06, 0.16, 0.01, 'z'),
        mats.polyimideFpc
      );
      daf.position.set(-1.1 + tier * 0.42, 0, -0.58 + tier * 0.22);
      daf.userData.noEdges = true;
      g.add(daf);
    }

    // Gold ENEPIG substrate wirebond landing finger strip along the right flank
    const fingerStrip = new THREE.Mesh(createChamferedBoxGeo(1.85, 11.4, 0.16, 0.18, 0.02, 'z'), u.bionzAbfSubstrate);
    fingerStrip.position.set(10.55, 0, -0.62);
    g.add(fingerStrip);

    // 14 sweeping multi-tier cascading ball-to-stitch gold wirebond loops with FAB balls & wedge feet!
    const ballGeo = hiResSphere(0.14, 8, 6);
    const padGeo = new THREE.BoxGeometry(0.85, 0.28, 0.06);
    for (let w = 0; w < 14; w++) {
      const wy = -5.2 + w * 0.80;
      const tier = w % 4;
      const sx = 6.45 + tier * 0.44;
      const sz = -0.34 + tier * 0.30;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sx, wy, sz),
        new THREE.Vector3(sx + 0.32, wy, sz + 0.56),
        new THREE.Vector3(sx + 1.55, wy, sz + 0.48),
        new THREE.Vector3(9.45, wy, -0.15),
        new THREE.Vector3(10.35, wy, -0.52),
      ]);
      const wire = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(curve, 14, 0.06, 6, false)),
        w % 3 === 0 ? mats.copperCoil : mats.goldPlating
      );
      wire.userData.noEdges = true;

      const fab = new THREE.Mesh(ballGeo, mats.goldPlating);
      fab.position.set(sx, wy, sz);
      fab.userData.noEdges = true;

      const landPad = new THREE.Mesh(padGeo, mats.goldPlating);
      landPad.position.set(10.45, wy, -0.52);
      landPad.userData.noEdges = true;
      g.add(wire, fab, landPad);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-daf-gold-wires',
        51,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 12.6, 0.85),
        new THREE.Vector3(-96, 36, 16),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C52. High-Thermal EMC Mold Resin & SAC305 Lead-Free BGA Solder Balls
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cutaway black EMC mold shell with beveled draft lip, Pin-1 gold index & injection mold gate tab
    const emcFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(22.4, 17.4, 0.85, 17.6, 12.6, 0.55), 0.72, 0.10, 0.10, 2, 18),
      u.icEpoxyLaser
    );
    emcFrame.position.z = 0.35;

    const pin1Dot = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.06, 14).rotateX(Math.PI / 2), mats.goldPlating);
    pin1Dot.position.set(-9.6, -7.2, 0.74);
    pin1Dot.userData.noEdges = true;

    const moldGate = new THREE.Mesh(createChamferedBoxGeo(1.2, 2.2, 0.42, 0.12, 0.04, 'z'), mats.matteBlackAnodized);
    moldGate.position.set(11.35, 0, 0.32);
    moldGate.userData.noEdges = true;
    g.add(emcFrame, pin1Dot, moldGate);

    // 9×6 dense spherical SAC305 lead-free BGA solder balls seated on circular copper lands (InstancedMesh!)
    const landGeo = hiResCyl(0.46, 0.46, 0.08, 12).rotateX(Math.PI / 2);
    const ballGeo = hiResSphere(0.38, 10, 8);
    const landInst = new THREE.InstancedMesh(landGeo, mats.copperHybridBond, 54);
    const ballInst = new THREE.InstancedMesh(ballGeo, mats.solderBallSilver, 54);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 9; c++) {
        const bx = -8.4 + c * 2.1;
        const by = -5.5 + r * 2.2;
        dm.position.set(bx, by, 0.02);
        dm.updateMatrix();
        landInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(bx, by, -0.24);
        dm.updateMatrix();
        ballInst.setMatrixAt(idx, dm.matrix);
        idx++;
      }
    }
    landInst.instanceMatrix.needsUpdate = true;
    ballInst.instanceMatrix.needsUpdate = true;
    landInst.userData.noEdges = true;
    ballInst.userData.noEdges = true;
    g.add(landInst, ballInst);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-emc-mold-balls',
        52,
        '#64748b',
        g,
        new THREE.Vector3(0, 12.6, 0.58),
        new THREE.Vector3(0, 68, -42),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C53. Controller On-Die High-Speed SRAM Buffer & NVMe HMB DMA Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const sramGeo = createChamferedBoxGeo(5.6, 4.6, 0.34, 0.18, 0.04, 'z');
    applyPlanarUVs(sramGeo, 5.6, 4.6, 'xy');
    const sramTile = new THREE.Mesh(sramGeo, u.bionzIpDieTile);

    // 4 distinct banked 6T SRAM sub-arrays + central wordline decoder spine + ECC tag stripe!
    const bankGeo = createChamferedBoxGeo(2.05, 1.32, 0.16, 0.08, 0.02, 'z');
    for (const dx of [-1.35, 1.35]) {
      for (const dy of [-0.55, 1.15]) {
        const bank = new THREE.Mesh(bankGeo, mats.siliconTsvDram);
        bank.position.set(dx, dy, 0.22);
        bank.userData.noEdges = true;
        g.add(bank);
      }
    }
    const decoderSpine = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.2, 0.18), mats.copperHybridBond);
    decoderSpine.position.set(0, 0.3, 0.24);
    decoderSpine.userData.noEdges = true;

    const dmaBridge = new THREE.Mesh(createChamferedBoxGeo(4.8, 0.62, 0.16, 0.08, 0.02, 'z'), mats.goldPlating);
    dmaBridge.position.set(0, -1.72, 0.24);
    dmaBridge.userData.noEdges = true;

    const eccStrip = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.24, 0.14), mats.cfaGreen);
    eccStrip.position.set(0, 2.02, 0.23);
    eccStrip.userData.noEdges = true;

    g.add(sramTile, decoderSpine, dmaBridge, eccStrip);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-hmb-sram-controller-buf',
        53,
        '#8b5cf6',
        g,
        new THREE.Vector3(-3.5, -6.5, 1.32),
        new THREE.Vector3(-46, -10, 64),
        cp
      )
    );
  }

  // =========================================================================
  // C54. Next-Gen CBA Wafer-to-Wafer Cu-Cu Hybrid Bonding (Kioxia BiCS8–10)
  // =========================================================================
  {
    const g = new THREE.Group();
    const arrGeo = createChamferedBoxGeo(11.4, 8.0, 0.24, 0.22, 0.03, 'z');
    applyPlanarUVs(arrGeo, 11.4, 8.0, 'xy');
    const arrayWafer = new THREE.Mesh(arrGeo, u.cfeBiCS10WaferDie);
    arrayWafer.position.z = 0.30;

    const cmosGeo = createChamferedBoxGeo(11.4, 8.0, 0.24, 0.22, 0.03, 'z');
    applyPlanarUVs(cmosGeo, 11.4, 8.0, 'xy');
    const cmosWafer = new THREE.Mesh(cmosGeo, u.bionzCetusDie);
    cmosWafer.position.z = -0.30;

    // Translucent SiCN hydrophilic wafer-to-wafer fusion dielectric ring framing the Cu-Cu bond zone
    const sicnRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(11.2, 7.8, 0.22, 10.1, 6.7, 0.16), 0.28, 0.02, 0.02, 1, 14),
      mats.quartzOlpf
    );
    sicnRing.userData.noEdges = true;
    g.add(arrayWafer, cmosWafer, sicnRing);

    // 9×6 ultra-dense face-to-face bumpless Cu-Cu hybrid bonding micro-pad array (InstancedMesh!)
    const padGeo = hiResCyl(0.26, 0.26, 0.36, 12).rotateX(Math.PI / 2);
    const padInst = new THREE.InstancedMesh(padGeo, mats.copperHybridBond, 54);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 9; c++) {
        dm.position.set(-4.6 + c * 1.15, -2.75 + r * 1.1, 0);
        dm.updateMatrix();
        padInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    padInst.instanceMatrix.needsUpdate = true;
    padInst.userData.noEdges = true;
    g.add(padInst);

    // 4 corner TSV power-delivery vias passing cleanly through the bonded stack
    const tsvGeo = hiResCyl(0.32, 0.32, 0.88, 12).rotateX(Math.PI / 2);
    for (const [tx, ty] of [
      [-4.9, 3.2],
      [4.9, 3.2],
      [-4.9, -3.2],
      [4.9, -3.2],
    ]) {
      const tsv = new THREE.Mesh(tsvGeo, mats.goldPlating);
      tsv.position.set(tx, ty, 0);
      tsv.userData.noEdges = true;
      g.add(tsv);
    }

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-cba-cu-hybrid-bond',
        54,
        '#d97706',
        g,
        new THREE.Vector3(0, 14.5, 1.24),
        new THREE.Vector3(-52, 74, 58),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C55. Crossed Bit Line (CBL) & CMOS-under-Array (CuA) Peripheral Floor
  // =========================================================================
  {
    const g = new THREE.Group();
    const cuaGeo = createChamferedBoxGeo(11.4, 7.8, 0.24, 0.2, 0.03, 'z');
    applyPlanarUVs(cuaGeo, 11.4, 7.8, 'xy');
    const cuaFloor = new THREE.Mesh(cuaGeo, u.bionzIpDieTile);

    // M0/M1 horizontal local copper Bitlines + M2 vertical gold Global Bitlines!
    const blXGeo = new THREE.BoxGeometry(10.6, 0.20, 0.09);
    for (let i = -3; i <= 3; i++) {
      const blX = new THREE.Mesh(blXGeo, mats.copperCoil);
      blX.position.set(0, i * 1.05, 0.17);
      blX.userData.noEdges = true;
      g.add(blX);
    }
    const blYGeo = new THREE.BoxGeometry(0.22, 7.2, 0.10);
    for (let j = -2; j <= 2; j++) {
      const blY = new THREE.Mesh(blYGeo, mats.goldPlating);
      blY.position.set(j * 2.2, 0, 0.30);
      blY.userData.noEdges = true;
      g.add(blY);
    }

    // 35 vertical bitline contact vias connecting orthogonal crosspoints down to CuA sense-amps (InstancedMesh!)
    const viaGeo = hiResCyl(0.14, 0.14, 0.26, 8).rotateX(Math.PI / 2);
    const viaInst = new THREE.InstancedMesh(viaGeo, mats.vcWorkingFluidCyan, 35);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let i = -3; i <= 3; i++) {
      for (let j = -2; j <= 2; j++) {
        dm.position.set(j * 2.2, i * 1.05, 0.22);
        dm.updateMatrix();
        viaInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    viaInst.instanceMatrix.needsUpdate = true;
    viaInst.userData.noEdges = true;

    g.add(cuaFloor, viaInst);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-crossed-bitline-cbl',
        55,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 11.2, 1.22),
        new THREE.Vector3(56, 58, 42),
        cp
      )
    );
  }

  // =========================================================================
  // C56. Atomic-Scale ONO Charge-Trap Stack (Tunnel SiO₂ / Si₃N₄ / Al₂O₃)
  // =========================================================================
  {
    const g = new THREE.Group();
    const tilt = new THREE.Group();
    // Smooth 36-segment concentric atomic cutaway walls of a 3D NAND Macaroni Charge-Trap cell!
    const oxideFiller = new THREE.Mesh(hiResCyl(0.68, 0.68, 1.22, 28), mats.quartzOlpf);
    const polyChannel = new THREE.Mesh(hiResCyl(1.18, 1.18, 1.10, 36, true, 0, Math.PI * 1.68), mats.gatePolysilicon);
    const tunnelOx = new THREE.Mesh(hiResCyl(1.75, 1.75, 0.96, 36, true, 0, Math.PI * 1.50), mats.ftiOxide);
    const nitrideTrap = new THREE.Mesh(hiResCyl(2.45, 2.45, 0.82, 36, true, 0, Math.PI * 1.30), mats.loficDielectric);
    const aluminaBlock = new THREE.Mesh(hiResCyl(3.12, 3.12, 0.68, 36, true, 0, Math.PI * 1.12), mats.aluminaHighKFilm);

    // 10 glowing golden trapped electron spheres suspended right inside the Si3N4 charge-trap nitride cylinder!
    const eGeo = hiResSphere(0.18, 10, 8);
    for (let i = 0; i < 10; i++) {
      const ang = 0.25 + (i / 9) * (Math.PI * 1.1);
      const e = new THREE.Mesh(eGeo, mats.goldPlating);
      e.position.set(Math.sin(ang) * 2.42, (i % 2 === 0 ? 1 : -1) * 0.16, Math.cos(ang) * 2.42);
      e.userData.noEdges = true;
      tilt.add(e);
    }

    // Outer Barrierless Molybdenum control-gate collar + top Bitline contact stud
    const gateCollar = new THREE.Mesh(hiResTorus(3.46, 0.20, 12, 34, Math.PI * 1.05), u.cfeMolyWordlineMetal);
    gateCollar.rotation.x = Math.PI / 2;
    gateCollar.userData.noEdges = true;

    const blCap = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.22, 16), mats.copperHeatSpreader);
    blCap.position.y = 0.64;
    blCap.userData.noEdges = true;

    tilt.add(oxideFiller, polyChannel, tunnelOx, nitrideTrap, aluminaBlock, gateCollar, blCap);
    tilt.rotation.x = Math.PI / 2;
    g.add(tilt);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-ono-charge-trap-stack',
        56,
        '#a855f7',
        g,
        new THREE.Vector3(5.5, 15.8, 1.15),
        new THREE.Vector3(34, 72, 52),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C57. Tungsten / Molybdenum Wordline Staircase Decoder Contact Structure
  // =========================================================================
  {
    const g = new THREE.Group();
    // 10-tier Mayan-pyramid tungsten/molybdenum wordline staircase + vertical gold contact vias + top M1 decoder routing bus!
    const topBusZ = 0.66;
    for (let step = 0; step < 10; step++) {
      const w = 11.4 - step * 0.94;
      const deckZ = -0.48 + step * 0.095;
      const deck = new THREE.Mesh(
        createChamferedBoxGeo(w, 6.2, 0.075, 0.12, 0.015, 'z'),
        step % 2 === 0 ? u.cfeMolyWordlineMetal : mats.tungstenCopper
      );
      deck.position.set(-step * 0.47, 0, deckZ);
      g.add(deck);

      // Vertical tungsten contact plug landing precisely on the exposed terrace of EVERY wordline step!
      const pillarH = topBusZ - deckZ;
      const px = w * 0.5 - step * 0.47 - 0.36;
      const py = -2.1 + (step % 5) * 1.05;
      const pillar = new THREE.Mesh(hiResCyl(0.16, 0.16, pillarH, 10).rotateX(Math.PI / 2), mats.goldPlating);
      pillar.position.set(px, py, deckZ + pillarH * 0.5);
      pillar.userData.noEdges = true;

      // Top M1 copper wordline routing strap running back to the left-side Row Decoder header!
      const strapLen = px + 5.7;
      const strap = new THREE.Mesh(new THREE.BoxGeometry(strapLen, 0.18, 0.07), mats.copperCoil);
      strap.position.set(-5.7 + strapLen * 0.5, py, topBusZ);
      strap.userData.noEdges = true;
      g.add(pillar, strap);
    }

    // Left-side CMOS Row Decoder drive rail tying all 10 wordline straps
    const rowDec = new THREE.Mesh(createChamferedBoxGeo(0.95, 6.2, 0.24, 0.14, 0.03, 'z'), mats.siliconLogicLayer);
    rowDec.position.set(-6.05, 0, 0.58);
    g.add(rowDec);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-wordline-staircase',
        57,
        '#64748b',
        g,
        new THREE.Vector3(-7.5, 15.8, 1.15),
        new THREE.Vector3(-86, 66, -6),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C58. On-Die High-Voltage Charge Pump (20 V ISPP Pulse Generator)
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(9.4, 4.8, 0.22, 0.18, 0.03, 'z');
    applyPlanarUVs(baseGeo, 9.4, 4.8, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzIpDieTile);
    g.add(base);

    // 6 ascending Dickson charge-pump stages (1.8V -> 20V) + inter-stage transfer diodes + Φ1/Φ2 clock buses!
    for (let st = 0; st < 6; st++) {
      const sx = -3.65 + st * 1.46;
      const h = 0.20 + st * 0.072;
      const stageCap = new THREE.Mesh(
        createChamferedBoxGeo(1.02, 2.8, h, 0.12, 0.03, 'z'),
        st >= 4 ? mats.cinnabarAnodized : st >= 2 ? mats.copperHeatSpreader : mats.tantalumCapYellow
      );
      stageCap.position.set(sx, 0, 0.12 + h * 0.5);
      g.add(stageCap);

      // Diode-connected MOSFET transfer switch bridging stage N -> N+1
      if (st < 5) {
        const sw = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.52, 0.14), mats.goldPlating);
        sw.position.set(sx + 0.73, 0, 0.24 + st * 0.06);
        sw.userData.noEdges = true;
        g.add(sw);
      }
    }
    // Dual opposing clock-phase Φ1 / Φ2 interdigitated drive rails along top & bottom
    for (const [cy, mat] of [
      [1.82, mats.vcWorkingFluidCyan],
      [-1.82, mats.goldPlating],
    ] as Array<[number, THREE.Material]>) {
      const clk = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.26, 0.12), mat);
      clk.position.set(0, cy, 0.20);
      clk.userData.noEdges = true;
      g.add(clk);
    }

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-charge-pump',
        58,
        '#ef4444',
        g,
        new THREE.Vector3(8.5, 12.6, 1.15),
        new THREE.Vector3(84, 52, 16),
        cp
      )
    );
  }

  // =========================================================================
  // C59. High-Speed 16 KB Page Buffer & 8-Level TLC Sense Amplifier Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(9.4, 4.8, 0.22, 0.18, 0.03, 'z');
    applyPlanarUVs(baseGeo, 9.4, 4.8, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzIpDieTile);
    g.add(base);

    // 8 stepped TLC Vth sense-amplifier comparators (E, A..G) + upper 3-latch XDL/LDL/UDL page buffer banks!
    for (let lv = 0; lv < 8; lv++) {
      const barH = 0.16 + lv * 0.055;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.76, 2.1, barH, 0.1, 0.02, 'z'),
        lv % 2 === 0 ? mats.cfaBlue : mats.vcWorkingFluidCyan
      );
      bar.position.set(-3.5 + lv * 1.0, -0.65, 0.12 + barH * 0.5);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    // 3 dedicated horizontal XDL / LDL / UDL 16KB cache latch banks along top
    const latchMats = [mats.goldPlating, mats.cfaGreen, mats.copperHybridBond];
    for (let k = 0; k < 3; k++) {
      const latch = new THREE.Mesh(createChamferedBoxGeo(2.65, 0.86, 0.20, 0.10, 0.02, 'z'), latchMats[k]);
      latch.position.set(-2.85 + k * 2.85, 1.48, 0.22);
      latch.userData.noEdges = true;
      g.add(latch);
    }

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-sense-amp-page-buf',
        59,
        '#3b82f6',
        g,
        new THREE.Vector3(4.5, 9.2, 1.15),
        new THREE.Vector3(84, 34, 48),
        cp
      )
    );
  }

  // =========================================================================
  // C60. Proactive Read-Reclaim, Early-Move & Background Data Retention Scrubber
  // =========================================================================
  {
    const g = new THREE.Group();
    const scrubberBase = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 5.4, 0.24, 0.24, 0.04, 'z'),
      u.icEpoxyLaser
    );
    const fadingBlock = new THREE.Mesh(
      createChamferedBoxGeo(2.25, 3.2, 0.28, 0.18, 0.04, 'z'),
      mats.tantalumCapYellow
    );
    fadingBlock.position.set(-2.35, 0, 0.22);
    // Scattered drifting-charge warning micro-dots on the aging block
    const dotGeo = hiResSphere(0.16, 8, 6);
    for (const [dx, dy] of [
      [-2.75, 0.75],
      [-1.95, 0.25],
      [-2.55, -0.65],
      [-1.95, -0.95],
    ]) {
      const dot = new THREE.Mesh(dotGeo, mats.cinnabarAnodized);
      dot.position.set(dx, dy, 0.42);
      dot.userData.noEdges = true;
      g.add(dot);
    }

    const freshBlock = new THREE.Mesh(
      createChamferedBoxGeo(2.25, 3.2, 0.28, 0.18, 0.04, 'z'),
      mats.cfaGreen
    );
    freshBlock.position.set(2.35, 0, 0.22);
    // Crisp aligned refreshed page bars on the emerald clean block
    for (let r = -1; r <= 1; r++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.36, 0.08), mats.goldPlating);
      bar.position.set(2.35, r * 0.88, 0.39);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    // Twin upper/lower patrol-scrub refresh arcs + central golden ECC-verify gate core
    const moveArcTop = new THREE.Mesh(hiResTorus(2.05, 0.13, 10, 26, Math.PI), mats.vcWorkingFluidCyan);
    moveArcTop.position.set(0, 0.25, 0.34);
    moveArcTop.userData.noEdges = true;
    const moveArcBot = new THREE.Mesh(hiResTorus(2.05, 0.11, 10, 26, Math.PI), mats.goldPlating);
    moveArcBot.rotation.z = Math.PI;
    moveArcBot.position.set(0, -0.25, 0.34);
    moveArcBot.userData.noEdges = true;
    const eccGate = new THREE.Mesh(hiResCyl(0.56, 0.56, 0.28, 6).rotateX(Math.PI / 2), mats.goldPlating);
    eccGate.position.set(0, 0, 0.32);
    eccGate.userData.noEdges = true;

    g.add(scrubberBase, fadingBlock, freshBlock, moveArcTop, moveArcBot, eccGate);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-read-reclaim-scrub',
        60,
        '#10b981',
        g,
        new THREE.Vector3(-7.5, 8.8, 1.15),
        new THREE.Vector3(72, 68, -22),
        cp
      )
    );
  }

  // =========================================================================
  // C61. 16 GT/s PCIe Gen4 ×1 Analog SerDes PHY & CTLE/DFE Equalizer Front-End
  // =========================================================================
  {
    const g = new THREE.Group();
    const phyGeo = createChamferedBoxGeo(7.2, 4.6, 0.34, 0.18, 0.04, 'z');
    applyPlanarUVs(phyGeo, 7.2, 4.6, 'xy');
    const phyBase = new THREE.Mesh(phyGeo, u.bionzCetusDie);
    g.add(phyBase);

    // Twin 4-turn on-die octagonal spiral copper T-coil peaking inductors with symmetric center-tap bridges!
    for (const sx of [-1.85, 1.85]) {
      for (const r of [0.38, 0.68, 0.98, 1.26]) {
        const coil = new THREE.Mesh(hiResTorus(r, 0.075, 8, 8), mats.rfGoldCoax);
        coil.position.set(sx, 0.42, 0.24);
        coil.userData.noEdges = true;
        g.add(coil);
      }
      const centerTap = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.35, 0.12), mats.copperHeatSpreader);
      centerTap.position.set(sx, 0.42, 0.28);
      centerTap.userData.noEdges = true;
      g.add(centerTap);
    }
    // Central analog CTLE peaking capacitor bank + 100-ohm precision differential termination bar + 4 TX/RX bond pads!
    for (let k = -1; k <= 1; k++) {
      const ctle = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.34, 0.14), mats.vcWorkingFluidCyan);
      ctle.position.set(0, 0.42 + k * 0.52, 0.24);
      ctle.userData.noEdges = true;
      g.add(ctle);
    }
    const termBar = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.52, 0.14), mats.goldPlating);
    termBar.position.set(0, -1.42, 0.23);
    termBar.userData.noEdges = true;
    g.add(termBar);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-pcie-gen4-serdes-phy',
        61,
        '#2563eb',
        g,
        new THREE.Vector3(-6.2, -13.6, 1.32),
        new THREE.Vector3(-42, -56, 56),
        cp
      )
    );
  }

  // =========================================================================
  // C62. ONFI / Toggle 5.0 3200 MT/s DDR 8-Channel NAND Interface Bus & DQS Bridge
  // =========================================================================
  {
    const g = new THREE.Group();
    const busCarrier = new THREE.Mesh(
      createChamferedBoxGeo(22.6, 7.6, 0.16, 0.3, 0.02, 'z'),
      u.cfeHdiPcb
    );
    g.add(busCarrier);

    // 8 matched-impedance parallel Toggle 5.0 DDR channels: sub-grouped DQ[7:0] ribbons + differential gold DQS/DQS# + guard rails + end vias!
    const dqSubGeo = new THREE.BoxGeometry(0.20, 6.7, 0.11);
    const dqsGeo = new THREE.BoxGeometry(0.14, 6.7, 0.13);
    const guardGeo = new THREE.BoxGeometry(0.12, 6.9, 0.09);
    const viaGeo = hiResCyl(0.18, 0.18, 0.28, 10).rotateX(Math.PI / 2);

    for (let ch = 0; ch < 8; ch++) {
      const cx = -9.45 + ch * 2.7;
      for (const dqOff of [-0.62, -0.32, -0.02]) {
        const dq = new THREE.Mesh(dqSubGeo, mats.copperCoil);
        dq.position.set(cx + dqOff, 0, 0.13);
        dq.userData.noEdges = true;
        g.add(dq);
      }
      for (const dqsOff of [0.36, 0.62]) {
        const dqs = new THREE.Mesh(dqsGeo, mats.goldPlating);
        dqs.position.set(cx + dqsOff, 0, 0.14);
        dqs.userData.noEdges = true;
        g.add(dqs);
      }
      // Inter-channel ground isolation guard trace & breakout vias
      const guard = new THREE.Mesh(guardGeo, mats.stainlessMachined);
      guard.position.set(cx + 1.35, 0, 0.11);
      guard.userData.noEdges = true;
      for (const vy of [-3.35, 3.35]) {
        const via = new THREE.Mesh(viaGeo, mats.goldPlating);
        via.position.set(cx + 0.48, vy, 0.08);
        via.userData.noEdges = true;
        g.add(via);
      }
      g.add(guard);
    }

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-toggle5-phy-bus',
        62,
        '#0ea5e9',
        g,
        new THREE.Vector3(-1.0, 2.2, 0.56),
        new THREE.Vector3(24, 34, 54),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C63. Under-Controller Stacked Copper Thermal Via Array & Embedded Copper Coin
  // =========================================================================
  {
    const g = new THREE.Group();
    // Solid pure-copper PCB-embedded thermal coin slug with stepped press-fit flange collar!
    const cuCoin = new THREE.Mesh(
      createChamferedBoxGeo(10.8, 10.8, 1.18, 0.85, 0.1, 'z'),
      mats.copperHeatSpreader
    );
    const pressFlange = new THREE.Mesh(
      extrudeHiRes(createFrameShape(11.8, 11.8, 1.0, 10.2, 10.2, 0.7), 0.24, 0.04, 0.04, 1, 16),
      mats.copperCoil
    );
    pressFlange.userData.noEdges = true;
    g.add(cuCoin, pressFlange);

    // 4 corner thermal-relief spokes tying the copper coin directly to inner L2/L7 ground planes
    const spokeGeo = new THREE.BoxGeometry(2.4, 0.72, 0.18);
    for (let k = 0; k < 4; k++) {
      const ang = (k * Math.PI) / 2 + Math.PI / 4;
      const spoke = new THREE.Mesh(spokeGeo, mats.copperHeatSpreader);
      spoke.position.set(Math.cos(ang) * 6.3, Math.sin(ang) * 6.3, 0);
      spoke.rotation.z = ang;
      spoke.userData.noEdges = true;
      g.add(spoke);
    }

    // 5×5 stacked copper-filled thermal vias + double-sided annular gold capture pads (InstancedMesh!)
    const viaGeo = hiResCyl(0.36, 0.36, 1.32, 14).rotateX(Math.PI / 2);
    const padGeo = hiResCyl(0.54, 0.54, 0.08, 14).rotateX(Math.PI / 2);
    const viaInst = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 25);
    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, 50);
    const dm = new THREE.Object3D();
    let idx = 0;
    let pidx = 0;
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        dm.position.set(c * 2.0, r * 2.0, 0);
        dm.updateMatrix();
        viaInst.setMatrixAt(idx++, dm.matrix);
        for (const pz of [-0.62, 0.62]) {
          dm.position.set(c * 2.0, r * 2.0, pz);
          dm.updateMatrix();
          padInst.setMatrixAt(pidx++, dm.matrix);
        }
      }
    }
    viaInst.instanceMatrix.needsUpdate = true;
    padInst.instanceMatrix.needsUpdate = true;
    viaInst.userData.noEdges = true;
    padInst.userData.noEdges = true;
    g.add(viaInst, padInst);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-thermal-via-copper-slug',
        63,
        '#ea580c',
        g,
        new THREE.Vector3(-6.2, -9.0, 0),
        new THREE.Vector3(-62, -16, -54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C64. Camera Combo-Slot 21-Pin Gold Spring Wiper Block & Push-Push Eject Cam
  // =========================================================================
  {
    const g = new THREE.Group();
    // Open-front cutaway camera combo-slot cradle seated cleanly BEHIND/BELOW C05!
    const slotBackWall = new THREE.Mesh(
      createChamferedBoxGeo(37.6, 5.4, 1.35, 0.4, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    slotBackWall.position.set(0, -0.65, -2.05);
    const slotBottomRail = new THREE.Mesh(
      createChamferedBoxGeo(38.0, 1.55, 4.4, 0.45, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    slotBottomRail.position.set(0, -2.85, -0.45);

    // Machined left/right side guide cheeks + stainless EMI shell grounding clips
    for (const sx of [-18.4, 18.4]) {
      const cheek = new THREE.Mesh(
        createChamferedBoxGeo(1.65, 5.2, 4.2, 0.3, 0.08, 'z'),
        mats.matteBlackAnodized
      );
      cheek.position.set(sx, -0.75, -0.45);
      const emiTab = new THREE.Mesh(createChamferedBoxGeo(0.32, 3.6, 3.4, 0.1, 0.03, 'z'), mats.stainlessMachined);
      emiTab.position.set(sx + (sx < 0 ? -0.92 : 0.92), -0.75, -0.45);
      emiTab.userData.noEdges = true;
      g.add(cheek, emiTab);
    }

    // Rear stainless EMI chassis plate backing the combo-slot housing
    const emiBack = new THREE.Mesh(createChamferedBoxGeo(36.2, 4.4, 0.22, 0.3, 0.04, 'z'), mats.stainlessMachined);
    emiBack.position.set(0, -0.65, -2.80);
    emiBack.userData.noEdges = true;
    g.add(slotBackWall, slotBottomRail, emiBack);

    // 21 genuinely curved arched phosphor-bronze gold spring wipers + domed contact tips + SMT solder tails!
    const wiperCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2.15, -1.25),
      new THREE.Vector3(0, -1.05, -1.18),
      new THREE.Vector3(0, 0.15, -0.58),
      new THREE.Vector3(0, 0.85, -1.02),
    ]);
    const wiperGeo = markHiRes(new THREE.TubeGeometry(wiperCurve, 12, 0.16, 6, false));
    const wiperInst = new THREE.InstancedMesh(wiperGeo, mats.beCuSpring, 21);
    const domeGeo = hiResSphere(0.24, 8, 6);
    const domeInst = new THREE.InstancedMesh(domeGeo, mats.goldPlating, 21);
    const tailGeo = createChamferedBoxGeo(0.54, 0.48, 1.32, 0.08, 0.02, 'z');
    const tailInst = new THREE.InstancedMesh(tailGeo, mats.goldPlating, 21);
    const dm = new THREE.Object3D();

    for (let pin = 0; pin < 21; pin++) {
      const px = -15.0 + pin * 1.5;
      dm.position.set(px, 0, 0);
      dm.scale.set(1.6, 1.0, 0.72);
      dm.updateMatrix();
      wiperInst.setMatrixAt(pin, dm.matrix);

      dm.position.set(px, 0.15, -0.42);
      dm.scale.set(1.2, 1.0, 0.65);
      dm.updateMatrix();
      domeInst.setMatrixAt(pin, dm.matrix);

      dm.position.set(px, -2.18, 0.56);
      dm.scale.set(1, 1, 1);
      dm.updateMatrix();
      tailInst.setMatrixAt(pin, dm.matrix);
    }
    for (const inst of [wiperInst, domeInst, tailInst]) {
      inst.instanceMatrix.needsUpdate = true;
      inst.userData.noEdges = true;
      g.add(inst);
    }

    // Stainless heart-cam push-push card-eject latch plate, recessed heart track, follower wire pin & 7-turn helical spring!
    const latchArm = new THREE.Mesh(
      createChamferedBoxGeo(1.45, 8.2, 1.45, 0.28, 0.06, 'z'),
      mats.stainlessMachined
    );
    latchArm.position.set(19.25, 1.2, -0.45);
    const heartTrack = new THREE.Mesh(createChamferedBoxGeo(0.56, 3.2, 0.24, 0.18, 0.03, 'z'), mats.matteBlackAnodized);
    heartTrack.position.set(19.25, 1.5, 0.34);
    heartTrack.userData.noEdges = true;
    const followerPin = new THREE.Mesh(hiResCyl(0.14, 0.14, 2.2, 8), mats.goldPlating);
    followerPin.position.set(19.25, 0.35, 0.42);
    followerPin.userData.noEdges = true;
    const latchHook = new THREE.Mesh(
      createChamferedBoxGeo(1.5, 1.85, 1.55, 0.24, 0.06, 'z'),
      mats.titaniumRivet
    );
    latchHook.position.set(18.75, 4.9, -0.45);
    for (let i = 0; i < 7; i++) {
      const coil = new THREE.Mesh(hiResTorus(0.56, 0.11, 8, 16), mats.silverElectrode);
      coil.rotation.x = Math.PI / 2;
      coil.position.set(19.25, -2.15 + i * 0.44, -0.45);
      coil.userData.noEdges = true;
      g.add(coil);
    }
    g.add(latchArm, heartTrack, followerPin, latchHook);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-slot-contact-wiper-interface',
        64,
        '#eab308',
        g,
        new THREE.Vector3(0, -29.2, 0),
        new THREE.Vector3(0, -88, 26),
        cp
      )
    );
  }

  // =========================================================================
  // C65. 100 MHz HCSL PCIe Reference Clock Differential Pair & 50-Ohm Termination
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin matched-length 100 MHz HCSL differential lines with phase-jog + 49.9-ohm thin-film terminators + GND guard rails!
    for (const [dx, mat] of [
      [-0.55, mats.goldPlating],
      [0.55, mats.copperCoil],
    ] as Array<[number, THREE.Material]>) {
      const pts = [
        new THREE.Vector3(dx, -3.1, 0.06),
        new THREE.Vector3(dx, -0.8, 0.06),
        new THREE.Vector3(dx + 0.38, -0.25, 0.07),
        new THREE.Vector3(dx + 0.38, 0.45, 0.07),
        new THREE.Vector3(dx, 1.0, 0.06),
        new THREE.Vector3(dx, 3.1, 0.06),
      ];
      const trace = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 22, 0.12, 6, false)),
        mat
      );
      trace.userData.noEdges = true;
      g.add(trace);

      const termRes = buildSmdPassive(1.38, 0.72, 0.44, mats.mountShimBlue, mats.silverElectrode, 'z');
      termRes.position.set(dx * 2.2, 2.35, 0.24);
      const acCap = buildSmdPassive(1.18, 0.62, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
      acCap.position.set(dx * 2.2, -2.35, 0.24);
      g.add(termRes, acCap);
    }

    // Flanking coplanar GND guard rails & 4 ground return stitching vias
    const viaGeo = hiResCyl(0.18, 0.18, 0.30, 10).rotateX(Math.PI / 2);
    for (const gx of [-1.75, 1.95]) {
      const guard = new THREE.Mesh(new THREE.BoxGeometry(0.16, 6.2, 0.08), mats.copperHeatSpreader);
      guard.position.set(gx, 0, 0.04);
      guard.userData.noEdges = true;
      g.add(guard);
      for (const vy of [-2.4, 2.4]) {
        const via = new THREE.Mesh(viaGeo, mats.goldPlating);
        via.position.set(gx, vy, 0.02);
        via.userData.noEdges = true;
        g.add(via);
      }
    }

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-pcie-refclk-diff-term',
        65,
        '#facc15',
        g,
        new THREE.Vector3(6.4, -20.2, 0.62),
        new THREE.Vector3(66, -66, 36),
        cp
      )
    );
  }

  // =========================================================================
  // C66. Multi-Rail Core 0.85V / NAND 1.8V / VCCQ 1.2V PoL Buck Filter Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    const cuIsland = new THREE.Mesh(
      createChamferedBoxGeo(7.8, 5.6, 0.14, 0.3, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    g.add(cuIsland);

    // 3 color-coded isolated domain bus bars (0.85V Core / 1.2V VCCQ / 1.8V NAND) + ferrite bead + Pi-filter MLCCs + thermal vias!
    const railMats = [mats.cinnabarAnodized, mats.vcWorkingFluidCyan, mats.goldPlating];
    const viaGeo = hiResCyl(0.18, 0.18, 0.22, 10).rotateX(Math.PI / 2);
    for (let r = 0; r < 3; r++) {
      const ry = -1.7 + r * 1.7;
      const bus = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.26, 0.08), railMats[r]);
      bus.position.set(0, ry + 0.56, -0.10);
      bus.userData.noEdges = true;

      const bead = buildSmdPassive(1.85, 0.92, 0.62, mats.ferriteInductor, mats.silverElectrode, 'z');
      bead.rotation.y = Math.PI;
      bead.position.set(-1.95, ry, -0.34);
      const mlcc1 = buildSmdPassive(1.25, 0.68, 0.54, mats.smdCeramic, mats.silverElectrode, 'z');
      mlcc1.rotation.y = Math.PI;
      mlcc1.position.set(0.55, ry, -0.3);
      const mlcc2 = buildSmdPassive(1.25, 0.68, 0.54, mats.smdCeramic, mats.silverElectrode, 'z');
      mlcc2.rotation.y = Math.PI;
      mlcc2.position.set(2.35, ry, -0.3);

      const via = new THREE.Mesh(viaGeo, mats.goldPlating);
      via.position.set(-3.35, ry, 0);
      via.userData.noEdges = true;
      g.add(bus, bead, mlcc1, mlcc2, via);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-vcore-ldo-buck-rails',
        66,
        '#ea580c',
        g,
        new THREE.Vector3(11.6, -4.4, -0.82),
        new THREE.Vector3(78, -8, -42),
        cp
      )
    );
  }

  // =========================================================================
  // C67. 16-Die Chip-Enable (CE#) & Ready/Busy (R/B#) Interleave Arbiter Matrix
  // =========================================================================
  {
    const g = new THREE.Group();
    const matrixBase = new THREE.Mesh(
      createChamferedBoxGeo(9.6, 4.6, 0.22, 0.2, 0.03, 'z'),
      u.bionzIpDieTile
    );
    g.add(matrixBase);

    // 8 dual-sided CE# chip-select gold bus lanes + R/B# arbiter feedback rails + central priority crossbar + 16 die-select nodes!
    const nodeGeo = hiResSphere(0.18, 8, 6);
    for (let i = 0; i < 8; i++) {
      const lx = -3.85 + i * 1.1;
      const lane = new THREE.Mesh(
        new THREE.BoxGeometry(0.30, 3.5, 0.14),
        i % 2 === 0 ? mats.goldPlating : mats.vcWorkingFluidCyan
      );
      lane.position.set(lx, 0, 0.18);
      lane.userData.noEdges = true;
      g.add(lane);

      for (const ny of [-1.42, 1.42]) {
        const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? mats.cfaGreen : mats.goldPlating);
        node.position.set(lx, ny, 0.28);
        node.userData.noEdges = true;
        g.add(node);
      }
    }
    const arbiterBar = new THREE.Mesh(createChamferedBoxGeo(8.8, 0.56, 0.20, 0.1, 0.02, 'z'), mats.copperHybridBond);
    arbiterBar.position.set(0, 0, 0.25);
    arbiterBar.userData.noEdges = true;
    g.add(arbiterBar);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-ce-rb-mux',
        67,
        '#0ea5e9',
        g,
        new THREE.Vector3(8.2, 3.8, 0.72),
        new THREE.Vector3(74, 24, 34),
        cp
      )
    );
  }

  // =========================================================================
  // C68. Controller-to-Backplate Conductive Elastomer Thermal Gap Filler Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    const gapPad = new THREE.Mesh(
      createChamferedBoxGeo(11.8, 11.8, 0.42, 0.7, 0.08, 'z'),
      mats.thermalPadPink
    );
    // Thin conformal wetting perimeter lip hugging the copper thermal coin
    const wetLip = new THREE.Mesh(
      extrudeHiRes(createFrameShape(12.2, 12.2, 0.78, 11.2, 11.2, 0.55), 0.16, 0.03, 0.03, 1, 14),
      mats.thermalPuttyPink
    );
    wetLip.userData.noEdges = true;
    g.add(gapPad, wetLip);

    // 6×6 densely packed multi-diameter Alumina (Al2O3) thermal-conductive ceramic microspheres (InstancedMesh!)
    const sphGeo = hiResSphere(0.24, 8, 6);
    const sphInst = new THREE.InstancedMesh(sphGeo, mats.ceramicAlumina, 36);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        const sc = 0.72 + ((r * 5 + c * 3) % 4) * 0.16;
        dm.position.set(-4.2 + c * 1.68, -4.2 + r * 1.68, (r + c) % 2 === 0 ? -0.19 : 0.19);
        dm.scale.setScalar(sc);
        dm.updateMatrix();
        sphInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    sphInst.instanceMatrix.needsUpdate = true;
    sphInst.userData.noEdges = true;
    g.add(sphInst);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-thermal-paste-underfill',
        68,
        '#f472b6',
        g,
        new THREE.Vector3(-6.2, -9.0, -1.62),
        new THREE.Vector3(-48, -28, -58),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C69. Hot-Plug Card-Detect (INS# Pin 12) Debounce RC & Power-Good Supervisor
  // =========================================================================
  {
    const g = new THREE.Group();
    const supIc = buildChipPackage({
      w: 2.35,
      d: 1.85,
      h: 0.62,
      style: 'sot23',
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.cfaGreen,
      axis: 'z',
    });
    const pullup = buildSmdPassive(1.25, 0.65, 0.44, mats.matteBlackAnodized, mats.goldPlating, 'z');
    pullup.position.set(-2.2, 0, -0.06);
    const debCap = buildSmdPassive(1.25, 0.65, 0.44, mats.smdCeramic, mats.silverElectrode, 'z');
    debCap.position.set(2.2, 0, -0.06);
    // Micro ESD clamp diode & routed gold INS# -> Supervisor -> PERST# signal traces!
    const esdMicro = buildSmdPassive(1.05, 0.56, 0.40, mats.cinnabarAnodized, mats.goldPlating, 'z');
    esdMicro.position.set(0, -1.75, -0.06);
    const insBus = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.20, 0.08), mats.goldPlating);
    insBus.position.set(0, 0, -0.28);
    insBus.userData.noEdges = true;
    const pwrGoodTrace = new THREE.Mesh(new THREE.BoxGeometry(0.20, 2.2, 0.08), mats.cfaGreen);
    pwrGoodTrace.position.set(0, 1.35, -0.28);
    pwrGoodTrace.userData.noEdges = true;

    g.add(supIc, pullup, debCap, esdMicro, insBus, pwrGoodTrace);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-card-detect-pullup-ins',
        69,
        '#22c55e',
        g,
        new THREE.Vector3(1.5, -20.8, 0.72),
        new THREE.Vector3(16, -74, 42),
        cp
      )
    );
  }

  // =========================================================================
  // C70. On-Die Internal NAND Die-Level XOR RAID Parity & Spare-Pool Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const raidGeo = createChamferedBoxGeo(6.0, 4.6, 0.34, 0.18, 0.04, 'z');
    applyPlanarUVs(raidGeo, 6.0, 4.6, 'xy');
    const raidBase = new THREE.Mesh(raidGeo, u.bionzCetusDie);
    g.add(raidBase);

    // 4 NAND data stripe bars feeding through copper pipeline gates into golden XOR Parity ALU core + 3×2 emerald Spare-Block Rebuild matrix!
    for (let i = 0; i < 4; i++) {
      const sy = -1.2 + i * 0.8;
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.44, 0.14), mats.copperHybridBond);
      stripe.position.set(-1.68, sy, 0.22);
      stripe.userData.noEdges = true;
      const feed = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.16, 0.12), mats.goldPlating);
      feed.position.set(-0.22, sy, 0.24);
      feed.userData.noEdges = true;
      g.add(stripe, feed);
    }
    const xorCore = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 1.85, 0.22, 0.16, 0.03, 'z'),
      mats.goldPlating
    );
    xorCore.position.set(1.35, 0.78, 0.25);
    const xorRing = new THREE.Mesh(hiResTorus(0.54, 0.08, 8, 18), mats.vcWorkingFluidCyan);
    xorRing.position.set(1.35, 0.78, 0.39);
    xorRing.userData.noEdges = true;

    // 3×2 dedicated emerald Spare-Block Rebuild Pool cubes
    const spGeo = createChamferedBoxGeo(0.48, 0.44, 0.18, 0.06, 0.02, 'z');
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const sp = new THREE.Mesh(spGeo, mats.cfaGreen);
        sp.position.set(0.78 + c * 0.58, -1.35 + r * 0.58, 0.24);
        sp.userData.noEdges = true;
        g.add(sp);
      }
    }
    g.add(xorCore, xorRing);

    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-raid-xor-parity-engine',
        70,
        '#8b5cf6',
        g,
        new THREE.Vector3(-9.6, -6.2, 1.32),
        new THREE.Vector3(-82, 4, 54),
        cp
      )
    );
  }

  return parts;
}
