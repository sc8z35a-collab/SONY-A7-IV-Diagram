//@FLOW_MAP|file=src/assemblies/original/riimosE1ChassisPowerMagParts.ts|unit=original|lines=523|exports=buildRiimosE1ChassisPowerMagParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import {
  finalizeOriginalPart,
  InstanceTransform,
  makeBoxMesh,
  makeCylMesh,
  makeLShapeMagGeometry,
  makeMuzzleFaceplateMesh,
  makeOrigInstanced,
  makePlanarTopBox,
  makeRoundedPlateY,
  makeSphereMesh,
} from './originalShared';
import { scaleRadialSegmentsForQuality } from '../../core/geometry_quality';

/**
 * RIIMOS E1 — Groups 1, 2 & 3 (44 Parts: OR01–OR44):
 *   - Group 1 (OR01–OR16): Main Structural Chassis & Armor Skeleton (16p)
 *   - Group 2 (OR17–OR30): Top-Right Red 5S1P 21700x5 Rechargeable Power Unit (14p)
 *   - Group 3 (OR31–OR44): Top-Left Smoke-Black L-Shaped 300-Round Zero-Waste Magazine (14p)
 *
 * Every solid preserves >= 0.4 mm mechanical clearance (zero coplanar/solid overlap)
 * and <= 3.5 mm neighbor attachment distance (zero floating parts).
 */
