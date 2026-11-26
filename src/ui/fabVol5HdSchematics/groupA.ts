import { wrapFab3HdSvg, drawCompareFrame, drawKpiBox, drawPill } from '../fabVol3HdSchematics/shared';

/**
 * Vol.5 Ultra-HD 720x470 Beginner-Visual Posters — Group A (F5-01 – F5-13):
 * Hero 5-Floor Copper Highway + FSI vs BSI, 5-Block 210-Step Map,
 * Block 4-A (PMD & W Contact Nails, Mask #26) & Block 4-B (M1 Copper Single Damascene, Mask #27).
 */
export const FAB5_HD_GROUP_A: Record<string, () => string> = {
  fab5_hero_beol_5floor_highway: () =>
    wrapFab3HdSvg({
      badge: 'F5-01',
      stepTag: 'BEOL 210工程 / 13Mask',
      title: '5階建て銅の立体高速道路（Cu5＋Al1）＆5,040万Cu-Cu接合面',
      analogy: '画素マンションの屋上へ5階建て銅道路を築き、最大5,040万個の銅コンセントを並べる',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <!-- Left: Old FSI (Blocked by Wires) vs Modern BSI Stacked (100% Unobstructed Light!) -->
        ${drawCompareFrame(24, 82, 198, 250, '❌ 昔のFSI（表面照射）', '#e11d48', '#fff1f2')}
        <text x="123" y="124" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">上から光が通るのに…</text>
        ${[138, 168, 198]
          .map(
            (y) =>
              `<rect x="40" y="${y}" width="54" height="16" rx="2" fill="#ea580c"/><rect x="152" y="${y}" width="54" height="16" rx="2" fill="#ea580c"/>`
          )
          .join('')}
        <line x1="68" y1="126" x2="68" y2="146" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#f501-arrAmber)"/>
        <line x1="123" y1="126" x2="123" y2="236" stroke="#f59e0b" stroke-width="2.6" marker-end="url(#f501-arrAmber)"/>
        <rect x="44" y="242" width="158" height="40" rx="5" fill="#bae6fd" stroke="#0284c7"/>
        <text x="123" y="266" text-anchor="middle" font-size="9.6" font-weight="800" fill="#075985">PD（配線が影になる）</text>
        ${drawPill(38, 294, 170, '配線が光の邪魔＆制限大', false)}

        <!-- Center: Modern BSI Stacked 5-Floor Copper Highway Cutaway! -->
        ${drawCompareFrame(234, 82, 266, 250, '✅ 現代BSI積層：Cu 5層＋Al 1層 [確認済み]', '#ea580c', '#fff7ed')}
        <!-- Top: Rooftop 50.4M Cu-Cu Hybrid Pads -->
        <rect x="252" y="118" width="230" height="24" rx="4" fill="#0f172a"/>
        ${[0, 1, 2, 3, 4, 5, 6]
          .map((i) => `<rect x="${262 + i * 31}" y="122" width="20" height="14" rx="2" fill="#fb923c"/>`)
          .join('')}
        <text x="367" y="114" text-anchor="middle" font-size="8.6" font-weight="900" fill="#9a3412">屋上：最大5,040万Cu-Cu接合パッド（2–5nm凹み）</text>
        <!-- 5 Copper Floors + Al-Cu Strip -->
        ${[
          { y: 148, lbl: 'M5 厚膜幹線 ＋ Al-Cu外部パッド', col: '#ea580c' },
          { y: 174, lbl: 'M4 VDD/VSS 強力パワーメッシュ', col: '#d97706' },
          { y: 200, lbl: 'M3 縦VSL映像信号 ＋ 防音シールド', col: '#0284c7' },
          { y: 226, lbl: 'M2 横36mm 行駆動ライン(TG/RST)', col: '#f59e0b' },
          { y: 252, lbl: 'M1 画素内ローカル銅 ＋ W釘(1階)', col: '#64748b' },
        ]
          .map(
            (fl) =>
              `<rect x="252" y="${fl.y}" width="230" height="22" rx="4" fill="${fl.col}"/><text x="367" y="${fl.y + 14.5}" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">${fl.lbl}</text>`
          )
          .join('')}
        <!-- Silicon FEOL underneath -->
        <rect x="252" y="278" width="230" height="24" rx="4" fill="#38bdf8" stroke="#0284c7"/>
        <text x="367" y="294" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0c4a6e">裏返せば裏から100%光が入るPD!</text>
        <text x="367" y="320" text-anchor="middle" font-size="8.8" font-weight="800" fill="#059669">↑ 光の邪魔ゼロで自由に太い銅道路を建設！</text>

        <!-- Right: Key Vol.5 KPIs -->
        ${drawKpiBox(512, 82, 184, 76, 'BEOL全工程＆マスク', '210工程 / 13Mask', '13×12露光(156)＋非露光54', '#ea580c')}
        ${drawKpiBox(512, 168, 184, 76, 'ソニーIEDM標準構成', 'Cu 5層 ＋ Al 1層', 'M1〜M5銅＋外部/IR用Al [確認済み]', '#0284c7')}
        ${drawKpiBox(512, 254, 184, 78, '屋上ハイブリッド接合', 'Ra＜0.3nm / 凹2–5nm', '5,040万個を接着剤レス結合！', '#059669')}
      `,
      cards: [
        { label: 'BSI積層だけの特権', line1: '後で裏返して裏から光を入れるため', line2: '5階建て銅配線が光の邪魔をゼロに!', accent: '#ea580c' },
        { label: '逆転の象嵌ダマシン法', line1: '削れない銅は先にガラスへ溝を彫り', line2: 'バリア→めっき→CMP削りで埋込む', accent: '#0284c7' },
        { label: '屋上2〜5nmの神業', line1: '銅パッドを2〜5nmわざと凹ませ', line2: '熱膨張で5,040万個を完全直結！', accent: '#059669' },
      ],
    }),

  fab5_phase4_beol_terrace_deck: () =>
    wrapFab3HdSvg({
      badge: 'F5-02',
      stepTag: '全210工程 5ブロック',
      title: 'フェーズ4（画素BEOL）全210工程・全13マスク完全工程マップ',
      analogy: 'W釘(4-A)→M1銅(4-B)→M2〜M4 3階層(4-C)→M5・Al・WAT(4-D)→Cu-Cu接合面(4-E)',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        ${[
          { x: 24, y: 84, w: 214, t: '4-A Wコンタクト釘', st: 'P04-001〜022 (22工程)', m: 'Mask #26 (1枚)', d1: 'CESL・PMD・80–120nm穴', d2: 'TiN鎧＋WF6タングステン釘', c: '#0284c7', bg: '#f0f9ff' },
          { x: 252, y: 84, w: 214, t: '4-B M1銅ダマシン', st: 'P04-023〜044 (22工程)', m: 'Mask #27 (1枚)', d1: 'Low-k SiOC(k≈2.7–3.0)', d2: '★TaN/Taバリア＆底上げめっき', c: '#ea580c', bg: '#fff7ed' },
          { x: 480, y: 84, w: 214, t: '4-C M2〜M4 ×3層', st: 'P04-045〜134 (90工程!)', m: 'Mask #28〜#33 (6枚)', d1: '30工程×3階デュアルダマシン', d2: '行駆動→VSL防音→電源メッシュ', c: '#d97706', bg: '#fffbeb' },
          { x: 24, y: 204, w: 326, t: '4-D M5幹線・Al再配線＆接合前WAT関所', st: 'P04-135〜178 (44工程)', m: 'Mask #34〜#36 (3枚)', d1: '厚膜M5＋Al-Cu(Cu5+Al1)＋裏面IR目印', d2: '★Keysight WATで道連れ不良を事前排除！', c: '#7c3aed', bg: '#f5f3ff' },
          { x: 368, y: 204, w: 326, t: '4-E Cu-Cuハイブリッド接合面＆ナノ平坦CMP', st: 'P04-179〜210 (32工程)', m: 'Mask #37〜#38 (2枚)', d1: 'SiCN膜・HB-Via・5,040万Cuパッド', d2: '★Ra＜0.3nm＆2–5nmリセス＋AFM異物0検査', c: '#059669', bg: '#ecfdf5' },
        ]
          .map(
            (b) => `
          <g transform="translate(${b.x}, ${b.y})">
            <rect x="0" y="0" width="${b.w}" height="104" rx="10" fill="${b.bg}" stroke="${b.c}" stroke-width="1.6"/>
            <rect x="0" y="0" width="${b.w}" height="26" rx="10" fill="${b.c}"/>
            <rect x="0" y="18" width="${b.w}" height="8" fill="${b.c}"/>
            <text x="${b.w / 2}" y="17.5" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">${b.t}</text>
            <text x="${b.w / 2}" y="44" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">${b.st}</text>
            <rect x="${b.w / 2 - 78}" y="51" width="156" height="18" rx="9" fill="#ffffff" stroke="${b.c}" stroke-opacity="0.5"/>
            <text x="${b.w / 2}" y="63.5" text-anchor="middle" font-size="9.2" font-weight="800" fill="${b.c}">${b.m}</text>
            <text x="${b.w / 2}" y="82" text-anchor="middle" font-size="9.2" font-weight="600" fill="#334155">${b.d1}</text>
            <text x="${b.w / 2}" y="96" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0f172a">${b.d2}</text>
          </g>`
          )
          .join('')}
        <line x1="239" y1="136" x2="250" y2="136" stroke="#475569" stroke-width="2.2" marker-end="url(#f502-arrSlate)"/>
        <line x1="467" y1="136" x2="478" y2="136" stroke="#475569" stroke-width="2.2" marker-end="url(#f502-arrSlate)"/>
        <line x1="351" y1="256" x2="366" y2="256" stroke="#059669" stroke-width="2.4" marker-end="url(#f502-arrGreen)"/>
        <rect x="24" y="317" width="670" height="22" rx="11" fill="#0f172a"/>
        <text x="359" y="331.5" text-anchor="middle" font-size="10.2" font-weight="800" fill="#f8fafc">整合確認：13マスク(Mask #26〜#38)×12露光＝156工程 ＋ 非露光54工程 ＝ ぴったり210工程（累計700工程！）</text>
      `,
      cards: [
        { label: '1工程も欠落なし', line1: '4-A(22)+4-B(22)+4-C(90)', line2: '+4-D(44)+4-E(32)＝210工程完全整合', accent: '#d97706' },
        { label: '物理製造順を忠実再現', line1: '下層のW釘からM1→M5→Al→', line2: '最上階Cu-Cu接合面まで一気通貫', accent: '#ea580c' },
        { label: '画素ウェーハ完全完成', line1: 'ここを終えると累計700工程達成', line2: '第6巻ロジック(720工程)へ合流！', accent: '#059669' },
      ],
    }),

  fab5_p001_cesl_sin_stopper: () =>
    wrapFab3HdSvg({
      badge: 'F5-03',
      stepTag: 'P04-001 [業界標準]',
      title: 'コンタクトエッチストップ膜（CESL：SiN 30〜50nm）成膜',
      analogy: '穴掘りのとき「ここで止まれ！」と教えるブレーキシート兼・水素閉じ込め蓋',
      accent: '#6366f1',
      accentSoft: '#eef2ff',
      body: `
        ${drawCompareFrame(26, 84, 336, 248, '✅ CESLあり：30〜50nm SiNが貫通を防止！', '#059669', '#f0fdf4')}
        <rect x="46" y="130" width="296" height="82" fill="#bae6fd" fill-opacity="0.7"/>
        <text x="194" y="156" text-anchor="middle" font-size="9.6" font-weight="800" fill="#075985">上層PMDガラス（後の穴掘り対象）</text>
        <!-- Drill stops right on CESL! -->
        <rect x="112" y="130" width="24" height="82" fill="#ffffff" stroke="#0284c7" stroke-dasharray="3 2"/>
        <rect x="252" y="130" width="24" height="62" fill="#ffffff" stroke="#0284c7" stroke-dasharray="3 2"/>
        <!-- Conformal Violet CESL Blanket -->
        <path d="M 46,220 L 218,220 L 218,194 L 304,194 L 304,220 L 342,220 L 342,232 L 292,232 L 292,206 L 230,206 L 230,232 L 46,232 Z" fill="#6366f1"/>
        <rect x="230" y="206" width="62" height="28" fill="#1e293b"/>
        <rect x="46" y="232" width="296" height="50" fill="#475569"/>
        <text x="194" y="262" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fde047">✨ 浅いゲート上も深いS/D上もSiNで一旦停止!</text>
        ${drawPill(78, 294, 232, '低温≦400℃ PECVD＋水素封じ', true)}

        ${drawCompareFrame(378, 84, 316, 248, '❌ ストッパーなし：浅いゲートを突き破る！', '#e11d48', '#fff1f2')}
        <rect x="398" y="130" width="276" height="96" fill="#bae6fd" fill-opacity="0.6"/>
        <rect x="556" y="200" width="66" height="32" fill="#1e293b"/>
        <rect x="398" y="226" width="276" height="56" fill="#475569"/>
        <!-- Over-etched hole punching right through the gate! -->
        <rect x="578" y="130" width="22" height="128" fill="#e11d48"/>
        <text x="536" y="272" text-anchor="middle" font-size="9.8" font-weight="900" fill="#fecdd3">💥 トランジスタ貫通→画素死亡!</text>
        ${drawPill(424, 294, 224, 'AMAT / TEL PECVD 30〜50nm', false)}
      `,
      cards: [
        { label: 'ブレーキ役の秘密', line1: 'SiO₂とSiNの削れやすさの差を利用', line2: '深さ違いの穴を全員CESLで足止め', accent: '#6366f1' },
        { label: '低温≦400℃の鉄則', line1: 'AMAT/TEL PECVDで30〜50nm成膜', line2: '下層のNiSiやP+蓋を熱破壊しない', accent: '#0284c7' },
        { label: '水素パッシベーション', line1: 'SiN膜が水素のフタ兼供給源となり', line2: '暗電流ノイズを抑える隠れた功績', accent: '#059669' },
      ],
    }),

  fab5_p002_pmd_bpsg_cmp: () =>
    wrapFab3HdSvg({
      badge: 'F5-04',
      stepTag: 'P04-002〜004 [標準]',
      title: 'PMD層間絶縁膜（BPSG/USG 500〜800nm）成膜＆鏡面CMP',
      analogy: '凸凹の地面を厚い透明ガラス床で埋め尽くし、CMPで鏡のように平らに磨き上げる',
      accent: '#0ea5e9',
      accentSoft: '#f0f9ff',
      body: `
        ${drawCompareFrame(26, 84, 326, 248, '① 成膜直後：ゲートの凸凹が表面にうねる', '#d97706', '#fffbeb')}
        <rect x="46" y="232" width="286" height="48" fill="#475569"/>
        <rect x="96" y="198" width="44" height="34" fill="#1e293b"/>
        <rect x="234" y="198" width="44" height="34" fill="#1e293b"/>
        <!-- Bumpy PMD Surface -->
        <path d="M 46,162 Q 118,128 164,162 Q 190,174 216,162 Q 256,128 332,162 L 332,232 L 46,232 Z" fill="#7dd3fc" fill-opacity="0.78" stroke="#0284c7" stroke-width="1.5"/>
        <text x="189" y="186" text-anchor="middle" font-size="9.6" font-weight="800" fill="#92400e">BPSG/USG 500〜800nm（HDP/FCVD）</text>
        ${drawPill(78, 294, 222, 'このまま露光するとピントボケ!', false)}

        ${drawCompareFrame(368, 84, 326, 248, '② PMD-CMP後：平坦度数nmの完璧な鏡面床！', '#059669', '#ecfdf5')}
        <rect x="388" y="232" width="286" height="48" fill="#475569"/>
        <rect x="438" y="198" width="44" height="34" fill="#1e293b"/>
        <rect x="576" y="198" width="44" height="34" fill="#1e293b"/>
        <rect x="388" y="156" width="286" height="76" fill="#7dd3fc" fill-opacity="0.82" stroke="#0284c7" stroke-width="1.5"/>
        <line x1="382" y1="156" x2="680" y2="156" stroke="#059669" stroke-width="2.6"/>
        <text x="531" y="142" text-anchor="middle" font-size="10" font-weight="900" fill="#065f46">✨ 荏原 / AMAT CMPで鏡面平坦（数nm）!</text>
        ${drawPill(416, 294, 230, '80–120nm極細穴の露光ピント完璧', true)}
      `,
      cards: [
        { label: '1階のコンクリート床', line1: 'HDP-CVD/FCVDでボイドゼロ埋込', line2: 'BPSG/USG 500〜800nm＋緻密化', accent: '#0ea5e9' },
        { label: '鏡面CMP研磨', line1: '荏原製作所 / AMAT CMP装置', line2: 'FEOLの段差を平坦度数nmへリセット', accent: '#059669' },
        { label: '写真への影響', line1: '凸凹が残ると次のコンタクト露光が', line2: 'ピントボケし穴が開かず画素死亡', accent: '#e11d48' },
      ],
    }),

  fab5_p005_pmd_clean_metro: () =>
    wrapFab3HdSvg({
      badge: 'F5-05',
      stepTag: 'P04-005〜006 [標準]',
      title: 'PMDポストCMP超洗浄＆光学膜厚均一性計測（±2%以内）',
      analogy: '研磨カスを完全洗浄し、光の定規で300mm全面の床厚が±2%均一か全数検査',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <rect x="26" y="84" width="326" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="189" y="106" text-anchor="middle" font-size="11" font-weight="800" fill="#075985">🔬 KLA光学膜厚計：非接触レーザー干渉測定</text>
        <rect x="128" y="122" width="122" height="28" rx="6" fill="#0f172a"/>
        <text x="189" y="140" text-anchor="middle" font-size="9.4" font-weight="800" fill="#38bdf8">分光エリプソメータ</text>
        <line x1="158" y1="152" x2="189" y2="210" stroke="#e11d48" stroke-width="2.4" marker-end="url(#f505-arrRed)"/>
        <line x1="189" y1="210" x2="220" y2="152" stroke="#16a34a" stroke-width="2.4" marker-end="url(#f505-arrGreen)"/>
        <rect x="52" y="210" width="274" height="44" fill="#7dd3fc" stroke="#0284c7"/>
        <text x="189" y="236" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">PMD残膜厚（均一性 ±2%以内！）</text>
        <rect x="52" y="254" width="274" height="42" fill="#475569"/>
        <text x="189" y="316" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0369a1">SCREEN洗浄機でスラリー粒子を完全洗い流し</text>

        ${drawKpiBox(372, 84, 322, 82, '全面残膜均一性＆APC連携', '±2% 以内（KLA光学膜厚計）', '測定結果を次工程エッチャー秒数へ自動補正', '#0284c7')}
        ${drawCompareFrame(372, 180, 322, 152, '残膜厚が厚すぎる・スラリーが残ると？', '#e11d48', '#fff1f2')}
        <text x="533" y="228" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">次のコンタクト穴掘りが底まで届かず</text>
        <text x="533" y="246" text-anchor="middle" font-size="10.2" font-weight="900" fill="#be123c">オープン不良（真っ黒な死んだ画素）!</text>
        ${drawPill(418, 278, 230, '±2%均一＋無粒子で100%開通', true)}
      `,
      cards: [
        { label: 'ポストCMP洗浄', line1: 'SCREEN洗浄機で研磨スラリー除去', line2: '微小粒子による穴詰まりを防止', accent: '#0284c7' },
        { label: '光学膜厚マッピング', line1: 'KLA光学膜厚計で全面±2%以内保証', line2: '次工程エッチ時間を1枚毎自動調整', accent: '#059669' },
        { label: '失敗すると写真に？', line1: '残膜が厚すぎるとコンタクト未貫通', line2: '信号が断線しデッドピクセル発生', accent: '#e11d48' },
      ],
    }),

  fab5_m26_contact_hole_etch: () =>
    wrapFab3HdSvg({
      badge: 'F5-06',
      stepTag: 'Mask #26 / 80–120nm',
      title: '【Mask #26】コンタクトホール露光＆2段階ソフト開孔エッチング',
      analogy: '直径80〜120nmの極細穴を掘り、まずCESLで一旦止め優しく抜いてFD白キズを防ぐ！',
      accent: '#2563eb',
      accentSoft: '#eff6ff',
      body: `
        ${drawCompareFrame(26, 84, 386, 248, '✅ 2段階エッチング：FDシリコンへのプラズマ傷ゼロ！', '#2563eb', '#eff6ff')}
        <!-- Left Hole (Gate) & Right Hole (FD) -->
        <rect x="46" y="132" width="346" height="104" fill="#7dd3fc"/>
        <!-- Carved Vertical 80-120nm Holes -->
        <rect x="116" y="132" width="28" height="72" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
        <rect x="278" y="132" width="28" height="104" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
        <!-- Gate + CESL + FD -->
        <rect x="92" y="204" width="76" height="32" fill="#1e293b"/>
        <rect x="46" y="236" width="346" height="56" fill="#475569"/>
        <rect x="248" y="236" width="88" height="28" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="1.6"/>
        <text x="130" y="224" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">ゲート</text>
        <text x="292" y="254" text-anchor="middle" font-size="9.4" font-weight="900" fill="#92400e">計量カップFD</text>
        <text x="219" y="156" text-anchor="middle" font-size="9.6" font-weight="800" fill="#1e40af">穴径 80〜120nm × 深さ 400〜600nm</text>
        <text x="219" y="280" text-anchor="middle" font-size="9.4" font-weight="800" fill="#fde047">①CESL上で一旦停止 → ②低ダメージ条件で優しく抜く！</text>
        ${drawPill(88, 298, 262, 'KrF/ArF＋TEL/ラム誘電体エッチャー', true)}

        ${drawCompareFrame(428, 84, 266, 248, '⚠️ FD直上の傷＝致命的白キズ！', '#e11d48', '#fff1f2')}
        <rect x="454" y="138" width="214" height="68" rx="8" fill="#0f172a"/>
        <circle cx="512" cy="172" r="4.5" fill="#ffffff"/>
        <circle cx="586" cy="162" r="5" fill="#fb7185"/>
        <circle cx="634" cy="184" r="3.5" fill="#ffffff"/>
        <text x="561" y="228" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">FDの上の穴掘りでSiに傷が付くと</text>
        <text x="561" y="246" text-anchor="middle" font-size="10.2" font-weight="900" fill="#be123c">暗電流激増 → 永遠の白キズ!</text>
        ${drawPill(456, 282, 210, '2段階ソフト開孔がCISの命', false)}
      `,
      cards: [
        { label: '極細の釘穴加工', line1: '穴径80〜120nm × 深さ400〜600nm', line2: '高アスペクト比で垂直に掘り抜く', accent: '#2563eb' },
        { label: '2段階エッチの妙技', line1: '浅いゲートと深いFDをCESLで一旦止め', line2: '低ダメージガスで優しく最終開孔', accent: '#059669' },
        { label: '写真への影響', line1: 'FDシリコンへのプラズマ傷を防ぎ', line2: '夜景の白キズ(ホットピクセル)根絶', accent: '#e11d48' },
      ],
    }),

  fab5_p019_titin_w_cvd_nail: () =>
    wrapFab3HdSvg({
      badge: 'F5-07',
      stepTag: 'P04-019〜020 W釘',
      title: 'Ti/TiN鎧＋タングステン（W）CVD釘埋め込み（銅の毒を遮断！）',
      analogy: '銅はシリコンの天敵！ 1階の釘には拡散しない安全なタングステン（W）を使う',
      accent: '#475569',
      accentSoft: '#f1f5f9',
      body: `
        <!-- Left: Why Tungsten (Not Copper) on Floor 1? -->
        ${drawCompareFrame(26, 84, 344, 248, '🛡 なぜ1階は銅(Cu)でなくタングステン(W)？', '#475569', '#f8fafc')}
        <rect x="46" y="130" width="304" height="104" fill="#bae6fd"/>
        <!-- Left Nail: W-Plug with Ti/TiN Armor -->
        <rect x="108" y="130" width="44" height="104" fill="#f59e0b"/>
        <rect x="116" y="130" width="28" height="96" fill="#64748b"/>
        <text x="130" y="182" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">W</text>
        <!-- Right Nail: W-Plug with Ti/TiN Armor -->
        <rect x="242" y="130" width="44" height="104" fill="#f59e0b"/>
        <rect x="250" y="130" width="28" height="96" fill="#64748b"/>
        <text x="264" y="182" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">W</text>
        <rect x="46" y="234" width="304" height="48" fill="#334155"/>
        <text x="198" y="262" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fde047">Ti/TiN鎧(5–15nm)：WF₆のフッ素からSiを守る!</text>
        ${drawPill(78, 294, 240, 'タングステン＝シリコンへの安全クッション', true)}

        <!-- Right: WF6 CVD Reaction & Seam Risk -->
        ${drawKpiBox(388, 84, 306, 78, 'W-CVD 化学気相成長', 'WF₆ ＋ 3H₂ → W ＋ 6HF↑', 'AMAT/ULVAC Ti/TiN ＋ AMAT/ラム W-CVD (350–420℃)', '#475569')}
        ${drawCompareFrame(388, 174, 306, 158, '❌ 鎧に隙間・釘に空洞(シーム)があると', '#e11d48', '#fff1f2')}
        <text x="541" y="220" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">1. TiNの隙間からWF₆のフッ素が</text>
        <text x="541" y="236" text-anchor="middle" font-size="9.4" font-weight="700" fill="#be123c">シリコンを食い荒らし致命的欠陥に！</text>
        <text x="541" y="258" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">2. 穴の中心に空洞(シーム)が残ると</text>
        <text x="541" y="274" text-anchor="middle" font-size="9.4" font-weight="700" fill="#be123c">配線抵抗が急増し読出不良が発生！</text>
        ${drawPill(434, 294, 214, '隙間ゼロ充填で1階柱を確立', true)}
      `,
      cards: [
        { label: 'なぜ1階はタングステン？', line1: '銅が数原子でもPDへ落ちると白キズ!', line2: '拡散しにくいWを安全な緩衝柱に採用', accent: '#475569' },
        { label: 'Ti/TiN鎧の役割', line1: 'Tiで密着しTiN(5–15nm)でWF₆の', line2: '強烈なフッ素からシリコンを防護', accent: '#d97706' },
        { label: '主要装置・温度', line1: 'AMAT/ULVAC PVD・ALD＋W-CVD', line2: '350〜420℃低温で極細穴へ完全充填', accent: '#0284c7' },
      ],
    }),

  fab5_p021_w_cmp_inspect: () =>
    wrapFab3HdSvg({
      badge: 'F5-08',
      stepTag: 'P04-021〜022 4-A完了',
      title: 'タングステンCMP研磨・洗浄＆検査（数億本の独立した釘完成）',
      analogy: 'あふれた金属板をCMPやすりで削り落とし、穴の中だけに独立した数億本の釘を残す！',
      accent: '#059669',
      accentSoft: '#ecfdf5',
      body: `
        ${drawCompareFrame(26, 84, 324, 248, '① W-CVD直後：あふれたW膜で全部繋がった状態', '#64748b', '#f8fafc')}
        <rect x="46" y="138" width="284" height="30" fill="#64748b" stroke="#1e293b"/>
        <text x="188" y="157" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">全面にあふれた余剰タングステン</text>
        <rect x="46" y="168" width="284" height="106" fill="#bae6fd"/>
        ${[96, 158, 220, 282].map((x) => `<rect x="${x - 12}" y="168" width="24" height="106" fill="#64748b"/>`).join('')}
        ${drawPill(78, 294, 220, 'まだ全プラグがショート状態', false)}

        ${drawCompareFrame(368, 84, 326, 248, '② W-CMP後：独立した数億本の釘だけ残存！', '#059669', '#ecfdf5')}
        <rect x="388" y="168" width="286" height="106" fill="#bae6fd"/>
        ${[438, 500, 562, 624].map((x) => `<rect x="${x - 12}" y="168" width="24" height="106" fill="#64748b" stroke="#0f172a"/>`).join('')}
        <line x1="380" y1="168" x2="682" y2="168" stroke="#059669" stroke-width="2.6"/>
        <text x="531" y="148" text-anchor="middle" font-size="9.8" font-weight="900" fill="#065f46">✨ 荏原/AMAT CMP＋FUJIMI/レゾナックスラリー</text>
        <text x="531" y="286" text-anchor="middle" font-size="9" font-weight="700" fill="#047857">研磨残り1か所＝隣とショート！ KLAで全数検査</text>
        ${drawPill(418, 296, 226, 'ブロック4-A（22工程）完走！', true)}
      `,
      cards: [
        { label: '数億本の釘を独立化', line1: '余剰W層を完全に削り落とし', line2: '穴内だけに独立プラグを残すCMP', accent: '#059669' },
        { label: '主要装置・スラリー', line1: '荏原/AMAT CMP＋KLA欠陥検査', line2: 'FUJIMI / レゾナック製Wスラリー', accent: '#0284c7' },
        { label: '失敗すると写真に？', line1: '研磨残りが1か所でもあると隣と', line2: 'ショートし画素や1列が線欠陥に', accent: '#e11d48' },
      ],
    }),

  fab5_p023_m1_sicn_lowk: () =>
    wrapFab3HdSvg({
      badge: 'F5-09',
      stepTag: 'P04-023〜025 Low-k',
      title: 'M1用SiCN拡散防止膜＋Low-k層間絶縁膜（SiOC k≈2.7〜3.0）成膜',
      analogy: '銅の毒を止める床シートの上に、信号が鈍らないスカスカ軽量ガラス（Low-k）を敷く',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        ${drawCompareFrame(26, 84, 336, 248, '従来のSiO₂（k ≈ 4.0）vs Low-k SiOC（k ≈ 2.7–3.0）', '#0284c7', '#f0f9ff')}
        <!-- Left: Dense SiO2 high capacitance -->
        <rect x="44" y="132" width="142" height="142" rx="8" fill="#fff1f2" stroke="#e11d48"/>
        <text x="115" y="152" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">従来 SiO₂ (k≈4.0)</text>
        <rect x="60" y="176" width="28" height="60" fill="#ea580c"/>
        <rect x="142" y="176" width="28" height="60" fill="#ea580c"/>
        <text x="115" y="210" text-anchor="middle" font-size="9" font-weight="900" fill="#be123c">⚡容量大!</text>
        <text x="115" y="260" text-anchor="middle" font-size="8.6" font-weight="700" fill="#9f1239">信号鈍り＆発熱増</text>

        <!-- Right: Low-k SiOC low capacitance -->
        <rect x="202" y="132" width="142" height="142" rx="8" fill="#ecfdf5" stroke="#059669"/>
        <text x="273" y="152" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">Low-k SiOC (2.7–3.0)</text>
        <rect x="218" y="176" width="28" height="60" fill="#ea580c"/>
        <rect x="300" y="176" width="28" height="60" fill="#ea580c"/>
        <text x="273" y="210" text-anchor="middle" font-size="9" font-weight="900" fill="#059669">💨軽量高速!</text>
        <text x="273" y="260" text-anchor="middle" font-size="8.6" font-weight="700" fill="#047857">容量約30%カット!</text>
        ${drawPill(78, 294, 232, '高速連写の省電力＆低遅延に直結', true)}

        <!-- Right: 2-Layer Stack -->
        <rect x="380" y="84" width="314" height="248" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
        <text x="537" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">📐 M1下地 2層成膜構造（PECVD）</text>
        <rect x="404" y="130" width="266" height="82" rx="6" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="537" y="166" text-anchor="middle" font-size="10.6" font-weight="900" fill="#075985">Low-k SiOC 層間絶縁膜</text>
        <text x="537" y="186" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0369a1">厚さ 150〜250 nm / k ≈ 2.7〜3.0</text>
        <rect x="404" y="216" width="266" height="32" rx="4" fill="#7c3aed"/>
        <text x="537" y="236" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">SiCN 拡散防止＆エッチストップ（約30nm）</text>
        <rect x="404" y="252" width="266" height="44" rx="4" fill="#475569"/>
        <text x="537" y="278" text-anchor="middle" font-size="9.4" font-weight="800" fill="#e2e8f0">1階 PMD ＋ タングステン釘の上面</text>
      `,
      cards: [
        { label: 'Low-k膜のメリット', line1: 'SiOC骨格の空隙で比誘電率k≈2.7–3.0', line2: '配線間容量を減らし信号の鈍りを防止', accent: '#0284c7' },
        { label: 'SiCNエッチストップ', line1: '約30nmのSiCNが銅の拡散を遮断し', line2: 'M1溝掘りの深さをピタリと制御', accent: '#7c3aed' },
        { label: '主要装置・膜厚', line1: 'AMAT / TEL / ラム PECVD装置', line2: '膜厚150〜250nm・計測まで3工程', accent: '#059669' },
      ],
    }),

  fab5_m27_m1_single_damascene: () =>
    wrapFab3HdSvg({
      badge: 'F5-10',
      stepTag: 'Mask #27 / 90–140nm',
      title: '【Mask #27】M1第1銅配線トレンチ加工（ダマシン法の溝彫り！）',
      analogy: '削れない銅は「先にガラスへ道路の溝を掘ってから流し込む」伝統工芸・象嵌の逆転発想',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <!-- 4-Step Damascene Visual Comic Strip! -->
        <rect x="26" y="84" width="668" height="122" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <text x="360" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9a3412">🎨 初心者でも一発でわかる「銅ダマシン（象嵌）法」逆転の4ステップ！</text>
        ${[
          { x: 42, n: '① 溝彫り (本工程!)', s: 'ガラスに道路の溝を彫る', hi: true },
          { x: 204, n: '② バリア壁紙', s: 'TaN/Taで銅毒を封鎖', hi: false },
          { x: 366, n: '③ 銅めっき満杯', s: '底から銅を流し込む', hi: false },
          { x: 528, n: '④ CMPやすり削り', s: '余剰銅を削り道路完成', hi: false },
        ]
          .map(
            (st, idx) => `
          <rect x="${st.x}" y="120" width="146" height="72" rx="8" fill="${st.hi ? '#ea580c' : '#ffffff'}" stroke="#ea580c" stroke-width="${st.hi ? 2 : 1.3}"/>
          <text x="${st.x + 73}" y="148" text-anchor="middle" font-size="10" font-weight="900" fill="${st.hi ? '#ffffff' : '#9a3412'}">${st.n}</text>
          <text x="${st.x + 73}" y="172" text-anchor="middle" font-size="9" font-weight="700" fill="${st.hi ? '#ffedd5' : '#475569'}">${st.s}</text>
          ${idx < 3 ? `<line x1="${st.x + 148}" y1="156" x2="${st.x + 160}" y2="156" stroke="#ea580c" stroke-width="2.4" marker-end="url(#f510-arrAmber)"/>` : ''}`
          )
          .join('')}

        <!-- Bottom: Cross-Section showing M1 Trenches Landing on W Nails -->
        <rect x="26" y="218" width="668" height="114" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>
        <text x="42" y="238" font-size="10.4" font-weight="800" fill="#0f172a">📐 M1トレンチ断面：最小幅/間隔 90〜140nm（転送ゲート線・FD〜増幅Tr接続の1階道路）</text>
        <rect x="46" y="250" width="90" height="46" fill="#7dd3fc"/>
        <rect x="206" y="250" width="110" height="46" fill="#7dd3fc"/>
        <rect x="386" y="250" width="90" height="46" fill="#7dd3fc"/>
        <!-- Exposed W Nail Heads at Trench Bottoms -->
        <rect x="156" y="296" width="30" height="28" fill="#64748b"/>
        <rect x="336" y="296" width="30" height="28" fill="#64748b"/>
        <rect x="46" y="296" width="110" height="28" fill="#cbd5e1"/>
        <rect x="186" y="296" width="150" height="28" fill="#cbd5e1"/>
        <rect x="366" y="296" width="110" height="28" fill="#cbd5e1"/>
        <text x="171" y="280" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ea580c">W釘露出!</text>
        <text x="351" y="280" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ea580c">W釘露出!</text>
        <rect x="496" y="248" width="184" height="72" rx="8" fill="#fff1f2" stroke="#e11d48"/>
        <text x="588" y="272" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">❌ 底にポリマーかす残存</text>
        <text x="588" y="292" text-anchor="middle" font-size="9" font-weight="700" fill="#9f1239">接触不良→画素が真っ黒</text>
        <text x="588" y="308" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">(デッドピクセル発生!)</text>
      `,
      cards: [
        { label: 'なぜダマシン法？', line1: '銅はアルミと違いプラズマ蒸発不可', line2: '溝彫り→埋込→研磨の象嵌技を採用', accent: '#ea580c' },
        { label: 'M1ローカル配線の役割', line1: 'TG線・FD〜増幅Trなど最密集の1階', line2: '最小幅/間隔 90〜140nm [業界標準]', accent: '#0284c7' },
        { label: '底面クリーン洗浄', line1: '溝底のW釘頭にポリマー残渣ゼロで', line2: '接触不良(デッドピクセル)を防止', accent: '#e11d48' },
      ],
    }),

  fab5_p038_tantal_barrier_seed: () =>
    wrapFab3HdSvg({
      badge: 'F5-11',
      stepTag: '★P04-038–39 白キズ防衛',
      title: 'TaN/Ta銅毒バリア（5〜10nm）＆Cuシード超高真空連続スパッタ',
      analogy: '銅原子が1個でもPDへ落ちると白キズ地獄！ 溝の壁すべてに5〜10nmの防毒壁紙を貼る',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        ${drawCompareFrame(26, 84, 344, 248, '✅ 絶対防衛線：TaN/Ta 5–10nm バリア＋Cuシード', '#7c3aed', '#f5f3ff')}
        <!-- Trench Walls Zoom -->
        <rect x="46" y="132" width="304" height="146" fill="#bae6fd"/>
        <!-- U-shaped TaN/Ta Violet Armor -->
        <path d="M 104,132 L 104,248 L 292,248 L 292,132 L 274,132 L 274,230 L 122,230 L 122,132 Z" fill="#7c3aed" stroke="#4c1d95" stroke-width="1.4"/>
        <!-- Inner Cu Seed Layer (30-50nm) -->
        <path d="M 122,132 L 122,230 L 274,230 L 274,132 L 258,132 L 258,214 L 138,214 L 138,132 Z" fill="#ea580c"/>
        <text x="198" y="166" text-anchor="middle" font-size="10.2" font-weight="900" fill="#9a3412">めっきの種：Cuシード</text>
        <text x="198" y="182" text-anchor="middle" font-size="9.2" font-weight="700" fill="#c2410c">(30〜50 nm 連続PVD)</text>
        <text x="198" y="266" text-anchor="middle" font-size="9.6" font-weight="900" fill="#5b21b6">🛡 TaN(防毒壁)＋Ta(密着) 5〜10nm!</text>
        ${drawPill(78, 294, 240, 'AMAT Endura / ULVAC ＋ JX金属製ターゲット', true)}

        ${drawCompareFrame(386, 84, 308, 248, '❌ バリアにたった1か所でも穴があると…', '#e11d48', '#fff1f2')}
        <rect x="408" y="130" width="264" height="62" fill="#ea580c"/>
        <text x="540" y="166" text-anchor="middle" font-size="10.4" font-weight="900" fill="#ffffff">銅（Cu）配線</text>
        <!-- Broken Barrier with Pinhole -->
        <rect x="408" y="192" width="116" height="14" fill="#7c3aed"/>
        <rect x="556" y="192" width="116" height="14" fill="#7c3aed"/>
        <line x1="540" y1="184" x2="540" y2="256" stroke="#e11d48" stroke-width="3.6" marker-end="url(#f511-arrRed)"/>
        <rect x="408" y="248" width="264" height="36" fill="#0f172a"/>
        <circle cx="540" cy="266" r="6" fill="#ffffff" stroke="#fb7185" stroke-width="2"/>
        <text x="540" y="236" text-anchor="middle" font-size="9.6" font-weight="900" fill="#be123c">💀 銅原子がPDへ落下→致命的白キズ!</text>
        ${drawPill(430, 294, 220, '超高真空連続成膜で穴ゼロ保証', false)}
      `,
      cards: [
        { label: '白キズ防止の防衛線', line1: 'TaN/Ta(5–10nm)が銅原子の拡散を', line2: '1個残らずブロックしPDを完全防護', accent: '#7c3aed' },
        { label: '超高真空連続PVD', line1: 'AMAT Endura / ULVACスパッタ', line2: '空気に触れずTaN/Ta→Cuシード連続', accent: '#0284c7' },
        { label: '日本発の超高純度材料', line1: 'JX金属製 高純度Cu/Taターゲット', line2: '溝底まで均一被覆するイオン化PVD', accent: '#ea580c' },
      ],
    }),

  fab5_p040_cu_ecd_superfill: () =>
    wrapFab3HdSvg({
      badge: 'F5-12',
      stepTag: '★P04-040–41 スーパーフィル',
      title: '銅電解めっき（ECDスーパーフィリング）＆結晶粒成長アニール',
      analogy: '「入口にブレーキ・底にアクセル」の添加剤魔法で、溝の底から銅を湧き上げ気泡ゼロ充填！',
      accent: '#f97316',
      accentSoft: '#fff7ed',
      body: `
        ${drawCompareFrame(26, 84, 336, 248, '✅ 魔法のボトムアップ（底上げ）スーパーフィリング！', '#059669', '#ecfdf5')}
        <!-- Trench with Inhibitor at Top and Accelerator at Bottom -->
        <rect x="52" y="138" width="72" height="136" fill="#bae6fd"/>
        <rect x="264" y="138" width="72" height="136" fill="#bae6fd"/>
        <!-- Suppressor (Brake) at Top Corners -->
        <rect x="46" y="128" width="84" height="14" rx="6" fill="#0284c7"/>
        <rect x="258" y="128" width="84" height="14" rx="6" fill="#0284c7"/>
        <text x="194" y="124" text-anchor="middle" font-size="9" font-weight="800" fill="#0369a1">🛑 入口ブレーキ（抑制剤）</text>
        <!-- Bottom-Up Rising Copper Dome -->
        <path d="M 124,274 L 124,200 Q 194,160 264,200 L 264,274 Z" fill="#ea580c" stroke="#9a3412" stroke-width="1.6"/>
        <line x1="194" y1="258" x2="194" y2="178" stroke="#fde047" stroke-width="3.4" marker-end="url(#f512-arrAmber)"/>
        <text x="194" y="242" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">🚀 底アクセル（促進剤）</text>
        <text x="194" y="258" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffedd5">下から湧き上がり気泡ゼロ!</text>
        ${drawPill(78, 294, 232, '荏原(FREX) / ラム(SABRE) ECD装置', true)}

        <!-- Right: 150-250°C Grain Growth Anneal & Electromigration Prevention -->
        <rect x="378" y="84" width="316" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <text x="536" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#9a3412">🔥 150〜250℃ N₂/H₂ 結晶粒成長アニール</text>
        <!-- Fine grains -> Large Bamboo Grains -->
        <rect x="396" y="124" width="124" height="72" rx="6" fill="#fed7aa" stroke="#ea580c"/>
        <text x="458" y="144" text-anchor="middle" font-size="9.2" font-weight="800" fill="#9a3412">めっき直後(小粒)</text>
        <text x="458" y="166" text-anchor="middle" font-size="8.6" font-weight="700" fill="#7c2d12">粒界が多く抵抗大</text>
        <text x="458" y="182" text-anchor="middle" font-size="8.6" font-weight="700" fill="#be123c">断線(EM)しやすい</text>
        <line x1="524" y1="160" x2="548" y2="160" stroke="#ea580c" stroke-width="2.6" marker-end="url(#f512-arrAmber)"/>
        <rect x="552" y="124" width="124" height="72" rx="6" fill="#dcfce7" stroke="#059669" stroke-width="1.6"/>
        <text x="614" y="144" text-anchor="middle" font-size="9.2" font-weight="800" fill="#065f46">焼成後(大結晶!)</text>
        <text x="614" y="166" text-anchor="middle" font-size="8.6" font-weight="700" fill="#047857">結晶粒が大きく合体</text>
        <text x="614" y="182" text-anchor="middle" font-size="8.6" font-weight="800" fill="#059669">低抵抗＆超長寿命!</text>
        <rect x="396" y="210" width="280" height="68" rx="8" fill="#fff1f2" stroke="#e11d48"/>
        <text x="536" y="232" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">❌ 空洞(ボイド)・焼成不足の恐怖</text>
        <text x="536" y="252" text-anchor="middle" font-size="9" font-weight="700" fill="#9f1239">大電流の電子風で銅原子が吹き飛び</text>
        <text x="536" y="268" text-anchor="middle" font-size="9" font-weight="800" fill="#881337">使用中に断線（エレクトロマイグレーション）</text>
        ${drawPill(430, 294, 212, '10年酷使に耐える堅牢銅配線', true)}
      `,
      cards: [
        { label: 'スーパーフィリング', line1: '抑制剤・促進剤の絶妙な化学魔法で', line2: '狭い溝の底から優先成長→ボイド0', accent: '#f97316' },
        { label: '主要装置・温度', line1: '荏原(FREX) / ラム(SABRE)めっき', line2: '150〜250℃ N₂/H₂結晶粒アニール', accent: '#0284c7' },
        { label: '信頼性の確保', line1: '大結晶化で電気抵抗を下げつつ', line2: 'エレクトロマイグレーション断線防止', accent: '#059669' },
      ],
    }),

  fab5_p042_cu_2stage_cmp_bta: () =>
    wrapFab3HdSvg({
      badge: 'F5-13',
      stepTag: 'P04-042〜044 4-B完了',
      title: '2段階銅CMP研磨・BTA防錆洗浄＆シート抵抗検査（M1開通！）',
      analogy: '1段目で余剰銅を削り、2段目でバリア膜を仕上げ削り、即BTA防錆で銅のサビを封じる',
      accent: '#059669',
      accentSoft: '#ecfdf5',
      body: `
        <!-- Stage 1 -> Stage 2 -> BTA Clean & Dishing Warning -->
        <rect x="26" y="84" width="212" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.4"/>
        <text x="132" y="106" text-anchor="middle" font-size="10.4" font-weight="800" fill="#9a3412">① 第1研磨：余剰銅除去</text>
        <rect x="44" y="154" width="176" height="22" fill="#ea580c" fill-opacity="0.35" stroke="#ea580c" stroke-dasharray="4 2"/>
        <rect x="44" y="176" width="176" height="10" fill="#7c3aed"/>
        <rect x="44" y="186" width="176" height="66" fill="#bae6fd"/>
        <rect x="70" y="186" width="44" height="44" fill="#ea580c"/>
        <rect x="150" y="186" width="44" height="44" fill="#ea580c"/>
        <text x="132" y="276" text-anchor="middle" font-size="9.2" font-weight="800" fill="#c2410c">柔らかいスラリーでバリア手前</text>
        <text x="132" y="294" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">光学・渦電流センサーで寸止め</text>

        <rect x="254" y="84" width="212" height="248" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
        <text x="360" y="106" text-anchor="middle" font-size="10.4" font-weight="800" fill="#065f46">② 第2研磨＋BTA防錆</text>
        <rect x="272" y="186" width="176" height="66" fill="#bae6fd"/>
        <rect x="298" y="186" width="44" height="44" fill="#ea580c" stroke="#7c3aed" stroke-width="1.6"/>
        <rect x="378" y="186" width="44" height="44" fill="#ea580c" stroke="#7c3aed" stroke-width="1.6"/>
        <line x1="266" y1="186" x2="454" y2="186" stroke="#059669" stroke-width="2.6"/>
        <text x="360" y="162" text-anchor="middle" font-size="9.6" font-weight="900" fill="#059669">🛡 BTA防錆膜で銅サビ遮断!</text>
        <text x="360" y="276" text-anchor="middle" font-size="9.2" font-weight="800" fill="#065f46">TaN/Taを削り独立M1完成！</text>
        ${drawPill(276, 294, 168, 'ブロック4-B(22工程)完了', true)}

        ${drawCompareFrame(482, 84, 212, 248, '⚠️ 3大CMP不良に厳戒態勢', '#e11d48', '#fff1f2')}
        <text x="588" y="140" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">1. 削りすぎ（ディッシング）</text>
        <text x="588" y="156" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">太い銅線が皿状に凹み抵抗増</text>
        <text x="588" y="190" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">2. 削り残し（銅残渣）</text>
        <text x="588" y="206" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">隣の配線と接触し即ショート</text>
        <text x="588" y="240" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">3. サビ・微細スクラッチ</text>
        <text x="588" y="256" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">将来の断線を引き起こす元凶</text>
        ${drawPill(500, 294, 176, 'FUJIMI/富士フイルム＋KLA', true)}
      `,
      cards: [
        { label: '2段階スラリー戦略', line1: '①余剰Cu高速除去→②バリア平坦仕上', line2: '光学・渦電流センサーで自動終点検出', accent: '#059669' },
        { label: 'BTA防錆＆検査', line1: 'SCREENクリーナーで即BTA防錆処理', line2: 'KLAでスクラッチ0＆シート抵抗検査', accent: '#0284c7' },
        { label: 'M1開通→多層階へ', line1: 'ブロック4-B（22工程）完了！', line2: '次はM2〜M4デュアルダマシン90工程', accent: '#ea580c' },
      ],
    }),
};
