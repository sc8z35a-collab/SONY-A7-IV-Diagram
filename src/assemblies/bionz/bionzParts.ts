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
  buildPhillipsScrew,
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

/** Build an authentic octagonal multi-turn on-die planar copper spiral inductor (RF balun / LC-tank VCO / CTLE T-coil) */
function buildOctagonalSpiralCoil(
  outerR: number,
  turns: number,
  traceW: number,
  traceH: number,
  mat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const segsPerTurn = 8;
  const totalSegs = Math.round(turns * segsPerTurn);
  const rMin = outerR * 0.34;
  for (let i = 0; i < totalSegs; i++) {
    const f0 = i / totalSegs;
    const f1 = (i + 1) / totalSegs;
    const a0 = f0 * turns * Math.PI * 2 + Math.PI / 8;
    const a1 = f1 * turns * Math.PI * 2 + Math.PI / 8;
    const r0 = outerR - (outerR - rMin) * f0;
    const r1 = outerR - (outerR - rMin) * f1;
    const x0 = Math.cos(a0) * r0;
    const z0 = Math.sin(a0) * r0;
    const x1 = Math.cos(a1) * r1;
    const z1 = Math.sin(a1) * r1;
    const dx = x1 - x0;
    const dz = z1 - z0;
    const len = Math.hypot(dx, dz);
    if (len < 1e-4) continue;
    const seg = new THREE.Mesh(new THREE.BoxGeometry(len + traceW * 0.48, traceH, traceW), mat);
    seg.position.set((x0 + x1) * 0.5, 0, (z0 + z1) * 0.5);
    seg.rotation.y = -Math.atan2(dz, dx);
    seg.userData.noEdges = true;
    g.add(seg);
  }
  return g;
}

/** Build an authentic bent cantilever EMI grounding spring finger (Amkor SUS/Cu/SUS conformal shield contact) */
function buildCantileverEmiFinger(
  width: number,
  height: number,
  springMat: THREE.Material,
  dimpleMat: THREE.Material,
  tabMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  // Upper spring arm curving outward (+Z) to apex ridge
  const upperArm = new THREE.Mesh(
    createChamferedBoxGeo(width, height * 0.54, 0.16, 0.05, 0.02, 'y'),
    springMat
  );
  upperArm.position.set(0, height * 0.24, 0.07);
  upperArm.rotation.x = -0.18;
  upperArm.userData.noEdges = true;

  // Lower return tongue tapering inward toward PCB ground pad
  const lowerArm = new THREE.Mesh(
    createChamferedBoxGeo(width * 0.88, height * 0.52, 0.16, 0.05, 0.02, 'y'),
    springMat
  );
  lowerArm.position.set(0, -height * 0.22, 0.05);
  lowerArm.rotation.x = 0.22;
  lowerArm.userData.noEdges = true;

  // Embossed spherical silver contact dimple at spring apex
  const dimple = new THREE.Mesh(hiResSphere(0.24, 10, 8), dimpleMat);
  dimple.scale.set(1.15, 0.85, 0.72);
  dimple.position.set(0, 0.02, 0.19);
  dimple.userData.noEdges = true;

  // Gold-plated solderable PCB grounding foot heel
  const foot = new THREE.Mesh(new THREE.BoxGeometry(width * 0.78, 0.14, 0.44), tabMat);
  foot.position.set(0, -height * 0.48, -0.06);
  foot.userData.noEdges = true;

  g.add(upperArm, lowerArm, dimple, foot);
  return g;
}

/** Build a realistic Murata DFE / TDK SPM molded metal-alloy powder shielded power inductor with folded L-terminals */
function buildMetalAlloyInductor(
  size: number,
  height: number,
  bodyMat: THREE.Material,
  termMat: THREE.Material,
  padMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const bodyGeo = createChamferedBoxGeo(size, height, size, size * 0.14, Math.min(height * 0.18, 0.12), 'y');
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  g.add(body);

  // Authentic folded bottom-wrap silver-tin L-terminals with glossy solder fillet heels
  for (const s of [-1, 1]) {
    const sideWrap = new THREE.Mesh(
      createChamferedBoxGeo(size * 0.14, height * 0.54, size * 0.62, 0.04, 0.02, 'y'),
      termMat
    );
    sideWrap.position.set(s * (size * 0.48), -height * 0.22, 0);
    sideWrap.userData.noEdges = true;

    const footPad = new THREE.Mesh(
      new THREE.BoxGeometry(size * 0.34, 0.10, size * 0.72),
      padMat
    );
    footPad.position.set(s * (size * 0.38), -height * 0.52, 0);
    footPad.userData.noEdges = true;
    g.add(sideWrap, footPad);
  }
  return g;
}

/** Build an authentic matte-black Panasonic POSCAP molded polymer-tantalum capacitor with beveled anode bar & J-leads */
function buildPoscapPolymerCap(
  length: number,
  width: number,
  height: number,
  bodyMat: THREE.Material,
  topMat: THREE.Material,
  leadMat: THREE.Material,
  solderMat: THREE.Material,
  padMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  // Molded matte-black conductive-polymer tantalum resin case
  const body = new THREE.Mesh(
    createChamferedBoxGeo(length, height, width, Math.min(width * 0.12, 0.20), Math.min(height * 0.16, 0.10), 'y'),
    bodyMat
  );
  g.add(body);

  // Crisp laser-marked top face (white + anode bar & "330 e8 2R5" capacitance/voltage spec)
  const topPlate = new THREE.Mesh(
    markHiRes(new THREE.PlaneGeometry(length * 0.90, width * 0.86)),
    topMat
  );
  topPlate.rotation.x = -Math.PI / 2;
  topPlate.position.y = height * 0.5 + 0.022;
  topPlate.userData.noEdges = true;
  g.add(topPlate);

  // Authentic beveled + anode polarity chamfer ridge along -X end
  const anodeBevel = new THREE.Mesh(
    createChamferedBoxGeo(length * 0.11, height * 0.22, width * 0.86, 0.04, 0.02, 'y'),
    leadMat
  );
  anodeBevel.position.set(-length * 0.43, height * 0.40, 0);
  anodeBevel.userData.noEdges = true;
  g.add(anodeBevel);

  // Underside bent silver-tin J-lead electrodes + concave SAC305 solder fillets + ENIG land pads
  for (const s of [-1, 1]) {
    const jVert = new THREE.Mesh(new THREE.BoxGeometry(length * 0.08, height * 0.58, width * 0.56), leadMat);
    jVert.position.set(s * (length * 0.48), -height * 0.20, 0);
    jVert.userData.noEdges = true;
    const jFoot = new THREE.Mesh(new THREE.BoxGeometry(length * 0.26, 0.11, width * 0.58), leadMat);
    jFoot.position.set(s * (length * 0.38), -height * 0.49, 0);
    jFoot.userData.noEdges = true;
    const fillet = new THREE.Mesh(hiResCyl(0.14, 0.28, width * 0.56, 8), solderMat);
    fillet.rotation.x = Math.PI / 2;
    fillet.position.set(s * (length * 0.54), -height * 0.39, 0);
    fillet.userData.noEdges = true;
    const pad = new THREE.Mesh(new THREE.BoxGeometry(length * 0.34, 0.06, width * 0.72), padMat);
    pad.position.set(s * (length * 0.42), -height * 0.54, 0);
    pad.userData.noEdges = true;
    g.add(jVert, jFoot, fillet, pad);
  }
  return g;
}

/** Build an authentic Murata LLD 3-terminal low-ESL feedthrough MLCC (central wrap-around GND belt + 2 end caps) */
function buildThreeTerminalMlcc(
  length: number,
  width: number,
  height: number,
  bodyMat: THREE.Material,
  termMat: THREE.Material,
  padMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    createChamferedBoxGeo(length * 0.82, height * 0.92, width * 0.92, width * 0.08, 0.04, 'y'),
    bodyMat
  );
  body.userData.noEdges = true;
  g.add(body);

  // Twin feedthrough IN/OUT silver end caps
  for (const s of [-1, 1]) {
    const cap = new THREE.Mesh(
      createChamferedBoxGeo(length * 0.22, height, width, width * 0.10, 0.04, 'y'),
      termMat
    );
    cap.position.x = s * (length * 0.40);
    cap.userData.noEdges = true;
    const endPad = new THREE.Mesh(new THREE.BoxGeometry(length * 0.28, 0.07, width * 1.06), padMat);
    endPad.position.set(s * (length * 0.43), height * 0.52, 0);
    endPad.userData.noEdges = true;
    g.add(cap, endPad);
  }

  // Signature wide central wrap-around silver GND electrode belt & ENEPIG center ground land
  const gndBelt = new THREE.Mesh(
    createChamferedBoxGeo(length * 0.28, height * 1.04, width * 1.04, width * 0.08, 0.04, 'y'),
    termMat
  );
  gndBelt.userData.noEdges = true;
  const gndPad = new THREE.Mesh(new THREE.BoxGeometry(length * 0.34, 0.07, width * 1.24), padMat);
  gndPad.position.set(0, height * 0.52, 0);
  gndPad.userData.noEdges = true;
  g.add(gndBelt, gndPad);
  return g;
}

/** Build an authentic Murata DLM11SN 4-electrode ferrite differential common-mode choke */
function buildFourTermCommonModeChoke(
  length: number,
  width: number,
  height: number,
  bodyMat: THREE.Material,
  termMat: THREE.Material,
  dotMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    createChamferedBoxGeo(length, height, width, width * 0.10, 0.04, 'y'),
    bodyMat
  );
  body.userData.noEdges = true;
  g.add(body);

  // Subtle central dual-winding magnetic lamination groove across top face
  const groove = new THREE.Mesh(new THREE.BoxGeometry(length * 0.92, 0.06, width * 0.14), termMat);
  groove.position.y = height * 0.48;
  groove.userData.noEdges = true;
  g.add(groove);

  // 4 distinct corner wrap-around gold/silver electrodes (Pins 1-4)
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const elec = new THREE.Mesh(
        createChamferedBoxGeo(length * 0.26, height * 0.96, width * 0.30, 0.04, 0.02, 'y'),
        termMat
      );
      elec.position.set(sx * (length * 0.39), -0.02, sz * (width * 0.36));
      elec.userData.noEdges = true;
      g.add(elec);
    }
  }

  // Crisp Pin-1 orientation polarity dot on top corner
  const pin1 = new THREE.Mesh(hiResCyl(0.11, 0.11, 0.05, 10), dotMat);
  pin1.position.set(-length * 0.28, height * 0.51, -width * 0.24);
  pin1.userData.noEdges = true;
  g.add(pin1);
  return g;
}

/** Build an authentic rectangular wettable-flank WQFN package (e.g., TI TDP2004RNQ 4x6mm WQFN-40: 12 long + 8 short) */
function buildRectangularQfn(opts: {
  w: number;
  d: number;
  h: number;
  pinsX: number;
  pinsZ: number;
  bodyMat: THREE.Material;
  leadMat: THREE.Material;
  solderMat: THREE.Material;
  topAccentMat: THREE.Material;
  pin1Mat: THREE.Material;
}): THREE.Group {
  const { w, d, h, pinsX, pinsZ, bodyMat, leadMat, solderMat, topAccentMat, pin1Mat } = opts;
  const g = new THREE.Group();

  const body = new THREE.Mesh(
    createChamferedBoxGeo(w, h, d, Math.min(w, d) * 0.06, Math.min(h * 0.18, 0.10), 'y'),
    bodyMat
  );
  g.add(body);

  const topPlate = new THREE.Mesh(markHiRes(new THREE.PlaneGeometry(w * 0.90, d * 0.90)), topAccentMat);
  topPlate.rotation.x = -Math.PI / 2;
  topPlate.position.y = h * 0.5 + 0.024;
  topPlate.userData.noEdges = true;
  g.add(topPlate);

  // Recessed Pin-1 laser index dot & diagonal mold ejector-pin witness ring
  const pin1 = new THREE.Mesh(hiResCyl(0.18, 0.18, 0.05, 12), pin1Mat);
  pin1.position.set(-w * 0.34, h * 0.5 + 0.02, -d * 0.38);
  pin1.userData.noEdges = true;
  const ejector = new THREE.Mesh(hiResTorus(0.24, 0.04, 6, 14).rotateX(Math.PI / 2), bodyMat);
  ejector.position.set(w * 0.30, h * 0.5 + 0.02, d * 0.36);
  ejector.userData.noEdges = true;
  g.add(pin1, ejector);

  // Short-side wettable-flank leads along -Z / +Z (pinsX per side)
  const padH = Math.min(0.28, h * 0.34);
  const padOut = 0.24;
  const spanX = w * 0.72;
  const stepX = pinsX > 1 ? spanX / (pinsX - 1) : 0;
  const leadWX = Math.min(0.24, (spanX / Math.max(1, pinsX)) * 0.54);
  for (let i = 0; i < pinsX; i++) {
    const px = -spanX * 0.5 + i * stepX;
    for (const s of [-1, 1]) {
      const lead = new THREE.Mesh(new THREE.BoxGeometry(leadWX, padH, padOut), leadMat);
      lead.position.set(px, -h * 0.33, s * (d * 0.5 + padOut * 0.22));
      lead.userData.noEdges = true;
      const fillet = new THREE.Mesh(new THREE.BoxGeometry(leadWX * 1.05, padH * 0.45, padOut * 0.85), solderMat);
      fillet.position.set(px, -h * 0.44, s * (d * 0.5 + padOut * 0.56));
      fillet.userData.noEdges = true;
      g.add(lead, fillet);
    }
  }

  // Long-side wettable-flank leads along -X / +X (pinsZ per side)
  const spanZ = d * 0.76;
  const stepZ = pinsZ > 1 ? spanZ / (pinsZ - 1) : 0;
  const leadWZ = Math.min(0.24, (spanZ / Math.max(1, pinsZ)) * 0.54);
  for (let i = 0; i < pinsZ; i++) {
    const pz = -spanZ * 0.5 + i * stepZ;
    for (const s of [-1, 1]) {
      const lead = new THREE.Mesh(new THREE.BoxGeometry(padOut, padH, leadWZ), leadMat);
      lead.position.set(s * (w * 0.5 + padOut * 0.22), -h * 0.33, pz);
      lead.userData.noEdges = true;
      const fillet = new THREE.Mesh(new THREE.BoxGeometry(padOut * 0.85, padH * 0.45, leadWZ * 1.05), solderMat);
      fillet.position.set(s * (w * 0.5 + padOut * 0.56), -h * 0.44, pz);
      fillet.userData.noEdges = true;
      g.add(lead, fillet);
    }
  }

  return g;
}

/** Build a precision concave-sloped L-shaped epoxy corner edge-bond stake (Henkel Loctite 3515 / ALPHA HiTech) */
function buildCornerEdgeBondStake(
  armLen: number,
  height: number,
  filletBaseW: number,
  mat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  // Cross-section of a real dispensed epoxy meniscus climbing up the vertical BGA wall and curving onto the PCB
  const meniscusShape = new THREE.Shape();
  meniscusShape.moveTo(0, -height * 0.5);
  meniscusShape.lineTo(filletBaseW, -height * 0.5);
  meniscusShape.quadraticCurveTo(filletBaseW * 0.34, -height * 0.18, 0.28, height * 0.5);
  meniscusShape.lineTo(0, height * 0.5);
  meniscusShape.closePath();

  const armGeoX = extrudeHiRes(meniscusShape, armLen, 0.06, 0.06, 2, 12);
  applyBoxUVs(armGeoX, 6.0);
  const armX = new THREE.Mesh(armGeoX, mat);
  // Orient so flat back sits against -Z substrate wall and meniscus slopes outward to +Z
  armX.rotation.y = -Math.PI / 2;
  armX.position.set(-armLen * 0.5, 0, 0);
  g.add(armX);

  const armGeoZ = extrudeHiRes(meniscusShape, armLen, 0.06, 0.06, 2, 12);
  applyBoxUVs(armGeoZ, 6.0);
  const armZ = new THREE.Mesh(armGeoZ, mat);
  armZ.position.set(0, 0, -armLen * 0.5);
  g.add(armZ);

  // Corner syringe start/stop apex swell dome + under-corner capillary anchor lip (gripping corner NC/GND balls)
  const apexDome = new THREE.Mesh(hiResCyl(0.55, filletBaseW * 0.96, height * 1.04, 18), mat);
  apexDome.position.set(0.35, 0, 0.35);
  apexDome.userData.noEdges = true;
  const underLip = new THREE.Mesh(
    createChamferedBoxGeo(armLen * 0.85, 0.36, 1.15, 0.25, 0.06, 'y'),
    mat
  );
  underLip.position.set(-armLen * 0.35, -height * 0.42, -0.45);
  underLip.userData.noEdges = true;
  const underLipZ = new THREE.Mesh(
    createChamferedBoxGeo(1.15, 0.36, armLen * 0.85, 0.25, 0.06, 'y'),
    mat
  );
  underLipZ.position.set(-0.45, -height * 0.42, -armLen * 0.35);
  underLipZ.userData.noEdges = true;
  g.add(apexDome, underLip, underLipZ);

  return g;
}

/**
 * Build all 46 forensic-grade, ultra-high-definition 3D CAD sub-assemblies of the
 * Sony BIONZ XR / BIONZ XR2 Semiconductor Package & Mainboard Interface Ultra-Dissection (XR01–XR46).
 *
 * Strictly preserves all 46 contiguous part IDs, orders (1..46), assembled positions, explode vectors,
 * and physics overlay alignment — zero parts added or removed.
 * Magnified 2:1 CAD scale (16x16 mm flagship PoP FC-BGA package -> 32x32 CAD units), centered at (0, 0, 0).
 * Grounded in OpenMemories CXD90057 "Mira" / CXD90058 "Cetus" / SA DSP "sabin", Sony α7 IV SY-1122 &
 * α7 V AT&S / Micron D8DNH PoP LPDDR5X teardowns, Amkor SUS/Cu/SUS sputter & TMV, TSMC CoWoS-L LSI bridge,
 * Murata 3D deep-trench eSiCap, Taiyo PSR-4000 ENEPIG, Kyocera KT2520 TCXO, Macronix MX25UM25645G NOR,
 * TI TDP2004 HDMI 2.1 FRL retimer + Semtech RClamp0524P ESD, Panasonic POSCAP, and Henkel Loctite 3515 edge-bond.
 * Strictly visible ONLY in standalone 'bionz' mode.
 */
