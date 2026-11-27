import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import { scaleRadialSegmentsForQuality as qRadialSegs } from '../../core/geometry_quality';
import { CX_KO, CX_SO, CX_U, CX_YO, qualityLevel } from './welcomeGeometry';
import { WelcomeExpansionPartDef, buildExpansionCadParts } from './welcomeGlyphPrecisionParts';

// ============================================================================
// Shared Watchmaker-Grade Wave C Glyph Geometry Builders (Zero Raw Materials, 4-Tier LOD)
// ============================================================================

/**
 * ITO-to-Bezel 1 MOhm ESD discharge spring clip (IEC 61340-5-1).
 * Multi-layer assembly: ITO edge contact pad + 0402 1MOhm current-limiting resistor
 * + SUS301/BeCu micro leaf spring + gold-plated bezel grounding pad.
 */
function buildItoEsdSpringClip(
  cx: number,
  cy: number,
  cz: number,
  rotZ: number,
  mats: V2MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const h = new THREE.Group();
  h.position.set(cx, cy, cz);
  h.rotation.z = rotZ;
  const ql = qualityLevel();

  // Thin ITO transparent conductive bus contact strip seated cleanly at front sapphire rim
  const itoTab = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.72, 0.08), mats.arItoFilm);
  itoTab.position.set(0, 0, -0.02);
  // BeCu / SUS301 spring finger bridging ITO strip to grounded Ti bezel
  const springLeaf = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.34, 0.08), mats.beCuSpring);
  springLeaf.position.set(0, 0.22, 0.03);
  h.add(itoTab, springLeaf);

  if (ql >= 1) {
    // 0402 1 MOhm ESD current-limiting chip resistor (prevents hard spark discharge)
    const resBody = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.34, 0.10), mats.ceramicAlumina);
    resBody.position.set(0, -0.18, 0.03);
    const padL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.36, 0.10), mats.goldPlating);
    padL.position.set(-0.42, -0.18, 0.03);
    const padR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.36, 0.10), mats.goldPlating);
    padR.position.set(0.42, -0.18, 0.03);
    h.add(resBody, padL, padR);
  }
  if (ql >= 2) {
    // Micro dimpled contact bosses + solder fillets
    const seg = Math.max(8, qRadialSegs(12, 8));
    const dimpleGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.06, seg).rotateX(Math.PI * 0.5);
    const d1 = new THREE.Mesh(dimpleGeo, mats.goldPlating);
    d1.position.set(-0.92, 0.22, 0.05);
    const d2 = new THREE.Mesh(dimpleGeo, mats.goldPlating);
    d2.position.set(0.92, 0.22, 0.05);
    h.add(d1, d2);
  }
  g.add(h);
  return g;
}

/**
 * DIN 2093 / DIN EN 16983 Belleville disc-spring 3-series conical stack + brass thrust washer.
 * Maintains constant axial preload (16-18 N) across delta-CTE = 23.05 ppm/K between fused silica & A6061.
 */
function buildBellevilleStackAssembly(
  centers: ReadonlyArray<readonly [number, number, number]>,
  outerR: number,
  mats: V2MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const ql = qualityLevel();
  const seg = Math.max(12, qRadialSegs(20, 12));
  const innerR = outerR * 0.52;

  const thrustGeo = new THREE.CylinderGeometry(outerR, outerR, 0.09, seg).rotateX(Math.PI * 0.5);
  const coneA = new THREE.CylinderGeometry(innerR, outerR * 0.96, 0.10, seg).rotateX(Math.PI * 0.5);
  const coneB = new THREE.CylinderGeometry(outerR * 0.96, innerR, 0.10, seg).rotateX(Math.PI * 0.5);
  const boreGeo = new THREE.CylinderGeometry(innerR * 0.72, innerR * 0.72, 0.36, seg).rotateX(Math.PI * 0.5);

  for (const [cx, cy, cz] of centers) {
    const thrust = new THREE.Mesh(thrustGeo, mats.brassPrecision);
    thrust.position.set(cx, cy, cz + 0.12);
    const disc1 = new THREE.Mesh(coneA, mats.stainlessMachined);
    disc1.position.set(cx, cy, cz + 0.02);
    g.add(thrust, disc1);
    if (ql >= 1) {
      const disc2 = new THREE.Mesh(coneB, mats.mountSpringSteel);
      disc2.position.set(cx, cy, cz - 0.08);
      g.add(disc2);
    }
    if (ql >= 2) {
      const disc3 = new THREE.Mesh(coneA, mats.stainlessMachined);
      disc3.position.set(cx, cy, cz - 0.17);
      const sleeve = new THREE.Mesh(boreGeo, mats.ptfeCleanWhite);
      sleeve.position.set(cx, cy, cz - 0.02);
      g.add(disc3, sleeve);
    }
  }
  return g;
}

