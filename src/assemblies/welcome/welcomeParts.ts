import * as THREE from 'three';
import { CadPart, PartExplanation } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import {
  buildDcDcInductorModule,
  buildDovetailMount,
  buildDowelPins,
  buildEmiShieldCan,
  buildFinnedBackplate,
  buildHexSocketBolts,
  buildHollowCncChassis,
  buildHollowPerimeterRing,
  buildKnurledRotaryDial,
  buildLedArrayOnMcpcb,
  buildLgpWaveguide,
  buildMiniPcbBoard,
  buildMlccPtcBank,
  buildOpticalCornerPrism,
  buildPlinthRoundedSlab,
  buildPogoPinBlock,
  buildQfnIcPackage,
  buildQuartzColumnPart,
  buildSteppedOpticalLens,
  buildUsbCPdReceptacle,
  buildWelcomeSpeakerUnit,
  buildZifConnectorAndFpc,
  CX_KO,
  CX_SO,
  CX_U,
  asStrokeList,
  createHollowTubeY,
  CX_YO,
  extrudeRibbonGeo,
  PlinthCutout,
  qualityLevel,
  RENDER_STROKE_MAP,
  StrokeId,
} from './welcomeGeometry';
import { scaleRadialSegmentsForQuality as qRadialSegs } from '../../core/geometry_quality';
import { enrichWelcomeDef, WelcomeDiagramType } from './welcomePartEnrichment';

export interface WelcomePartDef {
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
  readonly diagramType: WelcomeDiagramType;
  readonly build: (mats: V2MaterialLibrary) => THREE.Group;
}

type GlyphCharSpec = {
  readonly slug: 'yo' | 'u' | 'ko' | 'so';
  readonly charJa: string;
  readonly cx: number;
  readonly mainStroke: StrokeId;
  readonly mainW: number;
  readonly bayPos: readonly [number, number]; // local (x, y) inside glyph for internal PCB/electronics bay
  readonly bayVertical?: boolean;
  readonly dockX: number; // local x for dovetail/pogo dock at bottom of glyph
  readonly dockY: number; // local y at bottom of glyph
  readonly boltPts: ReadonlyArray<readonly [number, number, number]>;
  readonly pinPts: ReadonlyArray<readonly [number, number, number]>;
  readonly zifEnds: readonly [number, number, number, number];
};

