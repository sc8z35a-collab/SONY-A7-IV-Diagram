import { PartExplanation } from '../assemblies/types';

/**
 * 24 bespoke beginner-friendly technical SVG schematics (320x118) for Phase 16A:
 *  - Vapor Chamber, Two-Phase Cooling & Sony OEM Mainboard Standalone Micro (+24: M31–M54)
 */
export function renderPhase16MainboardSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // Group 1: Two-Phase Copper Vapor Chamber Internal Dissection (M31–M38)
    // =========================================================================
    case 'mb_vc_evaporator_plate':
      return wrap(`
        <rect x="18" y="68" width="100" height="16" rx="2" fill="#d97706" stroke="#92400e"/>
        <path d="M24 68 L24 58 L32 58 L32 68 L40 68 L40 58 L48 58 L48 68 L56 68 L56 58 L64 58 L64 68 L72 68 L72 58 L80 58 L80 68 L88 68 L88 58 L96 58 L96 68 L104 68 L104 58 L112 58 L112 68" fill="#b45309" stroke="#78350f"/>
        <path d="M24 56 Q68 50 112 56" fill="none" stroke="#0ea5e9" stroke-width="2.2"/>
        <path d="M44 48 L44 26 M68 46 L68 22 M92 48 L92 26" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3 2"/>
        <polygon points="68,18 64,26 72,26" fill="#ef4444"/>
        <text x="26" y="79" font-size="6.4" fill="#fff">C1100無酸素銅(底板)</text>
        <text x="12" y="112" font-size="7.0" fill="#92400e">親水マイクロ溝(幅60μm)で薄膜蒸発・瞬時吸熱</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#78350f">蒸発側C1100銅＆親水溝</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・チップの熱を最初に受ける銅底板</text>
        <text x="144" y="60" font-size="6.4" fill="#b45309">・幅60μm光エッチング溝＋親水処理</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・水が薄膜状に広がり一瞬で蒸発</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・無酸素銅で内部ガス劣化を防止</text>
      `);

    case 'mb_vc_condenser_plate':
      return wrap(`
        <rect x="18" y="28" width="100" height="14" rx="2" fill="#c26234" stroke="#7c2d12"/>
        <rect x="16" y="42" width="14" height="22" fill="#ea580c" stroke="#9a3412"/>
        <rect x="106" y="42" width="14" height="22" fill="#ea580c" stroke="#9a3412"/>
        <rect x="18" y="64" width="100" height="10" rx="2" fill="#d97706" stroke="#92400e"/>
        <circle cx="44" cy="46" r="3" fill="#0ea5e9"/>
        <circle cx="68" cy="46" r="3.4" fill="#0ea5e9"/>
        <circle cx="92" cy="46" r="3" fill="#0ea5e9"/>
        <path d="M40 24 L40 12 M68 24 L68 12 M96 24 L96 12" stroke="#f97316" stroke-width="1.6"/>
        <text x="28" y="38" font-size="6.3" fill="#fff">凝縮トップ銅シェル</text>
        <text x="12" y="112" font-size="7.0" fill="#9a3412">850℃拡散接合フランジで10年超の完全真空密閉</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#7c2d12">凝縮シェル＆拡散接合縁</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・熱い水蒸気が冷えて水滴に戻るフタ</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・1g凝縮で2,400Jの熱を全面均一放出</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・外周は850℃固相拡散接合で完全気密</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・面内温度差ΔT&lt;1.5℃の驚異的均熱</text>
      `);

    case 'mb_vc_woven_mesh_wick':
      return wrap(`
        <rect x="20" y="20" width="96" height="68" rx="4" fill="#fff7ed" stroke="#d97706"/>
        <path d="M28 24 L28 84 M44 24 L44 84 M60 24 L60 84 M76 24 L76 84 M92 24 L92 84 M108 24 L108 84" stroke="#b45309" stroke-width="2.2"/>
        <path d="M24 32 L112 32 M24 46 L112 46 M24 60 L112 60 M24 74 L112 74" stroke="#ea580c" stroke-width="2.2"/>
        <path d="M36 78 L36 30" stroke="#0284c7" stroke-width="2.2"/>
        <polygon points="36,24 32,32 40,32" fill="#0284c7"/>
        <text x="12" y="112" font-size="7.0" fill="#92400e">200メッシュ銅織網が毛細管力で逆さでも水を還流</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#78350f">200メッシュ銅織網ウィック</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・φ30μm銅線を織った毛細管ガーゼ</text>
        <text x="144" y="60" font-size="6.4" fill="#0284c7">・タオルの吸い上げ力で重力に逆らう</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・粗目メッシュ層が蒸気高速道路を確保</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・縦撮り・仰角・倒立すべてで安定冷却</text>
      `);

    case 'mb_vc_working_fluid_zone':
      return wrap(`
        <rect x="18" y="20" width="100" height="68" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="38" y="72" width="60" height="12" rx="2" fill="#ef4444"/>
        <circle cx="56" cy="56" r="5" fill="#f97316" opacity="0.75"/>
        <circle cx="76" cy="48" r="6" fill="#f97316" opacity="0.75"/>
        <path d="M68 68 Q40 44 28 32" fill="none" stroke="#ef4444" stroke-width="1.8"/>
        <path d="M68 68 Q96 44 108 32" fill="none" stroke="#ef4444" stroke-width="1.8"/>
        <path d="M28 38 Q30 62 46 72" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
        <path d="M108 38 Q106 62 90 72" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="48" y="81" font-size="6.3" fill="#fff">熱源 40℃〜</text>
        <text x="12" y="112" font-size="7.0" fill="#0369a1">減圧真空(約0.07気圧)で水が39℃から沸騰・循環</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0c4a6e">減圧・脱気超純水 二相層</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・真空減圧で「ぬるま湯温度」で沸騰</text>
        <text x="144" y="60" font-size="6.4" fill="#0369a1">・気化熱で銅板の10〜30倍の速さ輸送</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・無音・電力ゼロで二相サイクルが稼働</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・寒冷地−20℃凍結にも耐える設計</text>
      `);

    case 'mb_vc_pinch_seal_getter':
      return wrap(`
        <rect x="34" y="24" width="84" height="58" rx="5" fill="#fff7ed" stroke="#c2410c" stroke-width="1.6"/>
        <rect x="12" y="46" width="22" height="14" fill="#d97706" stroke="#92400e"/>
        <polygon points="12,46 6,53 12,60" fill="#94a3b8" stroke="#475569"/>
        <rect x="44" y="60" width="30" height="14" rx="2" fill="#475569" stroke="#1e293b"/>
        <circle cx="90" cy="40" r="3" fill="#94a3b8"/>
        <path d="M87 43 L74 60" stroke="#64748b" stroke-width="1.4" stroke-dasharray="2 2"/>
        <text x="48" y="69" font-size="6.2" fill="#fff">Ti-Zr ゲッター</text>
        <text x="12" y="112" font-size="7.0" fill="#475569">ピンチオフ圧接封止＆脱酸素剤ゲッターで真空維持</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">ピンチ封止＆NCGゲッター</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・空気を抜き超音波圧接＋溶接で密閉</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・Ti-Zr金属片が邪魔なH₂ガスを吸着</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・低温隅のガス詰まり劣化を10年防止</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・長期使用でも新品同様の冷却力維持</text>
      `);

    case 'mb_vc_spring_clamps':
      return wrap(`
        <rect x="20" y="68" width="96" height="14" rx="2" fill="#0f766e"/>
        <rect x="20" y="54" width="96" height="12" rx="2" fill="#d97706"/>
        <rect x="61" y="22" width="14" height="8" rx="1" fill="#64748b"/>
        <rect x="65" y="30" width="6" height="44" fill="#94a3b8"/>
        <path d="M54 44 L68 38 L82 44 M54 50 L68 44 L82 50" fill="none" stroke="#eab308" stroke-width="2.2"/>
        <text x="42" y="78" font-size="6.4" fill="#fff">4nm ISP シリコン</text>
        <text x="12" y="112" font-size="7.0" fill="#b45309">皿バネ＋段付ネジで割れずに0.20MPa均圧密着</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#92400e">定荷重皿バネ・ショルダービス</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・ガラス並に割れやすいチップを保護</text>
        <text x="144" y="60" font-size="6.4" fill="#b45309">・皿バネが毎回ベストな押圧力を維持</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・段付きストッパーで締めすぎ防止</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・熱膨張や落下衝撃も弾性吸収</text>
      `);

    case 'mb_vc_pcm_tim_film':
      return wrap(`
        <rect x="20" y="22" width="96" height="20" rx="2" fill="#d97706"/>
        <path d="M20 42 Q32 46 44 42 T68 42 T92 42 T116 42 L116 58 Q104 54 92 58 T68 58 T44 58 T20 58 Z" fill="#ec4899" opacity="0.8"/>
        <rect x="20" y="58" width="96" height="20" rx="2" fill="#0f766e"/>
        <text x="44" y="35" font-size="6.5" fill="#fff">銅プレート</text>
        <text x="34" y="53" font-size="6.4" font-weight="bold" fill="#fff">PCM 45℃軟化充填</text>
        <text x="46" y="71" font-size="6.5" fill="#fff">ISP チップ</text>
        <text x="12" y="112" font-size="7.0" fill="#be185d">45℃でトロッと軟化しミクロの空気隙間をゼロ化</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#9d174d">相変化TIMシート(PTM級)</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・常温は固形シート、45℃で軟化密着</text>
        <text x="144" y="60" font-size="6.4" fill="#be185d">・界面厚30μmまで薄くなり熱抵抗激減</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・グリスの流れ出し(ポンプアウト)無し</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・数年間のハード撮影でも塗り直し不要</text>
      `);

    case 'mb_vc_tripod_cold_bridge':
      return wrap(`
        <path d="M24 24 L56 24 L76 58 L96 58" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round"/>
        <rect x="64" y="48" width="44" height="18" rx="3" fill="#b45309" stroke="#78350f"/>
        <rect x="20" y="68" width="96" height="16" rx="2" fill="#64748b"/>
        <circle cx="86" cy="76" r="5" fill="#eab308"/>
        <text x="69" y="59" font-size="6.2" fill="#fff">銅結合ブロック</text>
        <text x="26" y="79" font-size="6.2" fill="#fff">底面Mg＆三脚座</text>
        <text x="12" y="112" font-size="7.0" fill="#92400e">集めた熱を大質量の底面骨格＆三脚へ最終排出</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#b45309"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#78350f">三脚座コールドシンク結合</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・熱パイプ先端を底面フレームへ接続</text>
        <text x="144" y="60" font-size="6.4" fill="#b45309">・手が触れない底面＆三脚へ熱を逃がす</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・金属ケージ装着時は追加放熱板に変化</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・グリップや頬の過熱を防ぎ録画延長</text>
      `);

    // =========================================================================
    // Group 2: Sony OEM MAIN BOARD SECTION Thermal/Shield/Insulation (M39–M46)
    // =========================================================================
    case 'mb_oem_heat_plate':
      return wrap(`
        <rect x="18" y="20" width="100" height="66" rx="5" fill="#cbd5e1" stroke="#475569" stroke-width="1.6"/>
        <rect x="44" y="34" width="44" height="36" rx="3" fill="#d97706" stroke="#92400e"/>
        <path d="M66 52 L28 30 M66 52 L106 30 M66 52 L28 74 M66 52 L106 74" stroke="#ef4444" stroke-width="1.5"/>
        <text x="26" y="31" font-size="6.2" fill="#334155">Ref.355 HEAT_PLATE</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">Sony純正502789301 基板全面へ熱を広げる配電盤</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">Sony純正 HEAT_PLATE</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・品番 502789301 (Ref.355)</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・中央の熱を背面全体へ広く均熱拡散</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・A7S III/A1/A7 IV世代で大型復活</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・背面EMIシールド＆剛性カバー兼務</text>
      `);

    case 'mb_oem_heat_transfer_sheet':
      return wrap(`
        <rect x="20" y="34" width="96" height="34" rx="3" fill="#1e293b" stroke="#0f172a"/>
        <rect x="14" y="42" width="14" height="18" fill="#334155" stroke="#94a3b8"/>
        <rect x="108" y="42" width="14" height="18" fill="#334155" stroke="#94a3b8"/>
        <path d="M68 51 L26 51 M68 51 L110 51" stroke="#f97316" stroke-width="2.4"/>
        <polygon points="24,51 31,47 31,55" fill="#f97316"/>
        <polygon points="112,51 105,47 105,55" fill="#f97316"/>
        <text x="34" y="28" font-size="6.5" fill="#1e293b">横方向 k≈1,500 W/mK</text>
        <text x="12" y="112" font-size="7.0" fill="#1e293b">Sony純正Ref.357黒鉛シート＆Ref.360耐熱黒テープ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0f172a">HEAT TRANSFER SHEET A</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・品番 502860201＋631S #25耐熱テープ</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・横方向は純銅の約4倍の超高速熱伝導</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・後ろ(Z方向)へ熱を通さず周囲へ逃がす</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・凹凸に沿う柔軟グラファイト複合層</text>
      `);

    case 'mb_oem_insulating_sheet_a':
      return wrap(`
        <rect x="20" y="22" width="96" height="14" rx="2" fill="#94a3b8"/>
        <rect x="20" y="42" width="30" height="8" fill="#334155"/>
        <rect x="86" y="42" width="30" height="8" fill="#334155"/>
        <rect x="52" y="36" width="32" height="20" rx="2" fill="#ec4899" opacity="0.75"/>
        <rect x="20" y="56" width="96" height="18" rx="2" fill="#0e5a44"/>
        <text x="38" y="32" font-size="6.3" fill="#fff">金属放熱板</text>
        <text x="55" y="49" font-size="6.2" fill="#fff">開口窓</text>
        <text x="38" y="68" font-size="6.3" fill="#fff">SY-1122 基板</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">Ref.356背面絶縁シート チップ窓以外を完全絶縁</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">INSULATING SHEET A</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Sony純正 502992401 (Ref.356)</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・難燃PCフィルム(0.15mm)で耐圧2kV超</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・放熱パッド部だけ精密レーザー開口</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・冷却板と極小部品の接触ショート防止</text>
      `);

    case 'mb_oem_insulating_sheet_b':
      return wrap(`
        <rect x="20" y="22" width="96" height="16" rx="2" fill="#0e5a44"/>
        <rect x="20" y="44" width="96" height="8" rx="1" fill="#475569"/>
        <rect x="52" y="42" width="32" height="12" rx="1" fill="#eab308"/>
        <rect x="20" y="58" width="96" height="18" rx="2" fill="#7c8694"/>
        <text x="36" y="33" font-size="6.3" fill="#fff">基板前面(+Z)</text>
        <text x="36" y="70" font-size="6.3" fill="#fff">マグネシウム中骨格</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">Ref.361前面絶縁シート 0.3mm隙間の漏電を完全防止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">INSULATING SHEET B</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Sony純正 502992501 (Ref.361)</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・基板前面VRMとMg骨格の短絡を遮断</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・SLVS-EC端子＆ボス部のみ精密抜き</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・落下たわみ時も安全を守る表裏二重壁</text>
      `);

    case 'mb_oem_mag_cut_plate':
      return wrap(`
        <rect x="18" y="34" width="22" height="40" rx="2" fill="#ef4444"/>
        <rect x="54" y="20" width="12" height="68" rx="2" fill="#4f46e5" stroke="#312e81"/>
        <rect x="84" y="32" width="30" height="44" rx="3" fill="#10b981"/>
        <path d="M40 42 Q56 42 58 24 M40 66 Q56 66 58 84" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="21" y="57" font-size="6.2" fill="#fff">IBIS</text>
        <text x="89" y="57" font-size="6.2" fill="#fff">音声/RF</text>
        <text x="12" y="112" font-size="7.0" fill="#3730a3">Ref.352パーマロイ板が強力磁石の漏れ磁束を迂回</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#312e81">MAGNETIC FIELD CUT</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Sony純正 502789501 (Ref.352)</text>
        <text x="144" y="60" font-size="6.4" fill="#4338ca">・高透磁率パーマロイが磁力線を吸収</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・IBIS強磁石＆電源コイルの磁気を遮断</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・マイク雑音・ジャイロ誤動作を防止</text>
      `);

    case 'mb_oem_jack_plate':
      return wrap(`
        <rect x="24" y="20" width="44" height="66" rx="3" fill="#0e5a44"/>
        <rect x="64" y="26" width="26" height="14" rx="2" fill="#64748b"/>
        <rect x="64" y="46" width="26" height="14" rx="2" fill="#2563eb"/>
        <rect x="64" y="66" width="26" height="12" rx="2" fill="#d97706"/>
        <rect x="88" y="18" width="10" height="70" rx="2" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <path d="M114 53 L100 53" stroke="#ef4444" stroke-width="2.2"/>
        <polygon points="99,53 105,49 105,57" fill="#ef4444"/>
        <text x="12" y="112" font-size="7.0" fill="#334155">Ref.353 JACK PLATEがケーブル引張り荷重を肩代わり</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">Sony純正 JACK PLATE</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・品番 502789401 (Ref.353)</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・HDMI/USB-C/LAN/音声を金属枠で補強</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・抜き差し時の基板はんだ割れを防止</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・ポート外殻360°接地で静電気遮断</text>
      `);

    case 'mb_oem_fp2438_flex':
      return wrap(`
        <path d="M22 30 L56 30 Q74 30 74 48 L74 72 L108 72" fill="none" stroke="#f97316" stroke-width="10" stroke-linecap="round"/>
        <rect x="16" y="23" width="16" height="14" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="98" y="65" width="16" height="14" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="14" y="17" width="20" height="5" rx="1" fill="#94a3b8"/>
        <rect x="96" y="59" width="20" height="5" rx="1" fill="#94a3b8"/>
        <text x="12" y="112" font-size="7.0" fill="#c2410c">Ref.359 FP-2438 プレスオンB2B＋金属抜け止め板</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#9a3412">FP-2438 フレキ＆B2B押え</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Sony純正 198422111 (Ref.359)</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・パチンと嵌るプレスオンB2Bコネクタ</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・上から金属押さえ板で落下抜け防止</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・100Ω差動整合＋EMIシールド内蔵</text>
      `);

    case 'mb_oem_gyro_cushion_sub':
      return wrap(`
        <rect x="28" y="24" width="76" height="12" rx="3" fill="#64748b"/>
        <rect x="34" y="40" width="64" height="18" rx="2" fill="#059669" stroke="#065f46"/>
        <rect x="58" y="44" width="16" height="10" fill="#1e293b"/>
        <rect x="28" y="62" width="76" height="12" rx="3" fill="#475569"/>
        <path d="M14 26 L24 34 L14 42" fill="none" stroke="#ef4444" stroke-width="1.6"/>
        <text x="40" y="33" font-size="6.2" fill="#fff">防振クッション(407)</text>
        <text x="40" y="71" font-size="6.2" fill="#fff">防振クッション(409)</text>
        <text x="12" y="112" font-size="7.0" fill="#065f46">GY-1018を上下スポンジで浮かせシャッター衝撃遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#065f46">GY-1018 ジャイロ防振構造</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.408基板＋Ref.407/409二重スポンジ</text>
        <text x="144" y="60" font-size="6.4" fill="#047857">・手ブレ(低周波)だけ通し衝撃波を吸収</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・1/8000sシャッター衝撃の誤補正防止</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・柔軟FPC接続で振動伝達経路を遮断</text>
      `);

    // =========================================================================
    // Group 3: PCB Thermal-Electrical Physics, Sensing & Isolation (M47–M54)
    // =========================================================================
    case 'mb_pcb_vippo_thermal_vias':
      return wrap(`
        <rect x="24" y="20" width="88" height="12" rx="2" fill="#0f766e"/>
        <rect x="18" y="36" width="100" height="36" rx="2" fill="#0e5a44"/>
        <rect x="30" y="34" width="7" height="40" fill="#ea580c"/>
        <rect x="46" y="34" width="7" height="40" fill="#ea580c"/>
        <rect x="62" y="34" width="7" height="40" fill="#ea580c"/>
        <rect x="78" y="34" width="7" height="40" fill="#ea580c"/>
        <rect x="94" y="34" width="7" height="40" fill="#ea580c"/>
        <rect x="18" y="51" width="100" height="5" fill="#d97706"/>
        <rect x="24" y="74" width="88" height="10" rx="2" fill="#c26234"/>
        <text x="44" y="29" font-size="6.3" fill="#fff">4nm ISP Die</text>
        <text x="12" y="112" font-size="7.0" fill="#c2410c">φ0.15mm純銅充填ビア300本が樹脂基板を熱貫通</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#9a3412">VIPPO 銅充填サーマルビア</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・熱を通さないFR-4基板を貫く銅の柱</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・基板厚み方向の熱伝導を50倍以上に</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・2oz厚銅内層プレーンで横にも拡散</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・平坦めっき仕上げでBGAボイドゼロ</text>
      `);

    case 'mb_ntc_thermistor_array':
      return wrap(`
        <rect x="18" y="20" width="100" height="66" rx="4" fill="#0e5a44" stroke="#064e3b"/>
        <circle cx="42" cy="38" r="7" fill="#ef4444" opacity="0.85"/>
        <circle cx="94" cy="36" r="7" fill="#f59e0b" opacity="0.85"/>
        <circle cx="46" cy="70" r="7" fill="#14b8a6" opacity="0.85"/>
        <circle cx="92" cy="68" r="7" fill="#38bdf8" opacity="0.85"/>
        <text x="39" y="41" font-size="6.5" fill="#fff">1</text>
        <text x="91" y="39" font-size="6.5" fill="#fff">2</text>
        <text x="43" y="73" font-size="6.5" fill="#fff">3</text>
        <text x="89" y="71" font-size="6.5" fill="#fff">4</text>
        <text x="12" y="112" font-size="7.0" fill="#0f766e">4点の超小型体温計(±0.5℃)が熱停止温度を監視</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#115e59">4ゾーン0402 NTC温度網</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・1×0.5mm極小セラミック温度センサー</text>
        <text x="144" y="60" font-size="6.4" fill="#0f766e">・ISP/カード/電源/外装の4点を常時監視</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・「自動電源OFF温度:標準/高」を精密制御</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・熱暴走や低温火傷を未然に防止</text>
      `);

    case 'mb_emi_conductive_gaskets':
      return wrap(`
        <rect x="18" y="22" width="100" height="12" rx="2" fill="#475569"/>
        <rect x="30" y="34" width="76" height="24" rx="5" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
        <path d="M36 38 L98 54 M36 54 L98 38" stroke="#e2e8f0" stroke-width="1.2" opacity="0.7"/>
        <rect x="18" y="58" width="100" height="14" rx="2" fill="#0e5a44"/>
        <path d="M18 46 L28 46" stroke="#ef4444" stroke-width="1.8"/>
        <line x1="28" y1="40" x2="28" y2="52" stroke="#ef4444" stroke-width="2"/>
        <text x="42" y="49" font-size="6.5" font-weight="bold" fill="#0f172a">Ni/Cu 導電スポンジ</text>
        <text x="12" y="112" font-size="7.0" fill="#475569">金属糸布巻きスポンジで隙間ノイズを75dB超遮断</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">Ni/Cu導電EMIガスケット</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・金属めっき布で包んだ弾性クッション</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・30%圧縮で抵抗&lt;0.05Ωの360°接地</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・高周波電波漏れ(EMI)を1/5000以下に</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・Wi-Fi感度＆マイク音声ノイズを保護</text>
      `);

    case 'mb_battery_thermal_baffle':
      return wrap(`
        <rect x="16" y="24" width="28" height="60" rx="3" fill="#ef4444" opacity="0.85"/>
        <rect x="48" y="20" width="6" height="68" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="54" y="20" width="14" height="68" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="2 2"/>
        <rect x="68" y="20" width="8" height="68" fill="#334155"/>
        <rect x="82" y="24" width="34" height="60" rx="4" fill="#10b981"/>
        <path d="M44 44 L36 52 L44 60" fill="none" stroke="#fff" stroke-width="1.6"/>
        <text x="19" y="56" font-size="6.2" fill="#fff">熱60℃</text>
        <text x="87" y="56" font-size="6.2" fill="#fff">電池室</text>
        <text x="12" y="112" font-size="7.0" fill="#047857">アルミ反射＋静止空気層＋PPS壁の魔法びん断熱</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#065f46">電池室・断熱エア隔壁</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・熱に弱いリチウム電池を熱源から隔離</text>
        <text x="144" y="60" font-size="6.4" fill="#047857">・アルミ反射膜が赤外輻射熱92%を反射</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・静止空気層(銅の1/15000)で熱を遮断</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・電池劣化や充電停止トラブルを防止</text>
      `);

    case 'mb_rear_lcd_thermal_cushion':
      return wrap(`
        <rect x="20" y="20" width="96" height="16" rx="2" fill="#d97706"/>
        <rect x="20" y="40" width="96" height="18" rx="4" fill="#475569" stroke="#1e293b"/>
        <circle cx="36" cy="49" r="3" fill="#94a3b8"/>
        <circle cx="56" cy="49" r="3" fill="#94a3b8"/>
        <circle cx="76" cy="49" r="3" fill="#94a3b8"/>
        <circle cx="96" cy="49" r="3" fill="#94a3b8"/>
        <rect x="20" y="62" width="96" height="18" rx="2" fill="#0284c7"/>
        <text x="38" y="31" font-size="6.3" fill="#fff">冷却プレート側</text>
        <text x="36" y="74" font-size="6.3" fill="#fff">背面LCD＆顔側</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">独立気泡シリコン断熱スポンジでLCDと頬を保護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">背面断熱シリコンクッション</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・空気泡を閉じ込めた低熱伝導フォーム</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・熱を顔や液晶ではなく金属骨格へ誘導</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・低温火傷防止＆LCD高温変色を回避</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・背面カバー押圧からの衝撃も緩衝</text>
      `);

    case 'mb_sigma_sensor_thermal_link':
      return wrap(`
        <rect x="18" y="24" width="26" height="58" rx="3" fill="#0d9488"/>
        <path d="M44 34 L68 34 L52 53 L68 72 L90 72" fill="none" stroke="#1e293b" stroke-width="5" stroke-linejoin="round"/>
        <rect x="88" y="24" width="28" height="58" rx="3" fill="#64748b"/>
        <text x="20" y="56" font-size="6.0" fill="#fff">IBIS</text>
        <text x="92" y="56" font-size="6.0" fill="#fff">M16骨格</text>
        <text x="12" y="112" font-size="7.0" fill="#0f766e">Σ字型柔軟グラファイト橋で手ブレ補正を妨げず放熱</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#374151"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#111827">Σグラファイト放熱結合部</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・浮遊するセンサーの熱を5倍効率排出</text>
        <text x="144" y="60" font-size="6.4" fill="#0f766e">・Σ字折返しで5軸IBISの動きを邪魔せず</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・静止端をM16中フレームへ熱ドッキング</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・センサー暗電流ノイズ上昇を抑制</text>
      `);

    case 'mb_vrm_copper_busbar':
      return wrap(`
        <rect x="16" y="34" width="24" height="36" rx="3" fill="#10b981"/>
        <rect x="40" y="44" width="52" height="16" rx="2" fill="#d97706" stroke="#92400e" stroke-width="1.6"/>
        <rect x="92" y="34" width="26" height="36" rx="3" fill="#0f766e"/>
        <path d="M44 52 L88 52" stroke="#fef08a" stroke-width="2.4"/>
        <polygon points="90,52 83,48 83,56" fill="#fef08a"/>
        <text x="20" y="55" font-size="6.2" fill="#fff">電池</text>
        <text x="97" y="55" font-size="6.2" fill="#fff">ISP</text>
        <text x="12" y="112" font-size="7.0" fill="#b45309">抵抗1mΩ未満の純銅バスバーで20A大電流ロス激減</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#92400e">大電流VRM純銅バスバー</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・通常配線の10倍断面積の純銅幹線</text>
        <text x="144" y="60" font-size="6.4" fill="#b45309">・I²R発熱を90%削減し電池持ち向上</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・8K録画＋30fps連写時のピーク20A対応</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・ショットキー保護素子で逆起電力遮断</text>
      `);

    case 'mb_esd_gnd_spring_clips':
      return wrap(`
        <rect x="18" y="66" width="100" height="16" rx="2" fill="#0e5a44"/>
        <rect x="18" y="22" width="100" height="14" rx="2" fill="#64748b"/>
        <path d="M40 66 L40 54 Q52 38 66 36 L60 44" fill="none" stroke="#eab308" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M84 66 L84 54 Q96 38 110 36" fill="none" stroke="#eab308" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M26 12 L34 22 L28 22 L36 32" fill="none" stroke="#ef4444" stroke-width="1.8"/>
        <text x="48" y="32" font-size="6.3" fill="#fff">MgシャーシGND</text>
        <text x="48" y="77" font-size="6.3" fill="#fff">12層HDI基板</text>
        <text x="12" y="112" font-size="7.0" fill="#a16207">外周8点の金メッキCuBe2バネ足が±15kV静電気を逃がす</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#854d0e">CuBe2 ESD接地バネ群</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・冬の1万V静電気を骨格へ逃がす避雷針</text>
        <text x="144" y="60" font-size="6.4" fill="#a16207">・外周8点配置で接触抵抗&lt;10mΩ維持</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・へたりにくいベリリウム銅＋金めっき</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・4nm超微細半導体の静電破壊を防止</text>
      `);

    default:
      return null;
  }
}
