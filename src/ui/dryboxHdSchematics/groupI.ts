import { drawCompareFrame, drawKpiBox, drawPill, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group I (10 Parts: DB91–DB100):
 * Structural Glazing VHB/Frit, EN 356 P6B Shatter Film, Hinge Dog Bolts, 3D Eccentric Cams,
 * ADXL367 3-Axis Tamper/Seismic MEMS, Air-Spring Cushion Relief Valve, Braided Door Earth Strap,
 * HRC 60 Anti-Theft Tether Shackle, IPI A-D Vinegar Scavenger & Corrosion Intercept Reactive Copper Strip.
 */
export function renderDryboxGroupISvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_structural_glazing_tape':
      return wrapDryboxHdSvg({
        badge: 'DB91',
        stepTag: 'SSG VHB / 650°C焼成',
        title: '構造用アクリルVHBテープ ＋ 窯焼成黒縁セラミックフリット',
        analogy: '車のフロントガラス黒縁と同じく、日光UVから超強力クッション接着剤を20年守る日傘構造',
        accent: '#0f172a',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: Structural Glazing Cross-Section (UV Blocked by Ceramic Frit) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">扉ガラス外周 ストラクチュラル・グレージング断面図</text>
            <!-- Outdoor UV Rays hitting Glass -->
            <line x1="36" y1="74" x2="108" y2="74" stroke="#7c3aed" stroke-width="2.4" marker-end="url(#db91-arrPurple)"/>
            <line x1="36" y1="106" x2="108" y2="106" stroke="#7c3aed" stroke-width="2.4" marker-end="url(#db91-arrPurple)"/>
            <text x="64" y="58" text-anchor="middle" font-size="9.2" font-weight="800" fill="#6d28d9">屋外UV光</text>
            <text x="64" y="130" text-anchor="middle" font-size="8.4" font-weight="700" fill="#7c3aed">UV透過 &lt;0.01%</text>
            <!-- Low-E Tempered Glass -->
            <rect x="114" y="42" width="42" height="178" rx="4" fill="url(#db91-glass)" stroke="#0284c7" stroke-width="1.6"/>
            <text x="135" y="136" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0c4a6e" transform="rotate(-90 135 136)">強化ガラス DB02</text>
            <!-- Kiln-Fired Black Ceramic Frit (650°C fused onto rear face) -->
            <rect x="156" y="42" width="14" height="122" fill="#0b0f17" stroke="#334155" stroke-width="1"/>
            <!-- Gradient halftone stress-relief dots -->
            <circle cx="163" cy="171" r="3.4" fill="#0b0f17"/>
            <circle cx="163" cy="182" r="2.6" fill="#0b0f17"/>
            <circle cx="163" cy="192" r="1.8" fill="#0b0f17"/>
            <!-- Viscoelastic Structural VHB Acrylic Foam Tape -->
            <rect x="170" y="48" width="24" height="110" rx="2" fill="#475569" stroke="#1e293b" stroke-width="1.2"/>
            <text x="182" y="104" text-anchor="middle" font-size="8.0" font-weight="800" fill="#ffffff" transform="rotate(-90 182 104)">VHB 1.6mm</text>
            <!-- Aluminum Door Frame DB01 -->
            <rect x="194" y="42" width="38" height="128" rx="4" fill="url(#db91-steel)" stroke="#475569" stroke-width="1.5"/>
            <text x="213" y="106" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a" transform="rotate(-90 213 106)">アルミ枠 DB01</text>
            <!-- Pins on right half of artboard -->
            ${drawPin(163, 72, 258, 72, 1, '650°C窯焼き黒フリット', 'UV劣化を完全遮断', '#0f172a', 'start')}
            ${drawPin(182, 118, 258, 126, 2, '構造用VHB粘弾性層', '衝撃・熱膨張差を吸収', '#0284c7', 'start')}
            ${drawPin(163, 182, 258, 180, 3, 'ドット漸減グラデーション', '急な温度差熱割れ防止', '#d97706', 'start')}
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">面全体で気密＋構造保持し、重い強化ガラスの自重ズレを20年ゼロ化</text>
          </g>
          <!-- Right: KPIs & Comparison -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '構造VHB 粘弾性剪断強度', '480 kPa+', 'ASTM C1401 構造グレージング', '#0f172a')}
            ${drawKpiBox(0, 88, 112, 74, 'フリット焼成', '650°C', 'ガラス表面へ永久融着', '#7c3aed')}
            ${drawKpiBox(122, 88, 112, 74, '対応温度差', '-30〜90°C', '伸縮追従・剥がれ0', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, 'フリット有無の長期耐久性', '#334155', '#f8fafc')}
            ${drawPill(12, 204, 210, '黒縁フリット有り：UV劣化ゼロ20年', true)}
            ${drawPill(12, 229, 210, '無し：UV酸化で黄変・剥離リスク', false)}
          </g>
        `,
        cards: [
          { label: '核心メカニズム', line1: '650°C窯焼成黒色セラミック帯', line2: '1.6mm粘弾性VHBフォーム面接着' },
          { label: '物理的メリット', line1: 'UV透過0.01%未満で接着剤保護', line2: 'アルミとガラスの熱膨張差を吸収' },
          { label: 'カメラを守る意味', line1: '扉開閉衝撃によるガラスズレ根絶', line2: '隙間からの梅雨湿気侵入を永久封止' },
        ],
      });

    case 'db_glass_shatter_laminate_film':
      return wrapDryboxHdSvg({
        badge: 'DB92',
        stepTag: 'ANSI Z97.1 / P6B',
        title: '光学ポリウレタン飛散防止・防犯ラミネート膜（200 μm）',
        analogy: '万一ガラスが粉砕しても破片を1枚のシートに留め、カメラへ1粒も落とさない透明シールド',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Impact & Shatter Containment Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">小口衝撃・NiS自然破損時のガラス破片完全拘束構造</text>
            <!-- Top & Bottom Aluminum Frame Rabbet Anchor -->
            <rect x="132" y="34" width="66" height="26" rx="4" fill="url(#db92-steel)" stroke="#475569" stroke-width="1.4"/>
            <rect x="132" y="196" width="66" height="26" rx="4" fill="url(#db92-steel)" stroke="#475569" stroke-width="1.4"/>
            <!-- Wet-glaze silicone anchor locking film into aluminum frame -->
            <rect x="172" y="42" width="18" height="18" rx="3" fill="#0ea5e9"/>
            <rect x="172" y="196" width="18" height="18" rx="3" fill="#0ea5e9"/>
            <!-- Shattered Tempered Glass (held together!) -->
            <rect x="142" y="60" width="28" height="136" fill="url(#db92-glass)" stroke="#0284c7" stroke-width="1.5"/>
            <path d="M 142 84 L 170 96 M 142 118 L 170 108 M 142 138 L 170 156 M 142 168 L 170 162" stroke="#0c4a6e" stroke-width="1.2" opacity="0.75"/>
            <!-- 200um Tear-Resistant Optical PU/PVB Film -->
            <rect x="170" y="44" width="10" height="168" fill="#38bdf8" stroke="#0369a1" stroke-width="1.4"/>
            <!-- External Impact Arrow -->
            <line x1="36" y1="128" x2="136" y2="128" stroke="#e11d48" stroke-width="3.2" marker-end="url(#db92-arrRed)"/>
            <text x="80" y="114" text-anchor="middle" font-size="9.4" font-weight="900" fill="#be123c">三脚衝突 / 打撃</text>
            <text x="80" y="146" text-anchor="middle" font-size="8.4" font-weight="700" fill="#9f1239">貫通・飛散を阻止</text>
            <!-- Safe Camera Zone on Right -->
            <rect x="206" y="70" width="198" height="114" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
            <text x="305" y="96" text-anchor="middle" font-size="10.2" font-weight="900" fill="#14532d">庫内カメラ保護エリア</text>
            <text x="305" y="118" text-anchor="middle" font-size="9.2" font-weight="800" fill="#15803d">破片落下 = 0 粒！</text>
            <text x="305" y="140" text-anchor="middle" font-size="8.4" font-weight="700" fill="#166534">センサー・前玉への</text>
            <text x="305" y="156" text-anchor="middle" font-size="8.4" font-weight="700" fill="#166534">ガラス片キズを100%回避</text>
            <text x="212" y="240" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">四隅フレーム・ウェットアンカー固定でハンマー打撃でも枠から脱落せず</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '耐引裂光学フィルム厚', '200 μm', '8 mil 多層脂肪族PU/PVB', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, '破断伸び率', '&gt; 120%', '衝撃を面で吸収', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '光学ヘイズ', '&lt; 0.8%', '黄変ゼロ・高透明', '#7c3aed')}
            ${drawCompareFrame(0, 172, 234, 82, '適合安全・防犯クラス', '#0c4a6e', '#f0f9ff')}
            <text x="14" y="216" font-size="8.8" font-weight="800" fill="#0c4a6e">• ANSI Z97.1 / EN 12600 1B1 適合</text>
            <text x="14" y="238" font-size="8.6" font-weight="700" fill="#0369a1">• EN 356 P6B 相当の防犯貫通遅延</text>
          </g>
        `,
        cards: [
          { label: '多層フィルム構造', line1: '200 μm 光学脂肪族PU／PVB膜', line2: '四隅アルミ枠ウェットアンカー固定' },
          { label: '物理的メリット', line1: '破断伸び120%超で衝撃エネルギー吸収', line2: 'ヘイズ0.8%未満で鑑賞性を維持' },
          { label: 'カメラを守る意味', line1: '強化ガラス自然破損でも破片落下0', line2: '打ち破り空き巣侵入を大幅遅延' },
        ],
      });

    case 'db_hinge_side_dogbolts':
      return wrapDryboxHdSvg({
        badge: 'DB93',
        stepTag: 'EN 1627 / HRC 60',
        title: '焼入れ鋼ヒンジ側こじ開け防止ドッグボルト（かんぬきピン）',
        analogy: 'もし泥棒が左側のヒンジを全部切り落としても、扉を1ミリも外させない隠し鉄杭',
        accent: '#475569',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: Engaged Hinge-Side Dog Bolt Mechanism -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">扉閉鎖時：ヒンジ側ドッグボルト ＆ 鋼鉄ポケット係合断面</text>
            <!-- Cabinet Frame Steel Pillar (Left) -->
            <rect x="28" y="48" width="126" height="152" rx="6" fill="url(#db93-dark)" stroke="#0f172a" stroke-width="1.5"/>
            <text x="64" y="70" text-anchor="middle" font-size="9.0" font-weight="800" fill="#cbd5e1">筐体フレーム</text>
            <!-- Hardened Steel Receiver Pocket Sleeve -->
            <rect x="82" y="96" width="74" height="56" rx="4" fill="url(#db93-steel)" stroke="#94a3b8" stroke-width="1.6"/>
            <!-- PTFE Silent Center Guide Ring -->
            <rect x="148" y="96" width="10" height="56" rx="2" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4"/>
            <!-- Door Side Flange + HRC 60 Tapered Dog Bolt -->
            <rect x="180" y="54" width="32" height="140" rx="4" fill="url(#db93-steel)" stroke="#334155" stroke-width="1.5"/>
            <path d="M 180 108 L 106 108 L 92 117 L 92 131 L 106 140 L 180 140 Z" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
            <text x="140" y="127" text-anchor="middle" font-size="8.4" font-weight="900" fill="#f8fafc">HRC 60 鋼ピン</text>
            <!-- Attack Attempt (Cut Hinge) -->
            <rect x="220" y="58" width="184" height="44" rx="6" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.3"/>
            <text x="312" y="77" text-anchor="middle" font-size="9.2" font-weight="900" fill="#9f1239">仮にヒンジ DB05 が切断されても</text>
            <text x="312" y="93" text-anchor="middle" font-size="8.4" font-weight="700" fill="#be123c">上下中3本の鋼鉄杭が扉を完全拘束！</text>
            <!-- Pins -->
            ${drawPin(153, 148, 250, 148, 1, 'PTFE静粛ガイド環', '金属擦れ音・ガタゼロ', '#0284c7', 'start')}
            ${drawPin(126, 138, 250, 192, 2, '12 kN × 3本 = 36 kN', '約3.67トンf 剪断耐力', '#0f172a', 'start')}
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">右側ソレノイド錠(DB07)＋左側ドッグボルト3本で扉全周を金庫級ロック</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '合計剪断耐力（3点分散）', '36 kN', '約 3.67 トンf の引き抜き耐性', '#334155')}
            ${drawKpiBox(0, 88, 112, 74, '表面焼入れ', 'HRC 60', 'SCM435 浸炭硬化', '#0f172a')}
            ${drawKpiBox(122, 88, 112, 74, '配置点数', '縦 3 本', '上・中・下 均等分散', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, '欧州防犯扉規格 EN 1627 思想', '#1e293b', '#f8fafc')}
            ${drawPill(12, 204, 210, '両側拘束：ヒンジ破壊でも開扉不可', true)}
            ${drawPill(12, 229, 210, '片側錠のみ：蝶番破壊で扉ごと外れる', false)}
          </g>
        `,
        cards: [
          { label: '防犯構造', line1: 'HRC 60 浸炭焼入れ鋼かんぬき×3', line2: '本体側 鋼鉄ポケットへ自動係合' },
          { label: '静粛性の工夫', line1: '先端テーパー＆PTFEガイドリング', line2: '毎日の開閉で擦れ音・ガタなし' },
          { label: 'カメラを守る意味', line1: '3.67トン級のこじ開け耐力', line2: '高価なレンズ資産を物理盗難防御' },
        ],
      });

    case 'db_3d_eccentric_hinge_cam':
      return wrapDryboxHdSvg({
        badge: 'DB94',
        stepTag: '3軸 ±2.0 mm校正',
        title: '3軸偏心カム式ヒンジ微調整プレート（X / Y / Z 気密校正）',
        analogy: '経年で扉がわずかに垂れても、3本の偏心ネジを回すだけで気密パッキン密着を0.1mm復活',
        accent: '#b45309',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: 3-Axis Eccentric Cam Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">真鍮製 3軸独立偏心カム・ヒンジベースプレート構造</text>
            <!-- Cruciform Base Plate -->
            <rect x="76" y="46" width="110" height="162" rx="8" fill="url(#db94-steel)" stroke="#475569" stroke-width="1.6"/>
            <rect x="94" y="64" width="74" height="126" rx="5" fill="#e2e8f0" stroke="#64748b" stroke-width="1.2"/>
            <!-- Cam 1: X-Axis (Lateral Gap) -->
            <circle cx="131" cy="84" r="14" fill="#d4a137" stroke="#78350f" stroke-width="1.6"/>
            <line x1="121" y1="84" x2="141" y2="84" stroke="#78350f" stroke-width="2.4"/>
            <text x="52" y="88" text-anchor="end" font-size="9.0" font-weight="900" fill="#0284c7">X 左右</text>
            <line x1="58" y1="84" x2="112" y2="84" stroke="#0284c7" stroke-width="1.8" marker-end="url(#db94-arrBlue)"/>
            <!-- Cam 2: Y-Axis (Vertical Sag) -->
            <circle cx="131" cy="127" r="14" fill="#d4a137" stroke="#78350f" stroke-width="1.6"/>
            <line x1="131" y1="117" x2="131" y2="137" stroke="#78350f" stroke-width="2.4"/>
            <text x="52" y="131" text-anchor="end" font-size="9.0" font-weight="900" fill="#059669">Y 上下</text>
            <line x1="58" y1="127" x2="112" y2="127" stroke="#059669" stroke-width="1.8" marker-end="url(#db94-arrGreen)"/>
            <!-- Cam 3: Z-Axis (Gasket Compression) -->
            <circle cx="131" cy="170" r="15" fill="#f43f5e" stroke="#881337" stroke-width="1.6"/>
            <line x1="123" y1="162" x2="139" y2="178" stroke="#ffffff" stroke-width="2.4"/>
            <text x="52" y="174" text-anchor="end" font-size="9.0" font-weight="900" fill="#e11d48">Z 気密圧</text>
            <line x1="58" y1="170" x2="112" y2="170" stroke="#e11d48" stroke-width="1.8" marker-end="url(#db94-arrRed)"/>
            <!-- Right explanation callouts -->
            ${drawPin(146, 84, 224, 78, 1, 'X軸カム（左右 ±2 mm）', '扉チリ隙間を均等補正', '#0284c7', 'start')}
            ${drawPin(146, 127, 224, 127, 2, 'Y軸カム（上下 ±2 mm）', '自重垂れと錠芯ズレ解消', '#059669', 'start')}
            ${drawPin(146, 170, 224, 176, 3, 'Z軸カム（前後 ±2 mm）', 'パッキン圧縮率28%維持', '#e11d48', 'start')}
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">カム変位 δ(θ) = e・sin(θ) により、ドライバー1本で工場出荷時の気密を復元</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '3軸独立 調整ストローク', '±2.0 mm', 'X(幅)・Y(高さ)・Z(密着度)', '#b45309')}
            ${drawKpiBox(0, 88, 112, 74, '最適圧縮率', '25〜30%', 'EPDMパッキン密着', '#059669')}
            ${drawKpiBox(122, 88, 112, 74, 'カム材質', 'C3604真鍮', '精密旋削・無ガタ', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, '10年運用時のメンテナンス差', '#78350f', '#fffbeb')}
            <text x="14" y="216" font-size="8.8" font-weight="800" fill="#78350f">• 扉を外さず現場で3軸精密再校正</text>
            <text x="14" y="238" font-size="8.6" font-weight="700" fill="#92400e">• DB04/DB52二重パッキン寿命を倍増</text>
          </g>
        `,
        cards: [
          { label: '調整メカニズム', line1: '3軸真鍮偏心カム＋ダブテール案内', line2: '上中下3基のヒンジを個別微調整' },
          { label: '物理的メリット', line1: '全周パッキン圧縮率を最適28%維持', line2: '経年の扉垂れ・ソレノイド擦れゼロ' },
          { label: 'カメラを守る意味', line1: '何年経っても新品時の超高気密持続', line2: '片当たりによる湿気リークを根絶' },
        ],
      });

    case 'db_3axis_tamper_seismic_mems':
      return wrapDryboxHdSvg({
        badge: 'DB95',
        stepTag: 'ADXL367 / 0.89μA',
        title: '超低消費電力 3軸タンパー＆地震検知MEMSセンサー（ADXL367）',
        analogy: '耳の三半規管のように揺れと衝撃を3軸で聞き分け、停電中でも数ヶ月見張り続ける超省電力チップ',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        body: `
          <!-- Left: Frequency Discrimination & Action Flowchart -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">ADXL367 3軸14-bit MEMS 振動スペクトル自動判別ロジック</text>
            <!-- Central MEMS Chip -->
            <rect x="24" y="84" width="98" height="82" rx="8" fill="#0f172a" stroke="#e11d48" stroke-width="1.8"/>
            <text x="73" y="108" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">ADXL367</text>
            <text x="73" y="126" text-anchor="middle" font-size="8.4" font-weight="800" fill="#fda4af">3軸 X / Y / Z</text>
            <text x="73" y="143" text-anchor="middle" font-size="8.0" font-weight="700" fill="#34d399">常時 0.89 μA</text>
            <text x="73" y="158" text-anchor="middle" font-size="7.6" font-weight="600" fill="#cbd5e1">0.25 mg/LSB</text>
            <!-- Branch 1: Seismic Low-Freq Wave (Top) -->
            <line x1="122" y1="104" x2="162" y2="76" stroke="#d97706" stroke-width="2.2" marker-end="url(#db95-arrAmber)"/>
            <rect x="166" y="42" width="240" height="72" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
            <text x="286" y="61" text-anchor="middle" font-size="9.4" font-weight="900" fill="#92400e">🌏 地震波（0.5〜5 Hz・≧ 0.25 G）</text>
            <path d="M 182 82 Q 198 68 214 82 T 246 82 T 278 82" fill="none" stroke="#d97706" stroke-width="2.0"/>
            <text x="342" y="82" text-anchor="middle" font-size="8.2" font-weight="800" fill="#b45309">PD充電 即安全停止</text>
            <text x="286" y="102" text-anchor="middle" font-size="8.0" font-weight="700" fill="#78350f">DB27充電遮断 ＋ ピークGをFRAM(DB83)永久記録</text>
            <!-- Branch 2: Tamper / Crowbar High-Freq Shock (Bottom) -->
            <line x1="122" y1="146" x2="162" y2="174" stroke="#e11d48" stroke-width="2.2" marker-end="url(#db95-arrRed)"/>
            <rect x="166" y="136" width="240" height="74" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5"/>
            <text x="286" y="155" text-anchor="middle" font-size="9.4" font-weight="900" fill="#9f1239">🚨 こじ開け・打撃（&gt; 20 Hz 急峻パルス）</text>
            <polyline points="182,178 192,164 198,186 206,160 214,184 222,172 240,178" fill="none" stroke="#e11d48" stroke-width="2.0"/>
            <text x="336" y="177" text-anchor="middle" font-size="8.2" font-weight="800" fill="#be123c">警報ブザー＆即通知</text>
            <text x="286" y="198" text-anchor="middle" font-size="8.0" font-weight="700" fill="#881337">圧電ブザー(DB85)＋Matterスマホ通知＋BMS接点(DB124)</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">筐体剛性ガセットへアルミ直結し、微細な破壊振動も1:1高感度キャプチャ</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '常時監視 消費電流', '0.89 μA', '100 Hz自律ウェイクアップ動作', '#e11d48')}
            ${drawKpiBox(0, 88, 112, 74, 'ADC分解能', '14-bit', '0.25 mg/LSB', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '計測レンジ', '±2/4/8 g', '地震〜打撃網羅', '#d97706')}
            ${drawCompareFrame(0, 172, 234, 82, '停電時UPS連動の強み', '#881337', '#fff1f2')}
            <text x="14" y="216" font-size="8.8" font-weight="800" fill="#881337">• 停電中でも数ヶ月間 防犯・地震監視</text>
            <text x="14" y="238" font-size="8.6" font-weight="700" fill="#be123c">• 留守中の地震ショック有無も事後確認</text>
          </g>
        `,
        cards: [
          { label: '搭載デバイス', line1: 'Analog Devices ADXL367 MEMS', line2: '14-bit 3軸加速度・0.89 μA動作' },
          { label: '波形インテリジェンス', line1: '低周波の地震と高周波の打撃を識別', line2: '0.25 G以上で充電安全カットオフ' },
          { label: 'カメラを守る意味', line1: '空き巣のこじ開けを1秒で警報通知', line2: '大地震後の機材点検ログを永久保存' },
        ],
      });

    case 'db_door_slam_cushion_vent':
      return wrapDryboxHdSvg({
        badge: 'DB96',
        stepTag: '+40 Pa 一方弁',
        title: '扉閉鎖エアクッション逃がし・ワンウェイ微圧レリーフ弁',
        analogy: '高気密扉を閉める瞬間だけ余分な空気を音もなく逃がし、跳ね返り半開きをゼロにする傘型弁',
        accent: '#0ea5e9',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Two-State Valve Physics (Door Closing vs Sealed Standby) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">シリコーン傘型チェック弁 2状態動作（閉鎖瞬間 vs 密閉待機）</text>
            <!-- Top Panel: Door Closing (+40 Pa Open) -->
            <rect x="16" y="34" width="392" height="92" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.4"/>
            <text x="26" y="52" font-size="9.4" font-weight="900" fill="#0c4a6e">① 扉を閉じる瞬間（庫内圧 +40〜+200 Pa → 弁がフワッと開く）</text>
            <!-- Valve seat + lifted umbrella -->
            <rect x="148" y="62" width="16" height="54" fill="#d4a137" stroke="#78350f"/>
            <rect x="128" y="68" width="20" height="42" rx="3" fill="#9ca3af" stroke="#475569"/>
            <path d="M 176 68 Q 198 89 176 110" fill="none" stroke="#0ea5e9" stroke-width="4.2" stroke-linecap="round"/>
            <line x1="60" y1="89" x2="122" y2="89" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db96-arrBlue)"/>
            <line x1="194" y1="74" x2="244" y2="66" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db96-arrBlue)"/>
            <line x1="194" y1="104" x2="244" y2="112" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db96-arrBlue)"/>
            <text x="326" y="83" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0369a1">圧縮空気を瞬時排気</text>
            <text x="326" y="100" text-anchor="middle" font-size="8.0" font-weight="700" fill="#0c4a6e">焼結316Lでシュー音消音</text>
            <!-- Bottom Panel: Sealed Standby (0 Pa / Reverse Pressure Closed) -->
            <rect x="16" y="136" width="392" height="90" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
            <text x="26" y="154" font-size="9.4" font-weight="900" fill="#14532d">② 閉鎖完了後（大気圧＋ばねで密着 → 外気湿気の逆流 0！）</text>
            <rect x="148" y="162" width="16" height="54" fill="#d4a137" stroke="#78350f"/>
            <rect x="128" y="168" width="20" height="42" rx="3" fill="#9ca3af" stroke="#475569"/>
            <line x1="166" y1="164" x2="166" y2="214" stroke="#16a34a" stroke-width="5.0" stroke-linecap="round"/>
            <line x1="238" y1="189" x2="182" y2="189" stroke="#e11d48" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#db96-arrRed)"/>
            <text x="322" y="184" text-anchor="middle" font-size="8.6" font-weight="900" fill="#14532d">外気高湿の侵入を遮断</text>
            <text x="322" y="201" text-anchor="middle" font-size="8.0" font-weight="700" fill="#166534">逆流リーク &lt; 0.01 sccm</text>
            <text x="212" y="242" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">高気密扉特有の「空気バネ跳ね返り（半開き事故）」を無電源で完全解消</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '開弁クラッキング差圧', '+40 Pa', '閉鎖時の瞬間正圧のみ開放', '#0ea5e9')}
            ${drawKpiBox(0, 88, 112, 74, '逆圧リーク', '&lt;0.01 sccm', '梅雨湿気侵入ゼロ', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '排気騒音', '&lt; 15 dBA', '焼結316L消音帽', '#475569')}
            ${drawCompareFrame(0, 172, 234, 82, '高気密キャビネットの落とし穴', '#0c4a6e', '#f0f9ff')}
            ${drawPill(12, 204, 210, 'レリーフ弁有：軽く押すだけでピタ閉', true)}
            ${drawPill(12, 229, 210, '無し：空気反発で半開き・湿気流入', false)}
          </g>
        `,
        cards: [
          { label: 'バルブ機構', line1: '超軽量シリコーン傘型逆止弁', line2: '微小戻しばね＋焼結316L消音器' },
          { label: '物理的メリット', line1: '+40 Pa正圧のみ逃がし逆流完全遮断', line2: 'パッキン吸着と施錠の確実性向上' },
          { label: 'カメラを守る意味', line1: 'うっかり半開きによる高湿事故防止', line2: '扉を勢いよく閉めてもソフト着座' },
        ],
      });

    case 'db_door_braided_earth_strap':
      return wrapDryboxHdSvg({
        badge: 'DB97',
        stepTag: 'IEC 61340-5-1',
        title: '扉・筐体間 錫メッキ銅編組アースボンディングストラップ',
        analogy: 'PTFE樹脂ワッシャーで絶縁されたガラス扉の静電気を、柔らかい銅の編み紐で確実にアースへ渡す橋',
        accent: '#16a34a',
        accentSoft: '#dcfce7',
        body: `
          <!-- Left: Bypassing PTFE-Insulated Hinge to Ground Door ITO Glass -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">PTFE絶縁ヒンジを跨ぐ IEC 61340-5-1 等電位ボンディング経路</text>
            <!-- Left Block: Glass Door ITO + Frame -->
            <rect x="20" y="48" width="112" height="148" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
            <text x="76" y="74" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">ガラス扉側</text>
            <text x="76" y="94" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0369a1">ITO導電膜 DB03</text>
            <text x="76" y="112" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0369a1">アルミ枠 DB01</text>
            <text x="76" y="136" text-anchor="middle" font-size="8.2" font-weight="800" fill="#be123c">⚡人体接触帯電</text>
            <!-- Top Path: Hinge with PTFE Washer (BLOCKED!) -->
            <rect x="164" y="54" width="96" height="44" rx="6" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4" stroke-dasharray="4 2"/>
            <text x="212" y="73" text-anchor="middle" font-size="8.6" font-weight="900" fill="#9f1239">ヒンジ DB05/49</text>
            <text x="212" y="89" text-anchor="middle" font-size="8.0" font-weight="800" fill="#e11d48">PTFE絶縁 &gt;10⁹ Ω</text>
            <line x1="132" y1="76" x2="162" y2="76" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2"/>
            <line x1="262" y1="76" x2="292" y2="76" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2"/>
            <!-- Bottom Path: Tinned-Copper Braided Strap (BYPASS!) -->
            <path d="M 122 158 C 166 196, 258 124, 302 158" fill="none" stroke="#ea580c" stroke-width="9" stroke-linecap="round"/>
            <path d="M 122 158 C 166 196, 258 124, 302 158" fill="none" stroke="#cbd5e1" stroke-width="5.5" stroke-dasharray="4 3"/>
            <circle cx="122" cy="158" r="7" fill="#eab308" stroke="#713f12" stroke-width="1.5"/>
            <circle cx="302" cy="158" r="7" fill="#eab308" stroke="#713f12" stroke-width="1.5"/>
            <text x="212" y="196" text-anchor="middle" font-size="9.2" font-weight="900" fill="#15803d">錫メッキ銅平編組ストラップ（R &lt; 0.05 Ω）</text>
            <text x="212" y="212" text-anchor="middle" font-size="8.0" font-weight="700" fill="#166534">星形歯付き座金が塗装を貫通し母材へ直接導通</text>
            <!-- Right Block: Chassis ESD Bus DB43 -->
            <rect x="292" y="48" width="112" height="148" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
            <text x="348" y="74" text-anchor="middle" font-size="9.4" font-weight="900" fill="#14532d">本体アース側</text>
            <text x="348" y="96" text-anchor="middle" font-size="8.4" font-weight="800" fill="#15803d">SPCC筐体 DB14</text>
            <text x="348" y="116" text-anchor="middle" font-size="8.4" font-weight="800" fill="#15803d">1MΩバス DB43</text>
            <text x="348" y="142" text-anchor="middle" font-size="9.2" font-weight="900" fill="#059669">⏚ 安全大地接地</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">扉の「電気的浮き（フローティング）」を解消し、180°開閉10万回無断線</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'ボンディング導通抵抗', '&lt; 0.05 Ω', '4.0 mm² 錫メッキ軟銅平編組', '#16a34a')}
            ${drawKpiBox(0, 88, 112, 74, '屈曲耐久', '10万回+', 'φ0.12mm極細線', '#ea580c')}
            ${drawKpiBox(122, 88, 112, 74, '準拠規格', 'IEC61340', 'EPA静電気対策', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜ銅編組バイパスが必要？', '#14532d', '#f0fdf4')}
            <text x="14" y="216" font-size="8.8" font-weight="800" fill="#14532d">• ヒンジのグリス・PTFEは絶縁体</text>
            <text x="14" y="238" font-size="8.6" font-weight="700" fill="#166534">• 編組線で扉ITO膜を常時0Vへ固定</text>
          </g>
        `,
        cards: [
          { label: '導体仕様', line1: 'φ0.12 mm 錫メッキ軟銅 平編組線', line2: '星形歯付き座金＋IEC緑黄スリーブ' },
          { label: '物理的メリット', line1: 'PTFE絶縁ヒンジを0.05 Ω未満で跨ぐ', line2: '180°開閉10万回でも金属疲労ゼロ' },
          { label: 'カメラを守る意味', line1: '扉ITO膜の静電気除去効果を100%発揮', line2: '冬の扉開閉バチッ＆ホコリ吸着根絶' },
        ],
      });

    case 'db_security_tether_shackle':
      return wrapDryboxHdSvg({
        badge: 'DB98',
        stepTag: 'HRC 60 / 15 kN',
        title: '背面 焼入れ鋼アンカー＆ワイヤーシャックル（丸ごと盗難防止）',
        analogy: '箱ごと抱えて車で持ち去る空き巣と大地震の転倒を、1本の極太鋼ワイヤーで壁へ繋いで防ぐ鎖',
        accent: '#334155',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: Wall Anchor + HRC 60 D-Ring + Dual Role -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">背面6 mm補強鋼板貫通アンカー ＆ 建築構造壁テザー連結図</text>
            <!-- Dry Cabinet Rear Wall (Right) -->
            <rect x="256" y="42" width="146" height="162" rx="8" fill="url(#db98-dark)" stroke="#0f172a" stroke-width="1.5"/>
            <text x="336" y="72" text-anchor="middle" font-size="9.4" font-weight="900" fill="#f8fafc">防湿庫 背面下部</text>
            <!-- Internal 6mm Steel Backing Flange -->
            <rect x="266" y="88" width="16" height="72" rx="2" fill="#94a3b8" stroke="#f8fafc" stroke-width="1.2"/>
            <text x="342" y="114" text-anchor="middle" font-size="8.2" font-weight="700" fill="#cbd5e1">庫内6mm厚</text>
            <text x="342" y="130" text-anchor="middle" font-size="8.2" font-weight="700" fill="#cbd5e1">補強鋼板＋</text>
            <text x="342" y="146" text-anchor="middle" font-size="8.2" font-weight="700" fill="#fde047">ワンウェイ錠</text>
            <!-- Forged HRC 60 D-Ring Eyelet -->
            <path d="M 256 106 C 216 106, 216 142, 256 142" fill="none" stroke="#475569" stroke-width="8.5" stroke-linecap="round"/>
            <!-- Braided 8mm Steel Tether Cable -->
            <path d="M 222 124 C 176 124, 154 156, 98 148" fill="none" stroke="#64748b" stroke-width="6.5" stroke-linecap="round"/>
            <path d="M 222 124 C 176 124, 154 156, 98 148" fill="none" stroke="#e2e8f0" stroke-width="2.5" stroke-dasharray="5 3"/>
            <!-- Building Wall Stud Anchor (Left) -->
            <rect x="24" y="42" width="66" height="162" rx="6" fill="url(#db98-hatch)" stroke="#475569" stroke-width="1.5"/>
            <text x="57" y="72" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0f172a">建築壁柱</text>
            <rect x="74" y="132" width="24" height="32" rx="4" fill="#334155"/>
            <!-- Dual Role Badges -->
            ${drawPin(222, 108, 174, 70, 1, 'HRC 60 鍛造Dリング', 'クリッパー切断困難', '#0f172a', 'middle')}
            ${drawPin(158, 146, 158, 192, 2, 'φ8mm 編組ワイヤー', '破断荷重 15 kN', '#0284c7', 'middle')}
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">盗難時の筐体持ち去り防御 ＋ 震度7大地震時の前方転倒防止を1本で兼用</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'スチールケーブル破断荷重', '15 kN+', '約 1.53 トンf（φ8mm 7×19）', '#334155')}
            ${drawKpiBox(0, 88, 112, 74, 'Dリング硬度', 'HRC 60', '浸炭焼入れ鍛造鋼', '#0f172a')}
            ${drawKpiBox(122, 88, 112, 74, '締結ボルト', '外部解除不可', '庫内ナット固定', '#e11d48')}
            ${drawCompareFrame(0, 172, 234, 82, 'キャスター付き防湿庫の必須対策', '#1e293b', '#f8fafc')}
            <text x="14" y="216" font-size="8.8" font-weight="800" fill="#1e293b">• 扉が開かなくても丸ごと搬出を阻止</text>
            <text x="14" y="238" font-size="8.6" font-weight="700" fill="#475569">• 制振ゲル脚(DB44)と二重耐震保護</text>
          </g>
        `,
        cards: [
          { label: '物理構造', line1: 'HRC 60鍛造Dリング＋6mm裏当て板', line2: 'φ8mm PVC被覆 7×19鋼ワイヤー' },
          { label: '二重の防護価値', line1: '筐体丸ごとの持ち去り盗難を阻止', line2: '震度7級地震での前方転倒テザー' },
          { label: 'カメラを守る意味', line1: 'プロスタジオ・レンタル庫の安心保管', line2: 'キャスター移動性と高防犯を両立' },
        ],
      });

    case 'db_vinegar_acid_scavenger':
      return wrapDryboxHdSvg({
        badge: 'DB99',
        stepTag: 'IPI A-D + K₂CO₃',
        title: 'IPI A-D酸度インジケーター ＋ 炭酸カリウム酢酸スカベンジャー',
        analogy: '古いフィルムから出る「お酢ガス（ビネガー病）」を色の変化で早期発見し、安全な塩へ無害化',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: IPI A-D Colorimetric Scale + K2CO3 Chemical Neutralization -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">IPI A-D比色レベル判定 ＆ K₂CO₃分子篩による酢酸中和反応</text>
            <!-- Top Row: IPI A-D Color Strip Scale -->
            <rect x="18" y="34" width="388" height="72" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
            <text x="212" y="51" text-anchor="middle" font-size="9.0" font-weight="800" fill="#334155">IPI A-D ストリップ比色窓（扉越し目視・電源不要）</text>
            <rect x="30" y="60" width="112" height="36" rx="6" fill="#0284c7"/>
            <text x="86" y="76" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">Level 0：青色</text>
            <text x="86" y="90" text-anchor="middle" font-size="7.6" font-weight="700" fill="#e0f2fe">健全（酸ガスなし）</text>
            <rect x="156" y="60" width="112" height="36" rx="6" fill="#10b981"/>
            <text x="212" y="76" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">Level 1：緑色</text>
            <text x="212" y="90" text-anchor="middle" font-size="7.6" font-weight="700" fill="#ecfdf5">初期劣化・隔離推奨</text>
            <rect x="282" y="60" width="112" height="36" rx="6" fill="#eab308"/>
            <text x="338" y="76" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0f172a">Level 2-3：黄色</text>
            <text x="338" y="90" text-anchor="middle" font-size="7.6" font-weight="700" fill="#422006">ビネガー危機！交換</text>
            <!-- Bottom Row: Acetic Acid Neutralization Chamber -->
            <rect x="18" y="118" width="118" height="96" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4"/>
            <text x="77" y="142" text-anchor="middle" font-size="9.2" font-weight="900" fill="#9f1239">酢酸ガス発生</text>
            <text x="77" y="162" text-anchor="middle" font-size="10.0" font-weight="900" fill="#e11d48">2 CH₃COOH</text>
            <text x="77" y="182" text-anchor="middle" font-size="7.8" font-weight="700" fill="#be123c">フィルム・接着剤</text>
            <text x="77" y="198" text-anchor="middle" font-size="7.8" font-weight="700" fill="#be123c">自己触媒劣化</text>
            <line x1="138" y1="166" x2="174" y2="166" stroke="#e11d48" stroke-width="2.6" marker-end="url(#db99-arrRed)"/>
            <rect x="178" y="118" width="104" height="96" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
            <text x="230" y="142" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0c4a6e">アルカリ分子篩</text>
            <text x="230" y="164" text-anchor="middle" font-size="10.4" font-weight="900" fill="#0284c7">+ K₂CO₃</text>
            <text x="230" y="184" text-anchor="middle" font-size="7.8" font-weight="700" fill="#0369a1">4A/13X 複合床</text>
            <text x="230" y="198" text-anchor="middle" font-size="7.8" font-weight="700" fill="#0369a1">化学中和捕獲</text>
            <line x1="284" y1="166" x2="314" y2="166" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db99-arrGreen)"/>
            <rect x="318" y="118" width="88" height="96" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
            <text x="362" y="144" text-anchor="middle" font-size="8.8" font-weight="900" fill="#14532d">無害な固体塩</text>
            <text x="362" y="166" text-anchor="middle" font-size="9.0" font-weight="900" fill="#15803d">CH₃COOK</text>
            <text x="362" y="186" text-anchor="middle" font-size="7.8" font-weight="700" fill="#166534">再揮発ゼロ</text>
            <text x="362" y="200" text-anchor="middle" font-size="7.8" font-weight="700" fill="#166534">伝染遮断！</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">美術館フィルムアーカイブ標準のIPI監視＋化学スカベンジャーを1基へ統合</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '酢酸ガス化学中和', 'K₂CO₃分子篩', '不揮発性酢酸カリウムへ固定', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, '目視診断', '青→緑→黄', 'IPI A-D 準拠', '#10b981')}
            ${drawKpiBox(122, 88, 112, 74, '消費電力', '0 W', '完全パッシブ動作', '#475569')}
            ${drawCompareFrame(0, 172, 234, 82, 'ビネガーシンドロームの恐怖', '#9f1239', '#fff1f2')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#9f1239">• 1本の劣化フィルムが隣の機材を侵食</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#be123c">• 銀塩フィルムとデジタル機材の安全同居</text>
          </g>
        `,
        cards: [
          { label: 'アーカイブ科学', line1: 'IPI A-D比色酸度インジケーター窓', line2: 'K₂CO₃添着 4A/13X分子篩中和床' },
          { label: '化学的メリット', line1: '揮発性酢酸を不揮発の塩へ永久固定', line2: '自己触媒劣化の伝染連鎖を断つ' },
          { label: 'カメラを守る意味', line1: 'フィルムとオールドレンズ鏡筒を保護', line2: '金属腐食・塗装軟化を未然回避' },
        ],
      });

    case 'db_corrosion_intercept_strip':
      return wrapDryboxHdSvg({
        badge: 'DB100',
        stepTag: '無揮発・反応銅LDPE',
        title: '反応性銅結合ポリマー「コロージョン・インターセプト」脱硫帯',
        analogy: '油や防錆ガスを一切出さず、接点を黒く錆びさせる硫黄ガスだけを永遠に食べ尽くす化学の盾',
        accent: '#b45309',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Zero-Outgassing Reactive Copper LDPE vs Toxic Oil VCI -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">ベル研特許 反応性銅ポリマー（左）vs 光学厳禁の一般VCI（右）</text>
            <!-- Left Half: Corrosion Intercept (SAFE) -->
            <rect x="16" y="34" width="192" height="176" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>
            <text x="112" y="54" text-anchor="middle" font-size="9.4" font-weight="900" fill="#78350f">✅ Corrosion Intercept</text>
            <!-- Polymer strip with reactive Cu nanoparticles -->
            <rect x="34" y="68" width="156" height="44" rx="6" fill="url(#db100-copper)" stroke="#78350f" stroke-width="1.3"/>
            <text x="112" y="88" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">反応性Cu粒子結合 LDPE</text>
            <text x="112" y="103" text-anchor="middle" font-size="7.6" font-weight="700" fill="#fef3c7">揮発ガス・油分 = 0 μg/g</text>
            <!-- Corrosive gases sucked IN -->
            <line x1="60" y1="146" x2="60" y2="116" stroke="#dc2626" stroke-width="2.2" marker-end="url(#db100-arrRed)"/>
            <line x1="112" y1="146" x2="112" y2="116" stroke="#dc2626" stroke-width="2.2" marker-end="url(#db100-arrRed)"/>
            <line x1="164" y1="146" x2="164" y2="116" stroke="#dc2626" stroke-width="2.2" marker-end="url(#db100-arrRed)"/>
            <text x="112" y="164" text-anchor="middle" font-size="8.6" font-weight="900" fill="#991b1b">H₂S・SO₂・Cl₂・O₃ を吸引固定</text>
            <text x="112" y="182" text-anchor="middle" font-size="8.0" font-weight="800" fill="#15803d">Cu + H₂S → Cu₂S（永久中和）</text>
            <text x="112" y="198" text-anchor="middle" font-size="7.8" font-weight="700" fill="#166534">レンズ曇りゼロ・金接点ピカピカ</text>
            <!-- Right Half: Standard VCI (BAD FOR OPTICS!) -->
            <rect x="218" y="34" width="190" height="176" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4"/>
            <text x="313" y="54" text-anchor="middle" font-size="9.4" font-weight="900" fill="#9f1239">❌ 一般的な気化性防錆(VCI)</text>
            <rect x="242" y="68" width="142" height="44" rx="6" fill="#fda4af" stroke="#e11d48" stroke-width="1.3"/>
            <text x="313" y="88" text-anchor="middle" font-size="8.6" font-weight="900" fill="#881337">アミン・油系 VCI紙</text>
            <text x="313" y="103" text-anchor="middle" font-size="7.6" font-weight="700" fill="#9f1239">防錆ガスを庫内へ放出</text>
            <line x1="274" y1="114" x2="274" y2="146" stroke="#e11d48" stroke-width="2.2" marker-end="url(#db100-arrRed)"/>
            <line x1="352" y1="114" x2="352" y2="146" stroke="#e11d48" stroke-width="2.2" marker-end="url(#db100-arrRed)"/>
            <text x="313" y="166" text-anchor="middle" font-size="8.6" font-weight="900" fill="#be123c">レンズ前玉へ再凝縮！</text>
            <text x="313" y="184" text-anchor="middle" font-size="8.0" font-weight="700" fill="#881337">白い油膜曇り（ヘイズ）発生</text>
            <text x="313" y="199" text-anchor="middle" font-size="7.8" font-weight="700" fill="#881337">光学機器には絶対使用禁止</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">大英博物館・ボストン美術館CAMEO推奨の「無揮発・犠牲銅」技術を採用</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '揮発アウトガス放出', '0 μg/g', 'アミン・シリコーン完全ゼロ', '#16a34a')}
            ${drawKpiBox(0, 88, 112, 74, '捕集ガス', 'H₂S/SO₂/Cl₂', '硫化黒変を阻止', '#b45309')}
            ${drawKpiBox(122, 88, 112, 74, '交換サイン', '赤銅→黒褐', '目視で寿命判定', '#334155')}
            ${drawCompareFrame(0, 172, 234, 82, 'カメラ接点への決定的な差', '#78350f', '#fffbeb')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#78350f">• マウント電子接点の硫化通信エラー防止</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#92400e">• 銀蒸着ミラー・真鍮鏡筒の黒変根絶</text>
          </g>
        `,
        cards: [
          { label: 'ベル研特許素材', line1: '反応性銅粒子結合LDPEポリマー', line2: '揮発成分ゼロ（レンズ曇りゼロ）' },
          { label: '化学的メカニズム', line1: '大気ppb級のH₂S・SO₂を優先捕獲', line2: '消費が進むと赤銅→黒褐色へ変色' },
          { label: 'カメラを守る意味', line1: 'マウント金接点・電池端子の錆防止', line2: '美術館レベルの長期金属防食保護' },
        ],
      });

    default:
      return null;
  }
}