function makeCharCoreParts(
  spec: GlyphCharSpec,
  startCode: number
): WelcomePartDef[] {
  const { slug, charJa, cx, mainStroke, mainW, bayPos, bayVertical = false, dockX, boltPts, pinPts, zifEnds } = spec;
  const strokes = RENDER_STROKE_MAP[mainStroke];
  const pts = strokes[0];
  const gk = `glyph_${slug}`;
  const expX = (cx / 66) * 26;
  const expY = 6;
  const [bx, by] = bayPos;
  const bayW = bayVertical ? 3.2 : 11.4;
  const bayH = bayVertical ? 11.4 : 3.2;
  const axX = bayVertical ? 0 : 1;
  const axY = bayVertical ? 1 : 0;
  const pxX = bayVertical ? 1 : 0;
  const pxY = bayVertical ? 0 : 1;
  const code = (offset: number) => `W${String(startCode + offset).padStart(2, '0')}`;
  const pos: readonly [number, number, number] = [cx, 4, 0];

  const defs: WelcomePartDef[] = [
    // +0: CNC Hollow Chassis
    {
      id: `welcome-${slug}-cnc-chassis`,
      code: code(0),
      groupKey: gk,
      title: `${code(0)}. 「${charJa}」主骨格 CNC6061アルミ肉抜きシャーシ`,
      subtitle: `Glyph "${charJa}" Hollow-Pocket CNC 6061-T6 Aluminum Structural Frame`,
      category: `「${charJa}」モジュール / 構造・放熱筐体`,
      swatchColor: '#364152',
      assembledPos: pos,
      explodeOffset: [expX, expY, 0],
      plainAnalogy: `「${charJa}」の内部基板・LED・導光板をすべて収める、アルミ塊から削り出した頑丈な骨格ケースです。`,
      summary: `A6061-T6アルミ合金ブロックを5軸CNC切削でポケット肉抜き加工した主構造体。内部補強リブとM2めねじボスを備え、LED発光熱を筐体全体へ均一拡散します。`,
      opticsAndPhysics: [
        '肉抜きポケット壁（板厚1.4mm）＋横断補強リブにより軽量化とねじり剛性を両立。',
        '熱伝導率 167 W/(m·K) の6061アルミがMCPCBからのLED発熱を背面フィンへ直接伝導。',
      ],
      formula: { expression: 'R_th = L / (k · A)', description: 'アルミ骨格の熱伝導抵抗（k=167 W/mK）を極小化しLEDジャンクション温度を65℃未満に維持。' },
      nextGenInnovation: '5軸同時CNCポケット加工により一体剛性と内部配線ダクトを無溶接で実現。',
      specs: [
        { label: '材質', value: 'A6061-T6 硬質アルマイト' },
        { label: '加工公差', value: '±0.02 mm (5軸CNC)' },
        { label: '熱伝導率', value: '167 W/(m·K)' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHollowCncChassis(strokes, mainW, 3.76, 0.28, m.welcomeCoreSlate, m.stainlessMachined),
    },
    // +1: AZ91D 3D Finned Magnesium Backplate
    {
      id: `welcome-${slug}-mg-finned-backplate`,
      code: code(1),
      groupKey: gk,
      title: `${code(1)}. 「${charJa}」背面 AZ91Dマグネシウム3D放熱フィンプレート`,
      subtitle: `Glyph "${charJa}" Rear AZ91D Magnesium 3D-Finned Heatsink Cover`,
      category: `「${charJa}」モジュール / 放熱・背面外装`,
      swatchColor: '#2a3446',
      assembledPos: pos,
      explodeOffset: [expX, expY, -34],
      plainAnalogy: `文字の裏側を密閉しながら、中のLEDが出す熱を細かい3Dフィンから空気中へ逃がす放熱フタです。`,
      summary: `チクソモールド成型のAZ91Dマグネシウム合金背面プレート。背面全面にストローク直交の3D放熱フィン列を備え、ファンレス無音で連続100%点灯の自然対流冷却を成立させます。`,
      opticsAndPhysics: [
        '3D立体放熱フィンにより背面表面積を約2.6倍へ拡張し、自然対流熱伝達を促進。',
        'マグネシウム特有の電磁遮蔽性により内部PWMドライバからの背面放射ノイズも減衰。',
      ],
      nextGenInnovation: '薄肉0.8mmチクソモールド成型による高アスペクト比3D放熱フィン一体造形。',
      specs: [
        { label: '材質', value: 'AZ91D マグネシウム合金' },
        { label: '冷却方式', value: 'ファンレス自然対流3Dフィン' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildFinnedBackplate(strokes, mainW * 0.96, -4.78, m.welcomeMagRear),
    },
    // +2: Stepped Sapphire Optical Diffuser Front Cover Lens
    {
      id: `welcome-${slug}-sapphire-diffuser-lens`,
      code: code(2),
      groupKey: gk,
      title: `${code(2)}. 「${charJa}」前面 段付きサファイア光学拡散カバーレンズ`,
      subtitle: `Glyph "${charJa}" Stepped Optical Sapphire Micro-Diffuser Front Lens`,
      category: `「${charJa}」モジュール / 光学出力面`,
      swatchColor: '#dbeafe',
      assembledPos: pos,
      explodeOffset: [expX, expY, 36],
      plainAnalogy: `LEDのまぶしい点光を、文字全体がムラなく上品に光るよう整えて表面を守る透明カバーレンズです。`,
      summary: `段付きフランジ嵌合とドーム状面取りを施した前面光学拡散カバー。表面AR反射防止コートと微細マット拡散構造により、明るい室内でも高コントラストな立体文字発光を実現します。`,
      opticsAndPhysics: [
        '段付き嵌合リップがIP65シリコーンOリングを均一圧縮し、ホコリや湿気の侵入を遮断。',
        'ランバート拡散プロファイルにより視野角170°の広い範囲で輝度低下を抑制。',
      ],
      nextGenInnovation: 'ナノインプリント拡散微細構造と低反射ARコートの複合光学カバー。',
      specs: [
        { label: '透過率', value: '93.5% (ARコート付)' },
        { label: '視野角', value: '170° 均一拡散' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildSteppedOpticalLens(strokes, mainW * 0.82, 3.52, m.welcomeTitaniumFace, m.stainlessMachined),
    },
    // +3: IP65 Silicone O-Ring Perimeter Gasket
    {
      id: `welcome-${slug}-ip65-silicone-gasket`,
      code: code(3),
      groupKey: gk,
      title: `${code(3)}. 「${charJa}」全周IP65 シリコーン防塵防滴Oリングガスケット`,
      subtitle: `Glyph "${charJa}" Full-Perimeter IP65 Silicone O-Ring Environmental Seal`,
      category: `「${charJa}」モジュール / 密閉・防塵防滴`,
      swatchColor: '#353840',
      assembledPos: pos,
      explodeOffset: [expX, expY, 26],
      plainAnalogy: `前面レンズとアルミ筐体のスキマをぐるっと一周ふさぎ、ホコリや湿気から内部基板を守るゴムパッキンです。`,
      summary: `筐体前面のCNCシール溝へ全周嵌合する硬度50Aシリコーンゴム製Oリング。結露や埃によるLED導光板の曇り・基板腐食を防ぎ、長期展示の信頼性を担保します。`,
      opticsAndPhysics: [
        '圧縮率22%の最適潰し代設計によりIP65相当の防塵・防噴流密閉を達成。',
        '耐UVシリコーン配合によりLED紫外線成分や太陽光による硬化劣化を防止。',
      ],
      nextGenInnovation: '一体射出成型エンドレスリングにより継ぎ目からの漏水リスクをゼロ化。',
      specs: [
        { label: '保護等級', value: 'IP65 相当' },
        { label: '硬度', value: 'Shore A 50' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHollowPerimeterRing(strokes, mainW * 0.98, mainW * 0.16, 0.32, 2.36, m.epdmGasket, 0.06),
    },
    // +4: Titanium CNC Edge Protection Flange Bezel
    {
      id: `welcome-${slug}-ti-protective-bezel`,
      code: code(4),
      groupKey: gk,
      title: `${code(4)}. 「${charJa}」外周 CNCチタン保護フランジベゼル`,
      subtitle: `Glyph "${charJa}" Grade-5 Titanium CNC Protective Rim Bezel`,
      category: `「${charJa}」モジュール / 外周構造・遮光`,
      swatchColor: '#cbd5e1',
      assembledPos: pos,
      explodeOffset: [expX, expY, 32],
      plainAnalogy: `レンズのフチをしっかり押さえ込み、側面への光漏れを防ぎつつ美しい金属輪郭を作るチタン枠です。`,
      summary: `64チタン（Ti-6Al-4V）から高精度削り出した外周フランジベゼル。前面レンズの機械的保持とエッジ部の不要な側面光漏れ（ハレーション）遮断を同時に担います。`,
      opticsAndPhysics: [
        '段付き遮光フランジが導光板側面からの迷光をカットし、文字輪郭をシャープに演出。',
        'チタンの高比強度により薄肉0.8mm幅でも衝撃変形を防止。',
      ],
      nextGenInnovation: '微細ビーズブラスト＋ダイヤモンド面取りによる精密光学機器仕上げ。',
      specs: [
        { label: '材質', value: 'Ti-6Al-4V (Grade 5)' },
        { label: '枠幅', value: '0.85 mm 精密フランジ' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHollowPerimeterRing(strokes, mainW * 1.02, mainW * 0.13, 1.02, 3.09, m.stainlessMachined, 0.08),
    },
    // +5: 98% Micro-Foamed PET Back Reflector Sheet
    {
      id: `welcome-${slug}-reflector-sheet`,
      code: code(5),
      groupKey: gk,
      title: `${code(5)}. 「${charJa}」98%高反射 マイクロ発泡PET背面反射シート`,
      subtitle: `Glyph "${charJa}" 98% High-Reflectance Micro-Foamed PET Back Reflector`,
      category: `「${charJa}」モジュール / 光学導光系`,
      swatchColor: '#f1f5f9',
      assembledPos: pos,
      explodeOffset: [expX, expY, 8],
      plainAnalogy: `LEDの後ろ側へ逃げる光を98%前へ跳ね返し、少ない電力でも文字を明るく光らせる白い鏡シートです。`,
      summary: `導光板背面に密着配置される超微細発泡PET反射フィルム。内部の無数のマイクロ気泡界面での多重散乱により可視光全域で98%以上の拡散反射率を発揮します。`,
      opticsAndPhysics: [
        '背面損失光を正面側へリサイクルすることで、同一輝度あたりのLED消費電力を約35%削減。',
      ],
      nextGenInnovation: '非銀蒸着の純白ポリマー発泡構造により硫化変色せず10万時間高反射を維持。',
      specs: [
        { label: '拡散反射率', value: '98.2% (400–700nm)' },
        { label: '厚さ', value: '0.25 mm' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(extrudeRibbonGeo(pts, mainW * 0.55, 0.26, 0.31, 0, 20, 0), m.pztCeramic));
        return g;
      },
    },
    // +6: Laser-Dot PMMA Light Guide Plate (LGP)
    {
      id: `welcome-${slug}-pmma-lgp-waveguide`,
      code: code(6),
      groupKey: gk,
      title: `${code(6)}. 「${charJa}」レーザー微細ドット PMMA光学導光板 (LGP)`,
      subtitle: `Glyph "${charJa}" Laser-Microdot PMMA Optical Light Guide Plate`,
      category: `「${charJa}」モジュール / 光学導光系`,
      swatchColor: '#60a5fa',
      assembledPos: pos,
      explodeOffset: [expX, expY, 13],
      plainAnalogy: `端から入れたLED光を文字の形いっぱいにムラなく行き渡らせる、精密加工された透明アクリル導光プレートです。`,
      summary: `光学グレードPMMA（屈折率 n=1.49）にCO₂レーザー微細拡散ドットパターンと3Dプリズム溝を刻んだ導光板。全反射（TIR）で伝播した光を距離に応じたドット密度で均一取り出しします。`,
      opticsAndPhysics: [
        'スネルの法則による臨界角 θ_c = arcsin(1/1.49) ≈ 42.1° 以上の光線を内部全反射で遠端まで輸送。',
        'LED近傍は低密度・遠端は高密度の非線形ドット配置により輝度均一性92%以上を実現。',
      ],
      formula: { expression: 'θ_c = arcsin(1 / n_PMMA) ≈ 42.1°', description: '全反射条件を満たす導光板内で光を低損失伝播させ、微細ドットで正面へ均一射出。' },
      nextGenInnovation: '3D自由曲線ストロークに最適化した可変密度レーザーマイクロドット設計。',
      specs: [
        { label: '屈折率', value: 'n_d = 1.491 (光学PMMA)' },
        { label: '輝度均一性', value: '≥ 92%' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildLgpWaveguide(strokes, mainW * 0.55, 1.05, m.welcomeOpticalEd),
    },
    // +7: BEF Micro-Prism Brightness Enhancement Film
    {
      id: `welcome-${slug}-bef-prism-film`,
      code: code(7),
      groupKey: gk,
      title: `${code(7)}. 「${charJa}」マイクロプリズム集光シート (BEF)`,
      subtitle: `Glyph "${charJa}" Micro-Prism Brightness Enhancement Film (BEF)`,
      category: `「${charJa}」モジュール / 光学導光系`,
      swatchColor: '#93c5fd',
      assembledPos: pos,
      explodeOffset: [expX, expY, 20],
      plainAnalogy: `斜めへ逃げる光を正面へ集め直し、同じ電池持ちでも見た目の明るさを1.5倍以上に高める光学フィルムです。`,
      summary: `導光板と前面レンズの間に積層する頂角90°マイクロプリズム配列シート。臨界角外の光を正面方向へ屈折集光しつつ、広角成分を背面反射シートへ戻して再利用します。`,
      opticsAndPhysics: [
        '正面軸上輝度を約1.55倍にブーストし、昼間の明るい玄関や展示室でも明瞭な視認性を確保。',
      ],
      nextGenInnovation: 'ピッチ24μmの無モアレ高精細マイクロプリズム光学フィルム。',
      specs: [
        { label: '輝度ゲイン', value: '1.55× (正面軸上)' },
        { label: 'プリズム頂角', value: '90° 精密配列' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(extrudeRibbonGeo(pts, mainW * 0.55, 0.30, 1.81, 0, 20, 0), m.microlensGlass));
        return g;
      },
    },
    // +8: Aluminum-Core MCPCB LED Substrate
    {
      id: `welcome-${slug}-led-mcpcb`,
      code: code(8),
      groupKey: gk,
      title: `${code(8)}. 「${charJa}」金属コア高放熱アルミ MCPCB 基板`,
      subtitle: `Glyph "${charJa}" Metal-Core Aluminum MCPCB LED Circuit Strip`,
      category: `「${charJa}」モジュール / 発光回路基板`,
      swatchColor: '#1b5e47',
      assembledPos: pos,
      explodeOffset: [expX, expY, -4],
      plainAnalogy: `LEDチップが熱くならないように、熱をよく逃がすアルミ板をベースにした専用の発光回路基板です。`,
      summary: `高熱伝導絶縁層（2.2 W/mK）とアルミベース板を積層した金属コアプリント基板（MCPCB）。ストローク曲線に沿って精密ルーター加工され、LED配列の電源・PWM配線を担います。`,
      opticsAndPhysics: [
        '通常のFR-4基板に比べ熱抵抗を約1/8へ低減し、LED寿命（L70 > 60,000時間）を保証。',
      ],
      nextGenInnovation: '2oz厚銅パターンと高反射ホワイトソルダーレジストによる低損失・高効率実装。',
      specs: [
        { label: '基板熱伝導率', value: '2.2 W/(m·K) MCPCB' },
        { label: '銅箔厚', value: '70 μm (2 oz)' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(extrudeRibbonGeo(pts, mainW * 0.62, 0.50, -0.75, 0.04, 20, 0), m.sensorPcb));
        return g;
      },
    },
    // +9: CRI97 2835 Micro-LED Chip Array
    {
      id: `welcome-${slug}-led-chip-array`,
      code: code(9),
      groupKey: gk,
      title: `${code(9)}. 「${charJa}」高演色CRI97 2835マイクロLED発光アレイ`,
      subtitle: `Glyph "${charJa}" High-CRI 97 2835 Micro-LED Emitter Array`,
      category: `「${charJa}」モジュール / 発光光源`,
      swatchColor: '#fbbf24',
      assembledPos: pos,
      explodeOffset: [expX, expY, 4],
      plainAnalogy: `文字を内側から鮮やかに照らし出す、小さな高効率LED電球チップを曲線沿いにずらっと並べた心臓部です。`,
      summary: `赤色KSF蛍光体を採用した高演色Ra97・2835パッケージLED群をMCPCB上へ等間隔実装。色温度5000Kの純白光を高効率185 lm/Wで放射し、導光板へ均一入射します。`,
      opticsAndPhysics: [
        '定電流PWM駆動により調光0.5%〜100%の全領域で色度シフト Δu\'v\' < 0.002 を維持。',
      ],
      nextGenInnovation: 'フリッカーフリー32kHz PWM対応の狭ビン選別高演色マイクロLEDアレイ。',
      specs: [
        { label: '演色性', value: 'CRI Ra 97 (R9 > 90)' },
        { label: '発光効率', value: '185 lm/W' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildLedArrayOnMcpcb(strokes, mainW * 0.58, -0.18, m, true),
    },
    // +10: Silicone Thermal Gap Pad
    {
      id: `welcome-${slug}-thermal-gap-pad`,
      code: code(10),
      groupKey: gk,
      title: `${code(10)}. 「${charJa}」高熱伝導 サーマルギャップパッド熱橋シート`,
      subtitle: `Glyph "${charJa}" High-Conductivity Silicone Thermal Interface Gap Pad`,
      category: `「${charJa}」モジュール / 熱設計・TIM`,
      swatchColor: '#7aa4b8',
      assembledPos: pos,
      explodeOffset: [expX, expY, -8],
      plainAnalogy: `LED基板とアルミ筐体の微細なすき間をピッタリ埋めて、熱をスムーズに逃がす柔らかい放熱シートです。`,
      summary: `窒化ホウ素フィラー配合の熱伝導率 6.0 W/(m·K) 軟質シリコーンTIMシート。LED基板裏面とCNCアルミシャーシ間の空気層を排除し、熱抵抗を大幅に低減します。`,
      opticsAndPhysics: [
        '空気（0.026 W/mK）を熱伝導パッド（6.0 W/mK）で置換し、接触熱抵抗を95%以上削減。',
      ],
      nextGenInnovation: '非シリコーンブリード処方により近傍光学レンズへのシロキサン曇りを完全防止。',
      specs: [
        { label: '熱伝導率', value: '6.0 W/(m·K)' },
        { label: '絶縁耐圧', value: '12 kV/mm' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(extrudeRibbonGeo(pts, mainW * 0.60, 0.22, -1.17, 0, 20, 0), m.thermalPadTim));
        return g;
      },
    },
    // +11: 4-Layer Local Driver Control PCB
    {
      id: `welcome-${slug}-local-driver-pcb`,
      code: code(11),
      groupKey: gk,
      title: `${code(11)}. 「${charJa}」4層FR-4 ローカル制御ドライバー基板`,
      subtitle: `Glyph "${charJa}" 4-Layer FR-4 Local LED Driver & Node Control PCB`,
      category: `「${charJa}」モジュール / 電子制御基板`,
      swatchColor: '#15803d',
      assembledPos: pos,
      explodeOffset: [expX, expY, -18],
      plainAnalogy: `「${charJa}」1文字の明るさや光り方のアニメーションを自律的にコントロールする専用の頭脳基板です。`,
      summary: `文字背面ポケット内へ収容される4層FR-4制御基板。内層に全面GNDプレーンと12V電源プレーンを配し、CAN-FD通信・定電流PWM・温度監視回路を一体実装します。`,
      opticsAndPhysics: [
        '4層インピーダンス整合（120Ω差動）によりCAN-FD 5Mbps通信のノイズ耐性を確保。',
      ],
      nextGenInnovation: 'ENIG無電解ニッケル金めっき仕上げによる高信頼BGA/QFN実装。',
      specs: [
        { label: '層構成', value: '4層 FR-4 Tg170' },
        { label: '通信バス', value: 'CAN-FD 5 Mbps' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildMiniPcbBoard(bayW, bayH, 0.54, bx, by, -2.53, m),
    },
    // +12: 16-bit PWM Constant-Current Driver IC + Node MCU
    {
      id: `welcome-${slug}-pwm-driver-mcu`,
      code: code(12),
      groupKey: gk,
      title: `${code(12)}. 「${charJa}」16bit PWM定電流LEDドライバIC＆ノードMCU`,
      subtitle: `Glyph "${charJa}" 16-Bit PWM Constant-Current Driver IC & ARM Node MCU`,
      category: `「${charJa}」モジュール / 半導体IC`,
      swatchColor: '#1d2026',
      assembledPos: pos,
      explodeOffset: [expX, expY, -22],
      plainAnalogy: `人間の目にはチラつきゼロで、65,536段階のなめらかな明るさ調整とウェーブ点灯を実行する半導体チップです。`,
      summary: `16bit解像度・32kHz高周波PWM定電流ドライバICと32bit ARM Cortex-M0+ノードMCUのQFN実装ペア。台座からのCAN-FD指令を受け取り、高精度ガンマ補正点灯を実行します。`,
      opticsAndPhysics: [
        '32kHz PWM周波数によりスマホカメラやミラーレス1/8000s撮影でもフリッカー縞が一切写り込みません。',
      ],
      formula: { expression: 'I_out = (1.24V / R_IREF) × 31.5', description: '外付け高精度抵抗で定電流値を決定し、電源電圧変動下でも一定輝度を保持。' },
      nextGenInnovation: '内蔵65,536階調CIE1931知覚ガンマ補間による極滑らかフェード制御。',
      specs: [
        { label: '調光解像度', value: '16-bit (65,536階調)' },
        { label: 'PWM周波数', value: '32 kHz フリッカーフリー' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        g.add(buildQfnIcPackage(1.65, 1.65, 0.48, bx - 0.95 * axX, by - 0.95 * axY, -3.16, m));
        g.add(buildQfnIcPackage(1.45, 1.45, 0.46, bx + 0.85 * axX, by + 0.85 * axY, -3.16, m));
        return g;
      },
    },
    // +13: Gold Spring Pogo-Pin Dock Contact Block
    {
      id: `welcome-${slug}-pogo-contact-block`,
      code: code(13),
      groupKey: gk,
      title: `${code(13)}. 「${charJa}」金メッキスプリング式ポゴピン受電・通信接点`,
      subtitle: `Glyph "${charJa}" 6-Pin Gold-Plated Spring Pogo-Pin Power & CAN-FD Contact`,
      category: `「${charJa}」モジュール / 着脱電気接点`,
      swatchColor: '#e2b648',
      assembledPos: pos,
      explodeOffset: [0, 1, 0],
      plainAnalogy: `文字を台座へカチッと挿し込むだけで、ハンダ付けや配線なしで電気と信号が自動接続されるバネ式金接点です。`,
      summary: `LCP耐熱樹脂キャリアに6本の伸縮金メッキポゴピン（+12V×2・GND×2・CANH・CANL）を内蔵。台座側パッドへ0.8Nの接点圧で密着し、着脱メンテと低抵抗給電を実現します。`,
      opticsAndPhysics: [
        'Au 0.5μm厚めっき＋りん青銅スプリングにより接触抵抗 < 25 mΩ・着脱耐久50,000回。',
      ],
      nextGenInnovation: '電源先行接続・信号遅延接続のシーケンス長差ピンによる活線挿抜保護。',
      specs: [
        { label: '定格電流', value: '3.0 A / ピン (12V系統)' },
        { label: '接触抵抗', value: '< 25 mΩ' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildPogoPinBlock(dockX, -17.26, 0, m, false),
    },
    // +14: Synchronous Buck DC-DC & Shielded Power Inductor
    {
      id: `welcome-${slug}-dcdc-power-stage`,
      code: code(14),
      groupKey: gk,
      title: `${code(14)}. 「${charJa}」同期整流DC-DC降圧コンバータ＆シールドインダクタ`,
      subtitle: `Glyph "${charJa}" Synchronous Buck DC-DC Converter & Shielded Power Inductor`,
      category: `「${charJa}」モジュール / 電源回路`,
      swatchColor: '#c97643',
      assembledPos: pos,
      explodeOffset: [expX, expY, -22],
      plainAnalogy: `台座から届く12Vの電気を、LEDとマイコンが使う安定した5V・3.3Vへ高効率に変換する小型変圧器です。`,
      summary: `閉磁路シールドインダクタと同期整流降圧レギュレータで構成されるローカル電源段。変換効率94%で発熱を抑えつつ、MCU・LEDドライバへ低リップル電源を供給します。`,
      opticsAndPhysics: [
        '閉磁路フェライトコアが漏れ磁束を封じ込め、近傍CAN-FD信号線への誘導ノイズを抑制。',
      ],
      nextGenInnovation: '1.8MHz高速スイッチングによる超小型・高効率降圧パワーモジュール。',
      specs: [
        { label: '変換効率', value: '94.2% (12V → 3.8V/3.3V)' },
        { label: '出力リップル', value: '< 15 mVpp' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildDcDcInductorModule(bx - 3.55 * axX, by - 3.55 * axY, -3.18, m, bayVertical),
    },
    // +15: PTC Resettable Fuse & MLCC Decoupling Bank
    {
      id: `welcome-${slug}-ptc-mlcc-bank`,
      code: code(15),
      groupKey: gk,
      title: `${code(15)}. 「${charJa}」リセッタブルPTCヒューズ＆積層セラミックコンデンサ群`,
      subtitle: `Glyph "${charJa}" Resettable PTC Overcurrent Fuse & MLCC Decoupling Array`,
      category: `「${charJa}」モジュール / 電源保護・平滑`,
      swatchColor: '#9c7b58',
      assembledPos: pos,
      explodeOffset: [expX, expY, -22],
      plainAnalogy: `ショート時に自動で電気を遮断する復帰ヒューズと、LED点滅時の電圧ブレを吸収する貯水池コンデンサ群です。`,
      summary: `過電流保護用ポリマーPTCヒューズとX7R特性MLCCデカップリングコンデンサ群。PWMスイッチング瞬間のパルス電流を至近距離から供給し、電源ラインのリンギングを抑制します。`,
      opticsAndPhysics: [
        '並列多値MLCC（10μF+0.1μF）により低周波から100MHz帯まで低インピーダンス平滑化。',
      ],
      nextGenInnovation: '車載AEC-Q200準拠のソフトターミネーション耐基板たわみMLCC採用。',
      specs: [
        { label: '遮断電流', value: '1.5 A 自動復帰PTC' },
        { label: '静電容量', value: '10 μF × 4 + 0.1 μF × 4' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildMlccPtcBank(bx + 3.35 * axX, by + 3.35 * axY, -3.14, 2, m, bayVertical),
    },
    // +16: ESD TVS Diode Array & EMI Filter
    {
      id: `welcome-${slug}-tvs-esd-protection`,
      code: code(16),
      groupKey: gk,
      title: `${code(16)}. 「${charJa}」静電気±15kV保護 TVSダイオードアレイ＆EMIフィルタ`,
      subtitle: `Glyph "${charJa}" ±15kV ESD TVS Protection Diode Array & Common-Mode Filter`,
      category: `「${charJa}」モジュール / 静電気・EMC保護`,
      swatchColor: '#475569',
      assembledPos: pos,
      explodeOffset: [expX, expY, -22],
      plainAnalogy: `冬場に指で文字へ触れてバチッと静電気が起きても、内部の精密ICが壊れないよう逃がす避雷針部品です。`,
      summary: `ポゴピン入力直後に配置される超低容量TVSダイオードとコモンモードチョーク。IEC 61000-4-2 ±15kV気中放電サージをナノ秒未満でクランプし、CAN-FD通信障害を防ぎます。`,
      opticsAndPhysics: [
        '接合容量 0.4pF以下の超低容量TVSにより5Mbps差動信号波形を劣化させずESD保護。',
      ],
      nextGenInnovation: 'スナップバック型TVSクランプによる低残留電圧サージ吸収。',
      specs: [
        { label: 'ESD耐量', value: '±15 kV 気中 / ±8 kV 接触' },
        { label: '応答時間', value: '< 0.5 ns' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        const tvs = new THREE.Mesh(
          new THREE.BoxGeometry(bayVertical ? 0.60 : 0.85, bayVertical ? 0.85 : 0.60, 0.42),
          m.icEpoxy
        );
        tvs.position.set(bx + 4.95 * axX - 0.62 * pxX, by + 4.95 * axY - 0.62 * pxY, -3.14);
        const cmc = new THREE.Mesh(
          new THREE.BoxGeometry(bayVertical ? 0.60 : 0.85, bayVertical ? 0.85 : 0.60, 0.44),
          m.welcomeCoreMid
        );
        cmc.position.set(bx + 4.95 * axX + 0.62 * pxX, by + 4.95 * axY + 0.62 * pxY, -3.14);
        const wire = new THREE.Mesh(
          new THREE.BoxGeometry(bayVertical ? 0.28 : 0.64, bayVertical ? 0.64 : 0.28, 0.48),
          m.copperCoil
        );
        wire.position.set(bx + 4.95 * axX + 0.62 * pxX, by + 4.95 * axY + 0.62 * pxY, -3.14);
        g.add(tvs, cmc, wire);
        return g;
      },
    },
    // +17: NTC Overheat Thermistor Sensor
    {
      id: `welcome-${slug}-ntc-thermistor`,
      code: code(17),
      groupKey: gk,
      title: `${code(17)}. 「${charJa}」過熱保護 NTCサーミスタ温度監視センサー`,
      subtitle: `Glyph "${charJa}" Precision NTC Thermistor Thermal Protection Sensor`,
      category: `「${charJa}」モジュール / 熱安全監視`,
      swatchColor: '#b45309',
      assembledPos: pos,
      explodeOffset: [expX, expY, -22],
      plainAnalogy: `LEDや基板が熱くなりすぎないか常時見守り、夏場の高温環境では自動で電流を絞って安全を守る体温計です。`,
      summary: `MCPCB熱流直下に密着配置される10kΩ±1% NTCサーミスタ。MCU内蔵ADCが10Hzで温度計測し、筐体60℃超で滑らかにPWM電流をディレーティング制御します。`,
      opticsAndPhysics: [
        'B定数3435Kの急峻な抵抗-温度特性により ±0.4℃ の高精度リアルタイム温度検出を実現。',
      ],
      formula: { expression: 'R(T) = R_0 · exp(B · (1/T − 1/T_0))', description: 'NTCサーミスタの指数関数的抵抗変化からLED基板温度をリアルタイム算出。' },
      nextGenInnovation: 'ヒステリシス付きソフトディレーティングにより輝度急変なく安全温度を維持。',
      specs: [
        { label: '公称抵抗', value: '10 kΩ ±1% (25°C)' },
        { label: '保護開始温度', value: '60°C 自動ディレーティング' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        const bead = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), m.copperCoil);
        bead.position.set(bx + 2.30 * axX + 1.08 * pxX, by + 2.30 * axY + 1.08 * pxY, -3.22);
        const pad = new THREE.Mesh(
          new THREE.BoxGeometry(bayVertical ? 0.56 : 0.82, bayVertical ? 0.82 : 0.56, 0.22),
          m.silverElectrode
        );
        pad.position.set(bx + 2.30 * axX + 1.08 * pxX, by + 2.30 * axY + 1.08 * pxY, -3.02);
        g.add(bead, pad);
        return g;
      },
    },
    // +18: Luminance Feedback Photodiode Sensor
    {
      id: `welcome-${slug}-luminance-photodiode`,
      code: code(18),
      groupKey: gk,
      title: `${code(18)}. 「${charJa}」光学輝度フィードバック・シリコンフォトダイオード`,
      subtitle: `Glyph "${charJa}" Closed-Loop Optical Luminance Feedback Photodiode`,
      category: `「${charJa}」モジュール / 光学計測`,
      swatchColor: '#0e94c8',
      assembledPos: pos,
      explodeOffset: [expX, expY, 28],
      plainAnalogy: `文字自身の光り具合を内側から監視し、経年変化や温度で暗くなっても自動で4文字の明るさをピタッと揃える光センサーです。`,
      summary: `導光板の側面漏れ光をサンプリングする視感度補正シリコンフォトダイオード。4文字間の輝度バラツキを閉ループ補正し、出荷時と同じ均一な「ようこそ」発光を長期維持します。`,
      opticsAndPhysics: [
        '人間の目の視感度曲線 V(λ) に近似した光学フィルタ内蔵により正確な知覚輝度計測を実現。',
      ],
      nextGenInnovation: '4文字自律キャリブレーションによる10年無調整の色・輝度マッチング。',
      specs: [
        { label: 'ピーク感度波長', value: '555 nm (視感度一致)' },
        { label: '輝度制御誤差', value: '±1.5% 以内' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        const pkg = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, 0.54), m.pztCeramic);
        pkg.position.set(bx + 0.8 * axX, by + 0.8 * axY, 2.35);
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.78, 0.18), m.irCutGlass);
        win.position.set(bx + 0.8 * axX, by + 0.8 * axY, 2.74);
        g.add(pkg, win);
        return g;
      },
    },
    // +19: Nickel-Plated EMI Shield Can
    {
      id: `welcome-${slug}-emi-shield-can`,
      code: code(19),
      groupKey: gk,
      title: `${code(19)}. 「${charJa}」ニッケルめっき洋白 EMI電磁遮蔽シールド缶`,
      subtitle: `Glyph "${charJa}" Nickel-Silver Stamped EMI/RFI Shielding Can`,
      category: `「${charJa}」モジュール / 電磁遮蔽`,
      swatchColor: '#94a3b8',
      assembledPos: pos,
      explodeOffset: [expX, expY, -26],
      plainAnalogy: `基板の高速スイッチング電波が外へ漏れてWi-Fiや無線機器にノイズを出さないよう覆う金属カバーです。`,
      summary: `ローカル制御基板上のDC-DCコンバータとPWMドライバICを覆う洋白（Cu-Ni-Zn）製EMIシールド缶。4辺GNDフレームへ全周接地し、FCC/VCCI Class B放射エミッション基準を満たします。`,
      opticsAndPhysics: [
        '表皮効果による反射・吸収損失で30MHz〜1GHz帯の不要輻射を 28 dB 以上減衰。',
      ],
      nextGenInnovation: 'スナップフィット2ピース構造によりリワーク保守性と密着シールド性を両立。',
      specs: [
        { label: '材質', value: 'C7521 洋白 (0.25mm厚)' },
        { label: '遮蔽効果', value: '> 28 dB (30MHz–1GHz)' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildEmiShieldCan(bayW + 0.4, bayH + 0.4, 1.06, bx, by, -3.39, m.midPlateSteel, '-z'),
    },
    // +20: Internal Polyimide FPC & 10-Pin ZIF Lock Connector
    {
      id: `welcome-${slug}-internal-fpc-zif`,
      code: code(20),
      groupKey: gk,
      title: `${code(20)}. 「${charJa}」内部ポリイミドFPCフレキ＆10ピンZIFロックコネクタ`,
      subtitle: `Glyph "${charJa}" Polyimide FPC Ribbon & 0.5mm-Pitch ZIF Lock Connector`,
      category: `「${charJa}」モジュール / 内部配線接続`,
      swatchColor: '#c76414',
      assembledPos: pos,
      explodeOffset: [expX, expY, -14],
      plainAnalogy: `制御基板とLED発光基板を省スペースで確実に繋ぐ、しなやかなオレンジ色のフィルム配線とワンタッチロック端子です。`,
      summary: `耐熱ポリイミドFPCと0.5mmピッチ10極フリップロック式ZIFコネクタ。振動下でも抜け落ちない機械ロックレバーを備え、LED駆動電流とNTC/PDセンサー信号を一括伝送します。`,
      opticsAndPhysics: [
        '圧延焼鈍銅（RA銅）導体により狭い文字内部R曲面でも断線しない高屈曲耐久性を確保。',
      ],
      nextGenInnovation: 'フリップロックバックアクチュエータ式ZIFによる高耐振10極インターコネクト。',
      specs: [
        { label: '端子ピッチ', value: '0.5 mm × 10極 ZIF' },
        { label: '基材', value: 'ポリイミド 25 μm + RA銅' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildZifConnectorAndFpc(zifEnds[0], zifEnds[1], -1.94, zifEnds[2], zifEnds[3], -1.94, m, 'both', false),
    },
    // +21: CNC Dovetail Docking Mount Foot
    {
      id: `welcome-${slug}-dovetail-mount`,
      code: code(21),
      groupKey: gk,
      title: `${code(21)}. 「${charJa}」台座嵌合 CNCダブテール（蟻溝）ドッキングマウント`,
      subtitle: `Glyph "${charJa}" Precision CNC Dovetail Docking Foot & Alignment Rail`,
      category: `「${charJa}」モジュール / 機械着脱機構`,
      swatchColor: '#4b586e',
      assembledPos: pos,
      explodeOffset: [0, 4, 0],
      plainAnalogy: `台座のミゾにスライドさせてガッチリ固定でき、ガタつきゼロで文字を自立させる金属の台座ジョイントです。`,
      summary: `文字下端へ一体締結される台形断面（蟻溝・60°テーパ）CNCアルミドッキングフット。台座ソケットへ挿入するだけでX/Y/Z全方向の機械位置決めと転倒モーメント保持を完了します。`,
      opticsAndPhysics: [
        '60°蟻溝くさび効果により文字自重と衝撃荷重を台座マグネシウム骨格へ確実に伝達。',
      ],
      nextGenInnovation: '工具レス着脱と高精度アライメントを両立する工作機械準拠ダブテール規格。',
      specs: [
        { label: 'テーパ角', value: '60° CNCダブテール' },
        { label: '繰返し位置精度', value: '±0.03 mm' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildDovetailMount(dockX, -16.36, 0, 11.2, 1.30, 8.4, m, false),
    },
    // +22: Elastomer Anti-Vibration Isolation Bushing
    {
      id: `welcome-${slug}-antivib-bushing`,
      code: code(22),
      groupKey: gk,
      title: `${code(22)}. 「${charJa}」制振エラストマー防振アイソレーションブッシュ`,
      subtitle: `Glyph "${charJa}" Viscoelastic Elastomer Anti-Vibration Isolation Bushing`,
      category: `「${charJa}」モジュール / 防振・音響絶縁`,
      swatchColor: '#246eb9',
      assembledPos: pos,
      explodeOffset: [0, 2, 0],
      plainAnalogy: `台座のスピーカー音や机の振動が文字に伝わってビビリ音が出ないように吸収するクッションゴムです。`,
      summary: `ドッキングマウント座面へ挟み込む高減衰粘弾性エラストマーブッシュ。台座スピーカー再生時の共振鳴きと外部衝撃から文字内部の光学系・石英柱を守ります。`,
      opticsAndPhysics: [
        '損失係数 tan δ = 0.65 の高減衰配合により 80Hz–1.2kHz の構造共振ピークを -18 dB 低減。',
      ],
      nextGenInnovation: '音響共鳴キャンセル形状のデュアルリブ制振エラストマーパッド。',
      specs: [
        { label: '損失係数', value: 'tan δ = 0.65' },
        { label: '共振低減', value: '-18 dB' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        const bF = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.40, 2.0), m.antiVibRubber);
        bF.position.set(dockX, -17.24, 3.1);
        const bR = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.40, 2.0), m.antiVibRubber);
        bR.position.set(dockX, -17.24, -3.1);
        g.add(bF, bR);
        return g;
      },
    },
    // +23: Internal Black Anodized Optical Baffle Wall
    {
      id: `welcome-${slug}-optical-baffle`,
      code: code(23),
      groupKey: gk,
      title: `${code(23)}. 「${charJa}」内部迷光遮断 ブラックアルマイト光学バッフル隔壁`,
      subtitle: `Glyph "${charJa}" Matte-Black Anodized Internal Optical Stray-Light Baffle`,
      category: `「${charJa}」モジュール / 光学遮光機構`,
      swatchColor: '#202328',
      assembledPos: pos,
      explodeOffset: [expX, expY, 16],
      plainAnalogy: `文字のフチや基板のスキマから余計な光が漏れたり乱反射したりしないように仕切る、つや消し黒の遮光壁です。`,
      summary: `導光板外周と基板ポケット境界を分離する黒色無光沢アルマイト光学バッフル。反射率2%未満の微細マット面により不要な迷光・色滲みを徹底排除します。`,
      opticsAndPhysics: [
        '光学系キャビティと電子制御キャビティを光学的に完全分離し、LED光漏れによる誤検知を防止。',
      ],
      nextGenInnovation: 'カメラレンズ鏡筒と同等の低反射マイクロブラスト黒アルマイト処理。',
      specs: [
        { label: '表面反射率', value: '< 1.8% (可視光)' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHollowPerimeterRing(strokes, mainW * 0.71, mainW * 0.08, 1.90, 1.05, m.pyroGraphite, 0),
    },
    // +24: H7 Precision Ground Dowel Pins
    {
      id: `welcome-${slug}-dowel-pins`,
      code: code(24),
      groupKey: gk,
      title: `${code(24)}. 「${charJa}」精密位置決めノックピン群 (H7公差)`,
      subtitle: `Glyph "${charJa}" Precision H7-Tolerance Hardened Stainless Dowel Pins`,
      category: `「${charJa}」モジュール / 精密締結・位置決め`,
      swatchColor: '#d4a948',
      assembledPos: pos,
      explodeOffset: [expX, expY, -24],
      plainAnalogy: `前面カバー・導光板・アルミ骨格・背面フタを0.01mmのズレもなくピッタリ重ね合わせる精密ガイドピンです。`,
      summary: `焼入れSUS440C研削仕上げのφ2.0mm H7公差ノックピン群。組立・分解を繰り返しても光学導光板とLEDアレイの相対位置精度を±0.015mm以内に保証します。`,
      opticsAndPhysics: [
        'ボルトねじ部のクリアランスに頼らず純粋せん断ピンで位置決めする精密光学治具設計。',
      ],
      nextGenInnovation: '微小エア抜きフラット溝付きピンにより盲穴圧入時の空気圧縮を防止。',
      specs: [
        { label: '径公差', value: 'φ2.0 m6 / H7嵌合' },
        { label: '硬度', value: 'HRC 58 焼入れ研削' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildDowelPins(pinPts, 0.46, 2.20, m.brassGear, 'z'),
    },
    // +25: M2 Socket-Head Cap Bolts Array
    {
      id: `welcome-${slug}-m2-hex-bolts`,
      code: code(25),
      groupKey: gk,
      title: `${code(25)}. 「${charJa}」M2六角穴付ステンレス締結ボルト＆座金群`,
      subtitle: `Glyph "${charJa}" M2 Stainless Socket-Head Cap Screws & Brass Washers`,
      category: `「${charJa}」モジュール / 精密締結`,
      swatchColor: '#98a2b0',
      assembledPos: pos,
      explodeOffset: [expX, expY, -28],
      plainAnalogy: `文字のすべての層を背面から均等な力でしっかり締め上げ、IP65の防水密閉と放熱密着を完成させる精密六角ボルトです。`,
      summary: `SUS304製M2×6mm六角穴付キャップボルトと真鍮平座金の締結群。規定トルク0.28 N·mで締め付けることでOリング圧縮とサーマルパッド密着を同時達成します。`,
      opticsAndPhysics: [
        '均等ピッチ配置により背面マグネシウムプレートの反りを防ぎ、全面均一な熱接触圧を維持。',
      ],
      nextGenInnovation: 'ゆるみ止めマイクロカプセル塗布済み精密光学締結ファスナー。',
      specs: [
        { label: '規格', value: 'ISO 4762 M2 × 6 mm' },
        { label: '締付トルク', value: '0.28 N·m' },
      ],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHexSocketBolts(boltPts, 0.54, 2.20, m, 'z', -1),
    },
  ];
  return defs;
}

/**
 * Helper to create a compact, physically functional secondary stroke sub-assembly (10–16 parts)
 * so every branch/loop/crest/upper-stroke/Z-fold has its OWN real CNC frame, LED, LGP, cooling, optics, & connectors!
 */
function makeSubStrokeParts(opts: {
  slug: string;
  charJa: string;
  subLabel: string;
  subEn: string;
  cx: number;
  groupKey: string;
  stroke: StrokeId;
  halfW: number;
  startCode: number;
  expBias: readonly [number, number, number];
  cinnabarFront?: boolean;
  includeCopper?: boolean;
  boltPts: ReadonlyArray<readonly [number, number, number]>;
}): WelcomePartDef[] {
  const { slug, charJa, subLabel, subEn, cx, groupKey, stroke, halfW, startCode, expBias, cinnabarFront, includeCopper, boltPts } = opts;
  const strokes = RENDER_STROKE_MAP[stroke];
  const code = (o: number) => `W${String(startCode + o).padStart(2, '0')}`;
  const pos: readonly [number, number, number] = [cx, 4, 0];
  const [ex, ey, ez] = expBias;

  const list: WelcomePartDef[] = [
    {
      id: `welcome-${slug}-cnc-frame`,
      code: code(0),
      groupKey,
      title: `${code(0)}. 「${charJa}」${subLabel} CNC6061アルミ独立サブフレーム`,
      subtitle: `Glyph "${charJa}" ${subEn} Hollow CNC Aluminum Sub-Frame`,
      category: `「${charJa}」${subLabel} / 独立構造骨格`,
      swatchColor: '#364152',
      assembledPos: pos,
      explodeOffset: [ex, ey, ez],
      plainAnalogy: `「${charJa}」の${subLabel}を独立した精密パーツとして支えるアルミ削り出しフレームです。`,
      summary: `${subLabel}の光学・LED部品を収容する肉抜きCNCアルミ独立サブフレーム。主骨格と精密嵌合し、ストローク交差部の段差ゼロと高い剛性を実現します。`,
      opticsAndPhysics: ['独立サブフレーム分割により複雑な曲線ストロークでも高精度5軸CNC加工と容易なLED交換を実現。'],
      nextGenInnovation: '分割モジュール化による高歩留まりアルミCNC造形。',
      specs: [{ label: '材質', value: 'A6061-T6 CNC削り出し' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHollowCncChassis(strokes, halfW, 3.61, 0.255, m.welcomeCoreSlate, m.stainlessMachined),
    },
    {
      id: `welcome-${slug}-optical-front`,
      code: code(1),
      groupKey,
      title: `${code(1)}. 「${charJa}」${subLabel} ${cinnabarFront ? 'シナバー光学カラー導光レンズ' : '段付きサファイア拡散カバーレンズ'}`,
      subtitle: `Glyph "${charJa}" ${subEn} ${cinnabarFront ? 'Cinnabar Optical Color Waveguide Lens' : 'Stepped Sapphire Diffuser Cover Lens'}`,
      category: `「${charJa}」${subLabel} / 光学出力面`,
      swatchColor: cinnabarFront ? '#e65a28' : '#e2eaf4',
      assembledPos: pos,
      explodeOffset: [ex, ey, ez + 30],
      plainAnalogy: cinnabarFront
        ? `白色LEDの光を美しいソニーαシナバーオレンジへ光学変換して正面へ放つカラー導光レンズです。`
        : `${subLabel}のLED光をムラなく柔らかく広げて保護する前面サファイア拡散カバーです。`,
      summary: cinnabarFront
        ? `波長選択透過顔料を分散した光学グレードPMMA製シナバー導光カバー。段付き立体断面により正面・斜め双方へ鮮やかなアクセント発光を行います。`
        : `${subLabel}専用の段付き前面拡散カバーレンズ。主画と同一の光拡散特性・AR反射防止コートにより文字全体の一体発光を実現します。`,
      opticsAndPhysics: ['段付き3Dベベル断面によりエッジからの光取り出し効率と立体陰影を最大化。'],
      nextGenInnovation: '光学染料マスターバッチ均一分散による無塗装・高耐候カラー導光レンズ。',
      specs: [{ label: '光学特性', value: cinnabarFront ? 'ピーク透過 610 nm シナバー' : '透過率 93.5% ARコート' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildSteppedOpticalLens(strokes, halfW * 0.84, 3.38, cinnabarFront ? m.sonyAlphaCinnabar : m.welcomeTitaniumFace, m.stainlessMachined),
    },
    {
      id: `welcome-${slug}-led-mcpcb`,
      code: code(2),
      groupKey,
      title: `${code(2)}. 「${charJa}」${subLabel} アルミコアMCPCB＆CRI97 LEDアレイ`,
      subtitle: `Glyph "${charJa}" ${subEn} Metal-Core MCPCB & CRI97 Micro-LED Array`,
      category: `「${charJa}」${subLabel} / 発光エンジン`,
      swatchColor: '#fbbf24',
      assembledPos: pos,
      explodeOffset: [ex, ey, ez - 4],
      plainAnalogy: `${subLabel}専用の放熱アルミ基板に高演色LEDチップを並べた独立発光エンジンです。`,
      summary: `${subLabel}形状へ合わせた専用MCPCB上に2835マイクロLEDを実装。主画のローカルドライバICからFPC/導体経由で定電流PWM駆動され、輝度ムラなく点灯します。`,
      opticsAndPhysics: ['各サブストロークへ独立LEDを配置することで、枝部やループ先端での暗部発生を完全解消。'],
      nextGenInnovation: '曲線最適化MCPCBによるゼロデッドゾーン発光レイアウト。',
      specs: [{ label: '光源', value: 'CRI97 2835 LED / 32kHz PWM' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildLedArrayOnMcpcb(strokes, halfW * 0.64, -0.45, m, false),
    },
    {
      id: `welcome-${slug}-lgp-reflector`,
      code: code(3),
      groupKey,
      title: `${code(3)}. 「${charJa}」${subLabel} PMMA光学導光板(LGP)＆98%反射シート`,
      subtitle: `Glyph "${charJa}" ${subEn} PMMA Optical Waveguide (LGP) & 98% Reflector`,
      category: `「${charJa}」${subLabel} / 光学導光系`,
      swatchColor: '#60a5fa',
      assembledPos: pos,
      explodeOffset: [ex, ey, ez + 12],
      plainAnalogy: `${subLabel}のLED光を端から端まで均一に広げ、後ろへ逃げる光も反射して活かす光学シート層です。`,
      summary: `3Dマイクロプリズム拡散溝を刻んだPMMA導光板と98%マイクロ発泡反射シートの光学ユニット。小面積ストロークでもドット粒感ゼロの滑らかな面発光を生み出します。`,
      opticsAndPhysics: ['全反射導光＋高拡散反射により光利用効率88%以上を達成。'],
      nextGenInnovation: '超短光路専用マイクロプリズム導光パターン。',
      specs: [{ label: '光利用効率', value: '≥ 88%' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = buildLgpWaveguide(strokes, halfW * 0.64, 1.24, m.welcomeOpticalEd);
        for (const seg of asStrokeList(strokes)) {
          g.add(new THREE.Mesh(extrudeRibbonGeo(seg, halfW * 0.62, 0.22, 0.39, 0, 12, 0), m.pztCeramic));
        }
        return g;
      },
    },
    {
      id: `welcome-${slug}-rear-heatsink`,
      code: code(4),
      groupKey,
      title: `${code(4)}. 「${charJa}」${subLabel} 背面AZ91Dマグネシウム3Dフィン放熱カバー`,
      subtitle: `Glyph "${charJa}" ${subEn} Rear AZ91D Magnesium 3D-Finned Backplate`,
      category: `「${charJa}」${subLabel} / 放熱・背面外装`,
      swatchColor: '#2a3446',
      assembledPos: pos,
      explodeOffset: [ex, ey, ez - 32],
      plainAnalogy: `${subLabel}の裏面を塞ぎながら、立体フィンで熱を空気中へ逃がすマグネシウム製放熱カバーです。`,
      summary: `${subLabel}専用の3D冷却フィン付きAZ91Dマグネシウム背面カバー。内部LED基板からの熱をサーマルパッド経由で受け取り効率よく放散します。`,
      opticsAndPhysics: ['小型サブストロークでも独立放熱面積を確保し局所ホットスポットを防止。'],
      nextGenInnovation: 'チクソモールド一体3Dマイクロフィン放熱蓋。',
      specs: [{ label: '材質', value: 'AZ91D マグネシウム合金' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildFinnedBackplate(strokes, halfW * 0.94, -4.56, m.welcomeMagRear),
    },
    {
      id: `welcome-${slug}-ip65-gasket`,
      code: code(5),
      groupKey,
      title: `${code(5)}. 「${charJa}」${subLabel} IP65シリコーン防塵Oリング＆遮光バッフル`,
      subtitle: `Glyph "${charJa}" ${subEn} IP65 Silicone Environmental Gasket & Light Baffle`,
      category: `「${charJa}」${subLabel} / 密閉・遮光`,
      swatchColor: '#353840',
      assembledPos: pos,
      explodeOffset: [ex, ey, ez + 20],
      plainAnalogy: `${subLabel}のレンズ周囲を密閉してホコリと横漏れ光を同時に防ぐゴムパッキン＆黒色遮光リングです。`,
      summary: `シリコーン防塵Oリングと黒アルマイト迷光遮断リングの組み合わせ。湿気・粉塵侵入と隣接ストロークへの光滲みを同時にシャットアウトします。`,
      opticsAndPhysics: ['圧縮密閉シール＋低反射エッジ遮光により長期の光学クリーン度を維持。'],
      nextGenInnovation: '2色一体インサート成型シール＆遮光ガスケット。',
      specs: [{ label: '保護等級', value: 'IP65 相当' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHollowPerimeterRing(strokes, halfW * 0.96, halfW * 0.16, 0.32, 2.26, m.epdmGasket, 0.06),
    },
    {
      id: `welcome-${slug}-ti-retainer`,
      code: code(6),
      groupKey,
      title: `${code(6)}. 「${charJa}」${subLabel} チタンCNC保護ベゼル＆光学リテーナー`,
      subtitle: `Glyph "${charJa}" ${subEn} Grade-5 Titanium CNC Protective Rim Retainer`,
      category: `「${charJa}」${subLabel} / 外周保護`,
      swatchColor: '#cbd5e1',
      assembledPos: pos,
      explodeOffset: [ex, ey, ez + 26],
      plainAnalogy: `${subLabel}のレンズ外周を傷から守り、引き締まった金属エッジを作るチタン製枠パーツです。`,
      summary: `Ti-6Al-4V削り出しの外周リテーナーベゼル。前面レンズの脱落防止とエッジ剛性向上を担い、文字全体の精密機器クオリティを統一します。`,
      opticsAndPhysics: ['均一な外周面取りがスタジオ照明下でシャープな金属ハイライトを形成。'],
      nextGenInnovation: '精密CNC薄肉チタンプロテクター枠。',
      specs: [{ label: '材質', value: 'Ti-6Al-4V (Grade 5)' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHollowPerimeterRing(strokes, halfW * 1.01, halfW * 0.14, 0.96, 2.96, m.stainlessMachined, 0.08),
    },
    {
      id: `welcome-${slug}-bolts`,
      code: code(7),
      groupKey,
      title: `${code(7)}. 「${charJa}」${subLabel} M2六角穴付締結ボルト＆精密位置決めピン群`,
      subtitle: `Glyph "${charJa}" ${subEn} M2 Socket-Head Bolts & H7 Alignment Pins`,
      category: `「${charJa}」${subLabel} / 精密締結`,
      swatchColor: '#98a2b0',
      assembledPos: pos,
      explodeOffset: [ex, ey, ez - 24],
      plainAnalogy: `${subLabel}のフレーム・基板・放熱フタをガッチリ締め付けて固定する六角ボルトと位置決めピンです。`,
      summary: `SUS304 M2六角穴付ボルトと精密H7ノックピンの締結セット。振動・熱サイクル下でもOリング密閉力とサーマル密着を確実に保持します。`,
      opticsAndPhysics: ['均等締付圧により薄肉導光板への応力複屈折（光ムラ）発生を防止。'],
      nextGenInnovation: '低軸力ばらつき精密光学締結ファスナ。',
      specs: [{ label: '規格', value: 'M2 SUS304 六角穴付' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHexSocketBolts(boltPts, 0.50, 1.10, m, 'z', -1),
    },
  ];

  if (includeCopper) {
    list.push({
      id: `welcome-${slug}-copper-spreader`,
      code: code(8),
      groupKey,
      title: `${code(8)}. 「${charJa}」${subLabel} 無酸素銅サーマルスプレッダ＆ギャップパッド`,
      subtitle: `Glyph "${charJa}" ${subEn} Oxygen-Free Copper Heat Spreader & TIM Bridge`,
      category: `「${charJa}」${subLabel} / 放熱伝導`,
      swatchColor: '#d07447',
      assembledPos: pos,
      explodeOffset: [ex, ey, ez - 14],
      plainAnalogy: `LEDの熱をアルミの2倍以上のスピードで背面フィンへ橋渡しする純銅の放熱プレートです。`,
      summary: `熱伝導率 398 W/(m·K) のC1020無酸素銅ヒートスプレッダプレート。${subLabel}のLED発熱を瞬時に横方向へ拡散し、主骨格および背面フィンへ効率輸送します。`,
      opticsAndPhysics: ['高密度LED実装部の局所温度ピークを約11℃低減。'],
      nextGenInnovation: 'CNC曲げ成形C1020無酸素銅サーマルブリッジ。',
      specs: [{ label: '熱伝導率', value: '398 W/(m·K) C1020銅' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        for (const seg of asStrokeList(strokes)) {
          g.add(new THREE.Mesh(extrudeRibbonGeo(seg, halfW * 0.62, 0.65, -2.02, 0.04, 12, 0), m.copperHeatSpreader));
        }
        return g;
      },
    });
  }

  return list;
}

function buildAllWelcome216Defs(): readonly WelcomePartDef[] {
  const all: WelcomePartDef[] = [];

  // =========================================================================
  // 1. 「よ」モジュール — 42実機能パーツ (W01 - W42)
  // =========================================================================
  // W01 - W25 (25 core parts on YO_STEM)
  all.push(
    ...makeCharCoreParts(
      {
        slug: 'yo',
        charJa: 'よ',
        cx: CX_YO,
        mainStroke: 'yo_stem',
        mainW: 3.1,
        bayPos: [0.8, 5.5],
        bayVertical: true,
        dockX: -3.5,
        dockY: -15.2,
        boltPts: [
          [0.5, 21.0, -2.80],
          [0.6, 13.5, -2.80],
          [0.8, -2.8, -2.80],
          [0.3, -9.8, -2.80],
        ],
        pinPts: [
          [0.5, 16.0, -2.80],
          [0.5, -5.5, -2.80],
        ],
        zifEnds: [0.8, 1.8, 0.8, 9.8],
      },
      1
    )
  );
  // W26 - W34 (9 parts on YO_BAR horizontal branch)
  all.push(
    ...makeSubStrokeParts({
      slug: 'yo-bar',
      charJa: 'よ',
      subLabel: '横枝ストローク',
      subEn: 'Crossbar Branch',
      cx: CX_YO,
      groupKey: 'glyph_yo',
      stroke: 'yo_bar',
      halfW: 2.65,
      startCode: 26,
      expBias: [-22, 12, 2],
      cinnabarFront: true,
      includeCopper: true,
      boltPts: [
        [8.4, 11.3, -3.08],
        [13.4, 11.8, -3.08],
      ],
    })
  );
  // W35 - W42 (8 parts on YO_LOOP lower loop + brass joint & BtoB connector!)
  all.push(
    ...makeSubStrokeParts({
      slug: 'yo-loop',
      charJa: 'よ',
      subLabel: '下部ループ',
      subEn: 'Lower Loop',
      cx: CX_YO,
      groupKey: 'glyph_yo',
      stroke: 'yo_loop',
      halfW: 2.65,
      startCode: 35,
      expBias: [-26, 6, 2],
      cinnabarFront: false,
      includeCopper: false,
      boltPts: [
        [-11.8, -9.8, -3.08],
        [-10.5, -2.6, -3.08],
        [10.2, -5.9, -3.08],
      ],
    }).slice(0, 6)
  );
  // W41: Loop-to-Stem CNC Brass Structural Reinforcement Bracket
  all.push({
    id: 'welcome-yo-loop-brass-bracket',
    code: 'W41',
    groupKey: 'glyph_yo',
    title: 'W41. 「よ」主幹〜下部ループ CNC真鍮構造連結ブラケット',
    subtitle: 'Glyph "よ" Stem-to-Loop CNC Brass Structural Gusset Bracket',
    category: '「よ」下部ループ / 構造連結',
    swatchColor: '#d4a948',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-28, -2, -22],
    plainAnalogy: '「よ」の縦棒と下の丸ループが交差する部分を内側から補強し、たわみや歪みを防ぐ真鍮ジョイント金具です。',
    summary: 'C3604快削真鍮からCNC削り出したT字補強ガセットブラケット。縦画と下部ループの交差点に発生する曲げモーメントを確実に受け止めます。',
    opticsAndPhysics: ['異種金属（アルミ＋真鍮）の減衰効果により交差点の機械剛性と耐振動性を向上。'],
    nextGenInnovation: '位置決め段付きダボ一体加工の精密真鍮ジョイント。',
    specs: [{ label: '材質', value: 'C3604 CNC真鍮' }],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = new THREE.Group();
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, 0.90), m.brassGear);
      b1.position.set(-4.2, -2.1, -3.10);
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 0.90), m.brassGear);
      b2.position.set(5.4, -4.4, -3.10);
      g.add(b1, b2);
      return g;
    },
  });
  // W42: Loop-to-Stem BtoB Power & Signal Connector + Copper Busbar
  all.push({
    id: 'welcome-yo-loop-btob-bus',
    code: 'W42',
    groupKey: 'glyph_yo',
    title: 'W42. 「よ」主幹〜ループ基板間 BtoB給電コネクタ＆銅バスバー',
    subtitle: 'Glyph "よ" Stem-to-Loop Board-to-Board Power Connector & Copper Bus',
    category: '「よ」下部ループ / 電力伝送',
    swatchColor: '#d07447',
    assembledPos: [CX_YO, 4, 0],
    explodeOffset: [-28, -2, -14],
    plainAnalogy: '縦画の制御基板から下部ループのLED基板へ、配線トラブルなく確実に電気を届ける直結コネクタ＆銅バーです。',
    summary: 'スタック高2.0mmの高信頼BtoBコネクタとC1020銅バスバー。ループ部LEDアレイへの低抵抗給電と放熱経路の連結を同時に担います。',
    opticsAndPhysics: ['電圧降下 < 8 mV の低抵抗給電により縦画と下部ループの輝度を完全一致。'],
    nextGenInnovation: 'フローティングBtoB接点による熱膨張応力吸収設計。',
    specs: [{ label: '定格電流', value: '2.5 A / 6極 BtoB' }],
    diagramType: 'welcome_glyph_layer',
    build: (m) => {
      const g = buildZifConnectorAndFpc(-5.4, -7.8, -2.02, -1.4, -7.8, -2.02, m, 'both', false);
      for (const seg of RENDER_STROKE_MAP.yo_loop) {
        g.add(new THREE.Mesh(extrudeRibbonGeo(seg, 1.45, 0.44, -2.02, 0.04, 12, 0), m.copperHeatSpreader));
      }
      return g;
    },
  });

  // =========================================================================
  // 2. 「う」モジュール — 42実機能パーツ (W43 - W84)
  // =========================================================================
  // W43 - W67 (25 core parts on U_ARC)
  all.push(
    ...makeCharCoreParts(
      {
        slug: 'u',
        charJa: 'う',
        cx: CX_U,
        mainStroke: 'u_arc',
        mainW: 3.1,
        bayPos: [11.8, 2.2],
        bayVertical: true,
        dockX: -5.5,
        dockY: -15.4,
        boltPts: [
          [-9.2, 9.8, -2.80],
          [5.8, 12.2, -2.80],
          [9.2, -5.6, -2.80],
          [0.8, -11.1, -2.80],
          [-6.2, -11.8, -2.80],
        ],
        pinPts: [
          [-1.5, 13.4, -2.80],
          [5.2, -8.5, -2.80],
        ],
        zifEnds: [11.8, -1.0, 11.8, 6.0],
      },
      43
    )
  );
  // W68 - W76 (9 parts on U_CREST floating upper dot!)
  all.push(
    ...makeSubStrokeParts({
      slug: 'u-crest',
      charJa: 'う',
      subLabel: '上部点（クレスト）',
      subEn: 'Floating Upper Crest',
      cx: CX_U,
      groupKey: 'glyph_u',
      stroke: 'u_crest',
      halfW: 2.75,
      startCode: 68,
      expBias: [-8, 26, 8],
      cinnabarFront: true,
      includeCopper: true,
      boltPts: [
        [-3.5, 23.8, -3.08],
        [4.2, 20.8, -3.08],
      ],
    })
  );
  // W77 - W80: REAL-WORLD FLOATING CREST QUARTZ STRUCTURAL SUPPORT & POWER COLUMN (4 parts!)
  all.push(
    {
      id: 'welcome-u-quartz-support-post',
      code: 'W77',
      groupKey: 'glyph_u',
      title: 'W77. 「う」浮遊点支持・透明溶融石英（Fused Silica）構造支柱',
      subtitle: 'Glyph "う" Transparent Fused-Silica Optical Structural Support Post',
      category: '「う」浮遊支持機構 / 光学石英構造',
      swatchColor: '#dcf0ff',
      assembledPos: [CX_U, 4, 0],
      explodeOffset: [-6, 18, 4],
      plainAnalogy: '現実世界で「う」の上の点が空中に浮いて見えるよう、超透明な光学石英ガラスの柱でしっかり支える実機構です。',
      summary: '透過率99.4%（ARコート付）の合成溶融石英（Fused Silica）円柱ポスト。上部クレストの重量を下の主弧骨格へ安全に伝達しつつ、視覚的な浮遊美を物理成立させます。',
      opticsAndPhysics: [
        '高純度SiO₂の低い熱膨張係数（0.55 ppm/K）と高い圧縮強度（1.1 GPa）により永久変形ゼロ。',
      ],
      nextGenInnovation: '光学グレード石英ロッドによる「見えない構造支持」の工業実装。',
      specs: [{ label: '材質', value: '合成溶融石英 (透過率 99.4%)' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildQuartzColumnPart(0.5, 16.98, 0.5, 18.50, 0, 0.95, m, 'quartz'),
    },
    {
      id: 'welcome-u-quartz-brass-collars',
      code: 'W78',
      groupKey: 'glyph_u',
      title: 'W78. 「う」石英支柱 上下CNC真鍮締結フランジカラー',
      subtitle: 'Glyph "う" Quartz Post Upper & Lower CNC Brass Clamping Collars',
      category: '「う」浮遊支持機構 / 精密締結',
      swatchColor: '#d4a948',
      assembledPos: [CX_U, 4, 0],
      explodeOffset: [-6, 18, 4],
      plainAnalogy: '透明な石英の柱が外れたり割れたりしないよう、上下の端をアルミ筐体へ優しくしっかり挟み込む真鍮ソケットです。',
      summary: '石英支柱の上下端をクランプする六角フランジ付きCNC真鍮カラー対。ガラス直接接触による応力集中を回避し、確実な締結剛性を実現します。',
      opticsAndPhysics: ['真鍮の適度な展性により石英ガラスへの局部応力集中を緩和。'],
      nextGenInnovation: '六角工具掛かり付き精密真鍮オプティカルクランプ。',
      specs: [{ label: '材質', value: 'C3604 精密旋削真鍮' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildQuartzColumnPart(0.5, 16.98, 0.5, 18.50, 0, 0.95, m, 'collars'),
    },
    {
      id: 'welcome-u-quartz-power-wire',
      code: 'W79',
      groupKey: 'glyph_u',
      title: 'W79. 「う」石英支柱内蔵 φ0.35mm二重エナメル給電導体ペア',
      subtitle: 'Glyph "う" In-Column φ0.35mm Enamel-Insulated Power Conductor Pair',
      category: '「う」浮遊支持機構 / 電力供給',
      swatchColor: '#c97643',
      assembledPos: [CX_U, 4, 0],
      explodeOffset: [-6, 18, 4],
      plainAnalogy: '浮いている「う」の上の点のLEDを実際に光らせるため、透明な石英柱の中心を貫通する極細の電気配線です。',
      summary: '石英中空マイクロボア内を貫通するφ0.35mm 2芯ポリウレタン二重エナメル銅線。主弧の定電流ドライバ出力を上部クレストLED基板へ直接供給します。',
      opticsAndPhysics: ['断面積 0.096 mm² の純銅線により 350mA 定電流駆動時の電圧降下を 6 mV 未満に抑制。'],
      nextGenInnovation: '構造支柱と電力配線を同軸一体化したクリアハーネス設計。',
      specs: [{ label: '線径', value: 'φ0.35 mm × 2芯 (耐圧1kV)' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildQuartzColumnPart(0.5, 16.98, 0.5, 18.50, 0, 0.95, m, 'wire'),
    },
    {
      id: 'welcome-u-quartz-oring-seals',
      code: 'W80',
      groupKey: 'glyph_u',
      title: 'W80. 「う」石英支柱 上下エラストマー防振・防塵Oリングシール',
      subtitle: 'Glyph "う" Quartz Column Elastomer Cushion & IP65 O-Ring Seals',
      category: '「う」浮遊支持機構 / 防振密閉',
      swatchColor: '#353840',
      assembledPos: [CX_U, 4, 0],
      explodeOffset: [-6, 18, 4],
      plainAnalogy: '真鍮金具と石英ガラスの間に挟んで衝撃を和らげ、内部へのホコリ侵入も防ぐ極小ゴムリングです。',
      summary: '真鍮カラー内径溝へ収まるフッ素ゴム製マイクロOリング対。温度変化によるアルミ・真鍮・石英間の熱膨張差を弾性吸収します。',
      opticsAndPhysics: ['3軸方向の微小変位を弾性支持し石英柱のクラック発生をゼロ化。'],
      nextGenInnovation: '低圧縮永久ひずみFKMマイクロOリング。',
      specs: [{ label: '材質', value: 'FKM フッ素ゴム (硬度60A)' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildQuartzColumnPart(0.5, 16.98, 0.5, 18.50, 0, 0.95, m, 'seals'),
    },
    // W81 - W84: Additional real arc functional sub-components (curved copper heatpipe, cinnabar edge rail, retainer clips, crest ZIF)
    {
      id: 'welcome-u-arc-copper-heatpipe',
      code: 'W81',
      groupKey: 'glyph_u',
      title: 'W81. 「う」主弧 湾曲C1020無酸素銅ヒートスプレッダ',
      subtitle: 'Glyph "う" Main Arc Curved Oxygen-Free Copper Heat Spreader',
      category: '「う」主弧 / 放熱伝導',
      swatchColor: '#d07447',
      assembledPos: [CX_U, 4, 0],
      explodeOffset: [(CX_U / 66) * 26, 6, -11],
      plainAnalogy: '長くカーブした「う」のLED熱を端から端まで素早く均等化して逃がす純銅製の放熱プレートです。',
      summary: '主弧の曲線に沿ってCNC成形された無酸素銅ヒートスプレッダ。上部LEDの熱を下部ドッキング部および背面3Dフィンへ効率的に運びます。',
      opticsAndPhysics: ['熱伝導率 398 W/(m·K) により長い弧全体での温度勾配を 3℃ 以内に均熱化。'],
      nextGenInnovation: '3D曲線精密プレス成型C1020サーマルスプレッダ。',
      specs: [{ label: '材質', value: 'C1020 無酸素銅 (0.8mm厚)' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(extrudeRibbonGeo(RENDER_STROKE_MAP.u_arc[0], 1.75, 0.22, -1.45, 0, 20, 0), m.copperHeatSpreader));
        return g;
      },
    },
    {
      id: 'welcome-u-arc-cinnabar-edge',
      code: 'W82',
      groupKey: 'glyph_u',
      title: `${'W82'}. 「う」主弧 シナバー光学エッジアクセント導光レール`,
      subtitle: 'Glyph "う" Main Arc Cinnabar Optical Edge Accent Light-Guide Rail',
      category: '「う」主弧 / 光学エッジ発色',
      swatchColor: '#e65a28',
      assembledPos: [CX_U, 4, 0],
      explodeOffset: [(CX_U / 66) * 26, 6, 33],
      plainAnalogy: '「う」の側面ラインに沿ってシナバーオレンジの光を浮かび上がらせる光学エッジ導光レールです。',
      summary: '主弧導光板の側面光を取り込んでブランドカラーへ変換する立体光学エッジストリップ。正面の純白発光と側面のシナバー発色が立体奥行きを際立たせます。',
      opticsAndPhysics: ['全反射エッジカップリングにより専用LEDを追加せず高効率にエッジ発光。'],
      nextGenInnovation: 'エッジ励起型2色光学ガイド機構。',
      specs: [{ label: '発色波長', value: '610 nm シナバー光学樹脂' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildHollowPerimeterRing(RENDER_STROKE_MAP.u_arc, 3.1 * 1.13, 0.18, 0.56, 2.92, m.sonyAlphaCinnabar, 0),
    },
    {
      id: 'welcome-u-crest-micro-zif',
      code: 'W83',
      groupKey: 'glyph_u',
      title: 'W83. 「う」クレスト基板直結 マイクロ2極ロックコネクタ',
      subtitle: 'Glyph "う" Crest Board Micro 2-Pin Wire-to-Board Lock Connector',
      category: '「う」上部点 / 電気接続',
      swatchColor: '#f1f5f9',
      assembledPos: [CX_U, 4, 0],
      explodeOffset: [-8, 26, -12],
      plainAnalogy: '石英柱から上がってきた電気配線を上の点のLED基板へワンタッチで確実に繋ぐ超小型コネクタです。',
      summary: '0.8mmピッチ2極ポジティブロック式Wire-to-Boardコネクタ。上部クレストのメンテナンス着脱を容易にし、接触不良ゼロで給電を維持します。',
      opticsAndPhysics: ['2点接触バネ端子により振動環境でも低抵抗通電を維持。'],
      nextGenInnovation: '超低背1.4mm高信頼マイクロロック端子。',
      specs: [{ label: 'ピッチ', value: '0.8 mm × 2極 ロック付' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = buildZifConnectorAndFpc(0.5, 22.3, -3.08, 0.5, 22.3, -3.08, m, 'zif', false);
        g.add(buildZifConnectorAndFpc(1.8, 13.1, -2.02, 1.8, 13.1, -2.02, m, 'zif', false));
        return g;
      },
    },
    {
      id: 'welcome-u-ti-retainer-clips',
      code: 'W84',
      groupKey: 'glyph_u',
      title: 'W84. 「う」前面サファイアレンズ固定 チタンばねリテーナークリップ群',
      subtitle: 'Glyph "う" Titanium Spring Retainer Clips for Front Sapphire Lens',
      category: '「う」主弧 / 光学保持機構',
      swatchColor: '#bac4d1',
      assembledPos: [CX_U, 4, 0],
      explodeOffset: [(CX_U / 66) * 26, 6, 28],
      plainAnalogy: '大きなカーブを描く前面レンズを全周から均等なバネ力で押さえ込み、熱膨張しても割れないよう保持するチタン製クリップです。',
      summary: 'βチタンばね材を精密エッチング曲げ加工した6点リテーナークリップ群。光学レンズへ均一な予圧を与えつつ温度伸縮を逃がします。',
      opticsAndPhysics: ['ばね定数 4.2 N/mm の弾性保持により光学歪み（応力複屈折）を防止。'],
      nextGenInnovation: '接着剤レス分解保守可能な弾性レンズ保持構造。',
      specs: [{ label: '材質', value: 'βチタンばね材 (6点保持)' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) =>
        buildDowelPins(
          [
            [-9.5, 9.2, 2.48],
            [0.5, 13.3, 2.48],
            [9.5, 10.6, 2.48],
            [6.5, -7.8, 2.48],
            [-5.8, -11.8, 2.48],
          ],
          0.44,
          0.62,
          m.linkArmSteel,
          'z'
        ),
    }
  );

  // =========================================================================
  // 3. 「こ」モジュール — 42実機能パーツ (W85 - W126)
  // =========================================================================
  // W85 - W109 (25 core parts on KO_BOT lower stroke master chassis)
  all.push(
    ...makeCharCoreParts(
      {
        slug: 'ko',
        charJa: 'こ',
        cx: CX_KO,
        mainStroke: 'ko_bot',
        mainW: 3.1,
        bayPos: [0.5, -11.7],
        bayVertical: false,
        dockX: 0.0,
        dockY: -15.4,
        boltPts: [
          [-11.8, -5.2, -2.80],
          [-10.8, -9.0, -2.80],
          [11.5, -11.4, -2.80],
        ],
        pinPts: [
          [-8.6, -10.4, -2.80],
          [8.4, -11.5, -2.80],
        ],
        zifEnds: [-3.4, -11.7, 4.4, -11.7],
      },
      85
    )
  );
  // W110 - W118 (9 parts on KO_TOP upper horizontal stroke)
  all.push(
    ...makeSubStrokeParts({
      slug: 'ko-top',
      charJa: 'こ',
      subLabel: '上画ストローク',
      subEn: 'Upper Stroke',
      cx: CX_KO,
      groupKey: 'glyph_ko',
      stroke: 'ko_top',
      halfW: 3.0,
      startCode: 110,
      expBias: [10, 22, 8],
      cinnabarFront: true,
      includeCopper: true,
      boltPts: [
        [-9.2, 14.8, -3.08],
        [0.0, 16.2, -3.08],
        [8.5, 15.0, -3.08],
      ],
    })
  );
  // W119 - W120: KO_TOP_HOOK optical corner reflection prism + independent end cap
  all.push(
    {
      id: 'welcome-ko-hook-optical-prism',
      code: 'W119',
      groupKey: 'glyph_ko',
      title: 'W119. 「こ」上画終端ハネ部 45°全反射光学コーナープリズム',
      subtitle: 'Glyph "こ" Upper Hook 45° Total-Internal-Reflection Optical Prism',
      category: '「こ」上画ハネ / 光学プリズム',
      swatchColor: '#60a5fa',
      assembledPos: [CX_KO, 4, 0],
      explodeOffset: [18, 12, 18],
      plainAnalogy: '「こ」の上の線の右端にある折り返し（ハネ）の先まで光が暗くならずに届くよう、光を直角に曲げるガラス製プリズムです。',
      summary: '光学BK7ガラス精密研磨の45°全反射プリズム。上画導光板の終端光を下方ハネ方向へ効率よく偏向し、終端部の輝度落ち込みを完全解消します。',
      opticsAndPhysics: ['臨界角41.1°（n=1.52）を超える45°斜面での全反射により反射率99.9%の無損失偏向を実現。'],
      nextGenInnovation: '文字屈曲部専用の精密マイクロコーナー導光プリズム。',
      specs: [{ label: '材質', value: 'BK7 光学ガラス (n=1.517)' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildOpticalCornerPrism(12.80, 11.70, 0.55, 0.42, -Math.PI * 0.65, m.welcomeOpticalEd, 1.4),
    },
    {
      id: 'welcome-ko-hook-end-cap',
      code: 'W120',
      groupKey: 'glyph_ko',
      title: 'W120. 「こ」上画終端ハネ CNCアルミ独立エンドキャップ＆拡散部',
      subtitle: 'Glyph "こ" Upper Hook Independent CNC Aluminum End Housing',
      category: '「こ」上画ハネ / 独立構造',
      swatchColor: '#4b586e',
      assembledPos: [CX_KO, 4, 0],
      explodeOffset: [18, 12, 6],
      plainAnalogy: '「こ」の上画の右端ハネ部分を形作り、中のコーナー光学プリズムをしっかり保護する専用エンドキャップです。',
      summary: 'ハネ部分のCNCアルミ独立エンドキャップおよび前面拡散窓。コーナープリズムを所定角度±0.2°で保持します。',
      opticsAndPhysics: ['精密ダボ嵌合によりハネ部と上画の継ぎ目段差を0.02mm以下に抑止。'],
      nextGenInnovation: 'プリズム保持座一体切削のエンドキャップ機構。',
      specs: [{ label: '材質', value: 'A6061-T6 + サファイア窓' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = buildHollowCncChassis(RENDER_STROKE_MAP.ko_hook, 1.50, 3.61, 0.255, m.welcomeCoreSlate, m.stainlessMachined);
        g.add(buildSteppedOpticalLens(RENDER_STROKE_MAP.ko_hook, 1.28, 3.38, m.welcomeTitaniumFace));
        return g;
      },
    },
    // W121 - W126: REAL-WORLD DUAL TRANSPARENT QUARTZ COLUMNS + POWER & SIGNAL BUS (6 parts!)
    {
      id: 'welcome-ko-quartz-col-left',
      code: 'W121',
      groupKey: 'glyph_ko',
      title: 'W121. 「こ」左・透明溶融石英（Fused Silica）構造支柱コラム',
      subtitle: 'Glyph "こ" Left Transparent Fused-Silica Structural Column',
      category: '「こ」上下連結機構 / 光学石英構造',
      swatchColor: '#dcf0ff',
      assembledPos: [CX_KO, 4, 0],
      explodeOffset: [10, 6, 4],
      plainAnalogy: '上下に分かれた「こ」の上画を左側で支えつつ、透明だから浮いて見える光学石英ガラスの支柱です。',
      summary: '下画シャーシと上画シャーシを左端で機械連結する光学溶融石英支柱。2本柱による剛構造で上画の傾き・回転を完全防止します。',
      opticsAndPhysics: ['低反射ARコーティング付きφ2.4mm石英ロッドにより背景と同化する高透過外観。'],
      nextGenInnovation: '2柱門型ラーメン構造の透明光学石英フレーム。',
      specs: [{ label: '材質', value: '合成溶融石英 φ2.4 mm' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildQuartzColumnPart(-7.6, -2.6, -7.6, 11.75, 0, 1.05, m, 'quartz'),
    },
    {
      id: 'welcome-ko-quartz-col-right',
      code: 'W122',
      groupKey: 'glyph_ko',
      title: 'W122. 「こ」右・透明溶融石英（Fused Silica）構造支柱コラム',
      subtitle: 'Glyph "こ" Right Transparent Fused-Silica Structural Column',
      category: '「こ」上下連結機構 / 光学石英構造',
      swatchColor: '#dcf0ff',
      assembledPos: [CX_KO, 4, 0],
      explodeOffset: [10, 6, 4],
      plainAnalogy: '「こ」の上画を右側で支えるもう1本の透明石英ガラス支柱です。左右2本で水平をビシッと保ちます。',
      summary: '右端側で上画を機械支持する光学溶融石英支柱。内部マイクロボアにPWM制御信号線を内蔵し、構造支持と配線保護を兼ねます。',
      opticsAndPhysics: ['左右対称2点支持により衝撃時モーメントを均等分担。'],
      nextGenInnovation: '信号導体同軸内蔵の透明石英構造コラム。',
      specs: [{ label: '材質', value: '合成溶融石英 φ2.4 mm' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildQuartzColumnPart(7.6, -8.05, 7.6, 11.75, 0, 1.05, m, 'quartz'),
    },
    {
      id: 'welcome-ko-quartz-brass-collars',
      code: 'W123',
      groupKey: 'glyph_ko',
      title: 'W123. 「こ」左右石英コラム 4点CNC真鍮締結フランジカラー',
      subtitle: 'Glyph "こ" Dual Quartz Columns 4-Point CNC Brass Clamping Collars',
      category: '「こ」上下連結機構 / 精密締結',
      swatchColor: '#d4a948',
      assembledPos: [CX_KO, 4, 0],
      explodeOffset: [10, 6, 4],
      plainAnalogy: '左右2本の透明石英柱の上下計4箇所をアルミ本体へガッチリ固定する真鍮製の締結カラー金具です。',
      summary: '左右2本の石英コラム上下端を把持する4箇所のCNC真鍮フランジカラー群。精密な垂直度0.05°以内で上画と下画の平行度を保証します。',
      opticsAndPhysics: ['4点均等クランプにより曲げ剛性と耐落下衝撃性能を大幅向上。'],
      nextGenInnovation: '六角フランジ一体旋削の高精度オプティカルソケット。',
      specs: [{ label: '数量', value: '4個組 (C3604 CNC真鍮)' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = buildQuartzColumnPart(-7.6, -2.6, -7.6, 11.75, 0, 1.05, m, 'collars');
        g.add(buildQuartzColumnPart(7.6, -8.05, 7.6, 11.75, 0, 1.05, m, 'collars'));
        return g;
      },
    },
    {
      id: 'welcome-ko-left-power-bus',
      code: 'W124',
      groupKey: 'glyph_ko',
      title: 'W124. 「こ」左コラム内蔵 12V給電ペア極細シールド導体',
      subtitle: 'Glyph "こ" Left Quartz Column Internal 12V Power Conductor Pair',
      category: '「こ」上下連結機構 / 電力供給',
      swatchColor: '#c97643',
      assembledPos: [CX_KO, 4, 0],
      explodeOffset: [10, 6, 4],
      plainAnalogy: '下の制御基板から浮いた上画のLEDへ電気を届ける、左の石英柱の中に隠された極細の電源ペア線です。',
      summary: '左石英コラム中心貫通穴を通る+12V/GND二重エナメル純銅導体ペア。下画の2ch電源から上画LED MCPCBへ低損失給電します。',
      opticsAndPhysics: ['電源線と信号線を左右別コラムへ分離配線し、スイッチングノイズ結合を原理的に遮断。'],
      nextGenInnovation: '電力・信号コラム物理分離レイアウト。',
      specs: [{ label: '系統', value: '12V / GND 給電ペア' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildQuartzColumnPart(-7.6, -2.6, -7.6, 11.75, 0, 1.05, m, 'wire'),
    },
    {
      id: 'welcome-ko-right-pwm-bus',
      code: 'W125',
      groupKey: 'glyph_ko',
      title: 'W125. 「こ」右コラム内蔵 PWM調光＆NTC温度フィードバック導体',
      subtitle: 'Glyph "こ" Right Quartz Column Internal PWM & NTC Sense Conductors',
      category: '「こ」上下連結機構 / 制御信号線',
      swatchColor: '#e2b648',
      assembledPos: [CX_KO, 4, 0],
      explodeOffset: [10, 6, 4],
      plainAnalogy: '上画の明るさ指令と温度センサー情報を下画の頭脳へ伝える、右の石英柱の中に通した信号線です。',
      summary: '右石英コラム内を貫通する32kHz PWM調光信号＆NTC温度監視フィードバック導体ペア。上画の過熱保護と上下同時フェード同期を実現します。',
      opticsAndPhysics: ['電源線（左柱）と距離15.2mm離隔することで信号クロストークを-60dB以下へ抑制。'],
      nextGenInnovation: 'ノイズフリー上下画同期インテリジェント配線。',
      specs: [{ label: '系統', value: '32kHz PWM + NTC帰還' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildQuartzColumnPart(7.6, -8.05, 7.6, 11.75, 0, 1.05, m, 'wire'),
    },
    {
      id: 'welcome-ko-quartz-seals',
      code: 'W126',
      groupKey: 'glyph_ko',
      title: 'W126. 「こ」左右石英コラム 防振・防塵エラストマーOリング群',
      subtitle: 'Glyph "こ" Dual Quartz Columns Anti-Vibration & IP65 O-Ring Seals',
      category: '「こ」上下連結機構 / 防振密閉',
      swatchColor: '#353840',
      assembledPos: [CX_KO, 4, 0],
      explodeOffset: [10, 6, 4],
      plainAnalogy: '石英柱と金属の接続部4箇所をクッション保護しつつ密閉する極小ゴムOリング群です。',
      summary: '左右2本柱の上下計4箇所へ配したFKM防振Oリング。熱伸縮差の吸収と上下キャビティ間の防塵防滴封止を担います。',
      opticsAndPhysics: ['4点弾性支持により輸送振動下でも石英ガラスの欠けを完全防止。'],
      nextGenInnovation: '高耐候FKMマイクロダンパーシール。',
      specs: [{ label: '数量', value: '4個組 (FKM 60A)' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = buildQuartzColumnPart(-7.6, -2.6, -7.6, 11.75, 0, 1.05, m, 'seals');
        g.add(buildQuartzColumnPart(7.6, -8.05, 7.6, 11.75, 0, 1.05, m, 'seals'));
        return g;
      },
    }
  );

  // =========================================================================
  // 4. 「そ」モジュール — 42実機能パーツ (W127 - W168)
  // =========================================================================
  // W127 - W151 (25 core parts on SO_BOWL lower bowl master chassis)
  all.push(
    ...makeCharCoreParts(
      {
        slug: 'so',
        charJa: 'そ',
        cx: CX_SO,
        mainStroke: 'so_bowl',
        mainW: 3.1,
        bayPos: [2.2, -11.8],
        bayVertical: false,
        dockX: 2.0,
        dockY: -15.4,
        boltPts: [
          [-6.8, -1.6, -2.80],
          [-7.2, -10.4, -2.80],
          [12.4, -11.5, -2.80],
        ],
        pinPts: [
          [-9.6, -6.8, -2.80],
          [10.2, -11.5, -2.80],
        ],
        zifEnds: [-1.8, -11.8, 5.8, -11.8],
      },
      127
    )
  );
  // W152 - W160 (9 parts on SO_Z2 diagonal primary Z-fold)
  all.push(
    ...makeSubStrokeParts({
      slug: 'so-zdiag',
      charJa: 'そ',
      subLabel: 'Z字斜め画',
      subEn: 'Upper Z-Diagonal',
      cx: CX_SO,
      groupKey: 'glyph_so',
      stroke: 'so_z2',
      halfW: 2.55,
      startCode: 152,
      expBias: [26, 18, 2],
      cinnabarFront: true,
      includeCopper: true,
      boltPts: [
        [5.2, 18.2, -3.08],
        [-6.8, 10.1, -3.08],
      ],
    })
  );
  // W161 - W168 (8 real Z-top, Z-mid, Dual 45° Corner Prisms, Brass Joint, BtoB Connector, Z-LED, Z-LGP!)
  all.push(
    {
      id: 'welcome-so-z1-top-frame',
      code: 'W161',
      groupKey: 'glyph_so',
      title: 'W161. 「そ」Z字上横画 CNC6061アルミ肉抜きフレーム＆レンズ',
      subtitle: 'Glyph "そ" Upper-Z Top Horizontal CNC Aluminum Frame & Lens',
      category: '「そ」Z字上部 / 構造・発光',
      swatchColor: '#364152',
      assembledPos: [CX_SO, 4, 0],
      explodeOffset: [26, 18, 2],
      plainAnalogy: '「そ」の一番上の横棒を構成し、中のLEDと導光板を収めるCNCアルミ骨格と前面カバーです。',
      summary: '上横画の肉抜きCNCアルミフレームと段付き前面拡散カバー。右端で45°光学コーナープリズムと嵌合し、斜め画へ光を途切れなく接続します。',
      opticsAndPhysics: ['一体CNCリブと前面拡散レンズにより文字最上部まで均一な立体輝度を実現。'],
      nextGenInnovation: 'Z折返し高精度嵌合フレーム。',
      specs: [{ label: '材質', value: 'A6061-T6 + サファイアレンズ' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = buildHollowCncChassis(RENDER_STROKE_MAP.so_z1, 2.55, 3.61, 0.255, m.welcomeCoreSlate, m.stainlessMachined);
        g.add(buildSteppedOpticalLens(RENDER_STROKE_MAP.so_z1, 2.15, 3.38, m.welcomeTitaniumFace));
        return g;
      },
    },
    {
      id: 'welcome-so-z3-mid-frame',
      code: 'W162',
      groupKey: 'glyph_so',
      title: 'W162. 「そ」Z字中横画 CNC6061アルミ肉抜きフレーム＆レンズ',
      subtitle: 'Glyph "そ" Upper-Z Mid Horizontal CNC Aluminum Frame & Lens',
      category: '「そ」Z字上部 / 構造・発光',
      swatchColor: '#4b586e',
      assembledPos: [CX_SO, 4, 0],
      explodeOffset: [26, 18, 2],
      plainAnalogy: '「そ」の真ん中の横棒を構成し、上の斜め画と下の丸い椀部をつなぐ中核アルミ骨格＆カバーです。',
      summary: '中横画の肉抜きCNCアルミ骨格と前面拡散カバー。左端で第2コーナープリズムを受け、中央下部で真鍮ジョイントを介して椀部と強固に連結します。',
      opticsAndPhysics: ['Z字と椀部の荷重と熱を中継する機械・熱の要衝構造。'],
      nextGenInnovation: '3ストローク交差部の応力集中緩和CNCフィレット設計。',
      specs: [{ label: '材質', value: 'A6061-T6 + サファイアレンズ' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = buildHollowCncChassis(RENDER_STROKE_MAP.so_z3, 2.55, 3.61, 0.255, m.welcomeCoreSlate, m.stainlessMachined);
        g.add(buildSteppedOpticalLens(RENDER_STROKE_MAP.so_z3, 2.15, 3.38, m.welcomeTitaniumFace));
        return g;
      },
    },
    {
      id: 'welcome-so-z-corner-prism-1',
      code: 'W163',
      groupKey: 'glyph_so',
      title: 'W163. 「そ」Z字第1鋭角部 45°光学全反射コーナープリズム',
      subtitle: 'Glyph "そ" Z-Fold Corner #1 45° Total-Internal-Reflection Optical Prism',
      category: '「そ」Z字上部 / 光学プリズム',
      swatchColor: '#60a5fa',
      assembledPos: [CX_SO, 4, 0],
      explodeOffset: [26, 18, 18],
      plainAnalogy: '「そ」の上の鋭い曲がり角で光が途切れて暗くならないよう、光をピタッと鋭角反射させる光学ガラスプリズムです。',
      summary: '上横画から斜め画への鋭角折返し部に収めたBK7全反射光学プリズム。鋭角屈曲による導光ロスを98%以上回収し、角部まで明るく均一発光させます。',
      opticsAndPhysics: ['全反射プリズム斜面が斜め画導光板へ平行光を直接カップリング。'],
      nextGenInnovation: '鋭角漢字・仮名専用マイクロ全反射コーナープリズム。',
      specs: [{ label: '材質', value: 'BK7 光学ガラス' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildOpticalCornerPrism(3.15, 21.15, 0.55, 0.82, -Math.PI * 0.72, m.welcomeOpticalEd, 1.4),
    },
    {
      id: 'welcome-so-z-corner-prism-2',
      code: 'W164',
      groupKey: 'glyph_so',
      title: 'W164. 「そ」Z字第2鋭角部 45°光学全反射コーナープリズム',
      subtitle: 'Glyph "そ" Z-Fold Corner #2 45° Total-Internal-Reflection Optical Prism',
      category: '「そ」Z字上部 / 光学プリズム',
      swatchColor: '#93c5fd',
      assembledPos: [CX_SO, 4, 0],
      explodeOffset: [26, 18, 18],
      plainAnalogy: '斜め画から中横画へ折り返す左側の鋭い角に収め、光をスムーズに方向転換させるもう1つの光学プリズムです。',
      summary: '左折返し部のBK7光学全反射コーナープリズム。第1プリズムと対をなし、Z字3画全体の輝度連続性を確保します。',
      opticsAndPhysics: ['臨界角全反射により金属鏡不要で吸収損失ゼロの光路偏向を実現。'],
      nextGenInnovation: 'デュアルプリズムによるZ字導光ムラ完全解消。',
      specs: [{ label: '材質', value: 'BK7 光学ガラス' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildOpticalCornerPrism(-6.10, 6.75, 0.55, 1.00, Math.PI * 0.25, m.welcomeOpticalEd, 1.4),
    },
    {
      id: 'welcome-so-z-horiz-leds',
      code: 'W165',
      groupKey: 'glyph_so',
      title: 'W165. 「そ」Z字上下横画 アルミコアMCPCB＆CRI97 LEDアレイ',
      subtitle: 'Glyph "そ" Upper-Z Horizontal Bars MCPCB & CRI97 Micro-LED Arrays',
      category: '「そ」Z字上部 / 発光エンジン',
      swatchColor: '#fbbf24',
      assembledPos: [CX_SO, 4, 0],
      explodeOffset: [26, 18, -4],
      plainAnalogy: '「そ」の上横画と中横画それぞれに収まり、文字の上半分を鮮やかに照らす専用LED発光基板セットです。',
      summary: 'Z1上横画・Z3中横画それぞれへ最適化した金属コアMCPCB＋CRI97 2835マイクロLEDアレイ。',
      opticsAndPhysics: ['3画独立LED配置により複雑なZ字形状でも輝度均一性92%以上を実現。'],
      nextGenInnovation: 'Z字多段セグメント定電流バランス駆動。',
      specs: [{ label: '光源', value: 'CRI97 2835 LED × 2列' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = buildLedArrayOnMcpcb(RENDER_STROKE_MAP.so_z1, 1.62, -0.45, m, false);
        g.add(buildLedArrayOnMcpcb(RENDER_STROKE_MAP.so_z3, 1.62, -0.45, m, false));
        return g;
      },
    },
    {
      id: 'welcome-so-z-horiz-heatsink',
      code: 'W166',
      groupKey: 'glyph_so',
      title: 'W166. 「そ」Z字上下横画 背面AZ91Dマグネシウム3Dフィン放熱板',
      subtitle: 'Glyph "そ" Upper-Z Horizontal Bars 3D-Finned Magnesium Heatsinks',
      category: '「そ」Z字上部 / 放熱背面',
      swatchColor: '#2a3446',
      assembledPos: [CX_SO, 4, 0],
      explodeOffset: [26, 18, -32],
      plainAnalogy: 'Z字の上横画と中横画の裏側をカバーしながら3Dフィンで効率よく冷やす放熱プレートです。',
      summary: 'Z1およびZ3ストローク専用の3D冷却フィン一体型AZ91Dマグネシウム背面カバー。',
      opticsAndPhysics: ['上昇気流が上下2段のフィン間を通り抜ける自然煙突対流冷却。'],
      nextGenInnovation: '煙突効果最適化ピッチの3D放熱フィン配列。',
      specs: [{ label: '材質', value: 'AZ91D マグネシウム合金' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = buildFinnedBackplate(RENDER_STROKE_MAP.so_z1, 2.40, -4.56, m.welcomeMagRear);
        g.add(buildFinnedBackplate(RENDER_STROKE_MAP.so_z3, 2.40, -4.56, m.welcomeMagRear));
        return g;
      },
    },
    {
      id: 'welcome-so-z-bowl-brass-joint',
      code: 'W167',
      groupKey: 'glyph_so',
      title: 'W167. 「そ」Z字〜椀部 CNC真鍮構造連結ジョイントブロック',
      subtitle: 'Glyph "そ" Z-Fold-to-Bowl CNC Brass Structural Coupling Joint',
      category: '「そ」連結機構 / 構造締結',
      swatchColor: '#d4a948',
      assembledPos: [CX_SO, 4, 0],
      explodeOffset: [26, 10, -22],
      plainAnalogy: '上のZ字ユニットの重さを下の椀型ユニットへガッチリ繋ぎ止める、高強度な真鍮製ジョイントブロックです。',
      summary: 'Z字中横画と下部椀部の接続点へ埋め込まれるC3604 CNC真鍮構造ジョイント。M2ボルト4本と位置決めピン2本で強固に締結し、片持ち荷重を安全に支持します。',
      opticsAndPhysics: ['高いせん断強度により「そ」特有の片持ちZ構造のねじれ振動を抑制。'],
      nextGenInnovation: '内部ケーブル貫通スリット付き中空真鍮構造ジョイント。',
      specs: [{ label: '材質', value: 'C3604 CNC真鍮' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => {
        const g = new THREE.Group();
        const blk = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.4, 1.0), m.brassGear);
        blk.position.set(-2.5, 3.6, -2.95);
        g.add(blk);
        g.add(buildHexSocketBolts([[-3.6, 3.6, -2.95], [-1.4, 3.6, -2.95]], 0.42, 1.10, m, 'z', -1));
        return g;
      },
    },
    {
      id: 'welcome-so-z-bowl-btob-fpc',
      code: 'W168',
      groupKey: 'glyph_so',
      title: 'W168. 「そ」Z字〜椀部 基板間BtoB給電コネクタ＆ポリイミドFPC',
      subtitle: 'Glyph "そ" Z-Fold-to-Bowl BtoB Power Connector & Polyimide FPC',
      category: '「そ」連結機構 / 電力・信号伝送',
      swatchColor: '#c76414',
      assembledPos: [CX_SO, 4, 0],
      explodeOffset: [26, 10, -14],
      plainAnalogy: '椀部の制御基板から上のZ字3画すべてのLEDへ電気と調光信号を送り届ける専用フレキ配線＆コネクタです。',
      summary: '真鍮ジョイント内スリットを通ってZ字LED基板と椀部制御基板を結ぶポリイミドFPC＆ZIFコネクタ。外から配線が一切見えないクリーンな電力伝送を実現します。',
      opticsAndPhysics: ['内部シールド配線によりZ字上部からの高周波放射ノイズを封止。'],
      nextGenInnovation: 'ジョイント内蔵型ゼロ露出インターコネクト。',
      specs: [{ label: '極数', value: '8極 0.5mm ZIF + ポリイミドFPC' }],
      diagramType: 'welcome_glyph_layer',
      build: (m) => buildZifConnectorAndFpc(1.8, 6.2, -1.94, -4.6, -0.2, -1.94, m, 'both', false),
    }
  );

  // =========================================================================
  // 5. 光学ベンチ・パワー＆インテリジェンス台座ユニット — 48実機能パーツ (W169 - W216)
  // =========================================================================
  const plPos: readonly [number, number, number] = [0, -17.0, 0];
  const plinthDefs: WelcomePartDef[] = [
    // --- Structure, Datum & Sealing (W169 - W182: 14 parts) ---
    {
      id: 'welcome-plinth-mg-chassis',
      code: 'W169',
      groupKey: 'optical_plinth',
      title: 'W169. 台座メイン CNCマグネシウム合金・中空光学ベンチシャーシ',
      subtitle: 'Plinth Main Hollow-Cavity CNC Magnesium Optical Bench Chassis',
      category: '光学ベンチ台座 / 主構造筐体',
      swatchColor: '#2a3446',
      assembledPos: plPos,
      explodeOffset: [0, -20, 0],
      plainAnalogy: '「よ・う・こ・そ」4文字すべてを支え、内部に電源・バッテリー・マイコン・スピーカーを収めるメイン台座ボディです。',
      summary: '幅186mm×奥行28mmのAZ91Dマグネシウム合金CNC削り出し中空シャーシ。内部に基板・電池・スピーカー区画の隔壁リブを備え、高剛性と電磁遮蔽性を兼備します。',
      opticsAndPhysics: ['中空ボックス断面により全幅186mmでの曲げたわみを 0.01 mm 以下に抑制。'],
      nextGenInnovation: 'カメラボディ同等のAZ91Dマグネシウム精密CNC中空ベンチ。',
      specs: [{ label: '外形寸法', value: '186 × 8.5 × 26 mm' }, { label: '材質', value: 'AZ91D マグネシウム合金' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const addBox = (w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material) => {
          const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
          mesh.position.set(x, y, z);
          g.add(mesh);
        };
        addBox(184.8, 1.48, 1.40, 0, 1.74, 12.20, m.welcomeMagRear);
        addBox(184.8, 1.02, 1.40, 0, -4.29, 12.20, m.welcomeMagRear);
        addBox(4.2, 4.78, 1.40, -90.3, -1.39, 12.20, m.welcomeMagRear);
        addBox(4.2, 4.78, 1.40, 90.3, -1.39, 12.20, m.welcomeMagRear);

        addBox(184.8, 0.78, 1.40, 0, 2.09, -12.20, m.welcomeMagRear);
        addBox(184.8, 1.08, 1.40, 0, -4.26, -12.20, m.welcomeMagRear);
        addBox(26.2, 5.42, 1.40, -79.3, -1.01, -12.20, m.welcomeMagRear);
        addBox(110.2, 5.42, 1.40, 25.3, -1.01, -12.20, m.welcomeMagRear);
        addBox(4.8, 5.42, 1.40, 90.0, -1.01, -12.20, m.welcomeMagRear);
        addBox(7.2, 0.85, 1.40, 84.0, 1.275, -12.20, m.welcomeMagRear);
        addBox(7.2, 1.27, 1.40, 84.0, -3.085, -12.20, m.welcomeMagRear);

        for (const sx of [-91.7, 91.7]) {
          addBox(1.40, 7.28, 3.20, sx, -1.16, 9.90, m.welcomeMagRear);
          addBox(1.40, 7.28, 3.20, sx, -1.16, -9.90, m.welcomeMagRear);
          addBox(1.40, 0.53, 16.60, sx, 2.215, 0, m.welcomeMagRear);
          addBox(1.40, 0.85, 16.60, sx, -4.375, 0, m.welcomeMagRear);
        }

        for (const rx of [-56.0, -35.8, -13.0, 54.5]) {
          addBox(0.95, 0.70, 6.6, rx, -4.37, 4.9, m.welcomeCoreSlate);
          addBox(0.95, 0.70, 5.4, rx, -4.37, -4.4, m.welcomeCoreSlate);
        }
        return g;
      },
    },
    {
      id: 'welcome-plinth-top-datum-plate',
      code: 'W170',
      groupKey: 'optical_plinth',
      title: 'W170. 台座天面 ヘアライン加工ステンレス光学基準プレート',
      subtitle: 'Plinth Top Brushed Stainless Steel Optical Datum Reference Plate',
      category: '光学ベンチ台座 / 光学基準面',
      swatchColor: '#98a2b0',
      assembledPos: plPos,
      explodeOffset: [0, -6, 0],
      plainAnalogy: '4文字が一直線に水平に並ぶように基準面を作る、美しいヘアライン仕上げのステンレス天板です。',
      summary: 'SUS304精密研磨トッププレート。4文字ドッキング開口をレーザー切断し、全4文字の高さと傾きを平面度±0.03mmで正確に揃えます。',
      opticsAndPhysics: ['高剛性SUS304基準面により4文字の光軸・正面角度を精密整列。'],
      nextGenInnovation: '4文字着脱開口一体レーザー加工ステンレス基準板。',
      specs: [{ label: '平面度', value: '±0.03 mm (SUS304)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const cutouts: PlinthCutout[] = [
          { kind: 'rect', x: CX_YO - 3.5, z: 0, w: 18.8, d: 10.4 },
          { kind: 'rect', x: CX_U - 5.5, z: 0, w: 18.8, d: 10.4 },
          { kind: 'rect', x: CX_KO, z: 0, w: 18.8, d: 10.4 },
          { kind: 'rect', x: CX_SO + 2.0, z: 0, w: 18.8, d: 10.4 },
          { kind: 'circle', x: -85, z: 8.8, r: 1.32 },
          { kind: 'circle', x: 0, z: 8.8, r: 1.32 },
          { kind: 'circle', x: 85, z: 8.8, r: 1.32 },
          { kind: 'circle', x: -85, z: -8.8, r: 1.32 },
          { kind: 'circle', x: 0, z: -8.8, r: 1.32 },
          { kind: 'circle', x: 85, z: -8.8, r: 1.32 },
        ];
        return buildPlinthRoundedSlab(182.6, 1.00, 24.2, 2.8, 0, 3.36, 0, m.welcomeCoreMid, 0, cutouts);
      },
    },
    {
      id: 'welcome-plinth-bottom-weight',
      code: 'W171',
      groupKey: 'optical_plinth',
      title: 'W171. 底面 SUS304高比重・転倒防止ウェイトベースプレート',
      subtitle: 'Plinth Bottom SUS304 High-Mass Anti-Tipping Counterweight Baseplate',
      category: '光学ベンチ台座 / 重心安定構造',
      swatchColor: '#64748b',
      assembledPos: plPos,
      explodeOffset: [0, -36, 0],
      plainAnalogy: '背の高い立体文字が乗っても絶対にグラついたり倒れたりしないよう、底面を重く安定させるステンレス重り底板です。',
      summary: '厚さ2.4mmのW80Cu20タングステン銅複合・SUS304被覆の高比重底面プレート。実測質量約163gで装置全体の重心を底面近傍へ引き下げ、転倒安定角33°以上を確保すると同時に下方向への放熱も補助します。',
      opticsAndPhysics: ['密度 15.6 g/cm³ のW80Cu20高比重ウェイトにより重心をY軸下方へ下げ、IEC 62368-1 10°転倒試験の3倍超の耐震安定性を実現。'],
      nextGenInnovation: 'W80Cu20高比重カウンターウェイト兼ボトム放熱カバー一体設計。',
      specs: [{ label: '実測質量 / 板厚', value: '163 g / 2.4 mm (W80Cu20複合)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const cutouts: PlinthCutout[] = [
          { kind: 'rect', x: 0, z: 0, w: 36.6, d: 11.6 },
        ];
        for (let i = 0; i < 8; i++) {
          const x = -74 + (i / 7) * 148;
          cutouts.push({ kind: 'circle', x, z: 10.2, r: 1.28 }, { kind: 'circle', x, z: -10.2, r: 1.28 });
        }
        return buildPlinthRoundedSlab(182, 2.24, 24.0, 2.8, 0, -6.00, 0, m.stainlessMachined, 0, cutouts);
      },
    },
    {
      id: 'welcome-plinth-left-endcap',
      code: 'W172',
      groupKey: 'optical_plinth',
      title: 'W172. 左端 CNCアルミエンドキャップ＆放熱対流ルーバー',
      subtitle: 'Plinth Left CNC Aluminum End-Cap with Convection Louver Vents',
      category: '光学ベンチ台座 / 側面外装・吸気',
      swatchColor: '#cbd5e1',
      assembledPos: plPos,
      explodeOffset: [-30, -20, 0],
      plainAnalogy: '台座の左端を保護しつつ、涼しい外気を内部のヒートシンクへ取り込む通気スリット付きアルミカバーです。',
      summary: 'A6061アルミCNC削り出し左エンドキャップ。側面に3D加工の対流吸気ルーバーを刻み、自然対流冷却の吸気口として機能します。',
      opticsAndPhysics: ['冷気吸気口を低位置・左端に設けることで内部ヒートシンクへの水平ドラフト気流を生成。'],
      nextGenInnovation: '防塵ルーバー一体CNC切削サイドキャップ。',
      specs: [{ label: '材質', value: 'A6061-T6 切削アルマイト' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const cap = new THREE.Mesh(new THREE.BoxGeometry(4.4, 9.6, 26.0), m.welcomeTitaniumFace);
        cap.position.set(-94.75, -1.0, 0);
        g.add(cap);
        const slits = qualityLevel() >= 2 ? 5 : 3;
        for (let i = 0; i < slits; i++) {
          const sl = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 16.0), m.matteBlackAnodized);
          sl.position.set(-97.0, -3.2 + i * 1.45, 0);
          g.add(sl);
        }
        return g;
      },
    },
    {
      id: 'welcome-plinth-right-endcap',
      code: 'W173',
      groupKey: 'optical_plinth',
      title: 'W173. 右端 CNCアルミエンドキャップ＆HMI操作パネル枠',
      subtitle: 'Plinth Right CNC Aluminum End-Cap & Rotary HMI Bezel',
      category: '光学ベンチ台座 / 側面外装・操作枠',
      swatchColor: '#cbd5e1',
      assembledPos: plPos,
      explodeOffset: [38, -20, 0],
      plainAnalogy: '台座の右端を保護し、明るさ調整ダイヤルや電源スイッチを取り付ける操作パネル枠を兼ねたアルミカバーです。',
      summary: '右端CNCアルミエンドキャップ。ロータリーエンコーダー軸受ボアと電源スイッチ貫通スロットを備え、操作荷重をシャーシへ確実に逃がします。',
      opticsAndPhysics: ['右手親指・人差し指で直感的に輝度ダイヤルへアクセスできる人間工学配置。'],
      nextGenInnovation: '軸受一体加工のゼロガタHMIサイドパネル。',
      specs: [{ label: '材質', value: 'A6061-T6 切削アルマイト' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const cap = new THREE.Mesh(new THREE.BoxGeometry(4.4, 9.6, 26.0), m.welcomeTitaniumFace);
        cap.position.set(94.75, -1.0, 0);
        const bezel = new THREE.Mesh(createHollowTubeY(5.12, 1.62, 0.50, qRadialSegs(18, 8)), m.welcomeCoreSlate);
        bezel.position.set(91.5, 4.17, 0);
        g.add(cap, bezel);
        return g;
      },
    },
    {
      id: 'welcome-plinth-front-glass-window',
      code: 'W174',
      groupKey: 'optical_plinth',
      title: 'W174. 台座前面 強化ガラス・ステータス導光保護ウィンドウ',
      subtitle: 'Plinth Front Chemically Strengthened Optical Status Window',
      category: '光学ベンチ台座 / 前面光学窓',
      swatchColor: '#9ecbe0',
      assembledPos: plPos,
      explodeOffset: [0, -15, 24],
      plainAnalogy: '台座前面の光るステータスバーと人感センサーをホコリや傷から守る透明な強化ガラス窓です。',
      summary: 'アルミノシリケート強化ガラス製フロントウィンドウ。内面に可視光透過＋ToF用940nm赤外線透過のデュアルARコーティングを施しています。',
      opticsAndPhysics: ['940nm赤外線透過率95%以上を維持しToF人感測距のS/N比を確保。'],
      nextGenInnovation: '可視＋近赤外デュアルバンドAR強化ガラス。',
      specs: [{ label: '赤外線透過率', value: '> 95% (@ 940 nm)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const win = new THREE.Mesh(new THREE.BoxGeometry(176, 3.16, 0.72), m.microlensGlass);
        win.position.set(0, -0.70, 12.52);
        g.add(win);
        return g;
      },
    },
    {
      id: 'welcome-plinth-rubber-feet',
      code: 'W175',
      groupKey: 'optical_plinth',
      title: 'W175. 底面4隅 高摩擦シリコーン防振ゴム脚',
      subtitle: 'Plinth Bottom 4-Corner High-Friction Silicone Anti-Vibration Feet',
      category: '光学ベンチ台座 / 防振・接地',
      swatchColor: '#202328',
      assembledPos: plPos,
      explodeOffset: [0, -44, 0],
      plainAnalogy: 'デスクの上で滑らず、スピーカーの音や机の振動も吸収する底面4隅のすべり止めゴム足です。',
      summary: '静摩擦係数1.1以上の高グリップ・シリコーンエラストマー脚×4個。机面との音響カップリング（ビビリ共振）を絶縁します。',
      opticsAndPhysics: ['4点シリコーンアイソレータにより机への固体伝播振動を -22 dB 絶縁。'],
      nextGenInnovation: 'マイクロ吸盤パターン底面エラストマーパッド。',
      specs: [{ label: '摩擦係数', value: 'μ ≥ 1.1 (ガラス/木面)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const fGeo = new THREE.CylinderGeometry(3.6, 4.0, 0.90, qRadialSegs(14, 8));
        for (const [fx, fz] of [[-83.5, 8.2], [83.5, 8.2], [-83.5, -8.2], [83.5, -8.2]]) {
          const ft = new THREE.Mesh(fGeo, m.epdmGasket);
          ft.position.set(fx, -7.65, fz);
          g.add(ft);
        }
        return g;
      },
    },
    {
      id: 'welcome-plinth-ip54-seal',
      code: 'W176',
      groupKey: 'optical_plinth',
      title: 'W176. 台座外周 IP54シリコーン防塵防滴シールガスケット',
      subtitle: 'Plinth Perimeter IP54 Silicone Dust & Splash Seal Gasket',
      category: '光学ベンチ台座 / 密閉保護',
      swatchColor: '#353840',
      assembledPos: plPos,
      explodeOffset: [0, -9, 0],
      plainAnalogy: '天板と台座本体の合わせ目をぐるっと一周密閉してホコリや水しぶきを防ぐ長尺ゴムパッキンです。',
      summary: '天面基準プレートとマグネシウム中空シャーシ間に配される全周シリコーンガスケット。内部電源基板やバッテリー室への塵埃侵入を防ぎます。',
      opticsAndPhysics: ['全周均一な圧縮シールにより長期間の無人受付設置でも内部絶縁劣化を防止。'],
      nextGenInnovation: 'コーナー肉厚最適化シームレス成型ガスケット。',
      specs: [{ label: '保護等級', value: 'IP54 (台座電子室)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => buildPlinthRoundedSlab(182.0, 0.28, 24.0, 2.5, 0, 2.66, 0, m.epdmGasket, 1.8),
    },
    {
      id: 'welcome-plinth-rear-io-bezel',
      code: 'W177',
      groupKey: 'optical_plinth',
      title: 'W177. 背面 I/Oポート強化アルミベゼルプレート',
      subtitle: 'Plinth Rear Reinforced Aluminum I/O Port Escutcheon Plate',
      category: '光学ベンチ台座 / 背面I/O保護',
      swatchColor: '#64748b',
      assembledPos: plPos,
      explodeOffset: [0, -20, -22],
      plainAnalogy: '背面のUSB-C充電口やサービス端子の周りを補強し、ケーブル抜き差しで傷まないよう守る金属プレートです。',
      summary: 'USB-C PD 65W開口とリセットピンホールを精密加工した背面アルミベゼル。ケーブルこじり荷重をシャーシへ分散します。',
      opticsAndPhysics: ['金属フランジ接地によりUSB-Cシールドの360°EMCボンドを確保。'],
      nextGenInnovation: 'レーザー刻印ポートアイコン付き陽極酸化ベゼル。',
      specs: [{ label: '材質', value: 'A6061-T6 1.5mm厚' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const addP = (w: number, h: number, x: number, y: number) => {
          const p = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.90), m.stainlessMachined);
          p.position.set(x, y, -12.45);
          g.add(p);
        };
        addP(13.25, 5.20, -59.375, -1.00);
        addP(13.25, 5.20, -36.625, -1.00);
        addP(9.50, 1.42, -48.0, 0.89);
        addP(9.50, 0.42, -48.0, -3.39);
        return g;
      },
    },
    {
      id: 'welcome-plinth-m3-torx-screws',
      code: 'W178',
      groupKey: 'optical_plinth',
      title: 'W178. 台座全体締結 M3ステンレス・トルクスねじ群 (16本)',
      subtitle: 'Plinth Structural M3 Stainless Torx Fasteners (16-Piece Set)',
      category: '光学ベンチ台座 / 精密締結',
      swatchColor: '#98a2b0',
      assembledPos: plPos,
      explodeOffset: [0, -48, 0],
      plainAnalogy: '底板・シャーシ・天板・両端キャップをガッチリ一体締結する16本のステンレス製トルクス精密ねじです。',
      summary: 'ISO 14583準拠のM3ステンレス・トルクス（ヘクサロビュラ）ねじ16本。高トルク伝達とカムアウト防止により長寿命メンテ性を確保します。',
      opticsAndPhysics: ['全周16点締結により底板ウェイトと中空マグネシウム骨格の共振モードを高周波側へシフト。'],
      nextGenInnovation: '耐食パッシベーション処理SUS304トルクスファスナー。',
      specs: [{ label: '本数', value: '16本 (M3 × 8 mm)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const pts: Array<[number, number, number]> = [];
        for (let i = 0; i < 8; i++) {
          const x = -74 + (i / 7) * 148;
          pts.push([x, -6.00, 10.2], [x, -6.00, -10.2]);
        }
        return buildHexSocketBolts(pts, 0.70, 2.12, m, 'y', -1);
      },
    },
    {
      id: 'welcome-plinth-datum-dowels',
      code: 'W179',
      groupKey: 'optical_plinth',
      title: 'W179. 台座 精密基準ノックピン群 (H7公差)',
      subtitle: 'Plinth Top-to-Chassis Precision H7 Ground Datum Dowel Pins',
      category: '光学ベンチ台座 / 精密位置決め',
      swatchColor: '#d4a948',
      assembledPos: plPos,
      explodeOffset: [0, -4, 0],
      plainAnalogy: '天板の4文字ソケットと内部のポゴピン基板の位置が絶対にズレないよう合わせる基準ピンです。',
      summary: 'シャーシ・天面基準プレート・4文字ソケット間の相対位置を±0.02mmで固定するH7公差研削ノックピン6本。',
      opticsAndPhysics: ['ポゴピン接点と受電パッドの同軸ズレをゼロ化し安定した大電流接触を保証。'],
      nextGenInnovation: '光学ベンチ準拠6点基準ピン配置。',
      specs: [{ label: '本数', value: '6本 (φ2.5 H7)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) =>
        buildDowelPins(
          [
            [-85, 3.24, 8.8],
            [0, 3.24, 8.8],
            [85, 3.24, 8.8],
            [-85, 3.24, -8.8],
            [0, 3.24, -8.8],
            [85, 3.24, -8.8],
          ],
          0.92,
          1.24,
          m.brassGear,
          'y'
        ),
    },
    {
      id: 'welcome-plinth-compliance-plate',
      code: 'W180',
      groupKey: 'optical_plinth',
      title: 'W180. 底面 レーザー刻印シリアル／CE・技適認証アルミ銘板',
      subtitle: 'Plinth Bottom Laser-Etched Serial & Regulatory Compliance Nameplate',
      category: '光学ベンチ台座 / 製品認証銘板',
      swatchColor: '#cbd5e1',
      assembledPos: plPos,
      explodeOffset: [0, -40, 0],
      plainAnalogy: '製品型番・シリアル番号・電気安全PSE/CE・無線技適マークを永続刻印した金属スペックプレートです。',
      summary: '底面ザグリポケット内へ貼付される陽極酸化アルミ製トレーサビリティ銘板。Wi-Fi/BLE技適番号と65W USB-PD電気定格をレーザー永久刻印します。',
      opticsAndPhysics: ['ザグリ段差内配置により机面擦れによる印字消えを完全防止。'],
      nextGenInnovation: 'QR個体キャリブレーションデータ紐付けシリアル銘板。',
      specs: [{ label: '表記規格', value: 'PSE / CE / FCC / TELEC 技適' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const p = new THREE.Mesh(new THREE.BoxGeometry(36.0, 0.36, 11.0), m.welcomeTitaniumFace);
        p.position.set(0, -6.90, 0);
        g.add(p);
        return g;
      },
    },
    {
      id: 'welcome-plinth-center-beam',
      code: 'W181',
      groupKey: 'optical_plinth',
      title: 'W181. 内部CNCアルミ補強センタービーム＆基板スペーサー柱群',
      subtitle: 'Plinth Internal CNC Aluminum Center Stiffening Beam & PCB Standoffs',
      category: '光学ベンチ台座 / 内部補強骨格',
      swatchColor: '#7c8694',
      assembledPos: plPos,
      explodeOffset: [0, -33, 0],
      plainAnalogy: '台座の中央を背骨のように貫き、マザーボードと電源基板を正確な高さで浮かせて固定する金属支柱です。',
      summary: '長手方向168mmを貫通するI断面アルミ補強ビームと真鍮製M2.5基板スペーサー柱8本。基板のはんだクラックを防ぎます。',
      opticsAndPhysics: ['断面二次モーメントを2.4倍へ強化し、4文字装着時のたわみを極小化。'],
      nextGenInnovation: 'グランド共通化を兼ねた導電性真鍮スペーサー柱。',
      specs: [{ label: '長さ', value: '168 mm 補強ビーム + 8支柱' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const beam = new THREE.Mesh(new THREE.BoxGeometry(166, 0.68, 2.4), m.magnesiumCast);
        beam.position.set(0, -4.32, 0);
        g.add(beam);
        const stGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.68, 6);
        for (let i = 0; i < 8; i++) {
          const st = new THREE.Mesh(stGeo, m.brassGear);
          st.position.set(-72 + i * 20.5, -4.32, i % 2 === 0 ? 9.6 : -9.6);
          g.add(st);
        }
        return g;
      },
    },
    {
      id: 'welcome-plinth-dust-vent-filters',
      code: 'W182',
      groupKey: 'optical_plinth',
      title: 'W182. 側面吸排気 マイクロメッシュ防塵ベントフィルター',
      subtitle: 'Plinth Side Intake/Exhaust Stainless Micro-Mesh Dust Filters',
      category: '光学ベンチ台座 / 通気防塵',
      swatchColor: '#94a3b8',
      assembledPos: plPos,
      explodeOffset: [0, -20, 0],
      plainAnalogy: '冷却用の空気は通しつつ、ホコリや虫が台座の基板室へ入らないように止める極細ステンレス網です。',
      summary: '左右エンドキャップ内側に装着する線径40μmステンレス綾織マイクロメッシュフィルター対。放熱通気と防塵性を両立します。',
      opticsAndPhysics: ['開口率52%の低圧損メッシュにより自然対流気流を阻害せず塵埃を捕集。'],
      nextGenInnovation: '撥水フッ素コート付きSUS316Lマイクロベントメッシュ。',
      specs: [{ label: '目開き', value: '120 μm (開口率 52%)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const fL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 5.2, 16.0), m.stainlessMachined);
        fL.position.set(-90.4, -1.2, 0);
        const fR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 5.2, 16.0), m.stainlessMachined);
        fR.position.set(90.4, -1.2, 0);
        g.add(fL, fR);
        return g;
      },
    },

    // --- 4-Character Independent Docking Sockets & Pogo Receptacles (W183 - W190: 8 parts) ---
    ...([
      { idx: 0, slug: 'yo', ja: 'よ', x: CX_YO - 3.5 },
      { idx: 1, slug: 'u', ja: 'う', x: CX_U - 5.5 },
      { idx: 2, slug: 'ko', ja: 'こ', x: CX_KO },
      { idx: 3, slug: 'so', ja: 'そ', x: CX_SO + 2.0 },
    ] as const).flatMap((d) => {
      const sockCode = `W${183 + d.idx}`;
      const pogoCode = `W${187 + d.idx}`;
      return [
        {
          id: `welcome-plinth-dock-socket-${d.slug}`,
          code: sockCode,
          groupKey: 'optical_plinth',
          title: `${sockCode}. 「${d.ja}」専用 CNCアリ溝ドッキングソケット＆ガイドレール`,
          subtitle: `Plinth "${d.ja}" Dedicated CNC Dovetail Docking Socket & Guide`,
          category: '光学ベンチ台座 / 文字ドッキング機構',
          swatchColor: '#4b586e',
          assembledPos: plPos,
          explodeOffset: [0, -2, 0],
          plainAnalogy: `「${d.ja}」モジュールをピッタリ受け止めてグラつきなく固定する台座側の専用ドッキング溝です。`,
          summary: `「${d.ja}」のダブテールマウントと精密嵌合するCNCアルミ製メス型アリ溝ソケット。バネ式クリックデテントにより確実な装着感を提供します。`,
          opticsAndPhysics: ['60°テーパ両面拘束により全方向ガタつき0.02mm以下の機械保持を実現。'],
          nextGenInnovation: '工具レスワンタッチ着脱ドッキングインターフェース。',
          specs: [{ label: '担当文字', value: `「${d.ja}」専用バイヨネット/アリ溝` }],
          diagramType: 'welcome_optical_plinth',
          build: (m: V2MaterialLibrary) => buildDovetailMount(d.x, 4.02, 0, 18.2, 2.30, 9.8, m, true),
        },
        {
          id: `welcome-plinth-pogo-receptacle-${d.slug}`,
          code: pogoCode,
          groupKey: 'optical_plinth',
          title: `${pogoCode}. 「${d.ja}」受電・CAN-FD 金メッキポゴピンレセプタクル基板`,
          subtitle: `Plinth "${d.ja}" Gold-Plated Pogo-Pin Power & CAN-FD Dock PCB`,
          category: '光学ベンチ台座 / 文字給電端子',
          swatchColor: '#e2b648',
          assembledPos: plPos,
          explodeOffset: [0, -11, 0],
          plainAnalogy: `台座側から「${d.ja}」のバネ式ピンへ12V電源と光り方の指令を直接手渡す金メッキ端子台です。`,
          summary: `ドッキングソケット底部に埋め込まれた6極金メッキ受電ターゲット基板。ハードゴールド1.0μmめっきパッドが「${d.ja}」側ポゴピンと低抵抗接触します。`,
          opticsAndPhysics: ['耐摩耗硬質金めっきパッドにより5万回着脱後も接触抵抗<25mΩを維持。'],
          nextGenInnovation: '文字挿抜自動検出ピン内蔵スマートドック端子。',
          specs: [{ label: '接点', value: '6極 ハードゴールド1.0μm' }],
          diagramType: 'welcome_optical_plinth',
          build: (m: V2MaterialLibrary) => buildPogoPinBlock(d.x, 1.84, 0, m, true),
        },
      ] as WelcomePartDef[];
    }),

    // --- Power, Battery & Thermal System (W191 - W202: 12 parts) ---
    {
      id: 'welcome-plinth-usbc-pd-port',
      code: 'W191',
      groupKey: 'optical_plinth',
      title: 'W191. USB-C PD 65W (20V/3.25A) 受電レセプタクル＆固定ブラケット',
      subtitle: 'Plinth USB-C Power Delivery 65W (20V/3.25A) Stainless Receptacle',
      category: '光学ベンチ台座 / 外部電源入力',
      swatchColor: '#98a2b0',
      assembledPos: plPos,
      explodeOffset: [0, -20, -26],
      plainAnalogy: '市販のスマホやPC用USB-C充電器を差し込むだけで「ようこそ」全体へ最大65Wの電力を取り込める充電ポートです。',
      summary: '24ピン完全実装のミッドマウントSUS304シェルUSB-C PD 3.1受電ポート。最大20V/3.25A（65W）受電とUSBファームウェア更新通信の両方に対応します。',
      opticsAndPhysics: ['4点スルーホール金属シェル固定によりケーブル抜去力100N以上の機械耐久を確保。'],
      nextGenInnovation: 'USB-C PD 3.1 PPS対応の汎用ワンケーブル電源入力。',
      specs: [{ label: '定格入力', value: 'USB-C PD 20V / 3.25A (65W)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => buildUsbCPdReceptacle(-48.0, -1.50, -10.50, m),
    },
    {
      id: 'welcome-plinth-pd-controller-pcb',
      code: 'W192',
      groupKey: 'optical_plinth',
      title: 'W192. USB-C PDネゴシエーションIC＆過電圧保護MOSFET基板',
      subtitle: 'Plinth USB-C PD Negotiation Controller IC & OVP Dual-MOSFET Sub-PCB',
      category: '光学ベンチ台座 / PD電源交渉回路',
      swatchColor: '#1b5e47',
      assembledPos: plPos,
      explodeOffset: [0, -28, 0],
      plainAnalogy: '繋がれたUSB充電器と会話して安全に20Vをもらい、異常な電圧が来たら瞬時に遮断する玄関番チップ基板です。',
      summary: 'CC1/CC2ライン通信を行うUSB-PDコントローラICとバック・トゥ・バック過電圧保護MOSFETを搭載した電源入力サブ基板。',
      opticsAndPhysics: ['24V超の異常サージを 2 μs 以内にゲート遮断し後段のPMIC・バッテリーを保護。'],
      nextGenInnovation: '自律PDプロファイル最適選択＆サーマルフォールドバック保護。',
      specs: [{ label: '過電圧保護', value: '24V OVP / 2μs高速遮断' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = buildMiniPcbBoard(11.2, 0.90, 7.2, -48.0, -3.20, -2.6, m);
        g.add(buildQfnIcPackage(3.8, 0.70, 3.8, -48.0, -2.30, -2.6, m));
        return g;
      },
    },
    {
      id: 'welcome-plinth-pmic-3rail-board',
      code: 'W193',
      groupKey: 'optical_plinth',
      title: 'W193. 3系統同期降圧PMIC電源基板 (20V → 12V / 5V / 3.3V)',
      subtitle: 'Plinth 3-Rail Synchronous Buck PMIC Power Distribution Board',
      category: '光学ベンチ台座 / 統合電源回路',
      swatchColor: '#15803d',
      assembledPos: plPos,
      explodeOffset: [0, -28, 0],
      plainAnalogy: 'USBや電池の電気を、4文字LED用の12V・スピーカー用の5V・マイコン用の3.3Vへ分けて作る司令塔電源基板です。',
      summary: 'LED駆動12V（最大3.5A）・音響5V（2A）・ロジック3.3V（1.5A）の3系統独立同期降圧PMIC基板。外部電源切断時はゼロ瞬断で内蔵LiFePO4バッテリーへ自動切替します。',
      opticsAndPhysics: ['パワーパス制御により充電しながらの最大輝度点灯とUPS無停電動作を両立。'],
      nextGenInnovation: 'ゼロ瞬断パワーパス管理付き3系統高効率PMIC。',
      specs: [{ label: '出力系統', value: '12V 3.5A / 5V 2A / 3.3V 1.5A' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = buildMiniPcbBoard(20.0, 0.95, 12.2, -24.5, -2.80, 0.6, m);
        g.add(buildQfnIcPackage(4.6, 0.72, 4.6, -24.5, -1.86, 0.6, m));
        return g;
      },
    },
    {
      id: 'welcome-plinth-inductor-cap-bank',
      code: 'W194',
      groupKey: 'optical_plinth',
      title: 'W194. 大電流シールドパワーインダクタ＆固体ポリマーコンデンサバンク',
      subtitle: 'Plinth High-Current Shielded Power Inductors & Solid Polymer Cap Bank',
      category: '光学ベンチ台座 / 電源平滑部品',
      swatchColor: '#c97643',
      assembledPos: plPos,
      explodeOffset: [0, -26, 0],
      plainAnalogy: '4文字すべてが一斉にパッと光った瞬間でも電圧が落ち込まないよう、電気を一時蓄える大容量タンク部品です。',
      summary: '飽和電流8Aのメタルコンポジットパワーインダクタ3基と超低ESR導電性高分子アルミ固体コンデンサ4本の平滑バンク。',
      opticsAndPhysics: ['ESR < 12 mΩ の固体コンデンサにより全文字同時PWM点灯時の電源ドロップを30mV未満に抑制。'],
      nextGenInnovation: '長寿命（105℃ 10,000時間）固体ポリマーキャパシタ設計。',
      specs: [{ label: 'ESR', value: '< 12 mΩ 固体ポリマー' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const capGeo = new THREE.CylinderGeometry(1.42, 1.42, 1.75, qRadialSegs(12, 6));
        for (let i = 0; i < 4; i++) {
          const cap = new THREE.Mesh(capGeo, m.stainlessMachined);
          cap.position.set(-31.8 + i * 4.6, -1.32, 4.8);
          g.add(cap);
        }
        for (let i = 0; i < 3; i++) {
          const ind = new THREE.Mesh(new THREE.BoxGeometry(4.0, 1.75, 3.3), m.welcomeCoreSlate);
          ind.position.set(-30.4 + i * 5.8, -1.32, -3.7);
          g.add(ind);
        }
        return g;
      },
    },
    {
      id: 'welcome-plinth-lifepo4-battery',
      code: 'W195',
      groupKey: 'optical_plinth',
      title: 'W195. 内蔵 LiFePO4 リン酸鉄リチウム 2S1P角形UPS電池パック (160mAh/20C)',
      subtitle: 'Plinth Internal 2S1P Prismatic Laminated LiFePO4 20C UPS Failover Pack',
      category: '光学ベンチ台座 / 内蔵電源・無停電',
      swatchColor: '#2563eb',
      assembledPos: plPos,
      explodeOffset: [0, -26, 0],
      plainAnalogy: 'USBケーブルを抜いたり停電したりしても一瞬も消えずに約20分ECO発光を続けられる、燃えにくく超長寿命な薄型安全バッテリーです。',
      summary: '熱暴走耐性に極めて優れたリン酸鉄リチウムイオン（LiFePO4）薄型角形ラミネートセル2直列（6.4V/160mAh・1.02Wh・20C高率放電対応、実体積2.58cc）。充放電3,000サイクル超の長寿命と0ms UPS無停電切替を両立します。',
      opticsAndPhysics: ['オリビン結晶正極により釘刺し・高温下でも酸素放出せず、2.58ccの極薄台座容積内で24時間展示の安全性を確保。'],
      nextGenInnovation: '極薄台座実体積に完全収容した20C高率放電LiFePO4無停電UPSパック。',
      specs: [{ label: '電池容量 / 容積', value: '6.4V 160mAh (1.02 Wh / 2.58 cc)' }, { label: '放電 / 寿命', value: '20C高率 / 3,000サイクル超' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const cellGeo = new THREE.BoxGeometry(29.6, 3.76, 6.3);
        const c1 = new THREE.Mesh(cellGeo, m.cfaBlue);
        c1.position.set(-72.8, -1.20, 3.5);
        const c2 = new THREE.Mesh(cellGeo, m.cfaBlue);
        c2.position.set(-72.8, -1.20, -3.5);
        const tab = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2.0, 10.2), m.silverElectrode);
        tab.position.set(-88.0, -1.20, 0);
        g.add(c1, c2, tab);
        return g;
      },
    },
    {
      id: 'welcome-plinth-bms-cradle',
      code: 'W196',
      groupKey: 'optical_plinth',
      title: 'W196. バッテリー保護BMS基板＆難燃UL94 V-0セルホルダー',
      subtitle: 'Plinth LiFePO4 2S BMS Protection PCB & UL94 V-0 Flame-Retardant Cradle',
      category: '光学ベンチ台座 / 電池安全保護',
      swatchColor: '#353840',
      assembledPos: plPos,
      explodeOffset: [0, -30, 0],
      plainAnalogy: 'バッテリーの過充電・過放電・温度異常を監視して安全を守り、セルをガッチリ保持する難燃ケースです。',
      summary: '2直列セルバランス回路・過充放電遮断IC・NTC温度監視を備えたBMS基板と、UL94 V-0難燃ポリカーボネート製セルクレードル。',
      opticsAndPhysics: ['セル間電圧差を ±10 mV 以内にアクティブバランスしパック寿命を最大化。'],
      nextGenInnovation: '難燃セル隔壁一体クレードル＆高精度クーロンカウンタBMS。',
      specs: [{ label: '難燃規格', value: 'UL94 V-0 / 2Sセルバランス' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const cradle = new THREE.Mesh(new THREE.BoxGeometry(31.0, 0.70, 13.6), m.epdmGasket);
        cradle.position.set(-72.8, -3.55, 0);
        const bms = buildMiniPcbBoard(7.0, 0.70, 6.0, -51.4, -3.45, 5.8, m);
        g.add(cradle, bms);
        return g;
      },
    },
    {
      id: 'welcome-plinth-fin-heatsink',
      code: 'W197',
      groupKey: 'optical_plinth',
      title: 'W197. 静音自然対流 CNCアルミ放熱フィンヒートシンク',
      subtitle: 'Plinth Silent Passive Natural-Convection CNC Aluminum Fin Heatsink',
      category: '光学ベンチ台座 / 放熱機構',
      swatchColor: '#98a2b0',
      assembledPos: plPos,
      explodeOffset: [0, -30, 0],
      plainAnalogy: '電源回路とメインマイコンの熱をファン無し・完全無音で冷やし続けるアルミ製の剣山ヒートシンクです。',
      summary: '押出・CNC複合加工のA6063高熱伝導アルミ放熱フィンブロック。左吸気ルーバーからの自然気流でPMIC・アンプの熱を効率放散します。',
      opticsAndPhysics: ['200 W/(m·K)のA6063アルミと最適化フィンピッチにより騒音0 dBの完全静音動作を実現。'],
      nextGenInnovation: '無音展示環境に特化した低圧損自然対流フィン配列。',
      specs: [{ label: '熱伝導率', value: '200 W/(m·K) A6063' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const base = new THREE.Mesh(new THREE.BoxGeometry(16.8, 0.70, 4.2), m.stainlessMachined);
        base.position.set(-3.5, -3.45, -8.5);
        g.add(base);
        const fins = qualityLevel() === 0 ? 5 : qualityLevel() === 1 ? 8 : qualityLevel() === 2 ? 12 : 16;
        const finGeo = new THREE.BoxGeometry(0.55, 2.00, 4.0);
        for (let i = 0; i < fins; i++) {
          const f = new THREE.Mesh(finGeo, m.stainlessMachined);
          f.position.set(-11.3 + (i / (fins - 1)) * 15.6, -2.10, -8.5);
          g.add(f);
        }
        return g;
      },
    },
    {
      id: 'welcome-plinth-copper-heatpipe',
      code: 'W198',
      groupKey: 'optical_plinth',
      title: 'W198. 電源基板〜ヒートシンク間 無酸素銅フラットヒートパイプ',
      subtitle: 'Plinth PMIC-to-Heatsink Sintered-Wick Flat Copper Heatpipe',
      category: '光学ベンチ台座 / 熱輸送',
      swatchColor: '#d07447',
      assembledPos: plPos,
      explodeOffset: [0, -25, 0],
      plainAnalogy: '内部の液体が蒸発と凝縮をくり返すことで、銅の何十倍もの速さで熱を放熱フィンへ運ぶ熱輸送パイプです。',
      summary: '焼結銅粉ウィック内蔵のφ4mm扁平銅ヒートパイプ。PMIC基板とメインMCUの熱を瞬時に放熱フィンおよびマグネシウム外装へ輸送します。',
      opticsAndPhysics: ['気液相変化による実効熱伝導率 > 5,000 W/(m·K) でホットスポットを完全均熱化。'],
      nextGenInnovation: '極薄2.0mm扁平焼結ウィックヒートパイプ。',
      specs: [{ label: '実効熱伝導率', value: '> 5,000 W/(m·K)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const pipe = new THREE.Mesh(new THREE.BoxGeometry(58.0, 0.72, 2.0), m.copperHeatSpreader);
        pipe.position.set(1.0, -0.56, -8.5);
        g.add(pipe);
        return g;
      },
    },
    {
      id: 'welcome-plinth-thermal-sheet',
      code: 'W199',
      groupKey: 'optical_plinth',
      title: 'W199. 電源・マザーボード密着 高熱伝導サーマルギャップパッドシート',
      subtitle: 'Plinth PMIC & Mainboard Silicone Thermal Interface Sheet',
      category: '光学ベンチ台座 / 熱インターフェース',
      swatchColor: '#7aa4b8',
      assembledPos: plPos,
      explodeOffset: [0, -31, 0],
      plainAnalogy: '基板の裏側とアルミ放熱体のスキマを埋めて熱を無駄なく伝える絶縁放熱クッションシートです。',
      summary: 'PMIC・MCU・オーディオアンプICの上下面へ貼付する6.0 W/(m·K)高熱伝導シリコーンパッドシート。',
      opticsAndPhysics: ['電気絶縁性を維持したまま熱界面インピーダンスを最小化。'],
      nextGenInnovation: '低反発高密着セラミックフィラーTIMシート。',
      specs: [{ label: '熱伝導率', value: '6.0 W/(m·K)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const pad = new THREE.Mesh(new THREE.BoxGeometry(54.0, 0.44, 10.8), m.thermalPadTim);
        pad.position.set(1.5, -3.62, 0.6);
        g.add(pad);
        return g;
      },
    },
    {
      id: 'welcome-plinth-ceramic-fuse',
      code: 'W200',
      groupKey: 'optical_plinth',
      title: 'W200. 過電流保護セラミックヒューズ＆サーマルカットオフスイッチ',
      subtitle: 'Plinth Fast-Acting Ceramic Safety Fuse & Thermal Cutoff Switch',
      category: '光学ベンチ台座 / 安全保護',
      swatchColor: '#f1f5f9',
      assembledPos: plPos,
      explodeOffset: [0, -28, 0],
      plainAnalogy: '万が一の故障で過大な電流や異常発熱が起きた時、確実に電気を止めて発火を防ぐ最終安全ブレーカーです。',
      summary: '遮断容量100Aのセラミック管ヒューズと85℃復帰型バイメタルサーマルプロテクタ。ハードウェア独立の二重安全系を構成します。',
      opticsAndPhysics: ['マイコン暴走時にも独立動作する純物理ハードウェア安全遮断機構。'],
      nextGenInnovation: 'UL/IEC安全規格準拠デュアルフェイルセーフ遮断回路。',
      specs: [{ label: '遮断温度', value: '85°C 物理遮断 / 5Aヒューズ' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const f = new THREE.Mesh(new THREE.BoxGeometry(5.0, 1.85, 2.0), m.pztCeramic);
        f.position.set(-39.0, -2.0, -8.8);
        const cap1 = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.0, 2.15), m.silverElectrode);
        cap1.position.set(-41.1, -2.0, -8.8);
        const cap2 = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.0, 2.15), m.silverElectrode);
        cap2.position.set(-36.9, -2.0, -8.8);
        g.add(f, cap1, cap2);
        return g;
      },
    },
    {
      id: 'welcome-plinth-copper-busbar',
      code: 'W201',
      groupKey: 'optical_plinth',
      title: 'W201. 4文字分配 大電流C1020銅パワーバスバーレール',
      subtitle: 'Plinth 4-Glyph High-Current Oxygen-Free Copper Power Busbar Rail',
      category: '光学ベンチ台座 / 幹線配電',
      swatchColor: '#d07447',
      assembledPos: plPos,
      explodeOffset: [0, -16, 0],
      plainAnalogy: '「よ」「う」「こ」「そ」4文字すべてへ電圧低下ゼロで12Vの電気を一気に届ける太い純銅の電力大通りです。',
      summary: '全幅154mmのC1020銅パワーバスバーペア（+12V／GND）。4基のポゴピン受電基板へ直接分岐し、右端の「そ」まで輝度差ゼロの均等給電を実現します。',
      opticsAndPhysics: ['断面積 4.0 mm² の純銅レールにより全幅端でのIR電圧降下を 5 mV 未満へ抑制。'],
      nextGenInnovation: '積層ラミネート低インダクタンス銅バスバー配電。',
      specs: [{ label: '導体抵抗', value: '< 1.2 mΩ (全幅)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const b1 = new THREE.Mesh(new THREE.BoxGeometry(154, 0.44, 1.8), m.copperHeatSpreader);
        b1.position.set(0, 1.21, 2.3);
        const b2 = new THREE.Mesh(new THREE.BoxGeometry(154, 0.44, 1.8), m.brassGear);
        b2.position.set(0, 1.21, -2.3);
        g.add(b1, b2);
        return g;
      },
    },
    {
      id: 'welcome-plinth-emi-ferrite',
      code: 'W202',
      groupKey: 'optical_plinth',
      title: 'W202. 電源ラインEMI抑制 フェライトコア＆コモンモードフィルタ',
      subtitle: 'Plinth Power-Line EMI Suppression Ferrite Core & Common-Mode Choke',
      category: '光学ベンチ台座 / EMC対策',
      swatchColor: '#2d343e',
      assembledPos: plPos,
      explodeOffset: [0, -28, 0],
      plainAnalogy: 'USBケーブルがアンテナになって周囲へ電磁ノイズを撒き散らさないよう吸収する黒い磁気リングです。',
      summary: 'Ni-Znフェライトトロイダルコアと大電流コモンモードチョーク。10MHz〜500MHz帯の伝導・放射ノイズを大幅に低減します。',
      opticsAndPhysics: ['コモンモードインピーダンス 600 Ω @ 100MHz によりクリーンなEMC特性を保証。'],
      nextGenInnovation: '広帯域ナノ結晶磁気コア採用の超小型コモンモードフィルタ。',
      specs: [{ label: 'インピーダンス', value: '600 Ω @ 100 MHz' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const tor = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.72, 8, qRadialSegs(16, 8)), m.pyroGraphite);
        tor.position.set(-39.0, -2.0, 5.4);
        tor.rotation.x = Math.PI * 0.5;
        g.add(tor);
        return g;
      },
    },

    // --- Intelligence, Sensors, Audio & HMI (W203 - W216: 14 parts) ---
    {
      id: 'welcome-plinth-mainboard',
      code: 'W203',
      groupKey: 'optical_plinth',
      title: 'W203. メイン6層システム制御マザーボード (FR-4)',
      subtitle: 'Plinth 6-Layer Main System Control Motherboard (FR-4)',
      category: '光学ベンチ台座 / 中枢制御基板',
      swatchColor: '#1b5e47',
      assembledPos: plPos,
      explodeOffset: [0, -28, 0],
      plainAnalogy: '人感センサー・無線・音響・4文字の光の演出すべてを束ねる、装置全体の頭脳マザーボードです。',
      summary: '幅44mm×奥行12mmの6層高密度FR-4マザーボード。ARM Cortex-M7、Wi-Fi 6/BLE、CAN-FD 4ch、オーディオDAC、人感・照度インターフェースを統合します。',
      opticsAndPhysics: ['デジタル部とアナログオーディオ部をグラウンドスリット分離し高音質チャイム再生を実現。'],
      nextGenInnovation: '6層ビルドアップHDIによる超薄型インテリジェント統合制御基板。',
      specs: [{ label: '層構成', value: '6層 FR-4 ENIG金めっき' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => buildMiniPcbBoard(44.0, 0.95, 11.8, 29.0, -2.80, 1.5, m),
    },
    {
      id: 'welcome-plinth-cortex-m7-mcu',
      code: 'W204',
      groupKey: 'optical_plinth',
      title: 'W204. ARM Cortex-M7 メインMCU (480MHz)＆QSPIフラッシュメモリ',
      subtitle: 'Plinth 480MHz ARM Cortex-M7 Main MCU & 128Mbit QSPI Flash',
      category: '光学ベンチ台座 / メインプロセッサ',
      swatchColor: '#1d2026',
      assembledPos: plPos,
      explodeOffset: [0, -26, 0],
      plainAnalogy: '来客の接近を検知して「よ→う→こ→そ」の光のウェーブとチャイム音をリアルタイム計算する中央CPUです。',
      summary: '480MHz動作・倍精度FPU内蔵のARM Cortex-M7プロセッサと音声・点灯パターン格納用128Mbit QSPI NORフラッシュ。',
      opticsAndPhysics: ['1ms周期のCAN-FDブロードキャスト同期により4文字のウェーブ位相ズレ 0.05ms 以内を実現。'],
      nextGenInnovation: 'リアルタイム人感ジェスチャー認識対応エッジMCUプラットフォーム。',
      specs: [{ label: 'クロック', value: '480 MHz ARM Cortex-M7' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = buildQfnIcPackage(6.8, 0.86, 6.8, 20.0, -1.78, 1.6, m);
        g.add(buildQfnIcPackage(3.8, 0.76, 3.8, 27.2, -1.84, -0.5, m));
        return g;
      },
    },
    {
      id: 'welcome-plinth-wifi-ble-module',
      code: 'W205',
      groupKey: 'optical_plinth',
      title: 'W205. Wi-Fi 6 / BLE 5.3 無線モジュール＆セラミックチップアンテナ',
      subtitle: 'Plinth Wi-Fi 6 / Bluetooth LE 5.3 RF Module & Ceramic Chip Antenna',
      category: '光学ベンチ台座 / ワイヤレス通信',
      swatchColor: '#94a3b8',
      assembledPos: plPos,
      explodeOffset: [0, -26, 0],
      plainAnalogy: 'スマホアプリから「ようこそ」の明るさ・光り方・ウェルカム音声をワイヤレスで設定できる無線チップです。',
      summary: '技適認証済み金属シールド一体Wi-Fi 6 / BLE 5.3モジュールと2.4/5GHz帯高利得セラミックアンテナ。',
      opticsAndPhysics: ['フロントガラス開口近傍のアンテナクリアランス配置によりマグネシウム筐体内でも安定通信。'],
      nextGenInnovation: 'Matter / BLE即時ペアリング対応スマートウェルカム無線機能。',
      specs: [{ label: '規格', value: 'Wi-Fi 6 (802.11ax) + BLE 5.3' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const mod = new THREE.Mesh(new THREE.BoxGeometry(9.2, 1.15, 6.6), m.midPlateSteel);
        mod.position.set(36.8, -1.64, 0.2);
        const ant = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.85, 1.3), m.pztCeramic);
        ant.position.set(42.4, -1.79, 5.6);
        g.add(mod, ant);
        return g;
      },
    },
    {
      id: 'welcome-plinth-canfd-transceiver',
      code: 'W206',
      groupKey: 'optical_plinth',
      title: 'W206. CAN-FD 4チャネル高速差動トランシーバーIC＆終端抵抗網',
      subtitle: 'Plinth 4-Channel CAN-FD High-Speed Differential Transceiver & Terminators',
      category: '光学ベンチ台座 / 文字間通信バス',
      swatchColor: '#334155',
      assembledPos: plPos,
      explodeOffset: [0, -26, 0],
      plainAnalogy: '台座の頭脳から4文字それぞれのマイコンへ、ノイズに強い車載規格のデジタル信号を届ける通信チップです。',
      summary: '最大5MbpsのCAN-FD差動トランシーバーICと120Ωスプリット終端抵抗網。各文字の個別輝度・温度・装着ステータスを双方向ポーリングします。',
      opticsAndPhysics: ['差動信号伝送によりPWM大電流スイッチング環境でもビットエラーレート 10⁻¹² 未満を達成。'],
      nextGenInnovation: '車載ISO 11898-2準拠の超高信頼4文字同期バス。',
      specs: [{ label: '通信速度', value: '5 Mbps CAN-FD 差動バス' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => buildQfnIcPackage(4.2, 0.76, 3.4, 11.2, -1.84, 3.6, m),
    },
    {
      id: 'welcome-plinth-tof-presence-sensor',
      code: 'W207',
      groupKey: 'optical_plinth',
      title: 'W207. 前面 ToF赤外線人感近接センサー (VL53L5CX)＆IR光学窓',
      subtitle: 'Plinth Front Multi-Zone ToF Infrared Presence Sensor (VL53L5CX)',
      category: '光学ベンチ台座 / 人感自動点灯センサー',
      swatchColor: '#be123c',
      assembledPos: plPos,
      explodeOffset: [0, -20, 22],
      plainAnalogy: '人が近づくと赤外線レーザーの反射時間で距離を測り、自動で「よ→う→こ→そ」と光の歓迎演出を始める目玉センサーです。',
      summary: '940nm不可視VCSELレーザーと8×8マルチゾーンSPADアレイ内蔵のToF測距センサー。前面上部IR専用窓へ遮蔽物ゼロで配置し、最大4m先の来客接近・進行方向を検知します。',
      opticsAndPhysics: ['光速 c の飛行時間 t から距離 d = c·t / 2 をミリメートル精度で即時計測。'],
      formula: { expression: 'd = (c · Δt) / 2', description: '940nm不可視レーザーパルスの往復時間から来客の距離と接近方向を非接触測定。' },
      nextGenInnovation: '8×8マルチゾーンToFによる来客歩行方向連動ウェルカムウェーブ制御。',
      specs: [{ label: '測距範囲', value: '0.05 – 4.0 m (8×8ゾーン)' }, { label: '波長', value: '940 nm Class 1 不可視IR' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const mod = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.0, 1.8), m.icEpoxy);
        mod.position.set(0, -0.25, 10.45);
        const tx = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.44, 10).rotateX(Math.PI / 2), m.irLedLens);
        tx.position.set(-1.5, -0.25, 11.58);
        const rx = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.44, 10).rotateX(Math.PI / 2), m.siliconSensorDie);
        rx.position.set(1.5, -0.25, 11.58);
        g.add(mod, tx, rx);
        return g;
      },
    },
    {
      id: 'welcome-plinth-ambient-lux-sensor',
      code: 'W208',
      groupKey: 'optical_plinth',
      title: 'W208. 高精度デジタル環境光照度センサー (自動輝度最適化)',
      subtitle: 'Plinth Precision Digital Ambient Light Lux Sensor',
      category: '光学ベンチ台座 / 自動調光センサー',
      swatchColor: '#0e94c8',
      assembledPos: plPos,
      explodeOffset: [0, -20, 22],
      plainAnalogy: '部屋が明るい昼間はクッキリ明るく、夜はまぶしすぎない優しい明るさへ自動調整してくれる明るさセンサーです。',
      summary: '0.01 lux〜83,000 luxの超広ダイナミックレンジ照度センサー（I²C出力）。ToF横の上部光学窓へ無遮蔽配置し、周囲環境光に応じて4文字の目標輝度を自動最適化します。',
      opticsAndPhysics: ['赤外カット内蔵デュアルフォトダイオードにより太陽光・蛍光灯・LED照明下で正確なルクス計測。'],
      nextGenInnovation: '人間視覚のヴェーバー・フェヒナー則に基づく自然自動調光アルゴリズム。',
      specs: [{ label: '計測範囲', value: '0.01 – 83,000 lux' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const pkg = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.7, 1.3), m.pztCeramic);
        pkg.position.set(12.0, -0.25, 10.65);
        const lens = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.1, 0.36), m.irCutGlass);
        lens.position.set(12.0, -0.25, 11.50);
        g.add(pkg, lens);
        return g;
      },
    },
    {
      id: 'welcome-plinth-cinnabar-status-bar',
      code: 'W209',
      groupKey: 'optical_plinth',
      title: 'W209. 前面シナバーオレンジ・ステータス導光バー＆RGBW LEDアレイ',
      subtitle: 'Plinth Front Cinnabar-Orange Status Light-Guide Bar & RGBW LEDs',
      category: '光学ベンチ台座 / ステータス発光',
      swatchColor: '#e65a28',
      assembledPos: plPos,
      explodeOffset: [0, -20, 22],
      plainAnalogy: '台座の正面下部を一直線に彩り、上部ToF/照度センサーの視界を一切遮らずに状態を光で伝えるステータスバーです。',
      summary: '全幅174mmのシナバー光学導光バーと背面アドレス指定RGBW LEDストリップ。上部光学窓と垂直分離（1.7mmクリアランス）し、通常時はブランドシナバー点灯、来客検知時に波動発光します。',
      opticsAndPhysics: ['全幅エッジ導光＋マイクロ拡散により連続した1本のレーザーラインのように均一発光。'],
      nextGenInnovation: 'ToF人感連動のインタラクティブ波動ステータスバー。',
      specs: [{ label: '幅', value: '174 mm 光学導光バー' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const bar = new THREE.Mesh(new THREE.BoxGeometry(174, 1.10, 1.10), m.sonyAlphaCinnabar);
        bar.position.set(0, -3.10, 12.25);
        g.add(bar);
        return g;
      },
    },
    {
      id: 'welcome-plinth-welcome-speaker',
      code: 'W210',
      groupKey: 'optical_plinth',
      title: 'W210. 超薄型ネオジム磁気回路フルレンジ・ウェルカムスピーカー',
      subtitle: 'Plinth Slim Neodymium-Magnet Full-Range Welcome Chime Speaker',
      category: '光学ベンチ台座 / 音響出力',
      swatchColor: '#d8dee6',
      assembledPos: plPos,
      explodeOffset: [0, -26, 0],
      plainAnalogy: '人が近づいた時や起動時に、澄んだ心地よいウェルカムチャイム音を奏でる高性能ネオジム小型スピーカーです。',
      summary: 'N52ネオジムマグネットと高剛性カーボン複合振動板を備えた3W超薄型フルレンジスピーカーユニット。ポゴ端子直下に1.5mm離隔配置し、澄んだ倍音のウェルカムチャイムを再生します。',
      opticsAndPhysics: ['高磁束密度N52ネオジム磁気回路により高さ4.5mmの極薄構造でも84 dB/Wの高能率を実現。'],
      nextGenInnovation: '極薄マイクロバスケット＆銅ショートリング低歪み磁気回路。',
      specs: [{ label: '定格出力', value: '3.0 W (4 Ω / 220Hz–18kHz)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => buildWelcomeSpeakerUnit(68.0, -1.35, 0, m),
    },
    {
      id: 'welcome-plinth-speaker-enclosure',
      code: 'W211',
      groupKey: 'optical_plinth',
      title: 'W211. 音響バスレフ共鳴エンクロージャー＆防振ガスケット',
      subtitle: 'Plinth Acoustic Bass-Reflex Resonance Chamber & Isolation Gasket',
      category: '光学ベンチ台座 / 音響箱設計',
      swatchColor: '#353840',
      assembledPos: plPos,
      explodeOffset: [0, -30, 0],
      plainAnalogy: 'スピーカーの音がスカスカにならず豊かに響くように設計された専用の小型スピーカーボックスです。',
      summary: '実効音響容積2.0cc（外形24.0×4.6×17.5mm＋吸音マイクロファイバー充填）の気密ガラス繊維強化ABS音響エンクロージャーと折返しヘルムホルツ共鳴バスレフダクト（Ø2.0×L22.4mm）。背面音波の打ち消しを防ぎ、澄んだウェルカムチャイムを響かせます。',
      opticsAndPhysics: ['実効2.0cc＋Ø2.0×L22.4mm折返しラビリンスによりヘルムホルツ共鳴周波数 f_0 = 440.5 Hz（コンサートピッチA4）へ精密チューニング。'],
      nextGenInnovation: '極薄台座容積でコンサートA4共鳴を実現した折返しラビリンス音響箱。',
      specs: [{ label: '容積 / 同調', value: '2.0 cc / f₀ = 440 Hz (A4)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const addW = (w: number, h: number, d: number, x: number, y: number, z: number) => {
          const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m.epdmGasket);
          mesh.position.set(x, y, z);
          g.add(mesh);
        };
        addW(23.0, 0.70, 17.6, 68.0, -3.53, 0);
        addW(23.0, 3.30, 1.10, 68.0, -1.53, 8.25);
        addW(23.0, 3.30, 1.10, 68.0, -1.53, -8.25);
        addW(1.10, 3.30, 15.4, 57.05, -1.53, 0);
        addW(1.10, 3.30, 15.4, 78.95, -1.53, 0);
        return g;
      },
    },
    {
      id: 'welcome-plinth-audio-dac-amp',
      code: 'W212',
      groupKey: 'optical_plinth',
      title: 'W212. クラスDオーディオアンプIC＆24bit/96kHz DAC回路',
      subtitle: 'Plinth Filterless Class-D Audio Amplifier & 24-Bit/96kHz I²S DAC',
      category: '光学ベンチ台座 / オーディオ回路',
      swatchColor: '#1d2026',
      assembledPos: plPos,
      explodeOffset: [0, -26, 0],
      plainAnalogy: 'マイコンからのデジタル音源をクリアな音に変換し、少ない電力でスピーカーを鳴らす高音質アンプチップです。',
      summary: 'I²Sデジタル直結の24bit/96kHz DAC内蔵・変換効率91%高効率クラスDモノラルアンプIC。S/N比102dBで無音時のホワイトノイズを完全排除します。',
      opticsAndPhysics: ['デジタルI²S入力により基板内アナログ配線長をゼロ化し高周波ノイズ混入を根絶。'],
      nextGenInnovation: 'スマートスピーカー保護（リアルタイム振幅・温度リミッタ）内蔵。',
      specs: [{ label: 'S/N比 / 効率', value: '102 dB / 効率 91%' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => buildQfnIcPackage(4.0, 0.76, 4.0, 47.5, -1.84, 3.6, m),
    },
    {
      id: 'welcome-plinth-rotary-encoder-dial',
      code: 'W213',
      groupKey: 'optical_plinth',
      title: 'W213. 右端 CNCアルミ・ローレット加工ロータリー輝度調整ダイヤル',
      subtitle: 'Plinth Right-End CNC Diamond-Knurled Aluminum Rotary Brightness Dial',
      category: '光学ベンチ台座 / 物理操作HMI',
      swatchColor: '#e2eaf4',
      assembledPos: plPos,
      explodeOffset: [38, -2, 0],
      plainAnalogy: '高級カメラのダイヤルのように指先でカリカリ回して文字の明るさを自在に微調整でき、押し込みでモード切替できるアルミダイヤルです。',
      summary: '36歯ダイヤモンドローレット切削アルミノブ＋光学式24クリックロータリーエンコーダー＆プッシュスイッチ。シナバーアルマイト装飾リング付き。',
      opticsAndPhysics: ['光学式エンコーダーにより機械接点摩耗ゼロ・100万回転以上の高精度クリック操作感を実現。'],
      nextGenInnovation: 'カメラダイヤル品質の重厚トルク感・光学式ロータリーHMI。',
      specs: [{ label: '分解能', value: '24クリック/回転 + プッシュSW' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => buildKnurledRotaryDial(91.5, 5.88, 0, m),
    },
    {
      id: 'welcome-plinth-power-toggle-switch',
      code: 'W214',
      groupKey: 'optical_plinth',
      title: 'W214. 物理メイン電源トグルスイッチ＆タクティルモード切替ボタン',
      subtitle: 'Plinth Physical Main Power Slide Switch & Tactile Mode Button',
      category: '光学ベンチ台座 / 物理操作HMI',
      swatchColor: '#e65a28',
      assembledPos: plPos,
      explodeOffset: [0, -20, -24],
      plainAnalogy: '主電源のON/OFFと、点灯アニメーションの切替を手元で確実に操作できる物理スイッチです。',
      summary: '金メッキ接点の主電源スライドスイッチと作動荷重2.2Nの防水タクティルモード切替スイッチ。待機消費電力ゼロの完全物理電源遮断にも対応します。',
      opticsAndPhysics: ['明確なクリックスナップ感により背面手探りでも誤操作なく確実操作可能。'],
      nextGenInnovation: 'IP67密閉タクティル＋ゼロ待機電力ハードウェア電源SW。',
      specs: [{ label: '耐久回数', value: '100,000 回以上' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(6.2, 2.6, 3.6), m.icEpoxy);
        body.position.set(84.0, -0.8, -10.8);
        const lever = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 1.64), m.sonyAlphaCinnabar);
        lever.position.set(84.0, -0.8, -13.42);
        g.add(body, lever);
        return g;
      },
    },
    {
      id: 'welcome-plinth-internal-harness',
      code: 'W215',
      groupKey: 'optical_plinth',
      title: 'W215. 内部メインポリイミドFPC＆シールド差動ワイヤーハーネス',
      subtitle: 'Plinth Internal Main Polyimide FPC & Shielded Differential Harness',
      category: '光学ベンチ台座 / 内部統合配線',
      swatchColor: '#c76414',
      assembledPos: plPos,
      explodeOffset: [0, -18, 0],
      plainAnalogy: 'マザーボードと前面センサー・4文字ソケット・右端ダイヤル・スピーカーをスッキリ繋ぐ専用内部ハーネス群です。',
      summary: 'インピーダンス制御ポリイミドFPCとシールド差動ツイストペアハーネス。マグネシウム筐体の配線溝へ整然と収まり、誤配線をゼロ化します。',
      opticsAndPhysics: ['差動ツイストペア＋銅箔シールドによりCAN-FD信号とオーディオ信号の相互干渉を遮断。'],
      nextGenInnovation: 'ZIFワンタッチ組立対応のゼロハンダ内部統合ハーネス。',
      specs: [{ label: '構成', value: 'ポリイミドFPC + ツイストペア' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => {
        const g = buildZifConnectorAndFpc(-22.0, 0.55, 5.4, 24.0, 0.55, 5.4, m, 'both', true);
        g.add(buildZifConnectorAndFpc(28.0, 0.55, -5.0, 83.5, 0.55, -5.0, m, 'fpc', true));
        return g;
      },
    },
    {
      id: 'welcome-plinth-main-emi-shield',
      code: 'W216',
      groupKey: 'optical_plinth',
      title: 'W216. マザーボード上部 ニッケルめっき洋白 EMI電磁遮蔽シールド缶',
      subtitle: 'Plinth Mainboard Nickel-Silver Stamped EMI/RFI Shielding Can',
      category: '光学ベンチ台座 / 電磁遮蔽',
      swatchColor: '#94a3b8',
      assembledPos: plPos,
      explodeOffset: [0, -24, 0],
      plainAnalogy: 'メインCPUと無線・電源回路の間の電波干渉をシャットアウトし、安定した通信と高音質を守る金属シールド蓋です。',
      summary: '480MHz Cortex-M7と高速メモリ区画を完全被覆する洋白製EMIシールド缶。無線モジュールとオーディオ回路への高調波飛び込みを徹底遮断します。',
      opticsAndPhysics: ['マルチ区画シールド隔壁により480MHzクロック高調波を -34 dB 減衰。'],
      nextGenInnovation: 'マルチキャビティ一体絞り洋白EMIシールドフレーム。',
      specs: [{ label: '遮蔽効果', value: '> 34 dB (30MHz–2.4GHz)' }],
      diagramType: 'welcome_optical_plinth',
      build: (m) => buildEmiShieldCan(23.6, 1.60, 10.6, 19.6, -1.42, 1.6, m.midPlateSteel, '+y'),
    },
  ];

  all.push(...plinthDefs);
  return all.map((def, idx) => enrichWelcomeDef(def, idx));
}

export const WELCOME_PART_DEFS: readonly WelcomePartDef[] = buildAllWelcome216Defs();

function toExplanation(d: WelcomePartDef): PartExplanation {
  return {
    title: d.title,
    subtitle: d.subtitle,
    category: d.category,
    plainAnalogy: d.plainAnalogy,
    summary: d.summary,
    opticsAndPhysics: [...d.opticsAndPhysics],
    formula: d.formula ? { expression: d.formula.expression, description: d.formula.description } : undefined,
    nextGenInnovation: d.nextGenInnovation,
    specs: d.specs.map((s) => ({ label: s.label, value: s.value })),
    references: d.references ? [...d.references] : undefined,
    diagramType: d.diagramType,
  };
}

/**
 * Build all 220 physically functional, manufacturable 3D volumetric parts of the
 * 「ようこそ」 WLK-220 Optical Kinetic Welcome Signboard (W01 - W220).
 */
export function buildWelcomeParts(mats: V2MaterialLibrary): CadPart[] {
  const out: CadPart[] = [];
  for (let i = 0; i < WELCOME_PART_DEFS.length; i++) {
    const def = WELCOME_PART_DEFS[i];
    const group = def.build(mats);
    group.name = def.id;
    group.position.set(def.assembledPos[0], def.assembledPos[1], def.assembledPos[2]);

    const assembledPos = new THREE.Vector3(def.assembledPos[0], def.assembledPos[1], def.assembledPos[2]);
    const explodeOffset = new THREE.Vector3(def.explodeOffset[0], def.explodeOffset[1], def.explodeOffset[2]);

    out.push({
      id: def.id,
      subsystem: 'welcome',
      order: i + 1,
      swatchColor: def.swatchColor,
      group,
      assembledPos,
      explodeOffset,
      integratedExplodeOffset: explodeOffset.clone(),
      interactiveMeshes: [],
      edgeLines: [],
      explanation: toExplanation(def),
    });
  }
  return out;
}
