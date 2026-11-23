import { PartExplanation } from '../assemblies/types';

/**
 * 28 bespoke technical SVG schematics (320x118) for Phase 11 Ultra-HD Anatomy:
 *  - Mount (+9)
 *  - Sensor Macro (+8)
 *  - Sensor Micro (+4)
 *  - Shutter (+7)
 */
export function renderPhase11BodySchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // MOUNT (+9)
    // =========================================================================
    case 'mount_esd_clips':
      return wrap(`
        <circle cx="72" cy="54" r="34" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
        <circle cx="72" cy="54" r="24" fill="#ffffff" stroke="#d97706" stroke-width="2" stroke-dasharray="6 3"/>
        <path d="M22 30 L34 38 L28 42 L42 50" fill="none" stroke="#eab308" stroke-width="2.2"/>
        <line x1="72" y1="88" x2="72" y2="100" stroke="#0284c7" stroke-width="2"/>
        <line x1="63" y1="100" x2="81" y2="100" stroke="#0284c7" stroke-width="2"/>
        <line x1="67" y1="104" x2="77" y2="104" stroke="#0284c7" stroke-width="1.5"/>
        <text x="16" y="24" font-size="7.5" font-weight="bold" fill="#b45309">±15kV ESD</text>
        <text x="86" y="103" font-size="7.5" fill="#0369a1">GND &lt;0.1Ω</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#92400e">360° BeCu EMI/ESD 接地フィンガー</text>
        <text x="144" y="48" font-size="6.6" fill="#78350f">・16点片持ちばねがレンズ側へ全周接触</text>
        <text x="144" y="62" font-size="6.6" fill="#78350f">・静電気をセンサー手前でMg筐体へ逃がす</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・RF帯の隙間ノイズ漏洩を −35dB 遮断</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・着脱10万回耐性の金/ニッケルめっき</text>
      `);

    case 'mount_bayonet_stop':
      return wrap(`
        <circle cx="72" cy="56" r="32" fill="none" stroke="#94a3b8" stroke-width="6"/>
        <path d="M48 34 A32 32 0 0 1 96 34" fill="none" stroke="#0284c7" stroke-width="3"/>
        <polygon points="99,36 91,30 94,40" fill="#0284c7"/>
        <rect x="94" y="40" width="16" height="12" rx="2" fill="#334155" stroke="#0f172a"/>
        <rect x="86" y="42" width="8" height="8" rx="1" fill="#ef4444"/>
        <text x="54" y="20" font-size="7.5" font-weight="bold" fill="#0369a1">60° 回転装着</text>
        <text x="12" y="102" font-size="6.3" fill="#334155">焼入れSUSストッパーで過剰回転阻止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">バヨネット終端回転ストッパー</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・レンズ爪の60°終端をHRC52鋼で停止</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・12極接点とロック穴の完全整列を保証</text>
        <text x="144" y="76" font-size="6.6" fill="#dc2626">・大口径レンズ急装着時の衝撃を吸収</text>
      `);

    case 'mount_release_actuator':
      return wrap(`
        <rect x="18" y="44" width="22" height="22" rx="4" fill="#334155"/>
        <path d="M40 55 L58 55" stroke="#0284c7" stroke-width="2.5"/>
        <polygon points="62,55 55,51 55,59" fill="#0284c7"/>
        <polygon points="64,46 106,46 106,64 64,64" fill="#cbd5e1" stroke="#334155"/>
        <line x1="64" y1="64" x2="106" y2="46" stroke="#0f172a" stroke-width="2"/>
        <rect x="82" y="22" width="10" height="24" rx="2" fill="#eab308" stroke="#854d0e"/>
        <path d="M87 40 L87 26" stroke="#dc2626" stroke-width="2"/>
        <path d="M108 55 L114 49 L118 61 L124 49 L128 55" fill="none" stroke="#d97706" stroke-width="1.8"/>
        <text x="12" y="84" font-size="6.3" fill="#334155">ボタン押下 → くさびカム → ピン引込</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">レンズ脱着ボタン・カム連動機構</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・押下ストロークをロックピン後退へ変換</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・EPDM軸ブーツでボタン隙間の浸水封止</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・ダブルバネで確実な自動ロック復帰</text>
      `);

    case 'mount_lens_switch':
      return wrap(`
        <rect x="22" y="68" width="104" height="16" rx="2" fill="#065f46"/>
        <rect x="34" y="54" width="24" height="14" rx="2" fill="#eab308"/>
        <path d="M58 60 L106 42" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
        <circle cx="106" cy="42" r="3.5" fill="#ef4444"/>
        <rect x="92" y="20" width="28" height="16" rx="2" fill="#64748b"/>
        <path d="M106 36 L106 41" stroke="#0284c7" stroke-width="2"/>
        <text x="20" y="34" font-size="7.5" font-weight="bold" fill="#0369a1">レンズ完全ロック検知</text>
        <text x="12" y="100" font-size="6.3" fill="#065f46">活線挿抜ショート防止インターロック</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#065f46">装着検出マイクロスイッチ機構</text>
        <text x="144" y="48" font-size="6.6" fill="#064e3b">・バヨネット爪到達で金接点ワイパーON</text>
        <text x="144" y="62" font-size="6.6" fill="#064e3b">・半装着状態でのモーター大電流給電を遮断</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・接点摩耗とアーク放電をゼロ化</text>
      `);

    case 'mount_pogo_springs':
      return wrap(`
        <rect x="22" y="36" width="108" height="36" rx="4" fill="#1e293b"/>
        <rect x="30" y="45" width="34" height="18" rx="3" fill="#eab308" stroke="#92400e"/>
        <path d="M64 54 L70 48 L76 60 L82 48 L88 60 L94 54" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
        <rect x="94" y="47" width="26" height="14" rx="2" fill="#cbd5e1"/>
        <circle cx="30" cy="54" r="4.5" fill="#fde047"/>
        <text x="12" y="26" font-size="6.3" font-weight="bold" fill="#b45309">12極 金プランジャー＋内蔵コイル</text>
        <text x="12" y="88" font-size="6.3" fill="#334155">0.85mm可動 / 接圧 0.65N×12</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#854d0e">ポゴピン内蔵コイル＆超低抵抗導通</text>
        <text x="144" y="48" font-size="6.6" fill="#713f12">・12本独立プランジャーが曲面へ自動追従</text>
        <text x="144" y="62" font-size="6.6" fill="#713f12">・接触抵抗 &lt;12mΩ で4基XD大電流を供給</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・120fps AF/手ブレ補正の高速通信を支える</text>
      `);

    case 'mount_dust_trap':
      return wrap(`
        <rect x="20" y="22" width="110" height="70" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <path d="M30 28 L38 28 L38 86 L30 86 Z" fill="#111827"/>
        <path d="M38 30 L48 34 L38 38 L48 42 L38 46 L48 50 L38 54 L48 58 L38 62 L48 66 L38 70 L48 74 L38 78 L48 82 L38 86" fill="#0f172a"/>
        <line x1="122" y1="36" x2="48" y2="48" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <circle cx="50" cy="68" r="2.8" fill="#64748b"/>
        <circle cx="48" cy="76" r="2.2" fill="#64748b"/>
        <text x="58" y="38" font-size="7.5" fill="#dc2626">斜め迷光吸収</text>
        <text x="58" y="74" font-size="7.5" fill="#475569">微細粉塵捕集</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">マウント内径ダストトラップ＆植毛環</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・静電植毛ファイバーが斜光を99.5%吸収</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・レンズ交換時の微細ゴミを粘着溝で捕捉</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・センサー面へのゴミ付着を大幅に低減</text>
      `);

    case 'mount_clipin_seat':
      return wrap(`
        <rect x="20" y="24" width="110" height="68" rx="4" fill="#f8fafc" stroke="#64748b"/>
        <rect x="30" y="32" width="90" height="52" rx="3" fill="#ffffff" stroke="#334155" stroke-width="1.8"/>
        <rect x="38" y="38" width="74" height="40" rx="2" fill="#bae6fd" opacity="0.65" stroke="#0284c7"/>
        <rect x="24" y="48" width="10" height="18" rx="2" fill="#d97706"/>
        <rect x="116" y="48" width="10" height="18" rx="2" fill="#d97706"/>
        <text x="44" y="61" font-size="8" font-weight="bold" fill="#0369a1">ND / 光害カット</text>
        <text x="12" y="104" font-size="6.3" fill="#334155">ボディ内スロート着脱式フィルター座</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">スロート内クリップインフィルター受け</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・魚眼や超広角でも共通リアND/天体濾過</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・BeCu板ばねクリップがシャッター前で保持</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・工具レス交換＋センサー防塵シールド兼用</text>
      `);

    case 'mount_helicoil_inserts':
      return wrap(`
        <rect x="24" y="24" width="102" height="68" rx="4" fill="#94a3b8" stroke="#475569"/>
        <rect x="54" y="24" width="42" height="68" fill="#ffffff"/>
        <path d="M54 32 L96 36 M54 44 L96 48 M54 56 L96 60 M54 68 L96 72 M54 80 L96 84" stroke="#b45309" stroke-width="3.2"/>
        <rect x="64" y="20" width="22" height="62" rx="2" fill="#475569" opacity="0.85"/>
        <text x="28" y="54" font-size="7.5" font-weight="bold" fill="#0f172a">Mg</text>
        <text x="102" y="54" font-size="7.5" font-weight="bold" fill="#0f172a">Mg</text>
        <text x="12" y="104" font-size="6.3" fill="#92400e">SUS304菱形コイルねじインサート×6</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#92400e">ヘリサート高強度ねじインサート群</text>
        <text x="144" y="48" font-size="6.6" fill="#78350f">・軟らかいMg合金の雌ねじ引抜耐力を2倍化</text>
        <text x="144" y="62" font-size="6.6" fill="#78350f">・600mm F4等 超望遠の片持ち荷重に耐える</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・繰り返し分解修理でもねじ山摩耗ゼロ</text>
      `);

    case 'mount_af_assist':
      return wrap(`
        <rect x="20" y="30" width="38" height="52" rx="4" fill="#065f46"/>
        <circle cx="40" cy="46" r="7" fill="#fb923c" stroke="#ea580c" stroke-width="1.5"/>
        <circle cx="40" cy="68" r="5" fill="#ef4444"/>
        <path d="M58 46 Q68 38 72 46 Q68 54 58 46 Z" fill="#fed7aa" stroke="#ea580c"/>
        <path d="M72 46 L126 30 M72 46 L126 46 M72 46 L126 62" stroke="#f97316" stroke-width="1.6"/>
        <text x="78" y="76" font-size="7.5" fill="#dc2626">RECタリー連動</text>
        <text x="12" y="98" font-size="6.3" fill="#c2410c">フレネル集光AF補助光</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#c2410c">AF補助光LED＆前面タリーランプ</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・暗所EV−4環境で被写体へスポット投光</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・動画録画・セルフタイマーを赤LED表示</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・防滴Oリング封止の一体光学ユニット</text>
      `);

    // =========================================================================
    // SENSOR MACRO (+8)
    // =========================================================================
    case 'sensor_sswf_holder':
      return wrap(`
        <rect x="24" y="40" width="102" height="12" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="20" y="54" width="110" height="8" rx="1" fill="#334155"/>
        <rect x="44" y="32" width="8" height="24" rx="2" fill="#f43f5e"/>
        <rect x="98" y="32" width="8" height="24" rx="2" fill="#f43f5e"/>
        <path d="M24 38 Q48 24 75 38 T126 38" fill="none" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="38" y="22" font-size="7.5" font-weight="bold" fill="#be123c">節点(Node) 弾性支持</text>
        <text x="12" y="80" font-size="6.3" fill="#334155">振幅ゼロの節点のみシリコン保持</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#be123c">SSWF超音波振動フィルター節点保持枠</text>
        <text x="144" y="48" font-size="6.6" fill="#881337">・定在波の「節」を弾性支持し共振Q値維持</text>
        <text x="144" y="62" font-size="6.6" fill="#881337">・防塵ガスケットで撮像室への塵侵入封止</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・10,000G超の除塵加速度を損なわず保持</text>
      `);

    case 'sensor_dram_wafer':
      return wrap(`
        <rect x="24" y="22" width="104" height="16" rx="2" fill="#0e7490"/>
        <rect x="24" y="44" width="104" height="16" rx="2" fill="#1e40af"/>
        <rect x="24" y="66" width="104" height="18" rx="2" fill="#1e293b" stroke="#38bdf8" stroke-width="1.4"/>
        ${[36, 54, 72, 90, 108].map((x) => `<line x1="${x}" y1="38" x2="${x}" y2="66" stroke="#f59e0b" stroke-width="2"/>`).join('')}
        <text x="40" y="33" font-size="7.2" fill="#fff">W1: 画素層</text>
        <text x="36" y="55" font-size="7.2" fill="#fff">W2: ADCロジック</text>
        <text x="34" y="78" font-size="7.2" font-weight="bold" fill="#38bdf8">W3: TSV DRAM</text>
        <text x="12" y="100" font-size="6.3" fill="#b45309">シリコン貫通電極(TSV)直結</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">第3層 積層DRAMバッファウエハ</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・並列TSVバスで &gt;100 Gbps 瞬間書込</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・全画素一括退避で動体歪みを極小化</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・120fps連写＆4K120p超高速読出の中核</text>
      `);

    case 'sensor_cuw_slug':
      return wrap(`
        <rect x="26" y="24" width="98" height="14" rx="2" fill="#0e7490"/>
        <rect x="26" y="38" width="98" height="7" fill="#cbd5e1"/>
        <rect x="20" y="45" width="110" height="26" rx="2" fill="#b45309" stroke="#78350f"/>
        <path d="M50 38 L50 82 M75 38 L75 82 M100 38 L100 82" stroke="#ef4444" stroke-width="1.8"/>
        <polygon points="75,86 70,79 80,79" fill="#ef4444"/>
        <text x="48" y="34" font-size="7.2" fill="#fff">Si 撮像ダイ</text>
        <text x="34" y="61" font-size="7.8" font-weight="bold" fill="#fff">CuW80 銅タングステン</text>
        <text x="12" y="102" font-size="6.3" fill="#9a3412">CTE 6.5ppm/K ＋ 焼結銀接合</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#c2410c">CuW放熱スラグ＆ナノ焼結銀ダイボンド</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・Siに近い熱膨張率で高温反り(像面湾曲)ゼロ</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・熱伝導200W/mKで8K収録の暗電流ノイズ低減</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・ボイドレス焼結銀で極低熱抵抗直結</text>
      `);

    case 'sensor_front_yoke':
      return wrap(`
        <rect x="22" y="24" width="106" height="12" rx="2" fill="#475569"/>
        <rect x="30" y="38" width="32" height="14" rx="2" fill="#dc2626"/>
        <rect x="88" y="38" width="32" height="14" rx="2" fill="#2563eb"/>
        <rect x="44" y="56" width="62" height="10" rx="2" fill="#d97706"/>
        <rect x="22" y="70" width="106" height="12" rx="2" fill="#334155"/>
        <path d="M46 52 L46 70 M104 52 L104 70" stroke="#10b981" stroke-width="1.8" stroke-dasharray="2 2"/>
        <text x="12" y="20" font-size="6.3" font-weight="bold" fill="#0f172a">フロント閉磁気回路ヨーク</text>
        <text x="12" y="98" font-size="6.3" fill="#059669">磁束密度B向上 ＋ 漏洩磁界遮蔽</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">IBIS前面軟鉄ヨーク＆磁気シールド板</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・N52磁石の磁束をVCMコイルへ集中帰還</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・ローレンツ推力を約35%増強＆省電力化</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・シャッター側への漏洩磁束干渉を遮断</text>
      `);

    case 'sensor_ibis_stoppers':
      return wrap(`
        <rect x="24" y="24" width="102" height="68" rx="4" fill="#f8fafc" stroke="#64748b"/>
        <rect x="40" y="36" width="70" height="44" rx="3" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="30" y="48" width="8" height="20" rx="3" fill="#ec4899"/>
        <rect x="112" y="48" width="8" height="20" rx="3" fill="#ec4899"/>
        <rect x="65" y="28" width="20" height="7" rx="3" fill="#ec4899"/>
        <rect x="65" y="81" width="20" height="7" rx="3" fill="#ec4899"/>
        <path d="M56 58 L94 58 M75 44 L75 72" stroke="#0284c7" stroke-width="1.6"/>
        <text x="12" y="105" font-size="6.3" fill="#be185d">±2.5mm 可動限界・衝撃吸収バンパー</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#9d174d">IBIS 4隅エラストマー端面ストッパー</text>
        <text x="144" y="48" font-size="6.6" fill="#831843">・電源OFF・落下衝撃時のステージ衝突を緩衝</text>
        <text x="144" y="62" font-size="6.6" fill="#831843">・低反発シリコーンでセラミック玉脱輪を防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・5軸8段補正の最大ストロークを安全規制</text>
      `);

    case 'sensor_temp_ntc':
      return wrap(`
        <rect x="22" y="26" width="106" height="60" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <path d="M30 74 Q64 70 86 48 T120 32" fill="none" stroke="#ef4444" stroke-width="2.2"/>
        <circle cx="86" cy="48" r="4" fill="#dc2626"/>
        <text x="32" y="40" font-size="7.5" font-weight="bold" fill="#dc2626">暗電流 ∝ 2^(ΔT/6℃)</text>
        <text x="34" y="82" font-size="6.5" fill="#334155">温度 T → 暗電流補正</text>
        <text x="12" y="102" font-size="6.3" fill="#991b1b">±0.1℃ 精密NTCサーミスタ基板</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#991b1b">センサー直結NTC温度監視サブ基板</text>
        <text x="144" y="48" font-size="6.6" fill="#7f1d1d">・ダイ直下温度を0.1℃分解能で常時計測</text>
        <text x="144" y="62" font-size="6.6" fill="#7f1d1d">・高温時の黒レベル・暗電流オフセット補正</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・8K長回し時の熱保護＆ファン制御へ連携</text>
      `);

    case 'sensor_heat_tapes':
      return wrap(`
        <rect x="20" y="28" width="30" height="54" rx="3" fill="#b45309"/>
        <path d="M50 38 C72 38, 72 68, 94 68" fill="none" stroke="#1e293b" stroke-width="7"/>
        <path d="M50 54 C72 54, 72 54, 94 54" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4 2"/>
        <rect x="94" y="28" width="32" height="54" rx="3" fill="#475569"/>
        <text x="23" y="58" font-size="7.5" font-weight="bold" fill="#fff">IBIS</text>
        <text x="98" y="58" font-size="7.5" font-weight="bold" fill="#fff">筐体</text>
        <text x="12" y="98" font-size="6.3" fill="#334155">IBIS可動を妨げない柔軟熱架橋シート</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#334155"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">多層グラファイト柔軟放熱ブリッジ</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・面内熱伝導 1,500 W/mK の極薄熱橋</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・S字ループ形状でIBIS防振剛性への影響零</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・浮遊センサーの熱をMgボディへ連続排出</text>
      `);

    case 'sensor_b2b_bracket':
      return wrap(`
        <rect x="24" y="66" width="102" height="16" rx="2" fill="#065f46"/>
        <rect x="42" y="52" width="66" height="14" rx="2" fill="#eab308"/>
        <rect x="34" y="38" width="82" height="14" rx="2" fill="#94a3b8" stroke="#334155"/>
        <circle cx="42" cy="45" r="3" fill="#0f172a"/>
        <circle cx="108" cy="45" r="3" fill="#0f172a"/>
        <path d="M52 24 L62 36 M98 24 L88 36" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="2 2"/>
        <text x="48" y="22" font-size="7.5" font-weight="bold" fill="#dc2626">RF干渉ブロック</text>
        <text x="12" y="98" font-size="6.3" fill="#334155">SUS押さえ金具＋導電ガスケット固定</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">SLVS-EC B2BコネクタRF押さえ金具</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・衝撃・IBIS振動による高速FPC脱落を防止</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・10Gbps差動配線のEMI放射を直上で遮蔽</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・2点精密ねじ締結でGNDインピーダンス低減</text>
      `);

    // =========================================================================
    // SENSOR MICRO (+4)
    // =========================================================================
    case 'micro_ocl_ar_planar':
      return wrap(`
        <path d="M22 46 Q50 22 78 46 Q106 22 134 46" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M22 42 Q50 18 78 42 Q106 18 134 42" fill="none" stroke="#a855f7" stroke-width="1.8" stroke-dasharray="4 2"/>
        <rect x="22" y="46" width="112" height="14" fill="#e0f2fe" stroke="#38bdf8"/>
        <rect x="22" y="60" width="56" height="14" fill="#ef4444" opacity="0.8"/>
        <rect x="78" y="60" width="56" height="14" fill="#22c55e" opacity="0.8"/>
        <text x="12" y="92" font-size="6.3" fill="#7e22ce">λ/4 AR膜(n≈1.38) ＋ 平坦化有機層</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#6b21a8">オンチップAR反射防止＆平坦化層</text>
        <text x="144" y="48" font-size="6.6" fill="#581c87">・レンズ表面反射を &lt;0.3% に抑えフレア低減</text>
        <text x="144" y="62" font-size="6.6" fill="#581c87">・平坦化膜厚で最適焦点距離をサブμm設計</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・F1.2斜入射光の量子効率(QE)を最大化</text>
      `);

    case 'micro_fdti_doping':
      return wrap(`
        <rect x="20" y="24" width="114" height="66" rx="3" fill="#0e7490" opacity="0.22" stroke="#0e7490"/>
        <rect x="46" y="24" width="8" height="66" fill="#1e293b"/>
        <rect x="98" y="24" width="8" height="66" fill="#1e293b"/>
        <rect x="28" y="34" width="14" height="44" rx="3" fill="#38bdf8" opacity="0.8"/>
        <rect x="60" y="34" width="32" height="44" rx="3" fill="#22c55e" opacity="0.8"/>
        <rect x="110" y="34" width="18" height="44" rx="3" fill="#ef4444" opacity="0.8"/>
        <path d="M68 42 L96 64 L76 74" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
        <text x="12" y="103" font-size="6.3" fill="#0f172a">完全貫通F-DTI壁 ＋ P型傾斜ドーピング</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#115e59">F-DTI画素完全分離＆傾斜ドーピング</text>
        <text x="144" y="48" font-size="6.6" fill="#134e4a">・Si深部まで貫通した溝が隣接混色を遮断</text>
        <text x="144" y="62" font-size="6.6" fill="#134e4a">・壁面反射で赤/近赤外の光路長を実効延伸</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・電界勾配ドーピングで飽和電子数を拡大</text>
      `);

    case 'micro_beol_wiring':
      return wrap(`
        <rect x="20" y="22" width="114" height="68" rx="3" fill="#1e293b"/>
        <rect x="26" y="30" width="102" height="6" fill="#d97706"/>
        <rect x="26" y="46" width="44" height="6" fill="#f59e0b"/>
        <rect x="82" y="46" width="46" height="6" fill="#f59e0b"/>
        <rect x="26" y="62" width="102" height="6" fill="#d97706"/>
        <rect x="26" y="78" width="102" height="6" fill="#b45309"/>
        <rect x="58" y="36" width="5" height="26" fill="#fde047"/>
        <rect x="96" y="52" width="5" height="26" fill="#fde047"/>
        <text x="12" y="104" font-size="6.3" fill="#b45309">多層Cuダマシン配線(M1–M4)＋ビア</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#92400e">BEOL多層銅配線＆低誘電率層間膜</text>
        <text x="144" y="48" font-size="6.6" fill="#78350f">・BSI裏面照射のため配線層を光路裏へ退避</text>
        <text x="144" y="62" font-size="6.6" fill="#78350f">・寄生容量を低減し超高速行選択・読出を実現</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・Cu-Cuハイブリッド接合パッドへ最短接続</text>
      `);

    case 'micro_stacked_dram':
      return wrap(`
        <rect x="20" y="22" width="114" height="22" rx="2" fill="#1e40af"/>
        <text x="34" y="36" font-size="7.5" fill="#fff">W2: 列並列 14bit ADC</text>
        ${[34, 52, 70, 88, 106, 122].map((x) => `<rect x="${x}" y="44" width="4" height="14" fill="#f59e0b"/>`).join('')}
        <rect x="20" y="58" width="114" height="32" rx="2" fill="#0f172a" stroke="#38bdf8" stroke-width="1.4"/>
        ${[28, 48, 68, 88, 108].map((x) => `<rect x="${x}" y="66" width="14" height="18" rx="1" fill="#0284c7"/>`).join('')}
        <text x="12" y="104" font-size="6.3" fill="#0369a1">1T1Cトレンチキャパシタ積層DRAMセル</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">第3層ナノ積層DRAMメモリセル層</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・直上のADC出力をTSV経由で超並列格納</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・1フレーム全データを数ミリ秒で一括退避</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・外部バス律速を超越した超高速連写を実現</text>
      `);

    // =========================================================================
    // SHUTTER (+7)
    // =========================================================================
    case 'shutter_drive_cover':
      return wrap(`
        <rect x="22" y="22" width="106" height="68" rx="4" fill="#334155" stroke="#0f172a"/>
        <rect x="32" y="32" width="86" height="48" rx="2" fill="#475569"/>
        <circle cx="56" cy="56" r="14" fill="#f59e0b" opacity="0.8"/>
        <circle cx="92" cy="56" r="12" fill="#cbd5e1"/>
        <rect x="20" y="26" width="110" height="5" rx="2" fill="#0284c7"/>
        <rect x="20" y="81" width="110" height="5" rx="2" fill="#0284c7"/>
        <text x="12" y="104" font-size="6.3" fill="#0f172a">密閉駆動室カバー＆防塵・グリス封止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">駆動室ダストカバー＆グリス飛散障壁</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・ギア潤滑グリスや摩耗粉の撮像面飛散を阻止</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・20万〜50万回作動の軸受剛性を両持ち補強</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・作動音の共鳴を抑える制振リブ構造を内蔵</text>
      `);

    case 'shutter_blade_rivets':
      return wrap(`
        <rect x="22" y="30" width="104" height="16" rx="2" fill="#1e293b"/>
        <rect x="22" y="54" width="104" height="16" rx="2" fill="#334155"/>
        <rect x="52" y="24" width="12" height="56" rx="2" fill="#94a3b8" stroke="#475569"/>
        <circle cx="58" cy="38" r="4.5" fill="#e2e8f0" stroke="#0f172a"/>
        <circle cx="58" cy="62" r="4.5" fill="#e2e8f0" stroke="#0f172a"/>
        <circle cx="58" cy="38" r="2" fill="#0284c7"/>
        <circle cx="58" cy="62" r="2" fill="#0284c7"/>
        <text x="72" y="42" font-size="7.5" fill="#fff">CFRP羽根</text>
        <text x="12" y="96" font-size="6.3" fill="#334155">Ti中空カシメリベット＋低摩擦座金</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">チタン中空精密リベット＆軸受ブッシュ</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・超軽量Ti中空ピンで平行リンク慣性を最小化</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・2.0ms超高速走行の遠心力・剪断力に耐える</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・μmクリアランスで50万回ノンガタ摺動</text>
      `);

    case 'shutter_pocket_lighttrap':
      return wrap(`
        <rect x="20" y="22" width="110" height="70" rx="4" fill="#0f172a"/>
        <rect x="30" y="30" width="90" height="12" fill="#334155"/>
        <rect x="30" y="72" width="90" height="12" fill="#334155"/>
        <line x1="26" y1="54" x2="124" y2="54" stroke="#38bdf8" stroke-width="2"/>
        <polyline points="42,42 54,32 64,42 74,32" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2 2"/>
        <text x="40" y="51" font-size="7.5" fill="#bae6fd">露光スリット通過</text>
        <text x="34" y="81" font-size="7" fill="#cbd5e1">上下羽根収納ポケット迷光遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">上下幕ポケット迷光ラビリンス遮光壁</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・畳んだ先幕・後幕の隙間からの光漏れを封殺</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・1/8000秒・超長時間バルブでもカブリ零</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・羽根バタつき抑制ガイドレールを兼ねる</text>
      `);

    case 'shutter_curtain_hooks':
      return wrap(`
        <rect x="22" y="34" width="52" height="44" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <path d="M74 44 L96 44 L104 54 L96 64 L74 64 Z" fill="#475569"/>
        <circle cx="104" cy="54" r="7" fill="#f59e0b" stroke="#92400e"/>
        <path d="M104 40 A14 14 0 0 1 118 54" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="26" y="59" font-size="7.5" font-weight="bold" fill="#0f172a">Mg電磁鉄片</text>
        <text x="12" y="96" font-size="6.3" fill="#b45309">チャージ爪＋電磁石アーマチュア</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#92400e">先幕/後幕チャージフック＆係止爪</text>
        <text x="144" y="48" font-size="6.6" fill="#78350f">・駆動バネを巻き上げ電磁石へ確実に押し当て</text>
        <text x="144" y="62" font-size="6.6" fill="#78350f">・通電遮断からサブmsで滑らかに幕を解放</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・高硬度浸炭鋼で50万回打撃摩耗を克服</text>
      `);

    case 'shutter_coil_heat_bridge':
      return wrap(`
        <rect x="22" y="32" width="38" height="46" rx="4" fill="#d97706"/>
        <rect x="60" y="40" width="28" height="30" rx="2" fill="#f472b6"/>
        <rect x="88" y="28" width="38" height="54" rx="3" fill="#475569"/>
        <path d="M44 55 L106 55" stroke="#ef4444" stroke-width="2.4"/>
        <polygon points="110,55 102,50 102,60" fill="#ef4444"/>
        <text x="26" y="58" font-size="7.5" font-weight="bold" fill="#fff">Coil</text>
        <text x="93" y="58" font-size="7.5" font-weight="bold" fill="#fff">筐体</text>
        <text x="12" y="98" font-size="6.3" fill="#be185d">高速連写時のマグネット発熱を即時排出</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#c2410c">電磁石・駆動コイル放熱熱橋プレート</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・10fps連写でのソレノイド温度上昇を抑制</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・コイル抵抗変化による露光ムラを防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・隣接センサーへの熱輻射を銅板で遮断</text>
      `);

    case 'shutter_x_sync':
      return wrap(`
        <rect x="20" y="24" width="110" height="66" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <line x1="28" y1="74" x2="122" y2="74" stroke="#94a3b8"/>
        <path d="M28 74 L48 74 L68 34 L122 34" fill="none" stroke="#0284c7" stroke-width="2"/>
        <path d="M28 74 L82 74 L102 34 L122 34" fill="none" stroke="#64748b" stroke-width="2"/>
        <rect x="68" y="34" width="14" height="40" fill="#fef08a" opacity="0.8"/>
        <path d="M75 30 L71 42 L77 42 L73 54" fill="none" stroke="#eab308" stroke-width="2"/>
        <text x="58" y="28" font-size="7.5" font-weight="bold" fill="#b45309">X-Sync 閃光!</text>
        <text x="12" y="104" font-size="6.3" fill="#0369a1">先幕全開瞬間に1/250–1/400s同調</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#854d0e">X接点ストロボ同調トリガー検出部</text>
        <text x="144" y="48" font-size="6.6" fill="#713f12">・先幕の全開到達をμs単位で精密検知</text>
        <text x="144" y="62" font-size="6.6" fill="#713f12">・後幕が閉じる直前の全開窓へ閃光を同期</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・ホットシュー＆シンクロ端子へ超低遅延発火</text>
      `);

    case 'shutter_rear_mask':
      return wrap(`
        <rect x="20" y="22" width="110" height="70" rx="4" fill="#1e293b"/>
        <rect x="34" y="34" width="82" height="46" rx="2" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
        <rect x="28" y="28" width="94" height="58" rx="3" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="5 3"/>
        <text x="50" y="60" font-size="8" font-weight="bold" fill="#0369a1">36×24mm</text>
        <text x="12" y="105" font-size="6.3" fill="#334155">背面アパーチャ整形枠＆防塵ガスケット</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">シャッター背面遮光マスク＆防塵環</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・フルサイズ像面直前で有害斜光を最終整形</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・独立気泡フォームがシャッター室とIBISを隔離</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・高速走行時の空気脈動によるゴミ舞上げ防止</text>
      `);

    default:
      return null;
  }
}
