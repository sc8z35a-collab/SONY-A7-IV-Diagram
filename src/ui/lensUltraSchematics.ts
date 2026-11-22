import { PartExplanation } from '../assemblies/types';

/**
 * 22 bespoke technical SVG schematics for the Phase 9 Watchmaker 62-Part 50mm F1.2 Lens Ultra-Dissection.
 */
export function renderUltraLensSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    case 'lens_hood_lock_bumper':
      return wrap(`
        <rect x="18" y="22" width="114" height="68" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="24" y="28" width="14" height="56" rx="4" fill="#1e293b"/>
        <rect x="38" y="32" width="54" height="48" fill="#475569"/>
        <rect x="92" y="42" width="18" height="28" rx="3" fill="#cbd5e1" stroke="#334155"/>
        <path d="M110 56 L116 51 L120 61 L126 56" fill="none" stroke="#d97706" stroke-width="2"/>
        <path d="M18 56 L24 56" stroke="#ef4444" stroke-width="2.5"/>
        <text x="20" y="102" font-size="7.5" fill="#334155">TPE衝撃バンパー ＋ ロック解除爪</text>
        <rect x="144" y="18" width="162" height="76" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <text x="152" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">衝撃緩和＆誤脱落防止機構</text>
        <text x="152" y="51" font-size="7.5" fill="#334155">・硬度Shore A65ゴム縁が縦置き衝撃吸収</text>
        <text x="152" y="65" font-size="7.5" fill="#334155">・圧縮ばね係止爪でバッグ内脱落を零化</text>
        <text x="152" y="79" font-size="7.5" fill="#0284c7">・二色成形溶着で長期使用でも剥がれ零</text>
      `);

    case 'lens_front_gasket':
      return wrap(`
        <rect x="20" y="26" width="112" height="18" rx="2" fill="#334155"/>
        <rect x="20" y="68" width="112" height="20" rx="2" fill="#475569"/>
        <rect x="28" y="44" width="96" height="24" rx="4" fill="#1e293b" stroke="#0284c7" stroke-width="1.6"/>
        <circle cx="52" cy="56" r="5" fill="#38bdf8" opacity="0.6"/>
        <circle cx="76" cy="56" r="5" fill="#38bdf8" opacity="0.6"/>
        <circle cx="100" cy="56" r="5" fill="#38bdf8" opacity="0.6"/>
        <path d="M12 40 L26 48 M12 58 L26 56" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round"/>
        <text x="24" y="102" font-size="7.5" fill="#0369a1">30%圧縮 独立気泡EPDMフォーム</text>
        <rect x="144" y="18" width="162" height="76" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="152" y="35" font-size="8.5" font-weight="bold" fill="#0369a1">最前線・毛細管浸水ブロック</text>
        <text x="152" y="51" font-size="7.5" fill="#0c4a6e">・1/8回転フィルター枠直下の厚肉シール</text>
        <text x="152" y="65" font-size="7.5" fill="#0c4a6e">・独立気泡構造で吸水膨潤・凍結を防止</text>
        <text x="152" y="79" font-size="7.5" fill="#0c4a6e">・真鍮アイレットで最適圧縮率30%維持</text>
      `);

    case 'lens_front_tilt_shims':
      return wrap(`
        <circle cx="76" cy="56" r="34" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
        <rect x="64" y="16" width="24" height="9" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="34" y="68" width="24" height="7" rx="2" fill="#cbd5e1" stroke="#334155" transform="rotate(30 46 71)"/>
        <rect x="94" y="68" width="24" height="5" rx="2" fill="#38bdf8" stroke="#0369a1" transform="rotate(-30 106 71)"/>
        <polygon points="76,10 72,15 80,15" fill="#dc2626"/>
        <text x="58" y="34" font-size="7" font-weight="bold" fill="#854d0e">0.48mm</text>
        <text x="22" y="92" font-size="7" font-weight="bold" fill="#334155">0.36mm</text>
        <text x="98" y="92" font-size="7" font-weight="bold" fill="#0369a1">0.27mm</text>
        <rect x="142" y="18" width="164" height="76" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#854d0e">前群3点ステップチルトシム</text>
        <text x="150" y="51" font-size="7.5" fill="#713f12">・120°対称3座面に個体別シム積層選定</text>
        <text x="150" y="65" font-size="7.5" fill="#713f12">・Z軸エアギャップ＋2軸チルト秒角校正</text>
        <text x="150" y="79" font-size="7.5" fill="#dc2626">・赤い三角合印で分解後の位相再現</text>
      `);

    case 'lens_front_cell_mount':
      return wrap(`
        <rect x="20" y="24" width="114" height="66" rx="4" fill="#334155" stroke="#0f172a"/>
        <rect x="28" y="31" width="98" height="52" rx="2" fill="#ffffff"/>
        <path d="M36 33 Q44 57 36 81 L46 81 Q52 57 46 33 Z" fill="#bae6fd" stroke="#0284c7"/>
        <path d="M54 34 Q61 57 54 80 L64 80 Q69 57 64 34 Z" fill="#bfdbfe" stroke="#2563eb"/>
        <path d="M74 35 Q82 57 74 79 L88 79 Q82 57 88 35 Z" fill="#a7f3d0" stroke="#059669"/>
        <path d="M98 37 Q93 57 98 77 L110 77 Q115 57 110 37 Z" fill="#99f6e4" stroke="#0d9488"/>
        <rect x="34" y="25" width="84" height="5" rx="2" fill="#38bdf8"/>
        <rect x="34" y="84" width="84" height="5" rx="2" fill="#38bdf8"/>
        <text x="20" y="104" font-size="7.5" fill="#0369a1">CNC同軸鏡枠＋弾性シリコーン逃がし層</text>
        <rect x="144" y="18" width="162" height="76" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="152" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">単一チャック同軸＆無歪み保持</text>
        <text x="152" y="51" font-size="7.5" fill="#334155">・E01〜E05を同軸度3μm以内で一括保持</text>
        <text x="152" y="65" font-size="7.5" fill="#334155">・6点シリコーン接着で熱膨張差を吸収</text>
        <text x="152" y="79" font-size="7.5" fill="#0284c7">・−20〜+60℃でもXA面精度を完全維持</text>
      `);

    case 'lens_intergroup_baffle':
      return wrap(`
        <rect x="20" y="20" width="114" height="74" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <polygon points="74,22 86,22 82,41 74,41" fill="#0f172a"/>
        <polygon points="74,92 86,92 82,73 74,73" fill="#0f172a"/>
        <line x1="24" y1="57" x2="128" y2="57" stroke="#0284c7" stroke-width="2"/>
        <line x1="24" y1="45" x2="128" y2="49" stroke="#38bdf8" stroke-width="1.5"/>
        <line x1="24" y1="69" x2="128" y2="65" stroke="#38bdf8" stroke-width="1.5"/>
        <line x1="24" y1="26" x2="77" y2="35" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="26" y="106" font-size="7.5" fill="#1e293b">0.08mm刃先ナイフエッジ遮光板</text>
        <rect x="144" y="18" width="162" height="76" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="152" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">群間迷光トリミングバッフル</text>
        <text x="152" y="51" font-size="7.5" fill="#334155">・前群コバ面散乱光を絞り手前で遮断</text>
        <text x="152" y="65" font-size="7.5" fill="#334155">・鋭利刃先で端面エッジグレアも零化</text>
        <text x="152" y="79" font-size="7.5" fill="#dc2626">・逆光コントラスト＆黒の締まりを向上</text>
      `);

    case 'lens_iris_cover':
      return wrap(`
        <rect x="20" y="28" width="112" height="14" rx="2" fill="#64748b"/>
        <rect x="24" y="42" width="104" height="6" rx="1" fill="#e2e8f0" stroke="#0284c7"/>
        <rect x="28" y="51" width="96" height="8" rx="1" fill="#1e293b"/>
        <rect x="20" y="63" width="112" height="16" rx="2" fill="#475569"/>
        <text x="34" y="38" font-size="7" fill="#fff">前面防塵カバー</text>
        <text x="30" y="47" font-size="6.2" font-weight="bold" fill="#0369a1">PTFE極低摩擦ライナー</text>
        <text x="38" y="58" font-size="6.5" fill="#fff">11枚カーボン羽根</text>
        <text x="34" y="74" font-size="7" fill="#fff">固定ピボット基板</text>
        <rect x="144" y="18" width="162" height="76" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="152" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">羽根平面規制＆防塵サンドイッチ</text>
        <text x="152" y="51" font-size="7.5" fill="#334155">・PTFEライナー（μ&lt;0.05）で無音摺動</text>
        <text x="152" y="65" font-size="7.5" fill="#334155">・Z軸バタつきを±15μm以内に完全規制</text>
        <text x="152" y="79" font-size="7.5" fill="#0284c7">・30コマ/秒高速連写の羽根噛込を防止</text>
      `);

    case 'lens_iris_home_sensor':
      return wrap(`
        <rect x="24" y="26" width="28" height="60" rx="4" fill="#1e293b"/>
        <rect x="52" y="26" width="24" height="16" rx="2" fill="#334155"/>
        <rect x="52" y="70" width="24" height="16" rx="2" fill="#334155"/>
        <line x1="64" y1="42" x2="64" y2="70" stroke="#ec4899" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="58" y="52" width="54" height="8" rx="1" fill="#cbd5e1" stroke="#334155"/>
        <circle cx="118" cy="56" r="7" fill="#ec4899" opacity="0.25" stroke="#ec4899"/>
        <text x="64" y="49" font-size="6.5" font-weight="bold" fill="#db2777">940nm IR</text>
        <text x="22" y="102" font-size="7.5" fill="#334155">U字フォトインタラプタ＋F1.2遮光フラグ</text>
        <rect x="142" y="18" width="164" height="76" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#9d174d">F1.2開放・絶対原点ゼロ点検出</text>
        <text x="150" y="51" font-size="7.5" fill="#831843">・起動時に940nm赤外線でF1.2原点を確定</text>
        <text x="150" y="65" font-size="7.5" fill="#831843">・露出再現誤差 &lt; 0.01 EV の精密制御</text>
        <text x="150" y="79" font-size="7.5" fill="#831843">・シリコーン緩衝ピンで原点突き当て無音</text>
      `);

    case 'lens_focus_a_eccentric':
      return wrap(`
        <rect x="26" y="30" width="96" height="52" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <circle cx="74" cy="56" r="8" fill="#0284c7"/>
        <text x="65" y="59" font-size="7" font-weight="bold" fill="#fff">CoG</text>
        <line x1="20" y1="56" x2="128" y2="56" stroke="#d97706" stroke-width="2.2" stroke-dasharray="4 2"/>
        <polygon points="130,56 122,52 122,60" fill="#d97706"/>
        <rect x="44" y="22" width="14" height="8" rx="2" fill="#eab308"/>
        <rect x="90" y="82" width="14" height="8" rx="2" fill="#eab308"/>
        <text x="20" y="104" font-size="7.5" fill="#b45309">重心(CoG)とXD推力線Fが一直線一致</text>
        <rect x="142" y="18" width="164" height="76" rx="5" fill="#f0f9ff" stroke="#0369a1"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#0c4a6e">重心整合キャリア＆偏心調芯</text>
        <text x="150" y="51" font-size="7.5" fill="#0369a1">・推力オフセット d=0 でこじり摩擦零</text>
        <text x="150" y="65" font-size="7.5" fill="#0369a1">・真鍮バランス錘で120fps急加減速安定</text>
        <text x="150" y="79" font-size="7.5" fill="#0369a1">・A群単独3点偏心カムで動的チルト除去</text>
      `);

    case 'lens_xd_flux_shields':
      return wrap(`
        <rect x="26" y="24" width="100" height="64" rx="6" fill="#475569" stroke="#1e293b" stroke-width="2.2"/>
        <rect x="34" y="32" width="84" height="48" rx="3" fill="#ffffff"/>
        <rect x="40" y="38" width="22" height="36" fill="#3b82f6"/>
        <rect x="90" y="38" width="22" height="36" fill="#ef4444"/>
        <rect x="66" y="42" width="20" height="28" rx="2" fill="#d97706"/>
        <path d="M50 38 C50 28, 102 28, 102 38" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
        <path d="M50 74 C50 84, 102 84, 102 74" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="20" y="104" font-size="7.5" fill="#334155">高透磁率パーマロイ(μr&gt;20,000)閉磁路</text>
        <rect x="140" y="18" width="166" height="76" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="148" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">漏洩磁束遮断＆放熱ブリッジ</text>
        <text x="148" y="51" font-size="7.5" fill="#334155">・N52強力磁界の外部漏洩を1/50以下へ</text>
        <text x="148" y="65" font-size="7.5" fill="#334155">・隣接MRセンサー＆IBISの誤動作を防止</text>
        <text x="148" y="79" font-size="7.5" fill="#b45309">・純銅帯がコイル発熱をMg骨格へ拡散</text>
      `);

    case 'lens_antirot_rails':
      return wrap(`
        <circle cx="52" cy="56" r="14" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <circle cx="52" cy="56" r="7" fill="#64748b"/>
        <line x1="66" y1="56" x2="94" y2="56" stroke="#334155" stroke-width="4"/>
        <path d="M94 44 L118 44 L118 50 L102 50 L102 62 L118 62 L118 68 L94 68 Z" fill="#f1f5f9" stroke="#0284c7" stroke-width="1.8"/>
        <circle cx="111" cy="56" r="5" fill="#94a3b8" stroke="#1e293b" stroke-width="1.4"/>
        <text x="26" y="84" font-size="7" font-weight="bold" fill="#334155">主軸(XY固定)</text>
        <text x="86" y="84" font-size="7" font-weight="bold" fill="#0369a1">副軸＋二股POM</text>
        <text x="20" y="102" font-size="7.5" fill="#334155">過剰拘束ゼロの完全静定キネマティック支持</text>
        <rect x="138" y="18" width="168" height="76" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="146" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">回り止め副軸＆POMフォーク</text>
        <text x="146" y="51" font-size="7.5" fill="#334155">・二股フォークが回転θzのみを軽く拘束</text>
        <text x="146" y="65" font-size="7.5" fill="#334155">・極寒/猛暑の熱膨張でも焼き付き零</text>
        <text x="146" y="79" font-size="7.5" fill="#0284c7">・自己潤滑PTFE配合で無音ドライ摺動</text>
      `);

    case 'lens_af_origin_sensors':
      return wrap(`
        <rect x="20" y="24" width="110" height="28" rx="4" fill="#ecfdf5" stroke="#10b981"/>
        <text x="26" y="41" font-size="7.5" font-weight="bold" fill="#065f46">A群 原点IR → z_homeA</text>
        <rect x="20" y="62" width="110" height="28" rx="4" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="26" y="79" font-size="7.5" font-weight="bold" fill="#115e59">B群 原点IR → z_homeB</text>
        <path d="M130 38 L144 50 M130 76 L144 64" stroke="#db2777" stroke-width="2"/>
        <rect x="144" y="18" width="162" height="76" rx="5" fill="#fdf2f8" stroke="#db2777"/>
        <text x="152" y="35" font-size="8.5" font-weight="bold" fill="#9d174d">A/B独立 起動ホーミング検出</text>
        <text x="152" y="51" font-size="7.5" fill="#831843">・電源ON時0.3秒以内に両群ゼロ点確定</text>
        <text x="152" y="65" font-size="7.5" fill="#831843">・0.1μm MRセンサーへ絶対座標を供給</text>
        <text x="152" y="79" font-size="7.5" fill="#831843">・A/B群間隔の1μm同期精度を完全保証</text>
      `);

    case 'lens_inner_chassis_front':
      return wrap(`
        <rect x="20" y="28" width="50" height="58" rx="4" fill="#64748b" stroke="#1e293b" stroke-width="1.6"/>
        <rect x="82" y="28" width="50" height="58" rx="4" fill="#475569" stroke="#1e293b" stroke-width="1.6"/>
        <line x1="70" y1="42" x2="82" y2="42" stroke="#eab308" stroke-width="3"/>
        <line x1="70" y1="72" x2="82" y2="72" stroke="#eab308" stroke-width="3"/>
        <text x="27" y="60" font-size="7.5" font-weight="bold" fill="#fff">前Mg胴</text>
        <text x="90" y="60" font-size="7.5" font-weight="bold" fill="#fff">後Mg胴</text>
        <text x="24" y="102" font-size="7.5" fill="#334155">前後2分割インロー嵌合＋4本長尺ボルト</text>
        <rect x="144" y="18" width="162" height="76" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="152" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">2ピース構造マグネシウム中胴</text>
        <text x="152" y="51" font-size="7.5" fill="#334155">・前後分割で中央の絞り＆AF整備を実現</text>
        <text x="152" y="65" font-size="7.5" fill="#334155">・インロー嵌合で合体偏心 &lt; 5 μm</text>
        <text x="152" y="79" font-size="7.5" fill="#334155">・高減衰TSC/Mgで高速AF共振を吸収</text>
      `);

    case 'lens_focus_b_eccentric':
      return wrap(`
        <circle cx="76" cy="56" r="32" fill="#f0fdfa" stroke="#0d9488" stroke-width="2"/>
        <circle cx="76" cy="24" r="6" fill="#eab308" stroke="#854d0e"/>
        <circle cx="84" cy="26" r="3.5" fill="#f1f5f9" stroke="#475569"/>
        <circle cx="48" cy="72" r="6" fill="#eab308" stroke="#854d0e"/>
        <circle cx="44" cy="64" r="3.5" fill="#f1f5f9" stroke="#475569"/>
        <circle cx="104" cy="72" r="6" fill="#eab308" stroke="#854d0e"/>
        <circle cx="108" cy="64" r="3.5" fill="#f1f5f9" stroke="#475569"/>
        <text x="58" y="59" font-size="7.5" font-weight="bold" fill="#0f766e">後衛B群</text>
        <text x="20" y="104" font-size="7.5" fill="#0f766e">3点真鍮偏心カム＋白色ナイロン支持柱</text>
        <rect x="142" y="18" width="164" height="76" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#115e59">絞り後方の独立チルト校正</text>
        <text x="150" y="51" font-size="7.5" fill="#0f766e">・前群＋A群＋B群の多段光軸校正体系</text>
        <text x="150" y="65" font-size="7.5" fill="#0f766e">・至近0.40m撮影時の周辺片ボケを根絶</text>
        <text x="150" y="79" font-size="7.5" fill="#0f766e">・調整後に耐振動シリコーン樹脂で封止</text>
      `);

    case 'lens_rear_cell_spacer':
      return wrap(`
        <rect x="20" y="28" width="84" height="58" rx="4" fill="#334155"/>
        <rect x="104" y="28" width="12" height="58" rx="2" fill="#eab308" stroke="#854d0e" stroke-width="1.4"/>
        <path d="M36 57 L128 57" stroke="#38bdf8" stroke-width="1.6"/>
        <circle cx="122" cy="40" r="9" fill="#0ea5e9" opacity="0.22" stroke="#0284c7"/>
        <text x="32" y="60" font-size="7.5" font-weight="bold" fill="#fff">E11〜E14セル</text>
        <text x="22" y="103" font-size="7.5" fill="#854d0e">個体別 球面収差・ボケ味チューニング環</text>
        <rect x="142" y="18" width="164" height="76" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#854d0e">1本ごとのG Masterボケ最適化</text>
        <text x="150" y="51" font-size="7.5" fill="#713f12">・製造時に1本ずつ球面収差を実測調整</text>
        <text x="150" y="65" font-size="7.5" fill="#713f12">・前ボケ/後ボケ双方の二線ボケを払拭</text>
        <text x="150" y="79" font-size="7.5" fill="#b45309">・高解像ととろけるボケを全数で両立</text>
      `);

    case 'lens_mf_tensioners':
      return wrap(`
        <circle cx="74" cy="56" r="32" fill="none" stroke="#1e293b" stroke-width="6"/>
        <circle cx="74" cy="56" r="28" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="6 2"/>
        <rect x="68" y="23" width="12" height="6" rx="1.5" fill="#f8fafc" stroke="#334155"/>
        <rect x="44" y="68" width="12" height="6" rx="1.5" fill="#f8fafc" stroke="#334155" transform="rotate(60 50 71)"/>
        <rect x="92" y="68" width="12" height="6" rx="1.5" fill="#f8fafc" stroke="#334155" transform="rotate(-60 98 71)"/>
        <text x="53" y="59" font-size="7.5" font-weight="bold" fill="#0369a1">3点POM予圧</text>
        <text x="20" y="104" font-size="7.5" fill="#334155">白色POM板バネ摩擦子＋防湿テープ帯</text>
        <rect x="140" y="18" width="166" height="76" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="148" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">上質なMFトルク＆防湿バリヤー</text>
        <text x="148" y="51" font-size="7.5" fill="#334155">・電子バイワイヤに機械式並の粘性付与</text>
        <text x="148" y="65" font-size="7.5" fill="#334155">・滑り出し引っかかり(スティックスリップ)零</text>
        <text x="148" y="79" font-size="7.5" fill="#0284c7">・ラバー直下を耐湿テープで全周密閉</text>
      `);

    case 'lens_aperture_ring':
      return wrap(`
        <rect x="20" y="32" width="112" height="46" rx="5" fill="#334155" stroke="#0f172a"/>
        ${[28, 40, 52, 64, 76, 88, 100, 112, 124].map((x) => `<line x1="${x}" y1="36" x2="${x}" y2="74" stroke="#94a3b8" stroke-width="1.4"/>`).join('')}
        <text x="26" y="25" font-size="8" font-weight="bold" fill="#0f172a">1.2  1.4  2  2.8  4  8  16  A</text>
        <circle cx="76" cy="86" r="3" fill="#d97706"/>
        <text x="24" y="104" font-size="7.5" fill="#334155">CNCアルミ細目ローレット独立絞り環</text>
        <rect x="142" y="18" width="164" height="76" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">直感1/3段＆シネマ無段階操作</text>
        <text x="150" y="51" font-size="7.5" fill="#334155">・フォーカス環と異なる金属指触で誤操作零</text>
        <text x="150" y="65" font-size="7.5" fill="#334155">・L48磁気ホールセンサーへ非接触伝達</text>
        <text x="150" y="79" font-size="7.5" fill="#d97706">・デクリック切替で動画露出フェード自在</text>
      `);

    case 'lens_aperture_bearings':
      return wrap(`
        <circle cx="76" cy="56" r="31" fill="none" stroke="#cbd5e1" stroke-width="8"/>
        <circle cx="76" cy="56" r="31" fill="none" stroke="#64748b" stroke-width="1.2"/>
        ${Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const cx = (76 + Math.cos(a) * 31).toFixed(1);
          const cy = (56 + Math.sin(a) * 31).toFixed(1);
          return `<circle cx="${cx}" cy="${cy}" r="3.2" fill="#475569" stroke="#ffffff" stroke-width="0.7"/>`;
        }).join('')}
        <text x="53" y="59" font-size="7.5" font-weight="bold" fill="#334155">24鋼球支持</text>
        <text x="20" y="104" font-size="7.5" fill="#334155">μ=0.002 精密研磨マイクロ鋼球レース</text>
        <rect x="140" y="18" width="166" height="76" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <text x="148" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">シネマ品位の無ガタ回転支持</text>
        <text x="148" y="51" font-size="7.5" fill="#334155">・24個の真球0.5μm鋼球が全周荷重支持</text>
        <text x="148" y="65" font-size="7.5" fill="#334155">・軸ブレ遊び &lt; 15 μm の滑らかな操作感</text>
        <text x="148" y="79" font-size="7.5" fill="#334155">・高粘度ダンピンググリスで上質な粘性</text>
      `);

    case 'lens_top_hold_pod':
      return wrap(`
        <circle cx="74" cy="56" r="28" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
        <rect x="65" y="19" width="18" height="10" rx="3" fill="#10b981" stroke="#065f46"/>
        <rect x="102" y="47" width="10" height="18" rx="3" fill="#64748b" stroke="#334155"/>
        <path d="M74 29 A 27 27 0 0 1 101 56" fill="none" stroke="#059669" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="84" y="34" font-size="7.5" font-weight="bold" fill="#059669">90°</text>
        <text x="56" y="16" font-size="7" font-weight="bold" fill="#065f46">上面12時</text>
        <text x="20" y="104" font-size="7.5" fill="#065f46">縦位置ポートレート専用 独立防水ポッド</text>
        <rect x="140" y="18" width="166" height="76" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="148" y="35" font-size="8.5" font-weight="bold" fill="#065f46">縦/横90°デュアルカスタム操作</text>
        <text x="148" y="51" font-size="7.5" fill="#047857">・縦構え時も親指が自然に届く12時配置</text>
        <text x="148" y="65" font-size="7.5" fill="#047857">・シリコーン防水ブーツで雨天操作安心</text>
        <text x="148" y="79" font-size="7.5" fill="#047857">・瞳AF/クロップ/拡大など任意割当対応</text>
      `);

    case 'lens_emi_shield_can':
      return wrap(`
        <rect x="20" y="28" width="110" height="22" rx="3" fill="#15803d"/>
        <text x="42" y="42" font-size="7.5" font-weight="bold" fill="#fff">4ch PWM駆動基板</text>
        <rect x="18" y="54" width="114" height="12" rx="2" fill="#64748b" stroke="#1e293b" stroke-width="1.4"/>
        <text x="38" y="62.5" font-size="6.8" font-weight="bold" fill="#fff">EMI金属遮蔽シールド</text>
        <rect x="26" y="74" width="98" height="14" rx="2" fill="#0284c7" opacity="0.2" stroke="#0284c7"/>
        <text x="36" y="84" font-size="7.2" font-weight="bold" fill="#0369a1">CMOS撮像素子 (保護)</text>
        <path d="M124 60 L132 60 L132 82" fill="none" stroke="#d97706" stroke-width="3"/>
        <text x="20" y="104" font-size="7.5" fill="#334155">遮蔽量&gt;45dB ＋ 銅箔ESDアース接地</text>
        <rect x="144" y="18" width="162" height="76" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="152" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">センサー近接EMI＆静電気防御</text>
        <text x="152" y="51" font-size="7.5" fill="#334155">・4基XDモーターPWMノイズを45dB遮断</text>
        <text x="152" y="65" font-size="7.5" fill="#334155">・高ISO時の横縞ノイズ混入を完全防止</text>
        <text x="152" y="79" font-size="7.5" fill="#b45309">・銅箔テープが静電気をマウントへ逃がす</text>
      `);

    case 'lens_front_outer_barrel':
      return wrap(`
        <rect x="24" y="24" width="104" height="62" rx="5" fill="#334155" stroke="#0f172a"/>
        <rect x="34" y="20" width="24" height="8" rx="2" fill="#1e293b"/>
        <rect x="94" y="20" width="24" height="8" rx="2" fill="#1e293b"/>
        <rect x="24" y="72" width="104" height="9" fill="#d97706"/>
        <circle cx="76" cy="40" r="4" fill="#dc2626"/>
        <text x="48" y="62" font-size="7.5" font-weight="bold" fill="#f8fafc">前部独立外装</text>
        <text x="22" y="104" font-size="7.5" fill="#334155">2爪フードバヨネット座＋アルマイト帯</text>
        <rect x="142" y="18" width="164" height="76" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">モジュラー前部外装バレル</text>
        <text x="150" y="51" font-size="7.5" fill="#334155">・1万回以上のフード着脱に耐える強化爪</text>
        <text x="150" y="65" font-size="7.5" fill="#334155">・先端破損時も内部非分解で単独交換</text>
        <text x="150" y="79" font-size="7.5" fill="#b45309">・切削メタリックアクセント帯と赤指標</text>
      `);

    case 'lens_mount_shim_plate':
      return wrap(`
        <circle cx="76" cy="54" r="32" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <circle cx="76" cy="54" r="21" fill="#ffffff" stroke="#475569" stroke-width="1.2"/>
        <circle cx="76" cy="54" r="27" fill="none" stroke="#1e293b" stroke-width="4" stroke-dasharray="4 3"/>
        <rect x="69" y="17" width="14" height="8" rx="1.5" fill="#eab308" stroke="#854d0e"/>
        <rect x="42" y="68" width="14" height="8" rx="1.5" fill="#eab308" stroke="#854d0e" transform="rotate(60 49 72)"/>
        <rect x="96" y="68" width="14" height="8" rx="1.5" fill="#eab308" stroke="#854d0e" transform="rotate(-60 103 72)"/>
        <text x="20" y="104" font-size="7.5" fill="#334155">3か所シム挿入ポケット＋リア二次防塵泡</text>
        <rect x="140" y="18" width="166" height="76" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="148" y="35" font-size="8.5" font-weight="bold" fill="#0f172a">GM標準シム座面＆二重防塵</text>
        <text x="148" y="51" font-size="7.5" fill="#334155">・マウント4ねじ外すだけでチルト再校正</text>
        <text x="148" y="65" font-size="7.5" fill="#334155">・バヨネット内側の発泡フォーム二重遮塵</text>
        <text x="148" y="79" font-size="7.5" fill="#0369a1">・フランジバック18.000mm±3μmを維持</text>
      `);

    case 'lens_contact_block':
      return wrap(`
        <rect x="20" y="28" width="112" height="32" rx="5" fill="#1e293b" stroke="#0f172a"/>
        ${Array.from({ length: 12 }, (_, i) => `<rect x="${26 + i * 8.5}" y="35" width="5.5" height="18" rx="1.5" fill="#facc15" stroke="#a16207" stroke-width="0.6"/>`).join('')}
        <rect x="46" y="64" width="60" height="22" rx="3" fill="#f97316"/>
        <rect x="64" y="69" width="24" height="12" rx="2" fill="#0f172a"/>
        <text x="67" y="77.5" font-size="6.5" fill="#fff">TVS</text>
        <text x="20" y="104" font-size="7.5" fill="#b45309">12極硬質金めっき接点＋TVS静電保護</text>
        <rect x="142" y="18" width="164" height="76" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="150" y="35" font-size="8.5" font-weight="bold" fill="#92400e">120fps同期・高速通信＆大電流</text>
        <text x="150" y="51" font-size="7.5" fill="#78350f">・4基XDモーターへ2A超を低抵抗給電</text>
        <text x="150" y="65" font-size="7.5" fill="#78350f">・通信周期≤2msでAI瞳AF＆補正同期</text>
        <text x="150" y="79" font-size="7.5" fill="#dc2626">・±15kV静電気をTVSダイオードで保護</text>
      `);

    default:
      return null;
  }
}
