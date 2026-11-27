import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createFrameShape, createRoundedRectShape } from '../../engine/CadHelpers';
import { MaterialBucketKey } from '../../core/resource_cache';

export type MiShoeInstPoolName =
  | 'front_pin_blades'
  | 'front_pin_tails'
  | 'front_pin_badges'
  | 'screw_heads'
  | 'screw_shanks'
  | 'screw_slots'
  | 'comb_teeth'
  | 'cantilever_beams'
  | 'cantilever_tips'
  | 'fpc_traces'
  | 'zif_leads'
  | 'cyl_bosses'
  | 'torus_seals'
  | 'smd_blocks'
  | 'choke_windings'
  | 'solder_pads'
  | 'ic_packages'
  | 'brass_contacts';

export interface MiShoeExtendedBuildCtx {
  readonly outerW: number;
  readonly innerW: number;
  readonly throatW: number;
  readonly railL: number;
  readonly pinPitch: number;
  readonly curveSegments: number;
  readonly radialSegments: number;
  readonly pinX: (pinNum: number) => number;
  readonly makeTransformedGeo: (
    raw: THREE.BufferGeometry,
    tx?: number,
    ty?: number,
    tz?: number,
    rx?: number,
    ry?: number,
    rz?: number,
    sx?: number,
    sy?: number,
    sz?: number
  ) => THREE.BufferGeometry;
  readonly makeHorizPlateGeo: (
    shape: THREE.Shape,
    thickness: number,
    curveSegs: number,
    bevelSize?: number,
    tx?: number,
    ty?: number,
    tz?: number
  ) => THREE.BufferGeometry;
  readonly addBatchedPiece: (
    partId: string,
    bucket: MaterialBucketKey,
    colorHex: number,
    geo: THREE.BufferGeometry,
    includeInEdges?: boolean
  ) => void;
  readonly addInst: (
    poolName: MiShoeInstPoolName,
    partId: string,
    localPos: [number, number, number],
    localRot: [number, number, number],
    localScale: [number, number, number],
    colorHex: number,
    halfExtents: [number, number, number]
  ) => void;
}

function mergeAndDispose(pieces: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(pieces, false)!;
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].dispose();
  }
  return merged;
}

/**
 * Extended V2 time-sliced geometry build chunks for MI33–MI62 (+30 precision OEM sub-components).
 * Strictly uses ResourceCache 38 material buckets, InstancedMesh pools, and merged BatchedMesh geometries.
 */
