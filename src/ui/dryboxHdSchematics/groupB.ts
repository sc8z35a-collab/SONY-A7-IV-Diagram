import { drawCompareFrame, drawKpiBox, drawPill, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group B (11 Parts: DB12–DB22):
 * Hall Interlock, Matter/Thread IoT, SPCC Monocoque, ESD Powder Coat, Aerogel, PCM,
 * Dual-Zone Divider, ePTFE Breather, N2 Purge, Telescopic Ball Rails & Perforated Trays.
 */
export function renderDryboxGroupBSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_hall_door_interlock':
      return wrapDryboxHdSvg({
        badge: 'DB12',
        stepTag: '応答 <1ms / 無接点安全',
        title: '磁気ホール効果ドア開閉センサー ＆ ハードウェアUV-C安全遮断',
        analogy: '扉が1ミリ開いた瞬間にUV殺菌を即停止し、検品ライトを優しく点ける安全スイッチ',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          <!-- Left: Hall Effect Non-Contact Magnet Sensor -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="330" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="165" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">無接点ホール効果センサー 構造</text>
            <!-- Chassis side Hall IC -->
            <rect x="44" y="46" width="242" height="44" rx="6" fill="#14532d" stroke="#16a34a"/>
            <rect x="130" y="56" width="70" height="24" rx="4" fill="#0f172a" stroke="#34d399"/>
            <text x="165" y="72" text-anchor="middle" font-size="9.6" font-weight="800" fill="#34d399">Hall IC</text>
            <!-- Magnetic Flux Field Lines -->
            <path d="M 140 144 C 140 100 190 100 190 144" fill="none" stroke="#0284c7" stroke-width="2.2" stroke-dasharray="4 2"/>
            <path d="M 118 144 C 118 88 212 88 212 144" fill="none" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="3 2"/>
            <!-- Door side N52 magnet -->
            <rect x="116" y="144" width="49" height="28" fill="#2563eb"/>
            <rect x="165" y="144" width="49" height="28" fill="#e11d48"/>
            <text x="140" y="162" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">N</text>
            <text x="189" y="162" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">S</text>
            <text x="165" y="190" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">扉上端 N52トリガー磁石（非接触）</text>
            ${drawPill(34, 208, 262, '機械スイッチ摩耗ゼロ・数百万回開閉耐久', true)}
          </g>

          <!-- Right: 4 Simultaneous Actions on Door Open -->
          <g transform="translate(372, 82)">
            <rect x="0" y="0" width="320" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="160" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">扉オープン検知時の4大連動アクション</text>
            <rect x="16" y="36" width="288" height="44" rx="7" fill="#fff1f2" stroke="#e11d48"/>
            <text x="28" y="54" font-size="9.8" font-weight="800" fill="#9f1239">① UV-C殺菌LED 物理遮断（＜ 1 ms）</text>
            <text x="28" y="70" font-size="8.8" font-weight="600" fill="#be123c">マイコンを経由せずハード直結で目・肌を保護</text>

            <rect x="16" y="88" width="288" height="44" rx="7" fill="#fefce8" stroke="#ca8a04"/>
            <text x="28" y="106" font-size="9.8" font-weight="800" fill="#854d0e">② 検品Ra97 LEDバー 滑らかフェードON</text>
            <text x="28" y="122" font-size="8.8" font-weight="600" fill="#a16207">暗い部屋でもレンズのホコリが一目で視認可能</text>

            <rect x="16" y="140" width="288" height="44" rx="7" fill="#eff6ff" stroke="#2563eb"/>
            <text x="28" y="158" font-size="9.8" font-weight="800" fill="#1e40af">③ 除湿再生ポーズ ＆ 閉扉後ターボ待機</text>
            <text x="28" y="174" font-size="8.8" font-weight="600" fill="#1d4ed8">閉めた瞬間の湿気侵入をペルチェで急速回復</text>

            <rect x="16" y="192" width="288" height="44" rx="7" fill="#ecfdf5" stroke="#059669"/>
            <text x="28" y="210" font-size="9.8" font-weight="800" fill="#065f46">④ 60秒半ドア警報（ブザー＋スマホ通知）</text>
            <text x="28" y="226" font-size="8.8" font-weight="600" fill="#047857">うっかり閉め忘れによる湿気事故を根絶</text>
          </g>
        `,
        cards: [
          { label: '物理インターロック', line1: '開扉 1ms 未満でUV-C電源を直断', line2: 'ソフト暴走時でも絶対に安全' },
          { label: '無接点ホール素子', line1: '磁石の磁束変化だけで非接触検知', line2: 'カチッ音ゼロ・接点酸化ゼロ' },
          { label: '半ドア事故防止', line1: '60秒開けっ放しでスマホへ警告', line2: '梅雨時の閉め忘れトラブルを予防' },
        ],
      });

    case 'db_matter_thread_iot_soc':
      return wrapDryboxHdSvg({
        badge: 'DB13',
        stepTag: 'Matter over Thread / PID',
        title: 'Matter over Thread / Wi-Fi 6 トライラジオIoT ＆ 適応PID制御脳',
        analogy: '3つの除湿エンジンを自動で使い分け、専用アプリ不要でスマホ連携する司令塔',
        accent: '#2563eb',
        accentSoft: '#dbeafe',
        body: `
          <!-- System Architecture Flow Diagram -->
          <g transform="translate(24, 82)">
            <rect x="0" y="0" width="672" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="336" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">3系統ハイブリッド除湿 協調PID制御 ＆ Matterスマートホーム連携</text>

            <!-- Left Column: Inputs -->
            <rect x="18" y="40" width="166" height="44" rx="7" fill="#ecfeff" stroke="#0891b2"/>
            <text x="101" y="59" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0e7490">上下 SHT45 (DB09/10)</text>
            <text x="101" y="74" text-anchor="middle" font-size="8.6" font-weight="600" fill="#155e75">±1% RH / 露点余裕 ΔT</text>

            <rect x="18" y="96" width="166" height="44" rx="7" fill="#fef3c7" stroke="#d97706"/>
            <text x="101" y="115" text-anchor="middle" font-size="9.6" font-weight="800" fill="#92400e">SGP41 ガス (DB11)</text>
            <text x="101" y="130" text-anchor="middle" font-size="8.6" font-weight="600" fill="#b45309">VOC / NOx アウトガス</text>

            <rect x="18" y="152" width="166" height="44" rx="7" fill="#d1fae5" stroke="#059669"/>
            <text x="101" y="171" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">扉ホールスイッチ (DB12)</text>
            <text x="101" y="186" text-anchor="middle" font-size="8.6" font-weight="600" fill="#047857">開閉検知・安全ロック</text>

            <!-- Arrows Left -> Center -->
            <line x1="184" y1="62" x2="226" y2="102" stroke="#0284c7" stroke-width="2" marker-end="url(#db13-arrBlue)"/>
            <line x1="184" y1="118" x2="226" y2="118" stroke="#d97706" stroke-width="2" marker-end="url(#db13-arrAmber)"/>
            <line x1="184" y1="174" x2="226" y2="136" stroke="#059669" stroke-width="2" marker-end="url(#db13-arrGreen)"/>

            <!-- Center Brain -->
            <rect x="230" y="54" width="200" height="134" rx="10" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
            <text x="330" y="78" text-anchor="middle" font-size="10.8" font-weight="900" fill="#ffffff">トライラジオ IoT SoC</text>
            <text x="330" y="96" text-anchor="middle" font-size="9.2" font-weight="700" fill="#93c5fd">NXP RW612 / nRF54 級</text>
            <rect x="244" y="106" width="172" height="32" rx="6" fill="#2563eb"/>
            <text x="330" y="126" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">適応PID ±1.5%RH 制御</text>
            <rect x="244" y="144" width="172" height="32" rx="6" fill="#0f172a" stroke="#38bdf8"/>
            <text x="330" y="164" text-anchor="middle" font-size="9.2" font-weight="800" fill="#38bdf8">Matter over Thread + Wi-Fi 6</text>

            <!-- Arrows Center -> Right Outputs -->
            <line x1="430" y1="86" x2="474" y2="62" stroke="#0284c7" stroke-width="2" marker-end="url(#db13-arrBlue)"/>
            <line x1="430" y1="118" x2="474" y2="118" stroke="#16a34a" stroke-width="2" marker-end="url(#db13-arrGreen)"/>
            <line x1="430" y1="152" x2="474" y2="174" stroke="#7c3aed" stroke-width="2" marker-end="url(#db13-arrPurple)"/>

            <!-- Right Column: Outputs -->
            <rect x="478" y="40" width="176" height="44" rx="7" fill="#e0f2fe" stroke="#0284c7"/>
            <text x="566" y="59" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">PEM / MOF / ペルチェ切替</text>
            <text x="566" y="74" text-anchor="middle" font-size="8.6" font-weight="600" fill="#0c4a6e">省エネ巡航 ⇄ 急速回復</text>

            <rect x="478" y="96" width="176" height="44" rx="7" fill="#ecfdf5" stroke="#16a34a"/>
            <text x="566" y="115" text-anchor="middle" font-size="9.5" font-weight="800" fill="#14532d">Apple / Google / HA 連携</text>
            <text x="566" y="130" text-anchor="middle" font-size="8.6" font-weight="600" fill="#166534">専用ハブ不要・ローカル暗号</text>

            <rect x="478" y="152" width="176" height="44" rx="7" fill="#f3e8ff" stroke="#7c3aed"/>
            <text x="566" y="171" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5b21b6">365日ログ＆異常通知</text>
            <text x="566" y="186" text-anchor="middle" font-size="8.6" font-weight="600" fill="#6d28d9">外出先へ停電・高湿アラート</text>

            <text x="336" y="226" text-anchor="middle" font-size="9.4" font-weight="700" fill="#1e40af">2026年標準 Matter over Thread 対応だから、メーカークラウド終了リスクなしで10年以上スマート監視!</text>
          </g>
        `,
        cards: [
          { label: 'ハイブリッド指揮官', line1: '定常＝PEM/MOF（超省エネ）', line2: '開扉スパイク＝ペルチェ急速起動' },
          { label: 'Matter over Thread', line1: 'Apple Home / Google Home直結', line2: 'クラウド非依存でずっと安心運用' },
          { label: '365日テレメトリ', line1: '温湿度・露点・VOCを自動記録', line2: '旅行中でも異常をスマホ即通知' },
        ],
      });

    case 'db_spcc_steel_chassis':
      return wrapDryboxHdSvg({
        badge: 'DB14',
        stepTag: '1.2mm SPCC / TIG連続溶接',
        title: '1.2mm SPCC冷間圧延鋼板 モノコック溶接筐体（WVTR ＝ 0）',
        analogy: '湿気を1分子も通さず、100kgの機材を載せてもビクともしない鋼鉄のシェル',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: WVTR Comparison & Bending Stiffness t^3 -->
          <g transform="translate(26, 82)">
            ${drawCompareFrame(0, 0, 326, 250, '✅ 1.2mm 連続TIG溶接スチール（本機）', '#0284c7', '#f0f9ff')}
            <!-- Monocoque wall cutaway -->
            <rect x="26" y="42" width="274" height="72" rx="6" fill="url(#db14-steel)" stroke="#334155" stroke-width="2"/>
            <text x="163" y="72" text-anchor="middle" font-size="11.0" font-weight="900" fill="#0f172a">SPCC 冷間圧延鋼板 1.2 mm</text>
            <text x="163" y="92" text-anchor="middle" font-size="9.4" font-weight="700" fill="#1e293b">角部はロボット連続TIG溶接（隙間ゼロ）</text>
            <!-- Water vapor blocked -->
            <line x1="74" y1="138" x2="74" y2="118" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db14-arrBlue)"/>
            <text x="116" y="135" font-size="9.6" font-weight="800" fill="#0369a1">水蒸気透過率 WVTR ＝ 0.00!</text>
            <!-- EMI Faraday shield -->
            <line x1="74" y1="164" x2="74" y2="146" stroke="#7c3aed" stroke-width="2.2" stroke-dasharray="3 2"/>
            <text x="116" y="162" font-size="9.6" font-weight="800" fill="#6d28d9">強磁性ファラデー電磁波遮蔽</text>
            ${drawKpiBox(22, 178, 134, 58, '曲げ剛性比 (t³)', '3.38×', '0.8mm廉価板比', '#0284c7')}
            ${drawKpiBox(168, 178, 134, 58, '構造総耐荷重', '120 kg+', '超望遠レンズ満載OK', '#16a34a')}
          </g>

          <!-- Right: Why Plastic Dry Boxes Fail Long-Term -->
          <g transform="translate(368, 82)">
            ${drawCompareFrame(0, 0, 324, 250, '❌ プラスチック衣装ケース・薄板リベット箱', '#e11d48', '#fff1f2')}
            <rect x="24" y="44" width="276" height="44" rx="6" fill="#fecdd3" stroke="#e11d48" stroke-dasharray="5 3"/>
            <text x="162" y="70" text-anchor="middle" font-size="10.0" font-weight="800" fill="#881337">PP樹脂壁：分子の隙間から湿気がじわじわ透過</text>
            <path d="M 80 38 L 80 112 M 162 38 L 162 112 M 244 38 L 244 112" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#db14-arrBlue)"/>
            <rect x="24" y="122" width="276" height="54" rx="7" fill="#ffffff" stroke="#fda4af"/>
            <text x="162" y="142" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">薄い0.7mm鋼板＋リベット留めの弱点</text>
            <text x="162" y="160" text-anchor="middle" font-size="9.0" font-weight="600" fill="#be123c">重いレンズで箱が歪み → 扉パッキンに隙間!</text>
            ${drawPill(32, 198, 260, '精密機材は連続溶接1.2mm鋼鉄シェル一択', false)}
          </g>
        `,
        cards: [
          { label: '完全防湿壁', line1: 'プラスチックと違い水蒸気透過 0', line2: '連続TIG溶接で角の隙間もゼロ' },
          { label: 't³ の剛性法則', line1: '0.8mm → 1.2mm で剛性 3.38 倍', line2: '120kg積載でも箱がゆがまない' },
          { label: '電磁波シールド', line1: '鋼板モノコックがファラデー籠化', line2: 'カメラ基板やメモリカードを保護' },
        ],
      });

    case 'db_esd_powder_coat':
      return wrapDryboxHdSvg({
        badge: 'DB15',
        stepTag: 'IEC 61340-5-1 / 10⁶–10⁸Ω',
        title: 'IEC 61340-5-1 静電気拡散（ESD）粉体焼付塗装の抵抗帯設計',
        analogy: '「溜めすぎず、急に流しすぎない」絶妙な抵抗値で冬のパチッ静電気を消す塗装',
        accent: '#2563eb',
        accentSoft: '#dbeafe',
        body: `
          <!-- Surface Resistance Spectrum Scale -->
          <g transform="translate(24, 82)">
            <rect x="0" y="0" width="672" height="148" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="336" y="22" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">表面抵抗率 R_s（Ω/sq）と電子機器ESD安全ゾーン</text>
            <!-- Zone 1: Conductive (Too fast -> Spark!) -->
            <rect x="26" y="44" width="180" height="54" rx="6" fill="#ffe4e6" stroke="#e11d48"/>
            <text x="116" y="64" text-anchor="middle" font-size="10.0" font-weight="800" fill="#9f1239">導体域（＜ 10⁴ Ω）</text>
            <text x="116" y="82" text-anchor="middle" font-size="9.0" font-weight="600" fill="#be123c">むき出し金属：大電流スパーク危険!</text>
            <!-- Zone 2: ESD Dissipative Sweet Spot! -->
            <rect x="216" y="38" width="240" height="66" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2.4"/>
            <text x="336" y="61" text-anchor="middle" font-size="11.0" font-weight="900" fill="#14532d">✅ ESD静電気拡散帯（本機）</text>
            <text x="336" y="80" text-anchor="middle" font-size="10.2" font-weight="800" fill="#15803d">10⁶ 〜 10⁸ Ω/sq（火花ゼロ安全逃がし）</text>
            <text x="336" y="95" text-anchor="middle" font-size="8.6" font-weight="700" fill="#166534">減衰時間 τ ＜ 0.1 秒</text>
            <!-- Zone 3: Insulative (Builds up 10,000V!) -->
            <rect x="466" y="44" width="180" height="54" rx="6" fill="#fef3c7" stroke="#d97706"/>
            <text x="556" y="64" text-anchor="middle" font-size="10.0" font-weight="800" fill="#92400e">絶縁域（＞ 10¹¹ Ω）</text>
            <text x="556" y="82" text-anchor="middle" font-size="9.0" font-weight="600" fill="#b45309">一般塗装/樹脂：数千V帯電→バチッ!</text>
            <text x="336" y="130" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">導電性カーボンナノチューブ／酸化物フィラー分散・190°C無溶剤粉体焼付（膜厚 80µm）</text>
          </g>

          <!-- Bottom 3 Advantages -->
          <g transform="translate(24, 244)">
            ${drawKpiBox(0, 0, 214, 88, '露出センサー保護', '無スパーク', 'レンズ交換時の静電破壊ゼロ', '#16a34a')}
            ${drawKpiBox(229, 0, 214, 88, '無溶剤粉体焼付', 'VOC = 0', 'シンナー臭・レンズ曇りゼロ', '#2563eb')}
            ${drawKpiBox(458, 0, 214, 88, '耐食・耐傷アーマー', '70–90 μm', '20年赤サビ防止サテン仕上げ', '#475569')}
          </g>
        `,
        cards: [
          { label: '黄金抵抗ゾーン', line1: '10⁶–10⁸ Ω/sq の静電気拡散塗膜', line2: '帯電も火花放電も起こさせない' },
          { label: 'ゼロ溶剤焼付', line1: '液体塗料と違い有機溶剤ゼロ', line2: '新品開封直後から無臭＆安全' },
          { label: 'センサー保護', line1: '乾燥した防湿庫内は静電気注意', line2: '露出CMOS・CFexpressを徹底防御' },
        ],
      });

    case 'db_silica_aerogel_liner':
      return wrapDryboxHdSvg({
        badge: 'DB16',
        stepTag: '2026白書 / λ=0.015 W/m·K',
        title: 'メソ多孔質シリカエアロゲル超断熱ライナー（クヌーセン効果）',
        analogy: '空気の粒が動けない超極小迷路で「空気より熱を通さない」宇宙服断熱壁',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Knudsen Effect Nanoscale Physics -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="178" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">クヌーセン効果：なぜ静止空気より熱を通さないのか？</text>
            <!-- Nanopore silica pearl-necklace matrix -->
            <rect x="26" y="42" width="304" height="118" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
            ${[60, 108, 156, 204, 252, 296]
              .map(
                (cx, i) => `
              <circle cx="${cx}" cy="${74 + (i % 2) * 20}" r="18" fill="#ffffff" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3 2"/>
              <circle cx="${cx}" cy="${74 + (i % 2) * 20}" r="3.5" fill="#0284c7"/>
              <circle cx="${cx}" cy="${124 - (i % 2) * 14}" r="16" fill="#ffffff" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3 2"/>
              <circle cx="${cx}" cy="${124 - (i % 2) * 14}" r="3.5" fill="#0284c7"/>
            `
              )
              .join('')}
            <text x="178" y="180" text-anchor="middle" font-size="10.0" font-weight="800" fill="#0c4a6e">細孔径 10〜50 nm ＜ 空気分子の平均自由行程 (68 nm)</text>
            <text x="178" y="198" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">空気分子同士がぶつかって熱をリレーできない → 気体熱伝導を停止!</text>
            ${drawPill(34, 212, 288, 'メチル基(-CH₃)疎水率 >99% ＆ 不燃Class A1', true)}
          </g>

          <!-- Right: Thermal Conductivity Comparison -->
          <g transform="translate(396, 82)">
            <rect x="0" y="0" width="296" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="148" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">断熱材の熱伝導率 λ 比較（低いほど高性能）</text>
            <g transform="translate(18, 42)">
              <text x="0" y="12" font-size="9.4" font-weight="700" fill="#475569">グラスウール / 発泡スチロール</text>
              <rect x="0" y="18" width="234" height="18" rx="4" fill="#cbd5e1"/>
              <text x="240" y="31" font-size="9.5" font-weight="800" fill="#475569">0.038</text>

              <text x="0" y="56" font-size="9.4" font-weight="700" fill="#475569">静止空気（理論限界の壁）</text>
              <rect x="0" y="62" width="162" height="18" rx="4" fill="#93c5fd"/>
              <text x="168" y="75" font-size="9.5" font-weight="800" fill="#1d4ed8">0.026</text>

              <text x="0" y="100" font-size="9.8" font-weight="800" fill="#0284c7">本機 シリカエアロゲル (DB16)</text>
              <rect x="0" y="106" width="94" height="22" rx="4" fill="#0284c7"/>
              <text x="102" y="121" font-size="11.0" font-weight="900" fill="#0369a1">0.015 W/m·K!</text>
            </g>
            <rect x="18" y="182" width="260" height="54" rx="8" fill="#ecfdf5" stroke="#16a34a"/>
            <text x="148" y="201" text-anchor="middle" font-size="9.6" font-weight="800" fill="#14532d">2026年白書実証：急冷防露 ＞ 5時間</text>
            <text x="148" y="218" text-anchor="middle" font-size="8.8" font-weight="600" fill="#166534">15°C・80%RHの冷風直撃でも表面結露ゼロ</text>
          </g>
        `,
        cards: [
          { label: 'クヌーセン効果', line1: '10–50nmナノ穴で空気衝突を封鎖', line2: 'λ=0.015（静止空気 0.026 以下!）' },
          { label: '超薄型・超撥水', line1: '数mm厚で収納容積を狭めない', line2: '疎水率>99%＆800°C不燃Class A1' },
          { label: '防露への威力', line1: 'エアコン直撃や冬の急冷から', line2: 'カメラ室の微気候を完全に隔離' },
        ],
      });

    case 'db_pcm_anticondense_panel':
      return wrapDryboxHdSvg({
        badge: 'DB17',
        stepTag: 'PCM 22–28°C / 潜熱蓄熱',
        title: '相変化マイクロカプセル（PCM 22–28°C）結露防止内壁シート',
        analogy: '氷コップのように「溶けたり固まったり」して庫内温度の急変を止める熱のクッション',
        accent: '#7c3aed',
        accentSoft: '#f3e8ff',
        body: `
          <!-- Left: Temperature Flattening Curve (With vs Without PCM) -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="404" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="202" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">室温急変時の庫内温度カーブ（潜熱フライホイール効果）</text>
            <line x1="42" y1="204" x2="380" y2="204" stroke="#64748b" stroke-width="1.2"/>
            <line x1="42" y1="44" x2="42" y2="204" stroke="#64748b" stroke-width="1.2"/>
            <!-- PCM Phase Band 22-28C -->
            <rect x="43" y="96" width="336" height="44" fill="#a855f7" fill-opacity="0.16"/>
            <text x="372" y="112" text-anchor="end" font-size="8.8" font-weight="800" fill="#6b21a8">PCM相転移帯 (22–28°C)</text>
            <!-- Ambient wild swing curve -->
            <path d="M 46 138 Q 124 44 202 122 T 374 186" fill="none" stroke="#e11d48" stroke-width="2.0" stroke-dasharray="5 3"/>
            <text x="128" y="60" font-size="9.2" font-weight="800" fill="#be123c">外気温の急騰・急冷</text>
            <!-- PCM Flat Safe Curve -->
            <path d="M 46 124 Q 124 104 202 118 T 374 128" fill="none" stroke="#7c3aed" stroke-width="3.2"/>
            <text x="218" y="92" font-size="9.8" font-weight="900" fill="#6d28d9">PCM内壁あり：温度が超フラット!</text>
            <!-- Dew point line -->
            <line x1="42" y1="180" x2="380" y2="180" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="3 3"/>
            <text x="52" y="196" font-size="8.8" font-weight="800" fill="#0369a1">危険ライン：露点温度（PCMが壁温をずっと上に維持）</text>
            <text x="202" y="232" text-anchor="middle" font-size="9.2" font-weight="700" fill="#475569">金属キャビネット結露防止論文（PMC6723058）に基づく液状シリコーン＋PCM複合シート</text>
          </g>

          <!-- Right: Microcapsule Zoom -->
          <g transform="translate(444, 82)">
            <rect x="0" y="0" width="248" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="124" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">極小PCMカプセルの働き</text>
            <!-- Daytime: Absorb Heat -->
            <circle cx="64" cy="78" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
            <text x="64" y="76" text-anchor="middle" font-size="9.5" font-weight="800" fill="#92400e">昼：吸熱</text>
            <text x="64" y="90" text-anchor="middle" font-size="8.2" font-weight="700" fill="#b45309">固体→液体</text>
            <text x="102" y="72" font-size="9.4" font-weight="800" fill="#92400e">夏・暖房時の熱吸収</text>
            <text x="102" y="88" font-size="8.6" font-weight="600" fill="#475569">グリス軟化を防止</text>
            <!-- Nighttime: Release Heat -->
            <circle cx="64" cy="152" r="28" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
            <text x="64" y="150" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">夜：放熱</text>
            <text x="64" y="164" text-anchor="middle" font-size="8.2" font-weight="700" fill="#0c4a6e">液体→固体</text>
            <text x="102" y="146" font-size="9.4" font-weight="800" fill="#0369a1">夜間急冷の防露</text>
            <text x="102" y="162" font-size="8.6" font-weight="600" fill="#475569">壁温を露点以上に保持</text>
            ${drawKpiBox(18, 192, 212, 48, '潜熱蓄熱密度 ΔH', '160–200 J/g', '無漏洩カプセル封入', '#7c3aed')}
          </g>
        `,
        cards: [
          { label: 'エアロゲルとの違い', line1: 'DB16エアロゲル＝熱を通さない盾', line2: 'DB17 PCM＝熱を出し入れする電池' },
          { label: '相変化の魔力', line1: '22–28°Cで固体⇔液体に相転移', line2: '停電中も庫内温度を平坦に保持' },
          { label: '完全無漏洩', line1: '液状シリコーン母材へカプセル封入', line2: 'ベタつき・臭い・経年劣化ゼロ' },
        ],
      });

    case 'db_dualzone_divider_deck':
      return wrapDryboxHdSvg({
        badge: 'DB18',
        stepTag: '上段40% ∥ 下段35% RH',
        title: '上下デュアルゾーン気密断熱パーティション隔壁',
        analogy: 'ワインセラーのように1台の中で2つの違う理想湿度を使い分ける気密中床',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Cabinet Split Cross-Section -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="406" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="203" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">1台で2つのマイクロクライメートを分離</text>
            <!-- Upper Zone -->
            <rect x="26" y="36" width="354" height="74" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
            <text x="42" y="57" font-size="10.8" font-weight="900" fill="#1d4ed8">上段：ミラーレス一眼・AFレンズ室</text>
            <text x="42" y="76" font-size="9.4" font-weight="700" fill="#1e40af">目標 38–42% RH（ゴム・電子接点・光学最適）</text>
            <text x="42" y="94" font-size="8.8" font-weight="600" fill="#475569">日常的に開け閉めしても下段の湿度を乱さない</text>
            <!-- Insulated Partition Deck -->
            <rect x="20" y="116" width="326" height="24" rx="4" fill="#334155"/>
            <rect x="34" y="122" width="298" height="12" rx="2" fill="#e2e8f0"/>
            <text x="183" y="131.5" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">鋼板外皮 ＋ エアロゲル断熱芯材（熱＆湿気遮断）</text>
            <!-- Front Silicone Lip Seal -->
            <rect x="346" y="116" width="34" height="24" rx="6" fill="#0284c7"/>
            <text x="363" y="131" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">リップ</text>
            <!-- Lower Zone -->
            <rect x="26" y="146" width="354" height="84" rx="8" fill="#ecfeff" stroke="#0891b2" stroke-width="1.5"/>
            <text x="42" y="167" font-size="10.8" font-weight="900" fill="#0e7490">下段：シネマレンズ・クラシック機・充電室</text>
            <text x="42" y="186" font-size="9.4" font-weight="700" fill="#155e75">目標 30–35% RH（長期アーカイブ・低露点保管）</text>
            <text x="42" y="204" font-size="8.8" font-weight="600" fill="#475569">※ 充電ドロワー(DB26)の微熱も断熱芯材で上段へ遮断!</text>
          </g>

          <!-- Right: Dual Zone Use-Cases -->
          <g transform="translate(446, 82)">
            ${drawKpiBox(0, 0, 246, 76, 'ゾーン間クロストーク', '< 1.5% RH', '前面リップ密着で空気混合防止', '#0284c7')}
            ${drawKpiBox(0, 87, 246, 76, '最大独立湿度差', '15% RH', '例：上45%（革/木）×下30%（光学）', '#16a34a')}
            ${drawKpiBox(0, 174, 246, 76, '下段充電熱ブロック', '断熱分離', 'バッテリー充電廃熱をレンズから隔離', '#dc2626')}
          </g>
        `,
        cards: [
          { label: 'ハイブリッド撮影対応', line1: '写真カメラとシネマ/ヴィンテージを', line2: '1台の中で最適湿度へ個別設定' },
          { label: '前面シリコーンリップ', line1: '扉を閉めるとガラス内面へ密着', line2: '上下ゾーンの気流クロストーク防止' },
          { label: '熱的ゾーニング', line1: '最下段充電ベイの微かな発熱も', line2: '断熱中床が上段レンズから遮断' },
        ],
      });

    case 'db_eptfe_breather_vent':
      return wrapDryboxHdSvg({
        badge: 'DB19',
        stepTag: 'ePTFE 0.2µm / 気圧平衡',
        title: '延伸PTFE（ePTFE）気圧平衡ブリーザーメンブレン弁',
        analogy: 'ゴアテックスの親戚膜で「気圧のズレだけ逃がし、水とカビ胞子は通さない」呼吸口',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Microscopic ePTFE Node-and-Fibril Membrane -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="406" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="203" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">延伸PTFEナノ繊維膜の分子ふるい原理（孔径 ≈ 0.2 μm）</text>
            <!-- ePTFE Porous Barrier Vertical Band -->
            <rect x="176" y="42" width="54" height="170" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
            ${[56, 78, 100, 122, 144, 166, 188]
              .map(
                (y) => `
              <line x1="180" y1="${y}" x2="226" y2="${y + 8}" stroke="#94a3b8" stroke-width="1.3"/>
              <line x1="180" y1="${y + 10}" x2="226" y2="${y}" stroke="#cbd5e1" stroke-width="1.3"/>
            `
              )
              .join('')}
            <!-- Left side: Outside Threats Blocked -->
            <circle cx="96" cy="76" r="18" fill="#38bdf8" fill-opacity="0.7" stroke="#0284c7" stroke-width="1.6"/>
            <text x="96" y="80" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0c4a6e">水滴</text>
            <path d="M 122 76 L 164 76 L 148 64" fill="none" stroke="#e11d48" stroke-width="2"/>
            <text x="60" y="110" font-size="9.0" font-weight="800" fill="#be123c">疎水反発で100%遮断</text>

            <circle cx="110" cy="144" r="14" fill="#64748b"/>
            <text x="110" y="148" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">胞子</text>
            <text x="42" y="174" font-size="9.0" font-weight="800" fill="#475569">カビ胞子 2–10μm</text>
            <text x="42" y="188" font-size="8.8" font-weight="700" fill="#be123c">0.2μm穴は絶対通れない!</text>

            <!-- Gas Molecules Passing Freely for Pressure Balance -->
            <line x1="128" y1="196" x2="284" y2="196" stroke="#16a34a" stroke-width="2.6" marker-start="url(#db19-arrGreen)" marker-end="url(#db19-arrGreen)"/>
            <text x="314" y="106" text-anchor="middle" font-size="10.0" font-weight="800" fill="#15803d">乾燥空気分子</text>
            <text x="314" y="122" text-anchor="middle" font-size="9.0" font-weight="600" fill="#166534">(0.0003 μm)</text>
            <text x="314" y="142" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0284c7">気圧差 ΔP＝0</text>
            <text x="314" y="158" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">に自動バランス</text>
            <text x="203" y="234" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0369a1">台風通過・室温5°C急変時の「約80kgfの扉吸い付き力」を無害化!</text>
          </g>

          <!-- Right: KPI Stack -->
          <g transform="translate(446, 82)">
            ${drawKpiBox(0, 0, 246, 76, '微細連通孔径', '0.2 μm', 'カビ胞子(2–10µm)を99.99%遮断', '#0284c7')}
            ${drawKpiBox(0, 87, 246, 76, '防塵防水・難燃', 'IP67 / V-0', 'UL 94 V-0 焼結ePTFE膜', '#16a34a')}
            ${drawKpiBox(0, 174, 246, 76, 'パッキン寿命保護', 'ΔP → 0 Pa', '陰圧変形＆扉ロックを防止', '#475569')}
          </g>
        `,
        cards: [
          { label: 'なぜ呼吸口が必要？', line1: '完全密閉箱は5°C冷えるだけで', line2: '扉に約80kgの真空吸着力が発生' },
          { label: '0.2µm の精密ふるい', line1: '空気分子は通し、カビ胞子・ホコリ・', line2: '液滴は疎水撥水力で完全シャット' },
          { label: 'パッキン保護', line1: '内外の圧力ストレスをゼロに保ち', line2: 'いつも軽く開く＆気密長寿命化' },
        ],
      });

    case 'db_n2_purge_coupler':
      return wrapDryboxHdSvg({
        badge: 'DB20',
        stepTag: 'N₂ 99.99% / J-STD-033思想',
        title: 'ラボ仕様 乾燥窒素（N₂）クイックパージ ＆ 逆止弁ポート',
        analogy: 'ポテチ袋に窒素を詰めるように、酸化の原因「酸素」と湿気を一気に追い出す注入口',
        accent: '#0d9488',
        accentSoft: '#ccfbf1',
        body: `
          <!-- Left: N2 Purge Schematic -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="414" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="207" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">乾燥窒素ガス（N₂）パージ＆スプリング逆止弁フロー</text>
            <!-- N2 Cylinder Icon on Left -->
            <rect x="22" y="66" width="52" height="122" rx="16" fill="#0d9488" stroke="#115e59" stroke-width="1.6"/>
            <text x="48" y="122" text-anchor="middle" font-size="11.0" font-weight="900" fill="#ffffff">N₂</text>
            <text x="48" y="138" text-anchor="middle" font-size="8.2" font-weight="700" fill="#ccfbf1">乾燥窒素</text>
            <text x="48" y="150" text-anchor="middle" font-size="7.8" font-weight="600" fill="#ccfbf1">露点-60°C</text>
            <!-- Quick Coupler + Check Valve -->
            <line x1="74" y1="112" x2="116" y2="112" stroke="#0d9488" stroke-width="3.2" marker-end="url(#db20-arrGreen)"/>
            <rect x="120" y="88" width="96" height="48" rx="6" fill="#fef3c7" stroke="#b45309" stroke-width="1.6"/>
            <polygon points="154,98 182,112 154,126" fill="#b45309"/>
            <line x1="184" y1="98" x2="184" y2="126" stroke="#b45309" stroke-width="3"/>
            <text x="168" y="150" text-anchor="middle" font-size="9.0" font-weight="800" fill="#92400e">真鍮スプリング逆止弁</text>
            <text x="168" y="162" text-anchor="middle" font-size="8.4" font-weight="600" fill="#78350f">外すと瞬時に自動密閉</text>
            <!-- Micro Pressure Gauge -->
            <circle cx="168" cy="60" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
            <line x1="168" y1="60" x2="178" y2="52" stroke="#e11d48" stroke-width="2"/>
            <text x="208" y="64" font-size="8.8" font-weight="800" fill="#334155">微圧計 (+0〜5kPa)</text>
            <!-- Cabinet Interior Displacing O2 & H2O -->
            <line x1="216" y1="112" x2="254" y2="112" stroke="#0d9488" stroke-width="3.2" marker-end="url(#db20-arrGreen)"/>
            <rect x="258" y="54" width="136" height="142" rx="8" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
            <text x="326" y="82" text-anchor="middle" font-size="10.0" font-weight="800" fill="#115e59">不活性 N₂ 置換空間</text>
            <text x="326" y="106" text-anchor="middle" font-size="9.0" font-weight="700" fill="#0f766e">O₂ 酸素 → 排出</text>
            <text x="326" y="124" text-anchor="middle" font-size="9.0" font-weight="700" fill="#0f766e">H₂O 湿気 → 急降下</text>
            <text x="326" y="152" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">真鍮鏡筒・銀接点・</text>
            <text x="326" y="166" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">フィルムの酸化停止!</text>
            <text x="207" y="232" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0f766e">※ 通常運用は窒素不要（全自動電気除湿）・長期アーカイブや雨天急乾時のみ任意接続</text>
          </g>

          <!-- Right: Exponential Displacement Curve -->
          <g transform="translate(454, 82)">
            ${drawKpiBox(0, 0, 238, 76, '普段の窒素コスト', '0 円', '通常はPEM+MOF電気除湿で完結', '#16a34a')}
            ${drawKpiBox(0, 87, 238, 76, 'パージ急速乾燥', '数分で完了', '雨天ロケ大量搬入時の緊急ブースト', '#0d9488')}
            ${drawKpiBox(0, 174, 238, 76, 'ヴィンテージ保護', '無酸素保存', '真鍮・光学接着剤・金属の酸化抑制', '#4f46e5')}
          </g>
        `,
        cards: [
          { label: '任意接続ラボ機構', line1: '普段は不要、必要な時だけワンタッチ', line2: '逆止弁でボンベ脱着時の逆流ゼロ' },
          { label: '酸化劣化まで停止', line1: '湿度だけでなく酸素(O₂)も置換', line2: '博物館級ヴィンテージ機を数十年保存' },
          { label: '緊急ドライ・ブースト', line1: '雨の撮影後に機材を一気に収納時', line2: '数分で庫内をドライ状態へ回復' },
        ],
      });

    case 'db_telescopic_ball_rails':
      return wrapDryboxHdSvg({
        badge: 'DB21',
        stepTag: '耐荷重25kg / 100%全開',
        title: '3段フルエクステンション・ソフトクローズ鋼球スライドレール',
        analogy: '重い600mm大砲レンズを載せたまま指1本で奥まで引き出せる精密ベアリング線路',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: 3-Stage Telescopic Cross-Section & Ball Cage -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="386" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="193" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">3段伸縮Cチャンネル ＆ 精密鋼球転がり軸受構造</text>
            <!-- Outer Channel (Cabinet side) -->
            <rect x="26" y="54" width="210" height="32" rx="4" fill="#64748b"/>
            <text x="96" y="74" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">① 外側レール（支柱固定）</text>
            <!-- Ball bearings row 1 -->
            ${[60, 92, 124, 156, 188, 220].map((x) => `<circle cx="${x}" cy="92" r="5.5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.4"/>`).join('')}
            <!-- Mid Channel -->
            <rect x="78" y="98" width="214" height="28" rx="4" fill="#94a3b8"/>
            <text x="185" y="116" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">② 中間伸縮スライダー</text>
            <!-- Ball bearings row 2 -->
            ${[112, 144, 176, 208, 240, 272].map((x) => `<circle cx="${x}" cy="132" r="5.5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.4"/>`).join('')}
            <!-- Inner Tray Rail -->
            <rect x="142" y="138" width="218" height="28" rx="4" fill="#0284c7"/>
            <text x="251" y="156" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">③ 内側トレイレール（100%全開!）</text>
            <!-- Hydraulic Soft Close End Piston -->
            <rect x="26" y="140" width="96" height="24" rx="12" fill="#ea580c"/>
            <text x="74" y="155.5" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">ソフトクローズ</text>
            <line x1="122" y1="152" x2="140" y2="152" stroke="#ea580c" stroke-width="3"/>
            <text x="193" y="196" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">転がり摩擦係数 μ ≈ 0.002（滑り摩擦の 1/100 以下!）</text>
            ${drawPill(46, 210, 294, '無油・低アウトガス精密潤滑でレンズ汚染ゼロ', true)}
          </g>

          <!-- Right: Ergonomic Advantage -->
          <g transform="translate(426, 82)">
            ${drawKpiBox(0, 0, 266, 76, '1段あたり耐荷重', '25 kg', '600mm F4＋ボディ複数も余裕', '#0284c7')}
            ${drawKpiBox(0, 87, 266, 76, '引き出しストローク', '100% 全開', '最奥の単焦点も真上から安全取出', '#16a34a')}
            ${drawKpiBox(0, 174, 266, 76, '終端30mmソフト制動', '反動ゼロ', '押し戻し時のレンズ転がり事故防止', '#ea580c')}
          </g>
        `,
        cards: [
          { label: '転がり軸受の軽さ', line1: '25kg積載でも操作力わずか0.5N', line2: '指1本で奥の機材までアクセス' },
          { label: '100%フル引き出し', line1: '手前のレンズを避ける手間ゼロ', line2: '接触落下・傷つけ事故を激減' },
          { label: '15mmピッチ調整', line1: '四隅ステンレス支柱で高さ自在', line2: '縦置き超望遠から薄型収納まで' },
        ],
      });

    case 'db_perforated_steel_trays':
      return wrapDryboxHdSvg({
        badge: 'DB22',
        stepTag: '開口率28% / 垂直層流',
        title: 'ベンチレーション・スリット付き高剛性スライド鋼製棚板',
        analogy: 'カメラの底に湿気を溜めさせない「空気の通り道つきスチール棚」',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Top-Down + Side Airflow Visualization -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="406" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="203" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">CNC長円スリットによる垂直乾燥エア貫通メカニズム</text>
            <!-- Camera silhouette resting on tray -->
            <rect x="118" y="48" width="170" height="58" rx="8" fill="#1e293b"/>
            <rect x="174" y="34" width="58" height="16" rx="4" fill="#334155"/>
            <text x="203" y="81" text-anchor="middle" font-size="10.0" font-weight="800" fill="#f8fafc">保管中のカメラ＆レンズ</text>
            <!-- Perforated Steel Tray Cross-Section with Front/Rear Anti-Drop Lips -->
            <path d="M 38 92 L 38 122 L 368 122 L 368 92" fill="none" stroke="#475569" stroke-width="7" stroke-linejoin="round"/>
            <!-- Airflow Slots Cutouts -->
            ${[76, 126, 176, 226, 276, 326]
              .map(
                (sx) => `
              <rect x="${sx - 12}" y="118" width="24" height="8" fill="#e0f2fe"/>
              <line x1="${sx}" y1="184" x2="${sx}" y2="112" stroke="#0284c7" stroke-width="2.2" marker-end="url(#db22-arrBlue)"/>
            `
              )
              .join('')}
            <text x="203" y="202" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0369a1">開口率 28% スリットでカメラ底面まで乾燥エアが貫通!</text>
            ${drawPin(38, 96, 114, 226, 1, '前後 15mm 耐震リップ', '地震の横揺れ落下を防止', '#dc2626')}
            ${drawPin(368, 122, 304, 226, 2, 'ESD導電鋼板', 'たわみ<0.6mm＆静電接地', '#059669', 'end')}
          </g>

          <!-- Right: Steel vs Plastic Tray Compare -->
          <g transform="translate(446, 82)">
            ${drawCompareFrame(0, 0, 246, 118, '✅ CNCスリット鋼板棚（本機）', '#16a34a', '#f0fdf4')}
            <text x="16" y="48" font-size="9.4" font-weight="800" fill="#14532d">• 25kgでもたわみ ＜ 0.6 mm</text>
            <text x="16" y="68" font-size="9.4" font-weight="700" fill="#166534">• 垂直気流で上下の湿度ムラゼロ</text>
            <text x="16" y="88" font-size="9.4" font-weight="700" fill="#166534">• レール経由で筐体ESDアース導通</text>
            <text x="16" y="106" font-size="9.0" font-weight="600" fill="#166534">• ガス放出ゼロ・経年割れなし</text>

            ${drawCompareFrame(0, 132, 246, 118, '❌ 無孔プラスチック・木製棚', '#e11d48', '#fff1f2')}
            <text x="16" y="180" font-size="9.4" font-weight="700" fill="#9f1239">• 空気滞留でカメラ底が高湿化</text>
            <text x="16" y="200" font-size="9.4" font-weight="700" fill="#9f1239">• 樹脂は静電気帯電＋経年たわみ</text>
            <text x="16" y="220" font-size="9.4" font-weight="700" fill="#9f1239">• 合板はホルムアルデヒド・酸放出</text>
          </g>
        `,
        cards: [
          { label: '通気と剛性の両立', line1: '開口率28%のCNC長円スリット', line2: '25kg荷重でもたわみ0.6mm未満' },
          { label: '耐震転落ガード', line1: '前後端15mm折り曲げリップ構造', line2: '揺れてもレンズが滑り落ちにくい' },
          { label: 'ESD導通＆無ガス', line1: 'レール経由で静電気を常時逃がす', line2: '接着剤・可塑剤ガス放出もゼロ' },
        ],
      });

    default:
      return null;
  }
}
