//@FLOW_MAP|file=src/assemblies/lens/lensSectionMap.ts|unit=lens|lines=196|exports=LensSectionMeta,LENS_SECTION_META,LENS_SECTION_BY_ID,getLensSectionForPart
import { LensSection } from '../types';

export interface LensSectionMeta {
  section: LensSection;
  shortTag: string;
  japaneseName: string;
  englishName: string;
  zRangeLabel: string;
}

export const LENS_SECTION_META: Record<LensSection, LensSectionMeta> = {
  1: {
    section: 1,
    shortTag: 'レンズ後部 [1/3]',
    japaneseName: '1/3 後部ユニット（マウント・後玉群・メイン基板・絞りリング）',
    englishName: 'Section 1/3 — Rear Bayonet, Rear XA Group, Main PCB & Aperture Ring',
    zRangeLabel: 'z = 30.8 – 60.5 mm',
  },
  2: {
    section: 2,
    shortTag: 'レンズ中央部 [2/3]',
    japaneseName: '2/3 中央ユニット（11枚絞り・4基XDリニアAF・MR磁気スケール）',
    englishName: 'Section 2/3 — 11-Blade Iris, Quad XD Linear AF & Floating Core',
    zRangeLabel: 'z = 60.5 – 89.5 mm',
  },
  3: {
    section: 3,
    shortTag: 'レンズ前部 [3/3]',
    japaneseName: '3/3 前部ユニット（大口径XA/ED前玉・ナノAR II・MFリング・フード）',
    englishName: 'Section 3/3 — Front XA/ED Optics, Nano AR II, MF Ring & ALC-SH163 Hood',
    zRangeLabel: 'z = 89.5 – 133.0 mm',
  },
};

/**
 * Canonical 3-section assignment for ALL 128 parts of the 50mm F1.2 GM Prime Lens (L01–L128):
 * - Section 1 (Rear / 最後部 — Default when entering standalone lens mode): 42 parts (26 macro + 16 standaloneOnly)
 * - Section 2 (Middle / 中央部): 48 parts (29 macro + 19 standaloneOnly)
 * - Section 3 (Front / 最前部): 38 parts (19 macro + 19 standaloneOnly)
 * Total = 128 lens parts (74 macro shown together in integrated whole-camera mode + 54 standaloneOnly).
 */
