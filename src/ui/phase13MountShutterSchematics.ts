import { PartExplanation } from '../assemblies/types';

/**
 * 34 bespoke technical SVG schematics (320x118) for Phase 13 Standalone Ultra-Micro Dissection:
 *  - Mount Standalone Micro (+16: M27–M42)
 *  - Shutter Standalone Micro (+18: SH40–SH57)
 */
export function renderPhase13MountShutterSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // MOUNT STANDALONE MICRO (+16: M27–M42)
    // =========================================================================
    case 'mount_cinnabar_ring':
      return wrap(`
        <circle cx="70" cy="54" r="34" fill="none" stroke="#d95b26" stroke-width="6"/>
        <circle cx="70" cy="54" r="27" fill="none" stroke="#94a3b8" stroke-width="4"/>
        <circle cx="70" cy="54" r="20" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
        <path d="M104 42 L116 32" stroke="#d95b26" stroke-width="1.5"/>
        <text x="12" y="112" font-size="7.1" fill="#9a3412">A6061シナバー化粧環: δ≤0.10mm防滴段差</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#d95b26"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7c2d12">シナバー化粧ベゼル＆段差トリム</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・15μm硬質アルマイト封孔で耐摩耗保持</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・Mg外装開口とSUSフランジ隙間を閉塞</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・外周ラビリンス前段で飛沫侵入を遮断</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・Sony α7 IV / α1 II象徴のオレンジ環</text>
      `);

    case 'mount_index_inlay':
      return wrap(`
        <rect x="24" y="36" width="92" height="24" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
        <rect x="61" y="24" width="18" height="36" rx="3" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
        <path d="M61 24 Q70 18 79 24" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="55" y="60" width="30" height="10" rx="2" fill="#64748b"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">背面圧入ソリッド指標(+0.08mm触覚識別)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">白色セラミック樹脂装着指標ピン</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・φ2.2mm貫通圧入で塗装剥がれ完全ゼロ</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・背面Dカットスリーブで回転脱落を防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・暗所でも指先で探れる微細ドーム形状</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・レンズ装着角を0.2°以内で直感案内</text>
      `);

    case 'mount_split_leaf_sp2':
      return wrap(`
        <path d="M36 52 A34 34 0 0 1 104 52" fill="none" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
        <path d="M44 76 A34 34 0 0 0 96 76" fill="none" stroke="#94a3b8" stroke-width="6" stroke-dasharray="4 2"/>
        <circle cx="52" cy="30" r="4" fill="#eab308"/>
        <circle cx="88" cy="30" r="4" fill="#eab308"/>
        <text x="48" y="54" font-size="7" font-weight="bold" fill="#0f172a">SP2 (k₂)</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">上部高予圧SP2＋SP1非対称2分割ばね</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">補助分割板バネ MB N PLATE SP2</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.554(SP1)/555(SP2)2分割構造</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・ロックピン＆12ピン接点開口を精密回避</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・上部高剛性比1.25で望遠お辞儀を防止</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・総軸予圧約38Nでフランジガタ皆無</text>
      `);

    case 'mount_locating_pin_h':
      return wrap(`
        <rect x="20" y="34" width="44" height="40" rx="3" fill="#cbd5e1" stroke="#334155"/>
        <rect x="76" y="34" width="44" height="40" rx="3" fill="#94a3b8" stroke="#334155"/>
        <rect x="44" y="47" width="52" height="14" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="64" y="43" width="12" height="22" rx="1" fill="#eab308" stroke="#854d0e"/>
        <text x="12" y="112" font-size="7.1" fill="#1e293b">h6研削ノックピン: 光軸芯出し ±5μm</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">光軸芯出しピン MB N PIN (H)</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.558 (444353001)紛失厳禁部品</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・ねじ穴遊びと独立した運動学的基準ピン</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・SUS440C焼入研削(±4μm)で同軸再現</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・12ピン接点着地精度0.1mm以内を保証</text>
      `);

    case 'mount_contact_holder_ab':
      return wrap(`
        <path d="M24 38 Q70 22 116 38 L112 54 Q70 40 28 54 Z" fill="#334155" stroke="#0f172a"/>
        <path d="M28 60 Q70 46 112 60 L116 76 Q70 60 24 76 Z" fill="#1e293b" stroke="#0f172a"/>
        <circle cx="48" cy="48" r="2.6" fill="#eab308"/><circle cx="62" cy="45" r="2.6" fill="#eab308"/>
        <circle cx="78" cy="45" r="2.6" fill="#eab308"/><circle cx="92" cy="48" r="2.6" fill="#eab308"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">LCP上下二分割キャリアA/B＋スナップ爪</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">接点上下ホルダー MB N HOLDER A/B</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・1.65mmピッチ12本ポゴピンを±20μm整列</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・GF30% LCP液晶ポリマーで高耐熱絶縁</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・一体スナップ爪で横せん断短絡を防止</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・US10831084B2/ILCE-7SM2 SM準拠構造</text>
      `);

    case 'mount_contact_screws':
      return wrap(`
        <rect x="26" y="34" width="18" height="32" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <rect x="96" y="34" width="18" height="32" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <path d="M44 54 L64 46 L76 58 L96 48" fill="none" stroke="#eab308" stroke-width="3"/>
        <text x="52" y="30" font-size="7" font-weight="bold" fill="#a16207">ESD &lt;0.05Ω</text>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">M1.7×4.0ねじ2本＋導電ESDバイパスばね</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#713f12">接点締結ねじ＆ESD接地スプリング</text>
        <text x="144" y="48" font-size="6.6" fill="#854d0e">・Sony Ref.556 M1.7×4.0精密締結×2</text>
        <text x="144" y="62" font-size="6.6" fill="#854d0e">・特許US4637704A導電ばねでGND同電位化</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・レンズCMOSラッチアップ破壊を完全阻止</text>
        <text x="144" y="89" font-size="6.6" fill="#a16207">・ハンダ不要のねじ締結同時圧接設計</text>
      `);

    case 'mount_ll_button_spring':
      return wrap(`
        <rect x="22" y="36" width="22" height="32" rx="4" fill="#334155"/>
        <path d="M44 46 L52 38 L60 58 L68 38 L76 58 L84 38 L92 52" fill="none" stroke="#475569" stroke-width="2.4"/>
        <rect x="92" y="32" width="24" height="40" rx="3" fill="#e2e8f0" stroke="#64748b"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">ボタン独立復帰ばね(4.5N)＋POMスリーブ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">解除ボタン独立復帰バネ(Ref.562)</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・ロックピンばね(Ref.563)と完全独立2ばね</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・ボタンの浮き・カタつき遊隙0.00mm化</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・POM摺動スリーブで−20℃でも軽快復帰</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・操作力約4.5Nで誤解除と片手操作両立</text>
      `);

    case 'mount_lock_eclip_retainer':
      return wrap(`
        <rect x="24" y="46" width="84" height="12" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <path d="M44 30 A18 18 0 1 1 44 74 L48 64 A9 9 0 1 0 48 40 Z" fill="#475569" stroke="#0f172a"/>
        <rect x="86" y="36" width="10" height="32" rx="3" fill="#f59e0b" opacity="0.8" stroke="#b45309"/>
        <text x="12" y="112" font-size="7.1" fill="#92400e">JIS E形止め輪(剪断280N)＋含油フェルト環</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#78350f">ロックピンEリング＆防塵ワイパー</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・SUS304 E形止め輪でピン前飛び出し阻止</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・含油フェルトワイパーが砂粒噛み込み防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・5万回着脱でも突出精度±0.05mmを維持</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・レンズが外れなくなる固着トラブル根絶</text>
      `);

    case 'mount_jack_shield_block':
      return wrap(`
        <rect x="18" y="28" width="28" height="48" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        <text x="22" y="55" font-size="6.2" fill="#1d4ed8">PWM</text>
        <rect x="58" y="20" width="16" height="64" rx="2" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <rect x="86" y="28" width="32" height="48" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <text x="90" y="55" font-size="6.2" fill="#15803d">Audio</text>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.564金属EMI隔壁: 結合ノイズ −34dB</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">側面遮蔽 MB JACK SHIELD BLOCK</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.564 (500972301)実機EMI隔壁</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・マウントPWMと左側面音声/HDMIを隔離</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・24bit外部マイク収録の雑音床−95dBV維持</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・左側面骨格のねじり補強ガセットも兼務</text>
      `);

    case 'mount_mask_sheet_tape':
      return wrap(`
        <rect x="22" y="22" width="96" height="62" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.8"/>
        <circle cx="70" cy="53" r="21" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>
        <rect x="26" y="26" width="88" height="4" fill="#d97706" opacity="0.8"/>
        <rect x="26" y="76" width="88" height="4" fill="#d97706" opacity="0.8"/>
        <text x="12" y="112" font-size="7.1" fill="#0f172a">OD&gt;6.0遮光PCシート(t=0.12mm)＋両面テープ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">背面遮光シート MB MASK SHEET</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.567シート＋Ref.566専用テープ</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・透過率10⁻⁶未満で長秒バルブ光漏れゼロ</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・解除ピン穴・FPCスリット隙間を完全封止</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・微細シボ表面がシャッター前面反射を吸収</text>
      `);

    case 'mount_bl_fpc_adhesive':
      return wrap(`
        <path d="M24 38 Q70 20 116 38" fill="none" stroke="#ea580c" stroke-width="7"/>
        <path d="M24 38 Q70 20 116 38" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-dasharray="6 3"/>
        <rect x="52" y="46" width="36" height="32" rx="2" fill="#ea580c"/>
        <rect x="54" y="66" width="32" height="10" rx="1" fill="#2563eb"/>
        <text x="12" y="112" font-size="7.1" fill="#9a3412">BLフレキ密着テープ(631S)＋FR-4補強板</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7c2d12">BLフレキ補強シート＆黒固定テープ</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・Sony 631S #25黒ポリエステル遮光テープ</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・マウント曲面に密着固定し後玉干渉回避</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・橙色FPCの内部反射フレアを黒テープ遮断</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・ZIF端末FR-4スティフナーで確実挿抜</text>
      `);

    case 'mount_bayonet_drain_channel':
      return wrap(`
        <path d="M22 30 L56 30 L56 64 L82 64 L82 30 L118 30 L118 76 L22 76 Z" fill="#cbd5e1" stroke="#334155"/>
        <rect x="61" y="40" width="16" height="18" rx="3" fill="#475569"/>
        <path d="M40 20 L68 38 L68 58" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="68" cy="60" r="3" fill="#0ea5e9"/>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">溝幅1.2mm拡張で毛細管吸込圧 −96%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0c4a6e">ラビリンス排水溝＆撥水フォーム環</text>
        <text x="144" y="48" font-size="6.6" fill="#0369a1">・隙間拡張により毛細管水吸込みを物理遮断</text>
        <text x="144" y="62" font-size="6.6" fill="#0369a1">・独立気泡撥水フォームが二次防波堤を形成</text>
        <text x="144" y="76" font-size="6.6" fill="#1e40af">・下部6時ドレン逃がしで雨水を安全排出</text>
        <text x="144" y="89" font-size="6.6" fill="#0284c7">・豪雨・潮風環境のプロ耐候シーリング</text>
      `);

    case 'mount_im_adjust_washer':
      return wrap(`
        <circle cx="44" cy="48" r="18" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
        <circle cx="44" cy="48" r="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="54" y="36" font-size="7.2" font-weight="bold" fill="#1d4ed8">35</text>
        <rect x="78" y="28" width="38" height="6" fill="#93c5fd" stroke="#1d4ed8"/>
        <rect x="78" y="38" width="38" height="10" fill="#60a5fa" stroke="#1d4ed8"/>
        <rect x="78" y="52" width="38" height="16" fill="#2563eb" stroke="#1e3a8a"/>
        <text x="12" y="112" font-size="7.1" fill="#1d4ed8">25〜600μm全12種シム → FFD 18.000±0.003mm</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#1e3a8a">フランジ校正 IM ADJUST WASHER D</text>
        <text x="144" y="48" font-size="6.6" fill="#1e40af">・Sony Ref.456 全12段階セレクション部品</text>
        <text x="144" y="62" font-size="6.6" fill="#1e40af">・25μm無印＋100〜600μm刻印(10〜60)</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・3点ボス組合せで距離と傾きを同時校正</text>
        <text x="144" y="89" font-size="6.6" fill="#2563eb">・F1.2開放の片ボケ＆無限遠ズレを根絶</text>
      `);

    case 'mount_optical_black_coating':
      return wrap(`
        <path d="M22 72 L34 54 L46 72 L58 54 L70 72 L82 54 L94 72 L106 54 L118 72 L118 82 L22 82 Z" fill="#0f172a"/>
        <line x1="22" y1="24" x2="64" y2="62" stroke="#f59e0b" stroke-width="2"/>
        <line x1="64" y1="62" x2="72" y2="54" stroke="#f59e0b" stroke-width="1.2" opacity="0.55"/>
        <line x1="72" y1="54" x2="78" y2="66" stroke="#f59e0b" stroke-width="0.9" opacity="0.3"/>
        <text x="12" y="112" font-size="7.1" fill="#0f172a">静電植毛＋0.25mm鋸歯: 80°反射 &lt;0.08%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">内筒静電植毛＆マイクロ鋸歯吸収帯</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・80°かすめ角入射の反射率を0.08%未満へ</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・通常黒アルマイト比 迷光強度 −24dB</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・ダストフリー熱硬化植毛で繊維脱落ゼロ</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・大口径F1.2逆光時のベールフレア抹消</text>
      `);

    case 'mount_contact_dust_lip':
      return wrap(`
        <path d="M22 44 Q70 28 118 44" fill="none" stroke="#10b981" stroke-width="5"/>
        <path d="M26 66 Q70 52 114 66" fill="none" stroke="#10b981" stroke-width="5"/>
        <circle cx="50" cy="52" r="3" fill="#eab308"/><circle cx="70" cy="49" r="3" fill="#eab308"/><circle cx="90" cy="52" r="3" fill="#eab308"/>
        <path d="M70 18 L70 32" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="12" y="112" font-size="7.1" fill="#047857">LSRシリコーン360°囲繞リップ(40A)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#065f46">接点外周防塵シリコーンリップ環</text>
        <text x="144" y="48" font-size="6.6" fill="#047857">・12ピン接点開口を360°連続LSRゴム封止</text>
        <text x="144" y="62" font-size="6.6" fill="#047857">・7.2V VBATと高速通信線間の結露短絡防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・撥水フッ素コートで水滴濡れ広がり遮断</text>
        <text x="144" y="89" font-size="6.6" fill="#059669">・−30℃極寒でも弾性圧縮率22%を維持</text>
      `);

    case 'mount_body_cap_interface':
      return wrap(`
        <rect x="26" y="24" width="88" height="22" rx="4" fill="#1e293b" stroke="#0f172a"/>
        <rect x="38" y="46" width="64" height="20" rx="2" fill="#334155"/>
        <rect x="28" y="58" width="16" height="8" rx="1" fill="#475569"/>
        <rect x="96" y="58" width="16" height="8" rx="1" fill="#475569"/>
        <circle cx="34" cy="46" r="3" fill="#10b981"/><circle cx="106" cy="46" r="3" fill="#10b981"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.551 3爪バヨネット防塵ボディキャップ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">防塵ボディキャップ (ALC-B1EM)</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.551 (418853601 CAP, BODY)</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・60°3爪係合＋帯電防止ABS/PC防塵蓋</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・レンズ非装着時のセンサー＆シャッター保護</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・外周18条ローレット＋EPDM密閉縁付</text>
      `);

    // =========================================================================
    // SHUTTER STANDALONE MICRO (+18: SH40–SH57)
    // =========================================================================
    case 'shutter_aux_baseplate':
      return wrap(`
        <rect x="20" y="20" width="100" height="64" rx="3" fill="#334155" stroke="#0f172a"/>
        <rect x="38" y="34" width="52" height="36" fill="#ffffff" stroke="#64748b"/>
        <circle cx="28" cy="28" r="3.2" fill="#f8fafc"/><rect x="28" y="26" width="6" height="4" fill="#f8fafc"/>
        <circle cx="110" cy="28" r="3.2" fill="#f8fafc"/><rect x="104" y="26" width="6" height="4" fill="#f8fafc"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">鍵穴横スライド係合: 後幕室 0.55±0.01mm</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">補助地板＆鍵穴スライド係止構造</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Nidec Copal US20020172519A1準拠</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・環状溝シャンクへ横スライド歪みゼロ固定</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・中間板と共に0.55mm後幕羽根室を区画</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・背面凹み段差でセンサー直前迷光を抑制</text>
      `);

    case 'shutter_drive_pins_slots':
      return wrap(`
        <path d="M52 24 A34 34 0 0 1 52 80" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round"/>
        <path d="M52 24 A34 34 0 0 1 52 80" fill="none" stroke="#f8fafc" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="80" cy="52" r="7" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
        <circle cx="80" cy="52" r="3.5" fill="#475569"/>
        <text x="12" y="112" font-size="7.1" fill="#1e40af">円弧長穴貫通HRC62ピン(最大加速 285G)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#1e3a8a">地板円弧長穴＆超硬ドライブピン</text>
        <text x="144" y="48" font-size="6.6" fill="#1e40af">・表側駆動系と裏側羽根室を最小幅で貫通</text>
        <text x="144" y="62" font-size="6.6" fill="#1e40af">・HRC62焼入れ鋼＋PTFE低発塵摺動カラー</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・時速40km・285Gの衝撃加速を50万回伝達</text>
        <text x="144" y="89" font-size="6.6" fill="#2563eb">・長穴両端のSH51ブチルゴムへ安全着地</text>
      `);

    case 'shutter_slit_edge_blades':
      return wrap(`
        <polygon points="20,42 108,42 118,54 20,54" fill="#1e293b" stroke="#0f172a"/>
        <rect x="26" y="45" width="76" height="4" fill="#475569"/>
        <line x1="118" y1="22" x2="118" y2="82" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="72" y="33" font-size="6.6" fill="#b45309">45°ナイフエッジ</text>
        <text x="12" y="112" font-size="7.1" fill="#0f172a">W_slit=0.90mm真直度±4μm(異方性CFRP)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">スリット形成主遮光羽根＆面取り</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・t=65μm 0°方向強化CFRP剛性背骨リブ</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・45°微細面取りで1/8000s回折フレア防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・36mm全幅真直度±4μm(ムラ&lt;0.02EV)</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・特許US4380857A高精度遮光刃製法準拠</text>
      `);

    case 'shutter_blade_spacers':
      return wrap(`
        <rect x="24" y="28" width="90" height="8" fill="#1e293b"/>
        <rect x="58" y="36" width="22" height="5" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4"/>
        <rect x="24" y="41" width="90" height="8" fill="#334155"/>
        <rect x="58" y="49" width="22" height="5" fill="#fde68a" stroke="#d97706" stroke-width="1.4"/>
        <rect x="24" y="54" width="90" height="8" fill="#1e293b"/>
        <rect x="66" y="22" width="6" height="48" fill="#94a3b8"/>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">40μm PTFE間隔座金で4枚羽根非接触走行</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0c4a6e">羽根間40μmマイクロ間隔座金群</text>
        <text x="144" y="48" font-size="6.6" fill="#0369a1">・JPH0641226Y2準拠 羽根間段差スペーサー</text>
        <text x="144" y="62" font-size="6.6" fill="#0369a1">・4枚折り畳み時の羽根面擦過＆発塵ゼロ</text>
        <text x="144" y="76" font-size="6.6" fill="#1e40af">・PTFE μ≈0.06で高湿スティクション防止</text>
        <text x="144" y="89" font-size="6.6" fill="#0284c7">・550μm極薄室内で層流エアギャップ維持</text>
      `);

    case 'shutter_armature_iron_pieces':
      return wrap(`
        <rect x="24" y="32" width="24" height="40" rx="2" fill="#64748b" stroke="#1e293b"/>
        <rect x="52" y="32" width="22" height="40" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.8"/>
        <circle cx="80" cy="52" r="7" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
        <rect x="86" y="48" width="28" height="8" fill="#475569"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">SUY-0鏡面ラップ純鉄片＋±2°球面調心軸</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">純鉄アマチュア鉄片＆球面ピボット</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・水素焼鈍純鉄(Hc&lt;40A/m)で残留磁化極小</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・±2°球面首振りでヨーク面へ隙間0μm密着</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・鏡面Ra&lt;0.05μmで省電力保持＆10μs離脱</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・先幕・後幕それぞれ独立2基の精密鉄片</text>
      `);

    case 'shutter_armature_bias_springs':
      return wrap(`
        <rect x="24" y="34" width="20" height="36" rx="2" fill="#cbd5e1" stroke="#0f172a"/>
        <path d="M44 42 L50 34 L56 68 L62 34 L68 68 L74 34 L80 52" fill="none" stroke="#eab308" stroke-width="2.4"/>
        <rect x="82" y="38" width="10" height="28" rx="1" fill="#ca8a04"/>
        <rect x="94" y="46" width="22" height="12" rx="1" fill="#475569"/>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">過ストローク0.4mm吸収 → 1.5N無損傷密着</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#713f12">鉄片密着・過ストローク押圧ばね</text>
        <text x="144" y="48" font-size="6.6" fill="#854d0e">・チャージ過ストローク0.3–0.5mm弾性吸収</text>
        <text x="144" y="62" font-size="6.6" fill="#854d0e">・約1.5N一定圧でヨーク鏡面損傷を防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・通電遮断時の初期離脱ブースト推力付与</text>
        <text x="144" y="89" font-size="6.6" fill="#a16207">・外径1.8mm/線径0.22mm極小SUSばね×2</text>
      `);

    case 'shutter_magnet_yokes_bobbins':
      return wrap(`
        <path d="M30 26 L98 26 L98 44 L50 44 L50 62 L98 62 L98 80 L30 80 Z" fill="#64748b" stroke="#0f172a"/>
        <rect x="58" y="22" width="28" height="26" rx="2" fill="#ea580c" stroke="#9a3412"/>
        <rect x="58" y="58" width="28" height="26" rx="2" fill="#ea580c" stroke="#9a3412"/>
        <rect x="100" y="24" width="4" height="58" fill="#eab308" opacity="0.85"/>
        <text x="12" y="112" font-size="7.1" fill="#9a3412">パーマロイUヨーク＋10μmマイラー非磁性膜</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7c2d12">パーマロイUヨーク＆極細巻線</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・78%Ni積層パーマロイで磁気損失極小化</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・φ0.04mm UEW整列巻・約120mA低電力保持</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・10μmマイラーシムで磁気張り付き根絶</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・遮断インダクタンス時定数 τ &lt; 60μs</text>
      `);

    case 'shutter_set_levers':
      return wrap(`
        <circle cx="38" cy="64" r="10" fill="none" stroke="#475569" stroke-width="2.5" stroke-dasharray="4 2"/>
        <path d="M38 64 L96 34 L104 42 L44 74 Z" fill="#64748b" stroke="#0f172a"/>
        <circle cx="96" cy="38" r="6" fill="#eab308" stroke="#854d0e"/>
        <path d="M88 22 A24 24 0 0 1 108 56" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">独立チャージ押上腕(45mN·m)＆6ms瞬時退避</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">先幕・後幕独立セットレバー＆ばね</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・US20070253707A1/20110103787A1準拠</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・偏心カム回転を先後幕バネ蓄勢へ伝達</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・チャージ後6ms未満で復帰退避し干渉ゼロ</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・焼結含油ローラーで50万回連写無摩耗</text>
      `);

    case 'shutter_mb_floating_shaft':
      return wrap(`
        <rect x="18" y="34" width="22" height="36" rx="3" fill="#64748b"/>
        <rect x="40" y="46" width="58" height="12" rx="2" fill="#0ea5e9" stroke="#0369a1"/>
        <rect x="40" y="42" width="12" height="20" rx="2" fill="#eab308"/>
        <rect x="86" y="42" width="12" height="20" rx="2" fill="#eab308"/>
        <rect x="98" y="34" width="22" height="36" rx="3" fill="#334155"/>
        <text x="12" y="112" font-size="7.1" fill="#0369a1">Ref.457 偏心±0.4mm許容・振動伝達 &lt;8%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0c4a6e">浮動連結軸 MB CH FLOATING SHAFT</text>
        <text x="144" y="48" font-size="6.6" fill="#0369a1">・Sony Ref.457 (474837101)独自防振継手</text>
        <text x="144" y="62" font-size="6.6" fill="#0369a1">・剛結モーター箱と防振シャッターを絶縁結合</text>
        <text x="144" y="76" font-size="6.6" fill="#1e40af">・±0.4mm軸ズレを逃がし回転力のみ伝達</text>
        <text x="144" y="89" font-size="6.6" fill="#0284c7">・AFE-3360とチャージ箱の独立交換を可能化</text>
      `);

    case 'shutter_mb_charge_housing':
      return wrap(`
        <rect x="26" y="22" width="84" height="62" rx="5" fill="#64748b" stroke="#1e293b" stroke-width="1.8"/>
        <circle cx="52" cy="46" r="12" fill="#eab308" stroke="#854d0e"/>
        <circle cx="84" cy="60" r="14" fill="#cbd5e1" stroke="#334155"/>
        <circle cx="34" cy="30" r="3" fill="#2563eb"/><circle cx="102" cy="30" r="3" fill="#2563eb"/><circle cx="68" cy="76" r="3" fill="#2563eb"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.458 密閉独立ギヤ箱(グリス飛散 0%)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">独立駆動箱 MB CHARGE UNIT (5600)</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.458 (A2231470B)＋Ref.461ねじ</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・ギヤ油霧を完全封止しセンサー汚染防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・鋼板カバーが連写モーター熱を骨格へ放熱</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・α7 IV/α7R V/α9 II系モジュラー共通設計</text>
      `);

    case 'shutter_mb_cushion_sheet':
      return wrap(`
        <rect x="20" y="22" width="98" height="62" rx="4" fill="#2b2624" stroke="#475569" stroke-width="1.8"/>
        <rect x="38" y="34" width="54" height="38" rx="2" fill="#ffffff" stroke="#64748b"/>
        <path d="M24 16 Q42 10 60 16 T96 16" fill="none" stroke="#ef4444" stroke-width="1.6"/>
        <path d="M24 90 Q42 88 60 90 T96 90" fill="none" stroke="#10b981" stroke-width="1.6"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">Ref.459 粘弾性tanδ≈0.68 → 衝撃音−6.5dB</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">制振防音 MB CUSHION SHEET (5400)</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Sony Ref.459 (472900201)実機防音シート</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・1–4kHzシャッター金属残響を熱変換減衰</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・高画素機のシャッター微ブレを大幅に抑制</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・マウント前面の補助遮光・防塵シール兼務</text>
      `);

    case 'shutter_stopper_rubbers':
      return wrap(`
        <circle cx="48" cy="52" r="18" fill="#2b2624" stroke="#7c2d12" stroke-width="2"/>
        <circle cx="48" cy="52" r="7" fill="#cbd5e1"/>
        <line x1="108" y1="52" x2="70" y2="52" stroke="#dc2626" stroke-width="2.5"/>
        <polygon points="70,52 78,47 78,57" fill="#dc2626"/>
        <text x="72" y="40" font-size="6.8" fill="#991b1b">40km/h衝撃</text>
        <text x="12" y="112" font-size="7.1" fill="#7c2d12">クロロブチルゴム: 反発&lt;12%・吸収&gt;88%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#b91c1c"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7f1d1d">長穴終端ブチルストッパーゴム×4</text>
        <text x="144" y="48" font-size="6.6" fill="#991b1b">・円弧長穴の始点・終点4箇所へ中空圧入</text>
        <text x="144" y="62" font-size="6.6" fill="#991b1b">・超高ヒステリシス配合で衝突の88%熱散逸</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・反発係数極小で画面端バウンドカブリ防止</text>
        <text x="144" y="89" font-size="6.6" fill="#b91c1c">・−20℃耐寒可塑剤で冬山も高減衰を維持</text>
      `);

    case 'shutter_worm_lock_pawls':
      return wrap(`
        <circle cx="56" cy="54" r="22" fill="#fde68a" stroke="#b45309" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="56" cy="54" r="9" fill="#ffffff" stroke="#b45309"/>
        <path d="M84 36 L108 42 L106 48 L77 44 Z" fill="#475569"/>
        <circle cx="80" cy="40" r="3" fill="#2563eb"/>
        <text x="12" y="112" font-size="7.1" fill="#92400e">36歯ラチェット: 1歯0.025ms工場幕速校正</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#78350f">張力校正36歯ラチェット＆ロック爪</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・JPH0641226Y2 閉鎖バネ微調ラチェット</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・1クリック10°で幕速を0.025ms単位微調</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・先幕/後幕一致精度±0.02ms(1/8000s均一)</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・逆転防止ロック爪＋青色封印で永久固定</text>
      `);

    case 'shutter_esd_ground_brush':
      return wrap(`
        <rect x="26" y="24" width="12" height="58" rx="2" fill="#94a3b8" stroke="#334155"/>
        <line x1="38" y1="30" x2="66" y2="30" stroke="#1e293b" stroke-width="2"/>
        <line x1="38" y1="40" x2="66" y2="40" stroke="#1e293b" stroke-width="2"/>
        <line x1="38" y1="50" x2="66" y2="50" stroke="#1e293b" stroke-width="2"/>
        <line x1="38" y1="60" x2="66" y2="60" stroke="#1e293b" stroke-width="2"/>
        <line x1="38" y1="70" x2="66" y2="70" stroke="#1e293b" stroke-width="2"/>
        <rect x="70" y="24" width="40" height="58" rx="2" fill="#334155"/>
        <text x="76" y="56" font-size="7" fill="#fde047">0V</text>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">φ7μm導電炭素繊維ブラシ: 放電時定数 50ns</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#713f12">羽根室ESDカーボン除電ブラシ</text>
        <text x="144" y="48" font-size="6.6" fill="#854d0e">・15fps高速摺動の摩擦静電気を50ns除電</text>
        <text x="144" y="62" font-size="6.6" fill="#854d0e">・BeCu接地リーフで中間鋼板を0V固定</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・乾燥冬の羽根静電張り付き・露出ムラ阻止</text>
        <text x="144" y="89" font-size="6.6" fill="#a16207">・接触圧&lt;0.01Nで幕速に影響ゼロの防塵</text>
      `);

    case 'shutter_guide_posts_washers':
      return wrap(`
        <rect x="24" y="28" width="90" height="6" fill="#475569"/>
        <rect x="24" y="50" width="90" height="5" fill="#64748b"/>
        <rect x="24" y="72" width="90" height="6" fill="#475569"/>
        <rect x="58" y="22" width="14" height="62" rx="1" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.4"/>
        <rect x="53" y="34" width="24" height="4" fill="#ffffff" stroke="#0284c7"/>
        <rect x="53" y="68" width="24" height="4" fill="#ffffff" stroke="#0284c7"/>
        <text x="12" y="112" font-size="7.1" fill="#334155">段付き支柱±5μm基準＋50μm PTFE座金</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#0f172a">羽根室間隔決定 段付きカラー支柱</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・US20020172519A1 シャンク1j/1k/1m再現</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・先幕室0.55mm/後幕室0.55mmを±5μm維持</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・50μm PTFE座金でリンク端面摩擦を低減</text>
        <text x="144" y="89" font-size="6.6" fill="#475569">・空力羽根フラッターと擦過を同時に排除</text>
      `);

    case 'shutter_worm_gear_stage':
      return wrap(`
        <rect x="26" y="22" width="18" height="60" rx="3" fill="#eab308" stroke="#854d0e"/>
        <line x1="26" y1="32" x2="44" y2="38" stroke="#713f12" stroke-width="2"/>
        <line x1="26" y1="44" x2="44" y2="50" stroke="#713f12" stroke-width="2"/>
        <line x1="26" y1="56" x2="44" y2="62" stroke="#713f12" stroke-width="2"/>
        <line x1="26" y1="68" x2="44" y2="74" stroke="#713f12" stroke-width="2"/>
        <circle cx="80" cy="52" r="24" fill="#f8fafc" stroke="#475569" stroke-width="2" stroke-dasharray="5 2"/>
        <circle cx="80" cy="52" r="8" fill="#cbd5e1"/>
        <text x="12" y="112" font-size="7.1" fill="#854d0e">15:1高減速＋進み角6°無通電セルフロック</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#ca8a04"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#78350f">真鍮ウォーム＆静音POMはすば車</text>
        <text x="144" y="48" font-size="6.6" fill="#92400e">・単段15:1トルク増幅で小型モーター駆動</text>
        <text x="144" y="62" font-size="6.6" fill="#92400e">・リード角6°で無通電時のバネ逆転ロック</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・真鍮×PTFE配合POMでギヤ鳴り−9dB</text>
        <text x="144" y="89" font-size="6.6" fill="#b45309">・Sony MB CHARGE UNIT内部減速初段</text>
      `);

    case 'shutter_fpc_zif_stiffener':
      return wrap(`
        <rect x="22" y="24" width="42" height="58" rx="3" fill="#ea580c"/>
        <rect x="22" y="24" width="42" height="20" rx="2" fill="#2563eb"/>
        <rect x="74" y="30" width="36" height="52" rx="3" fill="#ea580c"/>
        <rect x="74" y="30" width="36" height="18" rx="2" fill="#2563eb"/>
        <line x1="28" y1="26" x2="28" y2="42" stroke="#fde047" stroke-width="2"/>
        <line x1="36" y1="26" x2="36" y2="42" stroke="#fde047" stroke-width="2"/>
        <line x1="44" y1="26" x2="44" y2="42" stroke="#fde047" stroke-width="2"/>
        <line x1="52" y1="26" x2="52" y2="42" stroke="#fde047" stroke-width="2"/>
        <text x="12" y="112" font-size="7.1" fill="#9a3412">駆動16P/検知8P 2系統ZIF＋青FR-4補強</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#7c2d12">シャッター2系統ZIF端子＆補強板</text>
        <text x="144" y="48" font-size="6.6" fill="#9a3412">・2.5Aソレノイド線とIRセンサー線を分離</text>
        <text x="144" y="62" font-size="6.6" fill="#9a3412">・0.3mmピッチ金端子＋FR-4 t=0.25mm補強</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・クロストーク&lt;−55dBで幕速誤検知防止</text>
        <text x="144" y="89" font-size="6.6" fill="#c2410c">・防振フローティング変位吸収スリット設計</text>
      `);

    case 'shutter_calibration_bolts':
      return wrap(`
        <rect x="46" y="20" width="44" height="12" rx="3" fill="#cbd5e1" stroke="#334155"/>
        <rect x="52" y="32" width="32" height="8" fill="#475569"/>
        <rect x="56" y="40" width="24" height="20" fill="#eab308" stroke="#854d0e"/>
        <rect x="61" y="60" width="14" height="22" fill="#94a3b8" stroke="#334155"/>
        <rect x="61" y="68" width="14" height="8" fill="#2563eb"/>
        <text x="12" y="112" font-size="7.1" fill="#1d4ed8">段付き底付き規制: 防振ゴム圧縮 18±2%</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="144" y="31" font-size="7.5" font-weight="bold" fill="#1e3a8a">防振3点段付きねじ NEW TRUSTER</text>
        <text x="144" y="48" font-size="6.6" fill="#1e40af">・Sony Ref.455(M2×5)＆Ref.462(M2×4)</text>
        <text x="144" y="62" font-size="6.6" fill="#1e40af">・段付きカラーで防振ゴム潰し過ぎを阻止</text>
        <text x="144" y="76" font-size="6.6" fill="#0369a1">・共振f₀≈48Hz＆Z平面±0.02mmを再現</text>
        <text x="144" y="89" font-size="6.6" fill="#2563eb">・P2セムスばね座金＋青色緩み止め付</text>
      `);

    default:
      return null;
  }
}
