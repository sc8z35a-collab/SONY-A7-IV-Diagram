import { drawCompareFrame, drawKpiBox, drawPill, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group M (10 Frontier 2026 Parts: DB131–DB140):
 * SPD SmartGlass Sun-Shield, Axial Compression Latch, BLE 6.0 Channel Sounding,
 * 60 GHz MIMO mmWave Radar, 365/405nm Fungal Autofluorescence LED,
 * Fumed-Silica VIP (0.004 W/m·K), Sub-100nm Graphene Oxide Nanoslit Membrane,
 * MOF-303 Hydrogel 30-Day Buffer, Far-UVC 222nm KrCl Emitter & Visible-Light g-C3N4 Coating.
 */
export function renderDryboxGroupMSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_spd_smart_sunshield_glass':
      return wrapDryboxHdSvg({
        badge: 'DB131',
        stepTag: '2026年 SPD調光98%',
        title: '美術館級 90 μm SPD電子調光サンシールド・プライバシーガラス膜',
        analogy: '人がいない時はサングラスのように光を98%遮り、近づくと0.5秒で透明になる電子調光膜',
        accent: '#312e81',
        accentSoft: '#e0e7ff',
        body: `
          <!-- Left: SPD Suspended Particle Alignment (Dark Standby vs Clear Viewing) -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">90 μm 浮遊粒子デバイス（SPD）2状態光学スイッチング原理</text>
            <!-- Top Panel: Dark Standby (0V Random Orientation -> Blocks 98% Visible & 99% UV!) -->
            <rect x="18" y="34" width="388" height="86" rx="8" fill="#1e1b4b" stroke="#4338ca" stroke-width="1.6"/>
            <text x="28" y="52" font-size="9.0" font-weight="900" fill="#e0e7ff">① 待機暗黒モード（0 V無通電）：ナノ棒状粒子がランダム配向</text>
            <line x1="28" y1="84" x2="108" y2="84" stroke="#facc15" stroke-width="2.6" marker-end="url(#db131-arrAmber)"/>
            <rect x="114" y="60" width="96" height="48" rx="4" fill="#312e81" stroke="#818cf8" stroke-width="1.4"/>
            <!-- Randomly tilted particles blocking light -->
            <line x1="126" y1="70" x2="144" y2="96" stroke="#c4b5fd" stroke-width="2.6"/>
            <line x1="150" y1="98" x2="168" y2="68" stroke="#c4b5fd" stroke-width="2.6"/>
            <line x1="174" y1="72" x2="196" y2="92" stroke="#c4b5fd" stroke-width="2.6"/>
            <text x="304" y="79" text-anchor="middle" font-size="9.0" font-weight="900" fill="#fde047">可視光 98% ＆ UV 99% 遮断</text>
            <text x="304" y="98" text-anchor="middle" font-size="8.0" font-weight="700" fill="#c4b5fd">温室加熱ゼロ・外から中身を隠匿</text>
            <!-- Bottom Panel: Clear Viewing (AC Aligned -> Instant Clear in <0.5s!) -->
            <rect x="18" y="130" width="388" height="88" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
            <text x="28" y="148" font-size="9.0" font-weight="900" fill="#0c4a6e">② 接近クリアモード（DB134レーダー連動）：電界で粒子が一斉整列</text>
            <line x1="28" y1="182" x2="252" y2="182" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db131-arrBlue)"/>
            <rect x="114" y="158" width="96" height="48" rx="4" fill="#ffffff" fill-opacity="0.7" stroke="#0284c7" stroke-width="1.4"/>
            <!-- Horizontally aligned particles letting light pass -->
            <line x1="126" y1="170" x2="150" y2="170" stroke="#4338ca" stroke-width="2.2"/>
            <line x1="168" y1="170" x2="192" y2="170" stroke="#4338ca" stroke-width="2.2"/>
            <line x1="126" y1="194" x2="150" y2="194" stroke="#4338ca" stroke-width="2.2"/>
            <line x1="168" y1="194" x2="192" y2="194" stroke="#4338ca" stroke-width="2.2"/>
            <text x="328" y="177" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0369a1">&lt; 0.5 秒で瞬時クリア</text>
            <text x="328" y="196" text-anchor="middle" font-size="8.0" font-weight="700" fill="#0c4a6e">累計ルクス・アワー記録</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">停電時は無通電で自動暗黒（フェイルセーフ遮光＋盗難視線ガード）</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '暗黒待機 遮光率', '98% / 99%', '可視光98%・紫外線UV99%遮断', '#312e81')}
            ${drawKpiBox(0, 88, 112, 74, 'SPD膜厚', '90 μm', 'PET封入光学層', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '切替応答', '&lt; 0.5 秒', 'DB134レーダー連動', '#7c3aed')}
            ${drawCompareFrame(0, 172, 234, 82, '2026年 美術館展示ケース技術', '#1e1b4b', '#eef2ff')}
            <text x="14" y="216" font-size="8.6" font-weight="800" fill="#1e1b4b">• 直射日光による庫内温室加熱を遮断</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#4338ca">• ヴィンテージ革・レンズ鏡筒の日焼け0</text>
          </g>
        `,
        cards: [
          { label: '美術館スマート硝子', line1: '90 μm SPD浮遊粒子電子調光層', line2: '無通電時はフェイルセーフ暗黒遮光' },
          { label: '物理的メリット', line1: 'UV99%＆可視光98%遮断で退色ゼロ', line2: '0.5秒切替＋美術館基準lx・h積算' },
          { label: 'カメラを守る意味', line1: '日差し温室効果と盗難視線を同時遮断', line2: '鑑賞したい時だけ美しくクリア表示' },
        ],
      });

    case 'db_compression_pull_latch':
      return wrapDryboxHdSvg({
        badge: 'DB132',
        stepTag: '軸引込 +6.0 mm',
        title: 'バイズアクション軸方向＋6 mm引き込み気密コンプレッションラッチ',
        analogy: '潜水艦ハッチのようにレバー90°回転で扉を＋6 mm奥へ引き寄せ、ガタも漏れも完全封止',
        accent: '#475569',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: 90° Helical Cam Axial Pull-Down +6mm Gasket Preload Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">Southco E3 バイズアクション 2段階動作（掛止 → ＋6 mm 軸方向圧縮）</text>
            <!-- Step 1: First 45° Latch Engagement -->
            <rect x="18" y="36" width="186" height="172" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4"/>
            <text x="111" y="56" text-anchor="middle" font-size="9.2" font-weight="900" fill="#334155">① 前半45°：爪が枠裏へ係合</text>
            <rect x="34" y="76" width="24" height="82" fill="url(#db132-steel)" stroke="#475569"/>
            <rect x="58" y="88" width="18" height="58" rx="4" fill="#111827"/>
            <rect x="76" y="76" width="22" height="82" fill="#334155"/>
            <rect x="98" y="106" width="66" height="22" rx="3" fill="#475569"/>
            <text x="111" y="178" text-anchor="middle" font-size="8.0" font-weight="700" fill="#64748b">パッキン軽接触（初期状態）</text>
            <text x="111" y="194" text-anchor="middle" font-size="7.8" font-weight="700" fill="#94a3b8">一般カム錠はここで終了</text>
            <!-- Arrow -->
            <line x1="206" y1="122" x2="226" y2="122" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db132-arrBlue)"/>
            <!-- Step 2: Second 45° Helical Pull-Down (+6 mm Axial Compression!) -->
            <rect x="230" y="36" width="176" height="172" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.6"/>
            <text x="318" y="56" text-anchor="middle" font-size="9.2" font-weight="900" fill="#14532d">② 後半45°：＋6 mm 強力圧縮！</text>
            <rect x="246" y="76" width="24" height="82" fill="url(#db132-steel)" stroke="#475569"/>
            <rect x="270" y="84" width="10" height="66" rx="3" fill="#16a34a"/>
            <rect x="280" y="76" width="22" height="82" fill="#334155"/>
            <rect x="302" y="106" width="56" height="22" rx="3" fill="#0f172a"/>
            <line x1="362" y1="117" x2="318" y2="117" stroke="#e11d48" stroke-width="2.8" marker-end="url(#db132-arrRed)"/>
            <text x="318" y="176" text-anchor="middle" font-size="8.4" font-weight="900" fill="#15803d">軸方向引込 ＋6.0 mm</text>
            <text x="318" y="193" text-anchor="middle" font-size="7.8" font-weight="700" fill="#166534">IP65気密・振動ビビり 0！</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">真鍮調整ナットで経年パッキン摩耗も再圧縮補正・N₂正圧パージ押し戻しゼロ</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '軸方向パッキン引込量', '+6.0 mm', '螺旋バイズアクション・カム機構', '#334155')}
            ${drawKpiBox(0, 88, 112, 74, '振動ビビり', '0 μm', '常時圧縮与圧保持', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '経年補正', '真鍮ナット', '引込代を自在再調整', '#d97706')}
            ${drawCompareFrame(0, 172, 234, 82, '圧縮ラッチ vs 単純カム錠', '#1e293b', '#f8fafc')}
            ${drawPill(12, 204, 210, '圧縮ラッチ：＋6mm引込で完全密閉', true)}
            ${drawPill(12, 229, 210, '単純カム錠：引掛のみで気密圧不足', false)}
          </g>
        `,
        cards: [
          { label: '螺旋圧縮メカニズム', line1: '90°回転で爪掛止＋6.0 mm軸引込', line2: 'SUS304埋込ベゼル＋開閉状態ドット' },
          { label: '物理的メリット', line1: 'EPDM(DB04)と自己修復(DB142)均一圧縮', line2: 'N₂正圧パージや地震振動で隙間ゼロ' },
          { label: 'カメラを守る意味', line1: '梅雨極湿期や長期不在時の絶対気密', line2: 'スピーカー近接の扉共振ビビりも根絶' },
        ],
      });

    case 'db_ble6_channel_sounding_ant':
      return wrapDryboxHdSvg({
        badge: 'DB133',
        stepTag: 'Bluetooth 6.0 / ±20cm',
        title: 'Bluetooth 6.0/6.3 チャネルサウンディング近接ハンズフリー解錠',
        analogy: '両手にカメラを抱えて近づくだけで±20 cm精度で安全自動解錠し、リレー盗難も防ぐ2026年測距',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Dual-Method PBR + RTT Distance Bounding Diagram -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">Bluetooth Core 6.0 / 6.3 精密測距（PBR位相差 ＋ 光速RTT防犯検証）</text>
            <!-- Left: Dry Cabinet Dual Orthogonal Antennas -->
            <rect x="20" y="54" width="110" height="148" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="1.8"/>
            <text x="75" y="78" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">防湿庫 SoC</text>
            <text x="75" y="96" text-anchor="middle" font-size="8.0" font-weight="800" fill="#38bdf8">nRF54L/H 級</text>
            <rect x="34" y="112" width="32" height="12" rx="2" fill="#f3f0e8"/>
            <rect x="86" y="112" width="12" height="32" rx="2" fill="#f3f0e8"/>
            <text x="75" y="164" text-anchor="middle" font-size="7.8" font-weight="700" fill="#cbd5e1">直交2軸アンテナ</text>
            <text x="75" y="182" text-anchor="middle" font-size="7.8" font-weight="800" fill="#34d399">DB119 SE050連携</text>
            <!-- Middle: 72ch PBR Phase Waves + RTT Round Trip -->
            <path d="M 134 94 Q 160 72 186 94 T 238 94 T 288 94" fill="none" stroke="#0284c7" stroke-width="2.6"/>
            <text x="212" y="74" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0369a1">① 72ch PBR位相差：±20 cm測距</text>
            <line x1="136" y1="146" x2="286" y2="146" stroke="#16a34a" stroke-width="2.2" marker-end="url(#db133-arrGreen)"/>
            <line x1="286" y1="162" x2="136" y2="162" stroke="#16a34a" stroke-width="2.2" marker-end="url(#db133-arrGreen)"/>
            <text x="212" y="138" text-anchor="middle" font-size="8.4" font-weight="900" fill="#15803d">② 光速RTT往復時間検証</text>
            <text x="212" y="182" text-anchor="middle" font-size="7.8" font-weight="800" fill="#be123c">電波中継リレー攻撃をns単位で遮断</text>
            <!-- Right: Photographer's Smartphone at 0.8 m -->
            <rect x="294" y="54" width="110" height="148" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
            <text x="349" y="80" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0c4a6e">持ち主スマホ</text>
            <text x="349" y="106" text-anchor="middle" font-size="11.0" font-weight="900" fill="#0284c7">0.8 m 接近</text>
            <rect x="308" y="122" width="82" height="32" rx="6" fill="#dcfce7" stroke="#16a34a"/>
            <text x="349" y="142" text-anchor="middle" font-size="8.6" font-weight="900" fill="#14532d">🔓 自動解錠</text>
            <text x="349" y="176" text-anchor="middle" font-size="7.6" font-weight="700" fill="#0369a1">両手にカメラでも</text>
            <text x="349" y="190" text-anchor="middle" font-size="7.6" font-weight="700" fill="#0369a1">触れずに即開扉</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">従来の誤差±3m RSSIを過去化！専用UWBチップ不要で超低消費電力測距</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'チャネルサウンディング精度', '±20 cm', '72チャネルPBR＋RTT距離保証', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, 'リレー攻撃', '100%防御', '光速RTT時間検証', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '対応規格', 'BT 6.0/6.3', '2026年最新BLE', '#7c3aed')}
            ${drawCompareFrame(0, 172, 234, 82, '旧RSSI測距との決定的な差', '#0c4a6e', '#f0f9ff')}
            ${drawPill(12, 204, 210, 'BT6.0 CS：±20cm安全近接解錠', true)}
            ${drawPill(12, 229, 210, '旧RSSI：±3m誤差で別室誤解錠', false)}
          </g>
        `,
        cards: [
          { label: '2026年最新測距', line1: 'Bluetooth Core 6.0/6.3 準拠SoC', line2: '直交2軸アンテナで反射誤差を補正' },
          { label: '二重安全検証', line1: 'PBR位相差で±20 cmの正確な距離算出', line2: '光速RTTで中継リレー盗難を物理遮断' },
          { label: 'カメラを守る意味', line1: '両手に望遠レンズでも置かずに即開扉', line2: '離れた瞬間に自動施錠し忘れ物防止' },
        ],
      });

    case 'db_60ghz_mmwave_presence_radar':
      return wrapDryboxHdSvg({
        badge: 'DB134',
        stepTag: '60GHz AiP / &lt;10ms',
        title: '60 GHz MIMO AiPミリ波接近・在室レーダー（完全カメラレス）',
        analogy: 'カメラを一切使わず真っ暗闇でも2.7 cm精度で人の接近を感じ、調光ガラスと照明を自動起動',
        accent: '#6366f1',
        accentSoft: '#e0e7ff',
        body: `
          <!-- Left: 60 GHz FMCW Radar Cone + Privacy-Safe Local Edge AI -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">60 GHz 1T3R MIMO AiP ミリ波FMCWレーダー接近検知フロー</text>
            <!-- Left: 6x23mm AiP Module -->
            <rect x="20" y="68" width="102" height="114" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.8"/>
            <text x="71" y="92" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">60 GHz AiP</text>
            <text x="71" y="109" text-anchor="middle" font-size="7.8" font-weight="800" fill="#c4b5fd">1Tx / 3Rx MIMO</text>
            <rect x="40" y="120" width="62" height="26" rx="4" fill="#312e81" stroke="#facc15"/>
            <text x="71" y="137" text-anchor="middle" font-size="7.8" font-weight="900" fill="#fde047">エッジAI &lt;10ms</text>
            <text x="71" y="166" text-anchor="middle" font-size="7.4" font-weight="700" fill="#34d399">カメラ不使用</text>
            <!-- Radar Waves Expanding -->
            <path d="M 134 100 A 38 38 0 0 1 134 150" fill="none" stroke="#6366f1" stroke-width="2.4"/>
            <path d="M 152 84 A 56 56 0 0 1 152 166" fill="none" stroke="#818cf8" stroke-width="2.2"/>
            <path d="M 172 68 A 74 74 0 0 1 172 182" fill="none" stroke="#a5b4fc" stroke-width="2.0"/>
            <text x="164" y="54" text-anchor="middle" font-size="8.4" font-weight="900" fill="#4338ca">距離分解能 2.7 cm</text>
            <text x="164" y="202" text-anchor="middle" font-size="7.8" font-weight="800" fill="#4f46e5">暗闇・92%高湿OK</text>
            <!-- Right: 3 Automated Orchestration Outputs -->
            <rect x="218" y="40" width="188" height="48" rx="7" fill="#eef2ff" stroke="#6366f1"/>
            <text x="312" y="60" text-anchor="middle" font-size="8.8" font-weight="900" fill="#312e81">① DB131 SPD調光ガラス</text>
            <text x="312" y="76" text-anchor="middle" font-size="7.8" font-weight="700" fill="#4338ca">1.2m接近で自動クリア化</text>
            <rect x="218" y="98" width="188" height="48" rx="7" fill="#fefce8" stroke="#eab308"/>
            <text x="312" y="118" text-anchor="middle" font-size="8.8" font-weight="900" fill="#713f12">② DB24 Ra97 LED ＆ DB08</text>
            <text x="312" y="134" text-anchor="middle" font-size="7.8" font-weight="700" fill="#854d0e">ソフト点灯・離脱後自動消灯</text>
            <rect x="218" y="156" width="188" height="48" rx="7" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="312" y="176" text-anchor="middle" font-size="8.8" font-weight="900" fill="#9f1239">③ 不審者の長時間滞留監視</text>
            <text x="312" y="192" text-anchor="middle" font-size="7.8" font-weight="700" fill="#be123c">未認証接近をログ＆スマホ警報</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年ミリ波比較試験：PIR赤外線のホコリ誤動作(47%)を克服し99.1%安定</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '高湿・暗闇 安定検知率', '99.1%', 'ホコリ・温度変化ドリフト0', '#6366f1')}
            ${drawKpiBox(0, 88, 112, 74, 'エッジ推論', '&lt; 10 ms', 'クラウド送信ゼロ', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '距離分解能', '2.7 cm', '60 GHz FMCW', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, '寝室・自宅でも安心な理由', '#312e81', '#eef2ff')}
            ${drawPill(12, 204, 210, 'ミリ波レーダー：映像取得ゼロ安全', true)}
            ${drawPill(12, 229, 210, '監視カメラ方式：プライバシー懸念', false)}
          </g>
        `,
        cards: [
          { label: '2026年AiPレーダー', line1: '60 GHz 1T3R MIMO Antenna-in-Pkg', line2: '光学レンズ不要・ベゼル裏隠し実装' },
          { label: 'プライバシー＆精度', line1: 'ローカルAI推論10ms未満・映像ゼロ', line2: '暗闇・高湿・静止人物も99.1%検知' },
          { label: 'カメラを守る意味', line1: '無人時の照明・透光を自動で完全停止', line2: '光劣化＆消費電力を最大25%削減' },
        ],
      });

    case 'db_365_405nm_fungus_inspect_led':
      return wrapDryboxHdSvg({
        badge: 'DB135',
        stepTag: '365 / 405nm 自家蛍光',
        title: 'デュアル波長 365 nm／405 nm レンズ初期カビ自家蛍光検品LED',
        analogy: '普通の光で見えない透明な初期カビの糸を、特殊な紫の光で黄緑色に発光させる科学捜査ライト',
        accent: '#7c3aed',
        accentSoft: '#ede9fe',
        body: `
          <!-- Left: Dual-Wavelength Fungal Autofluorescence Optics -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">365 nm（胞子）＋ 405 nm（キチン・フラビン菌糸）非破壊自家蛍光検疫</text>
            <!-- Top Dual-Wavelength LED Bar -->
            <rect x="44" y="34" width="336" height="28" rx="6" fill="#1e1b4b" stroke="#7c3aed" stroke-width="1.5"/>
            <circle cx="118" cy="48" r="7" fill="#38bdf8"/>
            <text x="158" y="52" font-size="8.4" font-weight="900" fill="#bae6fd">365 nm UV-A</text>
            <circle cx="254" cy="48" r="7" fill="#a855f7"/>
            <text x="294" y="52" font-size="8.4" font-weight="900" fill="#e9d5ff">405 nm バイオレット</text>
            <!-- Excitation Beams down to Lens on DB127 Black Flocked Backdrop -->
            <line x1="118" y1="62" x2="176" y2="128" stroke="#38bdf8" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#db135-arrBlue)"/>
            <line x1="254" y1="62" x2="218" y2="128" stroke="#a855f7" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#db135-arrPurple)"/>
            <!-- Dark Flocked Stage (DB127) with Inspected Vintage Lens -->
            <rect x="34" y="102" width="212" height="108" rx="8" fill="#090b0f" stroke="#475569" stroke-width="1.6"/>
            <circle cx="140" cy="156" r="40" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <!-- Glowing Green-Yellow Fungal Hyphae Autofluorescence (~520nm)! -->
            <path d="M 122 148 Q 134 140 144 152 T 162 156" fill="none" stroke="#a3e635" stroke-width="2.8" stroke-linecap="round"/>
            <circle cx="130" cy="166" r="3.5" fill="#bef264"/>
            <circle cx="154" cy="144" r="3.0" fill="#bef264"/>
            <text x="140" y="202" text-anchor="middle" font-size="8.0" font-weight="900" fill="#bef264">黄緑色自家蛍光（~520 nm）で即発見！</text>
            <!-- Right Info Cards -->
            <rect x="260" y="102" width="146" height="108" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.4"/>
            <text x="333" y="122" text-anchor="middle" font-size="8.8" font-weight="900" fill="#5b21b6">航空NDT 2波長診断</text>
            <text x="270" y="142" font-size="8.0" font-weight="800" fill="#0284c7">• 365 nm：胞子・樹脂劣化</text>
            <text x="270" y="160" font-size="8.0" font-weight="800" fill="#7c3aed">• 405 nm：キチン・フラビン</text>
            <text x="270" y="178" font-size="8.0" font-weight="800" fill="#15803d">• 染色不要・完全非破壊</text>
            <text x="270" y="196" font-size="8.0" font-weight="800" fill="#be123c">• 30秒ワンショット安全</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">中古レンズ購入時の「持ち込み検疫」で、他レンズへの胞子感染を水際阻止</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '自家蛍光 励起2波長', '365 / 405nm', 'Aspergillus胞子＋透明菌糸対応', '#7c3aed')}
            ${drawKpiBox(0, 88, 112, 74, '蛍光発光帯', '500〜580nm', '肉眼視認しやすい黄緑', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '照射タイマー', '30 秒限定', '常用消灯でUV無害', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, 'DB24/DB28との明確な違い', '#4c1d95', '#f5f3ff')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#4c1d95">• DB24(5000K)：観賞 / DB28(265)：殺菌</text>
            <text x="14" y="238" font-size="8.4" font-weight="900" fill="#7c3aed">• DB135(365/405)：初期カビ蛍光検疫</text>
          </g>
        `,
        cards: [
          { label: '2025年NDT光学', line1: '365 nm UV-A＋405 nmバイオレット', line2: '迷光カット・ウッドガラスフィルタ付' },
          { label: '物理的メリット', line1: '透明な初期菌糸のキチン/FADを発光', line2: 'DB127暗視野パネル直上で超高視認' },
          { label: 'カメラを守る意味', line1: '中古オールドレンズ入庫前の完全検疫', line2: '30秒限定点灯で接着剤UV負荷ゼロ' },
        ],
      });

    case 'db_fumed_silica_vip_panel':
      return wrapDryboxHdSvg({
        badge: 'DB136',
        stepTag: 'VIP λ=0.004 W/mK',
        title: 'フュームドシリカ芯 真空断熱パネル（VIP・≤10 Pa・50年寿命）',
        analogy: '魔法瓶と同じ「真空の板」で天井・床の熱出入りを極限遮断し、エアコン急変結露をゼロに',
        accent: '#475569',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: VIP Structure & Thermal Conductivity Comparison Bar Chart -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">真空断熱パネル（VIP）内部断面 ＆ 熱伝導率 λ（低いほど超断熱）比較</text>
            <!-- Top: VIP Cross-Section Schematic -->
            <rect x="20" y="34" width="384" height="72" rx="8" fill="url(#db136-steel)" stroke="#475569" stroke-width="1.8"/>
            <rect x="32" y="44" width="360" height="52" rx="4" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="5 3"/>
            <text x="212" y="64" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0f172a">無機不燃 フュームドシリカ多孔芯材（内部真空圧 ≤ 10 Pa）</text>
            <text x="212" y="83" text-anchor="middle" font-size="8.0" font-weight="800" fill="#0369a1">気体分子の対流・熱伝導を完全消滅 ＋ 多層アルミ蒸着高ガスバリア包材</text>
            <!-- Bottom: Thermal Conductivity Comparison Bars -->
            <rect x="20" y="116" width="384" height="104" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
            <text x="212" y="134" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0f172a">熱伝導率 λ の圧倒的比較（短いほど断熱力が高い！）</text>
            <text x="32" y="155" font-size="8.2" font-weight="900" fill="#0284c7">VIP真空断熱 (DB136)</text>
            <rect x="174" y="145" width="24" height="13" rx="3" fill="#0284c7"/>
            <text x="206" y="155" font-size="8.6" font-weight="900" fill="#0284c7">0.004 W/m・K（10倍断熱！）</text>
            <text x="32" y="179" font-size="8.2" font-weight="800" fill="#059669">シリカエアロゲル (DB16)</text>
            <rect x="174" y="169" width="82" height="13" rx="3" fill="#10b981"/>
            <text x="264" y="179" font-size="8.2" font-weight="800" fill="#047857">0.015 W/m・K</text>
            <text x="32" y="203" font-size="8.2" font-weight="700" fill="#64748b">一般ウレタン発泡材</text>
            <rect x="174" y="193" width="166" height="13" rx="3" fill="#94a3b8"/>
            <text x="348" y="203" font-size="8.2" font-weight="700" fill="#475569">0.032+</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">万一数十年後に真空が抜けても多孔シリカが 0.020 W/m・K を維持する安全設計</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '中心熱伝導率（ISO 8301）', '0.004 W/mK', '発泡ウレタンの8〜10倍の超断熱', '#0284c7')}
            ${drawKpiBox(0, 88, 112, 74, '内部真空度', '≤ 10 Pa', '対流伝熱を遮断', '#475569')}
            ${drawKpiBox(122, 88, 112, 74, '設計寿命', '50 年級', '不燃A級・無フロン', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, '3層ハイブリッド熱遮蔽の完成', '#1e293b', '#f8fafc')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#1e293b">• 天井/底面/背面：VIP(DB136) 0.004</text>
            <text x="14" y="238" font-size="8.4" font-weight="700" fill="#475569">• 側面：エアロゲル(DB16)＋PCM(DB17)</text>
          </g>
        `,
        cards: [
          { label: '魔法瓶コア技術', line1: '不燃フュームドシリカ芯＋≤10 Pa真空', line2: 'わずか8 mm厚で発泡断熱80 mm相当' },
          { label: '物理的メリット', line1: 'λ = 0.004 W/m・K の極限熱遮断', line2: '外気温15°C急変でも庫内露点割れ0' },
          { label: 'カメラを守る意味', line1: '庫内収納容積を削らず最高級断熱', line2: '冷暖房ON/OFF時の内部レンズ曇り防止' },
        ],
      });

    case 'db_graphene_oxide_vapor_membrane':
      return wrapDryboxHdSvg({
        badge: 'DB137',
        stepTag: '2026年 GOナノスリット',
        title: '100 nm未満 酸化グラフェン（GO）ナノスリット水蒸気選択透過膜',
        analogy: '水分子だけ高速道路のように通し、大切な窒素や酸素は1万倍の壁で通さない原子層ふるい',
        accent: '#0f172a',
        accentSoft: '#e2e8f0',
        body: `
          <!-- Left: 2D Stacked Graphene Oxide Nanoslit Selective Water Transport -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">2次元酸化グラフェン（GO）層間 0.9 nm ナノスリット選択分離原理</text>
            <!-- Chamber Side (Left: N2 + H2O) -->
            <rect x="18" y="42" width="112" height="168" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="74" y="64" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0c4a6e">庫内 N₂環境側</text>
            <!-- N2 molecules bouncing BACK! -->
            <circle cx="52" cy="96" r="13" fill="#475569"/>
            <text x="52" y="100" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">N₂</text>
            <path d="M 68 96 L 122 96 L 86 116" fill="none" stroke="#e11d48" stroke-width="2.2" marker-end="url(#db137-arrRed)"/>
            <text x="74" y="132" text-anchor="middle" font-size="7.8" font-weight="900" fill="#be123c">N₂ 漏洩ブロック！</text>
            <!-- H2O molecules entering nanoslits freely -->
            <circle cx="54" cy="166" r="11" fill="#0ea5e9"/>
            <text x="54" y="170" text-anchor="middle" font-size="7.8" font-weight="900" fill="#ffffff">H₂O</text>
            <!-- Center: Stacked 2D Graphene Oxide Nanosheets (<100 nm) -->
            <rect x="142" y="42" width="144" height="168" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8"/>
            <text x="214" y="62" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">GO積層膜（&lt;100 nm）</text>
            <!-- Horizontal 2D graphene oxide nanosheets with 0.9nm water path -->
            <rect x="156" y="76" width="52" height="8" rx="2" fill="#94a3b8"/>
            <rect x="220" y="76" width="52" height="8" rx="2" fill="#94a3b8"/>
            <rect x="176" y="102" width="76" height="8" rx="2" fill="#94a3b8"/>
            <rect x="156" y="128" width="52" height="8" rx="2" fill="#94a3b8"/>
            <rect x="220" y="128" width="52" height="8" rx="2" fill="#94a3b8"/>
            <rect x="176" y="154" width="76" height="8" rx="2" fill="#94a3b8"/>
            <!-- Fast unimpeded H2O zigzag through 0.9nm nanoslits -->
            <polyline points="124,166 164,166 164,142 214,142 214,116 264,116 264,92 316,92" fill="none" stroke="#38bdf8" stroke-width="3.2" marker-end="url(#db137-arrBlue)"/>
            <text x="214" y="196" text-anchor="middle" font-size="8.0" font-weight="900" fill="#38bdf8">0.9 nm 無摩擦水透過路</text>
            <!-- Outside Exhaust Side (Right: Pure H2O out, O2/VOC blocked!) -->
            <rect x="298" y="42" width="108" height="168" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.5"/>
            <text x="352" y="64" text-anchor="middle" font-size="9.0" font-weight="900" fill="#14532d">庫外排出側</text>
            <circle cx="352" cy="94" r="12" fill="#0ea5e9"/>
            <text x="352" y="98" text-anchor="middle" font-size="7.8" font-weight="900" fill="#ffffff">H₂O</text>
            <text x="352" y="120" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0284c7">水蒸気だけ高速排出</text>
            <rect x="308" y="142" width="88" height="54" rx="5" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="352" y="164" text-anchor="middle" font-size="8.0" font-weight="900" fill="#9f1239">外気 O₂ / VOC</text>
            <text x="352" y="182" text-anchor="middle" font-size="7.8" font-weight="800" fill="#be123c">逆拡散 1/10,000</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年10月Applied Thermal Eng.＆Langmuir論文実証のナノ流体分離技術</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'H₂O / N₂ 選択分離比', '&gt; 10,000', '窒素を逃がさず水蒸気だけ透過', '#0f172a')}
            ${drawKpiBox(0, 88, 112, 74, 'GO活性膜厚', '&lt; 100 nm', '原子層積層シート', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '耐熱上限', '80°C+', '劣化ゼロ長期安定', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'DB19 ePTFE呼吸弁との違い', '#1e293b', '#f8fafc')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#1e293b">• DB19 ePTFE：気圧差の呼吸・防水</text>
            <text x="14" y="238" font-size="8.4" font-weight="900" fill="#0284c7">• DB137 GO膜：N₂保持×水蒸気選択排出</text>
          </g>
        `,
        cards: [
          { label: '2026年2Dナノ膜', line1: '100 nm未満 積層酸化グラフェン膜', line2: '多孔PTFE支持体＋SUS316Lフランジ' },
          { label: 'ナノ流体物理', line1: '0.9 nm層間スリットで水分子だけ高速拡散', line2: 'H₂O/N₂分離係数1万倍超の超高選択性' },
          { label: 'カメラを守る意味', line1: '高価なN₂パージガスを逃がさず除湿', line2: '外気O₂・VOCの逆拡散も極限遮断' },
        ],
      });

    case 'db_mof_hydrogel_blackout_buffer':
      return wrapDryboxHdSvg({
        badge: 'DB138',
        stepTag: '2026年 4.1g/g・30日',
        title: '階層多孔MOF-303／ハイドロゲル 無電源30日停電調湿カセット',
        analogy: '大地震で1ヶ月停電しても電気ゼロで自重の4倍の湿気を吸い吐き調整する2026年スポンジゲル',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          <!-- Left: 30-Day Blackout Curve + MOF-303 Hydrogel 4.1 g/g Capacity -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">災害長期停電（0 W・30日間）での庫内RH維持曲線 ＆ 構造図</text>
            <!-- Chart Area -->
            <rect x="28" y="36" width="376" height="122" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <!-- Safe Camera Zone 35-50% RH green band -->
            <rect x="64" y="88" width="326" height="44" fill="#dcfce7" fill-opacity="0.72"/>
            <text x="384" y="102" text-anchor="end" font-size="7.6" font-weight="900" fill="#15803d">安全保存域 38〜48% RH</text>
            <!-- Axes -->
            <line x1="64" y1="46" x2="64" y2="146" stroke="#334155" stroke-width="1.4"/>
            <line x1="64" y1="146" x2="390" y2="146" stroke="#334155" stroke-width="1.4"/>
            <text x="58" y="56" text-anchor="end" font-size="7.6" font-weight="800" fill="#e11d48">80%</text>
            <text x="58" y="112" text-anchor="end" font-size="7.6" font-weight="900" fill="#059669">40%</text>
            <text x="228" y="156" text-anchor="middle" font-size="7.6" font-weight="800" fill="#475569">停電経過日数：Day 0 ──── Day 10 ──── Day 20 ──── Day 30</text>
            <!-- Red curve: No buffer / ordinary silica gel rising quickly -->
            <path d="M 64 114 Q 140 78 240 60 T 386 52" fill="none" stroke="#e11d48" stroke-width="2.4" stroke-dasharray="5 3"/>
            <text x="194" y="60" font-size="7.8" font-weight="900" fill="#be123c">一般庫：5日でカビ危険域(&gt;65%)</text>
            <!-- Emerald curve: MOF-303 Hydrogel staying flat inside 38-48% for 30 days! -->
            <path d="M 64 114 Q 180 110 290 104 T 386 96" fill="none" stroke="#059669" stroke-width="3.2"/>
            <text x="256" y="126" font-size="8.2" font-weight="900" fill="#065f46">DB138 MOF-303ハイドロゲル：30日安定！</text>
            <!-- Bottom Cassette Layer Diagram -->
            <rect x="28" y="168" width="376" height="48" rx="7" fill="#ecfdf5" stroke="#059669" stroke-width="1.4"/>
            <text x="216" y="187" text-anchor="middle" font-size="8.8" font-weight="900" fill="#065f46">階層多孔MOF-303（35–45%急峻ステップ応答）× 親水ポリマーゲル（4.1 g/g）</text>
            <text x="216" y="205" text-anchor="middle" font-size="8.0" font-weight="700" fill="#047857">疎水性ePTFE蒸気透過ベールで完全封止（潮解液漏れ・機材接触ゼロ）</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年5月Adv. Science＆11月ACS Nano最新論文の超大容量調湿モノリス</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '最大水分緩衝容量', '3.5〜4.1 g/g', '従来シリカゲル(0.3g/g)の10倍超', '#059669')}
            ${drawKpiBox(0, 88, 112, 74, '停電自律保持', '30 日以上', '完全0 Wパッシブ', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '液漏れリスク', '完全 0%', 'ePTFE蒸気膜封止', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'DB35能動ローターとの役割分担', '#065f46', '#ecfdf5')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#065f46">• DB35 Zr-MOF：通電時の能動連続除湿</text>
            <text x="14" y="238" font-size="8.4" font-weight="900" fill="#047857">• DB138 ゲル：災害長期停電の最終砦</text>
          </g>
        `,
        cards: [
          { label: '2026年最先端素材', line1: '階層多孔MOF-303×親水ハイドロゲル', line2: 'ePTFE疎水蒸気ベールで液漏れ完全0' },
          { label: '物理的メリット', line1: '自重の4.1倍もの圧倒的吸放湿バッファ', line2: '高湿時は吸湿・過乾燥時は穏やか放湿' },
          { label: 'カメラを守る意味', line1: '大震災の1ヶ月停電でも40% RH帯を死守', line2: 'DB18仕切り下面へスマートスライド装着' },
        ],
      });

    case 'db_far_uvc_222nm_krcl_emitter':
      return wrapDryboxHdSvg({
        badge: 'DB139',
        stepTag: '222nm KrCl 人体安全',
        title: '光学フィルター付き人体安全 Far-UVC 222 nm ドア除菌カーテン',
        analogy: '扉を開けた瞬間に飛び込むカビ胞子を、目にも皮膚にも安全な222 nm遠紫外線で空中撃墜',
        accent: '#06b6d4',
        accentSoft: '#cffafe',
        body: `
          <!-- Left: Penetration Depth Comparison (222nm Safe vs 254/265nm Deep) + Door Spore Curtain -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">Far-UVC 222 nm が「カビ胞子には致命的・人間には安全」な物理的理由</text>
            <!-- Left Half: Human Eye Tear Layer / Dead Skin Stratum Corneum (>10um thick) -->
            <rect x="18" y="36" width="194" height="174" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="115" y="56" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0e7490">👤 人間の目・皮膚（安全！）</text>
            <!-- Top Protective Dead Layer (Tear film / Stratum corneum) -->
            <rect x="34" y="96" width="162" height="32" rx="3" fill="#bae6fd" stroke="#0284c7"/>
            <text x="115" y="116" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0c4a6e">涙液層・死んだ角質（&gt;10 μm）</text>
            <!-- Living Cells below -->
            <rect x="34" y="128" width="162" height="44" rx="3" fill="#fef3c7" stroke="#d97706"/>
            <text x="115" y="154" text-anchor="middle" font-size="8.2" font-weight="800" fill="#92400e">生きた細胞（到達ゼロ！）</text>
            <!-- 222nm photon stopping inside top 5um -->
            <line x1="115" y1="64" x2="115" y2="104" stroke="#06b6d4" stroke-width="3.4" marker-end="url(#db139-arrBlue)"/>
            <text x="115" y="194" text-anchor="middle" font-size="8.0" font-weight="900" fill="#16a34a">浸透 &lt;5 μm → 扉開放中も安全照射</text>
            <!-- Right Half: Tiny Airborne Fungal Spore (2-5um -> DNA & Repair Enzymes Destroyed!) -->
            <rect x="220" y="36" width="186" height="174" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5"/>
            <text x="313" y="56" text-anchor="middle" font-size="9.2" font-weight="900" fill="#9f1239">🍄 浮遊カビ胞子（2〜5 μm）</text>
            <circle cx="313" cy="128" r="32" fill="#fda4af" stroke="#e11d48" stroke-width="1.8"/>
            <line x1="313" y1="66" x2="313" y2="152" stroke="#06b6d4" stroke-width="3.4" marker-end="url(#db139-arrBlue)"/>
            <text x="313" y="124" text-anchor="middle" font-size="8.4" font-weight="900" fill="#881337">DNA ＆ recA</text>
            <text x="313" y="139" text-anchor="middle" font-size="8.0" font-weight="900" fill="#9f1239">修復酵素破壊！</text>
            <text x="313" y="182" text-anchor="middle" font-size="8.0" font-weight="800" fill="#be123c">光回復（生き返り）を完全封殺</text>
            <text x="313" y="198" text-anchor="middle" font-size="7.8" font-weight="700" fill="#881337">効果オッズ比 1.38倍 (vs 254nm)</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2025–2026年Env. Sci. Technol.論文準拠：230nm超を遮る光学フィルター付</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'フィルタードFar-UVC波長', '222 ± 2 nm', 'KrClエキシマ＋多層光学フィルタ', '#06b6d4')}
            ${drawKpiBox(0, 88, 112, 74, '人体浸透深さ', '&lt; 5 μm', '角膜・基底層に届かず', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '対254nm比', '1.38 倍', '修復酵素recAも破壊', '#7c3aed')}
            ${drawCompareFrame(0, 172, 234, 82, 'DB28 (265nm) との二重殺菌', '#0e7490', '#ecfeff')}
            <text x="14" y="216" font-size="8.4" font-weight="800" fill="#0e7490">• DB28(265nm)：閉扉中ダクト深部殺菌</text>
            <text x="14" y="238" font-size="8.4" font-weight="900" fill="#0284c7">• DB139(222nm)：開扉中ドア光の関所</text>
          </g>
        `,
        cards: [
          { label: '2026年Far-UVC', line1: '222 nm KrClエキシマ平面発光管', line2: '有害230nm超を遮断する光学フィルタ' },
          { label: '物理的メリット', line1: '人間の涙液層で止まり胞子だけ貫通破壊', line2: 'DNA修復酵素まで壊し生き返り阻止' },
          { label: 'カメラを守る意味', line1: '扉を開けた無防備タイムに胞子を撃墜', line2: 'DB141エアカーテンと連動し完全防カビ' },
        ],
      });

    case 'db_vislight_gc3n4_antimold_coat':
      return wrapDryboxHdSvg({
        badge: 'DB140',
        stepTag: '2026年 g-C₃N₄ 可視光',
        title: '金属フリー可視光応答 g-C₃N₄ 光触媒防カビナノ被膜（棚陰対応）',
        analogy: '紫外線が当たらない棚の裏側でも、普段の白いLED光だけでカビの定着をブロックする2026年ナノ膜',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: Bandgap 2.7 eV Visible Light Photocatalysis vs TiO2 3.2 eV UV-Only -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">可視光駆動 g-C₃N₄（E_g = 2.7 eV）棚下面セルフ防カビ機構</text>
            <!-- Left: Bandgap Comparison -->
            <rect x="18" y="38" width="186" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
            <text x="111" y="57" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0f172a">バンドギャップ比較</text>
            <!-- TiO2 (3.2 eV - UV only) -->
            <rect x="34" y="72" width="64" height="18" rx="3" fill="#e2e8f0" stroke="#64748b"/>
            <rect x="34" y="152" width="64" height="18" rx="3" fill="#94a3b8"/>
            <line x1="66" y1="150" x2="66" y2="94" stroke="#7c3aed" stroke-width="2.4" marker-end="url(#db140-arrPurple)"/>
            <text x="66" y="126" text-anchor="middle" font-size="7.6" font-weight="900" fill="#6d28d9">3.2 eV</text>
            <text x="66" y="186" text-anchor="middle" font-size="7.8" font-weight="800" fill="#475569">TiO₂ (DB29)</text>
            <text x="66" y="198" text-anchor="middle" font-size="7.2" font-weight="700" fill="#7c3aed">UV専用</text>
            <!-- g-C3N4 (2.7 eV - Visible Light 400-460nm!) -->
            <rect x="118" y="92" width="68" height="18" rx="3" fill="#fef3c7" stroke="#d97706"/>
            <rect x="118" y="152" width="68" height="18" rx="3" fill="#f59e0b"/>
            <line x1="152" y1="150" x2="152" y2="114" stroke="#d97706" stroke-width="2.6" marker-end="url(#db140-arrAmber)"/>
            <text x="152" y="135" text-anchor="middle" font-size="7.8" font-weight="900" fill="#b45309">2.7 eV</text>
            <text x="152" y="186" text-anchor="middle" font-size="8.0" font-weight="900" fill="#92400e">g-C₃N₄</text>
            <text x="152" y="198" text-anchor="middle" font-size="7.2" font-weight="800" fill="#16a34a">白色LED駆動!</text>
            <!-- Right: Surface-Bound ROS under Shelf Underside -->
            <rect x="216" y="38" width="190" height="170" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
            <text x="311" y="58" text-anchor="middle" font-size="9.0" font-weight="900" fill="#78350f">棚下面 表面局所ROS防カビ</text>
            <rect x="234" y="72" width="154" height="18" rx="3" fill="url(#db140-steel)" stroke="#475569"/>
            <text x="311" y="84" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0f172a">スチール棚板 DB22</text>
            <rect x="234" y="90" width="154" height="12" fill="#f59e0b"/>
            <text x="311" y="99" text-anchor="middle" font-size="7.0" font-weight="900" fill="#ffffff">g-C₃N₄ 2Dナノ被膜</text>
            <!-- Visible light arrows from Ra97 LED -->
            <line x1="264" y1="146" x2="264" y2="106" stroke="#eab308" stroke-width="2.2" marker-end="url(#db140-arrAmber)"/>
            <line x1="358" y1="146" x2="358" y2="106" stroke="#eab308" stroke-width="2.2" marker-end="url(#db140-arrAmber)"/>
            <text x="311" y="130" text-anchor="middle" font-size="8.6" font-weight="900" fill="#dc2626">表面数nm局所 •O₂⁻</text>
            <text x="311" y="164" text-anchor="middle" font-size="8.0" font-weight="800" fill="#15803d">付着カビ胞子の膜を酸化分解</text>
            <text x="311" y="182" text-anchor="middle" font-size="7.6" font-weight="700" fill="#92400e">気相拡散なし・カメラゴム無害</text>
            <text x="311" y="198" text-anchor="middle" font-size="7.6" font-weight="800" fill="#0284c7">重金属フリー（CとNの2D骨格）</text>
            <text x="212" y="236" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">2026年1月＆10月JKSUS総説の次世代メタルフリー抗菌光触媒を全3段へ採用</text>
          </g>
          <!-- Right: KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '可視光励起 バンドギャップ', '2.7 eV', '400〜460 nm 白色LEDで稼働', '#d97706')}
            ${drawKpiBox(0, 88, 112, 74, '重金属含有', '完全 0%', 'C・N有機2D骨格', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '作用距離', '表面数nm', 'カメラへの影響0', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, '庫内死角ゼロの抗菌体制', '#78350f', '#fffbeb')}
            ${drawPill(12, 204, 210, 'g-C₃N₄：紫外線不要で棚陰も防カビ', true)}
            ${drawPill(12, 229, 210, '旧TiO₂単体：影の棚下では働かない', false)}
          </g>
        `,
        cards: [
          { label: '2026年可視光触媒', line1: '金属フリー グラファイト状窒化炭素', line2: 'バンドギャップ2.7 eV（≤460nm応答）' },
          { label: '物理的メリット', line1: 'DB24白色LEDの光だけで表面•O₂⁻生成', line2: '重金属溶出・気相オゾン放出ゼロ' },
          { label: 'カメラを守る意味', line1: 'UVが届かない棚下面のカビ定着を阻止', line2: 'DB29ダクトTiO₂と合わせ死角ゼロ' },
        ],
      });

    default:
      return null;
  }
}
