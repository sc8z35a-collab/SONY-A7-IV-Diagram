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
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#713f12">P65 カメラ側 4極硬質金ブレード端子 ＆ ばね押出イジェクタプランジャ</text>
        <!-- Left cutaway: 4 gold mating blades + spring ejector plunger -->
        <rect x="14" y="24" width="152" height="66" rx="4" fill="#fff" stroke="#eab308"/>
        <rect x="22" y="29" width="136" height="12" rx="2" fill="#334155"/>
        <text x="90" y="37.5" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">カメラ電池室 天井コネクタ基板</text>
        <!-- 4 gold blades -->
        <rect x="32" y="41" width="9" height="24" rx="1" fill="#eab308" stroke="#a16207"/>
        <rect x="52" y="41" width="9" height="24" rx="1" fill="#eab308" stroke="#a16207"/>
        <rect x="72" y="41" width="9" height="24" rx="1" fill="#eab308" stroke="#a16207"/>
        <rect x="92" y="41" width="9" height="24" rx="1" fill="#eab308" stroke="#a16207"/>
        <text x="36.5" y="74" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#854d0e">+</text>
        <text x="56.5" y="74" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#854d0e">T</text>
        <text x="76.5" y="74" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#854d0e">S</text>
        <text x="96.5" y="74" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#854d0e">−</text>
        <!-- Spring ejector pin cleanly separated on right -->
        <rect x="122" y="41" width="14" height="28" rx="2" fill="#94a3b8" stroke="#475569"/>
        <path d="M125 47 H133 M125 53 H133 M125 59 H133" stroke="#1e293b" stroke-width="1.4"/>
        <text x="129" y="78" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#334155">ばね押出</text>
        <text x="66" y="85" text-anchor="middle" font-size="5.0" fill="#a16207">硬質金4極ブレード (Rc &lt;10mΩ)</text>
        <!-- Right detail specs -->
        <rect x="174" y="24" width="132" height="66" rx="4" fill="#fef3c7" stroke="#ca8a04"/>
        <text x="240" y="37" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#713f12">片手交換 ＆ 振動断線ゼロ</text>
        <text x="240" y="51" text-anchor="middle" font-size="5.3" fill="#854d0e">・常時 2.5N 予圧で連写振動に強い</text>
        <text x="240" y="64" text-anchor="middle" font-size="5.3" fill="#854d0e">・ロック解除でポンッと電池を押し出し</text>
        <text x="240" y="78" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#b45309">・8A大電流も電圧降下ゼロ通電</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#713f12">カメラ電池室の奥で待つ4本の金ブレードとバネ押しピンが、確実通電と片手交換を実現！</text>
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
        <line x1="48" y1="39" x2="84" y2="39" stroke="#bae6fd" stroke-width="1.1"/>
        <line x1="48" y1="59" x2="84" y2="59" stroke="#bae6fd" stroke-width="1.1"/>
        <rect x="44" y="42" width="44" height="12" rx="3" fill="#1e3a8a"/>
        <text x="66" y="50.5" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fff">単結晶NMC</text>
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
        <rect x="61" y="27" width="14" height="44" rx="2.5" fill="#06b6d4"/>
        <path d="M48 49 H61 M75 49 H88" stroke="#eab308" stroke-width="2"/>
        <text x="68" y="51.5" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">CEI</text>
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
        <rect x="67" y="44" width="40" height="12" rx="2" fill="#065f46"/>
        <text x="87" y="52" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">LLZO+MgO</text>
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
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.2" font-weight="bold" fill="#0c4a6e">P79 二重気孔勾配カレンダリング ＆ レーザー微細縦穴イオン高速道</text>
        <!-- Left detailed cutaway with vertical channels cleanly behind badges -->
        <rect x="14" y="24" width="166" height="66" rx="4" fill="#fff" stroke="#38bdf8"/>
        <rect x="22" y="28" width="150" height="28" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="22" y="56" width="150" height="30" fill="#1e293b"/>
        <!-- 4 laser vertical micro-channels (20-40 um) -->
        <rect x="38" y="28" width="7" height="52" fill="#06b6d4"/>
        <rect x="74" y="28" width="7" height="52" fill="#06b6d4"/>
        <rect x="110" y="28" width="7" height="52" fill="#06b6d4"/>
        <rect x="146" y="28" width="7" height="52" fill="#06b6d4"/>
        <!-- Crisp readable pill labels on top of channels -->
        <rect x="46" y="34" width="102" height="14" rx="3" fill="#ffffff" opacity="0.92" stroke="#0284c7"/>
        <text x="97" y="43.5" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0369a1">表層：高気孔35% (急速浸透)</text>
        <rect x="46" y="63" width="102" height="14" rx="3" fill="#0f172a" opacity="0.92" stroke="#38bdf8"/>
        <text x="97" y="72.5" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#e2e8f0">底層：高密度22% (大容量充填)</text>
        <!-- Right benefit breakdown -->
        <rect x="188" y="24" width="118" height="66" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="247" y="37" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0c4a6e">レーザー縦穴 20–40 μm</text>
        <text x="247" y="52" text-anchor="middle" font-size="5.3" fill="#0369a1">・イオン移動距離を半分に短縮</text>
        <text x="247" y="65" text-anchor="middle" font-size="5.3" fill="#0369a1">・底層まで電解液が一瞬で浸透</text>
        <text x="247" y="79" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0284c7">・大容量×爆速充電を同時突破!</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.4" fill="#0c4a6e">粉をぎっしり詰めながらレーザーで縦のイオン高速道路を掘り、撮影枚数と急速充電を両立！</text>
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
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#f8fafc" stroke="#64748b" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#1e293b"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#e2e8f0">P88 18500セル缶 ダブルクリンプ気密＆圧縮PPガスケット</text>
        <rect x="16" y="29" width="166" height="66" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <path d="M28 90 V42 H74 V56" fill="none" stroke="#475569" stroke-width="7" stroke-linejoin="round"/>
        <path d="M40 90 V49 H70 V70 H170" fill="none" stroke="#0ea5e9" stroke-width="6.5" stroke-linejoin="round"/>
        <rect x="66" y="54" width="98" height="12" rx="2.5" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
        <text x="115" y="62.5" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0f172a">正極キャップ (+) / CID</text>
        <text x="116" y="40" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#0369a1">二重巻締め圧縮PPガスケット</text>
        <text x="28" y="36" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#475569">−鋼缶</text>
        <text x="112" y="84" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0284c7">圧縮率 35% 均一シール (完全絶縁!)</text>
        <rect x="190" y="29" width="114" height="66" rx="4" fill="#f1f5f9" stroke="#94a3b8"/>
        <text x="247" y="41" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0f172a">ダブルクリンプ 3大性能</text>
        <rect x="196" y="46" width="102" height="13" rx="2.5" fill="#e0f2fe"/>
        <text x="247" y="55" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0369a1">絶縁抵抗 &gt; 100 MΩ</text>
        <rect x="196" y="62" width="102" height="13" rx="2.5" fill="#dcfce7"/>
        <text x="247" y="71" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#166534">1mm未満で + / − 完全分離</text>
        <rect x="196" y="78" width="102" height="13" rx="2.5" fill="#fef3c7"/>
        <text x="247" y="87" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#92400e">10年間 電解液蒸発ゼロ!</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#1e293b">缶ジュースと同じ二重折り曲げ密閉に耐熱PP樹脂を挟み、絶縁と10年気密を同時に実現！</text>
      `);

    case 'bat_ultrasonic_imc_weld_zone':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#713f12"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fef08a">P89 超音波固相溶接 ナノIMC界面 (20–40 kHz 横振動)</text>
        <rect x="16" y="29" width="174" height="66" rx="4" fill="#ffffff" stroke="#fde047"/>
        <path d="M58 34 L66 38 L74 34 L82 38 L90 34 L98 38 L106 34 L114 38 L122 34 L130 38 L138 34 L146 38" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <text x="103" y="46" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#dc2626">← 超音波ホーン 毎秒4万回横振動 →</text>
        <rect x="26" y="50" width="154" height="13" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="103" y="59" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0f172a">極薄 Al 集電箔 ×20層 (300℃固相・非溶融)</text>
        <rect x="26" y="64" width="154" height="7" fill="#eab308"/>
        <text x="103" y="69.6" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#422006">ナノ金属間化合物層 (IMC &lt; 1 μm)</text>
        <rect x="26" y="72" width="154" height="14" rx="2" fill="#ea580c"/>
        <text x="103" y="81.5" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#ffffff">Cu / Ni リードタブ (酸化膜を摩擦破砕!)</text>
        <rect x="198" y="29" width="106" height="66" rx="4" fill="#fef9c3" stroke="#ca8a04"/>
        <text x="251" y="42" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#713f12">溶かさない接合の強み</text>
        <text x="251" y="55" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#15803d">接合抵抗 &lt; 0.2 mΩ</text>
        <text x="251" y="68" text-anchor="middle" font-size="5.3" fill="#854d0e">脆い厚膜合金の発生ゼロ</text>
        <text x="251" y="80" text-anchor="middle" font-size="5.3" fill="#854d0e">0.2秒で数十枚を最強密着</text>
        <text x="251" y="90" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#b45309">8K大電流でも超低発熱!</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#713f12">溶かさないから脆く折れない！超音波振動で原子同士を直接握手させる固相接合の神業！</text>
      `);

    case 'bat_busbar_strain_relief_omega':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#f1f5f9" stroke="#64748b" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#0f172a"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#e2e8f0">P90 Ω字型ニッケルバスバー 応力逃がし (落下＆熱膨張吸収)</text>
        <rect x="16" y="29" width="186" height="66" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="109" y="40" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0369a1">← Ωバネループが衝撃＆伸縮を吸収 →</text>
        <line x1="68" y1="45" x2="150" y2="45" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="3 2"/>
        <path d="M26 74 H58 C66 74, 62 50, 82 50 C102 50, 98 74, 108 74 C118 74, 114 50, 134 50 C154 50, 150 74, 158 74 H192" fill="none" stroke="#475569" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="38" cy="74" r="4.2" fill="#eab308" stroke="#854d0e" stroke-width="1"/>
        <circle cx="180" cy="74" r="4.2" fill="#eab308" stroke="#854d0e" stroke-width="1"/>
        <text x="38" y="88" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#854d0e">セル溶接点</text>
        <text x="109" y="88" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#334155">たるみバネ区間</text>
        <text x="180" y="88" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#854d0e">基板溶接点</text>
        <rect x="208" y="29" width="96" height="66" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="256" y="43" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0c4a6e">応力低減効果</text>
        <text x="256" y="59" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#0284c7">−80%</text>
        <text x="256" y="72" text-anchor="middle" font-size="5.2" fill="#0369a1">1.5m落下でも剥離なし</text>
        <text x="256" y="85" text-anchor="middle" font-size="5.2" fill="#0369a1">−20〜+60℃熱疲労吸収</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#1e293b">ピンと張らず「Ωのたるみ」を設ける職人設計で、落下しても溶接がちぎれない！</text>
      `);

    // =========================================================================
    // P91–P100: 2026 SMART BMS, EIS, USB PD 3.2, GaN & EU BATTERY PASSPORT
    // =========================================================================
    case 'bat_eis_impedance_engine':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#ecfeff" stroke="#0891b2" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#164e63"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#67e8f9">P91 オンラインEIS交流インピーダンス劣化予知 (ナイキスト線図)</text>
        <rect x="16" y="29" width="180" height="66" rx="4" fill="#ffffff" stroke="#a5f3fc"/>
        <line x1="34" y1="81" x2="188" y2="81" stroke="#64748b" stroke-width="1.2"/>
        <line x1="34" y1="34" x2="34" y2="81" stroke="#64748b" stroke-width="1.2"/>
        <text x="25" y="42" text-anchor="middle" font-size="4.8" fill="#475569">-Im</text>
        <text x="176" y="90" text-anchor="middle" font-size="4.8" fill="#475569">Re(Z) Ω</text>
        <path d="M52 81 A22 22 0 0 1 96 81 L138 42" fill="none" stroke="#06b6d4" stroke-width="2.4"/>
        <path d="M68 81 A28 28 0 0 1 124 81 L168 40" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 2"/>
        <circle cx="52" cy="81" r="2.8" fill="#f59e0b"/>
        <circle cx="74" cy="59" r="2.8" fill="#0891b2"/>
        <circle cx="128" cy="51" r="2.8" fill="#10b981"/>
        <text x="52" y="91" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#b45309">R₀純抵抗</text>
        <text x="76" y="49" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0e7490">SEI半円</text>
        <text x="118" y="41" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#047857">拡散尾</text>
        <text x="163" y="64" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#dc2626">劣化で拡大!</text>
        <rect x="202" y="29" width="102" height="66" rx="4" fill="#cffafe" stroke="#06b6d4"/>
        <text x="253" y="42" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#164e63">0.1Hz〜10kHz 透視</text>
        <text x="253" y="55" text-anchor="middle" font-size="5.3" fill="#155e75">・微弱交流で内部をエコー診断</text>
        <text x="253" y="68" text-anchor="middle" font-size="5.3" fill="#155e75">・SEI成長と内部温度を分離計測</text>
        <text x="253" y="81" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#b91c1c">・危険なLi析出を事前予知!</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#164e63">電圧だけでなく交流波の反応曲線から、電池の健康度と寿命をレントゲン透視診断！</text>
      `);

    case 'bat_usb_pd32_spr_avs_ctrl':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#fffbeb" stroke="#d97706" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#78350f"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fde68a">P92 2026標準 USB PD 3.2 SPR AVS (100 mV 精密電圧交渉)</text>
        <rect x="16" y="29" width="176" height="66" rx="4" fill="#ffffff" stroke="#fde68a"/>
        <line x1="30" y1="82" x2="184" y2="82" stroke="#64748b" stroke-width="1.1"/>
        <rect x="36" y="66" width="22" height="16" fill="#0ea5e9"/>
        <rect x="64" y="58" width="22" height="24" fill="#06b6d4"/>
        <rect x="92" y="50" width="22" height="32" fill="#10b981"/>
        <rect x="120" y="43" width="22" height="39" fill="#f59e0b"/>
        <rect x="148" y="36" width="22" height="46" fill="#ea580c"/>
        <line x1="34" y1="36" x2="174" y2="36" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3 2"/>
        <text x="84" y="34" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#dc2626">従来固定15V/20V (差が熱ロス)</text>
        <text x="47" y="91" text-anchor="middle" font-size="4.8" fill="#0369a1">9.0V</text>
        <text x="75" y="91" text-anchor="middle" font-size="4.8" fill="#0e7490">11.5V</text>
        <text x="103" y="91" text-anchor="middle" font-size="4.8" fill="#047857">14.0V</text>
        <text x="131" y="91" text-anchor="middle" font-size="4.8" fill="#b45309">17.2V</text>
        <text x="159" y="91" text-anchor="middle" font-size="4.8" fill="#c2410c">20.0V</text>
        <rect x="198" y="29" width="106" height="66" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
        <text x="251" y="42" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#92400e">0.1V刻みリアルタイム注文</text>
        <text x="251" y="55" text-anchor="middle" font-size="5.3" fill="#78350f">CC1/CC2双方向通信で交渉</text>
        <text x="251" y="69" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#15803d">充電発熱 −5〜8℃!</text>
        <text x="251" y="83" text-anchor="middle" font-size="5.2" fill="#92400e">従来PD/PPSと完全互換</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#78350f">2026年普及のUSB PD 3.2 SPR AVSで充電器へ欲しい電圧を精密注文し、熱を抑えて急速充電！</text>
      `);

    case 'bat_gan_sync_buckboost_stage':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#ecfdf5" stroke="#059669" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#064e3b"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#6ee7b7">P93 窒化ガリウム (GaN) 2 MHz 同期昇降圧コンバータ</text>
        <rect x="18" y="36" width="52" height="44" rx="4" fill="#0284c7"/>
        <text x="44" y="53" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#ffffff">USB-C入力</text>
        <text x="44" y="66" text-anchor="middle" font-size="5.4" fill="#e0f2fe">5V〜20V</text>
        <path d="M70 58 H88" stroke="#059669" stroke-width="2.2"/>
        <rect x="88" y="34" width="66" height="48" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.8"/>
        <text x="121" y="50" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#34d399">GaN FET</text>
        <text x="121" y="62" text-anchor="middle" font-size="5.4" fill="#ffffff">毎秒200万回切替</text>
        <text x="121" y="74" text-anchor="middle" font-size="5.0" fill="#fde047">逆回復損 Qrr = 0</text>
        <path d="M154 58 Q161 44 168 58 Q175 44 182 58 Q189 44 196 58 Q203 44 210 58" fill="none" stroke="#ea580c" stroke-width="2.6"/>
        <text x="182" y="76" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#c2410c">米粒大コイル</text>
        <rect x="214" y="36" width="88" height="44" rx="4" fill="#059669"/>
        <text x="258" y="51" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#ffffff">2Sセル 8.4 V充電</text>
        <text x="258" y="65" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fef08a">変換効率 96–98%</text>
        <text x="160" y="92" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#047857">5Vモバイル電源なら昇圧・20V充電器なら降圧へ自動切替</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#064e3b">次世代半導体GaNの超高速スイッチングにより、狭い電池内で効率98%の急速充電を実現！</text>
      `);

    case 'bat_active_switched_cap_bal':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#115e59"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#99f6e4">P94 無損失スイッチドキャパシタ・アクティブバランサー</text>
        <rect x="20" y="34" width="64" height="50" rx="5" fill="#0284c7"/>
        <text x="52" y="51" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#ffffff">Cell 1</text>
        <text x="52" y="64" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fde047">4.18 V</text>
        <text x="52" y="76" text-anchor="middle" font-size="5.0" fill="#e0f2fe">(少し多い)</text>
        <path d="M84 52 H118" stroke="#14b8a6" stroke-width="2.5"/>
        <polygon points="116,48.5 123,52 116,55.5" fill="#14b8a6"/>
        <rect x="124" y="38" width="72" height="36" rx="5" fill="#f59e0b" stroke="#78350f" stroke-width="1.4"/>
        <text x="160" y="53" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#ffffff">C_fly コンデンサ</text>
        <text x="160" y="66" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fef3c7">電荷バケツリレー</text>
        <path d="M196 52 H230" stroke="#14b8a6" stroke-width="2.5"/>
        <polygon points="228,48.5 235,52 228,55.5" fill="#14b8a6"/>
        <rect x="236" y="34" width="64" height="50" rx="5" fill="#0d9488"/>
        <text x="268" y="51" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#ffffff">Cell 2</text>
        <text x="268" y="64" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#e0f2fe">4.12 V</text>
        <text x="268" y="76" text-anchor="middle" font-size="5.0" fill="#ccfbf1">(お引越し先!)</text>
        <rect x="92" y="80" width="136" height="14" rx="3" fill="#ccfbf1" stroke="#0d9488"/>
        <text x="160" y="89.5" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0f766e">熱廃棄ゼロ・移送効率 &gt;92% ／ ±3 mV均等</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#115e59">余った電気を抵抗で熱にして捨てずにもう1本のセルへお裾分けし、最後の1%まで使い切る！</text>
      `);

    case 'bat_pqc_eui_passport_se':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#faf5ff" stroke="#9333ea" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#581c87"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#f3e8ff">P95 EUバッテリーパスポート (2023/1542) ＆ 耐量子暗号SE</text>
        <rect x="18" y="30" width="68" height="64" rx="4" fill="#1e1b4b" stroke="#eab308" stroke-width="1.5"/>
        <rect x="29" y="36" width="46" height="36" rx="2" fill="#f3e8ff"/>
        <rect x="33" y="40" width="11" height="11" fill="#4c1d95"/><rect x="60" y="40" width="11" height="11" fill="#4c1d95"/>
        <rect x="33" y="57" width="11" height="11" fill="#4c1d95"/><rect x="48" y="49" width="8" height="8" fill="#7e22ce"/>
        <rect x="60" y="57" width="11" height="11" fill="#4c1d95"/>
        <text x="52" y="83" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#facc15">EU DPP QR</text>
        <text x="52" y="91" text-anchor="middle" font-size="4.6" fill="#c4b5fd">71項目指針対応</text>
        <rect x="94" y="30" width="120" height="64" rx="4" fill="#ffffff" stroke="#d8b4fe"/>
        <text x="154" y="42" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#6b21a8">改ざん不能デジタル戸籍</text>
        <text x="102" y="55" font-size="5.3" fill="#4c1d95">① 製造時CO₂排出量・再生Co/Li率</text>
        <text x="102" y="68" font-size="5.3" fill="#4c1d95">② 動的SoH・充放電回数・異常歴</text>
        <text x="102" y="81" font-size="5.3" fill="#4c1d95">③ 安全分解・リサイクル資源手順</text>
        <rect x="220" y="30" width="84" height="64" rx="4" fill="#fef3c7" stroke="#ca8a04"/>
        <text x="262" y="45" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#854d0e">最強暗号金庫</text>
        <text x="262" y="59" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#7e22ce">PQC 耐量子署名</text>
        <text x="262" y="72" text-anchor="middle" font-size="5.3" fill="#92400e">PUFチップ指紋鍵</text>
        <text x="262" y="85" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#b91c1c">偽造パック完全排除</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#581c87">誕生から撮影・リサイクルまでの一生を耐量子暗号で守る、2026–2027年標準の電子戸籍！</text>
      `);

    case 'bat_inrush_softstart_precharge':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#fff7ed" stroke="#f97316" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#7c2d12"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#ffedd5">P96 突入電流ソフトスタート・プリチャージ (3 ms 緩起動)</text>
        <rect x="16" y="29" width="182" height="66" rx="4" fill="#ffffff" stroke="#fdba74"/>
        <line x1="34" y1="82" x2="190" y2="82" stroke="#64748b" stroke-width="1.1"/>
        <line x1="34" y1="34" x2="34" y2="82" stroke="#64748b" stroke-width="1.1"/>
        <text x="25" y="42" text-anchor="middle" font-size="4.8" fill="#475569">電流A</text>
        <text x="176" y="91" text-anchor="middle" font-size="4.8" fill="#475569">時間 (ms)</text>
        <path d="M36 82 L48 36 L60 82" fill="none" stroke="#ef4444" stroke-width="1.7" stroke-dasharray="3 2"/>
        <text x="96" y="43" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#dc2626">無対策: 60A突入スパイク (火花!)</text>
        <path d="M36 82 Q72 58 182 58" fill="none" stroke="#10b981" stroke-width="2.6"/>
        <text x="128" y="72" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#047857">ソフト起動 3 ms (&lt; 5A安全充電)</text>
        <rect x="204" y="29" width="100" height="66" rx="4" fill="#ffedd5" stroke="#ea580c"/>
        <text x="254" y="43" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#9a3412">装着の瞬間を保護</text>
        <text x="254" y="57" text-anchor="middle" font-size="5.3" fill="#7c2d12">・突入電流を 1/10以下へ</text>
        <text x="254" y="70" text-anchor="middle" font-size="5.3" fill="#7c2d12">・金接点の黒焦げ摩耗ゼロ</text>
        <text x="254" y="83" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#c2410c">・保護ICの誤遮断を防止!</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#7c2d12">電池を挿した最初の0.003秒だけ電流を優しく絞り、接点の火花劣化と誤遮断を防ぐ！</text>
      `);

    case 'bat_mosfet_chargepump_driver':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#fef2f2" stroke="#ef4444" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#7f1d1d"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fecaca">P97 ハイサイド N-MOS 昇圧チャージポンプ・ゲートドライバ</text>
        <rect x="18" y="40" width="60" height="40" rx="4" fill="#0284c7"/>
        <text x="48" y="57" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#ffffff">電池電圧</text>
        <text x="48" y="70" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fde047">+8.4 V</text>
        <path d="M78 60 H98" stroke="#eab308" stroke-width="2.2"/>
        <rect x="98" y="34" width="84" height="52" rx="4" fill="#dc2626"/>
        <text x="140" y="49" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fef08a">チャージポンプ昇圧</text>
        <text x="140" y="64" text-anchor="middle" font-size="8.0" font-weight="bold" fill="#ffffff">+18.4 V</text>
        <text x="140" y="77" text-anchor="middle" font-size="5.0" fill="#fee2e2">12Vツェナー酸化膜保護</text>
        <path d="M182 60 H202" stroke="#dc2626" stroke-width="2.2"/>
        <rect x="202" y="34" width="100" height="52" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="1.6"/>
        <text x="252" y="49" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#4ade80">ハイサイド N-MOS 全開</text>
        <text x="252" y="63" text-anchor="middle" font-size="5.6" fill="#ffffff">R_DS(on) &lt; 5 mΩ</text>
        <text x="252" y="76" text-anchor="middle" font-size="5.1" fill="#93c5fd">遮断時もGND通信線維持</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#7f1d1d">電池電圧より高い18V押し上げポンプで＋側スイッチを完全全開にし、大電流でも低発熱！</text>
      `);

    case 'bat_low_power_wake_comparator':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#1e3a8a"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#bfdbfe">P98 &lt; 1 μA 超省電力ディープスリープ ＆ 10 ms 瞬時復帰番犬</text>
        <rect x="18" y="32" width="108" height="58" rx="5" fill="#1e3a8a"/>
        <text x="72" y="48" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#93c5fd">DEEP SLEEP</text>
        <text x="72" y="64" text-anchor="middle" font-size="8.0" font-weight="bold" fill="#ffffff">&lt; 1 μA</text>
        <text x="72" y="79" text-anchor="middle" font-size="5.2" fill="#dbeafe">1年保管でも消費 0.38%!</text>
        <path d="M126 61 H176" stroke="#eab308" stroke-width="2.6"/>
        <polygon points="174,57 182,61 174,65" fill="#eab308"/>
        <rect x="131" y="34" width="44" height="20" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="153" y="43" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#92400e">装着/充電</text>
        <text x="153" y="51" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#b45309">即検知!</text>
        <text x="153" y="75" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#1d4ed8">&lt; 10 ms</text>
        <rect x="184" y="32" width="118" height="58" rx="5" fill="#10b981"/>
        <text x="243" y="48" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#ffffff">ACTIVE WAKE!</text>
        <text x="243" y="63" text-anchor="middle" font-size="5.6" fill="#ecfdf5">全保護・認証・残量通信</text>
        <text x="243" y="77" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fef08a">空輸安全＆長期保管両立</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#1e3a8a">使わない間は100万分の1アンペアで眠り、使う瞬間だけ一瞬で目を覚ます省エネの番犬！</text>
      `);

    case 'bat_zero_ohm_thermal_via_array':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#fff7ed" stroke="#ea580c" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#7c2d12"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fed7aa">P99 4層重銅基板 サーマルビア放熱格子 (φ0.3 mm 銅の煙突 × 20本)</text>
        <rect x="16" y="29" width="184" height="66" rx="4" fill="#ffffff" stroke="#fdba74"/>
        <rect x="52" y="33" width="112" height="13" rx="2" fill="#1e293b"/>
        <text x="108" y="42" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fbbf24">発熱IC (保護MOSFET / GaN)</text>
        <rect x="24" y="48" width="168" height="28" fill="#15803d"/>
        <rect x="58" y="46" width="7" height="32" fill="#ea580c"/>
        <rect x="78" y="46" width="7" height="32" fill="#ea580c"/>
        <rect x="98" y="46" width="7" height="32" fill="#ea580c"/>
        <rect x="118" y="46" width="7" height="32" fill="#ea580c"/>
        <rect x="138" y="46" width="7" height="32" fill="#ea580c"/>
        <rect x="158" y="46" width="7" height="32" fill="#ea580c"/>
        <text x="40" y="64" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#dcfce7">4層FR-4</text>
        <rect x="24" y="77" width="168" height="13" rx="2" fill="#ea580c"/>
        <text x="108" y="86" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#ffffff">裏面 3 oz 重銅ヒートシンク放熱板 (NTCへ導熱)</text>
        <rect x="206" y="29" width="98" height="66" rx="4" fill="#ffedd5" stroke="#ea580c"/>
        <text x="255" y="43" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#9a3412">熱伝導 1330倍!</text>
        <text x="255" y="59" text-anchor="middle" font-size="7.6" font-weight="bold" fill="#dc2626">−15〜25℃</text>
        <text x="255" y="73" text-anchor="middle" font-size="5.2" fill="#7c2d12">IC温度を劇的低減</text>
        <text x="255" y="85" text-anchor="middle" font-size="5.1" fill="#9a3412">8K連写・急速充電対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#7c2d12">基板を貫く数十本の「銅の煙突」が熱を裏の放熱板へ逃がし、8K連写や急速充電を冷やす！</text>
      `);

    case 'bat_blackbox_fault_logger':
      return wrapSvg(`
        <rect x="8" y="6" width="304" height="106" rx="7" fill="#fef2f2" stroke="#dc2626" stroke-width="1.2"/>
        <rect x="14" y="10" width="292" height="15" rx="3.5" fill="#7f1d1d"/>
        <text x="160" y="20" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fecaca">P100 不揮発FRAM ブラックボックス記録 ＆ PF永久安全ロック</text>
        <rect x="18" y="34" width="76" height="54" rx="4" fill="#fee2e2" stroke="#ef4444"/>
        <text x="56" y="49" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#991b1b">致命異常検知</text>
        <text x="56" y="62" text-anchor="middle" font-size="5.2" fill="#7f1d1d">・水没 / 内部短絡</text>
        <text x="56" y="74" text-anchor="middle" font-size="5.2" fill="#7f1d1d">・過熱 / FET溶着</text>
        <path d="M94 61 H112" stroke="#dc2626" stroke-width="2.2"/>
        <rect x="112" y="34" width="84" height="54" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.6"/>
        <text x="154" y="49" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#facc15">不揮発 FRAM</text>
        <text x="154" y="63" text-anchor="middle" font-size="5.4" fill="#e2e8f0">μs単位で原因記録</text>
        <text x="154" y="76" text-anchor="middle" font-size="5.1" fill="#38bdf8">電源喪失でも消えない</text>
        <path d="M196 61 H214" stroke="#dc2626" stroke-width="2.2"/>
        <rect x="214" y="34" width="88" height="54" rx="4" fill="#dc2626"/>
        <text x="258" y="49" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#ffffff">PF 永久ロック</text>
        <text x="258" y="63" text-anchor="middle" font-size="5.4" fill="#fef08a">SCPヒューズ物理溶断</text>
        <text x="258" y="76" text-anchor="middle" font-size="5.1" fill="#fee2e2">危険セルの再使用を完封</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.1" fill="#7f1d1d">飛行機のフライトレコーダーと同じ仕組みで異常を記録し、危険セルを永久ロックする！</text>
      `);

    default:
      return null;
  }
}
