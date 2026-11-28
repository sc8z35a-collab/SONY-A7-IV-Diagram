//@FLOW_MAP|file=src/assemblies/mishoe/miShoeUltraParts.ts|unit=mishoe|lines=335|exports=MISHOE_ULTRA_HERO_EDGE_PARTS,createMiShoeUltraBuildChunks
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createFrameShape, createRoundedRectShape } from '../../engine/CadHelpers';
import type { MiShoeExtraBuildContext } from './miShoeExtraBuilders';

function mergeAndDispose(pieces: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(pieces, false)!;
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].dispose();
  }
  return merged;
}

/**
 * Hero edge subset among the 9 ultra-precision showcase parts (MI63–MI71).
 */
export const MISHOE_ULTRA_HERO_EDGE_PARTS: readonly string[] = [
  'mi-mic-elastomer-shock-isolator',
  'mi-zif-dual-beam-cam-latch',
  'mi-sy1122-audio-emi-shield-can',
];

/**
 * Time-sliced V2 ultra-high-detail geometry builders for MI63–MI71 (+9 precision parts).
 * Strictly zero direct material allocations — 100% ResourceCache buckets via InstancedMesh & BatchedMesh.
 */
export function createMiShoeUltraBuildChunks(ctx: MiShoeExtraBuildContext): Array<() => void> {
  const {
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
    // Ultra Chunk 1: MI63 (Mic Shock Isolator), MI64 (3-Point Lateral Stabilizers),
    //                MI65 (21-Pin First-Mate / Last-Break Staggered Contact Array)
    // =========================================================================
    () => {
      // MI63: ECM-B1M / ECM-M1 Floating Elastomer Shock-Absorber Suspension Collar
      const steelCollarPieces = [
        makeHorizPlateGeo(createFrameShape(27.6, 22.8, 2.4, 17.8, 13.4, 1.8), 0.58, cs, 0.04, 0, -0.78, 0),
        makeHorizPlateGeo(createFrameShape(25.2, 20.6, 2.2, 16.0, 11.8, 1.6), 0.62, cs, 0.04, 0, 0.88, 0),
        // Central flexible micro-bridge tunnel housing
        makeHorizPlateGeo(createRoundedRectShape(11.6, 8.2, 1.2), 0.42, cs, 0.02, 0, 0.05, 0),
      ];
      addBatchedPiece('mi-mic-elastomer-shock-isolator', 'stainless_machined', 0xcad2dc, mergeAndDispose(steelCollarPieces));

      // 8 radially splayed angled visco-elastic elastomer suspension bridges (spider shock mount!)
      const rubberLegs: THREE.BufferGeometry[] = [];
      const legAnchors: Array<[number, number, number, number]> = [
        [-10.2, -7.8, 0.48, 0.35],
        [10.2, -7.8, -0.48, 0.35],
        [-10.2, 7.8, 0.48, -0.35],
        [10.2, 7.8, -0.48, -0.35],
        [-11.4, 0, 0.58, 0],
        [11.4, 0, -0.58, 0],
        [0, -9.2, 0, 0.54],
        [0, 9.2, 0, -0.54],
      ];
      for (const [lx, lz, rz, rx] of legAnchors) {
        rubberLegs.push(makeTransformedGeo(new THREE.BoxGeometry(2.15, 2.05, 2.15), lx, 0.05, lz, rx, 0, rz));
      }
      rubberLegs.push(makeHorizPlateGeo(createFrameShape(23.6, 19.0, 2.0, 18.8, 14.4, 1.5), 0.48, cs, 0.04, 0, 0.05, 0));
      addBatchedPiece('mi-mic-elastomer-shock-isolator', 'elastomer_rubber', 0x262a32, mergeAndDispose(rubberLegs));

      // 4 machined over-travel limiter pins + high-damping orange silicone bumper rings
      for (const [bx, bz] of [
        [-9.2, -6.8],
        [9.2, -6.8],
        [-9.2, 6.8],
        [9.2, 6.8],
      ] as Array<[number, number]>) {
        addInst('cyl_bosses', 'mi-mic-elastomer-shock-isolator', [bx, 0.05, bz], [0, 0, 0], [0.78, 2.25, 0.78], 0xd4a948, [0.85, 1.15, 0.85]);
        addInst('torus_seals', 'mi-mic-elastomer-shock-isolator', [bx, 0.05, bz], [0, 0, 0], [1.45, 1.1, 1.45], 0xe05a33, [1.85, 0.45, 1.85]);
      }

      // MI64: Front-Lateral 2-Point Stabilizer Guide Bushings & Anti-Pitch Datum Pads
      const socketPieces: THREE.BufferGeometry[] = [];
      for (const sx of [-15.2, 15.2]) {
        socketPieces.push(makeTransformedGeo(new THREE.CylinderGeometry(2.45, 2.65, 1.35, rs), sx, -0.1, 0));
        socketPieces.push(makeTransformedGeo(new THREE.BoxGeometry(4.4, 0.55, 6.4), sx, -0.68, 0));
      }
      // Precision kinematic alignment tie strip connecting left & right lateral stabilizer seats
      socketPieces.push(makeTransformedGeo(new THREE.BoxGeometry(28.0, 0.36, 1.9), 0, -0.78, 0));
      addBatchedPiece('mi-lateral-stabilizer-lugs', 'stainless_machined', 0xcfd6df, mergeAndDispose(socketPieces));

      // Twin titanium-grade floating stabilizer dowel pins + beveled entry rings & retention circlips
      const dowelPieces = [
        makeTransformedGeo(new THREE.CylinderGeometry(1.38, 1.25, 2.4, rs), -15.2, 0.65, 0),
        makeTransformedGeo(new THREE.CylinderGeometry(1.38, 1.25, 2.4, rs), 15.2, 0.65, 0),
      ];
      addBatchedPiece('mi-lateral-stabilizer-lugs', 'titanium_machined', 0x9aa4b2, mergeAndDispose(dowelPieces));
      const datumPads = [
        makeTransformedGeo(new THREE.BoxGeometry(3.2, 0.48, 4.8), -10.8, -0.32, 0),
        makeTransformedGeo(new THREE.BoxGeometry(3.2, 0.48, 4.8), 10.8, -0.32, 0),
      ];
      addBatchedPiece('mi-lateral-stabilizer-lugs', 'brass_precision', 0xd6ae4a, mergeAndDispose(datumPads));
      for (const sx of [-15.2, 15.2]) {
        addInst('torus_seals', 'mi-lateral-stabilizer-lugs', [sx, 0.62, 0], [0, 0, 0], [2.15, 0.72, 2.15], 0xd8dee6, [2.5, 0.35, 2.5]);
        addInst('torus_seals', 'mi-lateral-stabilizer-lugs', [sx, 1.48, 0], [0, 0, 0], [1.45, 0.55, 1.45], 0x38bdf8, [1.75, 0.25, 1.75]);
      }

      // MI65: 21-Pin First-Mate / Last-Break (FMLB) 3-Tier Staggered Hot-Plug Contact Array
      // Dielectric precision reference step gauge bar showing the 3 sequential mating planes
      addBatchedPiece(
        'mi-21pin-fmlb-stagger-array',
        'ceramic_alumina',
        0xebe7dd,
        makeTransformedGeo(new THREE.BoxGeometry(37.4, 0.34, 1.05), 0, -0.32, 0.85)
      );
      const gndFirstMate = new Set([4, 7, 15, 21]);
      const pwrSecondMate = new Set([13, 17]);
      for (let i = 1; i <= 21; i++) {
        const px = pinX(i);
        const isGnd = gndFirstMate.has(i);
        const isPwr = pwrSecondMate.has(i);
        // Tier 1 (Ground): longest forward lead (-0.85), Tier 2 (Power): mid (-0.35), Tier 3 (Signal): recessed (+0.18)
        const zCenter = isGnd ? -0.82 : isPwr ? -0.34 : 0.16;
        const bladeLen = isGnd ? 3.25 : isPwr ? 2.3 : 1.35;
        const bladeW = isPwr || i === 21 ? 1.04 : 0.76;
        const tipColor = isGnd ? 0x10b981 : isPwr ? 0xf97316 : 0x38bdf8;
        // Gold staggered contact blade
        addInst('front_pin_blades', 'mi-21pin-fmlb-stagger-array', [px, 0.08, zCenter], [0, 0, 0], [bladeW, 0.32, bladeLen], 0xeec048, [bladeW * 0.55, 0.2, bladeLen * 0.55]);
        // Color-coded mating-tier indicator crown at leading edge
        addInst('front_pin_badges', 'mi-21pin-fmlb-stagger-array', [px, 0.26, zCenter - bladeLen * 0.42], [0, 0, 0], [bladeW * 0.95, 0.22, 0.55], tipColor, [bladeW * 0.52, 0.16, 0.32]);
        // Chamfered lead-in silver-gold nose tip
        addInst('cantilever_tips', 'mi-21pin-fmlb-stagger-array', [px, 0.06, zCenter - bladeLen * 0.52], [0, 0, 0], [0.85, 0.65, 0.75], 0xf5d061, [0.35, 0.25, 0.35]);
      }
    },

    // =========================================================================
    // Ultra Chunk 2: MI66 (RA-Copper & 45° Cross-Hatched GND Mesh),
    //                MI67 (Top WP Cushion F3 & Drainage Weirs),
    //                MI68 (VF Radiation Graphite Sheet 457578001)
    // =========================================================================
    () => {
      // MI66: MIS-2006 Rolled-Annealed (RA) Copper Differential Stackup & 45° Cross-Hatched GND Mesh
      // Adhesiveless 25um polyimide core dielectric film
      addBatchedPiece(
        'mi-fpc-ra-copper-hatched-gnd',
        'polyimide_fpc',
        0xd97b29,
        makeTransformedGeo(new THREE.BoxGeometry(15.6, 8.8, 0.18), 0, 0, 0)
      );
      // 45° Cross-Hatched RA Copper Ground Plane Lattice (10 +45° & 10 -45° diagonal copper ribs!)
      const hatchBars: THREE.BufferGeometry[] = [];
      for (let i = -4; i <= 4; i++) {
        const yOff = i * 0.88;
        hatchBars.push(makeTransformedGeo(new THREE.BoxGeometry(8.6, 0.24, 0.14), -2.4, yOff, 0.18, 0, 0, Math.PI * 0.25));
        hatchBars.push(makeTransformedGeo(new THREE.BoxGeometry(8.6, 0.24, 0.14), 2.4, yOff, 0.18, 0, 0, -Math.PI * 0.25));
      }
      // Perimeter copper shield bus rails
      hatchBars.push(makeTransformedGeo(new THREE.BoxGeometry(0.65, 8.8, 0.22), -7.45, 0, 0.16));
      hatchBars.push(makeTransformedGeo(new THREE.BoxGeometry(0.65, 8.8, 0.22), 7.45, 0, 0.16));
      addBatchedPiece('mi-fpc-ra-copper-hatched-gnd', 'copper_thermal', 0xd97d4e, mergeAndDispose(hatchBars));

      // Back-side 8 matched 90-ohm differential / 50-ohm I2S RA-copper signal microstrips + ground stitch vias
      for (let i = 0; i < 8; i++) {
        const tx = -5.6 + i * 1.6;
        addInst('front_pin_blades', 'mi-fpc-ra-copper-hatched-gnd', [tx, 0, -0.18], [0, 0, 0], [0.36, 8.4, 0.14], 0xe2b648, [0.22, 4.25, 0.1]);
      }
      for (const sx of [-7.45, 7.45]) {
        for (let k = -3; k <= 3; k++) {
          addInst('cyl_bosses', 'mi-fpc-ra-copper-hatched-gnd', [sx, k * 1.2, 0.02], [Math.PI * 0.5, 0, 0], [0.24, 0.44, 0.24], 0xe2b648, [0.28, 0.28, 0.25]);
        }
      }

      // MI67: Sony OEM Ref.269 501030701 TOP WP CUSHION F3 & Perimeter Drainage Weirs
      addBatchedPiece(
        'mi-top-wp-cushion-f3-drain',
        'foam_felt_matte',
        0x2d323b,
        makeHorizPlateGeo(createFrameShape(62.8, 55.2, 5.2, 56.2, 48.6, 3.8), 0.92, cs, 0.08, 0, 0, 0)
      );
      // Red/terracotta molded compression-limiter waterproof ridge along inner perimeter
      addBatchedPiece(
        'mi-top-wp-cushion-f3-drain',
        'elastomer_rubber',
        0xc44536,
        makeHorizPlateGeo(createFrameShape(57.8, 50.2, 4.1, 55.8, 48.2, 3.6), 0.52, cs, 0.04, 0, 0.55, 0)
      );
      // 6 sculpted magnesium drainage-moat diversion weir baffles + 4 adhesive alignment tabs
      const weirPieces: THREE.BufferGeometry[] = [];
      for (const [wx, wz, ry] of [
        [-29.5, -14.0, 0.28],
        [29.5, -14.0, -0.28],
        [-29.5, 14.0, -0.28],
        [29.5, 14.0, 0.28],
        [-14.0, -25.8, 0.12],
        [14.0, -25.8, -0.12],
      ] as Array<[number, number, number]>) {
        weirPieces.push(makeTransformedGeo(new THREE.BoxGeometry(3.4, 0.85, 1.35), wx, 0.32, wz, 0, ry, 0));
      }
      addBatchedPiece('mi-top-wp-cushion-f3-drain', 'magnesium_cast', 0x6b7482, mergeAndDispose(weirPieces));
      for (const [tx, tz] of [
        [-28.8, -24.5],
        [28.8, -24.5],
        [-28.8, 24.5],
        [28.8, 24.5],
      ] as Array<[number, number]>) {
        addInst('front_pin_badges', 'mi-top-wp-cushion-f3-drain', [tx, -0.48, tz], [0, 0, 0], [3.6, 0.18, 2.2], 0xd97b29, [1.85, 0.14, 1.15]);
      }

      // MI68: Sony OEM Ref.203 457578001 VF SHEET, RADIATION (795) Graphite Thermal Spreader
      const graphitePieces = [
        makeHorizPlateGeo(createRoundedRectShape(40.8, 10.6, 1.6), 0.36, cs, 0.03, 0, 0.05, 0),
        // Twin stepped thermal conduction wings coupling to magnesium top-deck walls
        makeTransformedGeo(new THREE.BoxGeometry(5.6, 0.32, 6.4), -22.2, 0.45, 0.4, 0, 0, -0.16),
        makeTransformedGeo(new THREE.BoxGeometry(5.6, 0.32, 6.4), 22.2, 0.45, 0.4, 0, 0, 0.16),
      ];
      addBatchedPiece('mi-vf-radiation-graphite-sheet', 'carbon_fiber', 0x2a2f38, mergeAndDispose(graphitePieces));
      // Sony OEM 4-575-780-01 signature blue dielectric PET border laminate + rear pink/coral seal strip
      addBatchedPiece(
        'mi-vf-radiation-graphite-sheet',
        'pin_carrier_gloss',
        0x2563eb,
        makeHorizPlateGeo(createFrameShape(42.6, 12.2, 1.8, 38.6, 8.6, 1.2), 0.18, cs, 0.02, 0, 0.24, 0),
        false
      );
      addBatchedPiece(
        'mi-vf-radiation-graphite-sheet',
        'pin_carrier_gloss',
        0xec4899,
        makeTransformedGeo(new THREE.BoxGeometry(36.0, 0.2, 1.35), 0, 0.26, -5.2),
        false
      );
      // 6 copper thermal-interface contact embossments
      for (let i = 0; i < 6; i++) {
        addInst('cyl_bosses', 'mi-vf-radiation-graphite-sheet', [-15.0 + i * 6.0, 0.28, 0.6], [0, 0, 0], [1.45, 0.26, 1.45], 0xd97d4e, [1.5, 0.18, 1.5]);
      }
    },

    // =========================================================================
    // Ultra Chunk 3: MI69 (24-Pin Back-Flip ZIF Internal Cam & Dual-Beam Contacts),
    //                MI70 (ID RC-Debounce & LCD_DATEN GVIF FET Switch Matrix),
    //                MI71 (SY-1122 Two-Piece Audio/SPI EMI Shield Can & Gaskets)
    // =========================================================================
    () => {
      // MI69: 24-Pin 0.4mm Back-Flip ZIF Internal Cam Actuator Shaft & Dual-Beam Contact Array
      // Exposed precision cutaway frame + rotating rear cam-lock actuator bar (angled at 32° for mechanical clarity!)
      const camActuatorPieces = [
        makeTransformedGeo(new THREE.BoxGeometry(18.6, 0.72, 3.2), 0, 0.92, 0.65, -0.56, 0, 0),
        // Finger-lift grip rib along top edge of back-flip lever
        makeTransformedGeo(new THREE.BoxGeometry(17.8, 0.35, 0.65), 0, 1.72, 1.85, -0.56, 0, 0),
        // Cam lobe bar pressing down on the 24 upper spring beams
        makeTransformedGeo(new THREE.CylinderGeometry(0.46, 0.46, 17.6, rs), 0, 0.28, -0.45, 0, 0, Math.PI * 0.5),
      ];
      addBatchedPiece('mi-zif-dual-beam-cam-latch', 'matte_black_anodized', 0x1e232c, mergeAndDispose(camActuatorPieces));

      // Stainless hinge pivot trunnion shaft + twin metal end retention brackets
      const trunnionPieces = [
        makeTransformedGeo(new THREE.CylinderGeometry(0.32, 0.32, 20.6, rs), 0, 0.28, -0.45, 0, 0, Math.PI * 0.5),
        makeTransformedGeo(new THREE.BoxGeometry(1.15, 1.45, 3.8), -9.95, 0.05, 0),
        makeTransformedGeo(new THREE.BoxGeometry(1.15, 1.45, 3.8), 9.95, 0.05, 0),
      ];
      addBatchedPiece('mi-zif-dual-beam-cam-latch', 'emi_shield_metal', 0xc9d2dd, mergeAndDispose(trunnionPieces));

      // Twin heavy brass SMT hold-down anchor ears
      const brassEars = [
        makeTransformedGeo(new THREE.BoxGeometry(1.85, 0.68, 3.2), -10.85, -0.45, 0.1),
        makeTransformedGeo(new THREE.BoxGeometry(1.85, 0.68, 3.2), 10.85, -0.45, 0.1),
      ];
      addBatchedPiece('mi-zif-dual-beam-cam-latch', 'brass_precision', 0xd6ae4a, mergeAndDispose(brassEars));

      // 24 interleaved upper cam-follower springs (BeCu) + 24 lower gold dual-beam wiping contacts!
      for (let i = 0; i < 24; i++) {
        const cx = -8.05 + i * 0.7;
        addInst('cantilever_beams', 'mi-zif-dual-beam-cam-latch', [cx, 0.22, -1.05], [0.16, 0, 0], [0.42, 0.72, 0.68], 0xd89143, [0.18, 0.22, 1.55]);
        addInst('zif_leads', 'mi-zif-dual-beam-cam-latch', [cx, -0.32, -1.35], [0, 0, 0], [0.85, 0.78, 1.95], 0xe2b648, [0.18, 0.22, 1.3]);
      }

      // MI70: ID1-ID3 RC Anti-Debounce Filter Network & LCD_DATEN GVIF/Audio FET Switch Matrix
      addBatchedPiece(
        'mi-id-rc-debounce-gvif-mux',
        'pcb_textured',
        0xffffff,
        makeHorizPlateGeo(createRoundedRectShape(14.0, 10.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
      );
      // Twin QFN-16 ultra-low-capacitance (< 5pF) USB2.0/GVIF SPDT FET switch ICs (LCD_DATEN & EXT_LINE_SEL)
      addInst('ic_chips', 'mi-id-rc-debounce-gvif-mux', [-3.4, 0.92, 1.6], [0, 0, 0], [4.2, 0.85, 4.2], 0x1b2029, [2.15, 0.48, 2.15]);
      addInst('ic_chips', 'mi-id-rc-debounce-gvif-mux', [3.2, 0.92, 1.6], [0, 0, 0], [4.2, 0.85, 4.2], 0x1b2029, [2.15, 0.48, 2.15]);
      // 3-channel precision 1% 100k pull-up + 10nF C0G RC anti-debounce filter + Schottky clamp trios
      for (let i = 0; i < 3; i++) {
        const rx = -4.2 + i * 2.8;
        addInst('smd_blocks', 'mi-id-rc-debounce-gvif-mux', [rx, 0.72, -2.5], [0, 0, 0], [1.65, 0.62, 1.05], 0x2563eb, [0.88, 0.35, 0.58]);
        addInst('ceramic_caps', 'mi-id-rc-debounce-gvif-mux', [rx, 0.74, -3.75], [0, 0, 0], [1.65, 0.68, 1.05], 0xd9a857, [0.88, 0.38, 0.58]);
      }
      // Matched 90-ohm GVIF_SDATA_P/N differential microstrip pair traces
      for (const gz of [-0.95, -1.55]) {
        addInst('front_pin_blades', 'mi-id-rc-debounce-gvif-mux', [4.2, 0.46, gz], [0, 0, 0], [4.6, 0.14, 0.34], 0xe2b648, [2.35, 0.1, 0.2]);
      }

      // MI71: SY-1122 Mainboard MI-Audio & SPI Two-Piece EMI Shield Can & Conductive Gaskets
      // Lower SMT nickel-silver RF fence frame + internal analog/digital bay partition wall
      const fencePieces = [
        makeHorizPlateGeo(createFrameShape(14.2, 10.2, 1.0, 12.6, 8.6, 0.6), 1.45, cs, 0.04, 0, 0.35, 0),
        makeTransformedGeo(new THREE.BoxGeometry(0.45, 1.4, 8.6), -0.4, 0.35, 0),
      ];
      addBatchedPiece('mi-sy1122-audio-emi-shield-can', 'emi_shield_metal', 0xc2cbd7, mergeAndDispose(fencePieces));
      // Removable snap-on RF lid roof with recessed perimeter lip
      const lidPieces = [
        makeHorizPlateGeo(createRoundedRectShape(14.6, 10.6, 1.1), 0.36, cs, 0.03, 0, 1.25, 0),
        makeHorizPlateGeo(createFrameShape(14.8, 10.8, 1.2, 13.8, 9.8, 0.8), 0.58, cs, 0.03, 0, 1.02, 0),
      ];
      addBatchedPiece('mi-sy1122-audio-emi-shield-can', 'stainless_machined', 0xd5dce6, mergeAndDispose(lidPieces));
      // 14 perimeter SMT solder castellation pads around base fence (Instanced!)
      for (let i = 0; i < 5; i++) {
        const sx = -5.2 + i * 2.6;
        addInst('solder_fillets', 'mi-sy1122-audio-emi-shield-can', [sx, -0.34, -5.2], [0, 0, 0], [1.45, 0.42, 0.55], 0xe2e8f0, [0.78, 0.25, 0.32]);
        addInst('solder_fillets', 'mi-sy1122-audio-emi-shield-can', [sx, -0.34, 5.2], [0, 0, 0], [1.45, 0.42, 0.55], 0xe2e8f0, [0.78, 0.25, 0.32]);
      }
      for (const sz of [-2.4, 2.4]) {
        addInst('solder_fillets', 'mi-sy1122-audio-emi-shield-can', [-7.2, -0.34, sz], [0, 0, 0], [0.55, 0.42, 1.8], 0xe2e8f0, [0.32, 0.25, 0.95]);
        addInst('solder_fillets', 'mi-sy1122-audio-emi-shield-can', [7.2, -0.34, sz], [0, 0, 0], [0.55, 0.42, 1.8], 0xe2e8f0, [0.32, 0.25, 0.95]);
      }
      // 6 precision inspection/thermal micro-dimples + twin conductive fabric-over-foam chassis grounding pads
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 3; c++) {
          addInst('cyl_bosses', 'mi-sy1122-audio-emi-shield-can', [-4.2 + c * 4.2, 1.46, -2.0 + r * 4.0], [0, 0, 0], [0.68, 0.16, 0.68], 0x3b4250, [0.72, 0.12, 0.72]);
        }
      }
      const gasketPads = [
        makeTransformedGeo(new THREE.BoxGeometry(2.6, 0.68, 7.6), -5.0, 1.75, 0),
        makeTransformedGeo(new THREE.BoxGeometry(2.6, 0.68, 7.6), 5.0, 1.75, 0),
      ];
      addBatchedPiece('mi-sy1122-audio-emi-shield-can', 'foam_felt_matte', 0x7b8594, mergeAndDispose(gasketPads));
    },
  ];
}