export function buildBionzParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;
  const PKG_W = 32.0;
  const DIE_W = 20.8;

  // =========================================================================
  // XR01. Conformal Sputtered EMI Shield (SUS/Cu/SUS) & Laser-Marked Top Lid (y = +9.8)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Outer CNC-chamfered 0.18um SUS / 3.80um Cu / 0.18um SUS tri-layer sputtered EMI bezel frame rim
    const lidFrame = makeHiResHorizPlate(
      createFrameShape(PKG_W + 0.55, PKG_W + 0.55, 2.0, PKG_W - 2.3, PKG_W - 2.3, 1.1),
      0.74,
      mats.emiShieldCan,
      0.14,
      2,
      24
    );
    g.add(lidFrame);

    // Laser-marked brushed tri-layer sputtered top lid deck (SONY BIONZ XR / CXD90057 / CXD90066GG / ECC-200)
    const topPlateGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 1.8, PKG_W - 1.8, 1.0), 0.36, 0.06, 0.06, 2, 22);
    topPlateGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(topPlateGeo, PKG_W - 1.8, PKG_W - 1.8, 'xz');
    const topCap = new THREE.Mesh(topPlateGeo, u.bionzEmiLid);
    topCap.position.y = 0.22;
    g.add(topCap);

    // Exposed internal 3.80um electroplated Cu conductive sputter sub-layer visible along laser-ablated perimeter moat
    const cuSubRing = makeHiResHorizPlate(
      createFrameShape(PKG_W - 0.8, PKG_W - 0.8, 1.65, PKG_W - 1.55, PKG_W - 1.55, 1.35),
      0.14,
      mats.copperHybridBond,
      0.02,
      1,
      20
    );
    cuSubRing.position.y = 0.35;
    cuSubRing.userData.noEdges = true;
    g.add(cuSubRing);

    // Authentic Amkor laser-ablated internal RF compartment-isolation trench exposing gleaming Cu core along +X Cetus divider
    const trenchWall = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, PKG_W - 4.8), mats.matteBlackAnodized);
    trenchWall.position.set(12.35, 0.39, 0);
    trenchWall.userData.noEdges = true;
    const trenchCuCore = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, PKG_W - 5.0), mats.copperHybridBond);
    trenchCuCore.position.set(12.35, 0.40, 0);
    trenchCuCore.userData.noEdges = true;
    g.add(trenchWall, trenchCuCore);

    // Recessed gold Pin-1 triangular alignment chamfer inlay registered dead-center onto texture Pin-1 (82..148px)
    const triShape = new THREE.Shape();
    triShape.moveTo(0, 0);
    triShape.lineTo(0, -2.56);
    triShape.lineTo(2.56, 0);
    triShape.closePath();
    const pin1Geo = extrudeHiRes(triShape, 0.10, 0.02, 0.02, 1, 6);
    pin1Geo.rotateX(-Math.PI / 2);
    const pin1 = new THREE.Mesh(pin1Geo, mats.goldPlating);
    pin1.position.set(-11.88, 0.41, -11.88);
    pin1.userData.noEdges = true;
    g.add(pin1);

    // 3 corner machined gold optical cross-fiducials aligned dead-center onto 2D laser AOI crosshairs (96px / 672px)
    for (const [fx, fz] of [
      [-11.325, 11.325],
      [11.325, -11.325],
      [11.325, 11.325],
    ]) {
      const fH = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.06, 0.14), mats.goldPlating);
      fH.position.set(fx, 0.43, fz);
      fH.userData.noEdges = true;
      const fV = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 1.18), mats.goldPlating);
      fV.position.set(fx, 0.43, fz);
      fV.userData.noEdges = true;
      const fRing = new THREE.Mesh(hiResTorus(0.42, 0.055, 6, 16), mats.goldPlating);
      fRing.rotation.x = Math.PI / 2;
      fRing.position.set(fx, 0.43, fz);
      fRing.userData.noEdges = true;
      g.add(fH, fV, fRing);
    }

    // Full-depth conformal EMI shield perimeter skirt + exposed tri-layer SUS/Cu/SUS lower cross-section band
    const emiSkirt = makeHiResHorizPlate(
      createFrameShape(PKG_W + 0.58, PKG_W + 0.58, 2.0, PKG_W - 0.65, PKG_W - 0.65, 1.6),
      4.68,
      mats.emiShieldCan,
      0.08,
      2,
      24
    );
    emiSkirt.position.y = -2.56;
    const cuBottomReveal = makeHiResHorizPlate(
      createFrameShape(PKG_W + 0.48, PKG_W + 0.48, 1.95, PKG_W - 0.58, PKG_W - 0.58, 1.55),
      0.26,
      mats.copperHeatSpreader,
      0.02,
      1,
      20
    );
    cuBottomReveal.position.y = -4.92;
    cuBottomReveal.userData.noEdges = true;
    const innerSusBand = makeHiResHorizPlate(
      createFrameShape(PKG_W + 0.42, PKG_W + 0.42, 1.92, PKG_W - 0.54, PKG_W - 0.54, 1.52),
      0.12,
      mats.stainlessMachined,
      0.01,
      1,
      20
    );
    innerSusBand.position.y = -5.06;
    innerSusBand.userData.noEdges = true;
    g.add(emiSkirt, cuBottomReveal, innerSusBand);

    // 4 corner laser-welded sputter seam corner relief gussets
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const gusset = new THREE.Mesh(hiResCyl(0.36, 0.36, 4.5, 10), mats.stainlessMachined);
        gusset.position.set(sx * (PKG_W * 0.5 - 0.12), -2.56, sz * (PKG_W * 0.5 - 0.12));
        gusset.userData.noEdges = true;
        g.add(gusset);
      }
    }

    // 24 bent cantilever EMI grounding spring fingers (6 per side) with embossed apex dimples, kerf slits & ENIG tabs
    const sideDefs: Array<[number, number, number, boolean]> = [
      [0, PKG_W * 0.5 + 0.30, 0, false],
      [0, -PKG_W * 0.5 - 0.30, Math.PI, false],
      [PKG_W * 0.5 + 0.30, 0, Math.PI / 2, true],
      [-PKG_W * 0.5 - 0.30, 0, -Math.PI / 2, true],
    ];
    for (const [sx, sz, rotY, alongZ] of sideDefs) {
      for (let i = -2.5; i <= 2.5; i += 1.0) {
        const along = i * 4.6;
        const finger = buildCantileverEmiFinger(
          2.45,
          1.52,
          mats.stainlessMachined,
          mats.silverElectrode,
          mats.goldPlating
        );
        finger.rotation.y = rotY;
        finger.position.set(alongZ ? sx : along, -4.18, alongZ ? along : sz);
        g.add(finger);

        if (i < 2.5) {
          const kerf = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.66, 0.32), mats.matteBlackAnodized);
          kerf.rotation.y = rotY;
          kerf.position.set(alongZ ? sx : along + 2.3, -4.18, alongZ ? along + 2.3 : sz);
          kerf.userData.noEdges = true;
          g.add(kerf);
        }
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

    // CNC-chamfered 2-tier electroless-Ni (4-8um) over C1020 OFHC copper top deck with flycut lapping texture
    const ihsTopGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 0.9, PKG_W - 0.9, 1.8), 1.05, 0.24, 0.22, 3, 24);
    ihsTopGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(ihsTopGeo, PKG_W - 0.9, PKG_W - 0.9, 'xz');
    const ihsTop = new THREE.Mesh(ihsTopGeo, u.bionzIhsNickelCu);
    g.add(ihsTop);

    // TopLine H-CAP upper stepped thermal-contact crown pad + chamfered transition collar catching studio highlights
    const crownPadGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 4.4, PKG_W - 4.4, 1.3), 0.24, 0.08, 0.06, 2, 20);
    crownPadGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(crownPadGeo, PKG_W - 4.4, PKG_W - 4.4, 'xz');
    const crownPad = new THREE.Mesh(crownPadGeo, u.bionzIhsNickelCu);
    crownPad.position.y = 0.56;
    const crownRim = makeHiResHorizPlate(
      createFrameShape(PKG_W - 3.9, PKG_W - 3.9, 1.45, PKG_W - 4.5, PKG_W - 4.5, 1.25),
      0.10,
      mats.stainlessMachined,
      0.02,
      1,
      20
    );
    crownRim.position.y = 0.52;
    crownRim.userData.noEdges = true;
    g.add(crownPad, crownRim);

    // Satin nickel-plated perimeter skirt flange with epoxy lid-attach seal ring channel & breather tunnel
    const flange = makeHiResHorizPlate(
      createFrameShape(PKG_W - 0.6, PKG_W - 0.6, 1.8, PKG_W - 4.4, PKG_W - 4.4, 1.1),
      1.56,
      mats.stainlessMachined,
      0.12,
      2,
      22
    );
    flange.position.y = -1.12;
    g.add(flange);

    // Dark recessed perimeter silicone lid-attach adhesive seal channel along IHS bottom foot
    const sealBead = makeHiResHorizPlate(
      createFrameShape(PKG_W - 1.25, PKG_W - 1.25, 1.65, PKG_W - 3.65, PKG_W - 3.65, 1.2),
      0.24,
      mats.epdmGasket,
      0.04,
      1,
      20
    );
    sealBead.position.y = -1.88;
    sealBead.userData.noEdges = true;
    g.add(sealBead);

    // Authentic stepped FC-BGA corner air-breather cure vent tunnel (relieves lid-attach autoclave pressure!)
    const ventTunnel = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.58, 2.3), mats.matteBlackAnodized);
    ventTunnel.position.set(PKG_W * 0.5 - 1.38, -1.66, PKG_W * 0.5 - 1.38);
    ventTunnel.rotation.y = Math.PI / 4;
    ventTunnel.userData.noEdges = true;
    const ventLiner = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.16, 1.25), mats.copperHeatSpreader);
    ventLiner.position.set(PKG_W * 0.5 - 1.48, -1.42, PKG_W * 0.5 - 1.48);
    ventLiner.rotation.y = Math.PI / 4;
    ventLiner.userData.noEdges = true;
    g.add(ventTunnel, ventLiner);

    // Primary stepped mirror-lapped C1020 OFHC copper thermal contact pedestal pressing down onto main die TIM1
    const pedestalGeo = extrudeHiRes(createRoundedRectShape(DIE_W + 2.0, DIE_W + 2.0, 1.0), 0.78, 0.14, 0.14, 2, 20);
    pedestalGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(pedestalGeo, DIE_W + 2.0, DIE_W + 2.0, 'xz');
    const pedestal = new THREE.Mesh(pedestalGeo, u.cfeCopperThermal);
    pedestal.position.y = -0.84;
    g.add(pedestal);

    // Underside micro-machined concentric Indium STIM wetting & degassing relief grooves on primary OFHC pedestal
    for (const gw of [DIE_W - 1.2, DIE_W - 5.4, DIE_W - 9.8]) {
      const groove = makeHiResHorizPlate(
        createFrameShape(gw, gw, 0.65, gw - 0.52, gw - 0.52, 0.52),
        0.08,
        mats.copperHeatSpreader,
        0.01,
        1,
        16
      );
      groove.position.y = -1.25;
      groove.userData.noEdges = true;
      g.add(groove);
    }

    // Secondary stepped OFHC copper contact boss + STIM wetting rails reaching down to CXD90058 Cetus chiplet (+X)
    const cetusBoss = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.68, 12.6, 0.45, 0.10, 'y'),
      mats.vaporChamberCopper
    );
    cetusBoss.position.set(12.2, -0.82, 0);
    cetusBoss.userData.noEdges = true;
    const cetusGroove = makeHiResHorizPlate(
      createFrameShape(2.6, 11.2, 0.30, 2.05, 10.65, 0.22),
      0.07,
      mats.copperHeatSpreader,
      0.01,
      1,
      12
    );
    cetusGroove.position.set(12.2, -1.18, 0);
    cetusGroove.userData.noEdges = true;
    g.add(cetusBoss, cetusGroove);

    // 4 machined corner stress-relief datum bores & copper/gold registration rings in IHS skirt
    for (const [cx, cz] of [
      [-13.8, -13.8],
      [13.8, -13.8],
      [-13.8, 13.8],
      [13.8, 13.8],
    ]) {
      const relief = new THREE.Mesh(hiResCyl(0.76, 0.76, 1.66, 14), mats.matteBlackAnodized);
      relief.position.set(cx, -1.12, cz);
      relief.userData.noEdges = true;
      const datumRim = new THREE.Mesh(hiResTorus(0.86, 0.10, 8, 16), mats.copperHeatSpreader);
      datumRim.rotation.x = Math.PI / 2;
      datumRim.position.set(cx, 0.56, cz);
      datumRim.userData.noEdges = true;
      const innerCollar = new THREE.Mesh(hiResTorus(0.56, 0.06, 6, 14), mats.goldPlating);
      innerCollar.rotation.x = Math.PI / 2;
      innerCollar.position.set(cx, 0.57, cz);
      innerCollar.userData.noEdges = true;
      g.add(relief, datumRim, innerCollar);
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
  // XR03. Die-to-IHS Thermal Interface Material 1 (Indium STIM + BSM) (y = +7.3)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Bottom sputtered Ti/Ni/Ag/Au Backside Die Metallization (BSM) wetting flash plate
    const bsmPlate = makeHiResHorizPlate(
      createRoundedRectShape(DIE_W + 0.8, DIE_W + 0.8, 0.72),
      0.14,
      mats.goldPlating,
      0.03,
      1,
      18
    );
    bsmPlate.position.y = -0.22;
    bsmPlate.userData.noEdges = true;
    g.add(bsmPlate);

    // Coined & vacuum-reflowed pure Indium solder TIM1 sheet (k=86 W/mK, Tm=156.6°C) mapped with 768px HiRes STIM texture
    const timGeo = extrudeHiRes(createRoundedRectShape(DIE_W + 1.4, DIE_W + 1.4, 0.8), 0.36, 0.08, 0.08, 2, 20);
    timGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(timGeo, DIE_W + 1.4, DIE_W + 1.4, 'xz');
    const timSheet = new THREE.Mesh(timGeo, u.bionzIndiumStim);
    g.add(timSheet);

    // Golden AuIn2 eutectic intermetallic perimeter wetting meniscus halo around reflowed Indium pad
    const auInRim = makeHiResHorizPlate(
      createFrameShape(DIE_W + 1.72, DIE_W + 1.72, 0.90, DIE_W + 0.42, DIE_W + 0.42, 0.68),
      0.28,
      mats.goldPlating,
      0.06,
      2,
      18
    );
    auInRim.position.y = -0.02;
    auInRim.userData.noEdges = true;
    g.add(auInRim);

    // Microscopic Indium squeeze-out fillet beads along outer die edge & 4 corner C-SAM ultrasonic inspection tabs
    for (const [bx, bz, bw, bd] of [
      [0, DIE_W * 0.5 + 0.82, DIE_W - 2.2, 0.24],
      [0, -(DIE_W * 0.5 + 0.82), DIE_W - 2.2, 0.24],
      [DIE_W * 0.5 + 0.82, 0, 0.24, DIE_W - 2.2],
      [-(DIE_W * 0.5 + 0.82), 0, 0.24, DIE_W - 2.2],
    ]) {
      const bead = new THREE.Mesh(createChamferedBoxGeo(bw, 0.16, bd, 0.08, 0.04, 'y'), mats.sinteredSilver);
      bead.position.set(bx, -0.08, bz);
      bead.userData.noEdges = true;
      g.add(bead);
    }

    // Compliant high-k thermal barrier ring + 4x4 vacuum-reflowed coined Indium wetting islands
    const innerPad = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 1.6, 0.42, DIE_W - 1.6, 0.5, 0.06, 'y'),
      mats.thermalPadPink
    );
    innerPad.position.y = 0.04;
    g.add(innerPad);

    const cellGeo = createChamferedBoxGeo(3.68, 0.10, 3.68, 0.28, 0.025, 'y');
    for (let ix = -1.5; ix <= 1.5; ix += 1.0) {
      for (let iz = -1.5; iz <= 1.5; iz += 1.0) {
        const island = new THREE.Mesh(cellGeo, u.bionzIndiumStim);
        island.position.set(ix * 4.45, 0.28, iz * 4.45);
        island.userData.noEdges = true;
        g.add(island);
      }
    }

    // Secondary Indium STIM contact strip + Ti/Ni/Ag/Au BSM flash & AuIn2 perimeter halo over CXD90058 Cetus chiplet
    const cetusBsm = makeHiResHorizPlate(
      createRoundedRectShape(4.15, 13.15, 0.40),
      0.12,
      mats.goldPlating,
      0.02,
      1,
      14
    );
    cetusBsm.position.set(13.0, -0.20, 0);
    cetusBsm.userData.noEdges = true;
    const cetusTimGeo = createChamferedBoxGeo(3.8, 0.34, 12.8, 0.36, 0.06, 'y');
    const cetusTim = new THREE.Mesh(cetusTimGeo, u.bionzIndiumStim);
    cetusTim.position.set(13.0, 0.0, 0);
    const cetusHalo = makeHiResHorizPlate(
      createFrameShape(4.06, 13.06, 0.40, 3.45, 12.45, 0.32),
      0.22,
      mats.goldPlating,
      0.04,
      1,
      14
    );
    cetusHalo.position.set(13.0, -0.02, 0);
    cetusHalo.userData.noEdges = true;
    g.add(cetusBsm, cetusTim, cetusHalo);

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

    // High-silica (88wt%) matte transfer-mold EMC body walls mapped with silica-bead micro-texture
    const moldGeo = extrudeHiRes(
      createFrameShape(PKG_W - 2.2, PKG_W - 2.2, 1.5, 20.4, 20.4, 0.9),
      1.68,
      0.16,
      0.16,
      2,
      22
    );
    moldGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(moldGeo, 14.0);
    const moldCap = new THREE.Mesh(moldGeo, u.bionzEmcSilica);
    g.add(moldCap);

    // Mid-wall transfer-mold parting-line ridge & authentic 2-step -X mold gate runner shear vestige
    const partingRim = makeHiResHorizPlate(
      createFrameShape(PKG_W - 2.02, PKG_W - 2.02, 1.55, PKG_W - 2.48, PKG_W - 2.48, 1.4),
      0.14,
      mats.matteBlackAnodized,
      0.02,
      1,
      20
    );
    partingRim.userData.noEdges = true;
    const gateStub = new THREE.Mesh(
      createChamferedBoxGeo(0.36, 0.74, 4.4, 0.08, 0.04, 'y'),
      u.bionzEmcSilica
    );
    gateStub.position.set(-(PKG_W - 2.2) * 0.5 - 0.10, -0.05, 0);
    gateStub.userData.noEdges = true;
    const gateShear = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.42, 3.2), mats.silverElectrode);
    gateShear.position.set(-(PKG_W - 2.2) * 0.5 - 0.28, -0.05, 0);
    gateShear.userData.noEdges = true;
    g.add(partingRim, gateStub, gateShear);

    // Authentic Micron CSN-11 2-line laser-marked PoP LPDDR5X-8533 (5NB47 / D8DNH) top cover with cutaway window!
    const coverShape = createRoundedRectShape(PKG_W - 2.5, PKG_W - 2.5, 1.3);
    const windowHole = new THREE.Path();
    windowHole.moveTo(0.8, -9.8);
    windowHole.lineTo(9.8, -9.8);
    windowHole.lineTo(9.8, -0.8);
    windowHole.lineTo(0.8, -0.8);
    windowHole.closePath();
    coverShape.holes.push(windowHole);
    const coverGeo = extrudeHiRes(coverShape, 0.28, 0.05, 0.05, 1, 20);
    coverGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(coverGeo, PKG_W - 2.5, PKG_W - 2.5, 'xz');
    const laserTop = new THREE.Mesh(coverGeo, u.bionzPopDramTop);
    laserTop.position.y = 0.72;
    g.add(laserTop);

    // 3D recessed circular Pin-1 laser crater (-X, -Z) & twin concentric mold ejector-pin witness cups
    for (const [cx, cz, rad, rimMat, isPin1] of [
      [-11.2, -11.2, 0.84, mats.silverElectrode, true],
      [11.2, -11.2, 0.70, mats.matteBlackAnodized, false],
      [-11.2, 11.2, 0.70, mats.matteBlackAnodized, false],
    ] as Array<[number, number, number, THREE.Material, boolean]>) {
      const cup = new THREE.Mesh(hiResCyl(rad, rad * 0.80, 0.14, 18), mats.matteBlackAnodized);
      cup.position.set(cx, 0.84, cz);
      cup.userData.noEdges = true;
      const rim = new THREE.Mesh(hiResTorus(rad, 0.075, 6, 18), rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(cx, 0.88, cz);
      rim.userData.noEdges = true;
      const innerRing = new THREE.Mesh(
        hiResTorus(rad * 0.56, 0.04, 6, 14),
        isPin1 ? mats.goldPlating : mats.silverElectrode
      );
      innerRing.rotation.x = Math.PI / 2;
      innerRing.position.set(cx, 0.85, cz);
      innerRing.userData.noEdges = true;
      g.add(cup, rim, innerRing);
    }

    // Precision chamfered cutaway window bezel + inner EMC cross-section ledge + corner clamps + inspection glass pane
    const winBezel = makeHiResHorizPlate(
      createFrameShape(9.4, 9.4, 0.35, 8.85, 8.85, 0.22),
      0.24,
      mats.stainlessMachined,
      0.03,
      1,
      12
    );
    winBezel.position.set(5.3, 0.78, 5.3);
    winBezel.userData.noEdges = true;
    const emcStep = makeHiResHorizPlate(
      createFrameShape(9.1, 9.1, 0.28, 8.55, 8.55, 0.20),
      0.56,
      u.bionzEmcSilica,
      0.02,
      1,
      12
    );
    emcStep.position.set(5.3, 0.42, 5.3);
    emcStep.userData.noEdges = true;
    const glassPane = new THREE.Mesh(
      markHiRes(new THREE.BoxGeometry(8.9, 0.14, 8.9)),
      mats.opticalCementClear
    );
    glassPane.position.set(5.3, 0.74, 5.3);
    glassPane.userData.noEdges = true;
    g.add(winBezel, emcStep, glassPane);

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

    // Bottom silver-filled conductive die-attach epoxy fillet cushion + perimeter squeeze-out bead under Die 0
    const baseAttach = new THREE.Mesh(
      createChamferedBoxGeo(19.6, 0.14, 18.4, 0.38, 0.05, 'y'),
      mats.sinteredSilver
    );
    baseAttach.position.set(-0.5, -0.70, 0);
    baseAttach.userData.noEdges = true;
    g.add(baseAttach);

    // 4 stepped ultra-thin Micron 1-beta LPDDR5X 16-bank (4BGx4B) quad-die staircase (D4) + SWD/LSA spines + DAF overhang
    const padCoords: Array<[number, number, number]> = [];
    for (let i = 0; i < 4; i++) {
      const w = 18.8 - i * 1.15;
      const d = 17.6 - i * 0.95;
      const offsetX = i * 0.34 - 0.5;
      const dieY = -0.52 + i * 0.37;

      const dieGeo = createChamferedBoxGeo(w, 0.24, d, 0.22, 0.03, 'y');
      applyPlanarUVs(dieGeo, w, d, 'xz');
      const die = new THREE.Mesh(dieGeo, u.bionzLpddr5xDie);
      die.position.set(offsetX, dieY, 0);
      g.add(die);

      // Raised central vertical decoder/DQ spine + twin horizontal SWD/LSA bank-group divider spines (4BG x 4B)
      const spineV = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.055, d - 1.4), mats.goldPlating);
      spineV.position.set(offsetX, dieY + 0.136, 0);
      spineV.userData.noEdges = true;
      const spineH = new THREE.Mesh(new THREE.BoxGeometry(w - 1.6, 0.045, 0.38), mats.copperHybridBond);
      spineH.position.set(offsetX, dieY + 0.133, 0);
      spineH.userData.noEdges = true;
      g.add(spineV, spineH);

      // Sub-Wordline Driver (SWD) & Local Sense-Amp (LSA) quarter-die ribs + laser-repair redundancy eFuse banks
      for (const qx of [-w * 0.24, w * 0.24]) {
        const swdRib = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, d - 2.0), mats.copperHybridBond);
        swdRib.position.set(offsetX + qx, dieY + 0.132, 0);
        swdRib.userData.noEdges = true;
        g.add(swdRib);
      }
      for (const fz of [-d * 0.26, d * 0.26]) {
        const fuseBank = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.06, 0.22), mats.silverElectrode);
        fuseBank.position.set(offsetX, dieY + 0.142, fz);
        fuseBank.userData.noEdges = true;
        g.add(fuseBank);
      }

      // Dense 2-row staggered wirebond pad terraces along left/right DQ edges + top/bottom CA/CK edges
      for (const side of [-1, 1]) {
        for (let k = -7; k <= 7; k++) {
          const stag = k % 2 === 0 ? 0.0 : -0.24;
          padCoords.push([offsetX + side * (w * 0.5 - 0.38 + stag), dieY + 0.136, k * 1.02]);
        }
        for (let j = -3; j <= 3; j++) {
          padCoords.push([offsetX + j * 2.15, dieY + 0.136, side * (d * 0.5 - 0.38)]);
        }
      }

      // Translucent golden-amber Die Attach Film (DAF) adhesive layer with authentic squeeze-out overhang lip
      if (i > 0) {
        const daf = new THREE.Mesh(
          createChamferedBoxGeo(w + 0.34, 0.095, d + 0.34, 0.26, 0.025, 'y'),
          mats.mylarInsulatorFilm
        );
        daf.position.set(offsetX, dieY - 0.165, 0);
        daf.userData.noEdges = true;
        g.add(daf);
      }
    }

    // Instanced gleaming gold bond pads across all 4 stacked Micron LPDDR5X dies
    const padGeo = new THREE.BoxGeometry(0.38, 0.06, 0.38);
    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, padCoords.length);
    const dmPad = new THREE.Object3D();
    padCoords.forEach(([x, y, z], idx) => {
      dmPad.position.set(x, y, z);
      dmPad.updateMatrix();
      padInst.setMatrixAt(idx, dmPad.matrix);
    });
    padInst.instanceMatrix.needsUpdate = true;
    padInst.userData.noEdges = true;
    g.add(padInst);

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

    // Ultra-thin 4-layer 120um BT-resin PoP interposer mapped with staggered ENIG wirebond finger texture
    const interposerGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 2.4, PKG_W - 2.4, 1.3), 0.52, 0.08, 0.08, 2, 22);
    interposerGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(interposerGeo, PKG_W - 2.4, PKG_W - 2.4, 'xz');
    const interposer = new THREE.Mesh(interposerGeo, u.bionzPopInterposer);
    g.add(interposer);

    // Inner solder-mask die-attach dam trench framing the central LPDDR5X staircase footprint
    const damFrame = makeHiResHorizPlate(
      createFrameShape(20.6, 19.4, 0.45, 19.9, 18.7, 0.36),
      0.06,
      mats.silverElectrode,
      0.01,
      1,
      14
    );
    damFrame.position.y = 0.28;
    damFrame.userData.noEdges = true;
    g.add(damFrame);

    // 58 true curved parabolic BSOB (Ball Stitch on Ball) cascaded gold & Pd-Cu wirebond arches across all 4 DRAM tiers!
    const bsobCoords: Array<[number, number, number]> = [];
    const stitchCoords: Array<[number, number, number, boolean]> = [];

    for (const side of [-1, 1]) {
      for (let i = -7; i <= 7; i++) {
        const z = i * 1.06;
        const tier = Math.abs(i) % 4;
        const startX = side * (7.1 + (3 - tier) * 0.55);
        const endX = side * (11.7 + (i % 2 === 0 ? 0.58 : -0.18)); // Staggered 2-row ENIG bond fingers
        const startY = 0.56 + tier * 0.36;

        const finger = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.08, 0.34), mats.goldPlating);
        finger.position.set(endX, 0.29, z);
        finger.userData.noEdges = true;
        g.add(finger);

        bsobCoords.push([startX, startY, z]);
        stitchCoords.push([endX, 0.34, z, false]);

        const isPowerDouble = Math.abs(i) === 3 || Math.abs(i) === 6;
        g.add(
          buildGoldWirebondLoop(
            new THREE.Vector3(startX, startY, z),
            new THREE.Vector3(endX, 0.32, z),
            0.84 + tier * 0.14,
            isPowerDouble ? 0.095 : 0.078,
            isPowerDouble ? mats.copperHybridBond : mats.goldPlating
          )
        );
      }

      // Front/Back CA/CK control wirebond arches (7 per edge = 14 loops)
      for (let j = -3; j <= 3; j++) {
        const x = j * 2.25;
        const tier = Math.abs(j) % 4;
        const startZ = side * (6.7 + (3 - tier) * 0.48);
        const endZ = side * (11.75 + (j % 2 === 0 ? 0.35 : -0.20));
        const startY = 0.56 + tier * 0.36;

        const finger = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 1.22), mats.goldPlating);
        finger.position.set(x, 0.29, endZ);
        finger.userData.noEdges = true;
        g.add(finger);

        bsobCoords.push([x, startY, startZ]);
        stitchCoords.push([x, 0.34, endZ, true]);

        g.add(
          buildGoldWirebondLoop(
            new THREE.Vector3(x, startY, startZ),
            new THREE.Vector3(x, 0.32, endZ),
            0.82 + tier * 0.12,
            0.078,
            mats.goldPlating
          )
        );
      }
    }

    // Instanced BSOB (Ball Stitch on Ball) gold ball bumps on DRAM pads & wedge-stitch heels on ENIG fingers
    const bsobGeo = hiResSphere(0.145, 8, 6);
    const bsobInst = new THREE.InstancedMesh(bsobGeo, mats.goldPlating, bsobCoords.length);
    const stitchGeo = new THREE.BoxGeometry(0.28, 0.075, 0.22);
    const stitchInst = new THREE.InstancedMesh(stitchGeo, mats.goldPlating, stitchCoords.length);
    const dmWb = new THREE.Object3D();
    bsobCoords.forEach(([x, y, z], idx) => {
      dmWb.position.set(x, y, z);
      dmWb.rotation.set(0, 0, 0);
      dmWb.scale.set(1.0, 0.72, 1.0);
      dmWb.updateMatrix();
      bsobInst.setMatrixAt(idx, dmWb.matrix);
    });
    stitchCoords.forEach(([x, y, z, rot90], idx) => {
      dmWb.position.set(x, y, z);
      dmWb.rotation.set(0, rot90 ? Math.PI / 2 : 0, 0);
      dmWb.scale.set(1, 1, 1);
      dmWb.updateMatrix();
      stitchInst.setMatrixAt(idx, dmWb.matrix);
    });
    bsobInst.instanceMatrix.needsUpdate = true;
    stitchInst.instanceMatrix.needsUpdate = true;
    bsobInst.userData.noEdges = true;
    stitchInst.userData.noEdges = true;
    g.add(bsobInst, stitchInst);

    // 8 ultra-miniature 01005 VDDQ decoupling MLCCs (4 corners + 4 mid-edge power bypass caps) & 4 AOI fiducials
    for (const [cx, cz, rotY] of [
      [-11.8, -11.8, 0],
      [11.8, -11.8, 0],
      [-11.8, 11.8, 0],
      [11.8, 11.8, 0],
      [-9.2, -13.1, 0],
      [9.2, -13.1, 0],
      [-9.2, 13.1, 0],
      [9.2, 13.1, 0],
    ]) {
      const dec = buildSmdPassive(1.1, 0.56, 0.42, mats.smdCeramic, mats.solderBallSilver, 'y');
      dec.rotation.y = rotY;
      dec.position.set(cx, 0.48, cz);
      g.add(dec);
    }
    for (const [fx, fz] of [
      [-13.2, -13.2],
      [13.2, -13.2],
      [-13.2, 13.2],
      [13.2, 13.2],
    ]) {
      const fid = new THREE.Mesh(hiResCyl(0.26, 0.26, 0.08, 12), mats.goldPlating);
      fid.position.set(fx, 0.29, fz);
      fid.userData.noEdges = true;
      g.add(fid);
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
    const ballGeo = hiResSphere(0.46, 14, 10);
    const imcCollarGeo = hiResCyl(0.37, 0.45, 0.18, 12);
    const padGeo = hiResCyl(0.45, 0.45, 0.12, 12);
    // Authentic laser-ablated conical inverted-frustum EMC Through-Mold Via (TMV) crater!
    const tmvCollarGeo = hiResCyl(0.52, 0.34, 0.58, 14);
    const tmvLipGeo = hiResTorus(0.50, 0.045, 6, 14);
    const pillarGeo = hiResCyl(0.26, 0.26, 2.28, 12);
    const seedRingGeo = hiResCyl(0.36, 0.40, 0.14, 12);

    const coords: Array<[number, number]> = [];
    for (const ring of [12.4, 14.0]) {
      for (let t = -12; t <= 12; t += 2.0) {
        // Authentic Pin-1 corner depopulation mechanical polarization key at (-14, -14)
        if (ring === 14.0 && t === -12) {
          coords.push([t, ring]);
          continue;
        }
        coords.push([t, ring], [t, -ring]);
        if (Math.abs(t) < ring - 0.5) {
          coords.push([ring, t], [-ring, t]);
        }
      }
    }

    const balls = new THREE.InstancedMesh(ballGeo, u.bionzSac305Solder, coords.length);
    const imcCollars = new THREE.InstancedMesh(imcCollarGeo, mats.sinteredSilver, coords.length);
    const ubmTopPads = new THREE.InstancedMesh(padGeo, mats.goldPlating, coords.length);
    const ubmBotPads = new THREE.InstancedMesh(padGeo, mats.goldPlating, coords.length);
    const tmvFunnels = new THREE.InstancedMesh(tmvCollarGeo, u.bionzEmcSilica, coords.length);
    const tmvLips = new THREE.InstancedMesh(tmvLipGeo, mats.matteBlackAnodized, coords.length);
    const pillars = new THREE.InstancedMesh(pillarGeo, mats.copperHybridBond, coords.length);
    const seedRings = new THREE.InstancedMesh(seedRingGeo, mats.titaniumRivet, coords.length);
    const dummy = new THREE.Object3D();
    const rotDummy = new THREE.Object3D();
    rotDummy.rotation.x = Math.PI / 2;

    coords.forEach(([x, z], idx) => {
      // Oblate reflowed SAC305 PoP inter-package solder sphere with eutectic dendritic grain
      dummy.scale.set(1.0, 0.88, 1.0);
      dummy.position.set(x, 0.96, z);
      dummy.updateMatrix();
      balls.setMatrixAt(idx, dummy.matrix);

      // Scalloped Cu6Sn5 intermetallic wetting collar between SAC ball and vertical TIV copper pillar
      dummy.scale.set(1, 1, 1);
      dummy.position.set(x, 0.58, z);
      dummy.updateMatrix();
      imcCollars.setMatrixAt(idx, dummy.matrix);

      // Top interposer gold UBM pad cap
      dummy.position.set(x, 1.36, z);
      dummy.updateMatrix();
      ubmTopPads.setMatrixAt(idx, dummy.matrix);

      // Laser-ablated conical inverted-frustum EMC TMV funnel crater + charred laser lip
      dummy.position.set(x, 0.30, z);
      dummy.updateMatrix();
      tmvFunnels.setMatrixAt(idx, dummy.matrix);

      rotDummy.position.set(x, 0.58, z);
      rotDummy.updateMatrix();
      tmvLips.setMatrixAt(idx, rotDummy.matrix);

      // Vertical electroplated Through-InFO / TMV copper pillar
      dummy.position.set(x, -0.58, z);
      dummy.updateMatrix();
      pillars.setMatrixAt(idx, dummy.matrix);

      // Bottom sputtered Ti/Cu electroplating seed collar ring
      dummy.position.set(x, -1.62, z);
      dummy.updateMatrix();
      seedRings.setMatrixAt(idx, dummy.matrix);

      // Bottom ABF substrate ENEPIG UBM landing pad
      dummy.position.set(x, -1.72, z);
      dummy.updateMatrix();
      ubmBotPads.setMatrixAt(idx, dummy.matrix);
    });

    for (const im of [balls, imcCollars, ubmTopPads, ubmBotPads, tmvFunnels, tmvLips, pillars, seedRings]) {
      im.instanceMatrix.needsUpdate = true;
      im.userData.noEdges = true;
    }
    g.add(balls, imcCollars, ubmTopPads, ubmBotPads, tmvFunnels, tmvLips, pillars, seedRings);

    // Pin-1 gold corner depopulation orientation chevron at (-12, -14)
    const pinKeyShape = new THREE.Shape();
    pinKeyShape.moveTo(0, 0);
    pinKeyShape.lineTo(1.15, 0);
    pinKeyShape.lineTo(0, -1.15);
    pinKeyShape.closePath();
    const pinKeyGeo = extrudeHiRes(pinKeyShape, 0.14, 0.02, 0.02, 1, 6);
    pinKeyGeo.rotateX(-Math.PI / 2);
    const pinKey = new THREE.Mesh(pinKeyGeo, mats.goldPlating);
    pinKey.position.set(-14.2, -1.70, -14.2);
    pinKey.userData.noEdges = true;
    g.add(pinKey);

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
  // XR08. Low-Warpage Silica EMC Mold Frame & SUS430 Anti-Warpage Stiffener (y = +1.7)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 88wt% low-alpha fused-silica EMC mold frame (alpha1=8 ppm/K, E=15 GPa) mapped with micro-silica bead grain
    const emcGeo = extrudeHiRes(
      createFrameShape(PKG_W - 0.4, PKG_W - 0.4, 1.6, DIE_W + 2.4, DIE_W + 2.4, 0.9),
      2.36,
      0.16,
      0.16,
      2,
      24
    );
    emcGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(emcGeo, 14.0);
    const emcFrame = new THREE.Mesh(emcGeo, u.bionzEmcSilica);

    // Thermoset adhesive bond film seating the stainless anti-warpage stiffener onto EMC top
    const bondLayer = makeHiResHorizPlate(
      createFrameShape(PKG_W - 0.25, PKG_W - 0.25, 1.65, PKG_W - 3.45, PKG_W - 3.45, 1.05),
      0.14,
      mats.thermalTransferTape,
      0.02,
      1,
      20
    );
    bondLayer.position.y = 1.16;
    bondLayer.userData.noEdges = true;

    // Brushed SUS430 low-CTE stainless anti-warpage stiffener mapped with bespoke brushed steel PBR texture!
    const stiffGeo = extrudeHiRes(
      createFrameShape(PKG_W - 0.1, PKG_W - 0.1, 1.7, PKG_W - 3.6, PKG_W - 3.6, 1.0),
      0.56,
      0.08,
      0.08,
      2,
      22
    );
    stiffGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(stiffGeo, PKG_W - 0.1, PKG_W - 0.1, 'xz');
    const stiffener = new THREE.Mesh(stiffGeo, u.bionzStiffenerSteel);
    stiffener.position.y = 1.46;

    // Authentic 45-degree machined Pin-1 corner chamfer notch & gold inlay at (-X, -Z)
    const pin1Notch = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.62, 0.62), mats.matteBlackAnodized);
    pin1Notch.position.set(-15.05, 1.48, -15.05);
    pin1Notch.rotation.y = Math.PI / 4;
    pin1Notch.userData.noEdges = true;
    const pin1Inlay = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.10, 0.28), mats.goldPlating);
    pin1Inlay.position.set(-14.62, 1.76, -14.62);
    pin1Inlay.rotation.y = Math.PI / 4;
    pin1Inlay.userData.noEdges = true;
    g.add(pin1Notch, pin1Inlay);

    // 8 machined rounded-end stadium thermal stress-relief expansion slots with bright chamfer liners along stiffener edges
    for (const [sx, sz, isX] of [
      [-6.5, -14.85, true],
      [6.5, -14.85, true],
      [-6.5, 14.85, true],
      [6.5, 14.85, true],
      [-14.85, -6.5, false],
      [-14.85, 6.5, false],
      [14.85, -6.5, false],
      [14.85, 6.5, false],
    ] as Array<[number, number, boolean]>) {
      const slot = new THREE.Mesh(
        createChamferedBoxGeo(isX ? 2.7 : 0.44, 0.62, isX ? 0.44 : 2.7, 0.20, 0.02, 'y'),
        mats.matteBlackAnodized
      );
      slot.position.set(sx, 1.48, sz);
      slot.userData.noEdges = true;
      const slotRim = makeHiResHorizPlate(
        createFrameShape(
          isX ? 2.94 : 0.68,
          isX ? 0.68 : 2.94,
          0.24,
          isX ? 2.66 : 0.42,
          isX ? 0.42 : 2.66,
          0.18
        ),
        0.06,
        mats.silverElectrode,
        0.01,
        1,
        10
      );
      slotRim.position.set(sx, 1.76, sz);
      slotRim.userData.noEdges = true;
      g.add(slot, slotRim);
    }

    // 4 knurled corner gold datum bushings with recessed alignment bores
    for (const [cx, cz] of [
      [-14.1, -14.1],
      [14.1, -14.1],
      [-14.1, 14.1],
      [14.1, 14.1],
    ]) {
      const knurlRing = new THREE.Mesh(hiResTorus(0.64, 0.08, 6, 16), mats.stainlessMachined);
      knurlRing.rotation.x = Math.PI / 2;
      knurlRing.position.set(cx, 1.76, cz);
      knurlRing.userData.noEdges = true;
      const datum = new THREE.Mesh(hiResCyl(0.56, 0.56, 0.66, 16), mats.goldPlating);
      datum.position.set(cx, 1.48, cz);
      datum.userData.noEdges = true;
      const bore = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.72, 12), mats.matteBlackAnodized);
      bore.position.set(cx, 1.48, cz);
      bore.userData.noEdges = true;
      g.add(knurlRing, datum, bore);
    }

    g.add(emcFrame, bondLayer, stiffener);

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
  // XR09. Back-Grinded Silicon Bulk Substrate & Dual Crack-Stop Seal Ring (y = +1.65)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 150um back-grinded 11N monocrystalline bulk silicon slab mapped with forensic 16-IP EUV floorplan
    const bulkGeo = extrudeHiRes(createRoundedRectShape(DIE_W, DIE_W, 0.48), 0.72, 0.08, 0.08, 2, 18);
    bulkGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(bulkGeo, DIE_W, DIE_W, 'xz');
    const bulkSi = new THREE.Mesh(bulkGeo, u.bionzDieFloorplan);

    // Outer dicing scribe-street chamfer rim carrying inline Process Control Monitor (PCM) test-key micro-bars!
    const scribeRim = makeHiResHorizPlate(
      createFrameShape(DIE_W + 0.86, DIE_W + 0.86, 0.66, DIE_W + 0.26, DIE_W + 0.26, 0.54),
      0.56,
      mats.siliconBulk,
      0.03,
      1,
      18
    );
    scribeRim.position.y = -0.06;
    scribeRim.userData.noEdges = true;

    // Inline PCM (Process Control Monitor) / TEG gold & copper micro-test-key probe strips along all 4 scribe streets
    for (let k = -3; k <= 3; k++) {
      const pos = k * 2.55;
      const matPcm = k % 2 === 0 ? mats.goldPlating : mats.copperHybridBond;
      for (const s of [-1, 1]) {
        const pcmX = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.06, 0.22), matPcm);
        pcmX.position.set(pos, 0.25, s * (DIE_W * 0.5 + 0.28));
        pcmX.userData.noEdges = true;
        const pcmZ = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 1.15), matPcm);
        pcmZ.position.set(s * (DIE_W * 0.5 + 0.28), 0.25, pos);
        pcmZ.userData.noEdges = true;
        g.add(pcmX, pcmZ);
      }
    }

    // Dual Cu/W outer crack-stop fortress wall & inner gold moisture-guard seal ring + octagonal corner chamfer braces
    const sealOuter = makeHiResHorizPlate(
      createFrameShape(DIE_W + 0.34, DIE_W + 0.34, 0.56, DIE_W - 0.36, DIE_W - 0.36, 0.38),
      0.88,
      mats.copperHybridBond,
      0.04,
      2,
      18
    );
    const sealInner = makeHiResHorizPlate(
      createFrameShape(DIE_W - 0.62, DIE_W - 0.62, 0.42, DIE_W - 1.02, DIE_W - 1.02, 0.32),
      0.84,
      mats.goldPlating,
      0.03,
      1,
      16
    );
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        // 45-degree octagonal stress-relief corner chamfer reinforcement bar on crack-stop seal ring
        const cornerBrace = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.88, 0.24), mats.goldPlating);
        cornerBrace.position.set(sx * (DIE_W * 0.5 - 0.62), 0.02, sz * (DIE_W * 0.5 - 0.62));
        cornerBrace.rotation.y = sx * sz > 0 ? Math.PI / 4 : -Math.PI / 4;
        cornerBrace.userData.noEdges = true;
        g.add(cornerBrace);
      }
    }

    // Sculpted 3D Coherent Network-on-Chip (NoC) crossbar highways + 9 stacked NoC router switch intersection hubs
    const lanes = [-4.6, 0, 4.6];
    for (const lane of lanes) {
      for (const offset of [-0.14, 0.14]) {
        const busX = new THREE.Mesh(
          new THREE.BoxGeometry(DIE_W - 1.8, 0.08, 0.10),
          offset < 0 ? mats.goldPlating : mats.copperHybridBond
        );
        busX.position.set(0, 0.41, lane + offset);
        busX.userData.noEdges = true;
        const busZ = new THREE.Mesh(
          new THREE.BoxGeometry(0.10, 0.08, DIE_W - 1.8),
          offset < 0 ? mats.goldPlating : mats.copperHybridBond
        );
        busZ.position.set(lane + offset, 0.41, 0);
        busZ.userData.noEdges = true;
        g.add(busX, busZ);
      }
    }
    for (const lx of lanes) {
      for (const lz of lanes) {
        const router = new THREE.Mesh(
          createChamferedBoxGeo(0.60, 0.14, 0.60, 0.08, 0.02, 'y'),
          mats.goldPlating
        );
        router.position.set(lx, 0.44, lz);
        router.userData.noEdges = true;
        const arbiterCap = new THREE.Mesh(hiResCyl(0.18, 0.22, 0.08, 8), mats.copperHybridBond);
        arbiterCap.position.set(lx, 0.52, lz);
        arbiterCap.userData.noEdges = true;
        g.add(router, arbiterCap);
      }
    }

    // 4-corner authentic ASML Box-in-Box nested square Vernier EUV lithography overlay metrology targets on scribe ledge
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const vx = sx * (DIE_W * 0.5 + 0.28);
        const vz = sz * (DIE_W * 0.5 + 0.28);
        const outerBox = makeHiResHorizPlate(
          createFrameShape(0.56, 0.56, 0.04, 0.42, 0.42, 0.02),
          0.08,
          mats.goldPlating,
          0.01,
          1,
          6
        );
        outerBox.position.set(vx, 0.27, vz);
        outerBox.userData.noEdges = true;
        const innerBox = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.09, 0.24), mats.copperHybridBond);
        innerBox.position.set(vx, 0.28, vz);
        innerBox.userData.noEdges = true;
        g.add(outerBox, innerBox);
      }
    }

    g.add(bulkSi, scribeRim, sealOuter, sealInner);

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
  // XR10–XR25. ALL 16 INTERNAL SILICON DIE IP BLOCKS (4x4 Floorplan at y = +1.1)
  // Every single IP macro has its OWN 100% unique semiconductor micro-architecture sculpture!
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
    detailKind:
      | 'serdes'
      | 'bayer'
      | 'wavelet'
      | 'lut3d'
      | 'systolic'
      | 'arm'
      | 'af'
      | 'codec'
      | 'audio'
      | 'sram'
      | 'ddr'
      | 'vault'
      | 'pcie'
      | 'hdmi'
      | 'rf'
      | 'pll';
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
      baseMat: u.bionzIpSlvsDie,
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
      baseMat: u.bionzIpIspDie,
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
      baseMat: u.bionzIpNpuDie,
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
      baseMat: u.bionzIpArmDie,
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
      baseMat: u.bionzIpSabinDie,
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
      baseMat: u.bionzIpHevcDie,
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
      baseMat: u.bionzIpSramDie,
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
      baseMat: u.bionzIpC2paDie,
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

    // Chamfered photolithographic silicon sub-die slab (planar XZ UVs built into createChamferedBoxGeo)
    const baseGeo = createChamferedBoxGeo(blk.w, blk.h, blk.d, 0.22, 0.06, 'y');
    const base = new THREE.Mesh(baseGeo, blk.baseMat);
    g.add(base);

    // Golden power-delivery guard ring + 4 corner VDD/VSS micro-via pads around every IP macro
    const guardRim = makeHiResHorizPlate(
      createFrameShape(blk.w - 0.14, blk.d - 0.14, 0.18, blk.w - 0.42, blk.d - 0.42, 0.12),
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

    if (blk.detailKind === 'serdes') {
      // XR10: SLVS-EC v3.0 8-Lane SerDes RX PHY — 8 differential pairs + 8 true octagonal spiral CTLE T-coils + ESD diodes + CDR LC-tank + ECC framer
      for (let i = 0; i < 8; i++) {
        const lx = -1.48 + i * 0.422;
        const pLine = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.10, 2.15), mats.goldPlating);
        pLine.position.set(lx - 0.065, topY, 0.22);
        pLine.userData.noEdges = true;
        const nLine = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.10, 2.15), mats.copperHybridBond);
        nLine.position.set(lx + 0.065, topY, 0.22);
        nLine.userData.noEdges = true;
        // True miniature 2-turn octagonal planar spiral CTLE inductive peaking T-coil at sensor ingress
        const tCoil = buildOctagonalSpiralCoil(0.165, 2.0, 0.028, 0.075, mats.goldPlating);
        tCoil.position.set(lx, topY + 0.04, -1.18);
        // Paired differential ESD clamp diode pad at -Z ingress edge
        const esdPad = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.16), mats.silverElectrode);
        esdPad.position.set(lx, topY + 0.02, -1.56);
        esdPad.userData.noEdges = true;
        g.add(pLine, nLine, tCoil, esdPad);
      }
      // 64b/66b deserializer & CRC/ECC packet framer bar + CDR phase-interpolator LC-tank spiral
      const framer = new THREE.Mesh(createChamferedBoxGeo(2.55, 0.17, 0.52, 0.08, 0.03, 'y'), mats.fluorineCoatCyan);
      framer.position.set(0.38, topY + 0.06, 1.44);
      framer.userData.noEdges = true;
      const cdrPll = buildOctagonalSpiralCoil(0.36, 2.25, 0.042, 0.09, mats.goldPlating);
      cdrPll.position.set(-1.32, topY + 0.07, 1.44);
      const cdrCore = new THREE.Mesh(hiResCyl(0.16, 0.16, 0.18, 12), mats.copperHybridBond);
      cdrCore.position.set(-1.32, topY + 0.07, 1.44);
      cdrCore.userData.noEdges = true;
      g.add(framer, cdrPll, cdrCore);
    } else if (blk.detailKind === 'bayer') {
      // XR11: 16-Bit RAW Front-End ISP — 4x4 RGBG Bayer demosaic matrix + optical microlens caps + 3x3 DPC + BLC + 2D Warp Engine
      const cMats = [mats.cfaRed, mats.cfaGreen, mats.cfaGreen, mats.cfaBlue];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const cx = -1.16 + c * 0.60;
          const cz = -1.12 + r * 0.60;
          const tile = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.14, 0.50), cMats[(r % 2) * 2 + (c % 2)]);
          tile.position.set(cx, topY + 0.02, cz);
          tile.userData.noEdges = true;
          const lensCap = new THREE.Mesh(hiResSphere(0.18, 10, 6), mats.opticalCementClear);
          lensCap.scale.set(1.0, 0.45, 1.0);
          lensCap.position.set(cx, topY + 0.10, cz);
          lensCap.userData.noEdges = true;
          g.add(tile, lensCap);
        }
      }
      // Optical Black Level Clamp (BLC) dark reference strip with 4 gold calibration taps
      const blcBar = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.13, 0.30), mats.matteBlackAnodized);
      blcBar.position.set(-0.26, topY + 0.03, 1.46);
      blcBar.userData.noEdges = true;
      for (let t = 0; t < 4; t++) {
        const tap = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.22), mats.goldPlating);
        tap.position.set(-1.18 + t * 0.62, topY + 0.10, 1.46);
        tap.userData.noEdges = true;
        g.add(tap);
      }
      // 2D-mesh geometric lens-breathing / chromatic aberration warp engine + 3x3 DPC median-kernel strip on +X
      const warpBlock = new THREE.Mesh(createChamferedBoxGeo(0.72, 0.18, 3.15, 0.08, 0.03, 'y'), mats.goldPlating);
      warpBlock.position.set(1.36, topY + 0.04, 0);
      warpBlock.userData.noEdges = true;
      for (let w = -3; w <= 3; w++) {
        const splineRib = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.05, 0.08), mats.copperHybridBond);
        splineRib.position.set(1.36, topY + 0.14, w * 0.42);
        splineRib.userData.noEdges = true;
        g.add(splineRib);
      }
      g.add(blcBar, warpBlock);
    } else if (blk.detailKind === 'wavelet') {
      // XR12: Area-Specific NR + Diffraction Comp + 7K-to-4K Polyphase Oversampling Funnel
      for (let lvl = 0; lvl < 4; lvl++) {
        const wStrip = 1.65 - lvl * 0.24;
        const barH = 0.12 + lvl * 0.05;
        const bar = new THREE.Mesh(
          createChamferedBoxGeo(wStrip, barH, 0.56, 0.06, 0.02, 'y'),
          lvl % 2 === 0 ? mats.copperHybridBond : mats.goldPlating
        );
        bar.position.set(-0.82, topY + barH * 0.45, -1.24 + lvl * 0.82);
        bar.userData.noEdges = true;
        g.add(bar);
      }
      for (let k = 0; k < 7; k++) {
        const zIn = -1.32 + k * 0.44;
        const lane7k = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.12, 0.18), mats.fluorineCoatCyan);
        lane7k.position.set(0.62, topY + 0.03, zIn);
        lane7k.userData.noEdges = true;
        g.add(lane7k);
      }
      for (let k = 0; k < 4; k++) {
        const zOut = -1.05 + k * 0.70;
        const lane4k = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.20, 0.34), mats.goldPlating);
        lane4k.position.set(1.36, topY + 0.06, zOut);
        lane4k.userData.noEdges = true;
        g.add(lane4k);
      }
    } else if (blk.detailKind === 'lut3d') {
      // XR13: 3D-LUT Color Science (S-Cinetone / S-Log3) — 3x3x2 chromatic tetrahedral cube + DRO Lv8 tone stairs
      const lutMats = [mats.cinnabarAnodized, mats.goldPlating, mats.cfaGreen, mats.mountShimBlue];
      for (let ix = -1; ix <= 1; ix++) {
        for (let iz = -1; iz <= 1; iz++) {
          const h = 0.16 + ((ix + iz + 4) % 3) * 0.11;
          const vox = new THREE.Mesh(
            createChamferedBoxGeo(0.72, h, 0.72, 0.08, 0.02, 'y'),
            lutMats[(ix + 2 * iz + 6) % 4]
          );
          vox.position.set(-0.35 + ix * 0.86, topY + h * 0.45, -0.30 + iz * 0.86);
          vox.userData.noEdges = true;
          g.add(vox);
        }
      }
      for (let st = 0; st < 6; st++) {
        const sh = 0.08 + st * 0.045;
        const stepBar = new THREE.Mesh(new THREE.BoxGeometry(0.42, sh, 0.38), mats.goldPlating);
        stepBar.position.set(1.42, topY + sh * 0.45, -1.25 + st * 0.50);
        stepBar.userData.noEdges = true;
        g.add(stepBar);
      }
    } else if (blk.detailKind === 'systolic') {
      // XR14: BIONZ XR2 Integrated AI NPU — 8x8 Instanced Tensor Systolic MAC PE Grid (64 PEs!) + Weight SRAM + Activation FIFO + GELU/Softmax
      const peGeo = new THREE.BoxGeometry(0.24, 0.14, 0.24);
      const peGold = new THREE.InstancedMesh(peGeo, mats.goldPlating, 32);
      const peViol = new THREE.InstancedMesh(peGeo, mats.makeupSealViolet, 32);
      const dmPe = new THREE.Object3D();
      let gi = 0;
      let vi = 0;
      for (let ix = 0; ix < 8; ix++) {
        for (let iz = 0; iz < 8; iz++) {
          dmPe.position.set(-1.05 + ix * 0.31, topY + 0.035, -0.96 + iz * 0.31);
          dmPe.updateMatrix();
          if ((ix + iz) % 2 === 0) peGold.setMatrixAt(gi++, dmPe.matrix);
          else peViol.setMatrixAt(vi++, dmPe.matrix);
        }
      }
      peGold.instanceMatrix.needsUpdate = true;
      peViol.instanceMatrix.needsUpdate = true;
      peGold.userData.noEdges = true;
      peViol.userData.noEdges = true;
      g.add(peGold, peViol);

      // North Weight-SRAM broadcast banks (4 segmented banks), West Activation FIFO pipe & East GELU/Softmax vector strip
      for (let b = 0; b < 4; b++) {
        const wBank = new THREE.Mesh(createChamferedBoxGeo(0.62, 0.20, 0.38, 0.05, 0.02, 'y'), mats.siliconTsvDram);
        wBank.position.set(-0.98 + b * 0.72, topY + 0.06, -1.52);
        wBank.userData.noEdges = true;
        g.add(wBank);
      }
      const westFifo = new THREE.Mesh(createChamferedBoxGeo(0.38, 0.20, 2.75, 0.05, 0.02, 'y'), mats.copperHybridBond);
      westFifo.position.set(-1.56, topY + 0.06, 0.16);
      westFifo.userData.noEdges = true;
      const eastVec = new THREE.Mesh(createChamferedBoxGeo(0.32, 0.18, 2.55, 0.05, 0.02, 'y'), mats.fluorineCoatCyan);
      eastVec.position.set(1.56, topY + 0.05, 0.16);
      eastVec.userData.noEdges = true;
      g.add(westFifo, eastVec);
    } else if (blk.detailKind === 'arm') {
      // XR15: Quad-Core ARM Cortex-A35 8-Stage AMP Cluster (2x Linux UI + 2x uITRON RTOS) + Coherent SCU/L2 Cache + GIC-400
      const coreDefs: Array<[number, number, boolean]> = [
        [-0.98, -0.98, true],
        [0.98, -0.98, true],
        [-0.98, 0.98, false],
        [0.98, 0.98, false],
      ];
      for (const [cx, cz, isLinux] of coreDefs) {
        const core = new THREE.Mesh(
          createChamferedBoxGeo(1.42, 0.18, 1.42, 0.12, 0.03, 'y'),
          isLinux ? mats.mountShimBlue : mats.copperHybridBond
        );
        core.position.set(cx, topY + 0.03, cz);
        core.userData.noEdges = true;
        // Split L1 I-Cache & D-Cache + 8-stage scalar ALU pipeline bars + 128-bit NEON SIMD FPU stripe
        const l1i = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.085, 0.48), mats.goldPlating);
        l1i.position.set(cx - 0.30, topY + 0.145, cz - 0.34);
        l1i.userData.noEdges = true;
        const l1d = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.085, 0.48), mats.sinteredSilver);
        l1d.position.set(cx + 0.30, topY + 0.145, cz - 0.34);
        l1d.userData.noEdges = true;
        const pipe8 = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.075, 0.20), mats.copperHybridBond);
        pipe8.position.set(cx, topY + 0.14, cz + 0.06);
        pipe8.userData.noEdges = true;
        const neon = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.08, 0.28), mats.goldPlating);
        neon.position.set(cx, topY + 0.145, cz + 0.40);
        neon.userData.noEdges = true;
        g.add(core, l1i, l1d, pipe8, neon);
      }
      // Central coherent SCU + 4-way shared L2 cache banks + GIC-400 interrupt distributor hub
      const xbar1 = new THREE.Mesh(new THREE.BoxGeometry(blk.w - 0.70, 0.11, 0.26), mats.goldPlating);
      xbar1.position.y = topY + 0.06;
      const xbar2 = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.11, blk.d - 0.70), mats.goldPlating);
      xbar2.position.y = topY + 0.06;
      const gicHub = new THREE.Mesh(hiResCyl(0.38, 0.40, 0.22, 16), mats.goldPlating);
      gicHub.position.y = topY + 0.09;
      const scuRing = new THREE.Mesh(hiResTorus(0.46, 0.055, 6, 16), mats.copperHybridBond);
      scuRing.rotation.x = Math.PI / 2;
      scuRing.position.y = topY + 0.14;
      for (const m of [xbar1, xbar2, gicHub, scuRing]) m.userData.noEdges = true;
      g.add(xbar1, xbar2, gicHub, scuRing);
    } else if (blk.detailKind === 'af') {
      // XR16: Sony Proprietary 32-bit SA DSP ("sabin" 16-reg VLIW) + 759-Pt PDAF L/R Correlator Ladder + 5-Axis IBIS PID Servo Ring
      // Left: 4x4 16-register file micro-matrix + dual VLIW MAC execution bars on SA DSP "sabin"
      const sabinBase = new THREE.Mesh(createChamferedBoxGeo(1.52, 0.16, 2.28, 0.10, 0.03, 'y'), mats.copperHybridBond);
      sabinBase.position.set(-0.92, topY + 0.03, -0.42);
      sabinBase.userData.noEdges = true;
      g.add(sabinBase);
      for (let rx = 0; rx < 4; rx++) {
        for (let rz = 0; rz < 4; rz++) {
          const regCell = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.11, 0.34), mats.goldPlating);
          regCell.position.set(-1.38 + rx * 0.31, topY + 0.14, -1.16 + rz * 0.48);
          regCell.userData.noEdges = true;
          g.add(regCell);
        }
      }
      // Right: Twin interleaved Left/Right 759-point PDAF phase-difference correlator tooth ladder + vernier peak bar
      for (let i = 0; i < 6; i++) {
        const z = -1.36 + i * 0.42;
        const pdL = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.15, 0.14), mats.fluorineCoatCyan);
        pdL.position.set(0.60, topY + 0.04, z);
        pdL.userData.noEdges = true;
        const pdR = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.15, 0.14), mats.copperHybridBond);
        pdR.position.set(1.18, topY + 0.04, z + 0.16);
        pdR.userData.noEdges = true;
        g.add(pdL, pdR);
      }
      const pdPeak = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.19, 2.38), mats.goldPlating);
      pdPeak.position.set(0.90, topY + 0.07, -0.25);
      pdPeak.userData.noEdges = true;
      g.add(pdPeak);
      // South: 5-Axis IBIS Gyro-Fusion PID Servo Ring (Pitch, Yaw, Roll, X, Y) linked by golden SPI bus
      const gyroBus = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.08, 0.12), mats.goldPlating);
      gyroBus.position.set(0, topY + 0.04, 1.32);
      gyroBus.userData.noEdges = true;
      g.add(gyroBus);
      for (let ax = 0; ax < 5; ax++) {
        const pid = new THREE.Mesh(hiResCyl(0.24, 0.26, 0.20, 14), ax === 2 ? mats.goldPlating : mats.copperHybridBond);
        pid.position.set(-1.32 + ax * 0.66, topY + 0.06, 1.32);
        pid.userData.noEdges = true;
        const cap = new THREE.Mesh(hiResTorus(0.18, 0.04, 6, 12), mats.goldPlating);
        cap.rotation.x = Math.PI / 2;
        cap.position.set(-1.32 + ax * 0.66, topY + 0.17, 1.32);
        cap.userData.noEdges = true;
        g.add(pid, cap);
      }
    } else if (blk.detailKind === 'codec') {
      // XR17: Hardware 8K30p/4K120p HEVC/H.265 Codec — Stepped 64->32->16->8 Recursive CTU Quadtree + ME + SAO + CABAC
      const ctu64 = new THREE.Mesh(createChamferedBoxGeo(1.56, 0.23, 1.56, 0.08, 0.03, 'y'), mats.gMasterRedBadge);
      ctu64.position.set(-0.88, topY + 0.06, -0.88);
      ctu64.userData.noEdges = true;
      const ctu32 = new THREE.Mesh(createChamferedBoxGeo(1.48, 0.19, 0.72, 0.06, 0.02, 'y'), mats.cinnabarAnodized);
      ctu32.position.set(0.88, topY + 0.045, -1.28);
      ctu32.userData.noEdges = true;
      // 3x 16x16 sub-CUs + 4x recursive 8x8 transform units inside bottom-right quad
      for (const [qx, qz] of [
        [0.50, -0.48],
        [1.24, -0.48],
        [0.50, 0.24],
      ]) {
        const cu = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.16, 0.58), mats.goldPlating);
        cu.position.set(qx, topY + 0.035, qz);
        cu.userData.noEdges = true;
        g.add(cu);
      }
      for (const [tx, tz] of [
        [1.06, 0.08],
        [1.42, 0.08],
        [1.06, 0.40],
        [1.42, 0.40],
      ]) {
        const tu8 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.13, 0.26), mats.fluorineCoatCyan);
        tu8.position.set(tx, topY + 0.03, tz);
        tu8.userData.noEdges = true;
        g.add(tu8);
      }
      // Motion Estimation (ME) SAD block (mid-left) + CABAC 600Mbps 10-bit 4:2:2 bitstream coder + SAO deblocking strip
      const meBlock = new THREE.Mesh(createChamferedBoxGeo(1.56, 0.16, 0.58, 0.06, 0.02, 'y'), mats.goldPlating);
      meBlock.position.set(-0.88, topY + 0.035, 0.26);
      meBlock.userData.noEdges = true;
      const cabac = new THREE.Mesh(createChamferedBoxGeo(3.30, 0.20, 0.86, 0.10, 0.03, 'y'), mats.copperHybridBond);
      cabac.position.set(0, topY + 0.05, 1.22);
      cabac.userData.noEdges = true;
      for (let b = -3; b <= 3; b++) {
        const bitRib = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.64), mats.goldPlating);
        bitRib.position.set(b * 0.44, topY + 0.16, 1.22);
        bitRib.userData.noEdges = true;
        g.add(bitRib);
      }
      g.add(ctu64, ctu32, meBlock, cabac);
    } else if (blk.detailKind === 'audio') {
      // XR18: 4-Channel 24bit / 32-bit Float Audio DSP — 4-ch I2S FFT Spectral-Subtraction Noise-Cut EQ Bars
      const eqHeights = [0.16, 0.28, 0.22, 0.34, 0.26, 0.18, 0.30, 0.20];
      for (let i = 0; i < 8; i++) {
        const eh = eqHeights[i];
        const bar = new THREE.Mesh(
          createChamferedBoxGeo(0.28, eh, 1.85, 0.04, 0.02, 'y'),
          i % 2 === 0 ? mats.goldPlating : mats.copperHybridBond
        );
        bar.position.set(-1.38 + i * 0.395, topY + eh * 0.45, -0.48);
        bar.userData.noEdges = true;
        g.add(bar);
      }
      const fpu32 = new THREE.Mesh(createChamferedBoxGeo(3.2, 0.18, 0.88, 0.08, 0.03, 'y'), mats.cfaGreen);
      fpu32.position.set(0, topY + 0.05, 1.12);
      fpu32.userData.noEdges = true;
      g.add(fpu32);
    } else if (blk.detailKind === 'sram') {
      // XR19: On-Die Shared L2/L3 6T-SRAM & ISP Line-Buffer — 8 Butterfly Sub-Arrays + Central X-Decoder + Outer SECDED ECC Columns
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, blk.d - 0.66), mats.goldPlating);
      spine.position.y = topY + 0.06;
      spine.userData.noEdges = true;
      g.add(spine);
      // Outer flanking SECDED ECC parity check columns
      for (const ex of [-1.72, 1.72]) {
        const eccCol = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.17, blk.d - 0.78), mats.copperHybridBond);
        eccCol.position.set(ex, topY + 0.04, 0);
        eccCol.userData.noEdges = true;
        g.add(eccCol);
      }
      for (const sx of [-0.90, 0.90]) {
        for (let iz = -1.26; iz <= 1.27; iz += 0.84) {
          const bank = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.14, 0.60), mats.dramCellArray);
          bank.position.set(sx, topY + 0.025, iz);
          bank.userData.noEdges = true;
          const senseAmp = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.19, 0.12), mats.goldPlating);
          senseAmp.position.set(sx, topY + 0.05, iz);
          senseAmp.userData.noEdges = true;
          const wlTop = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.16, 0.06), mats.copperHybridBond);
          wlTop.position.set(sx, topY + 0.035, iz - 0.20);
          wlTop.userData.noEdges = true;
          const wlBot = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.16, 0.06), mats.copperHybridBond);
          wlBot.position.set(sx, topY + 0.035, iz + 0.20);
          wlBot.userData.noEdges = true;
          g.add(bank, senseAmp, wlTop, wlBot);
        }
      }
    } else if (blk.detailKind === 'ddr') {
      // XR20: 256-Bit LPDDR5X Memory Controller — 4 DQ/CA PHY Slices + QoS Arbiter + Pre-Capture Ring-Buffer Wheel!
      for (const sx of [-1.32, 1.32]) {
        for (const sz of [-0.88, 0.88]) {
          const slice = new THREE.Mesh(createChamferedBoxGeo(0.92, 0.18, 1.32, 0.08, 0.03, 'y'), mats.mountShimBlue);
          slice.position.set(sx, topY + 0.04, sz);
          slice.userData.noEdges = true;
          g.add(slice);
        }
      }
      const ringBuf = new THREE.Mesh(hiResTorus(0.68, 0.14, 10, 24), mats.goldPlating);
      ringBuf.rotation.x = Math.PI / 2;
      ringBuf.position.y = topY + 0.10;
      ringBuf.userData.noEdges = true;
      const qosHub = new THREE.Mesh(hiResCyl(0.36, 0.36, 0.24, 16), mats.copperHybridBond);
      qosHub.position.y = topY + 0.08;
      qosHub.userData.noEdges = true;
      g.add(ringBuf, qosHub);
    } else if (blk.detailKind === 'vault') {
      // XR21: C2PA Hardware Root-of-Trust — Dense 10-Turn Continuous Gold Serpentine Active-Shield Mesh + 4 Corner Glitch Sensors + Key Vault
      const vaultHex = new THREE.Mesh(hiResCyl(1.48, 1.56, 0.20, 8), mats.matteBlackAnodized);
      vaultHex.position.y = topY + 0.045;
      vaultHex.userData.noEdges = true;
      const moatRing = new THREE.Mesh(hiResTorus(1.28, 0.095, 8, 24), mats.goldPlating);
      moatRing.rotation.x = Math.PI / 2;
      moatRing.position.y = topY + 0.15;
      moatRing.userData.noEdges = true;
      // Continuous 10-turn top-metal serpentine active-shield anti-tamper mesh weaving across vault roof!
      const turnCount = 9;
      for (let t = 0; t <= turnCount; t++) {
        const iz = -0.94 + (t / turnCount) * 1.88;
        const wireLen = 1.92 - Math.abs(iz) * 0.55;
        const wire = new THREE.Mesh(new THREE.BoxGeometry(wireLen, 0.065, 0.065), mats.goldPlating);
        wire.position.set(0, topY + 0.21, iz);
        wire.userData.noEdges = true;
        g.add(wire);
        if (t < turnCount) {
          const nextIz = -0.94 + ((t + 1) / turnCount) * 1.88;
          const midIz = (iz + nextIz) * 0.5;
          const endX = (1.92 - Math.abs(midIz) * 0.55) * 0.5 * (t % 2 === 0 ? 1 : -1);
          const turn = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.065, nextIz - iz + 0.06), mats.goldPlating);
          turn.position.set(endX, topY + 0.21, midIz);
          turn.userData.noEdges = true;
          g.add(turn);
        }
      }
      // 4 corner voltage/clock/laser-fault glitch-detector sensor pods flanking octagonal vault
      for (const gx of [-1.46, 1.46]) {
        for (const gz of [-1.46, 1.46]) {
          const gPod = new THREE.Mesh(hiResCyl(0.22, 0.24, 0.18, 10), mats.cinnabarAnodized);
          gPod.position.set(gx, topY + 0.05, gz);
          gPod.userData.noEdges = true;
          const gDot = new THREE.Mesh(hiResCyl(0.10, 0.10, 0.21, 8), mats.goldPlating);
          gDot.position.set(gx, topY + 0.06, gz);
          gDot.userData.noEdges = true;
          g.add(gPod, gDot);
        }
      }
      const keyDie = new THREE.Mesh(createChamferedBoxGeo(0.76, 0.28, 0.76, 0.08, 0.03, 'y'), mats.cinnabarAnodized);
      keyDie.position.y = topY + 0.12;
      keyDie.userData.noEdges = true;
      g.add(vaultHex, moatRing, keyDie);
    } else if (blk.detailKind === 'pcie') {
      // XR22: PCIe Gen4 CFexpress Type A NVMe DMA + SDXC UHS-II Dual-Slot Storage Engine
      for (const px of [-1.32, -0.82]) {
        const lane = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 2.75), mats.copperHybridBond);
        lane.position.set(px, topY + 0.04, 0);
        lane.userData.noEdges = true;
        g.add(lane);
      }
      const dmaRing = new THREE.Mesh(hiResTorus(0.42, 0.09, 8, 18), mats.goldPlating);
      dmaRing.rotation.x = Math.PI / 2;
      dmaRing.position.set(-1.05, topY + 0.16, 0.72);
      dmaRing.userData.noEdges = true;
      const sdBlock = new THREE.Mesh(createChamferedBoxGeo(1.56, 0.20, 2.65, 0.10, 0.03, 'y'), mats.cinnabarAnodized);
      sdBlock.position.set(0.84, topY + 0.05, 0);
      sdBlock.userData.noEdges = true;
      const raidBar = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.10, 0.36), mats.goldPlating);
      raidBar.position.set(0.84, topY + 0.18, -0.68);
      raidBar.userData.noEdges = true;
      const raidBar2 = raidBar.clone();
      raidBar2.position.z = 0.68;
      g.add(dmaRing, sdBlock, raidBar, raidBar2);
    } else if (blk.detailKind === 'hdmi') {
      // XR23: Dual-Stream Display Engine — 4-Lane 240Hz MIPI-DSI EVF TX (left) + OSD Compositor + 4-Ch HDMI 2.1 FRL TX (right)
      for (let i = 0; i < 4; i++) {
        const mipi = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 2.75), mats.fluorineCoatCyan);
        mipi.position.set(-1.52 + i * 0.32, topY + 0.04, 0);
        mipi.userData.noEdges = true;
        const frl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 2.75), mats.goldPlating);
        frl.position.set(0.56 + i * 0.32, topY + 0.04, 0);
        frl.userData.noEdges = true;
        g.add(mipi, frl);
      }
      const osdBase = new THREE.Mesh(createChamferedBoxGeo(0.82, 0.22, 2.2, 0.08, 0.03, 'y'), mats.mountShimBlue);
      osdBase.position.set(-0.08, topY + 0.06, 0);
      osdBase.userData.noEdges = true;
      g.add(osdBase);
    } else if (blk.detailKind === 'rf') {
      // XR24: USB 3.2 Gen2 10Gbps UVC/UAC + Wi-Fi 6E 2x2 MIMO — Twin 3-Turn Octagonal Spiral RF Balun Inductors + USB PHY
      for (const sx of [-0.95, 0.95]) {
        const balun = buildOctagonalSpiralCoil(0.76, 2.75, 0.095, 0.14, mats.rfGoldCoax);
        balun.position.set(sx, topY + 0.08, -0.66);
        g.add(balun);
      }
      const usbMac = new THREE.Mesh(createChamferedBoxGeo(3.2, 0.20, 1.12, 0.10, 0.04, 'y'), mats.copperHybridBond);
      usbMac.position.set(0, topY + 0.05, 0.96);
      usbMac.userData.noEdges = true;
      for (let p = -3; p <= 3; p++) {
        const pin = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.10, 0.32), mats.goldPlating);
        pin.position.set(p * 0.42, topY + 0.16, 1.24);
        pin.userData.noEdges = true;
        g.add(pin);
      }
      g.add(usbMac);
    } else {
      // XR25: Multi-Domain Fractional-N PLL & DVFS — Octagonal LC-Tank VCO Spiral Inductor + Symmetric Fractal H-Tree Clock!
      const vcoSpiral = buildOctagonalSpiralCoil(1.18, 3.0, 0.105, 0.15, mats.copperHybridBond);
      vcoSpiral.position.set(0, topY + 0.08, 0);
      g.add(vcoSpiral);
      const vcoCore = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.24, 16), mats.goldPlating);
      vcoCore.position.y = topY + 0.10;
      vcoCore.userData.noEdges = true;
      g.add(vcoCore);

      const hSpine = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.08, 0.12), mats.goldPlating);
      hSpine.position.y = topY + 0.20;
      hSpine.userData.noEdges = true;
      g.add(hSpine);
      for (const sx of [-1.42, 1.42]) {
        const vBranch = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 2.85), mats.goldPlating);
        vBranch.position.set(sx, topY + 0.20, 0);
        vBranch.userData.noEdges = true;
        g.add(vBranch);
        for (const sz of [-1.40, 1.40]) {
          const leaf = new THREE.Mesh(hiResCyl(0.18, 0.18, 0.14, 10), mats.goldPlating);
          leaf.position.set(sx, topY + 0.22, sz);
          leaf.userData.noEdges = true;
          g.add(leaf);
        }
      }
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
  // XR26. FEOL 4nm/5nm FinFET / GAA Nanosheet Transistor Layer & HKMG (y = +0.35)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Active silicon FEOL base wafer mapped with upgraded 768px HiRes 4nm EUV FinFET/GAA standard-cell micrograph
    const feolGeo = createChamferedBoxGeo(DIE_W - 0.6, 0.30, DIE_W - 0.6, 0.3, 0.04, 'y');
    const feolBase = new THREE.Mesh(feolGeo, u.bionzFeolFinfet);
    g.add(feolBase);

    // Recessed STI (Shallow Trench Isolation) dark SiO2 isolation troughs + 3-tier stacked GAA Si nanosheet ribbons!
    const stiGeo = new THREE.BoxGeometry(DIE_W - 1.8, 0.06, 0.56);
    const ribbonGeo = new THREE.BoxGeometry(DIE_W - 2.0, 0.055, 0.24);
    for (let z = -8.4; z <= 8.41; z += 1.4) {
      // Dark STI oxide isolation trench between adjacent active fins
      if (z < 8.0) {
        const sti = new THREE.Mesh(stiGeo, mats.matteBlackAnodized);
        sti.position.set(0, 0.16, z + 0.70);
        sti.userData.noEdges = true;
        g.add(sti);
      }
      // 3 discrete vertically stacked Gate-All-Around (GAA) crystalline silicon nanosheet channels
      for (let tier = 0; tier < 3; tier++) {
        const nanoRib = new THREE.Mesh(
          ribbonGeo,
          tier === 2 ? mats.fluorineCoatCyan : mats.siliconDepletion
        );
        nanoRib.position.set(0, 0.21 + tier * 0.09, z);
        nanoRib.userData.noEdges = true;
        g.add(nanoRib);
      }
    }

    // Orthogonal conformal High-k HfO2 + TiN Metal Gate (HKMG) stacks with SiN spacers, SAGC nitride caps & Co M0 contacts
    const gateGeo = new THREE.BoxGeometry(0.42, 0.38, DIE_W - 2.0);
    const sagcCapGeo = new THREE.BoxGeometry(0.44, 0.06, DIE_W - 2.0);
    const spacerGeo = new THREE.BoxGeometry(0.10, 0.36, DIE_W - 2.0);
    const contactGeo = new THREE.BoxGeometry(0.18, 0.44, DIE_W - 2.4);
    for (let x = -7.8; x <= 7.81; x += 2.6) {
      const gate = new THREE.Mesh(gateGeo, mats.gatePolysilicon);
      gate.position.set(x, 0.30, 0);
      gate.userData.noEdges = true;
      // Self-Aligned Gate Contact (SAGC) dielectric nitride cap insulating gate top from adjacent M0 trench
      const sagc = new THREE.Mesh(sagcCapGeo, mats.taNBarrierLiner);
      sagc.position.set(x, 0.51, 0);
      sagc.userData.noEdges = true;
      // Dual SiN gate dielectric sidewall spacers
      for (const sd of [-0.25, 0.25]) {
        const spacer = new THREE.Mesh(spacerGeo, mats.aluminaHighKFilm);
        spacer.position.set(x + sd, 0.29, 0);
        spacer.userData.noEdges = true;
        g.add(spacer);
      }
      // Self-aligned Cobalt (Co) M0 source/drain trench contact bar
      const contact = new THREE.Mesh(contactGeo, mats.goldPlating);
      contact.position.set(x + 1.15, 0.32, 0);
      contact.userData.noEdges = true;
      g.add(gate, sagc, contact);
    }

    // Instanced diamond-faceted {111} epitaxial SiGe/SiP source/drain stressor nodes along fin-contact junctions
    const epiGeo = hiResCyl(0.18, 0.25, 0.30, 6);
    const epiCoords: Array<[number, number]> = [];
    for (let x = -7.8; x <= 7.81; x += 2.6) {
      for (let z = -8.4; z <= 8.41; z += 1.4) {
        epiCoords.push([x + 1.15, z]);
      }
    }
    const epiInst = new THREE.InstancedMesh(epiGeo, mats.sinteredSilver, epiCoords.length);
    const dmEpi = new THREE.Object3D();
    epiCoords.forEach(([ex, ez], idx) => {
      dmEpi.position.set(ex, 0.32, ez);
      dmEpi.rotation.y = Math.PI / 6;
      dmEpi.updateMatrix();
      epiInst.setMatrixAt(idx, dmEpi.matrix);
    });
    epiInst.instanceMatrix.needsUpdate = true;
    epiInst.userData.noEdges = true;
    g.add(epiInst);

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

    // Porous SiOC Ultra-Low-k dielectric block cradling the 8-tier stepped-terrace dual-damascene Cu hierarchy
    const ulkBase = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 0.4, 0.86, DIE_W - 0.4, 0.35, 0.05, 'y'),
      mats.interlayerDielectric
    );
    g.add(ulkBase);

    // Planar-mapped 768px HiRes BEOL dual-damascene micrograph baseplate visible cleanly beneath stepped metal terraces
    const beolTopPlate = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 1.1, 0.10, DIE_W - 1.1, 0.28, 0.02, 'y'),
      u.bionzBeolDamascene
    );
    beolTopPlate.position.y = -0.37;
    beolTopPlate.userData.noEdges = true;
    g.add(beolTopPlate);

    // 8-tier progressive dual-damascene copper hierarchy (M1 fine -> M5 -> M10 semi-global -> M14 AP mesh!)
    // with TaN/Ta diffusion-barrier troughs, Co anti-electromigration cap stripes & redundant double-via pairs!
    const viaCoords: Array<[number, number, number]> = [];
    for (let layer = 0; layer < 8; layer++) {
      const y = -0.33 + layer * 0.108;
      const thick = 0.044 + layer * 0.014;
      const width = 0.12 + layer * 0.068;
      const isX = layer % 2 === 0;
      const count = Math.max(4, 11 - layer);
      const span = DIE_W - 1.9 - layer * 0.34; // Architectural stepped-terrace cutaway reveal
      for (let i = 0; i < count; i++) {
        const offset = -span * 0.44 + (i / Math.max(1, count - 1)) * span * 0.88;
        // TaN/Ta diffusion-barrier liner trough cradling semi-global & global copper tracks
        if (layer >= 4) {
          const liner = new THREE.Mesh(
            new THREE.BoxGeometry(isX ? span + 0.09 : width + 0.09, thick + 0.02, isX ? width + 0.09 : span + 0.09),
            mats.taNBarrierLiner
          );
          liner.position.set(isX ? 0 : offset, y - 0.01, isX ? offset : 0);
          liner.userData.noEdges = true;
          g.add(liner);
        }
        const wire = new THREE.Mesh(
          new THREE.BoxGeometry(isX ? span : width, thick, isX ? width : span),
          layer >= 6 ? mats.goldPlating : mats.copperHybridBond
        );
        wire.position.set(isX ? 0 : offset, y, isX ? offset : 0);
        wire.userData.noEdges = true;
        g.add(wire);

        // Cobalt (Co) anti-electromigration top cap stripe on upper heavy-current power buses (M10–M14)
        if (layer >= 5) {
          const coCap = new THREE.Mesh(
            new THREE.BoxGeometry(isX ? span - 0.1 : width * 0.52, 0.024, isX ? width * 0.52 : span - 0.1),
            mats.sinteredSilver
          );
          coCap.position.set(isX ? 0 : offset, y + thick * 0.5 + 0.012, isX ? offset : 0);
          coCap.userData.noEdges = true;
          g.add(coCap);
        }

        // Redundant double-via vertical Cu pillar pairs linking orthogonal metal layers (prevents EM open failures)
        if (layer < 7 && i % 2 === 0) {
          const vx0 = isX ? offset * 0.68 : offset;
          const vz0 = isX ? offset : offset * 0.68;
          viaCoords.push([vx0 - 0.14, y + 0.055, vz0 - 0.14], [vx0 + 0.14, y + 0.055, vz0 + 0.14]);
        }
      }
    }

    // Instanced redundant double-via vertical copper pillars (V1–V13)
    const viaGeo = hiResCyl(0.085, 0.085, 0.14, 8);
    const viaInst = new THREE.InstancedMesh(viaGeo, mats.copperHybridBond, viaCoords.length);
    const dmVia = new THREE.Object3D();
    viaCoords.forEach(([vx, vy, vz], idx) => {
      dmVia.position.set(vx, vy, vz);
      dmVia.updateMatrix();
      viaInst.setMatrixAt(idx, dmVia.matrix);
    });
    viaInst.instanceMatrix.needsUpdate = true;
    viaInst.userData.noEdges = true;
    g.add(viaInst);

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

    // Chamfered silicon chiplet slab planar-mapped with upgraded CXD90058 "Cetus" 4x Cortex-A35 uITRON floorplan
    const cetusGeo = extrudeHiRes(createRoundedRectShape(4.6, 13.8, 0.48), 1.15, 0.1, 0.1, 2, 18);
    cetusGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(cetusGeo, 4.6, 13.8, 'xz');
    const cetusDie = new THREE.Mesh(cetusGeo, u.bionzCetusDie);
    g.add(cetusDie);

    // Dual Cu outer + gold inner crack-stop moisture-guard seal ring framing CXD90058
    const sealOuter = makeHiResHorizPlate(
      createFrameShape(4.82, 14.02, 0.56, 4.30, 13.50, 0.42),
      1.18,
      mats.copperHybridBond,
      0.03,
      1,
      16
    );
    sealOuter.userData.noEdges = true;
    const sealInner = makeHiResHorizPlate(
      createFrameShape(4.16, 13.36, 0.38, 3.92, 13.12, 0.32),
      1.20,
      mats.goldPlating,
      0.02,
      1,
      14
    );
    sealInner.userData.noEdges = true;
    g.add(sealOuter, sealInner);

    // Central coherent SCU + hardware uITRON real-time interrupt/timer spine linking all 4 Cortex-A35 cores
    const scuSpine = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 11.4), mats.copperHybridBond);
    scuSpine.position.set(-1.12, 0.64, 0);
    scuSpine.userData.noEdges = true;
    g.add(scuSpine);

    // 4 sculpted Cortex-A35 cores (each with logic core + split L1 I$/D$ SRAM + 128-bit NEON SIMD stripe)
    for (let i = -1.5; i <= 1.5; i += 1.0) {
      const cz = i * 3.0;
      const coreTile = new THREE.Mesh(createChamferedBoxGeo(2.45, 0.15, 2.25, 0.12, 0.03, 'y'), mats.goldPlating);
      coreTile.position.set(0.38, 0.63, cz);
      coreTile.userData.noEdges = true;
      const l1i = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.09, 0.78), mats.siliconTsvDram);
      l1i.position.set(0.96, 0.73, cz - 0.50);
      l1i.userData.noEdges = true;
      const l1d = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.09, 0.78), mats.sinteredSilver);
      l1d.position.set(0.96, 0.73, cz + 0.50);
      l1d.userData.noEdges = true;
      const neonStrip = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, 1.72), mats.copperHybridBond);
      neonStrip.position.set(-0.32, 0.73, cz);
      neonStrip.userData.noEdges = true;
      g.add(coreTile, l1i, l1d, neonStrip);
    }

    // Left-edge dense 2-row staggered 44-pad LSI silicon-bridge D2D PHY interface bank facing main BIONZ XR die!
    const edgePhy = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.16, 12.2), mats.copperHybridBond);
    edgePhy.position.set(-1.74, 0.64, 0);
    edgePhy.userData.noEdges = true;
    g.add(edgePhy);

    const d2dPadGeo = new THREE.BoxGeometry(0.22, 0.08, 0.24);
    const d2dInst = new THREE.InstancedMesh(d2dPadGeo, mats.goldPlating, 44);
    const dmD2d = new THREE.Object3D();
    let di = 0;
    for (let k = 0; k < 22; k++) {
      const pz = -5.6 + k * 0.533;
      dmD2d.position.set(-1.89, 0.74, pz);
      dmD2d.updateMatrix();
      d2dInst.setMatrixAt(di++, dmD2d.matrix);
      dmD2d.position.set(-1.58, 0.74, pz + (k < 21 ? 0.266 : -0.266));
      dmD2d.updateMatrix();
      d2dInst.setMatrixAt(di++, dmD2d.matrix);
    }
    d2dInst.instanceMatrix.needsUpdate = true;
    d2dInst.userData.noEdges = true;
    g.add(d2dInst);

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

    // TSMC CoWoS-L / InFO_LSI embedded local silicon interconnect bridge die mapped with 2/2um Cu-RDL texture
    const bridgeGeo = extrudeHiRes(createRoundedRectShape(8.4, 15.6, 0.42), 0.54, 0.06, 0.06, 2, 16);
    bridgeGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(bridgeGeo, 8.4, 15.6, 'xz');
    const bridgeBody = new THREE.Mesh(bridgeGeo, u.bionzLsiBridge);
    bridgeBody.position.x = 10.2;
    g.add(bridgeBody);

    // Molded organic RDL carrier collar cradling the embedded silicon bridge die
    const lsiCollar = makeHiResHorizPlate(
      createFrameShape(9.6, 16.8, 0.62, 8.2, 15.4, 0.42),
      0.46,
      u.bionzEmcSilica,
      0.04,
      1,
      16
    );
    lsiCollar.position.set(10.2, -0.02, 0);
    lsiCollar.userData.noEdges = true;
    g.add(lsiCollar);

    // Authentic CMP dummy-Cu warpage-balance chequered copper pads embedded along organic mold collar margins!
    const dummyPadGeo = new THREE.BoxGeometry(0.32, 0.06, 0.42);
    const dummyPadCoords: Array<[number, number]> = [];
    for (let k = -7; k <= 7; k++) {
      dummyPadCoords.push([5.72, k * 1.02], [14.68, k * 1.02]);
    }
    const cmpInst = new THREE.InstancedMesh(dummyPadGeo, mats.copperHeatSpreader, dummyPadCoords.length);
    const dmCmp = new THREE.Object3D();
    dummyPadCoords.forEach(([cx, cz], idx) => {
      dmCmp.position.set(cx, 0.24, cz);
      dmCmp.updateMatrix();
      cmpInst.setMatrixAt(idx, dmCmp.matrix);
    });
    cmpInst.instanceMatrix.needsUpdate = true;
    cmpInst.userData.noEdges = true;
    g.add(cmpInst);

    // 2-layer orthogonal ultra-fine 2/2um Cu-RDL die-to-die micro-lines (22 X-lines + 6 Z-strapping power rails)
    for (let k = 0; k < 22; k++) {
      const z = -6.3 + k * 0.60;
      const trace = new THREE.Mesh(
        new THREE.BoxGeometry(6.8, 0.08, 0.14),
        k % 2 === 0 ? mats.copperHybridBond : mats.goldPlating
      );
      trace.position.set(10.2, 0.29, z);
      trace.userData.noEdges = true;
      g.add(trace);
    }
    for (let c = 0; c < 6; c++) {
      const rx = 7.75 + c * 0.98;
      const zRail = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.06, 13.0), mats.copperHybridBond);
      zRail.position.set(rx, 0.34, 0);
      zRail.userData.noEdges = true;
      g.add(zRail);
    }

    // 2-row staggered 35um gold micro-bump landing pad grids along BOTH Mira (-X) and Cetus (+X) flanks!
    const uPadGeo = hiResCyl(0.14, 0.14, 0.10, 8);
    const uPadCoords: Array<[number, number]> = [];
    for (const bx of [6.65, 7.15, 13.25, 13.75]) {
      const stag = bx === 7.15 || bx === 13.75 ? 0.30 : 0.0;
      for (let k = 0; k < 22; k++) {
        uPadCoords.push([bx, -6.3 + k * 0.60 + stag * 0.5]);
      }
    }
    const uPadInst = new THREE.InstancedMesh(uPadGeo, mats.goldPlating, uPadCoords.length);
    const dmUp = new THREE.Object3D();
    uPadCoords.forEach(([ux, uz], idx) => {
      dmUp.position.set(ux, 0.32, uz);
      dmUp.updateMatrix();
      uPadInst.setMatrixAt(idx, dmUp.matrix);
    });
    uPadInst.instanceMatrix.needsUpdate = true;
    uPadInst.userData.noEdges = true;
    g.add(uPadInst);

    // Embedded Deep Trench Capacitor (eDTC) silicon decoupling bars with gold/copper terminal straps at north & south ends
    for (const ez of [-7.1, 7.1]) {
      const edtc = new THREE.Mesh(createChamferedBoxGeo(5.8, 0.17, 0.72, 0.08, 0.02, 'y'), mats.siliconTsvDram);
      edtc.position.set(10.2, 0.32, ez);
      edtc.userData.noEdges = true;
      const capStrapA = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.19, 0.64), mats.goldPlating);
      capStrapA.position.set(7.6, 0.33, ez);
      capStrapA.userData.noEdges = true;
      const capStrapB = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.19, 0.64), mats.copperHybridBond);
      capStrapB.position.set(12.8, 0.33, ez);
      capStrapB.userData.noEdges = true;
      g.add(edtc, capStrapA, capStrapB);
    }

    // Perimeter fan-out polymer-RDL redistribution collar framing main die footprint
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
  // XR30. Flip-Chip C4 Copper-Pillar Micro-Bump Array (3-Zone Heterogeneous) (y = -2.1)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Zone 1: Main BIONZ XR die 14x14 C4 Cu-pillar array (196 pillars: inner high-current VDD_CORE/GND cluster 1.12x wider!)
    const gridN = 14;
    const mainCoords: Array<[number, number, boolean]> = [];
    const step = (DIE_W - 2.2) / (gridN - 1);
    for (let ix = 0; ix < gridN; ix++) {
      for (let iz = 0; iz < gridN; iz++) {
        const isPowerCore = ix >= 4 && ix <= 9 && iz >= 4 && iz <= 9;
        mainCoords.push([-(DIE_W - 2.2) * 0.5 + ix * step, -(DIE_W - 2.2) * 0.5 + iz * step, isPowerCore]);
      }
    }
    // Zone 3: Cetus companion chiplet C4 pillar sub-array (3x9 = 27 pillars at x = +13.2)
    for (let ix = 0; ix < 3; ix++) {
      for (let iz = 0; iz < 9; iz++) {
        mainCoords.push([12.1 + ix * 1.1, -5.6 + iz * 1.4, ix === 1]);
      }
    }

    const totalMain = mainCoords.length;
    const ubmGeo = hiResCyl(0.33, 0.33, 0.08, 10);
    const cuGeo = hiResCyl(0.28, 0.28, 0.44, 12);
    const niBarrierGeo = hiResCyl(0.295, 0.295, 0.08, 10);
    const imcGeo = hiResCyl(0.29, 0.315, 0.09, 10);
    const capGeo = hiResSphere(0.31, 10, 8);

    const ubms = new THREE.InstancedMesh(ubmGeo, mats.goldPlating, totalMain);
    const pillars = new THREE.InstancedMesh(cuGeo, mats.copperHybridBond, totalMain);
    const niBarriers = new THREE.InstancedMesh(niBarrierGeo, mats.stainlessMachined, totalMain);
    const imcs = new THREE.InstancedMesh(imcGeo, mats.sinteredSilver, totalMain);
    const caps = new THREE.InstancedMesh(capGeo, u.bionzSac305Solder, totalMain);

    const dummy = new THREE.Object3D();
    mainCoords.forEach(([x, z, isPwr], idx) => {
      const rScale = isPwr ? 1.12 : 0.96;
      dummy.scale.set(rScale, 1, rScale);
      dummy.position.set(x, 0.40, z);
      dummy.updateMatrix();
      ubms.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(x, 0.16, z);
      dummy.updateMatrix();
      pillars.setMatrixAt(idx, dummy.matrix);

      // Electroplated Nickel (Ni) diffusion-barrier collar preventing excessive Cu-Sn Kirkendall voids
      dummy.position.set(x, -0.07, z);
      dummy.updateMatrix();
      niBarriers.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(x, -0.15, z);
      dummy.updateMatrix();
      imcs.setMatrixAt(idx, dummy.matrix);

      // Reflow-flattened oblate Sn-3.5Ag eutectic solder cap
      dummy.scale.set(rScale, 0.84, rScale);
      dummy.position.set(x, -0.26, z);
      dummy.updateMatrix();
      caps.setMatrixAt(idx, dummy.matrix);
    });

    // Zone 2: Ultra-fine 35um pitch staggered 2x20 micro-bump bridge columns over LSI bridge (40 micro-bumps!)
    const uBumpGeo = hiResCyl(0.145, 0.145, 0.42, 8);
    const uCapGeo = hiResSphere(0.165, 8, 6);
    const uPillars = new THREE.InstancedMesh(uBumpGeo, mats.copperHybridBond, 40);
    const uCaps = new THREE.InstancedMesh(uCapGeo, mats.goldPlating, 40);
    let ui = 0;
    for (const bx of [9.65, 10.75]) {
      const stag = bx > 10.0 ? 0.30 : 0.0;
      for (let k = 0; k < 20; k++) {
        const bz = -6.0 + k * 0.62 + stag * 0.5;
        dummy.scale.set(1, 1, 1);
        dummy.position.set(bx, 0.16, bz);
        dummy.updateMatrix();
        uPillars.setMatrixAt(ui, dummy.matrix);
        dummy.scale.set(1, 0.86, 1);
        dummy.position.set(bx, -0.08, bz);
        dummy.updateMatrix();
        uCaps.setMatrixAt(ui, dummy.matrix);
        ui++;
      }
    }

    for (const im of [ubms, pillars, niBarriers, imcs, caps, uPillars, uCaps]) {
      im.instanceMatrix.needsUpdate = true;
      im.userData.noEdges = true;
    }
    g.add(ubms, pillars, niBarriers, imcs, caps, uPillars, uCaps);

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

    // Sculpted 2-tier sloped capillary meniscus fillet collar hugging all 4 die edges (mapped with nano-silica CUF texture)
    const outerSkirtGeo = extrudeHiRes(
      createFrameShape(DIE_W + 2.8, DIE_W + 2.8, 1.3, DIE_W + 0.4, DIE_W + 0.4, 0.65),
      0.42,
      0.16,
      0.14,
      2,
      20
    );
    outerSkirtGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(outerSkirtGeo, 10.0);
    const outerSkirt = new THREE.Mesh(outerSkirtGeo, u.bionzCufSilica);
    outerSkirt.position.y = -0.22;

    const innerClimbGeo = extrudeHiRes(
      createFrameShape(DIE_W + 1.5, DIE_W + 1.5, 0.9, DIE_W - 0.8, DIE_W - 0.8, 0.48),
      0.88,
      0.20,
      0.18,
      2,
      20
    );
    innerClimbGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(innerClimbGeo, 10.0);
    const innerClimb = new THREE.Mesh(innerClimbGeo, u.bionzCufSilica);

    // Authentic L-dispense needle fillet ridge slightly thicker along -X and -Z jetting edges
    const dispenseL1 = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W + 2.2, 0.34, 0.68, 0.25, 0.10, 'y'),
      u.bionzCufSilica
    );
    dispenseL1.position.set(-0.3, -0.22, -DIE_W * 0.5 - 1.25);
    dispenseL1.userData.noEdges = true;
    const dispenseL2 = new THREE.Mesh(
      createChamferedBoxGeo(0.68, 0.34, DIE_W + 2.2, 0.25, 0.10, 'y'),
      u.bionzCufSilica
    );
    dispenseL2.position.set(-DIE_W * 0.5 - 1.25, -0.22, -0.3);
    dispenseL2.userData.noEdges = true;

    // Translucent 65wt% nano-silica epoxy under-die capillary film
    const coreSheet = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 0.9, 0.38, DIE_W - 0.9, 0.4, 0.04, 'y'),
      mats.opticalCementClear
    );

    // Secondary Cetus companion chiplet CUF meniscus collar at x = +13.2
    const cetusCufGeo = extrudeHiRes(
      createFrameShape(5.8, 15.0, 0.75, 4.1, 13.3, 0.45),
      0.66,
      0.14,
      0.12,
      2,
      16
    );
    cetusCufGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(cetusCufGeo, 10.0);
    const cetusCuf = new THREE.Mesh(cetusCufGeo, u.bionzCufSilica);
    cetusCuf.position.set(13.2, -0.05, 0);

    g.add(outerSkirt, innerClimb, dispenseL1, dispenseL2, coreSheet, cetusCuf);

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

    // 4 Murata/TDK-grade embedded 3D deep-trench silicon capacitors (eSiCap) mapped with trench-pore texture
    for (const [cx, cz, rotY] of [
      [-4.2, 0, 0],
      [4.2, 0, 0],
      [0, -4.2, Math.PI / 2],
      [0, 4.2, Math.PI / 2],
    ] as Array<[number, number, number]>) {
      const capGrp = new THREE.Group();
      const esicapGeo = createChamferedBoxGeo(3.6, 0.36, 2.35, 0.16, 0.04, 'y');
      const esicap = new THREE.Mesh(esicapGeo, u.bionzEsicapDie);
      capGrp.add(esicap);

      // Interdigitated wide low-ESL gold VDD / copper VSS terminal bars + fine comb busbars + 12 flip-chip bumps
      const padL = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.40, 2.05), mats.goldPlating);
      padL.position.x = -1.48;
      padL.userData.noEdges = true;
      const padR = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.40, 2.05), mats.copperHybridBond);
      padR.position.x = 1.48;
      padR.userData.noEdges = true;
      capGrp.add(padL, padR);

      // Interdigitated low-inductance top collector fingers across eSiCap die
      for (let f = -2; f <= 2; f++) {
        const isVdd = f % 2 === 0;
        const finger = new THREE.Mesh(
          new THREE.BoxGeometry(2.35, 0.05, 0.10),
          isVdd ? mats.goldPlating : mats.copperHybridBond
        );
        finger.position.set(isVdd ? -0.18 : 0.18, 0.20, f * 0.36);
        finger.userData.noEdges = true;
        capGrp.add(finger);
      }

      for (const bx of [-1.48, -0.52, 0.52, 1.48]) {
        for (const bz of [-0.68, 0, 0.68]) {
          const bump = new THREE.Mesh(hiResCyl(0.15, 0.15, 0.14, 10), u.bionzSac305Solder);
          bump.position.set(bx, -0.22, bz);
          bump.userData.noEdges = true;
          capGrp.add(bump);
        }
      }
      capGrp.rotation.y = rotY;
      capGrp.position.set(cx, 4.5, cz);
      g.add(capGrp);
    }

    // 24 Land-Side decoupling MLCCs (6x4 courtyard):
    // Central 12 VDD_CORE rails = authentic Murata LLD 3-terminal low-ESL feedthrough MLCCs (central silver GND belt!)
    // Outer 12 rails = Murata LLC152D 0204 LW-reverse ultra-thin MLCCs on gold ENEPIG pads!
    for (let ix = -2.5; ix <= 2.5; ix += 1.0) {
      for (let iz = -1.5; iz <= 1.5; iz += 1.0) {
        const isThreeTerm = Math.abs(iz) < 0.6;
        if (isThreeTerm) {
          const cap3t = buildThreeTerminalMlcc(
            1.44,
            0.78,
            0.60,
            mats.smdCeramic,
            mats.solderBallSilver,
            mats.goldPlating
          );
          cap3t.position.set(ix * 1.92, -0.05, iz * 2.15);
          g.add(cap3t);
        } else {
          const capLw = buildSmdPassive(
            1.18,
            0.94,
            0.56,
            mats.smdCeramic,
            mats.solderBallSilver,
            'y'
          );
          capLw.position.set(ix * 1.92, -0.05, iz * 2.15);
          for (const s of [-1, 1]) {
            const land = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 1.02), mats.goldPlating);
            land.position.set(ix * 1.92 + s * 0.48, 0.27, iz * 2.15);
            land.userData.noEdges = true;
            g.add(land);
          }
          g.add(capLw);
        }
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

    // Multi-layer AT&S ABF GX-T31 substrate top slab planar-mapped with SAP 9/12um routing & silkscreen
    const abfGeo = extrudeHiRes(createRoundedRectShape(PKG_W, PKG_W, 1.6), 1.12, 0.12, 0.12, 2, 24);
    abfGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(abfGeo, PKG_W, PKG_W, 'xz');
    const abfTop = new THREE.Mesh(abfGeo, u.bionzAbfSubstrate);
    g.add(abfTop);

    // 6 crisp visible laminated SAP copper build-up strata bands gleaming around all 4 package side edges!
    for (let s = 0; s < 6; s++) {
      const strata = makeHiResHorizPlate(
        createFrameShape(PKG_W + 0.05, PKG_W + 0.05, 1.6, PKG_W - 0.18, PKG_W - 0.18, 1.52),
        0.05,
        s % 2 === 0 ? mats.copperHeatSpreader : mats.copperHybridBond,
        0.01,
        1,
        20
      );
      strata.position.y = -0.40 + s * 0.16;
      strata.userData.noEdges = true;
      g.add(strata);
    }

    // Raised 3D serpentine length-matching surface escape trace clusters fanning radially from die edge toward perimeter
    for (const side of [-1, 1]) {
      for (let k = -3; k <= 3; k++) {
        const pos = k * 2.75;
        const trMat = k % 2 === 0 ? mats.copperHybridBond : mats.goldPlating;
        const escZ = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 1.75), trMat);
        escZ.position.set(pos, 0.58, side * 11.65);
        escZ.userData.noEdges = true;
        const jogZ = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.14), trMat);
        jogZ.position.set(pos + 0.16, 0.58, side * 11.75);
        jogZ.userData.noEdges = true;

        const escX = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.05, 0.14), trMat);
        escX.position.set(side * 11.65, 0.58, pos);
        escX.userData.noEdges = true;
        const jogX = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.46), trMat);
        jogX.position.set(side * 11.75, 0.58, pos + 0.16);
        jogX.userData.noEdges = true;
        g.add(escZ, jogZ, escX, jogX);
      }
    }

    // Perimeter EMI copper ground fence trace around top ABF shoulder
    const emiFence = makeHiResHorizPlate(
      createFrameShape(PKG_W - 0.55, PKG_W - 0.55, 1.48, PKG_W - 0.92, PKG_W - 0.92, 1.38),
      0.08,
      mats.goldPlating,
      0.01,
      1,
      20
    );
    emiFence.position.y = 0.58;
    emiFence.userData.noEdges = true;
    g.add(emiFence);

    // 44 perimeter die-side 01005/0201 SMD decoupling MLCCs & thin-film resistors seated on gold ENEPIG pads!
    for (let i = -5; i <= 5; i++) {
      for (const side of [-1, 1]) {
        const isRes = Math.abs(i) === 4;
        const bodyMat = isRes ? mats.matteBlackAnodized : mats.smdCeramic;
        const cap1 = buildSmdPassive(1.18, 0.58, 0.50, bodyMat, mats.solderBallSilver, 'y');
        cap1.position.set(i * 2.18, 0.82, side * 13.45);
        const pad1 = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.06, 0.68), mats.goldPlating);
        pad1.position.set(i * 2.18, 0.58, side * 13.45);
        pad1.userData.noEdges = true;
        g.add(cap1, pad1);

        const cap2 = buildSmdPassive(1.18, 0.58, 0.50, bodyMat, mats.solderBallSilver, 'y');
        cap2.rotation.y = Math.PI / 2;
        cap2.position.set(side * 13.45, 0.82, i * 2.18);
        const pad2 = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.06, 1.36), mats.goldPlating);
        pad2.position.set(side * 13.45, 0.58, i * 2.18);
        pad2.userData.noEdges = true;
        g.add(cap2, pad2);
      }
    }

    // 4 gold optical AOI fiducials with concentric dark solder-mask clearance moats + raised Pin-1 corner triangle
    for (const [fx, fz] of [
      [-14.2, -14.2],
      [14.2, -14.2],
      [-14.2, 14.2],
      [14.2, 14.2],
    ]) {
      const moat = new THREE.Mesh(hiResCyl(0.92, 0.92, 0.08, 16), mats.matteBlackAnodized);
      moat.position.set(fx, 0.57, fz);
      moat.userData.noEdges = true;
      const fidRing = new THREE.Mesh(hiResTorus(0.75, 0.11, 8, 18), mats.goldPlating);
      fidRing.rotation.x = Math.PI / 2;
      fidRing.position.set(fx, 0.62, fz);
      fidRing.userData.noEdges = true;
      const fidDot = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.14, 14), mats.goldPlating);
      fidDot.position.set(fx, 0.62, fz);
      fidDot.userData.noEdges = true;
      g.add(moat, fidRing, fidDot);
    }

    const abfPin1Shape = new THREE.Shape();
    abfPin1Shape.moveTo(0, 0);
    abfPin1Shape.lineTo(1.45, 0);
    abfPin1Shape.lineTo(0, -1.45);
    abfPin1Shape.closePath();
    const abfPin1Geo = extrudeHiRes(abfPin1Shape, 0.08, 0.015, 0.015, 1, 6);
    abfPin1Geo.rotateX(-Math.PI / 2);
    const abfPin1 = new THREE.Mesh(abfPin1Geo, mats.goldPlating);
    abfPin1.position.set(-12.9, 0.60, -12.9);
    abfPin1.userData.noEdges = true;
    g.add(abfPin1);

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

    // Woven E-glass/T-glass cloth BT-resin high-Tg rigid core plate
    const coreGeo = extrudeHiRes(createRoundedRectShape(PKG_W, PKG_W, 1.6), 1.68, 0.1, 0.1, 2, 24);
    coreGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(coreGeo, 12.0);
    const core = new THREE.Mesh(coreGeo, u.bionzBtCore);

    // Split top 35um heavy copper power planes (VDD_CORE / VDD_NPU / VDD2H_MEM) separated by etched isolation moats!
    const pwrCorePlane = new THREE.Mesh(
      createChamferedBoxGeo(16.4, 0.14, PKG_W - 1.4, 0.9, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    pwrCorePlane.position.set(-6.9, 0.88, 0);
    const pwrNpuPlane = new THREE.Mesh(
      createChamferedBoxGeo(12.8, 0.14, 14.4, 0.8, 0.03, 'y'),
      mats.copperHybridBond
    );
    pwrNpuPlane.position.set(8.6, 0.88, -7.8);
    const pwrMemPlane = new THREE.Mesh(
      createChamferedBoxGeo(12.8, 0.14, 14.4, 0.8, 0.03, 'y'),
      mats.goldPlating
    );
    pwrMemPlane.position.set(8.6, 0.88, 7.8);

    // Continuous bottom 35um solid PGND return reference copper plane
    const gndBot = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W - 1.1, 0.14, PKG_W - 1.1, 1.2, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    gndBot.position.y = -0.88;
    g.add(core, pwrCorePlane, pwrNpuPlane, pwrMemPlane, gndBot);

    // 100 (10x10) Resin-Plugged PTH copper core vias with anti-pad clearance halos, gold capture rings & VIPPO cap plating!
    const pthGeo = hiResCyl(0.36, 0.36, 1.98, 12);
    const plugGeo = hiResCyl(0.19, 0.19, 2.02, 10);
    const vippoCapGeo = hiResCyl(0.30, 0.30, 0.055, 12);
    const padRingGeo = hiResTorus(0.46, 0.08, 6, 14);
    const antipadGeo = hiResCyl(0.64, 0.64, 0.17, 12);

    const nGrid = 10;
    const totalPth = nGrid * nGrid;
    const pthInst = new THREE.InstancedMesh(pthGeo, mats.copperHybridBond, totalPth);
    const plugInst = new THREE.InstancedMesh(plugGeo, mats.matteBlackAnodized, totalPth);
    const vippoTopInst = new THREE.InstancedMesh(vippoCapGeo, mats.copperHeatSpreader, totalPth);
    const topRingInst = new THREE.InstancedMesh(padRingGeo, mats.goldPlating, totalPth);
    const botRingInst = new THREE.InstancedMesh(padRingGeo, mats.goldPlating, totalPth);
    const antipadInst = new THREE.InstancedMesh(antipadGeo, u.bionzBtCore, totalPth);

    const dummy = new THREE.Object3D();
    const rotDummy = new THREE.Object3D();
    rotDummy.rotation.x = Math.PI / 2;
    let idx = 0;
    for (let ix = 0; ix < nGrid; ix++) {
      for (let iz = 0; iz < nGrid; iz++) {
        const px = -13.05 + ix * 2.9;
        const pz = -13.05 + iz * 2.9;
        dummy.position.set(px, 0, pz);
        dummy.updateMatrix();
        pthInst.setMatrixAt(idx, dummy.matrix);
        plugInst.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(px, 0.89, pz);
        dummy.updateMatrix();
        antipadInst.setMatrixAt(idx, dummy.matrix);

        // Flat VIPPO (Via-In-Pad Plated Over) electroplated copper cap disc crowning resin plug
        dummy.position.set(px, 1.00, pz);
        dummy.updateMatrix();
        vippoTopInst.setMatrixAt(idx, dummy.matrix);

        rotDummy.position.set(px, 0.97, pz);
        rotDummy.updateMatrix();
        topRingInst.setMatrixAt(idx, rotDummy.matrix);

        rotDummy.position.set(px, -0.97, pz);
        rotDummy.updateMatrix();
        botRingInst.setMatrixAt(idx, rotDummy.matrix);
        idx++;
      }
    }
    for (const im of [pthInst, plugInst, vippoTopInst, topRingInst, botRingInst, antipadInst]) {
      im.instanceMatrix.needsUpdate = true;
      im.userData.noEdges = true;
    }
    g.add(pthInst, plugInst, vippoTopInst, topRingInst, botRingInst, antipadInst);

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
  // XR35. Bottom ABF Fan-Out Layers, Taiyo PSR-4000 SR Mask & ENEPIG Pads (y = -6.4)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Bottom ABF laminate planar-mapped with upgraded Taiyo PSR-4000 AUS703 green solder-resist & ENEPIG BGA pad map!
    const abfBotGeo = extrudeHiRes(createRoundedRectShape(PKG_W, PKG_W, 1.6), 1.12, 0.12, 0.12, 2, 24);
    abfBotGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(abfBotGeo, PKG_W, PKG_W, 'xz-bottom');
    const abfBot = new THREE.Mesh(abfBotGeo, u.bionzAbfBottomSr);
    g.add(abfBot);

    // 144 sculpted ENEPIG (Ni/Pd/Au) SMD pads + PSR-4000 dam rings + authentic dog-bone micro-via teardrop stubs!
    const padCoords: Array<[number, number]> = [];
    for (let ix = -6; ix <= 6; ix++) {
      for (let iz = -6; iz <= 6; iz++) {
        if (Math.abs(ix) <= 2 && Math.abs(iz) <= 2) continue;
        padCoords.push([ix * 2.25, iz * 2.25]);
      }
    }
    const padGeo = hiResCyl(0.58, 0.58, 0.14, 14);
    const damGeo = hiResTorus(0.68, 0.08, 6, 14);
    const dogBoneStubGeo = new THREE.BoxGeometry(0.58, 0.06, 0.16);
    const microViaGeo = hiResCyl(0.18, 0.18, 0.11, 10);

    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, padCoords.length);
    const damInst = new THREE.InstancedMesh(damGeo, mats.abfSubstrate, padCoords.length);
    const stubInst = new THREE.InstancedMesh(dogBoneStubGeo, mats.copperHybridBond, padCoords.length);
    const uViaInst = new THREE.InstancedMesh(microViaGeo, mats.goldPlating, padCoords.length);

    const dummy = new THREE.Object3D();
    const damDummy = new THREE.Object3D();
    damDummy.rotation.x = Math.PI / 2;
    padCoords.forEach(([x, z], i) => {
      dummy.rotation.set(0, 0, 0);
      dummy.position.set(x, -0.60, z);
      dummy.updateMatrix();
      padInst.setMatrixAt(i, dummy.matrix);

      damDummy.position.set(x, -0.58, z);
      damDummy.updateMatrix();
      damInst.setMatrixAt(i, damDummy.matrix);

      // Authentic BGA dog-bone escape trace & offset blind laser micro-via pad oriented diagonally toward package core
      const dx = x >= 0 ? -1 : 1;
      const dz = z >= 0 ? -1 : 1;
      const ang = Math.atan2(dz, dx);
      dummy.position.set(x + dx * 0.54, -0.58, z + dz * 0.54);
      dummy.rotation.set(0, -ang, 0);
      dummy.updateMatrix();
      stubInst.setMatrixAt(i, dummy.matrix);

      dummy.rotation.set(0, 0, 0);
      dummy.position.set(x + dx * 0.78, -0.59, z + dz * 0.78);
      dummy.updateMatrix();
      uViaInst.setMatrixAt(i, dummy.matrix);
    });
    for (const im of [padInst, damInst, stubInst, uViaInst]) {
      im.instanceMatrix.needsUpdate = true;
      im.userData.noEdges = true;
    }
    g.add(padInst, damInst, stubInst, uViaInst);

    // Bottom-face Pin-1 corner gold orientation chevron triangle at (-14.8, -0.60, -14.8)
    const botPin1Shape = new THREE.Shape();
    botPin1Shape.moveTo(0, 0);
    botPin1Shape.lineTo(1.55, 0);
    botPin1Shape.lineTo(0, -1.55);
    botPin1Shape.closePath();
    const botPin1Geo = extrudeHiRes(botPin1Shape, 0.08, 0.015, 0.015, 1, 6);
    botPin1Geo.rotateX(-Math.PI / 2);
    const botPin1 = new THREE.Mesh(botPin1Geo, mats.goldPlating);
    botPin1.position.set(-15.1, -0.58, -15.1);
    botPin1.userData.noEdges = true;
    g.add(botPin1);

    // 4 sculpted impedance-controlled copper fan-out bus bridges with gold differential lane traces
    for (const [bx, bz, bw, bd, alongZ] of [
      [-16.8, 0, 2.2, 18.0, true],
      [16.8, 0, 2.2, 16.0, true],
      [-4.2, 16.8, 16.0, 2.2, false],
      [10.2, -16.8, 12.0, 2.2, false],
    ] as Array<[number, number, number, number, boolean]>) {
      const bus = new THREE.Mesh(
        createChamferedBoxGeo(bw, 0.16, bd, 0.16, 0.03, 'y'),
        mats.copperHeatSpreader
      );
      bus.position.set(bx, 0.56, bz);
      bus.userData.noEdges = true;
      g.add(bus);
      for (let t = -2; t <= 2; t++) {
        const lane = new THREE.Mesh(
          new THREE.BoxGeometry(alongZ ? 0.18 : bw - 0.6, 0.06, alongZ ? bd - 0.8 : 0.18),
          mats.goldPlating
        );
        lane.position.set(alongZ ? bx + t * 0.34 : bx, 0.66, alongZ ? bz : bz + t * 0.34);
        lane.userData.noEdges = true;
        g.add(lane);
      }
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
  // XR36. SAC305 Lead-Free BGA Solder Ball Matrix (with IMC Collars & Corner Anchors) (y = -7.65)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ballCoords: Array<[number, number, boolean]> = [];
    for (let ix = -6; ix <= 6; ix++) {
      for (let iz = -6; iz <= 6; iz++) {
        if (Math.abs(ix) <= 2 && Math.abs(iz) <= 2) continue;
        // Authentic Pin-1 A1 corner BGA ball depopulation polarization key at (-6, -6)!
        if (ix === -6 && iz === -6) continue;
        const isCornerAnchor = Math.abs(ix) === 6 && Math.abs(iz) === 6;
        ballCoords.push([ix * 2.25, iz * 2.25, isCornerAnchor]);
      }
    }

    // Reflow-flattened oblate-spheroid SAC305 (Sn-3.0Ag-0.5Cu) eutectic β-Sn dendritic BGA balls + Cu6Sn5/Ni3Sn4 IMC necks!
    const bgaGeo = hiResSphere(0.70, 16, 12);
    const imcGeo = hiResCyl(0.54, 0.44, 0.18, 12);
    const bgaInst = new THREE.InstancedMesh(bgaGeo, u.bionzSac305Solder, ballCoords.length);
    const imcTopInst = new THREE.InstancedMesh(imcGeo, mats.sinteredSilver, ballCoords.length);
    const imcBotInst = new THREE.InstancedMesh(imcGeo, mats.sinteredSilver, ballCoords.length);

    const dummy = new THREE.Object3D();
    ballCoords.forEach(([x, z, isCorner], i) => {
      const s = isCorner ? 1.14 : 1.0; // Reinforced oversized maximum-DNP corner anchor GND balls
      // Authentic surface-tension reflow gravity collapse (~0.84 vertical oblate ratio)
      dummy.scale.set(s, s * 0.84, s);
      dummy.position.set(x, 0, z);
      dummy.updateMatrix();
      bgaInst.setMatrixAt(i, dummy.matrix);

      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(s, 1, s);
      dummy.position.set(x, 0.52, z);
      dummy.updateMatrix();
      imcTopInst.setMatrixAt(i, dummy.matrix);

      dummy.rotation.set(Math.PI, 0, 0);
      dummy.scale.set(s, 1, s);
      dummy.position.set(x, -0.52, z);
      dummy.updateMatrix();
      imcBotInst.setMatrixAt(i, dummy.matrix);
      dummy.rotation.set(0, 0, 0);
    });
    for (const im of [bgaInst, imcTopInst, imcBotInst]) {
      im.instanceMatrix.needsUpdate = true;
      im.userData.noEdges = true;
    }
    g.add(bgaInst, imcTopInst, imcBotInst);

    // Gleaming gold A1 depopulation corner index triangle marking Pin-1 at (-13.5, -13.5)
    const a1Shape = new THREE.Shape();
    a1Shape.moveTo(0, 0);
    a1Shape.lineTo(1.25, 0);
    a1Shape.lineTo(0, -1.25);
    a1Shape.closePath();
    const a1Geo = extrudeHiRes(a1Shape, 0.16, 0.02, 0.02, 1, 6);
    a1Geo.rotateX(-Math.PI / 2);
    const a1Key = new THREE.Mesh(a1Geo, mats.goldPlating);
    a1Key.position.set(-14.0, 0.44, -14.0);
    a1Key.userData.noEdges = true;
    g.add(a1Key);

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

    // Dedicated SY-1122 4-phase VRM heavy-copper PDN PCB mapped with bespoke silkscreened PDN texture!
    const pdnGeo = extrudeHiRes(createRoundedRectShape(11.6, 26.0, 1.1), 0.85, 0.08, 0.08, 2, 18);
    pdnGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(pdnGeo, 11.6, 26.0, 'xz');
    const pdnPad = new THREE.Mesh(pdnGeo, u.bionzPdnPcb);
    g.add(pdnPad);

    // Heavy 2oz copper VDD_CORE 0.75V output busbar & PGND return pour + 4 SW1-SW4 phase-node copper islands
    const vddBar = new THREE.Mesh(createChamferedBoxGeo(1.10, 0.14, 21.4, 0.10, 0.02, 'y'), mats.copperHeatSpreader);
    vddBar.position.set(4.85, 0.48, -0.6);
    vddBar.userData.noEdges = true;
    const pgndBar = new THREE.Mesh(createChamferedBoxGeo(0.95, 0.14, 21.4, 0.10, 0.02, 'y'), mats.goldPlating);
    pgndBar.position.set(-4.92, 0.48, -0.6);
    pgndBar.userData.noEdges = true;
    g.add(vddBar, pgndBar);

    for (let ph = 0; ph < 4; ph++) {
      const swIsland = new THREE.Mesh(
        createChamferedBoxGeo(2.80, 0.08, 2.35, 0.10, 0.015, 'y'),
        mats.copperHybridBond
      );
      swIsland.position.set(1.75, 0.455, -9.2 + ph * 4.2);
      swIsland.userData.noEdges = true;
      g.add(swIsland);
    }

    const thViaGeo = hiResCyl(0.15, 0.15, 0.22, 8);
    const thViaInst = new THREE.InstancedMesh(thViaGeo, mats.goldPlating, 20);
    const dmTv = new THREE.Object3D();
    for (let k = 0; k < 10; k++) {
      dmTv.position.set(4.85, 0.52, -9.8 + k * 2.0);
      dmTv.updateMatrix();
      thViaInst.setMatrixAt(k, dmTv.matrix);
      dmTv.position.set(-4.92, 0.52, -9.8 + k * 2.0);
      dmTv.updateMatrix();
      thViaInst.setMatrixAt(10 + k, dmTv.matrix);
    }
    thViaInst.instanceMatrix.needsUpdate = true;
    thViaInst.userData.noEdges = true;
    g.add(thViaInst);

    // Multi-phase QFN-48 Sony custom camera SoC PMIC (CXD5702GG) cleanly separated from R47 buck inductor column!
    const pmic = buildChipPackage({
      w: 5.1,
      d: 5.1,
      h: 1.16,
      style: 'qfn',
      pinsPerSide: 12,
      bodyMat: u.bionzEmcSilica,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzPmicIc,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    pmic.position.set(-1.95, 1.01, -6.2);
    g.add(pmic);

    // 4 Murata DFE252012F-R47M molded metal-composite shielded 0.47uH buck inductors (R47 laser top + L-terminals!)
    for (let i = 0; i < 4; i++) {
      const ind = buildMetalAlloyInductor(
        2.88,
        1.52,
        u.bionzInductorR47,
        mats.silverElectrode,
        mats.goldPlating
      );
      ind.position.set(2.68, 1.22, -9.2 + i * 4.2);
      g.add(ind);
    }

    // 2 authentic matte-black Panasonic POSCAP conductive-polymer tantalum capacitors (white + bar, "330 e8 2R5" & J-leads!)
    for (const tz of [6.4, 10.0]) {
      const poscap = buildPoscapPolymerCap(
        4.6,
        2.5,
        1.15,
        u.bionzEmcSilica,
        u.bionzPoscapTop,
        mats.silverElectrode,
        u.bionzSac305Solder,
        mats.goldPlating
      );
      poscap.position.set(-1.55, 1.04, tz);
      g.add(poscap);
    }

    // 6x 0201 decoupling MLCCs neatly placed along input/output rails + 2x 4-terminal R010 Kelvin current-sense shunts
    for (const [cx, cz] of [
      [-3.55, -10.35],
      [-1.95, -10.35],
      [-0.35, -10.35],
      [-3.75, -1.85],
      [-3.75, 0.35],
      [-3.75, 2.55],
    ]) {
      const cap = buildSmdPassive(1.15, 0.60, 0.46, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(cx, 0.67, cz);
      g.add(cap);
    }
    for (const sz of [1.8, 3.8]) {
      const shunt = buildSmdPassive(1.65, 0.88, 0.44, mats.matteBlackAnodized, mats.silverElectrode, 'y', mats.goldPlating);
      shunt.position.set(-1.45, 0.66, sz);
      // Paired Kelvin differential sense taps flanking R010 shunt
      for (const kx of [-0.42, 0.42]) {
        const kTap = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.36), mats.goldPlating);
        kTap.position.set(-1.45 + kx, 0.46, sz + 0.56);
        kTap.userData.noEdges = true;
        g.add(kTap);
      }
      g.add(shunt);
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
  // XR38. Ultra-Low-Jitter 24.000 MHz Hermetic Gold-Lid TCXO Reference Oscillator
  // =========================================================================
  {
    const g = new THREE.Group();

    // Isolated 24.000 MHz TCXO clock-island PCB mapped with bespoke GND guard-moat clock PCB texture!
    const carrierGeo = extrudeHiRes(createRoundedRectShape(7.4, 5.8, 0.65), 0.55, 0.06, 0.06, 2, 16);
    carrierGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(carrierGeo, 7.4, 5.8, 'xz');
    const carrier = new THREE.Mesh(carrierGeo, u.bionzTcxoPcb);
    g.add(carrier);

    // 360-degree guard-via fence isolating 24.000 MHz reference clock from digital noise
    const gViaGeo = hiResCyl(0.14, 0.14, 0.60, 8);
    const gvCoords: Array<[number, number]> = [];
    for (let x = -3.1; x <= 3.11; x += 1.03) {
      gvCoords.push([x, -2.45], [x, 2.45]);
    }
    for (let z = -1.6; z <= 1.61; z += 1.05) {
      gvCoords.push([-3.25, z], [3.25, z]);
    }
    const gvInst = new THREE.InstancedMesh(gViaGeo, mats.goldPlating, gvCoords.length);
    const dmGv = new THREE.Object3D();
    gvCoords.forEach(([x, z], idx) => {
      dmGv.position.set(x, 0.02, z);
      dmGv.updateMatrix();
      gvInst.setMatrixAt(idx, dmGv.matrix);
    });
    gvInst.instanceMatrix.needsUpdate = true;
    gvInst.userData.noEdges = true;
    g.add(gvInst);

    // Epson TG2520SMN / Kyocera KT2520 multi-layer white Al2O3 ceramic base + brazed Kovar seal ring
    const cerBase = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 0.62, 3.6, 0.25, 0.05, 'y'),
      mats.ceramicAlumina
    );
    cerBase.position.y = 0.58;
    const sealRing = makeHiResHorizPlate(
      createFrameShape(5.04, 3.44, 0.22, 4.48, 2.88, 0.16),
      0.16,
      mats.kovarSeal,
      0.02,
      1,
      14
    );
    sealRing.position.y = 0.94;
    sealRing.userData.noEdges = true;

    // Seam-welded gold-plated Kovar hermetic lid planar-mapped with "24.000 TCXO" texture + raised double-pass weld rim!
    const goldLidGeo = createChamferedBoxGeo(4.82, 0.58, 3.22, 0.20, 0.05, 'y');
    const goldLid = new THREE.Mesh(goldLidGeo, u.bionzTcxoGoldLid);
    goldLid.position.y = 1.24;
    const weldRim = makeHiResHorizPlate(
      createFrameShape(4.80, 3.20, 0.20, 4.46, 2.86, 0.15),
      0.06,
      mats.goldPlating,
      0.015,
      1,
      14
    );
    weldRim.position.y = 1.53;
    weldRim.userData.noEdges = true;

    // 4 true concave semicircular gold-plated corner castellations + glossy SAC305 fillets stepping onto ENIG pads!
    for (const sx of [-2.48, 2.48]) {
      for (const sz of [-1.58, 1.58]) {
        const castOuter = new THREE.Mesh(hiResCyl(0.40, 0.42, 0.64, 14), mats.goldPlating);
        castOuter.position.set(sx, 0.56, sz);
        castOuter.userData.noEdges = true;
        // Concave semicircular recess flute carved vertically down each ceramic corner castellation
        const castFlute = new THREE.Mesh(hiResCyl(0.20, 0.20, 0.68, 10), mats.copperHybridBond);
        castFlute.position.set(sx + Math.sign(sx) * 0.15, 0.56, sz + Math.sign(sz) * 0.12);
        castFlute.userData.noEdges = true;
        const fillet = new THREE.Mesh(hiResCyl(0.24, 0.58, 0.36, 12), u.bionzSac305Solder);
        fillet.position.set(sx + Math.sign(sx) * 0.18, 0.38, sz + Math.sign(sz) * 0.12);
        fillet.userData.noEdges = true;
        const landPad = new THREE.Mesh(new THREE.BoxGeometry(1.10, 0.06, 0.92), mats.goldPlating);
        landPad.position.set(sx + Math.sign(sx) * 0.12, 0.29, sz + Math.sign(sz) * 0.08);
        landPad.userData.noEdges = true;
        g.add(castOuter, castFlute, fillet, landPad);
      }
    }

    // Twin C0G/NP0 0201 bypass capacitors + 50-ohm series clock damping resistor + coplanar gold CLK_OUT microstrip
    for (const cx of [-1.85, 1.85]) {
      const cap = buildSmdPassive(1.1, 0.58, 0.44, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(cx, 0.50, 2.18);
      g.add(cap);
    }
    const dampRes = buildSmdPassive(1.05, 0.54, 0.40, mats.matteBlackAnodized, mats.silverElectrode, 'y');
    dampRes.position.set(0, 0.48, 2.18);
    const clkTrace = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, 1.15), mats.goldPlating);
    clkTrace.position.set(0, 0.30, 1.85);
    clkTrace.userData.noEdges = true;
    g.add(cerBase, sealRing, goldLid, weldRim, dampRes, clkTrace);

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

    // Bespoke 256Mb Octal-SPI 16-SOP length-matched NOR Flash PCB
    const carrierGeo = extrudeHiRes(createRoundedRectShape(9.4, 7.6, 0.7), 0.58, 0.06, 0.06, 2, 16);
    carrierGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(carrierGeo, 9.4, 7.6, 'xz');
    const carrier = new THREE.Mesh(carrierGeo, u.bionzNorPcb);
    g.add(carrier);

    // 8 matched-length Octal-SPI (D0-D7 / SCLK / CS#) copper microstrips with subtle skew-matching jogs & ENIG vias
    for (let i = 0; i < 8; i++) {
      const lx = -3.0 + i * 0.70;
      const trMat = i % 2 === 0 ? mats.copperHybridBond : mats.goldPlating;
      const tr = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.07, 6.5), trMat);
      tr.position.set(lx, 0.31, 0);
      tr.userData.noEdges = true;
      const via = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.10, 8), mats.goldPlating);
      via.position.set(lx, 0.32, i % 2 === 0 ? -3.28 : 3.28);
      via.userData.noEdges = true;
      g.add(tr, via);
    }

    // REAL-WORLD FIX: Authentic 16-pin SOP Macronix MX25UM25645GMI00 (8 gull-wing legs per side = exact 16 pins!)
    const norFlash = buildChipPackage({
      w: 6.4,
      d: 4.6,
      h: 1.05,
      style: 'soic',
      pinsPerSide: 8,
      bodyMat: u.bionzEmcSilica,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzNorFlashIc,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    norFlash.position.set(-0.55, 0.85, 0);
    g.add(norFlash);

    // Authentic Pin-1 longitudinal chamfered polarity bevel strip along Pin 1-8 edge + 16 ENIG land pads & SAC305 fillets!
    const pin1Bevel = new THREE.Mesh(new THREE.BoxGeometry(6.1, 0.14, 0.24), mats.matteBlackAnodized);
    pin1Bevel.position.set(-0.55, 1.32, -2.14);
    pin1Bevel.rotation.x = 0.45;
    pin1Bevel.userData.noEdges = true;
    g.add(pin1Bevel);

    const spanPin = 6.4 * 0.72;
    const stepPin = spanPin / 7;
    for (let i = 0; i < 8; i++) {
      const px = -0.55 - spanPin * 0.5 + i * stepPin;
      for (const s of [-1, 1]) {
        const land = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.84), mats.goldPlating);
        land.position.set(px, 0.31, s * 2.68);
        land.userData.noEdges = true;
        const fillet = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.14, 0.46), u.bionzSac305Solder);
        fillet.position.set(px, 0.39, s * 2.74);
        fillet.userData.noEdges = true;
        g.add(land, fillet);
      }
    }

    // 100nF 0201 VCC bypass MLCC + 3x CS#/RESET#/WP# pull-up & series damping resistors
    const cap = buildSmdPassive(1.22, 0.64, 0.48, mats.smdCeramic, mats.silverElectrode, 'y');
    cap.position.set(3.55, 0.54, -2.2);
    g.add(cap);
    for (let i = 0; i < 3; i++) {
      const res = buildSmdPassive(1.10, 0.54, 0.42, mats.matteBlackAnodized, mats.silverElectrode, 'y');
      res.position.set(3.55, 0.52, -0.4 + i * 1.35);
      g.add(res);
    }

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

    // Authentic Sony OEM "500490202 MB GRAPHITE SHEET TOP A 5800" mapped with bespoke P/N pyrolytic graphite texture!
    const contactGeo = createChamferedBoxGeo(PKG_W + 2.4, 0.42, 7.6, 1.0, 0.06, 'y');
    const contactBar = new THREE.Mesh(contactGeo, u.bionzSigmaGraphite);
    contactBar.position.set(0, 0, -PKG_W * 0.5 - 1.2);

    // Transparent amber polyimide/PET protective edge-sealing border preventing conductive graphite flake shedding
    const petEdgeSeal = makeHiResHorizPlate(
      createFrameShape(PKG_W + 2.85, 8.05, 1.15, PKG_W + 1.85, 7.05, 0.88),
      0.46,
      mats.mylarInsulatorFilm,
      0.04,
      1,
      18
    );
    petEdgeSeal.position.set(0, 0, -PKG_W * 0.5 - 1.2);
    petEdgeSeal.userData.noEdges = true;

    // Pink diamond-waffle compliant silicone thermal pad (TIM2) laminated on underside of graphite contact bar!
    const tim2Geo = createChamferedBoxGeo(PKG_W - 0.6, 0.22, 5.4, 0.6, 0.04, 'y');
    applyPlanarUVs(tim2Geo, PKG_W - 0.6, 5.4, 'xz-bottom');
    const tim2Pad = new THREE.Mesh(tim2Geo, u.sensorTimSiliconeWaffle);
    tim2Pad.position.set(0, -0.29, -PKG_W * 0.5 - 1.2);
    tim2Pad.userData.noEdges = true;

    // Continuous solid closed 3D-extruded Σ-shaped double-fold flexible thermal hinge (100% solid 360°)
    const spine2D = new THREE.SplineCurve([
      new THREE.Vector2(-PKG_W * 0.5 - 4.2, 0.0),
      new THREE.Vector2(-PKG_W * 0.5 - 7.8, 1.55),
      new THREE.Vector2(-PKG_W * 0.5 - 5.2, 3.35),
      new THREE.Vector2(-PKG_W * 0.5 - 8.6, 5.15),
    ]);
    const sampled = spine2D.getPoints(32);
    const halfT = 0.24;
    const upper: THREE.Vector2[] = [];
    const lower: THREE.Vector2[] = [];
    for (let i = 0; i < sampled.length; i++) {
      const pPrev = sampled[Math.max(0, i - 1)];
      const pNext = sampled[Math.min(sampled.length - 1, i + 1)];
      const tx = pNext.x - pPrev.x;
      const ty = pNext.y - pPrev.y;
      const len = Math.hypot(tx, ty) || 1;
      const nx = -ty / len;
      const ny = tx / len;
      upper.push(new THREE.Vector2(sampled[i].x + nx * halfT, sampled[i].y + ny * halfT));
      lower.push(new THREE.Vector2(sampled[i].x - nx * halfT, sampled[i].y - ny * halfT));
    }
    const sigmaShape = new THREE.Shape();
    sigmaShape.moveTo(upper[0].x, upper[0].y);
    for (let i = 1; i < upper.length; i++) sigmaShape.lineTo(upper[i].x, upper[i].y);
    for (let i = lower.length - 1; i >= 0; i--) sigmaShape.lineTo(lower[i].x, lower[i].y);
    sigmaShape.closePath();

    const sigmaGeo = extrudeHiRes(sigmaShape, PKG_W - 1.6, 0.06, 0.06, 2, 16);
    sigmaGeo.rotateY(-Math.PI / 2);
    applyBoxUVs(sigmaGeo, 14.0);
    const sigmaFold = new THREE.Mesh(sigmaGeo, u.sensorPyroGraphite);

    // Laminated C1100 copper foil thermal booster core sandwiched beneath graphite top layer (gleaming along laminated edge!)
    const cuRibbon = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W + 2.55, 0.14, 7.2, 0.9, 0.02, 'y'),
      u.cfeCopperThermal
    );
    cuRibbon.position.set(0, -0.18, -PKG_W * 0.5 - 1.2);
    cuRibbon.userData.noEdges = true;

    const deck = new THREE.Group();
    deck.position.y = 0.26;
    deck.add(contactBar, petEdgeSeal, tim2Pad, sigmaFold, cuRibbon);

    // Twin stamped SUS301 spring-steel press clips with stiffening ribs, folded locator tabs, serrated washers & M1.2 Ti screws!
    for (const sx of [-11.5, 11.5]) {
      const clip = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.56, 6.6, 0.4, 0.06, 'y'),
        mats.stainlessMachined
      );
      clip.position.set(sx, 0.36, -PKG_W * 0.5 - 1.0);
      // Folded vertical anti-rotation locator tab hugging front edge of graphite bar
      const locTab = new THREE.Mesh(
        createChamferedBoxGeo(1.6, 0.88, 0.28, 0.08, 0.02, 'y'),
        mats.stainlessMachined
      );
      locTab.position.set(sx, 0.14, -PKG_W * 0.5 + 2.38);
      locTab.userData.noEdges = true;
      // Embossed twin stiffening ribs flanking the screw boss
      for (const rz of [-1.8, 1.8]) {
        const rib = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.16, 0.52, 0.1, 0.03, 'y'), mats.stainlessMachined);
        rib.position.set(sx, 0.68, -PKG_W * 0.5 - 1.0 + rz);
        rib.userData.noEdges = true;
        deck.add(rib);
      }
      // Serrated locking spring washer + M1.2 Phillips titanium clamping screw
      const washer = new THREE.Mesh(hiResCyl(1.12, 1.12, 0.11, 16), mats.stainlessMachined);
      washer.position.set(sx, 0.66, -PKG_W * 0.5 - 1.0);
      washer.userData.noEdges = true;
      const lockRing = new THREE.Mesh(hiResTorus(0.96, 0.06, 6, 12), mats.titaniumRivet);
      lockRing.rotation.x = Math.PI / 2;
      lockRing.position.set(sx, 0.72, -PKG_W * 0.5 - 1.0);
      lockRing.userData.noEdges = true;

      const scr = buildPhillipsScrew(0.76, 0.38, 0.34, 0.9, mats.titaniumRivet, mats.matteBlackAnodized, mats.stainlessMachined);
      scr.rotation.x = Math.PI;
      scr.position.set(sx, 0.74, -PKG_W * 0.5 - 1.0);
      deck.add(clip, locTab, washer, lockRing, scr);
    }
    g.add(deck);

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

    // Bespoke 8-lane SLVS-EC 2.0 100-ohm differential microstrip bus PCB
    const busGeo = extrudeHiRes(createRoundedRectShape(24.0, 9.6, 0.9), 0.72, 0.06, 0.06, 2, 18);
    busGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(busGeo, 24.0, 9.6, 'xz');
    const busDeck = new THREE.Mesh(busGeo, u.bionzSlvsBusPcb);
    g.add(busDeck);

    // 8 matched-length 100-ohm SLVS-EC 2.0 differential lane pairs + 3D serpentine skew-matching meanders + 16x 0201 AC caps!
    const fenceCoords: Array<[number, number]> = [];
    for (let lane = 0; lane < 8; lane++) {
      const lx = -9.45 + lane * 2.7;
      for (const pol of [-0.36, 0.36]) {
        const trace = new THREE.Mesh(
          new THREE.BoxGeometry(0.22, 0.10, 7.6),
          pol < 0 ? mats.copperHybridBond : mats.goldPlating
        );
        trace.position.set(lx + pol, 0.42, 0.1);
        trace.userData.noEdges = true;
        g.add(trace);

        // Authentic serpentine phase-matching trombone meander jog on outer lanes!
        if (lane === 0 || lane === 1 || lane === 6 || lane === 7) {
          for (let m = 0; m < 3; m++) {
            const jog = new THREE.Mesh(
              new THREE.BoxGeometry(0.56, 0.09, 0.16),
              pol < 0 ? mats.copperHybridBond : mats.goldPlating
            );
            jog.position.set(lx + pol + (m % 2 === 0 ? 0.14 : -0.14), 0.43, 0.25 + m * 0.46);
            jog.userData.noEdges = true;
            g.add(jog);
          }
        }

        // 0201 ultra-low-ESL 100nF AC-coupling MLCC (staggered slightly for real high-speed crosstalk reduction)
        const acCap = buildSmdPassive(0.92, 0.46, 0.40, mats.smdCeramic, mats.silverElectrode, 'y');
        acCap.rotation.y = Math.PI / 2;
        acCap.position.set(lx + pol, 0.58, -1.65 + (lane % 2 === 0 ? 0 : 0.24));
        g.add(acCap);
      }

      // Coplanar waveguide GND guard-via stitching row between adjacent differential pairs
      if (lane < 7) {
        const gx = lx + 1.35;
        for (const gz of [-3.4, -1.8, -0.2, 1.2]) {
          fenceCoords.push([gx, gz]);
        }
      }
    }
    const viaFenceGeo = hiResCyl(0.13, 0.13, 0.78, 8);
    const viaFenceInst = new THREE.InstancedMesh(viaFenceGeo, mats.goldPlating, fenceCoords.length);
    const dmVf = new THREE.Object3D();
    fenceCoords.forEach(([x, z], idx) => {
      dmVf.position.set(x, 0.04, z);
      dmVf.updateMatrix();
      viaFenceInst.setMatrixAt(idx, dmVf.matrix);
    });
    viaFenceInst.instanceMatrix.needsUpdate = true;
    viaFenceInst.userData.noEdges = true;
    g.add(viaFenceInst);

    // 48-pin Hirose BM28/DF40-grade shielded micro-B2B sensor-ribbon receptacle:
    // Chamfered LCP housing + central alignment key island + wrap-around stainless EMI armor + spring-lock detents!
    const b2bBody = new THREE.Mesh(
      createChamferedBoxGeo(21.6, 1.15, 2.2, 0.25, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    b2bBody.position.set(0, 0.92, 3.15);
    const b2bKeyIsland = new THREE.Mesh(
      createChamferedBoxGeo(19.8, 0.56, 0.36, 0.08, 0.03, 'y'),
      mats.matteBlackAnodized
    );
    b2bKeyIsland.position.set(0, 1.44, 3.15);
    b2bKeyIsland.userData.noEdges = true;

    const b2bShield = makeHiResHorizPlate(
      createFrameShape(22.3, 2.65, 0.35, 20.6, 1.4, 0.2),
      0.56,
      mats.stainlessMachined,
      0.04,
      1,
      14
    );
    b2bShield.position.set(0, 1.36, 3.15);
    // Side spring-lock detent cutouts on stainless EMI armor shell
    for (const dx of [-6.8, 0, 6.8]) {
      for (const dz of [1.84, 4.46]) {
        const detent = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.30, 0.10), mats.matteBlackAnodized);
        detent.position.set(dx, 1.32, dz);
        detent.userData.noEdges = true;
        g.add(detent);
      }
    }
    // 4 heavy ground-anchor hold-down solder brackets with SAC305 solder fillets gripping B2B ends
    for (const sx of [-11.05, 11.05]) {
      for (const sz of [2.35, 3.95]) {
        const anchor = new THREE.Mesh(createChamferedBoxGeo(0.65, 1.10, 0.58, 0.08, 0.02, 'y'), mats.stainlessMachined);
        anchor.position.set(sx, 0.92, sz);
        anchor.userData.noEdges = true;
        const holdFillet = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.20, 0.72), u.bionzSac305Solder);
        holdFillet.position.set(sx, 0.44, sz);
        holdFillet.userData.noEdges = true;
        g.add(anchor, holdFillet);
      }
    }

    // 48 gleaming dual-row curved gold micro-contact blades inside mating bay + 48 exterior gull-wing SMT solder tails!
    const pinGeo = new THREE.BoxGeometry(0.32, 0.26, 0.42);
    const tailGeo = new THREE.BoxGeometry(0.26, 0.12, 0.48);
    const pinInst = new THREE.InstancedMesh(pinGeo, mats.goldPlating, 48);
    const tailInst = new THREE.InstancedMesh(tailGeo, u.bionzSac305Solder, 48);
    const dmPin = new THREE.Object3D();
    let pi = 0;
    for (let k = 0; k < 24; k++) {
      const px = -9.75 + k * 0.848;
      for (const [pz, tz] of [
        [2.82, 1.84],
        [3.48, 4.46],
      ]) {
        dmPin.position.set(px, 1.48, pz);
        dmPin.updateMatrix();
        pinInst.setMatrixAt(pi, dmPin.matrix);
        dmPin.position.set(px, 0.42, tz);
        dmPin.updateMatrix();
        tailInst.setMatrixAt(pi, dmPin.matrix);
        pi++;
      }
    }
    pinInst.instanceMatrix.needsUpdate = true;
    tailInst.instanceMatrix.needsUpdate = true;
    pinInst.userData.noEdges = true;
    tailInst.userData.noEdges = true;

    // REAL-WORLD FIX: Twin authentic 4-electrode Murata DLM11SN ferrite differential common-mode chokes!
    for (const cx of [-10.8, 10.8]) {
      const choke = buildFourTermCommonModeChoke(
        1.42,
        1.06,
        0.68,
        mats.ferriteInductor,
        mats.goldPlating,
        mats.ceramicAlumina
      );
      choke.position.set(cx, 0.70, -2.85);
      g.add(choke);
    }
    g.add(b2bBody, b2bKeyIsland, b2bShield, pinInst, tailInst);

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
  // XR42. HDMI 2.1 / 48 Gbps FRL Retimer IC (TI TDP2004) & ±15 kV ESD Array (RClamp0524P)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Bespoke HDMI 2.1 48Gbps FRL flow-through carrier PCB
    const carrierGeo = extrudeHiRes(createRoundedRectShape(10.8, 13.8, 0.85), 0.68, 0.06, 0.06, 2, 18);
    carrierGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(carrierGeo, 10.8, 13.8, 'xz');
    const carrier = new THREE.Mesh(carrierGeo, u.bionzHdmiPcb);
    g.add(carrier);

    // 4 straight flow-through 100-ohm HDMI 2.1 FRL differential lane pairs (D0±, D1±, D2±, D3/CLK±)
    for (let ch = 0; ch < 4; ch++) {
      const hx = -3.3 + ch * 1.45;
      for (const pol of [-0.18, 0.18]) {
        const frlTrace = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.08, 11.8),
          pol < 0 ? mats.copperHybridBond : mats.goldPlating
        );
        frlTrace.position.set(hx + pol, 0.38, 0);
        frlTrace.userData.noEdges = true;
        g.add(frlTrace);
      }
    }

    // REAL-WORLD GEOMETRY FIX: Authentic 4:6 rectangular WQFN-40 TI TDP2004RNQ (12 long + 8 short = exact 40 pins!)
    const retimer = buildRectangularQfn({
      w: 4.4,
      d: 6.6,
      h: 0.96,
      pinsX: 8,
      pinsZ: 12,
      bodyMat: u.bionzEmcSilica,
      leadMat: mats.silverElectrode,
      solderMat: u.bionzSac305Solder,
      topAccentMat: u.bionzHdmiRetimerIc,
      pin1Mat: mats.goldPlating,
    });
    retimer.position.set(-1.1, 0.84, -1.8);

    // Twin authentic 2.5:1 Semtech RClamp0524P (SLP2510P8, "0524P" laser top) straddling FRL pairs D0/D1 & D2/D3!
    for (const ex of [-2.58, 0.32]) {
      const esd = buildChipPackage({
        w: 2.70,
        d: 1.16,
        h: 0.58,
        style: 'dfn',
        pinsPerSide: 5,
        bodyMat: u.bionzEmcSilica,
        leadMat: mats.goldPlating,
        topAccentMat: u.bionzEsdRclampIc,
        pin1Mat: mats.silverElectrode,
        axis: 'y',
      });
      esd.position.set(ex, 0.63, 4.05);
      // Central Pin-3/Pin-8 copper ground-return thermal via stitching flanking each RClamp0524P!
      for (const gz of [3.26, 4.84]) {
        const gVia = new THREE.Mesh(hiResCyl(0.15, 0.15, 0.12, 8), mats.goldPlating);
        gVia.position.set(ex, 0.39, gz);
        gVia.userData.noEdges = true;
        g.add(gVia);
      }
      g.add(esd);
    }

    // 8 differential FRL AC-coupling 0201 MLCCs + HDMI 5V current-limit SOT-23 load-switch IC!
    for (let i = 0; i < 4; i++) {
      const cap1 = buildSmdPassive(1.05, 0.52, 0.40, mats.smdCeramic, mats.silverElectrode, 'y');
      cap1.position.set(3.45, 0.54, -4.4 + i * 1.95);
      const cap2 = buildSmdPassive(1.00, 0.50, 0.38, mats.smdCeramic, mats.silverElectrode, 'y');
      cap2.position.set(-3.3 + i * 1.45, 0.53, 2.38);
      cap2.rotation.y = Math.PI / 2;
      g.add(cap1, cap2);
    }
    const loadSw = buildChipPackage({
      w: 2.0,
      d: 1.4,
      h: 0.58,
      style: 'sot23',
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      axis: 'y',
    });
    loadSw.position.set(3.40, 0.63, 5.15);
    g.add(retimer, loadSw);

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

    // Bespoke segmented VDD2H 1.05V / VDDQ 0.5V LPDDR5X Sub-PMIC PCB
    const subDeckGeo = extrudeHiRes(createRoundedRectShape(11.4, 10.6, 0.8), 0.68, 0.06, 0.06, 2, 18);
    subDeckGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(subDeckGeo, 11.4, 10.6, 'xz');
    const subDeck = new THREE.Mesh(subDeckGeo, u.bionzSubPmicPcb);
    g.add(subDeck);

    // Segmented isolated copper power islands for VDD2H (1.05V) and VDDQ (0.5V) with thermal via stitching!
    for (const [pz, pMat] of [
      [-2.4, mats.copperHeatSpreader],
      [2.4, mats.goldPlating],
    ] as Array<[number, THREE.Material]>) {
      const plane = new THREE.Mesh(createChamferedBoxGeo(4.4, 0.10, 3.8, 0.18, 0.02, 'y'), pMat);
      plane.position.set(2.85, 0.38, pz);
      plane.userData.noEdges = true;
      g.add(plane);
      for (const vx of [1.1, 4.6]) {
        for (const vz of [pz - 1.35, pz + 1.35]) {
          const tv = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.14, 8), mats.goldPlating);
          tv.position.set(vx, 0.42, vz);
          tv.userData.noEdges = true;
          g.add(tv);
        }
      }
    }

    // REAL-WORLD FIX: Authentic QFN-28 MPS MP5475 LPDDR5X dedicated sub-PMIC (bespoke u.bionzSubPmicIc laser top!)
    const subPmic = buildChipPackage({
      w: 4.8,
      d: 4.8,
      h: 0.94,
      style: 'qfn',
      pinsPerSide: 7,
      bodyMat: u.bionzEmcSilica,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzSubPmicIc,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    subPmic.position.set(-1.95, 0.82, -0.35);

    // REAL-WORLD FIX: Twin authentic Murata DFE252012F-R24M ("R24" 0.24uH 6.2A) shielded inductors (VDD2H & VDDQ)!
    for (const iz of [-2.4, 2.4]) {
      const ind = buildMetalAlloyInductor(
        2.65,
        1.18,
        u.bionzInductorR24,
        mats.silverElectrode,
        mats.goldPlating
      );
      ind.position.set(2.85, 0.98, iz);
      g.add(ind);
    }

    // 6 low-ESL 0201 decoupling MLCCs (4 VDDQ + 2 VDD2H) + 2 precision 1% feedback voltage-divider resistors
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(1.15, 0.60, 0.46, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(-3.75 + i * 1.9, 0.56, 3.85);
      g.add(cap);
    }
    for (const cx of [-4.65, 0.25]) {
      const cap2h = buildSmdPassive(1.10, 0.56, 0.44, mats.smdCeramic, mats.silverElectrode, 'y');
      cap2h.position.set(cx, 0.56, -3.95);
      g.add(cap2h);
    }
    for (let i = 0; i < 2; i++) {
      const fbRes = buildSmdPassive(1.05, 0.52, 0.40, mats.matteBlackAnodized, mats.silverElectrode, 'y');
      fbRes.position.set(-3.0 + i * 1.65, 0.54, -3.95);
      g.add(fbRes);
    }
    g.add(subPmic);

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
  // XR44. Multi-Zone On-Die Thermal Sense Diode Array & Kelvin Telemetry Ring
  // =========================================================================
  {
    const g = new THREE.Group();

    // Shielded differential Kelvin analog telemetry bus: twin gold sense rings flanked by inner/outer Cu GND guards!
    for (const [r, tube, mat] of [
      [7.02, 0.08, mats.copperHybridBond],
      [7.32, 0.11, mats.goldPlating],
      [7.58, 0.11, mats.goldPlating],
      [7.88, 0.08, mats.copperHybridBond],
    ] as Array<[number, number, THREE.Material]>) {
      const ring = new THREE.Mesh(hiResTorus(r, tube, 8, 36), mat);
      ring.rotation.x = Math.PI / 2;
      ring.userData.noEdges = true;
      g.add(ring);
    }

    // 6 common-centroid 3x3 substrate-PNP ΔV_BE bandgap thermal-sense diode macros over the 6 hottest IP zones!
    const diodeCoords: Array<[number, number]> = [
      [-6.9, -2.3], // AI NPU
      [-2.3, -2.3], // Quad ARM CPU
      [6.9, -2.3], // 8K HEVC Codec
      [-2.3, -6.9], // 16-bit RAW ISP
      [2.3, 2.3], // LPDDR5X PHY
      [6.9, 6.9], // PLL / DVFS / Cetus boundary
    ];
    for (const [dx, dz] of diodeCoords) {
      const pod = new THREE.Mesh(
        createChamferedBoxGeo(1.32, 0.34, 1.32, 0.16, 0.04, 'y'),
        mats.cinnabarAnodized
      );
      pod.position.set(dx, 0.04, dz);

      // Common-centroid 3x3 concentric Emitter-Base-Collector guard-ring PNP diode matrix + twin Kelvin micro-vias
      const guardHalo = new THREE.Mesh(hiResTorus(0.46, 0.06, 6, 16), mats.goldPlating);
      guardHalo.rotation.x = Math.PI / 2;
      guardHalo.position.set(dx, 0.22, dz);
      guardHalo.userData.noEdges = true;
      const pnDot = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.44, 14), mats.goldPlating);
      pnDot.position.set(dx, 0.08, dz);
      pnDot.userData.noEdges = true;
      for (const kx of [-0.36, 0.36]) {
        const kVia = new THREE.Mesh(hiResCyl(0.09, 0.09, 0.38, 8), mats.copperHybridBond);
        kVia.position.set(dx + kx, 0.08, dz + 0.38);
        kVia.userData.noEdges = true;
        g.add(kVia);
      }

      // Radial Kelvin sense lead bridging diode macro cleanly to the telemetry bus ring
      const dist = Math.hypot(dx, dz);
      const ang = Math.atan2(dz, dx);
      const rMid = (dist + 7.45) * 0.5;
      const rLen = Math.abs(7.45 - dist);
      if (rLen > 0.25) {
        const lead = new THREE.Mesh(new THREE.BoxGeometry(rLen, 0.08, 0.12), mats.goldPlating);
        lead.position.set(Math.cos(ang) * rMid, 0.04, Math.sin(ang) * rMid);
        lead.rotation.y = -ang;
        lead.userData.noEdges = true;
        g.add(lead);
      }

      g.add(pod, guardHalo, pnDot);
    }

    // Central ΔΣ Thermal ADC & Bandgap Reference readout node near XR25 (+X, +Z)
    const adcHub = new THREE.Mesh(createChamferedBoxGeo(1.75, 0.38, 1.35, 0.14, 0.04, 'y'), mats.goldPlating);
    adcHub.position.set(5.2, 0.08, 5.2);
    g.add(adcHub);

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

    // 4 authentic Henkel Loctite 3515 / ALPHA HiTech concave-sloped L-shaped epoxy corner edge-bond stakes!
    // Positioned precisely gripping all 4 maximum-DNP corners of the 32x32 FC-BGA package!
    const corners: Array<[number, number, number]> = [
      [1, 1, 0],
      [-1, 1, -Math.PI / 2],
      [-1, -1, Math.PI],
      [1, -1, Math.PI / 2],
    ];
    for (const [sx, sz, rotY] of corners) {
      const stake = buildCornerEdgeBondStake(5.4, 2.25, 1.75, u.bionzEmcSilica);
      stake.rotation.y = rotY;
      stake.position.set(sx * 16.02, 0, sz * 16.02);
      g.add(stake);
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
  // XR46. Factory ATE / JTAG / SWD Micro-Probe Test Pads & OTP Security eFuse Bank
  // =========================================================================
  {
    const g = new THREE.Group();

    // Bespoke Sony Factory ATE / JTAG / SWD silkscreened probe-pad & OTP eFuse PCB!
    const padDeckGeo = extrudeHiRes(createRoundedRectShape(14.2, 7.6, 0.75), 0.62, 0.06, 0.06, 2, 16);
    padDeckGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(padDeckGeo, 14.2, 7.6, 'xz');
    const padDeck = new THREE.Mesh(padDeckGeo, u.bionzAteJtagPcb);
    g.add(padDeck);

    // 2×8 thick-ENIG gold factory ATE/JTAG/SWD pogo-pin micro-probe test pads:
    // Pin-1 (c=0, r=0) is square VTREF; EVERY pad carries authentic 4-point radial crown-tip pogo-pin witness dimples!
    const crownPrickCoords: Array<[number, number]> = [];
    for (let c = 0; c < 8; c++) {
      const px = -5.6 + c * 1.6;
      // Routed copper trace linking JTAG pad column down toward OTP eFuse & boot-strap bank
      const trace = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.06, 3.6),
        c % 2 === 0 ? mats.copperHybridBond : mats.goldPlating
      );
      trace.position.set(px, 0.32, 0.25);
      trace.userData.noEdges = true;
      g.add(trace);

      for (let r = 0; r < 2; r++) {
        const pz = -1.6 + r * 1.9;
        const pad =
          c === 0 && r === 0
            ? new THREE.Mesh(createChamferedBoxGeo(1.06, 0.16, 1.06, 0.08, 0.02, 'y'), mats.goldPlating)
            : new THREE.Mesh(hiResCyl(0.54, 0.54, 0.16, 16), mats.goldPlating);
        pad.position.set(px, 0.38, pz);
        pad.userData.noEdges = true;
        g.add(pad);

        // 4 microscopic radial crown-tip pogo-pin witness prick indentations at 90-degree intervals!
        for (let k = 0; k < 4; k++) {
          const ang = (k * Math.PI) / 2 + Math.PI / 4;
          crownPrickCoords.push([px + Math.cos(ang) * 0.21, pz + Math.sin(ang) * 0.21]);
        }
      }
    }

    // Instanced 64 microscopic 4-point crown-tip pogo witness pricks (dark crater + raised displaced copper rim)
    const prickGeo = hiResCyl(0.055, 0.035, 0.05, 8);
    const prickRimGeo = hiResTorus(0.07, 0.02, 5, 8);
    const prickInst = new THREE.InstancedMesh(prickGeo, mats.matteBlackAnodized, crownPrickCoords.length);
    const prickRimInst = new THREE.InstancedMesh(prickRimGeo, mats.copperHybridBond, crownPrickCoords.length);
    const dmPk = new THREE.Object3D();
    const dmPr = new THREE.Object3D();
    dmPr.rotation.x = Math.PI / 2;
    crownPrickCoords.forEach(([kx, kz], idx) => {
      dmPk.position.set(kx, 0.465, kz);
      dmPk.updateMatrix();
      prickInst.setMatrixAt(idx, dmPk.matrix);
      dmPr.position.set(kx, 0.468, kz);
      dmPr.updateMatrix();
      prickRimInst.setMatrixAt(idx, dmPr.matrix);
    });
    prickInst.instanceMatrix.needsUpdate = true;
    prickRimInst.instanceMatrix.needsUpdate = true;
    prickInst.userData.noEdges = true;
    prickRimInst.userData.noEdges = true;
    g.add(prickInst, prickRimInst);

    // U901 OTP Security eFuse Blow-Link Micro-Die: recessed quartz passivation window with 16 fuse links (8 intact + 8 blown!)
    const efuseIc = buildChipPackage({
      w: 4.8,
      d: 2.1,
      h: 0.58,
      style: 'dfn',
      pinsPerSide: 6,
      bodyMat: u.bionzEmcSilica,
      leadMat: mats.goldPlating,
      pin1Mat: mats.cinnabarAnodized,
      axis: 'y',
    });
    efuseIc.position.set(-3.4, 0.58, 2.35);
    g.add(efuseIc);

    // Recessed gold guard bezel framing the exposed quartz passivation OTP eFuse window
    const winBezel = makeHiResHorizPlate(
      createFrameShape(4.06, 1.40, 0.08, 3.74, 1.12, 0.04),
      0.09,
      mats.goldPlating,
      0.015,
      1,
      8
    );
    winBezel.position.set(-3.4, 0.90, 2.35);
    winBezel.userData.noEdges = true;
    const fuseWin = new THREE.Mesh(new THREE.BoxGeometry(3.76, 0.08, 1.14), mats.siliconBulk);
    fuseWin.position.set(-3.4, 0.89, 2.35);
    fuseWin.userData.noEdges = true;
    g.add(winBezel, fuseWin);

    // 16 microscopic OTP eFuse links (left 8 intact gold links; right 8 permanently blown JTAG/SWD debug-lock craters!)
    for (let f = 0; f < 16; f++) {
      const fx = -5.06 + f * 0.221;
      const isBlown = f >= 8;
      if (isBlown) {
        const stubA = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.26), mats.goldPlating);
        stubA.position.set(fx, 0.94, 2.02);
        const stubB = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.26), mats.goldPlating);
        stubB.position.set(fx, 0.94, 2.68);
        const crater = new THREE.Mesh(hiResCyl(0.072, 0.072, 0.085, 8), mats.matteBlackAnodized);
        crater.position.set(fx, 0.935, 2.35);
        const splashHalo = new THREE.Mesh(hiResTorus(0.082, 0.022, 5, 8), mats.cinnabarAnodized);
        splashHalo.rotation.x = Math.PI / 2;
        splashHalo.position.set(fx, 0.94, 2.35);
        stubA.userData.noEdges = true;
        stubB.userData.noEdges = true;
        crater.userData.noEdges = true;
        splashHalo.userData.noEdges = true;
        g.add(stubA, stubB, crater, splashHalo);
      } else {
        const intact = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.88), mats.goldPlating);
        intact.position.set(fx, 0.94, 2.35);
        intact.userData.noEdges = true;
        g.add(intact);
      }
    }

    // 4x 0201 boot-mode configuration pull-up/pull-down strap resistors + 10nF NRST debounce MLCC
    for (let i = 0; i < 4; i++) {
      const strap = buildSmdPassive(1.05, 0.54, 0.42, mats.matteBlackAnodized, mats.silverElectrode, 'y');
      strap.position.set(0.65 + i * 1.48, 0.52, 2.35);
      g.add(strap);
    }
    const nrstCap = buildSmdPassive(0.95, 0.50, 0.40, mats.smdCeramic, mats.silverElectrode, 'y');
    nrstCap.position.set(6.25, 0.52, 2.35);
    g.add(nrstCap);

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
