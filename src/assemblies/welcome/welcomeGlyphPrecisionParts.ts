import * as THREE from 'three';
import { CadPart, PartExplanation } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import { scaleRadialSegmentsForQuality as qRadialSegs } from '../../core/geometry_quality';
import {
  CX_KO,
  CX_SO,
  CX_U,
  CX_YO,
  qualityLevel,
  sampleStroke,
  StrokePt,
} from './welcomeGeometry';

export type WelcomeDiagramType =
  | 'welcome_glyph_layer'
  | 'welcome_led_thermal'
  | 'welcome_power_lifepo4'
  | 'welcome_driver_canfd'
  | 'welcome_dock_pogo'
  | 'welcome_quartz_bridge'
  | 'welcome_optical_plinth'
  | 'welcome_tof_audio_hmi';

export interface WelcomeExpansionPartDef {
  readonly id: string;
  readonly code: string;
  readonly order: number;
  readonly groupKey: 'glyph_yo' | 'glyph_u' | 'glyph_ko' | 'glyph_so' | 'optical_plinth';
  readonly title: string;
  readonly subtitle: string;
  readonly category: string;
  readonly swatchColor: string;
  readonly assembledPos: readonly [number, number, number];
  readonly explodeOffset: readonly [number, number, number];
  readonly plainAnalogy: string;
  readonly summary: string;
  readonly opticsAndPhysics: readonly string[];
  readonly formula: { readonly expression: string; readonly description: string };
  readonly nextGenInnovation: string;
  readonly specs: ReadonlyArray<{ readonly label: string; readonly value: string }>;
  readonly references: readonly string[];
  readonly diagramType: WelcomeDiagramType;
  readonly build: (mats: V2MaterialLibrary) => THREE.Group;
}

export function buildExpansionCadParts(
  defs: readonly WelcomeExpansionPartDef[],
  mats: V2MaterialLibrary
): CadPart[] {
  const out: CadPart[] = [];
  for (let i = 0; i < defs.length; i++) {
    const def = defs[i];
    const group = def.build(mats);
    group.name = def.id;
    group.position.set(def.assembledPos[0], def.assembledPos[1], def.assembledPos[2]);

    const assembledPos = new THREE.Vector3(def.assembledPos[0], def.assembledPos[1], def.assembledPos[2]);
    const explodeOffset = new THREE.Vector3(def.explodeOffset[0], def.explodeOffset[1], def.explodeOffset[2]);
    const explanation: PartExplanation = {
      title: def.title,
      subtitle: def.subtitle,
      category: def.category,
      plainAnalogy: def.plainAnalogy,
      summary: def.summary,
      opticsAndPhysics: [...def.opticsAndPhysics],
      formula: { expression: def.formula.expression, description: def.formula.description },
      nextGenInnovation: def.nextGenInnovation,
      specs: def.specs.map((s) => ({ label: s.label, value: s.value })),
      references: [...def.references],
      diagramType: def.diagramType,
    };

    out.push({
      id: def.id,
      subsystem: 'welcome',
      order: def.order,
      swatchColor: def.swatchColor,
      group,
      assembledPos,
      explodeOffset,
      integratedExplodeOffset: explodeOffset.clone(),
      interactiveMeshes: [],
      edgeLines: [],
      explanation,
    });
  }
  return out;
}

// ============================================================================
// Shared High-Precision Reusable Geometry Builders (Zero Raw Materials, 4-Tier LOD)
// ============================================================================

/** IP68 hydrophobic ePTFE breather vent + 3A molecular-sieve desiccant module on glyph rear. */
export function buildBreatherDesiccantPack(
  cx: number,
  cy: number,
  cz: number,
  mats: V2MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const ql = qualityLevel();
  const seg = qRadialSegs(14, 8);
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(1.55, 1.65, 0.40, seg).rotateX(Math.PI * 0.5),
    mats.stainlessMachined
  );
  body.position.set(cx, cy, cz);
  const membrane = new THREE.Mesh(
    new THREE.CylinderGeometry(1.08, 1.08, 0.12, seg).rotateX(Math.PI * 0.5),
    mats.ptfeCleanWhite
  );
  membrane.position.set(cx, cy, cz - 0.22);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.35, 0.38), mats.sintered316L);
  cap.position.set(cx + 2.8, cy, cz);
  g.add(body, membrane, cap);
  if (ql >= 2) {
    const oRing = new THREE.Mesh(new THREE.TorusGeometry(1.52, 0.08, 6, seg), mats.epdmGasket);
    oRing.position.set(cx, cy, cz + 0.12);
    g.add(oRing);
  }
  return g;
}

/** Curved semicircular wrap-around Alanod MIRO-SILVER® 98% PVD silver optical end-mirror cap. */
export function buildCurvedEndMirrorCap(
  cx: number,
  cy: number,
  z: number,
  outwardAngle: number,
  rInner: number,
  mats: V2MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const ql = qualityLevel();
  g.position.set(cx, cy, z);
  g.rotation.z = outwardAngle;
  const arcSpan = 0.60;
  const segs = ql === 0 ? 5 : ql === 1 ? 8 : 12;
  const makeArcShell = (ri: number, ro: number, depth: number, span: number): THREE.ExtrudeGeometry => {
    const sh = new THREE.Shape();
    sh.absarc(0, 0, ro, -span, span, false);
    sh.absarc(0, 0, ri, span, -span, true);
    sh.closePath();
    const geo = new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: false, curveSegments: segs, steps: 1 });
    geo.translate(0, 0, -depth * 0.5);
    return geo;
  };
  g.add(new THREE.Mesh(makeArcShell(rInner, rInner + 0.16, 1.18, arcSpan), mats.vipSilverFoil));
  g.add(new THREE.Mesh(makeArcShell(rInner + 0.16, rInner + 0.30, 1.08, arcSpan * 0.90), mats.stainlessMachined));
  if (ql >= 1) {
    g.add(new THREE.Mesh(makeArcShell(rInner + 0.30, rInner + 0.40, 1.24, arcSpan * 0.82), mats.epdmGasket));
  }
  return g;
}

/** BeCu C17200 EMI grounding fingerstock clips along a stroke rear seam. */
export function buildStrokeEmiFingerstock(
  pts: readonly StrokePt[],
  zPos: number,
  count: number,
  mats: V2MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const ql = qualityLevel();
  const s = sampleStroke(pts, Math.max(count * 3, 12));
  const clipGeo = new THREE.BoxGeometry(1.35, 0.72, 0.26);
  const leafGeo = ql >= 1 ? new THREE.BoxGeometry(1.1, 0.46, 0.16) : null;
  for (let i = 0; i < count; i++) {
    const idx = Math.min(s.pts.length - 1, Math.round(((i + 0.5) / count) * (s.pts.length - 1)));
    const p = s.pts[idx];
    const t = s.tangents[idx];
    const h = new THREE.Group();
    h.position.set(p.x, p.y, zPos);
    h.rotation.z = Math.atan2(t.y, t.x);
    h.add(new THREE.Mesh(clipGeo, mats.beCuSpring));
    if (leafGeo) {
      const leaf = new THREE.Mesh(leafGeo, mats.goldPlating);
      leaf.position.z = -0.16;
      h.add(leaf);
    }
    g.add(h);
  }
  return g;
}

