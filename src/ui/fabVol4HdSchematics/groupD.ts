import { wrapFab3HdSvg, drawCompareFrame, drawKpiBox, drawPill } from '../fabVol3HdSchematics/shared';

/**
 * Vol.4 Ultra-HD 720x470 Beginner-Visual Posters — Group D (F4-34 – F4-40):
 * Block 3-E (P03-297–P03-364, 68 Steps): Offset Spacer, Masks #20–#21 LDD, Self-Aligned 40–80nm Sidewall Shoulder Pads,
 * CROWN JEWEL Mask #22 Surface P+ Pinning Lid (1/100–1/1,000 Dark Current!), and Masks #23–#24 N+/P+ S/D & Well-Tap.
 */
export const FAB4_HD_GROUP_D: Record<string, () => string> = {
  fab4_p297_offset_spacer: () =>
    wrapFab3HdSvg({
      badge: 'F4-34',
      stepTag: 'P03-297〜298 [標準]',
      title: 'オフセットスペーサー極薄成膜（約10nm）・高感度変換効率の守り神',
      analogy: 'スイッチ屋根の両脇に厚さ10nmの薄い下着を着せ、FDとの余計な重なり容量を減らす',
      accent: '#0891b2',
      accentSoft: '#ecfeff',
      body: `
        <!-- Left: 10nm Offset Spacer Reducing TG-FD Overlap Capacitance -->
        ${drawCompareFrame(26, 84, 336, 248, '✅ 約10nmオフセットあり：FD容量最小→高感度！', '#0891b2', '#ecfeff')}
        <rect x="46" y="216" width="296" height="66" fill="#475569"/>
        <rect x="132" y="138" width="84" height="72" rx="4" fill="#1e293b"/>
        <text x="174" y="178" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">転送ゲートTG</text>
        <!-- Crisp 10nm Offset Spacer Shell -->
        <rect x="118" y="138" width="14" height="72" fill="#38bdf8" stroke="#0284c7"/>
        <rect x="216" y="138" width="14" height="72" fill="#38bdf8" stroke="#0284c7"/>
        <!-- FD Slightly Offset Away from Gate Edge -->
        <rect x="234" y="216" width="94" height="32" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="1.4"/>
        <text x="281" y="236" text-anchor="middle" font-size="9.2" font-weight="900" fill="#92400e">計量カップ FD</text>
        <text x="174" y="266" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">10nm離す → 重なり容量 C_ov 激減!</text>
        ${drawPill(78, 294, 232, '電子1個の電圧(CG)アップ→低ノイズ', true)}

        <!-- Right: Without Offset Spacer (Overlap Capacitance Penalty) -->
        ${drawCompareFrame(378, 84, 316, 248, '❌ オフセットなし：重なりすぎて感度低下！', '#e11d48', '#fff1f2')}
        <rect x="398" y="216" width="276" height="66" fill="#475569"/>
        <rect x="478" y="138" width="84" height="72" rx="4" fill="#1e293b"/>
        <rect x="536" y="216" width="118" height="32" rx="4" fill="#fca5a5" stroke="#e11d48" stroke-width="1.5"/>
        <rect x="536" y="206" width="26" height="14" fill="#e11d48"/>
        <text x="549" y="198" text-anchor="middle" font-size="9" font-weight="900" fill="#be123c">💥 寄生容量大!</text>
        <text x="536" y="266" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fecdd3">FDがTGの下へ潜り込みC_FD増加!</text>
        ${drawPill(426, 294, 220, '変換効率低下 → 高感度ノイズ増', false)}
      `,
      cards: [
        { label: '極薄10nmの効能', line1: 'ALD/LPCVDでゲート側壁に10nm膜', line2: '次工程の注入位置をわずかに離隔', accent: '#0891b2' },
        { label: '高感度ノイズの物理', line1: '変換効率 CG ＝ q / C_FD', line2: 'TG-FD重なり容量を減らし高感度化', accent: '#0284c7' },
        { label: 'ブロック3-E開幕', line1: 'P03-297〜298(非露光2工程)', line2: '下階テラスのLDD・P+蓋へ接続', accent: '#7c3aed' },
      ],
    }),

  fab4_m20_pixel_nldd_fd: () =>
    wrapFab3HdSvg({
      badge: 'F4-35',
      stepTag: 'Mask #20 / 低リークFD',
      title: '【Mask #20】画素側NLDD＆低リークFD注入（星空撮影を守る計量カップ）',
      analogy: '電子を電圧へ変える計量カップ(FD)の底を優しい濃度のリンで作り、長時間露光の漏れを止める',
      accent: '#2563eb',
      accentSoft: '#eff6ff',
      body: `
        <!-- Left: Soft Phosphorus Gradient vs Steep Leak Profile -->
        <rect x="26" y="84" width="406" height="248" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="229" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#1e40af">🌌 低ダメージ・低濃度リン注入による「超低リークFD構造」</text>
        <!-- Cross Section -->
        <rect x="46" y="206" width="366" height="106" fill="#334155"/>
        <rect x="116" y="138" width="74" height="68" rx="4" fill="#0f172a"/>
        <text x="153" y="176" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">転送TG</text>
        <!-- Soft Gradient FD Region -->
        <ellipse cx="290" cy="224" rx="88" ry="34" fill="#93c5fd" fill-opacity="0.72" stroke="#38bdf8" stroke-width="2"/>
        <ellipse cx="290" cy="220" rx="54" ry="18" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
        <text x="290" y="224" text-anchor="middle" font-size="9.6" font-weight="900" fill="#92400e">優しい勾配のFD</text>
        <!-- Gentle Phosphorus Ion Arrows -->
        ${[246, 290, 334]
          .map((x) => `<line x1="${x}" y1="120" x2="${x}" y2="196" stroke="#2563eb" stroke-width="2.2" marker-end="url(#f435-arrBlue)"/>`)
          .join('')}
        <text x="290" y="280" text-anchor="middle" font-size="9.6" font-weight="800" fill="#bae6fd">電界ピークを穏やかに緩和 → 接合リーク電流を激減！</text>

        <!-- Right: Long-Exposure Starry Sky Comparison -->
        ${drawCompareFrame(448, 84, 246, 248, '🌠 星空・長時間露光での差', '#0f172a', '#0f172a')}
        <!-- Top Clean Starry Sky -->
        <rect x="464" y="120" width="214" height="72" rx="6" fill="#020617" stroke="#10b981"/>
        <circle cx="496" cy="144" r="2.2" fill="#ffffff"/>
        <circle cx="556" cy="158" r="2.8" fill="#fef08a"/>
        <circle cx="628" cy="138" r="2" fill="#bae6fd"/>
        <text x="571" y="182" text-anchor="middle" font-size="9.2" font-weight="800" fill="#34d399">✅ 低リークFD：漆黒の夜空!</text>
        <!-- Bottom Foggy Leaky Starry Sky -->
        <rect x="464" y="206" width="214" height="72" rx="6" fill="#312e81" stroke="#e11d48"/>
        ${[484, 514, 540, 578, 608, 646, 524, 594]
          .map((x, i) => `<circle cx="${x}" cy="${224 + (i % 3) * 14}" r="2.2" fill="#fb7185"/>`)
          .join('')}
        <text x="571" y="268" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fecdd3">❌ FDリーク大：カブリ＆白キズ!</text>
        <text x="571" y="310" text-anchor="middle" font-size="8.8" font-weight="700" fill="#e2e8f0">中電流注入機・リン低エネルギー [標準]</text>
      `,
      cards: [
        { label: '計量カップの電界緩和', line1: '低エネルギー・低ダメージのリン注入', line2: 'FD接合部の電界集中を穏やかに分散', accent: '#2563eb' },
        { label: '主要装置・12工程', line1: 'Mask #20 / P03-299〜310(12工程)', line2: '中電流イオン注入機 [業界標準]', accent: '#0284c7' },
        { label: '星空撮影への直結', line1: 'バルブ撮影・天体写真での画面全体の', line2: '白カブリと白キズ発生を徹底防止', accent: '#e11d48' },
      ],
    }),

  fab4_m21_periph_ldd: () =>
    wrapFab3HdSvg({
      badge: 'F4-36',
      stepTag: 'Mask #21 / P03-311–322',
      title: '【Mask #21】周辺回路NLDD / PLDD注入（耐久＆高速の衝撃緩衝帯）',
      analogy: '周辺高速回路の肩口に衝撃吸収バンパーを付け、何十万枚撮っても劣化ゼロの長寿命化',
      accent: '#6366f1',
      accentSoft: '#eef2ff',
      body: `
        <!-- Left: Periphery NMOS (As) + PMOS (BF2) LDD Buffer Cross-Section -->
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#eef2ff" stroke="#6366f1" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#3730a3">🛡 周辺高速回路の肩口LDD緩衝帯（ホットキャリア劣化防止）</text>
        <!-- NMOS Left -->
        <rect x="44" y="130" width="184" height="184" rx="8" fill="#ffffff" stroke="#0284c7"/>
        <text x="136" y="150" text-anchor="middle" font-size="10" font-weight="800" fill="#075985">周辺NMOS（ヒ素 As）</text>
        <rect x="60" y="218" width="152" height="54" fill="#475569"/>
        <rect x="112" y="168" width="48" height="48" rx="3" fill="#0f172a"/>
        <rect x="74" y="218" width="38" height="20" rx="3" fill="#38bdf8"/>
        <rect x="160" y="218" width="38" height="20" rx="3" fill="#38bdf8"/>
        <text x="136" y="294" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">浅いヒ素で短チャネル耐性!</text>

        <!-- PMOS Right -->
        <rect x="246" y="130" width="184" height="184" rx="8" fill="#ffffff" stroke="#7c3aed"/>
        <text x="338" y="150" text-anchor="middle" font-size="10" font-weight="800" fill="#5b21b6">周辺PMOS（BF₂）</text>
        <rect x="262" y="218" width="152" height="54" fill="#475569"/>
        <rect x="314" y="168" width="48" height="48" rx="3" fill="#0f172a"/>
        <rect x="276" y="218" width="38" height="20" rx="3" fill="#a78bfa"/>
        <rect x="362" y="218" width="38" height="20" rx="3" fill="#a78bfa"/>
        <text x="338" y="294" text-anchor="middle" font-size="9" font-weight="700" fill="#6d28d9">重いBF₂で超浅く精密制御!</text>

        <!-- Right: Endurance & Reliability -->
        ${drawKpiBox(468, 84, 226, 74, '注入原子・装置', 'ヒ素(As) / BF₂ 低エネルギー', '中電流イオン注入機 [業界標準]', '#6366f1')}
        ${drawCompareFrame(468, 170, 226, 162, 'ホットキャリア劣化とは？', '#d97706', '#fffbeb')}
        <text x="581" y="218" text-anchor="middle" font-size="9.6" font-weight="800" fill="#92400e">激しい高速動作で加速した電子が</text>
        <text x="581" y="236" text-anchor="middle" font-size="9.6" font-weight="800" fill="#b45309">ゲート酸化膜へ飛び込む経年劣化</text>
        ${drawPill(486, 256, 190, 'LDD緩衝帯 → プロ機10年耐久', true)}
        ${drawPill(486, 292, 190, 'なし → 経年誤動作の原因', false)}
      `,
      cards: [
        { label: '衝撃吸収バンパーLDD', line1: 'NMOSにヒ素、PMOSにBF₂を注入', line2: 'ドレイン端の高電界ショックを緩和', accent: '#6366f1' },
        { label: '画素側との使い分け', line1: '画素(#20)=低リーク重視のリン', line2: '周辺(#21)=高速・短チャネルのAs/BF₂', accent: '#0284c7' },
        { label: 'カメラの長寿命化', line1: '8K動画・高速連写を長年酷使しても', line2: '回路劣化や誤動作を防ぐ縁の下の力持ち', accent: '#d97706' },
      ],
    }),

  fab4_p323_sidewall_spacer: () =>
    wrapFab3HdSvg({
      badge: 'F4-37',
      stepTag: 'P03-323〜328 (非露光6)',
      title: 'サイドウォール・スペーサー成膜＆異方性エッチバック（自己整合肩パッド）',
      analogy: 'マスク0枚！ 全面に毛布を被せ真上から削ると、屋根の両脇にだけ自動で肩パッドが残る魔法',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        <!-- Step 1: Blanket Conformal SiO2/SiN Deposition -->
        <rect x="26" y="84" width="210" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.4"/>
        <text x="131" y="106" text-anchor="middle" font-size="10.6" font-weight="800" fill="#075985">① 全面SiO₂/SiN被覆</text>
        <rect x="44" y="228" width="174" height="58" fill="#475569"/>
        <!-- Conformal Blanket Over Gate -->
        <path d="M 44,228 L 44,200 L 82,200 L 82,136 L 180,136 L 180,200 L 218,200 L 218,228 Z" fill="#fbbf24" stroke="#b45309" stroke-width="1.4"/>
        <rect x="104" y="158" width="54" height="70" fill="#1e293b"/>
        <text x="131" y="198" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">ゲート</text>
        <text x="131" y="308" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">LPCVD/ALDで全面均一に積む</text>

        <!-- Step 2: Vertical Anisotropic Etch-Back -->
        <rect x="252" y="84" width="212" height="248" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
        <text x="358" y="106" text-anchor="middle" font-size="10.6" font-weight="800" fill="#92400e">② 真上から垂直エッチバック</text>
        ${[286, 322, 358, 394, 430]
          .map((x) => `<line x1="${x}" y1="120" x2="${x}" y2="162" stroke="#d97706" stroke-width="2.4" marker-end="url(#f437-arrAmber)"/>`)
          .join('')}
        <rect x="270" y="228" width="176" height="58" fill="#475569"/>
        <rect x="331" y="168" width="54" height="60" fill="#1e293b"/>
        <!-- Sculpted Shoulder Pads Left Behind! -->
        <path d="M 304,228 Q 308,172 331,170 L 331,228 Z" fill="#f59e0b" stroke="#92400e" stroke-width="1.4"/>
        <path d="M 412,228 Q 408,172 385,170 L 385,228 Z" fill="#f59e0b" stroke="#92400e" stroke-width="1.4"/>
        <text x="358" y="202" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">ゲート</text>
        <text x="358" y="302" text-anchor="middle" font-size="9.6" font-weight="900" fill="#b45309">壁だけ厚いので肩パッド残存!</text>
        <text x="358" y="318" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">幅 40〜80 nm・重ねズレ0!</text>

        <!-- Step 3: Role for Next P+ Pinning & S/D -->
        <rect x="480" y="84" width="214" height="248" rx="10" fill="#f0fdf4" stroke="#059669" stroke-width="1.5"/>
        <text x="587" y="106" text-anchor="middle" font-size="10.6" font-weight="800" fill="#065f46">③ 自己整合（マスク不要）の威力</text>
        <text x="587" y="142" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">1. 露光ズレが原理的にゼロ！</text>
        <text x="587" y="162" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">全6,680万画素で左右対称に形成</text>
        <text x="587" y="194" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">2. 次のS/D注入のショート防止</text>
        <text x="587" y="214" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">高濃度原子がゲート下へ潜らない</text>
        <text x="587" y="246" text-anchor="middle" font-size="9.6" font-weight="800" fill="#e11d48">3. 直後Mask #22 P+蓋の定規!</text>
        ${drawPill(500, 282, 174, '非露光6工程で完璧完成', true)}
      `,
      cards: [
        { label: '自己整合のマジック', line1: '全面成膜→真上からの異方性削り', line2: 'マスクなしでゲート両脇に肩パッド', accent: '#d97706' },
        { label: '主要装置・幅仕様', line1: 'LPCVD/ALD＋ドライエッチャー', line2: 'スペーサー幅 40〜80nm [業界標準]', accent: '#0284c7' },
        { label: '幅が狂うと写真に？', line1: '狭すぎるとS/D注入がゲート下へ', line2: '潜り込んでトランジスタがショート', accent: '#e11d48' },
      ],
    }),

  fab4_m22_surface_pinning_ppd: () =>
    wrapFab3HdSvg({
      badge: 'F4-38',
      stepTag: '★Mask #22 暗電流1/1000',
      title: '【Mask #22】表面ピンニングP+層注入（PPD完成・一眼低ノイズ最大の立役者！）',
      analogy: '電子バケツの真上に濃いP型の「魔法のフタ」を被せ、表面の傷から湧く暗電流を完全封印！',
      accent: '#e11d48',
      accentSoft: '#fff1f2',
      body: `
        <!-- Left: Old 3T Unpinned Sensor (Dark Current Waterfall!) -->
        ${drawCompareFrame(26, 84, 316, 248, '❌ 昔の3Tセンサー（P+のフタなし：暗電流の滝！）', '#e11d48', '#fff1f2')}
        <!-- Rough Silicon Surface with Interface Traps -->
        <rect x="46" y="136" width="276" height="16" fill="#94a3b8"/>
        <text x="184" y="148" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">⚡ シリコン表面の無数の傷（界面準位）</text>
        <rect x="46" y="152" width="276" height="124" fill="#fecdd3" stroke="#e11d48" stroke-width="1.4"/>
        <!-- Dark Current Electrons Falling Straight into N-PD! -->
        ${[86, 134, 184, 234, 282]
          .map((x) => `<line x1="${x}" y1="154" x2="${x}" y2="232" stroke="#be123c" stroke-width="2.6" marker-end="url(#f438-arrRed)"/>`)
          .join('')}
        <text x="184" y="256" text-anchor="middle" font-size="10.2" font-weight="900" fill="#881337">偽の電子（暗電流）がPDへドバドバ落下!</text>
        ${drawPill(68, 292, 232, '夜景がノイズと白キズだらけ…', false)}

        <!-- Right: Modern 4T-PPD with Crown Jewel Mask #22 P+ Pinning Lid! -->
        ${drawCompareFrame(358, 84, 336, 248, '✅ 現代4T-PPD：Mask #22 表面P+ピンニング蓋！', '#059669', '#ecfdf5')}
        <!-- Surface Traps Neutralized Inside P+ Lid! -->
        <rect x="378" y="132" width="296" height="14" fill="#94a3b8"/>
        <text x="526" y="143" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">表面の傷から湧いた電子 → P+蓋の正孔(+)と即合体消滅!</text>
        <!-- CROWN JEWEL GOLDEN-CRIMSON P+ PINNING LID -->
        <rect x="378" y="146" width="296" height="34" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <text x="526" y="167" text-anchor="middle" font-size="10.4" font-weight="900" fill="#ffffff">★ 表面P+ピンニング蓋（B⁺/BF₂⁺ 数〜十数keV・数十nm）</text>
        <!-- Clean Buried N-Type Photodiode Completely Shielded! -->
        <rect x="378" y="180" width="296" height="96" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
        <text x="526" y="216" text-anchor="middle" font-size="11.2" font-weight="900" fill="#075985">完全に埋まった（Buried/Pinned）N型PD!</text>
        <text x="526" y="238" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">暗電流が 1/100 〜 1/1,000 以下へ激減！</text>
        <text x="526" y="258" text-anchor="middle" font-size="9" font-weight="700" fill="#065f46">＋ 転送時に完全空乏化（残像ゼロ＆kTCノイズ消去）!</text>
        ${drawPill(404, 292, 244, '一眼カメラ高感度革命の最大の発明!', true)}
      `,
      cards: [
        { label: '暗電流 1/100〜1/1,000', line1: '極表面(数十nm)に濃いP+ホウ素の蓋', line2: '表面傷の電子を正孔で即座に消滅！', accent: '#e11d48' },
        { label: '条件のシビアさ', line1: 'B+ / BF₂+ 数keV〜十数keV 大電流注入', line2: '浅すぎ=漏れ / 深すぎ=青感度低下', accent: '#d97706' },
        { label: 'PPD完成の瞬間', line1: '埋め込み型(Pinned)PDがここで完成', line2: '完全空乏化により残像ゼロも実現!', accent: '#059669' },
      ],
    }),

  fab4_m23_nplus_sd_contact: () =>
    wrapFab3HdSvg({
      badge: 'F4-39',
      stepTag: 'Mask #23 / 10^15 /cm²',
      title: '【Mask #23】N+ソース/ドレイン＆FDコンタクト高濃度注入',
      analogy: '肩パッドの外側へ大量のヒ素・リンを撃ち込み、金属配線へ繋ぐ超低抵抗の玄関口を作る',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <!-- Left: Self-Aligned N+ Source/Drain + FD Contact Structure -->
        <rect x="26" y="84" width="414" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="233" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#075985">⚡ 肩パッドがマスク代わり！ 高ドーズ10¹⁵ /cm² N+足場形成</text>
        <!-- High-Current Ion Beams -->
        ${[84, 126, 326, 368]
          .map((x) => `<line x1="${x}" y1="120" x2="${x}" y2="206" stroke="#0284c7" stroke-width="3" marker-end="url(#f439-arrBlue)"/>`)
          .join('')}
        <!-- Gate + Sidewalls Blocking Center -->
        <rect x="192" y="144" width="70" height="68" rx="4" fill="#0f172a"/>
        <path d="M 164,212 Q 168,150 192,148 L 192,212 Z" fill="#f59e0b"/>
        <path d="M 290,212 Q 286,150 262,148 L 262,212 Z" fill="#f59e0b"/>
        <text x="227" y="182" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">ゲート</text>
        <!-- Silicon + LDD Shoulders + Deep Heavy N+ S/D -->
        <rect x="48" y="212" width="368" height="98" fill="#475569"/>
        <rect x="158" y="212" width="34" height="22" fill="#93c5fd"/>
        <rect x="262" y="212" width="34" height="22" fill="#93c5fd"/>
        <rect x="58" y="212" width="104" height="44" rx="6" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
        <rect x="292" y="212" width="112" height="44" rx="6" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
        <text x="110" y="238" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">N+ ソース</text>
        <text x="348" y="238" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">N+ ドレイン/FD</text>
        <text x="233" y="286" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fde047">LDD緩衝帯を残しつつ外側だけ超低抵抗化！</text>

        <!-- Right: High-Speed Readout Impact -->
        ${drawKpiBox(456, 84, 238, 76, '注入条件・装置', 'ヒ素 / リン 10¹⁵ /cm² 級', '大電流イオン注入機 [業界標準]', '#0284c7')}
        ${drawCompareFrame(456, 172, 238, 160, '抵抗が高いと写真にどう出る？', '#e11d48', '#fff1f2')}
        <text x="575" y="220" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">コンタクト・S/D抵抗が高いと</text>
        <text x="575" y="238" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">高速連写や8K動画の読出が遅延!</text>
        ${drawPill(476, 256, 198, '高濃度N+ → 爆速＆クリア読出', true)}
        ${drawPill(476, 292, 198, '低濃度→接触不良＆シェーディング', false)}
      `,
      cards: [
        { label: '低抵抗の玄関口', line1: 'ヒ素・リンを10^15 /cm²級で高ドーズ', line2: '第5巻BEOL配線と低抵抗でオーミック接続', accent: '#0284c7' },
        { label: '肩パッドとの連携', line1: 'F4-37肩パッドがゲート直下を守り', line2: 'LDDの優しさとN+の低抵抗を両立', accent: '#d97706' },
        { label: 'FDコンタクトの工夫', line1: 'リークを抑えるためFD内では', line2: 'コンタクト直下だけに極小配置', accent: '#059669' },
      ],
    }),

  fab4_m24_pplus_sd_welltap: () =>
    wrapFab3HdSvg({
      badge: 'F4-40',
      stepTag: 'Mask #24 / 0V基準接地',
      title: '【Mask #24】P+ソース/ドレイン＆基板グランド（ウェルタップ）注入',
      analogy: 'PMOSの足元と、全画素の基準0V（アース線）をガッチリ繋ぐ高濃度ホウ素コンセント',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <!-- Left: PMOS P+ S/D + Pixel Ground Well-Tap Anchoring 0V -->
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">🔌 2つの重要役割：周辺PMOS足元 ＋ 全画素0Vグランド固定！</text>
        <!-- Left Sub: PMOS P+ -->
        <rect x="44" y="128" width="184" height="184" rx="8" fill="#ffffff" stroke="#7c3aed"/>
        <text x="136" y="148" text-anchor="middle" font-size="10" font-weight="800" fill="#5b21b6">① 周辺PMOS足元</text>
        <rect x="58" y="214" width="156" height="58" fill="#bfdbfe"/>
        <rect x="114" y="168" width="44" height="46" fill="#0f172a"/>
        <rect x="64" y="214" width="46" height="28" rx="4" fill="#7c3aed"/>
        <rect x="162" y="214" width="46" height="28" rx="4" fill="#7c3aed"/>
        <text x="87" y="232" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">P+</text>
        <text x="185" y="232" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">P+</text>
        <text x="136" y="294" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">高ドーズ B / BF₂ 10¹⁵</text>

        <!-- Right Sub: Pixel Well-Tap 0V Ground Anchor -->
        <rect x="244" y="128" width="188" height="184" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
        <text x="338" y="148" text-anchor="middle" font-size="10" font-weight="800" fill="#065f46">② 基板0Vウェルタップ</text>
        <!-- Ground Symbol -->
        <line x1="338" y1="160" x2="338" y2="206" stroke="#059669" stroke-width="3"/>
        <line x1="316" y1="164" x2="360" y2="164" stroke="#059669" stroke-width="3"/>
        <line x1="324" y1="172" x2="352" y2="172" stroke="#059669" stroke-width="2.2"/>
        <text x="338" y="196" text-anchor="middle" font-size="9.4" font-weight="900" fill="#047857">0V GND</text>
        <rect x="260" y="214" width="156" height="58" fill="#ddd6fe"/>
        <rect x="306" y="214" width="64" height="30" rx="4" fill="#7c3aed"/>
        <text x="338" y="233" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">P+タップ</text>
        <text x="338" y="294" text-anchor="middle" font-size="9" font-weight="800" fill="#065f46">表面P+蓋を0Vへ釘付け!</text>

        <!-- Right: Ground Bounce Prevention -->
        ${drawKpiBox(468, 84, 226, 74, '注入条件・ブロック完了', 'ホウ素 / BF₂ 10¹⁵ /cm² 級', 'Mask #24 / ブロック3-E完了！', '#7c3aed')}
        ${drawCompareFrame(468, 170, 226, 162, 'グランド接続が弱いと？', '#e11d48', '#fff1f2')}
        <text x="581" y="218" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9f1239">全画素一斉駆動で0Vが揺れ</text>
        <text x="581" y="236" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">画面に横シマノイズが発生！</text>
        ${drawPill(486, 256, 190, '強固0V接地 → 横シマゼロ!', true)}
        ${drawPill(486, 292, 190, '次：最終ブロック3-Fへ!', true)}
      `,
      cards: [
        { label: '0V基準の要（ウェルタップ）', line1: 'P+高濃度接続口でPウェルと', line2: '表面P+ピンニング蓋を0Vへ強固固定', accent: '#7c3aed' },
        { label: '加工条件・12工程', line1: 'Mask #24 / 大電流イオン注入機', line2: 'ホウ素 / BF₂ 10^15 /cm² 級', accent: '#0284c7' },
        { label: 'ブロック3-E完了', line1: 'P03-297〜364(68工程)完了！', line2: 'いよいよ最終ブロック3-F仕上げへ', accent: '#059669' },
      ],
    }),
};
