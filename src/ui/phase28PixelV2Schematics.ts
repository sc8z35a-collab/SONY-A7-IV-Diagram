import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 28A Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (30 diagrams):
 *   - Pixel V2 Ultra-Microscopic Atomic & 2026 Quantum Dissection (P2-01 – P2-30)
 * Every visual element and text line is calibrated strictly inside x ∈ [6, 314].
 */
export function renderPhase28PixelV2SchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'pv2_brochosome_ar':
      return wrapSvg(`
        <circle cx="42" cy="54" r="18" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <circle cx="42" cy="54" r="8" fill="#0ea5e9" opacity="0.45"/>
        <circle cx="88" cy="54" r="18" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <circle cx="88" cy="54" r="8" fill="#0ea5e9" opacity="0.45"/>
        <path d="M24 14 L42 46 L52 72 M108 18 L88 46 L78 72" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
        <rect x="16" y="72" width="102" height="12" rx="2" fill="#0f766e"/>
        <text x="67" y="81" text-anchor="middle" font-size="6.4" fill="#fff">反射率 0.1%未満で光吸収!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">P2-01 ブロコソーム無反射膜</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・ヨコバイ虫の穴あきナノ球を再現</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・穴の中で光を捕獲し反射率&lt;0.1%</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・F1.2の急角度斜め光も全方位透過</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">穴あきサッカーボール状のナノ球が光のワナになり、どの角度の光も跳ね返さない</text>
      `);

    case 'pv2_meta_phase_pillars':
      return wrapSvg(`
        <rect x="20" y="26" width="8" height="36" rx="1" fill="#38bdf8" stroke="#0284c7"/>
        <rect x="34" y="22" width="14" height="40" rx="1" fill="#0ea5e9" stroke="#0369a1"/>
        <rect x="54" y="18" width="22" height="44" rx="1" fill="#0284c7" stroke="#0c4a6e"/>
        <rect x="82" y="22" width="14" height="40" rx="1" fill="#0ea5e9" stroke="#0369a1"/>
        <rect x="102" y="26" width="8" height="36" rx="1" fill="#38bdf8" stroke="#0284c7"/>
        <path d="M24 62 L65 86 M65 62 L65 86 M106 62 L65 86" stroke="#f59e0b" stroke-width="1.8"/>
        <circle cx="65" cy="86" r="4" fill="#dc2626"/>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">P2-02 位相勾配TiO₂ナノピラー</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・太さの違う透明柱で波の速度を制御</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・厚さ500nmの平面で鋭いレンズ効果</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・色収差補正＋AF分離を1層で実現</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">丸いガラス玉を使わず、太さを変えた極小の柱だけで光の波面を1点へ曲げる</text>
      `);

    case 'pv2_qd_swir_absorber':
      return wrapSvg(`
        <circle cx="32" cy="48" r="7" fill="#3b82f6" stroke="#1d4ed8"/>
        <text x="32" y="66" text-anchor="middle" font-size="6.2" fill="#1d4ed8">3nm青</text>
        <circle cx="64" cy="48" r="10" fill="#22c55e" stroke="#15803d"/>
        <text x="64" y="68" text-anchor="middle" font-size="6.2" fill="#15803d">5nm緑</text>
        <circle cx="100" cy="48" r="14" fill="#e11d48" stroke="#9f1239"/>
        <text x="100" y="72" text-anchor="middle" font-size="6.2" fill="#9f1239">8nm SWIR</text>
        <rect x="18" y="76" width="98" height="12" rx="2" fill="#1e293b"/>
        <text x="67" y="85" text-anchor="middle" font-size="6.3" fill="#fff">Si CMOS 読み出し回路</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#9f1239">P2-03 コロイド量子ドット(CQD)</text>
        <text x="140" y="43" font-size="6.9" fill="#881337">・粒の大きさだけで感応波長を自在変更</text>
        <text x="140" y="56" font-size="6.9" fill="#881337">・Si限界(1.1μm)超のSWIR霧透過撮影</text>
        <text x="140" y="69" font-size="6.9" fill="#881337">・無鉛InAs量子ドットで2026年進化</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9f1239">ナノ宝石の粒サイズを変えるだけで、目に見えない短波赤外線まで捉える拡張受光膜</text>
      `);

    case 'pv2_cfa_quantum_dye':
      return wrapSvg(`
        <rect x="18" y="20" width="46" height="30" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <rect x="68" y="20" width="46" height="30" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <rect x="18" y="54" width="46" height="30" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <rect x="68" y="54" width="46" height="30" rx="3" fill="#dbeafe" stroke="#2563eb"/>
        ${[28, 41, 54].flatMap((x) => [30, 40].map((y) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#dc2626"/>`)).join('')}
        ${[78, 91, 104].flatMap((x) => [30, 40].map((y) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#16a34a"/>`)).join('')}
        ${[78, 91, 104].flatMap((x) => [64, 74].map((y) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#2563eb"/>`)).join('')}
        <text x="41" y="72" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#15803d">粒径&lt;20nm</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#166534">P2-04 ナノ分散DPP顔料CFA</text>
        <text x="140" y="43" font-size="6.9" fill="#14532d">・20nm以下の均一微粒子で濁りゼロ</text>
        <text x="140" y="56" font-size="6.9" fill="#14532d">・膜厚350nm薄型化で斜め混色防止</text>
        <text x="140" y="69" font-size="6.9" fill="#14532d">・220℃耐熱＆長年の色あせゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#166534">顔料の粒を20nm未満に細かく揃えることで、極小画素でも澄んだ色ムラゼロを実現</text>
      `);

    case 'pv2_plasmonic_aperture':
      return wrapSvg(`
        <rect x="16" y="42" width="38" height="14" rx="2" fill="#eab308" stroke="#854d0e"/>
        <rect x="78" y="42" width="38" height="14" rx="2" fill="#eab308" stroke="#854d0e"/>
        <path d="M22 36 Q32 28 42 36 Q52 44 66 56 M110 36 Q100 28 90 36 Q80 44 66 56" fill="none" stroke="#ea580c" stroke-width="2"/>
        <polygon points="66,78 58,64 74,64" fill="#dc2626"/>
        <rect x="44" y="78" width="44" height="10" rx="2" fill="#1e3a8a"/>
        <text x="66" y="86" text-anchor="middle" font-size="6" fill="#fff">極小開口PD</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#854d0e">P2-05 プラズモニックナノ開口</text>
        <text x="140" y="43" font-size="6.9" fill="#713f12">・同心円溝が光を電子のさざ波(SPP)へ</text>
        <text x="140" y="56" font-size="6.9" fill="#713f12">・波長未満の極小穴へ異常透過集光</text>
        <text x="140" y="69" font-size="6.9" fill="#713f12">・GS遮光メモリへの光漏れを徹底遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#854d0e">金属のブルズアイ溝が光を集めて狭い針穴へギュッと押し込むナノ増強開口</text>
      `);

    case 'pv2_fresnel_zone_step':
      return wrapSvg(`
        <path d="M16 48 H30 V40 H44 V32 H58 V24 H74 V32 H88 V40 H102 V48 H116 V56 H16 Z" fill="#a5f3fc" stroke="#0891b2" stroke-width="1.5"/>
        <path d="M24 14 L38 44 L66 82 M108 14 L94 44 L66 82 M66 14 L66 82" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
        <circle cx="66" cy="82" r="4" fill="#0284c7"/>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0e7490">P2-06 ナノ・フレネル回折階段</text>
        <text x="140" y="43" font-size="6.9" fill="#155e75">・灯台と同じ階段リングを数百nmで彫刻</text>
        <text x="140" y="56" font-size="6.9" fill="#155e75">・8段マルチレベルで回折効率約95%</text>
        <text x="140" y="69" font-size="6.9" fill="#155e75">・無機SiN露光で周辺斜め光を精密補正</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0e7490">分厚い丸レンズの代わりに極薄の透明階段だけで光を鋭く1点へ折り曲げる</text>
      `);

    case 'pv2_si_diamond_lattice':
      return wrapSvg(`
        <line x1="66" y1="52" x2="40" y2="30" stroke="#64748b" stroke-width="2"/>
        <line x1="66" y1="52" x2="92" y2="30" stroke="#64748b" stroke-width="2"/>
        <line x1="66" y1="52" x2="40" y2="74" stroke="#64748b" stroke-width="2"/>
        <line x1="66" y1="52" x2="92" y2="74" stroke="#64748b" stroke-width="2"/>
        <circle cx="40" cy="30" r="7" fill="#0284c7"/><circle cx="92" cy="30" r="7" fill="#0284c7"/>
        <circle cx="40" cy="74" r="7" fill="#0284c7"/><circle cx="92" cy="74" r="7" fill="#0284c7"/>
        <circle cx="66" cy="52" r="8" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
        <path d="M18 16 L58 46" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="102" cy="52" r="5" fill="#2563eb"/>
        <text x="102" y="55" text-anchor="middle" font-size="6.5" fill="#fff">e⁻</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">P2-07 Si(100)ダイヤモンド格子</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・原子間隔0.235nmの正四面体結晶</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・光子(≥1.12eV)が結合を弾き電子誕生</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・無欠陥単結晶で暗電流1e⁻/s級の静寂</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">光の粒1個がシリコン原子の手つなぎを弾き、写真の元となる電子1個が生まれる瞬間</text>
      `);

    case 'pv2_ald_dipole_interface':
      return wrapSvg(`
        <rect x="18" y="20" width="98" height="14" rx="2" fill="#7c3aed"/>
        <text x="67" y="30" text-anchor="middle" font-size="6.4" fill="#fff">ALD Al₂O₃ (−固定電荷)</text>
        <rect x="18" y="36" width="98" height="12" rx="2" fill="#a78bfa"/>
        <text x="67" y="45" text-anchor="middle" font-size="6.2" fill="#1e1b4b">HfO₂ ＋ 1nm SiO₂界面</text>
        <rect x="18" y="50" width="98" height="32" rx="2" fill="#0f766e"/>
        <text x="67" y="61" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fef08a">+ + + + + 正孔バリア</text>
        <text x="67" y="74" text-anchor="middle" font-size="6.2" fill="#fff">Si フォトダイオード</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#5b21b6">P2-08 ALD界面双極子保護膜</text>
        <text x="140" y="43" font-size="6.9" fill="#4c1d95">・原子1層(0.1nm)単位で3層精密成膜</text>
        <text x="140" y="56" font-size="6.9" fill="#4c1d95">・強い負電荷が表面欠陥ノイズを封鎖</text>
        <text x="140" y="69" font-size="6.9" fill="#4c1d95">・青色光の電子を奥へ弾き返し感度UP</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#5b21b6">シリコン切り口を原子1層ずつの電気の盾で覆い、夜空の白点ノイズを1/100以下へ</text>
      `);

    case 'pv2_dti_core_stress_liner':
      return wrapSvg(`
        <rect x="16" y="18" width="32" height="66" rx="2" fill="#0f766e"/>
        <rect x="86" y="18" width="32" height="66" rx="2" fill="#0f766e"/>
        <rect x="48" y="18" width="38" height="66" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="54" y="18" width="26" height="66" fill="#fde68a"/>
        <rect x="61" y="18" width="12" height="66" fill="#334155"/>
        <text x="67" y="54" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">−V</text>
        <text x="32" y="54" text-anchor="middle" font-size="6.4" fill="#fff">PD1</text>
        <text x="102" y="54" text-anchor="middle" font-size="6.4" fill="#fff">PD2</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">P2-09 応力緩和B-DTI複合壁</text>
        <text x="140" y="43" font-size="6.9" fill="#334155">・SiO₂(圧縮)＋SiN(引張)で歪みを相殺</text>
        <text x="140" y="56" font-size="6.9" fill="#334155">・中心Poly-Si芯へ負電圧で壁面ピニング</text>
        <text x="140" y="69" font-size="6.9" fill="#334155">・IEDM 2025 0.43μm画素1.3e⁻/s実証</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">ひずみ吸収クッションとマイナス電極芯で、隣画素との混色も結晶歪みノイズもゼロ</text>
      `);

    case 'pv2_quantum_confinement_well':
      return wrapSvg(`
        <path d="M18 22 L44 42 L76 62 L110 74" fill="none" stroke="#2563eb" stroke-width="2.6"/>
        <circle cx="32" cy="30" r="4.5" fill="#0284c7"/>
        <circle cx="62" cy="50" r="4.5" fill="#0284c7"/>
        <circle cx="96" cy="67" r="5" fill="#f59e0b"/>
        <text x="36" y="22" font-size="6.2" fill="#1e40af">N1(浅)</text>
        <text x="64" y="42" font-size="6.2" fill="#1e40af">N2(中)</text>
        <text x="90" y="58" font-size="6.2" font-weight="bold" fill="#b45309">TG出口</text>
        <text x="66" y="86" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#2563eb">0.3ナノ秒の高速ドリフト!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#1e40af">P2-10 3D電位すべり台(ドリフト)</text>
        <text x="140" y="43" font-size="6.9" fill="#1e3a8a">・不純物濃度の3D勾配で横電界を形成</text>
        <text x="140" y="56" font-size="6.9" fill="#1e3a8a">・電子が迷わず秒速27kmで出口へ集合</text>
        <text x="140" y="69" font-size="6.9" fill="#1e3a8a">・1/80,000s超高速シャッター残像ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#1e40af">シリコン内部の見えない電気のすべり台が、電子を1粒も迷わせず一瞬で出口へ運ぶ</text>
      `);

    case 'pv2_nir_photonic_crystal':
      return wrapSvg(`
        <rect x="18" y="34" width="98" height="40" rx="2" fill="#0f766e"/>
        ${[28, 46, 64, 82, 100].map((x) => `<rect x="${x}" y="30" width="8" height="12" fill="#e0f2fe" stroke="#0284c7"/>`).join('')}
        <path d="M50 12 L50 38 L94 64 L32 64 L78 44" fill="none" stroke="#ef4444" stroke-width="2"/>
        <rect x="18" y="74" width="98" height="7" fill="#eab308"/>
        <text x="67" y="90" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#b91c1c">横90°曲げ→光路長3〜5倍!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#115e59">P2-11 2Dフォトニック結晶格子</text>
        <text x="140" y="43" font-size="6.9" fill="#134e4a">・規則的なナノ穴で赤/赤外を90°回折</text>
        <text x="140" y="56" font-size="6.9" fill="#134e4a">・薄いSi内でピンボール状に光閉じ込め</text>
        <text x="140" y="69" font-size="6.9" fill="#134e4a">・VLSI 2026: 高MTF＆35%+ NIR QE</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#115e59">素通りしやすい赤い光や赤外線をナノ穴の迷路で横へ曲げて閉じ込め感度を倍増</text>
      `);

    case 'pv2_multi_tap_iToF_gates':
      return wrapSvg(`
        <circle cx="66" cy="52" r="14" fill="#1e3a8a" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="66" y="55" text-anchor="middle" font-size="6.5" fill="#fff">GD/PD</text>
        ${[0, 60, 120, 180, 240, 300]
          .map((deg, idx) => {
            const rad = (deg * Math.PI) / 180;
            const gx = 66 + Math.cos(rad) * 28;
            const gy = 52 + Math.sin(rad) * 24;
            return `<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="8" fill="${idx % 2 === 0 ? '#f59e0b' : '#0284c7'}"/><text x="${gx.toFixed(1)}" y="${(gy + 2.5).toFixed(1)}" text-anchor="middle" font-size="5.8" fill="#fff">G${idx + 1}</text>`;
          })
          .join('')}
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#92400e">P2-12 6タップ超短パルスiToF</text>
        <text x="140" y="43" font-size="6.9" fill="#78350f">・6つの扉(G1–G6)が800psで順次開閉</text>
        <text x="140" y="56" font-size="6.9" fill="#78350f">・GDドレインが不要な太陽光を即排出</text>
        <text x="140" y="69" font-size="6.9" fill="#78350f">・ミリ単位の高精度3D奥行き測距</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">10億分の1秒単位で戻る赤外光パルスを6つの部屋へ仕分け、正確な3D距離を測る</text>
      `);

    case 'pv2_tg_halo_pocket':
      return wrapSvg(`
        <rect x="44" y="22" width="44" height="16" rx="2" fill="#475569"/>
        <text x="66" y="33" text-anchor="middle" font-size="6.6" fill="#fff">転送ゲート TG</text>
        <rect x="18" y="44" width="38" height="32" rx="2" fill="#0284c7"/>
        <text x="37" y="63" text-anchor="middle" font-size="6.4" fill="#fff">PPD</text>
        <ellipse cx="60" cy="60" rx="12" ry="10" fill="#38bdf8" stroke="#0369a1"/>
        <rect x="74" y="46" width="12" height="28" rx="2" fill="#ef4444"/>
        <rect x="88" y="46" width="28" height="28" rx="2" fill="#eab308"/>
        <text x="102" y="63" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#422006">FD</text>
        <path d="M40 60 L92 60" stroke="#fff" stroke-width="1.8" stroke-dasharray="3 2"/>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#991b1b">P2-13 TG残像消去ポケット注入</text>
        <text x="140" y="43" font-size="6.9" fill="#7f1d1d">・ポケット＆ハロー注入で電位段差ゼロ</text>
        <text x="140" y="56" font-size="6.9" fill="#7f1d1d">・電子転送効率99.999%超(残像なし)</text>
        <text x="140" y="69" font-size="6.9" fill="#7f1d1d">・OFF時は強い堤防でブルーミング阻止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#991b1b">水門下の引っかかりを原子レベルの傾斜注入で消し、電子を一滴残らず移し切る</text>
      `);

    case 'pv2_tg_null_feedthrough':
      return wrapSvg(`
        <path d="M18 38 H32 V20 H56 V38 H74" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="44" y="16" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#dc2626">+TGパルス</text>
        <path d="M18 68 H32 V86 H56 V68 H74" fill="none" stroke="#2563eb" stroke-width="2"/>
        <text x="44" y="94" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#2563eb">−tg_null逆相</text>
        <circle cx="96" cy="53" r="16" fill="#ecfdf5" stroke="#10b981" stroke-width="1.6"/>
        <text x="96" y="51" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#047857">ショック</text>
        <text x="96" y="61" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#047857">相殺 0V!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#eff6ff" stroke="#0284c7"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">P2-14 tg_null 結合ショック相殺</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・TG開閉ショックを逆パルスで打消し</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・待ち時間750ns→100nsへ劇的短縮</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・読出しノイズ約1/3(サブ1電子級)</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">ノイズキャンセリングと同じ逆波の原理でゲート開閉ノイズを瞬時に消去</text>
      `);

    case 'pv2_fd_airgap_isolation':
      return wrapSvg(`
        <rect x="18" y="22" width="98" height="62" rx="4" fill="#e2e8f0" stroke="#64748b"/>
        <rect x="32" y="30" width="70" height="46" rx="4" fill="#ffffff" stroke="#0284c7" stroke-dasharray="3 2" stroke-width="1.5"/>
        <circle cx="67" cy="53" r="14" fill="#eab308" stroke="#a16207" stroke-width="1.6"/>
        <text x="67" y="56" text-anchor="middle" font-size="7" font-weight="bold" fill="#422006">FD</text>
        <text x="67" y="80" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0284c7">空気の堀 (k = 1.0)</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#854d0e">P2-15 FD周囲ナノ空気ポケット</text>
        <text x="140" y="43" font-size="6.9" fill="#713f12">・計量カップFDの周囲を空気で絶縁</text>
        <text x="140" y="56" font-size="6.9" fill="#713f12">・寄生容量を0.5fF以下へ極限削減</text>
        <text x="140" y="69" font-size="6.9" fill="#713f12">・電子1個で320μVの巨大電圧を発生</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#854d0e">計量カップを極細試験管のように小さく保ち、たった電子1粒の電圧を大きく増幅</text>
      `);

    case 'pv2_lofic_3d_pillar_cap':
      return wrapSvg(`
        <rect x="18" y="18" width="98" height="10" rx="2" fill="#64748b"/>
        <text x="67" y="25.5" text-anchor="middle" font-size="6" fill="#fff">溢れ電子コレクタ</text>
        ${[28, 48, 68, 88, 104]
          .map(
            (x) =>
              `<rect x="${x - 6}" y="28" width="12" height="54" rx="3" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/><rect x="${x - 3}" y="31" width="6" height="48" rx="1.5" fill="#d97736"/>`
          )
          .join('')}
        <text x="67" y="92" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#6d28d9">ZAZ高誘電 3D円筒タンク</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#5b21b6">P2-16 LYTIA L910 3D-LOFIC</text>
        <text x="140" y="43" font-size="6.9" fill="#4c1d95">・2026年6月Sony LYTIA L910採用技術</text>
        <text x="140" y="56" font-size="6.9" fill="#4c1d95">・地下の極細円筒群に溢れ電子を貯蔵</text>
        <text x="140" y="69" font-size="6.9" fill="#4c1d95">・単露光100dB達成で白飛びを根絶</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#5b21b6">強い太陽光で溢れた電子を地下の超高密度円筒タンクで全部受け止め1発HDRを実現</text>
      `);

    case 'pv2_sf_rtnoise_trap_shield':
      return wrapSvg(`
        <rect x="34" y="18" width="66" height="14" rx="2" fill="#475569"/>
        <text x="67" y="27.5" text-anchor="middle" font-size="6.3" fill="#fff">SFゲート電極</text>
        <rect x="20" y="34" width="94" height="10" rx="1.5" fill="#a5f3fc" stroke="#0891b2"/>
        <text x="67" y="41.5" text-anchor="middle" font-size="6" fill="#0e7490">超清浄SiON膜 (傷ゼロ化)</text>
        <rect x="20" y="46" width="94" height="36" rx="2" fill="#1e293b"/>
        <rect x="24" y="58" width="86" height="14" rx="3" fill="#0ea5e9"/>
        <text x="67" y="67.5" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">埋め込みチャネル(電子遠隔通過)</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0e7490">P2-17 SF単一電子RTN遮断膜</text>
        <text x="140" y="43" font-size="6.9" fill="#155e75">・SiON窒化膜で界面の電子ワナを修復</text>
        <text x="140" y="56" font-size="6.9" fill="#155e75">・電子を表面から奥へ逃がし捕獲防止</text>
        <text x="140" y="69" font-size="6.9" fill="#155e75">・星空写真のチカチカ点滅ノイズ消去</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0e7490">電子の通り道を傷のある天井から奥へ沈め、暗所のランダム点滅ノイズ(RTN)を封印</text>
      `);

    case 'pv2_noise_coupled_pixel_amp':
      return wrapSvg(`
        <rect x="18" y="34" width="38" height="40" rx="3" fill="#1e3a8a"/>
        <text x="37" y="57" text-anchor="middle" font-size="6.4" fill="#fff">AMP A</text>
        <rect x="78" y="34" width="38" height="40" rx="3" fill="#0f766e"/>
        <text x="97" y="57" text-anchor="middle" font-size="6.4" fill="#fff">AMP B</text>
        <path d="M56 44 H78 M56 64 H78" stroke="#eab308" stroke-width="2.2"/>
        <text x="67" y="26" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#047857">75.6 μVrms 極低ノイズ!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#065f46">P2-18 VLSI 2026 ノイズ結合AMP</text>
        <text x="140" y="43" font-size="6.9" fill="#064e3b">・双子アンプ間でノイズを逆相キャンセル</text>
        <text x="140" y="56" font-size="6.9" fill="#064e3b">・画素出口で先行増幅し配線ノイズ遮断</text>
        <text x="140" y="69" font-size="6.9" fill="#064e3b">・75.6μVrmsの驚異的静寂読出し実証</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#065f46">アンプ自身が発する雑音を双子回路で相殺し、月明かりの暗闇もクリアに増幅</text>
      `);

    case 'pv2_hbond_protruding_cu':
      return wrapSvg(`
        <rect x="18" y="20" width="98" height="22" fill="#334155"/>
        <rect x="18" y="56" width="98" height="22" fill="#334155"/>
        ${[36, 67, 98]
          .map(
            (x) =>
              `<rect x="${x - 9}" y="30" width="18" height="15" rx="2" fill="#d97736"/><rect x="${x - 9}" y="53" width="18" height="15" rx="2" fill="#d97736"/><path d="M${x} 45 V53" stroke="#f59e0b" stroke-width="3"/>`
          )
          .join('')}
        <text x="67" y="90" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#b45309">300–400nmピッチ 凸型熱膨張融合</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">P2-19 300nm凸型Cu-Cu接合</text>
        <text x="140" y="43" font-size="6.9" fill="#7c2d12">・2nm未満CMP平坦＋凸型銅パッド制御</text>
        <text x="140" y="56" font-size="6.9" fill="#7c2d12">・加熱膨張で接合面積+54%・応力-40%</text>
        <text x="140" y="69" font-size="6.9" fill="#7c2d12">・1mm²に1,000万本の超高密度縦配線</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">はんだゼロで極小の銅ボタンを熱膨張で押し付け、2枚のチップを隙間なく1つに融合</text>
      `);

    case 'pv2_sicn_oh_fusion_seam':
      return wrapSvg(`
        <rect x="18" y="20" width="98" height="20" rx="2" fill="#475569"/>
        <text x="67" y="33" text-anchor="middle" font-size="6.4" fill="#fff">上ウェハー SiCN</text>
        <rect x="18" y="64" width="98" height="20" rx="2" fill="#475569"/>
        <text x="67" y="77" text-anchor="middle" font-size="6.4" fill="#fff">下ウェハー SiCN</text>
        ${[30, 54, 78, 102]
          .map(
            (x) =>
              `<circle cx="${x}" cy="46" r="4.5" fill="#38bdf8"/><circle cx="${x}" cy="58" r="4.5" fill="#f59e0b"/><line x1="${x}" y1="46" x2="${x}" y2="58" stroke="#0284c7" stroke-width="1.8"/>`
          )
          .join('')}
        <text x="67" y="54" text-anchor="middle" font-size="6" font-weight="bold" fill="#0369a1">Si-O-Si</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">P2-20 SiCN分子マジックテープ</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・プラズマ処理で表面に-OHの手を生成</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・常温で接着剤なしパチッと分子吸着</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・加熱で最強のSi-O-Si共有結合へ変化</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">原子1個分の超鏡面に磨いたSiCNが、接着剤ゼロでガラス級の強度で一体化する</text>
      `);

    case 'pv2_cu_nanotwin_grain':
      return wrapSvg(`
        <rect x="34" y="18" width="66" height="66" rx="4" fill="#d97736" stroke="#92400e" stroke-width="1.6"/>
        ${[28, 38, 48, 58, 68, 76].map((y) => `<line x1="36" y1="${y}" x2="98" y2="${y}" stroke="#fef3c7" stroke-width="1.6"/>`).join('')}
        <text x="67" y="54" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">&lt;111&gt;ナノ双晶銅</text>
        <text x="67" y="94" text-anchor="middle" font-size="6.2" fill="#9a3412">200℃低温でシーム消失!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fff7ed" stroke="#d97706"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">P2-21 &lt;111&gt;ナノ双晶銅結晶</text>
        <text x="140" y="43" font-size="6.9" fill="#7c2d12">・銅原子の向きを(111)面へ規則整列</text>
        <text x="140" y="56" font-size="6.9" fill="#7c2d12">・表面拡散1,000倍速で低温ボイドゼロ</text>
        <text x="140" y="69" font-size="6.9" fill="#7c2d12">・高強度＆長寿命で断線・劣化を防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">銅の原子をきれいに揃えて積むことで、低温でも境目のない1本の最強配線になる</text>
      `);

    case 'pv2_ru_airgap_local_beol':
      return wrapSvg(`
        <rect x="18" y="34" width="22" height="34" rx="2" fill="#64748b" stroke="#334155"/>
        <rect x="56" y="34" width="22" height="34" rx="2" fill="#64748b" stroke="#334155"/>
        <rect x="94" y="34" width="22" height="34" rx="2" fill="#64748b" stroke="#334155"/>
        <text x="29" y="54" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">Ru</text>
        <text x="67" y="54" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">Ru</text>
        <text x="105" y="54" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">Ru</text>
        <text x="48" y="54" text-anchor="middle" font-size="5.8" fill="#0284c7">空気</text>
        <text x="86" y="54" text-anchor="middle" font-size="5.8" fill="#0284c7">空気</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">P2-22 ルテニウム＋空気溝配線</text>
        <text x="140" y="43" font-size="6.9" fill="#334155">・20nm以下で銅より低抵抗なRu採用</text>
        <text x="140" y="56" font-size="6.9" fill="#334155">・厚いバリア膜不要で導体幅を確保</text>
        <text x="140" y="69" font-size="6.9" fill="#334155">・線間空気溝で容量＆遅延を約40%削減</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">極細で詰まる銅のかわりに希少金属ルテニウムと空気の溝で信号を超高速伝送</text>
      `);

    case 'pv2_3wafer_f2f_f2b_tsv':
      return wrapSvg(`
        <rect x="18" y="16" width="98" height="18" rx="2" fill="#0f766e"/>
        <text x="67" y="27.5" text-anchor="middle" font-size="6.3" fill="#fff">3階: フォトダイオード</text>
        <rect x="18" y="40" width="98" height="18" rx="2" fill="#1d4ed8"/>
        <text x="67" y="51.5" text-anchor="middle" font-size="6.3" fill="#fff">2階: 画素アンプ層</text>
        <rect x="18" y="66" width="98" height="18" rx="2" fill="#1e293b"/>
        <text x="67" y="77.5" text-anchor="middle" font-size="6.3" fill="#fff">1階: AIロジック/メモリ</text>
        <rect x="28" y="34" width="8" height="50" fill="#d97736"/>
        <rect x="98" y="34" width="8" height="50" fill="#d97736"/>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fffbeb" stroke="#b45309"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#92400e">P2-23 3層積層F2F＋F2B TSV</text>
        <text x="140" y="43" font-size="6.9" fill="#78350f">・3枚のウェハーを縦貫通する銅の柱</text>
        <text x="140" y="56" font-size="6.9" fill="#78350f">・6μmピッチ極細HD-TSVで最短接続</text>
        <text x="140" y="69" font-size="6.9" fill="#78350f">・配線長1/300で超高速＆受光面積最大</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">3階建てチップの床を真っすぐ貫く銅エレベーターが電源とデータを一瞬で届ける</text>
      `);

    case 'pv2_on_sensor_ai_remosaic':
      return wrapSvg(`
        <rect x="16" y="24" width="38" height="44" rx="3" fill="#e0e7ff" stroke="#4f46e5"/>
        <text x="35" y="44" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#3730a3">QQBC</text>
        <text x="35" y="55" text-anchor="middle" font-size="5.8" fill="#3730a3">16同色塊</text>
        <path d="M56 46 H74" stroke="#4f46e5" stroke-width="2.2"/>
        <rect x="76" y="20" width="42" height="52" rx="4" fill="#4f46e5"/>
        <text x="97" y="42" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">内蔵AI</text>
        <text x="97" y="54" text-anchor="middle" font-size="6" fill="#e0e7ff">4倍ズーム</text>
        <text x="97" y="64" text-anchor="middle" font-size="6" fill="#fef08a">4K30fps!</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#3730a3">P2-24 LYTIA 901 内蔵AI回路</text>
        <text x="140" y="43" font-size="6.9" fill="#312e81">・ソニー2025/2026世界初センサー内AI</text>
        <text x="140" y="56" font-size="6.9" fill="#312e81">・細かい文字や柄をAI学習でリモザイク</text>
        <text x="140" y="69" font-size="6.9" fill="#312e81">・4倍ズーム4K動画＆200MP 10fps対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#3730a3">CPUへ送る前にセンサー自身のAIが微細な文字を復元し、4倍ズームも超高精細</text>
      `);

    case 'pv2_compute_in_pixel_mac':
      return wrapSvg(`
        <rect x="20" y="22" width="94" height="56" rx="4" fill="#0f766e" stroke="#115e59"/>
        ${[36, 56, 76, 96].map((x) => `<line x1="${x}" y1="26" x2="${x}" y2="74" stroke="#5eead4" stroke-width="1.4"/>`).join('')}
        ${[34, 50, 66].map((y) => `<line x1="24" y1="${y}" x2="110" y2="${y}" stroke="#fde047" stroke-width="1.4"/>`).join('')}
        <text x="67" y="88" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0f766e">Σ(w × 光信号) 網膜並列AI</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#115e59">P2-25 画素直下CIP-MAC演算</text>
        <text x="140" y="43" font-size="6.9" fill="#134e4a">・光から生まれた電気のままAI掛け算</text>
        <text x="140" y="56" font-size="6.9" fill="#134e4a">・ADC前のアナログ加算で電力1/10へ</text>
        <text x="140" y="69" font-size="6.9" fill="#134e4a">・Sony特許＆VLSI 2026電子網膜技術</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#115e59">人間の網膜と同じく画素の真下でAIの初期計算を済ませ、消費電力を劇的に削減</text>
      `);

    case 'pv2_fine12bit_dual_ramp':
      return wrapSvg(`
        <line x1="20" y1="78" x2="114" y2="78" stroke="#64748b"/>
        <path d="M22 76 L64 60 L110 20" fill="none" stroke="#2563eb" stroke-width="2.4"/>
        <text x="44" y="55" font-size="6.2" font-weight="bold" fill="#1d4ed8">暗部:超細密</text>
        <text x="86" y="34" font-size="6.2" font-weight="bold" fill="#0284c7">明部:高速</text>
        <text x="67" y="90" text-anchor="middle" font-size="6.2" fill="#334155">グレイコード(1bit反転)計数</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#1e40af">P2-26 Fine12/14bit 2段ADC</text>
        <text x="140" y="43" font-size="6.9" fill="#1e3a8a">・暗部は細かく明部は速い2段階定規</text>
        <text x="140" y="56" font-size="6.9" fill="#1e3a8a">・グレイコード計数で電源ノイズ半減</text>
        <text x="140" y="69" font-size="6.9" fill="#1e3a8a">・α7R VI 66.8MP 30fps＆LYTIA 901</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#1e40af">2段階の傾き定規と省エネ計数で、超高速連写と滑らかな夕焼け階調を両立する</text>
      `);

    case 'pv2_weighted_spad_tdc':
      return wrapSvg(`
        <circle cx="67" cy="50" r="24" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
        <line x1="67" y1="50" x2="82" y2="36" stroke="#dc2626" stroke-width="2.2"/>
        <circle cx="67" cy="50" r="3" fill="#991b1b"/>
        <text x="67" y="86" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#b91c1c">初光子到着時刻 TDC計測</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#991b1b">P2-27 重み付けSPAD光子TDC</text>
        <text x="140" y="43" font-size="6.9" fill="#7f1d1d">・Canon VLSI 2025/2026最新発表技術</text>
        <text x="140" y="56" font-size="6.9" fill="#7f1d1d">・最初の1粒の到着時刻から大光量を逆算</text>
        <text x="140" y="69" font-size="6.9" fill="#7f1d1d">・暗闇〜太陽148dB＆LEDフリッカー低減</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#991b1b">最初の光の粒が届くまでのピコ秒を測り、暗闇から直射日光まで飽和ゼロで捉える</text>
      `);

    case 'pv2_2x2_shared_hybrid_gs':
      return wrapSvg(`
        <rect x="24" y="18" width="38" height="28" rx="2" fill="#ffedd5" stroke="#ea580c"/>
        <rect x="68" y="18" width="38" height="28" rx="2" fill="#ffedd5" stroke="#ea580c"/>
        <rect x="24" y="52" width="38" height="28" rx="2" fill="#ffedd5" stroke="#ea580c"/>
        <rect x="68" y="52" width="38" height="28" rx="2" fill="#ffedd5" stroke="#ea580c"/>
        <circle cx="65" cy="49" r="14" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
        <text x="65" y="52" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">共有ADC</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">P2-28 2×2共有ハイブリッドGS</text>
        <text x="140" y="43" font-size="6.9" fill="#7c2d12">・4画素の真下ごとに1つのADCを配置</text>
        <text x="140" y="56" font-size="6.9" fill="#7c2d12">・全画面一斉スタートで歪み時間1/1000</text>
        <text x="140" y="69" font-size="6.9" fill="#7c2d12">・暗所高画質と省電力を同時にキープ</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">4画素で1つの超小型ADCを共有し、こんにゃく歪みゼロと高画質をいいとこ取り</text>
      `);

    case 'pv2_quad_pixel_puf':
      return wrapSvg(`
        <rect x="22" y="20" width="90" height="58" rx="5" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.6"/>
        <text x="67" y="42" text-anchor="middle" font-size="7" font-weight="bold" fill="#38bdf8">10110010...</text>
        <text x="67" y="56" text-anchor="middle" font-size="6.3" fill="#fef08a">4画素固有ハード指紋</text>
        <text x="67" y="69" text-anchor="middle" font-size="6" fill="#cbd5e1">ISVLSI 2026 CIS-PUF</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#0369a1">P2-29 クアッド画素CIS-PUF鍵</text>
        <text x="140" y="43" font-size="6.9" fill="#0c4a6e">・画素の原子レベル製造クセを暗号鍵化</text>
        <text x="140" y="56" font-size="6.9" fill="#0c4a6e">・メモリ非保存で物理盗難・複製が不可能</text>
        <text x="140" y="69" font-size="6.9" fill="#0c4a6e">・撮影瞬間のC2PA真正性証明を最強保護</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#0369a1">世界に1つだけの画素の「生まれつきの指紋」で、本物の写真であることを完全証明</text>
      `);

    case 'pv2_hf_hdr_fusion_engine':
      return wrapSvg(`
        <rect x="16" y="20" width="44" height="22" rx="3" fill="#0284c7"/>
        <text x="38" y="34" text-anchor="middle" font-size="6.3" fill="#fff">DCG-HDR</text>
        <rect x="16" y="54" width="44" height="22" rx="3" fill="#f59e0b"/>
        <text x="38" y="68" text-anchor="middle" font-size="6.3" fill="#fff">極短露光</text>
        <path d="M60 31 L78 48 M60 65 L78 48" stroke="#ec4899" stroke-width="2.2"/>
        <rect x="78" y="32" width="40" height="32" rx="4" fill="#be185d"/>
        <text x="98" y="47" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">100dB+</text>
        <text x="98" y="58" text-anchor="middle" font-size="5.8" fill="#fbcfe8">約17段HDR</text>
        <rect x="132" y="14" width="178" height="74" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="140" y="29" font-size="7.4" font-weight="bold" fill="#9d174d">P2-30 ソニー HF-HDR 融合回路</text>
        <text x="140" y="43" font-size="6.9" fill="#831843">・単露光DCG(暗/中)＋極短露光(太陽)</text>
        <text x="140" y="56" font-size="6.9" fill="#831843">・LYTIA 828/901で100dB超の広階調</text>
        <text x="140" y="69" font-size="6.9" fill="#831843">・動体ゴースト＆階調ノイズ段差を抑制</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9d174d">同時2ゲイン読み出しと超高速シャッターを合体し、肉眼並みの明暗差を美しく記録</text>
      `);

    default:
      return null;
  }
}
