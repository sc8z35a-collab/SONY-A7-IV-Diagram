import * as THREE from 'three';

export type ScaleMode = 'integrated' | 'shutter' | 'sensor' | 'mainboard' | 'micro';
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
  diagramType:
    // Sensor Macro (14)
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
    // Sensor Micro (7)
    | 'microlens'
    | 'bayer_cfa'
    | 'bsi_ar'
    | 'cross_pd'
    | 'two_layer_gs'
    | 'cucu_bond'
    | 'adc_dram'
    // Shutter Macro (12)
    | 'shutter_cover'
    | 'shutter_shield'
    | 'shutter_curtain1'
    | 'shutter_link1'
    | 'shutter_midplate'
    | 'shutter_curtain2'
    | 'shutter_link2'
    | 'shutter_dual_drive'
    | 'shutter_magnets'
    | 'shutter_charge_motor'
    | 'shutter_opt_sensor'
    | 'shutter_damper'
    // Mainboard & Image Processing Engine (16)
    | 'mb_vapor'
    | 'mb_emi'
    | 'mb_ihs'
    | 'mb_isp_die'
    | 'mb_interposer'
    | 'mb_ai_npu'
    | 'mb_lpddr5x'
    | 'mb_pmic'
    | 'mb_cfexpress'
    | 'mb_imu_mcu'
    | 'mb_security_clock'
    | 'mb_io_ports'
    | 'mb_rf_wifi'
    | 'mb_hdi_pcb'
    | 'mb_b2b'
    | 'mb_chassis';
}

export interface CadPart {
  id: string;
  /** Subsystem group this part belongs to */
  subsystem: 'sensor' | 'micro' | 'shutter' | 'mainboard';
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
}

export interface AssemblyController {
  rootGroup: THREE.Group;
  parts: CadPart[];
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
