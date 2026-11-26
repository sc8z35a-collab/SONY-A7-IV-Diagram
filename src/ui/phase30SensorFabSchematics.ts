import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 30 Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (32 diagrams):
 *   - Sensor Manufacturing Process Vol.0 Master Process Map (`F0-01` – `F0-32`)
 * Every visual element and text line is strictly calibrated inside x ∈ [6, 314].
 */
export function renderPhase30SensorFabSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // DECK 0 — MASTER OVERVIEW, 300mm WAFER YIELD & 6-MONTH CLEANROOM GANTRY
    // =========================================================================
    case 'fab0_hero_city_sensor':
      return wrapSvg(`
        <rect x="14" y="16" width="106" height="18" rx="3" fill="#0ea5e9" stroke="#0369a1"/>
        <text x="67" y="28" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">1階: 画素層 (24×36mm)</text>
        <rect x="14" y="38" width="106" height="14" rx="2" fill="#ea580c"/>
        <text x="67" y="48" text-anchor="middle" font-size="6.2" fill="#fff">5,000万超 Cu-Cu柱</text>
        <rect x="14" y="56" width="106" height="22" rx="3" fill="#1e3a8a" stroke="#1d4ed8"/>
        <text x="67" y="70" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">地下: ロジック頭脳層</text>
        <rect x="130" y="14" width="180" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="138" y="29" font-size="7.3" font-weight="bold" fill="#0369a1">F0-01 切手サイズの超巨大立体都市</text>
        <text x="138" y="43" font-size="6.8" fill="#0c4a6e">・標準モデル全12フェーズ 2,110工程</text>
        <text x="138" y="56" font-size="6.8" fill="#0c4a6e">・露光1,150(96マスク)+非露光960</text>
        <text x="138" y="69" font-size="6.8" fill="#0c4a6e">・砂からカメラ完成まで約180日(半年)</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#0369a1">数千万個の光のバケツと5,000万超の銅柱を切手サイズへ建てる完全設計図</text>
      `);

    case 'fab0_wafer_300mm_stitch':
      return wrapSvg(`
        <circle cx="64" cy="52" r="36" fill="#0f4c5c" stroke="#38bdf8" stroke-width="1.6"/>
        <rect x="38" y="32" width="22" height="15" fill="#eab308" opacity="0.85" stroke="#fef08a"/>
        <rect x="64" y="32" width="22" height="15" fill="#38bdf8" opacity="0.65" stroke="#e0f2fe"/>
        <line x1="71" y1="32" x2="71" y2="47" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="2 1"/>
        <line x1="79" y1="32" x2="79" y2="47" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="2 1"/>
        <rect x="38" y="51" width="22" height="15" fill="#22c55e" opacity="0.7" stroke="#bbf7d0"/>
        <rect x="64" y="51" width="22" height="15" fill="#22c55e" opacity="0.7" stroke="#bbf7d0"/>
        <text x="64" y="96" text-anchor="middle" font-size="6.2" fill="#0f172a">300mm円盤 (金:一括 / 赤破線:つなぎ)</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#3730a3">F0-02 一括露光 vs スティッチング</text>
        <text x="136" y="43" font-size="6.8" fill="#312e81">・36×24mmは標準画角26×33mm超過</text>
        <text x="136" y="56" font-size="6.8" fill="#312e81">・広画角一括(FPA-6300ESW)か分割か</text>
        <text x="136" y="69" font-size="6.8" fill="#312e81">・大面積ゆえ欠陥1粒の歩留まり影響大</text>
        <text x="160" y="109" text-anchor="middle" font-size="6.7" fill="#3730a3">1枚の300mmウェーハから取れるフルサイズは数十個──露光方式が価格と品質を左右</text>
      `);

    case 'fab0_timeline_gantry':
      return wrapSvg(`
        <rect x="14" y="20" width="54" height="24" rx="4" fill="#64748b"/>
        <text x="41" y="34" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">T1: 1-2月</text>
        <rect x="74" y="20" width="54" height="24" rx="4" fill="#0284c7"/>
        <text x="101" y="34" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">T2: 3-4.5月</text>
        <rect x="134" y="20" width="54" height="24" rx="4" fill="#7c3aed"/>
        <text x="161" y="34" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">T3: 4.5-5月</text>
        <rect x="194" y="20" width="54" height="24" rx="4" fill="#d97706"/>
        <text x="221" y="34" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">T4: 5-5.5月</text>
        <rect x="254" y="20" width="54" height="24" rx="4" fill="#059669"/>
        <text x="281" y="34" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">T5: 5.5-6月</text>
        <text x="41" y="56" text-anchor="middle" font-size="6.2" fill="#334155">P1 珪石→円盤</text>
        <text x="101" y="56" text-anchor="middle" font-size="6.2" fill="#0369a1">P3/4＋P5 並行</text>
        <text x="161" y="56" text-anchor="middle" font-size="6.2" fill="#6d28d9">P6/7/8 接合光学</text>
        <text x="221" y="56" text-anchor="middle" font-size="6.2" fill="#b45309">P9/10 封止FT</text>
        <text x="281" y="56" text-anchor="middle" font-size="6.2" fill="#047857">P11/12 出荷!</text>
        <rect x="18" y="68" width="284" height="22" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="160" y="82" text-anchor="middle" font-size="6.9" font-weight="bold" fill="#1e293b">※ P2（設計・96枚マスク開発）は量産開始の 1.5〜3年前 から先行スタート!</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#475569">ウェーハ投入から出荷まで約4〜6か月（前工程2〜3か月）をOHT自動搬送が繋ぐ</text>
      `);

    // =========================================================================
    // DECK 1 — THE 12 SEQUENTIAL MANUFACTURING PHASES (P1 – P12)
    // =========================================================================
    case 'fab0_p01_raw_wafer':
      return wrapSvg(`
        <polygon points="18,68 30,38 42,68" fill="#cbd5e1" stroke="#475569"/>
        <text x="30" y="79" text-anchor="middle" font-size="6" fill="#334155">珪石</text>
        <path d="M44 54 L56 54" stroke="#0284c7" stroke-width="1.6"/>
        <rect x="58" y="34" width="24" height="36" rx="4" fill="#334155" stroke="#94a3b8"/>
        <rect x="64" y="20" width="12" height="18" rx="2" fill="#38bdf8"/>
        <text x="70" y="79" text-anchor="middle" font-size="6" fill="#334155">CZ単結晶</text>
        <path d="M84 54 L96 54" stroke="#0284c7" stroke-width="1.6"/>
        <circle cx="110" cy="54" r="14" fill="#0f4c5c" stroke="#38bdf8" stroke-width="1.4"/>
        <text x="110" y="79" text-anchor="middle" font-size="6" fill="#0369a1">300mm</text>
        <rect x="134" y="14" width="176" height="72" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="142" y="29" font-size="7.3" font-weight="bold" fill="#0f172a">P1 原材料とウェーハ製造（60工程）</text>
        <text x="142" y="43" font-size="6.8" fill="#334155">・シーメンス法で純度11N(99.999999999%)</text>
        <text x="142" y="56" font-size="6.8" fill="#334155">・スプルースパイン高純度石英るつぼ</text>
        <text x="142" y="69" font-size="6.8" fill="#334155">・CISエピ層＋SUMCO分子イオン注入</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#475569">山の石ころから不純物1兆分の1未満の300mm CIS専用エピウェーハを作る60工程</text>
      `);

    case 'fab0_p02_design_photomask':
      return wrapSvg(`
        <rect x="20" y="20" width="66" height="58" rx="4" fill="#1e293b" stroke="#7c3aed" stroke-width="1.6"/>
        <rect x="32" y="30" width="42" height="38" rx="2" fill="#e0f2fe" stroke="#38bdf8"/>
        <rect x="38" y="36" width="12" height="10" fill="#1e293b"/>
        <rect x="56" y="36" width="12" height="10" fill="#1e293b"/>
        <rect x="38" y="52" width="12" height="10" fill="#1e293b"/>
        <rect x="56" y="52" width="12" height="10" fill="#1e293b"/>
        <rect x="92" y="24" width="26" height="50" rx="3" fill="#ede9fe" stroke="#7c3aed"/>
        <text x="105" y="47" text-anchor="middle" font-size="7" font-weight="bold" fill="#5b21b6">96枚</text>
        <text x="105" y="59" text-anchor="middle" font-size="6" fill="#6d28d9">セット</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#5b21b6">P2 設計とフォトマスク製作（50工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#4c1d95">・TCAD/FDTDシミュレーション＆OPC補正</text>
        <text x="136" y="56" font-size="6.8" fill="#4c1d95">・電子ビーム(EB)描画→ペリクル貼付</text>
        <text x="136" y="69" font-size="6.8" fill="#4c1d95">・量産開始の1.5〜3年前から先行開発</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#5b21b6">光の回折まで計算した96枚の石英フォトマスク（型紙）を電子ビームで彫刻する50工程</text>
      `);

    case 'fab0_p03_pixel_feol':
      return wrapSvg(`
        <rect x="18" y="38" width="98" height="44" rx="3" fill="#0284c7" stroke="#0369a1"/>
        <rect x="46" y="34" width="6" height="48" fill="#e2e8f0"/>
        <rect x="82" y="34" width="6" height="48" fill="#e2e8f0"/>
        <rect x="24" y="42" width="18" height="32" rx="2" fill="#38bdf8"/>
        <rect x="56" y="42" width="22" height="32" rx="2" fill="#38bdf8"/>
        <rect x="92" y="42" width="18" height="32" rx="2" fill="#38bdf8"/>
        <rect x="64" y="24" width="8" height="22" fill="#eab308"/>
        <text x="67" y="20" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#b45309">VTG + 多段PPD注入</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0369a1">P3 画素ウェーハ FEOL（380工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#0c4a6e">・約25マスク：露光300 ＋ 非露光80</text>
        <text x="136" y="56" font-size="6.8" fill="#0c4a6e">・STI/DTI隔壁＋多段PPDイオン注入</text>
        <text x="136" y="69" font-size="6.8" fill="#0c4a6e">・VTG/4T・デュアルピクセル・GS構造</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#0369a1">25枚の型紙と高エネルギー原子打ち込みで数千万個の光のバケツを彫る380工程</text>
      `);

    case 'fab0_p04_pixel_beol':
      return wrapSvg(`
        <rect x="18" y="72" width="98" height="12" fill="#1e3a8a"/>
        <rect x="24" y="58" width="86" height="8" rx="1" fill="#d97706"/>
        <rect x="24" y="44" width="86" height="8" rx="1" fill="#ea580c"/>
        <rect x="24" y="30" width="86" height="8" rx="1" fill="#f59e0b"/>
        <rect x="34" y="20" width="18" height="7" fill="#c2410c"/>
        <rect x="82" y="20" width="18" height="7" fill="#c2410c"/>
        <line x1="16" y1="20" x2="118" y2="20" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="67" y="16" text-anchor="middle" font-size="6.2" fill="#0369a1">ナノ平坦CMP＆Cuリセス接合面</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#9a3412">P4 画素ウェーハ BEOL（210工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#7c2d12">・約13マスク：露光156 ＋ 非露光54</text>
        <text x="136" y="56" font-size="6.8" fill="#7c2d12">・Wコンタクト＋Cu 5層デュアルダマシン</text>
        <text x="136" y="69" font-size="6.8" fill="#7c2d12">・P6接合へ向けた原子レベル平坦化CMP</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#9a3412">5階建ての銅立体高速道路と、数nm凹み制御のハイブリッド接合面を磨く210工程</text>
      `);

    case 'fab0_p05_logic_wafer':
      return wrapSvg(`
        <rect x="16" y="18" width="102" height="66" rx="4" fill="#1e3a8a" stroke="#2563eb" stroke-width="1.6"/>
        <rect x="24" y="26" width="86" height="14" rx="2" fill="#ea580c"/>
        <text x="67" y="36" text-anchor="middle" font-size="6.3" fill="#fff">Cu 7〜8層 高密度BEOL</text>
        <rect x="24" y="44" width="40" height="16" rx="2" fill="#38bdf8"/>
        <text x="44" y="55" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">並列ADC</text>
        <rect x="70" y="44" width="40" height="16" rx="2" fill="#22c55e"/>
        <text x="90" y="55" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#052e16">SLVS-EC</text>
        <text x="67" y="76" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fde047">画素とは別ライン同時並行!</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#1d4ed8">P5 ロジックウェーハ製造（720工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#1e3a8a">・最大規模48マスク：露光576＋非露光144</text>
        <text x="136" y="56" font-size="6.8" fill="#1e3a8a">・40/28nm級 FEOL ＋ Cu 7〜8層 BEOL</text>
        <text x="136" y="69" font-size="6.8" fill="#1e3a8a">・ソニー×TSMC熊本合弁(2026/8)等</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#1d4ed8">画素ウェーハと同時並行で別ライン製造する、全12フェーズ最大の頭脳チップ720工程</text>
      `);

    case 'fab0_p06_cucu_bond_bsi':
      return wrapSvg(`
        <rect x="18" y="18" width="46" height="24" fill="#64748b"/>
        <text x="41" y="33" text-anchor="middle" font-size="6" fill="#fff">775µm</text>
        <path d="M66 30 L78 30" stroke="#dc2626" stroke-width="1.8"/>
        <rect x="80" y="34" width="38" height="8" fill="#0ea5e9"/>
        <text x="99" y="28" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#dc2626">3〜6µm!</text>
        <rect x="18" y="44" width="100" height="10" fill="#ea580c"/>
        <text x="68" y="51.5" text-anchor="middle" font-size="6" fill="#fff">Cu-Cu直接ハイブリッド接合</text>
        <rect x="18" y="56" width="100" height="24" fill="#1e3a8a"/>
        <text x="68" y="71" text-anchor="middle" font-size="6.5" fill="#fff">ロジックウェーハ (P5)</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#9a3412">P6 ハイブリッド接合・極限薄化(130)</text>
        <text x="136" y="43" font-size="6.8" fill="#7c2d12">・約5マスク：露光60 ＋ 非露光70</text>
        <text x="136" y="56" font-size="6.8" fill="#7c2d12">・プラズマ仮接合→熱膨張Cu-Cu金属結合</text>
        <text x="136" y="69" font-size="6.8" fill="#7c2d12">・775µm→3〜6µm薄化＋HfO₂/B-DTI/W格</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#9a3412">2枚のウェーハを貼り合わせて裏返し、99%以上削り落として裏面光学を仕上げる130工程</text>
      `);

    case 'fab0_p07_cfa_microlens':
      return wrapSvg(`
        <path d="M18 44 Q34 20 50 44 Q66 20 82 44 Q98 20 114 44" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="20" y="46" width="28" height="18" fill="#dc2626"/>
        <rect x="52" y="46" width="28" height="18" fill="#16a34a"/>
        <rect x="84" y="46" width="28" height="18" fill="#2563eb"/>
        <text x="34" y="58" text-anchor="middle" font-size="8" font-weight="bold" fill="#fff">R</text>
        <text x="66" y="58" text-anchor="middle" font-size="8" font-weight="bold" fill="#fff">G</text>
        <text x="98" y="58" text-anchor="middle" font-size="8" font-weight="bold" fill="#fff">B</text>
        <rect x="18" y="66" width="96" height="14" fill="#0f4c5c"/>
        <text x="66" y="76" text-anchor="middle" font-size="6.2" fill="#e0f2fe">CRAシフト＆2×1 OCL集光</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#166534">P7 カラーフィルター・OCL（95工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#14532d">・約5マスク：露光58 ＋ 非露光37</text>
        <text x="136" y="56" font-size="6.8" fill="#14532d">・G/R/B着色(PFASフリーWCM)専用硬化</text>
        <text x="136" y="69" font-size="6.8" fill="#14532d">・熱リフロー＆エッチバック極小レンズ</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#166534">3色のステンドグラスと隙間ゼロの極小レンズをCRAシフト設計で載せる95工程</text>
      `);

    case 'fab0_p08_wafer_cp_test':
      return wrapSvg(`
        <circle cx="64" cy="24" r="10" fill="#fef08a" stroke="#ca8a04"/>
        <path d="M56 32 L46 60 M64 34 L64 60 M72 32 L82 60" stroke="#eab308" stroke-width="1.5"/>
        <rect x="20" y="60" width="88" height="22" rx="3" fill="#0f172a" stroke="#10b981"/>
        <rect x="26" y="65" width="16" height="12" fill="#10b981"/>
        <rect x="46" y="65" width="16" height="12" fill="#06b6d4"/>
        <rect x="66" y="65" width="16" height="12" fill="#ef4444"/>
        <rect x="86" y="65" width="16" height="12" fill="#10b981"/>
        <text x="64" y="54" text-anchor="middle" font-size="6.2" fill="#0f766e">EMVA 1288 均一光＋プローブ針</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#065f46">P8 ウェーハテスト CP（30工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#064e3b">・電気特性＋EMVA 1288光学全数測定</text>
        <text x="136" y="56" font-size="6.8" fill="#064e3b">・QE・暗電流・PRNU/DSNU自動検査</text>
        <text x="136" y="69" font-size="6.8" fill="#064e3b">・良品ダイ(KGD)判定＆性能ビニング</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#065f46">切り出す前に全ダイへ針と均一光を当てて良品だけを地図に記録する30工程</text>
      `);

    case 'fab0_p09_dicing_package':
      return wrapSvg(`
        <rect x="22" y="24" width="88" height="10" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <text x="66" y="21" text-anchor="middle" font-size="6.1" fill="#0369a1">クラス1 ARカバーガラス気密封止</text>
        <rect x="22" y="34" width="14" height="44" fill="#334155"/>
        <rect x="96" y="34" width="14" height="44" fill="#334155"/>
        <rect x="22" y="66" width="88" height="14" fill="#334155"/>
        <rect x="44" y="54" width="44" height="12" fill="#0f766e"/>
        <path d="M44 56 Q38 40 32 48 M88 56 Q94 40 100 48" fill="none" stroke="#eab308" stroke-width="1.8"/>
        <text x="66" y="76" text-anchor="middle" font-size="6.2" fill="#f8fafc">セラミック筐体＋Auワイヤー</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#92400e">P9 ダイシング・封止（85工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#78350f">・塵ゼロのステルスレーザー分割</text>
        <text x="136" y="56" font-size="6.8" fill="#78350f">・京セラ多層セラミック＋数百本Au線</text>
        <text x="136" y="69" font-size="6.8" fill="#78350f">・クラス1清浄度でのARガラス気密</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#92400e">レーザー内部改質で無塵カットし、高平坦セラミックとARガラスで完全密封する85工程</text>
      `);

    case 'fab0_p10_final_test_ft':
      return wrapSvg(`
        <rect x="18" y="18" width="98" height="34" rx="4" fill="#1e293b" stroke="#06b6d4"/>
        <text x="67" y="33" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#38bdf8">暗室・均一光源 FT</text>
        <text x="67" y="45" text-anchor="middle" font-size="6" fill="#fda4af">高温 / 低温 / 耐湿試験</text>
        <rect x="18" y="58" width="98" height="24" rx="3" fill="#334155"/>
        <rect x="24" y="63" width="18" height="14" rx="1" fill="#0f766e" stroke="#94a3b8"/>
        <rect x="46" y="63" width="18" height="14" rx="1" fill="#0f766e" stroke="#94a3b8"/>
        <rect x="68" y="63" width="18" height="14" rx="1" fill="#0f766e" stroke="#94a3b8"/>
        <rect x="90" y="63" width="18" height="14" rx="1" fill="#0f766e" stroke="#94a3b8"/>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0e7490">P10 最終検査 FT・出荷（45工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#155e75">・完成パッケージの全数光学/暗室FT</text>
        <text x="136" y="56" font-size="6.8" fill="#155e75">・温度サイクル・高湿・振動信頼性試験</text>
        <text x="136" y="69" font-size="6.8" fill="#155e75">・帯電防止JEDECトレー梱包で出荷</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#0e7490">真冬の雪山から真夏の連写発熱まで耐え抜く品質を証明してカメラ工場へ出荷する45工程</text>
      `);

    case 'fab0_p11_sensor_unit_ibis':
      return wrapSvg(`
        <rect x="20" y="20" width="94" height="62" rx="5" fill="#f1f5f9" stroke="#64748b" stroke-width="1.4"/>
        <rect x="38" y="30" width="58" height="36" rx="2" fill="#0f766e"/>
        <text x="67" y="51" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#fff">OLPF+SSWF</text>
        <rect x="34" y="70" width="26" height="8" rx="3" fill="#c2410c"/>
        <rect x="74" y="70" width="26" height="8" rx="3" fill="#c2410c"/>
        <rect x="102" y="34" width="8" height="28" rx="3" fill="#c2410c"/>
        <circle cx="28" cy="28" r="3.5" fill="#1e293b"/>
        <circle cx="106" cy="28" r="3.5" fill="#1e293b"/>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fff7ed" stroke="#c2410c"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#9a3412">P11 センサーユニット組立（140工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#7c2d12">・リジッドフレキ＋グラファイト/銅放熱</text>
        <text x="136" y="56" font-size="6.8" fill="#7c2d12">・水晶OLPF＆超音波ダスト除去(SSWF)</text>
        <text x="136" y="69" font-size="6.8" fill="#7c2d12">・5軸IBIS(VCM/ホール)＋数µmあおり調整</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#9a3412">5軸手ぶれ補正・放熱・超音波除塵・数µm傾き調整を一体化する精密メカ140工程</text>
      `);

    case 'fab0_p12_camera_integration':
      return wrapSvg(`
        <path d="M18 36 h22 l8-12 h30 l8 12 h24 a6 6 0 0 1 6 6 v36 a6 6 0 0 1 -6 6 H24 a6 6 0 0 1 -6-6 V42 a6 6 0 0 1 6-6 z" fill="#1e293b" stroke="#dc2626" stroke-width="1.5"/>
        <circle cx="64" cy="58" r="18" fill="#334155" stroke="#cbd5e1" stroke-width="1.8"/>
        <rect x="52" y="50" width="24" height="16" rx="1.5" fill="#0ea5e9"/>
        <text x="64" y="61" text-anchor="middle" font-size="6" font-weight="bold" fill="#fff">24×36</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#991b1b">P12 ボディ統合・工場校正（165工程）</text>
        <text x="136" y="43" font-size="6.8" fill="#7f1d1d">・Mgシャーシ＋BIONZ XR2/DIGIC X接続</text>
        <text x="136" y="56" font-size="6.8" fill="#7f1d1d">・欠陥画素・PRNU/DSNU・色/AF/IBIS校正</text>
        <text x="136" y="69" font-size="6.8" fill="#7f1d1d">・防塵防滴・最終検査→店頭出荷(計2,110)</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#991b1b">1台ごとに画質・AF・IBISを工場校正し、全2,110工程の旅を終えて完成ミラーレスへ！</text>
      `);

    // =========================================================================
    // DECK 2 — THE 12-STEP LITHOGRAPHY UNIT LOOP (L-01 – L-12)
    // =========================================================================
    case 'fab0_l01_preclean':
      return wrapSvg(`
        <rect x="20" y="62" width="92" height="14" rx="3" fill="#0f4c5c"/>
        <path d="M40 24 Q52 44 46 60 M66 20 Q72 42 66 60 M92 24 Q80 44 86 60" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
        <circle cx="96" cy="54" r="3" fill="#ef4444"/>
        <text x="66" y="88" text-anchor="middle" font-size="6.2" fill="#0369a1">超純水＋薬液スピン洗浄＆乾燥</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0369a1">L-01 前洗浄・乾燥（調理前の手洗い）</text>
        <text x="136" y="43" font-size="6.8" fill="#0c4a6e">・目に見えないホコリ・油分を完全除去</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：ゴミ1粒で画素死(黒点/白点)</text>
        <text x="136" y="69" font-size="6.8" fill="#0c4a6e">・装置：SCREEN、東京エレクトロン(TEL)</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#0369a1">約96回繰り返すリソグラフィ単位ループの出発点──まずは徹底的な清浄化から</text>
      `);

    case 'fab0_l02_hmds_barc':
      return wrapSvg(`
        <rect x="20" y="64" width="92" height="16" fill="#334155"/>
        <rect x="20" y="54" width="92" height="10" fill="#4f46e5"/>
        <rect x="20" y="46" width="92" height="8" fill="#a5b4fc"/>
        <path d="M56 18 L66 54" stroke="#f59e0b" stroke-width="2"/>
        <text x="66" y="34" text-anchor="middle" font-size="6.2" fill="#4338ca">反射光をBARC暗幕が吸収!</text>
        <text x="66" y="90" text-anchor="middle" font-size="6.1" fill="#312e81">HMDS密着下地 ＋ BARC反射防止膜</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#3730a3">L-02 密着促進＆反射防止膜塗布</text>
        <text x="136" y="43" font-size="6.8" fill="#312e81">・HMDSプライマー＋BARC暗幕を成膜</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：剥がれ/乱反射→画質ムラ</text>
        <text x="136" y="69" font-size="6.8" fill="#312e81">・装置/材：TEL、日産化学（BARC材）</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#3730a3">レジストの剥がれと露光時の乱反射を防ぎ、ナノ線幅を均一に保つ2層の下地処理</text>
      `);

    case 'fab0_l03_resist_coat':
      return wrapSvg(`
        <rect x="58" y="16" width="16" height="18" rx="2" fill="#d97706"/>
        <circle cx="66" cy="40" r="3.5" fill="#f59e0b"/>
        <rect x="18" y="52" width="96" height="7" rx="2" fill="#f59e0b"/>
        <rect x="18" y="59" width="96" height="13" fill="#334155"/>
        <path d="M24 80 Q66 90 108 80" fill="none" stroke="#0284c7" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="66" y="94" text-anchor="middle" font-size="6.2" fill="#92400e">毎分数千回転の遠心スピン (0.1–2µm)</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#92400e">L-03 フォトレジスト塗布</text>
        <text x="136" y="43" font-size="6.8" fill="#78350f">・感光樹脂を遠心力で極薄均一に広げる</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：膜厚ムラ→シェーディング</text>
        <text x="136" y="69" font-size="6.8" fill="#78350f">・TEL、JSR・東京応化・信越化学</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#92400e">わずか数ccの感光樹脂を高速回転で全面均一な極薄膜に仕上げるスピンコート工程</text>
      `);

    case 'fab0_l04_softbake_pab':
      return wrapSvg(`
        <rect x="18" y="64" width="96" height="16" rx="3" fill="#dc2626"/>
        <text x="66" y="75" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">ホットプレート 90–110℃</text>
        <rect x="24" y="52" width="84" height="9" rx="2" fill="#f59e0b"/>
        <path d="M40 46 Q44 34 40 24 M66 46 Q70 34 66 24 M92 46 Q96 34 92 24" fill="none" stroke="#ea580c" stroke-width="1.8"/>
        <text x="66" y="20" text-anchor="middle" font-size="6.2" fill="#b91c1c">余分な溶剤を60秒蒸発</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#991b1b">L-04 プリベーク（ソフトベーク PAB）</text>
        <text x="136" y="43" font-size="6.8" fill="#7f1d1d">・約90〜110℃×60秒で半乾きに安定</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：装置張り付き・にじみ解像低下</text>
        <text x="136" y="69" font-size="6.8" fill="#7f1d1d">・装置：TEL コーター・デベロッパー内蔵</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#991b1b">塗布直後のレジストから余分な溶剤を飛ばし、露光に耐える安定した膜へ整える</text>
      `);

    case 'fab0_l05_exposure_align':
      return wrapSvg(`
        <rect x="34" y="14" width="64" height="9" rx="2" fill="#1e293b" stroke="#7c3aed"/>
        <text x="66" y="21" text-anchor="middle" font-size="5.6" fill="#e0f2fe">フォトマスク(型紙)</text>
        <polygon points="40,23 92,23 78,44 54,44" fill="#a855f7" opacity="0.35"/>
        <ellipse cx="66" cy="46" rx="22" ry="7" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <polygon points="52,52 80,52 72,74 60,74" fill="#6366f1" opacity="0.48"/>
        <rect x="20" y="74" width="92" height="10" fill="#0f4c5c"/>
        <text x="66" y="94" text-anchor="middle" font-size="6.1" fill="#3730a3">UV縮小投影 (i線/KrF/ArF) ＋ 数nm位置合わせ</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#3730a3">L-05 精密アライメント＆露光</text>
        <text x="136" y="43" font-size="6.8" fill="#312e81">・下層目印を数nm読取り→UV縮小焼付</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：画素ショート・位相差AF狂い</text>
        <text x="136" y="69" font-size="6.8" fill="#312e81">・キヤノン(6300ESW/6400ES6a),ASML,ニコン</text>
        <text x="160" y="109" text-anchor="middle" font-size="6.7" fill="#3730a3">リソグラフィ単位ループの主役！一括露光かスティッチングかがフルサイズ歩留まりの要</text>
      `);

    case 'fab0_l06_peb':
      return wrapSvg(`
        <rect x="18" y="62" width="96" height="16" rx="3" fill="#ea580c"/>
        <text x="66" y="73" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#fff">PEB 100–130℃ (±0.1℃)</text>
        <rect x="26" y="44" width="80" height="15" rx="2" fill="#fde68a" stroke="#d97706"/>
        <rect x="36" y="44" width="16" height="15" fill="#f97316"/>
        <rect x="68" y="44" width="16" height="15" fill="#f97316"/>
        <text x="66" y="34" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#9a3412">酸触媒連鎖反応で輪郭クッキリ!</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#9a3412">L-06 露光後ベーク（PEB）</text>
        <text x="136" y="43" font-size="6.8" fill="#7c2d12">・光で生じた酸触媒反応を熱で精密進行</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：0.1℃狂いでCD変化→PRNU悪化</text>
        <text x="136" y="69" font-size="6.8" fill="#7c2d12">・装置：東京エレクトロン（TEL）</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#9a3412">±0.1℃の超精密温度制御で化学増幅反応を揃え、画素間の感度ムラ（PRNU）を防ぐ</text>
      `);

    case 'fab0_l07_develop':
      return wrapSvg(`
        <rect x="22" y="20" width="88" height="12" rx="2" fill="#0d9488"/>
        <text x="66" y="29" text-anchor="middle" font-size="6.2" fill="#fff">TMAHアルカリ現像液</text>
        <path d="M40 32 L40 50 M66 32 L66 50 M92 32 L92 50" stroke="#14b8a6" stroke-width="2"/>
        <rect x="20" y="66" width="92" height="14" fill="#334155"/>
        <rect x="26" y="50" width="18" height="16" fill="#f59e0b"/>
        <rect x="58" y="50" width="18" height="16" fill="#f59e0b"/>
        <rect x="90" y="50" width="16" height="16" fill="#f59e0b"/>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#115e59">L-07 現像・リンス・乾燥</text>
        <text x="136" y="43" font-size="6.8" fill="#134e4a">・不要レジストだけを溶かし立体模様現出</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：スカム残り→断線・ライン欠陥</text>
        <text x="136" y="69" font-size="6.8" fill="#134e4a">・装置：東京エレクトロン（TEL）</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#115e59">フィルム写真の現像と同じ原理で、設計図通りのナノレジスト壁を浮かび上がらせる</text>
      `);

    case 'fab0_l08_adi_metrology':
      return wrapSvg(`
        <rect x="44" y="14" width="44" height="22" rx="3" fill="#1e293b" stroke="#eab308" stroke-width="1.5"/>
        <text x="66" y="28" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fde047">CD-SEM / KLA</text>
        <path d="M66 36 L66 56" stroke="#eab308" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="20" y="58" width="92" height="12" fill="#334155"/>
        <rect x="20" y="75" width="92" height="16" rx="3" fill="#fef08a" stroke="#ca8a04"/>
        <text x="66" y="86" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#854d0e">NGならL-01へリワーク!</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#854d0e">L-08 現像後計測 ADI（最終関所！）</text>
        <text x="136" y="43" font-size="6.8" fill="#713f12">・線幅(CD)と下層ズレ(オーバーレイ)計測</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：見逃すと数百万円円盤が廃棄</text>
        <text x="136" y="69" font-size="6.8" fill="#713f12">・装置：日立ハイテク(CD-SEM)、KLA</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#854d0e">彫る前なら洗い直してやり直し（リワーク）できる、数百万円のウェーハを守る最後の関所</text>
      `);

    case 'fab0_l09_etch_implant':
      return wrapSvg(`
        <rect x="20" y="46" width="92" height="36" fill="#1e3a8a"/>
        <rect x="44" y="46" width="14" height="24" fill="#ffffff"/>
        <rect x="78" y="46" width="14" height="24" fill="#ffffff"/>
        <rect x="20" y="34" width="24" height="12" fill="#f59e0b"/>
        <rect x="58" y="34" width="20" height="12" fill="#f59e0b"/>
        <rect x="92" y="34" width="20" height="12" fill="#f59e0b"/>
        <path d="M51 16 L51 66 M85 16 L85 66" stroke="#a855f7" stroke-width="2.2"/>
        <text x="66" y="13" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#7e22ce">プラズマ彫り / B・P・Asイオン注入</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#6b21a8">L-09 本加工（エッチング／イオン注入）</text>
        <text x="136" y="43" font-size="6.8" fill="#581c87">・レジスト隙間から彫る or 原子を撃ち込む</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：白飛び悪化・クロストーク混色</text>
        <text x="136" y="69" font-size="6.8" fill="#581c87">・TEL、ラム、AMAT、住友重機械イオン</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#6b21a8">シリコンや金属を垂直に彫り込み、または高速原子イオンで光のバケツを形成する本加工</text>
      `);

    case 'fab0_l10_ashing_strip':
      return wrapSvg(`
        <ellipse cx="66" cy="30" rx="34" ry="12" fill="#fbcfe8" stroke="#db2777" stroke-width="1.5"/>
        <text x="66" y="33" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#9d174d">O₂プラズマ灰化</text>
        <path d="M46 42 L46 56 M66 42 L66 56 M86 42 L86 56" stroke="#ec4899" stroke-width="1.8" stroke-dasharray="2 2"/>
        <rect x="20" y="58" width="92" height="22" fill="#1e3a8a"/>
        <rect x="44" y="58" width="14" height="14" fill="#ffffff"/>
        <rect x="78" y="58" width="14" height="14" fill="#ffffff"/>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fdf2f8" stroke="#db2777"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#9d174d">L-10 レジスト剥離・アッシング</text>
        <text x="136" y="43" font-size="6.8" fill="#831843">・役目を終えたレジストをO₂プラズマ除去</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：過燃焼ダメージ→夜景に白キズ</text>
        <text x="136" y="69" font-size="6.8" fill="#831843">・装置：日立ハイテク、TEL、PSK</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#9d174d">シリコン結晶を傷つけない優しい酸素プラズマや剥離液で不要レジストを完全除去</text>
      `);

    case 'fab0_l11_postclean':
      return wrapSvg(`
        <rect x="16" y="36" width="22" height="42" rx="2" fill="#fee2e2" stroke="#dc2626"/>
        <text x="27" y="60" text-anchor="middle" font-size="6" font-weight="bold" fill="#991b1b">SPM</text>
        <rect x="42" y="36" width="22" height="42" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="53" y="60" text-anchor="middle" font-size="6" font-weight="bold" fill="#0369a1">SC-1</text>
        <rect x="68" y="36" width="22" height="42" rx="2" fill="#cffafe" stroke="#0891b2"/>
        <text x="79" y="60" text-anchor="middle" font-size="6" font-weight="bold" fill="#0e7490">SC-2</text>
        <rect x="94" y="36" width="22" height="42" rx="2" fill="#fef9c3" stroke="#ca8a04"/>
        <text x="105" y="60" text-anchor="middle" font-size="6" font-weight="bold" fill="#854d0e">DHF</text>
        <text x="66" y="26" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#0e7490">Cu/Fe 金属原子ゼロ洗浄!</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0e7490">L-11 加工後ウェット洗浄</text>
        <text x="136" y="43" font-size="6.8" fill="#155e75">・削りかすポリマー＆金属イオンを徹底洗浄</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：Cu/Fe数個で暗電流激増・白キズ</text>
        <text x="136" y="69" font-size="6.8" fill="#155e75">・装置：SCREEN、TEL、荏原製作所</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#0e7490">銅や鉄がほんの数原子残るだけで白キズになるため、4種薬液と超純水で執念の洗浄</text>
      `);

    case 'fab0_l12_aei_defect':
      return wrapSvg(`
        <rect x="20" y="62" width="92" height="16" rx="2" fill="#0f172a" stroke="#22c55e"/>
        <path d="M26 24 L66 62 L106 24" fill="none" stroke="#22c55e" stroke-width="2"/>
        <circle cx="66" cy="62" r="4" fill="#ef4444"/>
        <rect x="50" y="16" width="32" height="16" rx="2" fill="#1e293b"/>
        <text x="66" y="27" text-anchor="middle" font-size="6.2" fill="#4ade80">AEI検知</text>
        <text x="66" y="90" text-anchor="middle" font-size="6.1" fill="#166534">光学＆電子線スキャン → 次の周回へ!</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#166534">L-12 加工後計測・欠陥検査（AEI）</text>
        <text x="136" y="43" font-size="6.8" fill="#14532d">・実溝深さ/幅/膜厚計測＆全面欠陥スキャン</text>
        <text x="136" y="56" font-size="6.8" fill="#dc2626">・失敗影響：傾向を見逃すとロット全滅！</text>
        <text x="136" y="69" font-size="6.8" fill="#14532d">・装置：KLA、日立ハイテク、レーザーテック</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#166534">12工程ループを締めくくる全数スキャン──合格ウェーハだけが次のマスク周回へ進む</text>
      `);

    // =========================================================================
    // DECK 3 — THE 5 SENSOR ARCHITECTURE PROCESS VARIATIONS (V-01 – V-05)
    // =========================================================================
    case 'fab0_var_fsi':
      return wrapSvg(`
        <path d="M36 16 L36 62 M66 16 L66 42 M96 16 L96 62" stroke="#f59e0b" stroke-width="1.8"/>
        <rect x="20" y="34" width="92" height="10" fill="#16a34a" opacity="0.75"/>
        <rect x="26" y="46" width="16" height="6" fill="#d97706"/>
        <rect x="58" y="46" width="16" height="6" fill="#d97706"/>
        <rect x="90" y="46" width="16" height="6" fill="#d97706"/>
        <rect x="20" y="56" width="92" height="28" fill="#0284c7"/>
        <text x="66" y="73" text-anchor="middle" font-size="6.6" fill="#fff">単一Si基板 (PD下)</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0f172a">V-01 非積層・表面照射（FSI）型</text>
        <text x="136" y="43" font-size="6.8" fill="#334155">・推定総工程：約1,500〜1,650工程</text>
        <text x="136" y="56" font-size="6.8" fill="#334155">・基準比 ▲500〜600工程（単一ウェーハ）</text>
        <text x="136" y="69" font-size="6.8" fill="#334155">・例：キヤノン EOS R6 Mark III 一部等</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#475569">貼り合わせ・薄化なしの最もシンプルな1枚構成──配線の上から光を通す伝統方式</text>
      `);

    case 'fab0_var_bsi':
      return wrapSvg(`
        <path d="M36 14 L36 42 M66 14 L66 42 M96 14 L96 42" stroke="#f59e0b" stroke-width="1.8"/>
        <rect x="20" y="34" width="92" height="20" fill="#0284c7"/>
        <text x="66" y="47" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">BSI受光層 (障害物なし!)</text>
        <rect x="20" y="56" width="92" height="8" fill="#d97706"/>
        <rect x="20" y="66" width="92" height="18" fill="#64748b"/>
        <text x="66" y="78" text-anchor="middle" font-size="6.3" fill="#fff">支持基板 (ロジックなし)</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0369a1">V-02 非積層・裏面照射（BSI）型</text>
        <text x="136" y="43" font-size="6.8" fill="#0c4a6e">・推定総工程：約1,600〜1,700工程</text>
        <text x="136" y="56" font-size="6.8" fill="#0c4a6e">・基準比 ▲450〜550工程（支持基板貼り）</text>
        <text x="136" y="69" font-size="6.8" fill="#0c4a6e">・例：ソニー α7 IV / α7R V 等</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#0369a1">配線を下へ回して暗所感度を飛躍させつつ、別ロジック工程を省いた高画質バランス型</text>
      `);

    case 'fab0_var_partial_stack':
      return wrapSvg(`
        <rect x="20" y="24" width="92" height="22" rx="2" fill="#0ea5e9"/>
        <text x="66" y="38" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff">BSI 画素ウェーハ</text>
        <rect x="20" y="50" width="24" height="22" rx="2" fill="#2563eb"/>
        <text x="32" y="63" text-anchor="middle" font-size="5.8" fill="#fff">高速</text>
        <rect x="88" y="50" width="24" height="22" rx="2" fill="#2563eb"/>
        <text x="100" y="63" text-anchor="middle" font-size="5.8" fill="#fff">高速</text>
        <rect x="46" y="54" width="40" height="18" rx="2" fill="#cbd5e1" stroke="#64748b" stroke-dasharray="2 2"/>
        <text x="66" y="66" text-anchor="middle" font-size="5.8" fill="#334155">中央支持</text>
        <text x="66" y="84" text-anchor="middle" font-size="6.1" fill="#1d4ed8">上下端のみエッジ積層!</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#eff6ff" stroke="#0ea5e9"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#0369a1">V-03 部分積層（Partially Stacked）</text>
        <text x="136" y="43" font-size="6.8" fill="#0c4a6e">・推定総工程：約1,750〜1,900工程</text>
        <text x="136" y="56" font-size="6.8" fill="#0c4a6e">・基準比 ▲250〜350工程（エッジ積層）</text>
        <text x="136" y="69" font-size="6.8" fill="#0c4a6e">・例：α7 V / ニコンZ6III / LUMIX S1II</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#0369a1">上下端にだけ高速回路チップを積層し、高速読み出しとコスト低減を両立した2026年潮流</text>
      `);

    case 'fab0_var_full_2stack':
      return wrapSvg(`
        <rect x="18" y="16" width="96" height="68" rx="4" fill="#fffbeb" stroke="#d97706" stroke-width="1.8"/>
        <rect x="24" y="22" width="84" height="20" rx="2" fill="#0ea5e9"/>
        <text x="66" y="35" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">画素ウェーハ全面</text>
        <rect x="24" y="45" width="84" height="10" fill="#ea580c"/>
        <text x="66" y="52.5" text-anchor="middle" font-size="5.8" fill="#fff">全面 Cu-Cuハイブリッド接合</text>
        <rect x="24" y="58" width="84" height="20" rx="2" fill="#1e3a8a"/>
        <text x="66" y="71" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">ロジックウェーハ全面</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#92400e">V-04 2層フル積層 BSI【基準モデル】</text>
        <text x="136" y="43" font-size="6.8" fill="#78350f">・基準総工程：約2,110工程（±0）</text>
        <text x="136" y="56" font-size="6.8" fill="#78350f">・全面Cu-Cu接合＋約96マスク構成</text>
        <text x="136" y="69" font-size="6.8" fill="#78350f">・α1 II/α9 III/α7R VI/EOS R1/Z9等</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#92400e">現代プロ向けフラッグシップ機の王道──全12フェーズ2,110工程の標準基準モデル</text>
      `);

    case 'fab0_var_3stack_2layertr':
      return wrapSvg(`
        <rect x="22" y="16" width="88" height="16" rx="2" fill="#0ea5e9"/>
        <text x="66" y="27" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#fff">1層: 全面PD層</text>
        <rect x="22" y="34" width="88" height="15" rx="2" fill="#7c3aed"/>
        <text x="66" y="44" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#fff">2層: 画素Tr / 回路層</text>
        <rect x="22" y="51" width="88" height="15" rx="2" fill="#1e3a8a"/>
        <text x="66" y="61" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#fff">3層: 高速ロジック</text>
        <rect x="22" y="68" width="88" height="15" rx="2" fill="#0f172a"/>
        <text x="66" y="78" text-anchor="middle" font-size="6.1" font-weight="bold" fill="#38bdf8">DRAM内蔵 / 3D集積</text>
        <rect x="128" y="14" width="182" height="72" rx="5" fill="#faf5ff" stroke="#9333ea"/>
        <text x="136" y="29" font-size="7.3" font-weight="bold" fill="#6b21a8">V-05 3層DRAM／2層Tr画素積層</text>
        <text x="136" y="43" font-size="6.8" fill="#581c87">・推定総工程：約2,400〜3,100工程</text>
        <text x="136" y="56" font-size="6.8" fill="#581c87">・基準比 ＋300〜900工程（第3層追加）</text>
        <text x="136" y="69" font-size="6.8" fill="#581c87">・超高速DRAM連写／2層Tr FWC倍増</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.8" fill="#6b21a8">第3のウェーハ追加貼り合わせや3Dシーケンシャル集積による究極の次世代センサー領域</text>
      `);

    default:
      return null;
  }
}
