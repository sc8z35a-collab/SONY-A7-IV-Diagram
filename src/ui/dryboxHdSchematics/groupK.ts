import { drawCompareFrame, drawKpiBox, drawPill, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group K (10 Parts: DB111–DB120):
 * Laminated OFHC Copper TEC Thermal Strap, EU PFAS-Free Superhydrophobic Exhaust Duct,
 * Sensirion SDP33 Filter ΔP MEMS Sensor, Silicone Fan Pull-Pins & Helmholtz Liner,
 * 13.56 MHz Filter RFID Lifecycle Tag, Sensirion SFM4300 N2 Mass-Flow + 0.01μm Coalescer,
 * IEC 61643-11 3-Stage Lightning Surge (GDT+MOV+NTC), TI TPS3850 Hardware Window Watchdog IC,
 * NXP EdgeLock SE050 EAL6+ HSM, and LiFePO4 Sub-Zero Kapton Self-Heater Pad.
 */
export function renderDryboxGroupKSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_tec_thermal_expansion_strap':
      return wrapDryboxHdSvg({
        badge: 'DB111',
        stepTag: 'OFHC積層銅箔 / ΔCTE',
        title: '積層OFHC無酸素銅箔 CTE吸収フレキシブル熱膨張ストラップ',
        analogy: '金属とセラミックの伸び縮み差を柔らかい銅箔の橋で逃がし、ペルチェ素子を20年割らない宇宙技術',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        body: `
          <!-- Left: Rigid Clamp Cracking vs Laminated OFHC Copper Flexible Arch -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">アルミ放熱器とセラミックTEC間の熱膨張剪断（ΔCTE）吸収原理</text>
            <!-- Top Block: Ceramic TEC Hot Side (CTE = 7.2 ppm/K) -->
            <rect x="54" y="42" width="316" height="36" rx="6" fill="#f3f0e8" stroke="#64748b" stroke-width="1.5"/>
            <text x="212" y="64" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0f172a">ペルチェ Al₂O₃ セラミック面（CTE = 7.2 ppm/K）</text>
            <!-- Middle: 6-Layer Arched 50um OFHC Copper Lamellae -->
            <path d="M 102 78 C 122 104, 122 134, 102 160" fill="none" stroke="#ea580c" stroke-width="3.2"/>
            <path d="M 114 78 C 134 104, 134 134, 114 160" fill="none" stroke="#f97316" stroke-width="2.6"/>
            <path d="M 126 78 C 146 104, 146 134, 126 160" fill="none" stroke="#ea580c" stroke-width="2.6"/>
            <path d="M 298 78 C 278 104, 278 134, 298 160" fill="none" stroke="#ea580c" stroke-width="3.2"/>
            <path d="M 310 78 C 290 104, 290 134, 310 160" fill="none" stroke="#f97316" stroke-width="2.6"/>
            <path d="M 322 78 C 302 104, 302 134, 322 160" fill="none" stroke="#ea580c" stroke-width="2.6"/>
            <!-- Thermal Flow Arrow Down + XY Flex Arrows -->
            <line x1="212" y1="84" x2="212" y2="152" stroke="#dc2626" stroke-width="3.0" marker-end="url(#db111-arrRed)"/>
            <text x="212" y="114" text-anchor="middle" font-size="9.2" font-weight="900" fill="#9a3412">k = 398 W/m・K</text>
            <text x="212" y="130" text-anchor="middle" font-size="8.0" font-weight="800" fill="#c2410c">50μm OFHC箔×6層</text>
            <text x="212" y="144" text-anchor="middle" font-size="7.8" font-weight="700" fill="#16a34a">XY横ズレ剛性 1/80！</text>
            <!-- Bottom Block: Aluminum Heatsink (CTE = 23.1 ppm/K - 3x expansion!) -->
            <rect x="36" y="160" width="352" height="40" rx="6" fill="url(#db111-steel)" stroke="#475569" stroke-width="1.5"/>
            <text x="212" y="184" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0f172a">アルミヒートシンク DB40（CTE = 23.1 ppm/K：3倍伸縮！）</text>
            <!-- Expansion arrows left/right -->
            <line x1="88" y1="208" x2="46" y2="208" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db111-arrBlue)"/>
            <line x1="336" y1="208" x2="378" y2="208" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db111-arrBlue)"/>
            <text x="212" y="212" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0369a1">← 熱サイクル時の面内伸縮を銅箔アーチが吸収 →</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年TEC信頼性研究準拠：Bi₂Te₃はんだ接合部クラックを防ぎ寿命3倍化</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '剪断応力 低減率', '-82%', 'ΔCTE = 15.9 ppm/K を柔軟吸収', '#ea580c')}
            ${drawKpiBox(0, 88, 112, 74, 'OFHC熱伝導', '398 W/mK', '純度99.99%無酸素銅', '#dc2626')}
            ${drawKpiBox(122, 88, 112, 74, '総熱抵抗', '&lt;0.35 K/W', '高効率放熱を維持', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, '衛星クーラー技術の応用', '#9a3412', '#fff7ed')}
            ${drawPill(12, 204, 210, '積層銅箔橋：無応力で20年高寿命', true)}
            ${drawPill(12, 229, 210, '剛体直締：熱膨張差で素子割れ', false)}
          </g>
        `,
        cards: [
          { label: '宇宙機サーマル構造', line1: '50 μm OFHC無酸素銅箔×6層アーチ', line2: '両端銀めっき低接触抵抗クランプ' },
          { label: '物理的メリット', line1: '398 W/mKの高放熱とXY柔軟性を両立', line2: 'セラミック対アルミの剪断応力−82%' },
          { label: 'カメラを守る意味', line1: 'ペルチェ除湿ブロックの熱疲労寿命3倍', line2: '急激な季節温度変化でも故障ゼロ' },
        ],
      });

    case 'db_pfasfree_hydrophobic_duct':
      return wrapDryboxHdSvg({
        badge: 'DB112',
        stepTag: '2026年 PFASフリー',
        title: 'EU REACH準拠 PFASフリー超撥水オルガノシラン排気ダクト',
        analogy: '冬の冷たい排気筒でできた水滴を「ハスの葉のようにコロコロ外へ転がし落とす」脱フッ素ナノ膜',
        accent: '#0ea5e9',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: 10° Downward Sloped Duct with Superhydrophobic Cassie-Baxter Lotus Droplets -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">PFASフリー超撥水オルガノシラン内面（θ &gt; 145°）10°自然排水ダクト</text>
            <!-- Sloped Duct Cross-Section (Left = Cabinet Warm Vapor -> Right = Outdoor Drip Lip) -->
            <polygon points="48,68 334,116 334,174 48,126" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.0"/>
            <!-- Superhydrophobic Organosilane Nano-Liner (Top & Bottom inner wall) -->
            <line x1="48" y1="124" x2="334" y2="172" stroke="#0ea5e9" stroke-width="6.0"/>
            <!-- Rolling Spherical Water Droplets (Contact Angle > 145°) -->
            <circle cx="140" cy="128" r="9.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>
            <circle cx="222" cy="142" r="10.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>
            <circle cx="304" cy="156" r="11.0" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>
            <!-- Falling droplet off drip lip -->
            <circle cx="358" cy="196" r="8.5" fill="#0ea5e9"/>
            <line x1="336" y1="170" x2="356" y2="188" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db112-arrBlue)"/>
            <!-- Hot Vapor Arrow In -->
            <line x1="20" y1="96" x2="96" y2="108" stroke="#ef4444" stroke-width="2.6" marker-end="url(#db112-arrRed)"/>
            <text x="58" y="54" text-anchor="middle" font-size="8.6" font-weight="900" fill="#dc2626">105°C 再生蒸気</text>
            <!-- Magnified Lotus Contact Angle Inset -->
            <rect x="24" y="156" width="166" height="62" rx="7" fill="#ffffff" stroke="#0ea5e9" stroke-width="1.4"/>
            <text x="107" y="172" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0369a1">カシー・バクスター超撥水</text>
            <circle cx="64" cy="194" r="12" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
            <line x1="34" y1="206" x2="100" y2="206" stroke="#334155" stroke-width="2"/>
            <text x="142" y="193" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0c4a6e">θ &gt; 145°</text>
            <text x="142" y="208" text-anchor="middle" font-size="8.0" font-weight="800" fill="#16a34a">転落角 &lt; 8°</text>
            <!-- Slope angle callout -->
            <text x="278" y="88" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0284c7">10°外向き自然排水勾配</text>
            <text x="278" y="102" text-anchor="middle" font-size="7.8" font-weight="700" fill="#0369a1">（転落角8°より急 → 滞留水0）</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年欧州REACH PFAS規制適合：フッ素ゼロで冬季排気結露を完全排出</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'PFASフリー 水接触角', '&gt; 145°', 'ナノシリカ＋オルガノシラン膜', '#0ea5e9')}
            ${drawKpiBox(0, 88, 112, 74, '水滴転落角', '&lt; 8°', '10°傾斜で即滑落', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, 'フッ素含有', '0 ppm', 'EU REACH適合', '#7c3aed')}
            ${drawCompareFrame(0, 172, 234, 82, '寒冷地・冬期運転の優位性', '#0c4a6e', '#f0f9ff')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#0c4a6e">• 排気筒内の水膜滞留・逆流サビを根絶</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#0369a1">• 落ちた水滴はDB72セラミック蒸発器へ</text>
          </g>
        `,
        cards: [
          { label: '2026年環境ナノ膜', line1: '完全PFASフリー・オルガノシラン膜', line2: '階層ナノ凹凸によるロータス効果' },
          { label: '物理的メリット', line1: '水接触角145°超・転落角8°未満', line2: '10°勾配で冬季結露水滴を瞬時滑落' },
          { label: 'カメラを守る意味', line1: '寒冷地の排気口結露逆流をゼロ化', line2: 'フッ素ゼロで地球環境にも完全配慮' },
        ],
      });

    case 'db_filter_dp_mems_sensor':
      return wrapDryboxHdSvg({
        badge: 'DB113',
        stepTag: 'SDP33 / ±0.1 Pa',
        title: 'デジタルMEMS差圧センサー（Sensirion SDP33）HEPA実測診断',
        analogy: 'フィルターの前後をチューブで繋ぎ「風の通りにくさ」を0.1 Pa単位で測る科学的な肺活量計',
        accent: '#06b6d4',
        accentSoft: '#cffafe',
        body: `
          <!-- Left: Dual Pitot Tap ΔP = P1 - P2 Diagnostic Schematic -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">HEPA H13前後 差圧 ΔP = P₁ − P₂ リアルタイム実測診断図</text>
            <!-- Air Flow Duct with HEPA H13 Filter DB30 in middle -->
            <rect x="26" y="42" width="372" height="72" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
            <rect x="184" y="46" width="54" height="64" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="1.6"/>
            <text x="211" y="74" text-anchor="middle" font-size="8.6" font-weight="900" fill="#0f172a">HEPA</text>
            <text x="211" y="90" text-anchor="middle" font-size="8.0" font-weight="800" fill="#0284c7">DB30</text>
            <!-- Airflow arrows -->
            <line x1="42" y1="78" x2="108" y2="78" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db113-arrBlue)"/>
            <line x1="254" y1="78" x2="368" y2="78" stroke="#06b6d4" stroke-width="2.6" marker-end="url(#db113-arrBlue)"/>
            <text x="142" y="66" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0369a1">上流圧 P₁</text>
            <text x="286" y="66" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0e7490">下流圧 P₂</text>
            <!-- Pitot Sampling Tubes down to Sensirion SDP33 -->
            <polyline points="142,114 142,158 176,158" fill="none" stroke="#0284c7" stroke-width="2.6"/>
            <polyline points="286,114 286,158 248,158" fill="none" stroke="#06b6d4" stroke-width="2.6"/>
            <!-- SDP33 CMOSens Chip -->
            <rect x="176" y="136" width="72" height="46" rx="7" fill="#0f172a" stroke="#06b6d4" stroke-width="1.8"/>
            <text x="212" y="156" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">SDP33</text>
            <text x="212" y="172" text-anchor="middle" font-size="7.8" font-weight="800" fill="#22d3ee">ΔP 0.1 Pa</text>
            <!-- Diagnostic Threshold Bar -->
            <rect x="26" y="196" width="90" height="24" rx="5" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="71" y="212" text-anchor="middle" font-size="8.0" font-weight="900" fill="#9f1239">&lt;4 Pa：外れ漏れ</text>
            <rect x="126" y="196" width="142" height="24" rx="5" fill="#dcfce7" stroke="#16a34a"/>
            <text x="197" y="212" text-anchor="middle" font-size="8.0" font-weight="900" fill="#14532d">18〜54 Pa：正常（自動風量補償）</text>
            <rect x="278" y="196" width="120" height="24" rx="5" fill="#fef3c7" stroke="#d97706"/>
            <text x="338" y="212" text-anchor="middle" font-size="8.0" font-weight="900" fill="#92400e">≧55 Pa：交換通知</text>
            <text x="212" y="240" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">タイマー任せを卒業！実測ΔPで「無駄な交換」も「目詰まり放置」もゼロ</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'CMOSens® 差圧分解能', '±0.1 Pa', '±1,500 Pa 広レンジ・ドリフト0', '#06b6d4')}
            ${drawKpiBox(0, 88, 112, 74, '新品基準圧損', '約 18 Pa', 'HEPA H13 定格', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '交換警報値', '55 Pa', 'PWM自動風量補正', '#d97706')}
            ${drawCompareFrame(0, 172, 234, 82, 'クリーンルームFFU同等の診断', '#0e7490', '#ecfeff')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#0e7490">• 装着忘れのバイパス漏れ(&lt;4 Pa)も検知</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#155e75">• DB115 RFIDと連携し物理＋化学監視</text>
          </g>
        `,
        cards: [
          { label: '搭載MEMS', line1: 'Sensirion SDP33 熱式差圧計', line2: '前後ピトー管でΔP=P₁−P₂を直測' },
          { label: '物理的メリット', line1: '経年ゼロ点ドリフトほぼゼロの高精度', line2: '目詰まり進行に応じファン風量自動補正' },
          { label: 'カメラを守る意味', line1: 'フィルター未装着・隙間漏れを即発見', line2: '庫内ISOクリーン循環を常時キープ' },
        ],
      });

    case 'db_fan_silicone_grommets':
      return wrapDryboxHdSvg({
        badge: 'DB114',
        stepTag: 'Shore A40 / MPP吸音',
        title: 'シリコーン防振プルピン ＋ マイクロ穿孔ヘルムホルツ吸音筒',
        analogy: '鉄ネジを柔らかいゴム釘へ替え、無発塵の音の迷路で羽根の風切り音を12 dBA未満へ消す静寂技術',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Dual Acoustic Defense (Structure-Borne Pin + Air-Borne MPP Helmholtz) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">固体振動遮断（シリコーン宙吊り）＋ 気中騒音吸収（無発塵MPP共鳴）</text>
            <!-- Top Panel: Silicone Dumbbell Pull-Pin Isolation -->
            <rect x="16" y="34" width="392" height="86" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.4"/>
            <text x="26" y="52" font-size="9.2" font-weight="900" fill="#0c4a6e">① 固体振動の遮断：金属ネジ廃止 → Shore A 40 シリコーン防振プルピン</text>
            <rect x="34" y="64" width="76" height="44" rx="5" fill="#1e293b"/>
            <text x="72" y="90" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">ファン DB31</text>
            <!-- Dumbbell silicone pull-pin -->
            <rect x="110" y="79" width="54" height="14" rx="4" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.3"/>
            <circle cx="116" cy="86" r="10" fill="#0ea5e9" stroke="#0369a1"/>
            <circle cx="158" cy="86" r="10" fill="#0ea5e9" stroke="#0369a1"/>
            <rect x="164" y="64" width="76" height="44" rx="5" fill="url(#db114-steel)" stroke="#475569"/>
            <text x="202" y="90" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f172a">SPCC筐体</text>
            <text x="326" y="80" text-anchor="middle" font-size="9.0" font-weight="900" fill="#16a34a">共振伝達 −22 dB</text>
            <text x="326" y="98" text-anchor="middle" font-size="8.0" font-weight="700" fill="#15803d">固有振動数 f₀ ≈ 18 Hz</text>
            <!-- Bottom Panel: Micro-Perforated Panel (MPP) Helmholtz Cavity -->
            <rect x="16" y="130" width="392" height="92" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.4"/>
            <text x="26" y="148" font-size="9.2" font-weight="900" fill="#065f46">② 気中風切り音吸収：無発塵マイクロ穿孔（MPP）ヘルムホルツ共鳴層</text>
            <!-- MPP holes + backing air cavity -->
            <rect x="34" y="160" width="186" height="10" fill="#334155"/>
            <rect x="52" y="160" width="6" height="10" fill="#ecfdf5"/>
            <rect x="82" y="160" width="6" height="10" fill="#ecfdf5"/>
            <rect x="112" y="160" width="6" height="10" fill="#ecfdf5"/>
            <rect x="142" y="160" width="6" height="10" fill="#ecfdf5"/>
            <rect x="172" y="160" width="6" height="10" fill="#ecfdf5"/>
            <rect x="198" y="160" width="6" height="10" fill="#ecfdf5"/>
            <rect x="34" y="170" width="186" height="38" fill="#ffffff" stroke="#059669" stroke-width="1.2"/>
            <text x="127" y="193" text-anchor="middle" font-size="8.4" font-weight="800" fill="#047857">背後空気共鳴層 6 mm（孔径 0.5 mm）</text>
            <text x="314" y="178" text-anchor="middle" font-size="9.0" font-weight="900" fill="#059669">2〜4 kHz 羽根音消滅</text>
            <text x="314" y="196" text-anchor="middle" font-size="8.0" font-weight="700" fill="#047857">グラスウール繊維粉 0！</text>
            <text x="212" y="240" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">センサーを汚すスポンジ・繊維吸音材を使わず、寝室設置できる12 dBA未満達成</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '総合ファン動作騒音', '&lt; 12 dBA', '固体振動−22dB＋MPP吸音', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, 'プルピン硬度', 'Shore A40', '超軟質シリコーン', '#0ea5e9')}
            ${drawKpiBox(122, 88, 112, 74, '繊維発塵', '完全 0', '無繊維アルミMPP', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '光学機器向け吸音の条件', '#065f46', '#ecfdf5')}
            ${drawPill(12, 204, 210, 'MPPヘルムホルツ：無発塵＆長寿命', true)}
            ${drawPill(12, 229, 210, '吸音スポンジ：経年粉化でセンサー汚染', false)}
          </g>
        `,
        cards: [
          { label: '二段防音設計', line1: 'Shore A 40 シリコーン宙吊りピン×4', line2: 'φ0.5mm微細孔 ヘルムホルツ吸音筒' },
          { label: '物理的メリット', line1: '鋼板への構造共振伝達を−22 dB遮断', line2: '2〜4 kHzの耳障りな風切り音を熱変換' },
          { label: 'カメラを守る意味', line1: '吸音材の粉化ダスト汚染を完全ゼロ化', line2: '寝室・録音室に置ける究極の静けさ' },
        ],
      });

    case 'db_filter_rfid_lifecycle_tag':
      return wrapDryboxHdSvg({
        badge: 'DB115',
        stepTag: '13.56 MHz RFID',
        title: 'フィルター装着インターロックRFIDタグ ＆ 累積VOC寿命リーダー',
        analogy: '目に見えない活性炭のガス吸着満タン度を電子タグへ自動記録し、半挿し隙間も防ぐカルテ',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Dual Monitoring (RFID Cumulative VOC + Mechanical Plunger Seating) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">ISO 15693 非接触RFIDカルテ書込 ＋ 物理着座インターロック機構</text>
            <!-- Filter Side (Left) -->
            <rect x="22" y="46" width="144" height="164" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>
            <text x="94" y="68" text-anchor="middle" font-size="9.4" font-weight="900" fill="#78350f">活性炭/HEPA側 DB30</text>
            <!-- Etched Copper Spiral RFID Coil -->
            <rect x="44" y="82" width="100" height="64" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
            <rect x="54" y="92" width="80" height="44" rx="4" fill="none" stroke="#ea580c" stroke-width="1.8"/>
            <rect x="64" y="102" width="60" height="24" rx="2" fill="none" stroke="#ea580c" stroke-width="1.6"/>
            <rect x="86" y="108" width="16" height="12" rx="2" fill="#0f172a"/>
            <text x="94" y="164" text-anchor="middle" font-size="8.2" font-weight="900" fill="#92400e">13.56 MHz 無電池タグ</text>
            <text x="94" y="179" text-anchor="middle" font-size="7.6" font-weight="700" fill="#b45309">2 kbit 書き換えEEPROM</text>
            <text x="94" y="194" text-anchor="middle" font-size="7.6" font-weight="700" fill="#b45309">外して清掃しても履歴保持</text>
            <!-- RF Waves + Mechanical Plunger in Middle -->
            <line x1="168" y1="112" x2="234" y2="112" stroke="#d97706" stroke-width="2.6" stroke-dasharray="4 3" marker-end="url(#db115-arrAmber)"/>
            <text x="201" y="100" text-anchor="middle" font-size="8.0" font-weight="900" fill="#b45309">13.56 MHz</text>
            <!-- Mechanical Seating Plunger -->
            <rect x="166" y="166" width="70" height="16" rx="4" fill="#e11d48" stroke="#9f1239"/>
            <text x="201" y="198" text-anchor="middle" font-size="8.0" font-weight="900" fill="#be123c">物理着座SW</text>
            <!-- Cabinet Reader Side (Right) -->
            <rect x="238" y="46" width="166" height="164" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
            <text x="321" y="68" text-anchor="middle" font-size="9.4" font-weight="900" fill="#065f46">筐体側リーダー基板</text>
            <rect x="256" y="84" width="130" height="54" rx="6" fill="#065f46"/>
            <text x="321" y="106" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">SGP41 VOC積算連動</text>
            <text x="321" y="124" text-anchor="middle" font-size="7.8" font-weight="700" fill="#a7f3d0">∫ VOC(t)・Q_air(t) dt</text>
            <text x="321" y="158" text-anchor="middle" font-size="8.2" font-weight="800" fill="#047857">• 純正認証 ＆ 残寿命%算出</text>
            <text x="321" y="176" text-anchor="middle" font-size="8.2" font-weight="800" fill="#be123c">• 半挿しバイパス即時警告</text>
            <text x="321" y="194" text-anchor="middle" font-size="8.0" font-weight="700" fill="#065f46">• Matterアプリへ交換通知</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">DB113（HEPA物理目詰まり）＋ DB115（活性炭化学寿命）の二刀流完全診断</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '非接触RFID 動作周波数', '13.56 MHz', 'ISO 15693・2 kbit 不揮発記録', '#d97706')}
            ${drawKpiBox(0, 88, 112, 74, 'タグ電源', '無電池', 'カプトン耐熱基材', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '半挿し検知', '物理SW', 'バイパス漏れ0', '#e11d48')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜ差圧だけでは不十分？', '#78350f', '#fffbeb')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#78350f">• 活性炭のガス飽和は風圧に表れない</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#92400e">• VOC指数積算書込で化学寿命を正確に把握</text>
          </g>
        `,
        cards: [
          { label: 'スマートタグ機能', line1: '13.56 MHz 無電池EEPROMタグ', line2: 'SGP41連動の累積VOC吸着量を記録' },
          { label: '物理インターロック', line1: 'ばね式着座確認プランジャー内蔵', line2: 'フィルター浮き・未装着の隙間を防止' },
          { label: 'カメラを守る意味', line1: '活性炭満タン放置によるVOC逆放出0', line2: '清掃脱着しても正しい残寿命を維持' },
        ],
      });

    case 'db_n2_mems_massflow_filter':
      return wrapDryboxHdSvg({
        badge: 'DB116',
        stepTag: '0.01μm + SFM4300',
        title: 'N₂熱式MEMS質量流量計 ＋ 0.01 μm硼珪酸オイルミスト凝集器',
        analogy: '窒素配管の目に見えない油霧を99.999%濾し取り、消費リットル数も正確計測する清浄関所',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Two-Stage N2 Inline Purification + Mass-Flow Telemetry -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">光学グレード清浄N₂ライン：0.01 μm凝集濾過 → SFM4300流量積算</text>
            <!-- Raw N2 Cylinder Input -->
            <rect x="18" y="64" width="76" height="72" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4"/>
            <text x="56" y="88" text-anchor="middle" font-size="8.8" font-weight="900" fill="#9f1239">供給 N₂</text>
            <text x="56" y="106" text-anchor="middle" font-size="7.8" font-weight="700" fill="#be123c">配管サビ・</text>
            <text x="56" y="120" text-anchor="middle" font-size="7.8" font-weight="700" fill="#be123c">微量油霧混入</text>
            <line x1="94" y1="100" x2="126" y2="100" stroke="#e11d48" stroke-width="2.6" marker-end="url(#db116-arrRed)"/>
            <!-- Stage 1: 0.01 um Borosilicate Microfiber Coalescing Filter -->
            <rect x="130" y="44" width="110" height="148" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
            <text x="185" y="64" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0c4a6e">0.01 μm 凝集器</text>
            <rect x="150" y="76" width="70" height="76" rx="5" fill="#ffffff" stroke="#0ea5e9" stroke-width="1.4"/>
            <text x="185" y="102" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0369a1">硼珪酸繊維</text>
            <text x="185" y="118" text-anchor="middle" font-size="8.2" font-weight="900" fill="#16a34a">99.999%</text>
            <text x="185" y="134" text-anchor="middle" font-size="7.4" font-weight="700" fill="#475569">油霧凝集分離</text>
            <rect x="168" y="160" width="34" height="22" rx="4" fill="#d4a137"/>
            <text x="185" y="175" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">油ドレン</text>
            <line x1="240" y1="100" x2="272" y2="100" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db116-arrBlue)"/>
            <!-- Stage 2: Sensirion SFM4300 Thermal MEMS Mass-Flow Sensor -->
            <rect x="276" y="54" width="130" height="128" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8"/>
            <text x="341" y="78" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">SFM4300</text>
            <text x="341" y="96" text-anchor="middle" font-size="8.2" font-weight="800" fill="#38bdf8">熱式MEMS流量計</text>
            <text x="341" y="116" text-anchor="middle" font-size="9.4" font-weight="900" fill="#34d399">0〜20 slm</text>
            <text x="341" y="136" text-anchor="middle" font-size="7.8" font-weight="700" fill="#cbd5e1">温度・圧力自動補正</text>
            <text x="341" y="154" text-anchor="middle" font-size="7.8" font-weight="700" fill="#fde047">→ DB77 電磁弁へ最適制御</text>
            <text x="341" y="170" text-anchor="middle" font-size="7.6" font-weight="700" fill="#94a3b8">N₂ガス消費 −35%節約</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">ISO 8573-1 Class 1（残留油分 &lt;0.003 mg/m³）でレンズ前玉の油膜汚れを根絶</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '油霧・微粒子 捕集効率', '99.999%', '0.01 μm 硼珪酸コアレッサー', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, '残留油分', '&lt;0.003mg', 'ISO Class 1 光学級', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, 'N₂流量計測', '0〜20 slm', 'SFM4300 I²C出力', '#38bdf8')}
            ${drawCompareFrame(0, 172, 234, 82, '省ガス＆ボンベ残量管理', '#0c4a6e', '#f0f9ff')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#0c4a6e">• 積算リットル実測でN₂消費を35%削減</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#0369a1">• ボンベ残量予測＆配管リーク自動警報</text>
          </g>
        `,
        cards: [
          { label: '0.01 μm清浄化', line1: '硼珪酸マイクロ繊維コアレッサー', line2: 'ISO 8573-1 Class 1 光学清浄N₂' },
          { label: '2026年MEMS計測', line1: 'Sensirion SFM4300 熱式質量流量', line2: '温度・大気圧補正済の標準slm直読' },
          { label: 'カメラを守る意味', line1: '配管油霧によるレンズ前玉曇りゼロ', line2: '最小窒素量でパージ完了しコスト削減' },
        ],
      });

    case 'db_lightning_gdt_mov_ntc':
      return wrapDryboxHdSvg({
        badge: 'DB117',
        stepTag: 'IEC 61643-11 / 10kA',
        title: '3段雷サージ防護モジュール（10 kA GDT ＋ 熱ヒューズMOV ＋ NTC）',
        analogy: 'ゲリラ豪雨の落雷でコンセントから飛び込む1万アンペアの稲妻を3段の防波堤で撃退',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: 3-Stage Cascade AC Lightning Protection Circuit -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">IEC 61643-11 Class III 一次側AC 3段カスケード雷サージ協調保護</text>
            <!-- AC Lightning Input (Left) -->
            <rect x="16" y="64" width="68" height="80" rx="7" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
            <text x="50" y="88" text-anchor="middle" font-size="8.6" font-weight="900" fill="#9f1239">AC入力</text>
            <text x="50" y="108" text-anchor="middle" font-size="10.4" font-weight="900" fill="#e11d48">⚡10 kA</text>
            <text x="50" y="126" text-anchor="middle" font-size="7.4" font-weight="700" fill="#be123c">8/20 μs波</text>
            <!-- Main Power Line -->
            <line x1="84" y1="90" x2="342" y2="90" stroke="#0f172a" stroke-width="3.0"/>
            <!-- Stage 1: Ceramic GDT (10 kA shunt to PE) -->
            <rect x="100" y="68" width="68" height="44" rx="6" fill="#f3f0e8" stroke="#b45309" stroke-width="1.8"/>
            <text x="134" y="88" text-anchor="middle" font-size="8.8" font-weight="900" fill="#78350f">① GDT</text>
            <text x="134" y="103" text-anchor="middle" font-size="7.4" font-weight="800" fill="#b45309">10 kA放電管</text>
            <line x1="134" y1="112" x2="134" y2="178" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db117-arrGreen)"/>
            <!-- Stage 2: Thermally-Fused ZnO TMOV (<25 ns clamp + anti-fire disconnect) -->
            <rect x="184" y="68" width="76" height="44" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
            <text x="222" y="88" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0c4a6e">② TMOV</text>
            <text x="222" y="103" text-anchor="middle" font-size="7.4" font-weight="800" fill="#0369a1">&lt;25ns+熱切離</text>
            <line x1="222" y1="112" x2="222" y2="178" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db117-arrGreen)"/>
            <!-- Stage 3: NTC Inrush Limiter -->
            <rect x="274" y="68" width="60" height="44" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.6"/>
            <text x="304" y="88" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">③ NTC</text>
            <text x="304" y="103" text-anchor="middle" font-size="7.4" font-weight="800" fill="#fde047">突入緩和</text>
            <!-- Protected GaN PSU (Right) -->
            <rect x="344" y="64" width="66" height="80" rx="7" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
            <text x="377" y="90" text-anchor="middle" font-size="8.6" font-weight="900" fill="#14532d">GaN電源</text>
            <text x="377" y="108" text-anchor="middle" font-size="8.2" font-weight="900" fill="#15803d">DB41保護</text>
            <text x="377" y="126" text-anchor="middle" font-size="7.6" font-weight="800" fill="#166534">U_p&lt;1.2kV</text>
            <!-- Earth Bus Bar at Bottom -->
            <rect x="102" y="182" width="154" height="24" rx="5" fill="#dcfce7" stroke="#16a34a"/>
            <text x="179" y="198" text-anchor="middle" font-size="8.6" font-weight="900" fill="#14532d">⏚ 保護アース(PE)へ安全逃がし</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">MOV劣化時の発火を防ぐ一体型温度ヒューズ内蔵（24時間常時通電でも安心）</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '最大雷サージ耐量', '10 kA', '8/20 μs波（IEC 61643-11 III）', '#d97706')}
            ${drawKpiBox(0, 88, 112, 74, '制限電圧 U_p', '&lt; 1.2 kV', 'GaN耐圧以下へ抑制', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, 'TMOV安全', '熱切離内蔵', '劣化発煙ゼロ', '#e11d48')}
            ${drawCompareFrame(0, 172, 234, 82, 'DB80 TVS保護との役割分担', '#78350f', '#fffbeb')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#78350f">• DB117：一次AC電源線の誘導雷 10 kA</text>
            <text x="14" y="238" font-size="8.6" font-weight="800" fill="#0284c7">• DB80 ：二次低圧回路の人体静電気</text>
          </g>
        `,
        cards: [
          { label: '3段カスケード保護', line1: '10 kAセラミックGDT＋熱ヒューズMOV', line2: 'NTC突入電流制限＋速断ヒューズ' },
          { label: '物理的メリット', line1: '25 ns未満で残留電圧1.2 kV未満クランプ', line2: 'バリスタ経年劣化時の発煙・火災を封止' },
          { label: 'カメラを守る意味', line1: '夏の落雷でも充電中バッテリーを保護', line2: '常時コンセント接続の24時間安心稼働' },
        ],
      });

    case 'db_hardware_watchdog_ic':
      return wrapDryboxHdSvg({
        badge: 'DB118',
        stepTag: 'TI TPS3850 / IEC60730',
        title: '独立電圧監視＆ハードウェア・ウィンドウ・ウォッチドッグIC',
        analogy: '頭脳マイコンがフリーズしても1.6秒で気づき、ヒーター即遮断＆自動再起動する独立お目付け役',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        body: `
          <!-- Left: Window Watchdog Timing Diagram & Hardware Gate-Kill Interlock -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">TI TPS3850 ウィンドウ監視タイミング ＆ ヒーター強制遮断回路</text>
            <!-- Top Panel: Window Timing Chart (Too Early / Valid Window / Too Late) -->
            <rect x="18" y="34" width="388" height="86" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
            <text x="212" y="51" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0f172a">マイコン鼓動パルス(WDI)の許容ウィンドウ（早すぎ・遅すぎ両方異常！）</text>
            <!-- Timeline bars -->
            <rect x="34" y="64" width="90" height="32" rx="4" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="79" y="79" text-anchor="middle" font-size="8.0" font-weight="900" fill="#9f1239">0〜0.2 s 暴走</text>
            <text x="79" y="91" text-anchor="middle" font-size="7.4" font-weight="700" fill="#be123c">早すぎ → RESET</text>
            <rect x="130" y="64" width="164" height="32" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.8"/>
            <text x="212" y="79" text-anchor="middle" font-size="8.8" font-weight="900" fill="#14532d">正常ウィンドウ 0.2〜1.6 s</text>
            <text x="212" y="91" text-anchor="middle" font-size="7.6" font-weight="700" fill="#15803d">▲ 正常鼓動パルス OK</text>
            <rect x="300" y="64" width="92" height="32" rx="4" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="346" y="79" text-anchor="middle" font-size="8.0" font-weight="900" fill="#9f1239">&gt;1.6 s フリーズ</text>
            <text x="346" y="91" text-anchor="middle" font-size="7.4" font-weight="700" fill="#be123c">無応答 → RESET</text>
            <!-- Bottom Panel: Independent Hardware Gate-Kill Circuit -->
            <rect x="18" y="132" width="114" height="82" rx="8" fill="#0f172a" stroke="#e11d48" stroke-width="1.6"/>
            <text x="75" y="158" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">TPS3850</text>
            <text x="75" y="176" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fda4af">独立発振器＆</text>
            <text x="75" y="191" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fde047">±0.8%電圧監視</text>
            <line x1="132" y1="158" x2="178" y2="158" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db118-arrBlue)"/>
            <line x1="132" y1="190" x2="178" y2="190" stroke="#e11d48" stroke-width="2.6" marker-end="url(#db118-arrRed)"/>
            <rect x="182" y="136" width="224" height="34" rx="6" fill="#e0f2fe" stroke="#0284c7"/>
            <text x="294" y="157" text-anchor="middle" font-size="8.6" font-weight="900" fill="#0c4a6e">① DB13 マイコンを 1.6 秒で自動再起動</text>
            <rect x="182" y="178" width="224" height="36" rx="6" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="294" y="200" text-anchor="middle" font-size="8.6" font-weight="900" fill="#9f1239">② 10μsでPTC/TECゲートを物理LOW遮断</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">IEC 60730 Class B機能安全準拠：ソフト暴走に依存しない絶対安全復旧</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '異常検知・自動復旧時間', '1.6 秒以内', '独立RC発振ウィンドウ監視', '#e11d48')}
            ${drawKpiBox(0, 88, 112, 74, '電圧監視精度', '±0.8%', '瞬断ブラウンアウト検知', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, 'ゲート遮断', '&lt; 10 μs', '物理MOSFET強制OFF', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '長期留守・旅行時の安心', '#881337', '#fff1f2')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#881337">• 宇宙線やノイズで固まっても自動復帰</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#be123c">• 除湿停止やヒーター暴走をハード封殺</text>
          </g>
        `,
        cards: [
          { label: '機能安全IC', line1: 'TI TPS3850 独立ウィンドウ監視IC', line2: '独立発振器＋±0.8%電圧スーパーバイザ' },
          { label: 'ハードウェア遮断', line1: '早すぎ(暴走)・遅すぎ(固着)を両検知', line2: '異常時は10μsでPTC/TECを物理OFF' },
          { label: 'カメラを守る意味', line1: '長期出張中でもフリーズ放置リスク0', line2: 'IEC 60730級の365日無人稼働信頼性' },
        ],
      });

    case 'db_secure_element_hsm':
      return wrapDryboxHdSvg({
        badge: 'DB119',
        stepTag: 'NXP SE050 / EAL6+',
        title: '耐タンパー・ハードウェア・セキュアエレメント（EAL6+ HSM）',
        analogy: '指紋鍵やMatter証明書をプロでも絶対盗み出せない「パスポートIC級のチップ金庫」へ隔離',
        accent: '#7c3aed',
        accentSoft: '#ede9fe',
        body: `
          <!-- Left: Hardware Security Vault Isolation Architecture -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">NXP EdgeLock SE050（CC EAL6+）秘密鍵完全隔離アーキテクチャ</text>
            <!-- Left: Main MCU (External World - Untrusted Zone) -->
            <rect x="20" y="48" width="126" height="162" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1.4"/>
            <text x="83" y="72" text-anchor="middle" font-size="9.2" font-weight="900" fill="#334155">メインMCU DB13</text>
            <text x="83" y="92" text-anchor="middle" font-size="8.0" font-weight="700" fill="#475569">Wi-Fi / Thread</text>
            <text x="83" y="108" text-anchor="middle" font-size="8.0" font-weight="700" fill="#475569">Matter 1.4 通信</text>
            <rect x="34" y="126" width="98" height="32" rx="5" fill="#e0f2fe" stroke="#0284c7"/>
            <text x="83" y="146" text-anchor="middle" font-size="8.0" font-weight="800" fill="#0c4a6e">署名・照合要求のみ</text>
            <text x="83" y="182" text-anchor="middle" font-size="7.8" font-weight="800" fill="#be123c">秘密鍵は一切持たない</text>
            <!-- Encrypted I2C Channel -->
            <line x1="146" y1="128" x2="188" y2="128" stroke="#7c3aed" stroke-width="2.6" marker-end="url(#db119-arrPurple)"/>
            <text x="167" y="116" text-anchor="middle" font-size="7.6" font-weight="900" fill="#6d28d9">暗号I²C</text>
            <!-- Right: Tamper-Shielded EAL6+ Vault -->
            <rect x="192" y="42" width="214" height="174" rx="10" fill="#1e1b4b" stroke="#7c3aed" stroke-width="2.4" stroke-dasharray="6 2"/>
            <text x="299" y="64" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">🔒 EdgeLock SE050 金庫</text>
            <text x="299" y="80" text-anchor="middle" font-size="7.8" font-weight="800" fill="#c4b5fd">活性タンパーメッシュ＋光/電圧攻撃検知</text>
            <!-- 3 Protected Key Vaults inside SE050 -->
            <rect x="208" y="92" width="182" height="32" rx="5" fill="#312e81" stroke="#818cf8"/>
            <text x="299" y="112" text-anchor="middle" font-size="8.4" font-weight="900" fill="#e0e7ff">① Matter 1.4 デバイス証明鍵 (DAC)</text>
            <rect x="208" y="130" width="182" height="32" rx="5" fill="#312e81" stroke="#818cf8"/>
            <text x="299" y="150" text-anchor="middle" font-size="8.4" font-weight="900" fill="#fde047">② 指紋認証テンプレート暗号鍵 (DB06)</text>
            <rect x="208" y="168" width="182" height="32" rx="5" fill="#312e81" stroke="#818cf8"/>
            <text x="299" y="188" text-anchor="middle" font-size="8.4" font-weight="900" fill="#34d399">③ FRAM監査ログ ECDSA改ざん防止鍵</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">秘密鍵はチップ外部へ1ビットも出力不可！物理分解プローブ時は自動ロック</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '国際セキュリティ認証', 'CC EAL6+', 'パスポート・銀行ICカード級', '#7c3aed')}
            ${drawKpiBox(0, 88, 112, 74, 'デジタル署名', 'ECDSA P256', 'FRAM記録の真正証明', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '物理耐タンパー', '活性メッシュ', 'レーザー攻撃検知', '#e11d48')}
            ${drawCompareFrame(0, 172, 234, 82, 'ゼロトラスト防湿庫の価値', '#4c1d95', '#f5f3ff')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#4c1d95">• 合鍵複製や不正スマート解錠を封殺</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#6d28d9">• 保険・美術館提出用ログの改ざんゼロ</text>
          </g>
        `,
        cards: [
          { label: 'ハードウェア暗号金庫', line1: 'NXP EdgeLock SE050（CC EAL6+）', line2: 'ECC P-256 / AES-256 内部演算' },
          { label: '物理防御', line1: '秘密鍵のチップ外読み出し物理不可', line2: '活性タンパーメッシュで分解攻撃検知' },
          { label: 'カメラを守る意味', line1: '指紋・IoT遠隔解錠のハッキング防御', line2: '温湿度監査ログに改ざん不能な電子署名' },
        ],
      });

    case 'db_ups_lfp_lowtemp_heater':
      return wrapDryboxHdSvg({
        badge: 'DB120',
        stepTag: 'LFP氷点下予熱 +5°C',
        title: '停電UPS用 LiFePO₄ 氷点下セルフヒーティング・カプトン薄膜ヒーター',
        analogy: '真冬の0℃以下で内蔵電池を充電する前に電気毛布のように＋5℃へ温め、金属トゲ劣化を防ぐ保護シート',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Sub-Zero Li-Plating Prevention Control Sequence -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">LiFePO₄ 電池 氷点下リチウム析出防止 3ステップ自動予熱制御</text>
            <!-- Step 1: Freezing Cold (<0°C) -->
            <rect x="18" y="42" width="114" height="106" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
            <text x="75" y="64" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0c4a6e">① 冬季寒冷検知</text>
            <text x="75" y="86" text-anchor="middle" font-size="11.0" font-weight="900" fill="#0284c7">T &lt; 0°C</text>
            <text x="75" y="106" text-anchor="middle" font-size="8.0" font-weight="800" fill="#be123c">充電FET一時遮断</text>
            <text x="75" y="124" text-anchor="middle" font-size="7.6" font-weight="700" fill="#0369a1">このまま充電すると</text>
            <text x="75" y="138" text-anchor="middle" font-size="7.6" font-weight="700" fill="#0369a1">Liデンドライト析出</text>
            <line x1="132" y1="95" x2="156" y2="95" stroke="#d97706" stroke-width="2.6" marker-end="url(#db120-arrAmber)"/>
            <!-- Step 2: Kapton Film Self-Heating (8W from AC) -->
            <rect x="160" y="42" width="118" height="106" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
            <text x="219" y="64" text-anchor="middle" font-size="9.0" font-weight="900" fill="#78350f">② カプトン薄膜予熱</text>
            <rect x="176" y="76" width="86" height="34" rx="5" fill="#d97706"/>
            <text x="219" y="97" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">8 W 均一加熱</text>
            <text x="219" y="126" text-anchor="middle" font-size="7.8" font-weight="800" fill="#92400e">0.25mmポリイミド箔</text>
            <text x="219" y="140" text-anchor="middle" font-size="7.6" font-weight="700" fill="#b45309">60°Cバイメタル保護付</text>
            <line x1="278" y1="95" x2="302" y2="95" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db120-arrGreen)"/>
            <!-- Step 3: Safe Charging Resumed (>= +5°C) -->
            <rect x="306" y="42" width="102" height="106" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
            <text x="357" y="64" text-anchor="middle" font-size="9.0" font-weight="900" fill="#14532d">③ 安全充電許可</text>
            <text x="357" y="88" text-anchor="middle" font-size="11.0" font-weight="900" fill="#16a34a">≧ +5°C</text>
            <text x="357" y="110" text-anchor="middle" font-size="8.0" font-weight="800" fill="#15803d">定電流充電開始</text>
            <text x="357" y="128" text-anchor="middle" font-size="7.6" font-weight="700" fill="#166534">金属Li析出 0！</text>
            <text x="357" y="142" text-anchor="middle" font-size="7.6" font-weight="700" fill="#166534">寿命10年維持</text>
            <!-- Bottom Graphic: Wrapped Pack Cross-Section -->
            <rect x="26" y="164" width="374" height="52" rx="7" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="213" y="184" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0f172a">電池セル直結NTC ＋ 60°C独立バイメタル保護で過加熱リスクも完全ゼロ</text>
            <text x="213" y="204" text-anchor="middle" font-size="8.2" font-weight="700" fill="#475569">※予熱には外部AC電源(DB41)のみを使用し、内蔵UPS残量は消費しません</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2025年12月LFP自己発熱研究準拠：寒冷地・無暖房スタジオでもUPS劣化ゼロ</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '安全充電 許可しきい値', '≧ +5°C', '0°C未満充電のLi析出を完全回避', '#d97706')}
            ${drawKpiBox(0, 88, 112, 74, 'フィルム厚', '0.25 mm', 'カプトンCu-Ni箔', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '対応環境', '-20°C〜', '無暖房ガレージ対応', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '寒冷地EVバッテリー技術の応用', '#78350f', '#fffbeb')}
            ${drawPill(12, 204, 210, '予熱有：デンドライト短絡ゼロ10年', true)}
            ${drawPill(12, 229, 210, '無し：氷点下充電で急激容量劣化', false)}
          </g>
        `,
        cards: [
          { label: '薄膜予熱シート', line1: '0.25 mm カプトン＋エッチング抵抗箔', line2: 'DB42 LiFePO₄パック外周へ全面密着' },
          { label: '物理的メリット', line1: '0°C以下で自動予熱→+5°C到達後充電', line2: '黒鉛負極への金属Li析出・短絡を根絶' },
          { label: 'カメラを守る意味', line1: '真冬の無暖房スタジオでも停電UPS万全', line2: '60°C独立バイメタルで過熱保護も完備' },
        ],
      });

    default:
      return null;
  }
}
