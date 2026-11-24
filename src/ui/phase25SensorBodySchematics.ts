import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 25 Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (35 diagrams):
 *   - 20 Next-Gen Full-Frame Sensor & IBIS Parts (S71–S90 -> 90 total sensor parts)
 *   - 15 Next-Gen Camera Body & Sony OEM Parts (B102–B116 -> 116 total body parts)
 * Every text element is calibrated inside x ∈ [6, 310], y ∈ [8, 114].
 */
export function renderPhase25SensorBodySchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // PHASE 25A — 20 SENSOR & IBIS SCHEMATICS (S71–S90)
    // =========================================================================
    case 'sensor_electronic_vnd':
      return wrapSvg(`
        <line x1="12" y1="36" x2="48" y2="36" stroke="#f59e0b" stroke-width="3"/>
        <line x1="12" y1="54" x2="48" y2="54" stroke="#f59e0b" stroke-width="3"/>
        <text x="30" y="24" text-anchor="middle" font-size="6.4" fill="#b45309">強い太陽光</text>
        <rect x="48" y="18" width="38" height="58" rx="4" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/>
        <ellipse cx="60" cy="34" rx="3" ry="7" fill="#6366f1" transform="rotate(28 60 34)"/>
        <ellipse cx="74" cy="48" rx="3" ry="7" fill="#6366f1" transform="rotate(28 74 48)"/>
        <ellipse cx="62" cy="62" rx="3" ry="7" fill="#6366f1" transform="rotate(28 62 62)"/>
        <text x="67" y="88" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#4338ca">液晶e-ND(電圧)</text>
        <line x1="86" y1="45" x2="120" y2="45" stroke="#6366f1" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="104" y="36" text-anchor="middle" font-size="6.2" fill="#4338ca">1/4〜1/128</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="136" y="29" font-size="7.6" font-weight="bold" fill="#3730a3">S71 液晶・電子可変ND(e-ND)</text>
        <text x="136" y="43" font-size="7.0" fill="#312e81">・電圧で液晶分子の傾きを自在に制御</text>
        <text x="136" y="56" font-size="7.0" fill="#312e81">・1/4〜1/128までボケを変えず無段階減光</text>
        <text x="136" y="69" font-size="7.0" fill="#312e81">・Sony FX6/BURANO系の魔法サングラス</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#3730a3">真夏の日中でもF1.2の開放ボケを崩さず一瞬で適正露出に合わせる液晶自動サングラス</text>
      `);

    case 'sensor_partially_stacked_strips':
      return wrapSvg(`
        <rect x="18" y="16" width="100" height="15" rx="2" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
        <text x="68" y="26" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#065f46">上:高速ADC+DGO積層帯</text>
        <rect x="18" y="33" width="100" height="32" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
        <text x="68" y="52" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#0369a1">中央:36×24mm 画素部</text>
        <rect x="18" y="67" width="100" height="15" rx="2" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
        <text x="68" y="77" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#065f46">下:高速ADC+DGO積層帯</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="136" y="29" font-size="7.6" font-weight="bold" fill="#065f46">S72 部分積層＆DGOデュアルゲイン</text>
        <text x="136" y="43" font-size="7.0" fill="#064e3b">・上下のフチだけ2階建て3D積層構造</text>
        <text x="136" y="56" font-size="7.0" fill="#064e3b">・読出約4倍高速化＋16段DGO同時合成</text>
        <text x="136" y="69" font-size="7.0" fill="#064e3b">・中央は発熱レスで低ノイズ(α7 V世代)</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#065f46">混雑する上下の出入口だけを2階建て高速レーンにしてコスパと超高速読出を両立</text>
      `);

    case 'sensor_curved_substrate':
      return wrapSvg(`
        <line x1="16" y1="22" x2="72" y2="32" stroke="#0284c7" stroke-width="1.6"/>
        <line x1="16" y1="50" x2="82" y2="50" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="16" y1="78" x2="72" y2="68" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M68 20 Q92 50 68 80" fill="none" stroke="#0891b2" stroke-width="4.5"/>
        <path d="M74 18 Q100 50 74 82 L88 82 L88 18 Z" fill="#e2e8f0" stroke="#64748b"/>
        <text x="52" y="90" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0e7490">お椀型湾曲CMOS</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.6" font-weight="bold" fill="#155e75">S73 湾曲フルサイズCMOS基板</text>
        <text x="136" y="43" font-size="7.0" fill="#164e63">・50〜100µm極薄シリコンを球面形成</text>
        <text x="136" y="56" font-size="7.0" fill="#164e63">・画面隅の光も垂直に入り周辺感度2倍</text>
        <text x="136" y="69" font-size="7.0" fill="#164e63">・レンズの像面湾曲補正を劇的に小型化</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">人間の目の「網膜」のようにセンサー自体を丸く曲げて四隅までくっきり明るく写す</text>
      `);

    case 'sensor_im_adjust_washers':
      return wrapSvg(`
        <rect x="18" y="22" width="16" height="58" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="26" y="54" text-anchor="middle" font-size="5.8" fill="#1e293b">マウント</text>
        <line x1="34" y1="50" x2="80" y2="50" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="57" y="43" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#1d4ed8">18.000mm</text>
        <rect x="80" y="22" width="6" height="14" fill="#3b82f6"/>
        <rect x="80" y="43" width="9" height="14" fill="#f59e0b"/>
        <rect x="80" y="64" width="4" height="14" fill="#64748b"/>
        <rect x="92" y="20" width="22" height="62" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="103" y="53" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0369a1">IBIS</text>
        <text x="84" y="92" text-anchor="middle" font-size="5.8" fill="#1d4ed8">12段シム</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#1e40af">S74 純正シム IM ADJUST WASHER D</text>
        <text x="136" y="43" font-size="7.0" fill="#1e3a8a">・純正Ref.456: 0.025〜0.600mm 12種</text>
        <text x="136" y="56" font-size="7.0" fill="#1e3a8a">・3点ボス下で片ボケ傾きをミクロン校正</text>
        <text x="136" y="69" font-size="7.0" fill="#1e3a8a">・Eマウント18.000mm厳密フランジ維持</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">髪の毛の1/3の極薄ワッシャーを3箇所へ挟み、ピント面の傾きをゼロに追い込む職人技</text>
      `);

    case 'sensor_mechanical_dust_shield':
      return wrapSvg(`
        <rect x="20" y="18" width="70" height="66" rx="4" fill="#f1f5f9" stroke="#334155" stroke-width="1.6"/>
        <rect x="25" y="23" width="60" height="27" rx="2" fill="#334155"/>
        <rect x="25" y="52" width="60" height="27" rx="2" fill="#475569"/>
        <text x="55" y="40" text-anchor="middle" font-size="6.5" fill="#f8fafc">保護幕(上)</text>
        <text x="55" y="68" text-anchor="middle" font-size="6.5" fill="#f8fafc">保護幕(下)</text>
        <path d="M98 34 L112 34 M98 66 L112 66" stroke="#dc2626" stroke-width="2"/>
        <text x="106" y="52" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#dc2626">ホコリ</text>
        <text x="106" y="61" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#dc2626">遮断!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="136" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">S75 独立メカニカルセンサー保護幕</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・電源OFFで0.04秒自動クローズ防塵</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・撮影シャッターと別の高剛性専用ブレード</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・屋外レンズ交換時のゴミ付着を95%削減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">電源を切ると頑丈な専用シャッター扉が自動で閉まり、砂埃や指接触からセンサーを守る</text>
      `);

    case 'sensor_double_roll_halbach':
      return wrapSvg(`
        <rect x="16" y="22" width="28" height="24" rx="2" fill="#fed7aa" stroke="#ea580c"/>
        <rect x="46" y="22" width="28" height="24" rx="2" fill="#fecaca" stroke="#dc2626"/>
        <rect x="76" y="22" width="28" height="24" rx="2" fill="#fed7aa" stroke="#ea580c"/>
        <text x="30" y="37" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#9a3412">↑ N</text>
        <text x="60" y="37" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#991b1b">→ 90°</text>
        <text x="90" y="37" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#9a3412">↓ S</text>
        <path d="M30 48 Q60 72 90 48" fill="none" stroke="#ea580c" stroke-width="2.4"/>
        <rect x="26" y="64" width="68" height="16" rx="3" fill="#ffedd5" stroke="#c2410c"/>
        <text x="60" y="75" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#9a3412">コイル側へ磁力1.4倍集中!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9a3412">S76 2倍ロール＆ハルバッハ配列VCM</text>
        <text x="136" y="43" font-size="7.0" fill="#7c2d12">・90°回転磁石の配列で裏漏れ磁束ゼロ</text>
        <text x="136" y="56" font-size="7.0" fill="#7c2d12">・中央8.5段/周辺7.0段の広ストローク</text>
        <text x="136" y="69" font-size="7.0" fill="#7c2d12">・推力+40%で省電力・低発熱を両立</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">磁石の向きを賢く並べて磁力をコイル側へ1.4倍集中させ、2倍の回転手ブレをピタ止め</text>
      `);

    case 'sensor_pixelshift_submicron_scale':
      return wrapSvg(`
        <rect x="18" y="20" width="96" height="22" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
        <line x1="28" y1="20" x2="28" y2="42" stroke="#0284c7" stroke-width="1.4"/>
        <line x1="40" y1="20" x2="40" y2="42" stroke="#0284c7" stroke-width="1.4"/>
        <line x1="52" y1="20" x2="52" y2="42" stroke="#0284c7" stroke-width="1.4"/>
        <line x1="64" y1="20" x2="64" y2="42" stroke="#0284c7" stroke-width="1.4"/>
        <line x1="76" y1="20" x2="76" y2="42" stroke="#0284c7" stroke-width="1.4"/>
        <line x1="88" y1="20" x2="88" y2="42" stroke="#0284c7" stroke-width="1.4"/>
        <line x1="100" y1="20" x2="100" y2="42" stroke="#0284c7" stroke-width="1.4"/>
        <rect x="50" y="48" width="32" height="24" rx="3" fill="#0f172a"/>
        <text x="66" y="63" text-anchor="middle" font-size="6.4" fill="#38bdf8">0.5画素</text>
        <text x="66" y="86" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0369a1">精度 ±0.1µm 光学目盛</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0369a1">S77 ピクセルシフト光学リニアスケール</text>
        <text x="136" y="43" font-size="7.0" fill="#0c4a6e">・低熱膨張インバー格子で移動を実測</text>
        <text x="136" y="56" font-size="7.0" fill="#0c4a6e">・1.9µm(0.5画素)刻みを±0.1µmで制御</text>
        <text x="136" y="69" font-size="7.0" fill="#0c4a6e">・16枚合成で偽色ゼロの2.4億画素を実現</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">センサーを髪の毛の1/30幅だけ正確に16回ずらすための、超ミクロ専用の精密ものさし</text>
      `);

    case 'sensor_filter_edge_sumi':
      return wrapSvg(`
        <rect x="26" y="22" width="76" height="54" rx="3" fill="#e0f2fe" stroke="#0f172a" stroke-width="5"/>
        <line x1="12" y1="30" x2="28" y2="38" stroke="#dc2626" stroke-width="2"/>
        <circle cx="28" cy="38" r="4" fill="#111827"/>
        <text x="64" y="48" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#0369a1">光学フィルター</text>
        <text x="64" y="62" text-anchor="middle" font-size="6.0" fill="#1e293b">45°面取り＋黒墨塗り</text>
        <text x="64" y="90" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#dc2626">側面反射 0.05%未満へ吸収!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#1f2937"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#111827">S78 フィルター端面「墨塗り」トラップ</text>
        <text x="136" y="43" font-size="7.0" fill="#374151">・ガラス切断面に屈折率整合黒インク塗布</text>
        <text x="136" y="56" font-size="7.0" fill="#374151">・45°斜め面取りで内部全反射を断ち切る</text>
        <text x="136" y="69" font-size="7.0" fill="#374151">・夜景や星空の端に出る謎の光輪を消去</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1f2937">ガラスのフチを真っ黒な特殊インクで塗りつぶし、強い街灯や星の迷光ゴーストを吸い取る</text>
      `);

    case 'sensor_sswf_fluorine_ar':
      return wrapSvg(`
        <rect x="18" y="62" width="98" height="20" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="67" y="75" text-anchor="middle" font-size="6.4" fill="#0369a1">SSWF振動ガラス</text>
        <rect x="18" y="48" width="98" height="12" rx="1" fill="#ddd6fe" stroke="#7c3aed"/>
        <text x="67" y="57" text-anchor="middle" font-size="6.0" fill="#5b21b6">帯電防止ITO＋多層AR</text>
        <rect x="18" y="36" width="98" height="10" rx="1" fill="#cffafe" stroke="#06b6d4"/>
        <text x="67" y="44" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0e7490">撥水撥油フッ素膜</text>
        <circle cx="48" cy="25" r="6" fill="#38bdf8" stroke="#0284c7"/>
        <path d="M78 28 L94 18" stroke="#dc2626" stroke-width="1.6"/>
        <text x="86" y="30" font-size="5.8" fill="#dc2626">ゴミ反発</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#155e75">S79 SSWFフッ素＋帯電防止ナノ膜</text>
        <text x="136" y="43" font-size="7.0" fill="#164e63">・静電気を逃がしホコリ吸着をブロック</text>
        <text x="136" y="56" font-size="7.0" fill="#164e63">・水接触角110°超で油汚れもスルッと脱落</text>
        <text x="136" y="69" font-size="7.0" fill="#164e63">・可視光反射率0.2%以下の超高透過AR</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">静電気を逃がす透明膜とツルツルのフッ素膜を重ね、ホコリや油滴を寄せ付けない最表面</text>
      `);

    case 'sensor_wirebond_dam_baffle':
      return wrapSvg(`
        <rect x="16" y="64" width="102" height="16" rx="2" fill="#e2e8f0" stroke="#475569"/>
        <rect x="46" y="48" width="42" height="16" rx="1" fill="#0ea5e9"/>
        <text x="67" y="59" text-anchor="middle" font-size="6.0" fill="#ffffff">CMOSダイ</text>
        <path d="M46 54 Q32 30 22 64" fill="none" stroke="#eab308" stroke-width="2"/>
        <path d="M88 54 Q102 30 112 64" fill="none" stroke="#eab308" stroke-width="2"/>
        <path d="M16 64 L22 36 L44 36 L46 64 Z" fill="#1e293b" opacity="0.72"/>
        <path d="M88 64 L90 36 L112 36 L118 64 Z" fill="#1e293b" opacity="0.72"/>
        <text x="67" y="28" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1e293b">黒色ダム＆フィル保護封止</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">S80 金ワイヤー黒色ダム＆フィル</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・ピカピカ光る金線を黒色樹脂で完全包囲</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・ワイヤー乱反射フレアを-20dB以上遮断</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・振動・落下時の極細金線断線をゼロ化</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">チップ周囲の極細金ワイヤーを真っ黒な樹脂の堤防で固め、断線防止と迷光消去を両立</text>
      `);

    case 'sensor_tcxo_clock_tree':
      return wrapSvg(`
        <rect x="16" y="24" width="40" height="36" rx="4" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.6"/>
        <text x="36" y="40" text-anchor="middle" font-size="7.0" font-weight="bold" fill="#854d0e">TCXO</text>
        <text x="36" y="52" text-anchor="middle" font-size="5.8" fill="#854d0e">±0.5ppm</text>
        <path d="M56 42 H74" stroke="#ca8a04" stroke-width="2"/>
        <rect x="74" y="24" width="44" height="36" rx="4" fill="#eff6ff" stroke="#2563eb"/>
        <text x="96" y="40" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#1e40af">低ジッター</text>
        <text x="96" y="52" text-anchor="middle" font-size="6.0" fill="#1e40af">PLL分配</text>
        <path d="M22 76 L32 68 L42 82 L52 68 L62 82 L72 68 L82 82 L92 68 L102 82 L112 74" fill="none" stroke="#eab308" stroke-width="1.6"/>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#854d0e">S81 センサー直載TCXO基準時計</text>
        <text x="136" y="43" font-size="7.0" fill="#713f12">・温度が変わっても±0.5ppmの高安定</text>
        <text x="136" y="56" font-size="7.0" fill="#713f12">・揺らぎ0.5ps未満で14bit ADC精度死守</text>
        <text x="136" y="69" font-size="7.0" fill="#713f12">・映画マルチカメラのゲンロック同期基準</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">温度に動じない超精密な心臓の鼓動をセンサー真横に置き、ノイズと映像ズレを封じる</text>
      `);

    case 'sensor_cross_roller_guide':
      return wrapSvg(`
        <rect x="18" y="22" width="96" height="14" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="18" y="62" width="96" height="14" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="34" cy="49" r="7" fill="#334155"/>
        <rect x="52" y="42" width="14" height="14" rx="2" fill="#475569"/>
        <circle cx="80" cy="49" r="7" fill="#334155"/>
        <rect x="96" y="42" width="14" height="14" rx="2" fill="#475569"/>
        <text x="66" y="90" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#334155">90°交互ローラー＋板バネ案内</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#1e293b">S82 クロスローラー＆板バネ案内</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・前後傾き剛性は横剛性の1,000倍以上</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・すべり摩擦ゼロで微小手ブレに即追従</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・下向き撮影でもF1.2ピント面を傾けない</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">横には無摩擦でスルスル動くのにピント方向には1ミクロンも傾かない精密工作機械式足回り</text>
      `);

    case 'sensor_peltier_tec_cooler':
      return wrapSvg(`
        <rect x="20" y="20" width="94" height="12" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <text x="67" y="29" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0369a1">冷却面 (-25℃ センサー側)</text>
        <rect x="28" y="34" width="14" height="28" fill="#0ea5e9"/>
        <rect x="48" y="34" width="14" height="28" fill="#f97316"/>
        <rect x="68" y="34" width="14" height="28" fill="#0ea5e9"/>
        <rect x="88" y="34" width="14" height="28" fill="#f97316"/>
        <text x="35" y="51" text-anchor="middle" font-size="6.5" fill="#fff">P</text>
        <text x="55" y="51" text-anchor="middle" font-size="6.5" fill="#fff">N</text>
        <text x="75" y="51" text-anchor="middle" font-size="6.5" fill="#fff">P</text>
        <text x="95" y="51" text-anchor="middle" font-size="6.5" fill="#fff">N</text>
        <rect x="20" y="64" width="94" height="12" rx="2" fill="#fed7aa" stroke="#ea580c"/>
        <text x="67" y="73" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#9a3412">排熱面 (ヒートシンクへ)</text>
        <text x="67" y="90" text-anchor="middle" font-size="6.0" fill="#0369a1">6℃冷却ごとに暗電流ノイズ半減!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0369a1">S83 ペルチェ(TEC)能動冷却＋防曇</text>
        <text x="136" y="43" font-size="7.0" fill="#0c4a6e">・P/N半導体柱が電気で熱を強制汲み上げ</text>
        <text x="136" y="56" font-size="7.0" fill="#0c4a6e">・外気温より-20〜-35℃下げて暗電流消滅</text>
        <text x="136" y="69" font-size="7.0" fill="#0c4a6e">・ガラス周縁ヒーターで結露クモリを防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">電気を流すだけでセンサーを冷やす超小型半導体冷蔵庫で、星空や8Kの熱ノイズを根絶</text>
      `);

    case 'sensor_die_fiducial_targets':
      return wrapSvg(`
        <rect x="22" y="18" width="88" height="62" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="34" y="28" width="64" height="42" rx="1" fill="#0c4a6e"/>
        <text x="66" y="52" text-anchor="middle" font-size="6.5" fill="#38bdf8">36×24mm 画素</text>
        <path d="M25 24 H33 M29 20 V28 M99 24 H107 M103 20 V28 M25 74 H33 M29 70 V78 M99 74 H107 M103 70 V78" stroke="#eab308" stroke-width="1.8"/>
        <text x="66" y="92" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#a16207">四隅の黄金十字トンボ(±1µm)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#854d0e">S84 四隅フィデューシャル基準マーク</text>
        <text x="136" y="43" font-size="7.0" fill="#713f12">・画素と同一露光マスクで四隅に焼付け</text>
        <text x="136" y="56" font-size="7.0" fill="#713f12">・6軸レーザーロボットが位置と回転を調芯</text>
        <text x="136" y="69" font-size="7.0" fill="#713f12">・ロール誤差±0.01°以下の完璧な水平</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">印刷のトンボのようにチップ四隅に刻んだ十字照準を頼りに、髪の毛の1/50精度で組立</text>
      `);

    case 'sensor_carrier_piezo_accel':
      return wrapSvg(`
        <path d="M16 42 Q26 22 36 42 T56 42" fill="none" stroke="#e11d48" stroke-width="2"/>
        <text x="36" y="22" text-anchor="middle" font-size="6.2" fill="#be123c">シャッター衝撃波</text>
        <path d="M16 66 Q26 86 36 66 T56 66" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="36" y="88" text-anchor="middle" font-size="6.2" fill="#0369a1">逆位相打消し推力</text>
        <rect x="66" y="34" width="52" height="36" rx="4" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5"/>
        <text x="92" y="50" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#9f1239">直載MEMS</text>
        <text x="92" y="62" text-anchor="middle" font-size="5.8" fill="#9f1239">2kHz検知</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9f1239">S85 IBIS直載・圧電/MEMS加速度計</text>
        <text x="136" y="43" font-size="7.0" fill="#881337">・可動ステージ上でシャッター微振動を直検</text>
        <text x="136" y="56" font-size="7.0" fill="#881337">・ノイキャンと同じ逆位相波で微ブレ打消し</text>
        <text x="136" y="69" font-size="7.0" fill="#881337">・マクロ撮影の平行シフトブレも高精度検出</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">センサー台座に直接乗せた小型振動計が、シャッター衝撃を逆向きの力で一瞬キャンセル</text>
      `);

    case 'sensor_dual_edge_slvs16':
      return wrapSvg(`
        <rect x="44" y="24" width="44" height="50" rx="3" fill="#0f766e"/>
        <text x="66" y="52" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#f0fdfa">CMOS</text>
        <path d="M44 32 H16 M44 44 H16 M44 56 H16 M44 68 H16" stroke="#14b8a6" stroke-width="2"/>
        <path d="M88 32 H116 M88 44 H116 M88 56 H116 M88 68 H116" stroke="#14b8a6" stroke-width="2"/>
        <rect x="22" y="27" width="10" height="46" rx="2" fill="#334155"/>
        <rect x="100" y="27" width="10" height="46" rx="2" fill="#334155"/>
        <text x="66" y="90" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#0f766e">左右8+8=16レーン (200Gbps)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#115e59">S86 両端16レーンSLVS-EC＆チョーク</text>
        <text x="136" y="43" font-size="7.0" fill="#134e4a">・左右対称16車線で最大200Gbps超高速出力</text>
        <text x="136" y="56" font-size="7.0" fill="#134e4a">・フェライトチョークが同相ノイズだけ遮断</text>
        <text x="136" y="69" font-size="7.0" fill="#134e4a">・Wi-Fi/GNSSへの電波干渉を徹底抑制</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#115e59">左右計16車線の超高速道路で8K RAWを運びつつ、小さな関所で電波ノイズだけを通行止め</text>
      `);

    case 'sensor_thermal_via_dieattach':
      return wrapSvg(`
        <rect x="20" y="18" width="94" height="14" rx="2" fill="#0ea5e9"/>
        <text x="67" y="28" text-anchor="middle" font-size="6.2" fill="#ffffff">CMOSシリコンダイ (発熱)</text>
        <rect x="20" y="33" width="94" height="8" fill="#cbd5e1" stroke="#64748b"/>
        <text x="67" y="39.5" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#1e293b">低応力ナノ銀焼結層(k&gt;150)</text>
        <rect x="20" y="42" width="94" height="28" fill="#fef3c7" stroke="#d97706"/>
        <rect x="30" y="42" width="6" height="28" fill="#ea580c"/>
        <rect x="50" y="42" width="6" height="28" fill="#ea580c"/>
        <rect x="70" y="42" width="6" height="28" fill="#ea580c"/>
        <rect x="90" y="42" width="6" height="28" fill="#ea580c"/>
        <rect x="20" y="71" width="94" height="12" rx="2" fill="#fb923c" stroke="#c2410c"/>
        <text x="67" y="80" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#7c2d12">背面銅ヒートシンクへ直通排熱</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#92400e">S87 銅サーマルビア＆ナノ銀接合</text>
        <text x="136" y="43" font-size="7.0" fill="#78350f">・数百本の純銅柱がセラミックを垂直貫通</text>
        <text x="136" y="56" font-size="7.0" fill="#78350f">・多孔質ナノ銀が熱膨張差を吸収し無反り</text>
        <text x="136" y="69" font-size="7.0" fill="#78350f">・8K連続収録でセンサー温度を約10℃低減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">チップ真下に何百本もの銅の煙突を貫通させ、8Kの熱を逃がしながら反り歪みもゼロ化</text>
      `);

    case 'sensor_freefall_ibis_brake':
      return wrapSvg(`
        <rect x="44" y="26" width="44" height="44" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <text x="66" y="46" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#0369a1">IBIS</text>
        <text x="66" y="58" text-anchor="middle" font-size="6.0" fill="#0369a1">可動枠</text>
        <rect x="16" y="34" width="20" height="28" rx="3" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
        <rect x="96" y="34" width="20" height="28" rx="3" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
        <path d="M36 48 H44 M96 48 H88" stroke="#e11d48" stroke-width="2.6"/>
        <text x="66" y="88" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#be123c">落下検知15msで緊急クランプ!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9f1239">S88 落下緊急電磁ブレーキ機構</text>
        <text x="136" y="43" font-size="7.0" fill="#881337">・高さ1m落下(450ms)の着地前に制動完了</text>
        <text x="136" y="56" font-size="7.0" fill="#881337">・VCM回生ブレーキ＋ゴム歯で中央ロック</text>
        <text x="136" y="69" font-size="7.0" fill="#881337">・電源OFF時は無通電の磁気ディテント保持</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">うっかりカメラを落とした0.05秒後に浮いているセンサーを緊急ブレーキでガッチリ救出</text>
      `);

    case 'sensor_low_alpha_mold':
      return wrapSvg(`
        <rect x="18" y="20" width="96" height="18" rx="3" fill="#f3e8ff" stroke="#9333ea" stroke-width="1.5"/>
        <text x="66" y="32" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#6b21a8">低α線ULA合成石英ガラス</text>
        <circle cx="40" cy="48" r="5" fill="#ef4444" opacity="0.35"/>
        <line x1="34" y1="42" x2="46" y2="54" stroke="#dc2626" stroke-width="1.8"/>
        <text x="74" y="52" text-anchor="middle" font-size="6.2" fill="#7e22ce">U/Th α線を99.9%除去</text>
        <rect x="24" y="62" width="84" height="20" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="66" y="75" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0369a1">CMOS＆積層DRAM(エラー0)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#6b21a8">S89 低α線ULAガラス＆遮蔽壁</text>
        <text x="136" y="43" font-size="7.0" fill="#581c87">・天然ウラン/トリウム不純物を極限精製</text>
        <text x="136" y="56" font-size="7.0" fill="#581c87">・α線放出率 0.002 cph/cm² 未満を達成</text>
        <text x="136" y="69" font-size="7.0" fill="#581c87">・星空の偽白点やDRAMソフトエラーを防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#6b21a8">ガラスや陶器に微量に含まれる天然放射線を徹底除去し、写真に謎の白い点が出るのを防ぐ</text>
      `);

    case 'sensor_chamber_labyrinth_felt':
      return wrapSvg(`
        <path d="M18 22 H52 V38 H36 V54 H58 V74 H18 Z" fill="#1e293b"/>
        <path d="M112 22 H78 V38 H94 V54 H72 V74 H112 Z" fill="#1e293b"/>
        <path d="M65 18 V78" stroke="#0284c7" stroke-width="2.2"/>
        <path d="M44 18 L52 30 L42 42" fill="none" stroke="#f97316" stroke-width="1.5" stroke-dasharray="2 2"/>
        <circle cx="26" cy="74" r="5" fill="#f97316"/>
        <circle cx="104" cy="74" r="5" fill="#f97316"/>
        <text x="66" y="90" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#9a3412">植毛ラビリンス＋防振シリコーン環</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9a3412">S90 撮像室・植毛ラビリンス枠</text>
        <text x="136" y="43" font-size="7.0" fill="#7c2d12">・段差迷路＋黒ベルベット植毛で反射&lt;0.4%</text>
        <text x="136" y="56" font-size="7.0" fill="#7c2d12">・シャッター隙間からの迷光・摩耗粉を遮断</text>
        <text x="136" y="69" font-size="7.0" fill="#7c2d12">・4隅シリコーン環がシャッター衝撃を減衰</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">映画館の暗い迷路入口のように真っ黒な植毛溝とゴム環で迷光・ゴミ・振動を最終封鎖</text>
      `);

    // =========================================================================
    // PHASE 25B — 15 CAMERA BODY SCHEMATICS (B102–B116)
    // =========================================================================
    case 'body_dial_detent_ball_spring':
      return wrapSvg(`
        <path d="M18 32 Q32 42 46 32 Q60 42 74 32 Q88 42 102 32 L102 22 H18 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.4"/>
        <circle cx="60" cy="43" r="6.5" fill="#f8fafc" stroke="#1e293b" stroke-width="1.8"/>
        <rect x="52" y="50" width="16" height="28" rx="2" fill="#fde68a" stroke="#b45309"/>
        <path d="M56 54 L64 58 L56 62 L64 66 L56 70 L64 74" fill="none" stroke="#b45309" stroke-width="1.6"/>
        <text x="60" y="90" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#92400e">鋼球(Ref.321)＋バネ(Ref.319)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#92400e">B102 純正ダイヤルクリック鋼球</text>
        <text x="136" y="43" font-size="7.0" fill="#78350f">・真鍮筒＋鋼球＋バネの3点純正精密部品</text>
        <text x="136" y="56" font-size="7.0" fill="#78350f">・波型カム溝へ押付け「カチッ」と節度感</text>
        <text x="136" y="69" font-size="7.0" fill="#78350f">・10万回回してもヘタらない金属球耐久</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">直径1.5mmの鋼球を小さなバネが溝へ押し付け、高級時計のような極上クリック感を生む</text>
      `);

    case 'body_oem_keycap_dome_set':
      return wrapSvg(`
        <rect x="18" y="20" width="96" height="62" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <circle cx="38" cy="36" r="8" fill="#1e293b"/>
        <text x="38" y="38.5" text-anchor="middle" font-size="5.5" fill="#fff">AF-ON</text>
        <circle cx="66" cy="36" r="6.5" fill="#334155"/>
        <text x="66" y="38" text-anchor="middle" font-size="5.3" fill="#fff">AEL</text>
        <circle cx="94" cy="36" r="6.5" fill="#334155"/>
        <text x="94" y="38" text-anchor="middle" font-size="5.3" fill="#fff">MENU</text>
        <circle cx="38" cy="62" r="6.5" fill="#334155"/>
        <text x="38" y="64" text-anchor="middle" font-size="5.3" fill="#fff">Fn</text>
        <circle cx="66" cy="62" r="6.5" fill="#334155"/>
        <text x="66" y="64" text-anchor="middle" font-size="5.3" fill="#fff">再生</text>
        <circle cx="94" cy="62" r="6.5" fill="#334155"/>
        <text x="94" y="64" text-anchor="middle" font-size="5.3" fill="#fff">C1/C4</text>
        <text x="66" y="92" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">裏側は全周防水シリコーン膜!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">B103 純正背面8大キー＆防水ドーム</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・高さと径を0.2mm変え暗闇ブラインド操作</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・一体シリコーン雨合羽が浸水を完全遮断</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・Ref.65–69/106–112 30万回耐久ドーム</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">親指の感触だけで押し分けられる背面主役ボタン群と、雨粒を入れない防水シリコーン膜</text>
      `);

    case 'body_forged_strap_eyelets':
      return wrapSvg(`
        <rect x="52" y="18" width="16" height="66" rx="2" fill="#475569"/>
        <text x="60" y="53" text-anchor="middle" font-size="5.8" fill="#f8fafc">Mg</text>
        <rect x="28" y="44" width="44" height="14" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
        <circle cx="24" cy="51" r="8" fill="none" stroke="#334155" stroke-width="3"/>
        <rect x="68" y="30" width="14" height="42" rx="2" fill="#94a3b8" stroke="#1e293b"/>
        <circle cx="48" cy="44" r="3" fill="#0f172a"/>
        <circle cx="48" cy="58" r="3" fill="#0f172a"/>
        <text x="86" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">20kgf耐性・内部直結</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">B104 純正鍛造EYELET G/L金具</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・Ref.316/317 鍛造ステンレス命綱アンカー</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・外装でなく内部Mg骨格へボルト直接締結</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・軸部EPDM Oリングで雨水伝い侵入を封止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">3kg超の超望遠レンズを下げて走っても抜けない、骨格直結のクライミング級安全アンカー</text>
      `);

    case 'body_bth_assy_fp2438':
      return wrapSvg(`
        <rect x="18" y="18" width="46" height="64" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="1.6"/>
        <text x="41" y="48" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#92400e">BTH ASSY</text>
        <text x="41" y="60" text-anchor="middle" font-size="5.6" fill="#92400e">電池骨格</text>
        <path d="M64 46 H92" stroke="#d97706" stroke-width="5"/>
        <rect x="92" y="28" width="24" height="38" rx="3" fill="#d1fae5" stroke="#059669"/>
        <text x="104" y="49" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#065f46">主基板</text>
        <text x="78" y="38" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">FP-2438</text>
        <text x="66" y="92" text-anchor="middle" font-size="6.0" fill="#92400e">逆差し防止＋瞬断ゼロ大電流給電</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#92400e">B105 純正BTH骨格＆FP-2438フレキ</text>
        <text x="136" y="43" font-size="7.0" fill="#78350f">・Ref.406モールド枠が電池ガタ・逆差し防止</text>
        <text x="136" y="56" font-size="7.0" fill="#78350f">・Ref.359専用フレキが3.5Aと残量通信を伝達</text>
        <text x="136" y="69" font-size="7.0" fill="#78350f">・UL94 V-0難燃隔壁で万一の熱拡散を遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">電池をしっかり支える案内ボックスと、大電流・残量情報を運ぶオレンジ色の専用血管</text>
      `);

    case 'body_optical_smart_controller':
      return wrapSvg(`
        <circle cx="58" cy="48" r="26" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.8"/>
        <circle cx="58" cy="48" r="11" fill="#1e1b4b"/>
        <path d="M58 26 V34 M58 62 V70 M36 48 H44 M72 48 H80" stroke="#7c3aed" stroke-width="2"/>
        <text x="58" y="50" text-anchor="middle" font-size="5.6" fill="#c4b5fd">IR光学</text>
        <text x="58" y="88" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#5b21b6">指なぞりでAF枠が爆速ワープ!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#5b21b6">B106 光学タッチAFスマートコントローラ</text>
        <text x="136" y="43" font-size="7.0" fill="#4c1d95">・AF-ONボタン中央に光学マウス素子内蔵</text>
        <text x="136" y="56" font-size="7.0" fill="#4c1d95">・押す＆なぞるを親指1本・持ち替えゼロ</text>
        <text x="136" y="69" font-size="7.0" fill="#4c1d95">・光学式のため雨濡れや薄手手袋でも動作</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#5b21b6">ボタン表面を指でスッとなぞるだけでピント枠が瞬間移動するプロスポーツ機の名デバイス</text>
      `);

    case 'body_gnss_ceramic_antenna':
      return wrapSvg(`
        <path d="M36 18 Q62 12 88 18 M42 26 Q62 21 82 26" fill="none" stroke="#10b981" stroke-width="1.8"/>
        <text x="62" y="13" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#047857">GPS / みちびき衛星電波</text>
        <rect x="34" y="34" width="56" height="28" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <rect x="42" y="38" width="40" height="16" rx="1" fill="#e2e8f0" stroke="#64748b"/>
        <circle cx="62" cy="46" r="2.5" fill="#ca8a04"/>
        <rect x="26" y="64" width="72" height="16" rx="2" fill="#d1fae5" stroke="#059669"/>
        <text x="62" y="75" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#065f46">LNA低雑音増幅＋SAW</text>
        <text x="62" y="91" text-anchor="middle" font-size="5.8" fill="#047857">14mm角セラミックパッチ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#065f46">B107 内蔵マルチGNSSパッチアンテナ</text>
        <text x="136" y="43" font-size="7.0" fill="#064e3b">・GPS/Galileo/みちびき4系統を直接受信</text>
        <text x="136" y="56" font-size="7.0" fill="#064e3b">・高誘電セラミックで波長を縮め14mm化</text>
        <text x="136" y="69" font-size="7.0" fill="#064e3b">・撮影位置とUTC原子時計時刻を自動刻印</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#065f46">スマホ不要で宇宙の衛星電波をキャッチし、旅先の場所と正確な時刻を全写真へ自動記録</text>
      `);

    case 'body_timecode_sync_port':
      return wrapSvg(`
        <circle cx="38" cy="48" r="18" fill="#e2e8f0" stroke="#dc2626" stroke-width="2.4"/>
        <circle cx="38" cy="48" r="5" fill="#eab308"/>
        <text x="38" y="77" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#991b1b">TC IN/OUT</text>
        <path d="M58 48 H76" stroke="#dc2626" stroke-width="2"/>
        <rect x="76" y="28" width="42" height="40" rx="4" fill="#fef2f2" stroke="#dc2626"/>
        <text x="97" y="45" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#991b1b">01:23:45</text>
        <text x="97" y="58" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#dc2626">:12コマ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#991b1b">B108 映画同期タイムコード(TC)端子</text>
        <text x="136" y="43" font-size="7.0" fill="#7f1d1d">・複数カメラと音声を1コマ誤差なく同期</text>
        <text x="136" y="56" font-size="7.0" fill="#7f1d1d">・内蔵TCXOで24時間後もズレ1コマ未満</text>
        <text x="136" y="69" font-size="7.0" fill="#7f1d1d">・SMPTE LTC準拠ロック付堅牢シェル</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#991b1b">映画やライブ収録で何台ものカメラと録音機のタイミングを一発で合わせる共通デジタル時計</text>
      `);

    case 'body_haptic_piezo_buttons':
      return wrapSvg(`
        <rect x="18" y="24" width="96" height="16" rx="3" fill="#475569"/>
        <text x="66" y="35" text-anchor="middle" font-size="6.2" fill="#f8fafc">継ぎ目ゼロ一体アルミ表面</text>
        <rect x="18" y="42" width="96" height="10" fill="#fef3c7" stroke="#d97706"/>
        <text x="66" y="49.5" text-anchor="middle" font-size="5.6" fill="#92400e">感圧ひずみゲージ膜</text>
        <rect x="18" y="54" width="96" height="18" rx="2" fill="#cffafe" stroke="#0891b2" stroke-width="1.5"/>
        <text x="66" y="66" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#155e75">ピエゾ触覚振動子(&lt;2ms)</text>
        <path d="M36 82 Q66 74 96 82" fill="none" stroke="#06b6d4" stroke-width="2"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0e7490">カチッと本物そっくりに振動!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#155e75">B109 感圧ピエゾ・ハプティックUI</text>
        <text x="136" y="43" font-size="7.0" fill="#164e63">・物理スイッチ隙間ゼロで究極の防水防塵</text>
        <text x="136" y="56" font-size="7.0" fill="#164e63">・指圧を検知し2ms未満で鋭い振動を返す</text>
        <text x="136" y="69" font-size="7.0" fill="#164e63">・Sigma BF(2025–2026)発の次世代操作</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">動くすき間が一切ないのに押すと「カチッ！」と震えて答える、水もホコリも入れない未来ボタン</text>
      `);

    case 'body_focus_mode_lever':
      return wrapSvg(`
        <circle cx="58" cy="52" r="24" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
        <line x1="58" y1="52" x2="72" y2="30" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <circle cx="58" cy="52" r="7" fill="#cbd5e1" stroke="#334155"/>
        <text x="26" y="34" font-size="6.0" font-weight="bold" fill="#1d4ed8">AF-S</text>
        <text x="78" y="28" font-size="6.0" font-weight="bold" fill="#dc2626">AF-C</text>
        <text x="86" y="54" font-size="6.0" font-weight="bold" fill="#1d4ed8">DMF</text>
        <text x="76" y="78" font-size="6.0" font-weight="bold" fill="#1d4ed8">MF</text>
        <text x="58" y="92" text-anchor="middle" font-size="5.8" fill="#1e40af">左手0.5秒切替＋二重防水Oリング</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#1e40af">B110 前面フォーカスモード切替レバー</text>
        <text x="136" y="43" font-size="7.0" fill="#1e3a8a">・メニューを開かずAF-S/AF-C/DMF/MF即切替</text>
        <text x="136" y="56" font-size="7.0" fill="#1e3a8a">・電源OFFでも角度を見るだけで設定判別</text>
        <text x="136" y="69" font-size="7.0" fill="#1e3a8a">・二重EPDM軸シール＋密閉金メッキ接点</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">レンズを支える左手の指先ひとつでAFと手動ピントを一瞬切替できるプロの伝統レバー</text>
      `);

    case 'body_drive_mode_lock_subdial':
      return wrapSvg(`
        <rect x="26" y="54" width="76" height="18" rx="4" fill="#334155"/>
        <text x="64" y="66" text-anchor="middle" font-size="6.0" fill="#f8fafc">下段: AFモードリング</text>
        <rect x="34" y="32" width="60" height="20" rx="4" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>
        <text x="64" y="45" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#9a3412">上段: 連写/単写</text>
        <rect x="52" y="18" width="24" height="14" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <text x="64" y="28" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0f172a">ロック</text>
        <text x="64" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#c2410c">押しながら回す同軸2段ダイヤル</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9a3412">B111 左肩ドライブ切替＆ロックダイヤル</text>
        <text x="136" y="43" font-size="7.0" fill="#7c2d12">・単写⇔秒間30コマ連写を左手で一発切替</text>
        <text x="136" y="56" font-size="7.0" fill="#7c2d12">・中央プッシュロックでバッグ内誤回転ゼロ</text>
        <text x="136" y="69" font-size="7.0" fill="#7c2d12">・Sony α1 II / α9 IIIプロ即応同軸2段式</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">右手はシャッターに置いたまま、左手で連写速度をロック解除して一発切替するプロ装備</text>
      `);

    case 'body_drop_freefall_imu':
      return wrapSvg(`
        <rect x="18" y="20" width="38" height="34" rx="4" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5"/>
        <text x="37" y="35" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#9f1239">落下!</text>
        <text x="37" y="47" text-anchor="middle" font-size="6.0" fill="#be123c">0.0 G</text>
        <path d="M56 37 H74" stroke="#e11d48" stroke-width="2"/>
        <rect x="74" y="20" width="44" height="34" rx="4" fill="#fef2f2" stroke="#dc2626"/>
        <text x="96" y="35" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#991b1b">30ms判定</text>
        <text x="96" y="47" text-anchor="middle" font-size="5.8" fill="#991b1b">INT1割込</text>
        <path d="M96 54 V66 H38 V72" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <rect x="18" y="70" width="100" height="16" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="68" y="81" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">IBISブレーキ(S88)＋鏡筒ロック</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9f1239">B112 落下検知3軸高G加速度センサー</text>
        <text x="136" y="43" font-size="7.0" fill="#881337">・宙に浮いた無重力(0G)を0.03秒で検知</text>
        <text x="136" y="56" font-size="7.0" fill="#881337">・床に着く0.4秒前にIBIS緊急ロック指令</text>
        <text x="136" y="69" font-size="7.0" fill="#881337">・非常コンデンサで電池瞬断時も動作完遂</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">カメラが落ちた瞬間の無重力を見抜き、着地する前に内部の精密部品を自動で防御態勢へ</text>
      `);

    case 'body_vgrip_locking_pin_bay':
      return wrapSvg(`
        <rect x="18" y="26" width="96" height="22" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
        <text x="66" y="39" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#1e293b">底面強化プレート(ボディ側)</text>
        <rect x="34" y="48" width="10" height="18" rx="2" fill="#f59e0b"/>
        <rect x="78" y="48" width="14" height="18" rx="2" fill="#64748b"/>
        <rect x="18" y="66" width="96" height="16" rx="3" fill="#e2e8f0" stroke="#334155"/>
        <text x="66" y="77" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#0f172a">縦位置グリップ(VG-C5/C6)</text>
        <text x="39" y="92" text-anchor="middle" font-size="5.8" fill="#b45309">回り止めピン</text>
        <text x="85" y="92" text-anchor="middle" font-size="5.8" fill="#334155">1/4三脚ネジ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#1e293b">B113 縦グリ連結ガイド穴＆強化座</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・三脚ネジ＋精密ピン穴の2点で完全拘束</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・重い望遠レンズ装着時の回転緩みをゼロ化</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・±0.03mm公差ステンレスブッシュ＆補強板</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">三脚穴の隣にある秘密のピン穴でガッチリ噛み合わせ、縦位置グリップを1つの塊へ剛結</text>
      `);

    case 'body_cnt_dial_switch_blocks':
      return wrapSvg(`
        <rect x="18" y="18" width="44" height="28" rx="3" fill="#ccfbf1" stroke="#0d9488"/>
        <text x="40" y="34" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#115e59">CNT DIAL F</text>
        <rect x="18" y="54" width="44" height="28" rx="3" fill="#d1fae5" stroke="#059669"/>
        <text x="40" y="66" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#065f46">RL88100/</text>
        <text x="40" y="76" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#065f46">BK88100</text>
        <path d="M62 32 H80 V48 H90 M62 68 H80 V52 H90" fill="none" stroke="#d97706" stroke-width="2"/>
        <rect x="90" y="32" width="26" height="36" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="103" y="52" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">ZIF</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#115e59">B114 純正制御スイッチブロック群</text>
        <text x="136" y="43" font-size="7.0" fill="#134e4a">・Ref.255/258/64を独立ユニット化</text>
        <text x="136" y="56" font-size="7.0" fill="#134e4a">・消耗しやすい操作部だけ素早く部分交換</text>
        <text x="136" y="69" font-size="7.0" fill="#134e4a">・ESD±15kV保護＆防振ZIFコネクタ接続</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#115e59">よく使うダイヤルやボタン基板を独立ブロックに分け、故障時も安く早く新品へ蘇る設計</text>
      `);

    case 'body_peo_anti_corrosion_coat':
      return wrapSvg(`
        <rect x="18" y="66" width="96" height="16" rx="2" fill="#94a3b8" stroke="#475569"/>
        <text x="66" y="77" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#0f172a">① AZ91D Mg合金母材</text>
        <rect x="18" y="50" width="96" height="14" fill="#f8fafc" stroke="#64748b"/>
        <text x="66" y="60" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">② PEOセラミック皮膜(15µm)</text>
        <rect x="18" y="34" width="96" height="14" fill="#334155"/>
        <text x="66" y="44" text-anchor="middle" font-size="6.0" fill="#f8fafc">③ 艶消しシボウレタン塗装</text>
        <rect x="18" y="22" width="96" height="10" rx="2" fill="#cffafe" stroke="#06b6d4"/>
        <text x="66" y="29.5" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0e7490">④ 撥油フッ素トップコート</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#155e75">B115 PEOセラミック耐食＋フッ素層</text>
        <text x="136" y="43" font-size="7.0" fill="#164e63">・プラズマ放電でMg表面を硬質セラミック化</text>
        <text x="136" y="56" font-size="7.0" fill="#164e63">・海辺の塩風・汗による腐食と塗膜剥離ゼロ</text>
        <text x="136" y="69" font-size="7.0" fill="#164e63">・撥油フッ素が皮脂汚れやベタつきを弾く</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">錆びやすいマグネシウムの表面をセラミックの鎧とフッ素の4重バリアで10年美しく守る</text>
      `);

    case 'body_starlight_red_tally_filter':
      return wrapSvg(`
        <rect x="44" y="46" width="38" height="26" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.6"/>
        <text x="63" y="62" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#991b1b">TIR導光</text>
        <path d="M63 46 V22 M44 59 H18 M82 59 H108" stroke="#dc2626" stroke-width="2.4"/>
        <circle cx="63" cy="22" r="4" fill="#dc2626"/>
        <circle cx="18" cy="59" r="4" fill="#dc2626"/>
        <circle cx="108" cy="59" r="4" fill="#dc2626"/>
        <text x="63" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#991b1b">360°REC点灯 ＆ 星空660nm深赤</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#991b1b">B116 星空赤色窓＆360°タリープリズム</text>
        <text x="136" y="43" font-size="7.0" fill="#7f1d1d">・660nm深赤色は暗闇に慣れた目を眩ませない</text>
        <text x="136" y="56" font-size="7.0" fill="#7f1d1d">・動画REC時は前/上/背の3方向から一目で視認</text>
        <text x="136" y="69" font-size="7.0" fill="#7f1d1d">・PMMA全反射導光＋遮光防水ハウジング</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#991b1b">星空の下では目に優しい深紅の光に、動画収録中は前から分かる赤ランプになる賢いプリズム</text>
      `);

    default:
      return null;
  }
}
