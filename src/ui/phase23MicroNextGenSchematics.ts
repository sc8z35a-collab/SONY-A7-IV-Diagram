import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 23 Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (25 diagrams):
 *   - Next-Gen Photodiode & Pixel Nanoscale Anatomy (M51–M75 -> 75 total micro layers)
 * Every text element is strictly calibrated inside x ∈ [6, 310] (zero overflow!).
 */
export function renderPhase23MicroNextGenSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'micro_mpcr_color_router':
      return wrapSvg(`
        <line x1="68" y1="6" x2="68" y2="26" stroke="#f59e0b" stroke-width="2.4"/>
        <text x="68" y="13" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#b45309">白い光(RGB混合)</text>
        <rect x="24" y="28" width="12" height="26" rx="1.5" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="44" y="28" width="18" height="26" rx="1.5" fill="#7dd3fc" stroke="#0284c7"/>
        <rect x="70" y="28" width="14" height="26" rx="1.5" fill="#38bdf8" stroke="#0284c7"/>
        <rect x="92" y="28" width="20" height="26" rx="1.5" fill="#bae6fd" stroke="#0284c7"/>
        <path d="M52 54 L30 72" stroke="#dc2626" stroke-width="2"/>
        <path d="M68 54 L68 72" stroke="#16a34a" stroke-width="2"/>
        <path d="M84 54 L106 72" stroke="#2563eb" stroke-width="2"/>
        <rect x="14" y="73" width="32" height="15" rx="2" fill="#fee2e2" stroke="#dc2626"/>
        <text x="30" y="83" text-anchor="middle" font-size="7" font-weight="bold" fill="#b91c1c">赤PD</text>
        <rect x="52" y="73" width="32" height="15" rx="2" fill="#dcfce7" stroke="#16a34a"/>
        <text x="68" y="83" text-anchor="middle" font-size="7" font-weight="bold" fill="#15803d">緑PD</text>
        <rect x="90" y="73" width="32" height="15" rx="2" fill="#dbeafe" stroke="#2563eb"/>
        <text x="106" y="83" text-anchor="middle" font-size="7" font-weight="bold" fill="#1d4ed8">青PD</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#0369a1">M51 メタフォトニック・ルーター</text>
        <text x="144" y="43" font-size="7.1" fill="#0c4a6e">・透明SiNナノ柱が光の進路を曲げる</text>
        <text x="144" y="56" font-size="7.1" fill="#0c4a6e">・色フィルターの67%吸収ロスを解消</text>
        <text x="144" y="69" font-size="7.1" fill="#0c4a6e">・暗所の光利用効率が約1.5〜2倍に</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">光を捨てずに「赤は左・緑は中・青は右」へ振り分ける魔法の透明ナノ柱</text>
      `);

    case 'micro_polarsens_wiregrid':
      return wrapSvg(`
        <rect x="14" y="16" width="52" height="34" rx="3" fill="#f1f5f9" stroke="#334155"/>
        <path d="M20 24 H60 M20 33 H60 M20 42 H60" stroke="#0f172a" stroke-width="1.6"/>
        <text x="40" y="22" text-anchor="middle" font-size="6.4" fill="#2563eb">0°</text>
        <rect x="70" y="16" width="52" height="34" rx="3" fill="#f1f5f9" stroke="#334155"/>
        <path d="M78 46 L108 20 M88 46 L116 22 M74 36 L94 20" stroke="#0f172a" stroke-width="1.6"/>
        <text x="96" y="22" text-anchor="middle" font-size="6.4" fill="#2563eb">45°</text>
        <rect x="14" y="54" width="52" height="34" rx="3" fill="#f1f5f9" stroke="#334155"/>
        <path d="M26 58 V84 M40 58 V84 M54 58 V84" stroke="#0f172a" stroke-width="1.6"/>
        <text x="40" y="62" text-anchor="middle" font-size="6.4" fill="#2563eb">90°</text>
        <rect x="70" y="54" width="52" height="34" rx="3" fill="#f1f5f9" stroke="#334155"/>
        <path d="M78 58 L108 84 M88 58 L116 82 M74 68 L94 84" stroke="#0f172a" stroke-width="1.6"/>
        <text x="96" y="62" text-anchor="middle" font-size="6.4" fill="#2563eb">135°</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0f172a">M52 4方位オンチップ偏光子</text>
        <text x="142" y="43" font-size="7.1" fill="#334155">・2×2画素に4角度の極細金属すだれ</text>
        <text x="142" y="56" font-size="7.1" fill="#334155">・150nmピッチで光の揺れ向きを選別</text>
        <text x="142" y="69" font-size="7.1" fill="#334155">・ガラス反射除去や歪み検査を1発で</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">4角度のミクロなブラインドで水面やガラスのギラギラ反射を魔法のように消去</text>
      `);

    case 'micro_airgap_optical_grid':
      return wrapSvg(`
        <rect x="14" y="20" width="44" height="58" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <text x="36" y="46" text-anchor="middle" font-size="7" fill="#15803d">緑CFA</text>
        <text x="36" y="58" text-anchor="middle" font-size="6.5" fill="#15803d">n≈1.60</text>
        <rect x="61" y="18" width="14" height="62" rx="3" fill="#ffffff" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="68" y="52" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0284c7">空気</text>
        <text x="68" y="62" text-anchor="middle" font-size="6" fill="#0284c7">n=1.0</text>
        <rect x="78" y="20" width="46" height="58" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="101" y="46" text-anchor="middle" font-size="7" fill="#b91c1c">赤CFA</text>
        <path d="M24 10 L60 44 L36 84" fill="none" stroke="#ea580c" stroke-width="2"/>
        <polygon points="36,84 35,76 42,79" fill="#ea580c"/>
        <text x="48" y="88" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#c2410c">100%全反射!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0e7490">M53 エアギャップ光学壁(Airgrid)</text>
        <text x="142" y="43" font-size="7.1" fill="#155e75">・金属の壁のかわりに「空気の壁」</text>
        <text x="142" y="56" font-size="7.1" fill="#155e75">・屈折率差で斜め光を無損失で跳ね返す</text>
        <text x="142" y="69" font-size="7.1" fill="#155e75">・色混じり防止と明るさ向上を両立</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0e7490">空気の壁が鏡のように光を100%全反射し、隣へ漏らさず自分のPDへ導く</text>
      `);

    case 'micro_inner_sublens_waveguide':
      return wrapSvg(`
        <path d="M22 20 Q68 6 114 20 Z" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="68" y="18" text-anchor="middle" font-size="6.4" fill="#0369a1">1段目 マイクロレンズ</text>
        <path d="M36 40 Q68 28 100 40 Z" fill="#a5f3fc" stroke="#0891b2" stroke-width="1.4"/>
        <text x="68" y="38" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0e7490">2段目 インナーレンズ</text>
        <polygon points="36,41 100,41 84,74 52,74" fill="#cffafe" stroke="#0891b2" stroke-width="1.4"/>
        <text x="68" y="60" text-anchor="middle" font-size="6.6" fill="#0e7490">SiN光導波路(n≈2.0)</text>
        <rect x="44" y="75" width="48" height="12" rx="2" fill="#1e3a8a"/>
        <text x="68" y="84" text-anchor="middle" font-size="6.6" fill="#fff">Si フォトダイオード</text>
        <path d="M26 10 L46 44 L58 75 M110 10 L90 44 L78 75" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#0369a1">M54 2段集光＆SiN光導波路</text>
        <text x="142" y="43" font-size="7.1" fill="#0c4a6e">・内側のミニ虫メガネで光をもう1段絞る</text>
        <text x="142" y="56" font-size="7.1" fill="#0c4a6e">・光ファイバー漏斗でPD中央へ直通</text>
        <text x="142" y="69" font-size="7.1" fill="#0c4a6e">・F1.2の急な斜め光でも周辺減光ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">2枚目のミニレンズと透明な光のじょうごで斜め光も確実に中央へゴール</text>
      `);

    case 'micro_opf_organic_film':
      return wrapSvg(`
        <rect x="16" y="18" width="108" height="10" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="70" y="25.5" text-anchor="middle" font-size="6.5" fill="#0369a1">透明ITO上部電極</text>
        <rect x="16" y="30" width="108" height="20" rx="2" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="70" y="43" text-anchor="middle" font-size="7.1" font-weight="bold" fill="#6d28d9">1階: 有機OPF(RGB撮像)</text>
        <rect x="16" y="54" width="108" height="28" rx="2" fill="#1e293b" stroke="#0f172a"/>
        <text x="70" y="71" text-anchor="middle" font-size="7.1" fill="#f43f5e">地下: Si層(赤外iToF測距)</text>
        <path d="M40 8 L40 38" stroke="#22c55e" stroke-width="2"/>
        <path d="M98 8 L98 64" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="40" y="14" text-anchor="middle" font-size="6" fill="#15803d">可視光</text>
        <text x="98" y="14" text-anchor="middle" font-size="6" fill="#be123c">赤外線貫通</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#5b21b6">M55 2階建て有機光電変換(OPF)</text>
        <text x="142" y="43" font-size="7.1" fill="#4c1d95">・上の極薄有機フィルムでカラー撮影</text>
        <text x="142" y="56" font-size="7.1" fill="#4c1d95">・通り抜けた赤外線で下のSiが3D測距</text>
        <text x="142" y="69" font-size="7.1" fill="#4c1d95">・色と距離のズレ0! Sony IEDM 2024</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#5b21b6">シリコンの屋根に有機フィルムセンサーを重ね、カラー写真と3D距離を同時記録</text>
      `);

    case 'micro_inverted_pyramid_array':
      return wrapSvg(`
        <rect x="14" y="34" width="112" height="52" rx="3" fill="#1e293b" stroke="#0f172a"/>
        <polygon points="18,34 38,52 58,34" fill="#f8fafc" stroke="#38bdf8" stroke-width="1.2"/>
        <polygon points="58,34 78,52 98,34" fill="#f8fafc" stroke="#38bdf8" stroke-width="1.2"/>
        <polygon points="98,34 114,48 126,34" fill="#f8fafc" stroke="#38bdf8" stroke-width="1.2"/>
        <path d="M46 10 L46 44 L76 74 L104 56 L116 80" fill="none" stroke="#ef4444" stroke-width="2"/>
        <text x="70" y="22" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#dc2626">赤い光・赤外線(650–940nm)</text>
        <text x="70" y="80" text-anchor="middle" font-size="6.8" fill="#fca5a5">斜めに曲がり光路長2.5倍!</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#b91c1c">M56 逆ピラミッド回折アレイ</text>
        <text x="144" y="43" font-size="7.1" fill="#7f1d1d">・54.7°の逆四角錐をシリコン入口に彫刻</text>
        <text x="144" y="56" font-size="7.1" fill="#7f1d1d">・逃げやすい赤/赤外線を中でジグザグ反射</text>
        <text x="144" y="69" font-size="7.1" fill="#7f1d1d">・STARVIS 2の驚異的暗視感度の秘密</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#b91c1c">逆さピラミッドの斜面で赤い光をピンボールのように閉じ込めて吸収率アップ</text>
      `);

    case 'micro_delta_doped_monolayer':
      return wrapSvg(`
        <rect x="14" y="18" width="112" height="14" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="70" y="28" text-anchor="middle" font-size="6.6" fill="#0369a1">裏面Si表面(青・UVが浅く吸収)</text>
        <line x1="14" y1="36" x2="126" y2="36" stroke="#a855f7" stroke-width="3.2"/>
        <circle cx="28" cy="36" r="3" fill="#fff" stroke="#7e22ce"/>
        <circle cx="48" cy="36" r="3" fill="#fff" stroke="#7e22ce"/>
        <circle cx="68" cy="36" r="3" fill="#fff" stroke="#7e22ce"/>
        <circle cx="88" cy="36" r="3" fill="#fff" stroke="#7e22ce"/>
        <circle cx="108" cy="36" r="3" fill="#fff" stroke="#7e22ce"/>
        <rect x="14" y="40" width="112" height="44" rx="2" fill="#1e293b"/>
        <path d="M50 42 L50 74 M86 42 L86 74" stroke="#38bdf8" stroke-width="2"/>
        <polygon points="50,74 46,66 54,66" fill="#38bdf8"/>
        <polygon points="86,74 82,66 90,66" fill="#38bdf8"/>
        <text x="70" y="58" text-anchor="middle" font-size="6.8" fill="#e9d5ff">原子1層ホウ素が電子を</text>
        <text x="70" y="68" text-anchor="middle" font-size="6.8" fill="#38bdf8">100%奥のPDへ押し戻す</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#7e22ce">M57 MBE原子1層デルタドープ</text>
        <text x="144" y="43" font-size="7.1" fill="#581c87">・表面1.5nm下にホウ素を原子1層だけ配置</text>
        <text x="144" y="56" font-size="7.1" fill="#581c87">・表面の電子消失(デッドゾーン)を消去</text>
        <text x="144" y="69" font-size="7.1" fill="#581c87">・NASA宇宙望遠鏡級 IQE≈100%</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#7e22ce">原子1個分の極薄ホウ素バリアが、浅い所で生まれた青い光の電子を100%救出</text>
      `);

    case 'micro_thick_pepi_depletion':
      return wrapSvg(`
        <rect x="14" y="16" width="112" height="70" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="70" y="28" text-anchor="middle" font-size="7" font-weight="bold" fill="#1d4ed8">厚膜P型エピ層 (3〜6.6μm)</text>
        <path d="M36 34 V78 M70 34 V78 M104 34 V78" stroke="#3b82f6" stroke-width="1.6" stroke-dasharray="3 2"/>
        <polygon points="36,78 32,71 40,71" fill="#2563eb"/>
        <polygon points="70,78 66,71 74,71" fill="#2563eb"/>
        <polygon points="104,78 100,71 108,71" fill="#2563eb"/>
        <circle cx="36" cy="40" r="3.5" fill="#2563eb"/><text x="48" y="43" font-size="6.4" fill="#1d4ed8">青(浅)</text>
        <circle cx="70" cy="54" r="3.5" fill="#16a34a"/><text x="82" y="57" font-size="6.4" fill="#15803d">緑(中)</text>
        <circle cx="104" cy="68" r="3.5" fill="#dc2626"/><text x="90" y="72" text-anchor="end" font-size="6.4" fill="#b91c1c">赤(深)</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#1d4ed8">M58 厚膜P-Epi＆完全空乏空間</text>
        <text x="144" y="43" font-size="7.1" fill="#1e3a8a">・超純度・高抵抗Siで層全体が空乏化</text>
        <text x="144" y="56" font-size="7.1" fill="#1e3a8a">・奥まで潜った赤い光の電子も真っすぐ回収</text>
        <text x="144" y="69" font-size="7.1" fill="#1e3a8a">・横の迷子を防ぎ高感度と解像感を両立</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#1d4ed8">分厚い超純度シリコン全体が電子エレベーターになり赤い光もシャープに吸収</text>
      `);

    case 'micro_graded_pd_doping':
      return wrapSvg(`
        <rect x="14" y="18" width="36" height="64" rx="2" fill="#dbeafe" stroke="#60a5fa"/>
        <text x="32" y="34" text-anchor="middle" font-size="7" font-weight="bold" fill="#1e40af">N1(薄)</text>
        <rect x="50" y="18" width="36" height="64" rx="2" fill="#93c5fd" stroke="#3b82f6"/>
        <text x="68" y="34" text-anchor="middle" font-size="7" font-weight="bold" fill="#1e3a8a">N2(中)</text>
        <rect x="86" y="18" width="38" height="64" rx="2" fill="#3b82f6" stroke="#1d4ed8"/>
        <text x="105" y="34" text-anchor="middle" font-size="7" font-weight="bold" fill="#fff">N3(濃)</text>
        <path d="M22 48 L116 74" stroke="#facc15" stroke-width="2.6"/>
        <polygon points="118,75 109,77 112,69" fill="#eab308"/>
        <circle cx="38" cy="52" r="3.5" fill="#fef08a" stroke="#ca8a04"/>
        <circle cx="72" cy="61" r="3.5" fill="#fef08a" stroke="#ca8a04"/>
        <text x="68" y="78" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0f172a">電位の滑り台(&gt;400V/cm)</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#a16207">M59 多段勾配N1/N2/N3 PD</text>
        <text x="142" y="43" font-size="7.1" fill="#713f12">・3段階の濃さ違いで電気の下り坂を形成</text>
        <text x="142" y="56" font-size="7.1" fill="#713f12">・電子が10ナノ秒未満で出口へ滑り落ちる</text>
        <text x="142" y="69" font-size="7.1" fill="#713f12">・取り残しゼロ＝残像(Lag)完全消去</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#a16207">フォトダイオード内部の3段グラデーションが電子の滑り台になり残像をゼロへ</text>
      `);

    case 'micro_dual_depth_pr_fdti':
      return wrapSvg(`
        <rect x="14" y="18" width="112" height="68" rx="3" fill="#f1f5f9" stroke="#64748b"/>
        <rect x="16" y="18" width="8" height="68" fill="#1e293b"/>
        <rect x="116" y="18" width="8" height="68" fill="#1e293b"/>
        <rect x="66" y="18" width="8" height="36" fill="#0284c7"/>
        <text x="44" y="40" text-anchor="middle" font-size="7" font-weight="bold" fill="#15803d">緑PD-A</text>
        <text x="96" y="40" text-anchor="middle" font-size="7" font-weight="bold" fill="#15803d">緑PD-B</text>
        <path d="M46 68 Q70 76 94 68" fill="none" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="70" y="64" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#c2410c">下部で電荷共有!</text>
        <text x="20" y="96" text-anchor="middle" font-size="6" fill="#0f172a">完全壁</text>
        <text x="70" y="96" text-anchor="middle" font-size="6" fill="#0369a1">部分開口壁</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#0f172a">M60 デュアル深度／PR-FDTI</text>
        <text x="144" y="43" font-size="7.1" fill="#334155">・別色の間＝床まで完全貫通の壁</text>
        <text x="144" y="56" font-size="7.1" fill="#334155">・同色ペア間＝下部を開けた浅い壁</text>
        <text x="144" y="69" font-size="7.1" fill="#334155">・白点ノイズ削減＆高飽和(IISW 2025)</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">外周は完全防音壁、同色の相棒間は通り道を開ける賢いハイブリッド隔壁</text>
      `);

    case 'micro_plad_boron_liner':
      return wrapSvg(`
        <rect x="14" y="24" width="38" height="60" fill="#cbd5e1" stroke="#475569"/>
        <rect x="88" y="24" width="38" height="60" fill="#cbd5e1" stroke="#475569"/>
        <rect x="52" y="24" width="36" height="58" fill="#faf5ff"/>
        <path d="M52 24 V82 H88 V24" fill="none" stroke="#9333ea" stroke-width="4.5"/>
        <circle cx="70" cy="36" r="4" fill="#c084fc"/><circle cx="64" cy="52" r="3.5" fill="#c084fc"/>
        <circle cx="76" cy="64" r="3.5" fill="#c084fc"/>
        <text x="70" y="18" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#7e22ce">B₂H₆プラズマの霧</text>
        <text x="70" y="76" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#6b21a8">底まで100%均一!</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#7e22ce">M61 PLADホウ素側壁ライナー</text>
        <text x="144" y="43" font-size="7.1" fill="#581c87">・細深い溝(比率30:1超)をプラズマ被覆</text>
        <text x="144" y="56" font-size="7.1" fill="#581c87">・垂直壁の底までP⁺バリアを均一コート</text>
        <text x="144" y="69" font-size="7.1" fill="#581c87">・暗闇の白い点ノイズ(白点)を完全封鎖</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#7e22ce">細い井戸の底までプラズマの霧でホウ素を塗り、壁から湧く白点ノイズを封印</text>
      `);

    case 'micro_split_pd_lfm_hdr':
      return wrapSvg(`
        <rect x="14" y="18" width="70" height="68" rx="4" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
        <text x="49" y="44" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#1d4ed8">大PD (SP1)</text>
        <text x="49" y="58" text-anchor="middle" font-size="6.6" fill="#1e40af">暗所・夜景担当</text>
        <text x="49" y="70" text-anchor="middle" font-size="6.4" fill="#2563eb">超高感度</text>
        <rect x="90" y="46" width="34" height="40" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
        <text x="107" y="62" text-anchor="middle" font-size="7" font-weight="bold" fill="#b45309">小PD</text>
        <text x="107" y="74" text-anchor="middle" font-size="6.2" fill="#92400e">逆光/LED</text>
        <text x="107" y="34" text-anchor="middle" font-size="6.6" fill="#d97706">同時露光!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#92400e">M62 大小スプリットPD HDR</text>
        <text x="142" y="43" font-size="7.1" fill="#78350f">・1画素に大バケツと小コップを同居</text>
        <text x="142" y="56" font-size="7.1" fill="#78350f">・1回シャッターで130dB超広階調</text>
        <text x="142" y="69" font-size="7.1" fill="#78350f">・LED信号点滅の消え(フリッカー)防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#92400e">暗い場所は大きな受光部、太陽やLEDは小さな受光部が同時に受け持つ1発HDR</text>
      `);

    case 'micro_twisted_af_pd':
      return wrapSvg(`
        <rect x="16" y="16" width="46" height="24" rx="2" fill="#bfdbfe" stroke="#2563eb"/>
        <text x="39" y="31" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#1d4ed8">上分割A</text>
        <rect x="16" y="42" width="46" height="24" rx="2" fill="#fbcfe8" stroke="#db2777"/>
        <text x="39" y="57" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#be185d">下分割B</text>
        <path d="M64 28 C82 28 74 62 90 62" fill="none" stroke="#2563eb" stroke-width="2.2"/>
        <path d="M64 54 C82 54 74 24 90 24" fill="none" stroke="#db2777" stroke-width="2.2"/>
        <text x="77" y="80" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#7c3aed">90°立体ねじり</text>
        <rect x="92" y="16" width="32" height="50" rx="2" fill="#f1f5f9" stroke="#475569"/>
        <text x="108" y="34" text-anchor="middle" font-size="6.5" fill="#be185d">出口B</text>
        <text x="108" y="56" text-anchor="middle" font-size="6.5" fill="#1d4ed8">出口A</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fdf2f8" stroke="#db2777"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#9d174d">M63 3DツイステッドAF-PD</text>
        <text x="142" y="43" font-size="7.1" fill="#831843">・入口は上下分割、出口へ90°ねじれ接続</text>
        <text x="142" y="56" font-size="7.1" fill="#831843">・縦線も水平線も360°クロスAFで即合焦</text>
        <text x="142" y="69" font-size="7.1" fill="#831843">・画質ロスゼロ(Canon IISW 2025)</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#9d174d">電子の通り道を立体的に90°ねじり、横縞や水平線でも迷わない全方向AFを実現</text>
      `);

    case 'micro_backside_vsub_ring':
      return wrapSvg(`
        <rect x="14" y="16" width="112" height="12" rx="2" fill="#dc2626"/>
        <text x="70" y="24.5" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">裏面電極リング (V_sub = −5V)</text>
        <rect x="14" y="30" width="112" height="44" rx="2" fill="#f1f5f9" stroke="#64748b"/>
        <path d="M36 33 V70 M70 33 V70 M104 33 V70" stroke="#2563eb" stroke-width="2"/>
        <polygon points="36,71 32,64 40,64" fill="#2563eb"/>
        <polygon points="70,71 66,64 74,64" fill="#2563eb"/>
        <polygon points="104,71 100,64 108,64" fill="#2563eb"/>
        <text x="70" y="54" text-anchor="middle" font-size="6.7" font-weight="bold" fill="#1e40af">電子を真下へ真っすぐ押す!</text>
        <rect x="14" y="76" width="112" height="12" rx="2" fill="#1e3a8a"/>
        <text x="70" y="84.5" text-anchor="middle" font-size="6.5" fill="#fff">表面N型PD (プラス側)</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#b91c1c">M64 裏面V_sub逆バイアス枠</text>
        <text x="144" y="43" font-size="7.1" fill="#7f1d1d">・裏面全面へ均一にマイナス電圧を印加</text>
        <text x="144" y="56" font-size="7.1" fill="#7f1d1d">・反発力で電子の横ブレ(ボケ)を阻止</text>
        <text x="144" y="69" font-size="7.1" fill="#7f1d1d">・厚膜Siでもカミソリ解像度(MTF↑)</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#b91c1c">裏面のマイナス電圧で電子を真下へ一直線に落とし、隣への滲みを防ぐ電極枠</text>
      `);

    case 'micro_tg_gate_oxide':
      return wrapSvg(`
        <rect x="34" y="14" width="72" height="16" rx="2" fill="#f59e0b" stroke="#b45309"/>
        <text x="70" y="24.5" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">転送ゲート電極 (TG)</text>
        <rect x="34" y="32" width="72" height="8" rx="1" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
        <text x="70" y="38.5" text-anchor="middle" font-size="6" font-weight="bold" fill="#0369a1">7nm極薄ガラス酸化膜</text>
        <rect x="14" y="42" width="112" height="44" rx="3" fill="#e2e8f0" stroke="#475569"/>
        <path d="M22 64 Q70 58 118 64" fill="none" stroke="#2563eb" stroke-width="3"/>
        <polygon points="120,64 112,60 112,68" fill="#2563eb"/>
        <text x="70" y="54" text-anchor="middle" font-size="6.4" fill="#dc2626">表面キズに触れない!</text>
        <text x="70" y="77" text-anchor="middle" font-size="6.7" font-weight="bold" fill="#1d4ed8">地下トンネル(埋込チャネル)</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#0369a1">M65 7nmゲート膜＆地下通路</text>
        <text x="144" y="43" font-size="7.1" fill="#0c4a6e">・髪の毛1万分の1の極薄高耐圧ガラス膜</text>
        <text x="144" y="56" font-size="7.1" fill="#0c4a6e">・−1.2V⇔+3.0Vで水門を超高速開閉</text>
        <text x="144" y="69" font-size="7.1" fill="#0c4a6e">・地中トンネル通過でノイズ・残像ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#0369a1">極薄ガラス膜と地中トンネルにより、電子を表面のキズに触れさせず無傷で転送</text>
      `);

    case 'micro_pump_gate_qis':
      return wrapSvg(`
        <rect x="14" y="34" width="40" height="48" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="34" y="60" text-anchor="middle" font-size="7" font-weight="bold" fill="#1d4ed8">PD</text>
        <polygon points="56,50 84,36 84,82 56,82" fill="#e0e7ff" stroke="#4f46e5"/>
        <text x="70" y="72" text-anchor="middle" font-size="6.2" fill="#3730a3">階段障壁</text>
        <rect x="92" y="22" width="26" height="60" rx="3" fill="#fef08a" stroke="#ca8a04" stroke-width="1.6"/>
        <line x1="94" y1="40" x2="116" y2="40" stroke="#dc2626" stroke-width="1.5"/>
        <text x="105" y="34" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#b91c1c">+423μV</text>
        <text x="105" y="60" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#854d0e">極細FD</text>
        <text x="105" y="72" text-anchor="middle" font-size="6" fill="#854d0e">0.38 fF</text>
        <path d="M40 50 Q70 26 98 40" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="68" y="20" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#dc2626">電子1個で水位急上昇!</text>
        <rect x="130" y="14" width="180" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="138" y="29" font-size="7.8" font-weight="bold" fill="#854d0e">M66 ポンプゲート単一光子(QIS)</text>
        <text x="138" y="43" font-size="7.1" fill="#713f12">・受け皿を極細試験管並み(0.38fF)に縮小</text>
        <text x="138" y="56" font-size="7.1" fill="#713f12">・変換効率423μV/e⁻(従来の約6倍!)</text>
        <text x="138" y="69" font-size="7.1" fill="#713f12">・常温ノイズ0.19e⁻で光子1粒ずつ計数</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#854d0e">極細試験管のような超小容量FDで、光たった1粒の到着をハッキリ数える量子構造</text>
      `);

    case 'micro_gs_storage_diode':
      return wrapSvg(`
        <rect x="14" y="36" width="38" height="46" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="33" y="62" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#1d4ed8">PD</text>
        <rect x="64" y="18" width="44" height="10" rx="2" fill="#0f172a"/>
        <text x="86" y="25.5" text-anchor="middle" font-size="6.3" fill="#f8fafc">厚肉W遮光屋根</text>
        <rect x="66" y="36" width="40" height="46" rx="3" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        <text x="86" y="57" text-anchor="middle" font-size="7.1" font-weight="bold" fill="#fde047">暗室金庫</text>
        <text x="86" y="69" text-anchor="middle" font-size="6.4" fill="#cbd5e1">SD記憶部</text>
        <path d="M52 56 L66 56" stroke="#f59e0b" stroke-width="2.4"/>
        <text x="59" y="48" text-anchor="middle" font-size="6" font-weight="bold" fill="#b45309">TX1一斉</text>
        <path d="M106 56 L124 56" stroke="#22c55e" stroke-width="2"/>
        <text x="117" y="48" text-anchor="middle" font-size="6" fill="#15803d">TX2</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="140" y="29" font-size="7.8" font-weight="bold" fill="#0f172a">M67 GS遮光ストレージ(SD)</text>
        <text x="140" y="43" font-size="7.1" fill="#334155">・全画素「せーの」で隣の暗室金庫へ退避</text>
        <text x="140" y="56" font-size="7.1" fill="#334155">・遮光比1万〜10万倍(PLS&lt;−85dB)</text>
        <text x="140" y="69" font-size="7.1" fill="#334155">・プロペラや打球も歪み完全ゼロ!</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#334155">全画素同時に真っ暗な一時保管金庫へ電子を預け、高速移動体の歪みを根絶</text>
      `);

    case 'micro_tcg_multistage_cap':
      return wrapSvg(`
        <rect x="14" y="50" width="24" height="34" rx="2" fill="#dbeafe" stroke="#2563eb"/>
        <text x="26" y="70" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#1d4ed8">HCG</text>
        <text x="26" y="44" text-anchor="middle" font-size="6" fill="#1d4ed8">お猪口</text>
        <rect x="46" y="36" width="32" height="48" rx="2" fill="#dcfce7" stroke="#16a34a"/>
        <text x="62" y="64" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#15803d">MCG</text>
        <text x="62" y="75" text-anchor="middle" font-size="6" fill="#15803d">(FC)</text>
        <text x="62" y="30" text-anchor="middle" font-size="6" fill="#15803d">コップ</text>
        <rect x="86" y="20" width="38" height="64" rx="2" fill="#fef3c7" stroke="#d97706"/>
        <text x="105" y="52" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#b45309">LCG</text>
        <text x="105" y="64" text-anchor="middle" font-size="6" fill="#92400e">(MOM EC)</text>
        <text x="105" y="15" text-anchor="middle" font-size="6" fill="#b45309">特大ジョッキ</text>
        <path d="M38 66 H46 M78 66 H86" stroke="#dc2626" stroke-width="2"/>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#92400e">M68 3段階TCG＋多段LOFIC</text>
        <text x="142" y="43" font-size="7.1" fill="#78350f">・光の強さで3サイズの器を自動切替</text>
        <text x="142" y="56" font-size="7.1" fill="#78350f">・中間のFC段がSNRノイズ段差を13dB改善</text>
        <text x="142" y="69" font-size="7.1" fill="#78350f">・暗部低ノイズ＆直射日光10万電子超</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#92400e">お猪口・コップ・特大ジョッキを瞬時に切替え、明暗の境目も滑らかなHDR画質</text>
      `);

    case 'micro_sf_drain_buried':
      return wrapSvg(`
        <rect x="34" y="16" width="68" height="14" rx="2" fill="#f59e0b" stroke="#b45309"/>
        <text x="68" y="25.5" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">大型SFゲート(広W×L)</text>
        <rect x="14" y="34" width="108" height="50" rx="3" fill="#f1f5f9" stroke="#475569"/>
        <rect x="18" y="38" width="22" height="22" rx="2" fill="#93c5fd" stroke="#2563eb"/>
        <text x="29" y="52" text-anchor="middle" font-size="6.8" fill="#1e3a8a">S</text>
        <rect x="96" y="38" width="22" height="22" rx="2" fill="#fca5a5" stroke="#dc2626"/>
        <text x="107" y="52" text-anchor="middle" font-size="6.8" fill="#7f1d1d">D最適化</text>
        <path d="M40 54 Q68 74 96 54" fill="none" stroke="#16a34a" stroke-width="2.6"/>
        <text x="68" y="75" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#15803d">地中迂回＝ノイズ激減!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="140" y="29" font-size="7.8" font-weight="bold" fill="#166534">M69 低雑音埋込SFアンプ</text>
        <text x="140" y="43" font-size="7.1" fill="#14532d">・画素内の超小型マイク増幅アンプ</text>
        <text x="140" y="56" font-size="7.1" fill="#14532d">・電流を表面キズから離し1/f・RTS低減</text>
        <text x="140" y="69" font-size="7.1" fill="#14532d">・ドレイン最適化で変換効率＆直線性↑</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#166534">増幅電流を地中ルートへ逃がすことで夜景の砂嵐やチラつきノイズを大幅削減</text>
      `);

    case 'micro_spad_avalanche_guard':
      return wrapSvg(`
        <rect x="14" y="24" width="112" height="58" rx="4" fill="#1e293b" stroke="#0f172a"/>
        <rect x="20" y="34" width="16" height="36" rx="4" fill="#38bdf8" opacity="0.5" stroke="#38bdf8"/>
        <rect x="104" y="34" width="16" height="36" rx="4" fill="#38bdf8" opacity="0.5" stroke="#38bdf8"/>
        <rect x="40" y="34" width="60" height="36" rx="4" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.6"/>
        <text x="70" y="48" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fef08a">雪崩増倍領域</text>
        <text x="70" y="60" text-anchor="middle" font-size="6.6" fill="#fca5a5">1光子→10⁶倍!</text>
        <path d="M70 8 L70 34" stroke="#facc15" stroke-width="2"/>
        <text x="70" y="17" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#b45309">光たった1粒</text>
        <text x="28" y="79" text-anchor="middle" font-size="5.8" fill="#7dd3fc">ガード</text>
        <text x="112" y="79" text-anchor="middle" font-size="5.8" fill="#7dd3fc">リング</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#991b1b">M70 SPAD雪崩接合＆ガード</text>
        <text x="144" y="43" font-size="7.1" fill="#7f1d1d">・光子1粒で電子が雪崩のように100万倍</text>
        <text x="144" y="56" font-size="7.1" fill="#7f1d1d">・丸いガードリングが角の誤爆を防止</text>
        <text x="144" y="69" font-size="7.1" fill="#7f1d1d">・クエンチ回路が数nsで鎮火＆即復帰</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#991b1b">光1粒を雪崩増倍でノイズ0のデジタル信号に変え、暗視カラー＆距離測定を実現</text>
      `);

    case 'micro_pixel_dps_edram':
      return wrapSvg(`
        <rect x="16" y="14" width="108" height="20" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="70" y="27" text-anchor="middle" font-size="7.1" font-weight="bold" fill="#1d4ed8">上層: 1画素フォトダイオード</text>
        <line x1="70" y1="34" x2="70" y2="44" stroke="#f59e0b" stroke-width="3"/>
        <text x="98" y="41" font-size="6.2" fill="#b45309">Cu-Cu直結</text>
        <rect x="16" y="44" width="52" height="40" rx="3" fill="#ede9fe" stroke="#7c3aed"/>
        <text x="42" y="61" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#5b21b6">画素専用</text>
        <text x="42" y="73" text-anchor="middle" font-size="6.5" fill="#5b21b6">ADC比較器</text>
        <rect x="72" y="44" width="52" height="40" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <text x="98" y="61" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#15803d">10-bit</text>
        <text x="98" y="73" text-anchor="middle" font-size="6.3" fill="#15803d">3T-eDRAM</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="142" y="29" font-size="7.8" font-weight="bold" fill="#5b21b6">M71 画素直下DPS＆eDRAM</text>
        <text x="142" y="43" font-size="7.1" fill="#4c1d95">・1画素ごとに専用レジ(ADC)とメモ帳</text>
        <text x="142" y="56" font-size="7.1" fill="#4c1d95">・全画素いっせいに真下で0/1デジタル化</text>
        <text x="142" y="69" font-size="7.1" fill="#4c1d95">・配線ノイズ激減＆120dB超並列HDR</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#5b21b6">順番待ちなし! 全画素の真下で同時にデジタル数値化＆記憶する3D積層頭脳</text>
      `);

    case 'micro_cms_multi_sampler':
      return wrapSvg(`
        <rect x="14" y="18" width="112" height="66" rx="4" fill="#f8fafc" stroke="#64748b"/>
        <path d="M22 66 L30 56 L38 68 L46 58 L54 64 L62 59" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="22" y1="62" x2="62" y2="62" stroke="#dc2626" stroke-width="1.6"/>
        <text x="42" y="78" text-anchor="middle" font-size="6.2" fill="#475569">リセットM回平均</text>
        <path d="M74 36 L82 28 L90 38 L98 29 L106 35 L116 30" fill="none" stroke="#93c5fd" stroke-width="1.5"/>
        <line x1="74" y1="33" x2="116" y2="33" stroke="#2563eb" stroke-width="1.8"/>
        <text x="95" y="48" text-anchor="middle" font-size="6.2" fill="#1d4ed8">信号M回平均</text>
        <text x="70" y="25" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#0f172a">ノイズ 1/√M に圧縮!</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#1d4ed8">M72 相関多重サンプリング(CMS)</text>
        <text x="144" y="43" font-size="7.1" fill="#1e3a8a">・同じ画素を4〜16回連打測定して平均</text>
        <text x="144" y="56" font-size="7.1" fill="#1e3a8a">・ランダム熱雑音だけが打ち消し合う</text>
        <text x="144" y="69" font-size="7.1" fill="#1e3a8a">・16回平均でノイズ1/4! 16bit暗部階調</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#1d4ed8">超高速で何回も測って平均を取ることで、本物の光を残しランダム雑音だけ消去</text>
      `);

    case 'micro_evs_log_change':
      return wrapSvg(`
        <rect x="14" y="18" width="112" height="66" rx="4" fill="#0f172a" stroke="#334155"/>
        <path d="M22 60 H46 L52 34 H82 L88 66 H118" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
        <line x1="52" y1="78" x2="52" y2="40" stroke="#22c55e" stroke-width="2.4"/>
        <text x="52" y="30" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#4ade80">+ON</text>
        <line x1="88" y1="78" x2="88" y2="48" stroke="#f43f5e" stroke-width="2.4"/>
        <text x="88" y="44" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fb7185">-OFF</text>
        <text x="68" y="76" text-anchor="middle" font-size="6" fill="#94a3b8">静止中は無出力(省電力)</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#166534">M73 イベントベース画素(EVS)</text>
        <text x="144" y="43" font-size="7.1" fill="#14532d">・人間の網膜と同じ「変化だけ」を検知</text>
        <text x="144" y="56" font-size="7.1" fill="#14532d">・1μs(1万fps相当)の超高速反応＆120dB</text>
        <text x="144" y="69" font-size="7.1" fill="#14532d">・動体AFや手ブレ逆算消去の未来技術</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#166534">変わらない風景は黙り、動いた画素だけが100万分の1秒で叫ぶ省電力AI網膜</text>
      `);

    case 'micro_dummy_guard_ring':
      return wrapSvg(`
        <rect x="14" y="16" width="112" height="70" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
        <rect x="24" y="25" width="92" height="52" rx="3" fill="#fef3c7" stroke="#d97706" stroke-dasharray="3 2"/>
        <rect x="36" y="35" width="68" height="32" rx="2" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
        <text x="70" y="54" text-anchor="middle" font-size="7.1" font-weight="bold" fill="#15803d">有効画素エリア</text>
        <text x="70" y="32" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#b45309">ダミー遷移画素帯</text>
        <text x="70" y="22.5" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b91c1c">二重ガードリング(迷子吸収)</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#fefce8" stroke="#d97706"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#92400e">M74 ダミー帯＆ガードリング</text>
        <text x="144" y="43" font-size="7.1" fill="#78350f">・食パンのミミ役で製造の端ズレを吸収</text>
        <text x="144" y="56" font-size="7.1" fill="#78350f">・周辺回路からの迷子電子を排水溝で回収</text>
        <text x="144" y="69" font-size="7.1" fill="#78350f">・長時間露光の端カブリ(アンプグロー)遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#92400e">外周のクッション画素と迷子電子の排水溝が、画面四隅まで均一な美しさを死守</text>
      `);

    case 'micro_rts_anneal_bist':
      return wrapSvg(`
        <rect x="14" y="18" width="112" height="32" rx="3" fill="#fef2f2" stroke="#dc2626"/>
        <path d="M22 40 H36 V26 H52 V40 H64 V26 H80 V40 H116" fill="none" stroke="#dc2626" stroke-width="1.5"/>
        <text x="70" y="24" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#b91c1c">劣化: RTSチラつきノイズ</text>
        <path d="M70 51 V59" stroke="#f97316" stroke-width="2"/>
        <polygon points="70,60 66,54 74,54" fill="#f97316"/>
        <text x="98" y="58" font-size="6.1" font-weight="bold" fill="#ea580c">BIST診断＋熱修復</text>
        <rect x="14" y="61" width="112" height="24" rx="3" fill="#f0fdf4" stroke="#16a34a"/>
        <line x1="22" y1="74" x2="116" y2="74" stroke="#16a34a" stroke-width="2"/>
        <text x="70" y="70" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#15803d">回復: 新品同様の静けさ!</text>
        <rect x="136" y="14" width="174" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="29" font-size="7.8" font-weight="bold" fill="#9a3412">M75 BIST自己診断＆熱回復</text>
        <text x="144" y="43" font-size="7.1" fill="#7c2d12">・内蔵健康診断回路が異常画素を自動発見</text>
        <text x="144" y="56" font-size="7.1" fill="#7c2d12">・制御熱アニールで界面欠陥を自己修復</text>
        <text x="144" y="69" font-size="7.1" fill="#7c2d12">・TSMC IISW 2025実証の長期信頼性機構</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.1" fill="#9a3412">長年使って生じたチラつき欠陥を自動診断＆熱リカバリーで新品の静けさへ回復</text>
      `);

    default:
      return null;
  }
}
