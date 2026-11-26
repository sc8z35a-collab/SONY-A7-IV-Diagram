import { drawCompareFrame, drawKpiBox, drawPill, wrapFab3HdSvg } from './shared';

/**
 * Vol.3 Ultra-HD 720x470 Vector Infographics — Group D (10 Parts: F3-35–F3-44):
 * Block 2-D (P02-033–P02-042): Synthetic Quartz 6" Substrate, Cr/MoSi PSM Sputter,
 * EB Resist Coat/Bake, 260,000-Beam Multi-Beam EB Writer, PEB/Develop, ICP Dry Etch,
 * Strip/SPM Haze-Free Clean, 2nd-Level Border, Mask CD-SEM, KLA IPRO Registration.
 */
export function renderVol3GroupDSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'fab3_p33_synthetic_quartz_sub':
      return wrapFab3HdSvg({
        badge: 'F3-35',
        stepTag: 'P02-033 [業界標準]',
        title: '超高純度合成石英ガラス基板製造（6インチ・平坦度0.2µm）',
        analogy: '四塩化ケイ素の炎から泡ゼロの人工水晶を育て、全面を0.2µm以下へ鏡面研磨',
        accent: '#38bdf8',
        accentSoft: '#f0f9ff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="424" height="250" rx="10" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4"/>
            <text x="212" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0c4a6e">SiCl4 火炎加水分解 → 6インチ（6025規格）超平坦合成石英</text>
            <!-- Flame Hydrolysis Synthesis -->
            <rect x="26" y="42" width="128" height="128" rx="8" fill="#0f172a"/>
            <text x="90" y="62" text-anchor="middle" font-size="9.5" font-weight="800" fill="#38bdf8">SiCl4＋O2/H2炎</text>
            <polygon points="78,70 102,70 116,114 64,114" fill="#38bdf8" fill-opacity="0.7"/>
            <rect x="52" y="114" width="76" height="44" rx="4" fill="url(#f335-quartz)" stroke="#7dd3fc"/>
            <text x="90" y="140" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0c4a6e">人工石英インゴット</text>

            <line x1="158" y1="106" x2="188" y2="106" stroke="#0284c7" stroke-width="2.8" marker-end="url(#f335-arrBlue)"/>

            <!-- Finished 152.4 x 152.4 x 6.35mm Quartz Plate -->
            <rect x="194" y="40" width="206" height="132" rx="8" fill="url(#f335-quartz)" stroke="#0284c7" stroke-width="2"/>
            <text x="297" y="76" text-anchor="middle" font-size="13.5" font-weight="900" fill="#0c4a6e">152.4 × 152.4 mm</text>
            <text x="297" y="98" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0369a1">厚さ 6.35 mm（6インチ角）</text>
            <text x="297" y="124" text-anchor="middle" font-size="9.8" font-weight="800" fill="#047857">✅ 気泡ゼロ・複屈折ゼロ</text>
            <text x="297" y="144" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">✅ 平坦度 0.2 〜 0.5 µm以下</text>

            <rect x="26" y="186" width="374" height="48" rx="8" fill="#e0f2fe" stroke="#0284c7"/>
            <text x="213" y="206" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">世界を支える日本メーカー群</text>
            <text x="213" y="224" text-anchor="middle" font-size="9.6" font-weight="700" fill="#0369a1">信越石英 / AGC / HOYA / 東ソー・クォーツ 等</text>
          </g>
          <g transform="translate(466, 82)">
            ${drawKpiBox(0, 0, 226, 76, '光学特性', '深紫外透過率 極大', '193/248nmでも歪まず透過', '#0284c7')}
            ${drawKpiBox(0, 86, 226, 76, '出荷前検査', '複屈折・平坦度・欠陥', 'ナノ気泡・内部歪みを全数排除', '#059669')}
            ${drawPill(0, 174, 226, '泡・歪み→紫外線曲がり画素ズレ', false)}
            ${drawPill(0, 208, 226, '超低膨張石英→高精度露光の礎', true)}
          </g>
        `,
        cards: [
          { label: '製法・寸法', line1: 'SiCl4火炎加水分解で合成した', line2: '152.4×152.4×6.35mm（6インチ角）' },
          { label: '極限精度', line1: '6インチ全面平坦度 0.2〜0.5µm以下', line2: '信越石英・AGC・HOYA・東ソー等' },
          { label: '失敗すると写真に？', line1: 'ガラス内部の微小気泡や歪みで露光', line2: '紫外線が曲がり画素位置がズレる！' },
        ],
      });

    case 'fab3_p34_cr_mosi_psm_sputter':
      return wrapFab3HdSvg({
        badge: 'F3-36',
        stepTag: 'P02-034 [業界標準]',
        title: '遮光膜（Cr / MoSi位相シフト膜 50〜80nm）スパッタ成膜',
        analogy: '光の波を180°ひっくり返して輪郭のニジミを打ち消し合う魔法の極薄膜',
        accent: '#6366f1',
        accentSoft: '#eef2ff',
        body: `
          <g transform="translate(26, 82)">
            <!-- Physics of 180-deg MoSi Half-Tone Phase-Shift Cancellation! -->
            <rect x="0" y="0" width="440" height="250" rx="10" fill="#0f172a" stroke="#6366f1" stroke-width="1.5"/>
            <text x="220" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#c7d2fe">ハーフトーン位相シフト膜（MoSi）180°位相反転の解像魔法</text>
            <!-- Quartz substrate top -->
            <rect x="30" y="34" width="380" height="28" fill="url(#f336-quartz)"/>
            <text x="220" y="52" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0c4a6e">合成石英基板（193/248nm 深紫外光が入射 ▼）</text>
            <!-- MoSi 50-80nm film left & right with central aperture -->
            <rect x="30" y="62" width="136" height="22" fill="url(#f336-mosi)" stroke="#a5b4fc"/>
            <rect x="274" y="62" width="136" height="22" fill="url(#f336-mosi)" stroke="#a5b4fc"/>
            <text x="98" y="76" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">MoSi 50–80nm (位相180°)</text>
            <text x="342" y="76" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">MoSi 膜 (±0.5%均一)</text>
            <text x="220" y="77" text-anchor="middle" font-size="9.2" font-weight="900" fill="#38bdf8">開口部 (位相 0°)</text>

            <!-- Electric Field Amplitude E(x) crossing ZERO sharply at edges! -->
            <line x1="30" y1="158" x2="410" y2="158" stroke="#64748b" stroke-dasharray="4 3"/>
            <path d="M 38 178 L 144 178 Q 166 158 182 114 Q 220 90 258 114 Q 274 158 296 178 L 402 178" fill="none" stroke="#38bdf8" stroke-width="3.2"/>
            <!-- Sharp zero-crossing circles -->
            <circle cx="166" cy="158" r="6" fill="#22c55e" stroke="#ffffff" stroke-width="1.4"/>
            <circle cx="274" cy="158" r="6" fill="#22c55e" stroke="#ffffff" stroke-width="1.4"/>
            <text x="220" y="142" text-anchor="middle" font-size="10.2" font-weight="900" fill="#7dd3fc">正の波(+E)</text>
            <text x="92" y="196" text-anchor="middle" font-size="9.2" font-weight="800" fill="#f472b6">6%透過・逆位相(-E)</text>
            <text x="348" y="196" text-anchor="middle" font-size="9.2" font-weight="800" fill="#f472b6">逆位相(-E)で境界打消し!</text>
            <text x="220" y="232" text-anchor="middle" font-size="9.8" font-weight="800" fill="#4ade80">★ 境界で光強度が完全にゼロへ落ち、輪郭がカミソリのように鋭くなる！</text>
          </g>
          <g transform="translate(480, 82)">
            ${drawKpiBox(0, 0, 212, 76, 'マスクブランクス世界シェア', 'HOYA / AGC / 信越化学', '日本勢が世界シェア大半を掌握', '#4f46e5')}
            ${drawKpiBox(0, 86, 212, 76, '膜厚・均一性', '50〜80 nm (±0.5%)', '位相差・透過率・欠陥を全数検査', '#0284c7')}
            ${drawPill(0, 174, 212, '1nmズレ→位相狂い線幅崩壊', false)}
            ${drawPill(0, 208, 212, '180°打消し→極限解像コントラスト', true)}
          </g>
        `,
        cards: [
          { label: 'スパッタ成膜', line1: 'Cr遮光膜・MoSi位相シフト膜を', line2: '膜厚50〜80nm・均一性±0.5%級で成膜' },
          { label: '日本勢の強み', line1: 'HOYA・AGC・信越化学等が', line2: 'マスクブランクス世界シェアの大半！' },
          { label: '失敗すると写真に？', line1: '膜厚がたった1nm違うと位相差や', line2: '透過率が狂い露光後の線幅が崩壊' },
        ],
      });

    case 'fab3_p35_eb_resist_coat_bake':
      return wrapFab3HdSvg({
        badge: 'F3-37',
        stepTag: 'P02-035 [業界標準]',
        title: 'マスク用電子線レジスト塗布・精密ベーク（100〜300nm）',
        analogy: '電子ビームの筆に反応する超微粒子印画紙を気泡ゼロで100〜300nm均一塗布',
        accent: '#ec4899',
        accentSoft: '#fdf2f8',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="420" height="250" rx="10" fill="#f8fafc" stroke="#ec4899" stroke-width="1.4"/>
            <text x="210" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9d174d">マスク専用スピンコーター ＆ 3層ブランクス断面</text>
            <!-- Dispense Nozzle & Spinning Blank -->
            <rect x="196" y="34" width="28" height="36" rx="4" fill="#334155"/>
            <line x1="210" y1="70" x2="210" y2="108" stroke="#ec4899" stroke-width="5"/>
            <text x="314" y="64" text-anchor="middle" font-size="9.5" font-weight="800" fill="#be185d">超高解像EBレジスト滴下</text>
            <text x="314" y="79" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">高速スピンで均一展開</text>
            <!-- 3-Layer Stack -->
            <rect x="52" y="108" width="316" height="20" rx="2" fill="#f472b6" stroke="#be185d"/>
            <text x="210" y="122" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">EBレジスト膜：100 〜 300 nm（精密プリベーク済）</text>
            <rect x="52" y="128" width="316" height="18" fill="#4338ca"/>
            <text x="210" y="140.5" text-anchor="middle" font-size="9" font-weight="800" fill="#e0e7ff">Cr / MoSi 位相シフト膜（50〜80nm）</text>
            <rect x="52" y="146" width="316" height="44" rx="3" fill="url(#f337-quartz)" stroke="#0284c7"/>
            <text x="210" y="172" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0c4a6e">6インチ合成石英ガラス基板（6.35mm）</text>
            <!-- Chuck -->
            <rect x="150" y="190" width="120" height="24" rx="4" fill="#475569"/>
            <text x="210" y="234" text-anchor="middle" font-size="9.5" font-weight="800" fill="#059669">回転チャック＆カップ気流制御で全面均質＆エッジビード除去</text>
          </g>
          <g transform="translate(462, 82)">
            ${drawKpiBox(0, 0, 230, 76, '塗布膜厚', '100 〜 300 nm', 'マスク専用コーター＆精密ベーク', '#ec4899')}
            ${drawKpiBox(0, 86, 230, 76, '直後検査', 'ブランクス欠陥検査', '気泡・微小パーティクル全数排除', '#0284c7')}
            ${drawPill(0, 174, 230, '気泡1粒→型紙に致命的ピンホール', false)}
            ${drawPill(0, 208, 230, '欠陥ゼロ膜→26万本EB描画機へ！', true)}
          </g>
        `,
        cards: [
          { label: '塗布プロセス', line1: '電子線に高感度反応する超高解像', line2: 'レジストを100〜300nm均一塗布' },
          { label: '品質管理', line1: 'マスク専用コーター＆精密ベーク後', line2: '全数ブランクス欠陥検査を実施' },
          { label: '失敗すると写真に？', line1: 'レジスト内に気泡やゴミが1粒あると', line2: '型紙に穴（ピンホール欠陥）が開く！' },
        ],
      });

    case 'fab3_p36_multibeam_eb_writer':
      return wrapFab3HdSvg({
        badge: 'F3-38',
        stepTag: 'P02-036 [業界標準]',
        title: 'マルチビーム電子線描画（約26万本同時・位置1〜2nm・±0.01℃）',
        analogy: '±0.01℃の真空庫で光より何千倍も細い26万本の電子ペンを一斉に走らせる究極彫刻',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Multi-Beam Electron Column Cutaway -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="386" height="250" rx="10" fill="#0f172a" stroke="#0284c7" stroke-width="1.6"/>
            <text x="193" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#38bdf8">約26万本マルチビーム電子光学鏡筒（真空・±0.01℃）</text>
            <!-- Electron Gun -->
            <rect x="148" y="30" width="90" height="22" rx="6" fill="#38bdf8"/>
            <text x="193" y="44.5" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f172a">電子銃（高輝度源）</text>
            <!-- Broad Beam -> APS 260,000 Aperture Plate System -->
            <polygon points="172,52 214,52 260,90 126,90" fill="url(#f338-eb)"/>
            <rect x="108" y="90" width="170" height="20" rx="4" fill="#f59e0b" stroke="#fef08a"/>
            <text x="193" y="103.5" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f172a">APS: 約26万個の微小ブランキング孔！</text>
            <!-- 260k parallel beamlets converging through reduction optics -->
            <g stroke="#22d3ee" stroke-width="1.4">
              <line x1="130" y1="110" x2="152" y2="178"/><line x1="150" y1="110" x2="164" y2="178"/>
              <line x1="170" y1="110" x2="176" y2="178"/><line x1="193" y1="110" x2="193" y2="178"/>
              <line x1="216" y1="110" x2="210" y2="178"/><line x1="236" y1="110" x2="222" y2="178"/>
              <line x1="256" y1="110" x2="234" y2="178"/>
            </g>
            <!-- Magnetic Reduction Lens -->
            <ellipse cx="193" cy="144" rx="76" ry="11" fill="none" stroke="#818cf8" stroke-width="3"/>
            <text x="314" y="148" text-anchor="middle" font-size="8.8" font-weight="800" fill="#a5b4fc">縮小電子レンズ</text>
            <!-- 6-inch Quartz Mask on Laser-Interferometer Stage -->
            <rect x="74" y="180" width="238" height="22" rx="3" fill="url(#f338-quartz)" stroke="#38bdf8"/>
            <text x="193" y="194.5" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">6インチマスク（OPC超複雑図形を描画）</text>
            <rect x="52" y="204" width="282" height="22" rx="4" fill="#334155"/>
            <text x="193" y="218.5" text-anchor="middle" font-size="9" font-weight="800" fill="#e2e8f0">レーザー干渉計 XYステージ（位置精度 1〜2nm級）</text>
            <text x="193" y="241" text-anchor="middle" font-size="8.8" font-weight="700" fill="#7dd3fc">1枚あたり数時間〜十数時間／緩い層は高速レーザー描画機</text>
          </g>
          <!-- Right: Makers & Extreme Specs -->
          <g transform="translate(426, 82)">
            ${drawKpiBox(0, 0, 266, 78, '世界主要メーカー', 'ニューフレア(MBM)/JEOL/IMS', 'レーザー描画：Mycronic（緩い層用）', '#0284c7')}
            ${drawKpiBox(0, 86, 266, 76, '極限精度・温度制御', '1〜2nm / ±0.01℃', '最小線幅 十数nm対応・26万本同時', '#4f46e5')}
            ${drawPill(0, 174, 266, '位置狂い→96枚の重なりズレ全滅', false)}
            ${drawPill(0, 208, 266, '複雑OPCも一定時間で超精密彫刻！', true)}
          </g>
        `,
        cards: [
          { label: '26万本の威力', line1: '約26万本の極細電子ビームを同時', line2: '照射し複雑OPCを数〜十数時間で描画' },
          { label: '装置＆環境', line1: 'ニューフレアMBM・JEOL・IMS・Mycronic', line2: 'チャンバー±0.01℃・位置精度1〜2nm' },
          { label: '失敗すると写真に？', line1: '描画位置精度が狂うと96枚の型紙', line2: '同士が重なり合わず全センサー不良！' },
        ],
      });

    case 'fab3_p37_mask_peb_develop':
      return wrapFab3HdSvg({
        badge: 'F3-39',
        stepTag: 'P02-037 [業界標準]',
        title: '描画後ベーク（PEB ±0.1℃）・アルカリ現像・洗浄',
        analogy: '見えない電子線潜像を全面±0.1℃オーブンで焼き固め、不要部を洗い流す現像',
        accent: '#f97316',
        accentSoft: '#fff7ed',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#f8fafc" stroke="#f97316" stroke-width="1.4"/>
            <!-- Step 1: Precision PEB Hotplate -->
            <rect x="20" y="26" width="200" height="152" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
            <text x="120" y="46" text-anchor="middle" font-size="10.4" font-weight="800" fill="#9a3412">① 描画後ベーク（PEB）</text>
            <rect x="44" y="114" width="152" height="26" rx="4" fill="#ea580c"/>
            <text x="120" y="131" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">多ゾーン精密ホットプレート</text>
            <rect x="54" y="96" width="132" height="16" rx="2" fill="url(#f339-quartz)" stroke="#0284c7"/>
            <text x="120" y="76" text-anchor="middle" font-size="13" font-weight="900" fill="#c2410c">±0.1 ℃ 以内</text>
            <text x="120" y="160" text-anchor="middle" font-size="9" font-weight="700" fill="#7c2d12">酸触媒反応で潜像を確定</text>

            <line x1="224" y1="102" x2="250" y2="102" stroke="#ea580c" stroke-width="2.6" marker-end="url(#f339-arrAmber)"/>

            <!-- Step 2: Alkaline Developer Spray -->
            <rect x="254" y="26" width="200" height="152" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
            <text x="354" y="46" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0c4a6e">② アルカリ現像・超純水洗浄</text>
            <rect x="294" y="60" width="120" height="12" rx="4" fill="#0284c7"/>
            <line x1="316" y1="72" x2="316" y2="106" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="3 2"/>
            <line x1="354" y1="72" x2="354" y2="106" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="3 2"/>
            <line x1="392" y1="72" x2="392" y2="106" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="3 2"/>
            <!-- Developed resist pattern -->
            <rect x="284" y="114" width="140" height="24" fill="url(#f339-quartz)" stroke="#0284c7"/>
            <rect x="292" y="102" width="24" height="12" fill="#ec4899"/>
            <rect x="334" y="102" width="32" height="12" fill="#ec4899"/>
            <rect x="384" y="102" width="28" height="12" fill="#ec4899"/>
            <text x="354" y="160" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">不要レジスト溶解→模様出現！</text>

            <line x1="458" y1="102" x2="484" y2="102" stroke="#059669" stroke-width="2.6" marker-end="url(#f339-arrGreen)"/>

            <!-- Step 3: Post-Develop Inspection -->
            <rect x="488" y="26" width="160" height="152" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
            <text x="568" y="46" text-anchor="middle" font-size="10.4" font-weight="800" fill="#047857">③ 現像後チェック</text>
            <text x="568" y="88" text-anchor="middle" font-size="12" font-weight="900" fill="#065f46">CD均一性保持</text>
            <text x="568" y="112" text-anchor="middle" font-size="9.2" font-weight="700" fill="#047857">倒壊・残渣ゼロ確認</text>
            <text x="568" y="148" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">次：ICPドライエッチへ</text>

            ${drawPill(20, 198, 304, '温度ムラ→中央と端で線幅が変わる(CDU悪化)', false)}
            ${drawPill(344, 198, 304, '±0.1℃均一制御→全面同一線幅の現像！', true)}
          </g>
        `,
        cards: [
          { label: 'PEB温度精度', line1: '6インチ全面で ±0.1℃以内の', line2: '超均一加熱で化学増幅反応を完結' },
          { label: '現像プロセス', line1: 'マスク専用デベロッパーでアルカリ', line2: '現像・洗浄・現像後外観チェック' },
          { label: '失敗すると写真に？', line1: '温度ムラでマスク中央と端の線幅が', line2: '変わり画面の明るさ・特性ムラに直結' },
        ],
      });

    case 'fab3_p38_mask_icp_dry_etch':
      return wrapFab3HdSvg({
        badge: 'F3-40',
        stepTag: 'P02-038 [業界標準]',
        title: '遮光膜・位相シフト膜のICPドライエッチング（垂直彫刻）',
        analogy: '現像レジストを盾にし塩素・フッ素プラズマ弾で金属膜を90°垂直に彫り込む',
        accent: '#9333ea',
        accentSoft: '#faf5ff',
        body: `
          ${drawCompareFrame(24, 82, 376, 250, '✅ ICP異方性垂直エッチング（終点光学モニター制御）', '#7c3aed', '#faf5ff')}
          <g transform="translate(42, 122)">
            <!-- Vertical Plasma Ion arrows -->
            <line x1="112" y1="6" x2="112" y2="54" stroke="#9333ea" stroke-width="3" marker-end="url(#f340-arrPurple)"/>
            <line x1="170" y1="6" x2="170" y2="54" stroke="#9333ea" stroke-width="3" marker-end="url(#f340-arrPurple)"/>
            <line x1="228" y1="6" x2="228" y2="54" stroke="#9333ea" stroke-width="3" marker-end="url(#f340-arrPurple)"/>
            <text x="170" y="0" text-anchor="middle" font-size="9.4" font-weight="800" fill="#6d28d9">Cl2系(Cr用) / F2系(MoSi用) ICPプラズマ</text>
            <!-- Resist cap + Crisp 90 deg etched Cr/MoSi + Quartz -->
            <rect x="34" y="62" width="60" height="18" fill="#ec4899"/>
            <rect x="140" y="62" width="60" height="18" fill="#ec4899"/>
            <rect x="246" y="62" width="60" height="18" fill="#ec4899"/>
            <rect x="34" y="80" width="60" height="36" fill="#312e81"/>
            <rect x="140" y="80" width="60" height="36" fill="#312e81"/>
            <rect x="246" y="80" width="60" height="36" fill="#312e81"/>
            <rect x="20" y="116" width="300" height="44" fill="url(#f340-quartz)" stroke="#0284c7" stroke-width="1.5"/>
            <text x="170" y="142" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0c4a6e">合成石英基板（終点光学モニターで傷ゼロ停止！）</text>
            <text x="170" y="182" text-anchor="middle" font-size="9.6" font-weight="800" fill="#059669">垂直側壁 90° → OPC設計通りの光回折を再現！</text>
          </g>

          ${drawCompareFrame(414, 82, 282, 250, '❌ 失敗：斜め削れ（テーパー断面）', '#e11d48', '#fff1f2')}
          <g transform="translate(432, 126)">
            <polygon points="48,66 86,66 102,110 32,110" fill="#be123c"/>
            <polygon points="154,66 192,66 208,110 138,110" fill="#be123c"/>
            <rect x="14" y="110" width="218" height="38" fill="url(#f340-quartz)" stroke="#0284c7"/>
            <text x="123" y="42" text-anchor="middle" font-size="10.2" font-weight="900" fill="#9f1239">壁が斜めに削れる！</text>
            <text x="123" y="170" text-anchor="middle" font-size="9.4" font-weight="800" fill="#881337">露光時の光のにじみと位相が</text>
            <text x="123" y="185" text-anchor="middle" font-size="9.4" font-weight="800" fill="#881337">OPC計算前提からズレて線幅異常！</text>
          </g>
        `,
        cards: [
          { label: 'エッチング装置', line1: 'マスク専用ICPドライエッチャー', line2: '塩素系(Cr)・フッ素系(MoSi)プラズマ' },
          { label: '終点制御', line1: '異方性垂直エッチングを行い', line2: '終点光学モニターで石英面で停止' },
          { label: '失敗すると写真に？', line1: '削り面が斜めになると露光時の', line2: '光のにじみがOPC設計とズレる！' },
        ],
      });

    case 'fab3_p39_mask_strip_spm_clean':
      return wrapFab3HdSvg({
        badge: 'F3-41',
        stepTag: 'P02-039 [業界標準]',
        title: 'レジスト剥離・硫酸過水超洗浄（ppb以下ヘイズ防止）',
        analogy: '将来の紫外線で白い曇り（ヘイズ）が育つ原因イオンまでppb以下へ完全除去',
        accent: '#06b6d4',
        accentSoft: '#ecfeff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#f8fafc" stroke="#06b6d4" stroke-width="1.4"/>
            <text x="334" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#155e75">SCREEN / SUSS MicroTec マスク超洗浄シーケンス（残留イオン ppb 以下）</text>
            <!-- 4 Multi-Stage Cleaning Baths -->
            ${[
              { x: 20, t: '① SPM 硫酸過水', s: 'H2SO4+H2O2で\n有機レジスト完全剥離', bg: '#fffbeb', bd: '#d97706' },
              { x: 184, t: '② APM アンモニア過水', s: 'メガソニック振動で\nナノ微粒子を剥離', bg: '#eff6ff', bd: '#2563eb' },
              { x: 348, t: '③ オゾン水＋超純水', s: '硫酸イオン・NH4+を\nppb以下へ完全リンス', bg: '#ecfeff', bd: '#06b6d4' },
              { x: 512, t: '④ ヘイズ結晶阻止', s: '数千回UV照射でも\n曇りゼロの長寿命！', bg: '#ecfdf5', bd: '#059669' },
            ]
              .map((b, idx) => {
                const lines = b.s.split('\n');
                return `<rect x="${b.x}" y="38" width="140" height="106" rx="8" fill="${b.bg}" stroke="${b.bd}" stroke-width="1.5"/>
                  <text x="${b.x + 70}" y="60" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f172a">${b.t}</text>
                  <text x="${b.x + 70}" y="88" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">${lines[0]}</text>
                  <text x="${b.x + 70}" y="106" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">${lines[1]}</text>
                  ${idx < 3 ? `<line x1="${b.x + 142}" y1="90" x2="${b.x + 160}" y2="90" stroke="#0891b2" stroke-width="2.4" marker-end="url(#f341-arrBlue)"/>` : ''}`;
              })
              .join('')}
            <!-- Haze mechanism warning strip -->
            <rect x="20" y="160" width="628" height="32" rx="7" fill="#fff1f2" stroke="#f43f5e"/>
            <text x="334" y="180" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9f1239">⚠️ 残留イオン(SO4²⁻ / NH4⁺) ＋ 強い193nm紫外線 → 硫酸アンモニウム結晶（ヘイズ曇り）が成長！</text>
            ${drawPill(20, 204, 304, '残渣あり→工場で何千回露光中に曇り停止', false)}
            ${drawPill(344, 204, 304, '残留イオン ppb以下→長期クリア露光維持', true)}
          </g>
        `,
        cards: [
          { label: '超洗浄薬液', line1: 'SPM（硫酸過水）・アンモニア過水', line2: 'オゾン水・超純水で残渣1粒ゼロへ' },
          { label: '装置＆規格', line1: 'SCREEN / SUSS MicroTec 装置', line2: '残留イオン濃度 ppb以下で清浄確認' },
          { label: '失敗すると写真に？', line1: '硫酸アンモニウム結晶（ヘイズ）が', line2: '紫外線照射中に育ちマスク曇り露光不能' },
        ],
      });

    case 'fab3_p40_second_level_border':
      return wrapFab3HdSvg({
        badge: 'F3-42',
        stepTag: 'P02-040 [業界標準]',
        title: '第2パターニング（外枠クロム遮光帯 OD≥99.9%＆バーコード）',
        analogy: '少し光を通す位相シフトマスクの外枠だけ「99.9%真っ黒な額縁」に仕上げる',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <g transform="translate(26, 82)">
            <!-- Top-down 6-inch Reticle with Outer OD>=99.9% Chrome Light-Shield Frame -->
            <rect x="0" y="0" width="340" height="250" rx="10" fill="#f8fafc" stroke="#475569" stroke-width="1.4"/>
            <text x="170" y="20" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">6インチ位相シフトマスク 外枠遮光帯構造</text>
            <!-- Outer solid black Chrome Border (OD >= 99.9%) -->
            <rect x="46" y="32" width="248" height="198" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
            <text x="170" y="50" text-anchor="middle" font-size="9.4" font-weight="800" fill="#fbbf24">外枠クロム遮光帯（遮光率 99.9%以上 / OD≥3）</text>
            <!-- Inner Active MoSi Pattern Area -->
            <rect x="86" y="64" width="168" height="122" rx="4" fill="#4338ca" stroke="#818cf8" stroke-width="1.5"/>
            <text x="170" y="122" text-anchor="middle" font-size="11.2" font-weight="900" fill="#ffffff">有効回路パターン部</text>
            <text x="170" y="140" text-anchor="middle" font-size="9.2" font-weight="700" fill="#c7d2fe">（MoSi 6%透過・180°位相反転）</text>
            <!-- Barcode & Alignment Frame at bottom -->
            <g fill="#f8fafc">
              <rect x="96" y="198" width="6" height="16"/><rect x="106" y="198" width="3" height="16"/><rect x="114" y="198" width="8" height="16"/>
              <rect x="128" y="198" width="4" height="16"/><rect x="138" y="198" width="7" height="16"/><rect x="150" y="198" width="3" height="16"/>
            </g>
            <text x="206" y="210" text-anchor="middle" font-size="9" font-weight="800" fill="#cbd5e1">管理バーコード枠</text>
          </g>
          <g transform="translate(382, 82)">
            ${drawKpiBox(0, 0, 310, 76, 'なぜ第2描画が必要？', 'MoSiは6%光を通すため！', 'レーザー描画→エッチング→洗浄で枠だけCr残し', '#475569')}
            ${drawKpiBox(0, 86, 310, 76, '光学濃度（OD）検査', '枠遮光率 99.9% 以上', '隣接チップへの漏れ光を完全ブロック', '#0284c7')}
            ${drawPill(0, 174, 310, '光漏れ→隣センサー端が二重露光で破壊', false)}
            ${drawPill(0, 208, 310, 'OD≥99.9%額縁→300mmウェーハ高密度露光', true)}
          </g>
        `,
        cards: [
          { label: '第2パターニング', line1: 'PSMの露光エリア外枠だけクロムを', line2: '残すため再度レーザー描画・エッチ' },
          { label: '測定規格', line1: '光学濃度（OD）測定により', line2: '外枠遮光率 99.9%以上を保証' },
          { label: '失敗すると写真に？', line1: '外枠から光が漏れると隣に並ぶ', line2: 'センサーチップ端が二重露光で全滅！' },
        ],
      });

    case 'fab3_p41_mask_cd_sem_metrology':
      return wrapFab3HdSvg({
        badge: 'F3-43',
        stepTag: 'P02-041 [業界標準]',
        title: 'マスク線幅（CD）全画面精密計測（CDU 1〜3nm 3σ）',
        analogy: '6インチ全面の数百か所の線幅を原子1個級の0.1nm電子顕微鏡で総測定',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        body: `
          <g transform="translate(26, 82)">
            <!-- 6-inch CD Uniformity Heatmap Grid -->
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#0f172a" stroke="#0d9488" stroke-width="1.5"/>
            <text x="178" y="20" text-anchor="middle" font-size="10.8" font-weight="800" fill="#5eead4">6インチ全面 CD-SEM 線幅均一性マップ（数百点）</text>
            <g transform="translate(58, 34)">
              ${[0, 1, 2, 3, 4, 5]
                .map((r) =>
                  [0, 1, 2, 3, 4, 5]
                    .map((c) => {
                      const d = Math.abs(r - 2.5) + Math.abs(c - 2.5);
                      const col = d < 2 ? '#14b8a6' : d < 3.5 ? '#0ea5e9' : '#38bdf8';
                      return `<rect x="${c * 40}" y="${r * 30}" width="36" height="26" rx="3" fill="${col}" fill-opacity="0.82"/>`;
                    })
                    .join('')
                )
                .join('')}
            </g>
            <text x="178" y="234" text-anchor="middle" font-size="9.5" font-weight="800" fill="#99f6e4">CD均一性（CDU）：1 〜 3 nm（3σ）以内合格！</text>
          </g>
          <g transform="translate(398, 82)">
            ${drawKpiBox(0, 0, 294, 76, '主要CD-SEM装置', '日立ハイテク / アドバンテスト', '0.1 nm レベルの超精密電子線測長', '#0d9488')}
            ${drawKpiBox(0, 86, 294, 76, '縮小転写の影響', '1/4 または 1/3.125 倍転写', '線幅誤差はウェーハ画素均一性へ直結', '#0284c7')}
            ${drawPill(0, 174, 294, 'CDムラ→画面内の画素明るさムラに直結', false)}
            ${drawPill(0, 208, 294, '全面CDマップ合格→次：座標精度IPROへ', true)}
          </g>
        `,
        cards: [
          { label: '0.1nm測長', line1: 'マスク専用測長SEM（CD-SEM）で', line2: '6インチ全面の数百か所を精密計測' },
          { label: 'メーカー＆基準', line1: '日立ハイテク・アドバンテスト機', line2: 'CD均一性（CDU）1〜3nm（3σ）判定' },
          { label: '失敗すると写真に？', line1: 'マスク線幅誤差が縮小倍率で転写され', line2: '画面内の画素の明るさムラに直結！' },
        ],
      });

    case 'fab3_p42_registration_ipro':
      return wrapFab3HdSvg({
        badge: 'F3-44',
        stepTag: 'P02-042 [業界標準]',
        title: 'マスク座標位置精度（レジストレーション）計測（KLA IPRO）',
        analogy: 'レーザー干渉計の光の物差しで全パターンの絶対座標歪みを数nm単位で測る',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="388" height="250" rx="10" fill="#0f172a" stroke="#2563eb" stroke-width="1.5"/>
            <text x="194" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#93c5fd">レーザー干渉計 X/Y 絶対座標測定（KLA IPRO）</text>
            <!-- Orthogonal He-Ne Laser Beams measuring Reticle Stage -->
            <rect x="78" y="54" width="212" height="148" rx="6" fill="url(#f344-quartz)" stroke="#38bdf8" stroke-width="2"/>
            <!-- Registration Vector Grid -->
            ${[0, 1, 2, 3]
              .map((r) =>
                [0, 1, 2, 3]
                  .map((c) => {
                    const x = 108 + c * 50;
                    const y = 78 + r * 34;
                    return `<circle cx="${x}" cy="${y}" r="2.5" fill="#0f172a"/><line x1="${x}" y1="${y}" x2="${x + (c - 1.5) * 3}" y2="${y + (r - 1.5) * 2.5}" stroke="#e11d48" stroke-width="1.8"/>`;
                  })
                  .join('')
              )
              .join('')}
            <!-- X Laser Head -->
            <rect x="316" y="114" width="56" height="28" rx="4" fill="#334155" stroke="#ef4444"/>
            <text x="344" y="131.5" text-anchor="middle" font-size="8.8" font-weight="800" fill="#fca5a5">Xレーザー</text>
            <line x1="290" y1="128" x2="316" y2="128" stroke="#ef4444" stroke-width="2.5"/>
            <!-- Y Laser Head -->
            <rect x="148" y="212" width="72" height="24" rx="4" fill="#334155" stroke="#ef4444"/>
            <text x="184" y="227.5" text-anchor="middle" font-size="8.8" font-weight="800" fill="#fca5a5">Yレーザー干渉計</text>
            <line x1="184" y1="202" x2="184" y2="212" stroke="#ef4444" stroke-width="2.5"/>
            <text x="42" y="132" text-anchor="middle" font-size="9" font-weight="800" fill="#38bdf8">直交度</text>
            <text x="42" y="145" text-anchor="middle" font-size="9" font-weight="800" fill="#38bdf8">数nm</text>
          </g>
          <g transform="translate(430, 82)">
            ${drawKpiBox(0, 0, 262, 76, '代表計測装置', 'KLA IPRO 等', 'レーザー干渉計付き座標測定機', '#2563eb')}
            ${drawKpiBox(0, 86, 262, 76, '位置精度＆証憑', '数 nm 級', 'レジストレーション成績書を発行', '#059669')}
            ${drawPill(0, 174, 262, '歪み→画素とロジック層間重ねズレ', false)}
            ${drawPill(0, 208, 262, '96枚すべて絶対座標一致→2-E検査へ', true)}
          </g>
        `,
        cards: [
          { label: '絶対座標計測', line1: 'レーザー干渉計でマスク模様の', line2: 'X・Y絶対座標歪みを数nm級で計測' },
          { label: '代表装置', line1: 'KLA IPRO 等による精密測定後', line2: 'レジストレーション成績書を発行' },
          { label: '失敗すると写真に？', line1: '画素ウェーハ内やロジックとの層間', line2: '重ね合わせがズレて不良センサー多発' },
        ],
      });

    default:
      return null;
  }
}
