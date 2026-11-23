import { PartExplanation } from '../assemblies/types';

/**
 * 37 bespoke technical SVG schematics (320x118) for Phase 12 Ultra-HD Anatomy:
 *  - Sensor Micro (+4: M12–M15)
 *  - Sensor Macro (+6: S35–S40)
 *  - Shutter (+6: SH34–SH39)
 *  - EVF (+6: E26–E31)
 *  - LCD (+6: D22–D27)
 *  - Mount (+5: M22–M26)
 *  - Lens (+4: L71–L74)
 */
export function renderPhase12SubsystemsSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // SENSOR MICRO (+4: M12–M15)
    // =========================================================================
    case 'micro_dual_vtg':
      return wrap(`
        <rect x="20" y="20" width="102" height="44" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <rect x="44" y="26" width="12" height="48" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="86" y="26" width="12" height="48" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="26" y="70" width="90" height="12" rx="2" fill="#ca8a04"/>
        <path d="M36 52 L44 68 M106 52 L98 68" stroke="#06b6d4" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="12" y="99" font-size="6.3" fill="#854d0e">2本の埋込垂直ゲート柱が深部電子を一掃</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#713f12">デュアル垂直転送ゲート (D-VTG)</text>
        <text x="144" y="48" font-size="6.6" fill="#854d0e">・深さ3.2μmのPD底部まで電界が直達</text>
        <text x="144" y="62" font-size="6.6" fill="#854d0e">・完全空乏化転送で残像Lag &lt;0.01%</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・Dual Pixel A/B独立＆合算読出に最適</text>
        <text x="144" y="89" font-size="6.6" fill="#a16207">・従来比+30%超の飽和電子量を実現</text>
      `);

    case 'micro_lofic_cap':
      return wrap(`
        <rect x="18" y="26" width="38" height="48" rx="3" fill="#bfdbfe" stroke="#2563eb"/>
        <text x="27" y="54" font-size="7" font-weight="bold" fill="#1d4ed8">PD</text>
        <path d="M56 36 Q66 26 76 36" fill="none" stroke="#06b6d4" stroke-width="2.4"/>
        <rect x="74" y="26" width="48" height="48" rx="3" fill="#cffafe" stroke="#0891b2" stroke-width="1.8"/>
        <line x1="84" y1="30" x2="84" y2="70" stroke="#0e7490" stroke-width="3"/>
        <line x1="98" y1="30" x2="98" y2="70" stroke="#0e7490" stroke-width="3"/>
        <line x1="112" y1="30" x2="112" y2="70" stroke="#0e7490" stroke-width="3"/>
        <text x="12" y="99" font-size="6.3" fill="#0e7490">溢れた光電子を3D高k LOFICへ横流し蓄積</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#164e63">3D高誘電MIM・LOFIC容量バンク</text>
        <text x="144" y="48" font-size="6.6" fill="#155e75">・ZrO2/HfO2高k立体MIMで18万e⁻超蓄積</text>
        <text x="144" y="62" font-size="6.6" fill="#155e75">・単一露光106dB(17+ stops)超広DR達成</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・動体ゴースト＆LEDフリッカー破綻ゼロ</text>
        <text x="144" y="89" font-size="6.6" fill="#0e7490">・2026年LYTIA L910 / STARVIS 3中核技術</text>
      `);

    case 'micro_gs_mem_shield':
      return wrap(`
        <path d="M30 74 L30 28 L112 28 L112 74" fill="none" stroke="#334155" stroke-width="7"/>
        <rect x="42" y="40" width="58" height="30" rx="3" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
        <text x="56" y="59" font-size="7.5" font-weight="bold" fill="#0c4a6e">MEM</text>
        <line x1="20" y1="14" x2="54" y2="25" stroke="#ef4444" stroke-width="2"/>
        <line x1="54" y1="25" x2="72" y2="14" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">タングステン3D遮光箱: PLS &lt; −100dB</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">タングステン遮光GS記憶ノード</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・W金属3Dスカートが斜め迷光を10万分1遮断</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・全画素同時退避で動体歪み完全ゼロ</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・寄生光感度PLS &lt; −100dB(スミア皆無)</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・1/80,000秒＆全速フラッシュ同調対応</text>
      `);

    case 'micro_pixel_adc_rdl':
      return wrap(`
        <rect x="20" y="20" width="102" height="14" rx="2" fill="#fed7aa" stroke="#ea580c"/>
        <text x="36" y="30" font-size="6.5" font-weight="bold" fill="#9a3412">50.4M Cu-Cu Bonds</text>
        <path d="M36 34 L36 52 M58 34 L58 52 M84 34 L84 52 M106 34 L106 52" stroke="#d97706" stroke-width="2.5"/>
        <rect x="20" y="52" width="102" height="14" rx="2" fill="#fef3c7" stroke="#f59e0b"/>
        <text x="35" y="62" font-size="6.5" font-weight="bold" fill="#78350f">RDL ピッチ変換網</text>
        <rect x="20" y="70" width="23" height="14" rx="2" fill="#1e3a8a"/><rect x="46" y="70" width="23" height="14" rx="2" fill="#1e3a8a"/>
        <rect x="73" y="70" width="23" height="14" rx="2" fill="#1e3a8a"/><rect x="99" y="70" width="23" height="14" rx="2" fill="#1e3a8a"/>
        <text x="12" y="99" font-size="6.3" fill="#92400e">ISSCC25: 8画素群→4×2画素並列ADC</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">画素並列4×2 ADC RDL＆Cu-Cu網</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・ISSCC 2025 25.2MP GSの5,040万Cu-Cu</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・8×1画素直下へ4×2並列ADCを極短配線</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・アナログ伝送長1/1000で低電力120fps</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・12.5Gbps/lane SLVS-EC出力へ直結</text>
      `);

    // =========================================================================
    // SENSOR MACRO (+6: S35–S40)
    // =========================================================================
    case 'sensor_wrap_fpc_bracket':
      return wrap(`
        <rect x="26" y="24" width="76" height="22" rx="3" fill="#1e293b"/>
        <path d="M98 35 Q122 35 122 54 Q122 72 96 72 L30 72" fill="none" stroke="#ea580c" stroke-width="4.5"/>
        <path d="M100 39 Q116 39 116 54 Q116 68 98 68" fill="none" stroke="#94a3b8" stroke-width="3.2"/>
        <text x="38" y="38" font-size="6.8" fill="#38bdf8">IBIS Sensor</text>
        <text x="12" y="99" font-size="6.3" fill="#334155">曲率R≥1.8mm SUSガイドでFPC疲労防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">背面回り込みFPC応力緩和ガイド</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・U字折返しSLVS-ECの最小曲率R≥1.8mm</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・IBIS±4.5mm揺動1,000万回で断線ゼロ</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・低摩擦ライナーでEMI被膜の擦過防止</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・Sony A1 II/A7R VI実機分解準拠構造</text>
      `);

    case 'sensor_torx_spring_cal':
      return wrap(`
        <polygon points="70,20 112,76 28,76" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
        <circle cx="70" cy="24" r="7" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
        <circle cx="76" cy="22" r="3" fill="#2563eb"/>
        <circle cx="32" cy="74" r="7" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
        <circle cx="38" cy="72" r="3" fill="#2563eb"/>
        <circle cx="108" cy="74" r="7" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
        <circle cx="114" cy="72" r="3" fill="#2563eb"/>
        <text x="53" y="56" font-size="7" font-weight="bold" fill="#1d4ed8">±2μm</text>
        <text x="12" y="99" font-size="6.3" fill="#1d4ed8">3点Torx校正座＋青色工場封印樹脂</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#1e3a8a">工場3点傾き校正トルクス＆封印</text>
        <text x="144" y="48" font-size="6.6" fill="#1e40af">・P=0.35mm細目ねじで1°≈1μm精密校正</text>
        <text x="144" y="62" font-size="6.6" fill="#1e40af">・レーザー干渉計で撮像面平行度±2μm</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・青色エポキシ封印で振動ズレを永久阻止</text>
        <text x="144" y="89" font-size="6.6" fill="#2563eb">・F1.2開放・60MPの片ボケゼロを保証</text>
      `);

    case 'sensor_perimeter_graphite':
      return wrap(`
        <rect x="44" y="28" width="52" height="44" rx="3" fill="#0f766e" stroke="#134e4a"/>
        <path d="M44 36 L26 32 L18 42 L26 52 L18 62 L26 70 L44 66" fill="#334155" stroke="#0f172a"/>
        <path d="M96 36 L114 32 L122 42 L114 52 L122 62 L114 70 L96 66" fill="#334155" stroke="#0f172a"/>
        <text x="56" y="53" font-size="7" font-weight="bold" fill="#ffffff">IBIS</text>
        <text x="12" y="99" font-size="6.3" fill="#334155">t=25μm蛇腹PGS翼: 反力&lt;0.02Nで均熱</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#334155"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">IBIS可動追従25μmグラファイト翼</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・25μm蛇腹箔で8.5段IBISの動作負荷ゼロ</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・面内1,650W/m·Kでセンサー面内を均熱</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・面内温度ムラ±0.5℃以内で熱かぶり防止</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・8K60p手持ち長回しの高画質を維持</text>
      `);

    case 'sensor_analog_ldo_rail':
      return wrap(`
        <path d="M16 40 Q22 30 28 40 T40 40" fill="none" stroke="#ef4444" stroke-width="1.8"/>
        <rect x="44" y="26" width="44" height="30" rx="3" fill="#1e293b" stroke="#eab308" stroke-width="1.8"/>
        <text x="53" y="44" font-size="7" font-weight="bold" fill="#fde047">LDO</text>
        <line x1="88" y1="41" x2="124" y2="41" stroke="#10b981" stroke-width="2.4"/>
        <rect x="26" y="68" width="88" height="10" rx="2" fill="#c2410c"/>
        <text x="38" y="76" font-size="6.2" fill="#ffffff">Star-Ground Bar</text>
        <text x="12" y="99" font-size="6.3" fill="#92400e">直近クリーン2.8V電源＆星形GND分離</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">センサー直載・超低ノイズLDO群</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・出力雑音&lt;4μVrms・PSRR &gt;85dB浄化</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・V_PIX/V_ANA/V_REFを独立LDO完全分離</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・ダイ直下5mm配置で暗所縞ノイズ根絶</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・星形GNDバーがSLVSデジタル帰還を隔離</text>
      `);

    case 'sensor_antistatic_ring':
      return wrap(`
        <rect x="24" y="24" width="90" height="54" rx="4" fill="#e0f2fe" stroke="#334155" stroke-width="5"/>
        <rect x="16" y="36" width="10" height="8" fill="#eab308"/>
        <rect x="112" y="36" width="10" height="8" fill="#eab308"/>
        <line x1="118" y1="44" x2="118" y2="78" stroke="#0284c7" stroke-width="2"/>
        <line x1="110" y1="78" x2="126" y2="78" stroke="#0284c7" stroke-width="2"/>
        <text x="48" y="54" font-size="7.5" font-weight="bold" fill="#0369a1">ITO 0V</text>
        <text x="12" y="99" font-size="6.3" fill="#92400e">導電環＋BeCuタブで静電気ゴミ吸着阻止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d9a326"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">前面ITO導電帯電防止ダスト環</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・SSWFのITO透明導電膜を&lt;1kΩで接地</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・シャッター摩擦静電気をμs未満で除電</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・クーロン力による微細ダスト付着阻止</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・70kHz超音波＋フッ素膜との複合防塵</text>
      `);

    case 'sensor_ibis_optical_ref':
      return wrap(`
        <rect x="24" y="28" width="22" height="46" rx="3" fill="#1e293b"/>
        <rect x="92" y="28" width="22" height="46" rx="3" fill="#1e293b"/>
        <line x1="46" y1="51" x2="92" y2="51" stroke="#ef4444" stroke-width="2.2" stroke-dasharray="3 2"/>
        <rect x="66" y="22" width="6" height="58" fill="#cbd5e1" stroke="#334155"/>
        <rect x="65" y="48" width="8" height="6" fill="#ffffff"/>
        <text x="12" y="99" font-size="6.3" fill="#0369a1">温度ドリフトゼロの光学スリット原点校正</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0c4a6e">IBIS絶対原点・光学フォトセンサ</text>
        <text x="144" y="48" font-size="6.6" fill="#0369a1">・N52磁石の温度変化(−0.12%/K)を校正</text>
        <text x="144" y="62" font-size="6.6" fill="#0369a1">・起動時スリット通過で原点再現±0.4μm</text>
        <text x="144" y="76" font-size="6.6" fill="#0f766e">・16枚2.4億画素ピクセルシフト精度保証</text>
        <text x="144" y="89" font-size="6.6" fill="#0284c7">・天体自動追尾(アストロ)基準位置にも寄与</text>
      `);

    // =========================================================================
    // SHUTTER (+6: SH34–SH39)
    // =========================================================================
    case 'shutter_no_nc_switch':
      return wrap(`
        <rect x="20" y="24" width="38" height="22" rx="3" fill="#eff6ff" stroke="#0284c7"/>
        <text x="27" y="38" font-size="6.8" font-weight="bold" fill="#0369a1">NO: 0mW</text>
        <rect x="20" y="56" width="38" height="22" rx="3" fill="#fef2f2" stroke="#dc2626"/>
        <text x="25" y="70" font-size="6.8" font-weight="bold" fill="#991b1b">NC: 撮影</text>
        <path d="M62 35 L106 50 L62 67" fill="none" stroke="#334155" stroke-width="2.5"/>
        <circle cx="106" cy="50" r="9" fill="#d97706" stroke="#78350f"/>
        <text x="12" y="99" font-size="6.3" fill="#0369a1">ライブビュー時は機械係止で電磁石0mW</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0c4a6e">NO/NC電磁石切替ロックレバー</text>
        <text x="144" y="48" font-size="6.6" fill="#0369a1">・常開待機時のコイル保持電力を0mW化</text>
        <text x="144" y="62" font-size="6.6" fill="#0369a1">・コイル発熱を絶ちセンサー暗電流を抑制</text>
        <text x="144" y="76" font-size="6.6" fill="#0f766e">・レリーズ時&lt;3.5msで電磁石保持へ移行</text>
        <text x="144" y="89" font-size="6.6" fill="#0284c7">・特許US20160109782A1 駆動方式準拠</text>
      `);

    case 'shutter_sensor_shield':
      return wrap(`
        <rect x="22" y="22" width="58" height="56" rx="3" fill="#334155" stroke="#0f172a"/>
        <line x1="22" y1="36" x2="80" y2="36" stroke="#64748b" stroke-width="1.5"/>
        <line x1="22" y1="50" x2="80" y2="50" stroke="#64748b" stroke-width="1.5"/>
        <line x1="22" y1="64" x2="80" y2="64" stroke="#64748b" stroke-width="1.5"/>
        <path d="M84 34 L108 34 L108 56 L92 56" fill="none" stroke="#6366f1" stroke-width="4"/>
        <circle cx="108" cy="68" r="8" fill="#d97706"/>
        <text x="12" y="99" font-size="6.3" fill="#3730a3">電源OFF後45ms自動閉鎖＆デッドロック</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#312e81">電源OFFセンサー保護幕ロック爪</text>
        <text x="144" y="48" font-size="6.6" fill="#3730a3">・電源断直前に保護幕を自動閉鎖＆施錠</text>
        <text x="144" y="62" font-size="6.6" fill="#3730a3">・100G衝撃でも誤開しない無電力ラッチ</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・屋外レンズ交換時の砂塵直撃を遮断</text>
        <text x="144" y="89" font-size="6.6" fill="#4338ca">・過負荷逃げバネ付のフェイルセーフ設計</text>
      `);

    case 'shutter_diff_cock_cam':
      return wrap(`
        <ellipse cx="64" cy="48" rx="28" ry="18" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="64" cy="48" rx="28" ry="18" fill="none" stroke="#334155" stroke-width="2" transform="rotate(60 64 48)"/>
        <circle cx="64" cy="48" r="6" fill="#475569"/>
        <text x="92" y="34" font-size="7" font-weight="bold" fill="#b45309">60°位相</text>
        <text x="12" y="99" font-size="6.3" fill="#92400e">60°位相差カムで巻上ピーク電流−42%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">位相差ディファレンシャルカム</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・先幕/後幕の巻上山を60°ずらし平坦化</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・チャージモーター最大電流を約42%低減</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・15fps高速連写時の静音＆低振動化</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・特許US20110103787A1＋MoS2潤滑</text>
      `);

    case 'shutter_rebound_governor':
      return wrap(`
        <path d="M18 30 L56 72 L72 60 L82 68" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="3 2"/>
        <path d="M18 30 L56 72 L116 72" fill="none" stroke="#dc2626" stroke-width="2.5"/>
        <circle cx="56" cy="72" r="7" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>
        <text x="68" y="46" font-size="7" font-weight="bold" fill="#b91c1c">e &lt; 0.04</text>
        <text x="12" y="99" font-size="6.3" fill="#991b1b">一方向摩擦ブレーキ爪で幕跳ね返り封止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#7f1d1d">高速幕バウンド吸収ガバナー機構</text>
        <text x="144" y="48" font-size="6.6" fill="#991b1b">・走行終端の幕跳ね返りを機械爪で捕捉</text>
        <text x="144" y="62" font-size="6.6" fill="#991b1b">・反発係数e&lt;0.04・復帰量&lt;0.08mm達成</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・−20℃ゴム硬化時も確実制動する摩擦式</text>
        <text x="144" y="89" font-size="6.6" fill="#b91c1c">・1/8000s画面端カブリ/露光ムラを根絶</text>
      `);

    case 'shutter_slit_baffle_wall':
      return wrap(`
        <polygon points="24,22 46,28 46,74 24,80" fill="#1e293b"/>
        <polygon points="118,22 96,28 96,74 118,80" fill="#1e293b"/>
        <line x1="70" y1="14" x2="70" y2="84" stroke="#0284c7" stroke-width="2.2"/>
        <line x1="36" y1="16" x2="45" y2="48" stroke="#ef4444" stroke-width="1.6"/>
        <line x1="45" y1="48" x2="30" y2="54" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="2 2"/>
        <text x="53" y="54" font-size="7" font-weight="bold" fill="#0369a1">18°傾斜</text>
        <text x="12" y="99" font-size="6.3" fill="#334155">18°ナイフエッジ迷光壁: R &lt; 0.15%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">傾斜マットブラック迷光バッフル壁</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・開口4辺に18°傾斜＋鋸歯セレーション</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・F1.2斜め入射のかすめ反射率&lt;0.15%</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・逆光撮影時の画面端フレアを徹底吸収</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・特許US20020172519A1 遮光構造準拠</text>
      `);

    case 'shutter_cycle_hall':
      return wrap(`
        <circle cx="44" cy="48" r="14" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.6"/>
        <text x="36" y="51" font-size="6.8" font-weight="bold" fill="#ffffff">N/S</text>
        <rect x="76" y="36" width="34" height="24" rx="3" fill="#065f46" stroke="#10b981"/>
        <text x="82" y="51" font-size="6.8" font-weight="bold" fill="#6ee7b7">Hall</text>
        <path d="M58 48 L76 48" stroke="#10b981" stroke-width="2" stroke-dasharray="3 2"/>
        <path d="M24 76 L56 76 L64 68 L74 76 L116 76" fill="none" stroke="#10b981" stroke-width="1.8"/>
        <text x="12" y="99" font-size="6.3" fill="#065f46">毎ショット幕速実測→μs自動学習補正</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#064e3b">幕速自己診断リアルタイムホールIC</text>
        <text x="144" y="48" font-size="6.6" fill="#065f46">・100kHzホールICで毎ショット幕速実測</text>
        <text x="144" y="62" font-size="6.6" fill="#065f46">・分解能≤2μsで後幕開放遅延を自動学習</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・−20℃極寒〜50万回経年変化を完全吸収</text>
        <text x="144" y="89" font-size="6.6" fill="#047857">・1/8000sでも露出誤差±0.05EV以内維持</text>
      `);

    // =========================================================================
    // EVF (+6: E26–E31)
    // =========================================================================
    case 'evf_cavity_clamp':
      return wrap(`
        <rect x="22" y="32" width="96" height="14" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <rect x="34" y="46" width="72" height="10" rx="2" fill="#1e293b"/>
        <rect x="42" y="56" width="56" height="10" rx="1" fill="#ea580c"/>
        <rect x="14" y="36" width="10" height="8" fill="#eab308"/>
        <rect x="116" y="36" width="10" height="8" fill="#eab308"/>
        <circle cx="32" cy="39" r="2.6" fill="#0f172a"/>
        <circle cx="108" cy="39" r="2.6" fill="#0f172a"/>
        <text x="12" y="96" font-size="6.3" fill="#334155">SUSクランプ＋ウレタン圧着＋BeCu接地</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">EVF底面キャビティFPCクランプ</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・240Hz MIPI-DSI＆視線FPCを3.8N圧着</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・BeCuばねで1GHz接地抵抗&lt;0.8Ω達成</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・落下時のEVFブラックアウトを根絶</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・2点M1.4ビス外しでEVF単独交換対応</text>
      `);

    case 'evf_eyecup_subframe':
      return wrap(`
        <rect x="24" y="20" width="90" height="62" rx="8" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <rect x="38" y="30" width="62" height="42" rx="5" fill="#ffffff" stroke="#475569"/>
        <rect x="20" y="28" width="6" height="46" rx="1" fill="#475569"/>
        <rect x="112" y="28" width="6" height="46" rx="1" fill="#475569"/>
        <rect x="56" y="74" width="26" height="10" rx="2" fill="#0f172a"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">SUS軌条＋4点ねじ＋下部ロック爪</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">大型アイカップ4点SUS受枠＆軌条</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・ダブテールSUS軌条でディープ型対応</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・下部ポジティブロック(耐引抜&gt;45N)</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・バッグ出し入れでの誤脱落を完全防止</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・FDA-EP21/ER-kE級遮光カップ装着座</text>
      `);

    case 'evf_eyeaf_shims':
      return wrap(`
        <rect x="24" y="30" width="90" height="8" rx="1" fill="#eab308" stroke="#854d0e"/>
        <rect x="24" y="42" width="90" height="7" rx="1" fill="#cbd5e1" stroke="#475569"/>
        <rect x="24" y="53" width="90" height="16" rx="3" fill="#1e293b"/>
        <text x="45" y="64" font-size="6.8" fill="#38bdf8">850nm IR Cam</text>
        <line x1="36" y1="22" x2="36" y2="76" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="102" y1="22" x2="102" y2="76" stroke="#94a3b8" stroke-width="2.5"/>
        <text x="12" y="99" font-size="6.3" fill="#92400e">10–50μmシム＋3点テーパースタッド</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">視線入力IRカメラ±5μm校正シム</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・SUS/真鍮10–50μmシムで光軸チルト補正</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・3点精密スタッドで±5μm再現位置決め</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・視線角誤差&lt;0.03°で画面隅も即捕捉</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・角膜プルキンエ像とダイクロイック整合</text>
      `);

    case 'evf_desiccant_breather':
      return wrap(`
        <rect x="22" y="24" width="54" height="54" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <circle cx="38" cy="40" r="5" fill="#ffffff" stroke="#0891b2"/>
        <circle cx="56" cy="40" r="5" fill="#ffffff" stroke="#0891b2"/>
        <circle cx="47" cy="54" r="5" fill="#ffffff" stroke="#0891b2"/>
        <circle cx="38" cy="66" r="5" fill="#ffffff" stroke="#0891b2"/>
        <circle cx="56" cy="66" r="5" fill="#ffffff" stroke="#0891b2"/>
        <circle cx="102" cy="51" r="15" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
        <circle cx="102" cy="51" r="9" fill="#ecfeff"/>
        <text x="90" y="53" font-size="6" font-weight="bold" fill="#0e7490">ePTFE</text>
        <text x="12" y="99" font-size="6.3" fill="#0e7490">3Aゼオライト乾燥筒＋ePTFE気圧弁</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#164e63">防曇乾燥剤カートリッジ＆気圧弁</text>
        <text x="144" y="48" font-size="6.6" fill="#155e75">・3ÅモレキュラーシーブがH2Oを選択吸着</text>
        <text x="144" y="62" font-size="6.6" fill="#155e75">・光学室露点&lt;−25℃を10年超長期維持</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・ePTFE弁が冬山/航空機の気圧差を逃がす</text>
        <text x="144" y="89" font-size="6.6" fill="#0e7490">・急激寒暖差でのEVF内部結露をゼロ化</text>
      `);

    case 'evf_ambient_photodiode':
      return wrap(`
        <circle cx="34" cy="30" r="10" fill="#fde047" stroke="#eab308"/>
        <path d="M46 36 L68 48" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="68" y="34" width="44" height="34" rx="4" fill="#065f46" stroke="#10b981"/>
        <rect x="78" y="42" width="24" height="18" rx="2" fill="#1e293b"/>
        <circle cx="84" cy="51" r="2.6" fill="#ef4444"/>
        <circle cx="90" cy="51" r="2.6" fill="#22c55e"/>
        <circle cx="96" cy="51" r="2.6" fill="#3b82f6"/>
        <text x="12" y="96" font-size="6.3" fill="#065f46">0.05〜120,000 lx RGB周囲光センサー</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#064e3b">EVF自動輝度・色温度RGBセンサ</text>
        <text x="144" y="48" font-size="6.6" fill="#065f46">・比視感度V(λ)近似フィルタ付RGB素子</text>
        <text x="144" y="62" font-size="6.6" fill="#065f46">・雪原3000nitブースト〜星空暗順応保護</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・周囲照明の色温度順応誤差を自動補正</text>
        <text x="144" y="89" font-size="6.6" fill="#047857">・OVFビューアシストHDR表示とも連動</text>
      `);

    case 'evf_diopter_detent':
      return wrap(`
        <circle cx="62" cy="50" r="24" fill="#fef3c7" stroke="#d97706" stroke-width="2.5" stroke-dasharray="5 3"/>
        <circle cx="62" cy="50" r="10" fill="#cbd5e1" stroke="#334155"/>
        <path d="M98 22 L92 50 L98 78" fill="none" stroke="#b45309" stroke-width="3.2"/>
        <polygon points="86,50 93,45 93,55" fill="#dc2626"/>
        <text x="12" y="99" font-size="6.3" fill="#92400e">42刻み真鍮カム輪＋BeCuクリック板ばね</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">視度ダイヤル・クリック板ばねカム</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・0.15dpt刻み×42段の明快クリック感</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・標準視度位置に深いゼロ点ノッチ形成</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・保持トルク18mN·mで誤回転ズレを防止</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・高耐疲労BeCuばねで長年の剛性維持</text>
      `);

    // =========================================================================
    // LCD (+6: D22–D27)
    // =========================================================================
    case 'lcd_rear_stiffener':
      return wrap(`
        <rect x="20" y="22" width="102" height="58" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <line x1="26" y1="28" x2="116" y2="74" stroke="#1e293b" stroke-width="4"/>
        <line x1="116" y1="28" x2="26" y2="74" stroke="#1e293b" stroke-width="4"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">SUS＋CFRP Xリブでたわみ&lt;8μm</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">モニター背面反り防止スティフナー</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・t=0.35mm SUS301＋CFRP Xリブ補強</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・片持ちバリアングルねじり剛性+85%</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・強圧タッチ時の色ムラ/ニュートン環0</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・4軸可動側に密着追従する薄型背骨板</text>
      `);

    case 'lcd_torque_washers':
      return wrap(`
        <rect x="64" y="16" width="12" height="70" rx="2" fill="#94a3b8" stroke="#334155"/>
        <path d="M40 30 L70 24 L100 30 M40 38 L70 44 L100 38" fill="none" stroke="#d97706" stroke-width="3"/>
        <path d="M40 52 L70 46 L100 52 M40 60 L70 66 L100 60" fill="none" stroke="#475569" stroke-width="3"/>
        <rect x="44" y="70" width="52" height="7" rx="1" fill="#f8fafc" stroke="#64748b"/>
        <text x="12" y="99" font-size="6.3" fill="#92400e">対向皿ばね積層＋PTFE滑走座金</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">4軸ヒンジ皿ばねトルク積層スタック</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・対向6枚ベルビル皿ばねで定荷重65N維持</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・PTFE滑走座金が初動引っかかりを排除</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・0.35N·mで任意角度フリーストップ静止</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・10万回開閉後も85%以上のトルク持続</text>
      `);

    case 'lcd_ambient_color_sensor':
      return wrap(`
        <rect x="20" y="22" width="100" height="58" rx="4" fill="#1e293b" stroke="#475569"/>
        <rect x="26" y="28" width="88" height="38" rx="2" fill="#e0f2fe"/>
        <circle cx="70" cy="73" r="4.5" fill="#0ea5e9" stroke="#ffffff"/>
        <path d="M70 46 L70 66" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2 2"/>
        <text x="40" y="50" font-size="7" font-weight="bold" fill="#0369a1">1200 nit</text>
        <text x="12" y="99" font-size="6.3" fill="#0369a1">下部黒ベゼル裏の晴天ブーストRGB素子</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0c4a6e">背面ベゼルRGB周囲光＆色温度計</text>
        <text x="144" y="48" font-size="6.6" fill="#0369a1">・&gt;25,000lx検知で晴天屋外ブースト起動</text>
        <text x="144" y="62" font-size="6.6" fill="#0369a1">・周囲照明の色温度を検知し色再現最適化</text>
        <text x="144" y="76" font-size="6.6" fill="#0f766e">・可動側内蔵でチルト時も撮影者側測光</text>
        <text x="144" y="89" font-size="6.6" fill="#0284c7">・暗所では自動減光し省電力＆目疲れ防止</text>
      `);

    case 'lcd_flip_reed_magnets':
      return wrap(`
        <rect x="22" y="26" width="32" height="22" rx="3" fill="#3b82f6" stroke="#1d4ed8"/>
        <text x="27" y="40" font-size="6.8" font-weight="bold" fill="#ffffff">N52</text>
        <path d="M54 37 Q70 28 84 37" fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="84" y="26" width="34" height="22" rx="3" fill="#065f46" stroke="#10b981"/>
        <text x="90" y="40" font-size="6.5" font-weight="bold" fill="#6ee7b7">Hall</text>
        <path d="M40 68 A20 12 0 1 1 92 68" fill="none" stroke="#6366f1" stroke-width="2"/>
        <text x="54" y="74" font-size="7" font-weight="bold" fill="#4338ca">180°反転</text>
        <text x="12" y="99" font-size="6.3" fill="#3730a3">非接触N52磁石＋1.5μA双極ホール対</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#312e81">自撮り反転＆閉鎖消灯マグネット</text>
        <text x="144" y="48" font-size="6.6" fill="#3730a3">・180°前方展開を自動検知し鏡像反転</text>
        <text x="144" y="62" font-size="6.6" fill="#3730a3">・面裏収納時にバックライト＆タッチ消灯</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・Mg隔壁越しの完全非接触(摩耗ゼロ)</text>
        <text x="144" y="89" font-size="6.6" fill="#4338ca">・1.5μA超低消費で防塵防滴性能も維持</text>
      `);

    case 'lcd_hinge_grommet':
      return wrap(`
        <rect x="30" y="24" width="80" height="52" rx="4" fill="#94a3b8" stroke="#334155"/>
        <rect x="38" y="30" width="64" height="40" rx="3" fill="#f8fafc" stroke="#64748b"/>
        <path d="M20 50 C44 36, 96 64, 120 50" fill="none" stroke="#ea580c" stroke-width="4"/>
        <rect x="32" y="28" width="8" height="44" rx="2" fill="#1e293b"/>
        <rect x="100" y="28" width="8" height="44" rx="2" fill="#1e293b"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">PTFE筒(μ=0.05)＋出口曲率ブッシュ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">ヒンジ軸PTFE保護筒＆グロメット</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・中空金属軸内をμ=0.05 PTFE筒で被覆</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・270°回転時のFPCエッジ擦れ断線阻止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・両端フレアゴムで曲げR≥1.6mmを規制</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・15万回複合開閉・寒冷地試験をクリア</text>
      `);

    case 'lcd_dock_bumper_pads':
      return wrap(`
        <rect x="20" y="22" width="100" height="58" rx="5" fill="#f1f5f9" stroke="#64748b" stroke-width="1.6"/>
        <rect x="25" y="27" width="14" height="10" rx="2" fill="#1e293b"/>
        <rect x="101" y="27" width="14" height="10" rx="2" fill="#1e293b"/>
        <rect x="25" y="65" width="14" height="10" rx="2" fill="#1e293b"/>
        <rect x="101" y="65" width="14" height="10" rx="2" fill="#1e293b"/>
        <rect x="56" y="72" width="28" height="8" rx="2" fill="#d97706"/>
        <text x="48" y="53" font-size="7" font-weight="bold" fill="#334155">PORON ×4</text>
        <text x="12" y="99" font-size="6.3" fill="#334155">4隅ウレタン緩衝材＋POM着座キャッチ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">4隅ウレタン緩衝＆着座キャッチ</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・PORON高減衰ウレタンが閉扉衝撃吸収</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・0.3mm予圧で動画収録中のガタ音0dB</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・POMキャッチがしっとりした閉感を実現</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・モニター背殻と本体塗装の擦過を防止</text>
      `);

    // =========================================================================
    // MOUNT (+5: M22–M26)
    // =========================================================================
    case 'mount_upper_ridge':
      return wrap(`
        <circle cx="70" cy="64" r="24" fill="none" stroke="#94a3b8" stroke-width="5"/>
        <rect x="34" y="28" width="72" height="12" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <rect x="52" y="16" width="36" height="12" rx="2" fill="#64748b"/>
        <path d="M70 40 L70 18" stroke="#0284c7" stroke-width="2.4"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">12時縁の引張荷重を上部ペンタ骨格へ分散</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">マウント上部剛性尾根＆連結梁</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・超望遠の12時前方引張を上面骨格へ架橋</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・断面二次モーメント+65%でお辞儀防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・18mm短フランジの画面上下片ボケ根絶</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・高張力M2.0 3点締結SUS304リブ構造</text>
      `);

    case 'mount_mag_filter_plate':
      return wrap(`
        <circle cx="70" cy="52" r="28" fill="none" stroke="#1e293b" stroke-width="6"/>
        <circle cx="50" cy="32" r="3.5" fill="#3b82f6"/>
        <circle cx="90" cy="32" r="3.5" fill="#3b82f6"/>
        <circle cx="50" cy="72" r="3.5" fill="#3b82f6"/>
        <circle cx="90" cy="72" r="3.5" fill="#3b82f6"/>
        <circle cx="70" cy="52" r="20" fill="#cffafe" opacity="0.55" stroke="#06b6d4" stroke-dasharray="3 2"/>
        <text x="53" y="55" font-size="6.8" font-weight="bold" fill="#0e7490">Clip ND</text>
        <text x="12" y="99" font-size="6.3" fill="#0e7490">t=0.35mm SUS430磁気フィルター受環</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#164e63">マウント内磁気クリップ受座環</text>
        <text x="144" y="48" font-size="6.6" fill="#155e75">・出目金超広角でもボディ内ND/天体装着</text>
        <text x="144" y="62" font-size="6.6" fill="#155e75">・黒化SUS430強磁性環で吸着保持3.5N</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・厚さ0.35mmでF1.2周辺光束ケラレ0%</text>
        <text x="144" y="89" font-size="6.6" fill="#0e7490">・Kolari磁気ドロップイン方式に完全対応</text>
      `);

    case 'mount_backing_nut_plate':
      return wrap(`
        <circle cx="70" cy="52" r="29" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <circle cx="70" cy="52" r="19" fill="#ffffff" stroke="#475569" stroke-width="1.6"/>
        <circle cx="70" cy="28" r="3" fill="#0284c7"/><circle cx="91" cy="40" r="3" fill="#0284c7"/>
        <circle cx="91" cy="64" r="3" fill="#0284c7"/><circle cx="70" cy="76" r="3" fill="#0284c7"/>
        <circle cx="49" cy="64" r="3" fill="#0284c7"/><circle cx="49" cy="40" r="3" fill="#0284c7"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">6本ボルトを閉ループSUS環でサンドイッチ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">一体ステンレス背面バヨネット受環</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・前後SUS板でMg母材を強固サンドイッチ</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・6本M2.5総軸力2,700Nを360°均等分散</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・600mm F4超望遠の局所抜去破壊を阻止</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・異種金属電食防止の絶縁コート処理済</text>
      `);

    case 'mount_ptfe_wear_pad':
      return wrap(`
        <circle cx="70" cy="52" r="28" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 2"/>
        <path d="M84 28 A28 28 0 0 1 97 58" fill="none" stroke="#0284c7" stroke-width="6.5" stroke-linecap="round"/>
        <path d="M56 76 A28 28 0 0 1 42 54" fill="none" stroke="#0284c7" stroke-width="6.5" stroke-linecap="round"/>
        <path d="M54 28 A28 28 0 0 1 76 24" fill="none" stroke="#0284c7" stroke-width="6.5" stroke-linecap="round"/>
        <text x="53" y="55" font-size="7" font-weight="bold" fill="#0369a1">μ≈0.08</text>
        <text x="12" y="99" font-size="6.3" fill="#0369a1">3点PTFE/PEEKパッドでかじり＆鉄粉ゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0c4a6e">バヨネット爪PTFEかじり防止パッド</text>
        <text x="144" y="48" font-size="6.6" fill="#0369a1">・動摩擦μ≈0.08でSUS同士のかじり防止</text>
        <text x="144" y="62" font-size="6.6" fill="#0369a1">・着脱摩耗粉−96%でセンサー室を清浄化</text>
        <text x="144" y="76" font-size="6.6" fill="#0f766e">・5万回交換でも絹のような回転トルク</text>
        <text x="144" y="89" font-size="6.6" fill="#0284c7">・微小ラジアルガタ吸収と静音装着を兼務</text>
      `);

    case 'mount_contact_ferrite':
      return wrap(`
        <rect x="20" y="42" width="102" height="16" rx="2" fill="#ea580c"/>
        <rect x="44" y="30" width="52" height="40" rx="4" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <rect x="52" y="36" width="36" height="28" rx="2" fill="#64748b"/>
        <text x="57" y="53" font-size="6.8" font-weight="bold" fill="#ffffff">NiZn</text>
        <text x="12" y="99" font-size="6.3" fill="#334155">12ピン根元フェライトコア(Z&gt;600Ω)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">12ピン通信バス・フェライト＆遮蔽</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・4基XDモーター3A大電流ノイズを吸収</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・NiZnコアZ&gt;600Ω(@100MHz)で濾波</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・SUS遮蔽フードでEMI放射を−28dB減衰</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・120fps AF通信エラーとセンサー干渉防止</text>
      `);

    // =========================================================================
    // LENS (+4: L71–L74)
    // =========================================================================
    case 'lens_center_join_ring':
      return wrap(`
        <rect x="18" y="28" width="36" height="46" rx="3" fill="#334155"/>
        <rect x="86" y="28" width="36" height="46" rx="3" fill="#334155"/>
        <rect x="48" y="22" width="44" height="58" rx="3" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
        <rect x="58" y="36" width="24" height="6" fill="#d97706"/>
        <rect x="58" y="60" width="24" height="6" fill="#d97706"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">インロー勘合SUS連結環＋3点ダウエルピン</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">前後鏡筒インターロック連結リング</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・前後分割鏡筒をSUS304段付き環で架橋</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・3点精密ダウエルピンで同軸度±4μm</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・横衝撃による光軸偏芯(片ボケ)を阻止</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・Lensrentals分解高評価の剛性＋整備性</text>
      `);

    case 'lens_xd_coil_clamps':
      return wrap(`
        <rect x="34" y="32" width="64" height="36" rx="4" fill="#c2410c" stroke="#7c2d12" stroke-width="1.8"/>
        <path d="M24 24 L108 24 L108 76 L24 76" fill="none" stroke="#94a3b8" stroke-width="7"/>
        <circle cx="108" cy="36" r="3" fill="#0f172a"/>
        <circle cx="108" cy="64" r="3" fill="#0f172a"/>
        <text x="45" y="53" font-size="7" font-weight="bold" fill="#ffffff">XD Coil</text>
        <text x="12" y="99" font-size="6.3" fill="#92400e">非磁性SUS Cクランプ×4でコイル剥離0</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">XDコイル機械式SUS Cクランプ群</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・接着＋機械Cクランプで剥離故障を根絶</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・20G超急加減速＆60℃発熱でも保持&gt;180N</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・非磁性SUS304でXD磁気回路を乱さない</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・4基XDモーター全数へM1.2×2点ロック</text>
      `);

    case 'lens_clutch_ball_rollers':
      return wrap(`
        <circle cx="70" cy="52" r="28" fill="none" stroke="#d97706" stroke-width="4"/>
        <circle cx="70" cy="52" r="22" fill="none" stroke="#94a3b8" stroke-width="2"/>
        <circle cx="70" cy="24" r="3.2" fill="#e2e8f0" stroke="#334155"/>
        <circle cx="94" cy="38" r="3.2" fill="#e2e8f0" stroke="#334155"/>
        <circle cx="94" cy="66" r="3.2" fill="#e2e8f0" stroke="#334155"/>
        <circle cx="70" cy="80" r="3.2" fill="#e2e8f0" stroke="#334155"/>
        <circle cx="46" cy="66" r="3.2" fill="#e2e8f0" stroke="#334155"/>
        <circle cx="46" cy="38" r="3.2" fill="#e2e8f0" stroke="#334155"/>
        <text x="53" y="55" font-size="6.8" font-weight="bold" fill="#92400e">18球軸受</text>
        <text x="12" y="99" font-size="6.3" fill="#92400e">18鋼球ベアリング＋真鍮スパナ予圧環</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">フォーカス環18鋼球＆予圧ナット</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・φ1.5mm鋼球×18で転がり摩擦μ≈0.002</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・真鍮スパナナットで軸ガタ&lt;5μm調整</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・−15℃寒冷地でも絹のようなMF回転感</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・フォローフォーカス駆動時のバックラッシュ0</text>
      `);

    case 'lens_rear_lighttrap_tube':
      return wrap(`
        <circle cx="68" cy="52" r="28" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <rect x="46" y="38" width="44" height="28" rx="1" fill="#ffffff" stroke="#38bdf8" stroke-width="1.8"/>
        <text x="54" y="55" font-size="6.8" font-weight="bold" fill="#0369a1">36×24</text>
        <text x="12" y="99" font-size="6.3" fill="#334155">不要円周光束41%を後玉直後で物理遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">後端36×24mm矩形フレアカッター</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・円形像円からセンサー外41%不要光を切除</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・6段鋸歯バッフル＋0.12%超黒植毛内壁</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・F1.2開放・逆光時のベールグレア根絶</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・ナノAR IIと両輪で漆黒コントラスト実現</text>
      `);

    default:
      return null;
  }
}
