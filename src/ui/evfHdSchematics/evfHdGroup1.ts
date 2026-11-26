import { PartExplanation } from '../../assemblies/types';
import {
  drawCallout,
  drawHumanEye,
  drawLoupe,
  drawRaindrop,
  drawStatusPill,
  drawSunIcon,
  wrapEvfHdSvg,
} from './shared';

/**
 * Ultra-HD 720x470 Beginner-Friendly Technical Infographics — Group 1 (E01–E18)
 */
export function renderEvfHdGroup1(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // =========================================================================
    // E01. エルゴノミック遮光アイカップ ＆ クイックロック基部
    // =========================================================================
    case 'evf_eyecup':
      return wrapEvfHdSvg({
        badge: 'E01',
        title: 'エルゴノミック遮光アイカップ ＆ クイックロック基部',
        analogy: '強い日差しを遮る「専用サンバイザー＆柔らかクッション」',
        accent: '#0f172a',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Ambient sunlight top-left blocked by sun visor brow -->
          ${drawSunIcon(78, 108, 12)}
          <line x1="94" y1="118" x2="188" y2="148" stroke="#f59e0b" stroke-width="2.4" stroke-dasharray="5 3" marker-end="url(#e01-arrAmber)"/>
          <line x1="188" y1="148" x2="140" y2="112" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#e01-arrRed)"/>
          <text x="148" y="96" text-anchor="middle" font-size="10.5" font-weight="800" fill="#dc2626">横からの太陽光をブロック！</text>

          <!-- Human eye with eyeglasses symbol at 25mm high eyepoint -->
          ${drawHumanEye(82, 224, 1.0, true, '撮影者の目')}
          <!-- Eyeglasses lens icon between eye and eyecup -->
          <rect x="138" y="188" width="9" height="70" rx="4" fill="url(#e01-glass)" stroke="#0284c7" stroke-width="1.5"/>
          <text x="142" y="180" text-anchor="middle" font-size="10" font-weight="800" fill="#0369a1">メガネOK</text>

          <!-- 25mm high-eyepoint dimension arrow -->
          <line x1="126" y1="322" x2="294" y2="322" stroke="#0284c7" stroke-width="1.8" marker-start="url(#e01-arrBlue)" marker-end="url(#e01-arrBlue)"/>
          <rect x="164" y="311" width="94" height="20" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2"/>
          <text x="211" y="325" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0369a1">余裕の約25mm</text>

          <!-- Sculpted rubber eyecup cutaway (top & bottom walls + upper sun-visor brow + stepped baffles) -->
          <path d="M 188 148 Q 204 128 242 134 L 310 134 L 310 162 L 244 162 L 236 170 L 222 170 L 214 178 L 194 178 Z" fill="url(#e01-rubber)" stroke="#0f172a" stroke-width="1.6" filter="url(#e01-sh)"/>
          <path d="M 194 270 L 214 270 L 222 278 L 236 278 L 244 286 L 310 286 L 310 310 L 236 310 Q 202 310 192 288 Z" fill="url(#e01-rubber)" stroke="#0f172a" stroke-width="1.6" filter="url(#e01-sh)"/>

          <!-- Quick-lock rigid bayonet base plate -->
          <rect x="308" y="130" width="24" height="184" rx="4" fill="url(#e01-mg)" stroke="#0f172a" stroke-width="1.5"/>
          <rect x="314" y="142" width="12" height="160" rx="2" fill="#e0f2fe" opacity="0.22"/>

          <!-- Eyepiece optical window & 41° FoV cone -->
          <rect x="334" y="164" width="14" height="118" rx="3" fill="url(#e01-glass)" stroke="#0284c7" stroke-width="1.6"/>
          <polygon points="122,224 334,172 334,274" fill="#38bdf8" fill-opacity="0.14"/>
          <line x1="122" y1="224" x2="334" y2="174" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="4 3"/>
          <line x1="122" y1="224" x2="334" y2="272" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="4 3"/>
          <text x="274" y="228" text-anchor="middle" font-size="12" font-weight="900" fill="#0369a1">広い視野 41°</text>

          <!-- Right-side detail panel: Ergonomic benefits & callouts -->
          <rect x="404" y="88" width="284" height="238" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="420" y="112" font-size="12.5" font-weight="800" fill="#0f172a">構造のポイント（断面解説）</text>
          ${drawCallout(228, 146, 434, 142, 1, '上部サンバイザー庇（ひさし）', '真上からの強い日差しをカット', '#ea580c')}
          ${drawCallout(230, 174, 434, 188, 2, '内面の段々（迷光バッフル）', '斜め光を暗黒の段差で吸収', '#334155')}
          ${drawCallout(202, 286, 434, 234, 3, '低硬度フルオロシリコンゴム', '皮脂に強く・眼鏡を傷つけない', '#0284c7')}
          ${drawCallout(320, 290, 434, 280, 4, 'クイックロック基部（2点爪）', 'カバンで外れずワンタッチ交換', '#059669')}
        `,
        cards: [
          { label: 'なにをする部品？', line1: '目の周りをすっぽり覆い、', line2: '外光を遮って画面を見やすくする' },
          { label: 'スゴい工夫・秘密', line1: '内側の段差＋柔らかいシリコンで', line2: '約25mm離れても四隅までくっきり' },
          { label: '撮影でどう嬉しい？', line1: '真夏の晴天やメガネ装着時でも', line2: '暗室のように鮮やかにピント確認！' },
        ],
      });

    // =========================================================================
    // E02. アイカップ クイックリリース・ステンレス双葉ロック爪 ＆ 圧縮スプリング
    // =========================================================================
    case 'evf_eyecup_latch':
      return wrapEvfHdSvg({
        badge: 'E02',
        title: 'アイカップ クイックリリース・ステンレス双葉ロック爪',
        analogy: '左右から指でつまんで外す「スーツケースの安全バックル」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Front mechanical view of twin leaf lock claws + springs -->
          <rect x="28" y="84" width="320" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="188" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">正面から見た「左右対称ロック機構」</text>

          <!-- Stainless dovetail subframe -->
          <rect x="86" y="120" width="204" height="154" rx="14" fill="url(#e02-steel)" stroke="#475569" stroke-width="2" filter="url(#e02-sh)"/>
          <rect x="114" y="142" width="148" height="110" rx="9" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <text x="188" y="202" text-anchor="middle" font-size="12" font-weight="800" fill="#0369a1">接眼窓開口</text>

          <!-- Left & right stainless lock claws engaging notches -->
          <path d="M 60 176 L 94 176 L 106 196 L 94 216 L 60 216 Z" fill="url(#e02-steel)" stroke="#0f172a" stroke-width="1.8"/>
          <path d="M 316 176 L 282 176 L 270 196 L 282 216 L 316 216 Z" fill="url(#e02-steel)" stroke="#0f172a" stroke-width="1.8"/>
          <!-- Compression coil springs pushing claws outward -->
          <path d="M 96 196 L 100 189 L 104 203 L 108 189 L 112 203" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M 280 196 L 276 189 L 272 203 L 268 189 L 264 203" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>

          <!-- Finger pinch arrows -->
          <line x1="34" y1="196" x2="56" y2="196" stroke="#0284c7" stroke-width="2.8" marker-end="url(#e02-arrBlue)"/>
          <line x1="342" y1="196" x2="320" y2="196" stroke="#0284c7" stroke-width="2.8" marker-end="url(#e02-arrBlue)"/>
          <text x="58" y="236" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0284c7">指で押す→</text>
          <text x="318" y="236" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0284c7">←指で押す</text>

          <!-- Upward slide release arrow -->
          <line x1="188" y1="296" x2="188" y2="278" stroke="#059669" stroke-width="2.6" marker-end="url(#e02-arrGreen)"/>
          <text x="188" y="316" text-anchor="middle" font-size="11" font-weight="800" fill="#059669">両方押した時だけ上にスライド脱着</text>

          <!-- Right: Locked vs Unlocked comparison -->
          <rect x="366" y="84" width="326" height="118" rx="11" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(380, 94, 178, 'バッグで片側が擦れても…', false)}
          <text x="382" y="142" font-size="12" font-weight="800" fill="#881337">🔒 保持力 18N（約1.8kg）超でロック！</text>
          <text x="382" y="164" font-size="11" font-weight="600" fill="#475569">片側だけ引っ掛かっても反対側の爪と圧縮バネが</text>
          <text x="382" y="184" font-size="11" font-weight="600" fill="#475569">しっかり噛み合い、移動中の紛失を防止します。</text>

          <rect x="366" y="214" width="326" height="118" rx="11" fill="#f0fdf4" stroke="#86efac" stroke-width="1.3"/>
          ${drawStatusPill(380, 224, 196, '左右同時に押すと瞬時に交換', true)}
          <text x="382" y="272" font-size="12" font-weight="800" fill="#14532d">✨ 撮影現場で工具いらず 2秒交換！</text>
          <text x="382" y="294" font-size="11" font-weight="600" fill="#334155">標準カップ ↔ 屋外用の大型ディープ遮光カップを</text>
          <text x="382" y="314" font-size="11" font-weight="600" fill="#334155">SUS304アリ溝レールに沿ってカチッと着脱。</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'アイカップを本体へ固定し、', line2: '必要な時だけ素早く外すロック金具' },
          { label: 'スゴい工夫・秘密', line1: '左右2点のSUS爪＋圧縮バネで', line2: '18N超の保持力と2秒交換を両立' },
          { label: '撮影でどう嬉しい？', line1: 'カメラバッグ出し入れで紛失せず', line2: '深型アイカップへ現場で即交換可！' },
        ],
      });

    // =========================================================================
    // E03. 防曇密閉ダブルガラス接眼保護窓（フッ素コート）
    // =========================================================================
    case 'evf_antifog':
      return wrapEvfHdSvg({
        badge: 'E03',
        title: '防曇密閉ダブルガラス接眼保護窓（フッ素コート）',
        analogy: '真冬の雪山でも絶対に曇らない「家のペアガラス二重窓」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left side: Cold outside (-10°C) -->
          <rect x="24" y="84" width="150" height="246" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.2"/>
          <text x="99" y="108" text-anchor="middle" font-size="12.5" font-weight="800" fill="#1d4ed8">❄️ 外気（−10℃）</text>
          <text x="99" y="126" text-anchor="middle" font-size="10.5" font-weight="700" fill="#3b82f6">雪山・雨・まつ毛の湿気</text>
          ${drawHumanEye(88, 206, 0.92, true, '目の湯気・皮脂')}
          ${drawRaindrop(150, 152, 0.95)}
          ${drawRaindrop(156, 260, 0.8)}
          <text x="148" y="182" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">コロコロ弾く!</text>

          <!-- Center: Double-pane airtight optical glass cross-section -->
          <!-- Fluorine coating outer line -->
          <rect x="190" y="102" width="5" height="212" rx="2" fill="#06b6d4"/>
          <!-- Outer optical glass pane -->
          <rect x="195" y="102" width="26" height="212" rx="3" fill="url(#e03-glass)" stroke="#0284c7" stroke-width="1.8" filter="url(#e03-sh)"/>
          <!-- Hermetic EPDM spacers top & bottom -->
          <rect x="221" y="104" width="38" height="20" rx="3" fill="url(#e03-rubber)" stroke="#0f172a" stroke-width="1.3"/>
          <rect x="221" y="292" width="38" height="20" rx="3" fill="url(#e03-rubber)" stroke="#0f172a" stroke-width="1.3"/>
          <!-- Dry air thermal buffer chamber -->
          <rect x="221" y="124" width="38" height="168" fill="#fefce8" fill-opacity="0.85" stroke="#eab308" stroke-dasharray="4 3"/>
          <text x="240" y="196" text-anchor="middle" font-size="11" font-weight="800" fill="#a16207">乾燥</text>
          <text x="240" y="212" text-anchor="middle" font-size="11" font-weight="800" fill="#a16207">空気層</text>
          <text x="240" y="232" text-anchor="middle" font-size="9.5" font-weight="700" fill="#854d0e">(断熱)</text>
          <!-- Inner optical glass pane -->
          <rect x="259" y="102" width="26" height="212" rx="3" fill="url(#e03-glass)" stroke="#0284c7" stroke-width="1.8" filter="url(#e03-sh)"/>

          <!-- Warm EVF interior (+30°C) -->
          <rect x="302" y="84" width="136" height="246" rx="10" fill="#fff7ed" stroke="#fdba74" stroke-width="1.2"/>
          <text x="370" y="108" text-anchor="middle" font-size="12.5" font-weight="800" fill="#c2410c">🔥 EVF内部 (+30℃)</text>
          <text x="370" y="126" text-anchor="middle" font-size="10.5" font-weight="700" fill="#ea580c">乾燥密閉・曇りゼロ</text>

          <!-- Visible + 850nm IR rays passing cleanly through both panes -->
          <line x1="392" y1="186" x2="136" y2="186" stroke="#0284c7" stroke-width="2.6" marker-end="url(#e03-arrBlue)"/>
          <text x="364" y="178" text-anchor="middle" font-size="10" font-weight="800" fill="#0369a1">可視光 400-700nm</text>
          <line x1="392" y1="224" x2="136" y2="224" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="5 3" marker-end="url(#e03-arrRed)"/>
          <text x="364" y="242" text-anchor="middle" font-size="10" font-weight="800" fill="#be123c">850nm 視線IRも透過</text>

          <!-- Right comparison panel: NG single glass vs OK double glass -->
          <rect x="454" y="84" width="238" height="116" rx="10" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(468, 92, 168, '1枚ガラスだと結露！', false)}
          <rect x="470" y="126" width="16" height="58" rx="2" fill="#94a3b8"/>
          <circle cx="496" cy="140" r="4" fill="#38bdf8"/>
          <circle cx="502" cy="156" r="5" fill="#38bdf8"/>
          <circle cx="495" cy="172" r="4" fill="#38bdf8"/>
          <text x="516" y="148" font-size="11" font-weight="700" fill="#881337">冷気が直接伝わり</text>
          <text x="516" y="166" font-size="11" font-weight="700" fill="#881337">内側が真っ白に曇る</text>

          <rect x="454" y="212" width="238" height="118" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.3"/>
          ${drawStatusPill(468, 220, 184, '2重ガラス＋フッ素膜', true)}
          <text x="468" y="266" font-size="11" font-weight="700" fill="#14532d">① 乾燥空気層が冷気を断熱</text>
          <text x="468" y="286" font-size="11" font-weight="700" fill="#14532d">② EPDMゴムで湿気を完全封止</text>
          <text x="468" y="306" font-size="11" font-weight="700" fill="#14532d">③ 外面フッ素コートで指紋一拭き</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'レンズ室を密閉して守り、', line2: '温度差による曇りを防ぐ2重窓' },
          { label: 'スゴい工夫・秘密', line1: '乾燥空気の断熱層＋撥水フッ素膜', line2: '可視光も850nm赤外線もロス極小' },
          { label: '撮影でどう嬉しい？', line1: '寒い雪山から暖かい室内へ入っても', line2: 'ファインダーが曇らずすぐ撮れる！' },
        ],
      });

    // =========================================================================
    // E04. ToF赤外線アイセンサー ＆ 環境光輝度センサー
    // =========================================================================
    case 'evf_eye_sensor':
      return wrapEvfHdSvg({
        badge: 'E04',
        title: 'ToF赤外線アイセンサー ＆ 環境光輝度センサー',
        analogy: '顔を近づけると瞬時に点く「超高速な自動ドアの赤外線センサー」',
        accent: '#e11d48',
        accentSoft: '#fff1f2',
        body: `
          <!-- Left: Eye approaching EVF triggering 940nm ToF pulse -->
          ${drawHumanEye(92, 198, 1.0, true, '顔を近づける')}
          <!-- EVF Rear Panel + Eye Sensor Module -->
          <rect x="242" y="100" width="44" height="196" rx="8" fill="url(#e04-mg)" stroke="#0f172a" stroke-width="1.6" filter="url(#e04-sh)"/>
          <text x="264" y="142" text-anchor="middle" font-size="10.5" font-weight="800" fill="#e2e8f0">EVF</text>
          <!-- 940nm VCSEL & SPAD sensor window on lower bezel -->
          <rect x="234" y="220" width="18" height="44" rx="4" fill="#4c0519" stroke="#f43f5e" stroke-width="1.8"/>
          <circle cx="243" cy="233" r="4.5" fill="#fb7185"/>
          <circle cx="243" cy="251" r="4.5" fill="#38bdf8"/>

          <!-- Outgoing 940nm IR laser pulse & reflected return pulse -->
          <line x1="232" y1="231" x2="128" y2="210" stroke="#e11d48" stroke-width="2.4" stroke-dasharray="5 3" marker-end="url(#e04-arrRed)"/>
          <line x1="128" y1="218" x2="232" y2="251" stroke="#0284c7" stroke-width="2.4" marker-end="url(#e04-arrBlue)"/>
          <rect x="132" y="160" width="96" height="22" rx="11" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.2"/>
          <text x="180" y="175" text-anchor="middle" font-size="10.5" font-weight="800" fill="#be123c">940nm 光を往復</text>
          <text x="176" y="266" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">往復時間で距離判定</text>

          <!-- Center-Right: Instant Auto-Switch State Diagram (<40ms) -->
          <rect x="316" y="88" width="372" height="114" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>
          <text x="334" y="110" font-size="12" font-weight="800" fill="#0f172a">⚡ 応答速度 0.04秒（40ms）未満の自動切替！</text>
          <!-- LCD OFF -> EVF ON visual boxes -->
          <rect x="334" y="124" width="136" height="62" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
          <text x="402" y="150" text-anchor="middle" font-size="11.5" font-weight="800" fill="#94a3b8">背面液晶モニター</text>
          <rect x="368" y="158" width="68" height="20" rx="10" fill="#475569"/>
          <text x="402" y="172" text-anchor="middle" font-size="10.5" font-weight="800" fill="#e2e8f0">自動で OFF</text>

          <line x1="478" y1="155" x2="524" y2="155" stroke="#059669" stroke-width="3" marker-end="url(#e04-arrGreen)"/>
          <text x="501" y="144" text-anchor="middle" font-size="10" font-weight="800" fill="#059669">&lt;40ms</text>

          <rect x="534" y="124" width="138" height="62" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <rect x="542" y="132" width="122" height="24" rx="4" fill="url(#e04-oled)"/>
          <text x="603" y="148" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">EVF 画面ON!</text>
          <rect x="568" y="160" width="70" height="20" rx="10" fill="#10b981"/>
          <text x="603" y="174" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">瞬時に点灯</text>

          <!-- Bottom-Right: Wavelength separation bar (850nm vs 940nm) + ALS 19-step brightness -->
          <rect x="316" y="214" width="372" height="118" rx="11" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>
          <text x="334" y="236" font-size="11.8" font-weight="800" fill="#92400e">🌈 なぜ「940nm」？ 視線AF（850nm）と喧嘩しないため！</text>
          <!-- Wavelength bar -->
          <rect x="334" y="250" width="110" height="22" rx="4" fill="url(#e04-oled)"/>
          <text x="389" y="265" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">可視光 400–700nm</text>
          <rect x="454" y="250" width="102" height="22" rx="4" fill="#fb7185"/>
          <text x="505" y="265" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">850nm 視線AF</text>
          <rect x="566" y="250" width="108" height="22" rx="4" fill="#9f1239"/>
          <text x="620" y="265" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">940nm アイセンサ</text>
          <text x="334" y="294" font-size="10.8" font-weight="700" fill="#78350f">☀️ 環境光センサーも内蔵：0.05〜120,000 lux を測り19段階で自動調光</text>
          <text x="334" y="314" font-size="10.5" font-weight="600" fill="#92400e">※ 目に見えない赤外線なので眩しくなく、バッテリー節約にも大活躍</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '顔をファインダーに近づけた瞬間を', line2: '赤外線で検知し自動で画面を切替' },
          { label: 'スゴい工夫・秘密', line1: '940nm ToF測距で40ms未満応答！', line2: '850nm視線AFと波長分離し誤動作0' },
          { label: '撮影でどう嬉しい？', line1: '構えた瞬間にパッとEVFが点灯し', line2: 'シャッターチャンスも電池も逃さない' },
        ],
      });

    // =========================================================================
    // E05. 視線入力AF用 850nm赤外線リングLEDアレイ（8灯）
    // =========================================================================
    case 'evf_ir_leds':
      return wrapEvfHdSvg({
        badge: 'E05',
        title: '視線入力AF用 850nm赤外線リングLEDアレイ（8灯）',
        analogy: '目に見えない光で瞳にキラキラ目印を作る「8灯の赤外線リングライト」',
        accent: '#db2777',
        accentSoft: '#fdf2f8',
        body: `
          <!-- Left: Front view of the 8-LED ring PCB (Inner bare-eye + Outer glasses-friendly) -->
          <rect x="26" y="84" width="268" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="160" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">接眼レンズ外周の 8灯リング配置</text>

          <!-- Circular emerald ring PCB -->
          <circle cx="160" cy="206" r="82" fill="url(#e05-pcb)" stroke="#064e3b" stroke-width="2" filter="url(#e05-sh)"/>
          <circle cx="160" cy="206" r="50" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
          <text x="160" y="203" text-anchor="middle" font-size="11" font-weight="800" fill="#0369a1">接眼開口</text>
          <text x="160" y="218" text-anchor="middle" font-size="9.5" font-weight="700" fill="#64748b">(裸眼/眼鏡両対応)</text>

          <!-- 8 glowing 850nm IR LEDs arranged around ring -->
          ${[0, 45, 90, 135, 180, 225, 270, 315]
            .map((deg, idx) => {
              const rad = (deg * Math.PI) / 180;
              const isOuter = idx % 2 === 1;
              const r = isOuter ? 69 : 60;
              const lx = (160 + Math.cos(rad) * r).toFixed(1);
              const ly = (206 + Math.sin(rad) * r).toFixed(1);
              return `
                <circle cx="${lx}" cy="${ly}" r="13" fill="url(#e05-irGlow)"/>
                <circle cx="${lx}" cy="${ly}" r="5.5" fill="${isOuter ? '#be123c' : '#f43f5e'}" stroke="#ffffff" stroke-width="1.4"/>
              `;
            })
            .join('')}
          <text x="160" y="314" text-anchor="middle" font-size="10.5" font-weight="800" fill="#be123c">内側4灯(裸眼) ＋ 外側4灯(メガネ対応)</text>

          <!-- Right: How corneal Purkinje reflection detects gaze direction -->
          <rect x="312" y="84" width="380" height="248" rx="11" fill="#fdf2f8" stroke="#f9a8d4" stroke-width="1.3"/>
          <text x="330" y="108" font-size="12.5" font-weight="800" fill="#831843">✨ なぜ8灯も必要？ 瞳の「キラリ（角膜輝点）」の秘密</text>

          <!-- Zoomed front pupil + Purkinje glints illustration -->
          <ellipse cx="418" cy="204" rx="74" ry="44" fill="#ffffff" stroke="#64748b" stroke-width="2"/>
          <circle cx="430" cy="204" r="30" fill="#78350f" stroke="#451a03" stroke-width="1.6"/>
          <circle cx="430" cy="204" r="14" fill="#0f172a"/>
          <!-- Purkinje IR reflection dots on cornea -->
          <circle cx="408" cy="186" r="4" fill="#fb7185" stroke="#ffffff" stroke-width="1.2"/>
          <circle cx="452" cy="186" r="4" fill="#fb7185" stroke="#ffffff" stroke-width="1.2"/>
          <circle cx="408" cy="222" r="4" fill="#fb7185" stroke="#ffffff" stroke-width="1.2"/>
          <circle cx="452" cy="222" r="4" fill="#fb7185" stroke="#ffffff" stroke-width="1.2"/>
          <!-- Vector arrow from glint center to shifted pupil center -->
          <line x1="430" y1="204" x2="444" y2="204" stroke="#facc15" stroke-width="2.5"/>
          <text x="418" y="266" text-anchor="middle" font-size="10.5" font-weight="800" fill="#831843">瞳の中心と「輝点」のズレで</text>
          <text x="418" y="282" text-anchor="middle" font-size="10.5" font-weight="800" fill="#be123c">見ている場所を0.3°精度で算出!</text>

          <!-- Callouts on far right -->
          <rect x="510" y="124" width="168" height="54" rx="8" fill="#ffffff" stroke="#f472b6" stroke-width="1.2"/>
          <text x="520" y="144" font-size="11" font-weight="800" fill="#9d174d">👓 メガネ反射を回避</text>
          <text x="520" y="162" font-size="10" font-weight="600" fill="#475569">8方向から照らし眼鏡の反射</text>
          <text x="520" y="174" font-size="10" font-weight="600" fill="#475569">と瞳の輝点をAIが見分けます</text>

          <rect x="510" y="188" width="168" height="54" rx="8" fill="#ffffff" stroke="#34d399" stroke-width="1.2"/>
          <text x="520" y="208" font-size="11" font-weight="800" fill="#065f46">🛡️ 目に完全無害</text>
          <text x="520" y="226" font-size="10" font-weight="600" fill="#475569">IEC 62471 免除グループ適合</text>
          <text x="520" y="238" font-size="10" font-weight="600" fill="#475569">瞬間パルス発光で安心＆省電力</text>

          <rect x="510" y="252" width="168" height="54" rx="8" fill="#ffffff" stroke="#38bdf8" stroke-width="1.2"/>
          <text x="520" y="272" font-size="11" font-weight="800" fill="#0369a1">👁️ 見え方は一切変わらず</text>
          <text x="520" y="290" font-size="10" font-weight="600" fill="#475569">850nmは人間には見えない光</text>
          <text x="520" y="302" font-size="10" font-weight="600" fill="#475569">なので眩しさゼロ！</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '瞳へ見えない赤外線を8方向から', line2: '当てて視線検出用の目印を作る' },
          { label: 'スゴい工夫・秘密', line1: '裸眼用＋眼鏡用の2ゾーン8灯で', line2: '眼鏡反射を避けIEC眼安全も完全適合' },
          { label: '撮影でどう嬉しい？', line1: 'メガネ越しでも視線をピタリ検知し', line2: '見るだけでピントが飛ぶ魔法を実現' },
        ],
      });

    // =========================================================================
    // E06. 45° ダイクロイック・ホットミラー（可視光透過／赤外線90°反射）
    // =========================================================================
    case 'evf_dichroic':
      return wrapEvfHdSvg({
        badge: 'E06',
        title: '45° ダイクロイック・ホットミラー（可視光透過／IR反射）',
        analogy: '見える光は素通り・赤外線だけ直角に曲げる「光の交通整理マジックミラー」',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        body: `
          <!-- Left: Human eye looking in -->
          ${drawHumanEye(84, 178, 0.98, true, '撮影者の目')}

          <!-- Right: OLED panel emitting colorful visible image -->
          <rect x="444" y="128" width="22" height="100" rx="4" fill="url(#e06-oled)" stroke="#1e293b" stroke-width="1.8" filter="url(#e06-sh)"/>
          <text x="455" y="118" text-anchor="middle" font-size="11" font-weight="800" fill="#1e293b">OLED映像</text>

          <!-- Center: 45-degree Dichroic Hot Mirror -->
          <line x1="210" y1="112" x2="338" y2="240" stroke="url(#e06-ar)" stroke-width="10" stroke-linecap="round" filter="url(#e06-sh)"/>
          <line x1="210" y1="112" x2="338" y2="240" stroke="#ffffff" stroke-width="1.6" stroke-dasharray="6 4" opacity="0.7"/>
          <!-- 45° angle arc indicator -->
          <path d="M 274 176 L 314 176 A 40 40 0 0 1 302 204 Z" fill="#7c3aed" fill-opacity="0.16" stroke="#7c3aed" stroke-width="1.2"/>
          <text x="330" y="216" font-size="11" font-weight="900" fill="#6d28d9">厳密 45.0°</text>

          <!-- Visible light (400-700nm) passing straight through from OLED to Eye (98.5%) -->
          <line x1="440" y1="164" x2="128" y2="164" stroke="#0284c7" stroke-width="3.2" marker-end="url(#e06-arrBlue)"/>
          <line x1="440" y1="178" x2="128" y2="178" stroke="#10b981" stroke-width="3.2" marker-end="url(#e06-arrGreen)"/>
          <line x1="440" y1="192" x2="128" y2="192" stroke="#f59e0b" stroke-width="3.2" marker-end="url(#e06-arrAmber)"/>
          <rect x="330" y="128" width="102" height="24" rx="12" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2"/>
          <text x="381" y="144" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">可視光 98.5%通過</text>

          <!-- 850nm IR gaze ray coming from Eye -> hitting 45° mirror -> reflecting 90° straight DOWN to gaze camera! -->
          <line x1="128" y1="176" x2="270" y2="176" stroke="#e11d48" stroke-width="3" stroke-dasharray="6 3"/>
          <line x1="274" y1="178" x2="274" y2="278" stroke="#e11d48" stroke-width="3.2" stroke-dasharray="6 3" marker-end="url(#e06-arrRed)"/>
          <rect x="134" y="218" width="128" height="24" rx="12" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.2"/>
          <text x="198" y="234" text-anchor="middle" font-size="10.5" font-weight="800" fill="#be123c">850nm IR 95%反射↓</text>

          <!-- Gaze IR camera below -->
          <rect x="200" y="286" width="148" height="44" rx="8" fill="url(#e06-pcb)" stroke="#064e3b" stroke-width="1.8" filter="url(#e06-sh)"/>
          <rect x="252" y="294" width="44" height="16" rx="3" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.3"/>
          <text x="274" y="324" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">直下の視線カメラ (E07)</text>

          <!-- Right microscope zoom loupe: 40+ alternating TiO2 / SiO2 interference layers -->
          ${drawLoupe(
            592,
            204,
            88,
            '40層超の光のナノ多層膜',
            `
              <rect x="500" y="110" width="184" height="188" fill="#f8fafc"/>
              ${Array.from({ length: 8 })
                .map((_, i) => {
                  const y = 158 + i * 11;
                  const isTi = i % 2 === 0;
                  return `<rect x="514" y="${y}" width="156" height="9" fill="${isTi ? '#8b5cf6' : '#bae6fd'}" opacity="${isTi ? 0.85 : 0.92}"/>`;
                })
                .join('')}
              <text x="592" y="148" text-anchor="middle" font-size="9.5" font-weight="800" fill="#4c1d95">TiO₂ / SiO₂ 交互多層</text>
              <text x="592" y="262" text-anchor="middle" font-size="9.2" font-weight="800" fill="#334155">光の干渉で色を選り分け</text>
            `,
            '#7c3aed',
            'e06-loupe'
          )}
        `,
        cards: [
          { label: 'なにをする部品？', line1: '目の映像と視線検出用の赤外線を', line2: '1枚のガラスで別々の方向へ分ける' },
          { label: 'スゴい工夫・秘密', line1: '40層超のナノ薄膜を45.0°に配置', line2: '可視光98.5%透過＆IR95%直角反射' },
          { label: '撮影でどう嬉しい？', line1: '視界が一切暗く色転びもせずに', line2: '視線入力AFカメラを真下に内蔵！' },
        ],
      });

    // =========================================================================
    // E07. 視線入力AF 30.7万画素 赤外CMOSセンサー ＆ リレー光学系
    // =========================================================================
    case 'evf_gaze_cam':
      return wrapEvfHdSvg({
        badge: 'E07',
        title: '視線入力AF 30.7万画素 赤外CMOSセンサー ＆ リレー光学系',
        analogy: 'あなたの瞳の動きを1秒間に何十回も追う「カメラの中の専用ミニ目線カメラ」',
        accent: '#6366f1',
        accentSoft: '#eef2ff',
        body: `
          <!-- Step 1: 850nm IR rays descending from 45° mirror into relay optics -->
          <rect x="28" y="88" width="212" height="242" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="134" y="108" text-anchor="middle" font-size="11.8" font-weight="800" fill="#312e81">① 瞳の赤外線像を結像</text>

          <!-- Descending IR rays -->
          <line x1="106" y1="118" x2="106" y2="162" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#e07-arrRed)"/>
          <line x1="162" y1="118" x2="162" y2="162" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#e07-arrRed)"/>
          <text x="134" y="144" text-anchor="middle" font-size="10" font-weight="800" fill="#be123c">850nm IR</text>

          <!-- 850nm BPF filter + Aspheric IR relay lens -->
          <rect x="86" y="166" width="96" height="12" rx="3" fill="#be123c" stroke="#881337" stroke-width="1.2"/>
          <text x="134" y="176" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">850nm 狭帯域BPF</text>
          <path d="M 92 188 Q 134 176 176 188 Q 134 206 92 188 Z" fill="url(#e07-glass)" stroke="#0284c7" stroke-width="1.6"/>
          <text x="134" y="212" text-anchor="middle" font-size="10" font-weight="700" fill="#0369a1">非球面IRリレーレンズ</text>

          <!-- Converging rays onto 307K NIR CMOS sensor -->
          <line x1="106" y1="196" x2="124" y2="254" stroke="#e11d48" stroke-width="2"/>
          <line x1="162" y1="196" x2="144" y2="254" stroke="#e11d48" stroke-width="2"/>

          <!-- 640x480 NIR CMOS package on emerald PCB -->
          <rect x="64" y="256" width="140" height="44" rx="7" fill="url(#e07-pcb)" stroke="#064e3b" stroke-width="1.6" filter="url(#e07-sh)"/>
          <rect x="96" y="262" width="76" height="28" rx="4" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.6"/>
          <text x="134" y="280" text-anchor="middle" font-size="9.5" font-weight="800" fill="#c7d2fe">640×480 NIR</text>
          <text x="134" y="318" text-anchor="middle" font-size="10.5" font-weight="800" fill="#065f46">30.7万画素 高感度CMOS</text>

          <!-- Arrow to Step 2 -->
          <line x1="246" y1="208" x2="274" y2="208" stroke="#6366f1" stroke-width="3" marker-end="url(#e07-arrPurple)"/>

          <!-- Step 2: AI vector calculation -->
          <rect x="282" y="88" width="184" height="242" rx="11" fill="#eef2ff" stroke="#a5b4fc" stroke-width="1.3"/>
          <text x="374" y="108" text-anchor="middle" font-size="11.8" font-weight="800" fill="#3730a3">② AIが視線角度を計算</text>
          <!-- Captured infrared eye frame -->
          <rect x="300" y="122" width="148" height="100" rx="8" fill="#0f172a" stroke="#6366f1" stroke-width="1.6"/>
          <ellipse cx="374" cy="172" rx="52" ry="30" fill="#1e293b" stroke="#64748b" stroke-width="1.4"/>
          <circle cx="388" cy="172" r="19" fill="#334155" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 2"/>
          <circle cx="388" cy="172" r="8" fill="#020617"/>
          <!-- Crosshair & corneal glint vector -->
          <circle cx="364" cy="166" r="3.5" fill="#fb7185"/>
          <circle cx="382" cy="166" r="3.5" fill="#fb7185"/>
          <line x1="373" y1="166" x2="388" y2="172" stroke="#facc15" stroke-width="2.4"/>
          <text x="374" y="216" text-anchor="middle" font-size="9.5" font-weight="700" fill="#38bdf8">瞳孔中心 ＋ 角膜輝点解析</text>
          <rect x="300" y="236" width="148" height="78" rx="8" fill="#ffffff" stroke="#c7d2fe"/>
          <text x="374" y="258" text-anchor="middle" font-size="11" font-weight="800" fill="#4338ca">専用AIアクセラレータ</text>
          <text x="374" y="278" text-anchor="middle" font-size="10.2" font-weight="700" fill="#334155">・検出速度 従来比 2倍</text>
          <text x="374" y="298" text-anchor="middle" font-size="10.2" font-weight="700" fill="#334155">・まぶた・眼鏡の癖を学習</text>

          <!-- Arrow to Step 3 -->
          <line x1="472" y1="208" x2="500" y2="208" stroke="#059669" stroke-width="3" marker-end="url(#e07-arrGreen)"/>

          <!-- Step 3: Live Viewfinder AF Frame jumping to subject -->
          <rect x="508" y="88" width="184" height="242" rx="11" fill="#f0fdf4" stroke="#86efac" stroke-width="1.3"/>
          <text x="600" y="108" text-anchor="middle" font-size="11.8" font-weight="800" fill="#14532d">③ 見た場所へAF枠が移動!</text>
          <!-- Mini EVF screen scene -->
          <rect x="524" y="124" width="152" height="106" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
          <!-- Two soccer/bird silhouettes -->
          <circle cx="564" cy="176" r="14" fill="#64748b"/>
          <circle cx="634" cy="164" r="16" fill="#e2e8f0"/>
          <!-- Active Eye-Control AF reticle jumping to right subject -->
          <circle cx="634" cy="164" r="24" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-dasharray="5 3"/>
          <rect x="614" y="144" width="40" height="40" rx="4" fill="none" stroke="#10b981" stroke-width="2.2"/>
          <text x="600" y="218" text-anchor="middle" font-size="9.5" font-weight="800" fill="#34d399">👁️ 見た被写体に瞬時合焦!</text>
          <text x="600" y="256" text-anchor="middle" font-size="11" font-weight="800" fill="#065f46">ジョイスティック不要!</text>
          <text x="600" y="278" text-anchor="middle" font-size="10.2" font-weight="600" fill="#334155">スポーツ選手や野鳥が</text>
          <text x="600" y="296" text-anchor="middle" font-size="10.2" font-weight="600" fill="#334155">複数いても目線で即切替</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '45°ミラーで曲げられた瞳の映像を', line2: '撮影し、どこを見ているか検出する' },
          { label: 'スゴい工夫・秘密', line1: '30.7万画素NIR CMOS＋専用AIで', line2: '瞳孔と角膜輝点のズレを高速演算' },
          { label: '撮影でどう嬉しい？', line1: '撮りたい被写体を「見るだけ」で', line2: 'AF枠が一瞬で飛びピントが合う！' },
        ],
      });

    // =========================================================================
    // E08. 後群 大口径両面非球面 接眼レンズ（G4・ZEISS T*級多層AR）
    // =========================================================================
    case 'evf_lens_rear':
      return wrapEvfHdSvg({
        badge: 'E08',
        title: '後群 大口径両面非球面 接眼レンズ（G4・φ23mm）',
        analogy: '画面の隅までゆがませず大画面に見せる「高級メガネの両面非球面レンズ」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Bi-aspheric G4 lens cross-section + eye -->
          ${drawHumanEye(76, 206, 0.96, true, '撮影者の目')}

          <!-- Sculpted bi-aspheric G4 optical element (φ23mm) -->
          <path d="M 192 104 C 156 146 156 266 192 308 L 228 308 C 244 266 244 146 228 104 Z" fill="url(#e08-glass)" stroke="#0284c7" stroke-width="2.2" filter="url(#e08-sh)"/>
          <!-- ZEISS T* iridescent AR coat highlight lines -->
          <path d="M 190 108 C 156 148 156 264 190 304" fill="none" stroke="url(#e08-ar)" stroke-width="3.5" opacity="0.85"/>
          <path d="M 230 108 C 244 148 244 264 230 304" fill="none" stroke="url(#e08-ar)" stroke-width="3.5" opacity="0.85"/>
          <text x="206" y="96" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0369a1">G4 両面非球面 (φ23mm)</text>

          <!-- Clean converging rays into the eye across 41° wide FoV -->
          <line x1="330" y1="132" x2="210" y2="136" stroke="#0284c7" stroke-width="2"/>
          <line x1="210" y1="136" x2="108" y2="204" stroke="#0284c7" stroke-width="2" marker-end="url(#e08-arrBlue)"/>
          <line x1="330" y1="206" x2="108" y2="206" stroke="#10b981" stroke-width="2.4" marker-end="url(#e08-arrGreen)"/>
          <line x1="330" y1="280" x2="210" y2="276" stroke="#0284c7" stroke-width="2"/>
          <line x1="210" y1="276" x2="108" y2="208" stroke="#0284c7" stroke-width="2" marker-end="url(#e08-arrBlue)"/>

          <!-- Dimension badge -->
          <rect x="254" y="186" width="84" height="38" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.3"/>
          <text x="296" y="203" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">倍率 0.90×</text>
          <text x="296" y="218" text-anchor="middle" font-size="10" font-weight="700" fill="#475569">対角 41°大画面</text>

          <!-- Right: Visual NG (Spherical distortion) vs OK (Bi-aspheric crisp grid) -->
          <rect x="364" y="84" width="328" height="118" rx="10" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(378, 92, 184, '普通の球面レンズだと…', false)}
          <!-- Pincushion distorted grid -->
          <g transform="translate(384, 124)">
            <path d="M 0 0 Q 44 10 88 0 Q 78 32 88 64 Q 44 54 0 64 Q 10 32 0 0 Z" fill="#ffffff" stroke="#e11d48" stroke-width="1.8"/>
            <path d="M 28 4 Q 32 32 28 60 M 60 4 Q 56 32 60 60 M 4 32 L 84 32" fill="none" stroke="#fda4af" stroke-width="1.2"/>
          </g>
          <text x="492" y="144" font-size="11.2" font-weight="800" fill="#881337">四隅が糸巻き状にゆがむ</text>
          <text x="492" y="164" font-size="10.5" font-weight="600" fill="#475569">・目を少し動かすと像が揺れる</text>
          <text x="492" y="182" font-size="10.5" font-weight="600" fill="#475569">・画面の端の文字がボケる</text>

          <rect x="364" y="214" width="328" height="118" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.3"/>
          ${drawStatusPill(378, 222, 212, 'G4 両面非球面＋ARコート', true)}
          <!-- Perfectly straight undistorted grid -->
          <g transform="translate(384, 254)">
            <rect x="0" y="0" width="88" height="64" rx="2" fill="#ffffff" stroke="#16a34a" stroke-width="1.8"/>
            <line x1="29" y1="0" x2="29" y2="64" stroke="#86efac" stroke-width="1.2"/>
            <line x1="59" y1="0" x2="59" y2="64" stroke="#86efac" stroke-width="1.2"/>
            <line x1="0" y1="32" x2="88" y2="32" stroke="#86efac" stroke-width="1.2"/>
          </g>
          <text x="492" y="274" font-size="11.2" font-weight="800" fill="#14532d">建物の直線も四隅まで真っ直ぐ！</text>
          <text x="492" y="294" font-size="10.5" font-weight="600" fill="#334155">・ガラスモールド両面非球面で収差補正</text>
          <text x="492" y="312" font-size="10.5" font-weight="600" fill="#334155">・反射率&lt;0.2%の多層ARでヌケ抜群</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '目のすぐ前にある最大の接眼レンズ', line2: '小さなOLED映像を大画面へ拡大' },
          { label: 'スゴい工夫・秘密', line1: 'φ23mm両面非球面ガラスモールドで', line2: '四隅の歪み・像揺れを徹底補正' },
          { label: '撮影でどう嬉しい？', line1: '0.90倍の映画館のような大画面で', line2: '端の構図や水平線までピシッと確認' },
        ],
      });

    // =========================================================================
    // E09. 視度補正可動群：ED低分散＋高屈折ランタン貼合せレンズ（G2/G3）
    // =========================================================================
    case 'evf_lens_ed':
      return wrapEvfHdSvg({
        badge: 'E09',
        title: '視度補正可動群：ED低分散＋高屈折ランタン貼合せレンズ（G2/G3）',
        analogy: 'メガネなしでもピントが合う「ファインダー内蔵の度付きズームメガネ」',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        body: `
          <!-- Left: Moving cemented doublet (ED convex + Lanthanum concave) -->
          <rect x="24" y="84" width="340" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="194" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#115e59">前後 3.4mm 動いて視力を補正（−4.0 〜 +3.0）</text>

          <!-- Movement stroke arrow -->
          <line x1="94" y1="130" x2="294" y2="130" stroke="#0d9488" stroke-width="2.4" marker-start="url(#e09-arrGreen)" marker-end="url(#e09-arrGreen)"/>
          <text x="94" y="148" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0369a1">← 近視 (−4.0)</text>
          <text x="194" y="148" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f766e">移動量 3.4mm</text>
          <text x="294" y="148" text-anchor="middle" font-size="10.2" font-weight="800" fill="#c2410c">遠視 (+3.0) →</text>

          <!-- Ghost positions showing sliding range -->
          <rect x="108" y="164" width="54" height="122" rx="10" fill="#ccfbf1" fill-opacity="0.28" stroke="#5eead4" stroke-dasharray="4 3"/>
          <rect x="226" y="164" width="54" height="122" rx="10" fill="#ccfbf1" fill-opacity="0.28" stroke="#5eead4" stroke-dasharray="4 3"/>

          <!-- Cemented Doublet: G3 ED Convex + G2 High-Index Concave -->
          <path d="M 164 166 Q 134 225 164 284 L 194 284 Q 204 225 194 166 Z" fill="url(#e09-glassEd)" stroke="#0d9488" stroke-width="2" filter="url(#e09-sh)"/>
          <path d="M 194 166 Q 204 225 194 284 L 222 284 Q 208 225 222 166 Z" fill="url(#e09-glass)" stroke="#0284c7" stroke-width="2" filter="url(#e09-sh)"/>
          <text x="172" y="222" text-anchor="middle" font-size="11" font-weight="900" fill="#134e4a">ED凸</text>
          <text x="172" y="236" text-anchor="middle" font-size="9" font-weight="700" fill="#0f766e">ν=81.6</text>
          <text x="208" y="222" text-anchor="middle" font-size="10.5" font-weight="900" fill="#0c4a6e">高屈折</text>
          <text x="208" y="236" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">ν=25.4</text>

          <!-- Optical cement seam label -->
          <line x1="194" y1="286" x2="194" y2="306" stroke="#eab308" stroke-width="2"/>
          <text x="194" y="320" text-anchor="middle" font-size="10.5" font-weight="800" fill="#a16207">2枚の性質が違う高級ガラスを透明接着！</text>

          <!-- Right: Chromatic aberration comparison (NG color fringe vs OK apochromatic) -->
          <rect x="382" y="84" width="310" height="118" rx="10" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(396, 92, 180, '普通の1枚レンズだと色ズレ', false)}
          <line x1="398" y1="154" x2="500" y2="146" stroke="#ef4444" stroke-width="2.2"/>
          <line x1="398" y1="158" x2="486" y2="158" stroke="#22c55e" stroke-width="2.2"/>
          <line x1="398" y1="162" x2="472" y2="170" stroke="#3b82f6" stroke-width="2.2"/>
          <circle cx="500" cy="146" r="3.5" fill="#ef4444"/>
          <circle cx="486" cy="158" r="3.5" fill="#22c55e"/>
          <circle cx="472" cy="170" r="3.5" fill="#3b82f6"/>
          <text x="520" y="148" font-size="11" font-weight="800" fill="#881337">赤・緑・青がバラバラ！</text>
          <text x="520" y="168" font-size="10.5" font-weight="600" fill="#475569">文字のフチに紫や赤の</text>
          <text x="520" y="185" font-size="10.5" font-weight="600" fill="#475569">色ニジミが出て見づらい</text>

          <rect x="382" y="214" width="310" height="118" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.3"/>
          ${drawStatusPill(396, 222, 198, 'ED＋ランタン貼合せで解決', true)}
          <line x1="398" y1="274" x2="496" y2="286" stroke="#ef4444" stroke-width="2.2"/>
          <line x1="398" y1="286" x2="496" y2="286" stroke="#22c55e" stroke-width="2.2"/>
          <line x1="398" y1="298" x2="496" y2="286" stroke="#3b82f6" stroke-width="2.2"/>
          <circle cx="496" cy="286" r="5" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <text x="518" y="276" font-size="11" font-weight="800" fill="#14532d">RGBが1点にピタリ一致！</text>
          <text x="518" y="296" font-size="10.5" font-weight="600" fill="#334155">望遠高級レンズと同じED硝材で</text>
          <text x="518" y="313" font-size="10.5" font-weight="600" fill="#334155">どの視度でも色ズレゼロ</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '前後に動いて近視・遠視に合わせ', line2: '画面のピントをくっきり合わせる群' },
          { label: 'スゴい工夫・秘密', line1: 'ED低分散＋高屈折ランタンの貼合せ', line2: '色収差を打ち消しながら3.4mm移動' },
          { label: '撮影でどう嬉しい？', line1: '裸眼でも自分の視力にピッタリ合い', line2: '画面の白い文字も色ニジミなし！' },
        ],
      });

    // =========================================================================
    // E10. 視度可動レンズ 2軸センタレス研磨ガイドロッド ＆ バックラッシュ除去バネ組
    // =========================================================================
    case 'evf_diopter_rails':
      return wrapEvfHdSvg({
        badge: 'E10',
        title: '視度可動レンズ 2軸センタレス研磨ガイドロッド ＆ 予圧バネ組',
        analogy: 'レンズを1ミリの傾きもなく滑らせる「超精密リニア新幹線の2本レール」',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Top-down mechanical rail diagram -->
          <rect x="26" y="84" width="424" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="238" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">2本レール＋PTFE軸受＋対角予圧バネの構造</text>

          <!-- Main Guide Rod (Upper, closed bushing) -->
          <rect x="64" y="138" width="346" height="14" rx="7" fill="url(#e10-steel)" stroke="#475569" stroke-width="1.5" filter="url(#e10-sh)"/>
          <!-- Anti-rotation Guide Rod (Lower, U-fork) -->
          <rect x="64" y="260" width="346" height="14" rx="7" fill="url(#e10-steel)" stroke="#475569" stroke-width="1.5" filter="url(#e10-sh)"/>
          <!-- End mounting blocks -->
          <rect x="52" y="128" width="18" height="158" rx="4" fill="url(#e10-mg)"/>
          <rect x="404" y="128" width="18" height="158" rx="4" fill="url(#e10-mg)"/>

          <!-- Moving ED Lens Carriage bridging both rods -->
          <rect x="172" y="152" width="116" height="108" rx="10" fill="#e2e8f0" stroke="#334155" stroke-width="2" filter="url(#e10-sh)"/>
          <ellipse cx="230" cy="206" rx="22" ry="44" fill="url(#e10-glassEd)" stroke="#0d9488" stroke-width="1.8"/>
          <text x="230" y="210" text-anchor="middle" font-size="10.5" font-weight="900" fill="#134e4a">可動レンズ</text>

          <!-- PTFE white self-lubricating long sleeve bushing on upper main shaft -->
          <rect x="180" y="132" width="100" height="26" rx="5" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
          <text x="230" y="149" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">PTFE自己潤滑ブッシュ</text>

          <!-- U-fork anti-rotation guide on lower sub-shaft -->
          <path d="M 206 254 L 254 254 L 254 278 L 242 278 L 242 262 L 218 262 L 218 278 L 206 278 Z" fill="#475569" stroke="#0f172a" stroke-width="1.4"/>
          <text x="176" y="298" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">回転止めUフォーク（コジリ防止）</text>

          <!-- Anti-backlash coil springs flanking carriage -->
          <path d="M 74 145 L 84 136 L 94 154 L 104 136 L 114 154 L 124 136 L 134 154 L 144 136 L 154 154 L 164 136 L 176 145" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M 284 267 L 296 258 L 306 276 L 316 258 L 326 276 L 336 258 L 346 276 L 356 258 L 366 276 L 376 258 L 398 267" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>
          <text x="122" y="126" text-anchor="middle" font-size="10" font-weight="800" fill="#b45309">予圧コイルバネ</text>
          <text x="352" y="298" text-anchor="middle" font-size="9.5" font-weight="800" fill="#b45309">対角ツイン予圧バネ</text>

          <!-- Right: Precision specs & Why 2 rods + PTFE? -->
          <rect x="466" y="84" width="226" height="248" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="480" y="108" font-size="12" font-weight="800" fill="#0f172a">なぜこんなに精密なの？</text>
          ${drawCallout(410, 145, 496, 142, 1, '真直度 1μm未満の鏡面軸', 'SUS420J2焼入れ研磨 φ1.4mm', '#475569')}
          ${drawCallout(272, 145, 496, 194, 2, 'フッ素樹脂(PTFE)ブッシュ', '極寒−20℃でもグリス硬化ゼロ', '#0284c7')}
          ${drawCallout(342, 268, 496, 246, 3, '対角バネでガタを0に', '傾きゼロで光軸ズレ完全防止', '#d97706')}
          <rect x="480" y="278" width="198" height="42" rx="8" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="579" y="296" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">表面粗さ Ra &lt; 0.05 μm</text>
          <text x="579" y="312" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0c4a6e">(髪の毛の1/1,500の超鏡面!)</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '視度調整レンズが傾かずに', line2: '真っ直ぐ前後移動するためのレール' },
          { label: 'スゴい工夫・秘密', line1: '真直度1μm未満の鏡面SUS軸×2と', line2: 'PTFEブッシュ＋対角ガタ取りバネ' },
          { label: '撮影でどう嬉しい？', line1: '氷点下でもダイヤルが滑らかに動き', line2: '視度を変えても四隅の解像度不変！' },
        ],
      });

    // =========================================================================
    // E11. スパイラルカム溝ヘリコイド鏡筒スリーブ ＆ 真鍮セクター伝達ギア
    // =========================================================================
    case 'evf_diopter_helicoid':
      return wrapEvfHdSvg({
        badge: 'E11',
        title: 'スパイラルカム溝ヘリコイド鏡筒スリーブ ＆ 真鍮セクターギア',
        analogy: '回すと鏡筒がスッと伸びる「高級マニュアルレンズのらせん坂道」',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        body: `
          <!-- Left: Unrolled 3-track 120° spiral helicoid barrel + brass sector gear -->
          <rect x="24" y="84" width="376" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="212" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#92400e">120°等間隔・3条スパイラルカム溝のしくみ</text>

          <!-- Cylindrical helicoid sleeve body -->
          <rect x="74" y="128" width="234" height="148" rx="12" fill="url(#e11-mg)" stroke="#0f172a" stroke-width="2" filter="url(#e11-sh)"/>
          <!-- 3 diagonal CNC-milled spiral cam slots -->
          <path d="M 96 146 L 164 256" stroke="#0f172a" stroke-width="14" stroke-linecap="round"/>
          <path d="M 96 146 L 164 256" stroke="#fde047" stroke-width="2" stroke-dasharray="4 3"/>
          <path d="M 164 146 L 232 256" stroke="#0f172a" stroke-width="14" stroke-linecap="round"/>
          <path d="M 164 146 L 232 256" stroke="#fde047" stroke-width="2" stroke-dasharray="4 3"/>
          <path d="M 232 146 L 300 256" stroke="#0f172a" stroke-width="14" stroke-linecap="round"/>
          <path d="M 232 146 L 300 256" stroke="#fde047" stroke-width="2" stroke-dasharray="4 3"/>

          <!-- 3 Stainless cam follower pins riding inside slots -->
          <circle cx="130" cy="201" r="8" fill="url(#e11-steel)" stroke="#0284c7" stroke-width="2"/>
          <circle cx="198" cy="201" r="8" fill="url(#e11-steel)" stroke="#0284c7" stroke-width="2"/>
          <circle cx="266" cy="201" r="8" fill="url(#e11-steel)" stroke="#0284c7" stroke-width="2"/>

          <!-- C3604 Brass Sector Gear on right rim -->
          <path d="M 308 136 L 330 136 L 336 144 L 330 152 L 336 160 L 330 168 L 336 176 L 330 184 L 336 192 L 330 200 L 336 208 L 330 216 L 336 224 L 330 232 L 336 240 L 330 248 L 336 256 L 330 266 L 308 266 Z" fill="url(#e11-brass)" stroke="#713f12" stroke-width="1.5"/>
          <text x="352" y="205" text-anchor="middle" font-size="10.5" font-weight="800" fill="#92400e" transform="rotate(90, 352, 205)">真鍮セクターギア</text>

          <!-- Rotation -> Linear arrows -->
          <path d="M 52 162 A 28 50 0 0 0 52 240" fill="none" stroke="#d97706" stroke-width="3" marker-end="url(#e11-arrAmber)"/>
          <text x="48" y="264" text-anchor="middle" font-size="10" font-weight="800" fill="#b45309">回転</text>
          <line x1="128" y1="296" x2="268" y2="296" stroke="#0284c7" stroke-width="2.6" marker-start="url(#e11-arrBlue)" marker-end="url(#e11-arrBlue)"/>
          <text x="198" y="316" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0369a1">前後ストローク 3.4mm（精度 ±5μm）</text>

          <!-- Right: Self-locking β = 6.8° ramp explanation -->
          <rect x="416" y="84" width="276" height="248" rx="11" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>
          <text x="432" y="108" font-size="12" font-weight="800" fill="#92400e">🔒 衝撃でズレない「緩い坂道」の法則</text>

          <!-- Ramp triangle diagram showing β = 6.8° -->
          <polygon points="438,210 662,210 662,158" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
          <path d="M 488 210 A 50 50 0 0 0 486 198" fill="none" stroke="#b45309" stroke-width="2"/>
          <text x="518" y="203" font-size="11.5" font-weight="900" fill="#b45309">リード角 β = 6.8°</text>
          <circle cx="566" cy="176" r="10" fill="url(#e11-steel)" stroke="#0f172a" stroke-width="1.8"/>
          <line x1="566" y1="132" x2="566" y2="162" stroke="#e11d48" stroke-width="2.6" marker-end="url(#e11-arrRed)"/>
          <text x="566" y="126" text-anchor="middle" font-size="10.5" font-weight="800" fill="#be123c">落下・振動の衝撃でも…</text>

          ${drawStatusPill(440, 224, 228, '坂が緩すぎて逆戻り不能！', true)}
          <text x="434" y="270" font-size="10.8" font-weight="700" fill="#78350f">① 3点均等支持でレンズの傾きゼロ</text>
          <text x="434" y="290" font-size="10.8" font-weight="700" fill="#78350f">② 摩擦角より浅い6.8°でセルフロック</text>
          <text x="434" y="310" font-size="10.8" font-weight="700" fill="#78350f">③ 真鍮ギアで滑らか・長寿命</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'ダイヤルの回転をレンズの前後移動へ', line2: '変換する3本のらせん溝カム鏡筒' },
          { label: 'スゴい工夫・秘密', line1: '120°3点均等支持＋リード角6.8°で', line2: '精度±5μm＆振動でも逆戻りゼロ' },
          { label: '撮影でどう嬉しい？', line1: '激しく動き回る取材や衝撃を受けても', line2: '合わせた視度ピントが全くズレない！' },
        ],
      });

    // =========================================================================
    // E12. 精密ヘリコイド視度調整ダイヤル・リードスクリュー ＆ 2軸ガイド
    // =========================================================================
    case 'evf_diopter':
      return wrapEvfHdSvg({
        badge: 'E12',
        title: '精密ヘリコイド視度調整ダイヤル ＆ 真鍮リードスクリュー',
        analogy: '回した分だけレンズを0.01mm単位で送る「顕微鏡の微動ピントつまみ」',
        accent: '#b45309',
        accentSoft: '#fef3c7',
        body: `
          <!-- Full drive train from Dial (right) -> Lead Screw -> Moving Lens Carriage (left) -->
          <!-- Moving lens carriage -->
          <rect x="46" y="120" width="128" height="176" rx="12" fill="#f8fafc" stroke="#475569" stroke-width="2" filter="url(#e12-sh)"/>
          <path d="M 88 142 Q 66 208 88 274 L 122 274 Q 134 208 122 142 Z" fill="url(#e12-glassEd)" stroke="#0d9488" stroke-width="2"/>
          <text x="110" y="112" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0f766e">可動G2/G3レンズ</text>

          <!-- Upper & lower guide rails -->
          <rect x="34" y="132" width="230" height="8" rx="4" fill="url(#e12-steel)" stroke="#64748b"/>
          <rect x="34" y="276" width="230" height="8" rx="4" fill="url(#e12-steel)" stroke="#64748b"/>

          <!-- Brass lead screw with fine helical threads -->
          <rect x="174" y="198" width="248" height="20" rx="4" fill="url(#e12-brass)" stroke="#713f12" stroke-width="1.6" filter="url(#e12-sh)"/>
          ${Array.from({ length: 22 })
            .map((_, i) => `<line x1="${184 + i * 10}" y1="198" x2="${189 + i * 10}" y2="218" stroke="#713f12" stroke-width="1.5"/>`)
            .join('')}
          <!-- Anti-backlash coil spring -->
          <path d="M 180 208 L 190 192 L 200 224 L 210 192 L 220 224 L 230 192 L 240 224 L 250 192 L 260 208" fill="none" stroke="#ea580c" stroke-width="2.4"/>

          <!-- Housing wall + Double EPDM waterproof O-rings -->
          <rect x="404" y="128" width="38" height="160" rx="5" fill="url(#e12-mg)" stroke="#0f172a" stroke-width="1.6"/>
          <ellipse cx="414" cy="196" rx="5" ry="7" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <ellipse cx="414" cy="220" rx="5" ry="7" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <ellipse cx="432" cy="196" rx="5" ry="7" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <ellipse cx="432" cy="220" rx="5" ry="7" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>

          <!-- Pull-out knurled diopter dial knob on right -->
          <rect x="442" y="164" width="66" height="88" rx="10" fill="url(#e12-rubber)" stroke="#0f172a" stroke-width="2" filter="url(#e12-sh)"/>
          ${Array.from({ length: 8 })
            .map((_, i) => `<line x1="448" y1="${174 + i * 10}" x2="502" y2="${174 + i * 10}" stroke="#64748b" stroke-width="1.4"/>`)
            .join('')}
          <text x="475" y="152" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">引出して回すダイヤル</text>
          <line x1="514" y1="208" x2="544" y2="208" stroke="#0284c7" stroke-width="2.8" marker-end="url(#e12-arrBlue)"/>
          <text x="532" y="196" text-anchor="middle" font-size="10" font-weight="800" fill="#0284c7">引出す</text>

          <!-- Right-side Diopter scale gauge (-4.0 to +3.0) -->
          <rect x="556" y="96" width="136" height="224" rx="11" fill="#fffbeb" stroke="#fcd34d" stroke-width="1.3"/>
          <text x="624" y="120" text-anchor="middle" font-size="11.5" font-weight="800" fill="#92400e">視度調整メーター</text>
          <rect x="574" y="136" width="20" height="156" rx="10" fill="#e2e8f0" stroke="#94a3b8"/>
          <rect x="574" y="182" width="20" height="32" rx="6" fill="#059669"/>
          <text x="604" y="148" font-size="10.5" font-weight="800" fill="#c2410c">+3.0 遠視</text>
          <text x="604" y="202" font-size="11" font-weight="900" fill="#059669">−1.0 標準</text>
          <text x="604" y="286" font-size="10.5" font-weight="800" fill="#0369a1">−4.0 近視</text>

          <!-- Callouts -->
          ${drawCallout(220, 198, 260, 106, 1, 'ガタ取り予圧バネ', '回した瞬間に即追従', '#ea580c')}
          ${drawCallout(422, 224, 380, 314, 2, '2重EPDM防水Oリング', '雨・ホコリの侵入遮断', '#0284c7', 'end')}
          ${drawCallout(320, 212, 200, 314, 3, '精密真鍮リードスクリュー', '滑らか＆高耐久のネジ送り', '#b45309', 'end')}
        `,
        cards: [
          { label: 'なにをする部品？', line1: '指で回す視度ダイヤルの動きを', line2: '精密ネジで可動レンズへ伝える心臓部' },
          { label: 'スゴい工夫・秘密', line1: '引き出しロック式＋2重Oリング防水', line2: '−4.0〜+3.0m⁻¹の広範囲を精密制御' },
          { label: '撮影でどう嬉しい？', line1: '強い近視でもメガネなしでくっきり', line2: '押し込めば移動中に絶対ズレない！' },
        ],
      });

    // =========================================================================
    // E13. 前群 非球面フィールドフラットナー集光レンズ（G1）
    // =========================================================================
    case 'evf_lens_field':
      return wrapEvfHdSvg({
        badge: 'E13',
        title: '前群 非球面フィールドフラットナー集光レンズ（G1）',
        analogy: '丸く反った紙を机の上でピンと平らに伸ばす「光のアイロン」',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        body: `
          <!-- Left: Optical path from OLED -> G1 Field Flattener (2.5mm gap) -->
          <rect x="24" y="84" width="356" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="202" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#155e75">OLED直前 2.5mm に置かれた「像面平坦化レンズ」</text>

          <!-- Flat Micro-OLED emitter on right side of left box -->
          <rect x="322" y="136" width="22" height="142" rx="4" fill="url(#e13-oled)" stroke="#0f172a" stroke-width="1.8" filter="url(#e13-sh)"/>
          <text x="333" y="298" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">OLED面</text>

          <!-- Positive Meniscus Aspheric G1 Lens (φ19.6mm) -->
          <path d="M 244 132 C 218 176 218 238 244 282 L 266 282 C 254 238 254 176 266 132 Z" fill="url(#e13-glass)" stroke="#0891b2" stroke-width="2.2" filter="url(#e13-sh)"/>
          <text x="248" y="302" text-anchor="middle" font-size="11" font-weight="800" fill="#0e7490">G1 (φ19.6mm)</text>

          <!-- 2.5mm gap bracket -->
          <line x1="268" y1="126" x2="320" y2="126" stroke="#d97706" stroke-width="1.8" marker-start="url(#e13-arrAmber)" marker-end="url(#e13-arrAmber)"/>
          <text x="294" y="121" text-anchor="middle" font-size="9.5" font-weight="800" fill="#b45309">2.5mm</text>

          <!-- Telecentric rays from top, center, bottom of OLED bent cleanly toward eyepiece -->
          <path d="M 320 154 L 254 154 L 56 172" fill="none" stroke="#0284c7" stroke-width="2.4" marker-end="url(#e13-arrBlue)"/>
          <path d="M 320 207 L 56 207" fill="none" stroke="#10b981" stroke-width="2.6" marker-end="url(#e13-arrGreen)"/>
          <path d="M 320 260 L 254 260 L 56 242" fill="none" stroke="#0284c7" stroke-width="2.4" marker-end="url(#e13-arrBlue)"/>
          <text x="122" y="156" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0369a1">周辺光も無駄なく集光！</text>
          <text x="122" y="266" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0369a1">テレセントリック整合</text>

          <!-- Right: NG Curved field vs OK Flattened field -->
          <rect x="396" y="84" width="296" height="118" rx="10" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(410, 92, 184, 'G1がないとピント面が湾曲', false)}
          <line x1="442" y1="128" x2="442" y2="190" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 2"/>
          <path d="M 424 128 Q 446 159 424 190" fill="none" stroke="#e11d48" stroke-width="3"/>
          <text x="466" y="146" font-size="11.2" font-weight="800" fill="#881337">中央は鮮明、四隅がピンボケ</text>
          <text x="466" y="166" font-size="10.2" font-weight="600" fill="#475569">・お椀型に焦点面が曲がる（像面湾曲）</text>
          <text x="466" y="184" font-size="10.2" font-weight="600" fill="#475569">・画面の端が暗くなりやすい</text>

          <rect x="396" y="214" width="296" height="118" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.3"/>
          ${drawStatusPill(410, 222, 198, 'G1フラットナーで隅まで平坦', true)}
          <line x1="438" y1="258" x2="438" y2="320" stroke="#16a34a" stroke-width="3.4"/>
          <text x="466" y="276" font-size="11.2" font-weight="800" fill="#14532d">中央〜四隅まで完全フラット！</text>
          <text x="466" y="296" font-size="10.2" font-weight="600" fill="#334155">・OLEDの端の小さな数値もクッキリ</text>
          <text x="466" y="314" font-size="10.2" font-weight="600" fill="#334155">・高屈折ガラスで周辺光量も均一化</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'OLED画面のすぐ前に置いて', line2: 'ピント面の曲がりを平らに直すレンズ' },
          { label: 'スゴい工夫・秘密', line1: '正メニスカス非球面を2.5mm近接配置', line2: '端の光もロスなく接眼レンズへ誘導' },
          { label: '撮影でどう嬉しい？', line1: '画面四隅のISO・シャッター表示や', line2: '端の被写体ピントまで均一にくっきり' },
        ],
      });

    // =========================================================================
    // E14. 0.64型 944万ドット 2層タンデム マイクロOLED（OLEDoS）
    // =========================================================================
    case 'evf_oled':
      return wrapEvfHdSvg({
        badge: 'E14',
        title: '0.64型 944万ドット 2層タンデム マイクロOLED（OLEDoS）',
        analogy: '親指の爪サイズに4Kテレビ並みの極小ライトを詰めた「2階建て発光タワー」',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        body: `
          <!-- Left: Fingernail scale comparison + 9.44M dot live screen -->
          <rect x="24" y="84" width="232" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="140" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#1e3a8a">親指の爪サイズに 944万ドット！</text>
          <!-- Ceramic package + active OLED window -->
          <rect x="52" y="122" width="176" height="130" rx="10" fill="#334155" stroke="#0f172a" stroke-width="2" filter="url(#e14-sh)"/>
          <rect x="68" y="136" width="144" height="102" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
          <!-- Mini HDR alpine mountain landscape inside OLED -->
          <rect x="70" y="138" width="140" height="58" fill="url(#e14-oled)" opacity="0.88"/>
          <polygon points="70,198 112,160 152,198" fill="#1e293b"/>
          <polygon points="118,198 166,152 210,198" fill="#0f172a"/>
          <polygon points="154,164 166,152 178,164" fill="#f8fafc"/>
          <rect x="70" y="198" width="140" height="38" fill="#020617"/>
          <text x="140" y="216" text-anchor="middle" font-size="9.5" font-weight="800" fill="#38bdf8">1/2000  F2.8  ISO100</text>
          <text x="140" y="230" text-anchor="middle" font-size="8.5" font-weight="700" fill="#10b981">● 240fps HDR 4,000 nits</text>
          <!-- Dimensions callout -->
          <text x="140" y="274" text-anchor="middle" font-size="11" font-weight="800" fill="#1e40af">2048 × 1536 × RGB</text>
          <text x="140" y="294" text-anchor="middle" font-size="10.2" font-weight="700" fill="#475569">画素ピッチ わずか約 6.3 μm</text>
          <text x="140" y="314" text-anchor="middle" font-size="10" font-weight="700" fill="#0284c7">(髪の毛の1/12の極小ピクセル!)</text>

          <!-- Right: 4-Layer OLEDoS Cross-Section Architecture -->
          <rect x="272" y="84" width="420" height="248" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="482" y="106" text-anchor="middle" font-size="12.2" font-weight="800" fill="#0f172a">🔬 圧倒的明るさの秘密「4層一体オンシリコン構造」</text>

          <!-- Upward light rays -->
          <line x1="336" y1="146" x2="336" y2="116" stroke="#ef4444" stroke-width="2.4" marker-end="url(#e14-arrRed)"/>
          <line x1="416" y1="146" x2="416" y2="116" stroke="#10b981" stroke-width="2.4" marker-end="url(#e14-arrGreen)"/>
          <line x1="496" y1="146" x2="496" y2="116" stroke="#0284c7" stroke-width="2.4" marker-end="url(#e14-arrBlue)"/>

          <!-- Layer 4: On-chip Microlens Array (MLA) -->
          <path d="M 294 164 Q 336 134 378 164 Q 416 134 454 164 Q 496 134 538 164 Z" fill="url(#e14-glass)" stroke="#0284c7" stroke-width="1.8"/>
          <text x="554" y="158" font-size="10.8" font-weight="800" fill="#0369a1">① 極小レンズ (MLA)</text>
          <text x="554" y="172" font-size="9.5" font-weight="600" fill="#475569">正面へ光を約2倍集光</text>

          <!-- Layer 3: RGB Color Filter + Optical Micro-Cavity -->
          <rect x="294" y="166" width="81" height="24" rx="3" fill="#ef4444"/>
          <rect x="376" y="166" width="81" height="24" rx="3" fill="#22c55e"/>
          <rect x="458" y="166" width="80" height="24" rx="3" fill="#3b82f6"/>
          <text x="334" y="182" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">R 共振器</text>
          <text x="416" y="182" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">G 共振器</text>
          <text x="498" y="182" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">B 共振器</text>
          <text x="554" y="188" font-size="10.8" font-weight="800" fill="#7c3aed">② RGBカラー＋共振器</text>

          <!-- Layer 2: 2-Stack Tandem WOLED + CGL -->
          <rect x="294" y="194" width="244" height="22" rx="3" fill="#fde047" stroke="#ca8a04" stroke-width="1.3"/>
          <text x="416" y="209" text-anchor="middle" font-size="10" font-weight="800" fill="#713f12">2階発光層 (WOLED) ＋ 電荷発生層(CGL)</text>
          <rect x="294" y="218" width="244" height="22" rx="3" fill="#fbbf24" stroke="#b45309" stroke-width="1.3"/>
          <text x="416" y="233" text-anchor="middle" font-size="10" font-weight="800" fill="#78350f">1階発光層 (WOLED) ← 2倍の明るさ!</text>
          <text x="554" y="218" font-size="10.8" font-weight="800" fill="#b45309">③ 2層タンデム発光</text>
          <text x="554" y="233" font-size="9.5" font-weight="600" fill="#475569">高輝度＆焼き付き防止</text>

          <!-- Layer 1: Monocrystalline Si CMOS Backplane -->
          <rect x="294" y="246" width="244" height="40" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
          <text x="416" y="264" text-anchor="middle" font-size="10.8" font-weight="800" fill="#f8fafc">単結晶シリコン CMOS 駆動回路</text>
          <text x="416" y="279" text-anchor="middle" font-size="9.5" font-weight="700" fill="#94a3b8">(4P-2C 輝度補償 ＋ 240Hz高速ドライバ)</text>
          <text x="554" y="264" font-size="10.8" font-weight="800" fill="#1e293b">④ Si半導体基板</text>
          <text x="554" y="279" font-size="9.5" font-weight="600" fill="#475569">応答0.01ms・残像ゼロ</text>

          <!-- Performance badge bar -->
          <rect x="294" y="298" width="380" height="24" rx="12" fill="#dbeafe" stroke="#2563eb"/>
          <text x="484" y="314" text-anchor="middle" font-size="10.8" font-weight="800" fill="#1e40af">最大 4,000 cd/m² ・ DCI-P3広色域 ・ ブラックアウトフリー連写</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'ファインダー映像を自ら発光して', line2: '描き出すEVF最大の心臓部パネル' },
          { label: 'スゴい工夫・秘密', line1: 'Siチップ直上へ2層発光＋MLAを集積', line2: '4,000 nits・240fps・応答0.01ms' },
          { label: '撮影でどう嬉しい？', line1: '真夏の太陽も夜の黒も肉眼並みに再現', line2: '高速動体も残像ゼロでピント合わせ！' },
        ],
      });

    // =========================================================================
    // E15. マイクロOLED 3点μm光軸チルト調整フレーム ＆ 真鍮レベリングネジ
    // =========================================================================
    case 'evf_oled_alignment':
      return wrapEvfHdSvg({
        badge: 'E15',
        title: 'マイクロOLED 3点μm光軸チルト調整フレーム ＆ 真鍮レベリングネジ',
        analogy: 'カメラ三脚の足のように3点で画面の傾きを1/100度単位で揃える「精密水平台」',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        body: `
          <!-- Left: Front view of 3-point kinematic Kovar alignment frame -->
          <rect x="24" y="84" width="332" height="248" rx="11" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="190" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#713f12">3点キネマティック（三脚原理）調芯フレーム</text>

          <!-- Low-CTE Kovar frame -->
          <rect x="84" y="132" width="212" height="154" rx="12" fill="url(#e15-steel)" stroke="#475569" stroke-width="2" filter="url(#e15-sh)"/>
          <rect x="116" y="156" width="148" height="106" rx="5" fill="url(#e15-oled)" stroke="#0f172a" stroke-width="1.8"/>
          <text x="190" y="214" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">Micro-OLED 画面</text>

          <!-- 3 Brass fine-pitch leveling screws (M1.4 x P0.20) at triangle vertices -->
          <circle cx="190" cy="136" r="14" fill="url(#e15-brass)" stroke="#713f12" stroke-width="2"/>
          <text x="190" y="140" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">A</text>
          <circle cx="96" cy="274" r="14" fill="url(#e15-brass)" stroke="#713f12" stroke-width="2"/>
          <text x="96" y="278" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">B</text>
          <circle cx="284" cy="274" r="14" fill="url(#e15-brass)" stroke="#713f12" stroke-width="2"/>
          <text x="284" y="278" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">C</text>

          <!-- Dashed kinematic triangle -->
          <polygon points="190,136 96,274 284,274" fill="none" stroke="#eab308" stroke-width="1.8" stroke-dasharray="5 3"/>
          <text x="190" y="314" text-anchor="middle" font-size="10.5" font-weight="800" fill="#a16207">3本の極細真鍮ネジ（1回転＝わずか0.2mm移動）</text>

          <!-- Right: Side view showing tilt correction (<±0.03°) -->
          <rect x="372" y="84" width="320" height="118" rx="10" fill="#fff1f2" stroke="#fda4af" stroke-width="1.3"/>
          ${drawStatusPill(386, 92, 198, 'わずかに斜めだと片ボケ！', false)}
          <line x1="406" y1="130" x2="406" y2="192" stroke="#94a3b8" stroke-dasharray="3 2"/>
          <rect x="404" y="132" width="12" height="58" rx="2" fill="#e11d48" transform="rotate(-11, 410, 161)"/>
          <text x="444" y="148" font-size="11" font-weight="800" fill="#881337">右端だけぼやける「片ボケ」</text>
          <text x="444" y="168" font-size="10.2" font-weight="600" fill="#475569">944万ドットの高精細ゆえ、わずか</text>
          <text x="444" y="185" font-size="10.2" font-weight="600" fill="#475569">0.1°傾くだけで四隅のピントがズレる</text>

          <rect x="372" y="214" width="320" height="118" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.3"/>
          ${drawStatusPill(386, 222, 224, '3点調芯＋低熱膨張コバール合金', true)}
          <rect x="404" y="256" width="12" height="58" rx="2" fill="#16a34a"/>
          <text x="444" y="274" font-size="11" font-weight="800" fill="#14532d">チルト誤差 ±0.03° 未満へ校正！</text>
          <text x="444" y="294" font-size="10.2" font-weight="600" fill="#334155">・前後(Z)＋上下傾き＋左右傾きを独立調整</text>
          <text x="444" y="312" font-size="10.2" font-weight="600" fill="#334155">・温度変化で伸びにくいコバール合金採用</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'OLEDパネルの傾きと位置を工場で', line2: 'ミクロン単位に追い込む調芯フレーム' },
          { label: 'スゴい工夫・秘密', line1: '0.2mmピッチ真鍮ネジ×3とSUS予圧バネ', line2: '低熱膨張コバール合金で傾き±0.03°以内' },
          { label: '撮影でどう嬉しい？', line1: '左端から右端まで片ボケ一切なし', line2: '夏も冬も画面全域がシャープなまま！' },
        ],
      });

    // =========================================================================
    // E16. 240Hz MIPI-DSI タイミングコントローラ（TCON）基板 ＆ フレキ
    // =========================================================================
    case 'evf_tcon':
      return wrapEvfHdSvg({
        badge: 'E16',
        title: '240Hz MIPI-DSI タイミングコントローラ（TCON）基板',
        analogy: '1秒に240回・944万個の光を1粒ずつ指揮する「超高速オーケストラ指揮者」',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        body: `
          <!-- Left: Mainboard -> 4+4 lane MIPI-DSI Flex -->
          <rect x="24" y="138" width="112" height="142" rx="10" fill="#1e293b" stroke="#0f172a" stroke-width="1.8" filter="url(#e16-sh)"/>
          <text x="80" y="196" text-anchor="middle" font-size="12" font-weight="800" fill="#38bdf8">BIONZ XR</text>
          <text x="80" y="216" text-anchor="middle" font-size="10.5" font-weight="700" fill="#e2e8f0">メイン基板</text>
          <text x="80" y="236" text-anchor="middle" font-size="9.5" font-weight="700" fill="#94a3b8">(VESA DSC圧縮)</text>

          <!-- Amber high-speed MIPI-DSI flex ribbon -->
          <rect x="136" y="182" width="76" height="54" rx="4" fill="url(#e16-kapton)" stroke="#92400e" stroke-width="1.5"/>
          <line x1="142" y1="194" x2="206" y2="194" stroke="#fef08a" stroke-width="1.8" marker-end="url(#e16-arrAmber)"/>
          <line x1="142" y1="209" x2="206" y2="209" stroke="#fef08a" stroke-width="1.8" marker-end="url(#e16-arrAmber)"/>
          <line x1="142" y1="224" x2="206" y2="224" stroke="#fef08a" stroke-width="1.8" marker-end="url(#e16-arrAmber)"/>
          <text x="174" y="172" text-anchor="middle" font-size="10" font-weight="800" fill="#b45309">4+4レーン高速線</text>

          <!-- Center: 8-Layer Emerald HDI TCON PCB -->
          <rect x="214" y="92" width="298" height="236" rx="12" fill="url(#e16-pcb)" stroke="#064e3b" stroke-width="2.2" filter="url(#e16-sh)"/>
          <text x="363" y="116" text-anchor="middle" font-size="12" font-weight="800" fill="#d1fae5">8層高密度 HDI TCON基板</text>

          <!-- TCON BGA ASIC -->
          <rect x="242" y="132" width="128" height="94" rx="8" fill="#1e293b" stroke="#94a3b8" stroke-width="1.8"/>
          <text x="306" y="162" text-anchor="middle" font-size="12" font-weight="900" fill="#38bdf8">TCON BGA</text>
          <text x="306" y="182" text-anchor="middle" font-size="9.8" font-weight="700" fill="#e2e8f0">・60/120/240Hz駆動</text>
          <text x="306" y="198" text-anchor="middle" font-size="9.8" font-weight="700" fill="#e2e8f0">・10-bit HDR処理</text>
          <text x="306" y="214" text-anchor="middle" font-size="9.8" font-weight="700" fill="#34d399">・Demuraムラ補正</text>

          <!-- Synchronous PMIC power block -->
          <rect x="388" y="132" width="104" height="94" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.6"/>
          <text x="440" y="156" text-anchor="middle" font-size="11" font-weight="800" fill="#fbbf24">OLED電源IC</text>
          <rect x="398" y="168" width="84" height="22" rx="4" fill="#dc2626"/>
          <text x="440" y="183" text-anchor="middle" font-size="9.8" font-weight="800" fill="#ffffff">ELVDD +7.5V</text>
          <rect x="398" y="196" width="84" height="22" rx="4" fill="#2563eb"/>
          <text x="440" y="211" text-anchor="middle" font-size="9.8" font-weight="800" fill="#ffffff">ELVSS −5.5V</text>

          <!-- Meander differential trace + Calibration EEPROM -->
          <rect x="242" y="240" width="250" height="68" rx="8" fill="#064e3b" stroke="#34d399" stroke-width="1.2"/>
          <path d="M 256 266 L 274 266 L 274 256 L 284 256 L 284 276 L 294 276 L 294 256 L 304 256 L 304 266 L 330 266" fill="none" stroke="#facc15" stroke-width="2"/>
          <text x="342" y="266" font-size="10.5" font-weight="800" fill="#fef08a">等長蛇行配線（ズレ0ピコ秒）</text>
          <text x="256" y="294" font-size="9.5" font-weight="700" fill="#a7f3d0">1画素ごとの明るさムラを均一補正 (Demura)</text>

          <!-- Output arrow to OLED -->
          <line x1="516" y1="208" x2="554" y2="208" stroke="#059669" stroke-width="3.2" marker-end="url(#e16-arrGreen)"/>
          <rect x="562" y="138" width="128" height="142" rx="10" fill="url(#e16-oled)" stroke="#0f172a" stroke-width="2" filter="url(#e16-sh)"/>
          <text x="626" y="198" text-anchor="middle" font-size="12.5" font-weight="900" fill="#ffffff">944万ドット</text>
          <text x="626" y="218" text-anchor="middle" font-size="11.5" font-weight="800" fill="#ffffff">Micro-OLED</text>
          <text x="626" y="242" text-anchor="middle" font-size="10" font-weight="800" fill="#fef08a">最大 240fps!</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'カメラ頭脳からの映像データを翻訳し', line2: 'OLEDを1秒240回光らせる専用制御基板' },
          { label: 'スゴい工夫・秘密', line1: 'MIPI 4+4レーン＋低ノイズ電源＋', line2: '画素ムラを消すDemura補正を内蔵' },
          { label: '撮影でどう嬉しい？', line1: '高速連写中も暗転や遅延がゼロで', line2: '滑らかな10-bit HDR階調が目に届く！' },
        ],
      });

    // =========================================================================
    // E17. マイクロOLED背面 銅/アルミ複合ヒートシンク ＆ 熱伝導パッド
    // =========================================================================
    case 'evf_heatsink':
      return wrapEvfHdSvg({
        badge: 'E17',
        title: 'マイクロOLED背面 銅/アルミ複合ヒートシンク ＆ 熱伝導パッド',
        analogy: '熱いスマホを冷やす「極厚の銅プレート＋ひんやり冷却ジェル」',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        body: `
          <!-- Left-to-Right Thermal Dissipation Stack -->
          <!-- 1. Hot Micro-OLED Panel -->
          <rect x="34" y="114" width="66" height="190" rx="8" fill="url(#e17-oled)" stroke="#0f172a" stroke-width="2" filter="url(#e17-sh)"/>
          <text x="67" y="200" text-anchor="middle" font-size="11.5" font-weight="900" fill="#ffffff">OLED</text>
          <text x="67" y="218" text-anchor="middle" font-size="10" font-weight="800" fill="#fef08a">最大2.5W</text>
          <text x="67" y="234" text-anchor="middle" font-size="10" font-weight="800" fill="#fef08a">発熱源</text>

          <!-- 2. High-elasticity Silicone TIM Pad (8.0 W/m·K) -->
          <rect x="108" y="122" width="38" height="174" rx="5" fill="#38bdf8" stroke="#0284c7" stroke-width="1.8"/>
          <text x="127" y="202" text-anchor="middle" font-size="10" font-weight="900" fill="#0c4a6e" transform="rotate(-90, 127, 202)">高熱伝導TIMパッド (8.0 W/m·K)</text>

          <!-- 3. C1020 Oxygen-Free Copper Spreader Base -->
          <rect x="154" y="112" width="54" height="194" rx="6" fill="url(#e17-copper)" stroke="#9a3412" stroke-width="2" filter="url(#e17-sh)"/>
          <text x="181" y="204" text-anchor="middle" font-size="10.8" font-weight="900" fill="#ffffff" transform="rotate(-90, 181, 204)">無酸素銅(C1020)ベース</text>

          <!-- 4. Aluminum Micro-Fin Array -->
          ${Array.from({ length: 8 })
            .map((_, i) => `<rect x="208" y="${122 + i * 22}" width="64" height="13" rx="3" fill="url(#e17-steel)" stroke="#64748b" stroke-width="1.2"/>`)
            .join('')}
          <text x="240" y="316" text-anchor="middle" font-size="10.5" font-weight="800" fill="#475569">アルミ微細フィン</text>

          <!-- Heat flow arrows sweeping rightward & upward to Mg chassis -->
          <line x1="94" y1="154" x2="296" y2="154" stroke="#ef4444" stroke-width="3" marker-end="url(#e17-arrRed)"/>
          <line x1="94" y1="208" x2="296" y2="208" stroke="#f97316" stroke-width="3" marker-end="url(#e17-arrAmber)"/>
          <line x1="94" y1="262" x2="296" y2="262" stroke="#ef4444" stroke-width="3" marker-end="url(#e17-arrRed)"/>

          <!-- 5. Camera Magnesium Body Sink -->
          <rect x="308" y="106" width="84" height="206" rx="10" fill="url(#e17-mg)" stroke="#0f172a" stroke-width="2"/>
          <text x="350" y="198" text-anchor="middle" font-size="11.5" font-weight="800" fill="#f8fafc">Mg合金</text>
          <text x="350" y="216" text-anchor="middle" font-size="11" font-weight="700" fill="#cbd5e1">ボディ骨格</text>
          <text x="350" y="238" text-anchor="middle" font-size="10" font-weight="800" fill="#38bdf8">広面積へ放熱</text>

          <!-- Right Panel: Why Cooling Matters + NTC Thermistor -->
          <rect x="412" y="88" width="280" height="114" rx="10" fill="#fff7ed" stroke="#fdba74" stroke-width="1.3"/>
          <text x="428" y="112" font-size="12" font-weight="800" fill="#9a3412">🔥 温度上昇を ΔT &lt; 12℃ に抑制！</text>
          <text x="428" y="136" font-size="10.8" font-weight="700" fill="#334155">・有機ELは高温だと寿命が縮む弱点がある</text>
          <text x="428" y="158" font-size="10.8" font-weight="700" fill="#334155">・銅で素早く熱を吸い、アルミ＆骨格へ逃がす</text>
          <text x="428" y="180" font-size="10.8" font-weight="700" fill="#c2410c">・夏場の4,000 nits連続表示でも焼き付き防止</text>

          <rect x="412" y="214" width="280" height="114" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.3"/>
          <text x="428" y="238" font-size="12" font-weight="800" fill="#1e40af">🌡️ 内蔵NTC温度センサーで色味を自動補正</text>
          <text x="428" y="262" font-size="10.8" font-weight="700" fill="#334155">・OLEDは温度が変わると赤/青の色味が変化</text>
          <text x="428" y="284" font-size="10.8" font-weight="700" fill="#334155">・背面温度を常時監視しTCONへ即フィードバック</text>
          <text x="428" y="306" font-size="10.8" font-weight="700" fill="#0369a1">→ どんな気温でも正確なホワイトバランス！</text>
        `,
        cards: [
          { label: 'なにをする部品？', line1: '明るく光るOLEDの熱を素早く吸い', line2: 'カメラ本体の金属骨格へ逃がす冷却器' },
          { label: 'スゴい工夫・秘密', line1: '銅ベース＋アルミフィン＋TIMパッド', line2: '温度センサー内蔵で色ズレも自動補正' },
          { label: '撮影でどう嬉しい？', line1: '真夏の長時間撮影でも画面が暗くならず', line2: '色も正確・焼き付き寿命も大幅アップ！' },
        ],
      });

    // =========================================================================
    // E18. 防塵防滴マグネシウム合金EVF鏡筒 ＆ 内部遮光バッフル
    // =========================================================================
    case 'evf_housing':
      return wrapEvfHdSvg({
        badge: 'E18',
        title: '防塵防滴マグネシウム合金EVF鏡筒 ＆ 内部遮光バッフル',
        analogy: '全レンズをミクロン精度で支え迷光を飲み込む「真っ黒な精密トンネル装甲」',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Main longitudinal cutaway of AZ91D Thixomolded Mg Barrel -->
          <!-- Outer Mg housing walls top & bottom with knife-edge sawtooth internal baffles -->
          <path d="M 48 96 L 454 96 L 454 134 L 424 134 L 408 148 L 392 134 L 368 134 L 352 148 L 336 134 L 310 134 L 294 148 L 278 134 L 250 134 L 234 148 L 218 134 L 188 134 L 172 148 L 156 134 L 48 134 Z" fill="url(#e18-mg)" stroke="#0f172a" stroke-width="2" filter="url(#e18-sh)"/>
          <path d="M 48 318 L 454 318 L 454 280 L 424 280 L 408 266 L 392 280 L 368 280 L 352 266 L 336 280 L 310 280 L 294 266 L 278 280 L 250 280 L 234 266 L 218 280 L 188 280 L 172 266 L 156 280 L 48 280 Z" fill="url(#e18-mg)" stroke="#0f172a" stroke-width="2" filter="url(#e18-sh)"/>

          <!-- Interior ultra-black optical tunnel -->
          <rect x="52" y="148" width="398" height="118" fill="#0f172a" fill-opacity="0.06"/>

          <!-- Coaxial seated optical elements (G4, G2/G3, G1, OLED) -->
          <ellipse cx="122" cy="207" rx="14" ry="52" fill="url(#e18-glass)" stroke="#0284c7" stroke-width="1.6"/>
          <ellipse cx="222" cy="207" rx="15" ry="48" fill="url(#e18-glassEd)" stroke="#0d9488" stroke-width="1.6"/>
          <ellipse cx="322" cy="207" rx="12" ry="44" fill="url(#e18-glass)" stroke="#0891b2" stroke-width="1.6"/>
          <rect x="418" y="160" width="18" height="94" rx="3" fill="url(#e18-oled)" stroke="#0f172a" stroke-width="1.6"/>

          <!-- Center optical axis line (±10μm coaxial tolerance) -->
          <line x1="36" y1="207" x2="462" y2="207" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="7 4"/>

          <!-- Diagonal stray light ray trapped and killed by sawtooth knife-edge baffle! -->
          <line x1="414" y1="176" x2="294" y2="148" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#e18-arrAmber)"/>
          <circle cx="294" cy="148" r="8" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1.6"/>
          <text x="294" y="170" text-anchor="middle" font-size="10" font-weight="900" fill="#dc2626">迷光を吸収・消滅!</text>

          <!-- EPDM O-ring dust/water seals on left & right openings -->
          <circle cx="56" cy="134" r="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
          <circle cx="56" cy="280" r="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
          <circle cx="446" cy="134" r="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
          <circle cx="446" cy="280" r="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>

          <!-- Right Explanation Panel with numbered callouts -->
          <rect x="478" y="88" width="214" height="238" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="492" y="112" font-size="12" font-weight="800" fill="#0f172a">マグネシウム鏡筒の4大性能</text>
          ${drawCallout(352, 114, 506, 142, 1, 'AZ91D マグネシウム合金', '軽くて超高剛性・放熱性も抜群', '#334155')}
          ${drawCallout(352, 148, 506, 190, 2, 'ノコギリ刃 遮光バッフル', '壁面反射の白浮きを完全吸収', '#ea580c')}
          ${drawCallout(222, 207, 506, 238, 3, '光軸偏心 ±10μm 以内', '全レンズの中心を髪の1/8精度で整列', '#0284c7')}
          ${drawCallout(446, 280, 506, 286, 4, '全周EPDM防塵防滴シール', '雨・ホコリ・湿気をシャットアウト', '#059669')}
        `,
        cards: [
          { label: 'なにをする部品？', line1: 'レンズ群とOLEDを1つの光軸上に', line2: '強固に支えて守るマグネシウム骨格' },
          { label: 'スゴい工夫・秘密', line1: '内壁のギザギザ遮光バッフルと', line2: '±10μmの超精密加工＋EPDM密閉' },
          { label: '撮影でどう嬉しい？', line1: 'プロ機の過酷な振動や雨天撮影でも', line2: 'コントラスト最高のクリアな視界！' },
        ],
      });

    default:
      return null;
  }
}
