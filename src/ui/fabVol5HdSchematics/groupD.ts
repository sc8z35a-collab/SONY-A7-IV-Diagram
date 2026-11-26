import { wrapFab3HdSvg, drawCompareFrame, drawKpiBox, drawPill } from '../fabVol3HdSchematics/shared';

/**
 * Vol.5 Ultra-HD 720x470 Beginner-Visual Posters — Group D (F5-33 – F5-38):
 * Block 4-E (P04-179–P04-210, 32 Steps + 700-Step Vol.6 Logic Portal):
 * SiCN Hydrophilic Dielectric, Mask #37 HB-Via, CROWN JEWEL Mask #38 50.4M HB-Pads,
 * CROWN JEWEL 2-5nm Cu Recess & Ra<0.3nm Ultra-Flat CMP, Pre-Bond AFM + KLA Surfscan Zero-Dust, and 700-Step Vol.6 Portal!
 */
export const FAB5_HD_GROUP_D: Record<string, () => string> = {
  fab5_p179_hb_sicn_dielectric: () =>
    wrapFab3HdSvg({
      badge: 'F5-33',
      stepTag: 'P04-179〜181 [論文]',
      title: 'ハイブリッド接合専用絶縁膜（SiO₂ / SiCN）成膜・緻密化',
      analogy: '接着剤ゼロで常温のまま原子の力（水素結合）でピタッと吸い付く魔法の接合ガラス！',
      accent: '#0891b2',
      accentSoft: '#ecfeff',
      body: `
        <rect x="26" y="84" width="406" height="248" rx="10" fill="#ecfeff" stroke="#0891b2" stroke-width="1.5"/>
        <text x="229" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#155e75">🧲 常温で「接着剤なし」でくっつく SiCN / SiO₂ 接合母材</text>
        <!-- Upper Logic Wafer Dielectric descending toward Lower Pixel Wafer Dielectric -->
        <rect x="64" y="128" width="330" height="44" rx="6" fill="#0284c7"/>
        <text x="229" y="154" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">（フェーズ6で合体する）ロジック側 SiCN / SiO₂</text>
        <!-- Hydrogen Bonding -OH glow links -->
        ${[106, 168, 229, 290, 352]
          .map((x) => `<text x="${x}" y="194" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0891b2">OH⋯HO</text>`)
          .join('')}
        <rect x="64" y="206" width="330" height="58" rx="6" fill="#06b6d4" stroke="#155e75" stroke-width="1.8"/>
        <text x="229" y="232" text-anchor="middle" font-size="10.4" font-weight="900" fill="#ffffff">本工程：画素側 SiCN / TEOS-SiO₂ 接合膜</text>
        <text x="229" y="250" text-anchor="middle" font-size="8.8" font-weight="700" fill="#ecfeff">2µm以下狭ピッチでは銅拡散防止＆強力接合のSiCNが主力!</text>
        ${drawPill(92, 286, 274, 'AMAT / TEL PECVD ＋ 緻密化脱ガス処理', true)}

        ${drawCompareFrame(448, 84, 246, 248, '❌ 膜密度・水素が不均一だと？', '#e11d48', '#fff1f2')}
        <rect x="470" y="144" width="202" height="72" rx="8" fill="#0f172a"/>
        <ellipse cx="571" cy="180" rx="54" ry="22" fill="#e11d48" fill-opacity="0.72" stroke="#fda4af" stroke-width="2"/>
        <text x="571" y="184" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">💥 脱ガス気泡(ボイド)!</text>
        <text x="571" y="238" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9f1239">接合アニールでガスが吹き出し</text>
        <text x="571" y="256" text-anchor="middle" font-size="9.6" font-weight="900" fill="#be123c">画素ブロック丸ごと死亡！</text>
        ${drawPill(468, 286, 206, '緻密化でアウトガス完全ゼロ', true)}
      `,
      cards: [
        { label: 'なぜSiCNが最強か', line1: '2µm以下狭ピッチで強力な接合力と', line2: '銅拡散防止を両立 [学会・論文]', accent: '#0891b2' },
        { label: '接着剤レスの魔法', line1: '表面の-OH基が常温で水素結合し', line2: '原子の力で2枚のウェーハが一体化', accent: '#0284c7' },
        { label: '緻密化アニールの意味', line1: '余分な水素・水分を事前に追い出し', line2: '接合加熱時のボイド破裂を根絶', accent: '#e11d48' },
      ],
    }),

  fab5_m37_hb_via_pattern: () =>
    wrapFab3HdSvg({
      badge: 'F5-34',
      stepTag: 'Mask #37 / 1–6µm',
      title: '【Mask #37】ハイブリッド接合ビア（HB-Via）露光・エッチング',
      analogy: '5階建て銅道路から屋上のCu-Cu接合コンセントへ電気を引き上げる最終縦穴！',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">🔌 M5最上幹線 → 屋上Cu-Cuパッドへ直結する最終縦穴（HB-Via）</text>
        <rect x="48" y="138" width="380" height="118" fill="#67e8f9" fill-opacity="0.55" stroke="#0891b2"/>
        ${[98, 168, 238, 308, 378]
          .map(
            (x) =>
              `<rect x="${x - 14}" y="138" width="28" height="118" fill="#ffffff" stroke="#7c3aed" stroke-width="1.6"/><line x1="${x}" y1="118" x2="${x}" y2="248" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#f534-arrPurple)"/>`
          )
          .join('')}
        <rect x="48" y="256" width="380" height="44" fill="#ea580c"/>
        <text x="238" y="282" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">画素BEOL 5階最上層配線（M5）</text>
        <text x="238" y="318" text-anchor="middle" font-size="9.4" font-weight="800" fill="#5b21b6">対応ピッチ 1〜6 µm（KrF/ArFスキャナー＋エッチャー）</text>

        ${drawKpiBox(468, 84, 226, 78, 'マスク＆工程', 'Mask #37 / ピッチ 1–6µm', 'P04-182〜193（L-01〜L-12）', '#7c3aed')}
        ${drawCompareFrame(468, 174, 226, 158, 'ビア抜けが1本あると？', '#e11d48', '#fff1f2')}
        <text x="581" y="222" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">屋上Cu-Cuパッドがくっついても</text>
        <text x="581" y="240" text-anchor="middle" font-size="10" font-weight="900" fill="#be123c">上下チップ間の信号が途絶！</text>
        ${drawPill(486, 278, 190, '次Mask #38と一体銅形成', true)}
      `,
      cards: [
        { label: '屋上コンセントへの縦穴', line1: '最上層配線から屋上Cu-Cuパッドへ', line2: '電気を引き上げる最終ビア穴を掘削', accent: '#7c3aed' },
        { label: '1〜6µmピッチ対応', line1: 'Mask #37 / P04-182〜193(12工程)', line2: '列単位から1画素直結まで対応 [論文]', accent: '#0284c7' },
        { label: '一体デュアルダマシン', line1: '続くMask #38(HB-Pad)と合わせ', line2: '継ぎ目ゼロの接合銅柱を一気充填', accent: '#ea580c' },
      ],
    }),

  fab5_m38_hb_cu_pad_50m: () =>
    wrapFab3HdSvg({
      badge: 'F5-35',
      stepTag: '★Mask #38 5,040万個!',
      title: '【Mask #38】ハイブリッド接合Cuパッド（最大5,040万個の銅コンセント！）',
      analogy: '0.5〜3.0µm角の極小銅コンセントを最大5,040万個、外周ダミー込みで均一密度に彫り抜く！',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <!-- Left: Historic Pitch Evolution Timeline (2017 -> 2019 -> 2022 -> 2025!) -->
        <rect x="26" y="84" width="406" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.6"/>
        <text x="229" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9a3412">🚀 ソニーCu-Cuハイブリッド接合パッド微細化の驚異的進化！</text>
        ${[
          { y: 124, yr: '2017年 量産品', spec: '3.0µm角 / 6.0µmピッチ [確認済み]', w: 92, col: '#64748b' },
          { y: 170, yr: '2019年 世代', spec: '3.0µmピッチ（密度4倍!）[学会・論文]', w: 158, col: '#0284c7' },
          { y: 216, yr: '2022年 ECTC', spec: '1.0µmピッチ（密度36倍!!）[学会・論文]', w: 236, col: '#7c3aed' },
          { y: 262, yr: '2025年 ISSCC GS', spec: '★ 5,040万個のCu-Cu結合!! [確認済み]', w: 344, col: '#e11d48' },
        ]
          .map(
            (e) => `
          <rect x="44" y="${e.y}" width="${e.w}" height="34" rx="6" fill="${e.col}"/>
          <text x="54" y="${e.y + 14.5}" font-size="8.6" font-weight="800" fill="#ffffff">${e.yr}</text>
          <text x="54" y="${e.y + 28}" font-size="8.8" font-weight="900" fill="#fef08a">${e.spec}</text>`
          )
          .join('')}
        <text x="229" y="318" text-anchor="middle" font-size="9.2" font-weight="800" fill="#9a3412">パッド寸法 0.5〜3.0µm角（ArF/KrFスキャナー・最終13枚目マスク！）</text>

        <!-- Right: Uniform Pad Density + Dummy Pads for CMP -->
        ${drawCompareFrame(448, 84, 246, 248, '📐 なぜ「外周ダミーパッド」必須？', '#059669', '#ecfdf5')}
        <rect x="476" y="124" width="190" height="114" rx="8" fill="#0f172a"/>
        ${[0, 1, 2, 3]
          .map((r) =>
            [0, 1, 2, 3, 4, 5]
              .map((c) => {
                const dummy = r === 0 || r === 3 || c === 0 || c === 5;
                return `<rect x="${490 + c * 28}" y="${136 + r * 24}" width="18" height="14" rx="2" fill="${dummy ? '#fbbf24' : '#ea580c'}"/>`;
              })
              .join('')
          )
          .join('')}
        <text x="571" y="256" text-anchor="middle" font-size="9.2" font-weight="800" fill="#065f46">銅面積密度を全面均一にしないと</text>
        <text x="571" y="272" text-anchor="middle" font-size="9.2" font-weight="800" fill="#be123c">次工程CMPでリセスがバラつく！</text>
        ${drawPill(468, 290, 206, '橙=信号パッド / 黄=ダミーパッド', true)}
      `,
      cards: [
        { label: '5,040万個の銅接点', line1: '2017年6µm→2022年1µm→2025年', line2: 'ISSCCフルサイズGSで5,040万結合!', accent: '#e11d48' },
        { label: '均一密度ダミー設計', line1: '外周空き地にもダミーCuパッド配置', line2: '全面のCMP凹み量(2–5nm)をピタリ統一', accent: '#059669' },
        { label: 'BEOL最終Mask #38', line1: 'P04-194〜205（L-01〜L-12完了）', line2: 'ArF/KrF露光で0.5–3.0µm角を彫刻', accent: '#ea580c' },
      ],
    }),

  fab5_p206_hb_recess_cmp: () =>
    wrapFab3HdSvg({
      badge: 'F5-36',
      stepTag: '★神業CMP 凹2–5nm',
      title: 'ハイブリッド接合専用・超精密CMP（Ra＜0.3nm＆わざと2〜5nm Cuリセス！）',
      analogy: '出っ張れば気泡ボイド、凹みすぎれば断線！ 銅だけ原子10〜20個分(2〜5nm)凹ませる神業！',
      accent: '#e11d48',
      accentSoft: '#fff1f2',
      body: `
        <!-- 3-Column Visual Comparison: NG Protrusion / OK 2-5nm Sweet Spot + Thermal Expansion / NG Too Deep! -->
        ${drawCompareFrame(24, 84, 210, 248, '❌ NG：1nmでも出っ張ると', '#e11d48', '#fff1f2')}
        <rect x="40" y="138" width="178" height="28" fill="#38bdf8"/>
        <rect x="96" y="160" width="66" height="18" fill="#ea580c"/>
        <!-- Lower wafer bumped apart -> Air Gap Void! -->
        <rect x="96" y="178" width="66" height="18" fill="#ea580c"/>
        <rect x="40" y="190" width="178" height="28" fill="#38bdf8"/>
        <text x="129" y="182" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">つっかえ棒!</text>
        <text x="129" y="242" text-anchor="middle" font-size="9.4" font-weight="900" fill="#be123c">周りのガラスが浮いて</text>
        <text x="129" y="258" text-anchor="middle" font-size="9.4" font-weight="900" fill="#be123c">気泡（ボイド）だらけ！</text>
        ${drawPill(40, 290, 178, '全面剥離・接合失敗', false)}

        ${drawCompareFrame(246, 84, 228, 248, '✅ 神業の正解：2〜5nm 凹み！', '#059669', '#ecfdf5')}
        <!-- Step A: Room Temp Dielectric Contact -->
        <rect x="262" y="122" width="196" height="22" fill="#38bdf8"/>
        <rect x="326" y="122" width="68" height="16" fill="#ea580c"/>
        <rect x="262" y="146" width="196" height="22" fill="#38bdf8"/>
        <rect x="326" y="152" width="68" height="16" fill="#ea580c"/>
        <text x="360" y="184" text-anchor="middle" font-size="9" font-weight="800" fill="#065f46">① 常温：まずガラスがボイド0密着!</text>
        <text x="360" y="198" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ea580c">▼ 300〜400℃加熱（銅が熱膨張!）</text>
        <!-- Step B: Thermal Expansion Copper Fusion! -->
        <rect x="262" y="206" width="196" height="22" fill="#38bdf8"/>
        <rect x="262" y="228" width="196" height="22" fill="#38bdf8"/>
        <rect x="326" y="206" width="68" height="44" fill="#ea580c" stroke="#fde047" stroke-width="1.8"/>
        <text x="360" y="232" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">🔥 Cu-Cu完全合体!</text>
        <text x="360" y="272" text-anchor="middle" font-size="9" font-weight="900" fill="#047857">Ra＜0.3–0.5nm ＆ 凹2–5nm！</text>
        ${drawPill(264, 290, 192, '荏原/AMAT専用CMPの奇跡', true)}

        ${drawCompareFrame(486, 84, 210, 248, '❌ NG：10nm以上凹むと', '#d97706', '#fffbeb')}
        <rect x="502" y="138" width="178" height="28" fill="#38bdf8"/>
        <rect x="558" y="138" width="66" height="14" fill="#ea580c"/>
        <rect x="502" y="166" width="178" height="28" fill="#38bdf8"/>
        <rect x="558" y="180" width="66" height="14" fill="#ea580c"/>
        <rect x="562" y="154" width="58" height="24" fill="#ffffff" stroke="#d97706" stroke-dasharray="3 2"/>
        <text x="591" y="169" text-anchor="middle" font-size="8.4" font-weight="900" fill="#b45309">届かない!</text>
        <text x="591" y="242" text-anchor="middle" font-size="9.4" font-weight="900" fill="#b45309">300–400℃に温めても</text>
        <text x="591" y="258" text-anchor="middle" font-size="9.4" font-weight="900" fill="#be123c">銅が膨らみきらず断線！</text>
        ${drawPill(502, 290, 178, 'オープン不良で画素死亡', false)}
      `,
      cards: [
        { label: 'なぜ2〜5nm凹ませる？', line1: '常温でガラス同士をボイド0密着させ', line2: '加熱時の銅の熱膨張で上下を完全結合', accent: '#059669' },
        { label: '究極の表面粗さ', line1: '絶縁膜 Ra ＜ 0.3〜0.5nm(原子1–2個)', line2: '全2,110工程屈指の神業CMP [論文]', accent: '#e11d48' },
        { label: '主要装置・スラリー', line1: '荏原製作所 / AMAT 専用CMP装置', line2: '専用低ディッシングスラリーで制御', accent: '#0284c7' },
      ],
    }),

  fab5_p209_afm_surfscan_zero: () =>
    wrapFab3HdSvg({
      badge: 'F5-37',
      stepTag: 'P04-209〜210 最終検査',
      title: '接合前AFM（原子間力顕微鏡）リセス実測＆ナノ異物ゼロ全数検査',
      analogy: '原子の針で2〜5nm凹みを実測！ 1µmのホコリ1粒＝数mmの巨大気泡でセンサー1個丸ごと廃棄',
      accent: '#059669',
      accentSoft: '#ecfdf5',
      body: `
        <!-- Left: AFM Atomic Needle Profiling 2-5nm Recess -->
        <rect x="26" y="84" width="326" height="248" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
        <text x="189" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#065f46">🔬 AFM（原子間力顕微鏡）：原子の針でリセス実測</text>
        <!-- Cantilever + Tip + Laser Feedback -->
        <polygon points="74,142 204,158 198,168 74,154" fill="#f59e0b" stroke="#92400e"/>
        <polygon points="184,166 200,166 192,208" fill="#475569"/>
        <polyline points="168,122 192,156 244,126" fill="none" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="278" y="132" text-anchor="middle" font-size="8.6" font-weight="800" fill="#be123c">反射レーザー検出</text>
        <!-- Profiled Surface -->
        <rect x="46" y="210" width="94" height="44" fill="#38bdf8"/>
        <rect x="238" y="210" width="94" height="44" fill="#38bdf8"/>
        <rect x="140" y="220" width="98" height="34" fill="#ea580c"/>
        <text x="189" y="274" text-anchor="middle" font-size="9.4" font-weight="900" fill="#065f46">実測合格：Ra=0.28nm / リセス=3.4nm！</text>
        ${drawPill(78, 292, 222, 'ブルカー / パークシステムズ AFM', true)}

        <!-- Right: 1µm Dust -> Several mm Void Catastrophe! -->
        ${drawCompareFrame(368, 84, 326, 248, '💥 恐怖：1µmのゴミ1粒 → 数mmの巨大気泡！', '#e11d48', '#fff1f2')}
        <!-- Two Hard Silicon Wafers Tenting Huge Void over 1µm Particle -->
        <path d="M 392,166 Q 531,116 670,166 L 670,180 Q 531,132 392,180 Z" fill="#475569"/>
        <rect x="392" y="182" width="278" height="20" fill="#334155"/>
        <circle cx="531" cy="176" r="5" fill="#e11d48"/>
        <text x="531" y="160" text-anchor="middle" font-size="9.2" font-weight="900" fill="#be123c">← 直径数mmの巨大気泡（ボイド）→</text>
        <text x="531" y="226" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">直径1µmのゴミたった1粒で</text>
        <text x="531" y="244" text-anchor="middle" font-size="10" font-weight="900" fill="#be123c">フルサイズセンサー1個丸ごと廃棄！</text>
        <text x="531" y="266" text-anchor="middle" font-size="9" font-weight="700" fill="#065f46">→ KLA Surfscanで数十nm粒子ゼロを全数保証</text>
        ${drawPill(418, 292, 226, 'P04-210 最終工程クリア！', true)}
      `,
      cards: [
        { label: 'AFM原子針の実測', line1: 'ブルカー / パークシステムズ AFMで', line2: '2–5nmリセスとRa＜0.3nmを直接確認', accent: '#059669' },
        { label: '1µmゴミ＝数mmボイド', line1: '硬いウェーハ間に1粒でも挟まると', line2: '数千倍の気泡になりセンサー全損!', accent: '#e11d48' },
        { label: '画素ウェーハ完全完成', line1: 'KLA Surfscanで粒子ゼロを確認し', line2: 'フェーズ6合体ステージへ待機出荷！', accent: '#0284c7' },
      ],
    }),

  fab5_beol_700_to_vol6_logic: () =>
    wrapFab3HdSvg({
      badge: 'F5-38',
      stepTag: '累計700工程 → 第6巻へ',
      title: '累計700工程・画素ウェーハ完全完成！ → 第6巻ロジック（720工程）へ',
      analogy: '1階（画素ウェーハ）が100%完成！ 同時並行で作られる2階（ロジック頭脳720工程）へ！',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        <!-- Top: Cumulative 700-Step Progress Bar -->
        <rect x="26" y="84" width="668" height="104" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>
        <text x="360" y="106" text-anchor="middle" font-size="11.2" font-weight="900" fill="#92400e">🏆 累計 700 工程 完走！（P1:60 ＋ P2:50 ＋ P3 FEOL:380 ＋ P4 BEOL:210 ＝ 700工程！）</text>
        <rect x="42" y="120" width="76" height="44" rx="6" fill="#0ea5e9"/>
        <text x="80" y="139" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">P1 Wafer</text>
        <text x="80" y="155" text-anchor="middle" font-size="9" font-weight="900" fill="#e0f2fe">60 ✅</text>

        <rect x="122" y="120" width="74" height="44" rx="6" fill="#6366f1"/>
        <text x="159" y="139" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">P2 Mask</text>
        <text x="159" y="155" text-anchor="middle" font-size="9" font-weight="900" fill="#e0e7ff">50 ✅</text>

        <rect x="200" y="120" width="152" height="44" rx="6" fill="#e11d48"/>
        <text x="276" y="139" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">P3 画素FEOL</text>
        <text x="276" y="155" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffe4e6">380工程 ✅</text>

        <rect x="356" y="120" width="156" height="44" rx="6" fill="#ea580c" stroke="#9a3412" stroke-width="1.8"/>
        <text x="434" y="139" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">★ 第5巻 P4 BEOL</text>
        <text x="434" y="155" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffedd5">210工程 ✅(計700)</text>

        <rect x="518" y="120" width="160" height="44" rx="6" fill="#ffffff" stroke="#059669" stroke-width="2" stroke-dasharray="5 3"/>
        <text x="598" y="139" text-anchor="middle" font-size="9.2" font-weight="900" fill="#065f46">▶ 第6巻 P5 ロジック</text>
        <text x="598" y="155" text-anchor="middle" font-size="9" font-weight="800" fill="#059669">＋720工程(同時並行!)</text>

        <!-- Bottom: Parallel Manufacturing & Partial vs Full Stack Teaser -->
        ${drawCompareFrame(26, 200, 324, 134, '✅ 完成：画素ウェーハ（1階部分・全590工程）', '#ea580c', '#fff7ed')}
        <text x="188" y="248" text-anchor="middle" font-size="10" font-weight="800" fill="#9a3412">FEOL 380＋BEOL 210 ＝ 光を受け止める1階完成!</text>
        <text x="188" y="268" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">5階建て銅高速道路＆5,040万Cu-Cu鏡面待機中</text>
        ${drawPill(62, 294, 252, 'あとは相方の「頭脳チップ」を待つだけ!', true)}

        ${drawCompareFrame(370, 200, 324, 134, '🧠 次巻 第6巻（フェーズ5 ロジック720工程）', '#059669', '#ecfdf5')}
        <text x="532" y="248" text-anchor="middle" font-size="9.8" font-weight="800" fill="#065f46">TSMC等の最先端ラインで同時並行製造される頭脳！</text>
        <text x="532" y="268" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">部分積層(α7 V/Z6III/S1II) vs フル積層の決定差!</text>
        ${drawPill(406, 294, 252, 'P05-001〜720 第6巻ロジックへ続く！', true)}
      `,
      cards: [
        { label: '画素ウェーハ完全完成', line1: 'FEOL(380)＋BEOL(210)＝590工程', line2: '累計700工程で1階部分が100%完成', accent: '#ea580c' },
        { label: '同時並行の頭脳製造', line1: '別ライン・TSMC等で同時進行する', line2: '最先端ロジックウェーハ(720工程)', accent: '#0284c7' },
        { label: '次巻 第6巻の見どころ', line1: '2024〜2026年大流行の「部分積層」と', line2: '「フル積層」の工程差を完全解剖！', accent: '#059669' },
      ],
    }),
};
