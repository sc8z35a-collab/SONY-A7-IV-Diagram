import { PartExplanation } from '../assemblies/types';

/**
 * 16 bespoke beginner-friendly technical SVG schematics (320x118) for Phase 16C:
 *  - Camera Body Deep-Audit Missing OEM & Mechanical Standalone Micro (+16: B61–B76)
 */
export function renderPhase16BodyAuditSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    case 'body_dl1008_rtc_flex':
      return wrap(`
        <rect x="28" y="18" width="76" height="68" rx="5" fill="#f97316" stroke="#c2410c"/>
        <circle cx="66" cy="48" r="20" fill="#cbd5e1" stroke="#475569" stroke-width="2.2"/>
        <circle cx="66" cy="48" r="14" fill="#94a3b8"/>
        <rect x="50" y="44" width="32" height="8" rx="1" fill="#eab308"/>
        <text x="48" y="80" font-size="6.3" fill="#fff">DL-1008</text>
        <text x="12" y="112" font-size="7.0" fill="#b45309">Ref.411 DL-1008＋BH0001(再利用不可)＋BT0001二次電池</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#92400e">DL-1008＆二次RTC電池</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・電池室脇の独立バックアップ電源基板</text>
        <text x="144" y="60" font-size="6.4" fill="#b45309">・メイン電池を抜いても約3か月時計保持</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・BH0001ソケットは再利用禁止の厳格管理</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・メイン電池装着中に自動で微弱充電</text>
      `);

    case 'body_bt2033_power_fpc':
      return wrap(`
        <rect x="16" y="24" width="30" height="56" rx="3" fill="#10b981"/>
        <path d="M46 38 L88 38 L88 64 L112 64" fill="none" stroke="#d97706" stroke-width="10" stroke-linejoin="round"/>
        <path d="M46 66 L76 66 L96 76 L114 76" fill="none" stroke="#334155" stroke-width="3"/>
        <text x="21" y="55" font-size="6.2" fill="#fff">電池</text>
        <text x="52" y="30" font-size="6.3" fill="#92400e">2oz厚銅 BT-2033</text>
        <text x="12" y="112" font-size="7.0" fill="#b45309">Ref.401 BT-2033大電流厚銅フレキ＆Ref.413電源線</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#92400e">BT-2033 大電流給電フレキ</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・品番 A5023247A＋ケーブル 184678731</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・通常の2〜3倍厚銅箔で最大6A超に対応</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・残量1%通信(インフォリチウム)も統合</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・連写・8K時の瞬間電圧低下を防止</text>
      `);

    case 'body_rs1024_rear_bus':
      return wrap(`
        <rect x="18" y="20" width="98" height="14" rx="2" fill="#f97316"/>
        <rect x="20" y="40" width="28" height="22" rx="2" fill="#d97706"/>
        <rect x="54" y="40" width="26" height="44" rx="2" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
        <rect x="84" y="58" width="32" height="26" rx="2" fill="#059669"/>
        <text x="38" y="30" font-size="6.2" fill="#fff">KY-1035 (上部)</text>
        <text x="23" y="54" font-size="5.8" fill="#fff">JS-1012</text>
        <text x="56" y="64" font-size="5.8" fill="#fff">RS-1024</text>
        <text x="86" y="74" font-size="5.8" fill="#fff">SW-1041</text>
        <text x="12" y="112" font-size="7.0" fill="#c2410c">背面ボタンを4系統モジュラー分割しRS-1024へ集約</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#9a3412">背面4分割モジュラー基板</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・RS-1024幹線が3つの子フレキを集約</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・JS-1012(杖)/SW-1041(下)/KY-1035(上)</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・故障箇所だけ安く部分交換できる構造</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・裏フタ分離が幹線1本抜くだけで完了</text>
      `);

    case 'body_rl1071_shutter_fpc':
      return wrap(`
        <rect x="26" y="20" width="38" height="16" rx="4" fill="#94a3b8"/>
        <path d="M36 42 Q45 34 54 42" fill="none" stroke="#eab308" stroke-width="2.5"/>
        <rect x="20" y="44" width="96" height="10" rx="2" fill="#f97316"/>
        <rect x="20" y="56" width="96" height="18" rx="3" fill="#334155"/>
        <rect x="76" y="28" width="36" height="14" rx="2" fill="#64748b"/>
        <text x="34" y="68" font-size="6.3" fill="#fff">RL FPC BASE (251)</text>
        <text x="12" y="112" font-size="7.0" fill="#c2410c">Ref.251樹脂台座＋Ref.256金属板で2段レリーズ支持</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#9a3412">RL-1071＆前ダイヤル保持板</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.257フレキ＋Ref.251剛性ベース</text>
        <text x="144" y="60" font-size="6.4" fill="#c2410c">・半押し→全押し0.35mm差を鮮明伝達</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・Ref.256金属板が前ダイヤル軸ブレ防止</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・何十万回もの酷使に耐える堅牢土台</text>
      `);

    case 'body_sh1035_top_connect':
      return wrap(`
        <rect x="16" y="30" width="24" height="44" rx="3" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/>
        <rect x="96" y="30" width="24" height="44" rx="3" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/>
        <path d="M40 40 L96 40 L96 64 L40 64 Z" fill="none" stroke="#f97316" stroke-width="5"/>
        <circle cx="28" cy="40" r="3" fill="#eab308"/>
        <circle cx="108" cy="40" r="3" fill="#eab308"/>
        <text x="19" y="56" font-size="5.8" fill="#0f172a">313</text>
        <text x="99" y="56" font-size="5.8" fill="#0f172a">261</text>
        <text x="48" y="55" font-size="6.3" fill="#c2410c">SH-1035</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">左右連結板(313/261)で肩の吊り荷重分散＋SH-1035幹線</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">SH-1035＆左右肩連結板</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.313左連結板＋Ref.261右吊環板</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・重い望遠レンズ携行時の肩歪みを防止</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・L=5.5mm長尺スピンボルトで骨格締結</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・SH-1035が上面ダイヤル全信号を集約</text>
      `);

    case 'body_rear_thumb_grip':
      return wrap(`
        <path d="M36 20 L74 20 Q92 20 92 34 L76 42 L76 82 L36 82 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="24" y="22" width="10" height="58" rx="2" fill="#94a3b8" stroke="#475569"/>
        <path d="M104 38 L86 38" stroke="#0ea5e9" stroke-width="2"/>
        <polygon points="84,38 91,34 91,42" fill="#0ea5e9"/>
        <text x="44" y="64" font-size="6.4" fill="#e2e8f0">28°段差</text>
        <text x="12" y="112" font-size="7.0" fill="#1e293b">高摩擦親指レスト(28°掛かり)＋裏側REAR PLATE(77)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0f172a">背面サムレスト＆補強板</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・親指がピタッと掛かる28°張り出しゴム</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・濡れても滑らないシボTPE(μ&gt;0.9)</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・Ref.77金属板が裏から握り荷重を受止</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・片手ホールド安定＆裏フタ凹み防止</text>
      `);

    case 'body_io_port_flap_seals':
      return wrap(`
        <rect x="26" y="18" width="22" height="68" rx="3" fill="#334155"/>
        <circle cx="52" cy="34" r="4" fill="#94a3b8"/>
        <circle cx="52" cy="70" r="4" fill="#94a3b8"/>
        <path d="M54 22 L98 34 L98 84 L54 78 Z" fill="#1e293b" stroke="#0f172a"/>
        <rect x="64" y="34" width="24" height="16" rx="3" fill="none" stroke="#0ea5e9" stroke-width="2.5"/>
        <rect x="64" y="56" width="24" height="16" rx="3" fill="none" stroke="#0ea5e9" stroke-width="2.5"/>
        <text x="12" y="112" font-size="7.0" fill="#0369a1">金属ピン蝶番＋4連シリコーン圧入リップで独立防滴</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0c4a6e">4連ヒンジ扉＆防水リップ</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・4端子それぞれ独立開閉できるハード扉</text>
        <text x="144" y="60" font-size="6.4" fill="#0369a1">・裏側シリコーン輪が0.4mm弾性密着</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・ステンレス蝶番ピンで千切れゼロ耐久</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・開放保持バネでケーブル挿抜の邪魔ゼロ</text>
      `);

    case 'body_bottom_gasket_bot_s':
      return wrap(`
        <rect x="18" y="24" width="100" height="24" rx="3" fill="#475569"/>
        <rect x="18" y="50" width="100" height="10" rx="3" fill="#0f172a"/>
        <rect x="18" y="62" width="100" height="14" rx="2" fill="#94a3b8"/>
        <path d="M36 86 Q44 74 52 86 Q60 74 68 86 Q76 74 84 86" fill="none" stroke="#0ea5e9" stroke-width="2.2"/>
        <text x="32" y="57" font-size="6.2" fill="#38bdf8">Ref.56 GASKET BOT S</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">Ref.56底面防水パッキン＆ビスOリングで下からの浸水阻止</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0f172a">底面 GASKET BOT S</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Sony純正 503623301 (Ref.56)</text>
        <text x="144" y="60" font-size="6.4" fill="#0284c7">・濡れた地面からの毛細管浸水を遮断</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・底面ビス座も撥水Oリングで完全封鎖</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・雨天のローアングル・三脚撮影に必須</text>
      `);

    case 'body_media_lid_base_seal':
      return wrap(`
        <rect x="20" y="20" width="24" height="66" rx="3" fill="#334155"/>
        <rect x="46" y="24" width="10" height="58" rx="2" fill="#0284c7"/>
        <rect x="60" y="26" width="10" height="54" rx="2" fill="#0f172a"/>
        <rect x="74" y="20" width="28" height="66" rx="4" fill="#475569"/>
        <text x="23" y="56" font-size="5.8" fill="#fff">BASE</text>
        <text x="80" y="56" font-size="6.0" fill="#fff">扉</text>
        <text x="12" y="112" font-size="7.0" fill="#334155">Ref.60土台枠＋Ref.61枠側＋Ref.122扉側の2重防汗密閉</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">カード扉2重防水シール</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.60土台＋Ref.61枠＋Ref.122扉ゴム</text>
        <text x="144" y="60" font-size="6.4" fill="#0369a1">・右手の汗や雨から大切な撮影データ保護</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・2重クッションで扉の軋み・ガタを消去</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・CFexpress/SD金接点の腐食を防止</text>
      `);

    case 'body_backlit_button_leds':
      return wrap(`
        <rect x="18" y="20" width="100" height="66" rx="5" fill="#0f172a"/>
        <rect x="26" y="54" width="84" height="10" rx="2" fill="#38bdf8" opacity="0.55"/>
        <rect x="22" y="55" width="8" height="8" fill="#fde047"/>
        <circle cx="48" cy="40" r="9" fill="#1e293b" stroke="#fde047" stroke-width="1.6"/>
        <circle cx="88" cy="40" r="9" fill="#1e293b" stroke="#fde047" stroke-width="1.6"/>
        <text x="41" y="42" font-size="5.6" fill="#fef08a">MENU</text>
        <text x="81" y="42" font-size="5.6" fill="#fef08a">PLAY</text>
        <text x="12" y="112" font-size="7.0" fill="#a16207">0402極小LED＋0.2mm導光シートで暗闇でも全ボタン発光</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#854d0e">暗所イルミネーションボタン</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・極小0402 LEDと0.2mmシリコーン導光膜</text>
        <text x="144" y="60" font-size="6.4" fill="#a16207">・レーザー微細ドットで全キーを均一照明</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・消費電力&lt;15mWの超省エネPWM調光</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・星空・夜景撮影での押し間違いを防止</text>
      `);

    case 'body_tally_lamp_diffuser':
      return wrap(`
        <rect x="22" y="24" width="38" height="58" rx="4" fill="#1e293b"/>
        <circle cx="41" cy="40" r="8" fill="#ef4444"/>
        <circle cx="41" cy="64" r="9" fill="#f97316" stroke="#fde047"/>
        <path d="M52 40 L74 28 M52 40 L74 40 M52 40 L74 52" stroke="#ef4444" stroke-width="1.6"/>
        <rect x="82" y="32" width="32" height="20" rx="3" fill="#ef4444"/>
        <text x="87" y="45" font-size="6.5" font-weight="bold" fill="#fff">REC</text>
        <text x="12" y="112" font-size="7.0" fill="#dc2626">前後デュアル赤色タリー(±70°拡散)＋AF補助フレネル</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#991b1b">前後タリー＆AF補助光レンズ</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・被写体側と撮影者側の両方でREC表示</text>
        <text x="144" y="60" font-size="6.4" fill="#dc2626">・拡散プリズムで斜め140°からも視認</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・AF補助光はフレネルレンズで3m先集光</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・動画の「録画ボタン押し忘れ」を根絶</text>
      `);

    case 'body_exp_dial_lock_btn':
      return wrap(`
        <rect x="46" y="16" width="44" height="18" rx="4" fill="#1e293b"/>
        <rect x="26" y="34" width="84" height="18" rx="3" fill="#475569"/>
        <rect x="61" y="34" width="14" height="36" fill="#94a3b8"/>
        <path d="M68 54 C60 48 60 62 68 68 C76 62 76 48 68 54" fill="#eab308" stroke="#854d0e"/>
        <path d="M52 72 L60 78 L76 72 L84 78" fill="none" stroke="#f97316" stroke-width="2"/>
        <text x="53" y="28" font-size="6.3" fill="#fde047">PUSH</text>
        <text x="12" y="112" font-size="7.0" fill="#a16207">ノック式ハートカム内蔵・1プッシュでロック/解除切替</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#854d0e">Rダイヤル・プッシュロック</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・ボールペンと同じ超小型ハートカム機構</text>
        <text x="144" y="60" font-size="6.4" fill="#a16207">・押すたびに「固定ロック⇔自由回転」</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・服やカバン擦れでの露出ズレ悲劇ゼロ</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・ボタン軸にも極小防水Oリング内蔵</text>
      `);

    case 'body_sv_dial_fpc_cover':
      return wrap(`
        <rect x="34" y="20" width="68" height="22" rx="4" fill="#1e293b"/>
        <rect x="30" y="42" width="76" height="8" rx="2" fill="#eab308"/>
        <path d="M22 68 Q68 44 114 68 L114 78 L22 78 Z" fill="#4f46e5" opacity="0.85" stroke="#312e81"/>
        <text x="42" y="34" font-size="6.3" fill="#fff">MD DIAL (323)</text>
        <text x="32" y="73" font-size="6.2" fill="#fff">SV FPC COVER(310)</text>
        <text x="12" y="112" font-size="7.0" fill="#4338ca">Ref.310防滴傘カバー＋Ref.323密閉モードスイッチ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#312e81">SV防滴カバー＆MDブロック</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.310(A5038708A)＋Ref.323(A5033617A)</text>
        <text x="144" y="60" font-size="6.4" fill="#4338ca">・上面ダイヤル直下の電気接点を雨から防護</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・4bitグレイコードで素早い切替も誤認識0</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・電源OFFでも物理的にモード位置記憶</text>
      `);

    case 'body_rear_ftb_wp_cushions':
      return wrap(`
        <rect x="18" y="20" width="44" height="30" rx="2" fill="#94a3b8"/>
        <rect x="68" y="20" width="48" height="30" rx="2" fill="#64748b"/>
        <rect x="18" y="56" width="98" height="28" rx="2" fill="#475569"/>
        <circle cx="65" cy="53" r="10" fill="#0f172a" stroke="#0ea5e9" stroke-width="2"/>
        <text x="26" y="38" font-size="6.3" fill="#fff">前フタ</text>
        <text x="78" y="38" font-size="6.3" fill="#fff">上フタ</text>
        <text x="54" y="74" font-size="6.3" fill="#fff">後フタ</text>
        <text x="12" y="112" font-size="7.0" fill="#0f172a">3枚のカバーが交わるT字角を専用防水ダム(51/74/254)で封鎖</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#0f172a">3面T字接合 防水ダム群</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・Ref.51 / Ref.74 / Ref.254 純正3か所</text>
        <text x="144" y="60" font-size="6.4" fill="#0284c7">・一番漏れやすい3面角の微小隙間を封鎖</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・独立気泡スポンジを40%圧縮充填</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・外装合わせ目の軋み防止も同時達成</text>
      `);

    case 'body_battery_cell_safety':
      return wrap(`
        <rect x="24" y="34" width="32" height="50" rx="5" fill="#10b981" stroke="#065f46"/>
        <rect x="74" y="34" width="32" height="50" rx="5" fill="#10b981" stroke="#065f46"/>
        <rect x="32" y="28" width="16" height="6" fill="#ef4444"/>
        <rect x="82" y="28" width="16" height="6" fill="#ef4444"/>
        <rect x="24" y="18" width="82" height="8" rx="2" fill="#0e5a44"/>
        <rect x="34" y="16" width="14" height="5" fill="#fde047"/>
        <circle cx="65" cy="60" r="4" fill="#f97316"/>
        <text x="29" y="62" font-size="6.2" fill="#fff">3.6V</text>
        <text x="79" y="62" font-size="6.2" fill="#fff">3.6V</text>
        <text x="12" y="112" font-size="7.0" fill="#047857">MOSFET＋PTCヒューズ＋NTC＋CID安全弁の4重保護</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#065f46">電池内部 4重安全保護</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・2S1P(7.2V)セルを純Niタブで直列溶接</text>
        <text x="144" y="60" font-size="6.4" fill="#047857">・デュアルMOSFET＆PTCで過電流遮断</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・内圧異常時はCID安全弁が物理切離し</text>
        <text x="144" y="88" font-size="6.4" fill="#475569">・セル密着NTCが極寒/高温充電を自動停止</text>
      `);

    case 'body_anti_twist_tripod_pin':
      return wrap(`
        <rect x="16" y="22" width="104" height="62" rx="6" fill="#334155" stroke="#0f172a"/>
        <circle cx="42" cy="53" r="11" fill="#94a3b8" stroke="#e2e8f0" stroke-width="1.6"/>
        <circle cx="42" cy="53" r="5" fill="#0f172a"/>
        <circle cx="42" cy="31" r="4" fill="#0f172a" stroke="#eab308" stroke-width="1.5"/>
        <rect x="64" y="32" width="48" height="42" rx="3" fill="#1e293b" stroke="#64748b"/>
        <rect x="94" y="42" width="12" height="12" fill="#e2e8f0"/>
        <rect x="68" y="44" width="22" height="4" fill="#eab308"/>
        <rect x="68" y="54" width="20" height="4" fill="#94a3b8"/>
        <text x="12" y="112" font-size="7.0" fill="#334155">回り止めピン穴＋防滑座＋0.4mm凹型QRシリアル銘板</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.2" font-weight="bold" fill="#1e293b">底面回り止め＆凹型銘板</text>
        <text x="144" y="46" font-size="6.4" fill="#334155">・ビデオ雲台回り止め穴で縦撮り緩み防止</text>
        <text x="144" y="60" font-size="6.4" fill="#475569">・微細シボ防滑座が三脚装着傷を軽減</text>
        <text x="144" y="74" font-size="6.4" fill="#334155">・0.4mm凹ポケットでシリアル・技適を保護</text>
        <text x="144" y="88" font-size="6.4" fill="#64748b">・アルカスイス装着時も電池開閉を考慮</text>
      `);

    default:
      return null;
  }
}
