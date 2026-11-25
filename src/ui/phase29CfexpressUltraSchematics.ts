import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 29 Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (+30 diagrams):
 *   - C101–C130 Sub-Nanometer Quantum, Packaging IMC Metallurgy, Multi-GHz PCB Copper,
 *     6nm SerDes Transistor-Level Engine & 2026 Next-Gen Frontier (130/130 unique CFexpress SVGs!).
 * Every text element is strictly calibrated inside x in [6, 310], y in [8, 114].
 */
export function renderPhase29CfexpressUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // C101–C108: Sub-Nanometer 3D NAND Quantum & Atomic Cell Physics
    // =========================================================================
    case 'cfe_besonos_tunnel_oxide':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <rect x="20" y="24" width="18" height="52" rx="2" fill="#0ea5e9"/>
        <text x="29" y="53" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">Si</text>
        <rect x="40" y="24" width="12" height="52" fill="#fde047" stroke="#ca8a04"/>
        <rect x="52" y="34" width="14" height="42" fill="#f59e0b" stroke="#b45309"/>
        <rect x="66" y="24" width="12" height="52" fill="#fde047" stroke="#ca8a04"/>
        <text x="46" y="32" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#713f12">O1</text>
        <text x="59" y="56" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">N1</text>
        <text x="72" y="32" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#713f12">O2</text>
        <rect x="80" y="24" width="32" height="52" rx="2" fill="#7c3aed"/>
        <text x="96" y="48" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">Si3N4</text>
        <text x="96" y="58" text-anchor="middle" font-size="4.8" fill="#fde047">電荷捕獲</text>
        <path d="M32 45 Q59 38 86 45" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2.5 1.5"/>
        <circle cx="88" cy="45" r="2.8" fill="#fde047" stroke="#dc2626"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">O1/N1/O2 合計約5.1 nm</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#854d0e">C101 BE-SONOS トンネル酸化膜</text>
        <text x="136" y="43" font-size="6.7" fill="#a16207">・3層(O1/N1/O2)で量子障壁の形を精密設計</text>
        <text x="136" y="56" font-size="6.7" fill="#a16207">・書込時のみ高速FNトンネル注入を許可</text>
        <text x="136" y="69" font-size="6.7" fill="#a16207">・待機時はSILCリークを遮断し10年保持</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#854d0e">強い電圧の瞬間だけ電子を通し、普段は漏洩をピタリと止める原子20層分の一方通行ドア</text>
      `);

    case 'cfe_highk_al2o3_blocking':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <rect x="20" y="24" width="24" height="52" rx="2" fill="#7c3aed"/>
        <text x="32" y="52" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Si3N4</text>
        <rect x="46" y="24" width="24" height="52" rx="2" fill="#0284c7"/>
        <text x="58" y="47" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Al2O3</text>
        <text x="58" y="57" text-anchor="middle" font-size="4.6" fill="#bae6fd">Laドープ</text>
        <rect x="72" y="24" width="12" height="52" fill="#38bdf8"/>
        <text x="78" y="52" text-anchor="middle" font-size="4.4" font-weight="bold" fill="#0c4a6e">Hf</text>
        <rect x="86" y="24" width="26" height="52" rx="2" fill="#64748b"/>
        <text x="99" y="49" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">Mo</text>
        <text x="99" y="59" text-anchor="middle" font-size="4.6" fill="#e2e8f0">金属WL</text>
        <path d="M90 38 L74 38" stroke="#ef4444" stroke-width="1.8"/>
        <line x1="70" y1="33" x2="76" y2="43" stroke="#ef4444" stroke-width="1.8"/>
        <line x1="76" y1="33" x2="70" y2="43" stroke="#ef4444" stroke-width="1.8"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">High-k κ≈9〜14 逆流阻止壁</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">C102 Al2O3/LaAlOx ブロッキング膜</text>
        <text x="136" y="43" font-size="6.7" fill="#0369a1">・サファイア成分の高κ膜で電界結合を強化</text>
        <text x="136" y="56" font-size="6.7" fill="#0369a1">・消去時の金属ゲート電子逆流を完全阻止</text>
        <text x="136" y="69" font-size="6.7" fill="#0369a1">・2026年La添加研究で9.5V級メモリ窓を実現</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#0c4a6e">電気を通さず電界だけを伝える高誘電率の盾で、消去飽和を防ぎ記憶コントラストを最大化</text>
      `);

    case 'cfe_si3n4_trap_energy_wells':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <path d="M22 30 H34 V66 H46 V30 H58 V66 H70 V30 H82 V66 H94 V30 H110" fill="none" stroke="#7c3aed" stroke-width="1.8"/>
        <circle cx="40" cy="56" r="4" fill="#facc15" stroke="#b45309"/>
        <circle cx="64" cy="56" r="4" fill="#facc15" stroke="#b45309"/>
        <circle cx="88" cy="56" r="4" fill="#facc15" stroke="#b45309"/>
        <line x1="52" y1="22" x2="52" y2="76" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="2 1.5"/>
        <line x1="76" y1="22" x2="76" y2="76" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="2 1.5"/>
        <text x="66" y="26" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#6b21a8">深さ 0.87 eV トラップ井戸</text>
        <text x="66" y="79" text-anchor="middle" font-size="5.0" fill="#0e7490">横移動(Migration)分断カット</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.7" font-weight="bold" fill="#7e22ce">4.3×10¹⁸ cm⁻³·eV⁻¹ (2026)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#581c87">C103 a-Si3N4 電荷捕獲欠陥井戸</text>
        <text x="136" y="43" font-size="6.7" fill="#6b21a8">・絶縁体内の局在欠陥が「卵パック」状に捕獲</text>
        <text x="136" y="56" font-size="6.7" fill="#6b21a8">・2026年ARCNL実測: 0.87 eVに捕獲ピーク</text>
        <text x="136" y="69" font-size="6.7" fill="#6b21a8">・窒化膜分断で上下セルへの横拡散を抑止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#581c87">1か所傷んでも全滅しない絶縁トラップ構造と横拡散カットで、高温でも10年記憶を死守</text>
      `);

    case 'cfe_ispp_step_pulse_verify':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <path d="M20 74 H28 V58 H36 V74 H40 V66 H44 V74 H48 V48 H56 V74 H60 V66 H64 V74 H68 V38 H76 V74 H80 V66 H84 V74 H88 V26 H98 V74 H110" fill="none" stroke="#ea580c" stroke-width="1.8"/>
        <line x1="20" y1="66" x2="106" y2="66" stroke="#eab308" stroke-width="1.1" stroke-dasharray="2 2"/>
        <text x="64" y="24" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#c2410c">14V→25V 階段パルス(ΔV)</text>
        <text x="64" y="81" text-anchor="middle" font-size="4.9" fill="#a16207">毎回ベリファイ確認＋非選択8Vブースト</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">A-ISPP ばらつき最大60%縮小</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">C104 適応ISPP＆セルフブースト</text>
        <text x="136" y="43" font-size="6.7" fill="#9a3412">・0.2〜0.5V刻みで昇圧→即ベリファイ検証</text>
        <text x="136" y="56" font-size="6.7" fill="#9a3412">・非選択チャネルを~8Vへ浮かせ誤書込禁止</text>
        <text x="136" y="69" font-size="6.7" fill="#9a3412">・2026年A-ISPPでVth分布を38〜60%狭小化</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#7c2d12">試験管に電子を1粒ずつ注ぐ精密階段書込と電気バリアで、TLC/QLC多値精度を極限化</text>
      `);

    case 'cfe_wafer_backside_stress_sin':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <path d="M22 36 Q66 22 110 36" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-dasharray="3 2"/>
        <text x="66" y="25" text-anchor="middle" font-size="5.0" fill="#dc2626">332層積層の反り(最大1000μm)</text>
        <rect x="22" y="48" width="88" height="10" rx="2" fill="#334155"/>
        <text x="66" y="55" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">Si 300mm ウェハ (完全平坦!)</text>
        <rect x="22" y="58" width="88" height="9" rx="2" fill="#0ea5e9"/>
        <text x="66" y="65" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">裏面 PVD SiN (400–1800 MPa)</text>
        <path d="M40 74 L26 74 M92 74 L106 74" stroke="#0284c7" stroke-width="1.8"/>
        <text x="66" y="77" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0369a1">圧縮応力で裏から矯正</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">2026 PVD SiN 矯正効率2〜3倍</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">C105 ウェハ裏面SiN応力補償膜</text>
        <text x="136" y="43" font-size="6.7" fill="#0369a1">・332〜400層積層による弓なり反りを相殺</text>
        <text x="136" y="56" font-size="6.7" fill="#0369a1">・2026年PVD SiN認定: 最大1800 MPa制御</text>
        <text x="136" y="69" font-size="6.7" fill="#0369a1">・露光ピント精度＆CBAウェハ接合を死守</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#0c4a6e">超高層積層でポテチ状に反るウェハを裏面から押し戻し、鏡のような平坦度を取り戻す</text>
      `);

    case 'cfe_sicn_cmp_sub2nm_dishing':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="20" y="24" width="92" height="18" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <rect x="34" y="34" width="18" height="10" fill="#ea580c"/>
        <rect x="78" y="34" width="18" height="10" fill="#ea580c"/>
        <line x1="20" y1="44" x2="112" y2="44" stroke="#06b6d4" stroke-width="1.6" stroke-dasharray="2 1.5"/>
        <rect x="20" y="46" width="92" height="18" rx="2" fill="#94a3b8" stroke="#334155"/>
        <rect x="34" y="44" width="18" height="10" fill="#ea580c"/>
        <rect x="78" y="44" width="18" height="10" fill="#ea580c"/>
        <text x="66" y="33" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#1e293b">SiCN (Ra &lt; 0.5 nm)</text>
        <text x="66" y="58" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">Cuディッシング &lt; 2 nm</text>
        <text x="66" y="76" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#b45309">常温Si-OH自発接合 → &lt;250℃Cu融合</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">先端0.4〜1.4 μmピッチ実証</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">C106 SiCN界面＆サブ2nm CMP</text>
        <text x="136" y="43" font-size="6.7" fill="#92400e">・SiCN鏡面(0.5nm未満)が常温で自発吸着</text>
        <text x="136" y="56" font-size="6.7" fill="#92400e">・Cu凹み2nm未満で熱膨張後に隙間ゼロ融合</text>
        <text x="136" y="69" font-size="6.7" fill="#92400e">・ソニー0.4μm級超微細CMPがCBAを進化</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#78350f">ハンダも糊も使わず、原子レベルの鏡面どうしを直接融合させる次世代ハイブリッド接合</text>
      `);

    case 'cfe_stealth_dicing_mod_layer':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <polygon points="56,18 76,18 66,52" fill="#fca5a5" opacity="0.65"/>
        <rect x="20" y="36" width="44" height="28" rx="2" fill="#334155"/>
        <rect x="68" y="36" width="44" height="28" rx="2" fill="#334155"/>
        <circle cx="66" cy="44" r="2.6" fill="#ef4444"/>
        <circle cx="66" cy="52" r="2.6" fill="#ef4444"/>
        <circle cx="66" cy="60" r="2.6" fill="#ef4444"/>
        <text x="66" y="31" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#b91c1c">1117nm透過レーザー</text>
        <text x="42" y="53" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">25μm Si</text>
        <text x="90" y="53" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">25μm Si</text>
        <path d="M46 72 L28 72 M86 72 L104 72" stroke="#0284c7" stroke-width="1.8"/>
        <text x="66" y="75" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0369a1">テープ拡張分離</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b91c1c">表面無傷・削りカスゼロ切断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7f1d1d">C107 ステルスダイシングMOD層</text>
        <text x="136" y="43" font-size="6.7" fill="#991b1b">・Si透過波長1117nmを内部1点のみへ集光</text>
        <text x="136" y="56" font-size="6.7" fill="#991b1b">・内部改質層(MOD)を作りテープ拡張で分割</text>
        <text x="136" y="69" font-size="6.7" fill="#991b1b">・25μm極薄16段積層ダイの欠け・割れゼロ</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#7f1d1d">紙より薄い極薄シリコンの内部だけに見えないミシン目を刻む透視レーザー個片化技術</text>
      `);

    case 'cfe_fenand_hzo_igzo_2026':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fdf4ff" stroke="#c026d3"/>
        <rect x="20" y="24" width="24" height="52" rx="2" fill="#06b6d4"/>
        <text x="32" y="48" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">a-IGZO</text>
        <text x="32" y="58" text-anchor="middle" font-size="4.5" fill="#ecfeff">酸化物Ch</text>
        <rect x="46" y="24" width="38" height="52" rx="2" fill="#a21caf"/>
        <text x="65" y="35" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">HZO結晶</text>
        <text x="56" y="53" text-anchor="middle" font-size="9" font-weight="bold" fill="#38bdf8">↑</text>
        <text x="74" y="53" text-anchor="middle" font-size="9" font-weight="bold" fill="#f472b6">↓</text>
        <text x="65" y="69" text-anchor="middle" font-size="4.6" fill="#fae8ff">分極反転=0/1</text>
        <rect x="86" y="24" width="26" height="52" rx="2" fill="#475569"/>
        <text x="99" y="52" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Gate</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.7" font-weight="bold" fill="#86198f">2026 imec実証 MW 11–17.8V</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fdf4ff" stroke="#c026d3"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#701a75">C108 2026次世代 HZO FeNAND</text>
        <text x="136" y="43" font-size="6.7" fill="#86198f">・強誘電体HZOの分極反転で低電圧・超長寿</text>
        <text x="136" y="56" font-size="6.7" fill="#86198f">・a-IGZO酸化物チャネルで極小オフ電流</text>
        <text x="136" y="69" font-size="6.7" fill="#86198f">・2026年6月imec＆10月arXivで最有力視</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#701a75">電子を壁に叩きつけず電気のN/S極を反転させる、未来のCFexpress 5.0/6.0時代の大本命</text>
      `);

    // =========================================================================
    // C109–C114: Semiconductor Packaging Metallurgy & Atomic Interfaces
    // =========================================================================
    case 'cfe_sac305_imc_cu6sn5_cu3sn':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="20" y="22" width="92" height="26" rx="2" fill="#cbd5e1"/>
        <text x="66" y="38" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#334155">SAC305 (Sn-3Ag-0.5Cu)</text>
        <path d="M20 52 Q28 42 36 52 Q44 42 52 52 Q60 42 68 52 Q76 42 84 52 Q92 42 100 52 Q106 44 112 52 V58 H20 Z" fill="#94a3b8" stroke="#475569"/>
        <text x="66" y="55" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">ホタテ状 η-Cu6Sn5 (125GPa)</text>
        <rect x="20" y="58" width="92" height="8" fill="#78350f"/>
        <text x="66" y="64" text-anchor="middle" font-size="4.4" fill="#fde68a">ε-Cu3Sn / Ni空孔抑止</text>
        <rect x="20" y="66" width="92" height="12" rx="1" fill="#ea580c"/>
        <text x="66" y="75" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Cu パッド</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">適正IMC厚 1〜3 μmで衝撃耐性</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#1e293b">C109 SAC305 IMC界面＆空孔抑止</text>
        <text x="136" y="43" font-size="6.7" fill="#334155">・はんだと銅の反応でホタテ状Cu6Sn5が生成</text>
        <text x="136" y="56" font-size="6.7" fill="#334155">・過成長による脆化とカーケンダル空孔を防止</text>
        <text x="136" y="69" font-size="6.7" fill="#334155">・Niバリア＆冷却制御が7.5m落下耐性を支える</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#1e293b">はんだ接合の本当の強さを決める、わずか1〜3 μm厚の合金結晶界面と空洞バリア</text>
      `);

    case 'cfe_cu_pillar_ubm_trilayer':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <rect x="22" y="20" width="88" height="10" rx="2" fill="#1e293b"/>
        <text x="66" y="27" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">6nm コントローラSiダイ</text>
        <rect x="42" y="30" width="48" height="7" fill="#64748b"/>
        <text x="66" y="36" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">UBM (Ti / Cu / Ni)</text>
        <rect x="46" y="37" width="40" height="22" fill="#ea580c" stroke="#9a3412"/>
        <text x="66" y="50" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">Cuピラー 60μm</text>
        <path d="M46 59 Q66 74 86 59 Z" fill="#cbd5e1" stroke="#475569"/>
        <rect x="22" y="69" width="88" height="10" rx="2" fill="#0f766e"/>
        <text x="66" y="76" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">ABF パッケージ基板</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">電流集中＆EM破壊を劇的緩和</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">C110 銅ピラー＆3層UBM構造</text>
        <text x="136" y="43" font-size="6.7" fill="#9a3412">・溶けないCuの柱が狭ピッチ短絡を完全防止</text>
        <text x="136" y="56" font-size="6.7" fill="#9a3412">・Ti密着/Cu種/Ni拡散障壁の3層UBM台座</text>
        <text x="136" y="69" font-size="6.7" fill="#9a3412">・電流集中によるEMボイドを緩和し長寿命化</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#7c2d12">丸いハンダ玉の代わりに極細の銅の柱を立て、狭ピッチ高密度と大電流耐性を両立</text>
      `);

    case 'cfe_pdcu_wirebond_fab_imc':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <path d="M36 62 C36 24 94 24 94 68" fill="none" stroke="#ea580c" stroke-width="3.2"/>
        <path d="M36 62 C36 24 94 24 94 68" fill="none" stroke="#e2e8f0" stroke-width="1.1" stroke-dasharray="3 2"/>
        <ellipse cx="36" cy="64" rx="8" ry="5.5" fill="#f59e0b" stroke="#78350f"/>
        <rect x="22" y="69" width="28" height="8" rx="1" fill="#94a3b8"/>
        <text x="36" y="75" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">Al+CuAlPd</text>
        <rect x="80" y="69" width="28" height="8" rx="1" fill="#ca8a04"/>
        <text x="94" y="75" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">ENEPIG</text>
        <text x="66" y="27" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#b45309">Pd被覆Cuワイヤ 20μm</text>
        <text x="36" y="56" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#78350f">FAB球</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">Au比 抵抗−22%・放熱+25%</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">C111 PdCuワイヤ＆FAB耐食接合</text>
        <text x="136" y="43" font-size="6.7" fill="#92400e">・銅芯＋ナノPd被覆で金より低抵抗・高剛性</text>
        <text x="136" y="56" font-size="6.7" fill="#92400e">・放電真球FABがCu-Al-Pd耐食IMCを形成</text>
        <text x="136" y="69" font-size="6.7" fill="#92400e">・塩素腐食＆16段樹脂封止時のワイヤ流れ抑止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#78350f">パラジウムの鎧をまとった20 μm銅線が、16枚重ねのNANDを低損失かつ高耐久に結ぶ</text>
      `);

    case 'cfe_fow_film_over_wire_stack':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#38bdf8"/>
        <rect x="26" y="24" width="76" height="10" rx="1.5" fill="#0284c7"/>
        <text x="64" y="31" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#fff">上段 25μm NANDダイ</text>
        <rect x="24" y="34" width="80" height="16" rx="2" fill="#bae6fd" stroke="#0284c7" stroke-dasharray="2 1.5"/>
        <path d="M32 50 C26 38 18 40 18 68" fill="none" stroke="#eab308" stroke-width="2"/>
        <path d="M96 50 C102 38 110 40 110 68" fill="none" stroke="#eab308" stroke-width="2"/>
        <text x="64" y="44" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0369a1">FOW溶融埋込フィルム</text>
        <rect x="26" y="50" width="76" height="10" rx="1.5" fill="#0369a1"/>
        <text x="64" y="57" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#fff">下段 25μm NANDダイ</text>
        <rect x="20" y="64" width="92" height="10" rx="2" fill="#1e293b"/>
        <text x="66" y="71" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fde047">気泡ゼロ・傾きゼロで16段積層!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">2026 極薄DAF(&lt;10μm)＋FOW</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#38bdf8"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">C112 FOW ワイヤ埋込接着フィルム</text>
        <text x="136" y="43" font-size="6.7" fill="#0369a1">・加熱軟化して下段ワイヤを無損傷で包み込む</text>
        <text x="136" y="56" font-size="6.7" fill="#0369a1">・ダミースペーサー不要で16段を1.2mmへ収容</text>
        <text x="136" y="69" font-size="6.7" fill="#0369a1">・均一厚みでボイド・ダイ傾斜・割れを根絶</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#0c4a6e">ハチミツのように溶けて極細ワイヤを包み込み、16枚の極薄シリコンを水平に支える糊</text>
      `);

    case 'cfe_ula_silica_emc_filler':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <rect x="20" y="22" width="92" height="56" rx="4" fill="#1e293b"/>
        <circle cx="34" cy="36" r="8" fill="#cbd5e1"/><circle cx="52" cy="34" r="6" fill="#e2e8f0"/>
        <circle cx="70" cy="38" r="9" fill="#cbd5e1"/><circle cx="92" cy="35" r="7.5" fill="#e2e8f0"/>
        <circle cx="32" cy="58" r="7" fill="#e2e8f0"/><circle cx="48" cy="54" r="9.5" fill="#cbd5e1"/>
        <circle cx="68" cy="60" r="6.5" fill="#e2e8f0"/><circle cx="88" cy="57" r="8.5" fill="#cbd5e1"/>
        <text x="66" y="75" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fde047">球状SiO2 88wt% / α線 &lt;0.002</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">CTE 7〜9ppm ＆ ソフトエラー遮断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">C113 超低α線 球状シリカEMC</text>
        <text x="136" y="43" font-size="6.7" fill="#334155">・黒樹脂の85〜90%は真球状溶融ガラス微粒子</text>
        <text x="136" y="56" font-size="6.7" fill="#334155">・熱膨張係数(CTE)をSiへ整合し断線を防止</text>
        <text x="136" y="69" font-size="6.7" fill="#334155">・U/Th精製ULA材でα線ソフトエラーを遮断</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#0f172a">樹脂の膨張を抑えつつ、自らの微量放射線によるビット化けまで防ぐ超高純度シリカの鎧</text>
      `);

    case 'cfe_wafer_11n_cz_monocrystal':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <circle cx="66" cy="50" r="26" fill="#0ea5e9" opacity="0.2" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="46" y1="50" x2="86" y2="50" stroke="#0284c7" stroke-width="1"/>
        <line x1="66" y1="30" x2="66" y2="70" stroke="#0284c7" stroke-width="1"/>
        <rect x="52" y="36" width="28" height="28" fill="none" stroke="#0369a1" stroke-dasharray="2 2"/>
        <polygon points="64,76 68,76 66,72" fill="#eab308"/>
        <text x="66" y="47" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0c4a6e">11N Si</text>
        <text x="66" y="57" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0369a1">{100}単結晶</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.7" font-weight="bold" fill="#0369a1">純度 99.999999999% (300mm)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">C114 11N CZ単結晶シリコン基盤</text>
        <text x="136" y="43" font-size="6.7" fill="#0369a1">・原子1000億個に不純物1個未満の究極純度</text>
        <text x="136" y="56" font-size="6.7" fill="#0369a1">・CZ法無転位インゴットから{100}面を切出</text>
        <text x="136" y="69" font-size="6.7" fill="#0369a1">・332層NANDも6nm SoCも支える究極の大地</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#0c4a6e">日本の信越・SUMCO・トクヤマ等が世界を牽引する、1.92TB記憶の出発点となる単結晶</text>
      `);

    // =========================================================================
    // C115–C120: Multi-GHz PCB Copper Microstructure & Passives
    // =========================================================================
    case 'cfe_hvlp2_copper_skin_depth':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <path d="M20 42 L26 32 L32 42 L38 32 L44 42 L50 32 L56 42 L62 32 L68 42" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <text x="44" y="28" text-anchor="middle" font-size="4.8" fill="#b91c1c">従来ED銅 Rz 5–8μm</text>
        <rect x="20" y="56" width="92" height="12" rx="1.5" fill="#ea580c"/>
        <rect x="20" y="54" width="92" height="3.2" fill="#fde047"/>
        <rect x="20" y="68" width="92" height="4" fill="#06b6d4"/>
        <text x="66" y="52" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#b45309">HVLP2 (Rz &lt; 2μm) 表皮δ=0.7μm</text>
        <text x="66" y="78" text-anchor="middle" font-size="4.7" fill="#0e7490">シランカップリング分子接着層</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">高周波導体損失 −15〜25%削減</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">C115 超平滑HVLP2銅箔＆表皮効果</text>
        <text x="136" y="43" font-size="6.7" fill="#9a3412">・8–16GHz信号は銅表面わずか0.5–0.7μmを走行</text>
        <text x="136" y="56" font-size="6.7" fill="#9a3412">・鏡面HVLP2箔で凹凸の遠回り抵抗を激減</text>
        <text x="136" y="69" font-size="6.7" fill="#9a3412">・シラン分子糊で低粗度でも剥離を防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#7c2d12">高周波電流が通る極薄の「皮」を鏡のように磨き上げ、16 GT/sの減衰を最小化する銅箔</text>
      `);

    case 'cfe_megtron7_ultralow_df_resin':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <rect x="22" y="26" width="76" height="10" rx="2" fill="#ef4444"/><text x="103" y="34" font-size="4.8" fill="#b91c1c">0.020</text>
        <text x="26" y="33" font-size="4.8" font-weight="bold" fill="#fff">一般FR-4</text>
        <rect x="22" y="40" width="40" height="10" rx="2" fill="#f59e0b"/><text x="67" y="48" font-size="4.8" fill="#b45309">0.004</text>
        <text x="26" y="47" font-size="4.8" font-weight="bold" fill="#fff">Meg6</text>
        <rect x="22" y="54" width="24" height="10" rx="2" fill="#10b981"/><text x="51" y="62" font-size="4.8" font-weight="bold" fill="#047857">0.002</text>
        <text x="25" y="61" font-size="4.6" font-weight="bold" fill="#fff">M7</text>
        <rect x="22" y="68" width="14" height="10" rx="2" fill="#0284c7"/><text x="41" y="76" font-size="4.8" font-weight="bold" fill="#0369a1">0.0008 (M8)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#047857">誘電損失(Df) 最大1/10〜1/25!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#064e3b">C116 Megtron7/8級 超低Df樹脂</text>
        <text x="136" y="43" font-size="6.7" fill="#065f46">・高速電波が絶縁体内で熱に消える損失を激減</text>
        <text x="136" y="56" font-size="6.7" fill="#065f46">・Tガラス補強＆低Dk(2.9–3.4)で85Ω±5%安定</text>
        <text x="136" y="69" font-size="6.7" fill="#065f46">・2026年PCIe 5.0/6.0次世代高速基板の必須材</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#064e3b">電子レンジのように信号が熱に化ける誘電損失を10分の1以下へ抑え込む極上ポリマー</text>
      `);

    case 'cfe_uv_laser_50um_microvia':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#eab308"/>
        <rect x="20" y="26" width="92" height="14" fill="#bbf7d0" stroke="#15803d"/>
        <rect x="20" y="42" width="92" height="14" fill="#86efac" stroke="#15803d"/>
        <rect x="20" y="58" width="92" height="14" fill="#bbf7d0" stroke="#15803d"/>
        <polygon points="40,26 52,26 49,40 43,40" fill="#ea580c"/>
        <polygon points="40,42 52,42 49,56 43,56" fill="#ea580c"/>
        <polygon points="78,26 90,26 87,40 81,40" fill="#ea580c"/>
        <polygon points="78,42 90,42 87,56 81,56" fill="#ea580c"/>
        <rect x="38" y="23" width="16" height="3" fill="#eab308"/>
        <rect x="76" y="23" width="16" height="3" fill="#eab308"/>
        <text x="66" y="80" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#854d0e">φ50μm 銅充填スタック (スタブ長=0!)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">UVレーザー ±10〜15 μm精度</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#713f12">C117 UVレーザー50μmマイクロビア</text>
        <text x="136" y="43" font-size="6.7" fill="#854d0e">・355nm UVレーザーで髪の毛より細い縦穴加工</text>
        <text x="136" y="56" font-size="6.7" fill="#854d0e">・純銅完全充填でVIPPO直下実装＆放熱向上</text>
        <text x="136" y="69" font-size="6.7" fill="#854d0e">・余分なスタブが物理ゼロで高周波共振を根絶</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#713f12">0.4mm狭ピッチBGAの真下から反射ゼロで階層移動する、紫外線レーザー彫りの銅エレベータ</text>
      `);

    case 'cfe_mlcc_batio3_soft_term':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="32" y="26" width="68" height="44" rx="2" fill="#d97706" stroke="#92400e"/>
        <line x1="34" y1="34" x2="88" y2="34" stroke="#e2e8f0" stroke-width="2"/>
        <line x1="44" y1="42" x2="98" y2="42" stroke="#e2e8f0" stroke-width="2"/>
        <line x1="34" y1="50" x2="88" y2="50" stroke="#e2e8f0" stroke-width="2"/>
        <line x1="44" y1="58" x2="98" y2="58" stroke="#e2e8f0" stroke-width="2"/>
        <line x1="34" y1="66" x2="88" y2="66" stroke="#e2e8f0" stroke-width="2"/>
        <rect x="26" y="25" width="6" height="46" fill="#ef4444"/>
        <rect x="100" y="25" width="6" height="46" fill="#ef4444"/>
        <rect x="20" y="24" width="6" height="48" rx="2" fill="#94a3b8"/>
        <rect x="106" y="24" width="6" height="48" rx="2" fill="#94a3b8"/>
        <text x="66" y="79" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#9a3412">赤: 導電樹脂クッション(屈曲吸収!)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">たわみ7mm+ / 熱衝撃3000回</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">C118 MLCC BaTiO3＆樹脂端子</text>
        <text x="136" y="43" font-size="6.7" fill="#92400e">・BaTiO3強誘電セラミックとNi極板の数百層積層</text>
        <text x="136" y="56" font-size="6.7" fill="#92400e">・軟らかい導電性エポキシ樹脂層が曲げ力を吸収</text>
        <text x="136" y="69" font-size="6.7" fill="#92400e">・TOUGH 150N曲げ時の陶器割れショートを根絶</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#78350f">割れやすいセラミック素体の両端にゴムクッション電極を挟み、極限の曲げ耐性を実現</text>
      `);

    case 'cfe_atcut_quartz_shear_cavity':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <rect x="22" y="24" width="88" height="48" rx="4" fill="#1e293b" stroke="#eab308" stroke-width="1.6"/>
        <rect x="36" y="42" width="60" height="12" rx="2" fill="#bae6fd" stroke="#38bdf8"/>
        <rect x="52" y="40" width="28" height="16" rx="1.5" fill="#eab308"/>
        <circle cx="34" cy="48" r="3.5" fill="#94a3b8"/>
        <path d="M52 34 H80 M80 62 H52" stroke="#fde047" stroke-width="1.6"/>
        <text x="66" y="32" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fde047">← 厚みすべり振動 →</text>
        <text x="66" y="70" text-anchor="middle" font-size="4.6" fill="#e2e8f0">N2気密キャビティ / 35°15′ ATカット</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">−12〜+72℃ ±20ppm 安定発振</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#713f12">C119 ATカット水晶 圧電振動子</text>
        <text x="136" y="43" font-size="6.7" fill="#854d0e">・結晶Z軸から35°15′の魔法角度で斜め切断</text>
        <text x="136" y="56" font-size="6.7" fill="#854d0e">・厚み約41μmの水晶片が厚みすべり共振</text>
        <text x="136" y="69" font-size="6.7" fill="#854d0e">・N2気密封止で衝撃・経年ドリフトを遮断</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#713f12">極寒から真夏まで3次温度曲線でリズムが狂わない、PCIe高速通信を支える水晶メトロノーム</text>
      `);

    case 'cfe_tvs_snapback_esd_junction':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <line x1="26" y1="74" x2="106" y2="74" stroke="#64748b" stroke-width="1.2"/>
        <line x1="26" y1="22" x2="26" y2="74" stroke="#64748b" stroke-width="1.2"/>
        <path d="M26 74 L76 74 L92 56 L48 52 L56 26" fill="none" stroke="#e11d48" stroke-width="2.2"/>
        <circle cx="92" cy="56" r="2.8" fill="#f59e0b"/>
        <circle cx="48" cy="52" r="2.8" fill="#10b981"/>
        <text x="92" y="50" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#b45309">Vtrig</text>
        <text x="48" y="46" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#047857">Vhold急降下!</text>
        <text x="72" y="34" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#be123c">大ESD電流GND逃し</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#be123c">0.2 pF極小容量 / 応答&lt;0.5 ns</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#881337">C120 0.2pF スナップバックTVS</text>
        <text x="136" y="43" font-size="6.7" fill="#9f1239">・PNPN微小サイリスタが±15kV静電気を検知</text>
        <text x="136" y="56" font-size="6.7" fill="#9f1239">・0.5ns以内に電圧をVholdへ急降下させ保護</text>
        <text x="136" y="69" font-size="6.7" fill="#9f1239">・寄生容量0.2pFで16GT/s高速信号を完全透過</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#881337">普段は透明人間のように信号を通し、静電気の瞬間だけ発動する6nm専用超速避雷針</text>
      `);

    // =========================================================================
    // C121–C126: 6nm Controller Silicon & PCIe Gen4/5 SerDes Engine
    // =========================================================================
    case 'cfe_pcie_tx_ffe_3tap_driver':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <path d="M22 64 L32 64 L34 26 L42 36 L58 36 L60 72 L68 62 L84 62 L86 26 L94 36 L108 36" fill="none" stroke="#2563eb" stroke-width="2.1"/>
        <circle cx="34" cy="26" r="2.6" fill="#ef4444"/>
        <circle cx="60" cy="72" r="2.6" fill="#ef4444"/>
        <text x="66" y="24" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#dc2626">エッジをトゲ状に先読み強調!</text>
        <rect x="22" y="72" width="26" height="8" rx="1.5" fill="#0ea5e9"/><text x="35" y="78" text-anchor="middle" font-size="4.5" fill="#fff">C-1</text>
        <rect x="52" y="72" width="28" height="8" rx="1.5" fill="#eab308"/><text x="66" y="78" text-anchor="middle" font-size="4.5" font-weight="bold" fill="#1e293b">Main C0</text>
        <rect x="84" y="72" width="26" height="8" rx="1.5" fill="#ef4444"/><text x="97" y="78" text-anchor="middle" font-size="4.5" fill="#fff">C+1</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1d4ed8">3タップTX FFE (P0〜P10)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#1e3a8a">C121 送信3タップFFEドライバ</text>
        <text x="136" y="43" font-size="6.7" fill="#1e40af">・前後ビットの重み加算で遷移エッジを強調</text>
        <text x="136" y="56" font-size="6.7" fill="#1e40af">・基板やコネクタの高周波丸まりを事前相殺</text>
        <text x="136" y="69" font-size="6.7" fill="#1e40af">・11プリセットからカメラと最適係数を自動交渉</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#1e3a8a">到着時にちょうど綺麗な四角になるよう逆算して波形を尖らせて送る送信側先読み補正</text>
      `);

    case 'cfe_pcie_rx_ctle_dfe_eq':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <rect x="20" y="24" width="28" height="52" rx="3" fill="#0891b2"/>
        <text x="34" y="47" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">2次</text>
        <text x="34" y="57" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fde047">CTLE</text>
        <path d="M54 50 Q78 24 104 50 Q78 76 54 50 Z" fill="#cffafe" stroke="#06b6d4" stroke-width="2"/>
        <line x1="79" y1="34" x2="79" y2="66" stroke="#eab308" stroke-width="1.4" stroke-dasharray="2 1.5"/>
        <line x1="64" y1="50" x2="94" y2="50" stroke="#eab308" stroke-width="1.4" stroke-dasharray="2 1.5"/>
        <circle cx="79" cy="50" r="2.6" fill="#0284c7"/>
        <text x="79" y="28" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0e7490">DFEで目(アイ)開口!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.7" font-weight="bold" fill="#0e7490">最大−28〜−36 dB 損失補償</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#164e63">C122 受信CTLE＋多タップDFE</text>
        <text x="136" y="43" font-size="6.7" fill="#155e75">・アナログCTLEが弱った高周波成分をブースト</text>
        <text x="136" y="56" font-size="6.7" fill="#155e75">・DFEが過去ビットの残響(ISI)を直接引き算</text>
        <text x="136" y="69" font-size="6.7" fill="#155e75">・ノイズ増幅ゼロでBER 10⁻¹²未満を達成</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#164e63">潰れて読めなくなった16〜32 GT/sの波から、鮮明な「目」をパッと開き直す受信顕微鏡</text>
      `);

    case 'cfe_serdes_lctank_pll_cdr':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#eab308"/>
        <rect x="24" y="24" width="38" height="38" rx="6" fill="none" stroke="#d97706" stroke-width="2"/>
        <rect x="30" y="30" width="26" height="26" rx="4" fill="none" stroke="#eab308" stroke-width="1.8"/>
        <rect x="36" y="36" width="14" height="14" rx="2" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
        <text x="43" y="72" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#92400e">螺旋LC-PLL</text>
        <circle cx="90" cy="43" r="18" fill="#eff6ff" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="90" y1="43" x2="102" y2="33" stroke="#dc2626" stroke-width="2"/>
        <circle cx="90" cy="43" r="2.6" fill="#0284c7"/>
        <text x="90" y="72" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0369a1">64段PI-CDR</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#a16207">1 UI=62.5 ps → 1 ps刻み追尾</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#713f12">C123 螺旋LC-PLL＆PI-CDR復元</text>
        <text x="136" y="43" font-size="6.7" fill="#854d0e">・最上層厚銅うずまきコイルで超低ジッター発振</text>
        <text x="136" y="56" font-size="6.7" fill="#854d0e">・受信データ自身から最適タイミングを自力復元</text>
        <text x="136" y="69" font-size="6.7" fill="#854d0e">・約1ps分解能で62.5psのど真ん中を狙い撃ち</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#713f12">光でさえ1.8cmしか進めない一瞬のど真ん中へ毎ビット自動ピント合わせする超精密時計</text>
      `);

    case 'cfe_pcie_ltssm_128b130b_mac':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <rect x="20" y="24" width="16" height="18" rx="2" fill="#eab308"/>
        <text x="28" y="35" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#1e293b">2b</text>
        <rect x="38" y="24" width="74" height="18" rx="2" fill="#2563eb"/>
        <text x="75" y="35" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">128bit データ (効率98.46%!)</text>
        <rect x="20" y="54" width="20" height="16" rx="2" fill="#64748b"/><text x="30" y="64" text-anchor="middle" font-size="4.4" fill="#fff">Det</text>
        <rect x="44" y="54" width="20" height="16" rx="2" fill="#0ea5e9"/><text x="54" y="64" text-anchor="middle" font-size="4.4" fill="#fff">Poll</text>
        <rect x="68" y="54" width="20" height="16" rx="2" fill="#f59e0b"/><text x="78" y="64" text-anchor="middle" font-size="4.4" fill="#fff">EQ</text>
        <rect x="92" y="54" width="20" height="16" rx="2" fill="#10b981"/><text x="102" y="64" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">L0!</text>
        <text x="66" y="79" text-anchor="middle" font-size="4.6" fill="#1d4ed8">LTSSM 数ミリ秒で16 GT/s開通</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1d4ed8">無駄わずか1.54% (旧20%比)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#1e3a8a">C124 128b/130b符号＆LTSSM</text>
        <text x="136" y="43" font-size="6.7" fill="#1e40af">・128bitに2bit目印のみで帯域効率98.46%</text>
        <text x="136" y="56" font-size="6.7" fill="#1e40af">・挿入直後にGen1→EQ交渉→Gen4 L0へ昇格</text>
        <text x="136" y="69" font-size="6.7" fill="#1e40af">・32bit LCRC＆自動再送でパケット欠損ゼロ</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#1e3a8a">帯域の無駄を極限まで削ぎ落とし、カメラとの超高速回線を瞬時に開通・維持する管制塔</text>
      `);

    case 'cfe_6nm_finfet_6t_sram_cell':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <rect x="24" y="56" width="84" height="16" rx="2" fill="#475569"/>
        <rect x="34" y="34" width="64" height="8" rx="1.5" fill="#06b6d4"/>
        <rect x="34" y="45" width="64" height="8" rx="1.5" fill="#06b6d4"/>
        <rect x="54" y="26" width="24" height="34" rx="2" fill="#eab308" opacity="0.88" stroke="#a16207"/>
        <text x="66" y="45" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#1e293b">Gate</text>
        <text x="66" y="66" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">6nm FinFET / 2nm GAA</text>
        <text x="66" y="80" text-anchor="middle" font-size="4.7" fill="#6d28d9">＋ 6T SRAM (1クロック作業机)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#5b21b6">低電圧0.7Vで発熱をV²削減!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#4c1d95">C125 6nm FinFET/GAA＆6T SRAM</text>
        <text x="136" y="43" font-size="6.7" fill="#5b21b6">・立体フィン/ナノシートをゲートが3〜4面包囲</text>
        <text x="136" y="56" font-size="6.7" fill="#5b21b6">・0.7V級超低電圧駆動でカード温度上昇を抑制</text>
        <text x="136" y="69" font-size="6.7" fill="#5b21b6">・6T SRAM内蔵キャッシュが1ns未満で高速応答</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#4c1d95">漏れ電流を止める立体ナノスイッチと超速作業机が、指先サイズで8K処理を可能にする</text>
      `);

    case 'cfe_ldpc_soft_llr_cgllr':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <circle cx="30" cy="30" r="6" fill="#0ea5e9"/><text x="30" y="32" text-anchor="middle" font-size="5" fill="#fff">V1</text>
        <circle cx="54" cy="30" r="6" fill="#0ea5e9"/><text x="54" y="32" text-anchor="middle" font-size="5" fill="#fff">V2</text>
        <circle cx="78" cy="30" r="6" fill="#0ea5e9"/><text x="78" y="32" text-anchor="middle" font-size="5" fill="#fff">V3</text>
        <circle cx="102" cy="30" r="6" fill="#0ea5e9"/><text x="102" y="32" text-anchor="middle" font-size="5" fill="#fff">V4</text>
        <line x1="30" y1="36" x2="42" y2="58" stroke="#10b981" stroke-width="1.3"/>
        <line x1="54" y1="36" x2="42" y2="58" stroke="#10b981" stroke-width="1.3"/>
        <line x1="54" y1="36" x2="66" y2="58" stroke="#10b981" stroke-width="1.3"/>
        <line x1="78" y1="36" x2="66" y2="58" stroke="#10b981" stroke-width="1.3"/>
        <line x1="78" y1="36" x2="90" y2="58" stroke="#10b981" stroke-width="1.3"/>
        <line x1="102" y1="36" x2="90" y2="58" stroke="#10b981" stroke-width="1.3"/>
        <rect x="36" y="58" width="12" height="12" rx="2" fill="#eab308"/><text x="42" y="66" text-anchor="middle" font-size="5" font-weight="bold" fill="#1e293b">C1</text>
        <rect x="60" y="58" width="12" height="12" rx="2" fill="#eab308"/><text x="66" y="66" text-anchor="middle" font-size="5" font-weight="bold" fill="#1e293b">C2</text>
        <rect x="84" y="58" width="12" height="12" rx="2" fill="#eab308"/><text x="90" y="66" text-anchor="middle" font-size="5" font-weight="bold" fill="#1e293b">C3</text>
        <text x="66" y="79" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#047857">25mV刻みLLR確率伝搬(タナーグラフ)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.7" font-weight="bold" fill="#047857">2026 CGLLR 反復回数−26.3%</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#064e3b">C126 2026 CGLLR ソフトLDPC</text>
        <text x="136" y="43" font-size="6.7" fill="#065f46">・複数Vref読出で各ビットの確信度(LLR)を採点</text>
        <text x="136" y="56" font-size="6.7" fill="#065f46">・確率推理の反復計算で限界劣化データも救出</text>
        <text x="136" y="69" font-size="6.7" fill="#065f46">・2026年10月CGLLR量子化で計算回数26.3%減</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#064e3b">「0らしさ・1らしさ」の確率スコアを全ビットで突き合わせ、壊れた写真も完璧復元</text>
      `);

    // =========================================================================
    // C127–C130: 2026 NVMe Data-Integrity, FDP, Superblock & MOPA Laser
    // =========================================================================
    case 'cfe_nvme_e2e_crc32c_dif':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <rect x="18" y="36" width="20" height="22" rx="3" fill="#0284c7"/><text x="28" y="49" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">PCIe</text>
        <rect x="43" y="36" width="20" height="22" rx="3" fill="#7c3aed"/><text x="53" y="49" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">SRAM</text>
        <rect x="68" y="36" width="20" height="22" rx="3" fill="#d97706"/><text x="78" y="49" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">AES</text>
        <rect x="93" y="36" width="20" height="22" rx="3" fill="#10b981"/><text x="103" y="49" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">NAND</text>
        <line x1="38" y1="47" x2="93" y2="47" stroke="#eab308" stroke-width="2"/>
        <rect x="20" y="64" width="92" height="12" rx="2" fill="#0f766e"/>
        <text x="66" y="72" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#fde047">全区間 CRC-32C + SRAM ECC監視</text>
        <text x="66" y="29" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#0f766e">入口〜出口 サイレント破損ゼロ!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0f766e">T10 DIF / NVMe 64b PI対応</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#134e4a">C127 E2E全区間CRC-32C保護</text>
        <text x="136" y="43" font-size="6.7" fill="#115e59">・カメラ受信直後にセクタ毎のCRC封印タグ付与</text>
        <text x="136" y="56" font-size="6.7" fill="#115e59">・内部SRAM/DRAMもSECDED ECCで1bit自動訂正</text>
        <text x="136" y="69" font-size="6.7" fill="#115e59">・経路途中のサイレントビット化けを100%阻止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#134e4a">NANDだけでなくコントローラ内部の作業机や配線まで全区間を封印シールで連続警備</text>
      `);

    case 'cfe_nvme_fdp_reclaim_units':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <rect x="20" y="24" width="21" height="46" rx="3" fill="#ef4444"/><text x="30.5" y="46" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">RU0</text><text x="30.5" y="56" text-anchor="middle" font-size="4.3" fill="#fee2e2">8K動画</text>
        <rect x="44" y="24" width="21" height="46" rx="3" fill="#eab308"/><text x="54.5" y="46" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#1e293b">RU1</text><text x="54.5" y="56" text-anchor="middle" font-size="4.3" fill="#422006">RAW</text>
        <rect x="68" y="24" width="21" height="46" rx="3" fill="#0ea5e9"/><text x="78.5" y="46" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">RU2</text><text x="78.5" y="56" text-anchor="middle" font-size="4.3" fill="#e0f2fe">Proxy</text>
        <rect x="92" y="24" width="20" height="46" rx="3" fill="#10b981"/><text x="102" y="46" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">RU3</text><text x="102" y="56" text-anchor="middle" font-size="4.3" fill="#d1fae5">Meta</text>
        <text x="66" y="79" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#c2410c">寿命別に物理分離 → GC移動激減!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#c2410c">2026実測 WAF 1.22 → 1.03</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">C128 2026 NVMe FDP柔軟配置</text>
        <text x="136" y="43" font-size="6.7" fill="#9a3412">・動画・写真・メタデータを別RU倉庫へ仕分け</text>
        <text x="136" y="56" font-size="6.7" fill="#9a3412">・無駄な書換増幅(WAF)を理想値1.03へ削減</text>
        <text x="136" y="69" font-size="6.7" fill="#9a3412">・2026年FAST'26実証・標準ブロックI/O互換</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#7c2d12">寿命の違うデータを混ぜないスマート仕分け倉庫で、持続速度低下と寿命劣化を根絶</text>
      `);

    case 'cfe_superblock_interleave_mux':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <rect x="20" y="24" width="19" height="14" rx="2" fill="#0284c7"/><text x="29.5" y="33" text-anchor="middle" font-size="4.5" fill="#fff">D0</text>
        <rect x="42" y="24" width="19" height="14" rx="2" fill="#0ea5e9"/><text x="51.5" y="33" text-anchor="middle" font-size="4.5" fill="#fff">D1</text>
        <rect x="64" y="24" width="19" height="14" rx="2" fill="#0284c7"/><text x="73.5" y="33" text-anchor="middle" font-size="4.5" fill="#fff">D2</text>
        <rect x="86" y="24" width="26" height="14" rx="2" fill="#eab308"/><text x="99" y="33" text-anchor="middle" font-size="4.5" font-weight="bold" fill="#1e293b">XOR</text>
        <rect x="20" y="42" width="19" height="14" rx="2" fill="#0ea5e9"/><text x="29.5" y="51" text-anchor="middle" font-size="4.5" fill="#fff">D3</text>
        <rect x="42" y="42" width="19" height="14" rx="2" fill="#0284c7"/><text x="51.5" y="51" text-anchor="middle" font-size="4.5" fill="#fff">D4</text>
        <rect x="64" y="42" width="19" height="14" rx="2" fill="#0ea5e9"/><text x="73.5" y="51" text-anchor="middle" font-size="4.5" fill="#fff">D5</text>
        <rect x="86" y="42" width="26" height="14" rx="2" fill="#eab308"/><text x="99" y="51" text-anchor="middle" font-size="4.5" font-weight="bold" fill="#1e293b">XOR</text>
        <rect x="20" y="62" width="92" height="14" rx="2" fill="#0369a1"/>
        <text x="66" y="71" text-anchor="middle" font-size="4.9" font-weight="bold" fill="#fde047">1 Superpage 一斉並列ストライプ</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">Ch × Die × Plane 超並列駆動</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">C129 インターリーブ＆スーパーブロック</text>
        <text x="136" y="43" font-size="6.7" fill="#0369a1">・書込待ちダイの裏で別ダイへ間断なく転送</text>
        <text x="136" y="56" font-size="6.7" fill="#0369a1">・全ダイ横断スーパーページで1700MB/s達成</text>
        <text x="136" y="69" font-size="6.7" fill="#0369a1">・XORパリティ統合で1ダイ故障時もデータ救済</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#0c4a6e">複数チャネル・複数ダイ・複数プレーンを束ねる16車線ノンストップ料金所アーキテクチャ</text>
      `);

    case 'cfe_mopa_laser_oxide_pvd_coat':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#475569"/>
        <polygon points="58,18 74,18 66,46" fill="#facc15" opacity="0.72"/>
        <text x="66" y="27" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#a16207">1064nm MOPA</text>
        <rect x="34" y="46" width="64" height="7" rx="1" fill="#0f172a"/>
        <text x="66" y="44" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#1e293b">100nm 黒色酸化膜(無切削!)</text>
        <rect x="20" y="53" width="92" height="7" fill="#94a3b8"/>
        <text x="66" y="59" text-anchor="middle" font-size="4.5" font-weight="bold" fill="#fff">PVD耐摩耗マイクロ結晶層</text>
        <rect x="20" y="60" width="92" height="18" rx="2" fill="#cbd5e1" stroke="#64748b"/>
        <text x="66" y="72" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#334155">SUS304 背面放熱プレート</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">非削溝・永久消えない光干渉黒化</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">C130 MOPA無切削酸化＆PVD層</text>
        <text x="136" y="43" font-size="6.7" fill="#334155">・ナノ秒パルス加熱で表面100nmだけ黒色酸化</text>
        <text x="136" y="56" font-size="6.7" fill="#334155">・金属を彫らず不動態皮膜を守りサビを防止</text>
        <text x="136" y="69" font-size="6.7" fill="#334155">・高硬度PVD層が1万回抜挿の擦り傷を跳ね返す</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.7" fill="#0f172a">インクでも彫刻でもない光の薄膜干渉で印字し、防水・耐食・耐久を完璧に守るナノ外装</text>
      `);

    default:
      return null;
  }
}
