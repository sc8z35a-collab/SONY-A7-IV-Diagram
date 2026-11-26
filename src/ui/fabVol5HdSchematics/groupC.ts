import { wrapFab3HdSvg, drawCompareFrame, drawKpiBox, drawPill } from '../fabVol3HdSchematics/shared';

/**
 * Vol.5 Ultra-HD 720x470 Beginner-Visual Posters — Group C (F5-26 – F5-32):
 * Block 4-D (P04-135–P04-178, 44 Steps): M5 Thick Top Cu + Al-Cu Pad (Cu5+Al1) + Pre-Bond Keysight WAT Gate (Masks #34–#36).
 */
export const FAB5_HD_GROUP_C: Record<string, () => string> = {
  fab5_p135_m5_thick_imd: () =>
    wrapFab3HdSvg({
      badge: 'F5-26',
      stepTag: 'P04-135〜136 低反り',
      title: 'M5用厚膜絶縁膜（500〜1,000nm・ウェーハ反りワープ厳格制御）',
      analogy: 'ぶ厚い5階道路を支えつつ、300mmウェーハがポテチのように反るのを防ぐ応力バランス床',
      accent: '#0ea5e9',
      accentSoft: '#f0f9ff',
      body: `
        ${drawCompareFrame(26, 84, 326, 248, '✅ 応力バランス制御：真っ平らで直接接合OK！', '#059669', '#ecfdf5')}
        <rect x="48" y="176" width="282" height="44" rx="4" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.6"/>
        <text x="189" y="202" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0c4a6e">厚膜IMD 500〜1,000nm（低応力）</text>
        <rect x="48" y="220" width="282" height="24" fill="#475569"/>
        <line x1="42" y1="176" x2="336" y2="176" stroke="#059669" stroke-width="2.4" stroke-dasharray="5 3"/>
        <text x="189" y="156" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">引張応力と圧縮応力をピタリ相殺！</text>
        ${drawPill(78, 290, 222, '3D Cu-Cu接合で全面ピタリ密着', true)}

        ${drawCompareFrame(368, 84, 326, 248, '❌ 膜応力が強すぎると：ウェーハが大きく反る！', '#e11d48', '#fff1f2')}
        <path d="M 396,196 Q 531,264 666,196 L 666,222 Q 531,290 396,222 Z" fill="#fca5a5" stroke="#e11d48" stroke-width="2"/>
        <text x="531" y="170" text-anchor="middle" font-size="10.4" font-weight="900" fill="#be123c">💥 ウェーハ反り（ワープ）発生！</text>
        <text x="531" y="266" text-anchor="middle" font-size="9.2" font-weight="800" fill="#9f1239">端が浮いてロジックウェーハと貼り合わせ不能</text>
        ${drawPill(418, 290, 226, 'PECVD応力制御が積層成否の鍵', false)}
      `,
      cards: [
        { label: '厚膜M5の収容床', line1: 'SiCNキャップ＋厚さ500〜1,000nm', line2: '大電流幹線M5を収める最上階絶縁層', accent: '#0ea5e9' },
        { label: '反り(ワープ)対策', line1: 'PECVDのRF応力バランスを精密調整', line2: '300mmウェーハの反りを極小化', accent: '#059669' },
        { label: '失敗するとどうなる？', line1: 'ウェーハが反ると次ブロックCMPや', line2: 'Cu-Cu直接接合で外周が浮いて全滅', accent: '#e11d48' },
      ],
    }),

  fab5_m34_via4_heavy: () =>
    wrapFab3HdSvg({
      badge: 'F5-27',
      stepTag: 'Mask #34 / Via 4',
      title: '【Mask #34】ビア4（V4）大電流用・太めビア群エッチング',
      analogy: '4階メッシュと5階幹線の大動脈を直径数百nmの太い縦穴群で繋ぎ発熱を防ぐ',
      accent: '#7c3aed',
      accentSoft: '#f5f3ff',
      body: `
        <rect x="26" y="84" width="414" height="248" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
        <text x="233" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#5b21b6">⚡ 大電流ビア4（直径数百nm）：ジュール発熱 P ＝ I²R を極小化！</text>
        <rect x="46" y="142" width="374" height="118" fill="#bae6fd"/>
        ${[92, 162, 232, 302, 372]
          .map((x) => `<rect x="${x - 20}" y="142" width="40" height="118" fill="#ea580c" stroke="#7c3aed" stroke-width="1.8"/><text x="${x}" y="205" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">V4</text>`)
          .join('')}
        <rect x="46" y="260" width="374" height="52" fill="#475569"/>
        <text x="233" y="290" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fde047">太径V4を多数並列配置 → 大電流でもチップが熱くならない！</text>

        ${drawKpiBox(456, 84, 238, 78, 'マスク＆サイズ', 'Mask #34 / 径 数百 nm', 'KrFスキャナー・エッチャー (12工程)', '#7c3aed')}
        ${drawCompareFrame(456, 174, 238, 158, 'ビア抵抗が高いと写真に？', '#e11d48', '#fff1f2')}
        <text x="575" y="220" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9f1239">高速連写・8K動画時の発熱が増え</text>
        <text x="575" y="238" text-anchor="middle" font-size="10.2" font-weight="900" fill="#be123c">暗電流ノイズが急上昇！</text>
        ${drawPill(476, 278, 198, '太ビア並列 → 低温＆低ノイズ', true)}
      `,
      cards: [
        { label: '大動脈を繋ぐ太ビア', line1: '直径数百nmの太めV4を多数並列配置', line2: 'M4メッシュとM5幹線を極低抵抗接続', accent: '#7c3aed' },
        { label: '発熱＝暗電流の敵', line1: '抵抗を下げてジュール熱(I²R)を抑制', line2: '長時間8K動画でも熱ノイズ悪化防止', accent: '#e11d48' },
        { label: '高効率KrF露光', line1: 'Mask #34 / P04-137〜148(12工程)', line2: '高スループットKrFスキャナーで量産', accent: '#0284c7' },
      ],
    }),

  fab5_m35_m5_top_trunk: () =>
    wrapFab3HdSvg({
      badge: 'F5-28',
      stepTag: 'Mask #35 / M5最上幹線',
      title: '【Mask #35】第5銅配線（M5）：厚膜トップ幹線電源＆高速クロック',
      analogy: 'フルサイズ36×24mm全域へ大電流と同期クロックを一気に配る片側6車線の最上階幹線',
      accent: '#ea580c',
      accentSoft: '#fff7ed',
      body: `
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.6"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#9a3412">🛣 5階最上層 M5 厚膜銅ダマシン幹線（3大ハイウェイ機能）</text>
        ${[
          { y: 128, t: '① 太い幹線電源バス (VDD / VSS)', s: 'フルサイズ36×24mm中央まで電圧降下ゼロで給電!', c: '#ea580c' },
          { y: 192, t: '② 高速クロック幹線 (H-Tree同期)', s: '全列14-bit ADCへジッター極小の高速クロック配信!', c: '#0284c7' },
          { y: 256, t: '③ 周辺外部パッド引き回し配線', s: '上層のAl-Cuパッド・SLVS-EC端子へ最短ルート直結!', c: '#059669' },
        ]
          .map(
            (b) => `
          <rect x="44" y="${b.y}" width="388" height="54" rx="8" fill="#ffffff" stroke="${b.c}" stroke-width="1.6"/>
          <rect x="44" y="${b.y}" width="12" height="54" rx="4" fill="${b.c}"/>
          <text x="68" y="${b.y + 22}" font-size="10.2" font-weight="900" fill="${b.c}">${b.t}</text>
          <text x="68" y="${b.y + 42}" font-size="9.2" font-weight="700" fill="#334155">${b.s}</text>`
          )
          .join('')}

        ${drawKpiBox(468, 84, 226, 78, 'マスク＆構成位置', 'Mask #35 / Cu 5層目頂点', 'P04-149〜160 (KrF厚膜ダマシン)', '#ea580c')}
        ${drawCompareFrame(468, 174, 226, 158, '幹線が細いと写真にどう出る？', '#e11d48', '#fff1f2')}
        <text x="581" y="220" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9f1239">大判36×24mmの中央部で電圧低下</text>
        <text x="581" y="238" text-anchor="middle" font-size="10" font-weight="900" fill="#be123c">画面中央が暗くなるシェーディング!</text>
        ${drawPill(488, 278, 186, '極太M5幹線 → 全画面均一輝度', true)}
      `,
      cards: [
        { label: 'Cu 5層目の最上幹線', line1: '大電流電源・高速クロック・パッド線', line2: 'ぶ厚い銅でフルサイズ全域へ供給', accent: '#ea580c' },
        { label: '画質シェーディング防止', line1: '36×24mmの中央まで電圧を保ち', line2: '周辺と中央の輝度・色ムラを根絶', accent: '#059669' },
        { label: 'ソニーIEDM構成の要', line1: '画素側Cu 5層＋Al 1層構成の', line2: '銅配線最上階を担う幹線 [確認済み]', accent: '#0284c7' },
      ],
    }),

  fab5_p161_m5_fill_cmp: () =>
    wrapFab3HdSvg({
      badge: 'F5-29',
      stepTag: 'P04-161〜162 Cu5完了',
      title: 'M5厚膜Cuスーパーフィリング＆低ディッシングCMP・防錆洗浄',
      analogy: '極太5階幹線へ銅を厚く埋め、太線ほど凹みやすいディッシングを抑えて銅5層を完全開通！',
      accent: '#d97706',
      accentSoft: '#fffbeb',
      body: `
        ${drawCompareFrame(26, 84, 336, 248, '✅ 厚膜Cu低ディッシングCMP：極太線もピシッと平坦！', '#059669', '#ecfdf5')}
        <rect x="48" y="164" width="292" height="96" fill="#bae6fd"/>
        <rect x="86" y="164" width="216" height="72" fill="#ea580c" stroke="#7c3aed" stroke-width="1.8"/>
        <line x1="42" y1="164" x2="346" y2="164" stroke="#059669" stroke-width="2.6"/>
        <text x="194" y="204" text-anchor="middle" font-size="10.4" font-weight="900" fill="#ffffff">極太 M5 厚膜銅幹線（断面積100%確保）</text>
        <text x="194" y="146" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">荏原めっき/CMP＋SCREEN BTA防錆洗浄</text>
        ${drawPill(78, 290, 232, '🎉 5階建て銅高速道路(M1–M5)開通！', true)}

        ${drawCompareFrame(378, 84, 316, 248, '❌ 過大ディッシング：太線中央が深く凹む！', '#e11d48', '#fff1f2')}
        <rect x="400" y="164" width="272" height="96" fill="#bae6fd"/>
        <path d="M 436,164 Q 536,216 636,164 L 636,236 L 436,236 Z" fill="#ea580c" stroke="#be123c" stroke-width="1.6"/>
        <text x="536" y="148" text-anchor="middle" font-size="9.8" font-weight="900" fill="#be123c">▼ 中央が大きく皿状にえぐれる!</text>
        <text x="536" y="220" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">断面積減→抵抗増＆発熱増!</text>
        ${drawPill(424, 290, 224, 'さらに上層Alや接合面がうねる', false)}
      `,
      cards: [
        { label: 'Cu 5層完全開通！', line1: 'M1→M2→M3→M4→M5の全5階層', line2: '厚膜Cuめっき・アニール・CMP完了', accent: '#d97706' },
        { label: '太線ディッシング抑制', line1: '低圧・高選択スラリーで極太幹線の', line2: '中央えぐれ(ディッシング)を最小化', accent: '#059669' },
        { label: '主要装置', line1: '荏原製作所 めっき/CMP装置', line2: 'SCREEN防錆洗浄機 [業界標準]', accent: '#0284c7' },
      ],
    }),

  fab5_p163_alcu_pad_sputter: () =>
    wrapFab3HdSvg({
      badge: 'F5-30',
      stepTag: 'P04-163〜164 Cu5+Al1',
      title: '層間膜＋アルミ合金（Al-Cu 0.5〜1.0µm）スパッタ成膜',
      analogy: '銅5層の上に銀色のアルミ合金1層を載せ、外部金線パッドと裏面赤外線目印の土台に！',
      accent: '#64748b',
      accentSoft: '#f1f5f9',
      body: `
        <rect x="26" y="84" width="388" height="248" rx="10" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
        <text x="220" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">🥈 なぜ銅5層の上に「アルミ合金(Al-Cu) 1層」を載せる？</text>
        <!-- Sputter Target + Al-Cu Sheet over M5 -->
        <rect x="128" y="122" width="184" height="24" rx="6" fill="#94a3b8" stroke="#334155"/>
        <text x="220" y="138" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">Al-Cu ターゲット（AMAT/ULVAC PVD）</text>
        ${[156, 220, 284].map((x) => `<line x1="${x}" y1="148" x2="${x}" y2="188" stroke="#0284c7" stroke-width="2.4" marker-end="url(#f530-arrBlue)"/>`).join('')}
        <rect x="52" y="192" width="336" height="44" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
        <text x="220" y="218" text-anchor="middle" font-size="10.4" font-weight="900" fill="#0f172a">Al-Cu アルミ合金層（0.5〜1.0 µm）</text>
        <rect x="52" y="240" width="336" height="44" rx="4" fill="#ea580c"/>
        <text x="220" y="266" text-anchor="middle" font-size="9.8" font-weight="800" fill="#ffffff">下層：M1〜M5 銅5層立体高速道路</text>
        <text x="220" y="312" text-anchor="middle" font-size="9.4" font-weight="800" fill="#059669">ソニーIEDM 2017報告「画素側 Cu 5層＋Al 1層」に整合！</text>

        <rect x="430" y="84" width="264" height="248" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="562" y="108" text-anchor="middle" font-size="10.8" font-weight="800" fill="#1e40af">✨ Al-Cu 層が担う3つの大役</text>
        ${[
          { y: 128, t: '1. 外部金線ボンディングパッド', s: '金線(Au)と強固に密着し腐食しない!' },
          { y: 188, t: '2. 裏面IRアライメント基準', s: 'シリコン透過赤外線をクッキリ反射!' },
          { y: 248, t: '3. 接合前WATテストパッド', s: 'Keysightプローブ針を直接当てる端子' },
        ]
          .map(
            (r) => `
          <rect x="446" y="${r.y}" width="232" height="50" rx="8" fill="#ffffff" stroke="#93c5fd"/>
          <text x="460" y="${r.y + 20}" font-size="9.6" font-weight="800" fill="#1e3a8a">${r.t}</text>
          <text x="460" y="${r.y + 39}" font-size="8.8" font-weight="600" fill="#475569">${r.s}</text>`
          )
          .join('')}
      `,
      cards: [
        { label: 'ソニーCu5＋Al1構成', line1: '銅5層の上にAl-Cu 0.5〜1.0µm成膜', line2: 'IEDM 2017論文報告と整合 [確認済み]', accent: '#64748b' },
        { label: '金線＆IR反射の相性', line1: '酸化しやすい銅に代わりAl-Cuが', line2: '金線ボンディングと裏面IR反射に最適', accent: '#2563eb' },
        { label: '密着・組成不良リスク', line1: 'Al-Cuの組成や密着が狂うと後工程の', line2: 'ワイヤーボンディング不着不良に直結', accent: '#e11d48' },
      ],
    }),

  fab5_m36_al_pad_ir_mark: () =>
    wrapFab3HdSvg({
      badge: 'F5-31',
      stepTag: 'Mask #36 / Al＆IR目印',
      title: '【Mask #36】Al再配線／外部パッド・裏面IR目印・WATパッド加工',
      analogy: 'アルミは塩素ガスで削れる！ 外部電極と裏返したとき赤外線で覗く十字目印を削り出す',
      accent: '#475569',
      accentSoft: '#f1f5f9',
      body: `
        <rect x="26" y="84" width="424" height="248" rx="10" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
        <text x="238" y="106" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">🎯 塩素系メタルエッチングで3種の重要パターンを同時形成！</text>
        <!-- Left: Wirebond Pads -->
        <rect x="44" y="128" width="124" height="148" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.4"/>
        <text x="106" y="148" text-anchor="middle" font-size="9.6" font-weight="800" fill="#075985">① 外部電極パッド</text>
        ${[166, 200, 234].map((y) => `<rect x="64" y="${y}" width="84" height="22" rx="4" fill="#94a3b8" stroke="#334155"/>`).join('')}
        <!-- Center: BSI IR Crosshair Mark -->
        <rect x="180" y="128" width="124" height="148" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.6"/>
        <text x="242" y="148" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fbbf24">② 裏面IR目印</text>
        <rect x="235" y="168" width="14" height="72" rx="2" fill="#fde047"/>
        <rect x="206" y="197" width="72" height="14" rx="2" fill="#fde047"/>
        <text x="242" y="260" text-anchor="middle" font-size="8.2" font-weight="700" fill="#e2e8f0">赤外線透過アライメント</text>
        <!-- Right: WAT Test Pads -->
        <rect x="316" y="128" width="116" height="148" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.4"/>
        <text x="374" y="148" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">③ WATパッド</text>
        <rect x="336" y="176" width="76" height="68" rx="6" fill="#dcfce7" stroke="#059669" stroke-dasharray="4 2"/>
        <text x="374" y="214" text-anchor="middle" font-size="9" font-weight="800" fill="#047857">切りしろ上TEG</text>
        <text x="238" y="308" text-anchor="middle" font-size="9.4" font-weight="800" fill="#334155">KrF/i線露光機 ＋ 塩素系ドライエッチャー（直後に脱塩素防食！）</text>

        ${drawCompareFrame(468, 84, 226, 248, '🔴 裏面IR目印がボヤけると？', '#e11d48', '#fff1f2')}
        <text x="581" y="140" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">裏返して薄化したあと</text>
        <text x="581" y="158" text-anchor="middle" font-size="9.8" font-weight="800" fill="#be123c">赤外線カメラで位置を覗く際</text>
        <text x="581" y="182" text-anchor="middle" font-size="9.4" font-weight="700" fill="#475569">カラーフィルターやマイクロレンズの</text>
        <text x="581" y="198" text-anchor="middle" font-size="9.4" font-weight="700" fill="#475569">重ね合わせがズレて色ズレ発生！</text>
        ${drawPill(486, 234, 190, '高コントラストAl十字で高精度', true)}
        ${drawPill(486, 274, 190, 'Mask #36 / P04-165〜176', true)}
      `,
      cards: [
        { label: 'アルミは直接エッチ可', line1: '銅と違い塩素プラズマで揮発除去', line2: '直後の脱塩素処理でアルミ腐食防止', accent: '#475569' },
        { label: 'BSI裏面への伏線', line1: '裏面薄化後に赤外線で覗き込む', line2: 'アライメント十字をここに仕込む！', accent: '#d97706' },
        { label: '外部端子＆WAT準備', line1: 'パッケージ金線接続の電極下地と', line2: '直後WATテスト用の針当てパッド形成', accent: '#059669' },
      ],
    }),

  fab5_p177_prebond_wat_gate: () =>
    wrapFab3HdSvg({
      badge: 'F5-32',
      stepTag: '★P04-177–78 WAT関所',
      title: '接合前・中間電気テスト（WAT最終関所 ── 道連れ廃棄を阻止！）',
      analogy: '高価な良品ロジックウェーハと合体する直前、不良の画素ウェーハを確実に弾く運命の関所！',
      accent: '#059669',
      accentSoft: '#ecfdf5',
      body: `
        <!-- Left: Keysight Parametric Probe Test -->
        <rect x="26" y="84" width="336" height="248" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
        <text x="194" y="106" text-anchor="middle" font-size="11" font-weight="800" fill="#065f46">🔬 Keysight パラメトリックテスター（針当て全項目チェック）</text>
        <!-- Probe Needles Touching Wafer -->
        <rect x="86" y="122" width="216" height="26" rx="6" fill="#0f172a"/>
        <text x="194" y="139" text-anchor="middle" font-size="9.4" font-weight="800" fill="#34d399">プローブカード針 → スクライブラインTEG</text>
        <line x1="126" y1="148" x2="164" y2="196" stroke="#d97706" stroke-width="2.4"/>
        <line x1="262" y1="148" x2="224" y2="196" stroke="#d97706" stroke-width="2.4"/>
        <ellipse cx="194" cy="208" rx="122" ry="22" fill="#475569" stroke="#059669" stroke-width="2"/>
        <text x="194" y="212" text-anchor="middle" font-size="9.6" font-weight="800" fill="#ffffff">画素ウェーハ（M1–M5＋Al 完了品）</text>
        <text x="194" y="254" text-anchor="middle" font-size="9.4" font-weight="800" fill="#065f46">① 4Tトランジスタ特性＆暗電流目安</text>
        <text x="194" y="274" text-anchor="middle" font-size="9.4" font-weight="800" fill="#065f46">② W釘〜M1–M5〜Al 全層配線＆ビア抵抗</text>
        ${drawPill(78, 294, 232, '規格合格品だけが次ブロック4-Eへ！', true)}

        <!-- Right: Why Pre-Bond WAT Saves Billions (No Collateral Scrap!) -->
        ${drawCompareFrame(378, 84, 316, 248, '💰 なぜ「貼り合わせる前」に絶対検査する？', '#e11d48', '#fff1f2')}
        <rect x="396" y="124" width="280" height="72" rx="8" fill="#ffffff" stroke="#e11d48" stroke-width="1.5"/>
        <text x="536" y="148" text-anchor="middle" font-size="9.8" font-weight="900" fill="#be123c">❌ 不良画素 ＋ 良品ロジック（超高額!）</text>
        <text x="536" y="168" text-anchor="middle" font-size="9.4" font-weight="800" fill="#9f1239">→ 良品ロジックまで丸ごと道連れ廃棄！</text>
        <text x="536" y="185" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">（720工程かけた最先端チップが全損）</text>

        <rect x="396" y="208" width="280" height="72" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
        <text x="536" y="232" text-anchor="middle" font-size="9.8" font-weight="900" fill="#065f46">✅ WAT合格画素 × WAT合格ロジック</text>
        <text x="536" y="252" text-anchor="middle" font-size="9.4" font-weight="800" fill="#047857">→ 良品同士だけ賢くペアリング接合！</text>
        <text x="536" y="269" text-anchor="middle" font-size="8.6" font-weight="600" fill="#065f46">ブロック4-D（44工程）完全クリア！</text>
        ${drawPill(424, 294, 224, '次：下階テラス4-E Cu-Cu接合面へ!', true)}
      `,
      cards: [
        { label: '道連れ廃棄を防ぐ関所', line1: '不良の画素ウェーハをここで弾き', line2: '高価な良品ロジックの全損を阻止！', accent: '#e11d48' },
        { label: '主要装置・検査項目', line1: 'キーサイト等パラメトリックテスター', line2: 'Tr特性・暗電流・全層抵抗を規格判定', accent: '#059669' },
        { label: 'ブロック4-D完走', line1: 'P04-135〜178（44工程）完了！', line2: 'いよいよ屋上Cu-Cu接合面仕上げへ', accent: '#7c3aed' },
      ],
    }),
};
