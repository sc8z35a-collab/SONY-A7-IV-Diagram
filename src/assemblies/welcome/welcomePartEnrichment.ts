import { PartExplanation } from '../types';

export type WelcomeDiagramType =
  | 'welcome_glyph_layer'
  | 'welcome_led_thermal'
  | 'welcome_driver_canfd'
  | 'welcome_quartz_bridge'
  | 'welcome_dock_pogo'
  | 'welcome_power_lifepo4'
  | 'welcome_tof_audio_hmi'
  | 'welcome_optical_plinth';

interface RoleEngineeringProfile {
  readonly diagramType: WelcomeDiagramType;
  readonly extraPhysics: readonly string[];
  readonly fallbackFormula: { readonly expression: string; readonly description: string };
  readonly extraSpecs: ReadonlyArray<{ readonly label: string; readonly value: string }>;
  readonly references: readonly string[];
}

/**
 * Resolve ultra-detailed, domain-authentic engineering standards, physics,
 * datasheet parameters, and literature citations for every single one of the
 * 220 physically functional parts of WLK-220 「ようこそ」.
 */
function resolveEngineeringProfile(id: string): RoleEngineeringProfile {
  // 1. Quartz Optical Power Columns, Collars, Internal Busbars & 45° Corner Prisms
  if (
    id.includes('quartz') ||
    id.includes('corner-prism') ||
    id.includes('hook-optical-prism') ||
    id.includes('left-power-bus') ||
    id.includes('right-pwm-bus')
  ) {
    return {
      diagramType: 'welcome_quartz_bridge',
      extraPhysics: [
        '溶融石英ガラス（SiO₂ 99.99%以上, n_d=1.4585）の極低線膨張係数 0.55×10⁻⁶/K により、LED点灯温度変化でも光軸ズレ・応力割れを抑制。',
        '同軸貫通C10200無酸素銅芯線（導電率 101% IACS）が透明意匠を損なわず分離ストロークへ12V電源と32kHz PWM信号を低損失供給。',
        '端面をPTFE低摩擦緩衝座金とC3604快削真鍮カラーで挟持し、金属―ガラス直接接触による局所ヘルツ応力集中を回避。',
      ],
      fallbackFormula: {
        expression: 'θ_c = arcsin(n₂ / n₁) = 41.2° (N-BK7) / 43.3° (SiO₂)',
        description: '45°全反射プリズムおよび溶融石英導波路で臨界角を超えた光束を反射率99.6%以上で無損失伝送。',
      },
      extraSpecs: [
        { label: '準拠光学規格', value: 'ISO 10110-5 (表面精度 λ/4)' },
        { label: '実製造工程', value: 'CNC研削研磨 + レーザー穴開け' },
        { label: '装置内役割', value: '分離画の構造支持・電力給電・光結合' },
      ],
      references: [
        'Corning Inc., "HPFS® 7980 Fused Silica Optical Materials Product Information Sheet" (n_d=1.45846, CTE 0.52 ppm/K)',
        'SCHOTT AG, "Optical Glass Data Sheet: N-BK7® (517642.251)" & ISO 10110 Optics Drawing Standard',
        'JIS C 3102:1984 電気用軟銅線 (C10200 OFC) / JIS H 3250:2021 銅及び銅合金の棒 (C3604BD)',
      ],
    };
  }

  // 2. Dovetail Mechanical Dock, 6-Pin Gold Pogo-Pin Block, Dowel Pins & M2/M3 Bolts
  if (
    id.includes('dovetail') ||
    id.includes('dock-socket') ||
    id.includes('pogo-') ||
    id.includes('dowel') ||
    id.includes('bolts') ||
    id.includes('screws') ||
    id.includes('bracket') ||
    id.includes('joint') ||
    id.includes('retainer') ||
    id.includes('antivib')
  ) {
    return {
      diagramType: 'welcome_dock_pogo',
      extraPhysics: [
        '60° CNCアリ溝（ダブテール）嵌合とH7/g6公差の焼入れ平行ピン（DIN 6325）により、着脱後も文字ピッチ・傾きを±0.015mm以内で完全再現。',
        'ベリリウム銅スプリング内蔵・硬質金めっき（0.76μm Au over 2.5μm Ni）伸縮ポゴピンが接触抵抗18mΩ未満で12V×2＋CAN-FD差動を一括導通。',
        '締結ボルトはISO 4762（JIS B 1176）強度区分A2-70ステンレス製とし、軸力管理と緩み止め剤（中強度）により3G振動環境でも脱落を防止。',
      ],
      fallbackFormula: {
        expression: 'R_c = ρ / (2a) + R_film ≤ 18 mΩ (F_n ≥ 1.2 N)',
        description: 'Holmの接触抵抗式に基づき、1.2N以上のスプリング接圧で酸化被膜を破り長期安定導通を保証。',
      },
      extraSpecs: [
        { label: '嵌合・締結規格', value: 'ISO 286 H7/g6 / ISO 4762' },
        { label: '着脱耐久', value: '100,000 サイクル (金めっき接点)' },
        { label: '装置内役割', value: '無ケーブル着脱・精密位置決め・締結' },
      ],
      references: [
        'ISO 286-2:2010 Geometrical product specifications (GPS) — Limits and fits (H7/g6 precision datum fit)',
        'DIN 6325 / ISO 8734 Parallel pins of unhardened & hardened steel (HRC 60±2) / ISO 4762 Socket head cap screws',
        'Mill-Max Mfg. Corp., "Spring-Loaded (Pogo) Pin Engineering Guide: BeCu Plungers & 30μin Hard Gold Plating"',
      ],
    };
  }

  // 3. LED Chips, MCPCB, Heatpipes, Fin Heatsinks, Copper Spreaders, Thermal Pads & NTC
  if (
    id.includes('led-') ||
    id.includes('leds') ||
    id.includes('mcpcb') ||
    id.includes('heatsink') ||
    id.includes('heatpipe') ||
    id.includes('thermal') ||
    id.includes('copper-spreader') ||
    id.includes('finned-backplate') ||
    id.includes('ntc-')
  ) {
    return {
      diagramType: 'welcome_led_thermal',
      extraPhysics: [
        'CRI Ra≥97・R9≥90の高演色2835 LEDチップを熱伝導率2.0 W/(m·K)アルミコアMCPCBへ鉛フリーリフロー実装（Sn-3.0Ag-0.5Cu）し接合部熱抵抗を最小化。',
        '焼結銅ウィックØ3mmマイクロヒートパイプとA6061/AZ91D 3D放熱フィンの連続熱パスにより、ファンレス無音環境でもTj=58.4℃（LM-80上限85℃に対し26.6℃余裕）を維持。',
        'NTC 10kΩサーミスタ（B25/85=3435K）が100Hz周期で基板温度を監視し、72℃超過時は16-bit PWMデューティを滑らか減光して長寿命L70＞60,000時間を保証。',
      ],
      fallbackFormula: {
        expression: 'T_j = T_a + P_heat · (R_jc + R_mcpcb + R_tim + R_fin) = 58.4°C',
        description: '直列熱抵抗モデルによりジャンクション温度を85℃未満に厳密抑制し、色度シフトΔu\'v\'<0.003を実現。',
      },
      extraSpecs: [
        { label: '演色・寿命規格', value: 'IES LM-80 / TM-21 (L70 > 60,000h)' },
        { label: '熱測定準拠', value: 'JEDEC JESD51-14 過渡熱インピーダンス' },
        { label: '装置内役割', value: '高演色発光・相変化熱輸送・温度保護' },
      ],
      references: [
        'ANSI/IES LM-80-20 & TM-21-19 "Measuring Luminous Flux and Color Maintenance of LED Packages"',
        'JEDEC Standard JESD51-14 "Transient Dual Interface Test Method for Thermal Resistance Junction-to-Case"',
        'Nichia Corp. 757-Series High-CRI (Ra97) Technical Datasheet / IPC-4101 Metal-Core IMS PCB Specification',
      ],
    };
  }

  // 4. PWM Driver MCU, Local PCB, CAN-FD, ZIF FPC, EMI Shield, BtoB Bus, Photodiode, ESD, MLCC
  if (
    id.includes('driver') ||
    id.includes('pwm') ||
    id.includes('canfd') ||
    id.includes('cortex') ||
    id.includes('mainboard') ||
    id.includes('wifi-ble') ||
    id.includes('zif') ||
    id.includes('fpc') ||
    id.includes('btob') ||
    id.includes('harness') ||
    id.includes('emi-') ||
    id.includes('tvs-') ||
    id.includes('mlcc') ||
    id.includes('photodiode') ||
    id.includes('dcdc')
  ) {
    return {
      diagramType: 'welcome_driver_canfd',
      extraPhysics: [
        '32 kHz超高周波・16-bit（65,536階調）定電流PWM制御によりIEEE 1789 No-Effect領域を満たし、ミラーレス一眼1/8000秒高速シャッター撮影でもフリッカー縞を完全ゼロ化。',
        'ISO 11898-2準拠5 Mbps CAN-FD差動バス（120Ω終端・コモンモードチョーク付）により、4文字間のアニメーション同期ジッタを10μs未満へ抑制。',
        'ポリイミドFPC（IPC-6013 Type 2）＋0.5mmピッチZIFフリップロックコネクタ、洋白EMIシールド缶、IEC 61000-4-2 ±15kV TVS保護素子により産業機レベルのEMC耐性を確保。',
      ],
      fallbackFormula: {
        expression: 'I_LED = (V_ref / R_IREF) × G_gain,  f_PWM = 32.0 kHz (16-bit)',
        description: '外付け高精度0.1%基準抵抗で定電流値を決定し、ガンマ2.2補正カーブで暗部0.1%でも段差なく調光。',
      },
      extraSpecs: [
        { label: '通信・フリッカー規格', value: 'ISO 11898-2 CAN-FD / IEEE 1789' },
        { label: '基板・EMC規格', value: 'IPC-6012 Class 2 / CISPR 32 Class B' },
        { label: '装置内役割', value: '定電流PWM駆動・差動同期通信・EMC遮蔽' },
      ],
      references: [
        'ISO 11898-2:2016 Road vehicles — Controller area network (CAN) High-speed medium access unit (CAN-FD 5Mbps)',
        'IEEE Std 1789-2015 "Recommended Practices for Modulating Current in High-Brightness LEDs for Mitigating Health Risks"',
        'STMicroelectronics STM32H743/G4 Reference Manual & IEC 61000-4-2 ESD Immunity (±15kV Air / ±8kV Contact)',
      ],
    };
  }

  // 5. USB-C PD 65W, LiFePO4 Battery, BMS, PMIC, Inductors, Fuse, Copper Busbar
  if (
    id.includes('usbc') ||
    id.includes('pd-') ||
    id.includes('pmic') ||
    id.includes('inductor') ||
    id.includes('lifepo4') ||
    id.includes('bms') ||
    id.includes('fuse') ||
    id.includes('copper-busbar')
  ) {
    return {
      diagramType: 'welcome_power_lifepo4',
      extraPhysics: [
        'USB-C PD 3.1（20V/3.25A = 65W受電余力）コントローラがCC1/CC2ラインでネゴシエーションし、定常展示9.2W（ピーク18W・12V/3.5A定格2.3倍ディレーティング）を効率96.2%で供給。',
        'オリビン型結晶構造の2S1P薄型角形ラミネートLiFePO4 UPSパック（6.4V / 160mAh = 1.02Wh, 20C高率放電対応）を採用。実体積2.58ccに収まる現実的エネルギー密度で熱暴走ゼロ・3,000サイクル超の長寿命を実現。',
        'アクティブセルバランスBMS・セラミック速断ヒューズ・eFuse突入電流制限により、USBケーブル抜去時も0ms無停電（Power-Path）でECOモード約20分（フル輝度6.5分）連続発光を維持。',
      ],
      fallbackFormula: {
        expression: 't_UPS = (E_batt · η_sys) / P_eco = (1.02 Wh × 0.94) / 3.0 W ≈ 19.2 min',
        description: '実体積2.58ccの角形LiFePO4 UPSセルにより、停電・ケーブル抜去時も0ms瞬断ゼロで安全に稼働継続。',
      },
      extraSpecs: [
        { label: '給電・電池安全規格', value: 'USB-PD 3.1 / IEC 62133-2 / UL 1642' },
        { label: '輸送・保護機能', value: 'UN38.3 / OV・UV・OC・OT 4重保護' },
        { label: '装置内役割', value: 'PD急速受電・0ms UPS蓄電・3系統安定配電' },
      ],
      references: [
        'USB Implementers Forum (USB-IF), "USB Power Delivery Specification Revision 3.1 Version 1.8" (SPR/EPR 65W)',
        'IEC 62133-2:2017 Secondary cells and batteries containing alkaline or other non-acid electrolytes — Lithium systems',
        'UL 1642 Standard for Lithium Batteries & UN Manual of Tests and Criteria Section 38.3 (LiFePO4 3.2V Cell Safety)',
      ],
    };
  }

  // 6. ToF Proximity Sensor, Ambient Lux Sensor, Speaker, Enclosure, Audio DAC/Amp, Rotary Dial, Power Switch, Status Bar
  if (
    id.includes('tof-') ||
    id.includes('ambient-lux') ||
    id.includes('speaker') ||
    id.includes('audio-') ||
    id.includes('rotary-') ||
    id.includes('toggle-switch') ||
    id.includes('status-bar') ||
    id.includes('front-glass-window')
  ) {
    return {
      diagramType: 'welcome_tof_audio_hmi',
      extraPhysics: [
        'ST製VL53L5CX 8×8（64ゾーン）940nm VCSELマルチゾーンToF測距センサが最大4.0m先の来訪者接近と左右移動方向を検出し、「よ→う→こ→そ」へ光のウェーブ演出を起動。',
        'N52ネオジム磁気回路3Wフルレンジスピーカーを実効容積2.0cc折返しラビリンス・ヘルムホルツ共鳴バスレフ箱（Ø2.0×L22.4mmダクト, f₀=440Hz Concert A4同調）へ搭載し、24bit/96kHz I²S直結クラスDアンプ（SNR 102dB）で澄んだウェルカムチャイムを再生。',
        '36歯CNCダイヤモンドローレット加工アルミダイヤル＋無接点光学式クアドラチャエンコーダ（24クリック/回転・100万回耐久）により、カメラ操作系と同等の高品位な輝度調整・モード切替を実現。',
      ],
      fallbackFormula: {
        expression: 'd = (c · Δt) / 2,   f₀ = (c_s / 2π) · √(S / (V · L_eff)) = 440.5 Hz',
        description: '光速飛行時間によるミリ単位測距と、実効容積2.0cc・Ø2.0×22.4mm折返しダクトによる440HzコンサートA4同調を統合。',
      },
      extraSpecs: [
        { label: 'レーザー・音響規格', value: 'IEC 60825-1 Class 1 / AES2-2012' },
        { label: 'HMI機械耐久', value: '光学ロータリー > 1,000,000 回転' },
        { label: '装置内役割', value: '来訪者知覚・環境光自動調光・音響＆操作HMI' },
      ],
      references: [
        'STMicroelectronics, "VL53L5CX Time-of-Flight 8x8 Multizone Ranging Sensor Datasheet (DS13754)" & IEC 60825-1 Class 1',
        'Beranek & Mellow, "Acoustics: Sound Fields and Transducers" (Helmholtz Micro-Labyrinth Bass-Reflex f₀=440Hz)',
        'Bourns / Alps Alpine Optical Quadrature Rotary Encoder Engineering Standard (2-Bit Gray Code, >1M Cycles)',
      ],
    };
  }

  // 7. Optical Bench Plinth Structural Components (Chassis, Datum Plate, Weight, End Caps, Feet, Seals, Compliance)
  if (id.startsWith('welcome-plinth-')) {
    return {
      diagramType: 'welcome_optical_plinth',
      extraPhysics: [
        '長さ194.0mmのA6061-T6黒アルマイト光学基準定盤（JIS B 7513 0級相当・平面度±10μm）が4文字独立モジュール（計172パーツ）を一直線上に高精度整列。',
        '底部SUS304高比重バランスウェイト（密度7.93 g/cm³）が装置全体の重心高さを台座中心付近へ引き下げ、傾斜角15°でも転倒しない安定モーメントを確保。',
        'Sorbothane®粘弾性エラストマー防振脚（損失係数 tan δ ≈ 0.45）とSUS304バヨネット端蓋が床面振動とスピーカー共鳴の机上伝達を遮断。',
      ],
      fallbackFormula: {
        expression: 'δ_max = (F · L³) / (48 · E · I) < 2.4 μm  (E_Al = 68.9 GPa)',
        description: '光学ベンチ中央の曲げたわみを2.4μm未満に抑え、4文字の光学軸・ポゴピン接圧を均一に維持。',
      },
      extraSpecs: [
        { label: '定盤・防塵規格', value: 'JIS B 7513 / IEC 60529 IP54' },
        { label: '表面処理', value: 'MIL-A-8625 Type III 硬質黒アルマイト' },
        { label: '装置内役割', value: '基準定盤・低重心安定化・防振＆外装保護' },
      ],
      references: [
        'JIS H 4000:2022 アルミニウム及びアルミニウム合金の板及び条 (A6061-T6) / MIL-A-8625F Type III Hard Anodize',
        'JIS B 7513:1992 精密定盤 (Grade-0 Flatness Datum) & JIS G 4305 SUS304 Stainless Steel Plate',
        'Sorbothane® Engineering Design Guide (Viscoelastic Polymer Isolation, Shore 50OO) & IEC 60529 IP54 Enclosure',
      ],
    };
  }

  // 8. Default: Glyph CNC Chassis, Diffuser Lens, PMMA LGP, BEF, Reflector, IP65 Gasket, Ti Bezel, Optical Baffle
  return {
    diagramType: 'welcome_glyph_layer',
    extraPhysics: [
      'A6061-T6 5軸CNC肉抜きフレーム＋Ti-6Al-4V（Grade 5）保護ベゼル＋段付きサファイア光学拡散カバーの多層積層により、実機製造可能な剛性と170°均一発光を両立。',
      '光学PMMA導光板（n_d=1.491, 臨界角θ_c=42.1°）のレーザー微細ドット密度勾配と98%マイクロ発泡PET反射シート・90°BEFプリズム（1.55×集光）で輝度均一性92%以上を実現。',
      '全周溝に嵌合する硬度50A耐UVシリコーンOリング（圧縮率22%）がIEC 60529 IP65防塵防滴を達成し、長期展示での内部結露や導光板曇りを根絶。',
    ],
    fallbackFormula: {
      expression: 'θ_c = arcsin(1 / n_PMMA) = 42.12°,  L_axis = 1.55 · L_LGP',
      description: 'スネルの全反射条件と90°マイクロプリズム集光ゲインにより、低消費電力でも高コントラスト立体発光を実現。',
    },
    extraSpecs: [
      { label: '材料・密閉規格', value: 'JIS H4000 A6061 / ASTM B348 Ti-6Al-4V / IP65' },
      { label: '加工・光学精度', value: '5軸CNC ±0.02mm / 輝度均一性 ≥ 92%' },
      { label: '装置内役割', value: '立体文字の主構造・光学導光・防塵防滴密閉' },
    ],
    references: [
      'JIS H 4000 A6061-T6 & ASTM B348 Grade 5 (Ti-6Al-4V) Precision CNC Aerospace Structural Alloy Standards',
      'ISO 7823-1 Polymethylmethacrylate (PMMA) Optical Sheet (n_d=1.491) & 3M™ Vikuiti™ BEF 90° Micro-Prism Optics',
      'IEC 60529 Degrees of Protection Provided by Enclosures (IP65) & Parker O-Ring Handbook (ORD 5700, 22% Squeeze)',
    ],
  };
}