// ============================================================================
// Wave C Glyph Expansion Parts (15 Parts: W361 - W375)
//   glyph_yo: +3 (W361 - W363) -> 57 + 3 = 60
//   glyph_u : +4 (W364 - W367) -> 56 + 4 = 60
//   glyph_ko: +4 (W368 - W371) -> 56 + 4 = 60
//   glyph_so: +4 (W372 - W375) -> 56 + 4 = 60
// ============================================================================
export const WELCOME_GLYPH_WAVE_C_DEFS: readonly WelcomeExpansionPartDef[] = [
  // --- A. 「よ」モジュール (+3: W361 - W363) ---
  {
    id: 'welcome-yo-sapphire-ito-esd-clip',
    code: 'W361',
    order: 361,
    groupKey: 'glyph_yo',
    title: 'W361. 「よ」前面サファイア窓 導電ITO〜ベゼル 1MΩ ESD静電放電スプリングクリップ',
    subtitle: 'Glyph "よ" Front Sapphire Window Conductive ITO-to-Bezel 1 MOhm ESD Discharge Spring Clip',
    category: '「よ」モジュール / 光学窓ESD静電放電',
    swatchColor: '#7dd3fc',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-28, 8, 42],
    plainAnalogy: '「よ」の透明サファイア窓を布で拭いた時に溜まる静電気を、目に見えない透明導電膜と100万オーム安全抵抗つきバネクリップでそっと地面へ逃がし、ホコリ吸着とLED破損を防ぎます。',
    summary: '体積抵抗率 10^14 Ω·cm の完全絶縁体であるサファイア窓（W03）外周上部（X=+0.6, Y=+8.5, Z=+4.18）に配置された ITO 透明導電膜（10–45 Ω/sq, 可視透過率 ≥85%）〜チタンベゼル（W05）間 1 MΩ 電流制限 ESD 放電クリップ（IEC 61340-5-1 準拠）。',
    opticsAndPhysics: [
      'サファイア窓表面の乾拭き・来客接触で蓄積する 8–15 kV の摩擦帯電を、1 MΩ 電流制限抵抗経由で時定数 τ ≈ 10 μs で緩やかに安全放電し、高電流スパークによる LED 沿面破壊を防止。',
      'シート抵抗 10–45 Ω/sq の極薄 ITO 膜と BeCu/SUS301 マイクロ板ばねにより、透過率を損なわず静電ホコリ付着を 95% 以上低減。',
    ],
    formula: {
      expression: 'I_peak = V_ESD / R_bleed = 15 kV / 1 MΩ = 15 mA,   τ_bleed = R_bleed · C_win ≈ 10 μs (IEC 61340-5-1)',
      description: '1 MΩ ブリード抵抗でピーク放電電流を 15 mA へ抑制しつつ 10 μs で帯電を完全除電。',
    },
    nextGenInnovation: '航空機コックピット計器ガラス標準の ITO 1 MΩ 電流制限 ESD 接地クリップを光学文字へ実装。',
    specs: [
      { label: '準拠規格', value: 'IEC 61340-5-1 ESD Control / MIL-STD-883 HBM' },
      { label: '導電膜・抵抗', value: 'ITO 10–45 Ω/sq (T ≥ 85%) + 0402 1.0 MΩ 電流制限抵抗' },
      { label: '配置位置', value: 'YO_STEM 前面サファイア縁 (X=+0.6, Y=+8.5, Z=+4.18)' },
    ],
    references: [
      'IEC 61340-5-1:2016 Electrostatics — Protection of Electronic Devices from Electrostatic Phenomena',
      'Edmund Optics, "ITO Coated Sapphire & Optical Windows — Sheet Resistance & Transmittance Application Note"',
      'ANSI/ESD S20.20 Standard for the Development of an Electrostatic Discharge Control Program',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => buildItoEsdSpringClip(0.6, 8.5, 4.18, 0, m),
  },
  {
    id: 'welcome-yo-t-junction-ti-gusset',
    code: 'W362',
    order: 362,
    groupKey: 'glyph_yo',
    title: 'W362. 「よ」横枝〜主幹T字接合部 CNC Ti-6Al-4V 剪断ダウエル＆剛性補強ガセット橋',
    subtitle: 'Glyph "よ" Stem-to-Bar T-Junction CNC Ti-6Al-4V Shear Dowel & Stiffening Gusset Bridge',
    category: '「よ」モジュール / T字構造剛性補強',
    swatchColor: '#aab4c0',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-24, 12, -34],
    plainAnalogy: '「よ」の縦棒から右へ突き出た横枝の付け根を、航空機用チタンの補強プレートと2本の精密ピンでガッチリつなぎ、スピーカーの音圧でもビビリ振動させない橋渡し部品です。',
    summary: '主幹（W01）から片持ち突出する横枝（W27）の背面T字交差部（X=+4.3, Y=+11.2, Z=-5.84）を橋渡しする Ti-6Al-4V Grade 5（E=114 GPa, σ_y=880 MPa）CNC 軽量ポケットガセット＆ JIS B 1359 焼入精密剪断ノックピン2点結合。',
    opticsAndPhysics: [
      '横枝付け根の曲げモーメント集中部へ高比剛性 Ti-6Al-4V ガセット橋と2点剪断ダウエルを挿入し、片持ち一次ねじり固有振動数を 310 Hz → 540 Hz へ引き上げて音響共振域外へ退避。',
      '軽量リブポケット切削により重量増を 0.42 g へ抑えつつ横枝先端たわみを 48% 低減。',
    ],
    formula: {
      expression: 'f_1 ∝ √(E·I / m·L³),   Δf_1 = +74% (310 Hz → 540 Hz),   σ_y(Ti-6Al-4V) = 880 MPa',
      description: 'Ti-6Al-4V ガセットと2点剪断ピンにより片持ち横枝の曲げ剛性を約3倍へ強化。',
    },
    nextGenInnovation: '航空宇宙 Ti-6Al-4V トラスガセット＆ JIS B 1359 精密剪断ダウエルによる無共振T字結合。',
    specs: [
      { label: '材質', value: 'Ti-6Al-4V Grade 5 (ASTM B348, E = 114 GPa, σ_y = 880 MPa)' },
      { label: '剪断結合', value: 'JIS B 1359 h6 焼入平行ノックピン Ø1.5 mm × 2点' },
      { label: '配置位置', value: '「よ」背面T字交差橋 (X=+4.3, Y=+11.2, Z=-5.84)' },
    ],
    references: [
      'ASTM B348 / AMS 4928 Titanium Alloy Ti-6Al-4V (Grade 5) Bars and Forgings Mechanical Properties',
      'JIS B 1359:2015 / ISO 8734 Parallel Pins of Hardened Steel (Dowel Pin Shear Joint Design)',
      'Roark, R. J. & Young, W. C., "Roark\'s Formulas for Stress and Strain", 8th Ed. (Cantilever Gusset Stiffening)',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(8, qRadialSegs(14, 8));
      const plate = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.7, 0.24), m.welcomeTitaniumFace);
      plate.position.set(4.3, 11.2, -5.82);
      g.add(plate);
      if (ql >= 1) {
        const ribT = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.34, 0.14), m.titaniumRivet);
        ribT.position.set(4.3, 12.25, -5.96);
        const ribB = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.34, 0.14), m.titaniumRivet);
        ribB.position.set(4.3, 10.15, -5.96);
        const diag = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.28, 0.14), m.titaniumRivet);
        diag.position.set(4.3, 11.2, -5.96);
        diag.rotation.z = 0.56;
        g.add(ribT, ribB, diag);
      }
      if (ql >= 2) {
        const pinGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.38, seg).rotateX(Math.PI * 0.5);
        const p1 = new THREE.Mesh(pinGeo, m.hardenedSteelHrc60);
        p1.position.set(3.2, 11.2, -5.86);
        const p2 = new THREE.Mesh(pinGeo, m.hardenedSteelHrc60);
        p2.position.set(5.4, 11.2, -5.86);
        g.add(p1, p2);
      }
      return g;
    },
  },
  {
    id: 'welcome-yo-1wire-cal-eeprom-shunt',
    code: 'W363',
    order: 363,
    groupKey: 'glyph_yo',
    title: 'W363. 「よ」着脱自動識別 1-Wire 64bit校正EEPROM (DS28E07) & 10mΩ LED電流検知シャント (WSLP0603)',
    subtitle: 'Glyph "よ" Auto-ID 1-Wire 64-bit Calibration EEPROM (DS28E07) & 10 mOhm LED Shunt (WSLP0603)',
    category: '「よ」モジュール / 個体識別・色度校正',
    swatchColor: '#1b5e47',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-28, 3, -34],
    plainAnalogy: '「よ」を台座へカチッと挿した瞬間に「私は『よ』で、この明るさと色味で光る個体です」と自動申告し、LEDの電流異常も見張る小さな身分証メモリ＆電流計基板です。',
    summary: '「よ」主幹背面下部（X=+0.8, Y=-2.2, Z=-5.84）に実装された Analog Devices DS28E07（1024-bit 1-Wire EEPROM, 工場固有64-bit ROM ID, ±8 kV HBM ESD）と Vishay WSLP0603 10 mΩ ±0.5% 金属帯シャント抵抗（0.4 W, <3 μV/°C, AEC-Q200）校正キャリア。',
    opticsAndPhysics: [
      'DS28E07 の4ページ×256-bit EEPROM へ工場実測 CIE 1931 色度座標（x, y, Y）・累積通電時間・LED 劣化補正テーブルを保持し、4文字のどれを交換しても即座に Δu\'v\' < 0.001 均一発色を実現。',
      'Vishay WSLP0603 Power Metal Strip® 10 mΩ シャントの極低熱起電力（<3 μV/°C）と 100 Hz 電流監視により、LED ストリングのオープン／ショート故障を 2 ms 以内で検知。',
    ],
    formula: {
      expression: 'V_shunt = I_LED · R_shunt = 0.45 A × 10 mΩ = 4.50 mV  (ΔV_EMF < 3 μV/°C, 64-bit Unique ROM ID)',
      description: '10 mΩ 精密シャントと 1-Wire 固有 64-bit 校正 EEPROM でプラグ＆プレイ色度均一化と故障診断を統合。',
    },
    nextGenInnovation: 'プロ用シネマレンズ電子接点と同等の 1-Wire 個体校正メモリ＆金属帯電流シャント実装。',
    specs: [
      { label: '校正メモリIC', value: 'Analog Devices DS28E07 (1024-bit 1-Wire EEPROM / 64-bit ROM ID)' },
      { label: '電流シャント', value: 'Vishay WSLP0603 10 mΩ ±0.5% (0.4 W / <3 μV/°C / AEC-Q200)' },
      { label: '配置位置', value: '「よ」主幹背面下部キャリア (X=+0.8, Y=-2.2, Z=-5.84)' },
    ],
    references: [
      'Analog Devices / Maxim Integrated, "DS28E07 1024-Bit 1-Wire® EEPROM Datasheet (19-5928)"',
      'Vishay Dale, "WSLP0603 Power Metal Strip® Low-Value Surface-Mount Resistors Datasheet (30122)"',
      'IEC 62717 LED Modules for General Lighting — Chromaticity Binning & Drift Compensation',
    ],
    diagramType: 'welcome_driver_canfd',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const carrier = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.8, 0.18), m.sensorPcb);
      carrier.position.set(0.8, -2.2, -5.76);
      const ic = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.05, 0.18), m.icEpoxy);
      ic.position.set(0.0, -2.2, -5.92);
      const shunt = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.58, 0.16), m.copperHeatSpreader);
      shunt.position.set(1.55, -2.2, -5.91);
      g.add(carrier, ic, shunt);
      if (ql >= 1) {
        const padGeo = new THREE.BoxGeometry(0.24, 0.62, 0.16);
        const sL = new THREE.Mesh(padGeo, m.solderBallSilver);
        sL.position.set(1.02, -2.2, -5.91);
        const sR = new THREE.Mesh(padGeo, m.solderBallSilver);
        sR.position.set(2.08, -2.2, -5.91);
        g.add(sL, sR);
      }
      if (ql >= 2) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.10), m.goldPlating);
        pad.position.set(-0.62, -1.22, -5.88);
        const pad2 = pad.clone();
        pad2.position.set(0.0, -1.22, -5.88);
        const pad3 = pad.clone();
        pad3.position.set(0.62, -1.22, -5.88);
        g.add(pad, pad2, pad3);
      }
      return g;
    },
  },

  // --- B. 「う」モジュール (+4: W364 - W367) ---
  {
    id: 'welcome-u-sapphire-ito-esd-clip',
    code: 'W364',
    order: 364,
    groupKey: 'glyph_u',
    title: 'W364. 「う」前面サファイア窓 導電ITO〜ベゼル 1MΩ ESD静電放電スプリングクリップ',
    subtitle: 'Glyph "う" Front Sapphire Window Conductive ITO-to-Bezel 1 MOhm ESD Discharge Spring Clip',
    category: '「う」モジュール / 光学窓ESD静電放電',
    swatchColor: '#7dd3fc',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-9, 8, 42],
    plainAnalogy: '大きくカーブした「う」のサファイア前面窓に溜まる静電気を、透明導電ITO膜と1MΩ安全抵抗スプリング経由で確実に逃がし、ホコリ付着や静電故障を防ぐクリップです。',
    summary: '「う」主弧サファイア窓（W46）左上縁（X=-9.6, Y=+9.4, Z=+4.20）に配した ITO 透明導電膜（10–45 Ω/sq）＋ SUS301/BeCu マイクロ接触片＋ 1 MΩ ESD 電流制限放電クリップ（IEC 61340-5-1 準拠）。',
    opticsAndPhysics: [
      '湾曲主弧の全面に成膜した ITO 透明導電膜（R_s = 10–45 Ω/sq）を単一点 1 MΩ ブリード抵抗でチタンベゼル（W48）へ接地し、表面電位を常に < 100 V に維持。',
      '可視透過率 ≥ 85% を確保しつつ摩擦帯電による塵埃吸着・LED ドライバ沿面放電リスクを構造的に排除。',
    ],
    formula: {
      expression: 'V_surf(t) = V_0 · exp(-t / (R_bleed · C_win)) < 100 V @ t = 50 μs  (R_bleed = 1.0 MΩ)',
      description: '1 MΩ ブリード接地により高電圧摩擦帯電を 50 μs 以内で安全電位へ指数減衰。',
    },
    nextGenInnovation: '曲面サファイア光学窓へ適合させた超低背 ITO-to-Ti ベゼル ESD 放電クリップ。',
    specs: [
      { label: '準拠規格', value: 'IEC 61340-5-1 / ANSI/ESD S20.20' },
      { label: '導電膜・ばね', value: 'ITO 10–45 Ω/sq + SUS301/BeCu 接触片 + 1 MΩ 0402 抵抗' },
      { label: '配置位置', value: 'U_ARC 左上前面縁 (X=-9.6, Y=+9.4, Z=+4.20)' },
    ],
    references: [
      'IEC 61340-5-1:2016 Protection of Electronic Devices from Electrostatic Phenomena',
      'Corning / Edmund Optics, "Conductive ITO Anti-Static Optical Window Grounding Guide"',
      'MIL-STD-883 Method 3015 Electrostatic Discharge Sensitivity Classification',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => buildItoEsdSpringClip(-9.6, 9.4, 4.20, 0.42, m),
  },
  {
    id: 'welcome-u-quartz-belleville-stack',
    code: 'W365',
    order: 365,
    groupKey: 'glyph_u',
    title: 'W365. 「う」石英支柱(W79) 軸方向定予圧 DIN 2093 皿ばね(ベルビル)ワッシャー積層対',
    subtitle: 'Glyph "う" Quartz Pillar (W79) Axial Constant-Preload DIN 2093 Belleville Disc-Spring Stack Pair',
    category: '「う」モジュール / ΔCTE熱膨張吸収・定予圧',
    swatchColor: '#98a2b0',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-6, 18, -34],
    plainAnalogy: 'ガラスの柱とアルミの枠は温度で伸び方が40倍も違います。3枚重ねた円錐状の「皿バネ」を柱の上下へ仕込むことで、夏も冬もガラスを割らずにピタッと一定の力で支え続けます。',
    summary: '溶融石英支柱（W79, CTE = 0.55 ppm/K）と A6061 アルミ骨格（W44/W70, CTE = 23.6 ppm/K）間の ΔCTE = 23.05 ppm/K 熱膨張差を吸収するため、支柱上下背面座（X=+0.5, Y=+14.8 / +17.9, Z=-5.82）へ配した DIN 2093 / DIN EN 16983 SUS301-CSP 皿ばね3枚直列積層対。',
    opticsAndPhysics: [
      'Almen–László の皿ばね特性式において高さ板厚比 h₀/t ≈ 1.41 の準定荷重（ゼロ剛性プラトー）域で動作させることで、−10〜+65°C の温度サイクルでも軸予圧 18 N ±8% を一定保持。',
      '石英ガラス端面への過大圧縮（圧壊）と低温収縮時のガタ発生を同時に防ぎ、同軸給電導通と光学軸精度を維持。',
    ],
    formula: {
      expression: 'F(s) = [4E / (1-ν²)] · (t⁴ / (K₁·D_e²)) · (s/t) · [(h₀/t - s/t)(h₀/t - s/2t) + 1] ≈ 18 N ± 8%',
      description: 'Almen–László 式 h₀/t ≈ 1.4 設計により ΔCTE = 23.05 ppm/K の変位全域で準定荷重予圧を達成。',
    },
    nextGenInnovation: '精密望遠鏡鏡筒のガラス―金属 ΔCTE 補償で実証された DIN 2093 準定荷重皿ばね積層。',
    specs: [
      { label: 'ばね規格', value: 'DIN 2093 / DIN EN 16983 SUS301-CSP 3枚直列積層 × 2座' },
      { label: '軸予圧・ΔCTE', value: '18 N ± 8% (h₀/t ≈ 1.41) / ΔCTE 23.05 ppm/K 補償' },
      { label: '配置位置', value: '石英支柱 W79 上下背面座 (X=+0.5, Y=+14.8/+17.9, Z=-5.82)' },
    ],
    references: [
      'DIN EN 16983 (formerly DIN 2093), "Disc Springs — Quality Specifications, Dimensions & Calculation"',
      'Almen, J. O. & László, A. (1936), "The Uniform-Section Disk Spring", Trans. ASME 58, 305–314',
      'Yoder, P. R., "Opto-Mechanical Systems Design", 4th Ed. (Athermal Axial Preload of Glass Optics)',
    ],
    diagramType: 'welcome_quartz_bridge',
    build: (m) =>
      buildBellevilleStackAssembly(
        [
          [0.5, 14.8, -5.82],
          [0.5, 17.9, -5.82],
        ],
        1.08,
        m
      ),
  },
  {
    id: 'welcome-u-crest-sma905-cal-port',
    code: 'W366',
    order: 366,
    groupKey: 'glyph_u',
    title: 'W366. 「う」浮遊上部点 背面 SMA905 光ファイバ分光校正タップ＆ローレット真鍮盲蓋',
    subtitle: 'Glyph "う" Floating Crest Rear SMA905 Fiber-Optic Spectrometer Calibration Tap & Brass Cap',
    category: '「う」モジュール / 非破壊分光校正ポート',
    swatchColor: '#d4a137',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-8.5, 25, -34],
    plainAnalogy: '防水シールを剥がさずに「う」の上部点の色味（CRI 97）が経年変化していないか現地チェックできるよう、光ファイバ測定器を直結できる真鍮キャップ付の光取り出し口です。',
    summary: '「う」浮遊上部点（U_CREST）背面右端（X=+7.4, Y=+20.2, Z=-5.84）へ設けた Thorlabs SMA905 マルチモード光ファイバ規格（NA=0.22, 400–2200 nm）準拠マイクロ分光校正光タップ＆ EPDM Oリング封止 C3604 ローレット真鍮盲蓋。',
    opticsAndPhysics: [
      '通常運用時は EPDM Oリング付 C3604 ローレット盲蓋で IP65 気密と完全遮光を維持し、定期点検時のみ SMA905（1/4"-36 UNS）パッチファイバを接続して分光放射計で CRI Ra / R9 / Duv を現地計測。',
      '開口数 NA = 0.22（受光半角 12.7°）により導光板内部スペクトルを再現性 ±0.1 nm で安定サンプリング。',
    ],
    formula: {
      expression: 'NA = n₀ · sin(θ_max) = 0.22  (θ_max = 12.7°),   λ = 400–2200 nm,   Duv < 0.001 現地検証',
      description: 'IP65 封止を破壊せず SMA905 ファイバ直結で CRI 97・Duv 経年分光校正を実施可能。',
    },
    nextGenInnovation: '光学実験室標準 Thorlabs SMA905 分光校正タップの文字モジュール背面統合。',
    specs: [
      { label: 'コネクタ規格', value: 'Thorlabs SMA905 (1/4"-36 UNS, NA = 0.22, 400–2200 nm)' },
      { label: '盲蓋・封止', value: 'C3604 ローレット真鍮盲蓋 + EPDM Oリング (IP65)' },
      { label: '配置位置', value: 'U_CREST 背面右端 (X=+7.4, Y=+20.2, Z=-5.84)' },
    ],
    references: [
      'Thorlabs Inc., "SMA905 Multimode Fiber Optic Patch Cables & Bulkhead Adapters Specification (NA=0.22)"',
      'TIA/EIA-604-1 (FOCIS 1) Fiber Optic Connector Intermateability Standard — Type SMA 905',
      'CIE 13.3 / TM-30-20 Method for Evaluating Light Source Color Rendition (In-Situ Spectral Verification)',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(12, qRadialSegs(18, 12));
      const flange = new THREE.Mesh(
        new THREE.CylinderGeometry(1.02, 1.06, 0.24, seg).rotateX(Math.PI * 0.5),
        m.stainlessMachined
      );
      flange.position.set(7.4, 20.2, -5.66);
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.76, 0.80, 0.34, seg).rotateX(Math.PI * 0.5),
        m.brassPrecision
      );
      cap.position.set(7.4, 20.2, -5.94);
      g.add(flange, cap);
      if (ql >= 1) {
        const ferrule = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.32, 0.14, seg).rotateX(Math.PI * 0.5),
          m.welcomeOpticalEd
        );
        ferrule.position.set(7.4, 20.2, -6.12);
        const oRing = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.07, 6, seg), m.epdmGasket);
        oRing.position.set(7.4, 20.2, -5.78);
        g.add(ferrule, oRing);
      }
      return g;
    },
  },
  {
    id: 'welcome-u-arc-piezo-shunt-damper',
    code: 'W367',
    order: 367,
    groupKey: 'glyph_u',
    title: 'W367. 「う」主弧片持ち基部 PZT-5H 圧電パッシブRLシャント構造制振パッチ',
    subtitle: 'Glyph "う" Main Arc Cantilever Root PZT-5H Piezoelectric Passive RL-Shunt Structural Damper Patch',
    category: '「う」モジュール / 圧電RLシャント制振',
    swatchColor: '#e6decb',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-9, 4, -34],
    plainAnalogy: '「う」の大きなカーブがスピーカーの音でブルブル共振するエネルギーを、セラミック圧電板で電気に変えてコイルと抵抗の回路で熱として消し去る「電気式の制振ダンパー」です。',
    summary: '片持ち湾曲構造「う」主弧の背面高歪み域（X=+4.2, Y=-9.6, Z=-5.82）へ接着された PZT-5H 圧電セラミック薄板＆同調インダクタ／抵抗パッシブ RL シャント回路（Hagood & von Flotow 1991 理論準拠）。',
    opticsAndPhysics: [
      '台座スピーカー（W214）音圧で励起される 180–420 Hz 曲げ歪みエネルギーを PZT-5H の高い電気機械結合係数（k₃₁ ≈ 0.39）で電荷へ変換し、同調 L-C_p-R 共振回路でジュール熱として無電源散逸。',
      '質量ダンパー（TMD）と異なり超薄型（0.36 mm）・超軽量（0.18 g）のまま構造減衰比 ζ を +6.2 dB 向上。',
    ],
    formula: {
      expression: 'ω_e = 1 / √(L_opt · C_p) = ω_n · √(1 + K₃₁²),   R_opt = √2 · K₃₁ / (C_p · ω_n · (1 + K₃₁²))',
      description: 'Hagood & von Flotow 最適同調 RL シャント条件により 180–420 Hz 曲げ共振ピークを -6.2 dB 減衰。',
    },
    nextGenInnovation: '衛星アンテナ・精密望遠鏡支柱で採用される PZT-5H 無電源 RL 同調シャント制振。',
    specs: [
      { label: '圧電素子', value: 'PZT-5H (d₃₁ = -274 pC/N, k₃₁ = 0.39) + Ag焼付電極' },
      { label: '同調回路', value: 'パッシブ直列 RL シャント (f_tune = 290 Hz, -6.2 dB 減衰)' },
      { label: '配置位置', value: 'U_ARC 背面下部高歪み域 (X=+4.2, Y=-9.6, Z=-5.82)' },
    ],
    references: [
      'Hagood, N. W. & von Flotow, A. (1991), "Damping of Structural Vibrations with Piezoelectric Materials and Passive Electrical Networks", J. Sound Vib. 146(2), 243–268',
      'Moheimani, S. O. R. & Fleming, A. J. (2006), "Piezoelectric Transducers for Vibration Control and Damping", Springer',
      'Morgan Advanced Materials, "PZT-5H (Navy Type VI) Piezoelectric Ceramics Technical Data"',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const h = new THREE.Group();
      h.position.set(4.2, -9.6, -5.82);
      h.rotation.z = 0.62;
      const piezo = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.0, 0.22), m.pztCeramic);
      const elec = new THREE.Mesh(new THREE.BoxGeometry(3.9, 1.6, 0.08), m.silverElectrode);
      elec.position.z = -0.14;
      h.add(piezo, elec);
      if (ql >= 1) {
        const ind = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.72, 0.20), m.ferriteInductor);
        ind.position.set(-1.1, 0, -0.10);
        const res = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.42, 0.16), m.icEpoxy);
        res.position.set(0.9, 0, -0.10);
        h.add(ind, res);
      }
      if (ql >= 2) {
        const trace = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.16, 0.06), m.goldPlating);
        trace.position.set(-0.08, 0, -0.16);
        h.add(trace);
      }
      g.add(h);
      return g;
    },
  },

  // --- C. 「こ」モジュール (+4: W368 - W371) ---
  {
    id: 'welcome-ko-sapphire-ito-esd-clip',
    code: 'W368',
    order: 368,
    groupKey: 'glyph_ko',
    title: 'W368. 「こ」前面サファイア窓 導電ITO〜ベゼル 1MΩ ESD静電放電スプリングクリップ',
    subtitle: 'Glyph "こ" Front Sapphire Window Conductive ITO-to-Bezel 1 MOhm ESD Discharge Spring Clip',
    category: '「こ」モジュール / 光学窓ESD静電放電',
    swatchColor: '#7dd3fc',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [10, 4, 42],
    plainAnalogy: '「こ」の横長サファイア前面窓に溜まる静電気を、透明導電ITO膜と1MΩ抵抗スプリングで安全に逃がし、ホコリの張り付きとLED回路への静電破壊を防ぎます。',
    summary: '「こ」下画サファイア窓（W89）右側縁（X=+5.8, Y=-12.0, Z=+4.18）へ装着された ITO 導電膜（10–45 Ω/sq）〜チタンベゼル間 1 MΩ ESD 静電放電スプリングクリップ（IEC 61340-5-1 準拠）。',
    opticsAndPhysics: [
      '水平に広い下画サファイア表面へ蓄積した静電気を 1 MΩ 電流制限経路で緩やかに除電し、静電ホコリ付着を防止。',
      '光学有効発光域を避けた外周配置により、輝度均一性 ≥92% と色度を完全に保持。',
    ],
    formula: {
      expression: 'R_bleed = 1.0 MΩ ± 5%,   V_clamp < 100 V (IEC 61340-5-1),   T_vis(ITO) ≥ 85%',
      description: '高透過 ITO 導電膜と 1 MΩ 放電クリップで下画サファイア窓の帯電・沿面放電を根絶。',
    },
    nextGenInnovation: 'IEC 61340-5-1 準拠の水平光学窓向け超低背 ITO ESD ブリードクリップ。',
    specs: [
      { label: '準拠規格', value: 'IEC 61340-5-1 / ANSI/ESD S20.20' },
      { label: '構成', value: 'ITO 10–45 Ω/sq + BeCu 板ばね + 0402 1 MΩ 抵抗' },
      { label: '配置位置', value: 'KO_BOT 右側前面縁 (X=+5.8, Y=-12.0, Z=+4.18)' },
    ],
    references: [
      'IEC 61340-5-1:2016 Electrostatics — Protection of Electronic Devices from Electrostatic Phenomena',
      'Edmund Optics, "Conductive ITO Coatings for Anti-Static Optical Windows"',
      'IPC-A-610 ESD Control & Grounding Requirements for Optical Assemblies',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => buildItoEsdSpringClip(5.8, -12.0, 4.18, 0.08, m),
  },
  {
    id: 'welcome-ko-quartz-belleville-stacks',
    code: 'W369',
    order: 369,
    groupKey: 'glyph_ko',
    title: 'W369. 「こ」左右2本石英コラム(W124/W125) 軸定予圧 DIN 2093 皿ばねワッシャー積層対',
    subtitle: 'Glyph "こ" Dual Quartz Columns (W124/W125) Axial Preload DIN 2093 Belleville Spring Stacks',
    category: '「こ」モジュール / ΔCTE熱膨張吸収・定予圧',
    swatchColor: '#98a2b0',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [11, 10, -34],
    plainAnalogy: '「こ」の浮いた上画を支える左右2本の石英ガラス柱の上下4か所へ、それぞれ皿バネの積層クッションを仕込み、温度が変わっても均等な力でガラスと電源ピンを守ります。',
    summary: '左右2本の平行溶融石英コラム（W124/W125, X=±7.6）の上下4端面背面座（Z=-5.82）へ配した DIN 2093 / DIN EN 16983 SUS301-CSP 皿ばね積層ユニット4基。ΔCTE = 23.05 ppm/K による熱膨張差を吸収し、内蔵給電/PWM 芯線（W127/W128）の接触圧を 16 N 均等維持します。',
    opticsAndPhysics: [
      '左右2柱の軸予圧を Almen–László 準定荷重域（16 N ±8%）で完全均等化することで、上画（W113）の熱傾斜（チルト誤差）を < 0.005° へ抑制。',
      '低温収縮時の接点浮きと高温膨張時の石英端面圧壊を同時に防止。',
    ],
    formula: {
      expression: 'F_left = F_right = 16.0 N ± 8% (DIN 2093, h₀/t ≈ 1.41)  ⇒  Δθ_tilt < 0.005°',
      description: '左右2本石英柱4端の均等皿ばね予圧により温度変化下でも上画の平行度と同軸導通を維持。',
    },
    nextGenInnovation: '二柱平行光学ブリッジ向け4点同期 DIN 2093 準定荷重アサーマル予圧機構。',
    specs: [
      { label: 'ばね規格', value: 'DIN 2093 / DIN EN 16983 SUS301-CSP 皿ばね積層 × 4座' },
      { label: '均等予圧', value: '16.0 N ± 8% / ΔCTE 23.05 ppm/K 吸収' },
      { label: '配置位置', value: '左右石英柱 W124/W125 上下4背面座 (Z=-5.82)' },
    ],
    references: [
      'DIN EN 16983 (DIN 2093) Disc Springs — Calculation and Quality Specifications',
      'Almen, J. O. & László, A. (1936), "The Uniform-Section Disk Spring", Trans. ASME 58',
      'Corning HPFS® 7980 Fused Silica Thermal Expansion & Optomechanical Mounting Guidelines',
    ],
    diagramType: 'welcome_quartz_bridge',
    build: (m) =>
      buildBellevilleStackAssembly(
        [
          [-7.6, -9.6, -5.82],
          [-7.6, 12.5, -5.82],
          [8.2, -9.6, -5.82],
          [7.6, 13.0, -5.82],
        ],
        0.92,
        m
      ),
  },
  {
    id: 'welcome-ko-lower-micro-heatpipe',
    code: 'W370',
    order: 370,
    groupKey: 'glyph_ko',
    title: 'W370. 「こ」下画背面 0.6mm 扁平焼結銅マイクロヒートパイプ＆ウィック均熱サドル',
    subtitle: 'Glyph "こ" Lower Stroke Rear 0.6mm Ultra-Thin Sintered Copper Micro-Heatpipe & Saddle',
    category: '「こ」モジュール / 超薄相変化均熱輸送',
    swatchColor: '#d07447',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [10, 4, -34],
    plainAnalogy: '横長の「こ」下画の中央にこもりがちなLEDと駆動ICの熱を、厚さわずか0.6mmの超極薄ヒートパイプが蒸発と凝縮の相変化で端まで瞬時に運んで均一に冷やします。',
    summary: '「こ」下画背面左腕（X∈[-13.2..-9.6], Y∈[-10.2..-4.6], Z=-5.82）へロウ付け密着させた厚さ 0.6 mm 複合メッシュ／焼結銅ウィック扁平マイクロヒートパイプ（k_eff ≈ 3500–3800 W/m·K, 最大熱輸送 20–26 W）＆均熱銅サドル。',
    opticsAndPhysics: [
      '減圧封入純水の潜熱蒸発・毛細管還流サイクルにより、アルミ単体（167 W/m·K）の 20 倍超となる実効熱伝導率 3,800 W/m·K を厚さ 0.6 mm で達成。',
      'PWM ドライバ近傍ホットスポットとストローク端部の温度勾配を 8.4°C → 1.9°C へ平準化し、LED 色度偏差 Δu\'v\' を 0.0008 未満に抑制。',
    ],
    formula: {
      expression: 'k_eff ≈ 3,800 W/(m·K),   Q_max = 22 W (t = 0.6 mm),   ΔT_stroke: 8.4°C → 1.9°C',
      description: '0.6 mm 極薄焼結銅ウィック・マイクロヒートパイプで下画の温度ムラと色度偏差を根絶。',
    },
    nextGenInnovation: '薄型モバイル・宇宙機器向け 0.6 mm 複合ウィック扁平マイクロヒートパイプ均熱帯。',
    specs: [
      { label: '構造・厚み', value: 'C1020 焼結銅+マイクロメッシュ複合ウィック (厚 0.6 mm)' },
      { label: '実効熱伝導', value: 'k_eff ≈ 3,500–3,800 W/m·K / Q_max = 20–26 W' },
      { label: '配置位置', value: 'KO_BOT 左湾曲背面均熱帯 (X=-11.4, Y=-7.4, Z=-5.82)' },
    ],
    references: [
      'Tang, H. et al., "Review of Applications and Developments of Ultra-Thin Micro Heat Pipes for Electronic Cooling", Applied Energy / PMC11123008',
      'Faghri, A., "Heat Pipe Science and Technology", 2nd Ed., Global Digital Press (Capillary Limit of Sintered Wicks)',
      'JEDEC JESD51-14 Thermal Uniformity & LED Chromaticity Shift Mitigation Guidelines',
    ],
    diagramType: 'welcome_led_thermal',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const h = new THREE.Group();
      h.position.set(-11.4, -7.4, -5.82);
      h.rotation.z = -0.34;
      const pipe = new THREE.Mesh(new THREE.BoxGeometry(1.45, 5.2, 0.28), m.vaporChamberCopper);
      const saddle = new THREE.Mesh(new THREE.BoxGeometry(2.15, 1.35, 0.22), m.copperHeatSpreader);
      saddle.position.set(0, -1.5, 0.04);
      h.add(pipe, saddle);
      if (ql >= 1) {
        const capT = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.42, 0.30), m.brassPrecision);
        capT.position.set(0, 2.55, 0);
        const capB = capT.clone();
        capB.position.set(0, -2.55, 0);
        h.add(capT, capB);
      }
      if (ql >= 2) {
        const wick = new THREE.Mesh(new THREE.BoxGeometry(0.45, 4.4, 0.08), m.vcCopperMeshWick);
        wick.position.set(0, 0, -0.15);
        h.add(wick);
      }
      g.add(h);
      return g;
    },
  },
  {
    id: 'welcome-ko-invar-antitwist-tiebar',
    code: 'W371',
    order: 371,
    groupKey: 'glyph_ko',
    title: 'W371. 「こ」上画〜石英柱間 平行四辺形せん断防止 Invar-36 低膨張マイクロタイバー橋',
    subtitle: 'Glyph "こ" Upper Bar Anti-Racking Invar-36 Low-CTE Precision Cross-Tension Tie-Bar',
    category: '「こ」モジュール / 平行せん断防止・低膨張剛性',
    swatchColor: '#e2eaf4',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [11, 10, -34],
    plainAnalogy: '2本のガラス柱で浮いた上画が横からの力で平行四辺形にグニャっと傾くのを防ぐため、温度で伸び縮みしない特殊合金インバー36で左右の柱頭をしっかり連結する筋交いバーです。',
    summary: '左右石英コラム（W124/W125）頂部間の上画背面下縁スパン（X∈[-5.8..+5.8], Y=+12.55, Z=-5.82）を直結する Invar-36（UNS K93600, Fe-36%Ni, CTE = 1.2 ppm/K）極低膨張マイクロタイバー橋。着脱時横力による平行四辺形ラッキングと熱バイメタル反りを同時抑制します。',
    opticsAndPhysics: [
      'Invar-36 の極低線膨張係数（1.2 ppm/K）は溶融石英（0.55 ppm/K）と近接するため、上画を剛連結しても温度変化で石英柱へ曲げ応力を発生させない。',
      '左右柱頭を剪断トラス化することで横方向着脱衝撃に対する水平変位剛性を 3.4 倍へ向上。',
    ],
    formula: {
      expression: 'α_Invar36 = 1.2 ppm/K ≈ α_SiO2 = 0.55 ppm/K  ⇒  ΔL_rel(ΔT=40K) = 0.30 μm,  K_shear × 3.4',
      description: 'Invar-36 により熱反り 0.3 μm 以下と平行四辺形ラッキング剛性 3.4 倍を同時実現。',
    },
    nextGenInnovation: '精密レーザー共振器スペーサ標準の Invar-36 低膨張テンション・タイバー適用。',
    specs: [
      { label: '材質', value: 'Invar-36 (UNS K93600 / ASTM F1684, Fe-36%Ni, CTE = 1.2 ppm/K)' },
      { label: '構造効果', value: '平行四辺形ラッキング剛性 3.4× / 熱反り < 0.3 μm' },
      { label: '配置位置', value: 'KO_TOP 背面左右柱間スパン (X∈[-5.8..+5.8], Y=+12.55, Z=-5.82)' },
    ],
    references: [
      'ASTM F1684 Standard Specification for Iron-Nickel-Cobalt & Invar-36 (UNS K93600) Low-Expansion Alloys',
      'Guillaume, C. E. (1920), "Invar and Elinvar — Nobel Lecture on Low-Expansion Metrology Alloys"',
      'Vukobratovich, D., "Introduction to Optomechanical Design" (Athermal Invar Metering Trusses)',
    ],
    diagramType: 'welcome_quartz_bridge',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const seg = Math.max(8, qRadialSegs(12, 8));
      const bar = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.88, 0.24), m.invarScaleBar);
      bar.position.set(0, 12.55, -5.82);
      g.add(bar);
      if (ql >= 1) {
        const endGeo = new THREE.CylinderGeometry(0.54, 0.54, 0.28, seg).rotateX(Math.PI * 0.5);
        const eL = new THREE.Mesh(endGeo, m.stainlessMachined);
        eL.position.set(-5.2, 12.55, -5.82);
        const eR = new THREE.Mesh(endGeo, m.stainlessMachined);
        eR.position.set(5.2, 12.55, -5.82);
        g.add(eL, eR);
      }
      if (ql >= 2) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.26, 0.08), m.matteBlackAnodized);
        slot.position.set(0, 12.55, -5.95);
        g.add(slot);
      }
      return g;
    },
  },

  // --- D. 「そ」モジュール (+4: W372 - W375) ---
  {
    id: 'welcome-so-sapphire-ito-esd-clip',
    code: 'W372',
    order: 372,
    groupKey: 'glyph_so',
    title: 'W372. 「そ」前面サファイア窓 導電ITO〜ベゼル 1MΩ ESD静電放電スプリングクリップ',
    subtitle: 'Glyph "そ" Front Sapphire Window Conductive ITO-to-Bezel 1 MOhm ESD Discharge Spring Clip',
    category: '「そ」モジュール / 光学窓ESD静電放電',
    swatchColor: '#7dd3fc',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [28, 8, 44],
    plainAnalogy: '「そ」の下部椀カーブのサファイア前面窓に溜まる静電気を、透明導電ITO膜と1MΩ安全抵抗スプリングで静かに逃がし、ホコリ吸着とLED静電破壊を防ぐクリップです。',
    summary: '「そ」椀部サファイア窓（W132）左湾曲縁（X=-9.6, Y=-4.2, Z=+4.38）へ配した ITO 導電膜（10–45 Ω/sq）＋ 1 MΩ ESD 静電放電スプリングクリップ（IEC 61340-5-1 準拠）。4文字すべてのサファイア窓を完全 ESD 防護化します。',
    opticsAndPhysics: [
      '「よ・う・こ・そ」4文字すべての前面サファイア窓へ同一 1 MΩ ブリード接地を完結させ、清掃時の摩擦帯電 15 kV を全文字で均等安全放電。',
      '光学窓外周の低背配置により、W332 ミラーおよび前面光束への遮蔽を 0% に保持。',
    ],
    formula: {
      expression: 'R_bleed = 1.0 MΩ (全4文字統一),   I_ESD,max = 15 mA @ 15 kV (IEC 61340-5-1)',
      description: '全4着脱グリフ前面サファイア窓の 1 MΩ ESD 電流制限接地を「そ」にて完全統一。',
    },
    nextGenInnovation: '4文字共通規格の IEC 61340-5-1 準拠 ITO-to-Bezel ESD 防護クリップ。',
    specs: [
      { label: '準拠規格', value: 'IEC 61340-5-1 / ANSI/ESD S20.20' },
      { label: '構成', value: 'ITO 10–45 Ω/sq + BeCu/SUS301 ばね + 1 MΩ 0402 抵抗' },
      { label: '配置位置', value: 'SO_BOWL 左湾曲前面縁 (X=-9.6, Y=-4.2, Z=+4.38)' },
    ],
    references: [
      'IEC 61340-5-1:2016 Electrostatics — Protection of Electronic Devices from Electrostatic Phenomena',
      'Edmund Optics, "ITO Anti-Static Conductive Coatings on Sapphire Optics"',
      'ANSI/ESD S20.20 Electrostatic Discharge Control Program Standard',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => buildItoEsdSpringClip(-9.6, -4.2, 4.38, -1.05, m),
  },
  {
    id: 'welcome-so-z-truss-ti-gusset',
    code: 'W373',
    order: 373,
    groupKey: 'glyph_so',
    title: 'W373. 「そ」Z字斜め画〜折返し部 CNC Ti-6Al-4V 構造トラス補強ガセットブレース',
    subtitle: 'Glyph "そ" Z-Diagonal Stroke CNC Ti-6Al-4V Structural Truss Gusset Brace',
    category: '「そ」モジュール / Z字トラス曲げ剛性補強',
    swatchColor: '#aab4c0',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [24, 18, -34],
    plainAnalogy: '4文字の中で一番背が高く2回も急角度で折れ曲がる「そ」の斜め腕を、軽量肉抜きした航空機用チタントラスで補強し、輸送衝撃でも内部プリズムの光軸を絶対に狂わせません。',
    summary: '2回急折返し構造をもつ「そ」Z字斜め画（SO_Z2）の背面中下部（X=-6.8, Y=+10.2, Z=-5.82）へ斜め密着する Ti-6Al-4V Grade 5 CNC 軽量肉抜きトラス補強ガセットブレース。片持ち曲げ剛性を +42% 向上させ、45°プリズム（W167/W168）の光軸ズレを防止します。',
    opticsAndPhysics: [
      '細長い Z 字斜め腕（長 27.6 mm）の背面中立軸から最大距離 Z = -5.82 mm へ Ti-6Al-4V リブトラスを配置することで断面二次モーメント I を +42% 増大。',
      '輸送 15G 衝撃時の 45°全反射プリズム（W167/W168）傾き角を < 0.01° 以内に抑え、折返しコーナーの輝度連続性を維持。',
    ],
    formula: {
      expression: 'Δ(E·I)_Z-truss = +42%,   δ_impact(15G) < 4.5 μm  ⇒  Δθ_prism < 0.01°',
      description: 'Ti-6Al-4V 軽量ポケットトラスガセットによりZ字片持ち剛性 +42% とプリズム光軸保持を達成。',
    },
    nextGenInnovation: '航空宇宙 Ti-6Al-4V ポケット肉抜きトラス補強による高背 Z 字光学フレームの無歪み化。',
    specs: [
      { label: '材質', value: 'Ti-6Al-4V Grade 5 (ASTM B348, E = 114 GPa)' },
      { label: '剛性向上', value: 'Z字片持ち曲げ剛性 +42% (プリズム角度誤差 < 0.01°)' },
      { label: '配置位置', value: 'SO_Z2 斜め背面 (X=-6.8, Y=+10.2, Z=-5.82, 傾角 34.4°)' },
    ],
    references: [
      'ASTM B348 / AMS 4911 Ti-6Al-4V Aerospace Structural Sheet & Plate Properties',
      'Roark, R. J. & Young, W. C., "Roark\'s Formulas for Stress and Strain" (Offset Truss Stiffeners)',
      'MIL-STD-810H Method 516.8 Shock — Optical Alignment Retention in Cantilevered Structures',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const h = new THREE.Group();
      h.position.set(-6.8, 10.2, -5.82);
      h.rotation.z = 0.60;
      const body = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.1, 0.24), m.welcomeTitaniumFace);
      h.add(body);
      if (ql >= 1) {
        const railT = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.28, 0.14), m.titaniumRivet);
        railT.position.set(0, 0.86, -0.14);
        const railB = railT.clone();
        railB.position.set(0, -0.86, -0.14);
        const web1 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.22, 0.12), m.titaniumRivet);
        web1.position.set(-1.1, 0, -0.14);
        web1.rotation.z = 0.72;
        const web2 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.22, 0.12), m.titaniumRivet);
        web2.position.set(1.1, 0, -0.14);
        web2.rotation.z = -0.72;
        h.add(railT, railB, web1, web2);
      }
      g.add(h);
      return g;
    },
  },
  {
    id: 'welcome-so-z-joint-ofc-braid-strap',
    code: 'W374',
    order: 374,
    groupKey: 'glyph_so',
    title: 'W374. 「そ」Z字〜椀部ジョイント(W171)跨ぎ 無酸素銅 C10100 編組フレキシブル熱バイパス帯',
    subtitle: 'Glyph "そ" Z-to-Bowl Joint (W171) Bridging C10100 OFC Braided Flexible Thermal Bypass Strap',
    category: '「そ」モジュール / 編組銅熱バイパス',
    swatchColor: '#c97643',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [28, 12, -34],
    plainAnalogy: '「そ」の上部Z字と下部お椀をつなぐ真鍮ジョイントは熱が通りにくいボトルネックです。極細の純銅ワイヤーを編み込んだ柔らかい帯で跨いで熱の渋滞を68%も解消します。',
    summary: '真鍮ジョイント（W171, k = 109 W/m·K）の熱ボトルネックを迂回するよう Z 字中段〜椀部背面（X=+9.7, Y=+6.8, Z=-5.82）を跨ぐ C10100 無酸素銅（k = 398 W/m·K）極細素線編組フレキシブル熱シャントストラップ＆圧着ラグ対。',
    opticsAndPhysics: [
      'C10100 無酸素銅（純度 99.99%, k = 398 W/m·K）は真鍮 C3604（109 W/m·K）の 3.65 倍の熱伝導率を持ち、ジョイント間の直列熱抵抗を 68% 低減。',
      'Ø0.05 mm 極細素線編組構造により機械的振動・熱膨張応力を椀部やプリズムへ伝達せず、純粋な熱バイパス路として機能。',
    ],
    formula: {
      expression: 'R_th,bypass = L / (k_OFC · A_eff) = 0.85 K/W  (k_OFC = 398 W/m·K ⇒ 接合部熱抵抗 -68%)',
      description: 'C10100 無酸素銅編組バイパスにより機械応力ゼロのまま Z〜椀間の熱抵抗を 68% 削減。',
    },
    nextGenInnovation: '宇宙赤外線望遠鏡極低温冷却標準の C10100 無酸素銅編組フレキシブル熱ストラップ。',
    specs: [
      { label: '材質', value: 'ASTM B170 C10100 無酸素銅 (OFHC, k = 398 W/m·K, Ø0.05mm 編組)' },
      { label: '熱抵抗削減', value: '真鍮ジョイント W171 跨ぎ熱抵抗 -68% (応力非伝達)' },
      { label: '配置位置', value: 'SO_Z3〜椀接合部右背面 (X=+9.7, Y=+6.8, Z=-5.82)' },
    ],
    references: [
      'ASTM B170 Standard Specification for Oxygen-Free Electrolytic Copper (UNS C10100, k=398 W/m·K)',
      'Technology Applications Inc. / NASA GSFC, "OFHC Copper Braided Flexible Thermal Straps Design Guide"',
      'Incropera, F. P. et al., "Fundamentals of Heat and Mass Transfer", 8th Ed. (Parallel Thermal Shunts)',
    ],
    diagramType: 'welcome_led_thermal',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const braid = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.45, 0.24), m.copperCoil);
      braid.position.set(9.7, 6.8, -5.82);
      const lugL = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.75, 0.28), m.copperHeatSpreader);
      lugL.position.set(7.35, 6.8, -5.82);
      const lugR = lugL.clone();
      lugR.position.set(12.05, 6.8, -5.82);
      g.add(braid, lugL, lugR);
      if (ql >= 1) {
        const strandGeo = new THREE.BoxGeometry(3.8, 0.20, 0.08);
        for (const dy of [-0.42, 0, 0.42]) {
          const s = new THREE.Mesh(strandGeo, m.copperHybridBond);
          s.position.set(9.7, 6.8 + dy, -5.96);
          g.add(s);
        }
      }
      return g;
    },
  },
  {
    id: 'welcome-so-bowl-pcm58-thermal-cap',
    code: 'W375',
    order: 375,
    groupKey: 'glyph_so',
    title: 'W375. 「そ」椀部背面 密閉 Rubitherm® RT58 パラフィン相変化(PCM)潜熱蓄熱キャパシタ',
    subtitle: 'Glyph "そ" Bowl Rear Hermetic Rubitherm® RT58 Paraffin Phase-Change (PCM) Latent Thermal Capacitor',
    category: '「そ」モジュール / 相変化潜熱サーマルバッファ',
    swatchColor: '#8b6ec9',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [29, 0, -34],
    plainAnalogy: '4文字の中で一番LEDが多く発熱しやすい「そ」のお椀裏に、58℃で固体から液体へ溶けて大量の熱を吸い込む「熱のスポンジ（パラフィン蓄熱セル）」を密閉搭載し、迎賓ブースト点灯時の急激な温度上昇をピタリと抑えます。',
    summary: '4文字中 LED 実装密度が最大の「そ」椀部背面下部（X=-9.6, Y=-5.2, Z=-5.84）へ密着配置された Rubitherm® RT58 純パラフィン PCM（融点 58°C, 潜熱容量 ~160–179 kJ/kg, 密度 0.88 kg/L）金属封止サーマルキャパシタセル。',
    opticsAndPhysics: [
      '来客検知時の 30 秒フル輝度ブースト点灯で生じる過渡熱スパイクを、58°C 等温融解潜熱（~179 kJ/kg）として吸収し、LED ジャンクション温度のオーバーシュートを 6.8°C 抑制。',
      '金属マイクロ封止アルミセル＋内部銅フォーム伝熱フィン構造により、パラフィン単体の低熱伝導を補いつつ液漏れ・揮発を完全ゼロ化。',
    ],
    formula: {
      expression: 'Q_latent = m_PCM · ΔH_fus (RT58: T_m = 58.0°C, ΔH ≈ 179 kJ/kg)  ⇒  ΔT_spike ↓ -6.8°C',
      description: '58°C 融解潜熱キャパシタによりブースト点灯時の LED ジャンクション温度急騰を等温クランプ。',
    },
    nextGenInnovation: '航空電子・高出力レーザー過渡冷却標準の密閉 RT58 PCM 潜熱サーマルキャパシタ。',
    specs: [
      { label: '相変化材', value: 'Rubitherm® RT58 純パラフィン PCM (融点 58°C / 潜熱 ~179 kJ/kg)' },
      { label: '封止構造', value: 'レーザー溶接アルミマイクロセル + 内部銅熱拡散フィン' },
      { label: '配置位置', value: 'SO_BOWL 左下背面 (X=-9.6, Y=-5.2, Z=-5.84)' },
    ],
    references: [
      'Rubitherm Technologies GmbH, "RT58 Organic Phase Change Material Technical Data Sheet"',
      'Agyenim, F. et al. (2012), "Experimental Investigation and Improvement in Heat Transfer of RT58 PCM", Int. J. Low-Carbon Tech. 8(4), 260–268',
      'Zalba, B. et al. (2003), "Review on Thermal Energy Storage with Phase Change: Materials, Heat Transfer Analysis and Applications", Applied Thermal Engineering',
    ],
    diagramType: 'welcome_led_thermal',
    build: (m) => {
      const g = new THREE.Group();
      const ql = qualityLevel();
      const h = new THREE.Group();
      h.position.set(-9.6, -5.2, -5.84);
      h.rotation.z = -0.32;
      const casing = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.6, 0.24), m.stainlessMachined);
      const pcmCore = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.9, 0.14), m.pcmVioletSheet);
      pcmCore.position.z = -0.14;
      h.add(casing, pcmCore);
      if (ql >= 1) {
        const ribGeo = new THREE.BoxGeometry(2.5, 0.22, 0.08);
        for (const dy of [-1.2, 0, 1.2]) {
          const r = new THREE.Mesh(ribGeo, m.copperHeatSpreader);
          r.position.set(0, dy, -0.19);
          h.add(r);
        }
      }
      g.add(h);
      return g;
    },
  },
];

export function buildWelcomeGlyphWaveCParts(mats: V2MaterialLibrary): CadPart[] {
  return buildExpansionCadParts(WELCOME_GLYPH_WAVE_C_DEFS, mats);
}
