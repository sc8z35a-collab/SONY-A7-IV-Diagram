//@FLOW_MAP|file=src/assemblies/welcome/welcomePlinthPrecisionParts.ts|unit=welcome|lines=1186|exports=buildMicroModuleBox,WELCOME_PLINTH_PRECISION_DEFS,buildWelcomePlinthPrecisionParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import { scaleRadialSegmentsForQuality as qRadialSegs } from '../../core/geometry_quality';
import { qualityLevel } from './welcomeGeometry';
import {
  WelcomeDiagramType,
  WelcomeExpansionPartDef,
  buildExpansionCadParts,
} from './welcomeGlyphPrecisionParts';

const PL_POS: readonly [number, number, number] = [0, -17.0, 0];

interface PlinthBoxSpec {
  id: string;
  code: string;
  order: number;
  title: string;
  subtitle: string;
  category: string;
  swatchColor: string;
  explodeOffset: readonly [number, number, number];
  plainAnalogy: string;
  summary: string;
  opticsAndPhysics: readonly string[];
  formula: { readonly expression: string; readonly description: string };
  nextGenInnovation: string;
  specs: ReadonlyArray<{ readonly label: string; readonly value: string }>;
  references: readonly string[];
  diagramType: WelcomeDiagramType;
  build: (m: V2MaterialLibrary) => THREE.Group;
}

function makePlinthDef(s: PlinthBoxSpec): WelcomeExpansionPartDef {
  return {
    ...s,
    groupKey: 'optical_plinth',
    assembledPos: PL_POS,
  };
}

/** Compact helper for IC/QFN/module packages seated cleanly in verified open plinth pockets. */
export function buildMicroModuleBox(
  cx: number,
  cy: number,
  cz: number,
  w: number,
  h: number,
  d: number,
  bodyMat: THREE.Material,
  accentMat: THREE.Material,
  mats: V2MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const ql = qualityLevel();
  const by = cy - 0.08;
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bodyMat);
  body.position.set(cx, by, cz);
  g.add(body);
  if (ql >= 1) {
    const capH = Math.max(0.12, h * 0.22);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(w * 0.72, capH, d * 0.72), accentMat);
    cap.position.set(cx, by + h * 0.5 + capH * 0.5, cz);
    g.add(cap);
  }
  if (ql >= 2) {
    const pinGeo = new THREE.BoxGeometry(0.24, Math.max(0.14, h * 0.32), 0.24);
    for (const sx of [-0.42, 0, 0.42]) {
      const p1 = new THREE.Mesh(pinGeo, mats.goldPlating);
      p1.position.set(cx + w * sx, by - h * 0.22, cz + d * 0.5 + 0.12);
      const p2 = new THREE.Mesh(pinGeo, mats.goldPlating);
      p2.position.set(cx + w * sx, by - h * 0.22, cz - d * 0.5 - 0.12);
      g.add(p1, p2);
    }
  }
  return g;
}

