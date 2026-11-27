import { PartExplanation } from '../../assemblies/types';
import {
  miraiComparePill,
  MiraiHdSpec,
  miraiKpi,
  miraiPin,
  renderMiraiMonographSvg,
} from './shared';

const FH01_TAG = 'FH01 SPAD/QIS · 86/100点';

const FH01_SPECS: Partial<Record<PartExplanation['diagramType'], MiraiHdSpec>> = {
  mirai_fh01_baffle_frame: {
    badge: 'FH01-01',
    fhTag: FH01_TAG,
    zone: 'optic',
    title: '3段ナイフエッジ迷光遮光バッフル開口断面',
    analogy: '横からの反射光を3段の黒いつばで消す暗室マスク',
    metric: '迷光減衰 R < 10⁻⁵',
    scaleLabel: 'APERTURE: 38.0 × 26.0 mm',
    accent: '#0f766e',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- 3-step CNC baffle left & right cross-section -->
      <path d="M 96 122 L 228 122 L 228 144 L 244 144 L 244 166 L 260 166 L 260 188 L 96 188 Z" fill="url(#${p}_si)" stroke="#0f172a" stroke-width="1.3"/>
      <path d="M 556 122 L 424 122 L 424 144 L 408 144 L 408 166 L 392 166 L 392 188 L 556 188 Z" fill="url(#${p}_si)" stroke="#0f172a" stroke-width="1.3"/>
      <!-- Underlying glass + SPAD die -->
      <rect x="200" y="212" width="252" height="16" rx="3" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="1"/>
      <rect x="228" y="254" width="196" height="28" rx="4" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.2"/>
      <text x="326" y="272" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">36×24mm 3D-BSI SPAD / QIS 受光面</text>
      <!-- Signal rays straight down -->
      <line x1="292" y1="86" x2="292" y2="250" stroke="#0284c7" stroke-width="2" marker-end="url(#${p}_arr_b)"/>
      <line x1="360" y1="86" x2="360" y2="250" stroke="#0284c7" stroke-width="2" marker-end="url(#${p}_arr_b)"/>
      <!-- Stray oblique ray absorbed by 3-step knife-edge -->
      <polyline points="172,88 236,154 218,176 244,186" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#${p}_arr_r)"/>
      ${miraiPin(244, 154, 134, 102, 1, '3段ナイフエッジ遮光リブ', '斜入射迷光を3回多重吸収', '#0f766e', 'end')}
      ${miraiPin(292, 175, 456, 102, 2, '有効光束のみ直進透過', '0.0005 lux暗所の偽カウント防止', '#0284c7', 'start')}
      ${miraiKpi(478, 224, 210, 88, '極暗所S/N保護性能', '< 0.3% 反射', '四隅SUSカラー±8μm位置決め', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '3段刃先形状で斜め迷光を多重減衰', line2: 'SPADの単一光子誤カウント源を遮断' },
      { label: '撮影メリット', line1: '逆光・星明かり下でも黒浮きゼロ', line2: '周辺まで高コントラストな暗部階調' },
      { label: '設計スペック', line1: '5軸CNC硬質黒アルマイト＋植毛層', line2: '外形58.4×46.4mm / 公差±8μm' },
    ],
  },
  mirai_fh01_ar_coverglass: {
    badge: 'FH01-02',
    fhTag: FH01_TAG,
    zone: 'optic',
    title: '両面9層マルチARカバーガラス＆二次発光反射抑止',
    analogy: '1粒の光子も跳ね返さない99.6%超透明気密ガラス窓',
    metric: '可視透過率 ≥ 99.6%',
    scaleLabel: 'THICKNESS: 0.78 mm · R < 0.15%',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Multi-AR Glass Slab -->
      <rect x="130" y="156" width="330" height="54" rx="5" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="1.5"/>
      <rect x="130" y="148" width="330" height="8" fill="#38bdf8" opacity="0.65"/>
      <rect x="130" y="210" width="330" height="8" fill="#38bdf8" opacity="0.65"/>
      <!-- Kovar Seal Left/Right -->
      <rect x="102" y="198" width="44" height="36" rx="4" fill="url(#${p}_metal)" stroke="#475569" stroke-width="1.2"/>
      <rect x="444" y="198" width="44" height="36" rx="4" fill="url(#${p}_metal)" stroke="#475569" stroke-width="1.2"/>
      <!-- Incident photon 99.6% passing -->
      <line x1="255" y1="88" x2="255" y2="292" stroke="#0284c7" stroke-width="2.6" marker-end="url(#${p}_arr_b)"/>
      <text x="266" y="120" font-size="9.5" font-weight="800" fill="#0369a1">透過 99.6%（片面反射 < 0.15%）</text>
      <!-- SPAD secondary emission suppressed -->
      <line x1="358" y1="286" x2="358" y2="218" stroke="#dc2626" stroke-width="1.7" stroke-dasharray="3 2" marker-end="url(#${p}_arr_r)"/>
      <line x1="358" y1="214" x2="358" y2="112" stroke="#dc2626" stroke-width="1.1" stroke-dasharray="2 3" opacity="0.55"/>
      ${miraiPin(188, 152, 92, 108, 1, '両面9層誘電体AR膜', '420–680nm反射0.15%未満', '#0284c7', 'start')}
      ${miraiPin(466, 216, 488, 134, 2, 'コバール気密フリット', 'CTE 5.1ppm/K 無歪み封止', '#475569', 'start')}
      ${miraiPin(358, 250, 488, 252, 3, 'SPAD二次光子透過', '裏面反射クロストークを防止', '#dc2626', 'start')}
      ${miraiComparePill(92, 304, 240, '汎用窓 透過92%（8%損失）', false)}
      ${miraiComparePill(344, 304, 256, 'FH01 AR窓 ≥99.6% 単一光子通過', true)}
    `,
    cards: [
      { label: '物理メカニズム', line1: '両面干渉AR膜が反射ロスを0.15%未満へ', line2: 'SPAD発火時の二次発光戻りも抑制' },
      { label: '撮影メリット', line1: '星明かりの微弱光子を無駄なく受光', line2: '点光源周りのハレーションを極小化' },
      { label: '設計スペック', line1: '光学ホウケイ酸ガラス 50.8×38.8mm', line2: '平面度 λ/4以下・コバール気密接合' },
    ],
  },
  mirai_fh01_ocl_microlens_array: {
    badge: 'FH01-03',
    fhTag: FH01_TAG,
    zone: 'optic',
    title: 'ギャップレスOCLマイクロレンズによるSPAD開口率ブースト',
    analogy: '画素のフチの安全壁を避けて真ん中へ光を集める虫めがね群',
    metric: '実効開口率 ≥ 85%',
    scaleLabel: 'PITCH: 4.9–6.6 μm · CRA SHIFTED',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- 3 Gapless OCL Domes -->
      ${[160, 290, 420]
        .map(
          (cx) => `
        <path d="M ${cx - 65} 184 Q ${cx} 112 ${cx + 65} 184 Z" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="${cx - 65}" y="184" width="130" height="14" fill="#e0f2fe" stroke="#94a3b8" stroke-width="0.8"/>
        <!-- Guard ring dead zones left/right -->
        <rect x="${cx - 65}" y="198" width="24" height="82" fill="#475569"/>
        <rect x="${cx + 41}" y="198" width="24" height="82" fill="#475569"/>
        <!-- Active SPAD core center -->
        <rect x="${cx - 41}" y="198" width="82" height="82" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1"/>
        <!-- Converging rays into active center -->
        <polyline points="${cx - 48},96 ${cx - 48},154 ${cx - 12},234" fill="none" stroke="#f59e0b" stroke-width="1.7" marker-end="url(#${p}_arr)"/>
        <polyline points="${cx + 48},96 ${cx + 48},154 ${cx + 12},234" fill="none" stroke="#f59e0b" stroke-width="1.7" marker-end="url(#${p}_arr)"/>
      `
        )
        .join('')}
      ${miraiPin(290, 140, 502, 108, 1, 'ギャップレス半球OCL', '隣接レンズ間の死角ゼロ', '#0284c7', 'start')}
      ${miraiPin(342, 232, 502, 186, 2, 'ガードリング非受光部', 'OCLがここを避けて中心集光', '#475569', 'start')}
      ${miraiKpi(502, 224, 190, 92, '実効PDP向上', '45% → 85%+', '高耐圧壁の開口損を補償', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'ガードリングを避け雪崩中心へ集光', line2: '像高に応じたCRA瞳シフト最適化' },
      { label: '撮影メリット', line1: '小ピッチ高画素SPADでも超高感度', line2: '画面四隅の周辺減光と色ズレを軽減' },
      { label: '設計スペック', line1: '24×16表現（実機20–36MP対応）', line2: '実効集光開口率≥85% / ピークPDP 70%+' },
    ],
  },
  mirai_fh01_spad_top_die: {
    badge: 'FH01-04',
    fhTag: FH01_TAG,
    zone: 'active',
    title: '36×24mm 3D-BSI 単一光子SPAD / QIS受光ダイ構造',
    analogy: '光の粒1個で「1！」と反応する読み出しノイズ0の受光面',
    metric: '読出ノイズ 0 e-rms',
    scaleLabel: 'ACTIVE AREA: 36.0 × 24.0 mm',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Single Photon -> Avalanche Multiplication Chain -->
      <rect x="84" y="130" width="268" height="162" rx="10" fill="url(#${p}_si)" stroke="#0284c7" stroke-width="1.5"/>
      <rect x="108" y="152" width="220" height="44" rx="6" fill="url(#${p}_cyan)" opacity="0.88"/>
      <text x="218" y="178" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">高電界アバランシェ増倍接合 (20–28V)</text>
      <!-- Photon entry & cascade -->
      <line x1="218" y1="84" x2="218" y2="148" stroke="#f59e0b" stroke-width="2.6" marker-end="url(#${p}_arr)"/>
      <text x="230" y="106" font-size="9.5" font-weight="900" fill="#d97706">1 Photon (hν)</text>
      <!-- Avalanche cascade lines -->
      <path d="M 218 196 L 172 238 M 218 196 L 202 238 M 218 196 L 234 238 M 218 196 L 264 238" stroke="#38bdf8" stroke-width="1.8"/>
      <rect x="128" y="240" width="180" height="32" rx="6" fill="#0f766e"/>
      <text x="218" y="260" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">10⁵–10⁶倍デジタルパルス「+1」</text>
      <!-- Right side: Dual Mode Auto-Adaptation -->
      ${miraiKpi(382, 92, 304, 78, '極暗所モード（0.0005 lux）', 'ISO 400万相当カラー', '4×4〜9×9無ノイズ画素ビニング併用', '#0284c7')}
      ${miraiKpi(382, 182, 304, 78, '昼間・明所モード', '20–36MP + 23段HDR', 'サブフレーム飽和外挿 125–140 dB', '#0f766e')}
      ${miraiComparePill(382, 272, 304, 'Si-CMOS 読出雑音 1.0–2.7 e-rms', false)}
      ${miraiComparePill(382, 298, 304, 'SPAD 0 e-rms / QIS 0.15–0.21 e-rms', true)}
    `,
    cards: [
      { label: '物理メカニズム', line1: '光子1個を雪崩増倍し直接デジタル計数', line2: 'SNRは純粋に光子ショットノイズ√N支配' },
      { label: '撮影メリット', line1: '暗闇ビニングISO 400万カラーに対応', line2: '昼間は高画素＆白飛び知らず23段HDR' },
      { label: '検証根拠', line1: 'Canon MS-510(2026) / Sensors 2025', line2: 'Sony ISSCC 2021 / Gigajot QIS実証' },
    ],
  },
  mirai_fh01_dti_guard_grid: {
    badge: 'FH01-05',
    fhTag: FH01_TAG,
    zone: 'active',
    title: 'メタル充填F-DTI光学遮蔽＆高耐圧ガードリング格子',
    analogy: '雪崩の二次光や高電圧が隣へ漏れない金属の仕切り壁',
    metric: 'クロストーク < 0.1%',
    scaleLabel: 'F-DTI DEPTH: 3.5 μm · W-FILLED',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <!-- Two adjacent SPAD pixels separated by full-depth metal trench -->
      <rect x="92" y="132" width="168" height="148" rx="6" fill="url(#${p}_cyan)" opacity="0.22" stroke="#0284c7" stroke-width="1.4"/>
      <rect x="308" y="132" width="168" height="148" rx="6" fill="url(#${p}_cyan)" opacity="0.22" stroke="#0284c7" stroke-width="1.4"/>
      <!-- F-DTI Center Wall (SiO2 liner + Tungsten metal core) -->
      <rect x="264" y="114" width="40" height="184" rx="3" fill="#e2e8f0" stroke="#64748b" stroke-width="1.2"/>
      <rect x="274" y="118" width="20" height="176" rx="2" fill="url(#${p}_si)"/>
      <!-- Secondary emission photon bouncing back -->
      <circle cx="176" cy="204" r="16" fill="#f59e0b" opacity="0.88"/>
      <text x="176" y="208" text-anchor="middle" font-size="8.5" font-weight="900" fill="#ffffff">発火</text>
      <polyline points="192,204 272,184 226,158" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_r)"/>
      <text x="392" y="210" text-anchor="middle" font-size="11" font-weight="800" fill="#0f766e">隣接画素：無影響 (0)</text>
      ${miraiPin(284, 146, 496, 108, 1, 'タングステン充填F-DTI', '二次光子を全反射・完全遮断', '#334155', 'start')}
      ${miraiPin(266, 250, 496, 174, 2, 'SiO₂高耐圧ライナー', '30V耐圧でエッジ降伏防止', '#0284c7', 'start')}
      ${miraiKpi(496, 224, 196, 88, 'ASI-TCAD最適化', '幅 -35%縮小', '小画素化と低DCRを両立', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '雪崩時の近赤外二次発光を金属壁で遮断', line2: 'ASI-TCADが30V耐圧電界分布を最適化' },
      { label: '撮影メリット', line1: '高輝度点光源の滲み・偽カウント激減', line2: 'フルサイズ20–36MP高密度化を実現' },
      { label: '設計スペック', line1: 'SiO₂絶縁＋タングステン完全貫通壁', line2: '光学クロストーク < 0.1% / 耐圧≥30V' },
    ],
  },
  mirai_fh01_cucu_microbumps: {
    badge: 'FH01-06',
    fhTag: FH01_TAG,
    zone: 'link',
    title: '300mm W2W Cu-Cuハイブリッド接合・画素直結ピラー',
    analogy: '受光チップと計算チップを真下へ直結する数千万本の銅柱',
    metric: '寄生容量 < 1.0 fF',
    scaleLabel: 'PITCH: 1.5–5.0 μm · W2W Cu-Cu',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: (p) => `
      <!-- Top SPAD Wafer & Bottom Logic Wafer -->
      <rect x="86" y="102" width="380" height="46" rx="6" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.3"/>
      <text x="276" y="130" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">上層：3D-BSI SPAD / QIS 受光ウェーハ</text>
      <rect x="86" y="236" width="380" height="48" rx="6" fill="url(#${p}_blue)" stroke="#1e3a8a" stroke-width="1.3"/>
      <text x="276" y="264" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">下層：画素並列アクティブ・クエンチ＆TDCウェーハ</text>
      <!-- SiCN Bonding Dielectric Interface -->
      <rect x="86" y="148" width="380" height="88" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
      <line x1="86" y1="192" x2="466" y2="192" stroke="#0f766e" stroke-width="1.4" stroke-dasharray="6 3"/>
      <!-- 7 Gleaming Cu-Cu Hybrid Bond Pillars -->
      ${[126, 176, 226, 276, 326, 376, 426]
        .map(
          (x) => `
        <rect x="${x - 10}" y="148" width="20" height="88" rx="2" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="1"/>
        <line x1="${x - 10}" y1="192" x2="${x + 10}" y2="192" stroke="#fef3c7" stroke-width="1.8"/>
      `
        )
        .join('')}
      ${miraiPin(376, 192, 492, 124, 1, '直接銅-銅分子接合', 'はんだ球レスでピッチ1.5–5μm', '#d97706', 'start')}
      ${miraiPin(446, 172, 492, 186, 2, 'SiCNプラズマ接合膜', '300mmウェーハ一括接合', '#0f766e', 'start')}
      ${miraiKpi(492, 232, 200, 86, '発火エネルギー激減', 'E = ½ C·V²', '寄生容量<1fFで明所発熱を抑制', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '全画素を1対1で真下のカウンタへ銅直結', line2: '極低容量(<1fF)で発火消費電力を削減' },
      { label: '撮影メリット', line1: '高速連続光子カウントと省エネを両立', line2: '開口率を下げず全画素デジタル出力' },
      { label: '量産民主化', line1: '300mm W2Wハイブリッド接合の成熟', line2: '車載dToF/LiDAR投資がファブコスト圧縮' },
    ],
  },
  mirai_fh01_quench_tdc_wafer: {
    badge: 'FH01-07',
    fhTag: FH01_TAG,
    zone: 'active',
    title: '画素並列アクティブ・クエンチ＆23段外挿HDRロジック層',
    analogy: '満タンまでの時間で太陽の明るさまで逆算する超高速数取器',
    metric: '125–140 dB (23段)',
    scaleLabel: 'DEAD TIME: ≤ 5 ns · 14-BIT TDC',
    accent: '#1d4ed8',
    accentSoft: '#dbeafe',
    art: (_p) => `
      <!-- Extrapolation HDR Graph (Bright vs Dark Slope) -->
      <rect x="86" y="100" width="336" height="196" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
      <line x1="120" y1="266" x2="400" y2="266" stroke="#334155" stroke-width="1.5"/>
      <line x1="120" y1="266" x2="120" y2="118" stroke="#334155" stroke-width="1.5"/>
      <text x="260" y="286" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">露光時間 t（サブフレーム）</text>
      <text x="104" y="192" text-anchor="middle" font-size="9" font-weight="700" fill="#475569" transform="rotate(-90 104 192)">光子カウント数 N</text>
      <!-- Saturation ceiling -->
      <line x1="120" y1="158" x2="400" y2="158" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="4 3"/>
      <text x="394" y="152" text-anchor="end" font-size="8.2" font-weight="800" fill="#dc2626">14-bit カウンタ飽和上限 N_sat</text>
      <!-- Bright pixel steep slope + extrapolated dotted line -->
      <line x1="120" y1="266" x2="188" y2="158" stroke="#f59e0b" stroke-width="2.6"/>
      <line x1="188" y1="158" x2="218" y2="110" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3"/>
      <circle cx="188" cy="158" r="4.5" fill="#d97706"/>
      <text x="200" y="138" font-size="8.5" font-weight="800" fill="#b45309">T_satから真の輝度を外挿!</text>
      <!-- Dark pixel gentle slope -->
      <line x1="120" y1="266" x2="386" y2="238" stroke="#0284c7" stroke-width="2.4"/>
      <text x="380" y="232" text-anchor="end" font-size="8.5" font-weight="800" fill="#0369a1">暗所: 1光子から無ノイズ計数</text>
      <!-- Right pipeline blocks -->
      ${miraiKpi(444, 100, 244, 58, '① アクティブ・クエンチ', '≤ 5 ns デッドタイム', '発火即リセット＆高輝度間引き省電力', '#1d4ed8')}
      ${miraiKpi(444, 168, 244, 58, '② 画素並列カウンタ＋TDC', '14-bit + サブフレーム外挿', '1露出で125–140dB（20–23段HDR）', '#0f766e')}
      ${miraiKpi(444, 236, 244, 58, '③ オンチップ無ノイズビニング', '4×4〜9×9 デジタル加算', '暗闇ISO 400万カラーを自動生成', '#d97706')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '飽和到達時間T_satから入射光率を逆算', line2: '1回露光で動体破綻ゼロの23段HDR' },
      { label: '撮影メリット', line1: '太陽と暗室を同時描写しても白飛び皆無', line2: '暗所では自動ビニングで高S/N化' },
      { label: '検証根拠', line1: 'Sony ISSCC 2021 124dB外挿HDR実証', line2: 'Canon Sensors 2025 1.053W低消費設計' },
    ],
  },
  mirai_fh01_dram_ring_die: {
    badge: 'FH01-08',
    fhTag: FH01_TAG,
    zone: 'link',
    title: '第3層サブフレーム積算DRAM＆48本外周銅TSV',
    analogy: '毎秒数千コマの光子マップを動きに合わせてブレなく合成する記憶層',
    metric: '10,000 sub-fps',
    scaleLabel: '3-TIER STACK · 48 COPPER TSVs',
    accent: '#4f46e5',
    accentSoft: '#eef2ff',
    art: (p) => `
      <!-- 3 sub-frame photon slices aligning into motion-compensated crisp image -->
      ${[0, 1, 2]
        .map(
          (i) => `
        <g transform="translate(${92 + i * 56}, ${112 + i * 24})">
          <rect x="0" y="0" width="118" height="74" rx="6" fill="url(#${p}_violet)" opacity="${0.35 + i * 0.22}" stroke="#4f46e5" stroke-width="1.3"/>
          <text x="59" y="24" text-anchor="middle" font-size="9" font-weight="800" fill="#1e1b4b">Sub-Frame #${i + 1}</text>
          <text x="59" y="42" text-anchor="middle" font-size="8" font-weight="700" fill="#312e81">1/5,000s 光子マップ</text>
          <circle cx="${38 + i * 16}" cy="56" r="5" fill="#fbbf24"/>
        </g>
      `
        )
        .join('')}
      <line x1="334" y1="196" x2="394" y2="196" stroke="#4f46e5" stroke-width="2.6" marker-end="url(#${p}_arr)"/>
      <!-- 4-Quadrant DRAM Bank + TSV Ring -->
      <rect x="404" y="106" width="278" height="186" rx="10" fill="url(#${p}_si)" stroke="#4f46e5" stroke-width="1.5"/>
      <rect x="424" y="124" width="112" height="66" rx="5" fill="#312e81" stroke="#818cf8"/>
      <rect x="550" y="124" width="112" height="66" rx="5" fill="#312e81" stroke="#818cf8"/>
      <rect x="424" y="204" width="112" height="66" rx="5" fill="#312e81" stroke="#818cf8"/>
      <rect x="550" y="204" width="112" height="66" rx="5" fill="#312e81" stroke="#818cf8"/>
      <text x="543" y="198" text-anchor="middle" font-size="9.5" font-weight="900" fill="#e0e7ff">4-Bank 広帯域DRAM (≥256 GB/s)</text>
      <!-- Perimeter Copper TSV Dots -->
      ${Array.from({ length: 12 }, (_, k) => `<circle cx="${420 + k * 22}" cy="114" r="3" fill="#f59e0b"/><circle cx="${420 + k * 22}" cy="284" r="3" fill="#f59e0b"/>`).join('')}
      ${miraiPin(508, 284, 382, 314, 1, '48本外周銅TSV貫通電極', '電源・SLVS出力を最短縦配線', '#d97706', 'end')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '超高速サブフレームをDRAMへ一時蓄積', line2: '動きベクトル補償で無ノイズ積算' },
      { label: '撮影メリット', line1: '暗闇で動く動物も手ブレ・被写体ブレ軽減', line2: '外部帯域を圧迫せず高速連写対応' },
      { label: '設計スペック', line1: '3層積層（SPAD＋Logic＋DRAM）', line2: 'チップ内≥256 GB/s / 銅TSV ×48本' },
    ],
  },
  mirai_fh01_hv_chargepump_ring: {
    badge: 'FH01-09',
    fhTag: FH01_TAG,
    zone: 'pkg',
    title: '20〜28V 温度補償高電圧バイアス・チャージポンプ環',
    analogy: '温度に合わせて20〜28Vを0.01V単位で自動調整する専用電源リング',
    metric: '20–28V ±10mV制御',
    scaleLabel: 'α_T ≈ +25 mV/℃ · STAR-RING PDN',
    accent: '#0f766e',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- Star-Ring Perimeter Collar -->
      <rect x="114" y="102" width="276" height="196" rx="14" fill="#0f766e" fill-opacity="0.16" stroke="#0f766e" stroke-width="2"/>
      <rect x="158" y="138" width="188" height="124" rx="6" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.3"/>
      <text x="252" y="198" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">36×24mm SPAD Die</text>
      <text x="252" y="216" text-anchor="middle" font-size="8.6" font-weight="700" fill="#e0f2fe">4隅対称HV給電（電圧降下ゼロ）</text>
      <!-- 4 Corner Charge-Pump QFN ICs -->
      ${[
        [124, 112],
        [348, 112],
        [124, 256],
        [348, 256],
      ]
        .map(
          ([x, y]) => `
        <rect x="${x}" y="${y}" width="32" height="32" rx="4" fill="#1e293b" stroke="#eab308" stroke-width="1.4"/>
        <text x="${x + 16}" y="${y + 19}" text-anchor="middle" font-size="7.6" font-weight="800" fill="#fde047">HV</text>
      `
        )
        .join('')}
      <!-- Right side temperature-tracking formula & loop -->
      ${miraiKpi(424, 102, 260, 76, 'NTC温度連動バイアス追従', 'V_bias(T) = V_BD + 25mV/℃', '寒冷地〜炎天下でPDP感度を一定維持', '#0f766e')}
      ${miraiKpi(424, 192, 260, 76, '4隅スター給電リング', 'リップル < 1.5 mVpp', '明所大電流時の画面周辺シェーディング防止', '#d97706')}
      ${miraiComparePill(424, 282, 260, 'パッケージ内完結昇圧で本体配線安全化', true)}
    `,
    cards: [
      { label: '物理メカニズム', line1: '降伏電圧の温度ドリフト(+25mV/℃)を補償', line2: '4隅対称給電で面内過剰バイアス均一化' },
      { label: '撮影メリット', line1: '夏も冬も露出・感度が狂わない安定描写', line2: '高電圧ノイズの本体回路混入を遮断' },
      { label: '設計スペック', line1: 'QFN昇圧IC×4 ＋ シールドコイル×4', line2: '20〜28V可変 / リップル<1.5mVpp' },
    ],
  },
  mirai_fh01_htcc_ceramic_pkg: {
    badge: 'FH01-10',
    fhTag: FH01_TAG,
    zone: 'pkg',
    title: '多段キャビティHTCCアルミナセラミック気密パッケージ',
    analogy: '3階建てチップを1ミクロンも反らせず収める段付き焼き物の器',
    metric: 'ダイ反り < 3 μm',
    scaleLabel: 'PKG: 56.0 × 44.0 mm · HTCC Al2O3',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <!-- Stepped Ceramic Bathtub Cross-Section -->
      <path d="M 90 120 L 146 120 L 146 186 L 194 186 L 194 248 L 446 248 L 446 186 L 494 186 L 494 120 L 550 120 L 550 288 L 90 288 Z" fill="url(#${p}_metal)" stroke="#334155" stroke-width="1.5"/>
      <!-- Gold wirebond shelves -->
      <rect x="146" y="182" width="48" height="6" fill="url(#${p}_gold)"/>
      <rect x="446" y="182" width="48" height="6" fill="url(#${p}_gold)"/>
      <!-- 3-Wafer Stack nested cleanly inside -->
      <rect x="218" y="218" width="204" height="24" rx="2" fill="url(#${p}_violet)"/>
      <rect x="218" y="192" width="204" height="24" rx="2" fill="url(#${p}_blue)"/>
      <rect x="218" y="166" width="204" height="24" rx="2" fill="url(#${p}_cyan)"/>
      <!-- Underside LGA Pads + Center CuW Aperture -->
      ${[106, 128, 150, 172, 468, 490, 512, 534].map((x) => `<rect x="${x}" y="288" width="12" height="7" rx="2" fill="url(#${p}_gold)"/>`).join('')}
      <rect x="210" y="288" width="220" height="12" rx="3" fill="url(#${p}_cu)"/>
      ${miraiPin(170, 184, 96, 94, 1, '2段金ワイヤー棚', 'HVカラー・MLCCを立体収納', '#d97706', 'start')}
      ${miraiPin(320, 294, 560, 298, 2, '中央CuW直結＆外周LGA', '放熱と電源ピンを完全分離', '#b45309', 'start')}
      ${miraiKpi(566, 118, 126, 118, '高剛性Al₂O₃', '370 GPa', 'CTE 6.8ppm/K\n対角反り<3μm', '#475569')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'Al₂O₃高剛性でフルサイズ大判の反り抑制', line2: '2段キャビティで3層ダイ＋周辺部品収納' },
      { label: '撮影メリット', line1: 'F1.2開放でも画面四隅まで均一なピント', line2: '温度変化・経年劣化に強い完全気密' },
      { label: '設計スペック', line1: 'HTCCアルミナ 56×44mm・銀焼結接合', line2: '外周LGAランド＋側面検査端子' },
    ],
  },
  mirai_fh01_gold_wirebond_frame: {
    badge: 'FH01-11',
    fhTag: FH01_TAG,
    zone: 'link',
    title: 'コバール気密溶接枠＆64本3D放物線金ワイヤーボンド',
    analogy: 'チップの4辺と器を髪の毛より細い純金アーチで結ぶ超精密結線',
    metric: 'L ≈ 1.2 nH / 64本',
    scaleLabel: '4N Au WIRE · Ø25 μm · 4-SIDE',
    accent: '#ca8a04',
    accentSoft: '#fefce8',
    art: (p) => `
      <!-- Ceramic Shelf & Silicon Die Side View -->
      <rect x="92" y="218" width="150" height="72" rx="5" fill="url(#${p}_metal)" stroke="#475569"/>
      <rect x="176" y="214" width="52" height="6" fill="url(#${p}_gold)"/>
      <rect x="282" y="182" width="194" height="108" rx="6" fill="url(#${p}_cyan)" stroke="#0369a1"/>
      <rect x="294" y="176" width="38" height="6" fill="url(#${p}_gold)"/>
      <!-- Parabolic 3D Gold Wirebond Arch -->
      <path d="M 312 178 C 304 114, 240 112, 202 214" fill="none" stroke="url(#${p}_gold)" stroke-width="5.2" stroke-linecap="round"/>
      <path d="M 312 178 C 304 114, 240 112, 202 214" fill="none" stroke="#fef08a" stroke-width="1.6" stroke-linecap="round"/>
      <!-- Coverglass Clearance Line -->
      <line x1="92" y1="112" x2="476" y2="112" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="5 3"/>
      <text x="470" y="105" text-anchor="end" font-size="8.6" font-weight="800" fill="#0284c7">カバーガラス底面（安全クリアランス確保）</text>
      ${miraiPin(262, 134, 496, 134, 1, '放物線低背金ループ', '熱膨張応力をバネ状に吸収', '#ca8a04', 'start')}
      ${miraiPin(202, 214, 496, 204, 2, '4辺64本対称結線', 'HV系とSLVS系を分離配線', '#0f766e', 'start')}
      ${miraiKpi(496, 242, 196, 76, 'コバールシーム溶接枠', '4N 純金 99.99%', '寄生インダクタンス約1.2nH', '#ca8a04')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '純金放物線アーチが熱応力を弾性吸収', line2: '低背ループで寄生インダクタンス最小化' },
      { label: '撮影メリット', line1: '極寒〜酷暑の過酷環境でも断線リスク極小', line2: '高周波ノイズ混入を抑えたクリアな信号' },
      { label: '設計スペック', line1: '4N純金Ø25μmワイヤー×64本（4辺対称）', line2: 'Ni/Auめっきコバール気密溶接リング一体' },
    ],
  },
  mirai_fh01_mlcc_decoupling_bank: {
    badge: 'FH01-12',
    fhTag: FH01_TAG,
    zone: 'pkg',
    title: 'パッケージ内36個超低ESL MLCC＆静音LDO電源バンク',
    analogy: '雪崩カウント瞬間の急な電気不足を真横で補う36個の極小貯水池',
    metric: 'ESL < 120 pH ×36',
    scaleLabel: 'IN-PACKAGE PI · 36 MLCC + 2 LDO',
    accent: '#b45309',
    accentSoft: '#fef3c7',
    art: (p) => `
      <!-- Transient Current Spike Suppression Waveform -->
      <rect x="82" y="96" width="320" height="196" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
      <line x1="112" y1="258" x2="384" y2="258" stroke="#334155" stroke-width="1.4"/>
      <line x1="112" y1="258" x2="112" y2="114" stroke="#334155" stroke-width="1.4"/>
      <!-- Without MLCC huge voltage droop -->
      <path d="M 114 156 L 178 156 Q 204 246 244 190 Q 278 144 380 156" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="234" y="238" font-size="8.4" font-weight="800" fill="#dc2626">基板外電源のみ：大電圧ドロップ</text>
      <!-- With 36 In-Package MLCCs flat rail -->
      <path d="M 114 156 L 178 156 Q 198 168 224 157 L 380 156" fill="none" stroke="#059669" stroke-width="2.6"/>
      <text x="266" y="142" font-size="8.6" font-weight="900" fill="#047857">内蔵36個MLCC：瞬時平滑化！</text>
      <!-- Right side SMD physical sketch -->
      <rect x="436" y="108" width="246" height="92" rx="10" fill="#f8fafc" stroke="#d97706" stroke-width="1.2"/>
      <rect x="462" y="132" width="34" height="44" rx="4" fill="url(#${p}_metal)"/>
      <rect x="496" y="136" width="84" height="36" rx="2" fill="url(#${p}_cu)"/>
      <rect x="580" y="132" width="34" height="44" rx="4" fill="url(#${p}_metal)"/>
      <text x="538" y="158" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">0201/0402 MLCC</text>
      <text x="559" y="191" text-anchor="middle" font-size="8.2" font-weight="700" fill="#78350f">四辺包囲 36個＋超低ノイズLDO ×2基</text>
      ${miraiKpi(436, 214, 246, 78, '電源インテグリティ（PI）', 'PSRR > 80 dB', 'ΔV = L·di/dt をダイ数mm直近で吸収', '#b45309')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '数百万画素同時発火のdi/dtスパイク吸収', line2: '配線ループ長を数mmへ短縮し電圧安定' },
      { label: '撮影メリット', line1: '明所連写時の横縞ノイズ・感度ムラゼロ', line2: 'TDCピコ秒クロックのジッター低減' },
      { label: '設計スペック', line1: '低ESL MLCC ×36（50V/6.3V混載）', line2: '超低ノイズDFN LDO ×2（PSRR>80dB）' },
    ],
  },
  mirai_fh01_slvs_fpc_harness: {
    badge: 'FH01-13',
    fhTag: FH01_TAG,
    zone: 'link',
    title: 'SLVS-EC 16レーン差動S字フレキシブル基板＆ZIF終端',
    analogy: '手ブレ補正で動いても100Gbpsを流し続けるS字データ高速道路',
    metric: '~102.4 Gbps (16L)',
    scaleLabel: 'Z_diff: 100 Ω ± 5% · 28-PIN ZIF',
    accent: '#ea580c',
    accentSoft: '#ffedd5',
    art: (p) => `
      <!-- S-Curved FPC Cross-Section & ZIF Connector -->
      <path d="M 92 146 L 186 146 C 254 146, 266 244, 344 244 L 478 244" fill="none" stroke="url(#${p}_cu)" stroke-width="18" stroke-linecap="round"/>
      <path d="M 122 136 L 186 136 C 256 136, 268 234, 344 234 L 430 234" fill="none" stroke="#64748b" stroke-width="4"/>
      <!-- Carbon Stiffener + Gold Fingers + Ivory ZIF Lock -->
      <rect x="424" y="253" width="66" height="10" rx="2" fill="#1e293b"/>
      <rect x="404" y="226" width="22" height="12" rx="2" fill="#f5f0e1" stroke="#94a3b8"/>
      <rect x="434" y="235" width="46" height="6" fill="url(#${p}_gold)"/>
      ${miraiPin(268, 196, 118, 248, 1, '応力分散S字ベンド', 'IBIS 5軸駆動 1,000万回耐久', '#ea580c', 'start')}
      ${miraiPin(232, 140, 312, 106, 2, '銀メッシュEMIシールド', '100Ω差動レーン輻射遮断', '#475569', 'start')}
      ${miraiPin(456, 238, 502, 178, 3, '28極硬質金ZIF端子', 'カーボン補強＋ロックバー', '#ca8a04', 'start')}
      ${miraiKpi(502, 224, 190, 92, 'SLVS-EC 16レーン', '102.4 Gbps', '23段HDR・高速光子出力対応', '#ea580c')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '100Ω差動16レーン＋銀EMIシールド', line2: '滑らかなS字曲線でIBIS屈曲応力分散' },
      { label: '撮影メリット', line1: '23段HDR動画や高速連写も詰まりゼロ', line2: '無線通信ノイズの画質混入を防止' },
      { label: '設計スペック', line1: '低誘電LCP/ポリイミド・28極金ZIF', line2: 'IBIS可動1,000万回以上屈曲耐性' },
    ],
  },
  mirai_fh01_cuw_slug_spreader: {
    badge: 'FH01-14',
    fhTag: FH01_TAG,
    zone: 'cool',
    title: '銅タングステン（CuW）低膨張ヒートスラグ＆NTC温度計',
    analogy: '熱を逃がしつつ歪まず0.05℃で温度を見張る特殊金属放熱板',
    metric: 'k≈200 / CTE 7.2',
    scaleLabel: 'Cu20/W80 · NTC ±0.05℃ KELVIN',
    accent: '#b45309',
    accentSoft: '#fef3c7',
    art: (p) => `
      <!-- Thermal Flow from Die -> Ceramic -> CuW Slug + NTC Feedback -->
      <rect x="170" y="102" width="230" height="32" rx="5" fill="url(#${p}_cyan)"/>
      <text x="285" y="122" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">3層SPADダイ（発熱源・DCR温度依存）</text>
      <rect x="148" y="156" width="274" height="58" rx="6" fill="url(#${p}_cu)" stroke="#78350f" stroke-width="1.4"/>
      <text x="285" y="189" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">焼結 Cu20/W80 銅タングステン・スラグ</text>
      <!-- NTC Boss on Left Tab -->
      <rect x="86" y="170" width="62" height="34" rx="5" fill="#065f46" stroke="#047857"/>
      <rect x="102" y="162" width="26" height="14" rx="3" fill="#dc2626"/>
      <text x="115" y="196" text-anchor="middle" font-size="7.8" font-weight="800" fill="#ecfdf5">NTC</text>
      <!-- Downward Heat Arrows -->
      ${[210, 260, 310, 360].map((x) => `<line x1="${x}" y1="136" x2="${x}" y2="246" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_r)"/>`).join('')}
      <!-- NTC Feedback Loop to HV Ring -->
      <path d="M 115 160 L 115 118 L 166 118" fill="none" stroke="#0f766e" stroke-width="1.8" stroke-dasharray="4 2" marker-end="url(#${p}_arr)"/>
      <text x="115" y="232" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f766e">±0.05℃監視→28V補正</text>
      ${miraiKpi(454, 102, 232, 82, 'DCR温度倍増則を抑止', 'ΔT_2× ≈ 8–10℃', '明所連続発火熱を直下へ高速排出', '#dc2626')}
      ${miraiKpi(454, 198, 232, 82, 'セラミック整合CTE', '7.2 ppm/K', '純銅(16.5)と違いフルサイズ無反り', '#b45309')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '銅の高熱伝導とWの低膨張を焼結複合', line2: 'DCR指数増大を防ぐ直下高速放熱' },
      { label: '撮影メリット', line1: '真夏の動画連写後も暗闇画質が荒れない', line2: 'NTC連動で露出・感度ドリフト皆無' },
      { label: '設計スペック', line1: 'Cu20/W80 k≈200 W/mK・CTE 7.2 ppm/K', line2: 'ケルビン金リード付±0.05℃ NTC一体' },
    ],
  },
  mirai_fh01_graphite_thermal_pad: {
    badge: 'FH01-15',
    fhTag: FH01_TAG,
    zone: 'cool',
    title: '異方性グラファイト（PGS）面内超拡散＆柔軟TIM層',
    analogy: '熱を銅の4倍の速さで横へ広げムラを消すハイテク放熱シート',
    metric: '面内 1,500 W/m·K',
    scaleLabel: 'PGS 0.36mm + TIM 0.42mm · ±0.5℃',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Hotspot Spread Comparison -->
      <rect x="104" y="138" width="320" height="36" rx="5" fill="#38bdf8" fill-opacity="0.38" stroke="#0284c7" stroke-width="1.3"/>
      <text x="264" y="160" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0369a1">柔軟シリコーンTIMワッフル（無空隙・応力遮断）</text>
      <rect x="86" y="180" width="356" height="38" rx="5" fill="url(#${p}_si)" stroke="#334155" stroke-width="1.4"/>
      <text x="264" y="203" text-anchor="middle" font-size="10.2" font-weight="800" fill="#f8fafc">熱分解グラファイトシート PGS（面内 1,500 W/m·K）</text>
      <!-- Lateral rapid heat spreading arrows -->
      <line x1="230" y1="232" x2="106" y2="232" stroke="#f97316" stroke-width="2.6" marker-end="url(#${p}_arr_r)"/>
      <line x1="298" y1="232" x2="422" y2="232" stroke="#f97316" stroke-width="2.6" marker-end="url(#${p}_arr_r)"/>
      <text x="264" y="236" text-anchor="middle" font-size="9" font-weight="900" fill="#ea580c">銅の約3.8倍速で横拡散</text>
      ${miraiKpi(466, 110, 224, 82, '36×24mm面内均一化', 'ΔT ≤ ±0.5℃', '画面中央のDCR熱ムラを根絶', '#0284c7')}
      ${miraiKpi(466, 206, 224, 82, '機械応力アイソレーション', 'Shore 00-45', 'ベース締付歪みをダイへ伝えない', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '異方性PGSが中央ホットスポットを瞬間拡散', line2: '柔軟TIMが微細凹凸を埋め応力も絶縁' },
      { label: '撮影メリット', line1: '画面中央だけザラつく熱シェーディング皆無', line2: '長時間星景・動画撮影の均一暗部' },
      { label: '設計スペック', line1: 'PGS k≈1,500 W/mK（面内）＋TIM k≥6', line2: '36×24mm全面温度偏差 ≤ ±0.5℃' },
    ],
  },
  mirai_fh01_precision_mount_base: {
    badge: 'FH01-16',
    fhTag: FH01_TAG,
    zone: 'cool',
    title: 'CNC 3点キネマティック基準土台＆M1.4トルクスボルト',
    analogy: 'ピント面の傾きを1ミクロン単位で追い込む3点基準の頑丈な土台',
    metric: 'チルト公差 ≤ ±2 μm',
    scaleLabel: '62.8 × 50.8 mm · 6× M1.4 TORX',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <!-- Top-Down 3-Point Kinematic Triangle Schematic -->
      <rect x="96" y="102" width="320" height="202" rx="14" fill="url(#${p}_metal)" stroke="#334155" stroke-width="1.6"/>
      <rect x="136" y="132" width="240" height="142" rx="8" fill="#ffffff" fill-opacity="0.45" stroke="#64748b" stroke-dasharray="4 3"/>
      <!-- Kinematic Triangle -->
      <polygon points="154,140 358,140 256,268" fill="none" stroke="#0f766e" stroke-width="2" stroke-dasharray="5 3"/>
      ${[
        [154, 140],
        [358, 140],
        [256, 268],
      ]
        .map(
          ([x, y]) => `
        <circle cx="${x}" cy="${y}" r="14" fill="#cbd5e1" stroke="#334155" stroke-width="1.3"/>
        <circle cx="${x}" cy="${y}" r="8" fill="url(#${p}_gold)" stroke="#a16207"/>
      `
        )
        .join('')}
      <!-- 6 M1.4 Torx Bolts -->
      ${[
        [116, 120],
        [396, 120],
        [116, 286],
        [396, 286],
        [256, 114],
        [256, 292],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.5" fill="#1e293b" stroke="#f8fafc" stroke-width="1.5"/>`)
        .join('')}
      ${miraiPin(358, 140, 444, 126, 1, '3点真鍮チルト調整シム', 'F1.2焦点深度内へ平面追い込み', '#ca8a04', 'start')}
      ${miraiPin(396, 286, 444, 200, 2, 'M1.4精密トルクス×6', 'チタン座金で全16層均等締結', '#334155', 'start')}
      ${miraiKpi(444, 240, 244, 72, 'マグネシウムCNC骨格', '公差 ≤ ±2.0 μm', '裏面補強リブ＋IBIS軽量慣性設計', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '3点キネマティック基準でガタ・歪みゼロ', line2: '真鍮シムでフランジバックと傾きを微調整' },
      { label: '撮影メリット', line1: '大口径F1.2でも片ボケゼロの極限解像', line2: 'IBIS 5軸手ブレ補正の応答速度向上' },
      { label: '設計スペック', line1: 'CNCマグネシウム 62.8×50.8mm', line2: '3点基準ボス＋M1.4精密ボルト×6' },
    ],
  },
};

export function renderFh01HdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  const spec = FH01_SPECS[type];
  return spec ? renderMiraiMonographSvg(spec) : null;
}
