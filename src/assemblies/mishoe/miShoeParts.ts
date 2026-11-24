import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { MISHOE_EXPLANATIONS } from './miShoeExplanations';

function finalizeMiPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.25
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

  return {
    id,
    subsystem: 'mishoe',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: MISHOE_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/** Helper to rotate a centered XY-extruded plate so its thickness lies along Y. */
function makeHorizPlate(
  shape: THREE.Shape,
  thickness: number,
  mat: THREE.Material,
  bevel = 0.08,
  curveSegs = 14
): THREE.Mesh {
  const geo = extrudeCentered(shape, thickness, bevel, bevel, curveSegs);
  geo.rotateX(Math.PI / 2);
  return new THREE.Mesh(geo, mat);
}

/** Helper to build a realistic precision micro screw with head, cross slot, and threaded shank. */
function makePrecisionScrew(
  headR: number,
  headH: number,
  shankR: number,
  shankL: number,
  headMat: THREE.Material,
  shankMat: THREE.Material
): THREE.Group {
  const s = new THREE.Group();
  const head = new THREE.Mesh(new THREE.CylinderGeometry(headR, headR * 0.94, headH, 16), headMat);
  head.position.y = headH * 0.5;
  const shank = new THREE.Mesh(new THREE.CylinderGeometry(shankR, shankR * 0.88, shankL, 12), shankMat);
  shank.position.y = -shankL * 0.5;
  shank.userData.noEdges = true;
  // Cross recess detail on screw top
  const slot1 = new THREE.Mesh(new THREE.BoxGeometry(headR * 1.15, 0.14, headR * 0.28), shankMat);
  slot1.position.y = headH + 0.02;
  slot1.userData.noEdges = true;
  const slot2 = new THREE.Mesh(new THREE.BoxGeometry(headR * 0.28, 0.14, headR * 1.15), shankMat);
  slot2.position.y = headH + 0.02;
  slot2.userData.noEdges = true;
  s.add(head, shank, slot1, slot2);
  return s;
}

/**
 * Build all 32 sculpted 3D CAD sub-assemblies of the Sony Multi Interface (MI) Shoe
 * Ultra-Dissection (MI01–MI32).
 *
 * Magnified ~2.5:1 CAD scale (ISO 518 internal 18.6x16.0mm -> ~46.5x40.0 CAD units), centered at (0, 0, 0).
 * Axes: +Y = upward toward accessory/sky, +Z = camera front (hidden 21-pin connector under overhang),
 * -Z = camera rear (accessory slide-in entry), -Y = into camera top deck & mainboard interface.
 * Strictly visible ONLY in standalone 'mishoe' mode.
 */
export function buildMiShoeParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // Master ISO 518 magnified dimensions (2.5x scale)
  const OUTER_W = 50.0;
  const INNER_W = 44.0;
  const THROAT_W = 30.0;
  const RAIL_L = 44.0;

  // 21-pin array horizontal coordinate helper (Pin 1 = left -X, Pin 21 = right +X)
  const PIN_PITCH = 1.72;
  const pinX = (pinNum: number) => (pinNum - 11) * PIN_PITCH; // Pin 1 = -17.2, Pin 11 = 0, Pin 21 = +17.2

  // =========================================================================
  // MI01. Sony OEM Shoe Cap (Ref.9 / 443873412 SHOE CAP 875)
  // =========================================================================
  {
    const g = new THREE.Group();
    const topBody = makeHorizPlate(createRoundedRectShape(43.2, 41.0, 2.6), 1.45, mats.matteBlackAnodized, 0.14);
    topBody.position.set(0, 1.3, -1.2);
    // Sliding foot plate engaging ISO 518 rails
    const footPlate = makeHorizPlate(createRoundedRectShape(42.2, 34.0, 1.6), 1.15, mats.icEpoxy, 0.08);
    footPlate.position.set(0, 0.0, -2.0);
    // Narrow neck passing through 30mm throat
    const neck = new THREE.Mesh(new THREE.BoxGeometry(28.4, 0.9, 32.0), mats.matteBlackAnodized);
    neck.position.set(0, 0.65, -2.0);
    // Rear grip knurling ribs & pull lip
    for (let i = 0; i < 5; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(30.0, 0.28, 0.65), mats.evfEyecupRubber);
      rib.position.set(0, 2.1, -14.5 - i * 1.45);
      rib.userData.noEdges = true;
      g.add(rib);
    }
    // Front protective shroud lip sealing the 21-pin cavity
    const frontLip = new THREE.Mesh(new THREE.BoxGeometry(38.0, 2.3, 1.6), mats.matteBlackAnodized);
    frontLip.position.set(0, 0.6, 17.5);
    g.add(topBody, footPlate, neck, frontLip);

    parts.push(
      finalizeMiPart(
        'mi-shoe-cap-875',
        1,
        '#334155',
        g,
        new THREE.Vector3(0, 6.2, -2.0),
        new THREE.Vector3(0, 22.5, -22.0),
        cp
      )
    );
  }

  // =========================================================================
  // MI02. Accessory Weather-Sealing Silicone Skirt Interface
  // =========================================================================
  {
    const g = new THREE.Group();
    const outerSkirt = makeHorizPlate(
      createFrameShape(56.4, 51.0, 4.8, 49.4, 43.8, 3.0),
      1.6,
      mats.epdmGasket,
      0.16,
      18
    );
    // Flared flexible sealing lip drooping around outer shoe edge
    const flareLip = makeHorizPlate(
      createFrameShape(59.0, 53.6, 5.4, 55.2, 49.8, 4.4),
      0.85,
      mats.butylDamperRubber,
      0.12,
      18
    );
    flareLip.position.y = -0.95;
    // Upper accessory mating ring collar
    const collar = makeHorizPlate(
      createFrameShape(52.0, 46.8, 3.8, 46.0, 40.8, 2.4),
      0.7,
      mats.evfEyecupRubber,
      0.08,
      16
    );
    collar.position.y = 0.95;
    g.add(outerSkirt, flareLip, collar);

    parts.push(
      finalizeMiPart(
        'mi-accessory-wp-skirt',
        2,
        '#475569',
        g,
        new THREE.Vector3(0, 5.0, 0.5),
        new THREE.Vector3(0, 19.0, 8.5),
        cp
      )
    );
  }

  // =========================================================================
  // MI03. MI Shoe Shell Plate (Ref.327 / 500294302 ISO 518 Stainless U-Rail)
  // =========================================================================
  {
    const g = new THREE.Group();
    const WALL_H = 4.6;
    const RAIL_T = 1.35;

    // Base perimeter rim (open in middle for screw cover & spring plate)
    const baseFrame = makeHorizPlate(
      createFrameShape(OUTER_W, RAIL_L, 2.4, 34.0, 31.0, 1.4),
      1.1,
      mats.mountStainlessFlange,
      0.08
    );
    baseFrame.position.y = -1.65;

    // Left & right vertical sidewalls
    for (const side of [-1, 1]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(2.6, WALL_H, RAIL_L - 1.2), mats.mountStainlessFlange);
      wall.position.set(side * (OUTER_W * 0.5 - 1.3), 0.7, 0);
      // Inward horizontal rail overhang (ISO 518 flange)
      const lipW = (OUTER_W - THROAT_W) * 0.5;
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(lipW, RAIL_T, RAIL_L - 1.2), mats.stainlessMachined);
      topRail.position.set(side * (OUTER_W * 0.5 - lipW * 0.5), WALL_H * 0.5 + 0.5, 0);
      // Chamfered rear slide-in entry bevel
      const entryGuide = new THREE.Mesh(new THREE.BoxGeometry(lipW * 0.75, RAIL_T * 0.75, 2.2), mats.stainlessMachined);
      entryGuide.position.set(side * (OUTER_W * 0.5 - lipW * 0.55), WALL_H * 0.5 + 0.5, -RAIL_L * 0.5 - 0.3);
      entryGuide.rotation.y = side * 0.18;
      g.add(wall, topRail, entryGuide);
    }

    // Iconic front roof overhang shielding the 21 hidden electronic pins!
    const frontRoof = makeHorizPlate(createRoundedRectShape(OUTER_W, 10.6, 2.0), RAIL_T, mats.stainlessMachined, 0.08);
    frontRoof.position.set(0, WALL_H * 0.5 + 0.5, RAIL_L * 0.5 - 5.1);

    // Front closure vertical wall
    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(OUTER_W - 2.0, WALL_H, 2.0), mats.mountStainlessFlange);
    frontWall.position.set(0, 0.7, RAIL_L * 0.5 - 1.0);

    g.add(baseFrame, frontRoof, frontWall);

    parts.push(
      finalizeMiPart(
        'mi-shoe-shell-plate',
        3,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 3.8, 0),
        new THREE.Vector3(0, 14.5, 0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // MI04. 3-Point Lock-Pin Recesses & Front Datum Stopper
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 precision hardened steel lock-pin catch collars (rear-center + left/right forward)
    const lockPts: Array<[number, number, number]> = [
      [0, -13.5, 2.2],
      [-15.2, 6.2, 1.85],
      [15.2, 6.2, 1.85],
    ];
    for (const [lx, lz, r] of lockPts) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.52, 10, 20), mats.titaniumRivet);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(lx, 0, lz);
      const pocket = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.78, r * 0.78, 0.65, 16), mats.matteBlackAnodized);
      pocket.position.set(lx, -0.25, lz);
      g.add(ring, pocket);
    }
    // Front precision datum stopper bar establishing 21-pin insertion depth
    const stopper = new THREE.Mesh(new THREE.BoxGeometry(36.0, 1.4, 2.2), mats.invarScaleBar);
    stopper.position.set(0, 0.5, 13.8);
    // Two side alignment index lugs
    for (const sx of [-19.2, 19.2]) {
      const lug = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 4.2), mats.invarScaleBar);
      lug.position.set(sx, 0.6, 12.2);
      g.add(lug);
    }
    g.add(stopper);

    parts.push(
      finalizeMiPart(
        'mi-lock-pin-recesses',
        4,
        '#64748b',
        g,
        new THREE.Vector3(0, 2.5, 0),
        new THREE.Vector3(0, 11.8, 12.5),
        cp
      )
    );
  }

  // =========================================================================
  // MI05. MI Shoe Screw Cover Plate (Ref.329 / 500294602)
  // =========================================================================
  {
    const g = new THREE.Group();
    const coverPlate = makeHorizPlate(
      createFrameShape(33.4, 27.6, 1.8, 12.2, 12.2, 6.0), // central opening for X-sync contact & spring arms
      0.72,
      mats.matteBlackAnodized,
      0.06
    );
    // Rear slide-tab tongue & M1.4 screw boss notch
    const rearTab = makeHorizPlate(createRoundedRectShape(12.0, 5.2, 1.2), 0.72, mats.matteBlackAnodized, 0.05);
    rearTab.position.set(0, 0, -15.4);
    // Two forward retaining hook ears engaging under the shell lip
    for (const hx of [-11.5, 11.5]) {
      const hook = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.55, 2.6), mats.stainlessMachined);
      hook.position.set(hx, -0.1, 14.8);
      g.add(hook);
    }
    g.add(coverPlate, rearTab);

    parts.push(
      finalizeMiPart(
        'mi-shoe-screw-cover',
        5,
        '#1e293b',
        g,
        new THREE.Vector3(0, 2.65, -2.5),
        new THREE.Vector3(0, 15.8, -24.5),
        cp
      )
    );
  }

  // =========================================================================
  // MI06. M1.4 Europe Micro Cover Screw (Ref.330 / 428743511 L=1.4mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const microScrew = makePrecisionScrew(1.75, 0.55, 0.88, 2.4, mats.matteBlackAnodized, mats.stainlessMachined);
    g.add(microScrew);

    parts.push(
      finalizeMiPart(
        'mi-m14-europe-screw',
        6,
        '#0f172a',
        g,
        new THREE.Vector3(0, 3.05, -18.0),
        new THREE.Vector3(0, 20.8, -29.0),
        cp
      )
    );
  }

  // =========================================================================
  // MI07. MI Shoe Dual-Wing Anti-Rattle Spring Plate (Ref.331 / 500294502)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Central stamped anchor bridge
    const centerBridge = makeHorizPlate(
      createFrameShape(31.0, 24.0, 1.6, 16.0, 14.0, 3.0),
      0.52,
      mats.mountSpringSteel,
      0.04
    );
    // Two iconic angled cantilever upward-pressing anti-rattle spring wings
    for (const side of [-1, 1]) {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.48, 17.5), mats.beCuSpring);
      wing.position.set(side * 12.2, 1.05, -1.2);
      wing.rotation.x = -0.11;
      // Curved tip pad contacting accessory foot underside
      const tip = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 4.6, 12), mats.beCuSpring);
      tip.rotation.z = Math.PI / 2;
      tip.position.set(side * 12.2, 1.85, -9.2);
      g.add(wing, tip);
    }
    g.add(centerBridge);

    parts.push(
      finalizeMiPart(
        'mi-shoe-spring-plate',
        7,
        '#d97706',
        g,
        new THREE.Vector3(0, 2.15, -2.5),
        new THREE.Vector3(0, 9.6, -7.5),
        cp
      )
    );
  }

  // =========================================================================
  // MI08. 4× Special-Head M1.7 Clamping Screws (Ref.328 / 500294701 L=3.3mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const screwCoords: Array<[number, number]> = [
      [-14.6, -12.6],
      [14.6, -12.6],
      [-14.6, 9.6],
      [14.6, 9.6],
    ];
    for (const [sx, sz] of screwCoords) {
      const sc = makePrecisionScrew(2.35, 0.72, 1.18, 6.2, mats.silverElectrode, mats.stainlessMachined);
      sc.position.set(sx, 0, sz);
      g.add(sc);
    }

    parts.push(
      finalizeMiPart(
        'mi-special-head-screws',
        8,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 2.3, 0),
        new THREE.Vector3(0, 13.8, -11.5),
        cp
      )
    );
  }

  // =========================================================================
  // MI09. ISO 518 Left & Right Frame Ground Contact Rails (Pins 23 & 24)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const side of [-1, 1]) {
      // Inner gold/silver low-resistance rail contact strip inside left/right shoe groove
      const railBar = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.6, 35.0), mats.silverElectrode);
      railBar.position.set(side * (INNER_W * 0.5 - 0.2), 0.7, -1.5);
      // Downward chassis ground bridge tab
      const gndTab = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.6, 6.0), mats.copperHeatSpreader);
      gndTab.position.set(side * (INNER_W * 0.5 - 0.5), -1.6, -12.0);
      g.add(railBar, gndTab);
    }
    // Cross grounding tie strap at rear
    const tieBar = new THREE.Mesh(new THREE.BoxGeometry(INNER_W - 1.0, 0.45, 2.2), mats.silverElectrode);
    tieBar.position.set(0, -1.8, -18.2);
    g.add(tieBar);

    parts.push(
      finalizeMiPart(
        'mi-frame-ground-rails',
        9,
        '#64748b',
        g,
        new THREE.Vector3(0, 3.3, 0),
        new THREE.Vector3(0, 10.6, -2.5),
        cp
      )
    );
  }

  // =========================================================================
  // MI10. Center ISO 518 X-Sync Contact Dome (Pin 22: ISO_SHOE_X)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Insulating PPS collar separating X-Sync from surrounding ground floor
    const insRing = new THREE.Mesh(new THREE.CylinderGeometry(5.3, 5.5, 1.15, 24), mats.mountPpsInsulator);
    // Iconic golden central circular X-Sync contact pad
    const goldPad = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 3.9, 1.35, 24), mats.goldPlating);
    goldPad.position.y = 0.22;
    const domeTop = new THREE.Mesh(
      new THREE.SphereGeometry(3.8, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.28),
      mats.goldPlating
    );
    domeTop.scale.set(1, 0.35, 1);
    domeTop.position.y = 0.85;
    domeTop.userData.noEdges = true;
    // Bottom solder contact pin extending down to MIS-2006 flex
    const tailPin = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.0, 2.2, 12), mats.goldPlating);
    tailPin.position.y = -1.3;
    g.add(insRing, goldPad, domeTop, tailPin);

    parts.push(
      finalizeMiPart(
        'mi-center-xsync-contact',
        10,
        '#eab308',
        g,
        new THREE.Vector3(0, 2.0, -3.2),
        new THREE.Vector3(0, 6.8, -3.5),
        cp
      )
    );
  }

  // =========================================================================
  // MI11. Front 21-Pin Protected Recessed Connector Shroud (LCP Comb)
  // =========================================================================
  {
    const g = new THREE.Group();
    const housingBody = makeHorizPlate(createRoundedRectShape(40.2, 6.2, 1.0), 3.6, mats.mountPpsInsulator, 0.08);
    // 22 precision comb separator teeth isolating each of the 21 micro-pins
    const toothGeo = new THREE.BoxGeometry(0.42, 2.4, 4.6);
    const toothInst = new THREE.InstancedMesh(toothGeo, mats.matteBlackAnodized, 22);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 22; i++) {
      dm.position.set(pinX(1) - PIN_PITCH * 0.5 + i * PIN_PITCH, 0.2, -1.6);
      dm.updateMatrix();
      toothInst.setMatrixAt(i, dm.matrix);
    }
    toothInst.instanceMatrix.needsUpdate = true;
    toothInst.userData.noEdges = true;

    // Tapered left/right alignment guide ears
    for (const side of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(1.8, 3.4, 5.2), mats.mountPpsInsulator);
      ear.position.set(side * 19.8, 0, -1.2);
      g.add(ear);
    }
    g.add(housingBody, toothInst);

    parts.push(
      finalizeMiPart(
        'mi-front-21pin-shroud',
        11,
        '#1e293b',
        g,
        new THREE.Vector3(0, 3.0, 17.6),
        new THREE.Vector3(0, 7.6, 20.0),
        cp
      )
    );
  }

  // Helper to construct each individually selectable functional pin group (MI12–MI20)
  const buildPinGroupMesh = (
    pinNumbers: number[],
    accentMat: THREE.Material,
    widePower = false
  ): THREE.Group => {
    const g = new THREE.Group();
    for (const pNum of pinNumbers) {
      const x = pinX(pNum);
      const pw = widePower ? 1.12 : 0.86;
      // Gold mating blade
      const blade = new THREE.Mesh(new THREE.BoxGeometry(pw, 0.58, 5.4), mats.goldPlating);
      blade.position.set(x, 0.25, -0.4);
      // Color-coded functional dielectric carrier & trace header for instant visual decoding
      const badge = new THREE.Mesh(new THREE.BoxGeometry(pw * 1.15, 0.95, 2.2), accentMat);
      badge.position.set(x, -0.15, 2.4);
      // Downward SMT solder tail to MIS-2006
      const tail = new THREE.Mesh(new THREE.BoxGeometry(pw * 0.8, 1.5, 0.7), mats.goldPlating);
      tail.position.set(x, -0.9, 3.1);
      tail.userData.noEdges = true;
      g.add(blade, badge, tail);
    }
    // If multiple pins in group, add subtle horizontal bus tie indicator bar on rear side
    if (pinNumbers.length >= 2) {
      const minX = pinX(Math.min(...pinNumbers));
      const maxX = pinX(Math.max(...pinNumbers));
      const busBar = new THREE.Mesh(new THREE.BoxGeometry(maxX - minX + 1.1, 0.34, 0.65), accentMat);
      busBar.position.set((minX + maxX) * 0.5, -0.5, 2.75);
      busBar.userData.noEdges = true;
      g.add(busBar);
    }
    return g;
  };

  // =========================================================================
  // MI12–MI20: The 9 Functional Pin Groups Across All 21 Hidden Front Pins!
  // =========================================================================
  // MI12. Pins 1–3: ID3 / ID2 / ID1 Accessory Identification
  parts.push(
    finalizeMiPart(
      'mi-pins-1to3-id',
      12,
      '#10b981',
      buildPinGroupMesh([1, 2, 3], mats.cfaGreen),
      new THREE.Vector3(0, 2.85, 16.4),
      new THREE.Vector3(-8.5, 6.2, 27.5),
      cp
    )
  );

  // MI13. Pins 4–6: Analog Stereo Mic (MIC_GND / L / R) & GVIF
  parts.push(
    finalizeMiPart(
      'mi-pins-4to6-analog-mic',
      13,
      '#f59e0b',
      buildPinGroupMesh([4, 5, 6], mats.tantalumCapYellow),
      new THREE.Vector3(0, 2.85, 16.4),
      new THREE.Vector3(-5.2, 4.8, 30.5),
      cp
    )
  );

  // MI14. Pins 7 & 15: Clean Logic Reference Ground (REG_GND)
  parts.push(
    finalizeMiPart(
      'mi-pins-7-15-reg-gnd',
      14,
      '#475569',
      buildPinGroupMesh([7, 15], mats.silverElectrode),
      new THREE.Vector3(0, 2.85, 16.4),
      new THREE.Vector3(0.0, 2.2, 24.5),
      cp
    )
  );

  // MI15. Pins 8–12: Digital Audio I2S/TDM 4-Ch (24-bit/48kHz & 2026 32-bit Float/96kHz)
  parts.push(
    finalizeMiPart(
      'mi-pins-8to12-digital-audio',
      15,
      '#06b6d4',
      buildPinGroupMesh([8, 9, 10, 11, 12], mats.vcWorkingFluidCyan),
      new THREE.Vector3(0, 2.85, 16.4),
      new THREE.Vector3(-1.2, 6.8, 33.5),
      cp
    )
  );

  // MI16. Pin 13: Switched Regulated 3.15 V Logic Supply (LOGIC_VDD)
  parts.push(
    finalizeMiPart(
      'mi-pin-13-logic-vdd',
      16,
      '#3b82f6',
      buildPinGroupMesh([13], mats.cfaBlue),
      new THREE.Vector3(0, 2.85, 16.4),
      new THREE.Vector3(2.2, 4.4, 29.0),
      cp
    )
  );

  // MI17. Pins 14 & 16: Center Mic / Aux Line Audio & Reset
  parts.push(
    finalizeMiPart(
      'mi-pins-14-16-aux-audio',
      17,
      '#14b8a6',
      buildPinGroupMesh([14, 16], mats.ispSiliconDie),
      new THREE.Vector3(0, 2.85, 16.4),
      new THREE.Vector3(4.2, 2.8, 27.0),
      cp
    )
  );

  // MI18. Pin 17: High-Current Battery Direct Power (UNREG 6.1–8.4 V / 1.6 A)
  parts.push(
    finalizeMiPart(
      'mi-pin-17-unreg-power',
      18,
      '#ea580c',
      buildPinGroupMesh([17], mats.copperCoil, true),
      new THREE.Vector3(0, 2.85, 16.4),
      new THREE.Vector3(6.2, 5.8, 31.5),
      cp
    )
  );

  // MI19. Pins 18–20: Bidirectional TTL / ADI / HSS Flash Communication (F3 / F2 / F1#)
  parts.push(
    finalizeMiPart(
      'mi-pins-18to20-ttl-flash',
      19,
      '#ef4444',
      buildPinGroupMesh([18, 19, 20], mats.bodyRecRed),
      new THREE.Vector3(0, 2.85, 16.4),
      new THREE.Vector3(8.5, 4.8, 29.0),
      cp
    )
  );

  // MI20. Pin 21: High-Current Power Ground & ADI Detect (PGND)
  parts.push(
    finalizeMiPart(
      'mi-pin-21-pgnd-detect',
      20,
      '#334155',
      buildPinGroupMesh([21], mats.ferriteInductor, true),
      new THREE.Vector3(0, 2.85, 16.4),
      new THREE.Vector3(10.8, 3.2, 25.5),
      cp
    )
  );

  // =========================================================================
  // MI21. 21-Ch Phosphor-Bronze Cantilever Spring Beams (Self-Cleaning Wiping)
  // =========================================================================
  {
    const g = new THREE.Group();
    const beamGeo = new THREE.BoxGeometry(0.68, 0.34, 4.4);
    const beamInst = new THREE.InstancedMesh(beamGeo, mats.beCuSpring, 21);
    const tipGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.7, 10);
    tipGeo.rotateZ(Math.PI / 2);
    const tipInst = new THREE.InstancedMesh(tipGeo, mats.goldPlating, 21);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 21; i++) {
      const x = pinX(i + 1);
      dm.position.set(x, 0.15, 0);
      dm.rotation.set(0.18, 0, 0);
      dm.updateMatrix();
      beamInst.setMatrixAt(i, dm.matrix);

      dm.position.set(x, 0.56, -1.9);
      dm.rotation.set(0, 0, 0);
      dm.updateMatrix();
      tipInst.setMatrixAt(i, dm.matrix);
    }
    beamInst.instanceMatrix.needsUpdate = true;
    tipInst.instanceMatrix.needsUpdate = true;
    beamInst.userData.noEdges = true;
    tipInst.userData.noEdges = true;

    const carrierBar = new THREE.Mesh(new THREE.BoxGeometry(37.6, 0.65, 1.4), mats.zifIvoryPlastic);
    carrierBar.position.set(0, -0.25, 2.1);
    g.add(beamInst, tipInst, carrierBar);

    parts.push(
      finalizeMiPart(
        'mi-cantilever-gold-beams',
        21,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 1.8, 15.8),
        new THREE.Vector3(0, 3.6, 15.0),
        cp
      )
    );
  }

  // =========================================================================
  // MI22. Sony OEM MIS-2006 Flexible Circuit Board (Ref.325 / A5001908A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper shoe-floor amber polyimide flex deck with front 21-pin pad row & center X-sync pad
    const topDeckFpc = makeHorizPlate(createRoundedRectShape(41.0, 36.0, 2.0), 0.42, mats.polyimideFpc, 0.03);
    // Stainless steel stiffener backing plate under 21-pin connector & X-sync
    const stiffener = makeHorizPlate(createRoundedRectShape(38.0, 9.0, 0.8), 0.35, mats.stainlessMachined, 0.02);
    stiffener.position.set(0, -0.35, 12.8);
    // Gold copper traces etched along top surface
    for (let i = -7; i <= 7; i++) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 22.0), mats.goldPlating);
      trace.position.set(i * 2.1, 0.24, 2.5);
      trace.userData.noEdges = true;
      g.add(trace);
    }
    // Downward S-bend ribbon tail diving through top-deck slot to mainboard ZIF connector
    const ribbonVert = new THREE.Mesh(new THREE.BoxGeometry(16.0, 10.6, 0.45), mats.polyimideFpc);
    ribbonVert.position.set(0, -5.2, 8.8);
    const ribbonFoot = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.42, 4.2), mats.polyimideFpc);
    ribbonFoot.position.set(0, -10.4, 10.6);
    // Gold finger termination pads at ZIF end
    const goldFingers = new THREE.Mesh(new THREE.BoxGeometry(14.6, 0.14, 2.4), mats.goldPlating);
    goldFingers.position.set(0, -10.16, 11.4);
    goldFingers.userData.noEdges = true;

    g.add(topDeckFpc, stiffener, ribbonVert, ribbonFoot, goldFingers);

    parts.push(
      finalizeMiPart(
        'mi-mis2006-flex-board',
        22,
        '#d97706',
        g,
        new THREE.Vector3(0, 0.6, 1.0),
        new THREE.Vector3(0, 1.5, 4.5),
        cp
      )
    );
  }

  // =========================================================================
  // MI23. Sony OEM MI SHOE FPC WP RUBBER (850) (Ref.324 / 501695501)
  // =========================================================================
  {
    const g = new THREE.Group();
    const rubberPad = makeHorizPlate(
      createFrameShape(49.0, 42.5, 2.6, 18.0, 5.0, 1.2), // FPC pass-through slit
      1.15,
      mats.epdmGasket,
      0.1
    );
    // Raised perimeter waterproof compression sealing bead
    const sealBead = makeHorizPlate(
      createFrameShape(46.0, 39.5, 2.2, 43.2, 36.7, 1.8),
      0.48,
      mats.damperElastomer,
      0.06
    );
    sealBead.position.y = 0.65;
    // 4 raised O-ring grommet bosses sealing the M1.7 screw holes
    for (const [bx, bz] of [
      [-14.6, -12.6],
      [14.6, -12.6],
      [-14.6, 9.6],
      [14.6, 9.6],
    ] as Array<[number, number]>) {
      const boss = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.55, 10, 18), mats.damperElastomer);
      boss.rotation.x = Math.PI / 2;
      boss.position.set(bx, 0.65, bz);
      g.add(boss);
    }
    g.add(rubberPad, sealBead);

    parts.push(
      finalizeMiPart(
        'mi-fpc-wp-rubber',
        23,
        '#334155',
        g,
        new THREE.Vector3(0, -0.9, 0),
        new THREE.Vector3(0, -2.5, 0),
        cp
      )
    );
  }

  // =========================================================================
  // MI24. Magnesium Top-Deck Cast Boss Seat & Perimeter Drainage Moat
  // =========================================================================
  {
    const g = new THREE.Group();
    // Top deck magnesium housing cut-out block surrounding the MI shoe seat
    const deckBase = makeHorizPlate(
      createFrameShape(62.0, 54.0, 5.0, 18.2, 4.8, 1.0),
      2.3,
      mats.bodyMgShell,
      0.16
    );
    // Recessed drainage moat channel around the shoe footprint
    const moatRim = makeHorizPlate(
      createFrameShape(55.0, 47.6, 3.6, 50.8, 43.4, 2.8),
      0.75,
      mats.magnesiumCast,
      0.08
    );
    moatRim.position.y = 1.25;
    // Raised waterproof dam collar encircling the FPC slot so water can never drip in
    const slotDam = makeHorizPlate(
      createFrameShape(21.6, 7.6, 1.4, 18.2, 4.6, 0.9),
      1.1,
      mats.magnesiumCast,
      0.06
    );
    slotDam.position.set(0, 1.35, 8.8);
    // 4 machined mounting bosses
    for (const [bx, bz] of [
      [-14.6, -12.6],
      [14.6, -12.6],
      [-14.6, 9.6],
      [14.6, 9.6],
    ] as Array<[number, number]>) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.0, 2.6, 16), mats.magnesiumCast);
      pillar.position.set(bx, 0.2, bz);
      g.add(pillar);
    }
    g.add(deckBase, moatRim, slotDam);

    parts.push(
      finalizeMiPart(
        'mi-top-deck-boss-seat',
        24,
        '#475569',
        g,
        new THREE.Vector3(0, -3.1, 0),
        new THREE.Vector3(0, -6.8, 0),
        cp
      )
    );
  }

  // =========================================================================
  // MI25. Sony OEM Under-Deck MI SHOE FIX PLATE (88100) (Ref.311 / 500395901)
  // =========================================================================
  {
    const g = new THREE.Group();
    const plate = makeHorizPlate(
      createFrameShape(47.6, 40.4, 2.2, 18.4, 5.4, 1.0),
      1.25,
      mats.stainlessMachined,
      0.08
    );
    // 4 tapped burring thread bosses receiving the top Ref.328 M1.7 screws
    for (const [bx, bz] of [
      [-14.6, -12.6],
      [14.6, -12.6],
      [-14.6, 9.6],
      [14.6, 9.6],
    ] as Array<[number, number]>) {
      const nut = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 2.2, 16), mats.titaniumRivet);
      nut.position.set(bx, -0.5, bz);
      g.add(nut);
    }
    // Side load-spreading stiffening wings tying to top-deck ribs
    for (const side of [-1, 1]) {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.15, 22.0), mats.mountStainlessFlange);
      wing.position.set(side * 25.5, 0.0, -2.0);
      g.add(wing);
    }
    g.add(plate);

    parts.push(
      finalizeMiPart(
        'mi-shoe-fix-plate',
        25,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -5.4, 0),
        new THREE.Vector3(0, -11.5, 0),
        cp
      )
    );
  }

  // =========================================================================
  // MI26. Under-Deck Chassis Tie & Grounding Screws (Ref.312 & Ref.326)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Two long Ref.312 M1.7x5.5mm SPIN screws (pointing upward from beneath Fix Plate into chassis)
    for (const sx of [-25.5, 25.5]) {
      const scLong = makePrecisionScrew(2.2, 0.75, 1.1, 7.6, mats.brassGear, mats.stainlessMachined);
      scLong.rotation.x = Math.PI; // installed from underside upward
      scLong.position.set(sx, 0, -8.5);
      g.add(scLong);
    }
    // Two Ref.326 M1.7x3.0mm grounding screws
    for (const sx of [-25.5, 25.5]) {
      const scShort = makePrecisionScrew(2.0, 0.65, 1.0, 4.5, mats.silverElectrode, mats.stainlessMachined);
      scShort.rotation.x = Math.PI;
      scShort.position.set(sx, 0.4, 4.5);
      g.add(scShort);
    }

    parts.push(
      finalizeMiPart(
        'mi-underdeck-tie-screws',
        26,
        '#ca8a04',
        g,
        new THREE.Vector3(0, -6.8, 0),
        new THREE.Vector3(0, -15.5, -6.0),
        cp
      )
    );
  }

  // =========================================================================
  // MI27. 21-Ch Ultra-Low-Cap ESD/TVS Diode Array & 1.6 A Fuse Sub-Block
  // =========================================================================
  {
    const g = new THREE.Group();
    const subPcb = makeHorizPlate(createRoundedRectShape(16.0, 12.0, 1.0), 0.75, mats.hdiMainboardPcb, 0.04);
    // 3 multi-channel ultra-low-cap TVS diode array QFN chips
    for (let i = -1; i <= 1; i++) {
      const tvs = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.85, 2.2), mats.icEpoxy);
      tvs.position.set(i * 4.6, 0.78, 2.2);
      g.add(tvs);
    }
    // 1.6A UNREG fast-acting ceramic SMD chip fuse (gold end-caps + ivory body)
    const fuseBody = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.25, 2.6), mats.zifIvoryPlastic);
    fuseBody.position.set(-2.5, 0.95, -2.5);
    for (const fx of [-5.0, 0.0]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.32, 2.7), mats.goldPlating);
      cap.position.set(fx, 0.95, -2.5);
      g.add(cap);
    }
    // eFuse high-side MOSFET switch
    const efuse = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.95, 3.4), mats.npuSiliconDie);
    efuse.position.set(4.5, 0.82, -2.4);
    g.add(subPcb, fuseBody, efuse);

    parts.push(
      finalizeMiPart(
        'mi-esd-tvs-protection',
        27,
        '#f43f5e',
        g,
        new THREE.Vector3(-13.5, -8.8, 7.5),
        new THREE.Vector3(-14.0, -18.5, 11.0),
        cp
      )
    );
  }

  // =========================================================================
  // MI28. High-Voltage ISO-518 X-Sync IGBT Trigger & Opto-Isolator Circuit
  // =========================================================================
  {
    const g = new THREE.Group();
    const subPcb = makeHorizPlate(createRoundedRectShape(16.0, 12.0, 1.0), 0.75, mats.hdiMainboardPcb, 0.04);
    // High-voltage IGBT package with copper heatsink tab
    const igbt = new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.55, 4.8), mats.icEpoxy);
    igbt.position.set(-2.2, 1.1, 0.5);
    const tab = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.45, 2.0), mats.copperHeatSpreader);
    tab.position.set(-2.2, 0.6, 3.6);
    // White optical isolation coupler separating 3V camera logic from high-voltage flash
    const opto = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.4, 3.6), mats.ceramicAlumina);
    opto.position.set(4.2, 1.05, -0.5);
    // High-voltage clamping diode
    const clampD = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.0, 1.8), mats.bodyRecRed);
    clampD.position.set(4.2, 0.85, 3.2);
    g.add(subPcb, igbt, tab, opto, clampD);

    parts.push(
      finalizeMiPart(
        'mi-xsync-igbt-isolator',
        28,
        '#dc2626',
        g,
        new THREE.Vector3(13.5, -8.8, -6.5),
        new THREE.Vector3(14.0, -18.5, -9.0),
        cp
      )
    );
  }

  // =========================================================================
  // MI29. Accessory ID 100kΩ Pull-Up Network & 6-Step ADC Circuit
  // =========================================================================
  {
    const g = new THREE.Group();
    const subPcb = makeHorizPlate(createRoundedRectShape(16.0, 12.0, 1.0), 0.75, mats.hdiMainboardPcb, 0.04);
    // 3 precision 100kΩ ±1% thin-film resistor packages for ID1 / ID2 / ID3
    for (let i = -1; i <= 1; i++) {
      const res = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.72, 1.6), mats.cfaBlue);
      res.position.set(-3.8, 0.72, i * 2.8);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.68, 1.2), mats.smdCeramic);
      cap.position.set(-0.2, 0.7, i * 2.8);
      g.add(res, cap);
    }
    // SYSCON / Hotshoe ADC sensing MCU QFN chip
    const adcIc = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.15, 5.2), mats.ispSiliconDie);
    adcIc.position.set(4.2, 0.92, 0);
    g.add(subPcb, adcIc);

    parts.push(
      finalizeMiPart(
        'mi-id-resistor-adc-net',
        29,
        '#10b981',
        g,
        new THREE.Vector3(-13.5, -8.8, -6.5),
        new THREE.Vector3(-14.0, -20.5, -9.5),
        cp
      )
    );
  }

  // =========================================================================
  // MI30. EXT_LINE_SEL Audio Multiplexer & Common-Mode EMI Chokes
  // =========================================================================
  {
    const g = new THREE.Group();
    const subPcb = makeHorizPlate(createRoundedRectShape(16.0, 12.0, 1.0), 0.75, mats.hdiMainboardPcb, 0.04);
    // Ultra-low-Ron EXT_LINE_SEL audio mux IC
    const muxIc = new THREE.Mesh(new THREE.BoxGeometry(5.0, 1.05, 5.0), mats.vcWorkingFluidCyan);
    muxIc.position.set(-3.2, 0.88, 0.5);
    // 4 miniature ferrite common-mode EMI choke coils filtering Wi-Fi/RF noise from audio
    for (let i = 0; i < 4; i++) {
      const choke = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.35, 1.9), mats.ferriteInductor);
      choke.position.set(3.8, 1.02, -3.6 + i * 2.4);
      const winding = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 2.7, 10), mats.copperCoil);
      winding.rotation.z = Math.PI / 2;
      winding.position.set(3.8, 1.08, -3.6 + i * 2.4);
      winding.userData.noEdges = true;
      g.add(choke, winding);
    }
    g.add(subPcb, muxIc);

    parts.push(
      finalizeMiPart(
        'mi-audio-mux-emi-choke',
        30,
        '#06b6d4',
        g,
        new THREE.Vector3(13.5, -8.8, 7.5),
        new THREE.Vector3(14.0, -20.5, 11.0),
        cp
      )
    );
  }

  // =========================================================================
  // MI31. Under-Shoe Copper-Foil EMI Shield Bridge & Conductive Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    const cuFoil = makeHorizPlate(
      createFrameShape(44.0, 32.0, 2.0, 17.6, 6.2, 1.0),
      0.32,
      mats.vaporChamberCopper,
      0.02
    );
    // Conductive Ni-Cu fabric foam EMI grounding strips on both flanks
    for (const side of [-1, 1]) {
      const foam = new THREE.Mesh(new THREE.BoxGeometry(4.0, 1.5, 24.0), mats.conductiveNiCuFoam);
      foam.position.set(side * 19.5, 0.75, -1.0);
      g.add(foam);
    }
    g.add(cuFoil);

    parts.push(
      finalizeMiPart(
        'mi-emi-copper-shield',
        31,
        '#b45309',
        g,
        new THREE.Vector3(0, -10.2, 0.5),
        new THREE.Vector3(0, -23.5, 0),
        cp
      )
    );
  }

  // =========================================================================
  // MI32. Mainboard 24-Pin Fine-Pitch ZIF Connector & BIONZ XR Bus Carrier
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mainboard HDI slice hosting the 24-pin ZIF connector
    const mbSlice = makeHorizPlate(createRoundedRectShape(34.0, 16.0, 1.6), 1.1, mats.hdiMainboardPcb, 0.06);
    // Ivory LCP 24-pin ZIF connector housing
    const zifBody = new THREE.Mesh(new THREE.BoxGeometry(18.6, 1.85, 5.2), mats.zifIvoryPlastic);
    zifBody.position.set(0, 1.45, 0);
    // Black flip-lock actuator lever
    const lockFlip = new THREE.Mesh(new THREE.BoxGeometry(17.6, 0.65, 2.4), mats.matteBlackAnodized);
    lockFlip.position.set(0, 2.45, 1.4);
    // 24 gold SMT solder leads arrayed cleanly along front & back
    const leadGeo = new THREE.BoxGeometry(0.32, 0.45, 1.3);
    const leadInst = new THREE.InstancedMesh(leadGeo, mats.goldPlating, 24);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 24; i++) {
      dm.position.set(-8.05 + i * 0.7, 0.75, -2.9);
      dm.updateMatrix();
      leadInst.setMatrixAt(i, dm.matrix);
    }
    leadInst.instanceMatrix.needsUpdate = true;
    leadInst.userData.noEdges = true;
    // Left/Right metal hold-down solder tabs
    for (const sx of [-10.0, 10.0]) {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 4.4), mats.solderBallSilver);
      tab.position.set(sx, 1.1, 0);
      g.add(tab);
    }
    g.add(mbSlice, zifBody, lockFlip, leadInst);

    parts.push(
      finalizeMiPart(
        'mi-mainboard-zif-connector',
        32,
        '#0f766e',
        g,
        new THREE.Vector3(0, -11.4, 10.6),
        new THREE.Vector3(0, -27.5, 13.5),
        cp
      )
    );
  }

  return parts;
}