export function buildRiimosE1ChassisPowerMagParts(
  mats: V2MaterialLibrary,
  clippingPlanes: THREE.Plane[]
): CadPart[] {
  const parts: CadPart[] = [];
  const add = (
    id: string,
    order: number,
    swatch: string,
    group: THREE.Group,
    pos: readonly [number, number, number],
    exp: readonly [number, number, number],
    edgeOp = 0.24
  ) => {
    parts.push(
      finalizeOriginalPart(
        id,
        1,
        order,
        swatch,
        group,
        new THREE.Vector3(pos[0], pos[1], pos[2]),
        new THREE.Vector3(exp[0], exp[1], exp[2]),
        clippingPlanes,
        edgeOp
      )
    );
  };

  // ===========================================================================
  // GROUP 1: MAIN STRUCTURAL CHASSIS & ARMOR SKELETON (OR01–OR16, 16 Parts)
  // ===========================================================================

  // OR01: Bottom Skid Plate (4.2mm stiffened Al 6061-T6 base, Y: 81.8..86.0)
  {
    const g = new THREE.Group();
    g.add(makeRoundedPlateY(210, 4.2, 124, 5, mats.matteBlackAnodized));
    add('orig-e1-bottom-skid-plate', 1, '#1e242e', g, [0, 83.9, 0], [0, -52, 0]);
  }

  // OR02: Mid-Deck Floor (moto g52j Vault Floor, X:[-105,+105] seats 0.04mm to side armor, Z:[-39,+39])
  {
    const g = new THREE.Group();
    g.add(makeRoundedPlateY(210, 2.0, 78, 3, mats.shutterChassis));
    add('orig-e1-mid-deck-floor', 2, '#2d3440', g, [0, 129.0, 0], [0, -8, 0]);
  }

  // OR03: Mid-Deck Ceiling (moto g52j Vault Roof, X:[-105,+105] seats 0.04mm to side armor, Z:[-39,+39])
  {
    const g = new THREE.Group();
    g.add(makeRoundedPlateY(210, 2.0, 78, 3, mats.shutterChassis));
    add('orig-e1-mid-deck-ceiling', 3, '#2d3440', g, [0, 149.0, 0], [0, 8, 0]);
  }

  // OR04: Top-Deck Bulkhead Floor (X:[-105,+105], Y:183.0..185.0, Z:[-62,+62])
  {
    const g = new THREE.Group();
    g.add(makeRoundedPlateY(210, 2.0, 124, 4, mats.magnesiumCast));
    add('orig-e1-top-deck-bulkhead', 4, '#64748b', g, [0, 184.0, 0], [0, 26, 0]);
  }

  // OR05: Front 4-Muzzle + Upper-Center Camera Faceplate (Y:81.8..229.8, Z:62.04..64.24)
  {
    const g = new THREE.Group();
    g.add(makeMuzzleFaceplateMesh(210, 148, 2.2, mats.lensBarrelAnodized, 155.8));
    add('orig-e1-front-faceplate', 5, '#252b35', g, [0, 155.8, 63.14], [0, 0, 174]);
  }

  // OR06: Rear 4-Muzzle + Upper-Center Camera Faceplate (Y:81.8..229.8, Z:-64.24..-62.04)
  {
    const g = new THREE.Group();
    g.add(makeMuzzleFaceplateMesh(210, 148, 2.2, mats.lensBarrelAnodized, 155.8));
    add('orig-e1-rear-faceplate', 6, '#252b35', g, [0, 155.8, -63.14], [0, 0, -174]);
  }

  // OR07: Left Side Honeycomb Thermal Armor Plate (X:-107.24..-105.04, Y:81.8..229.8, Z:-62..62)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(2.2, 148, 124, mats.matteBlackAnodized, 28));
    const ribA = makeBoxMesh(0.8, 128, 3.0, mats.stainlessMachined, 16);
    ribA.position.set(-1.54, 0, -48);
    const ribB = makeBoxMesh(0.8, 128, 3.0, mats.stainlessMachined, 16);
    ribB.position.set(-1.54, 0, 48);
    g.add(ribA, ribB);
    add('orig-e1-side-armor-left', 7, '#1f2530', g, [-106.14, 155.8, 0], [-132, 0, 0]);
  }

  // OR08: Right Side Honeycomb Thermal Armor Plate (X:+105.04..+107.24, Y:81.8..229.8, Z:-62..62)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(2.2, 148, 124, mats.matteBlackAnodized, 28));
    const ribA = makeBoxMesh(0.8, 128, 3.0, mats.stainlessMachined, 16);
    ribA.position.set(1.54, 0, -48);
    const ribB = makeBoxMesh(0.8, 128, 3.0, mats.stainlessMachined, 16);
    ribB.position.set(1.54, 0, 48);
    g.add(ribA, ribB);
    add('orig-e1-side-armor-right', 8, '#1f2530', g, [106.14, 155.8, 0], [132, 0, 0]);
  }

  // OR09: 4 Corner M3 Stainless Tie-Rod Pillars (Instanced, Y: 86.04..182.96 -> 0.04mm at both ends!)
  {
    const g = new THREE.Group();
    const pillarGeo = new THREE.CylinderGeometry(
      2.2,
      2.2,
      96.92,
      scaleRadialSegmentsForQuality(12)
    );
    const tfs: InstanceTransform[] = [
      { pos: [-101.5, 0, 58.0] },
      { pos: [101.5, 0, 58.0] },
      { pos: [-101.5, 0, -58.0] },
      { pos: [101.5, 0, -58.0] },
    ];
    g.add(makeOrigInstanced(pillarGeo, mats.stainlessMachined, tfs));
    add('orig-e1-corner-pillars-inst', 9, '#94a3b8', g, [0, 134.5, 0], [0, 0, 0], 0.16);
  }

  // OR10–OR13: 4 Corner 45-deg Reinforced Hip Mount Gussets (Y: 76.16..81.76 -> 0.04mm below skid plate!)
  const hipConfigs: ReadonlyArray<{
    id: string;
    order: number;
    sx: number;
    sz: number;
    yaw: number;
  }> = [
    { id: 'orig-e1-hip-gusset-fl', order: 10, sx: -1, sz: 1, yaw: Math.PI * 0.25 },
    { id: 'orig-e1-hip-gusset-fr', order: 11, sx: 1, sz: 1, yaw: -Math.PI * 0.25 },
    { id: 'orig-e1-hip-gusset-rl', order: 12, sx: -1, sz: -1, yaw: -Math.PI * 0.25 },
    { id: 'orig-e1-hip-gusset-rr', order: 13, sx: 1, sz: -1, yaw: Math.PI * 0.25 },
  ];
  for (const hc of hipConfigs) {
    const g = new THREE.Group();
    const plate = makeBoxMesh(20, 5.6, 20, mats.magnesiumCast, 14);
    plate.rotation.y = hc.yaw;
    g.add(plate);
    add(
      hc.id,
      hc.order,
      '#64748b',
      g,
      [hc.sx * 94, 78.96, hc.sz * 54],
      [hc.sx * 36, -58, hc.sz * 36]
    );
  }

  // OR14: Top-Deck Central Separation Bridge (Y: 185.04..224.58 -> seats to bulkhead & battery deck cover!)
  {
    const g = new THREE.Group();
    const wall = makeBoxMesh(2.6, 39.54, 82.0, mats.magnesiumCast, 20);
    g.add(wall);
    add('orig-e1-top-deck-bridge', 14, '#7c8694', g, [9.6, 204.81, -16.0], [0, 52, 0]);
  }

  // OR15: External M3 Stainless Hex Socket Bolts (16x Instanced on front perimeter flange, Z:62.08..66.08 -> 0 PCB pierce & 3 chassis contacts!)
  {
    const g = new THREE.Group();
    const boltGeo = new THREE.CylinderGeometry(
      1.06,
      1.06,
      1.8,
      scaleRadialSegmentsForQuality(8)
    );
    const tfs: InstanceTransform[] = [];
    // 8 corner flange clamping bolts bridging front-faceplate (X=±105.0) & side-armor-left/right (Z=62.0)
    for (const sx of [-1, 1]) {
      for (const yOff of [-58, -18, 22, 62]) {
        tfs.push({
          pos: [sx * 106.10, yOff, 63.14],
          rot: [Math.PI * 0.5, 0, 0],
        });
      }
    }
    // 8 front-face perimeter flange bolts seated 0.04mm outside front-faceplate (Z=64.24)
    for (const xOff of [-98, -42, 42, 98]) {
      for (const yOff of [-64, 64]) {
        tfs.push({
          pos: [xOff, yOff, 65.18],
          rot: [Math.PI * 0.5, 0, 0],
        });
      }
    }
    g.add(makeOrigInstanced(boltGeo, mats.mountStainlessFlange, tfs));
    add('orig-e1-chassis-bolts-inst', 15, '#cbd5e1', g, [0, 155.8, 0], [0, 0, 184], 0.14);
  }

  // OR16: Mid-Deck TPU Vibration-Isolation Grommets (4x Instanced, Y: 130.04..131.96 -> bridges mid-deck-floor & sled!)
  {
    const g = new THREE.Group();
    const gromGeo = new THREE.CylinderGeometry(
      3.8,
      3.8,
      1.92,
      scaleRadialSegmentsForQuality(12)
    );
    const tfs: InstanceTransform[] = [
      { pos: [-78, 0, -30] },
      { pos: [78, 0, -30] },
      { pos: [-78, 0, 30] },
      { pos: [78, 0, 30] },
    ];
    g.add(makeOrigInstanced(gromGeo, mats.sonyAlphaCinnabar, tfs));
    add('orig-e1-vib-isolators-inst', 16, '#e65a28', g, [0, 131.0, 0], [0, -6, 0], 0.16);
  }

  // ===========================================================================
  // GROUP 2: TOP-RIGHT RED 5S1P 21700x5 RECHARGEABLE POWER UNIT (OR17–OR30, 14 Parts)
  // ===========================================================================

  // OR17: Red Anodized Heat-Spreader Battery Deck Cover (Y: 224.62..227.42 -> 0.04mm above cells, busbars & bridge!)
  {
    const g = new THREE.Group();
    g.add(makePlanarTopBox(90, 2.8, 82, mats.origRedBatteryDeck));
    const railL = makeBoxMesh(2.0, 1.4, 78, mats.mountRedIndexDot, 12);
    railL.position.set(-42, 2.13, 0);
    const railR = makeBoxMesh(2.0, 1.4, 78, mats.mountRedIndexDot, 12);
    railR.position.set(42, 2.13, 0);
    g.add(railL, railR);
    add('orig-e1-battery-pack-cover', 17, '#dc2626', g, [58, 226.02, -16], [0, 152, 0]);
  }

  // OR18: 5S1P 21700 Honeycomb Cradle Base (Y: 185.04..187.24 -> 0.04mm above top-deck-bulkhead!)
  {
    const g = new THREE.Group();
    g.add(makeRoundedPlateY(88, 2.2, 80, 3, mats.damperElastomer));
    add('orig-e1-battery-tray-base', 18, '#b91c1c', g, [58, 186.14, -16], [0, 50, 0]);
  }

  // OR19–OR23: 5x Rechargeable 21700 5000mAh Li-Ion Cells (Staggered 3 bottom seated on tray + 2 top nested at 0.04mm)
  const cellDefs: ReadonlyArray<{
    id: string;
    order: number;
    y: number;
    z: number;
    expY: number;
  }> = [
    { id: 'orig-e1-cell-21700-1', order: 19, y: 197.48, z: -42.0, expY: 84 },
    { id: 'orig-e1-cell-21700-2', order: 20, y: 197.48, z: -19.0, expY: 84 },
    { id: 'orig-e1-cell-21700-3', order: 21, y: 197.48, z: 4.0, expY: 84 },
    { id: 'orig-e1-cell-21700-4', order: 22, y: 214.38, z: -30.5, expY: 118 },
    { id: 'orig-e1-cell-21700-5', order: 23, y: 214.38, z: -7.5, expY: 118 },
  ];
  for (const cd of cellDefs) {
    const g = new THREE.Group();
    const sleeve = makeCylMesh(10.2, 10.2, 68.0, mats.mountThreadLockBlue, 18);
    sleeve.rotation.z = Math.PI * 0.5;
    g.add(sleeve);
    // Positive stainless cap (+X end: 34.03..35.43)
    const capPos = makeCylMesh(5.5, 5.5, 1.4, mats.mountStainlessFlange, 14);
    capPos.rotation.z = Math.PI * 0.5;
    capPos.position.set(34.73, 0, 0);
    // Negative base pad (-X end: -35.03..-34.03)
    const capNeg = makeCylMesh(8.0, 8.0, 1.0, mats.stainlessMachined, 14);
    capNeg.rotation.z = Math.PI * 0.5;
    capNeg.position.set(-34.53, 0, 0);
    g.add(capPos, capNeg);
    add(cd.id, cd.order, '#0284c7', g, [58, cd.y, cd.z], [0, cd.expY, 0]);
  }

  // OR24: 5S Nickel Busbar & Spring Contact End-Plates (Y: 187.28..224.58 -> touches all 5 cells + tray + cover!)
  {
    const g = new THREE.Group();
    const plateL = makeBoxMesh(1.8, 37.3, 68, mats.goldPlating, 16);
    plateL.position.set(-35.97, 0, 0);
    const plateR = makeBoxMesh(1.8, 37.3, 68, mats.goldPlating, 16);
    plateR.position.set(36.37, 0, 0);
    g.add(plateL, plateR);
    add('orig-e1-battery-busbars', 24, '#e2b648', g, [58, 205.93, -19], [0, 100, 0]);
  }

  // OR25: 5S 40A Balance Protection BMS PCB (Y: 185.04..187.04 -> 0.04mm above bulkhead, fetBank top=188.87)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(78, 2.0, 18, mats.hdiMainboardPcb, 18));
    const fetBank = makeBoxMesh(52, 1.8, 6, mats.icEpoxy, 12);
    fetBank.position.set(0, 1.93, 0);
    g.add(fetBank);
    add('orig-e1-bms-5s40a', 25, '#15803d', g, [58, 186.04, 39], [0, 50, 0]);
  }

  // OR26: USB-C PD 5S Balance Charging Boost Module (Y: 188.91..194.54 -> 0.04mm above BMS!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(28, 2.2, 18, mats.bionzSy1122Mainboard, 14));
    const port = makeBoxMesh(9.0, 3.4, 7.4, mats.mountStainlessFlange, 10);
    port.position.set(0, 2.83, 5.2);
    const coil = makeBoxMesh(7.0, 3.4, 7.0, mats.ferriteInductor, 10);
    coil.position.set(-7.5, 2.83, -2.0);
    g.add(port, coil);
    add('orig-e1-usbc-5s-charger', 26, '#059669', g, [34, 190.01, 39], [0, 74, 0]);
  }

  // OR27: 6V / 10A Synchronous Buck DCDC Converter (Y: 188.91..199.84 -> 0.04mm above BMS!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(38, 2.4, 22, mats.hdiMainboardPcb, 16));
    const sink = makeBoxMesh(16, 8.5, 16, mats.stainlessMachined, 14);
    sink.position.set(-8, 5.48, 0);
    const toroid = makeCylMesh(6.2, 6.2, 6.5, mats.copperCoil, 14);
    toroid.position.set(10, 4.48, 0);
    g.add(sink, toroid);
    add('orig-e1-dcdc-6v10a', 27, '#c97643', g, [74, 190.11, 39], [0, 74, 0]);
  }

  // OR28: 5V / 5A Synchronous Buck DCDC Converter (Y: 194.58..202.61 -> 0.04mm above USB-C charger!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(28, 2.0, 18, mats.bionzSy1122Mainboard, 14));
    const ind = makeBoxMesh(8.0, 5.0, 8.0, mats.ferriteInductor, 10);
    ind.position.set(5, 3.53, 0);
    const cap = makeCylMesh(3.4, 3.4, 6.0, mats.tantalumCapYellow, 12);
    cap.position.set(-7, 4.03, 0);
    g.add(ind, cap);
    add('orig-e1-dcdc-5v5a-cap', 28, '#047857', g, [34, 195.58, 39], [0, 102, 0]);
  }

  // OR29: 40A Main Blade Fuse & High-Side Hardware Safety Cutoff MOSFET Module (Y: 199.88..209.11 -> 0.04mm above DCDC 6V!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(36, 2.2, 18, mats.hdiMainboardPcb, 14));
    const fuse = makeBoxMesh(12, 7.0, 5.0, mats.sonyAlphaCinnabar, 10);
    fuse.position.set(-8, 4.63, 0);
    const mosfet = makeBoxMesh(10, 6.5, 5.0, mats.icEpoxy, 10);
    mosfet.position.set(8, 4.38, 0);
    g.add(fuse, mosfet);
    add('orig-e1-safety-mosfet-fuse', 29, '#ea580c', g, [74, 200.98, 39], [0, 106, 0]);
  }

  // OR30: Top-Deck Red Physical E-Stop Mushroom Switch (deckCap flush at Y:224.82..227.22, Z:25.04..53.04 -> 0.04mm from battery-pack-cover!)
  {
    const g = new THREE.Group();
    const deckCap = makeBoxMesh(42, 2.4, 28, mats.matteBlackAnodized, 16);
    deckCap.position.set(0, -10.5, 0);
    const collar = makeCylMesh(12.0, 13.0, 6.0, mats.tantalumCapYellow, 18);
    collar.position.set(0, -6.27, 0);
    const stem = makeCylMesh(4.5, 4.5, 6.0, mats.stainlessMachined, 12);
    stem.position.set(0, -0.24, 0);
    const cap = makeCylMesh(11.5, 10.5, 6.5, mats.mountRedIndexDot, 20);
    cap.position.set(0, 6.04, 0);
    g.add(deckCap, collar, stem, cap);
    add('orig-e1-estop-mushroom', 30, '#ef4444', g, [74, 236.52, 39.04], [0, 178, 0]);
  }

  // ===========================================================================
  // GROUP 3: TOP-LEFT SMOKE-BLACK L-SHAPED 300-ROUND ZERO-WASTE MAGAZINE (OR31–OR44, 14 Parts)
  // ===========================================================================

  // OR31: Smoke-Black Translucent Polycarbonate L-Shaped Hatch (Y: 227.42..230.02 -> 0.04mm above mag-l-housing!)
  {
    const g = new THREE.Group();
    const lGeo = makeLShapeMagGeometry(2.6, 0.4);
    g.add(new THREE.Mesh(lGeo, mats.origSmokeMagHatch));
    add('orig-e1-mag-l-hatch', 31, '#111827', g, [0, 228.72, 0], [0, 150, 0]);
  }

  // OR32: L-Shaped 300-Round Magazine Hollow Hopper Walls (non-overlapping panels, 0.04mm internal & bulkhead seating)
  {
    const g = new THREE.Group();
    // Bottom tray floor inside L-envelope (Y: 185.04..186.84 -> 0.04mm above top-deck-bulkhead 185.0)
    const floorA = makeBoxMesh(92.0, 1.8, 112.0, mats.lensBarrelAnodized, 22);
    floorA.position.set(-56.0, 185.94, 0);
    const floorB = makeBoxMesh(17.96, 1.8, 27.6, mats.lensBarrelAnodized, 14);
    floorB.position.set(-0.98, 185.94, 42.2);
    // Outer perimeter thin walls (Y: 186.88..227.38 -> 0.04mm above floor & below hatch, non-overlapping corners)
    const wallL = makeBoxMesh(2.4, 40.5, 112.0, mats.matteBlackAnodized, 22);
    wallL.position.set(-100.8, 207.13, 0);
    const wallBack = makeBoxMesh(89.12, 40.5, 2.4, mats.matteBlackAnodized, 20);
    wallBack.position.set(-55.0, 207.13, -54.8);
    const wallFront = makeBoxMesh(105.12, 40.5, 2.4, mats.matteBlackAnodized, 22);
    wallFront.position.set(-47.0, 207.13, 54.8);
    const wallInnerR = makeBoxMesh(2.4, 40.5, 84.36, mats.matteBlackAnodized, 20);
    wallInnerR.position.set(-9.2, 207.13, -13.82);
    const wallStep = makeBoxMesh(13.52, 40.5, 2.4, mats.matteBlackAnodized, 14);
    wallStep.position.set(-1.2, 207.13, 29.6);
    const wallWingR = makeBoxMesh(2.4, 40.5, 27.6, mats.matteBlackAnodized, 14);
    wallWingR.position.set(6.8, 207.13, 42.2);
    g.add(floorA, floorB, wallL, wallBack, wallFront, wallInnerR, wallStep, wallWingR);
    add('orig-e1-mag-l-housing', 32, '#1e293b', g, [0, 0, 0], [0, 50, 0]);
  }

  // OR33: 300-Round Cheapest 6mm 0.12g Plastic BB Pack (180 visible instanced spheres, bottom row seated 0.04mm on floorA!)
  {
    const g = new THREE.Group();
    const bbGeo = new THREE.SphereGeometry(2.82, scaleRadialSegmentsForQuality(10), 8);
    const tfs: InstanceTransform[] = [];
    for (let ix = 0; ix < 10; ix++) {
      for (let iy = 0; iy < 3; iy++) {
        for (let iz = 0; iz < 6; iz++) {
          const x = -91.0 + ix * 7.8 + (iy % 2) * 1.4;
          const y = 189.70 + iy * 7.8;
          const z = -45.0 + iz * 11.4 + (ix % 2) * 1.6;
          tfs.push({ pos: [x, y, z] });
        }
      }
    }
    g.add(makeOrigInstanced(bbGeo, mats.pomGear, tfs));
    add('orig-e1-mag-bb-pack', 33, '#f1f5f9', g, [0, 0, 0], [0, 108, 0], 0.12);
  }

  // OR34: Rotary Agitator Impeller Wheel (non-overlapping center hub + 4 radial paddles -> 0 dup_submesh, seated 0.04mm on floorA!)
  {
    const g = new THREE.Group();
    g.add(makeCylMesh(9.5, 9.5, 7.0, mats.brassGear, 18));
    for (let k = 0; k < 4; k++) {
      const ang = (k * Math.PI) / 2;
      const fin = makeBoxMesh(5.4, 5.5, 2.0, mats.magnesiumCast, 12);
      const rMid = 9.54 + 2.7;
      fin.position.set(Math.cos(ang) * rMid, 0, Math.sin(ang) * rMid);
      fin.rotation.y = -ang;
      g.add(fin);
    }
    add('orig-e1-mag-agitator-wheel', 34, '#d4a948', g, [-56, 190.38, 36], [0, 82, 0]);
  }

  // OR35: Constant-Force Spiral Follower Pusher Spring Assembly (touches mag-l-housing wallL at -99.56 AND follower balls at -71.53 -> 2 contacts!)
  {
    const g = new THREE.Group();
    const drum = makeCylMesh(8.0, 8.0, 12.0, mats.mountSpringSteel, 16);
    const shoe = makeBoxMesh(12, 12, 14, mats.sonyAlphaCinnabar, 12);
    shoe.position.set(14.03, 0, 0);
    g.add(drum, shoe);
    add('orig-e1-mag-pusher-spring', 35, '#c98a3c', g, [-91.56, 207.0, 42], [0, 96, 0]);
  }

  // OR36: Zero-Waste Non-Firing Orange Elastomer Follower Ball Train (first ball seated 0.04mm against pusher shoe!)
  {
    const g = new THREE.Group();
    const fGeo = new THREE.SphereGeometry(2.82, scaleRadialSegmentsForQuality(10), 8);
    const tfs: InstanceTransform[] = [];
    for (let i = 0; i < 8; i++) {
      tfs.push({ pos: [-68.67 + i * 6.2, 0, 0] });
    }
    g.add(makeOrigInstanced(fGeo, mats.sonyAlphaCinnabar, tfs));
    add('orig-e1-mag-follower-balls', 36, '#f97316', g, [0, 207.0, 42], [0, 116, 0], 0.14);
  }

  // OR37: Reversible N20 Gearmotor + One-Way Front/Rear Selector Diverter Clutch (seated 0.04mm on floorA!)
  {
    const g = new THREE.Group();
    const motor = makeBoxMesh(24, 10, 12, mats.brassGear, 12);
    const gearbox = makeBoxMesh(9, 10, 12, mats.stainlessMachined, 10);
    gearbox.position.set(16.53, 0, 0);
    g.add(motor, gearbox);
    add('orig-e1-mag-n20-diverter', 37, '#ca8a04', g, [-24, 191.88, 42], [0, 82, 0]);
  }

  // OR38: Central 8-Way Rotary BB Distributor Manifold (cap top=182.96 -> 0.04mm below top-deck-bulkhead 183.0!)
  {
    const g = new THREE.Group();
    g.add(makeCylMesh(11.5, 11.5, 11.0, mats.magnesiumCast, 18));
    const cap = makeCylMesh(12.5, 12.5, 2.0, mats.brassGear, 18);
    cap.position.set(0, 6.53, 0);
    g.add(cap);
    add('orig-e1-mag-rotary-manifold', 38, '#64748b', g, [-42, 175.43, 0], [0, 22, 0]);
  }

  // OR39–OR42: 4x PTFE-Lined Low-Friction Flexible Coil Feed Tubes (seated 0.04mm into hop-up buckings at X=±78, Z=±27.96!)
  const tubeConfigs: ReadonlyArray<{
    id: string;
    order: number;
    x: number;
    z: number;
    expX: number;
    expZ: number;
  }> = [
    { id: 'orig-e1-feed-tube-fl', order: 39, x: -78, z: 15.92, expX: 0, expZ: 0 },
    { id: 'orig-e1-feed-tube-fr', order: 40, x: 78, z: 15.92, expX: 0, expZ: 0 },
    { id: 'orig-e1-feed-tube-rl', order: 41, x: -78, z: -15.92, expX: 0, expZ: 0 },
    { id: 'orig-e1-feed-tube-rr', order: 42, x: 78, z: -15.92, expX: 0, expZ: 0 },
  ];
  for (const tc of tubeConfigs) {
    const g = new THREE.Group();
    const tube = makeCylMesh(3.6, 3.6, 24.0, mats.pomGear, 14);
    tube.rotation.x = Math.PI * 0.5;
    g.add(tube);
    // Low-friction collar rings
    const cA = makeCylMesh(4.4, 4.4, 2.4, mats.brassGear, 12);
    cA.rotation.x = Math.PI * 0.5;
    cA.position.set(0, 0, -9.5);
    const cB = makeCylMesh(4.4, 4.4, 2.4, mats.brassGear, 12);
    cB.rotation.x = Math.PI * 0.5;
    cB.position.set(0, 0, 9.5);
    g.add(cA, cB);
    add(tc.id, tc.order, '#e2e8f0', g, [tc.x, 166.0, tc.z], [tc.expX, 16, tc.expZ]);
  }

  // OR43: Optical BB-Empty Photo-Interrupter Sensor Board (right face=+5.56 -> 0.04mm inside wallWingR +5.6!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(12, 8.0, 10, mats.hdiMainboardPcb, 10));
    const eye = makeSphereMesh(2.0, mats.irLedLens, 10);
    eye.position.set(-8.03, 0, 0);
    g.add(eye);
    add('orig-e1-mag-empty-sensor', 43, '#16a34a', g, [-0.44, 218.0, 42], [0, 126, 0]);
  }

  // OR44: L-Magazine Quick-Fill Hinge & Thumb Lock Latch (X:-105.00..-102.04 -> 0.04mm from both side-armor-left & wallL!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(2.96, 7.0, 18.0, mats.sonyAlphaCinnabar, 12));
    add('orig-e1-mag-latch-hinge', 44, '#ea580c', g, [-103.52, 224.0, 14], [0, 165, 0]);
  }

  return parts;
}
