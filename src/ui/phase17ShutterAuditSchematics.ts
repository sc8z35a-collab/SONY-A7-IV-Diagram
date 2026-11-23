import { PartExplanation } from '../assemblies/types';

/**
 * 20 bespoke beginner-friendly technical SVG schematics (320x118) for Phase 17:
 *  - Mechanical Shutter & Surroundings Deep-Audit Standalone Micro (+20: SH58–SH77)
 * Every text line is strictly bounded inside x <= 310 to guarantee zero SVG overflow.
 */
export function renderPhase17ShutterAuditSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    case 'shutter_blade_press_springs':
      return wrap(`
        <rect x="16" y="20" width="112" height="72" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="24" y="54" width="96" height="5" fill="#1e293b"/>
        <rect x="24" y="61" width="96" height="5" fill="#334155"/>
        <rect x="24" y="68" width="96" height="5" fill="#475569"/>
        <rect x="24" y="75" width="96" height="5" fill="#64748b"/>
        <path d="M22 30 Q68 32 82 52" fill="none" stroke="#d97706" stroke-width="3"/>
        <circle cx="82" cy="52" r="3.5" fill="#f59e0b"/>
        <line x1="82" y1="32" x2="82" y2="46" stroke="#dc2626" stroke-width="1.6"/>
        <polygon points="79,45 85,45 82,50" fill="#dc2626"/>
        <text x="26" y="29" font-size="6.2" fill="#b45309">50μm板ばね</text>
        <text x="12" y="112" font-size="6.8" fill="#b45309">格納ポケットの4枚羽根を0.1N微圧でZ方向押さえ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#92400e">羽根押さえ極薄板ばね</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・40km/h急停止時の羽根浮きを防止</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・微圧0.08–0.15Nで速度を落とさず鎮静</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・球面先端＋PTFEコートで低摩擦接触</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・10コマ連写の羽根噛み込みを根絶</text>
      `);

    case 'shutter_rivet_reinforce_collars':
      return wrap(`
        <rect x="16" y="20" width="112" height="72" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="22" y="34" width="46" height="44" rx="2" fill="#334155"/>
        <circle cx="45" cy="56" r="7" fill="#cbd5e1" stroke="#dc2626" stroke-width="1.6"/>
        <path d="M52 56 L62 49 M52 56 L62 63" stroke="#dc2626" stroke-width="1.4"/>
        <text x="24" y="31" font-size="6.1" fill="#dc2626">無補強:亀裂</text>
        <rect x="76" y="34" width="46" height="44" rx="2" fill="#1e293b"/>
        <ellipse cx="99" cy="56" rx="13" ry="10" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
        <circle cx="99" cy="56" r="6" fill="#cbd5e1"/>
        <text x="79" y="31" font-size="6.1" fill="#15803d">補強カラー</text>
        <text x="12" y="112" font-size="6.8" fill="#b45309">AFE-3360実機故障1位「リベット穴裂け」を応力分散</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#92400e">カシメ孔・応力分散補強座</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・285G衝撃が集中する16穴を補強</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・補強ハトメ導入で応力集中45%低減</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・改訂版 1-490-193-41 耐久向上構造</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・Hi+連写時の羽根ちぎれ脱線を防止</text>
      `);

    case 'shutter_blade_aramid_ply':
      return wrap(`
        <rect x="20" y="20" width="104" height="12" rx="2" fill="#0f172a"/>
        <rect x="20" y="34" width="104" height="14" rx="2" fill="#334155"/>
        <rect x="20" y="50" width="104" height="18" rx="2" fill="#d9b040" stroke="#a16207"/>
        <rect x="20" y="70" width="104" height="14" rx="2" fill="#1e293b"/>
        <text x="26" y="29" font-size="5.8" fill="#e2e8f0">超黒マット蒸着 R&lt;0.3%</text>
        <text x="26" y="44" font-size="5.8" fill="#fff">CFRP 0°カーボン外層</text>
        <text x="26" y="62" font-size="6.0" font-weight="bold" fill="#422006">アラミド(ケブラー)芯</text>
        <text x="26" y="80" font-size="5.8" fill="#fff">CFRP 90°カーボン外層</text>
        <text x="12" y="112" font-size="6.8" fill="#a16207">総厚75μmにカーボン＋防弾ベスト素材ケブラーを積層</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#854d0e">CFRP＋アラミド複合羽根</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・硬いカーボン＋粘るケブラーの芯材</text>
        <text x="144" y="60" font-size="6.3" fill="#a16207">・300G衝撃でも割れが広がらない靭性</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・アルミの約半分の軽さで超高速化</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・超黒蒸着膜が斜光フレアを吸収</text>
      `);

    case 'shutter_oil_trap_barriers':
      return wrap(`
        <rect x="16" y="18" width="44" height="76" rx="3" fill="#e2e8f0" stroke="#94a3b8"/>
        <rect x="64" y="18" width="16" height="76" rx="2" fill="#334155"/>
        <rect x="84" y="18" width="44" height="76" rx="3" fill="#ecfdf5" stroke="#10b981"/>
        <circle cx="38" cy="48" r="11" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
        <circle cx="52" cy="36" r="2.2" fill="#d97706"/>
        <circle cx="55" cy="58" r="2.2" fill="#d97706"/>
        <path d="M56 36 L64 36 M58 58 L64 58" stroke="#d97706" stroke-width="1.4" stroke-dasharray="2 1"/>
        <text x="21" y="30" font-size="6.0" fill="#475569">駆動室(油)</text>
        <text x="89" y="30" font-size="6.0" fill="#047857">清浄光路</text>
        <text x="88" y="60" font-size="6.2" fill="#047857">センサー</text>
        <text x="12" y="112" font-size="6.8" fill="#334155">毛細管トラップ溝＋多孔質吸油壁で油飛散を完全阻止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">グリス飛散防止オイルトラップ</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・285G軸から飛ぶ微細油霧を捕獲</text>
        <text x="144" y="60" font-size="6.3" fill="#0f766e">・毛細管溝で油膜の這い上がりを遮断</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・焼結多孔質吸油パッドがミスト吸収</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・センサーの黒い油点汚れを根本予防</text>
      `);

    case 'shutter_air_vent_equalizer':
      return wrap(`
        <rect x="18" y="20" width="108" height="72" rx="4" fill="#f1f5f9" stroke="#94a3b8"/>
        <rect x="30" y="30" width="84" height="10" rx="2" fill="#1e293b"/>
        <line x1="72" y1="42" x2="72" y2="66" stroke="#2563eb" stroke-width="2"/>
        <polygon points="68,64 76,64 72,71" fill="#2563eb"/>
        <rect x="26" y="76" width="92" height="10" rx="2" fill="#ffffff" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="3 2"/>
        <path d="M46 72 L46 92 M72 72 L72 92 M98 72 L98 92" stroke="#0284c7" stroke-width="1.3"/>
        <text x="36" y="37" font-size="5.8" fill="#fff">40km/h 高速幕</text>
        <text x="36" y="83" font-size="5.8" fill="#0369a1">ePTFE微多孔膜(0.5μm)</text>
        <text x="12" y="112" font-size="6.8" fill="#0369a1">空気圧だけ瞬時に逃がし外部ホコリは完全遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#075985">ピストン風圧エアベント膜</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・狭い0.55mm室の空気圧縮を解放</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・ピストン反力を80%減らしバウンド抑制</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・0.5μm ePTFE膜で塵と迷光を遮断</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・高周波風切り音を減らし音質も向上</text>
      `);

    case 'shutter_em_tilt_shims':
      return wrap(`
        <rect x="20" y="20" width="104" height="72" rx="4" fill="#eff6ff" stroke="#93c5fd"/>
        <rect x="34" y="28" width="52" height="22" rx="2" fill="#475569"/>
        <rect x="34" y="51" width="52" height="8" rx="1" fill="#2563eb"/>
        <rect x="34" y="61" width="52" height="16" rx="2" fill="#94a3b8"/>
        <circle cx="96" cy="40" r="6" fill="#dc2626"/>
        <circle cx="96" cy="64" r="6" fill="#2563eb"/>
        <text x="39" y="42" font-size="6.0" fill="#fff">Uヨーク</text>
        <text x="39" y="57" font-size="5.5" fill="#fff">10μmシム</text>
        <text x="90" y="30" font-size="5.6" fill="#b91c1c">封印</text>
        <text x="12" y="112" font-size="6.8" fill="#1d4ed8">平行度&lt;1μmへ追い込みエポキシ封印する傾き校正機構</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#1e40af">電磁石・傾き調整シム＆ねじ</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・0.2°の傾きでも保持力が急落</text>
        <text x="144" y="60" font-size="6.3" fill="#1d4ed8">・極薄シム＋細目ねじで&lt;1μm調整</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・校正後はエポキシ樹脂で完全封印</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・離脱ジッター±3μs未満を実現</text>
      `);

    case 'shutter_em_coil_terminals':
      return wrap(`
        <rect x="20" y="24" width="54" height="58" rx="4" fill="#d97706" stroke="#92400e"/>
        <rect x="26" y="32" width="42" height="42" rx="2" fill="#f59e0b" opacity="0.85"/>
        <line x1="74" y1="38" x2="96" y2="38" stroke="#b45309" stroke-width="1.5"/>
        <line x1="74" y1="68" x2="96" y2="68" stroke="#b45309" stroke-width="1.5"/>
        <rect x="94" y="31" width="10" height="14" rx="1" fill="#eab308" stroke="#854d0e"/>
        <rect x="94" y="61" width="10" height="14" rx="1" fill="#eab308" stroke="#854d0e"/>
        <rect x="108" y="26" width="16" height="54" rx="2" fill="#f97316"/>
        <text x="29" y="55" font-size="6.0" fill="#451a03">Kapton巻</text>
        <text x="110" y="56" font-size="5.6" fill="#fff">FPC</text>
        <text x="12" y="112" font-size="6.8" fill="#b45309">φ0.045mm極細線を金ポスト中継＋耐熱テープ保護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#854d0e">コイル極細線・中継ポスト</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・髪の毛より細いφ45μmエナメル線</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・剛性ポストへからげ接続し張力遮断</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・25μmカプトン帯で巻線共振を拘束</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・50万回285G衝撃でも断線ゼロ</text>
      `);

    case 'shutter_em_flux_separator':
      return wrap(`
        <rect x="18" y="24" width="38" height="56" rx="4" fill="#d97706"/>
        <rect x="65" y="18" width="12" height="68" rx="2" fill="#64748b" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="86" y="24" width="38" height="56" rx="4" fill="#0284c7"/>
        <path d="M56 36 Q64 42 56 50 M56 56 Q64 62 56 70" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <text x="25" y="54" font-size="6.2" fill="#fff">先幕EM</text>
        <text x="93" y="54" font-size="6.2" fill="#fff">後幕EM</text>
        <text x="59" y="96" font-size="6.0" fill="#334155">パーマロイ隔壁</text>
        <text x="12" y="112" font-size="6.8" fill="#334155">125μs差の2基の電磁石を磁気遮蔽隔壁で−32dB隔離</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">磁気クロストーク遮蔽隔壁</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・先幕遮断時の逆起磁束漏れを吸収</text>
        <text x="144" y="60" font-size="6.3" fill="#1d4ed8">・パーマロイ78＋アルミで−32dB遮蔽</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・後幕保持磁界の乱れを完全防止</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・1/8000秒スリット幅を精密維持</text>
      `);

    case 'shutter_dual_boost_stator':
      return wrap(`
        <circle cx="72" cy="54" r="34" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
        <circle cx="72" cy="54" r="24" fill="#334155"/>
        <circle cx="72" cy="54" r="15" fill="#c86432" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="72" cy="54" r="7" fill="#0ea5e9"/>
        <text x="20" y="26" font-size="6.0" fill="#0369a1">N52ハルバッハ</text>
        <text x="58" y="97" font-size="6.0" fill="#b45309">CCAW可動コイル</text>
        <text x="12" y="112" font-size="6.8" fill="#0369a1">バネ＋電磁ローレンツ力のWターボで1/400秒同調</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#075985">デュアル駆動・電磁ブースター</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・Sony α1採用 バネ＋電磁W駆動</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・ハルバッハN52磁石で磁束0.85T</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・発進0.8msを電磁力でターボ加速</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・FF 1/400秒・APS-C 1/500秒同調</text>
      `);

    case 'shutter_efcs_brake_solenoid':
      return wrap(`
        <rect x="18" y="20" width="108" height="72" rx="4" fill="#ecfdf5" stroke="#10b981"/>
        <rect x="26" y="26" width="92" height="12" rx="2" fill="#94a3b8"/>
        <rect x="96" y="24" width="18" height="16" rx="2" fill="#059669"/>
        <line x1="28" y1="54" x2="116" y2="54" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 2"/>
        <rect x="26" y="66" width="92" height="14" rx="2" fill="#1e293b"/>
        <text x="30" y="34" font-size="5.7" fill="#fff">メカ先幕:全開ロック</text>
        <text x="32" y="50" font-size="5.8" fill="#0369a1">電子先幕リセット走査</text>
        <text x="32" y="75" font-size="5.8" fill="#fff">メカ後幕のみ走行</text>
        <text x="12" y="112" font-size="6.8" fill="#047857">電子先幕ON時は先幕を全開保持し振動と音を半減</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#065f46">電子先幕待避ラッチ＆スナバ</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・先幕を無通電で全開待機ロック</text>
        <text x="144" y="60" font-size="6.3" fill="#047857">・露光開始ショック0で微ブレ激減</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・RCスナバが後幕クリック音を静音化</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・F1.2高速域はフルメカへ自在切替</text>
      `);

    case 'shutter_motor_commutator_varistor':
      return wrap(`
        <circle cx="72" cy="54" r="32" fill="#1d63b8" stroke="#1e3a8a" stroke-width="2"/>
        <circle cx="72" cy="54" r="18" fill="#d97706" stroke="#fff" stroke-width="1.5"/>
        <line x1="72" y1="36" x2="72" y2="54" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="72" y1="54" x2="57" y2="63" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="72" y1="54" x2="87" y2="63" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="18" y="49" width="36" height="10" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="90" y="49" width="36" height="10" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="20" y="44" font-size="5.8" fill="#334155">Ag-Pdブラシ</text>
        <text x="44" y="96" font-size="6.0" fill="#1d4ed8">青色ZnOバリスタ</text>
        <text x="12" y="112" font-size="6.8" fill="#1d4ed8">3極整流子の火花放電を5nsで吸収し画像ノイズ遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#1d63b8"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#1e3a8a">整流子・貴金属ブラシ＆バリスタ</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・Ref.458 チャージモーター内部構造</text>
        <text x="144" y="60" font-size="6.3" fill="#1d4ed8">・ZnOバリスタがブラシ火花を5ns吸収</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・接点の炭化摩耗を防ぎ寿命を3倍化</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・CMOSセンサーへの横縞EMIを遮断</text>
      `);

    case 'shutter_charge_rotary_encoder':
      return wrap(`
        <circle cx="72" cy="54" r="33" fill="#14532d" stroke="#15803d" stroke-width="1.6"/>
        <circle cx="72" cy="54" r="26" fill="none" stroke="#eab308" stroke-width="3.2" stroke-dasharray="32 10"/>
        <circle cx="72" cy="54" r="18" fill="none" stroke="#facc15" stroke-width="3.2" stroke-dasharray="22 12"/>
        <circle cx="72" cy="54" r="10" fill="none" stroke="#fde047" stroke-width="3.0" stroke-dasharray="16 8"/>
        <line x1="72" y1="54" x2="102" y2="38" stroke="#f97316" stroke-width="2.4"/>
        <circle cx="72" cy="54" r="4" fill="#cbd5e1"/>
        <text x="18" y="22" font-size="5.8" fill="#15803d">3トラック金基板</text>
        <text x="12" y="112" font-size="6.8" fill="#b45309">3ビット回転位相で状態検知・異常時はカメラエラー発報</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#854d0e">チャージ回転位相エンコーダ</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・A2231470B 出力カム裏の金パターン</text>
        <text x="144" y="60" font-size="6.3" fill="#b45309">・2股フォークブラシで±0.5°角度検出</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・待機/チャージ/防塵幕閉を精密制御</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・80ms未到達で「カメラエラー」保護</text>
      `);

    case 'shutter_charge_oldham_sockets':
      return wrap(`
        <rect x="16" y="34" width="26" height="40" rx="3" fill="#475569"/>
        <rect x="44" y="42" width="52" height="24" rx="3" fill="#0ea5e9" stroke="#0369a1"/>
        <rect x="98" y="34" width="28" height="40" rx="3" fill="#64748b"/>
        <rect x="38" y="46" width="8" height="16" fill="#eab308"/>
        <rect x="94" y="46" width="8" height="16" fill="#eab308"/>
        <text x="18" y="28" font-size="5.8" fill="#334155">浮かし側</text>
        <text x="50" y="56" font-size="6.0" fill="#fff">Ref.457軸</text>
        <text x="96" y="28" font-size="5.8" fill="#334155">固定側</text>
        <text x="42" y="88" font-size="6.0" fill="#0369a1">直交十字溝 Δr±0.4mm</text>
        <text x="12" y="112" font-size="6.8" fill="#0369a1">オルダム十字受口＋ウェーブばねで偏心吸収＆振動絶縁</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#155e75">オルダム十字カップリング受口</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・フローティング軸(Ref.457)両端受口</text>
        <text x="144" y="60" font-size="6.3" fill="#0e7490">・90°直交溝が±0.4mm軸ズレを吸収</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・ウェーブ予圧ばねで軸ガタを解消</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・防振効果と10fps高トルク伝達両立</text>
      `);

    case 'shutter_charge_oem_bolts':
      return wrap(`
        <rect x="20" y="26" width="66" height="58" rx="4" fill="#64748b"/>
        <path d="M88 22 L96 22 L96 86 L24 86 L24 80" fill="none" stroke="#94a3b8" stroke-width="5"/>
        <circle cx="34" cy="34" r="5" fill="#e2e8f0" stroke="#2563eb" stroke-width="1.8"/>
        <circle cx="76" cy="34" r="5" fill="#e2e8f0" stroke="#2563eb" stroke-width="1.8"/>
        <circle cx="55" cy="76" r="5" fill="#e2e8f0" stroke="#2563eb" stroke-width="1.8"/>
        <text x="26" y="56" font-size="6.0" fill="#fff">Ref.458箱</text>
        <text x="100" y="58" font-size="5.8" fill="#475569">SUS補強</text>
        <text x="12" y="112" font-size="6.8" fill="#334155">Ref.461(418599001 M1.6×4.5)×3＋反力受け補強板</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">チャージ専用ねじ＆補強板</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・純正 Ref.461 M1.6×4.5専用ボルト</text>
        <text x="144" y="60" font-size="6.3" fill="#1d4ed8">・連写巻上げ反力0.16N·mを剛性支持</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・SH57(防振M2)とは別系統の締結設計</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・SUS板がモーター筐体GNDも兼任</text>
      `);

    case 'shutter_charge_motor_isolator':
      return wrap(`
        <rect x="18" y="22" width="108" height="68" rx="6" fill="#475569"/>
        <rect x="28" y="30" width="88" height="52" rx="5" fill="#94a3b8"/>
        <circle cx="72" cy="56" r="19" fill="#334155" stroke="#0ea5e9" stroke-width="4"/>
        <circle cx="72" cy="56" r="10" fill="#cbd5e1"/>
        <text x="22" y="19" font-size="5.8" fill="#334155">吸音ウレタン外被</text>
        <text x="40" y="98" font-size="5.8" fill="#0369a1">Shore A35 防振カラー</text>
        <text x="12" y="112" font-size="6.8" fill="#334155">シリコーンカラー＋連続気泡フォームで3–6kHz音消音</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">モーター防振＆吸音ラップ</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・軟質シリコーンで固体振動−15dB</text>
        <text x="144" y="60" font-size="6.3" fill="#0369a1">・吸音フォームが3–6kHz唸り音を吸収</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・SH50(打撃音担当)との見事な帯域分担</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・高級機らしい引き締まった動作音へ</text>
      `);

    case 'shutter_mecha_cradle_frame':
      return wrap(`
        <rect x="18" y="20" width="106" height="72" rx="6" fill="#64748b" stroke="#334155" stroke-width="2"/>
        <rect x="34" y="32" width="56" height="44" rx="3" fill="#ffffff" stroke="#0f172a"/>
        <circle cx="26" cy="28" r="4" fill="#e2e8f0"/>
        <circle cx="116" cy="28" r="4" fill="#e2e8f0"/>
        <circle cx="26" cy="84" r="4" fill="#e2e8f0"/>
        <circle cx="116" cy="84" r="4" fill="#e2e8f0"/>
        <text x="39" y="52" font-size="6.0" fill="#0f172a">AFE-3360</text>
        <text x="38" y="64" font-size="5.6" fill="#475569">基準一体加工</text>
        <text x="12" y="112" font-size="6.8" fill="#334155">Ref.451(A5033415A)一体骨格で18.000mm基準確保</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">メカデバイス統合クレードル</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・純正 Ref.451 SERVICE MECHA 骨格</text>
        <text x="144" y="60" font-size="6.3" fill="#1d4ed8">・マウント/シャッター/IBISを一体固定</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・CNC基準座面で平行度±5μm以内</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・大口径レンズ装着時の片ボケを防止</text>
      `);

    case 'shutter_mount_baffle_trough':
      return wrap(`
        <rect x="18" y="20" width="108" height="72" rx="4" fill="#0f172a"/>
        <polyline points="24,26 44,26 44,32 68,32 68,38 114,38" fill="none" stroke="#94a3b8" stroke-width="2"/>
        <polyline points="24,84 44,84 44,78 68,78 68,72 114,72" fill="none" stroke="#94a3b8" stroke-width="2"/>
        <line x1="22" y1="54" x2="118" y2="54" stroke="#38bdf8" stroke-width="2"/>
        <line x1="22" y1="30" x2="62" y2="34" stroke="#ef4444" stroke-width="1.4" stroke-dasharray="3 2"/>
        <rect x="66" y="79" width="46" height="8" rx="1" fill="#14b8a6"/>
        <text x="68" y="85" font-size="5.4" fill="#fff">ダスト受け溝</text>
        <text x="12" y="112" font-size="6.8" fill="#1e293b">3段階段バッフル反射率&lt;0.05%＋底面ダスト捕集溝</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0f172a">階段遮光バッフル＆ダスト溝</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・マウント〜シャッター間の暗箱内壁</text>
        <text x="144" y="60" font-size="6.3" fill="#dc2626">・3段ナイフエッジで迷光を多重吸収</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・底面の粘着トラフ溝へホコリ沈降</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・逆光フレア低減と防塵を同時達成</text>
      `);

    case 'shutter_ibis_clearance_frame':
      return wrap(`
        <rect x="20" y="22" width="22" height="68" rx="2" fill="#334155"/>
        <rect x="52" y="22" width="12" height="68" rx="2" fill="#0f766e"/>
        <rect x="64" y="26" width="6" height="10" rx="1" fill="#f8fafc" stroke="#0f766e"/>
        <rect x="64" y="76" width="6" height="10" rx="1" fill="#f8fafc" stroke="#0f766e"/>
        <rect x="86" y="28" width="32" height="56" rx="3" fill="#0284c7"/>
        <path d="M102 18 L102 26 M102 86 L102 94" stroke="#0284c7" stroke-width="1.8"/>
        <text x="22" y="58" font-size="5.6" fill="#fff">後幕</text>
        <text x="90" y="58" font-size="5.8" fill="#fff">IBIS</text>
        <text x="48" y="18" font-size="5.8" fill="#0f766e">1.8mm規制</text>
        <text x="12" y="112" font-size="6.8" fill="#0f766e">5軸IBIS可動センサーと後幕の接触をPTFEバンパーで防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0fdfa" stroke="#0f766e"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#115e59">IBIS動的クリアランス規制枠</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・後幕のわずか1.8mm後ろでIBIS駆動</text>
        <text x="144" y="60" font-size="6.3" fill="#0f766e">・衝撃時も4隅PTFEバンパーで隔離</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・厚さ75μmの羽根衝突事故を100%回避</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・後幕背面の回り込み迷光マスク兼用</text>
      `);

    case 'shutter_hbridge_driver_stage':
      return wrap(`
        <rect x="18" y="20" width="108" height="72" rx="4" fill="#f0fdf4" stroke="#16a34a"/>
        <polyline points="24,78 32,78 32,32 48,32 48,54 56,54 56,64 62,64 62,54 68,54 68,64 74,64 74,54 80,54 80,78 116,78" fill="none" stroke="#16a34a" stroke-width="2"/>
        <text x="26" y="29" font-size="5.6" fill="#dc2626">ピーク吸着</text>
        <text x="52" y="48" font-size="5.6" fill="#15803d">PWM省エネ保持</text>
        <text x="86" y="70" font-size="5.6" fill="#0369a1">逆励磁消磁</text>
        <text x="12" y="112" font-size="6.8" fill="#15803d">ピーク＆PWM保持で発熱70%減＋20mΩ過電流保護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#166534">Hブリッジ駆動＆保護シャント</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・吸着後PWM制御でコイル発熱70%減</text>
        <text x="144" y="60" font-size="6.3" fill="#15803d">・20mΩ抵抗が異常過電流を5ms遮断</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・ジャム時のモーター焼損とギア破損防止</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・逆励磁消磁で離脱バラつきも圧縮</text>
      `);

    case 'shutter_eeprom_cal_tag':
      return wrap(`
        <rect x="20" y="24" width="54" height="54" rx="4" fill="#ffffff" stroke="#0284c7" stroke-width="1.8"/>
        <rect x="26" y="30" width="12" height="12" fill="#0f172a"/>
        <rect x="56" y="30" width="12" height="12" fill="#0f172a"/>
        <rect x="26" y="60" width="12" height="12" fill="#0f172a"/>
        <rect x="44" y="46" width="8" height="8" fill="#0284c7"/>
        <rect x="56" y="58" width="10" height="10" fill="#0f172a"/>
        <line x1="76" y1="51" x2="94" y2="51" stroke="#0284c7" stroke-width="2"/>
        <polygon points="92,48 98,51 92,54" fill="#0284c7"/>
        <rect x="98" y="34" width="28" height="34" rx="3" fill="#1e293b"/>
        <text x="102" y="54" font-size="5.6" fill="#38bdf8">EEPROM</text>
        <text x="12" y="112" font-size="6.8" fill="#0369a1">個体固有の幕速差±30μsをQR登録し全速±0.05EV校正</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.1" font-weight="bold" fill="#0369a1">個体別校正QR＆タイミング表</text>
        <text x="144" y="46" font-size="6.3" fill="#334155">・新品でもバネ個体差±30μsが存在</text>
        <text x="144" y="60" font-size="6.3" fill="#0284c7">・工場レーザー測定値をQRへ符号化</text>
        <text x="144" y="74" font-size="6.3" fill="#334155">・修理交換時は専用調整ソフト登録必須</text>
        <text x="144" y="88" font-size="6.3" fill="#475569">・1/8000s・EFCSの露出ムラを完全解消</text>
      `);

    default:
      return null;
  }
}
