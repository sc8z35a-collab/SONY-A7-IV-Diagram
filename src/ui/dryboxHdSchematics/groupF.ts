import { drawCompareFrame, drawKpiBox, drawPill, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group F (12 Parts: DB57–DB68):
 * Modular Shelving, Seismic Guard, Calibration Port, Flicker-Free LED,
 * Li-Ion Off-Gas Safety, PEM Clamping/Driver, MOF Cage & Redundant 120/138°C Thermal Protection.
 */
export function renderDryboxGroupFSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_pilaster_shelf_clips':
      return wrapDryboxHdSvg({
        badge: 'DB57',
        stepTag: '25mmピッチ / 40kgf耐荷重',
        title: '25 mmピッチ SUS304ピラスター柱 ＆ 防振抜け止め爪クリップ構造',
        analogy: 'レンズの背丈に合わせて棚の高さを2.5 cm刻みで自在調整＆ゴム靴でビビり音ゼロの支柱',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Pilaster & Clip Interlock Detail -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="380" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="190" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">SUS304 ピラスター × 抜け止めクリップ 拡大断面</text>
            <!-- Vertical Pilaster Channel -->
            <rect x="52" y="38" width="40" height="196" rx="4" fill="url(#db57-steel)" stroke="#334155" stroke-width="1.6"/>
            <!-- 25mm Pitch Slots -->
            <rect x="65" y="52" width="14" height="16" rx="2" fill="#0f172a"/>
            <rect x="65" y="88" width="14" height="16" rx="2" fill="#0f172a"/>
            <rect x="65" y="124" width="14" height="16" rx="2" fill="#0f172a"/>
            <rect x="65" y="160" width="14" height="16" rx="2" fill="#0f172a"/>
            <rect x="65" y="196" width="14" height="16" rx="2" fill="#0f172a"/>
            <!-- Pitch Dimension -->
            <line x1="36" y1="60" x2="36" y2="96" stroke="#0284c7" stroke-width="1.6"/>
            <text x="22" y="82" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0284c7" transform="rotate(-90 22 82)">25 mm</text>
            <!-- Shelf Clip Hooked into Slot -->
            <path d="M 70 96 L 92 96 L 92 142 L 182 142 L 182 158 L 92 158 L 92 172 L 70 172 L 70 162 L 82 162 L 82 106 L 70 106 Z" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.4"/>
            <!-- Silicone Vibration Pad on top of clip -->
            <rect x="102" y="132" width="76" height="10" rx="3" fill="#16a34a" stroke="#14532d" stroke-width="1.2"/>
            <!-- Shelf Rail sitting on Silicone Pad -->
            <rect x="108" y="106" width="150" height="24" rx="4" fill="#334155" stroke="#0f172a" stroke-width="1.4"/>
            <text x="183" y="122" text-anchor="middle" font-size="9.0" font-weight="800" fill="#ffffff">スライド棚フレーム</text>
            <!-- Load arrow -->
            <line x1="183" y1="74" x2="183" y2="102" stroke="#e11d48" stroke-width="2.6" marker-end="url(#db57-arrRed)"/>
            <text x="234" y="86" font-size="9.2" font-weight="800" fill="#e11d48">垂直荷重 → 柱へ逃がす</text>
            ${drawPin(142, 136, 224, 184, 1, 'Shore A 60 防振パッド', '金属びびり＆床振動絶縁', '#16a34a')}
            ${drawPin(76, 168, 224, 222, 2, '下部アップリフト爪', '地震突き上げ脱落阻止', '#0284c7')}
          </g>

          <!-- Right: Layout Flexibility & KPIs -->
          <g transform="translate(416, 80)">
            ${drawKpiBox(0, 0, 134, 78, '段ピッチ', '25 mm', '全32段・無駄隙間ゼロ', '#0284c7')}
            ${drawKpiBox(144, 0, 134, 78, '1段許容荷重', '40 kgf', '4点支持・大口径満載OK', '#059669')}
            ${drawCompareFrame(0, 90, 278, 164, '機材背丈に合わせた自在レイアウト例', '#334155', '#ffffff')}
            <rect x="16" y="132" width="246" height="26" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
            <text x="139" y="149" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0c4a6e">上段：ミラーレス＋標準ズーム（高さ 200mm）</text>
            <rect x="16" y="166" width="246" height="36" rx="4" fill="#dcfce7" stroke="#16a34a"/>
            <text x="139" y="188" text-anchor="middle" font-size="9.2" font-weight="800" fill="#14532d">中段：70-200mm F2.8縦置き（高さ 275mm）</text>
            <rect x="16" y="210" width="246" height="32" rx="4" fill="#fef3c7" stroke="#d97706"/>
            <text x="139" y="230" text-anchor="middle" font-size="9.2" font-weight="800" fill="#78350f">下段：電池充電＆シネマ機材（高さ 250mm）</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: 'SUS304 25mmピッチ柱 × 4本', line2: '抜け止めロック＆防振パッド爪' },
          { label: '物理的メリット', line1: '1段40 kgfの高強度せん断支持', line2: '地震突き上げによる棚脱落防止' },
          { label: 'カメラを守る意味', line1: '機材買い替え時も棚を自在再配置', line2: '床振動と金属ビビり音をシャットアウト' },
        ],
      });

    case 'db_antiroll_rail_detent':
      return wrapDryboxHdSvg({
        badge: 'DB58',
        stepTag: '耐震 18N デテント保持',
        title: '耐震ストッパーバー（転落防止柵）＆ スプリングボール飛び出し防止機構',
        analogy: '地震の横揺れでスライド棚が勝手に飛び出して前面ガラスを割るのを防ぐ、自動ロック＆安全柵',
        accent: '#dc2626',
        accentSoft: '#ffe4e6',
        body: `
          <!-- Left: Side Profile of Shelf Guard & Rear Ball Detent -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">側面断面：地震横揺れ時のダブル転落ブロック構造</text>
            <!-- Front Tempered Glass Door -->
            <rect x="36" y="42" width="14" height="174" rx="2" fill="url(#db58-glass)" stroke="#0284c7" stroke-width="1.5"/>
            <text x="24" y="130" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1" transform="rotate(-90 24 130)">強化ガラス扉</text>
            <!-- Sliding Shelf Plate -->
            <rect x="74" y="160" width="290" height="16" rx="3" fill="#475569" stroke="#0f172a" stroke-width="1.4"/>
            <!-- Front Red Anti-Roll Guard Bar (14mm high) -->
            <rect x="76" y="128" width="14" height="34" rx="4" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.4"/>
            <!-- Round Telephoto Lens resting safely behind guard -->
            <circle cx="136" cy="126" r="32" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
            <circle cx="136" cy="126" r="18" fill="#0284c7" fill-opacity="0.4" stroke="#38bdf8"/>
            <text x="136" y="130" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">望遠レンズ</text>
            <!-- Rear Spring-Ball Detent Mechanism -->
            <rect x="336" y="146" width="56" height="44" rx="6" fill="#e2e8f0" stroke="#334155" stroke-width="1.4"/>
            <circle cx="364" cy="166" r="9" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
            <path d="M 364 176 L 358 180 L 370 184 L 364 188" fill="none" stroke="#0f172a" stroke-width="1.8"/>
            <!-- Seismic Shake Arrow -->
            <line x1="258" y1="98" x2="194" y2="98" stroke="#dc2626" stroke-width="2.6" marker-end="url(#db58-arrRed)"/>
            <text x="234" y="88" text-anchor="middle" font-size="9.4" font-weight="900" fill="#dc2626">地震の横G!</text>
            ${drawPin(83, 134, 108, 62, 1, '14mm ソフト安全柵', 'レンズの転がり・衝突停止', '#dc2626')}
            ${drawPin(364, 166, 276, 214, 2, 'SUS440C ボールデテント', '18N保持・棚の勝手な飛び出し阻止', '#b45309', 'end')}
          </g>

          <!-- Right: Operation & Threshold -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'デテント初期保持力', '18 N', '押し込むだけで「カチッ」と自動係合', '#dc2626')}
            ${drawCompareFrame(0, 88, 234, 166, '人間には軽く・地震には強い絶妙バランス', '#0f172a', '#ffffff')}
            <text x="14" y="132" font-size="9.6" font-weight="800" fill="#15803d">● 地震の慣性力（10kg × 0.18G）</text>
            <text x="24" y="148" font-size="8.8" font-weight="600" fill="#475569">保持力 18 N 未満 → 棚が飛び出さない!</text>
            <text x="14" y="176" font-size="9.6" font-weight="800" fill="#0284c7">● 普段の取り出し（手引き 20 N〜）</text>
            <text x="24" y="192" font-size="8.8" font-weight="600" fill="#475569">ツマミ解除不要でスッと引き出せる</text>
            ${drawPill(14, 214, 206, '締め忘れゼロの無意識耐震!', true)}
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '14 mm ソフト被覆ガードバー', line2: 'SUS440C ボールプランジャーデテント' },
          { label: '物理的メリット', line1: '押し込むだけで18 N自動耐震係合', line2: '引き抜き解除に面倒なツマミ不要' },
          { label: 'カメラを守る意味', line1: '地震で棚が飛び出しガラス破損防止', line2: '丸いレンズの転がり落下を完全阻止' },
        ],
      });

    case 'db_telephoto_vcradle_dividers':
      return wrapDryboxHdSvg({
        badge: 'DB59',
        stepTag: 'XLPE 非加水分解フォーム',
        title: '大口径超望遠レンズ専用 V字ウェーブクレードル ＆ 面圧分散設計',
        analogy: '200万円クラスの白いバズーカレンズを転がさず、20年ボロボロ粉が出ない専用低反発まくら',
        accent: '#1e293b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: V-Cradle Contact Stress Comparison -->
          <g transform="translate(24, 80)">
            ${drawCompareFrame(0, 0, 344, 254, '✅ 45°V字ウェーブクレードル（本機 DB59）', '#0284c7', '#f0f9ff')}
            <!-- Telephoto Barrel Cross-Section -->
            <circle cx="172" cy="108" r="56" fill="#f8fafc" stroke="#334155" stroke-width="3.5"/>
            <circle cx="172" cy="108" r="42" fill="#0284c7" fill-opacity="0.18" stroke="#0284c7" stroke-width="1.5"/>
            <text x="172" y="105" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0f172a">400mm F2.8</text>
            <text x="172" y="120" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0369a1">Ø 65–165 mm 対応</text>
            <!-- XLPE V-Groove Cradle -->
            <path d="M 64 118 L 118 118 L 146 164 L 198 164 L 226 118 L 280 118 L 280 198 L 64 198 Z" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
            <!-- Ventilation Air Channels underneath -->
            <rect x="148" y="172" width="18" height="24" rx="2" fill="#38bdf8"/>
            <rect x="178" y="172" width="18" height="24" rx="2" fill="#38bdf8"/>
            <!-- Distributed Contact Arrows -->
            <line x1="126" y1="146" x2="140" y2="136" stroke="#16a34a" stroke-width="2.4" marker-end="url(#db59-arrGreen)"/>
            <line x1="218" y1="146" x2="204" y2="136" stroke="#16a34a" stroke-width="2.4" marker-end="url(#db59-arrGreen)"/>
            <text x="172" y="218" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0c4a6e">接触面積 約8倍 → 鏡筒・リング局所圧力 1/8!</text>
            <text x="172" y="238" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0369a1">底面通気スリットがレンズ下側の湿気溜まりも解消</text>
          </g>

          <!-- Right: XLPE vs Cheap PU Foam -->
          <g transform="translate(382, 80)">
            ${drawCompareFrame(0, 0, 312, 122, '✅ 独立気泡 XLPE（架橋ポリエチレン）', '#16a34a', '#f0fdf4')}
            <text x="16" y="54" font-size="9.6" font-weight="800" fill="#14532d">20年以上 加水分解ゼロ（粉・ベタつき無し）</text>
            <text x="16" y="74" font-size="9.0" font-weight="700" fill="#166534">吸水率 &lt; 0.01 g/cm³ → 除湿の邪魔をしない</text>
            <text x="16" y="94" font-size="9.0" font-weight="700" fill="#166534">可変ディバイダー2枚でレンズ長にピッタリ</text>
            <text x="16" y="112" font-size="8.6" font-weight="600" fill="#15803d">博物館・精密光学輸送ケースと同等アーカイブ材</text>

            ${drawCompareFrame(0, 132, 312, 122, '❌ 一般的な軟質ウレタンフォーム', '#e11d48', '#fff1f2')}
            <text x="16" y="184" font-size="9.6" font-weight="800" fill="#881337">5–10年で加水分解 → 黄色くボロボロ崩壊</text>
            <text x="16" y="204" font-size="9.0" font-weight="700" fill="#9f1239">黒い粘着粉が鏡筒・センサーへ付着汚染!</text>
            <text x="16" y="224" font-size="9.0" font-weight="700" fill="#9f1239">湿気を吸ってカビの温床になりやすい</text>
            <text x="16" y="242" font-size="8.6" font-weight="600" fill="#be123c">平面置きは転がり落下＆一点荷重のリスク</text>
          </g>
        `,
        cards: [
          { label: '核心素材', line1: 'アーカイブ級 独立気泡XLPEフォーム', line2: 'CNC切削45°V字ウェーブ＋仕切り板' },
          { label: '物理的メリット', line1: '接触面圧 1/8・吸水率 &lt;0.01 g/cm³', line2: '20年以上加水分解・劣化粉ゼロ' },
          { label: 'カメラを守る意味', line1: '大口径超望遠レンズの転がり防止', line2: 'ピントリング・手ブレ機構を無負担保護' },
        ],
      });

    case 'db_esd_card_filter_tray':
      return wrapDryboxHdSvg({
        badge: 'DB60',
        stepTag: 'ESD 10⁵–10⁸ Ω / 小物整理',
        title: 'ESD導電フォーム内蔵 CFexpressカード ＆ 光学フィルター専用小引出し',
        analogy: '静電気一発でデータが飛ぶメモリーカードと円形フィルターを迷子ゼロで守る導電宝石箱',
        accent: '#0ea5e9',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Top-Down CNC Tray Layout -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="394" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="197" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">上面レイアウト：カーボン分散ESDフォーム CNCポケット加工</text>
            <!-- Aluminum Slim Drawer Frame -->
            <rect x="22" y="34" width="350" height="176" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
            <!-- CFexpress Type A/B Slots (6) -->
            <g transform="translate(38, 48)">
              <text x="72" y="12" text-anchor="middle" font-size="9.0" font-weight="800" fill="#38bdf8">CFexpress Type A/B ×6</text>
              <rect x="0" y="20" width="42" height="52" rx="4" fill="#0284c7" stroke="#bae6fd"/>
              <rect x="50" y="20" width="42" height="52" rx="4" fill="#0284c7" stroke="#bae6fd"/>
              <rect x="100" y="20" width="42" height="52" rx="4" fill="#0284c7" stroke="#bae6fd"/>
              <rect x="0" y="82" width="42" height="52" rx="4" fill="#0284c7" stroke="#bae6fd"/>
              <rect x="50" y="82" width="42" height="52" rx="4" fill="#0284c7" stroke="#bae6fd"/>
              <rect x="100" y="82" width="42" height="52" rx="4" fill="#0284c7" stroke="#bae6fd"/>
              <text x="21" y="50" text-anchor="middle" font-size="7.6" font-weight="800" fill="#ffffff">CFx</text>
              <text x="71" y="50" text-anchor="middle" font-size="7.6" font-weight="800" fill="#ffffff">CFx</text>
              <text x="121" y="50" text-anchor="middle" font-size="7.6" font-weight="800" fill="#ffffff">CFx</text>
            </g>
            <!-- SD Card Slots (4) -->
            <g transform="translate(198, 48)">
              <text x="28" y="12" text-anchor="middle" font-size="9.0" font-weight="800" fill="#fde047">SD ×4</text>
              <rect x="0" y="20" width="56" height="22" rx="3" fill="#ca8a04" stroke="#fef08a"/>
              <rect x="0" y="50" width="56" height="22" rx="3" fill="#ca8a04" stroke="#fef08a"/>
              <rect x="0" y="80" width="56" height="22" rx="3" fill="#ca8a04" stroke="#fef08a"/>
              <rect x="0" y="110" width="56" height="22" rx="3" fill="#ca8a04" stroke="#fef08a"/>
            </g>
            <!-- Vertical Optical Filter Slots (4) -->
            <g transform="translate(274, 48)">
              <text x="42" y="12" text-anchor="middle" font-size="9.0" font-weight="800" fill="#34d399">Ø82mmフィルター</text>
              <rect x="6" y="24" width="72" height="14" rx="7" fill="#059669" stroke="#a7f3d0"/>
              <rect x="6" y="52" width="72" height="14" rx="7" fill="#059669" stroke="#a7f3d0"/>
              <rect x="6" y="80" width="72" height="14" rx="7" fill="#059669" stroke="#a7f3d0"/>
              <rect x="6" y="108" width="72" height="14" rx="7" fill="#059669" stroke="#a7f3d0"/>
            </g>
            <!-- ESD Grounding Path -->
            <line x1="197" y1="210" x2="197" y2="232" stroke="#16a34a" stroke-width="2.4" marker-end="url(#db60-arrGreen)"/>
            <text x="197" y="245" text-anchor="middle" font-size="9.2" font-weight="800" fill="#15803d">導電レール → 1 MΩ ESDアース(DB43)へ静電気を安全放電</text>
          </g>

          <!-- Right: ESD Decay Explanation -->
          <g transform="translate(430, 80)">
            ${drawKpiBox(0, 0, 264, 78, 'カーボンESD表面抵抗', '10⁵–10⁸ Ω/sq', 'スパークせず静電気を緩やかに逃がす', '#0ea5e9')}
            ${drawCompareFrame(0, 88, 264, 166, '低湿度35% RH保管庫の落とし穴対策', '#0f172a', '#ffffff')}
            <text x="14" y="130" font-size="9.4" font-weight="800" fill="#e11d48">低湿度ほど静電気が溜まりやすい!</text>
            <text x="14" y="148" font-size="8.6" font-weight="600" fill="#475569">通常の絶縁プラスチックケースでは</text>
            <text x="14" y="164" font-size="8.6" font-weight="600" fill="#475569">数kV放電でNANDメモリ破損の危険</text>
            <text x="14" y="190" font-size="9.4" font-weight="800" fill="#15803d">✅ 導電XLPEフォームの減衰効果</text>
            <text x="14" y="208" font-size="8.6" font-weight="700" fill="#166534">減衰時間 τ &lt; 0.1秒で安全ゼロ電位化</text>
            <text x="14" y="226" font-size="8.6" font-weight="700" fill="#0369a1">フィルターも垂直縁支持でARコート無傷</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: 'カーボン分散ESD導電XLPEポケット', line2: 'CFx×6・SD×4・Ø82mmフィルター×4' },
          { label: '物理的メリット', line1: '体積抵抗 10⁵–10⁸ Ω で緩徐放電', line2: 'フィルターガラス面の非接触縦収納' },
          { label: 'カメラを守る意味', line1: '大切な撮影データを静電気破壊から防護', line2: '小物の迷子とフィルター傷を根絶' },
        ],
      });

    case 'db_saturated_salt_cal_port':
      return wrapDryboxHdSvg({
        badge: 'DB61',
        stepTag: 'ISO 483 / ASTM E104',
        title: 'ISO 483 飽和塩法（MgCl₂ / NaCl）現場校正用密閉テストポート',
        analogy: '温度計の「氷水＝0℃」と同じ！塩と水の物理法則だけで湿度センサーを国家基準級に自己校正',
        accent: '#0d9488',
        accentSoft: '#ccfbf1',
        body: `
          <!-- Left: 2-Point Salt Calibration Curve -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="386" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="193" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">ISO 483 2点飽和塩リニア校正カーブ（25°C基準）</text>
            <!-- Graph Axes -->
            <line x1="56" y1="204" x2="358" y2="204" stroke="#334155" stroke-width="1.6"/>
            <line x1="56" y1="42" x2="56" y2="204" stroke="#334155" stroke-width="1.6"/>
            <!-- Drifted Sensor Line (Dashed Red) -->
            <line x1="66" y1="184" x2="342" y2="62" stroke="#e11d48" stroke-width="2.0" stroke-dasharray="5 3"/>
            <!-- Calibrated True Line (Solid Teal) -->
            <line x1="66" y1="196" x2="342" y2="54" stroke="#0d9488" stroke-width="3.0"/>
            <!-- Point 1: MgCl2 32.8% -->
            <circle cx="152" cy="152" r="7" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
            <text x="152" y="182" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0369a1">定点① MgCl₂</text>
            <text x="152" y="195" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0284c7">32.8% RH</text>
            <!-- Point 2: NaCl 75.3% -->
            <circle cx="286" cy="83" r="7" fill="#0d9488" stroke="#ffffff" stroke-width="2"/>
            <text x="286" y="64" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f766e">定点② NaCl (食塩)</text>
            <text x="286" y="106" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0d9488">75.3% RH</text>
            <!-- Camera Optimal Zone Highlight -->
            <rect x="166" y="46" width="54" height="156" fill="#16a34a" fill-opacity="0.10"/>
            <text x="193" y="58" text-anchor="middle" font-size="8.2" font-weight="800" fill="#15803d">カメラ保管域</text>
            <text x="193" y="238" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0f766e">物理定数でズレを自動補正 → ±1.0% RH 精度を自宅で回復!</text>
          </g>

          <!-- Right: Test Port Docking Anatomy -->
          <g transform="translate(422, 80)">
            <rect x="0" y="0" width="272" height="164" rx="10" fill="#ffffff" stroke="#0d9488" stroke-width="1.4"/>
            <text x="136" y="20" text-anchor="middle" font-size="10.4" font-weight="800" fill="#115e59">密閉校正ポート＆飽和塩カプセル</text>
            <!-- Sensor above chamber -->
            <rect x="90" y="34" width="92" height="26" rx="5" fill="#1e293b"/>
            <text x="136" y="51" text-anchor="middle" font-size="8.8" font-weight="800" fill="#38bdf8">SHT45 センサー</text>
            <!-- Sealed Micro Chamber -->
            <rect x="78" y="60" width="116" height="86" rx="8" fill="#f0fdfa" stroke="#0d9488" stroke-width="2"/>
            <!-- Salt Slurry at Bottom -->
            <rect x="86" y="114" width="100" height="24" rx="4" fill="#99f6e4" stroke="#0f766e"/>
            <text x="136" y="130" text-anchor="middle" font-size="8.8" font-weight="900" fill="#134e4a">飽和塩スラリー</text>
            <!-- Equilibrium Vapor Arrows -->
            <line x1="114" y1="110" x2="114" y2="72" stroke="#0284c7" stroke-width="1.8" marker-end="url(#db61-arrBlue)"/>
            <line x1="158" y1="72" x2="158" y2="110" stroke="#0d9488" stroke-width="1.8" marker-end="url(#db61-arrGreen)"/>
            <text x="136" y="96" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f766e">熱力学平衡</text>
            <!-- FKM O-ring label -->
            <text x="136" y="158" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">通常時はSUS316L栓＋FKM Oリングで完全密閉</text>

            ${drawKpiBox(0, 174, 130, 80, '再現精度', '±0.2% RH', 'Greenspan / ISO 483', '#0d9488')}
            ${drawKpiBox(142, 174, 130, 80, '工場返送', '不要!', '自宅でプロ級2点校正', '#0284c7')}
          </g>
        `,
        cards: [
          { label: '核心規格', line1: 'ISO 483 / ASTM 飽和塩定点', line2: 'MgCl₂ 32.8% / NaCl 75.3%' },
          { label: '物理的メリット', line1: '再現性 ±0.2% RH の絶対物理基準', line2: 'SUS316L＋FKM栓で日常気密ゼロ漏れ' },
          { label: 'カメラを守る意味', line1: '重い防湿庫を工場へ送らず精度維持', line2: 'センサー経年ドリフトによるカビ防止' },
        ],
      });

    case 'db_flickerfree_led_driver':
      return wrapDryboxHdSvg({
        badge: 'DB62',
        stepTag: 'CCR + ≥28kHz T-PWM',
        title: '25 kHz超T-PWM＋CCRハイブリッド 無フリッカーLED定電流ドライバー',
        analogy: 'カメラの1/8000秒電子シャッターで庫内を撮っても黒い横ジマが一切出ない放送スタジオ級電源',
        accent: '#ca8a04',
        accentSoft: '#fef9c3',
        body: `
          <!-- Left: Waveform Comparison -->
          <g transform="translate(24, 80)">
            ${drawCompareFrame(0, 0, 386, 122, '✅ 本機 DB62：CCR完全直流（10–100%）＋ 28 kHz T-PWM', '#16a34a', '#f0fdf4')}
            <line x1="20" y1="88" x2="366" y2="88" stroke="#94a3b8" stroke-width="1"/>
            <!-- Flat DC Current Line -->
            <line x1="24" y1="56" x2="362" y2="56" stroke="#16a34a" stroke-width="3.6"/>
            <text x="193" y="48" text-anchor="middle" font-size="9.4" font-weight="900" fill="#14532d">リップル &lt; 1% の完全フラット定電流（点滅ゼロ！）</text>
            <text x="193" y="108" text-anchor="middle" font-size="9.0" font-weight="800" fill="#15803d">IEEE 1789 NOEL（無影響域）適合 → 高速電子シャッター縞ゼロ!</text>

            ${drawCompareFrame(0, 132, 386, 122, '❌ 一般的な安価LED防湿庫：低周波 400 Hz PWM調光', '#e11d48', '#fff1f2')}
            <line x1="20" y1="220" x2="366" y2="220" stroke="#94a3b8" stroke-width="1"/>
            <!-- Square wave blinking -->
            <polyline points="24,220 24,174 62,174 62,220 112,220 112,174 150,174 150,220 200,220 200,174 238,174 238,220 288,220 288,174 326,174 326,220" fill="none" stroke="#e11d48" stroke-width="2.6"/>
            <text x="193" y="242" text-anchor="middle" font-size="9.0" font-weight="800" fill="#9f1239">カメラのローリングシャッターと干渉 → 黒い横ジマ発生＆眼精疲労</text>
          </g>

          <!-- Right: Dimming Curve & KPIs -->
          <g transform="translate(422, 80)">
            ${drawKpiBox(0, 0, 132, 78, 'フリッカー率', '&lt; 0.1%', 'CCR完全直流調光域', '#ca8a04')}
            ${drawKpiBox(140, 0, 132, 78, '低輝度PWM', '≥ 28 kHz', '1–10%域も完全不可視', '#0284c7')}
            ${drawCompareFrame(0, 90, 272, 164, '開扉連動 0.8秒ソフトフェードイン', '#334155', '#ffffff')}
            <line x1="24" y1="214" x2="248" y2="214" stroke="#64748b" stroke-width="1.3"/>
            <line x1="24" y1="136" x2="24" y2="214" stroke="#64748b" stroke-width="1.3"/>
            <path d="M 24 214 C 66 212 92 146 144 146 L 244 146" fill="none" stroke="#ca8a04" stroke-width="3"/>
            <text x="136" y="136" text-anchor="middle" font-size="9.0" font-weight="800" fill="#854d0e">ふわっと点灯（眩惑＆突入電流ゼロ）</text>
            <text x="136" y="236" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">同期整流効率 &gt; 93% で庫内発熱を極小化</text>
          </g>
        `,
        cards: [
          { label: '核心回路', line1: 'CCR直流定電流＋28 kHz T-PWM', line2: '変換効率 93%超 同期整流降圧' },
          { label: '物理的メリット', line1: 'IEEE 1789 NOEL 無フリッカー適合', line2: '0.8秒ソフトフェード開扉連動点灯' },
          { label: 'カメラを守る意味', line1: '庫内機材撮影で横縞バンディングゼロ', line2: '発熱極小で庫内温度・湿度を乱さない' },
        ],
      });

    case 'db_battery_h2co_offgas_sensor':
      return wrapDryboxHdSvg({
        badge: 'DB63',
        stepTag: '熱暴走 5–15分前遮断',
        title: 'リチウム電池早期熱暴走検知 H₂／CO オフガスセンサーの予兆遮断タイムライン',
        analogy: 'バッテリーが煙を吹く5〜15分前の「最初のひと吹きガス」を嗅ぎ取り、0.5秒で充電を止める警報犬',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        body: `
          <!-- Top: Thermal Runaway Timeline (April 2026 J. Energy Storage) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="670" height="162" rx="10" fill="#fff1f2" stroke="#e11d48" stroke-width="1.3"/>
            <text x="335" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#881337">リチウムイオン電池 異常進行タイムライン（J. Energy Storage 2026年4月号 準拠）</text>
            <!-- Timeline Spine -->
            <line x1="42" y1="84" x2="628" y2="84" stroke="#64748b" stroke-width="3.2"/>
            <!-- Stage 1: Safe Early H2/CO Vent (DB63 Triggers Here!) -->
            <rect x="56" y="38" width="166" height="92" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2.2"/>
            <circle cx="139" cy="84" r="9" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
            <text x="139" y="57" text-anchor="middle" font-size="9.8" font-weight="900" fill="#14532d">★ DB63 ここで強制遮断!</text>
            <text x="139" y="72" text-anchor="middle" font-size="8.6" font-weight="800" fill="#166534">t = −15〜−5 分（初期ベント）</text>
            <text x="139" y="106" text-anchor="middle" font-size="8.8" font-weight="800" fill="#14532d">H₂ 50 ppm / CO 放出検知</text>
            <text x="139" y="121" text-anchor="middle" font-size="8.4" font-weight="700" fill="#15803d">0.5秒で充電MOSFET切断!</text>

            <!-- Stage 2: Surface Temp Rise (Too Late) -->
            <rect x="256" y="46" width="166" height="76" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
            <circle cx="339" cy="84" r="7" fill="#d97706"/>
            <text x="339" y="64" text-anchor="middle" font-size="9.2" font-weight="800" fill="#78350f">従来：表面温度センサー</text>
            <text x="339" y="104" text-anchor="middle" font-size="8.4" font-weight="700" fill="#92400e">t = −2〜−1 分（発熱加速）</text>
            <text x="339" y="117" text-anchor="middle" font-size="8.0" font-weight="600" fill="#b45309">セル内部は既に連鎖反応開始</text>

            <!-- Stage 3: Smoke / Fire -->
            <rect x="456" y="46" width="166" height="76" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
            <circle cx="539" cy="84" r="7" fill="#e11d48"/>
            <text x="539" y="64" text-anchor="middle" font-size="9.2" font-weight="900" fill="#881337">従来：煙感知器・発火</text>
            <text x="539" y="104" text-anchor="middle" font-size="8.4" font-weight="800" fill="#e11d48">t = 0 分（熱暴走・発煙）</text>
            <text x="539" y="117" text-anchor="middle" font-size="8.0" font-weight="700" fill="#9f1239">庫内機材すべてに甚大被害</text>

            <text x="335" y="150" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">水素爆発下限界 LEL = 41,000 ppm に対し、わずか 50 ppm（1/820）で先制インターロック!</text>
          </g>

          <!-- Bottom 3 KPIs -->
          <g transform="translate(24, 252)">
            ${drawKpiBox(0, 0, 214, 82, '早期予兆リードタイム', '5–15 分前', '温度・煙センサーより圧倒的に早い', '#e11d48')}
            ${drawKpiBox(228, 0, 214, 82, 'ハードウェア遮断応答', '&lt; 500 ms', 'DB27充電電源カット＋赤灯＋ブザー', '#0284c7')}
            ${drawKpiBox(456, 0, 214, 82, '学術実証ベース', '2025–2026', 'J. Energy Storage / Frontiers in Physics', '#059669')}
          </g>
        `,
        cards: [
          { label: '核心センサー', line1: 'H₂ / CO 選択ハイブリッドMEMS', line2: '充電ドック直上天井ピンポイント配置' },
          { label: '物理的メリット', line1: '発火5–15分前の初期ベントガス検知', line2: 'H₂ LELの1/820濃度で充電強制遮断' },
          { label: 'カメラを守る意味', line1: '庫内バッテリー充電の火災リスク極小化', line2: '高額機材と自宅を二重で守護' },
        ],
      });

    case 'db_battery_flame_arrestor':
      return wrapDryboxHdSvg({
        badge: 'DB64',
        stepTag: '焼結316L / 20μm消炎',
        title: 'SUS316L焼結多孔質メタル・フレームアレスターの消炎クエンチング原理',
        analogy: '炭鉱ランプの超ハイテク版！内圧ガスだけを逃がし、炎の熱は金属スポンジが一瞬で奪って消火',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        body: `
          <!-- Left: Quenching Cross-Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">異常ベント時の 20 μm 多孔質SUS316L 消炎（クエンチング）断面</text>
            <!-- Inside Battery Bay (Left: High Temp Flame) -->
            <rect x="18" y="42" width="122" height="162" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.4"/>
            <text x="79" y="72" text-anchor="middle" font-size="9.6" font-weight="900" fill="#9a3412">異常充電室側</text>
            <path d="M 46 138 Q 74 88 124 122 Q 86 144 124 162 Q 70 176 46 138 Z" fill="#ef4444" fill-opacity="0.75" stroke="#b91c1c"/>
            <text x="82" y="138" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">高温ガス・炎</text>
            <!-- Rupture Membrane (15 kPa) -->
            <line x1="146" y1="48" x2="146" y2="198" stroke="#0284c7" stroke-width="3.2" stroke-dasharray="6 3"/>
            <text x="146" y="218" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0369a1">15kPa気密膜</text>
            <!-- Sintered SUS316L Porous Disk (20 um) -->
            <rect x="160" y="46" width="102" height="154" rx="6" fill="url(#db64-steel)" stroke="#334155" stroke-width="2"/>
            <!-- Sintered Metal Spheres Matrix -->
            <g fill="#475569" opacity="0.55">
              <circle cx="178" cy="68" r="8"/><circle cx="202" cy="68" r="8"/><circle cx="226" cy="68" r="8"/><circle cx="246" cy="68" r="8"/>
              <circle cx="190" cy="92" r="8"/><circle cx="214" cy="92" r="8"/><circle cx="238" cy="92" r="8"/>
              <circle cx="178" cy="116" r="8"/><circle cx="202" cy="116" r="8"/><circle cx="226" cy="116" r="8"/><circle cx="246" cy="116" r="8"/>
              <circle cx="190" cy="140" r="8"/><circle cx="214" cy="140" r="8"/><circle cx="238" cy="140" r="8"/>
              <circle cx="178" cy="164" r="8"/><circle cx="202" cy="164" r="8"/><circle cx="226" cy="164" r="8"/><circle cx="246" cy="164" r="8"/>
            </g>
            <rect x="166" y="106" width="90" height="34" rx="5" fill="#0f172a" fill-opacity="0.86"/>
            <text x="211" y="121" text-anchor="middle" font-size="8.8" font-weight="900" fill="#fde047">SUS316L焼結</text>
            <text x="211" y="134" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">孔径 20 μm</text>
            <!-- Safe Cooled Gas Exhaust (Right) -->
            <rect x="274" y="42" width="132" height="162" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
            <line x1="278" y1="98" x2="368" y2="98" stroke="#16a34a" stroke-width="2.4" marker-end="url(#db64-arrGreen)"/>
            <line x1="278" y1="138" x2="368" y2="138" stroke="#16a34a" stroke-width="2.4" marker-end="url(#db64-arrGreen)"/>
            <text x="340" y="76" text-anchor="middle" font-size="9.6" font-weight="900" fill="#14532d">背面外部（安全）</text>
            <text x="340" y="122" text-anchor="middle" font-size="9.2" font-weight="800" fill="#15803d">冷却ガスのみ排気</text>
            <text x="340" y="164" text-anchor="middle" font-size="9.4" font-weight="900" fill="#16a34a">炎の通過 0%!</text>
            <text x="212" y="242" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">平常時は15kPaラプチャー膜が外気湿気を100%ブロック</text>
          </g>

          <!-- Right: MESG Safety Margin -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '水素MESG比 安全率', '14.5倍', '孔径 20 μm ≪ 水素 MESG 290 μm', '#ea580c')}
            ${drawCompareFrame(0, 88, 234, 166, 'なぜ20 μmの金属迷路で炎が消える？', '#334155', '#ffffff')}
            <text x="12" y="130" font-size="9.2" font-weight="800" fill="#0f172a">水素 Group IIC 消炎限界</text>
            <rect x="12" y="138" width="208" height="16" rx="3" fill="#fecdd3" stroke="#e11d48"/>
            <text x="116" y="150" text-anchor="middle" font-size="8.4" font-weight="800" fill="#9f1239">MESG = 290 μm</text>
            <text x="12" y="176" font-size="9.2" font-weight="800" fill="#14532d">本機 SUS316L 焼結孔径</text>
            <rect x="12" y="184" width="24" height="16" rx="3" fill="#16a34a"/>
            <text x="44" y="196" font-size="8.8" font-weight="900" fill="#15803d">わずか 20 μm (ISO 4003)</text>
            <text x="12" y="226" font-size="8.6" font-weight="700" fill="#475569">金属骨格が熱を瞬時に奪い</text>
            <text x="12" y="242" font-size="8.6" font-weight="700" fill="#475569">燃焼連鎖反応を物理停止させる</text>
          </g>
        `,
        cards: [
          { label: '核心素子', line1: 'SUS316L 20 μm 焼結多孔質ディスク', line2: '15 kPa 気密ラプチャー膜内蔵' },
          { label: '物理的メリット', line1: '水素MESGの1/14以下の消炎迷路', line2: '過圧ガスのみ排気し火炎を遮断' },
          { label: 'カメラを守る意味', line1: '万一の電池異常でも内圧破裂ゼロ', line2: '周囲の住宅・機材への延焼を阻止' },
        ],
      });

    case 'db_pem_bipolar_flowplates':
      return wrapDryboxHdSvg({
        badge: 'DB65',
        stepTag: 'Ti-Gr2 / 1.2MPa定圧',
        title: 'チタン製サーペンタイン流路板 ＆ ベルビル皿バネ定圧クランプ構造',
        analogy: '繊細なPEM電解膜を「ちょうど良い1.2MPaの力」で10年間ずっと均等に挟み続けるチタン製サンドイッチ',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Serpentine Flow Plate Face -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="290" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="145" y="20" text-anchor="middle" font-size="10.6" font-weight="800" fill="#0f172a">Ptコート純チタン サーペンタイン流路</text>
            <rect x="44" y="38" width="202" height="172" rx="10" fill="url(#db65-steel)" stroke="#334155" stroke-width="1.8"/>
            <!-- Serpentine channels -->
            <path d="M 66 56 L 224 56 L 224 80 L 66 80 L 66 104 L 224 104 L 224 128 L 66 128 L 66 152 L 224 152 L 224 176 L 66 176 L 66 194 L 224 194" fill="none" stroke="#0284c7" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- 4 Corner Tie-Rod Holes -->
            <circle cx="56" cy="48" r="5" fill="#0f172a"/><circle cx="234" cy="48" r="5" fill="#0f172a"/>
            <circle cx="56" cy="198" r="5" fill="#0f172a"/><circle cx="234" cy="198" r="5" fill="#0f172a"/>
            <text x="145" y="228" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0369a1">強酸性Nafion膜に触れても腐食ゼロ</text>
            <text x="145" y="244" text-anchor="middle" font-size="8.4" font-weight="600" fill="#475569">蛇行マイクロ溝で膜全面へ均一に湿気供給</text>
          </g>

          <!-- Right: Belleville Disc-Spring Clamping Stack -->
          <g transform="translate(326, 80)">
            <rect x="0" y="0" width="368" height="164" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="1.3"/>
            <text x="184" y="20" text-anchor="middle" font-size="10.6" font-weight="800" fill="#0c4a6e">断面：SUS301 ベルビル皿バネ積層による定圧追従</text>
            <!-- PEM Stack Center -->
            <rect x="112" y="54" width="144" height="18" rx="3" fill="url(#db65-steel)" stroke="#334155"/>
            <rect x="112" y="72" width="144" height="14" fill="url(#db65-pem)" stroke="#0284c7"/>
            <rect x="112" y="86" width="144" height="18" rx="3" fill="url(#db65-steel)" stroke="#334155"/>
            <text x="184" y="83" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">PEM電解膜</text>
            <!-- Tie Rod + Belleville Springs Left & Right -->
            <line x1="126" y1="36" x2="126" y2="128" stroke="#0f172a" stroke-width="3.5"/>
            <line x1="242" y1="36" x2="242" y2="128" stroke="#0f172a" stroke-width="3.5"/>
            <!-- Disc Springs (cone pairs <>) -->
            <polygon points="114,42 138,42 132,48 120,48" fill="#d97706" stroke="#78350f"/>
            <polygon points="120,48 132,48 138,54 114,54" fill="#f59e0b" stroke="#78350f"/>
            <polygon points="230,42 254,42 248,48 236,48" fill="#d97706" stroke="#78350f"/>
            <polygon points="236,48 248,48 254,54 230,54" fill="#f59e0b" stroke="#78350f"/>
            ${drawPin(248, 48, 286, 62, 1, '皿バネ積層', 'クリープ自動吸収', '#d97706')}
            <text x="184" y="148" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0369a1">10年経っても接触抵抗増大ゼロ・最適 1.2 MPa を均一キープ</text>

            ${drawKpiBox(0, 174, 178, 80, '最適スタック面圧', '1.0–1.5 MPa', '電気抵抗最小×ガス漏れゼロ', '#0284c7')}
            ${drawKpiBox(190, 174, 178, 80, '電極耐食仕様', 'Ti-Gr2 + Pt', '酸性PEM環境で10年無腐食', '#059669')}
          </g>
        `,
        cards: [
          { label: '核心構造', line1: 'Ptコート純チタン蛇行流路板', line2: 'SUS301 ベルビル皿バネ定圧締結' },
          { label: '物理的メリット', line1: '最適 1.2 MPa を10年間均一維持', line2: '樹脂膜クリープ・熱伸縮を自動吸収' },
          { label: 'カメラを守る意味', line1: 'PEM除湿レートと寿命を2倍超へ', line2: '腐食ゼロで無メンテナンス長期稼働' },
        ],
      });

    case 'db_pem_hbridge_driver_pcb':
      return wrapDryboxHdSvg({
        badge: 'DB66',
        stepTag: '3.0V / フォールドバック',
        title: 'PEM専用 3.0 V定電圧フォールドバック電流制限ドライバーのVI特性',
        analogy: '高湿起動時の「10倍大食い電流」を優しく制限しつつ、除湿が止まらない2.0V以上を守る専用電源',
        accent: '#0891b2',
        accentSoft: '#cffafe',
        body: `
          <!-- Left: V-I Foldback Characteristic Curve -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="396" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="198" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">PEMドライバー 電圧(V)−電流(I) フォールドバック保護曲線</text>
            <!-- Axes -->
            <line x1="56" y1="204" x2="366" y2="204" stroke="#334155" stroke-width="1.6"/>
            <line x1="56" y1="40" x2="56" y2="204" stroke="#334155" stroke-width="1.6"/>
            <text x="210" y="224" text-anchor="middle" font-size="9.0" font-weight="800" fill="#475569">PEM駆動電流 I (mA) → 高湿起動時ほど増加</text>
            <text x="26" y="122" text-anchor="middle" font-size="9.0" font-weight="800" fill="#475569" transform="rotate(-90 26 122)">電極電圧 V (V)</text>
            <!-- 2.0V Electrolysis Floor Line -->
            <line x1="56" y1="126" x2="362" y2="126" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="5 3"/>
            <text x="358" y="120" text-anchor="end" font-size="8.6" font-weight="800" fill="#e11d48">最低電解フロア V_floor = 2.0 V</text>
            <!-- Regulated 3.0V Constant-Voltage + Foldback Curve -->
            <polyline points="56,66 286,66 286,126 244,200" fill="none" stroke="#0284c7" stroke-width="3.6" stroke-linejoin="round"/>
            <!-- Steady Operating Point (50mA, 3.0V) -->
            <circle cx="106" cy="66" r="7" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
            <text x="134" y="54" font-size="9.0" font-weight="900" fill="#14532d">定常維持：3.0V / 50mA (0.15W)</text>
            <!-- High-Humidity Inrush Limit Point -->
            <circle cx="286" cy="96" r="7" fill="#d97706" stroke="#ffffff" stroke-width="2"/>
            <text x="280" y="92" text-anchor="end" font-size="8.8" font-weight="800" fill="#b45309">高湿起動クリップ</text>
            <text x="280" y="106" text-anchor="end" font-size="8.4" font-weight="700" fill="#92400e">10倍突入電流を安全制限</text>
            <text x="198" y="244" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0369a1">乾燥が進むと自動で3.0V / 0.15W超省エネ域へ滑らか復帰</text>
          </g>

          <!-- Right: Architecture & KPIs -->
          <g transform="translate(432, 80)">
            ${drawKpiBox(0, 0, 126, 78, '定常消費電力', '0.15 W', '3.0V × 50mA 超省エネ', '#16a34a')}
            ${drawKpiBox(136, 0, 126, 78, '電圧フロア', '≥ 2.0 V', '除湿停止しない下限保証', '#0284c7')}
            ${drawCompareFrame(0, 88, 262, 166, '専用回路が「単なる抵抗制限」に勝る理由', '#0891b2', '#f0fdfa')}
            <text x="12" y="130" font-size="9.2" font-weight="800" fill="#0f172a">1. 同期整流バック電源でロス −65%</text>
            <text x="20" y="146" font-size="8.4" font-weight="600" fill="#475569">リニア方式の無駄発熱を徹底排除</text>
            <text x="12" y="172" font-size="9.2" font-weight="800" fill="#0f172a">2. 高湿起動でも電解電圧 ≥2.0V維持</text>
            <text x="20" y="188" font-size="8.4" font-weight="600" fill="#475569">梅雨の開扉直後からフル除湿が止まらない</text>
            <text x="12" y="214" font-size="9.2" font-weight="800" fill="#0f172a">3. Hブリッジ極性リフレッシュ診断</text>
            <text x="20" y="230" font-size="8.4" font-weight="600" fill="#475569">膜インピーダンス監視で寿命を早期把握</text>
          </g>
        `,
        cards: [
          { label: '核心回路', line1: '3.0 V定電圧＋フォールドバック制限', line2: 'シャント電流帰還＆同期整流降圧' },
          { label: '物理的メリット', line1: '10倍起動突入電流からPEM膜保護', line2: '電解しきい値2.0V以上を常時死守' },
          { label: 'カメラを守る意味', line1: '0.15Wの極小電力で365日安定除湿', line2: '膜焼損ゼロで10年長寿命を実現' },
        ],
      });

    case 'db_mof_mesh_ptfe_cage':
      return wrapDryboxHdSvg({
        badge: 'DB67',
        stepTag: 'ePTFE 0.2μm / 99.995%',
        title: 'SUS316 400メッシュ＋ePTFE撥水膜のZr-MOF粉塵完全封止メカニズム',
        analogy: '水蒸気分子だけスイスイ通し、センサーの大敵「除湿剤のミクロ粉」は1粒も漏らさない防護ネット',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          <!-- Left: Molecular Size Sieving Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">サイズ選択バリア：4桁のスケール差で粉塵 100% 封じ込め</text>
            <!-- MOF Bed Side (Left) -->
            <rect x="16" y="42" width="134" height="164" rx="6" fill="#d1fae5" stroke="#059669" stroke-width="1.4"/>
            <text x="83" y="62" text-anchor="middle" font-size="9.4" font-weight="900" fill="#065f46">Zr-MOF 吸着床側</text>
            <!-- Large MOF Dust Particles (1-50 um) blocked -->
            <circle cx="54" cy="108" r="13" fill="#047857" stroke="#064e3b"/><text x="54" y="111" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">MOF粉</text>
            <circle cx="114" cy="144" r="14" fill="#047857" stroke="#064e3b"/><text x="114" y="147" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">≥1μm</text>
            <circle cx="62" cy="168" r="11" fill="#047857" stroke="#064e3b"/>
            <!-- Layer 1: SUS316 400-Mesh (37 um) -->
            <rect x="162" y="42" width="38" height="164" rx="4" fill="url(#db67-steel)" stroke="#334155" stroke-width="1.6"/>
            <text x="181" y="124" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f172a" transform="rotate(-90 181 124)">SUS316 400メッシュ</text>
            <!-- Layer 2: ePTFE 0.2 um Membrane -->
            <rect x="210" y="42" width="38" height="164" rx="4" fill="#ffffff" stroke="#0284c7" stroke-width="2.0" stroke-dasharray="4 2"/>
            <text x="229" y="124" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0369a1" transform="rotate(-90 229 124)">ePTFE 孔径 0.2μm</text>
            <!-- Camera Air Side (Right) -->
            <rect x="260" y="42" width="146" height="164" rx="6" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.4"/>
            <text x="333" y="62" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">カメラ保管室（清浄）</text>
            <!-- Tiny H2O Molecules Passing Through -->
            <line x1="358" y1="96" x2="132" y2="96" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db67-arrBlue)"/>
            <text x="333" y="88" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">水蒸気 H₂O (0.27 nm)</text>
            <text x="333" y="114" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0284c7">← 孔径の1/740で自由通過</text>
            <!-- Blocked Dust Bounce -->
            <path d="M 130 144 L 158 144 L 146 156" fill="none" stroke="#e11d48" stroke-width="2.2"/>
            <text x="333" y="156" text-anchor="middle" font-size="9.4" font-weight="900" fill="#15803d">粉塵漏れ 0.005%未満</text>
            <text x="333" y="174" text-anchor="middle" font-size="8.4" font-weight="700" fill="#166534">イメージセンサー級クリーン</text>
            <text x="212" y="236" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0f172a">H₂O 0.27 nm ≪ ePTFE孔 200 nm ≪ MOF微粉 ≥ 1,000 nm</text>
          </g>

          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '微粒子捕捉率', '≥ 99.995%', 'ISO Class 5 クリーンルーム相当防塵', '#059669')}
            ${drawKpiBox(0, 88, 112, 74, '連続耐熱', '200°C', '110°C再生無劣化', '#d97706')}
            ${drawKpiBox(122, 88, 112, 74, '超疎水撥水', '液滴遮断', '水蒸気相のみ透過', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, '2026年MOF実用化の最後の壁を突破', '#065f46', '#ecfdf5')}
            <text x="12" y="216" font-size="8.8" font-weight="800" fill="#065f46">10万回熱サイクルでも粉塵飛散ゼロ</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#047857">ミラーレス開放センサーも完全安全</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: 'SUS316 400メッシュ＋ePTFE膜', line2: '孔径 0.2 μm 超疎水透湿ケージ' },
          { label: '物理的メリット', line1: '水蒸気は通し微粉を99.995%捕集', line2: '200°C耐熱で10万回再生に耐える' },
          { label: 'カメラを守る意味', line1: '除湿剤粉塵のセンサー付着を完全阻止', line2: '先端Zr-MOFを光学安全に実用化' },
        ],
      });

    case 'db_bimetal_thermal_fuse138':
      return wrapDryboxHdSvg({
        badge: 'DB68',
        stepTag: 'IEC 60335 二重保護',
        title: '120°Cバイメタルサーモ ＋ 138°C非復帰温度ヒューズの二重過熱保護',
        analogy: 'コンピュータがフリーズしても絶対に火事にしない、2段階の完全物理ブレーカー階段',
        accent: '#dc2626',
        accentSoft: '#ffe4e6',
        body: `
          <!-- Left: 3-Tier Temperature Safety Ladder -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">IEC 60335-1 準拠：温度階段式ハードウェア二重独立保護</text>
            <!-- Temperature Scale Bar -->
            <rect x="34" y="42" width="28" height="190" rx="14" fill="url(#db68-heat)" stroke="#7f1d1d" stroke-width="1.4"/>
            <!-- Tier 3: 138°C Fuse (Top) -->
            <rect x="86" y="42" width="320" height="54" rx="8" fill="#ffe4e6" stroke="#dc2626" stroke-width="2.0"/>
            <text x="98" y="61" font-size="10.0" font-weight="900" fill="#991b1b">第2段【138°C】非復帰型 合金温度ヒューズ (TCO)</text>
            <text x="98" y="80" font-size="8.8" font-weight="700" fill="#b91c1c">万一バイメタル溶着時も内部合金が永久溶断 → 絶対不燃!</text>
            <line x1="62" y1="68" x2="86" y2="68" stroke="#dc2626" stroke-width="2.4"/>
            <!-- Tier 2: 120°C Bimetal (Mid) -->
            <rect x="86" y="108" width="320" height="54" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
            <text x="98" y="127" font-size="10.0" font-weight="900" fill="#92400e">第1段【120°C】スナップディスク バイメタルサーモ</text>
            <text x="98" y="146" font-size="8.8" font-weight="700" fill="#b45309">皿状二層金属がパチンと反転開放（マイコン暴走時即遮断）</text>
            <line x1="62" y1="135" x2="86" y2="135" stroke="#d97706" stroke-width="2.4"/>
            <!-- Tier 1: Normal PTC Regen 105°C (Bottom) -->
            <rect x="86" y="174" width="320" height="54" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
            <text x="98" y="193" font-size="10.0" font-weight="900" fill="#14532d">定常運転【105°C】PTCヒーター自己温度制御＋MCU監視</text>
            <text x="98" y="212" font-size="8.8" font-weight="700" fill="#166534">通常はキュリー点自己制限で105°C以下に安全キープ</text>
            <line x1="62" y1="201" x2="86" y2="201" stroke="#16a34a" stroke-width="2.4"/>
          </g>

          <!-- Right: Series Circuit Diagram -->
          <g transform="translate(460, 80)">
            <rect x="0" y="0" width="234" height="164" rx="10" fill="#ffffff" stroke="#dc2626" stroke-width="1.3"/>
            <text x="117" y="20" text-anchor="middle" font-size="10.2" font-weight="800" fill="#991b1b">主回路 直列ハードウェア配線</text>
            <!-- Series chain -->
            <rect x="26" y="38" width="182" height="28" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
            <text x="117" y="56" text-anchor="middle" font-size="9.0" font-weight="800" fill="#92400e">120°C バイメタル接点</text>
            <line x1="117" y1="66" x2="117" y2="82" stroke="#0f172a" stroke-width="2.2"/>
            <rect x="26" y="82" width="182" height="28" rx="6" fill="#ffe4e6" stroke="#dc2626" stroke-width="1.4"/>
            <text x="117" y="100" text-anchor="middle" font-size="9.0" font-weight="800" fill="#991b1b">138°C 永久温度ヒューズ</text>
            <line x1="117" y1="110" x2="117" y2="126" stroke="#0f172a" stroke-width="2.2"/>
            <rect x="26" y="126" width="182" height="28" rx="6" fill="#e2e8f0" stroke="#334155" stroke-width="1.4"/>
            <text x="117" y="144" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0f172a">PTC再生ヒーター (DB37)</text>

            ${drawKpiBox(0, 174, 234, 80, '安全規格認証', 'IEC 60335 / PSE', 'ソフト非依存・365日無人運転対応', '#dc2626')}
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '120°Cバイメタル＋138°C温度ヒューズ', line2: 'アルミ伝熱ブラケット直結・主回路直列' },
          { label: '物理的メリット', line1: 'マイコン・リレー暴走時も物理遮断', line2: '発火温度(>250°C)の手前で完全断電' },
          { label: 'カメラを守る意味', line1: '留守中・就寝中の24時間運転も安心', line2: '万一の過熱火災リスクを理論ゼロ化' },
        ],
      });

    default:
      return null;
  }
}
