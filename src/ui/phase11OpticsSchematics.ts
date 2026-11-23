import { PartExplanation } from '../assemblies/types';

/**
 * 22 bespoke technical SVG schematics (320x118) for Phase 11 Ultra-HD Anatomy:
 *  - EVF (+7)
 *  - LCD (+7)
 *  - Lens (+8)
 */
export function renderPhase11OpticsSchematicSvg(
  type: PartExplanation['diagramType'],
  wrap: (body: string) => string
): string | null {
  switch (type) {
    // =========================================================================
    // EVF (+7)
    // =========================================================================
    case 'evf_eyepiece_shutter':
      return wrap(`
        <rect x="20" y="22" width="110" height="68" rx="4" fill="#1e293b"/>
        <rect x="30" y="30" width="90" height="24" rx="2" fill="#475569" stroke="#cbd5e1"/>
        <rect x="30" y="58" width="90" height="24" rx="2" fill="#475569" stroke="#cbd5e1"/>
        <path d="M108 56 L124 44 M108 56 L124 68" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="75" cy="56" r="10" fill="#0f172a" stroke="#ef4444" stroke-width="1.8"/>
        <line x1="68" y1="49" x2="82" y2="63" stroke="#ef4444" stroke-width="2"/>
        <text x="12" y="104" font-size="6.3" fill="#334155">遮光2枚羽根アイピースシャッター</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">内蔵アイピース遮光シャッター機構</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・炎天下放置時の太陽光集光によるOLED焼損防止</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・三脚長時間露光時の接眼部逆入光を遮断</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・レバー連動で2枚黒化羽根が瞬時に全閉</text>
      `);

    case 'evf_gaze_ir_optics':
      return wrap(`
        <circle cx="38" cy="56" r="18" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <circle cx="46" cy="56" r="7" fill="#1e3a8a"/>
        <circle cx="49" cy="53" r="2.2" fill="#fb7185"/>
        <line x1="56" y1="53" x2="88" y2="44" stroke="#e11d48" stroke-width="1.6" stroke-dasharray="3 2"/>
        <path d="M88 32 Q96 44 88 56 Q80 44 88 32 Z" fill="#fda4af" stroke="#be123c"/>
        <rect x="104" y="32" width="18" height="24" rx="2" fill="#1e293b" stroke="#e11d48"/>
        <text x="12" y="96" font-size="6.3" fill="#be123c">850nm プルキンエ像 → 視線CMOS結像</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#be123c">視線入力AF用IR結像レンズ＆バンドパス</text>
        <text x="144" y="48" font-size="6.6" fill="#881337">・850nm赤外線のみ透過し可視外光をカット</text>
        <text x="144" y="62" font-size="6.6" fill="#881337">・角膜反射点と瞳孔中心を2群光学で鮮明結像</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・メガネ装着時も高精度な視線AF追従を実現</text>
      `);

    case 'evf_diopter_lock':
      return wrap(`
        <rect x="20" y="36" width="28" height="36" rx="4" fill="#334155"/>
        <rect x="48" y="42" width="24" height="24" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <path d="M72 54 L80 46 L86 62 L92 46 L98 54" fill="none" stroke="#d97706" stroke-width="2"/>
        <circle cx="110" cy="54" r="14" fill="#eab308" stroke="#854d0e" stroke-width="1.6"/>
        <path d="M18 26 L44 26" stroke="#0284c7" stroke-width="2"/>
        <polygon points="14,26 22,22 22,30" fill="#0284c7"/>
        <text x="12" y="94" font-size="6.3" fill="#334155">引出しロック解除 → スプライン噛合</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">視度調整プッシュロック・クラッチ機構</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・押込み時はギア噛合を遮断し誤回転を防止</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・引出し時のみ−4〜+3 m⁻¹精密視度調整</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・360°防滴Oリングで軸隙間の浸水を阻止</text>
      `);

    case 'evf_polarizer_qwp':
      return wrap(`
        <rect x="22" y="24" width="12" height="62" rx="2" fill="#0f172a"/>
        <rect x="52" y="24" width="10" height="62" rx="2" fill="#6366f1"/>
        <rect x="68" y="24" width="10" height="62" rx="2" fill="#06b6d4"/>
        <path d="M114 40 L78 40 L34 40" stroke="#ef4444" stroke-width="1.8"/>
        <path d="M34 68 L62 68" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="62" y1="62" x2="62" y2="74" stroke="#dc2626" stroke-width="2.5"/>
        <text x="44" y="18" font-size="7.2" font-weight="bold" fill="#4338ca">偏光＋λ/4</text>
        <text x="12" y="102" font-size="6.3" fill="#0e7490">円偏光トラップで内部反射ゴースト消去</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#3730a3">円偏光フィルター＆1/4波長板スタック</text>
        <text x="144" y="48" font-size="6.6" fill="#312e81">・外光がOLED金属電極で反射した光を90°回転</text>
        <text x="144" y="62" font-size="6.6" fill="#312e81">・直線偏光板が戻り光を完全吸収し黒浮き零</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・コントラスト100,000:1の漆黒表示を死守</text>
      `);

    case 'evf_oled_mla':
      return wrap(`
        <rect x="20" y="66" width="110" height="18" rx="2" fill="#1e293b"/>
        <rect x="24" y="54" width="30" height="12" fill="#ef4444"/>
        <rect x="60" y="54" width="30" height="12" fill="#22c55e"/>
        <rect x="96" y="54" width="30" height="12" fill="#3b82f6"/>
        <path d="M22 54 Q39 30 56 54 M58 54 Q75 30 92 54 M94 54 Q111 30 128 54" fill="#bae6fd" opacity="0.82" stroke="#0284c7" stroke-width="1.5"/>
        <path d="M39 42 L39 20 M75 42 L75 20 M111 42 L111 20" stroke="#0284c7" stroke-width="1.8"/>
        <text x="12" y="100" font-size="6.3" fill="#0369a1">六角最密MLA ＋ 薄膜封止TFE保護層</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">OLED オンチップMLA＆TFE薄膜封止</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・全反射損失光を正面へ集光し輝度1.8倍化</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・低電流で4,000 cd/m²達成し発熱・焼付抑制</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・多層TFEバリアが水分/酸素から有機層保護</text>
      `);

    case 'evf_tcon_emi':
      return wrap(`
        <rect x="20" y="54" width="110" height="22" rx="3" fill="#065f46"/>
        <rect x="34" y="42" width="32" height="14" rx="2" fill="#1e293b"/>
        <rect x="76" y="44" width="30" height="12" rx="2" fill="#1e293b"/>
        <path d="M24 54 L24 30 L126 30 L126 54" fill="none" stroke="#94a3b8" stroke-width="4"/>
        <path d="M50 18 L50 28 M90 18 L90 28" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="2 2"/>
        <text x="40" y="20" font-size="7.5" font-weight="bold" fill="#dc2626">22.6Gbps EMI遮蔽</text>
        <text x="12" y="96" font-size="6.3" fill="#334155">洋白シールド缶＋導電ガスケット</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">EVF TCON基板 EMI遮蔽缶＆熱界面</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・240Hz高速MIPIクロックのRF輻射を封じ込め</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・直近の撮像素子やWi-Fiアンテナ干渉を阻止</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・金属缶上面からMg筐体へTCON熱を逃がす</text>
      `);

    case 'evf_baffle_seals':
      return wrap(`
        <rect x="22" y="22" width="106" height="68" rx="5" fill="none" stroke="#475569" stroke-width="4"/>
        <rect x="30" y="30" width="90" height="52" rx="3" fill="#ffffff" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="6 3"/>
        <path d="M12 40 L24 46 M12 64 L24 60" stroke="#0ea5e9" stroke-width="2"/>
        <text x="44" y="59" font-size="8" font-weight="bold" fill="#0369a1">気密・防曇室</text>
        <text x="12" y="104" font-size="6.3" fill="#0369a1">3段EPDM封止＋内部結露防止シール</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">ファインダー光学室・防塵防滴シール群</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・接眼枠・視度軸・筐体合わせ目を3段密閉</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・厳冬期や雨天撮影でのレンズ内曇りを防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・迷光吸収バッフル兼用の精密成形パッキン</text>
      `);

    // =========================================================================
    // LCD (+7)
    // =========================================================================
    case 'lcd_touch_controller':
      return wrap(`
        <rect x="20" y="24" width="110" height="44" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        ${[36, 56, 76, 96, 114].map((x) => `<line x1="${x}" y1="26" x2="${x}" y2="66" stroke="#38bdf8" stroke-width="0.9"/>`).join('')}
        ${[34, 46, 58].map((y) => `<line x1="22" y1="${y}" x2="128" y2="${y}" stroke="#38bdf8" stroke-width="0.9"/>`).join('')}
        <circle cx="76" cy="46" r="7" fill="#0284c7" opacity="0.35"/>
        <rect x="52" y="74" width="46" height="16" rx="2" fill="#1e293b"/>
        <text x="58" y="85" font-size="7.2" fill="#fde047">COF IC</text>
        <text x="12" y="104" font-size="6.3" fill="#0369a1">ITO投影型静電容量＋120Hz COF制御</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">静電容量タッチCOFドライバ＆FPC</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・指先の微小静電容量変化ΔCを120Hz走査</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・雨滴誤動作フィルタ＆手袋モード対応</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・タッチトラッキングAFの即応操作を支える</text>
      `);

    case 'lcd_polarizer_stack':
      return wrap(`
        <rect x="20" y="24" width="16" height="64" rx="2" fill="#6366f1"/>
        <rect x="44" y="24" width="14" height="64" rx="2" fill="#38bdf8"/>
        <rect x="66" y="24" width="22" height="64" rx="2" fill="#0ea5e9" opacity="0.5"/>
        <rect x="96" y="24" width="16" height="64" rx="2" fill="#4f46e5"/>
        <line x1="28" y1="36" x2="28" y2="76" stroke="#fff" stroke-width="1.6"/>
        <line x1="99" y1="56" x2="109" y2="56" stroke="#fff" stroke-width="1.6"/>
        <text x="12" y="102" font-size="6.3" fill="#3730a3">直交偏光(0°/90°)＋位相差膜</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#3730a3">前後偏光板＆広視野角位相差フィルム群</text>
        <text x="144" y="48" font-size="6.6" fill="#312e81">・液晶分子の旋光制御で10bit階調を変調</text>
        <text x="144" y="62" font-size="6.6" fill="#312e81">・光学補償膜により斜め178°でも色転び零</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・表面AR層で屋外直射光下の視認性向上</text>
      `);

    case 'lcd_lgp_led_bar':
      return wrap(`
        <rect x="20" y="28" width="14" height="56" rx="2" fill="#f59e0b"/>
        ${[36, 48, 60, 72].map((y) => `<circle cx="27" cy="${y}" r="3.2" fill="#fef08a"/>`).join('')}
        <polygon points="36,30 126,38 126,74 36,82" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
        <path d="M36 44 L88 52 L88 26 M36 62 L112 66 L112 26" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
        <text x="12" y="100" font-size="6.3" fill="#b45309">高色域エッジLED ＋ くさび導光板(LGP)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#92400e">導光板(LGP)＆広色域エッジLEDバー</text>
        <text x="144" y="48" font-size="6.6" fill="#78350f">・蛍光体高演色LEDでDCI-P3広色域を再現</text>
        <text x="144" y="62" font-size="6.6" fill="#78350f">・マイクロドット印刷が全面均一輝度へ変換</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・薄さ0.5mmで屋外サニーウェザー輝度達成</text>
      `);

    case 'lcd_emi_thermal':
      return wrap(`
        <rect x="20" y="24" width="110" height="16" rx="2" fill="#0284c7"/>
        <rect x="20" y="42" width="110" height="10" rx="1" fill="#d97706"/>
        <rect x="20" y="54" width="110" height="12" rx="1" fill="#1e293b"/>
        <rect x="20" y="68" width="110" height="18" rx="2" fill="#64748b"/>
        <text x="34" y="35" font-size="7.2" fill="#fff">LCDパネル・LED発熱</text>
        <text x="28" y="63" font-size="7" fill="#fde047">銅箔EMI ＋ グラファイト均熱</text>
        <text x="34" y="80" font-size="7.2" fill="#fff">アルミ背面シャーシ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">LCD背面EMI銅箔シールド＆グラファイト</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・LEDバーの局所発熱を全面へ瞬時に均熱拡散</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・LCD走査ノイズのメイン基板側への逆流を遮断</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・薄型モニター剛性補強と放熱を一体両立</text>
      `);

    case 'lcd_pullin_cam':
      return wrap(`
        <rect x="22" y="26" width="38" height="60" rx="4" fill="#334155"/>
        <path d="M60 40 L92 40 L102 56 L92 72 L60 72 Z" fill="#cbd5e1" stroke="#475569"/>
        <path d="M72 34 L72 44 M72 68 L72 78" stroke="#d97706" stroke-width="3"/>
        <circle cx="94" cy="56" r="5" fill="#0284c7"/>
        <path d="M104 42 A18 18 0 0 1 104 70" fill="none" stroke="#10b981" stroke-width="2"/>
        <text x="12" y="102" font-size="6.3" fill="#065f46">収納時スナップ引込カム＋フリーストップ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#065f46">4軸ヒンジ引込カム＆皿バネ予圧機構</text>
        <text x="144" y="48" font-size="6.6" fill="#064e3b">・閉じ角度15°以内でボディへ自動スナップ吸着</text>
        <text x="144" y="62" font-size="6.6" fill="#064e3b">・積層皿バネで任意角度の無段階保持を実現</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・5万回開閉でも緩まない焼結カム耐久設計</text>
      `);

    case 'lcd_hinge_boots':
      return wrap(`
        <rect x="22" y="30" width="24" height="52" rx="3" fill="#475569"/>
        <path d="M46 42 C64 42, 66 70, 86 70" fill="none" stroke="#f59e0b" stroke-width="6"/>
        <rect x="44" y="34" width="44" height="44" rx="8" fill="none" stroke="#1e293b" stroke-width="4" stroke-dasharray="5 2"/>
        <rect x="88" y="30" width="28" height="52" rx="3" fill="#334155"/>
        <path d="M66 18 L66 32" stroke="#0ea5e9" stroke-width="2"/>
        <text x="12" y="100" font-size="6.3" fill="#0369a1">中空軸FPC保護＆蛇腹EPDM防滴ブーツ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">4軸ヒンジ防滴ブーツ＆耐摩耗ブッシュ</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・中空軸を通るMIPI細線ケーブルを雨滴から隔離</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・自己潤滑POMブッシュがFPC被覆の擦れを防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・180°反転自撮り時も防水シール性を維持</text>
      `);

    case 'lcd_bulkhead_b2b':
      return wrap(`
        <rect x="20" y="24" width="110" height="66" rx="4" fill="#065f46" stroke="#047857"/>
        <rect x="30" y="34" width="38" height="16" rx="2" fill="#eab308"/>
        <rect x="30" y="58" width="38" height="16" rx="2" fill="#1e293b"/>
        <rect x="80" y="38" width="40" height="32" rx="3" fill="#cbd5e1"/>
        <text x="34" y="45" font-size="7" font-weight="bold" fill="#78350f">B2B中継</text>
        <text x="34" y="69" font-size="7" fill="#fde047">TVS保護</text>
        <text x="86" y="57" font-size="7" font-weight="bold" fill="#0f172a">コモンch</text>
        <text x="12" y="104" font-size="6.3" fill="#065f46">ボディ隔壁中継基板＋ESD/EMIフィルタ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#065f46">背面隔壁LCD中継＆ESD保護サブ基板</text>
        <text x="144" y="48" font-size="6.6" fill="#064e3b">・LCD破損時にメイン基板無分解でモジュラー交換</text>
        <text x="144" y="62" font-size="6.6" fill="#064e3b">・タッチ操作の静電気サージをTVSで即座遮断</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・コモンモードフィルタで高速MIPI波形を整形</text>
      `);

    // =========================================================================
    // LENS (+8)
    // =========================================================================
    case 'lens_retaining_rings':
      return wrap(`
        <rect x="20" y="24" width="110" height="66" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
        <path d="M58 28 Q74 57 58 86 L42 86 Q52 57 42 28 Z" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="74" y="28" width="14" height="14" rx="2" fill="#334155"/>
        <rect x="74" y="72" width="14" height="14" rx="2" fill="#334155"/>
        <circle cx="71" cy="36" r="4" fill="#38bdf8"/>
        <circle cx="71" cy="78" r="4" fill="#38bdf8"/>
        <path d="M96 35 L88 35 M96 79 L88 79" stroke="#f59e0b" stroke-width="2"/>
        <text x="12" y="104" font-size="6.3" fill="#0369a1">カニ目螺合押さえ環＋熱膨張緩衝Oリング</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">螺合式レンズ押さえ環＆シリコーン緩衝</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・4点カニ目ノッチで全周均一トルク締付</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・金属/ガラス膨張差を緩衝し光弾性歪み零</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・−10〜+45℃全域でF1.2開放解像を維持</text>
      `);

    case 'lens_optical_spacers':
      return wrap(`
        <path d="M32 26 Q46 56 32 86 L44 86 Q54 56 44 26 Z" fill="#bae6fd" stroke="#0284c7"/>
        <path d="M78 26 Q68 56 78 86 L92 86 Q102 56 92 26 Z" fill="#a7f3d0" stroke="#059669"/>
        <rect x="54" y="24" width="12" height="18" fill="#0f172a"/>
        <rect x="54" y="70" width="12" height="18" fill="#0f172a"/>
        <circle cx="114" cy="56" r="10" fill="#eab308" stroke="#854d0e"/>
        <circle cx="117" cy="54" r="3" fill="#334155"/>
        <text x="12" y="104" font-size="6.3" fill="#1e293b">±2μm空気間隔箔＋真鍮偏心カラー</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">超艶消空気間隔スペーサー＆偏心カラー</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・レンズ間エアスペースを±2μm公差で確定</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・コバ面迷光をカットする黒化ナイフエッジ</text>
        <text x="144" y="76" font-size="6.6" fill="#b45309">・真鍮偏心コロで四隅MTFバランスを校正</text>
      `);

    case 'lens_iris_iso_fpc':
      return wrap(`
        <rect x="20" y="24" width="110" height="66" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
        <path d="M30 38 L88 38 C114 38, 114 74, 88 74 L30 74" fill="none" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
        <rect x="26" y="79" width="96" height="5" rx="2" fill="#e2e8f0" stroke="#0284c7"/>
        <path d="M46 30 L76 30" stroke="#0284c7" stroke-width="1.8"/>
        <polygon points="80,30 73,26 73,34" fill="#0284c7"/>
        <text x="36" y="59" font-size="7.5" font-weight="bold" fill="#b45309">RA圧延銅 Uループ</text>
        <text x="12" y="104" font-size="6.3" fill="#334155">1,000万回屈曲耐久 ＋ PTFE無音保護膜</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#92400e">可動群Uループ高屈曲FPC＆PTFEシート</text>
        <text x="144" y="48" font-size="6.6" fill="#78350f">・反力 &lt;0.02N で120fps高速AF推力を阻害零</text>
        <text x="144" y="62" font-size="6.6" fill="#78350f">・低摩擦PTFE保護膜が擦れ音と摩耗粉を遮断</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・絞りモーター＆原点センサーへ安定給電</text>
      `);

    case 'lens_mr_magnet_scales':
      return wrap(`
        <rect x="20" y="32" width="110" height="16" rx="2" fill="#475569"/>
        ${[24, 34, 44, 54, 64, 74, 84, 94, 104, 114]
          .map((x, i) => `<rect x="${x}" y="48" width="10" height="14" fill="${i % 2 === 0 ? '#ef4444' : '#2563eb'}"/>`)
          .join('')}
        <rect x="56" y="68" width="36" height="16" rx="2" fill="#eab308" stroke="#854d0e"/>
        <text x="61" y="79" font-size="7.2" font-weight="bold" fill="#78350f">MRヘッド</text>
        <text x="12" y="25" font-size="6.3" font-weight="bold" fill="#0f172a">インバー担体＋200μm SmFeN</text>
        <text x="12" y="102" font-size="6.3" fill="#0369a1">4基XD連動直動 (分解能&lt;0.5μm)</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">SmFeN磁気バーニアスケール＆インバー</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・N/S 200μm着磁縞を12bit補間で0.05μm検出</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・インバー合金(1.2ppm/K)で温度無限遠ズレ零</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・フォーカス操作で3Dビュー上も同期直動!</text>
      `);

    case 'lens_focus_bearing_bands':
      return wrap(`
        <rect x="20" y="24" width="110" height="14" rx="2" fill="#334155"/>
        <rect x="20" y="40" width="110" height="14" rx="2" fill="#e2e8f0" stroke="#94a3b8"/>
        ${[32, 50, 68, 86, 104, 118].map((x) => `<circle cx="${x}" cy="62" r="5" fill="#cbd5e1" stroke="#334155"/>`).join('')}
        <path d="M22 76 Q38 70 54 76 T86 76 T126 76" fill="none" stroke="#d97706" stroke-width="2.4"/>
        <text x="12" y="98" font-size="6.3" fill="#334155">PTFE制動帯＋SUS鋼球18個＋BeCu波バネ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">フォーカスリングPTFE制動＆球軸受機構</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・2列18球ベアリングがスラストガタを&lt;10μm化</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・PTFE帯＋粘性グリスで上質なMFトルクを創出</text>
        <text x="144" y="76" font-size="6.6" fill="#b45309">・波型予圧バネが温度・経年変化を自動補償</text>
      `);

    case 'lens_iris_lock_switch':
      return wrap(`
        <rect x="20" y="26" width="44" height="60" rx="4" fill="#334155"/>
        <rect x="26" y="38" width="18" height="24" rx="3" fill="#1e293b" stroke="#cbd5e1"/>
        <circle cx="35" cy="50" r="3.5" fill="#ef4444"/>
        <rect x="64" y="34" width="12" height="44" rx="2" fill="#0f172a"/>
        <rect x="76" y="44" width="24" height="16" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <path d="M102 32 L124 32 L124 44 L102 44 L102 60 L124 60 L124 80 L102 80" fill="none" stroke="#475569" stroke-width="3"/>
        <text x="12" y="102" font-size="6.3" fill="#dc2626">焼入れ係止爪＋EPDMブーツ＋BeCuバネ</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#991b1b">機械式IRIS LOCKスライド＆防滴ブーツ</text>
        <text x="144" y="48" font-size="6.6" fill="#7f1d1d">・「A」位置／F1.2-16域をステンレス爪で物理施錠</text>
        <text x="144" y="62" font-size="6.6" fill="#7f1d1d">・不意の指接触による露出ズレ事故を100%防止</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・摺動軸を一体EPDMブーツで防塵防滴封止</text>
      `);

    case 'lens_reinforcing_plates':
      return wrap(`
        <rect x="22" y="28" width="96" height="56" rx="4" fill="#64748b"/>
        <polygon points="22,28 74,28 22,52" fill="#cbd5e1" stroke="#0f172a"/>
        <polygon points="22,84 74,84 22,60" fill="#cbd5e1" stroke="#0f172a"/>
        ${[34, 52, 70].map((x) => `<circle cx="${x}" cy="35" r="2.6" fill="#0284c7"/>`).join('')}
        ${[34, 52, 70].map((x) => `<circle cx="${x}" cy="77" r="2.6" fill="#0284c7"/>`).join('')}
        <path d="M118 46 L118 76" stroke="#ef4444" stroke-width="2.4"/>
        <polygon points="118,80 114,72 122,72" fill="#ef4444"/>
        <text x="12" y="102" font-size="6.3" fill="#334155">SUSガセット×3＋M2×6ボルト×8</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0f172a">後部鏡筒ステンレス補強ガセット骨格</text>
        <text x="144" y="48" font-size="6.6" fill="#334155">・Mg骨格をE=200GPa鋼板で補強し垂れ&lt;0.5″</text>
        <text x="144" y="62" font-size="6.6" fill="#334155">・778g大口径ガラスの片持ち曲げ荷重を分散</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・XD急加減速時の鏡筒共振を抑えAFを高速化</text>
      `);

    case 'lens_mount_seal_bolts':
      return wrap(`
        <rect x="24" y="24" width="22" height="66" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="46" y="24" width="12" height="66" rx="3" fill="#1e293b"/>
        <path d="M58 28 Q68 24 68 34 L68 78 Q68 88 58 84" fill="#0f172a"/>
        <rect x="16" y="48" width="54" height="12" rx="2" fill="#94a3b8" stroke="#334155"/>
        <rect x="52" y="48" width="16" height="12" fill="#0284c7"/>
        <path d="M84 36 L68 42 M84 74 L68 68" stroke="#0ea5e9" stroke-width="2"/>
        <text x="78" y="57" font-size="7.5" font-weight="bold" fill="#0369a1">水滴遮断</text>
        <text x="12" y="104" font-size="6.3" fill="#0369a1">EPDMスカート＋緩み止めM2.5×4</text>
        <rect x="138" y="14" width="174" height="84" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="144" y="31" font-size="7.6" font-weight="bold" fill="#0369a1">リア防滴スカートガスケット＆M2.5ボルト</text>
        <text x="144" y="48" font-size="6.6" fill="#0c4a6e">・装着時に22%弾性圧縮しボディと全周気密化</text>
        <text x="144" y="62" font-size="6.6" fill="#0c4a6e">・4本M2.5ボルトが合計1.5kN超で均等締結</text>
        <text x="144" y="76" font-size="6.6" fill="#0284c7">・青スレッドロック＋単独交換モジュラー設計</text>
      `);

    default:
      return null;
  }
}
