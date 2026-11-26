import { wrapFab3HdSvg, drawCompareFrame, drawKpiBox, drawPill } from '../fabVol3HdSchematics/shared';

/**
 * Vol.5 Ultra-HD 720x470 Beginner-Visual Posters — Group B (F5-14 – F5-25):
 * Block 4-C (P04-045–P04-134, 90 Steps!): M2–M4 Dual-Damascene ×3 Floors (Masks #28–#33).
 */
export const FAB5_HD_GROUP_B: Record<string, () => string> = {
  fab5_p045_m2_sicn_lowk: () =>
    wrapFab3HdSvg({
      badge: 'F5-14',
      stepTag: 'P04-045〜047 90工程開始',
      title: '【M2下地】SiCN銅封止＋V1/M2一体化Low-k成膜（デュアルダマシン開幕）',
      analogy: '1階M1の銅を透明ラップ(SiCN)で密封し、2階分の穴＋溝を一気に彫る厚めガラス床を積む',
      accent: '#0ea5e9',
      accentSoft: '#f0f9ff',
      body: `
        <rect x="26" y="84" width="668" height="120" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <text x="360" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9a3412">🏗 ブロック4-C（計90工程）：「1層30工程 × 3階層（M2・M3・M4）」の黄金サイクル！</text>
        ${[
          { x: 42, t: '① 下地成膜 (3工程)', s: 'SiCN封止＋Low-k', hi: true },
          { x: 204, t: '② Via穴 (12工程)', s: 'エレベーター縦穴', hi: false },
          { x: 366, t: '③ Metal溝 (12工程)', s: '横道路トレンチ', hi: false },
          { x: 528, t: '④ 一括充填CMP (3工程)', s: 'T字一体銅完成!', hi: false },
        ]
          .map(
            (s, i) => `
          <rect x="${s.x}" y="120" width="146" height="70" rx="8" fill="${s.hi ? '#0ea5e9' : '#ffffff'}" stroke="${s.hi ? '#0284c7' : '#ea580c'}" stroke-width="1.6"/>
          <text x="${s.x + 73}" y="148" text-anchor="middle" font-size="9.8" font-weight="900" fill="${s.hi ? '#ffffff' : '#9a3412'}">${s.t}</text>
          <text x="${s.x + 73}" y="170" text-anchor="middle" font-size="9" font-weight="700" fill="${s.hi ? '#e0f2fe' : '#475569'}">${s.s}</text>
          ${i < 3 ? `<line x1="${s.x + 148}" y1="155" x2="${s.x + 160}" y2="155" stroke="#ea580c" stroke-width="2.4" marker-end="url(#f514-arrAmber)"/>` : ''}`
          )
          .join('')}

        <rect x="26" y="216" width="668" height="116" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.4"/>
        <text x="360" y="236" text-anchor="middle" font-size="10.6" font-weight="800" fill="#075985">🛡 銅の6面完全バリア封止：下・両壁はTaN/Ta、天井はSiCNキャップで完全密封！</text>
        <rect x="64" y="248" width="592" height="32" rx="4" fill="#bae6fd" stroke="#0284c7"/>
        <text x="360" y="268" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0c4a6e">V1＋M2 一体化用 Low-k層間絶縁膜</text>
        <rect x="64" y="282" width="592" height="16" fill="#7c3aed"/>
        <text x="360" y="294" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">SiCN銅拡散防止キャップ（M1銅の天井フタ！）</text>
        <rect x="64" y="298" width="592" height="24" fill="#475569"/>
        <rect x="180" y="298" width="120" height="20" fill="#ea580c"/>
        <rect x="420" y="298" width="120" height="20" fill="#ea580c"/>
        <text x="240" y="312" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">M1銅配線</text>
        <text x="480" y="312" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffffff">M1銅配線</text>
      `,
      cards: [
        { label: 'デュアルダマシンとは', line1: '縦穴(Via)と横溝(Metal)を連続彫りし', line2: '1回の銅めっき・CMPで一体化する技', accent: '#ea580c' },
        { label: 'M1銅の天井シール', line1: 'SiCNキャップが上面への銅拡散と', line2: '酸化を封じエレクトロマイグレーション抑制', accent: '#7c3aed' },
        { label: '3階層90工程の幕開け', line1: 'M2(30)＋M3(30)＋M4(30)＝90工程', line2: 'BEOLの心臓となる立体交差網を構築', accent: '#0284c7' },
      ],
    }),

  fab5_m28_via1_pattern: () =>
    wrapFab3HdSvg({
      badge: 'F5-15',
      stepTag: 'Mask #28 / Via 1',
      title: '【Mask #28】ビア1（V1）露光＆縦エレベーター穴エッチング',
      analogy: '1階M1と2階M2を垂直に繋ぐエレベーター縦穴を彫り、底のSiCN蓋は次工程まで温存',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">🛗 ビアファースト工法：まず深いV1縦穴だけを垂直掘削！</text>
        <rect x="48" y="136" width="380" height="120" fill="#bae6fd"/>
        <!-- Carved Via 1 Shafts stopping gently on SiCN Cap -->
        <rect x="132" y="136" width="32" height="120" fill="#ffffff" stroke="#7c3aed" stroke-width="1.6"/>
        <rect x="308" y="136" width="32" height="120" fill="#ffffff" stroke="#7c3aed" stroke-width="1.6"/>
        <line x1="148" y1="116" x2="148" y2="246" stroke="#7c3aed" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#f515-arrPurple)"/>
        <line x1="324" y1="116" x2="324" y2="246" stroke="#7c3aed" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#f515-arrPurple)"/>
        <rect x="48" y="256" width="380" height="16" fill="#7c3aed"/>
        <text x="238" y="268" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">🛡 底のSiCNはまだ開けない（M1銅をプラズマ酸化から守る！）</text>
        <rect x="48" y="272" width="380" height="44" fill="#475569"/>
        <rect x="108" y="272" width="82" height="28" fill="#ea580c"/>
        <rect x="284" y="272" width="82" height="28" fill="#ea580c"/>
        <text x="149" y="290" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">M1銅</text>
        <text x="325" y="290" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">M1銅</text>

        ${drawKpiBox(468, 84, 226, 78, 'マスク＆工程', 'Mask #28 (L-01〜L-12)', 'P04-048〜059（V1縦穴加工）', '#7c3aed')}
        <rect x="468" y="176" width="226" height="156" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
        <text x="581" y="200" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0f172a">💡 なぜまだ銅を入れない？</text>
        <text x="581" y="226" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">直後のMask #29で上半分に</text>
        <text x="581" y="244" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">M2横溝を彫ってから一括充填！</text>
        ${drawPill(486, 272, 190, '継ぎ目ゼロのT字銅へ！', true)}
      `,
      cards: [
        { label: 'ビアファーストの知恵', line1: '深いV1穴を先に彫り底のSiCNは温存', line2: '下層M1銅のプラズマ酸化・飛散を防ぐ', accent: '#7c3aed' },
        { label: 'エレベーター縦穴', line1: 'Mask #28 / P04-048〜059(12工程)', line2: '1階M1と2階M2を垂直連結する柱穴', accent: '#0284c7' },
        { label: '次工程への直結', line1: '銅はまだ入れず即座にMask #29へ', line2: 'T字一体成形のデュアルダマシンへ', accent: '#ea580c' },
      ],
    }),

  fab5_m29_m2_row_drive: () =>
    wrapFab3HdSvg({
      badge: 'F5-16',
      stepTag: 'Mask #29 / 横36mm駆動',
      title: '【Mask #29】第2銅配線（M2）：横36mm行方向・画素駆動ライン',
      analogy: 'フルサイズ横36mm全域へ転送・リセット・選択合図を一斉配送する2階横向き高速道路',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        <!-- Full-Frame 36mm Horizontal Row Drive Visualization -->
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11" font-weight="800" fill="#92400e">↔ フルサイズ横36mmを貫く低抵抗M2行駆動ライン（TG/RST/SEL）</text>
        <!-- Left & Right Row Drivers -->
        <rect x="42" y="128" width="48" height="148" rx="6" fill="#0f172a"/>
        <text x="66" y="198" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fbbf24">左行</text>
        <text x="66" y="214" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fbbf24">ドライバ</text>
        <rect x="386" y="128" width="48" height="148" rx="6" fill="#0f172a"/>
        <text x="410" y="198" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fbbf24">右行</text>
        <text x="410" y="214" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fbbf24">ドライバ</text>
        <!-- Horizontal M2 Copper Buses -->
        ${[
          { y: 142, lbl: '転送ゲート線 (TG) ── 全列一斉シャッター合図!', col: '#ea580c' },
          { y: 186, lbl: 'リセット線 (RST) ── 計量カップ一斉初期化!', col: '#d97706' },
          { y: 230, lbl: '選択線 (SEL) ── 読み出す行を高速スキャン!', col: '#f59e0b' },
        ]
          .map(
            (r) =>
              `<rect x="92" y="${r.y}" width="292" height="28" rx="4" fill="${r.col}"/><text x="238" y="${r.y + 18}" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">${r.lbl}</text>`
          )
          .join('')}
        <text x="238" y="302" text-anchor="middle" font-size="9.6" font-weight="800" fill="#b45309">仕上げにV1底のSiCNを優しく突き抜き、M1と完全開通！</text>

        ${drawCompareFrame(468, 84, 226, 248, '⚡ 銅配線の低抵抗パワー！', '#059669', '#ecfdf5')}
        <text x="581" y="138" text-anchor="middle" font-size="10" font-weight="800" fill="#065f46">アルミ比 約40% 低抵抗！</text>
        <rect x="486" y="154" width="190" height="58" rx="8" fill="#ffffff" stroke="#059669"/>
        <text x="581" y="176" text-anchor="middle" font-size="9.4" font-weight="800" fill="#047857">✅ 画面左端〜右端 36mm</text>
        <text x="581" y="196" text-anchor="middle" font-size="9" font-weight="700" fill="#334155">露光タイミングズレゼロ!</text>
        <rect x="486" y="222" width="190" height="58" rx="8" fill="#fff1f2" stroke="#e11d48"/>
        <text x="581" y="244" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">❌ 抵抗が高いと…</text>
        <text x="581" y="264" text-anchor="middle" font-size="9" font-weight="700" fill="#9f1239">波形鈍り→左右輝度ムラ!</text>
        ${drawPill(492, 294, 178, 'Mask #29 / P04-060〜071', true)}
      `,
      cards: [
        { label: '横36mmの駆動高速道路', line1: 'TG・RST・SELの行制御線を敷設', line2: '画面左右のシャッターズレを防止', accent: '#d97706' },
        { label: '底SiCN突き抜き開通', line1: 'M2トレンチ掘削の最後にV1底の', line2: 'SiCNを抜いて1階M1銅を清浄露出', accent: '#7c3aed' },
        { label: '銅のスピード恩恵', line1: 'アルミより約40%低い抵抗により', line2: '毎秒120コマの鋭い駆動波形を維持', accent: '#059669' },
      ],
    }),

  fab5_p072_m2_dual_fill_cmp: () =>
    wrapFab3HdSvg({
      badge: 'F5-17',
      stepTag: 'P04-072〜074 M2完了',
      title: '【M2一括充填・研磨】V1＋M2デュアルダマシン銅めっき＆2段階CMP',
      analogy: '縦穴V1と横溝M2を1回のめっきで「継ぎ目ゼロのT字一体銅」に仕上げる！',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <rect x="26" y="84" width="406" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <text x="229" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9a3412">🏆 T字型シームレス銅：V1縦穴＋M2横溝を1回で同時充填！</text>
        <rect x="52" y="132" width="354" height="148" fill="#bae6fd"/>
        <!-- Violet Barrier around T-shape -->
        <polygon points="86,132 372,132 372,216 266,216 266,280 192,280 192,216 86,216" fill="#7c3aed"/>
        <!-- Seamless T-shaped Copper -->
        <polygon points="98,132 360,132 360,204 254,204 254,280 204,280 204,204 98,204" fill="#ea580c"/>
        <text x="229" y="174" text-anchor="middle" font-size="10.8" font-weight="900" fill="#ffffff">M2 横道路トレンチ（一体銅）</text>
        <text x="229" y="248" text-anchor="middle" font-size="10" font-weight="900" fill="#fde047">V1縦穴</text>
        <rect x="52" y="280" width="354" height="32" fill="#475569"/>
        <rect x="158" y="280" width="142" height="24" fill="#c2410c"/>
        <text x="229" y="296" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">1階 M1銅へ継ぎ目少なく低抵抗直結！</text>

        ${drawKpiBox(450, 84, 244, 78, '3工程で一気仕上げ', 'バリア→めっき→焼→CMP', 'TaN/Ta＋Seed → ECD → 焼成 → 2段階CMP/BTA', '#ea580c')}
        <rect x="450" y="176" width="244" height="156" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.4"/>
        <text x="572" y="200" text-anchor="middle" font-size="10.6" font-weight="800" fill="#065f46">✅ デュアルダマシン3大メリット</text>
        <text x="468" y="226" font-size="9.4" font-weight="700" fill="#0f172a">1. V1とM2の間にバリア継ぎ目ゼロ</text>
        <text x="468" y="246" font-size="9.4" font-weight="700" fill="#0f172a">2. 電気抵抗＆EM断線リスク大幅減</text>
        <text x="468" y="266" font-size="9.4" font-weight="700" fill="#0f172a">3. めっき・CMP回数を半分に削減！</text>
        ${drawPill(478, 288, 188, 'M2フロア30工程完了→M3へ!', true)}
      `,
      cards: [
        { label: 'シームレスT字構造', line1: 'V1とM2を1回のスーパーフィリングで', line2: '継ぎ目ゼロの一本銅に一体成形', accent: '#ea580c' },
        { label: '仕上げ品質保証', line1: '2段階CMP＋BTA防錆洗浄＋KLA検査', line2: 'スクラッチ・ディッシングを厳格抑制', accent: '#059669' },
        { label: 'M2完了マイルストーン', line1: 'P04-045〜074（計30工程）完了！', line2: '次は3階M3映像信号ハイウェイへ', accent: '#0284c7' },
      ],
    }),

  fab5_p075_m3_sicn_lowk: () =>
    wrapFab3HdSvg({
      badge: 'F5-18',
      stepTag: 'P04-075〜077 M3着工',
      title: '【M3下地】SiCN銅封止＋V2/M3一体化Low-k成膜（直交ノイズ隔離）',
      analogy: '2階の横道路（強い駆動パルス）と3階の縦道路（繊細な映像信号）を隔てる静かな防音床',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <rect x="26" y="84" width="668" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="360" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#075985">🔇 2階(横・駆動パルス)と3階(縦・微弱映像信号)の90°立体交差を絶縁隔離！</text>
        <!-- Top: M3 Analog VSL preview -->
        <rect x="64" y="128" width="592" height="44" rx="6" fill="#0284c7"/>
        <text x="360" y="154" text-anchor="middle" font-size="10.6" font-weight="900" fill="#ffffff">これから築く 3階 M3：超微弱なアナログ映像信号（数µV単位の繊細さ！）</text>
        <!-- Middle: Thick Low-k + SiCN Isolation Cushion -->
        <rect x="64" y="178" width="592" height="62" rx="6" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
        <text x="360" y="204" text-anchor="middle" font-size="10.4" font-weight="900" fill="#0c4a6e">V2/M3用 Low-k絶縁膜（低誘電率でパルス飛び込み容量を最小化！）</text>
        <text x="360" y="224" text-anchor="middle" font-size="9.4" font-weight="700" fill="#075985">＋ SiCN銅拡散防止キャップ（M2銅の完全封止）</text>
        <!-- Bottom: Noisy M2 Row Drive Lines -->
        <rect x="64" y="246" width="592" height="44" rx="6" fill="#d97706"/>
        <text x="360" y="272" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">2階 M2：3.3Vの強い行駆動パルス（横向きTG/RST/SEL）</text>
        ${drawPill(218, 300, 284, '交差部のカップリングノイズを徹底隔離！', true)}
      `,
      cards: [
        { label: '直交交差の防音床', line1: '横M2の強い駆動パルスと縦M3の', line2: '数µVアナログ信号をLow-k膜で隔離', accent: '#0284c7' },
        { label: 'M2銅の完全封止', line1: 'SiCNキャップでM2上面を密封し', line2: 'V2/M3一括加工のLow-k膜を成膜計測', accent: '#7c3aed' },
        { label: '高感度ISOへの貢献', line1: '層間容量を抑えることで14bit以上の', line2: 'クリアな暗部階調と低ノイズを保持', accent: '#059669' },
      ],
    }),

  fab5_m30_via2_pattern: () =>
    wrapFab3HdSvg({
      badge: 'F5-19',
      stepTag: 'Mask #30 / Via 2',
      title: '【Mask #30】ビア2（V2）露光＆縦穴エッチング（M2→M3連結）',
      analogy: '画素の微弱なアナログ出力を3階の専用映像道路（VSL）へ上げる精密エレベーター穴',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">📐 数千列のV2穴径をナノ精度で均一化（縦シマノイズ防止）</text>
        <rect x="48" y="140" width="380" height="122" fill="#bae6fd"/>
        ${[108, 194, 280, 366]
          .map(
            (x) =>
              `<rect x="${x - 14}" y="140" width="28" height="122" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/><line x1="${x}" y1="120" x2="${x}" y2="254" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#f519-arrPurple)"/>`
          )
          .join('')}
        <rect x="48" y="262" width="380" height="50" fill="#475569"/>
        <text x="238" y="292" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fde047">全数ADI / AEI CD-SEMで穴径均一性を徹底監視！</text>

        ${drawKpiBox(468, 84, 226, 78, 'マスク＆工程', 'Mask #30 (L-01〜L-12)', 'P04-078〜089（V2縦穴加工）', '#7c3aed')}
        ${drawCompareFrame(468, 174, 226, 158, '穴径が列ごとにバラつくと？', '#e11d48', '#fff1f2')}
        <text x="581" y="222" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">ビア抵抗の列間差がそのまま</text>
        <text x="581" y="240" text-anchor="middle" font-size="10.2" font-weight="900" fill="#be123c">暗部の縦シマ（列FPN）に!</text>
        ${drawPill(486, 278, 190, '均一V2 → 縦シマゼロ画質', true)}
      `,
      cards: [
        { label: 'アナログ信号の縦通路', line1: 'Mask #30 / P04-078〜089(12工程)', line2: 'M2からM3 VSL信号線へ繋ぐ縦穴', accent: '#7c3aed' },
        { label: '縦シマ(FPN)の防止', line1: '数千列のビア穴径を均一に制御し', line2: '列ごとの抵抗・電圧オフセットを排除', accent: '#0284c7' },
        { label: '次工程M3へ連続加工', line1: '底SiCNを残したまま即Mask #31へ', line2: 'VSL＋グランドシールドと一体形成', accent: '#059669' },
      ],
    }),

  fab5_m31_m3_vsl_shield: () =>
    wrapFab3HdSvg({
      badge: 'F5-20',
      stepTag: '★Mask #31 VSL防音壁',
      title: '【Mask #31】第3銅配線（M3）：列方向VSL信号線＆防音グランドシールド',
      analogy: '隣り合う映像信号線がおしゃべり（混線）しないよう、両脇にグランド線の防音壁を並べる！',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        ${drawCompareFrame(26, 84, 344, 248, '✅ 正解：VSL信号線の両脇にグランド防音壁（シールド）！', '#059669', '#ecfdf5')}
        ${[
          { x: 56, w: 22, t: 'GND', c: '#059669' },
          { x: 88, w: 38, t: 'VSL1', c: '#0284c7' },
          { x: 136, w: 22, t: 'GND', c: '#059669' },
          { x: 168, w: 38, t: 'VSL2', c: '#0284c7' },
          { x: 216, w: 22, t: 'GND', c: '#059669' },
          { x: 248, w: 38, t: 'VSL3', c: '#0284c7' },
          { x: 296, w: 22, t: 'GND', c: '#059669' },
        ]
          .map(
            (b) =>
              `<rect x="${b.x}" y="128" width="${b.w}" height="148" rx="4" fill="${b.c}"/><text x="${b.x + b.w / 2}" y="206" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">${b.t}</text>`
          )
          .join('')}
        ${drawPill(78, 292, 240, '隣接列への電気クロストーク完全遮断!', true)}

        ${drawCompareFrame(386, 84, 308, 248, '❌ シールドなし：強い光が隣列へ混線！', '#e11d48', '#fff1f2')}
        <rect x="424" y="132" width="52" height="134" rx="4" fill="#fbbf24" stroke="#b45309"/>
        <text x="450" y="198" text-anchor="middle" font-size="9.2" font-weight="900" fill="#78350f">明るい列</text>
        <rect x="536" y="132" width="52" height="134" rx="4" fill="#1e293b"/>
        <text x="562" y="198" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fda4af">暗い隣列</text>
        <path d="M 480,168 Q 508,152 532,168" fill="none" stroke="#e11d48" stroke-width="2.6" marker-end="url(#f520-arrRed)"/>
        <path d="M 480,224 Q 508,208 532,224" fill="none" stroke="#e11d48" stroke-width="2.6" marker-end="url(#f520-arrRed)"/>
        <text x="640" y="184" text-anchor="middle" font-size="9.2" font-weight="900" fill="#be123c">💥 電磁結合で</text>
        <text x="640" y="202" text-anchor="middle" font-size="9.2" font-weight="900" fill="#be123c">影・スジ発生!</text>
        ${drawPill(430, 292, 220, 'ストリーキング（混線スジ）発生', false)}
      `,
      cards: [
        { label: 'M3の重要ミッション', line1: '縦向きの画素出力信号線(VSL)と', line2: '両脇のグランド防音壁をセット敷設', accent: '#0284c7' },
        { label: '高速連写マルチVSL', line1: '1列に複数本のVSLを並列配置し', line2: '複数行同時読み出しで40–120fps実現', accent: '#059669' },
        { label: '写真への影響', line1: '明るい被写体の横にスジが出る', line2: '電気クロストーク(ストリーキング)根絶', accent: '#e11d48' },
      ],
    }),

  fab5_p102_m3_dual_fill_cmp: () =>
    wrapFab3HdSvg({
      badge: 'F5-21',
      stepTag: 'P04-102〜104 M3完了',
      title: '【M3一括充填・研磨】V2＋M3デュアルダマシン銅めっき＆2段階CMP',
      analogy: '数千本の縦VSL信号線と防音シールドを1回の銅めっきと精密CMPで均一仕上げ！',
      accent: '#0ea5e9',
      accentSoft: '#f0f9ff',
      body: `
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#075985">✨ 画面全面のVSL銅配線を均一厚みへ磨き上げる2段階CMP</text>
        <rect x="46" y="152" width="384" height="114" fill="#bae6fd"/>
        ${[76, 134, 192, 250, 308, 366]
          .map(
            (x, idx) =>
              `<rect x="${x}" y="152" width="${idx % 2 === 0 ? 18 : 30}" height="52" fill="${idx % 2 === 0 ? '#059669' : '#ea580c'}" stroke="#7c3aed" stroke-width="1.4"/>`
          )
          .join('')}
        <line x1="40" y1="152" x2="436" y2="152" stroke="#059669" stroke-width="2.6"/>
        <text x="238" y="240" text-anchor="middle" font-size="10" font-weight="900" fill="#075985">バリア/シード → スーパーフィリング → アニール → 2段階CMP＆BTA</text>
        ${drawPill(108, 286, 260, 'M3フロア30工程完了 → 4階M4電源網へ!', true)}

        ${drawKpiBox(468, 84, 226, 78, 'M3累計完了', '30工程 (P04-075〜104)', 'ブロック4-C 60/90工程突破！', '#0284c7')}
        <rect x="468" y="176" width="226" height="156" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.4"/>
        <text x="581" y="202" text-anchor="middle" font-size="10.4" font-weight="800" fill="#065f46">🎯 なぜCMP均一性が命？</text>
        <text x="581" y="230" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">数千本のVSL銅線の断面積が</text>
        <text x="581" y="248" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">画面端から中央までピタリ一致!</text>
        ${drawPill(488, 280, 186, '縦シマゼロの清澄な画面', true)}
      `,
      cards: [
        { label: 'V2＋M3一括仕上げ', line1: '1回のスーパーフィリング銅めっきで', line2: '縦穴V2とVSL/シールドを一気充填', accent: '#0284c7' },
        { label: 'ディッシング制御', line1: '2段階CMPとBTA防錆で全列均一化', line2: '列間抵抗差による縦シマノイズを根絶', accent: '#059669' },
        { label: 'ブロック4-C 2/3達成', line1: 'M2(30)＋M3(30)＝60工程完了', line2: '次は4階M4強力パワーメッシュへ！', accent: '#ea580c' },
      ],
    }),

  fab5_p105_m4_sicn_imd: () =>
    wrapFab3HdSvg({
      badge: 'F5-22',
      stepTag: 'P04-105〜107 M4着工',
      title: '【M4下地】SiCN銅封止キャップ＋V3/M4用絶縁膜成膜・計測',
      analogy: '繊細な3階映像道路を封じ、その上へ大電流パワーメッシュを載せる頑丈な4階床を敷く',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <rect x="26" y="84" width="668" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="360" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">🏢 上層階ほど「太く・厚く・大電流」！ ── 4階M4パワーメッシュ着工</text>
        <rect x="64" y="130" width="592" height="46" rx="6" fill="#ea580c"/>
        <text x="360" y="157" text-anchor="middle" font-size="10.6" font-weight="900" fill="#ffffff">これから築く 4階 M4：VDD / VSS 強力格子状パワーメッシュ（外部ノイズ屋根シールド兼用!）</text>
        <rect x="64" y="182" width="592" height="58" rx="6" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="360" y="215" text-anchor="middle" font-size="10.2" font-weight="900" fill="#075985">V3 / M4 一体化用 層間絶縁膜（PECVD成膜＆膜厚計測）</text>
        <rect x="64" y="244" width="592" height="20" fill="#7c3aed"/>
        <text x="360" y="258" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">M3銅完全封止 SiCNキャップ</text>
        <rect x="64" y="268" width="592" height="38" rx="4" fill="#334155"/>
        <text x="360" y="291" text-anchor="middle" font-size="9.6" font-weight="800" fill="#93c5fd">3階 M3：VSLアナログ映像出力線 ＋ グランドシールド</text>
      `,
      cards: [
        { label: '大電流階層の土台', line1: 'M3銅をSiCNで完全封止した上に', line2: '太め配線M4用の頑丈な絶縁膜を成膜', accent: '#7c3aed' },
        { label: '屋根シールドの副効果', line1: '4階に広大な電源/GND網が乗ることで', line2: '3階VSL線を外来ノイズからも防護', accent: '#0284c7' },
        { label: '工程位置', line1: 'P04-105〜P04-107（非露光3工程）', line2: 'ブロック4-C最後の階層M4が開始', accent: '#ea580c' },
      ],
    }),

  fab5_m32_via3_pattern: () =>
    wrapFab3HdSvg({
      badge: 'F5-23',
      stepTag: 'Mask #32 / Via 3',
      title: '【Mask #32】ビア3（V3）露光＆多重ビア縦穴エッチング',
      analogy: '大電流が渋滞なく降りられるよう、複数のエレベーター縦穴（多重ビア）を並べて彫る',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">⚡ 多重ビア（マルチビア）設計：大電流を分散して発熱＆断線ゼロ！</text>
        <rect x="52" y="138" width="372" height="122" fill="#bae6fd"/>
        <!-- Paired Multi-Via Arrays -->
        ${[108, 144, 220, 256, 332, 368]
          .map((x) => `<rect x="${x - 11}" y="138" width="22" height="122" fill="#ffffff" stroke="#7c3aed" stroke-width="1.6"/>`)
          .join('')}
        <text x="126" y="200" text-anchor="middle" font-size="8.6" font-weight="900" fill="#5b21b6">多重V3</text>
        <text x="238" y="200" text-anchor="middle" font-size="8.6" font-weight="900" fill="#5b21b6">多重V3</text>
        <text x="350" y="200" text-anchor="middle" font-size="8.6" font-weight="900" fill="#5b21b6">多重V3</text>
        <rect x="52" y="260" width="372" height="52" fill="#475569"/>
        <text x="238" y="290" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fde047">1本に集中させず並列配置 → IRドロップ＆発熱激減!</text>

        ${drawKpiBox(468, 84, 226, 78, 'マスク＆工程', 'Mask #32 (L-01〜L-12)', 'P04-108〜119（V3縦穴加工）', '#7c3aed')}
        <rect x="468" y="176" width="226" height="156" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.4"/>
        <text x="581" y="204" text-anchor="middle" font-size="10.4" font-weight="800" fill="#065f46">🛡 なぜ多重ビア？</text>
        <text x="581" y="232" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">全画素同時駆動時の瞬間電流</text>
        <text x="581" y="250" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">（数アンペア級）を並列分散！</text>
        ${drawPill(488, 282, 186, '冗長性＋低抵抗を同時達成', true)}
      `,
      cards: [
        { label: '大電流の縦エレベーター', line1: 'Mask #32 / P04-108〜119(12工程)', line2: 'M3とM4電源メッシュを低抵抗接続', accent: '#7c3aed' },
        { label: '多重ビアの信頼性', line1: '電流集中によるジュール発熱と', line2: 'エレクトロマイグレーションを防止', accent: '#059669' },
        { label: 'IRドロップ解析設計', line1: '画面全面で均等給電できるよう', line2: '最適な密度分布でV3を自動配置', accent: '#0284c7' },
      ],
    }),

  fab5_m33_m4_power_mesh: () =>
    wrapFab3HdSvg({
      badge: 'F5-24',
      stepTag: '★Mask #33 電源メッシュ',
      title: '【Mask #33】第4銅配線（M4）：VDD/VSS強化パワーメッシュ',
      analogy: 'GSや120fps連写で全画素が一斉に動く瞬間も、画面中央が暗くならない強力格子送電網！',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <!-- Left: Power Mesh Grid Visualization -->
        <rect x="26" y="84" width="386" height="248" rx="10" fill="#0f172a" stroke="#ea580c" stroke-width="1.6"/>
        <text x="219" y="106" text-anchor="middle" font-size="11" font-weight="800" fill="#fdba74">⚡ M4 VDD（赤銅）＆ VSS（青緑）強化パワーメッシュ</text>
        ${[134, 184, 234, 284]
          .map(
            (y, i) =>
              `<rect x="46" y="${y}" width="346" height="14" rx="3" fill="${i % 2 === 0 ? '#ea580c' : '#10b981'}"/>`
          )
          .join('')}
        ${[76, 148, 220, 292, 364]
          .map(
            (x, i) =>
              `<rect x="${x}" y="122" width="14" height="192" rx="3" fill="${i % 2 === 0 ? '#f59e0b' : '#06b6d4'}" fill-opacity="0.88"/>`
          )
          .join('')}
        <text x="219" y="324" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">BSIだから画素の真上全面へ堂々と網目を張れる！</text>

        <!-- Right: Power Shading OK vs NG Photo Comparison -->
        ${drawCompareFrame(428, 84, 266, 248, '📸 40–120fps / GS連写時の写真比較', '#ea580c', '#fff7ed')}
        <rect x="448" y="124" width="226" height="72" rx="6" fill="#e0f2fe" stroke="#059669" stroke-width="1.5"/>
        <text x="561" y="154" text-anchor="middle" font-size="10" font-weight="900" fill="#065f46">✅ M4強化メッシュあり</text>
        <text x="561" y="174" text-anchor="middle" font-size="9" font-weight="700" fill="#047857">画面四隅〜中央まで明るさ均一！</text>

        <rect x="448" y="208" width="226" height="72" rx="6" fill="#94a3b8" stroke="#e11d48" stroke-width="1.5"/>
        <ellipse cx="561" cy="244" rx="76" ry="26" fill="#334155" fill-opacity="0.72"/>
        <text x="561" y="240" text-anchor="middle" font-size="9.8" font-weight="900" fill="#fecdd3">❌ 電源網不足（IRドロップ）</text>
        <text x="561" y="258" text-anchor="middle" font-size="8.8" font-weight="700" fill="#ffffff">画面中央だけ暗いシェーディング!</text>
        ${drawPill(466, 292, 190, 'ΔV ＝ I × R_mesh を極小化', true)}
      `,
      cards: [
        { label: '強力送電メッシュ', line1: 'VDD電源とVSSグランドを格子配置', line2: 'グローバルシャッター一斉駆動を支持', accent: '#ea580c' },
        { label: 'BSIだから可能な贅沢', line1: 'FSIでは影になるため張れなかった', line2: 'ぶ厚い送電網を画素全面へ展開可能', accent: '#0284c7' },
        { label: '写真への効果', line1: '電圧降下(IRドロップ)を防ぎ', line2: '画面中央シェーディング・色転びゼロ', accent: '#059669' },
      ],
    }),

  fab5_p132_m4_dual_fill_cmp: () =>
    wrapFab3HdSvg({
      badge: 'F5-25',
      stepTag: 'P04-132〜134 4-C完走!',
      title: '【M4一括充填・研磨】V3＋M4銅めっき＆CMP（ブロック4-C 90工程完走！）',
      analogy: 'M2・M3・M4の3階建て（30工程×3層＝全90工程）が一気開通し、残すは最上階M5のみ！',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <rect x="26" y="84" width="668" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.6"/>
        <text x="360" y="108" text-anchor="middle" font-size="11.6" font-weight="900" fill="#9a3412">🎉 ブロック4-C（M2〜M4 デュアルダマシン ×3階層 ＝ 全90工程）完全制覇！</text>
        ${[
          { x: 46, fl: '2階 M2 (30工程 ✅)', m: 'Mask #28–29', role: '横36mm 行駆動ライン', col: '#f59e0b' },
          { x: 258, fl: '3階 M3 (30工程 ✅)', m: 'Mask #30–31', role: '縦VSL映像線＋防音壁', col: '#0284c7' },
          { x: 470, fl: '4階 M4 (30工程 ✅)', m: 'Mask #32–33', role: 'VDD/VSS強力電源網', col: '#ea580c' },
        ]
          .map(
            (c) => `
          <rect x="${c.x}" y="128" width="198" height="142" rx="10" fill="#ffffff" stroke="${c.col}" stroke-width="1.8"/>
          <rect x="${c.x}" y="128" width="198" height="30" rx="10" fill="${c.col}"/>
          <text x="${c.x + 99}" y="147.5" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">${c.fl}</text>
          <text x="${c.x + 99}" y="180" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">${c.m}</text>
          <text x="${c.x + 99}" y="206" text-anchor="middle" font-size="9.6" font-weight="700" fill="${c.col}">${c.role}</text>
          <text x="${c.x + 99}" y="232" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">一括Cuめっき＋2段階CMP</text>
          <text x="${c.x + 99}" y="252" text-anchor="middle" font-size="8.6" font-weight="700" fill="#059669">BTA防錆・KLA検査合格</text>`
          )
          .join('')}
        ${drawPill(188, 290, 344, '次：ブロック4-D（最上階M5幹線＋Al＋WAT関所）へ！', true)}
      `,
      cards: [
        { label: '90工程の立体高速道路', line1: 'フェーズ4(210工程)の43%を占める', line2: 'M2〜M4 3階層がここで完全開通！', accent: '#ea580c' },
        { label: 'スロット抜き工夫', line1: '太いM4銅線には極小ガラス島を抜き', line2: 'CMP時のディッシング凹みを徹底抑制', accent: '#0284c7' },
        { label: 'いよいよ最上階へ', line1: '次ブロック4-Dで5階M5厚膜幹線と', line2: 'ソニーCu5+Al1構成のAl層を仕上げる', accent: '#059669' },
      ],
    }),
};