/** W80Cu20 tungsten-copper + Sorbothane® viscoelastic 318 Hz tuned mass damper (TMD). */
export function buildGlyphTmdDamper(
  cx: number,
  cy: number,
  cz: number,
  w: number,
  h: number,
  mats: V2MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const ql = qualityLevel();
  const pad = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.26), mats.damperElastomer);
  pad.position.set(cx, cy, cz + 0.16);
  const slug = new THREE.Mesh(new THREE.BoxGeometry(w * 0.92, h * 0.88, 0.42), mats.tungstenCopper);
  slug.position.set(cx, cy, cz - 0.18);
  g.add(pad, slug);
  if (ql >= 2) {
    const cap = new THREE.Mesh(new THREE.BoxGeometry(w * 0.96, 0.28, 0.16), mats.stainlessMachined);
    cap.position.set(cx, cy, cz - 0.44);
    g.add(cap);
  }
  return g;
}

/** DIN 65151 Schnorr® serrated lock washers + DIN 8140 Helicoil inserts at rear fastener bosses. */
export function buildSchnorrHelicoilArray(
  positions: ReadonlyArray<readonly [number, number, number]>,
  mats: V2MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const ql = qualityLevel();
  const seg = qRadialSegs(12, 6);
  const washerGeo = new THREE.CylinderGeometry(0.88, 1.15, 0.22, seg, 1, true).rotateX(Math.PI * 0.5);
  const coilGeo = new THREE.TorusGeometry(0.76, 0.08, ql >= 2 ? 5 : 4, seg);
  for (const [px, py, pz] of positions) {
    const b = new THREE.Group();
    b.position.set(px, py, pz);
    b.add(new THREE.Mesh(washerGeo, mats.stainlessMachined));
    const c = new THREE.Mesh(coilGeo, mats.silverElectrode);
    c.position.z = -0.15;
    b.add(c);
    g.add(b);
  }
  return g;
}

