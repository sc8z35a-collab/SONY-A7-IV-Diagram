import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 26B Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (30 diagrams):
 *   - Standalone CFexpress 4.0 Card Ultra-Dissection (Sony CEA-G Type A TOUGH / PCIe Gen4: C01–C30)
 * Every text element is strictly calibrated inside x ∈ [6, 310], y ∈ [8, 114].
 */
export function renderPhase26CfexpressSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'cfe_top_metal_armor':
      return wrapSvg(`
        <rect x="20" y="18" width="90" height="62" rx="5" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <rect x="26" y="24" width="78" height="12" rx="2" fill="#ea580c"/>
        <text x="65" y="33" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">TOUGH 金属アーマー</text>
        <text x="65" y="53" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#f8fafc">耐曲げ 150 N</text>
        <text x="65" y="67" text-anchor="middle" font-size="6.2" fill="#38bdf8">耐落下 7.5 m</text>
        <text x="65" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#334155">実寸 20×28×2.8 mm</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">C01 上面金属放熱アーマーシェル</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・重さ15kgの曲げや7.5m落下に耐える鎧</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・カメラ側放熱ブリッジへ熱を効率よく逃がす</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・-12〜+72℃の過酷なプロ現場保証</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">切手サイズに最強の金属装甲と放熱プレートを合体させ、思い出の写真と8K映像を守り抜く</text>
      `);

    case 'cfe_bottom_metal_shell':
      return wrapSvg(`
        <rect x="20" y="18" width="90" height="62" rx="5" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
        <rect x="28" y="26" width="38" height="22" rx="3" fill="#0f172a"/>
        <text x="47" y="40" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fbbf24">VPG800</text>
        <text x="86" y="39" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#1e293b">レーザー</text>
        <text x="86" y="48" text-anchor="middle" font-size="5.6" fill="#334155">シリアル</text>
        <text x="65" y="68" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">表裏サンドイッチ両面放熱</text>
        <text x="65" y="92" text-anchor="middle" font-size="5.8" fill="#475569">最低書込 400〜800 MB/s 保証</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">C02 下面金属放熱プレート＆VPG刻印</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・表裏両面の金属板で長回し8Kの熱を分散</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・消えないレーザーでVPG規格とシリアル刻印</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・上面シェルと箱型モノコック剛性を形成</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">裏側からも熱を逃がし、プロ動画の最低保証スピード(VPG)をレーザーで刻んだ底面装甲</text>
      `);

    case 'cfe_monolithic_resin':
      return wrapSvg(`
        <rect x="18" y="20" width="96" height="58" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <rect x="30" y="30" width="72" height="38" rx="3" fill="#166534" stroke="#22c55e"/>
        <text x="66" y="47" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#f0fdf4">基板ごと一体成型!</text>
        <text x="66" y="59" text-anchor="middle" font-size="5.6" fill="#bbf7d0">継ぎ目ゼロ・空洞ゼロ</text>
        <text x="66" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0f172a">Sony TOUGH モノリシック構造</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">C03 一体成型モノリシック樹脂枠</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・2分割ケースを廃止し樹脂で丸ごと一体化</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・落としても継ぎ目からパカッと割れない!</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・曲げ剛性10倍＋内部結露ゼロの無敵構造</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">上下のフタを貼るのではなく基板ごと高強度樹脂で固め、絶対に割れない塊にした革命構造</text>
      `);

    case 'cfe_ip57_seal_perimeter':
      return wrapSvg(`
        <rect x="20" y="20" width="92" height="58" rx="6" fill="#ecfeff" stroke="#06b6d4" stroke-width="3"/>
        <circle cx="38" cy="36" r="5" fill="#38bdf8"/>
        <circle cx="94" cy="36" r="5" fill="#38bdf8"/>
        <text x="66" y="47" text-anchor="middle" font-size="8.0" font-weight="bold" fill="#0e7490">IP57 防水</text>
        <text x="66" y="61" text-anchor="middle" font-size="6.0" fill="#155e75">水深1m・30分耐水</text>
        <text x="66" y="90" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0891b2">完全防塵＋内部撥水防湿コート</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#155e75">C04 IP57防水防塵シール＆防湿膜</text>
        <text x="136" y="43" font-size="7.0" fill="#164e63">・水深1mに30分沈めても浸水ゼロ(IP57)</text>
        <text x="136" y="56" font-size="7.0" fill="#164e63">・砂嵐の細かい粉塵も外周密着シールで遮断</text>
        <text x="136" y="69" font-size="7.0" fill="#164e63">・内部基板の撥水コートで塩害・結露も防御</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">川や水たまりに落としても拭き取れば思い出の写真が全部無事で残る鉄壁の防水バリア</text>
      `);

    case 'cfe_21pin_gold_fingers':
      return wrapSvg(`
        <rect x="16" y="26" width="100" height="46" rx="4" fill="#166534" stroke="#14532d" stroke-width="1.5"/>
        <rect x="22" y="40" width="6" height="28" fill="#eab308"/>
        <rect x="31" y="44" width="5" height="24" fill="#facc15"/>
        <rect x="39" y="44" width="5" height="24" fill="#facc15"/>
        <rect x="47" y="40" width="6" height="28" fill="#eab308"/>
        <rect x="56" y="44" width="5" height="24" fill="#facc15"/>
        <rect x="64" y="44" width="5" height="24" fill="#facc15"/>
        <rect x="72" y="40" width="6" height="28" fill="#eab308"/>
        <rect x="81" y="44" width="5" height="24" fill="#facc15"/>
        <rect x="89" y="44" width="5" height="24" fill="#facc15"/>
        <rect x="97" y="40" width="6" height="28" fill="#eab308"/>
        <text x="66" y="36" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fef08a">G-S-S-G 21ピン PCIe Gen4</text>
        <text x="66" y="86" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#854d0e">30µin硬質金メッキ(1万回耐久)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#854d0e">C05 21ピンPCIe硬質金エッジ端子</text>
        <text x="136" y="43" font-size="7.0" fill="#713f12">・高速信号線をGNDで挟むG-S-S-G配列</text>
        <text x="136" y="56" font-size="7.0" fill="#713f12">・電源/GND先行接触で活線挿抜も安全</text>
        <text x="136" y="69" font-size="7.0" fill="#713f12">・PC最新SSDと同じPCIe Gen4(16GT/s)</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">パソコンの高速SSDと同じPCI Express規格を通し、1万回抜き差しできる21本の黄金接点</text>
      `);

    case 'cfe_connector_shroud':
      return wrapSvg(`
        <rect x="18" y="22" width="94" height="52" rx="4" fill="#e2e8f0" stroke="#334155" stroke-width="1.6"/>
        <rect x="26" y="48" width="70" height="20" rx="2" fill="#1e293b"/>
        <rect x="96" y="46" width="14" height="24" fill="#ea580c"/>
        <text x="61" y="61" text-anchor="middle" font-size="6.0" fill="#fbbf24">段差保護シュラウド</text>
        <text x="65" y="38" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">SD＋CFexpress兼用ガイド</text>
        <text x="65" y="88" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#c2410c">非対称キー溝で裏表誤挿入ゼロ!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">C06 誤挿入キー溝＆保護シュラウド</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・SDより小さい20×28mmで兼用スロット共存</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・段差シュラウドが指脂や静電気接触を防止</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・折れやすい細プラスチックリブを完全廃止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">ソニー独自のSD兼用スロットへ真っ直ぐ導き、指脂やピン折れを防ぐ専用ガード構造</text>
      `);

    case 'cfe_hdi_8layer_pcb':
      return wrapSvg(`
        <rect x="20" y="20" width="92" height="10" fill="#166534"/>
        <rect x="20" y="32" width="92" height="6" fill="#ca8a04"/>
        <rect x="20" y="40" width="92" height="10" fill="#15803d"/>
        <rect x="20" y="52" width="92" height="6" fill="#ca8a04"/>
        <rect x="20" y="60" width="92" height="10" fill="#166534"/>
        <line x1="42" y1="20" x2="42" y2="70" stroke="#f97316" stroke-width="2.5"/>
        <line x1="86" y1="20" x2="86" y2="70" stroke="#f97316" stroke-width="2.5"/>
        <text x="66" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#15803d">総厚0.5mm 8層HDI＋85Ω等長配線</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#15803d"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#166534">C07 極薄8層HDI高周波プリント基板</text>
        <text x="136" y="43" font-size="7.0" fill="#14532d">・名刺2枚分(0.5mm)に8階建て立体配線</text>
        <text x="136" y="56" font-size="7.0" fill="#14532d">・等長蛇行配線で16GT/s信号のズレをゼロ化</text>
        <text x="136" y="69" font-size="7.0" fill="#14532d">・低損失高周波材＋貫通銅放熱ビア内蔵</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#166534">厚さ0.5ミリの中に8層もの高速道路を積み上げ、毎秒160億回の信号を乱さず運ぶ土台</text>
      `);

    case 'cfe_pcie4_controller_soc':
      return wrapSvg(`
        <rect x="26" y="20" width="76" height="58" rx="6" fill="#1e3a8a" stroke="#2563eb" stroke-width="2"/>
        <rect x="38" y="30" width="52" height="38" rx="3" fill="#3b82f6"/>
        <text x="64" y="46" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#ffffff">7nm SoC</text>
        <text x="64" y="59" text-anchor="middle" font-size="6.0" fill="#dbeafe">PCIe4 / NVMe2</text>
        <text x="64" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#1d4ed8">最大 1,800〜3,750 MB/s 爆速頭脳</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#1e40af">C08 PCIe 4.0 / NVMe 2.0 コントローラ</text>
        <text x="136" y="43" font-size="7.0" fill="#1e3a8a">・先端7nm/12nm微細化で倍速＆超低発熱</text>
        <text x="136" y="56" font-size="7.0" fill="#1e3a8a">・CFexpress 4.0でPC取込時間を半分以下へ</text>
        <text x="136" y="69" font-size="7.0" fill="#1e3a8a">・SmartIdle待機休止でカメラ発熱も抑制</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">映画1本分の8Kデータを数秒で書き捌く、省エネ・低発熱な超小型SSDの天才指揮官</text>
      `);

    case 'cfe_arm_dualcore_engine':
      return wrapSvg(`
        <rect x="18" y="20" width="94" height="24" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="65" y="35" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#5b21b6">ARM Cortex-R ＋ FTL</text>
        <path d="M40 44 V58 M65 44 V58 M90 44 V58" stroke="#7c3aed" stroke-width="1.8"/>
        <rect x="20" y="58" width="24" height="18" rx="2" fill="#a78bfa"/>
        <rect x="53" y="58" width="24" height="18" rx="2" fill="#a78bfa"/>
        <rect x="86" y="58" width="24" height="18" rx="2" fill="#a78bfa"/>
        <text x="32" y="70" text-anchor="middle" font-size="5.6" fill="#fff">均等</text>
        <text x="65" y="70" text-anchor="middle" font-size="5.6" fill="#fff">均等</text>
        <text x="98" y="70" text-anchor="middle" font-size="5.6" fill="#fff">均等</text>
        <text x="65" y="90" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#6d28d9">ウェアレベリング＋裏ゴミ掃除</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#5b21b6">C09 ARM CPU＆FTL長寿命管理頭脳</text>
        <text x="136" y="43" font-size="7.0" fill="#4c1d95">・全メモリ領域を均等使用し寿命を数倍化</text>
        <text x="136" y="56" font-size="7.0" fill="#4c1d95">・空きブロックを裏で先読み整理しコマ落ゼロ</text>
        <text x="136" y="69" font-size="7.0" fill="#4c1d95">・動画ストリーム優先QoSリアルタイム制御</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#5b21b6">同じ場所ばかり疲れて壊れないよう全部のページを均等に使い分ける賢い図書館司書</text>
      `);

    case 'cfe_ldpc_ecc_engine':
      return wrapSvg(`
        <rect x="16" y="26" width="38" height="40" rx="4" fill="#fee2e2" stroke="#dc2626"/>
        <text x="35" y="44" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#991b1b">101✕0</text>
        <text x="35" y="57" text-anchor="middle" font-size="5.6" fill="#dc2626">ビット化け</text>
        <path d="M54 46 H74" stroke="#10b981" stroke-width="2.2"/>
        <rect x="74" y="26" width="44" height="40" rx="4" fill="#d1fae5" stroke="#059669" stroke-width="1.6"/>
        <text x="96" y="44" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#065f46">10110</text>
        <text x="96" y="57" text-anchor="middle" font-size="5.8" fill="#047857">自動修復!</text>
        <text x="66" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#065f46">4K LDPC 軟判定 (UBER &lt; 10⁻¹⁶)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#065f46">C10 4K LDPC誤り訂正＆全経路保護</text>
        <text x="136" y="43" font-size="7.0" fill="#064e3b">・4KB当たり数百ビットの化けを瞬時修復</text>
        <text x="136" y="56" font-size="7.0" fill="#064e3b">・軟判定復号＋ダイ間パリティで何重も救出</text>
        <text x="136" y="69" font-size="7.0" fill="#064e3b">・全経路CRCチェックでサイレント破損ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#065f46">熱や経年で0と1が化けたエラーを数学パズルのように見つけ出し元通り直す自動ドクター</text>
      `);

    case 'cfe_aes256_crypto_core':
      return wrapSvg(`
        <rect x="26" y="40" width="76" height="38" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
        <path d="M44 40 V28 A20 20 0 0 1 84 28 V40" fill="none" stroke="#b45309" stroke-width="4"/>
        <text x="64" y="58" text-anchor="middle" font-size="7.0" font-weight="bold" fill="#92400e">AES-256 XTS</text>
        <text x="64" y="70" text-anchor="middle" font-size="5.8" fill="#78350f">速度低下 0% 暗号</text>
        <text x="64" y="92" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">セキュアブート＋一瞬Crypto消去</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#92400e">C11 ハードAES-256＆セキュアブート</text>
        <text x="136" y="43" font-size="7.0" fill="#78350f">・専用回路でフル速度のまま軍事級暗号化</text>
        <text x="136" y="56" font-size="7.0" fill="#78350f">・起動ごとに電子署名検証し改ざんを防御</text>
        <text x="136" y="69" font-size="7.0" fill="#78350f">・鍵破棄(Crypto Erase)で1ms完全安全消去</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">転送スピードを1%も落とさず最強の金庫ロックをかけ、不正改造ファームも弾く安全コア</text>
      `);

    case 'cfe_3d_nand_pkg_primary':
      return wrapSvg(`
        <rect x="22" y="62" width="88" height="12" rx="2" fill="#0369a1"/>
        <rect x="25" y="50" width="82" height="11" rx="2" fill="#0284c7"/>
        <rect x="28" y="38" width="76" height="11" rx="2" fill="#0ea5e9"/>
        <rect x="31" y="26" width="70" height="11" rx="2" fill="#38bdf8"/>
        <text x="66" y="34" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0c4a6e">最大16ダイ立体積層!</text>
        <text x="66" y="58" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#ffffff">232〜300+層 3D TLC</text>
        <text x="66" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">1チップ最大2TB・電源OFFでも保持</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0369a1">C12 3D TLC NANDメイン記憶チップ</text>
        <text x="136" y="43" font-size="7.0" fill="#0c4a6e">・300階建て3Dメモリを16枚立体パッケージ</text>
        <text x="136" y="56" font-size="7.0" fill="#0c4a6e">・1セル3bit(8段階電圧)で超大容量化</text>
        <text x="136" y="69" font-size="7.0" fill="#0c4a6e">・最大3,600MT/s高速I/O＆CBA接合世代</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">小指の爪サイズに300階建て極小マンションを16枚積み重ねた、テラバイト級の写真倉庫</text>
      `);

    case 'cfe_3d_nand_pkg_secondary':
      return wrapSvg(`
        <rect x="18" y="20" width="94" height="16" rx="3" fill="#1e3a8a"/>
        <text x="65" y="31" text-anchor="middle" font-size="6.2" fill="#fff">マルチチャネル制御SoC</text>
        <path d="M40 36 V50 M90 36 V50" stroke="#0284c7" stroke-width="2.2"/>
        <rect x="18" y="50" width="42" height="26" rx="3" fill="#bae6fd" stroke="#0284c7"/>
        <text x="39" y="66" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">NAND #1</text>
        <rect x="70" y="50" width="42" height="26" rx="3" fill="#bae6fd" stroke="#0284c7"/>
        <text x="91" y="66" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">NAND #2</text>
        <text x="65" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">同時並列インターリーブで書込倍速!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0369a1">C13 並列インターリーブ・セカンドNAND</text>
        <text x="136" y="43" font-size="7.0" fill="#0c4a6e">・複数チップ＋複数プレーンへ同時分散書込</text>
        <text x="136" y="56" font-size="7.0" fill="#0c4a6e">・大容量カードほど並列度が高く超高速!</text>
        <text x="136" y="69" font-size="7.0" fill="#0c4a6e">・書き込み発熱を複数チップへ分散冷却</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">スーパーのレジを複数台同時に開けるようにデータを並列投入し、書き込み速度を倍増</text>
      `);

    case 'cfe_pslc_write_cache':
      return wrapSvg(`
        <rect x="16" y="22" width="44" height="50" rx="4" fill="#ffedd5" stroke="#ea580c" stroke-width="1.8"/>
        <text x="38" y="40" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#9a3412">pSLC</text>
        <text x="38" y="52" text-anchor="middle" font-size="5.8" fill="#c2410c">1bit爆速</text>
        <text x="38" y="64" text-anchor="middle" font-size="5.6" fill="#9a3412">寿命10倍!</text>
        <path d="M60 47 H76" stroke="#ea580c" stroke-width="2"/>
        <rect x="76" y="22" width="42" height="50" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="97" y="44" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#0369a1">3D TLC</text>
        <text x="97" y="58" text-anchor="middle" font-size="5.8" fill="#0c4a6e">3bit大容量</text>
        <text x="66" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#c2410c">VPG400 / VPG800 途切れない記録</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9a3412">C14 pSLC高速ターボ書込み領域</text>
        <text x="136" y="43" font-size="7.0" fill="#7c2d12">・1セル1bit贅沢駆動で書込み速度3〜5倍</text>
        <text x="136" y="56" font-size="7.0" fill="#7c2d12">・8K RAW・120fps連写を息切れゼロで受止</text>
        <text x="136" y="69" font-size="7.0" fill="#7c2d12">・書き換え耐久10倍＆発熱大幅低減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">3個入るロッカーに急いで1個だけポンと入れる贅沢ターボ運用で、8K動画を絶対止めない</text>
      `);

    case 'cfe_3d_nand_vertical_pillar':
      return wrapSvg(`
        <rect x="20" y="22" width="90" height="7" fill="#64748b"/>
        <rect x="20" y="34" width="90" height="7" fill="#64748b"/>
        <rect x="20" y="46" width="90" height="7" fill="#64748b"/>
        <rect x="20" y="58" width="90" height="7" fill="#64748b"/>
        <rect x="20" y="70" width="90" height="7" fill="#64748b"/>
        <rect x="42" y="18" width="12" height="62" rx="3" fill="#a855f7" stroke="#581c87" stroke-width="1.4"/>
        <rect x="74" y="18" width="12" height="62" rx="3" fill="#a855f7" stroke="#581c87" stroke-width="1.4"/>
        <text x="65" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#6b21a8">232〜300+層 垂直CTFメモリ柱</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#6b21a8">C15 3D NAND垂直チャージトラップ柱</text>
        <text x="136" y="43" font-size="7.0" fill="#581c87">・直径80nmの極細穴が300層を垂直貫通</text>
        <text x="136" y="56" font-size="7.0" fill="#581c87">・量子トンネル効果で電子を窒化膜へ保存</text>
        <text x="136" y="69" font-size="7.0" fill="#581c87">・絶縁ポケット捕獲で10年消えない記憶</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#6b21a8">髪の毛の1/1000の極細柱に300階もの電子の部屋が並ぶ、現代半導体最高峰のナノ建築</text>
      `);

    case 'cfe_lpddr4_dram_cache':
      return wrapSvg(`
        <rect x="20" y="24" width="92" height="48" rx="4" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/>
        <text x="66" y="43" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#3730a3">LPDDR4 DRAM</text>
        <text x="66" y="58" text-anchor="middle" font-size="6.0" fill="#4338ca">FTL住所録 常駐(15ns!)</text>
        <text x="66" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#4f46e5">NAND参照の約1,000倍の爆速検索</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#3730a3">C16 LPDDR4高速DRAMキャッシュ</text>
        <text x="136" y="43" font-size="7.0" fill="#312e81">・2億ページ超の住所録(FTL)を丸ごと常駐</text>
        <text x="136" y="56" font-size="7.0" fill="#312e81">・15ナノ秒で空き場所を引当て連写解放</text>
        <text x="136" y="69" font-size="7.0" fill="#312e81">・1.1V低電圧駆動で発熱と電池消費を抑制</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#3730a3">2TBの大倉庫の「どこに何があるか」を0.000001秒で引き出す受付の超高速目次ノート</text>
      `);

    case 'cfe_pmic_buck_regulator':
      return wrapSvg(`
        <rect x="16" y="34" width="28" height="28" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="30" y="51" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#991b1b">3.3V</text>
        <path d="M44 48 H56" stroke="#dc2626" stroke-width="2"/>
        <rect x="56" y="22" width="32" height="52" rx="4" fill="#fef2f2" stroke="#ef4444" stroke-width="1.6"/>
        <text x="72" y="45" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#991b1b">PMIC</text>
        <text x="72" y="58" text-anchor="middle" font-size="5.6" fill="#dc2626">η93%</text>
        <path d="M88 30 H112 M88 48 H112 M88 66 H112" stroke="#f59e0b" stroke-width="1.6"/>
        <text x="108" y="27" text-anchor="end" font-size="5.5" fill="#92400e">0.85V</text>
        <text x="108" y="45" text-anchor="end" font-size="5.5" fill="#92400e">1.1V</text>
        <text x="108" y="63" text-anchor="end" font-size="5.5" fill="#92400e">2.5V</text>
        <text x="66" y="90" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#991b1b">待機時 L1.2 &lt; 50mW 超省エネ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#991b1b">C17 内蔵マルチ出力PMIC変電所</text>
        <text x="136" y="43" font-size="7.0" fill="#7f1d1d">・3.3Vを0.85/1.1/1.8/2.5Vへ効率93%降圧</text>
        <text x="136" y="56" font-size="7.0" fill="#7f1d1d">・無駄な変換発熱を徹底削減し熱だれ防止</text>
        <text x="136" y="69" font-size="7.0" fill="#7f1d1d">・撮影待ち時は50mW未満へ瞬時スリープ</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#991b1b">カメラの3.3Vを各チップ好みの電圧へ無駄なく配り分ける、高効率なカード内変電所</text>
      `);

    case 'cfe_power_inductors_mlcc':
      return wrapSvg(`
        <rect x="18" y="24" width="42" height="28" rx="3" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
        <text x="39" y="41" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#f8fafc">0.7mmコイル</text>
        <rect x="68" y="26" width="12" height="8" fill="#d97706"/>
        <rect x="84" y="26" width="12" height="8" fill="#d97706"/>
        <rect x="100" y="26" width="12" height="8" fill="#d97706"/>
        <rect x="68" y="40" width="12" height="8" fill="#d97706"/>
        <rect x="84" y="40" width="12" height="8" fill="#d97706"/>
        <rect x="100" y="40" width="12" height="8" fill="#d97706"/>
        <text x="90" y="62" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#92400e">0201砂粒MLCC群</text>
        <path d="M18 76 L34 68 L50 78 L66 74 L112 74" fill="none" stroke="#10b981" stroke-width="2"/>
        <text x="66" y="90" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#065f46">電源リップル &lt; 20mVへ平滑化!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#92400e">C18 極薄コイル＆0201砂粒MLCC群</text>
        <text x="136" y="43" font-size="7.0" fill="#78350f">・厚さ0.8mm以下の磁気シールド電源コイル</text>
        <text x="136" y="56" font-size="7.0" fill="#78350f">・0.6×0.3mm極小MLCCで瞬間電流を補給</text>
        <text x="136" y="69" font-size="7.0" fill="#78350f">・PCIe高速線への磁気ノイズ干渉を完全封鎖</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">厚さ2.8mmのカード内へ収まる超ペラペラコイルと砂粒コンデンサ群が電気の波を静める</text>
      `);

    case 'cfe_plp_hold_caps':
      return wrapSvg(`
        <rect x="16" y="26" width="42" height="40" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8"/>
        <text x="37" y="44" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#854d0e">PLPタンク</text>
        <text x="37" y="57" text-anchor="middle" font-size="5.6" fill="#a16207">E=½CV²</text>
        <path d="M58 46 H74" stroke="#ca8a04" stroke-width="2.2"/>
        <rect x="74" y="26" width="44" height="40" rx="4" fill="#dcfce7" stroke="#16a34a"/>
        <text x="96" y="44" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#166534">FTL目次</text>
        <text x="96" y="57" text-anchor="middle" font-size="5.8" fill="#15803d">安全退避!</text>
        <text x="66" y="86" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#a16207">電池切れ後 数ms粘ってファイル保護</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#854d0e">C19 電源瞬断保護(PLP)コンデンサ</text>
        <text x="136" y="43" font-size="7.0" fill="#713f12">・不意の電池切れ時に数ミリ秒だけ非常給電</text>
        <text x="136" y="56" font-size="7.0" fill="#713f12">・書きかけのFTL住所録を急いでNAND保存</text>
        <text x="136" y="69" font-size="7.0" fill="#713f12">・「カード認識不能」の悲劇を未然に防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">録画中に電池が切れても最後の0.01秒だけ粘り、書きかけの目次を閉じる極小予備タンク</text>
      `);

    case 'cfe_pcie_ac_coupling':
      return wrapSvg(`
        <line x1="16" y1="40" x2="46" y2="40" stroke="#0d9488" stroke-width="2.2"/>
        <line x1="46" y1="28" x2="46" y2="52" stroke="#0f766e" stroke-width="3"/>
        <line x1="56" y1="28" x2="56" y2="52" stroke="#0f766e" stroke-width="3"/>
        <line x1="56" y1="40" x2="112" y2="40" stroke="#0d9488" stroke-width="2.2"/>
        <text x="51" y="22" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#115e59">220 nF</text>
        <text x="32" y="64" text-anchor="middle" font-size="5.8" fill="#dc2626">DCズレ遮断</text>
        <text x="86" y="64" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0d9488">16GT/s波のみ通過!</text>
        <text x="64" y="88" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#115e59">アンチパッド最適化(Z=85Ω無反射)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#115e59">C20 PCIe Gen4 ACカップリング群</text>
        <text x="136" y="43" font-size="7.0" fill="#134e4a">・220nF直列容量でホスト⇔カードDC分離</text>
        <text x="136" y="56" font-size="7.0" fill="#134e4a">・8GHz高周波のため直下内層をアンチパッド</text>
        <text x="136" y="69" font-size="7.0" fill="#134e4a">・反射損失を抑えクリアな16GT/s波形維持</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#115e59">直流の電圧ズレだけをカットし、毎秒160億回の高速データ波だけをピシッと通す関門</text>
      `);

    case 'cfe_esd_tvs_diode_array':
      return wrapSvg(`
        <path d="M22 20 L34 38 L28 38 L42 56" fill="none" stroke="#e11d48" stroke-width="2.4"/>
        <text x="36" y="16" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#be123c">±15kV静電気!</text>
        <rect x="46" y="40" width="38" height="32" rx="4" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
        <text x="65" y="55" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#9f1239">TVS</text>
        <text x="65" y="66" text-anchor="middle" font-size="5.5" fill="#be123c">0.20 pF</text>
        <path d="M65 72 V84 M55 84 H75" stroke="#334155" stroke-width="2"/>
        <path d="M84 56 H112" stroke="#0284c7" stroke-width="2"/>
        <text x="100" y="48" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">SoC無事!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9f1239">C21 極低容量TVS静電気避雷針</text>
        <text x="136" y="43" font-size="7.0" fill="#881337">・±15kVの静電気を0.5ns未満でGNDへ逃がす</text>
        <text x="136" y="56" font-size="7.0" fill="#881337">・寄生容量0.2pFでPCIe Gen4波形を劣化ゼロ</text>
        <text x="136" y="69" font-size="7.0" fill="#881337">・21ピン直後に並ぶ最前線のフロースルー防衛</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">冬のパチッ！という1万5千ボルトの静電気だけを10億分の1秒で地面へ逃がす極小避雷針</text>
      `);

    case 'cfe_xtal_clock_gen':
      return wrapSvg(`
        <rect x="20" y="24" width="38" height="32" rx="4" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.6"/>
        <text x="39" y="43" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#854d0e">1612水晶</text>
        <path d="M58 40 H74" stroke="#ca8a04" stroke-width="2"/>
        <rect x="74" y="24" width="42" height="32" rx="4" fill="#eff6ff" stroke="#2563eb"/>
        <text x="95" y="38" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#1e40af">100MHz</text>
        <text x="95" y="49" text-anchor="middle" font-size="5.6" fill="#1d4ed8">PLL同期</text>
        <path d="M20 74 L30 66 L40 80 L50 66 L60 80 L70 66 L80 80 L90 66 L100 80 L110 72" fill="none" stroke="#eab308" stroke-width="1.6"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#854d0e">1bit=62.5ps ／ 揺らぎ &lt; 0.5ps!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#854d0e">C22 超小型水晶＆PCIe基準クロック</text>
        <text x="136" y="43" font-size="7.0" fill="#713f12">・1.6×1.2mm水晶＋100MHz差動PLL同期</text>
        <text x="136" y="56" font-size="7.0" fill="#713f12">・位相揺らぎ0.5ps未満で16GT/s誤読ゼロ</text>
        <text x="136" y="69" font-size="7.0" fill="#713f12">・SSC拡散クロックで無線ノイズ干渉を低減</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">1兆分の62.5秒という超高速キャッチボールのリズムをピタッと揃える米粒サイズの時計</text>
      `);

    case 'cfe_spi_nor_firmware':
      return wrapSvg(`
        <rect x="20" y="24" width="90" height="48" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.6"/>
        <text x="65" y="43" text-anchor="middle" font-size="7.0" font-weight="bold" fill="#5b21b6">SPI NOR ROM</text>
        <text x="65" y="57" text-anchor="middle" font-size="5.8" fill="#6d28d9">FW A/B二重バンク</text>
        <text x="65" y="86" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#5b21b6">20年保持・電源ON数ms爆速起動!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f5f3ff" stroke="#8b5cf6"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#5b21b6">C23 専用NORフラッシュ起動ROM</text>
        <text x="136" y="43" font-size="7.0" fill="#4c1d95">・NVMeプログラムと工場不良ブロック地図格納</text>
        <text x="136" y="56" font-size="7.0" fill="#4c1d95">・電源投入から数ミリ秒で撮影レディ起動</text>
        <text x="136" y="69" font-size="7.0" fill="#4c1d95">・二重バンクで安全なファーム更新に対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#5b21b6">電源が入った瞬間に真っ先に読み込む、カードの取扱説明書と工場地図が入った堅牢チップ</text>
      `);

    case 'cfe_thermal_sensor_diode':
      return wrapSvg(`
        <path d="M18 72 L52 38 L82 42 L110 50" fill="none" stroke="#e11d48" stroke-width="2.2"/>
        <line x1="18" y1="54" x2="112" y2="54" stroke="#10b981" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="64" y="26" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#be123c">滑らか適応サーマル制御</text>
        <text x="86" y="65" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#047857">VPG最低保証死守!</text>
        <text x="64" y="88" text-anchor="middle" font-size="5.8" fill="#9f1239">±1℃デジタル温度計(HCTM連動)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#f43f5e"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9f1239">C24 デジタル温度計＆熱スロットリング</text>
        <text x="136" y="43" font-size="7.0" fill="#881337">・±1℃高精度センサーが0.5℃刻みで監視</text>
        <text x="136" y="56" font-size="7.0" fill="#881337">・急停止させずVPG速度を保ち滑らか熱調整</text>
        <text x="136" y="69" font-size="7.0" fill="#881337">・カメラ本体へ温度ログを常時リアルタイム報告</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">熱くなりすぎても録画をプツッと止めず、安全なペースへ滑らかに調整して守り抜く番人</text>
      `);

    case 'cfe_copper_heat_spreader':
      return wrapSvg(`
        <rect x="20" y="42" width="90" height="16" rx="2" fill="#fb923c" stroke="#c2410c" stroke-width="1.6"/>
        <text x="65" y="53" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#7c2d12">純銅スプレッダー(k=398)</text>
        <rect x="48" y="60" width="34" height="16" rx="2" fill="#ef4444"/>
        <text x="65" y="71" text-anchor="middle" font-size="5.8" fill="#fff">SoC熱源</text>
        <path d="M65 40 L30 24 M65 40 V22 M65 40 L100 24" stroke="#ea580c" stroke-width="2"/>
        <text x="65" y="90" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#9a3412">樹脂の2,000倍伝熱 → -15℃冷却!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9a3412">C25 ソニー独自・純銅ヒートスプレッダー</text>
        <text x="136" y="43" font-size="7.0" fill="#7c2d12">・SoC1点集中の熱をカード全面へ一気に拡散</text>
        <text x="136" y="56" font-size="7.0" fill="#7c2d12">・極薄0.2mm無酸素銅板でピーク温度-15℃</text>
        <text x="136" y="69" font-size="7.0" fill="#7c2d12">・8K/4K120p長回し収録を支える冷却の要</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">頭脳チップ1箇所のアツアツ熱を純銅板で全面へ一気に広げて冷やすTOUGHの隠し玉</text>
      `);

    case 'cfe_graphene_tim_pad':
      return wrapSvg(`
        <rect x="20" y="20" width="90" height="12" rx="2" fill="#475569"/>
        <text x="65" y="29" text-anchor="middle" font-size="5.8" fill="#f8fafc">金属外装シェル</text>
        <rect x="20" y="34" width="90" height="10" fill="#1e293b"/>
        <text x="65" y="41.5" text-anchor="middle" font-size="5.6" fill="#38bdf8">グラファイト面内(k=1400)</text>
        <rect x="20" y="46" width="90" height="14" rx="2" fill="#fbcfe8" stroke="#db2777"/>
        <text x="65" y="56" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#9d174d">軟質TIMパッド(空気隙間0)</text>
        <rect x="24" y="62" width="36" height="14" fill="#2563eb"/>
        <rect x="66" y="60" width="40" height="16" fill="#0ea5e9"/>
        <text x="65" y="90" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#be185d">チップ段差吸収＋衝撃クッション兼任</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fdf2f8" stroke="#ec4899"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9d174d">C26 軟質TIMパッド＆グラファイト層</text>
        <text x="136" y="43" font-size="7.0" fill="#831843">・断熱材になる空気隙間をぷにぷにシートで封鎖</text>
        <text x="136" y="56" font-size="7.0" fill="#831843">・SoCとNANDの高さ段差をぴったり密着吸収</text>
        <text x="136" y="69" font-size="7.0" fill="#831843">・銅の3.5倍の面内グラファイトで均一放熱</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9d174d">チップと金属蓋の間の空気を完全に追い出し、段差吸収と落下クッションも兼ねる熱の橋</text>
      `);

    case 'cfe_emi_shield_frame':
      return wrapSvg(`
        <rect x="22" y="22" width="88" height="54" rx="5" fill="#f1f5f9" stroke="#64748b" stroke-width="3" stroke-dasharray="5 2"/>
        <rect x="38" y="34" width="56" height="30" rx="3" fill="#2563eb"/>
        <text x="66" y="52" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">8GHz PCIe</text>
        <path d="M98 34 L112 24" stroke="#dc2626" stroke-width="1.6"/>
        <line x1="100" y1="22" x2="112" y2="34" stroke="#dc2626" stroke-width="1.8"/>
        <text x="66" y="90" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#334155">EMI減衰 30dB超 (Wi-Fi/マイク保護)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">C27 洋白/パーマロイEMIシールド枠</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・16GT/s高速通信の電波ノイズを30dB封じ込め</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・すぐ隣のWi-Fi 6Eやマイクへの雑音を遮断</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・外部からの強い電磁波やX線ノイズも防御</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">爆速通信が出す電磁ノイズを金属の檻に閉じ込め、カメラの無線や録音音声を守る遮音壁</text>
      `);

    case 'cfe_bga_underfill_epoxy':
      return wrapSvg(`
        <rect x="22" y="26" width="88" height="20" rx="2" fill="#1e293b"/>
        <text x="66" y="39" text-anchor="middle" font-size="6.2" fill="#f8fafc">NAND / SoCチップ</text>
        <rect x="20" y="46" width="92" height="14" rx="2" fill="#d8b4fe" stroke="#9333ea"/>
        <circle cx="34" cy="53" r="4" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="50" cy="53" r="4" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="66" cy="53" r="4" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="82" cy="53" r="4" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="98" cy="53" r="4" fill="#cbd5e1" stroke="#475569"/>
        <rect x="22" y="60" width="88" height="12" rx="2" fill="#166534"/>
        <text x="66" y="88" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#7e22ce">BGAはんだ球をエポキシで完全補強!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#6b21a8">C28 BGAはんだアンダーフィル補強</text>
        <text x="136" y="43" font-size="7.0" fill="#581c87">・チップ底面の0.2mmハンダ球間を樹脂充填</text>
        <text x="136" y="56" font-size="7.0" fill="#581c87">・7.5m落下・150N曲げでもハンダ割れゼロ</text>
        <text x="136" y="69" font-size="7.0" fill="#581c87">・-12〜+72℃熱伸縮による断線寿命を5倍化</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#6b21a8">チップ裏に並ぶ何百粒もの極小ハンダを強い樹脂で固め、落下や曲げでも絶対断線させない</text>
      `);

    case 'cfe_smart_health_monitor':
      return wrapSvg(`
        <rect x="18" y="20" width="96" height="58" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>
        <text x="66" y="34" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#166534">Media Scan診断</text>
        <rect x="26" y="42" width="80" height="12" rx="3" fill="#dcfce7" stroke="#22c55e"/>
        <rect x="26" y="42" width="72" height="12" rx="3" fill="#22c55e"/>
        <text x="66" y="51" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#052e16">残り寿命 92% 良好</text>
        <text x="66" y="69" text-anchor="middle" font-size="5.6" fill="#15803d">エラー0件 / 最高58℃</text>
        <text x="66" y="90" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#166534">NVMe S.M.A.R.T. 予防診断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#166534">C29 S.M.A.R.T.寿命診断ロジック</text>
        <text x="136" y="43" font-size="7.0" fill="#14532d">・総書込量・予備ブロック・温度を常時記録</text>
        <text x="136" y="56" font-size="7.0" fill="#14532d">・Media Scan Utility等で壊れる前に交換警告</text>
        <text x="136" y="69" font-size="7.0" fill="#14532d">・本番撮影中の突然死リスクをゼロへ近づける</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#166534">書き換え寿命が近づくと壊れる前に知らせてくれる、大切な思い出を守るカードの健康診断</text>
      `);

    case 'cfe_grip_pull_tab_rib':
      return wrapSvg(`
        <rect x="24" y="20" width="82" height="58" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <line x1="34" y1="28" x2="96" y2="28" stroke="#1e293b" stroke-width="3"/>
        <line x1="34" y1="35" x2="96" y2="35" stroke="#1e293b" stroke-width="3"/>
        <line x1="34" y1="42" x2="96" y2="42" stroke="#1e293b" stroke-width="3"/>
        <text x="65" y="58" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">引出しグリップリブ</text>
        <text x="65" y="70" text-anchor="middle" font-size="5.6" fill="#0c4a6e">耐X線 / 耐UV / 帯電防止</text>
        <text x="65" y="90" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">濡れた手でも落とさない段差形状</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#38bdf8"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0369a1">C30 ノンスリップリブ＆6重保護ラベル</text>
        <text x="136" y="43" font-size="7.0" fill="#0c4a6e">・後端0.35mm段差リブで確実につまみ出し</text>
        <text x="136" y="56" font-size="7.0" fill="#0c4a6e">・空港X線(ISO7816-1)・紫外線・静電気保護</text>
        <text x="136" y="69" font-size="7.0" fill="#0c4a6e">・ロケ管理番号をメモできる高視認ラベル</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">寒い手や濡れた指でもポロッと落とさず引き出せ、空港X線や紫外線からも守る仕上げ層</text>
      `);

    default:
      return null;
  }
}