export interface EnrichableWelcomeDef {
  readonly id: string;
  readonly code: string;
  readonly groupKey: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: string;
  readonly swatchColor: string;
  readonly assembledPos: readonly [number, number, number];
  readonly explodeOffset: readonly [number, number, number];
  readonly plainAnalogy: string;
  readonly summary: string;
  readonly opticsAndPhysics: readonly string[];
  readonly formula?: { readonly expression: string; readonly description: string };
  readonly nextGenInnovation: string;
  readonly specs: ReadonlyArray<{ readonly label: string; readonly value: string }>;
  readonly references?: readonly string[];
  readonly diagramType: PartExplanation['diagramType'];
}

/**
 * Normalize sequential part code (W01–W220), upgrade schematic mapping across all 8 HD 720×470 blueprints,
 * and enrich every part with ultra-detailed physics, datasheet specs, and authentic standards/datasheet citations!
 */
export function enrichWelcomeDef<T extends EnrichableWelcomeDef>(def: T, index: number): T {
  const seqCode = `W${String(index + 1).padStart(2, '0')}`;
  const cleanTitleBody = def.title.replace(/^W\d+\.\s*/, '');
  const title = `${seqCode}. ${cleanTitleBody}`;
  const profile = resolveEngineeringProfile(def.id);

  // Merge existing specific physics bullets + domain engineering bullets (deduplicated, up to 4 crisp bullets)
  const mergedPhysics: string[] = [...def.opticsAndPhysics];
  for (const extra of profile.extraPhysics) {
    if (mergedPhysics.length >= 4) break;
    if (!mergedPhysics.some((p) => p.slice(0, 14) === extra.slice(0, 14))) {
      mergedPhysics.push(extra);
    }
  }

  // Merge existing specs + missing datasheet specs (up to 5 clean rows)
  const seenLabels = new Set(def.specs.map((s) => s.label));
  const mergedSpecs = [...def.specs];
  for (const sp of profile.extraSpecs) {
    if (mergedSpecs.length >= 5) break;
    if (!seenLabels.has(sp.label)) {
      mergedSpecs.push(sp);
      seenLabels.add(sp.label);
    }
  }

  return {
    ...def,
    code: seqCode,
    title,
    diagramType: profile.diagramType,
    opticsAndPhysics: mergedPhysics,
    formula: def.formula ?? profile.fallbackFormula,
    specs: mergedSpecs,
    references: def.references && def.references.length > 0 ? def.references : profile.references,
  };
}
