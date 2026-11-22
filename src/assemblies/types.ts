import * as THREE from 'three';

export type ScaleMode = 'macro' | 'micro';
export type RenderMode = 'solid' | 'xray' | 'cad';
export type SectionAxis = 'off' | 'x' | 'y';
export type CameraPreset = 'iso' | 'front' | 'side' | 'back';

export interface ExplanationSpec {
  label: string;
  value: string;
}

export interface PartExplanation {
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  opticsAndPhysics: string[];
  formula?: {
    expression: string;
    description: string;
  };
  nextGenInnovation: string;
  specs: ExplanationSpec[];
  diagramType:
    | 'baffle'
    | 'sswf'
    | 'olpf16'
    | 'ircut'
    | 'coverglass'
    | 'stacked_die'
    | 'wirebond'
    | 'ceramic_pkg'
    | 'sensor_pcb'
    | 'slvs_fpc'
    | 'ibis_vcm'
    | 'ceramic_balls'
    | 'magnet_yoke'
    | 'sigma_graphite'
    | 'microlens'
    | 'bayer_cfa'
    | 'bsi_ar'
    | 'cross_pd'
    | 'two_layer_gs'
    | 'cucu_bond'
    | 'adc_dram';
}

export interface CadPart {
  id: string;
  mode: ScaleMode;
  order: number;
  swatchColor: string;
  /** Group root positioned at its assembled origin */
  group: THREE.Group;
  /** Assembled local position */
  assembledPos: THREE.Vector3;
  /** Offset added when explode = 1.0 */
  explodeOffset: THREE.Vector3;
  /** Optional micro-scale rotation or extra animation hooks */
  interactiveMeshes: THREE.Mesh[];
  edgeLines: THREE.LineSegments[];
  explanation: PartExplanation;
  /** Whether part moves with IBIS actuator during live simulation */
  ibisMovable?: boolean;
  /** Whether part vibrates at ultrasonic frequency during simulation */
  ultrasonicElement?: boolean;
}

export interface AssemblyController {
  macroGroup: THREE.Group;
  microGroup: THREE.Group;
  parts: CadPart[];
  updateAnimation: (
    elapsed: number,
    delta: number,
    explodeFactor: number,
    physicsActive: boolean,
    mode: ScaleMode
  ) => void;
  setPhysicsVisible: (visible: boolean, mode: ScaleMode) => void;
  updateExplodeGuides: (explodeFactor: number, mode: ScaleMode) => void;
}
