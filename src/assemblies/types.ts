import * as THREE from 'three';

export type ScaleMode =
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
    // Shutter Macro Ultra-Dissection (26: 12 original + 14 new watchmaker mechanics)
    | 'shutter_cover'
    | 'shutter_shield'
    | 'shutter_shield_actuator'
    | 'shutter_curtain1'
    | 'shutter_curtain1_guide'
    | 'shutter_link1'
    | 'shutter_pivot_jewels'
    | 'shutter_midplate'
    | 'shutter_curtain2'
    | 'shutter_curtain2_guide'
    | 'shutter_link2'
    | 'shutter_tension_drums'
    | 'shutter_dual_drive'
    | 'shutter_counterweight'
    | 'shutter_magnets'
    | 'shutter_armature_levers'
    | 'shutter_charge_gears'
    | 'shutter_charge_motor'
    | 'shutter_cocking_cam'
    | 'shutter_cam_switch'
    | 'shutter_opt_sensor'
    | 'shutter_blade_brakes'
    | 'shutter_shock_piston'
    | 'shutter_fpc_driver'
    | 'shutter_floating_grommets'
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
    // EVF Optical & Mechanical Focus Anatomy (18: 14 original + 4 new internal mechanics)
    | 'evf_eyecup'
    | 'evf_eyecup_latch'
    | 'evf_antifog'
    | 'evf_eye_sensor'
    | 'evf_ir_leds'
    | 'evf_dichroic'
    | 'evf_gaze_cam'
    | 'evf_lens_rear'
    | 'evf_lens_ed'
    | 'evf_diopter'
    | 'evf_diopter_rails'
    | 'evf_diopter_helicoid'
    | 'evf_lens_field'
    | 'evf_oled'
    | 'evf_oled_alignment'
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
    // 50mm F1.2 Prime Lens Ultra-Dissection (40: 22 existing + 18 new, full 14-element optical stack!)
    | 'lens_hood'
    | 'lens_filter_ring'
    | 'lens_front_eccentric'
    | 'lens_front_xa'
    | 'lens_front_meniscus'
    | 'lens_ed_doublet'
    | 'lens_flint_cemented'
    | 'lens_g4_negative'
    | 'lens_iris_cam'
    | 'lens_iris_11'
    | 'lens_iris_base'
    | 'lens_iris_stepper'
    | 'lens_focus_a_front'
    | 'lens_focus_a'
    | 'lens_focus_a_rear'
    | 'lens_xd_stators'
    | 'lens_xd_motors'
    | 'lens_xd_dampers'
    | 'lens_guide_shafts'
    | 'lens_mr_encoders'
    | 'lens_inner_chassis'
    | 'lens_focus_b_front'
    | 'lens_focus_b'
    | 'lens_g7_flattener'
    | 'lens_rear_convex'
    | 'lens_rear_telecentric'
    | 'lens_rear_hero'
    | 'lens_rear_baffle'
    | 'lens_thermistor'
    | 'lens_mcu_pcb'
    | 'lens_fpc_harness'
    | 'lens_mf_encoder'
    | 'lens_aperture_sensor'
    | 'lens_click_detent'
    | 'lens_switch_pcb'
    | 'lens_weather_seals'
    | 'lens_control_rings'
    | 'lens_barrel'
    | 'lens_bayonet_shims'
    | 'lens_rear_bayonet'
    // 4-Axis Multi-Angle Rear LCD Mechanical Hinge Ultra-Dissection (14: 6 original + 8 new mechanics)
    | 'lcd_touch_glass'
    | 'lcd_ips_cell'
    | 'lcd_backlight'
    | 'lcd_shell'
    | 'lcd_orientation_hall'
    | 'lcd_swivel_clutch'
    | 'lcd_swivel_hinge'
    | 'lcd_detent_stops'
    | 'lcd_coaxial_fpc'
    | 'lcd_pantograph_links'
    | 'lcd_tilt_torque_cams'
    | 'lcd_tilt_slide_rails'
    | 'lcd_cradle_locks'
    | 'lcd_tilt_cradle'
    // Camera Body Internal Electromechanical Machinery & Monocoque (26: 12 original + 14 new mechanics)
    | 'body_battery'
    | 'body_battery_ejector'
    | 'body_battery_terminals'
    | 'body_batt_chamber'
    | 'body_grip'
    | 'body_shutter_switch'
    | 'body_command_encoders'
    | 'body_shutter_dials'
    | 'body_mode_lock_ratchet'
    | 'body_top_switch_fpc'
    | 'body_top_dials'
    | 'body_hotshoe_springs'
    | 'body_hotshoe'
    | 'body_card_ejectors'
    | 'body_card_door_latch'
    | 'body_card_door'
    | 'body_joystick_gimbal'
    | 'body_rear_wheel_encoder'
    | 'body_rear_controls'
    | 'body_strap_anchors'
    | 'body_acoustic_breather'
    | 'body_chassis_gaskets'
    | 'body_front_shell'
    | 'body_top_deck'
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
