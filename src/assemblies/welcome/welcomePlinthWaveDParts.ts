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

interface PlinthWaveDSpec {
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

function makePlinthD(s: PlinthWaveDSpec): WelcomeExpansionPartDef {
  return { ...s, groupKey: 'optical_plinth', assembledPos: PL_POS };
}

// ============================================================================
// Wave D Optical Plinth Expansion Parts (22 Parts: W414 - W435 -> 187 Plinth Parts!)
//   J. Stage/Museum DMX512-A, ix Industrial, PoE++, IEEE 1588 PTP & JJY Clock (W414-W418)
//   K. Lightning Surge, Ultra-Low-Noise LDO/Vref, Active Bal, Ship-Mode, EDLC (W419-W424)
//   L. Far-IR Body Heat, SCHOTT BG40, Micro-TEC, 18-bit AMR, Dyn-NFC, Tamper (W425-W430)
//   M. Permendur 49 Yoke, Smalley Wave Spring, PEM/Nord-Lock, Zeolite 4A, Rigging (W431-W435)
// ============================================================================
export const WELCOME_PLINTH_WAVE_D_DEFS: readonly WelcomeExpansionPartDef[] = [
  // --- J. Stage / Museum / Building Networks & Atomic Longwave Clock (W414 - W418) ---
  makePlinthD({
    id: 'welcome-plinth-dmx512-rdm-transceiver',
    code: 'W414',
    order: 414,
    title: 'W414. 舞台・美術館照明制御 ANSI E1.11 DMX512-A / RDM 信号電源一体絶縁トランシーバ (ADI ADM2587E)',
    subtitle: 'Plinth Stage/Museum Lighting ANSI E1.11 DMX512-A / RDM Signal+Power Isolated Transceiver (ADM2587E)',
    category: '光学ベンチ台座 / 舞台照明DMX512-A/RDM絶縁',
    swatchColor: '#1d2026',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '劇場や美術館のプロ用照明コンソールから直接「ようこそ」の明るさや演出をコントロールできるよう、信号と電源を丸ごと2,500V絶縁した世界標準DMX512-A/RDM通信チップです。',
    summary: '内部中央バスウェイ（X=-57.5, Y=+1.92, Z=0.0）に実装された Analog Devices ADM2587E（iCoupler® デジタル信号絶縁＋isoPower® 絶縁 DC/DC 一体内蔵, 2500 Vrms, 500 kbps RS-485 / ANSI E1.11 DMX512-A & ANSI E1.20 RDM 対応, ±15 kV ESD, >25 kV/μs CMTI, 256 ノード）。',
    opticsAndPhysics: [
      '建築・舞台照明の世界標準 ANSI E1.11 DMX512-A（250 kbps 差動 RS-485）および双方向ステータス監視 RDM（ANSI E1.20）へ単一 20-SOIC パッケージで 2.5 kVrms 信号＋電源一体絶縁対応。',
      '大型劇場ディマーラックからの接地電位差や ±15 kV 静電サージを完全遮断しつつ、最大 256 台のバス接続負荷（1/8 ユニットロード）に対応。',
    ],
    formula: {
      expression: 'V_iso = 2,500 Vrms (iCoupler® + isoPower®),   Baud = 250 kbps (DMX512-A / RDM),   ESD = ±15 kV',
      description: '信号・電源一体 2.5 kVrms 絶縁 RS-485 トランシーバにより舞台・美術館照明卓へ直結編入。',
    },
    nextGenInnovation: 'Analog Devices iCoupler® + isoPower® 1 チップ絶縁 DMX512-A / RDM 照明統合インターフェース。',
    specs: [
      { label: '絶縁IC', value: 'Analog Devices ADM2587E (iCoupler® + isoPower® 2.5 kVrms)' },
      { label: '対応規格', value: 'ANSI E1.11 DMX512-A (250 kbps) / ANSI E1.20 RDM / ±15 kV ESD' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-1 (X=-57.5, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Analog Devices Inc., "ADM2587E 2.5 kV rms Signal and Power Isolated RS-485 Transceiver Datasheet"',
      'ANSI E1.11-2008 (R2018) Entertainment Technology — USITT DMX512-A Asynchronous Serial Digital Data Transmission',
      'ANSI E1.20-2010 Entertainment Technology — RDM Remote Device Management over DMX512 Networks',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => buildMicroModuleBox(-57.5, 1.92, 0.0, 5.2, 0.38, 2.15, m.icEpoxy, m.aluminaCeramic, m),
  }),
  makePlinthD({
    id: 'welcome-plinth-ix-industrial-eth',
    code: 'W415',
    order: 415,
    title: 'W415. 背面 HARTING ix Industrial® (IEC 61076-3-124) 10GBASE-T / PoE++ 小型堅牢イーサネット端子',
    subtitle: 'Plinth Rear HARTING ix Industrial® (IEC 61076-3-124) 10GBASE-T / PoE++ Miniature Rugged Ethernet Jack',
    category: '光学ベンチ台座 / 10G/PoE++産業イーサネット端子',
    swatchColor: '#98a2b0',
    explodeOffset: [0, -16, -28],
    plainAnalogy: '薄い光学台座には背の高い従来のLANポート（RJ45）は入りません。RJ45より70%小さく5,000回抜き差ししても壊れない金属ロック付の次世代産業LAN端子で、10ギガ通信と71W給電を1本でこなします。',
    summary: '背面空き枠（X=-17.5, Y=-1.0, Z=-13.52）へ実装された HARTING ix Industrial® レセプタクル（IEC 61076-3-124 国際標準, RJ45 比 70% 省スペース, 10 mm ピッチ, 5,000 回挿抜耐久, 金属 2 点ラッチロック, 360° 全周シールド, Cat.6A 10GBASE-T & IEEE 802.3bt PoE++ 1.5A/pair 対応）。',
    opticsAndPhysics: [
      '内高わずか 7.6 mm の極薄 CNC 光学ベンチへ収まる超低背プロファイルと、プラスチック爪折れを根絶した金属 2 点スナップロック機構（5,000 サイクル保証）を両立。',
      '360° 全周金属シェルシールドと 5 本スルーホール THR 脚により、10GBASE-T 高速差動伝送と 71.3 W PoE++ 大電流給電時の EMC・振動耐性を確保。',
    ],
    formula: {
      expression: 'Footprint = 0.30 × RJ45 (-70%),   Cycles ≥ 5,000,   Cat.6A 10 Gbps + PoE++ 71.3 W (IEC 61076-3-124)',
      description: 'IEC 61076-3-124 準拠 HARTING ix Industrial® で薄型台座への 10G Ethernet＋71W 単線給電を実現。',
    },
    nextGenInnovation: '次世代産業・放送機器標準 HARTING ix Industrial®（RJ45 後継 IEC 61076-3-124）搭載。',
    specs: [
      { label: 'コネクタ規格', value: 'HARTING ix Industrial® Type A (IEC 61076-3-124, 10 mm ピッチ)' },
      { label: '伝送・耐久', value: 'Cat.6A 10GBASE-T / PoE++ 1.5A/pair / 5,000回挿抜 / 360°シールド' },
      { label: '配置位置', value: '背面 W342〜W346 間空き枠 (X=-17.5, lY=-1.0, Z=-13.52)' },
    ],
    references: [
      'IEC 61076-3-124:2019 Connectors for Electrical and Electronic Equipment — 10-Way Shielded Free & Fixed (ix Industrial)',
      'HARTING Technology Group, "ix Industrial® Ethernet Interface System Technical Specification (5,000 Cycles)"',
      'IEEE 802.3bt-2018 Power over Ethernet (4-Pair PoE++ Type 4 / 1.5A per Pair Contact Rating)',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const shell = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 0.48), m.stainlessMachined);
      shell.position.set(-17.5, -1.0, -13.50);
      const cavity = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 0.24), m.matteBlackAnodized);
      cavity.position.set(-17.5, -1.0, -13.65);
      g.add(shell, cavity);
      if (ql >= 1) {
        const key = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.34, 0.16), m.goldPlating);
        key.position.set(-17.5, -1.0, -13.68);
        const latchL = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.8, 0.14), m.titaniumRivet);
        latchL.position.set(-19.2, -1.0, -13.72);
        const latchR = latchL.clone();
        latchR.position.set(-15.8, -1.0, -13.72);
        g.add(key, latchL, latchR);
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-poepp-lt4295-pd',
    code: 'W416',
    order: 416,
    title: 'W416. IEEE 802.3bt PoE++ Type 4 (71.3W) 高効率受電PDコントローラ (ADI LT4295) ＆ 理想ブリッジ (LT4321)',
    subtitle: 'Plinth IEEE 802.3bt PoE++ Type 4 (71.3W) High-Efficiency PD Controller (LT4295) & Ideal Bridge (LT4321)',
    category: '光学ベンチ台座 / PoE++ 71.3W単線受電',
    swatchColor: '#1b5e47',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '美術館の天井近くやコンセントの無い壁面へ設置しても、LANケーブル1本から通信と同時に最大71.3Wもの電力を効率94%以上で受け取れるハイパワーPoE++受電回路です。',
    summary: '内部中央バスウェイ（X=-48.0, Y=+1.92, Z=0.0）へ搭載された Analog Devices LT4295（IEEE 802.3bt Type 4 Class 8 71.3 W 受電 PD コントローラ＋フォワード/フライバック制御）＆ LT4321（4 ペア PoE 理想ダイオードブリッジ, 100V サージ耐圧, 総合効率 > 94%）。',
    opticsAndPhysics: [
      '従来ショットキーダイオードブリッジ（電圧降下 ~1.2V → 損失 >1.8W）を LT4321 低 R_DS(on) MOSFET 理想ブリッジへ置換し、整流効率 >99%・DC/DC 含め総合 >94% で発熱を劇的削減。',
      'USB-C PD 65W（W195）と PoE++ 71.3W（W416）のデュアル給電冗長構成により、片系断線時も 0 ms 無瞬断稼働。',
    ],
    formula: {
      expression: 'P_PD,max = 71.3 W (IEEE 802.3bt Type 4 Class 8),   η_bridge(LT4321) > 99%,   η_sys > 94%',
      description: 'LT4295＋LT4321 理想ブリッジ構成でコンセント不要の LAN 単線 71.3 W 高効率受電を確立。',
    },
    nextGenInnovation: 'Analog Devices LT4295 + LT4321 理想ダイオードブリッジによる 71.3 W 高効率 PoE++ 単線駆動。',
    specs: [
      { label: '受電IC構成', value: 'Analog Devices LT4295 (PD Ctrl) + LT4321 (PoE 理想ダイオードブリッジ)' },
      { label: '規格・効率', value: 'IEEE 802.3bt Type 4 Class 8 (71.3 W) / 総合効率 > 94% / 100V耐圧' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-1 (X=-48.0, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Analog Devices Inc., "LT4295 IEEE 802.3bt PD Interface with Forward/Flyback Controller Datasheet"',
      'Analog Devices Inc., "LT4321 PoE Ideal Diode Bridge Controller Datasheet (99% Bridge Efficiency)"',
      'IEEE Std 802.3bt-2018 Physical Layer and Management Parameters for Power over Ethernet over 4 Pairs (Type 4)',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-48.0, 1.92, 0.0, 5.8, 0.38, 2.15, m.pcbEmeraldDark, m.copperHeatSpreader, m),
  }),
  makePlinthD({
    id: 'welcome-plinth-dp83867-ptp-phy',
    code: 'W417',
    order: 417,
    title: 'W417. IEEE 1588 PTP サブマイクロ秒時刻同期 ギガビットEthernet PHY (TI DP83867IR) ＆ パルストランス',
    subtitle: 'Plinth IEEE 1588 PTP Sub-Microsecond Sync Gigabit Ethernet PHY (TI DP83867IR) & Magnetics',
    category: '光学ベンチ台座 / IEEE 1588 PTPナノ秒同期PHY',
    swatchColor: '#1d2026',
    explodeOffset: [-6, -11, 4],
    plainAnalogy: '美術館の長い廊下に何台もの「ようこそ」を並べて光の波を走らせる時、Wi-Fiの遅延ブレ無しに100万分の1秒以下の精度で全機の時計を揃えるハードウェア時刻同期LANチップです。',
    summary: '内部中央バスウェイ（X=-38.5, Y=+1.92, Z=0.0）の Texas Instruments DP83867IR 産業用ギガビット Ethernet PHY（10/100/1000BASE-T, IEEE 1588 SFD ハードウェア・タイムスタンプ, TX <90 ns / RX <290 ns 超低確定遅延, >8 kV IEC 61000-4-2 ESD, TSN 準拠）＆絶縁パルストランス。',
    opticsAndPhysics: [
      'パケット先頭（SFD）を物理層ハードウェアで直接タイムスタンプする IEEE 1588v2 PTP 機能により、複数台間のクロック同期ジッタを < 100 ns（0.1 μs）へ抑え込み、32 kHz PWM 位相まで完全同期。',
      '確定的な超低遅延（TX < 90 ns, RX < 290 ns）と >8 kV 接触 ESD 耐性により、長距離回廊の産業 TSN ネットワークで高い堅牢性を発揮。',
    ],
    formula: {
      expression: 'Δt_sync(IEEE 1588 PTP) < 100 ns,   t_TX < 90 ns,   t_RX < 290 ns (DP83867IR SFD Hardware Timestamp)',
      description: 'IEEE 1588 ハードウェア・タイムスタンプ対応ギガビット PHY で複数台回廊設置のナノ秒同期を実現。',
    },
    nextGenInnovation: '産業 TSN / 放送スタジオ同期基準 TI DP83867IR IEEE 1588 ハードウェア PTP PHY 搭載。',
    specs: [
      { label: 'Ethernet PHY', value: 'Texas Instruments DP83867IR (10/100/1000BASE-T / IEEE 1588 SFD)' },
      { label: '遅延・耐性', value: 'TX < 90 ns / RX < 290 ns / >8 kV IEC 61000-4-2 ESD / TSN' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-1 (X=-38.5, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Texas Instruments, "DP83867IR/CR Robust, High Immunity 10/100/1000 Ethernet PHY Datasheet (SNLS484)"',
      'IEEE Std 1588-2019 Precision Clock Synchronization Protocol for Networked Measurement and Control Systems (PTPv2.1)',
      'TI Application Report SNLA242, "IEEE 1588 Start-of-Frame Detection (SFD) Implementation with DP83867"',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.14, 2.15), m.sensorPcb);
      pcb.position.set(-38.5, 1.75, 0.0);
      const phy = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.24, 1.85), m.icEpoxy);
      phy.position.set(-39.9, 1.94, 0.0);
      const mag = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.34, 1.95), m.ferriteInductor);
      mag.position.set(-37.2, 1.99, 0.0);
      g.add(pcb, phy, mag);
      if (ql >= 1) {
        const lid = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 1.4), m.emiShieldCan);
        lid.position.set(-37.2, 2.18, 0.0);
        g.add(lid);
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-jjy-atomic-clock',
    code: 'W418',
    order: 418,
    title: 'W418. 日本標準時 JJY 40/60 kHz 原子長波電波時計 フェライトバーアンテナ＆受信IC (MAS6180 / CME6005)',
    subtitle: 'Plinth Japan Standard Time JJY 40/60 kHz Atomic Longwave Clock Ferrite Bar Antenna & Receiver (MAS6180)',
    category: '光学ベンチ台座 / JJY原子長波電波時計',
    swatchColor: '#3a3f4a',
    explodeOffset: [0, -13.0, 11],
    plainAnalogy: 'Wi-FiもGPSも届かないオフライン展示室でも、日本の標準電波（福島40kHz・九州60kHz）を長いフェライト棒アンテナで直接キャッチし、開館挨拶や季節の色温度スケジュールを原子時計へ自動合わせします。',
    summary: '内部前面空き貫通レーン（X=-52.0, Y=+1.94, Z=+3.05, 幅 19.6 mm）へ収容された高透磁率フェライトバーアンテナ（Mn-Zn, 40/60 kHz デュアル同調巻線）＆ Micro Analog Systems MAS6180（高感度 0.4 μVrms, 40–100 kHz JJY/WWVB/DCF77 対応, 消費電流 40–66 μA, 水晶フィルタ高選択度）。',
    opticsAndPhysics: [
      '波長 7.5 km（40 kHz）/ 5.0 km（60 kHz）の長波標準電波は鉄筋コンクリート美術館の奥深くまで透過するため、非接続環境でも NICT セシウム原子時計へ ±10 ms 精度で自動校正。',
      '高 Q（>100）Mn-Zn フェライトバーアンテナと狭帯域水晶フィルタ付 MAS6180 により、32 kHz LED PWM 高調波を避け 0.4 μVrms の微弱電界でも安定復調。',
    ],
    formula: {
      expression: 'f_JJY = 40.000 kHz (おおたかどや山) / 60.000 kHz (はがね山),   Sensitivity = 0.4 μVrms,   I_DD ≈ 50 μA',
      description: 'JJY 40/60 kHz 原子標準電波受信により完全オフライン環境でも時刻・季節色温度を原子時計同期。',
    },
    nextGenInnovation: '日本の伝統「ようこそ」にふさわしい NICT JJY 40/60 kHz 原子長波標準電波時計の自律内蔵。',
    specs: [
      { label: '受信IC', value: 'Micro Analog Systems MAS6180 (40–100 kHz / 0.4 μVrms / 50 μA)' },
      { label: 'アンテナ', value: 'Mn-Zn 高透磁率フェライトバー + リッツ銅巻線 (40/60 kHz 切替同調)' },
      { label: '配置位置', value: '内部前面貫通レーン (X=-52.0, lY=+1.94, Z=+3.05, 長 19.6 mm)' },
    ],
    references: [
      'Micro Analog Systems Oy, "MAS6180D Very High Sensitivity AM Time Signal Receiver (40–100 kHz JJY) Datasheet"',
      'NICT (情報通信研究機構), "日本標準時・標準電波 JJY (40 kHz / 60 kHz) 送信仕様およびタイムコード規格"',
      'ITU-R Recommendation TF.768-6 Standard Frequencies and Time Signals (LF/VLF Broadcast Reception)',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(16, 12));
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 15.2, seg).rotateZ(Math.PI * 0.5),
        m.ferriteInductor
      );
      rod.position.set(-53.4, 1.94, 3.05);
      const coil = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.32, 5.4, seg).rotateZ(Math.PI * 0.5),
        m.copperCoil
      );
      coil.position.set(-53.4, 1.94, 3.05);
      const rxIc = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.34, 1.15), m.icEpoxy);
      rxIc.position.set(-44.0, 1.92, 3.05);
      g.add(rod, coil, rxIc);
      if (ql >= 1) {
        const xtal = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.16, 0.68), m.stainlessMachined);
        xtal.position.set(-44.0, 2.15, 3.05);
        g.add(xtal);
      }
      return g;
    },
  }),

  // --- K. Lightning Surge / Ultra-Low-Noise LDO & Vref / Active Bal / Ship-Mode / EDLC (W419 - W424) ---
  makePlinthD({
    id: 'welcome-plinth-bourns-tbu-gdt-surge',
    code: 'W419',
    order: 419,
    title: 'W419. 外部通信ポート IEC 61000-4-5 誘導雷サージ防護 Bourns TBU-CA 超高速遮断器 (<1µs) ＆ マイクロGDT',
    subtitle: 'Plinth External Port IEC 61000-4-5 Lightning Surge Bourns TBU-CA (<1us) Blocker & Micro-GDT',
    category: '光学ベンチ台座 / <1μs誘導雷サージ遮断',
    swatchColor: '#b91c1c',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '建屋内の長い通信ケーブルに落雷サージやAC100V誤配線が飛び込んでも、100万分の1秒以内に電子シャッターで電流を1mA以下へ断ち切り、ガス避雷管と連携して基板と絶縁壁を守り抜きます。',
    summary: '内部中央バスウェイ（X=-16.0, Y=+1.92, Z=0.0）の Bourns TBU-CA085 超高速過渡遮断器（応答 < 1 μs, 耐圧 850 V, 遮断時残留 < 1 mA, 通過エネルギー 100 nJ, 自動復帰）＋セラミック・マイクロ GDT ガス放電避雷管（IEC 61000-4-5 協調防護）。',
    opticsAndPhysics: [
      '一次段マイクロ GDT（最大 5 kA 8/20 μs 放流）と直列段 Bourns TBU-CA085（< 1 μs で高インピーダンス遮断状態へ遷移）の協調動作により、TVS 単体では焼損する大エネルギー誘導雷サージを 100 nJ 未満へ抑え込む。',
      'サージ消滅後はヒューズ交換不要で自動復帰し、遠隔地展示館の保守コストを削減。',
    ],
    formula: {
      expression: 't_block(TBU-CA085) < 1.0 μs,   V_imp = 850 V,   I_hold < 1 mA,   E_let-through ≈ 100 nJ',
      description: 'TBU-CA 超高速遮断＋マイクロ GDT 協調防護により長距離 CAN-FD/DMX512 配線の誘導雷破壊を根絶。',
    },
    nextGenInnovation: '通信基地局標準の Bourns TBU-CA + マイクロ GDT 二段協調 IEC 61000-4-5 雷サージ防護。',
    specs: [
      { label: '高速遮断器', value: 'Bourns TBU-CA085 HSP (応答 <1 μs / 耐圧 850 V / 自動復帰)' },
      { label: '一次避雷管', value: 'セラミック・マイクロ GDT (IEC 61000-4-5 8/20 μs 協調防護)' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-2 (X=-16.0, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Bourns Inc., "TBU-CA Series High-Speed Protector (850 V, <1 μs Transient Blocking Unit) Datasheet"',
      'IEC 61000-4-5:2014+AMD1:2017 Electromagnetic Compatibility — Surge Immunity Test (1.2/50 μs & 8/20 μs)',
      'Bourns Design Note, "Coordinated GDT + TBU + TVS Protection for Industrial RS-485 & CAN-FD Ports"',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(10, qRadialSegs(14, 10));
      const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.14, 2.15), m.sensorPcb);
      pcb.position.set(-16.0, 1.72, 0.0);
      const tbu = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.26, 1.55), m.icEpoxy);
      tbu.position.set(-17.1, 1.92, 0.0);
      const gdt = new THREE.Mesh(
        new THREE.CylinderGeometry(0.26, 0.26, 1.9, seg).rotateZ(Math.PI * 0.5),
        m.aluminaCeramic
      );
      gdt.position.set(-14.7, 1.96, 0.0);
      g.add(pcb, tbu, gdt);
      if (ql >= 1) {
        const capGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.24, seg).rotateZ(Math.PI * 0.5);
        const cL = new THREE.Mesh(capGeo, m.solderBallSilver);
        cL.position.set(-15.55, 1.96, 0.0);
        const cR = cL.clone();
        cR.position.set(-13.85, 1.96, 0.0);
        g.add(cL, cR);
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-lt3045-ultralownoise',
    code: 'W420',
    order: 420,
    title: 'W420. 60GHzレーダー・分光ADC専用 Analog Devices LT3045 超低ノイズ (0.8µVrms, 76dB PSRR) リニアLDO',
    subtitle: 'Plinth 60 GHz Radar & Spectral ADC Analog Devices LT3045 Ultra-Low-Noise (0.8 uVrms, 76 dB PSRR) LDO',
    category: '光学ベンチ台座 / 0.8µVrms超静粛アナログ電源',
    swatchColor: '#1d2026',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '60GHzレーダーや高感度マイクにスイッチング電源の微かな雑音が混ざると性能が落ちます。雑音わずか0.8マイクロボルト・1MHz電源リップルを1/6300へ消し去る世界最高峰の静粛電源ICです。',
    summary: '内部中央バスウェイ（X=-8.2, Y=+1.92, Z=0.0）の Analog Devices LT3045 超低ノイズ・超高 PSRR リニアレギュレータ（0.8 μVrms @ 10 Hz–100 kHz, スポット雑音 2 nV/√Hz @ 10 kHz, PSRR 76 dB @ 1 MHz, 500 mA, 1.8–20V）。',
    opticsAndPhysics: [
      '既存汎用 LDO（W244, 4.6 μVrms）の約 1/6 となる 0.8 μVrms の極限低雑音と 76 dB @ 1 MHz の超高リップル除去比（PSRR）により、60 GHz FMCW レーダー（W393）VCO 位相雑音と 73 dB(A) MEMS マイク（W398）の SN 比を最大化。',
      '単一 SET 抵抗による精密出力設定＋高精度電流源アーキテクチャで出力電圧に依存しない一定ノイズフロアを実現。',
    ],
    formula: {
      expression: 'V_n(10 Hz–100 kHz) = 0.8 μVrms,   e_n(10 kHz) = 2 nV/√Hz,   PSRR(1 MHz) = 76 dB (1/6310)',
      description: '世界最高クラスの 0.8 μVrms / 76 dB PSRR LDO で 60 GHz VCO・分光 ADC・高 SNR マイクを静粛給電。',
    },
    nextGenInnovation: '精密 RF 測定器・ハイエンドオーディオ基準の Analog Devices LT3045 超低雑音電源段。',
    specs: [
      { label: 'LDO型番', value: 'Analog Devices LT3045 (500 mA / 1.8–20V / DFN-10)' },
      { label: '雑音・PSRR', value: '0.8 μVrms (10Hz–100kHz) / 2 nV/√Hz / PSRR 76 dB @ 1 MHz' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-2 (X=-8.2, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Analog Devices Inc., "LT3045 20V, 500mA, Ultralow Noise, Ultrahigh PSRR Linear Regulator Datasheet"',
      'Analog Devices AN-159, "Measuring 2 nV/√Hz Output Noise & 76 dB PSRR of Ultralow-Noise LDOs for RF VCOs"',
      'Infineon AN608, "Power Supply Phase Noise Requirements for BGT60TR13C 60 GHz Radar MMIC"',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-8.2, 1.92, 0.0, 4.6, 0.38, 2.15, m.icEpoxy, m.goldPlating, m),
  }),
  makePlinthD({
    id: 'welcome-plinth-ref7025-vref',
    code: 'W421',
    order: 421,
    title: 'W421. 計装ADC絶対電圧基準 TI REF7025 / ADI ADR4525 超低ドリフト 2.5000V リファレンスIC (2 ppm/°C)',
    subtitle: 'Plinth Instrumentation ADC Voltage Reference TI REF7025 Ultra-Low-Drift 2.5000V Reference (2 ppm/°C)',
    category: '光学ベンチ台座 / 2ppm/°C絶対電圧基準',
    swatchColor: '#e2b648',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '光センサー・温度計・電流計すべての「電圧の物差し」となる絶対基準チップです。温度が1℃変わっても100万分の2（0.0002%）しか狂わないセラミック密閉パッケージで、校正精度を一生守ります。',
    summary: '内部中央バスウェイ（X=-1.0, Y=+1.92, Z=0.0）の Texas Instruments REF7025 超高精度シリーズ電圧リファレンス（固定 2.5000 V ±0.025%, 温度係数 最大 2 ppm/°C, 0.1–10 Hz 1/f 雑音 0.23 ppm_p-p, 8-LCCC 気密セラミック 5×5 mm）。',
    opticsAndPhysics: [
      'ハーメチック 8-LCCC セラミックパッケージが基板曲げ応力と吸湿ヒステリシスを遮断し、長期安定度 28 ppm/1000h・温度ドリフト最大 2 ppm/°C（−40〜+125°C）を実現。',
      '4 文字フォトダイオード帰還・NTC 温度計測・シャント電流 ADC へ共通の絶対 2.5000 V 物差しを供給し、16-bit 計装計測の系統誤差を排除。',
    ],
    formula: {
      expression: 'V_REF = 2.5000 V ± 0.025%,   TC_max = 2 ppm/°C,   V_n(0.1–10 Hz) = 0.23 ppm_p-p (REF7025)',
      description: '気密セラミック 2 ppm/°C 絶対電圧基準により全アナログ計測・輝度帰還の校正精度を長期維持。',
    },
    nextGenInnovation: '6.5 桁デジタルマルチメータ級の TI REF7025 気密 LCCC 2 ppm/°C 絶対電圧基準。',
    specs: [
      { label: '電圧基準IC', value: 'Texas Instruments REF7025 (2.5000 V ±0.025% / 8-LCCC 気密セラミック)' },
      { label: 'ドリフト・雑音', value: '最大 2 ppm/°C (-40〜+125°C) / 0.23 ppm_p-p (0.1–10 Hz)' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-2 (X=-1.0, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Texas Instruments, "REF70 2 ppm/°C Maximum Drift, 0.23 ppmp-p 1/f Noise Precision Voltage Reference Datasheet (SNAS771)"',
      'TI Application Note SLYT813, "Hermetic LCCC Package Immunity to Humidity & PCB Mechanical Stress Drift"',
      'NIST / IEEE 1241 Standard for Terminology and Test Methods for Analog-to-Digital Converters (Vref Accuracy)',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-1.0, 1.92, 0.0, 4.4, 0.38, 2.15, m.aluminaCeramic, m.goldPlating, m),
  }),
  makePlinthD({
    id: 'welcome-plinth-eta3000-active-bal',
    code: 'W422',
    order: 422,
    title: 'W422. LiFePO4 2S電池 92%高効率 2A インダクティブ能動セルバランサ (ETA3000 / LT8584)',
    subtitle: 'Plinth 2S LiFePO4 Battery 92%-Efficiency 2A Inductive Active Cell Balancer (ETA3000 / LT8584)',
    category: '光学ベンチ台座 / 92%高効率能動セルバランス',
    swatchColor: '#1b5e47',
    explodeOffset: [-6, -9.5, 18],
    plainAnalogy: '従来のバランス回路は多い方の電池の電気を熱として捨てていました。この能動バランサはコイルの磁力で多いセルから少ないセルへ92%の効率で直接電気を移し替え、熱を出さず電池寿命を倍増します。',
    summary: '電池区画直上の内部中央バスウェイ Bay-0（X=-80.0, Y=+1.92, Z=0.0）に配置された ETA3000 / ADI LT8584 インダクティブ双方向能動セルバランサ（最大 2.0 A 均等化電流, 電荷移送効率 92%, 静止電流 <10 μA, パッシブ発熱ゼロ）。',
    opticsAndPhysics: [
      '既存パッシブ抵抗バランス（W290, ~100 mA 散逸）の 20 倍となる最大 2 A の双方向インダクティブ電荷移送（効率 92%）により、2S LiFePO4 セル間電圧差を < 5 mV 以内へ高速収束。',
      '余剰エネルギーを熱へ捨てないため密閉筐体内の温度上昇ゼロ、UPS 電池パックの使用可能容量と 3,000 サイクル超の長寿命を最大化。',
    ],
    formula: {
      expression: 'η_transfer = E_dst / E_src = 92%,   I_bal,max = 2.0 A,   |V_cell1 - V_cell2| < 5 mV',
      description: '92% 効率 2 A インダクティブ双方向電荷移送で発熱ゼロ・高速 2S LiFePO4 セル均等化を達成。',
    },
    nextGenInnovation: 'EV・蓄電システム最先端のインダクティブ 2A 92% 高効率能動セルバランシング。',
    specs: [
      { label: 'バランサIC', value: 'ETA3000 / Analog Devices LT8584 インダクティブ能動バランサ' },
      { label: '均等化性能', value: '最大 2.0 A 双方向移送 / 効率 92% / セル電圧差 < 5 mV' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-0 電池直上 (X=-80.0, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Analog Devices Inc., "LT8584 2.5A Monolithic Active Cell Balancer with Telemetry Monitor Datasheet"',
      'ETA Solutions, "ETA3000 2A High-Efficiency Inductive Active Battery Balancer Technical Specification"',
      'Plett, G. L., "Battery Management Systems, Vol. II: Equivalent-Circuit Methods" (Active vs Passive Balancing)',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.14, 2.15), m.pcbEmeraldDark);
      pcb.position.set(-80.0, 1.75, 0.0);
      const ic = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.24, 1.55), m.icEpoxy);
      ic.position.set(-81.3, 1.94, 0.0);
      const ind = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.34, 1.80), m.ferriteInductor);
      ind.position.set(-78.8, 1.99, 0.0);
      g.add(pcb, ic, ind);
      if (ql >= 1) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 1.25), m.tantalumCapYellow);
        cap.position.set(-82.3, 1.91, 0.0);
        g.add(cap);
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-tlp3122a-ship-relay',
    code: 'W423',
    order: 423,
    title: 'W423. 輸送・長期保管Ship-Mode用 Toshiba TLP3122A PhotoMOS® 絶縁ソリッドステート・バッテリー遮断リレー',
    subtitle: 'Plinth Transport Ship-Mode Toshiba TLP3122A PhotoMOS® 3750 Vrms Solid-State Battery Cutoff Relay',
    category: '光学ベンチ台座 / Ship-Mode無接点電池遮断',
    swatchColor: '#f8fafc',
    explodeOffset: [12, -9.5, 6],
    plainAnalogy: '美術館から倉庫へ移して何年も保管する間、わずかな待機電力で電池が空っぽになって壊れないよう、光の信号で電池回路を完全に切り離す3,750V絶縁・無接点リレーです。',
    summary: '内部前面レーン電池直上（X=-76.0, Y=+1.92, Z=+2.95）の Toshiba TLP3122A PhotoMOS® 光結合 MOSFET リレー（60V / 1.4A, 3750 Vrms 絶縁耐圧, UL 1577 File E67349 / EN 60747-5-5 認証, 4-pin SO6, 遮断時リーク暗電流 < 1 μA）。',
    opticsAndPhysics: [
      '輸送・長期保管コマンド受信時に電池正極パスを光絶縁 MOSFET で完全遮断し、システム暗電流を < 1 μA へ落として LiFePO4 過放電死を 5 年以上防止。',
      '機械式リレーと異なり接点バウンス・振動誤開放・酸化劣化がゼロで、USB-C 接続検出で瞬時自動ウェイクアップ。',
    ],
    formula: {
      expression: 'I_leak(Ship-Mode) < 1.0 μA  ⇒  Storage Life > 5 yr,   V_iso = 3,750 Vrms (UL 1577 E67349)',
      description: '3750 Vrms 絶縁 PhotoMOS® 遮断リレーにより輸送・長期保管時の過放電劣化と暗電流を根絶。',
    },
    nextGenInnovation: 'UN38.3 航空輸送・長期保管 Ship-Mode 対応 Toshiba TLP3122A 光結合無接点遮断リレー。',
    specs: [
      { label: 'PhotoMOSリレー', value: 'Toshiba TLP3122A (60V / 1.4A / 1 Form A / 4-pin SO6)' },
      { label: '絶縁・暗電流', value: '3750 Vrms (UL 1577 E67349) / Ship-Mode リーク < 1 μA' },
      { label: '配置位置', value: '内部前面貫通レーン左端 (X=-76.0, lY=+1.92, Z=+2.95)' },
    ],
    references: [
      'Toshiba Electronic Devices & Storage Corp., "TLP3122A Photorelay (60V, 1.4A, 3750 Vrms) Datasheet"',
      'UL 1577 Optical Isolators (File No. E67349) & IEC/EN 60747-5-5 Optocoupler Safety Standard',
      'UN38.3 Manual of Tests and Criteria — Lithium Battery Transport Ship-Mode Isolation Guidelines',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(-76.0, 1.92, 2.95, 5.0, 0.36, 1.32, m.ptfeCleanWhite, m.icEpoxy, m),
  }),
  makePlinthD({
    id: 'welcome-plinth-ltc3350-scap-health',
    code: 'W424',
    order: 424,
    title: 'W424. スーパーキャパシタ(W291) 容量・ESR劣化診断＆昇降圧バックアップ制御IC (ADI LTC3350)',
    subtitle: 'Plinth Supercapacitor (W291) Capacitance/ESR Health Monitor & Buck-Boost Backup Controller (ADI LTC3350)',
    category: '光学ベンチ台座 / EDLC寿命・ESR自動診断',
    swatchColor: '#1d2026',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '瞬停バックアップ用スーパーキャパシタ（W291）は年数とともに容量が減り内部抵抗が増えます。定期的に自動で容量と内部抵抗（ESR）を測って劣化を予知し、停電時は昇降圧で電力を供給する専用管理ICです。',
    summary: 'スーパーキャパシタバンク（W291）直近の内部中央バスウェイ Bay-3（X=+56.0, Y=+1.92, Z=0.0）に配置された Analog Devices LTC3350（1–4 直列 EDLC 充電・セルバランス・双方向同期昇降圧＋I²C 経由スタック静電容量＆ESR 自動診断・デュアル理想ダイオード内蔵）。',
    opticsAndPhysics: [
      '定期テストパルスでスーパーキャパシタスタック（W291）の真の静電容量 C_stack と等価直列抵抗 ESR を自動計測し、I²C 経由で残存バックアップ時間（秒）と交換予兆アラートを報告。',
      '主電源・電池同時瞬断時もデュアル理想ダイオードが 0 ms でバックアップ昇圧へ切替、FRAM（W249）ログ書込と安全フェードアウトを完結。',
    ],
    formula: {
      expression: 'E_avail = ½ C_stack · (V_chg² - V_min²) - I² · ESR · t  (LTC3350 自動 C / ESR 診断)',
      description: 'LTC3350 による EDLC 容量・ESR 自動計測と双方向昇降圧で停電フェイルセーフの劣化死を防止。',
    },
    nextGenInnovation: '産業無停電ストレージ標準 Analog Devices LTC3350 EDLC 予知保全コントローラ統合。',
    specs: [
      { label: '管理IC', value: 'Analog Devices LTC3350 (1–4直列 EDLC 充電・昇降圧・理想ダイオード)' },
      { label: '劣化診断', value: 'I²C / SMBus 経由 スタック静電容量 (F) & ESR (mΩ) 自動測定' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-3 W291 直近 (X=+56.0, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Analog Devices Inc., "LTC3350 High Current Supercapacitor Backup Controller and System Monitor Datasheet"',
      'Analog Devices Application Note, "Automated Stack Capacitance and ESR Measurement Using LTC3350"',
      'IEC 62391-1 Fixed Electric Double-Layer Capacitors — Aging & End-of-Life ESR Criteria',
    ],
    diagramType: 'welcome_power_lifepo4',
    build: (m) => buildMicroModuleBox(56.0, 1.92, 0.0, 6.0, 0.38, 2.15, m.icEpoxy, m.copperHeatSpreader, m),
  }),

  // --- L. Far-IR Body Heat / SCHOTT BG40 / Micro-TEC / 18-bit AMR / Dynamic NFC / Tamper (W425 - W430) ---
  makePlinthD({
    id: 'welcome-plinth-d6t-ir-thermopile',
    code: 'W425',
    order: 425,
    title: 'W425. 前面左端 Omron D6T-44L-06 4×4 MEMS遠赤外線サーモパイル人体体温検知センサー (Siレンズ付)',
    subtitle: 'Plinth Front Far-Left Omron D6T-44L-06 4x4 MEMS Far-IR Thermopile Human Thermal Sensor (Si Lens)',
    category: '光学ベンチ台座 / 遠赤外線人体体温4層目融合',
    swatchColor: '#1b0814',
    explodeOffset: [0, -16, 32],
    plainAnalogy: '風で揺れるカーテンやお掃除ロボットを人間と間違えないよう、人の体温（約36.5℃）が放つ遠赤外線を4×4＝16マスで非接触サーモグラフィー検知するオムロン製シリコンレンズ付温度センサーです。',
    summary: '前面左端対称計装窓（X=-48.0, Y=-0.70, Z=+13.26, W426 と完全左右対称）に配置された Omron D6T-44L-06 4×4（16ch）MEMS 遠赤外線サーモパイル・サーマルセンサー（シリコン集光レンズ内蔵, 視野角 44.2°×45.7°, I²C 出力, 波長 8–14 μm 遠赤外線非接触人体検知）。',
    opticsAndPhysics: [
      '光学 ToF（W211）・60 GHz ミリ波レーダー（W393）・UWB（W394）に続く第 4 の異種物理モダリティとして、ステファン・ボルツマン則に基づく人体皮膚（~33–36.5°C, ピーク λ ≈ 9.4 μm）の遠赤外放射を 4×4 マトリクス撮像。',
      '無生物（カーテン・清掃ロボット）と静止鑑賞中の人間を 99.9% 識別し、誤点灯ゼロの洗練された迎賓演出を実現。',
    ],
    formula: {
      expression: 'M = ε · σ · T⁴ (λ_peak ≈ 9.4 μm @ 309 K),   4×4 MEMS Array,   FOV = 44.2° × 45.7°',
      description: '遠赤外線 4×4 体温マトリクスを 4 層目融合することで非人間物体への誤反応をゼロ化。',
    },
    nextGenInnovation: 'ToF × 60 GHz レーダー × UWB × Omron 遠赤外線 4×4 サーモパイルの 4 重物理センサー融合。',
    specs: [
      { label: 'センサー型番', value: 'Omron D6T-44L-06 (4×4 = 16ch MEMS 遠赤外線サーモパイル / I²C)' },
      { label: '光学・視野', value: '8–14 μm 遠赤外線シリコンレンズ内蔵 / FOV 44.2° × 45.7°' },
      { label: '配置位置', value: '前面左端対称窓 (X=-48.0, lY=-0.70, Z=+13.26, W426 対称)' },
    ],
    references: [
      'Omron Electronic Components, "D6T-44L-06 4×4 MEMS Thermal Sensor Datasheet & Application Catalog"',
      'Planck / Stefan-Boltzmann Thermal Radiation Law — Human Skin Long-Wave IR Emission (8–14 μm)',
      'IEEE Sensors Journal, "Multi-Modal Presence Detection Combining 60 GHz Radar, ToF & Far-IR Thermopiles"',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(16, 12));
      const frame = new THREE.Mesh(new THREE.BoxGeometry(7.6, 2.7, 0.28), m.matteBlackAnodized);
      frame.position.set(-48.0, -0.70, 13.24);
      const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(1.02, 1.12, 0.24, seg).rotateX(Math.PI * 0.5),
        m.evfIrWindowBlack
      );
      lens.position.set(-48.0, -0.70, 13.36);
      g.add(frame, lens);
      if (ql >= 1) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.12, 6, seg), m.stainlessMachined);
        ring.position.set(-48.0, -0.70, 13.38);
        const grid = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.06), m.siliconSensorDie);
        grid.position.set(-48.0, -0.70, 13.45);
        g.add(ring, grid);
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-bg40-ircut-filter',
    code: 'W426',
    order: 426,
    title: 'W426. 前面右端 SCHOTT BG40 吸収型近赤外カット光学フィルタガラス (400–700nm CIE色度補正)',
    subtitle: 'Plinth Front Far-Right SCHOTT BG40 Absorption NIR-Cut Optical Filter Glass (400-700nm CIE Correction)',
    category: '光学ベンチ台座 / SCHOTT BG40近赤外カット窓',
    swatchColor: '#0e94c8',
    explodeOffset: [0, -16, 32],
    plainAnalogy: '太陽や白熱電球に含まれる目に見えない近赤外線が色センサーへ入り込むと色が狂ってしまいます。ドイツSCHOTT社の青緑色ガラスフィルタで近赤外線だけを吸収し、人間の目と同じ正しい測色を保証します。',
    summary: '前面右端対称窓（X=+48.0, Y=-0.70, Z=+13.26, W425 と完全左右対称）へ配置された SCHOTT BG40 吸収型バンドパス・近赤外カット光学ガラス（400–700 nm 高透過、>750 nm 急峻吸収遮断, CIE 1931 測色角度非依存補正）。',
    opticsAndPhysics: [
      '干渉型 IR カットと異なり吸収型 BG40 ガラスは斜め大入射角（±60°）でもカットオフ波長が青方シフトしないため、広角環境光測色（AS7341 / VEML7700）の CIE 1931 色度系統誤差を 85% 削減。',
      '前面 5 窓対称計装配列（-48:遠IR / -28:60GHz / 0:940nm ToF / +28:11ch分光 / +48:BG40 IRカット）の右翼を美観・機能ともに完結。',
    ],
    formula: {
      expression: 'T_i(BG40, 400–620 nm) > 90%,   T_i(850–1000 nm) < 0.1%,   Δλ_cut(AOI 0→60°) = 0 nm',
      description: '入射角非依存の吸収型 SCHOTT BG40 フィルタガラスにより広角展示環境光の CIE 測色精度を保証。',
    },
    nextGenInnovation: '高級カメラセンサー・分光測色計標準のドイツ SCHOTT BG40 吸収型 IR カット光学窓。',
    specs: [
      { label: '光学ガラス', value: 'SCHOTT BG40 吸収型バンドパス・近赤外カットガラス' },
      { label: '透過帯域', value: '可視 400–700 nm 高透過 / <315 nm & >750 nm 急峻吸収遮断' },
      { label: '配置位置', value: '前面右端対称窓 (X=+48.0, lY=-0.70, Z=+13.26, W425 対称)' },
    ],
    references: [
      'SCHOTT AG, "BG40 Optical Bandpass Filter Glass Technical Data Sheet (Absorption NIR-Cut)"',
      'CIE 1931 Standard Colorimetric Observer — Photopic V(λ) & IR Leakage Error Correction',
      'ISO 10110-12 Optical Filter Glass Surface Quality & Angle-Insensitive Absorption Optics',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const frame = new THREE.Mesh(new THREE.BoxGeometry(7.6, 2.7, 0.28), m.matteBlackAnodized);
      frame.position.set(48.0, -0.70, 13.24);
      const glass = new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.85, 0.16), m.irCutGlass);
      glass.position.set(48.0, -0.70, 13.34);
      g.add(frame, glass);
      if (ql >= 1) {
        const bevel = new THREE.Mesh(new THREE.BoxGeometry(6.3, 2.12, 0.08), m.stainlessMachined);
        bevel.position.set(48.0, -0.70, 13.39);
        const sheen = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.45, 0.04), m.fluorineCoatCyan);
        sheen.position.set(48.0, -0.70, 13.44);
        g.add(bevel, sheen);
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-optotec-micro-tec',
    code: 'W427',
    order: 427,
    title: 'W427. Laird OptoTEC™ OTX マイクロ・ペルチェ熱電恒温素子 (TEC) & TI TMP117 (±0.1°C NIST) 基準温度計',
    subtitle: 'Plinth Laird OptoTEC™ OTX Micro-Peltier TEC & TI TMP117 (±0.1°C NIST-Traceable) Reference Thermometer',
    category: '光学ベンチ台座 / ±0.05°Cマイクロ熱電恒温槽',
    swatchColor: '#eef2f6',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '電源を入れた直後の自己発熱で水晶時計（W246）や電圧基準（W421）がわずかにズレないよう、超小型ペルチェ素子とNIST規格±0.1℃温度計で±0.05℃のミニ恒温槽に保つ精密温度制御です。',
    summary: 'TCXO（W246）直近の内部中央バスウェイ Bay-2（X=+9.5, Y=+1.92, Z=0.0）へ実装された Laird Thermal OptoTEC™ OTX マイクロ熱電クーラ（Telcordia GR-468 認証, 最大 ΔT = 74–82°C, 上限 120°C）＋ Texas Instruments TMP117（±0.1°C max, 0.0078°C 16-bit, ISO/IEC 17025 NIST トレーサブル）。',
    opticsAndPhysics: [
      'Bi₂Te₃ ペルチェ熱電素子（OptoTEC™ OTX）を TMP117 の 7.8 mK 分解能 PID 閉ループで双方向電流駆動し、TCXO 基準発振器と REF7025 電圧基準の温度を 35.00 ± 0.05°C へロック（小型 OCXO 相当）。',
      'Telcordia GR-468 光通信レーザーモジュール認証準拠の耐熱はんだ構造により 24/7 連続稼働で長寿命。',
    ],
    formula: {
      expression: 'Q_c = α_S · I · T_c - ½ I² R - K · ΔT,   T_ref = 35.00 ± 0.05°C (TMP117 ±0.1°C NIST)',
      description: 'マイクロ TEC＋NIST ±0.1°C 基準温度計の閉ループ恒温化により基準クロック・基準電圧ドリフトを極小化。',
    },
    nextGenInnovation: '光トランシーバ Telcordia GR-468 準拠 OptoTEC™ OTX マイクロ恒温槽＋TI TMP117 統合。',
    specs: [
      { label: '熱電素子', value: 'Laird Thermal OptoTEC™ OTX (Bi₂Te₃ / Telcordia GR-468 / ΔT 74°C)' },
      { label: '基準温度計', value: 'Texas Instruments TMP117 (±0.1°C max / 0.0078°C / NIST準拠)' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-2 W246 直近 (X=+9.5, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Laird Thermal Systems, "OptoTEC™ OTX Series High-Temperature Miniature Thermoelectric Coolers (GR-468) Datasheet"',
      'Texas Instruments, "TMP117 High-Accuracy, Low-Power, Digital Temperature Sensor (±0.1°C NIST) Datasheet (SNOSCY1)"',
      'Telcordia GR-468-CORE Generic Reliability Assurance Requirements for Optoelectronic Devices',
    ],
    diagramType: 'welcome_led_thermal',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const botPlate = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.12, 2.05), m.aluminaCeramic);
      botPlate.position.set(8.8, 1.72, 0.0);
      const topPlate = botPlate.clone();
      topPlate.position.set(8.8, 2.12, 0.0);
      const legs = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.26, 1.65), m.siliconBulk);
      legs.position.set(8.8, 1.92, 0.0);
      const tmpIc = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.28, 1.45), m.icEpoxy);
      tmpIc.position.set(12.2, 1.88, 0.0);
      g.add(botPlate, topPlate, legs, tmpIc);
      if (ql >= 1) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.9), m.goldPlating);
        cap.position.set(12.2, 2.05, 0.0);
        g.add(cap);
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-mmc5983ma-amr-mag',
    code: 'W428',
    order: 428,
    title: 'W428. 3軸超低ノイズ MEMSIC MMC5983MA 18bit AMR磁気コンパス (0.4mG, ±0.5°方位, 自動消磁SET/RESET)',
    subtitle: 'Plinth 3-Axis Ultra-Low-Noise MEMSIC MMC5983MA 18-bit AMR Compass (0.4 mG, ±0.5°, Auto SET/RESET)',
    category: '光学ベンチ台座 / 18bit AMR方位・磁気妨害検知',
    swatchColor: '#1d2026',
    explodeOffset: [12, -9.5, 10],
    plainAnalogy: '台座が東西南北のどちらを向いて設置されたか±0.5°の精度で自動把握してレーダー空間マップを補正し、さらに悪意ある強力磁石でドックセンサーを騙そうとする妨害も即座に検知します。',
    summary: '内部中央バスウェイ Bay-3（X=+34.5, Y=+1.92, Z=0.0）に配置された MEMSIC MMC5983MA AEC-Q100 認証 3 軸異方性磁気抵抗（AMR）磁気センサー（±8 G, 18-bit 分解能, 0.4 mG RMS 雑音, 方位精度 ±0.5°, 内蔵 SET/RESET 自動消磁コイル, 3.0×3.0×1.0 mm LGA）。',
    opticsAndPhysics: [
      '内蔵 SET/RESET 電流パルスによりパーマロイ AMR 薄膜の磁区ヒステリシス・残留着磁・温度オフセットを毎計測時に自動消去し、0.4 mG（40 nT）の超低雑音と ±0.5° 方位精度を達成。',
      '地球磁場（~0.46 G）の異常ベクトル変化を監視することで、外部ネオジム磁石によるドック着脱ホールセンサー（W262）へのスプーフィング妨害を検知。',
    ],
    formula: {
      expression: 'LSB_18bit = 16 G / 2¹⁸ = 0.0625 mG,   Noise = 0.4 mG RMS ⇒ Heading ±0.5° (Auto SET/RESET)',
      description: '18-bit AMR＋内蔵自動消磁により設置方位の自動キャリブレーションと磁気改ざん検知を両立。',
    },
    nextGenInnovation: '車載 AEC-Q100 準拠 MEMSIC MMC5983MA 18-bit 自動消磁 AMR 磁気コンパス搭載。',
    specs: [
      { label: '磁気センサー', value: 'MEMSIC MMC5983MA (AEC-Q100 / 3軸 18-bit AMR / ±8 G)' },
      { label: '精度・機能', value: '0.4 mG RMS / 方位 ±0.5° / 内蔵 SET-RESET 自動消磁 / 1000 Hz' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-3 (X=+34.5, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'MEMSIC Inc., "MMC5983MA High Performance 3-Axis 18-bit AMR Magnetic Sensor Datasheet (Rev. A)"',
      'AEC-Q100 Stress Test Qualification for Integrated Circuits — Automotive Magnetometer Reliability',
      'Ripka, P., "Magnetic Sensors and Magnetometers", Artech House (AMR SET/RESET Offset Cancellation)',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => buildMicroModuleBox(34.5, 1.92, 0.0, 4.2, 0.38, 2.15, m.icEpoxy, m.softIronYoke, m),
  }),
  makePlinthD({
    id: 'welcome-plinth-st25dv64kc-dyn-nfc',
    code: 'W429',
    order: 429,
    title: 'W429. STMicroelectronics ST25DV64KC 動的NFC (ISO/IEC 15693) 64Kbit デュアルIF & RF給電ブリッジIC',
    subtitle: 'Plinth STMicroelectronics ST25DV64KC Dynamic NFC (ISO/IEC 15693) 64-Kbit Dual-IF & RF Energy-Harvesting IC',
    category: '光学ベンチ台座 / 動的NFC双方向・RF給電起動',
    swatchColor: '#0284c7',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '天面のNFCリング（W340）へスマホをかざすと、マイコンとリアルタイムに双方向で設定や診断ログをやり取りでき、本体が完全スリープ中でもスマホの電波エネルギーだけで起動できる動的NFCチップです。',
    summary: '天面 NFC ハロー（W340）直下の内部前面レーン（X=-5.0, Y=+1.92, Z=+2.95）へ配置された STMicroelectronics ST25DV64KC 動的 NFC/RFID タグ IC（13.56 MHz ISO/IEC 15693 Type 5 + I²C デュアル IF, 64 Kbit EEPROM, 256B Fast Transfer メールボックス, V_EH RF エナジーハーベスティング出力）。',
    opticsAndPhysics: [
      '256 バイト高速転送メールボックス（FTM）により EEPROM 書換寿命を消費せずスマホと STM32H743 間で双方向ファーム設定・リアルタイムテレメトリ・演出切替を実施。',
      'V_EH RF エナジーハーベスティング端子がスマホの 13.56 MHz 磁界から直接 DC 電圧を生成し、完全電源断／Ship-Mode 状態でも非接触シリアル・診断ログ読出が可能。',
    ],
    formula: {
      expression: 'f_carrier = 13.56 MHz (ISO/IEC 15693),   EEPROM = 64 Kbit,   FTM = 256 B Mailbox + V_EH RF Harvest',
      description: 'ISO/IEC 15693 デュアル IF＋RF エナジーハーベスティングで無電源保守＆双方向スマホ連携を実現。',
    },
    nextGenInnovation: 'STMicroelectronics ST25DV64KC RF 給電＆256B 高速メールボックス付動的 NFC ブリッジ。',
    specs: [
      { label: '動的NFC IC', value: 'STMicroelectronics ST25DV64KC (13.56 MHz ISO/IEC 15693 + I²C)' },
      { label: 'メモリ・機能', value: '64 Kbit EEPROM / 256B FTM 双方向 / V_EH RF エナジーハーベスト' },
      { label: '配置位置', value: '内部前面貫通レーン W340 直下 (X=-5.0, lY=+1.92, Z=+2.95)' },
    ],
    references: [
      'STMicroelectronics, "ST25DV64KC Dynamic NFC/RFID Tag IC with 64-Kbit EEPROM & Fast Transfer Mode Datasheet (DS13519)"',
      'ISO/IEC 15693-3 Identification Cards — Contactless Integrated Circuit Cards (Vicinity Cards, 13.56 MHz)',
      'NFC Forum Type 5 Tag Technical Specification — Dynamic NDEF & Energy Harvesting',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => buildMicroModuleBox(-5.0, 1.92, 2.95, 5.0, 0.36, 1.32, m.icEpoxy, m.blue450Glow, m),
  }),
  makePlinthD({
    id: 'welcome-plinth-opt-tamper-buzzer',
    code: 'W430',
    order: 430,
    title: 'W430. 暗室光侵入タンパー検知 Vishay VBPW34S フォトダイオード & TDK PS1240P02BT ハード直結 4kHz 圧電サウンダ',
    subtitle: 'Plinth Dark-Cavity Optical Tamper Photodiode (Vishay VBPW34S) & Hard-Wired 4 kHz Piezo Sounder (TDK PS1240P02BT)',
    category: '光学ベンチ台座 / 光侵入防犯・独立異常警報',
    swatchColor: '#e65a28',
    explodeOffset: [0, -9.5, 0],
    plainAnalogy: '真っ暗な台座の内部へ誰かが天板や端蓋をこじ開けて光が差し込んだ瞬間に検知する光防犯センサーと、万が一マイコンやメインスピーカーが故障した電池異常時でも独立して4kHz警報を鳴らす圧電ブザーです。',
    summary: '内部中央バスウェイ Bay-3（X=+44.5, Y=+1.92, Z=0.0）の Vishay VBPW34S 高感度 PIN フォトダイオード（受光面積 7.5 mm², 430–1100 nm, 130° 広角）＋ TDK PS1240P02BT 独立ハードウェア駆動圧電サウンダ（共振 4.0 kHz, 最小 70 dB @ 10 cm）。',
    opticsAndPhysics: [
      '底面マイクロスイッチ（W312）では防げない天板（W174）や両端蓋（W176/W177）の不正こじ開けを、暗室筐体内部の 1 lux 以上の光侵入で即座に検知し FRAM（W249）へ改ざん時刻を記録。',
      'TDK PS1240P02BT 圧電サウンダは BMS 過温/過圧ラインと独立ハードウェア直結されており、MCU や Class-D アンプ故障時でも 4 kHz 聴覚最高感度帯で警報吹鳴。',
    ],
    formula: {
      expression: 'A_PD = 7.5 mm² (VBPW34S, ±65°),   f_alarm = 4.0 kHz (TDK PS1240P02BT ≥ 70 dB @ 10 cm)',
      description: '暗室光侵入タンパー検知＋MCU 独立 4 kHz 圧電サウンダで防犯と電池異常警報の単一障害点を排除。',
    },
    nextGenInnovation: '銀行 HSM 級暗室光侵入タンパー検知とハード独立 4 kHz フェイルセーフ圧電警報の統合。',
    specs: [
      { label: '光タンパー', value: 'Vishay VBPW34S PIN フォトダイオード (7.5 mm² / 430–1100 nm / 130°)' },
      { label: '独立警報器', value: 'TDK PS1240P02BT 圧電サウンダ (4.0 kHz / ≥70 dB / ハード直結)' },
      { label: '配置位置', value: '内部中央バスウェイ Bay-3 (X=+44.5, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Vishay Semiconductors, "VBPW34S Silicon PIN Photodiode (7.5 mm², ±65° Half-Angle) Datasheet (81128)"',
      'TDK Corporation, "PS1240P02BT Piezoelectric Sounder (4 kHz, 70 dB min) Technical Data Sheet"',
      'FIPS 140-3 Level 3 / PCI-HSM Optical Cavity Intrusion Tamper Detection Engineering Practices',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(18, 12));
      const pcb = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.14, 2.15), m.sensorPcb);
      pcb.position.set(44.5, 1.75, 0.0);
      const pd = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.24, 1.45), m.siliconPhotodiode);
      pd.position.set(42.6, 1.94, 0.0);
      const buzzer = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.34, seg), m.matteBlackAnodized);
      buzzer.position.set(45.8, 1.99, 0.0);
      g.add(pcb, pd, buzzer);
      if (ql >= 1) {
        const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.08, seg), m.brassPrecision);
        hole.position.set(45.8, 2.18, 0.0);
        g.add(hole);
      }
      return g;
    },
  }),

  // --- M. Magnetic Yoke / Wave Spring / Captive+Wedge Fasteners / Zeolite 4A / Rigging (W431 - W435) ---
  makePlinthD({
    id: 'welcome-plinth-permendur-flux-yoke',
    code: 'W431',
    order: 431,
    title: 'W431. 4文字磁気ドック直下 Permendur 49 / Hiperco® 50 (B_sat=2.34T) ハルバッハ磁束集束バックヨーク群',
    subtitle: 'Plinth 4-Dock Permendur 49 / Hiperco® 50 (B_sat = 2.34-2.4T) Halbach Flux-Focusing Back Yoke Array',
    category: '光学ベンチ台座 / 2.34T最高飽和磁束バックヨーク',
    swatchColor: '#626a75',
    explodeOffset: [0, -11.6, 9.2],
    plainAnalogy: '4つの文字を吸着する強力磁石の裏側へ逃げて無駄になっていた磁力を、商用金属で世界最高の飽和磁束（2.4テスラ）を誇る航空宇宙用コバルト鉄合金ヨークで上向きに跳ね返し、吸着力を55%高めます。',
    summary: '4 文字磁気ドック直下前面レーン（X = -68.0, -26.5, +23.0, +68.0, Y=+1.92, Z=+2.95）へ配した Permendur 49 / Hiperco® 50（Fe-49Co-2V, ASTM A801 / UNS R30005, B_sat = 2.34–2.40 T, キュリー点 940°C）ハルバッハ磁束集束バックヨーク 4 基。',
    opticsAndPhysics: [
      '一般軟鉄（B_sat ≈ 1.9 T）では薄肉 0.38 mm で磁気飽和してしまう N52 ネオジム磁束を、商用軟磁性金属最高の B_sat = 2.40 T を持つ Hiperco® 50 で無飽和閉回路化し、上向き磁気吸着力を +55% 向上。',
      '同時に台座内部への下方漏洩磁束を -18 dB 遮蔽し、18-bit AMR 磁気コンパス（W428）やオーディオインダクタへの磁気干渉を抑制。',
    ],
    formula: {
      expression: 'B_sat(Hiperco 50) = 2.40 T (ASTM A801 Fe-49Co-2V),   F_hold = B²A / (2μ₀) ↑ +55%,   B_leak ↓ -18 dB',
      description: '2.40 T 最高飽和軟磁性バックヨークにより極薄肉のままドック吸着力 +55% と内部漏洩遮蔽を実現。',
    },
    nextGenInnovation: 'ジェットエンジン・人工衛星アクチュエータ標準 Permendur 49 / Hiperco® 50 磁束集束ヨーク。',
    specs: [
      { label: '軟磁性合金', value: 'Permendur 49 / Hiperco® 50 (Fe-49Co-2V, ASTM A801, UNS R30005)' },
      { label: '磁気性能', value: '飽和磁束密度 B_sat = 2.34–2.40 T / T_c = 940°C / 吸着力 +55%' },
      { label: '配置位置', value: '内部4ドック直下前面レーン (X=-68/-26.5/+23/+68, Z=+2.95)' },
    ],
    references: [
      'ASTM A801 Standard Specification for Wrought Iron-Cobalt High Magnetic Saturation Alloys (Alloy Type 1 / UNS R30005)',
      'Carpenter Technology Corp., "Hiperco® 50 / 50A Soft Magnetic Alloy Technical Data Sheet (2.4 T Saturation)"',
      'Mallinson, J. C. (1973), "One-Sided Fluxes — Halbach Magnetic Circuit Back-Yoke Optimization", IEEE Trans. Magn.',
    ],
    diagramType: 'welcome_dock_pogo',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const yokeGeo = new THREE.BoxGeometry(6.6, 0.32, 1.15);
      const poleGeo = new THREE.BoxGeometry(1.1, 0.12, 1.05);
      for (const dx of [-68.0, -26.5, 23.0, 68.0]) {
        const yoke = new THREE.Mesh(yokeGeo, m.softIronYoke);
        yoke.position.set(dx, 1.90, 2.95);
        g.add(yoke);
        if (ql >= 1) {
          const pL = new THREE.Mesh(poleGeo, m.neodymiumMagnet);
          pL.position.set(dx - 2.3, 2.10, 2.95);
          const pR = pL.clone();
          pR.position.set(dx + 2.3, 2.10, 2.95);
          g.add(pL, pR);
        }
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-smalley-wave-spring',
    code: 'W432',
    order: 432,
    title: 'W432. 右端ロータリーダイヤル軸(W217) Smalley Crest-to-Crest® 17-7PH多層波ばね ゼロバックラッシュ予圧カラー',
    subtitle: 'Plinth Rotary Dial Shaft Smalley Crest-to-Crest® 17-7PH Multi-Turn Wave Spring Zero-Backlash Collar',
    category: '光学ベンチ台座 / ダイヤル軸ゼロバックラッシュ予圧',
    swatchColor: '#c0c9d4',
    explodeOffset: [32, -10, 2],
    plainAnalogy: '右端ダイヤルを回した時に軸方向のわずかなガタつき（カタカタ感）が残らないよう、波打つステンレス板を山と山で重ねた超省スペース波ばねで360度均等に予圧をかけ、高級カメラ並みのしっとりした操作感にします。',
    summary: '右端ロータリーダイヤル軸受（W301）直結の内部 Bay-4 空き域（X=+76.3, Y=+1.92, Z=0.0）へ実装された Smalley Crest-to-Crest® CS-S17 析出硬化 17-7PH ステンレス多層波ばね（シム端付 360° 均圧, 従来コイルばね比 軸長 50% 削減, エンドプレイ < 0.01 mm）。',
    opticsAndPhysics: [
      '平線をエッジワイズ巻線し波の山同士（Crest-to-Crest）で精密接合する構造により、コイルばねの半分の軸長スペース（2.2 mm）で 12 N の一定軸予圧を 360° 均等に印加。',
      '青銅スリーブ（W301）とルビーデテント（W259）の軸方向ガタ（エンドプレイ）を < 0.01 mm へ完全ゼロバックラッシュ化。',
    ],
    formula: {
      expression: 'L_wave = 0.50 · L_coil (Smalley Crest-to-Crest®),   F_preload = 12.0 N ⇒ Endplay < 0.01 mm',
      description: 'Smalley 17-7PH シム端付多層波ばねにより極狭 2.2 mm 空間でダイヤル軸の完全ゼロバックラッシュを達成。',
    },
    nextGenInnovation: '高級シネマレンズ・宇宙機構標準 Smalley Crest-to-Crest® 17-7PH エッジワイズ波ばね予圧。',
    specs: [
      { label: '波ばね型式', value: 'Smalley Crest-to-Crest® CS-S17 (17-7PH 析出硬化 SUS / シム端付)' },
      { label: '予圧・省寸', value: '従来コイル比 軸長 -50% / 360° 均圧 12 N / ガタ < 0.01 mm' },
      { label: '配置位置', value: '内部ダイヤル軸受直結 Bay-4 (X=+76.3, lY=+1.92, Z=0.0)' },
    ],
    references: [
      'Smalley Steel Ring Co., "Crest-to-Crest® Multi-Turn Wave Springs with Shim Ends Engineering Catalog"',
      'AMS 5528 / ASTM A693 Precipitation-Hardening 17-7PH (Condition CH900) Spring Stainless Steel Properties',
      'Slocum, A. H., "Precision Machine Design" (Axial Preloading & Zero-Backlash Rotary Spindle Bearings)',
    ],
    diagramType: 'welcome_tof_audio_hmi',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(20, 12));
      const shimGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.14, seg).rotateZ(Math.PI * 0.5);
      const waveGeo = new THREE.TorusGeometry(0.28, 0.055, 6, seg).rotateY(Math.PI * 0.5);
      const sL = new THREE.Mesh(shimGeo, m.stainlessMachined);
      sL.position.set(75.5, 1.92, 0.0);
      const sR = sL.clone();
      sR.position.set(77.1, 1.92, 0.0);
      const wMid = new THREE.Mesh(waveGeo, m.beCuSpring);
      wMid.position.set(76.3, 1.92, 0.0);
      g.add(sL, sR, wMid);
      if (ql >= 1) {
        const w1 = new THREE.Mesh(waveGeo, m.stainlessMachined);
        w1.position.set(75.9, 1.92, 0.0);
        const w2 = new THREE.Mesh(waveGeo, m.stainlessMachined);
        w2.position.set(76.7, 1.92, 0.0);
        g.add(w1, w2);
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-pem-nordlock-fasteners',
    code: 'W433',
    order: 433,
    title: 'W433. 底面電池ハッチ脱落防止 PEM® PF11M キャプティブねじ対 & Nord-Lock® DIN 25201 M3ウェッジロック座金群',
    subtitle: 'Plinth Bottom Hatch PEM® PF11M Captive Screws & Nord-Lock® DIN 25201 M3 Wedge-Locking Washers',
    category: '光学ベンチ台座 / 脱落防止・楔緩み止め締結',
    swatchColor: '#98a2b0',
    explodeOffset: [0, -50, 0],
    plainAnalogy: '底面の電池蓋を開けた時にネジが転がり落ちて基板をショートさせない「脱落防止キャプティブネジ」と、振動が加わるほど楔（くさび）効果で逆に締まりが強くなるNord-Lock座金のプロ締結セットです。',
    summary: '底面電池ハッチ（W352）左右（X=-69.9 / -38.1, Z=0.0）の PEM® PF11M ばね付ローレット脱落防止キャプティブねじ対（MAThread® クロススレッド防止）＆底面主要 M3 ボルト（W182, X=±57.15, Z=±9.2）同心配置 Nord-Lock® DIN 25201 NL3 ウェッジロック座金 4 対。',
    opticsAndPhysics: [
      'Nord-Lock® DIN 25201 2 枚組座金の内面カム角 α がねじリード角 β を上回る（α > β）幾何学的楔効果により、スピーカー振動や熱サイクルでボルトが緩もうとすると逆に軸力が増大して回転を物理ロック。',
      'PEM® PF11M キャプティブパネルねじはハッチ開放時も蓋側に保持されるため、現地電池交換時のネジ紛失・内部落下短絡リスクをゼロ化。',
    ],
    formula: {
      expression: 'α_cam > β_thread (Nord-Lock® DIN 25201 NL3)  ⇒  純機械ウェッジロック (Junker振動試験 緩み 0%)',
      description: 'DIN 25201 カム楔角 α > ねじリード角 β の機械ロック座金と PEM® キャプティブねじで現場保守と耐震締結を両立。',
    },
    nextGenInnovation: '航空・鉄道・半導体装置標準の PEM® PF11M キャプティブ＋Nord-Lock® DIN 25201 締結系。',
    specs: [
      { label: '脱落防止ねじ', value: 'PEM® PF11M ローレットばね付キャプティブねじ (MAThread® / ATCA準拠) × 2' },
      { label: '楔ロック座金', value: 'Nord-Lock® DIN 25201 NL3 (SUS316 2枚組カムウェッジ座金) × 4座' },
      { label: '配置位置', value: '底面ハッチ左右 (X=-69.9/-38.1) & W182 外周 (X=±57.15, Z=±9.2)' },
    ],
    references: [
      'DIN 25201-4:2015 Design Guide for Railway Vehicles — Bolted Joints & Wedge-Locking Washers (Nord-Lock®)',
      'PennEngineering (PEM®), "PF11M / PF11MF Captive Panel Screws with MAThread® Anti-Cross-Thread Datasheet"',
      'Nord-Lock Group, "Junker Vibration Test (DIN 65151) Performance of NL3 Wedge-Locking Washers"',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(16, 12));
      const capHead = new THREE.CylinderGeometry(0.92, 0.92, 0.34, seg);
      const collar = new THREE.CylinderGeometry(0.72, 0.84, 0.16, seg);
      for (const px of [-69.9, -38.1]) {
        const h = new THREE.Mesh(capHead, m.stainlessMachined);
        h.position.set(px, -7.50, 0.0);
        const c = new THREE.Mesh(collar, m.brassPrecision);
        c.position.set(px, -7.28, 0.0);
        g.add(h, c);
      }
      const nlGeo = new THREE.TorusGeometry(1.24, 0.16, 6, seg).rotateX(Math.PI * 0.5);
      const nlPts: ReadonlyArray<readonly [number, number]> = [
        [-57.15, -9.2],
        [-57.15, 9.2],
        [57.15, -9.2],
        [57.15, 9.2],
      ];
      for (const [nx, nz] of nlPts) {
        const w1 = new THREE.Mesh(nlGeo, m.hardenedSteelHrc60);
        w1.position.set(nx, -7.36, nz);
        g.add(w1);
        if (ql >= 1) {
          const w2 = new THREE.Mesh(nlGeo, m.stainlessMachined);
          w2.position.set(nx, -7.58, nz);
          g.add(w2);
        }
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-zeolite4a-cartridge',
    code: 'W434',
    order: 434,
    title: 'W434. 台座内部 交換・再生式 Zeolite 4A モレキュラーシーブ (0.4nm細孔, 22 wt%吸湿) 光学防湿除湿カートリッジ',
    subtitle: 'Plinth Internal Regenerable Zeolite 4A Molecular Sieve (0.4nm Pore, 22 wt%) Optical Desiccant Cartridge',
    category: '光学ベンチ台座 / 再生式ゼオライト4A光学防湿',
    swatchColor: '#fbf8f0',
    explodeOffset: [0, -11, 8],
    plainAnalogy: '湿度計カード（W315）は湿気を測るだけです。水分子（0.28nm）だけをピッタリ閉じ込める0.4nmの結晶細孔ゼオライト4Aを多孔ステンレス籠へ封入し、底面ハッチから交換・加熱再生できる本格除湿ユニットです。',
    summary: '内部前面レーン中央右（X=+41.0, Y=+1.92, Z=+2.95, 長 13.6 mm）へ収容された Zeolite Molecular Sieve 4A（細孔径 0.4 nm, 平衡吸湿容量 22 wt%, 嵩密度 770 g/L, 200–300°C 加熱再生可能）多孔 SUS316 マイクロケージ封入光学防湿カートリッジ。',
    opticsAndPhysics: [
      'シリカゲルと異なり低相対湿度域（< 20% RH）でも急峻な Type-I 吸着等温線を維持する 0.4 nm 細孔ゼオライト 4A により、密閉筐体内の水分を露点 -20°C 以下へ長期保持。',
      '化学反応を伴わない物理吸着のため、定期保守時に 250°C オーブンで 2 時間加熱すれば吸湿能力を 100% 再生して繰り返し使用可能。',
    ],
    formula: {
      expression: 'd_pore(Zeolite 4A) = 0.40 nm > d_H2O(0.28 nm),   Capacity = 22 wt% (Regen @ 200–300°C)',
      description: '0.4 nm 細孔モレキュラーシーブ 4A により低湿域まで強力除湿し、200–300°C 加熱再生で半永久運用。',
    },
    nextGenInnovation: '光学防衛機器・宇宙カメラ標準の交換・加熱再生式 Zeolite 4A SUS316 除湿カートリッジ。',
    specs: [
      { label: '吸着材', value: 'Zeolite Molecular Sieve 4A (細孔 0.4 nm / 22 wt% 吸湿 / 770 g/L)' },
      { label: '再生・筐体', value: '200–300°C 加熱再生可 / 穴あき SUS316 マイクロケージ封入' },
      { label: '配置位置', value: '内部前面貫通レーン右 (X=+41.0, lY=+1.92, Z=+2.95, 長 13.6 mm)' },
    ],
    references: [
      'Zeochem / UOP Honeywell, "Molecular Sieve Type 4A (0.4 nm Pore, 22 wt% Water Capacity) Technical Data Sheet"',
      'MIL-D-3464E / DIN 55473 Desiccants for Optical & Electronic Sealed Instrument Enclosures',
      'Breck, D. W., "Zeolite Molecular Sieves: Structure, Chemistry, and Use", Wiley (Type-I Adsorption Isotherm)',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(8, qRadialSegs(12, 8));
      const cage = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.36, 1.38), m.sintered316L);
      cage.position.set(41.0, 1.92, 2.95);
      const bed = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.24, 1.06), m.evfZeoliteBeadBed);
      bed.position.set(41.0, 2.02, 2.95);
      g.add(cage, bed);
      if (ql >= 1) {
        const capL = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.40, 1.44), m.stainlessMachined);
        capL.position.set(34.5, 1.92, 2.95);
        const capR = capL.clone();
        capR.position.set(47.5, 1.92, 2.95);
        g.add(capL, capR);
      }
      if (ql >= 2) {
        const beadGeo = new THREE.SphereGeometry(0.16, seg, Math.max(6, seg >> 1));
        for (let i = -3; i <= 3; i++) {
          const b = new THREE.Mesh(beadGeo, m.ptfeCleanWhite);
          b.position.set(41.0 + i * 1.5, 2.10, 2.95);
          g.add(b);
        }
      }
      return g;
    },
  }),
  makePlinthD({
    id: 'welcome-plinth-dguv-nato-rigging',
    code: 'W435',
    order: 435,
    title: 'W435. 公共・舞台高所設置 DGUV V17 (BGV-C1) SUS316 落下防止セーフティアンカー環 & STANAG 4694 (21.2mm) NATOレール',
    subtitle: 'Plinth Public/Stage Rigging DGUV V17 (BGV-C1) SUS316 Safety Anchor Rings & STANAG 4694 (21.2mm) NATO Rail',
    category: '光学ベンチ台座 / 公共安全落下防止・NATOレール',
    swatchColor: '#475569',
    explodeOffset: [0, -50, 0],
    plainAnalogy: '美術館の壁面や舞台トラスへ高所設置する際に法規上必須となる「独立した二次落下防止ワイヤー（DIN 56927）を掛ける鍛造ステンレス安全環」と、シネマ機材を1秒着脱できる国際規格21.2mm NATOレールです。',
    summary: '底面リギングベース両端空き域（X=-74.5 / +78.5, Z=0.0）の DGUV Vorschrift 17（旧 BGV-C1 / DGUV 215-313）準拠 SUS316 鍛造落下防止セーフティアンカー環対（DIN 56927 クイックリンク対応, 落下距離 < 20 cm）＋底面前左空きポケット（X∈[-34.0..-12.8], 幅 21.2 mm 厳密基準, Z∈[+3.2..+7.2]）の STANAG 4694 NATO クイックリリースレール。',
    opticsAndPhysics: [
      '公共展示空間・舞台の上空設置に関する欧州最高安全規則 DGUV V17（BGV-C1）に基づき、主固定具（W351/W404）から機械的に完全独立した鍛造 SUS316 二次落下防止アイ（安全率 10:1）を両翼へ配備。',
      'STANAG 4694（基準幅 21.20 +0/-0.13 mm, 45°±20′ ダブテール斜面）NATO アクセサリーレールにより、C スタンド・マジックアーム・モニター・外部センサーを無工具クイック装着可能。',
    ],
    formula: {
      expression: 'W_NATO = 21.20 (+0/-0.13) mm (STANAG 4694, 45°),   SF_safety ≥ 10:1,   h_drop < 20 cm (DGUV V17)',
      description: 'DGUV V17 独立二次落下防止アンカー環と STANAG 4694 21.2 mm NATO レールで公共高所設置法規を完全充足。',
    },
    nextGenInnovation: '欧州舞台安全規格 DGUV V17 (BGV-C1) × シネマ/防衛 STANAG 4694 NATO レールの底面統合。',
    specs: [
      { label: '落下防止規格', value: 'DGUV V17 (BGV-C1) / DGUV 215-313 鍛造 SUS316 安全環対 (DIN 56927対応)' },
      { label: 'NATOレール', value: 'STANAG 4694 準拠 (幅 21.20 +0/-0.13 mm / 45°±20′ ダブテール)' },
      { label: '配置位置', value: '底面両翼安全環 (X=-74.5/+78.5, Z=0) & NATOレール (X[-34.0..-12.8], Z[+3.2..+7.2])' },
    ],
    references: [
      'DGUV Vorschrift 17 (formerly BGV-C1) & DGUV Information 215-313, "Safety at Events and Productions — Secondary Safety Bonds"',
      'NATO Standardization Agreement STANAG 4694 (2009), "NATO Accessory Rail — 21.2 mm +0/-0.13 mm Geometry"',
      'DIN 56927 Wire Rope Safety Bonds & Quick-Connect Links for Overhead Stage & Museum Rigging',
    ],
    diagramType: 'welcome_optical_plinth',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(18, 12));
      // 1) STANAG 4694 21.2 mm NATO Accessory Rail in verified open bottom pocket X[-34.0..-12.8], Z[+3.2..+7.2]
      const railBase = new THREE.Mesh(new THREE.BoxGeometry(21.2, 0.34, 3.8), m.matteBlackAnodized);
      railBase.position.set(-23.4, -7.33, 5.2);
      const railTop = new THREE.Mesh(new THREE.BoxGeometry(20.6, 0.22, 3.1), m.welcomeCoreSlate);
      railTop.position.set(-23.4, -7.61, 5.2);
      g.add(railBase, railTop);
      if (ql >= 1) {
        const pinGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.14, seg);
        const stopL = new THREE.Mesh(pinGeo, m.fireRedAccent);
        stopL.position.set(-33.1, -7.73, 5.2);
        const stopR = stopL.clone();
        stopR.position.set(-13.7, -7.73, 5.2);
        g.add(stopL, stopR);
      }
      // 2) Twin DGUV V17 (BGV-C1) forged SUS316 secondary fall-arrest safety anchor shackles at X=-74.5 & X=+78.5, Z=0
      const baseGeo = new THREE.CylinderGeometry(1.75, 1.85, 0.24, seg);
      const shackleGeo = new THREE.TorusGeometry(1.18, 0.24, 6, seg).rotateX(Math.PI * 0.5);
      for (const sx of [-74.5, 78.5]) {
        const pad = new THREE.Mesh(baseGeo, m.sintered316L);
        pad.position.set(sx, -7.28, 0.0);
        const ring = new THREE.Mesh(shackleGeo, m.stainlessMachined);
        ring.position.set(sx, -7.54, 0.0);
        g.add(pad, ring);
      }
      return g;
    },
  }),
];

export function buildWelcomePlinthWaveDParts(mats: V2MaterialLibrary): CadPart[] {
  return buildExpansionCadParts(WELCOME_PLINTH_WAVE_D_DEFS, mats);
}
