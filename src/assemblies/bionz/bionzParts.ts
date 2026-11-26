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

/** Build an authentic octagonal multi-turn on-die planar copper spiral inductor (RF balun / LC-tank VCO) */
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

/** Build a realistic Murata DFE / TDK SPM molded metal-alloy powder shielded power inductor with laser R47 top */
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

    // Outer CNC-chamfered SUS/Ni-Cr sputtered EMI bezel frame rim
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

    // Exposed internal Cu conductive sputter sub-layer lip visible along laser-ablated perimeter moat!
    const cuSubRing = makeHiResHorizPlate(
      createFrameShape(PKG_W - 0.8, PKG_W - 0.8, 1.65, PKG_W - 1.55, PKG_W - 1.55, 1.35),
      0.14,
      mats.copperHybridBond,
      0.02,
      1,
      20
    );
    cuSubRing.position.y = 0.34;
    cuSubRing.userData.noEdges = true;
    g.add(cuSubRing);

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

    // Full-depth conformal EMI shield perimeter skirt + lower Cu sputter cross-section reveal band
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
      createFrameShape(PKG_W + 0.46, PKG_W + 0.46, 1.95, PKG_W - 0.58, PKG_W - 0.58, 1.55),
      0.24,
      mats.copperHeatSpreader,
      0.02,
      1,
      20
    );
    cuBottomReveal.position.y = -4.92;
    cuBottomReveal.userData.noEdges = true;
    g.add(emiSkirt, cuBottomReveal);

    // 24 precision-stamped EMI grounding spring-fingers with embossed contact dimples, kerf slits & solder tabs
    for (const [sx, sz, rotY] of [
      [0, PKG_W * 0.5 + 0.30, 0],
      [0, -PKG_W * 0.5 - 0.30, 0],
      [PKG_W * 0.5 + 0.30, 0, Math.PI / 2],
      [-PKG_W * 0.5 - 0.30, 0, Math.PI / 2],
    ] as Array<[number, number, number]>) {
      for (let i = -2.5; i <= 2.5; i += 1.0) {
        const finger = new THREE.Mesh(
          createChamferedBoxGeo(2.55, 1.48, 0.22, 0.06, 0.03, 'y'),
          mats.stainlessMachined
        );
        const dimple = new THREE.Mesh(hiResSphere(0.26, 10, 8), mats.silverElectrode);
        const tabFoot = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.16, 0.42), mats.goldPlating);
        const kerf = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.62, 0.28), mats.matteBlackAnodized);
        const along = i * 4.6;
        if (rotY === 0) {
          finger.position.set(along, -4.16, sz);
          dimple.position.set(along, -4.14, sz + Math.sign(sz) * 0.13);
          tabFoot.position.set(along, -4.92, sz - Math.sign(sz) * 0.08);
          kerf.position.set(along + 2.3, -4.16, sz);
        } else {
          finger.position.set(sx, -4.16, along);
          finger.rotation.y = rotY;
          dimple.position.set(sx + Math.sign(sx) * 0.13, -4.14, along);
          tabFoot.position.set(sx - Math.sign(sx) * 0.08, -4.92, along);
          tabFoot.rotation.y = rotY;
          kerf.position.set(sx, -4.16, along + 2.3);
          kerf.rotation.y = rotY;
        }
        finger.userData.noEdges = true;
        dimple.userData.noEdges = true;
        tabFoot.userData.noEdges = true;
        kerf.userData.noEdges = true;
        g.add(finger, dimple, tabFoot);
        if (i < 2.5) g.add(kerf);
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

    // CNC-chamfered 2-tier nickel-plated C1020 OFHC copper top deck with concentric flycut lapping texture
    const ihsTopGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 0.9, PKG_W - 0.9, 1.8), 1.05, 0.24, 0.22, 3, 24);
    ihsTopGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(ihsTopGeo, PKG_W - 0.9, PKG_W - 0.9, 'xz');
    const ihsTop = new THREE.Mesh(ihsTopGeo, u.bionzIhsNickelCu);
    g.add(ihsTop);

    // Subtle upper stepped thermal-contact crown pad catching studio highlights
    const crownPadGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 4.4, PKG_W - 4.4, 1.3), 0.22, 0.08, 0.06, 2, 20);
    crownPadGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(crownPadGeo, PKG_W - 4.4, PKG_W - 4.4, 'xz');
    const crownPad = new THREE.Mesh(crownPadGeo, u.bionzIhsNickelCu);
    crownPad.position.y = 0.56;
    g.add(crownPad);

    // Satin nickel-plated perimeter skirt flange with authentic epoxy lid-attach seal ring groove & breather vent!
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

    // Real FC-BGA IHS corner thermal-cure air-breather pressure-relief vent notch (prevents lid blow-out!)
    const ventSlot = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.52, 2.2), mats.matteBlackAnodized);
    ventSlot.position.set(PKG_W * 0.5 - 1.4, -1.66, PKG_W * 0.5 - 1.4);
    ventSlot.rotation.y = Math.PI / 4;
    ventSlot.userData.noEdges = true;
    g.add(ventSlot);

    // Primary stepped mirror-lapped C1020 OFHC copper thermal contact pedestal pressing down onto main die TIM1
    const pedestalGeo = extrudeHiRes(createRoundedRectShape(DIE_W + 2.0, DIE_W + 2.0, 1.0), 0.78, 0.14, 0.14, 2, 20);
    pedestalGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(pedestalGeo, DIE_W + 2.0, DIE_W + 2.0, 'xz');
    const pedestal = new THREE.Mesh(pedestalGeo, u.cfeCopperThermal);
    pedestal.position.y = -0.84;
    g.add(pedestal);

    // Secondary stepped OFHC copper contact boss reaching down to the CXD90058 Cetus companion chiplet (+X)!
    const cetusBoss = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.68, 12.6, 0.45, 0.10, 'y'),
      mats.vaporChamberCopper
    );
    cetusBoss.position.set(12.2, -0.82, 0);
    cetusBoss.userData.noEdges = true;
    g.add(cetusBoss);

    // 4 machined corner stress-relief datum bores & gold registration rings in IHS skirt
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
      g.add(relief, datumRim);
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

    // Bottom Ti/Ni/Ag/Au Backside Die Metallization (BSM) wetting flash plate
    const bsmPlate = makeHiResHorizPlate(
      createRoundedRectShape(DIE_W + 0.6, DIE_W + 0.6, 0.7),
      0.14,
      mats.goldPlating,
      0.03,
      1,
      18
    );
    bsmPlate.position.y = -0.22;
    bsmPlate.userData.noEdges = true;
    g.add(bsmPlate);

    // Coined & vacuum-reflowed pure Indium solder TIM1 sheet mapped with ductile polycrystalline STIM texture
    const timGeo = extrudeHiRes(createRoundedRectShape(DIE_W + 1.4, DIE_W + 1.4, 0.8), 0.36, 0.08, 0.08, 2, 20);
    timGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(timGeo, DIE_W + 1.4, DIE_W + 1.4, 'xz');
    const timSheet = new THREE.Mesh(timGeo, u.bionzIndiumStim);
    g.add(timSheet);

    // Golden AuIn2 intermetallic solder-wetting perimeter meniscus halo around reflowed Indium pad
    const auInRim = makeHiResHorizPlate(
      createFrameShape(DIE_W + 1.65, DIE_W + 1.65, 0.88, DIE_W + 0.45, DIE_W + 0.45, 0.68),
      0.28,
      mats.goldPlating,
      0.06,
      2,
      18
    );
    auInRim.position.y = -0.02;
    auInRim.userData.noEdges = true;
    g.add(auInRim);

    // Compliant high-k elastomer thermal core + 4x4 vacuum-reflowed void-free coined Indium wetting islands
    const innerPad = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 1.6, 0.42, DIE_W - 1.6, 0.5, 0.06, 'y'),
      mats.thermalPadPink
    );
    innerPad.position.y = 0.04;
    g.add(innerPad);

    const cellGeo = createChamferedBoxGeo(3.65, 0.10, 3.65, 0.28, 0.025, 'y');
    for (let ix = -1.5; ix <= 1.5; ix += 1.0) {
      for (let iz = -1.5; iz <= 1.5; iz += 1.0) {
        const island = new THREE.Mesh(cellGeo, u.bionzIndiumStim);
        island.position.set(ix * 4.45, 0.28, iz * 4.45);
        island.userData.noEdges = true;
        g.add(island);
      }
    }

    // Secondary Indium STIM contact strip directly over CXD90058 Cetus companion chiplet!
    const cetusTimGeo = createChamferedBoxGeo(3.8, 0.34, 12.8, 0.36, 0.06, 'y');
    const cetusTim = new THREE.Mesh(cetusTimGeo, u.bionzIndiumStim);
    cetusTim.position.set(13.0, 0.0, 0);
    g.add(cetusTim);

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

    // Subtle mid-wall transfer-mold parting-line ridge & -X mold gate runner witness stub
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
      createChamferedBoxGeo(0.32, 0.72, 4.2, 0.08, 0.04, 'y'),
      u.bionzEmcSilica
    );
    gateStub.position.set(-(PKG_W - 2.2) * 0.5 - 0.08, -0.05, 0);
    gateStub.userData.noEdges = true;
    g.add(partingRim, gateStub);

    // Authentic Micron 4NA47 D8DNH PoP LPDDR5X laser-marked top cover panel (cut away front-right to show DRAM!)
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

    // 3D recessed circular Pin-1 crater depression (-X, -Z) & twin circular mold ejector-pin witness cups
    for (const [cx, cz, rad, rimMat] of [
      [-11.2, -11.2, 0.82, mats.silverElectrode],
      [11.2, -11.2, 0.68, mats.matteBlackAnodized],
      [-11.2, 11.2, 0.68, mats.matteBlackAnodized],
    ] as Array<[number, number, number, THREE.Material]>) {
      const cup = new THREE.Mesh(hiResCyl(rad, rad * 0.84, 0.12, 16), mats.matteBlackAnodized);
      cup.position.set(cx, 0.85, cz);
      cup.userData.noEdges = true;
      const rim = new THREE.Mesh(hiResTorus(rad, 0.07, 6, 18), rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(cx, 0.88, cz);
      rim.userData.noEdges = true;
      g.add(cup, rim);
    }

    // Precision chamfered cutaway window bezel + crystal clear inspection glass pane over exposed DRAM stack
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
    const glassPane = new THREE.Mesh(
      markHiRes(new THREE.BoxGeometry(8.9, 0.14, 8.9)),
      mats.opticalCementClear
    );
    glassPane.position.set(5.3, 0.74, 5.3);
    glassPane.userData.noEdges = true;
    g.add(winBezel, glassPane);

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

    // Bottom silver-filled conductive die-attach epoxy fillet cushion under Die 0
    const baseAttach = new THREE.Mesh(
      createChamferedBoxGeo(19.4, 0.12, 18.2, 0.35, 0.04, 'y'),
      mats.sinteredSilver
    );
    baseAttach.position.set(-0.5, -0.70, 0);
    baseAttach.userData.noEdges = true;
    g.add(baseAttach);

    // 4 stepped ultra-thin chamfered 1-beta LPDDR5X 16-bank silicon dies + amber DAF + staggered gold bond pads
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

      // Raised central vertical decoder spine & horizontal I/O bus relief across each DRAM die
      const spineV = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, d - 1.4), mats.goldPlating);
      spineV.position.set(offsetX, dieY + 0.135, 0);
      spineV.userData.noEdges = true;
      const spineH = new THREE.Mesh(new THREE.BoxGeometry(w - 1.6, 0.04, 0.38), mats.copperHybridBond);
      spineH.position.set(offsetX, dieY + 0.132, 0);
      spineH.userData.noEdges = true;
      g.add(spineV, spineH);

      // Dense staggered wirebond pad terraces along left & right edges (15 pads per side x 4 dies = 120 pads!)
      for (const side of [-1, 1]) {
        for (let k = -7; k <= 7; k++) {
          padCoords.push([offsetX + side * (w * 0.5 - 0.42), dieY + 0.135, k * 1.02]);
        }
      }

      // Translucent golden-amber Die Attach Film (DAF) adhesive layer with micro-fillet overhang
      if (i > 0) {
        const daf = new THREE.Mesh(
          createChamferedBoxGeo(w + 0.24, 0.09, d + 0.24, 0.24, 0.02, 'y'),
          mats.mylarInsulatorFilm
        );
        daf.position.set(offsetX, dieY - 0.165, 0);
        daf.userData.noEdges = true;
        g.add(daf);
      }
    }

    // Instanced gleaming gold bond pads across all 4 stacked DRAM dies
    const padGeo = new THREE.BoxGeometry(0.42, 0.06, 0.42);
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

    // Ultra-thin 4-layer BT-resin PoP interposer mapped with bespoke staggered ENIG wirebond finger texture
    const interposerGeo = extrudeHiRes(createRoundedRectShape(PKG_W - 2.4, PKG_W - 2.4, 1.3), 0.52, 0.08, 0.08, 2, 22);
    interposerGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(interposerGeo, PKG_W - 2.4, PKG_W - 2.4, 'xz');
    const interposer = new THREE.Mesh(interposerGeo, u.bionzPopInterposer);
    g.add(interposer);

    // 48 true curved ball-to-stitch cascaded gold & Pd-Cu wirebond arches across all 4 DRAM tiers!
    // Left & Right main DQ/DQS/VDDQ wirebond banks (16 per side = 32 loops) + Top & Bottom CA/CK banks (8 per side = 16 loops)
    for (const side of [-1, 1]) {
      for (let i = -7; i <= 7; i++) {
        const z = i * 1.06;
        const tier = Math.abs(i) % 4;
        const startX = side * (7.1 + (3 - tier) * 0.55);
        const endX = side * (11.7 + (i % 2 === 0 ? 0.55 : -0.15)); // Staggered 2-row bond fingers!
        const startY = 0.56 + tier * 0.36;

        const finger = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.08, 0.34), mats.goldPlating);
        finger.position.set(endX, 0.29, z);
        finger.userData.noEdges = true;
        g.add(finger);

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
        const endZ = side * 11.9;
        const startY = 0.56 + tier * 0.36;

        const finger = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 1.18), mats.goldPlating);
        finger.position.set(x, 0.29, endZ);
        finger.userData.noEdges = true;
        g.add(finger);

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

    // 4 ultra-miniature 01005 VDDQ decoupling MLCCs mounted at the 4 interposer corners
    for (const [cx, cz] of [
      [-11.8, -11.8],
      [11.8, -11.8],
      [-11.8, 11.8],
      [11.8, 11.8],
    ]) {
      const dec = buildSmdPassive(1.1, 0.56, 0.42, mats.smdCeramic, mats.solderBallSilver, 'y');
      dec.position.set(cx, 0.48, cz);
      g.add(dec);
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
    const imcCollarGeo = hiResCyl(0.36, 0.44, 0.18, 12);
    const padGeo = hiResCyl(0.44, 0.44, 0.12, 12);
    const tmvCollarGeo = hiResCyl(0.44, 0.34, 0.56, 12);
    const pillarGeo = hiResCyl(0.26, 0.26, 2.28, 12);

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

    const balls = new THREE.InstancedMesh(ballGeo, mats.solderBallSilver, coords.length);
    const imcCollars = new THREE.InstancedMesh(imcCollarGeo, mats.sinteredSilver, coords.length);
    const ubmTopPads = new THREE.InstancedMesh(padGeo, mats.goldPlating, coords.length);
    const ubmBotPads = new THREE.InstancedMesh(padGeo, mats.goldPlating, coords.length);
    const tmvFunnels = new THREE.InstancedMesh(tmvCollarGeo, u.bionzEmcSilica, coords.length);
    const pillars = new THREE.InstancedMesh(pillarGeo, mats.copperHybridBond, coords.length);
    const dummy = new THREE.Object3D();

    coords.forEach(([x, z], idx) => {
      // Glossy SAC305 PoP inter-package solder sphere
      dummy.position.set(x, 0.96, z);
      dummy.updateMatrix();
      balls.setMatrixAt(idx, dummy.matrix);

      // Cu6Sn5 intermetallic wetting collar between SAC ball and vertical TIV copper pillar
      dummy.position.set(x, 0.58, z);
      dummy.updateMatrix();
      imcCollars.setMatrixAt(idx, dummy.matrix);

      // Top interposer gold UBM pad cap
      dummy.position.set(x, 1.38, z);
      dummy.updateMatrix();
      ubmTopPads.setMatrixAt(idx, dummy.matrix);

      // Laser-ablated conical Through-Mold Via (TMV) funnel collar gripping top of copper pillar
      dummy.position.set(x, 0.30, z);
      dummy.updateMatrix();
      tmvFunnels.setMatrixAt(idx, dummy.matrix);

      // Vertical electroplated Through-InFO / TMV copper pillar
      dummy.position.set(x, -0.58, z);
      dummy.updateMatrix();
      pillars.setMatrixAt(idx, dummy.matrix);

      // Bottom ABF substrate ENEPIG UBM landing pad
      dummy.position.set(x, -1.72, z);
      dummy.updateMatrix();
      ubmBotPads.setMatrixAt(idx, dummy.matrix);
    });

    for (const im of [balls, imcCollars, ubmTopPads, ubmBotPads, tmvFunnels, pillars]) {
      im.instanceMatrix.needsUpdate = true;
      im.userData.noEdges = true;
    }
    g.add(balls, imcCollars, ubmTopPads, ubmBotPads, tmvFunnels, pillars);

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

    // 88wt% low-alpha fused-silica EMC mold frame mapped with micro-silica bead grain
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

    // Brushed SUS430 low-CTE stainless anti-warpage stiffener picture-frame ring
    const stiffener = makeHiResHorizPlate(
      createFrameShape(PKG_W - 0.1, PKG_W - 0.1, 1.7, PKG_W - 3.6, PKG_W - 3.6, 1.0),
      0.56,
      mats.stainlessMachined,
      0.08,
      2,
      22
    );
    stiffener.position.y = 1.46;

    // 8 machined thermal stress-relief expansion slots along stiffener edges
    for (const [sx, sz, isX] of [
      [-6.5, -14.8, true],
      [6.5, -14.8, true],
      [-6.5, 14.8, true],
      [6.5, 14.8, true],
      [-14.8, -6.5, false],
      [-14.8, 6.5, false],
      [14.8, -6.5, false],
      [14.8, 6.5, false],
    ] as Array<[number, number, boolean]>) {
      const slot = new THREE.Mesh(
        new THREE.BoxGeometry(isX ? 2.6 : 0.42, 0.62, isX ? 0.42 : 2.6),
        mats.matteBlackAnodized
      );
      slot.position.set(sx, 1.48, sz);
      slot.userData.noEdges = true;
      g.add(slot);
    }

    // 4 machined corner alignment datum bushings + gold Pin-1 chamfer key at (-X, -Z)
    for (const [cx, cz] of [
      [-14.2, -14.2],
      [14.2, -14.2],
      [-14.2, 14.2],
      [14.2, 14.2],
    ]) {
      const datum = new THREE.Mesh(hiResCyl(0.58, 0.58, 0.66, 14), mats.goldPlating);
      datum.position.set(cx, 1.48, cz);
      datum.userData.noEdges = true;
      const bore = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.70, 10), mats.matteBlackAnodized);
      bore.position.set(cx, 1.48, cz);
      bore.userData.noEdges = true;
      g.add(datum, bore);
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

    // Outer dicing scribe-street chamfer rim with 4-corner lithography stepper Vernier alignment crosses
    const scribeRim = makeHiResHorizPlate(
      createFrameShape(DIE_W + 0.68, DIE_W + 0.68, 0.64, DIE_W + 0.24, DIE_W + 0.24, 0.54),
      0.56,
      mats.siliconBulk,
      0.03,
      1,
      18
    );
    scribeRim.position.y = -0.06;
    scribeRim.userData.noEdges = true;

    // Dual Cu/W outer crack-stop fortress wall & inner gold moisture-guard seal ring
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

    // Sculpted 3D Coherent Network-on-Chip (NoC) crossbar highways + 9 NoC router switch intersection nodes
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
          createChamferedBoxGeo(0.56, 0.14, 0.56, 0.08, 0.02, 'y'),
          mats.goldPlating
        );
        router.position.set(lx, 0.44, lz);
        router.userData.noEdges = true;
        g.add(router);
      }
    }

    // 4 corner lithography stepper Vernier alignment crosses on outer scribe ledge
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const vx = sx * (DIE_W * 0.5 + 0.22);
        const vz = sz * (DIE_W * 0.5 + 0.22);
        const vh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.08), mats.goldPlating);
        vh.position.set(vx, 0.26, vz);
        vh.userData.noEdges = true;
        const vv = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.42), mats.goldPlating);
        vv.position.set(vx, 0.26, vz);
        vv.userData.noEdges = true;
        g.add(vh, vv);
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
      baseMat: u.v2BionzSramArray,
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
      // XR10: SLVS-EC v3.0 8-Lane SerDes RX PHY — 8 differential pairs + CTLE peaking coils + CDR PLL + ECC framer
      for (let i = 0; i < 8; i++) {
        const lx = -1.48 + i * 0.422;
        const pLine = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.11, 2.35), mats.goldPlating);
        pLine.position.set(lx - 0.07, topY, 0.25);
        pLine.userData.noEdges = true;
        const nLine = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.11, 2.35), mats.copperHybridBond);
        nLine.position.set(lx + 0.07, topY, 0.25);
        nLine.userData.noEdges = true;
        // Miniature CTLE inductive peaking T-coil ring at sensor ingress end
        const tCoil = new THREE.Mesh(hiResTorus(0.14, 0.035, 6, 12), mats.goldPlating);
        tCoil.rotation.x = Math.PI / 2;
        tCoil.position.set(lx, topY + 0.05, -1.28);
        tCoil.userData.noEdges = true;
        g.add(pLine, nLine, tCoil);
      }
      // 8b/10b–64b/66b deserializer & CRC/ECC packet framer bar + CDR phase-interpolator cylinder
      const framer = new THREE.Mesh(createChamferedBoxGeo(3.35, 0.18, 0.52, 0.08, 0.03, 'y'), mats.fluorineCoatCyan);
      framer.position.set(0, topY + 0.06, 1.44);
      framer.userData.noEdges = true;
      const cdrPll = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.22, 14), mats.goldPlating);
      cdrPll.position.set(-1.35, topY + 0.08, 1.44);
      cdrPll.userData.noEdges = true;
      g.add(framer, cdrPll);
    } else if (blk.detailKind === 'bayer') {
      // XR11: 16-Bit RAW Front-End ISP — 4x4 RGBG Bayer demosaic matrix + BLC strip + DPC 3x3 + lens warp grid
      const cMats = [mats.cfaRed, mats.cfaGreen, mats.cfaGreen, mats.cfaBlue];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const tile = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.18, 0.56), cMats[(r % 2) * 2 + (c % 2)]);
          tile.position.set(-1.12 + c * 0.62, topY + 0.03, -1.08 + r * 0.62);
          tile.userData.noEdges = true;
          g.add(tile);
        }
      }
      // Optical Black Level Clamp (BLC) dark reference strip on -Z + Lens breathing geometric warp bar on +X
      const blcBar = new THREE.Mesh(new THREE.BoxGeometry(2.65, 0.14, 0.30), mats.matteBlackAnodized);
      blcBar.position.set(-0.22, topY + 0.03, 1.46);
      blcBar.userData.noEdges = true;
      const warpBlock = new THREE.Mesh(createChamferedBoxGeo(0.68, 0.20, 3.1, 0.08, 0.03, 'y'), mats.goldPlating);
      warpBlock.position.set(1.38, topY + 0.05, 0);
      warpBlock.userData.noEdges = true;
      g.add(blcBar, warpBlock);
    } else if (blk.detailKind === 'wavelet') {
      // XR12: Area-Specific NR + Diffraction Comp + 7K-to-4K Polyphase Oversampling Funnel
      // 4 terraced wavelet pyramid frequency-band filters (left) + 7->4 converging oversampling scaler funnel (right)
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
      // 7K (7 input lanes) -> 4K (4 dense output bars) converging oversampling scaler funnel
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
      // Stepped DRO Lv1–Lv8 tone-curve staircase along +X/+Z edge
      for (let st = 0; st < 6; st++) {
        const sh = 0.08 + st * 0.045;
        const stepBar = new THREE.Mesh(new THREE.BoxGeometry(0.42, sh, 0.38), mats.goldPlating);
        stepBar.position.set(1.42, topY + sh * 0.45, -1.25 + st * 0.50);
        stepBar.userData.noEdges = true;
        g.add(stepBar);
      }
    } else if (blk.detailKind === 'systolic') {
      // XR14: BIONZ XR2 Integrated AI NPU — 6x6 Tensor Systolic MAC Grid + North Weight SRAM + West Activation FIFO
      for (let ix = 0; ix < 6; ix++) {
        for (let iz = 0; iz < 6; iz++) {
          const mac = new THREE.Mesh(
            new THREE.BoxGeometry(0.35, 0.16, 0.35),
            (ix + iz) % 2 === 0 ? mats.goldPlating : mats.makeupSealViolet
          );
          mac.position.set(-0.92 + ix * 0.46, topY + 0.04, -0.92 + iz * 0.46);
          mac.userData.noEdges = true;
          g.add(mac);
        }
      }
      // North Weight-SRAM broadcast bus & West Activation FIFO vector pipe
      const northSram = new THREE.Mesh(createChamferedBoxGeo(2.85, 0.22, 0.44, 0.06, 0.02, 'y'), mats.siliconTsvDram);
      northSram.position.set(0.22, topY + 0.07, -1.52);
      northSram.userData.noEdges = true;
      const westFifo = new THREE.Mesh(createChamferedBoxGeo(0.44, 0.22, 2.85, 0.06, 0.02, 'y'), mats.copperHybridBond);
      westFifo.position.set(-1.52, topY + 0.07, 0.22);
      westFifo.userData.noEdges = true;
      g.add(northSram, westFifo);
    } else if (blk.detailKind === 'arm') {
      // XR15: Quad-Core ARM Cortex-A35 AMP Cluster (2x Linux UI + 2x uITRON RTOS) + L2 Cache & GIC Crossbar
      const coreDefs: Array<[number, number, boolean]> = [
        [-0.96, -0.96, true],
        [0.96, -0.96, true],
        [-0.96, 0.96, false],
        [0.96, 0.96, false],
      ];
      for (const [cx, cz, isLinux] of coreDefs) {
        const core = new THREE.Mesh(
          createChamferedBoxGeo(1.44, 0.20, 1.44, 0.12, 0.04, 'y'),
          isLinux ? mats.mountShimBlue : mats.copperHybridBond
        );
        core.position.set(cx, topY + 0.04, cz);
        core.userData.noEdges = true;
        // Split L1 I-Cache & D-Cache + NEON SIMD FPU stripe inside each Cortex-A35 tile
        const l1i = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.09, 0.56), mats.goldPlating);
        l1i.position.set(cx - 0.30, topY + 0.16, cz - 0.28);
        l1i.userData.noEdges = true;
        const l1d = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.09, 0.56), mats.sinteredSilver);
        l1d.position.set(cx + 0.30, topY + 0.16, cz - 0.28);
        l1d.userData.noEdges = true;
        const neon = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.08, 0.38), mats.goldPlating);
        neon.position.set(cx, topY + 0.15, cz + 0.36);
        neon.userData.noEdges = true;
        g.add(core, l1i, l1d, neon);
      }
      // Central coherent L2 cache + GIC-400 interrupt crossbar
      const xbar1 = new THREE.Mesh(new THREE.BoxGeometry(blk.w - 0.72, 0.12, 0.26), mats.goldPlating);
      xbar1.position.y = topY + 0.07;
      const xbar2 = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, blk.d - 0.72), mats.goldPlating);
      xbar2.position.y = topY + 0.07;
      const gicHub = new THREE.Mesh(hiResCyl(0.36, 0.36, 0.22, 12), mats.goldPlating);
      gicHub.position.y = topY + 0.10;
      xbar1.userData.noEdges = true;
      xbar2.userData.noEdges = true;
      gicHub.userData.noEdges = true;
      g.add(xbar1, xbar2, gicHub);
    } else if (blk.detailKind === 'af') {
      // XR16: Sony Proprietary 32-bit SA DSP ("sabin") + 759-Point PDAF Left/Right Correlator + 5-Axis IBIS PID Servo
      // Left: 16-register SA DSP "sabin" VLIW execution core
      const sabinCore = new THREE.Mesh(createChamferedBoxGeo(1.48, 0.24, 2.25, 0.12, 0.04, 'y'), mats.goldPlating);
      sabinCore.position.set(-0.92, topY + 0.06, -0.42);
      sabinCore.userData.noEdges = true;
      g.add(sabinCore);
      // Right: Twin interleaved Left/Right PDAF phase-difference correlator tooth arrays!
      for (let i = 0; i < 6; i++) {
        const z = -1.32 + i * 0.42;
        const pdL = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.16, 0.16), mats.fluorineCoatCyan);
        pdL.position.set(0.62, topY + 0.05, z);
        pdL.userData.noEdges = true;
        const pdR = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.16, 0.16), mats.copperHybridBond);
        pdR.position.set(1.18, topY + 0.05, z + 0.16);
        pdR.userData.noEdges = true;
        g.add(pdL, pdR);
      }
      // South: 5-Axis IBIS Gyro-Fusion PID Servo Ring (5 discrete axis servo actuators!)
      for (let ax = 0; ax < 5; ax++) {
        const pid = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.20, 12), ax === 2 ? mats.goldPlating : mats.copperHybridBond);
        pid.position.set(-1.32 + ax * 0.66, topY + 0.06, 1.32);
        pid.userData.noEdges = true;
        g.add(pid);
      }
    } else if (blk.detailKind === 'codec') {
      // XR17: Hardware 8K30p/4K120p HEVC/H.265 Codec — Recursive 64->32->16->8 CTU Quadtree + ME + CABAC
      // Authentic HEVC recursive Coding Tree Unit (CTU) quadtree partition sculpture!
      const ctu64 = new THREE.Mesh(createChamferedBoxGeo(1.56, 0.22, 1.56, 0.08, 0.03, 'y'), mats.gMasterRedBadge);
      ctu64.position.set(-0.88, topY + 0.05, -0.88);
      ctu64.userData.noEdges = true;
      const ctu32 = new THREE.Mesh(createChamferedBoxGeo(1.48, 0.20, 0.72, 0.06, 0.02, 'y'), mats.cinnabarAnodized);
      ctu32.position.set(0.88, topY + 0.04, -1.28);
      ctu32.userData.noEdges = true;
      // 4x 16x16 sub-CUs + 4x 8x8 transform units
      for (const [qx, qz] of [
        [0.48, -0.46],
        [1.24, -0.46],
        [0.48, 0.26],
        [1.24, 0.26],
      ]) {
        const cu = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.16, 0.58), mats.goldPlating);
        cu.position.set(qx, topY + 0.04, qz);
        cu.userData.noEdges = true;
        g.add(cu);
      }
      // CABAC entropy coder & 600Mbps All-Intra 10-bit 4:2:2 bitstream packer along south half
      const cabac = new THREE.Mesh(createChamferedBoxGeo(3.25, 0.20, 0.92, 0.10, 0.03, 'y'), mats.copperHybridBond);
      cabac.position.set(0, topY + 0.05, 1.18);
      cabac.userData.noEdges = true;
      g.add(ctu64, ctu32, cabac);
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
      // 32-bit Float / 96kHz HDR MAC engine + 4-ch MI-Shoe TDM/I2S lip-sync FIFO strip
      const fpu32 = new THREE.Mesh(createChamferedBoxGeo(3.2, 0.18, 0.88, 0.08, 0.03, 'y'), mats.cfaGreen);
      fpu32.position.set(0, topY + 0.05, 1.12);
      fpu32.userData.noEdges = true;
      g.add(fpu32);
    } else if (blk.detailKind === 'sram') {
      // XR19: On-Die Shared L2/L3 6T-SRAM & ISP Line-Buffer — 8 Butterfly Sub-Arrays + Central Decoder + ECC Column
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.22, blk.d - 0.68), mats.goldPlating);
      spine.position.y = topY + 0.06;
      spine.userData.noEdges = true;
      g.add(spine);
      for (const sx of [-1.05, 1.05]) {
        for (let iz = -1.26; iz <= 1.27; iz += 0.84) {
          const bank = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.15, 0.62), mats.dramCellArray);
          bank.position.set(sx, topY + 0.03, iz);
          bank.userData.noEdges = true;
          const senseAmp = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.19, 0.12), mats.goldPlating);
          senseAmp.position.set(sx, topY + 0.05, iz);
          senseAmp.userData.noEdges = true;
          g.add(bank, senseAmp);
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
      // Circular Pre-Capture 1-Second Ring-Buffer pointer wheel in the center!
      const ringBuf = new THREE.Mesh(hiResTorus(0.68, 0.14, 10, 24), mats.goldPlating);
      ringBuf.rotation.x = Math.PI / 2;
      ringBuf.position.y = topY + 0.10;
      ringBuf.userData.noEdges = true;
      const qosHub = new THREE.Mesh(hiResCyl(0.36, 0.36, 0.24, 16), mats.copperHybridBond);
      qosHub.position.y = topY + 0.08;
      qosHub.userData.noEdges = true;
      g.add(ringBuf, qosHub);
    } else if (blk.detailKind === 'vault') {
      // XR21: C2PA Hardware Root-of-Trust — Continuous Gold Serpentine Active-Shield Tamper Mesh over Octagonal Vault
      const vaultHex = new THREE.Mesh(hiResCyl(1.48, 1.56, 0.22, 8), mats.matteBlackAnodized);
      vaultHex.position.y = topY + 0.05;
      vaultHex.userData.noEdges = true;
      const moatRing = new THREE.Mesh(hiResTorus(1.24, 0.11, 8, 24), mats.goldPlating);
      moatRing.rotation.x = Math.PI / 2;
      moatRing.position.y = topY + 0.16;
      moatRing.userData.noEdges = true;
      // Continuous serpentine active-shield anti-tamper mesh weaving across vault roof!
      for (let iz = -0.90; iz <= 0.91; iz += 0.30) {
        const wire = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.07, 0.08), mats.goldPlating);
        wire.position.set(0, topY + 0.22, iz);
        wire.userData.noEdges = true;
        g.add(wire);
      }
      for (let i = 0; i < 6; i++) {
        const turn = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.36), mats.goldPlating);
        turn.position.set(i % 2 === 0 ? 0.87 : -0.87, topY + 0.22, -0.75 + i * 0.30);
        turn.userData.noEdges = true;
        g.add(turn);
      }
      const keyDie = new THREE.Mesh(createChamferedBoxGeo(0.76, 0.28, 0.76, 0.08, 0.03, 'y'), mats.cinnabarAnodized);
      keyDie.position.y = topY + 0.12;
      keyDie.userData.noEdges = true;
      g.add(vaultHex, moatRing, keyDie);
    } else if (blk.detailKind === 'pcie') {
      // XR22: PCIe Gen4 CFexpress Type A NVMe DMA + SDXC UHS-II Dual-Slot Storage Engine
      // Left: PCIe Gen4 x1 differential NVMe PHY + DMA descriptor ring
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
      // Right: Dual SDXC UHS-II LVDS PHY + Slot1/Slot2 Hardware Mirroring Switch
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
      // Central translucent hardware OSD alpha-blend compositor stack
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
      // USB 3.2 Gen2 10Gbps SuperSpeed TX/RX UVC streaming MAC & E-Mount SPI/MI-Shoe I/O bar
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

      // True symmetric 2-level fractal H-Tree zero-skew clock distribution branches reaching all 4 corners!
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

    // Active silicon FEOL base wafer mapped with bespoke 4nm EUV FinFET/GAA standard-cell texture
    const feolGeo = createChamferedBoxGeo(DIE_W - 0.6, 0.30, DIE_W - 0.6, 0.3, 0.04, 'y');
    const feolBase = new THREE.Mesh(feolGeo, u.bionzFeolFinfet);
    g.add(feolBase);

    // Sculpted 3D crystalline silicon FinFET / GAA nanosheet fins + STI oxide isolation troughs
    const finGeo = new THREE.BoxGeometry(DIE_W - 2.0, 0.24, 0.26);
    const finUpperGeo = new THREE.BoxGeometry(DIE_W - 2.0, 0.08, 0.20);
    for (let z = -8.4; z <= 8.41; z += 1.4) {
      const fin = new THREE.Mesh(finGeo, mats.siliconDepletion);
      fin.position.set(0, 0.24, z);
      fin.userData.noEdges = true;
      // Stacked GAA upper silicon nanosheet ribbon highlight
      const nanoRib = new THREE.Mesh(finUpperGeo, mats.fluorineCoatCyan);
      nanoRib.position.set(0, 0.38, z);
      nanoRib.userData.noEdges = true;
      g.add(fin, nanoRib);
    }

    // Orthogonal High-k HfO2 + TiN Metal Gate (HKMG) stacks with SiN sidewall spacers & Cobalt M0 contacts
    const gateGeo = new THREE.BoxGeometry(0.40, 0.38, DIE_W - 2.0);
    const spacerGeo = new THREE.BoxGeometry(0.10, 0.34, DIE_W - 2.0);
    const contactGeo = new THREE.BoxGeometry(0.18, 0.42, DIE_W - 2.4);
    for (let x = -7.8; x <= 7.81; x += 2.6) {
      const gate = new THREE.Mesh(gateGeo, mats.gatePolysilicon);
      gate.position.set(x, 0.30, 0);
      gate.userData.noEdges = true;
      // Dual SiN gate dielectric sidewall spacers
      for (const sd of [-0.24, 0.24]) {
        const spacer = new THREE.Mesh(spacerGeo, mats.aluminaHighKFilm);
        spacer.position.set(x + sd, 0.28, 0);
        spacer.userData.noEdges = true;
        g.add(spacer);
      }
      // Self-aligned Cobalt (Co) M0 source/drain trench contact bar
      const contact = new THREE.Mesh(contactGeo, mats.goldPlating);
      contact.position.set(x + 1.15, 0.31, 0);
      contact.userData.noEdges = true;
      g.add(gate, contact);
    }

    // Instanced diamond-faceted epitaxial SiGe/SiP source/drain stressor nodes along fin-contact junctions
    const epiGeo = hiResCyl(0.18, 0.24, 0.28, 6);
    const epiCoords: Array<[number, number]> = [];
    for (let x = -7.8; x <= 7.81; x += 2.6) {
      for (let z = -8.4; z <= 8.41; z += 2.8) {
        epiCoords.push([x + 1.15, z]);
      }
    }
    const epiInst = new THREE.InstancedMesh(epiGeo, mats.sinteredSilver, epiCoords.length);
    const dmEpi = new THREE.Object3D();
    epiCoords.forEach(([ex, ez], idx) => {
      dmEpi.position.set(ex, 0.32, ez);
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

    // Porous SiOC Ultra-Low-k dielectric block with TaN/Cu dual-damascene micro-texture
    const ulkBase = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 0.4, 0.84, DIE_W - 0.4, 0.35, 0.05, 'y'),
      mats.interlayerDielectric
    );
    g.add(ulkBase);

    // Planar-mapped BEOL top AP-layer dielectric cutaway cap revealing dual-damascene grid
    const beolTopPlate = new THREE.Mesh(
      createChamferedBoxGeo(DIE_W - 1.1, 0.10, DIE_W - 1.1, 0.28, 0.02, 'y'),
      u.bionzBeolDamascene
    );
    beolTopPlate.position.y = -0.36;
    beolTopPlate.userData.noEdges = true;
    g.add(beolTopPlate);

    // 6-tier progressive dual-damascene copper hierarchy (M1 fine -> M5 mid -> M10 semi-global -> M14 AP power mesh!)
    const viaCoords: Array<[number, number, number]> = [];
    for (let layer = 0; layer < 6; layer++) {
      const y = -0.32 + layer * 0.135;
      const thick = 0.055 + layer * 0.020;
      const width = 0.14 + layer * 0.085;
      const isX = layer % 2 === 0;
      const count = 10 - layer;
      const span = DIE_W - 2.0 - layer * 0.35; // Subtle architectural stepped terrace reveal!
      for (let i = 0; i < count; i++) {
        const offset = -span * 0.44 + (i / Math.max(1, count - 1)) * span * 0.88;
        // TaN diffusion-barrier liner trough cradling upper wide copper tracks
        if (layer >= 3) {
          const liner = new THREE.Mesh(
            new THREE.BoxGeometry(isX ? span + 0.08 : width + 0.08, thick + 0.02, isX ? width + 0.08 : span + 0.08),
            mats.taNBarrierLiner
          );
          liner.position.set(isX ? 0 : offset, y - 0.01, isX ? offset : 0);
          liner.userData.noEdges = true;
          g.add(liner);
        }
        const wire = new THREE.Mesh(
          new THREE.BoxGeometry(isX ? span : width, thick, isX ? width : span),
          layer >= 4 ? mats.goldPlating : mats.copperHybridBond
        );
        wire.position.set(isX ? 0 : offset, y, isX ? offset : 0);
        wire.userData.noEdges = true;
        g.add(wire);

        if (layer < 5 && i % 2 === 0) {
          viaCoords.push([isX ? offset * 0.72 : offset, y + 0.068, isX ? offset : offset * 0.72]);
        }
      }
    }

    // Instanced stacked vertical copper vias (V1–V13) linking orthogonal metal planes
    const viaGeo = hiResCyl(0.11, 0.11, 0.18, 8);
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

    // Chamfered silicon chiplet slab planar-mapped with upgraded CXD90058 "Cetus" floorplan
    const cetusGeo = extrudeHiRes(createRoundedRectShape(4.6, 13.8, 0.48), 1.15, 0.1, 0.1, 2, 18);
    cetusGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(cetusGeo, 4.6, 13.8, 'xz');
    const cetusDie = new THREE.Mesh(cetusGeo, u.bionzCetusDie);
    g.add(cetusDie);

    // Dual perimeter copper/gold crack-stop seal ring framing CXD90058
    const sealRing = makeHiResHorizPlate(
      createFrameShape(4.78, 13.98, 0.54, 4.24, 13.44, 0.40),
      1.18,
      mats.copperHybridBond,
      0.03,
      1,
      16
    );
    sealRing.userData.noEdges = true;
    g.add(sealRing);

    // 4 sculpted Cortex-A35 cores (each with logic core + split L1 I$/D$ SRAM + shared uITRON timer spine)
    for (let i = -1.5; i <= 1.5; i += 1.0) {
      const cz = i * 3.0;
      const coreTile = new THREE.Mesh(createChamferedBoxGeo(2.45, 0.16, 2.25, 0.12, 0.03, 'y'), mats.goldPlating);
      coreTile.position.set(0.32, 0.64, cz);
      coreTile.userData.noEdges = true;
      const l1Cache = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.10, 1.75), mats.siliconTsvDram);
      l1Cache.position.set(0.95, 0.74, cz);
      l1Cache.userData.noEdges = true;
      g.add(coreTile, l1Cache);
    }

    // Left-edge dense 24-pad LSI silicon-bridge D2D PHY interface bank facing the main BIONZ XR die!
    const edgePhy = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.16, 12.2), mats.copperHybridBond);
    edgePhy.position.set(-1.82, 0.64, 0);
    edgePhy.userData.noEdges = true;
    g.add(edgePhy);

    const d2dPadGeo = new THREE.BoxGeometry(0.32, 0.08, 0.28);
    const d2dInst = new THREE.InstancedMesh(d2dPadGeo, mats.goldPlating, 22);
    const dmD2d = new THREE.Object3D();
    for (let k = 0; k < 22; k++) {
      dmD2d.position.set(-1.82, 0.74, -5.6 + k * 0.533);
      dmD2d.updateMatrix();
      d2dInst.setMatrixAt(k, dmD2d.matrix);
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
      createFrameShape(9.4, 16.6, 0.60, 8.2, 15.4, 0.42),
      0.46,
      u.bionzEmcSilica,
      0.04,
      1,
      16
    );
    lsiCollar.position.set(10.2, -0.02, 0);
    lsiCollar.userData.noEdges = true;
    g.add(lsiCollar);

    // 22 ultra-fine 2/2um high-density parallel copper RDL die-to-die micro-lines + staggered 35um micro-bump landing bars
    for (let k = 0; k < 22; k++) {
      const z = -6.3 + k * 0.60;
      const trace = new THREE.Mesh(
        new THREE.BoxGeometry(6.8, 0.09, 0.16),
        k % 2 === 0 ? mats.copperHybridBond : mats.goldPlating
      );
      trace.position.set(10.2, 0.30, z);
      trace.userData.noEdges = true;
      g.add(trace);
    }
    for (const bx of [6.75, 7.25, 13.15, 13.65]) {
      const padBar = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 13.4), mats.goldPlating);
      padBar.position.set(bx, 0.31, 0);
      padBar.userData.noEdges = true;
      g.add(padBar);
    }

    // Embedded Deep Trench Capacitor (eDTC) silicon decoupling bars at top & bottom ends of LSI bridge
    for (const ez of [-7.1, 7.1]) {
      const edtc = new THREE.Mesh(createChamferedBoxGeo(5.8, 0.16, 0.72, 0.08, 0.02, 'y'), mats.siliconTsvDram);
      edtc.position.set(10.2, 0.32, ez);
      edtc.userData.noEdges = true;
      g.add(edtc);
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

    // Zone 1: Main BIONZ XR die 14x14 C4 Cu-pillar array (196 pillars with Ti/Cu UBM + Cu pillar + Cu6Sn5 IMC + SnAg cap!)
    const gridN = 14;
    const mainCoords: Array<[number, number]> = [];
    const step = (DIE_W - 2.2) / (gridN - 1);
    for (let ix = 0; ix < gridN; ix++) {
      for (let iz = 0; iz < gridN; iz++) {
        mainCoords.push([-(DIE_W - 2.2) * 0.5 + ix * step, -(DIE_W - 2.2) * 0.5 + iz * step]);
      }
    }
    // Zone 3: Cetus companion chiplet C4 pillar sub-array (3x9 = 27 pillars at x = +13.2)
    for (let ix = 0; ix < 3; ix++) {
      for (let iz = 0; iz < 9; iz++) {
        mainCoords.push([12.1 + ix * 1.1, -5.6 + iz * 1.4]);
      }
    }

    const totalMain = mainCoords.length;
    const ubmGeo = hiResCyl(0.32, 0.32, 0.08, 10);
    const cuGeo = hiResCyl(0.28, 0.28, 0.48, 12);
    const imcGeo = hiResCyl(0.29, 0.31, 0.10, 10);
    const capGeo = hiResSphere(0.31, 10, 8);

    const ubms = new THREE.InstancedMesh(ubmGeo, mats.goldPlating, totalMain);
    const pillars = new THREE.InstancedMesh(cuGeo, mats.copperHybridBond, totalMain);
    const imcs = new THREE.InstancedMesh(imcGeo, mats.sinteredSilver, totalMain);
    const caps = new THREE.InstancedMesh(capGeo, mats.solderBallSilver, totalMain);

    const dummy = new THREE.Object3D();
    mainCoords.forEach(([x, z], idx) => {
      dummy.position.set(x, 0.40, z);
      dummy.updateMatrix();
      ubms.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(x, 0.14, z);
      dummy.updateMatrix();
      pillars.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(x, -0.12, z);
      dummy.updateMatrix();
      imcs.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(x, -0.24, z);
      dummy.updateMatrix();
      caps.setMatrixAt(idx, dummy.matrix);
    });

    // Zone 2: Ultra-fine 35um pitch micro-bump bridge columns over LSI bridge (2x16 = 32 micro-bumps!)
    const uBumpGeo = hiResCyl(0.15, 0.15, 0.42, 8);
    const uCapGeo = hiResSphere(0.17, 8, 6);
    const uPillars = new THREE.InstancedMesh(uBumpGeo, mats.copperHybridBond, 32);
    const uCaps = new THREE.InstancedMesh(uCapGeo, mats.goldPlating, 32);
    let ui = 0;
    for (const bx of [9.65, 10.75]) {
      for (let k = 0; k < 16; k++) {
        const bz = -6.0 + k * 0.80;
        dummy.position.set(bx, 0.16, bz);
        dummy.updateMatrix();
        uPillars.setMatrixAt(ui, dummy.matrix);
        dummy.position.set(bx, -0.08, bz);
        dummy.updateMatrix();
        uCaps.setMatrixAt(ui, dummy.matrix);
        ui++;
      }
    }

    for (const im of [ubms, pillars, imcs, caps, uPillars, uCaps]) {
      im.instanceMatrix.needsUpdate = true;
      im.userData.noEdges = true;
    }
    g.add(ubms, pillars, imcs, caps, uPillars, uCaps);

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

      // Interdigitated wide low-ESL gold VDD / copper VSS terminal bars + 8 micro-bump landing pads
      const padL = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.40, 2.05), mats.goldPlating);
      padL.position.x = -1.48;
      padL.userData.noEdges = true;
      const padR = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.40, 2.05), mats.copperHybridBond);
      padR.position.x = 1.48;
      padR.userData.noEdges = true;
      capGrp.add(padL, padR);

      for (const bx of [-1.48, 1.48]) {
        for (const bz of [-0.68, 0, 0.68]) {
          const bump = new THREE.Mesh(hiResCyl(0.16, 0.16, 0.14, 10), mats.solderBallSilver);
          bump.position.set(bx, -0.22, bz);
          bump.userData.noEdges = true;
          capGrp.add(bump);
        }
      }
      capGrp.rotation.y = rotY;
      capGrp.position.set(cx, 4.5, cz);
      g.add(capGrp);
    }

    // 24 ultra-realistic Land-Side 01005/0201 low-ESL MLCCs (6x4 courtyard) with gold ENEPIG pads & solder fillets!
    for (let ix = -2.5; ix <= 2.5; ix += 1.0) {
      for (let iz = -1.5; iz <= 1.5; iz += 1.0) {
        const isReversedGeom = Math.abs(iz) < 0.6; // 0204 LW-reverse ultra-low-ESL MLCCs in central VDD_CORE rows!
        const cap = buildSmdPassive(
          isReversedGeom ? 1.18 : 1.42,
          isReversedGeom ? 0.92 : 0.68,
          0.62,
          mats.smdCeramic,
          mats.solderBallSilver,
          'y'
        );
        cap.position.set(ix * 1.92, -0.05, iz * 2.15);
        // Gold ENEPIG land pads beneath each MLCC termination
        for (const s of [-1, 1]) {
          const land = new THREE.Mesh(
            new THREE.BoxGeometry(0.44, 0.08, isReversedGeom ? 0.98 : 0.74),
            mats.goldPlating
          );
          land.position.set(ix * 1.92 + s * (isReversedGeom ? 0.48 : 0.58), 0.28, iz * 2.15);
          land.userData.noEdges = true;
          g.add(land);
        }
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

    // Multi-layer ABF substrate top slab planar-mapped with upgraded AT&S SAP 9/12um routing & silkscreen
    const abfGeo = extrudeHiRes(createRoundedRectShape(PKG_W, PKG_W, 1.6), 1.12, 0.12, 0.12, 2, 24);
    abfGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(abfGeo, PKG_W, PKG_W, 'xz');
    const abfTop = new THREE.Mesh(abfGeo, u.bionzAbfSubstrate);
    g.add(abfTop);

    // 4 visible laminated SAP copper build-up strata bands gleaming around all 4 package side edges!
    for (let s = 0; s < 4; s++) {
      const strata = makeHiResHorizPlate(
        createFrameShape(PKG_W + 0.04, PKG_W + 0.04, 1.6, PKG_W - 0.18, PKG_W - 0.18, 1.52),
        0.06,
        mats.copperHeatSpreader,
        0.01,
        1,
        20
      );
      strata.position.y = -0.34 + s * 0.23;
      strata.userData.noEdges = true;
      g.add(strata);
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

    // 44 perimeter die-side 01005/0201 SMD decoupling MLCCs & thin-film resistors flanking all 4 edges!
    for (let i = -5; i <= 5; i++) {
      for (const side of [-1, 1]) {
        const isRes = Math.abs(i) === 4;
        const bodyMat = isRes ? mats.matteBlackAnodized : mats.smdCeramic;
        const cap1 = buildSmdPassive(1.18, 0.58, 0.50, bodyMat, mats.solderBallSilver, 'y');
        cap1.position.set(i * 2.18, 0.82, side * 13.45);
        g.add(cap1);
        const cap2 = buildSmdPassive(1.18, 0.58, 0.50, bodyMat, mats.solderBallSilver, 'y');
        cap2.rotation.y = Math.PI / 2;
        cap2.position.set(side * 13.45, 0.82, i * 2.18);
        g.add(cap2);
      }
    }

    // 4 gold optical alignment fiducials with concentric solder-mask clearance moats + Pin-1 triangle
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

    // Laminated 35um heavy copper VDD_CORE / GND reference planes on top & bottom of BT core
    const gndTop = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W - 1.1, 0.14, PKG_W - 1.1, 1.2, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    gndTop.position.y = 0.88;
    const gndBot = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W - 1.1, 0.14, PKG_W - 1.1, 1.2, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    gndBot.position.y = -0.88;
    g.add(core, gndTop, gndBot);

    // 100 (10x10) Resin-Plugged Plated Through-Hole (PTH) copper core vias with annular capture pads & anti-pad halos!
    const pthGeo = hiResCyl(0.36, 0.36, 1.98, 12);
    const plugGeo = hiResCyl(0.19, 0.19, 2.04, 10);
    const padRingGeo = hiResTorus(0.46, 0.08, 6, 14);
    const antipadGeo = hiResCyl(0.62, 0.62, 0.16, 12);

    const nGrid = 10;
    const totalPth = nGrid * nGrid;
    const pthInst = new THREE.InstancedMesh(pthGeo, mats.copperHybridBond, totalPth);
    const plugInst = new THREE.InstancedMesh(plugGeo, mats.matteBlackAnodized, totalPth);
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

        rotDummy.position.set(px, 0.96, pz);
        rotDummy.updateMatrix();
        topRingInst.setMatrixAt(idx, rotDummy.matrix);

        rotDummy.position.set(px, -0.96, pz);
        rotDummy.updateMatrix();
        botRingInst.setMatrixAt(idx, rotDummy.matrix);
        idx++;
      }
    }
    for (const im of [pthInst, plugInst, topRingInst, botRingInst, antipadInst]) {
      im.instanceMatrix.needsUpdate = true;
      im.userData.noEdges = true;
    }
    g.add(pthInst, plugInst, topRingInst, botRingInst, antipadInst);

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

    // Bottom ABF laminate planar-mapped with bespoke Taiyo PSR-4000 green solder-resist & ENEPIG BGA pad map!
    const abfBotGeo = extrudeHiRes(createRoundedRectShape(PKG_W, PKG_W, 1.6), 1.12, 0.12, 0.12, 2, 24);
    abfBotGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(abfBotGeo, PKG_W, PKG_W, 'xz-bottom');
    const abfBot = new THREE.Mesh(abfBotGeo, u.bionzAbfBottomSr);
    g.add(abfBot);

    // 144 sculpted ENEPIG (Ni/Pd/Au) SMD solder pads encircled by raised dark-green PSR-4000 solder-mask dam rings!
    const padCoords: Array<[number, number]> = [];
    for (let ix = -6; ix <= 6; ix++) {
      for (let iz = -6; iz <= 6; iz++) {
        if (Math.abs(ix) <= 2 && Math.abs(iz) <= 2) continue;
        padCoords.push([ix * 2.25, iz * 2.25]);
      }
    }
    const padGeo = hiResCyl(0.58, 0.58, 0.14, 14);
    const damGeo = hiResTorus(0.68, 0.08, 6, 14);
    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, padCoords.length);
    const damInst = new THREE.InstancedMesh(damGeo, mats.abfSubstrate, padCoords.length);
    const dummy = new THREE.Object3D();
    const damDummy = new THREE.Object3D();
    damDummy.rotation.x = Math.PI / 2;
    padCoords.forEach(([x, z], i) => {
      dummy.position.set(x, -0.60, z);
      dummy.updateMatrix();
      padInst.setMatrixAt(i, dummy.matrix);

      damDummy.position.set(x, -0.58, z);
      damDummy.updateMatrix();
      damInst.setMatrixAt(i, damDummy.matrix);
    });
    padInst.instanceMatrix.needsUpdate = true;
    damInst.instanceMatrix.needsUpdate = true;
    padInst.userData.noEdges = true;
    damInst.userData.noEdges = true;
    g.add(padInst, damInst);

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
        const isCornerAnchor = Math.abs(ix) === 6 && Math.abs(iz) === 6;
        ballCoords.push([ix * 2.25, iz * 2.25, isCornerAnchor]);
      }
    }

    // High-resolution glossy metallic SAC305 (Sn-3.0Ag-0.5Cu) solder spheres + top/bottom Cu6Sn5/Ni3Sn4 IMC necks!
    const bgaGeo = hiResSphere(0.68, 16, 12);
    const imcGeo = hiResCyl(0.52, 0.44, 0.16, 12);
    const bgaInst = new THREE.InstancedMesh(bgaGeo, mats.solderBallSilver, ballCoords.length);
    const imcTopInst = new THREE.InstancedMesh(imcGeo, mats.sinteredSilver, ballCoords.length);
    const imcBotInst = new THREE.InstancedMesh(imcGeo, mats.sinteredSilver, ballCoords.length);

    const dummy = new THREE.Object3D();
    ballCoords.forEach(([x, z, isCorner], i) => {
      const s = isCorner ? 1.12 : 1.0; // Reinforced larger maximum-DNP corner anchor GND balls!
      dummy.scale.set(s, s, s);
      dummy.position.set(x, 0, z);
      dummy.updateMatrix();
      bgaInst.setMatrixAt(i, dummy.matrix);

      dummy.scale.set(s, 1, s);
      dummy.position.set(x, 0.56, z);
      dummy.updateMatrix();
      imcTopInst.setMatrixAt(i, dummy.matrix);

      dummy.position.set(x, -0.56, z);
      dummy.updateMatrix();
      imcBotInst.setMatrixAt(i, dummy.matrix);
    });
    for (const im of [bgaInst, imcTopInst, imcBotInst]) {
      im.instanceMatrix.needsUpdate = true;
      im.userData.noEdges = true;
    }
    g.add(bgaInst, imcTopInst, imcBotInst);

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

    // Dedicated SY-1122 multi-phase PDN PCB zone with heavy 2oz exposed copper power busbars & thermal via stitching!
    const pdnGeo = extrudeHiRes(createRoundedRectShape(11.6, 26.0, 1.1), 0.85, 0.08, 0.08, 2, 18);
    pdnGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(pdnGeo, 11.6, 26.0, 'xz');
    const pdnPad = new THREE.Mesh(pdnGeo, u.batBmsPcb);
    g.add(pdnPad);

    // Heavy 2oz copper VDD_CORE 0.75V output busbar & PGND return pour + stitched thermal micro-vias
    const vddBar = new THREE.Mesh(createChamferedBoxGeo(1.45, 0.14, 21.0, 0.12, 0.02, 'y'), mats.copperHeatSpreader);
    vddBar.position.set(4.6, 0.48, -0.8);
    vddBar.userData.noEdges = true;
    const pgndBar = new THREE.Mesh(createChamferedBoxGeo(1.15, 0.14, 21.0, 0.12, 0.02, 'y'), mats.goldPlating);
    pgndBar.position.set(-4.75, 0.48, -0.8);
    pgndBar.userData.noEdges = true;
    g.add(vddBar, pgndBar);

    const thViaGeo = hiResCyl(0.16, 0.16, 0.22, 8);
    const thViaInst = new THREE.InstancedMesh(thViaGeo, mats.goldPlating, 20);
    const dmTv = new THREE.Object3D();
    for (let k = 0; k < 10; k++) {
      dmTv.position.set(4.6, 0.52, -9.8 + k * 2.0);
      dmTv.updateMatrix();
      thViaInst.setMatrixAt(k, dmTv.matrix);
      dmTv.position.set(-4.75, 0.52, -9.8 + k * 2.0);
      dmTv.updateMatrix();
      thViaInst.setMatrixAt(10 + k, dmTv.matrix);
    }
    thViaInst.instanceMatrix.needsUpdate = true;
    thViaInst.userData.noEdges = true;
    g.add(thViaInst);

    // Multi-phase QFN-48 Sony custom camera SoC PMIC (CXD5702GG) with crisp laser-marked top plate!
    const pmic = buildChipPackage({
      w: 6.4,
      d: 6.4,
      h: 1.18,
      style: 'qfn',
      pinsPerSide: 12,
      bodyMat: u.bionzEmcSilica,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzPmicIc,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    pmic.position.set(-1.35, 1.02, -6.2);
    g.add(pmic);

    // 4 molded carbonyl-iron metal-composite shielded 0.47uH buck inductors (R47 laser-etched + folded bottom terminals!)
    for (let i = 0; i < 4; i++) {
      const ind = buildMetalAlloyInductor(
        3.25,
        1.56,
        u.bionzInductorR47,
        mats.silverElectrode,
        mats.goldPlating
      );
      ind.position.set(2.35, 1.24, -9.2 + i * 4.2);
      g.add(ind);
    }

    // 2 Panasonic POSCAP / Kemet molded polymer-tantalum bulk decoupling capacitors (with beveled anode bar & J-leads)
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
      tant.position.set(-1.55, 1.0, tz);
      g.add(tant);
    }

    // 8x 0201 decoupling MLCCs & 2x low-ohm R010 current-sense shunt resistors
    for (let i = 0; i < 6; i++) {
      const cap = buildSmdPassive(1.2, 0.65, 0.48, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(-3.65, 0.68, -9.8 + i * 3.8);
      g.add(cap);
    }
    for (const sz of [1.8, 3.8]) {
      const shunt = buildSmdPassive(1.6, 0.85, 0.44, mats.matteBlackAnodized, mats.silverElectrode, 'y', mats.goldPlating);
      shunt.position.set(-1.55, 0.66, sz);
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

    // Isolated clock-island PCB carrier encircled by 360-degree stitched copper GND guard-via moat!
    const carrierGeo = extrudeHiRes(createRoundedRectShape(7.4, 5.8, 0.65), 0.55, 0.06, 0.06, 2, 16);
    carrierGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(carrierGeo, 7.4, 5.8, 'xz');
    const carrier = new THREE.Mesh(carrierGeo, u.bionzAbfSubstrate);
    g.add(carrier);

    // 360-degree guard-via fence isolating 24MHz reference clock from digital noise
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

    // Kyocera KT2520 / Epson 2520 multi-layer white Al2O3 alumina ceramic base + brazed Kovar seal ring
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

    // Seam-welded gold-plated Kovar hermetic lid planar-mapped with bespoke "24.000 TCXO E2548K +/-1.5ppm" texture!
    const goldLidGeo = createChamferedBoxGeo(4.82, 0.58, 3.22, 0.20, 0.05, 'y');
    const goldLid = new THREE.Mesh(goldLidGeo, u.bionzTcxoGoldLid);
    goldLid.position.y = 1.24;

    // 4 metallized corner castellations with glossy concave SAC305 solder fillets
    for (const sx of [-2.46, 2.46]) {
      for (const sz of [-1.56, 1.56]) {
        const castellation = new THREE.Mesh(hiResCyl(0.38, 0.42, 0.64, 12), mats.goldPlating);
        castellation.position.set(sx, 0.54, sz);
        castellation.userData.noEdges = true;
        const fillet = new THREE.Mesh(hiResCyl(0.28, 0.56, 0.34, 12), mats.solderBallSilver);
        fillet.position.set(sx + Math.sign(sx) * 0.16, 0.38, sz + Math.sign(sz) * 0.10);
        fillet.userData.noEdges = true;
        g.add(castellation, fillet);
      }
    }

    // Twin C0G/NP0 0201 load/bypass capacitors + 50-ohm series clock damping resistor + gold shielded clock trace
    for (const cx of [-1.85, 1.85]) {
      const cap = buildSmdPassive(1.1, 0.58, 0.44, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(cx, 0.50, 2.18);
      g.add(cap);
    }
    const dampRes = buildSmdPassive(1.05, 0.54, 0.40, mats.matteBlackAnodized, mats.silverElectrode, 'y');
    dampRes.position.set(0, 0.48, 2.18);
    g.add(cerBase, sealRing, goldLid, dampRes);

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

    const carrierGeo = extrudeHiRes(createRoundedRectShape(9.4, 7.6, 0.7), 0.58, 0.06, 0.06, 2, 16);
    carrierGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(carrierGeo, 9.4, 7.6, 'xz');
    const carrier = new THREE.Mesh(carrierGeo, u.bionzAbfSubstrate);
    g.add(carrier);

    // 8 matched-length Octal-SPI (D0-D7 / SCLK / CS#) copper microstrips fanning to ENIG vias
    for (let i = 0; i < 8; i++) {
      const lx = -3.8 + i * 0.85;
      const tr = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 6.4), i % 2 === 0 ? mats.copperHybridBond : mats.goldPlating);
      tr.position.set(lx, 0.31, 0);
      tr.userData.noEdges = true;
      g.add(tr);
    }

    // Authentic Macronix MX25UM25645G 256Mb 1.8V Octal-SPI NOR Flash with crisp laser-marked top plate!
    const norFlash = buildChipPackage({
      w: 6.2,
      d: 5.0,
      h: 1.05,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: u.bionzEmcSilica,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzNorFlashIc,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    norFlash.position.set(-0.55, 0.85, 0);
    g.add(norFlash);

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

    // Authentic Sony OEM MB GRAPHITE SHEET TOP A (5800) P/N 500490202:
    // High-orientation anisotropic Pyrolytic Graphite Sheet (PGS) with PET protective edge-seal border!
    const contactGeo = createChamferedBoxGeo(PKG_W + 2.4, 0.42, 7.6, 1.0, 0.06, 'y');
    const contactBar = new THREE.Mesh(contactGeo, u.sensorPyroGraphite);
    contactBar.position.set(0, 0, -PKG_W * 0.5 - 1.2);

    // Transparent amber polyimide/PET edge-sealing border preventing conductive graphite flake shedding
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

    // Pink compliant silicone thermal pad (TIM2) laminated on underside of graphite contact bar
    const tim2Pad = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W - 0.6, 0.20, 5.4, 0.6, 0.04, 'y'),
      mats.thermalPadPink
    );
    tim2Pad.position.set(0, -0.28, -PKG_W * 0.5 - 1.2);
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

    // Laminated C1100 copper foil thermal booster core along contact flange
    const cuRibbon = new THREE.Mesh(
      createChamferedBoxGeo(PKG_W - 1.6, 0.16, 4.8, 0.6, 0.02, 'y'),
      u.cfeCopperThermal
    );
    cuRibbon.position.set(0, 0.26, -PKG_W * 0.5 - 1.2);
    cuRibbon.userData.noEdges = true;

    const deck = new THREE.Group();
    deck.position.y = 0.26;
    deck.add(contactBar, petEdgeSeal, tim2Pad, sigmaFold, cuRibbon);

    // Twin precision-stamped SUS301 stainless spring-steel press clips with embossed stiffening ribs & M1.2 Phillips titanium screws!
    for (const sx of [-11.5, 11.5]) {
      const clip = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.56, 6.6, 0.4, 0.06, 'y'),
        mats.stainlessMachined
      );
      clip.position.set(sx, 0.36, -PKG_W * 0.5 - 1.0);
      // Embossed twin stiffening ribs flanking the screw boss
      for (const rz of [-1.8, 1.8]) {
        const rib = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.16, 0.52, 0.1, 0.03, 'y'), mats.stainlessMachined);
        rib.position.set(sx, 0.68, -PKG_W * 0.5 - 1.0 + rz);
        rib.userData.noEdges = true;
        deck.add(rib);
      }
      const washer = new THREE.Mesh(hiResCyl(1.06, 1.06, 0.10, 16), mats.stainlessMachined);
      washer.position.set(sx, 0.66, -PKG_W * 0.5 - 1.0);
      washer.userData.noEdges = true;

      const scr = buildPhillipsScrew(0.76, 0.38, 0.34, 0.9, mats.titaniumRivet, mats.matteBlackAnodized, mats.stainlessMachined);
      scr.rotation.x = Math.PI;
      scr.position.set(sx, 0.72, -PKG_W * 0.5 - 1.0);
      deck.add(clip, washer, scr);
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

    const busGeo = extrudeHiRes(createRoundedRectShape(24.0, 9.6, 0.9), 0.72, 0.06, 0.06, 2, 18);
    busGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(busGeo, 24.0, 9.6, 'xz');
    const busDeck = new THREE.Mesh(busGeo, u.sensorSlvsFlex);
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

    // Hirose/JAE 48-pin shielded micro-B2B sensor-ribbon receptacle with LCP housing, stamped EMI shell & hold-down latches!
    const b2bBody = new THREE.Mesh(
      createChamferedBoxGeo(21.6, 1.15, 2.2, 0.25, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    b2bBody.position.set(0, 0.92, 3.15);
    const b2bShield = makeHiResHorizPlate(
      createFrameShape(22.3, 2.65, 0.35, 20.6, 1.4, 0.2),
      0.46,
      mats.stainlessMachined,
      0.04,
      1,
      14
    );
    b2bShield.position.set(0, 1.38, 3.15);
    // 4 heavy ground-anchor hold-down solder brackets gripping B2B ends
    for (const sx of [-11.05, 11.05]) {
      for (const sz of [2.35, 3.95]) {
        const anchor = new THREE.Mesh(createChamferedBoxGeo(0.65, 1.10, 0.58, 0.08, 0.02, 'y'), mats.stainlessMachined);
        anchor.position.set(sx, 0.92, sz);
        anchor.userData.noEdges = true;
        g.add(anchor);
      }
    }

    // 48 gleaming dual-row gold micro-contact blades inside receptacle bay
    const pinGeo = new THREE.BoxGeometry(0.32, 0.24, 0.42);
    const pinInst = new THREE.InstancedMesh(pinGeo, mats.goldPlating, 48);
    const dmPin = new THREE.Object3D();
    let pi = 0;
    for (let k = 0; k < 24; k++) {
      const px = -9.75 + k * 0.848;
      for (const pz of [2.85, 3.45]) {
        dmPin.position.set(px, 1.48, pz);
        dmPin.updateMatrix();
        pinInst.setMatrixAt(pi++, dmPin.matrix);
      }
    }
    pinInst.instanceMatrix.needsUpdate = true;
    pinInst.userData.noEdges = true;

    // Twin Murata DLM common-mode EMI choke coils (split ferrite body + 4 corner gold electrodes)
    for (const cx of [-10.8, 10.8]) {
      const choke = buildSmdPassive(1.32, 0.96, 0.66, mats.ferriteInductor, mats.goldPlating, 'y', mats.copperHybridBond);
      choke.position.set(cx, 0.70, -2.85);
      g.add(choke);
    }
    g.add(b2bBody, b2bShield, pinInst);

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

    const carrierGeo = extrudeHiRes(createRoundedRectShape(10.8, 13.8, 0.85), 0.68, 0.06, 0.06, 2, 18);
    carrierGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(carrierGeo, 10.8, 13.8, 'xz');
    const carrier = new THREE.Mesh(carrierGeo, u.batBmsPcb);
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

    // QFN-40 TI TDP2004 HDMI 2.1 48Gbps FRL Retimer/Redriver IC with crisp laser-marked top plate!
    const retimer = buildChipPackage({
      w: 5.8,
      d: 5.8,
      h: 0.96,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: u.bionzEmcSilica,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzHdmiRetimerIc,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    retimer.position.set(-1.1, 0.85, -1.8);

    // Twin Semtech RClamp0524P DFN-10 (SLP2510P8) ±15kV ultra-low-cap (<0.25pF) flow-through TVS ESD arrays
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

    // 8 differential FRL AC-coupling 0201 MLCCs + HDMI 5V current-limit SOT-23 load-switch IC!
    for (let i = 0; i < 4; i++) {
      const cap1 = buildSmdPassive(1.05, 0.52, 0.40, mats.smdCeramic, mats.silverElectrode, 'y');
      cap1.position.set(3.45, 0.54, -4.4 + i * 1.95);
      const cap2 = buildSmdPassive(1.05, 0.52, 0.40, mats.smdCeramic, mats.silverElectrode, 'y');
      cap2.position.set(-3.2 + i * 1.42, 0.54, 1.95);
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
    loadSw.position.set(3.35, 0.64, 5.15);
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

    const subDeckGeo = extrudeHiRes(createRoundedRectShape(11.4, 10.6, 0.8), 0.68, 0.06, 0.06, 2, 18);
    subDeckGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(subDeckGeo, 11.4, 10.6, 'xz');
    const subDeck = new THREE.Mesh(subDeckGeo, u.batBmsPcb);
    g.add(subDeck);

    // Segmented isolated copper power islands for VDD2H (1.05V) and VDDQ (0.5V) separated by clean guard moat
    for (const [pz, pMat] of [
      [-2.4, mats.copperHeatSpreader],
      [2.4, mats.goldPlating],
    ] as Array<[number, THREE.Material]>) {
      const plane = new THREE.Mesh(createChamferedBoxGeo(4.4, 0.10, 3.8, 0.18, 0.02, 'y'), pMat);
      plane.position.set(2.85, 0.38, pz);
      plane.userData.noEdges = true;
      g.add(plane);
    }

    // QFN-28 LPDDR5X dedicated sub-PMIC with crisp laser-marked top plate
    const subPmic = buildChipPackage({
      w: 4.8,
      d: 4.8,
      h: 0.94,
      style: 'qfn',
      pinsPerSide: 7,
      bodyMat: u.bionzEmcSilica,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzPmicIc,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    subPmic.position.set(-1.95, 0.82, -0.35);

    // Twin compact low-profile 0.24uH high-frequency shielded metal-composite inductors (VDD2H 1.05V & VDDQ 0.5V)
    for (const iz of [-2.4, 2.4]) {
      const ind = buildMetalAlloyInductor(
        2.65,
        1.18,
        u.bionzInductorR47,
        mats.silverElectrode,
        mats.goldPlating
      );
      ind.position.set(2.85, 0.98, iz);
      g.add(ind);
    }

    // 6 low-ESL 0201 decoupling MLCCs + 2 precision 1% feedback voltage-divider resistors
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(1.15, 0.60, 0.46, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(-3.75 + i * 1.9, 0.56, 3.85);
      g.add(cap);
    }
    for (let i = 0; i < 2; i++) {
      const fbRes = buildSmdPassive(1.05, 0.52, 0.40, mats.matteBlackAnodized, mats.silverElectrode, 'y');
      fbRes.position.set(-3.2 + i * 1.8, 0.54, -3.95);
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

    const padDeckGeo = extrudeHiRes(createRoundedRectShape(14.2, 7.6, 0.75), 0.62, 0.06, 0.06, 2, 16);
    padDeckGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(padDeckGeo, 14.2, 7.6, 'xz');
    const padDeck = new THREE.Mesh(padDeckGeo, u.bionzAbfSubstrate);
    g.add(padDeck);

    // 2×8 thick-ENIG gold factory ATE/JTAG/SWD pogo-pin micro-probe test pads
    // Pin-1 (c=0, r=0) is a square orientation pad; every pad carries a microscopic 4-point crown pogo witness dimple!
    for (let c = 0; c < 8; c++) {
      for (let r = 0; r < 2; r++) {
        const px = -5.6 + c * 1.6;
        const pz = -1.6 + r * 1.9;
        const pad =
          c === 0 && r === 0
            ? new THREE.Mesh(createChamferedBoxGeo(1.06, 0.16, 1.06, 0.08, 0.02, 'y'), mats.goldPlating)
            : new THREE.Mesh(hiResCyl(0.54, 0.54, 0.16, 16), mats.goldPlating);
        pad.position.set(px, 0.38, pz);
        pad.userData.noEdges = true;
        // Microscopic spring pogo-pin crown witness indentation confirming factory ATE pass!
        const pogoMark = new THREE.Mesh(hiResTorus(0.18, 0.045, 6, 10), mats.copperHybridBond);
        pogoMark.rotation.x = Math.PI / 2;
        pogoMark.position.set(px, 0.47, pz);
        pogoMark.userData.noEdges = true;
        g.add(pad, pogoMark);
      }
    }

    // OTP Security eFuse Blow-Link Bank: exposed-window micro-die showing 4 intact + 4 laser-blown fuse craters!
    const efuseIc = buildChipPackage({
      w: 4.6,
      d: 2.05,
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

    // Exposed quartz OTP eFuse window showcasing 8 microscopic fuse bridges (4 blown open = debug permanently locked!)
    const fuseWin = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 1.15), mats.siliconBulk);
    fuseWin.position.set(-3.4, 0.89, 2.35);
    fuseWin.userData.noEdges = true;
    g.add(fuseWin);
    for (let f = 0; f < 8; f++) {
      const fx = -4.95 + f * 0.44;
      const isBlown = f >= 4; // Upper 4 JTAG/SWD debug-lock eFuses visibly blown open!
      if (isBlown) {
        const stubA = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.28), mats.goldPlating);
        stubA.position.set(fx, 0.94, 2.04);
        const stubB = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.28), mats.goldPlating);
        stubB.position.set(fx, 0.94, 2.66);
        const crater = new THREE.Mesh(hiResCyl(0.11, 0.11, 0.09, 8), mats.cinnabarAnodized);
        crater.position.set(fx, 0.93, 2.35);
        stubA.userData.noEdges = true;
        stubB.userData.noEdges = true;
        crater.userData.noEdges = true;
        g.add(stubA, stubB, crater);
      } else {
        const intact = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.86), mats.goldPlating);
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