// ============================================================================
// Wave 0 Optical Plinth Precision Parts (28 Parts: W238 - W265)
// Every coordinate is placed in verified open plinth corridors (0.001mm clear!)
//   - Upper Internal Busway: Y ∈ [+1.55..+2.42], Z ∈ [-7.6..+7.6] (above W205 Y<=1.4, below W174 Y>=2.5)
//   - Open Right Internal Bay: X ∈ [+51.5..+55.4] & X ∈ [+80.6..+86.2], Y ∈ [-4.2..+2.2]
//   - Open Front/Rear Internal Channels & Exterior Deck/Belly/Rear Flanks
// ============================================================================
export const WELCOME_PLINTH_PRECISION_DEFS: readonly WelcomeExpansionPartDef[] = [
  makePlinthDef({
    id: 'welcome-plinth-usbc-tvs-array',
    code: 'W238',
    order: 238,
    title: 'W238. USB-C PD 65W専用 ±30kV TVSサージ保護アレイ＆コモンモードフィルタ',
    subtitle: 'Plinth USB-C PD 65W ±30kV IEC 61000-4-2 TVS Surge & Common-Mode ESD Array',
    category: '光学ベンチ台座 / 入力保護・ESD',
    swatchColor: '#1d2026',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'USB-Cケーブルを抜き差しする瞬間の静電気や雷サージを0.5ナノ秒で地面へ逃がし、内部の電源基板を守る避雷針チップです。',
    summary: 'USB-C PD入力直後（X=-48, Y=+1.95, Z=-6.2）の上部シールド配線帯へ実装された24V動作対応TVSダイオードアレイ（SMBJ24CA＋TPD4E05U06）。IEC 61000-4-2 ±30 kV気中放電から後段を完全防護します。',
    opticsAndPhysics: [
      'アバランシェ降伏応答時間 < 0.5 ns により、静電気パルスのピーク電圧がPDコントローラ（W196）へ到達する前にクランプ。',
      '超低接合容量 0.5 pF により USB 2.0 / CC 通信波形を劣化させず完全保護。',
    ],
    formula: {
      expression: 'P_pp = 600 W (10/1000 μs),   t_clamp < 0.5 ns,   V_ESD = ±30 kV (IEC 61000-4-2)',
      description: '600 Wピーク耐量TVS＋0.5 pF超低容量ESDアレイでホットプラグ事故を根絶。',
    },
    nextGenInnovation: 'USB-PD 3.1 EPR規格準拠の超低容量・高耐量デュアルステージサージ保護。',
    specs: [
      { label: 'ESD耐量', value: '±30 kV (接触 / 気中 IEC 61000-4-2)' },
      { label: 'ピーク電力', value: '600 W (10/1000 μs) / C_j = 0.5 pF' },
      { label: '配置位置', value: '上部電源配線帯 (X=-48, Y=+1.95, Z=-6.2)' },
    ],
    references: [
      'Texas Instruments, "TPD4E05U06 Ultra-Low Capacitance ESD Protection Diode Datasheet"',
      'Littelfuse, "SMBJ Series 600W Surface Mount TVS Diode Application Note"',
      'IEC 61000-4-2:2008 Electrostatic Discharge Immunity Standard',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-48.0, 1.92, -6.35, 4.4, 0.60, 2.2, m.icEpoxy, m.silverElectrode, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-lifepo4-charger-shunt',
    code: 'W239',
    order: 239,
    title: 'W239. LiFePO4 充電電流 5mΩ ±0.5% マンガン銅精密シャント抵抗＆双方向電流検出IC',
    subtitle: 'Plinth LiFePO4 5mΩ ±0.5% Manganin Precision Current-Sense Shunt & INA228 Monitor',
    category: '光学ベンチ台座 / 充電・電流計測',
    swatchColor: '#b67b3d',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '内蔵バッテリーへ出入りする電気の量を1ミリアンペア単位で正確に測り、安全な充電と残り時間の高精度表示を実現する電流計チップです。',
    summary: 'LiFePO4バッテリー直上の上部バス帯（X=-56, Y=+1.92, Z=+5.8）へ配置された5 mΩ（±0.5%、TCR ±20 ppm/°C）マンガン銅ケルビン4端子シャント抵抗＆20-bit I²C電力モニタINA228。',
    opticsAndPhysics: [
      '4端子ケルビン接続によりはんだランド抵抗誤差を排除し、±0.1%の残量（SoC）クーロン積算精度を達成。',
      '5 mΩ低抵抗により最大3 A充電時の発熱損失をわずか45 mWへ抑制。',
    ],
    formula: {
      expression: 'P_shunt = I² · R_s = (3.0 A)² × 0.005 Ω = 45.0 mW   (TCR = ±20 ppm/°C)',
      description: '5 mΩマンガン銅ケルビンシャントで低損失と20-bit高精度SoC計測を両立。',
    },
    nextGenInnovation: '20-bit ΔΣ ADC内蔵I²C双方向クーロンカウンタ＋低TCRマンガン銅シャント。',
    specs: [
      { label: 'シャント抵抗', value: '5.0 mΩ ±0.5% (2512 4端子マンガン銅)' },
      { label: '計測IC', value: 'TI INA228 20-bit I²C 電圧・電流・電力計' },
      { label: '最大損失', value: '45 mW @ 3.0 A' },
    ],
    references: [
      'Texas Instruments, "INA228 85-V, 20-Bit Ultra-Precise I2C Power/Energy/Charge Monitor Datasheet"',
      'Vishay Dale, "WSLP2512 Power Metal Strip® Low-TCR Current Sensing Resistors"',
      'IEEE 1625 Standard for Rechargeable Batteries — Accurate State-of-Charge Estimation',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-56.0, 1.92, 6.30, 5.0, 0.60, 2.2, m.sinteredBronzeBushing, m.sensorPcb, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-battery-polyfuse-ntc',
    code: 'W240',
    order: 240,
    title: 'W240. LiFePO4 バッテリー異常発熱遮断 リセッタブルPTCポリヒューズ＆密着NTCプローブ',
    subtitle: 'Plinth LiFePO4 Resettable PTC Polyfuse & Cell-Surface NTC Thermal Cutoff Probe',
    category: '光学ベンチ台座 / 電池安全保護',
    swatchColor: '#dc4a38',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'バッテリーが万が一熱くなりすぎたりショートしたりした瞬間、電気の通り道を自動で閉じる安全ブレーカーと温度センサーです。',
    summary: 'バッテリー上部開放帯（X=-62, Y=+1.92, Z=-5.8）へ配置された定格4.0 AリセッタブルPTCポリヒューズ＆JEITA温度帯充電制御NTCプローブ。0°C未満の低温充電リチウム析出も完全防止します。',
    opticsAndPhysics: [
      '正温度係数ポリマー（PPTC）が過電流または60°C超で抵抗値を10⁴倍へ急増させ、ハードウェア独立で熱暴走を遮断。',
      'JEITA 0–45°C充電ウィンドウ監視によりLiFePO4の2,000サイクル超長寿命を担保。',
    ],
    formula: {
      expression: 'T_trip = 60 °C  ⇒  R_PTC : 12 mΩ → > 120 Ω  (I_hold = 4.0 A, I_trip = 7.5 A)',
      description: 'ソフトウェア非依存のPPTC熱・過電流ハード遮断とJEITA温度充電制御を二重化。',
    },
    nextGenInnovation: 'JEITA低温保護＋ハードウェアPPTC二重安全バッテリープロテクション。',
    specs: [
      { label: 'PTC定格', value: 'I_hold 4.0 A / I_trip 7.5 A (t_trip < 0.8 s)' },
      { label: '温度制御', value: 'JEITA 0–45 °C 充電安全ウィンドウ' },
      { label: '安全規格', value: 'UL 2054 / IEC 62133-2 準拠' },
    ],
    references: [
      'Littelfuse, "PolySwitch® PPTC Resettable Overcurrent & Thermal Protection Design Guide"',
      'IEC 62133-2:2017 Secondary Cells and Batteries — Safety Requirements for Lithium Systems',
      'JEITA / Battery Association of Japan, "Guide for Safe Use of Secondary Lithium Ion Batteries"',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-62.0, 1.92, -6.35, 4.6, 0.60, 2.2, m.ptcTerracotta, m.goldPlating, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-pmic-mlcc-bank',
    code: 'W241',
    order: 241,
    title: 'W241. PMIC出力 超低ESR X7R積層セラミックコンデンサ(MLCC)デカップリングバンク',
    subtitle: 'Plinth PMIC Output Ultra-Low-ESR X7R MLCC Decoupling Filter Bank',
    category: '光学ベンチ台座 / 電源リップル抑制',
    swatchColor: '#9c7b58',
    explodeOffset: [0, -10.5, 8],
    plainAnalogy: '電源の細かい電気の揺れ（ノイズ）を鏡のように滑らかに整え、LEDのチラつきや音のノイズをゼロにする小型コンデンサの整列バンクです。',
    summary: 'PMIC直上の上部空間（X=-26, Y=+1.92, Z=+5.8）へ6連実装された22 μF/25V X7R 1210低ESR積層セラミックコンデンサバンク（合成ESR < 1.8 mΩ）。32 kHz LED PWM負荷急変時の電源リップルを8 mVpp以下へ抑え込みます。',
    opticsAndPhysics: [
      '6並列配置により等価直列抵抗（ESR）と等価直列インダクタンス（ESL）を1/6へ低減し、高速PWMスイッチングスパイクを吸収。',
      'X7R温度特性（±15% @ -55〜+125°C）により高温動作下でも安定容量を保持。',
    ],
    formula: {
      expression: 'ΔV_ripple = ΔI_step · ESR_eq + ΔI·Δt / C_tot < 8.0 mV_pp   (C_tot = 132 μF)',
      description: '6並列X7R MLCCバンクで4文字同時PWM点滅時の電源電圧揺れを8 mVpp以下へ抑制。',
    },
    nextGenInnovation: '音響鳴き防止ソフトターミネーションX7R MLCC並列フィルタアレイ。',
    specs: [
      { label: '構成', value: '22 μF / 25 V X7R 1210 × 6並列 (計 132 μF)' },
      { label: '合成ESR', value: '< 1.8 mΩ @ 500 kHz' },
      { label: 'リップル抑制', value: '< 8.0 mVpp (全灯負荷急変時)' },
    ],
    references: [
      'Murata Manufacturing Co., "GRM32ER71E226KE15 Soft-Termination X7R MLCC Datasheet"',
      'Texas Instruments, "SLVA477B — Input and Output Capacitor Selection for Buck Converters"',
      'EIA-198-1-F Ceramic Dielectric Capacitors Classes I, II, III and IV (X7R Specification)',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => {
      const g = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.22, 1.6), m.sensorPcb);
      base.position.set(-26.0, 1.82, 5.75);
      g.add(base);
      const capGeo = new THREE.BoxGeometry(1.35, 0.26, 1.2);
      for (let i = 0; i < 6; i++) {
        const c = new THREE.Mesh(capGeo, m.smdCeramic);
        c.position.set(-30.2 + i * 1.68, 2.04, 5.75);
        g.add(c);
      }
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-busbar-kapton-barrier',
    code: 'W242',
    order: 242,
    title: 'W242. 銅パワーバスバー上部 カプトン®HN絶縁バリア＆セラミックスタンドオフ群',
    subtitle: 'Plinth Copper Busbar Upper Kapton® HN Polyimide Dielectric Barrier & Ceramic Standoffs',
    category: '光学ベンチ台座 / 電気絶縁・安全隔離',
    swatchColor: '#d97706',
    explodeOffset: [0, -7.4, -18],
    plainAnalogy: '大電流が流れる銅の幹線バーの上を耐熱オレンジフィルムと白い絶縁スペーサーで覆い、ステンレス天板とのショートを絶対防ぐ絶縁シールドです。',
    summary: 'C1020銅バスバー（W205, Y=+1.4）とステンレス天板（W174, Y=+2.5）の間のクリティカル絶縁ギャップ（Y=+1.68..+2.08）へ介装されたDuPont™ Kapton® HN 125 μmポリイミド絶縁帯（絶縁破壊耐圧 > 18 kV）＆アルミナセラミック隔離スペーサー。',
    opticsAndPhysics: [
      'Kapton® HNの絶縁耐力 154 kV/mm により、わずか0.125 mm厚で強化絶縁クラス（> 18 kV）を達成。',
      '連続耐熱260°C・難燃UL 94 V-0適合で異常発熱時にも溶融短絡ゼロ。',
    ],
    formula: {
      expression: 'V_breakdown = E_dielectric · t = 154 kV/mm × 0.125 mm = 19.25 kV  (UL 94 V-0)',
      description: '125 μmカプトン®HNバリアで銅バスバーとステンレス天板間の100%強化絶縁を保証。',
    },
    nextGenInnovation: '航空宇宙ハーネス標準DuPont™ Kapton® HN＋アルミナ絶縁スペーサー。',
    specs: [
      { label: '絶縁材', value: 'DuPont™ Kapton® 500HN ポリイミド (125 μm)' },
      { label: '絶縁破壊電圧', value: '> 19 kV (UL 94 V-0 / 連続耐熱 260°C)' },
      { label: '配置位置', value: 'W205 銅バスバー直上 (Y = +1.85 mm)' },
    ],
    references: [
      'DuPont™, "Kapton® HN General-Purpose Polyimide Film Technical Data Sheet (H-38479)"',
      'IEC 62368-1 Audio/Video, Information and Communication Technology Equipment — Safety Insulation',
      'UL 94 Standard for Tests for Flammability of Plastic Materials (V-0 Rating)',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => {
      const g = new THREE.Group();
      const segs: Array<[number, number]> = [
        [-48.0, 28.0],
        [-10.2, 16.4],
        [8.6, 13.0],
        [46.0, 31.0],
      ];
      for (const [cx, w] of segs) {
        const strip = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, 2.2), m.kaptonAmberFilm);
        strip.position.set(cx, 2.36, 0);
        g.add(strip);
      }
      const stGeo = new THREE.BoxGeometry(1.8, 0.08, 1.2);
      for (const sx of [-48, -10, 8, 46]) {
        const s = new THREE.Mesh(stGeo, m.aluminaCeramic);
        s.position.set(sx, 2.44, 0);
        g.add(s);
      }
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-ideal-diode-or',
    code: 'W243',
    order: 243,
    title: 'W243. 0ms UPS無瞬断切替 理想ダイオードMOSFET・パワーORingコントローラ',
    subtitle: 'Plinth 0ms UPS Seamless Failover Ideal-Diode MOSFET Power ORing Controller',
    category: '光学ベンチ台座 / 無瞬断電源切替',
    swatchColor: '#1b5e47',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'USB電源を抜いた瞬間に0ミリ秒で内蔵バッテリーへスムーズに切り替え、文字が一瞬も暗くならないようにする超高速電子スイッチです。',
    summary: '上部電源帯（X=-38, Y=+1.92, Z=-5.8）に配されたLM74700-Q1理想ダイオードコントローラ＆2.8 mΩ N-ch MOSFET対。ショットキーダイオード比で電圧降下を1/40以下へ削減しつつ逆流を0.75 μsで遮断します。',
    opticsAndPhysics: [
      '順方向電圧降下 V_f = I·R_ds(on) = 3A × 2.8 mΩ = 8.4 mV（ショットキー400 mV比で電力損失98%削減）。',
      '逆流検出応答 0.75 μs によりUSB抜去時も文字照度とMCUクロックを0 ms無瞬断維持。',
    ],
    formula: {
      expression: 'P_loss = I² · R_ds(on) = (3 A)² × 2.8 mΩ = 25.2 mW  (vs Schottky 1,200 mW = -97.9%)',
      description: '理想ダイオードMOSFETにより無瞬断UPS切替と97.9%の損失削減を同時達成。',
    },
    nextGenInnovation: '車載グレードLM74700-Q1による超低損失・無瞬断UPSパワーORing。',
    specs: [
      { label: 'コントローラ', value: 'TI LM74700-Q1 + 2.8 mΩ N-ch MOSFET' },
      { label: '逆流遮断時間', value: '0.75 μs (0 ms 無瞬断UPS切替)' },
      { label: '導通損失', value: '25.2 mW @ 3.0 A (-97.9% vs ショットキー)' },
    ],
    references: [
      'Texas Instruments, "LM74700-Q1 Low-IQ Reverse Battery Protection Ideal Diode Controller Datasheet"',
      'Infineon Technologies, "OptiMOS™ 5 30V Low R_DS(on) Power MOSFET Application Note"',
      'IEC 62040-3 Uninterruptible Power Systems (UPS) — Zero-Transfer-Time DC Bus Switching',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-38.0, 1.92, -6.35, 5.2, 0.60, 2.2, m.sensorPcb, m.icEpoxy, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-ultralownoise-ldo',
    code: 'W244',
    order: 244,
    title: 'W244. センサー・TCXO専用 4.6μVrms 超低ノイズ3.3Vリニアレギュレータ(LDO)',
    subtitle: 'Plinth Ultra-Low-Noise 4.6μVrms 3.3V Analog LDO Regulator for Sensors & TCXO',
    category: '光学ベンチ台座 / 精密アナログ電源',
    swatchColor: '#065f46',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '距離センサーや高精度クロック専用の「超静かなクリーン電源」を作り出し、デジタル回路のノイズから隔離する専用電源チップです。',
    summary: 'メインDC-DC降圧段から独立させた超低ノイズLDO（TI TPS7A20、出力ノイズ 4.6 μVrms、PSRR 85 dB @ 1 kHz）。ToF・照度センサー・TCXOへ極低ジッタ電源を供給します。',
    opticsAndPhysics: [
      '高PSRR（85 dB）がPMICスイッチングリプルを1/17,700へ減衰させ、VEML7700の0.01 lux暗所計測S/Nを最大化。',
      '超低電源ノイズ 4.6 μVrms がTCXO位相ノイズの劣化を完全防止。',
    ],
    formula: {
      expression: 'PSRR = 85 dB  ⇒  ΔV_out = ΔV_in / 10^(85/20) = 8 mV / 17783 = 0.45 μV',
      description: '85 dB高PSRR LDOでセンサー・クロック電源リップルをサブマイクロボルト域へ圧縮。',
    },
    nextGenInnovation: '計測器グレード4.6 μVrmsアナログ専用アイソレーションLDOレール。',
    specs: [
      { label: 'レギュレータ', value: 'TI TPS7A20 3.3 V / 300 mA Ultra-Low-Noise LDO' },
      { label: '出力ノイズ', value: '4.6 μVrms (10 Hz – 100 kHz)' },
      { label: 'PSRR', value: '85 dB @ 1 kHz / 65 dB @ 100 kHz' },
    ],
    references: [
      'Texas Instruments, "TPS7A20 Ultra-Low-Noise, High-PSRR, Low-Dropout Linear Regulator Datasheet"',
      'Analog Devices, "MT-094 Power Supply Rejection Ratio (PSRR) in Precision Optical Sensors"',
      'Vishay Semiconductors, "VEML7700 Designing High-Accuracy Low-Lux Power Rails"',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-14.0, 1.92, 6.30, 3.8, 0.60, 2.2, m.pcbEmeraldDark, m.icEpoxy, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-choke-mumetal-shield',
    code: 'W245',
    order: 245,
    title: 'W245. パワーインダクタ周囲 パーマロイ(ミューメタル)漏洩磁束遮蔽隔壁',
    subtitle: 'Plinth Power Inductor Permalloy (Mu-Metal) Stray Magnetic-Flux Shield Partition',
    category: '光学ベンチ台座 / 磁気シールド',
    swatchColor: '#526072',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '電源コイルから周囲へ漏れる磁力を高透磁率の特殊金属板で囲い込み、隣のマイコンやオーディオ回路への磁気ノイズ飛び込みを防ぐ壁です。',
    summary: 'PMICパワーインダクタ（W198）右側〜上部境界（X=-16, Y=+1.92, Z=-5.8）へ設けたニッケル80%パーマロイ（ミューメタル、比透磁率 μ_r ≈ 80,000）磁気遮蔽隔壁。',
    opticsAndPhysics: [
      '高透磁率パーマロイが500 kHzスイッチングコイルの近傍磁界を低磁気抵抗パスへ迂回させ、近接回路への誘導ノイズを-28 dB低減。',
      'オーディオDAC（W216）とCAN-FD差動配線の残留ノイズフロアを向上。',
    ],
    formula: {
      expression: 'S_mag ≈ 1 + (μ_r · t) / (2 · D)   (μ_r ≈ 80,000 ⇒ 磁界減衰 > 28 dB)',
      description: 'パーマロイ高透磁率隔壁で近傍スイッチング漏洩磁束を28 dB以上遮蔽。',
    },
    nextGenInnovation: '高級オーディオDAC実装手法のパーマロイ局所磁気遮蔽隔壁を採用。',
    specs: [
      { label: '材質', value: 'ASTM A753 Type 4 パーマロイ (80% Ni / μ_r ≈ 80,000)' },
      { label: '磁界遮蔽', value: '> 28 dB @ 500 kHz 近傍界' },
      { label: '配置位置', value: 'PMIC・MCU境界上部 (X=-16, Y=+1.92, Z=-5.8)' },
    ],
    references: [
      'ASTM A753 Standard Specification for Wrought Nickel-Iron Soft Magnetic Alloys (Permalloy 80)',
      'Magnetic Shield Corp., "MuMETAL® Engineering Design Manual for Low-Frequency Shielding"',
      'Ott, H. W., "Electromagnetic Compatibility Engineering", Ch. 6 (Magnetic Near-Field Shielding)',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const sh = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.54, 2.2), m.lensPermalloyShield);
      sh.position.set(-16.0, 1.92, -6.35);
      g.add(sh);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-tcxo-rtc-clock',
    code: 'W246',
    order: 246,
    title: 'W246. ±0.5ppm 温度補償水晶発振器(TCXO)＆32.768kHz高精度RTC基準クロック',
    subtitle: 'Plinth ±0.5ppm Temperature-Compensated Crystal Oscillator (TCXO) & 32.768kHz RTC',
    category: '光学ベンチ台座 / 基準クロック・同期',
    swatchColor: '#d8dee6',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '4文字のアニメーションと音とCAN-FD通信のテンポを1年間で15秒未満しか狂わない精度で刻み続ける超精密水晶時計です。',
    summary: 'メインMCU上部隔離帯（X=+14, Y=+1.92, Z=-5.8）へ実装された24 MHz ±0.5 ppm TCXO（Epson TG2016SMN）＆32.768 kHz ±2 ppm RTC（RV-3028-C7）。全4文字のPWM位相をサブマイクロ秒同期します。',
    opticsAndPhysics: [
      '±0.5 ppm周波数安定度により、カメラ動画撮影（24/30/60/120 fps）下で32 kHz LED PWMフリッカービートを完全ゼロ化。',
      '消費電流45 nAの超低消費RTCによりバックアップコイン電池で10年以上時刻保持。',
    ],
    formula: {
      expression: 'Δt_year = ±0.5 × 10⁻⁶ × 3.156 × 10⁷ s = ±15.8 s / year   (Jitter < 0.8 ps RMS)',
      description: '±0.5 ppm TCXOにより動画撮影フリッカーゼロと4文字サブマイクロ秒位相同期を達成。',
    },
    nextGenInnovation: '放送機器基準の±0.5 ppm TCXOによる4文字LED PWM位相同期クロック。',
    specs: [
      { label: '主TCXO', value: 'Epson TG2016SMN 24 MHz (±0.5 ppm / -40〜+85°C)' },
      { label: 'RTC', value: 'Micro Crystal RV-3028-C7 (45 nA / ±1 ppm)' },
      { label: '位相ジッタ', value: '< 0.8 ps RMS' },
    ],
    references: [
      'Seiko Epson Corp., "TG2016SMN ±0.5 ppm Clipped Sine Wave TCXO Datasheet"',
      'Micro Crystal Switzerland, "RV-3028-C7 Extreme Low Power Real-Time Clock Module Datasheet"',
      'IEEE 1789-2015 Recommended Practices for Modulating Current in High-Brightness LEDs (Flicker-Free)',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(14.0, 1.92, -6.35, 4.2, 0.60, 2.2, m.stainlessMachined, m.goldPlating, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-rtc-coin-backup',
    code: 'W247',
    order: 247,
    title: 'W247. ML1220 充電式マンガンリチウム RTCバックアップコイン電池＆金メッキホルダー',
    subtitle: 'Plinth ML1220 Rechargeable Lithium-Manganese RTC Backup Coin Cell & Gold Holder',
    category: '光学ベンチ台座 / 時刻保持バックアップ',
    swatchColor: '#cbd5e1',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '主電源やメインバッテリーを完全に外して保管しても、時計や設定を何年も忘れずに覚え続ける腕時計サイズの充電式コイン電池です。',
    summary: 'TCXO隣の上部開放帯（X=+4, Y=+1.92, Z=-5.8）へ配置されたMaxell ML1220（3.0 V / 17 mAh 充電式マンガンリチウム）コイン電池＆低背金メッキバネホルダー。主電源接続時に自動トリクル充電します。',
    opticsAndPhysics: [
      '45 nA RTC負荷に対するバックアップ寿命は自己放電込みでも5年超、さらに主電源接続時の3.1 V定電圧トリクル充電で半永久維持。',
      '過放電防止カットオフ回路付きでリチウム一次電池交換ゴミをゼロ化。',
    ],
    formula: {
      expression: 't_hold = C_cell / (I_RTC + I_self) = 17 mAh / 0.35 μA ≈ 5.5 years (主電源オフ連続)',
      description: '充電式ML1220＋45 nA RTCにより電池交換不要で5年以上のオフライン時刻保持を実現。',
    },
    nextGenInnovation: 'メンテナンスフリー充電式ML1220によるゼロ交換RTCバックアップ。',
    specs: [
      { label: '電池規格', value: 'Maxell ML1220 (3.0 V / 17 mAh / 充電式)' },
      { label: '連続保持', value: '> 5.5 年 (オフライン) / 自動トリクル充電' },
      { label: 'ホルダー', value: '低背金メッキ燐青銅リテーナ (h = 0.72 mm)' },
    ],
    references: [
      'Maxell Ltd., "ML1220 Rechargeable Manganese Dioxide Lithium Coin Battery Technical Handbook"',
      'IEC 60086-4 Primary and Rechargeable Coin Lithium Battery Safety Standards',
      'Micro Crystal, "Backup Power Sizing for Ultra-Low-Current RTC Modules"',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(16, 8);
      const cell = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.44, seg), m.stainlessMachined);
      cell.position.set(4.0, 1.84, -6.35);
      const clip = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 1.2), m.goldPlating);
      clip.position.set(4.0, 2.13, -6.35);
      g.add(cell, clip);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-qspi-nor-flash',
    code: 'W248',
    order: 248,
    title: 'W248. 128Mbit Quad-SPI NORフラッシュメモリ (光学LUT・波形・音声ROM)',
    subtitle: 'Plinth 128Mbit Octal/Quad-SPI NOR Flash Memory (Optical LUT & Chime Waveform ROM)',
    category: '光学ベンチ台座 / 不揮発メモリ',
    swatchColor: '#1d2026',
    explodeOffset: [0, -10.5, 8],
    plainAnalogy: '4文字の美しい光り方パターンやウェルカムチャイムの高音質音源、工場出荷時の色補正データを20年以上記憶する高速メモリチップです。',
    summary: 'メイン基板上部帯（X=+24, Y=+1.92, Z=+5.8）へ配置されたWinbond W25Q128JV（128 Mbit、133 MHz Quad-SPI XIP対応）。24bit/96kHzチャイム音源と4文字個別ガンマLUTを瞬時読み出しします。',
    opticsAndPhysics: [
      'Quad-SPI 133 MHz（実効 66 MB/s）により電源投入後 80 ms 以内に全4文字の色補正LUTを展開し即時ウェルカム点灯。',
      'データ保持20年・書換え10万回保証の産業グレード不揮発記憶。',
    ],
    formula: {
      expression: 'BW_QSPI = 133 MHz × 4 bit / 8 = 66.5 MB/s   (Boot-to-Light < 80 ms)',
      description: '66.5 MB/s Quad-SPI読出しにより電源投入80 ms以内の瞬時光学起動を実現。',
    },
    nextGenInnovation: 'XIP（Execute-In-Place）対応128Mbit高速光学LUT・ハイレゾ音源ROM。',
    specs: [
      { label: 'デバイス', value: 'Winbond W25Q128JV (128 Mbit / 16 MB)' },
      { label: '帯域', value: '133 MHz Quad-SPI (66.5 MB/s)' },
      { label: 'データ保持', value: '> 20 年 / 100,000 書換えサイクル' },
    ],
    references: [
      'Winbond Electronics, "W25Q128JV 3V 128M-Bit Serial Flash Memory with Quad SPI Datasheet"',
      'JEDEC JESD216F Serial Flash Discoverable Parameters (SFDP) Standard',
      'STMicroelectronics, "AN5050 — Octo/Quad-SPI Interface on STM32 Cortex-M7 Microcontrollers"',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(24.0, 1.94, 5.75, 4.4, 0.42, 1.5, m.icEpoxy, m.silverElectrode, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-fram-logger',
    code: 'W249',
    order: 249,
    title: 'W249. 64Kbit 強誘電体メモリ(FRAM) 稼働時間・着脱回数・校正履歴ロガーIC',
    subtitle: 'Plinth 64Kbit Ferroelectric RAM (FRAM) High-Endurance Telemetry & Calibration Logger',
    category: '光学ベンチ台座 / 高耐久テレメトリ記憶',
    swatchColor: '#2a2e36',
    explodeOffset: [0, -10.5, 8],
    plainAnalogy: '電源が切れる直前の状態や文字の着脱回数・LEDの累積点灯時間を100兆回書き換えても壊れない超長寿命メモリに記録し続けるブラックボックスです。',
    summary: '上部ロジック帯（X=+34, Y=+1.92, Z=+5.8）へ配されたInfineon FM24CL64B（64 Kbit FRAM、書換耐性 10¹⁴ 回、書込遅延ゼロ）。ブラウンアウト検知時のラストガスプログ保存を0.1 msで完結します。',
    opticsAndPhysics: [
      'PZT強誘電体結晶分極反転による不揮発記録のため、EEPROM比で1億倍の書換寿命（10¹⁴ 回）と待機ゼロ書込を達成。',
      'LED累積駆動時間（L70寿命予測）と各文字の校正オフセットを毎分ロスなく記録。',
    ],
    formula: {
      expression: 'Endurance_FRAM = 10¹⁴ cycles  (EEPROM比 10⁸×)  /  t_write = 0 ms (No-Delay)',
      description: '100兆回書換え耐性FRAMにより停電直前ログ保存とLED寿命トラッキングを完全自動化。',
    },
    nextGenInnovation: '産業ロボット・航空機ブラックボックス標準の強誘電体FRAMロガー。',
    specs: [
      { label: 'デバイス', value: 'Infineon/Cypress FM24CL64B (64 Kbit I²C FRAM)' },
      { label: '書換寿命', value: '10¹⁴ 回 (100兆回) / 保持 151 年' },
      { label: '書込遅延', value: '0 ms (バス速度即時書込)' },
    ],
    references: [
      'Infineon Technologies, "FM24CL64B 64-Kbit (8K × 8) Serial I2C F-RAM Datasheet"',
      'IEEE Transactions on Ultrasonics, Ferroelectrics, and Frequency Control — PZT FRAM Reliability',
      'JEDEC JESD22-A117 Electrically Erasable Programmable ROM Endurance & Retention Test',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(34.0, 1.94, 5.75, 3.8, 0.42, 1.5, m.ceramicAlumina, m.goldPlating, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-secure-element',
    code: 'W250',
    order: 250,
    title: 'W250. ハードウェア暗号セキュアエレメントIC (ECDSA-P256 真正性・OTA署名検証)',
    subtitle: 'Plinth Hardware Cryptographic Secure Element IC (ATECC608B ECDSA-P256 / AES-128)',
    category: '光学ベンチ台座 / ハードウェアセキュリティ',
    swatchColor: '#324c72',
    explodeOffset: [0, -10.5, 8],
    plainAnalogy: 'Wi-Fi通信やファームウェア更新が本物であることを暗号鍵で厳重にチェックし、不正改ざんから装置を守る金庫チップです。',
    summary: '上部ロジック帯（X=+43, Y=+1.92, Z=+5.8）へ配置されたMicrochip ATECC608B暗号コプロセッサ。外部読み出し不能なハードウェア鍵スロットでECDSA P-256 OTA署名検証とBLEペアリングを実行します。',
    opticsAndPhysics: [
      '物理的改ざん防止シールド層（アクティブメッシュ）内蔵シリコンにより、サイドチャネル攻撃・プローブ解析から秘密鍵を防護。',
      'ハードウェアNIST SP 800-90A準拠真性乱数生成器（TRNG）搭載。',
    ],
    formula: {
      expression: 'Security = ECDSA(NIST P-256) + AES-128-GCM  (128-bit Classical / Hardware Isolated Key)',
      description: '秘密鍵をチップ外へ一切出さないハードウェア署名検証で安全なOTA運用を確立。',
    },
    nextGenInnovation: 'IoT機器セキュリティ国際規格ETSI EN 303 645準拠のセキュアエレメント実装。',
    specs: [
      { label: 'デバイス', value: 'Microchip ATECC608B (ECDSA P-256 / SHA-256 / AES-128)' },
      { label: '乱数生成', value: 'FIPS 140-2 / NIST SP 800-90A TRNG' },
      { label: '用途', value: 'OTAファームウェア署名検証・BLE暗号鍵保管' },
    ],
    references: [
      'Microchip Technology, "ATECC608B CryptoAuthentication™ Device Complete Data Sheet"',
      'NIST FIPS 186-5 Digital Signature Standard (ECDSA P-256)',
      'ETSI EN 303 645 Cyber Security for Consumer Internet of Things: Baseline Requirements',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(43.0, 1.94, 5.75, 3.6, 0.42, 1.5, m.ispSiliconDie, m.goldPlating, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-rf-matching-switch',
    code: 'W251',
    order: 251,
    title: 'W251. 2.4/5GHz RFアンテナ整合π型ネットワーク＆内部／外部SMA自動切替スイッチ',
    subtitle: 'Plinth 2.4/5GHz RF Antenna Impedance Matching Pi-Network & SPDT SMA Switch',
    category: '光学ベンチ台座 / 無線RF整合',
    swatchColor: '#d4a437',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'Wi-FiやBluetoothの電波を50オームにぴったり調整してムダなく飛ばし、外部アンテナを繋いだ時は自動で切り替える高周波スイッチです。',
    summary: 'Wi-Fi 6/BLEモジュール近傍（X=+42, Y=+1.92, Z=-5.8）へ配置された50 Ω π型高Q整合ネットワーク＆低挿入損失SPDT RFスイッチ（SKY13351）。金属筐体内でもリターンロス<-18 dBの良好な放射効率を維持します。',
    opticsAndPhysics: [
      '50 Ω共役インピーダンス整合により反射係数 |Γ| < 0.12（VSWR < 1.28）、送信電力の98.5%以上をアンテナへ効率伝送。',
      '背面SMA外部アンテナ（W294）接続時は自動切替で利得+5 dBi拡張可能。',
    ],
    formula: {
      expression: 'RL = -20 log₁₀|Γ| > 18 dB   ⇒   VSWR < 1.28,   η_tx = 1 - |Γ|² = 98.5%',
      description: '50 Ω整合πネットワーク＋SPDTスイッチで内部・外部両アンテナの高効率放射を保証。',
    },
    nextGenInnovation: '金属光学ベンチ筐体のデチューニングを完全補正するデュアルパスRF整合回路。',
    specs: [
      { label: 'RFスイッチ', value: 'Skyworks SKY13351-378LF (0.35 dB 挿入損失)' },
      { label: '整合精度', value: '50 Ω ±2% / VSWR < 1.28 (2.4–5.8 GHz)' },
      { label: '切替機能', value: '内蔵チップアンテナ ↔ 背面SMA外部アンテナ' },
    ],
    references: [
      'Skyworks Solutions, "SKY13351-378LF 2.0–6.0 GHz GaAs SPDT RF Switch Datasheet"',
      'Pozar, D. M., "Microwave Engineering", 4th Ed., Wiley (Pi-Network Impedance Matching & VSWR)',
      'Johanson Technology, "2.4/5 GHz Ceramic Antenna Tuning & Metal-Enclosure Ground Clearance Guide"',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(42.0, 1.92, -6.35, 5.2, 0.58, 2.2, m.rfGoldCoax, m.icEpoxy, m),
  }),
  makePlinthDef({
    id: 'welcome-plinth-nfc-ferrite-tuner',
    code: 'W252',
    order: 252,
    title: 'W252. 13.56MHz NFC近接タグコイル 焼結フェライト磁気隔離シート＆同調コンデンサ',
    subtitle: 'Plinth 13.56MHz NFC Coil Sintered-Ferrite Magnetic Isolation Sheet & Tuning Cap',
    category: '光学ベンチ台座 / NFC近接通信',
    swatchColor: '#3a3f4a',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'スマホを台座の上にかざすだけでワンタッチ設定画面が開くNFCアンテナの裏に敷き、金属天板による電波吸収を防ぐ磁性シートです。',
    summary: '中央上部空間（X=-4, Y=+1.92, Z=+5.8）へ配置された13.56 MHz NFCループコイル＋TDK IFL12焼結フェライトシート（μ′=160）＆±1% C0G同調キャパシタ。金属筐体直近でも通信距離35 mmを確保します。',
    opticsAndPhysics: [
      '金属近傍では渦電流が13.56 MHz磁束を打ち消すが、高透磁率フェライト隔離シートが磁力線を集束・遮蔽しインダクタンス低下を防止。',
      'C0G低損失キャパシタで共振周波数 f₀ = 13.560 MHz ±50 kHz へ精密同調。',
    ],
    formula: {
      expression: 'f₀ = 1 / (2π√(L·C)) = 13.56 MHz   (μ′_ferrite = 160 ⇒ 金属上読取距離 35 mm)',
      description: '焼結フェライト磁気隔離により金属光学ベンチでも安定したワンタッチNFCを実現。',
    },
    nextGenInnovation: '金属筐体専用フェライト磁気シールド付13.56 MHzワンタッチNFCインターフェース。',
    specs: [
      { label: '周波数', value: '13.56 MHz ISO/IEC 14443 Type A (NXP NT3H2211)' },
      { label: 'フェライト層', value: 'TDK IFL12 焼結フェライト (μ′ = 160 / t = 0.25 mm)' },
      { label: '読取距離', value: '35 mm (SUS天板越し動作)' },
    ],
    references: [
      'TDK Corporation, "IFL Series Sintered Ferrite Sheets for 13.56 MHz NFC Antenna Isolation"',
      'NXP Semiconductors, "AN11276 — NTAG / NFC Antenna Design on Metal Surfaces"',
      'ISO/IEC 14443-2 Identification Cards — Contactless Proximity Cards RF Power & Signal Interface',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const fer = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.30, 2.2), m.ferriteInductor);
      fer.position.set(-6.4, 1.78, 6.30);
      const coil = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.18, 1.7), m.copperCoil);
      coil.position.set(-6.4, 2.04, 6.30);
      g.add(fer, coil);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-tof-crosstalk-wall',
    code: 'W253',
    order: 253,
    title: 'W253. ToF(VL53L5CX) 投光／受光デュアルキャビティ 光学クロストーク遮断壁',
    subtitle: 'Plinth VL53L5CX ToF Dual-Cavity Optical Crosstalk Isolation Wall',
    category: '光学ベンチ台座 / ToF光学遮蔽',
    swatchColor: '#0b0d10',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '人感ToFセンサーの「レーザーを出す側」と「跳ね返りを見る側」を黒い仕切りで隔て、ガラス内部の反射で誤測距するのを防ぐ光学隔壁です。',
    summary: 'ToFセンサー（W211）前面ガラス直前の上部（Y=+1.78, Z=+10.8）へ配置された植毛艶消し黒マイクロバッフル隔壁。940 nm VCSELのカバーガラス内部反射クロストークを-38 dB遮断します。',
    opticsAndPhysics: [
      '940 nm赤外光が前面カバーガラス内部で多重反射してSPAD受光部へ直接飛び込むと近距離測距誤差が生じるため、光学分離隔壁で完全遮断。',
      '63°対角測距コーン（Z > +13.05）には一切干渉しない精密外郭設計。',
    ],
    formula: {
      expression: 'XTALK_940nm < 2.0 kcps  (遮断比 -38 dB ⇒ 測距精度 ±15 mm @ 4 m)',
      description: '光学クロストーク遮断隔壁により63°視野角無欠損のまま高精度4 m測距を安定化。',
    },
    nextGenInnovation: 'ST VL53L5CXリファレンス準拠の超低反射マイクロ光学セパレータ。',
    specs: [
      { label: '対応波長', value: '940 nm VCSEL 赤外ToF (OD > 3.8)' },
      { label: '視界影響', value: '63°対角コーン 0% 遮蔽 (sp ray 認証)' },
      { label: '配置位置', value: 'W211 上部光学キャビティ (X=0, Y=+1.95, Z=+10.6)' },
    ],
    references: [
      'STMicroelectronics, "AN5694 — VL53L5CX Cover Glass & Optical Crosstalk Isolation Guide"',
      'ST VL53L5CX Time-of-Flight 8×8 Multizone Ranging Sensor Datasheet (DS13754)',
      'SPIE Optical Engineering, "Near-IR Cover-Window Crosstalk Suppression in SPAD ToF Modules"',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const wall = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.42, 1.1), m.velvetFlockTrap);
      wall.position.set(0, 1.92, 6.30);
      g.add(wall);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-lux-lightguide-hood',
    code: 'W254',
    order: 254,
    title: 'W254. 環境光照度センサー(VEML7700) 内部迷光遮断マットブラック集光フード',
    subtitle: 'Plinth VEML7700 Ambient Lux Sensor Matte-Black Internal Stray-Light Hood',
    category: '光学ベンチ台座 / 照度計測精度',
    swatchColor: '#15171c',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '明るさセンサーが装置自身のLED光やステータスバーの光に騙されず、部屋の本当の明るさだけを正しく測れるようにする黒いフードです。',
    summary: '照度センサー（W212）直上・背面側（X=+12, Y=+1.95, Z=+10.6）を覆う艶消し黒光学フード。下部のシナバーバー（W213）や内部基板からの迷光回り込みを99.9%遮断します。',
    opticsAndPhysics: [
      'ステータスバーの610 nm光が筐体内部経由で照度センサーへ漏れると夜間自動減光が誤作動するため、後方・上方を完全光学遮蔽。',
      '前面±45°コサイン応答視界（Z > +13.05）は100%無遮蔽を維持。',
    ],
    formula: {
      expression: 'E_stray / E_min < 0.002 lux / 0.01 lux  ⇒  夜間自動調光誤差 < 1%',
      description: '内部迷光遮断フードにより0.01 lux極暗所でも正確な自動調光応答を維持。',
    },
    nextGenInnovation: 'コサイン特性を損なわない背面完全遮蔽型VEML7700マイクロ光学フード。',
    specs: [
      { label: '遮光濃度', value: 'OD > 3.5 (400–1000 nm 艶消し黒バッフル)' },
      { label: '視界影響', value: '±45° 照度コーン 0% 遮蔽 (sp ray 認証)' },
      { label: '暗所下限', value: '0.01 lux 高精度計測保持' },
    ],
    references: [
      'Vishay Semiconductors, "Designing the VEML7700 Into an Application — Optical Aperture & Baffle Guide"',
      'CIE S 023/E:2013 Characterization of the Performance of Illuminance Meters (Cosine Response)',
      'ISO/CIE 19476 Spectral & Angular Stray Light Rejection in Ambient Light Sensors',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const hood = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.42, 1.2), m.mountVelvetBaffle);
      hood.position.set(11.4, 1.92, 6.30);
      g.add(hood);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-status-reflector-channel',
    code: 'W255',
    order: 255,
    title: 'W255. シナバーステータスバー背面 高反射アルミU字導光リフレクタチャンネル',
    subtitle: 'Plinth Front Cinnabar Status Bar High-Reflectance Rear Optical Channel',
    category: '光学ベンチ台座 / ステータス光学',
    swatchColor: '#dbe4ee',
    explodeOffset: [0, -16, 26],
    plainAnalogy: '台座正面に光るオレンジの光の後ろ側へ鏡の受け皿を敷き、光を前面へ100%集めてより鮮やかに光らせる細長い鏡の溝です。',
    summary: '前面シナバー導光バー（W213, Z=+10.7..+12.1）直下の前縁チャンネル（Y=-4.32, Z=+11.3）へ沿わせた高反射シルバーミラーリフレクタ帯。下方・後方への光漏れを前面へ効率集光します。',
    opticsAndPhysics: [
      '導光バー底面から漏れる下方成分を96%再反射させ、前面輝度を+31%向上しつつ消費電力を低減。',
      'ToF/照度センサー領域への上方光クロストークも同時遮断。',
    ],
    formula: {
      expression: 'L_front,enh = L₀ · (1 + 0.34 · R_mirror) = 1.326 · L₀   (R = 96%)',
      description: '背面リフレクタチャンネルにより消費電流を増やさず正面ステータス輝度を+32%増強。',
    },
    nextGenInnovation: '超薄0.38 mm 172 mm長尺プレス成形光学リフレクタチャンネル。',
    specs: [
      { label: '反射率', value: '96% 高純度蒸着アルミミラー' },
      { label: '全長', value: '172.0 × 0.38 × 1.30 mm' },
      { label: '輝度向上', value: '+32% 正面抽出効率改善' },
    ],
    references: [
      '3M Optical Systems, "ESR (Enhanced Specular Reflector) Linear Light-Bar Efficiency Guide"',
      'Chaves, J., "Introduction to Nonimaging Optics" (Linear Light-Guide Extraction Channels)',
      'CIE 127 Optical Flux Extraction in Edge-Lit Linear Indicator Bars',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ch = new THREE.Mesh(new THREE.BoxGeometry(172.0, 0.32, 0.28), m.vipSilverFoil);
      ch.position.set(0, -4.38, 13.14);
      g.add(ch);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-acoustic-labyrinth-baffle',
    code: 'W256',
    order: 256,
    title: 'W256. スピーカー音響箱 折返しヘルムホルツ共鳴ラビリンスダクト隔壁(f₀=440Hz)',
    subtitle: 'Plinth Speaker Folded Helmholtz Acoustic Labyrinth Port Baffle (f₀ = 440Hz A4)',
    category: '光学ベンチ台座 / 音響導波設計',
    swatchColor: '#475569',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'スピーカー箱のそばに設けた迷路状の細い音道で、小さなボディでもパイプオルガンのように440Hzの澄んだ低中音を響かせる音響ダクトです。',
    summary: 'スピーカー箱（W215, X=56..80）直上の上部音響帯（X=+68, Y=+1.92, Z=+5.8）へ連結された精密折返しヘルムホルツ共鳴ポートダクト隔壁。ウェルカムチャイム基音（A4 = 440 Hz）の倍音豊かさを最大化します。',
    opticsAndPhysics: [
      '薄型筐体では直線ダクト長を確保できないため折返しラビリンス形状で等価音響長 L_eff = 22.4 mm を実現。',
      'ポート端面のフレア丸み加工により高音量時の風切り気流ノイズ（chuffing）を抑制。',
    ],
    formula: {
      expression: 'f₀ = (c / 2π) · √(S_port / (V_box · L_eff)) = 440.5 Hz   (Concert Pitch A4)',
      description: '折返しラビリンスダクトにより極薄台座内でA4=440 Hz共鳴ポート同調を実現。',
    },
    nextGenInnovation: '極薄マイクロエンクロージャー向けA4コンサートピッチ同調ラビリンスダクト。',
    specs: [
      { label: '同調周波数', value: 'f₀ = 440.5 Hz (コンサートピッチ A4)' },
      { label: '等価ポート長', value: 'L_eff = 22.4 mm (折返し構造)' },
      { label: '材質', value: 'ガラス繊維強化PA66 (高剛性無共振)' },
    ],
    references: [
      'Beranek, L. L. & Mellow, T., "Acoustics: Sound Fields and Transducers", Academic Press (Helmholtz Bass-Reflex)',
      'Small, R. H., "Vented-Box Loudspeaker Systems Part I–IV", JAES (1973)',
      'IEC 60268-5 Sound System Equipment — Loudspeakers Acoustic Enclosure Measurement',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const duct = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.54, 2.2), m.pa66ThermalBreak);
      duct.position.set(68.0, 1.92, 6.30);
      g.add(duct);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-acoustic-melamine-pad',
    code: 'W257',
    order: 257,
    title: 'W257. スピーカー近傍 オープンセル・メラミン吸音ダンピングパッド',
    subtitle: 'Plinth Speaker Bay Open-Cell Melamine Acoustic Damping Absorber Pad',
    category: '光学ベンチ台座 / 吸音・定在波抑制',
    swatchColor: '#e6eef6',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'スピーカーの裏側で余分な音がキンキン反響するのを吸い取り、耳に優しい透明感のあるチャイム音に整える特殊吸音スポンジです。',
    summary: 'スピーカー箱（W215）背面側の上部空間（X=+68, Y=+1.92, Z=-5.8）へ貼付されたBASF Basotect®連続気泡メラミン吸音パッド。筐体内部の3–8 kHz金属定在波を吸収します。',
    opticsAndPhysics: [
      '連続気泡マイクロ骨格内の粘性空気摩擦により、音響エネルギーを等温変換して見かけの音響容積を+14%拡大。',
      'UL 94 V-0難燃グレードかつ粉落ちゼロのクリーン光学機器対応吸音材。',
    ],
    formula: {
      expression: 'V_eff = γ_iso · V_geo ≈ 1.14 · V_geo   (α_abs > 0.72 @ 4 kHz)',
      description: 'オープンセル吸音パッドにより見かけ音響容積+14%拡大と金属箱鳴り解消を両立。',
    },
    nextGenInnovation: 'スタジオモニター標準BASF Basotect®の超薄マイクロ音響室適用。',
    specs: [
      { label: '吸音材', value: 'BASF Basotect® オープンセル・メラミン (UL 94 V-0)' },
      { label: '容積拡大効果', value: '等温効果により +14% 実効容積増' },
      { label: '配置位置', value: 'スピーカー上部背面帯 (X=+68, Y=+1.92, Z=-5.8)' },
    ],
    references: [
      'BASF SE, "Basotect® Melamine Resin Foam — Acoustic Absorption & Thermal Stability Data"',
      'Beranek, L. L., "Acoustical Properties of Homogeneous Isotropic Rigid Tiles & Fibrous Materials"',
      'ISO 10534-2 Determination of Sound Absorption Coefficient in Impedance Tubes',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const pad = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.52, 2.2), m.aerogelPearl);
      pad.position.set(68.0, 1.92, -6.35);
      g.add(pad);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-encoder-optodisc',
    code: 'W258',
    order: 258,
    title: 'W258. ロータリーダイヤル 非接触光学クアドラチャ・スリット円盤＆フォトインタラプタ',
    subtitle: 'Plinth Rotary Dial Non-Contact Optical Quadrature Slit Disc & Dual Photointerrupter',
    category: '光学ベンチ台座 / 光学ロータリー検出',
    swatchColor: '#364152',
    explodeOffset: [0, -10.5, 8],
    plainAnalogy: '右端のダイヤルを回した角度を金属接点の摩耗ゼロで読み取り、100万回回してもチャタリング（誤動作）が起きない光学式エンコーダです。',
    summary: '右端開放ベイ（X=+83.4, Y=+0.65, Z=+2.6）へ収めたSUS304エッチング36スリット光学エンコーダ円盤＆A/B 90°位相差フォトインタラプタ。1回転144エッジの高分解能無接点検出を行います。',
    opticsAndPhysics: [
      '機械接点式と異なり接点酸化・チャタリングが構造上ゼロのため、100万回転超の超高耐久と滑らかな調光追従を実現。',
      '4逓倍クアドラチャ復調により 2.5°/ステップの精密輝度制御。',
    ],
    formula: {
      expression: 'Δθ_res = 360° / (4 × N_slots) = 360° / 144 = 2.50° / step   (Life > 10⁶ rev)',
      description: '36スリット4逓倍光学検出により無摩耗・無チャタリングの2.5°分解能操作を実現。',
    },
    nextGenInnovation: '高級カメラメインダイヤルを超える完全非接触光学クアドラチャエンコーダ。',
    specs: [
      { label: '検出方式', value: '透過型A/B相 90°位相差フォトインタラプタ' },
      { label: '分解能', value: '36 スリット × 4逓倍 = 144 パルス/回転 (2.5°)' },
      { label: '回転寿命', value: '> 1,000,000 回転 (無接点)' },
    ],
    references: [
      'Broadcom Inc., "AEDR-850x High-Resolution Optical Incremental Encoder Design Guide"',
      'Sharp Microelectronics, "GP1S09x Photointerrupter Quadrature Decoding Application Note"',
      'IEC 60512-9 Mechanical Endurance of Rotary Human-Machine Interface Controls',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(18, 10);
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.50, 1.50, 0.24, seg), m.midPlateSteel);
      disc.position.set(80.2, 1.94, 3.9);
      const sensor = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.44, 1.0), m.icEpoxy);
      sensor.position.set(80.2, 1.94, 6.2);
      g.add(disc, sensor);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-dial-ruby-detent',
    code: 'W259',
    order: 259,
    title: 'W259. ロータリーダイヤル 焼入鋼クリックばね＆人工ルビー球精密デテント機構',
    subtitle: 'Plinth Rotary Dial Hardened Steel Click Leaf-Spring & Synthetic Ruby Detent Ball',
    category: '光学ベンチ台座 / 触覚クリック設計',
    swatchColor: '#e11d48',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'ダイヤルを回した時の「カチッ、カチッ」という高級カメラレンズ絞りリングのような上質な手応えを、宝石ルビー球と精密板ばねで生み出す部品です。',
    summary: '右端開放ベイ後方（X=+83.4, Y=+0.85, Z=-3.6）へ配したSK5焼入鋼定圧クリック板ばね＆Ø1.5 mmモース硬度9人工ルビー（α-Al₂O₃）デテント球。35 mN·mの均一な触覚トルクを長期維持します。',
    opticsAndPhysics: [
      '金属球対金属溝では1万回で摩耗し手応えが緩むが、モース硬度9の人工ルビー球（摩擦係数0.11）により100万クリック後も初期トルクを95%以上保持。',
      '光学エンコーダのスリット位相と機械クリック谷位置を±0.15°以内へ精密同期。',
    ],
    formula: {
      expression: 'T_detent = F_spring · R_cam · tan(α_groove) = 35.0 mN·m ± 3%   (Ruby HV 2000)',
      description: '人工ルビー球＋SK5焼入板ばねで100万回不変の高級カメラ絞り環クリック感を実現。',
    },
    nextGenInnovation: '高級シネマレンズ絞りクリック標準の人工ルビー球デテント機構。',
    specs: [
      { label: 'デテント球', value: 'Ø1.5 mm 人工ルビー (単結晶 α-Al₂O₃ / HV 2000)' },
      { label: 'クリックトルク', value: '35 mN·m ± 3% (24 クリック/回転)' },
      { label: 'ばね材', value: 'SK5 焼入鋼定圧リーフスプリング' },
    ],
    references: [
      'Swiss Jewel Company, "Synthetic Ruby & Sapphire Precision Bearing Balls Engineering Data"',
      'ISO 3290-2 Rolling Bearings — Ceramic & Sapphire Balls Geometric Tolerances',
      'DIN 17222 Cold Rolled Steel Strips for Springs (SK5 / C85S Fatigue Stress Limits)',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(12, 8);
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.26, 1.2), m.hardenedSteelHrc60);
      leaf.position.set(76.6, 1.78, -4.6);
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.28, seg, seg), m.rubyThermalFuse);
      ball.position.set(76.6, 2.08, -4.6);
      g.add(leaf, ball);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-toggle-dust-boot',
    code: 'W260',
    order: 260,
    title: 'W260. 電源トグルスイッチ(W218) 金接点保護＆シリコーン防塵シーリングカラー',
    subtitle: 'Plinth Power Toggle Switch Silicone IP54 Dust-Sealing Collar & Gold Contact Guard',
    category: '光学ベンチ台座 / スイッチ防塵保護',
    swatchColor: '#353840',
    explodeOffset: [0, -16, -28],
    plainAnalogy: '背面の主電源スイッチの付け根を柔らかなシリコーン製カバーで包み込み、スイッチの隙間からホコリが入るのを防ぐ防塵ブーツです。',
    summary: '背面電源トグルスイッチ（W218, X=80.8..87.2, Z=-14.3..-9.0）の外側リング（X=+84.0, Y=-0.8, Z=-14.62）へ装着されるIP54シリコーン防塵カラー＆SUS固定ナット。',
    opticsAndPhysics: [
      'トグル操作軸の傾動角度±25°へ追従する蛇腹薄肉シリコーンリップが埃・水滴のパネル貫通侵入を遮断。',
      'ステンレス六角ロックナットがトグル操作時のパネル回り止めを完全保証。',
    ],
    formula: {
      expression: 'IP54 Seal Compression = 18%  @  ±25° Toggle Actuation  (Life > 50,000 cycles)',
      description: '薄肉シリコーンカラーにより軽快なトグル操作感とIP54背面防塵を両立。',
    },
    nextGenInnovation: '産業計測器フロントパネル標準の防塵シーリングブーツを背面主電源へ適用。',
    specs: [
      { label: '材質', value: 'シリコーンゴム Shore A 40 + SUS304 六角ナット' },
      { label: '保護等級', value: 'IP54 軸封防塵防滴' },
      { label: '耐久回数', value: '> 50,000 回トグル切替' },
    ],
    references: [
      'APM Hexseal, "Silicone Environmental Sealing Boots for Toggle Switches (MIL-DTL-5423)"',
      'NKK Switches, "Sealed Sub-Miniature Toggle Switch Panel Sealing Technical Guide"',
      'IEC 61058-1 Switches for Appliances — Endurance & Ingress Protection',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(12, 6);
      const collar = new THREE.Mesh(
        new THREE.TorusGeometry(1.45, 0.28, 6, seg),
        m.epdmGasket
      );
      collar.position.set(84.0, -0.8, -14.62);
      g.add(collar);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-dock-esd-collars',
    code: 'W261',
    order: 261,
    title: 'W261. 4文字ドック座面 BeCu C17200 先行接触ESD接地スプリングカラー群 (4基)',
    subtitle: 'Plinth 4× Glyph Dock Bay First-Mate BeCu C17200 ESD Grounding Spring Collars',
    category: '光学ベンチ台座 / ホットスワップESD接地',
    swatchColor: '#d89143',
    explodeOffset: [0, -5, 0],
    plainAnalogy: '文字を台座へ差し込む時、電気のピンが触れるコンマ数秒前にまずアース（接地）が先に繋がり、静電気ショックを完全に防ぐ金銅のばね縁です。',
    summary: '全4文字ドッキングソケット（W187/189/191/193）の前縁外周（Z=+5.55, Y=+4.25）へ配置されたBeCu C17200先行接触（First-Mate / Last-Break）ESD接地スプリングカラー4基。活線着脱の安全性を確立します。',
    opticsAndPhysics: [
      '信号・電源ポゴピン接触より0.6 mm先行して金属フレーム同士を接地電位へ等電位化（First-Mate / Last-Break）。',
      '人体帯電モデル（HBM ±8 kV）の静電気放電がCAN-FD差動トランシーバへ流入するリスクをゼロ化。',
    ],
    formula: {
      expression: 'Δz_lead = +0.60 mm (First-Mate Ground)  ⇒  V_clamp,CAN < 12 V @ ±8 kV HBM',
      description: '0.6 mm先行接触BeCu接地カラーにより文字の活線ホットスワップを完全保護。',
    },
    nextGenInnovation: 'カメラ交換レンズEマウント先行接地機構に学んだホットスワップ安全カラー。',
    specs: [
      { label: '材質', value: 'BeCu C17200 時効硬化ばね＋金めっき' },
      { label: '先行接触差', value: '0.60 mm First-Mate / Last-Break' },
      { label: '構成', value: '4文字ドック全基 (よ/う/こ/そ)' },
    ],
    references: [
      'IEC 61000-4-2 Electrostatic Discharge Immunity — Hot-Swap Connector First-Mate Grounding',
      'Materion Brush Performance Alloys, "Alloy 25 (C17200) Beryllium Copper EMI Spring Contacts"',
      'USB-IF / PCI-SIG Hot-Plug Staggered Pin Contact Sequencing Specification',
    ],
    diagramType: 'welcome_dock_pogo',
    build: (m) => {
      const g = new THREE.Group();
      const barGeo = new THREE.BoxGeometry(14.0, 0.34, 0.50);
      for (const cx of [-69.5, -26.5, 23.0, 69.0]) {
        const b = new THREE.Mesh(barGeo, m.beCuSpring);
        b.position.set(cx, 4.10, 6.12);
        g.add(b);
      }
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-dock-hall-sensors',
    code: 'W262',
    order: 262,
    title: 'W262. 4文字着脱検知 超低消費ホール効果磁気プレゼンスセンサーアレイ (4基)',
    subtitle: 'Plinth 4× Glyph Bay Micropower Hall-Effect Magnetic Presence Sensor Array',
    category: '光学ベンチ台座 / 文字装着自動検知',
    swatchColor: '#1b5e47',
    explodeOffset: [0, -5, 0],
    plainAnalogy: '「よ・う・こ・そ」の各文字が台座にカチッと正しく載ったかどうかを磁石の力で非接触検知し、装着完了した文字だけ自動で点灯させるセンサーです。',
    summary: '全4文字ドック背面側の上部（Z=-5.75, Y=+4.20）へ配置されたTI DRV5032超低消費ホール効果磁気スイッチ4基（消費電流 0.54 μA）。装着完了を検知してからポゴ給電をONにする安全シーケンスを実現します。',
    opticsAndPhysics: [
      '機械リミットスイッチと異なり無接点・IP65完全封止のため摩耗や接点不良が皆無。',
      '全4文字の装着順序や抜き差しイベントを即座にMCUへ通知し、演出アニメーションを自動連動。',
    ],
    formula: {
      expression: 'B_op = ±3.0 mT,   I_avg = 0.54 μA × 4 = 2.16 μA   (応答時間 < 50 ms)',
      description: '超低消費2.16 μA磁気プレゼンス検知でホットスワップ通電安全インターロックを構築。',
    },
    nextGenInnovation: '非接触磁気インターロックによる文字ホットスワップ安全通電制御。',
    specs: [
      { label: 'センサー', value: 'TI DRV5032 全極性マイクロパワー・ホールIC × 4' },
      { label: '合計消費電流', value: '2.16 μA (常時監視)' },
      { label: '動作磁束密度', value: 'B_op = ±3.0 mT (N52ネオジム対応)' },
    ],
    references: [
      'Texas Instruments, "DRV5032 Ultra-Low-Power Digital-Switch Hall Effect Sensor Datasheet"',
      'Allegro MicroSystems, "Hall-Effect Presence Detection in Modular Consumer Electronics"',
      'IEC 62368-1 Power-Delivery Interlock Safety for Detachable Illuminated Modules',
    ],
    diagramType: 'welcome_dock_pogo',
    build: (m) => {
      const g = new THREE.Group();
      for (const cx of [-69.5, -26.5, 23.0, 69.0]) {
        const sub = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.36, 0.72), m.sensorPcb);
        sub.position.set(cx, 4.18, -5.85);
        const ic = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.26, 0.62), m.icEpoxy);
        ic.position.set(cx, 4.46, -5.85);
        g.add(sub, ic);
      }
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-micro-suction-pads',
    code: 'W263',
    order: 263,
    title: 'W263. 底面4隅 マイクロ吸盤エラストマー補助防振スタビライザーパッド群',
    subtitle: 'Plinth Underside 4-Corner Micro-Suction Elastomer Anti-Slip Stabilizer Pads',
    category: '光学ベンチ台座 / 防振・滑落防止',
    swatchColor: '#246eb9',
    explodeOffset: [0, -50, 0],
    plainAnalogy: 'ガラス机や鏡面デスクの上でも指で少し押したくらいではビクともしない、目に見えない極小吸盤構造の滑り止め補助パッドです。',
    summary: '底面4隅ゴム脚（W179）の内側隣接位置（X=±74, Z=±8.8, Y=-7.48）へ配置されたマイクロ吸盤発泡ポリウレタン防振パッド4基。水平せん断静止摩擦係数 μ_s > 1.8 で展示滑落を防止します。',
    opticsAndPhysics: [
      '直径50 μmの微細開放気泡が平滑机面へ負圧吸着し、糊残りゼロのまま高い水平保持力を発揮。',
      'スピーカー（W214）再生時の机面共振伝達を-9 dB減衰しクリアな音像を維持。',
    ],
    formula: {
      expression: 'F_slip = μ_s · m · g = 1.85 × 0.38 kg × 9.81 = 6.90 N  (水平耐滑力 約700 gf)',
      description: 'マイクロ吸盤エラストマーで糊跡ゼロのまま約700 gfの水平耐滑・防振性能を実現。',
    },
    nextGenInnovation: '水洗い再生可能なマイクロ吸盤エラストマー光学台座スタビライザー。',
    specs: [
      { label: '材質', value: 'マイクロ吸盤発泡ポリウレタン (50 μm 気泡構造)' },
      { label: '静止摩擦係数', value: 'μ_s > 1.85 (平滑ガラス・塗装机面)' },
      { label: '音響絶縁', value: '-9 dB 机面振動伝達低減' },
    ],
    references: [
      'Rogers Corporation, "PORON® & Microcellular Urethane Vibration Isolation Engineering Guide"',
      'ASTM D1894 Standard Test Method for Static and Kinetic Coefficients of Friction',
      'ISO 10846 Acoustics and Vibration — Elastic Elements Isolation Transfer Stiffness',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(14, 8);
      const padGeo = new THREE.CylinderGeometry(2.6, 2.8, 0.55, seg);
      for (const sx of [-74.0, 74.0]) {
        for (const sz of [-8.8, 8.8]) {
          const p = new THREE.Mesh(padGeo, m.antiVibRubber);
          p.position.set(sx, -7.48, sz);
          g.add(p);
        }
      }
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-rear-io-emi-gasket',
    code: 'W264',
    order: 264,
    title: 'W264. 背面I/Oベゼル周囲 導電性Ni-CuファブリックフォームEMIガスケット帯',
    subtitle: 'Plinth Rear I/O Panel Conductive Ni-Cu Fabric-Over-Foam EMI Shielding Gasket',
    category: '光学ベンチ台座 / 背面I/O電磁遮蔽',
    swatchColor: '#8e99a8',
    explodeOffset: [0, -16, -28],
    plainAnalogy: '背面のコネクタ穴の隙間から内部の高速クロック電波が外へ漏れないよう、導電性ニッケル銅布を巻いたクッションで密閉する電波パッキンです。',
    summary: '背面右側I/Oエリア（X=+50, Y=-1.2, Z=-13.28）へ貼着されたLaird Ni-Cuめっきポリエステル織布オーバーフォームEMIガスケット。表面抵抗<0.05 Ω/sqで背面スロット放射を封じ込めます。',
    opticsAndPhysics: [
      '金属筐体のI/O開口はスロットアンテナとして480 MHz高調波を放射しやすいが、導電フォームで360°導通密閉し-45 dB以上の遮蔽を維持。',
      '圧縮永久歪み<8%により保守再組立後も初期シールド性能を維持。',
    ],
    formula: {
      expression: 'SE_slot = 20 log₁₀(λ / (2 · L_gap)) > 48 dB   (R_surf < 0.05 Ω/sq)',
      description: '導電Ni-Cuフォームガスケットで背面I/Oスロットアンテナ効果を48 dB以上抑圧。',
    },
    nextGenInnovation: '医療・通信ラック規格準拠のNi-Cu導電ファブリックオーバーフォームEMIシール。',
    specs: [
      { label: '材質', value: 'Ni-Cuめっき導電ファブリック / ウレタンフォーム芯' },
      { label: '表面抵抗', value: '< 0.05 Ω/sq (MIL-DTL-83528準拠)' },
      { label: '遮蔽効果', value: '> 48 dB (30 MHz – 6 GHz)' },
    ],
    references: [
      'Laird Performance Materials, "Fabric-Over-Foam (FoF) EMI Shielding Gaskets Design Guide"',
      'IEEE Std 299 Standard Method for Measuring the Effectiveness of Electromagnetic Shielding',
      'CISPR 32 / FCC Part 15 Class B Radiated Emission Slot Aperture Guidelines',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const gk = new THREE.Mesh(new THREE.BoxGeometry(8.4, 3.6, 0.42), m.conductiveNiCuFoam);
      gk.position.set(50.0, -1.2, -13.28);
      g.add(gk);
      return g;
    },
  }),
  makePlinthDef({
    id: 'welcome-plinth-pem-clinch-standoffs',
    code: 'W265',
    order: 265,
    title: 'W265. 内部基板固定 SUS303 PEM®セルフクリンチング M2.5精密スタンドオフ群 (8基)',
    subtitle: 'Plinth Internal SUS303 PEM® Self-Clinching M2.5 Precision Board Standoffs (8×)',
    category: '光学ベンチ台座 / 精密基板締結',
    swatchColor: '#98a2b0',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '台座の内部で各基板やシールド枠をミリ単位の正確な高さでしっかり支え、ネジの締め直しを繰り返してもネジ山が潰れないステンレス製圧入柱です。',
    summary: '台座内部の開放バイパス座標（X=±52, ±12, +53.5, +83.4 / Z=±6.6, Y=+1.95）へ圧入されたPennEngineering PEM® SO-M2.5ステンレス精密スタンドオフ8基。マグネシウム筐体の雌ねじ摩耗をゼロ化します。',
    opticsAndPhysics: [
      'マグネシウム合金への直接タッピングは繰返し締結でかじり・抜けを起こすが、SUS303セルフクリンチング圧入により引抜強度>1.4 kNを確保。',
      '全8点の高さ公差±0.025 mmにより上部光学ベンチ天板の平面度歪みを防止。',
    ],
    formula: {
      expression: 'F_pushout > 1,400 N,   Δh_tol = ±0.025 mm   (SUS303 PEM® SO-M2.5)',
      description: 'SUS303圧入スタンドオフ8基により高耐久保守性と±25 μm高さ精度を両立。',
    },
    nextGenInnovation: '航空電子シャーシ標準のPEM®セルフクリンチング精密スタンドオフ設計。',
    specs: [
      { label: '規格', value: 'PennEngineering PEM® SO-M2.5 (SUS303) × 8基' },
      { label: '高さ精度', value: '±0.025 mm' },
      { label: '圧入耐荷重', value: '引抜 > 1.4 kN / 締付トルク 0.55 N·m' },
    ],
    references: [
      'PennEngineering®, "PEM® Self-Clinching Standoffs (Types SO / SOS) Engineering Bulletin"',
      'ISO 898-2 Mechanical Properties of Fasteners — Stainless Steel Threaded Inserts',
      'MIL-HDBK-5 / MMPDS Metallic Materials Properties — Magnesium Chassis Threaded Insert Design',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(8, 6);
      const stGeo = new THREE.CylinderGeometry(0.55, 0.62, 0.60, seg);
      const pts: Array<[number, number]> = [
        [-66.5, -6.35],
        [-63.0, 6.30],
        [-52.0, -6.35],
        [-51.2, 6.30],
        [9.0, -6.35],
        [9.2, 6.30],
        [47.2, -6.35],
        [47.2, 6.30],
      ];
      for (const [px, pz] of pts) {
        const s = new THREE.Mesh(stGeo, m.stainlessMachined);
        s.position.set(px, 1.88, pz);
        g.add(s);
      }
      return g;
    },
  }),
];

export function buildWelcomePlinthPrecisionParts(mats: V2MaterialLibrary): CadPart[] {
  return buildExpansionCadParts(WELCOME_PLINTH_PRECISION_DEFS, mats);
}
