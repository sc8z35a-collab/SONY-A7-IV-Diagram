import { drawCompareFrame, drawKpiBox, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group G (11 Parts: DB69–DB79):
 * Exhaust Check Labyrinth, TEC Graphite/PEEK/NTC, 3D Al2O3 Metasurface Evaporator,
 * UV-C Fused Silica + SiC Monitor PD, Honeycomb Grid, Auto N2 Solenoid, Stepper Damper & IEC C14 EMI Inlet.
 */
export function renderDryboxGroupGSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_exhaust_check_labyrinth':
      return wrapDryboxHdSvg({
        badge: 'DB69',
        stepTag: '15Pa逆止弁 / 3段迷路',
        title: 'シリコーン逆止弁フラップ ＋ 防虫・防塵ラビリンス排気フード断面',
        analogy: '再生湿気を吐き出す瞬間だけフワッと開き、外の湿気と小さな虫は絶対に入れない一方通行の扉',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Active Regen Exhaust vs Standby Sealed Comparison -->
          <g transform="translate(24, 80)">
            ${drawCompareFrame(0, 0, 328, 122, '✅ 再生排気時（差圧 ≥ 15 Pa で自動開放）', '#0284c7', '#f0f9ff')}
            <!-- Cabinet Exhaust Duct -->
            <rect x="20" y="54" width="76" height="44" fill="#cbd5e1" stroke="#334155" stroke-width="1.3"/>
            <!-- Open Silicone Flap -->
            <line x1="96" y1="54" x2="128" y2="38" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
            <!-- 3-Stage Labyrinth Baffles -->
            <rect x="148" y="34" width="160" height="78" rx="6" fill="#ffffff" stroke="#475569" stroke-width="1.4"/>
            <line x1="188" y1="34" x2="188" y2="86" stroke="#475569" stroke-width="3"/>
            <line x1="230" y1="58" x2="230" y2="112" stroke="#475569" stroke-width="3"/>
            <line x1="270" y1="34" x2="270" y2="86" stroke="#475569" stroke-width="3"/>
            <!-- Vapor Path through Labyrinth -->
            <path d="M 32 76 L 166 76 L 166 100 L 208 100 L 208 48 L 250 48 L 250 100 L 298 100" fill="none" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db69-arrBlue)"/>
            <text x="58" y="80" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0c4a6e">蒸気排出</text>

            ${drawCompareFrame(0, 132, 328, 122, '✅ 待機・停電時（15°傾斜座面へ密着閉鎖）', '#16a34a', '#f0fdf4')}
            <rect x="20" y="186" width="76" height="44" fill="#cbd5e1" stroke="#334155" stroke-width="1.3"/>
            <!-- Closed Silicone Flap -->
            <line x1="96" y1="184" x2="108" y2="232" stroke="#16a34a" stroke-width="4.5" stroke-linecap="round"/>
            <!-- Blocked Outside Humidity & Insect -->
            <line x1="246" y1="208" x2="124" y2="208" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#db69-arrRed)"/>
            <text x="116" y="213" font-size="13" font-weight="900" fill="#e11d48">✕</text>
            <text x="220" y="196" text-anchor="middle" font-size="9.0" font-weight="800" fill="#9f1239">梅雨の高湿外気・逆流風</text>
            <text x="220" y="226" text-anchor="middle" font-size="8.6" font-weight="700" fill="#15803d">60メッシュ防虫網＋自重密着で完封!</text>
          </g>

          <!-- Right: Key Specs & Performance -->
          <g transform="translate(364, 80)">
            ${drawKpiBox(0, 0, 158, 78, '開放クラッキング圧', '15 Pa', '無電力で蒸気圧のみ反応', '#0284c7')}
            ${drawKpiBox(170, 0, 158, 78, '停電時キープ延長', '+30%', '背面バックディフュージョン遮断', '#16a34a')}
            ${drawCompareFrame(0, 90, 328, 164, '3重の背面保護ディフェンス構造', '#334155', '#ffffff')}
            <text x="16" y="134" font-size="9.6" font-weight="800" fill="#0f172a">第1壁：SUS304 60メッシュ防虫スクリーン</text>
            <text x="24" y="150" font-size="8.6" font-weight="600" fill="#475569">チャタテムシ・ホコリの座面噛み込みを防止</text>
            <text x="16" y="176" font-size="9.6" font-weight="800" fill="#0f172a">第2壁：3段屈曲ラビリンス迷路フード</text>
            <text x="24" y="192" font-size="8.6" font-weight="600" fill="#475569">エアコン直接風によるフラップばたつきを吸収</text>
            <text x="16" y="218" font-size="9.6" font-weight="800" fill="#0f172a">第3壁：0.25 mm 低粘着シリコーン逆止弁</text>
            <text x="24" y="234" font-size="8.6" font-weight="600" fill="#475569">SMAシャッター(DB36)下流の二重逆流防止</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '0.25 mmシリコーン逆止フラップ', line2: '3段屈曲ラビリンス＋60メッシュ網' },
          { label: '物理的メリット', line1: '15 Pa微圧で無電力一方通行排気', line2: '停電時の湿度維持時間を+30%延長' },
          { label: 'カメラを守る意味', line1: '排気口からの湿気逆流・虫侵入ゼロ', line2: '工具不要スナップ清掃で長期清潔' },
        ],
      });

    case 'db_tec_graphite_peek_mount':
      return wrapDryboxHdSvg({
        badge: 'DB70',
        stepTag: 'PGS + PEEK + RTV封止',
        title: '熱分解グラファイト(TIM)＋PEEK断熱ブッシュ＆RTV防湿ポッティング実装',
        analogy: 'ペルチェ冷却素子の「熱の道・断熱の壁・防水シール」を1ミリ単位で仕上げる三種の神器',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: TEC Precision Mounting Cross-Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">テレコム級 Bi₂Te₃ ペルチェ素子 精密実装断面</text>
            <!-- Hot Heatsink (Bottom) -->
            <rect x="44" y="176" width="336" height="32" rx="4" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5"/>
            <text x="212" y="196" text-anchor="middle" font-size="9.4" font-weight="800" fill="#991b1b">高温側 放熱ヒートシンク（+42°C）</text>
            <!-- Pyrolytic Graphite Sheet TIM (Bottom) -->
            <rect x="116" y="168" width="192" height="8" fill="#1e293b"/>
            <!-- Bi2Te3 TEC Pellet Core -->
            <rect x="118" y="112" width="188" height="56" rx="3" fill="#ffffff" stroke="#334155" stroke-width="1.5"/>
            <rect x="134" y="122" width="22" height="36" fill="#0284c7"/><rect x="166" y="122" width="22" height="36" fill="#ef4444"/>
            <rect x="198" y="122" width="22" height="36" fill="#0284c7"/><rect x="230" y="122" width="22" height="36" fill="#ef4444"/>
            <rect x="262" y="122" width="22" height="36" fill="#0284c7"/>
            <!-- Neutral RTV Silicone Moisture Potting on Both Edges -->
            <rect x="104" y="112" width="14" height="56" rx="4" fill="#06b6d4" stroke="#0e7490" stroke-width="1.3"/>
            <rect x="306" y="112" width="14" height="56" rx="4" fill="#06b6d4" stroke="#0e7490" stroke-width="1.3"/>
            <!-- Pyrolytic Graphite Sheet TIM (Top) -->
            <rect x="116" y="104" width="192" height="8" fill="#1e293b"/>
            <!-- Cold Plate (Top) -->
            <rect x="44" y="72" width="336" height="32" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
            <text x="212" y="92" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0c4a6e">低温側 凝縮冷却板（+4°C）</text>
            <!-- Left & Right Clamp Bolts with PEEK Thermal-Break Bushings -->
            <rect x="64" y="64" width="20" height="152" rx="3" fill="#d97706" stroke="#78350f" stroke-width="1.4"/>
            <rect x="70" y="54" width="8" height="164" fill="#64748b"/>
            <rect x="340" y="64" width="20" height="152" rx="3" fill="#d97706" stroke="#78350f" stroke-width="1.4"/>
            <rect x="346" y="54" width="8" height="164" fill="#64748b"/>
            ${drawPin(74, 134, 28, 46, 1, 'PEEK断熱ブッシュ', 'ネジ経由の熱短絡遮断', '#d97706')}
            ${drawPin(196, 108, 224, 46, 2, '熱分解グラファイト(PGS)', 'ポンプアウトゼロ TIM', '#0f172a')}
            ${drawPin(313, 140, 294, 232, 3, '中性RTV防湿封止', 'Bi₂Te₃結露腐食を根絶', '#0891b2', 'end')}
          </g>

          <!-- Right: 3-Element Impact KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'TEC実効COP効率向上', '+18%', 'PGS低熱抵抗＋PEEK熱短絡遮断', '#d97706')}
            ${drawKpiBox(0, 88, 112, 74, 'PEEK熱伝導', '0.25 W/mK', '鋼ネジ比 1/200', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, 'PGS流出率', '0.0%', 'グリス劣化ゼロ', '#059669')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜ「中性アルコキシRTV」？', '#0891b2', '#ecfeff')}
            <text x="12" y="216" font-size="8.8" font-weight="800" fill="#155e75">酢酸ガスを出さない無腐食ポッティング</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#0e7490">結露水による銅配線腐食を10年以上防止</text>
          </g>
        `,
        cards: [
          { label: '核心実装', line1: 'PGSグラファイト＋PEEKブッシュ', line2: '無腐食中性アルコキシRTV全周封止' },
          { label: '物理的メリット', line1: 'ネジ熱短絡 &lt;0.08W・グリス流出0%', line2: 'TEC冷温差効率 +18% ＆ 10年寿命' },
          { label: 'カメラを守る意味', line1: '低電力で素早く結露除湿を完了', line2: 'ペルチェ故障による除湿停止を防止' },
        ],
      });

    case 'db_tec_coldplate_ntc_probe':
      return wrapDryboxHdSvg({
        badge: 'DB71',
        stepTag: '±0.1°C 露点PID制御',
        title: 'ペルチェ冷却板直結 NTC高精度サーミスタの霜付きゼロ制御窓',
        analogy: '冷却板の肌に貼り付き「露点より冷たいけど絶対に凍らない+2.5℃」を0.1℃刻みで死守する番人',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Optimal Anti-Frost Condensation Window Graph -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">適応露点トラッキングPID：凍結ゼロ・最大凝縮スイートスポット</text>
            <!-- Temperature Bands -->
            <!-- Top Band: Above Dew Point (No condensation) -->
            <rect x="48" y="38" width="354" height="52" fill="#fef3c7" stroke="#f59e0b"/>
            <text x="225" y="60" text-anchor="middle" font-size="9.4" font-weight="800" fill="#92400e">T_cold ＞ 露点 T_dp（結露しない ＝ 除湿できない領域）</text>
            <text x="225" y="76" text-anchor="middle" font-size="8.4" font-weight="600" fill="#b45309">例：庫内 22°C / 45% RH のとき露点 T_dp = +9.5°C</text>

            <!-- Middle Sweet Spot: +2.0°C to T_dp - 2.5°C -->
            <rect x="48" y="92" width="354" height="72" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
            <text x="225" y="112" text-anchor="middle" font-size="10.0" font-weight="900" fill="#14532d">★ DB71 PID 最適制御窓（+2.0°C 〜 T_dp − 2.5°C）</text>
            <!-- PID Trace oscillating tightly inside sweet spot -->
            <path d="M 60 132 Q 116 122 172 134 T 284 130 T 392 132" fill="none" stroke="#0284c7" stroke-width="3.0"/>
            <text x="225" y="154" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">冷却板実測 T_cold ≈ +4.5°C（液滴凝縮MAX・霜ゼロ!）</text>

            <!-- Bottom Band: Freezing Zone <= 0°C -->
            <rect x="48" y="166" width="354" height="54" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="225" y="188" text-anchor="middle" font-size="9.4" font-weight="900" fill="#9f1239">T_cold ≤ 0.0°C 凍結・着霜危険域（氷が断熱壁＆融解水漏れ!）</text>
            <text x="225" y="206" text-anchor="middle" font-size="8.4" font-weight="700" fill="#be123c">→ 下限 +2.0°C 到達時は自動パルス除霜／PEM単独運転へ即切替</text>

            <text x="212" y="240" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">SHT45理論露点 × 冷却板直結NTC実測（応答 &lt;2秒）の毎秒閉ループ制御</text>
          </g>

          <!-- Right: Probe Specs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'NTC計測精度', '±0.1°C', 'ガラス封止 10kΩ（B=3977K ±0.5%）', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, '熱応答速度', '&lt; 2.0 秒', 'エポキシ直結埋設', '#059669')}
            ${drawKpiBox(122, 88, 112, 74, '凍結下限', '+2.0°C', '冬場着霜を完全禁止', '#e11d48')}
            ${drawCompareFrame(0, 172, 234, 82, '真冬の寒い部屋(室温5°C)でも安心', '#0f172a', '#f8fafc')}
            <text x="12" y="216" font-size="8.8" font-weight="800" fill="#0f172a">冷却板が凍結限界へ近づくと自動検知</text>
            <text x="12" y="236" font-size="8.4" font-weight="700" fill="#0284c7">PEM＋Zr-MOF除湿へ無縫自動バトンタッチ</text>
          </g>
        `,
        cards: [
          { label: '核心センサー', line1: 'ガラス封止 10kΩ NTCサーミスタ', line2: 'SUSカプセル冷却板エポキシ直結' },
          { label: '物理的メリット', line1: '±0.1°C精度・2秒応答の露点PID', line2: '+2.0°Cロックで着霜と水漏れ防止' },
          { label: 'カメラを守る意味', line1: '冬場の氷結トラブルを構造的に排除', line2: '常に最大効率で安全な液滴除湿' },
        ],
      });

    case 'db_ceramic_metasurface_evap':
      return wrapDryboxHdSvg({
        badge: 'DB72',
        stepTag: '2025論文 / 3D Al₂O₃',
        title: '3D造形ハニカム多孔質アルミナ(Al₂O₃) メタサーフェス無タンク蒸発器',
        analogy: 'ミシガン大×千葉工大2025年論文を実装！ミクロ六角セラミックが水を極薄膜にして一瞬で気化',
        accent: '#0891b2',
        accentSoft: '#cffafe',
        body: `
          <!-- Left: Hexagonal Porous Alumina Metasurface Micro-Structure -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="388" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="194" y="20" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">3D光造形 Al₂O₃ ハニカム多孔メタサーフェス拡大断面</text>
            <!-- Heated Rear Heatsink Base -->
            <rect x="28" y="182" width="332" height="32" rx="4" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5"/>
            <text x="194" y="202" text-anchor="middle" font-size="9.2" font-weight="800" fill="#991b1b">背面ヒートシンク排熱利用（追加ヒーター電力 0 W!）</text>
            <!-- Porous Alumina Hex Struts (150 um struts, 375 um thick) -->
            <rect x="28" y="128" width="332" height="54" fill="#e2e8f0" stroke="#475569" stroke-width="1.4"/>
            <!-- Hexagonal Capillary Meniscus Cells -->
            <g stroke="#0891b2" stroke-width="2" fill="#e0f2fe">
              <path d="M 46 182 L 46 134 Q 68 148 90 134 L 90 182 Z"/>
              <path d="M 106 182 L 106 134 Q 128 148 150 134 L 150 182 Z"/>
              <path d="M 166 182 L 166 134 Q 188 148 210 134 L 210 182 Z"/>
              <path d="M 226 182 L 226 134 Q 248 148 270 134 L 270 182 Z"/>
              <path d="M 286 182 L 286 134 Q 308 148 330 134 L 330 182 Z"/>
            </g>
            <!-- High-Flux Vapor Plumes Rising from Thin-Film Meniscus -->
            <path d="M 68 134 Q 62 104 68 74" fill="none" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db72-arrBlue)"/>
            <path d="M 128 134 Q 122 104 128 74" fill="none" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db72-arrBlue)"/>
            <path d="M 188 134 Q 182 104 188 74" fill="none" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db72-arrBlue)"/>
            <path d="M 248 134 Q 242 104 248 74" fill="none" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db72-arrBlue)"/>
            <path d="M 308 134 Q 302 104 308 74" fill="none" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db72-arrBlue)"/>
            <text x="194" y="42" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0369a1">極薄メニスカス気液界面 → 超高速タンクレス気化排出!</text>
            <rect x="28" y="50" width="154" height="20" rx="5" fill="#ffffff" fill-opacity="0.92" stroke="#334155" stroke-width="1.0"/>
            <text x="105" y="63.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">① 支柱 150 μm（Al₂O₃焼結）</text>
            <rect x="196" y="50" width="164" height="20" rx="5" fill="#ffffff" fill-opacity="0.92" stroke="#0891b2" stroke-width="1.0"/>
            <text x="278" y="63.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0e7490">② ウィック厚 375 μm（毛細管圧）</text>
            <text x="194" y="242" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0e7490">Int. J. Heat Mass Transfer 246 (2025) 127041（ミシガン大＋千葉工大）実装</text>
          </g>

          <!-- Right: Paper Comparison & KPIs -->
          <g transform="translate(424, 80)">
            ${drawKpiBox(0, 0, 130, 78, 'ハニカム支柱', '150 μm', '3D光造形アルミナ', '#0891b2')}
            ${drawKpiBox(140, 0, 130, 78, '追加蒸発電力', '0 W', '排熱100%再利用', '#16a34a')}
            ${drawCompareFrame(0, 88, 270, 166, '紙シート／水皿 vs 3D多孔Al₂O₃', '#0e7490', '#ecfeff')}
            <text x="14" y="130" font-size="9.4" font-weight="900" fill="#14532d">✅ 3D造形 Al₂O₃ メタサーフェス</text>
            <text x="20" y="148" font-size="8.6" font-weight="700" fill="#15803d">高親水＋高熱伝導 30 W/(m·K)</text>
            <text x="20" y="164" font-size="8.6" font-weight="700" fill="#15803d">無機セラミック＝腐敗・カビ・目詰りゼロ</text>
            <text x="14" y="192" font-size="9.4" font-weight="800" fill="#9f1239">❌ 従来の紙ウィック・蒸発皿</text>
            <text x="20" y="210" font-size="8.6" font-weight="600" fill="#be123c">梅雨時に溢水・雑菌ぬめり・悪臭発生</text>
            <text x="20" y="228" font-size="8.6" font-weight="600" fill="#be123c">数年で硬化・交換メンテナンスが必要</text>
          </g>
        `,
        cards: [
          { label: '最先端学術ベース', line1: '2025年 IJHMT (127041) 論文', line2: 'ミシガン大×千葉工大 Al₂O₃技術' },
          { label: '物理的メリット', line1: '150 μm支柱×375 μm厚の強毛細管', line2: '排熱利用の0W超高速薄液膜気化' },
          { label: 'カメラを守る意味', line1: '満水タンクの水捨て作業を完全ゼロ', line2: '無機セラミックで10年無臭・無腐敗' },
        ],
      });

    case 'db_heatsink_thermal_break':
      return wrapDryboxHdSvg({
        badge: 'DB73',
        stepTag: '熱逆流 &gt;95%遮断',
        title: '放熱ヒートシンク〜筐体間 シリコーン気密断熱ガスケットの熱逆流遮断',
        analogy: '外へ追い出した排熱が鉄板を伝って庫内へUターンするのを防ぐ、厚さ3.5 mmの断熱座布団',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        body: `
          <!-- Left: Thermal Loop Elimination Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">背面放熱モジュール接合部：熱還流（サーマルループ）遮断断面</text>
            <!-- Left: Dry Cabinet Interior -->
            <rect x="18" y="42" width="122" height="168" rx="6" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.4"/>
            <text x="79" y="114" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0c4a6e">庫内ドライ空間</text>
            <text x="79" y="132" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0284c7">22.0°C 安定</text>
            <!-- Steel Cabinet Rear Wall -->
            <rect x="148" y="42" width="22" height="168" fill="#475569" stroke="#0f172a" stroke-width="1.4"/>
            <text x="159" y="128" text-anchor="middle" font-size="8.4" font-weight="800" fill="#ffffff" transform="rotate(-90 159 128)">鋼板壁 (50 W/mK)</text>
            <!-- DB73 Closed-Cell Foamed Silicone Thermal Break (3.5mm) -->
            <rect x="174" y="42" width="44" height="168" rx="5" fill="#fb923c" stroke="#c2410c" stroke-width="2"/>
            <text x="196" y="128" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff" transform="rotate(-90 196 128)">DB73 断熱層 3.5mm</text>
            <!-- Right: Hot Rear Heatsink (+45°C) -->
            <rect x="224" y="54" width="178" height="144" rx="6" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5"/>
            <text x="313" y="84" text-anchor="middle" font-size="9.6" font-weight="900" fill="#9f1239">放熱ヒートシンク (+45°C)</text>
            <!-- Heat Rejected Outward (Right) -->
            <line x1="286" y1="118" x2="386" y2="118" stroke="#ea580c" stroke-width="3.0" marker-end="url(#db73-arrRed)"/>
            <line x1="286" y1="146" x2="386" y2="146" stroke="#ea580c" stroke-width="3.0" marker-end="url(#db73-arrRed)"/>
            <text x="334" y="176" text-anchor="middle" font-size="9.2" font-weight="900" fill="#c2410c">95%超を外気へ確実放熱!</text>
            <!-- Blocked Heat U-turn (Leftward) -->
            <line x1="242" y1="130" x2="216" y2="130" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="3 2"/>
            <text x="208" y="135" font-size="14" font-weight="900" fill="#7f1d1d">✕</text>
            <text x="212" y="236" text-anchor="middle" font-size="9.0" font-weight="800" fill="#9a3412">熱伝導率 λ = 0.08 W/(m·K)（鋼板の 1/625）で熱のUターンを完全遮断</text>
          </g>

          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '筐体熱逆流カット率', '&gt; 95%', '排熱サーマルループを根絶', '#ea580c')}
            ${drawKpiBox(0, 88, 112, 74, '熱抵抗 R_th', '0.044', 'm²·K/W (3.5mm厚)', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '鋼板比較', '1 / 625', '0.08 vs 50 W/m·K', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '副次効果：防振 ＋ 360°外周気密', '#334155', '#f8fafc')}
            <text x="12" y="216" font-size="8.8" font-weight="800" fill="#0f172a">独立気泡発泡シリコーンの弾性クッション</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#475569">ヒートシンク共振絶縁と防湿シールを兼用</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '3.5 mm 独立気泡発泡シリコーン枠', line2: '熱伝導率 0.08 W/(m·K) の断熱壁' },
          { label: '物理的メリット', line1: '鋼板比 1/625 の熱遮断（逆流&lt;5%）', line2: '放熱部の振動絶縁と外周気密を兼用' },
          { label: 'カメラを守る意味', line1: '排熱の庫内還流による温度上昇防止', line2: '除湿エンジンの実効省エネ性を底上げ' },
        ],
      });

    case 'db_uvc_fused_silica_cavity':
      return wrapDryboxHdSvg({
        badge: 'DB74',
        stepTag: '265nm透過≥92% / R≥85%',
        title: '合成溶融石英UV透過窓 ＋ 鏡面アルミ多重反射UV-C殺菌キャビティ',
        analogy: '普通のガラスだと消える深紫外線を92%通し、鏡の部屋で何度もピンボール反射させてカビ胞子を一掃',
        accent: '#7c3aed',
        accentSoft: '#ede9fe',
        body: `
          <!-- Left: Multi-Bounce UV-C Optical Cavity -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">ダクト内蔵 完全遮光 UV-C 多重反射殺菌リアクター断面</text>
            <!-- Polished 99.99% Al Mirror Cavity Box -->
            <rect x="34" y="42" width="356" height="162" rx="10" fill="#f5f3ff" stroke="#475569" stroke-width="4.5"/>
            <text x="212" y="58" text-anchor="middle" font-size="8.8" font-weight="900" fill="#5b21b6">99.99% 電解研磨アルミ鏡面内壁（UV-C反射率 ≥ 85%）</text>
            <!-- UV-C LED Array on Left Wall -->
            <rect x="42" y="90" width="22" height="66" rx="3" fill="#7c3aed"/>
            <text x="53" y="126" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff" transform="rotate(-90 53 126)">265nm LED</text>
            <!-- Synthetic Fused Silica Protection Window -->
            <rect x="74" y="68" width="16" height="110" rx="2" fill="url(#db74-glass)" stroke="#0284c7" stroke-width="1.8"/>
            <!-- Multi-bounce Ray Tracing hitting Mold Spores -->
            <polyline points="64,106 168,64 252,196 334,64 382,124" fill="none" stroke="#8b5cf6" stroke-width="2.4" marker-end="url(#db74-arrPurple)"/>
            <polyline points="64,140 144,196 230,64 316,196 382,134" fill="none" stroke="#a855f7" stroke-width="2.0" stroke-dasharray="5 3"/>
            <!-- Mold Spores Inactivated -->
            <circle cx="198" cy="116" r="10" fill="#16a34a" fill-opacity="0.25" stroke="#7c3aed" stroke-width="1.6"/>
            <text x="198" y="119" text-anchor="middle" font-size="7.6" font-weight="900" fill="#5b21b6">胞子✕</text>
            <circle cx="288" cy="144" r="10" fill="#16a34a" fill-opacity="0.25" stroke="#7c3aed" stroke-width="1.6"/>
            <text x="288" y="147" text-anchor="middle" font-size="7.6" font-weight="900" fill="#5b21b6">胞子✕</text>
            ${drawPin(82, 168, 122, 224, 1, '合成溶融石英窓 (SiO₂)', '265nm透過 ≥92%', '#0284c7')}
            <text x="318" y="236" text-anchor="middle" font-size="8.8" font-weight="900" fill="#15803d">カメラ室へのUV漏れ 0.0 μW/cm²!</text>
          </g>

          <!-- Right: Window Material Transmission Comparison -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '実効UV-C線量増幅', '約 3.5倍', '鏡面アルミ多重反射リアクター効果', '#7c3aed')}
            ${drawCompareFrame(0, 88, 234, 166, '265 nm 深紫外線の透過率比較', '#5b21b6', '#ffffff')}
            <text x="14" y="132" font-size="9.2" font-weight="900" fill="#14532d">✅ 合成溶融石英（本機 DB74）</text>
            <rect x="14" y="140" width="194" height="16" rx="4" fill="#7c3aed"/>
            <text x="112" y="152" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">透過率 ≥ 92% @ 265 nm</text>
            <text x="14" y="178" font-size="9.2" font-weight="800" fill="#9f1239">❌ 普通ソーダガラス / アクリル</text>
            <rect x="14" y="186" width="10" height="16" rx="3" fill="#e11d48"/>
            <text x="32" y="198" font-size="8.6" font-weight="800" fill="#e11d48">透過率 &lt; 1%（ほぼ全吸収!）</text>
            <text x="14" y="226" font-size="8.4" font-weight="700" fill="#475569">PMC11510117 / 2026年深紫外光学</text>
            <text x="14" y="242" font-size="8.4" font-weight="700" fill="#475569">材料基準に準拠した石英＋Al設計</text>
          </g>
        `,
        cards: [
          { label: '核心光学材', line1: '合成溶融石英窓（265nm ≥92%）', line2: '99.99% 電解研磨Al鏡面（R≥85%）' },
          { label: '物理的メリット', line1: '多重内部反射で殺菌線量 約3.5倍', line2: 'LED保護＆ソラリゼーション耐性' },
          { label: 'カメラを守る意味', line1: '循環空気中のカビ胞子DNAを破壊', line2: 'カメラゴムへUV-C漏れ 0.0 μW/cm²' },
        ],
      });

    case 'db_uvc_sic_monitor_pd':
      return wrapDryboxHdSvg({
        badge: 'DB75',
        stepTag: '4H-SiC 可視光盲監視',
        title: 'ソーラーブラインド SiC（炭化ケイ素）UV-C照度監視フォトダイオード',
        analogy: '目に見えない殺菌UV-Cだけを正確に測る特殊な炭化ケイ素の目！劣化も自動補正＆お知らせ',
        accent: '#6d28d9',
        accentSoft: '#ede9fe',
        body: `
          <!-- Left: Spectral Responsivity Curve (SiC vs Si) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="406" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="203" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">分光感度スペクトル：4H-SiC（太陽盲） vs 従来シリコン(Si)</text>
            <!-- Axes -->
            <line x1="48" y1="196" x2="380" y2="196" stroke="#334155" stroke-width="1.5"/>
            <line x1="48" y1="40" x2="48" y2="196" stroke="#334155" stroke-width="1.5"/>
            <!-- UV-C Target Band Highlight (200-280 nm) -->
            <rect x="66" y="42" width="76" height="154" fill="#8b5cf6" fill-opacity="0.16"/>
            <text x="104" y="56" text-anchor="middle" font-size="8.6" font-weight="900" fill="#5b21b6">UV-C 殺菌帯</text>
            <!-- Visible Light Noise Band (400-700 nm) -->
            <rect x="196" y="42" width="136" height="154" fill="#fde047" fill-opacity="0.18"/>
            <text x="264" y="56" text-anchor="middle" font-size="8.6" font-weight="800" fill="#854d0e">庫内LED可視光ノイズ</text>
            <!-- 4H-SiC Solar-Blind Curve (Purple Solid) -->
            <path d="M 64 196 Q 104 54 140 162 Q 158 194 174 196 L 372 196" fill="none" stroke="#6d28d9" stroke-width="3.4"/>
            <!-- Regular Si Photodiode Curve (Dashed Red) -->
            <path d="M 86 196 Q 212 132 344 58 L 374 128" fill="none" stroke="#e11d48" stroke-width="2.0" stroke-dasharray="5 3"/>
            <text x="116" y="106" font-size="9.0" font-weight="900" fill="#5b21b6">4H-SiC</text>
            <text x="274" y="116" font-size="8.8" font-weight="800" fill="#e11d48">普通Siは可視光で誤反応!</text>
            <text x="104" y="212" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">265 nm</text>
            <text x="264" y="212" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">550 nm (可視)</text>
            <text x="356" y="212" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">850 nm</text>
            <text x="203" y="240" text-anchor="middle" font-size="8.8" font-weight="800" fill="#5b21b6">バンドギャップ 3.26 eV → 380nm以上の光に一切反応しない可視光盲!</text>
          </g>

          <!-- Right: Closed-Loop Fluence Control -->
          <g transform="translate(442, 80)">
            ${drawKpiBox(0, 0, 122, 78, '可視光除去比', '&gt; 10⁴ : 1', 'LED照明誤検知ゼロ', '#6d28d9')}
            ${drawKpiBox(130, 0, 122, 78, '耐UV劣化', '10年超', 'TO-46石英窓ハーメチック', '#0284c7')}
            ${drawCompareFrame(0, 88, 252, 166, '定線量（Constant-Fluence）自動補償', '#4c1d95', '#f5f3ff')}
            <text x="12" y="130" font-size="9.0" font-weight="800" fill="#3b0764">① SiC PDが実照射強度(mW/cm²)を計測</text>
            <text x="12" y="156" font-size="9.0" font-weight="800" fill="#3b0764">② UV-C LEDの経年低下を検知</text>
            <text x="12" y="182" font-size="9.0" font-weight="800" fill="#15803d">③ 定電流ブーストで殺菌力を自動維持</text>
            <text x="12" y="208" font-size="9.0" font-weight="800" fill="#e11d48">④ 寿命限界時はMatterアプリへ通知!</text>
            <text x="12" y="236" font-size="8.2" font-weight="700" fill="#5b21b6">J. Mater. Chem. C (Jul 2026) 準拠</text>
          </g>
        `,
        cards: [
          { label: '核心半導体', line1: '4H-SiC ワイドバンドギャップ受光', line2: 'Eg 3.26eV / TO-46石英気密缶' },
          { label: '物理的メリット', line1: '可視光除去比 10,000倍超の太陽盲', line2: '定線量クローズドループ自動補正' },
          { label: 'カメラを守る意味', line1: '「効いてないUV殺菌」を完全防止', line2: '10年間確実にカビ胞子殺菌を保証' },
        ],
      });

    case 'db_honeycomb_flow_grid':
      return wrapDryboxHdSvg({
        badge: 'DB76',
        stepTag: 'L/D=3.75 / 乱流−80%',
        title: 'アルミ製ハニカム層流整流グリッドの風洞整流メカニズム',
        analogy: '扇風機の渦巻き風を「細かい六角ストローの束」に通して、棚の隅々まで届く穏やかな直進風に整える',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Turbulent Swirl -> Honeycomb -> Laminar Straight Jet -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="440" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="220" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">流体整流シミュレーション：旋回乱流 → ハニカム通過 → 均一層流</text>
            <!-- Left: Swirl/Turbulence from Fan -->
            <rect x="16" y="42" width="126" height="164" rx="6" fill="#ffe4e6" stroke="#fda4af"/>
            <text x="79" y="60" text-anchor="middle" font-size="9.2" font-weight="800" fill="#9f1239">ファン直後（旋回渦）</text>
            <path d="M 30 96 C 54 70 90 124 122 92" fill="none" stroke="#e11d48" stroke-width="2.4" marker-end="url(#db76-arrRed)"/>
            <path d="M 34 148 C 66 184 94 118 124 156" fill="none" stroke="#e11d48" stroke-width="2.4" marker-end="url(#db76-arrRed)"/>
            <circle cx="76" cy="126" r="14" fill="none" stroke="#e11d48" stroke-width="1.8" stroke-dasharray="4 2"/>
            <!-- Center: Aluminum Hexagonal Honeycomb Grid (L=12mm, D=3.2mm) -->
            <rect x="154" y="42" width="68" height="164" rx="4" fill="url(#db76-steel)" stroke="#0f172a" stroke-width="1.8"/>
            <g stroke="#334155" stroke-width="1.4">
              <line x1="154" y1="64" x2="222" y2="64"/>
              <line x1="154" y1="86" x2="222" y2="86"/>
              <line x1="154" y1="108" x2="222" y2="108"/>
              <line x1="154" y1="130" x2="222" y2="130"/>
              <line x1="154" y1="152" x2="222" y2="152"/>
              <line x1="154" y1="174" x2="222" y2="174"/>
            </g>
            <rect x="160" y="106" width="56" height="34" rx="4" fill="#0f172a" fill-opacity="0.86"/>
            <text x="188" y="121" text-anchor="middle" font-size="8.0" font-weight="900" fill="#38bdf8">L = 12 mm</text>
            <text x="188" y="134" text-anchor="middle" font-size="8.0" font-weight="800" fill="#ffffff">D = 3.2 mm</text>
            <!-- Right: Clean Straight Laminar Flow into Shelves -->
            <rect x="234" y="42" width="190" height="164" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
            <text x="329" y="60" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">整流後（真っ直ぐ均一層流）</text>
            <line x1="244" y1="84" x2="408" y2="84" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db76-arrBlue)"/>
            <line x1="244" y1="112" x2="408" y2="112" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db76-arrBlue)"/>
            <line x1="244" y1="140" x2="408" y2="140" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db76-arrBlue)"/>
            <line x1="244" y1="168" x2="408" y2="168" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db76-arrBlue)"/>
            <text x="329" y="194" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">棚の四隅までデッドゾーンゼロ!</text>
            <text x="220" y="236" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0f172a">風洞設計基準 L/D = 3.75 ・ 開孔率 92% で圧損ほぼゼロのまま渦を消去</text>
          </g>

          <!-- Right: KPIs -->
          <g transform="translate(476, 80)">
            ${drawKpiBox(0, 0, 218, 78, '横方向乱流渦の減衰', '−80%', 'ショートサーキット気流を防止', '#0284c7')}
            ${drawKpiBox(0, 88, 104, 74, '開孔率', '92%', '静音圧損レス', '#16a34a')}
            ${drawKpiBox(114, 88, 104, 74, '湿度偏差', '±1.0%', '庫内全段均一', '#0891b2')}
            ${drawCompareFrame(0, 172, 218, 82, '副次効果：異物ガード ＋ EMI遮蔽', '#334155', '#f8fafc')}
            <text x="12" y="216" font-size="8.6" font-weight="800" fill="#0f172a">レンズキャップ等のダクト落下防止</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#475569">アルミ格子が導波管EMI遮蔽も兼用</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: 'A3003 極薄アルミ六角ハニカム', line2: '3.2mmセル×厚12mm (L/D 3.75)' },
          { label: '物理的メリット', line1: '開孔率 92% で横方向乱流 −80%', line2: '吹き出し短絡を防ぎ隅々まで送風' },
          { label: 'カメラを守る意味', line1: '庫内全段の湿度ムラを ±1% 以内へ', line2: '小部品のダクト落下事故も防止' },
        ],
      });

    case 'db_n2_auto_solenoid_valve':
      return wrapDryboxHdSvg({
        badge: 'DB77',
        stepTag: '自動N₂パージ −80%節約',
        title: '自動比例制御 N₂窒素パージ電磁弁 ＆ 3 kPa過圧安全リリーフ弁',
        analogy: '扉を閉めた直後だけ窒素ガスをシュッと自動で送り、酸化と湿気を80%省ガスで追い出す賢い弁',
        accent: '#0369a1',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Automated N2 Pneumatic Control Loop -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="434" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="217" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">SHT45湿度連動 オンデマンド N₂ パージ＆過圧保護回路</text>
            <!-- N2 Cylinder Input -->
            <rect x="18" y="72" width="76" height="72" rx="8" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.5"/>
            <text x="56" y="102" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">外部 N₂</text>
            <text x="56" y="118" text-anchor="middle" font-size="8.2" font-weight="700" fill="#bae6fd">窒素ガス源</text>
            <line x1="94" y1="108" x2="132" y2="108" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db77-arrBlue)"/>
            <!-- Proportional Solenoid Valve -->
            <rect x="136" y="64" width="114" height="88" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="2.0"/>
            <text x="193" y="86" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">比例N₂電磁弁</text>
            <text x="193" y="104" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0284c7">DC 24V 省電力</text>
            <text x="193" y="122" text-anchor="middle" font-size="8.2" font-weight="700" fill="#15803d">目標RH到達で</text>
            <text x="193" y="136" text-anchor="middle" font-size="8.2" font-weight="900" fill="#16a34a">自動完全遮断!</text>
            <line x1="250" y1="108" x2="294" y2="108" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db77-arrBlue)"/>
            <!-- Cabinet Positive Pressure Chamber -->
            <rect x="298" y="54" width="118" height="106" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
            <text x="357" y="82" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">庫内 微陽圧室</text>
            <text x="357" y="102" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0284c7">+30〜80 Pa</text>
            <text x="357" y="122" text-anchor="middle" font-size="8.2" font-weight="700" fill="#0369a1">O₂・湿気を押し出す</text>
            <text x="357" y="142" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f766e">SHT45 帰還監視</text>
            <!-- Parallel 3 kPa Safety Relief Valve -->
            <line x1="274" y1="108" x2="274" y2="178" stroke="#e11d48" stroke-width="2.2" marker-end="url(#db77-arrRed)"/>
            <rect x="176" y="182" width="234" height="44" rx="7" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
            <text x="293" y="201" text-anchor="middle" font-size="9.2" font-weight="900" fill="#9f1239">並列 3.0 kPa 過圧安全リリーフ弁</text>
            <text x="293" y="217" text-anchor="middle" font-size="8.2" font-weight="700" fill="#be123c">減圧弁故障時も即排気 → 強化ガラス破損を絶対防止</text>
            <text x="217" y="245" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">Totech AN2-03 / Bossmen 産業用自動N₂制御規格に準拠</text>
          </g>

          <!-- Right: Gas Savings & Specs -->
          <g transform="translate(470, 80)">
            ${drawKpiBox(0, 0, 224, 78, 'N₂ 窒素ガス消費削減', '−80%', '常時流しっぱなし方式比（自動遮断）', '#0369a1')}
            ${drawKpiBox(0, 88, 108, 74, '過圧リリーフ', '3.0 kPa', 'ガラス破損防止', '#e11d48')}
            ${drawKpiBox(116, 88, 108, 74, '接ガス材質', 'SUS316L', '超クリーン防錆', '#059669')}
            ${drawCompareFrame(0, 172, 224, 82, 'ヴィンテージ光学・フィルムの酸化防止', '#0c4a6e', '#f0f9ff')}
            <text x="12" y="216" font-size="8.8" font-weight="800" fill="#0c4a6e">普段は電気除湿・必要時だけN₂接続OK</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#0369a1">銀塩フィルムやバルサムレンズも不活性保護</text>
          </g>
        `,
        cards: [
          { label: '核心バルブ', line1: 'DC 24V 比例N₂パージ電磁弁', line2: '並列 3.0 kPa 過圧安全リリーフ弁' },
          { label: '物理的メリット', line1: '湿度連動オンデマンドでN₂ −80%節約', line2: '+30–80 Pa 微陽圧でO₂・湿気を排斥' },
          { label: 'カメラを守る意味', line1: '銀塩フィルム・希少レンズの酸化防止', line2: 'ボンベ異常高圧でもガラス扉を保護' },
        ],
      });

    case 'db_stepper_butterfly_damper':
      return wrapDryboxHdSvg({
        badge: 'DB78',
        stepTag: '0.9°比例 / &lt;18 dBA',
        title: 'ステッピングモーター駆動 上下ゾーン独立バタフライ比例風量ダンパー',
        analogy: '上段40%・下段35%の2つの湿度を1台のエンジンで作り分ける、エアコン風向フラップの超精密版',
        accent: '#0d9488',
        accentSoft: '#ccfbf1',
        body: `
          <!-- Left: Dual-Zone Plenum Split Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">デュアルゾーン分岐プレナム：バタフライ弁 0°–90° 比例配分</text>
            <!-- Dry Air Feed From Hybrid Core (Left) -->
            <rect x="20" y="96" width="110" height="58" rx="6" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.5"/>
            <text x="75" y="121" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">ハイブリッド</text>
            <text x="75" y="137" text-anchor="middle" font-size="8.4" font-weight="800" fill="#bae6fd">乾燥空気供給</text>
            <!-- Y-Split Duct -->
            <path d="M 130 108 L 220 74 L 274 74" fill="none" stroke="#0d9488" stroke-width="26" stroke-linecap="round"/>
            <path d="M 130 142 L 220 176 L 274 176" fill="none" stroke="#0284c7" stroke-width="26" stroke-linecap="round"/>
            <!-- Butterfly Disk Upper (Partially Open 65°) -->
            <circle cx="206" cy="80" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
            <line x1="194" y1="86" x2="218" y2="74" stroke="#e11d48" stroke-width="4" stroke-linecap="round"/>
            <!-- Butterfly Disk Lower (Open 35°) -->
            <circle cx="206" cy="170" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
            <line x1="196" y1="160" x2="216" y2="180" stroke="#0d9488" stroke-width="4" stroke-linecap="round"/>
            <!-- Upper Zone Box -->
            <rect x="278" y="42" width="130" height="72" rx="8" fill="#ccfbf1" stroke="#0d9488" stroke-width="1.6"/>
            <text x="343" y="66" text-anchor="middle" font-size="9.4" font-weight="900" fill="#134e4a">上段カメラゾーン</text>
            <text x="343" y="86" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0f766e">40% RH 維持</text>
            <text x="343" y="102" text-anchor="middle" font-size="8.0" font-weight="700" fill="#115e59">ゴム・革を過乾燥させない</text>
            <!-- Lower Zone Box -->
            <rect x="278" y="138" width="130" height="72" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
            <text x="343" y="162" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">下段レンズ・電子域</text>
            <text x="343" y="182" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0369a1">35% RH 維持</text>
            <text x="343" y="198" text-anchor="middle" font-size="8.0" font-weight="700" fill="#0284c7">フィルム・基板に超ドライ</text>
            <text x="212" y="238" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0f172a">上段開扉直後は自動で上段へ風量85%集中 → 高速リカバリー!</text>
          </g>

          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 112, 78, '角度分解能', '0.9°', '0°–90° 比例制御', '#0d9488')}
            ${drawKpiBox(122, 0, 112, 78, '動作静音性', '&lt; 18 dBA', 'マイクロステップ', '#0284c7')}
            ${drawCompareFrame(0, 88, 234, 166, 'ON/OFFソレノイド式との決定的な差', '#0f766e', '#f0fdfa')}
            <text x="12" y="130" font-size="9.2" font-weight="900" fill="#14532d">✅ マイクロステップ比例バタフライ弁</text>
            <text x="18" y="148" font-size="8.4" font-weight="700" fill="#15803d">「バタン！」衝撃音ゼロ・無音回転</text>
            <text x="18" y="164" font-size="8.4" font-weight="700" fill="#15803d">外周シリコーンリムで0°時クロストーク遮断</text>
            <text x="18" y="180" font-size="8.4" font-weight="700" fill="#15803d">湿度ハンチング（波打ち）±1.5%以内</text>
            <text x="12" y="210" font-size="9.0" font-weight="800" fill="#9f1239">❌ 従来の電磁開閉シャッター</text>
            <text x="18" y="228" font-size="8.4" font-weight="600" fill="#be123c">開閉のたびに金属音＆急激な湿度波打ち</text>
          </g>
        `,
        cards: [
          { label: '核心機構', line1: '静音ステッピング駆動バタフライ弁', line2: '0°–90°（分解能 0.9°）＋密着リム' },
          { label: '物理的メリット', line1: '動作音 18 dBA 未満・衝撃音ゼロ', line2: '上下2室の乾燥風量を連続PID配分' },
          { label: 'カメラを守る意味', line1: '革・ゴム(40%)と精密レンズ(35%)を両立', line2: '開扉した段だけ即座に集中リカバリー' },
        ],
      });

    case 'db_iec_c14_emi_inlet':
      return wrapDryboxHdSvg({
        badge: 'DB79',
        stepTag: 'V-Lock / IEC 60939',
        title: 'V-Lock付 IEC C14インレット ＆ 二段π型EMIノイズフィルター',
        analogy: '掃除機が当たっても絶対に抜けない電源口と、雷サージ＆電気ノイズを濾過する医療級二段浄水器',
        accent: '#ca8a04',
        accentSoft: '#fef9c3',
        body: `
          <!-- Left: Dual-Stage Pi EMI Filter Schematic -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="440" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="220" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">二段π型 双方向EMIノイズフィルター内部等価回路（IEC 60939-3）</text>
            <!-- AC Line L & N rails -->
            <line x1="24" y1="74" x2="416" y2="74" stroke="#dc2626" stroke-width="2.4"/>
            <line x1="24" y1="166" x2="416" y2="166" stroke="#0284c7" stroke-width="2.4"/>
            <line x1="24" y1="208" x2="416" y2="208" stroke="#16a34a" stroke-width="2.0" stroke-dasharray="6 3"/>
            <text x="30" y="64" font-size="8.6" font-weight="900" fill="#dc2626">AC Live (L)</text>
            <text x="30" y="158" font-size="8.6" font-weight="900" fill="#0284c7">AC Neutral (N)</text>
            <text x="30" y="200" font-size="8.6" font-weight="900" fill="#15803d">PE アース接地</text>
            <!-- Dual Fuse Block -->
            <rect x="64" y="64" width="38" height="20" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
            <text x="83" y="77.5" text-anchor="middle" font-size="7.8" font-weight="900" fill="#92400e">FUSE</text>
            <!-- Stage 1 Cx & Common-Mode Choke L1 -->
            <rect x="122" y="102" width="18" height="36" rx="2" fill="#fde047" stroke="#ca8a04"/>
            <line x1="131" y1="74" x2="131" y2="102" stroke="#334155" stroke-width="1.6"/>
            <line x1="131" y1="138" x2="131" y2="166" stroke="#334155" stroke-width="1.6"/>
            <text x="131" y="124" text-anchor="middle" font-size="7.6" font-weight="900" fill="#713f12">Cx1</text>
            <rect x="164" y="60" width="54" height="28" rx="6" fill="#0f172a"/>
            <rect x="164" y="152" width="54" height="28" rx="6" fill="#0f172a"/>
            <text x="191" y="78" text-anchor="middle" font-size="8.2" font-weight="800" fill="#fde047">第1チョーク</text>
            <text x="191" y="170" text-anchor="middle" font-size="8.2" font-weight="800" fill="#38bdf8">コモンモード</text>
            <!-- Stage 2 Common-Mode Choke L2 + Cy Capacitors to PE -->
            <rect x="262" y="60" width="54" height="28" rx="6" fill="#0f172a"/>
            <rect x="262" y="152" width="54" height="28" rx="6" fill="#0f172a"/>
            <text x="289" y="78" text-anchor="middle" font-size="8.2" font-weight="800" fill="#fde047">第2チョーク</text>
            <text x="289" y="170" text-anchor="middle" font-size="8.2" font-weight="800" fill="#38bdf8">1MHz&gt;40dB</text>
            <!-- Cy Caps to Earth -->
            <rect x="348" y="96" width="22" height="22" rx="3" fill="#bae6fd" stroke="#0284c7"/>
            <text x="359" y="110.5" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0c4a6e">Cy</text>
            <line x1="359" y1="74" x2="359" y2="96" stroke="#334155" stroke-width="1.6"/>
            <line x1="359" y1="118" x2="359" y2="208" stroke="#16a34a" stroke-width="1.6"/>
            <text x="392" y="122" text-anchor="middle" font-size="8.6" font-weight="900" fill="#15803d">GaN電源へ</text>
            <text x="220" y="238" text-anchor="middle" font-size="9.0" font-weight="800" fill="#854d0e">スタジオ録音マイクへのノイズ逆流＆家電サージ侵入を双方向ブロック</text>
          </g>

          <!-- Right: V-Lock & Leakage Specs -->
          <g transform="translate(476, 80)">
            ${drawKpiBox(0, 0, 218, 78, 'V-Lock コード抜去耐力', '&gt; 100 N', '掃除機衝突でのうっかり抜けゼロ', '#ca8a04')}
            ${drawKpiBox(0, 88, 104, 74, 'EMI減衰量', '&gt; 40 dB', '@ 1 MHz 二段π型', '#0284c7')}
            ${drawKpiBox(114, 88, 104, 74, '低漏洩電流', '&lt;0.75 mA', '医療・録音室安全', '#16a34a')}
            ${drawCompareFrame(0, 172, 218, 82, 'サイレント電源抜け悲劇を根絶', '#854d0e', '#fefce8')}
            <text x="12" y="216" font-size="8.6" font-weight="800" fill="#713f12">黄色のV-Lockラッチがカチッと機械固定</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#854d0e">ツメ解除を押さない限り絶対に抜けない!</text>
          </g>
        `,
        cards: [
          { label: '核心パーツ', line1: 'V-Lock付 IEC C14＋二段π型EMI', line2: 'FN9255E級・デュアルヒューズ' },
          { label: '物理的メリット', line1: '引抜耐力 &gt;100N・1MHz &gt;40dB減衰', line2: '漏洩電流 &lt;0.75 mA の低ハム設計' },
          { label: 'カメラを守る意味', line1: '掃除中の電源抜け→放置カビを防止', line2: '録音スタジオ併設でも電源ノイズゼロ' },
        ],
      });

    default:
      return null;
  }
}
