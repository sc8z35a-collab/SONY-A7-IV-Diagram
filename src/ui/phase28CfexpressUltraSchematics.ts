import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 28 Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (+40 diagrams):
 *   - 10 Dedicated Schematics for C61–C70 (upgrading from recycled diagrams!)
 *   - 30 Brand-New Ultra-Microscopic & 2026 Schematics for C71–C100 (100/100 unique CFexpress SVGs!)
 * Every text element is strictly calibrated inside x ∈ [6, 310], y ∈ [8, 114].
 */
export function renderPhase28CfexpressUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // C61–C70 Dedicated Bespoke Technical Schematics (10)
    // =========================================================================
    case 'cfe_pcie_gen4_serdes_phy':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <path d="M20 56 Q34 40 46 54 Q58 62 66 50" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="2 2"/>
        <rect x="66" y="34" width="22" height="32" rx="3" fill="#2563eb"/>
        <text x="77" y="48" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">CTLE</text>
        <text x="77" y="58" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fde047">+DFE</text>
        <path d="M90 58 L95 36 L101 36 L105 58 L112 36" fill="none" stroke="#10b981" stroke-width="2.1"/>
        <text x="43" y="28" text-anchor="middle" font-size="5.3" fill="#dc2626">潰れた波</text>
        <text x="102" y="28" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#047857">復元!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1d4ed8">16 GT/s 波形復元SerDes</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#1e3a8a">C61 PCIe Gen4 SerDes PHY</text>
        <text x="136" y="43" font-size="6.8" fill="#1e40af">・オンダイ渦巻きコイルで高周波帯域を拡張</text>
        <text x="136" y="56" font-size="6.8" fill="#1e40af">・CTLE/DFE等化器が潰れた16GT/s波を蘇生</text>
        <text x="136" y="69" font-size="6.8" fill="#1e40af">・CDRがピコ秒位相を追尾し誤り率10⁻¹²未満</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#1e3a8a">1秒160億回の波が丸く潰れても、入口のコイルと等化器が一瞬でクッキリ蘇らせる最前線</text>
      `);

    case 'cfe_nand_toggle5_phy_bus':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <rect x="20" y="24" width="24" height="52" rx="3" fill="#1e3a8a"/>
        <text x="32" y="53" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">SoC</text>
        <rect x="88" y="24" width="24" height="52" rx="3" fill="#0369a1"/>
        <text x="100" y="48" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fff">3D</text>
        <text x="100" y="58" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fde047">NAND</text>
        <line x1="44" y1="30" x2="88" y2="30" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="44" y1="39" x2="88" y2="39" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="44" y1="48" x2="88" y2="48" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="44" y1="57" x2="88" y2="57" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="44" y1="68" x2="88" y2="68" stroke="#eab308" stroke-width="2.4"/>
        <text x="66" y="79" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#92400e">差動DQS同期</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">8ch×3200MT/s 並列道路</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0c4a6e">C62 Toggle 5.0 8ch NANDバス</text>
        <text x="136" y="43" font-size="6.8" fill="#075985">・DQデータ線＋差動DQSを±0.1mm等長配線</text>
        <text x="136" y="56" font-size="6.8" fill="#075985">・1.2V低振幅VCCQで毎秒32億回を高速往復</text>
        <text x="136" y="69" font-size="6.8" fill="#075985">・表裏16DP並列駆動で1700MB/s書込を持続</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#0c4a6e">頭脳チップと表裏の記憶チップを8車線ハイウェイで直結し、8K動画を渋滞させず流し込む</text>
      `);

    case 'cfe_thermal_via_copper_slug':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <rect x="34" y="21" width="64" height="14" rx="2" fill="#dc2626"/>
        <text x="66" y="30" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">7nm SoC 発熱</text>
        <rect x="20" y="37" width="92" height="26" fill="#14532d" opacity="0.28" stroke="#166534"/>
        <rect x="44" y="37" width="44" height="26" fill="#ea580c" stroke="#9a3412"/>
        <text x="66" y="52" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">純銅コイン</text>
        <rect x="22" y="66" width="88" height="12" rx="2" fill="#94a3b8" stroke="#334155"/>
        <text x="66" y="74" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0f172a">裏面SUS放熱板(C02)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">熱伝導 1,200倍 貫通!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#9a3412">C63 銅充填ビア＆純銅コイン</text>
        <text x="136" y="43" font-size="6.8" fill="#7c2d12">・断熱性の基板を純銅塊(380W/mK)で貫通</text>
        <text x="136" y="56" font-size="6.8" fill="#7c2d12">・5×5銅充填VIPPOビアが裏面へ熱を直送</text>
        <text x="136" y="69" font-size="6.8" fill="#7c2d12">・表面銅板＆裏面SUSの50:50両面放熱が完成</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#9a3412">熱を通さない基板の真下を純銅の柱でぶち抜き、表と裏の両面から一気に熱を逃がす！</text>
      `);

    case 'cfe_slot_contact_wiper_interface':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <rect x="22" y="22" width="66" height="22" rx="2" fill="#1e293b"/>
        <rect x="26" y="41" width="58" height="5" fill="#eab308"/>
        <text x="55" y="35" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#f8fafc">Type A カード</text>
        <path d="M28 74 Q36 52 46 46 M46 74 Q54 52 64 46 M64 74 Q72 52 82 46" fill="none" stroke="#d97706" stroke-width="2.2"/>
        <rect x="94" y="24" width="16" height="50" rx="2" fill="#94a3b8" stroke="#334155"/>
        <polygon points="94,34 86,38 94,42" fill="#ea580c"/>
        <text x="102" y="68" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0f172a">爪</text>
        <text x="55" y="79" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#92400e">21本 金バネ接点</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">SD/CFexpress兼用スロット</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#854d0e">C64 コンボスロット接点＆爪</text>
        <text x="136" y="43" font-size="6.8" fill="#713f12">・21本の金めっきりん青銅バネが優しく密着</text>
        <text x="136" y="56" font-size="6.8" fill="#713f12">・ハートカム爪がノッチ(C33)をカチッと固定</text>
        <text x="136" y="69" font-size="6.8" fill="#713f12">・SDとCFexpress Type Aを1スロットで自動判別</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#854d0e">押すとカチッと留まりもう1回でポンと出る、ソニーα独自の兼用コンボスロット精密機構</text>
      `);

    case 'cfe_pcie_refclk_diff_term':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#eab308"/>
        <path d="M20 42 Q28 26 36 42 T52 42 T68 42" fill="none" stroke="#d97706" stroke-width="2"/>
        <path d="M20 56 Q28 72 36 56 T52 56 T68 56" fill="none" stroke="#0284c7" stroke-width="2"/>
        <rect x="74" y="34" width="14" height="12" rx="1" fill="#1d4ed8"/>
        <rect x="74" y="52" width="14" height="12" rx="1" fill="#1d4ed8"/>
        <text x="81" y="42" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">49.9Ω</text>
        <text x="81" y="60" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">49.9Ω</text>
        <line x1="88" y1="40" x2="108" y2="40" stroke="#16a34a" stroke-width="1.8"/>
        <line x1="88" y1="58" x2="108" y2="58" stroke="#16a34a" stroke-width="1.8"/>
        <text x="66" y="26" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#92400e">100MHz HCSL差動時計</text>
        <text x="66" y="78" text-anchor="middle" font-size="5.4" fill="#0369a1">ジッタ &lt; 0.5 ps RMS</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">反射ゼロの精密50Ω終端</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#854d0e">C65 100MHz基準クロック終端</text>
        <text x="136" y="43" font-size="6.8" fill="#713f12">・カメラとカードの拍子を合わせる共通時計線</text>
        <text x="136" y="56" font-size="6.8" fill="#713f12">・±0.1%精度49.9Ω抵抗が波の反射を吸収</text>
        <text x="136" y="69" font-size="6.8" fill="#713f12">・両側GNDガード線で電源ノイズ混入を遮断</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#854d0e">2兆分の1秒以下のズレしか許されない共通メトロノーム線を、50Ω精密抵抗で確実に受止</text>
      `);

    case 'cfe_vcore_ldo_buck_rails':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <rect x="18" y="34" width="24" height="32" rx="3" fill="#ef4444"/>
        <text x="30" y="52" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">3.3V</text>
        <rect x="52" y="22" width="58" height="14" rx="2" fill="#2563eb"/>
        <text x="81" y="31" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fff">0.85V SoCコア</text>
        <rect x="52" y="42" width="58" height="14" rx="2" fill="#0ea5e9"/>
        <text x="81" y="51" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fff">1.2V NAND I/O</text>
        <rect x="52" y="62" width="58" height="14" rx="2" fill="#10b981"/>
        <text x="81" y="71" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fff">1.8V 周辺回路</text>
        <path d="M42 50 L52 29 M42 50 L52 49 M42 50 L52 69" stroke="#ea580c" stroke-width="1.6"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">π型フィルタ リプル&lt;15mV</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#9a3412">C66 PoL 3系統電源フィルタ</text>
        <text x="136" y="43" font-size="6.8" fill="#7c2d12">・3.3Vを0.85V/1.2V/1.8Vの3電圧へ精密分配</text>
        <text x="136" y="56" font-size="6.8" fill="#7c2d12">・フェライト＋0201 MLCCが細かい波を平滑化</text>
        <text x="136" y="69" font-size="6.8" fill="#7c2d12">・2oz厚銅アイランドで負荷急変の電圧低下防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#9a3412">3種類の繊細なチップへ、それぞれ最適な超クリーン電圧を鏡のように滑らかにして届ける</text>
      `);

    case 'cfe_nand_ce_rb_mux':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <rect x="20" y="24" width="38" height="11" rx="2" fill="#0284c7"/>
        <rect x="62" y="24" width="48" height="11" rx="2" fill="#f97316"/>
        <rect x="34" y="41" width="38" height="11" rx="2" fill="#0284c7"/>
        <rect x="76" y="41" width="34" height="11" rx="2" fill="#f97316"/>
        <rect x="48" y="58" width="38" height="11" rx="2" fill="#0284c7"/>
        <rect x="90" y="58" width="20" height="11" rx="2" fill="#f97316"/>
        <text x="39" y="32" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Die0転送</text>
        <text x="86" y="32" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">書込中(Busy)</text>
        <text x="53" y="49" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Die1転送</text>
        <text x="67" y="66" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Die2転送</text>
        <text x="66" y="79" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0369a1">16ダイ順番リレーで待ちゼロ</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">CE# / R/B# 並列調停</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0c4a6e">C67 16ダイCE#/R/B#調停</text>
        <text x="136" y="43" font-size="6.8" fill="#075985">・書込中(Busy)のダイを待たず次のダイへ転送</text>
        <text x="136" y="56" font-size="6.8" fill="#075985">・16枚のダイをバトンリレーしてtPROGを隠蔽</text>
        <text x="136" y="69" font-size="6.8" fill="#075985">・同時書込ピーク電流を分散し電源安定も両立</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#0c4a6e">手が空いた記憶チップへ次々とデータを配る交通管制官が、秒間1700MBの持続書込を実現</text>
      `);

    case 'cfe_thermal_paste_underfill':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <rect x="24" y="23" width="84" height="14" rx="2" fill="#ea580c"/>
        <text x="66" y="32" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">裏面純銅コイン (C63)</text>
        <rect x="24" y="39" width="84" height="22" rx="2" fill="#f472b6"/>
        <circle cx="36" cy="50" r="3.2" fill="#f8fafc"/>
        <circle cx="51" cy="46" r="2.8" fill="#f8fafc"/>
        <circle cx="66" cy="53" r="3.4" fill="#f8fafc"/>
        <circle cx="82" cy="47" r="3.0" fill="#f8fafc"/>
        <circle cx="96" cy="52" r="2.8" fill="#f8fafc"/>
        <rect x="24" y="63" width="84" height="14" rx="2" fill="#94a3b8"/>
        <text x="66" y="72" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0f172a">裏面SUS放熱板 (C02)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#be185d">空気の270倍 熱を通す!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#9d174d">C68 裏面アルミナ熱ギャップ層</text>
        <text x="136" y="43" font-size="6.8" fill="#831843">・アルミナ微粒子シリコーンが0.2mm隙間密着</text>
        <text x="136" y="56" font-size="6.8" fill="#831843">・熱伝導7W/mKで空気の約270倍スムーズ伝熱</text>
        <text x="136" y="69" font-size="6.8" fill="#831843">・柔軟クッションが落下衝撃のチップ直撃緩衝</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#9d174d">ミクロの空気の隙間をセラミック球入りクッションで埋め、裏面放熱と耐衝撃を同時達成</text>
      `);

    case 'cfe_card_detect_pullup_ins':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <path d="M20 34 L34 34 L37 54 L40 34 L43 56 L47 38 L50 58 L64 58" fill="none" stroke="#ef4444" stroke-width="1.6"/>
        <rect x="66" y="34" width="22" height="30" rx="3" fill="#16a34a"/>
        <text x="77" y="47" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">RC</text>
        <text x="77" y="57" text-anchor="middle" font-size="5.1" font-weight="bold" fill="#fef08a">+PG</text>
        <path d="M90 58 L98 58 L98 34 L112 34" fill="none" stroke="#15803d" stroke-width="2.2"/>
        <text x="41" y="28" text-anchor="middle" font-size="5.2" fill="#dc2626">接触ブレ除去</text>
        <text x="100" y="75" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#15803d">安全ON!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#15803d">INS# Pin12 監視ゲート</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#14532d">C69 INS#デバウンス＆PG監視</text>
        <text x="136" y="43" font-size="6.8" fill="#166534">・最短ピン12(INS#)の微細接触ブレをRC除去</text>
        <text x="136" y="56" font-size="6.8" fill="#166534">・完全装着確認後に3.3V＆PERST#を安全起動</text>
        <text x="136" y="69" font-size="6.8" fill="#166534">・電圧低下検知時はPLP緊急退避を即座起動</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#14532d">「奥までカチッと刺さった！」を確認してから通電し、半挿し事故やデータ破損を防ぐ関所</text>
      `);

    case 'cfe_raid_xor_parity_engine':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <rect x="20" y="24" width="20" height="24" rx="2" fill="#3b82f6"/>
        <rect x="44" y="24" width="20" height="24" rx="2" fill="#ef4444" stroke="#991b1b" stroke-dasharray="2 1"/>
        <rect x="68" y="24" width="20" height="24" rx="2" fill="#3b82f6"/>
        <rect x="92" y="24" width="20" height="24" rx="2" fill="#eab308"/>
        <text x="30" y="39" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">D0</text>
        <text x="54" y="39" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">故障!</text>
        <text x="78" y="39" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">D2</text>
        <text x="102" y="39" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#1e293b">XOR</text>
        <path d="M30 50 Q54 64 54 52 M78 50 Q54 64 54 52 M102 50 Q78 68 54 52" fill="none" stroke="#16a34a" stroke-width="1.6"/>
        <text x="66" y="77" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#15803d">計算で100%無傷復元!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#6d28d9">カード内RAIN / XOR保護</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#4c1d95">C70 ダイ間XOR RAIDパリティ</text>
        <text x="136" y="43" font-size="6.8" fill="#5b21b6">・複数ダイにまたがりXORパリティを自動計算</text>
        <text x="136" y="56" font-size="6.8" fill="#5b21b6">・1ダイ故障でも残余データから8K映像復元</text>
        <text x="136" y="69" font-size="6.8" fill="#5b21b6">・予備ブロックプールで劣化箇所を自動置換</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#4c1d95">LDPCの限界を超える故障が起きても、企業サーバー級のカード内RAIDで映像を完全救出</text>
      `);

    // =========================================================================
    // C71–C100 Brand-New Ultra-Microscopic & 2026 Cutting-Edge Schematics (30)
    // =========================================================================
    case 'cfe_hard_gold_ni_barrier':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <rect x="22" y="24" width="88" height="13" rx="1.5" fill="#eab308" stroke="#a16207"/>
        <text x="66" y="33" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#1e293b">コバルト硬質金 0.76μm</text>
        <rect x="22" y="39" width="88" height="17" rx="1.5" fill="#cbd5e1" stroke="#475569"/>
        <text x="66" y="50" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0f172a">Ni拡散バリア 3.8μm</text>
        <rect x="22" y="58" width="88" height="18" rx="1.5" fill="#d97706" stroke="#92400e"/>
        <text x="66" y="69" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">Cu銅箔ベース</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">3層サンドで1万回ピカピカ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#854d0e">C71 コバルト硬質金＋Ni防壁</text>
        <text x="136" y="43" font-size="6.8" fill="#713f12">・中間Ni層が下の銅のしみ出しサビを遮断</text>
        <text x="136" y="56" font-size="6.8" fill="#713f12">・コバルト添加で純金の約2倍の硬さへ強化</text>
        <text x="136" y="69" font-size="6.8" fill="#713f12">・極薄封孔処理で潮風や汗の腐食もガード</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#854d0e">柔らかい純金ではなく「ニッケル防壁＋コバルト硬化金」の3層鎧が1万回挿抜を支える</text>
      `);

    case 'cfe_ac_cap_antipad_void':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <rect x="44" y="22" width="44" height="12" rx="2" fill="#d97706"/>
        <text x="66" y="30" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">0201 ACコンデンサ</text>
        <rect x="20" y="42" width="26" height="8" fill="#ea580c"/>
        <rect x="86" y="42" width="26" height="8" fill="#ea580c"/>
        <rect x="46" y="41" width="40" height="10" fill="none" stroke="#0891b2" stroke-dasharray="2 2" stroke-width="1.4"/>
        <text x="66" y="48" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0e7490">L2 抜き穴!</text>
        <rect x="20" y="58" width="92" height="8" fill="#ea580c" opacity="0.65"/>
        <text x="66" y="76" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#0369a1">余剰容量C削減→85Ω平坦!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0e7490">GNDリファレンス・ボイド</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#155e75">C72 AC直下アンチパッド抜き穴</text>
        <text x="136" y="43" font-size="6.8" fill="#164e63">・広い実装パッド直下のL2銅ベタを精密抜穴</text>
        <text x="136" y="56" font-size="6.8" fill="#164e63">・60Ωへのインピーダンス落ち込みを85Ω復帰</text>
        <text x="136" y="69" font-size="6.8" fill="#164e63">・16GT/s波の反射損失を6〜10dB劇的改善</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#155e75">コンデンサの真下だけ内層の銅板に窓を開けて電気の段差を消す、PCIe Gen4基板のプロ技</text>
      `);

    case 'cfe_glass_weave_rotated':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <line x1="20" y1="28" x2="112" y2="28" stroke="#a7f3d0" stroke-width="4"/>
        <line x1="20" y1="44" x2="112" y2="44" stroke="#a7f3d0" stroke-width="4"/>
        <line x1="20" y1="60" x2="112" y2="60" stroke="#a7f3d0" stroke-width="4"/>
        <line x1="20" y1="74" x2="112" y2="74" stroke="#a7f3d0" stroke-width="4"/>
        <line x1="34" y1="20" x2="34" y2="80" stroke="#6ee7b7" stroke-width="4" opacity="0.65"/>
        <line x1="60" y1="20" x2="60" y2="80" stroke="#6ee7b7" stroke-width="4" opacity="0.65"/>
        <line x1="86" y1="20" x2="86" y2="80" stroke="#6ee7b7" stroke-width="4" opacity="0.65"/>
        <path d="M20 40 L110 56 M20 48 L110 64" fill="none" stroke="#d97706" stroke-width="2.2"/>
        <text x="66" y="25" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#047857">10°斜めルーティング</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#047857">ペア到着ズレ Δt &lt; 1 ps</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#065f46">C73 開繊ガラス布＆10°斜め配線</text>
        <text x="136" y="43" font-size="6.8" fill="#064e3b">・ガラス糸(Dk≈6)と樹脂(Dk≈3)の速度差を均等化</text>
        <text x="136" y="56" font-size="6.8" fill="#064e3b">・開繊1067ガラス布＋10°斜め走りでスキュー除去</text>
        <text x="136" y="69" font-size="6.8" fill="#064e3b">・P/N両線が同時ゴールし16GT/s波を崩さない</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#065f46">基板の中のガラス布の織り目をわざと斜め10度に横切ることで、2本ペアの遅刻をゼロに！</text>
      `);

    case 'cfe_perimeter_via_fence':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#eab308"/>
        <rect x="24" y="24" width="84" height="52" rx="4" fill="#14532d" opacity="0.22" stroke="#ca8a04" stroke-width="1.8"/>
        ${[30, 42, 54, 66, 78, 90, 102].map((x) => `<circle cx="${x}" cy="24" r="2.6" fill="#eab308"/><circle cx="${x}" cy="76" r="2.6" fill="#eab308"/>`).join('')}
        ${[36, 50, 64].map((y) => `<circle cx="24" cy="${y}" r="2.6" fill="#eab308"/><circle cx="108" cy="${y}" r="2.6" fill="#eab308"/>`).join('')}
        <text x="66" y="48" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#14532d">8層HDI内部</text>
        <text x="66" y="60" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#92400e">間隔 ≤ λ/20 (0.9mm)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">外周ビア柵＋涙型付け根</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#854d0e">C74 外周λ/20ビアフェンス</text>
        <text x="136" y="43" font-size="6.8" fill="#713f12">・基板のフチを0.9mm刻みの銅柱で完全包囲</text>
        <text x="136" y="56" font-size="6.8" fill="#713f12">・16GHz高調波の横漏れを15〜25dB強力遮断</text>
        <text x="136" y="69" font-size="6.8" fill="#713f12">・ティアドロップ補強で150N曲げ断線を防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#854d0e">基板のフチにぐるりと金の柵を打ち、高周波ノイズ漏れと曲げによる配線破断を同時阻止</text>
      `);

    case 'cfe_die_backside_dbs_film':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="24" y="28" width="84" height="12" rx="1" fill="#1e3a8a"/>
        <text x="66" y="36" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">極薄Siダイ 30μm</text>
        <rect x="22" y="42" width="88" height="10" rx="1" fill="#f59e0b"/>
        <text x="66" y="49" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#1e293b">DBS反り防止フィルム</text>
        <rect x="26" y="56" width="80" height="10" rx="1" fill="#1e3a8a" opacity="0.6"/>
        <rect x="24" y="68" width="84" height="8" rx="1" fill="#f59e0b" opacity="0.7"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">髪より薄いダイを16段積む</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#92400e">C75 30μmダイ裏面DBS補強</text>
        <text x="136" y="43" font-size="6.8" fill="#78350f">・髪の毛の半分(30μm)まで薄化研磨したダイ</text>
        <text x="136" y="56" font-size="6.8" fill="#78350f">・裏面DBSシートがポテチ状の反りと割れ防止</text>
        <text x="136" y="69" font-size="6.8" fill="#78350f">・ステルスレーザー切断で端面欠けゼロを実現</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#92400e">サランラップ級の薄さに削った記憶チップへ背骨シートを貼り、16段積んでも割れない強さ</text>
      `);

    case 'cfe_enepig_wirebond_pad':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <path d="M36 32 Q66 14 82 36" fill="none" stroke="#eab308" stroke-width="2.2"/>
        <rect x="24" y="36" width="84" height="9" fill="#eab308"/>
        <text x="66" y="43" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#1e293b">置換Au 0.05μm</text>
        <rect x="24" y="46" width="84" height="11" fill="#e2e8f0" stroke="#64748b"/>
        <text x="66" y="54" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0f172a">パラジウム(Pd)防壁!</text>
        <rect x="24" y="58" width="84" height="12" fill="#94a3b8"/>
        <text x="66" y="66" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">無電解Ni / Cu</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">ブラックパッド発生ゼロ!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0f172a">C76 ENEPIG(Ni-Pd-Au)処理</text>
        <text x="136" y="43" font-size="6.8" fill="#334155">・NiとAuの間に貴金属パラジウム層を挟み強化</text>
        <text x="136" y="56" font-size="6.8" fill="#334155">・脆いニッケル腐食(ブラックパッド)を完全根絶</text>
        <text x="136" y="69" font-size="6.8" fill="#334155">・極細金線ボンディングとBGA落下耐性を両立</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#334155">ニッケルと金の間にパラジウムの鎧を1枚挟むことで、金ワイヤーもハンダも落下割れゼロ</text>
      `);

    case 'cfe_bga_solder_mask_dam':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0fdf4" stroke="#22c55e"/>
        <rect x="20" y="60" width="92" height="16" fill="#14532d" opacity="0.28"/>
        <rect x="26" y="54" width="22" height="6" fill="#d97706"/>
        <rect x="80" y="54" width="22" height="6" fill="#d97706"/>
        <circle cx="37" cy="42" r="12" fill="#cbd5e1" stroke="#475569" stroke-width="1.3"/>
        <circle cx="91" cy="42" r="12" fill="#cbd5e1" stroke="#475569" stroke-width="1.3"/>
        <rect x="58" y="46" width="12" height="14" rx="1" fill="#16a34a"/>
        <text x="64" y="34" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#15803d">緑の堤防</text>
        <text x="64" y="42" text-anchor="middle" font-size="5.1" fill="#166534">幅0.07mm</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#15803d">0.4mm間隔のショート防止</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#14532d">C77 NSMDランド＆マスクダム</text>
        <text x="136" y="43" font-size="6.8" fill="#166534">・NSMD銅パッド側面までハンダが包込み高強度</text>
        <text x="136" y="56" font-size="6.8" fill="#166534">・幅70μmの緑の堤防が隣ハンダとの接触阻止</text>
        <text x="136" y="69" font-size="6.8" fill="#166534">・LDIレーザー直接露光で±10μm精度形成</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#14532d">ゴマ粒未満のハンダボール同士がくっつかないよう、髪の毛幅の緑の堤防で1個ずつ仕切る</text>
      `);

    case 'cfe_macaroni_channel_core':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <circle cx="66" cy="49" r="27" fill="#64748b"/>
        <circle cx="66" cy="49" r="22" fill="#a855f7"/>
        <circle cx="66" cy="49" r="16" fill="#0ea5e9"/>
        <circle cx="66" cy="49" r="10" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="66" y="51" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">SiO₂芯</text>
        <text x="66" y="27" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">Moゲート</text>
        <text x="66" y="79" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">中空Poly-Si筒(6〜10nm)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0284c7">上から見たマカロニ断面</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0c4a6e">C78 マカロニ中空チャネル芯</text>
        <text x="136" y="43" font-size="6.8" fill="#075985">・縦穴の中を極薄ストロー状シリコンに成膜</text>
        <text x="136" y="56" font-size="6.8" fill="#075985">・中心をSiO₂で埋め結晶粒界ノイズ(RTN)激減</text>
        <text x="136" y="69" font-size="6.8" fill="#075985">・332層超の長い縦穴でも電子がスムーズ走行</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#0c4a6e">縦穴メモリ柱の中身はパスタのマカロニ状！薄い筒にすることで電子の引っかかりを無くす</text>
      `);

    case 'cfe_inter_deck_channel_joint':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <rect x="24" y="20" width="84" height="22" rx="2" fill="#dbeafe" stroke="#3b82f6"/>
        <rect x="24" y="56" width="84" height="22" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <rect x="20" y="44" width="92" height="10" rx="2" fill="#ea580c"/>
        <rect x="44" y="20" width="8" height="58" fill="#0f172a"/>
        <rect x="80" y="20" width="8" height="58" fill="#0f172a"/>
        <rect x="41" y="43" width="14" height="12" rx="2" fill="#eab308"/>
        <rect x="77" y="43" width="14" height="12" rx="2" fill="#eab308"/>
        <text x="66" y="33" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#1d4ed8">上デック</text>
        <text x="66" y="51" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">P+ IDB継ぎ目</text>
        <text x="66" y="70" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0369a1">下デック</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">誤差&lt;5nm 多段ドッキング</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#9a3412">C79 マルチデック接合＆IDB</text>
        <text x="136" y="43" font-size="6.8" fill="#7c2d12">・2〜3段に分けて縦穴を掘りナノ精度で合体</text>
        <text x="136" y="56" font-size="6.8" fill="#7c2d12">・継ぎ目のN+プラグが上下の電子通路を直結</text>
        <text x="136" y="69" font-size="6.8" fill="#7c2d12">・2026年IDB構造は中央から正孔注入し高速消去</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#9a3412">332〜400層の超縦穴を段ごとに彫ってピタッと合体！さらに中央から正孔を送り高速消去</text>
      `);

    case 'cfe_cryo_harc_etch_pillar':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <rect x="22" y="34" width="88" height="44" fill="#0f172a" opacity="0.16" stroke="#0891b2"/>
        <rect x="34" y="34" width="7" height="44" fill="#0284c7"/>
        <rect x="54" y="34" width="7" height="44" fill="#0284c7"/>
        <rect x="74" y="34" width="7" height="44" fill="#0284c7"/>
        <rect x="94" y="34" width="7" height="44" fill="#0284c7"/>
        <path d="M37 22 V32 M57 22 V32 M77 22 V32 M97 22 V32" stroke="#06b6d4" stroke-width="2"/>
        <text x="66" y="25" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0e7490">−70℃ HFプラズマ</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0891b2">深さ10μm / 比率125:1!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#155e75">C80 −70℃クライオ深穴加工</text>
        <text x="136" y="43" font-size="6.8" fill="#164e63">・ウェハを氷点下70℃へ冷やし垂直エッチング</text>
        <text x="136" y="56" font-size="6.8" fill="#164e63">・幅80nm・深さ10μm超の穴を一切曲げず貫通</text>
        <text x="136" y="69" font-size="6.8" fill="#164e63">・従来比2〜3倍高速＆CO₂削減の2026年革命</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#155e75">氷点下70℃の極低温プラズマが、400層級の超細深井戸をまっすぐ高速に彫り抜く最先端技術</text>
      `);

    case 'cfe_barrierless_moly_wl':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="20" y="24" width="42" height="22" fill="#475569"/>
        <rect x="20" y="24" width="42" height="4" fill="#f97316"/>
        <rect x="20" y="42" width="42" height="4" fill="#f97316"/>
        <text x="41" y="38" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">旧:W+TiN</text>
        <rect x="68" y="28" width="44" height="14" fill="#38bdf8" stroke="#0284c7"/>
        <text x="90" y="38" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0f172a">新:Mo単層</text>
        <rect x="68" y="50" width="44" height="14" fill="#38bdf8" stroke="#0284c7"/>
        <text x="90" y="60" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0f172a">Z&lt;30nm!</text>
        <text x="41" y="62" text-anchor="middle" font-size="5.2" fill="#dc2626">TiN膜が邪魔</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">2026年 抵抗 −30〜40%!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0f172a">C81 バリアレス・モリブデンWL</text>
        <text x="136" y="43" font-size="6.8" fill="#334155">・タングステン必須だった高抵抗TiN下地を撤廃</text>
        <text x="136" y="56" font-size="6.8" fill="#334155">・Mo直接成膜でワード線抵抗を3〜4割劇的削減</text>
        <text x="136" y="69" font-size="6.8" fill="#334155">・サブ30nm Zピッチ＆400層超の切り札材料</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#334155">じゃまな保護のり(TiN)が要らない新金属モリブデンで、薄型高層化と爆速読出を同時達成</text>
      `);

    case 'cfe_wordline_airgap_iso':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#38bdf8"/>
        <rect x="22" y="22" width="76" height="11" rx="1" fill="#475569"/>
        <rect x="28" y="35" width="64" height="10" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="2 2"/>
        <rect x="22" y="47" width="76" height="11" rx="1" fill="#475569"/>
        <rect x="28" y="60" width="64" height="10" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="2 2"/>
        <rect x="98" y="22" width="12" height="50" rx="1" fill="#94a3b8"/>
        <text x="60" y="42" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0369a1">空気層 k=1.0!</text>
        <text x="60" y="67" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0369a1">空気層 k=1.0!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0284c7">上下寄生容量 −40%超!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#38bdf8"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0c4a6e">C82 ワード線間エアギャップ</text>
        <text x="136" y="43" font-size="6.8" fill="#075985">・SiO₂(k=3.9)の代わりにナノ空気ポケット封止</text>
        <text x="136" y="56" font-size="6.8" fill="#075985">・上下ワード線の静電結合を40%以上カット</text>
        <text x="136" y="69" font-size="6.8" fill="#075985">・隣り合う階のZ干渉によるビット誤りを阻止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#0c4a6e">階と階の間に自然界最強の絶縁体「ナノ空気層」を閉じ込め、332層の上下混線をシャットアウト</text>
      `);

    case 'cfe_slit_trench_csl_wall':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#475569"/>
        <rect x="20" y="24" width="32" height="44" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="80" y="24" width="32" height="44" fill="#bae6fd" stroke="#0284c7"/>
        <rect x="54" y="24" width="5" height="44" fill="#facc15"/>
        <rect x="73" y="24" width="5" height="44" fill="#facc15"/>
        <rect x="59" y="24" width="14" height="48" fill="#334155"/>
        <rect x="20" y="70" width="92" height="8" fill="#ea580c"/>
        <text x="36" y="48" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0369a1">セル群</text>
        <text x="96" y="48" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0369a1">セル群</text>
        <text x="66" y="48" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">CSL</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">RMG金属充填→ソース壁</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0f172a">C83 スリットトレンチ＆CSL壁</text>
        <text x="136" y="43" font-size="6.8" fill="#334155">・深溝から犠牲膜を溶かし金属ゲートを充填</text>
        <text x="136" y="56" font-size="6.8" fill="#334155">・側壁を酸化膜絶縁し中央へW共通ソース壁</text>
        <text x="136" y="69" font-size="6.8" fill="#334155">・数万本の読出電流を低抵抗で一括回収</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#334155">332層の中へ金属を流し込んだ施工溝を、完成後はそのまま電流の帰り道へ再利用する妙技</text>
      `);

    case 'cfe_op_sgd_select_gates':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <rect x="22" y="23" width="20" height="11" rx="2" fill="#eab308"/>
        <rect x="45" y="23" width="20" height="11" rx="2" fill="#2563eb"/>
        <rect x="68" y="23" width="20" height="11" rx="2" fill="#eab308"/>
        <rect x="91" y="23" width="20" height="11" rx="2" fill="#2563eb"/>
        <text x="66" y="44" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#1d4ed8">OP-SGD(ダミー柱ゼロ!)</text>
        <line x1="32" y1="34" x2="32" y2="64" stroke="#334155" stroke-width="2.4"/>
        <line x1="55" y1="34" x2="55" y2="64" stroke="#334155" stroke-width="2.4"/>
        <line x1="78" y1="34" x2="78" y2="64" stroke="#334155" stroke-width="2.4"/>
        <line x1="101" y1="34" x2="101" y2="64" stroke="#334155" stroke-width="2.4"/>
        <rect x="22" y="64" width="89" height="12" rx="2" fill="#ea580c"/>
        <text x="66" y="72" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">GIDL正孔注入・一括消去</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1d4ed8">BiCS10 アレイ面積 −15%!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#1e3a8a">C84 OP-SGD＆GIDL消去ゲート</text>
        <text x="136" y="43" font-size="6.8" fill="#1e40af">・選択ゲート分離用の無駄なダミー柱を完全廃止</text>
        <text x="136" y="56" font-size="6.8" fill="#1e40af">・BiCS8〜10で有効チップ面積を約15%節約</text>
        <text x="136" y="69" font-size="6.8" fill="#1e40af">・上下端GIDLが正孔を注入し全332層一括消去</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#1e3a8a">「空き柱」を無くすBiCS10独自の入口スイッチ圧縮技術と、正孔注入で一気に消す門番ゲート</text>
      `);

    case 'cfe_dummy_edge_wordlines':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <rect x="24" y="21" width="84" height="10" rx="1" fill="#f59e0b"/>
        <text x="66" y="28" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">上端ダミーWL (緩衝)</text>
        <rect x="24" y="34" width="84" height="30" rx="1" fill="#2563eb"/>
        <text x="66" y="48" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">ユーザーデータ層</text>
        <text x="66" y="58" text-anchor="middle" font-size="5.2" fill="#bfdbfe">300+層 安全保護!</text>
        <rect x="24" y="67" width="84" height="10" rx="1" fill="#f59e0b"/>
        <text x="66" y="74" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">下端ダミーWL (緩衝)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">高電圧の端っこ電界を吸収</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#92400e">C85 端部ダミーワード線緩衝層</text>
        <text x="136" y="43" font-size="6.8" fill="#78350f">・選択ゲート隣の強い電界段差を段階的に緩和</text>
        <text x="136" y="56" font-size="6.8" fill="#78350f">・あえて写真を入れない6〜12層の保護フロア</text>
        <text x="136" y="69" font-size="6.8" fill="#78350f">・端部誤書込(Edge Disturb)を根本シャットアウト</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#92400e">電車の緩衝材のように上下端と継ぎ目へ「空きフロア」を挟み、本物の写真層を優しく守る</text>
      `);

    case 'cfe_multiplane_6plane_mpir':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        ${[0, 1, 2].flatMap((c) => [0, 1].map((r) => {
          const x = 20 + c * 32;
          const y = 22 + r * 30;
          const idx = r * 3 + c;
          return `<rect x="${x}" y="${y}" width="28" height="24" rx="2" fill="#0284c7"/><text x="${x + 14}" y="${y + 14}" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">PL${idx}</text><rect x="${x + 2}" y="${y + 18}" width="24" height="4" fill="#facc15"/>`;
        })).join('')}
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">1ダイ内 6プレーン同時読出</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0c4a6e">C86 6プレーン独立MPIR構造</text>
        <text x="136" y="43" font-size="6.8" fill="#075985">・1枚のシリコンを4〜6つの独立倉庫へ分割</text>
        <text x="136" y="56" font-size="6.8" fill="#075985">・MPIRがバラバラの番地を同時に並列読出</text>
        <text x="136" y="69" font-size="6.8" fill="#075985">・2026 BiCS10(332L)はBiCS8比＋59%高密度</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#0c4a6e">1枚のチップに6台の独立レジ(ページバッファ)を設け、最大96並列で8K映像を爆速処理！</text>
      `);

    case 'cfe_wafer_seal_ring_guard':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="20" y="22" width="92" height="56" rx="3" fill="none" stroke="#eab308" stroke-width="4.5"/>
        <rect x="29" y="31" width="74" height="38" rx="2" fill="#0f172a" stroke="#ea580c" stroke-width="2.5"/>
        <path d="M16 42 L22 45" stroke="#ef4444" stroke-width="2.2"/>
        <text x="66" y="48" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">332層セル内部</text>
        <text x="66" y="60" text-anchor="middle" font-size="5.3" fill="#fde047">ヒビ＆湿気ブロック</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">二重Cu/W城壁シールリング</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#92400e">C87 ダイ外周クラックストッパー</text>
        <text x="136" y="43" font-size="6.8" fill="#78350f">・チップ最外周を全配線層連結の金属壁で包囲</text>
        <text x="136" y="56" font-size="6.8" fill="#78350f">・切断時の微細ヒビや落下亀裂を端面で停止</text>
        <text x="136" y="69" font-size="6.8" fill="#78350f">・横からの湿気＆イオン侵入を原子レベル遮断</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#92400e">シリコンチップのフチを二重の金属城壁でぐるりと囲み、ヒビも湿気も1歩も入れない防波堤</text>
      `);

    case 'cfe_toggle6_sca_bus':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <rect x="20" y="24" width="92" height="16" rx="2" fill="#ea580c"/>
        <text x="66" y="34" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">SCA専用 命令/住所VIP線</text>
        <rect x="20" y="46" width="92" height="28" rx="2" fill="#0284c7"/>
        <text x="66" y="58" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">Toggle 6.0 データ線</text>
        <text x="66" y="69" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fde047">4.8 Gb/s 休みなく爆走!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0e7490">2026年 ONFI 6.0 / BiCS10</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#155e75">C88 Toggle 6.0＆SCA分離線</text>
        <text x="136" y="43" font-size="6.8" fill="#164e63">・命令/アドレスを独立レーン(SCA)へ分離高速化</text>
        <text x="136" y="56" font-size="6.8" fill="#164e63">・データ線は4.8Gb/s(従来比+33%)でノンストップ</text>
        <text x="136" y="69" font-size="6.8" fill="#164e63">・2026年1月ONFI 6.0＆夏BiCS10の核心革新</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#155e75">注文書(命令)と巨大トラック(動画データ)の車線を分けることで、4.8Gb/sの渋滞を完全解消</text>
      `);

    case 'cfe_pi_ltt_vccql_io':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <rect x="20" y="24" width="40" height="48" rx="3" fill="#3b82f6"/>
        <text x="40" y="46" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fff">VCCQ</text>
        <text x="40" y="56" text-anchor="middle" font-size="5.2" fill="#dbeafe">1.2V</text>
        <rect x="63" y="22" width="6" height="52" fill="#facc15"/>
        <rect x="72" y="24" width="40" height="48" rx="3" fill="#10b981"/>
        <text x="92" y="44" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">VccQL</text>
        <text x="92" y="55" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fef08a">−34%省エネ</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#047857">電源分離＋低タップ終端</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#065f46">C89 ONFI 6.0 PI-LTT超省電力</text>
        <text x="136" y="43" font-size="6.8" fill="#064e3b">・専用低電圧VccQLを分離し出力電力34%削減</text>
        <text x="136" y="56" font-size="6.8" fill="#064e3b">・入力電力も10%カットし4.8Gb/s発熱を抑制</text>
        <text x="136" y="69" font-size="6.8" fill="#064e3b">・小型ミラーレスの長時間8K録画を涼しく支える</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#065f46">4.8Gb/sで爆速通信しながら出力の電気を34%節約する、2026年ONFI 6.0/BiCS10の省エネ技</text>
      `);

    case 'cfe_zq_240ohm_odt_cal':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <rect x="20" y="34" width="38" height="24" rx="3" fill="#1d4ed8"/>
        <text x="39" y="45" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">240 Ω</text>
        <text x="39" y="54" text-anchor="middle" font-size="5.0" fill="#fde047">±0.1%基準</text>
        <path d="M58 46 H72" stroke="#eab308" stroke-width="2.2"/>
        <rect x="72" y="24" width="38" height="44" rx="3" fill="#0f172a"/>
        <rect x="78" y="30" width="26" height="5" fill="#38bdf8"/>
        <rect x="78" y="39" width="20" height="5" fill="#38bdf8"/>
        <rect x="78" y="48" width="14" height="5" fill="#38bdf8"/>
        <text x="91" y="63" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fde047">ODT自動校正</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1d4ed8">−12〜+72℃ 常に±2%整合</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#1e3a8a">C90 240Ω ZQ校正＆ODT整合</text>
        <text x="136" y="43" font-size="6.8" fill="#1e40af">・温度で狂わない0.1%精度240Ωを基準ものさしに</text>
        <text x="136" y="56" font-size="6.8" fill="#1e40af">・チップ内RonとODT抵抗を自動でピタリ校正</text>
        <text x="136" y="69" font-size="6.8" fill="#1e40af">・16DPの非選択ダイODTまで整え反射を消去</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#1e3a8a">雪山でも真夏の炎天下でも240Ωの黄金ものさしと見比べて、4.8Gb/sの信号反射をゼロ化</text>
      `);

    case 'cfe_dcc_vrefq_eye_trainer':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#eab308"/>
        <path d="M22 50 Q44 24 66 24 Q88 24 110 50 Q88 76 66 76 Q44 76 22 50 Z" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.2"/>
        <line x1="22" y1="50" x2="110" y2="50" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="3 2"/>
        <line x1="66" y1="22" x2="66" y2="78" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3 2"/>
        <circle cx="66" cy="50" r="4.5" fill="#0ea5e9"/>
        <text x="42" y="44" font-size="5.0" font-weight="bold" fill="#0369a1">VrefQ</text>
        <text x="86" y="34" font-size="5.0" font-weight="bold" fill="#dc2626">DCC 50%</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">1ビット208psのど真ん中!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#854d0e">C91 DCC/WDCA＆VrefQ学習</text>
        <text x="136" y="43" font-size="6.8" fill="#713f12">・DCC/WDCAがクロックの上げ下げを50:50補正</text>
        <text x="136" y="56" font-size="6.8" fill="#713f12">・8ピン個別のVrefQ判定電圧を自動チューニング</text>
        <text x="136" y="69" font-size="6.8" fill="#713f12">・208ps(4.8Gb/s)アイパターンの中心を射抜く</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#854d0e">光が6cmしか進めない208ピコ秒の一瞬を、チップ自身が電圧と時刻を自動学習して百発百中</text>
      `);

    case 'cfe_vpg5_precond_engine':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0fdf4" stroke="#22c55e"/>
        <rect x="20" y="22" width="40" height="22" rx="2" fill="#f97316"/>
        <text x="40" y="35" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">断片ゴミ有</text>
        <path d="M62 33 H72" stroke="#16a34a" stroke-width="2.2"/>
        <rect x="74" y="22" width="38" height="22" rx="2" fill="#16a34a"/>
        <text x="93" y="35" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">全更地化!</text>
        <rect x="20" y="52" width="92" height="24" rx="3" fill="#0f172a" stroke="#facc15" stroke-width="1.5"/>
        <text x="66" y="63" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#facc15">VPG Profile 5.0</text>
        <text x="66" y="73" text-anchor="middle" font-size="5.4" fill="#fff">800 / 1600 MB/s 保証</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#15803d">Full Format＋TRIM連動</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#14532d">C92 VPG5.0プリコンディション</text>
        <text x="136" y="43" font-size="6.8" fill="#166534">・撮影前Full Format/TRIMで全ブロック事前消去</text>
        <text x="136" y="56" font-size="6.8" fill="#166534">・録画中のゴミ掃除割込みによるコマ落ちゼロ</text>
        <text x="136" y="69" font-size="6.8" fill="#166534">・2025–2026 VPG800 / VPG1600規格の要</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#14532d">プロがロケ前にフルフォーマットする科学的理由！全ブロックを更地にして1600MB/s保証</text>
      `);

    case 'cfe_nvme24_pqc_puf_root':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#1e1b4b" stroke="#f59e0b"/>
        <rect x="22" y="24" width="38" height="36" rx="3" fill="#312e81" stroke="#facc15"/>
        <text x="41" y="39" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fde047">PUF</text>
        <text x="41" y="51" text-anchor="middle" font-size="5.0" fill="#e0e7ff">シリコン指紋</text>
        <rect x="68" y="24" width="42" height="36" rx="3" fill="#0f172a" stroke="#38bdf8"/>
        <text x="89" y="39" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#7dd3fc">ML-DSA</text>
        <text x="89" y="51" text-anchor="middle" font-size="5.0" fill="#f8fafc">耐量子格子</text>
        <text x="66" y="75" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fbbf24">NVMe 2.4 (2026年8月)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">複製不能＋耐量子金庫</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#92400e">C93 NVMe 2.4 耐量子暗号＆PUF</text>
        <text x="136" y="43" font-size="6.8" fill="#78350f">・原子ゆらぎ指紋(PUF)で秘密鍵を保存せず生成</text>
        <text x="136" y="56" font-size="6.8" fill="#78350f">・2026年8月NVMe 2.4の耐量子署名(PQC)対応</text>
        <text x="136" y="69" font-size="6.8" fill="#78350f">・C2PA報道/映画原本の改ざん防止へ発展</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#92400e">チップ固有の「シリコン指紋」と2026年最新耐量子暗号で、未来の解読攻撃もはね返す金庫</text>
      `);

    case 'cfe_pcie_l12_pm_fsm':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <rect x="22" y="24" width="14" height="48" rx="1.5" fill="#ef4444"/>
        <rect x="40" y="34" width="14" height="38" rx="1.5" fill="#f97316"/>
        <rect x="58" y="46" width="14" height="26" rx="1.5" fill="#eab308"/>
        <rect x="76" y="58" width="14" height="14" rx="1.5" fill="#22c55e"/>
        <rect x="94" y="66" width="14" height="6" rx="1.5" fill="#06b6d4"/>
        <text x="29" y="80" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#dc2626">PS0</text>
        <text x="65" y="80" text-anchor="middle" font-size="4.8" fill="#a16207">PS2</text>
        <text x="101" y="80" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0891b2">L1.2</text>
        <text x="72" y="30" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0e7490">4W → 5mW (1/800!)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0891b2">μs級 瞬間居眠り＆覚醒</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#155e75">C94 ASPM L1.2＆PS0–4省電力</text>
        <text x="136" y="43" font-size="6.8" fill="#164e63">・書込終了の数ms後にPS4＋L1.2ディープスリープ</text>
        <text x="136" y="56" font-size="6.8" fill="#164e63">・CLKREQ#解除で待機電力を800分の1(5mW)へ</text>
        <text x="136" y="69" font-size="6.8" fill="#164e63">・シャッター半押しでμs級瞬時フル覚醒</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#155e75">撮っていないスキマ時間に蛍の光レベルまで眠らせ、カメラの電池と温度を守る省エネ頭脳</text>
      `);

    case 'cfe_hctm_thermal_fsm':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff1f2" stroke="#f43f5e"/>
        <path d="M22 30 H58 L62 68 H108" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        <path d="M22 30 H48 L56 34 L64 38 L72 42 L80 46 L90 50 H108" fill="none" stroke="#10b981" stroke-width="2.4"/>
        <line x1="20" y1="56" x2="112" y2="56" stroke="#eab308" stroke-width="1.4" stroke-dasharray="2 2"/>
        <text x="42" y="26" font-size="5.2" font-weight="bold" fill="#047857">18段階なめらか制御</text>
        <text x="86" y="64" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#b45309">VPG800死守</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#be123c">TMT1/TMT2 カメラ協調</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#f43f5e"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#881337">C95 NVMe HCTM 18段階熱制御</text>
        <text x="136" y="43" font-size="6.8" fill="#9f1239">・カメラと温度基準TMT1/TMT2を動的に協調</text>
        <text x="136" y="56" font-size="6.8" fill="#9f1239">・18段階微細クロック調整で急ブレーキ暴落回避</text>
        <text x="136" y="69" font-size="6.8" fill="#9f1239">・VPG400/800を下回らず8K長回しを完走</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#881337">急ブレーキで録画停止させるのではなく、18段階の繊細なペース配分で熱と速度を絶妙両立</text>
      `);

    case 'cfe_vth_read_retry_tracker':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <path d="M18 72 Q26 28 34 72 Q42 28 50 72 Q58 28 66 72 Q74 28 82 72 Q90 28 98 72 Q106 38 112 72" fill="none" stroke="#2563eb" stroke-width="1.8"/>
        <line x1="34" y1="26" x2="34" y2="76" stroke="#eab308" stroke-width="1.5"/>
        <line x1="50" y1="26" x2="50" y2="76" stroke="#eab308" stroke-width="1.5"/>
        <line x1="66" y1="26" x2="66" y2="76" stroke="#eab308" stroke-width="1.5"/>
        <line x1="82" y1="26" x2="82" y2="76" stroke="#eab308" stroke-width="1.5"/>
        <text x="66" y="25" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#b45309">Vth谷間をmV自動追跡!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1d4ed8">ソフト判定LLR→LDPC救済</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#1e3a8a">C96 Vth分布追従＆ソフト読出</text>
        <text x="136" y="43" font-size="6.8" fill="#1e40af">・温度や経年でズレたTLC 8山の谷間を自動探索</text>
        <text x="136" y="56" font-size="6.8" fill="#1e40af">・複数回微細計測で確率情報(LLR)をLDPCへ供給</text>
        <text x="136" y="69" font-size="6.8" fill="#1e40af">・ハード判定比2〜3倍の誤り訂正力でデータ救出</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#1e3a8a">電子が少し抜けて電圧の山がズレても、ミリボルト単位で本当の谷間を探し出す名探偵回路</text>
      `);

    case 'cfe_ldpc_data_scrambler':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <rect x="19" y="28" width="28" height="40" rx="2" fill="#ef4444"/>
        <text x="33" y="46" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">0000</text>
        <text x="33" y="56" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">0000</text>
        <circle cx="66" cy="48" r="11" fill="#eab308"/>
        <text x="66" y="50" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#1e293b">XOR</text>
        <rect x="83" y="28" width="28" height="40" rx="2" fill="#10b981"/>
        <text x="97" y="46" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">1010</text>
        <text x="97" y="56" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">0110</text>
        <text x="66" y="24" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#7e22ce">LFSR疑似乱数ミキサー</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#7e22ce">全8状態を均等12.5%へ!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#581c87">C97 ハードウェア撹拌スクランブラ</text>
        <text x="136" y="43" font-size="6.8" fill="#6b21a8">・0や1の連続偏りをページ毎シードで50:50撹拌</text>
        <text x="136" y="56" font-size="6.8" fill="#6b21a8">・隣接セル同士の電界干渉と同時電流雑音を防止</text>
        <text x="136" y="69" font-size="6.8" fill="#6b21a8">・読出時に同じXORで遅延ゼロ・100%元通り復元</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#581c87">真っ黒や真っ白の映像でも0と1を綺麗に混ぜてNANDへ優しく保存し、読む瞬間に元へ戻す</text>
      `);

    case 'cfe_pmic_ovp_uvlo_guard':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <rect x="20" y="21" width="92" height="15" rx="2" fill="#dc2626"/>
        <text x="66" y="31" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">OVP &gt;3.63V 強制遮断!</text>
        <rect x="20" y="40" width="92" height="18" rx="2" fill="#16a34a"/>
        <text x="66" y="51" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">安全窓 3.30 V ±10%</text>
        <rect x="20" y="62" width="92" height="15" rx="2" fill="#d97706"/>
        <text x="66" y="72" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">UVLO &lt;2.97V PLP退避!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b91c1c">応答 &lt; 1 μs 電圧の関所</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#7f1d1d">C98 OVP/UVLO/OCP三重関所</text>
        <text x="136" y="43" font-size="6.8" fill="#991b1b">・3.63V超の異常サージを1μs未満で遮断し保護</text>
        <text x="136" y="56" font-size="6.8" fill="#991b1b">・2.97V未満の電池切れ瞬間にPLP緊急退避を発動</text>
        <text x="136" y="69" font-size="6.8" fill="#991b1b">・±1%精度バンドギャップ基準で厳密監視</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#7f1d1d">高すぎる電気も低すぎる電気も100万分の1秒で見逃さず、チップ焼損とデータ破損を阻止</text>
      `);

    case 'cfe_usb4_mrwg3_bridge_if':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#475569"/>
        <rect x="20" y="22" width="92" height="12" rx="2" fill="#64748b"/>
        <text x="66" y="30" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">CNCアルミ放熱フィン筐体</text>
        <rect x="20" y="38" width="38" height="34" rx="2" fill="#1e293b"/>
        <text x="39" y="53" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#f97316">CF4.0</text>
        <text x="39" y="63" text-anchor="middle" font-size="5.0" fill="#fff">PCIe4</text>
        <path d="M58 55 H76" stroke="#eab308" stroke-width="3.2"/>
        <rect x="76" y="38" width="36" height="34" rx="2" fill="#2563eb"/>
        <text x="94" y="53" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">USB4</text>
        <text x="94" y="63" text-anchor="middle" font-size="5.0" fill="#fde047">40Gbps</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">MRW-G3 従来比 2.3倍速!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0f172a">C99 USB4 40Gbps直結＆放熱部</text>
        <text x="136" y="43" font-size="6.8" fill="#334155">・PCIe Gen4を翻訳せずUSB4へネイティブ直通</text>
        <text x="136" y="56" font-size="6.8" fill="#334155">・Sony MRW-G3等で実測1800MB/s(2.3×)転送</text>
        <text x="136" y="69" font-size="6.8" fill="#334155">・アルミ放熱フィン密着で1.9TB連続コピー冷却</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#334155">PCIe信号をそのまま通す極太USB4トンネルとアルミ冷却で、2TBの取り込みを劇的短縮！</text>
      `);

    case 'cfe_xray_magnetic_uv_shield':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <polygon points="66,22 100,32 96,60 66,76 36,60 32,32" fill="#0f172a" stroke="#38bdf8" stroke-width="2.2"/>
        <text x="66" y="41" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fde047">X線 / 磁気</text>
        <text x="66" y="51" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#7dd3fc">UV / 静電</text>
        <text x="66" y="62" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#4ade80">IP57 / 150N</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">6重プロテクト完全防御!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0c4a6e">C100 6重環境プロテクト多層枠</text>
        <text x="136" y="43" font-size="6.8" fill="#075985">・非磁性Si₃N₄セルで強磁界でもデータ無影響</text>
        <text x="136" y="56" font-size="6.8" fill="#075985">・ISO7816-1耐X線＋不透明黒樹脂でUV完全遮光</text>
        <text x="136" y="69" font-size="6.8" fill="#075985">・IP57・150N・±15kV・LDPC+RAIDの総仕上げ</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.8" fill="#0c4a6e">100個の超微細技術が1つに結集し、空港X線も磁石も砂嵐も跳ね返す究極のプロ品質が完成！</text>
      `);

    default:
      return null;
  }
}