export const LENS_SECTION_BY_ID: Record<string, LensSection> = {
  // =========================================================================
  // SECTION 1 (1/3 後部・最後部 — Mount, Rear Optics, PCB, Aperture Ring)
  // =========================================================================
  // Macro parts (26)
  'lens-inner-chassis': 1,        // L33
  'lens-focus-b-front': 1,        // L34
  'lens-focus-group-b': 1,        // L35
  'lens-focus-b-eccentric': 1,    // L36
  'lens-g7-flattener': 1,         // L37
  'lens-rear-convex': 1,          // L38
  'lens-rear-telecentric': 1,     // L39
  'lens-rear-element': 1,         // L40
  'lens-rear-cell-spacer': 1,     // L41
  'lens-rear-baffle': 1,          // L42
  'lens-aperture-ring': 1,        // L46
  'lens-aperture-bearings': 1,    // L47
  'lens-aperture-sensor': 1,      // L48
  'lens-click-detent': 1,         // L49
  'lens-thermistor': 1,           // L52
  'lens-mcu-pcb': 1,              // L53
  'lens-emi-shield-can': 1,       // L54
  'lens-fpc-harness': 1,          // L55
  'lens-mount-shim-plate': 1,     // L59
  'lens-bayonet-shims': 1,        // L60
  'lens-contact-block': 1,        // L61
  'lens-rear-bayonet': 1,         // L62
  'lens-iris-lock-switch': 1,     // L68
  'lens-reinforcing-plates': 1,   // L69
  'lens-mount-seal-bolts': 1,     // L70
  'lens-rear-lighttrap-tube': 1,  // L74
  // Phase 18 standaloneOnly micro (6)
  'lens-aberration-lut-eeprom': 1,  // L89
  'lens-mcu-emi-absorber': 1,       // L90
  'lens-contact-esd-tvs': 1,        // L91
  'lens-barrel-breather-vent': 1,   // L93
  'lens-aperture-f12-lock-pin': 1,  // L94
  'lens-rear-filter-holder-tabs': 1,// L96
  // Phase 19 standaloneOnly micro (10: L99–L108)
  'lens-cl1082-mount-flex': 1,      // L99
  'lens-pcb-thermal-putty': 1,      // L100
  'lens-bayonet-ground-leads': 1,   // L101
  'lens-rear-inner-foam-seal': 1,   // L102
  'lens-iris-click-wedge-lever': 1, // L103
  'lens-aperture-wiper-brush': 1,   // L104
  'lens-rear-outer-gm-badge': 1,    // L105
  'lens-g5-rear-eccentric-boss': 1, // L106
  'lens-rear-baffle-3screws': 1,    // L107
  'lens-pcb-jtag-test-pads': 1,     // L108

  // =========================================================================
  // SECTION 2 (2/3 中央部 — 11-Blade Iris, Quad XD Linear AF, Floating Core)
  // =========================================================================
  // Macro parts (29)
  'lens-g4-negative': 2,            // L12
  'lens-intergroup-baffle': 2,      // L13
  'lens-iris-cover': 2,             // L14
  'lens-iris-cam-ring': 2,          // L15
  'lens-aperture-11': 2,            // L16
  'lens-iris-base-plate': 2,        // L17
  'lens-iris-stepper': 2,           // L18
  'lens-iris-home-sensor': 2,       // L19
  'lens-focus-a-front': 2,          // L20
  'lens-focus-group-a': 2,          // L21
  'lens-focus-a-rear': 2,           // L22
  'lens-focus-a-eccentric': 2,      // L23
  'lens-xd-stators': 2,             // L24
  'lens-xd-flux-shields': 2,        // L25
  'lens-xd-motors': 2,              // L26
  'lens-xd-dampers': 2,             // L27
  'lens-guide-shafts': 2,           // L28
  'lens-antirot-rails': 2,          // L29
  'lens-mr-encoders': 2,            // L30
  'lens-af-origin-sensors': 2,      // L31
  'lens-inner-chassis-front': 2,    // L32
  'lens-switch-pcb': 2,             // L50
  'lens-top-hold-pod': 2,           // L51
  'lens-weather-seals': 2,          // L56
  'lens-cutaway-barrel': 2,         // L58
  'lens-iris-iso-fpc': 2,           // L65
  'lens-mr-magnet-scales': 2,       // L66
  'lens-center-join-ring': 2,       // L71
  'lens-xd-coil-clamps': 2,         // L72
  // Phase 18 standaloneOnly micro (9)
  'lens-uv-potting-wells': 2,       // L79
  'lens-phase-align-marks': 2,      // L80
  'lens-iris-blade-pins-ptfe': 2,   // L83
  'lens-xd-sintered-bushings': 2,   // L84
  'lens-xd-magnetic-park-brake': 2, // L85
  'lens-focus-front-lightfoil': 2,  // L86
  'lens-mr-gap-calib-shims': 2,     // L87
  'lens-inner-thread-baffles': 2,   // L88
  'lens-xd-lorentz-backiron': 2,    // L95
  // Phase 19 standaloneOnly micro (10: L109–L118)
  'lens-mid-block-core-frame': 2,   // L109
  'lens-iris-partition-bumpers': 2, // L110
  'lens-floating-cog-weights': 2,   // L111
  'lens-iris-pinion-hairspring': 2, // L112
  'lens-barrel-sub-pcb-cover': 2,   // L113
  'lens-xd-rollflex-loop': 2,       // L114
  'lens-xd-antitwist-peg': 2,       // L115
  'lens-hold-btn-wp-boots': 2,      // L116
  'lens-afmf-switch-wiper': 2,      // L117
  'lens-split-barrel-dowels': 2,    // L118

  // =========================================================================
  // SECTION 3 (3/3 前部・最前部 — Front XA/ED Glass, Nano AR II, MF Ring, Hood)
  // =========================================================================
  // Macro parts (19)
  'lens-front-hood': 3,             // L01
  'lens-hood-lock-bumper': 3,       // L02
  'lens-filter-ring': 3,            // L03
  'lens-front-gasket': 3,           // L04
  'lens-front-tilt-shims': 3,       // L05
  'lens-front-eccentric': 3,        // L06
  'lens-front-cell-mount': 3,       // L07
  'lens-front-xa': 3,               // L08
  'lens-front-meniscus': 3,         // L09
  'lens-ed-group': 3,               // L10
  'lens-flint-cemented': 3,         // L11
  'lens-control-rings': 3,          // L43
  'lens-mf-tensioners': 3,          // L44
  'lens-mf-encoder': 3,             // L45
  'lens-front-outer-barrel': 3,     // L57
  'lens-retaining-rings': 3,        // L63
  'lens-optical-spacers': 3,        // L64
  'lens-focus-bearing-bands': 3,    // L67
  'lens-clutch-ball-rollers': 3,    // L73
  // Phase 18 standaloneOnly micro (9)
  'lens-fluorine-topcoat': 3,       // L75
  'lens-nano-ar-ii-layer': 3,       // L76
  'lens-edge-sumi-blackening': 3,   // L77
  'lens-uv-cement-bond': 3,         // L78
  'lens-filter-bayonet-slots': 3,   // L81
  'lens-mf-fluorogrease-film': 3,   // L82
  'lens-xa-aspheric-profile': 3,    // L92
  'lens-hood-velvet-lining': 3,     // L97
  'lens-front-rear-caps': 3,        // L98
  // Phase 19 standaloneOnly micro (10: L119–L128)
  'lens-front-makeup-violet-seal': 3, // L119
  'lens-mf-pom-slider-pads': 3,       // L120
  'lens-mf-internal-ring-gear': 3,    // L121
  'lens-front-window-tilt-shims': 3,  // L122
  'lens-filter-assy-thick-gasket': 3, // L123
  'lens-g2-xa-sealant-screws': 3,     // L124
  'lens-front-spanner-orings': 3,     // L125
  'lens-cold-rubber-grip-tape': 3,    // L126
  'lens-hood-release-lock-pin': 3,    // L127
  'lens-hood-tpe-bumper-dot': 3,      // L128
};

export function getLensSectionForPart(id: string): LensSection {
  return LENS_SECTION_BY_ID[id] ?? 2;
}
