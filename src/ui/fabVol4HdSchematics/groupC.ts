import { wrapFab3HdSvg, drawCompareFrame, drawKpiBox, drawPill } from '../fabVol3HdSchematics/shared';

/**
 * Vol.4 Ultra-HD 720x470 Beginner-Visual Posters — Group C (F4-28 – F4-33):
 * Block 3-D (P03-249–P03-296, 48 Steps): VTG Straw, 3.3V Gate Ox, Mask #18 Dual Ox, 2–3nm Ox + Q-Time Poly-Si, Mask #19 Gate Etch, Re-Ox & CD-SEM.
 */
export const FAB4_HD_GROUP_C: Record<string, () => string> = {
  fab4_m17_vtg_straw_trench: () =>
    wrapFab3HdSvg({
      badge: 'F4-28',
      stepTag: 'Mask #17 / VTGストロー',
      title: '【Mask #17】垂直転送ゲート（VTG）トレンチ彫り＆角丸め',
      analogy: '深い井戸（3〜5µm PD）の奥底の電子まで一瞬で吸い上げる「ストロー型の立体水門」！',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <!-- Left: Planar Gate Limit vs Right: VTG Vertical Straw -->
        ${drawCompareFrame(26, 84, 322, 248, '従来：平面ゲート（深いPDでは届きにくい）', '#64748b', '#f8fafc')}
        <rect x="46" y="158" width="282" height="128" fill="#475569"/>
        <rect x="64" y="176" width="144" height="96" rx="6" fill="#93c5fd"/>
        <rect x="206" y="132" width="66" height="24" rx="4" fill="#1e293b"/>
        <text x="239" y="148" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">平面TG</text>
        <path d="M 110,256 Q 170,248 214,168" fill="none" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 3" marker-end="url(#f428-arrRed)"/>
        <text x="136" y="232" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">奥底の赤電子が残る…</text>
        ${drawPill(78, 294, 218, '狭小・深掘り画素では残像の恐れ', false)}

        <!-- Right: Vertical Transfer Gate (VTG) Straw -->
        ${drawCompareFrame(366, 84, 328, 248, '✅ 最新：垂直転送ゲート VTG（ストロー水門！）', '#7c3aed', '#f5f3ff')}
        <rect x="386" y="158" width="288" height="128" fill="#475569"/>
        <rect x="404" y="174" width="154" height="98" rx="6" fill="#38bdf8"/>
        <!-- VTG Vertical Plunging Pillar -->
        <rect x="540" y="132" width="66" height="26" rx="4" fill="#1e293b"/>
        <rect x="556" y="154" width="26" height="82" rx="8" fill="#1e293b" stroke="#c4b5fd" stroke-width="2.5"/>
        <text x="573" y="149" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">VTG</text>
        <!-- Crisp Vertical Suction Arrows -->
        <path d="M 454,250 Q 526,244 554,218" fill="none" stroke="#fde047" stroke-width="3" marker-end="url(#f428-arrAmber)"/>
        <path d="M 588,200 Q 618,170 648,176" fill="none" stroke="#4ade80" stroke-width="2.8" marker-end="url(#f428-arrGreen)"/>
        <rect x="626" y="162" width="38" height="28" rx="4" fill="#fde68a" stroke="#d97706"/>
        <text x="645" y="180" text-anchor="middle" font-size="8.8" font-weight="900" fill="#92400e">FD</text>
        <text x="478" y="218" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">深さ0.3–1.0µm縦穴!</text>
        ${drawPill(416, 294, 228, '奥底から真上へ100%完全吸い上げ!', true)}
      `,
      cards: [
        { label: 'ストロー水門の威力', line1: '深さ0.3〜1.0µmの縦穴を彫り', line2: '深いPDの奥底から直接電子を吸引', accent: '#7c3aed' },
        { label: '内壁の角丸め治療', line1: 'ドライエッチ＋犠牲酸化炉で', line2: '穴の角と内壁を超平滑仕上げ', accent: '#0284c7' },
        { label: '失敗すると写真に？', line1: '縦穴の角に結晶欠陥が残ると', line2: 'TG ONのたびに暗電流(白キズ)急増', accent: '#e11d48' },
      ],
    }),

  fab4_p261_thick_gate_ox_33v: () =>
    wrapFab3HdSvg({
      badge: 'F4-29',
      stepTag: 'P03-261〜264 [標準]',
      title: '第1ゲート熱酸化（画素3.3V用・原子約20個分の極上ガラス膜）',
      analogy: 'わずか6〜7nm（原子約20個分！）の宝石級ガラス膜が3.3V高電圧と超低ノイズを支える',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <!-- Left: Atomic-Scale Zoom showing ~20 Silicon Atoms Thick Oxide -->
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#075985">🔬 原子スケール拡大：6〜7 nm ＝ シリコン原子たった約20個分！</text>
        <!-- Top Voltage Barrier (2.8–3.3V) -->
        <rect x="52" y="124" width="372" height="32" rx="6" fill="#0f172a"/>
        <text x="238" y="144" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fbbf24">⚡ 画素駆動電圧 2.8 〜 3.3 V（力強く電子を引っ張る！）</text>
        <!-- 6-7nm Thermal SiO2 Atomic Lattice -->
        <rect x="52" y="160" width="372" height="72" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>
        ${[0, 1, 2]
          .map((r) =>
            Array.from({ length: 16 })
              .map((_, c) => `<circle cx="${72 + c * 22}" cy="${176 + r * 20}" r="4.2" fill="${(r + c) % 2 === 0 ? '#0284c7' : '#ffffff'}" stroke="#0369a1" stroke-width="0.8"/>`)
              .join('')
          )
          .join('')}
        <text x="238" y="246" text-anchor="middle" font-size="10.2" font-weight="900" fill="#075985">極上熱酸化膜 SiO₂：6〜7 nm（均一性 ±0.1 nm＝原子半個分！）</text>
        <!-- Bottom Silicon Interface -->
        <rect x="52" y="256" width="372" height="58" rx="4" fill="#475569"/>
        <text x="238" y="286" text-anchor="middle" font-size="10.4" font-weight="800" fill="#f8fafc">界面の未結合手ゼロ → 1/f・RTNノイズを極限まで低減!</text>
        <text x="238" y="304" text-anchor="middle" font-size="8.8" font-weight="600" fill="#cbd5e1">縦型酸化炉（ISSG酸化またはウェット/ドライ酸化・800〜950℃）</text>

        <!-- Right: Noise Impact KPIs -->
        ${drawKpiBox(468, 84, 226, 74, '膜厚＆ウェハ均一性', '6〜7 nm (±0.1 nm級)', 'ISSG酸化でVTG角も均一成長', '#0284c7')}
        ${drawCompareFrame(468, 170, 226, 162, '界面に未結合手が多いと？', '#e11d48', '#fff1f2')}
        <text x="581" y="218" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">増幅トランジスタがザラザラな</text>
        <text x="581" y="236" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">1/f・RTNノイズを放出！</text>
        ${drawPill(486, 256, 190, '清浄界面 → 極上の高感度画質', true)}
        ${drawPill(486, 292, 190, '荒れた界面 → 暗部ザラつき', false)}
      `,
      cards: [
        { label: '原子20個分の絶縁砦', line1: '画素用の厚膜ゲートSiO₂ 6〜7nm', line2: '2.8〜3.3Vの高電圧に漏れなく耐える', accent: '#0284c7' },
        { label: '驚異の均一性', line1: 'ISSG/縦型炉 800〜950℃成膜', line2: '膜厚誤差 ±0.1nm級（原子半個分!）', accent: '#4f46e5' },
        { label: '高感度画質への直結', line1: '酸化膜界面の美しさがそのまま', line2: '増幅Trの1/f・RTNノイズを決定', accent: '#e11d48' },
      ],
    }),

  fab4_m18_dual_gate_ox_etch: () =>
    wrapFab3HdSvg({
      badge: 'F4-30',
      stepTag: 'Mask #18 / 3.3V vs 1.2V',
      title: '【Mask #18】デュアルゲート酸化膜の選択除去（画素保護＆周辺開口）',
      analogy: '画素の厚手コートは雨合羽で守り、高速ダッシュしたい周辺回路だけ希フッ酸で脱がす',
      accent: '#2563eb',
      accentSoft: '#eff6ff',
      body: `
        <!-- Split Wafer Cross-Section: Protected Pixel vs Wet-Stripped Periphery -->
        <rect x="26" y="84" width="668" height="248" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="360" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#1e40af">🧪 希フッ酸（DHF）ウェット選択除去：1枚のウェーハで2種類の厚さを実現！</text>

        <!-- Left Half: Pixel Area (Protected by Resist!) -->
        <rect x="44" y="124" width="302" height="192" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.6"/>
        <text x="195" y="144" text-anchor="middle" font-size="10.4" font-weight="800" fill="#065f46">🛡 画素エリア（2.8〜3.3V 高耐圧）</text>
        <rect x="64" y="156" width="262" height="32" rx="4" fill="#f59e0b" stroke="#b45309"/>
        <text x="195" y="176" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">フォトレジストの雨合羽で完全保護！</text>
        <rect x="64" y="190" width="262" height="28" fill="#38bdf8" stroke="#0284c7"/>
        <text x="195" y="208" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0c4a6e">厚膜ゲート酸化膜 6〜7 nm を無傷キープ</text>
        <rect x="64" y="218" width="262" height="48" fill="#475569"/>
        <text x="195" y="246" text-anchor="middle" font-size="9.8" font-weight="800" fill="#f8fafc">画素シリコン基板</text>
        ${drawPill(86, 278, 218, '厚膜維持 → 3.3V絶縁破壊ゼロ', true)}

        <!-- Right Half: Periphery Circuit Area (Wet Stripped!) -->
        <rect x="374" y="124" width="302" height="192" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.6"/>
        <text x="525" y="144" text-anchor="middle" font-size="10.4" font-weight="800" fill="#1e40af">⚡ 周辺高速回路（1.2〜1.8V 低電圧）</text>
        <!-- Wet Acid Drops -->
        <text x="525" y="172" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0284c7">💧 希フッ酸ウェット液で優しく溶解除去</text>
        <rect x="394" y="190" width="262" height="28" fill="#e0f2fe" stroke="#38bdf8" stroke-dasharray="5 3"/>
        <text x="525" y="208" text-anchor="middle" font-size="9.4" font-weight="800" fill="#2563eb">厚膜をリセット（プラズマ傷ゼロ！）</text>
        <rect x="394" y="218" width="262" height="48" fill="#475569"/>
        <text x="525" y="246" text-anchor="middle" font-size="9.8" font-weight="800" fill="#f8fafc">無傷の周辺シリコン → 次工程で2–3nm再生</text>
        ${drawPill(416, 278, 218, '次工程で極薄2〜3nmを成長!', true)}
      `,
      cards: [
        { label: '2種類の膜厚を共存', line1: '画素：3.3V用6〜7nm厚膜を保護', line2: '周辺：1.2〜1.8V用に厚膜を除去', accent: '#2563eb' },
        { label: 'なぜウェット除去？', line1: 'プラズマを使わない希フッ酸槽で', line2: '直下シリコンを傷つけず綺麗に剥離', accent: '#0284c7' },
        { label: '失敗すると写真に？', line1: '画素側が誤って薄くなると3.3V印加で', line2: '絶縁破壊を起こし画素が永遠に死ぬ', accent: '#e11d48' },
      ],
    }),

  fab4_p277_thin_gate_polysilicon: () =>
    wrapFab3HdSvg({
      badge: 'F4-31',
      stepTag: 'P03-277〜282 Q-Time',
      title: '第2ゲート酸化（2〜3nm＋NO窒化）＆ポリSi成膜（分単位Q-Time厳守）',
      analogy: '原子10個分の極薄ガラスが育った瞬間、ゴミが乗る前に分単位ダッシュで屋根材を密封！',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        <!-- Top: Q-Time Sprint Pipeline -->
        <rect x="26" y="84" width="668" height="114" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
        <text x="360" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#92400e">⏱ 分単位のタイムリミット（Q-Time厳守）VIP直行リレー！</text>
        <rect x="46" y="122" width="184" height="62" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="138" y="144" text-anchor="middle" font-size="10" font-weight="800" fill="#075985">① 第2ゲート酸化＋NO窒化</text>
        <text x="138" y="162" text-anchor="middle" font-size="9" font-weight="700" fill="#334155">周辺2〜3nm(原子10個分)</text>
        <text x="138" y="176" text-anchor="middle" font-size="8.6" font-weight="600" fill="#059669">NO窒化で1/fノイズ低減</text>

        <line x1="234" y1="153" x2="294" y2="153" stroke="#e11d48" stroke-width="3.2" marker-end="url(#f431-arrRed)"/>
        <text x="264" y="140" text-anchor="middle" font-size="9.2" font-weight="900" fill="#be123c">Q-Time!</text>
        <text x="264" y="170" text-anchor="middle" font-size="8.2" font-weight="800" fill="#9f1239">分単位直行</text>

        <rect x="300" y="122" width="184" height="62" rx="8" fill="#ffffff" stroke="#d97706" stroke-width="1.8"/>
        <text x="392" y="144" text-anchor="middle" font-size="10" font-weight="800" fill="#92400e">② ポリSi LPCVD成膜</text>
        <text x="392" y="162" text-anchor="middle" font-size="9" font-weight="700" fill="#334155">厚さ 150〜200 nm 密封!</text>
        <text x="392" y="176" text-anchor="middle" font-size="8.6" font-weight="600" fill="#7c3aed">VTG縦穴の底まで完全充填</text>

        <line x1="488" y1="153" x2="520" y2="153" stroke="#059669" stroke-width="2.6" marker-end="url(#f431-arrGreen)"/>
        <rect x="526" y="122" width="152" height="62" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
        <text x="602" y="146" text-anchor="middle" font-size="10" font-weight="800" fill="#065f46">✅ 界面完全封印</text>
        <text x="602" y="166" text-anchor="middle" font-size="8.8" font-weight="700" fill="#047857">有機物吸着ゼロで</text>
        <text x="602" y="179" text-anchor="middle" font-size="8.8" font-weight="700" fill="#047857">極低ノイズ確定！</text>

        <!-- Bottom: Completed Dual Gate Stack Cross-Section -->
        <rect x="26" y="210" width="668" height="122" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>
        <text x="360" y="230" text-anchor="middle" font-size="10.6" font-weight="800" fill="#0f172a">📐 成膜完了時のゲート積層構造（ポリSiが厚膜6–7nm・薄膜2–3nm・VTG縦穴を一括被覆）</text>
        <rect x="48" y="242" width="624" height="32" rx="3" fill="#1e293b"/>
        <text x="360" y="262" text-anchor="middle" font-size="10.4" font-weight="800" fill="#fde047">全面ポリシリコン屋根材（多結晶シリコン 150〜200 nm）</text>
        <!-- Pixel Thick Ox + VTG Plug -->
        <rect x="48" y="274" width="320" height="16" fill="#38bdf8"/>
        <text x="208" y="286" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0c4a6e">画素部 6〜7nm厚膜（＋NO窒化）</text>
        <rect x="256" y="274" width="22" height="44" rx="4" fill="#1e293b"/>
        <!-- Periphery Thin Ox -->
        <rect x="368" y="274" width="304" height="7" fill="#7dd3fc"/>
        <text x="520" y="302" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0284c7">周辺部 2〜3nm極薄膜（高速動作）</text>
        <rect x="48" y="290" width="208" height="32" fill="#475569"/>
        <rect x="278" y="290" width="90" height="32" fill="#475569"/>
        <rect x="368" y="281" width="304" height="41" fill="#475569"/>
        <text x="520" y="316" text-anchor="middle" font-size="8.6" font-weight="700" fill="#e2e8f0">シリコン基板</text>
      `,
      cards: [
        { label: 'Q-Time厳守の理由', line1: '待機が長引くと空気中の有機物が', line2: '酸化膜に吸着しノイズが悪化！', accent: '#d97706' },
        { label: '主要装置・膜厚', line1: '縦型酸化炉(NO窒化)→LPCVD炉', line2: '薄膜2〜3nm / ポリSi 150〜200nm', accent: '#0284c7' },
        { label: 'VTG縦穴も一発充填', line1: 'LPCVDの優れた段差被覆性で', line2: 'ストロー穴底までポリSiが完全密着', accent: '#7c3aed' },
      ],
    }),

  fab4_m19_poly_gate_etch: () =>
    wrapFab3HdSvg({
      badge: 'F4-32',
      stepTag: 'Mask #19 選択比>50:1',
      title: '【Mask #19】ポリシリコンゲート電極の高精度エッチング（FEOL最難関）',
      analogy: '厚さ200nmの屋根を垂直に削り、真下の原子10〜20個分の極薄ガラスでピタリと寸止め！',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <!-- Left: Ultra-Precision >50:1 Soft-Landing Stop -->
        ${drawCompareFrame(26, 84, 376, 248, '✅ FEOL最難関：選択比＞50:1 の居合抜き寸止め！', '#7c3aed', '#f5f3ff')}
        <!-- Plasma Arrows -->
        ${[84, 152, 268, 336]
          .map((x) => `<line x1="${x}" y1="124" x2="${x}" y2="210" stroke="#8b5cf6" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#f432-arrPurple)"/>`)
          .join('')}
        <!-- Carved Vertical Poly-Si Gate Electrode -->
        <rect x="176" y="138" width="76" height="82" rx="4" fill="#0f172a" stroke="#7c3aed" stroke-width="1.6"/>
        <text x="214" y="176" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">ポリSi</text>
        <text x="214" y="192" text-anchor="middle" font-size="9.4" font-weight="700" fill="#fde047">90〜300nm</text>
        <!-- Ultra-thin 3-7nm Gate Oxide Stopper Layer -->
        <rect x="46" y="220" width="336" height="10" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>
        <text x="214" y="246" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0369a1">▲ たった3〜7nmの極薄ガラスの上でピタリ停止！</text>
        <rect x="46" y="254" width="336" height="40" fill="#475569"/>
        <text x="214" y="278" text-anchor="middle" font-size="9.8" font-weight="800" fill="#f8fafc">直下のフォトダイオード＆チャネルを無傷で守る！</text>
        ${drawPill(78, 300, 272, '対SiO₂選択比 ＞ 50:1 ソフト着地', true)}

        <!-- Right: Why Pixel Transistors Are Deliberately Larger! -->
        ${drawKpiBox(420, 84, 274, 72, '画素Trはあえて大きめに設計！', 'ゲート長 90 〜 300 nm', '面積大ほど1/f・RTNノイズが激減', '#7c3aed')}
        ${drawCompareFrame(420, 168, 274, 164, '❌ 突き抜け / CDバラつき事故', '#e11d48', '#fff1f2')}
        <text x="557" y="216" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">1. 下のガラスを突き破ると</text>
        <text x="557" y="232" text-anchor="middle" font-size="9.4" font-weight="700" fill="#be123c">直下のPDシリコンが削れて画素死亡!</text>
        <text x="557" y="256" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">2. 線幅CDが数nmバラつくと</text>
        <text x="557" y="272" text-anchor="middle" font-size="9.4" font-weight="700" fill="#be123c">画素ごとの感度・ノイズにムラ発生!</text>
        ${drawPill(446, 294, 222, 'KrF/ArF＋TEL/ラム/日立ハイテク', true)}
      `,
      cards: [
        { label: 'FEOL最難関の寸止め', line1: '150–200nmポリSiを垂直加工し', line2: '直下3–7nmガラス上で選択比>50:1停止', accent: '#7c3aed' },
        { label: 'CISならではの設計鉄則', line1: '画素Trは低ノイズのためあえて大きめ', line2: 'ゲート長90〜300nm [業界標準]', accent: '#0284c7' },
        { label: '主要装置・12工程', line1: 'キヤノンFPA-6300ESW等スキャナー', line2: 'TEL / ラム / 日立ハイテクエッチャー', accent: '#e11d48' },
      ],
    }),

  fab4_p295_gate_reox_cdsem: () =>
    wrapFab3HdSvg({
      badge: 'F4-33',
      stepTag: 'P03-295〜296 [標準]',
      title: 'ゲート再酸化（側壁2〜5nm修復・GIDL防止）＆CD-SEM寸法検査',
      analogy: '切りたての屋根の端を極薄酸化で丸く癒やし、電子顕微鏡で線幅をナノ計測',
      accent: '#059669',
      accentSoft: '#ecfdf5',
      body: `
        <!-- Left: Gate Corner Re-Oxidation Preventing GIDL -->
        <rect x="26" y="84" width="388" height="248" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
        <text x="220" y="106" text-anchor="middle" font-size="11" font-weight="800" fill="#065f46">🩹 ゲート端の極薄再酸化（2〜5nm）でGIDL暗所リーク封印！</text>
        <!-- Silicon + Gate + Re-Oxide Bird's Beak Shell -->
        <rect x="46" y="232" width="348" height="72" fill="#475569"/>
        <rect x="148" y="138" width="144" height="84" rx="4" fill="#1e293b"/>
        <!-- Re-Oxide Glowing Shell (2-5nm) -->
        <path d="M 142,232 L 142,134 L 298,134 L 298,232" fill="none" stroke="#34d399" stroke-width="7"/>
        <path d="M 132,232 Q 148,220 166,226 L 274,226 Q 292,220 308,232" fill="none" stroke="#38bdf8" stroke-width="6"/>
        <text x="220" y="182" text-anchor="middle" font-size="10.4" font-weight="800" fill="#ffffff">ポリSiゲート</text>
        <text x="220" y="256" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fde047">✨ ゲート端を丸く厚め(2–5nm)に修復！</text>
        <text x="220" y="276" text-anchor="middle" font-size="9" font-weight="700" fill="#e2e8f0">電界集中による漏れ電流（GIDL＝暗いのに光る）を撃退</text>

        <!-- Right: Hitachi High-Tech CD-SEM Metrology -->
        <rect x="430" y="84" width="264" height="248" rx="10" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5"/>
        <text x="562" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#075985">🔬 日立ハイテク CD-SEM検査</text>
        <!-- Electron Beam Column -->
        <rect x="526" y="122" width="72" height="36" rx="6" fill="#0f172a"/>
        <text x="562" y="144" text-anchor="middle" font-size="9.4" font-weight="800" fill="#38bdf8">電子線走査</text>
        <line x1="562" y1="158" x2="562" y2="210" stroke="#0284c7" stroke-width="2.4" stroke-dasharray="3 2" marker-end="url(#f433-arrBlue)"/>
        <rect x="470" y="214" width="184" height="32" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <line x1="514" y1="230" x2="610" y2="230" stroke="#e11d48" stroke-width="2.2" marker-start="url(#f433-arrRed)" marker-end="url(#f433-arrRed)"/>
        <text x="562" y="226" text-anchor="middle" font-size="9.4" font-weight="900" fill="#be123c">CD = 120.0 ± 0.8 nm</text>
        <text x="562" y="268" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">全ウェーハ抜き取り計測 → APC自動補正</text>
        ${drawPill(452, 286, 220, 'ブロック3-D完了 → 下階3-Eへ!', true)}
      `,
      cards: [
        { label: 'GIDLリークの封印', line1: '縦型炉/ISSGで側壁2〜5nm再酸化', line2: '暗いのに光るゲート端漏れを根絶', accent: '#059669' },
        { label: 'ナノ線幅の全数品質管理', line1: '日立ハイテクCD-SEMでゲート長計測', line2: '露光・エッチへ自動フィードバック', accent: '#0284c7' },
        { label: 'ブロック3-D完走', line1: 'P03-249〜296(48工程)が完了！', line2: '次は魔法のP+ピンニング層へ突入', accent: '#7c3aed' },
      ],
    }),
};
