import { drawCompareFrame, drawKpiBox, drawPill, wrapFab3HdSvg } from './shared';

/**
 * Vol.3 Ultra-HD 720x470 Vector Infographics — Group A (12 Parts: F3-01–F3-12):
 * Hero Monument, 5-Block Phase 2 Roadmap Deck, and Block 2-A (P02-001–P02-010).
 */
export function renderVol3GroupASvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'fab3_hero_reticle_96set_monument':
      return wrapFab3HdSvg({
        badge: 'F3-01',
        stepTag: '全50工程 / 約96枚 [推定]',
        title: '6インチ合成石英フォトマスク＆約96枚フルセット全貌',
        analogy: '100階建て高層ビルを1階ずつ建てる約96枚の超高精細ステンシル原版',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: 6-inch Photomask + 6mm Pellicle Cutaway -->
          <g transform="translate(30, 84)">
            <rect x="0" y="0" width="320" height="248" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="160" y="20" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0f172a">6インチ角レチクル断面（152.4×152.4×6.35mm）</text>
            <!-- Dust particle on 0.8um pellicle -->
            <circle cx="195" cy="48" r="6" fill="#e11d48"/>
            <line x1="201" y1="46" x2="232" y2="42" stroke="#e11d48" stroke-width="1.3"/>
            <text x="236" y="45" font-size="9.5" font-weight="800" fill="#e11d48">ホコリは膜上で停止</text>
            <!-- 0.8um Pellicle Membrane -->
            <line x1="62" y1="56" x2="258" y2="56" stroke="#10b981" stroke-width="3"/>
            <rect x="54" y="56" width="10" height="46" fill="#94a3b8" stroke="#475569"/>
            <rect x="256" y="56" width="10" height="46" fill="#94a3b8" stroke="#475569"/>
            <text x="160" y="75" text-anchor="middle" font-size="9.5" font-weight="800" fill="#059669">約6mm浮上（完全ピンボケ距離）</text>
            <text x="160" y="90" text-anchor="middle" font-size="9" font-weight="700" fill="#0f766e">厚さ0.8µm 透過率99%超ペリクル</text>
            <!-- Cr/MoSi absorber pattern -->
            <rect x="34" y="102" width="252" height="10" fill="#312e81"/>
            <rect x="85" y="102" width="18" height="10" fill="#e0f2fe"/>
            <rect x="122" y="102" width="24" height="10" fill="#e0f2fe"/>
            <rect x="168" y="102" width="16" height="10" fill="#e0f2fe"/>
            <rect x="206" y="102" width="26" height="10" fill="#e0f2fe"/>
            <!-- 6.35mm Synthetic Quartz Substrate -->
            <rect x="24" y="112" width="272" height="48" rx="4" fill="url(#f301-quartz)" stroke="#0284c7" stroke-width="1.5"/>
            <text x="160" y="140" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0c4a6e">超高純度 合成石英ガラス（厚さ 6.35mm）</text>
            <!-- 1/4x Reduction UV Projection -->
            <polygon points="84,160 236,160 198,214 122,214" fill="url(#f301-uv)"/>
            <text x="160" y="192" text-anchor="middle" font-size="10.2" font-weight="800" fill="#5b21b6">1/4 縮小投影露光（193/248nm）</text>
            <!-- Projected 36x24mm Full-Frame Sensor -->
            <rect x="108" y="214" width="104" height="18" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="160" y="226.5" text-anchor="middle" font-size="9.5" font-weight="800" fill="#38bdf8">フルサイズ 36×24mm</text>
          </g>

          <!-- Right: 96-Mask Stacked Set Breakdown -->
          <g transform="translate(368, 84)">
            <rect x="0" y="0" width="322" height="248" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="161" y="20" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0f172a">約96枚マスクセット内訳 [推定]（数億〜十数億円）</text>
            <!-- Horizontal stacked breakdown bars -->
            <g transform="translate(16, 36)">
              <text x="0" y="13" font-size="10" font-weight="800" fill="#4f46e5">画素ウェーハ FEOL</text>
              <rect x="130" y="2" width="110" height="16" rx="4" fill="#6366f1"/>
              <text x="246" y="14" font-size="10.5" font-weight="800" fill="#312e81">約25枚</text>

              <text x="0" y="42" font-size="10" font-weight="800" fill="#c2410c">画素ウェーハ BEOL</text>
              <rect x="130" y="31" width="58" height="16" rx="4" fill="#ea580c"/>
              <text x="194" y="43" font-size="10.5" font-weight="800" fill="#9a3412">約13枚</text>

              <text x="0" y="71" font-size="10" font-weight="800" fill="#0369a1">ロジックウェーハ層</text>
              <rect x="130" y="60" width="150" height="16" rx="4" fill="#0284c7"/>
              <text x="205" y="72" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">約48枚（最大！）</text>

              <text x="0" y="100" font-size="10" font-weight="800" fill="#0f766e">裏面加工・遮光層</text>
              <rect x="130" y="89" width="28" height="16" rx="4" fill="#0d9488"/>
              <text x="164" y="101" font-size="10.5" font-weight="800" fill="#115e59">約5枚</text>

              <text x="0" y="129" font-size="10" font-weight="800" fill="#15803d">CFA・マイクロレンズ</text>
              <rect x="130" y="118" width="28" height="16" rx="4" fill="#16a34a"/>
              <text x="164" y="130" font-size="10.5" font-weight="800" fill="#14532d">約5枚</text>
            </g>
            <!-- Warning box -->
            <rect x="16" y="182" width="290" height="54" rx="8" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.3"/>
            <text x="161" y="201" text-anchor="middle" font-size="10.5" font-weight="800" fill="#9f1239">⚠️ マスク1枚のゴミ＝全センサー全滅の恐怖</text>
            <text x="161" y="217" text-anchor="middle" font-size="9.5" font-weight="600" fill="#881337">髪の毛の1/1,000の欠陥でも数千枚のウェーハに</text>
            <text x="161" y="230" text-anchor="middle" font-size="9.5" font-weight="600" fill="#881337">同一座標コピーされるためウェーハ以上の厳格検査！</text>
          </g>
        `,
        cards: [
          { label: '物理構造', line1: '6インチ合成石英（厚さ6.35mm）', line2: 'Cr/MoSi遮光膜＋0.8µmペリクル' },
          { label: 'セット規模', line1: '合計 約96枚フルセット [推定]', line2: '1セット数億〜十数億円規模' },
          { label: '失敗すると写真に？', line1: '何十万台すべてのカメラの同一座標に', line2: '永遠に消えない死んだ画素が転写！' },
        ],
      });

    case 'fab3_phase2_design_mask_deck':
      return wrapFab3HdSvg({
        badge: 'F3-02',
        stepTag: '5ブロック・全50工程',
        title: 'フェーズ2 全体フロー：バーチャル設計から96枚マスク出荷まで',
        analogy: '上段がスパコン設計スタジオ、下段が人工水晶を電子線で彫るマスク工場',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          <!-- 5-block visual flow map -->
          <g transform="translate(26, 86)">
            <!-- Upper Tier Banner -->
            <rect x="0" y="0" width="668" height="118" rx="10" fill="#eef2ff" stroke="#6366f1" stroke-width="1.4"/>
            <text x="14" y="19" font-size="10.5" font-weight="800" fill="#4338ca">▲ 上段テラス：EDAバーチャル設計＆物理検証スタジオ（P02-001〜032 / 32工程）</text>
            <!-- Block 2-A -->
            <rect x="14" y="28" width="198" height="78" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
            <rect x="14" y="28" width="198" height="22" rx="8" fill="#7c3aed"/>
            <text x="113" y="43" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">2-A 企画・TCAD・光学 (10工程)</text>
            <text x="24" y="66" font-size="9.6" font-weight="700" fill="#1e293b">P02-001〜010：仕様・画素構造</text>
            <text x="24" y="81" font-size="9.4" font-weight="600" fill="#475569">3D TCAD電位・FDTD光学・CRA</text>
            <text x="24" y="96" font-size="9.4" font-weight="600" fill="#475569">PDAF瞳分離・熱応力・TEG試作</text>
            <!-- Arrow -->
            <line x1="214" y1="67" x2="232" y2="67" stroke="#4f46e5" stroke-width="2.5" marker-end="url(#f302-arrPurple)"/>
            <!-- Block 2-B -->
            <rect x="235" y="28" width="198" height="78" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
            <rect x="235" y="28" width="198" height="22" rx="8" fill="#2563eb"/>
            <text x="334" y="43" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">2-B 回路・3D配置 (12工程)</text>
            <text x="245" y="66" font-size="9.6" font-weight="700" fill="#1e293b">P02-011〜022：14bit ADC・CDS</text>
            <text x="245" y="81" font-size="9.4" font-weight="600" fill="#475569">SLVS-EC 12.5G・5,040万Cu-Cu</text>
            <text x="245" y="96" font-size="9.4" font-weight="600" fill="#475569">部分積層・CMPダミー・OASIS統合</text>
            <!-- Arrow -->
            <line x1="435" y1="67" x2="453" y2="67" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f302-arrBlue)"/>
            <!-- Block 2-C -->
            <rect x="456" y="28" width="198" height="78" rx="8" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
            <rect x="456" y="28" width="198" height="22" rx="8" fill="#d97706"/>
            <text x="555" y="43" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">2-C 検証・OPC・出荷 (10工程)</text>
            <text x="466" y="66" font-size="9.6" font-weight="700" fill="#1e293b">P02-023〜032：DRC/LVS/3D反転</text>
            <text x="466" y="81" font-size="9.4" font-weight="600" fill="#475569">一括vsスティッチ・OPC犬の耳</text>
            <text x="466" y="96" font-size="9.4" font-weight="600" fill="#475569">LRC・MDP・96層暗号テープアウト</text>

            <!-- Encrypted Fiber Drop Arrow -->
            <path d="M 555 118 L 555 130 L 180 130 L 180 140" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="5 3" marker-end="url(#f302-arrBlue)"/>
            <rect x="278" y="120" width="212" height="19" rx="9" fill="#0284c7"/>
            <text x="384" y="133" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">🔒 96層暗号化テープアウト送信</text>

            <!-- Lower Tier Banner -->
            <rect x="0" y="142" width="668" height="110" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.4"/>
            <text x="14" y="160" font-size="10.5" font-weight="800" fill="#047857">▼ 下段クリーンルームテラス：6インチ合成石英マスク工場（P02-033〜050 / 18工程）</text>
            <!-- Block 2-D -->
            <rect x="14" y="168" width="308" height="74" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
            <rect x="14" y="168" width="308" height="22" rx="8" fill="#0284c7"/>
            <text x="168" y="183" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">2-D 石英ブランクス・26万本EB描画・計測 (10工程)</text>
            <text x="24" y="206" font-size="9.6" font-weight="700" fill="#1e293b">P02-033〜042：合成石英・Cr/MoSi・EBレジスト</text>
            <text x="24" y="222" font-size="9.4" font-weight="600" fill="#475569">26万本マルチビームEB(±0.01℃)・ICP・SPM・CD-SEM/IPRO</text>
            <!-- Arrow -->
            <line x1="324" y1="205" x2="342" y2="205" stroke="#059669" stroke-width="2.5" marker-end="url(#f302-arrGreen)"/>
            <!-- Block 2-E -->
            <rect x="346" y="168" width="308" height="74" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
            <rect x="346" y="168" width="308" height="22" rx="8" fill="#059669"/>
            <text x="500" y="183" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">2-E 欠陥検査・ナノ修正・ペリクル・96枚出荷 (8工程)</text>
            <text x="356" y="206" font-size="9.6" font-weight="700" fill="#1e293b">P02-043〜050：Die-to-DB(20nm)・MeRiT修正・AIMS</text>
            <text x="356" y="222" font-size="9.4" font-weight="600" fill="#475569">0.8µm/6mmペリクル・STARlight・SMIFポッド・96枚ストッカー</text>
          </g>
        `,
        cards: [
          { label: '累計進捗', line1: 'フェーズ1(60)＋フェーズ2(50)', line2: '＝ 累計 110工程 完了！' },
          { label: '2つの主役が揃う', line1: '300mm CIS専用エピウェーハ', line2: '＋ 約96枚の超高精細フォトマスク' },
          { label: '次巻への接続', line1: 'いよいよ第4巻：画素前工程 FEOL', line2: '380工程で光の心臓部を彫り込む！', accent: '#059669' },
        ],
      });

    case 'fab3_p01_product_spec':
      return wrapFab3HdSvg({
        badge: 'F3-03',
        stepTag: 'P02-001 [業界標準]',
        title: 'センサー製品企画・要求仕様策定（36×24mm 黄金バランス）',
        analogy: '最高速度・積載量・燃費の3つ巴バランスを決める次世代カメラ設計会議',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        body: `
          <!-- Full-Frame 36x24mm Dimension Canvas -->
          <g transform="translate(30, 86)">
            <rect x="0" y="0" width="236" height="162" rx="10" fill="#1e293b" stroke="#7c3aed" stroke-width="2"/>
            <rect x="20" y="22" width="196" height="118" rx="4" fill="#312e81" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5 3"/>
            <text x="118" y="74" text-anchor="middle" font-size="16" font-weight="900" fill="#ffffff">36 × 24 mm</text>
            <text x="118" y="96" text-anchor="middle" font-size="10.5" font-weight="700" fill="#c4b5fd">フルサイズ有効結像面 (864mm²)</text>
            <text x="118" y="122" text-anchor="middle" font-size="9.5" font-weight="700" fill="#38bdf8">画素ピッチ：3.7 〜 5.9 µm</text>
            <text x="118" y="154" text-anchor="middle" font-size="9.5" font-weight="700" fill="#cbd5e1">消費電力上限：1.5 〜 5.0 W 級</text>
          </g>
          <!-- 4 Pixel Tier Architecture Bars -->
          <g transform="translate(284, 86)">
            <rect x="0" y="0" width="406" height="242" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="203" y="22" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0f172a">2026年フルサイズ主要4カテゴリー仕様トレードオフ</text>
            ${drawKpiBox(14, 34, 184, 92, '24.6MP グローバルシャッター', '5.9 µm 級', '歪みゼロ・120fps超・全積層', '#0284c7')}
            ${drawKpiBox(208, 34, 184, 92, '33MP 部分積層バランス', '5.1 µm 級', 'α7 V等・広DR＋高速連写＋コスパ', '#7c3aed')}
            ${drawKpiBox(14, 136, 184, 92, '45MP 高速フラッグシップ', '4.3 µm 級', '8K動画＋高速連写・全積層', '#059669')}
            ${drawKpiBox(208, 136, 184, 92, '66.8MP 超高精細積層', '3.7 µm 級', '極限解像力＋同時二重ゲイン', '#d97706')}
          </g>
          ${drawPill(30, 266, 236, '高画素過多→動画熱停止リスク', false)}
          ${drawPill(30, 298, 236, '高速特化→DR低下のバランス調整', true)}
        `,
        cards: [
          { label: '決定する仕様', line1: '画素数・ピッチ(3.7〜5.9µm)', line2: '連写fps・8K・GS/積層・1.5〜5W' },
          { label: 'レビュー体制', line1: 'システムアーキテクチャ設計', line2: 'カメラ事業部と熱・画質を合意' },
          { label: '失敗すると写真に？', line1: '動画がすぐ熱停止したり、連写は速いが', line2: 'ダイナミックレンジが狭いカメラに' },
        ],
      });

    case 'fab3_p02_pixel_arch_select':
      return wrapFab3HdSvg({
        badge: 'F3-04',
        stepTag: 'P02-002 [確認済み/標準]',
        title: '画素アーキテクチャ選定（4T+DCG / クロスDP / 2×1 OCL / GS）',
        analogy: '1画素（1世帯）の間取りをAF特化・広DR・同時露光のどれにするか決める',
        accent: '#8b5cf6',
        accentSoft: '#f5f3ff',
        body: `
          <!-- 4 Architectural Cross-Section Cards -->
          <g transform="translate(22, 82)">
            <!-- 1: 4T + DCG -->
            <rect x="0" y="0" width="160" height="248" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
            <rect x="0" y="0" width="160" height="26" rx="10" fill="#2563eb"/>
            <text x="80" y="17" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">① 4T基本＋DCG</text>
            <path d="M 32 76 Q 80 42 128 76 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
            <rect x="30" y="76" width="100" height="16" fill="#22c55e" fill-opacity="0.7"/>
            <rect x="30" y="92" width="100" height="68" fill="#475569"/>
            <rect x="42" y="102" width="76" height="48" rx="6" fill="#38bdf8"/>
            <text x="80" y="130" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">深PDバケツ</text>
            <rect x="26" y="170" width="108" height="26" rx="6" fill="#dbeafe" stroke="#2563eb"/>
            <text x="80" y="187" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1e40af">大小ゲイン切替(DCG)</text>
            <text x="80" y="218" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">低ノイズ＆広DRの王道</text>
            <text x="80" y="234" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">ピッチ 1.5〜5.9µm対応</text>

            <!-- 2: Cross-Type Dual Pixel -->
            <rect x="172" y="0" width="160" height="248" rx="10" fill="#fff1f2" stroke="#e11d48" stroke-width="1.5"/>
            <rect x="172" y="0" width="160" height="26" rx="10" fill="#e11d48"/>
            <text x="252" y="17" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">② クロス・デュアルPD</text>
            <path d="M 204 76 Q 252 42 300 76 Z" fill="#fecdd3" stroke="#e11d48" stroke-width="1.5"/>
            <rect x="202" y="76" width="100" height="16" fill="#ef4444" fill-opacity="0.7"/>
            <rect x="202" y="92" width="100" height="68" fill="#475569"/>
            <rect x="210" y="102" width="38" height="48" rx="4" fill="#38bdf8"/>
            <rect x="256" y="102" width="38" height="48" rx="4" fill="#fb7185"/>
            <text x="229" y="130" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">A像</text>
            <text x="275" y="130" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">B像</text>
            <rect x="196" y="170" width="112" height="26" rx="6" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="252" y="187" text-anchor="middle" font-size="9.5" font-weight="800" fill="#9f1239">全画素2分割・縦横AF</text>
            <text x="252" y="218" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">キヤノン流 爆速AF</text>
            <text x="252" y="234" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">全画素で測距＋撮像両立</text>

            <!-- 3: Sony 2x1 OCL PDAF -->
            <rect x="344" y="0" width="160" height="248" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
            <rect x="344" y="0" width="160" height="26" rx="10" fill="#059669"/>
            <text x="424" y="17" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">③ 2×1 OCL 位相差</text>
            <path d="M 362 76 Q 424 38 486 76 Z" fill="#a7f3d0" stroke="#059669" stroke-width="1.5"/>
            <rect x="362" y="76" width="124" height="16" fill="#10b981" fill-opacity="0.7"/>
            <rect x="362" y="92" width="124" height="68" fill="#475569"/>
            <rect x="370" y="102" width="48" height="48" rx="4" fill="#34d399"/>
            <rect x="430" y="102" width="48" height="48" rx="4" fill="#2dd4bf"/>
            <text x="394" y="130" text-anchor="middle" font-size="9.5" font-weight="800" fill="#064e3b">左画素</text>
            <text x="454" y="130" text-anchor="middle" font-size="9.5" font-weight="800" fill="#064e3b">右画素</text>
            <rect x="366" y="170" width="116" height="26" rx="6" fill="#d1fae5" stroke="#059669"/>
            <text x="424" y="187" text-anchor="middle" font-size="9.5" font-weight="800" fill="#065f46">2画素共有巨大レンズ</text>
            <text x="424" y="218" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">ソニー流 高感度AF</text>
            <text x="424" y="234" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">遮光損ゼロで暗所強い</text>

            <!-- 4: Global Shutter / Pixel-Parallel ADC -->
            <rect x="516" y="0" width="160" height="248" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
            <rect x="516" y="0" width="160" height="26" rx="10" fill="#d97706"/>
            <text x="596" y="17" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">④ GS / 画素並列ADC</text>
            <path d="M 548 72 Q 596 42 644 72 Z" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
            <rect x="546" y="72" width="100" height="52" fill="#475569"/>
            <rect x="556" y="80" width="80" height="34" rx="4" fill="#f59e0b"/>
            <text x="596" y="101" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">全画素同時露光</text>
            <rect x="546" y="130" width="100" height="32" rx="4" fill="#1e293b" stroke="#f59e0b"/>
            <text x="596" y="150" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fbbf24">電圧保持 / 画素ADC</text>
            <rect x="536" y="170" width="120" height="26" rx="6" fill="#fef3c7" stroke="#d97706"/>
            <text x="596" y="187" text-anchor="middle" font-size="9.5" font-weight="800" fill="#92400e">Cu-Cu直結3D積層</text>
            <text x="596" y="218" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">動体歪み完全ゼロ</text>
            <text x="596" y="234" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">全速フラッシュ同調</text>
          </g>
        `,
        cards: [
          { label: '選択する構造', line1: '4T+DCG / クロスDP / 2×1 OCL', line2: 'または GS用 電圧保持・画素ADC' },
          { label: '対応レンジ', line1: '画素ピッチ 1.5µm(4.1億画素)', line2: '〜 5.9µm(24MP級)まで網羅' },
          { label: '失敗すると写真に？', line1: 'AF食い付き・高感度ノイズ限界', line2: '白飛び耐性の天井がここで固定！' },
        ],
      });

    case 'fab3_p03_process_tcad_3d':
      return wrapFab3HdSvg({
        badge: 'F3-05',
        stepTag: 'P02-003 [業界標準]',
        title: '3次元プロセスTCADシミュレーション（イオン注入＆熱拡散）',
        analogy: '焼く前にスパコン内で原子の飛び込みと広がりを1nm刻みで仮想実験',
        accent: '#6366f1',
        accentSoft: '#eef2ff',
        body: `
          <!-- Ion Implantation Beam into 3D Silicon Mesh -->
          <g transform="translate(30, 82)">
            <rect x="0" y="0" width="380" height="250" rx="10" fill="#f8fafc" stroke="#6366f1" stroke-width="1.3"/>
            <text x="190" y="20" text-anchor="middle" font-size="11.2" font-weight="800" fill="#312e81">3DプロセスTCAD メッシュ断面（nm分解能）</text>
            <!-- Ion implant arrows -->
            <line x1="145" y1="30" x2="145" y2="80" stroke="#7c3aed" stroke-width="3" marker-end="url(#f305-arrPurple)"/>
            <line x1="190" y1="30" x2="190" y2="80" stroke="#7c3aed" stroke-width="3" marker-end="url(#f305-arrPurple)"/>
            <line x1="235" y1="30" x2="235" y2="80" stroke="#7c3aed" stroke-width="3" marker-end="url(#f305-arrPurple)"/>
            <text x="315" y="54" text-anchor="middle" font-size="9.5" font-weight="800" fill="#6d28d9">リン(P) / ホウ素(B)</text>
            <text x="315" y="68" text-anchor="middle" font-size="9.2" font-weight="700" fill="#475569">エネルギー・角度走査</text>
            <!-- Si Substrate with nested doping contour ellipses + mesh lines -->
            <rect x="34" y="84" width="312" height="148" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <!-- P+ Surface Pinning Layer -->
            <rect x="44" y="88" width="292" height="16" rx="3" fill="#f43f5e" fill-opacity="0.82"/>
            <text x="190" y="100" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">P+ ピニング層（表面暗電流ブロック）</text>
            <!-- Nested N-type Photodiode Diffusion Contours -->
            <ellipse cx="190" cy="158" rx="118" ry="52" fill="#3b82f6" fill-opacity="0.32" stroke="#60a5fa" stroke-dasharray="4 3"/>
            <ellipse cx="190" cy="156" rx="86" ry="38" fill="#2563eb" fill-opacity="0.52" stroke="#93c5fd"/>
            <ellipse cx="190" cy="154" rx="52" ry="22" fill="#06b6d4" fill-opacity="0.78" stroke="#e0f2fe"/>
            <!-- 3D Finite Element Mesh Lines -->
            <path d="M 70 112 L 190 154 L 310 112 M 70 218 L 190 154 L 310 218 M 190 104 L 190 232" stroke="#ffffff" stroke-opacity="0.25" stroke-width="0.9"/>
            <text x="190" y="158" text-anchor="middle" font-size="10.5" font-weight="900" fill="#0f172a">高濃度N型 PD深部</text>
          </g>
          <!-- Right: Software & Sensitivity Analysis -->
          <g transform="translate(426, 82)">
            ${drawKpiBox(0, 0, 266, 76, '主なTCADソフトウェア', 'Sentaurus / Victory', 'Synopsys・Silvaco 3D物理計算', '#6366f1')}
            ${drawKpiBox(0, 86, 266, 76, 'アニール熱拡散解析', 'nm級 3Dメッシュ', '温度・注入量ばらつき感度評価', '#0284c7')}
            ${drawPill(0, 174, 266, '分布不良 → PD端に電子残存(残像)', false)}
            ${drawPill(0, 208, 266, '滑らかな不純物勾配 → 残像ゼロ！', true)}
          </g>
        `,
        cards: [
          { label: '物理計算', line1: 'リン・ホウ素の注入エネルギーと', line2: '焼成温度による3D原子拡散を計算' },
          { label: '代表ソフト', line1: 'Synopsys Sentaurus', line2: 'Silvaco Victory（3D nmメッシュ）' },
          { label: '失敗すると写真に？', line1: 'PDの端に電子が取り残されてしまい', line2: '動く被写体に「残像（イメージラグ）」' },
        ],
      });

    case 'fab3_p04_device_tcad_potential':
      return wrapFab3HdSvg({
        badge: 'F3-06',
        stepTag: 'P02-004 [業界標準]',
        title: '3次元デバイスTCAD（電位のすべり台＆99.99%超完全転送）',
        analogy: '電子が1個も引っかからずPD→TG→FDへ滑り降りる「くぼみゼロの滑り台」',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          <!-- Left: OK Smooth Potential Slide vs Right: NG Potential Pocket -->
          ${drawCompareFrame(24, 82, 336, 250, '✅ 理想設計：単調減少する電位の坂道（転送効率99.99%超）', '#059669', '#f0fdf4')}
          <g transform="translate(36, 120)">
            <!-- Smooth stepped downhill slide -->
            <path d="M 10 26 L 106 26 Q 124 26 134 62 L 194 114 Q 210 128 232 162 L 302 162 L 302 190 L 10 190 Z" fill="#dcfce7" stroke="#059669" stroke-width="2.2"/>
            <!-- Sliding golden electrons -->
            <circle cx="48" cy="18" r="7" fill="#f59e0b" stroke="#b45309" stroke-width="1.3"/>
            <circle cx="88" cy="18" r="7" fill="#f59e0b" stroke="#b45309" stroke-width="1.3"/>
            <circle cx="156" cy="70" r="7" fill="#f59e0b" stroke="#b45309" stroke-width="1.3"/>
            <circle cx="212" cy="122" r="7" fill="#f59e0b" stroke="#b45309" stroke-width="1.3"/>
            <circle cx="268" cy="153" r="7" fill="#f59e0b" stroke="#b45309" stroke-width="1.3"/>
            <text x="58" y="182" text-anchor="middle" font-size="10.2" font-weight="800" fill="#1e293b">PD（バケツ）</text>
            <text x="164" y="182" text-anchor="middle" font-size="10.2" font-weight="800" fill="#4f46e5">TG（転送ゲート）</text>
            <text x="266" y="182" text-anchor="middle" font-size="10.2" font-weight="800" fill="#047857">FD（出口）</text>
            <text x="156" y="40" font-size="10" font-weight="800" fill="#047857">電子1個〜10万個を100.0%転送！</text>
          </g>

          ${drawCompareFrame(374, 82, 322, 250, '❌ 失敗設計：途中に「電位のくぼみ（ポケット）」', '#e11d48', '#fff1f2')}
          <g transform="translate(386, 120)">
            <!-- Slide with a dangerous potential pocket/barrier bump -->
            <path d="M 10 26 L 90 26 L 112 72 Q 132 94 152 60 L 176 42 L 222 152 L 292 152 L 292 190 L 10 190 Z" fill="#ffe4e6" stroke="#e11d48" stroke-width="2.2"/>
            <!-- Trapped electrons in pocket -->
            <circle cx="126" cy="68" r="6.5" fill="#e11d48"/>
            <circle cx="140" cy="68" r="6.5" fill="#e11d48"/>
            <text x="134" y="114" text-anchor="middle" font-size="10.5" font-weight="900" fill="#9f1239">⚠️ 電位のくぼみ！</text>
            <text x="134" y="129" text-anchor="middle" font-size="9.4" font-weight="700" fill="#881337">暗所の数電子が引っかかる</text>
            <text x="150" y="182" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">→ シャドウが汚くザラつく・残像発生</text>
          </g>
        `,
        cards: [
          { label: '解析レンジ', line1: '電子 1個 〜 10万個レベルまで', line2: 'ポアソン＆電流連続式で3D解析' },
          { label: '合格基準', line1: '飽和電子数（FWC）最大化＆', line2: '完全電荷転送効率 99.99%超！' },
          { label: '失敗すると写真に？', line1: '坂道にわずかなくぼみがあると暗部で', line2: '電子が引っかかりシャドウがザラつく' },
        ],
      });

    case 'fab3_p05_dark_current_blooming':
      return wrapFab3HdSvg({
        badge: 'F3-07',
        stepTag: 'P02-005 [業界標準]',
        title: '暗電流抑制＆アンチブルーミング（緊急排水路）解析',
        analogy: '真っ暗な壁からの漏水を止め、太陽で溢れた水は隣ではなく排水口へ逃がす',
        accent: '#a855f7',
        accentSoft: '#faf5ff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="420" height="250" rx="10" fill="#f8fafc" stroke="#a855f7" stroke-width="1.3"/>
            <!-- Sun flood rays -->
            <circle cx="150" cy="36" r="14" fill="#fde047" stroke="#ea580c" stroke-width="2"/>
            <line x1="150" y1="52" x2="150" y2="90" stroke="#f59e0b" stroke-width="3" marker-end="url(#f307-arrAmber)"/>
            <text x="234" y="42" font-size="10.2" font-weight="800" fill="#b45309">強烈な太陽・街灯の点光源</text>
            <!-- DTI Walls + Photodiode Bucket -->
            <rect x="46" y="92" width="18" height="126" fill="#7c3aed"/>
            <rect x="236" y="92" width="18" height="126" fill="#7c3aed"/>
            <text x="55" y="232" text-anchor="middle" font-size="9" font-weight="800" fill="#6d28d9">DTI壁</text>
            <text x="245" y="232" text-anchor="middle" font-size="9" font-weight="800" fill="#6d28d9">DTI壁</text>
            <!-- Negative charge barrier dots blocking thermal dark current -->
            <text x="69" y="130" font-size="11" font-weight="900" fill="#9333ea">⊖⊖</text>
            <text x="218" y="130" font-size="11" font-weight="900" fill="#9333ea">⊖⊖</text>
            <!-- Filled PD bucket -->
            <rect x="66" y="96" width="168" height="120" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
            <rect x="68" y="128" width="164" height="86" fill="#38bdf8" fill-opacity="0.72"/>
            <text x="150" y="176" text-anchor="middle" font-size="11" font-weight="800" fill="#0c4a6e">満杯のPDバケツ</text>
            <!-- Overflow Spillway Path to VDD Drain -->
            <path d="M 234 132 L 298 132 L 298 186" fill="none" stroke="#ea580c" stroke-width="4" marker-end="url(#f307-arrAmber)"/>
            <rect x="272" y="190" width="124" height="32" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>
            <text x="334" y="210" text-anchor="middle" font-size="10" font-weight="800" fill="#9a3412">電源(VDD)排水口</text>
            <text x="336" y="114" text-anchor="middle" font-size="9.5" font-weight="800" fill="#c2410c">オーバーフローパス</text>
            <text x="336" y="126" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">隣画素へ溢れさせない！</text>
          </g>
          <g transform="translate(462, 82)">
            ${drawKpiBox(0, 0, 230, 80, '高温暗電流の設計目標', '数 e-/s 以下', '60℃高温条件でも極小化', '#7c3aed')}
            ${drawKpiBox(0, 90, 230, 74, '検証手法', '温度依存 TCAD', '界面トラップ＋障壁高さ解析', '#0284c7')}
            ${drawPill(0, 176, 230, '排水不良→白くにじむブルーミング', false)}
            ${drawPill(0, 210, 230, '夜景の点光源が鋭く締まる！', true)}
          </g>
        `,
        cards: [
          { label: '暗電流の正体', line1: 'Si表面やDTI溝壁から熱で湧く雑音', line2: '60℃でも数e-/s以下へ封じ込め' },
          { label: '排水路設計', line1: '太陽等で満杯になった過剰電子を', line2: 'オーバーフローパスからVDDへ逃がす' },
          { label: '失敗すると写真に？', line1: '強い点光源の周囲が白くにじんで', line2: '滲み広がるブルーミングや白キズ発生' },
        ],
      });

    case 'fab3_p06_optical_fdtd_3d':
      return wrapFab3HdSvg({
        badge: 'F3-08',
        stepTag: 'P02-006 [業界標準]',
        title: '3次元電磁界光学シミュレーション（FDTD 380〜1,000nm）',
        analogy: '光を「波」として1nm単位で解き、レンズからシリコン底までの集光を計算',
        accent: '#c026d3',
        accentSoft: '#fdf4ff',
        body: `
          <!-- Left: Multi-Layer Optical Stack with Maxwell EM Waves -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="424" height="250" rx="10" fill="#0f172a" stroke="#c026d3" stroke-width="1.4"/>
            <!-- 3 RGB Microlenses -->
            <path d="M 38 66 Q 88 24 138 66 Z" fill="#bae6fd" fill-opacity="0.82"/>
            <path d="M 162 66 Q 212 24 262 66 Z" fill="#bae6fd" fill-opacity="0.82"/>
            <path d="M 286 66 Q 336 24 386 66 Z" fill="#bae6fd" fill-opacity="0.82"/>
            <!-- RGB Color Filter Array -->
            <rect x="38" y="68" width="100" height="24" fill="#ef4444"/>
            <rect x="162" y="68" width="100" height="24" fill="#22c55e"/>
            <rect x="286" y="68" width="100" height="24" fill="#3b82f6"/>
            <text x="88" y="84" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">R (630nm)</text>
            <text x="212" y="84" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">G (530nm)</text>
            <text x="336" y="84" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">B (450nm)</text>
            <!-- Tungsten Metal Light-Shield Grid -->
            <rect x="138" y="68" width="24" height="38" fill="#cbd5e1"/>
            <rect x="262" y="68" width="24" height="38" fill="#cbd5e1"/>
            <!-- Silicon with B-DTI Trenches & EM Wave Beams -->
            <rect x="30" y="106" width="364" height="120" fill="#1e293b" stroke="#64748b"/>
            <rect x="145" y="106" width="10" height="106" fill="#f8fafc"/>
            <rect x="269" y="106" width="10" height="106" fill="#f8fafc"/>
            <!-- Wave packets penetrating to wavelength-dependent depths -->
            <path d="M 88 26 Q 98 60 88 94 T 88 162 T 88 214" fill="none" stroke="#fb7185" stroke-width="3.2"/>
            <path d="M 212 26 Q 220 56 212 86 T 212 146 T 212 182" fill="none" stroke="#4ade80" stroke-width="3.2"/>
            <path d="M 336 26 Q 342 52 336 78 T 336 130" fill="none" stroke="#60a5fa" stroke-width="3.2"/>
            <text x="212" y="241" text-anchor="middle" font-size="9.6" font-weight="700" fill="#e2e8f0">金属グリッド＋B-DTIが隣の画素への光漏れ（クロストーク）を遮断！</text>
          </g>
          <g transform="translate(466, 82)">
            ${drawKpiBox(0, 0, 226, 76, '主なFDTDツール', 'Lumerical / RSoft', 'Ansys・Synopsys マクスウェル計算', '#c026d3')}
            ${drawKpiBox(0, 86, 226, 76, '走査波長・分解能', '380 〜 1,000 nm', '1nmメッシュでQE＆色分離検証', '#0284c7')}
            ${drawPill(0, 174, 226, '光漏れ→赤が緑に混じり色が濁る', false)}
            ${drawPill(0, 208, 226, '高量子効率(QE)＆澄んだ発色！', true)}
          </g>
        `,
        cards: [
          { label: '波動光学解析', line1: 'マイクロレンズ→CFA→遮光グリッド', line2: '→シリコンB-DTIを1nm単位で計算' },
          { label: '走査条件', line1: '波長 380〜1,000nm（可視＋近赤外）', line2: '量子効率(QE)と色分離を厳格検証' },
          { label: '失敗すると写真に？', line1: '感度低下や、緑画素へ隣の赤の光が', line2: '漏れ込む光学クロストーク（色の濁り）' },
        ],
      });

    case 'fab3_p07_cra_angle_shift':
      return wrapFab3HdSvg({
        badge: 'F3-09',
        stepTag: 'P02-007 [業界標準]',
        title: 'CRA（主光線角度 0°→30°）マイクロレンズ内側シュリンク設計',
        analogy: '画面の四隅ほど斜め30°の雨が入るため、漏斗（レンズ）を内側へズラして受ける',
        accent: '#ec4899',
        accentSoft: '#fdf2f8',
        body: `
          <!-- Left: Center CRA 0 deg vs Right: Corner CRA 30 deg with Inward Shift -->
          ${drawCompareFrame(24, 82, 240, 250, '画面中央：CRA 0°（真上から入射）', '#0284c7', '#f0f9ff')}
          <g transform="translate(56, 118)">
            <line x1="88" y1="0" x2="88" y2="112" stroke="#0284c7" stroke-width="3.5" marker-end="url(#f309-arrBlue)"/>
            <path d="M 38 78 Q 88 38 138 78 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>
            <rect x="40" y="78" width="96" height="18" fill="#22c55e" fill-opacity="0.75"/>
            <rect x="34" y="96" width="108" height="72" fill="#334155"/>
            <rect x="46" y="106" width="84" height="52" rx="5" fill="#38bdf8"/>
            <text x="88" y="136" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">オフセット 0 nm</text>
            <text x="88" y="186" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0369a1">レンズとPD中心が一致</text>
          </g>

          ${drawCompareFrame(278, 82, 418, 250, '画面四隅：CRA 20〜35°（ミラーレス短フランジバック 16〜20mm）', '#ec4899', '#fdf2f8')}
          <g transform="translate(294, 116)">
            <!-- Oblique rays entering at 30 deg -->
            <line x1="56" y1="0" x2="152" y2="132" stroke="#ec4899" stroke-width="3.5" marker-end="url(#f309-arrRed)"/>
            <line x1="20" y1="0" x2="120" y2="132" stroke="#f472b6" stroke-width="2" stroke-dasharray="4 2"/>
            <!-- Shifted Microlens & CFA shifted INWARD (left) by nm-sub-um -->
            <path d="M 46 76 Q 96 36 146 76 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
            <rect x="54" y="76" width="88" height="18" fill="#22c55e" fill-opacity="0.8"/>
            <!-- Fixed Silicon PD underneath -->
            <rect x="86" y="94" width="118" height="72" fill="#334155"/>
            <rect x="98" y="104" width="94" height="52" rx="5" fill="#38bdf8"/>
            <text x="145" y="135" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">ど真ん中に集光！</text>
            <!-- Offset dimension callout -->
            <line x1="96" y1="26" x2="145" y2="26" stroke="#be185d" stroke-width="2"/>
            <text x="120" y="20" text-anchor="middle" font-size="9.6" font-weight="900" fill="#be185d">← 内側シュリンク量</text>
            <!-- Result summary box -->
            <rect x="220" y="20" width="166" height="146" rx="8" fill="#ffffff" stroke="#f472b6" stroke-width="1.3"/>
            <text x="303" y="42" text-anchor="middle" font-size="10.2" font-weight="800" fill="#be185d">レンズ設計部門と連携</text>
            <text x="230" y="64" font-size="9.4" font-weight="700" fill="#1e293b">・四隅CRA：約30°前後</text>
            <text x="230" y="82" font-size="9.4" font-weight="700" fill="#1e293b">・ずらし量：nm〜サブµm</text>
            <text x="230" y="106" font-size="9.4" font-weight="800" fill="#e11d48">❌ サボると広角レンズで：</text>
            <text x="230" y="123" font-size="9.2" font-weight="600" fill="#881337">・四隅が真っ暗（周辺減光）</text>
            <text x="230" y="139" font-size="9.2" font-weight="600" fill="#881337">・紫や緑の強烈な色かぶり</text>
            <text x="230" y="155" font-size="9.2" font-weight="600" fill="#881337"> （カラーシェーディング）！</text>
          </g>
        `,
        cards: [
          { label: 'ミラーレス特有の課題', line1: 'フランジバック16〜20mmの短焦点で', line2: '画面四隅は斜め20〜35°で光が侵入' },
          { label: 'シュリンク補正', line1: '端の画素ほどOCLとCFAを内側へ', line2: 'nm〜サブµm単位で精密オフセット' },
          { label: '失敗すると写真に？', line1: '広角レンズで四隅の極端な周辺減光や', line2: '紫・緑の色かぶり（色シェーディング）' },
        ],
      });

    case 'fab3_p08_pdaf_pupil_response':
      return wrapFab3HdSvg({
        badge: 'F3-10',
        stepTag: 'P02-008 [業界標準]',
        title: '像面位相差AF光学応答設計（瞳分離性能＆A/B像ズレ検出）',
        analogy: 'レンズの右目と左目から届く光をA/B画素へくっきり振り分ける視差設計',
        accent: '#f43f5e',
        accentSoft: '#fff1f2',
        body: `
          <!-- Optical Pupil Split Raytrace -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="384" height="250" rx="10" fill="#f8fafc" stroke="#f43f5e" stroke-width="1.3"/>
            <text x="192" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#9f1239">F1.2〜F22 瞳分離シミュレーション（デュアルPD / 2×1 OCL）</text>
            <!-- Camera Lens Exit Pupil split Left/Right -->
            <ellipse cx="192" cy="52" rx="96" ry="16" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
            <path d="M 96 52 A 96 16 0 0 1 192 36 L 192 68 A 96 16 0 0 1 96 52 Z" fill="#38bdf8" fill-opacity="0.72"/>
            <path d="M 288 52 A 96 16 0 0 0 192 36 L 192 68 A 96 16 0 0 0 288 52 Z" fill="#fb7185" fill-opacity="0.72"/>
            <text x="142" y="56" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0c4a6e">左瞳（A光）</text>
            <text x="242" y="56" text-anchor="middle" font-size="9.5" font-weight="800" fill="#881337">右瞳（B光）</text>
            <!-- Crossing Rays through Shared Microlens -->
            <line x1="138" y1="68" x2="226" y2="174" stroke="#0284c7" stroke-width="3" marker-end="url(#f310-arrBlue)"/>
            <line x1="246" y1="68" x2="158" y2="174" stroke="#e11d48" stroke-width="3" marker-end="url(#f310-arrRed)"/>
            <!-- Shared Microlens -->
            <path d="M 118 158 Q 192 114 266 158 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
            <!-- Split PD A & B -->
            <rect x="114" y="158" width="156" height="72" fill="#334155"/>
            <rect x="122" y="168" width="64" height="52" rx="4" fill="#fb7185"/>
            <rect x="198" y="168" width="64" height="52" rx="4" fill="#38bdf8"/>
            <text x="154" y="198" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">B像 PD</text>
            <text x="230" y="198" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">A像 PD</text>
          </g>
          <!-- Right: A/B Phase Shift Graph -->
          <g transform="translate(426, 82)">
            <rect x="0" y="0" width="268" height="162" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
            <text x="134" y="20" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">デフォーカス時の A像 / B像 位相差</text>
            <!-- A curve & B shifted curve -->
            <path d="M 24 128 Q 74 128 104 52 Q 134 128 184 128" fill="none" stroke="#0284c7" stroke-width="2.6"/>
            <path d="M 78 128 Q 128 128 158 52 Q 188 128 238 128" fill="none" stroke="#e11d48" stroke-width="2.6"/>
            <line x1="104" y1="48" x2="158" y2="48" stroke="#059669" stroke-width="2.2"/>
            <text x="131" y="42" text-anchor="middle" font-size="9.5" font-weight="800" fill="#059669">← 位相差 Δx →</text>
            <text x="134" y="148" text-anchor="middle" font-size="9.4" font-weight="700" fill="#475569">Δxからピント駆動量を一発算出！</text>
            ${drawPill(0, 174, 268, '分離甘いと暗所・F1.2でAF迷い', false)}
            ${drawPill(0, 208, 268, '左右対称性確認→開放F1.2一発合焦', true)}
          </g>
        `,
        cards: [
          { label: '物理検証', line1: 'A像・B像の信号差（瞳分離性能）を', line2: 'F1.2〜F22の全絞り条件でFDTD解析' },
          { label: 'チェック項目', line1: '左右像の非対称性・クロストーク', line2: '縦横クロスタイプ対応の光学最適化' },
          { label: '失敗すると写真に？', line1: '暗い場所や被写界深度が薄いF1.2で', line2: 'AFが迷ったり微妙なピントズレ発生' },
        ],
      });

    case 'fab3_p09_thermal_stress_sim':
      return wrapFab3HdSvg({
        badge: 'F3-11',
        stepTag: 'P02-009 [業界標準]',
        title: '熱・応力マルチフィジックス解析（反り Warpage＆熱ムラ）',
        analogy: '積層チップの1.5〜4.8W発熱と銅の膨張差で生じる歪み・暗電流増を先読み',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="406" height="250" rx="10" fill="#0f172a" stroke="#ea580c" stroke-width="1.4"/>
            <text x="203" y="22" text-anchor="middle" font-size="11.2" font-weight="800" fill="#fed7aa">積層センサー 熱膨張差＆反り（Warpage）MPa応力解析</text>
            <!-- Warped Upper Pixel Wafer -->
            <path d="M 38 118 Q 203 78 368 118 L 368 144 Q 203 104 38 144 Z" fill="url(#f311-cu)" stroke="#fdba74" stroke-width="1.5"/>
            <text x="203" y="114" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">画素シリコン層（応力集中でバンドギャップ低下！）</text>
            <!-- Cu-Cu Hybrid Bond Interface -->
            <g fill="#facc15">
              <rect x="64" y="144" width="16" height="22"/><rect x="116" y="136" width="16" height="30"/>
              <rect x="168" y="130" width="16" height="36"/><rect x="220" y="130" width="16" height="36"/>
              <rect x="272" y="136" width="16" height="30"/><rect x="324" y="144" width="16" height="22"/>
            </g>
            <!-- Heated Logic Wafer underneath -->
            <rect x="38" y="168" width="330" height="44" rx="4" fill="#dc2626" fill-opacity="0.82" stroke="#fca5a5"/>
            <text x="203" y="194" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">ロジック層 動作発熱：1.5 〜 4.8 W（ADC / SerDes）</text>
            <text x="203" y="236" text-anchor="middle" font-size="9.5" font-weight="700" fill="#94a3b8">Si（2.6 ppm/℃）と Cu（16.5 ppm/℃）の熱膨張差をAnsysで連成解析</text>
          </g>
          <g transform="translate(448, 82)">
            ${drawKpiBox(0, 0, 244, 76, '主な解析ソフト', 'Ansys Mech / Icepak', '温度分布(℃) × 応力(MPa)連成', '#ea580c')}
            ${drawKpiBox(0, 86, 244, 76, '検証指標', '反り Warpage ＆ 熱分布', 'Cu-Cu貼合後残留応力を抑制', '#0284c7')}
            ${drawPill(0, 174, 244, '応力集中→画面端が赤く熱カブり', false)}
            ${drawPill(0, 208, 244, '長秒露光でも均一な漆黒の暗部', true)}
          </g>
        `,
        cards: [
          { label: '物理現象', line1: 'Siに応力が掛かるとバンドギャップが', line2: '変化し局所的に暗電流が急増する' },
          { label: '解析ツール', line1: 'Ansys Mechanical / Icepak 等で', line2: '発熱(1.5〜4.8W)とMPa応力を連成' },
          { label: '失敗すると写真に？', line1: '画面の端だけ暗電流が増えて赤っぽく', line2: 'カブる（アンプグロー風熱ムラ）！' },
        ],
      });

    case 'fab3_p10_pixel_teg_validation':
      return wrapFab3HdSvg({
        badge: 'F3-12',
        stepTag: 'P02-010 [業界標準]',
        title: '画素テストチップ（TEG）設計と試作・実測検証',
        analogy: '数億円の本番マスク前に、ミニ試作チップで数十案を実測する最終オーディション',
        accent: '#14b8a6',
        accentSoft: '#f0fdfa',
        body: `
          <!-- Left: 3x3 TEG Variant Matrix with Winner Highlight -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="330" height="250" rx="10" fill="#f8fafc" stroke="#14b8a6" stroke-width="1.4"/>
            <text x="165" y="20" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f766e">数mm角 画素TEGチップ（数十パターン比較）</text>
            <!-- 3x3 Variant tiles -->
            ${[
              { r: 0, c: 0, t: '案A: 4T標準', s: 'QE 78%', win: false },
              { r: 0, c: 1, t: '案B: 深PD', s: 'ラグ微増', win: false },
              { r: 0, c: 2, t: '案C: 新DTI', s: '暗電流良', win: false },
              { r: 1, c: 0, t: '案D: 2×1', s: 'AF鋭い', win: false },
              { r: 1, c: 1, t: '★採用レシピ', s: 'QE最高/極低雑音', win: true },
              { r: 1, c: 2, t: '案F: 高FWC', s: '飽和最大', win: false },
              { r: 2, c: 0, t: '案G: 試作TG', s: '転送99.8%', win: false },
              { r: 2, c: 1, t: '案H: 細グリッド', s: '色混じり', win: false },
              { r: 2, c: 2, t: '案I: 低電圧', s: 'ノイズ増', win: false },
            ]
              .map((v) => {
                const x = 18 + v.c * 100;
                const y = 34 + v.r * 66;
                return `<rect x="${x}" y="${y}" width="92" height="58" rx="7" fill="${v.win ? '#ccfbf1' : '#ffffff'}" stroke="${v.win ? '#0d9488' : '#cbd5e1'}" stroke-width="${v.win ? '2.4' : '1.1'}"/>
                  <text x="${x + 46}" y="${y + 24}" text-anchor="middle" font-size="9.5" font-weight="800" fill="${v.win ? '#0f766e' : '#334155'}">${v.t}</text>
                  <text x="${x + 46}" y="${y + 42}" text-anchor="middle" font-size="8.8" font-weight="700" fill="${v.win ? '#047857' : '#64748b'}">${v.s}</text>`;
              })
              .join('')}
          </g>
          <!-- Right: Real Silicon vs Simulation Gap Calibration -->
          <g transform="translate(372, 82)">
            <rect x="0" y="0" width="320" height="162" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
            <text x="160" y="22" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">仮想シミュレーション vs 実測の誤差潰し</text>
            <rect x="18" y="38" width="124" height="52" rx="8" fill="#eef2ff" stroke="#6366f1"/>
            <text x="80" y="60" text-anchor="middle" font-size="10" font-weight="800" fill="#4338ca">TCAD / FDTD</text>
            <text x="80" y="76" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">仮想予測モデル</text>
            <line x1="144" y1="64" x2="174" y2="64" stroke="#0d9488" stroke-width="2.5" marker-end="url(#f312-arrGreen)"/>
            <rect x="178" y="38" width="124" height="52" rx="8" fill="#f0fdfa" stroke="#0d9488"/>
            <text x="240" y="60" text-anchor="middle" font-size="10" font-weight="800" fill="#0f766e">TEG実測プローブ</text>
            <text x="240" y="76" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">QE・ノイズ・FWC実測</text>
            <path d="M 240 92 L 240 124 L 80 124 L 80 94" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 2" marker-end="url(#f312-arrBlue)"/>
            <text x="160" y="144" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">数%のズレを完全補正し本番レシピ確定！</text>
            ${drawPill(0, 174, 320, 'TEG省略→本番マスク後にノイズ発覚', false)}
            ${drawPill(0, 208, 320, '最良レシピ確定→ブロック2-B本設計へ', true)}
          </g>
        `,
        cards: [
          { label: '試作規模', line1: '本番フルサイズ前に数mm角TEGで', line2: '数十種類の画素形状を先行試作' },
          { label: '合否判定', line1: 'プローバー＆光学評価装置で', line2: '実測QE・暗電流・ノイズ・FWC確認' },
          { label: '失敗すると写真に？', line1: '計算と実物の数%の差を潰し損ね', line2: '高感度ノイズや暗電流が期待外れに' },
        ],
      });

    default:
      return null;
  }
}
