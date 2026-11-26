import { PartExplanation } from '../../assemblies/types';
import {
  drawCallout,
  drawPanelBox,
  drawRaindrop,
  drawStatusPill,
  drawSunIcon,
  wrapLcdHdSvg,
} from './shared';

/**
 * Phase 34 Ultra-HD 720x470 LCD Technical Infographic Schematics — Group C (D90–D110).
 * Covers ESD/CABC (D90–D91), 4-Axis Hinge Tribology/Drainage/Tally/IMU (D92–D100),
 * and 2025–2026 Flagship Display Frontier Architecture (D101–D110).
 */
export function renderLcdHdGroupC(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    case 'lcd_esd_tvs_pi_filter':
      return wrapLcdHdSvg({
        badge: 'D90',
        title: '±15kV ESD保護TVSダイオードアレイ＆フェライトπフィルタ',
        analogy: '15,000Vの静電気を10億分の1秒で地面へ逃がす「超高速避雷針＆ノイズろ過網」',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'IEC 61000-4-2 ±15 kV 静電気クランプ＆π型フィルタ回路図', '#e11d48')}
          <!-- Finger ESD zap coming in from left -->
          <rect x="46" y="138" width="70" height="44" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
          <text x="81" y="158" text-anchor="middle" font-size="10" font-weight="900" fill="#be123c">⚡ ±15 kV</text>
          <text x="81" y="173" text-anchor="middle" font-size="8.8" font-weight="700" fill="#9f1239">指先静電気</text>
          <line x1="116" y1="160" x2="188" y2="160" stroke="#e11d48" stroke-width="3"/>
          <!-- Ultra-low-cap TVS shunt to GND -->
          <rect x="166" y="196" width="56" height="50" rx="6" fill="#1e293b" stroke="#e11d48" stroke-width="1.8"/>
          <text x="194" y="218" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fda4af">TVS</text>
          <text x="194" y="234" text-anchor="middle" font-size="8.5" font-weight="700" fill="#f8fafc">0.30 pF</text>
          <line x1="194" y1="160" x2="194" y2="196" stroke="#e11d48" stroke-width="2.4" marker-end="url(#d90-arrRed)"/>
          <line x1="194" y1="246" x2="194" y2="278" stroke="#0f766e" stroke-width="2.4"/>
          <line x1="180" y1="278" x2="208" y2="278" stroke="#0f766e" stroke-width="2.4"/>
          <text x="194" y="294" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f766e">筐体GND (&lt;0.5nH)</text>
          <!-- Clean clamped line continuing through Pi-Filter to DDIC / BIONZ XR -->
          <line x1="194" y1="160" x2="262" y2="160" stroke="#0284c7" stroke-width="2.4"/>
          <rect x="262" y="144" width="52" height="32" rx="5" fill="#475569" stroke="#0284c7" stroke-width="1.5"/>
          <text x="288" y="164" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">FB 600Ω</text>
          <line x1="314" y1="160" x2="346" y2="160" stroke="#059669" stroke-width="2.6" marker-end="url(#d90-arrGreen)"/>
          <rect x="350" y="132" width="76" height="58" rx="8" fill="#dcfce7" stroke="#059669" stroke-width="1.8"/>
          <text x="388" y="156" text-anchor="middle" font-size="9.8" font-weight="900" fill="#065f46">DDIC / XR</text>
          <text x="388" y="174" text-anchor="middle" font-size="9" font-weight="800" fill="#059669">&lt; 12 V安全!</text>
          <text x="318" y="218" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0284c7">C−L−C π型ローパスフィルタ</text>
          <text x="318" y="234" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">昇圧ノイズの本体逆流を遮断</text>
          ${drawPanelBox(456, 82, 236, 248, '0.5ナノ秒の超高速応答', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">高速信号には「透明」な保護素子</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 接合容量 C_j ≈ 0.30 pF で</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  2 Gbps MIPI波形を一切鈍らせない</text>
          <text x="472" y="198" font-size="9.8" font-weight="700" fill="#e11d48">• 15,000 V の静電気到来時のみ</text>
          <text x="472" y="214" font-size="9.8" font-weight="700" fill="#e11d48">  0.5 ns で瞬時導通→12 V以下制限</text>
          ${drawStatusPill(470, 282, 208, '真冬の静電気破壊を完全阻止', true)}
        `,
        cards: [
          { label: 'どんな保護？', line1: '0.3pF超低容量TVSダイオードと', line2: '600Ωフェライトビーズπフィルタ' },
          { label: 'スゴい工夫', line1: '0.5ナノ秒で±15kVを12V以下へ逃がし', line2: '通常時はMIPI高速波形の邪魔ゼロ' },
          { label: '撮影メリット', line1: '乾燥した冬に画面へバチッと触れても', line2: '故障・再起動や音声ノイズが起きない' },
        ],
      });

    case 'lcd_cabc_pwm_dimmer':
      return wrapLcdHdSvg({
        badge: 'D91',
        title: '25kHz超ハイブリッドDC/PWM調光＆CABC省電力コントローラ',
        analogy: '暗所でもチラつきゼロの「無点滅DC調光」と自動で節電する「賢い明るさ頭脳」',
        accent: '#ca8a04',
        accentSoft: '#fef9c3',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '中〜高輝度DC連続調光 ＋ 極低輝度 &gt;25 kHz PWM切替マップ', '#ca8a04')}
          <!-- Brightness bar from 1 nit (starry night) to 1000 nit (sunny) -->
          <rect x="52" y="132" width="110" height="44" rx="6" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.6"/>
          <text x="107" y="152" text-anchor="middle" font-size="9.6" font-weight="900" fill="#e0e7ff">1〜50 nit (星景)</text>
          <text x="107" y="167" text-anchor="middle" font-size="8.8" font-weight="700" fill="#a5b4fc">&gt;25 kHz 超高周波PWM</text>
          <rect x="166" y="132" width="250" height="44" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8"/>
          <text x="291" y="152" text-anchor="middle" font-size="10.2" font-weight="900" fill="#854d0e">50〜1,000 nit (通常〜屋外晴天)</text>
          <text x="291" y="167" text-anchor="middle" font-size="9.2" font-weight="800" fill="#a16207">完全無点滅 定電流 DCアナログ調光！</text>
          <!-- Waveforms comparison -->
          <text x="54" y="212" font-size="9.8" font-weight="800" fill="#e11d48">❌ 安価な 240Hz PWM:</text>
          <polyline points="196,216 196,196 226,196 226,216 256,216 256,196 286,196 286,216 316,216 316,196 346,196 346,216" fill="none" stroke="#e11d48" stroke-width="2"/>
          <text x="356" y="212" font-size="9.2" font-weight="800" fill="#be123c">目疲れ・縞発生</text>
          <text x="54" y="254" font-size="9.8" font-weight="800" fill="#059669">✅ ハイブリッド DC:</text>
          <line x1="196" y1="246" x2="346" y2="246" stroke="#059669" stroke-width="3.2"/>
          <text x="356" y="252" font-size="9.2" font-weight="900" fill="#065f46">完全フラット!</text>
          <text x="234" y="298" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0284c7">1,000 : 1 超広ダイナミック調光（炎天下1,000 nit ↔ 星空1 nit）</text>
          ${drawPanelBox(456, 82, 236, 248, 'CABCコンテンツ適応制御', '#059669')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">見た目そのまま電池だけ節約！</text>
          <text x="472" y="156" font-size="9.6" font-weight="600" fill="#334155">• 暗い絵柄ではLED輝度を−30%絞り</text>
          <text x="472" y="172" font-size="9.6" font-weight="600" fill="#334155">  同時に液晶透過率を+30%補正</text>
          <text x="472" y="198" font-size="9.6" font-weight="700" fill="#0284c7">• 厳密な露出判定・撮影プレビュー</text>
          <text x="472" y="214" font-size="9.6" font-weight="700" fill="#0284c7">  時は自動でCABCをバイパス！</text>
          <text x="472" y="242" font-size="9.6" font-weight="600" fill="#334155">• 25kHz超なので内蔵マイクにも</text>
          <text x="472" y="258" font-size="9.6" font-weight="600" fill="#334155">  PWM可聴ノイズが一切入らない</text>
          ${drawStatusPill(470, 282, 208, '完全フリッカーフリー＆省電力', true)}
        `,
        cards: [
          { label: 'どんな制御？', line1: '無点滅DC調光＋25kHz超PWM切替', line2: '＆CABC省電力調光コントローラ' },
          { label: 'スゴい工夫', line1: '1,000:1の超広範囲調光を実現し', line2: '露出確認時はCABCを自動解除' },
          { label: '撮影メリット', line1: '星空撮影の暗所でも目が疲れず', line2: '別カメラ撮影時のフリッカー帯ゼロ' },
        ],
      });

    case 'lcd_dcut_hollow_shaft':
      return wrapLcdHdSvg({
        badge: 'D92',
        title: '中空鍛造ステンレスDカット回り止めシャフト＆Eリング固定具',
        analogy: '摩擦板を空回りさせず固定しつつ中心の空洞を36本の配線が通る「中空の芯棒」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'ダブルDカット断面（回り止めキー結合）＆中空ボア配線挿通図', '#475569')}
          <!-- Cross section of double-D hollow shaft on left -->
          <g transform="translate(132, 206)">
            <!-- Outer torque washer ring with D-cut hole -->
            <circle cx="0" cy="0" r="64" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
            <!-- Double-D shaft profile -->
            <path d="M -32 -32 L 32 -32 A 45 45 0 0 1 32 32 L -32 32 A 45 45 0 0 1 -32 -32 Z" fill="url(#d92-steel)" stroke="#0f172a" stroke-width="2.2"/>
            <!-- Hollow center cable bore -->
            <circle cx="0" cy="0" r="22" fill="#0f172a"/>
            <!-- Micro-coax strands inside bore -->
            <circle cx="-7" cy="-6" r="4.2" fill="#f59e0b"/>
            <circle cx="7" cy="-6" r="4.2" fill="#f59e0b"/>
            <circle cx="0" cy="7" r="4.2" fill="#38bdf8"/>
            <text x="0" y="-74" text-anchor="middle" font-size="10" font-weight="900" fill="#0f172a">ダブルDカット正面断面</text>
            <text x="0" y="84" text-anchor="middle" font-size="9.5" font-weight="800" fill="#b45309">D平面で摩擦板と完全キー結合</text>
          </g>
          <!-- Side elevation showing E-ring groove retaining preload -->
          <rect x="240" y="176" width="166" height="58" rx="4" fill="url(#d92-steel)" stroke="#334155" stroke-width="1.8"/>
          <rect x="240" y="194" width="166" height="22" fill="#1e293b"/>
          <text x="323" y="209" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">中空ボア φ2.8mm (36本同軸)</text>
          <!-- E-ring groove on left end -->
          <rect x="256" y="160" width="12" height="90" rx="3" fill="#e11d48" stroke="#881337" stroke-width="1.5"/>
          ${drawCallout(262, 160, 326, 134, 1, 'ばね鋼Eリング', '皿ばね予圧を10万回保持', '#e11d48', 'middle')}
          ${drawPanelBox(456, 82, 236, 248, '中空シャフトの力学メリット', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">軽くて強い「中空ねじり断面」</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• ねじり応力は軸の外周が担うため</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  中空にしても強度はほぼ落ちない</text>
          <text x="472" y="198" font-size="9.8" font-weight="700" fill="#0284c7">• SUS420J2 焼入れ鍛造鋼採用</text>
          <text x="472" y="218" font-size="9.8" font-weight="600" fill="#334155">• 内面入口を滑らかR研磨し</text>
          <text x="472" y="234" font-size="9.8" font-weight="600" fill="#334155">  同軸ケーブル被覆の擦れを防止</text>
          ${drawStatusPill(470, 282, 208, '高トルク伝達＋中心配線保護', true)}
        `,
        cards: [
          { label: 'どんな部品？', line1: '焼入れSUS420J2製ダブルDカット', line2: '中空トルクシャフト＆ばね鋼Eリング' },
          { label: 'スゴい工夫', line1: '外周D面で摩擦板を回り止め固定し', line2: '中心φ2.8mm穴を36本同軸が貫通' },
          { label: '撮影メリット', line1: '10万回の回転でもトルク抜けせず', line2: '内部ケーブルの捻じれ負担も最小' },
        ],
      });

    case 'lcd_sintered_bronze_bush':
      return wrapLcdHdSvg({
        badge: 'D93',
        title: '含油焼結青銅すべり軸受ブッシュ（SAE 841 / PTFEライナー）',
        analogy: '動くとミクロの穴からオイルが滲み出し、止まると吸い込む「自己潤滑青銅スポンジ」',
        accent: '#b45309',
        accentSoft: '#fef3c7',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '多孔質焼結青銅（気孔率20%）自己潤滑オイル循環メカニズム', '#b45309')}
          <!-- Stainless rotating shaft inside sintered bronze bushing -->
          <rect x="64" y="138" width="340" height="44" rx="4" fill="url(#d93-steel)" stroke="#475569" stroke-width="1.6"/>
          <text x="234" y="164" text-anchor="middle" font-size="10.8" font-weight="900" fill="#0f172a">回転するステンレスヒンジ軸（SUS420J2）</text>
          <!-- Micro hydro-oil film between shaft & bronze -->
          <rect x="64" y="182" width="340" height="14" fill="#38bdf8" fill-opacity="0.65"/>
          <text x="234" y="193" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0c4a6e">← 自己供給オイル膜＋PTFEライナー (μ ≈ 0.08 / かじりゼロ!) →</text>
          <!-- Porous sintered bronze bushing with oil pores -->
          <rect x="64" y="196" width="340" height="70" rx="6" fill="url(#d93-copper)" stroke="#7c2d12" stroke-width="1.8"/>
          ${[90, 130, 170, 210, 250, 290, 330, 370]
            .map(
              (x) => `
            <circle cx="${x}" cy="222" r="6" fill="#0284c7" stroke="#fef08a" stroke-width="1.2"/>
            <circle cx="${x + 14}" cy="246" r="5" fill="#0284c7" stroke="#fef08a" stroke-width="1.2"/>
            <line x1="${x}" y1="214" x2="${x}" y2="196" stroke="#e0f2fe" stroke-width="1.6" marker-end="url(#d93-arrBlue)"/>`
            )
            .join('')}
          <text x="234" y="286" text-anchor="middle" font-size="10.2" font-weight="800" fill="#92400e">SAE 841 焼結青銅（気孔率約20%のミクロ空孔に合成油を真空含浸）</text>
          <text x="234" y="306" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0284c7">回転熱で油が滲み出て油膜形成 → 静止すると毛細管力で空孔へ自動帰還！</text>
          ${drawPanelBox(456, 82, 236, 248, 'なぜ異種金属ベアリング？', '#e11d48')}
          ${drawStatusPill(470, 122, 208, 'SUS×SUS直擦れ: 金属かじり固着', false)}
          <text x="474" y="164" font-size="9.6" font-weight="600" fill="#881337">同種ステンレス同士は酸化膜が</text>
          <text x="474" y="180" font-size="9.6" font-weight="600" fill="#881337">破れると溶着(Galling)して破損</text>
          ${drawStatusPill(470, 204, 208, '焼結青銅＋PTFE: 10万回無給油', true)}
          <text x="474" y="246" font-size="9.6" font-weight="700" fill="#065f46">• フランジ部が軸方向ガタも吸収</text>
          <text x="474" y="264" font-size="9.6" font-weight="700" fill="#065f46">• 極寒−20℃でも油切れ・異音ゼロ</text>
        `,
        cards: [
          { label: 'どんな軸受？', line1: '気孔率20%の多孔質焼結青銅', line2: '(SAE 841)＋PTFE低摩擦ライナー' },
          { label: 'スゴい工夫', line1: '毛細管ポンプ作用でオイルが出入り', line2: '一生無給油でステンレスかじり防止' },
          { label: '撮影メリット', line1: '10万回ヒンジを動かしても', line2: 'キーキー鳴らずガタも出ない' },
        ],
      });

    case 'lcd_pfpe_dimple_grease':
      return wrapLcdHdSvg({
        badge: 'D94',
        title: 'レーザーマイクロディンプル摩擦板＆PFPEダンピンググリス膜',
        analogy: '高級機特有の「ヌルッと吸い付く動き」を−20℃〜+60℃で保つ宇宙級フッ素グリス',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'マイクロディンプル油溜まり加工＆PFPEフッ素グリス断面', '#0284c7')}
          <!-- Top friction disc -->
          <rect x="64" y="124" width="340" height="32" rx="4" fill="url(#d94-steel)" stroke="#475569" stroke-width="1.6"/>
          <text x="234" y="144" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">対向ステンレス摩擦板（相対回転 →）</text>
          <!-- PFPE high-viscosity damping grease layer -->
          <rect x="64" y="156" width="340" height="26" fill="#38bdf8" fill-opacity="0.45" stroke="#0284c7" stroke-width="1.4"/>
          <text x="234" y="173" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0369a1">PFPEパーフルオロポリエーテル高粘度ダンピンググリス膜</text>
          <!-- Bottom phosphor-bronze friction disc with laser micro-dimple pits! -->
          <path d="M 64 182 L 100 182 Q 116 212 132 182 L 180 182 Q 196 212 212 182 L 260 182 Q 276 212 292 182 L 340 182 Q 356 212 372 182 L 404 182 L 404 236 L 64 236 Z" fill="url(#d94-gold)" stroke="#92400e" stroke-width="1.8"/>
          <text x="234" y="226" text-anchor="middle" font-size="10" font-weight="900" fill="#78350f">レーザーマイクロディンプル油溜まり加工リン青銅板（面積率12%）</text>
          <!-- Filled grease pools inside dimples -->
          ${[116, 196, 276, 356]
            .map((cx) => `<path d="M ${cx - 14} 182 Q ${cx} 206 ${cx + 14} 182 Z" fill="#0ea5e9" fill-opacity="0.72"/>`)
            .join('')}
          <text x="234" y="268" text-anchor="middle" font-size="10.5" font-weight="900" fill="#059669">静摩擦 / 動摩擦 比 ≈ 1.02 → 動き出しのカクつき（スティックスリップ）消滅！</text>
          <text x="234" y="290" text-anchor="middle" font-size="9.6" font-weight="700" fill="#475569">窪みにグリスが留まり押し出されないため10年スパンでトルク劣化防止</text>
          ${drawPanelBox(456, 82, 236, 248, '−20℃〜+60℃ 全天候安定', '#0f766e')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">なぜ高価なPFPEフッ素グリス？</text>
          <text x="472" y="156" font-size="9.6" font-weight="600" fill="#334155">• 普通グリスは冬にガチガチ硬化し</text>
          <text x="472" y="172" font-size="9.6" font-weight="600" fill="#334155">  夏は垂れて樹脂カバーを割る</text>
          <text x="472" y="198" font-size="9.6" font-weight="700" fill="#0284c7">• PFPEは蒸気圧ゼロ・化学不活性</text>
          <text x="472" y="214" font-size="9.6" font-weight="700" fill="#0284c7">  ゴム/樹脂を一切侵さず極寒も滑らか</text>
          ${drawStatusPill(470, 282, 208, '雪山でも砂漠でも同じ上質トルク', true)}
        `,
        cards: [
          { label: 'どんな工夫？', line1: 'レーザー微小油溜まりディンプル板と', line2: 'PFPEフッ素系ダンピンググリス膜' },
          { label: 'スゴい工夫', line1: 'μ_s/μ_k≈1.02で動き出しの引っかかり', line2: 'を消し、樹脂や防水ゴムも傷めない' },
          { label: '撮影メリット', line1: '真冬の寒冷地でもヒンジが硬くならず', line2: 'しっとり滑らかな動画チルトが可能' },
        ],
      });

    case 'lcd_stepped_rivet_washers':
      return wrapLcdHdSvg({
        badge: 'D95',
        title: '段付き精密ステンレスリベット・POM座金＆カムガイドブッシュ',
        analogy: '4軸アームを絶対に緩めず繋ぐ「段付きピン」と無音にする「白いツルツル樹脂輪」',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '4軸パンタグラフ支点 スピンカシメ段付きリベット断面', '#475569')}
          <!-- Stepped CNC rivet shaft joining Link Arm A and Cradle Frame -->
          <rect x="64" y="168" width="26" height="84" rx="4" fill="url(#d95-steel)" stroke="#334155" stroke-width="1.6"/>
          <rect x="90" y="186" width="168" height="48" fill="url(#d95-steel)" stroke="#334155" stroke-width="1.6"/>
          <!-- Spun riveted flared tail on right -->
          <path d="M 258 186 L 282 174 L 282 246 L 258 234 Z" fill="#64748b" stroke="#0f172a" stroke-width="1.6"/>
          <!-- Link arm 1 & Link arm 2 -->
          <rect x="106" y="128" width="48" height="58" rx="4" fill="#334155"/>
          <rect x="106" y="234" width="48" height="58" rx="4" fill="#334155"/>
          <rect x="176" y="128" width="54" height="58" rx="4" fill="#475569"/>
          <rect x="176" y="234" width="54" height="58" rx="4" fill="#475569"/>
          <!-- White POM thrust washer between metal arms! -->
          <rect x="156" y="136" width="18" height="50" rx="2" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
          <rect x="156" y="234" width="18" height="50" rx="2" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
          <!-- Bronze cam guide roller on right -->
          <rect x="292" y="164" width="76" height="92" rx="8" fill="url(#d95-copper)" stroke="#7c2d12" stroke-width="1.8"/>
          <text x="330" y="214" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">カムガイド</text>
          ${drawCallout(165, 138, 224, 114, 1, 'POMスラスト座金 (t=0.3mm)', '金属擦れ・きしみ音を完全消音', '#0284c7')}
          ${drawCallout(270, 240, 290, 294, 2, 'スピンカシメ締結', 'ネジ緩みゼロ＋公差±5μm維持', '#334155')}
          ${drawPanelBox(456, 82, 236, 248, '動画撮影時の無音品質', '#059669')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">全数サーボプレス軸力管理</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 4支点それぞれのカシメ軸力を</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  サーボプレスで波形監視し</text>
          <text x="472" y="188" font-size="9.8" font-weight="600" fill="#334155">  左右均等の滑らかチルトを保証</text>
          <text x="472" y="216" font-size="9.8" font-weight="700" fill="#0284c7">• POM (μ≈0.12) が動画録音中の</text>
          <text x="472" y="232" font-size="9.8" font-weight="700" fill="#0284c7">  チルト操作きしみ音をシャットアウト</text>
          ${drawStatusPill(470, 282, 208, '緩みゼロ×無音×左右均等チルト', true)}
        `,
        cards: [
          { label: 'どんな部品？', line1: 'CNC段付きSUSスピンリベットと', line2: 'POMスラスト座金・カムガイド' },
          { label: 'スゴい工夫', line1: 'ネジを使わず±5μm公差カシメ固定', line2: '金属間に0.3mm POMを挟み無音化' },
          { label: '撮影メリット', line1: '動画収録中に画面角度を変えても', line2: 'マイクにギシギシ音が入らない' },
        ],
      });

    case 'lcd_rain_drain_labyrinth':
      return wrapLcdHdSvg({
        badge: 'D96',
        title: '背面ポケット雨水ドレン溝・毛細管遮断ラビリンス＆EMI接地ばね',
        analogy: 'モニター裏の水を逃がす「排水溝＋段差トラップ」と電波ノイズを逃がす「金のアース爪」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '毛細管遮断段差（キャピラリーブレイク）＋下縁排水ドレン断面', '#0284c7')}
          <!-- Recessed pocket bottom lip cutaway -->
          <path d="M 52 132 L 106 132 L 106 236 L 178 236 L 178 206 L 242 206 L 242 268 L 408 268 L 408 294 L 52 294 Z" fill="url(#d96-mg)" stroke="#0f172a" stroke-width="1.8"/>
          <!-- Rainwater entering narrow gap, stopped at sudden wide capillary-break trench, drained out bottom -->
          ${drawRaindrop(134, 152, 0.9)}
          <path d="M 134 166 L 134 224 L 210 224 L 210 256 L 340 256 L 386 286" fill="none" stroke="#0284c7" stroke-width="3" marker-end="url(#d96-arrBlue)"/>
          <text x="142" y="256" font-size="9.5" font-weight="900" fill="#ffffff">毛細管遮断溝 (d拡大)</text>
          <text x="322" y="246" text-anchor="middle" font-size="10" font-weight="900" fill="#0284c7">下縁ウィープ排水口×3 → 外部排出!</text>
          <!-- Gold BeCu EMI grounding spring finger touching stowed LCD -->
          <rect x="274" y="134" width="124" height="22" rx="4" fill="#334155"/>
          <text x="336" y="149" text-anchor="middle" font-size="9.2" font-weight="800" fill="#f8fafc">収納時モニター背面金属殻</text>
          <path d="M 304 204 Q 332 158 366 158" fill="none" stroke="#eab308" stroke-width="5" stroke-linecap="round"/>
          ${drawCallout(346, 160, 290, 114, 1, 'BeCu金メッキEMIばね×4', '収納時に<20mΩで筐体最短接地', '#b45309', 'middle')}
          ${drawPanelBox(456, 82, 236, 248, '毛細管現象を物理で破る', '#0f766e')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">h = 2γ cosθ / (ρ·g·d)</text>
          <text x="472" y="156" font-size="9.6" font-weight="600" fill="#334155">• 0.5mmの狭い隙間は重力に逆らい</text>
          <text x="472" y="172" font-size="9.6" font-weight="600" fill="#334155">  雨水を奥の基板へ吸い上げる</text>
          <text x="472" y="198" font-size="9.6" font-weight="700" fill="#0284c7">• 段差溝で隙間 d を2mm超へ</text>
          <text x="472" y="214" font-size="9.6" font-weight="700" fill="#0284c7">  急拡大して吸い上げ力を断ち切る！</text>
          <text x="472" y="242" font-size="9.6" font-weight="600" fill="#b45309">• 4点アースばねでRFノイズも低減</text>
          ${drawStatusPill(470, 282, 208, '水たまりゼロ＋最短RFアース', true)}
        `,
        cards: [
          { label: 'どんな機構？', line1: '背面ポケットの毛細管遮断溝・', line2: '下縁排水ドレン＆BeCu金アース爪' },
          { label: 'スゴい工夫', line1: '隙間を急拡大する段差で水の吸上げ', line2: 'を断ち、4点ばねでEMI最短接地' },
          { label: '撮影メリット', line1: '豪雨撮影後もモニター裏に水が', line2: '溜まらず腐食や電波ノイズを防止' },
        ],
      });

    case 'lcd_micro_screw_threadlock':
      return wrapLcdHdSvg({
        badge: 'D97',
        title: 'M1.4/M1.7 精密ブラックオキサイド小ねじ＆マイクロカプセル緩み止め',
        analogy: '締めた瞬間に青い粒がプチッと弾けて固まる「絶対に緩まない真っ黒な精密ネジ」',
        accent: '#2563eb',
        accentSoft: '#dbeafe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'M1.4 / M1.7 精密十字小ねじ プレコート緩み止め拡大断面', '#2563eb')}
          <!-- Enlarged screw silhouette -->
          <path d="M 88 152 Q 88 130 132 130 L 160 130 L 160 278 L 132 278 Q 88 278 88 256 Z" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
          <!-- Phillips #0 cross slot -->
          <rect x="88" y="194" width="38" height="20" fill="#475569"/>
          <!-- Threaded shank -->
          <rect x="160" y="176" width="212" height="56" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
          <!-- Thread ridges -->
          ${Array.from({ length: 11 })
            .map((_, i) => `<line x1="${174 + i * 18}" y1="170" x2="${184 + i * 18}" y2="238" stroke="#94a3b8" stroke-width="3"/>`)
            .join('')}
          <!-- Blue micro-encapsulated threadlock band! -->
          <rect x="224" y="170" width="94" height="68" rx="4" fill="#2563eb" fill-opacity="0.45" stroke="#1d4ed8" stroke-width="2"/>
          ${[238, 256, 274, 292, 308]
            .map((x) => `<circle cx="${x}" cy="204" r="5" fill="#60a5fa" stroke="#ffffff" stroke-width="1.2"/>`)
            .join('')}
          ${drawCallout(272, 170, 272, 122, 1, '青色マイクロカプセル嫌気性樹脂', '締付せん断で弾けて硬化→振動緩み完全ロック', '#2563eb', 'middle')}
          ${drawCallout(124, 276, 176, 296, 2, '低反射ブラックオキサイド皮膜', '防錆・迷光防止・ガルバニック腐食抑制', '#0f172a')}
          ${drawPanelBox(456, 82, 236, 248, '0.10 N·m 精密トルク管理', '#059669')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">10万回交番荷重に耐える締結</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• ヒンジネジは開閉のたびに</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  正逆のせん断力を毎回受ける</text>
          <text x="472" y="198" font-size="9.8" font-weight="700" fill="#2563eb">• 工場で0.08〜0.14 N·m全数管理</text>
          <text x="472" y="218" font-size="9.8" font-weight="600" fill="#334155">• 戻しトルク &gt; 1.5×通常トルク</text>
          <text x="472" y="244" font-size="9.6" font-weight="600" fill="#b45309">※ 修理分解時は再使用せず</text>
          <text x="472" y="260" font-size="9.6" font-weight="600" fill="#b45309">  新品プレコートネジ交換が鉄則</text>
          ${drawStatusPill(470, 282, 208, 'ヒンジのガタ・緩みを一生防止', true)}
        `,
        cards: [
          { label: 'どんなネジ？', line1: 'M1.4/M1.7 黒色酸化防錆処理の', line2: '精密十字小ねじ＋青色緩み止め剤' },
          { label: 'スゴい工夫', line1: 'マイクロカプセル嫌気性樹脂が', line2: '締付瞬間に硬化し振動緩みをロック' },
          { label: '撮影メリット', line1: '長年のフィールド運用や移動振動でも', line2: '4軸ヒンジがグラつかず剛性を維持' },
        ],
      });

    case 'lcd_tally_rec_lightpipe':
      return wrapLcdHdSvg({
        badge: 'D98',
        title: '録画中赤枠強調表示連動＆背面タリーLED導光ライトパイプ',
        analogy: 'REC押し忘れを防ぐ「画面真っ赤枠」と極小LED光を縁まで運ぶ「透明な光の管」',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '全反射(TIR)ポリカーボネート導光ライトパイプ＋赤枠REC連動図', '#e11d48')}
          <!-- Monitor with glowing red frame emphasis -->
          <rect x="64" y="120" width="184" height="122" rx="8" fill="#0f172a" stroke="#ef4444" stroke-width="5"/>
          <text x="156" y="168" text-anchor="middle" font-size="12" font-weight="900" fill="#ef4444">● REC 00:14:28</text>
          <text x="156" y="192" text-anchor="middle" font-size="9.8" font-weight="700" fill="#e2e8f0">録画中強調表示（赤枠）</text>
          <text x="156" y="212" text-anchor="middle" font-size="9.2" font-weight="700" fill="#fca5a5">自撮り180°反転時も一目で判明!</text>
          <!-- Optical TIR Light-Pipe zoom on right -->
          <rect x="272" y="128" width="144" height="44" rx="6" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.8"/>
          <rect x="276" y="140" width="18" height="20" rx="3" fill="#ef4444"/>
          <!-- Total Internal Reflection zigzag ray -->
          <polyline points="294,150 322,130 354,170 386,130 412,150" fill="none" stroke="#e11d48" stroke-width="2.6" marker-end="url(#d98-arrRed)"/>
          <text x="344" y="190" text-anchor="middle" font-size="9.6" font-weight="900" fill="#be123c">全反射ライトパイプ (n=1.58)</text>
          <text x="344" y="206" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">臨界角 θ_c=39.2° 低損失導光</text>
          <text x="344" y="232" text-anchor="middle" font-size="9.4" font-weight="800" fill="#059669">出口マット拡散で眩しすぎず均一</text>
          <text x="234" y="288" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0f172a">前面タリー＋背面タリー＋画面赤枠の「3重録画確認」でワンオペ動画ミス撲滅！</text>
          ${drawPanelBox(456, 82, 236, 248, 'Cinema Line譲りの安心設計', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">「撮れてなかった！」を完全ゼロへ</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 0603極小深赤LED(630nm)を</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  基板奥に安全配置したまま、光だけ</text>
          <text x="472" y="188" font-size="9.8" font-weight="600" fill="#334155">  透明樹脂管でベゼル端まで運ぶ</text>
          <text x="472" y="216" font-size="9.8" font-weight="700" fill="#e11d48">• ジンバル遠隔操作や自撮りVlogで</text>
          <text x="472" y="232" font-size="9.8" font-weight="700" fill="#e11d48">  離れていても録画状態が一目瞭然</text>
          ${drawStatusPill(470, 282, 208, 'ワンオペ動画のRECミス完全防止', true)}
        `,
        cards: [
          { label: 'どんな光学系？', line1: 'ポリカーボネートTIR導光ライトパイプ', line2: '＋630nm赤色LED＋画面赤枠強調' },
          { label: 'スゴい工夫', line1: '基板上の極小LED光を全反射で', line2: '防滴を保ったまま縁まで低損失誘導' },
          { label: '撮影メリット', line1: '自撮りやジンバル撮影時でも', line2: 'REC押し忘れの悲劇をゼロにする' },
        ],
      });

    case 'lcd_imu_vertical_link':
      return wrapLcdHdSvg({
        badge: 'D99',
        title: '6軸MEMS姿勢IMU縦位置自動回転リンク＆4軸UI制御',
        analogy: '縦に構えた瞬間にスマホのように文字や設定をクルッと回す「カメラの三半規管」',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '6軸MEMS IMU × D05ホールセンサー フュージョン姿勢制御図', '#059669')}
          <!-- Sensor Fusion inputs -> UI rotation output -->
          <rect x="46" y="122" width="144" height="62" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
          <text x="118" y="144" text-anchor="middle" font-size="10.2" font-weight="900" fill="#065f46">6軸 MEMS IMU</text>
          <text x="118" y="160" text-anchor="middle" font-size="9" font-weight="700" fill="#047857">3軸加速度 g＋3軸ジャイロ</text>
          <text x="118" y="174" text-anchor="middle" font-size="8.8" font-weight="700" fill="#059669">精度 ±0.1° (水準器共用)</text>

          <rect x="46" y="204" width="144" height="58" rx="8" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/>
          <text x="118" y="226" text-anchor="middle" font-size="10.2" font-weight="900" fill="#312e81">D05 ホールセンサー</text>
          <text x="118" y="242" text-anchor="middle" font-size="9" font-weight="700" fill="#4338ca">収納 / 横開き / 180°反転</text>

          <line x1="190" y1="152" x2="238" y2="188" stroke="#059669" stroke-width="2.4" marker-end="url(#d99-arrGreen)"/>
          <line x1="190" y1="232" x2="238" y2="196" stroke="#4f46e5" stroke-width="2.4" marker-end="url(#d99-arrPurple)"/>

          <!-- Vertical Portrait UI display output -->
          <rect x="246" y="122" width="174" height="148" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <text x="333" y="148" text-anchor="middle" font-size="10.5" font-weight="900" fill="#34d399">縦位置UI 90°自動回転!</text>
          <rect x="278" y="160" width="110" height="78" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.4"/>
          <text x="333" y="182" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">1/1000  F1.2  ISO100</text>
          <text x="333" y="204" text-anchor="middle" font-size="9.2" font-weight="700" fill="#7dd3fc">電子水準器・メニュー正立</text>
          <text x="333" y="224" text-anchor="middle" font-size="9" font-weight="700" fill="#fde047">180°自撮り時は鏡像反転</text>
          <text x="234" y="302" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">カルマンフィルタ融合＋ヒステリシス制御で真上・真下撮影時もUIがバタつかない！</text>
          ${drawPanelBox(456, 82, 236, 248, 'ポートレート・SNS縦動画に革命', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">縦構えで首を傾げなくてOK！</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• 従来機は縦構え時に設定数値が</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  横倒しになって読みにくかった</text>
          <text x="472" y="198" font-size="9.8" font-weight="700" fill="#059669">• α7R V / α1 II 世代ではF値・SS・</text>
          <text x="472" y="214" font-size="9.8" font-weight="700" fill="#059669">  ヒストグラム・タッチ操作まで連動</text>
          ${drawStatusPill(470, 282, 208, '縦位置撮影＆自撮りUI完全自動', true)}
        `,
        cards: [
          { label: 'どんな仕組み？', line1: '6軸MEMS加速度・ジャイロIMUと', line2: 'D05ホールセンサーの姿勢フュージョン' },
          { label: 'スゴい工夫', line1: 'カルマンフィルタとヒステリシスで', line2: '俯瞰・天体撮影時の誤回転を防止' },
          { label: '撮影メリット', line1: '縦位置ポートレートやSNS縦動画で', line2: '設定値とメニューが直感的に読める' },
        ],
      });

    case 'lcd_rear_bezel_shock_rib':
      return wrapLcdHdSvg({
        badge: 'D100',
        title: 'マグネシウム殻内部ハニカム耐衝撃リブ＆4隅エラストマー緩衝材',
        analogy: '一番割れやすい「ガラスの4つの角」を軟質シリコンで包み裏側を蜂の巣筋交いで守る鎧',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '背面マグネシウム内壁 斜交トラスリブ＋4隅コーナー緩衝構造', '#475569')}
          <!-- Rear shell interior view with diagonal honeycomb ribs & 4 cyan corner shock bumpers -->
          <rect x="64" y="122" width="340" height="184" rx="14" fill="url(#d100-mg)" stroke="#0f172a" stroke-width="2"/>
          <!-- Diagonal honeycomb truss ribs -->
          ${[114, 174, 234, 294, 354]
            .map(
              (x) => `
            <line x1="${x - 36}" y1="138" x2="${x + 36}" y2="290" stroke="#94a3b8" stroke-width="3.5" opacity="0.65"/>
            <line x1="${x + 36}" y1="138" x2="${x - 36}" y2="290" stroke="#94a3b8" stroke-width="3.5" opacity="0.65"/>`
            )
            .join('')}
          <!-- 4 Corner Elastomer drop-buffer blocks -->
          ${[
            [68, 126],
            [360, 126],
            [68, 266],
            [360, 266],
          ]
            .map(
              ([cx, cy]) =>
                `<rect x="${cx}" y="${cy}" width="40" height="36" rx="8" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>`
            )
            .join('')}
          <text x="234" y="216" text-anchor="middle" font-size="11.5" font-weight="900" fill="#ffffff">斜交ハニカム薄肉トラスリブ</text>
          <text x="234" y="236" text-anchor="middle" font-size="9.8" font-weight="700" fill="#bae6fd">ねじり剛性 約 3.2 倍アップ（色ムラ防止）</text>
          ${drawCallout(88, 144, 170, 108, 1, '4隅エラストマー緩衝ブロック', 'Shore A45粘弾性材で落下Gを半減', '#0284c7')}
          ${drawPanelBox(456, 82, 236, 248, '角落ち衝撃への物理防衛', '#0284c7')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">G_peak = v / Δt_elastomer</text>
          <text x="472" y="156" font-size="9.8" font-weight="600" fill="#334155">• ガラスが割れる最大原因は</text>
          <text x="472" y="172" font-size="9.8" font-weight="600" fill="#334155">  四隅コーナーへの局所打撃</text>
          <text x="472" y="198" font-size="9.8" font-weight="700" fill="#0284c7">• 軟質シリコーンブロックが衝突時間</text>
          <text x="472" y="214" font-size="9.8" font-weight="700" fill="#0284c7">  Δt を延ばして瞬間加速度を半減！</text>
          <text x="472" y="242" font-size="9.6" font-weight="600" fill="#334155">• リブ空洞が断熱空気層にもなる</text>
          ${drawStatusPill(470, 282, 208, '薄肉高剛性＋4隅割れガード', true)}
        `,
        cards: [
          { label: 'どんな構造？', line1: '背面Mg殻内壁の斜交トラスリブと', line2: '4隅シリコーン衝撃緩衝ブロック' },
          { label: 'スゴい工夫', line1: 'ねじり剛性3.2倍化で液晶歪みを防ぎ', line2: '4隅エラストマーで落下Gを劇的緩和' },
          { label: '撮影メリット', line1: 'モニターを開いたまま岩場や機材に', line2: 'コツンと当ててもガラスが割れにくい' },
        ],
      });

    case 'lcd_nano_texture_glass':
      return wrapLcdHdSvg({
        badge: 'D101',
        title: '2026次世代 ナノテクスチャ微細エッチング超低反射ガラス',
        analogy: 'フィルムを貼らずガラス自体をナノ彫刻し、太陽映り込みだけを無色拡散する未来ガラス',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          ${drawPanelBox(28, 82, 326, 248, '❌ 従来マットAGフィルム（粒状ギラつき）', '#e11d48', '#fff1f2')}
          ${drawSunIcon(84, 134, 10)}
          <line x1="98" y1="146" x2="178" y2="210" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#d101-arrAmber)"/>
          <!-- Coarse bumpy film causing hazy white washout -->
          <path d="M 52 212 Q 72 198 92 212 T 132 212 T 172 212 T 212 212 T 252 212 T 292 212 T 332 212" fill="none" stroke="#94a3b8" stroke-width="4"/>
          <rect x="52" y="216" width="280" height="44" fill="#cbd5e1"/>
          <text x="192" y="242" text-anchor="middle" font-size="10.2" font-weight="800" fill="#64748b">白っぽく曇る・ピント山がボケる</text>
          ${drawStatusPill(64, 284, 254, 'スパークル(ギラつき)・黒浮き発生', false)}

          ${drawPanelBox(368, 82, 324, 248, '✅ 2026 ナノテクスチャ直接エッチングガラス', '#0284c7', '#f0f9ff')}
          ${drawSunIcon(424, 134, 10)}
          <line x1="438" y1="146" x2="520" y2="206" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#d101-arrAmber)"/>
          <!-- Tiny sub-wavelength nano-etched cones scattering glare softly -->
          ${Array.from({ length: 24 })
            .map((_, i) => `<polygon points="${392 + i * 11.5},216 ${397.5 + i * 11.5},204 ${403 + i * 11.5},216" fill="#38bdf8" stroke="#0284c7" stroke-width="0.9"/>`)
            .join('')}
          <!-- Diffuse soft low-energy scattered rays -->
          <line x1="520" y1="204" x2="484" y2="156" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="3 2"/>
          <line x1="520" y1="204" x2="532" y2="146" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="3 2"/>
          <line x1="520" y1="204" x2="578" y2="160" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="3 2"/>
          <rect x="392" y="216" width="276" height="44" fill="#0f172a"/>
          <text x="530" y="242" text-anchor="middle" font-size="10.5" font-weight="900" fill="#38bdf8">鏡面反射 &lt; 0.25%！深い黒＆鮮鋭ピント！</text>
          ${drawStatusPill(404, 284, 254, '剥がれゼロ×直射日光無反射×超高精細', true)}
        `,
        cards: [
          { label: '次世代技術', line1: 'ガラス母材へ100〜300nm周期で', line2: '直接ナノエッチングを施した超低反射面' },
          { label: 'スゴい工夫', line1: '画素より遙かに細かいナノ粗面で', line2: '鏡面反射<0.25%かつスパークル極小' },
          { label: '撮影メリット', line1: '真夏のピーカン直射日光の下でも', line2: '画面が映り込まずMFピントが一発決定' },
        ],
      });

    case 'lcd_qdef_quantum_dot':
      return wrapLcdHdSvg({
        badge: 'D102',
        title: 'カドミウムフリー InP量子ドット波長変換フィルム（QDEF）',
        analogy: '青い光を粒径2.8nm/5.5nmの半導体ナノ粒でレーザー級の純緑・純赤へ変身させる魔法膜',
        accent: '#db2777',
        accentSoft: '#fce7f3',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '量子閉じ込め効果（粒径サイズによる純色スペクトル変換）', '#db2777')}
          <!-- Blue LED -> QDEF Film with small Green QDs & larger Red QDs -> Sharp RGB Peaks -->
          <rect x="48" y="138" width="54" height="136" rx="6" fill="#0284c7"/>
          <text x="75" y="206" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff" transform="rotate(-90 75 206)">青色GaN LED (450nm)</text>
          <line x1="104" y1="170" x2="150" y2="170" stroke="#38bdf8" stroke-width="3" marker-end="url(#d102-arrBlue)"/>
          <line x1="104" y1="208" x2="150" y2="208" stroke="#38bdf8" stroke-width="3" marker-end="url(#d102-arrBlue)"/>
          <line x1="104" y1="244" x2="150" y2="244" stroke="#38bdf8" stroke-width="3" marker-end="url(#d102-arrBlue)"/>
          <!-- QDEF film body with SiOx barrier walls -->
          <rect x="156" y="128" width="102" height="156" rx="6" fill="#312e81" stroke="#ec4899" stroke-width="2"/>
          <!-- Small Green InP QD (2.8nm) -->
          <circle cx="206" cy="170" r="10" fill="#22c55e" stroke="#bbf7d0" stroke-width="1.8"/>
          <text x="206" y="192" text-anchor="middle" font-size="8.6" font-weight="800" fill="#86efac">2.8nm → 530nm緑</text>
          <!-- Larger Red InP QD (5.5nm) -->
          <circle cx="206" cy="236" r="16" fill="#f43f5e" stroke="#fecdd3" stroke-width="1.8"/>
          <text x="206" y="266" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fda4af">5.5nm → 630nm赤</text>
          <!-- Sharp RGB output spectrum on right -->
          <line x1="280" y1="274" x2="424" y2="274" stroke="#64748b" stroke-width="1.4"/>
          <path d="M 290 274 Q 306 130 322 274" fill="#3b82f6" fill-opacity="0.72" stroke="#1d4ed8" stroke-width="1.8"/>
          <path d="M 332 274 Q 350 124 368 274" fill="#22c55e" fill-opacity="0.75" stroke="#15803d" stroke-width="1.8"/>
          <path d="M 378 274 Q 396 132 414 274" fill="#ef4444" fill-opacity="0.75" stroke="#b91c1c" stroke-width="1.8"/>
          <text x="352" y="116" text-anchor="middle" font-size="10" font-weight="900" fill="#be185d">半値幅 FWHM ≈ 25 nm の超鋭峰!</text>
          <text x="352" y="294" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">450nm(B) / 530nm(G) / 630nm(R)</text>
          ${drawPanelBox(456, 82, 236, 248, '圧倒的な色域と環境適合', '#059669')}
          <text x="472" y="132" font-size="10.8" font-weight="800" fill="#0f172a">シネマ＆HDR広色域カバー</text>
          <text x="472" y="158" font-size="10.2" font-weight="900" fill="#db2777">• DCI-P3 ≈ 99%</text>
          <text x="472" y="178" font-size="10.2" font-weight="900" fill="#059669">• Adobe RGB ≈ 98%</text>
          <text x="472" y="198" font-size="10.2" font-weight="900" fill="#2563eb">• BT.2020 ≈ 90%</text>
          <text x="472" y="228" font-size="9.6" font-weight="600" fill="#334155">• 有害カドミウム完全フリー(InP)</text>
          <text x="472" y="246" font-size="9.6" font-weight="600" fill="#334155">• 両面SiOxガスバリアで耐湿封止</text>
          ${drawStatusPill(470, 282, 208, '花・夕焼けの純色を忠実再現', true)}
        `,
        cards: [
          { label: '次世代技術', line1: 'CdフリーInP/ZnSeS半導体ナノ結晶', line2: '量子ドット波長変換シート(QDEF)' },
          { label: 'スゴい工夫', line1: '粒子径(2.8/5.5nm)の量子効果で', line2: '半値幅25nmの純RGBスペクトル発光' },
          { label: '撮影メリット', line1: 'DCI-P3 99%・AdobeRGB 98%で', line2: '色飽和しやすい花や夕景も正確確認' },
        ],
      });

    case 'lcd_miniled_fald_matrix':
      return wrapLcdHdSvg({
        badge: 'D103',
        title: '2Dローカルディミング Mini-LEDマトリクス＆AM駆動IC',
        analogy: '星だけ2,000nitで光らせ、夜空の部分はLEDごと完全消灯できる「碁盤目HDR光源」',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '数百ゾーン独立 2D FALD（Full-Array Local Dimming）マトリクス', '#0284c7')}
          <!-- 8 x 5 Mini-LED zone grid simulating night sky with bright star peak! -->
          ${Array.from({ length: 8 })
            .flatMap((_, c) =>
              Array.from({ length: 5 }).map((__, r) => {
                const dist = Math.hypot(c - 4.5, r - 1.8);
                const lum = dist < 1.1 ? 1.0 : dist < 2.2 ? 0.45 : 0.04;
                const fill = lum > 0.8 ? '#38bdf8' : lum > 0.3 ? '#0369a1' : '#0f172a';
                const stroke = lum > 0.8 ? '#fde047' : '#334155';
                return `<rect x="${56 + c * 44}" y="${124 + r * 34}" width="40" height="30" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${lum > 0.8 ? 2 : 1}"/>
                <circle cx="${76 + c * 44}" cy="${139 + r * 34}" r="${lum > 0.8 ? 5 : 2.5}" fill="${lum > 0.8 ? '#ffffff' : lum > 0.3 ? '#7dd3fc' : '#1e293b'}"/>`;
              })
            )
            .join('')}
          <text x="234" y="310" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0369a1">ハイライト部だけ 2,000 nit 集中発光 ＋ 暗部ゾーンは完全消灯 (0.001 nit)！</text>
          ${drawPanelBox(456, 82, 236, 248, 'エッジライト vs 2D Mini-LED', '#4f46e5')}
          <text x="472" y="130" font-size="10" font-weight="800" fill="#64748b">従来エッジライトIPS</text>
          <text x="472" y="148" font-size="9.5" font-weight="700" fill="#e11d48">• コントラスト比 ≈ 1,200 : 1</text>
          <text x="472" y="164" font-size="9.5" font-weight="700" fill="#e11d48">• 暗所で黒浮き(IPSグロー)発生</text>
          <rect x="470" y="182" width="208" height="84" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <text x="574" y="204" text-anchor="middle" font-size="10.8" font-weight="900" fill="#0369a1">2D FALD Mini-LED</text>
          <text x="574" y="224" text-anchor="middle" font-size="10.2" font-weight="900" fill="#059669">CR &gt; 100,000 : 1 !</text>
          <text x="574" y="242" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0c4a6e">ピーク輝度 2,000 nit HDR</text>
          <text x="574" y="258" text-anchor="middle" font-size="9.2" font-weight="700" fill="#4f46e5">焼き付きリスクは完全ゼロ！</text>
          ${drawStatusPill(470, 282, 208, '外付け不要の2,000nit HDR確認', true)}
        `,
        cards: [
          { label: '次世代光源', line1: '100-200μm極小GaN Mini-LEDを', line2: '背面全面へ2D配列＋AM駆動IC' },
          { label: 'スゴい工夫', line1: '12-bitゾーン別局所消灯でIPS黒浮き', line2: 'を消し焼き付きゼロのまま2,000nit' },
          { label: '撮影メリット', line1: '炎天下でも外部HDRモニターなしで', line2: 'S-Log3/HLGハイライトを正確判定' },
        ],
      });

    case 'lcd_miniled_white_cavity':
      return wrapLcdHdSvg({
        badge: 'D104',
        title: 'Mini-LED高反射マイクロ光学リフレクターカップ＆ハロー抑制ドーム',
        analogy: '極小LEDを1つずつ「白いパラボラお椀とドーム」で仕切り、隣への光滲みを止める隔壁',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '光学距離 OD &lt; 0.6 mm バットウィング配光＋隔壁遮光断面', '#0284c7')}
          <!-- 3 adjacent Mini-LED optical cavities (Center ON, Left/Right OFF!) -->
          <rect x="48" y="254" width="372" height="22" rx="3" fill="#e2e8f0" stroke="#64748b"/>
          <text x="234" y="269" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">Mini-LED 2Dマトリクス基板</text>
          <!-- Parabolic white TiO2 reflector cup walls -->
          ${[112, 234, 356]
            .map((cx, idx) => {
              const on = idx === 1;
              return `
                <polygon points="${cx - 56},176 ${cx - 34},254 ${cx + 34},254 ${cx + 56},176" fill="${on ? '#fef08a' : '#1e293b'}" fill-opacity="${on ? 0.65 : 0.85}" stroke="#94a3b8" stroke-width="2.2"/>
                <rect x="${cx - 10}" y="242" width="20" height="12" rx="2" fill="${on ? '#0284c7' : '#475569'}"/>
                <path d="M ${cx - 22} 242 Q ${cx} 214 ${cx + 22} 242 Z" fill="${on ? '#bae6fd' : '#64748b'}" fill-opacity="0.7" stroke="#0284c7"/>`;
            })
            .join('')}
          <!-- Batwing rays bouncing off walls evenly inside center zone ONLY -->
          <polyline points="234,232 204,200 204,162" fill="none" stroke="#f59e0b" stroke-width="2.2" marker-end="url(#d104-arrAmber)"/>
          <polyline points="234,232 264,200 264,162" fill="none" stroke="#f59e0b" stroke-width="2.2" marker-end="url(#d104-arrAmber)"/>
          <!-- Diffuser top sheet -->
          <rect x="48" y="148" width="372" height="16" rx="3" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
          <text x="112" y="218" text-anchor="middle" font-size="10" font-weight="900" fill="#94a3b8">隣接OFF(漆黒)</text>
          <text x="356" y="218" text-anchor="middle" font-size="10" font-weight="900" fill="#94a3b8">隣接OFF(漆黒)</text>
          ${drawCallout(178, 186, 178, 114, 1, 'TiO₂白色パラボラ隔壁 (R>97%)', '隣ゾーンへのハロー光漏れを物理遮断', '#0284c7', 'middle')}
          <text x="234" y="302" text-anchor="middle" font-size="10" font-weight="800" fill="#059669">バットウィング配光ドームが OD=0.6mm 極薄でも粒ムラゼロで均一拡散！</text>
          ${drawPanelBox(456, 82, 236, 248, 'ハロー(ブルーミング)対策', '#4f46e5')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">星空・白文字のキレを守る</text>
          <text x="472" y="156" font-size="9.6" font-weight="600" fill="#334155">• 隔壁なしMini-LEDは黒い背景の</text>
          <text x="472" y="172" font-size="9.6" font-weight="600" fill="#334155">  フォーカスピーキング周囲が白く滲む</text>
          <text x="472" y="198" font-size="9.6" font-weight="700" fill="#0284c7">• パラボラ反射カップ＋配光ドームで</text>
          <text x="472" y="214" font-size="9.6" font-weight="700" fill="#0284c7">  薄さ0.6mmのまま輪郭クッキリ！</text>
          ${drawStatusPill(470, 282, 208, '超薄OD 0.6mm×ハロー大幅抑制', true)}
        `,
        cards: [
          { label: 'どんなマイクロ光学？', line1: 'TiO₂白色パラボラ隔壁カップと', line2: 'バットウィング配光シリコーンドーム' },
          { label: 'スゴい工夫', line1: '光学距離0.6mm以下の超薄型で', line2: 'LED粒ムラと隣接ハローを同時解決' },
          { label: '撮影メリット', line1: '夜空の星や暗所メニュー文字の', line2: '周りが白く滲まず精確なピント確認' },
        ],
      });

    case 'lcd_tandem_oled_stack':
      return wrapLcdHdSvg({
        badge: 'D105',
        title: '2026フラッグシップ タンデム2層積層RGB OLED発光ユニット',
        analogy: '発光層を「2階建て」にして半分の負担で2倍の明るさと3倍以上の長寿命を実現',
        accent: '#9333ea',
        accentSoft: '#f3e8ff',
        body: `
          ${drawPanelBox(28, 82, 398, 248, '単層OLED vs 2026 タンデム2層直列スタック構造比較', '#9333ea')}
          <!-- Single Stack on left -->
          <rect x="52" y="172" width="112" height="58" rx="6" fill="#475569" stroke="#334155"/>
          <text x="108" y="196" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">従来 単層OLED</text>
          <text x="108" y="214" text-anchor="middle" font-size="9" font-weight="700" fill="#cbd5e1">電流 J → 光子 1個</text>
          <text x="108" y="252" text-anchor="middle" font-size="9.2" font-weight="800" fill="#e11d48">高輝度で焼き付きやすい</text>
          <!-- Tandem Dual-Stack on right -->
          <rect x="206" y="122" width="194" height="44" rx="6" fill="url(#d105-rgb)" stroke="#581c87" stroke-width="1.8"/>
          <text x="303" y="148" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">★ 2階: RGB発光スタック 2</text>
          <rect x="206" y="172" width="194" height="24" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1.6"/>
          <text x="303" y="188" text-anchor="middle" font-size="9.5" font-weight="900" fill="#78350f">D106 電荷生成層 CGL (ロス&lt;5%)</text>
          <rect x="206" y="202" width="194" height="44" rx="6" fill="url(#d105-rgb)" stroke="#581c87" stroke-width="1.8"/>
          <text x="303" y="228" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">★ 1階: RGB発光スタック 1</text>
          <text x="303" y="270" text-anchor="middle" font-size="10.2" font-weight="900" fill="#7c3aed">電子1個で2回発光 → 輝度 2× / 負担 J/2!</text>
          <text x="303" y="290" text-anchor="middle" font-size="9.6" font-weight="800" fill="#059669">全画面 1,000 nit / ピーク 2,000 nit / CR ∞:1</text>
          ${drawPanelBox(442, 82, 250, 248, 'カメラモニターの弱点完全克服', '#059669')}
          <text x="458" y="132" font-size="10.5" font-weight="800" fill="#0f172a">Lifetime ∝ (1 / J)^1.8</text>
          <text x="458" y="156" font-size="9.8" font-weight="700" fill="#059669">• 電流密度 J を半分にできるため</text>
          <text x="458" y="172" font-size="9.8" font-weight="700" fill="#059669">  固定UI・グリッド線の焼き付き寿命</text>
          <text x="458" y="188" font-size="10.5" font-weight="900" fill="#9333ea">  約 3.5 倍へ飛躍！</text>
          <text x="458" y="218" font-size="9.8" font-weight="600" fill="#334155">• 応答速度 &lt; 0.1 ms：−20℃極寒でも</text>
          <text x="458" y="234" font-size="9.8" font-weight="600" fill="#334155">  液晶のような低温残像ゼロ！</text>
          <text x="458" y="256" font-size="9.8" font-weight="600" fill="#0284c7">• EVFと完全同一の漆黒・色再現</text>
          ${drawStatusPill(458, 282, 218, '2倍輝度×3.5倍長寿命×完全黒', true)}
        `,
        cards: [
          { label: '2026年本命', line1: '2つのRGB OLED発光ユニットを', line2: '縦に直列積層するタンデム構造' },
          { label: 'スゴい工夫', line1: '同輝度なら電流半減で焼き付き寿命', line2: '3.5倍、最大駆動で2,000nit HDR' },
          { label: '撮影メリット', line1: '極寒−20℃でも残像ゼロ＆EVFと', line2: '完全に同じ漆黒で現場確認できる' },
        ],
      });

    case 'lcd_tandem_cgl_layer':
      return wrapLcdHdSvg({
        badge: 'D106',
        title: 'タンデムOLED超低損失チャージ生成層（CGL：光学ロス<5%）',
        analogy: '2階建てOLEDの1階と2階の間で、光を邪魔せず電子と正孔を生む「量子トンネル発電膜」',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          ${drawPanelBox(28, 82, 412, 248, 'n-CGL / p-CGL 量子トンネル接合 キャリアペア生成図', '#d97706')}
          <!-- Stack 2 Top -> p-CGL -> Tunnel interface -> n-CGL -> Stack 1 Bottom -->
          <rect x="64" y="116" width="340" height="44" rx="6" fill="#4f46e5" fill-opacity="0.82"/>
          <text x="234" y="142" text-anchor="middle" font-size="10.8" font-weight="900" fill="#ffffff">上部 OLED発光ユニット (Stack 2) ← 正孔 h⁺ 注入！</text>
          <!-- p-CGL -->
          <rect x="64" y="166" width="340" height="28" rx="4" fill="#fb7185" fill-opacity="0.45" stroke="#e11d48" stroke-width="1.6"/>
          <text x="234" y="184" text-anchor="middle" font-size="10" font-weight="900" fill="#881337">p-CGL（高仕事関数 HAT-CN / MoO₃ 正孔生成膜）</text>
          <!-- Tunnel interface sparks -->
          <line x1="64" y1="196" x2="404" y2="196" stroke="#eab308" stroke-width="3" stroke-dasharray="6 3"/>
          <!-- n-CGL -->
          <rect x="64" y="200" width="340" height="28" rx="4" fill="#38bdf8" fill-opacity="0.45" stroke="#0284c7" stroke-width="1.6"/>
          <text x="234" y="218" text-anchor="middle" font-size="10" font-weight="900" fill="#0c4a6e">n-CGL（アルカリドープ電子注入膜）</text>
          <!-- Stack 1 Bottom -->
          <rect x="64" y="234" width="340" height="44" rx="6" fill="#0f766e" fill-opacity="0.85"/>
          <text x="234" y="260" text-anchor="middle" font-size="10.8" font-weight="900" fill="#ffffff">下部 OLED発光ユニット (Stack 1) ← 電子 e⁻ 注入！</text>
          <!-- Upward h+ and downward e- arrows -->
          <line x1="124" y1="192" x2="124" y2="156" stroke="#e11d48" stroke-width="2.6" marker-end="url(#d106-arrRed)"/>
          <line x1="344" y1="202" x2="344" y2="238" stroke="#0284c7" stroke-width="2.6" marker-end="url(#d106-arrBlue)"/>
          <text x="234" y="302" text-anchor="middle" font-size="10.2" font-weight="900" fill="#b45309">可視光吸収ロス &lt; 5% ＋ マイクロキャビティ干渉整合で2層光を強め合い！</text>
          ${drawPanelBox(456, 82, 236, 248, '400+ ppi高精細での難題突破', '#7c3aed')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">横方向リーク混色を防ぐ設計</text>
          <text x="472" y="156" font-size="9.6" font-weight="600" fill="#334155">• CGLの導電性が高すぎると</text>
          <text x="472" y="172" font-size="9.6" font-weight="600" fill="#334155">  隣のRGB画素へ横漏れして混色</text>
          <text x="472" y="198" font-size="9.6" font-weight="700" fill="#7c3aed">• 2026世代は縦方向だけトンネル</text>
          <text x="472" y="214" font-size="9.6" font-weight="700" fill="#7c3aed">  導通し横方向は高抵抗に制御！</text>
          <text x="472" y="242" font-size="9.6" font-weight="600" fill="#059669">• 外部量子効率 EQE ≈ EQE₁+EQE₂</text>
          ${drawStatusPill(470, 282, 208, '光学ロス<5%＋400ppi混色ゼロ', true)}
        `,
        cards: [
          { label: 'どんな薄膜？', line1: '2層タンデムOLEDの中間に挟む', line2: 'n-CGL / p-CGL量子トンネル生成層' },
          { label: 'スゴい工夫', line1: '光学損失5%未満で電子/正孔対を生み', line2: '横リーク抑制で高精細RGB混色ゼロ' },
          { label: '撮影メリット', line1: '低電圧・低発熱のまま2倍の発光効率', line2: 'で3.2型高精細タンデムOLEDを成立' },
        ],
      });

    case 'lcd_ltpo_igzo_vrr':
      return wrapLcdHdSvg({
        badge: 'D107',
        title: 'LTPOハイブリッド酸化物（IGZO＋LTPS）1–120Hz可変リフレッシュ',
        analogy: '静止時は1Hz超省エネの「IGZO」＋連写時は120Hz爆速の「LTPS」ハイブリッド駆動',
        accent: '#0891b2',
        accentSoft: '#cffafe',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '1画素内ハイブリッド構成（LTPS駆動TFT ＋ IGZOスイッチTFT）', '#0891b2')}
          <!-- Two transistor boxes inside 1 pixel -->
          <rect x="52" y="122" width="174" height="92" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
          <text x="139" y="144" text-anchor="middle" font-size="10.5" font-weight="900" fill="#0369a1">LTPS 駆動トランジスタ</text>
          <text x="139" y="164" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0c4a6e">高移動度 μ ≈ 100 cm²/Vs</text>
          <text x="139" y="182" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0284c7">120 Hz 高速連写・動体追従</text>
          <text x="139" y="200" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">スポーツカーの高速エンジン</text>

          <rect x="242" y="122" width="178" height="92" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
          <text x="331" y="144" text-anchor="middle" font-size="10.5" font-weight="900" fill="#b45309">IGZO 酸化物スイッチTFT</text>
          <text x="331" y="164" text-anchor="middle" font-size="9.5" font-weight="700" fill="#92400e">オフ漏れ電流 ≈ 10⁻¹⁸ A!</text>
          <text x="331" y="182" text-anchor="middle" font-size="9.2" font-weight="800" fill="#d97706">1 Hz 静止画・メニュー保持</text>
          <text x="331" y="200" text-anchor="middle" font-size="8.8" font-weight="700" fill="#78350f">1秒間電圧を完全ロック！</text>

          <!-- Dynamic VRR frequency bar -->
          <rect x="52" y="232" width="368" height="44" rx="8" fill="#0f172a" stroke="#22d3ee" stroke-width="1.6"/>
          <text x="98" y="258" text-anchor="middle" font-size="10.5" font-weight="900" fill="#fde047">1 Hz (静止)</text>
          <text x="234" y="258" text-anchor="middle" font-size="10" font-weight="800" fill="#34d399">↔ 24/48/72 Hz (映画同期) ↔</text>
          <text x="372" y="258" text-anchor="middle" font-size="10.5" font-weight="900" fill="#38bdf8">120 Hz (連写)</text>
          <text x="234" y="302" text-anchor="middle" font-size="10" font-weight="800" fill="#059669">カメラ稼働の過半を占める待機・確認表示を1–10Hz化して消費電力40〜50%削減！</text>
          ${drawPanelBox(456, 82, 236, 248, '24p映画ジャダー完全ゼロ', '#4f46e5')}
          <text x="472" y="132" font-size="10.5" font-weight="800" fill="#0f172a">フレームレート完全整数倍同期</text>
          <text x="472" y="156" font-size="9.6" font-weight="600" fill="#334155">• 60Hz固定パネルで24p動画を</text>
          <text x="472" y="172" font-size="9.6" font-weight="600" fill="#334155">  見ると3:2プルダウンでカクつく</text>
          <text x="472" y="198" font-size="9.6" font-weight="700" fill="#0891b2">• LTPOなら24p→48/72/96Hzへ</text>
          <text x="472" y="214" font-size="9.6" font-weight="700" fill="#0891b2">  25p→50/100Hzへ瞬時同期！</text>
          <text x="472" y="242" font-size="9.6" font-weight="700" fill="#059669">• シャッター半押しで即120Hz復帰</text>
          ${drawStatusPill(470, 282, 208, '省電力半減×120Hz×24p無ジャダー', true)}
        `,
        cards: [
          { label: '次世代バックプレーン', line1: '高速LTPS＋超低リークIGZOを', line2: '1画素内へ混載するLTPO基板' },
          { label: 'スゴい工夫', line1: 'IGZOの10⁻¹⁸A極小リークにより', line2: 'チラつきゼロで1Hz↔120Hz自在切替' },
          { label: '撮影メリット', line1: 'メニュー確認時の電池消耗を半減し', line2: '24p映画も120fps連写も完璧追従' },
        ],
      });

    case 'lcd_utvc_vapor_chamber':
      return wrapLcdHdSvg({
        badge: 'D108',
        title: '0.3mm超薄型 焼結銅メッシュウィック・ベイパーチャンバー（UTVC）',
        analogy: '紙3枚分の銅の封筒の中で純水が蒸発・還流する「ミクロの地球水循環ヒートシンク」',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '総厚 0.30 mm 真空二相潜熱ループ断面（実効熱伝導率 3,000–5,000 W/mK）', '#ea580c')}
          <!-- Ultra-thin copper hermetic vapor chamber envelope -->
          <rect x="52" y="136" width="364" height="126" rx="14" fill="url(#d108-copper)" stroke="#7c2d12" stroke-width="2.2"/>
          <!-- Inner vacuum vapor channel -->
          <rect x="66" y="150" width="336" height="98" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="1.4"/>
          <!-- Sintered copper capillary mesh wick lining bottom & top -->
          <rect x="68" y="228" width="332" height="18" fill="url(#d108-hatch)" stroke="#9a3412"/>
          <text x="234" y="241" text-anchor="middle" font-size="9" font-weight="900" fill="#7c2d12">焼結銅メッシュ毛細管ウィック（360°重力無視で液還流 ←）</text>
          <!-- Evaporator hotspot on left -> fast vapor arrows right -> Condenser cooling right -->
          <rect x="74" y="266" width="94" height="22" rx="4" fill="#ef4444"/>
          <text x="121" y="281" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">LED/IC 発熱点</text>
          <!-- Vapor flow (gas) moving rapidly right -->
          <path d="M 116 222 Q 124 176 176 176 L 348 176 Q 378 176 378 220" fill="none" stroke="#e11d48" stroke-width="3" stroke-dasharray="6 3" marker-end="url(#d108-arrRed)"/>
          <text x="254" y="168" text-anchor="middle" font-size="10" font-weight="900" fill="#e11d48">純水蒸気（潜熱 2,260 kJ/kg 音速級拡散 →）</text>
          <!-- Liquid return along wick left -->
          <line x1="354" y1="236" x2="112" y2="236" stroke="#0284c7" stroke-width="2.6" marker-end="url(#d108-arrBlue)"/>
          <text x="234" y="308" text-anchor="middle" font-size="10" font-weight="800" fill="#9a3412">レーザー気密溶接＋内部ディンプル支柱で真空0.3mm厚でも潰れない！</text>
          ${drawPanelBox(456, 82, 236, 248, '圧倒的な面内均熱スピード', '#0284c7')}
          <text x="472" y="130" font-size="9.8" font-weight="800" fill="#64748b">純銅シート (400 W/mK)</text>
          <rect x="472" y="138" width="24" height="12" rx="3" fill="#ea580c"/>
          <text x="472" y="168" font-size="9.8" font-weight="800" fill="#475569">グラファイト (1,500 W/mK)</text>
          <rect x="472" y="176" width="76" height="12" rx="3" fill="#334155"/>
          <text x="472" y="206" font-size="10" font-weight="900" fill="#e11d48">0.3mm UTVC (4,500 W/mK!)</text>
          <rect x="472" y="214" width="198" height="16" rx="4" fill="#e11d48"/>
          <text x="472" y="252" font-size="9.6" font-weight="700" fill="#059669">4軸360°逆さでも毛細管還流持続</text>
          ${drawStatusPill(470, 282, 208, '純銅10倍の均熱力でHDR持続', true)}
        `,
        cards: [
          { label: '次世代放熱', line1: '総厚0.30mmのレーザー溶接銅製', line2: '焼結メッシュウィック・ベイパーチャンバー' },
          { label: 'スゴい工夫', line1: '減圧純水の気化潜熱と毛細管還流で', line2: '純銅約10倍の4,500W/mK均熱を実現' },
          { label: '撮影メリット', line1: '炎天下2,000nit HDRや8K収録でも', line2: '輝度制限(サーマル低下)を大幅遅延' },
        ],
      });

    case 'lcd_pcm_thermal_buffer':
      return wrapLcdHdSvg({
        badge: 'D109',
        title: '潜熱蓄熱PCM＆シリカエアロゲル断熱バリアシート',
        analogy: '本体8K熱を宇宙級断熱材で遮りつつ、氷が溶ける原理で熱ピークを飲み込む2層盾',
        accent: '#db2777',
        accentSoft: '#fce7f3',
        body: `
          ${drawPanelBox(28, 82, 412, 248, '熱ダイオード2層防衛構造（PCM 42℃潜熱蓄熱 ＋ エアロゲル超断熱）', '#db2777')}
          <!-- LCD panel on top -->
          <rect x="54" y="116" width="360" height="30" rx="5" fill="#0f172a"/>
          <text x="234" y="135" text-anchor="middle" font-size="10.2" font-weight="800" fill="#38bdf8">液晶セル / タンデムOLED（熱変色・寿命劣化から守りたい！）</text>
          <!-- Layer 1: PCM Phase-Change Buffer (42C) -->
          <rect x="54" y="154" width="360" height="44" rx="6" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
          <text x="234" y="173" text-anchor="middle" font-size="10.5" font-weight="900" fill="#9d174d">① マイクロカプセルPCM潜熱蓄熱層（融点 42℃ / 潜熱 200 J/g）</text>
          <text x="234" y="190" text-anchor="middle" font-size="9.2" font-weight="700" fill="#be185d">固体→液体への相変化で温度上昇を42℃付近に15〜30分ピタリと足止め！</text>
          <!-- Layer 2: Silica Aerogel ultra-insulation (k=0.018) -->
          <rect x="54" y="206" width="360" height="40" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
          <text x="234" y="224" text-anchor="middle" font-size="10.5" font-weight="900" fill="#0369a1">② シリカエアロゲル超断熱層（k = 0.018 W/mK &lt; 静止空気！）</text>
          <text x="234" y="240" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0c4a6e">カメラ本体からの8K 60℃熱逆流をナノ多孔質壁で完全ブロック</text>
          <!-- Hot camera body below -->
          <rect x="54" y="264" width="360" height="32" rx="5" fill="#ef4444" fill-opacity="0.88"/>
          <text x="234" y="284" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">🔥 カメラ本体背面（8K 60p長時間収録 55〜60℃熱源）</text>
          ${[120, 234, 348]
            .map((x) => `<line x1="${x}" y1="262" x2="${x}" y2="248" stroke="#dc2626" stroke-width="2.6" marker-end="url(#d109-arrRed)"/>`)
            .join('')}
          ${drawPanelBox(456, 82, 236, 248, '42℃温度プラトー（足止め効果）', '#0284c7')}
          <!-- Time vs Temp graph showing PCM flat plateau -->
          <line x1="484" y1="256" x2="670" y2="256" stroke="#64748b" stroke-width="1.4"/>
          <line x1="484" y1="130" x2="484" y2="256" stroke="#64748b" stroke-width="1.4"/>
          <polyline points="484,244 544,148 662,134" fill="none" stroke="#e11d48" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="540" y="142" font-size="9" font-weight="800" fill="#e11d48">PCMなし急昇温</text>
          <polyline points="484,244 532,196 626,196 664,168" fill="none" stroke="#db2777" stroke-width="3"/>
          <text x="580" y="188" text-anchor="middle" font-size="9.5" font-weight="900" fill="#db2777">42℃プラトー!</text>
          <text x="577" y="274" text-anchor="middle" font-size="9.2" font-weight="700" fill="#475569">8K連続収録時間 →</text>
          ${drawStatusPill(470, 286, 208, '液漏れゼロ気密パウチ＋超断熱', true)}
        `,
        cards: [
          { label: '次世代熱隔離', line1: '静止空気より断熱するエアロゲルと', line2: '42℃融解潜熱PCMの2層複合シート' },
          { label: 'スゴい工夫', line1: '8K本体の熱逆流を遮断しつつ', line2: 'PCM相転移で液晶温度を42℃に釘付け' },
          { label: '撮影メリット', line1: 'モニターを閉じた8K長時間収録でも', line2: '液晶の熱黒変・OLED劣化を防止' },
        ],
      });

    case 'lcd_hdr_waveform_tcon':
      return wrapLcdHdSvg({
        badge: 'D110',
        title: '10-bit HDR（HLG/PQ/3D LUT）ウェーブフォーム内蔵T-CON SoC',
        analogy: '外付けシネマモニターのプロ露出計測機能を丸ごとチップ内蔵した「次世代表示頭脳」',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          ${drawPanelBox(28, 82, 664, 248, 'BGA-144 次世代スマートT-CON SoC リアルタイムHDR・シネマ計測パイプライン（遅延 &lt; 4 ms）', '#4f46e5')}
          <!-- Input -> 3D LUT -> Parallel Scopes + Mini-LED Co-Proc -> Display -->
          <rect x="46" y="156" width="114" height="82" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.6"/>
          <text x="103" y="182" text-anchor="middle" font-size="10" font-weight="900" fill="#7dd3fc">BIONZ XR2</text>
          <text x="103" y="200" text-anchor="middle" font-size="9.2" font-weight="700" fill="#ffffff">10-bit S-Log3</text>
          <text x="103" y="218" text-anchor="middle" font-size="9" font-weight="700" fill="#94a3b8">HLG / PQ 入力</text>

          <line x1="160" y1="197" x2="188" y2="197" stroke="#4f46e5" stroke-width="2.6" marker-end="url(#d110-arrPurple)"/>

          <!-- Core SoC Block -->
          <rect x="192" y="114" width="322" height="174" rx="10" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.2"/>
          <text x="353" y="134" text-anchor="middle" font-size="10.8" font-weight="900" fill="#312e81">★ D110 スマートT-CON SoC (24MHz TCXO同期)</text>

          <rect x="206" y="144" width="140" height="58" rx="6" fill="#4f46e5"/>
          <text x="276" y="168" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">33³ 3D LUTエンジン</text>
          <text x="276" y="186" text-anchor="middle" font-size="8.8" font-weight="700" fill="#c7d2fe">10-bit 四面体補間</text>

          <rect x="358" y="144" width="142" height="58" rx="6" fill="#059669"/>
          <text x="429" y="168" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">HWウェーブフォーム</text>
          <text x="429" y="186" text-anchor="middle" font-size="8.8" font-weight="700" fill="#a7f3d0">フォルスカラー/RGBパレード</text>

          <rect x="206" y="212" width="294" height="62" rx="6" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
          <!-- Mini waveform trace art inside! -->
          <path d="M 220 260 Q 248 224 282 246 T 346 232 T 410 250 T 484 226" fill="none" stroke="#22c55e" stroke-width="2.2"/>
          <path d="M 220 264 Q 256 236 292 252 T 360 242 T 428 258 T 484 238" fill="none" stroke="#38bdf8" stroke-width="1.8" opacity="0.8"/>
          <text x="353" y="228" text-anchor="middle" font-size="9.2" font-weight="900" fill="#fde047">2D Mini-LED FALD調光 ＋ LTPO VRR 協調プロセッサ</text>

          <line x1="514" y1="197" x2="542" y2="197" stroke="#059669" stroke-width="2.6" marker-end="url(#d110-arrGreen)"/>

          <rect x="546" y="146" width="130" height="104" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <text x="611" y="176" text-anchor="middle" font-size="10.2" font-weight="900" fill="#34d399">カメラ背面のみで</text>
          <text x="611" y="196" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">シネマ露出完結!</text>
          <text x="611" y="218" text-anchor="middle" font-size="9" font-weight="700" fill="#7dd3fc">外部SDIモニター</text>
          <text x="611" y="234" text-anchor="middle" font-size="9" font-weight="700" fill="#7dd3fc">不要の超軽量装備</text>

          <text x="360" y="314" text-anchor="middle" font-size="10.4" font-weight="900" fill="#312e81">BIONZ負荷ゼロ＋4 ms未満の超低遅延でシネマ3D LUT・露出解析・HDR駆動を一括実行！</text>
        `,
        cards: [
          { label: '次世代頭脳', line1: 'BGA-144 10-bit HDR対応の', line2: 'ハードウェア計測内蔵T-CON SoC' },
          { label: 'スゴい工夫', line1: '33³ 3D LUT・ウェーブフォーム・', line2: 'FALD調光を4ms未満で並列演算' },
          { label: '撮影メリット', line1: '重たい外付けモニターなしでプロ級', line2: 'S-Log3/HDR露出管理が背面で完結' },
        ],
      });

    default:
      return null;
  }
}
