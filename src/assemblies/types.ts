//@FLOW_MAP|file=src/assemblies/types.ts|kind=CORE_TYPES|diagram_union=diagram_types.gen.ts
import * as THREE from 'three';
import type { DiagramType } from './diagram_types.gen';
export type { DiagramType } from './diagram_types.gen';

export type ScaleMode =
  | 'welcome'
  | 'integrated'
  | 'camera_body'
  | 'lens'
  | 'mount'
  | 'shutter'
  | 'sensor'
  | 'mainboard'
  | 'evf'
  | 'lcd'
  | 'body'
  | 'micro'
  | 'micro_v2'
  | 'battery'
  | 'cfexpress'
  | 'bionz'
  | 'bionz_v2'
  | 'mishoe'
  | 'mic'
  | 'sensor_fab'
  | 'drybox'
  | 'mirai_2028'
  | 'original';
export type MiraiStructureId = 'fh01' | 'fh02' | 'fh08' | 'fh32' | 'fh25' | 'fh20' | 'fh17' | 'fh48';
export type SensorFabVolume = 0 | 1 | 2 | 3 | 4 | 5;
export type SensorFabStage =
  | 'overview'
  | 'phases'
  | 'litho'
  | 'variants'
  | 'v1_overview'
  | 'v1_photonics'
  | 'v1_archs'
  | 'v1_duel'
  | 'v1_wall'
  | 'v2_overview'
  | 'v2_refine'
  | 'v2_mcz'
  | 'v2_wafer'
  | 'v2_epi_ship'
  | 'v3_overview'
  | 'v3_tcad'
  | 'v3_layout'
  | 'v3_opc'
  | 'v3_maskfab'
  | 'v4_overview'
  | 'v4_sti_dti'
  | 'v4_ppd_mev'
  | 'v4_vtg_gate'
  | 'v4_pin_sab'
  | 'v5_overview'
  | 'v5_w_m1'
  | 'v5_m2_m4'
  | 'v5_m5_wat'
  | 'v5_hb_cmp';
export type RenderMode = 'solid' | 'xray' | 'cad';
export type GraphicsQuality = 'standard_lite' | 'standard' | 'high' | 'ultra';
export type SectionAxis = 'off' | 'x' | 'y';
export type CameraPreset = 'iso' | 'front' | 'side' | 'back';
export type ExtendedCameraPreset =
  | CameraPreset
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'iso_back'
  | 'iso_top'
  | 'iso_low'
  | 'hero_macro';
export type LensSection = 1 | 2 | 3;

export interface ExplanationSpec {
  label: string;
  value: string;
}

export interface MiraiExplanationExtension {
  readonly fhId: string;
  readonly volume: number;
  readonly badge: '量産民主化' | '超知能加速' | '願望ブレイクスルー';
  readonly eta: string;
  readonly score: number;
  readonly axes: readonly [number, number, number, number, number];
  readonly scoreRationale: string;
  readonly baselineMode?: ScaleMode;
  readonly beginnerTitle: string;
  readonly beginnerSummary: string;
  readonly beginnerPoints: readonly string[];
  readonly beginnerCaution: string;
  readonly comparisonRows: ReadonlyArray<{
    readonly metric: string;
    readonly current2026: string;
    readonly future2028: string;
  }>;
  readonly sourceUrls: ReadonlyArray<{ readonly label: string; readonly url: string }>;
  readonly glossaryIds: readonly string[];
}

export interface PartExplanation {
  title: string;
  subtitle: string;
  category: string;
  /** Beginner-friendly everyday analogy ("ひとことで言うと") */
  plainAnalogy?: string;
  summary: string;
  opticsAndPhysics: string[];
  formula?: {
    expression: string;
    description: string;
  };
  nextGenInnovation: string;
  specs: ExplanationSpec[];
  /** Authentic engineering standards, datasheets, and technical literature citations */
  references?: string[];
  /** Optional FH MIRAI 2028 dual-edition (やさしい / 専門) & 5-axis innovation metadata */
  mirai?: MiraiExplanationExtension;
  diagramType: DiagramType;
}

export interface CadPart {
  id: string;
  /** Subsystem group this part belongs to */
  subsystem:
    | 'welcome'
    | 'lens'
    | 'mount'
    | 'sensor'
    | 'micro'
    | 'micro_v2'
    | 'shutter'
    | 'mainboard'
    | 'evf'
    | 'lcd'
    | 'body'
    | 'battery'
    | 'cfexpress'
    | 'bionz'
    | 'bionz_v2'
    | 'mishoe'
    | 'mic'
    | 'sensor_fab'
    | 'drybox'
    | 'mirai_2028'
    | 'original';
  order: number;
  swatchColor: string;
  /** Group root positioned at its assembled origin */
  group: THREE.Group;
  /** Assembled local position in camera optical coordinates (1 unit = 1 mm) */
  assembledPos: THREE.Vector3;
  /** Offset added when explode = 1.0 in single-subsystem mode */
  explodeOffset: THREE.Vector3;
  /** Optional extra offset when exploding in integrated multi-subsystem mode */
  integratedExplodeOffset?: THREE.Vector3;
  interactiveMeshes: THREE.Mesh[];
  edgeLines: THREE.LineSegments[];
  explanation: PartExplanation;
  ibisMovable?: boolean;
  ultrasonicElement?: boolean;
  /** If true, omit this ultra-fine sub-part from whole-camera modes ('integrated', 'camera_body') and render ONLY in its individual subsystem view */
  standaloneOnly?: boolean;
  /** For 50mm F1.2 GM standalone 3-section lightweight dissection: 1 = Rear (default), 2 = Middle, 3 = Front */
  lensSection?: LensSection;
  /** For Sensor Manufacturing Process multi-volume encyclopedia: 0 = Vol.0, 1 = Vol.1, 2 = Vol.2 (Phase 1), 3 = Vol.3 (Phase 2 Design & Mask) */
  fabVolume?: SensorFabVolume;
  /** For FH MIRAI 2028 multi-structure encyclopedia: 1 = FH01 SPAD/QIS, 2 = FH02 3-Layer Perovskite RGB, ... */
  miraiSubView?: number;
  /** For Original real-world manufacturable showcase: 1 = #01 RIIMOS E1, 2+ = future original builds */
  originalSubView?: number;
}

export interface AssemblyController {
  rootGroup: THREE.Group;
  parts: CadPart[];
  /** Number of standalone-only parts deferred until this subsystem's standalone view is entered */
  deferredStandaloneCount?: number;
  /** Lazily build & attach standalone-only micro-parts on first standalone visit (returns newly built parts) */
  hydrateStandalone?: () => CadPart[] | Promise<CadPart[]>;
  /** Optional active volume setter for multi-volume standalone encyclopedias (sensor_fab) */
  setActiveVolume?: (vol: SensorFabVolume) => void;
  updateAnimation: (
    elapsed: number,
    delta: number,
    explodeFactor: number,
    physicsActive: boolean,
    integrated: boolean
  ) => void;
  setPhysicsVisible: (visible: boolean) => void;
  updateExplodeGuides: (explodeFactor: number, visible: boolean) => void;
}
