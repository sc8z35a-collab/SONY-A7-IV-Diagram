import { PartExplanation } from '../assemblies/types';

/**
 * 22 bespoke technical SVG schematics (320x118) for Phase 13 Standalone Ultra-Micro Dissection:
 *  - Camera Body Standalone Micro (+22: B39–B60)
 */
export function renderPhase13BodySchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    case 'body_main_internal_frame':
      return wrap(`
        <rect x="20" y="22" width="98" height="60" rx="5" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <rect x="44" y="34" width="48" height="36" rx="3" fill="#ffffff" stroke="#475569" stroke-width="1.5"/>
        <line x1="20" y1="22" x2="44" y2="34" stroke="#64748b" stroke-width="1.4"/>
        <line x1="118" y1="22" x2="92" y2="34" stroke="#64748b" stroke-width="1.4"/>
        <line x1="20" y1="82" x2="44" y2="70" stroke="#64748b" stroke-width="1.4"/>
        <line x1="118" y1="82" x2="92" y2="70" stroke="#64748b" stroke-width="1.4"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.362 AZ91D中心骨格: ねじり剛性 +65%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">中枢骨格 MAIN FRAME ASSY</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.362 (X50022761)内部主フレーム</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・マウント/IBIS/基板/三脚座を4方向直結</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・重要基準面CNC二次切削で光軸誤差排除</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・ISP＆センサーの最終放熱ヒートマス兼務</text>
      `);

    case 'body_side_cabinet':
      return wrap(`
        <rect x="34" y="18" width="66" height="68" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
        <rect x="46" y="26" width="20" height="14" rx="2" fill="#475569"/>
        <rect x="46" y="44" width="20" height="14" rx="2" fill="#475569"/>
        <rect x="46" y="62" width="20" height="14" rx="2" fill="#475569"/>
        <circle cx="82" cy="70" r="2" fill="#94a3b8"/><circle cx="88" cy="70" r="2" fill="#94a3b8"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.8 独立着脱サイド外装＋3分割防水溝</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#334155"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">左側面外装 SIDE CABINET ASSY</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.8 (X50022801)独立サイド殻</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・I/O扉下隠しねじ×4＋スピーカー横ねじ</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・1.4mmラビリンス段差で端子部浸水阻止</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・HDMI/USB修理アクセス性を劇的に向上</text>
      `);

    case 'body_bottom_inner_plate':
      return wrap(`
        <rect x="20" y="34" width="98" height="14" rx="2" fill="#10b981" stroke="#047857"/>
        <rect x="20" y="50" width="98" height="12" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <rect x="20" y="66" width="98" height="14" rx="2" fill="#1e293b"/>
        <path d="M52 88 L52 78 M86 88 L86 78" stroke="#0284c7" stroke-width="2"/>
        <text x="12" y="112" font-size="7.1" fill="#047857">Ref.14 SUS内板＋Ref.17防水ポッティング</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#065f46">底面二重インナー板＆防水封止</text>
        <text x="144" y="48" font-size="6.6" fill="#047857">・Sony Ref.14内板＋Ref.17 WP POTTING</text>
        <text x="144" y="62" font-size="6.6" fill="#047857">・水たまり・濡れ地面からの毛細管浸水遮断</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・二重底で断面二次モーメント2.8倍剛性化</text>
        <text x="144" y="89" font-size="6.6" fill="#059669">・底面10本ねじ軸力を均等分散・三脚補強</text>
      `);

    case 'body_grip_adhesive_sheets':
      return wrap(`
        <path d="M26 24 Q58 18 72 44 L72 78 Q46 84 26 74 Z" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
        <rect x="80" y="28" width="32" height="48" rx="3" fill="#fde68a" stroke="#b45309" stroke-width="1.6"/>
        <circle cx="48" cy="40" r="3" fill="#64748b"/><circle cx="48" cy="64" r="3" fill="#64748b"/>
        <text x="12" y="112" font-size="7.1" fill="#92400e">Ref.11/12 2分割耐汗アクリル強粘着シート</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#78350f">グリップ専用2分割粘着シート</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・Sony Ref.11(ADHESIVE 1)/Ref.12(ADHESIVE 2)</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・耐皮脂・耐汗アクリルでグリップ浮き防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・隠しビス穴を全面シールし手汗浸水遮断</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・Note 1指定: サービス分解時新品交換必須</text>
      `);

    case 'body_shoe_cap_cover':
      return wrap(`
        <rect x="26" y="20" width="84" height="16" rx="3" fill="#1e293b"/>
        <rect x="34" y="42" width="68" height="12" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="30" y="62" width="76" height="14" rx="3" fill="#10b981" stroke="#047857"/>
        <text x="48" y="31" font-size="6.4" fill="#f8fafc">SHOE CAP</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.9保護蓋＋Ref.329ねじ蓋＋Ref.324防水ゴム</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">MIシュー保護キャップ＆内部防水</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Ref.9 SHOE CAPが0.5mm21ピン端子保護</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・Ref.329ねじ隠し蓋で上部から増し締め可</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・Ref.324 FPC防水ゴムがボディ貫通口密閉</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・最上部降雨に対する二重防滴アーキテクチャ</text>
      `);

    case 'body_gyro_sensor_unit':
      return wrap(`
        <rect x="24" y="24" width="88" height="12" rx="2" fill="#475569"/>
        <rect x="30" y="40" width="76" height="22" rx="3" fill="#15803d" stroke="#14532d"/>
        <rect x="56" y="45" width="24" height="12" rx="1" fill="#1e293b"/>
        <rect x="24" y="66" width="88" height="12" rx="2" fill="#64748b"/>
        <text x="58" y="54" font-size="6.5" fill="#fde047">GYRO</text>
        <text x="12" y="112" font-size="7.1" fill="#15803d">二重制振クッション: LPF f_c≈250Hz機械濾波</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#14532d">独立防振3軸ジャイロ GY-1018</text>
        <text x="144" y="48" font-size="6.6" fill="#15803d">・Sony Ref.408基板＋Ref.407/409二重クッション</text>
        <text x="144" y="62" font-size="6.6" fill="#15803d">・2kHzシャッター衝撃を−26dB機械遮断</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・手ブレ0.5–20Hzだけを純粋に高感度抽出</text>
        <text x="144" y="89" font-size="6.6" fill="#16a34a">・熱源ISPから分離配置しゼロ点ドリフト抑制</text>
      `);

    case 'body_still_movie_sq_lever':
      return wrap(`
        <circle cx="64" cy="52" r="28" fill="#1e293b" stroke="#0f172a"/>
        <circle cx="64" cy="52" r="16" fill="#f8fafc" stroke="#64748b"/>
        <rect x="86" y="46" width="24" height="12" rx="3" fill="#334155"/>
        <circle cx="42" cy="52" r="4" fill="#cbd5e1" stroke="#0f172a"/>
        <circle cx="64" cy="28" r="3" fill="#ef4444"/>
        <text x="12" y="112" font-size="7.1" fill="#991b1b">Ref.319–322 鋼球3段クリック＋防水クッション</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7f1d1d">静止画/動画/S&amp;Q 同軸切替ダイヤル</text>
        <text x="144" y="48" font-size="6.6" fill="#991b1b">・モードダイヤル下段の同心2段リング構造</text>
        <text x="144" y="62" font-size="6.6" fill="#991b1b">・鋼球(Ref.321)＋バネ(Ref.319)で18mN·m節度</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・SV WP CUSHION B(Ref.322)で回転部防滴</text>
        <text x="144" y="89" font-size="6.6" fill="#b91c1c">・写真/動画メニュー完全独立切替の要</text>
      `);

    case 'body_strap_triangles':
      return wrap(`
        <polygon points="70,22 104,76 36,76" fill="none" stroke="#64748b" stroke-width="4.5" stroke-linejoin="round"/>
        <rect x="52" y="36" width="36" height="28" rx="4" fill="#1e293b" opacity="0.88"/>
        <text x="58" y="53" font-size="6.8" fill="#f8fafc">POM</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">破断荷重&gt;450N SUS三角環＋静音ホルダー</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">静音三角ストラップ環＆保護ホルダー</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.315三角環＋Ref.314樹脂ホルダー</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・動画収録中のカチャ音共振を−18dB抑制</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・φ1.4mm SUS304安全率15倍超の耐衝撃</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・マグネシウム外装塗装の擦れ傷を同時防止</text>
      `);

    case 'body_dc_coupler_flap':
      return wrap(`
        <rect x="20" y="30" width="96" height="44" rx="5" fill="#334155" stroke="#0f172a"/>
        <rect x="68" y="38" width="36" height="28" rx="4" fill="#10b981" stroke="#047857" stroke-width="1.6"/>
        <path d="M86 52 L120 52" stroke="#eab308" stroke-width="3.5"/>
        <text x="26" y="55" font-size="6.5" fill="#f8fafc">BT LID</text>
        <text x="12" y="112" font-size="7.1" fill="#047857">扉閉ロックのままφ3.2mm DC電源線を通線</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#065f46">外部DCカプラー防水ゴム通し口</text>
        <text x="144" y="48" font-size="6.6" fill="#047857">・バッテリー扉ロック維持でAC連続給電</text>
        <text x="144" y="62" font-size="6.6" fill="#047857">・55A EPDM二段リップで通常時は防塵封止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・扉安全インターロックを保ったまま動作</text>
        <text x="144" y="89" font-size="6.6" fill="#059669">・スタジオ長回し・天体タイムラプス必須</text>
      `);

    case 'body_muffle_cushions':
      return wrap(`
        <rect x="22" y="24" width="54" height="36" rx="4" fill="#2b2624" stroke="#64748b"/>
        <rect x="82" y="24" width="32" height="54" rx="4" fill="#475569" stroke="#334155"/>
        <path d="M26 72 Q42 62 58 72 T76 72" fill="none" stroke="#ef4444" stroke-width="1.6"/>
        <path d="M26 82 Q42 80 58 82 T76 82" fill="none" stroke="#10b981" stroke-width="1.6"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.76/59 連続気泡吸音: 2–8kHz −4.2dBA</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">背面静音吸音 REAR MUFFLE A &amp; B</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.76(CUSHION A)＋Ref.59(CUSHION B)</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・オープンセル粘性摩擦で金属反響を吸収</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・EVF接眼時のシャッター高音−4.2dBA低減</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・背面パネル〜RFシールド間のビビリ抑制</text>
      `);

    case 'body_card_access_led_pipe':
      return wrap(`
        <rect x="20" y="44" width="16" height="16" rx="2" fill="#ef4444"/>
        <rect x="36" y="46" width="58" height="12" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
        <path d="M36 52 L52 48 L68 56 L84 48 L96 52" fill="none" stroke="#ef4444" stroke-width="1.6"/>
        <circle cx="102" cy="52" r="6" fill="#dc2626"/>
        <rect x="36" y="68" width="58" height="8" rx="1" fill="#eab308"/>
        <text x="12" y="112" font-size="7.1" fill="#991b1b">TIR全反射導光棒＋Ref.75 ESD扉接地シート</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7f1d1d">カード書込LED導光＆扉接地シート</text>
        <text x="144" y="48" font-size="6.6" fill="#991b1b">・臨界角39.3°全反射PCプリズムで警告表示</text>
        <text x="144" y="62" font-size="6.6" fill="#991b1b">・Ref.75接地シート(&lt;0.2Ω)でPCIe静電保護</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・Ref.120扉軸＋Ref.121ばねで滑らか開扉</text>
        <text x="144" y="89" font-size="6.6" fill="#b91c1c">・CFexpress高速書込中の誤抜去破損を防止</text>
      `);

    case 'body_rear_button_retainers':
      return wrap(`
        <rect x="24" y="22" width="20" height="60" rx="2" fill="#1e293b"/>
        <rect x="48" y="22" width="18" height="60" rx="3" fill="#10b981"/>
        <rect x="70" y="22" width="16" height="60" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <rect x="90" y="22" width="16" height="60" rx="2" fill="#ea580c"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">4層防水: キー→ゴムブーツ→SUS押板→FPC</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">背面ボタン押さえ板L/R＆防水ブーツ</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.101(PLATE L)＋Ref.104(PLATE R)</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・4ブロック独立シリコーン防水ブーツ封止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・ジョイスティック保持板(Ref.70/72)連携</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・10万回押下でもパッキン浮き・浸水ゼロ</text>
      `);

    case 'body_top_rec_c2_subassy':
      return wrap(`
        <circle cx="48" cy="36" r="14" fill="#1e293b" stroke="#dc2626" stroke-width="3"/>
        <circle cx="92" cy="36" r="12" fill="#334155"/>
        <rect x="24" y="54" width="90" height="8" rx="2" fill="#10b981"/>
        <rect x="24" y="64" width="90" height="7" rx="1" fill="#cbd5e1" stroke="#334155"/>
        <rect x="24" y="73" width="90" height="6" rx="1" fill="#0f172a"/>
        <text x="12" y="112" font-size="7.1" fill="#991b1b">Ref.264–269 4重防水＆遮光上面ポッド</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7f1d1d">上面REC/C2独立防水ボタンポッド</text>
        <text x="144" y="48" font-size="6.6" fill="#991b1b">・上面降雨直撃に備えるRef.266＋269二重防水</text>
        <text x="144" y="62" font-size="6.6" fill="#991b1b">・Ref.264 SUS押さえ板が鮮明クリック反力保持</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・Ref.265遮光シートが内部光漏れを遮断</text>
        <text x="144" y="89" font-size="6.6" fill="#b91c1c">・RL-1071トップ制御基板へ確実伝達</text>
      `);

    case 'body_focal_plane_badge':
      return wrap(`
        <circle cx="48" cy="50" r="14" fill="none" stroke="#0f172a" stroke-width="2.6"/>
        <line x1="22" y1="50" x2="74" y2="50" stroke="#0f172a" stroke-width="2.6"/>
        <line x1="48" y1="68" x2="48" y2="86" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="3 2"/>
        <rect x="82" y="36" width="34" height="28" rx="4" fill="#d95b26" stroke="#7c2d12"/>
        <text x="92" y="54" font-size="10" font-weight="bold" fill="#ffffff">α</text>
        <text x="12" y="112" font-size="7.1" fill="#1d4ed8">z = 0.00±0.10mm 撮像面距離測量基準点</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#d95b26"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7c2d12">撮像面基準Φマーク＆モデルバッジ</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・横線直下がCMOS受光面(z=0.00mm)と一致</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・マウントフランジ面から正確に後方18.0mm</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・映画メジャー測距＆等倍マクロ4f基準点</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・バッジ下部の隠しサービスねじ保護兼務</text>
      `);

    case 'body_speaker_emi_insulator':
      return wrap(`
        <rect x="20" y="24" width="96" height="16" rx="2" fill="#15803d"/>
        <rect x="20" y="44" width="96" height="12" rx="2" fill="#fde68a" stroke="#ca8a04" stroke-width="1.6"/>
        <rect x="20" y="60" width="96" height="16" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <text x="48" y="53" font-size="6.5" font-weight="bold" fill="#78350f">V_bd &gt; 6kV</text>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">Ref.414/415/356/361 難燃絶縁＆導電接地</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#713f12">スピーカー接地＆背面電気絶縁シート</text>
        <text x="144" y="48" font-size="6.6" fill="#854d0e">・UL94 V-0難燃PCシート(t=0.15mm/6kV耐圧)</text>
        <text x="144" y="62" font-size="6.6" fill="#854d0e">・0.3mm未満極狭空間の金属短絡を完全阻止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・Ref.414 NiCu導電布がスピーカー枠を接地</text>
        <text x="144" y="89" font-size="6.6" fill="#a16207">・落下変形時の発火を防ぐIEC62368安全層</text>
      `);

    case 'body_mag_field_cut_plate':
      return wrap(`
        <rect x="18" y="30" width="22" height="44" rx="3" fill="#ef4444"/>
        <text x="23" y="55" font-size="7" font-weight="bold" fill="#ffffff">N</text>
        <rect x="56" y="20" width="12" height="64" rx="2" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.8"/>
        <path d="M40 36 Q56 36 56 52 Q56 68 40 68" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="82" y="30" width="34" height="44" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <text x="87" y="55" font-size="6.5" fill="#15803d">PCB</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">μ_r&gt;2000強磁性遮蔽: 直流漏れ磁束 −85%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">磁気遮蔽 MAGNETIC FIELD CUT PLATE</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.352 (502789501)実機磁気遮蔽板</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・Mg合金を素通りするDC強磁束をバイパス</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・IBIS強力N52磁石とLCD開閉センサー隔離</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・メイン基板電源インダクタの磁気飽和防止</text>
      `);

    case 'body_hdmi_light_shield':
      return wrap(`
        <rect x="26" y="24" width="76" height="14" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <rect x="34" y="40" width="60" height="22" rx="2" fill="#475569" stroke="#0f172a"/>
        <rect x="26" y="64" width="76" height="14" rx="2" fill="#94a3b8" stroke="#334155"/>
        <rect x="104" y="22" width="8" height="58" fill="#0f172a"/>
        <text x="48" y="54" font-size="7" font-weight="bold" fill="#38bdf8">HDMI A</text>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">HOLDER A/B挟持(&gt;85N)＋Ref.463遮光枠</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0c4a6e">フルHDMI挟持ホルダー＆遮光シート</text>
        <text x="144" y="48" font-size="6.6" fill="#0369a1">・Ref.467(A)＋465(B)鋼鉄クランプ骨格固定</text>
        <text x="144" y="62" font-size="6.6" fill="#0369a1">・太径シネマケーブルこじりによる基板破損減</text>
        <text x="144" y="76" font-size="6.6" fill="#1e40af">・Ref.463遮光シートがHDMI大開口光漏れ封止</text>
        <text x="144" y="89" font-size="6.6" fill="#0284c7">・HD-1009独立フレキで低コスト部分交換</text>
      `);

    case 'body_vg_fpc_retainer':
      return wrap(`
        <path d="M36 22 L36 74 L106 74" fill="none" stroke="#ea580c" stroke-width="10"/>
        <rect x="26" y="34" width="22" height="28" rx="2" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <circle cx="37" cy="48" r="3" fill="#475569"/>
        <text x="58" y="64" font-size="6.8" font-weight="bold" fill="#9a3412">6A / 2oz Cu</text>
        <text x="12" y="112" font-size="7.1" fill="#9a3412">Ref.404 2oz厚銅フレキ＋Ref.403 SUS押え板</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7c2d12">縦グリフレキVG-1007＆押さえ板</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・70μm(2oz)厚銅電源バスで6A低損失伝送</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・Ref.403 SUS板が電池挿抜の擦れ断線防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・縦位置シャッター/ダイヤル通信を同時統合</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・2本電池の無瞬断自動電源切替を支える</text>
      `);

    case 'body_top_antenna_coax':
      return wrap(`
        <rect x="22" y="22" width="76" height="26" rx="3" fill="#15803d" stroke="#14532d"/>
        <path d="M30 34 L52 34 L52 28 L72 28 L72 40 L90 40" fill="none" stroke="#fde047" stroke-width="2.4"/>
        <path d="M98 35 Q116 35 112 58 Q106 78 68 78" fill="none" stroke="#d97706" stroke-width="3.2"/>
        <path d="M40 16 Q60 6 80 16" fill="none" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">Ref.262 2.4/5GHz基板＋Ref.263 45mm 50Ω同軸</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#713f12">トップ無線アンテナAN-1043＆同軸</text>
        <text x="144" y="48" font-size="6.6" fill="#854d0e">・金属外装電波遮蔽を回避する上部樹脂窓配置</text>
        <text x="144" y="62" font-size="6.6" fill="#854d0e">・φ0.81mm 50Ω同軸45mm(損失&lt;0.25dB)</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・手持ち把持でも遮られない高利得Wi-Fi</text>
        <text x="144" y="89" font-size="6.6" fill="#a16207">・Kolari A7R V/A1分解確認の実機RF構成</text>
      `);

    case 'body_power_lever_mechanism':
      return wrap(`
        <circle cx="64" cy="48" r="24" fill="#334155" stroke="#0f172a"/>
        <circle cx="64" cy="48" r="14" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="64" cy="48" r="19" fill="none" stroke="#ef4444" stroke-width="3"/>
        <rect x="82" y="40" width="26" height="14" rx="3" fill="#1e293b"/>
        <text x="12" y="112" font-size="7.1" fill="#991b1b">同軸30°回転レバー＋動的防水赤Oリング</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7f1d1d">同軸電源レバー＆軸防水Oリング</text>
        <text x="144" y="48" font-size="6.6" fill="#991b1b">・シャッター軸とφ14mm内へ精密同軸配置</text>
        <text x="144" y="62" font-size="6.6" fill="#991b1b">・高潤滑赤シリコーンOリングで360°動的防水</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・SUS二位置板ばね(14mN·m)で確実節度感</text>
        <text x="144" y="89" font-size="6.6" fill="#b91c1c">・右人差し指0.2秒起動の即応エルゴ設計</text>
      `);

    case 'body_mic_rubber_mount':
      return wrap(`
        <rect x="20" y="58" width="98" height="14" rx="3" fill="#334155"/>
        <rect x="30" y="30" width="28" height="32" rx="6" fill="#2b2624" stroke="#06b6d4" stroke-width="1.8"/>
        <rect x="37" y="36" width="14" height="18" rx="2" fill="#eab308"/>
        <rect x="80" y="30" width="28" height="32" rx="6" fill="#2b2624" stroke="#06b6d4" stroke-width="1.8"/>
        <rect x="87" y="36" width="14" height="18" rx="2" fill="#eab308"/>
        <text x="12" y="112" font-size="7.1" fill="#0e7490">30A軟質ブーツ: ボディ伝搬ノイズ −14dB</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#164e63">ステレオマイク防振ブーツ＆ホルダー</text>
        <text x="144" y="48" font-size="6.6" fill="#155e75">・Sony Ref.304防振ゴム＋Ref.308保持枠</text>
        <text x="144" y="62" font-size="6.6" fill="#155e75">・30 Shore A超軟質フローティング支持</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・IBIS/AFレンズ駆動音の固体伝搬を−14dB</text>
        <text x="144" y="89" font-size="6.6" fill="#0e7490">・疎水ePTFE音響網と組合せ防滴＆防風</text>
      `);

    case 'body_rear_lc_cover_seals':
      return wrap(`
        <rect x="20" y="22" width="84" height="60" rx="4" fill="#334155" stroke="#10b981" stroke-width="3"/>
        <rect x="96" y="38" width="18" height="28" rx="4" fill="#2b2624" stroke="#3b82f6" stroke-width="1.8"/>
        <line x1="90" y1="52" x2="122" y2="52" stroke="#eab308" stroke-width="3"/>
        <circle cx="32" cy="34" r="2.6" fill="#cbd5e1"/><circle cx="88" cy="34" r="2.6" fill="#cbd5e1"/><circle cx="62" cy="70" r="2.6" fill="#cbd5e1"/>
        <text x="12" y="112" font-size="7.1" fill="#1d4ed8">Ref.53 LCDポケット壁＋Ref.78防水グロメット</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#1e3a8a">背面LCD収納カバー＆ケーブルグロメット</text>
        <text x="144" y="48" font-size="6.6" fill="#1e40af">・Ref.53カバー＋Ref.54/124二重防水クッション</text>
        <text x="144" y="62" font-size="6.6" fill="#1e40af">・Ref.78 SV WPグロメットが同軸線を360°封止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・バリアングル展開時の雨塵侵入を完全阻止</text>
        <text x="144" y="89" font-size="6.6" fill="#2563eb">・背面3本隠しねじ保護＆LCD単体整備性両立</text>
      `);

    default:
      return null;
  }
}
