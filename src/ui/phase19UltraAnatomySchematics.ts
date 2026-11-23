import { PartExplanation } from '../assemblies/types';

/**
 * 50 bespoke beginner-friendly technical SVG schematics (320x118, strictly zero overflow) for Phase 19:
 *  - Phase 19A: 50mm F1.2 GM 3-Section Lightweight Standalone (+30: L99–L128)
 *  - Phase 19B: Micro Pixel Semiconductor Ultra-Audit (+8: M28–M35)
 *  - Phase 19C: Full-Frame Sensor & 5-Axis IBIS Ultra-Audit (+6: S65–S70)
 *  - Phase 19D: Vapor Chamber & Mainboard Ultra-Audit (+6: M55–M60)
 */
export function renderPhase19UltraAnatomySchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // PHASE 19A — SECTION 1 (REAR 1/3: L99–L108)
    // =========================================================================
    case 'lens_cl1082_mount_flex':
      return wrap(`
        <path d="M22,74 A56,56 0 0,1 122,74" fill="none" stroke="#1e293b" stroke-width="10" stroke-linecap="round"/>
        <path d="M28,74 A50,50 0 0,1 116,74" fill="none" stroke="#f59e0b" stroke-width="4" stroke-dasharray="4 3"/>
        <rect x="38" y="24" width="68" height="16" rx="3" fill="#ffedd5" stroke="#ea580c"/>
        <line x1="52" y1="40" x2="52" y2="54" stroke="#d97706" stroke-width="1.6"/>
        <line x1="72" y1="40" x2="72" y2="48" stroke="#d97706" stroke-width="1.6"/>
        <line x1="92" y1="40" x2="92" y2="54" stroke="#d97706" stroke-width="1.6"/>
        <text x="45" y="35" font-size="6.0" fill="#9a3412">CL-1082 フレキ</text>
        <text x="42" y="92" font-size="5.9" fill="#334155">12極 硬質金めっき</text>
        <text x="12" y="112" font-size="6.4" fill="#9a3412">純正CL-1082が120fps通信とXD大電流を低抵抗伝送</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#92400e">純正 S-CL-1082 接点基板</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・品番 A-5031-643-A 純正部品</text>
        <text x="144" y="60" font-size="6.1" fill="#b45309">・接触抵抗&lt;20mΩで電圧降下防止</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・電源線と通信線をGNDで分離配置</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・フレキ側着脱で保守交換も容易</text>
      `);

    case 'lens_pcb_thermal_putty':
      return wrap(`
        <rect x="18" y="24" width="108" height="14" rx="2" fill="#15803d"/>
        <rect x="44" y="38" width="56" height="14" rx="2" fill="#1e293b"/>
        <path d="M36,52 Q72,48 108,52 L106,68 Q72,72 38,68 Z" fill="#f9a8d4" stroke="#db2777" stroke-width="1.3"/>
        <rect x="18" y="69" width="108" height="16" rx="2" fill="#94a3b8" stroke="#475569"/>
        <text x="48" y="48" font-size="5.8" fill="#ffffff">4ch XDドライバIC</text>
        <text x="48" y="63" font-size="5.8" fill="#9d174d">放熱サーマルパテ</text>
        <text x="42" y="80" font-size="5.8" fill="#0f172a">後部金属マウント骨格</text>
        <text x="12" y="112" font-size="6.4" fill="#be185d">空気の150倍の熱伝導パテがドライバ熱を骨格へ逃がす</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#9d174d">基板裏面 放熱サーマルパテ</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・Lensrentals Sony分解で実測確認</text>
        <text x="144" y="60" font-size="6.1" fill="#be185d">・熱伝導4.2W/mKでIC温度上昇抑制</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・垂れ落ちゼロ＆衝撃吸収も兼務</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・非揮発グレードでレンズ曇り防止</text>
      `);

    case 'lens_bayonet_ground_leads':
      return wrap(`
        <rect x="20" y="22" width="104" height="16" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <rect x="20" y="72" width="104" height="16" rx="3" fill="#475569"/>
        <rect x="34" y="38" width="8" height="34" fill="#ea580c"/>
        <rect x="102" y="38" width="8" height="34" fill="#ea580c"/>
        <circle cx="38" cy="30" r="3.5" fill="#eab308" stroke="#713f12"/>
        <circle cx="106" cy="30" r="3.5" fill="#eab308" stroke="#713f12"/>
        <text x="48" y="33" font-size="5.9" fill="#0f172a">SUSマウント</text>
        <text x="49" y="57" font-size="5.9" fill="#c2410c">2本銅アース帯</text>
        <text x="46" y="83" font-size="5.8" fill="#ffffff">内部骨格 / EMI</text>
        <text x="12" y="112" font-size="6.4" fill="#c2410c">180°対称2本銅アース線が静電気とPWMノイズを直結逃がし</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#9a3412">双対ロング銅アースリード</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・内筒〜バヨネットを8mΩ以下直結</text>
        <text x="144" y="60" font-size="6.1" fill="#c2410c">・並列2本で高周波インダクタンス半減</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・±15kV静電気を安全にボディへ放電</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・MRセンサー誤作動ノイズを根絶</text>
      `);

    case 'lens_rear_inner_foam_seal':
      return wrap(`
        <circle cx="72" cy="54" r="36" fill="none" stroke="#1e293b" stroke-width="5"/>
        <circle cx="72" cy="54" r="27" fill="none" stroke="#64748b" stroke-width="7" stroke-dasharray="3 2"/>
        <circle cx="72" cy="54" r="18" fill="#f1f5f9" stroke="#94a3b8"/>
        <text x="58" y="56" font-size="5.8" fill="#334155">後玉光路</text>
        <text x="18" y="24" font-size="5.6" fill="#0f172a">外周ゴム環</text>
        <text x="86" y="96" font-size="5.6" fill="#475569">内側発泡スポンジ</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">外ゴム環のさらに内側に第2の発泡EPDM防塵壁を配置</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#1e293b">マウント内壁 発泡防塵環</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・独立気泡EPDMを35%圧縮シール</text>
        <text x="144" y="60" font-size="6.1" fill="#0f172a">・外ゴムを抜けた微細粉塵を第2捕捉</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・バヨネット裏のねじ隙間も完全遮断</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・Lensrentals GM分解で構造確認</text>
      `);

    case 'lens_iris_click_wedge_lever':
      return wrap(`
        <rect x="20" y="24" width="104" height="12" rx="2" fill="#334155"/>
        <polyline points="24,36 32,42 40,36 48,42 56,36 64,42 72,36 80,42 88,36 96,42 104,36" fill="none" stroke="#1e293b" stroke-width="1.6"/>
        <circle cx="64" cy="46" r="5" fill="#cbd5e1" stroke="#475569" stroke-width="1.4"/>
        <polygon points="48,66 96,52 96,66" fill="#fef08a" stroke="#ca8a04" stroke-width="1.4"/>
        <rect x="86" y="70" width="32" height="14" rx="3" fill="#0f172a"/>
        <text x="20" y="80" font-size="5.9" fill="#92400e">くさびカム(OFF時浮上)</text>
        <text x="90" y="79" font-size="5.6" fill="#ffffff">CLICK SW</text>
        <text x="12" y="112" font-size="6.4" fill="#b45309">純機械式くさびが鋼球を0.45mm浮かせ動画無音化を実現</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#92400e">クリックON/OFFくさびカム</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・純正 A-5031-641-A / 5033-222-A</text>
        <text x="144" y="60" font-size="6.1" fill="#b45309">・電気を使わない高信頼メカ連動機構</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・ON=1/3段手応え / OFF=無音滑らか</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・スイッチ部も独立防水パッキン密閉</text>
      `);

    case 'lens_aperture_wiper_brush':
      return wrap(`
        <path d="M22,78 A62,62 0 0,1 124,78" fill="none" stroke="#15803d" stroke-width="14"/>
        <path d="M26,78 A58,58 0 0,1 120,78" fill="none" stroke="#facc15" stroke-width="2"/>
        <path d="M30,78 A54,54 0 0,1 116,78" fill="none" stroke="#facc15" stroke-width="2"/>
        <rect x="60" y="22" width="26" height="14" rx="2" fill="#f1f5f9" stroke="#64748b"/>
        <line x1="65" y1="36" x2="65" y2="54" stroke="#d97706" stroke-width="1.4"/>
        <line x1="70" y1="36" x2="70" y2="54" stroke="#d97706" stroke-width="1.4"/>
        <line x1="75" y1="36" x2="75" y2="54" stroke="#d97706" stroke-width="1.4"/>
        <line x1="80" y1="36" x2="80" y2="54" stroke="#d97706" stroke-width="1.4"/>
        <text x="20" y="32" font-size="5.8" fill="#92400e">多指ブラシ</text>
        <text x="48" y="92" font-size="5.8" fill="#166534">円弧金コード基板</text>
        <text x="12" y="112" font-size="6.4" fill="#a16207">多点並列の貴金属ブラシがF1.2〜F16+A位置を絶対検出</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#854d0e">マルチフィンガー位置ブラシ</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・極細くし歯の並列接触で瞬断ゼロ</text>
        <text x="144" y="60" font-size="6.1" fill="#a16207">・接触圧わずか0.04Nで無音操作維持</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・電源OFFで回しても装着即座に認識</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・Pd-Ag-Cu合金で100万回高耐久</text>
      `);

    case 'lens_rear_outer_gm_badge':
      return wrap(`
        <rect x="20" y="22" width="104" height="66" rx="8" fill="#1e293b" stroke="#0f172a"/>
        <rect x="34" y="36" width="24" height="24" rx="3" fill="#dc2626" stroke="#fca5a5" stroke-width="1.2"/>
        <circle cx="46" cy="48" r="7" fill="none" stroke="#ffffff" stroke-width="2"/>
        <line x1="46" y1="48" x2="53" y2="48" stroke="#ffffff" stroke-width="2"/>
        <circle cx="96" cy="42" r="5" fill="#f8fafc"/>
        <rect x="70" y="62" width="44" height="14" rx="2" fill="#334155" stroke="#94a3b8"/>
        <text x="74" y="71" font-size="5.4" fill="#e2e8f0">S/N レーザー</text>
        <text x="26" y="74" font-size="5.5" fill="#fca5a5">金属赤Gバッジ</text>
        <text x="12" y="112" font-size="6.4" fill="#b91c1c">純正A-5031-638-A外装殻と赤アルマイトG Master紋章</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#991b1b">純正リア外装＆Gバッジ</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・純正 A-5031-638-A（8014）外装</text>
        <text x="144" y="60" font-size="6.1" fill="#b91c1c">・別体アルミ陽極酸化の赤Gエンブレム</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・白装着指標＆固有シリアル銘板一体</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・着脱捻り荷重を全周リブで分散</text>
      `);

    case 'lens_g5_rear_eccentric_boss':
      return wrap(`
        <circle cx="72" cy="54" r="33" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
        <circle cx="72" cy="54" r="22" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <circle cx="72" cy="24" r="6" fill="#eab308" stroke="#713f12"/>
        <circle cx="73.5" cy="23.5" r="2.2" fill="#475569"/>
        <circle cx="46" cy="70" r="6" fill="#eab308" stroke="#713f12"/>
        <circle cx="44.8" cy="71" r="2.2" fill="#475569"/>
        <circle cx="98" cy="70" r="6" fill="#eab308" stroke="#713f12"/>
        <circle cx="99.2" cy="69" r="2.2" fill="#475569"/>
        <text x="54" y="57" font-size="5.8" fill="#0369a1">後群XA光軸</text>
        <text x="12" y="112" font-size="6.4" fill="#a16207">120° 3点の偏心カラー微回転で後群片ボケを3μm調芯</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#854d0e">純正後群＆3点偏心調整座</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・純正 S-5TH LENS ASSY A-5031-636-A</text>
        <text x="144" y="60" font-size="6.1" fill="#a16207">・1°回転=約3.5μmの超微細センタリング</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・F1.2開放の四隅解像を工場全数調整</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・調整完了後にUV樹脂で永久固定</text>
      `);

    case 'lens_rear_baffle_3screws':
      return wrap(`
        <circle cx="72" cy="54" r="34" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <rect x="50" y="39" width="44" height="30" rx="2" fill="#ffffff" stroke="#475569"/>
        <circle cx="72" cy="26" r="4.5" fill="#0f172a" stroke="#94a3b8"/>
        <circle cx="46" cy="72" r="4.5" fill="#0f172a" stroke="#94a3b8"/>
        <circle cx="98" cy="72" r="4.5" fill="#0f172a" stroke="#94a3b8"/>
        <text x="58" y="56" font-size="5.8" fill="#334155">3:2 遮光窓</text>
        <text x="16" y="26" font-size="5.6" fill="#1e293b">黒染M1.7×3</text>
        <text x="12" y="112" font-size="6.4" fill="#1e293b">表面反射&lt;1.2%の黒染め3本ねじが後端迷光枠を固定</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">後端遮光枠 3点黒染ねじ</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・M1.7×3.5mm 黒色酸化皮膜ねじ×3</text>
        <text x="144" y="60" font-size="6.1" fill="#0f172a">・ざぐり埋設＋艶消しで迷光反射ゼロ</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・120°均等座金で薄い遮光枠の歪み防止</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・緩み止めコートで長期振動脱落ゼロ</text>
      `);

    case 'lens_pcb_jtag_test_pads':
      return wrap(`
        <rect x="20" y="56" width="104" height="24" rx="3" fill="#15803d" stroke="#166534"/>
        <circle cx="32" cy="68" r="4" fill="#facc15" stroke="#a16207"/>
        <circle cx="48" cy="68" r="4" fill="#facc15" stroke="#a16207"/>
        <circle cx="64" cy="68" r="4" fill="#facc15" stroke="#a16207"/>
        <circle cx="80" cy="68" r="4" fill="#facc15" stroke="#a16207"/>
        <circle cx="96" cy="68" r="4" fill="#facc15" stroke="#a16207"/>
        <circle cx="112" cy="68" r="4" fill="#facc15" stroke="#a16207"/>
        <line x1="48" y1="22" x2="48" y2="62" stroke="#eab308" stroke-width="2"/>
        <line x1="80" y1="22" x2="80" y2="62" stroke="#eab308" stroke-width="2"/>
        <rect x="34" y="16" width="60" height="10" rx="2" fill="#334155"/>
        <text x="38" y="23" font-size="5.4" fill="#ffffff">工場プローブ治具</text>
        <text x="12" y="112" font-size="6.4" fill="#a16207">ENIG金パッドへ20kHzプローブを当て全数AF＆ボケ校正</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#854d0e">工場ベンチ校正テストパッド</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・ENIG金めっきφ0.9mm×12点整列</text>
        <text x="144" y="60" font-size="6.1" fill="#a16207">・4基XDモーター追従&lt;0.25μm全数検査</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・個体別収差LUTと温度補正係数を書込</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・コネクタ不要で超薄・軽量設計を維持</text>
      `);

    // =========================================================================
    // PHASE 19A — SECTION 2 (MIDDLE 2/3: L109–L118)
    // =========================================================================
    case 'lens_mid_block_core_frame':
      return wrap(`
        <rect x="20" y="28" width="24" height="52" rx="3" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="54" y="20" width="36" height="68" rx="4" fill="#475569" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="100" y="28" width="24" height="52" rx="3" fill="#bae6fd" stroke="#0284c7"/>
        <line x1="16" y1="54" x2="128" y2="54" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="4 2"/>
        <text x="23" y="56" font-size="5.5" fill="#0369a1">AF後</text>
        <text x="58" y="52" font-size="5.7" fill="#ffffff">固定中核</text>
        <text x="58" y="62" font-size="5.3" fill="#cbd5e1">A-5031-637</text>
        <text x="103" y="56" font-size="5.5" fill="#0369a1">AF前</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">固定群を2つのAF群に挟みXD推力線と重心を完全一致</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">純正中核骨格 S-MID BLOCK</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・純正 A-5031-637-A / 5031-635-A</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・推力軸と重心一致で傾き摩擦ゼロ化</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・4本Ti軸の平行度&lt;2μmを基準保持</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・Sony開発者インタビュー核心構造</text>
      `);

    case 'lens_iris_partition_bumpers':
      return wrap(`
        <rect x="22" y="24" width="100" height="16" rx="2" fill="#e2e8f0" stroke="#64748b"/>
        <rect x="22" y="48" width="100" height="10" rx="2" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
        <rect x="34" y="41" width="14" height="7" rx="2" fill="#334155"/>
        <rect x="96" y="41" width="14" height="7" rx="2" fill="#334155"/>
        <rect x="34" y="58" width="14" height="7" rx="2" fill="#334155"/>
        <rect x="96" y="58" width="14" height="7" rx="2" fill="#334155"/>
        <rect x="28" y="68" width="88" height="16" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <text x="48" y="35" font-size="5.8" fill="#1e293b">11枚絞りユニット</text>
        <text x="44" y="55" font-size="5.5" fill="#ffffff">SUS隔壁＋両面ゴム</text>
        <text x="44" y="79" font-size="5.8" fill="#0369a1">可動フォーカス群</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">0.8mm厚SUS隔壁と両面A40ゴムが絞り保護と衝突消音</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#1e293b">絞り直下SUS隔壁＆緩衝ゴム</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・4点ねじ締結の厚肉SUS304仕切り板</text>
        <text x="144" y="60" font-size="6.1" fill="#0f172a">・両面6点の軟質ゴムが終端音を消去</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・衝撃加速度を約1/15へ安全に緩和</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・鏡筒剛性強化と中間遮光も兼務</text>
      `);

    case 'lens_floating_cog_weights':
      return wrap(`
        <circle cx="72" cy="54" r="32" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
        <circle cx="72" cy="54" r="18" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="34" y="42" width="10" height="24" rx="2" fill="#b45309"/>
        <rect x="100" y="42" width="10" height="24" rx="2" fill="#b45309"/>
        <line x1="22" y1="54" x2="122" y2="54" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2"/>
        <circle cx="72" cy="54" r="4" fill="#dc2626"/>
        <text x="58" y="48" font-size="5.7" fill="#dc2626">重心CoG一致</text>
        <text x="20" y="94" font-size="5.6" fill="#92400e">高比重W-Cuバランスウェイト</text>
        <text x="12" y="112" font-size="6.4" fill="#92400e">やじろべえ重心調整で急加速時のレールこじりを消滅</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#b45309"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#92400e">重心一致バランスウェイト</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・推力中心と質量重心のズレ&lt;0.15mm</text>
        <text x="144" y="60" font-size="6.1" fill="#b45309">・重いF1.2ガラスを真っ直ぐ無振動駆動</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・FPC反力やガラス偏心質量を相殺</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・推力100%直進変換で爆速＆省電力</text>
      `);

    case 'lens_iris_pinion_hairspring':
      return wrap(`
        <circle cx="42" cy="56" r="14" fill="#fde68a" stroke="#b45309" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="70" cy="48" r="18" fill="#f1f5f9" stroke="#475569" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="102" cy="58" r="15" fill="#cbd5e1" stroke="#334155" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="70" cy="48" r="9" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <circle cx="70" cy="48" r="5" fill="none" stroke="#0284c7" stroke-width="1.4"/>
        <text x="20" y="86" font-size="5.8" fill="#92400e">2段マイクロ減速ギヤ</text>
        <text x="64" y="25" font-size="5.8" fill="#0284c7">ヒゲぜんまい予圧</text>
        <text x="12" y="112" font-size="6.4" fill="#b45309">極細ヒゲぜんまい予圧が歯車ガタをゼロ化し露出±0.03EV</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#92400e">11枚絞り減速ギヤ＆ぜんまい</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・m=0.18腕時計級マイクロピニオン列</text>
        <text x="144" y="60" font-size="6.1" fill="#b45309">・トーションばねでバックラッシュ0</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・30fps連写でも露出フリッカー皆無</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・POM×金属の異材噛合いで動画静音</text>
      `);

    case 'lens_barrel_sub_pcb_cover':
      return wrap(`
        <path d="M24,78 Q72,22 120,78" fill="none" stroke="#15803d" stroke-width="10" stroke-linecap="round"/>
        <path d="M20,66 Q72,10 124,66" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
        <rect x="58" y="42" width="28" height="14" rx="2" fill="#0f172a"/>
        <text x="62" y="51" font-size="5.4" fill="#ffffff">前置AMP</text>
        <text x="26" y="88" font-size="5.8" fill="#166534">曲面第2中継サブ基板＋絶縁カバー</text>
        <text x="12" y="112" font-size="6.4" fill="#166534">鏡筒側面の出張所基板が微弱MR信号を直近で低雑音増幅</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#166534">第2補助サブ基板＆絶縁殻</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・Lensrentals GM分解で確認の第2基板</text>
        <text x="144" y="60" font-size="6.1" fill="#15803d">・MRセンサー信号を直近増幅SN+18dB</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・全ZIFフレキ接続ではんだ線ゼロ</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・UL94 V-0黒PCカバーで短絡防護</text>
      `);

    case 'lens_xd_rollflex_loop':
      return wrap(`
        <path d="M24,34 L84,34 A18,18 0 0,1 84,70 L24,70" fill="none" stroke="#f97316" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M84,26 A26,26 0 0,1 84,78" fill="none" stroke="#334155" stroke-width="4" stroke-dasharray="3 2"/>
        <line x1="36" y1="52" x2="72" y2="52" stroke="#0284c7" stroke-width="2"/>
        <polygon points="72,48 80,52 72,56" fill="#0284c7"/>
        <polygon points="36,48 28,52 36,56" fill="#0284c7"/>
        <text x="20" y="24" font-size="5.8" fill="#c2410c">12μm圧延焼鈍銅U字ループ</text>
        <text x="72" y="90" font-size="5.7" fill="#334155">R≥2.5mmガイド</text>
        <text x="12" y="112" font-size="6.4" fill="#c2410c">キャタピラ式ロール屈曲で3,000万回AF往復でも断線ゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#9a3412">U字ロールフレックスFPC</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・高屈曲圧延銅(RA-Cu)12μm採用</text>
        <text x="144" y="60" font-size="6.1" fill="#c2410c">・曲げ半径R≥2.5mmで銅ひずみ0.24%</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・左右対称配置でケーブル反力を相殺</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・-20°C極寒地でも硬化せず軽快追従</text>
      `);

    case 'lens_xd_antitwist_peg':
      return wrap(`
        <circle cx="38" cy="54" r="10" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <circle cx="38" cy="54" r="16" fill="none" stroke="#0284c7" stroke-width="3"/>
        <line x1="54" y1="54" x2="88" y2="54" stroke="#64748b" stroke-width="5"/>
        <path d="M88,42 L114,42 L114,48 L96,48 L96,60 L114,60 L114,66 L88,66 Z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>
        <circle cx="106" cy="54" r="5" fill="#475569"/>
        <text x="20" y="86" font-size="5.7" fill="#0369a1">主軸丸穴</text>
        <text x="78" y="86" font-size="5.7" fill="#334155">対向U溝＋ペグ</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">丸穴1軸＋U字溝の運動学設計で熱膨張かじりと回転を根絶</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">回り止めペグ＆U字溝フォーク</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・キネマティック拘束(Z直進1自由度)</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・2軸過剰拘束によるかじりを完全回避</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・フッ素配合POMフォークで無音滑走</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・Lensrentals SonyリニアAF分解知見</text>
      `);

    case 'lens_hold_btn_wp_boots':
      return wrap(`
        <rect x="44" y="20" width="56" height="14" rx="4" fill="#334155"/>
        <path d="M36,48 L46,34 L98,34 L108,48 L118,48 L118,54 L26,54 L26,48 Z" fill="#0284c7" opacity="0.75" stroke="#0369a1" stroke-width="1.4"/>
        <path d="M56,64 Q72,54 88,64" fill="none" stroke="#94a3b8" stroke-width="3"/>
        <rect x="28" y="66" width="88" height="14" rx="2" fill="#15803d"/>
        <text x="50" y="29" font-size="5.6" fill="#ffffff">ホールドボタン</text>
        <text x="20" y="92" font-size="5.7" fill="#0369a1">円錐防水シリコーンブーツ＋金属ドーム</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">横(9時)・縦(12時)2基を円錐ゴム傘で完全防水密閉</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">縦横2基フォーカスホールド防水</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・横位置＆縦位置で同じ指先に配置</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・一体成形シリコーンブーツで豪雨遮断</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・SUSドーム接点(クリック率47%)</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・瞳AF等カスタム割当＆50万回耐久</text>
      `);

    case 'lens_afmf_switch_wiper':
      return wrap(`
        <rect x="46" y="20" width="38" height="14" rx="3" fill="#1e293b"/>
        <rect x="22" y="38" width="100" height="10" rx="3" fill="#475569"/>
        <rect x="61" y="34" width="8" height="26" fill="#94a3b8"/>
        <polyline points="28,68 44,58 64,68 84,58 104,68" fill="none" stroke="#0284c7" stroke-width="2.2"/>
        <rect x="24" y="74" width="96" height="12" rx="2" fill="#15803d"/>
        <text x="53" y="29" font-size="5.6" fill="#ffffff">AF / MF</text>
        <text x="20" y="96" font-size="5.6" fill="#334155">二重リップ防水膜＋W字ステンレス板ばね</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">二重ゴムワイパーとW字板ばねが防水と節度感を両立</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">AF/MF防水ワイパー＆板ばね</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・二重リップEPDMでスライド隙間を密閉</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・W字SUS301板ばねで明瞭スナップ切替</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・作動力3.2Nでバッグ内の誤切替を防止</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・雪中・雨天グローブ越しでも確実操作</text>
      `);

    case 'lens_split_barrel_dowels':
      return wrap(`
        <rect x="20" y="24" width="48" height="58" rx="3" fill="#94a3b8" stroke="#334155"/>
        <rect x="76" y="24" width="48" height="58" rx="3" fill="#64748b" stroke="#1e293b"/>
        <rect x="52" y="34" width="40" height="8" rx="2" fill="#38bdf8" stroke="#0369a1"/>
        <rect x="46" y="60" width="52" height="7" rx="1" fill="#e2e8f0" stroke="#334155"/>
        <rect x="96" y="56" width="8" height="15" rx="1" fill="#cbd5e1" stroke="#334155"/>
        <text x="26" y="52" font-size="5.6" fill="#0f172a">後部Mg筒</text>
        <text x="82" y="52" font-size="5.6" fill="#ffffff">前部Mg筒</text>
        <text x="24" y="92" font-size="5.6" fill="#0369a1">焼入れノックピン×2 ＋ 長M2ボルト×6</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">±3μmノックピンと6本ロングボルトで前後内筒を戦車級結合</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">2分割内筒ノックピン＆長ボルト</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・φ2mm焼入れピン×2で同軸誤差&lt;5μm</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・M2×10mm高張力ロングボルト×6本</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・再組立しても光軸が完璧に復元</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・Lensrentals「戦車並み剛性」高評価</text>
      `);

    // =========================================================================
    // PHASE 19A — SECTION 3 (FRONT 3/3: L119–L128)
    // =========================================================================
    case 'lens_front_makeup_violet_seal':
      return wrap(`
        <circle cx="72" cy="54" r="35" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <circle cx="72" cy="54" r="27" fill="none" stroke="#6366f1" stroke-width="7"/>
        <circle cx="72" cy="54" r="20" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="58" y="56" font-size="5.8" fill="#0369a1">最前玉G1</text>
        <text x="18" y="96" font-size="5.6" fill="#4338ca">化粧銘板リング ＋ 青紫極厚防水シール</text>
        <text x="12" y="112" font-size="6.4" fill="#4338ca">化粧枠の真下に潜む極厚青紫シリコーンが前玉外周を完全密閉</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#3730a3">化粧リング＆極厚青紫シール</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・Lensrentals GM分解名物の青紫ゴム</text>
        <text x="144" y="60" font-size="6.1" fill="#4338ca">・最前玉とフィルター枠の浸水を遮断</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・化粧リングが先端固定ねじ3本を隠蔽</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・寒暖差のガラス膨張応力も弾性吸収</text>
      `);

    case 'lens_mf_pom_slider_pads':
      return wrap(`
        <circle cx="72" cy="54" r="34" fill="none" stroke="#334155" stroke-width="6"/>
        <circle cx="72" cy="54" r="26" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="64" y="21" width="16" height="6" rx="2" fill="#ffffff" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="42" y="68" width="16" height="6" rx="2" fill="#ffffff" stroke="#0284c7" stroke-width="1.6" transform="rotate(-60 50 71)"/>
        <rect x="86" y="68" width="16" height="6" rx="2" fill="#ffffff" stroke="#0284c7" stroke-width="1.6" transform="rotate(60 94 71)"/>
        <text x="48" y="56" font-size="5.8" fill="#334155">3点白色POM</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">120° 3箇所の弾性白色POMパッドが上質なMF回し心地を生成</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">3点白色POMテンションパッド</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・120°配置の弾性POMばねスライダー</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・動き出しの引っ掛かりゼロで微調整抜群</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・ラバー下に全周黒色防塵テープ貼付</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・Lensrentals 135mm GM分解で詳述</text>
      `);

    case 'lens_mf_internal_ring_gear':
      return wrap(`
        <path d="M22,74 A54,54 0 0,1 122,74" fill="none" stroke="#1e293b" stroke-width="8"/>
        <path d="M28,74 A48,48 0 0,1 116,74" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="3 2"/>
        <circle cx="72" cy="54" r="14" fill="#f8fafc" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="58" y="74" width="28" height="14" rx="2" fill="#1e293b"/>
        <text x="61" y="83" font-size="5.4" fill="#ffffff">位置センサー</text>
        <text x="20" y="26" font-size="5.7" fill="#0369a1">リング内歯ギヤ＋ピニオン</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">1:16増速の内歯ギヤ検出で0.09°単位の直感リニアMFを実現</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">MF内歯ギヤ＆ピニオン検出</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・フォーカスリング内周の微細内歯ギヤ</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・白色ピニオン駆動で角度分解&lt;0.09°</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・回転速度に依存しないリニア応答MF</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・MF系異常時もAFは独立動作継続</text>
      `);

    case 'lens_front_window_tilt_shims':
      return wrap(`
        <rect x="20" y="24" width="104" height="62" rx="4" fill="#e2e8f0" stroke="#475569"/>
        <rect x="28" y="36" width="24" height="18" rx="2" fill="#eab308" stroke="#713f12"/>
        <rect x="60" y="36" width="24" height="14" rx="2" fill="#38bdf8" stroke="#0369a1"/>
        <rect x="92" y="36" width="24" height="10" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <text x="29" y="66" font-size="5.6" fill="#854d0e">0.48mm</text>
        <text x="61" y="66" font-size="5.6" fill="#0369a1">0.35mm</text>
        <text x="93" y="66" font-size="5.6" fill="#334155">0.27mm</text>
        <text x="24" y="80" font-size="5.6" fill="#1e293b">3箇所校正窓からの個別厚選別</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">3点のシム厚差(0.27〜0.48mm)で前群の像面傾きを完璧補正</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">前群3窓チルト校正シム群</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・Lensrentals GM実測 0.27〜0.48mm</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・3点厚差で光軸チルト(片ボケ)を矯正</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・側面の校正窓から全分解せず調整可</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・10μm刻みの個体別最適選別組付</text>
      `);

    case 'lens_filter_assy_thick_gasket':
      return wrap(`
        <rect x="20" y="24" width="104" height="24" rx="3" fill="#1e293b" stroke="#0f172a"/>
        <rect x="24" y="48" width="96" height="12" rx="4" fill="#64748b" stroke="#334155"/>
        <rect x="20" y="60" width="104" height="24" rx="3" fill="#94a3b8" stroke="#475569"/>
        <text x="30" y="39" font-size="5.7" fill="#ffffff">S-FILTER SCREW (72mm)</text>
        <text x="36" y="56" font-size="5.5" fill="#ffffff">極厚防滴ガスケット</text>
        <text x="44" y="75" font-size="5.7" fill="#0f172a">前部固定鏡筒</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">独立交換できるフィルター枠と直下の極厚パッキンで先端防水</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">純正フィルター枠＆極厚パッキン</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・純正 A-5031-640-A（M72×P0.75）</text>
        <text x="144" y="60" font-size="6.1" fill="#0f172a">・直下全周の極厚発泡ゴムで雨水遮断</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・先端打痕時も前玉交換せず安価修理</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・フード用外部バヨネット溝を一体成形</text>
      `);

    case 'lens_g2_xa_sealant_screws':
      return wrap(`
        <path d="M36,26 Q72,18 108,26 L108,74 Q72,82 36,74 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="28" y="28" width="8" height="44" rx="3" fill="#14b8a6"/>
        <rect x="108" y="28" width="8" height="44" rx="3" fill="#14b8a6"/>
        <circle cx="24" cy="40" r="3.5" fill="#334155"/>
        <circle cx="120" cy="40" r="3.5" fill="#334155"/>
        <text x="48" y="54" font-size="5.9" fill="#0369a1">第2群 大口径XA</text>
        <text x="20" y="92" font-size="5.6" fill="#0f766e">低応力弾性シーラント＋固定ねじ</text>
        <text x="12" y="112" font-size="6.4" fill="#0f766e">小型F1.2の要「第2群XA」を歪みゼロの弾性シールで保持</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#115e59">第2群XAシーラント＆固定ねじ</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・前から2枚目の大口径0.01μm XA玉</text>
        <text x="144" y="60" font-size="6.1" fill="#0f766e">・低弾性シーラントで熱応力複屈折ゼロ</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・専用ねじ群で重量ガラスを確実支持</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・前玉小型化(778g達成)最大の立役者</text>
      `);

    case 'lens_front_spanner_orings':
      return wrap(`
        <rect x="20" y="24" width="104" height="10" rx="2" fill="#1e293b"/>
        <rect x="26" y="34" width="92" height="5" rx="2" fill="#64748b"/>
        <path d="M28,40 Q72,35 116,40 L116,56 Q72,60 28,56 Z" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="24" y="60" width="96" height="10" rx="2" fill="#334155"/>
        <rect x="30" y="70" width="84" height="5" rx="2" fill="#64748b"/>
        <rect x="32" y="24" width="8" height="4" fill="#eab308"/>
        <rect x="104" y="24" width="8" height="4" fill="#eab308"/>
        <text x="34" y="92" font-size="5.6" fill="#1e293b">各群独立カニ目スパナ＋緩衝Oリング</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">全前群を独立ねじ込みスパナ環で締め落下衝撃ズレを防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">独立スパナ保持環＆Oリング</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・各レンズ群を個別にねじ込みロック</text>
        <text x="144" y="60" font-size="6.1" fill="#0f172a">・極細Oリング緩衝でガラス欠け防止</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・空気間隔公差±5μmを永久保持</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・内周テーパー艶消しで迷光ゼロ</text>
      `);

    case 'lens_cold_rubber_grip_tape':
      return wrap(`
        <rect x="20" y="26" width="104" height="28" rx="3" fill="#1e293b"/>
        <line x1="28" y1="26" x2="28" y2="54" stroke="#475569" stroke-width="2"/>
        <line x1="38" y1="26" x2="38" y2="54" stroke="#475569" stroke-width="2"/>
        <line x1="48" y1="26" x2="48" y2="54" stroke="#475569" stroke-width="2"/>
        <line x1="58" y1="26" x2="58" y2="54" stroke="#475569" stroke-width="2"/>
        <line x1="68" y1="26" x2="68" y2="54" stroke="#475569" stroke-width="2"/>
        <line x1="78" y1="26" x2="78" y2="54" stroke="#475569" stroke-width="2"/>
        <line x1="88" y1="26" x2="88" y2="54" stroke="#475569" stroke-width="2"/>
        <line x1="98" y1="26" x2="98" y2="54" stroke="#475569" stroke-width="2"/>
        <line x1="108" y1="26" x2="108" y2="54" stroke="#475569" stroke-width="2"/>
        <rect x="20" y="57" width="104" height="8" fill="#0f172a"/>
        <rect x="20" y="68" width="104" height="16" rx="2" fill="#94a3b8"/>
        <text x="36" y="79" font-size="5.6" fill="#0f172a">調整窓＋全周防塵テープ</text>
        <text x="12" y="112" font-size="6.4" fill="#1e293b">-20°Cでも硬化しにくい低温ゴム＋直下防塵テープで完全防御</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">低温耐候ラバー＆防塵テープ</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・純正 A-5031-642-A フォーカスリング</text>
        <text x="144" y="60" font-size="6.1" fill="#0f172a">・-20°C硬度変化&lt;6 Shore-Aの冬仕様</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・直下黒テープが全調整窓を完全密閉</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・耐皮脂・耐白化プロ仕様エラストマー</text>
      `);

    case 'lens_hood_release_lock_pin':
      return wrap(`
        <rect x="20" y="24" width="104" height="22" rx="3" fill="#1e293b"/>
        <rect x="52" y="16" width="38" height="12" rx="3" fill="#ef4444" stroke="#991b1b"/>
        <rect x="66" y="28" width="10" height="32" rx="1" fill="#cbd5e1" stroke="#334155"/>
        <path d="M20,54 L62,54 L62,64 L80,64 L80,54 L124,54 L124,80 L20,80 Z" fill="#64748b" stroke="#1e293b"/>
        <text x="56" y="24" font-size="5.3" fill="#ffffff">解除ボタン</text>
        <text x="26" y="74" font-size="5.6" fill="#ffffff">鏡筒ロック凹み＋SUSピン</text>
        <text x="12" y="112" font-size="6.4" fill="#b91c1c">バネ式ステンレスピンがカチッとロックしフード脱落を根絶</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#991b1b">ALC-SH163 ロック解除機構</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・純正フード X50017721 内蔵安全ロック</text>
        <text x="144" y="60" font-size="6.1" fill="#b91c1c">・せん断耐力&gt;120Nで誤接触脱落ゼロ</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・ボタンを押すだけで片手スムーズ解除</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・逆付け収納時も同様にガタなく固定</text>
      `);

    case 'lens_hood_tpe_bumper_dot':
      return wrap(`
        <path d="M24,78 L34,26 L110,26 L120,78 Z" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="30" y="20" width="84" height="9" rx="4" fill="#64748b" stroke="#1e293b" stroke-width="1.6"/>
        <circle cx="72" cy="70" r="5" fill="#dc2626" stroke="#fecaca"/>
        <text x="42" y="26" font-size="5.5" fill="#ffffff">先端TPE保護バンパー</text>
        <text x="82" y="72" font-size="5.5" fill="#fecaca">赤装着ドット</text>
        <text x="12" y="112" font-size="6.4" fill="#991b1b">二色成形TPEゴム底が机への伏せ置き滑り＆前玉衝撃を吸収</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#991b1b">フード先端TPEリム＆赤ドット</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・静止摩擦μ≈0.85で仮置き転倒を防止</text>
        <text x="144" y="60" font-size="6.1" fill="#b91c1c">・前玉30mm手前の衝撃吸収バンパー</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・二色成形でゴムの剥がれを根本防止</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・立体赤ドットで暗所でも1秒装着</text>
      `);

    // =========================================================================
    // PHASE 19B — MICRO PIXEL SEMICONDUCTOR (+8: M28–M35)
    // =========================================================================
    case 'micro_pwell_body_tie':
      return wrap(`
        <rect x="20" y="44" width="104" height="40" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <rect x="28" y="48" width="22" height="16" rx="2" fill="#f59e0b"/>
        <rect x="94" y="48" width="22" height="16" rx="2" fill="#f59e0b"/>
        <rect x="56" y="48" width="32" height="28" rx="2" fill="#38bdf8" stroke="#0369a1"/>
        <line x1="39" y1="26" x2="39" y2="48" stroke="#d97706" stroke-width="2.5"/>
        <line x1="105" y1="26" x2="105" y2="48" stroke="#d97706" stroke-width="2.5"/>
        <line x1="24" y1="26" x2="120" y2="26" stroke="#d97706" stroke-width="3"/>
        <text x="58" y="65" font-size="5.6" fill="#0c4a6e">N-PD井戸</text>
        <text x="48" y="22" font-size="5.7" fill="#92400e">低抵抗GND接地網</text>
        <text x="12" y="112" font-size="6.4" fill="#92400e">高濃度P++タップ格子が120fps全画素リセット電位を固定</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#92400e">Pウェルタップ＆ガードリング</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・全画素一斉動作の基板揺れ&lt;0.5mV</text>
        <text x="144" y="60" font-size="6.1" fill="#b45309">・横筋ノイズ(ストリーキング)を根絶</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・寄生ラッチアップ電流を即座に吸収</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・BSI前面側配置で受光開口ロスゼロ</text>
      `);

    case 'micro_column_cds_sh':
      return wrap(`
        <rect x="20" y="24" width="38" height="24" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <rect x="86" y="24" width="38" height="24" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="24" y="39" font-size="5.7" fill="#991b1b">V_rst+雑音</text>
        <text x="89" y="39" font-size="5.7" fill="#1e40af">V_sig+雑音</text>
        <circle cx="72" cy="68" r="14" fill="#ecfeff" stroke="#0891b2" stroke-width="1.8"/>
        <line x1="39" y1="48" x2="62" y2="58" stroke="#dc2626" stroke-width="1.6"/>
        <line x1="105" y1="48" x2="82" y2="58" stroke="#2563eb" stroke-width="1.6"/>
        <text x="64" y="71" font-size="8.0" font-weight="bold" fill="#0e7490">− 減算</text>
        <text x="12" y="112" font-size="6.4" fill="#0e7490">リセット雑音(kTC)をハードウェア引き算し読出&lt;1.2e⁻実現</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#155e75">カラム共有アナログCDS回路</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・光転送前後の2電圧をMIM容量保持</text>
        <text x="144" y="60" font-size="6.1" fill="#0e7490">・差分(V_sig−V_rst)でkTC雑音消去</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・画素ごとのオフセットムラも同時除去</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・暗部15+ストップの圧倒的ノイズ耐性</text>
      `);

    case 'micro_ss_adc_ramp_comp':
      return wrap(`
        <polyline points="20,30 118,80" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
        <line x1="20" y1="54" x2="118" y2="54" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="3 2"/>
        <circle cx="67" cy="54" r="4" fill="#dc2626"/>
        <line x1="67" y1="54" x2="67" y2="86" stroke="#dc2626" stroke-width="1.5"/>
        <text x="22" y="25" font-size="5.7" fill="#b45309">共通ランプDAC電圧</text>
        <text x="72" y="49" font-size="5.6" fill="#0284c7">画素V_CDS</text>
        <text x="52" y="95" font-size="5.6" fill="#dc2626">一致瞬間に14bitラッチ</text>
        <text x="12" y="112" font-size="6.4" fill="#1d4ed8">6,000列同時比較＆グレイコード計数で16,384階調を瞬時生成</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#1e40af">14-bit シングル・スロープADC</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・1 LSBわずか61μVの超精細量子化</text>
        <text x="144" y="60" font-size="6.1" fill="#1d4ed8">・全列共通ランプ波で縦縞ムラを防止</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・グレイコード採用で同時ビット誤読0</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・第2ロジック層に数千〜数百万個並列</text>
      `);

    case 'micro_stitch_slvsec_phy':
      return wrap(`
        <rect x="18" y="24" width="52" height="44" rx="2" fill="#dbeafe" stroke="#2563eb"/>
        <rect x="74" y="24" width="52" height="44" rx="2" fill="#e0e7ff" stroke="#4f46e5"/>
        <line x1="72" y1="18" x2="72" y2="74" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
        <rect x="22" y="76" width="100" height="14" rx="2" fill="#f59e0b"/>
        <text x="26" y="48" font-size="5.6" fill="#1e40af">露光枠A</text>
        <text x="82" y="48" font-size="5.6" fill="#3730a3">露光枠B</text>
        <text x="30" y="85" font-size="5.6" fill="#ffffff">SLVS-EC v2.0 (8レーン)</text>
        <text x="12" y="112" font-size="6.4" fill="#b45309">ナノ精度つなぎ露光で36mmチップ製造＆80Gbps超直結転送</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#92400e">露光ステッチ＆SLVS-EC PHY</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・33mm露光限界を繋ぐフルサイズ技術</text>
        <text x="144" y="60" font-size="6.1" fill="#b45309">・クロック埋込型差動200mV低EMI</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・12.5Gbps×8レーンで120fps RAW送出</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・IBIS可動フレキ本数を劇的に削減</text>
      `);

    case 'micro_cra_chief_ray_shift':
      return wrap(`
        <path d="M36,42 A26,18 0 0,1 88,42 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="44" y="46" width="56" height="10" fill="#22c55e" opacity="0.7"/>
        <rect x="50" y="60" width="56" height="24" rx="2" fill="#334155"/>
        <line x1="22" y1="18" x2="78" y2="74" stroke="#f59e0b" stroke-width="2.2"/>
        <text x="20" y="32" font-size="5.6" fill="#b45309">斜光25°</text>
        <text x="64" y="75" font-size="5.6" fill="#ffffff">PD中心へ命中</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">周辺画素OCLを最大0.45μm内側へずらし斜め光も完全捕獲</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">周辺CRA主光線シフト設計</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・像高に応じOCL/CFAを内側へ変位</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・18mm短フランジF1.2斜光に対応</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・周辺減光と色被り(シェーディング)抑止</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・BSI薄肉スタックと相乗で高効率集光</text>
      `);

    case 'micro_tsv_oxide_liner':
      return wrap(`
        <rect x="20" y="22" width="104" height="14" rx="2" fill="#38bdf8"/>
        <rect x="20" y="36" width="104" height="36" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="20" y="72" width="104" height="14" rx="2" fill="#8b5cf6"/>
        <rect x="54" y="32" width="36" height="44" fill="#e0f2fe" stroke="#0284c7"/>
        <rect x="60" y="30" width="24" height="48" fill="#64748b"/>
        <rect x="64" y="28" width="16" height="52" fill="#ea580c"/>
        <text x="24" y="31" font-size="5.5" fill="#ffffff">Wafer 2</text>
        <text x="24" y="81" font-size="5.5" fill="#ffffff">Wafer 3 DRAM</text>
        <text x="92" y="54" font-size="5.4" fill="#0369a1">SiO₂絶縁筒</text>
        <text x="12" y="112" font-size="6.4" fill="#c2410c">300nm SiO₂絶縁ライナー＋TaN防壁で20μm Siを垂直貫通</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#9a3412">薄肉Si貫通ビア(Cu-TSV)</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・φ3〜5μm×深20μmの垂直銅バス</text>
        <text x="144" y="60" font-size="6.1" fill="#c2410c">・CVD-SiO₂筒がシリコン短絡を完全遮断</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・TaNバリアが銅拡散(白点ノイズ)防止</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・ADC層↔DRAM層を最短距離で直結</text>
      `);

    case 'micro_quad_bayer_septum':
      return wrap(`
        <rect x="20" y="26" width="44" height="42" fill="#fca5a5"/>
        <rect x="80" y="26" width="44" height="42" fill="#86efac"/>
        <rect x="64" y="24" width="16" height="46" fill="#e0f2fe" stroke="#0284c7"/>
        <rect x="69" y="24" width="6" height="46" fill="#334155"/>
        <polyline points="38,24 64,46 42,68" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="26" y="48" font-size="5.7" fill="#991b1b">R画素</text>
        <text x="90" y="48" font-size="5.7" fill="#166534">G画素</text>
        <text x="24" y="86" font-size="5.6" fill="#334155">全反射で斜光を自画素へ導波</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">幅70nmの金属＋低屈折率隔壁が隣画素への色漏れを-15dB遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">ナノ光学導波隔壁セプタム</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・W遮光核＋低n導波壁(幅60〜90nm)</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・臨界角39.5°全反射で斜光を逃さない</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・色混色-15dB＆クロスAF分離度向上</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・高画素化と高ISO感度を同時に両立</text>
      `);

    case 'micro_bandgap_pll_clock':
      return wrap(`
        <line x1="20" y1="74" x2="120" y2="34" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <line x1="20" y1="34" x2="120" y2="74" stroke="#3b82f6" stroke-width="1.6" stroke-dasharray="3 2"/>
        <line x1="20" y1="54" x2="120" y2="54" stroke="#7c3aed" stroke-width="2.6"/>
        <text x="22" y="28" font-size="5.6" fill="#2563eb">V_BE (-2mV/°C)</text>
        <text x="72" y="28" font-size="5.6" fill="#dc2626">+K·ΔV_BE</text>
        <text x="36" y="49" font-size="6.0" font-weight="bold" fill="#6d28d9">V_BG = 1.205V 一定</text>
        <text x="26" y="88" font-size="5.6" fill="#475569">−20°C ──── 温度 ──── +85°C</text>
        <text x="12" y="112" font-size="6.4" fill="#6d28d9">正負の温度係数を相殺し年中ブレない1.205V基準＆1ps時計</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f5f3ff" stroke="#8b5cf6"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#5b21b6">バンドギャップ基準＆PLL時計</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・温度係数&lt;5ppm/°Cの不動電圧基準</text>
        <text x="144" y="60" font-size="6.1" fill="#6d28d9">・長時間8K加熱でも色＆露出ドリフト0</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・ジッタ&lt;1psの等長H-Treeクロック網</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・工場eFuseトリムで初期誤差±0.1%</text>
      `);

    // =========================================================================
    // PHASE 19C — SENSOR & 5-AXIS IBIS (+6: S65–S70)
    // =========================================================================
    case 'sensor_birefringent_olpf':
      return wrap(`
        <rect x="30" y="22" width="16" height="62" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="60" y="22" width="10" height="62" rx="2" fill="#c4b5fd" stroke="#7c3aed"/>
        <rect x="84" y="22" width="16" height="62" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <line x1="14" y1="53" x2="30" y2="53" stroke="#f59e0b" stroke-width="2"/>
        <line x1="30" y1="53" x2="46" y2="45" stroke="#f59e0b" stroke-width="1.5"/>
        <line x1="30" y1="53" x2="46" y2="61" stroke="#f59e0b" stroke-width="1.5"/>
        <line x1="46" y1="45" x2="116" y2="41" stroke="#0284c7" stroke-width="1.3"/>
        <line x1="46" y1="61" x2="116" y2="65" stroke="#0284c7" stroke-width="1.3"/>
        <text x="26" y="95" font-size="5.5" fill="#0369a1">水平水晶</text>
        <text x="58" y="95" font-size="5.5" fill="#6d28d9">λ/4</text>
        <text x="80" y="95" font-size="5.5" fill="#0369a1">垂直水晶</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">2枚の45°複屈折水晶＋λ/4板が4点分離で偽色モアレを解消</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#38bdf8"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">2軸複屈折水晶OLPF＆λ/4板</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・人工α水晶の複屈折で光を約4μm分離</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・λ/4板が円偏光へ戻し縦横均等配分</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・細かい格子縞や織物の偽色を抑制</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・極薄積層でF1.2斜光の収差悪化最小</text>
      `);

    case 'sensor_cm500_dichroic_ir':
      return wrap(`
        <rect x="34" y="22" width="10" height="62" fill="#818cf8"/>
        <rect x="44" y="22" width="38" height="62" rx="2" fill="#67e8f9" stroke="#0891b2" stroke-width="1.5"/>
        <line x1="16" y1="42" x2="114" y2="42" stroke="#22c55e" stroke-width="2.2"/>
        <polyline points="16,66 34,66 20,78" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="34" y1="66" x2="64" y2="66" stroke="#dc2626" stroke-width="1.4" opacity="0.5"/>
        <text x="86" y="45" font-size="5.6" fill="#15803d">可視光透過</text>
        <text x="16" y="94" font-size="5.5" fill="#0e7490">42層反射膜＋CM500青吸収ガラス</text>
        <text x="12" y="112" font-size="6.4" fill="#0e7490">反射膜＋青吸収ガラスの二段防御で斜光でも色転びゼロ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#155e75">ハイブリッドIRカット多層膜</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・青色リン酸銅ガラス(CM500)がIR吸収</text>
        <text x="144" y="60" font-size="6.1" fill="#0e7490">・42層誘電体ホットミラーが鋭く反射</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・広角・F1.2斜光でも周辺色転び防止</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・Kolari Vision Sonyα分解で検証</text>
      `);

    case 'sensor_pzt_electrode_bond':
      return wrap(`
        <rect x="22" y="24" width="12" height="58" fill="#cbd5e1" stroke="#475569"/>
        <rect x="34" y="24" width="18" height="58" fill="#fde68a" stroke="#b45309"/>
        <rect x="52" y="24" width="8" height="58" fill="#38bdf8"/>
        <rect x="60" y="20" width="60" height="66" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <path d="M70,32 Q90,26 110,32 M70,52 Q90,46 110,52 M70,72 Q90,66 110,72" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <text x="68" y="44" font-size="5.8" fill="#0369a1">70kHz 8,000G!</text>
        <text x="20" y="95" font-size="5.5" fill="#475569">Ag電極 / PZT / 整合接着</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">焼成Ag-Ni電極と硬質音響整合層が7万Hz振動を直結伝達</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">超音波PZT電極＆整合接着層</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・両面焼成銀ニッケル膜へ高周波印加</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・&lt;15μm硬質整合層が振動ロスを最小化</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・最大約8,000Gの加速度でゴミを剥離</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・帯電防止コートと連携し高い防塵性</text>
      `);

    case 'sensor_sus440c_ball_races':
      return wrap(`
        <rect x="20" y="24" width="104" height="14" rx="2" fill="#64748b"/>
        <rect x="44" y="38" width="56" height="8" rx="1" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.5"/>
        <circle cx="72" cy="56" r="10" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="44" y="66" width="56" height="8" rx="1" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="20" y="74" width="104" height="14" rx="2" fill="#64748b"/>
        <text x="48" y="33" font-size="5.5" fill="#ffffff">Mg可動ステージ</text>
        <text x="86" y="58" font-size="5.6" fill="#1e293b">Si₃N₄球</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">HRC60超の鏡面SUS440C座金が1.1GPa点接触応力を受け止め</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">超硬SUS440Cボールレース板</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・Mg枠へのセラミック球めり込み防止</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・Ra&lt;0.02μm鏡面で摩擦μ&lt;0.002</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・3点キネマティック対向インサート</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・1/2画素単位ピクセルシフトを支える</text>
      `);

    case 'sensor_rear_flux_shunt':
      return wrap(`
        <rect x="20" y="24" width="104" height="60" rx="4" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
        <rect x="42" y="38" width="60" height="32" rx="2" fill="#ffffff"/>
        <line x1="36" y1="24" x2="36" y2="36" stroke="#0f172a" stroke-width="2.5"/>
        <line x1="72" y1="24" x2="72" y2="36" stroke="#0f172a" stroke-width="2.5"/>
        <line x1="108" y1="24" x2="108" y2="36" stroke="#0f172a" stroke-width="2.5"/>
        <line x1="36" y1="72" x2="36" y2="84" stroke="#0f172a" stroke-width="2.5"/>
        <line x1="72" y1="72" x2="72" y2="84" stroke="#0f172a" stroke-width="2.5"/>
        <line x1="108" y1="72" x2="108" y2="84" stroke="#0f172a" stroke-width="2.5"/>
        <text x="48" y="56" font-size="5.6" fill="#334155">渦電流遮断スリット</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">放射スリット入りパーマロイ板が漏れ磁束遮断＆渦電流1/16</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">低渦電流スリット磁気シャント</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・N52強力磁束の背面基板漏れを-20dB</text>
        <text x="144" y="60" font-size="6.1" fill="#0f172a">・スリット分割で渦電流ブレーキ1/16</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・0.25mm極薄パーマロイで軽量化維持</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・8.5段IBISの高周波手ブレ追従を向上</text>
      `);

    case 'sensor_cavity_breather_desiccant':
      return wrap(`
        <rect x="20" y="24" width="104" height="58" rx="4" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="92" y="28" width="24" height="14" rx="2" fill="#ffffff" stroke="#0284c7"/>
        <rect x="34" y="66" width="76" height="10" rx="2" fill="#fde68a" stroke="#b45309"/>
        <text x="95" y="37" font-size="5.2" fill="#0369a1">ePTFE</text>
        <text x="42" y="73" font-size="5.4" fill="#92400e">モレキュラーシーブ乾燥帯</text>
        <text x="28" y="52" font-size="5.8" fill="#0369a1">乾燥光学室 (露点&lt;−30°C)</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">0.2μm撥水呼吸膜と乾燥剤が高山・雪山の内部曇りを根絶</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">調圧呼吸ベント＆防曇乾燥剤</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・0.2μm ePTFEが空気だけ通し水・塵0</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・気圧差による光学ガラス歪みを解消</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・乾燥帯が内部露点を−30°C以下に保持</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・非発塵封入でSSWF振動でも飛散ゼロ</text>
      `);

    // =========================================================================
    // PHASE 19D — MAINBOARD ULTRA-AUDIT (+6: M55–M60)
    // =========================================================================
    case 'mb_rf_shield_4screws':
      return wrap(`
        <rect x="20" y="22" width="104" height="64" rx="4" fill="#15803d" stroke="#166534"/>
        <rect x="30" y="30" width="84" height="48" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="32" cy="32" r="5" fill="#eab308" stroke="#713f12"/>
        <circle cx="112" cy="32" r="5" fill="#eab308" stroke="#713f12"/>
        <circle cx="32" cy="76" r="5" fill="#eab308" stroke="#713f12"/>
        <circle cx="112" cy="76" r="5" fill="#eab308" stroke="#713f12"/>
        <text x="48" y="56" font-size="5.8" fill="#1e293b">RFシールド枠</text>
        <text x="12" y="112" font-size="6.4" fill="#334155">4隅M1.7ねじ＋金ボス座が6GHz帯EMI漏洩を-40dB遮蔽</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0f172a">RFシールド4点接地ねじ＆ボス</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・Kolari A1 II / A7R VI分解実測部位</text>
        <text x="144" y="60" font-size="6.1" fill="#0f172a">・接地抵抗&lt;2mΩで高周波電波漏れ遮断</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・12層HDI基板の反り防止アンカー兼務</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・放熱圧着とEMIシールドを同時確保</text>
      `);

    case 'mb_card_detect_heartcam':
      return wrap(`
        <rect x="20" y="22" width="104" height="64" rx="4" fill="#e2e8f0" stroke="#475569"/>
        <path d="M58,42 C58,34 46,34 46,44 C46,56 62,64 62,70 C62,64 78,56 78,44 C78,34 66,34 66,42 Z" fill="none" stroke="#dc2626" stroke-width="2.2"/>
        <circle cx="62" cy="48" r="3.5" fill="#1e293b"/>
        <line x1="94" y1="28" x2="94" y2="78" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="26" y="34" width="10" height="22" rx="2" fill="#eab308"/>
        <text x="86" y="84" font-size="5.4" fill="#0369a1">排出バネ</text>
        <text x="20" y="74" font-size="5.4" fill="#92400e">CD/WP接点</text>
        <text x="12" y="112" font-size="6.4" fill="#b45309">ハートカム溝でプッシュ排出＆5ms先行検知でデータ保護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#92400e">カード検出＆ハートカム排出</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・ノック式と同じハート溝ロック/排出</text>
        <text x="144" y="60" font-size="6.1" fill="#b45309">・抜去を5ms先行検知し活線データ保護</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・SD書込保護(WP)リーフ接点も内蔵</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・CFexpress 70°C発熱に耐えるLCP枠</text>
      `);

    case 'mb_io_lowcap_esd_chokes':
      return wrap(`
        <rect x="18" y="36" width="26" height="32" rx="3" fill="#94a3b8" stroke="#334155"/>
        <line x1="44" y1="44" x2="124" y2="44" stroke="#0284c7" stroke-width="2"/>
        <line x1="44" y1="60" x2="124" y2="60" stroke="#0284c7" stroke-width="2"/>
        <rect x="56" y="38" width="22" height="28" rx="2" fill="#fee2e2" stroke="#dc2626"/>
        <rect x="88" y="38" width="24" height="28" rx="2" fill="#e2e8f0" stroke="#475569"/>
        <text x="21" y="54" font-size="5.5" fill="#0f172a">HDMI</text>
        <text x="59" y="54" font-size="5.4" fill="#991b1b">0.2pF</text>
        <text x="90" y="54" font-size="5.4" fill="#1e293b">CMC</text>
        <text x="12" y="112" font-size="6.4" fill="#b91c1c">0.2pF超低容量TVS＋チョークが15GHz通過＆±15kV雷撃遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#991b1b">超低容量ESD＆CMCフィルタ</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・寄生容量≤0.2pFで48Gbps FRL通過</text>
        <text x="144" y="60" font-size="6.1" fill="#b91c1c">・気中±15kVのケーブル静電気を吸収</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・コモンモード雑音をWi-Fi帯-25dB減衰</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・直線フロースルーで100Ω整合維持</text>
      `);

    case 'mb_bga_underfill_fiducials':
      return wrap(`
        <rect x="26" y="24" width="92" height="24" rx="3" fill="#1e293b"/>
        <path d="M18,62 L26,48 L118,48 L126,62 Z" fill="#f59e0b" opacity="0.55" stroke="#b45309"/>
        <circle cx="40" cy="55" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="56" cy="55" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="72" cy="55" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="88" cy="55" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="104" cy="55" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <rect x="16" y="62" width="112" height="16" rx="2" fill="#15803d"/>
        <circle cx="26" cy="70" r="3" fill="#facc15"/>
        <text x="48" y="38" font-size="5.8" fill="#ffffff">BIONZ XR BGA</text>
        <text x="40" y="92" font-size="5.6" fill="#92400e">毛細管アンダーフィル＋金フィデューシャル</text>
        <text x="12" y="112" font-size="6.4" fill="#b45309">毛細管樹脂が0.35mmはんだ粒を包み落下＆熱寿命を約10倍</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#92400e">BGAアンダーフィル＆基準点</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・チップ底面の隙間をシリカ樹脂で充填</text>
        <text x="144" y="60" font-size="6.1" fill="#b45309">・角はんだボールの落下割れ＆熱疲労0</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・φ1mm金AOIマークが±15μm自動実装</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・8K録画の長年熱サイクルに完全耐久</text>
      `);

    case 'mb_ina_fuel_gauge_ic':
      return wrap(`
        <rect x="18" y="44" width="28" height="22" rx="3" fill="#334155"/>
        <rect x="54" y="48" width="22" height="14" rx="2" fill="#b67b3d" stroke="#78350f"/>
        <rect x="86" y="36" width="38" height="36" rx="3" fill="#0284c7" stroke="#0369a1"/>
        <line x1="46" y1="55" x2="54" y2="55" stroke="#0f172a" stroke-width="2"/>
        <line x1="76" y1="55" x2="86" y2="55" stroke="#0f172a" stroke-width="2"/>
        <text x="20" y="57" font-size="5.4" fill="#ffffff">FZ100</text>
        <text x="57" y="57" font-size="5.4" fill="#ffffff">5mΩ</text>
        <text x="90" y="52" font-size="5.5" fill="#ffffff">INA+残量</text>
        <text x="92" y="63" font-size="5.6" fill="#bae6fd">残 47%</text>
        <text x="12" y="112" font-size="6.4" fill="#0369a1">5mΩシャント電流積算(クーロン計)が1%刻みの残量を算出</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#0369a1">4ch INA電流計＆残量ゲージ</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・5mΩ精密シャントで消費電流を積算</text>
        <text x="144" y="60" font-size="6.1" fill="#0284c7">・温度＆劣化補正で氷点下も1%正確</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・ISP/レンズ/IBIS 4系統の異常電流監視</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・NP-FZ100の情報端子とリアルタイム連携</text>
      `);

    case 'mb_5a_fuse_rev_mosfet':
      return wrap(`
        <rect x="18" y="44" width="38" height="22" rx="3" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.6"/>
        <rect x="18" y="44" width="8" height="22" fill="#cbd5e1"/>
        <rect x="48" y="44" width="8" height="22" fill="#cbd5e1"/>
        <line x1="26" y1="55" x2="48" y2="55" stroke="#dc2626" stroke-width="1.8"/>
        <rect x="70" y="40" width="22" height="30" rx="2" fill="#1e293b"/>
        <rect x="98" y="40" width="22" height="30" rx="2" fill="#1e293b"/>
        <line x1="56" y1="55" x2="70" y2="55" stroke="#0f172a" stroke-width="2"/>
        <line x1="92" y1="55" x2="98" y2="55" stroke="#0f172a" stroke-width="2"/>
        <text x="27" y="51" font-size="5.5" fill="#991b1b">5A</text>
        <text x="74" y="57" font-size="5.2" fill="#ffffff">FET1</text>
        <text x="102" y="57" font-size="5.2" fill="#ffffff">FET2</text>
        <text x="12" y="112" font-size="6.4" fill="#b91c1c">5A高速ヒューズ＋8mΩ逆極性MOSFETが全基板を&lt;50μs防護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="31" font-size="7.0" font-weight="bold" fill="#991b1b">5A主ヒューズ＆逆接続保護段</text>
        <text x="144" y="46" font-size="6.1" fill="#334155">・アルミナ封止5A高速遮断チップヒューズ</text>
        <text x="144" y="60" font-size="6.1" fill="#b91c1c">・逆極性・過電圧を50μs未満で電子遮断</text>
        <text x="144" y="74" font-size="6.1" fill="#334155">・通常効率99.7%(R_DS=8mΩ極低ロス)</text>
        <text x="144" y="88" font-size="6.1" fill="#475569">・USB-PDと電池の無瞬断切替も制御</text>
      `);

    default:
      return null;
  }
}
