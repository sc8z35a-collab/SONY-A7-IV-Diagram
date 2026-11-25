import { PartExplanation } from '../assemblies/types';

/**
 * Phase 29A — 25 Bespoke 320x118 Technical Physics Schematics for Pixel V2 Deep Expansion (P2-31 – P2-55).
 * Every element stays strictly inside x ∈ [6, 314], y ∈ [8, 114].
 */
export function renderPhase29PixelV2DeepSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  const wrap = (body: string) =>
    `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${body}</svg>`;

  switch (type) {
    case 'pv2_perovskite_3rgb_stack':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="28" y="24" width="132" height="19" rx="3" fill="#2563eb"/>
        <text x="42" y="37" font-size="8.5" fill="#fff">青ペロブスカイト (2.45eV)</text>
        <rect x="28" y="48" width="132" height="19" rx="3" fill="#059669"/>
        <text x="42" y="61" font-size="8.5" fill="#fff">緑ペロブスカイト (2.15eV)</text>
        <rect x="28" y="72" width="132" height="19" rx="3" fill="#dc2626"/>
        <text x="42" y="85" font-size="8.5" fill="#fff">赤ペロブスカイト (1.75eV)</text>
        <rect x="28" y="43" width="132" height="5" fill="#cbd5e1"/>
        <rect x="28" y="67" width="132" height="5" fill="#cbd5e1"/>
        <line x1="60" y1="12" x2="60" y2="28" stroke="#2563eb" stroke-width="2"/>
        <line x1="94" y1="12" x2="94" y2="54" stroke="#059669" stroke-width="2"/>
        <line x1="128" y1="12" x2="128" y2="78" stroke="#dc2626" stroke-width="2"/>
        <text x="172" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">ETH / Empa 2025</text>
        <text x="172" y="49" font-size="8" fill="#1d4ed8">・カラーフィルター不要</text>
        <text x="172" y="63" font-size="8" fill="#047857">・光利用効率 約3倍!</text>
        <text x="172" y="77" font-size="8" fill="#b91c1c">・色モアレ(偽色)ゼロ</text>
        <text x="172" y="93" font-size="7.5" fill="#475569">透明ITO電極で3色同時読出</text>
      `);

    case 'pv2_qdpd_metasurface_cavity':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fff1f2" stroke="#fecdd3"/>
        <rect x="30" y="78" width="144" height="12" fill="#d97706"/>
        <rect x="52" y="78" width="14" height="12" fill="#1e293b"/>
        <rect x="94" y="78" width="14" height="12" fill="#1e293b"/>
        <rect x="136" y="78" width="14" height="12" fill="#1e293b"/>
        <rect x="30" y="54" width="144" height="24" fill="#e0f2fe" stroke="#38bdf8"/>
        <rect x="30" y="30" width="144" height="24" rx="3" fill="#e11d48"/>
        <circle cx="58" cy="42" r="4" fill="#fde047"/><circle cx="88" cy="42" r="4" fill="#fde047"/>
        <circle cx="118" cy="42" r="4" fill="#fde047"/><circle cx="148" cy="42" r="4" fill="#fde047"/>
        <path d="M102 14 L102 74 M106 74 L106 34" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="46" y="25" font-size="8" font-weight="bold" fill="#9f1239">PbS/InAs 量子ドット層</text>
        <text x="36" y="102" font-size="8" fill="#92400e">Auプラズモニック・ナノ穴共振ミラー</text>
        <text x="184" y="34" font-size="8.5" font-weight="bold" fill="#881337">imec IEDM 2025 8-5</text>
        <text x="184" y="50" font-size="8" fill="#475569">300mm CMOS直結</text>
        <text x="184" y="64" font-size="8" fill="#0369a1">SWIR波長を自在共鳴</text>
        <text x="184" y="78" font-size="8" fill="#be123c">940–1550nm高効率検出</text>
      `);

    case 'pv2_subwave_airgap_lightpipe':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f0f9ff" stroke="#bae6fd"/>
        <rect x="36" y="22" width="14" height="68" fill="#334155"/>
        <rect x="148" y="22" width="14" height="68" fill="#334155"/>
        <polygon points="62,22 136,22 120,90 78,90" fill="#38bdf8" opacity="0.72" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M76 12 L126 48 L82 74 L100 94" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
        <text x="48" y="60" font-size="7.5" fill="#0369a1">空気</text>
        <text x="132" y="60" font-size="7.5" fill="#0369a1">空気</text>
        <text x="74" y="104" font-size="8" fill="#0f172a">Si₃N₄コア(n=2.02)</text>
        <text x="174" y="34" font-size="8.5" font-weight="bold" fill="#0369a1">全反射エアギャップ導波</text>
        <text x="174" y="50" font-size="8" fill="#334155">屈折率比 2.02 vs 1.00</text>
        <text x="174" y="65" font-size="8" fill="#d97706">臨界角 θ_c ≈ 29.7°</text>
        <text x="174" y="80" font-size="8" fill="#0f766e">F1.2斜め光も混色ゼロ!</text>
      `);

    case 'pv2_dual_depth_gs_dti':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="26" y="22" width="142" height="72" rx="3" fill="#dbeafe" stroke="#3b82f6"/>
        <rect x="52" y="22" width="12" height="54" fill="#475569" stroke="#06b6d4" stroke-width="1.2"/>
        <rect x="116" y="22" width="14" height="68" fill="#1e293b" stroke="#06b6d4" stroke-width="1.4"/>
        <text x="36" y="88" font-size="7.5" fill="#334155">7.2μm浅壁</text>
        <text x="102" y="102" font-size="7.5" font-weight="bold" fill="#0f172a">7.5μm超深壁</text>
        <text x="76" y="54" font-size="8.5" font-weight="bold" fill="#1d4ed8">PD</text>
        <text x="142" y="54" font-size="8.5" font-weight="bold" fill="#0f172a">SN</text>
        <text x="178" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">IISW 2025 単一マスク</text>
        <text x="178" y="49" font-size="8" fill="#0369a1">2.2μm 世界最小GS画素</text>
        <text x="178" y="64" font-size="8" fill="#475569">幅の差で1回に2深さ掘削</text>
        <text x="178" y="79" font-size="8" fill="#0f766e">側壁Al₂O₃で暗電流低減</text>
      `);

    case 'pv2_bsi_align_fiducial_trench':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fefce8" stroke="#fde047"/>
        <rect x="34" y="22" width="74" height="74" fill="none" stroke="#334155" stroke-width="5"/>
        <line x1="50" y1="59" x2="92" y2="59" stroke="#d97706" stroke-width="5"/>
        <line x1="71" y1="38" x2="71" y2="80" stroke="#d97706" stroke-width="5"/>
        <line x1="122" y1="22" x2="122" y2="96" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="132" y="34" font-size="8.5" font-weight="bold" fill="#92400e">表裏BSI超精密アライメント</text>
        <text x="132" y="50" font-size="8" fill="#334155">Cross-in-Box 深掘り基準</text>
        <text x="132" y="65" font-size="8.5" font-weight="bold" fill="#dc2626">重ね合わせ誤差 &lt; 5 nm!</text>
        <text x="132" y="81" font-size="8" fill="#475569">表回路と裏遮光壁を完全一致</text>
        <text x="132" y="95" font-size="7.5" fill="#0369a1">IISW 2025 両面レーザー計測</text>
      `);

    case 'pv2_dual_metal_pls_hood':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
        <polygon points="44,86 58,34 134,34 148,86 132,86 122,48 70,48 60,86" fill="#334155"/>
        <polygon points="64,86 73,52 119,52 128,86" fill="#d97706" opacity="0.35" stroke="#d97706"/>
        <rect x="78" y="64" width="36" height="20" rx="2" fill="#0284c7"/>
        <text x="86" y="77" font-size="8.5" font-weight="bold" fill="#fff">SN</text>
        <path d="M22 22 L62 46 L34 52" fill="none" stroke="#ef4444" stroke-width="1.8"/>
        <text x="162" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">W/TiN 3段放物面フード</text>
        <text x="162" y="50" font-size="8" fill="#dc2626">斜め迷光を多重反射消滅</text>
        <text x="162" y="66" font-size="8.5" font-weight="bold" fill="#0369a1">PLS &lt; −105 dB 達成</text>
        <text x="162" y="82" font-size="8" fill="#475569">(迷光漏れ 17万分の1以下)</text>
      `);

    case 'pv2_deuterium_sid_passivation':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f0fdfa" stroke="#99f6e4"/>
        <rect x="20" y="68" width="144" height="28" rx="3" fill="#0f766e"/>
        <text x="58" y="86" font-size="8.5" fill="#fff">Si(100) 結晶界面</text>
        ${[42, 74, 106, 138]
          .map(
            (x) =>
              `<circle cx="${x}" cy="64" r="6" fill="#38bdf8"/><line x1="${x}" y1="58" x2="${x}" y2="38" stroke="#f59e0b" stroke-width="2.4"/><circle cx="${x}" cy="33" r="6" fill="#fbbf24"/><text x="${x - 3}" y="36" font-size="7.5" font-weight="bold" fill="#0f172a">D</text>`
          )
          .join('')}
        <text x="174" y="34" font-size="8.5" font-weight="bold" fill="#0f766e">重水素 Si–D 終端</text>
        <text x="174" y="49" font-size="8" fill="#334155">質量2倍の重水素(²H)蓋</text>
        <text x="174" y="64" font-size="8" fill="#b45309">動的同位体効果で耐衝撃!</text>
        <text x="174" y="79" font-size="8" fill="#0369a1">脱離率 10–50分の1へ</text>
        <text x="174" y="94" font-size="7.5" fill="#475569">RTS・暗電流劣化を防止</text>
      `);

    case 'pv2_carbon_cluster_gettering':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fff7ed" stroke="#fed7aa"/>
        <rect x="22" y="20" width="136" height="34" fill="#e0f2fe" stroke="#38bdf8"/>
        <text x="48" y="40" font-size="8.5" fill="#0369a1">清浄PD受光エピ層</text>
        <rect x="22" y="54" width="136" height="42" fill="#1e293b"/>
        <circle cx="54" cy="75" r="7" fill="#f97316"/><circle cx="90" cy="75" r="7" fill="#f97316"/><circle cx="126" cy="75" r="7" fill="#f97316"/>
        <text x="48" y="78" font-size="7" fill="#fff">Fe</text><text x="84" y="78" font-size="7" fill="#fff">Cu</text><text x="120" y="78" font-size="7" fill="#fff">Ni</text>
        <path d="M54 44 L54 64 M90 44 L90 64 M126 44 L126 64" stroke="#f97316" stroke-width="1.6" stroke-dasharray="2 2"/>
        <text x="168" y="34" font-size="8.5" font-weight="bold" fill="#9a3412">C₃H₆ / CH₂P 捕獲層</text>
        <text x="168" y="49" font-size="8" fill="#334155">炭素かごで重金属を捕縛</text>
        <text x="168" y="64" font-size="8.5" font-weight="bold" fill="#ea580c">暗電流 最大 −67%!</text>
        <text x="168" y="79" font-size="8" fill="#0f766e">白点欠陥 −40% (SUMCO)</text>
        <text x="168" y="94" font-size="7.5" fill="#475569">水素供給＋酸素バリア兼任</text>
      `);

    case 'pv2_pp_surface_pinning_skin':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fdf2f8" stroke="#fbcfe8"/>
        <rect x="24" y="24" width="138" height="18" fill="#e2e8f0" stroke="#94a3b8"/>
        <text x="64" y="36" font-size="8" fill="#334155">SiO₂ 酸化膜</text>
        <rect x="24" y="42" width="138" height="16" fill="#ec4899"/>
        <text x="36" y="53" font-size="8" font-weight="bold" fill="#fff">P⁺ 正孔スキン (20nm, 0V)</text>
        <rect x="24" y="58" width="138" height="36" fill="#0284c7"/>
        <text x="48" y="80" font-size="8.5" fill="#fff">N型 埋め込みPD空乏層</text>
        <text x="172" y="34" font-size="8.5" font-weight="bold" fill="#9d174d">表面ピニング効果</text>
        <text x="172" y="50" font-size="8" fill="#334155">正孔が界面欠陥を封鎖</text>
        <text x="172" y="65" font-size="8.5" font-weight="bold" fill="#db2777">暗電流 1/1000 激減</text>
        <text x="172" y="81" font-size="8" fill="#0369a1">V_pin固定で完全転送</text>
      `);

    case 'pv2_graded_potential_stair':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
        <path d="M22 30 L58 30 L58 46 L94 46 L94 62 L130 62 L130 78 L166 78" fill="none" stroke="#1d4ed8" stroke-width="2.6"/>
        <circle cx="42" cy="24" r="4.5" fill="#f59e0b"/><circle cx="78" cy="40" r="4.5" fill="#f59e0b"/>
        <circle cx="114" cy="56" r="4.5" fill="#f59e0b"/><circle cx="150" cy="72" r="4.5" fill="#f59e0b"/>
        <text x="26" y="96" font-size="8" fill="#1e40af">N⁻ → N → N⁺ → TG出口</text>
        <text x="178" y="34" font-size="8.5" font-weight="bold" fill="#1e3a8a">傾斜ポテンシャル階段</text>
        <text x="178" y="50" font-size="8" fill="#334155">内蔵電界で電子を加速</text>
        <text x="178" y="66" font-size="8.5" font-weight="bold" fill="#0284c7">転送時間 &lt; 30 ns!</text>
        <text x="178" y="82" font-size="8" fill="#0f766e">残像(ラグ) &lt; 0.01%</text>
      `);

    case 'pv2_radical_ox_chargefree_il':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#ecfeff" stroke="#a5f3fc"/>
        <circle cx="46" cy="24" r="5" fill="#06b6d4"/><circle cx="82" cy="24" r="5" fill="#f59e0b"/><circle cx="118" cy="24" r="5" fill="#06b6d4"/>
        <path d="M46 30 L46 46 M82 30 L82 46 M118 30 L118 46" stroke="#0891b2" stroke-width="1.5" stroke-dasharray="2 2"/>
        <rect x="24" y="48" width="124" height="14" fill="#67e8f9" stroke="#0891b2"/>
        <text x="36" y="58" font-size="7.5" font-weight="bold" fill="#0f172a">無電荷ラジカルSiO₂ IL</text>
        <rect x="24" y="64" width="124" height="28" fill="#1e3a5f"/>
        <text x="54" y="81" font-size="8.5" fill="#fff">Si 結晶チャネル</text>
        <text x="160" y="34" font-size="8.5" font-weight="bold" fill="#0e7490">imec IEDM 2025 40-1</text>
        <text x="160" y="50" font-size="8" fill="#334155">O*/H*活性ラジカル酸化</text>
        <text x="160" y="66" font-size="8" fill="#0369a1">固定電荷 Q_f → 0</text>
        <text x="160" y="82" font-size="8" fill="#0f766e">垂直溝側壁も無欠陥!</text>
      `);

    case 'pv2_dual_vtg_twin_pillar':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fffbeb" stroke="#fde68a"/>
        <rect x="34" y="22" width="116" height="14" rx="2" fill="#d97706"/>
        <rect x="46" y="36" width="18" height="56" fill="#b45309" stroke="#38bdf8" stroke-width="1.5"/>
        <rect x="120" y="36" width="18" height="56" fill="#b45309" stroke="#38bdf8" stroke-width="1.5"/>
        <path d="M92 94 L92 40" stroke="#0284c7" stroke-width="3"/>
        <polygon points="92,34 86,44 98,44" fill="#0284c7"/>
        <text x="72" y="88" font-size="8" font-weight="bold" fill="#0369a1">両側挟み</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#92400e">D-VTG ツインピラー</text>
        <text x="164" y="50" font-size="8" fill="#334155">2本柱で深部電子を吸引</text>
        <text x="164" y="66" font-size="8" fill="#0369a1">4–6μm厚膜NIR対応</text>
        <text x="164" y="82" font-size="8" fill="#b45309">低電圧2.2Vで完全転送</text>
      `);

    case 'pv2_vod_antiblooming_barrier':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fff7ed" stroke="#fdba74"/>
        <path d="M24 24 L42 24 L42 84 L96 84 L96 42 L116 42 L116 94 L156 94" fill="none" stroke="#1e293b" stroke-width="2.2"/>
        <rect x="44" y="48" width="50" height="34" fill="#38bdf8" opacity="0.65"/>
        <path d="M90 44 Q106 30 124 64" fill="none" stroke="#ea580c" stroke-width="2.2"/>
        <text x="52" y="70" font-size="8" font-weight="bold" fill="#0f172a">PD満杯</text>
        <text x="114" y="86" font-size="7.5" fill="#ea580c">N基板排出</text>
        <text x="166" y="34" font-size="8.5" font-weight="bold" fill="#9a3412">VOD 非常放水サドル</text>
        <text x="166" y="50" font-size="8" fill="#334155">隣壁より0.3V低い堰</text>
        <text x="166" y="66" font-size="8" fill="#ea580c">余剰電子を下へ安全逃し</text>
        <text x="166" y="82" font-size="8" fill="#0369a1">1万倍逆光も滲みゼロ!</text>
      `);

    case 'pv2_rts_oxide_border_trap':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fef2f2" stroke="#fecaca"/>
        <rect x="20" y="20" width="122" height="76" rx="4" fill="#fff" stroke="#fca5a5"/>
        <circle cx="81" cy="54" r="10" fill="#dc2626"/>
        <text x="75" y="57" font-size="8" font-weight="bold" fill="#fff">E'</text>
        <path d="M30 82 L56 82 L56 68 L84 68 L84 82 L106 82 L106 68 L132 68" fill="none" stroke="#dc2626" stroke-width="1.8"/>
        <text x="32" y="33" font-size="7.5" fill="#991b1b">単一酸素空孔トラップ</text>
        <text x="154" y="34" font-size="8.5" font-weight="bold" fill="#991b1b">PNAS 2025 RTS欠陥</text>
        <text x="154" y="50" font-size="8" fill="#334155">酸化膜1.5nm奥の1欠陥</text>
        <text x="154" y="65" font-size="8" fill="#dc2626">電子1粒の捕獲で2段揺れ</text>
        <text x="154" y="81" font-size="8" fill="#0369a1">2層SF大型化+重水素で克服</text>
      `);

    case 'pv2_qis_pump_gate_jot':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#ecfeff" stroke="#67e8f9"/>
        <rect x="22" y="56" width="54" height="32" rx="3" fill="#0284c7"/>
        <text x="32" y="75" font-size="8" fill="#fff">SW井戸</text>
        <polygon points="76,54 114,40 114,52 76,66" fill="#d97706"/>
        <rect x="118" y="34" width="24" height="22" rx="3" fill="#06b6d4"/>
        <text x="122" y="48" font-size="7.5" font-weight="bold" fill="#fff">FD</text>
        <path d="M22 98 L40 98 L40 88 L56 88 L56 98 L72 98 L72 78 L88 78 L88 98" fill="none" stroke="#0891b2" stroke-width="1.5"/>
        <text x="154" y="32" font-size="8.5" font-weight="bold" fill="#0e7490">QIS ポンプゲート・ジョット</text>
        <text x="154" y="48" font-size="8" fill="#334155">遠隔FDで C_FD ≈ 0.15 fF</text>
        <text x="154" y="64" font-size="8.5" font-weight="bold" fill="#0284c7">CG &gt; 400 μV/e⁻!</text>
        <text x="154" y="80" font-size="8" fill="#0f766e">室温 0.15e⁻ 単一光子計数</text>
      `);

    case 'pv2_ge_on_si_swir_spad':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fff1f2" stroke="#fda4af"/>
        <rect x="30" y="20" width="122" height="24" rx="2" fill="#be123c"/>
        <text x="50" y="35" font-size="8" fill="#fff">Ge 吸収層 (1550nm)</text>
        <rect x="30" y="46" width="122" height="10" fill="#f59e0b"/>
        <text x="48" y="54" font-size="7" fill="#0f172a">B 電荷制御シート</text>
        <rect x="30" y="58" width="122" height="32" rx="2" fill="#1d4ed8"/>
        <text x="42" y="77" font-size="8" fill="#fff">Si 高電界アバランシェ</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#9f1239">IEDM 2025 Paper 8-1</text>
        <text x="164" y="50" font-size="8" fill="#334155">10μm Ge-on-Si SPAD</text>
        <text x="164" y="65" font-size="8.5" font-weight="bold" fill="#be123c">1550nm PDE 23.3%!</text>
        <text x="164" y="81" font-size="8" fill="#1d4ed8">1300nm PDE 33.8% (室温)</text>
      `);

    case 'pv2_double_junction_harvest_pd':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f0fdf4" stroke="#86efac"/>
        <rect x="26" y="22" width="126" height="28" rx="3" fill="#0284c7"/>
        <text x="44" y="39" font-size="8.5" fill="#fff">上層: 可視光 撮像PD</text>
        <rect x="26" y="52" width="126" height="9" fill="#94a3b8"/>
        <rect x="26" y="63" width="126" height="28" rx="3" fill="#16a34a"/>
        <text x="38" y="80" font-size="8.5" fill="#fff">下層: 長波長 ソーラー発電</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#166534">二重接合 P⁺PNPP⁺</text>
        <text x="164" y="50" font-size="8" fill="#334155">開口率100%のまま二刀流</text>
        <text x="164" y="66" font-size="8" fill="#15803d">余剰赤外光で自己給電!</text>
        <text x="164" y="82" font-size="8" fill="#0369a1">2025年6月 次世代省電力</text>
      `);

    case 'pv2_evs_log_change_pixel':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f0f9ff" stroke="#7dd3fc"/>
        <rect x="18" y="36" width="48" height="36" rx="4" fill="#0369a1"/>
        <text x="26" y="57" font-size="8" fill="#fff">対数受光</text>
        <line x1="66" y1="54" x2="82" y2="54" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="82" y="36" width="46" height="36" rx="4" fill="#475569"/>
        <text x="89" y="57" font-size="8" fill="#fff">Δln(I)</text>
        <line x1="128" y1="46" x2="148" y2="34" stroke="#06b6d4" stroke-width="2"/>
        <line x1="128" y1="62" x2="148" y2="74" stroke="#dc2626" stroke-width="2"/>
        <text x="152" y="38" font-size="8.5" font-weight="bold" fill="#0891b2">ON (+Δ)</text>
        <text x="152" y="78" font-size="8.5" font-weight="bold" fill="#dc2626">OFF (−Δ)</text>
        <text x="198" y="38" font-size="8.5" font-weight="bold" fill="#0f172a">Sony-Prophesee</text>
        <text x="198" y="54" font-size="8" fill="#0369a1">DR &gt; 140 dB</text>
        <text x="198" y="69" font-size="8" fill="#0f766e">1万fps相当・&lt;50mW</text>
        <text x="198" y="84" font-size="7.5" fill="#475569">変化時のみ非同期発火</text>
      `);

    case 'pv2_200nm_w2w_hybrid_array':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fff7ed" stroke="#fed7aa"/>
        <rect x="24" y="22" width="136" height="18" fill="#334155"/>
        <rect x="24" y="76" width="136" height="18" fill="#1e3a5f"/>
        <rect x="24" y="40" width="136" height="36" fill="#e0f2fe"/>
        ${[42, 66, 90, 114, 138]
          .map(
            (x) =>
              `<rect x="${x - 5}" y="40" width="10" height="36" fill="#d97736"/><line x1="${x - 8}" y1="58" x2="${x + 8}" y2="58" stroke="#0f172a" stroke-width="1"/>`
          )
          .join('')}
        <text x="48" y="34" font-size="8" fill="#fff">画素ウェハー (上)</text>
        <text x="48" y="88" font-size="8" fill="#fff">AI/ADCウェハー (下)</text>
        <text x="170" y="34" font-size="8.5" font-weight="bold" fill="#9a3412">imec IEDM 2025 33-5</text>
        <text x="170" y="50" font-size="8.5" font-weight="bold" fill="#c2410c">200 nm極小ピッチ!</text>
        <text x="170" y="66" font-size="8" fill="#334155">2,500万本 / mm² 密度</text>
        <text x="170" y="82" font-size="8" fill="#0369a1">全画素直結SiCN/Cu融合</text>
      `);

    case 'pv2_gs_storage_node_trench':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
        <rect x="30" y="28" width="126" height="62" rx="4" fill="#334155"/>
        <rect x="42" y="40" width="102" height="38" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="54" y="63" font-size="8.5" font-weight="bold" fill="#38bdf8">遮光SN電荷金庫</text>
        <path d="M12 58 L40 58" stroke="#f59e0b" stroke-width="2.4"/>
        <path d="M146 58 L172 58" stroke="#10b981" stroke-width="2.4"/>
        <text x="14" y="48" font-size="7.5" fill="#b45309">SG一斉</text>
        <text x="148" y="48" font-size="7.5" fill="#047857">TG2順次</text>
        <text x="180" y="36" font-size="8.5" font-weight="bold" fill="#0f172a">地下遮光ストレージ</text>
        <text x="180" y="53" font-size="8" fill="#334155">全画素同時露光→退避</text>
        <text x="180" y="69" font-size="8" fill="#0369a1">120fps歪みゼロ連写</text>
        <text x="180" y="85" font-size="8" fill="#475569">保持暗電流 &lt; 0.05e⁻</text>
      `);

    case 'pv2_thermometer_ramp_dac':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
        ${[0, 1, 2, 3, 4, 5, 6]
          .map((i) => {
            const h = 14 + i * 9;
            return `<rect x="${22 + i * 18}" y="${88 - h}" width="12" height="${h}" rx="1.5" fill="${i >= 5 ? '#d97706' : '#2563eb'}"/>`;
          })
          .join('')}
        <path d="M26 76 L96 42 L144 18" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="24" y="102" font-size="7.5" fill="#1d4ed8">暗部(高精細勾配) → 明部(高速勾配)</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#1e3a8a">温度計コードRamp DAC</text>
        <text x="164" y="50" font-size="8" fill="#334155">1本ずつ加算→段差ゼロ</text>
        <text x="164" y="66" font-size="8" fill="#dc2626">DNL &lt; ±0.15 LSB</text>
        <text x="164" y="82" font-size="8" fill="#0f766e">Sensors 2025 多重勾配</text>
      `);

    case 'pv2_16to1_cml_serializer':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fffbeb" stroke="#fde68a"/>
        <rect x="20" y="24" width="22" height="66" rx="2" fill="#334155"/>
        <rect x="52" y="33" width="22" height="48" rx="2" fill="#1d4ed8"/>
        <rect x="84" y="42" width="22" height="30" rx="2" fill="#d97706"/>
        <rect x="116" y="48" width="26" height="18" rx="2" fill="#dc2626"/>
        <circle cx="156" cy="57" r="9" fill="none" stroke="#c2410c" stroke-width="2.2"/>
        <text x="23" y="102" font-size="7.5" fill="#334155">16→8→4→2→1 ＋ Tコイル</text>
        <text x="176" y="34" font-size="8.5" font-weight="bold" fill="#92400e">16:1 CMLシリアライザ</text>
        <text x="176" y="50" font-size="8" fill="#334155">TSPC前段＋CML高速終段</text>
        <text x="176" y="66" font-size="8" fill="#b45309">Tコイル帯域 2.2倍拡張</text>
        <text x="176" y="82" font-size="8" fill="#0369a1">10–16 Gbps/lane (2026)</text>
      `);

    case 'pv2_ob_dark_ref_pixel':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
        <rect x="24" y="26" width="56" height="14" fill="#1e293b"/>
        <rect x="24" y="40" width="56" height="44" fill="#475569"/>
        <text x="34" y="65" font-size="8" font-weight="bold" fill="#fff">OB暗基準</text>
        <rect x="94" y="40" width="56" height="44" fill="#0284c7"/>
        <text x="103" y="65" font-size="8" font-weight="bold" fill="#fff">有効画素</text>
        <text x="82" y="64" font-size="11" font-weight="bold" fill="#dc2626">−</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">OB リアルタイム黒校正</text>
        <text x="164" y="50" font-size="8" fill="#334155">完全遮光ダミーでI_dark計測</text>
        <text x="164" y="66" font-size="8" fill="#0369a1">毎フレーム自動で黒引き算</text>
        <text x="164" y="82" font-size="8" fill="#dc2626">高温8K撮影も黒浮きゼロ</text>
      `);

    case 'pv2_cosmic_alpha_guard_ring':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="24" y="26" width="128" height="62" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="4"/>
        <rect x="44" y="40" width="88" height="34" rx="3" fill="#0284c7"/>
        <text x="58" y="60" font-size="8.5" fill="#fff">保護画素エリア</text>
        <path d="M18 16 L36 34" stroke="#dc2626" stroke-width="2.2"/>
        <text x="10" y="16" font-size="8" font-weight="bold" fill="#dc2626">α線</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">深掘り基板ガード堀</text>
        <text x="164" y="50" font-size="8" fill="#dc2626">α線・宇宙線の電離電子を</text>
        <text x="164" y="64" font-size="8" fill="#dc2626">画素手前で4隅へ全排出!</text>
        <text x="164" y="81" font-size="8" fill="#0369a1">デジタル基板雑音も遮断</text>
      `);

    case 'pv2_dual_cds_clamp_bridge':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f0fdfa" stroke="#99f6e4"/>
        <rect x="22" y="28" width="46" height="44" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="31" y="48" font-size="8" font-weight="bold" fill="#0369a1">C_rst</text>
        <text x="27" y="62" font-size="7.5" fill="#475569">空皿電圧</text>
        <text x="72" y="54" font-size="11" font-weight="bold" fill="#0f766e">−</text>
        <rect x="84" y="28" width="46" height="44" rx="4" fill="#ccfbf1" stroke="#0d9488"/>
        <text x="93" y="48" font-size="8" font-weight="bold" fill="#0f766e">C_sig</text>
        <text x="89" y="62" font-size="7.5" fill="#475569">露光電圧</text>
        <path d="M132 50 L150 50" stroke="#0f766e" stroke-width="2"/>
        <text x="156" y="34" font-size="8.5" font-weight="bold" fill="#0f766e">デュアルCDSノイズ消去</text>
        <text x="156" y="50" font-size="8" fill="#334155">V_sig − V_rst で風袋引き</text>
        <text x="156" y="66" font-size="8.5" font-weight="bold" fill="#0284c7">kTC熱雑音を100%相殺!</text>
        <text x="156" y="82" font-size="8" fill="#475569">1/f雑音＆個体差も同時除去</text>
      `);

    default:
      return null;
  }
}
