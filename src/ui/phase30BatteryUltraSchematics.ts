import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 30A Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (+40 diagrams):
 *   - 10 dedicated upgrades for P61–P70
 *   - 30 brand-new 2026 frontier diagrams for P71–P100
 * Achieves 100/100 unique bespoke SVGs across the entire Battery Pack Ultra-Dissection!
 */
export function renderPhase30BatteryUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // P61–P70 DEDICATED SCHEMATICS
    // =========================================================================
    case 'bat_bimetal_al_ni_strip':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="20" y="34" width="44" height="30" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="42" y="52" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#1e293b">純Al</text>
        <rect x="64" y="34" width="6" height="30" fill="#eab308"/>
        <rect x="70" y="34" width="42" height="30" rx="2" fill="#64748b" stroke="#334155"/>
        <text x="91" y="52" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">Ni-200</text>
        <text x="66" y="28" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#b45309">冷間圧延クラッド接合</text>
        <text x="66" y="76" text-anchor="middle" font-size="5.0" fill="#334155">Al↔Al超音波 / Ni↔Niスポット</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#475569">接触抵抗 &lt; 0.5 mΩ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">P61 バイメタルAl-Ni遷移タブ</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・アルミ正極とニッケル配線の間を橋渡し</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・脆い合金や湿気による電蝕サビを防止</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・連写8Aパルスでも発熱ゼロの低抵抗結合</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e293b">片面アルミ・片面ニッケルの魔法の板で、異なる金属同士をサビず割れずに最強溶接！</text>
      `);

    case 'bat_bms_copper_shunt_bus':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <rect x="20" y="34" width="92" height="14" rx="2" fill="#ea580c"/>
        <rect x="52" y="32" width="28" height="18" rx="2" fill="#f59e0b" stroke="#7c2d12"/>
        <text x="66" y="44" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">5mΩ</text>
        <path d="M55 50 V66 H34 M77 50 V66 H98" fill="none" stroke="#eab308" stroke-width="1.8"/>
        <text x="66" y="27" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#9a3412">3oz厚銅ハイウェイ (8A対応)</text>
        <text x="66" y="76" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#b45309">4線式ケルビン電圧検出</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">計測誤差 &lt; 0.2%</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">P62 3oz厚銅バス＆ケルビン線</text>
        <text x="136" y="43" font-size="6.6" fill="#9a3412">・通常3倍の厚銅105μmで大電流ロス抑制</text>
        <text x="136" y="56" font-size="6.6" fill="#9a3412">・大電流路と計測線を分離(4端子ケルビン)</text>
        <text x="136" y="69" font-size="6.6" fill="#9a3412">・1%刻み残量表示の超精密積算を実現</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7c2d12">極太の銅ハイウェイと専用測定線の分離で、大電流連写中も正確な残量と電圧を守る！</text>
      `);

    case 'bat_ultrasonic_seal_gasket':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <path d="M22 36 H54 V52 H66 V36 H110" fill="none" stroke="#334155" stroke-width="5"/>
        <path d="M22 58 H50 V42 H70 V58 H110" fill="none" stroke="#64748b" stroke-width="4.5"/>
        <rect x="52" y="42" width="16" height="12" fill="#06b6d4" opacity="0.75"/>
        <text x="66" y="27" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0e7490">20kHz 超音波シェアジョイント</text>
        <text x="66" y="75" text-anchor="middle" font-size="5.1" fill="#155e75">凸凹噛合溶着＋端子防湿ビード</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0e7490">接着剤ゼロ全周防滴溶着</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#164e63">P63 超音波防滴勘合＆ビード</text>
        <text x="136" y="43" font-size="6.6" fill="#155e75">・タッパー状の凸凹リブを20kHz摩擦溶融</text>
        <text x="136" y="56" font-size="6.6" fill="#155e75">・端子ポケット境界をシリコーンで防湿</text>
        <text x="136" y="69" font-size="6.6" fill="#155e75">・1.5m落下でも外装が割れない高強度</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#164e63">前後ケースを分子レベルで溶着一体化し、雨天ロケの水滴や落下衝撃からBMSを死守！</text>
      `);

    case 'bat_cell_electrolyte_fill_ball':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <rect x="20" y="46" width="92" height="16" fill="#64748b"/>
        <polygon points="54,46 78,46 72,62 60,62" fill="#f0f9ff"/>
        <circle cx="66" cy="46" r="10" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <circle cx="66" cy="46" r="12" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="66" y="28" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#b45309">SUS316L球＋レーザー全周溶接</text>
        <text x="66" y="75" text-anchor="middle" font-size="5.0" fill="#0369a1">真空注液ポート完全気密封止</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.7" font-weight="bold" fill="#0369a1">Heリーク &lt; 10⁻⁹ Pa·m³/s</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">P64 電解液注入口・封止鋼球</text>
        <text x="136" y="43" font-size="6.6" fill="#0369a1">・真空注液後にφ1〜2mm鋼球をテーパ圧入</text>
        <text x="136" y="56" font-size="6.6" fill="#0369a1">・ファイバーレーザーで全周を完全溶融密閉</text>
        <text x="136" y="69" font-size="6.6" fill="#0369a1">・10年間1滴の液漏れも湿気侵入もゼロ</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0c4a6e">極小ステンレス球とレーザー溶接の完全密閉で、電解液の蒸発と湿気劣化を一生遮断！</text>
      `);

    case 'bat_camera_pogo_mating_pins':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <rect x="20" y="22" width="92" height="14" rx="2" fill="#334155"/>
        <rect x="28" y="36" width="6" height="22" fill="#eab308"/>
        <rect x="44" y="36" width="6" height="22" fill="#eab308"/>
        <rect x="60" y="36" width="6" height="22" fill="#eab308"/>
        <rect x="76" y="36" width="6" height="22" fill="#eab308"/>
        <rect x="94" y="36" width="10" height="26" rx="2" fill="#94a3b8"/>
        <path d="M96 42 H102 M96 48 H102 M96 54 H102" stroke="#1e293b" stroke-width="1.3"/>
        <text x="55" y="72" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#854d0e">+ / T / S / − 金ブレード</text>
        <text x="99" y="72" text-anchor="middle" font-size="4.8" fill="#475569">バネ押出</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">予圧 2.5N ／ Rc &lt; 10mΩ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#713f12">P65 カメラ側4極ブレード＆押出</text>
        <text x="136" y="43" font-size="6.6" fill="#854d0e">・硬質金めっき4極ブレードが電池へ嵌合</text>
        <text x="136" y="56" font-size="6.6" fill="#854d0e">・ばね式プランジャが交換時にポンッと押出</text>
        <text x="136" y="69" font-size="6.6" fill="#854d0e">・常時予圧で連写振動の瞬間電源断を防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#713f12">カメラ電池室の奥で待つ4本の金ブレードとバネ押しピンが、確実通電と片手交換を実現！</text>
      `);

    case 'bat_cell_matching_divider':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <rect x="20" y="24" width="20" height="22" rx="2" fill="#0f766e"/>
        <text x="30" y="38" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">C1</text>
        <rect x="20" y="52" width="20" height="22" rx="2" fill="#0f766e"/>
        <text x="30" y="66" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">C2</text>
        <line x1="40" y1="49" x2="54" y2="49" stroke="#14b8a6" stroke-width="2"/>
        <rect x="54" y="43" width="22" height="12" rx="2" fill="#1e293b" stroke="#eab308"/>
        <text x="65" y="51" text-anchor="middle" font-size="4.8" fill="#fff">100Ω</text>
        <line x1="76" y1="49" x2="108" y2="49" stroke="#14b8a6" stroke-width="2"/>
        <line x1="88" y1="49" x2="88" y2="62" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="82" y="62" width="12" height="8" fill="#f59e0b"/>
        <text x="88" y="79" text-anchor="middle" font-size="4.8" fill="#0f766e">0.1μF RC</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0f766e">BM中間線・短絡発火ガード</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#115e59">P66 2S中間BM保護抵抗＆RC</text>
        <text x="136" y="43" font-size="6.6" fill="#0f766e">・2本直列の真ん中(BM)監視線を安全保護</text>
        <text x="136" y="56" font-size="6.6" fill="#0f766e">・基板故障時のBMショート電流を制限遮断</text>
        <text x="136" y="69" font-size="6.6" fill="#0f766e">・ノイズを除去し±2mV精度で均等化計測</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#115e59">難燃100Ω抵抗とコンデンサが、2本直列の精密測定と万一の短絡発火防止を同時達成！</text>
      `);

    case 'bat_cell_insulation_collar':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <rect x="24" y="26" width="34" height="36" rx="4" fill="#64748b"/>
        <rect x="74" y="26" width="34" height="36" rx="4" fill="#64748b"/>
        <path d="M20 58 V68 H112 V58 M64 26 V68" fill="none" stroke="#eab308" stroke-width="4"/>
        <text x="41" y="46" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fff">18500 L</text>
        <text x="91" y="46" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fff">18500 R</text>
        <text x="66" y="79" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#b45309">Nomex 410 アラミド底面カップ</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#475569">&gt;300℃非溶融 / 25kV/mm</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">P67 ノーメックス底面絶縁カップ</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・消防服と同じメタアラミド高耐熱絶縁紙</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・2本の鋼缶底面と中央隔壁をアーク遮断</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・300℃超でも溶け落ちず二次短絡を阻止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e293b">熱で溶けない消防服素材の絶縁カップと仕切り壁が、底面バスバー周りの火花を完全封鎖！</text>
      `);

    case 'bat_bms_crystal_osc':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#eab308"/>
        <rect x="30" y="28" width="72" height="28" rx="4" fill="#eab308" stroke="#854d0e" stroke-width="1.5"/>
        <path d="M46 42 H60 M60 35 H80 M60 49 H80" fill="none" stroke="#fff" stroke-width="2.2"/>
        <text x="66" y="24" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#854d0e">32.768 kHz = 2¹⁵ Hz 音叉水晶</text>
        <text x="66" y="70" text-anchor="middle" font-size="5.2" fill="#a16207">15段分周 → 正確な 1.000 秒</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#854d0e">消費 &lt; 1μA ／ 保管劣化計測</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#713f12">P68 32.768kHz RTC時計水晶</text>
        <text x="136" y="43" font-size="6.6" fill="#854d0e">・電池内蔵の極小腕時計(±20ppm精度)</text>
        <text x="136" y="56" font-size="6.6" fill="#854d0e">・防湿庫で眠る間の経過日数を常時カウント</text>
        <text x="136" y="69" font-size="6.6" fill="#854d0e">・自然放電とカレンダー劣化を正確補正</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#713f12">カメラから抜いた後も超省エネで時を刻み、自然放電と経年劣化を1%単位で正確に反映！</text>
      `);

    case 'bat_bms_current_comparator':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <polygon points="36,30 36,68 78,49" fill="#dc2626"/>
        <text x="48" y="44" font-size="7" font-weight="bold" fill="#fff">+</text>
        <text x="48" y="61" font-size="7" font-weight="bold" fill="#fff">−</text>
        <line x1="20" y1="40" x2="36" y2="40" stroke="#f59e0b" stroke-width="2"/>
        <line x1="20" y1="58" x2="36" y2="58" stroke="#64748b" stroke-width="2"/>
        <line x1="78" y1="49" x2="110" y2="49" stroke="#dc2626" stroke-width="2.4"/>
        <text x="94" y="43" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#991b1b">OFF!</text>
        <text x="66" y="25" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#b91c1c">CPU不要アナログ瞬間遮断</text>
        <text x="66" y="79" text-anchor="middle" font-size="5.1" fill="#7f1d1d">I×5mΩ &gt; 120mV → 250μs遮断</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#dc2626">応答 &lt; 0.00025 秒</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7f1d1d">P69 超高速SCD短絡コンパレータ</text>
        <text x="136" y="43" font-size="6.6" fill="#991b1b">・鍵等で端子短絡した瞬間をハード検知</text>
        <text x="136" y="56" font-size="6.6" fill="#991b1b">・250マイクロ秒未満でMOSFETを即ラッチ</text>
        <text x="136" y="69" font-size="6.6" fill="#991b1b">・原因解除まで危険な再通電を完全禁止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7f1d1d">瞬き1回の1000倍の反射神経で異常大電流をぶった切り、バッグ内での短絡発火を防ぐ！</text>
      `);

    case 'bat_pc_flame_retardant_ribs':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <rect x="20" y="22" width="92" height="56" rx="4" fill="none" stroke="#1e293b" stroke-width="2.2"/>
        <path d="M22 34 H32 M22 46 H32 M22 58 H32 M100 34 H110 M100 46 H110 M100 58 H110 M66 24 V76" stroke="#475569" stroke-width="2"/>
        <circle cx="46" cy="50" r="14" fill="#15803d" opacity="0.82"/>
        <circle cx="86" cy="50" r="14" fill="#15803d" opacity="0.82"/>
        <text x="46" y="52" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Cell</text>
        <text x="86" y="52" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Cell</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">UL94 V-0 衝撃吸収トラス格子</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">P70 内壁クラッシュリブ格子</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・7段補強ガセット＋中央砂時計スパイン</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・落下衝撃を分散し18500缶の凹みを防止</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・難燃V-0樹脂＋微細空気層で断熱補助</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e293b">車の衝撃吸収フレームと同じ立体格子が外装裏にあり、落下しても中の電池缶を守り抜く！</text>
      `);

    // =========================================================================
    // P71–P80: 2026 ATOMIC / NANOSCALE ELECTRODE & INTERPHASE PHYSICS
    // =========================================================================
    case 'bat_cvd_sic_porous_scaffold':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <circle cx="42" cy="48" r="18" fill="#1e293b" stroke="#475569" stroke-width="2.2"/>
        <circle cx="42" cy="48" r="10" fill="#f59e0b" stroke="#38bdf8" stroke-width="1.4"/>
        <text x="42" y="50" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">Si</text>
        <circle cx="88" cy="48" r="18" fill="#1e293b" stroke="#475569" stroke-width="2.2"/>
        <circle cx="88" cy="48" r="14.5" fill="#fbbf24" stroke="#38bdf8" stroke-width="1.4"/>
        <text x="88" y="50" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#78350f">Li₁₅Si₄</text>
        <text x="66" y="26" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#b45309">空隙内で300%膨張吸収!</text>
        <text x="42" y="75" text-anchor="middle" font-size="4.8" fill="#475569">放電(空隙あり)</text>
        <text x="88" y="75" text-anchor="middle" font-size="4.8" fill="#b45309">充電(外径不変)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">2026 CVD Si-C · 900 Wh/L</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">P71 CVD多孔質炭素Si-C負極</text>
        <text x="136" y="43" font-size="6.6" fill="#92400e">・シラン気相析出で炭スポンジ内にナノSi</text>
        <text x="136" y="56" font-size="6.6" fill="#92400e">・中の空隙で膨張を吸収し割れ・劣化防止</text>
        <text x="136" y="69" font-size="6.6" fill="#92400e">・ICE&gt;90% ＆ 同サイズで容量+30〜40%</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#78350f">硬い炭の部屋の中にナノシリコンを閉じ込め、割れない大容量を実現した2026年主力負極！</text>
      `);

    case 'bat_single_crystal_nmc_ald':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <polygon points="66,24 94,48 66,72 38,48" fill="#2563eb" stroke="#38bdf8" stroke-width="2.5"/>
        <polygon points="66,20 99,48 66,76 33,48" fill="none" stroke="#eab308" stroke-width="1.6" stroke-dasharray="3 2"/>
        <line x1="46" y1="42" x2="86" y2="42" stroke="#bae6fd" stroke-width="1.2"/>
        <line x1="42" y1="50" x2="90" y2="50" stroke="#bae6fd" stroke-width="1.2"/>
        <line x1="46" y1="58" x2="86" y2="58" stroke="#bae6fd" stroke-width="1.2"/>
        <text x="66" y="50" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">単結晶NMC</text>
        <text x="66" y="81" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#b45309">ALD 1–3nm ガラス保護鎧</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1d4ed8">粒界クラックゼロ · 4.45V</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#1e3a8a">P72 単結晶NMC811＆ALDコート</text>
        <text x="136" y="43" font-size="6.6" fill="#1e40af">・多結晶の粒界割れを「1粒の宝石」で根絶</text>
        <text x="136" y="56" font-size="6.6" fill="#1e40af">・ALD Al2O3/LiNbO3膜で金属溶出を遮断</text>
        <text x="136" y="69" font-size="6.6" fill="#1e40af">・4.4V高電圧でも長寿命・ガス膨張極小</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e3a8a">継ぎ目のない単結晶と原子数層のガラス鎧で、何百回充電しても割れない最強正極粒子！</text>
      `);

    case 'bat_sacrificial_lfo_prelith':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <rect x="22" y="30" width="34" height="38" rx="4" fill="#ea580c"/>
        <text x="39" y="47" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">Li₅FeO₄</text>
        <text x="39" y="58" text-anchor="middle" font-size="4.6" fill="#fef3c7">予備Li弁当</text>
        <path d="M58 40 H80 M58 49 H80 M58 58 H80" stroke="#eab308" stroke-width="2"/>
        <circle cx="70" cy="40" r="3" fill="#facc15"/>
        <circle cx="70" cy="49" r="3" fill="#facc15"/>
        <circle cx="70" cy="58" r="3" fill="#facc15"/>
        <rect x="82" y="30" width="28" height="38" rx="4" fill="#0284c7"/>
        <text x="96" y="48" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">初回SEI</text>
        <text x="96" y="58" text-anchor="middle" font-size="4.6" fill="#e0f2fe">ロス補填!</text>
        <text x="66" y="26" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#c2410c">初回充電 3.5–4.1V で放出</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">2026 LFO · 867 mAh/g</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">P73 犠牲プレリチウム化 LFO</text>
        <text x="136" y="43" font-size="6.6" fill="#9a3412">・初回SEI生成の15%リチウム損失を肩代り</text>
        <text x="136" y="56" font-size="6.6" fill="#9a3412">・2026年Zrドープ＋Al2O3被覆で安定化</text>
        <text x="136" y="69" font-size="6.6" fill="#9a3412">・Si-C電池の実用容量と寿命を+50%延伸</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7c2d12">初回充電の「入学金」を予備リチウム弁当が肩代わりし、電池本来の容量を100%救出！</text>
      `);

    case 'bat_bilayer_lif_sei_film':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <rect x="20" y="60" width="92" height="16" rx="2" fill="#334155"/>
        <text x="66" y="71" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Si-C 負極表面</text>
        <rect x="20" y="44" width="92" height="16" fill="#e2e8f0" stroke="#0284c7"/>
        <text x="66" y="54" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">内層: 無機LiFレンガ壁(電子遮断)</text>
        <rect x="20" y="28" width="92" height="16" rx="3" fill="#06b6d4" opacity="0.82"/>
        <text x="66" y="38" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#fff">外層: 弾性ポリマー(膨張追従)</text>
        <text x="66" y="24" text-anchor="middle" font-size="5.0" fill="#0e7490">Li⁺だけ高速透過 / 電子は完全ブロック</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0e7490">2026 二層人工SEI (10–30nm)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#164e63">P74 二層有機‐無機 LiF SEI膜</text>
        <text x="136" y="43" font-size="6.6" fill="#155e75">・FEC/LiFSI/VCで硬いLiF内層を自己形成</text>
        <text x="136" y="56" font-size="6.6" fill="#155e75">・外層の弾性ポリマーがSi膨張に追従保護</text>
        <text x="136" y="69" font-size="6.6" fill="#155e75">・2026年研究でサイクル寿命2倍以上実証</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#164e63">硬いレンガ壁と伸びるゴム膜の2重防護スーツで、割れずに何年も負極を守り抜く！</text>
      `);

    case 'bat_cathode_cei_passivation':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <circle cx="36" cy="49" r="12" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="36" cy="49" r="5" fill="#eab308"/>
        <text x="36" y="72" text-anchor="middle" font-size="4.8" fill="#0369a1">溶媒コート着用</text>
        <rect x="62" y="24" width="12" height="50" rx="2" fill="#06b6d4"/>
        <text x="68" y="52" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">CEI</text>
        <path d="M48 49 H82" stroke="#eab308" stroke-width="2"/>
        <circle cx="94" cy="49" r="5.5" fill="#eab308"/>
        <text x="94" y="72" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#b45309">コート脱ぎ侵入!</text>
        <text x="66" y="23" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0369a1">LiPO₂F₂ 極低温脱溶媒和</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">2026 実証: −30℃維持92%</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">P75 高電圧CEI＆極低温脱溶媒和</text>
        <text x="136" y="43" font-size="6.6" fill="#0369a1">・イオンの溶媒コートを脱がせる靴べら界面</text>
        <text x="136" y="56" font-size="6.6" fill="#0369a1">・LiPO₂F₂改質で−50℃級極寒でも放電継続</text>
        <text x="136" y="69" font-size="6.6" fill="#0369a1">・4.5V高電圧下の正極酸化ガスも同時遮断</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0c4a6e">雪山で電池が止まる最大原因「溶媒コート渋滞」を解消し、極寒撮影でも粘り強く動く！</text>
      `);

    case 'bat_dry_ptfe_fibril_electrode':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <circle cx="36" cy="40" r="8" fill="#334155"/>
        <circle cx="66" cy="40" r="8" fill="#334155"/>
        <circle cx="96" cy="40" r="8" fill="#334155"/>
        <circle cx="51" cy="60" r="8" fill="#334155"/>
        <circle cx="81" cy="60" r="8" fill="#334155"/>
        <path d="M24 38 Q50 52 108 38 M24 58 Q66 42 108 58 M36 28 Q66 56 96 72" fill="none" stroke="#0ea5e9" stroke-width="1.8"/>
        <text x="66" y="26" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">PTFEクモの巣繊維＋PAA結合</text>
        <text x="66" y="79" text-anchor="middle" font-size="4.9" fill="#334155">有機溶剤NMP・乾燥炉ゼロ!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#475569">2026 DBE 無溶剤ドライ電極</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">P76 ドライ電極PTFEフィブリル</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・乾いた粉をPTFE極細繊維で立体編み込み</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・PAA共バインダー水素結合で密着力を倍増</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・厚膜高密度化＆製造CO₂を劇的に削減</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e293b">有害溶剤も巨大乾燥オーブンも不要！クモの巣状の極細繊維で高密度＆エコに電極成形！</text>
      `);

    case 'bat_trilayer_pp_pe_pp_shutdown':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <rect x="22" y="24" width="88" height="14" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="66" y="33" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#1e293b">PP外層 (165℃保持)＋ベーマイト</text>
        <rect x="22" y="41" width="88" height="16" rx="2" fill="#0ea5e9"/>
        <text x="66" y="51" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">PE中間層 (130℃で溶融閉孔!)</text>
        <rect x="22" y="60" width="88" height="14" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="66" y="69" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#1e293b">PP外層 (熱収縮ほぼゼロ)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">130℃遮断 ⇔ 200℃形状保持</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">P77 3層PP/PE/PPシャットダウン</text>
        <text x="136" y="43" font-size="6.6" fill="#0369a1">・異常130℃で中央PE層が溶けイオン穴を閉鎖</text>
        <text x="136" y="56" font-size="6.6" fill="#0369a1">・外側PP＋ベーマイトは200℃でも形を死守</text>
        <text x="136" y="69" font-size="6.6" fill="#0369a1">・脱水吸熱反応で異常発熱の冷却まで補助</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0c4a6e">危ない温度になると自動で網戸の穴を閉じて電気を止め、外側の鎧でショート爆発を防ぐ！</text>
      `);

    case 'bat_llzo_mgo_dendrite_shield':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <rect x="64" y="22" width="46" height="56" rx="3" fill="#10b981"/>
        <line x1="68" y1="26" x2="106" y2="74" stroke="#f8fafc" stroke-width="2"/>
        <line x1="68" y1="74" x2="106" y2="26" stroke="#f8fafc" stroke-width="2"/>
        <polygon points="22,38 62,42 22,46" fill="#94a3b8"/>
        <polygon points="22,56 62,60 22,64" fill="#94a3b8"/>
        <line x1="62" y1="36" x2="62" y2="68" stroke="#dc2626" stroke-width="2.2"/>
        <text x="41" y="32" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#dc2626">Li針を阻止!</text>
        <text x="87" y="52" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">LLZO+MgO</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#047857">2026 LBNL 鉄筋ガーネット盾</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#064e3b">P78 MgO強化LLZO固体電解質</text>
        <text x="136" y="43" font-size="6.6" fill="#047857">・不燃ガーネット固体結晶にMgO繊維を複合</text>
        <text x="136" y="56" font-size="6.6" fill="#047857">・鉄筋コンクリート構造で亀裂とLi針を阻止</text>
        <text x="136" y="69" font-size="6.6" fill="#047857">・2026年LBNL発表の次世代全固体安全基盤</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#064e3b">急速充電で伸びる金属リチウムのツララを、宝石並みに硬い複合セラミック盾で跳ね返す！</text>
      `);

    case 'bat_calendered_porosity_gradient':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <rect x="20" y="24" width="92" height="24" fill="#38bdf8" opacity="0.35" stroke="#0284c7"/>
        <text x="66" y="38" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#0369a1">表層: 高気孔 35% (急速浸透)</text>
        <rect x="20" y="48" width="92" height="28" fill="#1e293b"/>
        <text x="66" y="65" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#e2e8f0">底層: 高密度 22% (大容量)</text>
        <rect x="34" y="24" width="5" height="48" fill="#06b6d4"/>
        <rect x="64" y="24" width="5" height="48" fill="#06b6d4"/>
        <rect x="94" y="24" width="5" height="48" fill="#06b6d4"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">レーザー縦穴 20–40 μm</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">P79 二重気孔勾配＆レーザー縦穴</text>
        <text x="136" y="43" font-size="6.6" fill="#0369a1">・表層スカスカ＋底層高密度の2段圧延設計</text>
        <text x="136" y="56" font-size="6.6" fill="#0369a1">・レーザー微細縦穴でイオン移動距離を半減</text>
        <text x="136" y="69" font-size="6.6" fill="#0369a1">・大容量と爆速充電のジレンマを同時突破</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0c4a6e">粉をぎっしり詰めながら縦のイオン高速道路を掘り、撮影枚数と急速充電を両立する！</text>
      `);

    case 'bat_hf_scavenger_electrolyte':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <circle cx="42" cy="48" r="16" fill="none" stroke="#eab308" stroke-width="2.6"/>
        <circle cx="42" cy="48" r="7" fill="#dc2626"/>
        <text x="42" y="50" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">HF</text>
        <circle cx="88" cy="48" r="16" fill="none" stroke="#eab308" stroke-width="2.6"/>
        <circle cx="88" cy="48" r="7" fill="#0284c7"/>
        <text x="88" y="50" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">H₂O</text>
        <text x="66" y="25" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#be123c">APTES分子カゴで即捕獲!</text>
        <text x="66" y="76" text-anchor="middle" font-size="5.0" fill="#881337">無害なSiO₂保護膜へ変換</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#be123c">高温ガス膨張＆酸腐食を遮断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#881337">P80 HFスカベンジャー添加剤</text>
        <text x="136" y="43" font-size="6.6" fill="#be123c">・微量水分が生む腐食酸HFを先回り中和</text>
        <text x="136" y="56" font-size="6.6" fill="#be123c">・正極金属溶出とSEI破壊の連鎖を遮断</text>
        <text x="136" y="69" font-size="6.6" fill="#be123c">・夏場ロケ・高温保管での寿命と膨張抑制</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#881337">電解液内の「毒ガスお掃除ロボット」が水分と酸を即捕まえ、高温劣化を食い止める！</text>
      `);

    // =========================================================================
    // P81–P90: CYLINDRICAL 18500 & TABLESS WATCHMAKER MECHANICS
    // =========================================================================
    case 'bat_anode_overhang_margin':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="20" y="24" width="92" height="10" rx="2" fill="#e2e8f0" stroke="#64748b"/>
        <text x="66" y="31" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#334155">セパレーター (最長 +2mm)</text>
        <rect x="26" y="38" width="80" height="14" rx="2" fill="#d97706"/>
        <text x="66" y="47" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">負極 +1.0mm オーバーハング</text>
        <rect x="38" y="56" width="56" height="14" rx="2" fill="#2563eb"/>
        <text x="66" y="65" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">正極 (内側へ安全収容)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">端部Li金属析出を構造阻止</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">P81 負極1.0mmオーバーハング</text>
        <text x="136" y="43" font-size="6.6" fill="#92400e">・負極を正極より上下1mm広く巻く安全余白</text>
        <text x="136" y="56" font-size="6.6" fill="#92400e">・端面の電界集中でLi針が析出するのを防止</text>
        <text x="136" y="69" font-size="6.6" fill="#92400e">・X線CT全数検査で±0.1mm均一性を保証</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#78350f">わざと1ミリはみ出させた「安全ののりしろ」が、端っこからのショート発火を完全に防ぐ！</text>
      `);

    case 'bat_laser_notched_foil_edge':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#f59e0b"/>
        <circle cx="66" cy="49" r="24" fill="none" stroke="#d97706" stroke-width="3.5" stroke-dasharray="6 3"/>
        <circle cx="66" cy="49" r="16" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="5 3"/>
        <circle cx="66" cy="49" r="8" fill="#eab308"/>
        <text x="66" y="22" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#b45309">全周レーザー切欠き折り畳み</text>
        <text x="66" y="81" text-anchor="middle" font-size="4.9" fill="#9a3412">電子移動距離 500mm → 40mm!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">内部抵抗・発熱 −70%削減</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">P82 タブレス・レーザー切欠き箔</text>
        <text x="136" y="43" font-size="6.6" fill="#9a3412">・箔エッジへ可変ピッチレーザー切欠き加工</text>
        <text x="136" y="56" font-size="6.6" fill="#9a3412">・花弁状に折り畳み全周を集電出口に活用</text>
        <text x="136" y="69" font-size="6.6" fill="#9a3412">・大電流8K撮影でも熱くならない次世代構造</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7c2d12">1本タブの大渋滞を「全周100台レジ」に変え、抵抗と発熱を劇的に減らすタブレス核心！</text>
      `);

    case 'bat_electrolyte_capillary_wick':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <rect x="26" y="24" width="80" height="52" rx="4" fill="#0f172a"/>
        <path d="M36 72 C36 52, 54 52, 54 32 M66 72 C66 52, 84 52, 84 32" fill="none" stroke="#22d3ee" stroke-width="2.8"/>
        <circle cx="48" cy="36" r="3" fill="#fff"/>
        <circle cx="78" cy="36" r="3" fill="#fff"/>
        <text x="66" y="23" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0e7490">真空引き→毛細管浸透→気泡排出</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0e7490">超音波透過検査で気泡ゼロ確認</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#164e63">P83 真空注液・毛細管ウェッティング</text>
        <text x="136" y="43" font-size="6.6" fill="#155e75">・多段真空＆加圧で巻芯の奥まで完全含浸</text>
        <text x="136" y="56" font-size="6.6" fill="#155e75">・親液セラミック微細溝がストロー状に吸上</text>
        <text x="136" y="69" font-size="6.6" fill="#155e75">・残留気泡による局所劣化・析出をゼロ化</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#164e63">ぎっちり巻いた電極の芯まで1滴残らず電解液を行き渡らせ、性能ムラを完全追放！</text>
      `);

    case 'bat_al_foil_carbon_primer':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="20" y="56" width="92" height="18" fill="#cbd5e1" stroke="#475569"/>
        <text x="66" y="68" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#1e293b">アルミ集電箔 (12 μm)</text>
        <rect x="20" y="44" width="92" height="12" fill="#1e293b"/>
        <text x="66" y="52" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#facc15">1μm 導電カーボンプライマー</text>
        <rect x="20" y="24" width="92" height="20" fill="#2563eb"/>
        <text x="66" y="36" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">NMC 正極活物質層</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">接触抵抗 −50% ／ 剥離強度2倍</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">P84 アルミ箔1μmカーボン下地</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・絶縁性のアルミ自然酸化膜を導電化突破</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・正極活物質の密着力を劇的に強化</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・4.4V高電圧でのアルミ孔食サビを防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e293b">厚さ1000分の1mmの黒い導電下地が、アルミ箔のサビを防ぎ電気の流れをスムーズに！</text>
      `);

    case 'bat_cu_foil_nodule_anchor':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#c2410c"/>
        <rect x="20" y="58" width="92" height="16" fill="#c2410c"/>
        <text x="66" y="69" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">極薄電解銅箔 (6 μm HTE)</text>
        <circle cx="32" cy="49" r="5" fill="#eab308"/><rect x="30" y="52" width="4" height="6" fill="#ea580c"/>
        <circle cx="54" cy="49" r="5" fill="#eab308"/><rect x="52" y="52" width="4" height="6" fill="#ea580c"/>
        <circle cx="78" cy="49" r="5" fill="#eab308"/><rect x="76" y="52" width="4" height="6" fill="#ea580c"/>
        <circle cx="100" cy="49" r="5" fill="#eab308"/><rect x="98" y="52" width="4" height="6" fill="#ea580c"/>
        <rect x="20" y="24" width="92" height="22" fill="#334155" opacity="0.82"/>
        <text x="66" y="37" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fde047">Si-C 負極を強力アンカー把握</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#9a3412">電析キノコ突起 Rz ≈ 1.8 μm</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#c2410c"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">P85 銅箔マイクロ粗化ノジュール</text>
        <text x="136" y="43" font-size="6.6" fill="#9a3412">・銅箔表面にミクロのキノコ状凹凸を電析</text>
        <text x="136" y="56" font-size="6.6" fill="#9a3412">・充電膨張するSi-C負極の剥離をガッチリ阻止</text>
        <text x="136" y="69" font-size="6.6" fill="#9a3412">・4.5–6μm極薄＆高抗張力&gt;450MPa達成</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7c2d12">銅ホイルに生やしたミクロの「マジックテープ」が、膨らむシリコン負極を離さない！</text>
      `);

    case 'bat_cid_pbt_insulator_ring':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <path d="M22 42 Q66 26 110 42" fill="none" stroke="#475569" stroke-width="3.2"/>
        <rect x="22" y="45" width="22" height="10" rx="2" fill="#f59e0b"/>
        <rect x="88" y="45" width="22" height="10" rx="2" fill="#f59e0b"/>
        <line x1="22" y1="60" x2="54" y2="60" stroke="#64748b" stroke-width="3"/>
        <line x1="78" y1="60" x2="110" y2="60" stroke="#64748b" stroke-width="3"/>
        <line x1="56" y1="54" x2="76" y2="64" stroke="#dc2626" stroke-width="2" stroke-dasharray="2 1.5"/>
        <text x="66" y="25" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#be123c">1.0–1.5 MPa 反転破断!</text>
        <text x="66" y="76" text-anchor="middle" font-size="5.0" fill="#881337">PBT絶縁輪で再接触を永久阻止</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#be123c">レーザー刻み溝 公差±5μm</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#881337">P86 CID PBT絶縁輪＆スコア溝</text>
        <text x="136" y="43" font-size="6.6" fill="#be123c">・上下金属盤の外周をPBT耐熱リングで絶縁</text>
        <text x="136" y="56" font-size="6.6" fill="#be123c">・異常内圧で精密スコア溝が綺麗に破断遮断</text>
        <text x="136" y="69" font-size="6.6" fill="#be123c">・破断後は二度と再通電しない永久安全構造</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#881337">缶詰のプルトップと同じ精密な切れ目と絶縁輪で、異常ガス圧の瞬間に電気を永久遮断！</text>
      `);

    case 'bat_can_ni_gradient_plating':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#475569"/>
        <rect x="20" y="24" width="92" height="12" fill="#cbd5e1" stroke="#64748b"/>
        <text x="66" y="32" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#1e293b">外面 Niめっき 2–3μm (防錆＆溶接)</text>
        <rect x="20" y="38" width="92" height="22" fill="#475569"/>
        <text x="66" y="51" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">深絞り低炭素鋼 (220 μm)</text>
        <rect x="20" y="62" width="92" height="12" fill="#eab308"/>
        <text x="66" y="70" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#422006">内面 Fe-Ni拡散層 (耐電解液)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">プレス伸びでも無剥離の合金鎧</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">P87 18500缶 両面Ni拡散めっき</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・内面Ni拡散層が鉄溶出による劣化を遮断</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・外面Niが汗サビ防止＆スポット溶接を安定</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・耐圧&gt;3MPaの薄肉高剛性プレッシャー缶</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e293b">鉄缶の表裏にニッケルを原子焼き付けし、内側の電解液にも外側の湿気にも負けない！</text>
      `);

    case 'bat_double_seam_crimp_gasket':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <path d="M26 76 V28 H56 V44" fill="none" stroke="#475569" stroke-width="5"/>
        <path d="M36 74 V36 H54 V58 H104" fill="none" stroke="#0ea5e9" stroke-width="5"/>
        <rect x="52" y="42" width="52" height="10" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <text x="80" y="49" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#1e293b">正極キャップ(+)</text>
        <text x="66" y="25" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0369a1">二重巻締め圧縮PPガスケット</text>
        <text x="72" y="72" text-anchor="middle" font-size="5.0" fill="#334155">圧縮率35%で完全絶縁＆気密</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#475569">絶縁 &gt; 100 MΩ ／ 10年無漏液</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">P88 セル缶ダブルクリンプ気密</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・L字PPガスケットを缶縁で35%均一圧縮</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・+キャップと−鋼缶を1mm未満で完全絶縁</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・極薄シーラントで電解液蒸発を10年防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e293b">缶ジュースと同じ折り曲げ密閉に耐熱樹脂を挟み、完全絶縁と10年気密を同時に実現！</text>
      `);

    case 'bat_ultrasonic_imc_weld_zone':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <rect x="22" y="28" width="88" height="16" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="66" y="38" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#1e293b">Al箔 (溶かさず300℃固相)</text>
        <rect x="22" y="45" width="88" height="6" fill="#eab308"/>
        <rect x="22" y="52" width="88" height="16" rx="2" fill="#ea580c"/>
        <text x="66" y="62" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Cu/Niタブ (ナノIMC &lt;1μm)</text>
        <path d="M36 22 L44 26 L52 22 L60 26 L68 22 L76 26 L84 22 L92 26" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <text x="66" y="79" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#854d0e">20–40 kHz 超音波横振動接合</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">接合抵抗 &lt; 0.2 mΩ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#713f12">P89 超音波固相溶接ナノIMC界面</text>
        <text x="136" y="43" font-size="6.6" fill="#854d0e">・1秒4万回の超音波振動で酸化膜を破砕</text>
        <text x="136" y="56" font-size="6.6" fill="#854d0e">・溶かさず結合し脆い厚膜合金の発生を阻止</text>
        <text x="136" y="69" font-size="6.6" fill="#854d0e">・極薄箔を数十枚重ねても0.2秒で最強接合</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#713f12">溶かさないから脆く折れない！超音波振動で原子同士を直接握手させる固相接合の神業！</text>
      `);

    case 'bat_busbar_strain_relief_omega':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <path d="M20 58 H42 C46 58, 44 30, 56 30 C68 30, 66 58, 70 58 C74 58, 72 30, 84 30 C96 30, 94 58, 98 58 H112" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
        <circle cx="28" cy="58" r="3" fill="#eab308"/>
        <circle cx="104" cy="58" r="3" fill="#eab308"/>
        <path d="M52 24 H88" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
        <text x="66" y="22" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">Ωループが伸縮吸収!</text>
        <text x="66" y="75" text-anchor="middle" font-size="5.0" fill="#334155">落下＆熱膨張の溶接応力を逃がす</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#475569">溶接剥離応力 −80% 削減</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">P90 Ω字型バスバー応力逃がし</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・ニッケル配線の途中にバネ状のΩ曲げ成形</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・1.5m落下衝撃でのスポット溶接剥離を防止</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・−20℃〜+60℃の熱膨張疲労断線も吸収</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e293b">ピンと張らず「Ωのたるみ」を設ける職人設計で、落下しても溶接がちぎれない！</text>
      `);

    // =========================================================================
    // P91–P100: 2026 SMART BMS, EIS, USB PD 3.2, GaN & EU BATTERY PASSPORT
    // =========================================================================
    case 'bat_eis_impedance_engine':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <line x1="22" y1="68" x2="110" y2="68" stroke="#64748b" stroke-width="1.2"/>
        <line x1="22" y1="24" x2="22" y2="68" stroke="#64748b" stroke-width="1.2"/>
        <path d="M32 68 A20 20 0 0 1 72 68 L104 36" fill="none" stroke="#06b6d4" stroke-width="2.6"/>
        <circle cx="32" cy="68" r="2.6" fill="#f59e0b"/>
        <circle cx="52" cy="48" r="2.6" fill="#eab308"/>
        <circle cx="94" cy="46" r="2.6" fill="#10b981"/>
        <text x="66" y="25" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0e7490">ナイキスト線図 (0.1Hz–10kHz)</text>
        <text x="52" y="77" text-anchor="middle" font-size="4.8" fill="#155e75">R₀ / SEI半円 / 拡散尾</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0e7490">2026 予測EIS・Li析出予知</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#164e63">P91 オンラインEIS劣化予知IC</text>
        <text x="136" y="43" font-size="6.6" fill="#155e75">・微弱交流波でセル中身をエコー透視診断</text>
        <text x="136" y="56" font-size="6.6" fill="#155e75">・SEI成長・内部温度・Li析出予兆を即検出</text>
        <text x="136" y="69" font-size="6.6" fill="#155e75">・2026年実用化の次世代予測型BMSの頭脳</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#164e63">電圧だけでなく交流インピーダンスの波から電池の健康度と寿命を正確に透視診断！</text>
      `);

    case 'bat_usb_pd32_spr_avs_ctrl':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="22" y="56" width="14" height="16" fill="#0ea5e9"/>
        <rect x="40" y="48" width="14" height="24" fill="#06b6d4"/>
        <rect x="58" y="40" width="14" height="32" fill="#10b981"/>
        <rect x="76" y="32" width="14" height="40" fill="#f59e0b"/>
        <rect x="94" y="26" width="14" height="46" fill="#ea580c"/>
        <text x="66" y="23" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#b45309">9V〜20V を 100mV刻み制御!</text>
        <text x="66" y="81" text-anchor="middle" font-size="4.9" fill="#92400e">CC1/CC2双方向通信で最適電圧要求</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">2026 USB PD 3.2 SPR AVS</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">P92 USB PD 3.2 SPR AVS制御IC</text>
        <text x="136" y="43" font-size="6.6" fill="#92400e">・充電器へ0.1V刻みで欲しい電圧を精密注文</text>
        <text x="136" y="56" font-size="6.6" fill="#92400e">・降圧ロスを減らし充電発熱を5〜8℃低減</text>
        <text x="136" y="69" font-size="6.6" fill="#92400e">・2026年標準の堅牢AVS＋従来PD完全互換</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#78350f">2026年普及のUSB PD 3.2 SPR AVSで充電器と会話しながら、熱を抑えて超急速充電！</text>
      `);

    case 'bat_gan_sync_buckboost_stage':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <rect x="20" y="34" width="32" height="30" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1.6"/>
        <text x="36" y="48" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#34d399">GaN</text>
        <text x="36" y="58" text-anchor="middle" font-size="4.6" fill="#fff">2 MHz</text>
        <path d="M52 49 Q58 38 64 49 Q70 38 76 49 Q82 38 88 49" fill="none" stroke="#ea580c" stroke-width="2.4"/>
        <rect x="88" y="36" width="24" height="26" rx="3" fill="#059669"/>
        <text x="100" y="51" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">8.4V</text>
        <text x="66" y="26" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#047857">5V昇圧〜20V降圧 同期変換</text>
        <text x="66" y="76" text-anchor="middle" font-size="4.9" fill="#065f46">Qrr=0 で小型コイル化</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#047857">変換効率 96〜98% 超低発熱</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#064e3b">P93 GaN 2MHz同期昇降圧段</text>
        <text x="136" y="43" font-size="6.6" fill="#047857">・窒化ガリウムで毎秒200万回超高速切替</text>
        <text x="136" y="56" font-size="6.6" fill="#047857">・コイルを米粒サイズへ小型化しパック内蔵</text>
        <text x="136" y="69" font-size="6.6" fill="#047857">・5V〜20VどんなUSB電源でも高効率充電</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#064e3b">次世代半導体GaNの超高速スイッチングにより、狭い電池内で効率98%の急速充電を実現！</text>
      `);

    case 'bat_active_switched_cap_bal':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <rect x="20" y="34" width="24" height="34" rx="3" fill="#0284c7"/>
        <text x="32" y="50" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">C1</text>
        <text x="32" y="60" text-anchor="middle" font-size="4.6" fill="#fde047">4.18V</text>
        <rect x="54" y="38" width="24" height="24" rx="4" fill="#f59e0b" stroke="#78350f"/>
        <text x="66" y="52" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">C_fly</text>
        <path d="M44 45 H54 M78 45 H88" stroke="#14b8a6" stroke-width="2.2"/>
        <rect x="88" y="34" width="24" height="34" rx="3" fill="#0d9488"/>
        <text x="100" y="50" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">C2</text>
        <text x="100" y="60" text-anchor="middle" font-size="4.6" fill="#e0f2fe">4.12V</text>
        <text x="66" y="25" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#0f766e">熱で捨てず電荷をお引越し!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0f766e">移送効率 &gt; 92% ／ ±3mV均等</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#115e59">P94 無損失アクティブバランサー</text>
        <text x="136" y="43" font-size="6.6" fill="#0f766e">・コンデンサのバケツリレーで電荷を直接移動</text>
        <text x="136" y="56" font-size="6.6" fill="#0f766e">・抵抗廃棄ロスをなくし撮影枚数を最大化</text>
        <text x="136" y="69" font-size="6.6" fill="#0f766e">・充電中も撮影中も2本の電圧を±3mVに維持</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#115e59">余った電気を熱として捨てずにもう1本のセルへお裾分けし、最後の1%まで使い切る！</text>
      `);

    case 'bat_pqc_eui_passport_se':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <rect x="24" y="26" width="84" height="46" rx="4" fill="#1e1b4b" stroke="#eab308" stroke-width="1.8"/>
        <rect x="32" y="34" width="24" height="24" fill="#e9d5ff"/>
        <rect x="35" y="37" width="6" height="6" fill="#4c1d95"/><rect x="46" y="37" width="6" height="6" fill="#4c1d95"/>
        <rect x="35" y="48" width="6" height="6" fill="#4c1d95"/><rect x="46" y="48" width="6" height="6" fill="#4c1d95"/>
        <text x="82" y="44" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#facc15">EU DPP</text>
        <text x="82" y="55" text-anchor="middle" font-size="4.8" fill="#e9d5ff">71項目+PQC</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#7e22ce">EU 2023/1542 (2027施行)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#581c87">P95 EUバッテリーパスポートSE</text>
        <text x="136" y="43" font-size="6.6" fill="#6b21a8">・2026年8月欧州委71項目指針対応デジタル戸籍</text>
        <text x="136" y="56" font-size="6.6" fill="#6b21a8">・CO₂量・再生材率・動的SoHを改ざん不能記録</text>
        <text x="136" y="69" font-size="6.6" fill="#6b21a8">・耐量子暗号＋PUF鍵金庫で偽造品を完全排除</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#581c87">誕生から撮影・リサイクルまでの一生を最強暗号で守る、2026–2027年標準の電子戸籍！</text>
      `);

    case 'bat_inrush_softstart_precharge':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <line x1="22" y1="68" x2="110" y2="68" stroke="#64748b" stroke-width="1.2"/>
        <line x1="22" y1="24" x2="22" y2="68" stroke="#64748b" stroke-width="1.2"/>
        <path d="M24 68 L30 26 L38 68" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
        <path d="M24 68 Q56 44 106 44" fill="none" stroke="#10b981" stroke-width="2.6"/>
        <text x="48" y="30" font-size="4.9" font-weight="bold" fill="#dc2626">突入スパイク60A!</text>
        <text x="74" y="57" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#047857">ソフト起動 3ms</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">接点スパーク黒焦げゼロ!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">P96 突入電流ソフトスタート</text>
        <text x="136" y="43" font-size="6.6" fill="#9a3412">・カメラ装着時の空コンデンサへ優しく充電</text>
        <text x="136" y="56" font-size="6.6" fill="#9a3412">・立上りを3msへ緩め突入電流を1/10以下に</text>
        <text x="136" y="69" font-size="6.6" fill="#9a3412">・金接点の火花摩耗と保護誤作動を完全防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7c2d12">電池を挿した最初の0.003秒だけ電流を優しく絞り、接点の火花劣化と誤遮断を防ぐ！</text>
      `);

    case 'bat_mosfet_chargepump_driver':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <rect x="20" y="42" width="32" height="24" rx="3" fill="#0284c7"/>
        <text x="36" y="56" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">8.4 V</text>
        <path d="M52 54 H66" stroke="#eab308" stroke-width="2"/>
        <rect x="66" y="26" width="44" height="24" rx="3" fill="#dc2626"/>
        <text x="88" y="38" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">+18.4 V</text>
        <text x="88" y="47" text-anchor="middle" font-size="4.4" fill="#fef08a">ゲート昇圧!</text>
        <rect x="66" y="56" width="44" height="16" rx="2" fill="#334155"/>
        <text x="88" y="66" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">N-MOS 全開!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b91c1c">R_DS(on) &lt; 5mΩ ／ 12Vクランプ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7f1d1d">P97 ハイサイド昇圧ゲートドライバ</text>
        <text x="136" y="43" font-size="6.6" fill="#991b1b">・プラス側N-MOSを開くため+18Vへ昇圧</text>
        <text x="136" y="56" font-size="6.6" fill="#991b1b">・遮断時もカメラとのGND基準線を安全維持</text>
        <text x="136" y="69" font-size="6.6" fill="#991b1b">・ツェナー保護でゲート酸化膜の破壊を防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7f1d1d">電池電圧より高い18V押し上げポンプでスイッチを完全全開にし、大電流でも低発熱！</text>
      `);

    case 'bat_low_power_wake_comparator':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <rect x="20" y="26" width="46" height="44" rx="4" fill="#1e3a8a"/>
        <text x="43" y="44" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#93c5fd">SLEEP</text>
        <text x="43" y="56" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">&lt; 1 μA</text>
        <path d="M66 48 H80" stroke="#eab308" stroke-width="2.2"/>
        <rect x="80" y="26" width="32" height="44" rx="4" fill="#10b981"/>
        <text x="96" y="45" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">WAKE!</text>
        <text x="96" y="56" text-anchor="middle" font-size="4.6" fill="#ecfdf5">&lt;10ms</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1d4ed8">1年保管でも消費わずか 0.38%</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#1e3a8a">P98 &lt;1μAディープスリープ番犬</text>
        <text x="136" y="43" font-size="6.6" fill="#1e40af">・保管時はBMSを1μA未満の深い眠りへ移行</text>
        <text x="136" y="56" font-size="6.6" fill="#1e40af">・充電器接続や装着を0.01秒で検知し即復帰</text>
        <text x="136" y="69" font-size="6.6" fill="#1e40af">・長期保管の過放電死と空輸安全を完全両立</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e3a8a">使わない間は100万分の1アンペアで眠り、使う瞬間だけ一瞬で目を覚ます省エネの番犬！</text>
      `);

    case 'bat_zero_ohm_thermal_via_array':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <rect x="28" y="22" width="76" height="12" rx="2" fill="#1e293b"/>
        <text x="66" y="30" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fbbf24">発熱IC (MOSFET / GaN)</text>
        <rect x="20" y="36" width="92" height="28" fill="#15803d"/>
        <rect x="34" y="35" width="6" height="30" fill="#ea580c"/>
        <rect x="52" y="35" width="6" height="30" fill="#ea580c"/>
        <rect x="70" y="35" width="6" height="30" fill="#ea580c"/>
        <rect x="88" y="35" width="6" height="30" fill="#ea580c"/>
        <rect x="20" y="65" width="92" height="10" rx="2" fill="#ea580c"/>
        <text x="66" y="72" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">裏面 3oz重銅ヒートシンク島</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">IC温度 −15〜−25℃ 低減!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">P99 4層重銅サーマルビア格子</text>
        <text x="136" y="43" font-size="6.6" fill="#9a3412">・発熱IC直下にφ0.3mm銅煙突を20本貫通</text>
        <text x="136" y="56" font-size="6.6" fill="#9a3412">・基板の1330倍熱を通す銅で裏側へ即放熱</text>
        <text x="136" y="69" font-size="6.6" fill="#9a3412">・基板NTC(P44)へ正確導熱し安全制御高速化</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7c2d12">基板を貫く数十本の「銅の煙突」が熱を裏の放熱板へ逃がし、8K連写や急速充電を冷やす！</text>
      `);

    case 'bat_blackbox_fault_logger':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <rect x="22" y="26" width="44" height="44" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.6"/>
        <text x="44" y="43" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#facc15">FRAM</text>
        <text x="44" y="54" text-anchor="middle" font-size="4.6" fill="#e2e8f0">μs異常記録</text>
        <path d="M66 48 H78" stroke="#dc2626" stroke-width="2.2"/>
        <rect x="78" y="28" width="32" height="40" rx="4" fill="#dc2626"/>
        <text x="94" y="46" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">PFロック</text>
        <text x="94" y="57" text-anchor="middle" font-size="4.4" fill="#fef08a">ヒューズ断</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#991b1b">最終フェイルセーフ永久遮断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7f1d1d">P100 ブラックボックス＆PF制御</text>
        <text x="136" y="43" font-size="6.6" fill="#991b1b">・水没/過熱/故障の瞬間をFRAMへ即永久記録</text>
        <text x="136" y="56" font-size="6.6" fill="#991b1b">・致命異常時はSCPヒューズ(P13)を物理溶断</text>
        <text x="136" y="69" font-size="6.6" fill="#991b1b">・電池100部品のラストを守る安全の最終砦</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7f1d1d">飛行機のフライトレコーダーと同じ仕組みで異常を記録し、危険セルを永久ロックする！</text>
      `);

    default:
      return null;
  }
}
