import { wrapFab3HdSvg, drawCompareFrame, drawKpiBox, drawPill } from '../fabVol3HdSchematics/shared';

/**
 * Vol.4 Ultra-HD 720x470 Beginner-Visual Posters — Group B (F4-15 – F4-27):
 * Block 3-C (P03-085–P03-248, 164 Steps!): Masks #05–#16 Wells/Vt/RGB 3-Depth MeV PD/Dual-Pixel/GS + 20-Step Recovery Anneal.
 */
export const FAB4_HD_GROUP_B: Record<string, () => string> = {
  fab4_m05_deep_pwell_floor: () =>
    wrapFab3HdSvg({
      badge: 'F4-15',
      stepTag: 'Mask #05 / P03-085–96',
      title: '【Mask #05】ディープPウェル注入（電子を跳ね返す深い電気の床）',
      analogy: 'ブロック3-C開幕！ 画素の奥底にホウ素の頑丈な電気の床を敷き、電子を下へ逃がさない',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <!-- Left: MeV Boron Ion Beam Building Deep P-Well Floor -->
        <rect x="26" y="84" width="398" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="225" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">⚡ MeV級ホウ素（B⁺）でシリコン奥底に床を形成</text>
        <!-- Ion Beam Descending -->
        ${[110, 175, 240, 305, 360]
          .map((x) => `<line x1="${x}" y1="118" x2="${x}" y2="254" stroke="#7c3aed" stroke-width="2.2" stroke-dasharray="5 3" marker-end="url(#f415-arrPurple)"/>`)
          .join('')}
        <!-- Silicon Bulk + Deep P-Well Floor -->
        <rect x="48" y="156" width="354" height="156" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <rect x="48" y="256" width="354" height="44" fill="#7c3aed" fill-opacity="0.82"/>
        <text x="225" y="282" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">ディープPウェル床（高エネルギーホウ素・電子を跳ね返す！）</text>
        <!-- Electron bouncing upward -->
        <path d="M 190,236 Q 225,256 260,214" fill="none" stroke="#e11d48" stroke-width="2.8" marker-end="url(#f415-arrRed)"/>
        <circle cx="190" cy="232" r="9" fill="#0284c7"/>
        <text x="190" y="236" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">e⁻</text>
        <text x="296" y="206" font-size="9.4" font-weight="800" fill="#9f1239">赤色光の電子を上へ押し戻す！</text>

        <!-- Right: Equipment & Accuracy KPIs -->
        ${drawKpiBox(442, 84, 252, 74, '加速エネルギー＆ドーズ精度', '10keV〜3MeV / ±0.5%以内', '住友重機械 / AMAT / Axcelis', '#7c3aed')}
        ${drawCompareFrame(442, 170, 252, 162, '電気の床がないとどうなる？', '#e11d48', '#fff1f2')}
        <text x="568" y="220" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">奥深くで生まれた赤色電子が</text>
        <text x="568" y="238" text-anchor="middle" font-size="10" font-weight="800" fill="#be123c">基板の下・隣画素へ逃走！</text>
        ${drawPill(462, 256, 212, 'Pウェル床 → 赤色感度アップ', true)}
        ${drawPill(462, 292, 212, '床抜け → 感度低下＆色濁り', false)}
      `,
      cards: [
        { label: 'ブロック3-C 1/12枚目', line1: 'ここから12連続イオン注入が開幕', line2: 'まず画素全体の電気の床を構築', accent: '#7c3aed' },
        { label: '主要装置・精度', line1: '住友重機械 / AMAT / Axcelis', line2: 'MeV級ホウ素・ドーズ±0.5%以内', accent: '#0284c7' },
        { label: '写真への効果', line1: '深部で生まれた赤色光の電子を', line2: '下へ逃がさずPDへ押し戻す', accent: '#e11d48' },
      ],
    }),

  fab4_m06_pixel_iso_pbarrier: () =>
    wrapFab3HdSvg({
      badge: 'F4-16',
      stepTag: 'Mask #06 / P03-097–108',
      title: '【Mask #06】画素分離P型電気障壁注入（上・中段ポテンシャル壁）',
      analogy: '隣画素との国境に、見えない「電気の反発フェンス」を何段にも重ねて二重ロック',
      accent: '#8b5cf6',
      accentSoft: '#f5f3ff',
      body: `
        <!-- Left: Multi-Tier Energy Stacking Along Pixel Boundary -->
        <rect x="26" y="84" width="414" height="248" rx="10" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="233" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">🧱 多段エネルギーホウ素注入で隙間のない電気の壁を積む</text>
        <rect x="48" y="130" width="160" height="176" rx="4" fill="#dbeafe" stroke="#0284c7"/>
        <rect x="258" y="130" width="160" height="176" rx="4" fill="#dcfce7" stroke="#16a34a"/>
        <text x="128" y="156" text-anchor="middle" font-size="10.4" font-weight="800" fill="#075985">画素A（満タン電子）</text>
        <text x="338" y="156" text-anchor="middle" font-size="10.4" font-weight="800" fill="#14532d">隣りの画素B</text>
        <!-- Stacked 3 Energy Bands of P-Type Electrical Wall -->
        <rect x="210" y="130" width="46" height="54" rx="4" fill="#a78bfa" stroke="#6d28d9"/>
        <text x="233" y="161" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">上段P</text>
        <rect x="210" y="188" width="46" height="56" rx="4" fill="#8b5cf6" stroke="#5b21b6"/>
        <text x="233" y="220" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">中段P</text>
        <rect x="210" y="248" width="46" height="58" rx="4" fill="#6d28d9" stroke="#4c1d95"/>
        <text x="233" y="281" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">下段P</text>
        <!-- Electron repelled -->
        <path d="M 164,212 Q 204,218 164,236" fill="none" stroke="#0284c7" stroke-width="2.4" marker-end="url(#f416-arrBlue)"/>
        <text x="124" y="226" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1e40af">電気バリアで跳ね返す!</text>

        <!-- Right: Potential Energy Mountain Chart -->
        <rect x="456" y="84" width="238" height="248" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
        <text x="575" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">📈 電気の「谷と山」イメージ</text>
        <path d="M 476,226 L 540,226 Q 554,226 560,152 Q 575,134 590,152 Q 596,226 610,226 L 674,226" fill="none" stroke="#7c3aed" stroke-width="3.2"/>
        <text x="506" y="216" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0284c7">画素Aの谷</text>
        <text x="644" y="216" text-anchor="middle" font-size="9.4" font-weight="800" fill="#16a34a">画素Bの谷</text>
        <text x="575" y="130" text-anchor="middle" font-size="9.6" font-weight="800" fill="#7c3aed">高い電気の山!</text>
        ${drawPill(476, 254, 198, '電気クロストークを根絶', true)}
        ${drawPill(476, 290, 198, '隙間あり→明るい色が滲む', false)}
      `,
      cards: [
        { label: '物理＋電気の二重城壁', line1: 'DTI物理壁に加えP型ホウ素を多段注入', line2: '上中下段スキマゼロで隣画素を遮断', accent: '#8b5cf6' },
        { label: '加工タイプ・工程', line1: 'Mask #06 / P03-097〜108(12工程)', line2: '中〜高エネルギーホウ素多段注入', accent: '#0284c7' },
        { label: '写真への効果', line1: '強い光を浴びても隣画素へ電子が', line2: '漏れず鮮やかな色分離をキープ', accent: '#e11d48' },
      ],
    }),

  fab4_m07_periph_nwell: () =>
    wrapFab3HdSvg({
      badge: 'F4-17',
      stepTag: 'Mask #07 / P03-109–120',
      title: '【Mask #07】周辺Nウェル / 画素Nウェル注入（PMOSの専用部屋）',
      analogy: 'センサーの額縁（周辺駆動回路）で働くPMOSトランジスタ用のN型マンション区画',
      accent: '#2563eb',
      accentSoft: '#eff6ff',
      body: `
        <!-- Left: Chip Floorplan showing Pixel Core vs Periphery PMOS N-Well -->
        <rect x="26" y="84" width="388" height="248" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="220" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#1e40af">🏢 周辺駆動回路のCMOS断面（PMOS用Nウェル形成）</text>
        <rect x="46" y="140" width="166" height="148" rx="6" fill="#93c5fd" stroke="#2563eb" stroke-width="2"/>
        <text x="129" y="170" text-anchor="middle" font-size="11" font-weight="900" fill="#1e3a8a">Nウェル（Mask #07）</text>
        <text x="129" y="190" text-anchor="middle" font-size="9.6" font-weight="700" fill="#1e40af">高エネルギー リン(P)注入</text>
        <rect x="74" y="210" width="110" height="54" rx="6" fill="#ffffff" stroke="#2563eb"/>
        <text x="129" y="234" text-anchor="middle" font-size="10" font-weight="800" fill="#1e40af">PMOSトランジスタ</text>
        <text x="129" y="252" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">行ドライバ・高速駆動</text>

        <rect x="228" y="140" width="166" height="148" rx="6" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="311" y="170" text-anchor="middle" font-size="10.8" font-weight="800" fill="#5b21b6">Pウェル（NMOS側）</text>
        <rect x="256" y="210" width="110" height="54" rx="6" fill="#ffffff" stroke="#7c3aed"/>
        <text x="311" y="234" text-anchor="middle" font-size="10" font-weight="800" fill="#5b21b6">NMOSとペア動作</text>
        <text x="311" y="252" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">低消費電力CMOS回路</text>
        <text x="220" y="314" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1e3a8a">レトログレード濃度でラッチアップ（大電流ショート）防止！</text>

        <!-- Right KPI & Failure Card -->
        ${drawKpiBox(432, 84, 262, 74, '注入原子・工程', 'リン（P）高エネルギー注入', 'Mask #07 / P03-109〜120(12工程)', '#2563eb')}
        ${drawCompareFrame(432, 170, 262, 162, 'Nウェル設計が不完全だと？', '#e11d48', '#fff1f2')}
        <text x="563" y="220" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">周辺高速ドライバが誤動作・</text>
        <text x="563" y="238" text-anchor="middle" font-size="10" font-weight="800" fill="#be123c">ラッチアップや横シマノイズ！</text>
        ${drawPill(456, 256, 214, '堅牢Nウェル → 毎秒120コマ安定', true)}
        ${drawPill(456, 292, 214, '分離不足 → 行駆動ノイズ発生', false)}
      `,
      cards: [
        { label: 'PMOSが住むN型の部屋', line1: '高エネルギーリン注入でNウェル構築', line2: 'NMOSと組み高速CMOS回路を形成', accent: '#2563eb' },
        { label: '役割と設置領域', line1: '画素アレイ周囲の行ドライバ・制御部', line2: 'グローバルシャッター同時駆動の要', accent: '#0284c7' },
        { label: '信頼性の確保', line1: '深いレトログレード構造により', line2: 'ラッチアップや横シマ誤動作を防止', accent: '#e11d48' },
      ],
    }),

  fab4_m08_pixel_pwell_nmos: () =>
    wrapFab3HdSvg({
      badge: 'F4-18',
      stepTag: 'Mask #08 / P03-121–132',
      title: '【Mask #08】画素Pウェル注入（4T画素トランジスタ専用事務所）',
      analogy: '光バケツのすぐ隣に「転送・リセット・増幅・選択」の4人の係員が働く部屋を作る',
      accent: '#4f46e5',
      accentSoft: '#eef2ff',
      body: `
        <!-- 4T Pixel Transistor Room Schematic -->
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#3730a3">🏠 画素Pウェルの中に並ぶ「4T（4トランジスタ）」係員たち</text>
        ${[
          { x: 42, title: '① 転送 (TG)', role: '電子を汲み出す水門', col: '#0284c7' },
          { x: 146, title: '② リセット (RST)', role: 'カップを0に初期化', col: '#d97706' },
          { x: 250, title: '③ 増幅 (SF)', role: '微弱電圧をマイク増幅', col: '#059669' },
          { x: 354, title: '④ 選択 (SEL)', role: '読み出す行を選択', col: '#7c3aed' },
        ]
          .map(
            (t) => `
          <rect x="${t.x}" y="128" width="84" height="94" rx="8" fill="#ffffff" stroke="${t.col}" stroke-width="1.6"/>
          <rect x="${t.x}" y="128" width="84" height="24" rx="8" fill="${t.col}"/>
          <text x="${t.x + 42}" y="144" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">${t.title}</text>
          <text x="${t.x + 42}" y="176" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0f172a">${t.role.slice(0, 6)}</text>
          <text x="${t.x + 42}" y="192" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0f172a">${t.role.slice(6)}</text>
          <text x="${t.x + 42}" y="212" text-anchor="middle" font-size="8.4" font-weight="800" fill="${t.col}">NMOS</text>`
          )
          .join('')}
        <!-- Unified Pixel P-Well Foundation -->
        <rect x="42" y="232" width="396" height="82" rx="8" fill="#6366f1" fill-opacity="0.88"/>
        <text x="240" y="264" text-anchor="middle" font-size="11.4" font-weight="900" fill="#ffffff">画素Pウェル（Mask #08：ホウ素 中エネルギー注入）</text>
        <text x="240" y="286" text-anchor="middle" font-size="9.6" font-weight="700" fill="#e0e7ff">3.3V高耐圧＆超低ノイズ専用プロファイル（90nm〜65nm CIS設計）</text>

        <!-- Right Summary -->
        ${drawKpiBox(468, 84, 226, 74, '注入原子・工程', 'ホウ素（B）中エネルギー', 'Mask #08 / P03-121〜132(12工程)', '#4f46e5')}
        ${drawCompareFrame(468, 170, 226, 162, '画素Pウェルが狂うと？', '#e11d48', '#fff1f2')}
        <text x="581" y="220" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">転送オフ時に電子が漏れたり</text>
        <text x="581" y="238" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">画素ごとの感度ムラが発生！</text>
        ${drawPill(484, 256, 194, '専用Pウェル → 均質＆低雑音', true)}
        ${drawPill(484, 292, 194, '濃度ムラ → 画面ザラつき', false)}
      `,
      cards: [
        { label: '4T係員の専用部屋', line1: '転送・リセット・増幅・選択の', line2: '4NMOSが住む画素Pウェルを構築', accent: '#4f46e5' },
        { label: 'CIS専用チューニング', line1: '周辺回路とは別プロファイルで', line2: '2.8〜3.3V高耐圧＆低リーク設計', accent: '#0284c7' },
        { label: '画質への影響', line1: '数千万画素すべての動作を揃え', line2: '固定パターンノイズと漏れを抑制', accent: '#e11d48' },
      ],
    }),

  fab4_m09_pixel_vt_lownoise: () =>
    wrapFab3HdSvg({
      badge: 'F4-19',
      stepTag: 'Mask #09 / P03-133–144',
      title: '【Mask #09】画素トランジスタVt調整＆超低RTNノイズ注入',
      analogy: '電子1個の声を拾う超高性能マイク（増幅Tr）の雑音を極限まで静める精密調律',
      accent: '#059669',
      accentSoft: '#ecfdf5',
      body: `
        <!-- Left: RTN Random Blinking Noise Comparison -->
        ${drawCompareFrame(26, 84, 326, 248, '✅ 精密Vt / 埋め込みチャネル：漆黒で静か！', '#059669', '#f0fdf4')}
        <rect x="46" y="126" width="286" height="96" rx="8" fill="#0f172a"/>
        <text x="189" y="150" text-anchor="middle" font-size="9.8" font-weight="800" fill="#34d399">暗所 ISO 12800 出力波形（超フラット！）</text>
        <polyline points="62,190 100,188 140,191 180,189 220,190 260,188 314,190" fill="none" stroke="#34d399" stroke-width="2.6"/>
        <text x="189" y="246" text-anchor="middle" font-size="9.8" font-weight="800" fill="#065f46">電子の通り道を界面の傷から数nm下へ逃がす</text>
        <text x="189" y="264" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">低エネルギー ホウ素(B) / インジウム(In) ±0.5%</text>
        ${drawPill(78, 286, 222, '読み出しノイズ 1電子級へ！', true)}

        <!-- Right: Bad RTN Blinking Noise -->
        ${drawCompareFrame(368, 84, 326, 248, '❌ 調整不足：暗部でピクセルがチラチラ点滅（RTN）', '#e11d48', '#fff1f2')}
        <rect x="388" y="126" width="286" height="96" rx="8" fill="#0f172a"/>
        <text x="531" y="150" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fda4af">ランダムテレグラフノイズ（RTN階段波形！）</text>
        <polyline points="404,200 444,200 444,166 496,166 496,200 532,200 532,166 570,166 570,200 612,200 612,166 656,166" fill="none" stroke="#fb7185" stroke-width="2.6"/>
        <text x="531" y="246" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">界面トラップに電子が捕獲→放出を繰返す</text>
        <text x="531" y="264" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">暗部で点がランダム点滅し高感度画質が劣化</text>
        ${drawPill(418, 286, 226, '夜景動画・ISO高感度がザラザラ', false)}
      `,
      cards: [
        { label: 'ソースフォロワの調律', line1: '低エネルギーB / In精密チャネル注入', line2: '画素増幅アンプの閾値Vtを最適化', accent: '#059669' },
        { label: 'RTNノイズとは？', line1: '暗部で1画素がチラチラ点滅する雑音', line2: 'チャネル設計とゲート膜で徹底低減', accent: '#0284c7' },
        { label: '写真への効果', line1: 'ISO 6400〜12800でも滑らかで', line2: 'クリアな暗部階調を引き出す', accent: '#e11d48' },
      ],
    }),

  fab4_m10_periph_vt_adjust: () =>
    wrapFab3HdSvg({
      badge: 'F4-20',
      stepTag: 'Mask #10 / P03-145–156',
      title: '【Mask #10】周辺回路Vt調整注入（高速スイッチ＆省電力化）',
      analogy: '毎秒120コマ連写を操る司令塔（周辺駆動回路）のスイッチON/OFF電圧をピタリ調整',
      accent: '#0891b2',
      accentSoft: '#ecfeff',
      body: `
        <!-- Split Chart: Pixel vs Periphery Dual Strategy -->
        <rect x="26" y="84" width="388" height="248" rx="10" fill="#ecfeff" stroke="#0891b2" stroke-width="1.5"/>
        <text x="220" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#155e75">⚡ なぜ Mask #09(画素) と #10(周辺) を分けるのか？</text>
        <!-- Pixel Box -->
        <rect x="44" y="128" width="166" height="148" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
        <text x="127" y="150" text-anchor="middle" font-size="10.2" font-weight="800" fill="#059669">Mask #09 画素側</text>
        <text x="127" y="176" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0f172a">• 2.8〜3.3V 駆動</text>
        <text x="127" y="198" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0f172a">• 超低RTN・低1/f</text>
        <text x="127" y="220" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0f172a">• アナログ静粛性</text>
        <text x="127" y="254" text-anchor="middle" font-size="9" font-weight="800" fill="#059669">「静けさ最優先」</text>
        <!-- Periphery Box -->
        <rect x="230" y="128" width="166" height="148" rx="8" fill="#ffffff" stroke="#0891b2" stroke-width="1.8"/>
        <text x="313" y="150" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0891b2">Mask #10 周辺側</text>
        <text x="313" y="176" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0f172a">• 1.2〜1.8V 低電圧</text>
        <text x="313" y="198" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0f172a">• ピコ秒級高速ON/OFF</text>
        <text x="313" y="220" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0f172a">• 待機リーク発熱抑制</text>
        <text x="313" y="254" text-anchor="middle" font-size="9" font-weight="800" fill="#0891b2">「爆速＆省エネ最優先」</text>
        <text x="220" y="310" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">1枚のウェーハに相反する2つの性格を完璧共存！</text>

        <!-- Right: Vt Window & Thermal Link -->
        ${drawKpiBox(432, 84, 262, 74, '対象回路と調整精度', '周辺NMOS / PMOS Vt調整', 'Mask #10 / 低エネルギー注入', '#0891b2')}
        <rect x="432" y="170" width="262" height="162" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.4"/>
        <text x="563" y="194" text-anchor="middle" font-size="10.6" font-weight="800" fill="#9a3412">🌡 周辺回路の発熱＝暗電流の敵！</text>
        <text x="563" y="222" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0f172a">Vtが低すぎる → 待機電流が漏れて発熱</text>
        <text x="563" y="242" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0f172a">Vtが高すぎる → 高速連写が間に合わない</text>
        ${drawPill(454, 264, 218, '適正Vt → 低発熱＆高速スキャン', true)}
        ${drawPill(454, 298, 218, '発熱上昇 → 全画面ノイズ悪化', false)}
      `,
      cards: [
        { label: '周辺回路の最適化', line1: '行デコーダ・転送ドライバの', line2: 'NMOS/PMOS ON/OFF電圧を正確に調整', accent: '#0891b2' },
        { label: '加工条件・工程', line1: 'Mask #10 / P03-145〜156(12工程)', line2: '低エネルギー注入でドーズ厳密制御', accent: '#0284c7' },
        { label: '画質への隠れた貢献', line1: '周辺回路の待機発熱を抑えることで', line2: 'センサー温度上昇による暗電流を防止', accent: '#ea580c' },
      ],
    }),

  fab4_m11_pd_deep_red_mev: () =>
    wrapFab3HdSvg({
      badge: 'F4-21',
      stepTag: 'Mask #11 / 数MeV赤PD',
      title: '【Mask #11】PD第1段：最深部N型 MeV級超高エネルギー注入（赤色光用）',
      analogy: '赤い光は奥4.0µmまで潜る！ 数百万ボルトの「原子マシンガン」で深海バケツの底を撃つ',
      accent: '#e11d48',
      accentSoft: '#fff1f2',
      body: `
        <!-- Left: RGB Absorption Depth Physics Diagram (0.49 / 1.73 / 4.0 µm!) -->
        <rect x="26" y="84" width="414" height="248" rx="10" fill="#fff1f2" stroke="#e11d48" stroke-width="1.6"/>
        <text x="233" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9f1239">🌈 なぜ多段注入が必要？ ── 色によるシリコン吸収深さ(1/α, 300K)</text>
        <!-- Depth Axis -->
        <line x1="66" y1="126" x2="66" y2="310" stroke="#475569" stroke-width="2"/>
        <text x="58" y="136" text-anchor="end" font-size="8.6" font-weight="800" fill="#334155">0µm</text>
        <text x="58" y="162" text-anchor="end" font-size="8.6" font-weight="800" fill="#0284c7">0.5</text>
        <text x="58" y="212" text-anchor="end" font-size="8.6" font-weight="800" fill="#16a34a">1.7</text>
        <text x="58" y="294" text-anchor="end" font-size="8.6" font-weight="800" fill="#e11d48">4.0µm</text>

        <!-- Silicon Block with 3 Color Penetration Depths -->
        <rect x="74" y="130" width="348" height="180" rx="4" fill="#1e293b"/>
        <!-- Blue 450nm -> 0.49 µm -->
        <line x1="124" y1="112" x2="124" y2="156" stroke="#38bdf8" stroke-width="4" marker-end="url(#f421-arrBlue)"/>
        <rect x="86" y="156" width="76" height="22" rx="4" fill="#38bdf8" fill-opacity="0.28" stroke="#38bdf8"/>
        <text x="124" y="170" text-anchor="middle" font-size="9" font-weight="800" fill="#bae6fd">青 450nm: 0.49µm</text>
        <!-- Green 550nm -> 1.73 µm -->
        <line x1="234" y1="112" x2="234" y2="206" stroke="#4ade80" stroke-width="4" marker-end="url(#f421-arrGreen)"/>
        <rect x="190" y="206" width="88" height="22" rx="4" fill="#4ade80" fill-opacity="0.28" stroke="#4ade80"/>
        <text x="234" y="220" text-anchor="middle" font-size="9" font-weight="800" fill="#bbf7d0">緑 550nm: 1.73µm</text>
        <!-- Red 650nm -> 4.0 µm (HIGHLIGHTED!) -->
        <line x1="350" y1="112" x2="350" y2="264" stroke="#fb7185" stroke-width="5" marker-end="url(#f421-arrRed)"/>
        <rect x="284" y="264" width="130" height="36" rx="6" fill="#e11d48" stroke="#fda4af" stroke-width="1.6"/>
        <text x="349" y="280" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">🔴 赤 650nm: 4.0µm!</text>
        <text x="349" y="294" text-anchor="middle" font-size="8.6" font-weight="700" fill="#ffe4e6">Mask #11 数MeV直撃!</text>

        <!-- Right: Multi-MeV Machine Gun Accelerator -->
        ${drawKpiBox(456, 84, 238, 76, '超高エネルギー加速器', 'リン P⁺/P⁺⁺/P⁺⁺⁺ 数MeV', 'Axcelis Purion XE / 住友重機械', '#e11d48')}
        <rect x="456" y="172" width="238" height="160" rx="10" fill="#ffffff" stroke="#e11d48" stroke-width="1.4"/>
        <text x="575" y="194" text-anchor="middle" font-size="10.4" font-weight="800" fill="#9f1239">🛡 厚膜レジスト壁が必須！</text>
        <text x="575" y="216" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">数百万ボルトのリン原子は通常の</text>
        <text x="575" y="232" text-anchor="middle" font-size="9.2" font-weight="700" fill="#334155">レジストを軽々突き抜けてしまう!</text>
        <text x="575" y="250" text-anchor="middle" font-size="9.2" font-weight="800" fill="#be123c">→ CIS専用の超厚膜レジストで遮蔽</text>
        ${drawPill(476, 266, 198, '深さ3–5µm丸ごと電子バケツ', true)}
        ${drawPill(476, 298, 198, '不足→赤色感度＆DR激減', false)}
      `,
      cards: [
        { label: '赤色光は青の8倍深い', line1: '450nm=0.49µm / 550nm=1.73µm', line2: '650nm赤は4.0µm奥で電子になる', accent: '#e11d48' },
        { label: '数MeV原子マシンガン', line1: 'Axcelis Purion XE / 住友重機械', line2: 'P+/P++/P+++多価イオンで3〜5µmへ', accent: '#0284c7' },
        { label: '写真への効果', line1: '夕焼け・肌色・赤い花の豊かな階調', line2: '深い体積が白飛び耐性(DR)を拡大', accent: '#d97706' },
      ],
    }),

  fab4_m12_pd_mid_green_n: () =>
    wrapFab3HdSvg({
      badge: 'F4-22',
      stepTag: 'Mask #12 / 中深部緑PD',
      title: '【Mask #12】PD第2段：中深部N型高エネルギー注入（緑色光＆電位階段）',
      analogy: '解像感の主役「緑の光（1.73µm）」を受け止め、底から上へ電子を運ぶ2階エレベーター',
      accent: '#16a34a',
      accentSoft: '#f0fdf4',
      body: `
        <!-- Left: Vertical Graded Potential Elevator -->
        <rect x="26" y="84" width="406" height="248" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
        <text x="229" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#14532d">🛗 深部(赤) → 中深部(緑) → 出口へ昇る「電位の階段」</text>
        <!-- Left: Cross Section Stack -->
        <rect x="46" y="128" width="164" height="184" rx="4" fill="#334155"/>
        <rect x="58" y="182" width="140" height="52" rx="6" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
        <text x="128" y="206" text-anchor="middle" font-size="10.2" font-weight="900" fill="#14532d">🟢 中深部PD (Mask #12)</text>
        <text x="128" y="222" text-anchor="middle" font-size="8.8" font-weight="700" fill="#14532d">緑 550nm / 1.73µm</text>
        <rect x="58" y="240" width="140" height="54" rx="6" fill="#fda4af" stroke="#e11d48"/>
        <text x="128" y="271" text-anchor="middle" font-size="9.6" font-weight="800" fill="#881337">🔴 最深部PD (Mask #11)</text>
        <!-- Upward Electron Arrow -->
        <line x1="128" y1="258" x2="128" y2="148" stroke="#fde047" stroke-width="3.2" marker-end="url(#f422-arrAmber)"/>

        <!-- Right: Smooth Staircase vs Pocket Trap -->
        <rect x="226" y="128" width="192" height="184" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="322" y="148" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f172a">ポテンシャル勾配（下→上）</text>
        <path d="M 248,284 Q 300,248 396,162" fill="none" stroke="#16a34a" stroke-width="3" marker-end="url(#f422-arrGreen)"/>
        <text x="324" y="206" text-anchor="middle" font-size="9.4" font-weight="800" fill="#15803d">滑らかな坂道！</text>
        <text x="324" y="222" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">電子が自然に上へ昇る</text>
        <path d="M 248,284 Q 290,296 318,266 Q 344,292 396,246" fill="none" stroke="#e11d48" stroke-width="2" stroke-dasharray="4 3"/>
        <text x="324" y="298" text-anchor="middle" font-size="8.8" font-weight="800" fill="#be123c">❌ くぼみができると残像発生</text>

        <!-- Right KPIs -->
        ${drawKpiBox(448, 84, 246, 76, '中深部リン注入条件', '数百keV 〜 1MeV 級', 'Mask #12 / P03-169〜180(12工程)', '#16a34a')}
        <rect x="448" y="172" width="246" height="160" rx="10" fill="#ffffff" stroke="#16a34a" stroke-width="1.4"/>
        <text x="571" y="196" text-anchor="middle" font-size="10.6" font-weight="800" fill="#14532d">🌿 緑色画素はベイヤーの50%!</text>
        <text x="571" y="222" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">人間の目が最も敏感な輝度・解像感の</text>
        <text x="571" y="239" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">主役である550nm光を1.73µmで捕獲</text>
        ${drawPill(468, 258, 206, '滑らか接続 → 残像ゼロ高速転送', true)}
        ${drawPill(468, 294, 206, '段差あり → 転送残り＆DR減', false)}
      `,
      cards: [
        { label: '緑色光(550nm)の主戦場', line1: '吸収深さ約1.73µmに中段PDを形成', line2: 'ベイヤー配列の半分を占める要', accent: '#16a34a' },
        { label: 'エネルギー・つなぎ目', line1: 'リン数百keV〜1MeV級高エネルギー', line2: '最深部と浅部を無段差で橋渡し', accent: '#0284c7' },
        { label: '写真への効果', line1: 'くぼみ(ポケット)をなくすことで', line2: '暗所残像を防ぎ解像感を高める', accent: '#e11d48' },
      ],
    }),

  fab4_m13_pd_shallow_blue_tilt: () =>
    wrapFab3HdSvg({
      badge: 'F4-23',
      stepTag: 'Mask #13 / ±0.05°チルト',
      title: '【Mask #13】PD第3段：浅部＆斜めチルトN型注入（青色光＆転送出口）',
      analogy: 'ウェーハを±0.05°の超精密角度で傾け、水門の真下まで電子の出口滑り台を繋ぐ！',
      accent: '#0284c7',
      accentSoft: '#e0f2fe',
      body: `
        <!-- Left: Precision Tilt Ion Implantation Diagram -->
        <rect x="26" y="84" width="414" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="233" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#075985">📐 精密チルト（斜め）注入：レジストの影を潜り込み水門へ接続！</text>
        <!-- Resist Mask Block -->
        <rect x="278" y="146" width="128" height="44" rx="4" fill="#f59e0b" stroke="#b45309"/>
        <text x="342" y="172" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">レジスト壁（TG側）</text>
        <!-- Silicon + Stacked RGB PD -->
        <rect x="48" y="190" width="358" height="122" fill="#334155"/>
        <rect x="66" y="256" width="194" height="44" rx="4" fill="#fecdd3" fill-opacity="0.7"/>
        <rect x="66" y="226" width="194" height="28" rx="4" fill="#bbf7d0" fill-opacity="0.8"/>
        <!-- Shallow Blue PD Reaching UNDER the Resist Edge! -->
        <polygon points="66,192 260,192 318,208 260,224 66,224" fill="#38bdf8" stroke="#ffffff" stroke-width="1.6"/>
        <text x="166" y="212" text-anchor="middle" font-size="9.6" font-weight="900" fill="#0c4a6e">🔵 浅部PD（青 0.49µm）→ 転送ゲート下へ!</text>
        <!-- Tilted Ion Beams -->
        ${[100, 150, 200, 250]
          .map((x) => `<line x1="${x - 36}" y1="122" x2="${x + 22}" y2="196" stroke="#0284c7" stroke-width="2.4" marker-end="url(#f423-arrBlue)"/>`)
          .join('')}
        <text x="150" y="136" font-size="9.4" font-weight="800" fill="#0369a1">斜めチルト角 ±0.05°！</text>

        <!-- Right: 0.1° Error Impact -->
        ${drawKpiBox(456, 84, 238, 76, 'チルト角度制御精度', '±0.05° 以内（超精密！）', 'リン / ヒ素 中エネルギー斜め注入', '#0284c7')}
        ${drawCompareFrame(456, 172, 238, 160, '角度がわずか0.1°狂うと？', '#e11d48', '#fff1f2')}
        <text x="575" y="220" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">転送ゲートとの重なりがズレて</text>
        <text x="575" y="238" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">電子の転送残り（残像）が発生！</text>
        ${drawPill(476, 256, 198, '±0.05°制御 → RGB 3段完成', true)}
        ${drawPill(476, 292, 198, '0.1°ズレ → 残像＆白飛び悪化', false)}
      `,
      cards: [
        { label: '青色光＆出口ロビー', line1: '青(450nm)は浅い0.49µmで吸収', line2: '斜め注入で水門直下へ滑り台接続', accent: '#0284c7' },
        { label: '驚異の角度精度', line1: 'Mask #13 / リン・ヒ素チルト注入', line2: '傾き制御 ±0.05° [業界標準][論文]', accent: '#4f46e5' },
        { label: 'RGB 3段バケツ連結', line1: 'Mask #11(赤)→#12(緑)→#13(青)', line2: '全可視光を1粒残らず掴む骨格完成', accent: '#059669' },
      ],
    }),

  fab4_m14_dualpixel_pd_split: () =>
    wrapFab3HdSvg({
      badge: 'F4-24',
      stepTag: 'Mask #14 [確認済み]',
      title: '【Mask #14】PD内部電位勾配＆キヤノン流デュアルピクセル中央分離',
      analogy: '1画素のど真ん中に絶妙な電気の仕切り板を立て、A像・B像の2つの目で瞬時にピント測距！',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        <!-- Left: Dual Pixel A/B Split + EOS R1 Cross Type -->
        <rect x="26" y="84" width="406" height="248" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
        <text x="229" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#92400e">👁 1画素の中に2つの瞳（A像 / B像）＆ EOS R1 クロス分割</text>
        <!-- Microlens Arch -->
        <path d="M 74,154 Q 178,108 282,154 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="178" y="142" text-anchor="middle" font-size="9.4" font-weight="800" fill="#075985">1個のマイクロレンズ</text>
        <!-- Left PD (A) & Right PD (B) with Center P-Barrier -->
        <rect x="66" y="168" width="102" height="104" rx="6" fill="#fecdd3" stroke="#e11d48" stroke-width="1.5"/>
        <text x="117" y="216" text-anchor="middle" font-size="12" font-weight="900" fill="#9f1239">A像 PD</text>
        <text x="117" y="236" text-anchor="middle" font-size="8.8" font-weight="700" fill="#881337">左瞳の光</text>
        <rect x="188" y="168" width="102" height="104" rx="6" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="239" y="216" text-anchor="middle" font-size="12" font-weight="900" fill="#075985">B像 PD</text>
        <text x="239" y="236" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0c4a6e">右瞳の光</text>
        <!-- Center Separation P-Wall (Mask #14!) -->
        <rect x="170" y="168" width="16" height="104" rx="3" fill="#f59e0b" stroke="#92400e" stroke-width="1.4"/>
        <text x="178" y="294" text-anchor="middle" font-size="9.6" font-weight="900" fill="#b45309">▲ Mask #14 中央P型分離壁</text>
        <text x="178" y="312" text-anchor="middle" font-size="9" font-weight="700" fill="#475569">AF時＝AとBの差 ／ 記録時＝A＋B合算!</text>

        <!-- EOS R1 Cross-Type Inset -->
        <rect x="308" y="148" width="110" height="156" rx="8" fill="#ffffff" stroke="#d97706" stroke-width="1.4"/>
        <text x="363" y="168" text-anchor="middle" font-size="9.4" font-weight="800" fill="#92400e">EOS R1 クロス</text>
        <rect x="326" y="180" width="34" height="44" rx="4" fill="#fecdd3" stroke="#e11d48"/>
        <rect x="364" y="180" width="34" height="44" rx="4" fill="#bae6fd" stroke="#0284c7"/>
        <text x="363" y="238" text-anchor="middle" font-size="8.2" font-weight="800" fill="#475569">左右分割</text>
        <rect x="326" y="248" width="72" height="20" rx="4" fill="#bbf7d0" stroke="#16a34a"/>
        <rect x="326" y="272" width="72" height="20" rx="4" fill="#fde68a" stroke="#d97706"/>
        <text x="363" y="302" text-anchor="middle" font-size="8.2" font-weight="800" fill="#b45309">＋上下分割!</text>

        <!-- Right: Ultimate Balance Trade-Off -->
        ${drawCompareFrame(448, 84, 246, 248, '⚖️ 中央分離壁の究極バランス設計', '#d97706', '#ffffff')}
        <text x="571" y="136" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">厚すぎても薄すぎてもNG!</text>
        <rect x="466" y="148" width="210" height="52" rx="8" fill="#fff1f2" stroke="#e11d48"/>
        <text x="571" y="168" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">❌ 壁が厚すぎると…</text>
        <text x="571" y="188" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">PDの面積が減って感度が低下</text>
        <rect x="466" y="210" width="210" height="52" rx="8" fill="#fff1f2" stroke="#e11d48"/>
        <text x="571" y="230" text-anchor="middle" font-size="9.6" font-weight="800" fill="#be123c">❌ 壁が薄すぎると…</text>
        <text x="571" y="250" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">A像とB像が混ざりAFがボケる</text>
        ${drawPill(466, 276, 210, '精密多段注入で最強AF＆画質', true)}
      `,
      cards: [
        { label: 'EOS R1 クロス構造', line1: '左右に加え上下分割画素も形成', line2: '縦線・横線どちらにも爆速合焦 [確認済み]', accent: '#d97706' },
        { label: '通常画素での役割', line1: '画素端から転送ゲートへ向かう', line2: '横方向の電位滑り台(勾配)を作成', accent: '#0284c7' },
        { label: '画質とAFの両立', line1: '専用AF欠損画素ゼロで100%受光', line2: '分離壁の極薄最適化が命 [業界標準]', accent: '#e11d48' },
      ],
    }),

  fab4_m15_antibloom_overflow: () =>
    wrapFab3HdSvg({
      badge: 'F4-25',
      stepTag: 'Mask #15 / P03-205–216',
      title: '【Mask #15】アンチブルーミング＆オーバーフロー安全弁注入',
      analogy: '洗面台の排水口！ 太陽やヘッドライトで電子が満タンでも隣画素へ溢れさせない',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <!-- Left: Sink Overflow Metaphor Cross-Section -->
        <rect x="26" y="84" width="406" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <text x="229" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9a3412">🚰 ポテンシャル堤防の高さ関係（安全排水の仕組み）</text>
        <!-- Left High Wall (to Neighbor Pixel) -->
        <rect x="52" y="130" width="54" height="164" rx="4" fill="#7c3aed"/>
        <text x="79" y="216" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">隣画素</text>
        <text x="79" y="232" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">高い壁</text>
        <!-- Center Full Photodiode Bucket -->
        <rect x="106" y="182" width="160" height="112" fill="#38bdf8" fill-opacity="0.72" stroke="#0284c7" stroke-width="1.6"/>
        <text x="186" y="230" text-anchor="middle" font-size="10.4" font-weight="900" fill="#0c4a6e">満タンの電子バケツ!</text>
        <text x="186" y="248" text-anchor="middle" font-size="9" font-weight="700" fill="#075985">☀️ 太陽・ヘッドライト</text>
        <!-- Right Slightly Lower Overflow Barrier -> Safe Drain -->
        <rect x="266" y="180" width="56" height="114" rx="4" fill="#ea580c"/>
        <text x="294" y="226" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">安全弁</text>
        <text x="294" y="242" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ffedd5">Mask #15</text>
        <!-- Safe Drain Sink -->
        <rect x="322" y="232" width="84" height="62" rx="4" fill="#059669"/>
        <text x="364" y="260" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">電源側へ</text>
        <text x="364" y="276" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">安全排水!</text>
        <!-- Overflow Arrow -->
        <path d="M 244,180 Q 294,148 358,226" fill="none" stroke="#ea580c" stroke-width="3" marker-end="url(#f425-arrAmber)"/>
        <text x="324" y="156" text-anchor="middle" font-size="9.2" font-weight="800" fill="#c2410c">溢れた分だけ安全排出!</text>

        <!-- Right: Night Streetlamp Blooming Comparison -->
        ${drawCompareFrame(448, 84, 246, 248, '🌃 夜景の街灯を撮った違い', '#0f172a', '#0f172a')}
        <!-- Top OK Streetlamp -->
        <circle cx="520" cy="158" r="14" fill="#fef08a"/>
        <circle cx="520" cy="158" r="7" fill="#ffffff"/>
        <text x="614" y="154" text-anchor="middle" font-size="9.8" font-weight="800" fill="#4ade80">✅ 安全弁あり</text>
        <text x="614" y="170" text-anchor="middle" font-size="8.8" font-weight="600" fill="#cbd5e1">点光源がクッキリ!</text>
        <line x1="464" y1="202" x2="678" y2="202" stroke="#334155" stroke-dasharray="4 3"/>
        <!-- Bottom NG Blooming Bleed -->
        <ellipse cx="520" cy="256" rx="44" ry="26" fill="#ffffff" fill-opacity="0.32"/>
        <ellipse cx="520" cy="256" rx="26" ry="18" fill="#fef08a" fill-opacity="0.72"/>
        <circle cx="520" cy="256" r="10" fill="#ffffff"/>
        <text x="616" y="250" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fb7185">❌ 堤防ズレ</text>
        <text x="616" y="266" text-anchor="middle" font-size="8.6" font-weight="600" fill="#fecdd3">白く滲む(ブルーミング)</text>
        <text x="571" y="314" text-anchor="middle" font-size="8.8" font-weight="700" fill="#fde047">逆に低すぎると満タン前に漏れDR減!</text>
      `,
      cards: [
        { label: '堤防の高さ制御', line1: '隣壁 ＞ 安全弁 ＞ PDバケツの順', line2: '局所P/B精密ドーズで数mV級調整', accent: '#ea580c' },
        { label: '失敗すると写真に？', line1: '高すぎる→街灯周りが白く滲む', line2: '低すぎる→満タン前に漏れDR減少', accent: '#e11d48' },
        { label: '次世代LOFICへの発展', line1: '溢れた電子を捨てずに横の巨大容量へ', line2: '溜める超DR画素へも応用される基礎', accent: '#059669' },
      ],
    }),

  fab4_m16_gs_mem_dcg_implant: () =>
    wrapFab3HdSvg({
      badge: 'F4-26',
      stepTag: 'Mask #16 [確認済み]',
      title: '【Mask #16】機能画素注入（α9 III GSメモリノード / DCG補助容量）',
      analogy: '全画素を一瞬凍結する「遮光一時保管庫(GS)」や「大小切替カップ(DCG)」を増設',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        <!-- Left Panel: Global Shutter (α9 III VDGS) -->
        ${drawCompareFrame(26, 84, 326, 248, '⚡ グローバルシャッター（α9 III VDGS）[確認済み]', '#d97706', '#fffbeb')}
        <rect x="44" y="130" width="114" height="106" rx="8" fill="#dbeafe" stroke="#0284c7" stroke-width="1.5"/>
        <text x="101" y="168" text-anchor="middle" font-size="10.4" font-weight="800" fill="#075985">フォトダイオード</text>
        <text x="101" y="188" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">全画素 同時露光!</text>
        <text x="101" y="206" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">1/80,000秒凍結</text>
        <line x1="160" y1="184" x2="196" y2="184" stroke="#d97706" stroke-width="2.8" marker-end="url(#f426-arrAmber)"/>
        <rect x="200" y="130" width="134" height="106" rx="8" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
        <text x="267" y="156" text-anchor="middle" font-size="10" font-weight="900" fill="#92400e">Mask #16 一時保管庫</text>
        <text x="267" y="176" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">高濃度N型＋遮蔽Pウェル</text>
        <text x="267" y="198" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0f172a">読出待機中の漏れ</text>
        <text x="267" y="214" text-anchor="middle" font-size="8.8" font-weight="800" fill="#e11d48">(暗電流・PLS)を極小化</text>
        ${drawPill(62, 256, 254, '歪み完全ゼロ＆全速ストロボ同調！', true)}
        <text x="189" y="310" text-anchor="middle" font-size="8.8" font-weight="700" fill="#78350f">高エネルギー遮蔽ウェルで迷光電子を徹底ブロック</text>

        <!-- Right Panel: Dual Conversion Gain (DCG) -->
        ${drawCompareFrame(368, 84, 326, 248, '🎚 デュアルコンバージョンゲイン（DCG補助容量）', '#0284c7', '#f0f9ff')}
        <rect x="386" y="130" width="136" height="106" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="454" y="152" text-anchor="middle" font-size="10" font-weight="800" fill="#5b21b6">🌙 暗所：小カップ</text>
        <rect x="434" y="172" width="40" height="44" rx="4" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.6"/>
        <text x="454" y="200" text-anchor="middle" font-size="9" font-weight="800" fill="#5b21b6">高ゲイン</text>
        <rect x="538" y="130" width="138" height="106" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
        <text x="607" y="152" text-anchor="middle" font-size="10" font-weight="800" fill="#0369a1">☀️ 明所：大カップ合体</text>
        <rect x="556" y="172" width="102" height="44" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>
        <text x="607" y="200" text-anchor="middle" font-size="9" font-weight="800" fill="#075985">FD ＋ Mask #16補助</text>
        ${drawPill(404, 256, 254, '暗部ノイズ極小＋明部白飛び耐性！', true)}
        <text x="531" y="310" text-anchor="middle" font-size="8.8" font-weight="700" fill="#075985">1画素の中で高ISOと広DRをスイッチ切替 [推定]</text>
      `,
      cards: [
        { label: 'α9 III GSの心臓部', line1: '画素内に電圧/電荷の一時保管庫', line2: '遮蔽Pウェルで待機漏れ(PLS)防止', accent: '#d97706' },
        { label: 'DCG高DRの仕組み', line1: '暗所は小FD、明所は補助容量合体', line2: '高感度と白飛び耐性を1画素で両立', accent: '#0284c7' },
        { label: '機種専用レシピ', line1: 'Mask #16 / P03-217〜228(12工程)', line2: '高濃度N＋遮蔽P [確認済み][推定]', accent: '#7c3aed' },
      ],
    }),

  fab4_p229_pd_recovery_anneal: () =>
    wrapFab3HdSvg({
      badge: 'F4-27',
      stepTag: 'P03-229〜248 (20工程)',
      title: '注入ダメージ回復アニール・スクリーン酸化膜剥離・超洗浄＆KLA検査',
      analogy: '12連続マシンガンで揺れた結晶格子を1,000℃の炉で元通りに治す「結晶の整体治療」',
      accent: '#e11d48',
      accentSoft: '#fff1f2',
      body: `
        <!-- Left: Damaged Lattice -> 1,000°C Healing -> Perfect Crystal -->
        ${drawCompareFrame(26, 84, 204, 248, '① 12回注入直後（傷あり）', '#e11d48', '#fff1f2')}
        ${[0, 1, 2, 3]
          .map((r) =>
            [0, 1, 2, 3, 4]
              .map((c) => {
                const jitter = ((r * 7 + c * 11) % 7) - 3;
                const isDefect = r === 1 && c === 2;
                return `<circle cx="${58 + c * 34 + jitter}" cy="${148 + r * 34 + jitter}" r="${isDefect ? 7 : 5}" fill="${isDefect ? '#e11d48' : '#64748b'}"/>`;
              })
              .join('')
          )
          .join('')}
        <text x="128" y="294" text-anchor="middle" font-size="9.4" font-weight="800" fill="#be123c">格子が乱れ残留欠陥あり!</text>
        <text x="128" y="312" text-anchor="middle" font-size="8.8" font-weight="700" fill="#475569">このままでは永遠の白キズに</text>

        <!-- Center: 950-1,050°C Furnace + DHF Strip + KLA -->
        <rect x="246" y="84" width="228" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.6"/>
        <text x="360" y="106" text-anchor="middle" font-size="10.8" font-weight="800" fill="#9a3412">🔥 20非露光工程のフルコース</text>
        ${[
          { y: 124, n: '1', t: '結晶回復アニール (950–1,050℃)', s: '縦型炉/RTAで欠陥完治＆拡散抑制', c: '#ea580c' },
          { y: 186, n: '2', t: 'スクリーン酸化膜 DHF剥離', s: '弾除け犠牲膜をSCREEN洗浄機で除去', c: '#0284c7' },
          { y: 248, n: '3', t: '超洗浄＆KLA表面欠陥検査', s: '欠陥ゼロを確認しブロック3-Dへ！', c: '#059669' },
        ]
          .map(
            (st) => `
          <rect x="260" y="${st.y}" width="200" height="52" rx="8" fill="#ffffff" stroke="${st.c}" stroke-width="1.3"/>
          <circle cx="278" cy="${st.y + 26}" r="11" fill="${st.c}"/>
          <text x="278" y="${st.y + 30}" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">${st.n}</text>
          <text x="296" y="${st.y + 21}" font-size="9.2" font-weight="800" fill="#0f172a">${st.t}</text>
          <text x="296" y="${st.y + 39}" font-size="8.2" font-weight="600" fill="#475569">${st.s}</text>`
          )
          .join('')}

        <!-- Right: Healed Perfect Diamond Lattice -->
        ${drawCompareFrame(490, 84, 204, 248, '② 回復後：完璧な単結晶！', '#059669', '#f0fdf4')}
        ${[0, 1, 2, 3]
          .map((r) =>
            [0, 1, 2, 3, 4]
              .map((c) => {
                const isDopant = r === 1 && c === 2;
                return `<circle cx="${522 + c * 34}" cy="${148 + r * 34}" r="${isDopant ? 6.5 : 5}" fill="${isDopant ? '#059669' : '#334155'}"/>`;
              })
              .join('')
          )
          .join('')}
        ${drawPill(508, 286, 168, 'ブロック3-C 164工程完走!', true)}
      `,
      cards: [
        { label: '白キズ根絶の20工程', line1: '950〜1,050℃で結晶の傷を完治', line2: '不純物の過剰拡散も抑える絶妙制御', accent: '#e11d48' },
        { label: '主要装置・流れ', line1: '縦型炉/RTA → SCREEN洗浄(DHF)', line2: '→ KLA光学欠陥検査 [業界標準]', accent: '#0284c7' },
        { label: '最大の山場 3-C完了', line1: '12マスク(144)＋非露光20＝164工程', line2: '極上のPD結晶で次の水門建設へ！', accent: '#059669' },
      ],
    }),
};
