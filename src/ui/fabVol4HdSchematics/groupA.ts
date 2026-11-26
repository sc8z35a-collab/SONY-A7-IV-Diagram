import { wrapFab3HdSvg, drawCompareFrame, drawKpiBox, drawPill, drawPin } from '../fabVol3HdSchematics/shared';

/**
 * Vol.4 Ultra-HD 720x470 Beginner-Visual Posters — Group A (F4-01 – F4-14):
 * Hero 4T-PPD Pixel Heart, Stepped Terrace Map, Block 3-A (P03-001–058), Block 3-B (P03-059–084).
 */
export const FAB4_HD_GROUP_A: Record<string, () => string> = {
  fab4_hero_feol_pixel_heart: () =>
    wrapFab3HdSvg({
      badge: 'F4-01',
      stepTag: 'FEOL 380工程 / 25Mask',
      title: '完成4T-PPD画素の心臓部 ── 透明シリコンに彫る電気の地形',
      analogy: '青・緑・赤の3階建てバケツ＋暗電流封印フタ＋ストロー水門＋金属保護カバーの合体',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <!-- Left: Giant Annotated Cross-Section of Completed 4T-PPD Pixel Heart -->
        <rect x="26" y="80" width="410" height="254" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>
        <text x="40" y="100" font-size="11.2" font-weight="800" fill="#0f172a">🔬 完成4T-PPD画素の断面図（左：光バケツPD ／ 右：4Tスイッチ）</text>

        <!-- Deep P-Well Floor (Mask #05) -->
        <rect x="44" y="290" width="374" height="26" rx="4" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.3"/>
        <text x="231" y="307" text-anchor="middle" font-size="10" font-weight="800" fill="#5b21b6">ディープPウェル床（Mask #05）：電子を下へ逃がさず跳ね返す！</text>

        <!-- Left & Right Front DTI Walls (Mask #04) -->
        <rect x="44" y="148" width="22" height="144" rx="3" fill="#475569" stroke="#1e293b" stroke-width="1.2"/>
        <rect x="49" y="151" width="12" height="138" fill="#bae6fd"/>
        <rect x="396" y="148" width="22" height="144" rx="3" fill="#475569" stroke="#1e293b" stroke-width="1.2"/>
        <rect x="401" y="151" width="12" height="138" fill="#bae6fd"/>
        <text x="55" y="142" text-anchor="middle" font-size="8.6" font-weight="800" fill="#475569">F-DTI壁</text>
        <text x="407" y="142" text-anchor="middle" font-size="8.6" font-weight="800" fill="#475569">F-DTI壁</text>

        <!-- 3-Depth RGB PD Buckets (Masks #11, #12, #13) -->
        <rect x="70" y="240" width="176" height="48" rx="4" fill="#fecdd3" stroke="#e11d48" stroke-width="1.2"/>
        <text x="158" y="268" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">🔴 最深部PD（赤 4.0µm / Mask #11）</text>
        <rect x="70" y="200" width="176" height="38" rx="4" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.2"/>
        <text x="158" y="223" text-anchor="middle" font-size="10" font-weight="800" fill="#14532d">🟢 中深部PD（緑 1.73µm / Mask #12）</text>
        <rect x="70" y="168" width="176" height="30" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
        <text x="158" y="187" text-anchor="middle" font-size="9.8" font-weight="800" fill="#075985">🔵 浅部PD（青 0.49µm / Mask #13）</text>

        <!-- Surface P+ Pinning Lid (Mask #22) -->
        <rect x="70" y="152" width="176" height="14" rx="3" fill="#f59e0b" stroke="#b45309" stroke-width="1.2"/>
        <text x="158" y="162.5" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">★ 表面P+ピンニング蓋（Mask #22）</text>

        <!-- SAB Emerald Shield (Mask #25) -->
        <rect x="66" y="138" width="184" height="10" rx="4" fill="#10b981" fill-opacity="0.88"/>
        <text x="158" y="133" text-anchor="middle" font-size="8.8" font-weight="800" fill="#047857">🛡 シリサイドブロック保護膜 SAB（Mask #25）</text>

        <!-- Incoming RGB Photons -->
        <line x1="94" y1="104" x2="94" y2="178" stroke="#0284c7" stroke-width="2.4" marker-end="url(#f401-arrBlue)"/>
        <line x1="158" y1="104" x2="158" y2="212" stroke="#16a34a" stroke-width="2.4" marker-end="url(#f401-arrGreen)"/>
        <line x1="222" y1="104" x2="222" y2="254" stroke="#e11d48" stroke-width="2.4" marker-end="url(#f401-arrRed)"/>

        <!-- Right Transistor Zone: VTG Straw + Poly Gate + Sidewalls + FD -->
        <rect x="250" y="152" width="142" height="136" rx="4" fill="#e2e8f0" stroke="#64748b" stroke-width="1.1"/>
        <!-- VTG Vertical Straw (Mask #17) -->
        <rect x="262" y="152" width="18" height="74" rx="4" fill="#1e293b"/>
        <!-- Poly-Si Gate Roof + Sidewall Shoulder Pads -->
        <rect x="254" y="122" width="38" height="28" rx="4" fill="#0f172a"/>
        <text x="273" y="140" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">VTG</text>
        <path d="M 244,150 Q 244,126 254,126 L 254,150 Z" fill="#38bdf8"/>
        <path d="M 302,150 Q 302,126 292,126 L 292,150 Z" fill="#38bdf8"/>
        <!-- FD Golden Cup -->
        <rect x="314" y="154" width="66" height="32" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
        <text x="347" y="174" text-anchor="middle" font-size="9.6" font-weight="800" fill="#92400e">計量カップFD</text>
        <!-- Electron suction arrow -->
        <path d="M 218,242 Q 252,232 271,196 Q 288,166 312,170" fill="none" stroke="#d97706" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#f401-arrAmber)"/>
        <text x="322" y="216" text-anchor="middle" font-size="9" font-weight="800" fill="#334155">4T画素Pウェル</text>
        <text x="322" y="230" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">TG / RST / SF / SEL</text>
        <text x="322" y="250" text-anchor="middle" font-size="8.4" font-weight="700" fill="#7c3aed">ゲート酸化膜 3〜7nm</text>
        <text x="322" y="263" text-anchor="middle" font-size="8.2" font-weight="600" fill="#64748b">（原子たった10〜20個！）</text>

        <!-- Right Column: Scale & Architecture KPI Tiles -->
        ${drawKpiBox(450, 80, 244, 62, '画素ピッチ目安（フルサイズ）', '5.9 / 3.6–4.4 / 1.5 µm', '24MP(α9III) / 45–67MP / 4.1億画素', '#0284c7')}
        ${drawKpiBox(450, 150, 244, 60, 'ゲート酸化膜の極薄さ', '3 〜 7 nm（原子10〜20個）', 'この薄さで3.3V耐圧＆漏れゼロ！', '#7c3aed')}
        ${drawKpiBox(450, 218, 244, 56, 'CIS専用プロセス世代', '90nm 〜 65nm クラス', 'ISSCC 2025: 90nm画素＋40nmロジック', '#059669')}
        ${drawKpiBox(450, 282, 244, 52, 'フェーズ3 工程総数 [推定]', '25マスク×12 ＋ 非露光80 ＝ 380', '画質の8割以上がここで決定！', '#e11d48')}
      `,
      cards: [
        { label: '原子マシンガン彫刻', line1: 'P・As・B原子を光速0.1〜2%で打込', line2: 'シリコン内にN型谷とP型壁を立体形成', accent: '#0284c7' },
        { label: '全25マスク完全展開', line1: '25枚×12露光工程(300)＋非露光80', line2: '累計490工程で光電変換の心臓部が完成', accent: '#7c3aed' },
        { label: '一眼画質の8割を決定', line1: 'DR・高感度・夜景白キズ・AF速度', line2: 'GS性能まですべてFEOLの精度で決まる', accent: '#e11d48' },
      ],
    }),

  fab4_phase3_feol_terrace_deck: () =>
    wrapFab3HdSvg({
      badge: 'F4-02',
      stepTag: '全380工程 6ブロック',
      title: 'フェーズ3（画素FEOL）全380工程・6ブロック完全工程マップ',
      analogy: 'お堀と城壁 → 12連発イオン注入 → 水門と屋根 → 魔法のP+蓋 → 1秒焼き＆金属ブロック',
      accent: '#4f46e5',
      accentSoft: '#eef2ff',
      body: `
        <!-- 6 Flow Blocks in 2 Rows of 3 Connected Cards -->
        ${[
          { x: 26, y: 84, title: '3-A 洗浄・基準・STI', steps: 'P03-001〜058 (58工程)', masks: 'Mask #01〜#03 (3枚)', desc1: 'RCA超洗浄・十字基準溝', desc2: '深さ0.3µm浅いお堀＆CMP', col: '#0284c7', bg: '#f0f9ff' },
          { x: 252, y: 84, title: '3-B フロントDTI城壁', steps: 'P03-059〜084 (26工程)', masks: 'Mask #04 (1枚)', desc1: '幅0.1–0.2µm×深2–5µm', desc2: 'AR15–30深溝＆全反射鏡', col: '#7c3aed', bg: '#f5f3ff' },
          { x: 478, y: 84, title: '3-C ウェル＆RGB 3段PD', steps: 'P03-085〜248 (164工程)', masks: 'Mask #05〜#16 (12枚!!)', desc1: '赤4µm/緑1.7µm/青0.5µm', desc2: 'MeV連射・DP・GS・回復炉', col: '#e11d48', bg: '#fff1f2' },
          { x: 26, y: 204, title: '3-D VTG＆ポリSiゲート', steps: 'P03-249〜296 (48工程)', masks: 'Mask #17〜#19 (3枚)', desc1: 'ストロー水門＆3–7nm膜', desc2: '選択比>50:1最難関エッチ', col: '#d97706', bg: '#fffbeb' },
          { x: 252, y: 204, title: '3-E LDD・P+蓋・S/D', steps: 'P03-297〜364 (68工程)', masks: 'Mask #20〜#24 (5枚)', desc1: '肩パッド40–80nm自己整合', desc2: '★Mask #22 暗電流1/1000', col: '#db2777', bg: '#fdf2f8' },
          { x: 478, y: 204, title: '3-F RTA・SAB・水素焼', steps: 'P03-365〜380 (16工程)', masks: 'Mask #25 (最終マスク!)', desc1: '1000℃&lt;1s＆画素金属保護', desc2: '400℃ H2修復 → 第5巻BEOL', col: '#059669', bg: '#ecfdf5' },
        ]
          .map(
            (b) => `
          <g transform="translate(${b.x}, ${b.y})">
            <rect x="0" y="0" width="214" height="104" rx="10" fill="${b.bg}" stroke="${b.col}" stroke-width="1.6"/>
            <rect x="0" y="0" width="214" height="26" rx="10" fill="${b.col}"/>
            <rect x="0" y="18" width="214" height="8" fill="${b.col}"/>
            <text x="107" y="17.5" text-anchor="middle" font-size="11.2" font-weight="800" fill="#ffffff">${b.title}</text>
            <text x="107" y="44" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0f172a">${b.steps}</text>
            <rect x="28" y="51" width="158" height="18" rx="9" fill="#ffffff" stroke="${b.col}" stroke-opacity="0.5"/>
            <text x="107" y="63.5" text-anchor="middle" font-size="9.4" font-weight="800" fill="${b.col}">${b.masks}</text>
            <text x="107" y="82" text-anchor="middle" font-size="9.2" font-weight="600" fill="#334155">${b.desc1}</text>
            <text x="107" y="96" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0f172a">${b.desc2}</text>
          </g>`
          )
          .join('')}
        <!-- Flow Arrows -->
        <line x1="241" y1="136" x2="250" y2="136" stroke="#475569" stroke-width="2.2" marker-end="url(#f402-arrSlate)"/>
        <line x1="467" y1="136" x2="476" y2="136" stroke="#475569" stroke-width="2.2" marker-end="url(#f402-arrSlate)"/>
        <path d="M 585,189 L 585,196 L 133,196 L 133,202" fill="none" stroke="#4f46e5" stroke-width="2" stroke-dasharray="4 2" marker-end="url(#f402-arrPurple)"/>
        <line x1="241" y1="256" x2="250" y2="256" stroke="#475569" stroke-width="2.2" marker-end="url(#f402-arrSlate)"/>
        <line x1="467" y1="256" x2="476" y2="256" stroke="#475569" stroke-width="2.2" marker-end="url(#f402-arrSlate)"/>

        <!-- Bottom Progress Strip -->
        <rect x="26" y="317" width="666" height="22" rx="11" fill="#0f172a"/>
        <text x="359" y="331.5" text-anchor="middle" font-size="10.2" font-weight="800" fill="#f8fafc">合計確認：25マスク × 12露光(L-01〜L-12) ＝ 300工程 ＋ 非露光80工程 ＝ ちょうど380工程（累計490工程！）</text>
      `,
      cards: [
        { label: '上階テラス (3-A〜3-D)', line1: 'STI・DTI・12連続PD注入・VTG', line2: '電子の城壁と3色バケツ・水門を建設', accent: '#4f46e5' },
        { label: '下階テラス (3-E〜3-F)', line1: 'P+ピンニング蓋・1秒RTA・SAB', line2: '暗電流と金属汚染を封じFEOL完走', accent: '#db2777' },
        { label: 'L-01〜L-12 完全展開', line1: '各マスクは前洗浄〜AEI計測12工程', line2: '1枚も省略せず全25マスクを3D再現', accent: '#059669' },
      ],
    }),

  fab4_p001_incoming_rca_clean: () =>
    wrapFab3HdSvg({
      badge: 'F4-03',
      stepTag: 'P03-001〜003 [標準]',
      title: 'ロット受入・レーザーID登録＆初期RCA枚葉超洗浄',
      analogy: '手術前のカルテ照合と、原子1個の汚れも残さない滅菌スピン洗浄',
      accent: '#0891b2',
      accentSoft: '#ecfeff',
      body: `
        <!-- Step 1: Laser ID & MES -->
        <rect x="24" y="84" width="186" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.4"/>
        <text x="117" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#075985">① レーザーID登録</text>
        <circle cx="117" cy="176" r="52" fill="url(#f403-si)" stroke="#0ea5e9" stroke-width="2"/>
        <rect x="82" y="206" width="70" height="14" rx="3" fill="#0f172a"/>
        <text x="117" y="216" text-anchor="middle" font-size="8.4" font-weight="800" fill="#38bdf8">ID: W300-8841</text>
        <line x1="117" y1="244" x2="117" y2="222" stroke="#e11d48" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#f403-arrRed)"/>
        <rect x="44" y="248" width="146" height="68" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="117" y="268" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">工場の頭脳（MES）</text>
        <text x="117" y="285" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">全380工程の履歴を</text>
        <text x="117" y="300" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">1枚単位で完全追跡</text>

        <!-- Step 2: Single-Wafer RCA Spin Clean -->
        <rect x="228" y="84" width="248" height="248" rx="10" fill="#ecfeff" stroke="#0891b2" stroke-width="1.5"/>
        <text x="352" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#155e75">② SCREEN枚葉RCA3段階スピン洗浄</text>
        <!-- Spray Nozzles -->
        <rect x="260" y="122" width="54" height="22" rx="6" fill="#0284c7"/>
        <text x="287" y="136.5" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">SC-1</text>
        <rect x="325" y="122" width="54" height="22" rx="6" fill="#7c3aed"/>
        <text x="352" y="136.5" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">SC-2</text>
        <rect x="390" y="122" width="54" height="22" rx="6" fill="#059669"/>
        <text x="417" y="136.5" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">DHF</text>
        <line x1="287" y1="145" x2="312" y2="196" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#f403-arrBlue)"/>
        <line x1="352" y1="145" x2="352" y2="196" stroke="#8b5cf6" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#f403-arrPurple)"/>
        <line x1="417" y1="145" x2="392" y2="196" stroke="#10b981" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#f403-arrGreen)"/>
        <!-- Spinning Wafer -->
        <ellipse cx="352" cy="212" rx="92" ry="18" fill="url(#f403-si)" stroke="#0891b2" stroke-width="2"/>
        <text x="352" y="216" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">300mmウェーハ高速スピン</text>
        <text x="256" y="254" font-size="9.4" font-weight="700" fill="#075985">• SC-1：微粒子・有機物を除去</text>
        <text x="256" y="274" font-size="9.4" font-weight="700" fill="#5b21b6">• SC-2：金属不純物を完全溶出</text>
        <text x="256" y="294" font-size="9.4" font-weight="700" fill="#065f46">• DHF：不均一な自然酸化膜を剥離</text>
        <text x="256" y="314" font-size="9.4" font-weight="800" fill="#0f172a">→ 超純水リンス＆スピン乾燥</text>

        <!-- Step 3: Cleanliness Spec & Defect Check -->
        ${drawKpiBox(494, 84, 200, 76, '金属汚染クリア基準', '&lt; 10⁹ atoms/cm²', '東京ドームに金属ホコリ数粒以下', '#0891b2')}
        ${drawCompareFrame(494, 172, 200, 160, '汚れが残ると写真に？', '#e11d48', '#fff1f2')}
        <rect x="514" y="214" width="160" height="46" rx="6" fill="#0f172a"/>
        <circle cx="556" cy="236" r="3" fill="#ffffff"/>
        <circle cx="614" cy="242" r="3.5" fill="#fb7185"/>
        <circle cx="648" cy="228" r="2.5" fill="#ffffff"/>
        <text x="594" y="278" text-anchor="middle" font-size="9.4" font-weight="800" fill="#9f1239">初期酸化膜にピンホール！</text>
        <text x="594" y="294" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">金属汚染が白キズ（ホットピクセル）</text>
        <text x="594" y="309" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">と欠陥の種になって残る</text>
      `,
      cards: [
        { label: '洗浄の3種の神器', line1: 'SC-1(ゴミ) / SC-2(金属) / DHF(膜)', line2: '輸送中の汚れと自然酸化膜を一掃', accent: '#0891b2' },
        { label: '主要装置・条件', line1: 'SCREEN枚葉洗浄機＋超純水', line2: '金属汚染 ＜ 10^9 atoms/cm² [業界標準]', accent: '#0284c7' },
        { label: '写真への影響', line1: '最初の酸化膜にピンホールを防ぎ', line2: '夜景の白キズ原因を入口で根絶', accent: '#e11d48' },
      ],
    }),

  fab4_p004_initial_pad_oxide: () =>
    wrapFab3HdSvg({
      badge: 'F4-04',
      stepTag: 'P03-004〜006 [標準]',
      title: '初期パッド熱酸化（約10nmガラス保護膜）＆ゼロ層前検査',
      analogy: '印を刻む前に、シリコン自身を900℃酸素で育てた10nm透明フィルムで包む',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <!-- Left: Vertical Oxidation Furnace -->
        <rect x="26" y="84" width="230" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <text x="141" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9a3412">🔥 KOKUSAI縦型熱酸化炉</text>
        <!-- Quartz Tube + Heaters -->
        <rect x="74" y="122" width="134" height="162" rx="16" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
        <rect x="52" y="134" width="16" height="138" rx="4" fill="#dc2626"/>
        <rect x="214" y="134" width="16" height="138" rx="4" fill="#dc2626"/>
        <!-- Wafer Boat (Horizontal Slats) -->
        ${[0, 1, 2, 3, 4, 5, 6]
          .map((i) => `<rect x="92" y="${142 + i * 18}" width="98" height="6" rx="2" fill="#475569"/>`)
          .join('')}
        <text x="141" y="302" text-anchor="middle" font-size="10.2" font-weight="800" fill="#c2410c">約850〜950℃ O₂ ガス供給</text>
        <text x="141" y="319" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">100枚一括で±0.1℃均一加熱</text>

        <!-- Center: Thermal Oxidation Cross-Section Zoom -->
        <rect x="276" y="84" width="214" height="248" rx="10" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4"/>
        <text x="383" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#075985">🔬 熱酸化の仕組み（Si + O₂）</text>
        <!-- Oxygen arrows descending -->
        ${[316, 360, 404, 448]
          .map(
            (x) =>
              `<circle cx="${x}" cy="134" r="9" fill="#38bdf8"/><text x="${x}" y="137.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#ffffff">O₂</text><line x1="${x}" y1="146" x2="${x}" y2="176" stroke="#0284c7" stroke-width="1.8" marker-end="url(#f404-arrBlue)"/>`
          )
          .join('')}
        <!-- Grown 10nm SiO2 Pad Layer -->
        <rect x="296" y="182" width="174" height="36" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="383" y="204" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0c4a6e">パッド熱酸化膜 SiO₂（10 nm）</text>
        <!-- Silicon Bulk -->
        <rect x="296" y="218" width="174" height="72" rx="4" fill="#475569"/>
        <text x="383" y="258" text-anchor="middle" font-size="10.6" font-weight="800" fill="#f8fafc">単結晶エピ・シリコン基板</text>
        <text x="383" y="312" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0369a1">髪の毛の約1/7,000の極薄ガラス！</text>

        <!-- Right: Metrology & OK/NG -->
        ${drawKpiBox(508, 84, 186, 74, '目標パッド酸化膜厚', '約 10 nm（850–950℃）', 'エリプソメータ全数検査', '#ea580c')}
        ${drawCompareFrame(508, 170, 186, 162, '膜厚ムラがあると？', '#e11d48', '#fff1f2')}
        <text x="601" y="220" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">次工程の基準マーク深さが</text>
        <text x="601" y="236" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">場所ごとにバラバラに！</text>
        ${drawPill(522, 254, 158, '均一10nm → 精密マーク', true)}
        ${drawPill(522, 290, 158, 'ムラ発生 → 重ねズレ原因', false)}
      `,
      cards: [
        { label: '密着性抜群の熱酸化', line1: 'Si自身が酸素と結合しガラス化', line2: '外から塗るより緻密で欠陥ゼロ', accent: '#ea580c' },
        { label: '主要装置・条件', line1: 'KOKUSAI ELECTRIC縦型炉', line2: '約850〜950℃、SiO₂ 10nm [業界標準]', accent: '#0284c7' },
        { label: '次工程への役割', line1: 'ゼロ層基準マーク彫り込みの', line2: '深さ均一性と表面保護を保証', accent: '#e11d48' },
      ],
    }),

  fab4_m01_zero_layer_align: () =>
    wrapFab3HdSvg({
      badge: 'F4-05',
      stepTag: 'Mask #01 / P03-007–18',
      title: '【Mask #01】ゼロ層・基準アライメントマーク形成（全25枚の羅針盤）',
      analogy: '広大な建設地の最初に打つ「不動の測量杭」。以後24枚すべてがこの十字を基準に位置合わせ',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        <!-- Left: Wafer Scribe-Line Cross Alignment Map -->
        <rect x="26" y="84" width="234" height="248" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
        <text x="143" y="106" text-anchor="middle" font-size="11" font-weight="800" fill="#92400e">🎯 スクライブライン基準十字</text>
        <!-- Full-Frame Dies Grid + Crosses -->
        <rect x="48" y="120" width="84" height="58" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <rect x="154" y="120" width="84" height="58" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <rect x="48" y="198" width="84" height="58" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <rect x="154" y="198" width="84" height="58" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <text x="90" y="153" text-anchor="middle" font-size="9" font-weight="700" fill="#334155">36×24mm</text>
        <text x="196" y="153" text-anchor="middle" font-size="9" font-weight="700" fill="#334155">センサー</text>
        <!-- Golden Cross Mark in Scribe Line -->
        <rect x="139" y="170" width="8" height="36" rx="2" fill="#f59e0b" stroke="#92400e"/>
        <rect x="125" y="184" width="36" height="8" rx="2" fill="#f59e0b" stroke="#92400e"/>
        <text x="143" y="280" text-anchor="middle" font-size="9.6" font-weight="800" fill="#b45309">切りしろ（スクライブライン）に彫る</text>
        <text x="143" y="298" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">深さ 100〜150 nm の基準溝</text>
        <text x="143" y="314" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0284c7">レーザー回折で残り24枚をnm位置合せ</text>

        <!-- Right Top: Cross-Section Trench + Laser Readout -->
        <rect x="278" y="84" width="416" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>
        <text x="292" y="104" font-size="10.8" font-weight="800" fill="#0f172a">📐 シリコン浅エッチング断面（キヤノンFPA-6300ESW / ASML ＋ TELエッチャー）</text>
        <path d="M 304,142 L 420,142 L 420,174 L 474,174 L 474,142 L 590,142 L 590,192 L 304,192 Z" fill="#475569"/>
        <line x1="447" y1="112" x2="447" y2="170" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#f405-arrRed)"/>
        <text x="488" y="130" font-size="9.6" font-weight="800" fill="#e11d48">位置合わせレーザー光</text>
        <text x="606" y="160" font-size="10" font-weight="800" fill="#d97706">深さ 100–150nm</text>
        <text x="606" y="176" font-size="9" font-weight="600" fill="#475569">左右完全対称が命!</text>

        <!-- Right Bottom: L-01–L-12 12-Step Cycle Strip -->
        <rect x="278" y="216" width="416" height="116" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.3"/>
        <text x="486" y="236" text-anchor="middle" font-size="10.6" font-weight="800" fill="#92400e">🔁 全25マスク共通：リソグラフィ完全12ステップ（L-01〜L-12）</text>
        ${['L01洗浄', 'L02下地', 'L03塗布', 'L04ベーク', 'L05露光', 'L06 PEB', 'L07現像', 'L08 ADI', 'L09加工', 'L10灰化', 'L11洗浄', 'L12 AEI']
          .map((lbl, idx) => {
            const col = idx % 6;
            const row = Math.floor(idx / 6);
            const x = 290 + col * 66;
            const y = 248 + row * 38;
            const hi = idx === 4 || idx === 8;
            return `<rect x="${x}" y="${y}" width="60" height="28" rx="6" fill="${hi ? '#d97706' : '#ffffff'}" stroke="#d97706"/><text x="${x + 30}" y="${y + 18}" text-anchor="middle" font-size="9" font-weight="800" fill="${hi ? '#ffffff' : '#78350f'}">${lbl}</text>`;
          })
          .join('')}
      `,
      cards: [
        { label: '最初の型紙 Mask #01', line1: '切りしろに十字の基準溝を彫る', line2: '残り24マスクすべての原点座標', accent: '#d97706' },
        { label: '主要装置・深さ', line1: 'キヤノンFPA-6300ESW / ASML', line2: 'TELエッチャー・深さ100〜150nm', accent: '#0284c7' },
        { label: '失敗すると写真に？', line1: '基準が歪むと後工程すべての', line2: '重ね合わせがガタガタになり全滅', accent: '#e11d48' },
      ],
    }),

  fab4_p019_sti_pad_sin_lpcvd: () =>
    wrapFab3HdSvg({
      badge: 'F4-06',
      stepTag: 'P03-019〜024 [標準]',
      title: 'STI用パッド酸化＋硬質窒化ケイ素（SiN）LPCVD 2層型枠',
      analogy: '硬い鉄の型枠（SiN）の下にクッションマット（10nmガラス）を敷いて白キズ応力を防ぐ',
      accent: '#4f46e5',
      accentSoft: '#eef2ff',
      body: `
        <!-- Left: Good 2-Layer Cushion Stack -->
        ${drawCompareFrame(26, 84, 326, 248, '✅ 正解：緩衝SiO₂クッションあり（白キズゼロ！）', '#059669', '#f0fdf4')}
        <rect x="52" y="132" width="274" height="52" rx="4" fill="#6366f1" stroke="#312e81" stroke-width="1.3"/>
        <text x="189" y="162" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">硬質 窒化ケイ素 Si₃N₄（約100 nm / CMPストッパー）</text>
        <rect x="52" y="186" width="274" height="22" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-width="1.3"/>
        <text x="189" y="201" text-anchor="middle" font-size="10" font-weight="800" fill="#075985">🛋 クッション緩衝ガラス膜 SiO₂（10 nm）</text>
        <rect x="52" y="210" width="274" height="72" rx="4" fill="#475569"/>
        <text x="189" y="246" text-anchor="middle" font-size="10.8" font-weight="800" fill="#f8fafc">無傷の単結晶シリコン（転位欠陥ゼロ！）</text>
        ${drawPill(78, 294, 222, '応力を吸収 → 結晶完璧保護', true)}

        <!-- Right: Bad Direct SiN Stress Fracture -->
        ${drawCompareFrame(368, 84, 326, 248, '❌ 緩衝膜を省くと：硬いSiNの応力で結晶破壊！', '#e11d48', '#fff1f2')}
        <rect x="394" y="144" width="274" height="58" rx="4" fill="#6366f1" stroke="#312e81" stroke-width="1.3"/>
        <text x="531" y="177" text-anchor="middle" font-size="10.8" font-weight="800" fill="#ffffff">硬いSiNを直接シリコンに載せると…</text>
        <rect x="394" y="204" width="274" height="78" rx="4" fill="#475569"/>
        <!-- Red Stress Cracks -->
        <polyline points="450,204 468,236 456,262" fill="none" stroke="#fb7185" stroke-width="2.6"/>
        <polyline points="530,204 514,234 532,266" fill="none" stroke="#fb7185" stroke-width="2.6"/>
        <polyline points="610,204 624,232 606,264" fill="none" stroke="#fb7185" stroke-width="2.6"/>
        <text x="531" y="250" text-anchor="middle" font-size="10.4" font-weight="900" fill="#fecdd3">💥 結晶欠陥（転位）＝ 白キズの元！</text>
        ${drawPill(416, 294, 230, '夜景に永遠の白キズが大量発生', false)}
      `,
      cards: [
        { label: '2層プロテクター構造', line1: '下：緩衝SiO₂(10nm)で応力吸収', line2: '上：硬質SiN(100nm)でCMP停止', accent: '#4f46e5' },
        { label: '主要装置・温度', line1: 'KOKUSAI ELECTRIC縦型LPCVD炉', line2: '約700〜780℃、膜厚計測まで6工程', accent: '#0284c7' },
        { label: '写真への影響', line1: '緩衝ガラスを省くとSiN応力で', line2: 'シリコンに結晶欠陥→白キズ発生', accent: '#e11d48' },
      ],
    }),

  fab4_m02_sti_trench_etch: () =>
    wrapFab3HdSvg({
      badge: 'F4-07',
      stepTag: 'Mask #02 / P03-025–36',
      title: '【Mask #02】STI浅い素子分離溝エッチング（深さ0.3µm・斜め壁）',
      analogy: '隣り合うトランジスタを隔てる浅いお堀。80〜85°の優しい傾斜が電界集中を防ぐ',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <!-- Left: Tapered STI Trench Cross Section -->
        ${drawCompareFrame(26, 84, 384, 248, '✅ 正解：テーパー角80〜85°の滑らかなSTIお堀', '#0284c7', '#f0f9ff')}
        <!-- SiN + SiO2 + Tapered Silicon Trench -->
        <rect x="46" y="132" width="110" height="22" fill="#6366f1"/>
        <rect x="280" y="132" width="110" height="22" fill="#6366f1"/>
        <rect x="46" y="154" width="110" height="8" fill="#bae6fd"/>
        <rect x="280" y="154" width="110" height="8" fill="#bae6fd"/>
        <polygon points="46,162 156,162 174,258 262,258 280,162 390,162 390,296 46,296" fill="#475569"/>
        <!-- Dimension Callouts -->
        <line x1="218" y1="162" x2="218" y2="256" stroke="#f59e0b" stroke-width="2" marker-start="url(#f407-arrAmber)" marker-end="url(#f407-arrAmber)"/>
        <rect x="176" y="196" width="84" height="24" rx="6" fill="#ffffff" stroke="#d97706"/>
        <text x="218" y="211.5" text-anchor="middle" font-size="9.6" font-weight="800" fill="#92400e">250〜350nm</text>
        ${drawPin(164, 210, 118, 280, 1, '傾斜 80〜85°', 'ボイド防止＆角緩和', '#0284c7', 'end')}
        <text x="100" y="147" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">SiN型枠</text>
        <text x="335" y="147" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">SiN型枠</text>
        <text x="335" y="282" text-anchor="middle" font-size="9.4" font-weight="800" fill="#e2e8f0">隣のTr島</text>

        <!-- Right: Bad Sharp Corner Electric Field Concentration -->
        ${drawCompareFrame(426, 84, 268, 248, '❌ 角が尖りすぎると？', '#e11d48', '#fff1f2')}
        <polygon points="452,160 518,160 518,248 602,248 602,160 668,160 668,286 452,286" fill="#475569"/>
        <circle cx="518" cy="160" r="14" fill="#fb7185" fill-opacity="0.45" stroke="#e11d48" stroke-width="2"/>
        <circle cx="602" cy="160" r="14" fill="#fb7185" fill-opacity="0.45" stroke="#e11d48" stroke-width="2"/>
        <text x="560" y="146" text-anchor="middle" font-size="10" font-weight="900" fill="#be123c">⚡ 鋭い角に電界が集中！</text>
        <text x="560" y="212" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9f1239">暗い写真にリーク電流</text>
        <text x="560" y="228" text-anchor="middle" font-size="9.2" font-weight="700" fill="#475569">（ノイズ・白キズ）が湧く！</text>
        ${drawPill(452, 294, 216, 'さらに底に空洞ができやすい', false)}
      `,
      cards: [
        { label: '浅いお堀の役割', line1: 'SiN→SiO₂→Siを連続ドライエッチ', line2: '隣り合うトランジスタを完全絶縁', accent: '#0284c7' },
        { label: '主要装置・形状', line1: 'TEL / ラムリサーチ エッチャー', line2: '深さ250〜350nm・角度80〜85°', accent: '#4f46e5' },
        { label: '写真への影響', line1: '角が尖ると電界集中で暗部ノイズ', line2: '滑らかな傾斜がノイズレスの基本', accent: '#e11d48' },
      ],
    }),

  fab4_p037_sti_liner_hdp_fill: () =>
    wrapFab3HdSvg({
      badge: 'F4-08',
      stepTag: 'P03-037〜040 [標準]',
      title: 'STIライナー熱酸化（1,000℃角丸め）＆HDP/FCVDガラス完全充填',
      analogy: '炎で角を丸く治療し、流動ガラスを気泡（ボイド）ゼロでお堀に流し込む',
      accent: '#0ea5e9',
      accentSoft: '#f0f9ff',
      body: `
        <!-- Step 1: 1,000°C Liner Corner Rounding -->
        <rect x="26" y="84" width="212" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.4"/>
        <text x="132" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#9a3412">① 1,000℃ライナー酸化</text>
        <path d="M 46,166 Q 92,166 100,196 L 108,248 Q 112,262 132,262 Q 152,262 156,248 L 164,196 Q 172,166 218,166 L 218,296 L 46,296 Z" fill="#475569"/>
        <path d="M 46,166 Q 92,166 100,196 L 108,248 Q 112,262 132,262 Q 152,262 156,248 L 164,196 Q 172,166 218,166" fill="none" stroke="#38bdf8" stroke-width="7"/>
        <text x="132" y="142" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ea580c">角を丸く焼いて傷を完治！</text>
        <text x="132" y="314" text-anchor="middle" font-size="9.2" font-weight="700" fill="#0369a1">ライナーSiO₂ 約10nm</text>

        <!-- Step 2: Void-Free HDP/FCVD Gap Fill -->
        <rect x="254" y="84" width="222" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="365" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#075985">② HDP / FCVD ガラス充填</text>
        <path d="M 274,174 L 320,174 L 336,260 L 394,260 L 410,174 L 456,174 L 456,296 L 274,296 Z" fill="#475569"/>
        <!-- Void-free Glass Mound -->
        <path d="M 274,132 L 456,132 L 456,174 L 410,174 L 394,260 L 336,260 L 320,174 L 274,174 Z" fill="#7dd3fc" fill-opacity="0.82" stroke="#0284c7" stroke-width="1.3"/>
        <text x="365" y="156" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">埋込SiO₂ 約500nm</text>
        <text x="365" y="220" text-anchor="middle" font-size="10" font-weight="800" fill="#0369a1">隙間ゼロ！</text>
        ${drawPill(280, 298, 170, '緻密化アニールで焼締め', true)}

        <!-- Step 3: NG Void Disaster -->
        ${drawCompareFrame(492, 84, 202, 248, '❌ 空洞（ボイド）ができると', '#e11d48', '#fff1f2')}
        <path d="M 512,174 L 552,174 L 564,256 L 622,256 L 634,174 L 674,174 L 674,288 L 512,288 Z" fill="#475569"/>
        <path d="M 512,140 L 674,140 L 674,174 L 634,174 L 622,256 L 564,256 L 552,174 L 512,174 Z" fill="#cbd5e1"/>
        <ellipse cx="593" cy="218" rx="16" ry="24" fill="#be123c" stroke="#ffffff" stroke-width="2"/>
        <text x="593" y="222" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">空洞!</text>
        <text x="593" y="274" text-anchor="middle" font-size="9" font-weight="800" fill="#fecdd3">洗浄薬液が溜まり大惨事</text>
        ${drawPill(510, 298, 166, 'ボイドゼロが絶対条件', false)}
      `,
      cards: [
        { label: 'ライナー酸化の効果', line1: '約1,000℃で角を丸くし結晶傷修復', line2: '約10nmの密着ガラス下地を形成', accent: '#ea580c' },
        { label: '主要装置・充填厚', line1: 'AMAT HDP-CVD / 流動性FCVD', line2: 'SiO₂約500nm埋込＋緻密化アニール', accent: '#0284c7' },
        { label: '失敗するとどうなる？', line1: '溝内に空洞(ボイド)ができると', line2: '後の洗浄薬液が残留し腐食・全滅', accent: '#e11d48' },
      ],
    }),

  fab4_m03_sti_reverse_etch: () =>
    wrapFab3HdSvg({
      badge: 'F4-09',
      stepTag: 'Mask #03 / P03-041–52',
      title: '【Mask #03】STI逆トーン・リバースエッチング（CMP前の山削り）',
      analogy: '広い空き地にこんもり盛り上がった余分なガラスの山だけ、ヤスリがけ前に先に削る',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <!-- Top: Before Reverse Etch (Huge Step Height) -->
        <rect x="26" y="84" width="668" height="114" rx="10" fill="#fff1f2" stroke="#e11d48" stroke-width="1.3"/>
        <text x="42" y="104" font-size="10.8" font-weight="800" fill="#9f1239">① 埋込直後：広い画素エリアの上が山盛りに段差ができる！（そのままCMPすると不均一）</text>
        <!-- Wide Active Area vs Dense Area -->
        <rect x="46" y="142" width="280" height="44" fill="#475569"/>
        <rect x="46" y="114" width="280" height="28" fill="#7dd3fc" stroke="#e11d48" stroke-width="1.6" stroke-dasharray="5 3"/>
        <text x="186" y="132" text-anchor="middle" font-size="10" font-weight="800" fill="#be123c">▲ ここが余分に盛り上がる！（Mask #03で選択開口）</text>
        ${[348, 412, 476, 540, 604]
          .map((x) => `<rect x="${x}" y="142" width="40" height="44" fill="#475569"/><rect x="${x - 16}" y="132" width="72" height="10" fill="#7dd3fc"/>`)
          .join('')}
        <text x="506" y="126" text-anchor="middle" font-size="9.4" font-weight="700" fill="#475569">細かい周辺回路は段差が低い</text>

        <!-- Down Arrow -->
        <line x1="360" y1="200" x2="360" y2="218" stroke="#0284c7" stroke-width="3" marker-end="url(#f409-arrBlue)"/>

        <!-- Bottom: After Mask #03 Reverse Etch -->
        <rect x="26" y="222" width="668" height="112" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
        <text x="42" y="242" font-size="10.8" font-weight="800" fill="#14532d">② Mask #03 逆パターン・リバースエッチ後：全面の高さが揃い、次工程CMPが数nm鏡面に！</text>
        <rect x="46" y="274" width="280" height="44" fill="#475569"/>
        <rect x="46" y="262" width="280" height="12" fill="#7dd3fc" stroke="#0284c7"/>
        ${[348, 412, 476, 540, 604]
          .map((x) => `<rect x="${x}" y="274" width="40" height="44" fill="#475569"/><rect x="${x - 16}" y="262" width="72" height="12" fill="#7dd3fc"/>`)
          .join('')}
        <line x1="38" y1="262" x2="676" y2="262" stroke="#16a34a" stroke-width="2" stroke-dasharray="6 3"/>
        <text x="186" y="257" text-anchor="middle" font-size="9.6" font-weight="800" fill="#15803d">✨ 高さがビシッと揃った！ → 露光のピント(DOF)も全面くっきり</text>
      `,
      cards: [
        { label: '逆トーンの知恵', line1: 'Mask #02の白黒反転パターンで', line2: '盛り上がった広い山だけを事前削り', accent: '#0284c7' },
        { label: '主要装置・12工程', line1: '露光機＋ドライエッチャー(L×12)', line2: '広い画素部と狭い周辺部の段差解消', accent: '#4f46e5' },
        { label: '失敗すると写真に？', line1: '段差が残ると後工程の露光ピントが', line2: '合わず解像力や均一性が崩れる', accent: '#e11d48' },
      ],
    }),

  fab4_p053_sti_cmp_sin_strip: () =>
    wrapFab3HdSvg({
      badge: 'F4-10',
      stepTag: 'P03-053〜058 [標準]',
      title: 'STI-CMP鏡面平坦化 → 160℃熱リン酸SiN剥離（ブロック3-A完成）',
      analogy: '魔法の研磨液で硬いSiN床までピタリと削り、型枠だけ熱リン酸風呂で溶かす',
      accent: '#059669',
      accentSoft: '#ecfdf5',
      body: `
        <!-- Step 1: Ceria Slurry CMP -->
        <rect x="26" y="84" width="212" height="248" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
        <text x="132" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#065f46">① セリア系CMP研磨</text>
        <!-- Polishing Pad -->
        <rect x="44" y="122" width="176" height="26" rx="6" fill="#0f172a"/>
        <text x="132" y="139" text-anchor="middle" font-size="9.4" font-weight="800" fill="#34d399">荏原 / AMAT 研磨パッド</text>
        <!-- Slurry particles -->
        <text x="132" y="164" text-anchor="middle" font-size="9" font-weight="800" fill="#d97706">•• CeO₂ セリアスラリー ••</text>
        <!-- Stopping right on SiN -->
        <rect x="44" y="176" width="52" height="24" fill="#6366f1"/>
        <rect x="168" y="176" width="52" height="24" fill="#6366f1"/>
        <rect x="96" y="176" width="72" height="72" fill="#7dd3fc"/>
        <rect x="44" y="200" width="52" height="84" fill="#475569"/>
        <rect x="168" y="200" width="52" height="84" fill="#475569"/>
        <rect x="96" y="248" width="72" height="36" fill="#475569"/>
        <line x1="38" y1="176" x2="226" y2="176" stroke="#16a34a" stroke-width="2.2"/>
        <text x="132" y="302" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">SiNが出た瞬間にピタリ停止！</text>
        <text x="132" y="318" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">平坦度 数nmを達成</text>

        <!-- Step 2: 160°C Hot H3PO4 Strip -->
        <rect x="254" y="84" width="212" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <text x="360" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#9a3412">② 160℃ 熱リン酸SiN剥離</text>
        <rect x="272" y="124" width="176" height="160" rx="8" fill="#ffedd5" stroke="#fb923c" stroke-width="1.4"/>
        <text x="360" y="146" text-anchor="middle" font-size="9.6" font-weight="800" fill="#c2410c">SCREEN 熱リン酸槽 (160℃)</text>
        <!-- SiN dissolving bubbles -->
        <rect x="286" y="182" width="44" height="16" fill="#6366f1" fill-opacity="0.35" stroke="#6366f1" stroke-dasharray="3 2"/>
        <rect x="390" y="182" width="44" height="16" fill="#6366f1" fill-opacity="0.35" stroke="#6366f1" stroke-dasharray="3 2"/>
        <rect x="330" y="180" width="60" height="64" fill="#7dd3fc" stroke="#0284c7"/>
        <rect x="286" y="198" width="44" height="72" fill="#475569"/>
        <rect x="390" y="198" width="44" height="72" fill="#475569"/>
        <rect x="330" y="244" width="60" height="26" fill="#475569"/>
        <text x="360" y="302" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9a3412">硬いSiN型枠だけ綺麗に溶解！</text>
        <text x="360" y="318" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">埋めたSiO₂お堀とSiは無傷</text>

        <!-- Step 3: Completed STI Island + Warning -->
        <rect x="482" y="84" width="212" height="248" rx="10" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4"/>
        <text x="588" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">③ ブロック3-A STI完成！</text>
        <rect x="502" y="162" width="54" height="80" fill="#475569"/>
        <rect x="620" y="162" width="54" height="80" fill="#475569"/>
        <rect x="556" y="162" width="64" height="60" fill="#7dd3fc" stroke="#0284c7"/>
        <rect x="556" y="222" width="64" height="20" fill="#475569"/>
        <text x="529" y="206" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">素子A</text>
        <text x="588" y="196" text-anchor="middle" font-size="9.6" font-weight="800" fill="#075985">STI絶縁</text>
        <text x="647" y="206" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">素子B</text>
        ${drawPill(500, 260, 176, '平坦度数nmで鏡面完成', true)}
        ${drawPill(500, 296, 176, '削りすぎ→隣Trへ漏れ', false)}
      `,
      cards: [
        { label: 'セリア系スラリー', line1: 'SiO₂を削りSiN面でピタリ停止', line2: 'ディッシングを抑え平坦度数nm', accent: '#059669' },
        { label: '主要装置・温度', line1: '荏原製作所 / AMAT CMP装置', line2: 'SCREEN熱リン酸槽 約160℃剥離', accent: '#0284c7' },
        { label: 'ブロック3-A完了', line1: 'P03-001〜058(58工程)完了！', line2: '次はいよいよ深い城壁DTIへ', accent: '#ea580c' },
      ],
    }),

  fab4_p059_dti_hardmask_dep: () =>
    wrapFab3HdSvg({
      badge: 'F4-11',
      stepTag: 'P03-059〜060 [標準]',
      title: 'フロントDTI用ハードマスク成膜（深掘り用の頑丈な鉄の型枠）',
      analogy: 'レジストだけでは途中で燃え尽きるため、数百nmの硬い酸化膜・窒化膜の鎧を被せる',
      accent: '#64748b',
      accentSoft: '#f1f5f9',
      body: `
        <!-- Left: Hardmask Necessity Comparison -->
        ${drawCompareFrame(26, 84, 336, 248, 'なぜ「鉄の型枠（ハードマスク）」が必要？', '#475569', '#f8fafc')}
        <rect x="44" y="128" width="142" height="190" rx="8" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="115" y="146" text-anchor="middle" font-size="10" font-weight="800" fill="#15803d">✅ 硬質ハードマスク</text>
        <rect x="58" y="160" width="44" height="24" fill="#64748b"/>
        <rect x="128" y="160" width="44" height="24" fill="#64748b"/>
        <rect x="58" y="184" width="44" height="106" fill="#475569"/>
        <rect x="128" y="184" width="44" height="106" fill="#475569"/>
        <text x="115" y="236" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0284c7">100nm</text>
        <text x="115" y="250" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0284c7">細い溝!</text>
        <text x="115" y="306" text-anchor="middle" font-size="8.8" font-weight="700" fill="#166534">PD面積を最大化!</text>

        <rect x="202" y="128" width="142" height="190" rx="8" fill="#fff1f2" stroke="#e11d48"/>
        <text x="273" y="146" text-anchor="middle" font-size="10" font-weight="800" fill="#be123c">❌ 薄い・崩れると</text>
        <polygon points="216,184 246,184 246,290 216,290" fill="#475569"/>
        <polygon points="300,184 330,184 330,290 300,290" fill="#475569"/>
        <text x="273" y="236" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">溝が太く</text>
        <text x="273" y="250" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">広がる!</text>
        <text x="273" y="306" text-anchor="middle" font-size="8.8" font-weight="700" fill="#9f1239">PD減→白飛び悪化</text>

        <!-- Right: 3 DTI Schools in 2026 BSI Sensors -->
        <rect x="380" y="84" width="314" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="537" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">🏛 2026年BSIセンサー DTIの3大流派 [学会・論文]</text>
        ${[
          { y: 124, tag: '① F-DTI（表側掘り・本巻収録）', desc: 'FEOL段階で表側から深さ2〜5µm掘削', hi: true },
          { y: 188, tag: '② B-DTI（裏側掘り・第7巻詳解）', desc: '裏返して薄化後に裏面から掘削する方式', hi: false },
          { y: 252, tag: '③ フルデプスDTI（FDTI表裏貫通）', desc: '表から裏まで完全貫通させる究極分離壁', hi: false },
        ]
          .map(
            (s) => `
          <rect x="396" y="${s.y}" width="282" height="52" rx="8" fill="${s.hi ? '#ffffff' : '#faf5ff'}" stroke="${s.hi ? '#7c3aed' : '#c4b5fd'}" stroke-width="${s.hi ? 1.8 : 1.1}"/>
          <text x="410" y="${s.y + 21}" font-size="10.2" font-weight="800" fill="${s.hi ? '#5b21b6' : '#334155'}">${s.tag}</text>
          <text x="410" y="${s.y + 40}" font-size="9.2" font-weight="600" fill="#475569">${s.desc}</text>`
          )
          .join('')}
      `,
      cards: [
        { label: 'ハードマスク仕様', line1: 'PECVD / LPCVDで数百nm成膜', line2: '深掘りプラズマに耐える硬質型枠', accent: '#64748b' },
        { label: '3つのDTI流派', line1: '表側F-DTI / 裏側B-DTI / 貫通FDTI', line2: '本巻は表側F-DTI代表構成を詳解', accent: '#7c3aed' },
        { label: '崩れると写真に？', line1: '溝が広がってPD面積が削られ', line2: '白飛び耐性(飽和電子数)が低下', accent: '#e11d48' },
      ],
    }),

  fab4_m04_front_dti_deep_etch: () =>
    wrapFab3HdSvg({
      badge: 'F4-12',
      stepTag: 'Mask #04 / AR 15–30',
      title: '【Mask #04】フロントDTI高アスペクト比ディープエッチング',
      analogy: '幅0.1〜0.2µm×深さ2〜5µm──東京スカイツリーを逆さまにした超細長い垂直城壁！',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <!-- Left: Inverted Tokyo Skytree AR 15–30 Visualization -->
        <rect x="26" y="84" width="236" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="144" y="106" text-anchor="middle" font-size="11" font-weight="800" fill="#5b21b6">🗼 逆さスカイツリー級の縦穴！</text>
        <!-- Silicon Cross Section with Ultra-Deep Narrow Trench -->
        <rect x="48" y="132" width="84" height="176" fill="#475569"/>
        <rect x="156" y="132" width="84" height="176" fill="#475569"/>
        <rect x="132" y="294" width="24" height="14" fill="#475569"/>
        <rect x="132" y="132" width="24" height="162" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
        <line x1="144" y1="136" x2="144" y2="288" stroke="#7c3aed" stroke-width="2" stroke-dasharray="4 2" marker-end="url(#f412-arrPurple)"/>
        <text x="144" y="124" text-anchor="middle" font-size="9.6" font-weight="800" fill="#5b21b6">幅 100〜200 nm</text>
        <text x="90" y="206" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">赤画素</text>
        <text x="198" y="206" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">緑画素</text>
        <text x="90" y="226" text-anchor="middle" font-size="9.2" font-weight="700" fill="#c4b5fd">深さ 2〜5µm</text>
        <text x="198" y="226" text-anchor="middle" font-size="9.2" font-weight="700" fill="#c4b5fd">AR 15〜30!</text>

        <!-- Right: Crosstalk OK vs NG Comparison -->
        ${drawCompareFrame(280, 84, 200, 248, '✅ F-DTIあり：色鮮やか', '#059669', '#f0fdf4')}
        <rect x="296" y="134" width="76" height="140" fill="#fecdd3" stroke="#e11d48"/>
        <rect x="388" y="134" width="76" height="140" fill="#bbf7d0" stroke="#16a34a"/>
        <rect x="374" y="134" width="12" height="140" fill="#7c3aed"/>
        <polyline points="318,116 372,190 332,248" fill="none" stroke="#e11d48" stroke-width="2.6" marker-end="url(#f412-arrRed)"/>
        <text x="334" y="160" text-anchor="middle" font-size="9.4" font-weight="800" fill="#9f1239">赤の光</text>
        <text x="426" y="160" text-anchor="middle" font-size="9.4" font-weight="800" fill="#14532d">緑画素</text>
        ${drawPill(294, 290, 172, '壁が遮断→色クッキリ!', true)}

        ${drawCompareFrame(494, 84, 200, 248, '❌ DTIなし/壁ギザギザ', '#e11d48', '#fff1f2')}
        <rect x="510" y="134" width="84" height="140" fill="#fecdd3" stroke="#e11d48"/>
        <rect x="594" y="134" width="84" height="140" fill="#bbf7d0" stroke="#16a34a"/>
        <line x1="532" y1="116" x2="646" y2="238" stroke="#e11d48" stroke-width="2.6" stroke-dasharray="5 3" marker-end="url(#f412-arrRed)"/>
        <text x="594" y="180" text-anchor="middle" font-size="9.6" font-weight="900" fill="#be123c">💥 隣へ侵入!</text>
        <text x="594" y="256" text-anchor="middle" font-size="9" font-weight="800" fill="#9f1239">クロストーク＆白キズ</text>
        ${drawPill(508, 290, 172, '色くすみ＆解像ボケ!', false)}
      `,
      cards: [
        { label: '驚異のアスペクト比', line1: '幅100–200nm × 深さ2–5µm', line2: '幅の15〜30倍の垂直超深掘り', accent: '#7c3aed' },
        { label: '主要装置・12工程', line1: 'TEL / ラム / 日立ハイテク', line2: '超深掘りエッチャー [学会・論文]', accent: '#0284c7' },
        { label: '失敗すると写真に？', line1: '曲がり・スキャロッピング傷から', line2: '暗電流が湧いて白キズ地獄に', accent: '#e11d48' },
      ],
    }),

  fab4_p073_dti_sidewall_passiv: () =>
    wrapFab3HdSvg({
      badge: 'F4-13',
      stepTag: 'P03-073〜078 [論文]',
      title: 'DTI側壁ダメージ修復＆負電荷ALD / P+パッシベーション',
      analogy: '傷だらけの城壁に傷薬と「電子を跳ね返す電気バリヤー」を貼るCIS職人の秘技',
      accent: '#9333ea',
      accentSoft: '#faf5ff',
      body: `
        <!-- Left: Zoomed DTI Wall Atomic Barrier Diagram -->
        <rect x="26" y="84" width="404" height="248" rx="10" fill="#faf5ff" stroke="#9333ea" stroke-width="1.5"/>
        <text x="228" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#6b21a8">🛡 原子レベル断面：DTI側壁パッシベーションの仕組み</text>
        <!-- Trench Interior + ALD Negative Charge Layer + Hole Accumulation + Silicon PD -->
        <rect x="44" y="124" width="76" height="184" fill="#e2e8f0" stroke="#64748b"/>
        <text x="82" y="218" text-anchor="middle" font-size="10" font-weight="800" fill="#475569">DTI溝内部</text>

        <!-- Thin Thermal Oxide + Negative Fixed Charge ALD -->
        <rect x="120" y="124" width="38" height="184" fill="#7c3aed"/>
        ${[146, 178, 210, 242, 274]
          .map((y) => `<text x="139" y="${y}" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">−</text>`)
          .join('')}
        <text x="139" y="119" text-anchor="middle" font-size="8.6" font-weight="800" fill="#7c3aed">負電荷ALD</text>

        <!-- Induced P+ Hole Wall -->
        <rect x="158" y="124" width="44" height="184" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.4"/>
        ${[146, 178, 210, 242, 274]
          .map((y) => `<text x="180" y="${y}" text-anchor="middle" font-size="11" font-weight="900" fill="#b45309">＋</text>`)
          .join('')}
        <text x="180" y="119" text-anchor="middle" font-size="8.6" font-weight="800" fill="#b45309">正孔P+壁</text>

        <!-- Silicon PD Region with Repelled Electrons -->
        <rect x="202" y="124" width="212" height="184" fill="#dbeafe" stroke="#0284c7"/>
        <text x="308" y="150" text-anchor="middle" font-size="10.4" font-weight="800" fill="#075985">フォトダイオード（電子バケツ）</text>
        <path d="M 284,186 Q 222,196 284,218" fill="none" stroke="#0284c7" stroke-width="2.4" marker-end="url(#f413-arrBlue)"/>
        <circle cx="294" cy="186" r="10" fill="#0284c7"/>
        <text x="294" y="190" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">e⁻</text>
        <text x="308" y="246" text-anchor="middle" font-size="9.6" font-weight="800" fill="#1e40af">電子は反発して壁に近づけない!</text>
        <text x="308" y="268" text-anchor="middle" font-size="9.2" font-weight="700" fill="#b45309">壁傷の暗電流は＋正孔が即消滅!</text>
        <text x="308" y="294" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">※斜めホウ素/PLAD注入方式でも同様効果</text>

        <!-- Right: Craftsmanship Comparison -->
        ${drawKpiBox(448, 84, 246, 74, 'CIS職人の腕の見せ所', 'nm級 ALD / PLAD被覆', 'AR30の溝底まで1原子層均一', '#9333ea')}
        ${drawCompareFrame(448, 170, 246, 162, '壁面ケアを手抜きすると…', '#e11d48', '#fff1f2')}
        <text x="571" y="220" text-anchor="middle" font-size="10.2" font-weight="800" fill="#9f1239">せっかく城壁を作ったのに</text>
        <text x="571" y="238" text-anchor="middle" font-size="10.2" font-weight="800" fill="#be123c">壁自体が暗電流発生源に逆転！</text>
        ${drawPill(466, 256, 210, 'P+/負電荷壁 → 漆黒の暗部', true)}
        ${drawPill(466, 292, 210, '未処理 → 白キズ＆ノイズ激増', false)}
      `,
      cards: [
        { label: '2段階の壁面治療', line1: '極薄熱酸化でプラズマ傷を癒やし', line2: 'P+斜め注入/PLADまたは負電荷ALD', accent: '#9333ea' },
        { label: '物理のマジック', line1: 'マイナス膜がプラス正孔を引き寄せ', line2: '壁の暗電流を即消滅＆電子を反射', accent: '#0284c7' },
        { label: '画質への影響', line1: '高画素センサーの暗部ノイズを', line2: '左右するCIS専用ノウハウ [学会・論文]', accent: '#e11d48' },
      ],
    }),

  fab4_p079_dti_fill_optic_mirror: () =>
    wrapFab3HdSvg({
      badge: 'F4-14',
      stepTag: 'P03-079〜084 [論文]',
      title: 'DTI酸化膜/ポリSi完全充填・光学的全反射ミラー化＆マスク除去',
      analogy: '屈折率の違うガラスを溝へ詰めて「斜め光を鏡のように跳ね返す光の迷路」を完成',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <!-- Left: Total Internal Reflection Optical Confinement -->
        <rect x="26" y="84" width="420" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="236" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#075985">🪞 スネルの法則：DTI壁での「光学的閉じ込め（全反射）」</text>
        <!-- Left & Right Filled DTI Mirrors -->
        <rect x="56" y="128" width="28" height="184" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="65" y="132" width="10" height="176" fill="#334155"/>
        <rect x="388" y="128" width="28" height="184" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="397" y="132" width="10" height="176" fill="#334155"/>
        <!-- Center Silicon Pixel (n ≈ 3.9) -->
        <rect x="84" y="128" width="304" height="184" fill="#1e293b"/>
        <text x="236" y="150" text-anchor="middle" font-size="10.2" font-weight="800" fill="#f8fafc">シリコン画素内部（屈折率 n ≈ 3.9）</text>
        <!-- Oblique Photon Bouncing Like a Mirror! -->
        <polyline points="170,114 386,214 218,286" fill="none" stroke="#f43f5e" stroke-width="3" marker-end="url(#f414-arrRed)"/>
        <circle cx="386" cy="214" r="7" fill="#fbbf24" stroke="#ffffff" stroke-width="1.5"/>
        <text x="308" y="192" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fda4af">斜め入射光（赤）</text>
        <text x="314" y="268" text-anchor="middle" font-size="10" font-weight="900" fill="#fde047">✨ 鏡のように全反射して自画素PDへ！</text>
        <text x="236" y="302" text-anchor="middle" font-size="9" font-weight="700" fill="#93c5fd">n_Si(3.9) vs n_SiO₂(1.46) → 臨界角 約22°で全反射！</text>

        <!-- Right: 2 Fill Options & Block 3-B Finish -->
        ${drawKpiBox(462, 84, 232, 74, 'ボイドゼロ完全充填', 'SiO₂ or ポリSi芯＋SiO₂', 'ALD / LPCVD＋CMP＆マスク除去', '#0284c7')}
        <rect x="462" y="170" width="232" height="162" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.4"/>
        <text x="578" y="192" text-anchor="middle" font-size="10.8" font-weight="800" fill="#065f46">✅ ブロック3-B 完了の成果</text>
        <text x="478" y="218" font-size="9.6" font-weight="700" fill="#0f172a">1. 斜め光を隣画素へ逃がさない</text>
        <text x="478" y="238" font-size="9.6" font-weight="700" fill="#0f172a">2. 反射で自画素の感度がアップ</text>
        <text x="478" y="258" font-size="9.6" font-weight="700" fill="#0f172a">3. ハードマスク剥離で表面平坦化</text>
        ${drawPill(478, 286, 200, '次：3-C 12連続イオン注入へ!', true)}
      `,
      cards: [
        { label: '光の閉じ込め効果', line1: 'Si(n≈3.9)とSiO₂(n≈1.46)の差で', line2: '斜め光を全反射→高感度＆色鮮やか', accent: '#0284c7' },
        { label: '主要装置・構造', line1: 'ALD/LPCVD充填＋CMP＋剥離', line2: 'SiO₂またはポリSi芯＋酸化膜シェル', accent: '#7c3aed' },
        { label: 'ブロック3-B完了', line1: 'P03-059〜084(26工程)完了！', line2: '最強の城壁が完成しPD彫刻へ突入', accent: '#059669' },
      ],
    }),
};
