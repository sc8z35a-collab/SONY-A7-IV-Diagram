import { drawCompareFrame, drawKpiBox, drawPill, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group A (11 Parts: DB01–DB11):
 * Optical Door, Glazing, Sealing, Hinges, Biometric Lock, E-Ink UI & SHT45/SGP41 Sensors.
 */
export function renderDryboxGroupASvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_door_alu_frame':
      return wrapDryboxHdSvg({
        badge: 'DB01',
        stepTag: 'A6063-T5 / 平面度 ≤0.25mm',
        title: 'CNCアルミ押出ドアフレーム ＆ フラッシュハンドル断面構造',
        analogy: '絶対にねじれない特注アルミの額縁で、ガラスとパッキンを360°密着',
        accent: '#1e293b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Hollow Box Extrusion Cross-Section -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="320" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="160" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">中空ボックス断面 ＆ 一体フラッシュハンドル（水平断面）</text>
            <!-- Hollow aluminum extrusion profile -->
            <path d="M 38 66 L 210 66 L 210 112 L 246 112 L 246 156 L 178 156 L 178 140 L 194 140 L 194 112 L 38 112 Z" fill="url(#db01-dark)" stroke="#0f172a" stroke-width="1.6"/>
            <!-- Hollow closed cells -->
            <rect x="52" y="76" width="60" height="26" rx="3" fill="#ffffff" stroke="#64748b"/>
            <rect x="122" y="76" width="64" height="26" rx="3" fill="#ffffff" stroke="#64748b"/>
            <!-- Glass inset inside rebate -->
            <rect x="38" y="114" width="108" height="22" rx="2" fill="url(#db01-glass)" stroke="#0284c7" stroke-width="1.4"/>
            <text x="92" y="129" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0c4a6e">強化ガラス 4mm</text>
            <!-- Flush finger recess -->
            <path d="M 218 112 Q 230 132 214 148" fill="none" stroke="#0284c7" stroke-width="2.2" stroke-dasharray="3 2"/>
            <text x="252" y="136" font-size="9.5" font-weight="800" fill="#0284c7">指掛かり溝</text>
            <text x="252" y="149" font-size="8.8" font-weight="600" fill="#475569">突起ゼロ安全</text>
            <!-- EPDM gasket behind frame -->
            <rect x="50" y="140" width="90" height="14" rx="4" fill="#334155"/>
            <text x="95" y="150.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#ffffff">気密パッキン密着面</text>
            ${drawPin(82, 88, 72, 192, 1, '中空閉断面リブ', 'ねじり剛性 4倍超', '#0f172a')}
            ${drawPin(158, 76, 210, 192, 2, '15µm 硬質アルマイト', '手汗腐食＆傷防止', '#0284c7')}
            <text x="160" y="236" text-anchor="middle" font-size="9.5" font-weight="700" fill="#475569">45°マイター角＋SUS304内部L字キー圧入で20年反りゼロ</text>
          </g>

          <!-- Right: Torsion Comparison -->
          <g transform="translate(362, 82)">
            ${drawCompareFrame(0, 0, 330, 118, '✅ 中空押出アルミ枠（本機 DB01）', '#16a34a', '#f0fdf4')}
            <rect x="20" y="42" width="136" height="58" rx="4" fill="none" stroke="#1e293b" stroke-width="6"/>
            <line x1="18" y1="42" x2="158" y2="42" stroke="#16a34a" stroke-width="2" stroke-dasharray="4 2"/>
            <text x="172" y="56" font-size="10.2" font-weight="800" fill="#14532d">片手開閉でも対角が浮かない</text>
            <text x="172" y="74" font-size="9.4" font-weight="600" fill="#166534">平面度 ≤ 0.25mm/m 維持</text>
            <text x="172" y="92" font-size="9.4" font-weight="600" fill="#166534">→ 全周パッキン圧縮が均一!</text>

            ${drawCompareFrame(0, 130, 330, 120, '❌ 従来の薄い折曲鉄板・樹脂枠', '#e11d48', '#fff1f2')}
            <polygon points="24,174 152,166 156,228 20,232" fill="none" stroke="#9f1239" stroke-width="4" stroke-dasharray="4 2"/>
            <text x="172" y="184" font-size="10.2" font-weight="800" fill="#881337">長年の開閉で角が歪む</text>
            <text x="172" y="202" font-size="9.4" font-weight="600" fill="#9f1239">パッキンに 1mm の隙間発生</text>
            <text x="172" y="220" font-size="9.4" font-weight="600" fill="#9f1239">→ 外の湿気が常時流入!</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: 'A6063-T5 中空ボックス押出枠', line2: 'SUS304 L字コーナーキー圧入' },
          { label: '物理的メリット', line1: '片手で引いてもねじり歪みゼロ', line2: '突起ゼロの一体型フラッシュ溝' },
          { label: 'カメラを守る意味', line1: '扉の反り＝気密崩壊の最大原因', line2: '20年間スキマゼロ密閉を土台支え' },
        ],
      });

    case 'db_door_lowe_glass':
      return wrapDryboxHdSvg({
        badge: 'DB02',
        stepTag: 'UV-400 ≥99.5% / Low-E',
        title: 'Low-E 銀スパッタ遮熱 ＋ UV-400カット強化ガラスの波長選択光学',
        analogy: '見える光だけスッと通し、夏の熱線とゴムを痛める紫外線を鏡のように弾く盾',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Cross-section of 4mm Tempered Glass + Low-E Ag Stack -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="440" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="220" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">波長別スペクトル遮断メカニズム（左：部屋外 → 右：防湿庫内）</text>

            <!-- Tempered Glass Slab -->
            <rect x="196" y="42" width="46" height="176" rx="4" fill="url(#db02-glass)" stroke="#0284c7" stroke-width="1.6"/>
            <text x="219" y="134" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0c4a6e" transform="rotate(-90 219 134)">熱強化ガラス 4.0mm</text>
            <!-- Low-E Silver Sputter Coating on inner face -->
            <rect x="242" y="44" width="7" height="172" fill="#cbd5e1" stroke="#475569"/>
            <!-- UV-400 Blocking Film -->
            <rect x="189" y="44" width="7" height="172" fill="#7c3aed" fill-opacity="0.45" stroke="#6d28d9"/>

            <!-- Ray 1: UV-A / UV-B (<=400nm) Blocked! -->
            <line x1="28" y1="74" x2="184" y2="74" stroke="#7c3aed" stroke-width="2.8" marker-end="url(#db02-arrPurple)"/>
            <text x="34" y="66" font-size="9.8" font-weight="800" fill="#6d28d9">紫外線 UV (280–400nm)</text>
            <text x="150" y="90" font-size="9.2" font-weight="800" fill="#e11d48">99.5% 遮断!</text>

            <!-- Ray 2: Visible Light (400-700nm) Passes cleanly! -->
            <line x1="28" y1="130" x2="412" y2="130" stroke="#059669" stroke-width="3.0" marker-end="url(#db02-arrGreen)"/>
            <text x="34" y="122" font-size="9.8" font-weight="800" fill="#047857">可視光 (400–700nm)</text>
            <text x="276" y="122" font-size="9.8" font-weight="800" fill="#047857">クリア透過（機材を確認）</text>

            <!-- Ray 3: Long-wave Thermal IR Reflected by Low-E Ag! -->
            <polyline points="28,176 238,176 92,208" fill="none" stroke="#e11d48" stroke-width="2.8" marker-end="url(#db02-arrRed)"/>
            <text x="34" y="168" font-size="9.8" font-weight="800" fill="#be123c">熱線 赤外線 IR (＞2500nm)</text>
            <text x="268" y="182" font-size="9.5" font-weight="800" fill="#be123c">Low-E 銀層が反射!</text>
            <text x="268" y="196" font-size="8.8" font-weight="600" fill="#475569">庫内への輻射熱を遮断</text>

            <text x="220" y="236" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0369a1">表面圧縮応力 ≈ 100 MPa の熱強化ガラスで耐衝撃性は通常ガラスの 4–5 倍</text>
          </g>

          <!-- Right: KPI Stack -->
          <g transform="translate(480, 82)">
            ${drawKpiBox(0, 0, 212, 76, '紫外線 UV-400 遮断率', '≥ 99.5%', 'ゴムグリップ・本革の劣化防止', '#7c3aed')}
            ${drawKpiBox(0, 87, 212, 76, 'Low-E 放射率 ε', '≤ 0.08', '熱貫流率を大幅カット・防露', '#e11d48')}
            ${drawKpiBox(0, 174, 212, 76, '熱強化ガラス強度', '4〜5×', '耐衝撃・飛散抑制安全ガラス', '#0284c7')}
          </g>
        `,
        cards: [
          { label: 'Low-E の正体', line1: '真空スパッタ極薄 銀(Ag)多層膜', line2: '可視光は通し熱波(IR)だけ反射' },
          { label: 'UV-400 防御', line1: 'UV-A/B を 99.5% 以上カット', line2: 'ゴム硬化・レンズ鏡筒退色を阻止' },
          { label: '結露への貢献', line1: '日射・暖房による庫内温度乱れを', line2: 'ガラス扉面でシャットアウト!' },
        ],
      });

    case 'db_door_ar_esd_coat':
      return wrapDryboxHdSvg({
        badge: 'DB03',
        stepTag: 'AR <0.8% / ITO ≤10⁸Ω',
        title: '博物館級 低反射AR ＆ 透明導電ITO帯電防止コート（二重ナノ薄膜）',
        analogy: '顔が映らない美術館ガラス＋ホコリを跳ね返す透明な静電気の逃げ道',
        accent: '#0ea5e9',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Optical Destructive Interference (AR) -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="324" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="162" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">① 光学干渉 ARコート（反射率 4% → 0.8%未満）</text>
            <!-- Layers -->
            <rect x="28" y="138" width="268" height="22" fill="#bae6fd" stroke="#0284c7"/>
            <text x="162" y="153" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">SiO₂ / Nb₂O₅ 多層AR膜（膜厚 λ/4）</text>
            <rect x="28" y="160" width="268" height="44" fill="url(#db03-glass)" stroke="#0284c7"/>
            <text x="162" y="186" text-anchor="middle" font-size="10.0" font-weight="800" fill="#0c4a6e">強化ガラス母材</text>
            <!-- Incoming ray -->
            <line x1="62" y1="44" x2="128" y2="138" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db03-arrBlue)"/>
            <!-- Reflected waves cancelling out -->
            <path d="M 128 138 Q 144 104 160 88 Q 176 72 192 50" fill="none" stroke="#e11d48" stroke-width="2.0"/>
            <path d="M 148 160 Q 164 126 180 100 Q 196 84 212 58" fill="none" stroke="#e11d48" stroke-width="2.0" stroke-dasharray="4 2"/>
            <rect x="194" y="42" width="112" height="42" rx="7" fill="#dcfce7" stroke="#16a34a"/>
            <text x="250" y="59" text-anchor="middle" font-size="9.5" font-weight="800" fill="#14532d">逆位相で打ち消し!</text>
            <text x="250" y="74" text-anchor="middle" font-size="9.0" font-weight="700" fill="#166534">ギラつき 1/5 以下</text>
            ${drawPill(46, 214, 232, '庫内の愛機が美術館のように鮮明', true)}
          </g>

          <!-- Right: Transparent ESD-ITO Static Bleed -->
          <g transform="translate(366, 82)">
            <rect x="0" y="0" width="326" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="163" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">② 透明導電ITO膜（静電気＆ホコリ吸塵ブロック）</text>
            <!-- ITO layer + perimeter gold busbar -->
            <rect x="30" y="88" width="236" height="26" rx="4" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.6"/>
            <text x="148" y="105" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">透明ITO導電膜 (R_s ≤ 10⁸ Ω/sq)</text>
            <!-- Static charges flowing to right busbar -> ground -->
            <circle cx="62" cy="70" r="8" fill="#f59e0b"/>
            <text x="62" y="73.5" text-anchor="middle" font-size="9" font-weight="900" fill="#fff">−</text>
            <circle cx="122" cy="70" r="8" fill="#f59e0b"/>
            <text x="122" y="73.5" text-anchor="middle" font-size="9" font-weight="900" fill="#fff">−</text>
            <line x1="72" y1="101" x2="254" y2="101" stroke="#059669" stroke-width="2.4" marker-end="url(#db03-arrGreen)"/>
            <!-- Busbar + BeCu spring -->
            <rect x="266" y="74" width="28" height="54" rx="4" fill="#eab308" stroke="#854d0e"/>
            <text x="280" y="104" text-anchor="middle" font-size="8.5" font-weight="800" fill="#422006" transform="rotate(-90 280 104)">銀バス</text>
            <line x1="280" y1="128" x2="280" y2="174" stroke="#059669" stroke-width="2.4" marker-end="url(#db03-arrGreen)"/>
            <text x="240" y="188" font-size="9.5" font-weight="800" fill="#047857">筐体アースへ安全逃がし</text>
            <!-- Dust particles repelled -->
            <circle cx="72" cy="148" r="5" fill="#64748b"/>
            <circle cx="104" cy="162" r="4" fill="#64748b"/>
            <path d="M 80 144 Q 112 128 142 152" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3 2"/>
            <text x="42" y="182" font-size="9.4" font-weight="700" fill="#334155">帯電しない＝ホコリが張り付かない!</text>
            ${drawPill(44, 214, 238, 'IEC 61340-5-1 ESD安全基準クリア', true)}
          </g>
        `,
        cards: [
          { label: '低反射 AR膜', line1: 'SiO₂/Nb₂O₅ 干渉コート', line2: '片面反射率 4% → 0.8% 未満' },
          { label: '帯電防止 ITO', line1: '表面抵抗 ≤ 10⁸ Ω/sq 拡散帯', line2: '銀バス＋バネ接点でアース放電' },
          { label: '撮影者への恩恵', line1: '冬にクロスで拭いても静電ゼロ', line2: 'チリ・カビ胞子の吸着を根本防止' },
        ],
      });

    case 'db_magnetic_epdm_gasket':
      return wrapDryboxHdSvg({
        badge: 'DB04',
        stepTag: '無硫黄EPDM / 2重リップ',
        title: 'マグネット内蔵 デュアルリップEPDM気密パッキン断面',
        analogy: '冷蔵庫の磁気ドアシールを2重迷路にした「湿気シャットアウトの門番」',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Magnified Cross-Section of Magnetic Dual-Lip Gasket -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="410" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="205" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">ドア閉鎖時の磁力圧着＆2重リップ気密断面図</text>
            <!-- Steel Cabinet Flange (Right) -->
            <rect x="292" y="42" width="36" height="174" rx="3" fill="url(#db04-steel)" stroke="#475569" stroke-width="1.4"/>
            <text x="310" y="130" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1e293b" transform="rotate(-90 310 130)">SPCC鋼板フランジ</text>
            <!-- Aluminum Door Frame (Left) -->
            <rect x="52" y="42" width="44" height="174" rx="3" fill="url(#db04-dark)" stroke="#0f172a"/>
            <text x="74" y="130" text-anchor="middle" font-size="9.5" font-weight="800" fill="#f8fafc" transform="rotate(-90 74 130)">アルミドア枠</text>
            <!-- EPDM Hollow Bellows Body -->
            <path d="M 96 76 L 198 64 L 290 64 L 290 116 L 198 116 L 198 144 L 290 144 L 290 184 L 96 184 Z" fill="#334155" stroke="#0f172a" stroke-width="1.4"/>
            <!-- Hollow Air Cushion Chamber -->
            <rect x="116" y="92" width="66" height="72" rx="8" fill="#f1f5f9" stroke="#64748b"/>
            <text x="149" y="132" text-anchor="middle" font-size="9.0" font-weight="800" fill="#334155">中空クッション</text>
            <!-- Embedded Ferrite Magnet Strip -->
            <rect x="212" y="72" width="66" height="36" rx="4" fill="#dc2626" stroke="#7f1d1d"/>
            <text x="245" y="94" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">フェライト磁石</text>
            <!-- Magnetic Pull Arrows -->
            <line x1="278" y1="84" x2="296" y2="84" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#db04-arrAmber)"/>
            <line x1="278" y1="98" x2="296" y2="98" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#db04-arrAmber)"/>
            <!-- Blocked humid air arrow from outside -->
            <path d="M 244 36 L 244 58" stroke="#0284c7" stroke-width="2.5" marker-end="url(#db04-arrBlue)"/>
            <text x="190" y="49" font-size="9.2" font-weight="800" fill="#0284c7">外気の湿気</text>
            <text x="348" y="88" font-size="9.4" font-weight="800" fill="#dc2626">第1主リップ</text>
            <text x="348" y="168" font-size="9.4" font-weight="800" fill="#059669">第2補助リップ</text>
            <text x="205" y="236" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">無硫黄・プラチナ硬化配合のため金属接点を黒ずませるガス発生ゼロ</text>
          </g>

          <!-- Right: Material & Performance Comparison -->
          <g transform="translate(452, 82)">
            ${drawKpiBox(0, 0, 240, 76, '水蒸気侵入低減', '−65%', '従来単リップ比の気密改善', '#0284c7')}
            ${drawKpiBox(0, 87, 240, 76, '加硫アウトガス', '無硫黄', '銀/金レンズ接点の硫化黒化ゼロ', '#16a34a')}
            ${drawKpiBox(0, 174, 240, 76, '全周圧着方式', '360°磁力', '段差を中空蛇腹が自動追従吸収', '#d97706')}
          </g>
        `,
        cards: [
          { label: '2重リップ迷路', line1: '主リップ＋補助リップの二重壁', line2: '湿気拡散距離を2倍以上に延長' },
          { label: '無硫黄エラストマー', line1: '安価な硫黄加硫ゴムを不使用', line2: '電子接点の腐食・白濁をゼロ化' },
          { label: '省エネ効果', line1: '外気漏れが極小だからこそ', line2: '平均0.5–1.5Wの超省エネが実現!' },
        ],
      });

    case 'db_concealed_damp_hinge':
      return wrapDryboxHdSvg({
        badge: 'DB05',
        stepTag: '180°開閉 / 油圧ソフトクローズ',
        title: '180°多関節コンシールド ＆ 油圧ロータリーダンパー丁番',
        analogy: '高級キッチンのように「スゥーッ…ピタッ」と無衝撃で閉まる蝶番',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: 7-Bar Articulated Kinematics + Hydraulic Damper -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="178" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">7節多関節リンク ＆ 油圧ロータリーダンパー減衰軌道</text>
            <!-- Cabinet corner -->
            <rect x="44" y="130" width="76" height="72" rx="4" fill="url(#db05-steel)" stroke="#475569"/>
            <text x="82" y="170" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1e293b">本体側カップ</text>
            <!-- Articulated scissor links -->
            <line x1="94" y1="138" x2="176" y2="96" stroke="#0f172a" stroke-width="5.5" stroke-linecap="round"/>
            <line x1="94" y1="158" x2="188" y2="112" stroke="#64748b" stroke-width="4.5" stroke-linecap="round"/>
            <!-- Hydraulic Damper Cylinder -->
            <circle cx="136" cy="128" r="16" fill="#ea580c" stroke="#9a3412" stroke-width="1.6"/>
            <text x="136" y="131" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">OIL</text>
            <!-- Door Swing Arc 0 -> 180 deg -->
            <path d="M 192 174 A 96 96 0 0 0 186 56" fill="none" stroke="#0284c7" stroke-width="2.4" stroke-dasharray="5 3" marker-end="url(#db05-arrBlue)"/>
            <!-- Soft close zone highlight (0-25 deg) -->
            <path d="M 206 168 A 96 96 0 0 0 232 132" fill="none" stroke="#16a34a" stroke-width="5.5" opacity="0.7"/>
            <text x="234" y="84" font-size="10.0" font-weight="800" fill="#0284c7">最大 180° 開口</text>
            <text x="234" y="98" font-size="8.8" font-weight="600" fill="#475569">大型望遠も干渉ゼロ</text>
            <text x="238" y="156" font-size="9.6" font-weight="800" fill="#15803d">25°以下で油圧減速</text>
            <text x="238" y="170" font-size="8.8" font-weight="600" fill="#166534">ソフトクローズ領域</text>
            <text x="178" y="232" text-anchor="middle" font-size="9.4" font-weight="700" fill="#475569">閉鎖時は外から一切見えない完全コンシールド（隠蔽）構造</text>
          </g>

          <!-- Right: Shock Acceleration Graph -->
          <g transform="translate(396, 82)">
            <rect x="0" y="0" width="296" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="148" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">閉扉時の棚上ショック加速度 比較</text>
            <line x1="36" y1="186" x2="274" y2="186" stroke="#64748b" stroke-width="1.2"/>
            <line x1="36" y1="42" x2="36" y2="186" stroke="#64748b" stroke-width="1.2"/>
            <!-- Conventional Slam Spike -->
            <path d="M 42 184 L 116 184 L 128 54 L 142 184 L 154 148 L 166 184 L 268 184" fill="none" stroke="#e11d48" stroke-width="2.4"/>
            <text x="146" y="64" font-size="9.5" font-weight="800" fill="#be123c">従来丁番：バタン! 衝撃大</text>
            <text x="146" y="78" font-size="8.6" font-weight="600" fill="#9f1239">IBIS・レンズ転がり危険</text>
            <!-- Hydraulic Soft Close Flat Curve -->
            <path d="M 42 184 Q 130 180 180 174 Q 220 180 268 184" fill="none" stroke="#16a34a" stroke-width="3.2"/>
            <text x="128" y="164" font-size="9.8" font-weight="800" fill="#15803d">本機：衝撃 90% 以上カット!</text>
            ${drawPill(34, 206, 228, '10万回開閉試験・扉垂れ下がりゼロ', true)}
          </g>
        `,
        cards: [
          { label: '7節コンシールド', line1: '閉鎖時は金具が外から見えない', line2: '180°全開で長玉出し入れ快適' },
          { label: '油圧ソフトクローズ', line1: '25°以下でシリコーン粘性減速', line2: 'τ = c·ω で勢いを優しく吸収' },
          { label: '光学機材保護', line1: '扉を閉めるショック振動を90%減', line2: 'IBISユニットやレンズのズレ防止' },
        ],
      });

    case 'db_biometric_fingerprint_pad':
      return wrapDryboxHdSvg({
        badge: 'DB06',
        stepTag: '508 dpi 3D生体 + NFC',
        title: '静電容量式3D生体指紋 ＆ ISO 14443 NFCスマート認証モジュール',
        analogy: '鍵探しゼロ！0.3秒で「生きている本物の指」だけを見抜くスマート解錠',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          <!-- Left: Sub-dermal Capacitive + RF Liveness Diagram -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="178" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">表皮凹凸（静電容量）＋ 真皮RF生体検知の二重チェック</text>
            <!-- Finger skin ridges -->
            <path d="M 52 52 Q 178 36 304 52 L 304 92 Q 286 106 270 92 Q 252 108 234 92 Q 216 108 198 92 Q 180 108 162 92 Q 144 108 126 92 Q 108 108 90 92 Q 72 106 52 92 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="1.4"/>
            <text x="178" y="72" text-anchor="middle" font-size="10.0" font-weight="800" fill="#9a3412">生きている指の真皮層（微弱RF生体信号あり）</text>
            <!-- Gold bezel + protective sapphire coat -->
            <rect x="46" y="114" width="264" height="12" fill="#eab308" stroke="#854d0e"/>
            <!-- Semiconductor capacitive sensor array -->
            <rect x="46" y="126" width="264" height="32" rx="3" fill="#1e293b"/>
            ${[70, 106, 142, 178, 214, 250, 286].map((x) => `<rect x="${x - 10}" y="131" width="20" height="22" rx="2" fill="#6366f1"/>`).join('')}
            <!-- Electric field lines -->
            <line x1="126" y1="100" x2="126" y2="126" stroke="#22c55e" stroke-width="2" stroke-dasharray="2 2"/>
            <line x1="162" y1="100" x2="162" y2="126" stroke="#22c55e" stroke-width="2" stroke-dasharray="2 2"/>
            <line x1="198" y1="100" x2="198" y2="126" stroke="#22c55e" stroke-width="2" stroke-dasharray="2 2"/>
            ${drawPin(178, 142, 178, 192, 1, '508 dpi 半導体アレイ', '山と谷の距離差を容量マップ化', '#4f46e5', 'middle')}
            <text x="178" y="236" text-anchor="middle" font-size="9.4" font-weight="700" fill="#4338ca">シリコン偽造指紋や写真コピーは真皮RF反応ゼロで完全ブロック!</text>
          </g>

          <!-- Right: Local Secure Element + NFC Multi-User -->
          <g transform="translate(396, 82)">
            <rect x="0" y="0" width="296" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="148" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">ローカル暗号照合 ＆ NFCマルチユーザー</text>
            ${drawKpiBox(14, 34, 128, 72, '認証スピード', '< 0.3 秒', '触れるだけで即解錠', '#4f46e5')}
            ${drawKpiBox(154, 34, 128, 72, '登録キャパ', '20指+10NFC', 'スタジオ共有も安心', '#0284c7')}
            <rect x="14" y="120" width="268" height="62" rx="8" fill="#eef2ff" stroke="#6366f1"/>
            <text x="148" y="139" text-anchor="middle" font-size="10.2" font-weight="800" fill="#312e81">🔒 Secure Element 機内完結保存</text>
            <text x="148" y="156" text-anchor="middle" font-size="9.2" font-weight="600" fill="#4338ca">指紋データはクラウドへ一切送信しないため</text>
            <text x="148" y="170" text-anchor="middle" font-size="9.2" font-weight="600" fill="#4338ca">生体情報漏洩リスクゼロ・オフライン動作OK</text>
            ${drawPill(28, 200, 240, 'NFCタッチ開閉ログ（誰がいつ開閉か記録）', true)}
          </g>
        `,
        cards: [
          { label: '生体検知技術', line1: '508 dpi 静電容量＋真皮RF判定', line2: '誤認識率 FAR < 0.001%' },
          { label: 'プライバシー安全', line1: '内蔵セキュアエレメント完結照合', line2: '外部サーバーへ指紋データ不送信' },
          { label: '現場での便利さ', line1: '鍵を探すストレスゼロで0.3秒開錠', line2: 'スタジオ複数スタッフはNFC管理' },
        ],
      });

    case 'db_solenoid_deadbolt_lock':
      return wrapDryboxHdSvg({
        badge: 'DB07',
        stepTag: '待機 0W / 非常2系統救済',
        title: '双安定電磁ソレノイド錠 ＆ 停電フェイルセキュア非常解錠構造',
        analogy: '動く一瞬だけ電気を使い、ロック中は磁石で0W保持する二重のカンヌキ',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Bi-Stable Latching Solenoid Mechanism -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="420" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="210" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">双安定（バイステーブル）ラッチングソレノイド動作図</text>
            <!-- Solenoid coil housing -->
            <rect x="44" y="64" width="136" height="80" rx="8" fill="#1e293b" stroke="#0f172a"/>
            <!-- Copper windings -->
            ${[58, 76, 94, 112, 130, 148].map((x) => `<rect x="${x}" y="72" width="12" height="64" rx="2" fill="url(#db07-copper)"/>`).join('')}
            <!-- Permanent magnet holder -->
            <rect x="26" y="78" width="18" height="52" rx="3" fill="#dc2626"/>
            <text x="35" y="108" text-anchor="middle" font-size="8.2" font-weight="900" fill="#fff" transform="rotate(-90 35 108)">磁石</text>
            <!-- Hardened SUS304 Deadbolt Pin -->
            <rect x="180" y="88" width="124" height="32" rx="4" fill="url(#db07-steel)" stroke="#334155" stroke-width="1.5"/>
            <text x="242" y="108" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">SUS304 硬化カンヌキ</text>
            <!-- Door Strike Plate -->
            <rect x="304" y="54" width="26" height="100" rx="3" fill="#475569"/>
            <rect x="304" y="84" width="20" height="40" fill="#ffffff" stroke="#334155"/>
            <!-- Pulse Arrow -->
            <line x1="200" y1="68" x2="280" y2="68" stroke="#0284c7" stroke-width="2.4" marker-end="url(#db07-arrBlue)"/>
            <text x="240" y="60" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0284c7">80ms パルスのみ通電</text>
            <!-- Emergency Mechanical Key + USB-C Jump below -->
            <rect x="44" y="168" width="166" height="58" rx="8" fill="#fffbeb" stroke="#d97706"/>
            <text x="127" y="187" text-anchor="middle" font-size="9.8" font-weight="800" fill="#92400e">🔑 隠し機械ディンプル錠</text>
            <text x="127" y="205" text-anchor="middle" font-size="8.8" font-weight="600" fill="#78350f">完全無電源でも手動解錠可能</text>
            <rect x="224" y="168" width="168" height="58" rx="8" fill="#eff6ff" stroke="#2563eb"/>
            <text x="308" y="187" text-anchor="middle" font-size="9.8" font-weight="800" fill="#1e40af">⚡ 外部USB-C 5V給電口</text>
            <text x="308" y="205" text-anchor="middle" font-size="8.8" font-weight="600" fill="#1d4ed8">モバイル電池で緊急指紋解錠</text>
          </g>

          <!-- Right: Security KPIs -->
          <g transform="translate(460, 82)">
            ${drawKpiBox(0, 0, 232, 76, '施錠待機電力', '0.00 W', '永久磁石保持・コイル発熱ゼロ', '#16a34a')}
            ${drawKpiBox(0, 87, 232, 76, '停電時セキュリティ', '施錠維持', 'フェイルセキュアで盗難防止', '#4f46e5')}
            ${drawKpiBox(0, 174, 232, 76, '非常開錠ルート', '2系統冗長', '物理キー ＋ 外部USB-C給電', '#d97706')}
          </g>
        `,
        cards: [
          { label: '0Wラッチ機構', line1: '開閉の 80ms だけ電流パルス', line2: '常時発熱しないから庫内温度安定' },
          { label: '防犯フェイルセキュア', line1: 'コンセントを抜かれても施錠保持', line2: '高価なレンズ資産をしっかり防御' },
          { label: '閉じ込めゼロ設計', line1: '万一の完全放電・故障時でも', line2: '物理ディンプル鍵＆USB-Cで救済' },
        ],
      });

    case 'db_eink_touch_bezel':
      return wrapDryboxHdSvg({
        badge: 'DB08',
        stepTag: '双安定 E-Ink / 停電時保持',
        title: '電子ペーパー（E-Ink）常時表示 ＋ 完全フラット静電タッチ操作部',
        analogy: '寝室でも眩しくなく、コンセントを抜いても文字が消えない紙のような計器',
        accent: '#0f172a',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Top: Realistic Front Bezel Mockup -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="108" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.6"/>
            <!-- E-Ink Paper Window -->
            <rect x="20" y="16" width="380" height="76" rx="8" fill="#e8edf2" stroke="#64748b" stroke-width="1.4"/>
            <line x1="210" y1="24" x2="210" y2="84" stroke="#94a3b8" stroke-width="1.2"/>
            <!-- Upper Zone Readout -->
            <text x="34" y="34" font-size="9.5" font-weight="800" fill="#475569">UPPER CAMERA ZONE</text>
            <text x="34" y="64" font-size="24" font-weight="900" fill="#0f172a">40.2%</text>
            <text x="130" y="54" font-size="11.5" font-weight="800" fill="#0284c7">22.4°C</text>
            <text x="130" y="72" font-size="9.2" font-weight="700" fill="#059669">露点余裕 +14.2°C</text>
            <!-- Lower Zone Readout -->
            <text x="224" y="34" font-size="9.5" font-weight="800" fill="#475569">LOWER CINE / ARCHIVE</text>
            <text x="224" y="64" font-size="24" font-weight="900" fill="#0f172a">35.0%</text>
            <text x="320" y="54" font-size="11.5" font-weight="800" fill="#0284c7">21.9°C</text>
            <text x="320" y="72" font-size="9.2" font-weight="700" fill="#059669">VOC: 98 清浄</text>
            <!-- 4 Capacitive Touch Rings -->
            ${[
              { x: 446, lbl: 'RH −' },
              { x: 506, lbl: 'RH +' },
              { x: 566, lbl: 'LED' },
              { x: 626, lbl: 'BOOST' },
            ]
              .map(
                (b) => `
              <circle cx="${b.x}" cy="54" r="21" fill="#1e293b" stroke="#38bdf8" stroke-width="1.6"/>
              <text x="${b.x}" y="58" text-anchor="middle" font-size="9.8" font-weight="800" fill="#e0f2fe">${b.lbl}</text>
            `
              )
              .join('')}
          </g>

          <!-- Bottom: Microcapsule Electrophoresis Principle -->
          <g transform="translate(26, 202)">
            <rect x="0" y="0" width="424" height="130" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="212" y="20" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">電気泳動マイクロカプセル原理（画面維持＝0 W！）</text>
            <rect x="30" y="36" width="364" height="14" fill="#bae6fd" stroke="#0284c7"/>
            <text x="212" y="46.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#0369a1">透明上部電極（反射光で見るから目が疲れず眩しくない）</text>
            ${[76, 144, 212, 280, 348]
              .map(
                (cx, idx) => `
              <circle cx="${cx}" cy="76" r="21" fill="#ffffff" stroke="#475569" stroke-width="1.2"/>
              <circle cx="${cx - 6}" cy="${idx % 2 === 0 ? 66 : 84}" r="4.5" fill="#0f172a"/>
              <circle cx="${cx + 6}" cy="${idx % 2 === 0 ? 68 : 86}" r="4.5" fill="#0f172a"/>
              <circle cx="${cx - 5}" cy="${idx % 2 === 0 ? 84 : 66}" r="4.5" fill="#e2e8f0" stroke="#64748b"/>
              <circle cx="${cx + 6}" cy="${idx % 2 === 0 ? 85 : 68}" r="4.5" fill="#e2e8f0" stroke="#64748b"/>
            `
              )
              .join('')}
            <rect x="30" y="102" width="364" height="14" fill="#334155"/>
            <text x="212" y="112.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#f8fafc">下部画素電極：電気を切っても白黒粒子がその位置にピタッと留まる</text>
          </g>

          <g transform="translate(464, 202)">
            ${drawKpiBox(0, 0, 230, 60, '表示維持電力・発熱', '≈ 0 μW', '寝室光害なし・熱持ち込みゼロ', '#0f172a')}
            ${drawKpiBox(0, 70, 230, 60, '停電時の視認性', '永続保持', '最後の温湿度が消えずに残る', '#0284c7')}
          </g>
        `,
        cards: [
          { label: '紙のような視認性', line1: '視野角180°の反射型E-Ink表示', line2: '暗い寝室でも眩しく光らない' },
          { label: '停電履歴キープ', line1: '双安定粒子で電源断でも表示維持', line2: '異常発生時の最終湿度を一目確認' },
          { label: '完全フラット防湿', line1: '物理ボタン穴を廃した静電タッチ', line2: '操作部からの湿気侵入ルートゼロ' },
        ],
      });

    case 'db_sht45_upper_sensor':
      return wrapDryboxHdSvg({
        badge: 'DB09',
        stepTag: '±1.0% RH / ±0.1°C',
        title: 'Sensirion SHT45-AD1F 第4世代CMOSens ＆ クリープ除去ヒーター',
        analogy: '誤差±1%のスイス製超精密頭脳＋自分で湿気ボケを焼き飛ばすマイクロヒーター',
        accent: '#0891b2',
        accentSoft: '#cffafe',
        body: `
          <!-- Left: SHT45 Chip Cutaway -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="178" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">SHT45-AD1F DFN-4 チップ内部断面（サイズ 1.5×1.5mm）</text>
            <!-- Protective PTFE Membrane Cap -->
            <rect x="74" y="48" width="208" height="16" rx="4" fill="#ffffff" stroke="#0891b2" stroke-width="1.6" stroke-dasharray="4 2"/>
            <text x="178" y="59.5" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0e7490">工場貼付 撥水PTFEフィルター膜（水蒸気のみ透過）</text>
            <!-- Polymer Capacitive Humidity Layer -->
            <rect x="94" y="76" width="168" height="28" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
            <text x="178" y="94" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0c4a6e">感湿ポリマー誘電体（水分子吸着で容量変化）</text>
            <!-- Integrated Creep-Mitigation Micro-Heater -->
            <rect x="94" y="106" width="168" height="16" rx="2" fill="url(#db09-heat)"/>
            <text x="178" y="117.5" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">オンチップ 自己診断・クリープ除去マイクロヒーター</text>
            <!-- CMOSens Silicon ASIC + ADC -->
            <rect x="64" y="124" width="228" height="46" rx="4" fill="#1e293b"/>
            <text x="178" y="144" text-anchor="middle" font-size="10.0" font-weight="800" fill="#38bdf8">CMOSens® ワンチップADC ＋ 温度バンドギャップ</text>
            <text x="178" y="160" text-anchor="middle" font-size="8.8" font-weight="600" fill="#cbd5e1">CRC-8 誤り検出付 デジタル I²C 出力</text>
            <!-- Leadframe gold pads -->
            <rect x="86" y="170" width="44" height="10" fill="#eab308"/>
            <rect x="226" y="170" width="44" height="10" fill="#eab308"/>
            <text x="178" y="204" text-anchor="middle" font-size="9.5" font-weight="800" fill="#dc2626">定期ヒートパルス → 高湿クリープ（ズレ）を完全リセット!</text>
            ${drawPill(54, 214, 248, 'NISTトレーサブル校正済・長期ドリフト <0.2%/年', true)}
          </g>

          <!-- Right: Accuracy Tolerance Comparison -->
          <g transform="translate(396, 82)">
            <rect x="0" y="0" width="296" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="148" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">湿度計タイプ別の測定誤差比較</text>
            <!-- Bar 1: Analog Bimetal -->
            <text x="18" y="54" font-size="9.5" font-weight="700" fill="#64748b">従来アナログ針式</text>
            <rect x="18" y="60" width="248" height="22" rx="4" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="142" y="75" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">誤差 ±5〜10% RH（経年でさらに狂う）</text>
            <!-- Bar 2: Generic Digital -->
            <text x="18" y="106" font-size="9.5" font-weight="700" fill="#475569">汎用デジタル湿度計</text>
            <rect x="18" y="112" width="146" height="22" rx="4" fill="#fef3c7" stroke="#d97706"/>
            <text x="91" y="127" text-anchor="middle" font-size="9.6" font-weight="800" fill="#92400e">誤差 ±3〜5% RH</text>
            <!-- Bar 3: SHT45 -->
            <text x="18" y="158" font-size="9.8" font-weight="800" fill="#0e7490">本機 Sensirion SHT45</text>
            <rect x="18" y="164" width="54" height="24" rx="4" fill="#06b6d4"/>
            <text x="80" y="180" font-size="11.0" font-weight="900" fill="#0891b2">±1.0% RH / ±0.1°C!</text>
            <rect x="18" y="200" width="260" height="38" rx="7" fill="#ecfeff" stroke="#06b6d4"/>
            <text x="148" y="217" text-anchor="middle" font-size="9.2" font-weight="800" fill="#155e75">平均消費電流わずか 0.4 μA（自己発熱ゼロ）</text>
            <text x="148" y="231" text-anchor="middle" font-size="8.8" font-weight="600" fill="#0e7490">だからカメラ室の真の湿度を正確に測れる!</text>
          </g>
        `,
        cards: [
          { label: '圧倒的な精度', line1: 'Sensirion SHT45-AD1F 採用', line2: '標準 ±1.0% RH / ±0.1°C 精度' },
          { label: 'クリープ自動消去', line1: 'チップ内蔵マイクロヒーター搭載', line2: '高湿後の「湿気ボケ」を定期除去' },
          { label: 'PTFE保護膜', line1: 'ホコリや結露飛沫を弾く撥水膜', line2: '長年にわたり安定した計測を保証' },
        ],
      });

    case 'db_sht45_lower_sensor':
      return wrapDryboxHdSvg({
        badge: 'DB10',
        stepTag: '下段独立 / 露点予測計算',
        title: '下段独立SHT45センサー ＆ リアルタイム露点マージン監視プローブ',
        analogy: '「あと何℃冷えたら結露する？」を毎秒計算して先回り防御する下段の番人',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Thermal Stratification & Dew-Point Margin Chart -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="388" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="194" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">庫内温度成層と「露点安全マージン ΔT」の可視化</text>
            <!-- Psychrometric / Dew Point Bar -->
            <rect x="34" y="46" width="320" height="38" rx="6" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.4"/>
            <text x="46" y="69" font-size="10.2" font-weight="800" fill="#14532d">現在温度 T ＝ 22.0°C（下段金属棚プローブ）</text>
            <!-- Safe Margin Gap -->
            <line x1="194" y1="84" x2="194" y2="152" stroke="#0284c7" stroke-width="3.0" marker-start="url(#db10-arrBlue)" marker-end="url(#db10-arrBlue)"/>
            <rect x="114" y="104" width="160" height="28" rx="14" fill="#0284c7"/>
            <text x="194" y="122" text-anchor="middle" font-size="10.4" font-weight="900" fill="#ffffff">安全余裕 ΔT ＝ +16.1°C!</text>
            <!-- Dew point Danger Zone -->
            <rect x="34" y="152" width="320" height="44" rx="6" fill="#fff1f2" stroke="#e11d48" stroke-width="1.4"/>
            <text x="46" y="171" font-size="10.2" font-weight="800" fill="#9f1239">結露開始ライン（露点 T_dew ＝ 5.9°C @ 35%RH）</text>
            <text x="46" y="187" font-size="8.8" font-weight="600" fill="#be123c">※ もし70%RHなら露点は16.3°Cまで上がり、少し冷えただけで即結露!</text>
            <text x="194" y="220" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">焼結ブロンズ先端プローブが金属シネマレンズ近傍の実温度を安定計測</text>
          </g>

          <!-- Right: Dual-Zone Stratification Explanation -->
          <g transform="translate(428, 82)">
            <rect x="0" y="0" width="264" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="132" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">なぜ「下段専用」センサーが必要？</text>
            <!-- Upper Zone -->
            <rect x="18" y="38" width="228" height="68" rx="8" fill="#eff6ff" stroke="#3b82f6"/>
            <text x="132" y="57" text-anchor="middle" font-size="10.0" font-weight="800" fill="#1d4ed8">上段カメラ室（暖かい空気）</text>
            <text x="132" y="74" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1e40af">23.5°C ／ 40.0% RH</text>
            <text x="132" y="92" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">上段SHT45 (DB09) が管理</text>
            <!-- Divider -->
            <rect x="18" y="114" width="228" height="10" rx="3" fill="#64748b"/>
            <!-- Lower Zone -->
            <rect x="18" y="132" width="228" height="72" rx="8" fill="#ecfeff" stroke="#0891b2"/>
            <text x="132" y="151" text-anchor="middle" font-size="10.0" font-weight="800" fill="#0e7490">下段シネマ室（冷気が溜まる）</text>
            <text x="132" y="168" text-anchor="middle" font-size="9.5" font-weight="700" fill="#155e75">21.5°C ／ 独立目標 35.0% RH</text>
            <text x="132" y="186" text-anchor="middle" font-size="8.8" font-weight="600" fill="#0e7490">温度−2°CでRHが+5%跳ねる死角を監視</text>
            ${drawPill(18, 214, 228, '冷気溜まり結露を先回り除湿で阻止', true)}
          </g>
        `,
        cards: [
          { label: '露点マージン算出', line1: 'Magnus-Tetens式で毎秒 T_dew 算出', line2: '余裕ΔTが狭まる前に先回り除湿' },
          { label: '温度成層の死角解消', line1: '冷たい空気は下に溜まり湿度上昇', line2: '下段独立計測で局所高湿ゼロ' },
          { label: '焼結ブロンズ先端', line1: '開閉時の気流渦ノイズを平滑化', line2: '金属製シネマレンズの結露を防止' },
        ],
      });

    case 'db_sgp41_voc_sensor':
      return wrapDryboxHdSvg({
        badge: 'DB11',
        stepTag: 'MOx VOC / NOx ppb検知',
        title: 'Sensirion SGP41 金属酸化物（MOx）アウトガス検知のしくみ',
        analogy: 'ゴムの加水分解ガスやレンズを曇らせる見えないガスを嗅ぎ分ける電子の鼻',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: MOx Sensing Physics -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="368" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="184" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">密閉庫内の「光学汚染ガス」をppbレベルで嗅ぎ分ける</text>
            <!-- Gas Molecules floating into DFN-6 gold lid -->
            <g transform="translate(26, 40)">
              <rect x="0" y="0" width="100" height="32" rx="16" fill="#fef3c7" stroke="#d97706"/>
              <text x="50" y="19.5" text-anchor="middle" font-size="9.0" font-weight="800" fill="#92400e">ゴム可塑剤 VOC</text>
              <rect x="112" y="0" width="100" height="32" rx="16" fill="#ffe4e6" stroke="#e11d48"/>
              <text x="162" y="19.5" text-anchor="middle" font-size="9.0" font-weight="800" fill="#9f1239">シロキサン曇り源</text>
              <rect x="224" y="0" width="94" height="32" rx="16" fill="#ede9fe" stroke="#7c3aed"/>
              <text x="271" y="19.5" text-anchor="middle" font-size="9.0" font-weight="800" fill="#5b21b6">酢酸 / NOx</text>
            </g>
            <!-- Downward arrows into aperture -->
            <line x1="110" y1="74" x2="170" y2="108" stroke="#d97706" stroke-width="2" marker-end="url(#db11-arrAmber)"/>
            <line x1="184" y1="74" x2="184" y2="106" stroke="#e11d48" stroke-width="2" marker-end="url(#db11-arrRed)"/>
            <line x1="258" y1="74" x2="198" y2="108" stroke="#7c3aed" stroke-width="2" marker-end="url(#db11-arrPurple)"/>
            <!-- SGP41 Gold Package -->
            <rect x="94" y="110" width="180" height="72" rx="6" fill="#1e293b" stroke="#eab308" stroke-width="2"/>
            <rect x="156" y="110" width="56" height="10" fill="#ffffff"/>
            <!-- Dual MOx Pixels -->
            <rect x="114" y="132" width="60" height="32" rx="4" fill="#f59e0b"/>
            <text x="144" y="152" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">VOC画素</text>
            <rect x="194" y="132" width="60" height="32" rx="4" fill="#8b5cf6"/>
            <text x="224" y="152" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">NOx画素</text>
            <text x="184" y="202" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">300°C極小ホットプレート上のMOxナノ膜抵抗変化を計測</text>
            ${drawPill(54, 214, 260, 'シロキサン耐性強化で10年超の安定検知', true)}
          </g>

          <!-- Right: Automated Purification Trigger Ladder -->
          <g transform="translate(408, 82)">
            <rect x="0" y="0" width="284" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="142" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">ガス指数連動・自動浄化アクション</text>
            <rect x="16" y="38" width="252" height="54" rx="8" fill="#ecfdf5" stroke="#16a34a"/>
            <text x="28" y="57" font-size="10.2" font-weight="800" fill="#14532d">VOC Index 1–120（清浄グリーン）</text>
            <text x="28" y="76" font-size="9.0" font-weight="600" fill="#166534">通常 12 dBA 静音循環で維持</text>

            <rect x="16" y="106" width="252" height="58" rx="8" fill="#fffbeb" stroke="#d97706"/>
            <text x="28" y="125" font-size="10.2" font-weight="800" fill="#92400e">VOC Index 150+（ガス蓄積検知）</text>
            <text x="28" y="143" font-size="9.0" font-weight="600" fill="#b45309">TiO₂光触媒(DB29)＋活性炭(DB30)</text>
            <text x="28" y="156" font-size="9.0" font-weight="600" fill="#b45309">強制ブースト浄化を自動起動!</text>

            <rect x="16" y="178" width="252" height="58" rx="8" fill="#fff1f2" stroke="#e11d48"/>
            <text x="28" y="197" font-size="10.2" font-weight="800" fill="#9f1239">VOC Index 250+（異常アラート）</text>
            <text x="28" y="215" font-size="9.0" font-weight="600" fill="#be123c">グリップ劣化・電池ガス漏れ疑い</text>
            <text x="28" y="228" font-size="9.0" font-weight="600" fill="#be123c">スマホ緊急通知 ＋ 充電ハブ遮断!</text>
          </g>
        `,
        cards: [
          { label: '湿度計の盲点解消', line1: 'レンズ曇りの原因は湿気だけでなく', line2: 'ゴムや接着剤のVOC/シロキサンガス' },
          { label: '2チャンネル検知', line1: 'Sensirion SGP41 (VOC + NOx)', line2: '酢酸・腐食性ガスまでppb監視' },
          { label: '自動防御連動', line1: '光触媒・活性炭ブーストに加え', line2: '電池異常ガス検知で充電即カット' },
        ],
      });

    default:
      return null;
  }
}
