import { PartExplanation } from '../assemblies/types';

/**
 * Phase 30B: 48 Calibrated 320×118 Bespoke Technical Japanese SVG Schematics
 * for Standalone Microphone Parts MC33–MC80 (100% unique 80/80 SVG parity!).
 */
export function renderPhase30MicUltraSchematicSvg(type: PartExplanation['diagramType']): string | null {
  const wrap = (body: string) =>
    `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${body}</svg>`;

  switch (type) {
    // =========================================================================
    // MC33–MC42: DEDICATED UPGRADED SCHEMATICS FOR EXISTING PARTS
    // =========================================================================
    case 'mc_zif_10pin_connector':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#0f172a">0.4 mm ピッチ 10ピン ZIF フリップロック構造</text>
        <rect x="26" y="42" width="108" height="24" rx="2" fill="#f59e0b" opacity="0.85" stroke="#b45309"/>
        <text x="34" y="57" font-size="8" font-weight="bold" fill="#ffffff">SH-1035 フレキ挿入</text>
        <rect x="134" y="34" width="124" height="44" rx="3" fill="#e2e8f0" stroke="#475569"/>
        <rect x="146" y="30" width="96" height="10" rx="2" fill="#1e293b"/>
        <text x="155" y="38" font-size="7" fill="#f8fafc">フリップロック押さえ蓋</text>
        <path d="M144 62 Q170 48 196 62 T248 62" fill="none" stroke="#eab308" stroke-width="2.2"/>
        <text x="144" y="73" font-size="7.5" fill="#92400e">2点接触 金めっきバネ (R &lt; 30mΩ)</text>
        <text x="26" y="96" font-size="7.5" fill="#475569">L+/L−・R+/R−・Rear・GND 交互配置でクロストーク遮断</text>
      `);

    case 'mc_35mm_trs_mic_jack':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fff5f5" stroke="#fecaca"/>
        <text x="24" y="24" font-size="8.2" font-weight="bold" fill="#991b1b">φ3.5 mm 赤リング TRS ジャック ＋ 自動切替</text>
        <rect x="22" y="48" width="14" height="28" rx="2" fill="#dc2626"/>
        <rect x="36" y="52" width="146" height="20" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <rect x="150" y="52" width="32" height="20" rx="2" fill="#eab308"/>
        <line x1="120" y1="52" x2="120" y2="72" stroke="#1e293b" stroke-width="3"/>
        <line x1="146" y1="52" x2="146" y2="72" stroke="#1e293b" stroke-width="3"/>
        <text x="58" y="65" font-size="7.5" fill="#1e293b">Sleeve(GND)</text>
        <text x="125" y="65" font-size="7.5" fill="#1e293b">R</text>
        <text x="160" y="65" font-size="7.5" font-weight="bold" fill="#1e293b">Tip(L)</text>
        <path d="M168 50 L194 44 L292 44" fill="none" stroke="#dc2626" stroke-width="1.8"/>
        <text x="196" y="40" font-size="7.2" font-weight="bold" fill="#b91c1c">挿入検知SW → 内蔵OFF</text>
        <path d="M168 74 L194 84 L292 84" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <text x="196" y="80" font-size="7.2" fill="#0369a1">PIP 2.8 V 電源重畳</text>
        <text x="24" y="99" font-size="7.3" fill="#64748b">挿すだけで内蔵マイクをミュート＆外部マイクへ自動給電</text>
      `);

    case 'mc_mi_shoe_digital_bridge':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#1e3a8a">MIシュー 4ch 24-bit フルデジタル直結バイパス</text>
        <rect x="24" y="38" width="76" height="42" rx="4" fill="#1e293b"/>
        <text x="33" y="54" font-size="8" font-weight="bold" fill="#facc15">ECM-B1M/M1</text>
        <text x="34" y="68" font-size="7" fill="#cbd5e1">内蔵ADC変換済</text>
        <path d="M100 59 L198 59" stroke="#2563eb" stroke-width="3.2"/>
        <polygon points="204,59 194,53 194,65" fill="#2563eb"/>
        <rect x="116" y="42" width="70" height="14" rx="2" fill="#dbeafe" stroke="#3b82f6"/>
        <text x="122" y="52" font-size="7.2" font-weight="bold" fill="#1d4ed8">I2S 4.608 Mbps</text>
        <rect x="206" y="38" width="90" height="42" rx="4" fill="#312e81"/>
        <text x="220" y="55" font-size="8" font-weight="bold" fill="#ffffff">BIONZ XR2</text>
        <text x="218" y="69" font-size="7" fill="#38bdf8">アナログ劣化ゼロ!</text>
        <text x="24" y="98" font-size="7.5" fill="#475569">ケーブル不要 ＋ アナログ回路丸ごと迂回 ＝ 極限ノイズレス収録</text>
      `);

    case 'mc_rear_helmholtz_baffle':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fffbeb" stroke="#fde68a"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#92400e">リア背面バッフル共鳴室 ＆ Mg天板EMI接地バネ</text>
        <rect x="28" y="36" width="110" height="48" rx="5" fill="#334155" stroke="#1e293b"/>
        <rect x="38" y="46" width="90" height="28" rx="3" fill="#94a3b8" opacity="0.45"/>
        <text x="45" y="62" font-size="7.5" fill="#f8fafc">高密度吸音フェルト室</text>
        <rect x="166" y="34" width="122" height="10" rx="2" fill="#475569"/>
        <text x="180" y="42" font-size="7" fill="#ffffff">Mg トップデッキ筐体</text>
        <path d="M225 44 L208 58 L242 70 L225 84" fill="none" stroke="#eab308" stroke-width="3"/>
        <rect x="166" y="84" width="122" height="8" rx="1" fill="#15803d"/>
        <text x="184" y="68" font-size="7.5" font-weight="bold" fill="#b45309">EMI接地クリップ</text>
        <text x="28" y="100" font-size="7.5" fill="#78350f">背面反射波を吸収し指向性平坦化 ＋ 天板を確実アース接地</text>
      `);

    case 'mc_headphone_monitor_amp':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#ecfdf5" stroke="#a7f3d0"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#065f46">緑リング φ3.5 mm ゼロ遅延ヘッドホン監視アンプ</text>
        <rect x="24" y="40" width="66" height="36" rx="4" fill="#1e293b"/>
        <text x="33" y="55" font-size="7.5" fill="#38bdf8">コーデック</text>
        <text x="31" y="67" font-size="7" fill="#cbd5e1">直結サイドトーン</text>
        <path d="M90 58 L112 58" stroke="#10b981" stroke-width="2"/>
        <polygon points="114,40 168,58 114,76" fill="#d1fae5" stroke="#059669" stroke-width="1.8"/>
        <text x="119" y="61" font-size="7.5" font-weight="bold" fill="#047857">Class-G</text>
        <path d="M168 58 L206 58" stroke="#10b981" stroke-width="2"/>
        <circle cx="242" cy="58" r="18" fill="#10b981" opacity="0.18" stroke="#059669" stroke-width="2"/>
        <text x="228" y="56" font-size="7.5" font-weight="bold" fill="#065f46">緑TRS</text>
        <text x="228" y="67" font-size="7" fill="#047857">32Ω駆動</text>
        <text x="24" y="96" font-size="7.5" fill="#047857">遅延 &lt; 1 ms ／ THD+N &lt; 0.005% ／ 現場で風音・音割れ即発見!</text>
      `);

    case 'mc_micbias_lownoise_ldo':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fefce8" stroke="#fde047"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#854d0e">超静音 2.8 V MICBIAS LDO ＆ RC π型フィルタ</text>
        <path d="M24 52 L32 42 L40 60 L48 44 L56 58 L64 52" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <text x="20" y="72" font-size="7" fill="#dc2626">デジタル揺れ</text>
        <rect x="74" y="38" width="54" height="32" rx="4" fill="#f59e0b"/>
        <text x="84" y="52" font-size="7.5" font-weight="bold" fill="#fff">静音LDO</text>
        <text x="80" y="63" font-size="6.8" fill="#fef3c7">PSRR&gt;80dB</text>
        <line x1="128" y1="54" x2="218" y2="54" stroke="#0284c7" stroke-width="2"/>
        <rect x="154" y="48" width="26" height="12" fill="#e2e8f0" stroke="#475569"/>
        <text x="163" y="57" font-size="7" fill="#0f172a">R</text>
        <line x1="142" y1="54" x2="142" y2="76" stroke="#0284c7" stroke-width="1.6"/>
        <line x1="194" y1="54" x2="194" y2="76" stroke="#0284c7" stroke-width="1.6"/>
        <text x="136" y="86" font-size="7" fill="#0369a1">C0G</text>
        <text x="188" y="86" font-size="7" fill="#0369a1">C0G</text>
        <line x1="218" y1="54" x2="294" y2="54" stroke="#16a34a" stroke-width="2.4"/>
        <text x="224" y="46" font-size="7.5" font-weight="bold" fill="#15803d">2.80 V 超平坦!</text>
        <text x="224" y="68" font-size="7" fill="#166534">&lt; 6 μVrms</text>
        <text x="24" y="100" font-size="7.5" fill="#713f12">電源ノイズを 1/10,000 以下へ圧縮し、森の静寂をそのまま録音</text>
      `);

    case 'mc_esd_tvs_rail_guard':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fff1f2" stroke="#fda4af"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#9f1239">±15 kV 静電気を 1 ns で逃がす 5ch TVS 避雷針</text>
        <path d="M28 52 L48 40 L42 54 L66 44 L54 62" fill="none" stroke="#e11d48" stroke-width="2.2"/>
        <text x="22" y="76" font-size="7.5" font-weight="bold" fill="#be123c">±15 kV ESD!</text>
        <line x1="74" y1="54" x2="288" y2="54" stroke="#0284c7" stroke-width="2"/>
        <rect x="128" y="38" width="54" height="32" rx="4" fill="#be123c"/>
        <text x="136" y="52" font-size="7.5" font-weight="bold" fill="#ffffff">TVSアレイ</text>
        <text x="137" y="63" font-size="7" fill="#ffe4e6">&lt; 1 ns応答</text>
        <path d="M155 70 L155 92" stroke="#dc2626" stroke-width="2.5"/>
        <polygon points="155,96 149,88 161,88" fill="#dc2626"/>
        <text x="165" y="88" font-size="7.5" fill="#991b1b">シャーシGNDへ瞬時逃がし</text>
        <rect x="218" y="40" width="72" height="28" rx="4" fill="#dcfce7" stroke="#16a34a"/>
        <text x="225" y="57" font-size="7.5" font-weight="bold" fill="#166534">8V安全保護!</text>
      `);

    case 'mc_ibis_motor_notch_ref':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f0f9ff" stroke="#bae6fd"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#0c4a6e">IBIS / AFモーター同期 フィードフォワード消音</text>
        <rect x="22" y="36" width="84" height="26" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="28" y="52" font-size="7.5" fill="#0369a1">声 ＋ モーター音</text>
        <rect x="22" y="70" width="84" height="26" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="27" y="86" font-size="7.5" fill="#92400e">IBIS/AF予告信号</text>
        <path d="M106 49 L146 58 M106 83 L146 68" stroke="#0284c7" stroke-width="1.8"/>
        <circle cx="160" cy="63" r="16" fill="#0ea5e9"/>
        <text x="148" y="66" font-size="8" font-weight="bold" fill="#ffffff">LMS減</text>
        <path d="M176 63 L210 63" stroke="#16a34a" stroke-width="2.2"/>
        <rect x="212" y="44" width="84" height="38" rx="5" fill="#dcfce7" stroke="#16a34a"/>
        <text x="220" y="60" font-size="8" font-weight="bold" fill="#166534">声だけ残る!</text>
        <text x="220" y="73" font-size="7" fill="#15803d">メカ音 −24 dB</text>
      `);

    case 'mc_cap_solder_strain_relief':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fffbeb" stroke="#fcd34d"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#92400e">S字極細銅リッツ線 ＆ シリコーン除振グロメット</text>
        <rect x="24" y="40" width="66" height="40" rx="5" fill="#334155"/>
        <text x="31" y="57" font-size="7.5" fill="#ffffff">浮遊マイク</text>
        <text x="33" y="69" font-size="7" fill="#38bdf8">ゴム懸架中</text>
        <path d="M90 60 C118 32, 138 88, 168 46 C188 26, 202 82, 226 60" fill="none" stroke="#d97706" stroke-width="3"/>
        <circle cx="158" cy="60" r="10" fill="none" stroke="#64748b" stroke-width="4" opacity="0.65"/>
        <text x="122" y="34" font-size="7.5" font-weight="bold" fill="#b45309">S字たるみで振動遮断</text>
        <rect x="226" y="44" width="68" height="32" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <text x="234" y="58" font-size="7.5" fill="#0f172a">基板振動</text>
        <text x="236" y="70" font-size="7" fill="#dc2626">逆流 −15dB</text>
        <text x="24" y="99" font-size="7.5" fill="#78350f">硬い電線の振動バイパスを断ち切り、ハンドリング雑音を根絶</text>
      `);

    case 'mc_topdeck_waterproof_o_ring':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#0f172a">デュアルリップ EPDM 全周防塵防滴シール断面</text>
        <rect x="34" y="34" width="252" height="16" rx="2" fill="#475569"/>
        <text x="108" y="45" font-size="7.5" fill="#ffffff">Mg トップデッキ天板</text>
        <path d="M84 50 Q100 62 116 50 Q132 62 148 50 L148 70 L84 70 Z" fill="#0f172a"/>
        <text x="158" y="64" font-size="7.5" font-weight="bold" fill="#0f172a">2条リップ圧縮 (25%)</text>
        <rect x="34" y="70" width="252" height="16" rx="2" fill="#94a3b8"/>
        <text x="116" y="81" font-size="7.5" fill="#0f172a">カメラ本体シャーシ</text>
        <path d="M24 56 L76 56" stroke="#0284c7" stroke-width="2.2"/>
        <text x="24" y="51" font-size="7.5" font-weight="bold" fill="#0284c7">雨水×遮断</text>
        <text x="24" y="100" font-size="7.5" fill="#475569">雨滴の毛細管侵入とカメラ内部メカ騒音漏れを全周ダブル遮断</text>
      `);

    // =========================================================================
    // MC43–MC54: MEMS SUB-MICRON SEMICONDUCTOR & ACOUSTIC NANOPHYSICS
    // =========================================================================
    case 'mc_mems_fdts_sam_coat':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#ecfeff" stroke="#a5f3fc"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#155e75">FDTS 自己組織化単分子膜 (1.5 nm 超撥水ブラシ)</text>
        <rect x="26" y="74" width="268" height="16" fill="#334155"/>
        <text x="112" y="85" font-size="7.5" fill="#f8fafc">Si 振動膜 / 固定電極表面</text>
        ${[42, 62, 82, 102, 122, 142, 162, 182, 202, 222, 242, 262, 282]
          .map((x) => `<line x1="${x}" y1="74" x2="${x}" y2="56" stroke="#06b6d4" stroke-width="2"/><circle cx="${x}" cy="54" r="2.2" fill="#0284c7"/>`)
          .join('')}
        <circle cx="112" cy="40" r="12" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="103" y="43" font-size="7" font-weight="bold" fill="#0369a1">水滴</text>
        <text x="132" y="42" font-size="8" font-weight="bold" fill="#0e7490">接触角 θ &gt; 112° (玉になって弾く!)</text>
        <text x="24" y="102" font-size="7.5" fill="#164e63">−CF₃分子ブラシが湿気による膜張り付き（スティクション）を永久防止</text>
      `);

    case 'mc_mems_barometric_vent_hole':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f0f9ff" stroke="#bae6fd"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#0369a1">直径 2 μm 気圧平衡マイクロベント孔 (20 Hz LFRO)</text>
        <rect x="28" y="46" width="110" height="10" fill="#0ea5e9"/>
        <rect x="156" y="46" width="136" height="10" fill="#0ea5e9"/>
        <path d="M147 28 L147 84" stroke="#64748b" stroke-width="2" stroke-dasharray="3 2"/>
        <polygon points="147,86 142,78 152,78" fill="#64748b"/>
        <text x="158" y="39" font-size="7.5" fill="#475569">ゆっくり気圧変化 (&lt;5Hz) 透過</text>
        <path d="M44 36 Q72 28 100 36" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="30" y="72" font-size="7.5" font-weight="bold" fill="#dc2626">20 Hz〜20 kHz 音声は反射・受圧!</text>
        <text x="166" y="72" font-size="7.5" fill="#0369a1">R_vent ∝ 1/r⁴ 超精密加工</text>
        <text x="24" y="100" font-size="7.5" fill="#334155">飛行機の「耳抜き」と同じ原理で膜破損を防ぎつつ重低音を守る</text>
      `);

    case 'mc_mems_squeeze_film_zone':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="24" y="24" font-size="8.2" font-weight="bold" fill="#0f172a">2 μm スクイーズフィルム空気粘性 ＆ ブラウン熱雑音</text>
        <text x="112" y="38" font-size="7.0" font-weight="bold" fill="#0369a1">振動膜 (上下ピストン運動)</text>
        <rect x="34" y="42" width="252" height="7" rx="1" fill="#0ea5e9"/>
        <rect x="34" y="73" width="60" height="10" fill="#eab308"/>
        <rect x="114" y="73" width="84" height="10" fill="#eab308"/>
        <rect x="218" y="73" width="68" height="10" fill="#eab308"/>
        <path d="M72 60 L104 60 L104 86 M156 60 L208 60 L208 86" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <circle cx="132" cy="59" r="3" fill="#f59e0b"/>
        <circle cx="174" cy="55" r="3" fill="#f59e0b"/>
        <circle cx="244" cy="61" r="3" fill="#f59e0b"/>
        <text x="34" y="99" font-size="7.4" fill="#334155">空気粘性 R_a が高いほど熱雑音 p_n = √(4 k_B T R_a) が増大!</text>
      `);

    case 'mc_mems_stress_relief_springs':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fffbeb" stroke="#fde68a"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#92400e">4隅ポリシリコン蛇行スプリング懸架 (135 dB AOP)</text>
        <rect x="44" y="32" width="76" height="60" rx="6" fill="none" stroke="#475569" stroke-width="2.5"/>
        <circle cx="82" cy="62" r="17" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
        <path d="M50 38 L58 46 L52 50 L68 52 M114 38 L106 46 L112 50 L96 52 M50 86 L58 78 L52 74 L68 72 M114 86 L106 78 L112 74 L96 72" fill="none" stroke="#d97706" stroke-width="2"/>
        <text x="136" y="48" font-size="8" font-weight="bold" fill="#0369a1">残留応力 σ_res → 0 解放!</text>
        <text x="136" y="63" font-size="7.5" fill="#334155">・膜全体が水平ピストン運動</text>
        <text x="136" y="76" font-size="7.5" fill="#334155">・爆音 135 dB SPL でも無歪み</text>
        <text x="136" y="89" font-size="7.5" fill="#b45309">・温度変化の感度ズレ極小</text>
      `);

    case 'mc_mems_dual_backplate_diff':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fefce8" stroke="#fde047"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#854d0e">デュアルバックプレート (DBP) 上下差動プッシュプル</text>
        <rect x="28" y="34" width="128" height="9" fill="#eab308"/>
        <rect x="28" y="55" width="128" height="7" fill="#0ea5e9"/>
        <rect x="28" y="74" width="128" height="9" fill="#ea580c"/>
        <text x="164" y="42" font-size="7.5" font-weight="bold" fill="#b45309">上電極 (+ΔC)</text>
        <text x="164" y="61" font-size="7.5" font-weight="bold" fill="#0284c7">中央振動膜</text>
        <text x="164" y="82" font-size="7.5" font-weight="bold" fill="#c2410c">下電極 (−ΔC)</text>
        <rect x="234" y="44" width="64" height="30" rx="4" fill="#1e293b"/>
        <text x="241" y="57" font-size="7.5" font-weight="bold" fill="#38bdf8">V+ − V−</text>
        <text x="241" y="69" font-size="7" fill="#facc15">信号2×歪0</text>
        <text x="24" y="100" font-size="7.5" fill="#713f12">引き算マジックで 2次歪み＆電源雑音を消去し SNR +3〜6 dB 向上</text>
      `);

    case 'mc_mems_guard_ring_parasitic':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f0fdfa" stroke="#99f6e4"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#115e59">ブートストラップ同電位ガードリング (寄生容量 C_p 消去)</text>
        <circle cx="80" cy="62" r="28" fill="none" stroke="#c2410c" stroke-width="3"/>
        <circle cx="80" cy="62" r="19" fill="none" stroke="#06b6d4" stroke-width="3.5"/>
        <circle cx="80" cy="62" r="9" fill="#eab308"/>
        <text x="122" y="46" font-size="7.5" font-weight="bold" fill="#b45309">中心: 高Z信号 (V_sig)</text>
        <text x="122" y="60" font-size="7.5" font-weight="bold" fill="#0e7490">中輪: 同電位ガード (0.99·V_sig)</text>
        <text x="122" y="74" font-size="7.5" fill="#9a3412">外輪: GNDファラデー遮蔽</text>
        <text x="122" y="90" font-size="7.5" font-weight="bold" fill="#0f766e">電位差≈0 → 横漏れ C_p 消滅!</text>
      `);

    case 'mc_mems_die_attach_silicone':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fdf2f8" stroke="#fbcfe8"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#9d174d">超低弾性シリコーン枕 (260℃リフロー熱反り隔離)</text>
        <rect x="46" y="34" width="144" height="16" rx="2" fill="#334155"/>
        <text x="64" y="45" font-size="7.5" fill="#ffffff">MEMS Siダイ (CTE 2.6 ppm)</text>
        <rect x="46" y="50" width="144" height="16" rx="4" fill="#f472b6" opacity="0.65" stroke="#db2777"/>
        <text x="58" y="61" font-size="7.5" font-weight="bold" fill="#831843">極柔シリコーン (E ≈ 1 MPa)</text>
        <path d="M36 74 Q118 86 200 74 L200 84 Q118 96 36 84 Z" fill="#15803d"/>
        <text x="64" y="88" font-size="7" fill="#dcfce7">基板反り (CTE 16 ppm)</text>
        <text x="208" y="54" font-size="7.5" font-weight="bold" fill="#be185d">応力 1/3000!</text>
        <text x="208" y="68" font-size="7" fill="#64748b">感度ズレ &lt; ±0.3dB</text>
        <text x="208" y="82" font-size="7" fill="#64748b">気密シール兼任</text>
      `);

    case 'mc_mems_dickson_chargepump':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#faf5ff" stroke="#e9d5ff"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#6b21a8">ASIC内蔵 1.8 V → 12 V 多段ディクソン昇圧ポンプ</text>
        <rect x="24" y="66" width="36" height="22" rx="3" fill="#0ea5e9"/>
        <text x="29" y="80" font-size="7.5" font-weight="bold" fill="#fff">1.8V</text>
        ${[0, 1, 2, 3, 4]
          .map((i) => `<rect x="${70 + i * 30}" y="${60 - i * 6}" width="24" height="${28 + i * 6}" rx="2" fill="#a855f7" opacity="${0.55 + i * 0.1}"/>`)
          .join('')}
        <text x="86" y="42" font-size="7.5" fill="#7e22ce">バケツリレー昇圧 (MHz駆動)</text>
        <rect x="226" y="34" width="68" height="54" rx="4" fill="#eab308"/>
        <text x="236" y="54" font-size="9" font-weight="bold" fill="#1e293b">12.0 V</text>
        <text x="234" y="68" font-size="7" fill="#422006">超静音RC</text>
        <text x="234" y="79" font-size="7" fill="#422006">OTP微調整</text>
        <text x="24" y="102" font-size="7.5" fill="#581c87">コイル不要で12 V電界を生成し、プルイン手前の最高感度を維持</text>
      `);

    case 'mc_mems_pseudoresistor_100gohm':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fff1f2" stroke="#fecdd3"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#9f1239">100 GΩ (10¹¹ Ω) 背中合わせ PMOS 擬似抵抗ブリッジ</text>
        <line x1="26" y1="56" x2="72" y2="56" stroke="#0f172a" stroke-width="2"/>
        <rect x="72" y="40" width="56" height="32" rx="4" fill="#f43f5e"/>
        <text x="79" y="59" font-size="7.5" font-weight="bold" fill="#fff">PMOS 1</text>
        <line x1="128" y1="56" x2="152" y2="56" stroke="#eab308" stroke-width="2.5"/>
        <rect x="152" y="40" width="56" height="32" rx="4" fill="#06b6d4"/>
        <text x="159" y="59" font-size="7.5" font-weight="bold" fill="#fff">PMOS 2</text>
        <line x1="208" y1="56" x2="294" y2="56" stroke="#0f172a" stroke-width="2"/>
        <text x="218" y="48" font-size="7.5" font-weight="bold" fill="#be123c">V_sense</text>
        <text x="216" y="70" font-size="7" fill="#475569">f_hp &lt; 1 Hz</text>
        <text x="24" y="96" font-size="7.5" fill="#881337">わずか2個の極小MOSで1000億Ωを実現し、20Hz重低音の電荷流出を遮断!</text>
      `);

    case 'mc_mems_chopper_lna_1f':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#eef2ff" stroke="#c7d2fe"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#312e81">チョッパー安定化 LNA (1/f フリッカー雑音を追放!)</text>
        <rect x="24" y="42" width="54" height="32" rx="4" fill="#06b6d4"/>
        <text x="31" y="56" font-size="7.5" font-weight="bold" fill="#fff">変調SW</text>
        <text x="33" y="67" font-size="6.8" fill="#ecfeff">×f_chop</text>
        <line x1="78" y1="58" x2="104" y2="58" stroke="#4f46e5" stroke-width="2"/>
        <polygon points="104,38 164,58 104,78" fill="#eab308" stroke="#b45309"/>
        <text x="111" y="61" font-size="7.5" font-weight="bold" fill="#1e293b">LNA</text>
        <line x1="164" y1="58" x2="188" y2="58" stroke="#4f46e5" stroke-width="2"/>
        <rect x="188" y="42" width="54" height="32" rx="4" fill="#06b6d4"/>
        <text x="195" y="56" font-size="7.5" font-weight="bold" fill="#fff">復調SW</text>
        <text x="197" y="67" font-size="6.8" fill="#ecfeff">×f_chop</text>
        <rect x="252" y="42" width="44" height="32" rx="4" fill="#16a34a"/>
        <text x="258" y="56" font-size="7.5" font-weight="bold" fill="#fff">LPF</text>
        <text x="255" y="67" font-size="6.5" fill="#dcfce7">1/f消去</text>
        <text x="24" y="97" font-size="7.5" fill="#3730a3">声は2回ワープで元通り・1/f雑音は1回ワープで超音波帯へ追放!</text>
      `);

    case 'mc_mems_companding_sdm_2026':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f5f3ff" stroke="#ddd6fe"/>
        <text x="24" y="23" font-size="8.4" font-weight="bold" fill="#5b21b6">2026 圧伸(Companding) 4次ΣΔ: 399 μW / 114.3 dB DR</text>
        <line x1="28" y1="86" x2="292" y2="86" stroke="#94a3b8" stroke-width="1.2"/>
        <rect x="34" y="34" width="110" height="52" fill="#dcfce7" opacity="0.55"/>
        <text x="89" y="47" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#15803d">可聴帯 20Hz–20kHz</text>
        <text x="89" y="65" text-anchor="middle" font-size="8.2" font-weight="bold" fill="#166534">114.3 dB DR!</text>
        <path d="M34 82 L140 80 C172 78, 196 42, 286 35" fill="none" stroke="#7c3aed" stroke-width="2.4"/>
        <text x="196" y="42" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#6d28d9">量子化雑音を超音波へ</text>
        <text x="240" y="72" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#7c3aed">4次ノイズシェーピング</text>
        <text x="160" y="101" text-anchor="middle" font-size="7.3" fill="#4c1d95">音量に応じ自動ゲイン伸縮し、たった 0.4 mW でスタジオ級レンジ</text>
      `);

    case 'mc_mems_cic_decimation_fir':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#1e40af">PDM → PCM 64倍デシメーション (CIC ＋ 直線位相FIR)</text>
        <rect x="22" y="40" width="66" height="36" rx="4" fill="#1e293b"/>
        <text x="29" y="55" font-size="7.5" font-weight="bold" fill="#38bdf8">1-bit PDM</text>
        <text x="29" y="67" font-size="7" fill="#cbd5e1">3.072 MHz</text>
        <path d="M88 58 L106 58" stroke="#2563eb" stroke-width="2"/>
        <rect x="106" y="40" width="58" height="36" rx="4" fill="#3b82f6"/>
        <text x="114" y="55" font-size="7.5" font-weight="bold" fill="#fff">5段 CIC</text>
        <text x="119" y="67" font-size="7" fill="#dbeafe">÷ 16</text>
        <path d="M164 58 L182 58" stroke="#2563eb" stroke-width="2"/>
        <rect x="182" y="40" width="58" height="36" rx="4" fill="#eab308"/>
        <text x="189" y="55" font-size="7.5" font-weight="bold" fill="#1e293b">HB-FIR</text>
        <text x="196" y="67" font-size="7" fill="#422006">÷ 4</text>
        <path d="M240 58 L254 58" stroke="#16a34a" stroke-width="2"/>
        <rect x="254" y="40" width="46" height="36" rx="4" fill="#16a34a"/>
        <text x="259" y="55" font-size="7.5" font-weight="bold" fill="#fff">24-bit</text>
        <text x="259" y="67" font-size="7" fill="#dcfce7">48 kHz</text>
        <text x="24" y="98" font-size="7.5" fill="#1e3a8a">超音波ノイズを 100 dB 遮断しつつ位相ズレゼロで高精細PCM化</text>
      `);

    // =========================================================================
    // MC55–MC62: 2025–2026 NEXT-GEN OPTICAL / PIEZO / VPU / 32-BIT FLOAT / AI
    // =========================================================================
    case 'mc_optical_mems_vcsel_2026':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fff1f2" stroke="#fda4af"/>
        <text x="22" y="22" font-size="8.2" font-weight="bold" fill="#9f1239">2026 光MEMS (sensiBel SBM140B): 84 dBA / 146 dB AOP!</text>
        <text x="48" y="34" font-size="7" fill="#0369a1">反射振動膜 (バックプレート完全ゼロ!)</text>
        <rect x="44" y="37" width="144" height="7" rx="2" fill="#38bdf8" stroke="#0284c7"/>
        <line x1="116" y1="78" x2="116" y2="44" stroke="#e11d48" stroke-width="2.4"/>
        <line x1="116" y1="44" x2="68" y2="78" stroke="#f43f5e" stroke-width="1.6" stroke-dasharray="3 2"/>
        <line x1="116" y1="44" x2="164" y2="78" stroke="#f43f5e" stroke-width="1.6" stroke-dasharray="3 2"/>
        <rect x="98" y="78" width="36" height="14" rx="2" fill="#be123c"/>
        <text x="103" y="88" font-size="7" font-weight="bold" fill="#fff">VCSEL</text>
        <rect x="52" y="78" width="30" height="14" rx="2" fill="#0284c7"/>
        <text x="59" y="88" font-size="7" fill="#fff">PD1</text>
        <rect x="150" y="78" width="30" height="14" rx="2" fill="#0284c7"/>
        <text x="157" y="88" font-size="7" fill="#fff">PD2</text>
        <rect x="200" y="34" width="98" height="58" rx="5" fill="#1e293b"/>
        <text x="208" y="49" font-size="7.5" font-weight="bold" fill="#fb7185">レーザー干渉計測</text>
        <text x="208" y="62" font-size="7.5" fill="#38bdf8">SNR: 84 dBA</text>
        <text x="208" y="74" font-size="7.5" fill="#facc15">AOP: 146 dB</text>
        <text x="208" y="86" font-size="7.5" fill="#4ade80">DR : 136 dB!</text>
        <text x="22" y="103" font-size="7.2" fill="#881337">邪魔な固定電極を全廃し、ピコメートルの揺れを光の干渉縞で読む2026年革命</text>
      `);

    case 'mc_piezo_scaln_cantilever_2026':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f0f9ff" stroke="#7dd3fc"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#0369a1">2026 ScAlN 8分割・回転セクター圧電MEMS (IP68)</text>
        <circle cx="80" cy="63" r="28" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
        ${[0, 45, 90, 135, 180, 225, 270, 315]
          .map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return `<line x1="80" y1="63" x2="${(80 + Math.cos(rad) * 27).toFixed(1)}" y2="${(63 + Math.sin(rad) * 27).toFixed(1)}" stroke="#0369a1" stroke-width="1.4"/>`;
          })
          .join('')}
        <circle cx="80" cy="63" r="4" fill="#ffffff" stroke="#0284c7"/>
        <text x="122" y="44" font-size="8" font-weight="bold" fill="#0284c7">・スカンジウム添加で感度 3–5×</text>
        <text x="122" y="58" font-size="7.5" fill="#334155">・音で曲がり自ら発電 (バイアス 0V)</text>
        <text x="122" y="72" font-size="7.5" fill="#334155">・狭い電極隙間なし → 張り付きゼロ</text>
        <text x="122" y="86" font-size="7.5" font-weight="bold" fill="#0f766e">・単体 IP68 防塵防水＆超省電力!</text>
      `);

    case 'mc_vpu_bone_conduction_2026':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fffbeb" stroke="#fde68a"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#92400e">風切り音 0 dB! 完全密閉 VPU 骨伝導加速度センサー</text>
        <rect x="30" y="36" width="124" height="50" rx="5" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
        <rect x="64" y="48" width="56" height="24" rx="3" fill="#eab308"/>
        <text x="71" y="63" font-size="7.5" font-weight="bold" fill="#1e293b">慣性重り</text>
        <line x1="40" y1="60" x2="64" y2="60" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2"/>
        <line x1="120" y1="60" x2="144" y2="60" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="166" y="46" font-size="7.5" font-weight="bold" fill="#dc2626">暴風 → 穴ゼロで完全遮断!</text>
        <text x="166" y="61" font-size="7.5" fill="#334155">筐体の声振動だけを拾い</text>
        <text x="166" y="74" font-size="7.5" font-weight="bold" fill="#0284c7">AI音声分離へ「声の芯」通知</text>
        <text x="24" y="101" font-size="7.5" fill="#78350f">台風並みの強風下でも声のタイミングと基本周波数を確実に救出!</text>
      `);

    case 'mc_32bit_float_dual_adc_2026':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#ecfdf5" stroke="#6ee7b7"/>
        <text x="22" y="23" font-size="8.3" font-weight="bold" fill="#065f46">2026 内蔵 32-bit Float デュアルADC (音割れゼロ 136+ dB!)</text>
        <rect x="24" y="34" width="102" height="24" rx="4" fill="#0ea5e9"/>
        <text x="30" y="49" font-size="7.5" font-weight="bold" fill="#fff">高ゲインADC (+36dB)</text>
        <rect x="24" y="64" width="102" height="24" rx="4" fill="#e11d48"/>
        <text x="32" y="79" font-size="7.5" font-weight="bold" fill="#fff">低ゲインADC (0dB)</text>
        <path d="M126 46 L160 58 M126 76 L160 64" stroke="#0f172a" stroke-width="2"/>
        <rect x="160" y="40" width="134" height="44" rx="5" fill="#1e293b"/>
        <text x="168" y="55" font-size="8" font-weight="bold" fill="#facc15">IEEE-754 32-bit Float</text>
        <text x="168" y="68" font-size="7" fill="#4ade80">ささやき〜爆音 自動合体!</text>
        <text x="168" y="79" font-size="7" fill="#38bdf8">ノーゲインで絶対割れない</text>
        <text x="22" y="102" font-size="7.3" fill="#065f46">写真のHDRと同じ発想で2台のADCを同時合成する2026年カメラ標準</text>
      `);

    case 'mc_dual_stage_pga_stitch':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#ecfeff" stroke="#a5f3fc"/>
        <text x="24" y="23" font-size="8.4" font-weight="bold" fill="#155e75">デュアルPGA −129 dBu ＆ ゼログリッチ自動合成</text>
        <line x1="28" y1="80" x2="292" y2="80" stroke="#94a3b8" stroke-width="1"/>
        <rect x="128" y="32" width="46" height="48" fill="#fef08a" opacity="0.45" stroke="#eab308" stroke-dasharray="3 2"/>
        <path d="M32 74 L136 37 L168 37" fill="none" stroke="#0ea5e9" stroke-width="2.4"/>
        <path d="M136 74 L278 35" fill="none" stroke="#e11d48" stroke-width="2.4"/>
        <text x="34" y="45" font-size="7.3" font-weight="bold" fill="#0369a1">静音高ゲイン路</text>
        <text x="224" y="68" font-size="7.3" font-weight="bold" fill="#be123c">爆音低ゲイン路</text>
        <rect x="108" y="82" width="104" height="12" rx="3" fill="#fef3c7" stroke="#f59e0b" stroke-width="0.9"/>
        <text x="160" y="90.5" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#b45309">重複域で0.01dB自動整合</text>
        <text x="160" y="103.5" text-anchor="middle" font-size="6.8" fill="#334155">滑らかクロスフェードで切替ノイズ (グリッチ) を聴感上完全ゼロ化</text>
      `);

    case 'mc_8capsule_beamform_array':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#1e3a8a">Sony ECM-B1M / M1 直系：8カプセル超小型アレイ</text>
        <rect x="26" y="42" width="136" height="32" rx="6" fill="#1e293b"/>
        ${[42, 74, 106, 138]
          .flatMap((x) => [
            `<circle cx="${x}" cy="51" r="5" fill="#38bdf8" stroke="#facc15"/>`,
            `<circle cx="${x}" cy="65" r="5" fill="#38bdf8" stroke="#facc15"/>`,
          ])
          .join('')}
        <path d="M162 58 L192 58" stroke="#2563eb" stroke-width="2.2"/>
        <path d="M196 58 Q242 26 292 58 Q242 90 196 58 Z" fill="#38bdf8" opacity="0.35" stroke="#0284c7" stroke-width="1.8"/>
        <text x="210" y="61" font-size="7.5" font-weight="bold" fill="#0369a1">超鋭指向ビーム!</text>
        <text x="24" y="96" font-size="7.5" fill="#1e40af">全長10 cm の8素子で最大8指向性を自在合成＋4chデジタル出力</text>
      `);

    case 'mc_mvdr_adaptive_null_dsp':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f0fdfa" stroke="#5eead4"/>
        <text x="24" y="23" font-size="8.4" font-weight="bold" fill="#115e59">適応 MVDR ＆ 瞳AF連動 動的ヌルステアリング</text>
        <text x="90" y="37" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#0f766e">瞳AF主役 (100%)</text>
        <circle cx="90" cy="67" r="24" fill="none" stroke="#94a3b8" stroke-dasharray="2 2"/>
        <path d="M90 67 C76 42, 104 42, 90 67" fill="#14b8a6" opacity="0.55" stroke="#0f766e" stroke-width="1.8"/>
        <line x1="90" y1="67" x2="119" y2="83" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="123" cy="85" r="4.5" fill="#dc2626"/>
        <text x="146" y="48" font-size="7.4" font-weight="bold" fill="#be123c">横の騒音源へ自動で</text>
        <text x="146" y="61" font-size="7.4" font-weight="bold" fill="#be123c">深い消音ヌル (−30 dB)</text>
        <text x="146" y="76" font-size="7.4" fill="#334155">主役の声色は一切無歪み!</text>
        <text x="160" y="101.5" text-anchor="middle" font-size="7.2" fill="#134e4a">被写体が動いても音のスポットライトと騒音ブロックの穴が自動追従</text>
      `);

    case 'mc_tinyml_transformer_sep_2026':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#faf5ff" stroke="#d8b4fe"/>
        <text x="22" y="23" font-size="8.2" font-weight="bold" fill="#6b21a8">2026 エッジ TinyML Transformer 3ステム音声分離</text>
        <rect x="22" y="44" width="60" height="34" rx="4" fill="#475569"/>
        <text x="29" y="59" font-size="7.5" fill="#fff">混在音声</text>
        <text x="27" y="71" font-size="6.8" fill="#cbd5e1">声+街+風</text>
        <path d="M82 61 L102 61" stroke="#9333ea" stroke-width="2"/>
        <rect x="102" y="38" width="74" height="46" rx="5" fill="#7e22ce"/>
        <text x="109" y="56" font-size="7.5" font-weight="bold" fill="#ffffff">INT8 NPU</text>
        <text x="107" y="68" font-size="7" fill="#e9d5ff">Transformer</text>
        <text x="111" y="79" font-size="6.8" fill="#facc15">&lt; 15 ms</text>
        <path d="M176 48 L200 42 M176 61 L200 61 M176 74 L200 80" stroke="#9333ea" stroke-width="1.8"/>
        <rect x="200" y="32" width="96" height="17" rx="3" fill="#0ea5e9"/>
        <text x="208" y="44" font-size="7.5" font-weight="bold" fill="#fff">① 人物の声 (100%)</text>
        <rect x="200" y="53" width="96" height="17" rx="3" fill="#10b981"/>
        <text x="208" y="65" font-size="7.5" font-weight="bold" fill="#fff">② 環境音 (自在調整)</text>
        <rect x="200" y="74" width="96" height="17" rx="3" fill="#ef4444"/>
        <text x="208" y="86" font-size="7.5" font-weight="bold" fill="#fff">③ 風・雑音 (破棄!)</text>
        <text x="22" y="102" font-size="7.2" fill="#581c87">複素スペクトログラム位相復元でロボット声ゼロの自然な3分離</text>
      `);

    // =========================================================================
    // MC63–MC72: ECM ELECTRET MICRO-PHYSICS & ANALOG CRAFTSMANSHIP
    // =========================================================================
    case 'mc_ecm_corona_fep_dipole':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fffbeb" stroke="#fcd34d"/>
        <text x="24" y="23" font-size="8.3" font-weight="bold" fill="#92400e">コロナ帯電 FEP 永久トラップ空間電荷 (100年保持!)</text>
        <rect x="26" y="31" width="166" height="6" rx="1.5" fill="#94a3b8"/>
        <text x="109" y="36" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0f172a">金属極板 (静電界を常時発生)</text>
        <rect x="26" y="42" width="166" height="32" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
        ${[44, 76, 108, 140, 172]
          .map(
            (x) =>
              `<line x1="${x}" y1="37" x2="${x}" y2="42" stroke="#dc2626" stroke-width="1"/><circle cx="${x}" cy="50" r="4.8" fill="#dc2626"/><text x="${x}" y="52.4" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">+</text><circle cx="${x}" cy="65" r="4.8" fill="#0284c7"/><text x="${x}" y="67.4" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">−</text>`
          )
          .join('')}
        <rect x="26" y="76" width="166" height="5" rx="1.5" fill="#b45309"/>
        <rect x="200" y="31" width="98" height="50" rx="4" fill="#ffffff" stroke="#f59e0b" stroke-width="1.1"/>
        <text x="249" y="44" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#b45309">等価電位 250 V</text>
        <text x="249" y="57" text-anchor="middle" font-size="6.6" fill="#334155">深いフッ素分子トラップ</text>
        <text x="249" y="71" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#0369a1">48V電源不要!</text>
        <text x="160" y="98" text-anchor="middle" font-size="7.2" fill="#78350f">1万Vコロナ放電＋180℃アニールで「一生消えない電気の磁石」化</text>
      `);

    case 'mc_ecm_back_electret_weld':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fefce8" stroke="#fde047"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#854d0e">バックエレクトレット 2.5 μm 極薄PET振動膜 ＆ 均一張力</text>
        <rect x="30" y="38" width="144" height="7" rx="2" fill="#eab308"/>
        <text x="180" y="44" font-size="7.5" font-weight="bold" fill="#b45309">可動膜: 2.5 μm PET (質量1/6!)</text>
        <rect x="30" y="62" width="144" height="10" fill="#f97316" opacity="0.75"/>
        <rect x="30" y="72" width="144" height="12" fill="#b45309"/>
        <text x="180" y="72" font-size="7.5" fill="#9a3412">重い帯電FEPは固定板側へ!</text>
        <circle cx="34" cy="41" r="4" fill="#94a3b8"/>
        <circle cx="170" cy="41" r="4" fill="#94a3b8"/>
        <text x="24" y="99" font-size="7.5" fill="#713f12">真鍮リングへ12点均一テンション固定 → 20 kHz超の澄んだ高音!</text>
      `);

    case 'mc_ecm_1gohm_gate_diode':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f0fdf4" stroke="#86efac"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#166534">ECM JFET (2SK596系) 内蔵 1 GΩ 逆並列ゲートダイオード</text>
        <rect x="26" y="44" width="60" height="32" rx="4" fill="#eab308"/>
        <text x="34" y="63" font-size="7.5" font-weight="bold" fill="#1e293b">振動膜 5pF</text>
        <line x1="86" y1="60" x2="188" y2="60" stroke="#15803d" stroke-width="2"/>
        <rect x="108" y="42" width="58" height="36" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
        <text x="115" y="56" font-size="7.5" font-weight="bold" fill="#15803d">▷◁ 逆並列</text>
        <text x="117" y="69" font-size="7.5" font-weight="bold" fill="#166534">r ≈ 1 GΩ</text>
        <rect x="188" y="40" width="104" height="40" rx="5" fill="#1e293b"/>
        <text x="200" y="56" font-size="8" font-weight="bold" fill="#4ade80">内蔵 JFET</text>
        <text x="196" y="70" font-size="7" fill="#cbd5e1">GΩ → 2 kΩ 変換!</text>
        <text x="24" y="98" font-size="7.5" fill="#14532d">微小音では10億Ωの壁・衝撃スパイク時は自動で逃がす安全弁!</text>
      `);

    case 'mc_ecm_rf_tdma_bypass_caps':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fffbeb" stroke="#fde68a"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#92400e">缶内蔵 10 pF ＋ 33 pF C0G デュアル共振RF撃墜</text>
        <line x1="28" y1="84" x2="292" y2="84" stroke="#94a3b8" stroke-width="1"/>
        <path d="M36 38 L108 38 L138 80 L168 42 L206 42 L238 80 L276 40" fill="none" stroke="#d97706" stroke-width="2.2"/>
        <text x="114" y="96" font-size="7.5" font-weight="bold" fill="#b45309">33 pF (900MHz)</text>
        <text x="212" y="96" font-size="7.5" font-weight="bold" fill="#dc2626">10 pF (2.4–5GHz)</text>
        <text x="36" y="54" font-size="7.5" fill="#16a34a">音声帯: 高Z素通し</text>
        <text x="142" y="34" font-size="7.2" fill="#92400e">TDMA・Wi-Fi電波だけGND直落とし!</text>
      `);

    case 'mc_cardioid_rear_delay_mesh':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fff7ed" stroke="#fed7aa"/>
        <text x="24" y="23" font-size="8.3" font-weight="bold" fill="#9a3412">単一指向性 背面位相遅延・精密絹織抵抗メッシュ</text>
        <rect x="114" y="34" width="10" height="48" rx="1.5" fill="#0ea5e9" stroke="#0369a1" stroke-width="1"/>
        <text x="119" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">振動膜</text>
        <rect x="126" y="38" width="20" height="40" fill="#ffedd5" stroke="#fdba74" stroke-dasharray="2 1.5"/>
        <text x="136" y="60" text-anchor="middle" font-size="5.5" fill="#9a3412">気室</text>
        <rect x="148" y="34" width="12" height="48" rx="1.5" fill="#b45309" stroke="#78350f" stroke-width="1"/>
        <text x="154" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#92400e">絹メッシュ</text>
        <path d="M24 58 L108 58" stroke="#16a34a" stroke-width="2.4"/>
        <polygon points="106,54 113,58 106,62" fill="#16a34a"/>
        <text x="66" y="48" text-anchor="middle" font-size="7.3" font-weight="bold" fill="#15803d">前方音 (強収音!)</text>
        <text x="66" y="72" text-anchor="middle" font-size="6.4" fill="#166534">膜を強く振動させる</text>
        <rect x="172" y="32" width="124" height="34" rx="4" fill="#ffffff" stroke="#fca5a5" stroke-width="1"/>
        <text x="234" y="43" text-anchor="middle" font-size="6.9" font-weight="bold" fill="#dc2626">後方音 → 抵抗網で遅延一致</text>
        <text x="234" y="53" text-anchor="middle" font-size="6.4" fill="#991b1b">表裏が同相で押合い相殺</text>
        <text x="234" y="63" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#9a3412">ΔP = 0 で自動消滅!</text>
        <path d="M290 76 L166 76" stroke="#dc2626" stroke-width="2" stroke-dasharray="3.5 2"/>
        <polygon points="168,72.5 161,76 168,79.5" fill="#dc2626"/>
        <text x="234" y="88" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#b91c1c">← 背面ポートから進入 (遅延 τ)</text>
        <text x="160" y="102" text-anchor="middle" font-size="6.8" fill="#7c2d12">τ_int = R_mesh·C_v = ΔL/c により電気ゼロでカーディオイド指向性を形成</text>
      `);

    case 'mc_vent_tube_lfe_bass_port':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#0f172a">背面バスレフ低域ベント管 ＆ 共振ダンプフェルト栓</text>
        <rect x="26" y="38" width="100" height="48" rx="5" fill="#e2e8f0" stroke="#475569"/>
        <text x="36" y="64" font-size="7.5" fill="#1e293b">背面気室 V_back</text>
        <path d="M126 62 L166 62 C188 62, 188 44, 214 44 L268 44" fill="none" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
        <rect x="132" y="54" width="18" height="16" rx="2" fill="#d97706"/>
        <text x="190" y="72" font-size="7.5" font-weight="bold" fill="#0369a1">音響質量 M_tube + 抵抗 R_felt</text>
        <text x="190" y="84" font-size="7.2" fill="#475569">Q ≈ 0.7 平坦化 (缶鳴り消去!)</text>
        <text x="24" y="102" font-size="7.5" fill="#334155">狭いカメラ内部でも声の 80–250 Hz の温かみを保つ極小チューニング管</text>
      `);

    case 'mc_lens_af_stepper_vib_trap':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#0f172a">2段質量‐ばね防振トラップ (−24 dB/oct 急峻遮断!)</text>
        <rect x="34" y="34" width="76" height="14" rx="2" fill="#0ea5e9"/>
        <text x="44" y="44" font-size="7" font-weight="bold" fill="#fff">マイク部 m₁</text>
        <line x1="72" y1="48" x2="72" y2="57" stroke="#1e293b" stroke-width="3" stroke-dasharray="2 2"/>
        <rect x="34" y="57" width="76" height="13" rx="2" fill="#eab308"/>
        <text x="41" y="66" font-size="7" font-weight="bold" fill="#1e293b">真鍮重り m₂</text>
        <line x1="72" y1="70" x2="72" y2="79" stroke="#1e293b" stroke-width="3" stroke-dasharray="2 2"/>
        <rect x="34" y="79" width="76" height="12" rx="2" fill="#475569"/>
        <text x="40" y="88" font-size="7" fill="#fff">ボディ AF振動</text>
        <line x1="138" y1="86" x2="292" y2="86" stroke="#94a3b8"/>
        <path d="M144 40 L184 40 L272 58" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="3 2"/>
        <path d="M144 40 L184 40 L256 84" fill="none" stroke="#0284c7" stroke-width="2.4"/>
        <text x="232" y="45" text-anchor="middle" font-size="7" fill="#64748b">1段 −12dB/oct</text>
        <text x="176" y="79" text-anchor="middle" font-size="7.4" font-weight="bold" fill="#0369a1">2段 −24dB/oct!</text>
      `);

    case 'mc_thermal_drift_ntc_comp':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fef2f2" stroke="#fecaca"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#991b1b">−10℃〜＋50℃ 音速＆感度ドリフト NTC自動補正</text>
        <rect x="24" y="40" width="66" height="38" rx="5" fill="#ef4444"/>
        <text x="31" y="56" font-size="7.5" font-weight="bold" fill="#fff">0201 NTC</text>
        <text x="33" y="68" font-size="7" fill="#fee2e2">温度実測 T</text>
        <path d="M90 59 L114 59" stroke="#dc2626" stroke-width="2"/>
        <rect x="114" y="38" width="84" height="42" rx="4" fill="#1e293b"/>
        <text x="122" y="54" font-size="7.5" font-weight="bold" fill="#facc15">音速 c(T)計算</text>
        <text x="120" y="68" font-size="7" fill="#38bdf8">325 → 361 m/s</text>
        <path d="M198 59 L216 59" stroke="#16a34a" stroke-width="2"/>
        <rect x="216" y="40" width="80" height="38" rx="4" fill="#dcfce7" stroke="#16a34a"/>
        <text x="223" y="56" font-size="7.5" font-weight="bold" fill="#166534">LUT補正完了</text>
        <text x="223" y="69" font-size="7" fill="#15803d">指向・感度一定!</text>
        <text x="24" y="98" font-size="7.5" fill="#7f1d1d">雪山から4K長時間発熱まで、音速11%変化によるビームズレを完封</text>
      `);

    case 'mc_star_ground_audio_island':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fff7ed" stroke="#fed7aa"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#9a3412">オーディオ専用スター一点接地 ＆ 基板アイソレーション堀</text>
        <rect x="24" y="34" width="128" height="52" rx="5" fill="#dcfce7" stroke="#16a34a" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="88" cy="60" r="8" fill="#eab308"/>
        <line x1="44" y1="46" x2="88" y2="60" stroke="#c2410c" stroke-width="1.8"/>
        <line x1="44" y1="74" x2="88" y2="60" stroke="#c2410c" stroke-width="1.8"/>
        <line x1="128" y1="46" x2="88" y2="60" stroke="#c2410c" stroke-width="1.8"/>
        <text x="34" y="98" font-size="7.5" font-weight="bold" fill="#15803d">静粛アナログ島 (堀で隔離)</text>
        <line x1="152" y1="60" x2="188" y2="60" stroke="#eab308" stroke-width="4"/>
        <text x="155" y="52" font-size="7" font-weight="bold" fill="#b45309">1本橋</text>
        <rect x="188" y="34" width="106" height="52" rx="5" fill="#fee2e2" stroke="#dc2626"/>
        <text x="198" y="54" font-size="7.5" font-weight="bold" fill="#991b1b">デジタル大電流GND</text>
        <text x="200" y="69" font-size="7" fill="#b91c1c">BIONZ・IBIS泥水</text>
        <text x="200" y="98" font-size="7.5" fill="#991b1b">逆流ループ電流ゼロ!</text>
      `);

    case 'mc_zero_cross_pop_mute_fet':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f0fdfa" stroke="#99f6e4"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#115e59">クリックレス・ゼロクロス同期 ＆ 10 ms ソフトランプ</text>
        <line x1="26" y1="62" x2="294" y2="62" stroke="#94a3b8" stroke-dasharray="3 2"/>
        <path d="M28 62 Q48 34 68 62 T108 62 L138 62" fill="none" stroke="#94a3b8" stroke-width="1.6"/>
        <circle cx="138" cy="62" r="5" fill="#e11d48"/>
        <text x="116" y="46" font-size="7.5" font-weight="bold" fill="#be123c">0V交差点でON!</text>
        <path d="M138 62 Q152 54 166 62 T196 62 Q216 32 236 62 T288 62" fill="none" stroke="#0d9488" stroke-width="2.4"/>
        <text x="196" y="38" font-size="7.5" font-weight="bold" fill="#0f766e">S字滑らかフェード</text>
        <text x="24" y="98" font-size="7.5" fill="#134e4a">電源ON/OFFや録画開始時の「ボツッ！」衝撃音を0 dBへ完全消去</text>
      `);

    // =========================================================================
    // MC73–MC80: PRO CINEMA I/O, MI-SHOE 4CH, MASTER PLL, TIMECODE & OTP
    // =========================================================================
    case 'mc_pip_28v_current_limit':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fff5f5" stroke="#fecaca"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#991b1b">3.5 mm プラグインパワー 2.8 V 過電流保護インジェクタ</text>
        <rect x="24" y="38" width="58" height="24" rx="3" fill="#f59e0b"/>
        <text x="30" y="53" font-size="7.5" font-weight="bold" fill="#fff">2.8V制限</text>
        <line x1="82" y1="50" x2="112" y2="50" stroke="#dc2626" stroke-width="1.8"/>
        <rect x="112" y="42" width="38" height="16" rx="2" fill="#e2e8f0" stroke="#475569"/>
        <text x="117" y="53" font-size="7" fill="#0f172a">2.2kΩ</text>
        <line x1="150" y1="50" x2="174" y2="50" stroke="#0f172a" stroke-width="2"/>
        <line x1="174" y1="50" x2="174" y2="78" stroke="#0284c7" stroke-width="2"/>
        <text x="142" y="90" font-size="7.5" font-weight="bold" fill="#0369a1">外部マイクへ給電</text>
        <line x1="174" y1="50" x2="210" y2="50" stroke="#0f172a" stroke-width="2"/>
        <line x1="210" y1="38" x2="210" y2="62" stroke="#16a34a" stroke-width="3"/>
        <line x1="218" y1="38" x2="218" y2="62" stroke="#16a34a" stroke-width="3"/>
        <line x1="218" y1="50" x2="288" y2="50" stroke="#16a34a" stroke-width="2"/>
        <text x="226" y="44" font-size="7.5" font-weight="bold" fill="#15803d">AC音声のみ通過</text>
        <text x="226" y="64" font-size="7" fill="#475569">ショート時 &lt;3mA安全</text>
      `);

    case 'mc_35mm_plug_detect_switch':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fff1f2" stroke="#fda4af"/>
        <text x="24" y="23" font-size="8.4" font-weight="bold" fill="#9f1239">3.5 mm 物理挿入検知リーフSW ＆ 自動入力踏切</text>
        <rect x="24" y="58" width="94" height="18" rx="3" fill="#eab308" stroke="#b45309"/>
        <text x="71" y="70" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#1e293b">TRSプラグ挿入→</text>
        <path d="M112 56 L164 43" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
        <circle cx="166" cy="54" r="4" fill="#64748b"/>
        <text x="144" y="36.5" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#be123c">金バネ開離 (NC→Open)</text>
        <rect x="192" y="38" width="104" height="42" rx="5" fill="#1e293b"/>
        <text x="244" y="54" text-anchor="middle" font-size="7.4" font-weight="bold" fill="#38bdf8">20 ms デバウンス</text>
        <text x="244" y="68" text-anchor="middle" font-size="7.4" fill="#4ade80">内蔵OFF→外部ON!</text>
        <text x="160" y="96" text-anchor="middle" font-size="7.3" fill="#881337">物理バネ＋チャタリング除去＋ゼロクロス連動で1万回挿抜耐久</text>
      `);

    case 'mc_xlr_k3m_48v_phantom_if':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fefce8" stroke="#fde047"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#854d0e">MIシュー 4ch 24-bit ＆ XLR-K3M ＋48 V ファンタム</text>
        <rect x="24" y="38" width="78" height="42" rx="4" fill="#1e293b"/>
        <text x="31" y="55" font-size="7.5" font-weight="bold" fill="#facc15">XLR プロ入力</text>
        <text x="31" y="68" font-size="7" fill="#38bdf8">＋48 V 給電</text>
        <path d="M102 59 L126 59" stroke="#eab308" stroke-width="2.2"/>
        <rect x="126" y="38" width="76" height="42" rx="4" fill="#0284c7"/>
        <text x="134" y="54" font-size="7.5" font-weight="bold" fill="#fff">XLR-K3M内</text>
        <text x="134" y="68" font-size="7" fill="#e0f2fe">24-bit ADC化</text>
        <path d="M202 59 L224 59" stroke="#16a34a" stroke-width="2.6"/>
        <rect x="224" y="38" width="74" height="42" rx="4" fill="#16a34a"/>
        <text x="233" y="54" font-size="7.5" font-weight="bold" fill="#fff">MIシュー</text>
        <text x="232" y="68" font-size="7" fill="#dcfce7">4ch直結!</text>
        <text x="24" y="98" font-size="7.5" fill="#713f12">ホットシュー1つでプロ用＋48Vマイク×4chをケーブル無し無劣化収録</text>
      `);

    case 'mc_24576mhz_audio_pll_jitter':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f0f9ff" stroke="#bae6fd"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#0c4a6e">24.576 MHz (&lt;1 ps) 超低ジッター水晶 ＆ リップシンクPLL</text>
        <rect x="24" y="38" width="84" height="40" rx="4" fill="#eab308" stroke="#a16207"/>
        <text x="31" y="55" font-size="7.5" font-weight="bold" fill="#1e293b">AT水晶発振</text>
        <text x="31" y="68" font-size="7" fill="#422006">24.576 MHz</text>
        <path d="M108 58 L136 58" stroke="#0284c7" stroke-width="2.2"/>
        <rect x="136" y="38" width="74" height="40" rx="4" fill="#0284c7"/>
        <text x="145" y="54" font-size="7.5" font-weight="bold" fill="#fff">分数PLL</text>
        <text x="143" y="67" font-size="7" fill="#e0f2fe">Δt &lt; 1 ps</text>
        <path d="M210 48 L234 42 M210 68 L234 74" stroke="#16a34a" stroke-width="2"/>
        <text x="238" y="45" font-size="7.5" font-weight="bold" fill="#15803d">48.000 kHz音</text>
        <text x="238" y="77" font-size="7.5" font-weight="bold" fill="#0369a1">23.976fps映像</text>
        <text x="24" y="98" font-size="7.5" fill="#0369a1">1兆分の1秒の正確さで1時間超の長回しでも口パクズレ 0.0 コマ!</text>
      `);

    case 'mc_timecode_ltc_audio_sync':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fffbeb" stroke="#fde68a"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#92400e">SMPTE 12M LTC タイムコード音声バーコード同期</text>
        <path d="M26 62 L40 62 L40 42 L58 42 L58 62 L70 62 L70 42 L82 42 L82 62 L106 62 L106 42 L124 42 L124 62 L148 62" fill="none" stroke="#d97706" stroke-width="2.2"/>
        <text x="28" y="78" font-size="7.5" font-weight="bold" fill="#b45309">80-bit バイフェーズ音声信号</text>
        <rect x="166" y="34" width="130" height="48" rx="5" fill="#1e293b"/>
        <text x="176" y="51" font-size="8.5" font-weight="bold" fill="#facc15">01:24:18:12</text>
        <text x="176" y="65" font-size="7" fill="#4ade80">Cam A / B / C 同時収録</text>
        <text x="176" y="76" font-size="7" fill="#38bdf8">編集ソフト 1発0コマ整列</text>
        <text x="24" y="99" font-size="7.5" fill="#78350f">時分秒とコマ番号を音で刻み、マルチカメラと外部録音を完全同期</text>
      `);

    case 'mc_spatial_ambisonics_matrix':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#ecfeff" stroke="#a5f3fc"/>
        <text x="24" y="23" font-size="8.2" font-weight="bold" fill="#155e75">3D空間オーディオ / 1次アンビソニックス (W・X・Y・Z)</text>
        <circle cx="74" cy="64" r="21" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
        <ellipse cx="74" cy="64" rx="21" ry="6.5" fill="none" stroke="#0284c7" stroke-width="0.9" stroke-dasharray="2.5 2"/>
        <line x1="74" y1="39" x2="74" y2="89" stroke="#0f766e" stroke-width="1.5"/>
        <line x1="48" y1="64" x2="100" y2="64" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="59" y1="78" x2="89" y2="50" stroke="#d97706" stroke-width="1.5"/>
        <circle cx="74" cy="64" r="2.6" fill="#0369a1"/>
        <text x="74" y="35" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#0f766e">Z (上下)</text>
        <text x="103" y="66.5" font-size="6.8" font-weight="bold" fill="#dc2626">Y (左右)</text>
        <text x="24" y="83" font-size="6.6" font-weight="bold" fill="#b45309">X (前後)</text>
        <rect x="138" y="32" width="160" height="54" rx="5" fill="#1e293b"/>
        <text x="218" y="46" text-anchor="middle" font-size="7.4" font-weight="bold" fill="#facc15">B-Format 4ch 空間変換</text>
        <text x="146" y="60" font-size="6.8" fill="#38bdf8">W: 全方向音圧 ／ X: 前後</text>
        <text x="146" y="74" font-size="6.8" fill="#4ade80">Y: 左右 ／ Z: 上下 360°記録</text>
        <text x="160" y="101" text-anchor="middle" font-size="7.2" fill="#164e63">撮影後に360°どの方向へも自在に仮想マイクを向け直せる立体音響</text>
      `);

    case 'mc_true_peak_lookahead_limiter':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#fff1f2" stroke="#fecdd3"/>
        <text x="24" y="23" font-size="8.4" font-weight="bold" fill="#9f1239">5 ms 先読みトゥルーピーク・リミッター (−1.0 dBTP)</text>
        <line x1="26" y1="44" x2="294" y2="44" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="4 2"/>
        <text x="220" y="38.5" font-size="7" font-weight="bold" fill="#dc2626">天井 −1.0 dBTP</text>
        <path d="M28 74 L92 74 L126 31 L158 74 L288 74" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
        <path d="M28 74 L76 74 C96 74, 108 44, 126 44 C144 44, 158 74, 184 74 L288 74" fill="none" stroke="#e11d48" stroke-width="2.4"/>
        <rect x="76" y="76" width="52" height="14" rx="2" fill="#0ea5e9"/>
        <text x="102" y="85.5" text-anchor="middle" font-size="7" font-weight="bold" fill="#fff">5ms先読み</text>
        <text x="160" y="102" text-anchor="middle" font-size="7.3" fill="#881337">240サンプル遅延バッファで未来の爆音を予知し無歪みソフト着地!</text>
      `);

    case 'mc_factory_anechoic_cal_otp':
      return wrap(`
        <rect x="14" y="10" width="292" height="98" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="24" y="24" font-size="8.5" font-weight="bold" fill="#0f172a">工場無響室 1 kHz / 94 dB SPL 全数ペア校正 OTP</text>
        <rect x="24" y="36" width="108" height="48" rx="4" fill="#1e293b"/>
        <polygon points="30,82 38,68 46,82 54,68 62,82 70,68 78,82 86,68 94,82 102,68 110,82 118,68 126,82" fill="#475569"/>
        <text x="34" y="51" font-size="7.5" font-weight="bold" fill="#38bdf8">無響室 94 dB SPL</text>
        <text x="42" y="63" font-size="7" fill="#facc15">1 kHz 基準音</text>
        <path d="M132 60 L156 60" stroke="#0284c7" stroke-width="2.2"/>
        <rect x="156" y="36" width="140" height="48" rx="5" fill="#fefce8" stroke="#eab308" stroke-width="1.6"/>
        <text x="164" y="51" font-size="8" font-weight="bold" fill="#854d0e">不揮発性 OTP メモリ</text>
        <text x="164" y="64" font-size="7.2" fill="#15803d">感度偏差 ΔS &lt; ±0.1 dB</text>
        <text x="164" y="76" font-size="7.2" fill="#0369a1">位相整合 Δφ &lt; ±1.0°</text>
        <text x="24" y="99" font-size="7.5" fill="#475569">全個体の左右・第3マイクのクセを永久記憶しプロ級の定位を実現!</text>
      `);

    default:
      return null;
  }
}
