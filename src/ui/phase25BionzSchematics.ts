import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 25A Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (36 diagrams):
 *   - Sony BIONZ XR / BIONZ XR2 Package Internal Ultra-Dissection (XR01–XR36)
 * Every visual element and text line is calibrated strictly inside x ∈ [6, 314].
 */
export function renderPhase25BionzSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'xr_emi_conformal_shield':
      return wrapSvg(`
        <rect x="20" y="24" width="96" height="56" rx="5" fill="#1e293b" stroke="#64748b" stroke-width="3"/>
        <rect x="28" y="34" width="80" height="36" rx="3" fill="#0f766e" stroke="#2dd4bf"/>
        <text x="68" y="55" text-anchor="middle" font-size="7" font-weight="bold" fill="#fff">BIONZ XR/XR2</text>
        <path d="M52 34 Q58 26 64 34" fill="none" stroke="#f43f5e" stroke-width="1.6"/>
        <path d="M74 34 Q80 26 86 34" fill="none" stroke="#f43f5e" stroke-width="1.6"/>
        <text x="68" y="18" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#334155">極薄4μm金属膜で電波封鎖</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">XR01 全面スパッタEMIシールド</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・Cu＋Ni-Cr極薄金属膜で360°接地</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・GHz帯ノイズを1/180以下へ遮断</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・センサー縞やWi-Fi 6E混信を防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">チップ全体を極薄の金属ヘルメットで包み、高速動作の電波ノイズを外へ漏らさない</text>
      `);

    case 'xr_nickel_cu_ihs':
      return wrapSvg(`
        <rect x="16" y="20" width="104" height="16" rx="3" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
        <text x="68" y="31" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">Niめっき無酸素銅 IHS</text>
        <rect x="44" y="50" width="48" height="24" rx="2" fill="#0f766e"/>
        <text x="68" y="65" text-anchor="middle" font-size="6.6" fill="#fff">高温ダイ</text>
        <path d="M68 50 L68 36 M54 50 L28 36 M82 50 L108 36" stroke="#dc2626" stroke-width="1.8"/>
        <text x="68" y="86" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#b45309">放熱面積2.5倍へ拡散!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9a3412">XR02 銅ヒートスプレッダ(IHS)</text>
        <text x="142" y="43" font-size="7.0" fill="#7c2d12">・無酸素銅(k≈398)で熱を全面拡散</text>
        <text x="142" y="56" font-size="7.0" fill="#7c2d12">・Niめっきで酸化防止＆密着性維持</text>
        <text x="142" y="69" font-size="7.0" fill="#7c2d12">・外圧から繊細なシリコンを守る蓋</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">1点に集中したチップの熱を厚い銅の蓋で広い面へ広げ、4K/8K長回し録画を支える</text>
      `);

    case 'xr_tim1_indium_bond':
      return wrapSvg(`
        <rect x="20" y="20" width="96" height="16" rx="2" fill="#d97706"/>
        <text x="68" y="31" text-anchor="middle" font-size="6.4" fill="#fff">銅IHS (ミクロの凹凸)</text>
        <path d="M20 36 L34 40 L48 35 L64 41 L82 35 L98 40 L116 36 L116 54 L20 54 Z" fill="#38bdf8" stroke="#0284c7"/>
        <text x="68" y="49" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#0c4a6e">TIM1 インジウム接合層</text>
        <rect x="20" y="54" width="96" height="20" rx="2" fill="#0f766e"/>
        <text x="68" y="67" text-anchor="middle" font-size="6.6" fill="#fff">シリコンダイ表面</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">XR03 チップ直結 TIM1 界面層</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・断熱材になる空気の隙間を完全充填</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・金属インジウム系なら熱伝導30倍!</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・熱膨張差を吸収しダイ割れを防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">目に見えないミクロの空気の隙間を熱伝導のりで埋め、熱の渋滞をゼロにする</text>
      `);

    case 'xr_pop_lpddr5x_package':
      return wrapSvg(`
        <rect x="22" y="18" width="92" height="22" rx="3" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1.5"/>
        <text x="68" y="32" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">2階: PoP LPDDR5X</text>
        <line x1="36" y1="40" x2="36" y2="54" stroke="#f59e0b" stroke-width="3"/>
        <line x1="68" y1="40" x2="68" y2="54" stroke="#f59e0b" stroke-width="3"/>
        <line x1="100" y1="40" x2="100" y2="54" stroke="#f59e0b" stroke-width="3"/>
        <rect x="22" y="54" width="92" height="24" rx="3" fill="#0f766e" stroke="#115e59" stroke-width="1.5"/>
        <text x="68" y="69" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">1階: BIONZ XR SoC</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#1e40af">XR04 PoP 2階建てメモリ封止</text>
        <text x="142" y="43" font-size="7.0" fill="#1e3a8a">・SoC真上にDRAM+NANDを立体積層</text>
        <text x="142" y="56" font-size="7.0" fill="#1e3a8a">・配線距離＜1mmで超高速＆省電力</text>
        <text x="142" y="69" font-size="7.0" fill="#1e3a8a">・基板面積半減でボディ小型化に貢献</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">頭脳のすぐ真上に作業机(メモリ)を2階建てで重ね、最短距離で超高速データ往復</text>
      `);

    case 'xr_pop_dram_dies':
      return wrapSvg(`
        <rect x="24" y="16" width="88" height="12" rx="2" fill="#3b82f6"/>
        <rect x="28" y="30" width="88" height="12" rx="2" fill="#2563eb"/>
        <rect x="32" y="44" width="88" height="12" rx="2" fill="#1d4ed8"/>
        <rect x="36" y="58" width="88" height="12" rx="2" fill="#1e40af"/>
        <text x="76" y="25" text-anchor="middle" font-size="6.2" fill="#fff">DRAM Die 4 (階段積層)</text>
        <text x="80" y="67" text-anchor="middle" font-size="6.2" fill="#fff">DRAM Die 1 (40μm極薄)</text>
        <text x="68" y="84" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#1d4ed8">4段スタック 大容量バッファ</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#1d4ed8"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#1e3a8a">XR05 4段積層 LPDDR5X ダイ</text>
        <text x="142" y="43" font-size="7.0" fill="#1e3a8a">・厚さ40μmに削ったダイを4階建て</text>
        <text x="142" y="56" font-size="7.0" fill="#1e3a8a">・30コマ/秒RAW＆プリ撮影を一時保存</text>
        <text x="142" y="69" font-size="7.0" fill="#1e3a8a">・最大64〜100 GB/sの超広帯域を実現</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e3a8a">紙より薄いメモリ板を4段重ねて巨大な作業机を作り、連写や8Kデータを一瞬で受け止める</text>
      `);

    case 'xr_pop_wirebond_interposer':
      return wrapSvg(`
        <rect x="28" y="24" width="56" height="14" rx="2" fill="#2563eb"/>
        <rect x="28" y="42" width="64" height="14" rx="2" fill="#1d4ed8"/>
        <path d="M84 30 Q104 20 108 66" fill="none" stroke="#eab308" stroke-width="2"/>
        <path d="M92 48 Q108 40 112 66" fill="none" stroke="#eab308" stroke-width="2"/>
        <rect x="18" y="66" width="102" height="14" rx="2" fill="#14532d"/>
        <text x="69" y="76" text-anchor="middle" font-size="6.4" fill="#fff">PoP 多層インターポーザ</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#854d0e">XR06 PoP純金ワイヤー＆中継板</text>
        <text x="142" y="43" font-size="7.0" fill="#713f12">・φ18μmの純金線で各段ダイを接続</text>
        <text x="142" y="56" font-size="7.0" fill="#713f12">・階段状にズラし高密度ワイヤー配線</text>
        <text x="142" y="69" font-size="7.0" fill="#713f12">・信号長を揃えデータ到着ズレを防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">髪の毛の4分の1の純金アーチ橋が4段のメモリと土台を最短距離でつなぐ</text>
      `);

    case 'xr_tmv_pop_balls':
      return wrapSvg(`
        <rect x="20" y="18" width="96" height="16" rx="2" fill="#1d4ed8"/>
        <text x="68" y="29" text-anchor="middle" font-size="6.4" fill="#fff">上段 LPDDR5X メモリ</text>
        ${[30, 44, 92, 106].map((x) => `<rect x="${x - 3}" y="34" width="6" height="30" rx="2" fill="#d97706"/>`).join('')}
        <rect x="52" y="42" width="32" height="16" rx="2" fill="#0f766e"/>
        <text x="68" y="53" text-anchor="middle" font-size="6" fill="#fff">SoC</text>
        <rect x="20" y="64" width="96" height="14" rx="2" fill="#14532d"/>
        <text x="68" y="74" text-anchor="middle" font-size="6.2" fill="#fff">下段 ABF基板</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9a3412">XR07 TMV / InFO-PoP 垂直柱</text>
        <text x="142" y="43" font-size="7.0" fill="#7c2d12">・封止樹脂を貫く200本超の垂直銅柱</text>
        <text x="142" y="56" font-size="7.0" fill="#7c2d12">・1階SoCと2階メモリを直通エレベータ</text>
        <text x="142" y="69" font-size="7.0" fill="#7c2d12">・わずか0.3mmの距離で遅延を最小化</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">1階と2階を200本以上の極小エレベーターで直結し、写真データを秒速100GB級で運ぶ</text>
      `);

    case 'xr_emc_mold_frame':
      return wrapSvg(`
        <rect x="18" y="20" width="100" height="58" rx="5" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="38" y="34" width="60" height="30" rx="2" fill="#0f766e"/>
        <text x="68" y="52" text-anchor="middle" font-size="6.8" fill="#fff">Siダイ保護</text>
        ${[24, 30, 104, 110].map((x) => `<circle cx="${x}" cy="30" r="2" fill="#94a3b8"/>`).join('')}
        ${[24, 30, 104, 110].map((x) => `<circle cx="${x}" cy="68" r="2" fill="#94a3b8"/>`).join('')}
        <text x="68" y="88" text-anchor="middle" font-size="6.2" fill="#334155">シリカ85%配合 黒色EMC</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">XR08 エポキシ封止樹脂(EMC)</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・85%のシリカ粒を混ぜ熱膨張を抑制</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・湿気・酸化・落下衝撃から完全密閉</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・パッケージの反りを防ぐ黒色装甲</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">ガラスの粉を85%練り込んだ頑丈な黒樹脂が、極寒から猛暑までチップの歪みを防ぐ</text>
      `);

    case 'xr_die_bulk_silicon':
      return wrapSvg(`
        <rect x="20" y="22" width="96" height="16" rx="2" fill="#0ea5e9"/>
        <text x="68" y="33" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">数十億トランジスタ層</text>
        <rect x="20" y="38" width="96" height="40" rx="2" fill="#334155" stroke="#0f172a"/>
        <text x="68" y="56" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#e2e8f0">11N 単結晶シリコン</text>
        <text x="68" y="69" text-anchor="middle" font-size="6.0" fill="#94a3b8">99.999999999%純度</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0369a1"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0c4a6e">XR09 BIONZ XR単結晶Siダイ</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・純度11ナインの究極シリコン結晶板</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・約10×10mmに数十億の電子回路集積</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・BIONZ XR2ではAI NPUも1ダイ統合!</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0c4a6e">爪先サイズの純粋なシリコン結晶の上に、カメラの全知能が都市のように刻まれている</text>
      `);

    case 'xr_slvsec_rx_phy':
      return wrapSvg(`
        <rect x="14" y="24" width="32" height="48" rx="3" fill="#0f766e"/>
        <text x="30" y="51" text-anchor="middle" font-size="6.2" fill="#fff">CMOS</text>
        ${[32, 42, 52, 62].map((y) => `<line x1="46" y1="${y}" x2="80" y2="${y}" stroke="#06b6d4" stroke-width="2"/>`).join('')}
        <text x="63" y="26" text-anchor="middle" font-size="6" font-weight="bold" fill="#0e7490">8〜16レーン</text>
        <rect x="80" y="20" width="44" height="56" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
        <text x="102" y="44" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0369a1">SLVS-EC</text>
        <text x="102" y="56" text-anchor="middle" font-size="6.0" fill="#0369a1">超高速受信</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#155e75">XR10 SLVS-EC超高速受信口</text>
        <text x="142" y="43" font-size="7.0" fill="#164e63">・ソニー独自規格で最大10Gbps×多車線</text>
        <text x="142" y="56" font-size="7.0" fill="#164e63">・66MP 30fpsの膨大な生データを直受</text>
        <text x="142" y="69" font-size="7.0" fill="#164e63">・低振幅差動でノイズ＆消費電力を削減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">イメージセンサーから押し寄せる膨大な画素データを1秒の遅れもなく受け取る高速料金所</text>
      `);

    case 'xr_raw_isp_frontend':
      return wrapSvg(`
        <rect x="14" y="28" width="28" height="36" rx="2" fill="#ef4444" opacity="0.8"/>
        <text x="28" y="49" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">RGGB</text>
        <path d="M44 46 H58" stroke="#0284c7" stroke-width="2"/>
        <rect x="58" y="22" width="66" height="48" rx="4" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
        <text x="91" y="38" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#1d4ed8">RAWフロントISP</text>
        <text x="91" y="50" text-anchor="middle" font-size="5.9" fill="#1e40af">16bitデモザイク</text>
        <text x="91" y="61" text-anchor="middle" font-size="5.9" fill="#1e40af">黒レベル＆レンズ補正</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#1e40af">XR11 RAWデモザイク前段ISP</text>
        <text x="142" y="43" font-size="7.0" fill="#1e3a8a">・赤緑青の点画(ベイヤー)をフルカラー化</text>
        <text x="142" y="56" font-size="7.0" fill="#1e3a8a">・内部16bit精度で白飛び＆黒潰れ抑制</text>
        <text x="142" y="69" font-size="7.0" fill="#1e3a8a">・レンズの歪み・色収差もリアルタイム補正</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">センサーの生の点々データを瞬時に鮮やかなフルカラー写真へ現像する最初の厨房</text>
      `);

    case 'xr_nr_detail_engine':
      return wrapSvg(`
        <rect x="16" y="22" width="44" height="48" rx="3" fill="#334155"/>
        ${[22, 30, 38, 46, 52].map((x, i) => `<circle cx="${x}" cy="${30 + (i * 9) % 34}" r="1.5" fill="#fbbf24"/>`).join('')}
        <text x="38" y="80" text-anchor="middle" font-size="6.2" fill="#475569">高ISOノイズ</text>
        <path d="M62 46 H76" stroke="#14b8a6" stroke-width="2.2"/>
        <rect x="76" y="22" width="46" height="48" rx="3" fill="#0d9488"/>
        <text x="99" y="43" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">質感を残し</text>
        <text x="99" y="55" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">ノイズ消去</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#115e59">XR12 領域分割NR＆ディテール</text>
        <text x="142" y="43" font-size="7.0" fill="#134e4a">・空は滑らかに、まつ毛はクッキリ分離</text>
        <text x="142" y="56" font-size="7.0" fill="#134e4a">・3D時間軸NRで暗所動画のザラつき削減</text>
        <text x="142" y="69" font-size="7.0" fill="#134e4a">・F16回折ボケも光学データで復元</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#115e59">「ザラザラ雑音」と「髪の毛の細かい線」を見分けて夜景でもクリアな立体感を描く</text>
      `);

    case 'xr_color_3dlut_engine':
      return wrapSvg(`
        <rect x="20" y="22" width="38" height="48" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="39" y="44" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#92400e">3D LUT</text>
        <text x="39" y="56" text-anchor="middle" font-size="5.8" fill="#92400e">色変換表</text>
        <path d="M60 46 H74" stroke="#ec4899" stroke-width="2"/>
        <rect x="74" y="22" width="48" height="15" rx="2" fill="#f43f5e"/>
        <rect x="74" y="39" width="48" height="15" rx="2" fill="#10b981"/>
        <rect x="74" y="56" width="48" height="15" rx="2" fill="#3b82f6"/>
        <text x="98" y="32" text-anchor="middle" font-size="6.0" fill="#fff">S-Cinetone</text>
        <text x="98" y="49" text-anchor="middle" font-size="6.0" fill="#fff">クリエイティブ</text>
        <text x="98" y="66" text-anchor="middle" font-size="6.0" fill="#fff">10bit S-Log3</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9d174d">XR13 カラー＆3D-LUT色彩処理</text>
        <text x="142" y="43" font-size="7.0" fill="#831843">・S-Cinetone映画肌色をリアルタイム再現</text>
        <text x="142" y="56" font-size="7.0" fill="#831843">・ディープラーニングAWBで自然な白再現</text>
        <text x="142" y="69" font-size="7.0" fill="#831843">・10bit 10億色＆カスタムLUT撮影対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9d174d">写真の「色味と空気感」を仕上げるプロの色彩職人。撮って出しで映画の肌色を作る</text>
      `);

    case 'xr_ai_npu_systolic':
      return wrapSvg(`
        ${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => `<rect x="${20 + c * 22}" y="${20 + r * 18}" width="18" height="14" rx="2" fill="#7c3aed" stroke="#c4b5fd"/>`)).join('')}
        <text x="51" y="84" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#5b21b6">シストリックMAC行列</text>
        <path d="M86 46 H98" stroke="#8b5cf6" stroke-width="2"/>
        <rect x="98" y="26" width="28" height="40" rx="3" fill="#ede9fe" stroke="#7c3aed"/>
        <text x="112" y="43" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#5b21b6">骨格</text>
        <text x="112" y="55" text-anchor="middle" font-size="6.0" fill="#5b21b6">瞳AF</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#5b21b6">XR14 統合AI NPU (XR2核!)</text>
        <text x="142" y="43" font-size="7.0" fill="#4c1d95">・BIONZ XR2でAI頭脳を同一チップ統合</text>
        <text x="142" y="56" font-size="7.0" fill="#4c1d95">・人骨格/鳥/昆虫/乗り物を60回/秒推論</text>
        <text x="142" y="69" font-size="7.0" fill="#4c1d95">・別チップ通信不要で消費電力大幅削減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#5b21b6">2025–2026年BIONZ XR2最大の革新！AI専門の掛け算工場を心臓部へ一体化</text>
      `);

    case 'xr_arm_cpu_cluster':
      return wrapSvg(`
        <rect x="18" y="20" width="46" height="26" rx="3" fill="#0284c7"/>
        <text x="41" y="36" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">Core 0–1 Linux</text>
        <rect x="68" y="20" width="52" height="26" rx="3" fill="#0d9488"/>
        <text x="94" y="36" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">Core 2–3 RTOS</text>
        <rect x="18" y="52" width="102" height="22" rx="3" fill="#e2e8f0" stroke="#475569"/>
        <text x="69" y="66" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0f172a">4× ARM Cortex-A35 司令塔</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">XR15 4コアARM CPUクラスタ</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・CXD90057 "Mira" の4×Cortex-A35</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・Linux(UI/通信)＋μITRON(撮影制御)</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・電源ONから約0.5秒で即撮影スタンバイ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">メニュー表示とシャッター瞬時制御を2つのOSで分担する、カメラの総合オーケストラ指揮者</text>
      `);

    case 'xr_sa_dsp_af_core':
      return wrapSvg(`
        <rect x="16" y="20" width="50" height="54" rx="4" fill="#f59e0b" stroke="#b45309"/>
        <text x="41" y="41" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">SA DSP</text>
        <text x="41" y="53" text-anchor="middle" font-size="6.0" fill="#fef3c7">"sabin"</text>
        <text x="41" y="64" text-anchor="middle" font-size="5.6" fill="#fff">32bit独自核</text>
        <path d="M68 34 H82 M68 58 H82" stroke="#d97706" stroke-width="2"/>
        <rect x="82" y="22" width="42" height="22" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="103" y="36" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#92400e">759点AF</text>
        <rect x="82" y="50" width="42" height="22" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="103" y="64" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#92400e">5軸IBIS</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#92400e">XR16 ソニー独自SA DSP演算核</text>
        <text x="142" y="43" font-size="7.0" fill="#78350f">・専用32bit DSPが像面位相差AFを瞬算</text>
        <text x="142" y="56" font-size="7.0" fill="#78350f">・1秒間60〜120回の超高速ピント追尾</text>
        <text x="142" y="69" font-size="7.0" fill="#78350f">・ジャイロ連動8.0段IBISも同時制御</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">飛ぶ野鳥のピント計算と手ブレ補正の連立方程式を一瞬で解くソニー秘伝の算術エンジン</text>
      `);

    case 'xr_video_codec_hevc':
      return wrapSvg(`
        <rect x="16" y="24" width="40" height="44" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="36" y="44" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0369a1">7K/8K</text>
        <text x="36" y="56" text-anchor="middle" font-size="5.8" fill="#0369a1">非圧縮</text>
        <path d="M58 46 H74" stroke="#e11d48" stroke-width="2.2"/>
        <rect x="74" y="20" width="50" height="52" rx="4" fill="#be123c"/>
        <text x="99" y="39" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">HEVC/H.265</text>
        <text x="99" y="51" text-anchor="middle" font-size="5.9" fill="#ffe4e6">10bit 4:2:2</text>
        <text x="99" y="63" text-anchor="middle" font-size="5.9" fill="#ffe4e6">XAVC HS/S-I</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9f1239">XR17 動画HEVC圧縮コーデック</text>
        <text x="142" y="43" font-size="7.0" fill="#881337">・7Kオーバーサンプル4K60p/8K30p対応</text>
        <text x="142" y="56" font-size="7.0" fill="#881337">・10bit 4:2:2色情報を専用回路で高速圧縮</text>
        <text x="142" y="69" font-size="7.0" fill="#881337">・CPUを使わず低発熱で長時間録画!</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">巨大な生動画を画質を落とさず数十分の1へぎゅっと圧縮してカードへ収める専用工場</text>
      `);

    case 'xr_audio_dsp_noisecut':
      return wrapSvg(`
        <path d="M16 46 Q24 22 32 46 T48 46 T64 46" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
        <path d="M16 46 Q28 32 40 46 T64 46" fill="none" stroke="#06b6d4" stroke-width="2.2"/>
        <path d="M68 46 H80" stroke="#0284c7" stroke-width="2"/>
        <rect x="80" y="24" width="44" height="44" rx="4" fill="#cffafe" stroke="#0891b2"/>
        <text x="102" y="43" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#155e75">音声DSP</text>
        <text x="102" y="55" text-anchor="middle" font-size="5.8" fill="#155e75">AI雑音除去</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#155e75">XR18 統合オーディオ＆AI静音DSP</text>
        <text x="142" y="43" font-size="7.0" fill="#164e63">・4ch 24bit / 32bit Float音声を直接処理</text>
        <text x="142" y="56" font-size="7.0" fill="#164e63">・風音・空調・ズーム駆動音をAIで分離</text>
        <text x="142" y="69" font-size="7.0" fill="#164e63">・映像フレームとリップシンク完全同期</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">映像処理と同時に4チャンネル音声のノイズ除去まで1チップでこなす内蔵音響ミキサー</text>
      `);

    case 'xr_sram_linebuffer':
      return wrapSvg(`
        ${[0, 1, 2, 3].map((i) => `<rect x="20" y="${20 + i * 14}" width="96" height="10" rx="2" fill="#0d9488" opacity="${0.55 + i * 0.14}"/>`).join('')}
        <text x="68" y="48" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">超高速オンダイ SRAM</text>
        <text x="68" y="84" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#115e59">待ち時間 1ns 未満!</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#115e59">XR19 オンダイSRAMラインバッファ</text>
        <text x="142" y="43" font-size="7.0" fill="#134e4a">・チップ内部の数十MB超高速キャッシュ</text>
        <text x="142" y="56" font-size="7.0" fill="#134e4a">・6トランジスタセルで1ナノ秒級応答</text>
        <text x="142" y="69" font-size="7.0" fill="#134e4a">・外部DRAM往復を減らし大幅省電力化</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#115e59">計算中の画素をすぐ手元のポケット(SRAM)に置いて処理し、バッテリー消費を抑えつつ超高速化</text>
      `);

    case 'xr_ddr_mem_controller':
      return wrapSvg(`
        <rect x="20" y="20" width="96" height="18" rx="3" fill="#1d4ed8"/>
        <text x="68" y="32" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">PoP LPDDR5X メモリ</text>
        <path d="M40 38 V54 M68 38 V54 M96 38 V54" stroke="#3b82f6" stroke-width="2.4"/>
        <rect x="20" y="54" width="96" height="24" rx="3" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
        <text x="68" y="69" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#1e40af">QoS 交通整理メモリ制御</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#1e40af">XR20 LPDDR5Xメモリコントローラ</text>
        <text x="142" y="43" font-size="7.0" fill="#1e3a8a">・ISP/AI/動画/EVFの同時アクセスを捌く</text>
        <text x="142" y="56" font-size="7.0" fill="#1e3a8a">・優先度QoS制御で連写中もEVFカクつきゼロ</text>
        <text x="142" y="69" font-size="7.0" fill="#1e3a8a">・超高速6400〜8533 MT/s PHY駆動</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">連写・AI・8K動画が同時にメモリを使っても渋滞させない、超優秀なデータ交通整理員</text>
      `);

    case 'xr_c2pa_crypto_enclave':
      return wrapSvg(`
        <rect x="26" y="22" width="84" height="54" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="68" cy="43" r="10" fill="none" stroke="#fbbf24" stroke-width="2.4"/>
        <rect x="61" y="48" width="14" height="14" rx="2" fill="#fbbf24"/>
        <text x="68" y="88" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#b45309">改ざん不能 暗号金庫</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#92400e">XR21 C2PA真正性・暗号金庫</text>
        <text x="142" y="43" font-size="7.0" fill="#78350f">・撮影瞬間にハードウェア電子署名を刻印</text>
        <text x="142" y="56" font-size="7.0" fill="#78350f">・AIフェイク画像でない本物の写真を証明</text>
        <text x="142" y="69" font-size="7.0" fill="#78350f">・秘密鍵はチップ内の金庫から絶対に不出</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">生成AI時代に「カメラで撮った本物の写真」だと証明する、チップ内蔵の頑丈な署名金庫</text>
      `);

    case 'xr_pcie_cfx_dma':
      return wrapSvg(`
        <rect x="16" y="26" width="44" height="40" rx="3" fill="#0f766e"/>
        <text x="38" y="49" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">DMA直結</text>
        <path d="M60 46 H80" stroke="#ea580c" stroke-width="2.8"/>
        <rect x="80" y="20" width="44" height="24" rx="3" fill="#ffedd5" stroke="#ea580c"/>
        <text x="102" y="35" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#9a3412">CFexpress</text>
        <rect x="80" y="48" width="44" height="24" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="102" y="63" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#0369a1">SD UHS-II</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9a3412">XR22 PCIe CFexpress DMA</text>
        <text x="142" y="43" font-size="7.0" fill="#7c2d12">・CPU手を煩わせずカードへ爆速直送</text>
        <text x="142" y="56" font-size="7.0" fill="#7c2d12">・CFexpress Type A 4.0で1.6GB/s級書込</text>
        <text x="142" y="69" font-size="7.0" fill="#7c2d12">・ダブルスロット同時バックアップ対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">連写した大量の写真をCPUを介さずベルトコンベア(DMA)で超高速にメモリーカードへ書き出す</text>
      `);

    case 'xr_display_evf_hdmi_tx':
      return wrapSvg(`
        <rect x="16" y="28" width="38" height="36" rx="3" fill="#0284c7"/>
        <text x="35" y="49" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">映像出力</text>
        <path d="M54 34 L76 26 M54 46 L76 46 M54 58 L76 66" stroke="#2563eb" stroke-width="1.8"/>
        <rect x="76" y="18" width="48" height="16" rx="2" fill="#dbeafe" stroke="#2563eb"/>
        <text x="100" y="29" text-anchor="middle" font-size="6.0" fill="#1e40af">EVF 240fps</text>
        <rect x="76" y="38" width="48" height="16" rx="2" fill="#dbeafe" stroke="#2563eb"/>
        <text x="100" y="49" text-anchor="middle" font-size="6.0" fill="#1e40af">4軸背面LCD</text>
        <rect x="76" y="58" width="48" height="16" rx="2" fill="#dbeafe" stroke="#2563eb"/>
        <text x="100" y="69" text-anchor="middle" font-size="6.0" fill="#1e40af">HDMI 16bit</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#1d4ed8">XR23 EVF・LCD・HDMI映像出力</text>
        <text x="142" y="43" font-size="7.0" fill="#1e3a8a">・944万ドットOLED EVFへブラックアウトなし</text>
        <text x="142" y="56" font-size="7.0" fill="#1e3a8a">・フルサイズHDMIから16bit RAW外部出力</text>
        <text x="142" y="69" font-size="7.0" fill="#1e3a8a">・フォーカス枠やゼブラを遅延ゼロ重畳</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1d4ed8">ファインダー・背面液晶・外部モニターの3画面へリアルタイムで滑らかに映像を同時送信</text>
      `);

    case 'xr_usb_network_hub':
      return wrapSvg(`
        <rect x="18" y="22" width="44" height="50" rx="4" fill="#0f766e"/>
        <text x="40" y="45" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">USB 10G</text>
        <text x="40" y="57" text-anchor="middle" font-size="5.8" fill="#ccfbf1">UVC/UAC</text>
        <path d="M62 36 H82 M62 56 H82" stroke="#10b981" stroke-width="2"/>
        <rect x="82" y="24" width="42" height="20" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <text x="103" y="37" text-anchor="middle" font-size="6.1" fill="#166534">4K配信PC</text>
        <rect x="82" y="50" width="42" height="20" rx="3" fill="#dcfce7" stroke="#16a34a"/>
        <text x="103" y="63" text-anchor="middle" font-size="6.1" fill="#166534">Wi-Fi 6E</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#166534">XR24 USB 10Gbps＆通信ハブ</text>
        <text x="142" y="43" font-size="7.0" fill="#14532d">・USB-C 1本で4K60p高画質Webカメラ配信</text>
        <text x="142" y="56" font-size="7.0" fill="#14532d">・Wi-Fi 6E/5Gテザリング高速FTP転送</text>
        <text x="142" y="69" font-size="7.0" fill="#14532d">・α7 V世代はデュアルUSB-C連携にも対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#166534">PCやスマホと繋がって4Kライブ配信や撮影写真の即時クラウド転送をこなす外交通信窓口</text>
      `);

    case 'xr_pll_clock_dvfs_ring':
      return wrapSvg(`
        <rect x="18" y="22" width="100" height="54" rx="6" fill="none" stroke="#eab308" stroke-width="3" stroke-dasharray="6 3"/>
        <path d="M30 49 L40 49 L40 36 L52 36 L52 60 L64 60 L64 36 L76 36 L76 60 L88 60 L88 49 L106 49" fill="none" stroke="#d97706" stroke-width="2"/>
        <text x="68" y="88" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#92400e">PLL脈拍＋DVFS省電力制御</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#854d0e">XR25 PLLクロック＆DVFS制御</text>
        <text x="142" y="43" font-size="7.0" fill="#713f12">・数GHzの正確な脈拍をチップ全域へ同期</text>
        <text x="142" y="56" font-size="7.0" fill="#713f12">・使わない回路はミリ秒単位で自動休止</text>
        <text x="142" y="69" font-size="7.0" fill="#713f12">・α7 Vで電池持ち約25%延長の原動力!</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">全力疾走と省エネ休憩をミリ秒単位で切り替え、電池を長持ちさせるチップの心臓ペースメーカー</text>
      `);

    case 'xr_feol_finfet_gaa':
      return wrapSvg(`
        <rect x="20" y="64" width="96" height="14" fill="#475569"/>
        ${[36, 68, 100].map((x) => `<rect x="${x - 8}" y="28" width="16" height="36" rx="2" fill="#0ea5e9"/><rect x="${x - 12}" y="38" width="24" height="12" rx="2" fill="#eab308" opacity="0.88"/>`).join('')}
        <text x="68" y="22" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0369a1">4nm FinFET / GAA立体ゲート</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0369a1">XR26 FEOL極微トランジスタ層</text>
        <text x="142" y="43" font-size="7.0" fill="#0c4a6e">・数十億個の超極小ON/OFF立体スイッチ</text>
        <text x="142" y="56" font-size="7.0" fill="#0c4a6e">・FinFET/GAAが電流漏れを徹底ブロック</text>
        <text x="142" y="69" font-size="7.0" fill="#0c4a6e">・微細化で演算力UP＆発熱を劇的削減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">シリコン表面の1ミクロン下にびっしり並ぶ、1秒間に何十億回も点滅する超ミクロの電気スイッチ</text>
      `);

    case 'xr_beol_cu_metals':
      return wrapSvg(`
        <rect x="20" y="20" width="96" height="8" rx="1" fill="#b45309"/>
        <rect x="20" y="34" width="44" height="6" rx="1" fill="#d97706"/>
        <rect x="72" y="34" width="44" height="6" rx="1" fill="#d97706"/>
        <rect x="20" y="46" width="96" height="5" rx="1" fill="#f59e0b"/>
        <rect x="20" y="57" width="96" height="4" rx="1" fill="#fbbf24"/>
        <line x1="42" y1="28" x2="42" y2="61" stroke="#92400e" stroke-width="2.5"/>
        <line x1="94" y1="28" x2="94" y2="61" stroke="#92400e" stroke-width="2.5"/>
        <text x="68" y="76" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#92400e">12〜15層 銅立体高速道路</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9a3412">XR27 BEOL多層銅配線スタック</text>
        <text x="142" y="43" font-size="7.0" fill="#7c2d12">・12〜15階建ての超微細な銅の立体道路</text>
        <text x="142" y="56" font-size="7.0" fill="#7c2d12">・下層は数十nm細線、上層は太い電源幹線</text>
        <text x="142" y="69" font-size="7.0" fill="#7c2d12">・Low-k絶縁膜で信号遅延と発熱を低減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">数十億のスイッチ同士を15階建ての立体銅道路で結ぶ、地球上で最も緻密なマイクロ都市網</text>
      `);

    case 'xr_secondary_cetus_chiplet':
      return wrapSvg(`
        <rect x="16" y="26" width="44" height="40" rx="3" fill="#0f766e"/>
        <text x="38" y="44" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">CXD90057</text>
        <text x="38" y="56" text-anchor="middle" font-size="5.8" fill="#ccfbf1">Mira主脳</text>
        <path d="M60 46 H78" stroke="#7c3aed" stroke-width="2.5"/>
        <rect x="78" y="26" width="46" height="40" rx="3" fill="#6d28d9"/>
        <text x="101" y="44" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">CXD90058</text>
        <text x="101" y="56" text-anchor="middle" font-size="5.8" fill="#ede9fe">Cetus副脳</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f5f3ff" stroke="#6d28d9"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#5b21b6">XR28 副プロセッサ CXD90058</text>
        <text x="142" y="43" font-size="7.0" fill="#4c1d95">・通称"Cetus" 4×Cortex-A35副頭脳</text>
        <text x="142" y="56" font-size="7.0" fill="#4c1d95">・リアルタイム処理・I/O・補助ISPを分担</text>
        <text x="142" y="69" font-size="7.0" fill="#4c1d95">・2チップ協調で撮影レスポンスを爆速化</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#5b21b6">主頭脳"Mira"のすぐ隣でリアルタイム制御を分担する頼れる相棒チップ"Cetus"</text>
      `);

    case 'xr_silicon_bridge_lsi':
      return wrapSvg(`
        <rect x="18" y="20" width="42" height="24" rx="2" fill="#0f766e"/>
        <text x="39" y="35" text-anchor="middle" font-size="6.2" fill="#fff">Main Die</text>
        <rect x="76" y="20" width="42" height="24" rx="2" fill="#6d28d9"/>
        <text x="97" y="35" text-anchor="middle" font-size="6.2" fill="#fff">Chiplet</text>
        <rect x="44" y="48" width="48" height="16" rx="2" fill="#06b6d4" stroke="#0e7490" stroke-width="1.5"/>
        <text x="68" y="59" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fff">2.5D Si橋</text>
        <rect x="16" y="68" width="104" height="12" rx="2" fill="#14532d"/>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#155e75">XR29 2.5D高密度シリコン橋</text>
        <text x="142" y="43" font-size="7.0" fill="#164e63">・基板埋め込み極細2μmシリコン配線橋</text>
        <text x="142" y="56" font-size="7.0" fill="#164e63">・チップレット間を数千本の超並列直結</text>
        <text x="142" y="69" font-size="7.0" fill="#164e63">・歩留まり向上と超低消費電力通信を両立</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">2つのチップの足元に埋め込んだ極細シリコンの橋が、あたかも1つの頭脳のように高速連結する</text>
      `);

    case 'xr_c4_copper_bumps':
      return wrapSvg(`
        <rect x="20" y="20" width="96" height="16" rx="2" fill="#0f766e"/>
        <text x="68" y="31" text-anchor="middle" font-size="6.4" fill="#fff">シリコンダイ裏面</text>
        ${[30, 44, 58, 72, 86, 100].map((x) => `<rect x="${x - 3}" y="36" width="6" height="12" fill="#d97706"/><circle cx="${x}" cy="52" r="4" fill="#94a3b8"/>`).join('')}
        <rect x="20" y="58" width="96" height="18" rx="2" fill="#14532d"/>
        <text x="68" y="70" text-anchor="middle" font-size="6.4" fill="#fff">ABF基板トップ電極</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff7ed" stroke="#d97706"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9a3412">XR30 C4銅ピラー・マイクロバンプ</text>
        <text x="142" y="43" font-size="7.0" fill="#7c2d12">・数千〜数万本の50μm極小銅柱で直結</text>
        <text x="142" y="56" font-size="7.0" fill="#7c2d12">・フリップチップ実装で配線を極限短縮</text>
        <text x="142" y="69" font-size="7.0" fill="#7c2d12">・大電流供給＆熱の逃げ道も兼ねる足</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">シリコンチップの裏側全面に並ぶ何千本もの極小の銅の足が、電気と信号を最短距離で繋ぐ</text>
      `);

    case 'xr_capillary_underfill':
      return wrapSvg(`
        <rect x="20" y="20" width="96" height="16" rx="2" fill="#0f766e"/>
        <rect x="18" y="36" width="100" height="22" rx="2" fill="#e11d48" opacity="0.28" stroke="#e11d48"/>
        ${[32, 50, 68, 86, 104].map((x) => `<circle cx="${x}" cy="47" r="4.5" fill="#d97706"/>`).join('')}
        <rect x="20" y="58" width="96" height="16" rx="2" fill="#14532d"/>
        <text x="68" y="86" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#be123c">毛細管現象で隙間を完全補強</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#9f1239">XR31 キャピラリー・アンダーフィル</text>
        <text x="142" y="43" font-size="7.0" fill="#881337">・C4バンプの隙間へ液状樹脂を浸透硬化</text>
        <text x="142" y="56" font-size="7.0" fill="#881337">・熱伸縮ストレスを吸収し接続寿命10倍!</text>
        <text x="142" y="69" font-size="7.0" fill="#881337">・落下衝撃によるバンプ破断を徹底防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">何千本もの極小ハンダの足の隙間を接着樹脂でギュッと固め、何年使っても断線させない</text>
      `);

    case 'xr_esicap_mlcc_decaps':
      return wrapSvg(`
        <rect x="20" y="20" width="96" height="22" rx="2" fill="#0f766e"/>
        <text x="68" y="34" text-anchor="middle" font-size="6.5" fill="#fff">急激な電流消費!</text>
        <path d="M44 58 V42 M68 58 V42 M92 58 V42" stroke="#f59e0b" stroke-width="2.4"/>
        ${[36, 60, 84].map((x) => `<rect x="${x}" y="58" width="16" height="16" rx="2" fill="#ca8a04" stroke="#854d0e"/>`).join('')}
        <text x="68" y="86" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#92400e">直下ミニ給水タンク(MLCC)</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#854d0e">XR32 ランドサイドMLCC / eSiCap</text>
        <text x="142" y="43" font-size="7.0" fill="#713f12">・チップ真下に配置した超低ESL電源タンク</text>
        <text x="142" y="56" font-size="7.0" fill="#713f12">・ナノ秒の急激な電力要求へ瞬時に給電</text>
        <text x="142" y="69" font-size="7.0" fill="#713f12">・0.8V電源の瞬時電圧落ち(ノイズ)防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">チップの真下に電気のミニ給水タンクを並べることで、AI処理が急発進しても電圧が揺れない</text>
      `);

    case 'xr_abf_top_buildup':
      return wrapSvg(`
        <rect x="20" y="20" width="96" height="54" rx="3" fill="#166534" stroke="#14532d"/>
        ${[28, 38, 48, 58, 66].map((y) => `<line x1="26" y1="${y}" x2="110" y2="${y}" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="10 4"/>`).join('')}
        <text x="68" y="86" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#166534">味の素ABF L/S 9μm 微細層</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#166534">XR33 上側ABFビルドアップ層</text>
        <text x="142" y="43" font-size="7.0" fill="#14532d">・日本発の絶縁膜ABFに9〜12μm銅配線</text>
        <text x="142" y="56" font-size="7.0" fill="#14532d">・レーザー微細ビアで多層ファンアウト</text>
        <text x="142" y="69" font-size="7.0" fill="#14532d">・50μmバンプを0.4mm BGAへ広げる変換層</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#166534">日本企業が世界シェアほぼ独占するABF絶縁膜が、極細チップ端子を基板幅へ美しく広げる</text>
      `);

    case 'xr_bt_glass_core_pth':
      return wrapSvg(`
        <rect x="18" y="26" width="100" height="40" rx="3" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>
        ${[34, 56, 78, 100].map((x) => `<rect x="${x - 4}" y="22" width="8" height="48" rx="1" fill="#d97706"/><rect x="${x - 2}" y="24" width="4" height="44" fill="#fef3c7"/>`).join('')}
        <text x="68" y="82" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#166534">BTガラスコア＋樹脂充填PTH</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdf4" stroke="#15803d"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#166534">XR34 BTガラスコア＆PTHビア</text>
        <text x="142" y="43" font-size="7.0" fill="#14532d">・高剛性ガラスクロス骨格で反りを防止</text>
        <text x="142" y="56" font-size="7.0" fill="#14532d">・上下ABF層を貫く銅めっきスルーホール</text>
        <text x="142" y="69" font-size="7.0" fill="#14532d">・穴を樹脂充填し平坦な高密度積層を実現</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#166534">パッケージの背骨となる頑丈なガラス繊維芯材。上下の配線を銅のトンネルでつなぐ</text>
      `);

    case 'xr_abf_bottom_solder_mask':
      return wrapSvg(`
        <rect x="18" y="22" width="100" height="32" rx="3" fill="#14532d"/>
        <text x="68" y="41" text-anchor="middle" font-size="6.5" fill="#dcfce7">緑ソルダーレジストマスク</text>
        ${[30, 48, 68, 88, 106].map((x) => `<rect x="${x - 6}" y="54" width="12" height="8" rx="1" fill="#eab308"/>`).join('')}
        <text x="68" y="78" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#854d0e">ENEPIG 金めっきパッド</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#166534">XR35 下側ABF＆ENEPIGパッド</text>
        <text x="142" y="43" font-size="7.0" fill="#14532d">・緑レジストがハンダ同士のショート防止</text>
        <text x="142" y="56" font-size="7.0" fill="#14532d">・Ni/Pd/Au 3層めっきで高信頼ハンダ接合</text>
        <text x="142" y="69" font-size="7.0" fill="#14532d">・上下対称ABF構成で熱による反りを相殺</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#166534">緑色の保護膜と金めっきの丸い受け皿が、数百個のハンダボールを正確に受け止める</text>
      `);

    case 'xr_sac305_bga_balls':
      return wrapSvg(`
        <rect x="18" y="18" width="100" height="16" rx="2" fill="#14532d"/>
        <text x="68" y="29" text-anchor="middle" font-size="6.3" fill="#fff">BIONZ パッケージ底面</text>
        ${[28, 44, 60, 76, 92, 108].map((x) => `<circle cx="${x}" cy="46" r="6" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>`).join('')}
        <rect x="18" y="58" width="100" height="18" rx="2" fill="#0f766e"/>
        <text x="68" y="70" text-anchor="middle" font-size="6.3" fill="#fff">カメラ12層メイン基板</text>
        <rect x="134" y="14" width="176" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.6" font-weight="bold" fill="#0f172a">XR36 SAC305 BGAハンダボール</text>
        <text x="142" y="43" font-size="7.0" fill="#334155">・0.4mm間隔で並ぶ数百〜1000超の球端子</text>
        <text x="142" y="56" font-size="7.0" fill="#334155">・鉛フリーSn-3Ag-0.5Cu高強度合金採用</text>
        <text x="142" y="69" font-size="7.0" fill="#334155">・245℃リフローで自己整列し完璧接合!</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">底面いっぱいに並んだ銀色の極小ハンダ球が、BIONZの頭脳とカメラ全身の神経を結びつける</text>
      `);

    default:
      return null;
  }
}
