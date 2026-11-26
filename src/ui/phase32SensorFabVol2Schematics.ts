import { PartExplanation } from '../assemblies/types';

/**
 * 36 bespoke 320x118 Japanese technical SVG schematics for
 * **Phase 32 — 第2巻：フェーズ1 ── 砂（珪石）から超純度エピタキシャルウェーハまで (`F2-01` – `F2-36`, P01-001–060)**.
 */
export function renderPhase32SensorFabVol2SchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  const wrap = (body: string) =>
    `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Noto Sans JP', ui-sans-serif, sans-serif;">${body}</svg>`;

  switch (type) {
    case 'fab2_hero_purity_mirror_monument':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="14" y="14" width="142" height="90" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
        <text x="85" y="29" text-anchor="middle" font-size="8.2" fill="#1d4ed8" font-weight="700">純度 11N（99.999999999%）</text>
        <circle cx="52" cy="58" r="17" fill="#ffffff" stroke="#3b82f6" stroke-width="1.6"/>
        <circle cx="88" cy="58" r="17" fill="#ffffff" stroke="#3b82f6" stroke-width="1.6"/>
        <circle cx="122" cy="58" r="17" fill="#ffffff" stroke="#3b82f6" stroke-width="1.6"/>
        <circle cx="88" cy="58" r="2.6" fill="#ef4444"/>
        <text x="85" y="88" text-anchor="middle" font-size="6.8" fill="#334155">東京ドーム4杯の白玉に</text>
        <text x="85" y="98" text-anchor="middle" font-size="6.8" fill="#dc2626" font-weight="700">赤玉（不純物）1個未満！</text>
        <rect x="164" y="14" width="142" height="90" rx="6" fill="#f0fdf4" stroke="#86efac"/>
        <text x="235" y="29" text-anchor="middle" font-size="8.2" fill="#15803d" font-weight="700">平坦度 Ra ＜ 0.1 nm</text>
        <path d="M178,64 Q208,52 235,60 T292,56" fill="none" stroke="#059669" stroke-width="2.5"/>
        <line x1="176" y1="68" x2="294" y2="68" stroke="#94a3b8" stroke-dasharray="3 2"/>
        <circle cx="235" cy="46" r="6" fill="#cbd5e1" stroke="#475569"/>
        <text x="235" y="48.5" text-anchor="middle" font-size="5.8" fill="#0f172a" font-weight="700">1円</text>
        <text x="235" y="85" text-anchor="middle" font-size="6.8" fill="#334155">300mm→日本列島3,000km拡大で</text>
        <text x="235" y="96" text-anchor="middle" font-size="6.8" fill="#047857" font-weight="700">凹凸は1円玉厚(1mm)以下！</text>
      `);

    case 'fab2_phase1_plant_deck':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="160" y="20" text-anchor="middle" font-size="8.2" fill="#0f172a" font-weight="700">フェーズ1 全60工程（P01-001〜060）・7ブロック昇華フロー</text>
        <rect x="14" y="28" width="66" height="30" rx="4" fill="#ffedd5" stroke="#ea580c"/>
        <text x="47" y="41" text-anchor="middle" font-size="7" fill="#c2410c" font-weight="700">1-A 還元</text>
        <text x="47" y="52" text-anchor="middle" font-size="6.2" fill="#7c2d12">99% MG-Si</text>
        <rect x="88" y="28" width="68" height="30" rx="4" fill="#cffafe" stroke="#0891b2"/>
        <text x="122" y="41" text-anchor="middle" font-size="7" fill="#0e7490" font-weight="700">1-B 蒸留CVD</text>
        <text x="122" y="52" text-anchor="middle" font-size="6.2" fill="#155e75">11N SEG-Si</text>
        <rect x="164" y="28" width="68" height="30" rx="4" fill="#e0e7ff" stroke="#4f46e5"/>
        <text x="198" y="41" text-anchor="middle" font-size="7" fill="#4338ca" font-weight="700">1-C MCZ引上</text>
        <text x="198" y="52" text-anchor="middle" font-size="6.2" fill="#312e81">無欠陥単結晶</text>
        <rect x="240" y="28" width="66" height="30" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="273" y="41" text-anchor="middle" font-size="7" fill="#0369a1" font-weight="700">1-D 切断</text>
        <text x="273" y="52" text-anchor="middle" font-size="6.2" fill="#075985">1000線スライス</text>
        <path d="M80,43 L88,43 M156,43 L164,43 M232,43 L240,43" stroke="#64748b" stroke-width="1.8"/>
        <rect x="24" y="68" width="84" height="32" rx="4" fill="#d1fae5" stroke="#059669"/>
        <text x="66" y="81" text-anchor="middle" font-size="7.2" fill="#047857" font-weight="700">1-E 研削・鏡面CMP</text>
        <text x="66" y="93" text-anchor="middle" font-size="6.3" fill="#065f46">775µm / Ra＜0.1nm</text>
        <rect x="118" y="68" width="88" height="32" rx="4" fill="#fae8ff" stroke="#c026d3"/>
        <text x="162" y="81" text-anchor="middle" font-size="7.2" fill="#a21caf" font-weight="700">1-F 分子注入＆エピ</text>
        <text x="162" y="93" text-anchor="middle" font-size="6.3" fill="#86198f">5nm CI罠＋4–10µm</text>
        <rect x="216" y="68" width="82" height="32" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="257" y="81" text-anchor="middle" font-size="7.2" fill="#1d4ed8" font-weight="700">1-G 全数検査・FOSB</text>
        <text x="257" y="93" text-anchor="middle" font-size="6.3" fill="#1e40af">19nm LPD / ISO 1–2</text>
        <path d="M108,84 L118,84 M206,84 L216,84" stroke="#64748b" stroke-width="1.8"/>
      `);

    case 'fab2_quartzite_mine_crusher':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <polygon points="22,86 42,40 68,52 84,86" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
        <text x="53" y="99" text-anchor="middle" font-size="7.2" fill="#334155" font-weight="700">高純度珪石 SiO₂≥99%</text>
        <path d="M88,64 L112,64" stroke="#ea580c" stroke-width="2"/>
        <circle cx="128" cy="56" r="11" fill="#94a3b8" stroke="#334155"/>
        <circle cx="152" cy="56" r="11" fill="#94a3b8" stroke="#334155"/>
        <text x="140" y="84" text-anchor="middle" font-size="7" fill="#334155">粗砕 20〜100mm</text>
        <path d="M168,64 L190,64" stroke="#0284c7" stroke-width="2"/>
        <rect x="194" y="24" width="44" height="22" rx="4" fill="#dc2626"/>
        <text x="216" y="38" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">磁選機</text>
        <path d="M216,46 L216,60" stroke="#dc2626" stroke-dasharray="2 2"/>
        <rect x="192" y="64" width="110" height="24" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="247" y="79" text-anchor="middle" font-size="7.2" fill="#0369a1" font-weight="700">水洗・鉄/泥除去</text>
        <text x="247" y="100" text-anchor="middle" font-size="6.8" fill="#475569">蛍光X線分析で不純物管理</text>
      `);

    case 'fab2_carbon_reductant_blender':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="24" y="16" width="68" height="36" rx="4" fill="#ffffff" stroke="#64748b"/>
        <text x="58" y="32" text-anchor="middle" font-size="7.5" fill="#0f172a" font-weight="700">珪石 SiO₂</text>
        <text x="58" y="44" text-anchor="middle" font-size="6.5" fill="#475569">純度 99%+</text>
        <rect x="108" y="16" width="84" height="36" rx="4" fill="#1e293b"/>
        <text x="150" y="32" text-anchor="middle" font-size="7.5" fill="#f8fafc" font-weight="700">低灰分炭材 2C</text>
        <text x="150" y="44" text-anchor="middle" font-size="6.3" fill="#cbd5e1">木炭・石炭・チップ</text>
        <path d="M58,52 L104,70 M150,52 L104,70" stroke="#d97706" stroke-width="2"/>
        <rect x="44" y="70" width="120" height="28" rx="5" fill="#fef3c7" stroke="#d97706"/>
        <text x="104" y="83" text-anchor="middle" font-size="7.5" fill="#92400e" font-weight="700">SiO₂ : C 化学量論調合</text>
        <text x="104" y="93" text-anchor="middle" font-size="6.4" fill="#b45309">灰分分析＋連続炉頂投入</text>
        <path d="M166,84 L204,84" stroke="#ea580c" stroke-width="2.2"/>
        <rect x="206" y="24" width="96" height="72" rx="6" fill="#fff7ed" stroke="#ea580c"/>
        <text x="254" y="44" text-anchor="middle" font-size="8" fill="#c2410c" font-weight="700">巨大アーク炉</text>
        <text x="254" y="61" text-anchor="middle" font-size="8.5" fill="#ea580c" font-weight="700">11〜13 MWh/t</text>
        <text x="254" y="77" text-anchor="middle" font-size="6.6" fill="#7c2d12">通気性維持＆炉温</text>
        <text x="254" y="88" text-anchor="middle" font-size="6.6" fill="#7c2d12">電流リアルタイム監視</text>
      `);

    case 'fab2_submerged_arc_furnace':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="26" y="40" width="124" height="58" rx="6" fill="#475569" stroke="#1e293b"/>
        <rect x="34" y="68" width="108" height="24" rx="3" fill="#f97316"/>
        <rect x="52" y="14" width="12" height="62" fill="#0f172a"/>
        <rect x="82" y="14" width="12" height="62" fill="#0f172a"/>
        <rect x="112" y="14" width="12" height="62" fill="#0f172a"/>
        <text x="88" y="84" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">約 1,900〜2,000℃</text>
        <rect x="164" y="18" width="140" height="82" rx="6" fill="#fff7ed" stroke="#f97316"/>
        <text x="234" y="36" text-anchor="middle" font-size="8.2" fill="#c2410c" font-weight="700">炭素熱還元反応</text>
        <text x="234" y="54" text-anchor="middle" font-size="8.5" fill="#0f172a" font-weight="700">SiO₂ + 2C → Si + 2CO↑</text>
        <text x="234" y="71" text-anchor="middle" font-size="6.8" fill="#334155">• 酸素をCOガスで排出</text>
        <text x="234" y="83" text-anchor="middle" font-size="6.8" fill="#b91c1c">• 低温だとSiCゴミが増殖</text>
        <text x="234" y="94" text-anchor="middle" font-size="6.6" fill="#475569">3相炭素電極アーク放電</text>
      `);

    case 'fab2_ladle_refining_grinding':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <path d="M26,44 L34,88 L90,88 L98,44 Z" fill="#64748b" stroke="#1e293b"/>
        <rect x="34" y="56" width="56" height="28" fill="#f59e0b"/>
        <line x1="62" y1="16" x2="62" y2="76" stroke="#0284c7" stroke-width="3"/>
        <text x="62" y="102" text-anchor="middle" font-size="7" fill="#334155" font-weight="700">取鍋精錬 1,500℃</text>
        <text x="86" y="28" font-size="6.8" fill="#0369a1">O₂吹込(Ca/Alアク取り)</text>
        <path d="M104,66 L126,66" stroke="#d97706" stroke-width="2"/>
        <rect x="128" y="42" width="74" height="44" rx="5" fill="#fef3c7" stroke="#d97706"/>
        <text x="165" y="59" text-anchor="middle" font-size="7.5" fill="#92400e" font-weight="700">MG-Si 金属Si</text>
        <text x="165" y="74" text-anchor="middle" font-size="7.8" fill="#b45309" font-weight="700">98.5〜99.2%</text>
        <path d="M204,66 L224,66" stroke="#475569" stroke-width="2"/>
        <rect x="226" y="42" width="76" height="44" rx="5" fill="#e2e8f0" stroke="#475569"/>
        <text x="264" y="59" text-anchor="middle" font-size="7.4" fill="#0f172a" font-weight="700">鋳造・微粉砕</text>
        <text x="264" y="74" text-anchor="middle" font-size="7.2" fill="#334155">50〜500 µm</text>
      `);

    case 'fab2_tcs_fluidized_cyclone':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="22" y="22" width="54" height="66" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <text x="49" y="45" text-anchor="middle" font-size="7.2" fill="#0369a1" font-weight="700">流動床炉</text>
        <text x="49" y="58" text-anchor="middle" font-size="6.4" fill="#334155">300–350℃</text>
        <text x="49" y="69" text-anchor="middle" font-size="6.4" fill="#334155">Si+3HCl</text>
        <text x="49" y="100" text-anchor="middle" font-size="6.8" fill="#0e7490">0.1–0.5 MPa</text>
        <path d="M76,42 L106,42" stroke="#0891b2" stroke-width="2"/>
        <polygon points="108,28 152,28 138,76 122,76" fill="#cbd5e1" stroke="#475569"/>
        <text x="130" y="50" text-anchor="middle" font-size="6.8" fill="#0f172a" font-weight="700">サイクロン</text>
        <text x="130" y="94" text-anchor="middle" font-size="6.5" fill="#475569">未反応Si除塵</text>
        <path d="M152,42 L180,42" stroke="#0284c7" stroke-width="2"/>
        <rect x="182" y="24" width="120" height="66" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="242" y="42" text-anchor="middle" font-size="8" fill="#0e7490" font-weight="700">液体TCS（SiHCl₃）</text>
        <text x="242" y="58" text-anchor="middle" font-size="8.2" fill="#0284c7" font-weight="700">沸点 31.8℃ → ＜30℃液化</text>
        <text x="242" y="75" text-anchor="middle" font-size="6.6" fill="#334155">ガスクロマトグラフィーで</text>
        <text x="242" y="85" text-anchor="middle" font-size="6.6" fill="#334155">SiCl₄副生を厳密監視</text>
      `);

    case 'fab2_multistage_distillation':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        ${[28, 64, 100, 136]
          .map(
            (x, i) => `
          <rect x="${x}" y="${22 - i * 2}" width="22" height="${72 + i * 2}" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
          <line x1="${x + 3}" y1="36" x2="${x + 19}" y2="36" stroke="#38bdf8"/>
          <line x1="${x + 3}" y1="52" x2="${x + 19}" y2="52" stroke="#38bdf8"/>
          <line x1="${x + 3}" y1="68" x2="${x + 19}" y2="68" stroke="#38bdf8"/>
          <line x1="${x + 3}" y1="84" x2="${x + 19}" y2="84" stroke="#38bdf8"/>
        `
          )
          .join('')}
        <path d="M50,28 L64,28 M86,26 L100,26 M122,24 L136,24" stroke="#0ea5e9" stroke-width="1.8"/>
        <rect x="172" y="18" width="132" height="84" rx="6" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="238" y="34" text-anchor="middle" font-size="8" fill="#0369a1" font-weight="700">多段精密蒸留（ppt級）</text>
        <text x="180" y="50" font-size="6.8" fill="#0284c7">低沸点: BCl₃ (12.5℃) 除去</text>
        <text x="180" y="63" font-size="7" fill="#0f172a" font-weight="700">目標: TCS (31.8℃) 抽出</text>
        <text x="180" y="76" font-size="6.8" fill="#dc2626">高沸点: PCl₃・Fe・Cu除去</text>
        <text x="180" y="92" font-size="6.6" fill="#475569">ICP-MSでppb〜ppt保証</text>
      `);

    case 'fab2_h2_purifier_slimrods':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="20" width="96" height="76" rx="6" fill="#ecfeff" stroke="#0891b2"/>
        <text x="64" y="36" text-anchor="middle" font-size="7.6" fill="#0e7490" font-weight="700">7N超高純度水素</text>
        <text x="64" y="52" text-anchor="middle" font-size="8.2" fill="#0284c7" font-weight="700">99.99999%+</text>
        <text x="64" y="68" text-anchor="middle" font-size="6.6" fill="#334155">Pd膜で水分・O₂除去</text>
        <text x="64" y="82" text-anchor="middle" font-size="6.6" fill="#475569">露点計・ガス分析</text>
        <path d="M114,58 L138,58" stroke="#0891b2" stroke-width="2.2"/>
        <rect x="140" y="16" width="162" height="84" rx="6" fill="#fff1f2" stroke="#e11d48"/>
        <path d="M168,84 L168,36 Q180,26 192,36 L192,84" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
        <path d="M214,84 L214,36 Q226,26 238,36 L238,84" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
        <text x="274" y="42" text-anchor="middle" font-size="7.2" fill="#be123c" font-weight="700">逆U字芯棒</text>
        <text x="274" y="55" text-anchor="middle" font-size="6.8" fill="#334155">径 7〜10mm</text>
        <text x="274" y="68" text-anchor="middle" font-size="7" fill="#dc2626" font-weight="700">1,100℃予熱</text>
        <text x="274" y="82" text-anchor="middle" font-size="6.4" fill="#475569">N₂/H₂パージ</text>
      `);

    case 'fab2_siemens_cvd_reactor':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <path d="M26,96 L26,42 A54,32 0 0,1 134,42 L134,96 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
        <rect x="46" y="40" width="14" height="52" rx="6" fill="#94a3b8" stroke="#1e293b"/>
        <rect x="73" y="34" width="14" height="58" rx="6" fill="#94a3b8" stroke="#1e293b"/>
        <rect x="100" y="40" width="14" height="52" rx="6" fill="#94a3b8" stroke="#1e293b"/>
        <text x="80" y="106" text-anchor="middle" font-size="7" fill="#0f172a" font-weight="700">ベルジャーCVD炉（1,100℃）</text>
        <rect x="150" y="16" width="154" height="86" rx="6" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="227" y="33" text-anchor="middle" font-size="8" fill="#0f766e" font-weight="700">11N多結晶CVD成長</text>
        <text x="227" y="48" text-anchor="middle" font-size="7.4" fill="#0f172a" font-weight="700">3〜5日 → ∅150〜200mm</text>
        <text x="227" y="63" text-anchor="middle" font-size="6.8" fill="#334155">SiHCl₃ + H₂ → Si(11N) + 3HCl</text>
        <rect x="162" y="72" width="130" height="22" rx="4" fill="#ccfbf1" stroke="#0d9488"/>
        <text x="227" y="86" text-anchor="middle" font-size="7.2" fill="#0f766e" font-weight="700">排ガス回収率 ≥ 95% 循環</text>
      `);

    case 'fab2_nonmetal_crush_acid_pack':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="20" width="88" height="76" rx="6" fill="#f1f5f9" stroke="#64748b"/>
        <text x="60" y="36" text-anchor="middle" font-size="7.4" fill="#0f172a" font-weight="700">非金属破砕</text>
        <text x="60" y="51" text-anchor="middle" font-size="6.6" fill="#dc2626" font-weight="700">鉄ハンマー厳禁！</text>
        <text x="60" y="65" text-anchor="middle" font-size="6.5" fill="#334155">WC/Si製・熱衝撃</text>
        <text x="60" y="79" text-anchor="middle" font-size="6.8" fill="#0f172a">塊径 10〜100mm</text>
        <path d="M106,58 L120,58" stroke="#0ea5e9" stroke-width="2"/>
        <rect x="122" y="20" width="84" height="76" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="164" y="36" text-anchor="middle" font-size="7.4" fill="#0e7490" font-weight="700">フッ硝酸洗浄</text>
        <text x="164" y="52" text-anchor="middle" font-size="6.8" fill="#0369a1">HF + HNO₃</text>
        <text x="164" y="66" text-anchor="middle" font-size="6.5" fill="#334155">表面一皮溶解</text>
        <text x="164" y="80" text-anchor="middle" font-size="6.4" fill="#047857">&lt;10⁹ atoms/cm²</text>
        <path d="M208,58 L222,58" stroke="#10b981" stroke-width="2"/>
        <rect x="224" y="20" width="80" height="76" rx="6" fill="#ecfdf5" stroke="#10b981"/>
        <text x="264" y="38" text-anchor="middle" font-size="7.5" fill="#047857" font-weight="700">二重真空包装</text>
        <text x="264" y="55" text-anchor="middle" font-size="8.5" fill="#059669" font-weight="700">11N SEG-Si</text>
        <text x="264" y="73" text-anchor="middle" font-size="6.4" fill="#334155">FZ単結晶純度検証</text>
        <text x="264" y="85" text-anchor="middle" font-size="6.4" fill="#334155">出荷基準合格</text>
      `);

    case 'fab2_spruce_pine_crucible':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <path d="M28,28 L34,84 Q80,98 126,84 L132,28" fill="none" stroke="#1e293b" stroke-width="6"/>
        <path d="M36,30 L41,78 Q80,90 119,78 L124,30" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>
        <text x="80" y="58" text-anchor="middle" font-size="7.6" fill="#0369a1" font-weight="700">32インチ (∅800mm)</text>
        <text x="80" y="70" text-anchor="middle" font-size="6.6" fill="#0c4a6e">内面無気泡透明層</text>
        <text x="80" y="103" text-anchor="middle" font-size="6.8" fill="#475569">黒鉛サセプタ + 1回使い切り</text>
        <rect x="148" y="16" width="156" height="86" rx="6" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="226" y="33" text-anchor="middle" font-size="8" fill="#b45309" font-weight="700">スプルースパインの石英砂</text>
        <text x="226" y="49" text-anchor="middle" font-size="7.6" fill="#dc2626" font-weight="700">世界供給 約80%（米国NC州）</text>
        <text x="226" y="63" text-anchor="middle" font-size="6.6" fill="#334155">Sibelco / The Quartz Corp</text>
        <text x="226" y="76" text-anchor="middle" font-size="6.6" fill="#334155">単結晶製造コストの約30%占有</text>
        <text x="226" y="90" text-anchor="middle" font-size="6.4" fill="#92400e">2024ハリケーン・ヘレンで世界震撼</text>
      `);

    case 'fab2_poly_boron_dopant_load':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="24" width="114" height="72" rx="8" fill="#eef2ff" stroke="#6366f1"/>
        <text x="77" y="42" text-anchor="middle" font-size="7.6" fill="#4338ca" font-weight="700">11N多結晶装填</text>
        <text x="77" y="58" text-anchor="middle" font-size="8.6" fill="#312e81" font-weight="700">300〜450 kg</text>
        <text x="77" y="74" text-anchor="middle" font-size="6.8" fill="#7c3aed" font-weight="700">+ ホウ素(B) mg精密調合</text>
        <text x="77" y="86" text-anchor="middle" font-size="6.3" fill="#475569">P型抵抗率・空乏層決定</text>
        <path d="M138,60 L166,60" stroke="#4f46e5" stroke-width="2.2"/>
        <rect x="170" y="24" width="132" height="72" rx="8" fill="#eff6ff" stroke="#2563eb"/>
        <text x="236" y="42" text-anchor="middle" font-size="7.8" fill="#1d4ed8" font-weight="700">真空排気 ＆ Ar置換</text>
        <text x="236" y="59" text-anchor="middle" font-size="7.2" fill="#0f172a">減圧高純度アルゴン(数kPa)</text>
        <text x="236" y="74" text-anchor="middle" font-size="6.6" fill="#dc2626">O₂/N₂混入 → SiC・欠陥発生</text>
        <text x="236" y="86" text-anchor="middle" font-size="6.4" fill="#475569">真空リークテスト徹底</text>
      `);

    case 'fab2_mcz_superconducting_magnet':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="18" y="24" width="32" height="68" rx="5" fill="#1d4ed8"/>
        <text x="34" y="61" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">N</text>
        <rect x="138" y="24" width="32" height="68" rx="5" fill="#dc2626"/>
        <text x="154" y="61" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">S</text>
        <rect x="60" y="34" width="68" height="52" rx="8" fill="#f59e0b" stroke="#92400e" stroke-width="1.6"/>
        <text x="94" y="56" text-anchor="middle" font-size="7.4" fill="#fff" font-weight="700">溶融Si湯</text>
        <text x="94" y="69" text-anchor="middle" font-size="7" fill="#fef3c7">1,420–1,500℃</text>
        <path d="M52,44 L136,44 M52,60 L136,60 M52,76 L136,76" stroke="#38bdf8" stroke-width="1.6" stroke-dasharray="4 2"/>
        <rect x="180" y="18" width="124" height="82" rx="6" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="242" y="35" text-anchor="middle" font-size="8" fill="#4338ca" font-weight="700">超伝導横磁場 MCZ</text>
        <text x="242" y="51" text-anchor="middle" font-size="8.4" fill="#1d4ed8" font-weight="700">0.3〜0.4 テスラ級</text>
        <text x="242" y="67" text-anchor="middle" font-size="6.7" fill="#334155">ローレンツ制動で対流沈静</text>
        <text x="242" y="80" text-anchor="middle" font-size="6.7" fill="#334155">石英酸素溶出を均一安定化</text>
        <text x="242" y="92" text-anchor="middle" font-size="6.4" fill="#475569">Si融点 1,414℃以上完全溶融</text>
      `);

    case 'fab2_seed_dash_necking':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="62" y="14" width="24" height="16" rx="2" fill="#1e293b"/>
        <text x="74" y="25" text-anchor="middle" font-size="6.8" fill="#fff">&lt;100&gt;</text>
        <rect x="70" y="30" width="8" height="34" fill="#0ea5e9"/>
        <polygon points="70,64 78,64 114,96 34,96" fill="#94a3b8" stroke="#334155"/>
        <path d="M74,36 L88,46 M74,44 L60,54 M74,50 L86,58" stroke="#ef4444" stroke-width="1.8"/>
        <text x="74" y="106" text-anchor="middle" font-size="7" fill="#0369a1" font-weight="700">ダッシュネック 3〜4mm</text>
        <rect x="134" y="18" width="170" height="82" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="219" y="35" text-anchor="middle" font-size="8" fill="#1d4ed8" font-weight="700">完全無転位化のからくり</text>
        <text x="142" y="51" font-size="6.8" fill="#334155">① 種結晶&lt;100&gt;を±0.1℃でディップ</text>
        <text x="142" y="64" font-size="6.8" fill="#dc2626">② 径3〜4mmへ高速絞り込み</text>
        <text x="142" y="77" font-size="6.8" fill="#047857" font-weight="700">③ 転位(ズレ)が側面へ全脱出→0!</text>
        <text x="142" y="91" font-size="6.5" fill="#475569">失敗すると300kg全体が全廃棄</text>
      `);

    case 'fab2_mcz_body_pulling_vg':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <polygon points="56,18 76,34 76,94 36,94 36,34" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <rect x="44" y="36" width="24" height="56" fill="#10b981" opacity="0.32"/>
        <text x="56" y="68" text-anchor="middle" font-size="6.6" fill="#065f46" font-weight="700">無欠陥</text>
        <text x="56" y="106" text-anchor="middle" font-size="6.8" fill="#334155">∅305mm × 2m</text>
        <rect x="96" y="16" width="208" height="86" rx="6" fill="#eef2ff" stroke="#4f46e5"/>
        <text x="200" y="32" text-anchor="middle" font-size="8" fill="#3730a3" font-weight="700">V/G比 究極制御（Voronkov窓）</text>
        <rect x="110" y="42" width="54" height="22" rx="3" fill="#fee2e2" stroke="#ef4444"/>
        <text x="137" y="56" text-anchor="middle" font-size="6.6" fill="#b91c1c">V/G大: COP穴</text>
        <rect x="170" y="42" width="60" height="22" rx="3" fill="#d1fae5" stroke="#059669"/>
        <text x="200" y="56" text-anchor="middle" font-size="7" fill="#047857" font-weight="700">無欠陥領域</text>
        <rect x="236" y="42" width="54" height="22" rx="3" fill="#fef3c7" stroke="#d97706"/>
        <text x="263" y="56" text-anchor="middle" font-size="6.6" fill="#92400e">V/G小: I欠陥</text>
        <text x="200" y="79" text-anchor="middle" font-size="6.8" fill="#334155">速度 0.5〜1mm/分・2〜4日間・300〜400kg</text>
        <text x="200" y="92" text-anchor="middle" font-size="6.6" fill="#1d4ed8">信越化学・SUMCO・SUMCO九州の真骨頂</text>
      `);

    case 'fab2_tail_detachment_unloading':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <polygon points="44,18 68,30 68,66 44,94 20,66 20,30" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
        <polygon points="20,66 68,66 44,94" fill="#38bdf8" opacity="0.5"/>
        <text x="44" y="106" text-anchor="middle" font-size="6.8" fill="#0369a1" font-weight="700">テール数十cm</text>
        <rect x="90" y="16" width="214" height="86" rx="6" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="197" y="34" text-anchor="middle" font-size="8" fill="#0369a1" font-weight="700">テール絞り込み離脱 ＆ 数時間徐冷</text>
        <text x="100" y="52" font-size="6.9" fill="#dc2626">× 急離脱: 熱衝撃で転位が上へ逆流(下部数十cm全損)</text>
        <text x="100" y="67" font-size="6.9" fill="#047857" font-weight="700">○ 円錐テール点離脱: 転位逆流を完全シャットアウト</text>
        <text x="100" y="82" font-size="6.8" fill="#334155">• 室温まで数時間徐冷 → 内部応力クラック防止</text>
        <text x="100" y="94" font-size="6.6" fill="#475569">• 専用クレーン炉出し → 外観・重量検査</text>
      `);

    case 'fab2_crop_od_grinding':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <polygon points="18,60 40,42 40,78" fill="#e2e8f0" stroke="#94a3b8" stroke-dasharray="2 2"/>
        <rect x="52" y="38" width="108" height="44" rx="3" fill="#94a3b8" stroke="#1e293b" stroke-width="1.6"/>
        <polygon points="172,42 194,60 172,78" fill="#e2e8f0" stroke="#94a3b8" stroke-dasharray="2 2"/>
        <line x1="46" y1="24" x2="46" y2="92" stroke="#dc2626" stroke-dasharray="3 2"/>
        <line x1="166" y1="24" x2="166" y2="92" stroke="#dc2626" stroke-dasharray="3 2"/>
        <text x="106" y="63" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="700">300.00 ± 0.20mm</text>
        <text x="106" y="102" text-anchor="middle" font-size="6.8" fill="#334155">ブロック長 300〜600mm + レーザー外径制御</text>
        <rect x="202" y="20" width="102" height="78" rx="6" fill="#eff6ff" stroke="#0284c7"/>
        <text x="253" y="38" text-anchor="middle" font-size="7.6" fill="#0369a1" font-weight="700">SEMI規格円柱化</text>
        <text x="253" y="54" text-anchor="middle" font-size="6.6" fill="#334155">• 頭尾をバンドソー切断</text>
        <text x="253" y="68" text-anchor="middle" font-size="6.6" fill="#334155">• FTIR酸素・抵抗評価</text>
        <text x="253" y="82" text-anchor="middle" font-size="6.6" fill="#047857">• FOUP搬送適合</text>
      `);

    case 'fab2_xray_notch_grinding':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="82" cy="60" r="34" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <polygon points="75,95 82,84 89,95" fill="#f59e0b" stroke="#b45309"/>
        <line x1="22" y1="22" x2="62" y2="48" stroke="#dc2626" stroke-width="2"/>
        <line x1="62" y1="48" x2="108" y2="22" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="82" y="63" text-anchor="middle" font-size="8" fill="#0f172a" font-weight="700">&lt;100&gt;</text>
        <text x="82" y="108" text-anchor="middle" font-size="7" fill="#b45309" font-weight="700">1mm Vノッチ（北極星）</text>
        <rect x="136" y="18" width="168" height="82" rx="6" fill="#f0f9ff" stroke="#0369a1"/>
        <text x="220" y="35" text-anchor="middle" font-size="8" fill="#0369a1" font-weight="700">X線結晶方位 ＆ Vノッチ加工</text>
        <text x="144" y="52" font-size="6.8" fill="#334155">• X線回折で&lt;100&gt;/&lt;110&gt;を ±0.1° 測定</text>
        <text x="144" y="66" font-size="6.8" fill="#b45309" font-weight="700">• 深さ約1mmのV字溝を全長研削</text>
        <text x="144" y="80" font-size="6.8" fill="#334155">• 全2,110工程の露光・ダイシング基準</text>
        <text x="144" y="92" font-size="6.5" fill="#dc2626">ズレるとエッチング・切断で斜め割れ！</text>
      `);

    case 'fab2_multiwire_saw_slicing':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="44" y="14" width="110" height="10" rx="2" fill="#1e293b"/>
        <rect x="52" y="24" width="94" height="36" rx="4" fill="#94a3b8" stroke="#334155"/>
        ${[58, 66, 74, 82, 90, 98, 106, 114, 122, 130, 138]
          .map((x) => `<line x1="${x}" y1="30" x2="${x}" y2="90" stroke="#eab308" stroke-width="1.3"/>`)
          .join('')}
        <circle cx="34" cy="84" r="11" fill="#0284c7" stroke="#0c4a6e"/>
        <circle cx="164" cy="84" r="11" fill="#0284c7" stroke="#0c4a6e"/>
        <text x="99" y="104" text-anchor="middle" font-size="7" fill="#0369a1" font-weight="700">∅100µmワイヤー × 1,000本同時切断</text>
        <rect x="184" y="18" width="120" height="82" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="244" y="34" text-anchor="middle" font-size="7.8" fill="#0e7490" font-weight="700">マルチワイヤーソー</text>
        <text x="192" y="50" font-size="6.8" fill="#334155">• 髪の毛径100µm鋼線</text>
        <text x="192" y="63" font-size="6.8" fill="#0f172a" font-weight="700">• 切断厚 850〜950µm</text>
        <text x="192" y="76" font-size="6.6" fill="#334155">• 東京精密 / コマツNTC</text>
        <text x="192" y="89" font-size="6.5" fill="#dc2626">ワープ大→露光ボケ直結</text>
      `);

    case 'fab2_debond_laser_id':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="24" width="96" height="70" rx="6" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="64" y="42" text-anchor="middle" font-size="7.6" fill="#0369a1" font-weight="700">剥離・超音波洗浄</text>
        <text x="64" y="58" text-anchor="middle" font-size="6.8" fill="#334155">温水＋界面活性剤</text>
        <text x="64" y="72" text-anchor="middle" font-size="6.5" fill="#dc2626">切粉残存→引っ掻き傷</text>
        <path d="M116,58 L136,58" stroke="#0284c7" stroke-width="2.2"/>
        <rect x="140" y="18" width="164" height="84" rx="6" fill="#fffbeb" stroke="#d97706"/>
        <circle cx="182" cy="64" r="24" fill="#cbd5e1" stroke="#334155"/>
        <rect x="170" y="78" width="24" height="5" fill="#d97706"/>
        <line x1="182" y1="26" x2="182" y2="76" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="252" y="38" text-anchor="middle" font-size="7.6" fill="#b45309" font-weight="700">レーザーT7刻印</text>
        <text x="252" y="53" text-anchor="middle" font-size="6.6" fill="#334155">エッジ数mm以内</text>
        <text x="252" y="66" text-anchor="middle" font-size="6.6" fill="#334155">OCR自動読取検証</text>
        <text x="252" y="80" text-anchor="middle" font-size="6.6" fill="#047857" font-weight="700">全2,000工程1枚追跡</text>
      `);

    case 'fab2_edge_bevel_grinding':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="18" width="136" height="82" rx="6" fill="#ecfdf5" stroke="#10b981"/>
        <text x="84" y="34" text-anchor="middle" font-size="7.6" fill="#047857" font-weight="700">P01-038 エッジ面取り</text>
        <path d="M30,52 L116,52 Q132,52 132,64 Q132,76 116,76 L30,76" fill="#cbd5e1" stroke="#059669" stroke-width="2"/>
        <text x="84" y="92" text-anchor="middle" font-size="6.6" fill="#334155">SEMI丸み形状でチッピング防止</text>
        <rect x="162" y="18" width="142" height="82" rx="6" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="233" y="34" text-anchor="middle" font-size="7.6" fill="#0f766e" font-weight="700">P01-039 両面平面研削</text>
        <rect x="184" y="42" width="98" height="10" rx="2" fill="#334155"/>
        <rect x="178" y="55" width="110" height="8" rx="2" fill="#38bdf8"/>
        <rect x="184" y="66" width="98" height="10" rx="2" fill="#334155"/>
        <text x="233" y="90" text-anchor="middle" font-size="6.8" fill="#0f172a">厚み均一 ≈ 800µm (DISCO/岡本)</text>
      `);

    case 'fab2_chem_etch_donor_killer':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="18" width="138" height="82" rx="6" fill="#ecfdf5" stroke="#059669"/>
        <text x="85" y="34" text-anchor="middle" font-size="7.6" fill="#047857" font-weight="700">両面化学エッチング</text>
        <rect x="30" y="46" width="110" height="8" fill="#fca5a5"/>
        <rect x="30" y="54" width="110" height="16" fill="#94a3b8"/>
        <rect x="30" y="70" width="110" height="8" fill="#fca5a5"/>
        <text x="85" y="91" text-anchor="middle" font-size="6.6" fill="#dc2626">加工変質層20〜40µm溶解</text>
        <rect x="164" y="18" width="140" height="82" rx="6" fill="#fff7ed" stroke="#ea580c"/>
        <text x="234" y="34" text-anchor="middle" font-size="7.6" fill="#c2410c" font-weight="700">ドナーキラー熱処理</text>
        <text x="234" y="52" text-anchor="middle" font-size="8.4" fill="#ea580c" font-weight="700">600〜700℃・数十分</text>
        <text x="234" y="69" text-anchor="middle" font-size="6.6" fill="#334155">酸素サーマルドナー消去</text>
        <text x="234" y="83" text-anchor="middle" font-size="6.5" fill="#475569">KOKUSAI縦型炉・4探針測定</text>
      `);

    case 'fab2_edge_mirror_dsp':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="22" y="24" width="128" height="16" rx="3" fill="#2563eb"/>
        <rect x="18" y="46" width="136" height="12" rx="3" fill="#cbd5e1" stroke="#0f172a"/>
        <rect x="22" y="64" width="128" height="16" rx="3" fill="#2563eb"/>
        <text x="86" y="35" text-anchor="middle" font-size="7" fill="#fff" font-weight="700">上定盤パッド</text>
        <text x="86" y="75" text-anchor="middle" font-size="7" fill="#fff" font-weight="700">下定盤パッド</text>
        <text x="86" y="96" text-anchor="middle" font-size="6.8" fill="#0d9488" font-weight="700">コロイダルシリカ両面同時DSP</text>
        <rect x="164" y="16" width="140" height="86" rx="6" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="234" y="33" text-anchor="middle" font-size="7.8" fill="#0f766e" font-weight="700">SEMI M1 究極平坦度</text>
        <text x="234" y="50" text-anchor="middle" font-size="8.2" fill="#0f172a" font-weight="700">厚み 775 ± 20 µm</text>
        <text x="234" y="63" text-anchor="middle" font-size="6.6" fill="#0369a1">(CIS Prime ±10〜15 µm)</text>
        <text x="234" y="77" text-anchor="middle" font-size="7.6" fill="#059669" font-weight="700">SFQR ＜ 15 nm 級</text>
        <text x="234" y="92" text-anchor="middle" font-size="6.4" fill="#475569">+ 端面鏡面研磨(nm級)</text>
      `);

    case 'fab2_final_finish_cmp':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="60" width="144" height="28" rx="4" fill="#1e293b"/>
        <line x1="20" y1="59" x2="164" y2="59" stroke="#38bdf8" stroke-width="2.6"/>
        <path d="M52,20 L92,58 L132,20" fill="none" stroke="#eab308" stroke-width="2.2"/>
        <text x="92" y="77" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="700">デバイス面（超鏡面）</text>
        <text x="92" y="102" text-anchor="middle" font-size="7" fill="#0369a1" font-weight="700">レーザー散乱ヘイズ極小</text>
        <rect x="176" y="18" width="128" height="82" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="240" y="35" text-anchor="middle" font-size="7.8" fill="#0e7490" font-weight="700">片面仕上げCMP</text>
        <text x="240" y="54" text-anchor="middle" font-size="9.5" fill="#0284c7" font-weight="700">Ra ＜ 0.1 nm</text>
        <text x="240" y="70" text-anchor="middle" font-size="6.8" fill="#0f172a">Si原子1個(0.235nm)未満！</text>
        <text x="240" y="85" text-anchor="middle" font-size="6.4" fill="#dc2626">曇り残存→エピ欠陥発生</text>
      `);

    case 'fab2_rca_megasonic_pw_check':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="14" y="20" width="90" height="76" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="59" y="36" text-anchor="middle" font-size="7.5" fill="#0e7490" font-weight="700">SC-1 洗浄</text>
        <text x="59" y="50" text-anchor="middle" font-size="6.5" fill="#334155">NH₄OH + H₂O₂</text>
        <text x="59" y="64" text-anchor="middle" font-size="6.6" fill="#0284c7" font-weight="700">+ 1MHzメガソニック</text>
        <text x="59" y="78" text-anchor="middle" font-size="6.4" fill="#475569">シリカ粒子・有機除去</text>
        <rect x="112" y="20" width="88" height="76" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="156" y="36" text-anchor="middle" font-size="7.5" fill="#1d4ed8" font-weight="700">SC-2 洗浄</text>
        <text x="156" y="50" text-anchor="middle" font-size="6.5" fill="#334155">HCl + H₂O₂</text>
        <text x="156" y="64" text-anchor="middle" font-size="6.6" fill="#dc2626" font-weight="700">微量重金属除去</text>
        <text x="156" y="78" text-anchor="middle" font-size="6.4" fill="#475569">SCREEN / TEL洗浄機</text>
        <rect x="208" y="20" width="98" height="76" rx="6" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="257" y="36" text-anchor="middle" font-size="7.5" fill="#6d28d9" font-weight="700">PW中間検査</text>
        <text x="257" y="53" text-anchor="middle" font-size="7.6" fill="#5b21b6" font-weight="700">LPD 20〜30nm</text>
        <text x="257" y="68" text-anchor="middle" font-size="6.5" fill="#334155">KLA Surfscan全数</text>
        <text x="257" y="81" text-anchor="middle" font-size="6.3" fill="#475569">不良品へのエピ無駄防</text>
      `);

    case 'fab2_backside_seal_preclean':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="18" width="138" height="82" rx="6" fill="#f5f3ff" stroke="#8b5cf6"/>
        <text x="85" y="34" text-anchor="middle" font-size="7.5" fill="#6d28d9" font-weight="700">P01-047 裏面封止膜</text>
        <rect x="32" y="48" width="106" height="16" fill="#64748b"/>
        <rect x="32" y="64" width="106" height="9" fill="#f59e0b"/>
        <text x="85" y="60" text-anchor="middle" font-size="6.6" fill="#fff">P+ Si基板</text>
        <text x="85" y="86" text-anchor="middle" font-size="6.5" fill="#92400e">SiO₂(数百nm)でB蒸発遮断</text>
        <rect x="164" y="18" width="140" height="82" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="234" y="34" text-anchor="middle" font-size="7.5" fill="#0e7490" font-weight="700">P01-049 DHF自然酸化除去</text>
        <rect x="180" y="54" width="108" height="18" fill="#0284c7"/>
        <text x="234" y="66" text-anchor="middle" font-size="7" fill="#fff" font-weight="700">Si-H 水素終端面</text>
        <text x="234" y="49" text-anchor="middle" font-size="6.5" fill="#dc2626">約1nm自然酸化膜を希フッ酸剥離</text>
        <text x="234" y="87" text-anchor="middle" font-size="6.5" fill="#334155">エピ層の積層欠陥を完全予防</text>
      `);

    case 'fab2_molecular_ion_implanter':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="24" width="52" height="32" rx="4" fill="#1e293b"/>
        <text x="42" y="43" text-anchor="middle" font-size="7" fill="#f8fafc" font-weight="700">分子イオン源</text>
        <path d="M68,40 Q106,40 112,72" fill="none" stroke="#c026d3" stroke-width="5"/>
        <circle cx="96" cy="48" r="14" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3 2"/>
        <ellipse cx="112" cy="84" rx="34" ry="8" fill="#3b82f6" stroke="#1e3a8a"/>
        <text x="112" y="103" text-anchor="middle" font-size="6.8" fill="#7c3aed" font-weight="700">数十keV・均一全面走査</text>
        <rect x="160" y="16" width="144" height="86" rx="6" fill="#fdf4ff" stroke="#c026d3"/>
        <text x="232" y="33" text-anchor="middle" font-size="7.8" fill="#a21caf" font-weight="700">CIS専用 分子イオン注入</text>
        <text x="232" y="49" text-anchor="middle" font-size="7.5" fill="#0f172a" font-weight="700">C₃H₅⁺ / CH₂P⁺ / SiHₓ+C₂Hᵧ</text>
        <text x="232" y="64" text-anchor="middle" font-size="6.8" fill="#7c3aed">Cドーズ 10¹⁴〜10¹⁵ /cm² 級</text>
        <text x="232" y="78" text-anchor="middle" font-size="6.5" fill="#334155">日新イオン機器 / 住友重機械</text>
        <text x="232" y="92" text-anchor="middle" font-size="6.4" fill="#dc2626">弱いと白キズ激増・SIMS検証</text>
      `);

    case 'fab2_ci_complex_gettering_cutaway':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="18" y="16" width="150" height="34" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="93" y="31" text-anchor="middle" font-size="7.4" fill="#0369a1" font-weight="700">無欠陥エピ層（PD本体）</text>
        <text x="93" y="43" text-anchor="middle" font-size="6.4" fill="#0284c7">H₂拡散→界面ダングリングボンド修復</text>
        <rect x="18" y="52" width="150" height="22" rx="3" fill="#fef08a" stroke="#ca8a04" stroke-width="1.6"/>
        ${[36, 64, 92, 120, 148]
          .map(
            (x) =>
              `<circle cx="${x}" cy="63" r="5" fill="#a855f7"/><circle cx="${x + 6}" cy="62" r="2.6" fill="#dc2626"/>`
          )
          .join('')}
        <rect x="18" y="76" width="150" height="22" rx="4" fill="#475569"/>
        <text x="93" y="90" text-anchor="middle" font-size="7" fill="#fff">P+ 単結晶基板（BSI薄化対象）</text>
        <rect x="176" y="16" width="130" height="86" rx="6" fill="#fdf4ff" stroke="#d946ef"/>
        <text x="241" y="31" text-anchor="middle" font-size="7.4" fill="#a21caf" font-weight="700">2026年10月 SUMCO論文</text>
        <text x="241" y="44" text-anchor="middle" font-size="6.5" fill="#334155">∅5nm CI複合体シート</text>
        <text x="241" y="58" text-anchor="middle" font-size="7.2" fill="#dc2626" font-weight="700">Cu 9.7×10¹²/cm² 捕獲</text>
        <text x="241" y="73" text-anchor="middle" font-size="7.6" fill="#059669" font-weight="700">白キズ −32% 削減</text>
        <text x="241" y="86" text-anchor="middle" font-size="7.6" fill="#0284c7" font-weight="700">暗電流 −13% 低減</text>
        <text x="241" y="97" text-anchor="middle" font-size="5.8" fill="#64748b">MDPI Sensors 26(20), 6659</text>
      `);

    case 'fab2_single_wafer_epi_reactor':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <path d="M22,74 Q94,20 166,74 Z" fill="#fefce8" stroke="#ca8a04" stroke-width="1.6"/>
        <rect x="44" y="66" width="100" height="8" rx="2" fill="#0ea5e9"/>
        <rect x="38" y="74" width="112" height="8" rx="2" fill="#1e293b"/>
        <path d="M22,56 L166,56" stroke="#06b6d4" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="94" y="46" text-anchor="middle" font-size="7" fill="#b45309" font-weight="700">1,050〜1,150℃ ランプ加熱</text>
        <text x="94" y="96" text-anchor="middle" font-size="6.8" fill="#0369a1">H₂ベーク → TCS+H₂層流成長</text>
        <rect x="178" y="18" width="126" height="82" rx="6" fill="#f5f3ff" stroke="#9333ea"/>
        <text x="241" y="34" text-anchor="middle" font-size="7.8" fill="#7e22ce" font-weight="700">枚葉式エピタキシャル炉</text>
        <text x="241" y="50" text-anchor="middle" font-size="8" fill="#0f172a" font-weight="700">膜厚 4〜10 µm (±1%)</text>
        <text x="241" y="64" text-anchor="middle" font-size="6.6" fill="#0369a1">厚膜GS・NIR: 8.5 µm級</text>
        <text x="241" y="78" text-anchor="middle" font-size="6.5" fill="#334155">AMAT Centura / ASM Epsilon</text>
        <text x="241" y="91" text-anchor="middle" font-size="6.4" fill="#047857">COPゼロ・PD本体完成</text>
      `);

    case 'fab2_double_epi_post_clean':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="20" width="136" height="12" rx="2" fill="#cffafe" stroke="#06b6d4"/>
        <text x="88" y="29" text-anchor="middle" font-size="6.5" fill="#0e7490" font-weight="700">O₃清浄化学酸化膜ベール</text>
        <rect x="20" y="34" width="136" height="24" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <text x="88" y="49" text-anchor="middle" font-size="7" fill="#0369a1" font-weight="700">段階ドープEpi層(PD)</text>
        <rect x="20" y="60" width="136" height="14" rx="2" fill="#fecaca" stroke="#dc2626"/>
        <text x="88" y="70" text-anchor="middle" font-size="6.8" fill="#b91c1c" font-weight="700">高濃度P+ エッチストップ層</text>
        <rect x="20" y="76" width="136" height="22" rx="2" fill="#475569"/>
        <text x="88" y="90" text-anchor="middle" font-size="6.8" fill="#fff">P+ 単結晶基板</text>
        <rect x="168" y="20" width="136" height="78" rx="6" fill="#faf5ff" stroke="#9333ea"/>
        <text x="236" y="36" text-anchor="middle" font-size="7.6" fill="#7e22ce" font-weight="700">二重エピ ＆ 保護洗浄</text>
        <text x="176" y="52" font-size="6.6" fill="#334155">• BSI薄化でピタリ停止</text>
        <text x="176" y="65" font-size="6.6" fill="#334155">• 赤〜青の分光感度均一</text>
        <text x="176" y="78" font-size="6.6" fill="#334155">• SRP広がり抵抗測定</text>
        <text x="176" y="91" font-size="6.6" fill="#0369a1">• 帯電防止＋オゾン水</text>
      `);

    case 'fab2_surfscan_lpd_inspection':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="80" cy="60" r="36" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
        <circle cx="80" cy="60" r="24" fill="none" stroke="#38bdf8" opacity="0.4"/>
        <circle cx="80" cy="60" r="12" fill="none" stroke="#38bdf8" opacity="0.4"/>
        <circle cx="68" cy="48" r="2.8" fill="#f43f5e"/>
        <circle cx="96" cy="68" r="2.5" fill="#38bdf8"/>
        <circle cx="74" cy="76" r="2.5" fill="#38bdf8"/>
        <line x1="20" y1="22" x2="68" y2="48" stroke="#a855f7" stroke-width="2"/>
        <rect x="134" y="18" width="170" height="82" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="219" y="34" text-anchor="middle" font-size="8" fill="#1d4ed8" font-weight="700">KLA Surfscan SP 全数LPD</text>
        <text x="219" y="51" text-anchor="middle" font-size="8.5" fill="#7c3aed" font-weight="700">検出感度 19〜30 nm 級</text>
        <text x="219" y="66" text-anchor="middle" font-size="6.8" fill="#334155">ウイルスより小さい異物・結晶欠陥</text>
        <text x="219" y="79" text-anchor="middle" font-size="6.8" fill="#dc2626">エピ欠陥＝画素白キズ・リーク直結</text>
        <text x="219" y="92" text-anchor="middle" font-size="6.5" fill="#475569">全数座標マップ出力・極少基準</text>
      `);

    case 'fab2_wafersight_epi_mapping':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="24" width="14" height="68" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <rect x="52" y="24" width="8" height="68" rx="2" fill="#10b981" stroke="#047857"/>
        <rect x="78" y="24" width="14" height="68" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
        <path d="M34,42 L52,42 M60,42 L78,42 M34,74 L52,74 M60,74 L78,74" stroke="#eab308" stroke-width="1.6" stroke-dasharray="2 2"/>
        <text x="56" y="104" text-anchor="middle" font-size="6.8" fill="#0f766e" font-weight="700">垂直両面光干渉</text>
        <rect x="108" y="16" width="196" height="86" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="206" y="33" text-anchor="middle" font-size="7.8" fill="#0e7490" font-weight="700">WaferSight ＆ FTIR膜厚/抵抗分布</text>
        <text x="116" y="50" font-size="6.8" fill="#0f172a" font-weight="700">• ナノトポグラフィ: 数nm〜十数nm全数計測</text>
        <text x="116" y="63" font-size="6.6" fill="#dc2626">  うねり→Cu-Cu接合ボイド(気泡)発生!</text>
        <text x="116" y="77" font-size="6.8" fill="#0369a1" font-weight="700">• エピ膜厚・抵抗率分布: ±1〜2%級 SPC</text>
        <text x="116" y="90" font-size="6.6" fill="#334155">  端部の厚みズレ→赤色感度低下を防止</text>
      `);

    case 'fab2_vpd_icpms_edge_check':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="14" y="16" width="140" height="86" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="84" y="32" text-anchor="middle" font-size="7.5" fill="#1d4ed8" font-weight="700">VPD-ICP-MS / μ-PCD</text>
        <text x="84" y="49" text-anchor="middle" font-size="8" fill="#0f172a" font-weight="700">&lt; 10⁹ atoms/cm²</text>
        <text x="84" y="64" text-anchor="middle" font-size="6.5" fill="#334155">HF蒸気液滴でFe/Cu/Ni分析</text>
        <text x="84" y="77" text-anchor="middle" font-size="6.5" fill="#0369a1">電子寿命(キャリアライフタイム)</text>
        <text x="84" y="91" text-anchor="middle" font-size="6.5" fill="#047857" font-weight="700">品質保証書（COA）発行</text>
        <rect x="162" y="16" width="144" height="86" rx="6" fill="#fff1f2" stroke="#f43f5e"/>
        <text x="234" y="32" text-anchor="middle" font-size="7.5" fill="#be123c" font-weight="700">裏面ホットスポット防止</text>
        <rect x="176" y="68" width="116" height="10" fill="#334155"/>
        <circle cx="234" cy="64" r="4" fill="#ef4444"/>
        <path d="M178,60 L216,60 Q234,44 252,60 L290,60" fill="none" stroke="#0284c7" stroke-width="3"/>
        <text x="234" y="92" text-anchor="middle" font-size="6.4" fill="#be123c">裏面ゴミ1粒→露光ボケで画素塊全滅</text>
      `);

    case 'fab2_fosb_25wafer_clean_load':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="24" y="20" width="96" height="76" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
        ${[32, 40, 48, 56, 64, 72, 80, 88]
          .map((y) => `<line x1="34" y1="${y}" x2="110" y2="${y}" stroke="#0284c7" stroke-width="2"/>`)
          .join('')}
        <text x="72" y="106" text-anchor="middle" font-size="7" fill="#047857" font-weight="700">FOSB（25枚密閉）</text>
        <rect x="136" y="18" width="168" height="82" rx="6" fill="#f0fdf4" stroke="#10b981"/>
        <text x="220" y="34" text-anchor="middle" font-size="8" fill="#047857" font-weight="700">ISOクラス1〜2 非接触ロボット収納</text>
        <text x="144" y="51" font-size="6.8" fill="#334155">• 超高純度ポリカーボネートFOSB</text>
        <text x="144" y="64" font-size="6.8" fill="#0f172a" font-weight="700">• 信越ポリマー / ミライアル製</text>
        <text x="144" y="77" font-size="6.8" fill="#0369a1">• 超高純度N₂窒素パージ気密封入</text>
        <text x="144" y="90" font-size="6.6" fill="#475569">• 気密確認・RFIDタグ＆T7 ID紐付</text>
      `);

    case 'fab2_controlled_logistics_fab_bridge':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="14" y="20" width="94" height="74" rx="6" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="61" y="37" text-anchor="middle" font-size="7.4" fill="#b45309" font-weight="700">ウェーハ工場出荷</text>
        <text x="61" y="52" text-anchor="middle" font-size="6.8" fill="#334155">信越化学・SUMCO</text>
        <text x="61" y="66" text-anchor="middle" font-size="6.4" fill="#0f172a">衝撃G・温湿度ロガー</text>
        <text x="61" y="80" text-anchor="middle" font-size="6.4" fill="#047857">防振空調トラック/空輸</text>
        <path d="M110,56 L132,56" stroke="#f59e0b" stroke-width="2.4"/>
        <rect x="134" y="20" width="90" height="74" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="179" y="37" text-anchor="middle" font-size="7.4" fill="#1d4ed8" font-weight="700">センサー工場受入</text>
        <text x="179" y="52" text-anchor="middle" font-size="6.6" fill="#0f172a">ソニー(熊本/長崎/大分)</text>
        <text x="179" y="65" text-anchor="middle" font-size="6.6" fill="#0f172a">キヤノン(川崎/平塚/綾瀬)</text>
        <text x="179" y="80" text-anchor="middle" font-size="6.4" fill="#334155">MES照合・抜取検証</text>
        <path d="M226,56 L242,56" stroke="#7c3aed" stroke-width="2.4"/>
        <rect x="244" y="20" width="62" height="74" rx="6" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="275" y="42" text-anchor="middle" font-size="7.6" fill="#6d28d9" font-weight="700">第3巻へ</text>
        <text x="275" y="58" text-anchor="middle" font-size="6.5" fill="#334155">設計＆</text>
        <text x="275" y="70" text-anchor="middle" font-size="6.5" fill="#334155">フォトマスク</text>
        <text x="275" y="84" text-anchor="middle" font-size="6.2" fill="#7c3aed">P02-001〜050</text>
      `);

    default:
      return null;
  }
}
