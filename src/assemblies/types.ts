import * as THREE from 'three';

export type ScaleMode =
  | 'integrated'
  | 'lens'
  | 'mount'
  | 'shutter'
  | 'sensor'
  | 'mainboard'
  | 'evf'
  | 'lcd'
  | 'body'
  | 'micro';
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
    // Sensor Macro Super-Dissection (26: 14 original + 12 new)
    | 'baffle'
    | 'sswf'
    | 'sensor_pzt_bar'
    | 'olpf16'
    | 'sensor_qwp_plate'
    | 'ircut'
    | 'coverglass'
    | 'stacked_die'
    | 'sensor_cucu_layer'
    | 'sensor_logic_dram'
    | 'wirebond'
    | 'ceramic_pkg'
    | 'sensor_pcb'
    | 'slvs_fpc'
    | 'ibis_vcm'
    | 'sensor_vcm_coils'
    | 'sensor_hall_pcb'
    | 'ceramic_balls'
    | 'sensor_preload_plates'
    | 'sensor_ibis_lock'
    | 'sensor_n52_magnets'
    | 'magnet_yoke'
    | 'sensor_tilt_springs'
    | 'sensor_tim_pad'
    | 'sigma_graphite'
    | 'sensor_copper_sink'
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
    | 'mb_chassis'
    // EVF Optical & Eye-Tracking Anatomy (14)
    | 'evf_eyecup'
    | 'evf_antifog'
    | 'evf_eye_sensor'
    | 'evf_ir_leds'
    | 'evf_dichroic'
    | 'evf_gaze_cam'
    | 'evf_lens_rear'
    | 'evf_lens_ed'
    | 'evf_diopter'
    | 'evf_lens_field'
    | 'evf_oled'
    | 'evf_tcon'
    | 'evf_heatsink'
    | 'evf_housing'
    // Large-Diameter Mirrorless Lens Mount (12)
    | 'mount_flange'
    | 'mount_bolts'
    | 'mount_gasket'
    | 'mount_leaf_springs'
    | 'mount_shims'
    | 'mount_lock_pin'
    | 'mount_contacts'
    | 'mount_contact_pcb'
    | 'mount_baffle'
    | 'mount_flare_mask'
    | 'mount_mg_throat'
    | 'mount_chassis_if'
    // 50mm F1.2 Prime Lens & Quad XD Linear Motors Super-Dissection (22: 10 original + 12 new)
    | 'lens_hood'
    | 'lens_filter_ring'
    | 'lens_front_xa'
    | 'lens_front_meniscus'
    | 'lens_ed_doublet'
    | 'lens_iris_cam'
    | 'lens_iris_11'
    | 'lens_iris_stepper'
    | 'lens_focus_a'
    | 'lens_xd_stators'
    | 'lens_xd_motors'
    | 'lens_guide_shafts'
    | 'lens_mr_encoders'
    | 'lens_focus_b'
    | 'lens_rear_convex'
    | 'lens_rear_hero'
    | 'lens_mcu_pcb'
    | 'lens_mf_encoder'
    | 'lens_click_detent'
    | 'lens_control_rings'
    | 'lens_barrel'
    | 'lens_rear_bayonet'
    // 4-Axis Multi-Angle Rear LCD Monitor (6)
    | 'lcd_touch_glass'
    | 'lcd_ips_cell'
    | 'lcd_backlight'
    | 'lcd_shell'
    | 'lcd_swivel_hinge'
    | 'lcd_tilt_cradle'
    // Battery, Magnesium Monocoque Body & Dials (12)
    | 'body_battery'
    | 'body_batt_chamber'
    | 'body_grip'
    | 'body_shutter_dials'
    | 'body_top_dials'
    | 'body_hotshoe'
    | 'body_front_shell'
    | 'body_top_deck'
    | 'body_rear_controls'
    | 'body_card_door'
    | 'body_io_doors'
    | 'body_baseplate';
}

export interface CadPart {
  id: string;
  /** Subsystem group this part belongs to */
  subsystem: 'lens' | 'mount' | 'sensor' | 'micro' | 'shutter' | 'mainboard' | 'evf' | 'lcd' | 'body';
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
