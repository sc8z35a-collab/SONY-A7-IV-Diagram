import { PartExplanation } from '../assemblies/types';

/**
 * 24 bespoke beginner-friendly technical SVG schematics (320x118) for Phase 16B:
 *  - EVF & Viewfinder Surroundings Standalone Micro (+24: E32–E55)
 */
export function renderPhase16EvfSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // Group 1: Sony OEM VF BLOCK & Eye-Sensor Surroundings (E32–E39)
    // =========================================================================
    case 'evf_oem_finder_cover':
      return wrap(`
        <rect x="22" y="18" width="92" height="58" rx="8" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="36" y="28" width="64" height="38" rx="4" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="44" y="74" width="48" height="16" rx="3" fill="#1e293b" stroke="#64748b"/>
        <path d="M16 40 L26 40 L26 46 L20 46 L20 52" fill="none" stroke="#0ea5e9" stroke-width="1.6"/>
        <text x="48" y="50" font-size="6.5" fill="#0369a1">接眼開口</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">Ref.113 FINDER COVER 外周ラビリンス段差で防塵防滴</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">Sony純正 FINDER COVER</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・品番 A5038709A (Ref.113)</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・フチの迷路段差が雨粒・砂埃をブロック</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・下部にアイセンサー専用保護枠を成型</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・アイカップを外すと現れる玄関フレーム</text>
      `);

    case 'evf_oem_eye_sensor_window':
      return wrap(`
        <rect x="18" y="26" width="100" height="14" rx="2" fill="#3b071e" stroke="#be123c" stroke-width="1.5"/>
        <rect x="64" y="40" width="8" height="38" fill="#0f172a"/>
        <rect x="26" y="64" width="28" height="14" rx="2" fill="#e11d48"/>
        <rect x="82" y="64" width="28" height="14" rx="2" fill="#0284c7"/>
        <path d="M40 64 L54 14 L96 64" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="31" y="74" font-size="6.2" fill="#fff">発光</text>
        <text x="87" y="74" font-size="6.2" fill="#fff">受光</text>
        <text x="12" y="112" font-size="7.0" fill="#9f1239">Ref.117 赤外940nm透過黒窓＆中央遮光隔壁で誤動作ゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#881337">EYE SENSOR WINDOW</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Sony純正 501034401 (Ref.117)</text>
        <text x="144" y="60" font-size="6.4" fill="#be123c">・可視光99.9%遮断・940nm赤外90%透過</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・中央仕切り壁が光の横漏れ誤検知を防止</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・直射日光下でも正確に顔の接近を判定</text>
      `);

    case 'evf_oem_eye_sensor_cushions':
      return wrap(`
        <rect x="20" y="20" width="96" height="12" rx="2" fill="#334155"/>
        <rect x="20" y="36" width="96" height="14" rx="2" fill="#f97316"/>
        <rect x="20" y="54" width="96" height="12" rx="2" fill="#475569"/>
        <rect x="20" y="70" width="96" height="10" rx="2" fill="#94a3b8"/>
        <text x="32" y="29" font-size="6.2" fill="#fff">前面WPクッション(118)</text>
        <text x="34" y="46" font-size="6.2" fill="#fff">ES-1008フレキ(116)</text>
        <text x="32" y="63" font-size="6.2" fill="#fff">背面RETクッション(114)</text>
        <text x="34" y="78" font-size="6.2" fill="#0f172a">ES GNDシート(115)</text>
        <text x="12" y="112" font-size="7.0" fill="#c2410c">前後2重防水スポンジ＋静電シートで汗・雨を完全防御</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#9a3412">アイセンサー4点保護層</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.114/115/116/118 純正4層サンド</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・顔や汗に最も近い部位を前後2重防水</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・ES GNDシートが静電気ESDを逃がす</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・雨天撮影でもファインダー自動切替安定</text>
      `);

    case 'evf_oem_vf_radiation_sheet':
      return wrap(`
        <rect x="24" y="20" width="88" height="46" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="24" y="54" width="88" height="12" rx="2" fill="#f472b6"/>
        <rect x="36" y="72" width="64" height="10" rx="2" fill="#64748b"/>
        <path d="M68 44 L20 26 M68 44 L116 26" stroke="#ef4444" stroke-width="1.6"/>
        <text x="34" y="40" font-size="6.4" fill="#0c4a6e">Ref.203 放熱シート</text>
        <text x="42" y="80" font-size="6.2" fill="#fff">Ref.202 保護膜</text>
        <text x="12" y="112" font-size="7.0" fill="#0369a1">Sony純正457578001 OLEDの熱を逃がし寿命を約2倍へ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0c4a6e">VF RADIATION SHEET</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・品番 457578001＋457581811</text>
        <text x="144" y="60" font-size="6.4" fill="#0369a1">・高輝度OLEDの熱を上骨格へ素早く拡散</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・温度10℃低下でOLED焼き付き寿命約2倍</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・裏フタ固着を防ぐ保護フィルム併用</text>
      `);

    case 'evf_oem_evf_protector':
      return wrap(`
        <rect x="40" y="14" width="56" height="12" rx="2" fill="#94a3b8"/>
        <path d="M18 52 Q68 24 118 52" fill="none" stroke="#475569" stroke-width="7" stroke-linecap="round"/>
        <rect x="34" y="56" width="68" height="26" rx="4" fill="#1e293b"/>
        <path d="M68 28 L68 38" stroke="#ef4444" stroke-width="2"/>
        <text x="46" y="72" font-size="6.5" fill="#38bdf8">EVF光学鏡筒</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">Ref.303 EVFプロテクター ストロボ衝撃＆EMIを天井遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">Sony純正 EVF PROTECTOR</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・品番 502790801 (Ref.303)</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・ファインダー頭上を守る内装ヘルメット</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・重いストロボの衝撃荷重からレンズ保護</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・ストロボ発光時の高圧電波ノイズ遮断</text>
      `);

    case 'evf_oem_diopter_wp_sheet':
      return wrap(`
        <rect x="26" y="22" width="14" height="62" rx="2" fill="#475569"/>
        <rect x="44" y="28" width="10" height="50" rx="2" fill="#0ea5e9"/>
        <rect x="54" y="44" width="32" height="18" fill="#94a3b8"/>
        <rect x="86" y="30" width="22" height="46" rx="4" fill="#1e293b"/>
        <path d="M84 18 Q98 18 98 28" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <text x="20" y="96" font-size="6.3" fill="#0369a1">Ref.301 防水シートB ＋ Ref.2 蓋</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">回転＋押引する視度ダイヤル軸を低摩擦シートで防滴</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">視度ダイヤル防水シートB</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.301(500374001)＋Ref.2(500367201)</text>
        <text x="144" y="60" font-size="6.4" fill="#0284c7">・飛び出すダイヤル穴からの雨水侵入阻止</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・回転とプッシュロック摺動に滑らか追従</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・化粧キャップが固定ビス1本を保護</text>
      `);

    case 'evf_oem_jk1028_flex_holder':
      return wrap(`
        <rect x="34" y="20" width="26" height="66" rx="5" fill="#334155"/>
        <path d="M62 24 C86 24 86 48 68 54 C54 60 54 78 86 84" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round"/>
        <rect x="82" y="78" width="24" height="12" rx="2" fill="#eab308"/>
        <text x="36" y="56" font-size="6.2" fill="#fff">保持枠</text>
        <text x="12" y="112" font-size="7.0" fill="#c2410c">Ref.205樹脂ガイド＋Ref.206 JK-1028で狭い脇の断線防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#9a3412">JK-1028＆JKホルダー</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.206(A5022316A)＋Ref.205(502789601)</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・VF横の狭小空間で安全な曲げRを維持</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・金属角擦れ・ネジ噛み込み事故を防止</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・ユニット化で高い長期振動耐久性を確保</text>
      `);

    case 'evf_oem_vf_mounting_screws':
      return wrap(`
        <rect x="28" y="24" width="16" height="8" rx="1" fill="#64748b"/>
        <rect x="33" y="32" width="6" height="24" fill="#94a3b8"/>
        <rect x="60" y="24" width="16" height="8" rx="1" fill="#64748b"/>
        <rect x="65" y="32" width="6" height="32" fill="#94a3b8"/>
        <rect x="92" y="24" width="16" height="8" rx="1" fill="#64748b"/>
        <rect x="97" y="32" width="6" height="44" fill="#94a3b8"/>
        <path d="M56 36 Q68 32 80 36" fill="none" stroke="#eab308" stroke-width="2"/>
        <text x="26" y="70" font-size="6.3" fill="#475569">2.5</text>
        <text x="58" y="78" font-size="6.3" fill="#475569">3.0</text>
        <text x="90" y="88" font-size="6.3" fill="#475569">4.0mm</text>
        <text x="12" y="112" font-size="7.0" fill="#475569">Ref.204/207/208 長さ別M1.7精密ネジ＆波座金セット</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">VF固定 箇所別精密ネジ群</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・L=2.5 / 3.0 / 4.0mmを0.5mm刻み選別</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・奥のレンズ破損を防ぐ適正ねじ込深さ</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・ウェーブ座金で振動緩み・熱膨張吸収</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・EVF光軸傾き±0.05°以内の無調整再現</text>
      `);

    // =========================================================================
    // Group 2: Viewfinder Hump Surroundings — MI Hot Shoe & Stereo Mic (E40–E45)
    // =========================================================================
    case 'evf_surr_mi_shoe_shell':
      return wrap(`
        <rect x="24" y="22" width="88" height="14" rx="2" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/>
        <rect x="44" y="28" width="48" height="6" fill="#cbd5e1"/>
        <rect x="18" y="42" width="100" height="12" rx="2" fill="#475569"/>
        <rect x="24" y="60" width="88" height="14" rx="2" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="36" y1="22" x2="36" y2="74" stroke="#eab308" stroke-width="2.2"/>
        <line x1="100" y1="22" x2="100" y2="74" stroke="#eab308" stroke-width="2.2"/>
        <text x="42" y="51" font-size="6.2" fill="#fff">軍艦部屋根</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">Ref.327外枠＋Ref.311裏固定板で屋根を強力サンド</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">MIシュー外枠＆裏固定板</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.327枠＋Ref.311裏板＋Ref.329蓋</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・屋根を金属板で挟み4本特殊ビス締結</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・重いストロボやXLRマイクでも高剛性</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・ネジ隠しカバーでフラット＆防水仕上</text>
      `);

    case 'evf_surr_mi_shoe_contacts':
      return wrap(`
        <rect x="18" y="26" width="100" height="24" rx="3" fill="#1e293b"/>
        <g fill="#eab308">
          <rect x="24" y="34" width="3" height="14"/><rect x="30" y="34" width="3" height="14"/>
          <rect x="36" y="34" width="3" height="14"/><rect x="42" y="34" width="3" height="14"/>
          <rect x="48" y="34" width="3" height="14"/><rect x="54" y="34" width="3" height="14"/>
          <rect x="60" y="34" width="3" height="14"/><rect x="66" y="34" width="3" height="14"/>
          <rect x="72" y="34" width="3" height="14"/><rect x="78" y="34" width="3" height="14"/>
          <rect x="84" y="34" width="3" height="14"/><rect x="90" y="34" width="3" height="14"/>
          <rect x="96" y="34" width="3" height="14"/><rect x="102" y="34" width="3" height="14"/>
        </g>
        <rect x="24" y="54" width="88" height="14" rx="3" fill="#334155" stroke="#0f172a"/>
        <rect x="48" y="68" width="40" height="16" fill="#f97316"/>
        <text x="36" y="64" font-size="6.2" fill="#fff">Ref.324 防滴ゴムブーツ</text>
        <text x="12" y="112" font-size="7.0" fill="#a16207">Ref.325 MIS-2006 ケーブル不要21ピンデジタル音声接点</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#854d0e">21ピン MIS-2006接点</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・品番 A5001908A＋防滴ゴム 501695501</text>
        <text x="144" y="60" font-size="6.4" fill="#a16207">・4ch 24-bitデジタル音声を直接伝送</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・ケーブル不要でアナログ雑音を完全排除</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・裏側のEPDMブーツが雨滴浸入を遮断</text>
      `);

    case 'evf_surr_mi_shoe_springs':
      return wrap(`
        <rect x="24" y="20" width="88" height="16" rx="3" fill="#1e293b"/>
        <path d="M30 62 L56 50 L80 50 L106 62" fill="none" stroke="#94a3b8" stroke-width="3.5"/>
        <rect x="22" y="64" width="92" height="10" rx="2" fill="#475569"/>
        <path d="M68 48 L68 38" stroke="#eab308" stroke-width="2"/>
        <polygon points="68,34 64,41 72,41" fill="#eab308"/>
        <text x="40" y="31" font-size="6.3" fill="#fff">Ref.9 シューキャップ</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">Ref.331板バネでガタゼロ＋Ref.9保護キャップで防塵</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">シュー板バネ＆保護キャップ</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.331(500294502)＋Ref.9(443873412)</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・下から6〜10Nで押上げガタ＆瞬断防止</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・金属脚との確実なグランド接地を確保</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・未使用時は21ピン端子を雨・埃から保護</text>
      `);

    case 'evf_surr_stereo_mics':
      return wrap(`
        <rect x="20" y="28" width="38" height="44" rx="8" fill="#475569" stroke="#1e293b"/>
        <circle cx="39" cy="48" r="10" fill="#eab308" stroke="#854d0e"/>
        <rect x="78" y="28" width="38" height="44" rx="8" fill="#475569" stroke="#1e293b"/>
        <circle cx="97" cy="48" r="10" fill="#eab308" stroke="#854d0e"/>
        <path d="M22 16 Q39 24 56 16" fill="none" stroke="#0ea5e9" stroke-width="1.6"/>
        <path d="M80 16 Q97 24 114 16" fill="none" stroke="#0ea5e9" stroke-width="1.6"/>
        <text x="35" y="51" font-size="6.5" font-weight="bold" fill="#713f12">L</text>
        <text x="93" y="51" font-size="6.5" font-weight="bold" fill="#713f12">R</text>
        <text x="12" y="112" font-size="7.0" fill="#b45309">Ref.304防振ゴムブーツで操作音・AF振動を−20dB遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#92400e">内蔵ステレオマイク防振構造</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.304ゴムブーツ＋Ref.308保持枠</text>
        <text x="144" y="60" font-size="6.4" fill="#b45309">・ゴムのハンモックでボディ振動を遮断</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・AFモーター音や手ブレ振動の混入防止</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・EVF左右肩配置で自然なステレオ収音</text>
      `);

    case 'evf_surr_mic_wind_mesh':
      return wrap(`
        <rect x="20" y="40" width="96" height="8" rx="2" fill="#94a3b8" stroke="#475569"/>
        <rect x="20" y="50" width="96" height="8" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <ellipse cx="44" cy="30" rx="9" ry="7" fill="#0ea5e9" opacity="0.75"/>
        <path d="M84 22 Q92 36 84 50 Q76 64 84 78" fill="none" stroke="#10b981" stroke-width="2.2"/>
        <polygon points="84,82 80,74 88,74" fill="#10b981"/>
        <text x="24" y="76" font-size="6.2" fill="#0369a1">水滴ブロック</text>
        <text x="12" y="112" font-size="7.0" fill="#0369a1">0.5μm撥水ePTFE膜が雨と風を止め音波だけ通す</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#155e75">疎水防風メッシュ＆ePTFE膜</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・SUS微細網が風の乱流ボボ音を低減</text>
        <text x="144" y="60" font-size="6.4" fill="#0284c7">・0.5μm微細孔膜が水滴を完全に弾く</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・音波損失&lt;1.5dBのクリアな透過特性</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・雨天の動画撮影でもマイク浸水を防止</text>
      `);

    case 'evf_surr_hump_wp_gasket':
      return wrap(`
        <rect x="20" y="20" width="96" height="66" rx="10" fill="none" stroke="#0f172a" stroke-width="7"/>
        <rect x="28" y="28" width="80" height="50" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-dasharray="3 2"/>
        <path d="M10 46 L18 46 M10 58 L18 58" stroke="#0ea5e9" stroke-width="2"/>
        <text x="38" y="56" font-size="6.5" fill="#334155">EVF軍艦部ベース</text>
        <text x="12" y="112" font-size="7.0" fill="#1e293b">360°閉ループ防水スポンジで雨・埃・迷光を遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0f172a">軍艦部全周防水パッキン</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・独立気泡EPDMスポンジを40%圧縮密閉</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・雨雪が一番当たる頭頂合わせ目を封鎖</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・外光がアイセンサー側へ漏れるのも遮断</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・−20〜+80℃で硬化しない高耐候性</text>
      `);

    // =========================================================================
    // Group 3: Micro-OLED (OLEDoS) Internal Micro-Stack & Eyepiece Optics (E46–E55)
    // =========================================================================
    case 'evf_oled_tandem_cavity':
      return wrap(`
        <rect x="20" y="20" width="96" height="8" fill="#cbd5e1" stroke="#475569"/>
        <rect x="20" y="28" width="96" height="14" fill="#38bdf8"/>
        <rect x="20" y="42" width="96" height="6" fill="#eab308"/>
        <rect x="20" y="48" width="96" height="14" fill="#10b981"/>
        <rect x="20" y="62" width="96" height="10" fill="#94a3b8" stroke="#334155"/>
        <rect x="20" y="72" width="96" height="12" fill="#1e293b"/>
        <path d="M68 62 L68 12" stroke="#fef08a" stroke-width="2.4"/>
        <polygon points="68,8 64,16 72,16" fill="#eab308"/>
        <text x="34" y="81" font-size="6.2" fill="#fff">単結晶CMOS Si基板</text>
        <text x="12" y="112" font-size="7.0" fill="#0369a1">2層タンデム発光＋光共振キャビティで高輝度＆長寿命</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0c4a6e">2層タンデムOLED共振構造</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・有機EL発光層をCGLで2階建て直列化</text>
        <text x="144" y="60" font-size="6.4" fill="#0369a1">・同電流で輝度約2倍・焼き付き寿命倍増</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・上下鏡(Al/MgAg)の光共振で色純度UP</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・10万:1の漆黒＆0.01ms応答を実現</text>
      `);

    case 'evf_oled_bondwires_glob':
      return wrap(`
        <rect x="18" y="62" width="100" height="18" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="38" y="46" width="60" height="16" rx="2" fill="#1e293b"/>
        <path d="M40 50 Q28 28 24 62" fill="none" stroke="#eab308" stroke-width="2"/>
        <path d="M96 50 Q108 28 112 62" fill="none" stroke="#eab308" stroke-width="2"/>
        <path d="M18 62 Q28 22 44 46 L44 62 Z" fill="#0f172a" opacity="0.72"/>
        <path d="M118 62 Q108 22 92 46 L92 62 Z" fill="#0f172a" opacity="0.72"/>
        <text x="50" y="57" font-size="6.2" fill="#38bdf8">OLEDoS</text>
        <text x="12" y="112" font-size="7.0" fill="#a16207">φ20μm極細金線＋黒色エポキシ封止で耐衝撃＆遮光</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#92400e">金ワイヤ＆黒エポキシダム</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・髪の毛1/3の極細金線でSiダイと接続</text>
        <text x="144" y="60" font-size="6.4" fill="#b45309">・黒色樹脂(Glob-Top)で衝撃・湿気保護</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・金線のギラつき反射ゴーストを完全吸収</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・低ループ封止で接眼レンズ近接を両立</text>
      `);

    case 'evf_oled_fpc_decaps':
      return wrap(`
        <rect x="26" y="16" width="84" height="24" rx="3" fill="#1e293b"/>
        <rect x="44" y="40" width="48" height="44" fill="#f97316" stroke="#c2410c"/>
        <rect x="49" y="46" width="8" height="5" fill="#fde047" stroke="#854d0e"/>
        <rect x="64" y="46" width="8" height="5" fill="#fde047" stroke="#854d0e"/>
        <rect x="79" y="46" width="8" height="5" fill="#fde047" stroke="#854d0e"/>
        <rect x="44" y="74" width="48" height="10" fill="#eab308"/>
        <text x="48" y="31" font-size="6.4" fill="#38bdf8">LCD902</text>
        <text x="12" y="112" font-size="7.0" fill="#c2410c">LCD902直結FPC＋0201コンデンサ群で240fpsチラつきゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#92400e">OLED直結FPC＆0201 MLCC</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・ECX337AA-1(875607419)直結リボン</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・パネル直近0201電気タンクで電圧安定</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・明暗急変時の横筋・フリッカーを根絶</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・先端SUS補強板でZIF確実挿入を保証</text>
      `);

    case 'evf_lens_zeiss_tstar_coat':
      return wrap(`
        <path d="M52 16 Q38 52 52 88 L74 88 Q88 52 74 16 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <path d="M49 16 Q35 52 49 88" fill="none" stroke="#10b981" stroke-width="2.5"/>
        <path d="M77 16 Q91 52 77 88" fill="none" stroke="#a855f7" stroke-width="2.5"/>
        <line x1="16" y1="52" x2="118" y2="52" stroke="#2563eb" stroke-width="2.2"/>
        <polygon points="120,52 112,48 112,56" fill="#2563eb"/>
        <text x="12" y="112" font-size="7.0" fill="#047857">7〜15層誘電体AR蒸着膜で片面反射0.2%未満・透過98.5%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#065f46">多層ARコート(T*/Nano)</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・G1〜G4接眼4枚の全空気面に真空蒸着</text>
        <text x="144" y="60" font-size="6.4" fill="#047857">・λ/4薄膜干渉で反射波を打ち消し消滅</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・41°広視野の斜め光線でも色付き無し</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・夜景や逆光でも漆黒の抜け感を維持</text>
      `);

    case 'evf_lens_edge_blackening':
      return wrap(`
        <circle cx="68" cy="52" r="30" fill="#bae6fd" stroke="#0f172a" stroke-width="5.5"/>
        <circle cx="68" cy="20" r="3.5" fill="#38bdf8" stroke="#0284c7"/>
        <circle cx="40" cy="68" r="3.5" fill="#38bdf8" stroke="#0284c7"/>
        <circle cx="96" cy="68" r="3.5" fill="#38bdf8" stroke="#0284c7"/>
        <line x1="68" y1="52" x2="94" y2="34" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="2 2"/>
        <text x="48" y="55" font-size="6.5" fill="#0369a1">接眼ガラス</text>
        <text x="12" y="112" font-size="7.0" fill="#0f172a">外周「墨塗り」で縁反射99%吸収＋3点シリコン固定</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0f172a">光学墨塗り＆3点ポッティング</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・レンズ側面(コバ)を真っ黒インク塗装</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・周辺部の白モヤ・リングフレアを消去</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・3点光学シリコーン玉で応力ゼロ固定</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・低アウトガス材で密閉内の曇りゼロ</text>
      `);

    case 'evf_lens_inter_spacers':
      return wrap(`
        <rect x="22" y="20" width="14" height="66" rx="4" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="38" y="20" width="20" height="12" fill="#1e293b"/>
        <rect x="38" y="74" width="20" height="12" fill="#1e293b"/>
        <rect x="58" y="20" width="5" height="12" fill="#eab308"/>
        <rect x="58" y="74" width="5" height="12" fill="#eab308"/>
        <rect x="65" y="20" width="16" height="66" rx="4" fill="#a7f3d0" stroke="#059669"/>
        <rect x="83" y="20" width="16" height="12" fill="#1e293b"/>
        <rect x="83" y="74" width="16" height="12" fill="#1e293b"/>
        <rect x="101" y="20" width="14" height="66" rx="4" fill="#c7d2fe" stroke="#4f46e5"/>
        <text x="12" y="112" font-size="7.0" fill="#a16207">黒染めスペーサー＋5〜20μm真鍮シムで空気間隔±5μm</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#854d0e">精密スペーサー＆真鍮シム</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・G4〜G2/G3〜G1間の精密空気間隔規定</text>
        <text x="144" y="60" font-size="6.4" fill="#a16207">・5〜20μm刻みの極薄真鍮シムで追い込</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・内径遮光溝で斜め迷光カットも兼務</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・0.90倍大画面の四隅まで均一解像</text>
      `);

    case 'evf_oled_field_mask':
      return wrap(`
        <rect x="18" y="18" width="100" height="70" rx="4" fill="#0f172a"/>
        <rect x="34" y="30" width="68" height="46" rx="1" fill="#0284c7" stroke="#e2e8f0" stroke-width="1"/>
        <text x="42" y="56" font-size="6.6" fill="#fff">視野率100%</text>
        <text x="12" y="112" font-size="7.0" fill="#1e293b">0.10mm極薄ナイフエッジ黒枠で四辺をスパッと引締め</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0f172a">ナイフエッジ矩形視野枠</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・OLED直前(z=1.65mm)の0.10mm黒枠</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・30°ナイフエッジで壁面テカリゼロ</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・周辺ダミー画素の光漏れをスパッと遮断</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・映画館スクリーンのような鋭い黒額縁</text>
      `);

    case 'evf_diopter_antibacklash_nut':
      return wrap(`
        <rect x="16" y="46" width="104" height="12" fill="#ca8a04" stroke="#854d0e"/>
        <rect x="30" y="32" width="22" height="40" rx="2" fill="#475569"/>
        <rect x="84" y="32" width="22" height="40" rx="2" fill="#eab308"/>
        <path d="M54 38 L60 66 L66 38 L72 66 L78 38 L82 52" fill="none" stroke="#f97316" stroke-width="2.2"/>
        <text x="12" y="112" font-size="7.0" fill="#a16207">2分割ナット＋バネ予圧＋光学フッ素グリスでガタゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#854d0e">バックラッシュ除去ナット</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・2分割ナットをバネで左右ネジ山へ押付</text>
        <text x="144" y="60" font-size="6.4" fill="#a16207">・回し返し時の空回りガタを&lt;5μmに消去</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・蒸発ゼロPFPE光学グリスで曇り防止</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・−25〜+75℃で上質な粘性フィール維持</text>
      `);

    case 'evf_diopter_gland_seals':
      return wrap(`
        <rect x="24" y="20" width="88" height="18" fill="#64748b"/>
        <rect x="24" y="68" width="88" height="18" fill="#64748b"/>
        <rect x="16" y="44" width="104" height="18" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="44" cy="40" r="5" fill="#0f172a"/>
        <circle cx="44" cy="66" r="5" fill="#0f172a"/>
        <rect x="64" y="36" width="8" height="8" fill="#f8fafc" stroke="#0284c7"/>
        <rect x="64" y="62" width="8" height="8" fill="#f8fafc" stroke="#0284c7"/>
        <circle cx="92" cy="40" r="5" fill="#0f172a"/>
        <circle cx="92" cy="66" r="5" fill="#0f172a"/>
        <text x="12" y="112" font-size="7.0" fill="#0369a1">二重FKMフッ素ゴムOリング＋PTFE輪で回転＆押引気密</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0c4a6e">視度軸 二重Oリンググランド</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・外側ワイパー＋内側気密のFKM二重輪</text>
        <text x="144" y="60" font-size="6.4" fill="#0369a1">・中央PTFE輪が押引時のねじれ破損防止</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・乾燥光学室への湿気侵入＝内部曇り阻止</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・皮脂・日焼け止め・寒暖差に抜群耐性</text>
      `);

    case 'evf_mipi_ferrite_shield_fpc':
      return wrap(`
        <rect x="26" y="18" width="84" height="68" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <rect x="34" y="24" width="68" height="56" fill="#f97316" opacity="0.5"/>
        <rect x="36" y="34" width="12" height="10" rx="1" fill="#1e293b"/>
        <rect x="54" y="34" width="12" height="10" rx="1" fill="#1e293b"/>
        <rect x="72" y="34" width="12" height="10" rx="1" fill="#1e293b"/>
        <rect x="90" y="34" width="12" height="10" rx="1" fill="#1e293b"/>
        <rect x="20" y="62" width="96" height="10" fill="#d97706"/>
        <text x="38" y="70" font-size="6.2" fill="#fff">銅箔シャーシ接地</text>
        <text x="12" y="112" font-size="7.0" fill="#4338ca">銀シールド膜＋フェライトフィルタでセンサー横縞防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#312e81">240Hz MIPIシールドFPC</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・240fps高速信号の全面銀EMIシールド</text>
        <text x="144" y="60" font-size="6.4" fill="#4338ca">・フェライトビーズが高周波ノイズを吸収</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・銅箔接地で直下センサーへの干渉ゼロ</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・超高ISO暗所撮影の横縞ノイズを防止</text>
      `);

    default:
      return null;
  }
}
