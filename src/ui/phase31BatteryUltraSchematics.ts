import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 31A Ultra-Detailed Full-Width 320x118 Scientific Cutaway Schematic SVGs (P101–P130).
 * Every single diagram uses the full 320x118 canvas with multi-layer cross-sections, atomic lattices,
 * physics plots, callout arrows, and zero-overlap beginner-friendly Japanese annotations.
 */
export function renderPhase31BatteryUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // GROUP 1: P101–P110 — 2026 SOLID-STATE ELECTROLYTE & ATOMIC INTERPHASE
    // =========================================================================

    case 'bat_argyrodite_li6ps5cl_2026':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0b1324" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#7dd3fc">P101 硫化物アルジロダイト全固体電解質（Li6PS5Cl · 立方晶 F-43m）</text>
        <!-- Left cathode boundary -->
        <rect x="14" y="25" width="34" height="62" rx="3" fill="#4f46e5" stroke="#818cf8"/>
        <text x="31" y="54" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">正極</text>
        <text x="31" y="65" text-anchor="middle" font-size="5.4" fill="#c7d2fe">NMC</text>
        <!-- Right anode boundary -->
        <rect x="272" y="25" width="34" height="62" rx="3" fill="#b45309" stroke="#fbbf24"/>
        <text x="289" y="54" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">負極</text>
        <text x="289" y="65" text-anchor="middle" font-size="5.4" fill="#fde68a">Si/Li</text>
        <!-- Argyrodite 3-cage crystal tunnel lattice -->
        <polygon points="82,36 98,36 106,50 98,64 82,64 74,50" fill="#172554" stroke="#38bdf8" stroke-width="1.4"/>
        <polygon points="152,36 168,36 176,50 168,64 152,64 144,50" fill="#172554" stroke="#38bdf8" stroke-width="1.4"/>
        <polygon points="222,36 238,36 246,50 238,64 222,64 214,50" fill="#172554" stroke="#38bdf8" stroke-width="1.4"/>
        <!-- PS4 tetrahedron amber cores -->
        <circle cx="90" cy="50" r="6" fill="#f59e0b"/>
        <text x="90" y="52" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#451a03">PS4</text>
        <circle cx="160" cy="50" r="6" fill="#f59e0b"/>
        <text x="160" y="52" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#451a03">PS4</text>
        <circle cx="230" cy="50" r="6" fill="#f59e0b"/>
        <text x="230" y="52" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#451a03">PS4</text>
        <!-- Cl/S halogen bridge nodes -->
        <circle cx="125" cy="38" r="4" fill="#10b981"/>
        <circle cx="195" cy="38" r="4" fill="#10b981"/>
        <!-- Superionic Li+ hopping trajectory -->
        <path d="M52 58 Q70 30 90 36 T125 56 T160 36 T195 56 T230 36 T266 54" fill="none" stroke="#22d3ee" stroke-width="2" stroke-dasharray="4 2"/>
        <polygon points="268,54 261,50 262,58" fill="#22d3ee"/>
        <circle cx="72" cy="40" r="3.4" fill="#38bdf8"/>
        <circle cx="125" cy="56" r="3.4" fill="#38bdf8"/>
        <circle cx="195" cy="56" r="3.4" fill="#38bdf8"/>
        <!-- Bottom spec badges inside panel -->
        <rect x="58" y="73" width="64" height="14" rx="3" fill="#0f2942" stroke="#38bdf8"/>
        <text x="90" y="82.5" text-anchor="middle" font-size="5.6" fill="#bae6fd">1–5 mS/cm 超伝導</text>
        <rect x="130" y="73" width="60" height="14" rx="3" fill="#064e3b" stroke="#34d399"/>
        <text x="160" y="82.5" text-anchor="middle" font-size="5.6" fill="#a7f3d0">液体ゼロ・不燃</text>
        <rect x="198" y="73" width="64" height="14" rx="3" fill="#312e81" stroke="#a78bfa"/>
        <text x="230" y="82.5" text-anchor="middle" font-size="5.6" fill="#ddd6fe">Ea 0.24eV 高速</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">燃えない結晶カゴの立体トンネルをLi+が液体並みの速さでジャンプする2026年全固体主役！</text>
      `);

    case 'bat_ag_c_anodefree_interlayer':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0f172a">P102 アノードフリー全固体 Ag-C 親リチウム銀ナノ中間層（厚み 5 μm）</text>
        <!-- Left comparison: conventional graphite -->
        <rect x="14" y="24" width="112" height="66" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="70" y="34" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#991b1b">従来：厚い黒鉛負極 (70μm)</text>
        <rect x="22" y="39" width="96" height="32" rx="2" fill="#475569"/>
        <text x="70" y="57" text-anchor="middle" font-size="5.8" fill="#e2e8f0">黒鉛駐車場が体積の半分占有</text>
        <rect x="22" y="73" width="96" height="10" rx="1" fill="#d97706"/>
        <text x="70" y="80" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Cu 銅集電箔</text>
        <!-- Arrow -->
        <path d="M130 57 H148" stroke="#0284c7" stroke-width="2.2"/>
        <polygon points="150,57 143,53 143,61" fill="#0284c7"/>
        <text x="140" y="49" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0369a1">+50%</text>
        <text x="140" y="69" text-anchor="middle" font-size="5.2" fill="#0369a1">大容量</text>
        <!-- Right: 2026 Anode-Free Ag-C -->
        <rect x="154" y="24" width="152" height="66" rx="4" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="230" y="34" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0c4a6e">2026 アノードフリー Ag-C (黒鉛ゼロ!)</text>
        <rect x="162" y="38" width="136" height="11" rx="2" fill="#0ea5e9"/>
        <text x="230" y="46" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">固体電解質（Li+ 均一供給）</text>
        <rect x="162" y="51" width="136" height="11" rx="2" fill="#334155"/>
        <circle cx="174" cy="56.5" r="2.3" fill="#f8fafc"/>
        <circle cx="192" cy="56.5" r="2.3" fill="#f8fafc"/>
        <circle cx="210" cy="56.5" r="2.3" fill="#f8fafc"/>
        <circle cx="250" cy="56.5" r="2.3" fill="#f8fafc"/>
        <circle cx="268" cy="56.5" r="2.3" fill="#f8fafc"/>
        <circle cx="286" cy="56.5" r="2.3" fill="#f8fafc"/>
        <text x="230" y="58.5" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fde047">Ag銀ナノ粒</text>
        <rect x="162" y="64" width="136" height="10" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="230" y="71" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0f172a">鏡面Li金属均一めっき層 (針ゼロ)</text>
        <rect x="162" y="76" width="136" height="9" rx="1" fill="#d97706"/>
        <text x="230" y="82.5" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">Cu 銅集電箔</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">黒鉛を丸ごと廃止！銀ナノ粒の種がリチウムを針ではなく鏡面状に平らに育てて容量1.5倍</text>
      `);

    case 'bat_lhce_fluorinated_ether':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#115e59">P103 局所高濃度フッ素化エーテル難燃電解液（LHCE：LiFSI + TTE）</text>
        <!-- Left bath: solvation clusters in TTE -->
        <rect x="14" y="24" width="176" height="66" rx="5" fill="#ccfbf1" stroke="#0d9488"/>
        <text x="102" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0f766e">不燃・低粘度 フッ素化エーテル海（TTE希釈剤）</text>
        <!-- Cluster 1 -->
        <circle cx="56" cy="59" r="19" fill="#ecfeff" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="3 2"/>
        <circle cx="56" cy="59" r="6" fill="#0284c7"/>
        <text x="56" y="61" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">Li+</text>
        <circle cx="43" cy="49" r="4" fill="#10b981"/>
        <circle cx="69" cy="49" r="4" fill="#10b981"/>
        <circle cx="43" cy="69" r="4" fill="#f59e0b"/>
        <circle cx="69" cy="69" r="4" fill="#f59e0b"/>
        <!-- Cluster 2 -->
        <circle cx="144" cy="59" r="19" fill="#ecfeff" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="3 2"/>
        <circle cx="144" cy="59" r="6" fill="#0284c7"/>
        <text x="144" y="61" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">Li+</text>
        <circle cx="131" cy="49" r="4" fill="#10b981"/>
        <circle cx="157" cy="49" r="4" fill="#10b981"/>
        <circle cx="131" cy="69" r="4" fill="#f59e0b"/>
        <circle cx="157" cy="69" r="4" fill="#f59e0b"/>
        <!-- Legend inside bath -->
        <text x="100" y="55" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#047857">FSI⁻</text>
        <text x="100" y="66" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#b45309">DME</text>
        <text x="102" y="85" text-anchor="middle" font-size="5.2" fill="#0f766e">ミクロは超高濃度クラスター ／ マクロはサラサラ</text>
        <!-- Right benefit stack -->
        <rect x="198" y="24" width="108" height="20" rx="3" fill="#0f766e"/>
        <text x="252" y="36" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">消火フッ素ラジカルで難燃</text>
        <rect x="198" y="47" width="108" height="20" rx="3" fill="#0284c7"/>
        <text x="252" y="59" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">無機LiFリッチSEIを自動生成</text>
        <rect x="198" y="70" width="108" height="20" rx="3" fill="#059669"/>
        <text x="252" y="82" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">-30°C極寒でも低粘度高速</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">濃いイオン玉を不燃フッ素プールに分散！燃えにくく極寒でもサラサラ急速充電できる最新電解液</text>
      `);

    case 'bat_supramolecular_selfheal_binder':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#881337">P104 超分子・自己修復ダイナミック架橋シリコンバインダー（Si@BF · 2026）</text>
        <!-- Step 1: 300% expansion crack -->
        <rect x="14" y="24" width="90" height="66" rx="4" fill="#fff" stroke="#fda4af"/>
        <text x="59" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#be123c">1. 充電300%膨張</text>
        <circle cx="38" cy="56" r="14" fill="#fbbf24" stroke="#b45309"/>
        <text x="38" y="58" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#78350f">Si</text>
        <circle cx="80" cy="56" r="14" fill="#fbbf24" stroke="#b45309"/>
        <text x="80" y="58" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#78350f">Si</text>
        <path d="M52 50 L57 54 L61 50 L66 55" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 2"/>
        <text x="59" y="82" text-anchor="middle" font-size="5.2" fill="#dc2626">動的結合が一時ほどける</text>
        <!-- Arrow 1 -->
        <path d="M107 57 H117" stroke="#e11d48" stroke-width="2"/>
        <polygon points="119,57 113,53 113,61" fill="#e11d48"/>
        <!-- Step 2: Self-healing rebound -->
        <rect x="122" y="24" width="92" height="66" rx="4" fill="#fff" stroke="#fb7185"/>
        <text x="168" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#059669">2. 面ファスナー再結合!</text>
        <circle cx="148" cy="56" r="11" fill="#fbbf24" stroke="#b45309"/>
        <text x="148" y="58" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#78350f">Si</text>
        <circle cx="188" cy="56" r="11" fill="#fbbf24" stroke="#b45309"/>
        <text x="188" y="58" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#78350f">Si</text>
        <path d="M159 52 H177 M159 60 H177" stroke="#16a34a" stroke-width="2.4"/>
        <text x="168" y="82" text-anchor="middle" font-size="5.2" fill="#047857">水素・イオン架橋が自動修復</text>
        <!-- Step 3: Retention graph -->
        <rect x="220" y="24" width="86" height="66" rx="4" fill="#fff" stroke="#e11d48"/>
        <text x="263" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#881337">5C高速サイクル寿命</text>
        <line x1="230" y1="78" x2="298" y2="78" stroke="#94a3b8" stroke-width="1"/>
        <line x1="230" y1="39" x2="230" y2="78" stroke="#94a3b8" stroke-width="1"/>
        <path d="M230 49 Q264 51 296 56" fill="none" stroke="#16a34a" stroke-width="2.2"/>
        <path d="M230 49 Q242 74 268 77" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="2 2"/>
        <text x="266" y="44" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#15803d">90.9%(400回)</text>
        <text x="276" y="74" text-anchor="middle" font-size="4.8" fill="#64748b">従来:崩壊</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">膨張で亀裂が入っても面ファスナーのように数秒でくっつき直し、5C急速充放電でも超長寿命！</text>
      `);

    case 'bat_gb_dendrite_grain_passiv':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fffbeb" stroke="#d97706" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#78350f">P105 MIT 2026年7月発見・固体電解質「2結晶粒界」デンドライト起点封止</text>
        <!-- Left: Unprotected grain boundary -->
        <rect x="14" y="24" width="136" height="66" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="82" y="34" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#991b1b">従来：粒界すき間からLi針が成長!</text>
        <rect x="22" y="40" width="54" height="32" rx="3" fill="#cbd5e1" stroke="#64748b"/>
        <text x="49" y="58" text-anchor="middle" font-size="5.8" fill="#1e293b">結晶粒 A</text>
        <rect x="88" y="40" width="54" height="32" rx="3" fill="#cbd5e1" stroke="#64748b"/>
        <text x="115" y="58" text-anchor="middle" font-size="5.8" fill="#1e293b">結晶粒 B</text>
        <!-- Dendrite shooting up through the gap -->
        <polygon points="82,41 76,78 88,78" fill="#dc2626"/>
        <text x="82" y="86" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#dc2626">電子リーク → 粒界割れ＆短絡</text>
        <!-- Arrow -->
        <path d="M153 57 H165" stroke="#d97706" stroke-width="2.2"/>
        <polygon points="167,57 161,53 161,61" fill="#d97706"/>
        <!-- Right: Passivated grain boundary -->
        <rect x="170" y="24" width="136" height="66" rx="4" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="238" y="34" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#166534">2026対策：金色ナノ目地パッシベーション</text>
        <rect x="178" y="40" width="54" height="32" rx="3" fill="#e2e8f0" stroke="#64748b"/>
        <text x="205" y="58" text-anchor="middle" font-size="5.8" fill="#1e293b">結晶粒 A</text>
        <rect x="244" y="40" width="54" height="32" rx="3" fill="#e2e8f0" stroke="#64748b"/>
        <text x="271" y="58" text-anchor="middle" font-size="5.8" fill="#1e293b">結晶粒 B</text>
        <rect x="233" y="40" width="10" height="32" fill="#f59e0b"/>
        <line x1="224" y1="73" x2="252" y2="73" stroke="#16a34a" stroke-width="2.6"/>
        <text x="238" y="86" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#15803d">電子遮断(10⁻¹⁰S/cm) → 針を完全阻止</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">MITが証明した「レンガのつなぎ目」の電子漏れを金色目地材でふさぎ、急速充電限界を3倍化！</text>
      `);

    case 'bat_na_li_hybrid_cold_cell':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0c4a6e">P106 2026極寒仕様 ナトリウム・リチウム（Na-Li）二刀流耐寒セル</text>
        <!-- Left hybrid stack -->
        <rect x="16" y="25" width="136" height="28" rx="4" fill="#0ea5e9" stroke="#0369a1"/>
        <text x="84" y="37" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">Na+ 極寒パワー層 (-40°C即起動)</text>
        <text x="84" y="48" text-anchor="middle" font-size="5.2" fill="#e0f2fe">脱溶媒和障壁が小さく氷点下でも高速</text>
        <rect x="16" y="61" width="136" height="28" rx="4" fill="#10b981" stroke="#047857"/>
        <text x="84" y="73" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">Li+ 高密度スタミナ層 (大容量)</text>
        <text x="84" y="84" text-anchor="middle" font-size="5.2" fill="#d1fae5">予熱完了後に長時間撮影をフル担当</text>
        <!-- Thermal relay arrow -->
        <path d="M84 53 V60" stroke="#f59e0b" stroke-width="2.4"/>
        <!-- Right discharge curve vs temperature -->
        <rect x="162" y="25" width="144" height="64" rx="4" fill="#fff" stroke="#7dd3fc"/>
        <text x="234" y="35" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0369a1">低温放電維持率 (-40°C → +25°C)</text>
        <line x1="176" y1="78" x2="296" y2="78" stroke="#94a3b8" stroke-width="1"/>
        <line x1="176" y1="40" x2="176" y2="78" stroke="#94a3b8" stroke-width="1"/>
        <path d="M178 48 Q228 43 294 42" fill="none" stroke="#0284c7" stroke-width="2.4"/>
        <path d="M178 76 Q220 68 250 48 T294 42" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="218" y="43" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0284c7">Na-Li: -40°C 85%</text>
        <text x="220" y="74" text-anchor="middle" font-size="5.0" fill="#64748b">従来Li単体: 急落</text>
        <text x="184" y="86" font-size="4.8" fill="#475569">-40°C</text>
        <text x="282" y="86" font-size="4.8" fill="#475569">+25°C</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">雪山に無敵のナトリウムがカメラを即起動し、温まったら大容量リチウムが支える最強タッグ！</text>
      `);

    case 'bat_swcnt_mwcnt_3d_web':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0f172a">P107 単層・多層カーボンナノチューブ（SWCNT/MWCNT）3D導電クモの巣</text>
        <!-- Left: old carbon black point contact -->
        <rect x="14" y="24" width="118" height="66" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="73" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#991b1b">従来：炭粉の点接触 (3–5wt%)</text>
        <circle cx="42" cy="57" r="10" fill="#d97706"/>
        <circle cx="102" cy="57" r="10" fill="#d97706"/>
        <circle cx="62" cy="54" r="2.6" fill="#334155"/>
        <circle cx="82" cy="61" r="2.6" fill="#334155"/>
        <text x="73" y="79" text-anchor="middle" font-size="5.2" fill="#dc2626">Si膨張で粒が離れると即断線!</text>
        <!-- Right: 2026 SWCNT spiderweb -->
        <rect x="140" y="24" width="166" height="66" rx="4" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="223" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#166534">2026 SWCNT長繊維3D網 (わずか 0.1wt%!)</text>
        <line x1="154" y1="45" x2="292" y2="70" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="154" y1="70" x2="292" y2="45" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="154" y1="57" x2="292" y2="57" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="184" y1="40" x2="258" y2="75" stroke="#475569" stroke-width="1.2"/>
        <circle cx="176" cy="57" r="8" fill="#d97706"/>
        <circle cx="223" cy="57" r="9" fill="#d97706"/>
        <circle cx="270" cy="57" r="8" fill="#d97706"/>
        <text x="223" y="83" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#15803d">鋼鉄数十倍の強度 × 電子抵抗最大60%低減</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">髪の毛10万分の1の極細カーボン繊維網が全粒子を立体結線し、3倍膨張でも電気を絶やさない！</text>
      `);

    case 'bat_solvation_sheath_tunnel':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#164e63">P108 Li+ 溶媒和シェル脱離ゲート ＆ 電子量子トンネリング遮断壁（1–3 nm）</text>
        <!-- Electrolyte zone -->
        <rect x="14" y="24" width="110" height="66" rx="4" fill="#e0f2fe" stroke="#38bdf8"/>
        <text x="69" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0369a1">電解液側（溶媒コート着用）</text>
        <circle cx="69" cy="58" r="18" fill="#bae6fd" stroke="#0284c7" stroke-dasharray="3 2"/>
        <circle cx="69" cy="58" r="6" fill="#0284c7"/>
        <text x="69" y="60" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">Li+</text>
        <circle cx="54" cy="48" r="3.6" fill="#38bdf8"/>
        <circle cx="84" cy="48" r="3.6" fill="#38bdf8"/>
        <circle cx="54" cy="68" r="3.6" fill="#38bdf8"/>
        <circle cx="84" cy="68" r="3.6" fill="#38bdf8"/>
        <text x="69" y="85" text-anchor="middle" font-size="5.0" fill="#0369a1">ここでコートをサッと脱ぐ!</text>
        <!-- 2.5 nm SEI Tunneling Barrier -->
        <rect x="132" y="24" width="46" height="66" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
        <text x="155" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#92400e">SEI絶縁壁</text>
        <text x="155" y="43" text-anchor="middle" font-size="5.2" fill="#b45309">≥ 2.5 nm</text>
        <!-- Li+ pass arrow -->
        <path d="M114 54 H196" stroke="#16a34a" stroke-width="2.4"/>
        <polygon points="198,54 191,50 191,58" fill="#16a34a"/>
        <text x="155" y="51" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#15803d">Li+ 高速通過</text>
        <!-- Electron blocked arrow -->
        <path d="M196 74 H164" stroke="#dc2626" stroke-width="2" stroke-dasharray="2 2"/>
        <line x1="162" y1="68" x2="162" y2="80" stroke="#dc2626" stroke-width="2.4"/>
        <text x="155" y="86" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#dc2626">e⁻ 遮断!</text>
        <!-- Electrode zone -->
        <rect x="186" y="24" width="120" height="66" rx="4" fill="#ecfdf5" stroke="#10b981"/>
        <text x="246" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#065f46">負極内部（ハダカLi+挿入）</text>
        <circle cx="222" cy="54" r="6" fill="#10b981"/>
        <text x="222" y="56" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">Li+</text>
        <circle cx="272" cy="54" r="6" fill="#10b981"/>
        <text x="272" y="56" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">Li+</text>
        <circle cx="222" cy="74" r="5" fill="#dc2626"/>
        <text x="222" y="76" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">e⁻</text>
        <text x="268" y="76" text-anchor="middle" font-size="5.2" fill="#047857">自己放電＆分解ゼロ</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">イオンはコートを素早く脱いで高速充電し、電子の壁すり抜けだけ2.5nm壁で完全遮断！</text>
      `);

    case 'bat_hv_45v_cobalt_surface_spinel':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#4c1d95">P109 4.5 V 高電圧正極 表面スピネル再構成 ＆ 格子酸素（O2）ロック保護殻</text>
        <!-- Left core-shell cutaway particle -->
        <text x="72" y="31" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#4c1d95">3–8nm スピネル鎧</text>
        <circle cx="72" cy="61" r="25" fill="#ddd6fe" stroke="#6d28d9" stroke-width="3.2"/>
        <circle cx="72" cy="61" r="16.5" fill="#7c3aed"/>
        <text x="72" y="59" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">層状正極</text>
        <text x="72" y="67.5" text-anchor="middle" font-size="5.0" fill="#ede9fe">4.50 V</text>
        <!-- Locked oxygen atoms along spinel shell -->
        <circle cx="52" cy="46" r="3.2" fill="#dc2626"/>
        <circle cx="92" cy="46" r="3.2" fill="#dc2626"/>
        <circle cx="52" cy="76" r="3.2" fill="#dc2626"/>
        <circle cx="92" cy="76" r="3.2" fill="#dc2626"/>
        <!-- Callout lines to right detail cards -->
        <line x1="97" y1="48" x2="128" y2="38" stroke="#7c3aed" stroke-width="1.4"/>
        <line x1="97" y1="73" x2="128" y2="75" stroke="#dc2626" stroke-width="1.4"/>
        <rect x="130" y="24" width="176" height="29" rx="4" fill="#fff" stroke="#8b5cf6"/>
        <text x="138" y="36" font-size="6.0" font-weight="bold" fill="#5b21b6">エピタキシャル・スピネル保護殻</text>
        <text x="138" y="47" font-size="5.4" fill="#334155">Mg/Ti柱イオンが結晶潰れを防止し高電圧長寿命</text>
        <rect x="130" y="59" width="176" height="31" rx="4" fill="#fff" stroke="#ef4444"/>
        <text x="138" y="71" font-size="6.0" font-weight="bold" fill="#b91c1c">格子酸素（O2）放出を完全ロック</text>
        <text x="138" y="83" font-size="5.4" fill="#334155">4.2V→4.5V化で同サイズ容量+15%・ガス膨張0</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">粒子表面の数nmを頑丈な宝石構造で鎧のように包み、4.5V高電圧でも酸素ガスを一粒も逃がさない！</text>
      `);

    case 'bat_solid_polymer_peo_bridge':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#065f46">P110 セラミック-PEO 柔軟ハイブリッド固体ポリマー界面イオン架橋層</text>
        <!-- Left: rigid-rigid gap problem -->
        <rect x="14" y="24" width="114" height="66" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="71" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#991b1b">従来：硬い石同士の点接触</text>
        <rect x="22" y="39" width="98" height="14" rx="2" fill="#475569"/>
        <polygon points="30,53 44,58 58,53 72,58 86,53 102,58 114,53" fill="#475569"/>
        <rect x="22" y="61" width="98" height="14" rx="2" fill="#334155"/>
        <text x="71" y="85" text-anchor="middle" font-size="5.2" fill="#dc2626">隙間だらけで抵抗大・割れ易い</text>
        <!-- Arrow -->
        <path d="M131 57 H143" stroke="#10b981" stroke-width="2.2"/>
        <polygon points="145,57 139,53 139,61" fill="#10b981"/>
        <!-- Right: flexible ceramic-in-PEO bridge -->
        <rect x="148" y="24" width="158" height="66" rx="4" fill="#fff" stroke="#10b981"/>
        <text x="227" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#047857">2026：PEO柔軟グミ＋LLZOビーズ橋</text>
        <rect x="156" y="38" width="142" height="11" rx="2" fill="#475569"/>
        <text x="227" y="45.5" text-anchor="middle" font-size="5.0" fill="#fff">硬質固体電極</text>
        <rect x="156" y="49" width="142" height="20" fill="#a7f3d0" stroke="#059669"/>
        <circle cx="176" cy="59" r="5" fill="#fff" stroke="#047857"/>
        <circle cx="204" cy="59" r="5" fill="#fff" stroke="#047857"/>
        <circle cx="232" cy="59" r="5" fill="#fff" stroke="#047857"/>
        <circle cx="260" cy="59" r="5" fill="#fff" stroke="#047857"/>
        <circle cx="284" cy="59" r="5" fill="#fff" stroke="#047857"/>
        <rect x="156" y="69" width="142" height="11" rx="2" fill="#334155"/>
        <text x="227" y="76.5" text-anchor="middle" font-size="5.0" fill="#fff">セラミック固体電解質</text>
        <text x="227" y="87" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#047857">全面密着 → 界面抵抗 1/5・耐衝撃UP</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">硬い固体同士のミクロ隙間を「イオンを通すグミシート」が密着し、衝撃も吸収する魔法の橋！</text>
      `);

    // =========================================================================
    // GROUP 2: P111–P120 — 2026 EMBEDDED FBG OPTICAL, ULTRASONIC CT, GAS MEMS & SELF-HEATING
    // =========================================================================

    case 'bat_fbg_optical_fiber_sensor':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#091324" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#7dd3fc">P111 セル内蔵 0.125 mm 光ファイバーFBG内部温度・歪みセンサー（2026年11月実証）</text>
        <!-- Silica optical fiber cross section -->
        <rect x="16" y="27" width="182" height="32" rx="6" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.4"/>
        <rect x="20" y="37" width="174" height="12" rx="3" fill="#0284c7"/>
        <!-- Periodic UV-inscribed Bragg gratings -->
        <rect x="68" y="34" width="4" height="18" fill="#ffffff"/>
        <rect x="80" y="34" width="4" height="18" fill="#ffffff"/>
        <rect x="92" y="34" width="4" height="18" fill="#ffffff"/>
        <rect x="104" y="34" width="4" height="18" fill="#ffffff"/>
        <rect x="116" y="34" width="4" height="18" fill="#ffffff"/>
        <rect x="128" y="34" width="4" height="18" fill="#ffffff"/>
        <rect x="140" y="34" width="4" height="18" fill="#ffffff"/>
        <!-- Incident & reflected laser arrows -->
        <path d="M24 41 H62" stroke="#fef08a" stroke-width="1.8"/>
        <polygon points="64,41 58,38 58,44" fill="#fef08a"/>
        <path d="M62 46 H26" stroke="#34d399" stroke-width="1.8" stroke-dasharray="3 2"/>
        <polygon points="24,46 30,43 30,49" fill="#34d399"/>
        <text x="107" y="70" text-anchor="middle" font-size="5.6" fill="#bae6fd">石英ファイバー径 0.125mm（髪の毛級 · 電磁ノイズ0%）</text>
        <text x="107" y="82" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#34d399">反射波長シフト Δλ = 10.24 pm/°C</text>
        <!-- Right wavelength shift graph -->
        <rect x="208" y="25" width="98" height="65" rx="4" fill="#0f172a" stroke="#34d399"/>
        <text x="257" y="35" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#a7f3d0">芯ホットスポット検知</text>
        <line x1="216" y1="74" x2="298" y2="74" stroke="#64748b" stroke-width="1"/>
        <path d="M222 74 Q238 40 250 74" fill="none" stroke="#38bdf8" stroke-width="2"/>
        <path d="M248 74 Q268 40 284 74" fill="none" stroke="#f97316" stroke-width="2"/>
        <text x="234" y="48" text-anchor="middle" font-size="4.8" fill="#7dd3fc">表面</text>
        <text x="278" y="48" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fb923c">芯+4.7°C</text>
        <text x="257" y="85" text-anchor="middle" font-size="5.0" fill="#e2e8f0">1550 nm 波長シフト</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">電池の心臓へ髪の毛サイズの光温度計を埋設！外側より+4.7°C熱い芯の異常を0.1秒で捕捉</text>
      `);

    case 'bat_ultrasonic_phased_ct_2026':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#052e23" stroke="#34d399" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#a7f3d0">P112 超音波フェーズドアレイ「バッテリーCT」内部ガス・SOH非破壊透視</text>
        <!-- Left ultrasonic CT cell scan -->
        <rect x="16" y="24" width="164" height="66" rx="4" fill="#064e3b" stroke="#10b981"/>
        <!-- PZT array top -->
        <rect x="34" y="28" width="128" height="9" rx="2" fill="#f59e0b"/>
        <text x="98" y="34.5" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#451a03">PZT 超音波フェーズドアレイ送信器</text>
        <!-- Sound wave arcs -->
        <path d="M46 42 Q98 54 150 42" fill="none" stroke="#34d399" stroke-width="1.5"/>
        <path d="M36 53 Q98 68 160 53" fill="none" stroke="#34d399" stroke-width="1.5"/>
        <path d="M36 66 Q70 76 102 68" fill="none" stroke="#34d399" stroke-width="1.4" stroke-dasharray="3 2"/>
        <!-- Gas pocket blocking ultrasound -->
        <ellipse cx="132" cy="67" rx="20" ry="11" fill="#dc2626" stroke="#fca5a5" stroke-width="1.4"/>
        <text x="132" y="69.5" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">ガス泡99.9%反射</text>
        <text x="58" y="83" text-anchor="middle" font-size="5.2" fill="#a7f3d0">正常液部: スッと透過</text>
        <!-- Right echo readout -->
        <rect x="190" y="24" width="116" height="66" rx="4" fill="#0f172a" stroke="#34d399"/>
        <text x="248" y="35" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#6ee7b7">非破壊エコー波形 (ToF)</text>
        <path d="M198 56 H214 L220 40 L226 56 H244 L250 44 L256 56 H298" fill="none" stroke="#34d399" stroke-width="1.8"/>
        <path d="M198 76 H214 L220 62 L226 76 H298" fill="none" stroke="#f87171" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="278" y="48" text-anchor="middle" font-size="5.0" fill="#a7f3d0">正常透過</text>
        <text x="276" y="72" text-anchor="middle" font-size="5.0" fill="#fca5a5">ガス減衰検知</text>
        <text x="248" y="86" text-anchor="middle" font-size="5.0" fill="#cbd5e1">音速変化からSOH/乾きも可視化</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">病院のエコー検査と同じ！電池を切らずに中のガス泡や電解液の乾きを丸見えにする2026診断</text>
      `);

    case 'bat_acoustic_emission_crack_mic':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#faf5ff" stroke="#a855f7" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#581c87">P113 アコースティック・エミッション（AE）電極微細クラック圧電聴診器</text>
        <!-- Left particle cracking emitting waves -->
        <rect x="14" y="24" width="136" height="66" rx="4" fill="#fff" stroke="#d8b4fe"/>
        <circle cx="44" cy="57" r="18" fill="#f3e8ff" stroke="#7e22ce" stroke-width="1.6"/>
        <path d="M36 47 L46 57 L38 66 M46 57 L55 52" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="44" y="84" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#dc2626">Si粒子「ピキッ!」</text>
        <path d="M68 46 A16 16 0 0 1 68 68" fill="none" stroke="#9333ea" stroke-width="1.8"/>
        <path d="M78 40 A24 24 0 0 1 78 74" fill="none" stroke="#9333ea" stroke-width="1.8"/>
        <path d="M90 36 A30 30 0 0 1 90 78" fill="none" stroke="#a855f7" stroke-width="1.6" stroke-dasharray="3 2"/>
        <rect x="116" y="38" width="26" height="38" rx="4" fill="#6b21a8"/>
        <text x="129" y="55" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">AE</text>
        <text x="129" y="66" text-anchor="middle" font-size="4.8" fill="#e9d5ff">聴診</text>
        <!-- Right frequency band classification -->
        <rect x="158" y="24" width="148" height="66" rx="4" fill="#fff" stroke="#a855f7"/>
        <text x="232" y="35" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#6b21a8">超音波の「音の高さ」で異常識別</text>
        <rect x="166" y="42" width="58" height="22" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="195" y="51" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">100–200 kHz</text>
        <text x="195" y="60" text-anchor="middle" font-size="5.0" fill="#0c4a6e">SEI破断・ガス</text>
        <rect x="230" y="42" width="68" height="22" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="264" y="51" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#b91c1c">250–600 kHz</text>
        <text x="264" y="60" text-anchor="middle" font-size="5.0" fill="#7f1d1d">Si/NMC粒子割れ</text>
        <rect x="166" y="70" width="132" height="14" rx="3" fill="#6b21a8"/>
        <text x="232" y="79.5" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">異常音急増 → 急速充電を自動減速!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">電極の粒が割れる極小の超音波悲鳴を聞き取り、充電スピードを優しく緩めて電池寿命を守る！</text>
      `);

    case 'bat_h2_co_voc_offgas_mems':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#7f1d1d">P114 GB 38031-2025（2026年7月義務化）H2 / CO / VOC 初期ガス検知MEMS</text>
        <!-- Timeline comparing Gas MEMS vs Temp Sensor -->
        <rect x="14" y="24" width="188" height="66" rx="4" fill="#fff" stroke="#fca5a5"/>
        <text x="108" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#991b1b">熱暴走タイムライン：温度より数分〜十数分先行!</text>
        <line x1="24" y1="62" x2="192" y2="62" stroke="#64748b" stroke-width="1.6"/>
        <!-- Early gas point -->
        <circle cx="54" cy="62" r="6" fill="#16a34a"/>
        <text x="54" y="48" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#15803d">H2/VOC極微放出</text>
        <text x="54" y="76" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#16a34a">MEMS即検知!</text>
        <text x="54" y="85" text-anchor="middle" font-size="4.8" fill="#166534">まだ50°C台</text>
        <!-- Margin arrow -->
        <path d="M64 62 H122" stroke="#16a34a" stroke-width="2.4" stroke-dasharray="3 2"/>
        <text x="94" y="57" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#047857">数〜10分余裕</text>
        <!-- Late temp / smoke point -->
        <circle cx="136" cy="62" r="5" fill="#f59e0b"/>
        <text x="136" y="76" text-anchor="middle" font-size="5.0" fill="#b45309">温度計反応</text>
        <circle cx="176" cy="62" r="6" fill="#dc2626"/>
        <text x="176" y="48" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#dc2626">発煙危険</text>
        <text x="176" y="76" text-anchor="middle" font-size="5.0" fill="#991b1b">手遅れ</text>
        <!-- Right MOX chip cutaway -->
        <rect x="210" y="24" width="96" height="66" rx="4" fill="#1e293b" stroke="#ef4444"/>
        <text x="258" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fca5a5">電子の鼻 MOX膜</text>
        <circle cx="258" cy="56" r="14" fill="#ea580c" stroke="#fed7aa" stroke-width="1.5"/>
        <text x="258" y="58" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">ppm検知</text>
        <text x="258" y="82" text-anchor="middle" font-size="5.0" fill="#fef08a">発火・爆発ゼロ規格</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">温度計が気づく何分も前に漏れ出す極微の水素ガスを嗅ぎ分け、煙が出る前に安全遮断！</text>
      `);

    case 'bat_ac_pulse_selfheat_core':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fff7ed" stroke="#f97316" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#7c2d12">P115 高周波ACパルス内部自己発熱回路（-40°C → 0°C 30秒未満 · 消費 &lt;3.8%）</text>
        <!-- Left AC pulse waveform -->
        <rect x="14" y="24" width="144" height="66" rx="4" fill="#fff" stroke="#fb923c"/>
        <text x="86" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#c2410c">1–10 kHz 対称交流パルス（劣化ゼロ）</text>
        <line x1="22" y1="57" x2="150" y2="57" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 2"/>
        <path d="M24 57 L34 39 L44 75 L54 39 L64 75 L74 39 L84 75 L94 39 L104 75 L114 39 L124 75 L134 39 L144 57" fill="none" stroke="#ea580c" stroke-width="2"/>
        <text x="86" y="85" text-anchor="middle" font-size="5.2" fill="#9a3412">プラス⇄マイナス高速反転でLi析出ゼロ</text>
        <!-- Right temp rise curve -->
        <rect x="166" y="24" width="140" height="66" rx="4" fill="#fff" stroke="#f97316"/>
        <text x="236" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#9a3412">セル芯温度の爆速立ち上がり</text>
        <line x1="180" y1="76" x2="296" y2="76" stroke="#94a3b8" stroke-width="1"/>
        <line x1="180" y1="40" x2="180" y2="76" stroke="#94a3b8" stroke-width="1"/>
        <line x1="180" y1="53" x2="296" y2="53" stroke="#16a34a" stroke-width="1" stroke-dasharray="3 2"/>
        <path d="M182 74 Q212 56 246 51 T294 49" fill="none" stroke="#ea580c" stroke-width="2.4"/>
        <path d="M182 74 Q240 70 294 59" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="2 2"/>
        <text x="262" y="44" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#15803d">0°C (&lt;30秒!)</text>
        <text x="262" y="72" text-anchor="middle" font-size="4.8" fill="#64748b">外カイロ: 数十分</text>
        <text x="194" y="85" font-size="4.8" fill="#0369a1">-40°C</text>
        <text x="260" y="85" font-size="4.8" font-weight="bold" fill="#c2410c">残量消費 &lt;3.8%</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">手をこすり合わせるように電気を高速往復！外カイロなしで-40°Cの芯から30秒で目覚める</text>
      `);

    case 'bat_hybrid_supercap_pulse_buf':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#14532d">P116 -40°C対応 ハイブリッド・スーパーキャパシタ（HPC）120fps連写緩衝器</text>
        <!-- Left parallel topology -->
        <rect x="14" y="24" width="136" height="66" rx="4" fill="#fff" stroke="#86efac"/>
        <rect x="22" y="34" width="42" height="36" rx="4" fill="#0284c7"/>
        <text x="43" y="50" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">Liセル</text>
        <text x="43" y="61" text-anchor="middle" font-size="4.8" fill="#e0f2fe">定常供給</text>
        <rect x="86" y="34" width="54" height="36" rx="4" fill="#16a34a"/>
        <text x="113" y="50" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">HPC並列</text>
        <text x="113" y="61" text-anchor="middle" font-size="4.8" fill="#dcfce7">2A+瞬発!</text>
        <path d="M64 44 H86 M64 60 H86" stroke="#f59e0b" stroke-width="2.2"/>
        <text x="82" y="83" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#15803d">10万回耐久・-40°C低ESR</text>
        <!-- Right voltage sag comparison -->
        <rect x="158" y="24" width="148" height="66" rx="4" fill="#fff" stroke="#22c55e"/>
        <text x="232" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#166534">120fps連写スパイク時の電圧安定</text>
        <line x1="168" y1="68" x2="298" y2="68" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3 2"/>
        <text x="272" y="63" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#dc2626">3.0V 電源落ち閾値</text>
        <path d="M170 46 H200 L206 51 H234 L240 46 H296" fill="none" stroke="#16a34a" stroke-width="2.4"/>
        <path d="M170 46 H200 L210 77 H230 L240 50 H296" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2 2"/>
        <text x="220" y="42.5" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#15803d">HPC有: 安定!</text>
        <text x="220" y="85" text-anchor="middle" font-size="5.0" fill="#dc2626">HPC無: 極寒で即落ち</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">瞬発力バツグンの電気のバネが連写大電流を肩代わりし、-40°Cでもカメラ電源を落とさない！</text>
      `);

    case 'bat_hall_magnetic_flux_shunt':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0c4a6e">P117 非接触・ゼロ損失 TMR / ホール磁気フラックス電流センサー</text>
        <!-- Left cutaway C-core + copper busbar + TMR sensor -->
        <rect x="14" y="24" width="166" height="66" rx="4" fill="#fff" stroke="#38bdf8"/>
        <!-- Busbar -->
        <rect x="22" y="52" width="150" height="14" rx="2" fill="#d97706"/>
        <text x="97" y="61" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">大電流 Cu バスバー（挿入抵抗 0 mΩ!）</text>
        <!-- Magnetic flux ring clearly wrapping around busbar without crossing text -->
        <path d="M84 52 C84 36, 110 36, 110 52" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <path d="M84 66 C84 82, 110 82, 110 66" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <!-- TMR chip sitting above flux gap -->
        <rect x="76" y="28" width="42" height="14" rx="3" fill="#0f172a" stroke="#38bdf8"/>
        <text x="97" y="37" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#38bdf8">TMR チップ</text>
        <text x="97" y="86" text-anchor="middle" font-size="5.0" fill="#0369a1">周囲磁界 B ∝ 電流 I を非接触読取</text>
        <!-- Right advantage cards -->
        <rect x="188" y="24" width="118" height="20" rx="3" fill="#0284c7"/>
        <text x="247" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">シャント発熱ロス 0 mW</text>
        <rect x="188" y="47" width="118" height="20" rx="3" fill="#0f766e"/>
        <text x="247" y="59" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">応答 &lt;1μs（短絡即遮断）</text>
        <rect x="188" y="70" width="118" height="20" rx="3" fill="#4f46e5"/>
        <text x="247" y="82" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">完全絶縁でマイコン保護</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">電線に抵抗をはさまず「周囲の磁力」から電流を測るから、ムダ発熱ゼロで超高精度！</text>
      `);

    case 'bat_laser_tabless_petal_weld':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fffbeb" stroke="#d97706" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#78350f">P118 タブレス花びらクラウン 360°全周リング・ファイバーレーザー溶接</text>
        <!-- Left top-down petal crown -->
        <rect x="14" y="24" width="112" height="66" rx="4" fill="#fff" stroke="#fbbf24"/>
        <circle cx="70" cy="54" r="23" fill="#fde68a" stroke="#b45309" stroke-width="1.8"/>
        <line x1="70" y1="31" x2="70" y2="77" stroke="#92400e" stroke-width="1"/>
        <line x1="47" y1="54" x2="93" y2="54" stroke="#92400e" stroke-width="1"/>
        <line x1="54" y1="38" x2="86" y2="70" stroke="#92400e" stroke-width="1"/>
        <line x1="86" y1="38" x2="54" y2="70" stroke="#92400e" stroke-width="1"/>
        <circle cx="70" cy="54" r="14" fill="none" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="4 2"/>
        <circle cx="70" cy="54" r="4.5" fill="#fff" stroke="#b45309"/>
        <text x="70" y="86" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#b45309">360°全周リング溶接</text>
        <!-- Right comparison -->
        <rect x="134" y="24" width="172" height="30" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="142" y="36" font-size="5.8" font-weight="bold" fill="#991b1b">従来：細い1本タブ（電子の大渋滞）</text>
        <text x="142" y="48" font-size="5.3" fill="#7f1d1d">電子移動 600mm → 高抵抗＆局所発熱</text>
        <rect x="134" y="59" width="172" height="31" rx="4" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="142" y="71" font-size="5.8" font-weight="bold" fill="#166534">2026：全周花びら＋デュアルレーザー</text>
        <text x="142" y="83" font-size="5.3" fill="#14532d">電子移動 45mm → 抵抗最大80%減・超クール</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">1か所の狭い改札から「360°全周の大玄関」へ！電気も熱も一瞬で抜ける次世代集電構造</text>
      `);

    case 'bat_jellyroll_axial_spring_pad':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0f172a">P119 ジェリーロール軸方向「呼吸膨張」吸収ウェーブスプリング＆緩衝器</text>
        <!-- Left cutaway stack -->
        <rect x="14" y="24" width="154" height="66" rx="4" fill="#fff" stroke="#94a3b8"/>
        <rect x="26" y="29" width="130" height="11" rx="2" fill="#64748b"/>
        <text x="91" y="36.5" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">スチール缶上蓋（固定壁）</text>
        <!-- 3D sinusoidal wave spring -->
        <path d="M28 50 Q42 41 56 50 T84 50 T112 50 T140 50 T154 47" fill="none" stroke="#0284c7" stroke-width="2.8"/>
        <!-- Silicone damper cushion -->
        <rect x="44" y="55" width="94" height="6" rx="2" fill="#f43f5e"/>
        <!-- Jellyroll below -->
        <rect x="26" y="64" width="130" height="20" rx="3" fill="#1e293b"/>
        <text x="91" y="76" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#e2e8f0">巻き物ジェリーロール（充放電で伸縮）</text>
        <!-- Right two-mode callout -->
        <rect x="176" y="24" width="130" height="30" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="184" y="36" font-size="5.8" font-weight="bold" fill="#1e40af">充放電の「深呼吸」追従</text>
        <text x="184" y="48" font-size="5.2" fill="#1e3a8a">Si膨張時の過圧を波バネで逃がす</text>
        <rect x="176" y="59" width="130" height="31" rx="4" fill="#fff1f2" stroke="#f43f5e"/>
        <text x="184" y="71" font-size="5.8" font-weight="bold" fill="#9f1239">落下数千Gショック吸収</text>
        <text x="184" y="83" font-size="5.2" fill="#881337">内部ガタつき＆タブ溶接断線を阻止</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">電池の深呼吸と落下衝撃の両方を極薄0.8mmの波型リングバネがフワッと受け止める！</text>
      `);

    case 'bat_ceramic_arc_quench_vent':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fef2f2" stroke="#94a3b8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0f172a">P120 多孔質セラミック＋ステンレス消炎スパークアレスター安全ベント</text>
        <!-- Left hot spark & gas entry -->
        <rect x="14" y="25" width="74" height="64" rx="4" fill="#fee2e2" stroke="#ef4444"/>
        <text x="51" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#b91c1c">万一の異常噴出</text>
        <polygon points="24,57 52,45 48,57 56,69" fill="#ef4444"/>
        <circle cx="64" cy="48" r="2.8" fill="#f97316"/>
        <circle cx="72" cy="64" r="2.8" fill="#f97316"/>
        <text x="51" y="82" text-anchor="middle" font-size="5.0" fill="#991b1b">高温ガス＋白熱火花</text>
        <!-- Center ceramic honeycomb arrestor -->
        <rect x="96" y="25" width="96" height="64" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
        <text x="144" y="35" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0f172a">1200°C耐熱セラミック細孔</text>
        <line x1="104" y1="44" x2="184" y2="44" stroke="#334155" stroke-width="2.6"/>
        <line x1="104" y1="53" x2="184" y2="53" stroke="#334155" stroke-width="2.6"/>
        <line x1="104" y1="62" x2="184" y2="62" stroke="#334155" stroke-width="2.6"/>
        <line x1="104" y1="71" x2="184" y2="71" stroke="#334155" stroke-width="2.6"/>
        <text x="144" y="83" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">消炎距離以下で熱を一気奪取!</text>
        <!-- Right cooled safe gas exit -->
        <rect x="200" y="25" width="106" height="64" rx="4" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="253" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0369a1">安全排気（引火ゼロ）</text>
        <path d="M210 49 H290 M210 58 H296 M210 67 H290" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="253" y="82" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0c4a6e">火花・炎は一歩も出ない!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">「ガス圧は逃がし、炎と火花は細孔で真っ暗に冷やす」安全灯原理の最終防火フィルター！</text>
      `);

    // =========================================================================
    // GROUP 3: P121–P130 — 2026 SMART BMS AI, EKF, PCM SPONGE, PUF & SUSTAINABILITY
    // =========================================================================

    case 'bat_kalman_ekf_soc_dsp':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#eef2ff" stroke="#6366f1" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#312e81">P121 拡張カルマンフィルタ（EKF）＆ デジタルツイン ±1% 高精度残量頭脳</text>
        <!-- Block 1: Digital Twin Model -->
        <rect x="16" y="28" width="84" height="32" rx="4" fill="#4f46e5"/>
        <text x="58" y="42" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">2RC 物理模型</text>
        <text x="58" y="53" text-anchor="middle" font-size="5.0" fill="#c7d2fe">電圧・分極を予測</text>
        <!-- Block 2: Live Sensor -->
        <rect x="16" y="64" width="84" height="24" rx="4" fill="#0284c7"/>
        <text x="58" y="79" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">実測 V / I / 温度</text>
        <!-- Compare circle -->
        <circle cx="132" cy="58" r="13" fill="#fff" stroke="#4f46e5" stroke-width="2"/>
        <text x="132" y="56" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#312e81">誤差</text>
        <text x="132" y="65" text-anchor="middle" font-size="5.0" fill="#4f46e5">照合</text>
        <path d="M100 44 H132 V45 M100 76 H132 V71" fill="none" stroke="#4f46e5" stroke-width="1.6"/>
        <!-- EKF Gain -->
        <path d="M145 58 H162" stroke="#16a34a" stroke-width="2.2"/>
        <polygon points="164,58 158,54 158,62" fill="#16a34a"/>
        <rect x="166" y="34" width="66" height="48" rx="4" fill="#10b981"/>
        <text x="199" y="52" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">EKF 自動補正</text>
        <text x="199" y="64" text-anchor="middle" font-size="5.2" fill="#d1fae5">カルマンゲイン</text>
        <text x="199" y="74" text-anchor="middle" font-size="5.0" fill="#fff">毎瞬ズレ修正</text>
        <!-- Output EVF -->
        <path d="M232 58 H246" stroke="#10b981" stroke-width="2.2"/>
        <polygon points="248,58 242,54 242,62" fill="#10b981"/>
        <rect x="250" y="34" width="56" height="48" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <text x="278" y="50" text-anchor="middle" font-size="5.2" fill="#7dd3fc">EVF表示</text>
        <text x="278" y="64" text-anchor="middle" font-size="8.0" font-weight="bold" fill="#34d399">73%</text>
        <text x="278" y="75" text-anchor="middle" font-size="4.8" fill="#cbd5e1">±1%精度</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">電池の中にコピー模型を住まわせ毎瞬答え合わせ！極寒や連写の電圧ブレに騙されない残量計</text>
      `);

    case 'bat_ai_cloud_soh_telemetry':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fdf4ff" stroke="#c026d3" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#701a75">P122 2026 エッジAI 劣化（SOH）余命予測 ＆ クラウド予知保全エンジン</text>
        <!-- Left partial charge curve -->
        <rect x="14" y="24" width="118" height="66" rx="4" fill="#fff" stroke="#e879f9"/>
        <text x="73" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#86198f">普段の継ぎ足し充電波形</text>
        <line x1="22" y1="78" x2="124" y2="78" stroke="#94a3b8" stroke-width="1"/>
        <path d="M24 72 Q52 54 78 46 T120 38" fill="none" stroke="#c026d3" stroke-width="2.2"/>
        <rect x="52" y="40" width="44" height="36" fill="#fae8ff" opacity="0.55" stroke="#a21caf" stroke-dasharray="2 2"/>
        <text x="74" y="86" text-anchor="middle" font-size="5.0" fill="#701a75">40%→75% dQ/dV特徴抽出</text>
        <!-- Arrow -->
        <path d="M135 57 H147" stroke="#c026d3" stroke-width="2"/>
        <polygon points="149,57 143,53 143,61" fill="#c026d3"/>
        <!-- Center TinyML NPU -->
        <rect x="152" y="28" width="66" height="58" rx="4" fill="#701a75"/>
        <text x="185" y="44" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">TinyML AI</text>
        <text x="185" y="56" text-anchor="middle" font-size="5.0" fill="#f0abfc">INT8 超省エネ</text>
        <text x="185" y="67" text-anchor="middle" font-size="5.0" fill="#f0abfc">EIS＋温度履歴</text>
        <text x="185" y="78" text-anchor="middle" font-size="5.0" fill="#fde047">誤差 &lt; 2%</text>
        <!-- Arrow -->
        <path d="M220 57 H232" stroke="#16a34a" stroke-width="2"/>
        <polygon points="234,57 228,53 228,61" fill="#16a34a"/>
        <!-- Right Output Dashboard -->
        <rect x="236" y="24" width="70" height="66" rx="4" fill="#fff" stroke="#10b981"/>
        <text x="271" y="35" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#065f46">健康診断通知</text>
        <text x="271" y="52" text-anchor="middle" font-size="8.2" font-weight="bold" fill="#10b981">SOH 94%</text>
        <text x="271" y="66" text-anchor="middle" font-size="5.2" fill="#334155">残寿命: 340回</text>
        <text x="271" y="78" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0284c7">交換どき先読み</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">毎日のちょっとした充電カーブからAIドクターが体力を診断し、本番前の交換どきを先読み！</text>
      `);

    case 'bat_dual_redundant_afe_adc':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0c4a6e">P123 ISO機能安全 16-bit 二重冗長ΔΣ電圧AFE ＆ 基準電圧（Vref）相互診断</text>
        <!-- Left 2S cells -->
        <rect x="14" y="28" width="46" height="28" rx="3" fill="#0ea5e9"/>
        <text x="37" y="45" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">Cell 1</text>
        <rect x="14" y="60" width="46" height="28" rx="3" fill="#0284c7"/>
        <text x="37" y="77" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">Cell 2</text>
        <!-- Dual independent AFE blocks -->
        <rect x="76" y="26" width="84" height="28" rx="4" fill="#0369a1"/>
        <text x="118" y="38" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">主 AFE (16-bit)</text>
        <text x="118" y="49" text-anchor="middle" font-size="5.0" fill="#bae6fd">独立ものさし Vref1</text>
        <rect x="76" y="60" width="84" height="28" rx="4" fill="#0f766e"/>
        <text x="118" y="72" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">副 保護IC (独立)</text>
        <text x="118" y="83" text-anchor="middle" font-size="5.0" fill="#99f6e4">独立ものさし Vref2</text>
        <path d="M60 42 H76 M60 74 H76 M68 42 V74" fill="none" stroke="#64748b" stroke-width="1.5"/>
        <!-- Cross-check comparator -->
        <path d="M160 40 H182 V50 M160 74 H182 V64" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
        <rect x="176" y="46" width="54" height="24" rx="4" fill="#f59e0b"/>
        <text x="203" y="56" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">相互比較</text>
        <text x="203" y="66" text-anchor="middle" font-size="5.0" fill="#fef3c7">±1.5 mV</text>
        <!-- Hardware fail-safe output -->
        <path d="M230 58 H244" stroke="#dc2626" stroke-width="2"/>
        <polygon points="246,58 240,54 240,62" fill="#dc2626"/>
        <rect x="248" y="32" width="58" height="52" rx="4" fill="#16a34a"/>
        <text x="277" y="48" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">単一故障</text>
        <text x="277" y="59" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">安全遮断</text>
        <text x="277" y="73" text-anchor="middle" font-size="4.8" fill="#dcfce7">ズレ15mVで即停止</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">飛行機の二重計器と同じ！2つの電圧計が互いの「ものさし」まで監視して過充電を完全防止</text>
      `);

    case 'bat_active_emi_cm_choke':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#713f12">P124 USB-C / 2 MHz GaN コモンモードEMIチョーク（給電録音ハム遮断）</text>
        <!-- Left noisy USB-C input -->
        <rect x="14" y="26" width="84" height="62" rx="4" fill="#fff" stroke="#f59e0b"/>
        <text x="56" y="38" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#b45309">USB-C / GaN 側</text>
        <line x1="22" y1="50" x2="90" y2="50" stroke="#16a34a" stroke-width="2"/>
        <text x="56" y="47" text-anchor="middle" font-size="4.8" fill="#15803d">正規 DC電力 (+/−)</text>
        <path d="M22 68 L28 62 L34 74 L40 62 L46 74 L52 62 L58 74 L64 62 L70 74 L76 62 L82 74 L88 68" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <text x="56" y="83" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#dc2626">2MHz 同相ノイズ</text>
        <!-- Center ferrite choke toroid -->
        <circle cx="154" cy="57" r="26" fill="none" stroke="#475569" stroke-width="9"/>
        <circle cx="154" cy="57" r="26" fill="none" stroke="#d97706" stroke-width="3" stroke-dasharray="5 5"/>
        <text x="154" y="55" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#1e293b">磁束相殺</text>
        <text x="154" y="64" text-anchor="middle" font-size="4.8" fill="#475569">フェライト環</text>
        <path d="M98 50 H122 M186 50 H210" stroke="#16a34a" stroke-width="2.2"/>
        <path d="M98 68 H122" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2 2"/>
        <line x1="122" y1="62" x2="122" y2="74" stroke="#dc2626" stroke-width="2.4"/>
        <!-- Right clean camera audio output -->
        <rect x="212" y="26" width="94" height="62" rx="4" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="259" y="38" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#166534">カメラ・マイク側</text>
        <line x1="222" y1="50" x2="296" y2="50" stroke="#16a34a" stroke-width="2.2"/>
        <text x="259" y="63" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#15803d">DC電力 無損失通過</text>
        <text x="259" y="76" text-anchor="middle" font-size="5.2" fill="#047857">ジーッという雑音 0!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">まじめな電力はスッと通し、マイクへ飛び込む2MHz充電ノイズだけを磁束相殺で消し去る！</text>
      `);

    case 'bat_gold_wiper_selfclean_slot':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#78350f">P125 NP-FZ100 4ピン自動清浄摺動スロット ＆ Ni-Pd-Au 3層耐硫化めっき</text>
        <!-- Left 3-layer plating microscope cross section -->
        <rect x="14" y="24" width="144" height="66" rx="4" fill="#fff" stroke="#fbbf24"/>
        <text x="86" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#b45309">貴金属 3層防錆バリア断面</text>
        <rect x="22" y="39" width="128" height="13" rx="2" fill="#eab308"/>
        <text x="86" y="48" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#422006">最表層：硬質 Au 金（低抵抗・耐摩耗）</text>
        <rect x="22" y="54" width="128" height="13" rx="2" fill="#cbd5e1"/>
        <text x="86" y="63" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0f172a">中間層：Pd パラジウム（硫黄・塩害遮断）</text>
        <rect x="22" y="69" width="128" height="13" rx="2" fill="#64748b"/>
        <text x="86" y="78" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">下地層：Ni ニッケル（母材銅拡散防止）</text>
        <!-- Right self-cleaning wiping motion -->
        <rect x="166" y="24" width="140" height="66" rx="4" fill="#fff" stroke="#d97706"/>
        <text x="236" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#92400e">3 mm 摺動セルフクリーニング</text>
        <rect x="176" y="42" width="120" height="12" rx="2" fill="#334155"/>
        <text x="236" y="50" text-anchor="middle" font-size="5.0" fill="#fde047">カメラ側ブレード挿入 ⇄ 毎回3mm拭掃</text>
        <path d="M192 61 H280" stroke="#ea580c" stroke-width="2"/>
        <polygon points="282,61 275,57 275,65" fill="#ea580c"/>
        <polygon points="190,61 197,57 197,65" fill="#ea580c"/>
        <text x="236" y="75" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#15803d">酸化膜を自動除去 → 接触抵抗 &lt; 5 mΩ</text>
        <text x="236" y="85" text-anchor="middle" font-size="5.0" fill="#475569">深溝PPS隔壁でコイン短絡も完全防御</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">差し込むたび自動で接点を磨き上げ、3層貴金属めっきで温泉地や海辺でもサビ知らず！</text>
      `);

    case 'bat_potting_phase_change_pcm':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fdf2f8" stroke="#ec4899" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#831843">P126 潜熱パラフィン相変化材料（PCM）サーマルスポンジ封止層</text>
        <!-- Left microcapsule cutaway -->
        <rect x="14" y="24" width="132" height="66" rx="4" fill="#fbcfe8" stroke="#db2777"/>
        <text x="80" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#9d174d">漏れゼロ・ロウ封入カプセル</text>
        <circle cx="42" cy="54" r="11" fill="#fef08a" stroke="#ca8a04" stroke-width="1.6"/>
        <circle cx="80" cy="54" r="11" fill="#fef08a" stroke="#ca8a04" stroke-width="1.6"/>
        <circle cx="118" cy="54" r="11" fill="#fef08a" stroke="#ca8a04" stroke-width="1.6"/>
        <text x="42" y="56" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#713f12">45°C</text>
        <text x="80" y="56" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#713f12">融解</text>
        <text x="118" y="56" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#713f12">吸熱</text>
        <text x="80" y="81" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#831843">潜熱 200 J/g 吸収・再固化で繰返OK</text>
        <!-- Right temperature plateau graph -->
        <rect x="154" y="24" width="152" height="66" rx="4" fill="#fff" stroke="#ec4899"/>
        <text x="230" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#be185d">4K60録画時の温度上昇プラトー抑制</text>
        <line x1="166" y1="78" x2="296" y2="78" stroke="#94a3b8" stroke-width="1"/>
        <line x1="166" y1="40" x2="166" y2="78" stroke="#94a3b8" stroke-width="1"/>
        <path d="M168 74 L214 48 L292 44" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 2"/>
        <path d="M168 74 L204 59 H268 L294 52" fill="none" stroke="#db2777" stroke-width="2.5"/>
        <text x="236" y="42" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#dc2626">PCM無: 即熱停止</text>
        <text x="236" y="69" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#be185d">45°Cで温度足止め!</text>
        <text x="230" y="86" text-anchor="middle" font-size="4.8" fill="#475569">録画経過時間 →</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">氷が溶ける間は温まらない原理を45°Cで応用！4K録画の熱スパイクを吸い取り熱停止を遅らせる</text>
      `);

    case 'bat_hydrophobic_pcb_nano_coat':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#164e63">P127 プラズマ重合フッ素ポリマー 超撥水PCBナノコーティング（100–500 nm）</text>
        <!-- Left droplet contact angle cutaway -->
        <rect x="14" y="24" width="164" height="66" rx="4" fill="#fff" stroke="#22d3ee"/>
        <rect x="22" y="68" width="148" height="14" rx="2" fill="#065f46"/>
        <text x="96" y="77.5" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">BMS 精密電子基板 ＆ IC端子</text>
        <rect x="22" y="63" width="148" height="4" fill="#22d3ee"/>
        <circle cx="56" cy="49" r="13" fill="#38bdf8" stroke="#0284c7" stroke-width="1.4"/>
        <text x="56" y="51" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">結露滴</text>
        <circle cx="102" cy="52" r="10" fill="#38bdf8" stroke="#0284c7" stroke-width="1.4"/>
        <circle cx="140" cy="54" r="8" fill="#38bdf8" stroke="#0284c7" stroke-width="1.4"/>
        <text x="116" y="37" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0e7490">接触角 θ &gt; 115°（コロコロ弾く!）</text>
        <!-- Right spec pills -->
        <rect x="186" y="24" width="120" height="20" rx="3" fill="#0891b2"/>
        <text x="246" y="36" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">真空PECVD 隙間裏まで成膜</text>
        <rect x="186" y="47" width="120" height="20" rx="3" fill="#0284c7"/>
        <text x="246" y="59" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">極薄200nmで放熱阻害ゼロ</text>
        <rect x="186" y="70" width="120" height="20" rx="3" fill="#0f766e"/>
        <text x="246" y="82" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">結露ショート＆サビ完全阻止</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">ハスの葉のように結露水を丸い水玉にして弾き飛ばす、基板を丸ごと包む透明レインコート！</text>
      `);

    case 'bat_second_source_id_puf':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#4c1d95">P128 シリコンPUF（物理複製困難関数）原子指紋アンチコピー認証IC</text>
        <!-- Left SRAM atomic variation matrix -->
        <rect x="14" y="24" width="112" height="66" rx="4" fill="#1e1b4b" stroke="#8b5cf6"/>
        <text x="70" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#ddd6fe">SRAM通電時の固有原子指紋</text>
        <rect x="26" y="40" width="12" height="10" fill="#38bdf8"/>
        <rect x="42" y="40" width="12" height="10" fill="#312e81"/>
        <rect x="58" y="40" width="12" height="10" fill="#a78bfa"/>
        <rect x="74" y="40" width="12" height="10" fill="#38bdf8"/>
        <rect x="90" y="40" width="12" height="10" fill="#312e81"/>
        <rect x="26" y="54" width="12" height="10" fill="#312e81"/>
        <rect x="42" y="54" width="12" height="10" fill="#38bdf8"/>
        <rect x="58" y="54" width="12" height="10" fill="#38bdf8"/>
        <rect x="74" y="54" width="12" height="10" fill="#312e81"/>
        <rect x="90" y="54" width="12" height="10" fill="#a78bfa"/>
        <text x="70" y="79" text-anchor="middle" font-size="5.2" fill="#fde047">チップ固有 1/10⁷⁷ 一意パターン</text>
        <!-- Arrow -->
        <path d="M129 57 H143" stroke="#7c3aed" stroke-width="2"/>
        <polygon points="145,57 139,53 139,61" fill="#7c3aed"/>
        <!-- Center on-the-fly key -->
        <rect x="148" y="28" width="76" height="58" rx="4" fill="#fff" stroke="#7c3aed"/>
        <text x="186" y="42" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#5b21b6">通電時のみ鍵生成</text>
        <text x="186" y="56" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#dc2626">メモリ保存 0 bit!</text>
        <text x="186" y="70" text-anchor="middle" font-size="5.0" fill="#334155">電源OFFで鍵消滅</text>
        <text x="186" y="80" text-anchor="middle" font-size="5.0" fill="#334155">顕微鏡解析でも無敵</text>
        <!-- Arrow -->
        <path d="M226 57 H238" stroke="#16a34a" stroke-width="2"/>
        <polygon points="240,57 234,53 234,61" fill="#16a34a"/>
        <!-- Right verification -->
        <rect x="242" y="28" width="64" height="58" rx="4" fill="#16a34a"/>
        <text x="274" y="48" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">純正認証</text>
        <text x="274" y="61" text-anchor="middle" font-size="5.2" fill="#dcfce7">偽造セル</text>
        <text x="274" y="73" text-anchor="middle" font-size="5.2" fill="#dcfce7">完全ブロック</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">メモリに鍵を置かずチップ自身の「生まれつきの原子指紋」で認証する、絶対にマネできない防偽IC！</text>
      `);

    case 'bat_recycle_direct_cathode_tag':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#14532d">P129 2026 ダイレクト正極リサイクル レーザーID ＆ 熱剥離バインダー循環</text>
        <!-- Step 1: Laser QR -->
        <rect x="14" y="26" width="76" height="62" rx="4" fill="#fff" stroke="#16a34a"/>
        <text x="52" y="36" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#15803d">1. レーザーID自動分別</text>
        <rect x="34" y="41" width="36" height="32" rx="2" fill="#f8fafc" stroke="#334155"/>
        <rect x="38" y="45" width="8" height="8" fill="#0f172a"/>
        <rect x="58" y="45" width="8" height="8" fill="#0f172a"/>
        <rect x="38" y="61" width="8" height="8" fill="#0f172a"/>
        <rect x="49" y="53" width="6" height="6" fill="#16a34a"/>
        <text x="52" y="83" text-anchor="middle" font-size="5.0" fill="#166534">組成をロボット即読取</text>
        <!-- Arrow 1 -->
        <path d="M92 57 H104" stroke="#16a34a" stroke-width="2"/>
        <polygon points="106,57 100,53 100,61" fill="#16a34a"/>
        <!-- Step 2: Direct Relithiation -->
        <rect x="108" y="26" width="102" height="62" rx="4" fill="#dcfce7" stroke="#15803d"/>
        <text x="159" y="38" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#14532d">2. 溶かさず結晶そのまま再生</text>
        <text x="159" y="52" text-anchor="middle" font-size="5.4" fill="#166534">熱剥離で正極結晶を回収</text>
        <text x="159" y="64" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0284c7">+ 欠損 Li+ だけ補給復活!</text>
        <text x="159" y="79" text-anchor="middle" font-size="5.0" fill="#15803d">高温溶解・強酸処理が不要</text>
        <!-- Arrow 2 -->
        <path d="M212 57 H224" stroke="#16a34a" stroke-width="2"/>
        <polygon points="226,57 220,53 220,61" fill="#16a34a"/>
        <!-- Step 3: CO2 savings -->
        <rect x="228" y="26" width="78" height="62" rx="4" fill="#15803d"/>
        <text x="267" y="42" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">新品同等へ再生</text>
        <text x="267" y="58" text-anchor="middle" font-size="7.4" font-weight="bold" fill="#fde047">CO2 -70%</text>
        <text x="267" y="72" text-anchor="middle" font-size="5.0" fill="#dcfce7">EU 2026電池規則</text>
        <text x="267" y="82" text-anchor="middle" font-size="5.0" fill="#dcfce7">回収義務に完全適合</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">ドロドロに溶かさず「傷んだ正極結晶へLiを補給して新品同様に若返らせる」究極のエコ循環設計！</text>
      `);

    case 'bat_un383_crush_mandrel_guard':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#7f1d1d">P130 UN38.3 航空輸送 圧壊・低圧・短絡耐性 補強センターマンドレル骨格</text>
        <!-- Left cutaway cell with center mandrel & gas chimney -->
        <rect x="14" y="24" width="144" height="66" rx="4" fill="#fff" stroke="#fca5a5"/>
        <!-- Outer armored cell shell -->
        <rect x="44" y="34" width="84" height="46" rx="6" fill="#f1f5f9" stroke="#334155" stroke-width="2.4"/>
        <!-- Hollow reinforced center mandrel -->
        <rect x="78" y="34" width="16" height="46" fill="#d97706" stroke="#78350f"/>
        <path d="M86 76 V27" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <polygon points="86,25 82,31 90,31" fill="#0284c7"/>
        <text x="116" y="32" font-size="5.0" font-weight="bold" fill="#0369a1">排気煙突</text>
        <!-- Crush force arrows from left & right stopped by frame -->
        <path d="M18 57 H40" stroke="#dc2626" stroke-width="2.6"/>
        <polygon points="42,57 35,53 35,61" fill="#dc2626"/>
        <path d="M154 57 H132" stroke="#dc2626" stroke-width="2.6"/>
        <polygon points="130,57 137,53 137,61" fill="#dc2626"/>
        <text x="86" y="87" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#991b1b">鉄の背骨が圧壊座屈ショートを阻止!</text>
        <!-- Right UN38.3 8-test checklist -->
        <rect x="166" y="24" width="140" height="66" rx="4" fill="#fff" stroke="#dc2626"/>
        <text x="236" y="35" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#991b1b">国連 UN38.3 航空8試験クリア</text>
        <rect x="174" y="40" width="60" height="19" rx="3" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="204" y="49" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#1e40af">低圧 11.6kPa</text>
        <text x="204" y="56" text-anchor="middle" font-size="4.6" fill="#1e3a8a">高度15,000m</text>
        <rect x="238" y="40" width="60" height="19" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="268" y="49" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#92400e">熱衝撃</text>
        <text x="268" y="56" text-anchor="middle" font-size="4.6" fill="#78350f">-40°C⇄+72°C</text>
        <rect x="174" y="64" width="60" height="19" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="204" y="73" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#991b1b">衝撃 150 G</text>
        <text x="204" y="80" text-anchor="middle" font-size="4.6" fill="#7f1d1d">振動・圧壊耐性</text>
        <rect x="238" y="64" width="60" height="19" rx="3" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="268" y="73" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#166534">外部短絡・過充電</text>
        <text x="268" y="80" text-anchor="middle" font-size="4.6" fill="#14532d">機内持込安全</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#1e293b">世界中の飛行機へ安全に持ち込むための「鉄の背骨」！圧壊保護と緊急排気煙突を1本で両立</text>
      `);

    default:
      return null;
  }
}