// ============================================================================
// Wave 0 Glyph Precision Expansion Parts (17 Parts: W221 - W237)
// ============================================================================
export const WELCOME_GLYPH_PRECISION_DEFS: readonly WelcomeExpansionPartDef[] = [
  // --- 「よ」モジュール (+5パーツ: W221 - W225) ---
  {
    id: 'welcome-yo-ceramic-dowel-sleeves',
    code: 'W221',
    order: 221,
    groupKey: 'glyph_yo',
    title: 'W221. 「よ」ダブテール根元 ジルコニアセラミック断熱位置決めスリーブ対',
    subtitle: 'Glyph "よ" Dovetail Root Zirconia Ceramic Thermal-Break Alignment Dowel Sleeves',
    category: '「よ」モジュール / 精密位置決め・断熱',
    swatchColor: '#f3f0e8',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-30, -10, -34],
    plainAnalogy: '「よ」の文字を台座へ差し込んだ時、1ミクロンのズレもなく毎回同じ角度で立ち上がるように支える超硬質セラミックのガイド筒です。',
    summary: '「よ」主幹下端の背面締結座に圧入された部分安定化ジルコニア（Y-TZP）精密位置決めスリーブ対。鋼製ピンとの電食を遮断しつつ台座からの逆流熱を抑制します。',
    opticsAndPhysics: [
      'Y-TZPジルコニアの低熱伝導率（2.2 W/m·K）により、台座PMICから文字光学系への伝導熱逆流を76%低減。',
      'H6/g5精密はめあい公差（±4 μm）で「よ」主幹の鉛直軸倒れ角を0.02°以内へ固定。',
    ],
    formula: {
      expression: 'Δθ_tilt = δ_fit / L_span = 0.004 mm / 12.0 mm = 0.019°  (Y-TZP k = 2.2 W/m·K)',
      description: 'ジルコニア位置決めスリーブ対により着脱再現角0.02°以内と断熱を同時達成。',
    },
    nextGenInnovation: '精密光学定盤のセラミック断熱ノックピン技術を文字モジュールへ適用。',
    specs: [
      { label: '材質', value: 'Y-TZP ジルコニアセラミック (HV 1250)' },
      { label: '熱伝導率', value: '2.2 W/m·K (アルミの約1/80)' },
      { label: '再現精度', value: '±4 μm / 軸倒れ < 0.02°' },
    ],
    references: [
      'Kyocera Fine Ceramics, "Zirconia (Y-TZP) Thermal & Mechanical Properties Engineering Handbook"',
      'ISO 286-2:2010 Geometrical Product Specifications — Limits and Fits (H6/g5 Dowel Tolerances)',
      'Slocum, A. H., "Precision Machine Design", SME Press (Kinematic Alignment & Thermal Isolation)',
    ],
    diagramType: 'welcome_dock_pogo',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(12, 6);
      const sleeveGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.42, seg).rotateX(Math.PI * 0.5);
      for (const dx of [-6.2, 6.2]) {
        const s = new THREE.Mesh(sleeveGeo, m.aluminaCeramic);
        s.position.set(dx, -12.6, -5.85);
        g.add(s);
      }
      return g;
    },
  },
  {
    id: 'welcome-yo-sapphire-stress-collar',
    code: 'W222',
    order: 222,
    groupKey: 'glyph_yo',
    title: 'W222. 「よ」主幹前面 サファイア窓外周 応力緩和フルオロシリコーンカラー',
    subtitle: 'Glyph "よ" Front Sapphire Window Stress-Relief Fluorosilicone Perimeter Collar',
    category: '「よ」モジュール / 光学窓応力緩和',
    swatchColor: '#3b6796',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-28, 8, 42],
    plainAnalogy: '温度変化で金属枠と透明カバーの伸び縮み差が出ても、カバーが割れたり歪んだりしないよう優しくクッションになる極薄ゴム縁取りです。',
    summary: '「よ」主幹前面のチタン保護ベゼル外周段差へ密着する耐油・耐UVフルオロシリコーン（FVMQ 45A）応力緩和マイクロカラー。熱膨張差による複屈折と光ムラを防止します。',
    opticsAndPhysics: [
      'A6061（23.6 ppm/K）とサファイア光学窓（5.3 ppm/K）のΔCTE差18.3 ppm/Kを硬度45AのFVMQ弾性層が完全吸収。',
      '光学窓エッジの応力誘起複屈折を0.5 nm/cm以下へ抑制し偏光輝度ムラを解消。',
    ],
    formula: {
      expression: 'ΔL_CTE = L · (α_Al - α_sap) · ΔT = 34 mm × 18.3e-6 × 45 K = 28.0 μm',
      description: '熱膨張差28 μmをフルオロシリコーン緩衝層が弾性吸収し無応力光学保持を実現。',
    },
    nextGenInnovation: '航空宇宙光学窓規格のFVMQ応力フリー外周緩衝マイクロカラー。',
    specs: [
      { label: '材質', value: 'フルオロシリコーン FVMQ Shore A 45' },
      { label: '許容ΔCTE変位', value: '±45 μm（-20°C〜+70°C）' },
      { label: '複屈折抑制', value: '< 0.5 nm/cm' },
    ],
    references: [
      'Yoder, P. R., "Mounting Optics in Optical Instruments", 2nd Ed., SPIE Press (Elastomeric Thermal Isolation)',
      'ASTM D2000 / SAE AMS-R-25988 Fluorosilicone (FVMQ) Elastomer Specification',
      'Schott AG, "TIE-27 Stress Birefringence in Optical Windows & Edge Mounting"',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const stripL = new THREE.Mesh(new THREE.BoxGeometry(0.32, 24.0, 0.30), m.antiVibRubber);
      stripL.position.set(-2.95, 6.2, 4.30);
      const stripR = new THREE.Mesh(new THREE.BoxGeometry(0.32, 24.0, 0.30), m.antiVibRubber);
      stripR.position.set(4.55, 6.2, 4.30);
      g.add(stripL, stripR);
      return g;
    },
  },
  {
    id: 'welcome-yo-ntc-test-header',
    code: 'W223',
    order: 223,
    groupKey: 'glyph_yo',
    title: 'W223. 「よ」MCPCB背面 精密0402 NTCサーミスタ＆金メッキ校正テストポイント基板',
    subtitle: 'Glyph "よ" Rear Precision 10kΩ NTC Thermistor & Gold Calibration Test-Point Tap',
    category: '「よ」モジュール / 熱監視・校正診断',
    swatchColor: '#1b5e47',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-28, 12, -34],
    plainAnalogy: 'LED基板の裏側で温度を0.1度単位で見張り続け、工場出荷時の色合わせ診断ピンも備えた超小型温度センサー小基板です。',
    summary: '「よ」主幹背面にサーマル接着されたMurata NCP15XH103（10 kΩ ±1%、B定数3380 K）温度帰還プローブ＆4極金メッキ診断テストパッド。CRI97白色LEDの熱シフトをリアルタイム補償します。',
    opticsAndPhysics: [
      'LED接合温度が+10°C上昇すると順電圧が-20 mV低下し色度がΔu′v′=0.002シフトするため、10 Hz温度帰還でPWM電流を自動補正。',
      '4極金メッキテストパッドにより分解せず背面から定電流値と温度校正を検証可能。',
    ],
    formula: {
      expression: 'R(T) = R₀ · exp[ B · (1/T - 1/T₀) ]   (R₀ = 10 kΩ @ 25°C, B = 3380 K)',
      description: '±1%精度NTCサーミスタの温度帰還により全4文字の色温度偏差を±15 K以内へロック。',
    },
    nextGenInnovation: '4文字独立閉ループ色度・温度リアルタイム補償サーミスタモジュール。',
    specs: [
      { label: 'センサー', value: 'Murata NCP15XH103F03RC (10 kΩ ±1%)' },
      { label: '温度分解能', value: '0.05 °C (12-bit ADC 10 Hz)' },
      { label: '診断パッド', value: 'ENIG 金メッキ 4-pad 校正ポート' },
    ],
    references: [
      'Murata Manufacturing Co., "NCP15XH103F03RC Chip NTC Thermistor Datasheet"',
      'CIE 127:2007 Measurement of LEDs — Junction Temperature & Chromaticity Drift Compensation',
      'IPC-2221B Generic Standard on Printed Board Design (Test Point Pad Spacing)',
    ],
    diagramType: 'welcome_led_thermal',
    build: (m) => {
      const g = new THREE.Group();
      const pcb = new THREE.Mesh(new THREE.BoxGeometry(3.4, 5.2, 0.36), m.sensorPcb);
      pcb.position.set(0.8, 17.2, -5.84);
      g.add(pcb);
      for (let i = 0; i < 4; i++) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.10), m.goldPlating);
        pad.position.set(-0.2 + (i % 2) * 1.4, 15.6 + Math.floor(i / 2) * 2.2, -6.07);
        g.add(pad);
      }
      return g;
    },
  },
  {
    id: 'welcome-yo-eptfe-breather-desiccant',
    code: 'W224',
    order: 224,
    groupKey: 'glyph_yo',
    title: 'W224. 「よ」IP68 疎水ePTFEブリーザー膜＆3Åゼオライト防曇カートリッジ',
    subtitle: 'Glyph "よ" IP68 Hydrophobic ePTFE Breather Vent & 3Å Zeolite Anti-Fog Cartridge',
    category: '「よ」モジュール / 防曇・圧力平衡',
    swatchColor: '#f8fafc',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-28, 4, -34],
    plainAnalogy: '文字内部が温まって膨らむ空気圧を逃がしつつ水滴やホコリは通さないゴアテックス通気膜と、結露を防ぐ極小乾燥剤パックです。',
    summary: '「よ」主幹背面下部のIP68疎水ePTFE圧力平衡ベント（孔径0.2 μm）＆焼結316L容器入り3Åモレキュラーシーブ防曇カートリッジ。内部露点を-10°C以下に保ち光学拡散面の曇りを防止します。',
    opticsAndPhysics: [
      'LED点灯時の温度上昇（ΔT = +25 K）で約8.4 kPaの内圧差が生じるが、ePTFE通気膜が瞬時に均圧化しIP65 Oリング疲労をゼロ化。',
      '3Åゼオライトが直径0.265 nmの水分子のみを選択吸着し、高湿85%RH環境でも内部相対湿度を35%RH未満に維持。',
    ],
    formula: {
      expression: 'ΔP_sealed = P₀ · (ΔT / T₀) = 101.3 kPa × (25 / 298) = 8.50 kPa  ⇒  ΔP_vented < 0.05 kPa',
      description: '疎水ePTFEベントによりシール負荷圧8.5 kPaを0.05 kPa未満へ解放。',
    },
    nextGenInnovation: '産業光学カメラ標準のePTFE呼吸膜＋3Åゼオライト複合防曇モジュール。',
    specs: [
      { label: '通気膜', value: 'IP68 疎水ePTFE (0.2 μm / 耐水圧 > 0.6 bar)' },
      { label: '乾燥剤', value: '3Å 結晶ゼオライト焼結316Lカプセル' },
      { label: '内部露点', value: '< -10 °C (85%RH連続試験)' },
    ],
    references: [
      'W. L. Gore & Associates, "GORE® Protective Vents — Pressure Equalization in Sealed Enclosures"',
      'IEC 60529 Degrees of Protection Provided by Enclosures (IP65 / IP68 Ingress Testing)',
      'Breck, D. W., "Zeolite Molecular Sieves: Structure, Chemistry, and Use", Wiley',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => buildBreatherDesiccantPack(0.8, 3.2, -5.85, m),
  },
  {
    id: 'welcome-yo-loop-counterweight',
    code: 'W225',
    order: 225,
    groupKey: 'glyph_yo',
    title: 'W225. 「よ」下部ループ W80Cu20 タングステン銅 慣性バランスカウンターウェイト',
    subtitle: 'Glyph "よ" Lower Loop W80Cu20 Tungsten-Copper Dynamic Balance Counterweight',
    category: '「よ」モジュール / 質量バランス・制振',
    swatchColor: '#85664e',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-30, -10, -34],
    plainAnalogy: '「よ」の右上に突き出た横棒と重さのバランスを取るため、左下の丸いループ裏側に仕込んだ高比重タングステン合金のおもりです。',
    summary: '「よ」横枝（YO_BAR）による右側重心偏心を相殺するため、下部ループ左側背面へ配置したW80Cu20（密度15.6 g/cm³）精密バランスウェイト。ダブテール根元への静的曲げモーメントをゼロ化します。',
    opticsAndPhysics: [
      '横枝の右側偏心モーメント M_bar = +42 g·mm に対し、左側ループ背面へ高比重W80Cu20を配置して合成重心を主幹X中心軸へ一致。',
      '高熱伝導（200 W/m·K）を兼備するため背面放熱マスとしても同時機能。',
    ],
    formula: {
      expression: 'ΣM_x = m_bar · x_bar + m_cw · x_cw ≈ 0   (ρ_W80Cu20 = 15.6 g/cm³)',
      description: 'W80Cu20カウンターウェイトで「よ」単体の左右重心オフセットを±0.2 mm以内へ矯正。',
    },
    nextGenInnovation: '高比重バランス矯正とヒートシンク熱容量増強を兼ねたW80Cu20複合ウェイト。',
    specs: [
      { label: '材質・密度', value: 'W80Cu20 タングステン銅 (15.6 g/cm³)' },
      { label: '熱伝導率', value: '200 W/m·K' },
      { label: '重心補正', value: '「よ」単体 X偏心 < ±0.2 mm' },
    ],
    references: [
      'ASTM B702 Standard Specification for Copper-Tungsten Electrical Contact & Thermal Material',
      'Plansee SE, "Tungsten-Copper (WCu) High-Density Thermal Management & Balance Components"',
      'Rao, S. S., "Mechanical Vibrations", 6th Ed., Pearson (Static & Dynamic Balancing)',
    ],
    diagramType: 'welcome_led_thermal',
    build: (m) => {
      const g = new THREE.Group();
      const slug = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.2, 0.36), m.tungstenCopper);
      slug.position.set(-10.5, -9.2, -5.84);
      const plate = new THREE.Mesh(new THREE.BoxGeometry(6.0, 2.6, 0.10), m.stainlessMachined);
      plate.position.set(-10.5, -9.2, -6.07);
      g.add(slug, plate);
      return g;
    },
  },

  // --- 「う」モジュール (+4パーツ: W226 - W229) ---
  {
    id: 'welcome-u-quartz-dust-boots',
    code: 'W226',
    order: 226,
    groupKey: 'glyph_u',
    title: 'W226. 「う」石英ブリッジ両端 デュアルリップ・フッ素ゴム防塵シーリングブーツ対',
    subtitle: 'Glyph "う" Quartz Bridge Dual-Lip FKM Fluoroelastomer Dust Sealing Boots',
    category: '「う」モジュール / 光学支柱シーリング',
    swatchColor: '#353840',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-6, 18, 4],
    plainAnalogy: '「う」の上の点と下の弧を繋ぐ透明な石英柱の付け根を上下からゴムブーツで密閉し、ホコリや光漏れを防ぐパッキンです。',
    summary: '石英支柱（W79）と上部点／主弧の接合境界背面へ嵌合するフッ素ゴム（FKM Viton® 60A）デュアルリップ防塵ブーツ対。熱膨張スライドを許容しつつIP65気密を維持します。',
    opticsAndPhysics: [
      '石英ガラス（0.55 ppm/K）とアルミ筐体（23.6 ppm/K）の大きな熱膨張差をデュアルリップ摺動シールが吸収し石英クラックを防止。',
      '黒色FKMにより石英支柱接合部からの不要迷光を99.8%遮断。',
    ],
    formula: {
      expression: 'σ_clamp = E_FKM · ε_comp ≤ 1.2 MPa  ≪  σ_fracture(SiO₂) = 48 MPa',
      description: '低弾性FKMブーツにより石英支柱の曲げ・熱応力を破断強度の1/40以下へ保持。',
    },
    nextGenInnovation: '非接触フローティング意匠の信頼性を支える超小型FKMデュアルリップブーツ。',
    specs: [
      { label: '材質', value: 'FKM Viton® フッ素ゴム Shore A 60' },
      { label: '保護等級', value: 'IP65 接合部防塵・遮光シール' },
      { label: '設置数', value: '石英支柱上下端 2点対' },
    ],
    references: [
      'Parker Hannifin, "O-Ring & Fluoroelastomer (FKM) Optical Housing Sealing Handbook (ORD 5700)"',
      'Corning HPFS® 7980 Fused Silica Mechanical Mounting & Stress Guidelines',
      'ISO 3601 Fluid Power Systems — Elastomeric Sealing Elements',
    ],
    diagramType: 'welcome_quartz_bridge',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(12, 6);
      const bootGeo = new THREE.TorusGeometry(1.41, 0.09, 6, seg, Math.PI * 1.45);
      for (const y of [17.28, 18.06]) {
        const b = new THREE.Mesh(bootGeo, m.epdmGasket);
        b.rotation.x = Math.PI * 0.5;
        b.rotation.z = -Math.PI * 0.225;
        b.position.set(0.5, y, 0);
        g.add(b);
      }
      return g;
    },
  },
  {
    id: 'welcome-u-coax-shield-ferrule',
    code: 'W227',
    order: 227,
    groupKey: 'glyph_u',
    title: 'W227. 「う」石英支柱同軸リード 金メッキ真鍮EMIシールドフェルール対',
    subtitle: 'Glyph "う" Quartz Bridge Coaxial Lead Gold-Plated Brass EMI Shield Ferrules',
    category: '「う」モジュール / 同軸EMIシールド',
    swatchColor: '#e2b648',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-6, 18, 4],
    plainAnalogy: '透明な柱の中を通る電源配線から電波ノイズが漏れないよう、両端の出口を金メッキ真鍮リングでしっかり接地する部品です。',
    summary: '「う」上部点へ32 kHz PWM駆動電流を供給する石英内極細同軸線の両端へ圧着された金メッキC3604真鍮EMIシールドフェルール。高速立上りエッジの放射ノイズを遮断します。',
    opticsAndPhysics: [
      '360°全周圧着フェルールにより、ピッグテール接地比で高周波インダクタンスを1/12以下（< 0.4 nH）へ低減。',
      '30 MHz–1 GHz帯の放射EMIを-26 dB抑制しCISPR 32 Class B余裕度を確保。',
    ],
    formula: {
      expression: 'Z_shield(f) = R_dc + j·2πf·L_360   (L_360 < 0.4 nH ⇒ |Z| < 0.25 Ω @ 100 MHz)',
      description: '360°同軸フェルール終端で32 kHz PWM高調波の放射ノイズを根絶。',
    },
    nextGenInnovation: '極細透明配線向け360°マイクロ同軸EMIシールドフェルール。',
    specs: [
      { label: '材質・めっき', value: 'C3604真鍮 + 0.5 μm 硬質金めっき' },
      { label: '終端インダクタンス', value: '< 0.4 nH (360°圧着)' },
      { label: 'EMI減衰', value: '> 26 dB (30 MHz – 1 GHz)' },
    ],
    references: [
      'Ott, H. W., "Electromagnetic Compatibility Engineering", Wiley (360° Coaxial Shield Termination)',
      'CISPR 32:2015 Electromagnetic Compatibility of Multimedia Equipment — Emission Requirements',
      'TE Connectivity, "Micro-Coaxial Shield Ferrule & Crimp Termination Application Spec"',
    ],
    diagramType: 'welcome_quartz_bridge',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(14, 8);
      const sh = new THREE.Shape();
      const a0 = -Math.PI * 0.225;
      const a1 = Math.PI * 1.225;
      sh.absarc(0, 0, 1.56, a0, a1, false);
      sh.absarc(0, 0, 1.30, a1, a0, true);
      sh.closePath();
      const ferGeo = new THREE.ExtrudeGeometry(sh, { depth: 0.18, bevelEnabled: false, curveSegments: seg, steps: 1 });
      ferGeo.translate(0, 0, -0.09);
      ferGeo.rotateX(Math.PI * 0.5);
      const f = new THREE.Mesh(ferGeo, m.goldPlating);
      f.position.set(0.5, 17.67, 0);
      g.add(f);
      return g;
    },
  },
  {
    id: 'welcome-u-eptfe-breather-desiccant',
    code: 'W228',
    order: 228,
    groupKey: 'glyph_u',
    title: 'W228. 「う」IP68 疎水ePTFEブリーザー膜＆マイクロゼオライト防曇カートリッジ',
    subtitle: 'Glyph "う" IP68 ePTFE Breather Vent & 3Å Molecular-Sieve Anti-Fog Cartridge',
    category: '「う」モジュール / 防曇・湿度制御',
    swatchColor: '#e2e8f0',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-9, 4, -34],
    plainAnalogy: '文字内部の空気圧を逃がすゴアテックス通気膜と、侵入したわずかな湿気を吸着してサファイアレンズの曇りを防ぐ超小型シリカ・ゼオライト乾燥剤パックです。',
    summary: '「う」主弧背面プレートに配したIP68 ePTFE圧力平衡ベントと、焼結アルミ容器入り3Åモレキュラーシーブ（ゼオライト）マイクロ乾燥カートリッジ。高湿環境（85%RH）での急冷時でも内部露点を-10°C以下に保ち、光学拡散面の曇りを恒久防止します。',
    opticsAndPhysics: [
      '孔径0.3 nm（3Å）の結晶ゼオライト分子篩が水分子（動力学的直径0.265 nm）のみを選択吸着し、VOCや窒素は通過させる高効率防曇機構。',
      '背面ePTFE呼吸膜（孔径0.2 μm）が熱膨張時の差圧を即座に均圧化し、IP65シール寿命を大幅に延長。',
    ],
    formula: {
      expression: 'd_pore(3Å) = 0.30 nm > d_H2O(0.265 nm)  ⇒  T_dew < -10 °C (RH_int < 35%)',
      description: '3Å分子篩＋ePTFE呼吸膜の併用で高湿急冷時の内部結露リスクを恒久排除。',
    },
    nextGenInnovation: '光学機器レンズ鏡筒防曇技術を文字光学チャンバーへ小型集積。',
    specs: [
      { label: '通気膜', value: 'IP68 疎水ePTFE (0.2 μm 撥水撥油)' },
      { label: '吸湿材', value: '3Å モレキュラーシーブ焼結カプセル' },
      { label: '内部露点', value: '< -10 °C' },
    ],
    references: [
      'W. L. Gore & Associates, "ePTFE Venting & Moisture Control in Sealed Optical Assemblies"',
      'IEC 60068-2-30 Environmental Testing — Damp Heat Cyclic Condensation Resistance',
      'Grace Davison, "Sylobead® 3Å Molecular Sieve Desiccant Technical Bulletin"',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => buildBreatherDesiccantPack(9.8, 3.6, -5.85, m),
  },
  {
    id: 'welcome-u-arc-outer-lightseal',
    code: 'W229',
    order: 229,
    groupKey: 'glyph_u',
    title: 'W229. 「う」主弧外周 シナバー／白発光分離 マイクロベベル遮光トリム帯',
    subtitle: 'Glyph "う" Main-Arc Outer Micro-Bevel Stray-Light Trim Band',
    category: '「う」モジュール / 迷光遮断トリム',
    swatchColor: '#202328',
    assembledPos: [CX_U, 4, 0],
    explodeOffset: [-9, 8, 42],
    plainAnalogy: '「う」の大きなカーブの外縁から余計な光が漏れて輪郭がぼやけないよう、艶消し黒の超薄枠で引き締める遮光トリムです。',
    summary: '「う」主弧の右側大曲率区間のチタン保護ベゼル外周へ配置された艶消し黒アルマイト（反射率<1.5%）マイクロ遮光トリム。暗所展示時のハレーションを解消します。',
    opticsAndPhysics: [
      '曲率半径最小域は全反射臨界角を割り込みやすいため、外周に吸収率98.5%の黒色マイクロバッフルを設けて輪郭コントラストを向上。',
      '明所でも金属縁の不要な鏡面反射を抑え、発光ストロークの視認性を極大化。',
    ],
    formula: {
      expression: 'C_edge = L_stroke / L_halo > 180 : 1   (R_baffle < 1.5%)',
      description: '大曲率外周の吸収率98.5%トリムによりエッジコントラスト比180:1超を実現。',
    },
    nextGenInnovation: '高級シネマレンズの鏡筒内面迷光処理（OD>3）を文字外縁へ展開。',
    specs: [
      { label: '表面処理', value: '艶消し黒硬質アルマイト (R < 1.5%)' },
      { label: '配置位置', value: 'U_ARC 最大曲率外縁 (Z = +2.75 mm)' },
      { label: 'コントラスト比', value: '> 180 : 1' },
    ],
    references: [
      'Breault, R. P., "Control of Stray Light", Handbook of Optics, Vol. 1, McGraw-Hill',
      'MIL-A-8625 Type III Class 2 Black Hard Anodize Optical Absorption Specification',
      'ISO 9358 Optics and Optical Instruments — Veiling Glare of Image Forming Systems',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const s = sampleStroke(
        [
          { x: 8.8, y: 11.6 },
          { x: 12.6, y: 4.0 },
          { x: 9.4, y: -4.8 },
        ],
        8
      );
      const segGeo = new THREE.BoxGeometry(1.85, 0.34, 0.28);
      for (let i = 1; i < s.pts.length - 1; i++) {
        const p = s.pts[i];
        const t = s.tangents[i];
        const n = s.normals[i];
        const bar = new THREE.Mesh(segGeo, m.matteBlackAnodized);
        bar.position.set(p.x - n.x * 3.68, p.y - n.y * 3.68, 4.26);
        bar.rotation.z = Math.atan2(t.y, t.x);
        g.add(bar);
      }
      return g;
    },
  },

  // --- 「こ」モジュール (+4パーツ: W230 - W233) ---
  {
    id: 'welcome-ko-quartz-relief-collars',
    code: 'W230',
    order: 230,
    groupKey: 'glyph_ko',
    title: 'W230. 「こ」上下2筐体連結石英柱 応力緩和シリコーン緩衝カラー対',
    subtitle: 'Glyph "こ" Dual-Chamber Quartz Post Stress-Relief Silicone Isolation Collars',
    category: '「こ」モジュール / 石英支柱緩衝',
    swatchColor: '#4b5563',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [4, 6, 4],
    plainAnalogy: '「こ」の上の棒と下の棒を繋ぐ2本の透明石英柱に衝撃や温度変化が直接伝わらないよう、付け根を守る弾性緩衝リングです。',
    summary: '「こ」の上下2チャンバー間を架橋する左右石英ポストの上下接合部背面へ実装された耐UVシリコーン緩衝カラー群。輸送時の衝撃加速度50Gから石英柱を保護します。',
    opticsAndPhysics: [
      '剛体固定では石英柱の根元に曲げ応力集中（Kt ≈ 3.2）が発生するが、シリコーン緩衝カラーが曲げモーメントを等分布荷重へ変換。',
      '上下チャンバーの固有振動数差による共振伝達率を-12 dB減衰。',
    ],
    formula: {
      expression: 'K_t,eff = 1.15  (vs 3.2 rigid)  ⇒  50G Shock Safety Factor > 4.5',
      description: 'シリコーン緩衝カラーにより石英支柱根元の応力集中係数を約1/3へ低減。',
    },
    nextGenInnovation: '2分割フローティング文字構造向け耐50G石英ポスト免震カラー。',
    specs: [
      { label: '材質', value: '耐UV高減衰シリコーン Shore A 50' },
      { label: '耐衝撃', value: '50G / 11 ms 半正弦波衝撃適合' },
      { label: '設置数', value: '左右石英柱 4箇所カラー' },
    ],
    references: [
      'ISTA 2A / IEC 60068-2-27 Mechanical Shock Testing of Glass-to-Metal Optical Bridges',
      'Corning Specialty Glass, "Elastomeric Isolation Design for Structural Fused Silica Posts"',
      'Steinberg, D. S., "Vibration Analysis for Electronic Equipment", 3rd Ed., Wiley',
    ],
    diagramType: 'welcome_quartz_bridge',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(12, 6);
      const colGeo = new THREE.TorusGeometry(1.58, 0.15, 6, seg, Math.PI * 1.45);
      for (const py of [0.2, 3.1, 6.0]) {
        const c = new THREE.Mesh(colGeo, m.epdmGasket);
        c.rotation.x = Math.PI * 0.5;
        c.rotation.z = -Math.PI * 0.225;
        c.position.set(-7.6, py, 0);
        g.add(c);
      }
      return g;
    },
  },
  {
    id: 'welcome-ko-hook-specular-wedge',
    code: 'W231',
    order: 231,
    groupKey: 'glyph_ko',
    title: 'W231. 「こ」上画ハネ角部 45°誘電体高反射マイクロデフレクタウェッジ',
    subtitle: 'Glyph "こ" Upper-Hook Corner 45° Dielectric High-Reflectance Micro-Deflector Wedge',
    category: '「こ」モジュール / 光学コーナー導光',
    swatchColor: '#dbe4ee',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [11, 21, -34],
    plainAnalogy: '「こ」の上の横棒から下向きに折れる「ハネ」の角で、光が突き抜けて暗くならないよう45°の鏡で下へ綺麗に曲げる小さなプリズム鏡です。',
    summary: '「こ」上画右端の急角度ハネ（KO_TOP→KO_TOP_HOOK）外側角部背面へ配した誘電体増反射銀マイクロウェッジ。ハネ先端の輝度低下を22%から2%未満へ改善します。',
    opticsAndPhysics: [
      '115°急屈曲部では直進導光モードの約22%が外角から漏洩するが、外角背面へ配置した反射率98%マイクロウェッジがハネ方向へ再結合。',
      '誘電体保護銀コートにより色温度シフト（ΔCCT < 10 K）を発生させず純白光を維持。',
    ],
    formula: {
      expression: 'η_corner = R_dielectric · cos²(Δθ/2) = 0.98 × 0.96 = 94.1%  (ハネ先端輝度比 ≥ 0.98)',
      description: '45°マイクロ反射ウェッジにより急屈曲ハネ部の輝度均一性を98%以上へ向上。',
    },
    nextGenInnovation: '書道「ハネ」形状の急屈曲導光損失をゼロ化する誘電体マイクロミラー。',
    specs: [
      { label: '反射面', value: '保護銀＋誘電体多層膜 (R ≥ 98% @ 420–680 nm)' },
      { label: '配置位置', value: 'KO_TOP 右上屈曲外角背面' },
      { label: '輝度改善', value: 'ハネ先端輝度 +20% 向上' },
    ],
    references: [
      'Thorlabs Inc., "Protected Silver Mirror Reflectance & Angle-of-Incidence Data (400–700 nm)"',
      'Chaves, J., "Introduction to Nonimaging Optics", 2nd Ed., CRC Press (Lightguide Bend Coupling)',
      'ISO 9211-4 Optical Coatings — Durability of Dielectric Protected Reflective Layers',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const wedge = new THREE.Mesh(
        new THREE.CylinderGeometry(1.35, 1.35, 0.36, 3).rotateX(Math.PI * 0.5),
        m.vipSilverFoil
      );
      wedge.position.set(11.0, 15.0, -5.82);
      wedge.rotation.z = 0.65;
      const mount = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 0.12), m.stainlessMachined);
      mount.position.set(11.0, 15.0, -6.06);
      mount.rotation.z = -0.55;
      g.add(wedge, mount);
      return g;
    },
  },
  {
    id: 'welcome-ko-eptfe-breather-desiccant',
    code: 'W232',
    order: 232,
    groupKey: 'glyph_ko',
    title: 'W232. 「こ」下画背面 IP68 疎水ePTFEブリーザー膜＆3Åゼオライト防曇パック',
    subtitle: 'Glyph "こ" Lower-Chamber IP68 ePTFE Breather Vent & 3Å Zeolite Anti-Fog Pack',
    category: '「こ」モジュール / 防曇・圧力平衡',
    swatchColor: '#f1f5f9',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [10, 4, -34],
    plainAnalogy: '「こ」の下側チャンバー内の湿気を取り除き、温度変化による内圧を逃がして長期間クリアな発光を保つ通気乾燥モジュールです。',
    summary: '「こ」下画（KO_BOT）背面中央へ実装されたIP68疎水ePTFE通気ベント＆3Åモレキュラーシーブ防曇パック。下画と石英連通孔経由の上画双方の湿度を統合制御します。',
    opticsAndPhysics: [
      '「こ」下画は台座熱源に最も近いため熱サイクル幅が大きく、ePTFE呼吸膜の差圧解放効果がIP65ガスケット寿命を3倍以上延長。',
      '3Åゼオライトが10年間分の微量透湿水分を吸収保持。',
    ],
    formula: {
      expression: 'm_H2O,10yr = P_wv · A_seal · t / d ≈ 14 mg  ≪  Capacity(3Å) = 95 mg',
      description: '10年分のガスケット透湿量に対し6.7倍の吸湿マージンを確保。',
    },
    nextGenInnovation: '10年メンテナンスフリー設計の3Åモレキュラーシーブ光学防曇パック。',
    specs: [
      { label: '通気膜', value: 'IP68 疎水ePTFE 0.2 μm' },
      { label: '吸湿余裕度', value: '10年透湿量の 6.7× 容量' },
      { label: '配置位置', value: 'KO_BOT 中央背面 (Z = -5.25 mm)' },
    ],
    references: [
      'W. L. Gore & Associates, "Long-Term Moisture Ingress Modeling in Sealed Luminaires"',
      'ASTM F1249 Water Vapor Transmission Rate Through Elastomeric Seals',
      'IEC 60529 IP65 / IP68 Enclosure Integrity & Pressure Equalization Guidelines',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => buildBreatherDesiccantPack(-0.5, -12.6, -5.85, m),
  },
  {
    id: 'welcome-ko-brass-datum-pins',
    code: 'W233',
    order: 233,
    groupKey: 'glyph_ko',
    title: 'W233. 「こ」下画ドック座面 C3604精密真鍮基準ノックピン＆アース接触座対',
    subtitle: 'Glyph "こ" Lower-Bar Dock C3604 Precision Brass Alignment Dowel Pins & Ground Pads',
    category: '「こ」モジュール / 基準位置決め・接地',
    swatchColor: '#d4a137',
    assembledPos: [CX_KO, 4, 0],
    explodeOffset: [10, 4, -34],
    plainAnalogy: '「こ」を台座に差し込む時のガタつきをゼロにしつつ、金属シャーシ同士を低抵抗でアース接続する真鍮の基準ピン対です。',
    summary: '「こ」下画底面近傍の背面締結フランジ両側へ設けたC3604真鍮精密ノックピン（Ø1.6 mm）＆金フラッシュ接地接触座対。位置精度とフレームグラウンド導通を同時確保します。',
    opticsAndPhysics: [
      '2点基準ピン間隔16 mmにより「こ」のヨー角誤差を±0.03°以内へ規制し、隣り合う「う」「そ」と完璧なベースライン整列を維持。',
      '真鍮ピン経由の低インピーダンス接地（< 5 mΩ）がESD 15 kV印加時の静電気放電を台座へ安全逃がし。',
    ],
    formula: {
      expression: 'Δψ_yaw = δ_pin / L_base = 0.008 mm / 16.0 mm = 0.029°   (R_gnd < 5 mΩ)',
      description: '16 mmスパンの真鍮2点基準ピンにより文字整列と低抵抗ESD接地を両立。',
    },
    nextGenInnovation: '光学ベンチ位置決めピンと低抵抗ESDフレーム接地の機能統合。',
    specs: [
      { label: '材質', value: 'C3604BD 快削真鍮 + Ni/Auフラッシュ' },
      { label: 'ヨー角精度', value: '±0.03° 以内' },
      { label: '接地抵抗', value: '< 5 mΩ (IEC 61000-4-2 15 kV ESD)' },
    ],
    references: [
      'ISO 8734 Parallel Pins of Unhardened & Precision Machined Metals',
      'IEC 61000-4-2 Electrostatic Discharge Immunity Test (±15 kV Air / ±8 kV Contact)',
      'JIS H 3250 C3604 Free-Cutting Brass Electrical & Mechanical Properties',
    ],
    diagramType: 'welcome_dock_pogo',
    build: (m) => {
      const g = new THREE.Group();
      const seg = qRadialSegs(10, 6);
      const pinGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.40, seg).rotateX(Math.PI * 0.5);
      for (const dx of [-8.0, 9.4]) {
        const p = new THREE.Mesh(pinGeo, m.brassPrecision);
        p.position.set(dx, -12.4, -5.85);
        g.add(p);
      }
      return g;
    },
  },

  // --- 「そ」モジュール (+4パーツ: W234 - W237) ---
  {
    id: 'welcome-so-prism-silver-backing',
    code: 'W234',
    order: 234,
    groupKey: 'glyph_so',
    title: 'W234. 「そ」Z字2鋭角プリズム背面 誘電体保護銀ミラー裏打ちクリップ対',
    subtitle: 'Glyph "そ" Z-Corner Dual 45° Prism Dielectric Silver-Mirror Backing Clips',
    category: '「そ」モジュール / 鋭角光学折返し',
    swatchColor: '#dbe4ee',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [28, 18, -34],
    plainAnalogy: '「そ」の上部の鋭いZ字カーブ2箇所にあるプリズムの裏側へ銀ミラー押え板を重ね、光が後ろへ逃げずに完璧に折れ曲がるようにする部品です。',
    summary: '「そ」Z字第1・第2鋭角部（W167/W168）の背面外角へ独立マウントされた保護銀ミラー裏打ち板＆SUS301定圧押えクリップ対。全反射臨界角外の大角度光線も回収します。',
    opticsAndPhysics: [
      'Z字37°鋭角折返しでは一部入射角がPMMA全反射臨界角42.2°を下回るため、背面独立ミラー裏打ちにより漏れ光を98%再利用。',
      'プリズム本体から0.3 mmの独立エアギャップ保持により全反射エバネッセント場を妨害せず複合反射を実現。',
    ],
    formula: {
      expression: 'θ_c = arcsin(1 / n_PMMA) = 42.2°  ⇒  TIR + R_Ag(98%) Hybrid Coupling η > 96%',
      description: '全反射と独立銀ミラー裏打ちのハイブリッド光学結合でZ字鋭角の暗点を完全解消。',
    },
    nextGenInnovation: 'エアギャップ維持型ハイブリッドTIR＋銀ミラー鋭角光学折返し機構。',
    specs: [
      { label: 'ミラー層', value: 'PVD純銀 + SiO₂保護膜 (R = 98%)' },
      { label: 'エアギャップ', value: '0.30 mm 非接触TIR保全配置' },
      { label: '実装箇所', value: 'Z1-Z2角 (+9.6,+21.4) & Z2-Z3角 (-13.2,+5.8) 背面' },
    ],
    references: [
      'Born, M. & Wolf, E., "Principles of Optics", 7th Ed., Cambridge (Frustrated TIR & Air-Gap Mirror Backing)',
      'Alanod MIRO-SILVER® Optical Reflector Specification (400–700 nm)',
      'Edmund Optics, "Right-Angle Prism Metallic vs Total Internal Reflection Application Note"',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const pts: Array<[number, number, number]> = [
        [9.6, 21.4, -0.6],
        [-13.2, 5.8, 0.6],
      ];
      for (const [px, py, rz] of pts) {
        const plate = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.2, 0.30), m.vipSilverFoil);
        plate.position.set(px, py, -5.80);
        plate.rotation.z = rz;
        const clip = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.75, 0.14), m.stainlessMachined);
        clip.position.set(px, py, -6.02);
        clip.rotation.z = rz;
        g.add(plate, clip);
      }
      return g;
    },
  },
  {
    id: 'welcome-so-joint-strain-keeper',
    code: 'W235',
    order: 235,
    groupKey: 'glyph_so',
    title: 'W235. 「そ」Z字〜椀部真鍮ジョイント(W171) ストレインリリーフ補強ブリッジキーパー',
    subtitle: 'Glyph "そ" Z-to-Bowl Brass Joint Strain-Relief Reinforcement Bridge Keeper',
    category: '「そ」モジュール / 構造補強・配線保護',
    swatchColor: '#98a2b0',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [28, 10, -34],
    plainAnalogy: '「そ」の上のZ字部分と下の丸いお椀部分を繋ぐくびれ首元を、後ろからステンレス補強板でがっちり挟み込んでたわみを防ぐ部品です。',
    summary: '「そ」の最大応力集中点であるZ3〜椀部くびれ接合（W171）背面へ締結されるSUS304高剛性ブリッジキーパー＆ポリイミドFPC保護押え。上部Z片持ち振動を抑制します。',
    opticsAndPhysics: [
      '「そ」は上部Z字が右側片持ち構造となるため首元に最大曲げ応力が集中するが、SUS304（E=193 GPa）背面キーパーにより曲げ剛性を+42%増強。',
      '同時にBtoB FPC（W172）の屈曲抜けを機械的にロック。',
    ],
    formula: {
      expression: 'EI_eff = EI_brass + E_SUS · I_keeper = 1.42 · EI_brass  ⇒  f_1st ↑ +19.2%',
      description: 'SUS304背面ブリッジキーパーにより首元曲げ剛性を42%向上し共振耐性を強化。',
    },
    nextGenInnovation: 'FPCロックと片持ち首元曲げ剛性強化を1部品で両立する複合キーパー。',
    specs: [
      { label: '材質', value: 'SUS304 精密レーザー曲げ (t = 0.8 mm)' },
      { label: '剛性向上', value: '首元曲げ剛性 +42% / 1次固有値 +19%' },
      { label: '配置位置', value: 'Z3-椀部くびれ背面 (X = +2.8, Y = +6.4, Z = -5.35)' },
    ],
    references: [
      'Timoshenko, S., "Strength of Materials", Vol. 1 (Composite Beam Flexural Rigidity EI)',
      'JIS G 4305 Cold-Rolled Stainless Steel Plate (SUS304 Youngs Modulus 193 GPa)',
      'IPC-2223E Sectional Design Standard for Flexible Printed Boards (Connector Strain Relief)',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const keeper = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.6, 0.32), m.stainlessMachined);
      keeper.position.set(2.8, 6.4, -5.92);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.8, 0.12), m.polyimideFpc);
      pad.position.set(2.8, 6.4, -5.70);
      g.add(keeper, pad);
      return g;
    },
  },
  {
    id: 'welcome-so-eptfe-breather-desiccant',
    code: 'W236',
    order: 236,
    groupKey: 'glyph_so',
    title: 'W236. 「そ」椀部背面 IP68 疎水ePTFEブリーザー膜＆3Åゼオライト防曇カートリッジ',
    subtitle: 'Glyph "そ" Bowl-Chamber IP68 ePTFE Breather Vent & 3Å Zeolite Anti-Fog Cartridge',
    category: '「そ」モジュール / 防曇・圧力平衡',
    swatchColor: '#f8fafc',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [29, 4, -34],
    plainAnalogy: '4文字すべてに統一装備された「そ」専用のゴアテックス通気膜＆防曇乾燥剤モジュールです。',
    summary: '「そ」下部椀部（SO_BOWL）背面へ配置されたIP68疎水ePTFE通気ベント＆3Åモレキュラーシーブ防曇カプセル。全4文字共通の環境耐性・露点-10°C以下仕様を完結します。',
    opticsAndPhysics: [
      '「そ」は全4文字中最大の総ストローク長（112 mm）と最大LED発熱量を持つため、ePTFE圧力均圧化がシール信頼性に不可欠。',
      '焼結316Lカプセル内の3Åゼオライトが熱呼吸で微流入する水蒸気を継続除去。',
    ],
    formula: {
      expression: 'V_so = 1.28 · V_ko  ⇒  Q_vent = 180 mL/min·cm² @ 7 kPa (IP68 ePTFE)',
      description: '最大容積「そ」筐体の熱呼吸圧をミリ秒応答で平衡化し防曇と気密を10年維持。',
    },
    nextGenInnovation: '全4文字統一IP68疎水ePTFE＋3Åゼオライト防曇アーキテクチャ。',
    specs: [
      { label: '通気膜', value: 'IP68 疎水ePTFE 0.2 μm' },
      { label: '乾燥剤', value: '3Å モレキュラーシーブ焼結316L容器' },
      { label: '配置位置', value: 'SO_BOWL 背面 (X = -6.0, Y = -11.4, Z = -5.25)' },
    ],
    references: [
      'W. L. Gore & Associates, "High-Airflow ePTFE Protective Vents for Large-Volume LED Housings"',
      'IEC 60529 IP68 Immersion & Thermal Shock Breathing Standard',
      'DIN 55473 Auxiliary Means of Packaging — Desiccant Bags & Molecular Sieve Sizing',
    ],
    diagramType: 'welcome_glyph_layer',
    build: (m) => buildBreatherDesiccantPack(-6.0, -11.4, -5.85, m),
  },
  {
    id: 'welcome-so-bowl-copper-bridge',
    code: 'W237',
    order: 237,
    groupKey: 'glyph_so',
    title: 'W237. 「そ」椀部背面 無酸素銅C1020 均熱サーマルブリッジプレート',
    subtitle: 'Glyph "そ" Bowl Rear OFHC C1020 Copper Thermal-Spreading Bridge Plate',
    category: '「そ」モジュール / 均熱放熱強化',
    swatchColor: '#d07447',
    assembledPos: [CX_SO, 4, 0],
    explodeOffset: [29, 4, -34],
    plainAnalogy: 'LEDの数が最も多い「そ」の熱が1か所に溜まらないよう、純銅プレートで横方向へ一気に広げて冷やす放熱ブリッジです。',
    summary: '「そ」下部椀部の大曲率背面へサーマルシート密着された無酸素銅C1020（398 W/m·K）均熱サーマルブリッジ。最大消費電力文字のホットスポット温度差を-6.5°C圧縮します。',
    opticsAndPhysics: [
      'AZ91Dマグネシウム背板（72 W/m·K）に対し5.5倍の熱伝導率を持つC1020純銅を並列積層し、面内熱抵抗を1/3.4へ低下。',
      '全4文字間のLED接合温度差を±1.5°C以内へ揃え、経年輝度劣化速度を完全均一化。',
    ],
    formula: {
      expression: 'R_spread = 1 / (k_Cu · t_Cu)  (k_Cu = 398 W/m·K ⇒ ΔT_hotspot = -6.5 °C)',
      description: 'C1020無酸素銅の面内均熱により4文字間の輝度寿命・色度均一性を完全同期。',
    },
    nextGenInnovation: 'マグネシウム背板×無酸素銅ハイブリッド均熱サーマルブリッジ。',
    specs: [
      { label: '材質', value: 'C1020 無酸素銅 (OFHC, 398 W/m·K)' },
      { label: '均熱効果', value: 'ホットスポット ΔT = -6.5 °C' },
      { label: '配置位置', value: 'SO_BOWL 下底背面 (X = +4.2, Y = -13.2, Z = -5.28)' },
    ],
    references: [
      'Copper Development Association, "C10200 Oxygen-Free Copper Thermal Conductivity Data"',
      'Incropera, F. P. et al., "Fundamentals of Heat and Mass Transfer", 8th Ed., Wiley (Spreading Resistance)',
      'IES TM-21-21 Projecting Long-Term Luminous Flux Maintenance of LED Light Sources',
    ],
    diagramType: 'welcome_led_thermal',
    build: (m) => {
      const g = new THREE.Group();
      const plate = new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.2, 0.32), m.copperHeatSpreader);
      plate.position.set(4.2, -13.2, -5.92);
      plate.rotation.z = 0.08;
      const tim = new THREE.Mesh(new THREE.BoxGeometry(9.2, 1.9, 0.12), m.thermalPadTim);
      tim.position.set(4.2, -13.2, -5.70);
      tim.rotation.z = 0.08;
      g.add(plate, tim);
      return g;
    },
  },
];

export function buildWelcomeGlyphPrecisionParts(mats: V2MaterialLibrary): CadPart[] {
  return buildExpansionCadParts(WELCOME_GLYPH_PRECISION_DEFS, mats);
}
