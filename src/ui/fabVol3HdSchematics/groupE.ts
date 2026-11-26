import { drawCompareFrame, drawKpiBox, drawPill, wrapFab3HdSvg } from './shared';

/**
 * Vol.3 Ultra-HD 720x470 Vector Infographics — Group E (8 Parts: F3-45–F3-52):
 * Block 2-E (P02-043–P02-050): Die-to-DB Inspection, Carl Zeiss MeRiT Nano Repair,
 * Carl Zeiss AIMS Aerial Image, Final Haze Ultra-Clean, 0.8µm/6mm Pellicle Mounting,
 * Post-Pellicle STARlight, SMIF/RSP Reticle Pod, 96-Mask Automated Stocker -> Vol.4 Bridge.
 */
export function renderVol3GroupESvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'fab3_p43_die_to_db_inspection':
      return wrapFab3HdSvg({
        badge: 'F3-45',
        stepTag: 'P02-043 [業界標準]',
        title: 'ダイ・トゥ・データベース欠陥検査（20〜40nm完全捕捉）',
        analogy: '設計データと実マスクの顕微鏡像を1ピクセル残らず照合する世界最強の間違い探し',
        accent: '#0ea5e9',
        accentSoft: '#e0f2fe',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#f8fafc" stroke="#0ea5e9" stroke-width="1.4"/>
            <!-- Left: Reference Design Database -->
            <rect x="20" y="24" width="186" height="150" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
            <text x="113" y="44" text-anchor="middle" font-size="10.2" font-weight="800" fill="#38bdf8">① 元の設計データベース</text>
            <rect x="44" y="60" width="28" height="90" fill="#94a3b8"/>
            <rect x="100" y="60" width="28" height="90" fill="#94a3b8"/>
            <rect x="156" y="60" width="28" height="90" fill="#94a3b8"/>
            <text x="113" y="166" text-anchor="middle" font-size="9" font-weight="700" fill="#bae6fd">欠陥ゼロの理想レンダリング</text>

            <text x="225" y="106" text-anchor="middle" font-size="18" font-weight="900" fill="#0284c7">VS</text>

            <!-- Middle: Live Optical Mask Image with Pinpoint 20-40nm Defects -->
            <rect x="244" y="24" width="186" height="150" rx="8" fill="#0f172a" stroke="#e11d48" stroke-width="1.6"/>
            <text x="337" y="44" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fda4af">② 実マスク高速スキャン像</text>
            <rect x="268" y="60" width="28" height="90" fill="#94a3b8"/>
            <rect x="324" y="60" width="28" height="90" fill="#94a3b8"/>
            <rect x="380" y="60" width="28" height="90" fill="#94a3b8"/>
            <!-- Black dot protrusion + White pinhole defect -->
            <circle cx="304" cy="96" r="8" fill="#e11d48" stroke="#fef08a" stroke-width="2"/>
            <circle cx="338" cy="126" r="7" fill="#ffffff" stroke="#e11d48" stroke-width="2"/>
            <text x="337" y="166" text-anchor="middle" font-size="9" font-weight="800" fill="#fda4af">黒点(余剰Cr)・白点(ピンホール)発見!</text>

            <line x1="434" y1="98" x2="462" y2="98" stroke="#e11d48" stroke-width="2.6" marker-end="url(#f345-arrRed)"/>

            <!-- Right: Lasertec / KLA Teron Specs -->
            <rect x="466" y="24" width="182" height="150" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="557" y="46" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0c4a6e">③ 欠陥座標を即記録</text>
            <text x="557" y="76" text-anchor="middle" font-size="15" font-weight="900" fill="#e11d48">20 〜 40 nm</text>
            <text x="557" y="96" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">検出感度・全領域自動走査</text>
            <text x="557" y="124" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">レーザーテック /</text>
            <text x="557" y="140" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">KLA（Teronシリーズ等）</text>
            <text x="557" y="162" text-anchor="middle" font-size="8.8" font-weight="700" fill="#059669">→ 次工程MeRiTナノ修正へ送信!</text>

            ${drawPill(20, 196, 304, '1個見逃し→全カメラ同一座標に死んだ画素', false)}
            ${drawPill(344, 196, 304, 'Die-to-DB全面検査→1チップ一括マスク対応', true)}
          </g>
        `,
        cards: [
          { label: 'DB直接比較', line1: '設計データベースと実マスク光学像を', line2: '1ピクセル残らず高速全面スキャン' },
          { label: '装置＆感度', line1: 'レーザーテック / KLA Teronシリーズ', line2: '直径20〜40nmの穴・黒点を完全捕捉' },
          { label: '失敗すると写真に？', line1: '1個でも見逃すと全カメラの同じ座標に', line2: '永遠に消えない「死んだ画素」誕生！' },
        ],
      });

    case 'fab3_p44_nano_defect_repair':
      return wrapFab3HdSvg({
        badge: 'F3-46',
        stepTag: 'P02-044 [業界標準]',
        title: 'ナノ欠陥修正（カールツァイス MeRiT 電子線エッチ＆EBID）',
        analogy: '余計な黒点はナノ彫刻刀で削り、欠けた白点はナノ3Dプリンターで描き足す神業',
        accent: '#e11d48',
        accentSoft: '#fff1f2',
        body: `
          <!-- Left: Black Defect (Extra Chrome) -> Gas-Assisted E-Beam Etching -->
          ${drawCompareFrame(22, 82, 326, 250, '① 余計な黒点（突起）→ 電子線ガスエッチング除去', '#e11d48', '#fff1f2')}
          <g transform="translate(38, 120)">
            <rect x="34" y="114" width="224" height="30" fill="url(#f346-quartz)" stroke="#0284c7"/>
            <rect x="52" y="88" width="60" height="26" fill="#312e81"/>
            <rect x="180" y="88" width="60" height="26" fill="#312e81"/>
            <!-- Excess black dot being vaporized -->
            <circle cx="122" cy="100" r="13" fill="#e11d48" stroke="#fef08a" stroke-dasharray="3 2" stroke-width="2"/>
            <!-- E-beam vertical + Etch Gas Needle -->
            <line x1="122" y1="10" x2="122" y2="85" stroke="#0284c7" stroke-width="3" marker-end="url(#f346-arrBlue)"/>
            <line x1="208" y1="32" x2="136" y2="86" stroke="#e11d48" stroke-width="3.2" marker-end="url(#f346-arrRed)"/>
            <text x="122" y="8" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">極細電子ビーム</text>
            <text x="236" y="34" text-anchor="middle" font-size="9" font-weight="800" fill="#be123c">エッチガス針</text>
            <text x="146" y="170" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9f1239">余計な黒点だけを数nm精度で削り取る！</text>
            <text x="146" y="188" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">石英ガラスに傷ゼロ（非ダメージ電子線）</text>
          </g>

          <!-- Right: White Defect (Missing Pinhole) -> EBID Metal Deposition -->
          ${drawCompareFrame(362, 82, 336, 250, '② 欠けた白点（穴）→ EBID電子線誘起蒸着で補填', '#059669', '#f0fdf4')}
          <g transform="translate(378, 120)">
            <rect x="34" y="114" width="234" height="30" fill="url(#f346-quartz)" stroke="#0284c7"/>
            <rect x="52" y="88" width="66" height="26" fill="#312e81"/>
            <rect x="148" y="88" width="96" height="26" fill="#312e81"/>
            <!-- EBID Patched golden-green bridge filling gap -->
            <rect x="118" y="88" width="30" height="26" fill="#10b981" stroke="#fef08a" stroke-width="2"/>
            <!-- E-beam + Precursor Gas Needle -->
            <line x1="133" y1="10" x2="133" y2="84" stroke="#0284c7" stroke-width="3" marker-end="url(#f346-arrBlue)"/>
            <line x1="224" y1="32" x2="148" y2="84" stroke="#d97706" stroke-width="3.2" marker-end="url(#f346-arrAmber)"/>
            <text x="133" y="8" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">極細電子ビーム</text>
            <text x="248" y="34" text-anchor="middle" font-size="9" font-weight="800" fill="#b45309">蒸着ガス針</text>
            <text x="152" y="170" text-anchor="middle" font-size="9.6" font-weight="800" fill="#047857">金属膜をピンポイント描き足し新品同様に！</text>
            <text x="152" y="188" text-anchor="middle" font-size="9" font-weight="700" fill="#065f46">カールツァイス MeRiT 電子線修正機＋SEM確認</text>
          </g>
        `,
        cards: [
          { label: '二刀流ナノ修復', line1: '黒点＝ガスアシスト電子線エッチング', line2: '白点＝電子線誘起蒸着（EBID）描画' },
          { label: '代表装置＆精度', line1: 'カールツァイス MeRiT 電子線修正機', line2: '修正精度 数nm級・直後SEM確認' },
          { label: '失敗すると写真に？', line1: '修正が雑だとその1か所だけ透過率が', line2: '変わり写真に微細なシミが現れる！' },
        ],
      });

    case 'fab3_p45_aims_aerial_image':
      return wrapFab3HdSvg({
        badge: 'F3-47',
        stepTag: 'P02-045 [業界標準]',
        title: 'AIMS（露光転写シミュレーション実機検査：カールツァイス）',
        analogy: '工場の露光機と同じ波長・同じレンズ条件で修正箇所を照らす最終実技試験',
        accent: '#8b5cf6',
        accentSoft: '#f5f3ff',
        body: `
          <g transform="translate(26, 82)">
            <!-- Left: AIMS Optical Column Matching Scanner Wavelength/NA -->
            <rect x="0" y="0" width="332" height="250" rx="10" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.5"/>
            <text x="166" y="20" text-anchor="middle" font-size="10.8" font-weight="800" fill="#ddd6fe">カールツァイス AIMS 実機光学エミュレーション</text>
            <!-- Top CCD Camera -->
            <rect x="110" y="34" width="112" height="26" rx="5" fill="#0284c7"/>
            <text x="166" y="51" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">UV空間像カメラ</text>
            <!-- Scanner-matched NA Lens -->
            <ellipse cx="166" cy="96" rx="58" ry="13" fill="#a78bfa" stroke="#ffffff" stroke-width="1.4"/>
            <text x="166" y="99.5" text-anchor="middle" font-size="9" font-weight="900" fill="#1e1b4b">実露光機と同じ NA・瞳</text>
            <polygon points="124,108 208,108 186,154 146,154" fill="url(#f347-uv)"/>
            <!-- Repaired Reticle -->
            <rect x="64" y="156" width="204" height="22" rx="3" fill="url(#f347-quartz)" stroke="#38bdf8"/>
            <circle cx="166" cy="167" r="6" fill="#10b981"/>
            <text x="166" y="196" text-anchor="middle" font-size="9.4" font-weight="800" fill="#6ee7b7">MeRiT修正箇所に実露光UV照射</text>
            <!-- UV Illumination Source bottom -->
            <rect x="96" y="208" width="140" height="26" rx="6" fill="#7c3aed"/>
            <text x="166" y="225" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">193nm / 248nm / 365nm光源</text>
          </g>
          <!-- Right: Aerial Image Intensity Profile Check -->
          <g transform="translate(374, 82)">
            <rect x="0" y="0" width="318" height="162" rx="10" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.4"/>
            <text x="159" y="21" text-anchor="middle" font-size="10.8" font-weight="800" fill="#4c1d95">空間像コントラスト合否判定波形</text>
            <!-- Reference vs Repaired Aerial Intensity Waveform Overlap -->
            <line x1="24" y1="100" x2="294" y2="100" stroke="#e11d48" stroke-dasharray="5 3" stroke-width="1.6"/>
            <text x="262" y="94" font-size="8.6" font-weight="800" fill="#e11d48">レジスト閾値</text>
            <path d="M 32 52 Q 86 52 106 138 Q 159 152 212 138 Q 232 52 286 52" fill="none" stroke="#0284c7" stroke-width="3.2"/>
            <path d="M 32 54 Q 86 54 108 136 Q 159 149 210 136 Q 232 54 286 54" fill="none" stroke="#10b981" stroke-width="2.2" stroke-dasharray="4 2"/>
            <text x="159" y="72" text-anchor="middle" font-size="9.5" font-weight="800" fill="#047857">✅ 基準像(青)と修正像(緑)が完全重畳！</text>
            ${drawPill(0, 174, 318, '見た目OKでも光干渉で線細る罠を防止', false)}
            ${drawPill(0, 208, 318, '実露光波長で転写OK証明→最終洗浄へ', true)}
          </g>
        `,
        cards: [
          { label: '実機エミュレーション', line1: 'カールツァイスAIMSで248/193/365nm', line2: '実露光機と同じNA・照明条件を再現' },
          { label: '合否判定', line1: 'SEM見た目ではなく「ウェーハ上の', line2: '空間像コントラスト」で最終合否判定' },
          { label: '失敗すると写真に？', line1: '見た目は直っていても光干渉で線が細り', line2: '特定座標に感度異常が出る罠を完全防止' },
        ],
      });

    case 'fab3_p46_final_haze_ultraclean':
      return wrapFab3HdSvg({
        badge: 'F3-48',
        stepTag: 'P02-046 [業界標準]',
        title: '最終精密洗浄＆ヘイズ耐性処理（ペリクル封印前ラスト清浄）',
        analogy: '修正工程で付いた微量ガスや粒子を透明テント封印直前に1粒残らず洗い流す',
        accent: '#06b6d4',
        accentSoft: '#ecfeff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#f8fafc" stroke="#06b6d4" stroke-width="1.4"/>
            <text x="334" y="22" text-anchor="middle" font-size="11.4" font-weight="800" fill="#155e75">ペリクル封印前の最終無欠清浄プロセス（パーティクル ゼロ達成）</text>
            <!-- 3 Clean Steps -->
            <rect x="22" y="42" width="194" height="126" rx="9" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="119" y="64" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0369a1">① 修正ガス・粒子除去</text>
            <text x="119" y="92" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">MeRiT修正で付着した</text>
            <text x="119" y="110" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">微量前駆体ガス分子を</text>
            <text x="119" y="128" text-anchor="middle" font-size="9.4" font-weight="700" fill="#059669">修正パッチ無傷で洗浄！</text>
            <line x1="220" y1="105" x2="242" y2="105" stroke="#06b6d4" stroke-width="2.6" marker-end="url(#f348-arrBlue)"/>

            <rect x="246" y="42" width="194" height="126" rx="9" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="343" y="64" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0e7490">② ヘイズ耐性処理</text>
            <text x="343" y="92" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">表面イオン・有機物を</text>
            <text x="343" y="110" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">UVオゾン＆超純水で</text>
            <text x="343" y="128" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0e7490">徹底パッシベーション</text>
            <line x1="444" y1="105" x2="466" y2="105" stroke="#059669" stroke-width="2.6" marker-end="url(#f348-arrGreen)"/>

            <rect x="470" y="42" width="176" height="126" rx="9" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
            <text x="558" y="64" text-anchor="middle" font-size="10.4" font-weight="800" fill="#047857">③ 異物最終チェック</text>
            <text x="558" y="102" text-anchor="middle" font-size="16" font-weight="900" fill="#059669">粒子 0 個</text>
            <text x="558" y="132" text-anchor="middle" font-size="9.2" font-weight="700" fill="#065f46">直ちに0.8µmペリクル</text>
            <text x="558" y="148" text-anchor="middle" font-size="9.2" font-weight="700" fill="#065f46">貼付装置へ直行！</text>

            ${drawPill(22, 194, 304, '洗浄不足→密閉後に露光機内でヘイズ曇り', false)}
            ${drawPill(342, 194, 304, 'パーティクルゼロ→完全無欠で封印準備完了', true)}
          </g>
        `,
        cards: [
          { label: '最終清浄', line1: '修正工程で付いた微量ガス・粒子を', line2: 'マスク最終洗浄機で徹底洗い落とし' },
          { label: 'ヘイズ予防', line1: 'ペリクル封印後は二度と拭えないため', line2: 'ヘイズ耐性処理＋異物最終チェック' },
          { label: '失敗すると写真に？', line1: '洗浄不足は露光装置内でのヘイズ', line2: '（曇り結晶）発生と露光不良の原因に' },
        ],
      });

    case 'fab3_p47_pellicle_08um_mount':
      return wrapFab3HdSvg({
        badge: 'F3-49',
        stepTag: 'P02-047 [業界標準]',
        title: 'ペリクル貼付（0.8µm極薄膜・6mm浮上でホコリが完全にボケて消える！）',
        analogy: 'シャボン玉並みに薄い0.8µm透明テントを6mm浮かせて張り、ゴミを完全ピンボケ化',
        accent: '#10b981',
        accentSoft: '#ecfdf5',
        body: `
          <!-- Left: Optical Defocus Physics Cutaway -->
          <g transform="translate(24, 82)">
            <rect x="0" y="0" width="444" height="250" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="1.6"/>
            <text x="222" y="20" text-anchor="middle" font-size="11.2" font-weight="800" fill="#6ee7b7">6mm浮上スタンドオフの驚異的「ピンボケ光学防御」原理</text>
            <!-- Dust particle sitting on 0.8um Pellicle -->
            <circle cx="222" cy="48" r="7.5" fill="#e11d48" stroke="#fecdd3" stroke-width="1.5"/>
            <text x="328" y="51" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fda4af">◀ ホコリは0.8µm膜上で停止！</text>
            <!-- 0.8um Fluoropolymer Membrane -->
            <line x1="68" y1="58" x2="376" y2="58" stroke="#34d399" stroke-width="3.2"/>
            <!-- 6mm Aluminum Standoff Frame -->
            <rect x="58" y="58" width="12" height="58" fill="#cbd5e1" stroke="#64748b"/>
            <rect x="374" y="58" width="12" height="58" fill="#cbd5e1" stroke="#64748b"/>
            <text x="128" y="92" text-anchor="middle" font-size="9.6" font-weight="900" fill="#34d399">▲ スタンドオフ 約6mm ▼</text>
            <!-- Wide UV ray cone passing around dust and focusing sharply ONLY on Mask Chrome plane -->
            <polygon points="150,36 294,36 222,118" fill="#38bdf8" fill-opacity="0.28" stroke="#38bdf8" stroke-dasharray="4 2"/>
            <!-- Mask Chrome Pattern Plane (IN FOCUS!) -->
            <rect x="44" y="116" width="356" height="12" fill="#4338ca"/>
            <rect x="196" y="116" width="52" height="12" fill="#e0f2fe"/>
            <rect x="34" y="128" width="376" height="32" fill="url(#f349-quartz)" stroke="#0284c7"/>
            <text x="222" y="148" text-anchor="middle" font-size="10.2" font-weight="900" fill="#0c4a6e">6インチ合成石英マスク（ここにピントがジャスト合焦！）</text>
            <!-- Projection lens & Clean Wafer -->
            <polygon points="196,160 248,160 236,204 208,204" fill="#10b981" fill-opacity="0.45"/>
            <rect x="108" y="204" width="228" height="24" rx="4" fill="#1e293b" stroke="#34d399" stroke-width="1.6"/>
            <text x="222" y="220" text-anchor="middle" font-size="10" font-weight="900" fill="#4ade80">✅ ウェーハ上：ホコリは完全ピンボケで一切写らない！</text>
          </g>
          <!-- Right: Material Specs & Makers -->
          <g transform="translate(480, 82)">
            ${drawKpiBox(0, 0, 212, 76, 'ペリクル膜仕様', '約0.8µm / 透過>99%', 'シャボン玉級の極薄フッ素樹脂膜', '#10b981')}
            ${drawKpiBox(0, 86, 212, 76, '主要メーカー', '三井化学 / 旭化成 等', 'アルミ枠スタンドオフ約6mm接着', '#0284c7')}
            ${drawPill(0, 174, 212, 'ペリクル無し→ゴミ1粒で全滅事故', false)}
            ${drawPill(0, 208, 212, '6mm浮上防御→量産歩留まりの守護神', true)}
          </g>
        `,
        cards: [
          { label: '極薄フッ素樹脂', line1: '厚さ約0.8µm・透過率99%超の', line2: '三井化学・旭化成等の透明ペリクル' },
          { label: '6mmピンボケ原理', line1: '回路面から約6mm浮かせて貼るため', line2: 'ホコリがピントから外れて完全に消える' },
          { label: '失敗すると写真に？', line1: 'ペリクルなしでホコリが1粒乗ると', line2: 'その瞬間から量産ウェーハ全滅事故！' },
        ],
      });

    case 'fab3_p48_starlight_post_pellicle':
      return wrapFab3HdSvg({
        badge: 'F3-50',
        stepTag: 'P02-048 [業界標準]',
        title: 'ペリクル貼付後・最終異物検査（STARlight 透過＆反射レーザー）',
        analogy: 'テントの上・テントの裏・ガラス面の3層すべてにゴミと気泡ゼロを証明する最終審判',
        accent: '#3b82f6',
        accentSoft: '#eff6ff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="424" height="250" rx="10" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5"/>
            <text x="212" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="#93c5fd">透過＋反射レーザーによる「3平面同時」完全異物検査</text>
            <!-- Dual Laser Rays (Reflected from top, Transmitted through bottom) -->
            <line x1="88" y1="36" x2="212" y2="96" stroke="#38bdf8" stroke-width="3" marker-end="url(#f350-arrBlue)"/>
            <line x1="212" y1="96" x2="336" y2="36" stroke="#fbbf24" stroke-width="3" marker-end="url(#f350-arrAmber)"/>
            <line x1="212" y1="96" x2="212" y2="220" stroke="#34d399" stroke-width="3" marker-end="url(#f350-arrGreen)"/>
            <text x="90" y="54" font-size="9" font-weight="800" fill="#38bdf8">入射レーザー</text>
            <text x="336" y="54" text-anchor="end" font-size="9" font-weight="800" fill="#fbbf24">反射検出</text>
            <text x="278" y="216" font-size="9" font-weight="800" fill="#4ade80">透過検出</text>
            <!-- 3 Inspected Planes -->
            <line x1="58" y1="96" x2="366" y2="96" stroke="#34d399" stroke-width="3"/>
            <text x="368" y="92" text-anchor="end" font-size="8.8" font-weight="800" fill="#6ee7b7">① ペリクル上面</text>
            <text x="368" y="112" text-anchor="end" font-size="8.8" font-weight="800" fill="#a7f3d0">② ペリクル下面</text>
            <rect x="54" y="138" width="316" height="32" fill="url(#f350-quartz)" stroke="#0284c7"/>
            <text x="212" y="158" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0c4a6e">③ マスクパターン面（閉じ込めゴミ・気泡ゼロ！）</text>
          </g>
          <g transform="translate(466, 82)">
            ${drawKpiBox(0, 0, 226, 76, '代表検査装置', 'KLA / レーザーテック', 'STARlight等 透過・反射同時走査', '#3b82f6')}
            ${drawKpiBox(0, 86, 226, 76, '最終成果物', '出荷品質保証書発行', '全面自動スキャン完全合格証明', '#059669')}
            ${drawPill(0, 174, 226, '貼付時にゴミ封入→即アウト再作業', false)}
            ${drawPill(0, 208, 226, '3平面完全ゼロ→SMIFポッド封入へ', true)}
          </g>
        `,
        cards: [
          { label: '3層同時検査', line1: 'ペリクルの上面・下面・マスク面の', line2: 'ゴミや接着気泡を透過＆反射で検証' },
          { label: '装置＆証憑', line1: 'KLA（STARlight等）・レーザーテック', line2: '全面自動検査→出荷品質保証書発行' },
          { label: '失敗すると写真に？', line1: '貼付時にゴミを内側に閉じ込めたら', line2: '工場で拭けず即アウト（やり直し）！' },
        ],
      });

    case 'fab3_p49_reticle_smif_pod':
      return wrapFab3HdSvg({
        badge: 'F3-51',
        stepTag: 'P02-049 [業界標準]',
        title: 'レチクルポッド収納（SMIF / RSP・窒素パージ・RFID紐付）',
        analogy: '1枚数百万円のマスクをガスを出さない気密カプセルへ窒素とRFID入りで封印',
        accent: '#14b8a6',
        accentSoft: '#f0fdfa',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="424" height="250" rx="10" fill="#f8fafc" stroke="#14b8a6" stroke-width="1.4"/>
            <text x="212" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f766e">低アウトガス気密ケース：レチクルSMIFポッド（RSP）断面</text>
            <!-- Top Robotic Flange (SEMI OHT) -->
            <rect x="166" y="34" width="92" height="18" rx="4" fill="#64748b"/>
            <text x="322" y="47" text-anchor="middle" font-size="9" font-weight="800" fill="#475569">◀ 天井無人搬送(OHT)フランジ</text>
            <!-- Hermetic Low-Outgas Dome -->
            <path d="M 66 178 L 66 72 Q 66 54 88 54 L 336 54 Q 358 54 358 72 L 358 178 Z" fill="#e0f2fe" fill-opacity="0.58" stroke="#0f766e" stroke-width="2.2"/>
            <!-- N2 Purge Atmosphere -->
            <text x="212" y="80" text-anchor="middle" font-size="10" font-weight="800" fill="#0284c7">高純度 乾燥窒素（N2）パージ気密空間</text>
            <!-- Pelliclized 6" Reticle held on kinematic pins -->
            <line x1="112" y1="114" x2="312" y2="114" stroke="#10b981" stroke-width="2.5"/>
            <rect x="102" y="132" width="220" height="22" rx="3" fill="url(#f351-quartz)" stroke="#0284c7" stroke-width="1.5"/>
            <text x="212" y="147" text-anchor="middle" font-size="9.5" font-weight="900" fill="#0c4a6e">6インチ ペリクル付レチクル（非接触固定）</text>
            <!-- Sealed Base + N2 Valves + RFID Chip -->
            <rect x="52" y="178" width="320" height="36" rx="6" fill="#1e293b"/>
            <rect x="74" y="186" width="84" height="20" rx="4" fill="#06b6d4"/>
            <text x="116" y="199.5" text-anchor="middle" font-size="9" font-weight="800" fill="#0f172a">N2 パージ弁</text>
            <rect x="262" y="186" width="94" height="20" rx="4" fill="#f59e0b"/>
            <text x="309" y="199.5" text-anchor="middle" font-size="9" font-weight="900" fill="#0f172a">📡 RFIDタグ内蔵</text>
            <text x="212" y="236" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f766e">全検査データ・シリアル番号・履歴をRFIDへ完全紐付！</text>
          </g>
          <g transform="translate(466, 82)">
            ${drawKpiBox(0, 0, 226, 76, '専用容器', '低アウトガス SMIF/RSP', 'VOCガス放出ゼロ樹脂＋窒素パージ', '#14b8a6')}
            ${drawKpiBox(0, 86, 226, 76, '個体管理', 'RFID 読取確認', '検査成績・シリアル番号を自動連携', '#d97706')}
            ${drawPill(0, 174, 226, 'ガス放出→輸送中にペリクル曇り', false)}
            ${drawPill(0, 208, 226, '気密N2封印→工場ストッカーへ出発', true)}
          </g>
        `,
        cards: [
          { label: '気密ポッド', line1: '1枚ずつ低アウトガス専用ケース', line2: '（SMIF / RSP・窒素パージ）へ封印' },
          { label: 'RFID連携', line1: 'RFIDタグへ全検査データとシリアル', line2: '番号を紐付け読取確認して出荷' },
          { label: '失敗すると写真に？', line1: '輸送中のガス放出でペリクルや', line2: 'マスクが曇り露光不能になるのを防止' },
        ],
      });

    case 'fab3_p50_stocker_96set_bridge':
      return wrapFab3HdSvg({
        badge: 'F3-52',
        stepTag: 'P02-050 [推定/標準]',
        title: '全96枚マスクセット工場受入・自動ストッカー登録 → 第4巻へ！',
        analogy: '最高純度300mmウェーハと約96枚・数億円のナノ型紙が遂に揃い量産号砲が鳴る！',
        accent: '#f59e0b',
        accentSoft: '#fffbeb',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.8"/>
            <text x="334" y="22" text-anchor="middle" font-size="11.5" font-weight="900" fill="#fde68a">自動レチクルストッカー（窒素パージ保管庫）＆ 第4巻 FEOL 380工程への架け橋</text>
            <!-- Left: 5-Bay 96-Mask Automated Stocker Vault -->
            <rect x="20" y="36" width="292" height="156" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="1.4"/>
            <text x="166" y="54" text-anchor="middle" font-size="10" font-weight="800" fill="#e2e8f0">工場MES登録済：全約96枚フルセット [推定]</text>
            ${[
              { y: 64, lbl: '画素ウェーハ FEOL（約25枚）', col: '#7c3aed', w: 126 },
              { y: 88, lbl: '画素ウェーハ BEOL（約13枚）', col: '#ea580c', w: 80 },
              { y: 112, lbl: 'ロジックウェーハ（約48枚）', col: '#0284c7', w: 236 },
              { y: 136, lbl: '裏面光学（約5枚）＋ CFA/OCL（約5枚）', col: '#10b981', w: 110 },
            ]
              .map(
                (s) =>
                  `<rect x="34" y="${s.y}" width="${s.w}" height="18" rx="4" fill="${s.col}"/>
                   <text x="40" y="${s.y + 12.5}" font-size="8.8" font-weight="800" fill="#ffffff">${s.lbl}</text>`
              )
              .join('')}
            <text x="166" y="178" text-anchor="middle" font-size="9.4" font-weight="800" fill="#fbbf24">総投資規模：数億円 〜 十数億円級 [推定]</text>

            <!-- Arrow to Vol.4 FEOL 380 Steps -->
            <line x1="316" y1="114" x2="352" y2="114" stroke="#fbbf24" stroke-width="3.5" marker-end="url(#f352-arrAmber)"/>

            <!-- Right: Combined Readiness -> Vol.4 Phase 3 FEOL Portal! -->
            <rect x="358" y="36" width="290" height="156" rx="9" fill="#172554" stroke="#fbbf24" stroke-width="2"/>
            <text x="503" y="58" text-anchor="middle" font-size="11" font-weight="900" fill="#fef08a">🏁 累計 110 / 約2,110工程 完了！</text>
            <rect x="376" y="70" width="254" height="32" rx="6" fill="#0f766e"/>
            <text x="503" y="90" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">✅ 第2巻：300mm CIS専用エピウェーハ(60工程)</text>
            <rect x="376" y="108" width="254" height="32" rx="6" fill="#0369a1"/>
            <text x="503" y="128" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">✅ 第3巻：約96枚フォトマスクセット(50工程)</text>
            <rect x="376" y="148" width="254" height="34" rx="7" fill="#f59e0b"/>
            <text x="503" y="169" text-anchor="middle" font-size="10.4" font-weight="900" fill="#0f172a">▶ 次：第4巻 画素FEOL 380工程へ突入！</text>

            ${drawPill(20, 206, 304, '1枚でも遅延・仕様違い→全2,000工程停止', false)}
            ${drawPill(344, 206, 304, '受入再検査合格→いよいよ量産スタート！', true)}
          </g>
        `,
        cards: [
          { label: '96枚勢揃い', line1: 'FEOL25+BEOL13+Logic48+裏面5+光学5', line2: '受入再検査後に自動ストッカー登録' },
          { label: '累計達成', line1: 'フェーズ1(60)＋フェーズ2(50)＝110工程', line2: 'ウェーハとナノ型紙の両輪が完全集結' },
          { label: '次巻への接続', line1: '第4巻：画素ウェーハ前工程 FEOL', line2: 'P03-001〜380で光の心臓部を彫り込む！', accent: '#059669' },
        ],
      });

    default:
      return null;
  }
}
