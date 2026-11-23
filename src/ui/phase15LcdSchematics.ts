import { PartExplanation } from '../assemblies/types';

/**
 * 24 bespoke beginner-friendly technical SVG schematics (320x118) for Phase 15:
 *  - Rear 4-Axis Multi-Angle LCD Monitor Standalone Micro (+24: D28–D51)
 */
export function renderPhase15LcdSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // Group 1: Front Surface, Touch Bonding & Bezel Sealing (D28–D32)
    // =========================================================================
    case 'lcd_ar_af_hardcoat':
      return wrap(`
        <rect x="20" y="64" width="96" height="22" rx="2" fill="#dbeafe" stroke="#0284c7"/>
        <rect x="20" y="54" width="96" height="10" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="20" y="42" width="96" height="12" fill="#a855f7" opacity="0.65" stroke="#7e22ce"/>
        <rect x="20" y="34" width="96" height="8" fill="#38bdf8" stroke="#0284c7"/>
        <ellipse cx="46" cy="26" rx="8" ry="6" fill="#0ea5e9" opacity="0.7"/>
        <path d="M84 16 L96 34 L108 18" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2 2"/>
        <text x="26" y="78" font-size="6.8" fill="#0369a1">強化カバーガラス</text>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">AF撥油(110°)＋AR低反射(&lt;0.8%)＋9Hハードコート</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0c4a6e">最表面3層バリア (AF/AR/HC)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・テフロン級フッ素AF膜が皮脂・水滴を弾く</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・多層AR膜が屋外の太陽光反射を1/5に低減</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・高硬度ハードコートで金具の擦り傷をガード</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・サラサラ指すべり＆晴天のピント確認に必須</text>
      `);

    case 'lcd_oca_bonding_film':
      return wrap(`
        <rect x="20" y="20" width="96" height="18" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="20" y="38" width="96" height="14" fill="#fde047" opacity="0.85" stroke="#ca8a04"/>
        <rect x="20" y="52" width="96" height="24" rx="2" fill="#1e293b" stroke="#0f172a"/>
        <line x1="68" y1="12" x2="68" y2="70" stroke="#2563eb" stroke-width="2.4"/>
        <text x="32" y="32" font-size="6.6" fill="#0369a1">ガラス n≈1.51</text>
        <text x="27" y="48" font-size="6.6" font-weight="bold" fill="#713f12">OCA 150μm n≈1.49</text>
        <text x="41" y="67" font-size="6.8" fill="#38bdf8">IPS 液晶セル</text>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">空気層ゼロ真空貼合: 内部反射&lt;0.1%・内部結露ゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#713f12">全画面透明OCAダイレクト貼合</text>
        <text x="144" y="47" font-size="6.5" fill="#854d0e">・ガラスと液晶の「空気のスキマ」を完全消去</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・真夏の直射日光でも黒が白浮きせずクッキリ</text>
        <text x="144" y="75" font-size="6.5" fill="#854d0e">・雪山でも画面の内側が絶対に曇らない</text>
        <text x="144" y="89" font-size="6.5" fill="#713f12">・ガラス一体剛性で耐衝撃性も約2〜3倍向上</text>
      `);

    case 'lcd_bezel_wp_psa_tape':
      return wrap(`
        <rect x="18" y="20" width="100" height="68" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="26" y="28" width="84" height="52" rx="3" fill="none" stroke="#38bdf8" stroke-width="3.5" stroke-dasharray="6 2"/>
        <rect x="34" y="36" width="68" height="36" rx="2" fill="#e0f2fe"/>
        <text x="45" y="57" font-size="7" font-weight="bold" fill="#0369a1">有効表示エリア</text>
        <text x="12" y="112" font-size="7.1" fill="#1e293b">360°独立気泡防水フォームPSA＋黒セラミック額縁</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">外周防水PSAテープ＆黒額縁</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・画面のフチを1周密閉する防水スポンジ両面</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・雨粒・砂埃の侵入を360°切れ目なく遮断</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・落下時に枠のエッジ衝撃をクッション吸収</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・黒ベゼル印刷が配線と端の光漏れを完全隠蔽</text>
      `);

    case 'lcd_ito_touch_bridge':
      return wrap(`
        <rect x="18" y="20" width="100" height="68" rx="4" fill="#f0f9ff" stroke="#0284c7"/>
        ${[36, 60, 84, 104]
          .flatMap((cx) =>
            [36, 56, 74].map(
              (cy) => `<polygon points="${cx},${cy - 8} ${cx + 8},${cy} ${cx},${cy + 8} ${cx - 8},${cy}" fill="#38bdf8" fill-opacity="0.45" stroke="#0284c7" stroke-width="1"/>`
            )
          )
          .join('')}
        <circle cx="60" cy="56" r="4" fill="#f59e0b" stroke="#92400e"/>
        <text x="26" y="96" font-size="6.4" fill="#0369a1">Tx/Rx 透明ITO ＋ SiO₂立体交差</text>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">相互静電容量ITO格子: ΔCm ≈ 1pF を240Hz検知</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0c4a6e">透明ITOダイヤモンドタッチ網</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・透明なのに電気を通す極薄25nmの碁盤目</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・縦線Txと横線Rxが絶縁ブリッジで立体交差</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・指の微小な電気変化を0.004秒で位置特定</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・光透過率90%超で画質を一切ジャマしない</text>
      `);

    case 'lcd_front_rear_pol_psa':
      return wrap(`
        <rect x="20" y="26" width="22" height="58" rx="2" fill="#6366f1" stroke="#312e81"/>
        <line x1="25" y1="36" x2="37" y2="36" stroke="#ffffff" stroke-width="1.3"/>
        <line x1="25" y1="48" x2="37" y2="48" stroke="#ffffff" stroke-width="1.3"/>
        <line x1="25" y1="60" x2="37" y2="60" stroke="#ffffff" stroke-width="1.3"/>
        <line x1="25" y1="72" x2="37" y2="72" stroke="#ffffff" stroke-width="1.3"/>
        <path d="M44 55 Q68 35 90 55" fill="none" stroke="#f59e0b" stroke-width="2.4"/>
        <rect x="92" y="26" width="22" height="58" rx="2" fill="#4338ca" stroke="#1e1b4b"/>
        <line x1="98" y1="32" x2="98" y2="78" stroke="#ffffff" stroke-width="1.3"/>
        <line x1="103" y1="32" x2="103" y2="78" stroke="#ffffff" stroke-width="1.3"/>
        <line x1="108" y1="32" x2="108" y2="78" stroke="#ffffff" stroke-width="1.3"/>
        <text x="20" y="21" font-size="6.5" font-weight="bold" fill="#4338ca">表0°(D16)</text>
        <text x="86" y="21" font-size="6.5" font-weight="bold" fill="#312e81">裏90°(D32)</text>
        <text x="53" y="72" font-size="6.6" fill="#b45309">液晶ひねり</text>
        <text x="12" y="112" font-size="7.1" fill="#312e81">TAC＋延伸ヨウ素PVA 90°入射偏光板(偏光度99.98%)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#312e81">背面90°入射偏光板＆TAC保護</text>
        <text x="144" y="47" font-size="6.5" fill="#3730a3">・表と裏の2枚すだれで光のシャッターが完成</text>
        <text x="144" y="61" font-size="6.5" fill="#3730a3">・バラバラなLED光を真っ直ぐな90°偏光に整列</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・湿気に弱いPVAを上下2枚のTAC膜で保護</text>
        <text x="144" y="89" font-size="6.5" fill="#312e81">・99.98%の高偏光度で引き締まった黒を実現</text>
      `);

    // =========================================================================
    // Group 2: Inside the IPS Liquid Crystal Cell (D33–D37)
    // =========================================================================
    case 'lcd_cf_black_matrix':
      return wrap(`
        <rect x="18" y="22" width="100" height="64" rx="3" fill="#0f172a"/>
        ${[0, 1, 2].flatMap((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => {
            const colors = ['#ef4444', '#22c55e', '#3b82f6'];
            return `<rect x="${23 + col * 15}" y="${27 + row * 19}" width="12" height="15" rx="1" fill="${colors[col % 3]}"/>`;
          })
        ).join('')}
        <text x="12" y="112" font-size="7.1" fill="#be185d">DCI-P3 RGBステンドグラス(210万粒)＋黒BM格子</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fdf2f8" stroke="#db2777"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#831843">RGBカラーフィルター＆BM格子</text>
        <text x="144" y="47" font-size="6.5" fill="#831843">・白黒液晶に色を付ける210万個の極小色窓</text>
        <text x="144" y="61" font-size="6.5" fill="#831843">・真っ黒なBM格子が隣同士の色混ざりを遮断</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・映画規格DCI-P3相当の鮮やかで正確な発色</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・R/G/Bの3ドット合計＝カタログの約210万ドット</text>
      `);

    case 'lcd_lc_photo_spacers':
      return wrap(`
        <rect x="18" y="24" width="100" height="12" fill="#cbd5e1" stroke="#475569"/>
        <rect x="18" y="70" width="100" height="12" fill="#94a3b8" stroke="#475569"/>
        <rect x="26" y="36" width="84" height="34" fill="#ccfbf1" opacity="0.8"/>
        <rect x="18" y="36" width="8" height="34" fill="#ea580c"/>
        <rect x="110" y="36" width="8" height="34" fill="#ea580c"/>
        <rect x="44" y="36" width="7" height="34" rx="1" fill="#eab308" stroke="#854d0e"/>
        <rect x="82" y="36" width="7" height="34" rx="1" fill="#eab308" stroke="#854d0e"/>
        <text x="53" y="56" font-size="7" font-weight="bold" fill="#0f766e">3.2 μm</text>
        <text x="12" y="112" font-size="7.1" fill="#0f766e">フォトスペーサー柱(±0.05μm維持)＋外周UVシールダム</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#134e4a">液晶層・3.2μm柱＆外周ダム</text>
        <text x="144" y="47" font-size="6.5" fill="#115e59">・何万本もの極小「つっかえ棒」が隙間を保持</text>
        <text x="144" y="61" font-size="6.5" fill="#115e59">・指で強く押してもすぐ元の3.2μmへ弾性復元</text>
        <text x="144" y="75" font-size="6.5" fill="#c2410c">・外周のUV接着ダムが液晶液を1滴も漏らさない</text>
        <text x="144" y="89" font-size="6.5" fill="#334155">・雪山の低温でも動きが鈍りにくい低粘性液晶</text>
      `);

    case 'lcd_pi_alignment_films':
      return wrap(`
        <rect x="18" y="24" width="100" height="10" fill="#8b5cf6" stroke="#5b21b6"/>
        <rect x="18" y="72" width="100" height="10" fill="#8b5cf6" stroke="#5b21b6"/>
        ${[34, 54, 74, 94]
          .flatMap((cx) =>
            [45, 60].map(
              (cy) => `<ellipse cx="${cx}" cy="${cy}" rx="7.5" ry="3.2" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>`
            )
          )
          .join('')}
        <text x="26" y="20" font-size="6.6" font-weight="bold" fill="#5b21b6">光配向PI極薄膜 (50nm)</text>
        <text x="12" y="112" font-size="7.1" fill="#5b21b6">非接触UV光配向(プレチルト0°): 液晶分子を完全整列</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#4c1d95">上下ポリイミド(PI)光配向膜</text>
        <text x="144" y="47" font-size="6.5" fill="#5b21b6">・お米粒状の液晶分子を同じ向きへ揃えるレール</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・偏光UVの非接触加工でこすり傷・ゴミがゼロ</text>
        <text x="144" y="75" font-size="6.5" fill="#5b21b6">・電圧OFFで完全整列し黒浮き(IPSグロー)抑制</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・厚さわずか50nm(髪の毛の1500分の1)</text>
      `);

    case 'lcd_ltps_tft_comb_array':
      return wrap(`
        <rect x="18" y="68" width="100" height="16" rx="2" fill="#334155"/>
        ${[28, 48, 68, 88, 104].map((x, idx) => `<rect x="${x}" y="58" width="6" height="10" fill="${idx % 2 === 0 ? '#eab308' : '#38bdf8'}"/>`).join('')}
        <path d="M34 56 Q41 44 48 56 M54 56 Q61 44 68 56 M74 56 Q81 44 88 56" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="2 1"/>
        <ellipse cx="41" cy="40" rx="8" ry="3.2" fill="#10b981" transform="rotate(28 41 40)"/>
        <ellipse cx="61" cy="40" rx="8" ry="3.2" fill="#10b981" transform="rotate(28 61 40)"/>
        <ellipse cx="81" cy="40" rx="8" ry="3.2" fill="#10b981" transform="rotate(28 81 40)"/>
        <text x="26" y="24" font-size="6.8" font-weight="bold" fill="#0369a1">横電界 E_xy (水平回転)</text>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">LTPS(100倍高速)＋IPSくし歯電極: 178°広視野角</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0c4a6e">LTPS画素スイッチ＆IPSくし歯電極</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・210万ドット全てに付く超高速スイッチ(LTPS)</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・クシの歯電極の横電気で分子が水平回転</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・上下左右178°どの角度から見ても色変化ゼロ</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・額縁に駆動回路(GIP)を内蔵しスリム化</text>
      `);

    case 'lcd_acf_cog_ddic':
      return wrap(`
        <rect x="24" y="20" width="88" height="20" rx="2" fill="#1e293b" stroke="#0f172a"/>
        <text x="38" y="33" font-size="7" font-weight="bold" fill="#38bdf8">COG ドライバIC</text>
        <rect x="20" y="42" width="96" height="16" fill="#fef08a" opacity="0.85" stroke="#ca8a04"/>
        ${[32, 50, 68, 86, 102].map((cx) => `<rect x="${cx - 4}" y="40" width="8" height="4" fill="#eab308"/><circle cx="${cx}" cy="50" r="4" fill="#d97706" stroke="#78350f"/><rect x="${cx - 4}" y="56" width="8" height="4" fill="#eab308"/>`).join('')}
        <rect x="20" y="60" width="96" height="18" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <text x="36" y="72" font-size="6.8" fill="#0369a1">TFT ガラス基板端</text>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">ACF(φ3μm金粒子): 縦R_Z&lt;1Ω / 横R_XY&gt;10⁹Ω絶縁</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#713f12">ACF異方性導電膜＆COG直付けIC</text>
        <text x="144" y="47" font-size="6.5" fill="#854d0e">・縦に潰した所だけ導通する魔法のつぶつぶ膜</text>
        <text x="144" y="61" font-size="6.5" fill="#854d0e">・横の隣同士は絶対ショートせず数千端子接続</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・熱でガラスを割らずに頭脳ICを直接熱圧着</text>
        <text x="144" y="89" font-size="6.5" fill="#713f12">・MIPI映像を毎秒60〜120回全ドットへ指揮</text>
      `);

    // =========================================================================
    // Group 3: Backlight Unit (BLU) Missing Micro-Optics & Frame (D38–D41)
    // =========================================================================
    case 'lcd_dbef_reflective_pol':
      return wrap(`
        <rect x="18" y="32" width="100" height="14" rx="2" fill="#c084fc" stroke="#7e22ce" stroke-width="1.4"/>
        <text x="38" y="42" font-size="6.8" font-weight="bold" fill="#ffffff">DBEF 多層膜</text>
        <rect x="18" y="74" width="100" height="12" fill="#cbd5e1" stroke="#475569"/>
        <text x="34" y="83" font-size="6.4" fill="#334155">反射板(ESR)側</text>
        <line x1="42" y1="74" x2="42" y2="16" stroke="#2563eb" stroke-width="2.2"/>
        <polygon points="42,14 38,21 46,21" fill="#2563eb"/>
        <path d="M72 74 L72 48 L88 74 L98 16" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="3 2"/>
        <polygon points="98,14 93,21 101,22" fill="#ec4899"/>
        <text x="12" y="112" font-size="7.1" fill="#7e22ce">DBEF偏光リサイクル: 捨てる50%を救出し輝度1.5倍!</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#581c87">DBEF 反射型偏光リサイクル膜</text>
        <text x="144" y="47" font-size="6.5" fill="#581c87">・偏光板に弾かれる50%の光を捨てず鏡で反射</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・向きを変えて再通過させ画面が約1.5倍明るく</text>
        <text x="144" y="75" font-size="6.5" fill="#581c87">・電池消費・発熱を増やさず屋外視認性アップ</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・数百層の極薄ナノポリマー積層による魔法</text>
      `);

    case 'lcd_bottom_diffuser_sheet':
      return wrap(`
        <rect x="18" y="42" width="100" height="16" rx="2" fill="#f1f5f9" stroke="#64748b" stroke-width="1.4"/>
        ${[28, 42, 56, 70, 84, 98, 110].map((cx) => `<circle cx="${cx}" cy="46" r="3" fill="#94a3b8"/>`).join('')}
        <line x1="42" y1="84" x2="42" y2="58" stroke="#f59e0b" stroke-width="2"/>
        <line x1="90" y1="84" x2="90" y2="58" stroke="#f59e0b" stroke-width="2"/>
        <path d="M42 42 L26 20 M42 42 L42 18 M42 42 L58 20 M90 42 L74 20 M90 42 L90 18 M90 42 L106 20" stroke="#0ea5e9" stroke-width="1.5"/>
        <text x="26" y="76" font-size="6.6" fill="#b45309">点状ムラ</text>
        <text x="48" y="17" font-size="6.6" font-weight="bold" fill="#0369a1">均一な白い面光(&gt;90%)</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">マイクロビーズ拡散シート(ヘイズ88%): 輝度ムラ消去</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">光学マイクロビーズ拡散シート</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・すりガラスのようにLEDの点光をふんわり拡散</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・導光板のドット模様や端の明るい縞を消去</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・四隅と中央の明るさの差を10%未満に均一化</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・シート同士が貼り付く虹ムラも同時に防止</text>
      `);

    case 'lcd_blu_mold_frame_tape':
      return wrap(`
        <rect x="18" y="24" width="100" height="60" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>
        <rect x="26" y="32" width="84" height="44" fill="#e0f2fe"/>
        <rect x="16" y="18" width="104" height="7" rx="1" fill="#0f172a"/>
        <rect x="16" y="82" width="104" height="7" rx="1" fill="#0f172a"/>
        <path d="M36 54 L26 48 L36 42" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="41" y="56" font-size="6.8" font-weight="bold" fill="#0369a1">白枠反射&gt;92%</text>
        <text x="12" y="112" font-size="7.1" fill="#1e293b">TiO₂白色中枠(反射92%)＋黒遮光テープ(OD&gt;5)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">白色モールド中枠＆黒遮光テープ</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・6枚の極薄光シートをまとめる白いお弁当枠</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・酸化チタン白壁で横逃げ光を92%内へ反射</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・上面の黒遮光テープがフチの光漏れをゼロ化</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・肉厚0.65mmの超薄精密射出成形フレーム</text>
      `);

    case 'lcd_ksf_led_phosphor_sink':
      return wrap(`
        <line x1="20" y1="84" x2="118" y2="84" stroke="#64748b" stroke-width="1.2"/>
        <path d="M24 84 L38 26 L50 84" fill="#3b82f6" fill-opacity="0.45" stroke="#2563eb" stroke-width="1.8"/>
        <path d="M52 84 L68 38 L82 84" fill="#22c55e" fill-opacity="0.45" stroke="#16a34a" stroke-width="1.8"/>
        <path d="M88 84 L96 20 L104 84" fill="#f43f5e" fill-opacity="0.65" stroke="#e11d48" stroke-width="2"/>
        <text x="31" y="22" font-size="6.4" fill="#1d4ed8">450</text>
        <text x="61" y="34" font-size="6.4" fill="#15803d">532</text>
        <text x="86" y="16" font-size="6.4" font-weight="bold" fill="#be123c">KSF 631nm</text>
        <rect x="20" y="88" width="98" height="6" fill="#d07447"/>
        <text x="12" y="112" font-size="7.1" fill="#be123c">KSF狭帯域赤蛍光体LED＋銅放熱バー: DCI-P3広色域</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#881337">DCI-P3 KSF蛍光体LED＆放熱バー</text>
        <text x="144" y="47" font-size="6.5" fill="#881337">・青LED＋鋭い赤(KSF)＆緑蛍光体で純色発光</text>
        <text x="144" y="61" font-size="6.5" fill="#881337">・映画館規格DCI-P3で夕焼けや肌色を忠実再現</text>
        <text x="144" y="75" font-size="6.5" fill="#c2410c">・裏の金属放熱バーが晴天ブーストの熱を逃がす</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・10連定電流＆フリッカーレスで5万時間寿命</text>
      `);

    // =========================================================================
    // Group 4: Monitor Electronics, OEM Sony PD-1072 / LC-1058 / Coax (D42–D46)
    // =========================================================================
    case 'lcd_pd1072_driver_board':
      return wrap(`
        <rect x="18" y="22" width="100" height="62" rx="4" fill="#1b5649" stroke="#0f3d33" stroke-width="1.5"/>
        <rect x="26" y="34" width="22" height="22" rx="2" fill="#334155" stroke="#94a3b8"/>
        <text x="30" y="48" font-size="6.6" fill="#ffffff">コイル</text>
        <rect x="56" y="34" width="24" height="22" rx="2" fill="#1e293b" stroke="#eab308"/>
        <text x="59" y="48" font-size="6.5" fill="#fde047">昇圧IC</text>
        <rect x="88" y="30" width="22" height="44" rx="2" fill="#eab308"/>
        <text x="24" y="74" font-size="6.8" font-weight="bold" fill="#86efac">7V → 28V LED定電流</text>
        <text x="12" y="112" font-size="7.1" fill="#065f46">Sony PD-1072内蔵基板: 28V LED昇圧＋VGH/VGL生成</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#064e3b">内蔵変電所サブ基板 (PD-1072)</text>
        <text x="144" y="47" font-size="6.5" fill="#065f46">・電池の7VをLED用の約28Vへ持ち上げる基板</text>
        <text x="144" y="61" font-size="6.5" fill="#065f46">・Ref.LCD901フロント筐体に内蔵されたOEM品</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・同軸線を受け液晶・タッチ・LEDの3系統へ分配</text>
        <text x="144" y="89" font-size="6.5" fill="#334155">・電池が減っても画面の明るさが一切落ちない</text>
      `);

    case 'lcd_fine_coaxial_bundle':
      return wrap(`
        <circle cx="68" cy="54" r="30" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        ${[
          [68, 54],
          [68, 36],
          [68, 72],
          [50, 54],
          [86, 54],
          [55, 41],
          [81, 41],
          [55, 67],
          [81, 67],
        ]
          .map(
            ([x, y]) =>
              `<circle cx="${x}" cy="${y}" r="5.5" fill="#d97706" stroke="#f8fafc" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.2" fill="#facc15"/>`
          )
          .join('')}
        <text x="12" y="112" font-size="7.1" fill="#9a3412">Ref.156 100597621: 36芯AWG44極細同軸(10万回耐久)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7c2d12">36芯極細同軸束 (Ref.156)</text>
        <text x="144" y="47" font-size="6.5" fill="#9a3412">・髪の毛より細い丸シールド線を36本束ねた縄</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・平リボンと違い270°雑巾絞り10万回でも不切断</text>
        <text x="144" y="75" font-size="6.5" fill="#9a3412">・1本毎の50Ω金属網で高速映像ノイズ漏れゼロ</text>
        <text x="144" y="89" font-size="6.5" fill="#7c2d12">・α7 IV/α7R V/α7 V共通のソニー名設計ケーブル</text>
      `);

    case 'lcd_lc1058_tilt_flex':
      return wrap(`
        <rect x="18" y="28" width="22" height="52" rx="2" fill="#64748b"/>
        <text x="21" y="57" font-size="6.4" fill="#ffffff">本体</text>
        <path d="M40 42 L68 42 C84 42, 84 68, 68 68 L98 68" fill="none" stroke="#ea580c" stroke-width="6.5" stroke-linecap="round"/>
        <path d="M40 42 L68 42 C84 42, 84 68, 68 68 L98 68" fill="none" stroke="#1e293b" stroke-width="2" stroke-dasharray="4 2"/>
        <rect x="96" y="48" width="22" height="36" rx="2" fill="#d97706"/>
        <text x="98" y="69" font-size="6.2" fill="#ffffff">横軸へ</text>
        <text x="12" y="112" font-size="7.1" fill="#c2410c">LC-1058 4軸中継フレキ: 純ロール屈曲30万回耐久</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#7c2d12">4軸チルト専用フレキ (LC-1058)</text>
        <text x="144" y="47" font-size="6.5" fill="#9a3412">・上下チルトの「折り曲げ」だけを担当するリボン</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・ひねりは同軸(D43)へ任せ役割分担で長寿命</text>
        <text x="144" y="75" font-size="6.5" fill="#9a3412">・曲げ半径1.8mmのS字ループで30万回動作</text>
        <text x="144" y="89" font-size="6.5" fill="#7c2d12">・黒EMIシールド層がMIPI差動信号をノイズ保護</text>
      `);

    case 'lcd_gasket_s_emi_foam':
      return wrap(`
        <rect x="20" y="66" width="96" height="16" rx="2" fill="#1b5649"/>
        <rect x="44" y="54" width="48" height="12" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="38" y="34" width="60" height="20" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="1.6"/>
        <path d="M54 22 L54 32 M82 22 L82 32" stroke="#dc2626" stroke-width="1.8"/>
        <polygon points="54,34 50,27 58,27" fill="#dc2626"/>
        <polygon points="82,34 78,27 86,27" fill="#dc2626"/>
        <text x="45" y="47" font-size="6.8" font-weight="bold" fill="#0f172a">導電スポンジ</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.152 GASKET S(R&lt;0.08Ω): 抜け止め・EMI・防塵</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">導電EMIガスケット (Ref.152)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・コネクタを上から35%圧縮で押さえる銀スポンジ</text>
        <text x="144" y="61" font-size="6.5" fill="#dc2626">・カメラ落下の衝撃でも画面コネクタが抜けない</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・ニッケル銅繊維皮が電波ノイズをGNDへ逃がす</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・抜け止め・アース・防塵の3役を1個で達成</text>
      `);

    case 'lcd_cab_r_potting_seal':
      return wrap(`
        <rect x="18" y="22" width="100" height="64" rx="5" fill="#334155" stroke="#0f172a"/>
        <rect x="24" y="28" width="88" height="52" rx="3" fill="none" stroke="#38bdf8" stroke-width="3"/>
        ${[
          [32, 36],
          [104, 36],
          [32, 72],
          [104, 72],
          [48, 54],
          [68, 54],
          [88, 54],
        ]
          .map(
            ([x, y]) =>
              `<circle cx="${x}" cy="${y}" r="4.2" fill="#e2e8f0" stroke="#0f172a"/><line x1="${x - 2.5}" y1="${y}" x2="${x + 2.5}" y2="${y}" stroke="#0f172a" stroke-width="1"/><line x1="${x}" y1="${y - 2.5}" x2="${x}" y2="${y + 2.5}" stroke="#0f172a" stroke-width="1"/>`
          )
          .join('')}
        <text x="12" y="112" font-size="7.1" fill="#1d4ed8">Ref.151防水ポッティング＋Ref.153/158＋LCD裏3本ネジ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#1e3a8a">防水ポッティング＆極小ネジ群</text>
        <text x="144" y="47" font-size="6.5" fill="#1e40af">・裏ブタの合わせ目を防水樹脂で目止め(Ref.151)</text>
        <text x="144" y="61" font-size="6.5" fill="#1e40af">・土砂降りでも毛細管現象の雨水侵入をシャット</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・M1.4エコねじ＋M1.7ヒンジねじでガッチリ締結</text>
        <text x="144" y="89" font-size="6.5" fill="#334155">・液晶裏の隠し3本ネジもKolari分解で確認済</text>
      `);

    // =========================================================================
    // Group 5: 4-Axis & Vari-Angle Hinge Micro-Mechanics (D47–D51)
    // =========================================================================
    case 'lcd_sv_hinge_covers':
      return wrap(`
        <path d="M44 20 A22 22 0 0 0 44 84 L54 84 L54 20 Z" fill="#475569" stroke="#0f172a" stroke-width="1.5"/>
        <path d="M92 20 A22 22 0 0 1 92 84 L82 84 L82 20 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="59" y="28" width="18" height="48" rx="4" fill="#cbd5e1" stroke="#334155"/>
        <circle cx="68" cy="52" r="5" fill="#d97706"/>
        <path d="M40 52 L54 52 M96 52 L82 52" stroke="#0284c7" stroke-width="1.6"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.159/161 二分割ヒンジ甲冑: ラビリンス防塵保護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#334155"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">ヒンジ二分割アーマー (Ref.159/161)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・金属関節と細い同軸束をモナカ状に前後で保護</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・内側に滑らかなRガイドがあり線擦れを防止</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・段差嵌合＋M1.4ねじで砂埃や雨粒を遮断</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・端子ケーブルとぶつかりにくい丸み設計</text>
      `);

    case 'lcd_ma_hinge_back_mold':
      return wrap(`
        <rect x="20" y="24" width="96" height="58" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
        <line x1="28" y1="38" x2="108" y2="38" stroke="#475569" stroke-width="3"/>
        <line x1="28" y1="53" x2="108" y2="53" stroke="#475569" stroke-width="3"/>
        <line x1="28" y1="68" x2="108" y2="68" stroke="#475569" stroke-width="3"/>
        <path d="M36 44 L100 62 M36 62 L100 44" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="34" y="34" font-size="6.6" fill="#38bdf8">ハサミリンク保護蓋</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">MA HINGE BACK MOLD B: 異物・ストラップ挟み防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0f172a">4軸背面モールド保護カバー</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・上下チルト用ハサミアームの裏をスッキリ隠蔽</text>
        <text x="144" y="61" font-size="6.5" fill="#dc2626">・指やストラップ・砂粒の挟み込み事故を防止</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・中継フレキ(LC-1058)の折返し部を安全ガード</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・つや消しシボ加工で外光の不要反射も抑制</text>
      `);

    case 'lcd_sv_hinge_adhesive':
      return wrap(`
        <rect x="30" y="18" width="44" height="72" rx="14" fill="none" stroke="#0284c7" stroke-width="7"/>
        <rect x="30" y="18" width="44" height="72" rx="14" fill="none" stroke="#bae6fd" stroke-width="2" stroke-dasharray="4 2"/>
        <rect x="74" y="46" width="32" height="24" rx="3" fill="#fde047" opacity="0.8" stroke="#ca8a04" stroke-width="1.4"/>
        <path d="M18 36 Q24 36 26 42" fill="none" stroke="#0ea5e9" stroke-width="2"/>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">Ref.155 SV ADHESIVE (HINGE): ヒンジ付け根防水シール</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#0c4a6e">ヒンジ防滴粘着シート (Ref.155)</text>
        <text x="144" y="47" font-size="6.5" fill="#334155">・最も水が入りやすい蝶番の根元をピタッと封鎖</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・専用型抜き形状でゴム栓の隙間を毛細管防水</text>
        <text x="144" y="75" font-size="6.5" fill="#334155">・ヒンジカバーの微振動ビビり音も同時に抑制</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・-20℃〜+70℃対応・分解時は新品貼替推奨</text>
      `);

    case 'lcd_dual_axis_interlock_cam':
      return wrap(`
        <circle cx="68" cy="50" r="24" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <rect x="34" y="44" width="22" height="12" rx="2" fill="#f59e0b" stroke="#92400e" stroke-width="1.5"/>
        <path d="M40 82 Q54 74 68 82 T96 82" fill="none" stroke="#ca8a04" stroke-width="3.2"/>
        <text x="53" y="53" font-size="6.8" font-weight="bold" fill="#0f172a">LOCK</text>
        <text x="24" y="22" font-size="6.6" font-weight="bold" fill="#b45309">開角 &lt; 35° → 回転禁止!</text>
        <text x="12" y="112" font-size="7.1" fill="#92400e">十字インターロックカム＋波型座金: 画面衝突を100%防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#78350f">2軸同時回転防止カム＆波型座金</text>
        <text x="144" y="47" font-size="6.5" fill="#78350f">・閉じたままひねって画面を割る事故を機械防止</text>
        <text x="144" y="61" font-size="6.5" fill="#dc2626">・横開き35°未満では回転軸に自動で鍵が掛かる</text>
        <text x="144" y="75" font-size="6.5" fill="#0369a1">・波型ウェーブ座金が約6N予圧で軸ガタを消去</text>
        <text x="144" y="89" font-size="6.5" fill="#475569">・焼入れMIM金属カムで長年の乱暴操作も安心</text>
      `);

    case 'lcd_pantograph_sync_gears':
      return wrap(`
        <circle cx="40" cy="50" r="18" fill="#cbd5e1" stroke="#334155" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="96" cy="50" r="18" fill="#cbd5e1" stroke="#334155" stroke-width="2" stroke-dasharray="4 2"/>
        <line x1="40" y1="50" x2="96" y2="50" stroke="#0284c7" stroke-width="4"/>
        <circle cx="40" cy="50" r="5" fill="#eab308"/>
        <circle cx="96" cy="50" r="5" fill="#eab308"/>
        <text x="48" y="38" font-size="6.8" font-weight="bold" fill="#0369a1">θ_L ≡ θ_R</text>
        <text x="26" y="82" font-size="6.6" fill="#334155">左右同期セクターギア</text>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">m=0.35左右同期ギア＋終端ピン: 片手操作ねじれ&lt;0.1°</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.3" font-weight="bold" fill="#713f12">4軸チルト左右同期セクターギア</text>
        <text x="144" y="47" font-size="6.5" fill="#854d0e">・画面の右端だけ押しても斜めに引っかからない</text>
        <text x="144" y="61" font-size="6.5" fill="#0369a1">・左右アームが歯車で噛み合い0.1°以内で完全同期</text>
        <text x="144" y="75" font-size="6.5" fill="#854d0e">・上98°/下40°の終端ストッパーが過負荷を保護</text>
        <text x="144" y="89" font-size="6.5" fill="#713f12">・片手でヌルッと引き出せる高級4軸タッチの秘密</text>
      `);

    default:
      return null;
  }
}
