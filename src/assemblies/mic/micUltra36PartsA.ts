//@FLOW_MAP|file=src/assemblies/mic/micUltra36PartsA.ts|unit=mic|lines=994|exports=buildMicUltra36PartsA
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createFrameShape, createRoundedRectShape } from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildGoldWirebondLoop,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { finalizeMicUltra36Part, makeTexturedHorizRect36 } from './micUltra36Parts';

/**
 * Phase 36 Part A — MC111–MC130 (+20 ultra-HD sculpted 3D CAD sub-assemblies):
 *  - GROUP 1 (MC111–MC120): Sony ILCE-7M4 Official Service Manual Omitted OEM Hardware
 *  - GROUP 2 (MC121–MC130): MEMS Die/Packaging/Solder/Getter/BIST & ECM Internal Hardware
 */
export function buildMicUltra36PartsA(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // GROUP 1 (MC111–MC120): SONY ILCE-7M4 SERVICE MANUAL OMITTED OEM HARDWARE
  // =========================================================================

  // MC111. Sony OEM JK-1028 Audio Jack Flexible Sub-Board (Ref. 206 / A5022316A)
  {
    const g = new THREE.Group();
    const flexPlate = makeTexturedHorizRect36(4.1, 3.3, 0.22, 0.22, u.mc36Jk1028AudioFlex, 0.03);
    g.add(flexPlate);

    // Red-bezel 3.5mm MIC jack barrel & Green-bezel 3.5mm HP jack barrel mounted on JK-1028
    const jackBodyGeo = createChamferedBoxGeo(1.55, 0.72, 1.02, 0.06);
    const micJackBody = new THREE.Mesh(jackBodyGeo, mats.matteBlackAnodized);
    micJackBody.position.set(-0.85, 0.48, -0.78);
    const hpJackBody = new THREE.Mesh(jackBodyGeo, mats.matteBlackAnodized);
    hpJackBody.position.set(-0.85, 0.48, 0.78);

    const micBezel = new THREE.Mesh(hiResTorus(0.36, 0.08, 12, 24), mats.bodyRecRed);
    micBezel.rotation.y = Math.PI / 2;
    micBezel.position.set(-1.66, 0.50, -0.78);
    const micBore = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.22, 20), mats.goldPlating);
    micBore.rotation.z = Math.PI / 2;
    micBore.position.set(-1.58, 0.50, -0.78);

    const hpBezel = new THREE.Mesh(hiResTorus(0.36, 0.08, 12, 24), u.micGreenJackCollar);
    hpBezel.rotation.y = Math.PI / 2;
    hpBezel.position.set(-1.66, 0.50, 0.78);
    const hpBore = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.22, 20), mats.goldPlating);
    hpBore.rotation.z = Math.PI / 2;
    hpBore.position.set(-1.58, 0.50, 0.78);

    // 10-pin ENIG gold ZIF tail + polyimide insertion stiffener on right wing
    const stiffener = new THREE.Mesh(createChamferedBoxGeo(0.88, 0.14, 1.85, 0.03), mats.polyimideFpc);
    stiffener.position.set(1.62, -0.10, 0);
    const pinGeo = createChamferedBoxGeo(0.56, 0.06, 0.10, 0.01);
    const pins = new THREE.InstancedMesh(pinGeo, mats.goldPlating, 10);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 10; i++) {
      dummy.position.set(1.68, 0.15, -0.76 + i * 0.168);
      dummy.updateMatrix();
      pins.setMatrixAt(i, dummy.matrix);
    }
    pins.instanceMatrix.needsUpdate = true;

    // 4 tiny ESD/ferrite SMD passives along routing bridge
    for (let i = 0; i < 4; i++) {
      const smd = buildSmdPassive(0.32, 0.16, 0.14, mats.ferriteInductor, mats.solderBallSilver);
      smd.position.set(0.35 + (i % 2) * 0.44, 0.20, i < 2 ? -0.52 : 0.52);
      g.add(smd);
    }
    g.add(micJackBody, hpJackBody, micBezel, micBore, hpBezel, hpBore, stiffener, pins);

    parts.push(
      finalizeMicUltra36Part(
        'mc-jk1028-audio-jack-flex',
        111,
        '#d97706',
        g,
        new THREE.Vector3(-15.2, -5.2, -7.2),
        new THREE.Vector3(-88.0, 42.0, 20.0),
        cp
      )
    );
  }

  // MC112. Sony OEM JK HOLDER (89100) Structural Jack Carrier Bracket (Ref. 205 / 502789601)
  {
    const g = new THREE.Group();
    const baseFrame = makeTexturedHorizRect36(4.1, 3.0, 0.34, 0.28, u.micOemHolderResin, 0.05);
    g.add(baseFrame);

    // Twin semicircular anti-torque jack cradle ribs
    for (const zPos of [-0.74, 0.74]) {
      const saddle = new THREE.Mesh(hiResTorus(0.56, 0.16, 12, 24, Math.PI), u.micOemHolderResin);
      saddle.rotation.y = Math.PI / 2;
      saddle.position.set(-0.35, 0.42, zPos);
      g.add(saddle);

      const clampWall = new THREE.Mesh(createChamferedBoxGeo(1.75, 0.62, 0.22, 0.04), u.micOemHolderResin);
      clampWall.position.set(0.18, 0.46, zPos + (zPos < 0 ? -0.52 : 0.52));
      g.add(clampWall);
    }

    // 3 knurled brass M1.7 mounting boss inserts + retaining gussets
    for (const [bx, bz] of [
      [-1.55, -1.08],
      [-1.55, 1.08],
      [1.55, 0.0],
    ]) {
      const boss = new THREE.Mesh(hiResCyl(0.32, 0.34, 0.74, 18), u.micOemHolderResin);
      boss.position.set(bx, 0.38, bz);
      const insert = new THREE.Mesh(hiResCyl(0.20, 0.20, 0.78, 16), mats.brassGear);
      insert.position.set(bx, 0.38, bz);
      const bore = new THREE.Mesh(hiResCyl(0.11, 0.11, 0.82, 12), mats.matteBlackAnodized);
      bore.position.set(bx, 0.38, bz);
      g.add(boss, insert, bore);
    }

    // Molded alignment keying lug + internal strain-relief bridge
    const keyLug = new THREE.Mesh(createChamferedBoxGeo(0.45, 0.48, 1.22, 0.05), u.micOemHolderResin);
    keyLug.position.set(1.12, 0.42, 0);
    g.add(keyLug);

    parts.push(
      finalizeMicUltra36Part(
        'mc-jk-holder-89100',
        112,
        '#334155',
        g,
        new THREE.Vector3(-15.0, -3.4, -7.2),
        new THREE.Vector3(-88.0, 22.0, 20.0),
        cp
      )
    );
  }

  // MC113. Sony OEM JACK PLATE (89100) Stainless Side Reinforcement & Grounding Plate (Ref. 353 / 502789401)
  {
    const g = new THREE.Group();
    const plateShape = createRoundedRectShape(4.0, 2.75, 0.26);
    // Two true circular 3.5mm jack pass-through holes punched through the steel plate
    for (const hx of [-0.95, 0.95]) {
      const hole = new THREE.Path();
      hole.absarc(hx, 0, 0.56, 0, Math.PI * 2, true);
      plateShape.holes.push(hole);
    }
    const plateGeo = extrudeHiRes(plateShape, 0.24, 0.03, 0.03, 2, 24);
    plateGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(plateGeo, 4.0, 2.75, 'xz');
    const mainPlate = new THREE.Mesh(plateGeo, mats.mountStainlessFlange);
    g.add(mainPlate);

    // Formed 90-degree grounding spring-finger tabs along rear flange
    for (let i = 0; i < 4; i++) {
      const tab = new THREE.Mesh(createChamferedBoxGeo(0.42, 0.58, 0.14, 0.02), mats.beCuSpring);
      tab.position.set(-1.35 + i * 0.90, 0.34, -1.24);
      tab.rotation.x = 0.22;
      g.add(tab);
    }

    // 2 stainless M1.7x3.0mm Ref.354 countersunk pan screws + grounding collars
    for (const sx of [-1.72, 1.72]) {
      const screw = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.38, 16), u.micOemScrewSteel);
      screw.position.set(sx, 0.26, 0.95);
      const slot1 = new THREE.Mesh(createChamferedBoxGeo(0.28, 0.06, 0.06, 0.01), mats.matteBlackAnodized);
      slot1.position.set(sx, 0.46, 0.95);
      const slot2 = new THREE.Mesh(createChamferedBoxGeo(0.06, 0.06, 0.28, 0.01), mats.matteBlackAnodized);
      slot2.position.set(sx, 0.46, 0.95);
      g.add(screw, slot1, slot2);
    }

    // Chamfered jack grounding sleeves
    for (const [hx, colMat] of [
      [-0.95, mats.bodyRecRed],
      [0.95, u.micGreenJackCollar],
    ] as [number, THREE.Material][]) {
      const sleeve = new THREE.Mesh(hiResTorus(0.58, 0.08, 10, 24), colMat);
      sleeve.rotation.x = Math.PI / 2;
      sleeve.position.set(hx, 0.28, 0);
      g.add(sleeve);
    }

    parts.push(
      finalizeMicUltra36Part(
        'mc-jack-plate-89100',
        113,
        '#94a3b8',
        g,
        new THREE.Vector3(-15.0, -1.4, -7.2),
        new THREE.Vector3(-88.0, 2.0, 20.0),
        cp
      )
    );
  }

  // MC114. Sony OEM MB JACK SHIELD BLOCK (5800) Audio Jack EMI Faraday Shield (Ref. 564 / 500972301)
  {
    const g = new THREE.Group();
    const blockGeo = createChamferedBoxGeo(3.9, 1.18, 2.75, 0.14);
    applyBoxUVs(blockGeo, 4.0);
    const housing = new THREE.Mesh(blockGeo, u.mc36C7701EmiShieldCan);
    g.add(housing);

    // Deep milled internal Faraday partition wall + acoustic/cable relief notch
    const divider = new THREE.Mesh(createChamferedBoxGeo(0.22, 0.96, 2.45, 0.03), mats.stainlessMachined);
    divider.position.set(0, 0.18, 0);
    const sideSkirtL = new THREE.Mesh(createChamferedBoxGeo(0.24, 0.72, 2.42, 0.04), mats.emiShieldCan);
    sideSkirtL.position.set(-1.85, -0.26, 0);
    const sideSkirtR = sideSkirtL.clone();
    sideSkirtR.position.x = 1.85;

    // 8 beryllium-copper EMI grounding contact fingers around lower perimeter
    const fingerGeo = createChamferedBoxGeo(0.28, 0.32, 0.12, 0.02);
    const fingers = new THREE.InstancedMesh(fingerGeo, mats.beCuSpring, 8);
    const d114 = new THREE.Object3D();
    for (let i = 0; i < 8; i++) {
      const side = i < 4 ? 1 : -1;
      d114.position.set(-1.2 + (i % 4) * 0.8, -0.58, side * 1.32);
      d114.rotation.set(side * 0.25, 0, 0);
      d114.updateMatrix();
      fingers.setMatrixAt(i, d114.matrix);
    }
    fingers.instanceMatrix.needsUpdate = true;

    // Top RF-absorber ferrite elastomer pad
    const rfPad = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.18, 1.85, 0.06), mats.ferriteInductor);
    rfPad.position.set(0, 0.66, 0);
    g.add(divider, sideSkirtL, sideSkirtR, fingers, rfPad);

    parts.push(
      finalizeMicUltra36Part(
        'mc-mb-jack-shield-block',
        114,
        '#cbd5e1',
        g,
        new THREE.Vector3(-14.6, 0.8, -7.2),
        new THREE.Vector3(-88.0, -18.0, 20.0),
        cp
      )
    );
  }

  // MC115. Sony OEM MAGNETIC FIELD CUT PLATE (891) Permalloy Magnetic Flux Shield (Ref. 352 / 502789501)
  {
    const g = new THREE.Group();
    const plate = makeTexturedHorizRect36(4.2, 3.2, 0.26, 0.22, u.mc36MagneticCutPlate, 0.04);
    g.add(plate);

    // Laminated Mu-metal flux-shunt reinforcement ribs + copper eddy-current backing foil
    const cuFoil = new THREE.Mesh(createChamferedBoxGeo(3.9, 0.08, 2.9, 0.02), mats.copperHeatSpreader);
    cuFoil.position.set(0, -0.17, 0);
    g.add(cuFoil);

    for (let i = 0; i < 3; i++) {
      const rib = new THREE.Mesh(createChamferedBoxGeo(3.5, 0.14, 0.24, 0.03), mats.lensPermalloyShield);
      rib.position.set(0, 0.20, -0.92 + i * 0.92);
      g.add(rib);
    }

    // Visualized diverted IBIS VCM magnetic flux shunt arches (subtle cyan permalloy flux guides)
    for (const zOff of [-0.55, 0.55]) {
      const arc = new THREE.Mesh(hiResTorus(1.15, 0.055, 10, 28, Math.PI), mats.softIronYoke);
      arc.position.set(0, 0.24, zOff);
      g.add(arc);
    }

    // 4 corner grounding eyelets
    for (const [cx, cz] of [
      [-1.78, -1.28],
      [1.78, -1.28],
      [-1.78, 1.28],
      [1.78, 1.28],
    ]) {
      const lug = new THREE.Mesh(hiResTorus(0.18, 0.05, 8, 16), mats.goldPlating);
      lug.rotation.x = Math.PI / 2;
      lug.position.set(cx, 0.16, cz);
      g.add(lug);
    }

    parts.push(
      finalizeMicUltra36Part(
        'mc-magnetic-field-cut-plate',
        115,
        '#475569',
        g,
        new THREE.Vector3(-12.5, -6.2, -5.0),
        new THREE.Vector3(-88.0, -38.0, 20.0),
        cp
      )
    );
  }

  // MC116. Sony OEM MIS-2006 21-Pin MI-Shoe Digital Audio Contact Flex & WP Rubber Boot (Ref. 325/324)
  {
    const g = new THREE.Group();
    const fpcDeck = makeTexturedHorizRect36(4.3, 2.55, 0.20, 0.18, u.mc36Mis2006ShoeFpc, 0.03);
    g.add(fpcDeck);

    // 21 sculpted 3D hard-gold spring-cantilever contact pins across front edge
    const pinGeo = createChamferedBoxGeo(0.12, 0.18, 0.62, 0.02);
    const pins = new THREE.InstancedMesh(pinGeo, mats.goldPlating, 21);
    const d116 = new THREE.Object3D();
    for (let i = 0; i < 21; i++) {
      d116.position.set(-1.90 + i * 0.19, 0.22, 0.72);
      d116.rotation.set(-0.18, 0, 0);
      d116.updateMatrix();
      pins.setMatrixAt(i, d116.matrix);
    }
    pins.instanceMatrix.needsUpdate = true;

    // Molded Ref.324 (501695501) MI SHOE FPC WP RUBBER waterproof boot collar around base
    const bootShape = createFrameShape(4.45, 1.12, 0.22, 3.85, 0.56, 0.14);
    const bootGeo = extrudeHiRes(bootShape, 0.42, 0.05, 0.05, 2, 16);
    bootGeo.rotateX(-Math.PI / 2);
    const wpBoot = new THREE.Mesh(bootGeo, mats.epdmGasket);
    wpBoot.position.set(0, -0.02, -0.45);

    // Digital audio pins 8-12 anodized cyan marker clip
    const digBar = new THREE.Mesh(createChamferedBoxGeo(0.98, 0.12, 0.22, 0.02), mats.mountShimBlue);
    digBar.position.set(-0.19, 0.18, 0.16);
    g.add(pins, wpBoot, digBar);

    parts.push(
      finalizeMicUltra36Part(
        'mc-mis2006-shoe-contact-fpc',
        116,
        '#eab308',
        g,
        new THREE.Vector3(-4.5, 4.8, -8.5),
        new THREE.Vector3(-88.0, 42.0, -20.0),
        cp
      )
    );
  }

  // MC117. Sony OEM MI SHOE SHELL PLATE / SPRING PLATE / SHOE CAP (Ref. 327 / 331 / 9)
  {
    const g = new THREE.Group();
    // Stainless MI-Shoe base rail plate (500294302)
    const basePlate = new THREE.Mesh(createChamferedBoxGeo(4.1, 0.24, 3.6, 0.08), mats.mountStainlessFlange);
    g.add(basePlate);

    // Twin overhanging stainless hot-shoe side rails
    for (const sx of [-1.62, 1.62]) {
      const upright = new THREE.Mesh(createChamferedBoxGeo(0.36, 0.68, 3.4, 0.05), mats.mountStainlessFlange);
      upright.position.set(sx, 0.40, 0);
      const lip = new THREE.Mesh(createChamferedBoxGeo(0.78, 0.22, 3.4, 0.04), mats.mountStainlessFlange);
      lip.position.set(sx * 0.86, 0.66, 0);
      g.add(upright, lip);
    }

    // Phosphor-bronze / spring-steel anti-rattle MI SHOE SPRING PLATE (500294502)
    for (const sx of [-0.96, 0.96]) {
      const springLeaf = new THREE.Mesh(createChamferedBoxGeo(0.46, 0.10, 2.25, 0.02), mats.beCuSpring);
      springLeaf.position.set(sx, 0.30, 0.12);
      springLeaf.rotation.x = 0.14;
      g.add(springLeaf);
    }

    // 4 special-head Ref.328 M1.7x3.3mm MI-Shoe mounting screws
    for (const [sx, sz] of [
      [-1.12, -1.25],
      [1.12, -1.25],
      [-1.12, 1.25],
      [1.12, 1.25],
    ]) {
      const sc = new THREE.Mesh(hiResCyl(0.20, 0.20, 0.28, 14), u.micOemScrewSteel);
      sc.position.set(sx, 0.22, sz);
      g.add(sc);
    }

    // Translucent dark-resin Ref.9 SHOE CAP (443873412) hovering cleanly above rails
    const shoeCap = new THREE.Mesh(createChamferedBoxGeo(3.65, 0.28, 2.85, 0.10), u.micOemHolderResin);
    shoeCap.position.set(0, 1.05, 0);
    g.add(shoeCap);

    parts.push(
      finalizeMicUltra36Part(
        'mc-mi-shoe-shell-spring-cap',
        117,
        '#cbd5e1',
        g,
        new THREE.Vector3(0.0, 5.4, -8.5),
        new THREE.Vector3(-88.0, 22.0, -20.0),
        cp
      )
    );
  }

  // MC118. Sony OEM SIDE CABINET Triple-Lip Hinged Weatherproof MIC/HP Jack Cover Door (Ref. 8 / X50022801)
  {
    const g = new THREE.Group();
    const doorBody = new THREE.Mesh(createChamferedBoxGeo(3.6, 0.44, 3.8, 0.16), u.micRubberBootBlack);
    g.add(doorBody);

    // Molded triple-lip weather-sealing EPDM perimeter gasket ridge on underside
    const lipShape = createFrameShape(3.15, 3.35, 0.24, 2.55, 2.75, 0.16);
    const lipGeo = extrudeHiRes(lipShape, 0.36, 0.04, 0.04, 2, 16);
    lipGeo.rotateX(-Math.PI / 2);
    const innerLip = new THREE.Mesh(lipGeo, mats.epdmGasket);
    innerLip.position.set(0, -0.34, 0);
    g.add(innerLip);

    // Twin cylindrical weather-plug bosses entering MIC & HP jack recesses
    const micPlug = new THREE.Mesh(hiResCyl(0.46, 0.42, 0.42, 20), mats.epdmGasket);
    micPlug.position.set(0, -0.40, -0.82);
    const hpPlug = new THREE.Mesh(hiResCyl(0.46, 0.42, 0.42, 20), mats.epdmGasket);
    hpPlug.position.set(0, -0.40, 0.82);

    // Iconic red MIC & green HP external badge rings + textured thumb-pull grip ridge + living hinge tether
    const redRing = new THREE.Mesh(hiResTorus(0.42, 0.08, 10, 22), mats.bodyRecRed);
    redRing.rotation.x = Math.PI / 2;
    redRing.position.set(0, 0.25, -0.82);
    const greenRing = new THREE.Mesh(hiResTorus(0.42, 0.08, 10, 22), u.micGreenJackCollar);
    greenRing.rotation.x = Math.PI / 2;
    greenRing.position.set(0, 0.25, 0.82);

    const hingeArm = new THREE.Mesh(createChamferedBoxGeo(0.75, 0.24, 0.72, 0.06), mats.epdmGasket);
    hingeArm.position.set(1.98, -0.06, 0);
    const hingePin = new THREE.Mesh(hiResCyl(0.18, 0.18, 1.35, 14), mats.stainlessMachined);
    hingePin.rotation.x = Math.PI / 2;
    hingePin.position.set(2.22, -0.06, 0);
    g.add(micPlug, hpPlug, redRing, greenRing, hingeArm, hingePin);

    parts.push(
      finalizeMicUltra36Part(
        'mc-side-jack-cover-door',
        118,
        '#ef4444',
        g,
        new THREE.Vector3(-16.2, -3.2, -5.0),
        new THREE.Vector3(-88.0, 2.0, -20.0),
        cp
      )
    );
  }

  // MC119. Sony OEM SP901 1.0 cm Internal Monitor Micro-Speaker + SPEAKER GND & SP INSULATION Sheets
  {
    const g = new THREE.Group();
    // 10mm round micro-speaker steel basket (Ref. SP901 / 185921011)
    const basket = new THREE.Mesh(hiResCyl(1.75, 1.55, 0.78, 32), mats.shutterChassis);
    const rim = new THREE.Mesh(hiResTorus(1.74, 0.10, 12, 32), mats.mountStainlessFlange);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.38;

    // Domed translucent PEI acoustic diaphragm + center dust cap + N52 neodymium magnet + copper voice coil
    const dome = new THREE.Mesh(hiResSphere(1.18, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.42), mats.polyimideFpc);
    dome.scale.set(1, 0.42, 1);
    dome.position.y = 0.24;
    const voiceCoil = new THREE.Mesh(hiResTorus(0.72, 0.12, 10, 24), mats.copperCoil);
    voiceCoil.rotation.x = Math.PI / 2;
    voiceCoil.position.y = 0.06;
    const neoMag = new THREE.Mesh(hiResCyl(0.58, 0.58, 0.42, 22), mats.neodymiumMagnet);
    neoMag.position.y = -0.14;

    // Ref. 414 SPEAKER GND SHEET (501696001) copper EMI foil & Ref. 415 SP INSULATION SHEET (500463101)
    const gndSheet = new THREE.Mesh(createChamferedBoxGeo(3.6, 0.08, 3.4, 0.04), mats.copperHeatSpreader);
    gndSheet.position.y = -0.56;
    const insulSheet = new THREE.Mesh(createChamferedBoxGeo(3.85, 0.10, 3.65, 0.06), mats.matteBlackAnodized);
    insulSheet.position.y = -0.76;

    // Twin solder spring lead tabs
    for (const sx of [-0.55, 0.55]) {
      const tab = new THREE.Mesh(createChamferedBoxGeo(0.28, 0.12, 0.75, 0.02), mats.goldPlating);
      tab.position.set(sx, -0.32, 1.72);
      g.add(tab);
    }
    g.add(basket, rim, dome, voiceCoil, neoMag, gndSheet, insulSheet);

    parts.push(
      finalizeMicUltra36Part(
        'mc-sp901-monitor-speaker-gnd',
        119,
        '#f97316',
        g,
        new THREE.Vector3(-11.0, -7.8, -8.2),
        new THREE.Vector3(-88.0, -18.0, -20.0),
        cp
      )
    );
  }

  // MC120. Sony OEM REAR MUFFLE CUSHION A/B (502863201/502863301) & SH-1035 SUS304 MEMS-Zone Stiffener
  {
    const g = new THREE.Group();
    // 0.2mm precision SUS304 stainless backing stiffener bonded under SH-1035 MEMS solder zone
    const stiffener = new THREE.Mesh(createChamferedBoxGeo(4.1, 0.22, 2.8, 0.14), mats.mountStainlessFlange);
    stiffener.position.y = -0.42;

    // Acoustic port pass-through + alignment tooling pins on SUS304 stiffener
    const portRing = new THREE.Mesh(hiResTorus(0.46, 0.08, 10, 22), mats.goldPlating);
    portRing.rotation.x = Math.PI / 2;
    portRing.position.set(0, -0.28, 0);

    // Dual-layer Rear Muffle Cushion A (high-density Poron) & B (open-cell urethane cavity wedge)
    const cushionA = makeTexturedHorizRect36(3.85, 2.55, 0.54, 0.22, u.micAcousticFelt, 0.08);
    cushionA.position.y = 0.08;
    const cushionB = makeTexturedHorizRect36(3.35, 2.15, 0.42, 0.18, u.micTeraoka631sTape, 0.06);
    cushionB.position.y = 0.58;

    // 4 sculpted acoustic standing-wave absorber ridges across Cushion B
    for (let i = 0; i < 4; i++) {
      const wedge = new THREE.Mesh(createChamferedBoxGeo(0.46, 0.26, 1.85, 0.05), u.micAcousticFelt);
      wedge.position.set(-1.14 + i * 0.76, 0.88, 0);
      g.add(wedge);
    }
    g.add(stiffener, portRing, cushionA, cushionB);

    parts.push(
      finalizeMicUltra36Part(
        'mc-rear-muffle-cushion-insul',
        120,
        '#64748b',
        g,
        new THREE.Vector3(-6.0, -7.2, -9.2),
        new THREE.Vector3(-88.0, -38.0, -20.0),
        cp
      )
    );
  }

  // =========================================================================
  // GROUP 2 (MC121–MC130): MEMS DIE/PACKAGING/SOLDER/GETTER & ECM INTERNALS
  // =========================================================================

  // MC121. MEMS Bottom-Port 360° Annular SAC305 Acoustic Seal Ring & 4-Aperture NSMD Pad (AN557 / WAN0284)
  {
    const g = new THREE.Group();
    const pcbPad = makeTexturedHorizRect36(4.1, 4.1, 0.32, 0.24, u.mc36BottomPortSolderRing, 0.04);
    g.add(pcbPad);

    // 4-quadrant stencil-printed SAC305 annular solder seal fillets around central 0.8mm sound hole
    for (let q = 0; q < 4; q++) {
      const arc = new THREE.Mesh(
        hiResTorus(1.12, 0.20, 12, 18, Math.PI * 0.44),
        mats.solderBallSilver
      );
      arc.rotation.x = Math.PI / 2;
      arc.rotation.z = q * (Math.PI / 2) + 0.09;
      arc.position.y = 0.28;
      g.add(arc);
    }

    // Gold ENIG plated through-hole acoustic barrel lining
    const barrel = new THREE.Mesh(hiResCyl(0.56, 0.56, 0.62, 24, true), mats.goldPlating);
    barrel.position.y = 0.06;
    const innerVoid = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.66, 20), mats.matteBlackAnodized);
    innerVoid.position.y = 0.06;

    // 16 perimeter EMI stitching micro-vias
    const viaGeo = hiResCyl(0.09, 0.09, 0.38, 10);
    const vias = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 16);
    const d121 = new THREE.Object3D();
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      d121.position.set(Math.cos(a) * 1.64, 0.16, Math.sin(a) * 1.64);
      d121.updateMatrix();
      vias.setMatrixAt(i, d121.matrix);
    }
    vias.instanceMatrix.needsUpdate = true;
    g.add(barrel, innerVoid, vias);

    parts.push(
      finalizeMicUltra36Part(
        'mc-bottom-port-solder-ring-nsmd',
        121,
        '#10b981',
        g,
        new THREE.Vector3(-12.2, -1.6, 3.2),
        new THREE.Vector3(88.0, 42.0, 20.0),
        cp
      )
    );
  }

  // MC122. MEMS Footprint U-Shaped Milled PCB Stress-Relief Routing Slits
  {
    const g = new THREE.Group();
    // Outer rigid host PCB frame with U-shaped milled isolation slots leaving a cantilevered MEMS island
    const outerFrame = createFrameShape(4.2, 4.0, 0.22, 2.95, 2.75, 0.14);
    const outerGeo = extrudeHiRes(outerFrame, 0.34, 0.04, 0.04, 2, 16);
    outerGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(outerGeo, 4.2, 4.0, 'xz');
    const hostPcb = new THREE.Mesh(outerGeo, u.micAudioMainPcb);
    g.add(hostPcb);

    // Floating stress-isolated inner MEMS peninsula connected via single narrow flexible bridge
    const island = makeTexturedHorizRect36(2.28, 2.15, 0.34, 0.16, u.micStarGroundPcb, 0.04);
    island.position.set(0, 0, -0.05);
    const neckBridge = new THREE.Mesh(createChamferedBoxGeo(0.76, 0.32, 0.72, 0.03), u.micAudioMainPcb);
    neckBridge.position.set(0, 0.16, 1.24);

    // Gold differential traces routed cleanly across the stress-relief bridge
    for (const tx of [-0.20, 0, 0.20]) {
      const tr = new THREE.Mesh(createChamferedBoxGeo(0.08, 0.05, 1.25, 0.01), mats.goldPlating);
      tr.position.set(tx, 0.36, 1.05);
      g.add(tr);
    }

    // Mini MEMS LGA package seated on the isolated peninsula
    const memsCan = new THREE.Mesh(createChamferedBoxGeo(1.42, 0.44, 1.12, 0.06), u.micMemsFaradayLid);
    memsCan.position.set(0, 0.56, -0.08);
    g.add(island, neckBridge, memsCan);

    parts.push(
      finalizeMicUltra36Part(
        'mc-pcb-stress-relief-slots',
        122,
        '#059669',
        g,
        new THREE.Vector3(-12.2, -3.4, 3.2),
        new THREE.Vector3(88.0, 22.0, 20.0),
        cp
      )
    );
  }

  // MC123. MEMS ASIC Opaque Black Epoxy Glob-Top & Top-Metal Photoelectric Light Shield
  {
    const g = new THREE.Group();
    // LGA ceramic interposer base
    const base = makeTexturedHorizRect36(4.1, 3.3, 0.28, 0.18, u.micCeramicLgaSubstrate, 0.04);
    g.add(base);

    // Exposed MEMS silicon sensor die on left
    const memsDie = new THREE.Mesh(createChamferedBoxGeo(1.38, 0.32, 1.38, 0.04), u.micDrieSiliconBackplate);
    memsDie.position.set(-0.98, 0.30, 0);
    const portRing = new THREE.Mesh(hiResTorus(0.42, 0.06, 10, 22), mats.goldPlating);
    portRing.rotation.x = Math.PI / 2;
    portRing.position.set(-0.98, 0.48, 0);

    // Opaque carbon-black OD>6.0 domed epoxy glob-top completely encapsulating the ASIC die on right
    const globGeo = hiResSphere(1.18, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.52);
    applyPlanarUVs(globGeo, 2.4, 2.4, 'xz');
    const globDome = new THREE.Mesh(globGeo, u.mc36GlobTopLightShield);
    globDome.scale.set(1.05, 0.62, 1.12);
    globDome.position.set(0.76, 0.24, 0);

    // 4 gold wirebond bridges emerging from glob-top skirt to MEMS die
    for (let i = 0; i < 4; i++) {
      const zPos = -0.42 + i * 0.28;
      const wb = buildGoldWirebondLoop(
        new THREE.Vector3(-0.34, 0.44, zPos),
        new THREE.Vector3(0.18, 0.46, zPos),
        0.38,
        0.028,
        mats.goldPlating
      );
      g.add(wb);
    }

    // Blocked strobe photon deflection markers above dome
    for (let i = 0; i < 3; i++) {
      const ray = new THREE.Mesh(hiResCyl(0.04, 0.04, 0.56, 8), mats.irLedLens);
      ray.position.set(0.45 + i * 0.32, 1.14, 0);
      ray.rotation.z = -0.45;
      g.add(ray);
    }
    g.add(memsDie, portRing, globDome);

    parts.push(
      finalizeMicUltra36Part(
        'mc-asic-black-globtop-lightshield',
        123,
        '#18181b',
        g,
        new THREE.Vector3(-12.2, 0.6, 5.2),
        new THREE.Vector3(88.0, 2.0, 20.0),
        cp
      )
    );
  }

  // MC124. SDM Wafer-Level AuSn Eutectic Hermetic Seal Frame & Ti/Zr/V NEG Vacuum Getter Film
  {
    const g = new THREE.Group();
    const waferBase = makeTexturedHorizRect36(4.0, 4.0, 0.34, 0.22, u.mc36NegGetterVacuumSeal, 0.04);
    g.add(waferBase);

    // Sculpted 3D Au80/Sn20 eutectic gold-tin hermetic weld bezel frame
    const sealShape = createFrameShape(3.65, 3.65, 0.16, 2.85, 2.85, 0.10);
    const sealGeo = extrudeHiRes(sealShape, 0.42, 0.04, 0.04, 2, 16);
    sealGeo.rotateX(-Math.PI / 2);
    const ausnFrame = new THREE.Mesh(sealGeo, mats.goldPlating);
    ausnFrame.position.y = 0.24;

    // Porous Ti/Zr/V Non-Evaporable Getter (NEG) nano-pillar bed inside vacuum cavity
    const pillarGeo = hiResCyl(0.08, 0.10, 0.28, 8);
    const pillars = new THREE.InstancedMesh(pillarGeo, mats.titaniumRivet, 25);
    const d124 = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        d124.position.set(-0.96 + c * 0.48, 0.42, -0.96 + r * 0.48);
        d124.updateMatrix();
        pillars.setMatrixAt(idx++, d124.matrix);
      }
    }
    pillars.instanceMatrix.needsUpdate = true;

    // Translucent upper silicon sealing cap wafer hovering slightly above for cutaway visibility
    const capWafer = new THREE.Mesh(createChamferedBoxGeo(3.65, 0.14, 3.65, 0.10), mats.coverGlass);
    capWafer.position.y = 0.88;
    g.add(ausnFrame, pillars, capWafer);

    parts.push(
      finalizeMicUltra36Part(
        'mc-sdm-ausn-getter-vacuum-seal',
        124,
        '#f59e0b',
        g,
        new THREE.Vector3(-12.2, 2.4, 3.2),
        new THREE.Vector3(88.0, -18.0, 20.0),
        cp
      )
    );
  }

  // MC125. MEMS Die Si3N4 Passivation & Ti/Pt/Au Under-Bump Metallurgy (UBM) Bond Pad Stack
  {
    const g = new THREE.Group();
    const siSub = makeTexturedHorizRect36(4.0, 3.8, 0.36, 0.16, u.micBoschScallopSi, 0.04);
    g.add(siSub);

    // Conformal iridescent Si3N4 passivation layer with 4 opened bond-pad windows
    const passShape = createRoundedRectShape(3.75, 3.55, 0.14);
    for (const [px, pz] of [
      [-1.02, -0.92],
      [1.02, -0.92],
      [-1.02, 0.92],
      [1.02, 0.92],
    ]) {
      const hPath = new THREE.Path();
      hPath.absarc(px, pz, 0.56, 0, Math.PI * 2, true);
      passShape.holes.push(hPath);
    }
    const passGeo = extrudeHiRes(passShape, 0.18, 0.02, 0.02, 2, 18);
    passGeo.rotateX(-Math.PI / 2);
    const sinPass = new THREE.Mesh(passGeo, mats.siliconNitrideBall);
    sinPass.position.y = 0.28;
    g.add(sinPass);

    // 4 multi-layer Ti / Pt / Au UBM anti-purple-plague pad stacks + gold ball bonds
    for (const [px, pz] of [
      [-1.02, -0.92],
      [1.02, -0.92],
      [-1.02, 0.92],
      [1.02, 0.92],
    ]) {
      const tiLayer = new THREE.Mesh(hiResCyl(0.50, 0.50, 0.12, 20), mats.titaniumRivet);
      tiLayer.position.set(px, 0.34, pz);
      const ptBarrier = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.12, 20), mats.stainlessMachined);
      ptBarrier.position.set(px, 0.46, pz);
      const auCap = new THREE.Mesh(hiResCyl(0.42, 0.42, 0.12, 20), mats.goldPlating);
      auCap.position.set(px, 0.58, pz);
      const ball = new THREE.Mesh(hiResSphere(0.18, 16, 12), mats.goldPlating);
      ball.position.set(px, 0.72, pz);
      g.add(tiLayer, ptBarrier, auCap, ball);
    }

    parts.push(
      finalizeMicUltra36Part(
        'mc-mems-ubm-passivation-stack',
        125,
        '#fbbf24',
        g,
        new THREE.Vector3(-10.0, 2.2, 5.2),
        new THREE.Vector3(88.0, -38.0, 20.0),
        cp
      )
    );
  }

  // MC126. MEMS Built-In Self-Test (BIST) Electrostatic Actuation & Blocked-Port Diagnostic Circuit
  {
    const g = new THREE.Group();
    const carrier = makeTexturedHorizRect36(4.1, 3.6, 0.28, 0.20, u.micMemsAsicDie, 0.04);
    g.add(carrier);

    // Split electrostatic BIST actuation electrode ring + center sense electrode
    const outerAct = new THREE.Mesh(hiResTorus(1.18, 0.16, 12, 32), mats.goldPlating);
    outerAct.rotation.x = Math.PI / 2;
    outerAct.position.y = 0.40;
    const innerSense = new THREE.Mesh(hiResCyl(0.76, 0.76, 0.22, 26), mats.siliconSensorDie);
    innerSense.position.y = 0.40;

    // 4 floating BIST test-pulse excitation coils/probes
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const probe = new THREE.Mesh(hiResCyl(0.12, 0.16, 0.54, 12), mats.copperHybridBond);
      probe.position.set(Math.cos(a) * 1.48, 0.46, Math.sin(a) * 1.48);
      g.add(probe);
    }

    // Diagnostic micro-ASIC comparator die + 3 trim SMD capacitors
    const bistIc = buildChipPackage({ w: 1.15, d: 0.95, h: 0.26, style: 'qfn', pinsPerSide: 4, bodyMat: u.micCodecQfnPackage, leadMat: mats.goldPlating });
    bistIc.position.set(0, 0.68, 0);
    g.add(outerAct, innerSense, bistIc);

    parts.push(
      finalizeMicUltra36Part(
        'mc-mems-bist-electrostatic-test',
        126,
        '#06b6d4',
        g,
        new THREE.Vector3(-10.0, -1.8, 5.2),
        new THREE.Vector3(88.0, 42.0, -20.0),
        cp
      )
    );
  }

  // MC127. PDM Stereo L/R Select Rising/Falling-Edge Tri-State Multiplexer (2-Mic 1-Wire Bus)
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect36(4.3, 3.0, 0.24, 0.20, u.micAudioMainPcb, 0.04);
    g.add(pcb);

    // Left (L/R=GND, Rising Edge) & Right (L/R=VDD, Falling Edge) twin MEMS digital packages
    const micL = new THREE.Mesh(createChamferedBoxGeo(1.18, 0.42, 0.96, 0.06), u.micMemsFaradayLid);
    micL.position.set(-1.26, 0.36, -0.58);
    const micR = new THREE.Mesh(createChamferedBoxGeo(1.18, 0.42, 0.96, 0.06), u.micMemsFaradayLid);
    micR.position.set(1.26, 0.36, -0.58);

    // L/R pull-down (GND) & pull-up (VDD) 0201 configuration resistors
    const rLeft = buildSmdPassive(0.36, 0.18, 0.16, mats.matteBlackAnodized, mats.solderBallSilver);
    rLeft.position.set(-1.26, 0.22, 0.45);
    const rRight = buildSmdPassive(0.36, 0.18, 0.16, mats.bodyRecRed, mats.solderBallSilver);
    rRight.position.set(1.26, 0.22, 0.45);

    // Shared single PDM DATA bus bar (gold) & shared PDM CLK bus bar (copper)
    const dataBus = new THREE.Mesh(createChamferedBoxGeo(3.4, 0.08, 0.18, 0.02), mats.goldPlating);
    dataBus.position.set(0, 0.20, 0.96);
    const clkBus = new THREE.Mesh(createChamferedBoxGeo(3.4, 0.08, 0.18, 0.02), mats.copperCoil);
    clkBus.position.set(0, 0.20, 1.24);

    // Central tri-state edge-mux timing gate IC
    const muxIc = buildChipPackage({ w: 0.95, d: 0.95, h: 0.28, style: 'qfn', pinsPerSide: 4, bodyMat: u.micCodecQfnPackage, leadMat: mats.goldPlating });
    muxIc.position.set(0, 0.28, 0.15);
    g.add(micL, micR, rLeft, rRight, dataBus, clkBus, muxIc);

    parts.push(
      finalizeMicUltra36Part(
        'mc-pdm-lr-edge-mux-tristate',
        127,
        '#38bdf8',
        g,
        new THREE.Vector3(-4.0, 2.2, 5.4),
        new THREE.Vector3(88.0, 22.0, -20.0),
        cp
      )
    );
  }

  // MC128. Laser Die-Cut 3M 9495LE (300LSE, 0.17 mm) Acoustic PSA Ring & Conductive Ni/Cu EMI Fabric Gasket
  {
    const g = new THREE.Group();
    // Translucent 0.17mm 3M 9495LE PET-carrier double-coated acrylic PSA ring with alignment pull-tab
    const psaShape = createFrameShape(3.9, 3.6, 0.42, 2.1, 1.9, 0.30);
    const psaGeo = extrudeHiRes(psaShape, 0.18, 0.02, 0.02, 2, 20);
    psaGeo.rotateX(-Math.PI / 2);
    const psaRing = new THREE.Mesh(psaGeo, mats.thermalTransferTape);
    psaRing.position.y = 0.48;

    // Alignment fiducial peel tab
    const pullTab = new THREE.Mesh(createChamferedBoxGeo(0.85, 0.12, 0.65, 0.04), mats.polyimideFpc);
    pullTab.position.set(2.15, 0.54, 0);

    // Lower conductive Ni/Cu-plated woven fabric-over-PU foam EMI compression gasket
    const emiShape = createFrameShape(4.0, 3.7, 0.36, 2.35, 2.15, 0.26);
    const emiGeo = extrudeHiRes(emiShape, 0.46, 0.06, 0.06, 2, 18);
    emiGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(emiGeo, 4.0, 3.7, 'xz');
    const emiFoam = new THREE.Mesh(emiGeo, u.micStainlessWovenMesh);
    emiFoam.position.y = -0.22;

    // Adhesive release liner rim ring
    const liner = new THREE.Mesh(hiResTorus(1.12, 0.08, 10, 28), mats.goldPlating);
    liner.rotation.x = Math.PI / 2;
    liner.position.y = 0.62;
    g.add(psaRing, pullTab, emiFoam, liner);

    parts.push(
      finalizeMicUltra36Part(
        'mc-3m-9495le-diecut-psa-ring',
        128,
        '#a8a29e',
        g,
        new THREE.Vector3(0.0, 4.8, 4.2),
        new THREE.Vector3(88.0, 2.0, -20.0),
        cp
      )
    );
  }

  // MC129. ECM Capsule Front Woven Black Acoustic Cloth Screen Disc & 360° Rolled-Aluminum Crimp Flange
  {
    const g = new THREE.Group();
    // Spun-aluminum ECM cylindrical capsule shell with rolled 360° rear crimp lip
    const shell = new THREE.Mesh(hiResCyl(1.88, 1.88, 1.05, 36, true), u.micEcmSpunAluminum);
    const frontFace = new THREE.Mesh(hiResTorus(1.52, 0.36, 14, 36), u.micEcmSpunAluminum);
    frontFace.rotation.x = Math.PI / 2;
    frontFace.position.y = 0.44;

    // 360-degree rolled rear crimp-lock flange clamping the internal JFET PCB
    const crimpFlange = new THREE.Mesh(hiResTorus(1.76, 0.16, 14, 36), mats.stainlessMachined);
    crimpFlange.rotation.x = Math.PI / 2;
    crimpFlange.position.y = -0.48;

    // Precision die-cut black non-woven acoustic resistance cloth disc glued over front aperture
    const clothGeo = hiResCyl(1.68, 1.68, 0.12, 32);
    applyPlanarUVs(clothGeo, 3.36, 3.36, 'xz');
    const clothDisc = new THREE.Mesh(clothGeo, u.mc36EcmAcousticCloth);
    clothDisc.position.y = 0.64;

    // Silver-epoxy perimeter conductive grounding bead ring
    const agBead = new THREE.Mesh(hiResTorus(1.56, 0.08, 10, 32), mats.sinteredSilver);
    agBead.rotation.x = Math.PI / 2;
    agBead.position.y = -0.36;
    g.add(shell, frontFace, crimpFlange, clothDisc, agBead);

    parts.push(
      finalizeMicUltra36Part(
        'mc-ecm-front-acoustic-cloth-crimp',
        129,
        '#27272a',
        g,
        new THREE.Vector3(14.2, 1.2, 4.2),
        new THREE.Vector3(88.0, -18.0, -20.0),
        cp
      )
    );
  }

  // MC130. ECM Solderless Gold Backplate-to-JFET Compression Contact Ring & Parylene-C Humidity Coat
  {
    const g = new THREE.Group();
    // Round green JFET ECM PCB substrate
    const ecmPcbGeo = hiResCyl(1.82, 1.82, 0.24, 32);
    applyPlanarUVs(ecmPcbGeo, 3.64, 3.64, 'xz');
    const ecmPcb = new THREE.Mesh(ecmPcbGeo, u.micEcmJfetPcb);
    ecmPcb.position.y = -0.36;

    // Translucent pinhole-free CVD Parylene-C conformal moisture barrier dome over 1 GΩ JFET gate
    const paryleneGeo = hiResCyl(1.76, 1.76, 0.18, 32);
    const paryleneCoat = new THREE.Mesh(paryleneGeo, mats.coverGlass);
    paryleneCoat.position.y = -0.14;

    // Solderless gold-plated phosphor-bronze wave-spring compression contact ring (zero heat on FEP!)
    const contactRing = new THREE.Mesh(hiResTorus(1.18, 0.14, 14, 32), mats.goldPlating);
    contactRing.rotation.x = Math.PI / 2;
    contactRing.position.y = 0.28;

    // 6 raised elastic compression spring fingers bridging brass backplate <-> JFET gate pad
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const springFinger = new THREE.Mesh(createChamferedBoxGeo(0.46, 0.10, 0.22, 0.02), mats.beCuSpring);
      springFinger.position.set(Math.cos(a) * 1.18, 0.44, Math.sin(a) * 1.18);
      springFinger.rotation.set(0, -a, 0.28);
      g.add(springFinger);
    }

    // Perforated brass backplate floating above the solderless contact ring
    const bpGeo = hiResCyl(1.55, 1.55, 0.16, 30);
    applyPlanarUVs(bpGeo, 3.1, 3.1, 'xz');
    const backplate = new THREE.Mesh(bpGeo, u.micEcmBrassBackplate);
    backplate.position.y = 0.72;
    g.add(ecmPcb, paryleneCoat, contactRing, backplate);

    parts.push(
      finalizeMicUltra36Part(
        'mc-ecm-solderless-contact-parylene',
        130,
        '#facc15',
        g,
        new THREE.Vector3(14.2, -1.2, 4.2),
        new THREE.Vector3(88.0, -38.0, -20.0),
        cp
      )
    );
  }

  return parts;
}
