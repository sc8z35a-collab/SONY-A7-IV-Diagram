import { drawCompareFrame, drawKpiBox, drawPill, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group N (10 Frontier 2026 Parts: DB141–DB150):
 * Solid-State PiezoMEMS Air-Jet Curtain, Dynamic Self-Healing Vitrimer Seal Lip,
 * Sensirion SEN66 Laser PM/Spore Counter, NASA 5 MHz AT-Cut QCM Outgas Monitor,
 * 40 kHz Ultrasonic Leak & Predictive Bearing MEMS Mic, Bosch BMP585 + Optical O2 Anoxic Sensor,
 * UHF RAIN RFID Gen2X Smart-Shelf Inventory, Melexis MLX90640 IR Thermal Camera + 50% SoC Balancer,
 * Autonomous Microcapsule Potassium-Aerosol Fire Sheet, and CES 2026 Indoor OPV + TDK CeraCharge.
 */
export function renderDryboxGroupNSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_piezo_mems_airjet_curtain':
      return wrapDryboxHdSvg({
        badge: 'DB141',
        stepTag: 'PiezoMEMS 1,750 Pa',
        title: '羽根なし固体PiezoMEMS超音波エアジェット・ドア乾燥カーテン',
        analogy: 'プロペラ羽根ゼロ！厚さ2mmのシリコン膜が超音波振動で乾燥空気の幕を吹き下ろす2026年技術',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        body: `
          <!-- Left: Ultrasonic Solid-State Synthetic Jet Air Curtain at Open Door -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">2026年 圧電MEMS超音波合成ジェット（1,750 Pa）開扉エアーカーテン</text>
            <!-- Top PiezoMEMS Manifold Bar -->
            <rect x="92" y="34" width="240" height="36" rx="6" fill="url(#db141-copper)" stroke="#9a3412" stroke-width="1.6"/>
            <text x="212" y="51" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">PiezoMEMS 4基アレイ（&gt;24 kHz無音振動）</text>
            <text x="212" y="64" text-anchor="middle" font-size="7.6" font-weight="800" fill="#ffedd5">xMEMS XMC-2400 / AirJet Mini G2 級（1,750 Pa）</text>
            <!-- Vertical Laminar Dry Air Curtain Sheet -->
            <rect x="166" y="70" width="44" height="142" fill="#38bdf8" fill-opacity="0.22" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="4 3"/>
            <line x1="178" y1="74" x2="178" y2="206" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db141-arrBlue)"/>
            <line x1="198" y1="74" x2="198" y2="206" stroke="#0ea5e9" stroke-width="2.6" marker-end="url(#db141-arrBlue)"/>
            <!-- Left: Humid Room Air & Dust Deflected! -->
            <rect x="18" y="88" width="128" height="106" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4"/>
            <text x="82" y="110" text-anchor="middle" font-size="9.0" font-weight="900" fill="#9f1239">庫外の梅雨湿気</text>
            <text x="82" y="128" text-anchor="middle" font-size="8.4" font-weight="800" fill="#be123c">75% RH・浮遊埃</text>
            <path d="M 116 146 L 160 146 L 136 174" fill="none" stroke="#e11d48" stroke-width="2.6" marker-end="url(#db141-arrRed)"/>
            <text x="82" y="182" text-anchor="middle" font-size="8.0" font-weight="900" fill="#e11d48">流入 −45% 跳ね返し</text>
            <!-- Right: Protected 40% RH Dry Camera Chamber -->
            <rect x="228" y="88" width="178" height="106" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
            <text x="317" y="112" text-anchor="middle" font-size="9.4" font-weight="900" fill="#14532d">庫内 40% RH 保護域</text>
            <text x="317" y="134" text-anchor="middle" font-size="8.2" font-weight="800" fill="#15803d">開扉0.05秒で即時起動</text>
            <text x="317" y="154" text-anchor="middle" font-size="8.0" font-weight="700" fill="#166534">閉扉後の40%復帰時間を</text>
            <text x="317" y="172" text-anchor="middle" font-size="9.0" font-weight="900" fill="#059669">約 45% 大幅短縮！</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">回転軸受ゼロ・IP58防塵・可聴域外(&gt;24 kHz)で完全無音の未来エアカーテン</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '超薄型 固体発生背圧', '1,750 Pa', '0.5mmスリットから高速層流噴射', '#ea580c')}
            ${drawKpiBox(0, 88, 112, 74, '駆動周波数', '&gt; 24 kHz', '超音波域・無音', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, 'チップ厚', '1.1–2.6mm', '羽根・軸受完全0', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'DB31回転ファンとの棲み分け', '#9a3412', '#fff7ed')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#9a3412">• DB31磁気浮上：庫内全体の静粛循環</text>
            <text x="14" y="238" font-size="8.4" font-weight="900" fill="#c2410c">• DB141 Piezo：開扉時スリット高圧幕</text>
          </g>
        `,
        cards: [
          { label: '2026年固体空冷', line1: 'シリコン圧電MEMS超音波ジェット×4', line2: '厚さ2.65mm以下・回転部品ゼロIP58' },
          { label: '物理的メリット', line1: '1,750 Pa高背圧で極細ノズル噴射', line2: 'DB12開扉検知から0.05秒で瞬時展開' },
          { label: 'カメラを守る意味', line1: '出し入れ時の湿気・ホコリ雪崩れ阻止', line2: '閉扉後の40% RH復帰を45%高速化' },
        ],
      });

    case 'db_vitrimer_selfheal_seal_lip':
      return wrapDryboxHdSvg({
        badge: 'DB142',
        stepTag: '2026年 自己修復90%',
        title: '動的ジスルフィド／水素結合 自己修復ビトリマー気密補助リップ',
        analogy: '扉の挟み込みで付いたミクロの傷や潰れグセを、室温で分子同士が手をつなぎ直して自ら治すゴム',
        accent: '#0d9488',
        accentSoft: '#ccfbf1',
        body: `
          <!-- Left: 3-Stage Autonomous Room-Temperature Molecular Self-Healing Sequence -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">第4世代 動的共有結合（S–S＋水素結合）室温自己修復サイクル</text>
            <!-- Stage 1: Micro-Crack from Strap Pinch / Ozone -->
            <rect x="18" y="42" width="114" height="162" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5"/>
            <text x="75" y="62" text-anchor="middle" font-size="8.8" font-weight="900" fill="#9f1239">① 微細亀裂発生</text>
            <rect x="34" y="76" width="82" height="58" rx="6" fill="#0d9488"/>
            <!-- Jagged crack -->
            <polyline points="75,76 68,94 82,110 74,134" fill="none" stroke="#ffffff" stroke-width="3.6"/>
            <text x="75" y="156" text-anchor="middle" font-size="7.8" font-weight="800" fill="#be123c">金具挟み込みや</text>
            <text x="75" y="170" text-anchor="middle" font-size="7.8" font-weight="800" fill="#be123c">長期圧縮クラック</text>
            <text x="75" y="190" text-anchor="middle" font-size="7.6" font-weight="700" fill="#881337">通常ゴムは寿命</text>
            <line x1="132" y1="112" x2="154" y2="112" stroke="#0d9488" stroke-width="2.6" marker-end="url(#db142-arrGreen)"/>
            <!-- Stage 2: Dynamic Bond Exchange at Room Temp -->
            <rect x="158" y="42" width="114" height="162" rx="8" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.6"/>
            <text x="215" y="62" text-anchor="middle" font-size="8.8" font-weight="900" fill="#134e4a">② 室温動的再結合</text>
            <rect x="174" y="76" width="82" height="58" rx="6" fill="#0d9488"/>
            <line x1="196" y1="92" x2="234" y2="92" stroke="#fde047" stroke-width="2.6" stroke-dasharray="4 2"/>
            <line x1="196" y1="106" x2="234" y2="106" stroke="#a7f3d0" stroke-width="2.6" stroke-dasharray="4 2"/>
            <line x1="196" y1="120" x2="234" y2="120" stroke="#fde047" stroke-width="2.6" stroke-dasharray="4 2"/>
            <text x="215" y="156" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0f766e">–S–S– 交換反応</text>
            <text x="215" y="172" text-anchor="middle" font-size="7.8" font-weight="800" fill="#0d9488">＋ 階層水素結合</text>
            <text x="215" y="190" text-anchor="middle" font-size="7.6" font-weight="700" fill="#134e4a">加熱・薬品不要！</text>
            <line x1="272" y1="112" x2="294" y2="112" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db142-arrGreen)"/>
            <!-- Stage 3: >90% Healed Airtight Seal -->
            <rect x="298" y="42" width="108" height="162" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
            <text x="352" y="62" text-anchor="middle" font-size="8.8" font-weight="900" fill="#14532d">③ 気密完全復元</text>
            <rect x="312" y="76" width="80" height="58" rx="6" fill="#10b981"/>
            <text x="352" y="110" text-anchor="middle" font-size="10.0" font-weight="900" fill="#ffffff">復元 &gt;90%</text>
            <text x="352" y="156" text-anchor="middle" font-size="8.0" font-weight="900" fill="#15803d">圧縮永久歪み&lt;5%</text>
            <text x="352" y="173" text-anchor="middle" font-size="7.8" font-weight="700" fill="#166534">15年以上</text>
            <text x="352" y="190" text-anchor="middle" font-size="7.8" font-weight="700" fill="#166534">メンテナンスフリー</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">カプセル消費型と違い何度でも自律修復できる第4世代ビトリマー高分子</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '室温自律 修復強度率', '&gt; 90%', '動的ジスルフィド＋水素結合網', '#0d9488')}
            ${drawKpiBox(0, 88, 112, 74, '圧縮永久歪み', '&lt; 5%', '潰れグセ極小', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '気密寿命', '15 年+', '反復修復可能', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, 'DB04 / DB52 との三重シール', '#134e4a', '#f0fdfa')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#134e4a">• DB04磁石＋DB52副リップ＋DB142自己修復</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#0f766e">• DB132圧縮ラッチの面圧へ隙間なく追従</text>
          </g>
        `,
        cards: [
          { label: '2026年動的ポリマー', line1: '第4世代 ビトリマー自己修復ゴム', line2: '動的S–S共有結合＋多重水素結合' },
          { label: '物理的メリット', line1: '室温放置で微細亀裂を90%以上再結合', line2: '長期圧縮歪み5%未満で気密維持' },
          { label: 'カメラを守る意味', line1: 'ストラップ挟み傷からの湿気漏れ防止', line2: '15年超パッキン交換不要の長寿命' },
        ],
      });

    case 'db_sen66_laser_pm_spore_counter':
      return wrapDryboxHdSvg({
        badge: 'DB143',
        stepTag: '2026年 SEN66 レーザー',
        title: 'Sensirion SEN66（SPS6x）レーザー浮遊微粒子・カビ胞子カウンター',
        analogy: '扉を閉めたあと「今、庫内にホコリと胞子が何個浮いているか」をレーザーで1粒ずつ数える粒子計',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        body: `
          <!-- Left: Sheath-Flow Laser Mie Scattering Particle & Spore Counter -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">Sensirion SEN66（SPS6x MEMS）シース気流レーザー粒子計数メカニズム</text>
            <!-- Optical Scattering Chamber -->
            <rect x="22" y="40" width="246" height="168" rx="8" fill="#0f172a" stroke="#e11d48" stroke-width="1.6"/>
            <text x="145" y="59" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">シース気流レーザー散乱室（窓汚れ0）</text>
            <!-- Laser Diode (Left) firing beam horizontally -->
            <rect x="32" y="108" width="38" height="22" rx="3" fill="#e11d48"/>
            <text x="51" y="122" text-anchor="middle" font-size="7.4" font-weight="900" fill="#ffffff">LD</text>
            <line x1="70" y1="119" x2="254" y2="119" stroke="#f43f5e" stroke-width="2.6"/>
            <!-- Vertical Sheath-Flow Airflow carrying particles & spores -->
            <line x1="158" y1="68" x2="158" y2="196" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#db143-arrBlue)"/>
            <!-- Illuminated Fungal Spore (3um) scattering Mie light down to Photodiode -->
            <circle cx="158" cy="119" r="8" fill="#fde047" stroke="#ffffff" stroke-width="1.6"/>
            <line x1="158" y1="127" x2="158" y2="168" stroke="#fde047" stroke-width="2.2" marker-end="url(#db143-arrAmber)"/>
            <rect x="122" y="170" width="72" height="24" rx="4" fill="#0284c7"/>
            <text x="158" y="185" text-anchor="middle" font-size="7.8" font-weight="900" fill="#ffffff">ミー散乱PD</text>
            <text x="216" y="96" text-anchor="middle" font-size="7.6" font-weight="800" fill="#bae6fd">0.3〜10 μm</text>
            <text x="216" y="110" text-anchor="middle" font-size="7.6" font-weight="900" fill="#fde047">カビ胞子 2〜10μm</text>
            <!-- Right: Auto Cleanroom Recovery Control Loop -->
            <rect x="280" y="40" width="128" height="168" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="344" y="60" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0c4a6e">自動清浄ループ</text>
            <text x="290" y="84" font-size="8.0" font-weight="800" fill="#be123c">① 開扉で粒子急増</text>
            <text x="290" y="106" font-size="8.0" font-weight="800" fill="#0284c7">② DB31ファン自動</text>
            <text x="298" y="120" font-size="8.0" font-weight="800" fill="#0284c7">ブースト循環</text>
            <text x="290" y="144" font-size="8.0" font-weight="900" fill="#15803d">③ ISO Class 5達成</text>
            <text x="290" y="166" font-size="8.0" font-weight="800" fill="#475569">④ 無音12dBA復帰</text>
            <text x="290" y="192" font-size="7.6" font-weight="700" fill="#0369a1">＋CO₂ / NOx同時監視</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年10月最新SEN66：カメラセンサーの天敵ダスト＆胞子を数値で完全可視化</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'レーザー粒子 計測粒径', '0.3〜10 μm', 'PM1/2.5/4/10・胞子・CO₂・NOx', '#e11d48')}
            ${drawKpiBox(0, 88, 112, 74, '清浄目標', 'ISO Class 5', 'クリーンルーム級', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '窓防汚寿命', '10 年連続', 'シース気流保護', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜ粒子カウントが重要？', '#9f1239', '#fff1f2')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#9f1239">• イメージセンサーに付くゴミは1〜5μm</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#be123c">• HEPA清浄完了をE-Ink画面へ緑点灯</text>
          </g>
        `,
        cards: [
          { label: '2026年最新ノード', line1: 'Sensirion SEN66（SPS6xコア）', line2: 'シース気流ミー散乱レーザー粒子計' },
          { label: '物理的メリット', line1: '0.3〜10 μm微粒子・カビ胞子を実測', line2: '光学窓セルフクリーンで10年感度維持' },
          { label: 'カメラを守る意味', line1: '開扉後のホコリを一掃しセンサー保護', line2: 'レンズ交換前の清浄度を数値で確認' },
        ],
      });

    case 'db_qcm_5mhz_outgas_monitor':
      return wrapDryboxHdSvg({
        badge: 'DB144',
        stepTag: 'NASA級 5MHz QCM',
        title: '宇宙光学級 5 MHz ATカット水晶マイクロバランス（QCM）曇り監視計',
        analogy: '毎秒500万回震える水晶板へ10億分の1gの油分子が付くだけで見抜く宇宙望遠鏡の目',
        accent: '#eab308',
        accentSoft: '#fef9c3',
        body: `
          <!-- Left: 5 MHz AT-Cut Quartz Sauerbrey Mass-Shift Sensing Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">ATカット水晶振動子（5 MHz）ザウアーブライ式ナノグラム曇り検知原理</text>
            <!-- Left: Clean Crystal f0 = 5.000000 MHz -->
            <rect x="18" y="42" width="178" height="164" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="107" y="61" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0c4a6e">清浄時（付着 Δm = 0）</text>
            <ellipse cx="107" cy="112" rx="54" ry="20" fill="url(#db144-glass)" stroke="#0284c7" stroke-width="1.8"/>
            <ellipse cx="107" cy="112" rx="30" ry="11" fill="#facc15" stroke="#854d0e" stroke-width="1.4"/>
            <text x="107" y="152" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0284c7">f₀ = 5,000,000 Hz</text>
            <text x="107" y="170" text-anchor="middle" font-size="7.8" font-weight="700" fill="#0369a1">φ14mm・330μm水晶板</text>
            <text x="107" y="186" text-anchor="middle" font-size="7.8" font-weight="800" fill="#16a34a">光学曇りリスク = 0</text>
            <!-- Arrow -->
            <line x1="198" y1="118" x2="226" y2="118" stroke="#d97706" stroke-width="2.6" marker-end="url(#db144-arrAmber)"/>
            <!-- Right: Siloxane / Plasticizer CVCM Deposition -> Frequency Drops! -->
            <rect x="230" y="42" width="176" height="164" rx="8" fill="#fefce8" stroke="#d97706" stroke-width="1.6"/>
            <text x="318" y="61" text-anchor="middle" font-size="9.0" font-weight="900" fill="#92400e">CVCM油分子付着（ng級）</text>
            <ellipse cx="318" cy="112" rx="54" ry="20" fill="url(#db144-glass)" stroke="#d97706" stroke-width="1.8"/>
            <ellipse cx="318" cy="112" rx="30" ry="11" fill="#facc15" stroke="#854d0e" stroke-width="1.4"/>
            <!-- Tiny orange molecular film dots on surface -->
            <circle cx="302" cy="108" r="3" fill="#e11d48"/>
            <circle cx="318" cy="112" r="3" fill="#e11d48"/>
            <circle cx="332" cy="109" r="3" fill="#e11d48"/>
            <text x="318" y="150" text-anchor="middle" font-size="9.0" font-weight="900" fill="#be123c">Δf = −C_f・Δm</text>
            <text x="318" y="168" text-anchor="middle" font-size="8.0" font-weight="900" fill="#b45309">−1 Hz ≈ 17.7 ng/cm²</text>
            <text x="318" y="186" text-anchor="middle" font-size="7.8" font-weight="800" fill="#e11d48">曇る数ヶ月前に即警報！</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年4月AT-Cut QCM論文＆NASA ASTM E1559準拠・ベークアウト再生付</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '凝縮分子 質量検出感度', '17.7 ng/cm²', '単分子層の1/10・目視曇りの1/1000', '#d97706')}
            ${drawKpiBox(0, 88, 112, 74, '共振周波数', '5.0 MHz', 'ATカット水晶板', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '自己再生', '加熱ベーク', '反復長期監視可', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'DB11 VOCガス計との決定差', '#713f12', '#fefce8')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#713f12">• DB11：空気中ガス濃度(エタノール等)</text>
            <text x="14" y="238" font-size="8.4" font-weight="900" fill="#b45309">• DB144：実際に硝子へ付く油膜を直秤</text>
          </g>
        `,
        cards: [
          { label: '宇宙望遠鏡計器', line1: '5 MHz ATカット水晶＋白金蒸着電極', line2: '内蔵ベークアウトヒーター自己再生' },
          { label: '物理的メリット', line1: 'ザウアーブライ式で17.7 ng/cm²秤量', line2: 'シロキサン・可塑剤CVCMだけ高精度検知' },
          { label: 'カメラを守る意味', line1: '粗悪ケース持ち込み由来の曇り事前警報', line2: '高級レンズ前玉・内玉の白濁を根絶' },
        ],
      });

    case 'db_ultrasonic_40khz_leak_mems':
      return wrapDryboxHdSvg({
        badge: 'DB145',
        stepTag: '40 kHz 超音波聴診',
        title: '40 kHz 超音波気密リーク検知 ＆ 軸受予知保全MEMSマイク',
        analogy: '人間の耳に聞こえない「髪の毛1本の隙間から漏れる超音波のシュー音」を聞き分ける聴診器',
        accent: '#0ea5e9',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Dual-Band Spectrum Analysis (20Hz-2kHz Bearing FFT + 40kHz Leak Ultrasonic) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">超広帯域MEMS（20 Hz〜80 kHz）2帯域デジタル聴診スペクトル</text>
            <!-- Spectrum Graph Frame -->
            <rect x="24" y="38" width="376" height="148" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
            <!-- Band 1: 20Hz - 2kHz Bearing / Motor Predictive FFT (Left) -->
            <rect x="34" y="48" width="112" height="120" rx="4" fill="#064e3b" fill-opacity="0.55" stroke="#10b981"/>
            <text x="90" y="64" text-anchor="middle" font-size="8.0" font-weight="900" fill="#34d399">20 Hz〜2 kHz</text>
            <text x="90" y="77" text-anchor="middle" font-size="7.4" font-weight="700" fill="#a7f3d0">軸受・錠前予知FFT</text>
            <polyline points="42,156 54,150 64,120 74,154 88,136 98,156 116,144 136,156" fill="none" stroke="#34d399" stroke-width="2.4"/>
            <!-- Middle Band: Human Speech & Room Noise (REJECTED / ZERO RECORDING!) -->
            <rect x="152" y="48" width="106" height="120" rx="4" fill="#1e293b" stroke="#475569" stroke-dasharray="3 2"/>
            <text x="205" y="96" text-anchor="middle" font-size="8.0" font-weight="800" fill="#94a3b8">生活音・話し声帯</text>
            <text x="205" y="114" text-anchor="middle" font-size="8.4" font-weight="900" fill="#f87171">フィルタ完全破棄</text>
            <text x="205" y="132" text-anchor="middle" font-size="7.4" font-weight="700" fill="#cbd5e1">音声録音機能 0</text>
            <!-- Band 2: 40 kHz ± 2 kHz Ultrasonic Air-Leak Spike (Right) -->
            <rect x="264" y="48" width="126" height="120" rx="4" fill="#0c4a6e" fill-opacity="0.7" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="327" y="64" text-anchor="middle" font-size="8.4" font-weight="900" fill="#38bdf8">40 kHz ± 2 kHz</text>
            <text x="327" y="77" text-anchor="middle" font-size="7.4" font-weight="800" fill="#bae6fd">隙間乱流リーク検知</text>
            <polyline points="274,156 306,154 326,88 346,154 380,156" fill="none" stroke="#facc15" stroke-width="3.0"/>
            <text x="327" y="144" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fde047">⚡隙間挟み込み警報!</text>
            <!-- Bottom explanation -->
            <text x="212" y="208" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0f172a">扉閉鎖＋40 PaやN₂正圧時の「0.1 mm隙間乱流超音波」を指向性ホーンで捕捉</text>
            <text x="212" y="232" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0369a1">最小 0.05 L/min の微細漏れを聞き分け、パッキン挟み込みを即通知</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '超音波リーク 中心帯域', '40 ± 2 kHz', '生活騒音の影響ゼロ（ISO 50001手法）', '#0ea5e9')}
            ${drawKpiBox(0, 88, 112, 74, '予知保全帯', '20Hz–2kHz', '軸受摩耗を事前警告', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '音声録音', '機能ゼロ', '特徴量のみ抽出', '#7c3aed')}
            ${drawCompareFrame(0, 172, 234, 82, 'うっかりミスを音で自動救済', '#0c4a6e', '#f0f9ff')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#0c4a6e">• ストラップ紐のわずかな挟み込みを検知</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#0369a1">• ファンやモーター異常を故障数ヶ月前通知</text>
          </g>
        `,
        cards: [
          { label: '超音波聴診ポッド', line1: '20 Hz〜80 kHz 広帯域MEMSマイク', line2: '指向性アルミ音響ホーンを扉枠へ照準' },
          { label: '物理的メリット', line1: '40 kHz乱流音で0.1 mm隙間漏れ特定', line2: '20Hz–2kHz FFTで駆動部の寿命予知' },
          { label: 'カメラを守る意味', line1: '目視不能なパッキン挟み込みを即警報', line2: '音声録音ゼロで寝室プライバシー安心' },
        ],
      });

    case 'db_bmp585_optical_o2_anoxic':
      return wrapDryboxHdSvg({
        badge: 'DB146',
        stepTag: 'BMP585 + 光学O₂',
        title: 'Bosch BMP585（&lt;0.1 Pa）気圧計 ＋ 光学ルミネセンスO₂無酸素計',
        analogy: '消耗ゼロの赤い光スポットで「酸素0.5%未満の完全無酸素」を測り、0.1 Pa気圧で気密検査',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Dual Sensor Architecture (BMP585 Barometer + Luminescence Quenching O2) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">正圧気密テスト（BMP585）× 無消耗光学O₂消光（Stern-Volmer原理）</text>
            <!-- Top Panel: Optical Luminescence Quenching O2 -->
            <rect x="18" y="34" width="388" height="90" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="1.5"/>
            <text x="28" y="52" font-size="9.0" font-weight="900" fill="#9f1239">① 光学ルミネセンス消光 O₂センサー（無酸素 N₂パージ &lt; 0.5% O₂ 実証）</text>
            <rect x="34" y="64" width="76" height="46" rx="5" fill="#1e293b"/>
            <text x="72" y="84" text-anchor="middle" font-size="8.0" font-weight="900" fill="#38bdf8">励起LED</text>
            <text x="72" y="100" text-anchor="middle" font-size="7.6" font-weight="700" fill="#f87171">位相検出PD</text>
            <line x1="110" y1="80" x2="152" y2="80" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db146-arrBlue)"/>
            <line x1="152" y1="96" x2="110" y2="96" stroke="#e11d48" stroke-width="2.2" marker-end="url(#db146-arrRed)"/>
            <circle cx="174" cy="88" r="18" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.6"/>
            <text x="174" y="92" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">O₂膜</text>
            <text x="300" y="79" text-anchor="middle" font-size="8.6" font-weight="900" fill="#9f1239">τ₀ / τ = 1 + K_SV [O₂]</text>
            <text x="300" y="98" text-anchor="middle" font-size="7.8" font-weight="800" fill="#15803d">ガルバニ消耗ゼロ・10年長寿命！</text>
            <!-- Bottom Panel: Bosch BMP585 (<0.1 Pa RMS) Barometric Pressure -->
            <rect x="18" y="134" width="388" height="84" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="28" y="152" font-size="9.0" font-weight="900" fill="#0c4a6e">② Bosch BMP585（ノイズ &lt;0.1 Pa RMS・耐湿ゲル保護）</text>
            <rect x="34" y="164" width="166" height="42" rx="5" fill="#e0f2fe" stroke="#0284c7"/>
            <text x="117" y="182" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0369a1">N₂正圧 (+15〜+30 Pa)</text>
            <text x="117" y="198" text-anchor="middle" font-size="7.6" font-weight="700" fill="#0c4a6e">圧力減衰法で気密セルフ診断</text>
            <rect x="214" y="164" width="176" height="42" rx="5" fill="#dcfce7" stroke="#16a34a"/>
            <text x="302" y="182" text-anchor="middle" font-size="8.2" font-weight="900" fill="#14532d">大気圧リアルタイム標高補正</text>
            <text x="302" y="198" text-anchor="middle" font-size="7.6" font-weight="700" fill="#15803d">露点マージン計算誤差ゼロ</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">「窒素を入れたつもり」を卒業！真の無酸素＆正圧気密を科学証明</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'BMP585 気圧ノイズ床', '&lt; 0.1 Pa', '高度1 cm相当の超精密気密診断', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, '無酸素実証', '&lt; 0.5% O₂', '光学ルミネセンス', '#e11d48')}
            ${drawKpiBox(122, 88, 112, 74, 'O₂センサー寿命', '10 年+', '電解液消耗ゼロ', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '旧化学式O₂センサーとの差', '#0c4a6e', '#f0f9ff')}
            ${drawPill(12, 204, 210, '光学式：0% O₂乾燥窒素でも劣化0', true)}
            ${drawPill(12, 229, 210, '旧電池式：1年で乾燥枯渇・交換要', false)}
          </g>
        `,
        cards: [
          { label: '複合環境ノード', line1: 'Bosch BMP585（耐湿ゲル保護MEMS）', line2: 'ルミネセンス消光 光学O₂スポット' },
          { label: '物理的メリット', line1: '0.1 Pa分解能で正圧リークを自動検査', line2: '酸素を消費せず0〜21% O₂を10年監視' },
          { label: 'カメラを守る意味', line1: '美術館級の完全無酸素フィルム保存', line2: '真鍮鏡筒・銀ミラーの酸化を究極防止' },
        ],
      });

    case 'db_rain_rfid_gen2x_asset_shelf':
      return wrapDryboxHdSvg({
        badge: 'DB147',
        stepTag: '2026年 RAIN Gen2X',
        title: 'UHF RAIN RFID Gen2X スマート棚カメラ・レンズ自動在庫アレイ',
        analogy: '棚へ戻すだけで0.8秒以内に全100点一括スキャンし、持ち出し忘れをスマホ通知する頭脳棚',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        body: `
          <!-- Left: Faraday-Shielded Cabinet UHF Gen2X Smart Shelf Inventory Architecture -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">金属筐体ファラデー遮蔽 × 全3段 UHF Gen2X（860–960 MHz）自動棚卸し</text>
            <!-- Left: 3 Smart Shelves with Circularly Polarized Copper Patch Antennas -->
            <rect x="20" y="38" width="214" height="174" rx="8" fill="#1e293b" stroke="#ea580c" stroke-width="1.8"/>
            <text x="127" y="56" text-anchor="middle" font-size="8.4" font-weight="900" fill="#fdba74">SPCC金属筐体（外部電波漏れ 0！）</text>
            <!-- Shelf 1 -->
            <rect x="34" y="68" width="186" height="36" rx="4" fill="#334155"/>
            <rect x="44" y="94" width="166" height="6" fill="#ea580c"/>
            <text x="127" y="85" text-anchor="middle" font-size="8.0" font-weight="800" fill="#ffffff">上段：α7 IV ＋ 50mm GM ✅ 在庫</text>
            <!-- Shelf 2 -->
            <rect x="34" y="114" width="186" height="36" rx="4" fill="#334155"/>
            <rect x="44" y="140" width="166" height="6" fill="#ea580c"/>
            <text x="127" y="131" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fde047">中段：70-200mm GM 📤 撮影持出中</text>
            <!-- Shelf 3 -->
            <rect x="34" y="160" width="186" height="36" rx="4" fill="#334155"/>
            <rect x="44" y="186" width="166" height="6" fill="#ea580c"/>
            <text x="127" y="177" text-anchor="middle" font-size="8.0" font-weight="800" fill="#34d399">下段：CFexpress ＋ NP-FZ100 ✅</text>
            <!-- Right: Audit Flow linking Biometric User ID + Gear List -->
            <line x1="236" y1="126" x2="264" y2="126" stroke="#ea580c" stroke-width="2.6" marker-end="url(#db147-arrAmber)"/>
            <rect x="268" y="38" width="138" height="174" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
            <text x="337" y="59" text-anchor="middle" font-size="8.8" font-weight="900" fill="#9a3412">0.8秒自動監査台帳</text>
            <text x="278" y="84" font-size="8.0" font-weight="800" fill="#0f172a">• 誰が：DB06指紋ID</text>
            <text x="278" y="106" font-size="8.0" font-weight="800" fill="#c2410c">• 何を：全100点一括</text>
            <text x="278" y="128" font-size="8.0" font-weight="800" fill="#0284c7">• いつ：DB83 RTC記録</text>
            <text x="278" y="150" font-size="8.0" font-weight="900" fill="#15803d">• 読取率：99.9%</text>
            <rect x="278" y="168" width="118" height="32" rx="5" fill="#dcfce7" stroke="#16a34a"/>
            <text x="337" y="188" text-anchor="middle" font-size="7.8" font-weight="900" fill="#14532d">忘れ物・未返却即通知</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">0.3 mm無電池オンメタルタグをキャップ裏へ貼るだけ！商業スタジオ資産管理革命</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '閉扉後 一括スキャン時間', '0.8 秒', '最大100点・読取精度 99.9%', '#ea580c')}
            ${drawKpiBox(0, 88, 112, 74, 'RFID規格', 'RAIN Gen2X', '860–960 MHz UHF', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, 'レンズタグ厚', '0.3 mm', '無電池オンメタル', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'DB115(13.56MHz)との完全分離', '#9a3412', '#fff7ed')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#9a3412">• DB115(13.56MHz)：フィルター寿命専用</text>
            <text x="14" y="238" font-size="8.4" font-weight="900" fill="#c2410c">• DB147(UHF Gen2X)：機材在庫管理</text>
          </g>
        `,
        cards: [
          { label: '2026年スマート棚', line1: 'UHF RAIN RFID Gen2X 円偏波パッチ', line2: '金属筐体遮蔽で庫内限定99.9%読取' },
          { label: 'スタジオ運用価値', line1: 'DB06指紋ID×機材持出を完全自動紐付', line2: '撮影前の忘れ物＆スタジオ未返却を防止' },
          { label: 'カメラを守る意味', line1: '無電池0.3mm極薄シールで機材に無害', line2: 'E-Ink画面とスマホで現在庫を一目確認' },
        ],
      });

    case 'db_mlx90640_ir_thermal_battery':
      return wrapDryboxHdSvg({
        badge: 'DB148',
        stepTag: '768画素IR + 3.80V保存',
        title: 'MLX90640 32×24遠赤外線熱カメラ ＋ 50% SoC長期保存バランサー',
        analogy: '充電中の電池をサーモカメラで監視し、使わない電池は寿命3倍の50%(3.80V)へ自動維持するドクター',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        body: `
          <!-- Left: 32x24 Thermal Heatmap + 3.80V 50% SoC Storage-Life Curve -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">32×24 サーモ異常遮断（10°C ΔTルール）＆ 3.80 V自動長期保存バランス</text>
            <!-- Left Half: MLX90640 Overhead Thermal Map of 4 Charging NP-FZ100 Bays -->
            <rect x="18" y="38" width="194" height="172" rx="8" fill="#0f172a" stroke="#e11d48" stroke-width="1.6"/>
            <text x="115" y="56" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">MLX90640 768画素 監視画面</text>
            <!-- 4 Battery slots heatmap -->
            <rect x="30" y="68" width="76" height="44" rx="5" fill="#0284c7" stroke="#38bdf8"/>
            <text x="68" y="88" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">Bay 1: 31°C</text>
            <text x="68" y="102" text-anchor="middle" font-size="7.4" font-weight="700" fill="#bae6fd">正常充電</text>
            <rect x="120" y="68" width="78" height="44" rx="5" fill="#0284c7" stroke="#38bdf8"/>
            <text x="159" y="88" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">Bay 2: 32°C</text>
            <text x="159" y="102" text-anchor="middle" font-size="7.4" font-weight="700" fill="#bae6fd">正常充電</text>
            <rect x="30" y="122" width="76" height="44" rx="5" fill="#dc2626" stroke="#fde047" stroke-width="2.0"/>
            <text x="68" y="142" text-anchor="middle" font-size="8.2" font-weight="900" fill="#fde047">Bay 3: 44°C!</text>
            <text x="68" y="156" text-anchor="middle" font-size="7.4" font-weight="900" fill="#ffffff">ΔT&gt;10°C 即遮断</text>
            <rect x="120" y="122" width="78" height="44" rx="5" fill="#059669" stroke="#34d399"/>
            <text x="159" y="142" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">Bay 4: 24°C</text>
            <text x="159" y="156" text-anchor="middle" font-size="7.4" font-weight="700" fill="#a7f3d0">3.80V保存</text>
            <text x="115" y="192" text-anchor="middle" font-size="7.8" font-weight="800" fill="#fda4af">H₂噴出前に劣化セルを即分離</text>
            <!-- Right Half: 50% SoC (3.80V/cell) Storage Balancer Lifespan Gain -->
            <rect x="222" y="38" width="186" height="172" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.5"/>
            <text x="315" y="57" text-anchor="middle" font-size="8.8" font-weight="900" fill="#14532d">50% SoC (3.80 V) 自動保存</text>
            <text x="234" y="82" font-size="8.0" font-weight="900" fill="#15803d">3.80 V (50%) 保存</text>
            <rect x="234" y="88" width="156" height="14" rx="3" fill="#16a34a"/>
            <text x="312" y="98" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">3年後容量 92%（寿命約3倍）</text>
            <text x="234" y="122" font-size="8.0" font-weight="800" fill="#be123c">4.20 V (100%) 満充電放置</text>
            <rect x="234" y="128" width="84" height="14" rx="3" fill="#e11d48"/>
            <text x="328" y="138" font-size="7.6" font-weight="800" fill="#be123c">膨張・劣化大</text>
            <rect x="234" y="156" width="160" height="40" rx="6" fill="#ffffff" stroke="#0284c7"/>
            <text x="314" y="173" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0c4a6e">📅 明日撮影予約モード</text>
            <text x="314" y="189" text-anchor="middle" font-size="7.6" font-weight="700" fill="#0369a1">出発3h前に50%→100%自動仕上げ</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年1月安全充電指針準拠：非接触サーモ監視＋スマート保存電圧制御</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '非接触 遠赤外線アレイ', '32 × 24 画素', '全スロット毎秒マップ（ΔT&gt;10°C遮断）', '#e11d48')}
            ${drawKpiBox(0, 88, 112, 74, '最適保存電位', '3.80 V/cell', '50% SoC自動維持', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '電池寿命延伸', '約 3 倍', 'SEI劣化・膨張抑止', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, 'カメラ電池を守る賢い充電庫', '#881337', '#fff1f2')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#881337">• 劣化発熱セルだけを個別自動カット</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#be123c">• 普段は50%保存、撮影朝だけ100%満充電</text>
          </g>
        `,
        cards: [
          { label: '非接触熱画像監視', line1: 'Melexis MLX90640（768画素Far-IR）', line2: '隣接比＋10°C逸脱でポート個別遮断' },
          { label: '電池寿命ドクター', line1: '双方向 3.80 V/cell (50% SoC) 調圧', line2: '出発時刻連動の自動100%予約充電' },
          { label: 'カメラを守る意味', line1: '高価なNP-FZ100電池群の寿命を3倍化', line2: 'ガス噴出前の超早期サーモ熱暴走予防' },
        ],
      });

    case 'db_microcapsule_aerosol_firesheet':
      return wrapDryboxHdSvg({
        badge: 'DB149',
        stepTag: 'JP2025166028A / 0W',
        title: '熱応答マイクロカプセル・カリウムエアロゾル自律消火シート',
        analogy: '万一電池が発火しても電気ゼロ・10秒以内に極小カプセルが弾けて炎の連鎖を消す最終防壁',
        accent: '#dc2626',
        accentSoft: '#fee2e2',
        body: `
          <!-- Left: 5-Layer Battery Bay Safety Defense & Autonomous <10s Rupture Extinguishment -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">無電源自律消火メカニズム（120〜200°C カプセル破裂 → ラジカル消火）</text>
            <!-- Fireproof Battery Drawer Cross-Section -->
            <rect x="22" y="38" width="238" height="170" rx="8" fill="#1e293b" stroke="#dc2626" stroke-width="2.0"/>
            <!-- Ceiling Fire-Extinguishing Microcapsule Sheet -->
            <rect x="34" y="48" width="214" height="26" rx="4" fill="#dc2626" stroke="#fde047" stroke-width="1.6"/>
            <text x="141" y="64" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">マイクロカプセル消火シート (DB149)</text>
            <!-- Potassium Aerosol Cloud expanding downward -->
            <ellipse cx="141" cy="116" rx="88" ry="34" fill="#f8fafc" fill-opacity="0.86" stroke="#94a3b8" stroke-dasharray="4 2"/>
            <text x="141" y="108" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0f172a">カリウム塩凝縮エアロゾル放出</text>
            <text x="141" y="124" text-anchor="middle" font-size="8.2" font-weight="900" fill="#dc2626">K• + OH• → KOH（燃焼連鎖切断）</text>
            <text x="141" y="139" text-anchor="middle" font-size="7.6" font-weight="800" fill="#16a34a">10秒以内で鎮火・酸素欠乏ゼロ</text>
            <!-- Faulty Cell at Bottom -->
            <rect x="96" y="164" width="90" height="32" rx="4" fill="#475569" stroke="#f97316" stroke-width="1.5"/>
            <text x="141" y="184" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fde047">異常セル隔離鎮火</text>
            <!-- Right: 5-Layer Total Defense Stack -->
            <rect x="272" y="38" width="136" height="170" rx="8" fill="#fff1f2" stroke="#dc2626" stroke-width="1.5"/>
            <text x="340" y="57" text-anchor="middle" font-size="8.8" font-weight="900" fill="#991b1b">電池庫 5重防護網</text>
            <text x="282" y="80" font-size="7.8" font-weight="800" fill="#0284c7">1. DB148 熱カメラ事前遮断</text>
            <text x="282" y="102" font-size="7.8" font-weight="800" fill="#d97706">2. DB63 H₂/COガス早期検知</text>
            <text x="282" y="124" font-size="7.8" font-weight="800" fill="#475569">3. DB26 VDMA耐火鋼隔離</text>
            <text x="282" y="146" font-size="7.8" font-weight="800" fill="#0f766e">4. DB64 焼結炎止め逃がし</text>
            <text x="282" y="170" font-size="8.0" font-weight="900" fill="#dc2626">5. DB149 自律化学消火</text>
            <text x="340" y="194" text-anchor="middle" font-size="7.6" font-weight="800" fill="#15803d">上段カメラ室は完全無傷！</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">JP2025166028A釘刺し試験＆2026年CAFES総説実証・非導電クリーン薬剤</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '自律消火 所要時間', '&lt; 10 秒', '120〜200°C 熱応答・0 W無電源', '#dc2626')}
            ${drawKpiBox(0, 88, 112, 74, '消火効率', 'ハロン 3倍', 'PFAS・フロン0', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '電気絶縁', '非導電性', '二次ショートゼロ', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜLi-ion火災に有効？', '#7f1d1d', '#fef2f2')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#7f1d1d">• 自己酸素放出でもラジカル連鎖を直接断つ</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#991b1b">• 停電・制御故障後でも100%自律起動</text>
          </g>
        `,
        cards: [
          { label: '2025-26消火シート', line1: '数百万個の熱応答マイクロカプセル', line2: 'DB26耐火引き出し天井へ全面貼付' },
          { label: '化学消火メカニズム', line1: '120〜200°Cで自動破裂しKエアロゾル放出', line2: '10秒以内に燃焼ラジカル連鎖を断つ' },
          { label: 'カメラを守る意味', line1: '電源・配線不要の最終自律消火防壁', line2: '上段のカメラ・レンズ資産へ延焼ゼロ' },
        ],
      });

    case 'db_indoor_opv_ceracharge_harvest':
      return wrapDryboxHdSvg({
        badge: 'DB150',
        stepTag: 'CES 2026 OPV+全固体',
        title: 'CES 2026 室内光有機太陽電池（OPV）＋ TDK CeraCharge全固体電池',
        analogy: '部屋のLED明かりから発電し、燃えず漏れない全固体セラミック電池で時計と防犯を永続維持',
        accent: '#7e22ce',
        accentSoft: '#f3e8ff',
        body: `
          <!-- Left: Indoor LED -> LAYER V2.0 OPV -> TDK CeraCharge -> Perpetual Always-On Subsystems -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">無給電保管でも半永久稼働！室内光OPV発電 → 全固体セラミック蓄電フロー</text>
            <!-- Stage 1: Indoor LED Light + CES 2026 LAYER V2.0 OPV Strip -->
            <rect x="18" y="42" width="116" height="164" rx="8" fill="#faf5ff" stroke="#7e22ce" stroke-width="1.6"/>
            <text x="76" y="62" text-anchor="middle" font-size="8.8" font-weight="900" fill="#581c87">① 室内光OPV発電</text>
            <text x="76" y="80" text-anchor="middle" font-size="8.0" font-weight="800" fill="#eab308">💡 室内LED 200 lx</text>
            <rect x="30" y="92" width="92" height="44" rx="5" fill="#3b0764" stroke="#a855f7" stroke-width="1.5"/>
            <line x1="52" y1="92" x2="52" y2="136" stroke="#e2e8f0" stroke-width="1.4"/>
            <line x1="76" y1="92" x2="76" y2="136" stroke="#e2e8f0" stroke-width="1.4"/>
            <line x1="100" y1="92" x2="100" y2="136" stroke="#e2e8f0" stroke-width="1.4"/>
            <text x="76" y="156" text-anchor="middle" font-size="7.8" font-weight="900" fill="#6b21a8">LAYER V2.0 OPV</text>
            <text x="76" y="172" text-anchor="middle" font-size="7.6" font-weight="700" fill="#7e22ce">銀バスバー印刷</text>
            <text x="76" y="188" text-anchor="middle" font-size="7.8" font-weight="900" fill="#16a34a">室内効率 ＋30%</text>
            <line x1="134" y1="116" x2="156" y2="116" stroke="#7e22ce" stroke-width="2.6" marker-end="url(#db150-arrPurple)"/>
            <!-- Stage 2: TDK CeraCharge All-Ceramic Solid-State SMD Micro-Battery -->
            <rect x="160" y="42" width="114" height="164" rx="8" fill="#fefce8" stroke="#d97706" stroke-width="1.6"/>
            <text x="217" y="62" text-anchor="middle" font-size="8.8" font-weight="900" fill="#78350f">② 全固体セラミック</text>
            <rect x="180" y="88" width="74" height="44" rx="4" fill="#f3f0e8" stroke="#64748b" stroke-width="1.8"/>
            <rect x="176" y="88" width="10" height="44" fill="#cbd5e1"/>
            <rect x="248" y="88" width="10" height="44" fill="#cbd5e1"/>
            <text x="217" y="114" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0f172a">CeraCharge</text>
            <text x="217" y="152" text-anchor="middle" font-size="8.0" font-weight="900" fill="#b45309">1.5V / 100μAh</text>
            <text x="217" y="168" text-anchor="middle" font-size="7.6" font-weight="800" fill="#16a34a">電解液0・不燃無漏</text>
            <text x="217" y="186" text-anchor="middle" font-size="7.4" font-weight="700" fill="#78350f">CR2032ボタン電池廃止</text>
            <line x1="274" y1="116" x2="296" y2="116" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db150-arrGreen)"/>
            <!-- Stage 3: Perpetual Always-On Micro-Power Loads -->
            <rect x="300" y="42" width="108" height="164" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
            <text x="354" y="62" text-anchor="middle" font-size="8.8" font-weight="900" fill="#14532d">③ 永続維持負荷</text>
            <text x="309" y="88" font-size="7.8" font-weight="800" fill="#15803d">• DB08 E-Ink更新</text>
            <text x="309" y="110" font-size="7.8" font-weight="800" fill="#15803d">• DB83 TCXO時計</text>
            <text x="309" y="132" font-size="7.8" font-weight="800" fill="#15803d">• DB95 0.89μA地震</text>
            <text x="309" y="154" font-size="7.8" font-weight="800" fill="#15803d">• DB119 SE050網</text>
            <text x="354" y="186" text-anchor="middle" font-size="8.0" font-weight="900" fill="#065f46">コンセント抜でも稼働!</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">CES 2026 Dracula LAYER V2.0 × TDK全固体SMD電池で生涯電池交換ゼロ</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '室内LED 環境発電向上', '+30% 効率', 'CES 2026 LAYER V2.0 印刷OPV', '#7e22ce')}
            ${drawKpiBox(0, 88, 112, 74, '全固体電池', '液漏れ 0%', 'TDK CeraCharge', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '動作温度帯', '-20〜80°C', '1,000回充放電', '#d97706')}
            ${drawCompareFrame(0, 172, 234, 82, '使い捨てコイン電池からの卒業', '#581c87', '#faf5ff')}
            ${drawPill(12, 204, 210, 'OPV＋全固体：生涯交換不要＆安全', true)}
            ${drawPill(12, 229, 210, 'CR2032電池：数年で枯渇・液漏れ害', false)}
          </g>
        `,
        cards: [
          { label: 'CES 2026 環境発電', line1: 'LAYER V2.0級 室内LED最適OPV帯', line2: '上ベゼル一体美観・銀バスバー印刷' },
          { label: '日本発全固体電池', line1: 'TDK CeraCharge 積層セラミックSMD', line2: '電解液完全ゼロで発火・液漏れ皆無' },
          { label: 'カメラを守る意味', line1: '無給電長期保管中も時計・防犯を維持', line2: '使い捨て電池廃棄ゼロの150部品集大成' },
        ],
      });

    default:
      return null;
  }
}
