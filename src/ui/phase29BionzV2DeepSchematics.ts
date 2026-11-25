import { PartExplanation } from '../assemblies/types';

/**
 * Phase 29B — 25 Bespoke 320x118 Technical Physics Schematics for BIONZ XR / XR2 V2 Deep Expansion (X2-31 – X2-55).
 * Every element stays strictly inside x ∈ [6, 314], y ∈ [8, 114].
 */
export function renderPhase29BionzV2DeepSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  const wrap = (body: string) =>
    `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${body}</svg>`;

  switch (type) {
    case 'xv2_nanoflex_width_pair':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f0f9ff" stroke="#bae6fd"/>
        <rect x="26" y="24" width="68" height="14" rx="2" fill="#0284c7"/>
        <rect x="26" y="44" width="68" height="14" rx="2" fill="#0284c7"/>
        <rect x="26" y="64" width="68" height="14" rx="2" fill="#0284c7"/>
        <text x="30" y="92" font-size="8" font-weight="bold" fill="#0369a1">40nm幅(高速)</text>
        <rect x="116" y="24" width="28" height="14" rx="2" fill="#38bdf8"/>
        <rect x="116" y="44" width="28" height="14" rx="2" fill="#38bdf8"/>
        <rect x="116" y="64" width="28" height="14" rx="2" fill="#38bdf8"/>
        <text x="106" y="92" font-size="8" font-weight="bold" fill="#0891b2">15nm幅(省電力)</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">TSMC N2/A16 NanoFlex</text>
        <text x="164" y="50" font-size="8" fill="#334155">同一ウェハー上で幅可変</text>
        <text x="164" y="66" font-size="8" fill="#0284c7">AIコア=太く / SRAM=細く</text>
        <text x="164" y="82" font-size="8" fill="#0f766e">VLSI 2026 T1.5 PPA最適化</text>
      `);

    case 'xv2_hybrid_orient_cfet':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f5f3ff" stroke="#ddd6fe"/>
        <rect x="28" y="20" width="124" height="30" rx="3" fill="#0284c7"/>
        <text x="38" y="38" font-size="8.5" fill="#fff">上層 nMOS: Si(100)</text>
        <rect x="28" y="52" width="124" height="8" fill="#cbd5e1"/>
        <rect x="28" y="62" width="124" height="30" rx="3" fill="#be123c"/>
        <text x="38" y="80" font-size="8.5" fill="#fff">下層 pMOS: Si(110)</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#5b21b6">IEDM 2025 Paper 2.2</text>
        <text x="164" y="50" font-size="8" fill="#be123c">正孔移動度 2.5倍へ!</text>
        <text x="164" y="66" font-size="8" fill="#0369a1">電子・正孔それぞれの</text>
        <text x="164" y="80" font-size="8" fill="#0369a1">最強結晶方位を縦積み</text>
      `);

    case 'xv2_2d_tmd_mos2_channel':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#eef2ff" stroke="#c7d2fe"/>
        <rect x="22" y="28" width="32" height="22" rx="2" fill="#94a3b8"/>
        <rect x="116" y="28" width="32" height="22" rx="2" fill="#94a3b8"/>
        <text x="27" y="42" font-size="7.5" fill="#0f172a">Bi/Sb</text>
        <text x="121" y="42" font-size="7.5" fill="#0f172a">Bi/Sb</text>
        <rect x="22" y="54" width="126" height="12" rx="2" fill="#4f46e5"/>
        <circle cx="48" cy="60" r="4" fill="#fbbf24"/><circle cx="72" cy="60" r="4" fill="#22d3ee"/>
        <circle cx="96" cy="60" r="4" fill="#fbbf24"/><circle cx="120" cy="60" r="4" fill="#22d3ee"/>
        <rect x="22" y="72" width="126" height="18" rx="2" fill="#1e293b"/>
        <text x="48" y="84" font-size="8" fill="#e2e8f0">High-k バックゲート</text>
        <text x="160" y="34" font-size="8.5" font-weight="bold" fill="#3730a3">0.7nm 2D MoS₂ / WSe₂</text>
        <text x="160" y="50" font-size="8" fill="#334155">原子3層(0.7nm)の蜂の巣</text>
        <text x="160" y="66" font-size="8" fill="#4f46e5">vdW無損傷トップ電極</text>
        <text x="160" y="82" font-size="8" fill="#0369a1">IEDM 2025 / VLSI 2026</text>
      `);

    case 'xv2_radical_ox_il_layer':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#ecfeff" stroke="#a5f3fc"/>
        <rect x="24" y="24" width="128" height="16" fill="#d97706"/>
        <text x="58" y="35" font-size="8" fill="#fff">WFM 仕事関数金属</text>
        <rect x="24" y="42" width="128" height="16" fill="#7c3aed"/>
        <text x="64" y="53" font-size="8" fill="#fff">HfO₂ 高誘電膜</text>
        <rect x="24" y="60" width="128" height="10" fill="#22d3ee"/>
        <rect x="24" y="72" width="128" height="22" fill="#0369a1"/>
        <text x="54" y="86" font-size="8" fill="#fff">GAA Si ナノシート</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#0e7490">0.5nm 無電荷IL膜</text>
        <text x="164" y="50" font-size="8" fill="#334155">O*/H*ラジカル等方酸化</text>
        <text x="164" y="66" font-size="8" fill="#0891b2">EOT ≈ 0.75 nm達成</text>
        <text x="164" y="82" font-size="8" fill="#0f766e">NBTI/PBTI劣化を極小化</text>
      `);

    case 'xv2_cfet_nci_butt_contact':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fffbeb" stroke="#fde68a"/>
        <rect x="24" y="26" width="46" height="60" rx="2" fill="#0284c7" opacity="0.3" stroke="#0284c7"/>
        <rect x="74" y="22" width="10" height="68" fill="#64748b"/>
        <rect x="88" y="26" width="46" height="60" rx="2" fill="#be123c" opacity="0.25" stroke="#be123c"/>
        <path d="M138 30 L152 30 L152 80 L132 80" fill="none" stroke="#d97706" stroke-width="5"/>
        <text x="68" y="102" font-size="7.5" fill="#334155">NCI切断壁</text>
        <text x="128" y="102" font-size="7.5" font-weight="bold" fill="#b45309">BCT直結</text>
        <text x="168" y="34" font-size="8.5" font-weight="bold" fill="#92400e">TSMC IEDM 2025 2.5</text>
        <text x="168" y="50" font-size="8" fill="#334155">48nm CPP CFET 6T SRAM</text>
        <text x="168" y="66" font-size="8" fill="#b45309">L字BCTで上下直結!</text>
        <text x="168" y="82" font-size="8" fill="#0369a1">101段RO動作を実証</text>
      `);

    case 'xv2_cfet_epi_via_bdi':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f0fdfa" stroke="#99f6e4"/>
        <rect x="28" y="22" width="102" height="24" rx="2" fill="#0284c7"/>
        <text x="48" y="37" font-size="8" fill="#fff">上層 nFET Epi</text>
        <rect x="24" y="48" width="110" height="8" fill="#94a3b8"/>
        <rect x="28" y="58" width="102" height="24" rx="2" fill="#be123c"/>
        <text x="48" y="73" font-size="8" fill="#fff">下層 pFET Epi</text>
        <rect x="24" y="84" width="110" height="10" fill="#0f766e"/>
        <rect x="114" y="24" width="12" height="58" fill="#f59e0b"/>
        <text x="148" y="32" font-size="8.5" font-weight="bold" fill="#0f766e">VLSI 2026 Epiビア+BDI</text>
        <text x="148" y="48" font-size="8" fill="#b45309">抵抗 1753→378 Ω·μm!</text>
        <text x="148" y="64" font-size="8" fill="#be123c">下層pFET電流 5倍増</text>
        <text x="148" y="80" font-size="8" fill="#0369a1">歩留まり 45% → 85%</text>
      `);

    case 'xv2_samsung_42nm_emdi_fet':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#eef2ff" stroke="#c7d2fe"/>
        ${[24, 34, 44].map((y) => `<rect x="34" y="${y}" width="108" height="6" rx="1" fill="#0284c7"/>`).join('')}
        <rect x="28" y="54" width="120" height="8" rx="1" fill="#f59e0b"/>
        ${[66, 76, 86].map((y) => `<rect x="34" y="${y}" width="108" height="6" rx="1" fill="#be123c"/>`).join('')}
        <text x="58" y="102" font-size="7.5" fill="#1e293b">42nm CPP (3+3枚)</text>
        <text x="160" y="34" font-size="8.5" font-weight="bold" fill="#3730a3">Samsung VLSI 2026 最優秀賞</text>
        <text x="160" y="50" font-size="8" fill="#334155">世界最狭クラス42nmピッチ</text>
        <text x="160" y="66" font-size="8" fill="#b45309">中央eMDI仕切りで完全分離</text>
        <text x="160" y="82" font-size="8" fill="#0369a1">上下各3枚シート大電流駆動</text>
      `);

    case 'xv2_18ap_dual_power_boost':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fff7ed" stroke="#fed7aa"/>
        <rect x="44" y="18" width="84" height="12" fill="#d97736"/>
        <rect x="76" y="30" width="20" height="14" fill="#d97736"/>
        <rect x="52" y="44" width="68" height="22" rx="3" fill="#0284c7"/>
        <text x="64" y="58" font-size="8" font-weight="bold" fill="#fff">S/D 結晶</text>
        <rect x="76" y="66" width="20" height="16" fill="#f59e0b"/>
        <rect x="44" y="82" width="84" height="14" fill="#f59e0b"/>
        <text x="144" y="32" font-size="8.5" font-weight="bold" fill="#9a3412">Intel 18A-P Power Boost</text>
        <text x="144" y="48" font-size="8" fill="#334155">表側＋裏面PowerVia同時給電</text>
        <text x="144" y="64" font-size="8.5" font-weight="bold" fill="#dc2626">電圧降下 90mV → &lt;10mV</text>
        <text x="144" y="80" font-size="8" fill="#0369a1">0.5V時 +30%高速 / 熱−40%</text>
      `);

    case 'xv2_sru_16nm_fsav_airgap':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="24" y="82" width="124" height="12" fill="#334155"/>
        ${[34, 62, 90, 118]
          .map(
            (x, idx) =>
              `<rect x="${x}" y="44" width="14" height="38" fill="#94a3b8" stroke="#475569"/>${
                idx % 2 === 0 ? `<rect x="${x + 2}" y="26" width="10" height="18" fill="#f59e0b"/>` : ''
              }`
          )
          .join('')}
        <text x="48" y="72" font-size="7" fill="#0284c7">空気</text>
        <text x="104" y="72" font-size="7" fill="#0284c7">空気</text>
        <text x="160" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">16nmピッチ sRu＋FSAV</text>
        <text x="160" y="50" font-size="8" fill="#334155">幅8nm減算ルテニウム配線</text>
        <text x="160" y="66" font-size="8" fill="#0284c7">空気の谷間で容量−40%</text>
        <text x="160" y="82" font-size="8" fill="#b45309">FSAV保護でビア短絡ゼロ</text>
      `);

    case 'xv2_highna_euv_mor_ler':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f5f3ff" stroke="#ddd6fe"/>
        <polygon points="36,16 132,16 106,56 62,56" fill="#a855f7" opacity="0.28" stroke="#7c3aed"/>
        <text x="52" y="38" font-size="8" font-weight="bold" fill="#5b21b6">0.55 NA EUV</text>
        ${[42, 62, 82, 102, 122].map((x) => `<rect x="${x}" y="60" width="9" height="24" fill="#6d28d9"/>`).join('')}
        <rect x="28" y="84" width="114" height="10" fill="#1e293b"/>
        <text x="154" y="34" font-size="8.5" font-weight="bold" fill="#5b21b6">High-NA EUV ＋ MOR</text>
        <text x="154" y="50" font-size="8" fill="#334155">4×/8× アナモルフィック投影</text>
        <text x="154" y="66" font-size="8" fill="#7c3aed">スズ系MORでLER ~3nm抑制</text>
        <text x="154" y="82" font-size="8" fill="#0369a1">2026年 100万ウェハー突破</text>
      `);

    case 'xv2_a7_gear_ratio_m1':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fff7ed" stroke="#fed7aa"/>
        ${[30, 50, 70, 90, 110, 130].map((x) => `<rect x="${x}" y="62" width="8" height="28" fill="#64748b"/>`).join('')}
        <rect x="24" y="28" width="122" height="12" fill="#d97736"/>
        <rect x="24" y="44" width="122" height="12" fill="#d97736"/>
        <rect x="31" y="56" width="6" height="8" fill="#f59e0b"/>
        <rect x="71" y="56" width="6" height="8" fill="#f59e0b"/>
        <rect x="111" y="56" width="6" height="8" fill="#f59e0b"/>
        <text x="160" y="34" font-size="8.5" font-weight="bold" fill="#9a3412">A7 ギア比 2:1 M1配線</text>
        <text x="160" y="50" font-size="8" fill="#334155">M0 2本にM1 1本を同期</text>
        <text x="160" y="66" font-size="8" fill="#c2410c">ピンアクセス渋滞を解消</text>
        <text x="160" y="82" font-size="8" fill="#0369a1">imec VLSI 2026 4Tセル</text>
      `);

    case 'xv2_nbti_pbti_trap_monitor':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fef2f2" stroke="#fecaca"/>
        <circle cx="54" cy="56" r="24" fill="none" stroke="#0284c7" stroke-width="4"/>
        <text x="38" y="59" font-size="8" font-weight="bold" fill="#0369a1">基準f₀</text>
        <circle cx="116" cy="56" r="24" fill="none" stroke="#dc2626" stroke-width="4"/>
        <text x="98" y="59" font-size="8" font-weight="bold" fill="#b91c1c">監視f_s</text>
        <text x="156" y="34" font-size="8.5" font-weight="bold" fill="#991b1b">NBTI/PBTIカナリア監視</text>
        <text x="156" y="50" font-size="8" fill="#334155">発振差 Δf から経年劣化計測</text>
        <text x="156" y="66" font-size="8" fill="#0369a1">ΔV_th &lt; 1mV 高精度検知</text>
        <text x="156" y="82" font-size="8" fill="#0f766e">電圧マージン削減で省電力!</text>
      `);

    case 'xv2_backside_ntsv_landing':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fffbeb" stroke="#fcd34d"/>
        <rect x="28" y="22" width="118" height="14" rx="2" fill="#94a3b8"/>
        <text x="48" y="32" font-size="7.5" font-weight="bold" fill="#0f172a">TiSi₂ シリサイド着地</text>
        <rect x="28" y="38" width="118" height="36" fill="#1e3a5f"/>
        <polygon points="74,36 100,36 108,82 66,82" fill="#d97736"/>
        <rect x="28" y="82" width="118" height="12" fill="#06b6d4"/>
        <text x="158" y="34" font-size="8.5" font-weight="bold" fill="#92400e">裏面ナノTSV着地パッド</text>
        <text x="158" y="50" font-size="8" fill="#334155">極薄 &lt;1μm 裏面Siを貫通</text>
        <text x="158" y="66" font-size="8" fill="#b45309">接触抵抗 &lt; 10⁻⁹ Ω·cm²</text>
        <text x="158" y="82" font-size="8" fill="#0369a1">A16 SPR / PowerVia 中核</text>
      `);

    case 'xv2_scfet_5t1_sram':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
        <rect x="24" y="24" width="36" height="62" rx="3" fill="#1d4ed8"/>
        <text x="31" y="58" font-size="8" fill="#fff">INV1</text>
        <rect x="74" y="24" width="36" height="62" rx="3" fill="#1d4ed8"/>
        <text x="81" y="58" font-size="8" fill="#fff">INV2</text>
        <rect x="122" y="34" width="28" height="42" rx="3" fill="#f59e0b"/>
        <text x="126" y="58" font-size="8" font-weight="bold" fill="#0f172a">TG</text>
        <line x1="60" y1="42" x2="74" y2="66" stroke="#38bdf8" stroke-width="2"/>
        <line x1="60" y1="66" x2="74" y2="42" stroke="#38bdf8" stroke-width="2"/>
        <text x="162" y="34" font-size="8.5" font-weight="bold" fill="#1e3a8a">imec VLSI 2026 5T+1</text>
        <text x="162" y="50" font-size="8" fill="#334155">パスゲートを1組縦積み統合</text>
        <text x="162" y="66" font-size="8.5" font-weight="bold" fill="#1d4ed8">面積 −12.5% 縮小!</text>
        <text x="162" y="82" font-size="8" fill="#0f766e">書込速度 +7〜15% 高速化</text>
      `);

    case 'xv2_3d_fefet_2tnf_cim':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f5f3ff" stroke="#c4b5fd"/>
        ${[42, 82, 122]
          .map(
            (x) =>
              `<rect x="${x}" y="22" width="18" height="68" rx="4" fill="#7c3aed"/><rect x="${x - 3}" y="34" width="24" height="8" fill="#fbbf24"/><rect x="${x - 3}" y="54" width="24" height="8" fill="#22d3ee"/><rect x="${x - 3}" y="72" width="24" height="8" fill="#fbbf24"/>`
          )
          .join('')}
        <text x="158" y="34" font-size="8.5" font-weight="bold" fill="#5b21b6">3D 2TnF HfZrO₂ CIM</text>
        <text x="158" y="50" font-size="8" fill="#334155">強誘電体柱で直接MAC演算</text>
        <text x="158" y="66" font-size="8" fill="#7c3aed">電源OFF不揮発AI重み保持</text>
        <text x="158" y="82" font-size="8" fill="#0369a1">IEDM 2025 520-kb実機検証</text>
      `);

    case 'xv2_igzo_2t0c_edram':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#ecfdf5" stroke="#6ee7b7"/>
        <rect x="26" y="24" width="118" height="24" rx="3" fill="#10b981"/>
        <text x="38" y="39" font-size="8" font-weight="bold" fill="#fff">書込: PE-ALD IGZO</text>
        <rect x="52" y="50" width="66" height="10" fill="#f59e0b"/>
        <rect x="26" y="62" width="118" height="26" rx="3" fill="#0369a1"/>
        <text x="38" y="78" font-size="8" fill="#fff">読出: ゲート容量記憶(0C)</text>
        <text x="156" y="32" font-size="8.5" font-weight="bold" fill="#047857">IGZO 2T0C eDRAM</text>
        <text x="156" y="48" font-size="8" fill="#334155">巨大コンデンサ完全撤去!</text>
        <text x="156" y="64" font-size="8" fill="#059669">6-bit / 保持&gt;4000秒 / 10ns</text>
        <text x="156" y="80" font-size="8" fill="#0369a1">AI重みロード 77倍高速化</text>
      `);

    case 'xv2_sot_mram_mtj_weights':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fdf2f8" stroke="#fbcfe8"/>
        <rect x="56" y="22" width="56" height="18" fill="#dc2626"/>
        <text x="68" y="34" font-size="7.5" fill="#fff">固定磁性</text>
        <rect x="56" y="40" width="56" height="8" fill="#e2e8f0"/>
        <rect x="56" y="48" width="56" height="18" fill="#0284c7"/>
        <text x="68" y="60" font-size="7.5" fill="#fff">自由磁性</text>
        <rect x="24" y="68" width="120" height="18" rx="2" fill="#334155"/>
        <text x="36" y="80" font-size="7.5" fill="#fde047">β-W スピン軌道レール</text>
        <text x="156" y="34" font-size="8.5" font-weight="bold" fill="#9d174d">垂直 SOT-MRAM MTJ</text>
        <text x="156" y="50" font-size="8" fill="#334155">スピン流で磁化を反転</text>
        <text x="156" y="66" font-size="8.5" font-weight="bold" fill="#db2777">書換 &lt;1ns・耐久&gt;10¹⁵回</text>
        <text x="156" y="82" font-size="8" fill="#0369a1">IEDM 2025 4kbアレイ実証</text>
      `);

    case 'xv2_gan_si_monolithic_ivr':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fefce8" stroke="#fde047"/>
        <polygon points="56,26 84,26 96,52 84,78 56,78 44,52" fill="#0d9488"/>
        <text x="58" y="55" font-size="8.5" font-weight="bold" fill="#fff">GaN</text>
        <rect x="108" y="30" width="44" height="44" rx="4" fill="#1d4ed8"/>
        <text x="115" y="55" font-size="8" fill="#fff">Si pMOS</text>
        <text x="28" y="96" font-size="7.5" fill="#854d0e">300mm モノリシック一体集積</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#854d0e">Intel/UCSD VLSI 2026</text>
        <text x="164" y="50" font-size="8" fill="#334155">GaNパワー＋Si制御を直結</text>
        <text x="164" y="66" font-size="8" fill="#0f766e">100–300MHz 超小型コイル</text>
        <text x="164" y="82" font-size="8" fill="#b45309">&lt;5ns 超高速オンダイ変圧</text>
      `);

    case 'xv2_ucie_s_56g_d2d_phy':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
        <rect x="18" y="28" width="46" height="54" rx="4" fill="#1e3a5f"/>
        <text x="27" y="58" font-size="8" fill="#fff">ISPダイ</text>
        <rect x="106" y="28" width="46" height="54" rx="4" fill="#4f46e5"/>
        <text x="113" y="58" font-size="8" fill="#fff">NPUダイ</text>
        ${[36, 48, 60, 72].map((y) => `<line x1="64" y1="${y}" x2="106" y2="${y}" stroke="#f59e0b" stroke-width="2.2"/>`).join('')}
        <text x="162" y="34" font-size="8.5" font-weight="bold" fill="#1e3a8a">ISSCC 2026 UCIe-S</text>
        <text x="162" y="50" font-size="8.5" font-weight="bold" fill="#0284c7">56 Gb/s/lane (Paper 8.1)</text>
        <text x="162" y="66" font-size="8" fill="#334155">&gt;4 Tbps/mm エッジ帯域</text>
        <text x="162" y="82" font-size="8" fill="#0f766e">&lt;0.35 pJ/bit 超低遅延</text>
      `);

    case 'xv2_hbm4_2048b_base_die':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
        <rect x="26" y="20" width="122" height="14" rx="2" fill="#3b82f6"/>
        <rect x="26" y="36" width="122" height="14" rx="2" fill="#2563eb"/>
        <rect x="26" y="52" width="122" height="14" rx="2" fill="#1d4ed8"/>
        <rect x="22" y="70" width="130" height="22" rx="3" fill="#0f172a"/>
        <text x="34" y="84" font-size="8" fill="#38bdf8">先端ロジック・ベースダイ</text>
        <text x="162" y="34" font-size="8.5" font-weight="bold" fill="#1e3a8a">ISSCC 2026 HBM4</text>
        <text x="162" y="50" font-size="8.5" font-weight="bold" fill="#2563eb">2,048-bit (車線2倍!)</text>
        <text x="162" y="66" font-size="8" fill="#334155">&gt; 2.0 TB/s / スタック</text>
        <text x="162" y="82" font-size="8" fill="#0f766e">8K/120p RAW帯域を解放</text>
      `);

    case 'xv2_gesi_110ghz_eam_cpo':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fff1f2" stroke="#fecdd3"/>
        <line x1="16" y1="54" x2="152" y2="54" stroke="#ec4899" stroke-width="4"/>
        <rect x="52" y="36" width="44" height="36" rx="4" fill="#be123c"/>
        <text x="61" y="57" font-size="8" font-weight="bold" fill="#fff">GeSi</text>
        <rect x="114" y="40" width="28" height="28" rx="14" fill="#1e293b"/>
        <text x="121" y="57" font-size="8" fill="#fda4af">PD</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#9f1239">imec IEDM 2025 41-3</text>
        <text x="164" y="50" font-size="8.5" font-weight="bold" fill="#e11d48">&gt;110 GHz CバンドEAM</text>
        <text x="164" y="66" font-size="8" fill="#334155">1本 400 Gb/s 光変調!</text>
        <text x="164" y="82" font-size="8" fill="#0369a1">超小型・低発熱CPO光通信</text>
      `);

    case 'xv2_microfluidic_si_cooler':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#ecfeff" stroke="#67e8f9"/>
        <rect x="22" y="22" width="132" height="20" rx="2" fill="#dc2626"/>
        <text x="40" y="35" font-size="8" fill="#fff">3D積層発熱ダイ (140.7°C)</text>
        <rect x="22" y="44" width="132" height="44" rx="3" fill="#0284c7"/>
        ${[36, 58, 80, 102, 124].map((x) => `<rect x="${x}" y="50" width="12" height="32" fill="#1e293b"/>`).join('')}
        <text x="34" y="102" font-size="7.5" font-weight="bold" fill="#0369a1">冷媒IN → 直彫りピンフィン → OUT</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#0e7490">imec IEDM 2025 17-3</text>
        <text x="164" y="50" font-size="8" fill="#334155">Si裏面へ直接水路を掘削</text>
        <text x="164" y="66" font-size="8.5" font-weight="bold" fill="#0284c7">140.7°C → 70.8°C!</text>
        <text x="164" y="82" font-size="8" fill="#0f766e">熱抵抗約80%カット(XTCO)</text>
      `);

    case 'xv2_si_baw_clock_resonator':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fefce8" stroke="#fde047"/>
        <circle cx="82" cy="56" r="34" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="82" cy="56" r="24" fill="none" stroke="#06b6d4" stroke-width="2"/>
        <polygon points="82,38 98,47 98,65 82,74 66,65 66,47" fill="#eab308"/>
        <text x="72" y="59" font-size="8" font-weight="bold" fill="#0f172a">BAW</text>
        <text x="136" y="34" font-size="8.5" font-weight="bold" fill="#854d0e">IEDM 2025 Paper 13-1</text>
        <text x="136" y="50" font-size="8" fill="#334155">宙吊り六角シリコン音叉</text>
        <text x="136" y="66" font-size="8.5" font-weight="bold" fill="#b45309">8時間ズレ わずか102 ns!</text>
        <text x="136" y="82" font-size="8" fill="#0369a1">外付け水晶ゼロで映画同期</text>
      `);

    case 'xv2_sidechannel_ecc_guard':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#f0fdfa" stroke="#99f6e4"/>
        <path d="M22 44 L144 44" stroke="#0d9488" stroke-width="2.6"/>
        <path d="M22 68 L48 68 L48 56 L78 56 L78 68 L108 68 L108 56 L144 56" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="26" y="38" font-size="8" font-weight="bold" fill="#0f766e">デュアルレール一定電流 I(t)</text>
        <text x="26" y="84" font-size="7.5" fill="#64748b">破線: 従来(鍵がバレる波形)</text>
        <text x="160" y="34" font-size="8.5" font-weight="bold" fill="#0f766e">電力マスキング＋ECC</text>
        <text x="160" y="50" font-size="8" fill="#334155">C2PA秘密鍵のDPA解析阻止</text>
        <text x="160" y="66" font-size="8" fill="#b45309">改ざん検知銅メッシュ装備</text>
        <text x="160" y="82" font-size="8" fill="#0369a1">AI重み1bit化け即時修復</text>
      `);

    case 'xv2_coupe_35d_interposer':
      return wrap(`
        <rect x="8" y="8" width="304" height="102" rx="6" fill="#fdf2f8" stroke="#f9a8d4"/>
        <rect x="26" y="24" width="102" height="22" rx="3" fill="#1d4ed8"/>
        <text x="40" y="38" font-size="8" fill="#fff">電子ダイ EIC (N6)</text>
        <rect x="26" y="48" width="102" height="8" fill="#d97736"/>
        <rect x="26" y="58" width="102" height="22" rx="3" fill="#db2777"/>
        <text x="38" y="72" font-size="8" fill="#fff">光ダイ PIC (SiPho)</text>
        <line x1="128" y1="69" x2="156" y2="69" stroke="#ec4899" stroke-width="3"/>
        <text x="34" y="96" font-size="7.5" fill="#9d174d">SoIC 4.5μm直結 ＋ V溝光結合</text>
        <text x="164" y="34" font-size="8.5" font-weight="bold" fill="#9d174d">TSMC 3.5D COUPE</text>
        <text x="164" y="50" font-size="8" fill="#334155">EIC-on-PIC 最短垂直統合</text>
        <text x="164" y="66" font-size="8.5" font-weight="bold" fill="#db2777">&gt;200 Gb/s/lane 光直結</text>
        <text x="164" y="82" font-size="8" fill="#0369a1">VLSI 2026 3DFabric王冠</text>
      `);

    default:
      return null;
  }
}
