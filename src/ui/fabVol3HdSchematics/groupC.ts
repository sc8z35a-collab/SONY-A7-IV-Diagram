import { drawCompareFrame, drawKpiBox, drawPill, wrapFab3HdSvg } from './shared';

/**
 * Vol.3 Ultra-HD 720x470 Vector Infographics — Group C (10 Parts: F3-25–F3-34):
 * Block 2-C (P02-023–P02-032): DRC, LVS, ERC/Antenna/ESD, 3D Mirror Alignment,
 * Single-Shot vs Stitching, OPC Dog-Ear Serifs, LRC Bossung, MDP Fracturing,
 * 96-Layer Encrypted Tape-Out, Mask Set Scheduling.
 */
export function renderVol3GroupCSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'fab3_p23_drc_geometry_check':
      return wrapFab3HdSvg({
        badge: 'F3-25',
        stepTag: 'P02-023 [業界標準]',
        title: 'DRC（デザインルールチェック：工場ルール数千項目を総点検）',
        analogy: '配線間隔・穴径など数千項目の「建築基準法」をエラーゼロまで全自動検査',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        body: `
          ${drawCompareFrame(24, 82, 326, 250, '❌ DRC違反（最小間隔・最小幅ルール破り）', '#e11d48', '#fff1f2')}
          <g transform="translate(42, 124)">
            <rect x="24" y="20" width="54" height="118" fill="#ea580c"/>
            <rect x="88" y="20" width="54" height="118" fill="#ea580c"/>
            <!-- Short bridge glow -->
            <rect x="74" y="66" width="18" height="24" rx="4" fill="#e11d48"/>
            <text x="196" y="64" font-size="10.2" font-weight="900" fill="#be123c">隙間 &lt; Min Space！</text>
            <text x="196" y="84" font-size="9.4" font-weight="700" fill="#881337">エッチングで繋がり</text>
            <text x="196" y="99" font-size="9.4" font-weight="700" fill="#881337">電源ショート！</text>
            <rect x="172" y="122" width="114" height="32" rx="6" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="229" y="142" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9f1239">全チップ不良リスク</text>
          </g>

          ${drawCompareFrame(364, 82, 332, 250, '✅ DRC Clean（Siemens Calibre / IC Validator）', '#059669', '#f0fdf4')}
          <g transform="translate(382, 124)">
            <rect x="24" y="20" width="54" height="118" fill="#0284c7"/>
            <rect x="116" y="20" width="54" height="118" fill="#0284c7"/>
            <line x1="78" y1="80" x2="116" y2="80" stroke="#059669" stroke-width="2.5"/>
            <text x="97" y="72" text-anchor="middle" font-size="9.2" font-weight="900" fill="#047857">≥ Min</text>
            <rect x="184" y="26" width="114" height="106" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.4"/>
            <text x="241" y="50" text-anchor="middle" font-size="10.2" font-weight="800" fill="#14532d">数千項目の自動検査</text>
            <text x="241" y="70" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">・最小線幅 / 最小間隔</text>
            <text x="241" y="88" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">・ビア包囲マージン</text>
            <text x="241" y="106" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">・エラーゼロ(Clean)！</text>
            <text x="152" y="162" text-anchor="middle" font-size="9.8" font-weight="800" fill="#047857">1か所の違反も許さず全チップ完全クリア</text>
          </g>
        `,
        cards: [
          { label: '検査規模', line1: '最小間隔・最小線幅・穴径など', line2: '工場ルール数千項目を全自動検査' },
          { label: '主要ソフト', line1: 'Siemens Calibre / Synopsys', line2: 'IC Validator で DRC Clean 確認' },
          { label: '失敗すると写真に？', line1: '違反が1か所残るだけで配線同士が', line2: 'ショートし量産する全チップが不良に' },
        ],
      });

    case 'fab3_p24_lvs_netlist_match':
      return wrapFab3HdSvg({
        badge: 'F3-26',
        stepTag: 'P02-024 [業界標準]',
        title: 'LVS（回路図と物理レイアウトの100%完全一致検証）',
        analogy: '描いた図面から回路図を逆算し、元の設計図と1本のズレもなく一致証明',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#f8fafc" stroke="#0d9488" stroke-width="1.4"/>
            <!-- Left: Physical Layout OASIS -->
            <rect x="24" y="28" width="210" height="148" rx="9" fill="#0f172a" stroke="#0284c7" stroke-width="1.6"/>
            <text x="129" y="50" text-anchor="middle" font-size="10.8" font-weight="800" fill="#38bdf8">物理レイアウト（OASIS図形）</text>
            <rect x="44" y="64" width="170" height="22" rx="3" fill="#ea580c"/>
            <rect x="74" y="58" width="22" height="98" rx="3" fill="#22c55e" fill-opacity="0.82"/>
            <rect x="148" y="58" width="22" height="98" rx="3" fill="#38bdf8" fill-opacity="0.82"/>
            <text x="129" y="166" text-anchor="middle" font-size="9.2" font-weight="700" fill="#cbd5e1">物理図形から素子を自動逆算抽出</text>

            <!-- Center: Calibre LVS 100% Match Engine -->
            <line x1="236" y1="102" x2="274" y2="102" stroke="#0d9488" stroke-width="3" marker-end="url(#f326-arrGreen)"/>
            <rect x="278" y="48" width="112" height="108" rx="12" fill="#059669"/>
            <text x="334" y="84" text-anchor="middle" font-size="13" font-weight="900" fill="#ffffff">Calibre</text>
            <text x="334" y="104" text-anchor="middle" font-size="15" font-weight="900" fill="#fef08a">LVS</text>
            <text x="334" y="128" text-anchor="middle" font-size="10" font-weight="800" fill="#d1fae5">100.0%一致</text>
            <text x="334" y="143" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">LVS Clean</text>
            <line x1="432" y1="102" x2="394" y2="102" stroke="#0d9488" stroke-width="3" marker-end="url(#f326-arrGreen)"/>

            <!-- Right: Golden Schematic Netlist -->
            <rect x="434" y="28" width="210" height="148" rx="9" fill="#ffffff" stroke="#059669" stroke-width="1.6"/>
            <text x="539" y="50" text-anchor="middle" font-size="10.8" font-weight="800" fill="#047857">元の設計回路図（Schematic）</text>
            <circle cx="496" cy="96" r="18" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
            <text x="496" y="100" text-anchor="middle" font-size="10" font-weight="800" fill="#065f46">MOS</text>
            <line x1="514" y1="96" x2="562" y2="96" stroke="#0f172a" stroke-width="2"/>
            <circle cx="580" cy="96" r="18" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
            <text x="580" y="100" text-anchor="middle" font-size="10" font-weight="800" fill="#1e40af">PD</text>
            <text x="539" y="140" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">全数トランジスタ・配線照合</text>
            <text x="539" y="164" text-anchor="middle" font-size="9" font-weight="700" fill="#047857">1本・1素子の食い違いもゼロ！</text>

            ${drawPill(24, 198, 300, '電源逆や1本抜け→センサー一切起動せず', false)}
            ${drawPill(344, 198, 300, '全数素子LVS Clean→論理動作を数学保証', true)}
          </g>
        `,
        cards: [
          { label: '照合原理', line1: '物理図形から回路図を自動逆算し', line2: '元の論理回路図と全数素子照合' },
          { label: '主要ツール', line1: 'Siemens Calibre LVS 等による', line2: '100%完全一致（LVS Clean）証明' },
          { label: '失敗すると写真に？', line1: '電源とグランドが逆や信号線1本抜け', line2: 'があればセンサーが一切起動しない！' },
        ],
      });

    case 'fab3_p25_erc_antenna_esd':
      return wrapFab3HdSvg({
        badge: 'F3-27',
        stepTag: 'P02-025 [業界標準]',
        title: 'ERC / プラズマ・アンテナ効果＆ESD静電気保護検証',
        analogy: '製造中のプラズマ静電気を集める「避雷針配線」から極薄ゲート膜を守る避雷装置',
        accent: '#e11d48',
        accentSoft: '#fff1f2',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="424" height="250" rx="10" fill="#f8fafc" stroke="#e11d48" stroke-width="1.4"/>
            <text x="212" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9f1239">プラズマ加工時の「アンテナ破壊」vs 保護ダイオード逃がし回路</text>
            <!-- Plasma Cloud overhead -->
            <ellipse cx="212" cy="54" rx="154" ry="20" fill="#f43f5e" fill-opacity="0.22" stroke="#e11d48" stroke-dasharray="4 2"/>
            <text x="212" y="58" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">⚡ 製造中のプラズマ電荷（プラスイオン）降り注ぐ！</text>
            <!-- Long Floating Metal Antenna Wire -->
            <rect x="52" y="96" width="320" height="18" rx="3" fill="#ea580c"/>
            <text x="212" y="109" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">長い金属配線（避雷針のように電荷を大量収集）</text>
            <line x1="140" y1="74" x2="140" y2="95" stroke="#e11d48" stroke-width="2.5" marker-end="url(#f327-arrRed)"/>
            <line x1="284" y1="74" x2="284" y2="95" stroke="#e11d48" stroke-width="2.5" marker-end="url(#f327-arrRed)"/>
            <!-- Left: Fragile Thin Gate Oxide (Protected!) -->
            <line x1="94" y1="114" x2="94" y2="162" stroke="#475569" stroke-width="3"/>
            <rect x="48" y="162" width="92" height="14" fill="#38bdf8"/>
            <rect x="38" y="176" width="112" height="44" rx="4" fill="#334155"/>
            <text x="94" y="200" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">極薄ゲート酸化膜</text>
            <text x="94" y="214" text-anchor="middle" font-size="8.6" font-weight="700" fill="#bae6fd">（破壊から保護！）</text>
            <!-- Right: Auto-Inserted Antenna Protection Diode safely draining charge to Substrate -->
            <line x1="312" y1="114" x2="312" y2="152" stroke="#059669" stroke-width="4" marker-end="url(#f327-arrGreen)"/>
            <rect x="242" y="156" width="142" height="64" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.8"/>
            <text x="313" y="178" text-anchor="middle" font-size="10.2" font-weight="900" fill="#14532d">🛡️ アンテナ保護ダイオード</text>
            <text x="313" y="196" text-anchor="middle" font-size="9.2" font-weight="700" fill="#166534">静電気を安全に基板へ逃がす</text>
            <text x="313" y="211" text-anchor="middle" font-size="8.8" font-weight="700" fill="#047857">Calibre PERC 自動挿入確認</text>
          </g>
          <g transform="translate(464, 82)">
            ${drawKpiBox(0, 0, 228, 76, '主な検証ソフト', 'Calibre PERC 等', '全配線面積比＆ESD耐性検証', '#e11d48')}
            ${drawKpiBox(0, 86, 228, 76, '防止対策', 'ダイオード自動挿入', '上層配線ジャンパー併用で保護', '#059669')}
            ${drawPill(0, 174, 228, '破壊→特定画素列の感度異常・ノイズ', false)}
            ${drawPill(0, 208, 228, '全配線ERCクリア→長期高信頼性', true)}
          </g>
        `,
        cards: [
          { label: 'アンテナ効果', line1: 'プラズマ加工時に長い配線が静電気を', line2: '溜め極薄ゲート酸化膜を突き破る現象' },
          { label: '検証・対策', line1: 'Calibre PERCで配線面積比検証＆', line2: 'アンテナダイオード自動挿入確認' },
          { label: '失敗すると写真に？', line1: '特定の画素列だけ感度が異常になったり', line2: '縦スジノイズが増えて歩留まり低下' },
        ],
      });

    case 'fab3_p26_3d_mirror_stack_verify':
      return wrapFab3HdSvg({
        badge: 'F3-28',
        stepTag: 'P02-026 [業界標準]',
        title: '3D上下チップ整合性検証（鏡像反転＆5,040万Cu-Cu照合）',
        analogy: '画素ウェーハを180°ひっくり返して重ねても全接点が1nmもズレないか最終確認',
        accent: '#6366f1',
        accentSoft: '#eef2ff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#f8fafc" stroke="#6366f1" stroke-width="1.4"/>
            <text x="334" y="21" text-anchor="middle" font-size="11.4" font-weight="800" fill="#312e81">Face-to-Face 3D積層：鏡像（左右反転）座標の100%完全照合</text>
            <!-- Left: Pixel Wafer BEFORE Flip -->
            <rect x="26" y="38" width="174" height="132" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
            <text x="113" y="58" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0c4a6e">画素ウェーハ（反転前）</text>
            <circle cx="62" cy="96" r="10" fill="#e11d48"/><text x="62" y="100" text-anchor="middle" font-size="9" font-weight="900" fill="#fff">A</text>
            <circle cx="113" cy="96" r="10" fill="#f59e0b"/><text x="113" y="100" text-anchor="middle" font-size="9" font-weight="900" fill="#fff">B</text>
            <circle cx="164" cy="96" r="10" fill="#10b981"/><text x="164" y="100" text-anchor="middle" font-size="9" font-weight="900" fill="#fff">C</text>
            <text x="113" y="138" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0369a1">左から A − B − C の並び</text>

            <!-- Flip Arrow -->
            <path d="M 206 104 Q 242 54 278 104" fill="none" stroke="#7c3aed" stroke-width="3" marker-end="url(#f328-arrPurple)"/>
            <text x="242" y="66" text-anchor="middle" font-size="9.5" font-weight="900" fill="#6d28d9">180°鏡像反転！</text>

            <!-- Center-Right: Stacked Face-to-Face Match! -->
            <rect x="284" y="36" width="358" height="136" rx="9" fill="#0f172a" stroke="#10b981" stroke-width="1.8"/>
            <text x="463" y="56" text-anchor="middle" font-size="10.5" font-weight="800" fill="#34d399">仮想空間 3D-LVS 接続マップ照合（最大5,040万接点）</text>
            <!-- Top Flipped Pixel: C - B - A -->
            <rect x="314" y="66" width="298" height="30" rx="5" fill="#0284c7"/>
            <circle cx="364" cy="81" r="9" fill="#10b981"/><text x="364" y="84.5" text-anchor="middle" font-size="8.5" font-weight="900" fill="#fff">C</text>
            <circle cx="463" cy="81" r="9" fill="#f59e0b"/><text x="463" y="84.5" text-anchor="middle" font-size="8.5" font-weight="900" fill="#fff">B</text>
            <circle cx="562" cy="81" r="9" fill="#e11d48"/><text x="562" y="84.5" text-anchor="middle" font-size="8.5" font-weight="900" fill="#fff">A</text>
            <!-- Green laser alignment beams -->
            <line x1="364" y1="96" x2="364" y2="122" stroke="#34d399" stroke-width="3"/>
            <line x1="463" y1="96" x2="463" y2="122" stroke="#34d399" stroke-width="3"/>
            <line x1="562" y1="96" x2="562" y2="122" stroke="#34d399" stroke-width="3"/>
            <!-- Bottom Logic: C - B - A -->
            <rect x="314" y="122" width="298" height="30" rx="5" fill="#4f46e5"/>
            <circle cx="364" cy="137" r="9" fill="#10b981"/><text x="364" y="140.5" text-anchor="middle" font-size="8.5" font-weight="900" fill="#fff">C</text>
            <circle cx="463" cy="137" r="9" fill="#f59e0b"/><text x="463" y="140.5" text-anchor="middle" font-size="8.5" font-weight="900" fill="#fff">B</text>
            <circle cx="562" cy="137" r="9" fill="#e11d48"/><text x="562" y="140.5" text-anchor="middle" font-size="8.5" font-weight="900" fill="#fff">A</text>

            ${drawPill(26, 196, 300, '1層でも反転ミス→上下全く繋がらず大惨事', false)}
            ${drawPill(342, 196, 300, '鏡像＆座標100%一致→完璧な3D積層接続', true)}
          </g>
        `,
        cards: [
          { label: '鏡像チェック', line1: '画素ウェーハを左右反転して重ねた', line2: '状態で数百万〜5,040万パッドを照合' },
          { label: '検証ツール', line1: '3D-LVS 検証ツールにより鏡像反転と', line2: '上下3D接続マップの100%一致を確認' },
          { label: '失敗すると写真に？', line1: 'ミラー反転を1層でも間違えると上下', line2: 'チップが全く繋がらない壊滅事故に！' },
        ],
      });

    case 'fab3_p27_single_vs_stitch_split':
      return wrapFab3HdSvg({
        badge: 'F3-29',
        stepTag: 'P02-027 [確認済み/標準]',
        title: 'フルサイズ露光方式の運命分岐：一括露光 vs スティッチング分割',
        analogy: '特大カメラで継ぎ目なし1発焼きか、標準機で3分割し光の濃さを溶け込ませるか',
        accent: '#f59e0b',
        accentSoft: '#fffbeb',
        body: `
          <!-- Left: Single-Shot (Canon FPA-6300ESW / FPA-5550iX) -->
          ${drawCompareFrame(22, 82, 326, 250, '① 一括露光方式（1ショット継ぎ目ゼロ！）', '#0284c7', '#f0f9ff')}
          <g transform="translate(38, 120)">
            <!-- Giant Canon Exposure Field encompassing 36x24mm -->
            <rect x="20" y="6" width="254" height="114" rx="8" fill="#bae6fd" stroke="#0284c7" stroke-width="2" stroke-dasharray="5 3"/>
            <text x="147" y="23" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0369a1">特大露光フィールド：33×42.2mm / 50×50mm</text>
            <rect x="46" y="32" width="202" height="76" rx="5" fill="#0284c7" stroke="#ffffff" stroke-width="1.6"/>
            <text x="147" y="68" text-anchor="middle" font-size="13" font-weight="900" fill="#ffffff">フルサイズ 36×24mm</text>
            <text x="147" y="88" text-anchor="middle" font-size="9.6" font-weight="700" fill="#e0f2fe">6インチマスク1枚に丸ごと一括収容！</text>
            <text x="147" y="142" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0c4a6e">代表機：キヤノン FPA-6300ESW / FPA-5550iX</text>
            <text x="147" y="162" text-anchor="middle" font-size="9.4" font-weight="800" fill="#059669">✅ つなぎ目段差ゼロ・最高速スループット！</text>
            <text x="147" y="182" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">専用大型レンズ露光機が必要</text>
          </g>

          <!-- Right: Stitching Exposure (26x33mm Standard Scanner -> 2-3 Shots) -->
          ${drawCompareFrame(362, 82, 336, 250, '② スティッチング露光（標準26×33mm機 2〜3分割）', '#d97706', '#fffbeb')}
          <g transform="translate(378, 120)">
            <!-- 3 Stitched Blocks with Glowing Overlap Dose-Gradient Seams -->
            <rect x="20" y="24" width="84" height="82" rx="4" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/>
            <text x="62" y="68" text-anchor="middle" font-size="10" font-weight="800" fill="#78350f">左ブロック</text>
            <rect x="110" y="24" width="84" height="82" rx="4" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
            <text x="152" y="68" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">中央ブロック</text>
            <rect x="200" y="24" width="84" height="82" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
            <text x="242" y="68" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">右ブロック</text>
            <!-- Overlap Seam Bands -->
            <rect x="98" y="20" width="18" height="90" fill="#e11d48" fill-opacity="0.72"/>
            <rect x="188" y="20" width="18" height="90" fill="#e11d48" fill-opacity="0.72"/>
            <text x="152" y="14" text-anchor="middle" font-size="9.2" font-weight="900" fill="#be123c">▼ つなぎ目（露光量グラデーション重畳設計）▼</text>
            <!-- Feathering dose graph -->
            <polyline points="24,138 96,138 118,122 186,122 208,138 280,138" fill="none" stroke="#059669" stroke-width="2.2"/>
            <text x="152" y="156" text-anchor="middle" font-size="9.4" font-weight="800" fill="#92400e">代表：Tower Semiconductor 等の26×33mm標準機</text>
            <text x="152" y="176" text-anchor="middle" font-size="9.2" font-weight="800" fill="#be123c">❌ 継ぎ目設計が甘いと青空に縦線バンディング！</text>
          </g>
        `,
        cards: [
          { label: '① 一括露光', line1: 'キヤノンFPA-6300ESW(33×42.2mm)', line2: 'FPA-5550iX(50×50mm)で1ショット' },
          { label: '② スティッチング', line1: '26×33mm標準機で2〜3分割露光し', line2: '重なり部の露光量グラデーション設計' },
          { label: '失敗すると写真に？', line1: 'つなぎ目設計が甘いと青い空に縦に', line2: 'うっすら横切るスティッチング段差線！' },
        ],
      });

    case 'fab3_p28_opc_serif_correction':
      return wrapFab3HdSvg({
        badge: 'F3-30',
        stepTag: 'P02-028 [業界標準]',
        title: 'OPC（光近接効果補正：犬の耳セリフで光のニジミを逆算）',
        analogy: '光は細いと角が丸くニジむため、型紙の角へわざと「犬の耳」を付けて逆算補正',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        body: `
          <!-- Left: Without OPC (Diffraction Rounds Corners!) -->
          ${drawCompareFrame(22, 82, 206, 250, '❌ OPC無し（光の回折で崩れる）', '#e11d48', '#fff1f2')}
          <g transform="translate(36, 122)">
            <text x="89" y="14" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">単純な四角マスク</text>
            <path d="M 46 24 L 84 24 L 84 82 L 138 82 L 138 118 L 46 118 Z" fill="#334155"/>
            <text x="89" y="138" text-anchor="middle" font-size="9.2" font-weight="800" fill="#7c3aed">↓ 193/248nm 光が回折 ↓</text>
            <!-- Blobby rounded distorted wafer print -->
            <path d="M 52 152 Q 65 144 78 152 Q 82 178 96 184 Q 130 184 134 198 Q 132 212 96 212 Q 52 212 52 184 Z" fill="#fb7185" stroke="#be123c" stroke-width="2"/>
            <text x="89" y="198" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">角丸・線細り！</text>
          </g>

          <!-- Center & Right: WITH OPC (Dog-Ear Serifs + SRAF -> Crisp Square on Wafer!) -->
          ${drawCompareFrame(242, 82, 456, 250, '✅ OPC適用後（Siemens Calibre OPC / Synopsys Proteus：精度1nm未満）', '#059669', '#f0fdf4')}
          <g transform="translate(260, 120)">
            <!-- OPC Modified Mask with Hammerhead Dog-Ear Serifs & SRAF Bars -->
            <rect x="6" y="10" width="182" height="176" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.6"/>
            <text x="97" y="28" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fde68a">OPC逆算変形マスク</text>
            <!-- SRAF scattering bars -->
            <rect x="26" y="54" width="6" height="96" fill="#94a3b8"/>
            <rect x="162" y="54" width="6" height="96" fill="#94a3b8"/>
            <!-- Main L-shape with Dog-Ear Serifs (Amber ears) -->
            <path d="M 54 52 L 88 52 L 88 114 L 142 114 L 142 148 L 54 148 Z" fill="#cbd5e1"/>
            <rect x="44" y="42" width="16" height="16" fill="#f59e0b"/>
            <rect x="82" y="42" width="16" height="16" fill="#f59e0b"/>
            <rect x="44" y="140" width="16" height="16" fill="#f59e0b"/>
            <rect x="134" y="104" width="16" height="16" fill="#f59e0b"/>
            <rect x="134" y="140" width="16" height="16" fill="#f59e0b"/>
            <!-- Inner anti-serif notch -->
            <rect x="84" y="108" width="12" height="12" fill="#0f172a"/>
            <text x="97" y="176" text-anchor="middle" font-size="8.8" font-weight="800" fill="#fbbf24">犬の耳セリフ(黄)＋補助バー(灰)</text>

            <!-- Arrow with 193nm UV -->
            <line x1="194" y1="98" x2="232" y2="98" stroke="#059669" stroke-width="3.2" marker-end="url(#f330-arrGreen)"/>
            <text x="213" y="88" text-anchor="middle" font-size="9.2" font-weight="800" fill="#047857">露光！</text>

            <!-- Crisp Square Printed Result on Silicon Wafer -->
            <rect x="238" y="10" width="182" height="176" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.8"/>
            <text x="329" y="28" text-anchor="middle" font-size="9.6" font-weight="800" fill="#14532d">ウェーハ上の焼き上がり像</text>
            <path d="M 286 52 L 320 52 L 320 114 L 374 114 L 374 148 L 286 148 Z" fill="#0ea5e9" stroke="#0284c7" stroke-width="2"/>
            <text x="329" y="174" text-anchor="middle" font-size="9.5" font-weight="900" fill="#047857">完璧な直角＆設計線幅(ORC合格)！</text>
            <text x="210" y="204" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">スーパーコンピュータで数時間〜数日かけて全チップ数十億図形を1nm未満で計算</text>
          </g>
        `,
        cards: [
          { label: '光の逆算魔法', line1: '角へ「犬の耳（セリフ）」を付け', line2: '線幅を1nm単位でわざと太らせ細らせ' },
          { label: 'スパコン計算', line1: 'Calibre OPC / Synopsys Proteusで', line2: '数時間〜数日計算＆ORC像検証' },
          { label: '失敗すると写真に？', line1: 'トランジスタのスイッチ長さが狂い', line2: '画素ごとの感度ムラ・ノイズ悪化に！' },
        ],
      });

    case 'fab3_p29_lrc_bossung_window':
      return wrapFab3HdSvg({
        badge: 'F3-31',
        stepTag: 'P02-029 [業界標準]',
        title: 'リソグラフィ・プロセスウィンドウ検証（LRC：焦点＆露光量余裕）',
        analogy: 'ピントが数十nm・光が±5%揺れても線が切れない「安全運転ゾーン」の全数検査',
        accent: '#10b981',
        accentSoft: '#ecfdf5',
        body: `
          <g transform="translate(26, 82)">
            <!-- Bossung Curve Plot -->
            <rect x="0" y="0" width="424" height="250" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
            <text x="212" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#6ee7b7">ボッスン曲線（Bossung Plot）＆ プロセスウィンドウ</text>
            <!-- Target CD ±10% safe horizontal band -->
            <rect x="44" y="88" width="352" height="74" fill="#10b981" fill-opacity="0.16"/>
            <line x1="44" y1="88" x2="396" y2="88" stroke="#34d399" stroke-dasharray="5 3"/>
            <line x1="44" y1="162" x2="396" y2="162" stroke="#34d399" stroke-dasharray="5 3"/>
            <!-- Bossung smile curves for different exposure doses -->
            <path d="M 52 72 Q 220 112 388 72" fill="none" stroke="#f43f5e" stroke-width="2.2"/>
            <path d="M 52 106 Q 220 120 388 106" fill="none" stroke="#fbbf24" stroke-width="2.4"/>
            <path d="M 52 126 Q 220 126 388 126" fill="none" stroke="#38bdf8" stroke-width="3"/>
            <path d="M 52 148 Q 220 134 388 148" fill="none" stroke="#a78bfa" stroke-width="2.4"/>
            <path d="M 52 184 Q 220 144 388 184" fill="none" stroke="#f43f5e" stroke-width="2.2"/>
            <!-- Inscribed Process Window Green Safe Box -->
            <rect x="134" y="92" width="172" height="66" rx="6" fill="#10b981" fill-opacity="0.26" stroke="#34d399" stroke-width="2.5"/>
            <text x="220" y="122" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">安全プロセスウィンドウ</text>
            <text x="220" y="139" text-anchor="middle" font-size="9.2" font-weight="800" fill="#a7f3d0">フォーカス±数十nm × ドーズ±5%</text>
            <text x="220" y="218" text-anchor="middle" font-size="9.6" font-weight="700" fill="#cbd5e1">◀ -デフォーカス ──── ベストフォーカス ──── +デフォーカス ▶</text>
            <text x="220" y="236" text-anchor="middle" font-size="9" font-weight="700" fill="#94a3b8">縦軸：焼き上がり線幅(CD) ／ 曲線群：露光量(ドーズ)変動</text>
          </g>
          <g transform="translate(464, 82)">
            ${drawKpiBox(0, 0, 228, 76, '検証マトリクス', 'Focus±数十nm / ±5%', '全チップのリソグラフィ余裕度解析', '#10b981')}
            ${drawKpiBox(0, 86, 228, 76, '合格基準', 'ホットスポット ゼロ', '断線・ブリッジ危険個所を完全根絶', '#0284c7')}
            ${drawPill(0, 174, 228, '余裕狭い→量産時に歩留まり激減', false)}
            ${drawPill(0, 208, 228, 'LRC合格→高歩留まり安定量産！', true)}
          </g>
        `,
        cards: [
          { label: '検証条件', line1: '露光ピント（フォーカス±数十nm）と', line2: '光量（ドーズ±5%）の同時変動解析' },
          { label: 'ホットスポット対策', line1: 'パターン断線・短絡リスク箇所を', line2: '全チップ計算しゼロになるまで修正' },
          { label: '失敗すると写真に？', line1: '余裕度が狭い箇所が残ると量産時に', line2: '歩留まりが激減し不良センサー多発' },
        ],
      });

    case 'fab3_p30_mdp_fracture_pec':
      return wrapFab3HdSvg({
        badge: 'F3-32',
        stepTag: 'P02-030 [業界標準]',
        title: 'マスクデータ変換（MDPフラクチャリング＆電子線PEC補正）',
        analogy: '複雑なOPC図形を微小な長方形・台形パズルに分解し電子の跳ね返りも先読み補正',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4"/>
            <!-- Step 1: OPC Polygon -->
            <rect x="18" y="28" width="174" height="148" rx="8" fill="#ffffff" stroke="#64748b"/>
            <text x="105" y="48" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">① OPC済み複雑多角形</text>
            <path d="M 52 72 L 96 72 L 96 104 L 154 104 L 154 148 L 52 148 Z" fill="#6366f1"/>
            <rect x="44" y="64" width="14" height="14" fill="#f59e0b"/>
            <rect x="146" y="96" width="14" height="14" fill="#f59e0b"/>
            <text x="105" y="168" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">OASIS 階層図形データ</text>

            <line x1="196" y1="102" x2="226" y2="102" stroke="#0284c7" stroke-width="2.8" marker-end="url(#f332-arrBlue)"/>

            <!-- Step 2: Fracturing into Tiny Rectangles/Trapezoids -->
            <rect x="230" y="28" width="194" height="148" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
            <text x="327" y="48" text-anchor="middle" font-size="10.2" font-weight="800" fill="#38bdf8">② フラクチャリング（分割）</text>
            <g stroke="#e0f2fe" stroke-width="1">
              <rect x="256" y="64" width="22" height="22" fill="#f59e0b"/>
              <rect x="278" y="64" width="28" height="22" fill="#0284c7"/>
              <rect x="256" y="86" width="50" height="22" fill="#38bdf8"/>
              <rect x="256" y="108" width="50" height="36" fill="#0ea5e9"/>
              <rect x="306" y="108" width="46" height="36" fill="#2563eb"/>
              <rect x="352" y="100" width="38" height="44" fill="#f59e0b"/>
            </g>
            <text x="327" y="168" text-anchor="middle" font-size="8.8" font-weight="700" fill="#bae6fd">微小長方形・台形＋PECドーズ変調</text>

            <line x1="428" y1="102" x2="458" y2="102" stroke="#059669" stroke-width="2.8" marker-end="url(#f332-arrGreen)"/>

            <!-- Step 3: TB Write Data + XOR Verification -->
            <rect x="462" y="28" width="188" height="148" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
            <text x="556" y="48" text-anchor="middle" font-size="10.2" font-weight="800" fill="#047857">③ TB級描画データ＆XOR</text>
            <text x="556" y="82" text-anchor="middle" font-size="16" font-weight="900" fill="#0f172a">数 TB 級</text>
            <text x="556" y="104" text-anchor="middle" font-size="9.4" font-weight="700" fill="#065f46">電子跳ね返り（PEC）補正済</text>
            <rect x="484" y="122" width="144" height="34" rx="6" fill="#059669"/>
            <text x="556" y="143" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">XOR 差分 0.000% 合格</text>

            ${drawPill(20, 198, 304, '変換バグ→マスクに意図せぬヒゲ・欠け', false)}
            ${drawPill(344, 198, 304, 'PEC補正＋XOR完全照合→描画機へ投入', true)}
          </g>
        `,
        cards: [
          { label: 'フラクチャリング', line1: '電子ビーム機が描ける無数の小さな', line2: '長方形・台形集合へ変換（TB級）' },
          { label: 'PEC＆XOR検証', line1: '描画時の電子跳ね返り（PEC）補正＆', line2: '元図形とのXOR完全一致比較検証' },
          { label: '失敗すると写真に？', line1: 'データ変換バグがあると意図しない', line2: '微細なヒゲや欠けがマスクに刻まれる' },
        ],
      });

    case 'fab3_p31_tapeout_96layers':
      return wrapFab3HdSvg({
        badge: 'F3-33',
        stepTag: 'P02-031 [標準/推定]',
        title: 'テープアウト（全約96層データ最終確定・暗号化送信）',
        analogy: '全員がサインオフし数億円の設計データに厳重な鍵を掛けて送る「運命の送信」',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#f8fafc" stroke="#7c3aed" stroke-width="1.4"/>
            <!-- 3-Department Sign-off -->
            <rect x="20" y="24" width="184" height="148" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.4"/>
            <text x="112" y="44" text-anchor="middle" font-size="10.4" font-weight="800" fill="#5b21b6">① 3部門 最終サインオフ</text>
            <rect x="34" y="56" width="156" height="26" rx="5" fill="#ede9fe"/><text x="112" y="73" text-anchor="middle" font-size="9.5" font-weight="800" fill="#4c1d95">✅ 設計部門（画素/回路）</text>
            <rect x="34" y="90" width="156" height="26" rx="5" fill="#dbeafe"/><text x="112" y="107" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1e40af">✅ 製造部門（プロセス）</text>
            <rect x="34" y="124" width="156" height="26" rx="5" fill="#dcfce7"/><text x="112" y="141" text-anchor="middle" font-size="9.5" font-weight="800" fill="#14532d">✅ 品質保証部門（QA）</text>

            <line x1="208" y1="98" x2="236" y2="98" stroke="#7c3aed" stroke-width="2.8" marker-end="url(#f333-arrPurple)"/>

            <!-- 96-Layer Encrypted Bundle -->
            <rect x="240" y="24" width="212" height="148" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.8"/>
            <text x="346" y="44" text-anchor="middle" font-size="10.4" font-weight="800" fill="#fde68a">🔒 約96層 暗号化バンドル [推定]</text>
            <text x="346" y="68" text-anchor="middle" font-size="9.5" font-weight="700" fill="#c4b5fd">画素FEOL：25層 ／ BEOL：13層</text>
            <text x="346" y="88" text-anchor="middle" font-size="9.5" font-weight="700" fill="#38bdf8">ロジック層：48層（最大構成）</text>
            <text x="346" y="108" text-anchor="middle" font-size="9.5" font-weight="700" fill="#34d399">裏面加工：5層 ／ 光学CFA・OCL：5層</text>
            <rect x="262" y="126" width="168" height="30" rx="6" fill="#d97706"/>
            <text x="346" y="145" text-anchor="middle" font-size="9.8" font-weight="900" fill="#ffffff">SHA チェックサム完全照合</text>

            <line x1="456" y1="98" x2="484" y2="98" stroke="#0284c7" stroke-width="2.8" marker-end="url(#f333-arrBlue)"/>

            <!-- Mask Shop Receiver -->
            <rect x="488" y="24" width="160" height="148" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
            <text x="568" y="46" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0c4a6e">③ マスク工場へ着弾</text>
            <text x="568" y="82" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0369a1">後戻り不可の</text>
            <text x="568" y="102" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0369a1">製作スタート！</text>
            <text x="568" y="132" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">セキュア専用回線</text>
            <text x="568" y="148" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">復号・登録完了</text>

            ${drawPill(20, 198, 304, '着工後ミス発覚→数千万〜数億円＋数週遅延', false)}
            ${drawPill(344, 198, 304, 'チェックサム完全一致→マスク製造開始！', true)}
          </g>
        `,
        cards: [
          { label: '確定レイヤー', line1: '画素25+13・ロジック48・裏面5・光学5', line2: '＝ 全 約96レイヤー最終確定 [推定]' },
          { label: 'セキュア送信', line1: '3部門サインオフ後に暗号化回線で', line2: 'マスク工場へ送信・チェックサム照合' },
          { label: '失敗すると写真に？', line1: 'マスク製作開始後のバグ修正には', line2: '数千万円〜数億円と数週間の大遅延！' },
        ],
      });

    case 'fab3_p32_mask_set_scheduling':
      return wrapFab3HdSvg({
        badge: 'F3-34',
        stepTag: 'P02-032 [業界標準]',
        title: 'マスクセット生産計画・層別グレード割当（PSM vs バイナリCr）',
        analogy: '微細層は最高級の位相シフト＋マルチビームEB、緩い層はレーザーへ賢く振り分け',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        body: `
          <!-- Two Parallel Mask Manufacturing Grade Lanes -->
          ${drawCompareFrame(24, 82, 326, 250, '⚡ 最微細グレード（ロジックゲート・M1配線等）', '#4f46e5', '#eef2ff')}
          <g transform="translate(40, 122)">
            <rect x="14" y="10" width="264" height="44" rx="7" fill="#4f46e5"/>
            <text x="146" y="30" text-anchor="middle" font-size="10.6" font-weight="800" fill="#ffffff">ハーフトーン位相シフト膜（MoSi PSM）</text>
            <text x="146" y="45" text-anchor="middle" font-size="9" font-weight="700" fill="#c7d2fe">180°位相反転で極限解像力！</text>
            <text x="146" y="76" text-anchor="middle" font-size="11" font-weight="900" fill="#4338ca">▼</text>
            <rect x="14" y="84" width="264" height="46" rx="7" fill="#ffffff" stroke="#4f46e5" stroke-width="1.5"/>
            <text x="146" y="104" text-anchor="middle" font-size="10.4" font-weight="800" fill="#1e1b4b">26万本 マルチビーム電子線描画</text>
            <text x="146" y="120" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">位置精度 1〜2nm / 1枚 数時間〜十数時間</text>
            <text x="146" y="156" text-anchor="middle" font-size="9.4" font-weight="800" fill="#4338ca">超高精度だが超高コスト → 最重要層へ集中投入</text>
          </g>

          ${drawCompareFrame(364, 82, 332, 250, '⚙️ 中・粗グレード（イオン注入窓・厚膜・CFA等）', '#0284c7', '#f0f9ff')}
          <g transform="translate(380, 122)">
            <rect x="14" y="10" width="270" height="44" rx="7" fill="#334155"/>
            <text x="149" y="30" text-anchor="middle" font-size="10.6" font-weight="800" fill="#ffffff">バイナリ・クロム遮光膜（Binary Cr）</text>
            <text x="149" y="45" text-anchor="middle" font-size="9" font-weight="700" fill="#cbd5e1">シンプルで高コントラストな0/1遮光</text>
            <text x="149" y="76" text-anchor="middle" font-size="11" font-weight="900" fill="#0284c7">▼</text>
            <rect x="14" y="84" width="270" height="46" rx="7" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="149" y="104" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0c4a6e">高速レーザー描画装置（Mycronic等）</text>
            <text x="149" y="120" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">高速・低コストで量産納期を短縮</text>
            <text x="149" y="156" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0369a1">MES管制：テクセンドフォトマスク / DNP / 自社</text>
          </g>
        `,
        cards: [
          { label: '層別最適化', line1: '最微細層はMoSi PSM＋マルチビームEB', line2: '緩い層はバイナリCr＋レーザー描画' },
          { label: 'マスク工場MES', line1: 'テクセンドフォトマスク（旧凸版）', line2: '大日本印刷(DNP)・自社部門で管理' },
          { label: '失敗すると写真に？', line1: '過剰仕様でコスト青天井、過小仕様で', line2: '解像力不足となり画質・歩留まり悪化' },
        ],
      });

    default:
      return null;
  }
}
