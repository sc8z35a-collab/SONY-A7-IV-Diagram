import { PartExplanation } from '../../assemblies/types';
import {
  miraiComparePill,
  MiraiHdSpec,
  miraiKpi,
  miraiPin,
  renderMiraiMonographSvg,
} from './shared';

const FH02_TAG = 'FH02 3層垂直RGB · 86/100点';

const FH02_SPECS: Partial<Record<PartExplanation['diagramType'], MiraiHdSpec>> = {
  mirai_fh02_optical_hood_bezel: {
    badge: 'FH02-01',
    fhTag: FH02_TAG,
    zone: 'optic',
    title: 'OLPF撤廃・防湿ガスケット統合CNC光学フードベゼル',
    analogy: '湿気を防ぎつつローパス不要で光を直通させる3色印の金属枠',
    metric: 'OLPF不要・偽色 0%',
    scaleLabel: 'BEZEL: 58.4 × 46.4 mm · EPDM SEAL',
    accent: '#0f766e',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- Cross-section of Bezel + Titanium Trim + EPDM Gasket over 3-Layer Stack -->
      <rect x="86" y="114" width="124" height="34" rx="5" fill="url(#${p}_si)"/>
      <rect x="406" y="114" width="124" height="34" rx="5" fill="url(#${p}_si)"/>
      <rect x="196" y="108" width="24" height="14" rx="3" fill="url(#${p}_metal)"/>
      <rect x="396" y="108" width="24" height="14" rx="3" fill="url(#${p}_metal)"/>
      <rect x="108" y="148" width="44" height="14" rx="6" fill="#0f766e"/>
      <rect x="464" y="148" width="44" height="14" rx="6" fill="#0f766e"/>
      <!-- 3-Layer RGB stack beneath -->
      <rect x="218" y="198" width="180" height="18" rx="2" fill="url(#${p}_blue)"/>
      <rect x="218" y="220" width="180" height="18" rx="2" fill="url(#${p}_green)"/>
      <rect x="218" y="242" width="180" height="18" rx="2" fill="url(#${p}_red)"/>
      <text x="308" y="280" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">OLPF不要 → 3層RGB直達で解像低下ゼロ</text>
      <!-- Full spectrum ray straight in -->
      <line x1="274" y1="84" x2="274" y2="196" stroke="#2563eb" stroke-width="2.2" marker-end="url(#${p}_arr_b)"/>
      <line x1="308" y1="84" x2="308" y2="218" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_g)"/>
      <line x1="342" y1="84" x2="342" y2="240" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_r)"/>
      ${miraiPin(130, 155, 86, 214, 1, '連続EPDM防湿ガスケット', '外部湿気侵入を一次遮断', '#0f766e', 'start')}
      ${miraiKpi(542, 114, 152, 166, 'ベイヤー撤廃効果', '偽色 0%', 'ローパスフィルター\n完全不要で高MTF\n＋光路長短縮', '#2563eb')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '1画素RGB完全取得でOLPFが物理不要', line2: 'ベゼル直下EPDMで一次防湿シール形成' },
      { label: '撮影メリット', line1: '衣装や建築の細部でモアレ・偽色が完全消滅', line2: '同じ画素数でも際立つネイティブ解像感' },
      { label: '設計スペック', line1: '5軸CNCベゼル＋チタン開口トリム', line2: '連続EPDM防湿ガスケット・RGB印付' },
    ],
  },
  mirai_fh02_ald_tfe_barrier: {
    badge: 'FH02-02',
    fhTag: FH02_TAG,
    zone: 'optic',
    title: '多層ALD/TFE超防湿バリア封止ガラス窓（10年耐久）',
    analogy: '水分子1個も通さない原子レベルの超極薄シールド窓',
    metric: 'WVTR ≤ 10⁻⁶',
    scaleLabel: 'ALD Al2O3/TiO2 · UV CUT < 395 nm',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Alternating Inorganic ALD + Organic Buffer TFE Multilayer -->
      <rect x="92" y="148" width="332" height="18" fill="#0284c7" opacity="0.82"/>
      <rect x="92" y="166" width="332" height="14" fill="#c4b5fd" opacity="0.72"/>
      <rect x="92" y="180" width="332" height="18" fill="#0f766e" opacity="0.82"/>
      <rect x="92" y="198" width="332" height="14" fill="#c4b5fd" opacity="0.72"/>
      <rect x="92" y="212" width="332" height="22" fill="url(#${p}_glass)" stroke="#0284c7"/>
      <!-- Bouncing H2O / O2 / UV arrows -->
      <polyline points="156,88 156,144 128,116" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_r)"/>
      <text x="156" y="82" text-anchor="middle" font-size="8.6" font-weight="800" fill="#dc2626">H₂O / O₂ 遮断</text>
      <polyline points="244,88 244,144 220,116" fill="none" stroke="#7c3aed" stroke-width="2"/>
      <text x="244" y="82" text-anchor="middle" font-size="8.6" font-weight="800" fill="#7c3aed">UV <395nm 遮断</text>
      <!-- Visible RGB passing cleanly -->
      <line x1="346" y1="88" x2="346" y2="288" stroke="#059669" stroke-width="2.6" marker-end="url(#${p}_arr_g)"/>
      <text x="358" y="274" font-size="9" font-weight="800" fill="#047857">400–700nm 透過 >99%</text>
      ${miraiKpi(452, 102, 236, 84, '超防湿バリア性能', '≤ 10⁻⁶ g/m²/day', 'Al₂O₃/TiO₂交互ALD＋有機バッファ', '#0284c7')}
      ${miraiKpi(452, 200, 236, 84, '長期耐久ロードマップ', '10年実用目標', 'OLED TFE量産技術をフルサイズへ転用', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '無ピンホールALD無機膜が水分拡散を迂回阻止', line2: '395nm未満の劣化UV光を急峻カット' },
      { label: '撮影メリット', line1: '雨天・海辺・長期保管でも発色劣化を防止', line2: '可視光99%透過で明るさを損なわない' },
      { label: '設計スペック', line1: 'WVTR ≤ 10⁻⁶ g/(m²·day) / OD>4 UV遮断', line2: 'コバール枠＋パリレン二重側面封止' },
    ],
  },
  mirai_fh02_top_ito_electrode: {
    badge: 'FH02-03',
    fhTag: FH02_TAG,
    zone: 'active',
    title: '最上層・極薄透明ITO共通電極＆透過ロス物理収支',
    analogy: '光を通しながら全面へ均一に電圧をかける極薄透明シート',
    metric: '単層透過 92–95%',
    scaleLabel: '4–6 INTERFACES · SHEET R ≤ 15 Ω/sq',
    accent: '#0284c7',
    accentSoft: '#e0f2fe',
    art: (p) => `
      <!-- Optical Throughput Budget Bar Chart: Bayer vs FH02 (honest ITO loss) -->
      <rect x="84" y="102" width="356" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="262" y="124" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">白色光・実効光利用率の物理収支（透明電極ロス込み）</text>
      <!-- Bayer bar -->
      <text x="98" y="160" font-size="9" font-weight="800" fill="#475569">2026 ベイヤー配列</text>
      <rect x="98" y="168" width="84" height="24" rx="4" fill="#94a3b8"/>
      <rect x="182" y="168" width="230" height="24" rx="4" fill="#fee2e2" stroke="#fca5a5"/>
      <text x="140" y="184" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">25–28%</text>
      <text x="296" y="184" text-anchor="middle" font-size="8.6" font-weight="700" fill="#991b1b">約2/3をCFで熱廃棄</text>
      <!-- FH02 Nature 2025 -->
      <text x="98" y="216" font-size="9" font-weight="800" fill="#0284c7">FH02 Nature 2025 実証</text>
      <rect x="98" y="224" width="164" height="22" rx="4" fill="url(#${p}_cyan)"/>
      <text x="180" y="239" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">実測 47–53%（約2倍）</text>
      <!-- FH02 2028 Target -->
      <text x="98" y="268" font-size="9" font-weight="800" fill="#047857">FH02 2028 極薄ITO目標</text>
      <rect x="98" y="274" width="224" height="20" rx="4" fill="url(#${p}_green)"/>
      <rect x="322" y="274" width="90" height="20" rx="4" fill="#e0f2fe" stroke="#7dd3fc"/>
      <text x="210" y="288" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">60–75%（2.0〜2.8倍）</text>
      <text x="367" y="288" text-anchor="middle" font-size="7.6" font-weight="700" fill="#0369a1">ITOロス</text>
      ${miraiKpi(462, 108, 226, 86, '極薄低温スパッタITO', 'T ≥ 92–95%/層', '成膜<100℃で下層ペロブスカイト保護', '#0284c7')}
      ${miraiKpi(462, 208, 226, 86, '外周銀バスバー枠', '≤ 15 Ω/sq', '画面中央のRC遅延とシェーディング防止', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '4〜6界面のITO光ロスを織り込んだ誠実設計', line2: '外周銀バスバーで全面均一バイアス印加' },
      { label: '撮影メリット', line1: '透明電極損失込みでも現行比2〜2.8倍の光量', line2: '高感度+1.0〜1.5段の純粋なS/N向上' },
      { label: '設計スペック', line1: '低温ソフトスパッタITO/IZO (<100℃)', line2: '可視透過92–95% / シート抵抗≤15Ω/sq' },
    ],
  },
  mirai_fh02_blue_perovskite_layer: {
    badge: 'FH02-04',
    fhTag: FH02_TAG,
    zone: 'active',
    title: '第1受光層：コバルト青（400–500nm）PVDペロブスカイト膜',
    analogy: '青い光だけ電気に変え、緑と赤は素通りさせる宝石の1階膜',
    metric: 'Blue EQE 53%→70%',
    scaleLabel: 'Eg ≈ 2.45 eV · λ = 400–500 nm',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    art: (p) => `
      <!-- 3-Layer Bandgap Cascade Highlighting Blue Top Layer -->
      <rect x="92" y="136" width="286" height="52" rx="7" fill="url(#${p}_blue)" stroke="#1e3a8a" stroke-width="2"/>
      <text x="235" y="160" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">Layer 1: 青ペロブスカイト (Eg ≈ 2.45 eV)</text>
      <text x="235" y="177" text-anchor="middle" font-size="8.6" font-weight="700" fill="#dbeafe">400–500 nm 急峻吸収 ・ Nature 2025 EQE 53%</text>
      <!-- Lower green/red dimmed context -->
      <rect x="92" y="206" width="286" height="32" rx="5" fill="#059669" opacity="0.28" stroke="#059669" stroke-dasharray="4 2"/>
      <text x="235" y="226" text-anchor="middle" font-size="9" font-weight="700" fill="#065f46">Layer 2: 緑層（500–600 nm透過到達）</text>
      <rect x="92" y="250" width="286" height="32" rx="5" fill="#dc2626" opacity="0.24" stroke="#dc2626" stroke-dasharray="4 2"/>
      <text x="235" y="270" text-anchor="middle" font-size="9" font-weight="700" fill="#991b1b">Layer 3: 赤層（600–700 nm透過到達）</text>
      <!-- Rays: Blue absorbed, Green & Red pass straight through -->
      <line x1="158" y1="84" x2="158" y2="152" stroke="#2563eb" stroke-width="3" marker-end="url(#${p}_arr_b)"/>
      <circle cx="158" cy="162" r="7" fill="#fde047"/>
      <line x1="235" y1="84" x2="235" y2="218" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_g)"/>
      <line x1="312" y1="84" x2="312" y2="262" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_r)"/>
      ${miraiKpi(406, 102, 280, 74, 'Foveon超えの急峻色分離', '誤差 0.18 vs 0.56', '直接遷移バンドギャップ端で濁りゼロ', '#2563eb')}
      ${miraiKpi(406, 188, 280, 74, '低温真空共蒸着（PVD）', '下層非再溶解成膜', '溶液スピンコートと違い3層積層可能', '#0f766e')}
      ${miraiComparePill(406, 274, 280, 'ASI鉛フリー無毒化(Sn/Bi系)が2028の鍵', true)}
    `,
    cards: [
      { label: '物理メカニズム', line1: '2.45eV直接遷移端で400–500nmのみ吸収', line2: '500nm超の緑・赤光は透明窓として通過' },
      { label: '撮影メリット', line1: 'ベイヤー25%配置比で青解像＆感度が倍増', line2: '青空や海面の滑らかなグラデーション' },
      { label: '検証根拠', line1: 'ETH Zurich/Empa Nature 2025 EQE 53%', line2: 'Frobenius色誤差 0.18（Foveon 0.56）' },
    ],
  },
  mirai_fh02_etl_htl_interlayer_1: {
    badge: 'FH02-05',
    fhTag: FH02_TAG,
    zone: 'active',
    title: '第1層間ETL/HTL電荷輸送＆光学透明絶縁スペーサ',
    analogy: '青と緑の電気が混線しないよう仕切るナノ交通整理シート',
    metric: '層間混線 < 0.05%',
    scaleLabel: 'ETL / SPACER / HTL · T ≥ 96%',
    accent: '#64748b',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <!-- Band-alignment / carrier separation diagram -->
      <rect x="88" y="102" width="324" height="44" rx="6" fill="url(#${p}_blue)"/>
      <text x="250" y="128" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">Layer 1: 青ペロブスカイト (e⁻ / h⁺ 生成)</text>
      <rect x="88" y="152" width="324" height="24" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
      <text x="250" y="168" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">ETL（電子輸送層 SnO₂/C₆₀）→ 青ビアへ抽出</text>
      <rect x="88" y="180" width="324" height="24" rx="3" fill="#f1f5f9" stroke="#475569" stroke-dasharray="4 2"/>
      <text x="250" y="196" text-anchor="middle" font-size="8.8" font-weight="800" fill="#334155">屈折率整合・光学透明絶縁スペーサ（電気完全遮断）</text>
      <rect x="88" y="208" width="324" height="24" rx="3" fill="#dcfce7" stroke="#059669"/>
      <text x="250" y="224" text-anchor="middle" font-size="8.8" font-weight="800" fill="#065f46">HTL（正孔輸送層 NiOₓ系）← 緑層の正孔回収</text>
      <rect x="88" y="238" width="324" height="44" rx="6" fill="url(#${p}_green)"/>
      <text x="250" y="264" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">Layer 2: 緑ペロブスカイト（500–600 nm）</text>
      ${miraiKpi(442, 108, 246, 82, '屈折率整合設計', 'T > 96% (>500nm)', '青/緑層間のフレネル干渉リップル抑制', '#0284c7')}
      ${miraiKpi(442, 204, 246, 82, '電気的完全絶縁', 'クロストーク <0.05%', '電子注入障壁で逆流暗電流も阻止', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '電子と正孔を逆方向へ高速分離抽出', line2: '透明絶縁スペーサが上下層の電気混線を遮断' },
      { label: '撮影メリット', line1: '濁りのない鮮やかな青・緑の独立発色', line2: '暗電流逆流を抑えた高S/N階調' },
      { label: '設計スペック', line1: 'ETL＋絶縁スペーサ＋HTL 多層ナノ膜', line2: '透過率≥96% / 層間混線 < 0.05%' },
    ],
  },
  mirai_fh02_green_perovskite_layer: {
    badge: 'FH02-06',
    fhTag: FH02_TAG,
    zone: 'active',
    title: '第2受光層：エメラルド緑（500–600nm）ペロブスカイト／OPF膜',
    analogy: '明るさの主役「緑の光」を全画素100%で捕まえる2階膜',
    metric: 'Green EQE 47%→70%',
    scaleLabel: 'Eg ≈ 2.05 eV · 100% FILL FACTOR',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- Bayer 50% G checkerboard vs FH02 100% Full-Area Green -->
      <rect x="84" y="106" width="188" height="176" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="178" y="128" text-anchor="middle" font-size="9.5" font-weight="800" fill="#475569">2026 ベイヤー（緑は50%のみ）</text>
      ${[0, 1, 2, 3]
        .map((r) =>
          [0, 1, 2, 3]
            .map((c) => {
              const col = (r + c) % 2 === 0 ? '#10b981' : r % 2 === 0 ? '#ef4444' : '#3b82f6';
              const op = (r + c) % 2 === 0 ? '0.92' : '0.26';
              return `<rect x="${108 + c * 35}" y="${140 + r * 32}" width="31" height="28" rx="4" fill="${col}" opacity="${op}"/>`;
            })
            .join('')
        )
        .join('')}
      <!-- Arrow -->
      <line x1="282" y1="196" x2="318" y2="196" stroke="#059669" stroke-width="2.8" marker-end="url(#${p}_arr_g)"/>
      <!-- FH02 100% Full-Area Green Layer -->
      <rect x="328" y="106" width="188" height="176" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
      <text x="422" y="128" text-anchor="middle" font-size="9.5" font-weight="900" fill="#065f46">FH02 第2層（全画素100%緑！）</text>
      ${[0, 1, 2, 3]
        .map((r) =>
          [0, 1, 2, 3]
            .map(
              (c) => `
          <rect x="${352 + c * 35}" y="${140 + r * 32}" width="31" height="28" rx="4" fill="url(#${p}_green)"/>
          <circle cx="${367 + c * 35}" cy="${154 + r * 32}" r="4.2" fill="#ecfdf5" stroke="#065f46" stroke-width="1"/>
        `
            )
            .join('')
        )
        .join('')}
      ${miraiKpi(532, 108, 160, 82, '実測→目標EQE', '47% → 65%+', 'Nature 2025実証\nOPF知見も合流', '#059669')}
      ${miraiKpi(532, 200, 160, 82, '輝度解像MTF', '100% 面積', 'デモザイク補間なし\n葉脈・織物を緻密描写', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '2.05eVバンドギャップで500–600nm全吸収', line2: '青用垂直ビアの絶縁貫通カラーを内蔵' },
      { label: '撮影メリット', line1: '輝度の要である緑を全画素100%で取得', line2: '木の葉や建築の繊細な輪郭が圧倒的に鮮鋭' },
      { label: '検証根拠', line1: 'ETH/Empa Nature 2025 Green EQE 47%', line2: 'Panasonic 2023 OPF有機薄膜GS基盤' },
    ],
  },
  mirai_fh02_etl_htl_interlayer_2: {
    badge: 'FH02-07',
    fhTag: FH02_TAG,
    zone: 'active',
    title: '第2層間ETL/HTL＆低赤外吸収・中層ITO読出しメッシュ',
    analogy: '緑の電気を集め赤い光を素通しする中2階の透明電極メッシュ',
    metric: '赤帯透過 ≥ 94%',
    scaleLabel: 'RC DELAY < 50 ns · IZO / Ag GRID',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <!-- Mid-ITO Grid Top View with pixel boundary silver micro-bars -->
      <rect x="92" y="106" width="286" height="186" rx="10" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="1.4"/>
      ${[140, 188, 236, 284, 332].map((x) => `<line x1="${x}" y1="112" x2="${x}" y2="286" stroke="#475569" stroke-width="2.4"/>`).join('')}
      ${[148, 198, 248].map((y) => `<line x1="98" y1="${y}" x2="372" y2="${y}" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 2"/>`).join('')}
      <text x="235" y="188" text-anchor="middle" font-size="11" font-weight="900" fill="#0f172a">IZO / ITO 透明電極 ＋ 画素境界銀バス</text>
      <text x="235" y="210" text-anchor="middle" font-size="9" font-weight="800" fill="#dc2626">600–700nm 赤色光を ≥94% 下層へ透過</text>
      ${miraiKpi(406, 108, 280, 82, '低赤外プラズマ吸収IZO', 'T_red ≥ 94%', '長波長赤光が自由電子に吸収されない配合', '#dc2626')}
      ${miraiKpi(406, 206, 280, 82, 'グローバルシャッター対応', 'τ_RC < 50 ns', '銀マイクロ格子が全面同時リセットを高速化', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '低キャリア濃度IZOで赤帯の自由電子吸収抑制', line2: '画素境界の極細銀ラインでRC時定数短縮' },
      { label: '撮影メリット', line1: '3層目の赤チャンネルまで明るく鮮明に届く', line2: '3色同時グローバルシャッター動作を支える' },
      { label: '設計スペック', line1: '赤帯(600–700nm)透過率 ≥ 94%', line2: '電荷読出し時定数 τ_RC < 50 ns' },
    ],
  },
  mirai_fh02_red_perovskite_layer: {
    badge: 'FH02-08',
    fhTag: FH02_TAG,
    zone: 'active',
    title: '第3受光層：ルビー赤（600–700nm）狭バンドギャップ膜＆反射回収',
    analogy: '赤い花びらや夕焼けを全面100%で受け止める3階建て最下層',
    metric: 'Red EQE 50%→70%',
    scaleLabel: 'Eg ≈ 1.72 eV · DOUBLE-PASS W-MIRROR',
    accent: '#dc2626',
    accentSoft: '#fef2f2',
    art: (p) => `
      <!-- Double-pass Red Absorption over Tungsten Bottom Mirror Electrode -->
      <rect x="92" y="138" width="320" height="72" rx="7" fill="url(#${p}_red)" stroke="#991b1b" stroke-width="1.6"/>
      <text x="252" y="170" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">Layer 3: ルビー赤ペロブスカイト (Eg ≈ 1.72 eV)</text>
      <text x="252" y="188" text-anchor="middle" font-size="8.8" font-weight="700" fill="#ffe4e6">600–700 nm 全面100%吸収（ベイヤー25%の4倍面積）</text>
      <!-- Tungsten bottom mirror reflector -->
      <rect x="92" y="210" width="320" height="22" rx="3" fill="url(#${p}_metal)" stroke="#475569"/>
      <text x="252" y="225" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">底面タングステン反射コレクター電極（ダブルパス回収）</text>
      <!-- Double-pass red photon bounce -->
      <polyline points="178,86 178,208 216,158" fill="none" stroke="#fde047" stroke-width="2.6" marker-end="url(#${p}_arr)"/>
      <text x="226" y="114" font-size="9" font-weight="800" fill="#dc2626">透過しかけた赤光子を反射回収</text>
      ${miraiKpi(440, 108, 248, 82, 'ベイヤー最大弱点を克服', '25% → 100% 面積', '赤花・肌色・夕焼けの解像感が劇的向上', '#dc2626')}
      ${miraiKpi(440, 206, 248, 82, '実測→目標EQE', '50% → 65%+', 'Nature 2025実証：現行赤画素の2倍超', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '1.72eV狭バンドギャップで600–700nm吸収', line2: '底面タングステン反射で長波長を二重回収' },
      { label: '撮影メリット', line1: '赤いバラやポートレート肌色が塗り潰れない', line2: '720nm超の赤外を自然透過し色再現向上' },
      { label: '検証根拠', line1: 'ETH Zurich/Empa Nature 2025 Red EQE 50%', line2: 'ベイヤー25%比で空間サンプリング2×化' },
    ],
  },
  mirai_fh02_vertical_via_pillars: {
    badge: 'FH02-09',
    fhTag: FH02_TAG,
    zone: 'link',
    title: '3段階スタッガード垂直RGBマイクロビア柱（3色独立抽出）',
    analogy: '1・2・3階から3色の電気を別々のエレベーターで地下へ運ぶ金属柱',
    metric: '面積損失 < 6% / 3柱',
    scaleLabel: '3-HEIGHT W/Cu VIAS · ALD ISOLATED',
    accent: '#d97706',
    accentSoft: '#fef3c7',
    art: (p) => `
      <!-- 3-Layer Stack pierced by 3 staggered height pillars down to ROIC -->
      <rect x="86" y="106" width="336" height="32" rx="4" fill="url(#${p}_blue)" opacity="0.82"/>
      <rect x="86" y="150" width="336" height="32" rx="4" fill="url(#${p}_green)" opacity="0.82"/>
      <rect x="86" y="194" width="336" height="32" rx="4" fill="url(#${p}_red)" opacity="0.82"/>
      <rect x="86" y="246" width="336" height="44" rx="6" fill="url(#${p}_si)" stroke="#0f172a"/>
      <text x="254" y="272" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">3-Ch 同時RGB CMOS ROIC 着地パッド（B / G / R独立）</text>
      <!-- Tall Blue Via -->
      <rect x="148" y="114" width="18" height="136" rx="2" fill="url(#${p}_cu)" stroke="#ffffff" stroke-width="1.6"/>
      <circle cx="157" cy="118" r="6" fill="url(#${p}_gold)"/>
      <text x="157" y="98" text-anchor="middle" font-size="8.6" font-weight="900" fill="#2563eb">青ビア(長)</text>
      <!-- Mid Green Via -->
      <rect x="245" y="158" width="18" height="92" rx="2" fill="url(#${p}_cu)" stroke="#ffffff" stroke-width="1.6"/>
      <circle cx="254" cy="162" r="6" fill="url(#${p}_gold)"/>
      <text x="254" y="146" text-anchor="middle" font-size="8.6" font-weight="900" fill="#059669">緑ビア(中)</text>
      <!-- Short Red Via -->
      <rect x="342" y="202" width="18" height="48" rx="2" fill="url(#${p}_cu)" stroke="#ffffff" stroke-width="1.6"/>
      <circle cx="351" cy="206" r="6" fill="url(#${p}_gold)"/>
      <text x="351" y="190" text-anchor="middle" font-size="8.6" font-weight="900" fill="#dc2626">赤ビア(短)</text>
      ${miraiKpi(448, 108, 240, 82, 'ALD側壁絶縁ライナー', '短絡・混色 0%', '長ビアが下層を貫通しても完全絶縁', '#d97706')}
      ${miraiKpi(448, 206, 240, 82, '微細化スケーリング難所', 'r ≈ 180 nm 目標', '2–4μm画素へ3柱を収めるBEOL技術', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '短・中・長3種の垂直柱で各層を独立接続', line2: 'ALD絶縁側壁が貫通層との短絡を防止' },
      { label: '撮影メリット', line1: '3色同時並列読出しで時間・空間ズレゼロ', line2: '受光面積損失6%未満で高感度維持' },
      { label: '量産課題', line1: '8×8試作から数千万画素への微細化壁', line2: '300mm BEOL高アスペクトビアが鍵' },
    ],
  },
  mirai_fh02_passivation_darkblock: {
    badge: 'FH02-10',
    fhTag: FH02_TAG,
    zone: 'active',
    title: 'ASI設計・粒界パッシベーション＆暗電流5桁低減ナノ膜',
    analogy: '結晶のスキマを分子で塞ぎ暗ノイズを10万分の1へ封じる魔法膜',
    metric: '暗電流 10⁻⁵倍目標',
    scaleLabel: 'ASI / PeroMAS · 5-ORDER GAP BRIDGE',
    accent: '#7c3aed',
    accentSoft: '#f5f3ff',
    art: (p) => `
      <!-- Log-scale Dark Current Gap Bridge: 2025 Nature -> 2028 ASI Target -> Si-CMOS -->
      <rect x="84" y="100" width="376" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="272" y="122" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">暗電流密度（対数スケール）：5桁の壁への挑戦</text>
      <!-- 2025 bar -->
      <text x="98" y="156" font-size="8.8" font-weight="800" fill="#dc2626">2025 Nature試作（10–50 nA/cm²）</text>
      <rect x="98" y="164" width="332" height="22" rx="4" fill="#ef4444"/>
      <text x="264" y="179" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">約数万 e⁻/s/pix（暗所撮影には5桁高い）</text>
      <!-- 2028 ASI Target -->
      <text x="98" y="214" font-size="8.8" font-weight="800" fill="#7c3aed">2028 FH02 ASI設計パッシベーション目標</text>
      <rect x="98" y="222" width="118" height="22" rx="4" fill="url(#${p}_violet)"/>
      <text x="226" y="237" font-size="8.6" font-weight="800" fill="#5b21b6">← 粒界終端＋High-K障壁で5桁低減</text>
      <!-- 2026 Si-CMOS reference -->
      <text x="98" y="268" font-size="8.8" font-weight="800" fill="#047857">2026 現行Si-CMOS基準</text>
      <rect x="98" y="274" width="44" height="14" rx="3" fill="#059669"/>
      <text x="152" y="285" font-size="8.4" font-weight="700" fill="#065f46">0.02–0.05 e⁻/s/pix（常温基準）</text>
      ${miraiKpi(480, 106, 208, 86, 'ASI材料探索の核心', 'PeroMAS 発展系', '双性イオン分子＋Al₂O₃トンネル障壁', '#7c3aed')}
      ${miraiKpi(480, 206, 208, 86, '自律実験室ループ', '探索速度 100×', '欠陥トラップ密度を極限まで低減', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '多結晶粒界トラップを分子パッシベーション', line2: 'ROIC電極からの熱電子逆流を障壁ブロック' },
      { label: '撮影メリット', line1: '夜景や長時間露光でも黒が締まる暗部耐性', line2: '試作段階の最大弱点を本質解決' },
      { label: '検証根拠', line1: 'Nature 2025暗電流基準（10–50 nA/cm²）', line2: 'arXiv:2602.13312v2 PeroMAS AI材料探索' },
    ],
  },
  mirai_fh02_cmos_roic_wafer: {
    badge: 'FH02-11',
    fhTag: FH02_TAG,
    zone: 'active',
    title: '300mm互換 3ch同時RGBグローバルシャッターCMOS ROIC',
    analogy: '受光は上へ任せ、シリコン100%を3色同時変換に使う専用頭脳板',
    metric: '100%回路面積・GS',
    scaleLabel: '300mm SI-CMOS ROIC · 3× 16-BIT ADC',
    accent: '#1e40af',
    accentSoft: '#dbeafe',
    art: (p) => `
      <!-- ROIC Floorplan Diagram showing Top/Bottom 16-bit RGB ADC Banks & 100% Si Area -->
      <rect x="90" y="102" width="332" height="196" rx="10" fill="url(#${p}_si)" stroke="#1e40af" stroke-width="1.6"/>
      <!-- Top & Bottom 3-Ch ADC Banks -->
      <rect x="108" y="114" width="296" height="28" rx="4" fill="#1e3a8a" stroke="#60a5fa"/>
      <text x="256" y="132" text-anchor="middle" font-size="9.2" font-weight="800" fill="#dbeafe">上部 16-bit 3ch同時並列カラムADCバンク（B/G/R）</text>
      <rect x="108" y="258" width="296" height="28" rx="4" fill="#1e3a8a" stroke="#60a5fa"/>
      <text x="256" y="276" text-anchor="middle" font-size="9.2" font-weight="800" fill="#dbeafe">下部 16-bit 3ch同時並列カラムADCバンク（B/G/R）</text>
      <!-- Center 3-Ch Global Shutter Storage Matrix -->
      <rect x="108" y="152" width="296" height="96" rx="6" fill="#0f172a" stroke="#d97706" stroke-width="1.2"/>
      ${[0, 1, 2]
        .map((i) => {
          const cols = ['#2563eb', '#059669', '#dc2626'];
          const names = ['B 蓄積ノード+CDS', 'G 蓄積ノード+CDS', 'R 蓄積ノード+CDS'];
          return `<rect x="${122 + i * 92}" y="166" width="84" height="68" rx="5" fill="${cols[i]}" fill-opacity="0.32" stroke="${cols[i]}" stroke-width="1.3"/><text x="${164 + i * 92}" y="204" text-anchor="middle" font-size="8.4" font-weight="800" fill="#f8fafc">${names[i]}</text>`;
        })
        .join('')}
      ${miraiKpi(448, 108, 240, 82, '光電変換と回路完全分離', 'Si面積 100% 活用', '巨大FWC蓄積容量＋歪みゼロGS両立', '#1e40af')}
      ${miraiKpi(448, 206, 240, 82, '300mm既存ファブ量産', 'BEOL低温積層', 'Panasonic OPF先行実証と同じ量産基盤', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '受光面を上層分離しSi面積を100%回路化', line2: '画素直下にB/G/R 3ch蓄積容量＋GS実装' },
      { label: '撮影メリット', line1: '3色同時グローバルシャッターで動体歪みゼロ', line2: '広いダイナミックレンジと16-bit豊かな階調' },
      { label: '量産民主化', line1: '既存300mmシリコン工場でROICを大量製造', line2: '後工程でPVD 3層膜を低温一括成膜' },
    ],
  },
  mirai_fh02_color_matrix_dsp: {
    badge: 'FH02-12',
    fhTag: FH02_TAG,
    zone: 'link',
    title: '分光クロストーク3×3カラーマトリクスDSP＆温度補償ダイ',
    analogy: '気温によるわずかな色ズレを整えノイズを増やさず美発色する色頭脳',
    metric: '条件数 cond(M)≈1.3',
    scaleLabel: '3×3 SYSTOLIC MAC · dEg/dT COMP',
    accent: '#4338ca',
    accentSoft: '#eef2ff',
    art: (p) => `
      <!-- 3x3 Color Matrix Transformation Flow -->
      <rect x="86" y="122" width="122" height="156" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="147" y="144" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">3層生信号</text>
      <rect x="104" y="156" width="86" height="28" rx="4" fill="url(#${p}_blue)"/><text x="147" y="174" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">I_Blue</text>
      <rect x="104" y="192" width="86" height="28" rx="4" fill="url(#${p}_green)"/><text x="147" y="210" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">I_Green</text>
      <rect x="104" y="228" width="86" height="28" rx="4" fill="url(#${p}_red)"/><text x="147" y="246" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">I_Red</text>
      <line x1="212" y1="200" x2="254" y2="200" stroke="#4338ca" stroke-width="2.4" marker-end="url(#${p}_arr)"/>
      <!-- 3x3 Systolic DSP Matrix -->
      <rect x="260" y="114" width="166" height="172" rx="10" fill="url(#${p}_violet)" stroke="#312e81" stroke-width="1.5"/>
      <text x="343" y="138" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">3×3 動的補正行列 M(T)</text>
      ${[0, 1, 2]
        .map((r) =>
          [0, 1, 2]
            .map(
              (c) => `
          <rect x="${280 + c * 44}" y="${152 + r * 36}" width="38" height="28" rx="4" fill="${r === c ? '#fef08a' : '#312e81'}" opacity="${r === c ? '0.95' : '0.55'}"/>
          <text x="${299 + c * 44}" y="${170 + r * 36}" text-anchor="middle" font-size="8.6" font-weight="900" fill="${r === c ? '#713f12' : '#e0e7ff'}">${r === c ? '0.94' : '-0.04'}</text>
        `
            )
            .join('')
        )
        .join('')}
      <text x="343" y="274" text-anchor="middle" font-size="8.4" font-weight="800" fill="#e0e7ff">対角優位 → 色ノイズ増幅極小</text>
      ${miraiKpi(454, 108, 234, 82, 'Foveonとの決定差', 'cond(M) ≈ 1.3', 'Foveonは非対角項が大きく暗所色濁り', '#4338ca')}
      ${miraiKpi(454, 206, 234, 82, 'dE_g/dT 温度色補償', 'CIE高精度再現', '温度による吸収端シフトを即時補正', '#0f766e')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '急峻な色分離により補正行列がほぼ対角化', line2: '温度依存バンドギャップシフトを動的補正' },
      { label: '撮影メリット', line1: '暗所でもカラーノイズが暴れない純粋発色', line2: 'メーカー固有色科学を16-bitで精密出力' },
      { label: '設計スペック', line1: '3×3シストリックMACアレイ＋温度LUT', line2: '条件数 cond(M)≈1.3 / Cu-Cu直下積層' },
    ],
  },
  mirai_fh02_hermetic_ceramic_carrier: {
    badge: 'FH02-13',
    fhTag: FH02_TAG,
    zone: 'pkg',
    title: '乾燥窒素パージ完全気密セラミックキャリア＆溶接フランジ',
    analogy: 'カラカラの乾燥窒素を閉じ込めてレーザー溶接する焼き物の金庫',
    metric: 'リーク < 10⁻⁹',
    scaleLabel: 'DRY N2 DEW POINT ≤ -60℃ · MIL-883',
    accent: '#475569',
    accentSoft: '#f1f5f9',
    art: (p) => `
      <!-- Hermetic Ceramic Vessel + Laser Seam Weld + Desiccant Moat -->
      <path d="M 92 126 L 146 126 L 146 210 L 194 210 L 194 248 L 434 248 L 434 210 L 482 210 L 482 126 L 536 126 L 536 286 L 92 286 Z" fill="url(#${p}_metal)" stroke="#334155" stroke-width="1.5"/>
      <!-- Kovar Seam-Weld Flange + Laser Beam -->
      <rect x="92" y="114" width="54" height="12" fill="#94a3b8" stroke="#1e293b"/>
      <rect x="482" y="114" width="54" height="12" fill="#94a3b8" stroke="#1e293b"/>
      <rect x="114" y="98" width="400" height="16" rx="3" fill="url(#${p}_glass)" stroke="#0284c7"/>
      <!-- Desiccant Moat highlights -->
      <rect x="150" y="182" width="40" height="24" rx="4" fill="url(#${p}_green)"/>
      <rect x="438" y="182" width="40" height="24" rx="4" fill="url(#${p}_green)"/>
      <!-- Dry N2 Cavity Label -->
      <text x="314" y="148" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0f766e">超高純度 乾燥N₂雰囲気（露点 ≤ −60℃）</text>
      <!-- Stack inside -->
      <rect x="218" y="170" width="192" height="16" fill="url(#${p}_blue)"/>
      <rect x="218" y="188" width="192" height="16" fill="url(#${p}_green)"/>
      <rect x="218" y="206" width="192" height="16" fill="url(#${p}_red)"/>
      <rect x="218" y="224" width="192" height="20" fill="url(#${p}_si)"/>
      ${miraiPin(122, 114, 554, 118, 1, 'レーザーシーム溶接', '金属同士の完全気密接合', '#334155', 'start')}
      ${miraiPin(458, 194, 554, 184, 2, '内周ゲッターモート', '乾燥剤リング専用格納溝', '#059669', 'start')}
      ${miraiKpi(554, 224, 140, 84, '完全ハーメチック', '< 10⁻⁹ He', 'MIL-STD-883\n樹脂レス無機封止', '#475569')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'アルミナ＋コバール溶接で水分透過ゼロ', line2: '露点−60℃乾燥窒素パージ＋専用モート' },
      { label: '撮影メリット', line1: '熱帯雨林から海辺まで10年安心の耐久性', line2: '大判フルサイズ平面度を精密維持' },
      { label: '設計スペック', line1: '56×44mm HTCC＋コバールレーザー溶接枠', line2: 'Heリーク率 < 10⁻⁹ atm·cm³/s' },
    ],
  },
  mirai_fh02_desiccant_getter_ring: {
    badge: 'FH02-14',
    fhTag: FH02_TAG,
    zone: 'pkg',
    title: '内周モート多孔質MOF/CaO水分・酸素ゲッターリング',
    analogy: '10年間に残った微量水分や酸素を吸い続けるハイテク乾燥剤リング',
    metric: 'H₂O < 0.1 ppm',
    scaleLabel: 'MOF / CaO GETTER · ePTFE DUST GUARD',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    art: (p) => `
      <!-- Zoomed Cross-Section of Getter Ring with ePTFE Dust Guard & Titanium Clip -->
      <rect x="96" y="170" width="290" height="86" rx="10" fill="url(#${p}_green)" stroke="#065f46" stroke-width="1.6"/>
      <text x="241" y="218" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">多孔質 MOF / CaO 化学吸着ゲッター層</text>
      <!-- ePTFE vapor-permeable dust-blocking top film -->
      <rect x="96" y="152" width="290" height="18" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.4"/>
      <text x="241" y="164.5" text-anchor="middle" font-size="8.6" font-weight="800" fill="#334155">微多孔 ePTFE 蒸気透過・粉塵完全遮断メンブレン</text>
      <!-- Titanium Clamp Clips Left & Right -->
      <rect x="86" y="146" width="26" height="118" rx="4" fill="url(#${p}_metal)" stroke="#475569"/>
      <rect x="370" y="146" width="26" height="118" rx="4" fill="url(#${p}_metal)" stroke="#475569"/>
      <!-- H2O / O2 absorbed downward -->
      ${[166, 241, 316].map((x) => `<line x1="${x}" y1="92" x2="${x}" y2="188" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#${p}_arr_b)"/>`).join('')}
      <text x="241" y="88" text-anchor="middle" font-size="9" font-weight="800" fill="#0369a1">残留・微量脱ガス H₂O / O₂ 分子を化学捕集</text>
      ${miraiKpi(424, 108, 264, 82, '三重防湿の最終防衛線', 'H₂O < 0.1 ppm', 'O₂ < 1 ppm を10年間維持する吸着余力', '#059669')}
      ${miraiKpi(424, 206, 264, 82, '耐衝撃チタンクランプ ×8', '> 1,000 G 保持', 'ePTFE膜で光学面への粉塵飛散ゼロ', '#475569')}
    `,
    cards: [
      { label: '物理メカニズム', line1: 'MOF/CaO化学吸着で極微量水分・酸素除去', line2: 'ePTFE微多孔膜が蒸気のみ通し粉塵遮断' },
      { label: '撮影メリット', line1: 'ペロブスカイト層の経年色変化・劣化を防止', line2: '受光面へのダスト汚染リスクもゼロ' },
      { label: '設計スペック', line1: '内周モート全周リング＋チタンクリップ×8', line2: '内部維持 H₂O<0.1ppm / O₂<1ppm' },
    ],
  },
  mirai_fh02_highspeed_fpc_array: {
    badge: 'FH02-15',
    fhTag: FH02_TAG,
    zone: 'link',
    title: '左右対称3倍帯域デュアルS字FPC＆IBIS反力ゼロ設計',
    analogy: '3倍の色データを左右2本の翼から流し手ブレ補正も安定させる二刀流配線',
    metric: '3× RGB帯域・対称',
    scaleLabel: 'DUAL 24-PIN ZIF · 32× MLCC BANK',
    accent: '#ea580c',
    accentSoft: '#ffedd5',
    art: (p) => `
      <!-- Symmetric Left + Right S-FPCs Balancing IBIS Forces -->
      <rect x="256" y="136" width="152" height="106" rx="10" fill="url(#${p}_si)" stroke="#0f766e" stroke-width="1.6"/>
      <text x="332" y="182" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">FH02 3層RGB</text>
      <text x="332" y="200" text-anchor="middle" font-size="8.4" font-weight="700" fill="#a7f3d0">3× フルカラー情報</text>
      <!-- Left FPC Wing -->
      <path d="M 256 188 L 194 188 C 160 188, 152 248, 118 248 L 80 248" fill="none" stroke="url(#${p}_cu)" stroke-width="16" stroke-linecap="round"/>
      <line x1="238" y1="158" x2="178" y2="158" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_g)"/>
      <text x="208" y="148" text-anchor="middle" font-size="8.4" font-weight="800" fill="#047857">F_left</text>
      <!-- Right FPC Wing -->
      <path d="M 408 188 L 470 188 C 504 188, 512 248, 546 248 L 584 248" fill="none" stroke="url(#${p}_cu)" stroke-width="16" stroke-linecap="round"/>
      <line x1="426" y1="158" x2="486" y2="158" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_g)"/>
      <text x="456" y="148" text-anchor="middle" font-size="8.4" font-weight="800" fill="#047857">F_right</text>
      <!-- Shoulder SMD MLCC indicators -->
      <rect x="234" y="168" width="18" height="40" rx="3" fill="url(#${p}_gold)"/>
      <rect x="412" y="168" width="18" height="40" rx="3" fill="url(#${p}_gold)"/>
      ${miraiComparePill(86, 290, 266, '片側1本FPC：帯域不足＋IBIS偏りモーメント', false)}
      ${miraiComparePill(368, 290, 316, '左右対称2本：3×帯域確保＋反力トルク完全相殺', true)}
      ${miraiPin(422, 168, 498, 108, 1, '両肩32個MLCC電源銀行', '3ch同時ADC電源を直近安定化', '#ca8a04', 'start')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '1画素3色の3倍データ帯域を左右2系統分散', line2: '対称S字バネ反力でIBIS回転トルクを相殺' },
      { label: '撮影メリット', line1: '完全非補間RGB16-bitの高速連写・動画対応', line2: '手ブレ補正の微細追従精度も同時向上' },
      { label: '設計スペック', line1: '左右対称デュアルS字FPC（計48極金ZIF）', line2: '両肩0402 MLCC ×32個＋EMIシールド' },
    ],
  },
  mirai_fh02_thermal_chassis_plate: {
    badge: 'FH02-16',
    fhTag: FH02_TAG,
    zone: 'cool',
    title: '純銅インレイ・マグネシウム冷却土台＆22枚マイクロフィン',
    analogy: '軽いマグネシウム枠に純銅コアと22枚フィンを組み込んだ冷却土台',
    metric: '膜面温度 ≤ 45℃',
    scaleLabel: 'Mg FRAME + C1100 Cu INLAY · 22 FINS',
    accent: '#c26d38',
    accentSoft: '#ffedd5',
    art: (p) => `
      <!-- Hybrid Magnesium Outer Frame + Pure Copper Center Core + 22 Rear Fins -->
      <rect x="88" y="138" width="346" height="148" rx="12" fill="url(#${p}_metal)" stroke="#475569" stroke-width="1.5"/>
      <rect x="136" y="162" width="250" height="100" rx="8" fill="url(#${p}_cu)" stroke="#78350f" stroke-width="1.5"/>
      <text x="261" y="208" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">純銅（C1100）中央インレイ放熱コア</text>
      <text x="261" y="226" text-anchor="middle" font-size="8.8" font-weight="700" fill="#ffedd5">k = 398 W/(m·K) ・ ROIC＋DSP熱を直下吸引</text>
      <!-- 22 Rear Copper Micro-Cooling Fins along top (-Z edge) -->
      ${Array.from({ length: 22 }, (_, i) => `<rect x="${120 + i * 13}" y="102" width="7" height="36" rx="1.5" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="0.6"/>`).join('')}
      <!-- 6 Corner Bolts -->
      ${[
        [106, 156],
        [416, 156],
        [106, 268],
        [416, 268],
        [261, 150],
        [261, 274],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="#1e293b" stroke="#f8fafc" stroke-width="1.3"/>`)
        .join('')}
      ${miraiPin(342, 114, 464, 114, 1, '22枚銅マイクロフィン', '背面放熱面積を大幅拡大', '#c26d38', 'start')}
      ${miraiKpi(464, 154, 224, 68, 'ペロブスカイト低温保護', 'T_film ≤ 45℃', '60℃超のイオン移動劣化を未然防止', '#0f766e')}
      ${miraiKpi(464, 232, 224, 68, '異種金属ハイブリッド軽量化', '全面銅比 -45%質量', 'IBIS駆動性と冷却能力を高次元両立', '#475569')}
    `,
    cards: [
      { label: '物理メカニズム', line1: '純銅コア(398 W/mK)＋22枚銅フィンで高速放熱', line2: '外枠Mg化で軽量性とIBIS追従性を確保' },
      { label: '撮影メリット', line1: '連続動画撮影でもペロブスカイト温度≤45℃', line2: '暗電流の熱暴走を防ぎ10年寿命を後押し' },
      { label: '設計スペック', line1: 'CNC Mg外枠＋C1100銅インレイ＋22枚フィン', line2: '3点SUS基準ボス＋M1.4ボルト×6' },
    ],
  },
};

export function renderFh02HdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  const spec = FH02_SPECS[type];
  return spec ? renderMiraiMonographSvg(spec) : null;
}
