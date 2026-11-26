import { drawCompareFrame, drawKpiBox, drawPill, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group L (10 Parts: DB121–DB130):
 * Zero-Crossing Opto-Triac SSR, IPC-CC-830C Vapor-Deposited Parylene-C Conformal Coat,
 * Magnetic Pogo Service Port & IP67 Engine Coupler, Volt-Free SPDT Dry Contact BMS Relay,
 * Non-Drill Magnetic Side Accessory Caddy, Rear Cord-Winder Cleats,
 * Matte-Black Flocked Backdrop + 18% Gray Card, SUS304 Kickplate + EPDM Bumper,
 * Modular Multi-Cabinet Ganging Brackets, and EU ESPR 2026 & ISO 11469 DfD Eco-ID Plate.
 */
export function renderDryboxGroupLSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_zerocross_ssr_heater':
      return wrapDryboxHdSvg({
        badge: 'DB121',
        stepTag: 'MOC3063 / 0 dBA',
        title: 'ゼロクロス駆動フォトトライアックSSR（無音・低EMIヒーター制御）',
        analogy: '交流の波がちょうど0Vを通る瞬間にだけ静かにONし、カチカチ音もノイズもゼロの半導体スイッチ',
        accent: '#1e293b',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: AC Sine Wave Zero-Crossing Switching vs Mechanical Relay Arc -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">AC 50/60 Hz ゼロクロス点弧波形（上）vs 従来リレー突入ノイズ（下）</text>
            <!-- Top Waveform: Clean Zero-Cross SSR -->
            <rect x="18" y="34" width="388" height="90" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.4"/>
            <text x="28" y="52" font-size="9.0" font-weight="900" fill="#14532d">✅ ゼロクロスSSR（MOC3063）：0 V 通過点のみで静かに点弧</text>
            <line x1="34" y1="90" x2="388" y2="90" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
            <!-- Off portion -->
            <path d="M 38 90 Q 62 56 86 90 Q 110 124 134 90" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
            <!-- ON trigger at exact zero crossing x=134 -->
            <circle cx="134" cy="90" r="6" fill="#16a34a" stroke="#ffffff" stroke-width="1.6"/>
            <path d="M 134 90 Q 158 56 182 90 Q 206 124 230 90 Q 254 56 278 90 Q 302 124 326 90" fill="none" stroke="#059669" stroke-width="3.2"/>
            <text x="134" y="114" text-anchor="middle" font-size="7.8" font-weight="900" fill="#15803d">0 V 点弧（EMI極小）</text>
            <text x="358" y="84" text-anchor="middle" font-size="8.4" font-weight="900" fill="#14532d">動作音 0 dBA</text>
            <text x="358" y="99" text-anchor="middle" font-size="7.8" font-weight="700" fill="#15803d">寿命 1億回</text>
            <!-- Bottom Waveform: Random Mechanical Relay Click + Spike -->
            <rect x="18" y="134" width="388" height="84" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4"/>
            <text x="28" y="152" font-size="9.0" font-weight="900" fill="#9f1239">❌ 機械式リレー：ピーク電圧で投入 → 火花アーク・ポップノイズ発生</text>
            <line x1="34" y1="186" x2="388" y2="186" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
            <path d="M 38 186 Q 62 154 86 186 L 106 186 L 108 156 L 114 214 L 122 158 Q 146 154 170 186 Q 194 218 218 186" fill="none" stroke="#e11d48" stroke-width="2.6"/>
            <text x="114" y="150" text-anchor="middle" font-size="7.8" font-weight="900" fill="#e11d48">⚡dV/dtスパイク</text>
            <text x="312" y="178" text-anchor="middle" font-size="8.4" font-weight="900" fill="#be123c">深夜カチッ音 ＋ マイク雑音</text>
            <text x="312" y="196" text-anchor="middle" font-size="7.8" font-weight="700" fill="#9f1239">物理接点摩耗・溶着リスク</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">4,000 Vrms光フォトカプラ絶縁でマイコン側とAC商用電源を完全分離</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '無接点スイッチング寿命', '10⁸ 回+', '機械リレー比 1,000倍の耐久', '#1e293b')}
            ${drawKpiBox(0, 88, 112, 74, '動作切替音', '0 dBA', '完全無音切替', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, 'フォト絶縁', '4.0 kVrms', '一次/二次完全分離', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, '録音スタジオ＆寝室に最適', '#0f172a', '#f1f5f9')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#0f172a">• 深夜のカチカチ開閉音が完全ゼロ</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#334155">• 音響機器へのポップノイズ混入を根絶</text>
          </g>
        `,
        cards: [
          { label: '半導体スイッチ', line1: 'MOC3063ゼロクロスフォトトライアック', line2: '600Vパワートライアック＋アルミ放熱板' },
          { label: '物理的メリット', line1: 'AC 0V通過点のみで点弧しEMI極小', line2: '物理接点ゼロで摩耗・溶着故障なし' },
          { label: 'カメラを守る意味', line1: 'PTC再生ヒーター(DB37)を1億回無音制御', line2: '音声収録スタジオ内設置でも雑音ゼロ' },
        ],
      });

    case 'db_pcb_parylene_conformal':
      return wrapDryboxHdSvg({
        badge: 'DB122',
        stepTag: 'IPC Class 3 / 25μm',
        title: '真空蒸着パリレンC（25 μmピンホールゼロ）防湿コンフォーマル被膜',
        analogy: '気体プラスチックを真空でICの足の下まで密着させ、医療ペースメーカー級の絶対防湿を実現',
        accent: '#6366f1',
        accentSoft: '#e0e7ff',
        body: `
          <!-- Left: Vapor-Deposited Parylene-C vs Liquid Spray Coating Cross-Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">真空CVD パリレンC（上：完全均一）vs 液状スプレー塗装（下：塗り残し）</text>
            <!-- Top Panel: Parylene-C Conformal CVD -->
            <rect x="18" y="34" width="388" height="90" rx="8" fill="#eef2ff" stroke="#6366f1" stroke-width="1.5"/>
            <text x="28" y="51" font-size="9.0" font-weight="900" fill="#3730a3">✅ 真空蒸着パリレンC（25 μm）：IC脚下・鋭角エッジも完全均一被覆</text>
            <!-- PCB + IC chip with uniform violet outline -->
            <rect x="38" y="98" width="210" height="16" fill="#065f46"/>
            <rect x="92" y="66" width="102" height="24" rx="2" fill="#1e293b"/>
            <rect x="102" y="90" width="10" height="8" fill="#cbd5e1"/>
            <rect x="174" y="90" width="10" height="8" fill="#cbd5e1"/>
            <!-- Uniform 25um Parylene halo wrapping EVERY corner & underside -->
            <path d="M 38 95 L 98 95 L 98 90 L 89 90 L 89 63 L 197 63 L 197 90 L 188 90 L 188 95 L 248 95" fill="none" stroke="#818cf8" stroke-width="4.2" stroke-linejoin="round"/>
            <text x="328" y="80" text-anchor="middle" font-size="8.6" font-weight="900" fill="#4338ca">ピンホール 0個/cm²</text>
            <text x="328" y="96" text-anchor="middle" font-size="8.0" font-weight="800" fill="#4f46e5">錫ウィスカ・短絡封止</text>
            <text x="328" y="112" text-anchor="middle" font-size="7.6" font-weight="700" fill="#6366f1">365nm UV蛍光検査済</text>
            <!-- Bottom Panel: Liquid Spray Coat (Edge thinning & shadow voids) -->
            <rect x="18" y="134" width="388" height="84" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.4"/>
            <text x="28" y="151" font-size="9.0" font-weight="900" fill="#9f1239">❌ 一般スプレー防湿ニス：表面張力で角が薄くなりIC底面に隙間発生</text>
            <rect x="38" y="192" width="210" height="16" fill="#065f46"/>
            <rect x="92" y="162" width="102" height="24" rx="2" fill="#1e293b"/>
            <rect x="102" y="186" width="10" height="6" fill="#cbd5e1"/>
            <rect x="174" y="186" width="10" height="6" fill="#cbd5e1"/>
            <path d="M 38 189 Q 88 189 92 162 L 194 162 Q 198 189 248 189" fill="none" stroke="#f43f5e" stroke-width="2.4" stroke-dasharray="4 2"/>
            <text x="328" y="178" text-anchor="middle" font-size="8.4" font-weight="900" fill="#be123c">エッジ膜薄れ＆隙間空洞</text>
            <text x="328" y="196" text-anchor="middle" font-size="7.8" font-weight="700" fill="#9f1239">高湿排気で銅デンドライト短絡</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">IPC-CC-830C Type XY / IPC-A-610 Class 3 宇宙・医療信頼性基準適合</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '均一CVD蒸着膜厚', '25 ± 2 μm', '全エッジ・IC底面ピンホール0', '#6366f1')}
            ${drawKpiBox(0, 88, 112, 74, '絶縁耐圧', '5.5 kV+', '220 kV/mm 高耐圧', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '透湿率WVTR', '1/10〜1/50', '従来アクリル比', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '365 nm UV全数光学検査', '#3730a3', '#eef2ff')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#3730a3">• 蛍光トレーサー配合で膜切れ0保証</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#4f46e5">• 鉛フリーはんだ錫ウィスカ成長を封鎖</text>
          </g>
        `,
        cards: [
          { label: '医療・宇宙防湿膜', line1: 'IPC-CC-830C Type XY パリレンC', line2: '室温真空CVD気相重合（25 μm均一）' },
          { label: '物理的メリット', line1: 'ピンホール0でデンドライト短絡防止', line2: '従来ニスの1/50の圧倒的低透湿性' },
          { label: 'カメラを守る意味', line1: '高湿排気側でも基板が10年錆びない', line2: '24時間365日の頭脳回路を永久防護' },
        ],
      });

    case 'db_service_pogo_quick_coupler':
      return wrapDryboxHdSvg({
        badge: 'DB123',
        stepTag: '15分交換 / IP67',
        title: '密閉磁気ポゴピン診断端子 ＋ IP67ワンタッチエンジン分離カプラー',
        analogy: '扉を開けずに磁石で健康診断でき、10年後の除湿エンジンもコネクタ1本抜くだけで15分交換',
        accent: '#eab308',
        accentSoft: '#fef9c3',
        body: `
          <!-- Left: Sealed Magnetic Pogo Port + Single-Plug IP67 Bayonet Coupler -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">貫通穴ゼロ磁気診断パッド（上）＋ 12極IP67バヨネット分離カプラー（下）</text>
            <!-- Top Panel: Sealed Magnetic Pogo Diagnostic Port -->
            <rect x="18" y="34" width="388" height="84" rx="8" fill="#fefce8" stroke="#eab308" stroke-width="1.5"/>
            <text x="28" y="52" font-size="9.0" font-weight="900" fill="#713f12">① 外部密閉6極金めっき磁気ポゴ診断端子（USB穴なしで気密完全維持）</text>
            <rect x="40" y="62" width="176" height="44" rx="6" fill="#1e293b" stroke="#eab308" stroke-width="1.5"/>
            <circle cx="62" cy="84" r="9" fill="#94a3b8"/>
            <circle cx="88" cy="84" r="5" fill="#facc15"/>
            <circle cx="104" cy="84" r="5" fill="#facc15"/>
            <circle cx="120" cy="84" r="5" fill="#facc15"/>
            <circle cx="136" cy="84" r="5" fill="#facc15"/>
            <circle cx="152" cy="84" r="5" fill="#facc15"/>
            <circle cx="168" cy="84" r="5" fill="#facc15"/>
            <circle cx="194" cy="84" r="9" fill="#94a3b8"/>
            <text x="312" y="79" text-anchor="middle" font-size="8.6" font-weight="900" fill="#854d0e">扉を閉めたまま診断・校正</text>
            <text x="312" y="96" text-anchor="middle" font-size="7.8" font-weight="700" fill="#713f12">両端ネオジム自動整列・エポキシ封止</text>
            <!-- Bottom Panel: 12-Pin Keyed IP67 Quick-Release Engine Coupler -->
            <rect x="18" y="128" width="388" height="90" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="28" y="146" font-size="9.0" font-weight="900" fill="#0c4a6e">② キー付き12極 IP67 ワンタッチ除湿エンジン分離カプラー</text>
            <!-- Left Plug (Cabinet Harness) <-> Right Socket (Modular Engine) -->
            <rect x="38" y="160" width="96" height="44" rx="6" fill="#334155"/>
            <text x="86" y="186" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">筐体ハーネス</text>
            <rect x="134" y="164" width="22" height="36" rx="3" fill="#0ea5e9"/>
            <line x1="160" y1="182" x2="196" y2="182" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db123-arrBlue)"/>
            <rect x="200" y="160" width="100" height="44" rx="6" fill="#0284c7"/>
            <text x="250" y="186" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">除湿エンジン側</text>
            <text x="352" y="176" text-anchor="middle" font-size="8.8" font-weight="900" fill="#16a34a">15分で丸ごと</text>
            <text x="352" y="193" text-anchor="middle" font-size="8.2" font-weight="800" fill="#15803d">新品ユニット換装</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">ハンダ外し不要！DB53サービスフランジ4本ネジ＋本カプラー1本で即交換</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'モジュール換装 所要時間', '≤ 15 分', '庫内カメラを取り出さず整備可', '#d97706')}
            ${drawKpiBox(0, 88, 112, 74, '防水防湿等級', 'IP67', 'バヨネットロック', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '硬質金めっき', '0.76 μm', '接触抵抗&lt;10mΩ', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '2026年「修理する権利」適合', '#713f12', '#fefce8')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#713f12">• 使い捨てず20年アップグレード運用</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#854d0e">• 貫通USB穴ゼロで高気密を一切犠牲にせず</text>
          </g>
        `,
        cards: [
          { label: '密閉サービス設計', line1: '完全封止6極金めっき磁気ポゴ端子', line2: '12極誤挿入防止キー付きIP67カプラー' },
          { label: '物理的メリット', line1: '扉を開けずログ診断＆校正アクセス', line2: 'はんだ付け不要で15分エンジン交換' },
          { label: 'カメラを守る意味', line1: '10年後の性能劣化を新品へ即リフレッシュ', line2: '修理中も庫内機材を動かさず安全維持' },
        ],
      });

    case 'db_dry_contact_alarm_relay':
      return wrapDryboxHdSvg({
        badge: 'DB124',
        stepTag: 'SPDT Form-C 無電圧',
        title: 'フォト絶縁 無電圧ドライコンタクト警報リレー端子（NO/COM/NC）',
        analogy: 'Wi-Fiやネットが止まっても、スタジオ警備盤やビル管理室へ有線で100%確実に異常を伝える接点',
        accent: '#10b981',
        accentSoft: '#d1fae5',
        body: `
          <!-- Left: Opto-Isolated SPDT Form-C Fail-Safe NC BMS Wiring Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">フォト絶縁 SPDT Form-C 無電圧接点 ＆ フェイルセーフNC警備結線図</text>
            <!-- Left: Drybox Alarm Logic -->
            <rect x="18" y="44" width="112" height="162" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
            <text x="74" y="66" text-anchor="middle" font-size="9.0" font-weight="900" fill="#065f46">異常トリガー(OR)</text>
            <text x="28" y="88" font-size="8.0" font-weight="700" fill="#047857">• 高湿 &gt;55% RH</text>
            <text x="28" y="106" font-size="8.0" font-weight="700" fill="#047857">• 扉開放アラーム</text>
            <text x="28" y="124" font-size="8.0" font-weight="700" fill="#047857">• 衝撃/地震(DB95)</text>
            <text x="28" y="142" font-size="8.0" font-weight="700" fill="#047857">• 漏水検知(DB106)</text>
            <text x="28" y="160" font-size="8.0" font-weight="700" fill="#047857">• 電池H₂ガス(DB63)</text>
            <text x="28" y="178" font-size="8.0" font-weight="700" fill="#047857">• AC停電・故障</text>
            <!-- Center: Opto + SPDT Relay -->
            <line x1="130" y1="124" x2="158" y2="124" stroke="#059669" stroke-width="2.4" marker-end="url(#db124-arrGreen)"/>
            <rect x="162" y="54" width="108" height="140" rx="8" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
            <text x="216" y="74" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0f172a">無電圧リレー</text>
            <text x="216" y="89" text-anchor="middle" font-size="7.6" font-weight="800" fill="#7c3aed">2.5 kVrms 絶縁</text>
            <!-- 3 Phoenix terminals: NO, COM, NC -->
            <circle cx="246" cy="112" r="7" fill="#10b981" stroke="#064e3b"/>
            <text x="220" y="116" text-anchor="end" font-size="8.6" font-weight="900" fill="#065f46">NO</text>
            <circle cx="246" cy="140" r="7" fill="#eab308" stroke="#713f12"/>
            <text x="220" y="144" text-anchor="end" font-size="8.6" font-weight="900" fill="#854d0e">COM</text>
            <circle cx="246" cy="168" r="7" fill="#e11d48" stroke="#881337"/>
            <text x="220" y="172" text-anchor="end" font-size="8.6" font-weight="900" fill="#9f1239">NC</text>
            <!-- Switch arm connecting COM to NC (Fail-safe!) -->
            <line x1="184" y1="140" x2="239" y2="168" stroke="#e11d48" stroke-width="3.0"/>
            <!-- Right: External Studio BMS / Security Panel -->
            <line x1="253" y1="140" x2="296" y2="140" stroke="#eab308" stroke-width="2.4"/>
            <line x1="253" y1="168" x2="296" y2="168" stroke="#e11d48" stroke-width="2.4"/>
            <rect x="298" y="64" width="110" height="126" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.6"/>
            <text x="353" y="92" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">スタジオ警備盤</text>
            <text x="353" y="110" text-anchor="middle" font-size="8.4" font-weight="800" fill="#34d399">ビル管理 BMS</text>
            <text x="353" y="132" text-anchor="middle" font-size="7.8" font-weight="700" fill="#cbd5e1">PLC / 回転灯</text>
            <text x="353" y="152" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fda4af">断線・停電も</text>
            <text x="353" y="168" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fda4af">NC開放で即発報</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">インターネット回線・Wi-Fiに一切依存しない商業スタジオ・美術館必須インターフェース</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '無電圧接点 出力形式', 'SPDT Form-C', 'NO / COM / NC 着脱端子台', '#10b981')}
            ${drawKpiBox(0, 88, 112, 74, '絶縁耐圧', '2.5 kVrms', '相手設備と安全絶縁', '#7c3aed')}
            ${drawKpiBox(122, 88, 112, 74, '接点定格', 'DC 30V 1A', '金クラッド微小対応', '#d97706')}
            ${drawCompareFrame(0, 172, 234, 82, 'フェイルセーフNC配線の強み', '#065f46', '#ecfdf5')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#065f46">• 空き巣が警報線を切断しても即発報</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#047857">• Matter無線通知との二重冗長通報</text>
          </g>
        `,
        cards: [
          { label: '産業標準出力', line1: 'SPDT Form-C 無電圧ドライコンタクト', line2: 'NO/COM/NC 緑色着脱スクリュー端子' },
          { label: 'フェイルセーフ性', line1: 'NC常閉配線で断線・停電も即検知', line2: '2.5 kVrms絶縁で他社警備盤へ直結可' },
          { label: 'カメラを守る意味', line1: 'ネット障害時も警備室へ確実に通報', line2: '商業スタジオ・美術館・大学研究室対応' },
        ],
      });

    case 'db_magnetic_side_caddy':
      return wrapDryboxHdSvg({
        badge: 'DB125',
        stepTag: '非穿孔 N52マグネット',
        title: '非穿孔ネオジム・ラバー被覆マグネット式側面アクセサリーキャディ',
        analogy: '気密ボディにネジ穴を1つも開けず、ブロワーやレンズ拭きを側面にサッと収納できる磁石ポケット',
        accent: '#334155',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: Non-Drill N52 Rubber-Coated Magnet Attachment Cross-Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">気密鋼板を無傷に保つ 非穿孔ラバー被覆N52マグネット吸着断面</text>
            <!-- Left: Dry Cabinet Layered Wall (Aerogel + SPCC + ESD Coat - INTACT!) -->
            <rect x="26" y="42" width="38" height="168" fill="#e6eef6" stroke="#94a3b8"/>
            <text x="45" y="126" text-anchor="middle" font-size="8.0" font-weight="800" fill="#475569" transform="rotate(-90 45 126)">エアロゲル DB16</text>
            <rect x="64" y="42" width="20" height="168" fill="url(#db125-steel)" stroke="#475569"/>
            <text x="74" y="126" text-anchor="middle" font-size="7.8" font-weight="900" fill="#0f172a" transform="rotate(-90 74 126)">SPCC DB14</text>
            <rect x="84" y="42" width="7" height="168" fill="#222936"/>
            <!-- Rubber-Coated N52 Neodymium Disc Magnets (Zero Scratch!) -->
            <rect x="91" y="66" width="16" height="32" rx="4" fill="#111827" stroke="#0ea5e9" stroke-width="1.6"/>
            <rect x="91" y="148" width="16" height="32" rx="4" fill="#111827" stroke="#0ea5e9" stroke-width="1.6"/>
            <!-- Steel Side Caddy holding Rocket Blower & Sensor Swabs -->
            <path d="M 107 52 L 107 196 L 210 196 L 210 132 L 200 132 L 200 186 L 117 186 L 117 52 Z" fill="#334155" stroke="#0f172a" stroke-width="1.4"/>
            <!-- Stylized Red Blower Bulb + Swab Pack inside Caddy -->
            <ellipse cx="144" cy="156" rx="18" ry="24" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.3"/>
            <rect x="140" y="102" width="8" height="30" rx="2" fill="#0f172a"/>
            <rect x="168" y="114" width="24" height="70" rx="3" fill="#f1f5f9" stroke="#64748b"/>
            <text x="180" y="152" text-anchor="middle" font-size="7.4" font-weight="800" fill="#0f172a" transform="rotate(-90 180 152)">スワブ</text>
            <!-- Pins -->
            ${drawPin(99, 82, 240, 74, 1, 'EPDM被覆 N52磁石×4', '傷ゼロ・高摩擦 3.5kg保持', '#0ea5e9', 'start')}
            ${drawPin(74, 126, 240, 126, 2, '穴あけ・断熱破壊 0箇所', '気密＆エアロゲル完全無傷', '#16a34a', 'start')}
            ${drawPin(164, 166, 240, 178, 3, 'アルコール類を庫外分離', '庫内VOC増加＆扉開閉削減', '#d97706', 'start')}
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">扉を開けずに1秒でブロワー取得 → 庫内への湿気流入回数も大幅カット</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '非穿孔 垂直耐荷重', '3.5 kg', 'φ22mm EPDM被覆N52磁石×4', '#334155')}
            ${drawKpiBox(0, 88, 112, 74, '筐体穴あけ', '0 箇所', '気密・断熱無傷', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, 'ESD塗装傷', '完全ゼロ', '0.8mmゴム保護', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜクリーナーは庫外収納？', '#92400e', '#fffbeb')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#92400e">• レンズ洗浄液はVOC蒸気・液漏れ源</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#b45309">• 庫外側面収納で安全と最短動線を両立</text>
          </g>
        `,
        cards: [
          { label: '無穿孔マウント', line1: 'EPDMラバー完全被覆 N52磁石×4', line2: '高摩擦ゴムで垂直3.5 kgズレ落ちゼロ' },
          { label: '物理的メリット', line1: 'SPCC外壁＆エアロゲル断熱を無傷維持', line2: 'レイアウト変更や着脱も工具不要' },
          { label: 'カメラを守る意味', line1: 'ブロワー取り出し時の無駄な扉開閉削減', line2: '揮発アルコール洗浄液を庫外へ安全分離' },
        ],
      });

    case 'db_rear_cord_winder_cleat':
      return wrapDryboxHdSvg({
        badge: 'DB126',
        stepTag: '奥行42mm / 踏損防止',
        title: '背面50 mm放熱空間内蔵 電源コード巻き取りクリート＆N₂固定具',
        analogy: '余った長い電源コードや窒素ホースをキャスターで踏み潰さないよう背面へ綺麗に巻き取るフック',
        accent: '#475569',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: Rear 50mm Wall Clearance Zone Coordination (DB88 + DB126) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">背面 50 mm 壁バンパー空間（DB88）内 ケーブル＆N₂配管保護断面</text>
            <!-- Building Room Wall (Left) -->
            <rect x="24" y="42" width="46" height="172" fill="url(#db126-hatch)" stroke="#475569" stroke-width="1.5"/>
            <text x="47" y="128" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0f172a" transform="rotate(-90 47 128)">部屋の壁面</text>
            <!-- Protected 50mm Clearance Zone -->
            <rect x="70" y="42" width="128" height="172" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="4 3"/>
            <text x="134" y="60" text-anchor="middle" font-size="8.6" font-weight="900" fill="#0369a1">DB88 保護空間 50 mm</text>
            <!-- DB88 Top Bumper touching wall -->
            <rect x="70" y="68" width="128" height="16" rx="4" fill="#334155"/>
            <text x="134" y="80" text-anchor="middle" font-size="7.4" font-weight="800" fill="#ffffff">壁バンパー DB88 (50mm)</text>
            <!-- DB126 Recessed Cord Winder Cleat (42mm depth -> 8mm safe margin!) -->
            <rect x="92" y="102" width="106" height="58" rx="6" fill="#475569" stroke="#0f172a" stroke-width="1.4"/>
            <ellipse cx="144" cy="131" rx="34" ry="18" fill="none" stroke="#111827" stroke-width="7"/>
            <text x="144" y="134" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">ACコード 3m巻</text>
            <!-- Blue N2 Strain-Relief Clip (R >= 25mm) -->
            <circle cx="144" cy="184" r="14" fill="none" stroke="#0ea5e9" stroke-width="5"/>
            <text x="144" y="208" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0284c7">N₂管 R≧25mm保持</text>
            <!-- Cabinet Rear Panel (Right) -->
            <rect x="198" y="42" width="52" height="172" rx="4" fill="url(#db126-dark)" stroke="#0f172a"/>
            <text x="224" y="128" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff" transform="rotate(-90 224 128)">防湿庫 背面</text>
            <!-- Safe Margin Callouts -->
            ${drawPin(82, 131, 272, 86, 1, '壁との隙間 8 mm確保', 'コード挟み潰し発熱ゼロ', '#16a34a', 'start')}
            ${drawPin(144, 148, 272, 138, 2, '床から浮かせて管理', 'キャスター(DB86)踏損0', '#0284c7', 'start')}
            ${drawPin(158, 184, 272, 190, 3, 'N₂配管張力緩和クリップ', '引掛け抜け・キンク折れ防止', '#d97706', 'start')}
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">UL94 V-0 難燃PA66-GF30採用で背面放熱気流を妨げず安全配線管理</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'クリート突出奥行', '42 mm', 'DB88 (50mm) 内へ完全収納', '#475569')}
            ${drawKpiBox(0, 88, 112, 74, '巻取り容量', '最大 3.0 m', '余長ACコード収納', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '難燃規格', 'UL94 V-0', '絶縁PA66-GF30', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'キャスター移動時の重大事故予防', '#9f1239', '#fff1f2')}
            ${drawPill(12, 204, 210, '背面巻取有：踏損・トラッキング火災0', true)}
            ${drawPill(12, 229, 210, '床垂れ放置：車輪踏み潰し半断線', false)}
          </g>
        `,
        cards: [
          { label: '協調クリアランス', line1: '奥行42 mm（DB88の50mm保護内）', line2: 'UL94 V-0 難燃ガラス強化PA66製' },
          { label: '物理的メリット', line1: 'ACコード3 m巻き取り＋N₂管R保持', line2: '壁押し付けによるプラグ根元屈曲ゼロ' },
          { label: 'カメラを守る意味', line1: '移動時のキャスター踏損・漏電火災防止', line2: '背面放熱エアフロー経路もスッキリ確保' },
        ],
      });

    case 'db_18pct_gray_check_liner':
      return wrapDryboxHdSvg({
        badge: 'DB127',
        stepTag: '反射&lt;0.5% + 18%灰',
        title: '無反射フロック黒色検品パネル ＋ 着脱式18%中性グレーカード',
        analogy: '真っ黒なビロード背景でレンズ内の初期カビ・ホコリを星空のように浮かび上がらせる専用検品台',
        accent: '#334155',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: Dark-Field Lens Inspection Optics + 18% Gray Card -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">Ra97 LED(DB24) × 極低反射暗視野フロック ＆ 18%基準カード連携</text>
            <!-- Top Ra97 5000K Light Bar -->
            <rect x="46" y="34" width="332" height="20" rx="5" fill="#fef3c7" stroke="#eab308" stroke-width="1.4"/>
            <text x="212" y="48" text-anchor="middle" font-size="8.6" font-weight="900" fill="#713f12">DB24 Ra97 5000K 演色LED（フリッカーフリー照射）</text>
            <!-- Left Panel: Ultra-Black Flocked Backdrop (<0.5% reflectance) -->
            <rect x="26" y="68" width="232" height="142" rx="8" fill="#090b0f" stroke="#475569" stroke-width="1.8"/>
            <text x="142" y="88" text-anchor="middle" font-size="9.0" font-weight="900" fill="#94a3b8">無発塵 静電植毛マットブラック（R &lt; 0.5%）</text>
            <!-- Inspected Lens Circle showing tiny dust/fungus clearly in dark field -->
            <circle cx="142" cy="146" r="44" fill="#1e293b" stroke="#38bdf8" stroke-width="2.0"/>
            <circle cx="130" cy="136" r="2.2" fill="#ffffff"/>
            <circle cx="154" cy="144" r="1.8" fill="#fef08a"/>
            <path d="M 142 158 Q 148 152 156 162" fill="none" stroke="#34d399" stroke-width="1.6"/>
            <text x="142" y="202" text-anchor="middle" font-size="8.0" font-weight="800" fill="#38bdf8">微細チリ・クモリ・初期菌糸が一目瞭然！</text>
            <!-- Right Panel: Removable 18% Neutral Gray / WB Card -->
            <rect x="272" y="68" width="128" height="142" rx="8" fill="#777777" stroke="#334155" stroke-width="1.8"/>
            <rect x="284" y="80" width="48" height="26" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="308" y="96" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0f172a">白基準</text>
            <rect x="340" y="80" width="48" height="26" rx="3" fill="#090b0f" stroke="#334155"/>
            <text x="364" y="96" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">黒基準</text>
            <text x="336" y="138" text-anchor="middle" font-size="11.0" font-weight="900" fill="#ffffff">18% GRAY</text>
            <text x="336" y="156" text-anchor="middle" font-size="8.2" font-weight="800" fill="#f1f5f9">L* = 50 / ΔE&lt;1</text>
            <text x="336" y="178" text-anchor="middle" font-size="7.8" font-weight="700" fill="#e2e8f0">マグネット着脱式</text>
            <text x="336" y="194" text-anchor="middle" font-size="7.8" font-weight="700" fill="#e2e8f0">撮影前AWB点検</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">防湿庫を「保管箱」から「プロ修理工房級の光学検品ステーション」へ昇華</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '暗視野フロック 反射率', '&lt; 0.5%', '99.5%光吸収・無発塵ナイロン植毛', '#0f172a')}
            ${drawKpiBox(0, 88, 112, 74, '基準グレー', '18.0%', 'ΔE &lt; 1.0 高精度', '#475569')}
            ${drawKpiBox(122, 88, 112, 74, '連携演色灯', 'Ra97 5000K', 'DB24直下最適配置', '#d97706')}
            ${drawCompareFrame(0, 172, 234, 82, '撮影前10秒ルーティン検品', '#1e293b', '#f8fafc')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#1e293b">• レンズの初期曇り・チリを即目視確認</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#475569">• 露出計・カスタムWBのズレを出発前校正</text>
          </g>
        `,
        cards: [
          { label: '暗視野光学検品', line1: '反射率0.5%未満の静電植毛黒パネル', line2: '無発塵ナイロン繊維・低VOC接着' },
          { label: '撮影基準カード', line1: '着脱式18%中性グレー＋白黒パッチ', line2: '分光反射率偏差ΔE 1.0未満の高精度' },
          { label: 'カメラを守る意味', line1: 'カビの芽・クモリを早期発見し処置', line2: 'プロ現場前の機材点検を防湿庫で完結' },
        ],
      });

    case 'db_front_kickplate_guard':
      return wrapDryboxHdSvg({
        badge: 'DB128',
        stepTag: 'SUS304 + Shore A65',
        title: 'ヘアラインSUS304トウキック板 ＋ EPDMロボット掃除機バンパー',
        analogy: '毎日のロボット掃除機や三脚の脚の衝突から足元の塗装剥がれと赤錆を守るステンレス装甲',
        accent: '#64748b',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: Lower Plinth Impact Protection Cross-Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">筐体最下端 2層衝撃吸収アーマー（ロボット掃除機・三脚脚衝突保護）</text>
            <!-- Floor Line -->
            <line x1="20" y1="204" x2="404" y2="204" stroke="#475569" stroke-width="2.2"/>
            <text x="64" y="220" font-size="8.2" font-weight="700" fill="#64748b">スタジオ床面</text>
            <!-- Robot Vacuum Approaching from Left -->
            <rect x="30" y="152" width="96" height="44" rx="18" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.6"/>
            <rect x="64" y="142" width="28" height="12" rx="4" fill="#334155"/>
            <text x="78" y="178" text-anchor="middle" font-size="8.0" font-weight="800" fill="#ffffff">ロボット掃除機</text>
            <line x1="128" y1="174" x2="164" y2="174" stroke="#e11d48" stroke-width="2.6" marker-end="url(#db128-arrRed)"/>
            <!-- Dry Cabinet Lower Plinth (Right) -->
            <rect x="200" y="54" width="186" height="132" rx="6" fill="url(#db128-dark)" stroke="#0f172a" stroke-width="1.5"/>
            <text x="296" y="96" text-anchor="middle" font-size="9.4" font-weight="900" fill="#f8fafc">SPCC筐体 ＋ ESD塗装</text>
            <text x="296" y="114" text-anchor="middle" font-size="8.0" font-weight="700" fill="#94a3b8">DB14 / DB15 完全無傷！</text>
            <!-- Layer 1: Brushed SUS304 1.0mm Kickplate -->
            <rect x="190" y="124" width="12" height="62" rx="2" fill="url(#db128-steel)" stroke="#475569" stroke-width="1.4"/>
            <!-- Layer 2: Shore A 65 EPDM Bumper Strip aligned at 20-55mm height -->
            <rect x="172" y="150" width="18" height="32" rx="5" fill="#111827" stroke="#0284c7" stroke-width="1.6"/>
            <!-- Caster/Leveling Foot underneath -->
            <rect x="236" y="186" width="32" height="18" rx="4" fill="#475569"/>
            <rect x="326" y="186" width="32" height="18" rx="4" fill="#475569"/>
            <!-- Pins -->
            ${drawPin(181, 154, 108, 72, 1, 'Shore A 65 EPDMバンパー', '衝突ピーク荷重 −68%緩和', '#0284c7', 'middle')}
            ${drawPin(196, 132, 304, 152, 2, '1.0 mm SUS304装甲板', 'モップ水拭き・サビ完全防禦', '#16a34a', 'middle')}
            <text x="212" y="240" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">地上20〜55 mmの接触帯をピンポイント装甲し、10年後も新品同様の美観を維持</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '衝突ピーク荷重 緩和率', '-68%', 'Shore A 65 押出EPDMバンパー', '#475569')}
            ${drawKpiBox(0, 88, 112, 74, '装甲材質', 'SUS304', '1.0mm ヘアライン', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '保護対象', '20〜55mm', '掃除機・三脚脚帯', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '塗装欠け→赤錆の連鎖を断つ', '#1e293b', '#f8fafc')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#1e293b">• 左右コーナーキャップまで一体保護</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#475569">• ノンマーキング配合で相手側も無傷</text>
          </g>
        `,
        cards: [
          { label: '2層足元アーマー', line1: '1.0 mm ヘアラインSUS304鋼板', line2: 'Shore A 65 EPDM耐衝撃バンパー' },
          { label: '物理的メリット', line1: '日常衝突の衝撃ピークを68%吸収', line2: '床モップ水拭きによる下端赤錆ゼロ' },
          { label: 'カメラを守る意味', line1: 'ESD塗装剥離を防ぎ筐体寿命を20年化', line2: '掃除機やCスタンドと安全に共存' },
        ],
      });

    case 'db_modular_gang_brackets':
      return wrapDryboxHdSvg({
        badge: 'DB129',
        stepTag: '耐転倒2倍 / 等電位0V',
        title: 'モジュラー複数台連結SUS304耐震金具 ＋ 共通銅等電位アースリンク',
        analogy: '増設した2台の防湿庫を1つの要塞へ合体させ、地震の転倒限界を2倍にし静電気電位も揃える金具',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Dual Ganged Cabinets Structural + Equipotential Earth Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">2台並列ギャンギング連結（幅 B → 2B で転倒限界2倍 ＋ 電位差0 V）</text>
            <!-- Cabinet A (Left) -->
            <rect x="44" y="46" width="118" height="154" rx="8" fill="url(#db129-dark)" stroke="#0f172a" stroke-width="1.6"/>
            <text x="103" y="106" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">防湿庫 #1</text>
            <text x="103" y="124" text-anchor="middle" font-size="8.0" font-weight="700" fill="#94a3b8">光学レンズ庫</text>
            <!-- Cabinet B (Right) -->
            <rect x="176" y="46" width="118" height="154" rx="8" fill="url(#db129-dark)" stroke="#0f172a" stroke-width="1.6"/>
            <text x="235" y="106" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">防湿庫 #2</text>
            <text x="235" y="124" text-anchor="middle" font-size="8.0" font-weight="700" fill="#94a3b8">シネマ機材庫</text>
            <!-- Top & Bottom Heavy 3.0mm SUS304 Ganging Brackets bridging #1 and #2 -->
            <rect x="142" y="56" width="54" height="18" rx="3" fill="url(#db129-steel)" stroke="#0284c7" stroke-width="1.8"/>
            <rect x="142" y="172" width="54" height="18" rx="3" fill="url(#db129-steel)" stroke="#0284c7" stroke-width="1.8"/>
            <!-- Common 10 mm² Copper Equipotential Earth Link Bar -->
            <rect x="146" y="138" width="46" height="14" rx="3" fill="url(#db129-copper)" stroke="#16a34a" stroke-width="1.8"/>
            <text x="169" y="148" text-anchor="middle" font-size="7.4" font-weight="900" fill="#ffffff">0V 銅リンク</text>
            <!-- Effective Base Width 2B arrow -->
            <line x1="44" y1="212" x2="294" y2="212" stroke="#0284c7" stroke-width="2.2" marker-start="url(#db129-arrBlue)" marker-end="url(#db129-arrBlue)"/>
            <text x="169" y="226" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0c4a6e">実効底面幅 2B → a_crit = g・(2B / 2H) ＝ 2倍！</text>
            <!-- Right Callouts -->
            ${drawPin(196, 65, 314, 72, 1, '3mm SUS304金具', '地震衝突パウンディング0', '#0284c7', 'start')}
            ${drawPin(192, 145, 314, 142, 2, '10mm² 銅等電位バー', '筐体間アース差 0V', '#16a34a', 'start')}
            <text x="212" y="242" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">データセンターサーバラック連結思想で2台〜N台を美しく安全に拡張</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '並列2台 転倒限界加速度', '2.0 倍向上', '実効底面幅2倍化＋剛結一体化', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, '筐体間電位差', 'ΔV = 0 V', '10mm²純銅リンク', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '金具板厚', '3.0 mm', 'SUS304高剛性', '#475569')}
            ${drawCompareFrame(0, 172, 234, 82, '増設スタジオ機材庫の安全', '#0c4a6e', '#f0f9ff')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#0c4a6e">• 隣接箱同士の地震激突を物理阻止</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#0369a1">• 2台間の機材移動時も静電気ショック0</text>
          </g>
        `,
        cards: [
          { label: '剛結ギャンギング', line1: '3.0 mm SUS304上下耐震連結金具', line2: '壁面スタッドアンカー兼用ウィング付' },
          { label: '電気的等電位化', line1: '10 mm² 純銅等電位ボンディングバー', line2: '別系統コンセント間の地絡電位差を0V' },
          { label: 'カメラを守る意味', line1: '増設時の耐震転倒安全率を2倍へ強化', line2: '隣箱の扉開閉振動伝達も抑制' },
        ],
      });

    case 'db_dfd_iso11469_eco_id':
      return wrapDryboxHdSvg({
        badge: 'DB130',
        stepTag: 'EU ESPR / 94.6%循環',
        title: 'EU ESPR 2026 ＆ ISO 11469 素材識別 ＋ 単一工具DfDリサイクル指標',
        analogy: '20年後に寿命を迎えてもトルクス1本で94.6%を完璧に分別循環できる未来の環境パスポート',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          <!-- Left: Digital Product Passport Plate + 94.6% Material Recyclability Breakdown -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">2026年 EU ESPR デジタル製品パスポート ＆ 単一Torx T20 分解設計</text>
            <!-- Left: Laser-Etched Anodized Aluminum DPP Plate -->
            <rect x="20" y="40" width="166" height="174" rx="8" fill="url(#db130-steel)" stroke="#059669" stroke-width="1.8"/>
            <text x="103" y="59" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0f172a">EU ESPR 2026 DPP</text>
            <!-- Stylized QR Code Matrix -->
            <rect x="34" y="68" width="54" height="54" rx="4" fill="#0f172a"/>
            <rect x="40" y="74" width="14" height="14" fill="#ffffff"/>
            <rect x="68" y="74" width="14" height="14" fill="#ffffff"/>
            <rect x="40" y="102" width="14" height="14" fill="#ffffff"/>
            <rect x="58" y="92" width="12" height="12" fill="#34d399"/>
            <!-- Single Torx T20 Icon -->
            <circle cx="136" cy="95" r="22" fill="#d4a137" stroke="#78350f" stroke-width="1.5"/>
            <text x="136" y="93" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">Torx</text>
            <text x="136" y="105" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">T20</text>
            <!-- ISO 11469 Polymer Marks -->
            <rect x="30" y="132" width="146" height="22" rx="4" fill="#0f172a"/>
            <text x="103" y="147" text-anchor="middle" font-size="7.8" font-weight="800" fill="#34d399">&gt;PA66-GF30&lt; &gt;EPDM&lt; &gt;POM&lt;</text>
            <rect x="30" y="160" width="146" height="42" rx="5" fill="#dcfce7" stroke="#16a34a"/>
            <text x="103" y="177" text-anchor="middle" font-size="8.4" font-weight="900" fill="#14532d">PFAS・CoCl₂・Pb ゼロ</text>
            <text x="103" y="193" text-anchor="middle" font-size="8.2" font-weight="800" fill="#15803d">全130部品 分解手順QR連動</text>
            <!-- Right: Material Separation Bar Chart (Total 94.6% Recyclable) -->
            <rect x="198" y="40" width="208" height="174" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
            <text x="302" y="60" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f172a">質量ベース高純度リサイクル率 94.6%</text>
            <!-- Bar 1: SPCC Steel & SUS304 -->
            <text x="210" y="84" font-size="8.2" font-weight="800" fill="#334155">鉄・SUS304（64%）</text>
            <rect x="210" y="90" width="176" height="12" rx="3" fill="#e2e8f0"/>
            <rect x="210" y="90" width="150" height="12" rx="3" fill="#475569"/>
            <!-- Bar 2: Low-E Glass & Aluminum -->
            <text x="210" y="118" font-size="8.2" font-weight="800" fill="#0284c7">アルミ・強化ガラス（21%）</text>
            <rect x="210" y="124" width="176" height="12" rx="3" fill="#e2e8f0"/>
            <rect x="210" y="124" width="96" height="12" rx="3" fill="#0284c7"/>
            <!-- Bar 3: Copper / PCB / Single Polymers -->
            <text x="210" y="152" font-size="8.2" font-weight="800" fill="#059669">純銅・ISO単一樹脂（9.6%）</text>
            <rect x="210" y="158" width="176" height="12" rx="3" fill="#e2e8f0"/>
            <rect x="210" y="158" width="56" height="12" rx="3" fill="#10b981"/>
            <!-- Bottom summary pill -->
            <rect x="210" y="180" width="184" height="24" rx="5" fill="#ecfdf5" stroke="#059669"/>
            <text x="302" y="196" text-anchor="middle" font-size="8.2" font-weight="900" fill="#065f46">主要締結90%+をTorx T20へ統一</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">カメラ資産を20年守ったその先まで地球環境へ責任を持つサーキュラー設計</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '質量ベース 資源循環率', '94.6%', '単一素材高純度マテリアル回収', '#059669')}
            ${drawKpiBox(0, 88, 112, 74, '標準分解工具', 'Torx T20', '90%以上締結統一', '#d97706')}
            ${drawKpiBox(122, 88, 112, 74, '素材識別', 'ISO 11469', '全樹脂レーザー刻印', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, '2026年 欧州ESPR先取り実装', '#065f46', '#ecfdf5')}
            ${drawPill(12, 204, 210, 'DfD設計：20年修理＆94.6%循環', true)}
            ${drawPill(12, 229, 210, '接着固定家電：分別不可で埋立廃棄', false)}
          </g>
        `,
        cards: [
          { label: '2026年環境規格', line1: 'EU ESPR デジタル製品パスポートQR', line2: 'ISO 11469 全樹脂素材レーザー刻印' },
          { label: '分解容易性(DfD)', line1: '主要締結をSUS304 Torx T20へ統一', line2: '不可逆接着を排除し94.6%資源循環' },
          { label: 'カメラを守る意味', line1: '部品調達・長期修理の透明性を保証', line2: '有害物質ゼロ(PFAS/CoCl₂フリー)安心' },
        ],
      });

    default:
      return null;
  }
}
