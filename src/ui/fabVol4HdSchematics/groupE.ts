import { wrapFab3HdSvg, drawCompareFrame, drawPill } from '../fabVol3HdSchematics/shared';

/**
 * Vol.4 Ultra-HD 720x470 Beginner-Visual Posters — Group E (F4-41 – F4-45):
 * Block 3-F (P03-365–P03-380, 16 Steps): <1s Spike RTA Flash, CROWN JEWEL Mask #25 Salicide Block (SAB),
 * CoSi2/NiSi Salicide & Strip, 400°C N2/H2 Dangling-Bond Sintering, and 490-Step Vol.5 BEOL 210-Step Portal!
 */
export const FAB4_HD_GROUP_E: Record<string, () => string> = {
  fab4_p365_spike_rta_flash: () =>
    wrapFab3HdSvg({
      badge: 'F4-41',
      stepTag: 'P03-365〜366 1秒未満',
      title: 'スパイクRTA活性化アニール（1,000〜1,050℃・1秒未満のフラッシュ焼き！）',
      analogy: 'じっくり焼くとPDの輪郭がにじんでボケるため、ハロゲン閃光で1秒未満に一気に焼いて急冷！',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <!-- Left: Temperature Spike Curve Chart (<1s Peak vs Slow Furnace) -->
        <rect x="26" y="84" width="404" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <text x="228" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9a3412">📈 温度プロファイル比較：なぜ「1秒未満の尖った山（スパイク）」か？</text>
        <!-- Axes -->
        <line x1="68" y1="286" x2="404" y2="286" stroke="#475569" stroke-width="2"/>
        <line x1="68" y1="286" x2="68" y2="124" stroke="#475569" stroke-width="2"/>
        <text x="58" y="138" text-anchor="end" font-size="8.6" font-weight="800" fill="#e11d48">1050℃</text>
        <text x="58" y="210" text-anchor="end" font-size="8.6" font-weight="700" fill="#64748b">500℃</text>
        <text x="380" y="302" text-anchor="end" font-size="8.8" font-weight="700" fill="#475569">時間 (秒) →</text>
        <!-- Bad Slow Curve -->
        <path d="M 76,282 Q 120,170 210,164 L 310,164 Q 360,170 392,282" fill="#94a3b8" fill-opacity="0.22" stroke="#64748b" stroke-width="2" stroke-dasharray="5 3"/>
        <text x="314" y="186" text-anchor="middle" font-size="9" font-weight="800" fill="#64748b">❌ 従来じっくり焼き</text>
        <text x="314" y="200" text-anchor="middle" font-size="8.4" font-weight="700" fill="#9f1239">P+蓋やPDが拡散してボケる</text>
        <!-- Good Sharp Spike RTA Curve! -->
        <path d="M 86,284 Q 158,250 184,132 Q 210,250 282,284" fill="#fb923c" fill-opacity="0.42" stroke="#ea580c" stroke-width="3.4"/>
        <circle cx="184" cy="132" r="5.5" fill="#e11d48" stroke="#ffffff" stroke-width="1.6"/>
        <rect x="122" y="114" width="124" height="20" rx="10" fill="#ea580c"/>
        <text x="184" y="127.5" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">頂点 1,000–1,050℃ / &lt;1秒!</text>
        <text x="234" y="318" text-anchor="middle" font-size="9.4" font-weight="800" fill="#c2410c">AMAT / SCREEN ハロゲンランプRTA・レーザーアニール</text>

        <!-- Right: Sharp vs Blurred Profile Outcome -->
        ${drawCompareFrame(446, 84, 248, 248, '🎯 輪郭のにじみ対決', '#059669', '#f0fdf4')}
        <rect x="466" y="128" width="208" height="68" rx="8" fill="#ffffff" stroke="#059669"/>
        <text x="570" y="148" text-anchor="middle" font-size="9.8" font-weight="800" fill="#065f46">✅ 1秒スパイクRTA</text>
        <rect x="488" y="158" width="164" height="12" fill="#f59e0b"/>
        <rect x="488" y="170" width="164" height="16" fill="#38bdf8"/>
        <text x="570" y="212" text-anchor="middle" font-size="8.8" font-weight="700" fill="#047857">不純物100%目覚め＋輪郭クッキリ!</text>

        <rect x="466" y="226" width="208" height="68" rx="8" fill="#fff1f2" stroke="#e11d48"/>
        <text x="570" y="246" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">❌ 長時間焼きすぎ</text>
        <rect x="488" y="256" width="164" height="28" fill="#fda4af" fill-opacity="0.7"/>
        <text x="570" y="274" text-anchor="middle" font-size="8.8" font-weight="800" fill="#881337">P+蓋とPDが混ざり感度・転送ガタ落ち</text>
        ${drawPill(480, 300, 180, '拡散最小×電気活性化最大', true)}
      `,
      cards: [
        { label: '原子を目覚めさせる閃光', line1: '約1,000〜1,050℃へ約1秒前後で急加熱', line2: '打込んだ原子をSi結晶格子へ定着', accent: '#ea580c' },
        { label: '主要装置・技術', line1: 'AMAT / SCREEN ハロゲンランプRTA', line2: 'さらに高速なレーザーアニールも併用', accent: '#0284c7' },
        { label: '写真への影響', line1: '長焼きすると数十nmのP+蓋がにじみ', line2: '青色感度と転送効率が大幅に悪化', accent: '#e11d48' },
      ],
    }),

  fab4_m25_salicide_block_sab: () =>
    wrapFab3HdSvg({
      badge: 'F4-42',
      stepTag: '★Mask #25 CIS秘技SAB',
      title: '【Mask #25】シリサイドブロック（SAB：画素金属保護・CPUとの差！）',
      analogy: '周辺回路は金属化で爆速にしつつ、光を受ける画素の上だけはガラスのフタで金属を完全遮断！',
      accent: '#059669',
      accentSoft: '#ecfdf5',
      body: `
        <!-- Left: Pixel Area (SHIELDED by 30-50nm SAB!) -->
        ${drawCompareFrame(26, 84, 336, 248, '🛡 画素エリア（PD＆画素Tr）：SABで金属を完全ブロック！', '#059669', '#ecfdf5')}
        <!-- Bouncing Co/Ni Metal Atoms! -->
        ${[92, 162, 232, 300]
          .map(
            (x) =>
              `<circle cx="${x}" cy="134" r="9" fill="#64748b" stroke="#0f172a"/><text x="${x}" y="137.5" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">Ni/Co</text><path d="M ${x},146 L ${x},166 L ${x + 16},152" fill="none" stroke="#059669" stroke-width="2"/>`
          )
          .join('')}
        <!-- SAB Shield Layer (30-50nm!) -->
        <rect x="46" y="168" width="296" height="28" rx="5" fill="#10b981" stroke="#065f46" stroke-width="2"/>
        <text x="194" y="186" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">★ SAB保護絶縁膜（SiO₂/SiN：30〜50 nm）</text>
        <!-- Unharmed Pixel PPD -->
        <rect x="46" y="196" width="296" height="84" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="194" y="232" text-anchor="middle" font-size="10.6" font-weight="900" fill="#075985">無傷のフォトダイオード（重金属原子ゼロ！）</text>
        <text x="194" y="252" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">※もしCo/Niが1粒でも染みると壊滅的な白キズ地獄!</text>
        ${drawPill(78, 294, 232, 'CPU工場にはないCIS専用の知恵!', true)}

        <!-- Right: Periphery Logic Area (OPENED for Ultra-Low-Resistance Salicide!) -->
        ${drawCompareFrame(378, 84, 316, 248, '⚡ 周辺高速回路（CPU同様）：フタを開けて金属シリサイド化！', '#0284c7', '#f0f9ff')}
        ${[442, 536, 630]
          .map(
            (x) =>
              `<line x1="${x}" y1="126" x2="${x}" y2="178" stroke="#0284c7" stroke-width="2.6" marker-end="url(#f442-arrBlue)"/>`
          )
          .join('')}
        <text x="536" y="156" text-anchor="middle" font-size="9.6" font-weight="800" fill="#075985">SAB膜を選択エッチングで開口！</text>
        <!-- Exposed Periphery Transistor -->
        <rect x="404" y="214" width="264" height="66" fill="#475569"/>
        <rect x="498" y="168" width="76" height="46" fill="#1e293b"/>
        <!-- Metallic Silicide Waiting Zones -->
        <rect x="414" y="206" width="76" height="10" fill="#38bdf8"/>
        <rect x="582" y="206" width="76" height="10" fill="#38bdf8"/>
        <rect x="498" y="162" width="76" height="8" fill="#38bdf8"/>
        <text x="536" y="252" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fde047">次工程でNiSi/CoSi₂合金化 → 爆速駆動!</text>
        ${drawPill(422, 294, 228, '最終25枚目マスク P03-367〜378', true)}
      `,
      cards: [
        { label: 'なぜ画素だけ金属NG？', line1: 'Co/Ni金属が微量でもPDへ染みると', line2: '壊滅的な暗電流・白キズ地獄に！', accent: '#059669' },
        { label: '最終Mask #25の仕組み', line1: '全面に30〜50nm保護膜(SAB)を成膜', line2: '周辺回路の上だけ開けて画素を封印', accent: '#0284c7' },
        { label: 'CPU工場との決定的差', line1: 'CPUは全素子をシリサイド化', line2: 'CISは「高速周辺×清浄画素」を両立', accent: '#e11d48' },
      ],
    }),

  fab4_p379_salicide_cosi_nisi: () =>
    wrapFab3HdSvg({
      badge: 'F4-43',
      stepTag: 'P03-379 NiSi/CoSi₂',
      title: '自己整合シリサイド（サリサイド：CoSi₂ / NiSi）形成＆未反応金属除去',
      analogy: '全面に金属を乗せて焼くと開口した周辺だけ合金化！ 画素上の未反応金属は綺麗に洗い流す',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <!-- Step 1: Blanket Co/Ni Sputter + RTA -->
        <rect x="26" y="84" width="214" height="248" rx="10" fill="#f8fafc" stroke="#64748b" stroke-width="1.4"/>
        <text x="133" y="106" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0f172a">① Co/Ni全面スパッタ＋RTA</text>
        <!-- Left Pixel (SAB) + Right Periphery (Bare Si) -->
        <rect x="42" y="154" width="90" height="16" fill="#94a3b8"/>
        <rect x="134" y="154" width="90" height="16" fill="#94a3b8"/>
        <rect x="42" y="170" width="90" height="18" fill="#10b981"/>
        <rect x="42" y="188" width="90" height="66" fill="#bae6fd"/>
        <rect x="134" y="170" width="90" height="84" fill="#475569"/>
        <text x="87" y="183" text-anchor="middle" font-size="8.4" font-weight="800" fill="#ffffff">SAB保護膜</text>
        <text x="179" y="166" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0f172a">Siと直接接触!</text>
        <text x="133" y="280" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ea580c">NiSi: 400〜500℃</text>
        <text x="133" y="298" text-anchor="middle" font-size="9.2" font-weight="800" fill="#c2410c">CoSi₂: 700〜850℃</text>
        <text x="133" y="316" text-anchor="middle" font-size="8.4" font-weight="600" fill="#475569">AMAT / ULVAC スパッタ＋2段階RTA</text>

        <!-- Step 2: Selective Unreacted Metal Wet Strip -->
        <rect x="254" y="84" width="214" height="248" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
        <text x="361" y="106" text-anchor="middle" font-size="10.4" font-weight="800" fill="#065f46">② 未反応金属だけ薬液除去!</text>
        <!-- Pixel Side: Unreacted Metal Washed Away! -->
        <text x="315" y="146" text-anchor="middle" font-size="8.8" font-weight="800" fill="#059669">💧 綺麗サッパリ洗浄</text>
        <rect x="270" y="170" width="90" height="18" fill="#10b981"/>
        <rect x="270" y="188" width="90" height="66" fill="#bae6fd"/>
        <text x="315" y="226" text-anchor="middle" font-size="9.2" font-weight="800" fill="#075985">画素：無傷!</text>
        <!-- Periphery Side: Golden-Silver Silicide Remains! -->
        <rect x="362" y="168" width="90" height="18" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
        <rect x="362" y="186" width="90" height="68" fill="#475569"/>
        <text x="407" y="181" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">NiSi / CoSi₂</text>
        <text x="407" y="226" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">周辺：爆速!</text>
        ${drawPill(274, 286, 174, '位置ズレゼロの自己整合!', true)}

        <!-- Step 3: Pinhole Danger Alert -->
        ${drawCompareFrame(482, 84, 212, 248, '⚠️ SABピンホール絶対厳禁!', '#e11d48', '#fff1f2')}
        <rect x="502" y="156" width="172" height="22" fill="#10b981"/>
        <!-- Tiny Pinhole Leak -->
        <rect x="582" y="156" width="12" height="22" fill="#e11d48"/>
        <line x1="588" y1="130" x2="588" y2="226" stroke="#e11d48" stroke-width="2.8" marker-end="url(#f443-arrRed)"/>
        <rect x="502" y="178" width="172" height="74" fill="#fecdd3" stroke="#e11d48"/>
        <text x="588" y="242" text-anchor="middle" font-size="9.4" font-weight="900" fill="#9f1239">💥 金属侵入→白キズ発生!</text>
        <text x="588" y="274" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">TXRFで金属残渣ゼロを全数監視</text>
        ${drawPill(504, 294, 168, 'ピンホールゼロが画質の命', false)}
      `,
      cards: [
        { label: '自己整合サリサイド', line1: '裸のSi上だけCo/Niと反応し低抵抗化', line2: 'SAB膜上の未反応金属は薬液で全剥離', accent: '#0284c7' },
        { label: '反応温度・装置', line1: 'AMAT/ULVACスパッタ＋2段階RTA', line2: 'NiSi 400–500℃ / CoSi₂ 700–850℃', accent: '#ea580c' },
        { label: '品質の絶対条件', line1: 'SAB膜に1個でもピンホールがあると', line2: '重金属がPDへ入り白キズ欠陥に直結', accent: '#e11d48' },
      ],
    }),

  fab4_p380_h2_sinter_feol_wat: () =>
    wrapFab3HdSvg({
      badge: 'F4-44',
      stepTag: 'P03-380 FEOL最終工程',
      title: '水素シンタリング（400℃ダングリングボンド修復）＆FEOL合格検査',
      analogy: '原子の「千切れた手」に最小の水素原子が握手してノイズを鎮め、FEOL卒業試験に合格！',
      accent: '#0891b2',
      accentSoft: '#ecfeff',
      body: `
        <!-- Left: Before H2 Sinter (Dangling Bonds = Noise Traps) -->
        ${drawCompareFrame(26, 84, 212, 248, '① 焼成前：千切れた手あり', '#e11d48', '#fff1f2')}
        <rect x="44" y="132" width="176" height="58" fill="#bae6fd"/>
        <text x="132" y="164" text-anchor="middle" font-size="9.8" font-weight="800" fill="#075985">酸化膜 SiO₂</text>
        <rect x="44" y="190" width="176" height="92" fill="#475569"/>
        ${[76, 114, 152, 190]
          .map((x) => `<circle cx="${x}" cy="202" r="9" fill="#94a3b8"/><text x="${x}" y="205.5" text-anchor="middle" font-size="8" font-weight="900" fill="#ffffff">Si</text><line x1="${x}" y1="193" x2="${x}" y2="178" stroke="#e11d48" stroke-width="2.6"/><circle cx="${x}" cy="175" r="3.5" fill="#e11d48"/>`)
          .join('')}
        <text x="132" y="246" text-anchor="middle" font-size="9.4" font-weight="900" fill="#fecdd3">未結合手(ダングリングボンド)</text>
        <text x="132" y="264" text-anchor="middle" font-size="8.8" font-weight="700" fill="#e2e8f0">暗電流＆ノイズフロア急増！</text>
        ${drawPill(48, 294, 168, '暗所ノイズが跳ね上がる', false)}

        <!-- Center: 400°C N2/H2 Forming Gas Furnace -->
        <rect x="252" y="84" width="216" height="248" rx="10" fill="#ecfeff" stroke="#0891b2" stroke-width="1.6"/>
        <text x="360" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#155e75">🤝 400℃ N₂/H₂ 水素の握手!</text>
        <rect x="272" y="132" width="176" height="58" fill="#bae6fd"/>
        <!-- Tiny Hydrogen Atoms Diffusing Down -->
        ${[304, 342, 380, 418]
          .map((x) => `<circle cx="${x}" cy="152" r="7.5" fill="#06b6d4" stroke="#ffffff" stroke-width="1.4"/><text x="${x}" y="155" text-anchor="middle" font-size="8" font-weight="900" fill="#ffffff">H</text><line x1="${x}" y1="160" x2="${x}" y2="176" stroke="#0891b2" stroke-width="2" marker-end="url(#f444-arrBlue)"/>`)
          .join('')}
        <rect x="272" y="190" width="176" height="92" fill="#475569"/>
        ${[304, 342, 380, 418]
          .map((x) => `<circle cx="${x}" cy="204" r="9" fill="#34d399"/><text x="${x}" y="207.5" text-anchor="middle" font-size="8" font-weight="900" fill="#064e3b">Si</text><circle cx="${x}" cy="184" r="6" fill="#06b6d4"/><text x="${x}" y="187" text-anchor="middle" font-size="7.5" font-weight="900" fill="#ffffff">H</text>`)
          .join('')}
        <text x="360" y="246" text-anchor="middle" font-size="9.6" font-weight="900" fill="#fde047">Si−H 安定結合でノイズ封印!</text>
        <text x="360" y="266" text-anchor="middle" font-size="8.8" font-weight="700" fill="#e2e8f0">縦型シンタリング炉 約400℃</text>
        ${drawPill(274, 294, 172, '暗電流を極限まで鎮める!', true)}

        <!-- Right: Pre-BEOL WAT & KLA Final Gate -->
        <rect x="482" y="84" width="212" height="248" rx="10" fill="#f0fdf4" stroke="#059669" stroke-width="1.5"/>
        <text x="588" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#065f46">🎓 FEOL卒業合格テスト</text>
        <rect x="498" y="128" width="180" height="72" rx="8" fill="#ffffff" stroke="#059669"/>
        <text x="588" y="150" text-anchor="middle" font-size="9.8" font-weight="800" fill="#065f46">① TEG電気特性モニター</text>
        <text x="588" y="168" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">スクライブライン上テスト素子で</text>
        <text x="588" y="184" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">Vt・リーク・WAT準備を検証</text>
        <rect x="498" y="210" width="180" height="68" rx="8" fill="#ffffff" stroke="#0284c7"/>
        <text x="588" y="232" text-anchor="middle" font-size="9.8" font-weight="800" fill="#075985">② KLA / 日立ハイテク検査</text>
        <text x="588" y="250" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">全面の光学外観・欠陥検査で</text>
        <text x="588" y="266" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">FEOL 380工程 合格判定！</text>
        ${drawPill(504, 294, 168, 'P03-380 全工程クリア！', true)}
      `,
      cards: [
        { label: '最小原子Hの癒やし', line1: '約400℃のN₂/H₂フォーミングガスで', line2: '界面の千切れた手をSi-H結合へ修復', accent: '#0891b2' },
        { label: '主要装置・検査', line1: '縦型シンタリング炉＋KLA/日立検査', line2: 'スクライブラインTEGでWAT監視', accent: '#059669' },
        { label: '不十分だと写真に？', line1: '未結合手が残ると暗所撮影の', line2: 'ノイズフロアが一気に跳ね上がる', accent: '#e11d48' },
      ],
    }),

  fab4_feol_380_to_vol5_beol: () =>
    wrapFab3HdSvg({
      badge: 'F4-45',
      stepTag: '累計490工程 → 第5巻へ',
      title: '累計490工程達成！ ── 孤島の画素たちを繋ぐ第5巻「銅の立体高速道路 BEOL」へ',
      analogy: '6,680万個の光電心臓部が完成！ 次はこの上に5階建ての銅立体高速道路（210工程）を建設',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        <!-- Top: Cumulative Milestone Progress Bar (60 + 50 + 380 = 490 -> +210 = 700) -->
        <rect x="26" y="84" width="668" height="104" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>
        <text x="360" y="106" text-anchor="middle" font-size="11.4" font-weight="900" fill="#92400e">🏆 累計 490 工程 完走！（第2巻 60 ＋ 第3巻 50 ＋ 第4巻 FEOL 380 ＝ 490工程！）</text>
        <!-- Progress Segments -->
        <rect x="44" y="120" width="84" height="44" rx="6" fill="#0ea5e9"/>
        <text x="86" y="139" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">P1 砂→Wafer</text>
        <text x="86" y="155" text-anchor="middle" font-size="9.6" font-weight="900" fill="#e0f2fe">60工程 ✅</text>

        <rect x="134" y="120" width="80" height="44" rx="6" fill="#6366f1"/>
        <text x="174" y="139" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">P2 設計/Mask</text>
        <text x="174" y="155" text-anchor="middle" font-size="9.6" font-weight="900" fill="#e0e7ff">50工程 ✅</text>

        <rect x="220" y="120" width="268" height="44" rx="6" fill="#e11d48" stroke="#9f1239" stroke-width="1.8"/>
        <text x="354" y="139" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">★ 第4巻 P3 画素FEOL（全25マスク）</text>
        <text x="354" y="156" text-anchor="middle" font-size="10" font-weight="900" fill="#ffe4e6">380工程 完全制覇 ✅（累計490）</text>

        <rect x="496" y="120" width="180" height="44" rx="6" fill="#ffffff" stroke="#d97706" stroke-width="2" stroke-dasharray="5 3"/>
        <text x="586" y="139" text-anchor="middle" font-size="9.6" font-weight="900" fill="#b45309">▶ 次巻 第5巻 P4 BEOL</text>
        <text x="586" y="156" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ea580c">＋210工程（銅5層＆Cu-Cu）</text>

        <!-- Bottom: Island Pixels Now -> 5-Floor Copper Highway Next! -->
        ${drawCompareFrame(26, 200, 324, 134, '🏝 現在の状態：6,680万個の孤島が完成', '#0284c7', '#f0f9ff')}
        <text x="188" y="250" text-anchor="middle" font-size="10" font-weight="800" fill="#075985">RGB 3段PD・P+蓋・4Tスイッチ・SAB完備!</text>
        <text x="188" y="272" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">しかしまだ「電線で繋がっていない孤島」状態</text>
        ${drawPill(62, 294, 252, '光電変換の心臓部は100%完成！', true)}

        ${drawCompareFrame(370, 200, 324, 134, '🛣 次巻 第5巻（BEOL 210工程）のミッション', '#ea580c', '#fff7ed')}
        <text x="532" y="250" text-anchor="middle" font-size="10" font-weight="800" fill="#9a3412">Wコンタクト柱 → 5階建て銅(Cu)立体高速道路!</text>
        <text x="532" y="272" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">最上階にロジック合体用のナノ鏡面Cu-Cuパッド</text>
        ${drawPill(406, 294, 252, 'P04-001〜210 第5巻BEOLへ続く！', true)}
      `,
      cards: [
        { label: '第4巻の完全達成', line1: '全25マスク×12＋非露光80＝380工程', line2: 'RGB PD・P+蓋・VTG・SABを全網羅', accent: '#e11d48' },
        { label: '現在の累計進捗', line1: 'P1(60)＋P2(50)＋P3(380)＝490工程', line2: '一眼画質の8割を決める心臓部完了', accent: '#d97706' },
        { label: '次巻 第5巻プレビュー', line1: '画素ウェーハ配線工程 BEOL 210工程', line2: '5層銅配線とCu-Cu鏡面接合面へ！', accent: '#059669' },
      ],
    }),
};
