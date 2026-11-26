import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 35B Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (+40 diagrams):
 *   - C131–C170 Kioxia BiCS10 ISSCC 2025/2026, PCIe 4.0 PHY/DLL/NVMe 2.4, LPDDR4X-4266,
 *     Discrete Analog/ESD/PDN, mSAP/TCB/LTS/C-SAM/TOUGH, USB4 ASM2464PD & Sony α7 IV Combo-Slot (170/170 unique!).
 * Every text element is strictly calibrated inside x in [6, 310], y in [8, 114].
 */
export function renderPhase35CfexpressUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // GROUP A: Kioxia BiCS10 ISSCC 2025/2026 & 3D NAND Ultra-Micro (C131–C137)
    // =========================================================================
    case 'cfe_bwwpc_wafer_power_grid':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="22" y="22" width="88" height="16" rx="2" fill="#0284c7"/>
        <text x="66" y="33" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">332層 3D NAND ウエハ</text>
        <rect x="28" y="38" width="8" height="22" fill="#f59e0b"/>
        <rect x="46" y="38" width="8" height="22" fill="#f59e0b"/>
        <rect x="64" y="38" width="8" height="22" fill="#f59e0b"/>
        <rect x="82" y="38" width="8" height="22" fill="#f59e0b"/>
        <rect x="98" y="38" width="8" height="22" fill="#f59e0b"/>
        <rect x="22" y="60" width="88" height="16" rx="2" fill="#7c3aed"/>
        <text x="66" y="71" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">CMOS 制御ウエハ (CBA)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#b45309">BWWPC 直接銅電源接合</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">C131 BWWPC ウエハ間電源グリッド</text>
        <text x="136" y="43" font-size="6.6" fill="#92400e">・最上層厚膜メタル同士を面内全域で直接接合</text>
        <text x="136" y="56" font-size="6.6" fill="#92400e">・並列書込時の電圧降下(IRドロップ)を激減</text>
        <text x="136" y="69" font-size="6.6" fill="#92400e">・4プレーン縦配置で余白面積を約50%縮小</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#78350f">メモリ層とCMOS層の間に太い銅送電網を直結するキオクシアISSCC 2025革新的CBA給電</text>
      `);

    case 'cfe_2ti_dfe_ddsr_receiver':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <rect x="20" y="26" width="28" height="24" rx="3" fill="#0284c7"/>
        <text x="34" y="40" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">SA #1</text>
        <rect x="84" y="26" width="28" height="24" rx="3" fill="#0284c7"/>
        <text x="98" y="40" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">SA #2</text>
        <circle cx="66" cy="38" r="12" fill="#06b6d4" stroke="#0e7490"/>
        <text x="66" y="37" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">DDSR</text>
        <text x="66" y="44" text-anchor="middle" font-size="4.3" fill="#ecfeff">自己ﾘｾｯﾄ</text>
        <path d="M34 26 Q66 16 98 26" fill="none" stroke="#eab308" stroke-width="1.6"/>
        <rect x="24" y="58" width="84" height="16" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="66" y="69" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#92400e">PPVT ピン別VREF自動学習</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0e7490">Toggle 6.0 / 4.8 Gbps 受信</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#164e63">C132 2TI-DFE＋DDSR＆PPVT</text>
        <text x="136" y="43" font-size="6.6" fill="#0e7490">・3入力NAND自己リセットでSA数を4→2へ半減</text>
        <text x="136" y="56" font-size="6.6" fill="#0e7490">・1UI=208psの波形崩れをDFE帰還で瞬間補正</text>
        <text x="136" y="69" font-size="6.6" fill="#0e7490">・ピン別VREF学習でUnmatched-DQSでも安定</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#164e63">自分のデータで瞬間リセットする省エネ2系統DFE受信機で4.8Gbps超高速通信を実現</text>
      `);

    case 'cfe_wl_swing_precharge':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <line x1="22" y1="74" x2="112" y2="74" stroke="#94a3b8" stroke-width="1"/>
        <text x="24" y="71" font-size="4.6" fill="#64748b">0V(VSS)</text>
        <path d="M24 72 L36 30 L52 30 L60 72" fill="none" stroke="#ef4444" stroke-width="1.4" stroke-dasharray="2.5 1.5"/>
        <line x1="22" y1="50" x2="112" y2="50" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="2 2"/>
        <path d="M62 50 L72 30 L88 30 L96 50 L108 50" fill="none" stroke="#0284c7" stroke-width="2.1"/>
        <text x="42" y="25" text-anchor="middle" font-size="4.8" fill="#dc2626">従来(0V放電)</text>
        <text x="88" y="25" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0369a1">中間電位保持</text>
        <text x="90" y="60" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0284c7">V_MID待機</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0369a1">tRead -4μs / 電力 -29%</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">C133 非選択WL 中間電位プリチャージ</text>
        <text x="136" y="43" font-size="6.6" fill="#0369a1">・連続リード時に非選択WLを0Vへ落とさず保持</text>
        <text x="136" y="56" font-size="6.6" fill="#0369a1">・次ページ再昇圧を短縮しtReadを10%高速化</text>
        <text x="136" y="69" font-size="6.6" fill="#0369a1">・充放電ロスを削りリード電力29%削減(ISSCC)</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0c4a6e">毎回0Vまで戻さず中間階で待機する省エネ早ワザで、高速読出と低発熱を同時達成</text>
      `);

    case 'cfe_32die_twintower_stack':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <rect x="20" y="68" width="92" height="9" rx="2" fill="#334155"/>
        <rect x="24" y="60" width="32" height="6" fill="#6366f1"/>
        <rect x="27" y="52" width="32" height="6" fill="#818cf8"/>
        <rect x="30" y="44" width="32" height="6" fill="#6366f1"/>
        <rect x="33" y="36" width="32" height="6" fill="#818cf8"/>
        <rect x="76" y="60" width="32" height="6" fill="#0284c7"/>
        <rect x="73" y="52" width="32" height="6" fill="#38bdf8"/>
        <rect x="70" y="44" width="32" height="6" fill="#0284c7"/>
        <rect x="67" y="36" width="32" height="6" fill="#38bdf8"/>
        <path d="M25 60 Q18 64 22 68 M33 36 Q18 50 21 68" fill="none" stroke="#eab308" stroke-width="1.2"/>
        <path d="M107 60 Q114 64 110 68 M99 36 Q114 50 111 68" fill="none" stroke="#eab308" stroke-width="1.2"/>
        <text x="66" y="28" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#3730a3">16＋16＝32ダイ ツインタワー</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#4338ca">厚さ &lt;2.0 mm / 最大 8 TB</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#312e81">C134 32ダイ ツインタワー極薄積層</text>
        <text x="136" y="43" font-size="6.6" fill="#3730a3">・30〜40μm極薄研削(±2μm公差)を32枚積載</text>
        <text x="136" y="56" font-size="6.6" fill="#3730a3">・2本の階段タワーで11.5×13.5mm枠へ収納</text>
        <text x="136" y="69" font-size="6.6" fill="#3730a3">・片持ち庇への低荷重ワイヤボンドで割れ防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#312e81">コピー用紙1/3の極薄シリコンを2本の塔で32層積む超絶パッケージング実装技術</text>
      `);

    case 'cfe_dummy_channel_support':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="20" y="24" width="92" height="5" fill="#64748b"/>
        <rect x="20" y="34" width="92" height="5" fill="#64748b"/>
        <rect x="20" y="44" width="92" height="5" fill="#64748b"/>
        <rect x="20" y="54" width="92" height="5" fill="#64748b"/>
        <rect x="20" y="64" width="92" height="5" fill="#64748b"/>
        <rect x="28" y="22" width="10" height="54" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <rect x="61" y="22" width="10" height="54" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <rect x="94" y="22" width="10" height="54" rx="2" fill="#cbd5e1" stroke="#334155"/>
        <rect x="46" y="22" width="5" height="54" fill="#eab308"/>
        <rect x="80" y="22" width="5" height="54" fill="#eab308"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#334155">332層 崩落防止ダミー支持柱</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">C135 3D NAND ダミーチャネル支持柱</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・犠牲膜溶解除去時の332層パターン崩落を阻止</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・記憶には使わず純粋な構造鉄骨として機能</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・金属WL充填時の-280MPa圧縮応力も分散</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0f172a">332階建ての仮床を溶かして金属を流す一瞬、超高層セルを支え抜く無言の補強柱</text>
      `);

    case 'cfe_efuse_redundancy_repair':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <line x1="28" y1="24" x2="28" y2="74" stroke="#eab308" stroke-width="2.4"/>
        <line x1="46" y1="24" x2="46" y2="43" stroke="#ef4444" stroke-width="2.4"/>
        <line x1="46" y1="55" x2="46" y2="74" stroke="#ef4444" stroke-width="2.4"/>
        <circle cx="46" cy="49" r="4" fill="#dc2626"/>
        <line x1="64" y1="24" x2="64" y2="74" stroke="#eab308" stroke-width="2.4"/>
        <line x1="82" y1="24" x2="82" y2="74" stroke="#eab308" stroke-width="2.4"/>
        <line x1="100" y1="24" x2="100" y2="74" stroke="#06b6d4" stroke-width="3.0"/>
        <path d="M46 34 Q73 20 100 34" fill="none" stroke="#0891b2" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
        <text x="46" y="81" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#b91c1c">溶断</text>
        <text x="100" y="81" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#0e7490">予備列</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#b91c1c">eFuse 不良列→予備自動置換</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7f1d1d">C136 オンダイ eFuse 冗長救済バンク</text>
        <text x="136" y="43" font-size="6.6" fill="#991b1b">・ウエハ検査で見つけた欠陥列をeFuseで切断</text>
        <text x="136" y="56" font-size="6.6" fill="#991b1b">・起動時に遅延ゼロで予備冗長カラムへ切替</text>
        <text x="136" y="69" font-size="6.6" fill="#991b1b">・数千億セルの巨大2Tbダイを高歩留まり化</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7f1d1d">工場検査で微細キズを電子ヒューズで迂回し、外部から100%無欠陥に見せる救済回路</text>
      `);

    case 'cfe_prog_suspend_resume':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <rect x="20" y="52" width="28" height="18" rx="2" fill="#f59e0b"/>
        <text x="34" y="63" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">書込前半</text>
        <rect x="52" y="52" width="14" height="18" rx="2" fill="#e2e8f0" stroke="#64748b" stroke-dasharray="2 1"/>
        <text x="59" y="63" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#334155">停止</text>
        <rect x="70" y="52" width="42" height="18" rx="2" fill="#f59e0b"/>
        <text x="91" y="63" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">書込再開</text>
        <rect x="46" y="24" width="32" height="18" rx="3" fill="#06b6d4"/>
        <text x="62" y="35" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">緊急読出</text>
        <path d="M52 50 L56 43 M66 43 L70 50" stroke="#059669" stroke-width="1.5"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#047857">割込読出 ~55 μs (通常500μs)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#064e3b">C137 Program-Suspend＆再開パイプ</text>
        <text x="136" y="43" font-size="6.6" fill="#065f46">・長いTLC書込(500μs)を途中で安全一時停止</text>
        <text x="136" y="56" font-size="6.6" fill="#065f46">・カメラ再生やメタデータ読出を55μsで優先</text>
        <text x="136" y="69" font-size="6.6" fill="#065f46">・完了後は中断ステップから即座に書込再開</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#064e3b">書込を一瞬止めて緊急読出を通す「救急車レーン」で、連写直後の再生応答を爆速化</text>
      `);

    // =========================================================================
    // GROUP B: PCIe 4.0 PHY/DLL/Transaction & NVMe 2.1–2.4 Engines (C138–C149)
    // =========================================================================
    case 'cfe_sris_elastic_skp_buf':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <rect x="19" y="34" width="22" height="30" rx="2" fill="#ea580c"/>
        <text x="30" y="48" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">RX</text>
        <text x="30" y="56" text-anchor="middle" font-size="4.3" fill="#ffedd5">SSC揺れ</text>
        <rect x="46" y="28" width="40" height="42" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="52" y="34" width="28" height="8" rx="1" fill="#0284c7"/>
        <rect x="52" y="45" width="28" height="8" rx="1" fill="#f59e0b"/>
        <text x="66" y="51" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">SKP±4B</text>
        <rect x="52" y="56" width="28" height="8" rx="1" fill="#0284c7"/>
        <rect x="91" y="34" width="22" height="30" rx="2" fill="#059669"/>
        <text x="102" y="48" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">Core</text>
        <text x="102" y="56" text-anchor="middle" font-size="4.3" fill="#d1fae5">一定CLK</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#0369a1">±5000 ppm SSC 時計差吸収</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">C138 SRIS/SSC エラスティックFIFO</text>
        <text x="136" y="43" font-size="6.6" fill="#0369a1">・EMI低減用SSCや独立時計(5600ppm)に対応</text>
        <text x="136" y="56" font-size="6.6" fill="#0369a1">・SKP記号の動的増減で178CLK毎のズレ吸収</text>
        <text x="136" y="69" font-size="6.6" fill="#0369a1">・受信FIFOを中央水位に保ちリンク断を防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0c4a6e">パケット隙間のSKP記号をこっそり出し入れし、カメラとカードの時計ズレを完全吸収</text>
      `);

    case 'cfe_pcie_lmr_eye_scanner':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <path d="M24 50 Q66 20 108 50 Q66 80 24 50 Z" fill="#cffafe" stroke="#0891b2" stroke-width="1.8"/>
        <line x1="36" y1="50" x2="96" y2="50" stroke="#d97706" stroke-width="1.6"/>
        <line x1="66" y1="31" x2="66" y2="69" stroke="#dc2626" stroke-width="1.6"/>
        <circle cx="66" cy="50" r="3.2" fill="#f59e0b" stroke="#92400e"/>
        <text x="66" y="27" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#b91c1c">電圧余裕(±mV)</text>
        <text x="66" y="79" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#b45309">時間余裕(±UI)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0e7490">L0稼働中 非破壊アイ計測</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#164e63">C139 PCIe 4.0 LMR アイスキャナ</text>
        <text x="136" y="43" font-size="6.6" fill="#0e7490">・PCIe 4.0(16 GT/s)で必須の内蔵診断機能</text>
        <text x="136" y="56" font-size="6.6" fill="#0e7490">・通信を止めず副サンプラで上下左右の余裕測定</text>
        <text x="136" y="69" font-size="6.6" fill="#0e7490">・Control SKP経由で実機スロット品質を保証</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#164e63">高速通信を1ミリも止めずに16GT/s信号の健康状態(アイ開口)を測る内蔵オシロ</text>
      `);

    case 'cfe_pcie_tlp_replay_lcrc':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <rect x="20" y="42" width="16" height="24" rx="2" fill="#0284c7"/>
        <text x="28" y="56" text-anchor="middle" font-size="4.5" fill="#fff">TLP1</text>
        <rect x="39" y="42" width="16" height="24" rx="2" fill="#0284c7"/>
        <text x="47" y="56" text-anchor="middle" font-size="4.5" fill="#fff">TLP2</text>
        <rect x="58" y="42" width="16" height="24" rx="2" fill="#16a34a"/>
        <text x="66" y="56" text-anchor="middle" font-size="4.5" fill="#fff">TLP3</text>
        <rect x="82" y="40" width="28" height="28" rx="3" fill="#ea580c"/>
        <text x="96" y="52" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">32bit</text>
        <text x="96" y="60" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#ffedd5">LCRC</text>
        <path d="M92 38 Q56 18 28 38" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
        <text x="60" y="27" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#dc2626">Nak検出→即リプレイ再送</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#c2410c">Ack到着までSRAM控え保持</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">C140 TLPリプレイ＆32bit LCRC</text>
        <text x="136" y="43" font-size="6.6" fill="#9a3412">・全TLPへ12bit連番と32bit LCRC検算を付与</text>
        <text x="136" y="56" font-size="6.6" fill="#9a3412">・受信側Ackが届くまで控えをリプレイ保管</text>
        <text x="136" y="69" font-size="6.6" fill="#9a3412">・誤り時はNakで数μs内にハードウェア再送</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7c2d12">電磁ノイズで1ビット化けてもカメラへ気付かせず瞬間再送するデータリンク層の守護神</text>
      `);

    case 'cfe_pcie_bar0_cfg_space':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <rect x="20" y="22" width="66" height="12" rx="2" fill="#eab308"/>
        <text x="53" y="30" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">Class 01:08:02 NVMe</text>
        <rect x="20" y="37" width="66" height="12" rx="2" fill="#0284c7"/>
        <text x="53" y="45" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">64-bit BAR0 MMIO</text>
        <rect x="20" y="52" width="66" height="12" rx="2" fill="#ea580c"/>
        <text x="53" y="60" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">CAP / AQA / ASQ / CC</text>
        <rect x="20" y="67" width="66" height="12" rx="2" fill="#16a34a"/>
        <text x="53" y="75" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">CSTS.RDY = 1 準備完了</text>
        <rect x="92" y="22" width="18" height="57" rx="2" fill="#475569"/>
        <text x="101" y="53" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fde047">DMA</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#a16207">起動時列挙＆バスマスタ開通</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#854d0e">C141 PCIe設定空間＆BAR0 MMIO</text>
        <text x="136" y="43" font-size="6.6" fill="#a16207">・電源ON直後にClass 01:08:02(NVMe)を名乗る</text>
        <text x="136" y="56" font-size="6.6" fill="#a16207">・64bit BAR0へCAP/CC/ドアベル空間を割当</text>
        <text x="136" y="69" font-size="6.6" fill="#a16207">・Bus Master有効化でカード主導DMAを開通</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#854d0e">カメラ起動0.1秒でNVMeカードとして名乗り、超高速DMAバイパス橋を開く入口回路</text>
      `);

    case 'cfe_nvme_sqcq_doorbell':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <circle cx="40" cy="48" r="18" fill="none" stroke="#0284c7" stroke-width="5"/>
        <text x="40" y="47" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">SQ</text>
        <text x="40" y="54" text-anchor="middle" font-size="4.3" fill="#0369a1">64B注文</text>
        <circle cx="92" cy="48" r="18" fill="none" stroke="#16a34a" stroke-width="5"/>
        <text x="92" y="47" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#15803d">CQ</text>
        <text x="92" y="54" text-anchor="middle" font-size="4.3" fill="#15803d">16B完了</text>
        <circle cx="66" cy="48" r="8" fill="#eab308" stroke="#a16207"/>
        <text x="66" y="50" text-anchor="middle" font-size="4.5" font-weight="bold" fill="#fff">4B鈴</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#0f766e">最大65,535組 並列リングキュー</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#134e4a">C142 NVMe SQ/CQ＆ドアベル検出</text>
        <text x="136" y="43" font-size="6.6" fill="#0f766e">・最大65,535本のロックレス並列キューを装備</text>
        <text x="136" y="56" font-size="6.6" fill="#0f766e">・BAR0へ4バイト書込だけで即DMAフェッチ起動</text>
        <text x="136" y="69" font-size="6.6" fill="#0f766e">・RAW/動画/音声の多重ストリームを遅延ゼロ処理</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#134e4a">注文票を置いて4バイトの呼び鈴を鳴らすだけで超並列処理が走るNVMe爆速の秘密</text>
      `);

    case 'cfe_nvme_prp_sgl_dma':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <rect x="20" y="22" width="18" height="11" rx="2" fill="#7c3aed"/>
        <rect x="20" y="37" width="18" height="11" rx="2" fill="#7c3aed"/>
        <rect x="20" y="52" width="18" height="11" rx="2" fill="#7c3aed"/>
        <rect x="20" y="67" width="18" height="11" rx="2" fill="#7c3aed"/>
        <text x="29" y="30" text-anchor="middle" font-size="4.4" fill="#fff">4KB</text>
        <text x="29" y="45" text-anchor="middle" font-size="4.4" fill="#fff">4KB</text>
        <text x="29" y="60" text-anchor="middle" font-size="4.4" fill="#fff">4KB</text>
        <text x="29" y="75" text-anchor="middle" font-size="4.4" fill="#fff">4KB</text>
        <path d="M38 27 Q60 35 76 48 M38 42 Q60 45 76 48 M38 57 Q60 52 76 48 M38 72 Q60 62 76 48" fill="none" stroke="#ea580c" stroke-width="1.6"/>
        <rect x="76" y="26" width="34" height="46" rx="3" fill="#0284c7"/>
        <text x="93" y="47" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fff">Zero-Copy</text>
        <text x="93" y="56" text-anchor="middle" font-size="4.5" fill="#bae6fd">連続DMA</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#1d4ed8">PRP/SGL CPU介在ゼロ集約</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#1e3a8a">C143 NVMe PRP/SGL DMAエンジン</text>
        <text x="136" y="43" font-size="6.6" fill="#1d4ed8">・ホストRAM上の不連続4KBページを自動解析</text>
        <text x="136" y="56" font-size="6.6" fill="#1d4ed8">・CPUコピー無しでSRAM/NANDへ直結転送</text>
        <text x="136" y="69" font-size="6.6" fill="#1d4ed8">・並列DMAタグでGen4 x1 ~1800MB/sを飽和</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#1e3a8a">散らばったRAW写真の4KB断片をカード主導で一撃回収するゼロコピー特急輸送網</text>
      `);

    case 'cfe_nvme_msix_coalescing':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <rect x="20" y="24" width="18" height="12" rx="2" fill="#eab308"/>
        <rect x="42" y="24" width="18" height="12" rx="2" fill="#eab308"/>
        <rect x="20" y="42" width="18" height="12" rx="2" fill="#0284c7"/>
        <rect x="42" y="42" width="18" height="12" rx="2" fill="#0284c7"/>
        <rect x="20" y="60" width="18" height="12" rx="2" fill="#eab308"/>
        <rect x="42" y="60" width="18" height="12" rx="2" fill="#0284c7"/>
        <path d="M60 30 L78 48 M60 48 L78 48 M60 66 L78 48" stroke="#e11d48" stroke-width="1.6"/>
        <circle cx="94" cy="48" r="14" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.8"/>
        <text x="94" y="47" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#9f1239">1回通知</text>
        <text x="94" y="54" text-anchor="middle" font-size="4.4" fill="#be123c">2〜5μs</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#be123c">MSI-X 2048ベクタ＋集約制御</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#881337">C144 MSI-X割込＆コアレッシング</text>
        <text x="136" y="43" font-size="6.6" fill="#9f1239">・キュー別独立MSI-X直通線で最短2〜5μs応答</text>
        <text x="136" y="56" font-size="6.6" fill="#9f1239">・高負荷時は件数/時間閾値で通知を自動集約</text>
        <text x="136" y="69" font-size="6.6" fill="#9f1239">・連写時のカメラCPU負荷と電池消費を削減</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#881337">単写は即答・連写はまとめ報告でカメラCPUの疲労と電池消費を抑える賢い割込秘書</text>
      `);

    case 'cfe_nvme_sanitize_huk_mek':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <rect x="22" y="24" width="88" height="52" rx="4" fill="#3b0764" stroke="#a855f7" stroke-width="1.6"/>
        <circle cx="66" cy="50" r="18" fill="none" stroke="#eab308" stroke-width="3.2"/>
        <circle cx="66" cy="50" r="9" fill="#ef4444"/>
        <text x="66" y="52" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">HUK</text>
        <text x="66" y="38" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fde047">MEK鍵</text>
        <line x1="88" y1="34" x2="104" y2="50" stroke="#ef4444" stroke-width="2"/>
        <line x1="104" y1="34" x2="88" y2="50" stroke="#ef4444" stroke-width="2"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#7e22ce">Sanitize 0x84 ミリ秒完全消去</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#581c87">C145 Sanitize 0x84＆HUK/MEK金庫</text>
        <text x="136" y="43" font-size="6.6" fill="#6b21a8">・シリコン融合HUKで常時AES-256 MEKを保護</text>
        <text x="136" y="56" font-size="6.6" fill="#6b21a8">・MEK破棄だけでOP/不良領域含め一瞬無力化</text>
        <text x="136" y="69" font-size="6.6" fill="#6b21a8">・消去中の電源断でも次回通電時に自動再開</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#581c87">暗号鍵を一瞬で破壊・再生成し、2TBの極秘映像も数ミリ秒で復元不能にする秘密金庫</text>
      `);

    case 'cfe_nvme_apst_autosave':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <rect x="22" y="24" width="14" height="52" rx="2" fill="#ef4444"/>
        <rect x="40" y="34" width="14" height="42" rx="2" fill="#f97316"/>
        <rect x="58" y="46" width="14" height="30" rx="2" fill="#eab308"/>
        <rect x="76" y="58" width="14" height="18" rx="2" fill="#06b6d4"/>
        <rect x="94" y="66" width="14" height="10" rx="2" fill="#16a34a"/>
        <text x="29" y="81" text-anchor="middle" font-size="4.4" fill="#991b1b">PS0</text>
        <text x="47" y="81" text-anchor="middle" font-size="4.4" fill="#9a3412">PS1</text>
        <text x="65" y="81" text-anchor="middle" font-size="4.4" fill="#854d0e">PS2</text>
        <text x="83" y="81" text-anchor="middle" font-size="4.4" fill="#0e7490">PS3</text>
        <text x="101" y="81" text-anchor="middle" font-size="4.4" fill="#166534">PS4</text>
        <path d="M32 24 Q70 32 100 60" fill="none" stroke="#15803d" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
        <text x="82" y="34" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#15803d">-89% 省エネ</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#15803d">アイドル時自律スリープ遷移</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#14532d">C146 NVMe APST 自律省電力タイマー</text>
        <text x="136" y="43" font-size="6.6" fill="#166534">・待機検出でPS0(3.8W)→PS4(&lt;0.05W)自律移行</text>
        <text x="136" y="56" font-size="6.6" fill="#166534">・非アクセス電力を最大89%削減(Auto Power)</text>
        <text x="136" y="69" font-size="6.6" fill="#166534">・次シャッター時は数msで即座に全力復帰</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#14532d">撮影の合間に自動で仮眠し、カメラのバッテリー寿命と8K収録の熱余裕を守る賢い制御</text>
      `);

    case 'cfe_nvme_telemetry_log':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <circle cx="42" cy="50" r="18" fill="#1e293b" stroke="#ea580c" stroke-width="2.2"/>
        <text x="42" y="49" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fde047">Log 0x0D</text>
        <text x="42" y="56" text-anchor="middle" font-size="4.2" fill="#cbd5e1">循環記録</text>
        <rect x="66" y="26" width="44" height="12" rx="2" fill="#ef4444"/>
        <text x="88" y="34" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">高温履歴</text>
        <rect x="66" y="44" width="44" height="12" rx="2" fill="#eab308"/>
        <text x="88" y="52" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">ECCリトライ</text>
        <rect x="66" y="62" width="44" height="12" rx="2" fill="#0284c7"/>
        <text x="88" y="70" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">急電源断</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#b45309">Media Scan Utility 寿命診断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">C147 永続イベントログ＆診断記録</text>
        <text x="136" y="43" font-size="6.6" fill="#92400e">・NVMe 0x02/0x0Dへ異常イベントを時系列保存</text>
        <text x="136" y="56" font-size="6.6" fill="#92400e">・熱スロットルやソフトECC頻度を不揮発記録</text>
        <text x="136" y="69" font-size="6.6" fill="#92400e">・ソニーMedia Scan Utilityへ交換警告を出力</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#78350f">カードの体調と異常履歴をずっと記録し、突然死の前に知らせてくれるフライトレコーダー</text>
      `);

    case 'cfe_ftl_gc_op_compactor':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <rect x="20" y="26" width="11" height="11" fill="#06b6d4"/>
        <rect x="33" y="26" width="11" height="11" fill="#ef4444"/>
        <rect x="20" y="39" width="11" height="11" fill="#ef4444"/>
        <rect x="33" y="39" width="11" height="11" fill="#06b6d4"/>
        <rect x="20" y="52" width="11" height="11" fill="#06b6d4"/>
        <rect x="33" y="52" width="11" height="11" fill="#ef4444"/>
        <text x="32" y="75" text-anchor="middle" font-size="4.6" fill="#b91c1c">断片ブロック</text>
        <path d="M48 45 L62 45" stroke="#0891b2" stroke-width="2"/>
        <polygon points="64,45 59,42 59,48" fill="#0891b2"/>
        <rect x="68" y="26" width="22" height="37" rx="2" fill="#06b6d4"/>
        <text x="79" y="47" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">圧縮</text>
        <rect x="94" y="26" width="16" height="37" rx="2" fill="#eab308"/>
        <text x="102" y="47" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">OP</text>
        <text x="88" y="75" text-anchor="middle" font-size="4.6" fill="#0e7490">整理済＋12%予備</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0e7490">裏方GC圧縮＆隠しOPプール</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#164e63">C148 FTL 裏方GC圧縮＆動的OP</text>
        <text x="136" y="43" font-size="6.6" fill="#0e7490">・散らばった有効ページを集約し旧ブロック消去</text>
        <text x="136" y="56" font-size="6.6" fill="#0e7490">・物理2048GiB中の約12%を隠しOP予備へ確保</text>
        <text x="136" y="69" font-size="6.6" fill="#0e7490">・WAF悪化と動画中の速度スパイクを徹底抑制</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#164e63">裏方の片付け職人と12%の隠し予備部屋で、満杯近くでも連写・動画速度を落とさない</text>
      `);

    case 'cfe_nvme_zns_cinema_zone':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fdf2f8" stroke="#db2777"/>
        <rect x="20" y="24" width="90" height="11" rx="2" fill="#e2e8f0"/>
        <rect x="20" y="24" width="72" height="11" rx="2" fill="#06b6d4"/>
        <circle cx="92" cy="29.5" r="3" fill="#dc2626"/>
        <text x="54" y="32" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">Zone 0: 8K RAW 追記</text>
        <rect x="20" y="40" width="90" height="11" rx="2" fill="#e2e8f0"/>
        <rect x="20" y="40" width="54" height="11" rx="2" fill="#16a34a"/>
        <circle cx="74" cy="45.5" r="3" fill="#dc2626"/>
        <text x="46" y="48" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">Zone 1: X-OCN</text>
        <rect x="20" y="56" width="90" height="11" rx="2" fill="#e2e8f0"/>
        <rect x="20" y="56" width="38" height="11" rx="2" fill="#eab308"/>
        <circle cx="58" cy="61.5" r="3" fill="#dc2626"/>
        <text x="38" y="64" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">Zone 2: Proxy</text>
        <text x="66" y="79" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#be185d">赤点＝ライトポインタ(WP)追記専用</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#be185d">WAF → 1.0 (GCほぼゼロ)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fdf2f8" stroke="#db2777"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#831843">C149 NVMe ZNS シネマ専用ゾーン</text>
        <text x="136" y="43" font-size="6.6" fill="#9d174d">・物理消去ブロック単位の追記専用ゾーン分割</text>
        <text x="136" y="56" font-size="6.6" fill="#9d174d">・異種ファイルの混在を断ちWAFを理論最小1.0へ</text>
        <text x="136" y="69" font-size="6.6" fill="#9d174d">・8K/VPG800連続収録のGCスパイクを根絶</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#831843">映画の連続映像を1本道の専用ゾーンへ順番に流し込み、片付け不要でコマ落ちゼロへ</text>
      `);

    // =========================================================================
    // GROUP C: LPDDR4X-4266 Internal Dual-Channel Sub-Circuits (C150–C153)
    // =========================================================================
    case 'cfe_lpddr4x_8bank_1t1c':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <rect x="20" y="24" width="18" height="22" rx="2" fill="#8b5cf6"/>
        <rect x="41" y="24" width="18" height="22" rx="2" fill="#8b5cf6"/>
        <rect x="20" y="50" width="18" height="22" rx="2" fill="#7c3aed"/>
        <rect x="41" y="50" width="18" height="22" rx="2" fill="#7c3aed"/>
        <rect x="63" y="22" width="6" height="54" rx="1" fill="#eab308"/>
        <rect x="73" y="24" width="18" height="22" rx="2" fill="#0284c7"/>
        <rect x="94" y="24" width="18" height="22" rx="2" fill="#0284c7"/>
        <rect x="73" y="50" width="18" height="22" rx="2" fill="#0369a1"/>
        <rect x="94" y="50" width="18" height="22" rx="2" fill="#0369a1"/>
        <text x="39" y="80" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#6d28d9">Ch-A (16b×8B)</text>
        <text x="92" y="80" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#0369a1">Ch-B (16b×8B)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#6d28d9">VDDQ = 0.6 V 超省エネI/O</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#4c1d95">C150 LPDDR4X 2ch×8バンク配列</text>
        <text x="136" y="43" font-size="6.6" fill="#5b21b6">・独立16bit×2ch＋各8バンクでFTL並列検索</text>
        <text x="136" y="56" font-size="6.6" fill="#5b21b6">・VDDQを1.1V→0.6Vへ下げI/O電力を大幅削減</text>
        <text x="136" y="69" font-size="6.6" fill="#5b21b6">・1T1C極深トレンチ容量を中央センスアンプ増幅</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#4c1d95">2系統8バンクの並列倉庫と0.6V超低電圧I/Oで、2TBのFTL住所録を爆速・低発熱検索</text>
      `);

    case 'cfe_lpddr4x_dbi_encoder':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="66" y="28" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#6b21a8">元: 1 1 1 0 1 1 1 0 (1が6本!)</text>
        <path d="M66 32 L66 42" stroke="#9333ea" stroke-width="1.6"/>
        <polygon points="66,44 63,39 69,39" fill="#9333ea"/>
        <rect x="20" y="46" width="76" height="18" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="58" y="58" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0369a1">0 0 0 1 0 0 0 1</text>
        <rect x="98" y="46" width="14" height="18" rx="3" fill="#eab308"/>
        <text x="105" y="57" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">DBI</text>
        <text x="66" y="76" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0e7490">全反転＋DBI=1 → 同時切替2本へ!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#7e22ce">SSO電源ノイズ最大 50% 低減</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#581c87">C151 LPDDR4X DBI反転エンコーダ</text>
        <text x="136" y="43" font-size="6.6" fill="#6b21a8">・8本中5本以上トグル/Highなら全ビット反転</text>
        <text x="136" y="56" font-size="6.6" fill="#6b21a8">・9本目のDBI信号で受信側が瞬時に元へ復号</text>
        <text x="136" y="69" font-size="6.6" fill="#6b21a8">・同時切替を常に4本以下にしノイズ＆電力削減</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#581c87">「1が多すぎたら白黒ひっくり返す」賢い多数決符号化で4266MT/sの電源揺れを抑止</text>
      `);

    case 'cfe_lpddr4x_trr_tcsr':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <rect x="20" y="24" width="60" height="9" rx="1.5" fill="#94a3b8"/>
        <rect x="20" y="36" width="60" height="9" rx="1.5" fill="#16a34a"/>
        <text x="50" y="42.5" text-anchor="middle" font-size="4.5" font-weight="bold" fill="#fff">N-1 隣接保護(TRR)</text>
        <rect x="20" y="48" width="60" height="9" rx="1.5" fill="#dc2626"/>
        <text x="50" y="54.5" text-anchor="middle" font-size="4.5" font-weight="bold" fill="#fff">N 連打行(Hammer)</text>
        <rect x="20" y="60" width="60" height="9" rx="1.5" fill="#16a34a"/>
        <text x="50" y="66.5" text-anchor="middle" font-size="4.5" font-weight="bold" fill="#fff">N+1 隣接保護(TRR)</text>
        <circle cx="98" cy="48" r="13" fill="#ffedd5" stroke="#ea580c" stroke-width="1.6"/>
        <text x="98" y="47" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#c2410c">TCSR</text>
        <text x="98" y="54" text-anchor="middle" font-size="4.3" fill="#9a3412">温度連動</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#b91c1c">RowHammer防御＆高温2倍保護</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7f1d1d">C152 TRR RowHammer＆TCSR</text>
        <text x="136" y="43" font-size="6.6" fill="#991b1b">・特定行への連打を検知し隣接行(N±1)を優先保護</text>
        <text x="136" y="56" font-size="6.6" fill="#991b1b">・内蔵温度計(MR4)でリフレッシュ周期を自動変更</text>
        <text x="136" y="69" font-size="6.6" fill="#991b1b">・-12℃省電力から+85℃高温データ保全まで対応</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7f1d1d">連打による隣りの列のデータ化けと高温リークを両方防ぐDRAM内部の2重見張り番</text>
      `);

    case 'cfe_lpddr4x_dwl_ca_train':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <path d="M20 36 L30 26 L40 36 L50 26 L60 36 L70 26 L80 36 L90 26 L100 36 L110 26" fill="none" stroke="#eab308" stroke-width="1.8"/>
        <text x="28" y="23" font-size="4.8" font-weight="bold" fill="#a16207">CK時計</text>
        <path d="M20 62 L30 52 L40 62 L50 52 L60 62 L70 52 L80 62 L90 52 L100 62 L110 52" fill="none" stroke="#06b6d4" stroke-width="1.8"/>
        <text x="30" y="74" font-size="4.8" font-weight="bold" fill="#0e7490">DQS位相整合</text>
        <line x1="50" y1="22" x2="50" y2="70" stroke="#16a34a" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
        <line x1="90" y1="22" x2="90" y2="70" stroke="#16a34a" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#7e22ce">1UI=234ps ピコ秒スキュー学習</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#581c87">C153 DWL＆CA-Vref 起動チューナー</text>
        <text x="136" y="43" font-size="6.6" fill="#6b21a8">・起動時にCKとDQSの配線長ズレをDLLで自動整合</text>
        <text x="136" y="56" font-size="6.6" fill="#6b21a8">・6bit CAコマンド線の最適位相とVref-CAを学習</text>
        <text x="136" y="69" font-size="6.6" fill="#6b21a8">・稼働中の温度ドリフトもDQS発振器で追従補正</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#581c87">1mmの配線差が生む6ピコ秒のズレまで起動毎に自動調整し4266MT/sを安定維持</text>
      `);

    // =========================================================================
    // GROUP D: Board-Level Discrete Analog, Power & ESD Support (C154–C160)
    // =========================================================================
    case 'cfe_serdes_uln_ldo_avdd':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <path d="M18 48 L22 38 L26 58 L30 38 L34 58 L38 48" fill="none" stroke="#ef4444" stroke-width="1.6"/>
        <text x="28" y="33" text-anchor="middle" font-size="4.5" fill="#dc2626">PMIC波紋</text>
        <rect x="44" y="32" width="38" height="32" rx="4" fill="#0284c7"/>
        <text x="63" y="46" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">ULN LDO</text>
        <text x="63" y="55" text-anchor="middle" font-size="4.4" fill="#bae6fd">&gt;65dB PSRR</text>
        <line x1="82" y1="48" x2="112" y2="48" stroke="#16a34a" stroke-width="2.4"/>
        <text x="97" y="42" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#15803d">純粋AVDD</text>
        <text x="97" y="58" text-anchor="middle" font-size="4.4" fill="#15803d">0.85V/1.8V</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#0369a1">出力雑音 &lt;10μVrms (PLL専用)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">C154 SerDes専用 超低ノイズLDO</text>
        <text x="136" y="43" font-size="6.6" fill="#0369a1">・PMICのMHzスイッチング波紋を65dB超で濾過</text>
        <text x="136" y="56" font-size="6.6" fill="#0369a1">・16GT/s PLL/VCO専用に静かなAVDDを供給</text>
        <text x="136" y="69" font-size="6.6" fill="#0369a1">・π型フィルタ併用で電源由来ジッタを徹底排除</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0c4a6e">高速通信の時計(PLL)へ「純水のように静かな電気」だけを届けるアナログ最終濾過器</text>
      `);

    case 'cfe_por_bor_supervisor':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <path d="M20 70 L32 32 L72 32 L80 58 L110 58" fill="none" stroke="#0284c7" stroke-width="2.0"/>
        <line x1="20" y1="46" x2="112" y2="46" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="2.5 1.5"/>
        <text x="48" y="28" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#0369a1">3.3V正常</text>
        <text x="95" y="43" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#dc2626">2.93V閾値</text>
        <circle cx="77" cy="46" r="4" fill="#dc2626"/>
        <text x="94" y="72" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#b91c1c">即#RST保護!</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#be123c">±1%精度 電圧低下を数μs検知</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#881337">C155 POR/BOR 電圧監視スーパーバイザ</text>
        <text x="136" y="43" font-size="6.6" fill="#9f1239">・起動時は全レール確立後にクリーン解除(POR)</text>
        <text x="136" y="56" font-size="6.6" fill="#9f1239">・電池切れ等の電圧低下(2.93V未満)を数μs検知</text>
        <text x="136" y="69" font-size="6.6" fill="#9f1239">・低電圧暴走によるNAND誤書込とFTL破損阻止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#881337">中途半端な電圧でチップが暴走して写真を壊す前に非常ブレーキをかける電圧見張りIC</text>
      `);

    case 'cfe_bootstrap_strap_0ohm':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <rect x="20" y="26" width="18" height="10" rx="1.5" fill="#1e293b"/>
        <text x="29" y="33" text-anchor="middle" font-size="4.5" fill="#fde047">0Ω</text>
        <rect x="44" y="26" width="18" height="10" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" stroke-dasharray="2 1"/>
        <text x="53" y="33" text-anchor="middle" font-size="4.3" fill="#64748b">DNI</text>
        <rect x="20" y="44" width="18" height="10" rx="1.5" fill="#1e293b"/>
        <text x="29" y="51" text-anchor="middle" font-size="4.5" fill="#fde047">0Ω</text>
        <rect x="44" y="44" width="18" height="10" rx="1.5" fill="#1e293b"/>
        <text x="53" y="51" text-anchor="middle" font-size="4.5" fill="#fde047">0Ω</text>
        <text x="41" y="68" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#854d0e">0201 設定抵抗群</text>
        <circle cx="92" cy="36" r="8" fill="#eab308" stroke="#a16207"/>
        <circle cx="92" cy="58" r="8" fill="#eab308" stroke="#a16207"/>
        <line x1="92" y1="44" x2="92" y2="50" stroke="#dc2626" stroke-width="2" stroke-dasharray="1.5 1.5"/>
        <text x="92" y="75" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#b45309">ROM_SAFE</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#a16207">起動モード設定＆緊急復旧扉</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#854d0e">C156 0201ストラップ＆ROM_SAFE</text>
        <text x="136" y="43" font-size="6.6" fill="#a16207">・0Ω抵抗の有無で起動元・クロック構成を指定</text>
        <text x="136" y="56" font-size="6.6" fill="#a16207">・1枚のHDI基板で複数NAND/容量版を共通化</text>
        <text x="136" y="69" font-size="6.6" fill="#a16207">・金2連パッド短絡で工場書込やROM復旧モードへ</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#854d0e">電源ONの瞬間にカードの基本設定を伝え、緊急時はデータ救出の扉も開く極小設定回路</text>
      `);

    case 'cfe_smbus_nvme_mi_bus':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <line x1="20" y1="36" x2="80" y2="36" stroke="#eab308" stroke-width="2.2"/>
        <line x1="20" y1="58" x2="80" y2="58" stroke="#06b6d4" stroke-width="2.2"/>
        <text x="36" y="31" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#a16207">SMBCLK</text>
        <text x="36" y="70" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0e7490">SMBDAT</text>
        <rect x="52" y="22" width="10" height="10" rx="1" fill="#334155"/>
        <line x1="57" y1="32" x2="57" y2="36" stroke="#334155" stroke-width="1.2"/>
        <rect x="52" y="44" width="10" height="10" rx="1" fill="#334155"/>
        <line x1="57" y1="54" x2="57" y2="58" stroke="#334155" stroke-width="1.2"/>
        <rect x="80" y="28" width="30" height="38" rx="3" fill="#0f766e"/>
        <text x="95" y="46" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">NVMe</text>
        <text x="95" y="54" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#99f6e4">-MI</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0f766e">2線式 帯域外(OOB)管理バス</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#134e4a">C157 SMBus / I²C NVMe-MI管理バス</text>
        <text x="136" y="43" font-size="6.6" fill="#0f766e">・高速PCIeと完全独立した2線式サイドバンド</text>
        <text x="136" y="56" font-size="6.6" fill="#0f766e">・高負荷時やハング時も温度・健全性を監視可能</text>
        <text x="136" y="69" font-size="6.6" fill="#0f766e">・内部PMIC・温度センサ制御のローカルI²Cも担う</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#134e4a">高速道路が大渋滞しても裏道2本線でカードの温度と体調を聞き出せる専用連絡回線</text>
      `);

    case 'cfe_pcb_sparkgap_esd':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <polygon points="22,30 48,38 22,46" fill="#eab308"/>
        <polygon points="22,52 48,60 22,68" fill="#eab308"/>
        <polygon points="80,30 54,38 80,46" fill="#ea580c"/>
        <polygon points="80,52 54,60 80,68" fill="#ea580c"/>
        <path d="M48 38 L51 35 L54 38 M48 60 L51 57 L54 60" fill="none" stroke="#06b6d4" stroke-width="1.8"/>
        <rect x="86" y="34" width="24" height="28" rx="3" fill="#2563eb"/>
        <text x="98" y="47" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">1MΩ</text>
        <text x="98" y="55" text-anchor="middle" font-size="4.2" fill="#dbeafe">ブリード</text>
        <text x="51" y="27" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#0891b2">0.15mm放電</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#a16207">±15kV ESD 銅箔避雷針</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#854d0e">C158 銅スパークギャップ＆1MΩ抵抗</text>
        <text x="136" y="43" font-size="6.6" fill="#a16207">・対向ノコギリ銅歯がkV級静電気を空中一次放電</text>
        <text x="136" y="56" font-size="6.6" fill="#a16207">・寄生容量&lt;0.05pFで16GT/s高速信号を無劣化維持</text>
        <text x="136" y="69" font-size="6.6" fill="#a16207">・1MΩブリード抵抗で外装の帯電電荷を安全放出</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#854d0e">真冬の1.5万V静電気をTVSダイオードの手前で受け流す、基板銅箔の0.15mm避雷針</text>
      `);

    case 'cfe_pmic_active_discharge':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <path d="M20 70 L46 28 L76 28 L88 70 L110 70" fill="none" stroke="#16a34a" stroke-width="2.2"/>
        <path d="M76 28 Q94 34 110 60" fill="none" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="2.5 1.5"/>
        <text x="35" y="42" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#15803d">緩やか起動</text>
        <text x="96" y="34" text-anchor="middle" font-size="4.4" fill="#dc2626">自然放電(遅)</text>
        <text x="96" y="64" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#c2410c">FET即0V</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#c2410c">突入電流防止＆抜去時急速放電</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#7c2d12">C159 ソフトスタート＆急速放電FET</text>
        <text x="136" y="43" font-size="6.6" fill="#9a3412">・0.5〜2msの滑らか昇圧でカメラ突入電流を抑制</text>
        <text x="136" y="56" font-size="6.6" fill="#9a3412">・抜去時は全レールFETをONし&lt;2msで完全0V化</text>
        <text x="136" y="69" font-size="6.6" fill="#9a3412">・残電圧ラッチアップを防ぎ連続挿抜でも確実起動</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#7c2d12">入れる時は優しく立ち上げ、抜く時は一瞬で電気を抜き切る電源の安全門番FET</text>
      `);

    case 'cfe_pdn_multidecade_mlcc':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <line x1="20" y1="72" x2="112" y2="72" stroke="#64748b" stroke-width="1"/>
        <path d="M22 30 Q36 68 50 38 Q64 68 78 40 Q92 68 108 42" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="2 1.5"/>
        <path d="M22 58 L110 56" fill="none" stroke="#16a34a" stroke-width="2.4"/>
        <rect x="24" y="22" width="18" height="10" rx="1.5" fill="#f59e0b"/>
        <text x="33" y="29" text-anchor="middle" font-size="4.4" fill="#fff">10μF</text>
        <rect x="46" y="23" width="16" height="9" rx="1.5" fill="#ea580c"/>
        <text x="54" y="29.5" text-anchor="middle" font-size="4.3" fill="#fff">1μF</text>
        <rect x="66" y="24" width="18" height="8" rx="1.5" fill="#0284c7"/>
        <text x="75" y="29.5" text-anchor="middle" font-size="4.2" fill="#fff">100nF</text>
        <rect x="88" y="24.5" width="18" height="7.5" rx="1.5" fill="#06b6d4"/>
        <text x="97" y="29.5" text-anchor="middle" font-size="4.2" fill="#fff">10nF</text>
        <text x="66" y="67" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#15803d">Z_PDN 全帯域フラット化</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#a16207">100 kHz 〜 5 GHz 電源安定</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#854d0e">C160 マルチデケードPDNカスケード</text>
        <text x="136" y="43" font-size="6.6" fill="#a16207">・0603/0402/0201/01005を段階組合せ配置</text>
        <text x="136" y="56" font-size="6.6" fill="#a16207">・並列反共振ピークを抑えインピーダンス平坦化</text>
        <text x="136" y="69" font-size="6.6" fill="#a16207">・GHz帯は内層薄誘電体プレーン容量と連携</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#854d0e">大中小のコンデンサと内層銅板の連携で、100kHz〜5GHzの電源ノイズを真っ平らに抑制</text>
      `);

    // =========================================================================
    // GROUP E: mSAP, TCB/LAB, LTS, C-SAM, TOUGH & Environmental Armor (C161–C167)
    // =========================================================================
    case 'cfe_msap_12um_abf_trace':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <polygon points="22,68 28,40 42,40 48,68" fill="#94a3b8"/>
        <text x="35" y="34" text-anchor="middle" font-size="4.6" fill="#475569">従来:台形</text>
        <rect x="64" y="38" width="12" height="30" fill="#d97706"/>
        <rect x="82" y="38" width="12" height="30" fill="#d97706"/>
        <rect x="100" y="38" width="12" height="30" fill="#d97706"/>
        <rect x="60" y="68" width="54" height="8" fill="#15803d"/>
        <text x="87" y="32" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#b45309">mSAP 垂直12/12μm</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#b45309">ABF 矩形極細銅ビルドアップ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">C161 mSAP 12/12μm ABF銅配線</text>
        <text x="136" y="43" font-size="6.6" fill="#92400e">・極薄無電解シード上へ電解めっきで垂直成長</text>
        <text x="136" y="56" font-size="6.6" fill="#92400e">・削る製法の台形誤差を無くし85Ω/100Ω維持</text>
        <text x="136" y="69" font-size="6.6" fill="#92400e">・6nm高密度BGAから最短距離で全配線を引出し</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#78350f">髪の毛1/6の銅線を垂直に積み上げるmSAP工法で、超高密度チップと高速信号品質を両立</text>
      `);

    case 'cfe_tcb_lab_ncf_bond':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <polygon points="56,19 76,19 70,32 62,32" fill="#ef4444"/>
        <text x="66" y="27" text-anchor="middle" font-size="4.4" font-weight="bold" fill="#fff">LAB</text>
        <rect x="26" y="34" width="80" height="12" rx="2" fill="#334155"/>
        <text x="66" y="42" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">6nm コントローラダイ</text>
        <rect x="24" y="46" width="84" height="16" fill="#cffafe" stroke="#06b6d4"/>
        <rect x="34" y="46" width="6" height="16" fill="#eab308"/>
        <rect x="52" y="46" width="6" height="16" fill="#eab308"/>
        <rect x="70" y="46" width="6" height="16" fill="#eab308"/>
        <rect x="88" y="46" width="6" height="16" fill="#eab308"/>
        <rect x="20" y="62" width="92" height="12" rx="2" fill="#15803d"/>
        <text x="66" y="70" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">ABF基板(低熱影響)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#be123c">TCB/LAB＋NCF 反りゼロ接合</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#881337">C162 TCB/LAB＆NCF一括接合</text>
        <text x="136" y="43" font-size="6.6" fill="#9f1239">・精密加圧＋瞬間レーザー加熱で基板の反り根絶</text>
        <text x="136" y="56" font-size="6.6" fill="#9f1239">・非導電フィルム(NCF)で接合と封止を一工程化</text>
        <text x="136" y="69" font-size="6.6" fill="#9f1239">・40μm級狭ピッチのハンダブリッジ不良を激減</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#881337">基板ごと焼かずにダイ側だけを1秒未満で局所接合し、極薄チップの反りと短絡を防ぐ</text>
      `);

    case 'cfe_lts_bisn_warpage_joint':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <path d="M22 36 Q66 22 110 36" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="66" y="26" text-anchor="middle" font-size="4.6" fill="#dc2626">SAC305 (245℃) 大きく反る</text>
        <line x1="22" y1="62" x2="110" y2="62" stroke="#0284c7" stroke-width="3"/>
        <circle cx="36" cy="55" r="5" fill="#94a3b8" stroke="#334155"/>
        <circle cx="56" cy="55" r="5" fill="#94a3b8" stroke="#334155"/>
        <circle cx="76" cy="55" r="5" fill="#94a3b8" stroke="#334155"/>
        <circle cx="96" cy="55" r="5" fill="#94a3b8" stroke="#334155"/>
        <text x="66" y="75" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#0369a1">Bi-Sn LTS (~170℃) 反り -70%</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#334155">極薄0.45mm基板 低温実装</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">C163 低温Bi-Snハンダ(LTS)接合</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・融点138℃/ピーク~170℃で従来比75℃低温化</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・0.45mm極薄HDI基板の動的反りを最大70%低減</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・樹脂補強LTS＋CO2約30%削減の次世代実装</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0f172a">75℃低い温度で優しくハンダ付けし、紙のように薄い8層基板の反りと電力消費を激減</text>
      `);

    case 'cfe_csam_xray_void_gate':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <rect x="22" y="24" width="88" height="52" rx="4" fill="#0f172a" stroke="#06b6d4"/>
        <circle cx="66" cy="50" r="18" fill="none" stroke="#06b6d4" stroke-width="1.2" stroke-dasharray="3 2"/>
        <circle cx="66" cy="50" r="11" fill="none" stroke="#22d3ee" stroke-width="1.4"/>
        <circle cx="44" cy="40" r="4" fill="#94a3b8"/>
        <circle cx="66" cy="50" r="4" fill="#eab308"/>
        <circle cx="88" cy="60" r="4" fill="#94a3b8"/>
        <circle cx="84" cy="38" r="2.6" fill="#ef4444"/>
        <text x="66" y="72" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#67e8f9">IPC-7093 ボイド率 &lt;15%</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#0e7490">C-SAM超音波＋3D X線全数透視</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#164e63">C164 C-SAM＆3DマイクロCT検査</text>
        <text x="136" y="43" font-size="6.6" fill="#0e7490">・超音波エコーで樹脂剥離やTIM気泡を100%反射</text>
        <text x="136" y="56" font-size="6.6" fill="#0e7490">・3D X線CTでBGAハンダボイド＆ワイヤ流れ検査</text>
        <text x="136" y="69" font-size="6.6" fill="#0e7490">・異常発熱・落下断線の芽を出荷前に関所で排除</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#164e63">外から見えないミクロン級の気泡や剥離を超音波と3D X線で丸裸にする品質の最終関所</text>
      `);

    case 'cfe_neutral_axis_150n_bend':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <polygon points="66,30 61,20 71,20" fill="#dc2626"/>
        <text x="86" y="26" font-size="4.8" font-weight="bold" fill="#dc2626">150 N荷重</text>
        <rect x="20" y="32" width="92" height="10" rx="2" fill="#475569"/>
        <text x="66" y="39" text-anchor="middle" font-size="4.4" fill="#fff">表アーマー(圧縮)</text>
        <rect x="20" y="45" width="92" height="10" rx="2" fill="#eab308"/>
        <text x="66" y="52" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">中立軸 y=0 (PCB/Si 歪みゼロ)</text>
        <rect x="20" y="58" width="92" height="10" rx="2" fill="#64748b"/>
        <text x="66" y="65" text-anchor="middle" font-size="4.4" fill="#fff">裏アーマー(引張)</text>
        <polygon points="30,69 25,79 35,79" fill="#334155"/>
        <polygon points="102,69 97,79 107,79" fill="#334155"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#b45309">曲げ150N(10倍) / 落下7.5m</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">C165 150N中立軸サンドイッチ力学</text>
        <text x="136" y="43" font-size="6.6" fill="#92400e">・表裏の剛性外装で曲げ圧縮・引張荷重を負担</text>
        <text x="136" y="56" font-size="6.6" fill="#92400e">・脆いPCBとシリコンを歪みゼロの中立軸へ配置</text>
        <text x="136" y="69" font-size="6.6" fill="#92400e">・一体モールド充填で層間せん断応力を全面分散</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#78350f">約15kgの曲げ力にもシリコンが伸び縮みしない「特等席(中立軸)」へ守るTOUGH構造</text>
      `);

    case 'cfe_eptfe_pressure_vent':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="58" y="22" width="16" height="56" rx="2" fill="#e2e8f0" stroke="#475569" stroke-dasharray="2 1.5"/>
        <text x="66" y="51" text-anchor="middle" font-size="4.4" font-weight="bold" fill="#334155">ePTFE</text>
        <circle cx="34" cy="36" r="8" fill="#0284c7"/>
        <text x="34" y="38" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">水滴</text>
        <line x1="46" y1="31" x2="54" y2="41" stroke="#dc2626" stroke-width="1.8"/>
        <line x1="54" y1="31" x2="46" y2="41" stroke="#dc2626" stroke-width="1.8"/>
        <path d="M26 62 L106 62" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="3 2"/>
        <polygon points="108,62 102,59 102,65" fill="#16a34a"/>
        <text x="92" y="57" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#15803d">空気分子通過</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#334155">IP57防塵防水＋5000m気圧平衡</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">C166 超音波溶着＆ePTFE気圧呼吸</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・超音波ハーメチック溶着で水深1m/30分IP57</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・微多孔0.2μm撥水膜が水滴・砂塵を完全遮断</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・航空機や高山での内外気圧差ダメージを防止</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0f172a">水も砂も絶対に通さず空気圧だけをそっと逃がし、雪山や豪雨でも壊れない耐環境封止</text>
      `);

    case 'cfe_iso7816_xray_ser_guard':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <rect x="52" y="22" width="22" height="56" rx="3" fill="#475569" stroke="#1e293b"/>
        <text x="63" y="48" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fde047">高Z遮蔽</text>
        <text x="63" y="56" text-anchor="middle" font-size="4.2" fill="#e2e8f0">+ULA</text>
        <path d="M20 32 L50 42 L26 52" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <path d="M20 64 L50 58 L28 72" fill="none" stroke="#eab308" stroke-width="1.6"/>
        <text x="34" y="27" text-anchor="middle" font-size="4.5" font-weight="bold" fill="#b91c1c">X線/α線反射</text>
        <rect x="80" y="30" width="30" height="40" rx="3" fill="#0284c7"/>
        <text x="95" y="48" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">NAND</text>
        <text x="95" y="56" text-anchor="middle" font-size="4.4" fill="#bae6fd">無欠損</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#334155">ISO 7816-1 / ULA &lt;0.002</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f1f5f9" stroke="#475569"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0f172a">C167 耐X線(0.1Gy)＆ULA防護層</text>
        <text x="136" y="43" font-size="6.6" fill="#334155">・ISO 7816-1(0.1Gy)空港手荷物X線検査に耐性</text>
        <text x="136" y="56" font-size="6.6" fill="#334155">・超低α(&lt;0.002 cph/cm²)樹脂でソフトエラー防止</text>
        <text x="136" y="69" font-size="6.6" fill="#334155">・SRAM ECC＋NAND LDPCの多層データ防衛</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0f172a">空港X線検査も材料由来の自然アルファ粒子も跳ね返し、海外ロケの写真データを死守</text>
      `);

    // =========================================================================
    // GROUP F: USB4 40Gbps Reader (ASM2464PD) & Sony α7 IV Combo-Slot (C168–C170)
    // =========================================================================
    case 'cfe_asm2464pd_usb4_bridge':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <rect x="19" y="34" width="24" height="30" rx="3" fill="#0f172a"/>
        <text x="31" y="48" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#38bdf8">USB4</text>
        <text x="31" y="56" text-anchor="middle" font-size="4.4" fill="#fff">40Gbps</text>
        <rect x="49" y="26" width="34" height="46" rx="4" fill="#0284c7"/>
        <text x="66" y="42" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">ASM2464</text>
        <text x="66" y="51" text-anchor="middle" font-size="4.4" fill="#fde047">PCIe直通</text>
        <text x="66" y="60" text-anchor="middle" font-size="4.2" fill="#e0f2fe">25→100MHz</text>
        <rect x="89" y="34" width="24" height="30" rx="3" fill="#ea580c"/>
        <text x="101" y="48" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">CFe4</text>
        <text x="101" y="56" text-anchor="middle" font-size="4.3" fill="#ffedd5">1800MB/s</text>
        <line x1="43" y1="49" x2="49" y2="49" stroke="#eab308" stroke-width="2"/>
        <line x1="83" y1="49" x2="89" y2="49" stroke="#eab308" stroke-width="2"/>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#0369a1">USB4 20G×2 PCIeトンネリング</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#0c4a6e">C168 ASM2464PD USB4ブリッジSoC</text>
        <text x="136" y="43" font-size="6.6" fill="#0369a1">・40Gbps USB4内でPCIe Gen4を無変換直結転送</text>
        <text x="136" y="56" font-size="6.6" fill="#0369a1">・10×10mm 1チップに20G×2 PHYと100MHz PLL内蔵</text>
        <text x="136" y="69" font-size="6.6" fill="#0369a1">・約1800MB/s取込で撮影後の転送待ちを半減</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#0c4a6e">40Gbps USB4パイプの中にPCIe 4.0を丸ごと通す、MRW-G3級リーダーの中枢チップ</text>
      `);

    case 'cfe_usbc_cc_bmc_pd_ctrl':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <rect x="20" y="26" width="26" height="44" rx="6" fill="#475569"/>
        <text x="33" y="46" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">USB-C</text>
        <text x="33" y="54" text-anchor="middle" font-size="4.2" fill="#fde047">表/裏OK</text>
        <line x1="46" y1="36" x2="66" y2="36" stroke="#eab308" stroke-width="1.8"/>
        <line x1="46" y1="58" x2="66" y2="58" stroke="#16a34a" stroke-width="1.8"/>
        <text x="56" y="32" text-anchor="middle" font-size="4.4" fill="#a16207">CC1/2</text>
        <text x="56" y="68" text-anchor="middle" font-size="4.4" fill="#15803d">Rd 5.1k</text>
        <rect x="66" y="24" width="46" height="48" rx="4" fill="#059669"/>
        <text x="89" y="38" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">PD 3.1</text>
        <text x="89" y="48" text-anchor="middle" font-size="4.4" fill="#fde047">BMC交渉</text>
        <text x="89" y="58" text-anchor="middle" font-size="4.4" fill="#d1fae5">5V/3A 15W</text>
        <text x="89" y="67" text-anchor="middle" font-size="4.2" fill="#d1fae5">40G MUX切替</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#047857">表裏即判別＆USB4モード交渉</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#064e3b">C169 USB-C CC切替＆PD 3.1制御</text>
        <text x="136" y="43" font-size="6.6" fill="#065f46">・CC1/CC2 5.1kΩ検知で表裏と40G配線を自動反転</text>
        <text x="136" y="56" font-size="6.6" fill="#065f46">・300kbps BMC通信でEnter_USB(40G)を交渉</text>
        <text x="136" y="69" font-size="6.6" fill="#065f46">・5V/3A(15W)契約とOVP/OCP保護で安定駆動</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#064e3b">USB-Cの裏表判別からUSB4モード突入・15W給電交渉まで0.01秒で整える接続外交官</text>
      `);

    case 'cfe_combo_sd_uhs2_interlock':
      return wrapSvg(`
        <rect x="14" y="16" width="104" height="68" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="20" y="22" width="92" height="56" rx="4" fill="#334155"/>
        <rect x="30" y="27" width="72" height="14" rx="2" fill="#0284c7"/>
        <text x="66" y="36" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">CFe Type A (幅20mm・21ピン)</text>
        <rect x="24" y="46" width="84" height="11" rx="1.5" fill="#eab308"/>
        <text x="66" y="53.5" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#713f12">SD UHS-I 1列目 (9ピン)</text>
        <rect x="28" y="61" width="76" height="11" rx="1.5" fill="#ea580c"/>
        <text x="66" y="68.5" text-anchor="middle" font-size="4.6" font-weight="bold" fill="#fff">SD UHS-II 2列目 (8ピンLVDS)</text>
        <text x="66" y="94" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#b45309">1スロット計38ピン 2段共存!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.2" font-weight="bold" fill="#78350f">C170 α7 IV 兼用スロット2段機構</text>
        <text x="136" y="43" font-size="6.6" fill="#92400e">・幅20mm CFe-Aと幅24mm SDを段差ガイドで分離</text>
        <text x="136" y="56" font-size="6.6" fill="#92400e">・奥の21ピンと下段17ピン(計38本)を干渉ゼロ配置</text>
        <text x="136" y="69" font-size="6.6" fill="#92400e">・CD#事前検知でPCIe 3.3VとSD電源を排他切替</text>
        <text x="160" y="108" text-anchor="middle" font-size="6.6" fill="#78350f">全く違う2規格・計38本の金接点を1つの穴に安全同居させたソニーα独自の名機構</text>
      `);

    default:
      return null;
  }
}