export function buildMiShoeExtendedChunks(ctx: MiShoeExtendedBuildCtx): Array<() => void> {
  const {
    outerW,
    innerW,
    curveSegments: cs,
    radialSegments: rs,
    pinX,
    makeTransformedGeo,
    makeHorizPlateGeo,
    addBatchedPiece,
    addInst,
  } = ctx;

  return [
    // =========================================================================
    // Chunk 9: Top Protection & Shell-Rail Mechanical Precision (MI33–MI38)
    // =========================================================================
    () => {
      // MI33: Cap underside elastic retention detents & front 21-pin dust wiper lip
      const wiperPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(38.8, 0.52, 1.35), 0, 0.15, 0.2),
        makeTransformedGeo(new THREE.BoxGeometry(36.4, 0.42, 0.85), 0, -0.22, -0.45, 0.22, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(1.15, 0.65, 9.6), -13.9, -0.05, -5.2),
        makeTransformedGeo(new THREE.BoxGeometry(1.15, 0.65, 9.6), 13.9, -0.05, -5.2),
      ];
      addBatchedPiece('mi-cap-friction-detents', 'elastomer_rubber', 0x2a2e36, mergeAndDispose(wiperPieces));
      for (const side of [-1, 1]) {
        // Elastic side clip detent nibs engaging shoe rail throat undercut
        addInst(
          'smd_blocks',
          'mi-cap-friction-detents',
          [side * 14.55, -0.08, -7.8],
          [0, side * 0.16, 0],
          [0.95, 0.56, 2.2],
          0x3d434f,
          [0.6, 0.32, 1.15]
        );
        addInst(
          'smd_blocks',
          'mi-cap-friction-detents',
          [side * 14.4, -0.1, -3.2],
          [0, -side * 0.12, 0],
          [0.82, 0.48, 1.9],
          0x3d434f,
          [0.5, 0.28, 1.0]
        );
      }

      // MI34: Top-cover outer weather-sealing skirt landing flange & dual-stage labyrinth ridge
      const flangeMain = makeHorizPlateGeo(
        createFrameShape(60.6, 54.8, 5.2, 51.6, 45.8, 3.2),
        0.72,
        cs,
        0.06,
        0,
        -0.12,
        0
      );
      const flangeOuterLip = makeHorizPlateGeo(
        createFrameShape(61.2, 55.4, 5.4, 58.0, 52.2, 4.6),
        0.58,
        cs,
        0.05,
        0,
        0.42,
        0
      );
      addBatchedPiece(
        'mi-skirt-sealing-flange',
        'magnesium_cast',
        0x363d49,
        mergeAndDispose([flangeMain, flangeOuterLip])
      );
      addBatchedPiece(
        'mi-skirt-sealing-flange',
        'elastomer_rubber',
        0x262930,
        makeHorizPlateGeo(createFrameShape(55.4, 49.6, 4.0, 53.2, 47.4, 3.5), 0.36, cs, 0.03, 0, 0.36, 0)
      );

      // MI35: Molded PPS/LCP insulating shoe base carrier (454706001 BASE, MI SHOE)
      const baseFrame = makeHorizPlateGeo(
        createFrameShape(42.4, 34.2, 1.8, 14.4, 14.0, 5.8),
        0.64,
        cs,
        0.04,
        0,
        0,
        0
      );
      const frontBridge = makeTransformedGeo(new THREE.BoxGeometry(39.0, 0.56, 3.2), 0, 0.05, 15.6);
      addBatchedPiece('mi-shoe-resin-base-carrier', 'matte_chassis', 0x262b35, mergeAndDispose([baseFrame, frontBridge]));
      for (const [bx, bz] of [
        [-14.6, -11.6],
        [14.6, -11.6],
        [-14.6, 10.6],
        [14.6, 10.6],
      ] as Array<[number, number]>) {
        addInst('cyl_bosses', 'mi-shoe-resin-base-carrier', [bx, 0.04, bz], [0, 0, 0], [3.1, 0.78, 3.1], 0x384152, [3.2, 0.42, 3.2]);
      }

      // MI36: ISO 518:2006 rear entry chamfer lead-in guides & low-friction inner runner strips
      const chamferPieces: THREE.BufferGeometry[] = [];
      for (const side of [-1, 1]) {
        chamferPieces.push(
          makeTransformedGeo(
            new THREE.BoxGeometry(3.4, 1.35, 3.2),
            side * (outerW * 0.5 - 3.6),
            1.65,
            0.2,
            0.16,
            side * 0.28,
            0
          )
        );
        chamferPieces.push(
          makeTransformedGeo(
            new THREE.BoxGeometry(1.9, 2.75, 2.8),
            side * (outerW * 0.5 - 1.3),
            -0.25,
            0.1,
            0,
            side * 0.22,
            0
          )
        );
        chamferPieces.push(
          makeTransformedGeo(
            new THREE.BoxGeometry(0.9, 0.42, 3.2),
            side * (innerW * 0.5 - 1.0),
            -1.45,
            0.2,
            -0.25,
            0,
            0
          )
        );
      }
      addBatchedPiece('mi-rail-leadin-chamfer-guides', 'stainless_machined', 0xd6dde6, mergeAndDispose(chamferPieces));

      // MI37: Screw cover front under-tab retention hooks & anti-buzz micro pads
      const hookPieces: THREE.BufferGeometry[] = [];
      for (const side of [-1, 1]) {
        hookPieces.push(makeTransformedGeo(new THREE.BoxGeometry(4.8, 0.34, 3.4), side * 11.2, 0.08, 12.6));
        hookPieces.push(makeTransformedGeo(new THREE.BoxGeometry(4.8, 0.42, 1.2), side * 11.2, -0.14, 14.0, 0.35, 0, 0));
      }
      addBatchedPiece('mi-screw-cover-retention-clips', 'stainless_machined', 0xa7b3c2, mergeAndDispose(hookPieces));
      for (const [px, pz] of [
        [-11.8, -9.5],
        [11.8, -9.5],
        [-11.8, 6.2],
        [11.8, 6.2],
      ] as Array<[number, number]>) {
        addInst('smd_blocks', 'mi-screw-cover-retention-clips', [px, -0.12, pz], [0, 0, 0], [3.6, 0.28, 3.2], 0x262930, [1.85, 0.16, 1.65]);
      }

      // MI38: Spring plate over-compression limit stops & central X-Sync clearance collar
      const stopPieces: THREE.BufferGeometry[] = [];
      for (const side of [-1, 1]) {
        stopPieces.push(makeTransformedGeo(new THREE.CylinderGeometry(1.35, 1.55, 0.48, Math.max(8, rs - 4)), side * 12.2, -0.05, -7.8));
        stopPieces.push(makeTransformedGeo(new THREE.CylinderGeometry(1.2, 1.35, 0.44, Math.max(8, rs - 4)), side * 12.2, -0.05, 4.2));
        stopPieces.push(makeTransformedGeo(new THREE.BoxGeometry(3.2, 0.26, 14.0), side * 12.2, -0.18, -1.8));
      }
      addBatchedPiece('mi-spring-preload-stops', 'becu_spring', 0xc78b3e, mergeAndDispose(stopPieces));
      addInst('torus_seals', 'mi-spring-preload-stops', [0, 0.02, -0.7], [0, 0, 0], [6.4, 1.2, 6.4], 0x3b4252, [7.2, 0.35, 7.2]);
    },

    // =========================================================================
    // Chunk 10: Fastener Locking & ISO 518 Contact Mechanics (MI39–MI44)
    // =========================================================================
    () => {
      const m17Coords: Array<[number, number]> = [
        [-14.6, -12.6],
        [14.6, -12.6],
        [-14.6, 9.6],
        [14.6, 9.6],
      ];

      // MI39: M1.7 anaerobic micro-capsule threadlocker patches & seating washers
      for (const [sx, sz] of m17Coords) {
        // Blue Nylok threadlocker band around lower shank
        addInst('cyl_bosses', 'mi-m17-nylok-threadlock-patches', [sx, -1.35, sz], [0, 0, 0], [1.34, 2.35, 1.34], 0x2563eb, [1.4, 1.2, 1.4]);
        // Precision seating washer ring under screw head
        addInst('torus_seals', 'mi-m17-nylok-threadlock-patches', [sx, 1.75, sz], [0, 0, 0], [2.45, 1.0, 2.45], 0xc4cdd8, [3.0, 0.32, 3.0]);
      }

      // MI40: Fix-plate extruded burring M1.7 tapped steel nut bosses & alignment dowel pins
      for (const [bx, bz] of m17Coords) {
        addInst('cyl_bosses', 'mi-threaded-steel-nut-bosses', [bx, 0, bz], [0, 0, 0], [2.45, 2.05, 2.45], 0x9aa6b5, [2.5, 1.05, 2.5]);
        addInst('torus_seals', 'mi-threaded-steel-nut-bosses', [bx, -0.92, bz], [0, 0, 0], [2.7, 1.1, 2.7], 0xb8c3d0, [3.2, 0.32, 3.2]);
      }
      // Precision datum alignment dowel pins (±20.4, -1.5)
      for (const side of [-1, 1]) {
        addInst('brass_contacts', 'mi-threaded-steel-nut-bosses', [side * 20.4, 0.25, -1.5], [0, 0, 0], [1.05, 2.3, 1.05], 0xd4a948, [1.1, 1.2, 1.1]);
      }

      // MI41: M1.4 rear captive stainless nut insert & countersunk seating guide
      const nutPieces = [
        makeTransformedGeo(new THREE.CylinderGeometry(2.35, 2.55, 0.72, 6), 0, -0.2, 0),
        makeTransformedGeo(new THREE.CylinderGeometry(1.75, 1.95, 0.62, rs), 0, 0.38, 0),
      ];
      addBatchedPiece('mi-m14-rear-captive-nut', 'stainless_machined', 0xb6c0cc, mergeAndDispose(nutPieces));
      addInst('torus_seals', 'mi-m14-rear-captive-nut', [0, 0.62, 0], [0, 0, 0], [1.55, 0.9, 1.55], 0x7a8594, [1.9, 0.25, 1.9]);

      // MI42: Center X-Sync compression coil spring & gold feedthrough sliding bushing
      for (let turn = 0; turn < 4; turn++) {
        addInst(
          'torus_seals',
          'mi-xsync-plunger-spring',
          [0, -0.5 + turn * 0.34, 0],
          [0.06, 0, 0],
          [2.15, 0.85, 2.15],
          0xd89143,
          [2.65, 0.25, 2.65]
        );
      }
      const bushPieces = [
        makeTransformedGeo(new THREE.CylinderGeometry(1.45, 1.45, 1.35, rs), 0, 0.05, 0),
        makeTransformedGeo(new THREE.CylinderGeometry(2.75, 2.75, 0.24, rs), 0, -0.68, 0),
      ];
      addBatchedPiece('mi-xsync-plunger-spring', 'gold_plating', 0xe2b648, mergeAndDispose(bushPieces));

      // MI43: High-voltage (250V-class) X-Sync creepage dielectric insulator sleeve & radial fins
      const insPieces = [
        makeHorizPlateGeo(createFrameShape(13.6, 13.6, 6.8, 11.1, 11.1, 5.5), 1.35, cs, 0.05, 0, 0, 0),
        makeHorizPlateGeo(createFrameShape(14.8, 14.8, 7.4, 12.6, 12.6, 6.2), 0.34, cs, 0.03, 0, -0.42, 0),
        makeHorizPlateGeo(createFrameShape(14.4, 14.4, 7.2, 12.2, 12.2, 6.0), 0.32, cs, 0.03, 0, 0.42, 0),
      ];
      addBatchedPiece('mi-xsync-creepage-insulator', 'ceramic_alumina', 0xe8e3d6, mergeAndDispose(insPieces));

      // MI44: ISO 518 Frame-Ground elastic contact fingers & MIS-2006 twin silver contact lands
      const fingerPieces: THREE.BufferGeometry[] = [];
      for (const side of [-1, 1]) {
        fingerPieces.push(makeTransformedGeo(new THREE.BoxGeometry(2.4, 0.34, 7.8), side * 20.6, 0.42, 0, -0.14, 0, 0));
        fingerPieces.push(makeTransformedGeo(new THREE.BoxGeometry(2.6, 0.85, 2.0), side * 20.6, 0.05, -3.5));
      }
      addBatchedPiece('mi-ground-continuity-clips', 'becu_spring', 0xd89143, mergeAndDispose(fingerPieces));
      // Twin wide silver-plated ground lands on MIS-2006 flanks
      for (const side of [-1, 1]) {
        addInst('solder_pads', 'mi-ground-continuity-clips', [side * 20.2, -0.48, 0.2], [0, 0, 0], [3.6, 0.22, 8.8], 0xdce3ec, [1.85, 0.14, 4.45]);
      }
    },

    // =========================================================================
    // Chunk 11: 21-Pin Front Connector Internals & EMI Hood (MI45–MI49)
    // =========================================================================
    () => {
      // MI45: 21-Pin high-temp LCP insert-molded core housing & FPC registration dowels
      const corePieces = [
        makeHorizPlateGeo(createRoundedRectShape(39.4, 2.2, 0.5), 2.45, cs, 0.05, 0, 0.15, 0),
        makeTransformedGeo(new THREE.BoxGeometry(37.6, 0.55, 0.9), 0, -1.15, -0.4),
      ];
      addBatchedPiece('mi-21pin-insert-mold-block', 'matte_chassis', 0x22262f, mergeAndDispose(corePieces));
      for (const side of [-1, 1]) {
        addInst('cyl_bosses', 'mi-21pin-insert-mold-block', [side * 18.6, -1.35, -0.85], [0, 0, 0], [0.78, 1.35, 0.78], 0x3b4252, [0.85, 0.7, 0.85]);
      }

      // MI46: 21-Pin staggered gull-wing SMT solder fillets & heavy stainless end hold-down brackets
      for (let i = 0; i < 21; i++) {
        const x = pinX(i + 1);
        const zOff = i % 2 === 0 ? -0.45 : 0.42;
        addInst('solder_pads', 'mi-21pin-smt-solder-anchors', [x, -0.18, zOff], [0, 0, 0], [0.76, 0.36, 1.15], 0xd8e0ea, [0.42, 0.2, 0.62]);
        addInst('brass_contacts', 'mi-21pin-smt-solder-anchors', [x, 0.28, zOff * 0.6], [0.22, 0, 0], [0.48, 0.68, 0.42], 0xe2b648, [0.28, 0.38, 0.28]);
      }
      const holdPieces: THREE.BufferGeometry[] = [];
      for (const side of [-1, 1]) {
        holdPieces.push(makeTransformedGeo(new THREE.BoxGeometry(2.1, 1.15, 2.5), side * 20.0, 0.12, -0.1));
        holdPieces.push(makeTransformedGeo(new THREE.BoxGeometry(2.8, 0.32, 2.8), side * 20.0, -0.35, -0.1));
      }
      addBatchedPiece('mi-21pin-smt-solder-anchors', 'stainless_machined', 0xc2ccd8, mergeAndDispose(holdPieces));

      // MI47: 21-Pin rear hydrophobic epoxy potting barrier & capillary-break dam
      const potPieces = [
        makeHorizPlateGeo(createRoundedRectShape(38.4, 1.25, 0.35), 1.55, cs, 0.04, 0, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(36.8, 0.36, 0.65), 0, -0.82, -0.35),
      ];
      addBatchedPiece('mi-21pin-rear-potting-seal', 'ic_epoxy_dark', 0x2b241f, mergeAndDispose(potPieces));
      for (let i = 0; i < 7; i++) {
        addInst('smd_blocks', 'mi-21pin-rear-potting-seal', [-15.0 + i * 5.0, 0.05, 0.58], [0, 0, 0], [0.55, 1.35, 0.34], 0x3b312a, [0.3, 0.7, 0.2]);
      }

      // MI48: 21-Pin stamped stainless steel EMI shield hood & ground tabs
      const hoodPieces = [
        makeHorizPlateGeo(createRoundedRectShape(42.4, 6.6, 0.7), 0.42, cs, 0.04, 0, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(0.52, 3.65, 5.8), -21.0, -1.9, 0),
        makeTransformedGeo(new THREE.BoxGeometry(0.52, 3.65, 5.8), 21.0, -1.9, 0),
        makeTransformedGeo(new THREE.BoxGeometry(2.4, 0.42, 2.2), -20.2, -3.7, 0.8),
        makeTransformedGeo(new THREE.BoxGeometry(2.4, 0.42, 2.2), 20.2, -3.7, 0.8),
      ];
      addBatchedPiece('mi-21pin-emi-metal-hood', 'emi_shield_metal', 0xcfd7e2, mergeAndDispose(hoodPieces));

      // MI49: 21-Ch cantilever preload bar & anti-stubbing lead-in ramp
      const rampPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(38.0, 0.52, 1.35), 0, -0.05, -0.4, 0.28, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(38.0, 0.62, 0.95), 0, 0.12, 0.65),
      ];
      addBatchedPiece('mi-21pin-antistub-preload-comb', 'matte_black_anodized', 0x2a2f3a, mergeAndDispose(rampPieces));
      for (let i = 0; i < 21; i++) {
        addInst('smd_blocks', 'mi-21pin-antistub-preload-comb', [pinX(i + 1), 0.36, 0.65], [0, 0, 0], [0.58, 0.26, 0.82], 0x475569, [0.32, 0.16, 0.44]);
      }
    },

    // =========================================================================
    // Chunk 12: Dual-Axis Waterproof Sheets, Mesh Shield, Stiffener, Tape & Chassis (MI50–MI58)
    // =========================================================================
    () => {
      // MI50: MI SHOE FPC WP SHEET H (5-011-619-01) horizontal waterproof adhesive sheet
      addBatchedPiece(
        'mi-fpc-wp-sheet-h',
        'foam_felt_matte',
        0xa7b0bc,
        makeHorizPlateGeo(createFrameShape(36.0, 14.0, 1.4, 17.6, 2.4, 0.6), 0.32, cs, 0.02, 0, 0, 0)
      );
      for (const side of [-1, 1]) {
        addInst('smd_blocks', 'mi-fpc-wp-sheet-h', [side * 12.5, 0.18, 0], [0, 0, 0], [8.5, 0.14, 10.6], 0x8e99a8, [4.3, 0.1, 5.35]);
      }

      // MI51: MI SHOE FPC WP SHEET V (5-011-620-01) vertical slot sealing collar
      const vSheetPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(19.2, 5.2, 0.38), 0, 0, -0.58),
        makeTransformedGeo(new THREE.BoxGeometry(19.2, 5.2, 0.38), 0, 0, 0.58),
        makeTransformedGeo(new THREE.BoxGeometry(1.4, 5.2, 1.54), -9.0, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(1.4, 5.2, 1.54), 9.0, 0, 0),
      ];
      addBatchedPiece('mi-fpc-wp-sheet-v', 'foam_felt_matte', 0x9aa5b4, mergeAndDispose(vSheetPieces));

      // MI52: MIS-2006 45-degree cross-hatched gold/copper EMI shield mesh layer
      for (let i = -5; i <= 5; i++) {
        const cx = i * 3.0;
        const projHalf = Math.min(17.4 - Math.abs(cx), 14.4);
        const diagHalf = projHalf * Math.SQRT2;
        const zScale = Math.max(0.14, diagHalf / 11.0);
        addInst('fpc_traces', 'mi-fpc-gold-mesh-shield', [cx, 0, 0], [0, Math.PI * 0.25, 0], [1.1, 1.0, zScale], 0xd9a23b, [projHalf, 0.08, projHalf]);
        addInst('fpc_traces', 'mi-fpc-gold-mesh-shield', [cx, 0.02, 0], [0, -Math.PI * 0.25, 0], [1.1, 1.0, zScale], 0xd9a23b, [projHalf, 0.08, projHalf]);
      }
      addBatchedPiece(
        'mi-fpc-gold-mesh-shield',
        'copper_thermal',
        0xcf8434,
        makeHorizPlateGeo(createFrameShape(37.6, 31.6, 1.6, 35.6, 29.6, 1.2), 0.14, cs, 0.01, 0, 0, 0),
        false
      );

      // MI53: MIS-2006 24-pin ZIF calibration stiffener plate (0.30 mm) & locking ears
      const stiffPieces = [
        makeHorizPlateGeo(createRoundedRectShape(16.0, 4.4, 0.4), 0.36, cs, 0.02, 0, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(1.4, 0.36, 1.6), -8.5, 0, 0.4),
        makeTransformedGeo(new THREE.BoxGeometry(1.4, 0.36, 1.6), 8.5, 0, 0.4),
        makeTransformedGeo(new THREE.BoxGeometry(9.2, 0.34, 1.8), 0, 0, 2.8),
      ];
      addBatchedPiece('mi-fpc-zif-stiffener-tab', 'polyimide_fpc', 0x2563eb, mergeAndDispose(stiffPieces));

      // MI54: 631S #25 matte-black acetate strain-relief & bend protection tape (Ref.306 / 750000493)
      const tapePieces = [
        makeTransformedGeo(new THREE.BoxGeometry(22.0, 2.2, 0.28), 0, 0.4, -0.58),
        makeTransformedGeo(new THREE.BoxGeometry(22.0, 0.28, 4.4), 0, -0.68, 1.5),
      ];
      addBatchedPiece('mi-fpc-631s-strain-tape', 'matte_black_anodized', 0x1e222a, mergeAndDispose(tapePieces));

      // MI55: TOP CONNECT PLATE L (Ref.313 / 502790501) structural load-transfer bracket
      const connPieces = [
        makeHorizPlateGeo(createRoundedRectShape(11.6, 25.4, 1.4), 1.25, cs, 0.08, 0, 0.2, 0),
        makeTransformedGeo(new THREE.BoxGeometry(1.45, 4.4, 23.0), -5.4, -1.65, 0),
        makeTransformedGeo(new THREE.BoxGeometry(4.2, 1.15, 1.4), -3.2, -1.6, -9.2, 0, 0, 0.55),
        makeTransformedGeo(new THREE.BoxGeometry(4.2, 1.15, 1.4), -3.2, -1.6, 9.2, 0, 0, 0.55),
      ];
      addBatchedPiece('mi-top-connect-plate-l', 'stainless_machined', 0xbcc6d4, mergeAndDispose(connPieces));
      for (const tz of [-8.5, 4.5]) {
        addInst('cyl_bosses', 'mi-top-connect-plate-l', [3.2, 0.2, tz], [0, 0, 0], [2.1, 1.45, 2.1], 0x94a3b8, [2.2, 0.78, 2.2]);
      }

      // MI56: Flame-retardant PET dielectric barrier sheet (Ref.356 / 502992401 INSULATING SHEET A & B)
      addBatchedPiece(
        'mi-insulating-barrier-sheet',
        'matte_chassis',
        0x1d2129,
        makeHorizPlateGeo(createFrameShape(46.0, 34.0, 2.0, 18.4, 5.8, 1.0), 0.32, cs, 0.02, 0, 0, 0)
      );
      for (const [bx, bz] of [
        [-14.6, -13.1],
        [14.6, -13.1],
        [-14.6, 9.1],
        [14.6, 9.1],
      ] as Array<[number, number]>) {
        addInst('torus_seals', 'mi-insulating-barrier-sheet', [bx, 0.16, bz], [0, 0, 0], [2.5, 0.65, 2.5], 0x3b4252, [3.0, 0.2, 3.0]);
      }

      // MI57: Ferromagnetic magnetic-field shield plate (Ref.352 / 502789501 MAGNETIC FIELD CUT PLATE)
      const magPieces = [
        makeHorizPlateGeo(createFrameShape(44.0, 30.0, 1.8, 18.0, 5.4, 1.0), 0.48, cs, 0.03, 0, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(43.2, 0.75, 0.6), 0, -0.35, -14.6),
        makeTransformedGeo(new THREE.BoxGeometry(43.2, 0.75, 0.6), 0, -0.35, 14.6),
      ];
      addBatchedPiece('mi-magnetic-field-cut-plate', 'iron_magnetic', 0x5c6676, mergeAndDispose(magPieces));

      // MI58: Magnesium top-deck perimeter capillary drainage channels & corner runoff scuppers
      const drainOuter = makeHorizPlateGeo(
        createFrameShape(56.8, 49.4, 3.8, 50.4, 43.8, 2.8),
        0.82,
        cs,
        0.06,
        0,
        0,
        0
      );
      const scuppers: THREE.BufferGeometry[] = [drainOuter];
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          scuppers.push(
            makeTransformedGeo(
              new THREE.BoxGeometry(4.4, 0.46, 2.2),
              sx * 26.8,
              0.36,
              sz * 21.8,
              0,
              sx * sz * 0.72,
              0
            )
          );
        }
      }
      addBatchedPiece('mi-deck-drainage-channels', 'magnesium_cast', 0x454e5d, mergeAndDispose(scuppers));
    },

    // =========================================================================
    // Chunk 13: SY-1122 Power Management, Digital Audio PLL & Flash Bus ICs (MI59–MI62)
    // =========================================================================
    () => {
      // MI59: Pin 17 UNREG (6.1–8.4V / 1.6A) Smart Load-Switch MOSFET IC & Soft-Start Shunt
      addBatchedPiece(
        'mi-unreg-load-switch-ic',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(12.0, 12.0, 0.9), 0.75, cs, 0.04, 0, 0, 0)
      );
      // QFN power MOSFET load switch IC
      addInst('ic_packages', 'mi-unreg-load-switch-ic', [-1.8, 0.88, -1.2], [0, 0, 0], [4.6, 0.95, 4.6], 0x1e222b, [2.35, 0.5, 2.35]);
      // 20 mΩ Kelvin current-sense shunt resistor + wide copper thermal pads
      addInst('smd_blocks', 'mi-unreg-load-switch-ic', [3.2, 0.76, -1.5], [0, 0, 0], [2.4, 0.68, 4.2], 0x3a4352, [1.25, 0.38, 2.15]);
      addInst('solder_pads', 'mi-unreg-load-switch-ic', [3.2, 0.76, -3.5], [0, 0, 0], [2.5, 0.72, 0.75], 0xd9e1eb, [1.3, 0.4, 0.42]);
      addInst('solder_pads', 'mi-unreg-load-switch-ic', [3.2, 0.76, 0.5], [0, 0, 0], [2.5, 0.72, 0.75], 0xd9e1eb, [1.3, 0.4, 0.42]);
      // Soft-start & bulk input/output MLCC caps
      for (let i = 0; i < 3; i++) {
        addInst('smd_blocks', 'mi-unreg-load-switch-ic', [-3.2 + i * 2.8, 0.78, 3.3], [0, 0, 0], [2.0, 0.82, 1.35], 0xb28a56, [1.05, 0.45, 0.72]);
      }

      // MI60: Pin 13 LOGIC_VDD 3.15V Ultra-Low-Noise LDO Regulator & High-PSRR Decoupling Net
      addBatchedPiece(
        'mi-logic-3v15-ldo-reg',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(12.0, 12.0, 0.9), 0.75, cs, 0.04, 0, 0, 0)
      );
      addInst('ic_packages', 'mi-logic-3v15-ldo-reg', [-1.4, 0.85, 0.4], [0, 0, 0], [4.2, 0.88, 3.8], 0x1e222b, [2.15, 0.46, 1.95]);
      // Power-good supervisor IC
      addInst('ic_packages', 'mi-logic-3v15-ldo-reg', [3.4, 0.74, -2.2], [0, 0, 0], [2.2, 0.65, 2.2], 0x262c38, [1.15, 0.36, 1.15]);
      // Ferrite bead + low-ESR ceramic decoupling caps
      addInst('smd_blocks', 'mi-logic-3v15-ldo-reg', [3.4, 0.76, 2.2], [0, 0, 0], [2.4, 0.78, 1.4], 0x3b4252, [1.25, 0.42, 0.75]);
      for (let i = 0; i < 4; i++) {
        addInst('smd_blocks', 'mi-logic-3v15-ldo-reg', [-3.8 + i * 2.2, 0.7, -3.5], [0, 0, 0], [1.4, 0.62, 1.0], 0xb28a56, [0.75, 0.34, 0.55]);
      }

      // MI61: Digital Audio I2S/TDM 4ch Low-Jitter Clock PLL & 1.8V↔3.15V Level Shifter
      addBatchedPiece(
        'mi-digital-audio-pll-shifter',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(12.0, 12.0, 0.9), 0.75, cs, 0.04, 0, 0, 0)
      );
      // Hermetic metal-lid 24.576 / 49.152 MHz audio master crystal oscillator
      addBatchedPiece(
        'mi-digital-audio-pll-shifter',
        'emi_shield_metal',
        0xd2dae4,
        makeTransformedGeo(new THREE.BoxGeometry(3.6, 0.92, 2.8), -2.6, 0.88, -2.4)
      );
      // Fractional-N audio PLL + level translator IC
      addInst('ic_packages', 'mi-digital-audio-pll-shifter', [2.2, 0.88, -1.0], [0, 0, 0], [4.6, 0.95, 4.6], 0x1d2330, [2.35, 0.5, 2.35]);
      // 4x 33-ohm series source-termination damping resistors for BCLK/LRCK/SDATA0/SDATA1
      for (let i = 0; i < 4; i++) {
        addInst('smd_blocks', 'mi-digital-audio-pll-shifter', [-3.4 + i * 2.2, 0.68, 3.4], [0, 0, 0], [1.3, 0.56, 1.8], 0x2563eb, [0.7, 0.3, 0.95]);
      }

      // MI62: ADI / P-TTL / HSS Bidirectional Flash Bus Transceiver (F1# / F2 / F3 Open-Drain Driver)
      addBatchedPiece(
        'mi-flash-ttl-bus-transceiver',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(12.0, 12.0, 0.9), 0.75, cs, 0.04, 0, 0, 0)
      );
      // Flash timing bus controller & open-drain transceiver IC
      addInst('ic_packages', 'mi-flash-ttl-bus-transceiver', [-1.8, 0.9, -0.8], [0, 0, 0], [5.0, 1.0, 4.8], 0x1e222b, [2.55, 0.52, 2.45]);
      // Dual high-speed Schottky barrier clamp arrays + pull-ups for F1#/F2/F3
      for (let i = 0; i < 3; i++) {
        addInst('ic_packages', 'mi-flash-ttl-bus-transceiver', [3.4, 0.74, -3.2 + i * 3.1], [0, 0, 0], [2.2, 0.7, 1.75], 0x333a47, [1.15, 0.38, 0.92]);
      }
      for (let i = 0; i < 3; i++) {
        addInst('solder_pads', 'mi-flash-ttl-bus-transceiver', [-3.6 + i * 2.1, 0.68, 3.6], [0, 0, 0], [1.2, 0.52, 1.5], 0xdc2626, [0.65, 0.3, 0.8]);
      }
    },
  ];
}
