import { drawCompareFrame, drawKpiBox, drawPill, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group C (11 Parts: DB23–DB33):
 * XPE Cradles, Ra97 LED, 35–45% RH Golden Zone Science, VDMA Fireproof Battery Bay,
 * USB-C PD 3.1 Hub, Dual UV-C 265/280nm, Visible TiO2, Carbon+HEPA, Maglev Fan,
 * Laminar Plenum & PEM Nafion-117 Electrolytic Membrane Core.
 */
export function renderDryboxGroupCSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_archival_xpe_lens_cradle':
      return wrapDryboxHdSvg({
        badge: 'DB23',
        stepTag: '独立気泡XPE / 無硫黄',
        title: '無硫黄・独立気泡XPE/EVAウェーブレンズクレイドル（ESD仕様）',
        analogy: '水を吸わず粉にならず、丸い望遠レンズを優しく2点支持する美術館仕様ベッド',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Wave Cradle Holding Telephoto Lens -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="178" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">CNCサイン波クレイドル 2点支持 ＆ 独立気泡ミクロ構造</text>
            <!-- Wave foam silhouette -->
            <path d="M 24 148 Q 58 106 92 148 Q 126 184 160 148 Q 194 106 228 148 Q 262 184 296 148 Q 318 124 332 148 L 332 186 L 24 186 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Telephoto lens barrel cradled safely in valley 1 -->
            <circle cx="126" cy="124" r="36" fill="#e2e8f0" stroke="#475569" stroke-width="2.2"/>
            <circle cx="126" cy="124" r="24" fill="url(#db23-glass)" stroke="#0284c7" stroke-width="1.4"/>
            <text x="126" y="128" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0c4a6e">70-200mm</text>
            <!-- Prime lens in valley 2 -->
            <circle cx="262" cy="134" r="28" fill="#334155" stroke="#0f172a" stroke-width="2"/>
            <circle cx="262" cy="134" r="18" fill="url(#db23-glass)" stroke="#0284c7"/>
            <text x="262" y="138" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0c4a6e">50mm</text>
            <!-- Contact support dots -->
            <circle cx="96" cy="144" r="4" fill="#10b981"/>
            <circle cx="156" cy="144" r="4" fill="#10b981"/>
            <text x="178" y="208" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">左右2点弾性保持 → 棚開閉・地震でもレンズが転がらない!</text>
            ${drawPill(46, 218, 264, '無硫黄・無可塑剤（銀接点黒化＆曇りゼロ）', true)}
          </g>

          <!-- Right: Closed-Cell XPE vs Cheap Open-Cell PU Foam -->
          <g transform="translate(396, 82)">
            ${drawCompareFrame(0, 0, 296, 118, '✅ 独立気泡XPEフォーム（本機）', '#16a34a', '#f0fdf4')}
            ${[34, 62, 90, 118].map((x) => `<circle cx="${x}" cy="64" r="11" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/>`).join('')}
            <text x="142" y="54" font-size="9.4" font-weight="800" fill="#14532d">気泡が完全独立</text>
            <text x="142" y="70" font-size="8.8" font-weight="600" fill="#166534">吸水率 ＜ 0.01 g/cm³</text>
            <text x="142" y="86" font-size="8.8" font-weight="600" fill="#166534">20年経っても加水分解・粉化ゼロ</text>
            <text x="142" y="102" font-size="8.8" font-weight="600" fill="#166534">ESD導電配合で静電対策済</text>

            ${drawCompareFrame(0, 132, 296, 118, '❌ 安価な連続気泡ウレタン(PU)', '#e11d48', '#fff1f2')}
            <path d="M 26 192 Q 44 172 62 192 Q 80 212 98 192 Q 116 172 134 192" fill="none" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2"/>
            <text x="142" y="182" font-size="9.4" font-weight="800" fill="#9f1239">湿気を吸ってカビ温床に</text>
            <text x="142" y="198" font-size="8.8" font-weight="600" fill="#be123c">数年でボロボロ黒い粉塵へ崩壊</text>
            <text x="142" y="214" font-size="8.8" font-weight="600" fill="#be123c">硫黄・可塑剤ガスがレンズ曇り源</text>
          </g>
        `,
        cards: [
          { label: '美術館アーカイブ素材', line1: '電子線架橋 独立気泡XPE/EVA', line2: '無硫黄・無可塑剤で長期安全' },
          { label: '粉化・加水分解ゼロ', line1: '安価ウレタンのように崩壊しない', line2: '20年先までセンサーへ粉塵飛散なし' },
          { label: '波型2点ホールド', line1: '円筒レンズを優しく転がり防止', line2: 'ESD配合で脱着時の帯電も抑制' },
        ],
      });

    case 'db_cri97_inspection_led':
      return wrapDryboxHdSvg({
        badge: 'DB24',
        stepTag: 'Ra≥97 / 5000K / UVゼロ',
        title: '高演色Ra97（5000K）フリッカーフリー美術館級 庫内検品LEDバー',
        analogy: '紫外線ゼロで機材を傷めず、太陽光そのままの色でレンズのホコリを見抜く照明',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        body: `
          <!-- Left: Spectral Power Distribution (Ra97 vs Cheap Ra75 Blue LED) -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="406" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="203" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">発光スペクトル比較：紫励起フルスペクトルRa97 vs 安価LED</text>
            <!-- Axes -->
            <line x1="36" y1="194" x2="380" y2="194" stroke="#64748b" stroke-width="1.2"/>
            <line x1="36" y1="44" x2="36" y2="194" stroke="#64748b" stroke-width="1.2"/>
            <!-- UV forbidden zone (<400nm) -->
            <rect x="37" y="46" width="44" height="147" fill="#f3e8ff" opacity="0.7"/>
            <text x="59" y="64" text-anchor="middle" font-size="8.2" font-weight="800" fill="#6b21a8">UV域</text>
            <text x="59" y="76" text-anchor="middle" font-size="8.0" font-weight="800" fill="#16a34a">0.0!</text>
            <!-- Cheap LED spiky spectrum with cyan & deep-red gaps -->
            <path d="M 82 192 L 106 58 L 128 168 Q 186 120 244 102 Q 290 124 328 188 L 368 192" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4 3"/>
            <text x="134" y="164" font-size="8.4" font-weight="700" fill="#64748b">安価LED：シアン谷＆赤不足</text>
            <!-- Full-Spectrum Ra97 Smooth Curve -->
            <path d="M 82 192 Q 112 96 154 90 Q 214 82 276 74 Q 332 82 368 192" fill="none" stroke="#d97706" stroke-width="3.2"/>
            <text x="250" y="64" text-anchor="middle" font-size="9.8" font-weight="900" fill="#b45309">本機 Ra≥97 / R9＞90（太陽光近似!）</text>
            <text x="82" y="208" font-size="8.4" fill="#475569">400nm</text>
            <text x="198" y="208" font-size="8.4" fill="#475569">550nm</text>
            <text x="344" y="208" font-size="8.4" fill="#475569">700nm</text>
            <text x="203" y="232" text-anchor="middle" font-size="9.2" font-weight="700" fill="#854d0e">定電流DCドライブ（フリッカー0%）＋ 開扉連動ソフトフェードイン点灯</text>
          </g>

          <!-- Right: 26° Angled Lighting Layout -->
          <g transform="translate(446, 82)">
            <rect x="0" y="0" width="246" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="123" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">左右26°内向き斜め照射の理由</text>
            <!-- Top-down cabinet view -->
            <rect x="30" y="42" width="186" height="114" rx="6" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <!-- Left & right angled LED bars -->
            <rect x="36" y="136" width="12" height="14" fill="#f59e0b" transform="rotate(-26 42 143)"/>
            <rect x="198" y="136" width="12" height="14" fill="#f59e0b" transform="rotate(26 204 143)"/>
            <!-- Light cones hitting center camera -->
            <polygon points="44,136 96,68 134,82" fill="#fde047" opacity="0.35"/>
            <polygon points="202,136 150,68 112,82" fill="#fde047" opacity="0.35"/>
            <circle cx="123" cy="84" r="18" fill="#1e293b"/>
            <text x="123" y="88" text-anchor="middle" font-size="8.4" font-weight="800" fill="#ffffff">レンズ</text>
            <text x="123" y="176" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">正面ガラスへの映り込みゼロ!</text>
            <text x="123" y="194" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">前玉の微細チリ・クモリ・羽根油を</text>
            <text x="123" y="208" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">取り出す前に一目で早期発見できる</text>
            ${drawPill(20, 218, 206, 'UV放射 0.0 μW/lm・低発熱アルミバー', true)}
          </g>
        `,
        cards: [
          { label: '太陽光級の色再現', line1: 'Ra ≥ 97 / R9 > 90 / 5,000K', line2: 'レンズコートの微妙な曇りも視認' },
          { label: '完全フリッカーゼロ', line1: 'PWM点滅なしの定電流DC駆動', line2: '紫外線ゼロでゴム・革を傷めない' },
          { label: '26°内向きツイン', line1: '前面ガラスへ反射せず奥まで均一', line2: '扉センサー連動で優しくフェードON' },
        ],
      });

    case 'db_camera_lens_showcase':
      return wrapDryboxHdSvg({
        badge: 'DB25',
        stepTag: 'ISO 9022-11 / ZEISS指針',
        title: 'カメラ＆レンズ保管の科学：なぜ「35–45% RH 黄金ゾーン」一択なのか？',
        analogy: '高すぎればカビがガラスを酸で溶かし、低すぎればゴムと接着剤がひび割れる！',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          <!-- Full-Width Relative Humidity 0% -> 100% Scientific Danger/Safe Map -->
          <g transform="translate(22, 82)">
            <rect x="0" y="0" width="676" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="338" y="21" text-anchor="middle" font-size="11.4" font-weight="900" fill="#0f172a">相対湿度（0%〜100% RH）によるカメラ・光学レンズ劣化メカニズム完全マップ</text>

            <!-- Band 1: 0-30% Over-Dry Hazard -->
            <rect x="20" y="38" width="176" height="148" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
            <rect x="20" y="38" width="176" height="26" rx="8" fill="#d97706"/>
            <text x="108" y="55" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">⚠️ 過乾燥危険 ＜ 30% RH</text>
            <text x="30" y="84" font-size="9.2" font-weight="800" fill="#92400e">• ゴムグリップ硬化・割れ</text>
            <text x="30" y="104" font-size="9.2" font-weight="800" fill="#92400e">• レンズ貼合せ接着剤収縮</text>
            <text x="30" y="124" font-size="9.2" font-weight="800" fill="#92400e">• ヘリコイドグリス分離</text>
            <text x="30" y="144" font-size="9.2" font-weight="800" fill="#92400e">• 静電気(ESD)破壊リスク増</text>
            <text x="108" y="172" text-anchor="middle" font-size="8.4" font-weight="700" fill="#b45309">ZEISS公式: 30%未満厳禁</text>

            <!-- Band 2: 35-45% GOLDEN ZONE! -->
            <rect x="208" y="32" width="204" height="160" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2.6"/>
            <rect x="208" y="32" width="204" height="28" rx="10" fill="#16a34a"/>
            <text x="310" y="50" text-anchor="middle" font-size="11.0" font-weight="900" fill="#ffffff">✨ 黄金ゾーン 35–45% RH</text>
            <text x="310" y="82" text-anchor="middle" font-size="10.4" font-weight="900" fill="#14532d">カビ胞子は完全休眠!</text>
            <text x="310" y="102" text-anchor="middle" font-size="9.4" font-weight="700" fill="#166534">発芽に必要な水分活性(Aw)不足</text>
            <text x="310" y="124" text-anchor="middle" font-size="9.4" font-weight="700" fill="#166534">ゴム・革・グリスも最適弾性</text>
            <text x="310" y="144" text-anchor="middle" font-size="9.4" font-weight="700" fill="#166534">金属接点の電気化学腐食停止</text>
            <rect x="226" y="156" width="168" height="24" rx="12" fill="#ffffff" stroke="#16a34a"/>
            <text x="310" y="172" text-anchor="middle" font-size="9.5" font-weight="900" fill="#15803d">本機目標：上40% / 下35%</text>

            <!-- Band 3: 60-100% Fungal & Corrosion Hazard -->
            <rect x="424" y="38" width="232" height="148" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
            <rect x="424" y="38" width="232" height="26" rx="8" fill="#e11d48"/>
            <text x="540" y="55" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">☠️ カビ・腐食領域 ＞ 60% RH</text>
            <text x="434" y="84" font-size="9.2" font-weight="800" fill="#9f1239">• 好乾性カビ発芽 (Aspergillus / Eurotium)</text>
            <text x="434" y="104" font-size="9.2" font-weight="800" fill="#9f1239">• シュウ酸・クエン酸がAR膜＆ガラスを</text>
            <text x="434" y="118" font-size="9.2" font-weight="800" fill="#be123c">  永久に腐食（拭いても消えない曇り!）</text>
            <text x="434" y="140" font-size="9.2" font-weight="800" fill="#9f1239">• 70%超×3日＋暗所＋皮脂ホコリで急繁殖</text>
            <text x="434" y="160" font-size="9.2" font-weight="800" fill="#9f1239">• 基板・接点のイオンマイグレーション腐食</text>

            <!-- Bottom Scale Bar -->
            <rect x="20" y="204" width="636" height="12" rx="6" fill="#e2e8f0"/>
            <rect x="20" y="204" width="176" height="12" rx="6" fill="#f59e0b"/>
            <rect x="208" y="204" width="204" height="12" fill="#16a34a"/>
            <rect x="424" y="204" width="232" height="12" rx="6" fill="#e11d48"/>
            <text x="24" y="232" font-size="9.0" font-weight="800" fill="#92400e">0%</text>
            <text x="190" y="232" font-size="9.0" font-weight="800" fill="#92400e">30%</text>
            <text x="304" y="232" font-size="9.6" font-weight="900" fill="#15803d">40% 最適</text>
            <text x="420" y="232" font-size="9.0" font-weight="800" fill="#be123c">60%</text>
            <text x="630" y="232" font-size="9.0" font-weight="800" fill="#be123c">100%</text>
          </g>
        `,
        cards: [
          { label: 'レンズカビの正体', line1: 'ガラス自体ではなくホコリ・皮脂を食べ', line2: '出す「有機酸」がAR膜を永久エッチング' },
          { label: '乾かしすぎもNG', line1: '30%未満でゴム割れ＆バルサム剥離', line2: '冬はPEM逆極性で30%割れをガード' },
          { label: '防湿庫の価値', line1: 'カメラバッグや押し入れは70%超の危険地帯', line2: '年中40%固定で数十年の資産価値を守る' },
        ],
      });

    case 'db_fireproof_battery_bay':
      return wrapDryboxHdSvg({
        badge: 'DB26',
        stepTag: 'VDMA 24994 / 耐熱1000°C',
        title: 'VDMA 24994思想 耐火セラミック断熱 ＆ 熱膨張シール充電ドロワー',
        analogy: '160℃を超えると20倍に膨らんで炎と煙を閉じ込める「バッテリー専用小型耐火金庫」',
        accent: '#dc2626',
        accentSoft: '#fee2e2',
        body: `
          <!-- Left: Normal vs Thermal Runaway Containment -->
          <g transform="translate(26, 82)">
            ${drawCompareFrame(0, 0, 326, 250, '通常時（安全充電・保管モード）', '#475569', '#f8fafc')}
            <!-- Steel + Ceramic Drawer Cutaway -->
            <rect x="28" y="48" width="270" height="118" rx="6" fill="#475569"/>
            <rect x="38" y="56" width="250" height="100" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
            <!-- Intumescent unexpanded thin strip -->
            <rect x="28" y="42" width="270" height="8" fill="#1e293b"/>
            <text x="163" y="80" text-anchor="middle" font-size="9.6" font-weight="800" fill="#334155">不燃セラミック断熱ライナー（耐熱＞1000°C）</text>
            <rect x="78" y="96" width="70" height="44" rx="4" fill="#1e293b"/>
            <text x="113" y="122" text-anchor="middle" font-size="8.8" font-weight="800" fill="#34d399">NP-FZ100</text>
            <rect x="174" y="96" width="70" height="44" rx="4" fill="#1e293b"/>
            <text x="209" y="122" text-anchor="middle" font-size="8.8" font-weight="800" fill="#34d399">V-Mount</text>
            <text x="163" y="186" text-anchor="middle" font-size="9.2" font-weight="700" fill="#475569">常温時は薄型パッキンで普通に開閉可能</text>
            ${drawPill(34, 206, 258, '上段カメラ室とは断熱隔壁(DB18)で隔離', true)}
          </g>

          <!-- Right: Emergency >160°C Intumescent Seal Activation -->
          <g transform="translate(368, 82)">
            ${drawCompareFrame(0, 0, 324, 250, '🔥 万一の熱暴走時（＞160°C 自動封鎖!）', '#dc2626', '#fff1f2')}
            <!-- Camera zone safely protected above -->
            <rect x="26" y="38" width="272" height="34" rx="6" fill="#dcfce7" stroke="#16a34a"/>
            <text x="162" y="59" text-anchor="middle" font-size="9.8" font-weight="900" fill="#14532d">✅ 上段カメラ・レンズ室は完全に無傷!</text>
            <!-- Expanded 20x Intumescent Graphite Barrier -->
            <path d="M 26 84 Q 60 72 94 84 Q 128 72 162 84 Q 196 72 230 84 Q 264 72 298 84 L 298 106 L 26 106 Z" fill="#1e293b" stroke="#dc2626" stroke-width="1.8"/>
            <text x="162" y="98" text-anchor="middle" font-size="9.0" font-weight="900" fill="#fde047">黒鉛熱膨張シール 20倍発泡で隙間を完全密閉!</text>
            <!-- Fire trapped inside ceramic box -->
            <rect x="28" y="106" width="268" height="84" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
            <text x="162" y="138" text-anchor="middle" font-size="11.0" font-weight="900" fill="#b91c1c">🔥 炎・高温ガスをセラミック室に封込</text>
            <text x="162" y="160" text-anchor="middle" font-size="9.2" font-weight="700" fill="#991b1b">背面安全リリーフ弁へ圧力を逃がし爆発防止</text>
            ${drawPill(28, 206, 268, '欧州2026基準 VDMA 24994 耐火保管思想', true)}
          </g>
        `,
        cards: [
          { label: '1,000°C耐火断熱', line1: '内壁全面に無機セラミックボード', line2: 'NMC熱暴走熱を上段へ伝えない' },
          { label: '20倍発泡黒鉛シール', line1: '160°C超で化学発泡し隙間を封鎖', line2: '有毒な煙・炎のレンズ汚染を阻止' },
          { label: '2026年の新常識', line1: 'リチウム電池は隔離保管が世界標準', line2: '数百万の光学機材と安全に共存' },
        ],
      });

    case 'db_usbc_pd31_charge_hub':
      return wrapDryboxHdSvg({
        badge: 'DB27',
        stepTag: 'PD 3.1 100W / 50%保管充電',
        title: 'USB-C PD 3.1（100W PPS）＆ 独立NTC温度遮断・庫内充電ハブ',
        analogy: '休む日は電池寿命が2倍伸びる「50%充電」で止め、発熱したら即遮断する賢い充電器',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        body: `
          <!-- Left: Battery Calendar Aging Curve (100% vs 50% Storage Charge) -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="376" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="188" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">リチウム電池の放置劣化比較（100%満充電 vs 50%保管）</text>
            <line x1="42" y1="186" x2="352" y2="186" stroke="#64748b" stroke-width="1.2"/>
            <line x1="42" y1="44" x2="42" y2="186" stroke="#64748b" stroke-width="1.2"/>
            <!-- 50% SoC Storage Curve (Flat & Long Life!) -->
            <path d="M 44 58 Q 190 66 346 82" fill="none" stroke="#16a34a" stroke-width="3.2"/>
            <text x="196" y="56" font-size="9.6" font-weight="900" fill="#15803d">50%保管モード (3.85V)：3年後も90%超!</text>
            <!-- 100% Full Charge Storage Curve (Rapid Drop!) -->
            <path d="M 44 58 Q 160 116 346 168" fill="none" stroke="#e11d48" stroke-width="2.6" stroke-dasharray="5 3"/>
            <text x="150" y="148" font-size="9.4" font-weight="800" fill="#be123c">100%満充電放置 (4.20V)：SEI成長で劣化＆膨張!</text>
            <text x="44" y="202" font-size="8.6" fill="#475569">新品 0年</text>
            <text x="184" y="202" font-size="8.6" fill="#475569">1.5年</text>
            <text x="326" y="202" font-size="8.6" fill="#475569">3年経過</text>
            ${drawPill(34, 214, 308, '撮影前夜だけワンタップで100%急速満充電へ切替!', true)}
          </g>

          <!-- Right: 4-Bay Per-Slot NTC + VOC Cutoff Architecture -->
          <g transform="translate(416, 82)">
            <rect x="0" y="0" width="276" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="138" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">4ベイ独立 NTC監視 ＆ 10ms安全遮断</text>
            ${[0, 1, 2, 3]
              .map(
                (i) => `
              <rect x="${18 + i * 62}" y="42" width="54" height="72" rx="6" fill="#1e293b" stroke="${i < 2 ? '#10b981' : '#38bdf8'}" stroke-width="1.6"/>
              <text x="${45 + i * 62}" y="66" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">Bay ${i + 1}</text>
              <text x="${45 + i * 62}" y="84" text-anchor="middle" font-size="8.0" font-weight="700" fill="${i < 2 ? '#34d399' : '#7dd3fc'}">${i < 2 ? '50%保持' : 'PD3.1'}</text>
              <circle cx="${45 + i * 62}" cy="100" r="5" fill="#f97316"/>
            `
              )
              .join('')}
            <text x="138" y="132" text-anchor="middle" font-size="9.0" font-weight="800" fill="#c2410c">● 各スロット密着 NTCサーミスタ</text>
            <rect x="18" y="146" width="240" height="88" rx="8" fill="#fff7ed" stroke="#ea580c"/>
            <text x="138" y="166" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9a3412">三重セーフティ・カットオフ</text>
            <text x="28" y="185" font-size="8.8" font-weight="700" fill="#7c2d12">① 電池温度 ＞ 45°C → 該当ベイ10ms遮断</text>
            <text x="28" y="202" font-size="8.8" font-weight="700" fill="#7c2d12">② SGP41電解液ガス検知 → 全充電即停止</text>
            <text x="28" y="219" font-size="8.8" font-weight="700" fill="#7c2d12">③ PPS細粒度制御で充電ロス発熱を最小化</text>
          </g>
        `,
        cards: [
          { label: '電池長寿命ストレージ', line1: '長期休止は 3.85V (50% SoC) 自動保持', line2: '膨張・容量低下を劇的に抑制' },
          { label: 'PD 3.1 PPS 100W', line1: '4ポート独立電力配分＆低発熱', line2: 'NP-FZ100からVマウントまで対応' },
          { label: '個別NTC＆eFuse', line1: '45°C超またはVOC異常で10ms遮断', line2: '耐火ドロワー内で安心して充電' },
        ],
      });

    case 'db_uvc_265_280_sterilizer':
      return wrapDryboxHdSvg({
        badge: 'DB28',
        stepTag: '265+280nm / オゾン0.000',
        title: 'デュアル波長 深紫外AlGaN UV-C LED（265nm＋280nm）防カビ殺菌室',
        analogy: '「DNAを切断＋修復道具も破壊」する二重紫外線で、光漏れ＆オゾンゼロ殺菌',
        accent: '#7c3aed',
        accentSoft: '#f3e8ff',
        body: `
          <!-- Left: Light-Trapped Vortex Labyrinth Chamber -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="178" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">完全遮光シェブロン迷路 ＆ 265+280nm 照射断面</text>
            <!-- Dark Labyrinth Chamber -->
            <rect x="28" y="42" width="300" height="148" rx="8" fill="#1e1b4b" stroke="#4c1d95" stroke-width="2"/>
            <!-- Top & Bottom Chevron Optical Light Traps -->
            <polyline points="42,58 76,48 110,58 144,48 178,58 212,48 246,58 280,48 314,58" fill="none" stroke="#94a3b8" stroke-width="4"/>
            <polyline points="42,174 76,184 110,174 144,184 178,174 212,184 246,174 280,184 314,174" fill="none" stroke="#94a3b8" stroke-width="4"/>
            <!-- UV-C LEDs + Cones -->
            ${[88, 148, 208, 268]
              .map(
                (lx, i) => `
              <polygon points="${lx},72 ${lx - 26},158 ${lx + 26},158" fill="url(#db28-uv)"/>
              <rect x="${lx - 10}" y="66" width="20" height="10" rx="2" fill="${i % 2 === 0 ? '#a855f7' : '#6366f1'}"/>
              <text x="${lx}" y="89" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">${i % 2 === 0 ? '265' : '280'}</text>
            `
              )
              .join('')}
            <!-- Fungal spore flowing through and inactivated -->
            <circle cx="96" cy="128" r="8" fill="#f43f5e"/>
            <line x1="108" y1="128" x2="248" y2="128" stroke="#38bdf8" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#db28-arrBlue)"/>
            <circle cx="264" cy="128" r="8" fill="#94a3b8" stroke="#cbd5e1" stroke-dasharray="2 2"/>
            <text x="178" y="152" text-anchor="middle" font-size="9.2" font-weight="800" fill="#e9d5ff">空気中の浮遊カビ胞子だけをダクト内で無力化!</text>
            <text x="178" y="208" text-anchor="middle" font-size="9.4" font-weight="800" fill="#5b21b6">迷路バッフルにより庫内レンズ・ゴムへのUV漏れ ＝ 0.0%!</text>
            ${drawPill(48, 218, 260, '水銀フリーAlGaN LED：有害オゾン発生 0 ppm', true)}
          </g>

          <!-- Right: Dual-Wavelength Synergy Action Mechanism -->
          <g transform="translate(396, 82)">
            <rect x="0" y="0" width="296" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="148" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">2024–2026論文：265＋280nm 相乗殺菌</text>
            <rect x="16" y="38" width="264" height="62" rx="8" fill="#f3e8ff" stroke="#8b5cf6" stroke-width="1.4"/>
            <text x="28" y="57" font-size="10.2" font-weight="900" fill="#5b21b6">① 265 nm（DNA吸収ピーク直撃）</text>
            <text x="28" y="75" font-size="9.0" font-weight="600" fill="#6d28d9">カビ胞子の核酸(DNA/RNA)にチミン二量体を</text>
            <text x="28" y="89" font-size="9.0" font-weight="600" fill="#6d28d9">形成し、発芽・増殖能力を瞬時に破壊</text>

            <rect x="16" y="110" width="264" height="62" rx="8" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.4"/>
            <text x="28" y="129" font-size="10.2" font-weight="900" fill="#312e81">② 280 nm（タンパク質・修復酵素破壊）</text>
            <text x="28" y="147" font-size="9.0" font-weight="600" fill="#4338ca">DNAを自分で直す酵素（光回復・暗回復）を</text>
            <text x="28" y="161" font-size="9.0" font-weight="600" fill="#4338ca">同時に破壊し、耐性カビの再発芽を完全封鎖</text>

            <rect x="16" y="184" width="264" height="52" rx="8" fill="#ecfdf5" stroke="#16a34a"/>
            <text x="148" y="204" text-anchor="middle" font-size="9.8" font-weight="800" fill="#14532d">❌ 従来185nm水銀灯はオゾンでゴム劣化</text>
            <text x="148" y="222" text-anchor="middle" font-size="9.4" font-weight="800" fill="#15803d">✅ 本機AlGaN LEDは完全オゾンゼロ!</text>
          </g>
        `,
        cards: [
          { label: '265+280nm 相乗効果', line1: 'DNA破壊＋修復酵素ブロックの二重撃', line2: '耐性の強いAspergillus胞子にも有効' },
          { label: '完全オゾンゼロ', line1: '水銀灯と違い185nm線を出さない', line2: 'カメラゴム・パッキン劣化リスクゼロ' },
          { label: '二重の光学安全', line1: '迷路光トラップでレンズへ一切非照射', line2: '開扉時はDB12が1ms未満で物理遮断' },
        ],
      });

    case 'db_tio2_photocatalyst_mesh':
      return wrapDryboxHdSvg({
        badge: 'DB29',
        stepTag: '可視光450nm / C,N-TiO₂',
        title: '可視光応答型 C/Nドープ二酸化チタン（TiO₂）光触媒 ＆ 青色LED',
        analogy: '安全な青いLEDが当たるだけで24時間「カビのエサと臭い」を水とCO₂に分解する網',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Photocatalytic Bandgap & Radical Oxidation Diagram -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="414" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="207" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">可視光（450nm青色LED）駆動 光触媒酸化分解メカニズム</text>
            <!-- 450nm Blue LED Bar -->
            <rect x="44" y="40" width="326" height="24" rx="12" fill="#0284c7"/>
            <text x="207" y="56" text-anchor="middle" font-size="9.8" font-weight="900" fill="#ffffff">450 nm 可視青色LED（夜間も24時間常時照射・安全長寿命）</text>
            <!-- Blue photons raining down -->
            ${[92, 150, 207, 264, 322].map((x) => `<line x1="${x}" y1="64" x2="${x}" y2="104" stroke="#38bdf8" stroke-width="2.4" marker-end="url(#db29-arrBlue)"/>`).join('')}
            <!-- TiO2 Coated Mesh Surface -->
            <rect x="34" y="108" width="346" height="44" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
            <text x="207" y="128" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0c4a6e">C/Nドープ アナターゼ型 TiO₂ 焼付ハニカムメッシュ</text>
            <text x="207" y="144" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0369a1">光励起で電子(e⁻)と正孔(h⁺)生成 → 表面に強力ラジカル(·OH / O₂•⁻)発生!</text>
            <!-- Oxidation Reaction Result -->
            <rect x="34" y="168" width="150" height="44" rx="7" fill="#fef3c7" stroke="#d97706"/>
            <text x="109" y="187" text-anchor="middle" font-size="9.4" font-weight="800" fill="#92400e">有機VOC・カビ栄養</text>
            <text x="109" y="202" text-anchor="middle" font-size="8.6" font-weight="600" fill="#b45309">革臭・防虫臭・有機ガス</text>
            <line x1="186" y1="190" x2="226" y2="190" stroke="#16a34a" stroke-width="3" marker-end="url(#db29-arrGreen)"/>
            <rect x="230" y="168" width="150" height="44" rx="7" fill="#dcfce7" stroke="#16a34a"/>
            <text x="305" y="187" text-anchor="middle" font-size="9.6" font-weight="900" fill="#14532d">無害な CO₂ ＋ H₂O</text>
            <text x="305" y="202" text-anchor="middle" font-size="8.6" font-weight="600" fill="#166534">へ完全酸化分解（無臭化）</text>
            <text x="207" y="234" text-anchor="middle" font-size="9.0" font-weight="700" fill="#475569">触媒は消費されないため交換不要・焼付被膜で粉落ちゼロ</text>
          </g>

          <!-- Right: Bandgap Shift Comparison -->
          <g transform="translate(454, 82)">
            ${drawKpiBox(0, 0, 238, 76, 'C/Nドープの革新', '450 nm応答', '紫外線不要で可視青色光で高活性', '#0284c7')}
            ${drawKpiBox(0, 87, 238, 76, '稼働サイクル', '24h 連続', '夜間も庫内をクリーン維持', '#16a34a')}
            ${drawKpiBox(0, 174, 238, 76, '消耗品コスト', '交換不要', '耐熱焼付メッシュで半永久触媒', '#4f46e5')}
          </g>
        `,
        cards: [
          { label: '可視光C/Nドープ', line1: '従来TiO₂の3.2eV壁をC/Nドープで低減', line2: '安全な450nm青色LEDで連続反応' },
          { label: 'UV-C(DB28)との分担', line1: 'DB28＝カビ胞子のDNA殺菌担当', line2: 'DB29＝カビのエサ＆臭気の化学分解' },
          { label: 'メンテナンスフリー', line1: '光触媒は反応で減らず半永久稼働', line2: '24時間ずっと清浄な保管環境を維持' },
        ],
      });

    case 'db_voc_carbon_hepa_filter':
      return wrapDryboxHdSvg({
        badge: 'DB30',
        stepTag: 'HEPA H13 + 添着活性炭',
        title: 'ヤシ殻活性炭 ＋ 酸性ガス吸着 ＆ HEPA H13 複合カートリッジ',
        analogy: '「N95マスク（粒子）」と「ガスマスク（有毒ガス）」を合体させた二重防衛',
        accent: '#1e293b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: 2-Stage Filtration Cutaway -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="420" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="210" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">物理捕集（HEPA H13）× 化学吸着（ヤシ殻炭）二層断面</text>
            <!-- Incoming dirty air -->
            <text x="58" y="64" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">開扉時流入エア</text>
            <circle cx="42" cy="96" r="6" fill="#64748b"/>
            <circle cx="62" cy="116" r="4" fill="#e11d48"/>
            <text x="58" y="138" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">ホコリ・カビ胞子</text>
            <text x="58" y="152" text-anchor="middle" font-size="8.4" font-weight="700" fill="#d97706">シロキサン・H₂S</text>
            <line x1="88" y1="112" x2="116" y2="112" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db30-arrBlue)"/>

            <!-- Layer 1: Pleated HEPA H13 -->
            <rect x="120" y="54" width="82" height="126" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="1.8"/>
            <polyline points="128,64 194,76 128,88 194,100 128,112 194,124 128,136 194,148 128,160 194,172" fill="none" stroke="#94a3b8" stroke-width="2.2"/>
            <text x="161" y="196" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0369a1">① HEPA H13</text>
            <text x="161" y="210" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">0.3μm 99.97%捕集</text>

            <!-- Layer 2: Honeycomb Activated Carbon -->
            <rect x="214" y="54" width="84" height="126" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
            ${[70, 96, 122, 148, 168]
              .map(
                (y) => `
              <circle cx="236" cy="${y}" r="6" fill="#334155" stroke="#64748b"/>
              <circle cx="258" cy="${y}" r="6" fill="#334155" stroke="#64748b"/>
              <circle cx="280" cy="${y}" r="6" fill="#334155" stroke="#64748b"/>
            `
              )
              .join('')}
            <text x="256" y="196" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0f172a">② 添着ヤシ殻炭</text>
            <text x="256" y="210" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">比表面積＞1100m²/g</text>

            <!-- Clean Air Out -->
            <line x1="302" y1="112" x2="334" y2="112" stroke="#16a34a" stroke-width="3.0" marker-end="url(#db30-arrGreen)"/>
            <rect x="338" y="76" width="68" height="72" rx="8" fill="#dcfce7" stroke="#16a34a"/>
            <text x="372" y="106" text-anchor="middle" font-size="9.6" font-weight="900" fill="#14532d">クリーン</text>
            <text x="372" y="124" text-anchor="middle" font-size="9.6" font-weight="900" fill="#14532d">乾燥空気</text>
            <text x="210" y="236" text-anchor="middle" font-size="9.0" font-weight="700" fill="#334155">工具不要スライド式（SGP41ガス積算値からスマホへ最適な交換時期を通知）</text>
          </g>

          <!-- Right: Target Pollutants Trapped -->
          <g transform="translate(460, 82)">
            ${drawKpiBox(0, 0, 232, 76, '微粒子・胞子捕集', '99.97%', 'HEPA H13（レンズへのホコリ激減）', '#0284c7')}
            ${drawKpiBox(0, 87, 232, 76, 'シロキサン・硫黄吸着', '＞1100 m²/g', '光触媒で砕けないSi系曇り源を捕獲', '#1e293b')}
            ${drawKpiBox(0, 174, 232, 76, '交換メンテナンス', '12–18ヶ月', '上タブを引くだけ工具不要交換', '#d97706')}
          </g>
        `,
        cards: [
          { label: '物理＋化学の二段', line1: 'HEPAが粒子(胞子・ホコリ)を止め', line2: '活性炭が気体(曇り・腐食ガス)を吸着' },
          { label: 'シロキサン対策', line1: '光触媒では分解できないSi系ガスを', line2: 'ヤシ殻炭のナノ細孔が確実に捕捉' },
          { label: 'スマート交換通知', line1: 'SGP41のVOC累積データから計算', line2: '飽和する前にスマホで交換をお知らせ' },
        ],
      });

    case 'db_maglev_circulation_fan':
      return wrapDryboxHdSvg({
        badge: 'DB31',
        stepTag: '12 dBA / 磁気浮上10万h',
        title: '磁気浮上（マグレブ）超静音マイクロ循環ファン（12 dBA）',
        analogy: '軸が宙に浮いて擦れないから「ほぼ無音・油飛びゼロ」で湿気溜まりを消す扇風機',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Maglev Non-Contact Bearing Cutaway -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="376" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="188" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">マグレブ磁気浮上ローター ＆ 無油構造断面</text>
            <!-- Fan Shroud & Swept Blades -->
            <circle cx="122" cy="126" r="64" fill="#e2e8f0" stroke="#334155" stroke-width="2.2"/>
            ${[0, 40, 80, 120, 160, 200, 240, 280, 320]
              .map(
                (deg) => `
              <path d="M 122 126 Q 138 92 122 68" fill="none" stroke="#1e293b" stroke-width="6.5" stroke-linecap="round" transform="rotate(${deg} 122 126)"/>
            `
              )
              .join('')}
            <circle cx="122" cy="126" r="22" fill="#0284c7" stroke="#0f172a" stroke-width="1.6"/>
            <text x="122" y="130" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">浮上軸</text>
            <!-- Maglev Repulsion Zoom Box -->
            <rect x="208" y="54" width="150" height="142" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="283" y="74" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">軸受 拡大図</text>
            <rect x="234" y="88" width="98" height="18" rx="3" fill="#2563eb"/>
            <text x="283" y="100.5" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">ローター磁石 (N)</text>
            <text x="283" y="122" text-anchor="middle" font-size="9.0" font-weight="900" fill="#e11d48">↕ 磁力反発浮上!</text>
            <rect x="234" y="130" width="98" height="18" rx="3" fill="#2563eb"/>
            <text x="283" y="142.5" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">固定側磁石 (N)</text>
            <text x="283" y="168" text-anchor="middle" font-size="8.8" font-weight="800" fill="#15803d">機械摩擦 ＝ ゼロ!</text>
            <text x="283" y="182" text-anchor="middle" font-size="8.4" font-weight="600" fill="#475569">グリス不要＝油飛びゼロ</text>
            ${drawPill(44, 212, 288, '9枚後退翼が 0.15 m/s の静かな層流循環を供給', true)}
          </g>

          <!-- Right: Noise Level Scale & Dead-Air Prevention -->
          <g transform="translate(416, 82)">
            <rect x="0" y="0" width="276" height="250" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="138" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">騒音レベル比較 ＆ デッドエア解消</text>
            <g transform="translate(18, 42)">
              <text x="0" y="12" font-size="9.2" font-weight="700" fill="#475569">一般的な図書館・深夜住宅街</text>
              <rect x="0" y="18" width="210" height="16" rx="4" fill="#cbd5e1"/>
              <text x="216" y="30" font-size="9.0" font-weight="800" fill="#475569">30–40 dBA</text>

              <text x="0" y="54" font-size="9.2" font-weight="700" fill="#475569">木の葉の触れ合う音</text>
              <rect x="0" y="60" width="126" height="16" rx="4" fill="#93c5fd"/>
              <text x="132" y="72" font-size="9.0" font-weight="800" fill="#1d4ed8">20 dBA</text>

              <text x="0" y="96" font-size="9.6" font-weight="900" fill="#0284c7">本機マグレブファン (DB31)</text>
              <rect x="0" y="102" width="76" height="20" rx="4" fill="#0284c7"/>
              <text x="84" y="116" font-size="10.6" font-weight="900" fill="#0369a1">≤ 12 dBA!</text>
            </g>
            ${drawKpiBox(18, 176, 114, 60, '庫内湿度ムラ', '±1.5%以内', '隅の湿気溜まりゼロ', '#16a34a')}
            ${drawKpiBox(144, 176, 114, 60, '設計寿命 L₁₀', '100,000 h', '連続 11 年以上稼働', '#0284c7')}
          </g>
        `,
        cards: [
          { label: 'デッドエア撲滅', line1: '止まった空気は55%でもカビ温床', line2: '0.15m/s微風で隅々まで±1.5%均一' },
          { label: '無油・無接触寿命', line1: 'マグレブ浮上で軸受摩耗ゼロ', line2: 'レンズを汚すグリス飛散も完全ゼロ' },
          { label: '寝室置きの静音性', line1: '木の葉の音より静かな ≤ 12 dBA', line2: '深夜の録音室・寝室でも無音感覚' },
        ],
      });

    case 'db_laminar_air_plenum':
      return wrapDryboxHdSvg({
        badge: 'DB32',
        stepTag: '比例ダンパー / 閉ループ層流',
        title: '背面デュアルゾーン層流エアダクト ＆ 電動ダンパー分配プレナム',
        analogy: '乾いた清潔エアを上段と下段へ必要な分だけ自動振り分けする空調ダクト',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Side Cutaway of Cabinet Closed-Loop Laminar Airflow -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="430" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="215" y="21" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">側面断面：1基の除湿エンジンから上下独立2ゾーンへ比例配分</text>
            <!-- Rear Air Plenum Tower (Left of diagram = Rear of cabinet) -->
            <rect x="34" y="38" width="54" height="192" rx="5" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
            <text x="61" y="96" text-anchor="middle" font-size="8.6" font-weight="800" fill="#38bdf8" transform="rotate(-90 61 96)">層流プレナム</text>
            <!-- Stepper Proportioning Damper Flap at center divider -->
            <line x1="42" y1="142" x2="80" y2="122" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
            <circle cx="61" cy="132" r="6" fill="#eab308" stroke="#0f172a"/>
            <!-- Upper Zone Airflow Loops -->
            <rect x="92" y="38" width="314" height="88" rx="6" fill="#eff6ff" stroke="#2563eb"/>
            <text x="250" y="56" text-anchor="middle" font-size="9.6" font-weight="800" fill="#1d4ed8">上段カメラ室（40% RH 目標）</text>
            <path d="M 88 72 L 352 72 Q 378 72 378 92 Q 378 112 104 112" fill="none" stroke="#0284c7" stroke-width="2.6" marker-end="url(#db32-arrBlue)"/>
            <text x="242" y="96" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0369a1">傾斜ルーバー吹出 → 棚スリット通過 → 還気</text>
            <!-- Divider Deck -->
            <rect x="92" y="130" width="314" height="10" fill="#64748b"/>
            <!-- Lower Zone Airflow Loops -->
            <rect x="92" y="144" width="314" height="86" rx="6" fill="#ecfeff" stroke="#0891b2"/>
            <text x="250" y="162" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0e7490">下段シネマ室（35% RH 目標）</text>
            <path d="M 88 180 L 352 180 Q 378 180 378 198 Q 378 216 104 216" fill="none" stroke="#0891b2" stroke-width="2.6" marker-end="url(#db32-arrBlue)"/>
            <text x="242" y="202" text-anchor="middle" font-size="8.8" font-weight="700" fill="#155e75">下段開扉時はダンパー開度UPで80%集中送風!</text>
          </g>

          <!-- Right: Key Engineering Benefits -->
          <g transform="translate(470, 82)">
            ${drawKpiBox(0, 0, 222, 76, 'ステッパー比例羽根', '0〜90°制御', '上下の湿度偏差で自動配分', '#d97706')}
            ${drawKpiBox(0, 87, 222, 76, '完全閉ループ循環', '外気混入 0', '庫内空気だけを浄化＆除湿', '#0284c7')}
            ${drawKpiBox(0, 174, 222, 76, '薄型背面ダクト', '省奥行設計', '大口径望遠レンズの奥行を確保', '#475569')}
          </g>
        `,
        cards: [
          { label: '1機2役デュアル配分', line1: 'ステッパー駆動の比例ダンパーが', line2: '上段40%・下段35%を同時に維持' },
          { label: '閉ループ層流', line1: '傾斜ルーバー→棚スリット→吸気', line2: '外気を入れず庫内全体を均一化' },
          { label: '薄型スペース効率', line1: '背面壁に沿わせたスリム設計', line2: 'レンズ収納の奥行を犠牲にしない' },
        ],
      });

    case 'db_pem_nafion_membrane':
      return wrapDryboxHdSvg({
        badge: 'DB33',
        stepTag: 'PEM Nafion-117 / 3V DC',
        title: '固体高分子電解質膜（PEM / Nafion-117）無音・無排水 電解除湿コア',
        analogy: '3Vの電気で水分子だけを水素イオンに変え、壁の向こうへワープさせる魔法の膜',
        accent: '#0891b2',
        accentSoft: '#cffafe',
        body: `
          <!-- Full Electrochemical Membrane Cutaway -->
          <g transform="translate(24, 82)">
            <rect x="0" y="0" width="466" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
            <text x="233" y="21" text-anchor="middle" font-size="11.2" font-weight="900" fill="#0f172a">PEM固体高分子電解除湿 分子輸送メカニズム（左：庫内 → 右：庫外）</text>

            <!-- Interior Humid Air Zone -->
            <rect x="18" y="40" width="136" height="162" rx="8" fill="#eff6ff" stroke="#3b82f6"/>
            <text x="86" y="58" text-anchor="middle" font-size="9.6" font-weight="800" fill="#1d4ed8">庫内（陽極・除湿側）</text>
            <text x="86" y="84" text-anchor="middle" font-size="11.0" font-weight="900" fill="#0284c7">2 H₂O (湿気)</text>
            <text x="86" y="106" text-anchor="middle" font-size="9.2" font-weight="800" fill="#1e293b">↓ 3.0V 電気分解</text>
            <text x="86" y="130" text-anchor="middle" font-size="9.6" font-weight="800" fill="#059669">O₂↑ (庫内へ返却)</text>
            <text x="86" y="150" text-anchor="middle" font-size="9.8" font-weight="900" fill="#dc2626">＋ 4 H⁺ ＋ 4 e⁻</text>
            <text x="86" y="184" text-anchor="middle" font-size="8.6" font-weight="700" fill="#1d4ed8">水滴(液体)ゼロ!</text>

            <!-- Anode Mesh -->
            <rect x="158" y="42" width="14" height="158" fill="#eab308" stroke="#854d0e"/>
            <!-- Nafion-117 Solid Polymer Membrane -->
            <rect x="172" y="42" width="122" height="158" fill="url(#db33-pem)" stroke="#0e7490" stroke-width="1.8"/>
            <text x="233" y="64" text-anchor="middle" font-size="9.8" font-weight="900" fill="#ffffff">Nafion-117 固体膜</text>
            <text x="233" y="80" text-anchor="middle" font-size="8.4" font-weight="700" fill="#cffafe">(-SO₃⁻ プロトン通路)</text>
            <!-- H+ Protons crossing membrane -->
            ${[104, 134, 164]
              .map(
                (y) => `
              <line x1="176" y1="${y}" x2="288" y2="${y}" stroke="#ffffff" stroke-width="2.4" stroke-dasharray="5 3" marker-end="url(#db33-arrRed)"/>
              <circle cx="233" cy="${y}" r="10" fill="#dc2626" stroke="#ffffff" stroke-width="1.4"/>
              <text x="233" y="${y + 3.5}" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">H⁺</text>
            `
              )
              .join('')}
            <!-- Cathode Mesh -->
            <rect x="294" y="42" width="14" height="158" fill="#eab308" stroke="#854d0e"/>

            <!-- Exterior Discharge Zone -->
            <rect x="312" y="40" width="136" height="162" rx="8" fill="#ecfdf5" stroke="#16a34a"/>
            <text x="380" y="58" text-anchor="middle" font-size="9.6" font-weight="800" fill="#15803d">庫外（陰極・排気側）</text>
            <text x="380" y="86" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1e293b">4 H⁺ ＋ O₂ ＋ 4 e⁻</text>
            <text x="380" y="108" text-anchor="middle" font-size="9.2" font-weight="800" fill="#059669">↓ 外気酸素と再結合</text>
            <text x="380" y="136" text-anchor="middle" font-size="11.0" font-weight="900" fill="#0284c7">2 H₂O (純水蒸気)</text>
            <text x="380" y="160" text-anchor="middle" font-size="8.8" font-weight="700" fill="#166534">気体のまま静かに放出!</text>
            <text x="380" y="184" text-anchor="middle" font-size="8.6" font-weight="700" fill="#047857">ドレン水・タンク一切不要</text>

            <!-- Reverse Polarity Callout -->
            ${drawPill(34, 212, 398, '💡 冬の30%割れ時：3V極性を反転すれば「逆向き微加湿」も可能!', true)}
          </g>

          <!-- Right: KPI Stack -->
          <g transform="translate(502, 82)">
            ${drawKpiBox(0, 0, 192, 76, '可動部品・騒音', '0 dBA', '完全固体素子・無振動', '#0891b2')}
            ${drawKpiBox(0, 87, 192, 76, '定常維持電力', '0.8–1.8 W', '3.0V DC 超低消費電力', '#16a34a')}
            ${drawKpiBox(0, 174, 192, 76, '双方向調湿', '除湿⇄微加湿', '極性反転で冬期過乾燥防止', '#7c3aed')}
          </g>
        `,
        cards: [
          { label: '分子ワープ除湿', line1: 'H₂OをH⁺へ分解して固体膜を横断', line2: '外側で再び気体H₂Oに戻し無排水排気' },
          { label: '完全無音・無振動', line1: 'コンプレッサー・ファン・ドレン不要', line2: '2026年11月最新研究の電解除湿核' },
          { label: '冬期過乾燥ガード', line1: '真冬に30%未満へ下がりそうな時は', line2: '3V極性を反転して優しく微加湿!' },
        ],
      });

    default:
      return null;
  }
}
