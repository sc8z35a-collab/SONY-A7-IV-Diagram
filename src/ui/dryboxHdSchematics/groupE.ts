import { drawCompareFrame, drawKpiBox, drawPill, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group E (12 Parts: DB45–DB56):
 * Door Glazing & Thermal Break Micro-Mechanics, Chassis Sealing, CLD Damping & Analog Reference Gauge.
 */
export function renderDryboxGroupESvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_glazing_uchannel_blocks':
      return wrapDryboxHdSvg({
        badge: 'DB45',
        stepTag: 'EPDM Shore A 80',
        title: 'EPDMグレージングUチャネル ＆ セッティングブロックの強化ガラス保護断面',
        analogy: '重い強化ガラスをアルミ枠から宙に浮かせて守る、硬めスニーカーの中敷き＆全周ゴム緩衝材',
        accent: '#0f172a',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Glazing Cross Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="336" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="168" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">下枠グレージング断面（金属直接接触ゼロ構造）</text>
            <!-- Aluminum frame U-pocket -->
            <path d="M 62 190 L 62 84 L 96 84 L 96 164 L 222 164 L 222 84 L 256 84 L 256 190 Z" fill="url(#db45-dark)" stroke="#0f172a" stroke-width="1.5"/>
            <!-- EPDM U-channel gasket -->
            <path d="M 98 86 L 116 86 L 116 146 L 202 146 L 202 86 L 220 86 L 220 162 L 98 162 Z" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
            <!-- Multi-lip fins -->
            <path d="M 116 98 L 126 102 L 116 108 M 116 120 L 126 124 L 116 130" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
            <path d="M 202 98 L 192 102 L 202 108 M 202 120 L 192 124 L 202 130" fill="none" stroke="#94a3b8" stroke-width="1.4"/>
            <!-- Shore A 80 Setting Block -->
            <rect x="118" y="132" width="82" height="16" rx="3" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.3"/>
            <text x="159" y="143" text-anchor="middle" font-size="8.4" font-weight="800" fill="#ffffff">Shore A 80 ブロック</text>
            <!-- 4mm Tempered Glass -->
            <rect x="128" y="42" width="62" height="90" rx="2" fill="url(#db45-glass)" stroke="#0284c7" stroke-width="1.6"/>
            <text x="159" y="88" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0c4a6e">強化ガラス</text>
            <text x="159" y="101" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0369a1">4.0 mm</text>
            <!-- Thermal expansion arrows -->
            <line x1="128" y1="62" x2="108" y2="62" stroke="#d97706" stroke-width="1.6" marker-end="url(#db45-arrAmber)"/>
            <line x1="190" y1="62" x2="210" y2="62" stroke="#d97706" stroke-width="1.6" marker-end="url(#db45-arrAmber)"/>
            <text x="159" y="36" text-anchor="middle" font-size="8.8" font-weight="800" fill="#b45309">熱膨張差をリップが吸収</text>
            ${drawPin(159, 140, 224, 214, 1, 'セッティングブロック', '最小厚3mm・自重支持', '#0284c7')}
            ${drawPin(106, 128, 108, 214, 2, 'EPDM Uチャネル', '全周金属接触ゼロ', '#334155', 'end')}
            <text x="168" y="244" text-anchor="middle" font-size="9.0" font-weight="700" fill="#475569">アルミ(23.4) vs ガラス(8.5×10⁻⁶/K) の伸縮差を安全に逃がす</text>
          </g>

          <!-- Right: Quarter-Span Placement & Comparison -->
          <g transform="translate(372, 80)">
            ${drawCompareFrame(0, 0, 322, 134, '✅ 国際規格 1/4スパン 2点支持（SANS 10137準拠）', '#0284c7', '#f0f9ff')}
            <rect x="44" y="40" width="234" height="62" rx="4" fill="url(#db45-glass)" stroke="#0284c7" stroke-width="1.6"/>
            <text x="161" y="75" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0c4a6e">強化ガラス扉 自重分散（均一荷重）</text>
            <!-- 2 Setting blocks at 1/4 span -->
            <rect x="86" y="102" width="32" height="10" rx="2" fill="#0369a1"/>
            <rect x="204" y="102" width="32" height="10" rx="2" fill="#0369a1"/>
            <text x="102" y="124" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">1/4点</text>
            <text x="220" y="124" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">3/4点</text>

            ${drawCompareFrame(0, 144, 322, 110, '❌ 金属直置き（安価フレームの破損原因）', '#e11d48', '#fff1f2')}
            <rect x="26" y="182" width="106" height="52" rx="3" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4"/>
            <path d="M 78 234 L 68 214 L 84 202 L 72 186 M 78 234 L 94 218 L 110 208" fill="none" stroke="#e11d48" stroke-width="1.8"/>
            <circle cx="78" cy="234" r="4" fill="#e11d48"/>
            <text x="148" y="198" font-size="9.8" font-weight="800" fill="#881337">アルミ角とガラス端面が接触</text>
            <text x="148" y="216" font-size="9.0" font-weight="600" fill="#9f1239">微小欠け → 圧縮応力解放</text>
            <text x="148" y="234" font-size="9.0" font-weight="800" fill="#e11d48">→ 突然の全面粉砕リスク!</text>
          </g>
        `,
        cards: [
          { label: '核心パーツ', line1: 'EPDM U字溝 ＋ Shore A 80座', line2: '硫黄フリー過酸化物架橋ゴム' },
          { label: '物理的メリット', line1: '金属直接接触・エッジ割れゼロ', line2: '1/4スパン支持で枠歪み分散' },
          { label: 'カメラを守る意味', line1: '20年開閉しても強化ガラス安全', line2: '低アウトガスでレンズ曇りゼロ' },
        ],
      });

    case 'db_miter_corner_cleats':
      return wrapDryboxHdSvg({
        badge: 'DB46',
        stepTag: 'SUS304 / ±0.05°',
        title: '45°マイター角SUS304 L字クリート ＆ くさび引き寄せ機構',
        analogy: 'アルミ枠の空洞内に隠れた鉄骨のL字カギ爪で、四隅を90.0°ピッタリにロック',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Miter Cutaway Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="380" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="190" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">アルミ中空枠 45°コーナー内部透視図</text>
            <!-- Vertical hollow aluminum extrusion -->
            <polygon points="56,50 132,50 132,226 56,226" fill="url(#db46-dark)" opacity="0.22" stroke="#334155" stroke-width="1.6"/>
            <!-- Horizontal hollow aluminum extrusion -->
            <polygon points="56,50 296,50 296,126 132,126" fill="url(#db46-dark)" opacity="0.22" stroke="#334155" stroke-width="1.6"/>
            <!-- 45 degree miter seam -->
            <line x1="56" y1="50" x2="132" y2="126" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="5 3"/>
            <!-- SUS304 Internal L-Cleat -->
            <path d="M 74 68 L 246 68 L 246 108 L 114 108 L 114 206 L 74 206 Z" fill="url(#db46-steel)" stroke="#0f172a" stroke-width="1.8"/>
            <!-- Tapered hex set screws -->
            <circle cx="176" cy="88" r="9" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
            <circle cx="222" cy="88" r="9" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
            <circle cx="94" cy="146" r="9" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
            <circle cx="94" cy="184" r="9" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
            <!-- Pull-together arrows -->
            <line x1="162" y1="58" x2="128" y2="58" stroke="#059669" stroke-width="2.2" marker-end="url(#db46-arrGreen)"/>
            <line x1="64" y1="158" x2="64" y2="122" stroke="#059669" stroke-width="2.2" marker-end="url(#db46-arrGreen)"/>
            <text x="218" y="44" text-anchor="middle" font-size="9.4" font-weight="800" fill="#059669">くさび引き寄せ力 ≥ 1,200 N</text>
            ${drawPin(176, 88, 224, 154, 1, 'M4 斜面セットスクリュー', '締込むほど角が密着', '#0284c7')}
            ${drawPin(94, 184, 224, 198, 2, 'SUS304 削り出しL字クリート', '熱歪みゼロ機械結合', '#0f172a')}
            <text x="190" y="242" text-anchor="middle" font-size="9.0" font-weight="700" fill="#475569">溶接熱による反り＆アルマイト変色ゼロで90.0°±0.05°維持</text>
          </g>

          <!-- Right: KPI & Benefit Panel -->
          <g transform="translate(416, 80)">
            ${drawKpiBox(0, 0, 134, 78, '直角度公差', '±0.05°', '45°継ぎ目隙間ゼロ', '#0284c7')}
            ${drawKpiBox(144, 0, 134, 78, 'コーナー耐力', '1,200 N', '10万回開閉も無緩み', '#059669')}
            ${drawCompareFrame(0, 90, 278, 164, 'なぜ「溶接」ではなく「内部クリート」？', '#334155', '#f8fafc')}
            <text x="14" y="136" font-size="9.6" font-weight="800" fill="#0f172a">1. 溶接熱歪みが 0.00 mm</text>
            <text x="22" y="152" font-size="8.8" font-weight="600" fill="#475569">扉の平面度 ≤ 0.25 mm を損なわない</text>
            <text x="14" y="176" font-size="9.6" font-weight="800" fill="#0f172a">2. 硬質アルマイト発色が均一</text>
            <text x="22" y="192" font-size="8.8" font-weight="600" fill="#475569">溶接ビードの黒変・腐食跡が残らない</text>
            <text x="14" y="216" font-size="9.6" font-weight="800" fill="#0f172a">3. 将来の微調整・ガラス交換が可能</text>
            <text x="22" y="232" font-size="8.8" font-weight="600" fill="#475569">イモネジ脱着で10年後も分解保守OK</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: 'SUS304 L字内部圧入クリート', line2: 'くさび引き寄せM4イモネジ×8' },
          { label: '物理的メリット', line1: '溶接熱歪みゼロで90.0°維持', line2: '1,200 N超の強固コーナー結合' },
          { label: 'カメラを守る意味', line1: '扉四隅の段差・反りを根絶', line2: '20年開閉しても気密隙間ゼロ' },
        ],
      });

    case 'db_emergency_key_usbc_jump':
      return wrapDryboxHdSvg({
        badge: 'DB47',
        stepTag: '非常解錠 99.9999%',
        title: '緊急ディンプルキーシリンダー ＆ 5V USB-C非常給電の二重フェイルセーフ',
        analogy: '撮影の朝に電池切れでも「スマホ電池で3秒復活」or「物理ディンプル鍵」で100%開く命綱',
        accent: '#b45309',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Dual Override Paths -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#78350f">停電・電池完全放電・電子故障を想定した 2系統独立解錠ルート</text>

            <!-- Route 1: USB-C Jump Start -->
            <rect x="16" y="34" width="392" height="94" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.4"/>
            <text x="28" y="52" font-size="10.0" font-weight="800" fill="#0369a1">ルート①：外部 5V USB-C 非常給電（電池切れ・長期停電時）</text>
            <rect x="28" y="64" width="84" height="48" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2"/>
            <text x="70" y="84" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0c4a6e">モバイル電池</text>
            <text x="70" y="99" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0369a1">5V / 1A</text>
            <line x1="112" y1="88" x2="152" y2="88" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db47-arrBlue)"/>
            <rect x="156" y="64" width="102" height="48" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.2"/>
            <text x="207" y="84" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0c4a6e">逆流防止ダイオード</text>
            <text x="207" y="99" text-anchor="middle" font-size="8.2" font-weight="700" fill="#475569">密閉キャップ内蔵</text>
            <line x1="258" y1="88" x2="294" y2="88" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db47-arrBlue)"/>
            <rect x="298" y="64" width="98" height="48" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.3"/>
            <text x="347" y="84" text-anchor="middle" font-size="9.0" font-weight="800" fill="#14532d">1.5秒で復帰</text>
            <text x="347" y="99" text-anchor="middle" font-size="8.2" font-weight="700" fill="#166534">指紋認証で解錠!</text>

            <!-- Route 2: Physical Dimple Key -->
            <rect x="16" y="140" width="392" height="98" rx="8" fill="#ffffff" stroke="#b45309" stroke-width="1.4"/>
            <text x="28" y="158" font-size="10.0" font-weight="800" fill="#92400e">ルート②：物理真鍮ディンプルキー（電子回路全損・電気0W時）</text>
            <rect x="28" y="170" width="94" height="52" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>
            <text x="75" y="191" text-anchor="middle" font-size="9.0" font-weight="800" fill="#78350f">12ピン多方向</text>
            <text x="75" y="207" text-anchor="middle" font-size="8.4" font-weight="700" fill="#b45309">ディンプル錠</text>
            <line x1="122" y1="196" x2="160" y2="196" stroke="#d97706" stroke-width="2.2" marker-end="url(#db47-arrAmber)"/>
            <rect x="164" y="170" width="106" height="52" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.2"/>
            <text x="217" y="191" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">直結機械カム</text>
            <text x="217" y="207" text-anchor="middle" font-size="8.2" font-weight="700" fill="#475569">二重Oリング防湿</text>
            <line x1="270" y1="196" x2="304" y2="196" stroke="#d97706" stroke-width="2.2" marker-end="url(#db47-arrAmber)"/>
            <rect x="308" y="170" width="88" height="52" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.3"/>
            <text x="352" y="191" text-anchor="middle" font-size="9.0" font-weight="800" fill="#14532d">直接開放</text>
            <text x="352" y="207" text-anchor="middle" font-size="8.2" font-weight="700" fill="#166534">電気一切不要!</text>
          </g>

          <!-- Right: Airtight Sealing Detail -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'ロックアウト防止信頼度', '99.9999%', '電気系×機械系の完全独立並列冗長', '#b45309')}
            ${drawCompareFrame(0, 90, 234, 164, '鍵穴からの「湿気漏れ」も完全封鎖', '#0284c7', '#f0f9ff')}
            <circle cx="54" cy="162" r="24" fill="url(#db47-copper)" stroke="#78350f" stroke-width="1.5"/>
            <circle cx="54" cy="162" r="29" fill="none" stroke="#0284c7" stroke-width="3.2" stroke-dasharray="6 3"/>
            <text x="54" y="166" text-anchor="middle" font-size="8.5" font-weight="800" fill="#ffffff">真鍮錠</text>
            <text x="98" y="146" font-size="9.2" font-weight="800" fill="#0c4a6e">デュアルOリング内蔵</text>
            <text x="98" y="162" font-size="8.6" font-weight="600" fill="#334155">シリンダー軸周りを</text>
            <text x="98" y="176" font-size="8.6" font-weight="600" fill="#334155">2重ゴム輪で密閉</text>
            <text x="16" y="214" font-size="9.2" font-weight="800" fill="#0f172a">＋ 外側シリコーン防塵プラグ</text>
            <text x="16" y="232" font-size="8.6" font-weight="600" fill="#475569">普段はUSB-Cと鍵穴を一体蓋で保護</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '真鍮ディンプル錠＋5V USB-C口', line2: '逆流防止回路＆二重Oリング密閉' },
          { label: '物理的メリット', line1: '汎用モバイル電池で1.5秒復活', line2: '電子全損でも物理鍵で直接開放' },
          { label: 'カメラを守る意味', line1: '撮影当日の「開かない」事故ゼロ', line2: '鍵穴からの湿気侵入も完全防止' },
        ],
      });

    case 'db_ferritic430_strike_plate':
      return wrapDryboxHdSvg({
        badge: 'DB48',
        stepTag: 'SUS430 BCC強磁性',
        title: 'フェライト系SUS430強磁性ドアストライクプレートの磁気閉回路',
        analogy: '普通のステンレスは磁石が着かない！錆びずに磁石がガチッと吸い付く特別な鉄レシピ',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Magnetic Flux Circuit -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="350" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="175" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">パッキン磁石 × SUS430ストライク 磁気閉回路</text>
            <!-- Door Magnet Gasket (Left) -->
            <rect x="34" y="64" width="84" height="122" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="1.4"/>
            <rect x="76" y="84" width="36" height="40" fill="#e11d48"/>
            <text x="94" y="108" text-anchor="middle" font-size="11.0" font-weight="900" fill="#ffffff">N</text>
            <rect x="76" y="126" width="36" height="40" fill="#0284c7"/>
            <text x="94" y="150" text-anchor="middle" font-size="11.0" font-weight="900" fill="#ffffff">S</text>
            <text x="76" y="54" text-anchor="middle" font-size="9.2" font-weight="800" fill="#334155">扉マグネット(DB04)</text>

            <!-- SUS430 Strike Plate (Right) -->
            <rect x="148" y="58" width="54" height="134" rx="4" fill="url(#db48-steel)" stroke="#0f172a" stroke-width="1.8"/>
            <text x="175" y="118" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0f172a">SUS430</text>
            <text x="175" y="133" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0369a1">BCC結晶</text>
            <text x="175" y="146" text-anchor="middle" font-size="8.0" font-weight="700" fill="#475569">Cr 17%</text>

            <!-- Closed Magnetic Flux Lines -->
            <path d="M 112 100 C 166 96 168 154 112 150" fill="none" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db48-arrGreen)"/>
            <path d="M 112 92 C 188 86 190 164 112 158" fill="none" stroke="#16a34a" stroke-width="2.0" stroke-dasharray="4 2"/>
            <!-- Force arrows -->
            <line x1="142" y1="125" x2="120" y2="125" stroke="#e11d48" stroke-width="2.8" marker-end="url(#db48-arrRed)"/>
            <text x="272" y="102" text-anchor="middle" font-size="10.2" font-weight="900" fill="#15803d">強力吸着</text>
            <text x="272" y="120" text-anchor="middle" font-size="11.0" font-weight="900" fill="#0f172a">25–35 N</text>
            <text x="272" y="138" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">磁束密度 1.5 T</text>
            <text x="272" y="156" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0284c7">赤錆ゼロ不動態膜</text>
            <text x="175" y="226" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">F = B²·A / (2μ₀) を最大化して全周25%圧縮キープ</text>
            <text x="175" y="242" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">塗装剥がれによる吸着力低下が起きない無塗装研磨受け座</text>
          </g>

          <!-- Right: Metallurgy 3-Way Comparison -->
          <g transform="translate(386, 80)">
            ${drawCompareFrame(0, 0, 308, 254, '金属材料の「磁石のつきやすさ × 錆びにくさ」比較', '#334155', '#ffffff')}
            <!-- SUS430 -->
            <rect x="14" y="38" width="280" height="60" rx="7" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
            <text x="26" y="57" font-size="10.4" font-weight="900" fill="#14532d">✅ SUS430（フェライト系・本機採用）</text>
            <text x="26" y="75" font-size="9.0" font-weight="700" fill="#166534">BCC結晶 → 強磁性（ガチッと吸着！）</text>
            <text x="26" y="90" font-size="8.8" font-weight="600" fill="#15803d">Cr 16–18% 不動態膜 → 梅雨でも錆びない</text>
            <!-- SUS304 -->
            <rect x="14" y="108" width="280" height="60" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.3"/>
            <text x="26" y="127" font-size="10.2" font-weight="800" fill="#78350f">△ SUS304（オーステナイト系）</text>
            <text x="26" y="145" font-size="9.0" font-weight="700" fill="#92400e">FCC結晶 → 非磁性（磁石がほぼ付かない！）</text>
            <text x="26" y="160" font-size="8.8" font-weight="600" fill="#b45309">錆びないがマグネットパッキンが浮く</text>
            <!-- Plain Steel -->
            <rect x="14" y="178" width="280" height="62" rx="7" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.3"/>
            <text x="26" y="197" font-size="10.2" font-weight="800" fill="#881337">❌ 塗装軟鉄（安価な防湿庫）</text>
            <text x="26" y="215" font-size="9.0" font-weight="700" fill="#9f1239">塗膜の厚みで磁力減衰 ＋ 傷から赤錆発生</text>
            <text x="26" y="230" font-size="8.8" font-weight="600" fill="#be123c">錆の膨れでパッキン密着面が凸凹に</text>
          </g>
        `,
        cards: [
          { label: '核心材質', line1: 'フェライト系 SUS430（Cr 17%）', line2: '体心立方（BCC）強磁性ステンレス' },
          { label: '物理的メリット', line1: '飽和磁束 1.5 T で全周強力吸着', line2: '不動態皮膜で赤錆・塗膜剥離ゼロ' },
          { label: 'カメラを守る意味', line1: '扉がピタッと閉まり隙間風ゼロ', line2: '20年開閉しても吸着力が衰えない' },
        ],
      });

    case 'db_door_swing_stopper_ptfe':
      return wrapDryboxHdSvg({
        badge: 'DB49',
        stepTag: '120°停止 / PTFE μ=0.05',
        title: '120°開度リミッター ＆ 無給油PTFEヒンジスラスト軸受構造',
        analogy: '扉の壁激突を防ぐブレーキ付きストッパーと、黒い金属粉・油ミストを出さないテフロン座金',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Top-Down 120° Swing Sector -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="330" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="165" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">上面視：120°ソフトストップ開度リミッター</text>
            <!-- Cabinet body corner -->
            <rect x="76" y="138" width="160" height="90" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
            <text x="156" y="188" text-anchor="middle" font-size="10.0" font-weight="800" fill="#f8fafc">防湿庫キャビネット</text>
            <!-- Adjacent Wall on Left -->
            <rect x="18" y="40" width="16" height="196" fill="url(#db49-hatch)" stroke="#64748b" stroke-width="1.2"/>
            <text x="26" y="138" text-anchor="middle" font-size="9.0" font-weight="800" fill="#475569" transform="rotate(-90 26 138)">隣接の壁・家具</text>
            <!-- Hinge pivot -->
            <circle cx="76" cy="138" r="7" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
            <!-- Closed Door (0 deg) -->
            <line x1="76" y1="138" x2="232" y2="138" stroke="#94a3b8" stroke-width="4" stroke-dasharray="5 3"/>
            <text x="218" y="128" font-size="8.6" font-weight="700" fill="#64748b">閉 0°</text>
            <!-- 120 deg Safe Stop Sector -->
            <path d="M 76 138 L 194 138 A 118 118 0 0 0 18 82 Z" fill="#0284c7" fill-opacity="0.14"/>
            <!-- Open Door at 120 deg -->
            <line x1="76" y1="138" x2="48" y2="48" stroke="#0284c7" stroke-width="5.5" stroke-linecap="round"/>
            <circle cx="48" cy="48" r="5" fill="#16a34a"/>
            <!-- Danger collision zone -->
            <path d="M 48 48 A 94 94 0 0 0 34 110" fill="none" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2"/>
            <text x="128" y="74" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0369a1">最大 120°停止</text>
            <text x="128" y="90" text-anchor="middle" font-size="8.8" font-weight="700" fill="#15803d">ウレタン緩衝パッドで</text>
            <text x="128" y="104" text-anchor="middle" font-size="8.8" font-weight="700" fill="#15803d">壁・筐体激突を防止!</text>
          </g>

          <!-- Right: PTFE Thrust Washer Exploded Hinge Stack -->
          <g transform="translate(366, 80)">
            <rect x="0" y="0" width="328" height="254" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="1.3"/>
            <text x="164" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0c4a6e">ヒンジ軸スラスト断面：純PTFEドライ軸受</text>
            <!-- Hinge Pin -->
            <rect x="92" y="42" width="24" height="156" rx="4" fill="url(#db49-steel)" stroke="#334155" stroke-width="1.4"/>
            <!-- Upper Door Knuckle (5-7kg down) -->
            <rect x="52" y="64" width="104" height="34" rx="5" fill="#475569" stroke="#0f172a" stroke-width="1.4"/>
            <text x="104" y="85" text-anchor="middle" font-size="9.0" font-weight="800" fill="#ffffff">扉側ナックル (6kg)</text>
            <!-- PTFE Thrust Washer -->
            <rect x="56" y="102" width="96" height="14" rx="3" fill="#f8fafc" stroke="#0284c7" stroke-width="2.0"/>
            <text x="104" y="112.5" text-anchor="middle" font-size="8.6" font-weight="900" fill="#0369a1">純PTFE座金</text>
            <!-- Lower Cabinet Knuckle -->
            <rect x="52" y="120" width="104" height="34" rx="5" fill="#64748b" stroke="#0f172a" stroke-width="1.4"/>
            <text x="104" y="141" text-anchor="middle" font-size="9.0" font-weight="800" fill="#ffffff">筐体側ナックル</text>
            <!-- Weight Arrow -->
            <line x1="104" y1="36" x2="104" y2="60" stroke="#e11d48" stroke-width="2.4" marker-end="url(#db49-arrRed)"/>
            ${drawPin(152, 109, 186, 86, 1, '動摩擦 μ ≈ 0.05', '無給油・金属粉ゼロ', '#0284c7')}
            ${drawPin(156, 136, 186, 140, 2, '扉タレ下がり ≤0.2mm', '10万回開閉耐久', '#059669')}
            ${drawPill(24, 212, 280, 'グリス不使用＝揮発油分によるレンズ汚染ゼロ!', true)}
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '120°機械リミッター＋軟質パッド', line2: '無給油 純PTFEスラストワッシャー' },
          { label: '物理的メリット', line1: '動摩擦係数 0.05 のドライ潤滑', line2: '壁衝突によるガラス破損を防止' },
          { label: 'カメラを守る意味', line1: '金属摩耗粉・油ミスト放出ゼロ', line2: '10万回開閉後も扉のタレ防止' },
        ],
      });

    case 'db_pa66_thermal_break_bead':
      return wrapDryboxHdSvg({
        badge: 'DB50',
        stepTag: 'EN 14024 / 1/533断熱',
        title: 'PA66-GF25ポリアミド断熱サーマルブレイクの熱橋遮断メカニズム',
        analogy: 'アルミ枠の内外を「超強力グラス強化ナイロン」で分断し、冬の朝の縁結露をピタッと止める関所',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Thermal Break Cross-Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="384" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="192" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">扉アルミ枠の熱橋遮断断面（上：外気 ／ 下：防湿庫内）</text>
            <!-- Outer Warm/Cold Aluminum -->
            <rect x="44" y="44" width="296" height="44" rx="5" fill="#fb923c" fill-opacity="0.35" stroke="#ea580c" stroke-width="1.6"/>
            <text x="192" y="70" text-anchor="middle" font-size="10.0" font-weight="800" fill="#9a3412">部屋側アルミ枠（A6063：λ = 160 W/m·K）</text>
            <!-- PA66-GF25 Thermal Break Strips with Knurled Crimp -->
            <rect x="64" y="88" width="54" height="58" rx="3" fill="#475569" stroke="#0f172a" stroke-width="1.6"/>
            <rect x="266" y="88" width="54" height="58" rx="3" fill="#475569" stroke="#0f172a" stroke-width="1.6"/>
            <text x="91" y="114" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fde047">PA66</text>
            <text x="91" y="128" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">GF25</text>
            <text x="293" y="114" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fde047">PA66</text>
            <text x="293" y="128" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">GF25</text>
            <!-- Dead air insulating chamber between strips -->
            <rect x="122" y="92" width="140" height="50" rx="4" fill="#e0f2fe" stroke="#38bdf8" stroke-dasharray="4 2"/>
            <text x="192" y="114" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0369a1">静止空気断熱室</text>
            <text x="192" y="130" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0284c7">熱伝達を 1/533 へ遮断</text>
            <!-- Inner Dry Cabinet Aluminum -->
            <rect x="44" y="146" width="296" height="44" rx="5" fill="#bae6fd" fill-opacity="0.45" stroke="#0284c7" stroke-width="1.6"/>
            <text x="192" y="172" text-anchor="middle" font-size="10.0" font-weight="800" fill="#0c4a6e">庫内側アルミ枠（室温安定・縁結露ゼロ!）</text>
            <!-- Blocked Heat Arrows -->
            <line x1="91" y1="36" x2="91" y2="82" stroke="#e11d48" stroke-width="2.4" marker-end="url(#db50-arrRed)"/>
            <text x="91" y="101" text-anchor="middle" font-size="11.5" font-weight="900" fill="#ef4444">✕</text>
            ${drawPin(64, 92, 134, 214, 1, '0.6mm ローレット圧着', 'EN 14024 Q_LT ≥ 20 N/mm', '#0f172a')}
            <text x="192" y="244" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">線膨張係数 26×10⁻⁶/K がアルミ(23.4)と一致 → 20年剥離なし</text>
          </g>

          <!-- Right: Conductivity Bar Chart & KPIs -->
          <g transform="translate(420, 80)">
            ${drawKpiBox(0, 0, 132, 78, '断熱性能比', '533倍', 'アルミ160 vs 0.30 W/m·K', '#d97706')}
            ${drawKpiBox(142, 0, 132, 78, 'せん断圧着強度', '≥20 N/mm', 'EN 14024 Type A 準拠', '#0284c7')}
            ${drawCompareFrame(0, 90, 274, 164, '熱伝導率 λ の圧倒的な差（低いほど断熱）', '#d97706', '#fffbeb')}
            <text x="14" y="134" font-size="9.2" font-weight="800" fill="#9a3412">A6063 アルミ枠単体：160 W/(m·K)</text>
            <rect x="14" y="142" width="244" height="16" rx="4" fill="#ef4444"/>
            <text x="14" y="182" font-size="9.2" font-weight="800" fill="#14532d">PA66-GF25 断熱層：0.30 W/(m·K)</text>
            <rect x="14" y="190" width="8" height="16" rx="3" fill="#16a34a"/>
            <text x="30" y="202" font-size="9.0" font-weight="800" fill="#15803d">わずか 0.19% の熱しか通さない!</text>
            <text x="14" y="232" font-size="8.8" font-weight="700" fill="#78350f">冬場の暖房ON/OFFでも扉縁の汗(結露)ゼロ</text>
          </g>
        `,
        cards: [
          { label: '核心素材', line1: 'PA66-GF25 強化ポリアミド樹脂', line2: '熱伝導率 0.30 W/m·K（1/533）' },
          { label: '物理的メリット', line1: 'EN 14024 ローレット機械圧着', line2: 'アルミと膨張率整合で剥離ゼロ' },
          { label: 'カメラを守る意味', line1: '冬の朝に扉枠内側の結露を防止', line2: 'Low-Eガラスと両輪で完全断熱' },
        ],
      });

    case 'db_chassis_corner_gussets':
      return wrapDryboxHdSvg({
        badge: 'DB51',
        stepTag: '耐震 0.8G / 剛性3.4倍',
        title: '筐体内側コーナー三角ガセット補強板 ＆ 対角ブレースの耐震トラス力学',
        analogy: '地震で四角い鉄の箱が「ひし形」に歪むのを防ぐ、木造住宅の筋交いと同じ8隅トラス補強',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Seismic Racking Comparison -->
          <g transform="translate(24, 80)">
            ${drawCompareFrame(0, 0, 324, 254, '✅ 三角ガセット×8 ＋ Xブレース（本機 DB51）', '#16a34a', '#f0fdf4')}
            <!-- Cabinet Frame -->
            <rect x="78" y="46" width="168" height="148" fill="#ffffff" stroke="#1e293b" stroke-width="5"/>
            <!-- 4 Corner Triangular Gussets -->
            <polygon points="81,49 116,49 81,84" fill="#059669"/>
            <polygon points="243,49 208,49 243,84" fill="#059669"/>
            <polygon points="81,191 116,191 81,156" fill="#059669"/>
            <polygon points="243,191 208,191 243,156" fill="#059669"/>
            <!-- Rear X Diagonal Brace -->
            <line x1="84" y1="52" x2="240" y2="188" stroke="#0284c7" stroke-width="3.2" stroke-dasharray="6 3"/>
            <line x1="240" y1="52" x2="84" y2="188" stroke="#0284c7" stroke-width="3.2" stroke-dasharray="6 3"/>
            <!-- Seismic horizontal load arrow -->
            <line x1="24" y1="68" x2="70" y2="68" stroke="#e11d48" stroke-width="3" marker-end="url(#db51-arrRed)"/>
            <text x="44" y="58" text-anchor="middle" font-size="8.8" font-weight="900" fill="#e11d48">地震 0.8G</text>
            <text x="162" y="124" text-anchor="middle" font-size="10.0" font-weight="900" fill="#14532d">対角差 ≤ 0.5 mm</text>
            <text x="162" y="216" text-anchor="middle" font-size="9.4" font-weight="800" fill="#166534">横揺れを三角形の「軸力」に変換して吸収</text>
            <text x="162" y="236" text-anchor="middle" font-size="8.8" font-weight="700" fill="#15803d">→ 扉が外れず気密平面度も完全キープ!</text>
          </g>

          <!-- Right: Unreinforced Failure & KPIs -->
          <g transform="translate(362, 80)">
            ${drawCompareFrame(0, 0, 332, 162, '❌ ガセット無しの薄い四角キャビネット', '#e11d48', '#fff1f2')}
            <!-- Skewed Parallelogram -->
            <polygon points="96,46 254,46 226,144 68,144" fill="#ffffff" stroke="#be123c" stroke-width="4" stroke-dasharray="5 3"/>
            <line x1="34" y1="62" x2="84" y2="62" stroke="#e11d48" stroke-width="3" marker-end="url(#db51-arrRed)"/>
            <text x="162" y="92" text-anchor="middle" font-size="10.0" font-weight="900" fill="#9f1239">ひし形変形（ラッキング）</text>
            <text x="162" y="110" text-anchor="middle" font-size="8.8" font-weight="700" fill="#be123c">扉の角が浮き気密崩壊・ガラス破損!</text>

            ${drawKpiBox(0, 174, 160, 80, '面内せん断剛性', '3.4倍', '2.0mm SPCC 8隅スポット溶接', '#0284c7')}
            ${drawKpiBox(172, 174, 160, 80, '開口対角精度', '≤0.5 mm', '200kg積載＆震度6強相当耐力', '#059669')}
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '2.0 mm SPCC 三角ガセット×8隅', line2: '背面X型対角トラスブレース溶接' },
          { label: '物理的メリット', line1: 'ひし形歪み剛性を約3.4倍へ強化', line2: 'キャスター移動時のねじれ分散' },
          { label: 'カメラを守る意味', line1: '大地震でも扉脱落・気密崩壊ゼロ', line2: '大口径レンズ満載でも箱が歪まない' },
        ],
      });

    case 'db_inner_silicone_airlock':
      return wrapDryboxHdSvg({
        badge: 'DB52',
        stepTag: '二重エアロック気密',
        title: '庫内インナーリップ・シリコーン二次気密エアロックの二段拡散遮断',
        analogy: '宇宙ステーションの二重ハッチ！磁石パッキンの奥にもう一枚のやわらか関所を配置',
        accent: '#0891b2',
        accentSoft: '#cffafe',
        body: `
          <!-- Left: Dual-Stage Airlock Cross-Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">外側マグネット(DB04) ＋ 内側ウィングリップ(DB52) 二段気密断面</text>
            <!-- Outside Humid Air -->
            <rect x="16" y="40" width="96" height="162" rx="6" fill="#ffe4e6" stroke="#fda4af"/>
            <text x="64" y="102" text-anchor="middle" font-size="10.0" font-weight="900" fill="#9f1239">梅雨の外気</text>
            <text x="64" y="122" text-anchor="middle" font-size="11.0" font-weight="900" fill="#e11d48">80% RH</text>
            <!-- Stage 1: Magnetic Gasket -->
            <rect x="120" y="54" width="38" height="134" rx="8" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
            <text x="139" y="124" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff" transform="rotate(-90 139 124)">第1関所：磁石パッキン</text>
            <!-- Dead Airlock Buffer Chamber -->
            <rect x="164" y="54" width="76" height="134" rx="6" fill="#fef9c3" stroke="#eab308" stroke-dasharray="4 2" stroke-width="1.4"/>
            <text x="202" y="106" text-anchor="middle" font-size="9.4" font-weight="900" fill="#854d0e">エアロック</text>
            <text x="202" y="122" text-anchor="middle" font-size="9.0" font-weight="800" fill="#a16207">静止緩衝室</text>
            <text x="202" y="140" text-anchor="middle" font-size="8.4" font-weight="700" fill="#854d0e">圧力差を分割</text>
            <!-- Stage 2: Inner Silicone Wing Lip (DB52) -->
            <path d="M 246 58 L 274 58 Q 290 120 274 184 L 246 184 Q 260 120 246 58 Z" fill="#06b6d4" stroke="#0e7490" stroke-width="1.6"/>
            <text x="262" y="124" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff" transform="rotate(-90 262 124)">第2関所：DB52</text>
            <!-- Inside Dry Air -->
            <rect x="292" y="40" width="116" height="162" rx="6" fill="#e0f2fe" stroke="#38bdf8"/>
            <text x="350" y="102" text-anchor="middle" font-size="10.0" font-weight="900" fill="#0c4a6e">庫内ドライ空間</text>
            <text x="350" y="122" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0284c7">40% RH</text>
            <text x="350" y="142" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0369a1">湿気侵入 −80%超</text>
            <!-- Vapor Diffusion Attenuation Arrow -->
            <line x1="94" y1="216" x2="342" y2="216" stroke="#0891b2" stroke-width="2.2" marker-end="url(#db52-arrBlue)"/>
            <text x="218" y="236" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0e7490">直列二段拡散抵抗 R₁ + R₂ により停電時の湿度上昇を極限遅延</text>
          </g>

          <!-- Right: Material & KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '追加水蒸気リーク削減', '−80% 超', '単一パッキン構造比（二段エアロック）', '#0891b2')}
            ${drawKpiBox(0, 88, 112, 74, 'ゴム硬度', 'Shore A 35', '超ソフト追従', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '圧縮永久歪', '&lt; 12%', '20年弾性キープ', '#059669')}
            ${drawCompareFrame(0, 172, 234, 82, '白金付加硬化（プラチナキュア）採用', '#0f766e', '#f0fdfa')}
            <text x="12" y="216" font-size="9.0" font-weight="800" fill="#134e4a">医療グレード低シロキサン・シリコーン</text>
            <text x="12" y="236" font-size="8.6" font-weight="600" fill="#115e59">レンズ表面の白濁ガス放出を極限抑制</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: 'Shore A 35 中空ウィングリップ', line2: 'DB04と組む二重エアロック室' },
          { label: '物理的メリット', line1: '水蒸気拡散リークを80%以上削減', line2: 'プラチナキュアで低アウトガス' },
          { label: 'カメラを守る意味', line1: '停電しても乾燥状態を長期維持', line2: '除湿機の稼働回数を減らし省エネ' },
        ],
      });

    case 'db_engine_service_flange':
      return wrapDryboxHdSvg({
        badge: 'DB53',
        stepTag: '15分交換 / 独立気泡',
        title: '背面除湿ユニット着脱フランジ ＆ 独立気泡シリコーン角ガスケット',
        analogy: '箱は30年そのまま使い続け、10年後に心臓部だけをドライバー1本で新品交換できる気密窓枠',
        accent: '#0369a1',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Modular Flange Exploded View -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="386" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="193" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">モジュラー背面サービス開口 3層気密締結構造</text>
            <!-- Layer 1: Steel Cabinet Rear Wall -->
            <rect x="34" y="48" width="44" height="156" rx="4" fill="url(#db53-dark)" stroke="#0f172a" stroke-width="1.5"/>
            <rect x="34" y="88" width="44" height="76" fill="#ffffff" stroke="#64748b" stroke-dasharray="3 2"/>
            <text x="56" y="130" text-anchor="middle" font-size="8.6" font-weight="800" fill="#334155">開口部</text>
            <text x="56" y="220" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">筐体背面</text>
            <!-- Layer 2: Closed-Cell Silicone Gasket -->
            <rect x="116" y="54" width="28" height="144" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>
            <circle cx="130" cy="72" r="3.5" fill="#ffffff"/><circle cx="130" cy="96" r="3.5" fill="#ffffff"/>
            <circle cx="130" cy="156" r="3.5" fill="#ffffff"/><circle cx="130" cy="180" r="3.5" fill="#ffffff"/>
            <text x="130" y="220" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">独立気泡ゴム</text>
            <!-- Layer 3: ADC12 Service Flange + Compression Limiter -->
            <rect x="184" y="46" width="52" height="160" rx="6" fill="url(#db53-steel)" stroke="#334155" stroke-width="1.6"/>
            <text x="210" y="130" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a" transform="rotate(-90 210 130)">ADC12 アルミフランジ</text>
            <!-- Compression limiter collars & M5 Bolts -->
            <line x1="78" y1="68" x2="262" y2="68" stroke="#0f172a" stroke-width="2.2" stroke-dasharray="4 2"/>
            <line x1="78" y1="184" x2="262" y2="184" stroke="#0f172a" stroke-width="2.2" stroke-dasharray="4 2"/>
            <rect x="256" y="61" width="16" height="14" rx="2" fill="#475569"/>
            <rect x="256" y="177" width="16" height="14" rx="2" fill="#475569"/>
            <text x="322" y="72" text-anchor="middle" font-size="9.0" font-weight="800" fill="#334155">M5×10本均等締結</text>
            <text x="322" y="106" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0284c7">圧縮リミッター内蔵</text>
            <text x="322" y="122" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">常に25–35%最適圧縮</text>
            <text x="322" y="156" text-anchor="middle" font-size="9.0" font-weight="800" fill="#059669">除湿コア丸ごと</text>
            <text x="322" y="172" text-anchor="middle" font-size="9.0" font-weight="800" fill="#059669">15分アップグレード!</text>
            <text x="193" y="244" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">EUエコデザイン「修理する権利（Right to Repair）」完全準拠</text>
          </g>

          <!-- Right: Open-cell vs Closed-cell -->
          <g transform="translate(422, 80)">
            ${drawCompareFrame(0, 0, 272, 122, '✅ 独立気泡（クローズドセル）', '#16a34a', '#f0fdf4')}
            <circle cx="42" cy="70" r="10" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
            <circle cx="68" cy="64" r="9" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
            <circle cx="54" cy="92" r="10" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
            <circle cx="84" cy="88" r="9" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
            <text x="110" y="64" font-size="9.4" font-weight="800" fill="#14532d">泡が1つずつ完全密閉</text>
            <text x="110" y="82" font-size="8.8" font-weight="600" fill="#166534">空気・湿気を通さない</text>
            <text x="110" y="100" font-size="8.8" font-weight="800" fill="#15803d">→ IP65超の完璧な防湿!</text>

            ${drawCompareFrame(0, 132, 272, 122, '❌ 一般的な連続気泡スポンジ', '#e11d48', '#fff1f2')}
            <path d="M 28 192 Q 46 172 64 192 T 98 192" fill="none" stroke="#e11d48" stroke-width="2.4" marker-end="url(#db53-arrRed)"/>
            <text x="110" y="186" font-size="9.4" font-weight="800" fill="#881337">泡同士がつながっている</text>
            <text x="110" y="204" font-size="8.8" font-weight="600" fill="#9f1239">スポンジ内部を湿気が通過</text>
            <text x="110" y="222" font-size="8.8" font-weight="800" fill="#e11d48">→ 背面からジワジワ漏湿!</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: 'ADC12フランジ＋独立気泡ゴム', line2: 'M5×10点締結＆圧縮リミッター' },
          { label: '物理的メリット', line1: '25–35%最適圧縮で潰れ劣化防止', line2: '15分で除湿エンジン丸ごと交換' },
          { label: 'カメラを守る意味', line1: '鉄筐体は30年・心臓部は常に最新', line2: '大型サービス開口の気密ゼロ漏れ' },
        ],
      });

    case 'db_ip68_hermetic_glands':
      return wrapDryboxHdSvg({
        badge: 'DB54',
        stepTag: 'IP68 二段バリア密閉',
        title: 'IP68二段ダイアフラム・シリコーン気密ケーブルグランド断面',
        analogy: '潜水艦のケーブル貫通栓！電源線のスキマを二段階のゴム膜で360°ギュッと締めて湿気遮断',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Cross-section of Dual-Diaphragm Cable Gland -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="442" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="221" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">IP68 二段ダイアフラム気密グランド 縦断面図</text>
            <!-- Cabinet Wall -->
            <rect x="208" y="38" width="22" height="178" fill="#475569" stroke="#0f172a" stroke-width="1.5"/>
            <text x="219" y="232" text-anchor="middle" font-size="8.8" font-weight="800" fill="#334155">筐体背面壁</text>
            <!-- Brass Gland Body -->
            <rect x="116" y="70" width="176" height="114" rx="8" fill="url(#db54-steel)" stroke="#334155" stroke-width="1.6"/>
            <!-- Outer O-Ring against wall -->
            <circle cx="204" cy="76" r="6" fill="#0f172a"/>
            <circle cx="204" cy="178" r="6" fill="#0f172a"/>
            <!-- Stage 1: Compression Silicone Ring -->
            <rect x="128" y="84" width="38" height="86" rx="5" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.3"/>
            <!-- Stage 2: Inner Secondary Barrier Diaphragm -->
            <rect x="242" y="88" width="26" height="78" rx="4" fill="#06b6d4" stroke="#0e7490" stroke-width="1.3"/>
            <!-- Power / PD Cable running through center -->
            <rect x="24" y="112" width="394" height="30" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.4"/>
            <text x="221" y="131" text-anchor="middle" font-size="9.4" font-weight="800" fill="#fde047">電源・USB-PD充電・外部センサーケーブル（Ø4.0–8.5mm）</text>
            <!-- 360 compression arrows -->
            <line x1="147" y1="60" x2="147" y2="82" stroke="#e11d48" stroke-width="2.0" marker-end="url(#db54-arrRed)"/>
            <line x1="147" y1="194" x2="147" y2="172" stroke="#e11d48" stroke-width="2.0" marker-end="url(#db54-arrRed)"/>
            ${drawPin(147, 94, 72, 54, 1, '第1シール圧縮リング', '360°均等締付＆引張耐力', '#0284c7', 'end')}
            ${drawPin(255, 96, 312, 54, 2, '第2バリア膜', '圧力変動でも気密維持', '#0891b2')}
            ${drawPin(204, 178, 308, 206, 3, '壁面Oリング', 'ネジ山の微細漏湿遮断', '#0f172a')}
          </g>

          <!-- Right: KPIs -->
          <g transform="translate(478, 80)">
            ${drawKpiBox(0, 0, 216, 78, '保護気密等級', 'IP68', '水深2m相当・差圧20kPa無漏洩', '#0284c7')}
            ${drawKpiBox(0, 88, 216, 74, 'ストレインリリーフ', 'IEC 62444', 'コード引張抜け・断線防止', '#059669')}
            ${drawCompareFrame(0, 172, 216, 82, 'ニッケル真鍮ボディの利点', '#334155', '#f8fafc')}
            <text x="12" y="216" font-size="9.0" font-weight="800" fill="#0f172a">樹脂グランドと違い割れない</text>
            <text x="12" y="236" font-size="8.6" font-weight="600" fill="#475569">編組シールドの筐体接地も兼用</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '二段シリコーン膜＋ニッケル真鍮', line2: '360°圧縮コレット＆壁面Oリング' },
          { label: '物理的メリット', line1: 'IP68完全気密（差圧20 kPa適合）', line2: 'コード引っ張り耐力＆EMI接地' },
          { label: 'カメラを守る意味', line1: '庫内充電配線からの湿気侵入ゼロ', line2: '背面の隠れたリーク経路を完封' },
        ],
      });

    case 'db_rear_hatch_butyl_cld':
      return wrapDryboxHdSvg({
        badge: 'DB55',
        stepTag: 'CLD制振 30倍減衰',
        title: 'ブチルゴム＋アルミ箔 拘束層制振（CLD）デッドニングのせん断消音原理',
        analogy: '高級車のドアと同じ静音シート！鉄板の太鼓みたいな共鳴音をゴムの横ズレ摩擦で熱に変えて消す',
        accent: '#6366f1',
        accentSoft: '#eef2ff',
        body: `
          <!-- Left: CLD Shear Strain Physics -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="388" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="194" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">拘束層制振（CLD）3層サンドイッチの振動エネルギー熱変換</text>
            <!-- Curved bending steel panel -->
            <path d="M 38 148 Q 194 114 350 148 L 350 174 Q 194 140 38 174 Z" fill="url(#db55-dark)" stroke="#0f172a" stroke-width="1.5"/>
            <text x="194" y="160" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">キャビネット鋼板（振動発生源）</text>
            <!-- Viscoelastic Butyl Rubber Layer undergoing strong shear -->
            <path d="M 38 112 Q 194 78 350 112 L 350 146 Q 194 112 38 146 Z" fill="#6366f1" fill-opacity="0.72" stroke="#4338ca" stroke-width="1.4"/>
            <!-- Shear angle lines inside butyl -->
            <line x1="90" y1="138" x2="106" y2="102" stroke="#fde047" stroke-width="2.0"/>
            <line x1="142" y1="128" x2="152" y2="94" stroke="#fde047" stroke-width="2.0"/>
            <line x1="246" y1="128" x2="236" y2="94" stroke="#fde047" stroke-width="2.0"/>
            <line x1="298" y1="138" x2="282" y2="102" stroke="#fde047" stroke-width="2.0"/>
            <text x="194" y="114" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">ブチルゴム粘弾性層 (1.8mm)</text>
            <!-- Stiff Aluminum Foil Constraining Layer -->
            <path d="M 38 96 Q 194 62 350 96 L 350 110 Q 194 76 38 110 Z" fill="url(#db55-steel)" stroke="#334155" stroke-width="1.6"/>
            <text x="194" y="84" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">硬質アルミ拘束箔 (0.15mm・伸びない!)</text>
            <!-- Heat dissipation wave -->
            <text x="194" y="54" text-anchor="middle" font-size="9.8" font-weight="900" fill="#e11d48">横ズレせん断ひずみ γ → 微小熱として振動消滅!</text>
            ${drawPin(102, 118, 126, 206, 1, '強いせん断変形', '損失正接 tan δ 最大化', '#4338ca', 'end')}
            ${drawPin(288, 92, 244, 206, 2, 'アルミ全面バリア', 'ゴム臭気・VOC完全封止', '#0284c7')}
            <text x="194" y="242" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">2026年 宇宙科学実験キャビネット制振研究（DLR準拠）を応用</text>
          </g>

          <!-- Right: Acoustic Resonance Graph -->
          <g transform="translate(424, 80)">
            <rect x="0" y="0" width="270" height="164" rx="10" fill="#ffffff" stroke="#6366f1" stroke-width="1.3"/>
            <text x="135" y="20" text-anchor="middle" font-size="10.4" font-weight="800" fill="#312e81">パネル共鳴ノイズ低減スペクトル</text>
            <!-- Axes -->
            <line x1="34" y1="134" x2="252" y2="134" stroke="#475569" stroke-width="1.4"/>
            <line x1="34" y1="36" x2="34" y2="134" stroke="#475569" stroke-width="1.4"/>
            <!-- Un-damped steel peak -->
            <path d="M 38 122 Q 86 116 114 48 Q 142 118 190 72 Q 218 120 248 124" fill="none" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2"/>
            <!-- CLD damped curve -->
            <path d="M 38 128 Q 114 106 144 122 Q 190 112 248 130" fill="none" stroke="#16a34a" stroke-width="2.8"/>
            <text x="150" y="54" font-size="8.8" font-weight="800" fill="#e11d48">未対策鉄板（太鼓共鳴）</text>
            <text x="152" y="102" font-size="9.0" font-weight="800" fill="#15803d">CLD貼付（−14 dB以上）</text>
            <text x="142" y="152" text-anchor="middle" font-size="8.6" font-weight="700" fill="#475569">周波数 (50 Hz 〜 1,000 Hz)</text>

            ${drawKpiBox(0, 174, 130, 80, '制振効率比', '約 30倍', '非拘束ゴムシート比', '#6366f1')}
            ${drawKpiBox(140, 174, 130, 80, '夜間静音性', '&lt; 20 dBA', '寝室・録音室でも無音', '#059669')}
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '0.15 mmアルミ箔＋1.8 mmブチル', line2: '拘束層制振（CLD）3層複合シート' },
          { label: '物理的メリット', line1: 'せん断ひずみで非拘束比30倍制振', line2: 'パネル共振ピークを −14 dB 低減' },
          { label: 'カメラを守る意味', line1: '寝室・録音スタジオでも完全静音', line2: 'アルミ全面被覆で庫内VOCゼロ' },
        ],
      });

    case 'db_analog_hair_hygrometer':
      return wrapDryboxHdSvg({
        badge: 'DB56',
        stepTag: '電源 0W / 機械基準計',
        title: 'ゼロ電源 合成毛髪アナログ基準湿度計の機械拡大メカニズム',
        analogy: '湿気で伸びる繊維のチカラだけで動くドイツ式機械時計！停電でもデジタル異常でも一生見守る',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Dial Face -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="280" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="140" y="20" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">高視認アナログ基準メーター（正面）</text>
            <circle cx="140" cy="134" r="88" fill="#ffffff" stroke="#334155" stroke-width="5"/>
            <circle cx="140" cy="134" r="78" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
            <!-- Safe Camera Zone 35-50% RH green arc -->
            <path d="M 104 72 A 72 72 0 0 1 176 72" fill="none" stroke="#16a34a" stroke-width="12" stroke-linecap="butt"/>
            <!-- Dry Zone <30% amber -->
            <path d="M 74 114 A 72 72 0 0 1 102 74" fill="none" stroke="#f59e0b" stroke-width="10"/>
            <!-- Mold Zone >60% red -->
            <path d="M 178 74 A 72 72 0 0 1 206 114" fill="none" stroke="#e11d48" stroke-width="10"/>
            <text x="140" y="88" text-anchor="middle" font-size="9.0" font-weight="900" fill="#15803d">カメラ最適 40–50%</text>
            <text x="82" y="138" text-anchor="middle" font-size="8.4" font-weight="800" fill="#b45309">過乾燥</text>
            <text x="198" y="138" text-anchor="middle" font-size="8.4" font-weight="800" fill="#be123c">カビ域</text>
            <!-- Pointer at 42% -->
            <line x1="140" y1="134" x2="128" y2="68" stroke="#0f172a" stroke-width="3.2" stroke-linecap="round"/>
            <circle cx="140" cy="134" r="7" fill="#d97706" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Lower mini bimetal thermometer -->
            <path d="M 108 178 A 40 40 0 0 0 172 178" fill="none" stroke="#0284c7" stroke-width="4"/>
            <line x1="140" y1="184" x2="148" y2="162" stroke="#0284c7" stroke-width="2.2"/>
            <text x="140" y="204" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0369a1">22.5°C バイメタル温度計</text>
            <text x="140" y="242" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">停電中もガラス越しに0.1秒で安全確認!</text>
          </g>

          <!-- Right: Internal Synthetic Hair Mechanism -->
          <g transform="translate(316, 80)">
            <rect x="0" y="0" width="378" height="162" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.3"/>
            <text x="189" y="20" text-anchor="middle" font-size="10.8" font-weight="800" fill="#78350f">背面内部：合成毛髪繊維の2.5%伸縮を数十倍拡大</text>
            <!-- Anchor + Trim Screw -->
            <rect x="24" y="54" width="38" height="32" rx="4" fill="#d97706"/>
            <text x="43" y="74" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">校正ネジ</text>
            <!-- Synthetic Hair Bundle -->
            <line x1="62" y1="64" x2="218" y2="64" stroke="#0284c7" stroke-width="2.4"/>
            <line x1="62" y1="70" x2="218" y2="70" stroke="#0284c7" stroke-width="2.4"/>
            <line x1="62" y1="76" x2="218" y2="76" stroke="#0284c7" stroke-width="2.4"/>
            <text x="140" y="54" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0369a1">合成毛髪繊維束（ΔL/L = 2.5%）</text>
            <!-- Brass Lever & Phosphor Bronze Hairspring -->
            <polygon points="218,52 246,70 218,124" fill="url(#db56-copper)" stroke="#78350f" stroke-width="1.3"/>
            <circle cx="298" cy="86" r="24" fill="none" stroke="#b45309" stroke-width="2.2" stroke-dasharray="5 3"/>
            <line x1="246" y1="70" x2="298" y2="86" stroke="#0f172a" stroke-width="2.2"/>
            <text x="298" y="128" text-anchor="middle" font-size="8.8" font-weight="800" fill="#92400e">リン青銅ひげゼンマイ</text>
            <text x="189" y="148" text-anchor="middle" font-size="8.8" font-weight="700" fill="#78350f">天然毛髪と異なり低湿・低温(−10°C)でも狂わない合成繊維採用</text>

            ${drawKpiBox(0, 174, 184, 80, '消費電力', '0.00 W', '電池不要・永久機械動作', '#d97706')}
            ${drawKpiBox(194, 174, 184, 80, 'デジタル相互監視', '±3% RH', 'SHT45ドリフト異常の独立照合', '#0284c7')}
          </g>
        `,
        cards: [
          { label: '核心素子', line1: '合成毛髪繊維＋バイメタル温度計', line2: 'リン青銅ひげゼンマイ拡大機構' },
          { label: '物理的メリット', line1: '完全0W動作・−10°C低温対応', line2: '背面トリムネジで現場校正可能' },
          { label: 'カメラを守る意味', line1: '長期停電でも一目で湿度確認', line2: 'デジタル計器の嘘を見抜く第2の目' },
        ],
      });

    default:
      return null;
  }
}
