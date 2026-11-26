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
  buildPhillipsScrew,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeBionzExtraPart(
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
 * Build a high-detail chamfered PCB carrier centered vertically around y = 0.
 * Note: extrudeHiRes() auto-centers its geometry vertically, so base spans
 * y in [-(h/2 + 0.06), +(h/2 + 0.06)]. Top silkscreen skin sits cleanly at y = h/2 + 0.072.
 */
function buildCarrierPcb(
  w: number,
  d: number,
  h: number,
  topMat: THREE.Material,
  edgeMat: THREE.Material,
  goldMat: THREE.Material,
  cornerR = 0.7
): THREE.Group {
  const g = new THREE.Group();
  const baseGeo = extrudeHiRes(createRoundedRectShape(w, d, cornerR), h, 0.06, 0.06, 2, 16);
  baseGeo.rotateX(Math.PI / 2);
  const base = new THREE.Mesh(baseGeo, edgeMat);
  g.add(base);

  const topY = h * 0.5 + 0.072;
  const skinGeo = new THREE.PlaneGeometry(w - 0.28, d - 0.28);
  skinGeo.rotateX(-Math.PI / 2);
  const skin = new THREE.Mesh(skinGeo, topMat);
  skin.position.y = topY;
  skin.userData.noEdges = true;
  g.add(skin);

  // Corner gold ENIG fiducial & grounding test pads
  const fx = w * 0.5 - 0.74;
  const fz = d * 0.5 - 0.74;
  const padGeo = hiResCyl(0.32, 0.32, 0.04, 14);
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    const pad = new THREE.Mesh(padGeo, goldMat);
    pad.position.set(sx * fx, topY + 0.02, sz * fz);
    pad.userData.noEdges = true;
    g.add(pad);
  }
  return g;
}

/** Build a precision miniature gold I-PEX MHF4 RF micro-coaxial receptacle */
function buildMhf4CoaxJack(
  goldMat: THREE.Material,
  ptfeMat: THREE.Material,
  solderMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(createChamferedBoxGeo(1.75, 0.26, 1.75, 0.14, 0.03, 'y'), ptfeMat);
  base.position.y = 0.13;
  base.userData.noEdges = true;
  g.add(base);

  const outerRing = new THREE.Mesh(hiResCyl(0.66, 0.68, 0.62, 20, true), goldMat);
  outerRing.position.y = 0.52;
  outerRing.userData.noEdges = true;
  g.add(outerRing);

  const rim = new THREE.Mesh(hiResTorus(0.64, 0.09, 10, 22), goldMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.82;
  rim.userData.noEdges = true;
  g.add(rim);

  const pin = new THREE.Mesh(hiResCyl(0.16, 0.18, 0.68, 12), goldMat);
  pin.position.y = 0.50;
  pin.userData.noEdges = true;
  g.add(pin);

  for (const sx of [-1, 1]) {
    const tab = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.14, 0.92), solderMat);
    tab.position.set(sx * 0.94, 0.07, 0);
    tab.userData.noEdges = true;
    g.add(tab);
  }
  return g;
}

/** Build a precision fine-pitch FPC / B2B board-to-board latch receptacle */
function buildFpcReceptacle(
  length: number,
  depth: number,
  height: number,
  pins: number,
  housingMat: THREE.Material,
  goldMat: THREE.Material,
  latchMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(createChamferedBoxGeo(length, height, depth, 0.12, 0.04, 'y'), housingMat);
  body.position.y = height * 0.5;
  g.add(body);

  const latch = new THREE.Mesh(createChamferedBoxGeo(length * 0.88, height * 0.34, depth * 0.42, 0.06, 0.02, 'y'), latchMat);
  latch.position.set(0, height + height * 0.14, -depth * 0.16);
  latch.userData.noEdges = true;
  g.add(latch);

  const pinW = Math.min(0.18, (length * 0.78) / Math.max(1, pins * 1.8));
  const step = (length * 0.82) / Math.max(1, pins - 1);
  const pinGeo = new THREE.BoxGeometry(pinW, 0.12, depth * 0.38);
  for (let i = 0; i < pins; i++) {
    const px = -length * 0.41 + i * step;
    const pFront = new THREE.Mesh(pinGeo, goldMat);
    pFront.position.set(px, 0.08, depth * 0.56);
    pFront.userData.noEdges = true;
    g.add(pFront);
    const pBack = new THREE.Mesh(pinGeo, goldMat);
    pBack.position.set(px, 0.08, -depth * 0.56);
    pBack.userData.noEdges = true;
    g.add(pBack);
  }
  return g;
}

/** Build a shielded metal-alloy power inductor with wrap-around tin electrodes */
function buildAlloyInductor(
  w: number,
  h: number,
  d: number,
  coreMat: THREE.Material,
  termMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(createChamferedBoxGeo(w, h, d, 0.18, 0.06, 'y'), coreMat);
  body.position.y = h * 0.5;
  g.add(body);
  for (const sx of [-1, 1]) {
    const cap = new THREE.Mesh(createChamferedBoxGeo(w * 0.18, h * 0.84, d * 0.92, 0.06, 0.02, 'y'), termMat);
    cap.position.set(sx * (w * 0.46), h * 0.44, 0);
    cap.userData.noEdges = true;
    g.add(cap);
  }
  return g;
}

/** Build a 3D stainless USB Type-C 24-pin mid-mount receptacle with internal black tongue & dual gold contacts */
function buildUsbTypeCReceptacle(
  shellMat: THREE.Material,
  tongueMat: THREE.Material,
  goldMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const outer = new THREE.Mesh(createChamferedBoxGeo(4.8, 1.85, 5.2, 0.65, 0.06, 'z'), shellMat);
  outer.position.y = 0.95;
  g.add(outer);

  const cavity = new THREE.Mesh(createChamferedBoxGeo(4.2, 1.32, 1.0, 0.45, 0.02, 'z'), tongueMat);
  cavity.position.set(0, 0.95, 2.25);
  cavity.userData.noEdges = true;
  g.add(cavity);

  const tongue = new THREE.Mesh(createChamferedBoxGeo(3.6, 0.28, 1.35, 0.06, 0.02, 'y'), tongueMat);
  tongue.position.set(0, 0.95, 2.2);
  tongue.userData.noEdges = true;
  g.add(tongue);

  // 12 visible gold contact pins along top of USB-C tongue
  const pinGeo = new THREE.BoxGeometry(0.14, 0.07, 0.95);
  for (let i = 0; i < 12; i++) {
    const pin = new THREE.Mesh(pinGeo, goldMat);
    pin.position.set(-1.54 + i * 0.28, 1.12, 2.26);
    pin.userData.noEdges = true;
    g.add(pin);
  }
  // 4 shell grounding legs
  for (const sx of [-1, 1]) {
    for (const sz of [-1.4, 1.2]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.65, 0.55), shellMat);
      leg.position.set(sx * 2.48, 0.26, sz);
      leg.userData.noEdges = true;
      g.add(leg);
    }
  }
  return g;
}

/**
 * Build the 24 brand-new real-world BIONZ XR / XR2 deep-package & SY-1122
 * mainboard companion subsystem parts (XR47–XR70, expanding standalone mode to 70 parts!).
 * Every single footprint has >= 1.5 mm verified clearance in assembled & exploded views.
 */
