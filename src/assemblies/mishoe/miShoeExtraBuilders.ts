import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createFrameShape, createRoundedRectShape } from '../../engine/CadHelpers';
import { MaterialBucketKey } from '../../core/resource_cache';

export type MiShoeInstPoolKey =
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
  | 'solder_fillets'
  | 'ic_chips'
  | 'ceramic_caps';

export interface MiShoeExtraBuildContext {
  readonly curveSegments: number;
  readonly radialSegments: number;
  readonly sphereSegments: number;
  readonly pinPitch: number;
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
    poolName: MiShoeInstPoolKey,
    partId: string,
    localPos: [number, number, number],
    localRot: [number, number, number],
    localScale: [number, number, number],
    colorHex: number,
    halfExtents: [number, number, number]
  ) => void;
  readonly pushPrecisionScrewInstances: (
    partId: string,
    ox: number,
    oy: number,
    oz: number,
    inverted: boolean,
    headR: number,
    headH: number,
    shankR: number,
    shankL: number,
    headColor: number,
    shankColor: number
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
 * Hero edge subset among the MI33–MI62 ultra-dissection expansion parts.
 * Kept intentionally compact (6 structural hero parts) to preserve <= 100dc Solid budget.
 */
export const MISHOE_EXTRA_HERO_EDGE_PARTS: readonly string[] = [
  'mi-mating-metal-foot-frame',
  'mi-21pin-metal-shield-cage',
  'mi-fpc-sus-stiffener-plate',
  'mi-top-connect-plate-l',
  'mi-evf-protector-barrier',
  'mi-magnetic-cut-insul-sheet',
];

/**
 * Time-sliced V2 geometry build chunks for MI33–MI62 (+30 precision parts).
 * Uses ONLY ResourceCache 38 material buckets via Tier-1 InstancedMesh & Tier-2 BatchedMesh.
 */
export function createMiShoeExtraBuildChunks(ctx: MiShoeExtraBuildContext): Array<() => void> {
  const {
    curveSegments: cs,
    radialSegments: rs,
    pinX,
    makeTransformedGeo,
    makeHorizPlateGeo,
    addBatchedPiece,
    addInst,
    pushPrecisionScrewInstances,
  } = ctx;

  return [
    // =========================================================================
    // Extra Chunk 1: MI33–MI36 (Top Protection, Reinforced Metal Foot & Lock)
    // =========================================================================
    () => {
      // MI33: Shoe Cap Underside Detent Tabs & Front 21-Pin Dust Baffle Lip
      const bafflePieces = [
        makeTransformedGeo(new THREE.BoxGeometry(25.6, 0.55, 8.6), 0, 0.12, -1.6),
        makeTransformedGeo(new THREE.BoxGeometry(2.1, 0.72, 7.2), -12.0, -0.1, -1.2, 0, 0, -0.18),
        makeTransformedGeo(new THREE.BoxGeometry(2.1, 0.72, 7.2), 12.0, -0.1, -1.2, 0, 0, 0.18),
        makeTransformedGeo(new THREE.BoxGeometry(36.8, 1.05, 1.4), 0, -0.22, 4.9),
      ];
      addBatchedPiece('mi-cap-detent-dust-baffle', 'matte_chassis', 0x262a33, mergeAndDispose(bafflePieces));
      addBatchedPiece(
        'mi-cap-detent-dust-baffle',
        'elastomer_rubber',
        0x363b45,
        makeTransformedGeo(new THREE.BoxGeometry(35.4, 0.55, 0.9), 0, -0.58, 5.45)
      );
      for (const sx of [-12.6, 12.6]) {
        addInst('smd_blocks', 'mi-cap-detent-dust-baffle', [sx, -0.35, -3.5], [0, 0, 0], [1.4, 0.42, 2.6], 0x4b5563, [0.75, 0.25, 1.35]);
      }

      // MI34: Reinforced Metal MI Foot Frame & Side Impact Guard (HVL-F60RM2 / ECM-M1)
      const footPlatePieces = [
        makeHorizPlateGeo(createRoundedRectShape(41.4, 34.0, 1.8), 1.45, cs, 0.1, 0, -0.45, -1.2),
        makeTransformedGeo(new THREE.BoxGeometry(2.2, 2.3, 14.0), -19.8, 0.55, 9.8),
        makeTransformedGeo(new THREE.BoxGeometry(2.2, 2.3, 14.0), 19.8, 0.55, 9.8),
        makeTransformedGeo(new THREE.BoxGeometry(38.0, 0.85, 4.4), 0, 1.25, 14.4),
      ];
      addBatchedPiece('mi-mating-metal-foot-frame', 'stainless_machined', 0xcfd6df, mergeAndDispose(footPlatePieces));
      const footNeckPieces = [
        makeHorizPlateGeo(createRoundedRectShape(28.4, 24.5, 2.2), 1.35, cs, 0.08, 0, 0.92, -3.2),
        makeTransformedGeo(new THREE.BoxGeometry(36.8, 1.55, 4.6), 0, -0.1, 14.8),
      ];
      addBatchedPiece('mi-mating-metal-foot-frame', 'matte_black_anodized', 0x22262e, mergeAndDispose(footNeckPieces));
      // 21 mating male gold finger pads on front plug tongue (Instanced!)
      for (let i = 1; i <= 21; i++) {
        const px = pinX(i);
        addInst('front_pin_blades', 'mi-mating-metal-foot-frame', [px, -0.78, 15.6], [0, 0, 0], [0.78, 0.28, 3.2], 0xe2b648, [0.42, 0.18, 1.65]);
      }

      // MI35: Quick-Lock Retractable Plunger Pin & Cam Lock Lever Assembly
      const dialPieces = [
        makeTransformedGeo(new THREE.CylinderGeometry(7.6, 7.9, 1.75, rs), 0, 0.8, 0),
        makeTransformedGeo(new THREE.BoxGeometry(4.4, 1.45, 7.2), 6.2, 0.8, -4.8, 0, -0.58, 0),
      ];
      addBatchedPiece('mi-quick-lock-plunger-pin', 'matte_black_anodized', 0x242830, mergeAndDispose(dialPieces));
      // 16 instanced knurled grip ribs around locking ring
      for (let i = 0; i < 16; i++) {
        const ang = (i / 16) * Math.PI * 2;
        addInst(
          'smd_blocks',
          'mi-quick-lock-plunger-pin',
          [Math.cos(ang) * 7.85, 0.8, Math.sin(ang) * 7.85],
          [0, -ang, 0],
          [0.48, 1.45, 0.62],
          0x333a47,
          [0.4, 0.78, 0.4]
        );
      }
      // Red/orange release button tab on quick-shift lock lever
      addBatchedPiece(
        'mi-quick-lock-plunger-pin',
        'pin_carrier_gloss',
        0xd94b38,
        makeTransformedGeo(new THREE.BoxGeometry(2.6, 0.95, 2.8), 7.8, 1.35, -7.2, 0, -0.58, 0)
      );
      // Retractable stainless lock plunger pin + internal return spring rings
      const plungerPieces = [
        makeTransformedGeo(new THREE.CylinderGeometry(1.75, 1.65, 3.8, rs), 0, -1.25, 0),
        makeTransformedGeo(new THREE.CylinderGeometry(2.7, 2.7, 0.65, rs), 0, 0.25, 0),
      ];
      addBatchedPiece('mi-quick-lock-plunger-pin', 'stainless_machined', 0xdce2ea, mergeAndDispose(plungerPieces));
      for (let k = 0; k < 3; k++) {
        addInst('torus_seals', 'mi-quick-lock-plunger-pin', [0, -0.35 - k * 0.55, 0], [0, 0, 0], [2.05, 0.7, 2.05], 0xd89143, [2.4, 0.25, 2.4]);
      }

      // MI36: Dual-Stage Silicone Skirt Compression Wiper Lip & Capillary Break Ring
      addBatchedPiece(
        'mi-wp-lip-compression-ring',
        'elastomer_rubber',
        0x2e323a,
        makeHorizPlateGeo(createFrameShape(59.4, 54.0, 5.5, 55.0, 49.6, 4.4), 0.78, cs, 0.08, 0, 0.1, 0)
      );
      addBatchedPiece(
        'mi-wp-lip-compression-ring',
        'elastomer_rubber',
        0xc44536,
        makeHorizPlateGeo(createFrameShape(54.2, 48.8, 4.2, 51.6, 46.2, 3.5), 0.55, cs, 0.06, 0, -0.28, 0)
      );
      for (const [cx, cz] of [
        [-27.2, -24.2],
        [27.2, -24.2],
        [-27.2, 24.2],
        [27.2, 24.2],
      ] as Array<[number, number]>) {
        addInst('smd_blocks', 'mi-wp-lip-compression-ring', [cx, 0.0, cz], [0, Math.PI * 0.25, 0], [2.4, 0.65, 1.1], 0x3b414c, [1.5, 0.35, 1.5]);
      }
    },

    // =========================================================================
    // Extra Chunk 2: MI37–MI42 (Rail Ramps, Cover Hooks, Spring Stops, Fastener Hardware)
    // =========================================================================
    () => {
      // MI37: ISO 518 Rail Entry Lead-In Chamfer Ramps & Inner Wing Bearing Guides
      const rampPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(4.2, 1.05, 4.8), -20.2, 0.35, -5.2, 0.35, -0.18, 0),
        makeTransformedGeo(new THREE.BoxGeometry(4.2, 1.05, 4.8), 20.2, 0.35, -5.2, 0.35, 0.18, 0),
        makeTransformedGeo(new THREE.BoxGeometry(2.8, 0.65, 12.2), -20.8, 0.82, 2.2),
        makeTransformedGeo(new THREE.BoxGeometry(2.8, 0.65, 12.2), 20.8, 0.82, 2.2),
      ];
      addBatchedPiece('mi-rail-chamfer-guide-ramps', 'stainless_machined', 0xd6dde6, mergeAndDispose(rampPieces));
      const padPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(1.4, 0.45, 10.6), -21.6, -0.2, 2.2),
        makeTransformedGeo(new THREE.BoxGeometry(1.4, 0.45, 10.6), 21.6, -0.2, 2.2),
      ];
      addBatchedPiece('mi-rail-chamfer-guide-ramps', 'metal_hero', 0x9aa4b2, mergeAndDispose(padPieces));

      // MI38: Screw Cover Front Interlock Hooks & Slide Retention Channels (500294602)
      const hookPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(31.2, 0.55, 2.8), 0, 0.15, -1.6),
        makeTransformedGeo(new THREE.BoxGeometry(5.2, 0.55, 5.2), -11.5, 0.05, 1.4),
        makeTransformedGeo(new THREE.BoxGeometry(5.2, 0.55, 5.2), 11.5, 0.05, 1.4),
        makeTransformedGeo(new THREE.BoxGeometry(5.2, 0.95, 1.2), -11.5, -0.35, 3.6),
        makeTransformedGeo(new THREE.BoxGeometry(5.2, 0.95, 1.2), 11.5, -0.35, 3.6),
      ];
      addBatchedPiece('mi-cover-front-interlock-hooks', 'matte_chassis', 0x262a33, mergeAndDispose(hookPieces));
      const wearClipPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(4.4, 0.25, 3.8), -11.5, 0.42, 1.4),
        makeTransformedGeo(new THREE.BoxGeometry(4.4, 0.25, 3.8), 11.5, 0.42, 1.4),
      ];
      addBatchedPiece('mi-cover-front-interlock-hooks', 'stainless_machined', 0xc9d2dd, mergeAndDispose(wearClipPieces));

      // MI39: Spring Plate Over-Travel Relief Stops & Rear Hook Anchor Tabs (500294502)
      const stopPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(28.0, 0.42, 2.4), 0, -0.1, -2.8),
        makeTransformedGeo(new THREE.BoxGeometry(4.4, 0.95, 2.6), -12.2, 0.25, -3.2),
        makeTransformedGeo(new THREE.BoxGeometry(4.4, 0.95, 2.6), 12.2, 0.25, -3.2),
      ];
      addBatchedPiece('mi-spring-relief-stops', 'becu_spring', 0xd89143, mergeAndDispose(stopPieces));
      const anchorPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(3.8, 0.65, 4.6), -12.2, 0.05, 1.6),
        makeTransformedGeo(new THREE.BoxGeometry(3.8, 0.65, 4.6), 12.2, 0.05, 1.6),
      ];
      addBatchedPiece('mi-spring-relief-stops', 'metal_hero', 0xb6c0cc, mergeAndDispose(anchorPieces));

      // MI40: 4x M1.7 Special-Head Countersunk Shear-Load Bushings (Instanced!)
      const screwPts: Array<[number, number]> = [
        [-14.6, -12.6],
        [14.6, -12.6],
        [-14.6, 9.6],
        [14.6, 9.6],
      ];
      for (const [sx, sz] of screwPts) {
        addInst('torus_seals', 'mi-m17-countersink-bushings', [sx, 0.32, sz], [0, 0, 0], [2.35, 0.95, 2.35], 0xd0d7e2, [2.75, 0.45, 2.75]);
        addInst('cyl_bosses', 'mi-m17-countersink-bushings', [sx, -0.18, sz], [0, 0, 0], [1.95, 0.95, 1.95], 0x8f9aa8, [2.0, 0.52, 2.0]);
      }

      // MI41: 4x Micro-Encapsulated Anaerobic Threadlocker Sleeves & Tapped Nut Inserts
      for (const [sx, sz] of screwPts) {
        // Vivid Loctite-blue threadlocker film band + precision brass/steel tapped boss insert
        addInst('torus_seals', 'mi-threadlocker-retention-sleeves', [sx, 0.55, sz], [0, 0, 0], [1.65, 1.35, 1.65], 0x2563eb, [2.1, 0.55, 2.1]);
        addInst('torus_seals', 'mi-threadlocker-retention-sleeves', [sx, -0.25, sz], [0, 0, 0], [1.65, 1.35, 1.65], 0x3b82f6, [2.1, 0.55, 2.1]);
        addInst('cyl_bosses', 'mi-threadlocker-retention-sleeves', [sx, -0.95, sz], [0, 0, 0], [2.15, 1.15, 2.15], 0xc99c45, [2.25, 0.62, 2.25]);
      }

      // MI42: M1.4 Rear Cover Captive Nut Boss & Insulating Washer Collar
      addBatchedPiece(
        'mi-m14-rear-nut-boss',
        'brass_precision',
        0xd4a948,
        makeTransformedGeo(new THREE.CylinderGeometry(2.35, 2.35, 1.5, 6), 0, -0.35, 0)
      );
      addInst('torus_seals', 'mi-m14-rear-nut-boss', [0, 0.55, 0], [0, 0, 0], [2.25, 0.85, 2.25], 0x2f3540, [2.65, 0.35, 2.65]);
      addInst('cyl_bosses', 'mi-m14-rear-nut-boss', [0, 0.25, 0], [0, 0, 0], [1.25, 1.8, 1.25], 0x9aa4b2, [1.3, 0.95, 1.3]);
    },

    // =========================================================================
    // Extra Chunk 3: MI43–MI45 (ISO 518 Center X-Sync Spring/Bushing & Frame GND Fingers)
    // =========================================================================
    () => {
      // MI43: Center X-Sync Internal Phosphor-Bronze Compression Spring & Plunger Guide
      for (let k = 0; k < 4; k++) {
        addInst('torus_seals', 'mi-xsync-plunger-spring', [0, 0.72 - k * 0.46, 0], [0.06, 0, 0], [2.45, 0.8, 2.45], 0xd89143, [2.95, 0.28, 2.95]);
      }
      addBatchedPiece(
        'mi-xsync-plunger-spring',
        'stainless_machined',
        0xcbd3de,
        makeTransformedGeo(new THREE.CylinderGeometry(1.55, 1.55, 2.1, rs), 0, 0.05, 0)
      );
      addBatchedPiece(
        'mi-xsync-plunger-spring',
        'gold_plating',
        0xe2b648,
        makeTransformedGeo(new THREE.CylinderGeometry(2.85, 2.85, 0.38, rs), 0, -1.05, 0)
      );

      // MI44: Center X-Sync High-CTI Dielectric LCP Bushing & Micro Waterproof O-Ring
      addBatchedPiece(
        'mi-xsync-dielectric-bushing',
        'ceramic_alumina',
        0xe8e4d8,
        makeHorizPlateGeo(createFrameShape(12.2, 12.2, 5.8, 7.6, 7.6, 3.6), 1.15, cs, 0.06, 0, 0.0, 0)
      );
      addInst('torus_seals', 'mi-xsync-dielectric-bushing', [0, -0.68, 0], [0, 0, 0], [5.15, 0.95, 5.15], 0xc44536, [5.9, 0.42, 5.9]);
      addInst('torus_seals', 'mi-xsync-dielectric-bushing', [0, 0.62, 0], [0, 0, 0], [4.45, 0.65, 4.45], 0x2a2f3a, [5.0, 0.3, 5.0]);

      // MI45: Left/Right ISO Frame Ground Multi-Point BeCu Spring Fingers & REG_GND Bus
      const busPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(1.35, 0.85, 31.0), -22.9, -0.25, 0),
        makeTransformedGeo(new THREE.BoxGeometry(1.35, 0.85, 31.0), 22.9, -0.25, 0),
        makeTransformedGeo(new THREE.BoxGeometry(46.8, 0.48, 2.4), 0, -0.85, -14.2),
      ];
      addBatchedPiece('mi-fg-ground-spring-fingers', 'copper_thermal', 0xd07447, mergeAndDispose(busPieces));
      // 8x instanced angled BeCu multi-point spring contact fingers (4 per side)
      for (const side of [-1, 1]) {
        for (let i = 0; i < 4; i++) {
          const fz = -10.5 + i * 7.0;
          addInst(
            'cantilever_beams',
            'mi-fg-ground-spring-fingers',
            [side * 22.3, 0.55, fz],
            [0.24, 0, side * 0.22],
            [1.15, 1.0, 1.05],
            0xd89143,
            [0.7, 0.65, 2.35]
          );
          addInst(
            'cantilever_tips',
            'mi-fg-ground-spring-fingers',
            [side * 22.0, 0.98, fz - 1.5],
            [0, 0, 0],
            [1.1, 1.1, 1.1],
            0xe2b648,
            [0.45, 0.45, 0.45]
          );
        }
      }
    },

    // =========================================================================
    // Extra Chunk 4: MI46–MI49 (21-Pin Front Connector 1-843-477-21 Micro-Anatomy)
    // =========================================================================
    () => {
      // MI46: 21-Pin Front Connector Metal EMI Shield Shell & SMT Hold-Down Anchors
      const cagePieces = [
        makeHorizPlateGeo(createRoundedRectShape(42.4, 7.1, 0.9), 0.45, cs, 0.04, 0, 2.02, 0.2),
        makeTransformedGeo(new THREE.BoxGeometry(0.65, 4.1, 7.1), -21.1, 0.15, 0.2),
        makeTransformedGeo(new THREE.BoxGeometry(0.65, 4.1, 7.1), 21.1, 0.15, 0.2),
        makeTransformedGeo(new THREE.BoxGeometry(42.4, 4.1, 0.55), 0, 0.15, 3.52),
      ];
      addBatchedPiece('mi-21pin-metal-shield-cage', 'emi_shield_metal', 0xc5cdd8, mergeAndDispose(cagePieces));
      // Twin heavy-duty lateral SMT hold-down solder anchors + 4 top grounding dimples
      for (const sx of [-22.1, 22.1]) {
        addInst('solder_fillets', 'mi-21pin-metal-shield-cage', [sx, -1.65, 0.4], [0, 0, 0], [1.9, 0.62, 5.2], 0xdbe2ea, [1.0, 0.35, 2.65]);
      }
      for (const dx of [-14.0, -4.8, 4.8, 14.0]) {
        addInst('cyl_bosses', 'mi-21pin-metal-shield-cage', [dx, 2.32, 0.1], [0, 0, 0], [1.15, 0.32, 1.15], 0xdce2ea, [1.2, 0.2, 1.2]);
      }

      // MI47: 21-Pin Anti-Skew Polarization Keyway Towers & Precision PCB Locating Dowels
      const keywayPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(2.1, 3.1, 4.6), -21.6, 0.1, -2.6),
        makeTransformedGeo(new THREE.BoxGeometry(2.1, 3.1, 4.6), 21.6, 0.1, -2.6),
        makeTransformedGeo(new THREE.BoxGeometry(1.1, 1.4, 2.4), -20.2, 0.65, -3.4),
        makeTransformedGeo(new THREE.BoxGeometry(1.1, 1.4, 2.4), 20.2, -0.55, -3.4),
      ];
      addBatchedPiece('mi-21pin-keyway-align-boss', 'matte_black_anodized', 0x1f242c, mergeAndDispose(keywayPieces));
      // Lead-in funnel bevel tips + twin downward PCB alignment locating boss pins
      for (const sx of [-21.6, 21.6]) {
        addInst('solder_fillets', 'mi-21pin-keyway-align-boss', [sx, 0.1, -4.95], [0, 0, 0], [1.5, 2.4, 0.65], 0xb6c0cc, [0.8, 1.25, 0.35]);
      }
      for (const sx of [-18.4, 18.4]) {
        addInst('cyl_bosses', 'mi-21pin-keyway-align-boss', [sx, -1.95, 1.0], [0, 0, 0], [0.95, 1.9, 0.95], 0x3b4250, [1.0, 1.0, 1.0]);
      }

      // MI48: 21-Channel Fine-Pitch SAC305 Gull-Wing SMT Solder Fillets & Micro-Via Fanout
      for (let i = 1; i <= 21; i++) {
        const px = pinX(i);
        // Silver reflow gull-wing solder fillet
        addInst('solder_fillets', 'mi-21pin-smt-solder-array', [px, 0.12, -0.35], [0.22, 0, 0], [0.78, 0.58, 1.35], 0xd9e0e8, [0.42, 0.32, 0.72]);
        // Gold SMT landing pad
        addInst('front_pin_blades', 'mi-21pin-smt-solder-array', [px, -0.22, 0.15], [0, 0, 0], [0.92, 0.18, 2.15], 0xe2b648, [0.5, 0.12, 1.12]);
        // Staggered laser micro-via barrel
        const vz = i % 2 === 0 ? 1.15 : 0.65;
        addInst('cyl_bosses', 'mi-21pin-smt-solder-array', [px, -0.35, vz], [0, 0, 0], [0.34, 0.45, 0.34], 0xd97d4e, [0.38, 0.25, 0.38]);
      }

      // MI49: 21-Pin Tri-Layer Contact Crown Plating (Au 0.5um / Ni 2.0um Barrier / CuSn)
      for (let i = 1; i <= 21; i++) {
        const px = pinX(i);
        // Bottom phosphor-bronze elastic core layer
        addInst('cantilever_beams', 'mi-21pin-gold-nickel-barrier', [px, -0.22, 0], [0, 0, 0], [1.18, 0.78, 0.46], 0xd07d3e, [0.45, 0.18, 1.05]);
        // Middle nickel diffusion barrier layer (silver)
        addInst('solder_fillets', 'mi-21pin-gold-nickel-barrier', [px, 0.04, 0], [0, 0, 0], [0.84, 0.2, 2.05], 0xcfd6df, [0.45, 0.12, 1.05]);
        // Top hard cobalt-gold contact crown layer
        addInst('front_pin_blades', 'mi-21pin-gold-nickel-barrier', [px, 0.26, 0], [0, 0, 0], [0.86, 0.24, 2.15], 0xf2c249, [0.46, 0.15, 1.1]);
      }
    },

    // =========================================================================
    // Extra Chunk 5: MI50–MI56 (MIS-2006 Stiffeners/Tape & Deck/EVF/Magnetic Shields)
    // =========================================================================
    () => {
      // MI50: MIS-2006 Underside SUS304 Stainless Rigid Stiffener & Thermal-Bond Adhesive
      addBatchedPiece(
        'mi-fpc-sus-stiffener-plate',
        'stainless_machined',
        0xc3ccd8,
        makeHorizPlateGeo(createFrameShape(39.6, 9.6, 0.9, 6.0, 2.6, 0.6), 0.36, cs, 0.02, 0, 0.0, 0)
      );
      addBatchedPiece(
        'mi-fpc-sus-stiffener-plate',
        'polyimide_fpc',
        0xd97d2b,
        makeHorizPlateGeo(createFrameShape(40.2, 10.2, 1.0, 36.2, 6.6, 0.7), 0.16, cs, 0.01, 0, 0.24, 0),
        false
      );

      // MI51: MIS-2006 Matte-Black Polyimide Coverlay & Silver-Ink EMI Shield Film
      const coverlayPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(16.6, 9.2, 0.18), 0, 0, -0.44),
        makeTransformedGeo(new THREE.BoxGeometry(16.6, 9.2, 0.18), 0, 0, 0.44),
      ];
      addBatchedPiece('mi-fpc-black-coverlay-shield', 'matte_black_anodized', 0x1e222a, mergeAndDispose(coverlayPieces));
      const silverShieldPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(14.8, 7.8, 0.14), 0, 0, 0.58),
        makeTransformedGeo(new THREE.BoxGeometry(14.8, 7.8, 0.14), 0, 0, -0.58),
      ];
      addBatchedPiece('mi-fpc-black-coverlay-shield', 'emi_shield_metal', 0xadb7c5, mergeAndDispose(silverShieldPieces));
      for (const sx of [-7.4, 7.4]) {
        for (let k = -3; k <= 3; k++) {
          addInst('front_pin_blades', 'mi-fpc-black-coverlay-shield', [sx, k * 1.15, 0.64], [0, 0, 0], [0.85, 0.55, 0.14], 0xe2b648, [0.45, 0.3, 0.1]);
        }
      }

      // MI52: MIS-2006 24-Pin ZIF Tail Polyimide Insertion Stiffener & Alignment Ears
      const zifStiffPieces = [
        makeHorizPlateGeo(createRoundedRectShape(16.2, 4.4, 0.5), 0.34, cs, 0.02, 0, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(1.6, 0.38, 1.9), -8.8, 0, -0.5),
        makeTransformedGeo(new THREE.BoxGeometry(1.6, 0.38, 1.9), 8.8, 0, -0.5),
      ];
      addBatchedPiece('mi-fpc-zif-tail-stiffener', 'pin_carrier_gloss', 0x2563eb, mergeAndDispose(zifStiffPieces));
      // Crisp white insertion depth alignment line printed across ZIF tail
      addBatchedPiece(
        'mi-fpc-zif-tail-stiffener',
        'ceramic_alumina',
        0xf1f5f9,
        makeTransformedGeo(new THREE.BoxGeometry(15.6, 0.12, 0.55), 0, 0.22, -1.45),
        false
      );

      // MI53: Sony OEM Ref.306 750000493 TAPE (631S #25) 7mm BLK & FPC Bend Cushion
      const tapePieces = [
        makeHorizPlateGeo(createRoundedRectShape(22.6, 4.8, 0.4), 0.24, cs, 0.02, 0, 0.85, 0),
        makeTransformedGeo(new THREE.BoxGeometry(22.6, 2.2, 0.24), 0, -0.25, 2.25),
      ];
      addBatchedPiece('mi-tape-631s-fpc-retention', 'matte_black_anodized', 0x1a1d24, mergeAndDispose(tapePieces));
      addBatchedPiece(
        'mi-tape-631s-fpc-retention',
        'foam_felt_matte',
        0x3d434e,
        makeTransformedGeo(new THREE.CylinderGeometry(1.15, 1.15, 17.8, rs), 0, -0.35, -0.65, 0, 0, Math.PI * 0.5)
      );

      // MI54: Sony OEM Ref.313 502790501 TOP CONNECT PLATE L (Structural Load Bridge)
      const bridgePieces = [
        makeHorizPlateGeo(createRoundedRectShape(11.0, 26.0, 1.6), 1.25, cs, 0.08, 0, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(3.8, 2.6, 18.0), -4.2, 1.15, 0),
        makeTransformedGeo(new THREE.BoxGeometry(7.2, 0.75, 16.0), 1.8, 0.95, 0),
      ];
      addBatchedPiece('mi-top-connect-plate-l', 'stainless_machined', 0xb8c2cf, mergeAndDispose(bridgePieces));
      for (const sz of [-8.2, 8.2]) {
        pushPrecisionScrewInstances('mi-top-connect-plate-l', -1.2, 0.72, sz, false, 1.85, 0.55, 0.95, 3.2, 0xcfd6df, 0x98a2b0);
      }

      // MI55: Sony OEM Ref.303 502790801 EVF PROTECTOR (Crush/Thermal/Light Barrier)
      const evfProtPieces = [
        makeHorizPlateGeo(createRoundedRectShape(44.5, 11.8, 2.2), 1.35, cs, 0.1, 0, 0, 0),
        makeTransformedGeo(new THREE.BoxGeometry(42.0, 1.8, 1.4), 0, -1.1, -5.2),
        makeTransformedGeo(new THREE.BoxGeometry(1.6, 1.8, 10.6), -21.4, -1.1, 0),
        makeTransformedGeo(new THREE.BoxGeometry(1.6, 1.8, 10.6), 21.4, -1.1, 0),
      ];
      addBatchedPiece('mi-evf-protector-barrier', 'matte_chassis', 0x282d37, mergeAndDispose(evfProtPieces));
      addBatchedPiece(
        'mi-evf-protector-barrier',
        'foam_felt_matte',
        0x363b45,
        makeTransformedGeo(new THREE.BoxGeometry(38.0, 0.75, 2.2), 0, -0.95, 4.6)
      );
      for (const sx of [-19.0, 19.0]) {
        addInst('cyl_bosses', 'mi-evf-protector-barrier', [sx, 0.2, 0], [0, 0, 0], [2.1, 1.6, 2.1], 0x8d97a6, [2.2, 0.85, 2.2]);
      }

      // MI56: Sony OEM Ref.352 502789501 MAGNETIC FIELD CUT PLATE & Ref.356 INSULATING SHEET A
      addBatchedPiece(
        'mi-magnetic-cut-insul-sheet',
        'iron_magnetic',
        0x5b6472,
        makeHorizPlateGeo(createRoundedRectShape(41.5, 11.2, 1.4), 0.42, cs, 0.03, 0, 0.25, 0)
      );
      addBatchedPiece(
        'mi-magnetic-cut-insul-sheet',
        'matte_black_anodized',
        0x222730,
        makeHorizPlateGeo(createRoundedRectShape(43.2, 12.2, 1.6), 0.26, cs, 0.02, 0, -0.22, 0)
      );
      for (const sx of [-18.5, 0, 18.5]) {
        addInst('ceramic_caps', 'mi-magnetic-cut-insul-sheet', [sx, 0.52, -4.6], [0, 0, 0], [3.2, 0.16, 1.4], 0xe2e8f0, [1.65, 0.12, 0.75]);
      }
    },

    // =========================================================================
    // Extra Chunk 6: MI57–MI62 (SY-1122 Mainboard Power, Audio, Flash & Sense Sub-Blocks)
    // =========================================================================
    () => {
      // MI57: Pin 17 UNREG High-Side P-ch MOSFET Load Switch & Reverse-Current Blocker
      addBatchedPiece(
        'mi-unreg-mosfet-load-switch',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(14.0, 12.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
      );
      addBatchedPiece(
        'mi-unreg-mosfet-load-switch',
        'copper_thermal',
        0xd97d4e,
        makeTransformedGeo(new THREE.BoxGeometry(10.8, 0.22, 4.8), 0, 0.46, 1.8),
        false
      );
      // Dual DFN-8 high-side MOSFETs + reverse-blocking Schottky diode
      addInst('ic_chips', 'mi-unreg-mosfet-load-switch', [-2.8, 0.92, 1.8], [0, 0, 0], [4.2, 0.85, 3.6], 0x1b1f26, [2.15, 0.48, 1.85]);
      addInst('ic_chips', 'mi-unreg-mosfet-load-switch', [2.8, 0.92, 1.8], [0, 0, 0], [4.2, 0.85, 3.6], 0x1b1f26, [2.15, 0.48, 1.85]);
      addInst('ic_chips', 'mi-unreg-mosfet-load-switch', [-3.4, 0.88, -3.0], [0, 0, 0], [3.4, 0.82, 2.2], 0x2c323e, [1.75, 0.45, 1.15]);
      for (let i = 0; i < 3; i++) {
        addInst('ceramic_caps', 'mi-unreg-mosfet-load-switch', [1.2 + i * 1.9, 0.78, -3.0], [0, 0, 0], [1.2, 0.72, 2.0], 0xb58857, [0.65, 0.4, 1.05]);
      }

      // MI58: Sony OEM 1-576-913-41 (F0005) 1.6A/36V Fast-Acting Chip Fuse & MLCC Decoupling
      addBatchedPiece(
        'mi-chip-fuse-16a-decouple',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(14.0, 12.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
      );
      // Hero white ceramic 1.6A/36V chip fuse body + silver terminations + gold center rating stripe
      addBatchedPiece(
        'mi-chip-fuse-16a-decouple',
        'ceramic_alumina',
        0xf3efe6,
        makeTransformedGeo(new THREE.BoxGeometry(6.8, 1.45, 2.8), -1.4, 1.05, 2.2)
      );
      for (const fx of [-4.45, 1.65]) {
        addInst('solder_fillets', 'mi-chip-fuse-16a-decouple', [fx, 1.05, 2.2], [0, 0, 0], [1.25, 1.52, 2.9], 0xe2e8f0, [0.68, 0.8, 1.5]);
      }
      addInst('front_pin_blades', 'mi-chip-fuse-16a-decouple', [-1.4, 1.82, 2.2], [0, 0, 0], [1.4, 0.14, 2.4], 0xea580c, [0.75, 0.1, 1.25]);
      // Ferrite π-filter bead + 4x 0805 MLCC surge decoupling capacitors
      addBatchedPiece(
        'mi-chip-fuse-16a-decouple',
        'iron_magnetic',
        0x3b404b,
        makeTransformedGeo(new THREE.BoxGeometry(2.8, 1.25, 2.6), 4.5, 0.98, 2.2)
      );
      for (let i = 0; i < 4; i++) {
        addInst('ceramic_caps', 'mi-chip-fuse-16a-decouple', [-4.5 + i * 3.0, 0.88, -2.6], [0, 0, 0], [1.9, 1.0, 2.5], 0xa97d4f, [1.0, 0.55, 1.3]);
        addInst('solder_fillets', 'mi-chip-fuse-16a-decouple', [-4.5 + i * 3.0, 0.82, -1.3], [0, 0, 0], [1.95, 0.88, 0.45], 0xd9e0e8, [1.0, 0.48, 0.25]);
        addInst('solder_fillets', 'mi-chip-fuse-16a-decouple', [-4.5 + i * 3.0, 0.82, -3.9], [0, 0, 0], [1.95, 0.88, 0.45], 0xd9e0e8, [1.0, 0.48, 0.25]);
      }

      // MI59: Pin 13 LOGIC_VDD Ultra-Low-Noise 3.15V LDO Regulator & Soft-Start Limiter
      addBatchedPiece(
        'mi-logic-vdd-315v-ldo',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(14.0, 12.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
      );
      addBatchedPiece(
        'mi-logic-vdd-315v-ldo',
        'copper_thermal',
        0xd97d4e,
        makeTransformedGeo(new THREE.BoxGeometry(6.4, 0.22, 6.2), -2.2, 0.46, 0.6),
        false
      );
      addInst('ic_chips', 'mi-logic-vdd-315v-ldo', [-2.2, 1.0, 0.6], [0, 0, 0], [4.6, 1.05, 4.4], 0x1c222d, [2.35, 0.55, 2.25]);
      // Output low-ESR filter cap bank + precision feedback resistors
      for (let i = 0; i < 3; i++) {
        addInst('ceramic_caps', 'mi-logic-vdd-315v-ldo', [3.8, 0.86, -3.0 + i * 3.0], [0, 0, 0], [2.8, 0.95, 1.7], 0x2563eb, [1.45, 0.52, 0.9]);
      }
      for (let i = 0; i < 2; i++) {
        addInst('smd_blocks', 'mi-logic-vdd-315v-ldo', [-3.6 + i * 2.8, 0.72, -3.6], [0, 0, 0], [1.8, 0.62, 1.1], 0x2a6ee0, [0.95, 0.35, 0.6]);
      }

      // MI60: 48kHz/24-bit 4ch Digital Audio (I2S/TDM) Low-Jitter PLL & Damping Array
      addBatchedPiece(
        'mi-digital-audio-pll-damping',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(14.0, 12.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
      );
      // Silver metal-can 12.288 MHz Audio Master Clock Crystal Oscillator
      addBatchedPiece(
        'mi-digital-audio-pll-damping',
        'emi_shield_metal',
        0xd6dde6,
        makeTransformedGeo(new THREE.BoxGeometry(4.8, 1.15, 3.6), -3.2, 0.95, 2.4)
      );
      // QFN Audio PLL & I2S/TDM Clock Buffer IC
      addInst('ic_chips', 'mi-digital-audio-pll-damping', [3.2, 0.92, 1.6], [0, 0, 0], [4.6, 0.9, 4.6], 0x1d232d, [2.35, 0.48, 2.35]);
      // 5x matched 22-ohm series damping resistors + RF ferrite beads along Pins 8..12
      for (let i = 0; i < 5; i++) {
        addInst('smd_blocks', 'mi-digital-audio-pll-damping', [-4.4 + i * 2.2, 0.74, -3.0], [0, 0, 0], [1.3, 0.65, 2.2], 0x0ea5e9, [0.7, 0.36, 1.15]);
        addInst('solder_fillets', 'mi-digital-audio-pll-damping', [-4.4 + i * 2.2, 0.72, -1.75], [0, 0, 0], [1.35, 0.6, 0.4], 0xd9e0e8, [0.72, 0.34, 0.24]);
      }

      // MI61: Analog Mic Plug-in-Power DC Bias & 1.0uF AC-Coupling / Differential Preamp Stage
      addBatchedPiece(
        'mi-analog-mic-bias-coupling',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(16.0, 10.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
      );
      // Twin precision 1.0 uF audio-grade AC-coupling capacitors (L & R channels)
      for (const cz of [-2.1, 2.1]) {
        addBatchedPiece(
          'mi-analog-mic-bias-coupling',
          'ceramic_alumina',
          0xe5c16b,
          makeTransformedGeo(new THREE.BoxGeometry(4.4, 1.35, 2.6), -4.2, 1.02, cz)
        );
        addInst('solder_fillets', 'mi-analog-mic-bias-coupling', [-6.45, 1.0, cz], [0, 0, 0], [0.6, 1.32, 2.65], 0xd9e0e8, [0.35, 0.7, 1.38]);
        addInst('solder_fillets', 'mi-analog-mic-bias-coupling', [-1.95, 1.0, cz], [0, 0, 0], [0.6, 1.32, 2.65], 0xd9e0e8, [0.35, 0.7, 1.38]);
      }
      // Low-noise differential microphone preamp IC + matched 2.2k bias resistor pair
      addInst('ic_chips', 'mi-analog-mic-bias-coupling', [2.6, 0.92, 0], [0, 0, 0], [4.8, 0.95, 4.8], 0x1d2028, [2.45, 0.52, 2.45]);
      for (const cz of [-2.4, 2.4]) {
        addInst('smd_blocks', 'mi-analog-mic-bias-coupling', [6.2, 0.74, cz], [0, 0, 0], [1.4, 0.65, 2.2], 0xe3a82b, [0.75, 0.36, 1.15]);
      }

      // MI62: Flash Bus (F1#/F2/F3) Bidirectional Level Shifter, PGND Sense Shunt & HV Clamp
      addBatchedPiece(
        'mi-flash-bus-level-shifter',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(16.0, 10.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
      );
      // 3-channel 1.8V <-> 3.15V bidirectional MOSFET level-shifter IC for F1#/F2/F3
      addInst('ic_chips', 'mi-flash-bus-level-shifter', [-3.6, 0.92, 0.2], [0, 0, 0], [5.2, 0.95, 4.8], 0x1f242d, [2.65, 0.52, 2.45]);
      // PGND Kelvin on-camera mount-detection current shunt bar (copper)
      addBatchedPiece(
        'mi-flash-bus-level-shifter',
        'copper_thermal',
        0xd97d4e,
        makeTransformedGeo(new THREE.BoxGeometry(4.8, 0.68, 2.2), 3.4, 0.72, 2.4)
      );
      // ISO 10330 250V high-voltage surge clamp Zener diode + series protection resistors
      addBatchedPiece(
        'mi-flash-bus-level-shifter',
        'silicon_hero',
        0xdc2626,
        makeTransformedGeo(new THREE.BoxGeometry(4.4, 1.1, 2.4), 3.4, 0.92, -2.2)
      );
      for (let i = 0; i < 3; i++) {
        addInst('solder_fillets', 'mi-flash-bus-level-shifter', [-5.4 + i * 1.8, 0.72, -3.5], [0, 0, 0], [1.1, 0.6, 1.6], 0xd9e0e8, [0.6, 0.34, 0.85]);
      }
    },
  ];
}
