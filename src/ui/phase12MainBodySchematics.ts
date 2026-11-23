import { PartExplanation } from '../assemblies/types';

/**
 * 26 bespoke technical SVG schematics (320x118) for Phase 12 Ultra-HD Anatomy:
 *  - Mainboard (+14: M17–M30)
 *  - Body (+12: B27–B38)
 */
export function renderPhase12MainBodySchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // MAINBOARD (+14: M17–M30)
    // =========================================================================
    case 'mb_vapor_wick_core':
      return wrap(`
        <rect x="16" y="24" width="114" height="58" rx="4" fill="#fff7ed" stroke="#c2410c" stroke-width="1.8"/>
        <rect x="20" y="68" width="106" height="10" fill="#b45309" opacity="0.85"/>
        <rect x="20" y="28" width="106" height="8" fill="#d97706" opacity="0.7"/>
        <line x1="36" y1="36" x2="36" y2="68" stroke="#92400e" stroke-width="3"/>
        <line x1="72" y1="36" x2="72" y2="68" stroke="#92400e" stroke-width="3"/>
        <line x1="108" y1="36" x2="108" y2="68" stroke="#92400e" stroke-width="3"/>
        <path d="M46 64 Q60 44 96 44" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <path d="M98 72 L42 72" stroke="#0284c7" stroke-width="2.2"/>
        <text x="12" y="98" font-size="6.3" fill="#9a3412">焼結銅ウィック: 蒸気拡散＆毛細管液還流</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#c2410c"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#7c2d12">焼結多孔質銅ウィック＆凝縮柱</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・40–70μm焼結銅粉が全姿勢で液還流</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・銅マイクロ支柱が真空容器座屈を防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・実効熱伝導 3,500–5,000 W/m·K級</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・縦位置/逆さ撮影でもドライアウトなし</text>
      `);

    case 'mb_rf_shield_bracket':
      return wrap(`
        <rect x="18" y="22" width="110" height="62" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <rect x="30" y="32" width="46" height="42" rx="2" fill="#ffffff" stroke="#64748b"/>
        <rect x="84" y="32" width="32" height="42" rx="2" fill="#ffffff" stroke="#64748b"/>
        <path d="M22 44 L124 44" stroke="#1e293b" stroke-width="5.5" opacity="0.85"/>
        <path d="M22 64 L124 64" stroke="#1e293b" stroke-width="5.5" opacity="0.85"/>
        <circle cx="24" cy="28" r="2.6" fill="#0f172a"/>
        <circle cx="122" cy="28" r="2.6" fill="#0f172a"/>
        <circle cx="24" cy="78" r="2.6" fill="#0f172a"/>
        <circle cx="122" cy="78" r="2.6" fill="#0f172a"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">SUS枠スリットを貫通する熱転写テープ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">背面RFシールド枠＆貫通放熱テープ</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・A1 II/A7R VI実機分解の4点ねじSUS枠</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・枠スリット貫通テープで背面外装へ放熱</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・LCD〜基板間のRFノイズを&gt;42dB遮断</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・落下時の基板たわみ/BGAクラック防止</text>
      `);

    case 'mb_hdmi_daughterboard':
      return wrap(`
        <rect x="24" y="24" width="58" height="58" rx="4" fill="#065f46" stroke="#047857" stroke-width="1.6"/>
        <rect x="64" y="34" width="38" height="38" rx="2" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <rect x="78" y="41" width="22" height="24" rx="1" fill="#1e293b"/>
        <rect x="82" y="45" width="16" height="4" fill="#eab308"/>
        <rect x="34" y="42" width="18" height="22" rx="2" fill="#1e293b"/>
        <rect x="12" y="44" width="14" height="18" fill="#ea580c"/>
        <circle cx="32" cy="30" r="2.5" fill="#cbd5e1"/>
        <circle cx="32" cy="76" r="2.5" fill="#cbd5e1"/>
        <text x="12" y="99" font-size="6.3" fill="#1d4ed8">独立ドーターボード＋48Gbpsリドライバ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#1e3a8a">独立HDMI 2.1ドーターボード</text>
        <text x="144" y="48" font-size="6.6" fill="#1e40af">・2点ねじ分離構造で破損時も単体交換</text>
        <text x="144" y="62" font-size="6.6" fill="#1e40af">・48Gbps FRL対応EQリドライバIC内蔵</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・低容量TVS(&lt;0.25pF)で±15kV ESD保護</text>
        <text x="144" y="89" font-size="6.6" fill="#2563eb">・8K60p/16bit RAW外部出力の信頼性要</text>
      `);

    case 'mb_audio_jack_board':
      return wrap(`
        <rect x="20" y="26" width="66" height="54" rx="4" fill="#065f46" stroke="#047857" stroke-width="1.5"/>
        <rect x="76" y="32" width="38" height="16" rx="3" fill="#1e293b" stroke="#475569"/>
        <circle cx="114" cy="40" r="6" fill="#eab308" stroke="#92400e"/>
        <circle cx="114" cy="40" r="3" fill="#0f172a"/>
        <rect x="76" y="56" width="38" height="16" rx="3" fill="#1e293b" stroke="#475569"/>
        <circle cx="114" cy="64" r="6" fill="#eab308" stroke="#92400e"/>
        <circle cx="114" cy="64" r="3" fill="#0f172a"/>
        <rect x="30" y="42" width="22" height="22" rx="2" fill="#334155"/>
        <path d="M56 32 L56 74" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="12" y="99" font-size="6.3" fill="#92400e">金属カバー付 24bit独立音声サブ基板</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">独立3.5mm音声＆24bitコーデック</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・デジタル基板から物理分離＆SUS遮蔽</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・専用24bit/96kHz低ノイズADC/DAC搭載</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・実測SNR ≥104dB・THD+N &lt;0.003%</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・PIP電源マイク＆32Ωモニター両対応</text>
      `);

    case 'mb_wifi_mimo_antennas':
      return wrap(`
        <rect x="20" y="24" width="44" height="18" rx="3" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
        <path d="M26 33 L34 28 L42 38 L50 28 L58 33" fill="none" stroke="#d97706" stroke-width="2"/>
        <rect x="88" y="22" width="22" height="44" rx="3" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
        <path d="M99 28 L94 36 L104 44 L94 52 L99 60" fill="none" stroke="#d97706" stroke-width="2"/>
        <path d="M42 42 Q42 74 64 78" fill="none" stroke="#eab308" stroke-width="2.4"/>
        <path d="M99 66 Q99 78 74 78" fill="none" stroke="#eab308" stroke-width="2.4"/>
        <rect x="58" y="72" width="22" height="12" rx="2" fill="#334155"/>
        <text x="12" y="99" font-size="6.3" fill="#92400e">直交2×2 MIMO＋50Ω金編組同軸給電</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d9a326"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">Wi-Fi 6E/7 MIMOパッチ＆金同軸</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・Mg筐体遮蔽を避け上面樹脂窓へ給電</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・直交2偏波2×2 MIMOでマルチパス耐性</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・外径0.81mm 50Ω金編組低損失同軸×2</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・2.4/5/6GHz帯 最大2.4Gbps級高速転送</text>
      `);

    case 'mb_nfc_coil':
      return wrap(`
        <rect x="26" y="20" width="76" height="62" rx="5" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="32" y="25" width="64" height="52" rx="3" fill="none" stroke="#ea580c" stroke-width="2.2"/>
        <rect x="38" y="31" width="52" height="40" rx="2" fill="none" stroke="#ea580c" stroke-width="2.0"/>
        <rect x="44" y="37" width="40" height="28" rx="2" fill="none" stroke="#ea580c" stroke-width="1.8"/>
        <rect x="50" y="43" width="28" height="16" rx="1" fill="none" stroke="#ea580c" stroke-width="1.5"/>
        <text x="48" y="54" font-size="7" font-weight="bold" fill="#fbbf24">13.56MHz</text>
        <text x="12" y="99" font-size="6.3" fill="#9a3412">平面銅スパイラル＋フェライト磁性遮蔽</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#b45309"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#7c2d12">13.56MHz NFC銅コイル＆磁性シート</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・6ターン銅スパイラルでスマホ即連携</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・背面フェライト(μr≈120)で渦電流遮断</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・Mg金属ボディ近傍でも高Q共振を維持</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・グリップ側面エラストマー直下へ配置</text>
      `);

    case 'mb_usb_pd_ctrl':
      return wrap(`
        <rect x="16" y="42" width="24" height="22" rx="3" fill="#cbd5e1" stroke="#334155"/>
        <text x="19" y="56" font-size="6.5" font-weight="bold" fill="#0f172a">USB-C</text>
        <rect x="48" y="28" width="24" height="18" rx="2" fill="#1e293b" stroke="#10b981"/>
        <rect x="78" y="28" width="24" height="18" rx="2" fill="#1e293b" stroke="#10b981"/>
        <line x1="40" y1="37" x2="118" y2="37" stroke="#10b981" stroke-width="2.2"/>
        <rect x="56" y="56" width="38" height="22" rx="3" fill="#064e3b" stroke="#10b981"/>
        <text x="61" y="70" font-size="6.8" font-weight="bold" fill="#6ee7b7">PD 3.1</text>
        <path d="M40 58 L56 64" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="12" y="99" font-size="6.3" fill="#065f46">逆流防止Dual MOSFET＋45W PPS制御</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#064e3b">USB-PD 3.1 45W電力制御＆保護</text>
        <text x="144" y="48" font-size="6.6" fill="#065f46">・CC1/CC2交渉で5–15V/3A最適給電</text>
        <text x="144" y="62" font-size="6.6" fill="#065f46">・背中合せDual MOSFETで逆流完全阻止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・Rds(on)&lt;12mΩで発熱ロス0.22W未満</text>
        <text x="144" y="89" font-size="6.6" fill="#047857">・OVP/OCP/24V短絡をμs単位で緊急遮断</text>
      `);

    case 'mb_nor_flash_eeprom':
      return wrap(`
        <rect x="20" y="24" width="50" height="40" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.6"/>
        <text x="27" y="41" font-size="7" font-weight="bold" fill="#e2e8f0">512Mb</text>
        <text x="27" y="53" font-size="6.5" fill="#38bdf8">Octal NOR</text>
        <rect x="80" y="32" width="40" height="32" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1.4"/>
        <text x="85" y="46" font-size="6.5" font-weight="bold" fill="#fde047">1Mb</text>
        <text x="84" y="56" font-size="6" fill="#f8fafc">EEPROM</text>
        <path d="M45 64 L45 80 L100 80 L100 64" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">400MB/s即時起動＋工場校正データROM</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">Octal-SPI NOR＆工場校正EEPROM</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・200MHz DDR 400MB/sで0.4秒高速起動</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・A/B冗長バンクで更新中電源断も復旧</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・画素欠陥/IBIS/幕速の個体校正値保存</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・高信頼WSON/BGA 40年データ保持</text>
      `);

    case 'mb_rtc_coin_cell':
      return wrap(`
        <circle cx="64" cy="52" r="24" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
        <circle cx="64" cy="52" r="18" fill="#e2e8f0" stroke="#eab308" stroke-width="2"/>
        <rect x="44" y="46" width="40" height="12" rx="2" fill="#d97706" opacity="0.85"/>
        <text x="53" y="54" font-size="6.8" font-weight="bold" fill="#ffffff">ML414</text>
        <path d="M90 52 L118 52" stroke="#10b981" stroke-width="2"/>
        <text x="94" y="46" font-size="6.5" fill="#047857">0.5μA</text>
        <text x="12" y="99" font-size="6.3" fill="#92400e">充電式ML414セル＋BeCu金メッキ保持枠</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">ML414充電式RTCバックアップ電池</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・3.0V/1.2mAh二次リチウムマンガン電池</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・待機0.5μAで電池抜去後も3か月超保持</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・C2PA電子署名タイムスタンプ基準維持</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・メイン電池装着時に自動トリクル充電</text>
      `);

    case 'mb_motor_driver_soc':
      return wrap(`
        <rect x="20" y="24" width="44" height="44" rx="4" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1.8"/>
        <rect x="30" y="34" width="24" height="24" rx="2" fill="#c2410c"/>
        <text x="27" y="78" font-size="6.5" font-weight="bold" fill="#312e81">6ch H-Bridge</text>
        <rect x="78" y="26" width="40" height="8" rx="1" fill="#ea580c" stroke="#94a3b8"/>
        <rect x="78" y="38" width="40" height="8" rx="1" fill="#ea580c" stroke="#94a3b8"/>
        <rect x="78" y="50" width="40" height="8" rx="1" fill="#ea580c" stroke="#94a3b8"/>
        <rect x="78" y="62" width="40" height="8" rx="1" fill="#ea580c" stroke="#94a3b8"/>
        <text x="80" y="80" font-size="6.2" fill="#9a3412">20mΩ Shunt×6</text>
        <text x="12" y="99" font-size="6.3" fill="#3730a3">100kHz無音PWM＋電流帰還シャント抵抗</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#312e81">6chモータードライバ＆シャント群</text>
        <text x="144" y="48" font-size="6.6" fill="#3730a3">・IBIS 3ch＋シャッター系を1チップ駆動</text>
        <text x="144" y="62" font-size="6.6" fill="#3730a3">・100kHz超音波PWMで動画コイル鳴き0</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・20mΩ金属箔シャントで電流精密帰還</text>
        <text x="144" y="89" font-size="6.6" fill="#4338ca">・銅発熱抵抗変動を補償し8.5段精度維持</text>
      `);

    case 'mb_cfx_heat_plate':
      return wrap(`
        <rect x="26" y="24" width="78" height="12" rx="2" fill="#cd6a3a" stroke="#7c2d12"/>
        <rect x="30" y="36" width="70" height="10" rx="1" fill="#38bdf8" opacity="0.85"/>
        <rect x="24" y="46" width="82" height="24" rx="2" fill="#94a3b8" stroke="#334155"/>
        <rect x="34" y="52" width="62" height="12" rx="1" fill="#1e293b"/>
        <text x="44" y="60" font-size="6.5" fill="#fbbf24">CFexpress 4.0</text>
        <path d="M65 50 L65 20" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="12" y="99" font-size="6.3" fill="#9a3412">C1100銅スプレッダ＋6W/mK熱伝導TIM</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#cd6a3a"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#7c2d12">CFexpress 4.0専用 銅放熱プレート</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・4GB/s書込時のNVMe発熱(3–4W)を回収</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・6.0W/m·K柔軟シリコーンTIMで密着</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・カード表面温度を約10–14℃低減</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・8K RAW連続収録の速度低下を防止</text>
      `);

    case 'mb_power_inductor_bank':
      return wrap(`
        <rect x="16" y="48" width="112" height="10" rx="2" fill="#065f46"/>
        <rect x="44" y="26" width="56" height="20" rx="2" fill="#0f766e" stroke="#134e4a"/>
        <text x="53" y="39" font-size="7" font-weight="bold" fill="#ffffff">4nm ISP</text>
        <rect x="20" y="60" width="18" height="16" rx="2" fill="#475569" stroke="#1e293b"/>
        <rect x="42" y="60" width="18" height="16" rx="2" fill="#475569" stroke="#1e293b"/>
        <rect x="64" y="60" width="18" height="16" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="86" y="60" width="18" height="16" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="108" y="60" width="16" height="16" rx="2" fill="#475569" stroke="#1e293b"/>
        <line x1="72" y1="46" x2="72" y2="60" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2 2"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">ISP直裏ビア直結 6相合金チョーク群</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">前面6相パワーインダクタ＆MLCC</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・120fps処理の20A/μs急変電流に即応</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・ISP直裏最短ビア接続でΔV&lt;15mV達成</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・閉磁路モールドで撮像素子へ漏磁なし</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・低ESR高分子タンタル＋0402積層実装</text>
      `);

    case 'mb_perimeter_ribbons':
      return wrap(`
        <rect x="38" y="30" width="64" height="44" rx="4" fill="#065f46" stroke="#047857" stroke-width="1.6"/>
        <path d="M52 30 L52 16 M70 30 L70 16 M88 30 L88 16" stroke="#ea580c" stroke-width="4.5"/>
        <path d="M102 42 L124 42 M102 58 L124 58" stroke="#ea580c" stroke-width="4.5"/>
        <path d="M38 42 L16 42 M38 58 L16 58" stroke="#ea580c" stroke-width="4.5"/>
        <path d="M62 74 Q62 88 78 88 Q90 88 90 74" fill="none" stroke="#ea580c" stroke-width="5"/>
        <text x="51" y="55" font-size="7" font-weight="bold" fill="#ffffff">12-Branch</text>
        <text x="12" y="102" font-size="6.3" fill="#9a3412">四辺＋基板裏面回り込み12系統FPC網</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#7c2d12">外周12系統＆裏面回り込みFPC網</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・A1 II/R5 II実機由来の12枝立体配線</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・0.3mmピッチ金端子 総信号線380本超</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・銀ペーストEMI遮蔽層で100Ω差動整合</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・基板裏面回り込みで極小ボディ実現</text>
      `);

    case 'mb_evf_cavity_bracket':
      return wrap(`
        <path d="M16 40 L44 40 L44 68 L96 68 L96 40 L124 40 L124 82 L16 82 Z" fill="#065f46" opacity="0.28" stroke="#065f46"/>
        <rect x="28" y="34" width="84" height="14" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <rect x="46" y="48" width="48" height="8" rx="1" fill="#1e293b"/>
        <rect x="50" y="56" width="40" height="8" rx="1" fill="#ea580c"/>
        <circle cx="36" cy="41" r="2.8" fill="#0f172a"/>
        <circle cx="104" cy="41" r="2.8" fill="#0f172a"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">EVF凹部を跨ぐ2点ねじ押さえ＆架橋板</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">EVFキャビティFPCクランプ＆タイ板</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・240Hz EVF ZIFを弾性パッドで均一圧着</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・落下衝撃によるEVF暗転抜けを100%防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・ノッチ肩部を橋渡ししねじり剛性+28%</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・2本ビス外しでEVF単独整備に対応</text>
      `);

    // =========================================================================
    // BODY (+12: B27–B38)
    // =========================================================================
    case 'body_top_sub_lcd':
      return wrap(`
        <rect x="20" y="24" width="102" height="10" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="24" y="36" width="94" height="14" rx="2" fill="#0f172a" stroke="#06b6d4"/>
        <rect x="30" y="40" width="22" height="6" fill="#38bdf8"/>
        <rect x="58" y="40" width="18" height="6" fill="#38bdf8"/>
        <rect x="82" y="40" width="26" height="6" fill="#22c55e"/>
        <rect x="18" y="52" width="106" height="8" rx="2" fill="#334155"/>
        <rect x="44" y="62" width="54" height="12" rx="1" fill="#ea580c"/>
        <text x="12" y="96" font-size="6.3" fill="#0369a1">ARガラス＋反転サブOLED＋EPDM枠</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#164e63">肩部ステータスサブOLEDモジュール</text>
        <text x="144" y="48" font-size="6.6" fill="#155e75">・炎天下〜星空まで高コントラスト視認</text>
        <text x="144" y="62" font-size="6.6" fill="#155e75">・消費電力約18mWで背面液晶消灯運用</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・7H AR強化ガラス＋全周EPDM防水枠</text>
        <text x="144" y="89" font-size="6.6" fill="#0e7490">・COF一体ドライバーFPCで超薄型実装</text>
      `);

    case 'body_vgrip_contacts':
      return wrap(`
        <rect x="22" y="24" width="96" height="24" rx="3" fill="#334155" stroke="#0f172a"/>
        <circle cx="34" cy="36" r="3" fill="#eab308"/><circle cx="48" cy="36" r="3" fill="#eab308"/>
        <circle cx="62" cy="36" r="3" fill="#eab308"/><circle cx="76" cy="36" r="3" fill="#eab308"/>
        <circle cx="90" cy="36" r="3" fill="#eab308"/><circle cx="104" cy="36" r="3" fill="#eab308"/>
        <rect x="26" y="62" width="88" height="16" rx="4" fill="#1f2937" stroke="#64748b"/>
        <path d="M70 48 L70 60" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2 2"/>
        <text x="12" y="96" font-size="6.3" fill="#92400e">12ピン高電流ポゴ端子＋二重防水蓋</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">縦位置グリップ12ピン拡張接点</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・連続6A/ピーク10A 並列金メッキ給電</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・接触抵抗&lt;20mΩで連写電圧降下を阻止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・縦位置シャッター/ダイヤル通信統合</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・非装着時は二重リップ防水蓋で密閉</text>
      `);

    case 'body_rear_button_pcb':
      return wrap(`
        <rect x="20" y="20" width="98" height="16" rx="3" fill="#ea580c" opacity="0.85"/>
        <rect x="20" y="20" width="34" height="64" rx="3" fill="#ea580c" opacity="0.85"/>
        <circle cx="37" cy="34" r="5" fill="#fde047" stroke="#92400e"/>
        <circle cx="37" cy="52" r="5" fill="#fde047" stroke="#92400e"/>
        <circle cx="37" cy="70" r="5" fill="#fde047" stroke="#92400e"/>
        <circle cx="72" cy="28" r="4.5" fill="#fde047" stroke="#92400e"/>
        <circle cx="96" cy="28" r="4.5" fill="#fde047" stroke="#92400e"/>
        <rect x="64" y="44" width="54" height="36" rx="3" fill="none" stroke="#94a3b8" stroke-dasharray="3 2"/>
        <text x="74" y="65" font-size="6.5" fill="#64748b">LCD開口</text>
        <text x="12" y="99" font-size="6.3" fill="#9a3412">7系統スナップドームFPC＋防水膜</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#7c2d12">背面メンブレンFPC＆防水キー膜</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・金メッキ4脚スナップドーム×7系統実装</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・2.2N/クリック率45%で手袋でも明快操作</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・一体シリコーン膜でボタン隙間浸水0</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・30万回押下耐久・厚さ1.2mm薄型積層</text>
      `);

    case 'body_front_custom_pod':
      return wrap(`
        <circle cx="42" cy="34" r="10" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
        <rect x="52" y="29" width="38" height="10" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="90" y="24" width="16" height="20" rx="2" fill="#065f46"/>
        <circle cx="42" cy="68" r="10" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="54" y="62" width="12" height="12" rx="2" fill="#eab308"/>
        <rect x="70" y="58" width="22" height="20" rx="2" fill="#065f46"/>
        <line x1="98" y1="44" x2="98" y2="68" stroke="#ea580c" stroke-width="3.5"/>
        <text x="12" y="99" font-size="6.3" fill="#991b1b">上:全反射タリー導光 / 下:前面C5</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#7f1d1d">前面C5ポッド＆タリーLED導光部</text>
        <text x="144" y="48" font-size="6.6" fill="#991b1b">・中指即応C5(連写ブースト)防水スイッチ</text>
        <text x="144" y="62" font-size="6.6" fill="#991b1b">・全反射ライトパイプで±75°広角タリー</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・AF補助光＆動画録画中赤点灯の2色LED</text>
        <text x="144" y="89" font-size="6.6" fill="#b91c1c">・Oリング軸封止で前面からの浸水を遮断</text>
      `);

    case 'body_speaker_chamber':
      return wrap(`
        <rect x="20" y="24" width="84" height="54" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1.8"/>
        <circle cx="52" cy="51" r="18" fill="#64748b" stroke="#cbd5e1" stroke-width="2"/>
        <circle cx="52" cy="51" r="8" fill="#0f172a"/>
        <path d="M108 38 Q116 51 108 64 M116 32 Q126 51 116 70" fill="none" stroke="#0284c7" stroke-width="2"/>
        <rect x="82" y="36" width="14" height="8" rx="1" fill="#eab308"/>
        <rect x="82" y="56" width="14" height="8" rx="1" fill="#eab308"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">0.8cm³密閉音響箱＋ネオジム振動子</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">密閉ネオジム再生マイクロスピーカ</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・0.8cm³気密室で音声帯域音圧を+8dB</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・撥水防塵アコースティックメッシュ付</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・報道音声メモ＆動画音声の明瞭再生</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・金メッキばね接点で無ハンダ基板結合</text>
      `);

    case 'body_pc_sync_terminal':
      return wrap(`
        <rect x="20" y="36" width="38" height="30" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <circle cx="38" cy="51" r="10" fill="#334155"/>
        <circle cx="38" cy="51" r="3.5" fill="#eab308"/>
        <rect x="74" y="28" width="44" height="46" rx="4" fill="#065f46" stroke="#047857"/>
        <rect x="82" y="38" width="28" height="18" rx="2" fill="#1e293b"/>
        <text x="86" y="50" font-size="6.5" font-weight="bold" fill="#38bdf8">400V</text>
        <line x1="58" y1="51" x2="74" y2="51" stroke="#f59e0b" stroke-width="2.2"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">ネジロックPC端子＋400V光絶縁回路</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">PCシンクロ同軸＆400V光絶縁基板</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・ISO 519ネジロックでスタジオ抜け防止</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・400V耐圧フォトトライアック光絶縁保護</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・トリガー遅延&lt;15μsで1/400s高速同調</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・脱落防止テザー付EPDMダストキャップ</text>
      `);

    case 'body_cooling_duct':
      return wrap(`
        <rect x="20" y="22" width="104" height="60" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
        <line x1="34" y1="26" x2="34" y2="78" stroke="#475569" stroke-width="2.4"/>
        <line x1="50" y1="26" x2="50" y2="78" stroke="#475569" stroke-width="2.4"/>
        <line x1="66" y1="26" x2="66" y2="78" stroke="#475569" stroke-width="2.4"/>
        <line x1="82" y1="26" x2="82" y2="78" stroke="#475569" stroke-width="2.4"/>
        <line x1="98" y1="26" x2="98" y2="78" stroke="#475569" stroke-width="2.4"/>
        <path d="M26 70 Q50 52 72 34 T114 28" fill="none" stroke="#f97316" stroke-width="2.2" stroke-dasharray="4 2"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">PGSグラファイト＋アルミ放熱フィン壁</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#334155"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">内部パッシブ放熱ダクト＆PGS層</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・1,500W/m·Kグラファイトで熱を全面拡散</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・完全ファンレスで騒音0dB＆防塵防滴</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・黒アルマイトフィンで背面自然対流促進</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・8K60p連続収録の局所過熱警告を抑止</text>
      `);

    case 'body_port_reinforce':
      return wrap(`
        <rect x="34" y="18" width="66" height="68" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <rect x="44" y="24" width="46" height="16" rx="2" fill="#ffffff" stroke="#475569"/>
        <rect x="44" y="44" width="46" height="16" rx="2" fill="#ffffff" stroke="#475569"/>
        <rect x="44" y="64" width="46" height="16" rx="2" fill="#ffffff" stroke="#475569"/>
        <circle cx="106" cy="28" r="4.5" fill="#d97706" stroke="#78350f"/>
        <circle cx="106" cy="76" r="4.5" fill="#d97706" stroke="#78350f"/>
        <path d="M16 52 L32 52" stroke="#dc2626" stroke-width="2.4"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">SUS張力枠＋プロテクター用M2.5ねじ座</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">左側面I/OポートSUS張力補強枠</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・t=1.6mm SUS枠でケーブルこじり荷重遮断</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・HDMI/USB/LANの基板ハンダ剥離を防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・ケーブルプロテクター用M2.5雌ねじ×2</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・B11防水ドアのEPDM着座基準面を保持</text>
      `);

    case 'body_tripod_block':
      return wrap(`
        <rect x="20" y="30" width="102" height="16" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <rect x="52" y="46" width="38" height="28" rx="3" fill="#94a3b8" stroke="#1e293b" stroke-width="1.8"/>
        <rect x="63" y="48" width="16" height="26" fill="#1e293b"/>
        <line x1="30" y1="18" x2="30" y2="30" stroke="#0284c7" stroke-width="3"/>
        <line x1="112" y1="18" x2="112" y2="30" stroke="#0284c7" stroke-width="3"/>
        <path d="M71 84 L71 74" stroke="#dc2626" stroke-width="2.4"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">SUS304 1/4-20 UNC 4本骨格直結</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">高荷重SUS三脚座ロードスプレッダ</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・光軸真下1/4-20 UNC削り出しSUS塊</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・4本M2.5ボルトで前面/中央骨格へ直結</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・引抜耐荷重&gt;1,200N / 締付10N·m対応</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・ビデオ雲台回り止めピン穴も一体加工</text>
      `);

    case 'body_batt_door_hinge':
      return wrap(`
        <rect x="20" y="38" width="96" height="14" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <rect x="16" y="54" width="104" height="8" rx="3" fill="#94a3b8" stroke="#1e293b"/>
        <rect x="74" y="46" width="24" height="12" rx="2" fill="#f5f5f4" stroke="#64748b"/>
        <path d="M36 58 L42 52 L48 64 L54 52 L60 58" fill="none" stroke="#d97706" stroke-width="2"/>
        <path d="M74 30 L96 30" stroke="#0284c7" stroke-width="2"/>
        <polygon points="98,30 92,26 92,34" fill="#0284c7"/>
        <text x="12" y="96" font-size="6.3" fill="#92400e">45°角度限定クイック脱着スライド軸</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#78350f">クイック脱着式バッテリー扉蝶番</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・45°位置のみで工具不要1秒脱着可能</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・縦位置グリップ装着時の扉外しを迅速化</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・フロート公差で全周EPDMを均一圧着</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・開閉5万回耐久トーションバネ内蔵</text>
      `);

    case 'body_perimeter_screws':
      return wrap(`
        <rect x="26" y="24" width="14" height="7" rx="2" fill="#1e293b"/>
        <rect x="30" y="31" width="6" height="28" fill="#475569"/>
        <rect x="30" y="42" width="6" height="10" fill="#2563eb"/>
        <rect x="60" y="24" width="14" height="7" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="64" y="31" width="6" height="36" fill="#94a3b8"/>
        <rect x="64" y="48" width="6" height="11" fill="#2563eb"/>
        <rect x="94" y="24" width="14" height="7" rx="2" fill="#c2410c"/>
        <rect x="98" y="31" width="6" height="24" fill="#ea580c"/>
        <text x="18" y="79" font-size="6.2" fill="#334155">黒M1.6 / SUS M2.0 / 銅EMI接地</text>
        <text x="12" y="99" font-size="6.3" fill="#1d4ed8">青色緩み止め付 色別24本ファスナー体系</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#1e3a8a">外装24本色別JIS小ねじ＆緩み止め</text>
        <text x="144" y="48" font-size="6.6" fill="#1e40af">・長さ/部位を黒・銀・銅色で誤組付防止</text>
        <text x="144" y="62" font-size="6.6" fill="#1e40af">・青色ナイロンパッチで熱衝撃緩み阻止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・銅接地ねじがMg外装間を同電位結合</text>
        <text x="144" y="89" font-size="6.6" fill="#2563eb">・規定トルク0.16–0.28N·m管理締結</text>
      `);

    case 'body_evf_tie_bracket':
      return wrap(`
        <path d="M24 78 L24 30 Q24 20 36 20 L104 20 Q116 20 116 30 L116 78" fill="none" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
        <rect x="44" y="40" width="52" height="34" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="3 2"/>
        <text x="58" y="60" font-size="7" font-weight="bold" fill="#0369a1">EVF</text>
        <path d="M70 8 L70 18" stroke="#dc2626" stroke-width="2.5"/>
        <polygon points="70,19 66,13 74,13" fill="#dc2626"/>
        <text x="12" y="99" font-size="6.3" fill="#334155">EVF非接触跨ぎ U字鍛造ロールケージ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">ペンタ部ロールケージ＆シューアーチ</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・600gストロボ/XLR衝撃を左右柱へ分散</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・直下のEVF鏡筒を非接触で完全保護</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・横衝撃18N·mでもEVFたわみ&lt;5μm</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・SUS304門型骨格で前面柱へ強固結合</text>
      `);

    default:
      return null;
  }
}
