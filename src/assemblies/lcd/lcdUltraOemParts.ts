//@FLOW_MAP|file=src/assemblies/lcd/lcdUltraOemParts.ts|unit=lcd|lines=1396|exports=buildLcdUltraOemParts
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
  buildPhillipsScrew,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';
import { LCD_CENTER_X, LCD_CENTER_Y, LCD_HEIGHT, LCD_WIDTH } from './lcdParts';

function finalizeLcdUltraPart(
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
    subsystem: 'lcd',
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
 * Phase 34 Part 1 + Phase 36 Ultra-HD Overhaul:
 * Build 30 Standalone-Only Rear 4-Axis LCD Monitor OEM Hardware,
 * Cover-Glass/Touch Optics, IPS Cell Sub-Micron Layers & BLU Separation Parts (D52–D81).
 */
export function buildLcdUltraOemParts(
  mats: MaterialLibrary
): { parts: CadPart[]; monitorParts: CadPart[] } {
  const parts: CadPart[] = [];
  const monitorParts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;
  const hx = LCD_CENTER_X + LCD_WIDTH * 0.5 + 1.8;

  const cellW = LCD_WIDTH - 4.4;
  const cellH = LCD_HEIGHT - 4.4;
  const blW = LCD_WIDTH - 5.2;
  const blH = LCD_HEIGHT - 5.2;

  const pushPart = (p: CadPart, attachedToMonitor: boolean) => {
    parts.push(p);
    if (attachedToMonitor) monitorParts.push(p);
  };

  // =========================================================================
  // GROUP A: Sony ILCE-7RM5 / 7M4 / 1M2 / 7M5 Official OEM 4-Axis & Rear-Bay Hardware (D52–D64)
  // =========================================================================

  // D52: Sony PCK-LG3 Optical Hard-Glass Screen Protector Sheet (73.2 x 55.9 x 0.6 mm, 9H)
  {
    const g = new THREE.Group();
    const protW = LCD_WIDTH - 1.2;
    const protH = LCD_HEIGHT - 1.0;
    const glassGeo = extrudeHiRes(createRoundedRectShape(protW, protH, 2.8), 0.34, 0.08, 0.08, 2, 22);
    const glassPane = new THREE.Mesh(glassGeo, mats.lcdCoverGlass);
    glassPane.userData.noEdges = true;
    g.add(glassPane);

    // 2.5D diamond-chamfered 9H optical crystal bevel rim + anti-chip coating highlight
    const edgeRing = new THREE.Mesh(
      extrudeHiRes(
        createFrameShape(protW, protH, 2.8, protW - 2.2, protH - 2.2, 2.0),
        0.38,
        0.04,
        0.04,
        2,
        20
      ),
      mats.fluorineCoatCyan
    );
    edgeRing.position.z = -0.02;
    g.add(edgeRing);

    // Rear silicone self-adhesion static film border + corner alignment pull-tab
    const silBorder = new THREE.Mesh(
      extrudeHiRes(
        createFrameShape(protW - 2.6, protH - 2.6, 1.8, protW - 5.0, protH - 5.0, 1.2),
        0.10,
        0.02,
        0.02,
        1,
        16
      ),
      mats.lcdOcaFilm
    );
    silBorder.position.z = 0.20;
    const pullTab = new THREE.Mesh(createChamferedBoxGeo(5.6, 2.2, 0.14, 0.3, 0.02, 'z'), mats.bodyRecRed);
    pullTab.position.set(protW * 0.42, protH * 0.5 + 0.9, 0.18);
    g.add(silBorder, pullTab);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-pck-lg3-protector',
        52,
        '#38bdf8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.38),
        new THREE.Vector3(0, 0, -104),
        cp,
        0.22
      ),
      true
    );
  }

  // D53: MA HINGE BACK MO A MG ASSY (Sony OEM A-5057-165-A) — Die-Cast Magnesium Pantograph Back Housing
  {
    const g = new THREE.Group();
    const mgGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH - 2.4, LCD_HEIGHT - 2.8, 3.0, LCD_WIDTH - 20.0, LCD_HEIGHT - 16.0, 2.0),
      0.85,
      0.10,
      0.10,
      2,
      22
    );
    applyBoxUVs(mgGeo, 18);
    g.add(new THREE.Mesh(mgGeo, u.lcdMaHingeMg));

    for (const sx of [-1, 1]) {
      const ribGeo = createChamferedBoxGeo(3.2, LCD_HEIGHT - 8.0, 0.95, 0.3, 0.08, 'z');
      applyBoxUVs(ribGeo, 12);
      const rib = new THREE.Mesh(ribGeo, u.lcdMaHingeMg);
      rib.position.set(sx * 24.5, 0, 0.15);
      g.add(rib);

      for (const sy of [-1, 1]) {
        const boss = new THREE.Mesh(hiResCyl(2.25, 2.55, 1.18, 22).rotateX(Math.PI / 2), u.lcdBrushedSus304Blu);
        boss.position.set(sx * 31.2, sy * 18.6, 0.1);
        const bore = new THREE.Mesh(hiResCyl(1.05, 1.05, 1.28, 16).rotateX(Math.PI / 2), mats.matteBlackAnodized);
        bore.position.set(sx * 31.2, sy * 18.6, 0.1);
        bore.userData.noEdges = true;
        const brassRing = new THREE.Mesh(hiResCyl(1.42, 1.42, 1.22, 16).rotateX(Math.PI / 2), mats.brassGear);
        brassRing.position.set(sx * 31.2, sy * 18.6, 0.1);
        g.add(boss, brassRing, bore);
      }
    }
    const webGeo = createChamferedBoxGeo(48.0, 4.2, 0.72, 0.4, 0.08, 'z');
    applyBoxUVs(webGeo, 14);
    const web = new THREE.Mesh(webGeo, u.lcdMaHingeMg);
    web.position.set(0, -14.8, 0.12);
    const upperWeb = new THREE.Mesh(webGeo, u.lcdMaHingeMg);
    upperWeb.position.set(0, 14.8, 0.12);
    g.add(web, upperWeb);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ma-hinge-back-mg-a',
        53,
        '#334155',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -28.25),
        new THREE.Vector3(0, 0, 62),
        cp,
        0.26
      ),
      false
    );
  }

  // D54: MA HINGE BACK MOLD B Steel Reinforcement Plate & Waterproof Adhesive Sheet (5-036-113-01 / 5-036-112-01)
  {
    const g = new THREE.Group();
    const plateGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH - 10.0, LCD_HEIGHT - 12.0, 2.0, LCD_WIDTH - 24.0, LCD_HEIGHT - 22.0, 1.4),
      0.34,
      0.04,
      0.04,
      2,
      20
    );
    applyBoxUVs(plateGeo, 16);
    g.add(new THREE.Mesh(plateGeo, u.lcdBrushedSus304Blu));

    // Die-cut waterproof acrylic PSA foam sheet (5-036-112-01)
    const adhGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH - 11.2, LCD_HEIGHT - 13.2, 1.8, LCD_WIDTH - 21.0, LCD_HEIGHT - 20.0, 1.2),
      0.18,
      0.02,
      0.02,
      1,
      16
    );
    applyBoxUVs(adhGeo, 14);
    const adhMesh = new THREE.Mesh(adhGeo, u.lcdPoronAcousticFoam);
    adhMesh.position.z = -0.32;
    g.add(adhMesh);

    // Embossed longitudinal stiffening flutes + 4 titanium locating dowel eyelets
    for (const sy of [-15.2, 15.2]) {
      const flute = new THREE.Mesh(createChamferedBoxGeo(44.0, 1.2, 0.44, 0.2, 0.04, 'z'), mats.mountStainlessFlange);
      flute.position.set(0, sy, 0.08);
      g.add(flute);
    }
    for (const [px, py] of [[-26, 15], [26, 15], [-26, -15], [26, -15]]) {
      const eyelet = new THREE.Mesh(hiResCyl(1.35, 1.35, 0.46, 18).rotateX(Math.PI / 2), mats.titaniumRivet);
      eyelet.position.set(px, py, 0);
      g.add(eyelet);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ma-hinge-mold-b-plate',
        54,
        '#94a3b8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -28.05),
        new THREE.Vector3(0, 48, 48),
        cp,
        0.26
      ),
      false
    );
  }

  // D55: MA HINGE FRONT PLATE & ADE Gasket Sheet (5-036-138-01 / 5-036-139-01)
  {
    const g = new THREE.Group();
    const frontPlateGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH - 6.8, LCD_HEIGHT - 7.8, 2.4, LCD_WIDTH - 18.0, LCD_HEIGHT - 16.0, 1.6),
      0.38,
      0.05,
      0.05,
      2,
      20
    );
    applyBoxUVs(frontPlateGeo, 16);
    g.add(new THREE.Mesh(frontPlateGeo, u.lcdMaHingeMg));

    const adeGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH - 7.4, LCD_HEIGHT - 8.4, 2.2, LCD_WIDTH - 16.5, LCD_HEIGHT - 14.5, 1.4),
      0.16,
      0.02,
      0.02,
      1,
      16
    );
    applyBoxUVs(adeGeo, 14);
    const ade = new THREE.Mesh(adeGeo, u.lcdPoronAcousticFoam);
    ade.position.z = -0.30;
    g.add(ade);

    for (const sx of [-1, 1]) {
      const bridgeGeo = createChamferedBoxGeo(2.6, 12.4, 0.46, 0.25, 0.04, 'z');
      applyBoxUVs(bridgeGeo, 8);
      const bridge = new THREE.Mesh(bridgeGeo, u.lcdBrushedSus304Blu);
      bridge.position.set(sx * 19.5, 0, 0.08);
      const pin = new THREE.Mesh(hiResCyl(0.75, 0.75, 0.82, 12).rotateX(Math.PI / 2), mats.brassGear);
      pin.position.set(sx * 19.5, 0, 0.08);
      g.add(bridge, pin);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ma-hinge-front-plate',
        55,
        '#1e293b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -29.65),
        new THREE.Vector3(-52, 46, 26),
        cp,
        0.26
      ),
      false
    );
  }

  // D56: 4-Axis Dedicated MA Hinge Cover Upper & Lower (Sony OEM 5-036-102-01 / 5-036-103-01)
  {
    const g = new THREE.Group();
    for (const sy of [-1, 1]) {
      const capGeo = createChamferedBoxGeo(8.2, 6.4, 7.6, 1.8, 0.28, 'y');
      applyBoxUVs(capGeo, 10);
      const cap = new THREE.Mesh(capGeo, u.lcdMaHingeMg);
      cap.position.set(0.4, sy * 14.6, 0);
      g.add(cap);

      const lipGeo = hiResCyl(3.95, 3.95, 2.2, 26, false, -Math.PI * 0.6, Math.PI * 1.2);
      applyBoxUVs(lipGeo, 10);
      const lip = new THREE.Mesh(lipGeo, u.lcdMaHingeMg);
      lip.position.set(0, sy * 11.2, 0);
      const trim = new THREE.Mesh(hiResCyl(4.08, 4.08, 0.35, 24), u.lcdBrushedSus304Blu);
      trim.position.set(0, sy * 12.1, 0);
      const tab = new THREE.Mesh(createChamferedBoxGeo(2.4, 2.8, 1.2, 0.2, 0.06, 'z'), mats.pomGear);
      tab.position.set(-2.6, sy * 13.8, 2.2);
      g.add(lip, trim, tab);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ma-hinge-cover-ul',
        56,
        '#475569',
        g,
        new THREE.Vector3(hx, LCD_CENTER_Y, -30.40),
        new THREE.Vector3(96, 36, 4),
        cp,
        0.26
      ),
      false
    );
  }

  // D57: 4-Axis Dedicated MA Hinge Cover Front & Rear Shells (Sony OEM A-5054-221-A / 5-036-105-01)
  {
    const g = new THREE.Group();
    const frontGeo = hiResCyl(5.22, 5.22, 23.0, 28, false, Math.PI * 0.55, Math.PI * 0.9);
    applyBoxUVs(frontGeo, 12);
    const frontShell = new THREE.Mesh(frontGeo, u.lcdMaHingeMg);
    frontShell.position.set(0, 0, -0.5);
    g.add(frontShell);

    const rearGeo = hiResCyl(5.22, 5.22, 23.0, 28, false, -Math.PI * 0.45, Math.PI * 0.9);
    applyBoxUVs(rearGeo, 12);
    const rearShell = new THREE.Mesh(rearGeo, u.lcdMaHingeMg);
    rearShell.position.set(0, 0, 0.5);
    g.add(rearShell);

    for (const sy of [-7.5, 0, 7.5]) {
      const ribGeo = createChamferedBoxGeo(1.4, 2.6, 7.8, 0.2, 0.05, 'z');
      applyBoxUVs(ribGeo, 8);
      const seamRib = new THREE.Mesh(ribGeo, u.lcdPoronAcousticFoam);
      seamRib.position.set(4.5, sy, 0);
      g.add(seamRib);
    }
    for (const sy of [-10.8, 10.8]) {
      const collar = new THREE.Mesh(hiResCyl(5.32, 5.32, 0.48, 26), u.lcdBrushedSus304Blu);
      collar.position.set(0, sy, 0);
      g.add(collar);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ma-hinge-cover-fr',
        57,
        '#334155',
        g,
        new THREE.Vector3(hx, LCD_CENTER_Y, -30.40),
        new THREE.Vector3(98, -2, 8),
        cp,
        0.26
      ),
      false
    );
  }

  // D58: MA HINGE FPC Retaining Plate & Kapton Insulation Sheet (5-036-096-01 / 5-036-573-01 / 5-043-045-01)
  {
    const g = new THREE.Group();
    const clampGeo = createChamferedBoxGeo(14.0, 6.2, 0.44, 0.6, 0.06, 'z');
    applyBoxUVs(clampGeo, 10);
    g.add(new THREE.Mesh(clampGeo, u.lcdBrushedSus304Blu));

    for (const sx of [-1, 1]) {
      const flange = new THREE.Mesh(createChamferedBoxGeo(2.8, 4.4, 1.35, 0.3, 0.06, 'z'), u.lcdBrushedSus304Blu);
      flange.position.set(sx * 7.2, 0, 0.45);
      const scr = buildPhillipsScrew(0.95, 0.4, 0.48, 1.5, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
      scr.rotation.x = Math.PI / 2;
      scr.position.set(sx * 5.2, 0, -0.35);
      g.add(flange, scr);
    }

    const kaptonGeo = createChamferedBoxGeo(16.5, 8.6, 0.14, 0.8, 0.02, 'z');
    applyPlanarUVs(kaptonGeo, 16.5, 8.6, 'xy-back');
    const kapton = new THREE.Mesh(kaptonGeo, u.lcdFpcFlexCircuit);
    kapton.position.set(0, 0, -0.35);
    const tackTape = new THREE.Mesh(createChamferedBoxGeo(11.0, 3.2, 0.12, 0.3, 0.02, 'z'), mats.mylarInsulatorFilm);
    tackTape.position.set(0, -5.2, -0.35);
    g.add(kapton, tackTape);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ma-fpc-retainer-insul',
        58,
        '#d97706',
        g,
        new THREE.Vector3(hx - 4.0, LCD_CENTER_Y, -29.50),
        new THREE.Vector3(94, -36, 16),
        cp,
        0.26
      ),
      false
    );
  }

  // D59: MA / SV Hinge Dual-Lip Waterproof Cable Bushing (Sony OEM 5-036-101-01 / 501161101)
  {
    const g = new THREE.Group();
    const bodyGeo = createChamferedBoxGeo(7.6, 11.4, 4.2, 1.4, 0.25, 'z');
    applyBoxUVs(bodyGeo, 10);
    g.add(new THREE.Mesh(bodyGeo, u.lcdPoronAcousticFoam));

    for (const zOff of [-1.4, 0, 1.4]) {
      const lipGeo = extrudeHiRes(
        createFrameShape(8.9, 12.7, 1.8, 4.8, 8.4, 0.9),
        0.55,
        0.08,
        0.08,
        2,
        18
      );
      const lip = new THREE.Mesh(lipGeo, mats.epdmGasket);
      lip.position.z = zOff;
      g.add(lip);
    }

    const collar = new THREE.Mesh(hiResCyl(2.45, 2.85, 5.2, 22).rotateX(Math.PI / 2), mats.antiVibRubber);
    collar.position.set(0, 0, 0.4);
    const cableSlit = new THREE.Mesh(createChamferedBoxGeo(1.0, 4.8, 5.4, 0.15, 0.04, 'z'), mats.matteBlackAnodized);
    cableSlit.position.set(0, 0, 0.4);
    g.add(collar, cableSlit);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ma-wp-cable-bushing',
        59,
        '#1f2937',
        g,
        new THREE.Vector3(hx - 1.5, LCD_CENTER_Y, -29.0),
        new THREE.Vector3(96, 16, 28),
        cp,
        0.26
      ),
      false
    );
  }

  // D60: MA Hinge Waterproof Sponge Cushions Trio (FPC 5-036-097-01 / MR 5-036-099-01 / Sens C 5-036-100-01)
  {
    const g = new THREE.Group();
    const fpcFoamGeo = createChamferedBoxGeo(13.6, 4.8, 1.4, 0.6, 0.14, 'z');
    applyBoxUVs(fpcFoamGeo, 10);
    const fpcFoam = new THREE.Mesh(fpcFoamGeo, u.lcdPoronAcousticFoam);
    fpcFoam.position.set(0, 7.2, 0);
    g.add(fpcFoam);

    const mrFoamGeo = extrudeHiRes(createFrameShape(10.2, 7.8, 1.2, 5.4, 3.6, 0.6), 1.35, 0.10, 0.10, 2, 16);
    applyBoxUVs(mrFoamGeo, 8);
    const mrFoam = new THREE.Mesh(mrFoamGeo, u.lcdNiCuConductiveFoam);
    mrFoam.position.set(0, -0.4, 0);
    g.add(mrFoam);

    const sensCSheet = new THREE.Mesh(createChamferedBoxGeo(11.8, 6.4, 0.45, 0.8, 0.05, 'z'), mats.mylarInsulatorFilm);
    sensCSheet.position.set(0, -8.4, 0.15);
    const peelTab = new THREE.Mesh(createChamferedBoxGeo(3.2, 1.6, 0.22, 0.2, 0.02, 'z'), mats.goldPlating);
    peelTab.position.set(6.4, -8.4, 0.15);
    g.add(sensCSheet, peelTab);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ma-wp-cushion-fpc-mr',
        60,
        '#0f766e',
        g,
        new THREE.Vector3(hx - 3.5, LCD_CENTER_Y, -29.2),
        new THREE.Vector3(96, -24, 34),
        cp,
        0.26
      ),
      false
    );
  }

  // D61: Rear Cabinet LCD Bay Cover & Waterproof Cushions A/B (Sony OEM 502794901 / 502863001 / 502863101)
  {
    const g = new THREE.Group();
    const coverGeo = extrudeHiRes(createRoundedRectShape(LCD_WIDTH - 2.0, LCD_HEIGHT - 2.0, 3.0), 0.72, 0.08, 0.08, 2, 22);
    applyPlanarUVs(coverGeo, LCD_WIDTH - 2.0, LCD_HEIGHT - 2.0, 'xy-back');
    g.add(new THREE.Mesh(coverGeo, u.lcdRearShellMgLabel));

    const cushAGeo = createChamferedBoxGeo(LCD_WIDTH - 12.0, 3.4, 1.15, 0.6, 0.12, 'z');
    applyBoxUVs(cushAGeo, 12);
    const cushA = new THREE.Mesh(cushAGeo, u.lcdPoronAcousticFoam);
    cushA.position.set(0, LCD_HEIGHT * 0.40, -0.55);
    const cushBGeo = createChamferedBoxGeo(LCD_WIDTH - 14.0, 3.4, 1.15, 0.6, 0.12, 'z');
    applyBoxUVs(cushBGeo, 12);
    const cushB = new THREE.Mesh(cushBGeo, u.lcdPoronAcousticFoam);
    cushB.position.set(0, -LCD_HEIGHT * 0.40, -0.55);
    g.add(cushA, cushB);

    const slotBezel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.2, 7.4, 1.2, 11.4, 3.6, 0.6), 0.95, 0.06, 0.06, 2, 16),
      mats.epdmGasket
    );
    slotBezel.position.set(18.0, 0, -0.22);
    g.add(slotBezel);

    for (const [bx, by] of [[-28, 16], [28, 16], [-28, -16], [28, -16]]) {
      const boss = new THREE.Mesh(hiResCyl(1.4, 1.4, 0.95, 14).rotateX(Math.PI / 2), mats.brassGear);
      boss.position.set(bx, by, -0.25);
      g.add(boss);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-rear-lc-cover-cushions',
        61,
        '#334155',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -27.05),
        new THREE.Vector3(0, 0, 78),
        cp,
        0.24
      ),
      false
    );
  }

  // D62: Rear Magnesium Pocket Plate, Anti-Shock Cushion & Frame Light-Block Sheet (5-036-081-01 / 082-01 / 088-01)
  {
    const g = new THREE.Group();
    const mgPlateGeo = extrudeHiRes(createRoundedRectShape(LCD_WIDTH - 4.8, LCD_HEIGHT - 5.2, 2.6), 0.62, 0.08, 0.08, 2, 20);
    applyBoxUVs(mgPlateGeo, 20);
    g.add(new THREE.Mesh(mgPlateGeo, u.lcdMaHingeMg));

    const shockGeo = createChamferedBoxGeo(LCD_WIDTH - 14.0, LCD_HEIGHT - 14.0, 0.42, 1.6, 0.06, 'z');
    applyBoxUVs(shockGeo, 14);
    const shockPad = new THREE.Mesh(shockGeo, u.lcdPoronAcousticFoam);
    shockPad.position.z = -0.45;
    g.add(shockPad);

    const sheetGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH - 5.6, LCD_HEIGHT - 6.0, 2.2, LCD_WIDTH - 18.0, LCD_HEIGHT - 18.0, 1.4),
      0.16,
      0.02,
      0.02,
      1,
      18
    );
    const sheet = new THREE.Mesh(sheetGeo, mats.velvetFlockTrap);
    sheet.position.z = 0.42;
    g.add(sheet);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-rear-mg-bay-plate',
        62,
        '#64748b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -26.75),
        new THREE.Vector3(0, 0, 94),
        cp,
        0.24
      ),
      false
    );
  }

  // D63: Magnetic Field Cut Plate (IBIS Shield 5-036-036-01 / 502789501) & High-Temp N50H Sensor Magnet (1-013-923-11)
  {
    const g = new THREE.Group();
    const cutGeo = createChamferedBoxGeo(26.2, 18.6, 0.48, 1.4, 0.06, 'z');
    applyBoxUVs(cutGeo, 14);
    g.add(new THREE.Mesh(cutGeo, u.lcdBrushedSus304Blu));

    const flange = new THREE.Mesh(createChamferedBoxGeo(26.2, 3.0, 1.45, 0.4, 0.06, 'z'), mats.pureIronArmature);
    flange.position.set(0, -8.0, 0.55);
    g.add(flange);

    const magHolder = new THREE.Mesh(createChamferedBoxGeo(9.4, 5.4, 1.65, 0.5, 0.08, 'z'), u.lcdBrushedSus304Blu);
    magHolder.position.set(-5.8, 2.4, -0.85);
    const magnet = new THREE.Mesh(createChamferedBoxGeo(7.5, 3.5, 1.45, 0.3, 0.06, 'z'), mats.neodymiumMagnet);
    magnet.position.set(-5.8, 2.4, -1.05);
    const northStripe = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.54, 0.14), mats.bodyRecRed);
    northStripe.position.set(-7.6, 2.4, -1.78);
    northStripe.userData.noEdges = true;
    const southStripe = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.54, 0.14), mats.cfaBlue);
    southStripe.position.set(-4.0, 2.4, -1.78);
    southStripe.userData.noEdges = true;
    g.add(magHolder, magnet, northStripe, southStripe);

    for (const sx of [-9.6, 9.6]) {
      const scr = buildPhillipsScrew(1.0, 0.42, 0.48, 1.6, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
      scr.rotation.x = -Math.PI / 2;
      scr.position.set(sx, 6.2, -0.35);
      g.add(scr);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-magnetic-cut-plate',
        63,
        '#7c3aed',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -27.45),
        new THREE.Vector3(-68, 24, 52),
        cp,
        0.26
      ),
      false
    );
  }

  // D64: Front LCD Module Cabinet Bezel Frame & Dust Labyrinth Step (Sony OEM A-5054-222-A / A-5038-710-A)
  {
    const g = new THREE.Group();
    const bezelGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH + 0.8, LCD_HEIGHT + 0.8, 3.6, LCD_WIDTH - 6.8, LCD_HEIGHT - 6.6, 1.6),
      1.35,
      0.16,
      0.14,
      2,
      24
    );
    applyBoxUVs(bezelGeo, 18);
    g.add(new THREE.Mesh(bezelGeo, u.lcdMaHingeMg));

    const stepWall = new THREE.Mesh(
      extrudeHiRes(
        createFrameShape(LCD_WIDTH - 0.6, LCD_HEIGHT - 0.6, 3.2, LCD_WIDTH - 5.4, LCD_HEIGHT - 5.2, 2.0),
        0.48,
        0.04,
        0.04,
        1,
        20
      ),
      mats.matteBlackAnodized
    );
    stepWall.position.z = 0.55;
    g.add(stepWall);

    // Sculpted thumb-lift scoop + 4 internal corner shock gussets
    const scoop = new THREE.Mesh(createChamferedBoxGeo(12.2, 2.2, 0.9, 0.8, 0.08, 'z'), u.lcdMaHingeMg);
    scoop.position.set(-16.0, -LCD_HEIGHT * 0.5 - 0.2, 0.2);
    g.add(scoop);

    for (const [gx, gy] of [[-34, 21.5], [34, 21.5], [-34, -21.5], [34, -21.5]]) {
      const gusset = new THREE.Mesh(createChamferedBoxGeo(3.4, 3.4, 0.55, 0.4, 0.05, 'z'), u.lcdPoronAcousticFoam);
      gusset.position.set(gx, gy, 0.48);
      g.add(gusset);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-front-cab-bezel-frame',
        64,
        '#1e293b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -35.15),
        new THREE.Vector3(0, 56, -84),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // GROUP B: Cover Glass Ion-Exchange Stress, Sunglasses QWP & Touch Routing (D65–D69)
  // =========================================================================

  // D65: Chemically Strengthened Ion-Exchange Compressive Stress Layer (K+/Na+ DOL 50um, CS >= 950 MPa)
  {
    const g = new THREE.Group();
    const paneGeo = extrudeHiRes(createRoundedRectShape(LCD_WIDTH - 1.6, LCD_HEIGHT - 1.6, 2.9), 0.14, 0.02, 0.02, 1, 20);
    const pane = new THREE.Mesh(paneGeo, mats.evfAntiFogGlass);
    pane.userData.noEdges = true;
    g.add(pane);

    const dolFrame = new THREE.Mesh(
      extrudeHiRes(
        createFrameShape(LCD_WIDTH - 1.6, LCD_HEIGHT - 1.6, 2.9, LCD_WIDTH - 5.2, LCD_HEIGHT - 5.2, 2.2),
        0.18,
        0.02,
        0.02,
        1,
        18
      ),
      mats.nanoArIridescent
    );
    g.add(dolFrame);

    // K+ potassium ion substitution compressive lattice array along top & bottom edges
    for (let i = -6; i <= 6; i++) {
      for (const sy of [-1, 1]) {
        const ion = new THREE.Mesh(hiResSphere(0.42, 10, 8), sy > 0 ? mats.fluorineCoatCyan : mats.goldPlating);
        ion.position.set(i * 5.0, sy * LCD_HEIGHT * 0.45, -0.08);
        ion.userData.noEdges = true;
        g.add(ion);
      }
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ion-exchange-layer',
        65,
        '#06b6d4',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.26),
        new THREE.Vector3(-76, 48, -90),
        cp,
        0.22
      ),
      true
    );
  }

  // D66: Broadband Quarter-Wave Plate (lambda/4 QWP Retarder Film — Polarized Sunglasses Anti-Blackout)
  {
    const g = new THREE.Group();
    const qwpGeo = extrudeHiRes(createRoundedRectShape(cellW + 0.6, cellH + 0.6, 1.8), 0.14, 0.02, 0.02, 1, 18);
    applyPlanarUVs(qwpGeo, cellW + 0.6, cellH + 0.6, 'xy-back');
    g.add(new THREE.Mesh(qwpGeo, u.lcdQwpRetarderFilm));

    const axisTab = new THREE.Mesh(createChamferedBoxGeo(5.2, 2.2, 0.22, 0.3, 0.03, 'z'), mats.goldPlating);
    axisTab.position.set(cellW * 0.42, cellH * 0.44, -0.06);
    axisTab.rotation.z = Math.PI / 4;
    const retRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW + 0.8, cellH + 0.8, 1.8, cellW - 0.8, cellH - 0.8, 1.4), 0.16, 0.015, 0.015, 1, 16),
      mats.nanoArIridescent
    );
    g.add(axisTab, retRim);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-qwp-sunglass-film',
        66,
        '#4f46e5',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.28),
        new THREE.Vector3(78, 48, -78),
        cp,
        0.22
      ),
      true
    );
  }

  // D67: Rear Anti-EMI Transparent ITO Shielding Layer (Beneath Touch Sensor — Shields VCOM Noise)
  {
    const g = new THREE.Group();
    const shieldGeo = extrudeHiRes(createRoundedRectShape(cellW + 0.4, cellH + 0.4, 1.6), 0.12, 0.015, 0.015, 1, 18);
    applyPlanarUVs(shieldGeo, cellW + 0.4, cellH + 0.4, 'xy-back');
    const shieldPane = new THREE.Mesh(shieldGeo, u.lcdItoDiamondTouchGrid);
    g.add(shieldPane);

    const gndRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW + 0.8, cellH + 0.8, 1.7, cellW - 1.8, cellH - 1.8, 1.2), 0.16, 0.02, 0.02, 1, 16),
      mats.sinteredSilver
    );
    g.add(gndRing);

    for (const sx of [-1, 1]) {
      const gndTab = new THREE.Mesh(createChamferedBoxGeo(4.4, 2.8, 0.20, 0.2, 0.02, 'z'), mats.goldPlating);
      gndTab.position.set(sx * 16.0, -cellH * 0.5 - 0.85, 0);
      const via = new THREE.Mesh(hiResCyl(0.55, 0.55, 0.28, 12).rotateX(Math.PI / 2), mats.copperHeatSpreader);
      via.position.set(sx * 16.0, -cellH * 0.5 - 0.85, 0);
      g.add(gndTab, via);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-rear-ito-emi-shield',
        67,
        '#14b8a6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.30),
        new THREE.Vector3(-92, 0, -82),
        cp,
        0.24
      ),
      true
    );
  }

  // D68: Perimeter Fine-Line Silver Paste Routing Bus (30/30 um Laser-Etched Ag) & ACF/FOG Bonding Zone
  {
    const g = new THREE.Group();
    const busGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH - 1.6, LCD_HEIGHT - 1.6, 2.8, LCD_WIDTH - 9.4, LCD_HEIGHT - 8.6, 1.4),
      0.16,
      0.02,
      0.02,
      1,
      20
    );
    applyPlanarUVs(busGeo, LCD_WIDTH - 1.6, LCD_HEIGHT - 1.6, 'xy-back');
    g.add(new THREE.Mesh(busGeo, u.lcdSilverBezelBus));

    // Bottom ACF/FOG gold-microsphere pad landing strip + 16 fine gold bond fingers
    const acfGeo = createChamferedBoxGeo(22.4, 2.8, 0.24, 0.3, 0.03, 'z');
    applyPlanarUVs(acfGeo, 22.4, 2.8, 'xy-back');
    const acfStrip = new THREE.Mesh(acfGeo, u.lcdAcfGoldMicrospheres);
    acfStrip.position.set(0, -LCD_HEIGHT * 0.44, 0.06);
    g.add(acfStrip);

    for (let i = 0; i < 16; i++) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.65, 2.2, 0.16), mats.goldPlating);
      f.position.set(-9.75 + i * 1.3, -LCD_HEIGHT * 0.44, -0.06);
      f.userData.noEdges = true;
      g.add(f);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-silver-bezel-bus',
        68,
        '#cbd5e1',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.33),
        new THREE.Vector3(-92, -38, -82),
        cp,
        0.26
      ),
      true
    );
  }

  // D69: 0.35 mm Pitch ZIF Flip-Lock FPC Connector & Polyimide/FR-4 Stiffener Bar
  {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(createChamferedBoxGeo(18.8, 4.3, 1.35, 0.35, 0.08, 'z'), mats.zifIvoryPlastic);
    g.add(housing);

    // Matte-black hinged flip-lock actuator bail + metal side ear solder anchors
    const actuator = new THREE.Mesh(createChamferedBoxGeo(17.6, 1.65, 0.68, 0.2, 0.06, 'z'), mats.matteBlackAnodized);
    actuator.position.set(0, 1.35, -0.52);
    actuator.rotation.x = 0.22;
    g.add(actuator);

    for (const sx of [-9.4, 9.4]) {
      const ear = new THREE.Mesh(createChamferedBoxGeo(0.95, 2.8, 0.85, 0.15, 0.04, 'z'), mats.solderBallSilver);
      ear.position.set(sx, 0, 0.15);
      g.add(ear);
    }

    // 24 staggered gold-plated phosphor-bronze ZIF contacts (0.35 mm fine pitch)
    for (let i = 0; i < 24; i++) {
      const px = -8.05 + i * 0.70;
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.35, 0.36), mats.goldPlating);
      pin.position.set(px, -2.15, 0.32);
      pin.userData.noEdges = true;
      g.add(pin);
    }

    // Inserted Sony FPC tail with fine copper traces & emerald FR-4 stiffener backing plate
    const fpcGeo = createChamferedBoxGeo(15.6, 7.8, 0.16, 0.25, 0.02, 'z');
    applyPlanarUVs(fpcGeo, 15.6, 7.8, 'xy-back');
    const fpcTail = new THREE.Mesh(fpcGeo, u.lcdFpcFlexCircuit);
    fpcTail.position.set(0, 5.4, 0.05);
    const stiffGeo = createChamferedBoxGeo(15.6, 4.8, 0.32, 0.2, 0.03, 'z');
    applyPlanarUVs(stiffGeo, 15.6, 4.8, 'xy-back');
    const stiffener = new THREE.Mesh(stiffGeo, u.lcdPcbPd1072HiRes);
    stiffener.position.set(0, 4.0, 0.24);
    g.add(fpcTail, stiffener);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-zif-fliplock-stiffener',
        69,
        '#f59e0b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y - 19.5, -31.80),
        new THREE.Vector3(58, -50, -76),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // GROUP C: Inside IPS Liquid Crystal Cell Sub-Micron Glass, TFT & Seal Layers (D70–D76)
  // =========================================================================

  // D70: Upper CF Alkali-Free Aluminoborosilicate Glass Substrate (Corning EAGLE XG Slim 0.25 mm)
  {
    const g = new THREE.Group();
    const cfGlassGeo = extrudeHiRes(createRoundedRectShape(cellW, cellH, 1.2), 0.25, 0.03, 0.03, 2, 18);
    const cfGlass = new THREE.Mesh(cfGlassGeo, mats.coverGlass);
    cfGlass.userData.noEdges = true;
    g.add(cfGlass);

    const rim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW, cellH, 1.2, cellW - 1.6, cellH - 1.6, 0.8), 0.26, 0.02, 0.02, 1, 16),
      mats.quartzEdge
    );
    g.add(rim);

    // 4 Corner laser fiducial alignment crosshairs for sub-micron cell-to-cell ODF registration
    for (const [fx, fy] of [
      [-cellW * 0.44, cellH * 0.44],
      [cellW * 0.44, cellH * 0.44],
      [-cellW * 0.44, -cellH * 0.44],
      [cellW * 0.44, -cellH * 0.44],
    ]) {
      const hBar = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.24, 0.28), mats.goldPlating);
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.0, 0.28), mats.goldPlating);
      hBar.position.set(fx, fy, 0);
      vBar.position.set(fx, fy, 0);
      hBar.userData.noEdges = true;
      vBar.userData.noEdges = true;
      g.add(hBar, vBar);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-cf-eagle-xg-glass',
        70,
        '#7dd3fc',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.22),
        new THREE.Vector3(-96, 38, -62),
        cp,
        0.22
      ),
      true
    );
  }

  // D71: Lower TFT Alkali-Free Glass Substrate (0.25 mm) with Extended COG Driver Ledge
  {
    const g = new THREE.Group();
    const tftH = cellH + 3.0;
    const tftGeo = extrudeHiRes(createRoundedRectShape(cellW, tftH, 1.0), 0.25, 0.03, 0.03, 2, 18);
    const tftGlass = new THREE.Mesh(tftGeo, mats.quartzOlpf);
    tftGlass.position.y = -1.5;
    tftGlass.userData.noEdges = true;
    g.add(tftGlass);

    // Polished bevel perimeter + extended COG fan-out glass ledge with bespoke ACF gold-microsphere pad array
    const rim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW, tftH, 1.0, cellW - 1.4, tftH - 1.4, 0.7), 0.26, 0.02, 0.02, 1, 16),
      mats.quartzEdge
    );
    rim.position.y = -1.5;
    const ledgeGeo = createChamferedBoxGeo(cellW - 2.0, 2.9, 0.28, 0.3, 0.02, 'z');
    applyPlanarUVs(ledgeGeo, cellW - 2.0, 2.9, 'xy-back');
    const ledge = new THREE.Mesh(ledgeGeo, u.lcdAcfGoldMicrospheres);
    ledge.position.set(0, -cellH * 0.5 - 1.4, -0.02);
    g.add(rim, ledge);

    for (let i = -14; i <= 14; i++) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(0.26, 2.2, 0.08), mats.goldPlating);
      trace.position.set(i * 2.1, -cellH * 0.5 - 1.4, -0.18);
      trace.userData.noEdges = true;
      g.add(trace);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-tft-eagle-xg-glass',
        71,
        '#38bdf8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.04),
        new THREE.Vector3(-96, -42, -56),
        cp,
        0.24
      ),
      true
    );
  }

  // D72: Color Filter Acrylic Overcoat (OC) Planarization Layer (1.8 um)
  {
    const g = new THREE.Group();
    const ocGeo = extrudeHiRes(createRoundedRectShape(cellW - 1.2, cellH - 1.2, 1.0), 0.14, 0.02, 0.02, 1, 16);
    const ocMesh = new THREE.Mesh(ocGeo, mats.opticalCementClear);
    ocMesh.userData.noEdges = true;
    g.add(ocMesh);

    // Underlying RGB Color Filter planarized resist mosaic visible beneath 1.8um acrylic overcoat
    const cfUnderGeo = createChamferedBoxGeo(cellW - 3.6, cellH - 3.6, 0.08, 0.3, 0.01, 'z');
    applyPlanarUVs(cfUnderGeo, cellW - 3.6, cellH - 3.6, 'xy-back');
    const cfUnder = new THREE.Mesh(cfUnderGeo, u.lcdColorFilterBmMosaic);
    cfUnder.position.z = 0.08;
    g.add(cfUnder);

    const ocRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW - 1.2, cellH - 1.2, 1.0, cellW - 3.0, cellH - 3.0, 0.7), 0.16, 0.02, 0.02, 1, 14),
      mats.nanoArIridescent
    );
    g.add(ocRim);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-cf-acrylic-overcoat',
        72,
        '#ec4899',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.18),
        new THREE.Vector3(-98, 12, -58),
        cp,
        0.22
      ),
      true
    );
  }

  // D73: TFT Gate Metal Bus (Mo/Al/Mo) & PECVD SiNx/SiO2 Gate Insulator Stack (200 nm)
  {
    const g = new THREE.Group();
    const giGeo = extrudeHiRes(createRoundedRectShape(cellW - 2.0, cellH - 2.0, 1.0), 0.14, 0.02, 0.02, 1, 16);
    applyPlanarUVs(giGeo, cellW - 2.0, cellH - 2.0, 'xy-back');
    const giPane = new THREE.Mesh(giGeo, u.lcdTfeAldBarrier);
    g.add(giPane);

    // Horizontal brushed Mo/Al/Mo tri-layer gate scanning busbars + GOA scan drivers
    for (let r = -5; r <= 5; r++) {
      const gateLine = new THREE.Mesh(new THREE.BoxGeometry(cellW - 5.2, 0.44, 0.20), u.lcdBrushedSus304Blu);
      gateLine.position.set(0, r * 3.6, -0.04);
      gateLine.userData.noEdges = true;
      g.add(gateLine);
    }
    for (const sx of [-1, 1]) {
      const goaGeo = createChamferedBoxGeo(2.0, cellH - 4.0, 0.26, 0.2, 0.03, 'z');
      applyPlanarUVs(goaGeo, 2.0, cellH - 4.0, 'xy-back');
      const goaStrip = new THREE.Mesh(goaGeo, u.lcdDdicSiliconDie);
      goaStrip.position.set(sx * (cellW * 0.5 - 2.2), 0, -0.05);
      g.add(goaStrip);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-tft-gate-gi-stack',
        73,
        '#0ea5e9',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.15),
        new THREE.Vector3(96, 36, -56),
        cp,
        0.24
      ),
      true
    );
  }

  // D74: LTPS Semiconductor Active Channel, ILD & Source/Drain Metal Interconnects + Cs
  {
    const g = new THREE.Group();
    const ltpsGeo = extrudeHiRes(createRoundedRectShape(cellW - 2.2, cellH - 2.2, 1.0), 0.16, 0.02, 0.02, 1, 16);
    applyPlanarUVs(ltpsGeo, cellW - 2.2, cellH - 2.2, 'xy-back');
    g.add(new THREE.Mesh(ltpsGeo, u.lcdLtpsTftSilicon));

    // Vertical copper/molybdenum Source/Drain data busbars + bottom data multiplexer fan-out pads
    for (let c = -7; c <= 7; c++) {
      const dataBar = new THREE.Mesh(new THREE.BoxGeometry(0.32, cellH - 4.6, 0.20), mats.copperHeatSpreader);
      dataBar.position.set(c * 4.2, 0, -0.04);
      dataBar.userData.noEdges = true;
      g.add(dataBar);
    }
    const muxBar = new THREE.Mesh(createChamferedBoxGeo(cellW - 6.0, 1.5, 0.22, 0.2, 0.02, 'z'), mats.goldPlating);
    muxBar.position.set(0, -cellH * 0.45, -0.06);
    g.add(muxBar);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ltps-active-sd-metal',
        74,
        '#6366f1',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.12),
        new THREE.Vector3(98, 8, -54),
        cp,
        0.24
      ),
      true
    );
  }

  // D75: SiNx Inorganic Passivation + Photosensitive Organic Planarization Layer (PLN) with Contact Vias
  {
    const g = new THREE.Group();
    const plnGeo = extrudeHiRes(createRoundedRectShape(cellW - 2.4, cellH - 2.4, 1.0), 0.16, 0.02, 0.02, 1, 16);
    applyPlanarUVs(plnGeo, cellW - 2.4, cellH - 2.4, 'xy-back');
    const pln = new THREE.Mesh(plnGeo, u.lcdPiPhotoAlignment);
    g.add(pln);

    for (let ix = -5; ix <= 5; ix++) {
      for (let iy = -3; iy <= 3; iy++) {
        const via = new THREE.Mesh(hiResCyl(0.45, 0.28, 0.24, 12).rotateX(Math.PI / 2), mats.goldPlating);
        via.position.set(ix * 5.6, iy * 5.8, -0.04);
        via.userData.noEdges = true;
        g.add(via);
      }
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-passivation-pln-vias',
        75,
        '#8b5cf6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.09),
        new THREE.Vector3(98, -22, -52),
        cp,
        0.24
      ),
      true
    );
  }

  // D76: Inter-Substrate Conductive Silver Common Transfer Dots (Ag Transfer) & ODF UV End-Seal
  {
    const g = new THREE.Group();
    const sealGeo = extrudeHiRes(
      createFrameShape(cellW - 0.6, cellH - 0.6, 1.1, cellW - 2.8, cellH - 2.8, 0.7),
      0.34,
      0.03,
      0.03,
      1,
      18
    );
    g.add(new THREE.Mesh(sealGeo, mats.makeupSealViolet));

    // 4 Corner Conductive Silver-Epoxy Common Transfer Dots + concentric gold capture pads
    for (const [cx, cy] of [
      [-cellW * 0.46, cellH * 0.45],
      [cellW * 0.46, cellH * 0.45],
      [-cellW * 0.46, -cellH * 0.45],
      [cellW * 0.46, -cellH * 0.45],
    ]) {
      const pad = new THREE.Mesh(hiResCyl(1.75, 1.75, 0.36, 18).rotateX(Math.PI / 2), mats.goldPlating);
      pad.position.set(cx, cy, 0);
      const dot = new THREE.Mesh(hiResCyl(1.25, 1.25, 0.48, 18).rotateX(Math.PI / 2), mats.sinteredSilver);
      dot.position.set(cx, cy, 0);
      g.add(pad, dot);
    }

    const endPlug = new THREE.Mesh(createChamferedBoxGeo(5.8, 1.7, 0.48, 0.4, 0.05, 'z'), mats.opticalCementClear);
    endPlug.position.set(0, cellH * 0.48, 0);
    g.add(endPlug);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-ag-common-odf-seal',
        76,
        '#a855f7',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.14),
        new THREE.Vector3(0, -60, -58),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // GROUP D: Backlight Unit (BLU) Optical Film Separation & Structural LCM Frame (D77–D81)
  // =========================================================================

  // D77: Upper Optical Diffuser Film (Top Diffuser — Low-Haze Prism-Protection & Moire Elimination Sheet)
  {
    const g = new THREE.Group();
    const diffGeo = extrudeHiRes(createRoundedRectShape(blW, blH, 1.2), 0.14, 0.02, 0.02, 1, 16);
    applyBoxUVs(diffGeo, 18);
    g.add(new THREE.Mesh(diffGeo, u.lcdDiffuserMicroBeads));

    for (const sx of [-18, 18]) {
      const ear = new THREE.Mesh(createChamferedBoxGeo(4.2, 2.2, 0.16, 0.3, 0.02, 'z'), u.lcdDiffuserMicroBeads);
      ear.position.set(sx, blH * 0.5 + 0.8, 0);
      const hole = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.22, 12).rotateX(Math.PI / 2), mats.matteBlackAnodized);
      hole.position.set(sx, blH * 0.5 + 0.9, 0);
      hole.userData.noEdges = true;
      g.add(ear, hole);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-upper-diffuser-film',
        77,
        '#e2e8f0',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.66),
        new THREE.Vector3(96, -50, -44),
        cp,
        0.22
      ),
      true
    );
  }

  // D78: Vertical-Axis Micro-Prism Sheet (V-BEF: 90 deg Apex, 24 um Pitch — Vertical Collimation)
  {
    const g = new THREE.Group();
    const baseGeo = extrudeHiRes(createRoundedRectShape(blW - 0.4, blH - 0.4, 1.0), 0.14, 0.02, 0.02, 1, 16);
    applyBoxUVs(baseGeo, 16);
    g.add(new THREE.Mesh(baseGeo, u.lcdBefPrismGroovesV));

    const triShape = new THREE.Shape();
    triShape.moveTo(-0.55, 0);
    triShape.lineTo(0, 0.55);
    triShape.lineTo(0.55, 0);
    triShape.closePath();
    const ridgeGeo = markHiRes(
      new THREE.ExtrudeGeometry(triShape, { depth: blW - 4.0, bevelEnabled: false })
    );
    ridgeGeo.rotateY(Math.PI / 2);
    ridgeGeo.translate(-(blW - 4.0) * 0.5, 0, 0);

    for (let i = -8; i <= 8; i++) {
      const ridge = new THREE.Mesh(ridgeGeo, u.lcdBefPrismGroovesV);
      ridge.position.set(0, i * 2.4, -0.07);
      ridge.rotation.x = -Math.PI / 2;
      ridge.userData.noEdges = true;
      g.add(ridge);
    }

    const ear = new THREE.Mesh(createChamferedBoxGeo(4.4, 1.8, 0.16, 0.25, 0.02, 'z'), mats.goldPlating);
    ear.position.set(-blW * 0.34, blH * 0.5 + 0.7, 0);
    g.add(ear);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-v-bef-prism-film',
        78,
        '#fbbf24',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.36),
        new THREE.Vector3(-96, 44, -34),
        cp,
        0.24
      ),
      true
    );
  }

  // D79: Horizontal-Axis Crossed Micro-Prism Sheet (H-BEF: 90 deg Crossed with V-BEF -> +115% Luminance Gain)
  {
    const g = new THREE.Group();
    const baseGeo = extrudeHiRes(createRoundedRectShape(blW - 0.4, blH - 0.4, 1.0), 0.14, 0.02, 0.02, 1, 16);
    applyBoxUVs(baseGeo, 16);
    g.add(new THREE.Mesh(baseGeo, u.lcdBefPrismGroovesH));

    const triShape = new THREE.Shape();
    triShape.moveTo(-0.55, 0);
    triShape.lineTo(0, 0.55);
    triShape.lineTo(0.55, 0);
    triShape.closePath();
    const ridgeGeo = markHiRes(
      new THREE.ExtrudeGeometry(triShape, { depth: blH - 4.0, bevelEnabled: false })
    );
    ridgeGeo.rotateX(Math.PI / 2);
    ridgeGeo.translate(0, (blH - 4.0) * 0.5, 0);

    for (let i = -12; i <= 12; i++) {
      const ridge = new THREE.Mesh(ridgeGeo, u.lcdBefPrismGroovesH);
      ridge.position.set(i * 2.45, 0, -0.07);
      ridge.userData.noEdges = true;
      g.add(ridge);
    }

    const ear = new THREE.Mesh(createChamferedBoxGeo(4.4, 1.8, 0.16, 0.25, 0.02, 'z'), mats.beCuSpring);
    ear.position.set(blW * 0.34, blH * 0.5 + 0.7, 0);
    g.add(ear);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-h-bef-prism-film',
        79,
        '#f59e0b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.12),
        new THREE.Vector3(-96, -18, -32),
        cp,
        0.24
      ),
      true
    );
  }

  // D80: LGP Light-Incident Micro-V-Groove Coupling Edge & 3-Side White Perimeter Reflective Tapes
  {
    const g = new THREE.Group();
    const topGeo = createChamferedBoxGeo(blW + 0.8, 1.35, 0.82, 0.15, 0.03, 'z');
    applyBoxUVs(topGeo, 14);
    const topTape = new THREE.Mesh(topGeo, u.lcdDiffuserMicroBeads);
    topTape.position.set(0, blH * 0.5 + 0.35, 0);
    const sideGeo = createChamferedBoxGeo(1.35, blH + 0.8, 0.82, 0.15, 0.03, 'z');
    applyBoxUVs(sideGeo, 14);
    const leftTape = new THREE.Mesh(sideGeo, u.lcdDiffuserMicroBeads);
    leftTape.position.set(-blW * 0.5 - 0.35, 0, 0);
    const rightTape = new THREE.Mesh(sideGeo, u.lcdDiffuserMicroBeads);
    rightTape.position.set(blW * 0.5 + 0.35, 0, 0);
    g.add(topTape, leftTape, rightTape);

    const couplingBar = new THREE.Mesh(createChamferedBoxGeo(blW - 2.0, 1.85, 0.76, 0.2, 0.04, 'z'), mats.evfLensField);
    couplingBar.position.set(0, -blH * 0.5 - 0.45, 0);
    g.add(couplingBar);

    for (let i = -14; i <= 14; i++) {
      const tooth = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.52, 0.72, 4), mats.coverGlass);
      tooth.position.set(i * 2.1, -blH * 0.5 - 1.35, 0);
      tooth.rotation.z = Math.PI;
      tooth.userData.noEdges = true;
      g.add(tooth);
    }

    pushPart(
      finalizeLcdUltraPart(
        'lcd-lgp-vgroove-edge-tape',
        80,
        '#f8fafc',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.55),
        new THREE.Vector3(0, -64, -30),
        cp,
        0.24
      ),
      true
    );
  }

  // D81: Stamped SUS304 BLU Metal Back Chassis (Bottom Bezel Frame) & ESR Mirror Adhesive Layer
  {
    const g = new THREE.Group();
    const trayGeo = extrudeHiRes(createRoundedRectShape(blW + 1.8, blH + 1.8, 1.6), 0.28, 0.04, 0.04, 2, 18);
    applyBoxUVs(trayGeo, 18);
    g.add(new THREE.Mesh(trayGeo, u.lcdBrushedSus304Blu));

    // Stamped stiffening emboss ribs across stainless tray back
    for (const ry of [-11.5, 0, 11.5]) {
      const rib = new THREE.Mesh(createChamferedBoxGeo(blW - 12.0, 1.4, 0.38, 0.3, 0.04, 'z'), u.lcdBrushedSus304Blu);
      rib.position.set(0, ry, 0.10);
      g.add(rib);
    }

    const wallGeo = extrudeHiRes(
      createFrameShape(blW + 1.8, blH + 1.8, 1.6, blW + 0.2, blH + 0.2, 1.2),
      1.15,
      0.04,
      0.04,
      1,
      18
    );
    applyBoxUVs(wallGeo, 16);
    const wall = new THREE.Mesh(wallGeo, u.lcdBrushedSus304Blu);
    wall.position.z = -0.52;
    g.add(wall);

    for (const sx of [-22, 0, 22]) {
      for (const sy of [-1, 1]) {
        const clip = new THREE.Mesh(createChamferedBoxGeo(4.2, 1.2, 0.35, 0.15, 0.03, 'z'), mats.titaniumRivet);
        clip.position.set(sx, sy * (blH * 0.5 + 0.9), -0.85);
        g.add(clip);
      }
    }

    const esrTape = new THREE.Mesh(
      extrudeHiRes(createFrameShape(blW - 1.2, blH - 1.2, 1.0, blW - 4.4, blH - 4.4, 0.8), 0.10, 0.015, 0.015, 1, 16),
      mats.thermalTransferTape
    );
    esrTape.position.z = -0.22;
    g.add(esrTape);

    pushPart(
      finalizeLcdUltraPart(
        'lcd-blu-metal-back-bezel',
        81,
        '#94a3b8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.32),
        new THREE.Vector3(94, 48, -32),
        cp,
        0.26
      ),
      true
    );
  }

  return { parts, monitorParts };
}