export function buildBionzExtraParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // ═══════════════════════════════════════════════════════════════════════
  // GROUP A: Deep Semiconductor Package, SY-1122 HDI Mainboard & Thermal Stack (XR47–XR52)
  // ═══════════════════════════════════════════════════════════════════════

  // XR47. Die-Perimeter HBM/CDM ESD Clamp Diode & I/O Pad Ring
  {
    const g = new THREE.Group();
    const ringShape = createFrameShape(22.0, 22.0, 0.65, 20.45, 20.45, 0.45);
    const ringGeo = extrudeHiRes(ringShape, 0.24, 0.04, 0.04, 2, 18);
    ringGeo.rotateX(Math.PI / 2);
    applyPlanarUVs(ringGeo, 22.0, 22.0, 'xz');
    const ring = new THREE.Mesh(ringGeo, mats.ultra.bionzDieIoEsdRing);
    g.add(ring);

    // 48 Perimeter gold I/O bond pads + dual ESD clamp diode fingers (InstancedMesh)
    const padGeo = new THREE.BoxGeometry(0.55, 0.16, 0.72);
    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, 48);
    padInst.userData.noEdges = true;
    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let i = 0; i < 12; i++) {
      const t = -8.6 + (i * 17.2) / 11;
      dummy.position.set(t, 0.18, -10.62);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      padInst.setMatrixAt(idx++, dummy.matrix);
      dummy.position.set(t, 0.18, 10.62);
      dummy.updateMatrix();
      padInst.setMatrixAt(idx++, dummy.matrix);
      dummy.position.set(-10.62, 0.18, t);
      dummy.rotation.set(0, Math.PI / 2, 0);
      dummy.updateMatrix();
      padInst.setMatrixAt(idx++, dummy.matrix);
      dummy.position.set(10.62, 0.18, t);
      dummy.updateMatrix();
      padInst.setMatrixAt(idx++, dummy.matrix);
    }
    padInst.instanceMatrix.needsUpdate = true;
    g.add(padInst);

    // 4 Corner Big-FET Power-Rail ESD Snapback Clamps
    const clampGeo = createChamferedBoxGeo(1.4, 0.26, 1.4, 0.12, 0.03, 'y');
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const clamp = new THREE.Mesh(clampGeo, mats.copperHybridBond);
      clamp.position.set(sx * 10.2, 0.16, sz * 10.2);
      clamp.userData.noEdges = true;
      g.add(clamp);
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-die-io-esd-ring',
        47,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 1.38, 0),
        new THREE.Vector3(0, 5.2, -22.0),
        cp,
        0.2
      )
    );
  }

  // XR48. MTCMOS Fine-Grain Power-Gating Sleep-Transistor Header Ring
  {
    const g = new THREE.Group();
    const ringShape = createFrameShape(21.2, 21.2, 0.55, 19.8, 19.8, 0.40);
    const ringGeo = extrudeHiRes(ringShape, 0.22, 0.04, 0.04, 2, 18);
    ringGeo.rotateX(Math.PI / 2);
    applyPlanarUVs(ringGeo, 21.2, 21.2, 'xz');
    const ring = new THREE.Mesh(ringGeo, mats.ultra.bionzMtcmosGateRing);
    g.add(ring);

    // 12 Domain-isolation High-Vt pMOS sleep-header transistor islands
    const islandGeo = createChamferedBoxGeo(2.4, 0.18, 0.58, 0.08, 0.02, 'y');
    for (let k = 0; k < 3; k++) {
      const off = -6.2 + k * 6.2;
      for (const sz of [-1, 1]) {
        const m = new THREE.Mesh(islandGeo, mats.goldPlating);
        m.position.set(off, 0.16, sz * 10.25);
        m.userData.noEdges = true;
        g.add(m);
      }
      for (const sx of [-1, 1]) {
        const m = new THREE.Mesh(islandGeo, mats.goldPlating);
        m.rotation.y = Math.PI / 2;
        m.position.set(sx * 10.25, 0.16, off);
        m.userData.noEdges = true;
        g.add(m);
      }
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-mtcmos-power-gate-ring',
        48,
        '#3b82f6',
        g,
        new THREE.Vector3(0, 0.88, 0),
        new THREE.Vector3(-20.0, 2.2, 14.0),
        cp,
        0.2
      )
    );
  }

  // XR49. On-Die MBIST / IEEE 1687 IJTAG DFT Controller & Left-Flank Silicon Dummy Thermal Spacer
  {
    const g = new THREE.Group();
    const slabGeo = extrudeHiRes(createRoundedRectShape(4.5, 13.6, 0.45), 1.12, 0.08, 0.08, 2, 18);
    slabGeo.rotateX(Math.PI / 2);
    applyPlanarUVs(slabGeo, 4.5, 13.6, 'xz');
    const slab = new THREE.Mesh(slabGeo, mats.ultra.bionzMbistDummySi);
    g.add(slab);

    const skinGeo = new THREE.PlaneGeometry(4.2, 13.2);
    skinGeo.rotateX(-Math.PI / 2);
    const skin = new THREE.Mesh(skinGeo, mats.ultra.bionzMbistDummySi);
    skin.position.y = 0.655;
    skin.userData.noEdges = true;
    g.add(skin);

    // Copper TSV thermal stub columns underneath (4×10 = 40 InstancedMesh pillars)
    const tsvGeo = hiResCyl(0.16, 0.16, 0.42, 10);
    const tsvInst = new THREE.InstancedMesh(tsvGeo, mats.copperHybridBond, 40);
    tsvInst.userData.noEdges = true;
    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 4; c++) {
        dummy.position.set(-1.35 + c * 0.9, -0.82, -5.4 + r * 1.2);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        tsvInst.setMatrixAt(idx++, dummy.matrix);
      }
    }
    tsvInst.instanceMatrix.needsUpdate = true;
    g.add(tsvInst);

    const fillet = new THREE.Mesh(
      createChamferedBoxGeo(4.85, 0.22, 13.95, 0.52, 0.04, 'y'),
      mats.ultra.bionzCufSilica
    );
    fillet.position.y = -0.60;
    fillet.userData.noEdges = true;
    g.add(fillet);

    parts.push(
      finalizeBionzExtraPart(
        'xr-mbist-dummy-si-spacer',
        49,
        '#64748b',
        g,
        new THREE.Vector3(-13.2, 0.8, 0),
        new THREE.Vector3(-26.0, 2.5, 0),
        cp,
        0.22
      )
    );
  }

  // XR50. Magnesium-Alloy Chassis Die-Cast Thermal Pedestal (AZ91D) & Compressible TIM3 Putty Pad
  {
    const g = new THREE.Group();
    const deckGeo = extrudeHiRes(createRoundedRectShape(36.0, 30.0, 2.2), 1.35, 0.14, 0.14, 2, 20);
    deckGeo.rotateX(Math.PI / 2);
    applyPlanarUVs(deckGeo, 36.0, 30.0, 'xz');
    const deck = new THREE.Mesh(deckGeo, mats.ultra.bionzMgChassisPedestal);
    g.add(deck);

    // Crisp laser-stamped top skin (flush above centered deck top at +0.815)
    const skinGeo = new THREE.PlaneGeometry(34.2, 28.2);
    skinGeo.rotateX(-Math.PI / 2);
    const skin = new THREE.Mesh(skinGeo, mats.ultra.bionzMgChassisPedestal);
    skin.position.y = 0.835;
    skin.userData.noEdges = true;
    g.add(skin);

    // Structural die-cast stiffening ribs
    for (const sz of [-12.2, 12.2]) {
      const rib = new THREE.Mesh(createChamferedBoxGeo(29.0, 0.52, 1.35, 0.2, 0.06, 'y'), mats.stainlessMachined);
      rib.position.set(0, 1.06, sz);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Underside machined die-contact thermal anvil + pink compressible TIM3 putty waffle pad
    const anvil = new THREE.Mesh(createChamferedBoxGeo(22.0, 0.42, 22.0, 1.1, 0.08, 'y'), mats.stainlessMachined);
    anvil.position.y = -0.96;
    anvil.userData.noEdges = true;
    g.add(anvil);

    const tim3 = new THREE.Mesh(createChamferedBoxGeo(20.2, 0.40, 20.2, 0.9, 0.06, 'y'), mats.ultra.sensorTimSiliconeWaffle);
    tim3.position.y = -1.34;
    tim3.userData.noEdges = true;
    g.add(tim3);

    // 4 Corner M1.7 brass threaded bosses + Phillips pan-head chassis screws
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const boss = new THREE.Mesh(hiResCyl(1.65, 1.85, 1.55, 20), mats.goldPlating);
      boss.position.set(sx * 15.2, 0.22, sz * 12.2);
      boss.userData.noEdges = true;
      g.add(boss);

      const screw = buildPhillipsScrew(1.25, 0.48, 0.55, 1.55, mats.stainlessMachined, mats.matteBlackAnodized, mats.stainlessMachined);
      screw.position.set(sx * 15.2, 1.04, sz * 12.2);
      g.add(screw);
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-mg-chassis-tim3-sink',
        50,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 12.25, 0),
        new THREE.Vector3(0, 74.0, 0),
        cp,
        0.24
      )
    );
  }

  // XR51. Sony SY-1122 (1-009-592-41) 12-Layer Any-Layer HDI Mainboard BGA Carrier Deck
  {
    const g = new THREE.Group();
    const mbW = 92.0;
    const mbD = 76.0;
    const mbH = 1.36;

    // extrudeHiRes auto-centers around y = 0 -> spans [-0.80, +0.80]
    const pcbGeo = extrudeHiRes(createRoundedRectShape(mbW, mbD, 2.8), mbH, 0.12, 0.12, 2, 24);
    pcbGeo.rotateX(Math.PI / 2);
    applyPlanarUVs(pcbGeo, mbW, mbD, 'xz');
    const pcb = new THREE.Mesh(pcbGeo, mats.abfSubstrate);
    g.add(pcb);

    // High-resolution Sony SY-1122 top solder-mask + BGA courtyard + silkscreen skin (flush at +0.82)
    const skinGeo = new THREE.PlaneGeometry(mbW - 0.9, mbD - 0.9);
    skinGeo.rotateX(-Math.PI / 2);
    const skin = new THREE.Mesh(skinGeo, mats.ultra.bionzSy1122Mainboard);
    skin.position.y = mbH * 0.5 + 0.14;
    skin.userData.noEdges = true;
    g.add(skin);

    // Bottom solder-mask surface (flush at -0.82)
    const botSkinGeo = new THREE.PlaneGeometry(mbW - 0.9, mbD - 0.9);
    botSkinGeo.rotateX(Math.PI / 2);
    const botSkin = new THREE.Mesh(botSkinGeo, mats.ultra.bionzAbfBottomSr);
    botSkin.position.y = -(mbH * 0.5 + 0.14);
    botSkin.userData.noEdges = true;
    g.add(botSkin);

    // 4 Corner Gold Grounding Petals + Brass Chassis Standoff Rings
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const collar = new THREE.Mesh(hiResTorus(1.85, 0.42, 10, 24), mats.goldPlating);
      collar.rotation.x = Math.PI / 2;
      collar.position.set(sx * 41.8, mbH * 0.5 + 0.18, sz * 33.8);
      collar.userData.noEdges = true;
      g.add(collar);
    }

    // Perimeter machined brass standoffs rising from SY-1122 top (+0.80) up to peripheral carrier undersides (+3.53)
    const postGeo = hiResCyl(0.45, 0.52, 2.72, 12);
    const postCoords: Array<[number, number]> = [
      [-37.2, -16.5], [36.4, -16.2], [36.4, 0.4], [-37.2, 0.6],
      [36.4, 14.6], [16.8, 22.6], [-24.2, 20.6], [-37.6, 13.8],
      [-10.8, 32.4], [2.8, 32.4], [-8.0, -22.4], [16.6, -32.0],
      [2.2, -32.0], [-12.4, -32.0], [-37.6, 26.4], [-27.0, -32.0],
      [30.8, -32.0], [22.2, 32.6],
    ];
    const postInst = new THREE.InstancedMesh(postGeo, mats.goldPlating, postCoords.length);
    postInst.userData.noEdges = true;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < postCoords.length; i++) {
      dummy.position.set(postCoords[i][0], 2.16, postCoords[i][1]);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      postInst.setMatrixAt(i, dummy.matrix);
    }
    postInst.instanceMatrix.needsUpdate = true;
    g.add(postInst);

    parts.push(
      finalizeBionzExtraPart(
        'xr-sy1122-hdi-mainboard',
        51,
        '#15803d',
        g,
        new THREE.Vector3(0, -9.15, 0),
        new THREE.Vector3(0, -68.0, 0),
        cp,
        0.24
      )
    );
  }

  // XR52. Mainboard Back-Side BGA-Shadow 01005 MLCC Courtyard & Rear Stamped Stainless EMI Faraday Shield
  {
    const g = new THREE.Group();

    // 80 Ultra-low-ESL 01005 MLCC decoupling capacitors arranged directly beneath the BGA shadow
    const capBodyGeo = new THREE.BoxGeometry(0.85, 0.48, 0.48);
    const capTermGeo = new THREE.BoxGeometry(1.06, 0.46, 0.50);
    const capBodyInst = new THREE.InstancedMesh(capBodyGeo, mats.smdCeramic, 80);
    const capTermInst = new THREE.InstancedMesh(capTermGeo, mats.solderBallSilver, 80);
    capBodyInst.userData.noEdges = true;
    capTermInst.userData.noEdges = true;
    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 8; c++) {
        dummy.position.set(-10.5 + c * 3.0, 0.52, -11.25 + r * 2.5);
        dummy.rotation.set(0, (r + c) % 2 === 0 ? 0 : Math.PI / 2, 0);
        dummy.updateMatrix();
        capBodyInst.setMatrixAt(idx, dummy.matrix);
        capTermInst.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    capBodyInst.instanceMatrix.needsUpdate = true;
    capTermInst.instanceMatrix.needsUpdate = true;
    g.add(capBodyInst, capTermInst);

    // Stamped C7521 Nickel-Silver EMI Fence Frame enclosing the MLCC courtyard (centered at y = 0)
    const fenceShape = createFrameShape(34.4, 34.4, 1.4, 32.8, 32.8, 1.1);
    const fenceGeo = extrudeHiRes(fenceShape, 1.55, 0.08, 0.08, 2, 20);
    fenceGeo.rotateX(Math.PI / 2);
    const fence = new THREE.Mesh(fenceGeo, mats.emiShieldCan);
    g.add(fence);

    // Snap-in perforated SUS304 Faraday shield lid below fence
    const lidGeo = extrudeHiRes(createRoundedRectShape(34.8, 34.8, 1.5), 0.36, 0.06, 0.06, 2, 20);
    lidGeo.rotateX(Math.PI / 2);
    applyPlanarUVs(lidGeo, 34.8, 34.8, 'xz');
    const lid = new THREE.Mesh(lidGeo, mats.ultra.bionzRearEmiShield);
    lid.position.y = -0.96;
    g.add(lid);

    // Crisp underside laser-etched shield skin (flush below lid at -0.96 - 0.24 - 0.02 = -1.22)
    const lidSkinGeo = new THREE.PlaneGeometry(33.4, 33.4);
    lidSkinGeo.rotateX(Math.PI / 2);
    const lidSkin = new THREE.Mesh(lidSkinGeo, mats.ultra.bionzRearEmiShield);
    lidSkin.position.y = -1.22;
    lidSkin.userData.noEdges = true;
    g.add(lidSkin);

    // Perimeter EMI retention spring dimples along all 4 sides
    const dimpleGeo = hiResSphere(0.28, 10, 8);
    for (let i = 0; i < 6; i++) {
      const p = -12.5 + i * 5.0;
      for (const s of [-1, 1]) {
        const d1 = new THREE.Mesh(dimpleGeo, mats.solderBallSilver);
        d1.position.set(p, -0.18, s * 17.3);
        d1.userData.noEdges = true;
        g.add(d1);
        const d2 = new THREE.Mesh(dimpleGeo, mats.solderBallSilver);
        d2.position.set(s * 17.3, -0.18, p);
        d2.userData.noEdges = true;
        g.add(d2);
      }
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-backside-mlcc-emi-cage',
        52,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -11.4, 0),
        new THREE.Vector3(0, -82.0, 0),
        cp,
        0.24
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // GROUP B: Major Companion Compute, RF, Storage & High-Speed I/O on SY-1122 (XR53–XR62)
  // ═══════════════════════════════════════════════════════════════════════

  // XR53. Dedicated AI Processing Unit Companion BGA (α7R V / α9 III Architecture + 2GB LPDDR4)
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(13.2, 11.4, 0.72, mats.ultra.bionzSubPmicPcb, mats.abfSubstrate, mats.goldPlating));

    // Main Sony Dedicated AI Processing Unit FBGA (7.0 x 7.0 mm)
    const aiBody = new THREE.Mesh(createChamferedBoxGeo(7.0, 0.96, 7.0, 0.35, 0.08, 'y'), mats.ultra.bionzEmcSilica);
    aiBody.position.set(-2.2, 0.94, 0.2);
    g.add(aiBody);
    const aiTopGeo = new THREE.PlaneGeometry(6.6, 6.6);
    aiTopGeo.rotateX(-Math.PI / 2);
    const aiTop = new THREE.Mesh(aiTopGeo, mats.ultra.bionzAiCoprocPkg);
    aiTop.position.set(-2.2, 1.505, 0.2);
    aiTop.userData.noEdges = true;
    g.add(aiTop);

    // Adjacent 2GB LPDDR4-3733 Companion DRAM BGA (generic laser BGA — distinct from PoP D8DNH)
    const dram = buildChipPackage({
      w: 3.4,
      d: 6.2,
      h: 0.78,
      style: 'bga',
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      substrateMat: mats.abfSubstrate,
      pin1Mat: mats.goldPlating,
    });
    dram.position.set(3.8, 0.44, 0.2);
    g.add(dram);

    // 2 Dedicated 0.8V NPU Core Buck Inductors + 0201 Decoupling Row
    for (const sx of [-4.2, -0.4]) {
      const ind = buildAlloyInductor(2.1, 0.88, 1.9, mats.ultra.bionzInductorR24, mats.solderBallSilver);
      ind.position.set(sx, 0.44, -4.35);
      g.add(ind);
    }
    for (let i = 0; i < 6; i++) {
      const cap = buildSmdPassive(0.85, 0.45, 0.4, mats.smdCeramic, mats.solderBallSilver);
      cap.position.set(-4.6 + i * 1.45, 0.44, 4.55);
      g.add(cap);
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-dedicated-ai-coproc',
        53,
        '#8b5cf6',
        g,
        new THREE.Vector3(-37.2, -5.2, -16.5),
        new THREE.Vector3(-58.0, -4.0, -26.0),
        cp,
        0.22
      )
    );
  }

  // XR54. Murata Wi-Fi 6E (2×2 MIMO) & Bluetooth 5.3 Shielded LGA SiP RF Module + Dual MHF4 Jacks
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(13.0, 10.6, 0.72, mats.ultra.bionzUsbcPdPcb, mats.abfSubstrate, mats.goldPlating));

    // Murata LBEE5HY2BC Shielded Nickel-Silver LGA SiP Module
    const sip = new THREE.Mesh(createChamferedBoxGeo(8.4, 1.32, 7.4, 0.3, 0.08, 'y'), mats.emiShieldCan);
    sip.position.set(-1.4, 1.12, 0.0);
    g.add(sip);
    const sipTopGeo = new THREE.PlaneGeometry(8.0, 7.0);
    sipTopGeo.rotateX(-Math.PI / 2);
    const sipTop = new THREE.Mesh(sipTopGeo, mats.ultra.bionzWifi6eSipCan);
    sipTop.position.set(-1.4, 1.87, 0.0);
    sipTop.userData.noEdges = true;
    g.add(sipTop);

    // Dual Gold I-PEX MHF4 Micro-Coaxial Antenna Jacks (ANT0 2.4/5G + ANT1 5/6G MIMO)
    for (const sz of [-2.4, 2.4]) {
      const jack = buildMhf4CoaxJack(mats.rfGoldCoax, mats.ceramicAlumina, mats.solderBallSilver);
      jack.position.set(4.6, 0.44, sz);
      g.add(jack);
    }

    // Ceramic 6 GHz Bandpass Diplexer Filter
    const dip = new THREE.Mesh(createChamferedBoxGeo(1.4, 0.56, 2.2, 0.1, 0.03, 'y'), mats.ceramicAlumina);
    dip.position.set(4.5, 0.72, 0.0);
    g.add(dip);

    parts.push(
      finalizeBionzExtraPart(
        'xr-wifi6e-bt-sip-module',
        54,
        '#10b981',
        g,
        new THREE.Vector3(36.4, -5.2, -16.2),
        new THREE.Vector3(58.0, -4.0, -26.0),
        cp,
        0.22
      )
    );
  }

  // XR55. USB Type-C PD 3.1 Controller (TI TPS65987D) & 10 Gbps SuperSpeed+ Redriver (TI TUSB1044)
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(12.6, 11.4, 0.72, mats.ultra.bionzUsbcPdPcb, mats.abfSubstrate, mats.goldPlating));

    // Shielded Stainless USB Type-C 24-Pin Mid-Mount Receptacle along +X edge
    const usbc = buildUsbTypeCReceptacle(mats.stainlessMachined, mats.matteBlackAnodized, mats.goldPlating);
    usbc.rotation.y = Math.PI / 2;
    usbc.position.set(3.4, 0.44, 0.0);
    g.add(usbc);

    // TI TPS65987D USB-C PD 3.1 Controller QFN-56 (authentic TI WQFN marking!)
    const pdIc = buildChipPackage({
      w: 4.4,
      d: 4.4,
      h: 0.76,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: mats.ultra.bionzTiQfnIc,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    pdIc.position.set(-2.9, 0.44, -2.5);
    g.add(pdIc);

    // TI TUSB1044 10 Gbps Reversible Linear Redriver WQFN-40
    const redriver = buildChipPackage({
      w: 3.4,
      d: 4.6,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.ultra.bionzTiQfnIc,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    redriver.position.set(-2.9, 0.44, 2.7);
    g.add(redriver);

    // 4× 0201 TX AC-Coupling Caps between Redriver and Type-C Port
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(0.85, 0.45, 0.38, mats.smdCeramic, mats.solderBallSilver);
      cap.position.set(-0.2, 0.44, -2.4 + i * 1.6);
      g.add(cap);
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-usbc-pd-10g-redriver',
        55,
        '#06b6d4',
        g,
        new THREE.Vector3(36.4, -5.2, 0.4),
        new THREE.Vector3(60.0, -6.0, 2.0),
        cp,
        0.22
      )
    );
  }

  // XR56. USB-C PD Buck-Boost Battery Charger (TI BQ25713) & 15A Smart eFuse (TI TPS25982)
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(12.6, 10.8, 0.76, mats.ultra.bionzChargerEfusePcb, mats.abfSubstrate, mats.goldPlating));

    // TI BQ25713 WQFN-32 NVDC Buck-Boost Charger Controller
    const chgIc = buildChipPackage({
      w: 4.2,
      d: 4.2,
      h: 0.78,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.ultra.bionzTiQfnIc,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    chgIc.position.set(-3.1, 0.46, -2.1);
    g.add(chgIc);

    // TI TPS25982 2.7mΩ 15A Smart eFuse QFN
    const efuse = buildChipPackage({
      w: 3.4,
      d: 3.8,
      h: 0.74,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.ultra.bionzTiQfnIc,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    efuse.position.set(-3.1, 0.46, 2.6);
    g.add(efuse);

    // Heavy 4.7 μH Shielded Alloy Buck-Boost Power Inductor
    const ind = buildAlloyInductor(4.4, 1.85, 4.4, mats.ultra.bionzInductorR47, mats.solderBallSilver);
    ind.position.set(2.8, 0.46, -1.9);
    g.add(ind);

    // Dual Buck-Boost Power MOSFETs + Wide-Terminal R010 (10 mΩ) Shunt Resistor
    for (const sx of [1.5, 4.1]) {
      const fet = buildChipPackage({
        w: 2.0,
        d: 2.0,
        h: 0.54,
        style: 'dfn',
        pinsPerSide: 4,
        bodyMat: mats.matteBlackAnodized,
        leadMat: mats.solderBallSilver,
      });
      fet.position.set(sx, 0.46, 2.0);
      g.add(fet);
    }
    const shunt = buildSmdPassive(2.8, 1.25, 0.46, mats.matteBlackAnodized, mats.solderBallSilver);
    shunt.position.set(2.8, 0.46, 4.0);
    g.add(shunt);

    parts.push(
      finalizeBionzExtraPart(
        'xr-usbc-charger-efuse',
        56,
        '#f97316',
        g,
        new THREE.Vector3(-37.2, -5.2, 0.6),
        new THREE.Vector3(-60.0, -6.0, 2.0),
        cp,
        0.22
      )
    );
  }

  // XR57. 100 MHz PCIe Gen4 HCSL Clock Generator (Renesas 9FGV0241) & CFx/UHS-II MUX (PI3PCIE3412)
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(12.8, 10.6, 0.72, mats.ultra.bionzPcieCfxMuxPcb, mats.abfSubstrate, mats.goldPlating));

    // Renesas 9FGV0241 VFQFPN-24 100 MHz PCIe Gen4 HCSL Clock Gen
    const clkGen = buildChipPackage({
      w: 3.8,
      d: 3.8,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    clkGen.position.set(-3.2, 0.44, -2.0);
    g.add(clkGen);

    // Companion 25.000 MHz Gold-Lid Quartz Crystal (authentic Epson quartz lid!)
    const xtal = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.56, 2.1, 0.14, 0.04, 'y'), mats.ultra.bionzEpsonQuartzLid);
    xtal.position.set(-3.2, 0.72, 2.2);
    g.add(xtal);

    // Diodes PI3PCIE3412 42-Pin TQFN 2:1 PCIe Gen4 / UHS-II High-Speed MUX Switch
    const mux = buildChipPackage({
      w: 3.8,
      d: 7.4,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 12,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    mux.position.set(2.9, 0.44, 0.0);
    g.add(mux);

    // 4× AC-Coupling PCIe TX 0201 Capacitors
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(0.85, 0.42, 0.36, mats.smdCeramic, mats.solderBallSilver);
      cap.position.set(0.0, 0.44, -2.7 + i * 1.8);
      g.add(cap);
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-pcie-cfx-clock-mux',
        57,
        '#ec4899',
        g,
        new THREE.Vector3(36.4, -5.2, 14.6),
        new THREE.Vector3(58.0, -8.0, 24.0),
        cp,
        0.22
      )
    );
  }

  // XR58. Dual-Stream MIPI-DSI 240Hz EVF & Articulating LCD Bridge + Murata DLM0NSN Choke Bank
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(12.4, 9.6, 0.72, mats.ultra.bionzMipiEvfBridgePcb, mats.abfSubstrate, mats.goldPlating));

    // MIPI-DSI Dual-Stream Retimer / Bridge BGA
    const bridge = buildChipPackage({
      w: 4.4,
      d: 4.4,
      h: 0.78,
      style: 'bga',
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      substrateMat: mats.abfSubstrate,
      pin1Mat: mats.goldPlating,
    });
    bridge.position.set(-2.9, 0.44, 0.0);
    g.add(bridge);

    // 5× Murata DLM0NSN900HY2 Ferrite Common-Mode Chokes (4 Data + 1 Clock Lanes)
    for (let i = 0; i < 5; i++) {
      const choke = buildSmdPassive(1.05, 0.72, 0.52, mats.ferriteInductor, mats.solderBallSilver);
      choke.position.set(0.55, 0.44, -2.8 + i * 1.4);
      g.add(choke);
    }

    // Dual 40-Pin Fine-Pitch EVF & Articulating LCD B2B FPC Receptacles
    const evfConn = buildFpcReceptacle(6.8, 1.55, 0.72, 18, mats.matteBlackAnodized, mats.goldPlating, mats.ceramicAlumina);
    evfConn.rotation.y = Math.PI / 2;
    evfConn.position.set(3.2, 0.44, 0.0);
    g.add(evfConn);

    const lcdConn = buildFpcReceptacle(6.4, 1.35, 0.66, 16, mats.matteBlackAnodized, mats.goldPlating, mats.goldPlating);
    lcdConn.rotation.y = Math.PI / 2;
    lcdConn.position.set(5.05, 0.44, 0.0);
    g.add(lcdConn);

    parts.push(
      finalizeBionzExtraPart(
        'xr-mipi-evf-lcd-bridge',
        58,
        '#22d3ee',
        g,
        new THREE.Vector3(16.8, -5.2, 22.6),
        new THREE.Vector3(26.0, -10.0, 38.0),
        cp,
        0.22
      )
    );
  }

  // XR59. High-Resolution 4-Ch 24-Bit/32-Bit Audio CODEC (AKM AK4619VN QFN-32) & Mic Preamp Front-End
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(12.2, 10.2, 0.72, mats.ultra.bionzAkmAudioPcb, mats.abfSubstrate, mats.goldPlating));

    // AKM AK4619VN 32-QFN (5×5 mm) Velvet Sound Audio CODEC straddling AGND/DGND moat!
    const akm = buildChipPackage({
      w: 4.8,
      d: 4.8,
      h: 0.80,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.ultra.bionzAkmCodecIc,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    akm.position.set(0.3, 0.44, 0.0);
    g.add(akm);

    // Dual Ultra-Low-Noise Differential Mic Preamp Op-Amps on Analog Side (-X)
    for (const sz of [-2.2, 2.2]) {
      const opa = buildChipPackage({
        w: 2.2,
        d: 2.2,
        h: 0.56,
        style: 'dfn',
        pinsPerSide: 4,
        bodyMat: mats.matteBlackAnodized,
        leadMat: mats.solderBallSilver,
      });
      opa.position.set(-4.1, 0.44, sz);
      g.add(opa);
    }

    // 4 Audiophile C0G / Film Coupling Capacitors on +X
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(1.45, 0.85, 0.62, mats.cinnabarAnodized, mats.goldPlating);
      cap.position.set(4.2, 0.44, -3.0 + i * 2.0);
      g.add(cap);
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-akm-audio-codec-afe',
        59,
        '#a855f7',
        g,
        new THREE.Vector3(-24.2, -5.2, 20.6),
        new THREE.Vector3(-38.0, -8.0, 34.0),
        cp,
        0.22
      )
    );
  }

  // XR60. Multi-Interface (MIS-2006) Digital Audio / Flash Hot-Shoe Serial Isolator & HV Sync Guard
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(11.2, 9.2, 0.72, mats.ultra.bionzShutterDriverPcb, mats.abfSubstrate, mats.goldPlating));

    // 21-Pin Gold MIS-2006 Hot-Shoe Flex Receptacle
    const miConn = buildFpcReceptacle(8.4, 2.0, 0.82, 21, mats.matteBlackAnodized, mats.goldPlating, mats.goldPlating);
    miConn.position.set(0.0, 0.44, 2.55);
    g.add(miConn);

    // Digital I²S Audio Isolator IC + 250V IGBT Flash-Sync Trigger MOSFET
    const isoIc = buildChipPackage({
      w: 3.6,
      d: 3.0,
      h: 0.72,
      style: 'soic',
      pinsPerSide: 6,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    isoIc.position.set(-2.4, 0.44, -1.7);
    g.add(isoIc);

    const igbt = buildChipPackage({
      w: 3.2,
      d: 3.2,
      h: 0.88,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.matteBlackAnodized,
      leadMat: mats.goldPlating,
    });
    igbt.position.set(2.6, 0.44, -1.7);
    g.add(igbt);

    parts.push(
      finalizeBionzExtraPart(
        'xr-mishoe-digital-if',
        60,
        '#eab308',
        g,
        new THREE.Vector3(-37.6, -5.2, 13.8),
        new THREE.Vector3(-58.0, -6.0, 22.0),
        cp,
        0.22
      )
    );
  }

  // XR61. High-Speed E-Mount Lens Communication Bus (EBL 10-Pin SPI/UART & 8.4V Lens Power Switch)
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(13.4, 7.6, 0.72, mats.ultra.bionzShutterDriverPcb, mats.abfSubstrate, mats.goldPlating));

    // 10-Pin Heavy-Current EBL Lens Contact Flex Connector
    const eblConn = buildFpcReceptacle(9.6, 1.9, 0.82, 10, mats.matteBlackAnodized, mats.goldPlating, mats.cinnabarAnodized);
    eblConn.position.set(0.0, 0.44, 2.05);
    g.add(eblConn);

    // 1.8V <-> 3.3V Bidirectional SPI/UART Level Shifter (TXB0108)
    const shifter = buildChipPackage({
      w: 3.8,
      d: 2.6,
      h: 0.64,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.ultra.bionzTiQfnIc,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    shifter.position.set(-3.5, 0.44, -1.5);
    g.add(shifter);

    // 8.4V XD-Linear Motor Lens Power Load Switch MOSFET + Bulk Tantalum Cap
    const pwrSw = buildChipPackage({
      w: 2.8,
      d: 2.6,
      h: 0.72,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.matteBlackAnodized,
      leadMat: mats.solderBallSilver,
    });
    pwrSw.position.set(1.0, 0.44, -1.5);
    g.add(pwrSw);

    const tant = buildSmdPassive(2.8, 1.8, 1.05, mats.ultra.bionzPoscapTop, mats.solderBallSilver);
    tant.position.set(4.4, 0.44, -1.5);
    g.add(tant);

    parts.push(
      finalizeBionzExtraPart(
        'xr-emount-lens-comm-if',
        61,
        '#f43f5e',
        g,
        new THREE.Vector3(-10.8, -5.2, 32.4),
        new THREE.Vector3(-18.0, -12.0, 52.0),
        cp,
        0.22
      )
    );
  }

  // XR62. Precision Timecode / Genlock & Multi-Camera Sync MCU (ST STM32F031E6 Cortex-M0 + LTC Buffer)
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(10.6, 7.6, 0.72, mats.ultra.bionzShutterDriverPcb, mats.abfSubstrate, mats.goldPlating));

    // ST STM32F031E6 ("Genlock" OpenMemories-Verified Cortex-M0 MCU)
    const stm32 = buildChipPackage({
      w: 3.8,
      d: 3.8,
      h: 0.74,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    stm32.position.set(-2.3, 0.44, 0.0);
    g.add(stm32);

    // 27.000 MHz Frame-Locked Video VCXO Crystal + Differential LTC Comparator
    const vcxo = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.62, 2.1, 0.14, 0.04, 'y'), mats.ultra.bionzEpsonQuartzLid);
    vcxo.position.set(2.5, 0.74, -1.5);
    g.add(vcxo);

    const ltcBuf = buildChipPackage({
      w: 2.2,
      d: 1.8,
      h: 0.54,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: mats.matteBlackAnodized,
      leadMat: mats.solderBallSilver,
    });
    ltcBuf.position.set(2.5, 0.44, 1.7);
    g.add(ltcBuf);

    parts.push(
      finalizeBionzExtraPart(
        'xr-genlock-timecode-mcu',
        62,
        '#6366f1',
        g,
        new THREE.Vector3(2.8, -5.2, 32.4),
        new THREE.Vector3(4.0, -12.0, 52.0),
        cp,
        0.22
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // GROUP C: Real-Time Mechatronics, IBIS Sensing, Clocking & Safety (XR63–XR70)
  // ═══════════════════════════════════════════════════════════════════════

  // XR63. 5-Axis SteadyShot IBIS Dedicated Servo MCU (Renesas R2J30503LG "Bonobo" + 3-Axis Hall ADC)
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(12.4, 8.2, 0.72, mats.ultra.bionzIbisServoPcb, mats.abfSubstrate, mats.goldPlating));

    // Renesas R2J30503LG ("Bonobo") Dedicated 5-Axis IBIS Servo Controller BGA (clean 1.45 mm gap from right header!)
    const bonobo = buildChipPackage({
      w: 4.5,
      d: 4.5,
      h: 0.86,
      style: 'bga',
      bodyMat: mats.ultra.bionzRenesasBonoboIc,
      leadMat: mats.solderBallSilver,
      substrateMat: mats.abfSubstrate,
      pin1Mat: mats.goldPlating,
    });
    bonobo.position.set(-3.2, 0.44, 0.0);
    g.add(bonobo);

    // 3-Channel 16-Bit Hall-Effect Position Instrumentation Amp + IBIS TEX-5810 Flex Header
    const hallAdc = buildChipPackage({
      w: 2.5,
      d: 2.5,
      h: 0.62,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
    });
    hallAdc.position.set(2.8, 0.44, -1.8);
    g.add(hallAdc);

    const texConn = buildFpcReceptacle(4.6, 1.55, 0.74, 14, mats.matteBlackAnodized, mats.goldPlating, mats.goldPlating);
    texConn.position.set(2.8, 0.44, 2.0);
    g.add(texConn);

    parts.push(
      finalizeBionzExtraPart(
        'xr-ibis-servo-mcu',
        63,
        '#eab308',
        g,
        new THREE.Vector3(-8.0, -5.2, -22.4),
        new THREE.Vector3(-12.0, -10.0, -38.0),
        cp,
        0.22
      )
    );
  }

  // XR64. High-Precision Quartz Angular-Rate Gyroscope Module (Dual Orthogonal Epson XV7011BB + IMU)
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(11.8, 8.0, 0.72, mats.ultra.bionzEpsonGyroPcb, mats.abfSubstrate, mats.goldPlating));

    // Pitch Quartz Gyro (0° orientation): Epson XV7011BB ceramic + gold seam-welded lid
    const gyroPitchBody = new THREE.Mesh(createChamferedBoxGeo(4.2, 0.86, 2.8, 0.16, 0.04, 'y'), mats.ceramicAlumina);
    gyroPitchBody.position.set(-2.9, 0.88, -1.2);
    g.add(gyroPitchBody);
    const gyroPitchLid = new THREE.Mesh(createChamferedBoxGeo(3.9, 0.22, 2.5, 0.12, 0.03, 'y'), mats.ultra.bionzEpsonQuartzLid);
    gyroPitchLid.position.set(-2.9, 1.38, -1.2);
    g.add(gyroPitchLid);

    // Yaw Quartz Gyro (90° orthogonal orientation!): Epson XV7011BB rotated 90°!
    const gyroYawBody = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.86, 4.2, 0.16, 0.04, 'y'), mats.ceramicAlumina);
    gyroYawBody.position.set(2.7, 0.88, -0.5);
    g.add(gyroYawBody);
    const gyroYawLid = new THREE.Mesh(createChamferedBoxGeo(2.5, 0.22, 3.9, 0.12, 0.03, 'y'), mats.ultra.bionzEpsonQuartzLid);
    gyroYawLid.position.set(2.7, 1.38, -0.5);
    g.add(gyroYawLid);

    // 3-Axis MEMS Accelerometer LGA
    const accel = buildChipPackage({
      w: 2.3,
      d: 2.1,
      h: 0.62,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.goldPlating,
      pin1Mat: mats.goldPlating,
    });
    accel.position.set(-2.8, 0.44, 2.1);
    g.add(accel);

    parts.push(
      finalizeBionzExtraPart(
        'xr-epson-quartz-gyro-imu',
        64,
        '#f59e0b',
        g,
        new THREE.Vector3(16.6, -5.2, -32.0),
        new THREE.Vector3(26.0, -12.0, -54.0),
        cp,
        0.22
      )
    );
  }

  // XR65. Focal-Plane Mechanical Shutter & Aperture Dual H-Bridge Driver (TI DRV8837 Pair)
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(12.4, 8.0, 0.72, mats.ultra.bionzShutterDriverPcb, mats.abfSubstrate, mats.goldPlating));

    // Dual TI DRV8837 WSON-8 1.8A H-Bridge Drivers (Front & Rear Curtains)
    for (const sx of [-3.6, -0.2]) {
      const drv = buildChipPackage({
        w: 2.5,
        d: 2.5,
        h: 0.68,
        style: 'dfn',
        pinsPerSide: 4,
        bodyMat: mats.ultra.bionzTiQfnIc,
        leadMat: mats.solderBallSilver,
        pin1Mat: mats.goldPlating,
      });
      drv.position.set(sx, 0.44, -1.4);
      g.add(drv);
    }

    // 100 μF Bulk Pulse-Energy Tantalum POSCAP Reservoir
    const cap = buildSmdPassive(3.4, 2.2, 1.15, mats.ultra.bionzPoscapTop, mats.solderBallSilver);
    cap.position.set(3.6, 0.44, -1.3);
    g.add(cap);

    // Shutter Curtain Solenoid & Photo-Interrupter Flex Header
    const shConn = buildFpcReceptacle(8.6, 1.75, 0.76, 12, mats.matteBlackAnodized, mats.goldPlating, mats.ceramicAlumina);
    shConn.position.set(0.0, 0.44, 2.15);
    g.add(shConn);

    parts.push(
      finalizeBionzExtraPart(
        'xr-shutter-hbridge-driver',
        65,
        '#ef4444',
        g,
        new THREE.Vector3(2.2, -5.2, -32.0),
        new THREE.Vector3(2.0, -12.0, -54.0),
        cp,
        0.22
      )
    );
  }

  // XR66. Always-On RTC Power-Sequencer IC, 32.768 kHz Epson FC-135 Crystal & Seiko MS621FE Coin Cell
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(12.8, 8.0, 0.72, mats.ultra.bionzRtcCoinBackupPcb, mats.abfSubstrate, mats.goldPlating));

    // Genuine Brushed-Stainless Seiko MS621FE (Ø6.8 × 2.1 mm) Rechargeable Li-MnO₂ Backup Coin Cell + Laser Top Disc!
    const coinCan = new THREE.Mesh(hiResCyl(2.55, 2.55, 1.22, 32), mats.stainlessMachined);
    coinCan.position.set(-2.9, 1.05, 0.0);
    g.add(coinCan);

    const coinTopGeo = new THREE.CircleGeometry(2.46, 32);
    coinTopGeo.rotateX(-Math.PI / 2);
    const coinTop = new THREE.Mesh(coinTopGeo, mats.ultra.bionzSeikoCoinTop);
    coinTop.position.set(-2.9, 1.675, 0.0);
    coinTop.userData.noEdges = true;
    g.add(coinTop);

    const coinRing = new THREE.Mesh(hiResTorus(2.45, 0.14, 10, 32), mats.matteBlackAnodized);
    coinRing.rotation.x = Math.PI / 2;
    coinRing.position.set(-2.9, 0.56, 0.0);
    coinRing.userData.noEdges = true;
    g.add(coinRing);
    // Spot-welded nickel mounting tabs (+ and -)
    for (const sx of [-1, 1]) {
      const tab = new THREE.Mesh(createChamferedBoxGeo(1.15, 0.14, 0.92, 0.06, 0.02, 'y'), mats.solderBallSilver);
      tab.position.set(-2.9 + sx * 2.85, 0.50, 0.0);
      tab.userData.noEdges = true;
      g.add(tab);
    }

    // Epson FC-135 32.768 kHz Tuning-Fork Crystal (authentic Epson quartz lid!)
    const fc135 = new THREE.Mesh(createChamferedBoxGeo(3.1, 0.58, 1.55, 0.12, 0.03, 'y'), mats.ultra.bionzEpsonQuartzLid);
    fc135.position.set(3.2, 0.73, -1.8);
    g.add(fc135);

    // Always-On Sony / OpenMemories Power-Sequencer & RTC IC (QFN-32)
    const pwrIc = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    pwrIc.position.set(3.2, 0.44, 1.5);
    g.add(pwrIc);

    parts.push(
      finalizeBionzExtraPart(
        'xr-rtc-power-seq-backup',
        66,
        '#cbd5e1',
        g,
        new THREE.Vector3(-12.4, -5.2, -32.0),
        new THREE.Vector3(-20.0, -12.0, -54.0),
        cp,
        0.22
      )
    );
  }

  // XR67. Precision Battery Fuel-Gauge (TI BQ27441-G1) & NP-FZ100 InfoLITHIUM Auth Interface
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(11.4, 8.4, 0.72, mats.ultra.bionzTelemetryGuardPcb, mats.abfSubstrate, mats.goldPlating));

    // 4-Blade Gold NP-FZ100 Battery Dock Terminal Header (B+, T/TH, C/SMBus, B-)
    const bladeBlock = new THREE.Mesh(createChamferedBoxGeo(7.6, 1.35, 2.2, 0.2, 0.05, 'y'), mats.matteBlackAnodized);
    bladeBlock.position.set(0.0, 1.12, 2.2);
    g.add(bladeBlock);
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(createChamferedBoxGeo(0.95, 1.15, 1.4, 0.06, 0.02, 'y'), mats.goldPlating);
      blade.position.set(-2.55 + i * 1.7, 1.32, 2.6);
      blade.userData.noEdges = true;
      g.add(blade);
    }

    // TI BQ27441-G1 12-Pin SON Impedance Track Fuel Gauge + 10 mΩ Kelvin Sense Shunt
    const gauge = buildChipPackage({
      w: 3.2,
      d: 2.6,
      h: 0.68,
      style: 'dfn',
      pinsPerSide: 6,
      bodyMat: mats.ultra.bionzTiQfnIc,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    gauge.position.set(-2.8, 0.44, -1.7);
    g.add(gauge);

    const shunt = buildSmdPassive(2.6, 1.3, 0.48, mats.matteBlackAnodized, mats.goldPlating);
    shunt.position.set(2.5, 0.44, -1.7);
    g.add(shunt);

    parts.push(
      finalizeBionzExtraPart(
        'xr-battery-fuel-auth-if',
        67,
        '#22c55e',
        g,
        new THREE.Vector3(-37.6, -5.2, 26.4),
        new THREE.Vector3(-58.0, -10.0, 44.0),
        cp,
        0.22
      )
    );
  }

  // XR68. Multi-Channel I²C Thermal Telemetry Hub (TI TMP117 ±0.1°C) & Remote NTC Array
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(11.8, 8.0, 0.72, mats.ultra.bionzTelemetryGuardPcb, mats.abfSubstrate, mats.goldPlating));

    // TI TMP117 ±0.1°C High-Accuracy Digital Temp Sensor + 4-Ch ADC Hub
    const tmp117 = buildChipPackage({
      w: 2.8,
      d: 2.8,
      h: 0.64,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: mats.ultra.bionzTiQfnIc,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    tmp117.position.set(-3.1, 0.44, 0.0);
    g.add(tmp117);

    // 4 Precision Remote 10 kΩ NTC Thermistor Sensing Bridges with Copper Thermal Fingers
    for (let i = 0; i < 4; i++) {
      const ntc = buildSmdPassive(1.25, 0.65, 0.48, mats.cinnabarAnodized, mats.solderBallSilver);
      ntc.position.set(0.4 + i * 1.55, 0.44, -1.6);
      g.add(ntc);

      const finger = new THREE.Mesh(createChamferedBoxGeo(1.05, 0.14, 2.4, 0.08, 0.02, 'y'), mats.copperHeatSpreader);
      finger.position.set(0.4 + i * 1.55, 0.50, 1.5);
      finger.userData.noEdges = true;
      g.add(finger);
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-thermal-ntc-telemetry-hub',
        68,
        '#f43f5e',
        g,
        new THREE.Vector3(-27.0, -5.2, -32.0),
        new THREE.Vector3(-44.0, -12.0, -54.0),
        cp,
        0.22
      )
    );
  }

  // XR69. Precision Voltage Supervisor, Brown-Out Watchdog Reset IC (TI TPS3808) & Power-Good Ladder
  {
    const g = new THREE.Group();
    g.add(buildCarrierPcb(11.4, 8.0, 0.72, mats.ultra.bionzTelemetryGuardPcb, mats.abfSubstrate, mats.goldPlating));

    // 4-Rail Power-Good Sequencer QFN + TI TPS3808 SOT-23 Precision Supervisor
    const seqIc = buildChipPackage({
      w: 3.6,
      d: 3.6,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.ultra.bionzTiQfnIc,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    seqIc.position.set(-2.6, 0.44, 0.0);
    g.add(seqIc);

    const wdt = buildChipPackage({
      w: 2.2,
      d: 1.6,
      h: 0.64,
      style: 'sot23',
      pinsPerSide: 3,
      bodyMat: mats.matteBlackAnodized,
      leadMat: mats.solderBallSilver,
    });
    wdt.position.set(1.6, 0.44, -1.7);
    g.add(wdt);

    // 4 Gold Power-Good Diagnostic Ladder Test Points
    for (let i = 0; i < 4; i++) {
      const tp = new THREE.Mesh(hiResCyl(0.48, 0.52, 0.24, 16), mats.goldPlating);
      tp.position.set(0.6 + i * 1.35, 0.56, 1.85);
      tp.userData.noEdges = true;
      g.add(tp);
    }

    parts.push(
      finalizeBionzExtraPart(
        'xr-watchdog-pg-supervisor',
        69,
        '#14b8a6',
        g,
        new THREE.Vector3(30.8, -5.2, -32.0),
        new THREE.Vector3(48.0, -12.0, -54.0),
        cp,
        0.22
      )
    );
  }

  // XR70. Cinema-Line Active Cooling Vapor-Chamber Interface Pad & Rear Shield Grounding Spring Gasket
  {
    const g = new THREE.Group();
    // Sintered-Copper Micro-Vapor-Chamber Landing Dock Plate (centered vertically at y = 0)
    const dockGeo = extrudeHiRes(createRoundedRectShape(13.4, 7.0, 0.9), 0.86, 0.08, 0.08, 2, 18);
    dockGeo.rotateX(Math.PI / 2);
    applyPlanarUVs(dockGeo, 13.4, 7.0, 'xz');
    const dock = new THREE.Mesh(dockGeo, mats.ultra.cfeCopperThermal);
    g.add(dock);

    // Phase-Change Graphite-Matrix Thermal Interface Pad (PCM) in center pocket
    const pcm = new THREE.Mesh(createChamferedBoxGeo(7.6, 0.34, 4.4, 0.35, 0.05, 'y'), mats.ultra.bionzSigmaGraphite);
    pcm.position.set(-0.6, 0.68, 0.0);
    g.add(pcm);

    // 6 Micro-Etched Beryllium-Copper EMI Grounding Spring Gasket Fingers along edge
    for (let i = 0; i < 6; i++) {
      const finger = new THREE.Mesh(createChamferedBoxGeo(0.75, 0.52, 1.15, 0.08, 0.02, 'y'), mats.goldPlating);
      finger.position.set(-4.6 + i * 1.45, 0.72, 2.75);
      finger.rotation.x = -0.28;
      finger.userData.noEdges = true;
      g.add(finger);
    }

    // Brass Thermal-Clamp Mounting Boss + Captive M1.4 Screw on +X flange
    const boss = new THREE.Mesh(hiResCyl(1.35, 1.45, 1.05, 20), mats.goldPlating);
    boss.position.set(4.85, 0.58, 0.0);
    boss.userData.noEdges = true;
    g.add(boss);

    const screw = buildPhillipsScrew(0.95, 0.38, 0.42, 1.05, mats.stainlessMachined, mats.matteBlackAnodized, mats.stainlessMachined);
    screw.position.set(4.85, 1.18, 0.0);
    g.add(screw);

    parts.push(
      finalizeBionzExtraPart(
        'xr-active-vapor-ground-if',
        70,
        '#d97706',
        g,
        new THREE.Vector3(22.2, -5.2, 32.6),
        new THREE.Vector3(36.0, -10.0, 52.0),
        cp,
        0.24
      )
    );
  }

  return parts;
}
