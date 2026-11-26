import { drawCompareFrame, drawKpiBox, drawPill, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group D (11 Parts: DB34–DB44):
 * Pt/Ir Catalyst Electrodes, 2026 Zr-MOF + Zeolite 4A, NiTi SMA Shutter, BaTiO3 PTC Heater,
 * Bi2Te3 Peltier TEC, Hydrophilic Wick, Skived Heatsink, GaN PSU, Supercap+LFP Backup,
 * 1MΩ ESD Copper Busbar & Seismic Gel Leveling Feet.
 */
export function renderDryboxGroupDSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_pem_ptir_electrodes':
      return wrapDryboxHdSvg({
        badge: 'DB34',
        stepTag: 'Pt/IrO₂触媒 / 焼結Tiメッシュ',
        title: '白金・イリジウム（Pt/Ir）多孔質ガス拡散触媒電極 ＆ チタン給電網',
        analogy: '乾電池2本分（3V）の弱い電気で水をスムーズに分解し10年サビない貴金属の触媒網',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        body: `
          <!-- Left: MEA 5-Layer Catalyst & Faraday Control -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="406" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="203" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">MEA（膜電極接合体）5層サンドイッチ ＆ 触媒過電圧低減</text>
            <!-- 5 Vertical Sandwich Layers -->
            <rect x="34" y="46" width="54" height="128" rx="4" fill="url(#db34-steel)" stroke="#475569"/>
            <text x="61" y="110" text-anchor="middle" font-size="8.6" font-weight="800" fill="#1e293b" transform="rotate(-90 61 110)">焼結Tiメッシュ(+)</text>

            <rect x="92" y="46" width="58" height="128" rx="4" fill="#eab308" stroke="#854d0e"/>
            <text x="121" y="110" text-anchor="middle" font-size="8.8" font-weight="900" fill="#422006" transform="rotate(-90 121 110)">IrO₂ 陽極触媒層</text>

            <rect x="154" y="46" width="98" height="128" rx="4" fill="url(#db34-pem)" stroke="#0e7490"/>
            <text x="203" y="106" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">Nafion-117</text>
            <text x="203" y="124" text-anchor="middle" font-size="8.4" font-weight="700" fill="#cffafe">強酸プロトン膜</text>

            <rect x="256" y="46" width="58" height="128" rx="4" fill="#facc15" stroke="#854d0e"/>
            <text x="285" y="110" text-anchor="middle" font-size="8.8" font-weight="900" fill="#422006" transform="rotate(-90 285 110)">Pt 陰極触媒層</text>

            <rect x="318" y="46" width="54" height="128" rx="4" fill="url(#db34-steel)" stroke="#475569"/>
            <text x="345" y="110" text-anchor="middle" font-size="8.6" font-weight="800" fill="#1e293b" transform="rotate(-90 345 110)">焼結Tiメッシュ(−)</text>

            <text x="203" y="196" text-anchor="middle" font-size="9.5" font-weight="800" fill="#854d0e">ファラデー法則：除湿量 m ∝ 電流 I（1 mA単位で精密調湿！）</text>
            ${drawPill(44, 210, 318, '焼結チタン不動態皮膜：強酸膜でも10万時間サビゼロ', true)}
          </g>

          <!-- Right: Overpotential Reduction & Durability -->
          <g transform="translate(446, 82)">
            ${drawKpiBox(0, 0, 246, 76, '動作電圧の低下', '2.5–3.0 V DC', 'IrO₂ナノ触媒で過電圧を劇的低減', '#ca8a04')}
            ${drawKpiBox(0, 87, 246, 76, '連続耐用寿命', '100,000 h+', '約11年以上メンテナンスフリー', '#16a34a')}
            ${drawKpiBox(0, 174, 246, 76, '耐腐食給電網', '焼結チタン', 'ステンレスと違い金属溶出ゼロ', '#475569')}
          </g>
        `,
        cards: [
          { label: '陽極IrO₂ / 陰極Pt', line1: '水の分解と水蒸気再結合の反応壁を', line2: '貴金属ナノ粒子が劇的に引き下げる' },
          { label: 'ファラデー精密制御', line1: '電流値に厳密比例して水分子を移動', line2: '乾かしすぎないデジタル調湿の鍵' },
          { label: '焼結チタンの強度', line1: '強酸性のNafion膜に接しても不腐食', line2: '10万時間超の長期安定動作を保証' },
        ],
      });

    case 'db_mof_zeolite_rotor_bed':
      return wrapDryboxHdSvg({
        badge: 'DB35',
        stepTag: '2026 RSC論文 / 0.80 g/g',
        title: '次世代Zr-MOF（NU-1008-SC-TFS）＋ ゼオライト4A ハイブリッド吸着床',
        analogy: '角砂糖1個でサッカー場なみの表面積！停電しても湿気を吸い続ける原子スポンジ',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          <!-- Left: Hierarchical MOF Lattice + Zeolite 4A Dual Bed -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="386" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="193" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">2026年RSC論文 NU-1008-SC-TFS ＆ ゼオライト4A 二層構造</text>
            <!-- Top Layer: Zr-MOF Crystal Hexagonal Channels -->
            <rect x="24" y="38" width="338" height="84" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
            <text x="38" y="56" font-size="9.8" font-weight="900" fill="#065f46">上層：Zr-MOF 単結晶（NU-1008-SC-TFS）</text>
            <!-- Hexagonal pore illustration -->
            ${[64, 112, 160].map((cx) => `<polygon points="${cx},68 ${cx + 14},76 ${cx + 14},92 ${cx},100 ${cx - 14},92 ${cx - 14},76" fill="#34d399" fill-opacity="0.35" stroke="#047857" stroke-width="1.5"/>`).join('')}
            <text x="190" y="78" font-size="8.8" font-weight="800" fill="#047857">1nm微細孔 ＋ 3nmメソ孔</text>
            <text x="190" y="94" font-size="8.6" font-weight="700" fill="#065f46">TFS配位子パッチで高耐久</text>
            <text x="190" y="110" font-size="8.8" font-weight="900" fill="#059669">容量 0.80 g/g・速度 0.34 mg/g·s</text>

            <!-- Bottom Layer: Molecular Sieve Zeolite 4A -->
            <rect x="24" y="132" width="338" height="68" rx="8" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>
            <text x="38" y="151" font-size="9.8" font-weight="900" fill="#1e293b">下層：合成ゼオライト4A（分子ふるい）</text>
            ${[52, 82, 112, 142].map((cx) => `<circle cx="${cx}" cy="174" r="10" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>`).join('')}
            <text x="168" y="172" font-size="8.8" font-weight="700" fill="#334155">細孔径 0.4 nm ＝ 水分子(0.28nm)選択捕捉</text>
            <text x="168" y="188" font-size="8.6" font-weight="700" fill="#0284c7">低湿度域(30–40%RH)でも強力吸着!</text>
            ${drawPill(34, 212, 318, '停電時でも無電源で72時間以上 50%RH未満を維持', true)}
          </g>

          <!-- Right: Water Uptake Capacity Bar Chart -->
          <g transform="translate(426, 82)">
            <rect x="0" y="0" width="266" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="133" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">吸着材の水分貯蔵力 比較 (g/g)</text>
            <g transform="translate(18, 44)">
              <text x="0" y="12" font-size="9.2" font-weight="700" fill="#64748b">従来ゼオライト単体</text>
              <rect x="0" y="18" width="68" height="18" rx="4" fill="#cbd5e1"/>
              <text x="74" y="31" font-size="9.2" font-weight="800" fill="#475569">0.22 g/g</text>

              <text x="0" y="56" font-size="9.2" font-weight="700" fill="#475569">シリカゲル（乾燥剤袋）</text>
              <rect x="0" y="62" width="96" height="18" rx="4" fill="#93c5fd"/>
              <text x="102" y="75" font-size="9.2" font-weight="800" fill="#1d4ed8">0.32 g/g</text>

              <text x="0" y="100" font-size="9.6" font-weight="900" fill="#059669">2026 Zr-MOF (NU-1008-SC-TFS)</text>
              <rect x="0" y="106" width="222" height="24" rx="4" fill="url(#db35-mof)"/>
              <text x="111" y="122" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">0.80 g/g（2.5倍超!）</text>
            </g>
            ${drawKpiBox(18, 180, 230, 58, '反復サイクル安定性', '97.7% 維持', 'RSC Chem. Sci. 2026 (d5sc10222g)', '#059669')}
          </g>
        `,
        cards: [
          { label: '2026最新MOF論文実装', line1: 'NU-1008-SC-TFS（SALI配位子補強）', line2: 'シリカゲルの2.5倍超の圧倒的吸湿力' },
          { label: '低温再生＆長寿命', line1: '90–110°Cの低温で素早く水放出', line2: '反復再生で半永久的に買い替え不要' },
          { label: '停電パッシブ砦', line1: '万一の長期停電で電気が切れても', line2: 'MOF＋ゼオライトが湿気を吸い続ける' },
        ],
      });

    case 'db_niti_sma_shutter':
      return wrapDryboxHdSvg({
        badge: 'DB36',
        stepTag: 'NiTi形状記憶 / 10万回耐久',
        title: 'ニチノール（NiTi）形状記憶合金 無モーター・デュアルシャッター',
        analogy: '温まると元の形を思い出して縮む不思議な金属バネが、無音で吸湿/排気を切替',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        body: `
          <!-- Left: Mode A - Adsorbing Inside (Room Temp Martensite) -->
          <g transform="translate(26, 82)">
            ${drawCompareFrame(0, 0, 326, 250, '① 吸湿モード（室温 ＜45°C：マルテンサイト相）', '#0284c7', '#f0f9ff')}
            <!-- Sorbent Box -->
            <rect x="108" y="64" width="110" height="92" rx="6" fill="url(#db36-mof)" stroke="#047857" stroke-width="1.6"/>
            <text x="163" y="106" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">Zr-MOF +</text>
            <text x="163" y="122" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">ゼオライト床</text>
            <!-- Inner shutter OPEN (Left) -->
            <line x1="100" y1="64" x2="72" y2="148" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
            <text x="54" y="60" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0369a1">庫内側：開!</text>
            <!-- Moist air entering -->
            <line x1="34" y1="110" x2="100" y2="110" stroke="#0284c7" stroke-width="2.8" marker-end="url(#db36-arrBlue)"/>
            <!-- Outer shutter CLOSED (Right) -->
            <line x1="226" y1="64" x2="226" y2="156" stroke="#1e293b" stroke-width="7"/>
            <text x="272" y="114" text-anchor="middle" font-size="9.2" font-weight="800" fill="#475569">外気側：密閉</text>
            <!-- Relaxed NiTi Spring -->
            <path d="M 116 178 Q 126 168 136 178 Q 146 188 156 178 Q 166 168 176 178 Q 186 188 196 178 Q 206 168 216 178" fill="none" stroke="#f43f5e" stroke-width="2.6"/>
            <text x="163" y="204" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0369a1">NiTiバネが柔らかい → バイアスバネで庫内吸湿</text>
            <text x="163" y="226" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">停電時も自動で「外気遮断側」へ戻る安全設計</text>
          </g>

          <!-- Right: Mode B - Regenerating Outside (>65°C Austenite) -->
          <g transform="translate(368, 82)">
            ${drawCompareFrame(0, 0, 324, 250, '② 再生排気モード（加熱 ＞65°C：オーステナイト相）', '#e11d48', '#fff1f2')}
            <!-- Heated Sorbent Box -->
            <rect x="106" y="64" width="110" height="92" rx="6" fill="url(#db36-heat)" stroke="#991b1b" stroke-width="1.6"/>
            <text x="161" y="106" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">PTC加熱再生</text>
            <text x="161" y="122" text-anchor="middle" font-size="9.0" font-weight="800" fill="#fef08a">(約 95–110°C)</text>
            <!-- Inner shutter CLOSED (Left) -->
            <line x1="98" y1="64" x2="98" y2="156" stroke="#1e293b" stroke-width="7"/>
            <text x="52" y="114" text-anchor="middle" font-size="9.2" font-weight="800" fill="#9f1239">庫内側：密閉!</text>
            <!-- Outer shutter OPEN (Right) -->
            <line x1="224" y1="64" x2="254" y2="148" stroke="#e11d48" stroke-width="6" stroke-linecap="round"/>
            <text x="272" y="60" text-anchor="middle" font-size="9.2" font-weight="900" fill="#be123c">外気側：開!</text>
            <!-- Vapor exiting outside -->
            <line x1="222" y1="110" x2="294" y2="110" stroke="#e11d48" stroke-width="2.8" marker-end="url(#db36-arrRed)"/>
            <!-- Contracted strong NiTi Spring -->
            <path d="M 134 178 Q 140 166 146 178 Q 152 190 158 178 Q 164 166 170 178 Q 176 190 182 178 Q 188 166 194 178" fill="none" stroke="#e11d48" stroke-width="3.6"/>
            <text x="162" y="204" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">NiTiバネが記憶形状へ強力収縮 → 自動切替!</text>
            <text x="162" y="226" text-anchor="middle" font-size="8.8" font-weight="700" fill="#9f1239">モーター0個・ギア0個・動作音 0 dBA・10万回耐久</text>
          </g>
        `,
        cards: [
          { label: '日本発の天才機構', line1: '1982年東洋リビング初実用化の傑作', line2: '熱だけで動く無モーター相変態駆動' },
          { label: '逆流ゼロの気密', line1: '再生時は庫内側シャッターを完全封鎖', line2: '熱い湿気がカメラ室へ一切戻らない' },
          { label: '10万回超の信頼性', line1: 'モーター焼損やギア摩耗が構造上ゼロ', line2: '数十年単位の故障知らずを支える' },
        ],
      });

    case 'db_batio3_ptc_heater':
      return wrapDryboxHdSvg({
        badge: 'DB37',
        stepTag: 'BaTiO₃ キュリー点110°C',
        title: 'チタン酸バリウム（BaTiO₃）自己温度制御PTCセラミック再生ヒーター',
        analogy: '110℃になると自動で電気を絞る「物理法則上絶対に燃えないセラミックヒーター」',
        accent: '#dc2626',
        accentSoft: '#fee2e2',
        body: `
          <!-- Left: PTC Resistance-Temperature Steep Curie Curve -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="406" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="203" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">BaTiO₃ キュリー温度（T_c ≈ 110°C）での10,000倍抵抗急増カーブ</text>
            <line x1="46" y1="196" x2="378" y2="196" stroke="#64748b" stroke-width="1.3"/>
            <line x1="46" y1="42" x2="46" y2="196" stroke="#64748b" stroke-width="1.3"/>
            <!-- Curie Vertical Threshold -->
            <line x1="226" y1="44" x2="226" y2="196" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4 3"/>
            <text x="232" y="58" font-size="9.6" font-weight="900" fill="#dc2626">キュリー点 T_c ≈ 110°C</text>
            <!-- Resistance Log Curve -->
            <path d="M 52 178 L 194 172 Q 222 170 232 132 L 266 56 L 368 52" fill="none" stroke="#dc2626" stroke-width="3.4"/>
            <text x="122" y="164" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0284c7">低抵抗：素早く加熱</text>
            <text x="306" y="78" text-anchor="middle" font-size="9.4" font-weight="900" fill="#991b1b">抵抗 10⁴ 倍急増!</text>
            <text x="306" y="94" text-anchor="middle" font-size="8.6" font-weight="700" fill="#b91c1c">P = V²/R → 発熱自動停止</text>
            <text x="18" y="122" font-size="8.6" font-weight="700" fill="#475569" transform="rotate(-90 18 122)">電気抵抗 R (対数)</text>
            <text x="212" y="212" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">素子温度 T (°C) →</text>
            ${drawPill(44, 218, 318, '制御マイコンが故障しても絶対に過熱発火しない本質安全!', true)}
          </g>

          <!-- Right: Power & Efficiency KPIs -->
          <g transform="translate(446, 82)">
            ${drawKpiBox(0, 0, 246, 76, '1日平均消費電力', '0.5–1.2 W', '間欠再生のため年間電気代数百円!', '#16a34a')}
            ${drawKpiBox(0, 87, 246, 76, '再生温度の低温化', '90–110°C', '2026 Zr-MOF採用で従来比35%省エネ', '#dc2626')}
            ${drawKpiBox(0, 174, 246, 76, '結晶相転移安全', '正方→立方晶', 'サーモスタット接点摩耗ゼロ', '#d97706')}
          </g>
        `,
        cards: [
          { label: '本質安全セラミック', line1: 'BaTiO₃がキュリー点で結晶転移', line2: '110°C超で抵抗1万倍→発火不能' },
          { label: '超省エネ間欠再生', line1: '数時間に1回だけ短時間加熱', line2: '平均0.5–1.2W（電気代月数十円）' },
          { label: 'Zr-MOFとの黄金タッグ', line1: '低温脱着できるZr-MOF(DB35)により', line2: '従来150°C超から110°Cへ大幅省エネ' },
        ],
      });

    case 'db_peltier_tec_module':
      return wrapDryboxHdSvg({
        badge: 'DB38',
        stepTag: 'Bi₂Te₃ / 20分急速回復',
        title: '急速回復用 テルル化ビスマス（Bi₂Te₃）ペルチェ熱電冷却ブースター',
        analogy: '扉を開けて湿気が入った時だけ起動し、20分以内に40%へ戻したらすぐ寝るターボ除湿',
        accent: '#2563eb',
        accentSoft: '#dbeafe',
        body: `
          <!-- Left: Bi2Te3 N/P Thermoelectric Couple + Pull-Down Curve -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="178" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">Bi₂Te₃ ペルチェ半導体チップ 熱ポンピング断面</text>
            <!-- Cold Ceramic Side (Top/Interior) -->
            <rect x="38" y="42" width="280" height="24" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
            <text x="178" y="58" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0c4a6e">❄ 吸熱・冷却面（庫内側：約 6–8°C で結露捕集）</text>
            <!-- N-Type & P-Type Bi2Te3 Pillars -->
            ${[68, 124, 180, 236, 292]
              .map(
                (x, i) => `
              <rect x="${x - 16}" y="72" width="32" height="58" rx="3" fill="${i % 2 === 0 ? '#2563eb' : '#ea580c'}"/>
              <text x="${x}" y="106" text-anchor="middle" font-size="11.0" font-weight="900" fill="#ffffff">${i % 2 === 0 ? 'N' : 'P'}</text>
              <line x1="${x}" y1="74" x2="${x}" y2="128" stroke="#ffffff" stroke-width="1.4" opacity="0.5"/>
            `
              )
              .join('')}
            <!-- Hot Ceramic Side (Bottom/Exterior) -->
            <rect x="38" y="136" width="280" height="24" rx="4" fill="#fecdd3" stroke="#e11d48" stroke-width="1.6"/>
            <text x="178" y="152" text-anchor="middle" font-size="9.6" font-weight="900" fill="#9f1239">🔥 放熱面（庫外側：約 38–42°C → スカイブドフィンへ）</text>
            <text x="178" y="186" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1e40af">2026論文(Int. J. Thermofluids)準拠：冷面 ＞2.5°C 着霜防止PID</text>
            ${drawPill(38, 206, 280, '開扉スパイク時(RH＞52%)だけ一瞬ブースト起動!', true)}
          </g>

          <!-- Right: Recovery Speed Curve after Door Opening -->
          <g transform="translate(396, 82)">
            <rect x="0" y="0" width="296" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="148" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">扉開閉後（65%→40% RH）回復スピード比較</text>
            <line x1="36" y1="186" x2="274" y2="186" stroke="#64748b"/>
            <line x1="36" y1="42" x2="36" y2="186" stroke="#64748b"/>
            <!-- 40% target line -->
            <line x1="36" y1="154" x2="274" y2="154" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="4 2"/>
            <text x="270" y="148" text-anchor="end" font-size="8.6" font-weight="800" fill="#15803d">目標 40% RH</text>
            <!-- Slow desiccant-only curve -->
            <path d="M 40 58 Q 148 92 268 144" fill="none" stroke="#94a3b8" stroke-width="2.2" stroke-dasharray="4 3"/>
            <text x="176" y="88" font-size="8.8" font-weight="700" fill="#64748b">乾燥剤単独：2〜3時間</text>
            <!-- Fast Hybrid Peltier Boost curve -->
            <path d="M 40 58 Q 74 148 118 154 L 268 154" fill="none" stroke="#2563eb" stroke-width="3.2"/>
            <text x="108" y="132" font-size="9.6" font-weight="900" fill="#1d4ed8">本機ターボ：＜ 20分!</text>
            <rect x="20" y="198" width="256" height="38" rx="7" fill="#eff6ff" stroke="#3b82f6"/>
            <text x="148" y="215" text-anchor="middle" font-size="9.0" font-weight="800" fill="#1e40af">40%到達後はペルチェ自動スリープ (0W)!</text>
            <text x="148" y="229" text-anchor="middle" font-size="8.6" font-weight="600" fill="#1d4ed8">定常維持はPEM＋Zr-MOFに任せて超省エネ</text>
          </g>
        `,
        cards: [
          { label: 'ハイブリッドの極意', line1: 'ペルチェの「速さ」とPEM/MOFの', line2: '「超省エネ・冬期強さ」をいいとこ取り' },
          { label: '20分スピード回復', line1: '梅雨のレンズ交換で65%に上がっても', line2: 'カビが動く前に20分以内で40%復帰' },
          { label: '冬期凍結ゼロ制御', line1: '冷面温度を常に2.5°C以上に動的制限', line2: '従来ペルチェ機の霜付き故障を根絶' },
        ],
      });

    case 'db_hydrophilic_wick_drain':
      return wrapDryboxHdSvg({
        badge: 'DB39',
        stepTag: '無排水・タンクレス気化',
        title: '親水微細溝アルミ凝縮板 ＆ 毛細管PTFEウィック無排水気化機構',
        analogy: 'ランプの芯のように水滴を裏側の温かい放熱板へ吸い出して勝手に蒸発させる仕組み',
        accent: '#0ea5e9',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Cross-Section of Tankless Capillary Drainage & Evaporation -->
          <g transform="translate(24, 82)">
            <rect x="0" y="0" width="672" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="336" y="21" text-anchor="middle" font-size="11.2" font-weight="900" fill="#0f172a">完全無排水（水捨てタンク不要）毛細管ウィック輸送・自動気化プロセス</text>

            <!-- Step 1: Hydrophilic V-Groove Cold Plate (Interior) -->
            <rect x="26" y="42" width="166" height="148" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
            <text x="109" y="61" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0c4a6e">① 親水V溝凝縮板（庫内）</text>
            ${[58, 84, 110, 136, 162].map((x) => `<line x1="${x}" y1="74" x2="${x}" y2="148" stroke="#0284c7" stroke-width="2.2"/>`).join('')}
            <circle cx="84" cy="112" r="5" fill="#0284c7"/>
            <circle cx="136" cy="134" r="5" fill="#0284c7"/>
            <rect x="42" y="156" width="134" height="22" rx="4" fill="#1e293b"/>
            <text x="109" y="170.5" text-anchor="middle" font-size="8.6" font-weight="800" fill="#38bdf8">集水トラフ（接触角＜15°）</text>

            <!-- Step 2: Capillary PTFE Wick passing through Thermal Wall -->
            <rect x="220" y="42" width="196" height="148" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1.4"/>
            <text x="318" y="61" text-anchor="middle" font-size="9.8" font-weight="900" fill="#1e293b">② 断熱壁貫通 毛細管ウィック</text>
            <path d="M 176 167 C 228 167 248 167 272 132 C 296 96 344 96 446 96" fill="none" stroke="#0ea5e9" stroke-width="10" stroke-linecap="round"/>
            <path d="M 176 167 C 228 167 248 167 272 132 C 296 96 344 96 446 96" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="6 4"/>
            <text x="318" y="148" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">毛細管圧 ΔP = 2γcosθ / r</text>
            <text x="318" y="166" text-anchor="middle" font-size="8.6" font-weight="700" fill="#475569">ポンプ不要・無電力で自動吸上!</text>
            <text x="318" y="182" text-anchor="middle" font-size="8.2" font-weight="600" fill="#059669">抗菌銀イオン担持焼結繊維</text>

            <!-- Step 3: Warm Exterior Heatsink Evaporation -->
            <rect x="444" y="42" width="202" height="148" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="1.6"/>
            <text x="545" y="61" text-anchor="middle" font-size="9.8" font-weight="900" fill="#9f1239">③ 背面蒸発パッド（庫外 40°C）</text>
            <rect x="464" y="76" width="162" height="44" rx="6" fill="#fecdd3" stroke="#e11d48"/>
            <text x="545" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#881337">ペルチェ排熱で即座に気化!</text>
            <!-- Vapor wavy lines rising -->
            ${[490, 526, 562, 598].map((x) => `<path d="M ${x} 168 Q ${x - 8} 152 ${x} 138 Q ${x + 8} 126 ${x} 122" fill="none" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db39-arrBlue)"/>`).join('')}
            <text x="545" y="182" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">見えない水蒸気で自然消散</text>

            ${drawPill(116, 208, 440, '365日 水捨て作業ゼロ・水漏れ事故ゼロ・抗菌10年ノーメンテ!', true)}
          </g>
        `,
        cards: [
          { label: '親水V溝のスピード', line1: '接触角<15°コートで水滴が即流下', line2: '冷面の熱抵抗悪化を防いで高効率' },
          { label: '無電力毛細管輸送', line1: 'ヤング・ラプラス圧で自動吸い上げ', line2: '排水ポンプなし＝騒音も故障もゼロ' },
          { label: '排熱リサイクル気化', line1: 'ペルチェ裏の排熱で蒸発させるため', line2: '専用蒸発ヒーター電力も一切不要' },
        ],
      });

    case 'db_rear_skived_heatsink':
      return wrapDryboxHdSvg({
        badge: 'DB40',
        stepTag: 'A1050スカイブド / 無音対流',
        title: '背面スカイブド・アルミ放熱フィン ＆ 排湿ルーバーカウリング',
        analogy: 'アルミの塊から継ぎ目なく削り出した剣山が、無音の煙突上昇気流で熱と湿気を逃がす',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: CNC Skiving Monolithic Cross-Section -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="386" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="193" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">一体削り起こし CNCスカイブドフィン ＆ 自然煙突対流</text>
            <!-- Monolithic Skived Fin Profile -->
            <rect x="38" y="156" width="310" height="22" rx="3" fill="url(#db40-steel)" stroke="#334155" stroke-width="1.5"/>
            <text x="193" y="171" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0f172a">A1050 純アルミベース（界面熱抵抗 R_int ＝ 0!）</text>
            ${Array.from({ length: 12 }, (_, i) => {
              const fx = 50 + i * 25;
              return `<rect x="${fx}" y="66" width="7" height="92" rx="1.5" fill="url(#db40-steel)" stroke="#475569"/>`;
            }).join('')}
            <!-- Rising Natural Convection Arrows -->
            ${[82, 158, 234, 310].map((x) => `<line x1="${x}" y1="146" x2="${x}" y2="42" stroke="#ef4444" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#db40-arrRed)"/>`).join('')}
            <text x="193" y="54" text-anchor="middle" font-size="9.6" font-weight="900" fill="#dc2626">↑ ファンレス自然上昇気流（煙突効果 0 dBA）</text>
            <text x="193" y="200" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">PEM排湿 ＋ Zr-MOF再生排気 ＋ ペルチェ＆ウィック放熱を一括処理</text>
            ${drawPill(46, 214, 294, '保護カウリングが壁際30mmの通風隙間を自動確保', true)}
          </g>

          <!-- Right: 3-Engine Exhaust Integration -->
          <g transform="translate(426, 82)">
            ${drawKpiBox(0, 0, 266, 76, '界面熱抵抗 R_int', '0.00 K/W', '接着剤なし一体削り起こし純アルミ', '#475569')}
            ${drawKpiBox(0, 87, 266, 76, 'ペルチェ高温側低減', '−8°C 改善', 'COP向上＆毛細管ウィック即気化', '#e11d48')}
            ${drawKpiBox(0, 174, 266, 76, '背面冷却騒音', '0 dBA', '完全ファンレス自然対流放熱', '#16a34a')}
          </g>
        `,
        cards: [
          { label: 'スカイブド一体加工', line1: '1枚の純アルミから薄フィンを削出', line2: '接合面の熱ロスゼロで抜群の放熱' },
          { label: '完全ファンレス無音', line1: '縦長高密度フィンが煙突気流を生成', line2: 'ホコリ詰まりや背面ファン故障ゼロ' },
          { label: '壁ベタ付け対策', line1: '外周カウリングで30mm空間を確保', line2: '設置ミスによる排湿阻害を防止' },
        ],
      });

    case 'db_gan_power_supply':
      return wrapDryboxHdSvg({
        badge: 'DB41',
        stepTag: 'GaN >93% / 雷サージ4kV',
        title: '窒化ガリウム（GaN）マルチレベル電源 ＆ 4kV雷サージ保護基板',
        analogy: '365日つけっぱなしでも熱くならず電気代が激安で、落雷も入り口で防ぐ最新電源',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Light-Load Efficiency Comparison (GaN vs Legacy Silicon) -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="386" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="193" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">軽負荷（1〜3W 定常待機時）の電源変換効率比較</text>
            <line x1="42" y1="186" x2="360" y2="186" stroke="#64748b"/>
            <line x1="42" y1="44" x2="42" y2="186" stroke="#64748b"/>
            <!-- GaN Flat High Curve -->
            <path d="M 46 62 Q 160 52 352 50" fill="none" stroke="#16a34a" stroke-width="3.4"/>
            <text x="198" y="48" text-anchor="middle" font-size="9.6" font-weight="900" fill="#15803d">本機 GaN マルチレベル：1Wでも ＞93% 高効率!</text>
            <!-- Legacy Silicon Drop at Light Load -->
            <path d="M 46 154 Q 124 104 352 84" fill="none" stroke="#e11d48" stroke-width="2.4" stroke-dasharray="5 3"/>
            <text x="198" y="138" text-anchor="middle" font-size="9.2" font-weight="800" fill="#be123c">従来シリコン電源：軽負荷で60%へ急落（発熱ロス大）</text>
            <text x="54" y="202" font-size="8.6" fill="#475569">1W (定常)</text>
            <text x="184" y="202" font-size="8.6" fill="#475569">20W (再生)</text>
            <text x="314" y="202" font-size="8.6" fill="#475569">100W (充電)</text>
            ${drawPill(34, 214, 318, 'Fraunhofer IAF GaN高効率変換思想を常時家電へ適用', true)}
          </g>

          <!-- Right: 4 Isolated Power Rails + 4kV Lightning Protection -->
          <g transform="translate(426, 82)">
            <rect x="0" y="0" width="266" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="133" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">4系統強化絶縁 ＆ 雷サージ防御</text>
            <rect x="18" y="38" width="230" height="44" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
            <text x="133" y="56" text-anchor="middle" font-size="9.8" font-weight="900" fill="#92400e">⚡ AC 100–240V 入口：MOV+GDT</text>
            <text x="133" y="72" text-anchor="middle" font-size="8.6" font-weight="700" fill="#b45309">4 kV 落雷サージを入り口で即時クランプ</text>

            <rect x="18" y="94" width="110" height="62" rx="7" fill="#ecfeff" stroke="#0891b2"/>
            <text x="73" y="114" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0e7490">3.0V 定電流</text>
            <text x="73" y="132" text-anchor="middle" font-size="8.4" font-weight="600" fill="#155e75">PEM膜専用</text>

            <rect x="138" y="94" width="110" height="62" rx="7" fill="#ecfdf5" stroke="#16a34a"/>
            <text x="193" y="114" text-anchor="middle" font-size="9.4" font-weight="800" fill="#15803d">3.3V 低雑音</text>
            <text x="193" y="132" text-anchor="middle" font-size="8.4" font-weight="600" fill="#166534">SHT45 / IoT</text>

            <rect x="18" y="168" width="110" height="62" rx="7" fill="#eff6ff" stroke="#2563eb"/>
            <text x="73" y="188" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1d4ed8">12V/24V 動力</text>
            <text x="73" y="206" text-anchor="middle" font-size="8.4" font-weight="600" fill="#1e40af">ペルチェ/LED</text>

            <rect x="138" y="168" width="110" height="62" rx="7" fill="#fff7ed" stroke="#ea580c"/>
            <text x="193" y="188" text-anchor="middle" font-size="9.4" font-weight="800" fill="#c2410c">100W PD3.1</text>
            <text x="193" y="206" text-anchor="middle" font-size="8.4" font-weight="600" fill="#9a3412">充電ハブ分離</text>
          </g>
        `,
        cards: [
          { label: '軽負荷に強いGaN', line1: '24時間稼働の1–3W帯で効率93%超', line2: '電源の発熱を抑え庫内温度も安定' },
          { label: '落雷サージ防御', line1: 'MOV＋GDTで4kV異常電圧を吸収', line2: '充電中カメラ電池や基板を保護' },
          { label: '4系統ノイズ分離', line1: '100W充電のスイッチング雑音を', line2: '精密SHT45センサー系から完全絶縁' },
        ],
      });

    case 'db_supercap_backup_pack':
      return wrapDryboxHdSvg({
        badge: 'DB42',
        stepTag: 'EDLC + LiFePO₄ / 72h',
        title: 'スーパーキャパシタ ＆ LiFePO₄（リン酸鉄）停電バックアップ電源',
        analogy: '停電の瞬間にスマホへ通報を飛ばし、72時間ずっと記録と解錠を守る非常電源',
        accent: '#16a34a',
        accentSoft: '#dcfce7',
        body: `
          <!-- Outage Resilience Timeline (0ms -> 72h) -->
          <g transform="translate(24, 82)">
            <rect x="0" y="0" width="672" height="156" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="336" y="21" text-anchor="middle" font-size="11.2" font-weight="900" fill="#0f172a">停電発生から 72 時間までの無停止フェイルセーフ・タイムライン</text>

            <!-- T=0ms: Power Cut -->
            <rect x="20" y="40" width="144" height="98" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5"/>
            <text x="92" y="60" text-anchor="middle" font-size="10.0" font-weight="900" fill="#9f1239">⚡ t = 0 ms</text>
            <text x="92" y="80" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">AC停電・断線検知</text>
            <text x="92" y="100" text-anchor="middle" font-size="8.6" font-weight="600" fill="#881337">EDLCキャパシタが</text>
            <text x="92" y="114" text-anchor="middle" font-size="8.6" font-weight="600" fill="#881337">瞬断ゼロで引き継ぎ</text>

            <line x1="164" y1="88" x2="188" y2="88" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db42-arrBlue)"/>

            <!-- T=1s: Emergency Push Alert -->
            <rect x="192" y="40" width="148" height="98" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
            <text x="266" y="60" text-anchor="middle" font-size="10.0" font-weight="900" fill="#1d4ed8">📱 t = 1 秒</text>
            <text x="266" y="80" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1e40af">スマホ緊急通知送信</text>
            <text x="266" y="100" text-anchor="middle" font-size="8.6" font-weight="600" fill="#1d4ed8">EDLCの瞬発大電流で</text>
            <text x="266" y="114" text-anchor="middle" font-size="8.6" font-weight="600" fill="#1d4ed8">Wi-Fi/Matterアラート</text>

            <line x1="340" y1="88" x2="364" y2="88" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db42-arrGreen)"/>

            <!-- T=0..72h: LFP Continuous Logging & Biometrics -->
            <rect x="368" y="40" width="144" height="98" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
            <text x="440" y="60" text-anchor="middle" font-size="10.0" font-weight="900" fill="#14532d">🔋 0〜72 時間</text>
            <text x="440" y="80" text-anchor="middle" font-size="9.4" font-weight="800" fill="#15803d">LiFePO₄ 省電力継続</text>
            <text x="440" y="100" text-anchor="middle" font-size="8.6" font-weight="600" fill="#166534">SHT45記録・E-Ink更新</text>
            <text x="440" y="114" text-anchor="middle" font-size="8.6" font-weight="600" fill="#166534">＆指紋ロック解錠OK!</text>

            <line x1="512" y1="88" x2="534" y2="88" stroke="#059669" stroke-width="2.6" marker-end="url(#db42-arrGreen)"/>

            <!-- Passive MOF Backup -->
            <rect x="538" y="40" width="116" height="98" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
            <text x="596" y="60" text-anchor="middle" font-size="9.8" font-weight="900" fill="#065f46">🛡️ 同時稼働</text>
            <text x="596" y="80" text-anchor="middle" font-size="9.2" font-weight="800" fill="#047857">Zr-MOF 吸湿</text>
            <text x="596" y="100" text-anchor="middle" font-size="8.4" font-weight="600" fill="#065f46">無電源のまま庫内</text>
            <text x="596" y="114" text-anchor="middle" font-size="8.4" font-weight="600" fill="#065f46">50%未満をキープ</text>
          </g>

          <!-- Bottom Safety Comparison -->
          <g transform="translate(24, 250)">
            ${drawKpiBox(0, 0, 214, 82, 'LFP 熱暴走閾値', '＞ 270°C', '通常Li-Po(210°C)比で圧倒的安全', '#16a34a')}
            ${drawKpiBox(229, 0, 214, 82, 'フロート待機寿命', '10年+ / 無膨張', '3,000回充放電・ガス膨張ゼロ', '#0284c7')}
            ${drawKpiBox(458, 0, 214, 82, 'EDLC 瞬発切替', '＜ 1 ms', 'データ破損＆通知失敗を完全防止', '#7c3aed')}
          </g>
        `,
        cards: [
          { label: '瞬発EDLC＋持久LFP', line1: 'EDLCが停電直後の緊急通信を担い', line2: 'LFPが72時間の記録と解錠を継続' },
          { label: '膨らまないリン酸鉄', line1: 'Li-Poのように数年で膨張・発火せず', line2: '24時間満充電待機に最適な安全化学' },
          { label: '完全な停電対策', line1: '電子制御はDB42、除湿はDB35 MOF', line2: '災害時もカメラ資産を確実に防衛' },
        ],
      });

    case 'db_esd_copper_ground_bus':
      return wrapDryboxHdSvg({
        badge: 'DB43',
        stepTag: '1MΩ安全抵抗 / C1100銅',
        title: '1MΩ安全保護抵抗内蔵 銅アースバスバー ＆ 等電位ボンディング',
        analogy: '集めた静電気は一瞬で逃がし、万一の感電電流は完全にせき止める銅の排水管',
        accent: '#b45309',
        accentSoft: '#fef3c7',
        body: `
          <!-- Equipotential Grounding Circuit Diagram -->
          <g transform="translate(24, 82)">
            <rect x="0" y="0" width="672" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="336" y="21" text-anchor="middle" font-size="11.2" font-weight="900" fill="#0f172a">IEC 61340-5-1 等電位ボンディング ＆ 1MΩ人体安全制限回路</text>

            <!-- 4 Bonded Cabinet Subsystems on Left -->
            <rect x="22" y="42" width="168" height="34" rx="6" fill="#e0f2fe" stroke="#0284c7"/>
            <text x="106" y="63" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0c4a6e">ガラスITO導電膜 (DB03)</text>

            <rect x="22" y="84" width="168" height="34" rx="6" fill="#dbeafe" stroke="#2563eb"/>
            <text x="106" y="105" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1e40af">ESD粉体塗膜 (DB15)</text>

            <rect x="22" y="126" width="168" height="34" rx="6" fill="#f1f5f9" stroke="#475569"/>
            <text x="106" y="147" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1e293b">鋼球レール＆棚板 (DB21/22)</text>

            <rect x="22" y="168" width="168" height="34" rx="6" fill="#e2e8f0" stroke="#334155"/>
            <text x="106" y="189" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">XPE導電マット (DB23)</text>

            <!-- Vertical C1100 Copper Busbar -->
            <line x1="190" y1="59" x2="236" y2="59" stroke="#d97706" stroke-width="2.6"/>
            <line x1="190" y1="101" x2="236" y2="101" stroke="#d97706" stroke-width="2.6"/>
            <line x1="190" y1="143" x2="236" y2="143" stroke="#d97706" stroke-width="2.6"/>
            <line x1="190" y1="185" x2="236" y2="185" stroke="#d97706" stroke-width="2.6"/>
            <rect x="236" y="42" width="24" height="162" rx="4" fill="url(#db43-copper)" stroke="#9a3412" stroke-width="1.5"/>
            <text x="248" y="124" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff" transform="rotate(-90 248 124)">C1100 銅バスバー</text>

            <!-- 1 MΩ Safety Current-Limiting Resistor -->
            <line x1="260" y1="122" x2="300" y2="122" stroke="#d97706" stroke-width="3.2"/>
            <rect x="300" y="96" width="142" height="52" rx="8" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
            <text x="371" y="118" text-anchor="middle" font-size="11.0" font-weight="900" fill="#92400e">安全抵抗 1.0 MΩ</text>
            <text x="371" y="136" text-anchor="middle" font-size="8.6" font-weight="700" fill="#b45309">高耐圧モールド内蔵</text>
            <line x1="442" y1="122" x2="482" y2="122" stroke="#16a34a" stroke-width="3.2" marker-end="url(#db43-arrGreen)"/>

            <!-- Earth Ground Symbol + Safety Calculation Box -->
            <rect x="486" y="44" width="166" height="158" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.6"/>
            <!-- Ground symbol -->
            <line x1="569" y1="58" x2="569" y2="82" stroke="#15803d" stroke-width="2.8"/>
            <line x1="546" y1="82" x2="592" y2="82" stroke="#15803d" stroke-width="2.8"/>
            <line x1="554" y1="90" x2="584" y2="90" stroke="#15803d" stroke-width="2.4"/>
            <line x1="562" y1="98" x2="576" y2="98" stroke="#15803d" stroke-width="2.0"/>
            <text x="569" y="120" text-anchor="middle" font-size="10.0" font-weight="900" fill="#14532d">地球アース端子</text>
            <text x="569" y="142" text-anchor="middle" font-size="8.8" font-weight="800" fill="#166534">静電気放電：＜ 1 ms!</text>
            <text x="569" y="160" text-anchor="middle" font-size="8.8" font-weight="800" fill="#166534">万一100V接触しても</text>
            <text x="569" y="176" text-anchor="middle" font-size="9.4" font-weight="900" fill="#047857">0.1 mA（人体無感安全）</text>

            <text x="336" y="230" text-anchor="middle" font-size="9.4" font-weight="700" fill="#92400e">庫内の全部品を同じ電位へ結ぶことで、カメラと棚の間のパチッ電位差スパークを完全に消去!</text>
          </g>
        `,
        cards: [
          { label: '等電位ボンディング', line1: '扉ガラス・塗膜・棚板・マットを', line2: '1本の純銅バーで同電位化' },
          { label: '1MΩの魔法の役割', line1: '静電気は1ms未満で素早く逃がしつつ', line2: '万一の感電電流は0.1mA以下に制限' },
          { label: '冬場の安心感', line1: '乾燥した防湿庫からカメラを出す際', line2: 'CMOSや電子接点のESD破損を防止' },
        ],
      });

    case 'db_seismic_gel_feet_anchor':
      return wrapDryboxHdSvg({
        badge: 'DB44',
        stepTag: '震度7制振 / tan δ >0.6',
        title: '制振粘弾性ゲル内蔵 耐震アジャスター脚 ＆ 壁面転倒防止アンカー',
        analogy: '震度7の揺れを吸収する青いゲル脚＋箱のゆがみを直す水平ネジ＋倒れない壁の命綱',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Seismic Gel Foot Cutaway + Hysteresis Damping -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="178" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">耐震アジャスター脚 内部構造（4隅設置）</text>
            <!-- Cabinet Bottom Deck -->
            <rect x="64" y="42" width="228" height="20" rx="3" fill="url(#db44-steel)" stroke="#334155"/>
            <!-- M10 Stainless Leveling Screw -->
            <rect x="162" y="62" width="32" height="40" fill="#94a3b8" stroke="#334155"/>
            <rect x="140" y="96" width="76" height="16" rx="3" fill="#1e293b"/>
            <!-- Viscoelastic Blue Seismic Gel Puck -->
            <rect x="114" y="112" width="128" height="32" rx="8" fill="#0ea5e9" fill-opacity="0.78" stroke="#0284c7" stroke-width="2"/>
            <text x="178" y="132" text-anchor="middle" font-size="9.8" font-weight="900" fill="#ffffff">粘弾性制振ゲル (tan δ＞0.6)</text>
            <!-- High-friction floor shoe -->
            <rect x="104" y="144" width="148" height="14" rx="4" fill="#334155"/>
            <!-- Floor & Seismic Wave -->
            <line x1="28" y1="160" x2="328" y2="160" stroke="#475569" stroke-width="2.2"/>
            <path d="M 42 178 Q 62 164 82 178 Q 102 192 122 178 Q 142 164 162 178" fill="none" stroke="#e11d48" stroke-width="2.4"/>
            <text x="234" y="182" font-size="9.2" font-weight="800" fill="#be123c">地震波エネルギー → ゲル内部で熱減衰!</text>
            ${drawPin(178, 82, 82, 92, 1, 'M10 水平ネジ', '±12mm 床傾き補正', '#0f172a', 'end')}
            ${drawPill(34, 206, 288, '床の傾き補正 ＝ 筐体のねじれ解消 → 扉気密UP!', true)}
          </g>

          <!-- Right: Wall Anti-Tip Anchor & Triple Seismic Defense -->
          <g transform="translate(396, 82)">
            <rect x="0" y="0" width="296" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="148" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">上部背面 壁面L字アンカー ＆ 三重耐震</text>
            <!-- Wall & Cabinet Top Schematic -->
            <rect x="28" y="42" width="32" height="114" fill="#cbd5e1" stroke="#64748b"/>
            <text x="44" y="102" text-anchor="middle" font-size="9.0" font-weight="800" fill="#334155" transform="rotate(-90 44 102)">壁面間柱</text>
            <rect x="86" y="72" width="176" height="84" rx="6" fill="#f1f5f9" stroke="#334155" stroke-width="1.8"/>
            <text x="174" y="118" text-anchor="middle" font-size="10.0" font-weight="800" fill="#0f172a">防湿庫 上部天面</text>
            <!-- Heavy Stainless L-Bracket -->
            <path d="M 60 48 L 60 72 L 128 72" fill="none" stroke="#dc2626" stroke-width="6.5" stroke-linejoin="round"/>
            <circle cx="60" cy="56" r="3.5" fill="#ffffff"/>
            <circle cx="110" cy="72" r="3.5" fill="#ffffff"/>
            <text x="180" y="58" text-anchor="middle" font-size="9.4" font-weight="900" fill="#dc2626">SUS304 耐震L字金具 ×2</text>
            <rect x="18" y="170" width="260" height="68" rx="8" fill="#f0fdf4" stroke="#16a34a"/>
            <text x="148" y="190" text-anchor="middle" font-size="9.6" font-weight="800" fill="#14532d">日本の大地震に備える三重防衛</text>
            <text x="28" y="208" font-size="8.6" font-weight="700" fill="#166534">① 粘弾性ゲル脚で横揺れ・突き上げを吸収</text>
            <text x="28" y="224" font-size="8.6" font-weight="700" fill="#166534">② 壁アンカーで転倒防止 ＋ ③ 棚リップ(DB22)</text>
          </g>
        `,
        cards: [
          { label: '高減衰ゲル制振', line1: '損失係数 tan δ > 0.6 の粘弾性ゲル', line2: '震度7の揺れを熱に変えて機材保護' },
          { label: '水平出しと気密', line1: '4隅M10ネジで±12mmの精密調整', line2: '箱の歪みを消して扉パッキン最適化' },
          { label: '壁面転倒防止', line1: '背面上部SUS304耐震L字金具2基', line2: '背の高い大容量機でも前倒れゼロ' },
        ],
      });

    default:
      return null;
  }
}
