import { PartExplanation } from '../../assemblies/types';
import {
  cmpBanner,
  dimArrow,
  kpiCard,
  nanoPin,
  renderBionzV2Hd,
} from './shared';

/**
 * Ultra-HD 720x500 Nanoscale Technical Schematics for BIONZ V2 Group B (X2-16 – X2-30):
 * {111} Diamond Epi Strain, MOL Wrap-Around Silicide, Monolithic CFET, xBIT 10T SRAM,
 * NPU Systolic MAC, AI-AWB Spectral DSP, 16-bit Demosaic 7K->4K, IBIS 8.5-Stop Kalman,
 * C2PA SRAM-PUF ECDSA, Buried Power Rail BPR, A16 Super Power Rail VB, Backside PDN Grid,
 * Backside Clock H-Tree, Thermal Phonon Via & CVD Diamond, and Coherent Unified NoC.
 */
export function renderBionzV2GroupB(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // X2-16. {111} Diamond-Faceted Epitaxial SiGe / SiP S/D Strain Engineering
    case 'xv2_sd_epi_strain':
      return renderBionzV2Hd({
        badge: 'X2-16',
        zone: 'feol',
        nodeTag: 'STRAIN ENG · {111} EPI',
        title: '結晶ひずみエンジニアリング「{111}ダイヤモンド面 SiGe／SiP エピタキシャルS/D」',
        analogy: '原子の大きいSiGeで横から押し縮め、小さいSiPで引っ張り、電子と正孔の移動速度を倍増',
        metric: 'キャリア移動度 最大 2×',
        scaleLabel: 'STRESS: ±1.5–2.5 GPa',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        art: (p) => `
          <!-- Top: pMOS Compressive SiGe S/D -->
          <rect x="74" y="84" width="424" height="92" rx="9" fill="#fff1f2" stroke="#fda4af"/>
          <text x="286" y="101" text-anchor="middle" font-size="9.5" font-weight="800" fill="#9f1239">pMOS：格子定数が大きい SiGe（Ge 40–50%）でチャネルを圧縮!</text>
          <polygon points="100,114 148,114 166,138 148,164 100,164 84,138" fill="url(#${p}_sige)" stroke="#881337" stroke-width="1.3"/>
          <polygon points="424,114 472,114 488,138 472,164 424,164 406,138" fill="url(#${p}_sige)" stroke="#881337" stroke-width="1.3"/>
          <text x="125" y="142" text-anchor="middle" font-size="8.6" font-weight="900" fill="#fff">{111} SiGe</text>
          <text x="447" y="142" text-anchor="middle" font-size="8.6" font-weight="900" fill="#fff">{111} SiGe</text>
          ${[122, 136, 150].map((y) => `<rect x="166" y="${y}" width="240" height="8" rx="2" fill="url(#${p}_cyan)"/>`).join('')}
          <line x1="172" y1="138" x2="218" y2="138" stroke="#be123c" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>
          <line x1="400" y1="138" x2="354" y2="138" stroke="#be123c" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>
          <text x="286" y="171" text-anchor="middle" font-size="8.4" font-weight="900" fill="#be123c">→ 圧縮ひずみ（−2 GPa）で正孔移動度 +80〜100% ←</text>

          <!-- Bottom: nMOS Tensile Si:P / Si:C S/D -->
          <rect x="74" y="188" width="424" height="92" rx="9" fill="#f0f9ff" stroke="#7dd3fc"/>
          <text x="286" y="205" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">nMOS：リン高濃度 Si:P エピタキシャルでチャネルを引張!</text>
          <polygon points="100,218 148,218 166,242 148,268 100,268 84,242" fill="url(#${p}_emerald)" stroke="#065f46" stroke-width="1.3"/>
          <polygon points="424,218 472,218 488,242 472,268 424,268 406,242" fill="url(#${p}_emerald)" stroke="#065f46" stroke-width="1.3"/>
          <text x="125" y="246" text-anchor="middle" font-size="8.6" font-weight="900" fill="#fff">{111} Si:P</text>
          <text x="447" y="246" text-anchor="middle" font-size="8.6" font-weight="900" fill="#fff">{111} Si:P</text>
          ${[226, 240, 254].map((y) => `<rect x="166" y="${y}" width="240" height="8" rx="2" fill="url(#${p}_blue)"/>`).join('')}
          <line x1="230" y1="242" x2="180" y2="242" stroke="#0284c7" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>
          <line x1="342" y1="242" x2="392" y2="242" stroke="#0284c7" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>
          <text x="286" y="275" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0369a1">← 引張ひずみ（+1.5 GPa）で電子移動度 +50% →</text>

          <!-- Right Panel: Band Splitting Physics -->
          <rect x="516" y="88" width="178" height="192" rx="9" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="605" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">エネルギー帯ひずみ効果</text>
          <path d="M 544 176 Q 605 122 666 176" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="3 2"/>
          <path d="M 556 176 Q 605 138 654 176" fill="none" stroke="#e11d48" stroke-width="2.4"/>
          <text x="605" y="194" text-anchor="middle" font-size="8.4" font-weight="800" fill="#be123c">有効質量 m* が軽くなる!</text>
          <text x="605" y="210" text-anchor="middle" font-size="8.0" fill="#475569">バレー縮退分離→散乱減少</text>
          ${kpiCard(530, 220, 150, 52, 'S/Dドーピング濃度', '> 1×10²¹ cm⁻³', '超低シート抵抗化', '#0d9488')}

          ${nanoPin(148, 138, 92, 314, 1, '自然結晶{111}ダイヤモンド面', 'エピタキシャル選択成長で低欠陥化', '#e11d48', 'start')}
          ${nanoPin(447, 242, 376, 314, 2, 'レーザーアニール活性化', 'ナノ秒加熱で超高濃度ドーパント固定', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'pMOSにSiGe圧縮・nMOSにSi:P引張の{111}単結晶成長', line2: '結晶格子を意図的に歪ませ電子/正孔の有効質量を軽減' },
          { label: '撮影・画質への恩恵', line1: '電圧を上げずにトランジスタ駆動電流を大幅ブースト', line2: 'BIONZ XR2の最高クロック向上と省エネ発熱抑制を両立' },
          { label: '実機・2026学会諸元', line1: '応力 ±1.5〜2.5 GPa / 活性ドーパント >10²¹ cm⁻³', line2: 'ミリ秒〜ナノ秒レーザーアニール（LSA）結晶活性化' },
        ],
      });

    // X2-17. MOL Ultra-Low-Resistance Wrap-Around Silicide & Co/W Trench Contact
    case 'xv2_mol_silicide_contact':
      return renderBionzV2Hd({
        badge: 'X2-17',
        zone: 'feol',
        nodeTag: '2nm MOL · WRAP-AROUND',
        title: 'MOL極低抵抗「ラップアラウンド TiSi₂ / NiPtSi シリサイド＆Co/Wコンタクト」',
        analogy: '上面だけでなく結晶の左右側面まで金属でぐるっと包み込み、出口の詰まり抵抗を1/3へ',
        metric: '接触抵抗 ρ_c < 1×10⁻⁹ Ω·cm²',
        scaleLabel: 'SILICIDE WRAP: 3-SIDED',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        art: (p) => `
          <!-- Left: Top-Only Planar Contact (BAD) -->
          ${cmpBanner(74, 84, 198, '× 従来上面コンタクト：面積不足', false)}
          <rect x="130" y="120" width="86" height="44" rx="3" fill="url(#${p}_ru)"/>
          <rect x="136" y="164" width="74" height="8" fill="#dc2626"/>
          <polygon points="122,172 224,172 240,210 224,248 122,248 106,210" fill="url(#${p}_emerald)"/>
          <text x="173" y="214" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">S/D Epi</text>
          <text x="173" y="266" text-anchor="middle" font-size="8.6" font-weight="700" fill="#991b1b">上面1面しか触れず抵抗が支配的!</text>

          <!-- Right: Wrap-Around 3-Sided Silicide + Co/W Trench Contact (GOOD) -->
          ${cmpBanner(298, 84, 240, '○ ラップアラウンド・シリサイド（面積2.8×）', true)}
          <!-- Co/W Trench Metal wrapping all 3 faces -->
          <path d="M 332 120 L 504 120 L 504 236 L 478 236 L 478 170 L 358 170 L 358 236 L 332 236 Z" fill="url(#${p}_ru)" stroke="#334155" stroke-width="1.3"/>
          <text x="418" y="146" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0f172a">Co / W / Mo トレンチコンタクト</text>
          <!-- Glowing TiSi2 / NiPtSi Silicide Wrap Halo -->
          <polygon points="360,168 476,168 492,208 476,248 360,248 344,208" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.4"/>
          <polygon points="370,178 466,178 478,208 466,238 370,238 358,208" fill="url(#${p}_emerald)"/>
          <text x="418" y="212" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">S/D Epi結晶</text>
          <!-- Current Arrows entering from Top, Left, Right! -->
          <line x1="418" y1="154" x2="418" y2="178" stroke="#0284c7" stroke-width="2.2" marker-end="url(#${p}_arr_blue)"/>
          <line x1="342" y1="208" x2="366" y2="208" stroke="#0284c7" stroke-width="2.2" marker-end="url(#${p}_arr_blue)"/>
          <line x1="494" y1="208" x2="470" y2="208" stroke="#0284c7" stroke-width="2.2" marker-end="url(#${p}_arr_blue)"/>

          <!-- Right Panel: Parasitic Resistance Pie/Bar -->
          <rect x="556" y="92" width="138" height="174" rx="9" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="625" y="112" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">2nm R_on 内訳改善</text>
          <text x="566" y="136" font-size="8.0" font-weight="700" fill="#dc2626">上面のみ: R_c 55%</text>
          <rect x="566" y="142" width="116" height="16" rx="3" fill="#ef4444"/>
          <text x="566" y="178" font-size="8.0" font-weight="800" fill="#059669">全周ラップ: R_c 22%!</text>
          <rect x="566" y="184" width="48" height="16" rx="3" fill="#059669"/>
          ${kpiCard(564, 210, 122, 48, '比接触抵抗率 ρ_c', '< 10⁻⁹ Ω·cm²', 'ショットキー障壁低減', '#0284c7')}

          ${nanoPin(358, 200, 96, 308, 1, '極薄 TiSi₂ / NiPtSi シリサイド膜', '側面まで包み込み接触面積 2.8倍', '#d97706', 'start')}
          ${nanoPin(492, 144, 376, 308, 2, '低抵抗Co/Moボトムアップ充填', '2nm最大のボトルネックR_csdを突破', '#475569', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'S/Dエピの上面＋両側面をTiSi₂/NiPtSiで3面ラップ', line2: '高導電Co/W/Moトレンチ金属でV字・側面同時接続' },
          { label: '撮影・画質への恩恵', line1: '2nmで最大の速度阻害要因となる寄生接触抵抗を半減以下', line2: '高周波ISPパイプラインのスイッチング遅延を大幅短縮' },
          { label: '実機・2026学会諸元', line1: '比接触抵抗率 ρ_c < 1×10⁻⁹ Ω·cm²（接触面積 2.5–3×）', line2: 'TSMC N2/A16・IBM・AMAT 2nm MOL標準コンタクト構造' },
        ],
      });

    // X2-18. Next-Gen Ultimate Transistor: Monolithic CFET (45nm Pitch)
    case 'xv2_monolithic_cfet':
      return renderBionzV2Hd({
        badge: 'X2-18',
        zone: 'feol',
        nodeTag: 'POST-A14 · 45nm CFET',
        title: '次世代究極トランジスタ「モノリシックCFET（nMOSをpMOS真上へ2階建て積層）」',
        analogy: '横並びだったnMOSとpMOSを2階建てアパートに縦積みし、インバータ面積を一気に約半分へ',
        metric: 'セル面積 約 −40〜50%',
        scaleLabel: 'CFET CPP: 45–48 nm (2-STORY)',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- Left: 2D Side-by-Side GAA Inverter -->
          ${cmpBanner(72, 84, 188, '現行2nm GAA（平屋・横並び）', false)}
          <rect x="82" y="142" width="76" height="84" rx="6" fill="url(#${p}_cyan)" stroke="#0369a1"/>
          <text x="120" y="188" text-anchor="middle" font-size="10.2" font-weight="900" fill="#fff">nMOS</text>
          <rect x="174" y="142" width="76" height="84" rx="6" fill="url(#${p}_sige)" stroke="#9f1239"/>
          <text x="212" y="188" text-anchor="middle" font-size="10.2" font-weight="900" fill="#fff">pMOS</text>
          ${dimArrow(82, 244, 250, 244, '横幅 2W + 分離幅', '#dc2626')}
          <text x="166" y="272" text-anchor="middle" font-size="8.6" font-weight="700" fill="#991b1b">p-n分離スペースが面積の半分を消費</text>

          <path d="M 268 184 L 298 184" stroke="#7c3aed" stroke-width="3" marker-end="url(#${p}_arr_dark)"/>

          <!-- Right: Monolithic 2-Story CFET -->
          ${cmpBanner(308, 84, 214, 'モノリシックCFET（2階建て縦積み）', true)}
          <!-- Upper Floor: nMOS 2-sheet -->
          <rect x="348" y="114" width="134" height="58" rx="6" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.3"/>
          <rect x="364" y="126" width="102" height="11" rx="2" fill="#e0f2fe"/>
          <rect x="364" y="146" width="102" height="11" rx="2" fill="#e0f2fe"/>
          <text x="415" y="168" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">2階：上層 nMOS (Si)</text>

          <!-- Middle Dielectric Isolation (MDI) -->
          <rect x="336" y="174" width="158" height="14" rx="3" fill="url(#${p}_gold)"/>
          <text x="415" y="184" text-anchor="middle" font-size="7.8" font-weight="900" fill="#713f12">中間誘電体分離層 (MDI)</text>

          <!-- Lower Floor: pMOS 2-sheet -->
          <rect x="348" y="190" width="134" height="58" rx="6" fill="url(#${p}_sige)" stroke="#9f1239" stroke-width="1.3"/>
          <rect x="364" y="202" width="102" height="11" rx="2" fill="#ffe4e6"/>
          <rect x="364" y="222" width="102" height="11" rx="2" fill="#ffe4e6"/>
          <text x="415" y="244" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">1階：下層 pMOS (SiGe)</text>

          <!-- Dual-WFM Vertical Shared Gate Spine -->
          <rect x="328" y="116" width="14" height="130" rx="3" fill="url(#${p}_hfo2)"/>
          <!-- Backside Power Direct Feed into Lower pMOS -->
          <rect x="348" y="252" width="134" height="16" rx="3" fill="url(#${p}_cu)"/>
          <text x="415" y="263" text-anchor="middle" font-size="7.8" font-weight="900" fill="#fff">裏面電源 BSPDN 直結</text>

          ${dimArrow(348, 280, 482, 280, '面積ほぼ半減!', '#059669')}

          <!-- Far Right KPIs -->
          ${kpiCard(542, 102, 150, 72, 'インバータ面積削減', '−40 〜 −50%', '3T〜4T超低セル高へ', '#7c3aed')}
          ${kpiCard(542, 188, 150, 72, '2026最新実証ピッチ', '45 nm CPP', 'Intel / TSMC / imec', '#0284c7')}

          ${nanoPin(335, 178, 92, 314, 1, '上下デュアルWFM共通ゲート', '1本の縦ゲートでn/pを同時駆動', '#7c3aed', 'start')}
          ${nanoPin(482, 258, 376, 314, 2, '表裏同時配線（前：信号／裏：電源）', 'CFETで初めて真価を発揮するBSPDN', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '単一エピ積層からMDI絶縁を挟みnMOS/pMOSを垂直積層', line2: 'p-n分離距離をゼロ化し標準セル高を3T〜4T級へ極小化' },
          { label: '撮影・画質への恩恵', line1: '将来のαフラッグシップへ数倍規模のAI-NPUとキャッシュ搭載', line2: 'オンチップ動画生成補正・超高速RAW認識の礎となる次世代構造' },
          { label: '実機・2026学会諸元', line1: 'ゲートピッチ 45–48 nm（VLSI 2026 / IEDM 2025実証）', line2: 'A10〜A7世代（2030年前後）の本命ポストGAAアーキテクチャ' },
        ],
      });

    // X2-19. ISSCC 2026 MediaTek xBIT 10T Logic SRAM & 0.0175um^2 N2 SRAM
    case 'xv2_xbit_sram_cell':
      return renderBionzV2Hd({
        badge: 'X2-19',
        zone: 'isp_mem',
        nodeTag: 'ISSCC 2026 · 38.1 Mb/mm²',
        title: 'ISSCC 2026「xBIT 10Tロジック型SRAM ＆ 2nm 38.1 Mb/mm² 超高密度キャッシュ」',
        analogy: '演算回路のすぐ隣に超高密度メモリの本棚を敷き詰め、外部DRAMへ取りに行くムダを根絶',
        metric: '38.1 Mb/mm² / 0.0175 μm²',
        scaleLabel: '2nm HD 6T: 0.021 → 0.0175 μm²',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        art: (p) => `
          <!-- Left: 10T xBIT / 6T Bitcell Schematic Layout -->
          <rect x="74" y="88" width="320" height="194" rx="10" fill="#ffffff" stroke="#93c5fd" stroke-width="1.3"/>
          <text x="234" y="107" text-anchor="middle" font-size="9.6" font-weight="800" fill="#1e3a8a">2nm GAA 超高密度SRAM ＆ 10Tデュアルポート分離読出</text>

          <!-- Cross-Coupled 6T Core Latch -->
          <rect x="128" y="124" width="212" height="84" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.3"/>
          <rect x="144" y="138" width="76" height="56" rx="5" fill="url(#${p}_blue)"/>
          <text x="182" y="164" text-anchor="middle" font-size="9.2" font-weight="900" fill="#fff">INV-L (Q)</text>
          <text x="182" y="180" text-anchor="middle" font-size="7.6" fill="#dbeafe">狭幅15nm GAA</text>

          <rect x="248" y="138" width="76" height="56" rx="5" fill="url(#${p}_cyan)"/>
          <text x="286" y="164" text-anchor="middle" font-size="9.2" font-weight="900" fill="#fff">INV-R (QB)</text>
          <text x="286" y="180" text-anchor="middle" font-size="7.6" fill="#e0f2fe">狭幅15nm GAA</text>
          <line x1="220" y1="154" x2="248" y2="178" stroke="#0f172a" stroke-width="1.6"/>
          <line x1="220" y1="178" x2="248" y2="154" stroke="#0f172a" stroke-width="1.6"/>

          <!-- Dedicated 4T Decoupled Read Buffer (xBIT 10T -> Zero Read Disturb!) -->
          <rect x="128" y="218" width="212" height="48" rx="7" fill="url(#${p}_emerald)" stroke="#059669"/>
          <text x="234" y="238" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">専用 4T 読出ポート（xBIT 10T構成）</text>
          <text x="234" y="254" text-anchor="middle" font-size="8.0" fill="#d1fae5">記憶ノードへ干渉ゼロ → 超低Vmin動作!</text>

          <!-- Bitline Rails Left & Right -->
          <line x1="98" y1="118" x2="98" y2="270" stroke="#ea580c" stroke-width="3"/>
          <text x="98" y="278" text-anchor="middle" font-size="7.8" font-weight="900" fill="#9a3412">BL</text>
          <line x1="368" y1="118" x2="368" y2="270" stroke="#ea580c" stroke-width="3"/>
          <text x="368" y="278" text-anchor="middle" font-size="7.8" font-weight="900" fill="#9a3412">BLB</text>

          <!-- Right Panel: SRAM Density Progression -->
          <rect x="412" y="88" width="280" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="552" y="108" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f172a">SRAM マクロ密度の世代ブレイクスルー</text>
          ${[
            { y: 126, w: 146, l: '5nm / 3nm FinFET 停滞期', v: '~31.8 Mb/mm²', c: '#94a3b8' },
            { y: 170, w: 196, l: 'TSMC N2 / Intel 18A GAA', v: '38.1 Mb/mm²', c: '#2563eb' },
            { y: 214, w: 236, l: 'ISSCC 2026 xBIT / A14世代', v: '&lt;0.017 μm²/bit', c: '#059669' },
          ].map((b) => `
            <text x="426" y="${b.y}" font-size="8.4" font-weight="800" fill="#334155">${b.l}</text>
            <rect x="426" y="${b.y + 6}" width="${b.w}" height="18" rx="4" fill="${b.c}"/>
            <text x="${432 + b.w * 0.5}" y="${b.y + 18.5}" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">${b.v}</text>
          `).join('')}

          ${nanoPin(234, 242, 92, 314, 1, 'リードディスターブ完全解消', '低電圧でもデータ化けなし＆高速読出', '#059669', 'start')}
          ${nanoPin(540, 184, 376, 314, 2, 'NanoFlex狭幅シート＋DTCO', 'NPU直近へ数十MB級SRAMを搭載可能', '#2563eb', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '2nm GAA狭幅シート＋専用読出ポートで低Vmin安定化', line2: '周辺回路DTCO圧縮により38.1 Mb/mm²の超高密度達成' },
          { label: '撮影・画質への恩恵', line1: 'AI認識モデルの重みを外部DRAMへ取りに行かず省エネ推論', line2: '高解像度デモザイク用ラインバッファを大容量オンダイ格納' },
          { label: '実機・2026学会諸元', line1: 'TSMC N2 38.1 Mb/mm² / ISSCC 2026 MediaTek xBIT', line2: 'セル面積 0.021 → 0.0175 μm²（A14で<0.017 μm²へ）' },
        ],
      });

    // X2-20. BIONZ XR2 Integrated AI NPU Systolic MAC Array & Zero-Skip
    case 'xv2_npu_systolic_mac':
      return renderBionzV2Hd({
        badge: 'X2-20',
        zone: 'isp_mem',
        nodeTag: 'BIONZ XR2 · AI NPU',
        title: 'BIONZ XR2統合AI処理ユニット「INT4/INT8/FP8 シストリックMAC＆ゼロスキップ」',
        analogy: '数千個の掛け算器が心臓の鼓動のようにデータをリレーし、0の計算は自動スキップして超省エネ',
        metric: 'INT4/FP8 / ゼロスキップ -60%',
        scaleLabel: 'SYSTOLIC PE ARRAY: 64×64+',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- Left: 4x4 Systolic MAC PE Array with Zero-Skip Highlighting -->
          <rect x="116" y="102" width="236" height="170" rx="10" fill="#0f172a" stroke="#a78bfa" stroke-width="1.5"/>
          <text x="234" y="120" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ddd6fe">シストリック積和演算（MAC）アレイ</text>
          ${Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => {
              const x = 132 + c * 52;
              const y = 130 + r * 33;
              const isZero = (r === 1 && c === 2) || (r === 2 && c === 0) || (r === 3 && c === 3);
              return `
                <rect x="${x}" y="${y}" width="44" height="26" rx="4" fill="${isZero ? '#1e293b' : 'url(#' + p + '_hfo2)'}" stroke="${isZero ? '#475569' : '#c4b5fd'}" stroke-dasharray="${isZero ? '3 2' : 'none'}"/>
                <text x="${x + 22}" y="${y + 16}" text-anchor="middle" font-size="7.8" font-weight="900" fill="${isZero ? '#64748b' : '#ffffff'}">${isZero ? 'SKIP 0' : 'MAC'}</text>
              `;
            }).join('')
          ).join('')}

          <!-- Input Activations from Left -->
          ${[143, 176, 209, 242].map((y, i) => `
            <line x1="74" y1="${y}" x2="116" y2="${y}" stroke="#38bdf8" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
            <text x="72" y="${y + 3}" text-anchor="end" font-size="7.6" font-weight="800" fill="#0369a1">A${i}</text>
          `).join('')}

          <!-- Weights from Top -->
          ${[154, 206, 258, 310].map((x, i) => `
            <line x1="${x}" y1="78" x2="${x}" y2="102" stroke="#f59e0b" stroke-width="2" marker-end="url(#${p}_arr_gold)"/>
            <text x="${x}" y="75" text-anchor="middle" font-size="7.6" font-weight="800" fill="#b45309">W${i}</text>
          `).join('')}

          <!-- Right Panel: Mixed Precision + Zero-Skip Power Savings -->
          <rect x="378" y="92" width="314" height="184" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="535" y="112" text-anchor="middle" font-size="10.0" font-weight="800" fill="#0f172a">混合精度量子化 ＆ ゼロスキップ省電力効果</text>
          ${[
            { y: 128, t: 'INT4（重み圧縮・高速骨格推論）', w: 256, c: '#7c3aed', v: '4× TOPS/W' },
            { y: 164, t: 'INT8 / FP8（瞳AF・AI-AWB精密推論）', w: 196, c: '#2563eb', v: '2× TOPS/W' },
            { y: 200, t: 'スパース性ゼロスキップ（ReLU後0値遮断）', w: 158, c: '#059669', v: '電力 −60%' },
          ].map((b) => `
            <text x="392" y="${b.y}" font-size="8.4" font-weight="800" fill="#334155">${b.t}</text>
            <rect x="392" y="${b.y + 5}" width="${b.w}" height="17" rx="4" fill="${b.c}"/>
            <text x="${398 + b.w * 0.5}" y="${b.y + 17}" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">${b.v}</text>
          `).join('')}
          <text x="535" y="264" text-anchor="middle" font-size="8.6" font-weight="800" fill="#5b21b6">従来別チップだったAIユニットをBIONZ XR2へ完全統合!</text>

          ${nanoPin(258, 176, 94, 314, 1, 'ハードウェア・ゼロスキップ', '乗数0のときフリップフロップ時計を即停止', '#059669', 'start')}
          ${nanoPin(490, 146, 378, 314, 2, '同一ダイ内ISP直結AI推論', 'フレーム遅延ゼロで60Hz AF＆AI-AWB実行', '#7c3aed', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '2次元シストリックPE配列でSRAM読出回数を極小化', line2: 'INT4/INT8/FP8混合精度とゼロ値クロックゲーティング搭載' },
          { label: '撮影・画質への恩恵', line1: '人物骨格・動物・鳥・昆虫・車両を毎秒60回リアルタイム認識', line2: 'ワンチップ統合によりα7 Vの省電力とAF追従を同時向上' },
          { label: '実機・2026学会諸元', line1: 'Sony α7 V（ILCE-7M5）/ FX5 搭載 BIONZ XR2 統合NPU', line2: 'ゼロスキップ電力削減 最大−60%・Transformer対応' },
        ],
      });

    // X2-21. α7 V / α7R VI AI Auto White Balance (AI-AWB) Spectral DSP
    case 'xv2_ai_awb_spectral_dsp':
      return renderBionzV2Hd({
        badge: 'X2-21',
        zone: 'isp_mem',
        nodeTag: 'α7 V NEW · AI-AWB',
        title: 'α7 V 新搭載「AIオートホワイトバランス（AI-AWB）ディープラーニング光源推定」',
        analogy: '画面の背景色に惑わされず「光源の種類」をAIが見抜き、人肌と白を常に正しく再現',
        metric: '混在光源推定 / 肌色忠実再現',
        scaleLabel: 'SPECTRUM: 380–780 nm AI',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        art: (p) => `
          <!-- Left: Mixed Lighting Scene Analysis -->
          <rect x="74" y="88" width="232" height="186" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.4"/>
          <text x="190" y="106" text-anchor="middle" font-size="9.4" font-weight="800" fill="#6ee7b7">混在光源シーンのAIセマンティック分離</text>
          <!-- Warm Tungsten vs Cool Daylight + Green Foliage Trap -->
          <rect x="90" y="118" width="96" height="62" rx="6" fill="#f59e0b" fill-opacity="0.28" stroke="#f59e0b"/>
          <text x="138" y="144" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fde047">室内電球</text>
          <text x="138" y="160" text-anchor="middle" font-size="8.0" fill="#fef3c7">2800K</text>
          <rect x="194" y="118" width="96" height="62" rx="6" fill="#38bdf8" fill-opacity="0.28" stroke="#38bdf8"/>
          <text x="242" y="144" text-anchor="middle" font-size="8.6" font-weight="800" fill="#bae6fd">窓の日陰</text>
          <text x="242" y="160" text-anchor="middle" font-size="8.0" fill="#e0f2fe">7200K</text>
          <rect x="90" y="188" width="200" height="72" rx="6" fill="#059669" fill-opacity="0.28" stroke="#34d399"/>
          <circle cx="190" cy="218" r="18" fill="#fed7aa" stroke="#fb923c" stroke-width="1.6"/>
          <text x="190" y="221" text-anchor="middle" font-size="8.0" font-weight="900" fill="#7c2d12">人物肌</text>
          <text x="190" y="251" text-anchor="middle" font-size="8.2" font-weight="800" fill="#a7f3d0">一面緑の背景でも緑被り補正ミスゼロ!</text>

          <!-- Right: Spectral Estimation + Gain Matrix -->
          <rect x="326" y="88" width="366" height="186" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="509" y="108" text-anchor="middle" font-size="10.0" font-weight="800" fill="#0f172a">ディープラーニング光源分光推定 → R/G/B適応ゲイン</text>
          <!-- Spectral Curve -->
          <path d="M 352 214 Q 402 132 452 174 T 552 142 T 658 206" fill="none" stroke="url(#${p}_laser)" stroke-width="2.6"/>
          <line x1="348" y1="216" x2="668" y2="216" stroke="#64748b" stroke-width="1.2"/>
          <text x="364" y="230" font-size="7.8" font-weight="800" fill="#2563eb">450nm (B)</text>
          <text x="488" y="230" font-size="7.8" font-weight="800" fill="#059669">550nm (G)</text>
          <text x="616" y="230" font-size="7.8" font-weight="800" fill="#dc2626">650nm (R)</text>
          ${cmpBanner(348, 242, 152, '従来AWB: 緑背景で赤被り', false)}
          ${cmpBanner(512, 242, 162, 'AI-AWB: 物体と光源を分離', true)}

          ${nanoPin(190, 218, 92, 314, 1, '被写体×光源マップ同時推論', '人物肌・白服・空・植物をAI識別', '#059669', 'start')}
          ${nanoPin(508, 164, 376, 314, 2, 'LEDフリッカー・演色性変化も補償', 'AWB精度大幅向上（α7 V公式機能）', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '統合AI NPUがシーンの意味理解から光源色温度を直接推定', line2: 'IRセンサー頼みでなく画面領域別の分光分布マップを生成' },
          { label: '撮影・画質への恩恵', line1: '木陰・夕陽・室内LED混在でも自然なスキントーンを即再現', line2: 'RAW現像時のホワイトバランス手直し工数を劇的に削減' },
          { label: '実機・2026学会諸元', line1: 'Sony α7 V（ILCE-7M5）BIONZ XR2 新搭載 AI-AWB', line2: '16-bitリニア空間での高精度3×3適応色変換行列連動' },
        ],
      });

    // X2-22. 16-bit Linear RAW Direction-Adaptive Demosaic & 7K->4K Oversampling Filter
    case 'xv2_demosaic_ring_buffer':
      return renderBionzV2Hd({
        badge: 'X2-22',
        zone: 'isp_mem',
        nodeTag: '16-BIT ISP · 7K→4K',
        title: '16bitリニアRAW「方向適応デモザイク ＆ 7K→4Kオーバーサンプリング縮小」',
        analogy: 'モザイク状の画素から輪郭の向きを読み取ってフルカラー化し、7Kの緻密情報を4Kへ凝縮',
        metric: '7K→4K 超解像 / 16bit内部演算',
        scaleLabel: '7008×4672 → 3840×2160',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        art: (p) => `
          <!-- Step 1: Bayer RGGB Mosaic -->
          <rect x="74" y="96" width="126" height="126" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="1.3"/>
          <text x="137" y="114" text-anchor="middle" font-size="8.8" font-weight="800" fill="#bae6fd">① ベイヤーRAW入力</text>
          ${Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => {
              const col = (r + c) % 2 === 1 ? '#22c55e' : r % 2 === 0 ? '#ef4444' : '#3b82f6';
              const lbl = (r + c) % 2 === 1 ? 'G' : r % 2 === 0 ? 'R' : 'B';
              return `<rect x="${92 + c * 23}" y="${124 + r * 22}" width="20" height="19" rx="2" fill="${col}"/>
                      <text x="${102 + c * 23}" y="${137 + r * 22}" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fff">${lbl}</text>`;
            }).join('')
          ).join('')}

          <path d="M 204 162 L 228 162" stroke="#0284c7" stroke-width="2.5" marker-end="url(#${p}_arr_blue)"/>

          <!-- Step 2: 5x5 / 7x7 Direction-Adaptive Demosaic Ring Buffer -->
          <rect x="234" y="96" width="186" height="126" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.4"/>
          <text x="327" y="114" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0369a1">② 方向適応エッジ補間</text>
          <rect x="252" y="126" width="150" height="44" rx="5" fill="#eff6ff" stroke="#38bdf8"/>
          <line x1="266" y1="162" x2="388" y2="132" stroke="#0f172a" stroke-width="2.6"/>
          <line x1="266" y1="154" x2="388" y2="124" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="3 2"/>
          <text x="327" y="186" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f172a">斜めエッジに沿い偽色・ジッパー抑止</text>
          <text x="327" y="204" text-anchor="middle" font-size="8.0" font-weight="700" fill="#059669">SRAMリングバッファ 7行同時保持</text>

          <path d="M 424 162 L 448 162" stroke="#0284c7" stroke-width="2.5" marker-end="url(#${p}_arr_blue)"/>

          <!-- Step 3: 7K -> 4K Polyphase Oversampling -->
          <rect x="454" y="96" width="236" height="126" rx="8" fill="url(#${p}_blue)" stroke="#1d4ed8" stroke-width="1.4"/>
          <text x="572" y="116" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">③ 7K→4K ポリフェーズ縮小フィルタ</text>
          <rect x="470" y="128" width="84" height="58" rx="5" fill="#ffffff" fill-opacity="0.18" stroke="#93c5fd"/>
          <text x="512" y="154" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">7K (33MP)</text>
          <text x="512" y="170" text-anchor="middle" font-size="7.8" fill="#dbeafe">全画素読出</text>
          <path d="M 558 157 L 584 157" stroke="#fde047" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>
          <rect x="590" y="136" width="84" height="44" rx="5" fill="#059669" stroke="#6ee7b7"/>
          <text x="632" y="156" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">4K 60p</text>
          <text x="632" y="170" text-anchor="middle" font-size="7.6" fill="#d1fae5">モアレ皆無!</text>
          <text x="572" y="206" text-anchor="middle" font-size="8.2" font-weight="700" fill="#fef08a">約2.4倍の情報量を凝縮 → 圧倒的先鋭感</text>

          <!-- Bottom Telemetry Bar -->
          ${kpiCard(86, 240, 184, 52, '内部演算ビット深度', '16-bit Linear', '丸め誤差・階調飛びゼロ', '#0284c7')}
          ${kpiCard(292, 240, 184, 52, 'オーバーサンプリング比', '7K → 4K (2.4×)', 'フルサイズ全画素読出', '#059669')}
          ${kpiCard(498, 240, 184, 52, 'モアレ・偽色抑圧', '多相Lanczos係数列', '繊細な布地・建築に強い', '#7c3aed')}
          ${nanoPin(327, 222, 120, 320, 1, 'ラインバッファ直結ストリーム処理', 'DRAM往復を排し超低遅延', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'SRAMリングバッファで7×7近傍の方向勾配を解析し補間', line2: '7K全画素から多相ポリフェーズフィルタで4Kへ高品位縮小' },
          { label: '撮影・画質への恩恵', line1: '画素間引きなしでモアレ・ジャギー皆無の極上4K 60p映像', line2: '16bitリニア内部演算により暗部から明部まで極滑らか' },
          { label: '実機・2026学会諸元', line1: 'Sony α7 V 7Kオーバーサンプリング フルサイズ4K 60p対応', line2: '演算精度 16-bitリニア・ライン単位ゼロ遅延パイプライン' },
        ],
      });

    // X2-23. 8.5-Stop IBIS 6-Axis Gyro + Optical-Flow Kalman Filter Accelerator
    case 'xv2_ibis_kalman_accelerator':
      return renderBionzV2Hd({
        badge: 'X2-23',
        zone: 'isp_mem',
        nodeTag: 'IBIS · 7.5–8.5 STOPS',
        title: '最大8.5段手ブレ補正対応「6軸ジャイロ＋映像オプティカルフロー融合カルマン演算器」',
        analogy: '角速度ジャイロの高速予測と映像のズレ解析を合体させ、1画素単位でブレを打ち消す頭脳',
        metric: '7.5–8.5段補正 / 1000Hz制御',
        scaleLabel: 'SERVO LOOP: 1 kHz KALMAN',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        art: (p) => `
          <!-- Left Two Sensor Inputs -->
          <rect x="74" y="96" width="166" height="68" rx="8" fill="url(#${p}_cu)"/>
          <text x="157" y="120" text-anchor="middle" font-size="9.8" font-weight="900" fill="#fff">① 6軸ジャイロ / IMU</text>
          <text x="157" y="138" text-anchor="middle" font-size="8.2" fill="#ffedd5">Yaw/Pitch/Roll + X/Y/Z</text>
          <text x="157" y="152" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fef08a">高周波ブレを1kHz捕捉</text>

          <rect x="74" y="182" width="166" height="68" rx="8" fill="url(#${p}_cyan)"/>
          <text x="157" y="206" text-anchor="middle" font-size="9.8" font-weight="900" fill="#fff">② 映像オプティカルフロー</text>
          <text x="157" y="224" text-anchor="middle" font-size="8.2" fill="#e0f2fe">特徴点移動ベクトル解析</text>
          <text x="157" y="238" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fef08a">低周波ドリフト誤差を0化</text>

          <!-- Converging Arrows into Kalman Filter Core -->
          <path d="M 240 130 L 284 166" stroke="#ea580c" stroke-width="2.4" marker-end="url(#${p}_arr_gold)"/>
          <path d="M 240 216 L 284 182" stroke="#0284c7" stroke-width="2.4" marker-end="url(#${p}_arr_blue)"/>

          <!-- Center: Dedicated Kalman Filter Fusion Engine -->
          <rect x="290" y="114" width="184" height="122" rx="10" fill="#0f172a" stroke="#f97316" stroke-width="1.8"/>
          <text x="382" y="138" text-anchor="middle" font-size="10.2" font-weight="900" fill="#fdba74">専用カルマンフィルタ</text>
          <text x="382" y="156" text-anchor="middle" font-size="8.6" font-weight="700" fill="#e2e8f0">状態予測 x̂(k|k−1)</text>
          <text x="382" y="174" text-anchor="middle" font-size="8.6" font-weight="700" fill="#38bdf8">＋ 観測更新 K_k·(z − Hx̂)</text>
          <rect x="308" y="188" width="148" height="34" rx="5" fill="#ea580c" fill-opacity="0.25" stroke="#f97316"/>
          <text x="382" y="203" text-anchor="middle" font-size="8.2" font-weight="800" fill="#fed7aa">ボディIBIS ＋ レンズOSS</text>
          <text x="382" y="216" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">協調制御指令を瞬時算出</text>

          <!-- Right: Dual Actuator Outputs -->
          <path d="M 474 152 L 512 132" stroke="#059669" stroke-width="2.4" marker-end="url(#${p}_arr_green)"/>
          <path d="M 474 198 L 512 218" stroke="#7c3aed" stroke-width="2.4" marker-end="url(#${p}_arr_dark)"/>

          <rect x="518" y="96" width="174" height="68" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.3"/>
          <text x="605" y="120" text-anchor="middle" font-size="9.6" font-weight="900" fill="#065f46">5軸センサーシフト駆動</text>
          <text x="605" y="138" text-anchor="middle" font-size="8.2" font-weight="700" fill="#047857">1画素精度の磁気浮上制御</text>
          <text x="605" y="153" text-anchor="middle" font-size="8.4" font-weight="900" fill="#059669">中央 7.5〜8.5段補正!</text>

          <rect x="518" y="182" width="174" height="68" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.3"/>
          <text x="605" y="206" text-anchor="middle" font-size="9.6" font-weight="900" fill="#4c1d95">レンズOSS＆電子補正連動</text>
          <text x="605" y="224" text-anchor="middle" font-size="8.2" font-weight="700" fill="#5b21b6">超望遠角度ブレを最適分担</text>
          <text x="605" y="239" text-anchor="middle" font-size="8.4" font-weight="900" fill="#7c3aed">ダイナミックアクティブ対応</text>

          ${nanoPin(382, 236, 98, 308, 1, 'ジャイロ＋映像の相補融合', '手持ちスローシャッターでドリフトゼロ', '#ea580c', 'start')}
          ${nanoPin(605, 164, 386, 308, 2, '周辺ブレまで抑える協調制御', 'α7 V 7.5段 / α1 II・α7R VI 8.5段級', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '1kHzジャイロ信号と映像動きベクトルをカルマン最適融合', line2: 'ボディ5軸IBISとレンズOSSの補正配分をリアルタイム制御' },
          { label: '撮影・画質への恩恵', line1: '三脚なしの夜景1秒手持ち撮影や歩き撮り動画がピタリ静止', line2: '周辺部の回転・パース歪みブレまで徹底的に抑制' },
          { label: '実機・2026学会諸元', line1: 'α7 V 中央7.5段 / フラッグシップ機 最大8.5段協調補正', line2: '専用ハードウェア行列演算器・1000Hz低遅延ループ' },
        ],
      });

    // X2-24. Sony Camera Authenticity (C2PA) SRAM-PUF & ECDSA/SHA-384 Core
    case 'xv2_c2pa_puf_ecdsa_core':
      return renderBionzV2Hd({
        badge: 'X2-24',
        zone: 'isp_mem',
        nodeTag: 'C2PA · ROOT OF TRUST',
        title: 'ソニー真正性ソリューション（C2PA）専用 SRAM-PUF鍵生成＆ECDSA署名コア',
        analogy: 'チップ固有の指紋(PUF)から複製不能な鍵を生み出し、撮影瞬間に写真の出生証明書を刻印',
        metric: 'C2PA / ECDSA P-384 + SHA-384',
        scaleLabel: 'HARDWARE ROOT OF TRUST',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        art: (p) => `
          <!-- Step 1: SRAM-PUF Silicon Fingerprint -->
          <rect x="74" y="96" width="174" height="154" rx="9" fill="#0f172a" stroke="#eab308" stroke-width="1.5"/>
          <text x="161" y="116" text-anchor="middle" font-size="9.4" font-weight="900" fill="#fde047">① SRAM-PUF 物理指紋</text>
          ${Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 6 }, (_, c) => {
              const bit = ((r * 7 + c * 3) % 2 === 0) ? 1 : 0;
              return `<rect x="${92 + c * 23}" y="${128 + r * 22}" width="19" height="18" rx="3" fill="${bit ? '#eab308' : '#1e293b'}" stroke="#475569"/>
                      <text x="${101.5 + c * 23}" y="${140 + r * 22}" text-anchor="middle" font-size="8.0" font-weight="900" fill="${bit ? '#0f172a' : '#64748b'}">${bit}</text>`;
            }).join('')
          ).join('')}
          <text x="161" y="236" text-anchor="middle" font-size="8.0" font-weight="700" fill="#fef08a">原子ばらつき＝複製不可能鍵</text>

          <path d="M 248 172 L 278 172" stroke="#eab308" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>

          <!-- Step 2: Isolated Crypto Enclave -->
          <rect x="284" y="96" width="204" height="154" rx="9" fill="#ffffff" stroke="#0284c7" stroke-width="1.6"/>
          <text x="386" y="116" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0369a1">② 隔離ハードウェア署名核</text>
          <rect x="300" y="128" width="172" height="36" rx="6" fill="url(#${p}_cyan)"/>
          <text x="386" y="150" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">SHA-384 画素ハッシュ算出</text>
          <rect x="300" y="174" width="172" height="36" rx="6" fill="url(#${p}_gold)"/>
          <text x="386" y="196" text-anchor="middle" font-size="9.2" font-weight="900" fill="#713f12">ECDSA P-384 秘密鍵電子署名</text>
          <text x="386" y="234" text-anchor="middle" font-size="8.0" font-weight="800" fill="#dc2626">秘密鍵は一度も外部バスへ出ない!</text>

          <path d="M 488 172 L 518 172" stroke="#059669" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>

          <!-- Step 3: C2PA Verified Output -->
          <rect x="524" y="96" width="168" height="154" rx="9" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
          <text x="608" y="118" text-anchor="middle" font-size="9.6" font-weight="900" fill="#065f46">③ C2PA 真贋証明</text>
          <circle cx="608" cy="158" r="24" fill="#059669"/>
          <text x="608" y="164" text-anchor="middle" font-size="13" font-weight="900" fill="#ffffff">CR</text>
          <text x="608" y="202" text-anchor="middle" font-size="8.6" font-weight="800" fill="#047857">3D深度マップ＋撮影時刻</text>
          <text x="608" y="218" text-anchor="middle" font-size="8.6" font-weight="800" fill="#047857">JPEG / RAW リアルタイム刻印</text>
          <text x="608" y="236" text-anchor="middle" font-size="8.0" font-weight="700" fill="#065f46">生成AI偽造を即座に見破る!</text>

          ${nanoPin(161, 224, 92, 308, 1, 'メモリに鍵を保存しないPUF', '電源OFFで鍵消滅・解析攻撃を無効化', '#d97706', 'start')}
          ${nanoPin(386, 210, 366, 308, 2, '30fps連写にも追従する専用演算器', '全コマへ瞬時にC2PAマニフェスト埋込', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '2nm SRAM起動ばらつき（PUF）からチップ固有鍵を動的復元', line2: '隔離暗号核がSHA-384＋ECDSA P-384署名を高速実行' },
          { label: '撮影・画質への恩恵', line1: 'シャッター瞬間に「実写の本物証明（C2PA）」を自動付与', line2: '生成AIディープフェイク時代の報道・プロ業務信頼を確立' },
          { label: '実機・2026学会諸元', line1: 'Sony Camera Authenticity Solution / C2PA 2.x準拠', line2: '3D深度情報＋X.509証明書をRAW/JPEGへリアルタイム署名' },
        ],
      });

    // X2-25. Buried Power Rail (BPR) inside STI
    case 'xv2_bpr_buried_rail':
      return renderBionzV2Hd({
        badge: 'X2-25',
        zone: 'bspdn_cool',
        nodeTag: 'BSPDN · BURIED RAIL',
        title: 'トランジスタ地下埋設「ベリード・パワーレール（BPR：STI内部Ru電源レール）」',
        analogy: '地上の狭い道路を占領していた太い水道管を地下の溝へ埋め、地上の配線空間を劇的解放',
        metric: 'セル高 −15〜20% / IR激減',
        scaleLabel: 'BPR DEPTH: ~100 nm IN STI',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Cross-section of GAA Cells with Buried Power Rails inside Shallow Trench Isolation (STI) -->
          <rect x="74" y="88" width="440" height="196" rx="10" fill="#ffffff" stroke="#fde68a" stroke-width="1.3"/>
          <text x="294" y="106" text-anchor="middle" font-size="9.8" font-weight="800" fill="#92400e">STI浅溝分離の地下へ埋設されたルテニウム電源レール（BPR）</text>

          <!-- Frontside M0 Signal-Only Tracks -->
          <rect x="92" y="116" width="404" height="22" rx="3" fill="#e0f2fe" stroke="#38bdf8"/>
          ${[112, 162, 212, 262, 312, 362, 412, 462].map((x) => `<rect x="${x}" y="121" width="24" height="12" rx="2" fill="url(#${p}_cyan)"/>`).join('')}
          <text x="294" y="149" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0369a1">表面M0は信号線100%専用化（電源線の邪魔ゼロ！）</text>

          <!-- Active GAA Transistors sitting above STI -->
          ${[160, 326].map((x, idx) => `
            <rect x="${x}" y="158" width="102" height="50" rx="5" fill="${idx === 0 ? 'url(#' + p + '_blue)' : 'url(#' + p + '_sige)'}" stroke="#0f172a"/>
            <text x="${x + 51}" y="186" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">${idx === 0 ? 'nMOS GAA' : 'pMOS GAA'}</text>
          `).join('')}

          <!-- STI Oxide Trench + Buried Ruthenium Power Rails (VDD / VSS) -->
          <rect x="92" y="208" width="404" height="62" rx="4" fill="#cbd5e1" stroke="#64748b"/>
          <!-- 3 Deep BPR Rails embedded in STI -->
          ${[
            { x: 112, t: 'VSS', c: '#0284c7' },
            { x: 278, t: 'VDD', c: '#d97706' },
            { x: 444, t: 'VSS', c: '#0284c7' },
          ].map((r) => `
            <rect x="${r.x}" y="198" width="32" height="58" rx="4" fill="${r.c}" stroke="#ffffff" stroke-width="1.3"/>
            <text x="${r.x + 16}" y="232" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">${r.t}</text>
            <rect x="${r.x + 10}" y="256" width="12" height="20" fill="url(#${p}_gold)"/>
          `).join('')}

          <!-- Right Panel: Benefits -->
          ${kpiCard(534, 96, 158, 72, '標準セル面積縮小', '−15 〜 −20%', 'M0電源トラック2本撤去', '#d97706')}
          ${kpiCard(534, 182, 158, 72, 'BPR抵抗低減', '約 1/5（極太埋設）', '深さ方向へ断面積確保', '#059669')}

          ${nanoPin(294, 224, 94, 314, 1, 'STI絶縁溝内のRu/W埋設レール', '高温FEOL工程に耐える高融点金属', '#d97706', 'start')}
          ${nanoPin(294, 266, 376, 314, 2, '裏面nTSV着地ターゲット', '裏面電源網（BM0）から直結給電', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '浅溝分離（STI）の地下へ縦長断面のRu/W電源線を埋設', line2: '裏面nTSVで裏面電源グリッドと直結し局所IR降下を抑制' },
          { label: '撮影・画質への恩恵', line1: '表面配線の渋滞解消によりISP論理密度と最大周波数を向上', line2: '電源配線の抵抗損失が減り連写時の電圧安定性が劇的改善' },
          { label: '実機・2026学会諸元', line1: 'imec先駆BSPDN基礎構造・セル高 −15〜20%縮小', line2: '耐熱Ru/W埋設レール＋裏面nTSVランディング構造' },
        ],
      });

    // X2-26. TSMC A16 Super Power Rail (SPR) Direct Backside S/D Contact (VB)
    case 'xv2_a16_spr_vb_contact':
      return renderBionzV2Hd({
        badge: 'X2-26',
        zone: 'bspdn_cool',
        nodeTag: 'TSMC A16 · VLSI 2026 T1.5',
        title: 'TSMC A16「Super Power Rail（SPR）裏面直接S/D垂直コンタクト（VB）」',
        analogy: 'BPRすら省き、ウェハー裏面からトランジスタの足元(S/D)へ電気を一直線に直刺し給電',
        metric: '速度 +8–10% / 電力 -15–20%',
        scaleLabel: 'DIRECT BACKSIDE CONTACT (VB)',
        accent: '#f59e0b',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Full Vertical Architecture: Frontside Signal Only + GAA + Direct VB -> Backside BM0 -->
          <rect x="74" y="86" width="414" height="36" rx="5" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="281" y="108" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">表面 BEOL（100% 超高速信号配線専用 · 電源混雑ゼロ）</text>

          <!-- GAA Transistor Active Layer -->
          <rect x="74" y="130" width="414" height="68" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
          <polygon points="104,142 158,142 172,164 158,186 104,186 90,164" fill="url(#${p}_emerald)"/>
          <polygon points="404,142 458,142 472,164 458,186 404,186 390,164" fill="url(#${p}_emerald)"/>
          <text x="131" y="168" text-anchor="middle" font-size="8.6" font-weight="900" fill="#fff">Source Epi</text>
          <text x="431" y="168" text-anchor="middle" font-size="8.6" font-weight="900" fill="#fff">Drain Epi</text>
          <rect x="236" y="136" width="90" height="56" rx="4" fill="url(#${p}_gold)"/>
          ${[146, 160, 174].map((y) => `<rect x="172" y="${y}" width="218" height="8" rx="2" fill="url(#${p}_cyan)"/>`).join('')}

          <!-- Thinned 300nm Silicon + Direct Backside Via (VB) stabbing STRAIGHT into Source/Drain! -->
          <rect x="74" y="198" width="414" height="44" fill="url(#${p}_si)"/>
          <text x="281" y="224" text-anchor="middle" font-size="8.8" font-weight="700" fill="#94a3b8">極薄化シリコン基板（~300 nm）</text>
          <!-- Direct VB Contacts piercing straight into S/D underside -->
          <rect x="119" y="186" width="24" height="58" rx="3" fill="url(#${p}_gold)" stroke="#ffffff" stroke-width="1.3"/>
          <rect x="419" y="186" width="24" height="58" rx="3" fill="url(#${p}_gold)" stroke="#ffffff" stroke-width="1.3"/>
          <line x1="131" y1="242" x2="131" y2="190" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>
          <line x1="431" y1="242" x2="431" y2="190" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>

          <!-- Heavy Backside Metal Grid BM0 -->
          <rect x="74" y="242" width="414" height="36" rx="5" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="1.4"/>
          <text x="281" y="264" text-anchor="middle" font-size="10.0" font-weight="900" fill="#ffffff">TSMC A16 Super Power Rail（裏面極太電源網 BM0–BM4）</text>

          <!-- Right Panel: VLSI 2026 T1.5 PPA Uplift vs N2P -->
          ${kpiCard(508, 92, 184, 58, 'A16 vs N2P 速度向上', '+8 〜 +10%', '同一消費電力あたり', '#f59e0b')}
          ${kpiCard(508, 160, 184, 58, 'A16 vs N2P 消費電力', '−15 〜 −20%', '同一動作速度あたり', '#059669')}
          ${kpiCard(508, 228, 184, 58, 'チップ密度向上', '最大 1.10×', 'ゲート密度維持＆柔軟配置', '#0284c7')}

          ${nanoPin(131, 214, 92, 314, 1, '裏面直接コンタクト VB', '表面M0もBPRも迂回しない最短距離給電', '#d97706', 'start')}
          ${nanoPin(281, 108, 376, 314, 2, '表面信号ルーティング解放', 'HPC・AIカメラSoCの配線遅延激減', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '裏面電源網から直接S/Dエピ底面へ垂直コンタクトVB直結', line2: 'BPR用のセル間拡張や表面電源ダウンビアを完全に撤廃' },
          { label: '撮影・画質への恩恵', line1: 'N2P比でさらに消費電力を15–20%削減しつつ動作高速化', line2: '高負荷8K/4K120p＋AI処理時のIRドロップを根底から払拭' },
          { label: '実機・2026学会諸元', line1: 'TSMC A16（VLSI 2026 Paper T1.5・2026年末生産準備）', line2: '速度+8–10% / 電力−15–20% / 密度最大1.10×（vs N2P）' },
        ],
      });

    // X2-27. Backside Ultra-Low-Resistance Power Grid (BM0–BM4)
    case 'xv2_backside_pdn_grid':
      return renderBionzV2Hd({
        badge: 'X2-27',
        zone: 'bspdn_cool',
        nodeTag: 'BSPDN · BM0–BM4 GRID',
        title: 'ウェハー裏面「極低抵抗・極太バックサイド電源グリッド（BM0–BM4）」',
        analogy: '微細配線に遠慮せず裏側へ極太の銅ハイウェイを4段張り巡らせ、電圧降下を1/10へ抑え込む',
        metric: '動的電圧ドロップ 1/10!',
        scaleLabel: 'BM0–BM4: 10× THICKER CU',
        accent: '#b45309',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Inverted Power Delivery Pyramid: Thick BM4 -> BM3 -> BM2 -> BM1 -> BM0 -> nTSV -->
          <rect x="74" y="88" width="420" height="194" rx="10" fill="#ffffff" stroke="#fde68a" stroke-width="1.3"/>
          <text x="284" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#92400e">ウェハー裏面 4層極太電源メッシュ（表面の10倍以上の断面積）</text>

          <!-- Top: GAA Active Layer receiving uniform voltage -->
          <rect x="96" y="116" width="376" height="24" rx="4" fill="url(#${p}_cyan)"/>
          <text x="284" y="132" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">GAA トランジスタ層（全面へ均一 0.72V ±1% 供給!）</text>

          <!-- Upward nTSV Array -->
          ${Array.from({ length: 9 }, (_, i) => `<rect x="${112 + i * 42}" y="140" width="8" height="22" fill="url(#${p}_gold)"/>`).join('')}

          <!-- BM0 / BM1 Fine Backside Rails -->
          <rect x="96" y="162" width="376" height="18" rx="2" fill="url(#${p}_ru)"/>
          <text x="284" y="174" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0f172a">BM0 / BM1：セル列直下ローカル給電メッシュ（Ru / Cu）</text>

          <!-- BM2 / BM3 Medium Backside Power Mesh -->
          <rect x="96" y="188" width="376" height="28" rx="3" fill="url(#${p}_cu)"/>
          <text x="284" y="206" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">BM2 / BM3：直交大電流メッシュ（抵抗 1/10）</text>

          <!-- BM4 Ultra-Thick Global Power Trunk + C4 Bumps -->
          <rect x="96" y="224" width="376" height="38" rx="4" fill="#9a3412" stroke="#fb923c" stroke-width="1.4"/>
          <text x="284" y="247" text-anchor="middle" font-size="10.0" font-weight="900" fill="#fef08a">BM4：極厚銅トランク ＆ パッケージC4バンプ直結</text>

          <!-- Right Panel: IR Drop Comparison -->
          <rect x="512" y="88" width="180" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="602" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">動的電圧ドロップ比較</text>
          <text x="524" y="132" font-size="8.2" font-weight="700" fill="#dc2626">従来表面FSPDN (15層経由)</text>
          <rect x="524" y="138" width="150" height="18" rx="4" fill="#ef4444"/>
          <text x="599" y="151" text-anchor="middle" font-size="8.4" font-weight="900" fill="#fff">ΔV = ~100 mV</text>

          <text x="524" y="182" font-size="8.2" font-weight="800" fill="#059669">BSPDN裏面直結 (BM0–4)</text>
          <rect x="524" y="188" width="34" height="18" rx="4" fill="#059669"/>
          <text x="566" y="201" font-size="9.4" font-weight="900" fill="#059669">~10 mV (1/10!)</text>
          ${kpiCard(524, 218, 156, 52, 'VLSI 2026 実測', '配線面積 −11%', '動的ドロップ 10×低減', '#b45309')}

          ${nanoPin(284, 204, 96, 314, 1, '表面M0–M14の細いビアを一切通らない', '電源経路インピーダンスを1桁圧縮', '#b45309', 'start')}
          ${nanoPin(448, 150, 384, 314, 2, '全面均一給電によるVmin低減', '30fps連写＋AI同時起動でも余裕動作', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'ウェハー裏面に4層の極厚銅電源メッシュ（BM0–BM4）構築', line2: '高密度nTSVで全セルの真下から均一・超低抵抗で垂直給電' },
          { label: '撮影・画質への恩恵', line1: '動的電圧ドロップを1/10へ圧縮し余分な電圧マージン削減', line2: '同一バッテリーでの撮影枚数増と高クロック動作を両立' },
          { label: '実機・2026学会諸元', line1: 'Intel 18A PowerVia / TSMC A16 SPR / Samsung SF2Z', line2: 'VLSI 2026報告：動的ドロップ10×改善・配線面積−11%' },
        ],
      });

    // X2-28. Backside Global Clock Distribution Network (Ru H-Tree) & Backside MIM
    case 'xv2_backside_clock_tree':
      return renderBionzV2Hd({
        badge: 'X2-28',
        zone: 'bspdn_cool',
        nodeTag: 'BACKSIDE CLOCK · H-TREE',
        title: '次世代裏面グローバルクロック分配網（ルテニウム低スキューHツリー＆裏面MIM）',
        analogy: 'チップ全体の指揮者リズムも裏面の極太H型道路へ移し、全演算器の拍子ズレをピコ秒以下へ',
        metric: 'クロック電力 -25% / 低スキュー',
        scaleLabel: 'SYMMETRIC BACKSIDE H-TREE',
        accent: '#eab308',
        accentSoft: '#fefce8',
        art: () => `
          <!-- Symmetrical Backside H-Tree Clock Network -->
          <rect x="74" y="88" width="386" height="196" rx="10" fill="#0f172a" stroke="#eab308" stroke-width="1.5"/>
          <text x="267" y="107" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fef08a">ウェハー裏面 低抵抗・完全等長 H-Tree クロック分配網</text>

          <!-- Level 1 Main H -->
          <line x1="166" y1="186" x2="368" y2="186" stroke="#eab308" stroke-width="4.5"/>
          <line x1="166" y1="138" x2="166" y2="234" stroke="#eab308" stroke-width="4"/>
          <line x1="368" y1="138" x2="368" y2="234" stroke="#eab308" stroke-width="4"/>

          <!-- Level 2 Sub-H branches -->
          ${[
            [166, 138],
            [166, 234],
            [368, 138],
            [368, 234],
          ].map(([cx, cy]) => `
            <line x1="${cx - 44}" y1="${cy}" x2="${cx + 44}" y2="${cy}" stroke="#38bdf8" stroke-width="2.6"/>
            <line x1="${cx - 44}" y1="${cy - 18}" x2="${cx - 44}" y2="${cy + 18}" stroke="#38bdf8" stroke-width="2.2"/>
            <line x1="${cx + 44}" y1="${cy - 18}" x2="${cx + 44}" y2="${cy + 18}" stroke="#38bdf8" stroke-width="2.2"/>
            <circle cx="${cx - 44}" cy="${cy - 18}" r="4" fill="#10b981"/>
            <circle cx="${cx - 44}" cy="${cy + 18}" r="4" fill="#10b981"/>
            <circle cx="${cx + 44}" cy="${cy - 18}" r="4" fill="#10b981"/>
            <circle cx="${cx + 44}" cy="${cy + 18}" r="4" fill="#10b981"/>
          `).join('')}

          <!-- Central PLL Injection Point -->
          <circle cx="267" cy="186" r="14" fill="#ea580c" stroke="#fef08a" stroke-width="2"/>
          <text x="267" y="190" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">PLL</text>

          <!-- Right Panel: Backside Clock + Backside MIM Benefits -->
          <rect x="478" y="88" width="214" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="585" y="108" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">裏面クロック化の3大メリット</text>
          ${[
            { y: 124, t: '① 太い裏面配線でRC遅延激減', s: '中継バッファ段数を大幅削減', c: '#d97706' },
            { y: 174, t: '② 表面クロストークから完全遮蔽', s: '裏面電源プレーンがシールド化', c: '#0284c7' },
            { y: 224, t: '③ 空き領域へ裏面MIM容量内蔵', s: 'クロックジッタと電源揺れを同時抑制', c: '#059669' },
          ].map((item) => `
            <rect x="490" y="${item.y}" width="190" height="42" rx="6" fill="#f8fafc" stroke="${item.c}" stroke-width="1"/>
            <text x="498" y="${item.y + 16}" font-size="8.5" font-weight="800" fill="${item.c}">${item.t}</text>
            <text x="498" y="${item.y + 32}" font-size="8.0" font-weight="600" fill="#475569">${item.s}</text>
          `).join('')}

          ${nanoPin(267, 186, 94, 314, 1, '全16末端まで完全等長（ΔL = 0）', 'クロックスキューをピコ秒オーダーへ抑制', '#d97706', 'start')}
          ${nanoPin(412, 252, 376, 314, 2, '裏面nTSVで表面FF群へ垂直供給', 'KAIST / 2026年最新BSPDNクロック実証', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'グローバルH-Treeクロックを裏面低抵抗金属層へ移設', line2: '空き領域の裏面MIMデカップリングと電源層でノイズ遮蔽' },
          { label: '撮影・画質への恩恵', line1: 'チップ全体のクロック消費電力を約25%削減し発熱低減', line2: 'スキュー極小化で高クロックISP・AI同期精度を向上' },
          { label: '実機・2026学会諸元', line1: '裏面等長H-Tree ＋ nTSV垂直タップ ＋ 裏面MIM容量', line2: '2026年先端BSPDN（電源＋クロック統合裏面網）動向' },
        ],
      });

    // X2-29. BSPDN Self-Heating Paradox: Thermal Phonon Dummy Vias & CVD Diamond Spreader
    case 'xv2_selfheating_phonon_via':
      return renderBionzV2Hd({
        badge: 'X2-29',
        zone: 'bspdn_cool',
        nodeTag: 'THERMAL · CVD DIAMOND',
        title: 'BSPDN「自己発熱パラドックス」対策：熱フォノン散逸ダミービア＆CVDダイヤモンド層',
        analogy: '極薄基板でこもりやすい熱の粒(フォノン)を、銅の熱抜け柱と人工ダイヤモンド板で瞬時放出',
        metric: '熱伝導率 ~2,000 W/m·K',
        scaleLabel: 'CVD DIAMOND: 5× COPPER',
        accent: '#ef4444',
        accentSoft: '#fef2f2',
        art: (p) => `
          <!-- Left: Self-Heating Trap in Thin BSPDN vs Right: Thermal Via + CVD Diamond Solution -->
          <rect x="74" y="88" width="424" height="196" rx="10" fill="#ffffff" stroke="#fca5a5" stroke-width="1.3"/>
          <text x="286" y="107" text-anchor="middle" font-size="9.6" font-weight="800" fill="#991b1b">GAA自己発熱ホットスポット → ダミー熱ビア → CVDダイヤモンド拡散</text>

          <!-- GAA Hotspot Layer -->
          <rect x="92" y="118" width="388" height="34" rx="4" fill="#fee2e2" stroke="#ef4444"/>
          ${[160, 286, 412].map((x) => `<ellipse cx="${x}" cy="135" rx="34" ry="12" fill="url(#${p}_heat)" opacity="0.88"/><text x="${x}" y="138" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fff">HOTSPOT</text>`).join('')}

          <!-- Insulating Oxide Layer pierced by Dense Thermal Dummy Vias -->
          <rect x="92" y="152" width="388" height="58" fill="#e2e8f0" stroke="#94a3b8"/>
          <text x="286" y="168" text-anchor="middle" font-size="8.0" font-weight="700" fill="#475569">絶縁膜は熱を通しにくい（SiO₂ k ≈ 1.4 W/m·K）</text>
          ${Array.from({ length: 8 }, (_, i) => {
            const x = 114 + i * 48;
            return `<rect x="${x}" y="152" width="14" height="58" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="0.7"/>
                    <line x1="${x + 7}" y1="158" x2="${x + 7}" y2="206" stroke="#fef08a" stroke-width="1.4" marker-end="url(#${p}_arr_red)"/>`;
          }).join('')}

          <!-- Bottom CVD Diamond Heat Spreader Layer (k ≈ 2000 W/m·K!) -->
          <rect x="92" y="210" width="388" height="44" rx="5" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="2"/>
          <text x="286" y="229" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0c4a6e">CVD 人工ダイヤモンド熱拡散層（k ≈ 1,800–2,200 W/m·K）</text>
          <path d="M 270 242 L 112 242 M 302 242 L 460 242" stroke="#0284c7" stroke-width="2.2" marker-end="url(#${p}_arr_blue)"/>

          <!-- Right Thermal Conductivity Bar Comparison -->
          <rect x="514" y="88" width="180" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="604" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">熱伝導率 k (W/m·K)</text>
          ${[
            { y: 128, w: 6, l: 'SiO₂絶縁膜: 1.4', c: '#94a3b8' },
            { y: 162, w: 22, l: 'Siシリコン: 148', c: '#0284c7' },
            { y: 196, w: 54, l: '純銅 Cu: 400', c: '#ea580c' },
            { y: 230, w: 152, l: 'CVDダイヤモンド: ~2000!', c: '#059669' },
          ].map((b) => `
            <text x="524" y="${b.y}" font-size="8.2" font-weight="800" fill="#334155">${b.l}</text>
            <rect x="524" y="${b.y + 5}" width="${b.w}" height="15" rx="3" fill="${b.c}"/>
          `).join('')}

          ${nanoPin(216, 182, 92, 314, 1, '高密度サーマル・ダミービア', '電気を流さず熱フォノンだけ垂直輸送', '#ea580c', 'start')}
          ${nanoPin(380, 232, 372, 314, 2, '純銅の5倍の熱拡散スピード', '300nm極薄基板の局所ΔTを−25°C超低減', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'GAA薄化基板＋絶縁膜包囲で生じる熱こもりを熱ビアで貫通', line2: '銅の約5倍の熱伝導率を持つCVDダイヤモンド層で瞬時面拡散' },
          { label: '撮影・画質への恩恵', line1: 'BSPDN採用時の局所ホットスポットと熱暴走・寿命低下を回避', line2: '小型ボディでの長時間4K60p/8K収録の熱余裕を大幅拡大' },
          { label: '実機・2026学会諸元', line1: 'CVDダイヤモンド k ≈ 1,800–2,200 W/m·K（絶縁性＋超高放熱）', line2: '2nm GAA＋BSPDN時代の必須サーマル・コデザイン' },
        ],
      });

    // X2-30. BIONZ XR2 Coherent Unified Memory NoC & Fine-Grain Power Gating Ring
    case 'xv2_unified_memory_noc':
      return renderBionzV2Hd({
        badge: 'X2-30',
        zone: 'isp_mem',
        nodeTag: 'BIONZ XR2 · COHERENT NoC',
        title: 'BIONZ XR2 省電力の要「コヒーレント統合メモリNoC ＆ 細粒度パワーゲーティング環」',
        analogy: 'ISP・AI・動画核が同じメモリをコピーなしで直接共有し、休む区画だけ電源を瞬時遮断',
        metric: 'ゼロコピー共有 / 待機電力極小',
        scaleLabel: 'RING / MESH NoC · QoS ARBITER',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        art: () => `
          <!-- Central Coherent Ring / Mesh NoC -->
          <rect x="74" y="88" width="440" height="196" rx="10" fill="#0f172a" stroke="#14b8a6" stroke-width="1.5"/>
          <text x="294" y="107" text-anchor="middle" font-size="9.6" font-weight="800" fill="#5eead4">コヒーレント統合メモリ NoC（ゼロコピー共有 ＆ 細粒度電源ドメイン）</text>

          <!-- Central Ring Highway -->
          <rect x="176" y="148" width="236" height="76" rx="38" fill="none" stroke="#14b8a6" stroke-width="8"/>
          <rect x="176" y="148" width="236" height="76" rx="38" fill="none" stroke="#fef08a" stroke-width="1.6" stroke-dasharray="10 6"/>
          <text x="294" y="182" text-anchor="middle" font-size="9.8" font-weight="900" fill="#ffffff">Coherent NoC 幹線</text>
          <text x="294" y="198" text-anchor="middle" font-size="8.0" fill="#99f6e4">キャッシュ一貫性(CHI/ACE) ＆ QoS制御</text>

          <!-- 6 Satellite Domains around the Ring (Some Active, Some Power-Gated!) -->
          ${[
            { x: 90, y: 122, t: 'RAW ISP', on: true, c: '#0284c7' },
            { x: 244, y: 116, t: 'AI NPU', on: true, c: '#7c3aed' },
            { x: 398, y: 122, t: '動画コーデック', on: false, c: '#475569' },
            { x: 90, y: 230, t: 'LPDDR6 Ctrl', on: true, c: '#2563eb' },
            { x: 244, y: 238, t: '3D L3 SRAM', on: true, c: '#059669' },
            { x: 398, y: 230, t: 'Audio/HDMI', on: false, c: '#475569' },
          ].map((n) => `
            <rect x="${n.x}" y="${n.y}" width="100" height="34" rx="6" fill="${n.c}" stroke="${n.on ? '#5eead4' : '#94a3b8'}" stroke-dasharray="${n.on ? 'none' : '3 2'}"/>
            <text x="${n.x + 50}" y="${n.y + 15}" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">${n.t}</text>
            <text x="${n.x + 50}" y="${n.y + 28}" text-anchor="middle" font-size="7.4" font-weight="800" fill="${n.on ? '#fef08a' : '#cbd5e1'}">${n.on ? '● ACTIVE' : '○ POWER-OFF'}</text>
          `).join('')}

          <!-- Right Panel: Zero-Copy + Power Gating Gains -->
          ${kpiCard(534, 96, 158, 78, 'ゼロコピー帯域節約', 'DRAM往復 −50%', 'ISP→AI→記録を同一ポインタ参照', '#0d9488')}
          ${kpiCard(534, 188, 158, 78, '細粒度パワーゲート', 'μs単位 電源遮断', '静止画撮影中は動画核OFF', '#059669')}

          ${nanoPin(294, 152, 92, 314, 1, 'リアルタイムQoS帯域保証', '30fpsセンサー取込を最優先確保', '#14b8a6', 'start')}
          ${nanoPin(448, 156, 376, 314, 2, 'MTCMOS細粒度島分割', '不要ブロックのリーク電流を完全ゼロ化', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'キャッシュコヒーレントNoCで全演算核が共有メモリ直結', line2: '数十の独立電源アイランドをマイクロ秒単位で動的遮断' },
          { label: '撮影・画質への恩恵', line1: 'AI認識とRAW現像間のデータ複製を排除しバッテリー大幅延長', line2: 'α7 Vで同一NP-FZ100のまま撮影枚数 520→630–750枚へ躍進' },
          { label: '実機・2026学会諸元', line1: 'BIONZ XR2 ワンチップ統合AI＋ISP コヒーレント基盤', line2: 'ゼロコピー共有＋優先度QoS調停＋細粒度パワーゲート' },
        ],
      });

    default:
      return null;
  }
}
