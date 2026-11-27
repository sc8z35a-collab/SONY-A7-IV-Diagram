import { PartExplanation } from '../../assemblies/types';
import {
  miraiComparePill,
  MiraiHdSpec,
  miraiKpi,
  miraiPin,
  renderMiraiMonographSvg,
} from './shared';

const FH08_TAG = 'FH08 メタ50mm F1.4 · 88/100点 #1';

const FH08_SPECS: Partial<Record<PartExplanation['diagramType'], MiraiHdSpec>> = {
  mirai_fh08_front_filter_bezel: {
    badge: 'FH08-01',
    fhTag: FH08_TAG,
    zone: 'optic',
    title: 'CNCチタン前枠＆Ø58mmフィルターねじ環（全長28mm起点）',
    analogy: '大口径の前面を守りつつ市販フィルターも付けられる極薄チタン顔面枠',
    metric: 'Ø68 × 全長28mm',
    scaleLabel: 'FILTER Ø58mm · BARREL Ø68mm · 180g',
    accent: '#0f766e',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- Cross-section comparison: 2026 96mm vs 2028 28mm pancake -->
      <rect x="82" y="102" width="290" height="58" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-dasharray="4 3"/>
      <text x="227" y="126" text-anchor="middle" font-size="9.6" font-weight="800" fill="#475569">2026 従来 50mm F1.4 GM：全長 96 mm / 516 g</text>
      <text x="227" y="144" text-anchor="middle" font-size="8.4" font-weight="600" fill="#64748b">11群14枚の回転対称レンズ＋長い空気間隔</text>
      <!-- 2028 FH08 28mm Titanium Front Bezel -->
      <rect x="82" y="178" width="96" height="120" rx="8" fill="url(#${p}_si)"/>
      <rect x="92" y="192" width="76" height="92" rx="5" fill="url(#${p}_metal)" opacity="0.22"/>
      <rect x="82" y="178" width="96" height="8" rx="3" fill="#10b981"/>
      <path d="M 102 198 Q 130 238 102 278" fill="none" stroke="url(#${p}_glass)" stroke-width="10"/>
      <text x="130" y="316" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f766e">2028 FH08：28mm / 180g</text>
      ${miraiPin(108, 184, 212, 198, 1, 'Ø58mm 3段フィルターねじ', '市販ND/PLをそのまま装着', '#0f766e', 'start')}
      ${miraiPin(130, 238, 212, 246, 2, '物理入射瞳 Ø35.7mm 厳守', '50 / 1.4 = 35.71mm の光量', '#0284c7', 'start')}
      ${miraiKpi(496, 102, 192, 92, '全長圧縮率', '約 1 / 3.4', '96 mm → 28 mm パンケーキ', '#0f766e')}
      ${miraiKpi(496, 208, 192, 92, '質量圧縮率', '約 180 g', '516 g → 180 g（約1/3）', '#2563eb')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'エタンデュ保存則(Ø35.7mm)厳守で最短化', line2: '高剛性チタン前枠が極薄鏡筒の歪みを防止' },
      { label: '撮影メリット', line1: '50mm F1.4を常時つけっぱなしにできる軽さ', line2: '市販Ø58mmフィルターをそのまま装着可能' },
      { label: '設計スペック', line1: '外径 Ø68mm / フィルター径 Ø58mm', line2: '全長 28.0mm / 総質量 160〜200g 目標' },
    ],
  },
  mirai_fh08_front_gasket_collar: {
    badge: 'FH08-02',
    fhTag: FH08_TAG,
    zone: 'optic',
    title: '防塵防滴EPDM前群シール＆Ø35.7mm入射瞳規定マスク',
    analogy: '雨粒をシャットアウトし、F1.4に必要な光の入り口を正確に決める黒い絞り枠',
    metric: '入射瞳 Ø35.71 mm',
    scaleLabel: 'D = f / N = 50 / 1.4 = 35.71 mm',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- Entrance pupil law diagram -->
      <circle cx="206" cy="212" r="96" fill="url(#${p}_si)" stroke="#334155" stroke-width="2"/>
      <circle cx="206" cy="212" r="82" fill="#0f766e" opacity="0.28" stroke="#10b981" stroke-width="3" stroke-dasharray="5 3"/>
      <circle cx="206" cy="212" r="64" fill="url(#${p}_glass)" stroke="#eab308" stroke-width="2.6"/>
      <line x1="142" y1="212" x2="270" y2="212" stroke="#b45309" stroke-width="1.8" marker-start="url(#${p}_arr)" marker-end="url(#${p}_arr)"/>
      <text x="206" y="204" text-anchor="middle" font-size="11" font-weight="900" fill="#0f172a">Ø35.71 mm</text>
      <text x="206" y="228" text-anchor="middle" font-size="8.4" font-weight="700" fill="#1e3a8a">物理必須の入射瞳径</text>
      ${miraiPin(282, 174, 336, 134, 1, '連続EPDM防塵防滴リップ', '前枠と第1群の隙間を完全気密', '#059669', 'start')}
      ${miraiPin(264, 236, 336, 206, 2, '黄金基準リング＆迷光ナイフエッジ', '瞳外の斜入射フレアを一次遮断', '#d97706', 'start')}
      ${miraiKpi(346, 250, 338, 74, 'ASIも破れない光学絶対法則', 'D = f / N = 35.7 mm', '口径を偽らず、本物のF1.4ボケと光子量を100%維持', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '50mm F1.4は物理入射瞳Ø35.7mmが絶対必要', line2: '瞳外迷光をナイフエッジ遮光しコントラスト確保' },
      { label: '撮影メリット', line1: 'AI補正に頼らない「本物のF1.4大口径ボケ」', line2: '雨天・砂塵環境でも前群内部への侵入ゼロ' },
      { label: '設計スペック', line1: '規定開口 Ø35.71mm / 連続EPDMガスケット', line2: '植毛級黒色フロック迷光トラップ内蔵' },
    ],
  },
  mirai_fh08_freeform_front_glass: {
    badge: 'FH08-03',
    fhTag: FH08_TAG,
    zone: 'optic',
    title: '第1群：ASI逆設計・大口径自由曲面メニスカス硝子',
    analogy: '超知能が数ミリ秒で最適化した「人間には描けない3次元カーブ」の大口径前玉',
    metric: '非回転対称・自由曲面',
    scaleLabel: 'Ø43.2 mm FREEFORM MENISCUS GLASS',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Freeform curved meniscus cross section with incoming collimated rays -->
      <path d="M 196 112 Q 254 212 196 312 L 234 304 Q 266 212 234 120 Z" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="2.2"/>
      <!-- Incoming parallel light bundle -->
      <line x1="76" y1="138" x2="210" y2="138" stroke="#2563eb" stroke-width="2" marker-end="url(#${p}_arr_b)"/>
      <line x1="76" y1="175" x2="222" y2="175" stroke="#059669" stroke-width="2" marker-end="url(#${p}_arr_g)"/>
      <line x1="76" y1="212" x2="228" y2="212" stroke="#0f766e" stroke-width="2" marker-end="url(#${p}_arr)"/>
      <line x1="76" y1="249" x2="222" y2="249" stroke="#059669" stroke-width="2" marker-end="url(#${p}_arr_g)"/>
      <line x1="76" y1="286" x2="210" y2="286" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_r)"/>
      <!-- Converged refracted rays toward Meta-DOE -->
      <line x1="238" y1="142" x2="386" y2="184" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="4 2"/>
      <line x1="248" y1="212" x2="386" y2="212" stroke="#0f766e" stroke-width="1.8"/>
      <line x1="238" y1="282" x2="386" y2="240" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4 2"/>
      ${miraiPin(222, 134, 290, 108, 1, '非回転対称・多項式自由曲面', 'コマ収差・非点収差を1枚で大幅吸収', '#0284c7', 'start')}
      ${miraiKpi(430, 128, 254, 82, 'ASI微分可能逆設計', '数ヶ月 → 数ミリ秒', '光線追跡＋製造公差を同時最適化', '#0284c7')}
      ${miraiKpi(430, 224, 254, 82, '玉ボケ品質向上', '輪線（玉ねぎ）極小', '精密モールド＆自由曲面位相の協調', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '回転対称の制約を外した3D自由曲面ガラス', line2: '従来3〜4枚の補正群の役割を1枚へ集約' },
      { label: '撮影メリット', line1: '大口径F1.4開放から四隅まで点光源が崩れない', line2: 'パンケーキ厚でも滑らかで美しい玉ボケ' },
      { label: '設計スペック', line1: '有効径 Ø43.2mm / 高屈折率モールド硝材', line2: '多軸超精密ダイヤモンド金型＋ロール公差±0.01°' },
    ],
  },
  mirai_fh08_tio2_meta_doe_plate: {
    badge: 'FH08-04',
    fhTag: FH08_TAG,
    zone: 'active',
    title: '核心：TiO₂ナノピラー・メタDOE色収差補償板',
    analogy: 'ガラス表面に数億本の極小の柱を並べ、光の波長ズレだけを薄さ0.8mmでピタッと揃える魔法の板',
    metric: '負分散・0.8 mm厚',
    scaleLabel: 'TiO2 SUB-WAVELENGTH NANOPILLAR META-DOE',
    accent: '#7c3aed',
    accentSoft: '#f5f3ff',
    art: (p) => `
      <!-- Nanoscale TiO2 nanopillar cross-section correcting R/G/B phase -->
      <rect x="86" y="218" width="320" height="36" rx="4" fill="url(#${p}_glass)" stroke="#0284c7"/>
      <text x="246" y="240" text-anchor="middle" font-size="9" font-weight="800" fill="#1e3a8a">溶融石英基板（厚さ 0.72 mm）</text>
      <!-- Varying width TiO2 nanopillars on top -->
      <g fill="url(#${p}_violet)">
        <rect x="98" y="168" width="12" height="50" rx="2"/>
        <rect x="122" y="176" width="16" height="42" rx="2"/>
        <rect x="150" y="164" width="10" height="54" rx="2"/>
        <rect x="172" y="174" width="18" height="44" rx="2"/>
        <rect x="202" y="162" width="14" height="56" rx="2"/>
        <rect x="228" y="172" width="20" height="46" rx="2"/>
        <rect x="260" y="166" width="11" height="52" rx="2"/>
        <rect x="284" y="174" width="17" height="44" rx="2"/>
        <rect x="314" y="164" width="13" height="54" rx="2"/>
        <rect x="340" y="176" width="18" height="42" rx="2"/>
        <rect x="370" y="168" width="14" height="50" rx="2"/>
      </g>
      <!-- R/G/B rays converging cleanly to single focal plane -->
      <line x1="155" y1="96" x2="155" y2="160" stroke="#2563eb" stroke-width="2.2" marker-end="url(#${p}_arr_b)"/>
      <line x1="246" y1="96" x2="246" y2="160" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_g)"/>
      <line x1="336" y1="96" x2="336" y2="160" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_r)"/>
      <line x1="155" y1="254" x2="246" y2="322" stroke="#2563eb" stroke-width="2"/>
      <line x1="246" y1="254" x2="246" y2="322" stroke="#059669" stroke-width="2"/>
      <line x1="336" y1="254" x2="246" y2="322" stroke="#dc2626" stroke-width="2"/>
      <circle cx="246" cy="322" r="5" fill="#7c3aed"/>
      <text x="246" y="338" text-anchor="middle" font-size="8.8" font-weight="900" fill="#4c1d95">R・G・B 単一点一致（色収差ゼロ化）</text>
      ${miraiKpi(434, 102, 250, 96, '群遅延限界の突破策', '屈折 × メタ併用', '主屈折はガラスが担い、メタ層は\n残留色収差＆高次位相のみ補正', '#7c3aed')}
      ${miraiKpi(434, 214, 250, 96, '量産転写プロセス', 'NIL ナノインプリント', '高屈折TiO₂ナノ柱をウェーハ一括転写\n（±0.01° 真鍮ロール基準枠付）', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'ガラス正分散をメタDOEの負分散で相殺', line2: '群遅延限界を回避するハイブリッド光学構成' },
      { label: '撮影メリット', line1: 'F1.4開放でも紫フリンジ・軸上色収差を劇減', line2: '重い大口径蛍石レンズ数枚分を0.8mmへ置換' },
      { label: '設計スペック', line1: 'TiO₂ナノピラー（高さ~600nm）× 溶融石英', line2: 'NIL量産転写 / 真鍮キー溝ロール整合' },
    ],
  },
  mirai_fh08_optical_spacer_baffle: {
    badge: 'FH08-05',
    fhTag: FH08_TAG,
    zone: 'optic',
    title: '群間3段ナイフエッジ遮光スペーサ＆内面墨塗り環',
    analogy: 'レンズ同士の間隔をミクロン精度で保ちつつ不要な迷光だけを吸い込む3段の黒い壁',
    metric: '間隔精度 ±3 μm',
    scaleLabel: '3-STEP KNIFE-EDGE BAFFLE · R < 0.3%',
    accent: '#334155',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="92" y="120" width="60" height="176" rx="4" fill="url(#${p}_si)"/>
      <polygon points="152,132 184,142 152,152 184,162 152,172 184,182 152,192" fill="#0f172a"/>
      <polygon points="152,224 184,234 152,244 184,254 152,264 184,274 152,284" fill="#0f172a"/>
      <rect x="332" y="120" width="60" height="176" rx="4" fill="url(#${p}_si)"/>
      <polyline points="208,100 176,146 158,156 172,168" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
      <text x="242" y="210" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">有効光束のみ無損失通過</text>
      <line x1="242" y1="100" x2="242" y2="314" stroke="#059669" stroke-width="2.4" marker-end="url(#${p}_arr_g)"/>
      ${miraiPin(178, 152, 420, 140, 1, '3段ナイフエッジ迷光トラップ', 'メタDOE高次回折の微小フレアを吸収', '#334155', 'start')}
      ${miraiKpi(422, 196, 260, 96, 'メタ光学固有の課題対策', '高次回折フレア抑制', '極短28mm鏡筒内の多重反射を\n3段遮光溝＋超低反射コートで封殺', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'メタDOEの不要高次回折光を3段溝で多重吸収', line2: '第1群〜第2群の空気間隔を±3μm厳密維持' },
      { label: '撮影メリット', line1: '逆光撮影でもヌケの良い黒締まりとコントラスト', line2: 'パンケーキ特有のゴースト発生を最小限へ' },
      { label: '設計スペック', line1: 'CNC黒色アルマイト＋植毛級マット塗装', line2: '有効内径 Ø35.0mm / 3段ナイフエッジ' },
    ],
  },
  mirai_fh08_ed_doublet_group: {
    badge: 'FH08-06',
    fhTag: FH08_TAG,
    zone: 'optic',
    title: '第2群：低分散ED＋高屈折フリント接合ダブレット',
    analogy: '性質の違う2枚の特殊ガラスをピタリと貼り合わせ、残った色のズレを根こそぎ消す名コンビ',
    metric: 'アッベ数差 Δνd > 48',
    scaleLabel: 'ED CROWN + HIGH-INDEX FLINT DOUBLET',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- Positive ED + Negative Flint cemented doublet -->
      <path d="M 186 122 Q 226 212 186 302 L 222 296 Q 238 212 222 128 Z" fill="url(#${p}_green)" fill-opacity="0.45" stroke="#059669" stroke-width="2"/>
      <path d="M 222 128 Q 238 212 222 296 L 254 302 Q 236 212 254 122 Z" fill="url(#${p}_cyan)" fill-opacity="0.42" stroke="#0284c7" stroke-width="2"/>
      <line x1="94" y1="162" x2="360" y2="196" stroke="#2563eb" stroke-width="2" marker-end="url(#${p}_arr_b)"/>
      <line x1="94" y1="212" x2="360" y2="212" stroke="#059669" stroke-width="2" marker-end="url(#${p}_arr_g)"/>
      <line x1="94" y1="262" x2="360" y2="228" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_r)"/>
      ${miraiPin(204, 152, 286, 114, 1, '低分散ED凸ガラス', '異常部分分散で2次スペクトル補正', '#059669', 'start')}
      ${miraiPin(242, 276, 286, 306, 2, '高屈折フリント凹ガラス', 'UV光学接着で界面反射ゼロ', '#0284c7', 'start')}
      ${miraiKpi(438, 152, 246, 112, 'メタDOEとの分業', '広帯域アポクロマート', '400〜700nm全域の色ズレを\nガラス屈折×メタ位相で二重補正', '#059669')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'ED凸＋高屈折凹をUV接着し界面反射を消去', line2: 'メタDOEと協調し400–700nm広帯域色補正' },
      { label: '撮影メリット', line1: '木漏れ日や金属光沢のフリンジを徹底排除', line2: '色滲みのない鋭いマイクロコントラスト' },
      { label: '設計スペック', line1: '外径 Ø36.4mm / 2枚接合ダブレット', line2: '外周エメラルドED識別コバ塗り処理' },
    ],
  },
  mirai_fh08_iris_blade_array: {
    badge: 'FH08-07',
    fhTag: FH08_TAG,
    zone: 'optic',
    title: '9枚円形絞り羽根アレイ＆真鍮スリットカム環',
    analogy: '9枚の極薄カーブ金属羽根が一斉にすべり込み、どんな絞り値でも丸い玉ボケを作る精密シャッター',
    metric: '9枚円形絞り F1.4–F16',
    scaleLabel: '9 CURVED CARBON-METAL BLADES · 0.16mm',
    accent: '#d97706',
    accentSoft: '#fffbeb',
    art: (p) => `
      <circle cx="212" cy="212" r="98" fill="url(#${p}_gold)" opacity="0.28" stroke="#b45309" stroke-width="2"/>
      <circle cx="212" cy="212" r="82" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
      <circle cx="212" cy="212" r="46" fill="#ffffff" stroke="#d97706" stroke-width="2"/>
      <!-- 9 blade tangent lines showing circular iris -->
      <g stroke="#94a3b8" stroke-width="1.6">
        <line x1="212" y1="166" x2="282" y2="178"/><line x1="241" y1="176" x2="292" y2="232"/>
        <line x1="256" y1="204" x2="262" y2="278"/><line x1="248" y1="238" x2="204" y2="294"/>
        <line x1="222" y1="256" x2="152" y2="266"/><line x1="186" y1="250" x2="132" y2="204"/>
        <line x1="168" y1="224" x2="154" y2="152"/><line x1="174" y1="188" x2="210" y2="130"/>
        <line x1="196" y1="168" x2="264" y2="148"/>
      </g>
      <text x="212" y="216" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0f172a">真円開口</text>
      ${miraiPin(284, 182, 344, 134, 1, '真鍮スリット駆動カム環', '9本のピンを均等角度で同時開閉', '#b45309', 'start')}
      ${miraiPin(252, 238, 344, 200, 2, '0.16mm 湾曲マット金属羽根×9', 'F2.8〜F4でも真円に近い玉ボケ', '#334155', 'start')}
      ${miraiKpi(352, 246, 330, 74, '薄型鏡筒への極限実装', '全厚 1.6 mm ユニット', '低摩擦DLCコートで120fps連写の高速絞り制御に対応', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '9枚湾曲羽根を真鍮カム溝で同時摺動開閉', line2: 'ユニット全厚1.6mmに収めた超薄型絞り群' },
      { label: '撮影メリット', line1: 'F2〜F4へ絞っても角ばらない美しい円形ボケ', line2: '120fps高速連写・動画露出変化へ無段階追従' },
      { label: '設計スペック', line1: '羽根厚 0.16mm / DLC低反射潤滑コート', line2: 'F1.4〜F16 電磁ステッピング制御' },
    ],
  },
  mirai_fh08_iris_stepper_motor: {
    badge: 'FH08-08',
    fhTag: FH08_TAG,
    zone: 'link',
    title: '超薄型アーク状ステッピング絞りアクチュエータ＆ギヤ列',
    analogy: '鏡筒の丸いフチに沿う三日月形の超極薄モーターで、無音かつ正確に絞りを動かす動力部',
    metric: '1/8段・無音マイクロ制御',
    scaleLabel: 'ARC STEPPER + 2-STAGE MICRO SPUR GEARS',
    accent: '#c2410c',
    accentSoft: '#fff7ed',
    art: (p) => `
      <path d="M 140 278 A 120 120 0 0 1 286 122 L 306 154 A 84 84 0 0 0 176 264 Z" fill="url(#${p}_metal)" stroke="#475569" stroke-width="1.8"/>
      <circle cx="196" cy="214" r="14" fill="url(#${p}_cu)"/>
      <circle cx="228" cy="180" r="14" fill="url(#${p}_cu)"/>
      <circle cx="266" cy="156" r="14" fill="url(#${p}_cu)"/>
      <circle cx="332" cy="186" r="24" fill="url(#${p}_gold)" stroke="#9a3412" stroke-width="2" stroke-dasharray="4 3"/>
      <circle cx="378" cy="214" r="30" fill="url(#${p}_metal)" stroke="#334155" stroke-width="2" stroke-dasharray="5 3"/>
      ${miraiPin(228, 180, 114, 134, 1, 'アーク状3連銅コイル', '鏡筒曲率に沿う2.4mm超薄型配置', '#c2410c', 'start')}
      ${miraiPin(358, 200, 426, 146, 2, '2段マイクロ平歯車減速', 'バックラッシ極小でシネマ絞り送りに最適', '#b45309', 'start')}
      ${miraiKpi(430, 210, 250, 96, '動画・静止画両立', '静音マイクロステップ', '収録中マイクに載らない静音動作＋\nフォトインタラプタ原点検出', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '鏡筒円弧に沿う薄型3相ステッピング固定子', line2: '2段平歯車＋光学原点センサーで高精度位置決め' },
      { label: '撮影メリット', line1: '動画撮影中の滑らか・無音なアイリス変化', line2: '露出ステップ段差のない自然な明暗追従' },
      { label: '設計スペック', line1: 'アーク厚 2.4mm / 1/8 EV ステップ分解能', line2: '光学フォトインタラプタ原点リセット内蔵' },
    ],
  },
  mirai_fh08_focus_freeform_cell: {
    badge: 'FH08-09',
    fhTag: FH08_TAG,
    zone: 'optic',
    title: '第3群：軽量フローティング自由曲面フォーカス群',
    analogy: 'わずか数グラムの軽いレンズ枠だけを前後に高速スライドさせ、一瞬でピントを合わせる心臓レンズ',
    metric: '移動質量 < 9 g',
    scaleLabel: 'FLOATING ASPHERIC CELL · Mg CARRIER',
    accent: '#0ea5e9',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Floating focus lens sliding along Z guide rails -->
      <line x1="104" y1="138" x2="380" y2="138" stroke="#64748b" stroke-width="5"/>
      <line x1="104" y1="286" x2="380" y2="286" stroke="#64748b" stroke-width="5"/>
      <rect x="216" y="128" width="44" height="20" rx="4" fill="url(#${p}_gold)"/>
      <rect x="216" y="276" width="44" height="20" rx="4" fill="url(#${p}_gold)"/>
      <rect x="226" y="146" width="24" height="132" rx="4" fill="url(#${p}_metal)" stroke="#475569"/>
      <path d="M 228 158 Q 252 212 228 266 L 246 262 Q 260 212 246 162 Z" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="2"/>
      <!-- Double-headed focus motion arrow -->
      <line x1="146" y1="212" x2="334" y2="212" stroke="#0284c7" stroke-width="2.4" marker-start="url(#${p}_arr_b)" marker-end="url(#${p}_arr_b)"/>
      <text x="240" y="196" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0369a1">高速インナーフォーカス ±2.8mm</text>
      ${miraiKpi(416, 114, 266, 86, '極軽量インナーフォーカス', '移動部 < 9 g', 'マグネシウム薄肉枠＋自由曲面1枚で\n近接0.25mまで球面収差変動ゼロ', '#0284c7')}
      ${miraiKpi(416, 214, 266, 86, 'ブリージング極小化', '画角変動 < 0.8%', 'ASI逆設計でフォーカス時の画角変化を抑制', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '軽量Mg枠の単一自由曲面群のみを内部駆動', line2: '焼結含油ブロンズ軸受で低摺動・高剛性直進' },
      { label: '撮影メリット', line1: '全長が伸び縮みしない防塵インナーフォーカス', line2: '動画フォーカス送り時のブリージングを最小化' },
      { label: '設計スペック', line1: 'レンズ有効径 Ø33.2mm / ストローク ±2.8mm', line2: '最短撮影距離 0.25 m（最大倍率 0.24×）' },
    ],
  },
  mirai_fh08_linear_voicecoil_pair: {
    badge: 'FH08-10',
    fhTag: FH08_TAG,
    zone: 'link',
    title: 'デュアル対向・高推力リニアボイスコイル＆SUSガイド軸',
    analogy: 'リニアモーターカーと同じ磁石とコイルの力で、ギヤを介さず無音＆爆速でピントを動かす両翼エンジン',
    metric: '推力対質量比 3×',
    scaleLabel: 'DUAL N52 LINEAR VCM · 120fps AF TRACKING',
    accent: '#d97706',
    accentSoft: '#fffbeb',
    art: (p) => `
      <!-- Dual symmetrical linear actuators left & right of focus cell -->
      <rect x="92" y="122" width="112" height="176" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <rect x="108" y="138" width="24" height="144" rx="4" fill="url(#${p}_metal)"/>
      <rect x="136" y="148" width="18" height="124" rx="3" fill="#e2e8f0" stroke="#475569"/>
      <text x="145" y="214" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f172a">N52</text>
      <rect x="160" y="168" width="28" height="84" rx="4" fill="url(#${p}_cu)"/>
      <text x="174" y="214" text-anchor="middle" font-size="8" font-weight="900" fill="#ffffff">COIL</text>
      <!-- Lorentz Force equation card -->
      <rect x="228" y="124" width="176" height="172" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.4"/>
      <text x="316" y="154" text-anchor="middle" font-size="10.2" font-weight="900" fill="#92400e">ローレンツ力 F = B·I·L</text>
      <text x="316" y="182" text-anchor="middle" font-size="8.8" font-weight="700" fill="#334155">対向2基バランス推力で</text>
      <text x="316" y="198" text-anchor="middle" font-size="8.8" font-weight="700" fill="#334155">傾きモーメント＝完全ゼロ</text>
      <line x1="252" y1="226" x2="380" y2="226" stroke="#d97706" stroke-width="2.4" marker-start="url(#${p}_arr)" marker-end="url(#${p}_arr)"/>
      <text x="316" y="250" text-anchor="middle" font-size="8.6" font-weight="800" fill="#b45309">非接触・バックラッシ 0 μm</text>
      <text x="316" y="274" text-anchor="middle" font-size="8.2" font-weight="700" fill="#64748b">SUS304研磨ガイド軸 ×2</text>
      ${miraiKpi(426, 124, 258, 80, 'AF追従レスポンス', '120 fps 完全追従', '超軽量9gフォーカス群を瞬時加減速', '#d97706')}
      ${miraiKpi(426, 218, 258, 80, '動画静音性', '完全無音リニア駆動', '歯車・ねじ音ゼロで内蔵マイク収録対応', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'ネオジムN52磁石×銅コイルの左右対向推力', line2: '重心対称駆動でフォーカス群の傾きを防止' },
      { label: '撮影メリット', line1: '120fps連写＆瞳AFへ瞬時・無音で食いつく', line2: '歯車ガタゼロで4K/8K動画AFも滑らか' },
      { label: '設計スペック', line1: 'SUS304研磨ガイド軸×2 / 銅ボビンコイル×2', line2: '位置応答遅延 < 0.8 ms' },
    ],
  },
  mirai_fh08_magnetic_encoder: {
    badge: 'FH08-11',
    fhTag: FH08_TAG,
    zone: 'link',
    title: '磁気リニアエンコーダスケール＆サブミクロンMRセンサー',
    analogy: '髪の毛の100分の1以下の細かさでレンズの位置を常に読み取る超精密な磁気ものさし',
    metric: '分解能 ≤ 0.2 μm',
    scaleLabel: 'INVAR MAGNETIC SCALE + QUADRATURE MR IC',
    accent: '#f59e0b',
    accentSoft: '#fffbeb',
    art: (p) => `
      <!-- Magnetic N-S alternating scale strip -->
      <rect x="86" y="138" width="316" height="44" rx="5" fill="#f1f5f9" stroke="#475569"/>
      <g>
        <rect x="96" y="144" width="26" height="32" fill="#2563eb"/><text x="109" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">N</text>
        <rect x="126" y="144" width="26" height="32" fill="#dc2626"/><text x="139" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">S</text>
        <rect x="156" y="144" width="26" height="32" fill="#2563eb"/><text x="169" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">N</text>
        <rect x="186" y="144" width="26" height="32" fill="#dc2626"/><text x="199" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">S</text>
        <rect x="216" y="144" width="26" height="32" fill="#2563eb"/><text x="229" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">N</text>
        <rect x="246" y="144" width="26" height="32" fill="#dc2626"/><text x="259" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">S</text>
        <rect x="276" y="144" width="26" height="32" fill="#2563eb"/><text x="289" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">N</text>
        <rect x="306" y="144" width="26" height="32" fill="#dc2626"/><text x="319" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">S</text>
        <rect x="336" y="144" width="26" height="32" fill="#2563eb"/><text x="349" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">N</text>
        <rect x="366" y="144" width="26" height="32" fill="#dc2626"/><text x="379" y="164" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">S</text>
      </g>
      <!-- MR readhead + sine/cosine wave -->
      <rect x="194" y="198" width="96" height="38" rx="6" fill="url(#${p}_si)" stroke="#f59e0b" stroke-width="2"/>
      <text x="242" y="221" text-anchor="middle" font-size="9.4" font-weight="900" fill="#fde047">MR 読取ヘッド</text>
      <path d="M 96 286 Q 126 254 156 286 T 216 286 T 276 286 T 336 286 T 396 286" fill="none" stroke="#0284c7" stroke-width="2.2"/>
      <path d="M 111 286 Q 141 254 171 286 T 231 286 T 291 286 T 351 286" fill="none" stroke="#10b981" stroke-width="1.8" stroke-dasharray="4 2"/>
      <text x="246" y="320" text-anchor="middle" font-size="8.6" font-weight="700" fill="#334155">A/B直交正弦波を12bit内挿 → 0.2 μm 位置サーボ</text>
      ${miraiKpi(430, 120, 252, 90, 'F1.4極薄ピント保証', '≤ 0.2 μm 位置精度', '6,000万画素級の高解像度でも\nピント面のズレを完全に排除', '#f59e0b')}
      ${miraiKpi(430, 224, 252, 90, '低熱膨張インバー基材', 'CTE ≈ 1.2 ppm/K', '寒冷地〜炎天下でも無限遠ズレ防止', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'N/S着磁インバー尺をMR素子が0.15mm空隙読取', line2: 'A/B相正弦波の高分解能補間で0.2μm閉ループ制御' },
      { label: '撮影メリット', line1: 'F1.4開放の極薄被写界深度でもピント歩留まり極大', line2: '手動MF時も遅延ゼロのリニア応答を実現' },
      { label: '設計スペック', line1: '磁気ピッチ 200μm / 位置分解能 0.2μm', line2: 'インバー低膨張スケール＋差動FPC伝送' },
    ],
  },
  mirai_fh08_rear_corrector_lens: {
    badge: 'FH08-12',
    fhTag: FH08_TAG,
    zone: 'optic',
    title: '第4群：像面湾曲補正・大口径リア非球面レンズ＆真鍮シム',
    analogy: 'センサー直前で斜めの光をまっすぐ起こし、写真の四隅までクッキリ届ける仕上げのレンズ',
    metric: '周辺入射角 < 16°',
    scaleLabel: 'Ø38.4 mm REAR FIELD FLATTENER · CRA MATCH',
    accent: '#06b6d4',
    accentSoft: '#ecfeff',
    art: (p) => `
      <!-- Rear corrector bending steep peripheral rays telecentrically into 36x24 sensor -->
      <path d="M 184 114 Q 162 212 184 310 L 216 300 Q 244 212 216 124 Z" fill="url(#${p}_glass)" stroke="#0891b2" stroke-width="2"/>
      <rect x="336" y="128" width="16" height="168" rx="3" fill="url(#${p}_si)"/>
      <text x="378" y="216" text-anchor="middle" font-size="9" font-weight="900" fill="#0f172a" transform="rotate(-90 378 216)">36×24mm センサー</text>
      <polyline points="88,144 198,136 334,142" fill="none" stroke="#2563eb" stroke-width="2.2" marker-end="url(#${p}_arr_b)"/>
      <polyline points="88,212 198,212 334,212" fill="none" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_g)"/>
      <polyline points="88,280 198,288 334,282" fill="none" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_r)"/>
      ${miraiPin(204, 134, 240, 102, 1, '像面湾曲＆周辺光線角補正', 'ショートフランジ18mmの斜入射を緩和', '#0891b2', 'start')}
      ${miraiKpi(424, 120, 260, 88, 'FH01/FH02センサー整合', 'CRA ≤ 16° テレセントリック', 'フルサイズ周辺部でも色被り・減光を最小化', '#0891b2')}
      ${miraiKpi(424, 222, 260, 88, '工場個体チルト校正', '真鍮エッチングシム', '5μm刻みシムで片ボケを最終調整', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'ショートフランジ18mm特有の像面湾曲を最終補正', line2: '周辺主光線角(CRA)を起こしセンサー受光効率維持' },
      { label: '撮影メリット', line1: 'F1.4開放の周辺光量落ちと周辺流れを大幅低減', line2: 'FH01 SPAD・FH02 3層RGBとの最適光学マッチング' },
      { label: '設計スペック', line1: '有効径 Ø38.4mm 両面非球面モールドガラス', line2: '5μmステップ真鍮チルト調整シム付' },
    ],
  },
  mirai_fh08_outer_focus_ring: {
    badge: 'FH08-13',
    fhTag: FH08_TAG,
    zone: 'pkg',
    title: 'CNCアルミ72山ローレット制御リング＆レーザー銘板帯',
    analogy: '指先に吸い付く72山の精密ローレット刻みと、未来スペックを刻んだ高級金属リング',
    metric: '72山 CNCローレット',
    scaleLabel: 'Ø68.0 mm ANODIZED RING · LASER SCALE',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <rect x="86" y="114" width="320" height="104" rx="10" fill="url(#${p}_si)" stroke="#334155" stroke-width="1.8"/>
      <!-- Knurl teeth strip -->
      <g fill="#64748b">
        <rect x="96" y="122" width="6" height="40"/><rect x="110" y="122" width="6" height="40"/><rect x="124" y="122" width="6" height="40"/>
        <rect x="138" y="122" width="6" height="40"/><rect x="152" y="122" width="6" height="40"/><rect x="166" y="122" width="6" height="40"/>
        <rect x="180" y="122" width="6" height="40"/><rect x="194" y="122" width="6" height="40"/><rect x="208" y="122" width="6" height="40"/>
        <rect x="222" y="122" width="6" height="40"/><rect x="236" y="122" width="6" height="40"/><rect x="250" y="122" width="6" height="40"/>
        <rect x="264" y="122" width="6" height="40"/><rect x="278" y="122" width="6" height="40"/><rect x="292" y="122" width="6" height="40"/>
        <rect x="306" y="122" width="6" height="40"/><rect x="320" y="122" width="6" height="40"/><rect x="334" y="122" width="6" height="40"/>
        <rect x="348" y="122" width="6" height="40"/><rect x="362" y="122" width="6" height="40"/><rect x="376" y="122" width="6" height="40"/>
        <rect x="390" y="122" width="6" height="40"/>
      </g>
      <!-- Nameplate engraving strip -->
      <rect x="86" y="168" width="320" height="40" fill="#1e293b"/>
      <rect x="86" y="168" width="320" height="3" fill="#10b981"/>
      <text x="246" y="188" text-anchor="middle" font-size="9.5" font-weight="900" fill="#f8fafc">FE 50mm F1.4 META · 28mm ASI</text>
      <text x="246" y="202" text-anchor="middle" font-size="7.6" font-weight="700" fill="#34d399">FREEFORM + TiO2 DOE | PUPIL Ø35.7mm | 180g</text>
      ${miraiComparePill(86, 240, 320, 'ゴム製フォーカスリング（経年劣化・白化）', false)}
      ${miraiComparePill(86, 272, 320, '総削り出し72山金属ローレット＋電子リニアMF', true)}
      ${miraiKpi(430, 118, 252, 86, 'リニアレスポンスMF', '回転角 1:1 精密追従', 'シネマ並みの再現性あるピント送り', '#475569')}
      ${miraiKpi(430, 218, 252, 86, '外装耐久性', '硬質アルマイト刻印', '繊維レーザー刻印で摩耗剥がれゼロ', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '72山CNC金属ローレット＋非接触磁気回転検知', line2: 'ゴム劣化ゼロ・手袋装着時でも確実な指掛かり' },
      { label: '撮影メリット', line1: '動画撮影でも再現性の高いリニアMF操作', line2: '薄型28mmでもしっかり握れるエルゴノミクス' },
      { label: '設計スペック', line1: '外径 Ø68.0mm / A6061-T6硬質アルマイト', line2: '繊維レーザー刻印銘板＆チタン境界リング' },
    ],
  },
  mirai_fh08_inner_mg_barrel: {
    badge: 'FH08-14',
    fhTag: FH08_TAG,
    zone: 'pkg',
    title: '一体切削マグネシウム主鏡筒＆3方肉抜き剛性骨格',
    analogy: '軽さと頑丈さを極めた航空機グレードのマグネシウム骨格で、全光学群の軸を狂わせない主柱',
    metric: '部品点数 -65%削減',
    scaleLabel: 'CNC AZ91D Mg BARREL · TOPOLOGY RIBS',
    accent: '#64748b',
    accentSoft: '#f8fafc',
    art: (p) => `
      <rect x="92" y="114" width="290" height="190" rx="14" fill="url(#${p}_metal)" stroke="#475569" stroke-width="2"/>
      <rect x="116" y="138" width="242" height="142" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-dasharray="4 2"/>
      <!-- 3 structural access windows -->
      <rect x="132" y="156" width="62" height="106" rx="8" fill="#e2e8f0" stroke="#475569"/>
      <text x="163" y="212" text-anchor="middle" font-size="8.4" font-weight="800" fill="#334155">VCM窓</text>
      <rect x="206" y="156" width="62" height="106" rx="8" fill="#e2e8f0" stroke="#475569"/>
      <text x="237" y="212" text-anchor="middle" font-size="8.4" font-weight="800" fill="#334155">絞り窓</text>
      <rect x="280" y="156" width="62" height="106" rx="8" fill="#e2e8f0" stroke="#475569"/>
      <text x="311" y="212" text-anchor="middle" font-size="8.4" font-weight="800" fill="#334155">MR窓</text>
      ${miraiKpi(412, 114, 270, 86, '部品点数の構造革命', '150点 → 45点級', 'ASI公差込み設計で鏡筒部品と\n偏心調整工程を劇的に削減', '#0f766e')}
      ${miraiKpi(412, 214, 270, 86, '軽量高剛性骨格', 'AZ91D Mg 一体切削', '180gの超軽量とプロ耐衝撃を両立', '#475569')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '3方アクセス窓付き一体CNCマグネシウム鏡筒', line2: 'ASIトポロジー肉抜きで共振剛性と軽量を両立' },
      { label: '撮影メリット', line1: '180gの軽さながらプロ現場の衝撃・寒暖に耐える', line2: '左側面フォーカスホールドボタンも直感配置' },
      { label: '設計スペック', line1: '外径 Ø65.6mm / AZ91Dマグネシウム合金', line2: '自由曲面ロール偏心基準キー溝一体加工' },
    ],
  },
  mirai_fh08_curved_mcu_pcb: {
    badge: 'FH08-15',
    fhTag: FH08_TAG,
    zone: 'link',
    title: '環状リジッドフレックス制御基板＆個体3D波面PSF-ROM',
    analogy: 'レンズ1本ごとのわずかなクセを丸暗記し、ボディ側AIへ瞬時に渡す「個体カルテ内蔵の頭脳リング」',
    metric: 'FH24個体PSF協調復元',
    scaleLabel: 'ANNULAR HDI PCB · 3D WAVEFRONT PSF-ROM',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <circle cx="206" cy="212" r="96" fill="url(#${p}_green)" stroke="#065f46" stroke-width="2"/>
      <circle cx="206" cy="212" r="64" fill="#ffffff" stroke="#065f46" stroke-width="1.6"/>
      <!-- MCU & PSF-ROM chips on ring -->
      <rect x="184" y="122" width="44" height="24" rx="4" fill="url(#${p}_si)" stroke="#eab308"/>
      <text x="206" y="138" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">MCU</text>
      <rect x="256" y="232" width="42" height="26" rx="4" fill="#1e3a8a" stroke="#38bdf8"/>
      <text x="277" y="248" text-anchor="middle" font-size="7.6" font-weight="900" fill="#bae6fd">PSF-ROM</text>
      <text x="206" y="216" text-anchor="middle" font-size="8.6" font-weight="800" fill="#065f46">光路を邪魔しない\n環状リング配置</text>
      ${miraiKpi(340, 110, 342, 92, 'End-to-End 物理復元連携（FH24）', '個体3D波面データ内蔵', '工場出荷時に全像高×絞り×距離の実測PSFをROM記録\nボディNPUが残留収差を物理忠実にデコンボリューション', '#059669')}
      ${miraiKpi(340, 218, 342, 86, '超高速サーボ制御', '24個 MLCC ＋ VCMドライバ', 'VCM AF・9枚絞り・MRセンサーを1基板で統合制御', '#0284c7')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '工場実測の個体3D波面PSFを内蔵ROMへ記録', line2: 'ボディ側FH24復元エンジンとEnd-to-End協調' },
      { label: '撮影メリット', line1: '製造個体差による片ボケ・微細収差をゼロ近傍へ', line2: '極薄28mmでも大口径大型単焦点級の解像力' },
      { label: '設計スペック', line1: '環状6層HDI基板 / QFN MCU + PSF-ROM + 24 MLCC', line2: '高速Eマウントシリアル通信対応' },
    ],
  },
  mirai_fh08_rear_dust_baffle: {
    badge: 'FH08-16',
    fhTag: FH08_TAG,
    zone: 'optic',
    title: '矩形36×24mm後端迷光遮光バッフル（フルサイズ像面整合）',
    analogy: '丸いレンズの出口を写真の形と同じ長方形に切り抜き、四隅のムダな光をカットする最終遮光マスク',
    metric: '3:2 矩形迷光カット',
    scaleLabel: '36×24 ASPECT RECTANGULAR LIGHT TRAP',
    accent: '#0f172a',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <circle cx="212" cy="212" r="92" fill="url(#${p}_si)" stroke="#334155" stroke-width="2"/>
      <rect x="148" y="168" width="128" height="88" rx="8" fill="#ffffff" stroke="#10b981" stroke-width="2.4"/>
      <text x="212" y="208" text-anchor="middle" font-size="10.4" font-weight="900" fill="#0f172a">3:2 矩形有効開口</text>
      <text x="212" y="226" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0f766e">イメージサークル外の迷光遮断</text>
      <!-- Blocked outer stray arcs -->
      <path d="M 152 140 Q 212 126 272 140" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="4 2"/>
      <text x="212" y="134" text-anchor="middle" font-size="8" font-weight="800" fill="#fca5a5">上下の不要光束を遮蔽</text>
      ${miraiKpi(346, 128, 336, 168, 'フレア・ゴースト最終防波堤', '鏡筒内反射 -18 dB', '円形イメージサークルのうち\n36×24mmセンサーに不要な上下左右の\n余剰光をマウント直前で完全に遮光\n高コントラストな逆光描写を担保', '#0f172a')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '36×24mm比率の矩形開口で余剰イメージ光を遮断', line2: '後端植毛フロックでマウント室内の再反射を吸収' },
      { label: '撮影メリット', line1: '画面外に強い太陽や照明がある場面でも白浮きゼロ', line2: 'ホコリの内部侵入を防ぐリアダストガード兼任' },
      { label: '設計スペック', line1: '外径 Ø45.6mm / 矩形開口 3:2 最適アスペクト', line2: '超低反射フロック表面処理' },
    ],
  },
  mirai_fh08_emount_contacts: {
    badge: 'FH08-17',
    fhTag: FH08_TAG,
    zone: 'link',
    title: '10ピン金めっきEマウント電子接点ブロック',
    analogy: 'カメラ本体とレンズを結び、電源・AF命令・個体光学カルテを毎秒何百回もやり取りする金の神経束',
    metric: '10ピン硬質金めっき',
    scaleLabel: '10-PIN E-MOUNT INTERFACE · PPS INSULATOR',
    accent: '#eab308',
    accentSoft: '#fefce8',
    art: (p) => `
      <path d="M 110 248 A 140 140 0 0 0 350 248 L 326 206 A 94 94 0 0 1 134 206 Z" fill="url(#${p}_si)" stroke="#475569" stroke-width="2"/>
      <!-- 10 gold contact pins -->
      <g fill="url(#${p}_gold)" stroke="#854d0e" stroke-width="0.9">
        <rect x="136" y="218" width="14" height="24" rx="2"/><rect x="156" y="226" width="14" height="24" rx="2"/>
        <rect x="176" y="232" width="14" height="24" rx="2"/><rect x="196" y="236" width="14" height="24" rx="2"/>
        <rect x="216" y="238" width="14" height="24" rx="2"/><rect x="236" y="238" width="14" height="24" rx="2"/>
        <rect x="256" y="236" width="14" height="24" rx="2"/><rect x="276" y="232" width="14" height="24" rx="2"/>
        <rect x="296" y="226" width="14" height="24" rx="2"/><rect x="316" y="218" width="14" height="24" rx="2"/>
      </g>
      <text x="230" y="176" text-anchor="middle" font-size="9.6" font-weight="900" fill="#854d0e">Eマウント標準 10ピン完全互換</text>
      ${miraiKpi(384, 114, 300, 86, '高速双方向テレメトリ', 'VCM駆動電源 ＋ PSF通信', '距離・絞り・温度・個体PSFデータを\nカメラ側FH24エンジンへリアルタイム伝送', '#ca8a04')}
      ${miraiKpi(384, 214, 300, 86, '高耐久摺動接点', 'PPS絶縁＋硬質Auめっき', '数万回のレンズ脱着でも接触抵抗安定', '#334155')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '現行α Eマウント10ピン通信・給電規格に完全準拠', line2: '高耐熱PPS絶縁ブロック＋厚付け硬質金めっき' },
      { label: '撮影メリット', line1: '装着瞬時に個体PSFデータとフォーカス制御が同期', line2: '既存αボディ〜2028世代機までシームレス互換' },
      { label: '設計スペック', line1: '10極独立金接点 / 背面FPC直結', line2: '接触抵抗 ≤ 20 mΩ / 10万回着脱耐久' },
    ],
  },
  mirai_fh08_stainless_bayonet: {
    badge: 'FH08-18',
    fhTag: FH08_TAG,
    zone: 'cool',
    title: 'SUS304高剛性Eマウント3爪バヨネット＆4本皿ボルト',
    analogy: 'レンズの光軸を1ミリの狂いもなくカメラ本体へガッチリ締結するステンレス鋼の精密ロック環',
    metric: '平面度 ≤ 3 μm · SUS304',
    scaleLabel: 'Ø61.6 mm E-MOUNT FLANGE · 18 mm FFD',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <circle cx="212" cy="212" r="98" fill="url(#${p}_metal)" stroke="#334155" stroke-width="2"/>
      <circle cx="212" cy="212" r="68" fill="#ffffff" stroke="#475569" stroke-width="1.6"/>
      <!-- 3 bayonet locking lugs -->
      <path d="M 196 138 A 76 76 0 0 1 254 152 L 244 166 A 60 60 0 0 0 198 154 Z" fill="#64748b"/>
      <path d="M 278 242 A 76 76 0 0 1 226 286 L 222 270 A 60 60 0 0 0 264 234 Z" fill="#64748b"/>
      <path d="M 148 256 A 76 76 0 0 1 142 184 L 158 190 A 60 60 0 0 0 162 246 Z" fill="#64748b"/>
      <!-- Red mounting index dot -->
      <circle cx="212" cy="118" r="5.5" fill="#dc2626"/>
      <!-- 4 flange screws -->
      <circle cx="156" cy="156" r="5" fill="#334155"/><circle cx="268" cy="156" r="5" fill="#334155"/>
      <circle cx="156" cy="268" r="5" fill="#334155"/><circle cx="268" cy="268" r="5" fill="#334155"/>
      <text x="212" y="216" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0f172a">内径 Ø46.1 mm</text>
      ${miraiPin(212, 118, 344, 126, 1, '赤色Eマウント装着指標', '暗所でも迷わず即座にロック', '#dc2626', 'start')}
      ${miraiKpi(348, 174, 336, 134, '精密ラップ仕上げ基準面', '平面度 ≤ 3 μm', 'フランジバック 18.00 mm を厳密保証\n外周ゴムシーリング＋4本M1.6皿ボルトで\n過酷な現場でも水滴・ホコリ侵入を遮断', '#334155')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '精密ラップ研削SUS304フランジで平面度3μm以下', line2: '3爪バヨネット＋4本皿ボルト＋防滴ゴムリップ' },
      { label: '撮影メリット', line1: '180gの超軽量レンズをガタつきゼロで確実固定', line2: '自由曲面レンズに必須の光軸・ロール角を高精度維持' },
      { label: '設計スペック', line1: 'フランジ径 Ø61.6mm / 内径 Ø46.1mm / FFD 18mm', line2: 'SUS304高剛性ステンレス鋼・M1.6ボルト×4' },
    ],
  },
};

export function renderFh08HdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  const spec = FH08_SPECS[type];
  return spec ? renderMiraiMonographSvg(spec) : null;
}
