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
import { buildMicroModuleBox } from './welcomePlinthPrecisionParts';

const PL_POS: readonly [number, number, number] = [0, -17.0, 0];

interface PlinthWaveCSpec {
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

function makePlinthC(s: PlinthWaveCSpec): WelcomeExpansionPartDef {
  return { ...s, groupKey: 'optical_plinth', assembledPos: PL_POS };
}

// ============================================================================
// Wave C Optical Plinth Expansion Parts (30 Parts: W376 - W405)
//   E. Power Entry, Hot-Swap eFuse, Galvanic Isolation & Battery Safety (W376-W384)
//   F. Control Supervision, Ultra-Low-Jitter Clock, I2C Mux & Rear Diag (W385-W390)
//   G. Multi-Optical Spectral, 940nm BP, 60GHz Radar, UWB AoA & BAW RF (W391-W395)
//   H. Dew-Point, Barometer, IP57 Mic, Class-D LC EMI & LRA Haptics (W396-W400)
//   I. Optical Bench Metrology, Rigging Standards & Hatch EMI Gasket (W401-W405)
// ============================================================================
export const WELCOME_PLINTH_WAVE_C_DEFS: readonly WelcomeExpansionPartDef[] = [
  // --- E. Power / Hot-Swap / Galvanic Isolation / Battery Safety (W376 - W384) ---
  makePlinthC({
    id: 'welcome-plinth-usbc-m2-lock-collar',
    code: 'W376',
    order: 376,
    title: 'W376. 背面 USB-C PD 65W USB-IF Rev 1.0 デュアルM2ねじロック保持カラー (15.0mmピッチ)',
    subtitle: 'Plinth Rear USB-C PD 65W USB-IF Rev 1.0 Dual-M2 Locking Connector Collar (15.0mm Pitch)',
    category: '光学ベンチ台座 / 抜け防止USB-C機械ロック',
    swatchColor: '#98a2b0',
    explodeOffset: [-18, -16, -32],
    plainAnalogy: '美術館で太いUSB-C給電ケーブルを誰かが引っ掛けても絶対に抜けないよう、USB-IF国際標準の15.0mm間隔2本ネジでプラグを筐体へガッチリ固定する金属ロック枠です。',
    summary: '背面 USB-C PD 65W 端子（W195, X=-48.0）を包囲する USB-IF Type-C Locking Connector Specification Rev 1.0 準拠 SUS304 CNC デュアル M2 ねじロック保持カラー（標準中心間 15.0 mm ピッチ：X=-55.5 / -40.5, リバーシブル挿抜互換）。',
    opticsAndPhysics: [
      'USB-IF Rev 1.0 デュアル M2（15.0 mm ピッチ）ネジロックにより、65W 編組ケーブルの自重・引張り荷重（最大 40 N）を USB-C レセプタクル基板はんだ脚（W195）へ伝達せず金属シャーシへ直逃がし。',
      '通常 USB-C プラグとの後方互換性を維持しつつ、常設展示では両翼 M2 摘まみネジで脱落ゼロを保証。',
    ],
    formula: {
      expression: 'Pitch_M2 = 15.00 ± 0.05 mm (USB-IF Rev 1.0 Dual-Screw),   F_pull ≥ 40 N 無脱落保持',
      description: 'USB-IF 15.0 mm デュアル M2 ロック機構で 65W 給電ケーブルの抜け事故と端子破断を根絶。',
    },
    nextGenInnovation: '産業・マシンビジョンカメラ標準 USB-IF Type-C Dual-M2 ロック規格の光学台座統合。',
    specs: [
      { label: '準拠規格', value: 'USB-IF Type-C Locking Connector Spec Rev 1.0 (Dual M2)' },
      { label: 'ロックピッチ', value: '15.00 mm (X=-55.5 / -40.5) / M2×0.4 SUS304 雌ねじボス' },
      { label: '配置位置', value: '背面 USB-C PD ポート W195 外周枠 (Z=-13.56)' },
    ],
    references: [
      'USB Implementers Forum (USB-IF), "USB Type-C Locking Connector Specification Revision 1.0" (15.0 mm Dual M2)',
      'AIA Vision Standards, "USB3 Vision Locking USB-C Mechanical Retention Guidelines"',
      'ISO 261 / JIS B 0205 M2 × 0.4 Metric Screw Thread Engagement Standards',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(16, 12));
      // Upper bridge spanning exact 15.0mm USB-IF M2 pitch (-55.5 & -40.5) cleanly above W195 (Y<=0.2) & W313 (Y<=-0.1)
      const topBar = new THREE.Mesh(new THREE.BoxGeometry(16.6, 0.56, 0.50), m.stainlessMachined);
      topBar.position.set(-48.0, 0.68, -13.55);
      // Side rails hugging outside W195 (X[-52.6..-43.4]) and clearing W313 (X<=-55.1)
      const railL = new THREE.Mesh(new THREE.BoxGeometry(1.3, 3.85, 0.50), m.stainlessMachined);
      railL.position.set(-53.85, -1.52, -13.55);
      const railR = railL.clone();
      railR.position.set(-42.15, -1.52, -13.55);
      const botBar = new THREE.Mesh(new THREE.BoxGeometry(13.0, 0.46, 0.50), m.stainlessMachined);
      botBar.position.set(-48.0, -3.55, -13.55);
      g.add(topBar, railL, railR, botBar);
      if (ql >= 1) {
        const bossGeo = new THREE.CylinderGeometry(0.66, 0.66, 0.72, seg).rotateX(Math.PI * 0.5);
        const holeGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.78, seg).rotateX(Math.PI * 0.5);
        for (const bx of [-55.5, -40.5]) {
          const boss = new THREE.Mesh(bossGeo, m.brassPrecision);
          boss.position.set(bx, 0.68, -13.66);
          const hole = new THREE.Mesh(holeGeo, m.matteBlackAnodized);
          hole.position.set(bx, 0.68, -13.68);
          g.add(boss, hole);
        }
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-usbc-efuse-limiter',
    code: 'W377',
    order: 377,
    title: 'W377. USB-C 65W入力 TI TPS25982 UL 2367 15AスマートeFuse＆突入電流スルーレート制限IC',
    subtitle: 'Plinth USB-C 65W Input TI TPS25982 UL 2367 15A Smart eFuse & Inrush Slew-Rate Limiter IC',
    category: '光学ベンチ台座 / 入力電子ヒューズ保護',
    swatchColor: '#1d2026',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'USB-C電源を挿した瞬間の激しい突入電流や異常ショートを、100万分の1秒レベルで電子的に優しく遮断・復帰できるUL安全認証つき「頭脳を持った電子ヒューズ」です。',
    summary: '内部上部バスウェイ内後列（X=-32.0, Y=+1.92, Z=-3.45）に実装された Texas Instruments TPS25982（2.7–24V, 2.7 mΩ, 15A, UL 2367 File No. E339631 認証, ±1.5% 電流監視）。活線挿抜時の LC リンギング過電圧（>32V）と短絡過電流を瞬断します。',
    opticsAndPhysics: [
      'オン抵抗わずか 2.7 mΩ の内蔵パワー FET により 65W（3.25A）連続通電時の損失を 28.5 mW へ極小化しつつ、dV/dt スルーレート制御で MLCC バンク（W241）への突入電流サージを完全抑制。',
      'ガラス管ヒューズ（W204）より桁違いに高速な < 2 μs 短絡遮断と過渡フォルト管理（ITIMER）で UL 2367 / IEC 62368-1 安全要件を充足。',
    ],
    formula: {
      expression: 'P_loss = I² · R_on = (3.25 A)² × 2.7 mΩ = 28.5 mW,   t_short < 2 μs (UL 2367 E339631)',
      description: '2.7 mΩ 超低損失スマート eFuse が活線挿抜サージと短絡事故を非破壊で高速遮断。',
    },
    nextGenInnovation: 'UL 2367 認証 2.7 mΩ / 15A スマート eFuse による無破壊・自動復帰型 65W 入力保護。',
    specs: [
      { label: '保護IC', value: 'Texas Instruments TPS25982 (2.7–24V, 2.7 mΩ, 15A)' },
      { label: '安全認証', value: 'UL 2367 Recognition (File E339631) / IEC 62368-1 CB' },
      { label: '配置位置', value: '内部上部バスウェイ内後列 (X=-32.0, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Texas Instruments, "TPS25982 2.7-V to 24-V, 2.7-mΩ, 15-A Smart eFuse Datasheet (SLVSEI3)"',
      'UL 2367 Solid State Overcurrent Protectors — File No. E339631 & IEC 62368-1 Safety Standard',
      'TI Application Report SLVA882, "Hot-Swap & Inrush Current Management with Smart eFuses"',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-32.0, 1.92, -3.45, 4.0, 0.38, 1.75, m.icEpoxy, m.copperHeatSpreader, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-ina228-power-monitor',
    code: 'W378',
    order: 378,
    title: 'W378. 主電源系統 TI INA228 20bit ΔΣ 超高精度I²C電力・電力量・電荷テレメトリ監視IC',
    subtitle: 'Plinth Main Power Rail TI INA228 20-bit Delta-Sigma Ultra-Precise I2C Power/Energy Monitor IC',
    category: '光学ベンチ台座 / 20bit精密電力計測',
    swatchColor: '#1b5e47',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'USB-Cから入ってくる電圧・電流・消費ワット数・積算電力量（Wh）を20ビット＝100万段階の超高精度で測り続け、背面OLEDや管理アプリへ正確に伝えるスマート電力計ICです。',
    summary: '内部上部バスウェイ内後列（X=-26.2, Y=+1.92, Z=-3.45）の Texas Instruments INA228（85V 同相耐圧, 20-bit ΔΣ ADC, ±163.84/±40.96 mV シャント入力, 電力/エネルギー/電荷積算レジスタ内蔵, ±0.5% 内蔵発振器）。',
    opticsAndPhysics: [
      '20-bit ΔΣ ADC（分解能 312.5 nV/LSB @ ±40.96 mV）により待機 15 mW からピーク 65 W まで単一シャントで 0.05% 精度の電力・Wh エネルギー・クーロン電荷積算を実現。',
      'PMIC 変換効率のリアルタイム診断と異常リーク電流の早期予知保全を I²C 経由で提供。',
    ],
    formula: {
      expression: 'LSB_shunt = 40.96 mV / 2¹⁹ = 78.125 nV,   E_total = Σ (V_bus · I_shunt · Δt) [Wh] (20-bit ΔΣ)',
      description: '85V 耐圧・20-bit ΔΣ ADC 電力計により待機〜65W 全域の消費電力と累積電力量を高精度積算。',
    },
    nextGenInnovation: 'データセンター電源品質の TI INA228 20-bit 電力・電力量・電荷積算テレメトリ。',
    specs: [
      { label: '計測IC', value: 'Texas Instruments INA228 (85V 同相 / 20-bit ΔΣ ADC / I²C)' },
      { label: '計測項目', value: 'バス電圧・シャント電流・瞬時電力(W)・積算電力量(Wh)・電荷(C)' },
      { label: '配置位置', value: '内部上部バスウェイ内後列 (X=-26.2, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Texas Instruments, "INA228 85-V, 20-Bit, Ultra-Precise Power/Energy/Charge Monitor Datasheet (SBOS984)"',
      'TI Application Note SBOA511, "Energy & Charge Accumulation Accuracy Using INA228"',
      'IEC 62053-22 Electricity Metering Equipment — High-Precision Static Watt-Hour Measurement Principles',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-26.2, 1.92, -3.45, 4.0, 0.38, 1.75, m.pcbEmeraldDark, m.icEpoxy, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-dock-hotswap-efuses',
    code: 'W379',
    order: 379,
    title: 'W379. 4文字磁気ドック独立ホットスワップ TI TPS25947 4chハイサイドeFuse保護バンク',
    subtitle: 'Plinth 4-Glyph Magnetic Dock Independent Hot-Swap TI TPS25947 4-Channel High-Side eFuse Bank',
    category: '光学ベンチ台座 / ドック独立短絡保護',
    swatchColor: '#1d2026',
    explodeOffset: [0, -10.5, 8],
    plainAnalogy: '文字を外して空いた磁石ドックに鍵やコインが落ちてショートしても、その1文字分だけを瞬時に切り離して残り3文字と本体マイコンを無傷で守り抜く4ch独立ブレーカーです。',
    summary: '4つの磁気ポゴピンドック（W188/190/192/194）へそれぞれ独立給電するため上部バスウェイ外前列（X=-37.1, Y=+1.92, Z=+6.10）へ実装された Texas Instruments TPS25947 × 4 基（2.7–23V, 5.5A, 28 mΩ, 真の逆流遮断＋個別ソフトスタート＋高速短絡分離）。',
    opticsAndPhysics: [
      '各文字ドックが共通 12V 銅バスバー（W205）から独立 TPS25947 eFuse 経由で分岐しているため、1 ドック短絡時も 12V 主幹電圧ドロップを < 150 mV へ抑え他 3 文字と STM32H743 を無瞬断維持。',
      '真の逆流遮断（True Reverse Current Blocking）により、通電中の文字活線着脱（ホットスワップ）時のアーク放電・接点焼損を防止。',
    ],
    formula: {
      expression: 'N_ch = 4 × TPS25947 (28 mΩ, I_lim = 2.0 A/dock, True Reverse Block)  ⇒  ΔV_bus(short) < 150 mV',
      description: '4 文字ドック独立 eFuse 分離により空ドック異物短絡と活線着脱アークを完全防護。',
    },
    nextGenInnovation: 'サーバーバックプレーン標準のチャンネル独立逆流遮断ホットスワップ eFuse バンク。',
    specs: [
      { label: '保護IC構成', value: 'Texas Instruments TPS25947 × 4基 (2.7–23V, 5.5A, 28 mΩ)' },
      { label: '保護機能', value: 'ドック個別ソフトスタート / 高速短絡分離 / 真の逆流遮断' },
      { label: '配置位置', value: '内部上部バスウェイ外前列 (X=-37.1, lY=+1.92, Z=+6.10)' },
    ],
    references: [
      'Texas Instruments, "TPS25947xx 2.7-V to 23-V, 5.5-A, 28-mΩ True Reverse Current Blocking eFuse Datasheet (SLVSFC9)"',
      'TI User Guide SLVUC01, "TPS25947EVM Multi-Channel Hot-Swap Protection Evaluation"',
      'IEC 62368-1 Clause 6 Electrically-Caused Fire & Limited Power Source (LPS) Branch Isolation',
    ],
    diagramType: 'welcome_dock_pogo',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const carrier = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.18, 1.65), m.sensorPcb);
      carrier.position.set(-37.1, 1.76, 6.10);
      g.add(carrier);
      const chipGeo = new THREE.BoxGeometry(1.35, 0.24, 1.15);
      const capGeo = new THREE.BoxGeometry(0.45, 0.14, 0.32);
      for (let i = 0; i < 4; i++) {
        const cx = -39.9 + i * 1.86;
        const ic = new THREE.Mesh(chipGeo, m.icEpoxy);
        ic.position.set(cx, 1.98, 6.10);
        g.add(ic);
        if (ql >= 1) {
          const pad = new THREE.Mesh(capGeo, m.goldPlating);
          pad.position.set(cx, 2.13, 6.10);
          g.add(pad);
        }
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-iso1042-canfd-iso',
    code: 'W380',
    order: 380,
    title: 'W380. 外部M5同期ポート用 TI ISO1042 5kVrms 強化ガルバニック絶縁CAN-FDトランシーバ',
    subtitle: 'Plinth External M5 Sync Port TI ISO1042 5 kVrms Reinforced Galvanic Isolated CAN-FD Transceiver',
    category: '光学ベンチ台座 / 5kV強化絶縁CAN-FD',
    swatchColor: '#1d2026',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '別々のコンセントに繋いだ複数台の「ようこそ」同士をケーブルで連結しても、地面の電位差（グランドループ）で回路が焼けないよう、5,000Vに耐える光の壁（SiO₂絶縁バリア）で完全に電気分離する通信チップです。',
    summary: '背面 M5 同期ポート（W342）と内部 CAN-FD バス間に配置された（X=-3.8, Y=+1.92, Z=-6.35）Texas Instruments ISO1042 強化絶縁 CAN-FD トランシーバ（5 Mbps, 5000 Vrms UL 1577, 7071 Vpk VIOTM DIN EN IEC 60747-17, ±70V バスフォルト耐圧, 100 kV/μs CMTI）。',
    opticsAndPhysics: [
      '二重容量結合 SiO₂ 強化絶縁バリア（5000 Vrms / 7071 Vpk）により、複数台連結時の建屋間アース電位差・グランドループ電流を完全遮断。',
      '±70V バスフォルト保護と 100 kV/μs の高同相過渡耐性（CMTI）により、業務用照明調光器からの誘導ノイズ下でも 5 Mbps CAN-FD エラーフレームゼロを実現。',
    ],
    formula: {
      expression: 'V_ISO = 5,000 Vrms (UL 1577) / V_IOTM = 7,071 Vpk (IEC 60747-17),   CMTI ≥ 100 kV/μs,   ±70 V Fault',
      description: '5 kVrms SiO₂ 強化ガルバニック絶縁により複数台デイジーチェーン接続時のグランドループ焼損を根絶。',
    },
    nextGenInnovation: '産業オートメーション・EV 基準の 5 kVrms 強化絶縁 5 Mbps CAN-FD トランシーバ。',
    specs: [
      { label: '絶縁IC', value: 'Texas Instruments ISO1042 (5 Mbps CAN-FD / 強化絶縁 SiO₂)' },
      { label: '絶縁耐圧', value: '5000 Vrms (UL 1577) / 7071 Vpk (IEC 60747-17) / ±70V Fault' },
      { label: '配置位置', value: '内部上部バスウェイ外後列 W341 直近 (X=-3.8, lY=+1.92, Z=-6.35)' },
    ],
    references: [
      'Texas Instruments, "ISO1042 Galvanically Isolated CAN Transceiver With 70-V Bus Fault Protection Datasheet (SLLSF09)"',
      'DIN EN IEC 60747-17 (formerly DIN VDE V 0884-11) Magnetic and Capacitive Coupler Reinforced Isolation Standard',
      'UL 1577 Standard for Optical & Digital Isolators (5000 Vrms 1-Minute Withstand)',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(-3.8, 1.92, -6.35, 3.8, 0.38, 1.75, m.icEpoxy, m.aluminaCeramic, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-bq34z100-fuel-gauge',
    code: 'W381',
    order: 381,
    title: 'W381. LiFePO4電池用 TI BQ34Z100-R2 Impedance Track™ クーロン積算残量計IC',
    subtitle: 'Plinth LiFePO4 Battery TI BQ34Z100-R2 Impedance Track™ Coulomb-Counting Fuel Gauge IC',
    category: '光学ベンチ台座 / ±1%高精度電池残量計',
    swatchColor: '#1b5e47',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'リン酸鉄リチウム電池は電圧がずっと平らなので電圧計だけでは残量がわかりません。出し入れした電気量（クーロン）と電池の内部抵抗劣化を自動学習し、±1%精度で残量を割り出す専用ICです。',
    summary: 'LiFePO4 電池区画上部バスウェイ（X=-78.0, Y=+1.92, Z=-3.45）に実装された Texas Instruments BQ34Z100-R2 マルチケミストリー対応 Impedance Track™ 独立型残量計 IC（3–65V, ±1% SoC 精度, SOH 劣化診断, <140 μA 動作）。',
    opticsAndPhysics: [
      'LiFePO4 特有の 3.25V/cell 極平坦放電プラトー（残量 20%〜85% で電圧差わずか 40 mV）に対し、クーロン積算とリアルタイム化学インピーダンス学習（Impedance Track™）を組み合わせて残量誤差を ±30% → ±1% へ劇的改善。',
      'サイクル劣化による内部抵抗上昇と実満充電容量（FCC）を自動追従し、停電 UPS 残時間を秒単位で正確に予告。',
    ],
    formula: {
      expression: 'SoC(t) = SoC₀ - (1 / Q_max(SOH)) ∫ I_batt(t) dt,   Error ≤ ±1.0% (Impedance Track™)',
      description: 'クーロン積算＋内部インピーダンス劣化モデルにより平坦電圧の LiFePO4 でも ±1% SoC 精度を実現。',
    },
    nextGenInnovation: '医療・産業 UPS 標準 TI Impedance Track™ 劣化補償付きマルチケミストリー残量計。',
    specs: [
      { label: '残量計IC', value: 'Texas Instruments BQ34Z100-R2 (Impedance Track™ / I²C)' },
      { label: '精度・消費', value: 'SoC ±1.0% / SOH 自動学習 / 動作電流 < 140 μA' },
      { label: '配置位置', value: '内部上部バスウェイ内後列電池上部 (X=-78.0, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Texas Instruments, "BQ34Z100-R2 Wide Range Fuel Gauge with Impedance Track™ Technology Datasheet (SLUSF37)"',
      'Texas Instruments, "BQ34Z100-R2 Technical Reference Manual (SLUUCO5)"',
      'Barsukov, Y. & Qian, J., "Battery Power Management for Portable Devices", Artech House (Impedance Track Algorithm)',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-78.0, 1.92, -3.45, 4.6, 0.38, 1.75, m.pcbEmeraldDark, m.solderBallSilver, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-lifepo4-preheat-foil',
    code: 'W382',
    order: 382,
    title: 'W382. LiFePO4電池区画 0°Cリチウム析出防止 Minco 全ポリイミド 5W 低温予熱フォイルヒータ',
    subtitle: 'Plinth LiFePO4 Bay Sub-Zero Li-Plating Prevention Minco All-Polyimide 5W Thermofoil™ Heater',
    category: '光学ベンチ台座 / 低温充電安全予熱',
    swatchColor: '#d97706',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '氷点下の寒い玄関ロビーでリチウム電池をそのまま充電すると金属リチウムが析出して危険です。充電前にNASA宇宙規格の極薄オレンジ色フィルムヒーターで電池を+5℃まで安全に温めます。',
    summary: 'LiFePO4 電池区画上部（X=-67.5, Y=+1.92, Z=-3.45）へ密着させた Minco All-Polyimide Thermofoil™ 5W 低温予熱フォイルヒータ（NASA GSFC S-311-P-841 準拠, 0.05/0.03 mm Kapton/FEP 積層, 厚 ≤0.3 mm, 1000 Vrms 絶縁耐圧）。',
    opticsAndPhysics: [
      '0°C 未満でのリチウムイオン／LiFePO4 充電は負極グラファイトの拡散速度低下により不可逆な金属リチウム析出・デンドライト内部短絡を引き起こす。',
      'NTC（W240）が < 2°C を検知すると BMS が充電を保留し、5W ポリイミドエッチングフォイルヒータで電池パックを +5°C へ昇温してから安全充電を開始。',
    ],
    formula: {
      expression: 't_preheat = (m_cell · c_p · ΔT) / (P_heater · η) ≈ (25 g × 1.0 J/gK × 10 K) / 4.2 W ≈ 60 s  (T_chg ≥ +5°C)',
      description: '5W 宇宙規格ポリイミドフォイルヒータが 0°C 未満環境での充電前予熱を 60 秒で完了しデンドライト析出を阻止。',
    },
    nextGenInnovation: 'NASA GSFC S-311-P-841 宇宙機規格の All-Polyimide Thermofoil™ 低温安全予熱ヒータ。',
    specs: [
      { label: 'ヒータ規格', value: 'Minco All-Polyimide Thermofoil™ (NASA GSFC S-311-P-841 準拠)' },
      { label: '定格・厚み', value: '5.0 W (12V PWM) / Kapton-FEP 厚 0.3 mm / 耐圧 1000 Vrms' },
      { label: '配置位置', value: '内部上部バスウェイ内後列電池上部 (X=-67.5, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Minco Products Inc., "All-Polyimide Thermofoil™ Heaters — NASA GSFC S-311-P-841 Space Qualified Design Guide"',
      'Waldmann, T. et al. (2018), "Li Plating as Unwanted Side Reaction in Commercial Li-Ion Cells — A Review", J. Power Sources 384',
      'IEC 62133-2:2017 Safe Operating Temperature Charging Window Requirements for Lithium Batteries',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const foil = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.16, 1.65), m.kaptonAmberFilm);
      foil.position.set(-67.5, 1.90, -3.45);
      g.add(foil);
      if (ql >= 1) {
        const traceGeo = new THREE.BoxGeometry(8.4, 0.06, 0.16);
        for (const dz of [-0.48, 0, 0.48]) {
          const t = new THREE.Mesh(traceGeo, m.copperHeatSpreader);
          t.position.set(-67.5, 2.00, -3.45 + dz);
          g.add(t);
        }
      }
      if (ql >= 2) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 0.55), m.goldPlating);
        pad.position.set(-63.1, 2.00, -3.45);
        g.add(pad);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-battery-burst-vent',
    code: 'W383',
    order: 383,
    title: 'W383. LiFePO4電池区画 IEC 62133-2 2段階過圧安全破裂ベント＆焼結SUS316Lフレームアレスタ',
    subtitle: 'Plinth LiFePO4 Bay IEC 62133-2 Two-Stage Overpressure Burst Vent & Sintered SUS316L Flame Arrestor',
    category: '光学ベンチ台座 / 電池防爆安全ベント',
    swatchColor: '#b91c1c',
    explodeOffset: [0, -16, -28],
    plainAnalogy: '密閉された金属ケースの中で万が一電池から異常ガスが出ても、ケースが破裂しないよう0.7気圧で安全にガスだけを後ろへ逃がし、焼結金属フィルターで火花を完全に止める安全弁です。',
    summary: '背面空き壁面（X=-27.2, Y=-1.0, Z=-13.52）へ装備された IEC 62133-2 / UL 2580 準拠 2 段階過圧安全ベント（通常呼吸 0.1 bar ePTFE＋非常破裂 0.7 bar ダイヤフラム＋焼結 SUS316L 多孔質フレームアレスタ）。',
    opticsAndPhysics: [
      '平常時は疎水 ePTFE 膜（0.1 bar 呼吸）が IP54 防滴を保ちつつ気圧差を逃がし、異常セルガス発生時は 0.7 bar スコアード破裂膜が開裂して筐体破裂圧（>4 bar）前に安全放圧。',
      '孔径 20 μm の焼結 SUS316L フレームアレスタ（消炎距離 < MESG）が高温ガスを急冷し、外部への火炎・火花噴出を物理遮断。',
    ],
    formula: {
      expression: 'P_breathe = 0.10 bar (ePTFE),   P_burst = 0.70 ± 0.10 bar < P_case,   d_pore = 20 μm < MESG',
      description: '2 段階破裂ベントと 20 μm 焼結 SUS316L 消炎器で IEC 62133-2 / UL 2580 の電池異常安全性を完結。',
    },
    nextGenInnovation: 'EV バッテリーパック標準の 2 段階 ePTFE＋破裂ダイヤフラム＋焼結消炎器安全ベント。',
    specs: [
      { label: '安全規格', value: 'IEC 62133-2 / UL 2580 電池区画過圧放圧ベント' },
      { label: '2段階構造', value: '通常呼吸 0.1 bar ePTFE + 非常破裂 0.7 bar + 20μm SUS316L 消炎器' },
      { label: '配置位置', value: '背面電池区画壁面 (X=-27.2, lY=-1.0, Z=-13.52)' },
    ],
    references: [
      'IEC 62133-2:2017 Secondary Lithium Cells and Batteries — Mechanical & Thermal Abuse Venting',
      'UL 2580 Standard for Batteries for Use in Electric Vehicles — Pressure Relief & Flame Arrestor Provisions',
      'Donaldson / W. L. Gore, "Dual-Stage Battery Pack Pressure Equalization & Emergency Burst Vent Technical Note"',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(20, 12));
      const hex = new THREE.Mesh(
        new THREE.CylinderGeometry(2.08, 2.15, 0.34, 6).rotateX(Math.PI * 0.5),
        m.stainlessMachined
      );
      hex.position.set(-27.2, -1.0, -13.44);
      const arrestor = new THREE.Mesh(
        new THREE.CylinderGeometry(1.42, 1.42, 0.24, seg).rotateX(Math.PI * 0.5),
        m.sintered316L
      );
      arrestor.position.set(-27.2, -1.0, -13.66);
      g.add(hex, arrestor);
      if (ql >= 1) {
        const warnRing = new THREE.Mesh(new THREE.TorusGeometry(1.66, 0.14, 6, seg), m.fireRedAccent);
        warnRing.position.set(-27.2, -1.0, -13.64);
        const membrane = new THREE.Mesh(
          new THREE.CylinderGeometry(0.92, 0.92, 0.08, seg).rotateX(Math.PI * 0.5),
          m.ptfeCleanWhite
        );
        membrane.position.set(-27.2, -1.0, -13.80);
        g.add(warnRing, membrane);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-sn6505b-iso-power',
    code: 'W384',
    order: 384,
    title: 'W384. 絶縁CAN-FD専用 TI SN6505B プッシュプル駆動IC＆Würth 750315240 5kVrms 絶縁トランス',
    subtitle: 'Plinth Isolated CAN-FD Power TI SN6505B Push-Pull Driver & Würth 750315240 5 kVrms Transformer',
    category: '光学ベンチ台座 / 5kV絶縁DC-DC電源',
    swatchColor: '#3a3f4a',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '5,000Vの絶縁壁の向こう側にあるCAN-FD通信チップ（W380）へ、電気をつながず磁力だけでクリーンな5V電力を送り届ける超小型トランス電源です。',
    summary: '内部上部バスウェイ内後列（X=-13.0, Y=+1.92, Z=-3.45）に搭載された Texas Instruments SN6505B（420 kHz, 1A, 低EMI ソフトスタート・プッシュプルドライバ）＋ Würth Elektronik WE-PPTI 750315240（5 kVrms 強化絶縁マイクロトランス）。',
    opticsAndPhysics: [
      'SN6505B のスルーレート制御＋スペクトラム拡散プッシュプル駆動と WE-PPTI 750315240（沿面距離 >8 mm, 結合容量 7 pF）により、CISPR 32 Class B 放射雑音余裕 > 12 dB で ISO1042（W380）の 2 次側 5V を絶縁供給。',
      '低リーク静電容量（7 pF）のため高周波コモンモード電流の絶縁バリア通過を極小化。',
    ],
    formula: {
      expression: 'V_iso = 5,000 Vrms (WE-PPTI 750315240),   f_sw = 420 kHz,   C_ww ≈ 7 pF ⇒ 低EMI 絶縁5V供給',
      description: '420 kHz 低 EMI プッシュプル駆動＋5 kVrms 強化絶縁トランスで W380 バス側電源を完全絶縁。',
    },
    nextGenInnovation: 'TI SN6505B + Würth WE-PPTI 5 kVrms 強化絶縁マイクロトランス電源の超低背統合。',
    specs: [
      { label: '駆動IC', value: 'Texas Instruments SN6505B (420 kHz / 1A / ソフトスタート低EMI)' },
      { label: '絶縁トランス', value: 'Würth Elektronik WE-PPTI 750315240 (5 kVrms 強化絶縁)' },
      { label: '配置位置', value: '内部上部バスウェイ内後列 (X=-13.0, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Texas Instruments, "SN6505x Low-Noise 1-A Transformer Drivers for Isolated Power Supplies Datasheet (SLLSEP9)"',
      'Würth Elektronik eiSos, "WE-PPTI 750315240 Push-Pull Reinforced Isolation Transformer (5 kVrms) Datasheet"',
      'CISPR 32 / EN 55032 Class B Radiated Emissions Compliance for Isolated DC/DC Converters',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.14, 1.75), m.sensorPcb);
      pcb.position.set(-13.0, 1.75, -3.45);
      const drv = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.28, 1.15), m.icEpoxy);
      drv.position.set(-14.6, 1.96, -3.45);
      const xfmr = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.36, 1.50), m.ferriteInductor);
      xfmr.position.set(-11.8, 2.00, -3.45);
      g.add(pcb, drv, xfmr);
      if (ql >= 1) {
        const coil = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.24, 1.56), m.copperCoil);
        coil.position.set(-11.8, 1.96, -3.45);
        const barrier = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 1.65), m.kaptonAmberFilm);
        barrier.position.set(-13.45, 1.88, -3.45);
        g.add(coil, barrier);
      }
      return g;
    },
  }),

  // --- F. Control Reliability / Ultra-Low-Jitter Clock / I2C Mux / Local Service Diagnostics (W385 - W390) ---
  makePlinthC({
    id: 'welcome-plinth-tps3850-watchdog',
    code: 'W385',
    order: 385,
    title: 'W385. システム24/7無停止保護 TI TPS3850 ±0.8%ウィンドウ電圧監視＆ハードウェアWDT IC',
    subtitle: 'Plinth 24/7 Fail-Safe TI TPS3850 ±0.8% Window Voltage Supervisor & Hardware Watchdog Timer IC',
    category: '光学ベンチ台座 / 24時間無停止WDT監視',
    swatchColor: '#1d2026',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '24時間365日稼働する美術館で万が一メインマイコンがフリーズしても、別の独立した「番犬チップ（ウォッチドッグ）」が電圧異常や応答停止を即座に検知して自動で再起動復旧します。',
    summary: '内部上部バスウェイ内後列（X=+4.0, Y=+1.92, Z=-3.45）に配置された Texas Instruments TPS3850 精密ウィンドウ電圧スーパーバイザ＆独立ウィンドウ型ハードウェア WDT（±0.8% 過電圧/低電圧監視, 10 μA, 3.0×3.0 mm 10-pin VSON）。',
    opticsAndPhysics: [
      '低電圧（UV）だけでなく過電圧（OV）も ±0.8% ウィンドウで監視し、暴走したソフトウェアが速すぎる／遅すぎる WDI パルスを出した場合も独立ハードウェア・リセットを 200 ms 以内にアサート。',
      'Cortex-M7（W208）内蔵 WDT と完全独立したクロック・電源監視系により、単一障害点ゼロの 24/7 無停止稼働を担保。',
    ],
    formula: {
      expression: 'V_mon = 3.30 V ± 0.8% (UV/OV Window),   t_WDT,open < t_kick < t_WDT,close  (I_Q = 10 μA)',
      description: '±0.8% 過不足電圧監視＋ウィンドウ型ハードウェア WDT で 24/7 展示稼働の無停止信頼性を確立。',
    },
    nextGenInnovation: '機能安全 IEC 61508 / ISO 26262 級ウィンドウ電圧監視＆独立ハードウェア WDT。',
    specs: [
      { label: '監視IC', value: 'Texas Instruments TPS3850 (10-pin 3×3 mm VSON / 10 μA)' },
      { label: '監視精度', value: '±0.8% 過電圧/低電圧ウィンドウ監視 + プログラマブル窓WDT' },
      { label: '配置位置', value: '内部上部バスウェイ内後列 (X=+4.0, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Texas Instruments, "TPS3850 Precision Window Supervisor with Programmable Window Watchdog Timer Datasheet (SBVS315)"',
      'IEC 61508-2 Functional Safety of Electrical/Electronic Systems — Independent Watchdog Supervision',
      'TI Application Report SLVA847, "Designing Reliable 24/7 Embedded Systems with Window Watchdogs"',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(4.0, 1.92, -3.45, 3.4, 0.38, 1.75, m.icEpoxy, m.goldPlating, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-lmk1c1104-clkbuf',
    code: 'W386',
    order: 386,
    title: 'W386. 基準クロック分配 TI LMK1C1104 1:4 超低付加ジッタ (7.5fs RMS) LVCMOSファンアウトバッファ',
    subtitle: 'Plinth Reference Clock Distribution TI LMK1C1104 1:4 Ultra-Low Additive Jitter (7.5fs RMS) Buffer',
    category: '光学ベンチ台座 / 7.5fs超低ジッタクロック分配',
    swatchColor: '#c8a654',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '高精度TCXO水晶発振器の心臓の鼓動を、マイコン・音響DAC・32kHz LED制御・UWBレーダーの4か所へ、わずか7.5フェムト秒（1秒の130兆分の1）しかブレさせずに配る超精密時計分配器です。',
    summary: '内部上部バスウェイ内後列（X=+10.5, Y=+1.92, Z=-3.45）へ実装された Texas Instruments LMK1C1104 1:4 LVCMOS クロック・ファンアウトバッファ（付加ジッタ 7.5 fs RMS typ @ 3.3V, 出力間スキュー <50 ps, f_max = 250 MHz, 8-pin WSON）。',
    opticsAndPhysics: [
      'TCXO（W246, ±0.5 ppm）の単一出力を分岐した際に生じるインピーダンス反射と波形鈍りを 4 独立 50 Ω 出力ドライバで解消し、出力間スキューを < 50 ps へ揃える。',
      '7.5 fs RMS の極限低付加ジッタにより、24-bit/96 kHz I²S オーディオ DAC と UWB（W394）15.65 ps タイムスタンプの位相雑音劣化を完全ゼロ化。',
    ],
    formula: {
      expression: 'σ_jitter,add = 7.5 fs RMS typ (VDD = 3.3 V),   t_skew(o-o) < 50 ps,   f_max = 250 MHz',
      description: '7.5 fs RMS 付加ジッタ・<50 ps スキューの 1:4 クロック分配で音響・UWB・PWM 同期を極限精度化。',
    },
    nextGenInnovation: '基地局・計測器標準の 7.5 fs RMS 超低付加ジッタ 1:4 クロックファンアウト。',
    specs: [
      { label: 'クロックIC', value: 'Texas Instruments LMK1C1104 (1:4 LVCMOS / 8-pin WSON)' },
      { label: 'ジッタ・スキュー', value: '付加ジッタ 7.5 fs RMS typ @ 3.3V / スキュー < 50 ps' },
      { label: '配置位置', value: '内部上部バスウェイ内後列 (X=+10.5, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Texas Instruments, "LMK1C110x 1.8-V, 2.5-V, and 3.3-V LVCMOS Clock Buffer Family Datasheet (SNAS791)"',
      'TI Application Report SCAA117, "Clock Distribution Additive Phase Jitter Analysis for Audio & RF"',
      'IEEE Std 1139 Standard Definitions of Physical Quantities for Fundamental Frequency and Time Metrology',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(10.5, 1.92, -3.45, 4.0, 0.38, 1.75, m.icEpoxy, m.bionzTcxoGoldLid, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-eui48-mac-eeprom',
    code: 'W387',
    order: 387,
    title: 'W387. 固有ハードウェアID Microchip 24AA02E48 工場書込済 IEEE EUI-48 MAC & 校正係数EEPROM',
    subtitle: 'Plinth Hardware Unique ID Microchip 24AA02E48 Pre-Programmed IEEE EUI-48 MAC & Calibration EEPROM',
    category: '光学ベンチ台座 / 固有MACアドレス・校正ROM',
    swatchColor: '#1d2026',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '工場で世界唯一の48ビット住所（MACアドレス）がレーザー焼き付け済みの不揮発メモリで、複数台をネットワーク同期する時の個体識別と定盤の校正データを一生失わずに覚えています。',
    summary: '内部上部バスウェイ内後列（X=-43.2, Y=+1.92, Z=-3.45）に搭載された Microchip 24AA02E48 2-Kbit I²C EEPROM（工場書込・書換不可 IEEE EUI-48™ グローバル一意 MAC ノード ID, 1.7–5.5V, 1 μA 待機, 5-pin SOT-23）。',
    opticsAndPhysics: [
      'Wi-Fi 6 / BLE / 1000BASE-T PTP / CAN-FD 複数台同期ネットワークにおいて、ファームウェア書換や故障復旧後も絶対に重複しない IEEE 登録済み 48-bit 固有ハードウェア ID を保証。',
      '書込保護された上位ブロックとは別に、工場 ISO/IEC 17025 基準定盤平面度・分光・傾斜ゼロ点校正係数を 100 年保持。',
    ],
    formula: {
      expression: 'ID_node ∈ {0..2⁴⁸ - 1} (IEEE OUI + Unique 24-bit),   Retention > 100 yr,   I_sb = 1 μA',
      description: '工場書込済 IEEE EUI-48 固有 ID と不変定盤校正メモリにより複数台ネットワーク運用を確立。',
    },
    nextGenInnovation: 'IEEE 登録 OUI 工場書込済 EUI-48™ ノード ID＋定盤校正 EEPROM 統合。',
    specs: [
      { label: 'メモリIC', value: 'Microchip 24AA02E48 (2 Kbit I²C EEPROM / SOT-23-5)' },
      { label: '固有ID', value: '工場書込済 IEEE EUI-48™ グローバル一意 MAC (書換保護)' },
      { label: '配置位置', value: '内部上部バスウェイ内後列 (X=-43.2, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Microchip Technology Inc., "24AA02E48/24AA025E48 2-Kbit I²C Serial EEPROMs with Pre-Programmed EUI-48™ Node Identity (DS20002124)"',
      'IEEE Registration Authority, "Guidelines for Use of Extended Unique Identifier (EUI-48™)"',
      'ISO/IEC 17025 Calibration Coefficient Traceability & Non-Volatile Storage Requirements',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(-43.2, 1.92, -3.45, 3.0, 0.36, 1.60, m.icEpoxy, m.silverElectrode, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-tca9548a-i2c-mux',
    code: 'W388',
    order: 388,
    title: 'W388. センサーバス分離 TI TCA9548A 8ch I²Cマルチプレクサ＆ADI LTC4311 能動プルアップ加速器',
    subtitle: 'Plinth Sensor Bus Isolation TI TCA9548A 8-Ch I2C Multiplexer & ADI LTC4311 Active Pull-Up Accelerator',
    category: '光学ベンチ台座 / 8ch I²Cバス分離・高速化',
    swatchColor: '#1b5e47',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '10個以上のセンサーや残量計・OLED画面が1本の通信線でぶつかり合ったり、1個の故障で全滅したりしないよう、8車線へ交通整理して波形の立ち上がりも鋭く加速する通信ハブです。',
    summary: '内部上部バスウェイ内後列（X=+51.5, Y=+1.92, Z=-3.45）に実装された Texas Instruments TCA9548A（1-to-8 双方向 I²C スイッチ, ハードウェア RESET 付, 400 kHz）＋ Analog Devices LTC4311（>400 pF 負荷対応デュアル能動立上り加速器）。',
    opticsAndPhysics: [
      '同一 I²C アドレスを持つ複数センサー・ドックを 8 チャンネルへ物理分離し、任意の 1 センサーが SDA を Low 固定（バスハング）してもハードウェア RESET とチャンネル遮断で残系統を無停止保護。',
      'LTC4311 の電流源能動プルアップ（立上りスルーレート加速）により、194 mm 筐体内の長配線寄生容量（>200 pF）下でも 400 kHz Fast-Mode I²C 矩形波をシャープに維持。',
    ],
    formula: {
      expression: 't_rise(LTC4311) = C_bus · ΔV / I_boost < 80 ns (C_bus ≤ 400 pF @ 400 kHz, 8-Ch Isolated)',
      description: '8ch I²C スイッチ分離＋能動プルアップ加速でアドレス衝突・バス凍結・長距離波形鈍りを同時解消。',
    },
    nextGenInnovation: 'TCA9548A 8ch 故障隔離＋LTC4311 能動スルーレート加速による産業級センサーバックボーン。',
    specs: [
      { label: 'マルチプレクサ', value: 'Texas Instruments TCA9548A (1-to-8 I²C Switch / HW RESET)' },
      { label: '立上り加速器', value: 'Analog Devices LTC4311 (デュアル能動プルアップ / >400 pF対応)' },
      { label: '配置位置', value: '内部上部バスウェイ内後列 (X=+51.5, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Texas Instruments, "TCA9548A Low-Voltage 8-Channel I2C Switch with Reset Datasheet (SCPS207)"',
      'Analog Devices / Linear Technology, "LTC4311 Low Voltage I2C/SMBus Accelerator Datasheet"',
      'NXP Semiconductors, "UM10204 I²C-Bus Specification and User Manual (Fast-Mode 400 kHz Bus Capacitance)"',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(51.5, 1.92, -3.45, 4.4, 0.38, 1.75, m.pcbEmeraldDark, m.icEpoxy, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-rear-diag-oled',
    code: 'W389',
    order: 389,
    title: 'W389. 背面サービス診断 WINSTAR WEO006432A 0.49型 64×32 モノクロMicro-OLEDテレメトリ画面 (SSD1306)',
    subtitle: 'Plinth Rear Service Diagnostics WINSTAR WEO006432A 0.49" 64x32 Monochrome Micro-OLED Display (SSD1306)',
    category: '光学ベンチ台座 / 現地診断Micro-OLED画面',
    swatchColor: '#2563eb',
    explodeOffset: [0, -16, -28],
    plainAnalogy: 'スマホやPCを繋がなくても、台座の裏側をのぞくだけで入力電圧・消費ワット・電池残量%・最高温度・CAN番号・エラーコードをくっきり直読できる0.49型の超小型有機EL画面です。',
    summary: '背面空き窓（X=-35.2, Y=-1.0, Z=-13.52）へフラッシュ組込みされた WINSTAR WEO006432A 0.49 インチ COG パッシブマトリクス OLED モジュール（64×32 ドット, SSD1306 I²C, 外形 14.5×11.6×1.26 mm / 実表示域 11.18×5.58 mm, 10,000:1 高コントラスト, −40〜+80°C）。',
    opticsAndPhysics: [
      '自発光 PMOLED（10,000:1 コントラスト・視野角 160°超・応答 10 μs）により、暗い美術館バックヤードでも懐中電灯不要で電圧・W・SoC%・最高温度・エラーコードを即読。',
      '通常展示中は自動タイムアウト消灯して背面迷光をゼロ化し、保守時のみロータリーダイヤル長押しまたは NFC タップで起動。',
    ],
    formula: {
      expression: 'CR_OLED = 10,000:1,   Active = 11.18 × 5.58 mm (64 × 32 px, Pitch 0.175 mm),   T_op = -40〜+80°C',
      description: '0.49 型 64×32 SSD1306 モノクロ Micro-OLED により PC レスの現場テレメトリ直読診断を実現。',
    },
    nextGenInnovation: '放送・測定器ラック標準のオンシャーシ 0.49 型 64×32 Micro-OLED テレメトリ画面。',
    specs: [
      { label: '表示モジュール', value: 'WINSTAR WEO006432A (0.49" COG PMOLED / 64×32 / SSD1306 I²C)' },
      { label: 'コントラスト・温度', value: '10,000:1 / 視野角 >160° / 動作 -40〜+80°C' },
      { label: '配置位置', value: '背面診断パネル窓 (X=-35.2, lY=-1.0, Z=-13.52)' },
    ],
    references: [
      'WINSTAR Display Co., Ltd., "WEO006432A 0.49-inch 64×32 COG Graphic OLED Module Datasheet (SSD1306 I²C)"',
      'Solomon Systech, "SSD1306 128×64 Dot Matrix OLED/PLED Segment/Common Driver Controller Datasheet"',
      'IEC 62341-6-1 Organic Light Emitting Diode (OLED) Displays — Optical & Environmental Reliability',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const bezel = new THREE.Mesh(new THREE.BoxGeometry(7.6, 4.0, 0.34), m.matteBlackAnodized);
      bezel.position.set(-35.2, -1.0, -13.45);
      const screen = new THREE.Mesh(new THREE.BoxGeometry(6.4, 3.0, 0.14), m.bodyTopSubOled);
      screen.position.set(-35.2, -1.0, -13.64);
      g.add(bezel, screen);
      if (ql >= 1) {
        const glass = new THREE.Mesh(new THREE.BoxGeometry(6.9, 3.4, 0.08), m.coverGlass);
        glass.position.set(-35.2, -1.0, -13.73);
        const line1 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.24, 0.04), m.ptfeCleanWhite);
        line1.position.set(-35.2, -0.45, -13.70);
        const line2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.24, 0.04), m.blue450Glow);
        line2.position.set(-35.6, -1.35, -13.70);
        g.add(glass, line1, line2);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-rear-piano-dip',
    code: 'W390',
    order: 390,
    title: 'W390. 背面リセスド保守ポート Omron A6SR 金メッキ双接点 4極ピアノDIPハード設定スイッチ',
    subtitle: 'Plinth Rear Recessed Maintenance Port Omron A6SR Gold Twin-Contact 4-Pole Piano DIP Switch',
    category: '光学ベンチ台座 / ハードウェア構成DIPスイッチ',
    swatchColor: '#dc2626',
    explodeOffset: [0, -16, -28],
    plainAnalogy: '電源を入れる前でも物理的にパチッと切り替えられる4つの小さなピアノ鍵盤スイッチです。CAN通信の台数番号・120Ω終端抵抗・ファーム強制復旧・校正モードを確実に設定できます。',
    summary: '背面右空き域（X=+66.2, Y=-0.9, Z=-13.52）へリセス実装された Omron A6SR 低背 SMT 4 極ピアノ型 DIP スイッチ（2.54 mm ピッチ, 金メッキ双接点スライド構造）。CAN-FD ノード ID・120 Ω 終端・DFU ブート・校正モードをハードウェア確定します。',
    opticsAndPhysics: [
      '金メッキ双接点セルフワイピング機構により低電圧ロジック（3.3V / 100 μA）でも酸化膜接触不良ゼロ、耐衝撃・耐振動 10–55 Hz で設定保持。',
      'ピアノ型リセスドアクチュエータは背面から精密ドライバ先端でのみ切替可能とし、清掃や運搬時の誤操作を物理防止。',
    ],
    formula: {
      expression: '4-bit Hardware Config: [SW1:2]=NodeID(0..3), [SW3]=120Ω Term, [SW4]=DFU/Cal  (R_c < 100 mΩ)',
      description: '金メッキ双接点 4 極ピアノ DIP によりファーム起動前のハードウェア終端・DFU・ノード番号を確定。',
    },
    nextGenInnovation: '産業制御機器標準の Omron A6SR 金メッキ双接点リセスド・ピアノ DIP 設定ポート。',
    specs: [
      { label: 'スイッチ型番', value: 'Omron A6SR-4104 (低背 SMT 4極ピアノDIP / 2.54 mm ピッチ)' },
      { label: '接点仕様', value: '金メッキ双接点セルフワイピング / 接触抵抗 < 100 mΩ' },
      { label: '配置位置', value: '背面右保守ポート W350〜W343 間 (X=+66.2, lY=-0.9, Z=-13.52)' },
    ],
    references: [
      'Omron Electronic Components, "A6SR Surface-Mounting Piano-Type DIP Switch Datasheet (G055)"',
      'ISO 11898-2 CAN-FD 120-Ohm Switchable End-of-Line Bus Termination Guidelines',
      'IEC 61058-1 Switches for Appliances & Industrial Control Hardware Strapping Standards',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const housing = new THREE.Mesh(new THREE.BoxGeometry(6.0, 2.6, 0.42), m.gMasterRedBadge);
      housing.position.set(66.2, -0.9, -13.18);
      const recess = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.5, 0.14), m.matteBlackAnodized);
      recess.position.set(66.2, -0.9, -13.38);
      g.add(housing, recess);
      const levGeo = new THREE.BoxGeometry(0.82, 0.95, 0.22);
      const n = ql >= 1 ? 4 : 2;
      for (let i = 0; i < n; i++) {
        const lx = 64.4 + i * (3.6 / Math.max(1, n - 1));
        const lev = new THREE.Mesh(levGeo, m.ptfeCleanWhite);
        lev.position.set(lx, i % 2 === 0 ? -0.68 : -1.12, -13.44);
        g.add(lev);
      }
      return g;
    },
  }),

  // --- G. Multi-Optical / Spectral / 60GHz Radar / UWB AoA / RF Coexistence (W391 - W395) ---
  makePlinthC({
    id: 'welcome-plinth-as7341-spectral',
    code: 'W391',
    order: 391,
    title: 'W391. 前面右 ams OSRAM AS7341 11ch CIE 1931 XYZ 環境光分光色温度＆フリッカー検知センサー',
    subtitle: 'Plinth Front Right ams OSRAM AS7341 11-Ch CIE 1931 XYZ Ambient Spectral CCT & Flicker Sensor',
    category: '光学ベンチ台座 / 11ch分光色温度・フリッカー検知',
    swatchColor: '#38bdf8',
    explodeOffset: [0, -16, 32],
    plainAnalogy: '明るさだけ測る照度計（W212）では電球色か昼光色か見分けられません。光を11の波長帯へ分解して部屋の本当の光の色味と50/60Hzチラつきを読み取り、文字のCRI 97発色を完璧に調和させます。',
    summary: '前面右対称計装窓（X=+28.0, Y=-0.70, Z=+13.26）へ配置された ams OSRAM AS7341 11 チャンネル分光センサー（可視 8ch 415–680 nm＋Clear＋NIR＋50/60 Hz フリッカー専用 ch, 6 並列 16-bit ADC, 3.1×2.0×1.0 mm）＋ PTFE コサイン拡散窓。',
    opticsAndPhysics: [
      'F1(415 nm)〜F8(680 nm) の 8 狭帯域可視チャネル＋NIR を 3×8 校正行列で CIE 1931 XYZ / 相関色温度（CCT 2000–10000 K）へ変換し、美術館ハロゲン（2700 K）から自然昼光（6500 K）へ文字のホワイトバランスを自動追従。',
      '専用フリッカー検出チャネル（最大 2 kHz サンプリング）が周囲照明の 100/120 Hz 脈動を検知し、カメラ撮影時のビート干渉を回避。',
    ],
    formula: {
      expression: '[X, Y, Z]ᵀ = M_3×8 · [F₁(415nm) .. F₈(680nm)]ᵀ  ⇒  CCT(2000–10000 K),  Duv < 0.002',
      description: '11ch 分光多波長センサ＋PTFE コサイン拡散窓で展示室の色温度・フリッカーを精密リアルタイム解析。',
    },
    nextGenInnovation: 'スマートフォン最高級カメラ搭載の ams OSRAM AS7341 11ch ナノ光学分光センサー。',
    specs: [
      { label: '分光センサー', value: 'ams OSRAM AS7341 (11ch: 可視8ch 415–680nm + Clear + NIR + Flicker)' },
      { label: 'ADC・光学窓', value: '6並列 16-bit ADC + PTFE コサイン拡散光学窓 (I²C)' },
      { label: '配置位置', value: '前面右対称計装窓 (X=+28.0, lY=-0.70, Z=+13.26, 全Ray非遮蔽)' },
    ],
    references: [
      'ams OSRAM AG, "AS7341 11-Channel Multi-Spectral Digital Sensor Datasheet (DS000504)"',
      'ams OSRAM AG, "AS7341 Opto-Mechanical Design & Cosine Diffuser Application Note (UG000400)"',
      'CIE 15:2018 Colorimetry — 1931 Standard Colorimetric Observer & Correlated Color Temperature (CCT)',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const frame = new THREE.Mesh(new THREE.BoxGeometry(7.6, 2.7, 0.28), m.matteBlackAnodized);
      frame.position.set(28.0, -0.70, 13.24);
      const diffuser = new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.85, 0.14), m.ptfeCleanWhite);
      diffuser.position.set(28.0, -0.70, 13.34);
      g.add(frame, diffuser);
      if (ql >= 1) {
        const die = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.15, 0.08), m.nanoArIridescent);
        die.position.set(28.0, -0.70, 13.40);
        const rim = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.15, 0.06), m.stainlessMachined);
        rim.position.set(28.0, -0.70, 13.38);
        g.add(die, rim);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-tof-940nm-bandpass-window',
    code: 'W392',
    order: 392,
    title: 'W392. 前面ToF専用 940±20nm 狭帯域誘電体多層膜 光学バンドパスフィルタカバー窓',
    subtitle: 'Plinth Front ToF Dedicated 940±20nm Narrowband Dielectric Optical Bandpass Filter Cover Window',
    category: '光学ベンチ台座 / 940nm太陽光遮断ToF窓',
    swatchColor: '#312e81',
    explodeOffset: [0, -16, 32],
    plainAnalogy: '強い太陽の光が差し込むガラス張りロビーでは距離センサーが眩しくて目がくらんでしまいます。距離レーザーの940nm赤外線だけを通し可視太陽光を99.9%カットする専用サングラス窓です。',
    summary: '前面 ToF 測距軸上（X=0.0, Y=-0.60, Z=+13.46）へフラッシュ配置された 940 ± 20 nm 狭帯域誘電体多層膜干渉バンドパスフィルタカバー窓（可視 400–850 nm を OD > 3 / 99.9% 遮断、940 nm VCSEL 透過率 > 90%）。',
    opticsAndPhysics: [
      '42 層 Nb₂O₅/SiO₂ 誘電体多層干渉膜により太陽光エネルギーの大半を占める可視域（400–850 nm）を OD > 3（<0.1%）へ遮断し、100 klux 直射日光下でも VL53L5CX（W211）SPAD アレイの飽和を防止。',
      '940 nm VCSEL レーザーに対する高透過率（>90%）と極薄低分散ガラスにより、63° 対角視界コーンの光学遮蔽率 0.000%（sp ray 認証）を維持。',
    ],
    formula: {
      expression: 'T(940±20 nm) > 90%,   OD(400–850 nm) > 3.0 (T < 0.1%)  ⇒  SNR_ToF(100 klux) +28 dB',
      description: '940±20 nm 狭帯域誘電体フィルタ窓により直射日光下の ToF 測距飽和を解消（視界遮蔽 0%）。',
    },
    nextGenInnovation: '自動車 LiDAR・屋外 ToF 標準の 940±20 nm OD>3 誘電体多層バンドパスフィルタ窓。',
    specs: [
      { label: '中心波長・帯域', value: '940 ± 20 nm (T > 90%) / 400–850 nm 遮断 OD > 3 (>99.9%)' },
      { label: '光学膜・基板', value: 'Nb₂O₅/SiO₂ 42層誘電体干渉膜 / 光学ガラス (t = 0.10 mm)' },
      { label: '配置位置', value: '前面 ToF 軸上 W302 前面 (X=0.0, lY=-0.60, Z=+13.46, sp ray 透過)' },
    ],
    references: [
      'STMicroelectronics, "AN5644 Cover Glass Guidelines for VL53L5CX 940nm Time-of-Flight Sensor"',
      'MidOpt / Edmund Optics, "BP940 Narrowband 940nm Dielectric Bandpass Filters for ToF & LiDAR"',
      'Macleod, H. A., "Thin-Film Optical Filters", 5th Ed., CRC Press (Narrowband Cavity Interference Filters)',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const filterGlass = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.05, 0.08), m.spdTintViolet);
      filterGlass.position.set(0.0, -0.60, 13.46);
      g.add(filterGlass);
      if (ql >= 1) {
        const trimT = new THREE.Mesh(new THREE.BoxGeometry(5.7, 0.14, 0.10), m.matteBlackAnodized);
        trimT.position.set(0.0, 0.44, 13.46);
        const trimB = trimT.clone();
        trimB.position.set(0.0, -1.64, 13.46);
        g.add(trimT, trimB);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-bgt60tr13c-radar',
    code: 'W393',
    order: 393,
    title: 'W393. 前面左 Infineon BGT60TR13C 60GHz FMCWミリ波 静止在室・微動呼吸レーダーMMIC (AiP)',
    subtitle: 'Plinth Front Left Infineon XENSIV™ BGT60TR13C 60 GHz FMCW Millimeter-Wave Presence & Breathing Radar (AiP)',
    category: '光学ベンチ台座 / 60GHzミリ波静止在室レーダー',
    swatchColor: '#1e3a8a',
    explodeOffset: [0, -16, 32],
    plainAnalogy: '黒いコートを着てじっと立ち止まって鑑賞している人のわずかな胸の呼吸（数ミリ）まで、60GHzミリ波電波で確実に捉え、文字の光を切らさずに見守り続ける最新レーダーです。',
    summary: '前面左対称窓（X=-28.0, Y=-0.70, Z=+13.26, W391 と完全左右対称）へ誘電体レドーム窓付で搭載された Infineon XENSIV™ BGT60TR13C 60 GHz FMCW ミリ波レーダー MMIC（58–63.5 GHz, 帯域幅 5.5 GHz → 距離分解能 2.7 cm, 1 TX / 3 RX 封止内アンテナ AiP, 6.5×5.0×0.9 mm）。',
    opticsAndPhysics: [
      '広帯域 5.5 GHz の FMCW チャープ変調（ΔR = c / 2B = 2.73 cm）と 3 RX 位相差到来角（水平・垂直 AoA）により、黒衣類やガラス逆光の影響を受けず静止鑑賞者の呼吸（0.2–0.5 Hz, ±1 mm 微動）を検知。',
      '低誘電率（ε_r ≈ 2.6, tan δ < 0.002）の λ/2 厚誘電体レドーム窓を採用し、60 GHz 帯の反射挿入損失を < 0.4 dB に抑制。',
    ],
    formula: {
      expression: 'ΔR = c / (2 · B) = 3×10⁸ / (2 × 5.5 GHz) = 2.73 cm,   λ_60GHz = 5.0 mm (1 TX / 3 RX AiP)',
      description: '5.5 GHz 超広帯域 60 GHz FMCW レーダーにより 2.73 cm 分解能と静止呼吸微動検知を実現。',
    },
    nextGenInnovation: 'Infineon XENSIV™ 60 GHz AiP ミリ波レーダーと光学 ToF の異種物理センサー融合。',
    specs: [
      { label: 'レーダーMMIC', value: 'Infineon XENSIV™ BGT60TR13C (58–63.5 GHz / 1TX 3RX AiP)' },
      { label: '帯域・分解能', value: 'FMCW 帯域 5.5 GHz / 距離分解能 2.73 cm / 静止呼吸検知' },
      { label: '配置位置', value: '前面左対称計装窓 (X=-28.0, lY=-0.70, Z=+13.26, W391 対称)' },
    ],
    references: [
      'Infineon Technologies AG, "XENSIV™ BGT60TR13C 60 GHz Radar Sensor with Antenna-in-Package Datasheet"',
      'Infineon Technologies AG, "AN608 Radome Design Guidelines for 60 GHz Millimeter-Wave FMCW Radar"',
      'Richards, M. A., "Fundamentals of Radar Signal Processing", 3rd Ed. (FMCW Range Resolution & Vital Signs)',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const frame = new THREE.Mesh(new THREE.BoxGeometry(7.6, 2.7, 0.28), m.matteBlackAnodized);
      frame.position.set(-28.0, -0.70, 13.24);
      const radome = new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.85, 0.14), m.pa66ThermalBreak);
      radome.position.set(-28.0, -0.70, 13.34);
      g.add(frame, radome);
      if (ql >= 1) {
        const aip = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.25, 0.08), m.icEpoxy);
        aip.position.set(-28.0, -0.70, 13.40);
        const antGeo = new THREE.BoxGeometry(0.45, 0.45, 0.04);
        for (const dx of [-1.05, -0.35, 0.35, 1.05]) {
          const patch = new THREE.Mesh(antGeo, m.goldPlating);
          patch.position.set(-28.0 + dx, -0.70, 13.45);
          g.add(patch);
        }
        g.add(aip);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-uwb-aoa-module',
    code: 'W394',
    order: 394,
    title: 'W394. Qorvo DW3120 / QM33120W IEEE 802.15.4z 超広帯域(UWB) 10cm精密測距＆AoA到来角モジュール',
    subtitle: 'Plinth Qorvo DW3120 / QM33120W IEEE 802.15.4z UWB 10cm Ranging & PDoA Angle-of-Arrival Module',
    category: '光学ベンチ台座 / UWB 10cm測距・到来角検知',
    swatchColor: '#164a41',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '来客のスマートフォンや入場タグの位置を10cm精度と左右の方位角（±5°）で捉え、「左から近づいたら『よ→う→こ→そ』、右からなら『そ→こ→う→よ』」と光の波を方向連動させる超広帯域無線です。',
    summary: '内部上部バスウェイ内後列（X=+63.5, Y=+1.92, Z=-3.45）に搭載された Qorvo DW3120 / QM33120W IEEE 802.15.4z FiRa 2.0 準拠 UWB トランシーバ（Ch.5/Ch.9 6.5/8.0 GHz, タイムスタンプ分解能 15.65 ps = 4.69 mm/tick, 10 cm 測距, 2 ポート PDoA 到来角 ±5°）。',
    opticsAndPhysics: [
      '64 GHz 相当のタイムスタンプ粒度 Δt = 1 / (128 × 499.2 MHz) = 15.65 ps（光速換算 4.69 mm/tick）と STS 暗号化フレーム（IEEE 802.15.4z）により、マルチパス屋内ロビーでも 10 cm 測距精度を達成。',
      'デュアル RX チェーン位相差（PDoA）から来訪者の接近方位角を ±5° 精度で算出し、4 文字のウェーブ演出方向と追尾輝度をシームレス制御。',
    ],
    formula: {
      expression: 'Δt_UWB = 1 / (128 × 499.2 MHz) = 15.65 ps (4.69 mm/tick),   θ_AoA = arcsin(λ · Δφ / (2π · d))',
      description: '15.65 ps 高分解能タイムスタンプ＋2 ポート PDoA により来客距離（10 cm）と接近方位（±5°）を同時取得。',
    },
    nextGenInnovation: 'Apple U1/U2 相互運用・FiRa 2.0 準拠 Qorvo QM33120W / DW3120 1 チップ PDoA 到来角測距。',
    specs: [
      { label: 'UWB IC', value: 'Qorvo DW3120 / QM33120W (IEEE 802.15.4z / FiRa 2.0 / Ch.5 & Ch.9)' },
      { label: '測距・方位', value: '分解能 15.65 ps (4.69 mm) / 精度 10 cm / PDoA AoA ±5°' },
      { label: '配置位置', value: '内部上部バスウェイ内後列 (X=+63.5, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Qorvo Inc., "QM33120W / DW3120 IEEE 802.15.4z UWB Transceiver with PDoA Datasheet"',
      'IEEE Std 802.15.4z-2020 Enhanced Impulse Radio UWB (HRP-ERDEV) & Scrambled Timestamp Sequence',
      'FiRa Consortium, "PHY/MAC Technical Specifications v2.0 — Two-Way Ranging & PDoA Angle of Arrival"',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const sub = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.16, 1.75), m.abfSubstrate);
      sub.position.set(63.5, 1.76, -3.45);
      const shield = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.26, 1.35), m.emiShieldCan);
      shield.position.set(62.8, 1.97, -3.45);
      g.add(sub, shield);
      if (ql >= 1) {
        const ant1 = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.10, 0.62), m.goldPlating);
        ant1.position.set(65.2, 1.89, -3.88);
        const ant2 = ant1.clone();
        ant2.position.set(65.2, 1.89, -3.02);
        g.add(ant1, ant2);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-wifi-baw-filter',
    code: 'W395',
    order: 395,
    title: 'W395. Qorvo QPQ1907 2.4GHz Wi-Fi 6 / BLE / UWB 共存 急峻スカートBAWバンドパスフィルタ',
    subtitle: 'Plinth Qorvo QPQ1907 2.4 GHz Wi-Fi 6 / BLE / UWB Coexistence Steep-Skirt BAW Bandpass Filter',
    category: '光学ベンチ台座 / RF共存BAWフィルタ',
    swatchColor: '#c2cbd6',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'Wi-Fi 6・Bluetooth・UWBの3つの電波が狭い筐体の中でケンカして受信感度が落ちないよう、結晶の超音波振動（BAW）の急峻な壁で隣の帯域へ漏れる電波を切り落とす高性能フィルターです。',
    summary: '内部上部バスウェイ内後列（X=+57.5, Y=+1.92, Z=-3.45）に配置された Qorvo QPQ1907 バルク弾性波（BAW）2.4 GHz 共存バンドパスフィルタ（2.0×1.6 mm, 低挿入損失 ~2.0 dB, 急峻帯域外減衰スカート >45 dB）。',
    opticsAndPhysics: [
      'AlN 圧電薄膜のバルク弾性波共振（Q > 2,000）により、LC フィルタでは不可能な急峻スカート遮断を実現し、Wi-Fi 6（W209）の +20 dBm 送信バーストによる UWB（W394）および BLE 受信デセンス（感度抑圧）を根絶。',
      '高電力耐性（+28 dBm 連続）と低温度ドリフトにより、密閉金属筐体内の複数無線同時稼働を安定化。',
    ],
    formula: {
      expression: 'IL_pass(2.4–2.48 GHz) ≈ 2.0 dB,   Atten_OOB(UWB/LTE) > 45 dB  (BAW Q > 2,000)',
      description: '急峻スカート BAW 共存フィルタにより Wi-Fi 6 送信と UWB/BLE 受信の同時無干渉動作を保証。',
    },
    nextGenInnovation: 'AlN 圧電バルク弾性波（BAW）急峻スカート Wi-Fi 6 / BLE / UWB 共存フロントエンド。',
    specs: [
      { label: 'フィルタIC', value: 'Qorvo QPQ1907 (2.4 GHz BAW Coexistence Bandpass Filter)' },
      { label: '性能', value: '挿入損失 ~2.0 dB / 帯域外減衰 >45 dB / 2.0×1.6 mm CSP' },
      { label: '配置位置', value: '内部上部バスウェイ内後列 (X=+57.5, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Qorvo Inc., "QPQ1907 High-Performance 2.4 GHz Wi-Fi BAW Coexistence Filter Datasheet"',
      'Ruby, R. (2015), "A Snapshot in Time: The Future in Filters for Cell Phones (FBAR/BAW)", IEEE Microwave Mag.',
      'IEEE 802.11ax / 802.15.4z Coexistence & Adjacent-Channel Desense Mitigation Guidelines',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => buildMicroModuleBox(57.5, 1.92, -3.45, 3.6, 0.36, 1.65, m.emiShieldCan, m.goldPlating, m),
  }),

  // --- H. Dew-Point / Barometer / IP57 Mic / Class-D LC EMI / LRA Haptics (W396 - W400) ---
  makePlinthC({
    id: 'welcome-plinth-sht45-dewpoint',
    code: 'W396',
    order: 396,
    title: 'W396. 結露能動防止 Sensirion SHT45-AD1F-R2 (±1.0%RH / ±0.1°C) PTFE膜付デジタル温湿度センサー',
    subtitle: 'Plinth Active Anti-Condensation Sensirion SHT45-AD1F-R2 (±1.0%RH / ±0.1°C) PTFE-Membrane Sensor',
    category: '光学ベンチ台座 / 露点予測・結露能動防止',
    swatchColor: '#f8fafc',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '室内の温度と湿度を超高精度（±0.1℃・±1%RH）で測って結露する温度（露点）をリアルタイム計算し、サファイア窓が曇る前にLEDをわずかに微予熱して曇りを防ぐ賢い温湿度センサーです。',
    summary: '内部上部バスウェイ外後列（X=+19.0, Y=+1.92, Z=-6.35）へ実装された Sensirion SHT45-AD1F-R2（±1.0% RH / ±0.1°C typ, CMOSens® 同時単点計測, 工場装着 IP67 PTFE 防塵防水膜付, WDFN-4, I²C）。',
    opticsAndPhysics: [
      'Magnus–Tetens 飽和水蒸気圧式からリアルタイム露点温度 T_dp を算出し、筐体温度が T_dp + 2.0°C に接近した時点で LED 微電流（1% 予熱モード）を作動させて光学窓の結露を未然防止。',
      '工場装着疎水 PTFE 保護膜（-AD1F-R2）により、コンフォーマルコートや塵埃から感湿ポリマーを恒久保護。',
    ],
    formula: {
      expression: 'T_dp = (b · γ(T,RH)) / (a - γ(T,RH)),   γ = ln(RH/100) + a·T/(b+T)  (±1.0%RH / ±0.1°C)',
      description: 'SHT45 による高精度露点算出と T_dp + 2°C 微予熱制御で美術館空調急変時の光学曇りを根絶。',
    },
    nextGenInnovation: 'Sensirion CMOSens® SHT45 PTFE 保護膜付フラッグシップ温湿度センサーによる能動防曇。',
    specs: [
      { label: 'センサー型番', value: 'Sensirion SHT45-AD1F-R2 (CMOSens® / 工場装着 PTFE 保護膜)' },
      { label: '計測精度', value: '±1.0% RH typ / ±0.1°C typ / I²C (0x44) / 内部ヒータ内蔵' },
      { label: '配置位置', value: '内部上部バスウェイ外後列 (X=+19.0, lY=+1.92, Z=-6.35)' },
    ],
    references: [
      'Sensirion AG, "SHT4x (SHT45-AD1F-R2) 4th Generation Relative Humidity and Temperature Sensor Datasheet"',
      'Alduchov, O. A. & Eskridge, R. E. (1996), "Improved Magnus Form Approximation of Saturation Vapor Pressure", J. Appl. Meteor.',
      'ISO 11799 Museum & Archive Environmental Humidity & Condensation Prevention Guidelines',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => buildMicroModuleBox(19.0, 1.92, -6.35, 3.4, 0.36, 1.70, m.icEpoxy, m.ptfeCleanWhite, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-bmp390-barometer',
    code: 'W397',
    order: 397,
    title: 'W397. 気圧・通気弁健全性監視 Bosch BMP390 超高精度絶対気圧センサー (±0.03 hPa / ±25cm)',
    subtitle: 'Plinth Barometric & Vent-Health Monitor Bosch Sensortec BMP390 Precision Pressure Sensor (±0.03 hPa)',
    category: '光学ベンチ台座 / 気圧補正・封止健全性監視',
    swatchColor: '#98a2b0',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: 'わずか25cmの高さ変化の気圧差まで見抜く超高精度気圧計です。標高の高い高原美術館での自然放熱補正だけでなく、防水通気弁が目詰まりして筐体内の気圧が異常に上がっていないかも自己診断します。',
    summary: '内部上部バスウェイ外後列（X=+59.8, Y=+1.92, Z=-6.35）に実装された Bosch Sensortec BMP390 デジタル絶対気圧センサー（300–1250 hPa, 相対精度 ±0.03 hPa = ±25 cm, RMS 雑音 0.02 Pa, 2.0×2.0×0.75 mm 10-pin メタルリッド LGA）。',
    opticsAndPhysics: [
      '高地設置（例：標高 1,500 m, 845 hPa → 空気密度 -16%）時の自然対流熱伝達低下を気圧から自動計算し、LED 最大電流ディレーティングカーブをリアルタイム補正。',
      '電源投入直後の筐体昇温に伴う内圧上昇カーブを監視し、ePTFE 通気ベント（W224/W383）の目詰まりや IP54 ガスケット劣化を予知診断。',
    ],
    formula: {
      expression: 'ΔP_rel = ±0.03 hPa (±25 cm),   h_conv ∝ (P / P₀)^0.5  ⇒  高地自然対流ディレーティング自動補正',
      description: '±0.03 hPa 超高精度気圧監視により高地放熱補正と密閉筐体ベント健全性の両方を自動監視。',
    },
    nextGenInnovation: 'Bosch Sensortec BMP390 メタルリッド気圧センサーによる熱対流補正＆ベント目詰まり自己診断。',
    specs: [
      { label: '気圧センサー', value: 'Bosch Sensortec BMP390 (300–1250 hPa / 10-pin メタルリッド LGA)' },
      { label: '精度・雑音', value: '相対精度 ±0.03 hPa (±25 cm) / RMS雑音 0.02 Pa / 3.2 μA @ 1 Hz' },
      { label: '配置位置', value: '内部上部バスウェイ外後列 (X=+59.8, lY=+1.92, Z=-6.35)' },
    ],
    references: [
      'Bosch Sensortec GmbH, "BMP390 Digital Pressure Sensor Datasheet (BST-BMP390-DS001)"',
      'JEDEC / IEEE Thermal Management at High Altitude — Air Density Natural Convection Derating',
      'IEC 60529 Enclosure Breathing Vent Pressure-Equalization Diagnostic Methodology',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => buildMicroModuleBox(59.8, 1.92, -6.35, 2.8, 0.36, 1.50, m.stainlessMachined, m.matteBlackAnodized, m),
  }),
  makePlinthC({
    id: 'welcome-plinth-im73a135-mems-mic',
    code: 'W398',
    order: 398,
    title: 'W398. 環境音圧自動追従＆自己音響診断 Infineon IM73A135V01 73dB(A) IP57密閉MEMSマイク',
    subtitle: 'Plinth Ambient SPL Auto-Gain & Acoustic Self-Test Infineon IM73A135V01 73 dB(A) IP57 Sealed MEMS Mic',
    category: '光学ベンチ台座 / 73dB(A) IP57音響帰還マイク',
    swatchColor: '#c2cbd6',
    explodeOffset: [0, -16, -28],
    plainAnalogy: '静かな美術館ではささやくように、賑やかなホテルロビーでは心地よく響くように歓迎チャイムの音量を自動調整し、スピーカーの故障も自分で聴いてチェックする防塵防水マイクロホンです。',
    summary: '背面右音響ポート（X=+77.2, Y=-0.9, Z=-13.52）へ密閉実装された Infineon XENSIV™ IM73A135V01 産業用密閉デュアルメンブレン MEMS マイクロホン（73 dB(A) SNR, ±1 dB 感度公差, 20 Hz フラット低域, IP57 防塵防水, AOP 135 dB SPL）。',
    opticsAndPhysics: [
      '周囲環境騒音（30–85 dB SPL）を常時 A 特性計測し、歓迎チャイムの再生ゲインを常に環境音 +8 dB へ自動追従（ALS 適応音量制御）。',
      '毎朝の自己点検時に 440 Hz/1 kHz スイープ音を再生・帰還収音して N52 スピーカー（W214）とバスレフ共鳴ダクト（W256）の周波数特性異常を自動診断。',
    ],
    formula: {
      expression: 'SNR = 73 dB(A),   AOP = 135 dB SPL,   G_chime = clip(SPL_amb + 8 dB, 42, 74 dB)  (IP57 密閉)',
      description: '73 dB(A) 高 SNR・IP57 密閉 MEMS マイクで環境騒音追従チャイムとスピーカー自己音響診断を実現。',
    },
    nextGenInnovation: 'スタジオコンデンサ級の 73 dB(A) SNR と IP57 防塵防水を両立した Infineon 密閉 MEMS マイク。',
    specs: [
      { label: 'MEMSマイク', value: 'Infineon XENSIV™ IM73A135V01 (IP57 デュアルメンブレン密閉)' },
      { label: '音響性能', value: 'SNR 73 dB(A) / AOP 135 dB SPL / 感度公差 ±1 dB / 20 Hz〜' },
      { label: '配置位置', value: '背面右音響ポート W343〜W218 間 (X=+77.2, lY=-0.9, Z=-13.52)' },
    ],
    references: [
      'Infineon Technologies AG, "XENSIV™ IM73A135V01 IP57 Dust & Water Resistant 73 dB(A) MEMS Microphone Datasheet"',
      'IEC 61672-1 Electroacoustics — Sound Level Meters (A-Weighting Ambient SPL Estimation)',
      'AES2-2012 Loudspeaker & Enclosure Acoustic Self-Test Frequency Response Verification',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(16, 12));
      const plate = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.6, 0.34), m.emiShieldCan);
      plate.position.set(77.2, -0.9, -13.15);
      const port = new THREE.Mesh(
        new THREE.CylinderGeometry(0.92, 0.92, 0.22, seg).rotateX(Math.PI * 0.5),
        m.matteBlackAnodized
      );
      port.position.set(77.2, -0.9, -13.34);
      g.add(plate, port);
      if (ql >= 1) {
        const mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.68, 0.68, 0.08, seg).rotateX(Math.PI * 0.5),
          m.micStainlessWovenMesh
        );
        mesh.position.set(77.2, -0.9, -13.44);
        g.add(mesh);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-classd-lc-filter',
    code: 'W399',
    order: 399,
    title: 'W399. Class-D音声出力 Murata BLM18PG331SN1D フェライト＋15µH/0.22µF LC復調EMIフィルタ網',
    subtitle: 'Plinth Class-D Audio Output Murata BLM18PG331SN1D Ferrite & 15uH/0.22uF LC Demodulation EMI Filter',
    category: '光学ベンチ台座 / Class-D音響EMI復調フィルタ',
    swatchColor: '#3a3f4a',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '高効率なデジタル（Class-D）アンプのスピーカー配線はアンテナになって電波ノイズを出しがちです。村田製作所のフェライトビーズとコイル・コンデンサのろ過網で高周波ノイズを完全に滑らかな音声へ戻します。',
    summary: '内部上部バスウェイ内後列（X=+71.0, Y=+1.92, Z=-3.45）に配置された Murata BLM18PG331SN1D フェライトビーズ（330 Ω ±25% @ 100 MHz, 1.2A, 0603）＋シールド電力インダクタ 15 μH / 0.22 μF X7R 差動 LC 復調 EMI フィルタ網（CISPR 32 Class B）。',
    opticsAndPhysics: [
      'カットオフ周波数 f_c = 1 / (2π√(LC)) = 87.6 kHz の 2 次バターワース LC 復調器が Class-D PWM キャリア（400 kHz–1.2 MHz）を -32 dB 減衰させ、さらに BLM18PG331SN1D が 30–300 MHz 放射雑音を吸収。',
      '至近距離にある 2.4 GHz Wi-Fi / UWB（W394）へのスピーカー配線経由放射干渉を CISPR 32 Class B 基準値 -10 dB 以下へ抑制。',
    ],
    formula: {
      expression: 'f_c = 1 / (2π√(15 μH × 0.22 μF)) = 87.6 kHz,   Z_bead(100 MHz) = 330 Ω (CISPR 32 Class B)',
      description: '87.6 kHz 差動 LC 復調＋330 Ω@100 MHz 村田フェライトで Class-D スピーカー配線の高調波放射を根絶。',
    },
    nextGenInnovation: 'ハイエンド音響機器標準のシールド 15 μH LC 復調＋村田 BLM18PG 複合 EMI フィルタ。',
    specs: [
      { label: 'フェライト・LC', value: 'Murata BLM18PG331SN1D (330 Ω@100 MHz) + 15 μH / 0.22 μF X7R' },
      { label: 'EMC準拠', value: 'CISPR 32 / FCC Part 15B Class B (30–300 MHz -18 dB 抑制)' },
      { label: '配置位置', value: '内部上部バスウェイ内後列スピーカー直近 (X=+71.0, lY=+1.92, Z=-3.45)' },
    ],
    references: [
      'Murata Manufacturing Co., Ltd., "BLM18PG331SN1D Chip Ferrite Bead Datasheet (330 Ω @ 100 MHz, 1.2 A)"',
      'Texas Instruments Application Report SLOA119, "LC Filter Design for Class-D Audio Amplifiers"',
      'CISPR 32:2015 Electromagnetic Compatibility of Multimedia Equipment — Class B Emission Limits',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.14, 1.75), m.sensorPcb);
      pcb.position.set(71.0, 1.75, -3.45);
      const ind1 = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.34, 1.35), m.ferriteInductor);
      ind1.position.set(69.5, 1.98, -3.45);
      const ind2 = ind1.clone();
      ind2.position.set(71.4, 1.98, -3.45);
      g.add(pcb, ind1, ind2);
      if (ql >= 1) {
        const cap1 = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.22, 0.45), m.smdCeramic);
        cap1.position.set(73.0, 1.92, -3.82);
        const cap2 = cap1.clone();
        cap2.position.set(73.0, 1.92, -3.08);
        g.add(cap1, cap2);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-lra-haptic-engine',
    code: 'W400',
    order: 400,
    title: 'W400. 精密触覚フィードバック TI DRV2605L 駆動 175Hz リニア共振アクチュエータ (LRA) エンジン',
    subtitle: 'Plinth Precision Haptic Feedback TI DRV2605L Driver & 175 Hz Z-Axis Linear Resonant Actuator (LRA)',
    category: '光学ベンチ台座 / 175Hz LRA触覚フィードバック',
    swatchColor: '#98a2b0',
    explodeOffset: [-8, -9.5, -6],
    plainAnalogy: '右端ダイヤルを回した時やスマホをNFCにかざした時、文字がドックへピタッと吸着した瞬間に、高級カメラやスマホのような心地よい「コツッ」という上質な固体振動を指先へ返します。',
    summary: '右端ロータリーダイヤル直近の内部上部バスウェイ外後列（X=+79.5, Y=+1.92, Z=-6.15）に搭載された Texas Instruments DRV2605L（2.0–5.2V I²C, 123 種内蔵 ROM 触覚波形, ±2.5 Hz 自動共振追尾＆アクティブブレーキ）＋ 175 Hz Z 軸コイン型 LRA。',
    opticsAndPhysics: [
      '偏心回転モータ（ERM）比 5 倍高速な立上り（< 10 ms）と DRV2605L の逆位相アクティブブレーキにより、ボケのないシャープな 1 サイクル固体クリック触感を生成。',
      '逆起電力（Back-EMF）自動共振周波数トラッキングが 175 Hz ± 2.5 Hz の機械共振点へ常にロックし、温度・経年変化でも一定の触覚強度を保持。',
    ],
    formula: {
      expression: 'f_res = 175.0 ± 2.5 Hz (Auto Back-EMF Tracking),   t_rise < 10 ms,   123 Immersion ROM Waveforms',
      description: 'DRV2605L 自動共振追尾＋アクティブブレーキ駆動 175 Hz LRA で上質な固体クリック触覚を提供。',
    },
    nextGenInnovation: '高級ミラーレス操作系・スマートフォン Taptic 級の 175 Hz LRA 閉ループ触覚エンジン。',
    specs: [
      { label: 'ドライバIC', value: 'Texas Instruments DRV2605L (I²C / 123波形ROM / 自動共振追尾)' },
      { label: 'アクチュエータ', value: '175 Hz Z軸コイン型 LRA (立上り <10 ms / 1.8 Grms)' },
      { label: '配置位置', value: '内部上部バスウェイ外後列ダイヤル直近 (X=+79.5, lY=+1.92, Z=-6.15)' },
    ],
    references: [
      'Texas Instruments, "DRV2605L 2- to 5.2-V Haptic Driver for LRA and ERM with Effect Library Datasheet (SLOS854)"',
      'Texas Instruments User Guide SLOU389, "DRV2605L 123 Embedded Immersion Haptic Waveforms Reference"',
      'Precision Microdrives, "Linear Resonant Actuators (LRA) Resonance Tracking & Active Braking Guide"',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(18, 12));
      const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.14, 1.62), m.sensorPcb);
      pcb.position.set(79.5, 1.74, -6.15);
      const lra = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.32, seg), m.stainlessMachined);
      lra.position.set(80.9, 1.96, -6.15);
      const drv = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.24, 1.15), m.icEpoxy);
      drv.position.set(78.1, 1.94, -6.15);
      g.add(pcb, lra, drv);
      if (ql >= 1) {
        const coilCap = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.50, 0.06, seg), m.copperCoil);
        coilCap.position.set(80.9, 2.14, -6.15);
        g.add(coilCap);
      }
      return g;
    },
  }),

  // --- I. Optical Bench Metrology / Camera Rigging / Hatch EMI Gasket (W401 - W405) ---
  makePlinthC({
    id: 'welcome-plinth-m4x025-level-feet',
    code: 'W401',
    order: 401,
    title: 'W401. 底面4隅 運動学的 M4×0.25 (Thorlabs級) 極細目ローレット真鍮レベリング微調脚 (4基)',
    subtitle: 'Plinth Bottom 4-Corner Kinematic M4x0.25 (Thorlabs-Grade) Fine-Pitch Knurled Brass Leveling Feet',
    category: '光学ベンチ台座 / 0.25mm/rev水平微調脚',
    swatchColor: '#d4a137',
    explodeOffset: [0, -50, 0],
    plainAnalogy: '天面に2分角の精密水準器（W336）が載っているのに底面に調整脚が無ければ水平を追い込めません。1回転わずか0.25mm（1度回すと0.7ミクロン）だけ上下する光学実験室グレードの真鍮ネジ脚4本です。',
    summary: '底面 4 隅の空き座標（X=±65.0, Z=±10.0, lY∈[-7.82..-7.16]）へ配した Thorlabs 規格 M4×0.25 極細目（0.25 mm/rev = 0.69 μm/deg）ローレット C3604 真鍮レベリング微調脚＋硬球先端＋ロックナット 4 基。天面気泡管水準器（W336）と対を成します。',
    opticsAndPhysics: [
      'ピッチ 0.25 mm/rev の超細目ねじと 130 mm スパン配置により、1/4 回転（90°）で 62.5 μm ＝ 傾斜角 1.65 分角（天面水準器 W336 の 1 目盛未満）の精密水平追い込みが可能。',
      'C3604 真鍮ブッシュ＋硬球先端点接触＋ローレットロックナットにより、調整後の机上クリープ沈み込みをゼロ化。',
    ],
    formula: {
      expression: 'Δh / deg = 0.25 mm / 360° = 0.694 μm/deg,   Δθ(90°) = arctan(62.5 μm / 130 mm) = 1.65′ < 2′ (W336)',
      description: 'Thorlabs 級 M4×0.25 極細目真鍮微調脚 4 基により天面 2 分角水準器の真水平調整を完結。',
    },
    nextGenInnovation: '光学ベンチ標準 Thorlabs M4×0.25（100 TPI 相当）極細目真鍮マイクロレベリング脚 4 点系。',
    specs: [
      { label: 'ねじ規格', value: 'Thorlabs 級 M4 × 0.25 極細目 (0.25 mm/rev, 0.69 μm/deg) × 4基' },
      { label: '構造材', value: 'C3604 ローレット真鍮 + 焼入硬球先端 + ロックナット' },
      { label: '配置位置', value: '底面4隅クリア域 (X=±65.0, Z=±10.0, lY∈[-7.82..-7.16])' },
    ],
    references: [
      'Thorlabs Inc., "F4SS / F4ES M4×0.25 Fine-Adjustment Hex & Knurled Optical Mount Screws Specification"',
      'ISO 261 / DIN 13-2 Fine-Pitch Metric Screw Threads (M4 × 0.25 Optical Instrumentation Standard)',
      'Slocum, A. H., "Precision Machine Design" (Kinematic Leveling Screws & Lock-Nut Preload)',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(18, 12));
      const collarGeo = new THREE.CylinderGeometry(2.02, 2.02, 0.24, seg);
      const thumbGeo = new THREE.CylinderGeometry(1.76, 1.84, 0.26, seg);
      const ballGeo = new THREE.SphereGeometry(0.46, seg, Math.max(8, seg >> 1));
      const corners: ReadonlyArray<readonly [number, number]> = [
        [-65.0, -10.0],
        [-65.0, 10.0],
        [65.0, -10.0],
        [65.0, 10.0],
      ];
      for (const [fx, fz] of corners) {
        const collar = new THREE.Mesh(collarGeo, m.stainlessMachined);
        collar.position.set(fx, -7.28, fz);
        const thumb = new THREE.Mesh(thumbGeo, m.brassPrecision);
        thumb.position.set(fx, -7.54, fz);
        g.add(collar, thumb);
        if (ql >= 1) {
          const tip = new THREE.Mesh(ballGeo, m.hardenedSteelHrc60);
          tip.scale.set(1, 0.36, 1);
          tip.position.set(fx, -7.72, fz);
          g.add(tip);
        }
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-corner-cube-retro',
    code: 'W402',
    order: 402,
    title: 'W402. 台座天面 Thorlabs PS974M 級 N-BK7 マウント済コーナーキューブ再帰反射プリズム (<3″)',
    subtitle: 'Plinth Top Deck Thorlabs PS974M-Grade Mounted N-BK7 Corner-Cube Retroreflector (<3 arcsec)',
    category: '光学ベンチ台座 / レーザー干渉計再帰反射基準',
    swatchColor: '#60a5fa',
    explodeOffset: [0, -5, 0],
    plainAnalogy: 'どの角度からレーザー測定光を当てても必ず来た方向へ3秒角（0.0008度）以内の精度で真っ直ぐ跳ね返す、三面直角の精密ガラスプリズムです。展示台の据付姿勢をレーザー干渉計で検証できます。',
    summary: '台座天面中央右後（X=+9.2, Y=+4.64, Z=-7.0）へ搭載された Thorlabs PS974M-A 級マウント済 N-BK7 コーナーキューブ再帰反射プリズム（350–700 nm BBAR コート, ビーム偏差 < 3 arcsec, SM 黒アルマイトねじ枠封止）。',
    opticsAndPhysics: [
      '互いに厳密 90°±1″ で交わる 3 全反射面により、入射角に関わらずレーザービームを 180°±<3″ の完全平行で光源へ帰還させ、レーザートラッカー・干渉計による 6 自由度設置アライメントを可能化。',
      'N-BK7 光学ガラス（n_d = 1.5168）＋ 350–700 nm 広帯域 AR コート（R < 0.5%）により可視レーザーの戻り光効率を 96% 以上に維持。',
    ],
    formula: {
      expression: 'θ_return = 180° ± < 3″ (14.5 μrad),   n_d(N-BK7) = 1.5168,   R_BBAR(350–700 nm) < 0.5%',
      description: 'コーナーキューブ再帰反射プリズムによりレーザー干渉計・トラッカーの 6DOF ベンチ姿勢計測に対応。',
    },
    nextGenInnovation: '月面レーザー測距と同原理の Thorlabs PS974M 級 <3″ 再帰反射ターゲットの天面実装。',
    specs: [
      { label: 'プリズム規格', value: 'Thorlabs PS974M-A 級 N-BK7 コーナーキューブ (偏差 < 3 arcsec)' },
      { label: 'コート・枠', value: '350–700 nm BBAR コート + 黒アルマイト SM マウント枠' },
      { label: '配置位置', value: '台座天面中央右後 (X=+9.2, lY∈[+3.95..+5.32], Z=-7.0)' },
    ],
    references: [
      'Thorlabs Inc., "PS974M-A Mounted N-BK7 Retroreflector (<3 arcsec Beam Deviation, 350-700 nm AR) Specification"',
      'SCHOTT AG, "N-BK7® Optical Borosilicate Crown Glass Technical Data Sheet"',
      'ISO 10110-5 / ASME B89.4.19 Laser Tracker Spherically Mounted & Corner-Cube Retroreflector Metrology',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(20, 12));
      const housing = new THREE.Mesh(new THREE.CylinderGeometry(2.02, 2.10, 1.02, seg), m.matteBlackAnodized);
      housing.position.set(9.2, 4.46, -7.0);
      const aperture = new THREE.Mesh(new THREE.CylinderGeometry(1.52, 1.52, 0.24, seg), m.welcomeOpticalEd);
      aperture.position.set(9.2, 4.98, -7.0);
      g.add(housing, aperture);
      if (ql >= 1) {
        const prismCore = new THREE.Mesh(new THREE.ConeGeometry(1.32, 0.52, 3), m.opticalCementClear);
        prismCore.position.set(9.2, 5.08, -7.0);
        const bezelRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.78, 0.14, 6, seg).rotateX(Math.PI * 0.5),
          m.stainlessMachined
        );
        bezelRing.position.set(9.2, 5.02, -7.0);
        g.add(prismCore, bezelRing);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-spectralon-white-ref',
    code: 'W403',
    order: 403,
    title: 'W403. 台座天面 Labsphere Spectralon® SRM-99 (>99% ランバート拡散反射) 色度校正白基準プラグ',
    subtitle: 'Plinth Top Deck Labsphere Spectralon® SRM-99 (>99% Lambertian Diffuse Reflectance) White Reference Plug',
    category: '光学ベンチ台座 / NIST準拠99%拡散白基準',
    swatchColor: '#f8fafc',
    explodeOffset: [0, -5, 0],
    plainAnalogy: 'カメラや分光測色計で「完全な白」を基準合わせするために天面へ埋め込んだ、反射率99%以上・どの角度から見ても均一なランバート拡散の焼結PTFE白色標準ターゲットです。',
    summary: '台座天面右前空き域（X=+54.8, Y=+4.18, Z=+7.5）へ埋設された Labsphere Spectralon® SRM-99 焼結 PTFE 拡散反射白基準プラグ（400–1500 nm 反射率 > 99%, 250–2500 nm 校正可能, ASTM E-595 脱ガス TML = 0.00%）。',
    opticsAndPhysics: [
      '微細多孔質焼結 PTFE 内部の多重体積散乱により、全可視〜近赤外（400–1500 nm）で >99% の極めて平坦な分光反射率と完全ランバート拡散特性を実現。',
      '現場カメラのカスタムホワイトバランス基準および CRI 97 文字発光との分光比較リファレンスとして即座に利用可能（耐水洗・脱ガス 0.00%）。',
    ],
    formula: {
      expression: 'ρ_8/H(400–1500 nm) > 0.990 (Lambertian cos θ),   ASTM E-595 TML = 0.00% (Spectralon® SRM-99)',
      description: 'NIST トレーサブル >99% 拡散反射 Spectralon® SRM-99 白基準プラグを光学ベンチ天面へ常設。',
    },
    nextGenInnovation: '衛星地球観測キャリブレーション標準 Labsphere Spectralon® SRM-99 の天面内蔵。',
    specs: [
      { label: '白基準材', value: 'Labsphere Spectralon® SRM-99 焼結PTFE (反射率 > 99% @ 400–1500 nm)' },
      { label: '光学・脱ガス', value: '極限ランバート拡散 / 250–2500 nm 校正可 / ASTM E-595 TML 0.00%' },
      { label: '配置位置', value: '台座天面右前空き域 (X=+54.8, lY∈[+3.95..+4.44], Z=+7.5)' },
    ],
    references: [
      'Labsphere Inc., "Spectralon® Diffuse Reflectance Material SRM-99 Technical Data Sheet (PB-13021 Rev 04)"',
      'ASTM E595 Outgassing Test — Spectralon® Total Mass Loss (TML = 0.00%) Qualification',
      'NIST Special Publication 250-65 Spectral Reflectance Calibration & Lambertian Standards',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(20, 12));
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(2.26, 2.30, 0.34, seg), m.matteBlackAnodized);
      cup.position.set(54.8, 4.12, 7.5);
      const target = new THREE.Mesh(new THREE.CylinderGeometry(1.86, 1.86, 0.22, seg), m.ptfeCleanWhite);
      target.position.set(54.8, 4.30, 7.5);
      g.add(cup, target);
      if (ql >= 1) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(2.04, 0.10, 6, seg).rotateX(Math.PI * 0.5),
          m.brassPrecision
        );
        ring.position.set(54.8, 4.32, 7.5);
        g.add(ring);
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-arri-arca-mount',
    code: 'W404',
    order: 404,
    title: 'W404. 底面中央 ARRI Mini 1/4"-20 回り止めピンボス対 (Ø3mm) & 38mm Arca-Swiss 45°ダブテール爪',
    subtitle: 'Plinth Bottom Center ARRI Mini 1/4"-20 Anti-Twist Pin-Lock Bosses (Ø3mm) & 38mm Arca-Swiss 45° Claws',
    category: '光学ベンチ台座 / ARRI回り止め・Arcaクイック着脱',
    swatchColor: '#364152',
    explodeOffset: [0, -50, 0],
    plainAnalogy: '幅194mmの横長ベンチを三脚ネジ1本だけで支えるとクルッと回って緩んでしまいます。シネマカメラ標準のARRI回り止めピン穴と38mmアルカスイス45°クランプ爪を底面中央へ一体化しました。',
    summary: '底面中央 1/4"-20 三脚ブッシュ（W351）両翼（X=±9.8, Z∈[-5.0..+5.0], lY∈[-7.78..-7.16]）へ装備された ARRI 1/4"-20 Pin-Lock 焼入 SUS440C 回り止めピン穴ボス対（Ø3.0 mm）＆ Arca-Swiss 38 mm 45°ダブテールクイックリリース爪対。',
    opticsAndPhysics: [
      '左右対称の Ø3.0 mm 焼入 SUS440C ARRI 回り止めピンボスが横長 194 mm 台座への偏心モーメント（最大 12 N·m）を剪断受けし、ISO 1222 1/4"-20 単軸ネジ（W351）の回転緩みを 100% 防止。',
      '両側 45°斜面の Arca-Swiss ダブテール爪により、プロ用雲台・スライダー・スタジオスタンドへ 1 秒で無工具クイック着脱可能。',
    ],
    formula: {
      expression: 'T_anti-twist = F_pin · d_span = 2 × 400 N × 18 mm = 14.4 N·m (Ø3.0 mm HRC 58 ARRI Pin + 45° Arca)',
      description: 'ARRI 回り止めピンボス対と 45°Arca-Swiss 爪で横長光学ベンチの三脚回転緩みをゼロ化。',
    },
    nextGenInnovation: 'シネマカメラ ARRI Pin-Lock × 写真業界標準 38 mm Arca-Swiss ハイブリッド底面マウント。',
    specs: [
      { label: '回り止め規格', value: 'ARRI Mini 1/4"-20 Pin-Lock (Ø3.0 mm 焼入 SUS440C ピン座対)' },
      { label: 'クイック着脱', value: 'Arca-Swiss 38 mm 45°ダブテール爪 (A6061 硬質黒アルマイト)' },
      { label: '配置位置', value: '底面中央 W351 両翼 (X=±9.8, Z∈[-5.0..+5.0], lY∈[-7.78..-7.16])' },
    ],
    references: [
      'ARRI AG, "Accessory Interface Specification — 1/4"-20 & 3/8"-16 Anti-Twist Pin-Lock Geometry (Ø3.0 mm)"',
      'ISO 1222:2010 Photography — Tripod Connections & Anti-Rotation Torque Prevention',
      'Arca-Swiss International, "38 mm 45° Dovetail Quick-Release Monoball Clamp Interface Standard"',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(16, 12));
      for (const side of [-1, 1]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.42, 9.6), m.matteBlackAnodized);
        rail.position.set(side * 9.8, -7.37, 0);
        const bevel = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.22, 9.4), m.welcomeCoreSlate);
        bevel.position.set(side * 9.4, -7.65, 0);
        g.add(rail, bevel);
        if (ql >= 1) {
          const boss = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.26, seg), m.hardenedSteelHrc60);
          boss.position.set(side * 8.9, -7.62, 0);
          const pinHole = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.30, seg), m.matteBlackAnodized);
          pinHole.position.set(side * 8.9, -7.63, 0);
          g.add(boss, pinHole);
        }
      }
      return g;
    },
  }),
  makePlinthC({
    id: 'welcome-plinth-hatch-choseal-gasket',
    code: 'W405',
    order: 405,
    title: 'W405. 底面電池サービスハッチ外周 Parker Chomerics CHO-SEAL 1285 導電シリコーンEMI/IP54ガスケット',
    subtitle: 'Plinth Bottom Service Hatch Parker Chomerics CHO-SEAL 1285 Conductive Silicone EMI/IP54 Gasket',
    category: '光学ベンチ台座 / 115dB導電EMIハッチ封止',
    swatchColor: '#8e99a8',
    explodeOffset: [0, -50, 0],
    plainAnalogy: '底面の電池交換ハッチ（W352）は便利な反面、電波とホコリが漏れる大きな穴になります。銀コートアルミ粒子を練り込んだ軍用規格の導電ゴム枠で隙間をぐるりと密閉し、115dBの電波遮蔽と防滴を両立します。',
    summary: '底面電池サービスハッチ（W352, 28×13 mm 開口）全周（X∈[-68.6..-39.4], Z∈[-7.02..+7.02], lY∈[-7.58..-7.16]）へ配した Parker Chomerics CHO-SEAL 1285 導電エラストマー EMI/IP54 ガスケット（MIL-DTL-83528 Type B, 銀コートアルミ充填シリコーン, ≤0.008 Ω·cm, シールド効果 115 dB @ 100 MHz, Shore A 65）。',
    opticsAndPhysics: [
      '28 mm のハッチ開口スロットは未封止だと 480 MHz MCU 高調波の効率的なスロットアンテナとなるが、体積抵抗率 ≤0.008 Ω·cm の CHO-SEAL 1285 圧縮接地により 100 MHz で 115 dB のファラデー連続性を回復。',
      '銀コートアルミ充填材はアルミ／マグネシウム筐体（W173）とのガルバニック電位差を最小化し、耐食性と IP54 防滴圧縮封止を 10 年以上維持。',
    ],
    formula: {
      expression: 'ρ_vol ≤ 0.008 Ω·cm,   SE(100 MHz) = 115 dB (MIL-DTL-83528 Type B),   Shore A = 65',
      description: 'MIL-DTL-83528 Type B 導電シリコーンガスケットにより電池ハッチの 115 dB EMI 遮蔽と IP54 防滴を同時達成。',
    },
    nextGenInnovation: '航空宇宙・軍用 EMC 規格 MIL-DTL-83528 Type B CHO-SEAL 1285 ハッチ導電封止。',
    specs: [
      { label: 'ガスケット材', value: 'Parker Chomerics CHO-SEAL 1285 (MIL-DTL-83528 Type B, Ag/Al シリコーン)' },
      { label: '電気・遮蔽', value: '体積抵抗率 ≤ 0.008 Ω·cm / シールド効果 115 dB @ 100 MHz / Shore A 65' },
      { label: '配置位置', value: '底面サービスハッチ W352 全周外枠 (X[-68.6..-39.4], Z[-7.02..+7.02])' },
    ],
    references: [
      'Parker Chomerics, "CHO-SEAL 1285 Conductive Elastomer EMI Gasket Datasheet (MIL-DTL-83528 Type B)"',
      'MIL-DTL-83528G General Specification for Elastomeric, Shielding Gasket, Conductive (Type B Ag-Al Silicone)',
      'IEC 60529 IP54 Environmental Sealing & CISPR 32 Enclosure Aperture EMI Attenuation Guidelines',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const mat = m.conductiveNiCuFoam;
      const y = -7.36;
      const h = 0.36;
      const barN = new THREE.Mesh(new THREE.BoxGeometry(29.1, h, 0.34), mat);
      barN.position.set(-54.0, y, 6.84);
      const barS = barN.clone();
      barS.position.set(-54.0, y, -6.84);
      const barW = new THREE.Mesh(new THREE.BoxGeometry(0.34, h, 13.34), mat);
      barW.position.set(-68.38, y, 0);
      const barE = barW.clone();
      barE.position.set(-39.62, y, 0);
      g.add(barN, barS, barW, barE);
      if (ql >= 1) {
        const beadN = new THREE.Mesh(new THREE.BoxGeometry(28.5, 0.08, 0.14), m.sintered316L);
        beadN.position.set(-54.0, -7.56, 6.84);
        const beadS = beadN.clone();
        beadS.position.set(-54.0, -7.56, -6.84);
        g.add(beadN, beadS);
      }
      return g;
    },
  }),
];

export function buildWelcomePlinthWaveCParts(mats: V2MaterialLibrary): CadPart[] {
  return buildExpansionCadParts(WELCOME_PLINTH_WAVE_C_DEFS, mats);
}
