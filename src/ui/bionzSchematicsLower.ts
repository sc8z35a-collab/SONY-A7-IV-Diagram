import { PartExplanation } from '../assemblies/types';
import {
  comparePill,
  loupeRing,
  renderBionzDiagram,
  stepBadge,
} from './bionzSchematicsShared';

/**
 * High-precision, beginner-friendly 560x400 SVG schematics for BIONZ XR (XR32–XR46),
 * including 10 brand-new dedicated bespoke schematics for XR37–XR46!
 */
export function renderBionzLowerSvg(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // =========================================================================
    // XR32. Embedded Silicon Trench Capacitors (eSiCap) & Land-Side 01005 MLCCs
    // =========================================================================
    case 'xr_esicap_mlcc_decaps':
      return renderBionzDiagram({
        code: 'xr32',
        badge: 'XR32',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        accentDark: '#854d0e',
        title: '内蔵トレンチeSiCap ＆ 裏面01005 MLCC',
        metric: 'ナノ秒応答 超低ESL電源タンク',
        analogyLine1: 'チップの真下にびっしり並べた「超即応・電気のミニ給水タンク」です。',
        analogyLine2: 'AIや連写が10億分の1秒で急発進しても、電圧が1ミリも落ちないよう即給電します。',
        chipHow: '基板内蔵eSiCap＋裏面MLCC 24個',
        chipBenefit: '高負荷時も誤動作・ノイズゼロ',
        chipSpec: '3D深溝Si容量＋01005/0204',
        art: (p) => `
          <!-- Left: Vertical Cross-Section Showing Instant Spike Current Delivery -->
          <text x="172" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#854d0e">断面図：チップ直下0.5mmから即座に電気補給!</text>
          <!-- Silicon Die Demanding Sudden Spike Current -->
          <rect x="44" y="84" width="256" height="32" rx="5" fill="url(#${p}_teal)" stroke="#0f766e" stroke-width="1.4"/>
          <text x="172" y="104" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fff">BIONZ XR ダイ（AI/連写で瞬間大電流要求!）</text>

          <!-- ABF Package Substrate with Embedded eSiCap Inside -->
          <rect x="28" y="122" width="288" height="50" rx="5" fill="url(#${p}_pcb)"/>
          <!-- Embedded Murata 3D eSiCap inside Substrate -->
          <rect x="64" y="130" width="84" height="32" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.6"/>
          <text x="106" y="144" text-anchor="middle" font-size="8.6" font-weight="800" fill="#38bdf8">内蔵 eSiCap</text>
          <text x="106" y="156" text-anchor="middle" font-size="7.8" fill="#e2e8f0">3D深溝Siコンデンサ</text>
          <rect x="196" y="130" width="84" height="32" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.6"/>
          <text x="238" y="144" text-anchor="middle" font-size="8.6" font-weight="800" fill="#38bdf8">内蔵 eSiCap</text>
          <text x="238" y="156" text-anchor="middle" font-size="7.8" fill="#e2e8f0">超低ESL並列配置</text>

          <!-- Upward Lightning Current Supply Arrows -->
          ${[106, 172, 238]
            .map(
              (x) =>
                `<line x1="${x}" y1="184" x2="${x}" y2="118" stroke="#facc15" stroke-width="2.8" marker-end="url(#${p}_arr_gold)"/>`
            )
            .join('')}

          <!-- Land-Side 01005 / 0204 Low-ESL MLCC Courtyard Under Center + BGA Balls Outside -->
          ${[42, 62, 282, 302]
            .map((x) => `<circle cx="${x}" cy="186" r="7" fill="url(#${p}_solder)" stroke="#475569"/>`)
            .join('')}
          ${[112, 146, 180, 214]
            .map(
              (x) =>
                `<rect x="${x}" y="176" width="24" height="16" rx="2" fill="#d97706" stroke="#78350f"/><rect x="${x - 3}" y="176" width="5" height="16" fill="#cbd5e1"/><rect x="${x + 22}" y="176" width="5" height="16" fill="#cbd5e1"/>`
            )
            .join('')}
          <text x="172" y="208" text-anchor="middle" font-size="9.5" font-weight="800" fill="#92400e">中央空きエリアに 01005/0204 MLCC 24個を直付!</text>

          <!-- Voltage Droop Mini-Chart -->
          <rect x="28" y="218" width="288" height="54" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="40" y="234" font-size="9" font-weight="800" fill="#dc2626">× タンク遠いと電圧ガク落ち:</text>
          <path d="M 186 231 H 214 L 222 241 L 234 231 H 304" fill="none" stroke="#dc2626" stroke-width="2"/>
          <text x="40" y="256" font-size="9" font-weight="800" fill="#16a34a">○ 真下にタンクで0.75V安定:</text>
          <path d="M 186 253 H 304" fill="none" stroke="#16a34a" stroke-width="2.4"/>

          <!-- Right: Microscope Loupe of Murata 3D Deep-Trench eSiCap -->
          <clipPath id="${p}_loupe"><circle cx="436" cy="166" r="68"/></clipPath>
          <circle cx="436" cy="166" r="68" fill="#0f172a"/>
          <g clip-path="url(#${p}_loupe)">
            <!-- Deep Vertical Silicon Pores / Trenches -->
            ${Array.from({ length: 7 })
              .map((_, i) => {
                const tx = 382 + i * 16;
                return `<rect x="${tx}" y="128" width="9" height="82" rx="4" fill="#38bdf8" stroke="#facc15" stroke-width="1.4"/>`;
              })
              .join('')}
            <rect x="372" y="114" width="128" height="14" fill="url(#${p}_gold)"/>
            <text x="436" y="124" text-anchor="middle" font-size="8.2" font-weight="800" fill="#422006">上部 VDD 電極</text>
            <rect x="372" y="208" width="128" height="18" fill="url(#${p}_cu)"/>
            <text x="436" y="220" text-anchor="middle" font-size="8.2" font-weight="800" fill="#fff">下部 GND シリコン基板</text>
          </g>
          ${loupeRing(436, 166, 68, '拡大：3D深溝eSiCap', '#0284c7')}
          <text x="436" y="254" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">シリコンに無数の深い縦穴を掘り</text>
          <text x="436" y="269" text-anchor="middle" font-size="9.2" fill="#334155">表面積100倍→超薄型＆大容量!</text>
        `,
      });

    // =========================================================================
    // XR33. Top Ajinomoto Build-Up Film (ABF) Micro-Routing Layers
    // =========================================================================
    case 'xr_abf_top_buildup':
      return renderBionzDiagram({
        code: 'xr33',
        badge: 'XR33',
        accent: '#15803d',
        accentSoft: '#f0fdf4',
        accentDark: '#166534',
        title: '上側 味の素ビルドアップフィルム(ABF)層',
        metric: '9μm微細配線 / 8倍ピッチ変換',
        analogyLine1: '50μmの超極細チップの足を、基板で扱える400μm幅へ美しく広げる「立体インターチェンジ」です。',
        analogyLine2: '実は食品メーカー「味の素」の技術を応用した日本発の絶縁膜が世界シェアほぼ独占!',
        chipHow: 'SAP銅配線＋レーザー銅充填ビア',
        chipBenefit: '1万接点を極薄16mm角へ収容',
        chipSpec: 'AT&S ABF / L/S 9/12μm',
        art: (p) => `
          <!-- Cross-Section of 4-Layer ABF Fan-Out Pitch Translator -->
          <text x="206" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#166534">断面図：50μmの極密端子 → 400μm間隔へ多層ファンアウト</text>
          <!-- Top Narrow C4 Bumps from Die -->
          <rect x="116" y="84" width="180" height="22" rx="4" fill="url(#${p}_teal)"/>
          <text x="206" y="99" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fff">BIONZ XR ダイ（端子間隔 50μm）</text>
          ${[146, 170, 194, 218, 242, 266]
            .map((x) => `<circle cx="${x}" cy="112" r="4.5" fill="url(#${p}_cu)"/>`)
            .join('')}

          <!-- 4 Laminated ABF Dielectric Strata with Fanning Copper Traces & Stacked Laser Micro-Vias -->
          <rect x="28" y="118" width="356" height="106" rx="6" fill="#14532d" stroke="#16a34a" stroke-width="1.6"/>
          ${[144, 170, 196]
            .map((y) => `<line x1="30" y1="${y}" x2="382" y2="${y}" stroke="#22c55e" stroke-width="0.9" stroke-dasharray="6 3" opacity="0.65"/>`)
            .join('')}
          <!-- Fanning Copper Traces Step-by-Step Wider! -->
          <path d="M 146 118 V 134 H 66 V 224" fill="none" stroke="#facc15" stroke-width="2.4"/>
          <path d="M 170 118 V 156 H 122 V 224" fill="none" stroke="#fb923c" stroke-width="2.4"/>
          <path d="M 194 118 V 182 H 178 V 224" fill="none" stroke="#facc15" stroke-width="2.4"/>
          <path d="M 218 118 V 182 H 234 V 224" fill="none" stroke="#fb923c" stroke-width="2.4"/>
          <path d="M 242 118 V 156 H 290 V 224" fill="none" stroke="#facc15" stroke-width="2.4"/>
          <path d="M 266 118 V 134 H 346 V 224" fill="none" stroke="#fb923c" stroke-width="2.4"/>
          <!-- Laser Micro-Via Cones -->
          ${[
            [66, 144],
            [122, 170],
            [178, 196],
            [234, 196],
            [290, 170],
            [346, 144],
          ]
            .map(([vx, vy]) => `<circle cx="${vx}" cy="${vy}" r="4.5" fill="#fde047" stroke="#92400e" stroke-width="1"/>`)
            .join('')}
          <!-- Side Perimeter MLCCs Seated on Top ABF Shoulder -->
          ${[48, 76, 336, 364]
            .map((x) => `<rect x="${x - 8}" y="106" width="16" height="12" rx="2" fill="#d97706" stroke="#fef3c7"/>`)
            .join('')}
          <text x="62" y="101" text-anchor="middle" font-size="8.2" font-weight="800" fill="#92400e">周囲MLCC×44</text>

          <!-- Bottom Core Layer -->
          <rect x="28" y="224" width="356" height="22" rx="4" fill="#92400e"/>
          <text x="206" y="239" text-anchor="middle" font-size="9.6" font-weight="700" fill="#fef3c7">下側 BTガラスコア層へ（端子間隔 400μm ＝ 8倍に拡大!）</text>
          ${stepBadge(40, 134, '1', '#16a34a')}
          ${stepBadge(122, 170, '2', '#ca8a04')}

          <!-- Right: Key Points Panel -->
          <rect x="396" y="72" width="142" height="196" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.4"/>
          <text x="467" y="94" text-anchor="middle" font-size="10.4" font-weight="800" fill="#166534">ABFが凄い3つの理由</text>
          <rect x="406" y="104" width="122" height="46" rx="6" fill="#ffffff" stroke="#86efac"/>
          <text x="467" y="120" text-anchor="middle" font-size="9.4" font-weight="800" fill="#15803d">① 表面が超なめらか</text>
          <text x="467" y="136" text-anchor="middle" font-size="8.5" fill="#334155">9μmの極細銅線を</text>
          <text x="467" y="146" text-anchor="middle" font-size="8.5" fill="#334155">断線ゼロで描ける!</text>

          <rect x="406" y="158" width="122" height="46" rx="6" fill="#ffffff" stroke="#86efac"/>
          <text x="467" y="174" text-anchor="middle" font-size="9.4" font-weight="800" fill="#15803d">② レーザー極小穴</text>
          <text x="467" y="190" text-anchor="middle" font-size="8.5" fill="#334155">UVレーザーで穴を開け</text>
          <text x="467" y="200" text-anchor="middle" font-size="8.5" fill="#334155">純銅でぎっしり充填!</text>

          <rect x="406" y="212" width="122" height="46" rx="6" fill="#ffffff" stroke="#86efac"/>
          <text x="467" y="228" text-anchor="middle" font-size="9.4" font-weight="800" fill="#15803d">③ 日本発の必須素材</text>
          <text x="467" y="244" text-anchor="middle" font-size="8.5" fill="#334155">世界中の最新AIチップに</text>
          <text x="467" y="254" text-anchor="middle" font-size="8.5" fill="#334155">不可欠なビルドアップ膜</text>
          <text x="206" y="264" text-anchor="middle" font-size="9.6" font-weight="700" fill="#166534">SAP微細配線 × 4〜6層積層で高速信号のノイズも最小化</text>
        `,
      });

    // =========================================================================
    // XR34. Low-CTE Glass-Cloth BT-Resin Rigid Core & PTH Core Vias
    // =========================================================================
    case 'xr_bt_glass_core_pth':
      return renderBionzDiagram({
        code: 'xr34',
        badge: 'XR34',
        accent: '#92400e',
        accentSoft: '#fffbeb',
        accentDark: '#78350f',
        title: 'BTガラス繊維コア ＆ 樹脂充填PTH貫通柱',
        metric: '100本PTH貫通柱＋厚銅面',
        analogyLine1: '基板全体が反らないように支える「ガラス繊維の背骨」と、上下を結ぶ「銅の地下トンネル」です。',
        analogyLine2: 'トンネルの空洞を樹脂で平らに埋めることで、真上にそのまま極細配線を積めます。',
        chipHow: '織目ガラス繊維＋樹脂充填PTH',
        chipBenefit: '基板反り防止＆超安定電源GND',
        chipSpec: 'BT高Tgコア / 35μm厚銅面',
        art: (p) => `
          <!-- Left: Rigid Core Cross-Section with Thick Copper Planes & Resin-Plugged PTH -->
          <text x="172" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#78350f">断面図：背骨コアを貫通する銅めっきトンネル(PTH)</text>
          <!-- Upper ABF Hint -->
          <rect x="28" y="84" width="288" height="22" rx="3" fill="#16a34a" opacity="0.28" stroke="#16a34a" stroke-dasharray="4 2"/>
          <text x="172" y="99" text-anchor="middle" font-size="9.2" font-weight="700" fill="#166534">上側 ABF ビルドアップ層（XR33）</text>
          <!-- Top 35um Heavy Copper Plane -->
          <rect x="28" y="106" width="288" height="11" fill="url(#${p}_cu)"/>
          <!-- Woven Glass-Cloth BT Core Body -->
          <rect x="28" y="117" width="288" height="72" fill="#d97706" opacity="0.26" stroke="#92400e" stroke-width="1.5"/>
          <rect x="28" y="117" width="288" height="72" fill="url(#${p}_hatch)"/>
          <!-- Bottom 35um Heavy Copper Plane -->
          <rect x="28" y="189" width="288" height="11" fill="url(#${p}_cu)"/>
          <!-- Lower ABF Hint -->
          <rect x="28" y="200" width="288" height="22" rx="3" fill="#16a34a" opacity="0.28" stroke="#16a34a" stroke-dasharray="4 2"/>
          <text x="172" y="215" text-anchor="middle" font-size="9.2" font-weight="700" fill="#166534">下側 ABF ファンアウト層（XR35）</text>

          <!-- 4 Resin-Plugged PTH Copper Barrels Piercing Core -->
          ${[68, 138, 206, 276]
            .map(
              (x) => `
                <rect x="${x - 14}" y="102" width="28" height="7" rx="1" fill="url(#${p}_gold)"/>
                <rect x="${x - 14}" y="197" width="28" height="7" rx="1" fill="url(#${p}_gold)"/>
                <rect x="${x - 11}" y="106" width="22" height="94" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1"/>
                <rect x="${x - 6}" y="108" width="12" height="90" fill="#334155"/>
              `
            )
            .join('')}
          ${stepBadge(68, 152, '1', '#b45309')}
          ${stepBadge(138, 152, '2', '#334155')}
          <text x="172" y="242" text-anchor="middle" font-size="9.8" font-weight="800" fill="#78350f">① 厚銅35μm電源/GND面＋10×10＝100本の銅めっき貫通筒</text>
          <text x="172" y="259" text-anchor="middle" font-size="9.6" font-weight="700" fill="#334155">② 筒の中を黒エポキシで平坦充填し上にそのまま配線積層!</text>

          <!-- Right: Microscope Loupe of Woven E/T-Glass Cloth + PTH Top View -->
          <clipPath id="${p}_loupe"><circle cx="436" cy="166" r="68"/></clipPath>
          <circle cx="436" cy="166" r="68" fill="#fef3c7"/>
          <g clip-path="url(#${p}_loupe)">
            <!-- Woven Glass Fiber Bundles (Warp & Weft) -->
            ${[-48, -24, 0, 24, 48]
              .map(
                (d) => `
                  <rect x="366" y="${160 + d}" width="140" height="12" fill="#d97706" opacity="0.28"/>
                  <rect x="${430 + d}" y="96" width="12" height="140" fill="#b45309" opacity="0.28"/>
                `
              )
              .join('')}
            <!-- Concentric Top View of 1 Resin-Plugged PTH Via + Anti-Pad -->
            <circle cx="436" cy="166" r="34" fill="#fef3c7" stroke="#92400e" stroke-width="1.5" stroke-dasharray="3 2"/>
            <circle cx="436" cy="166" r="24" fill="url(#${p}_gold)" stroke="#92400e" stroke-width="1.5"/>
            <circle cx="436" cy="166" r="18" fill="url(#${p}_cu)"/>
            <circle cx="436" cy="166" r="11" fill="#1e293b"/>
            <text x="436" y="170" text-anchor="middle" font-size="8.2" font-weight="800" fill="#f8fafc">樹脂</text>
            <text x="436" y="124" text-anchor="middle" font-size="8.8" font-weight="800" fill="#78350f">織目ガラスクロス骨格</text>
            <text x="436" y="214" text-anchor="middle" font-size="8.6" font-weight="800" fill="#9a3412">銅めっき筒＋金パッド環</text>
          </g>
          ${loupeRing(436, 166, 68, '拡大：ガラス織目＆PTH', '#92400e')}
          <text x="436" y="254" text-anchor="middle" font-size="9.6" font-weight="800" fill="#78350f">ガラス繊維が熱による伸びを抑え</text>
          <text x="436" y="269" text-anchor="middle" font-size="9.2" fill="#92400e">245℃リフロー加熱でも反りゼロ!</text>
        `,
      });

    // =========================================================================
    // XR35. Bottom ABF Fan-Out, Taiyo PSR-4000 Green SR Mask & ENEPIG Pads
    // =========================================================================
    case 'xr_abf_bottom_solder_mask':
      return renderBionzDiagram({
        code: 'xr35',
        badge: 'XR35',
        accent: '#166534',
        accentSoft: '#f0fdf4',
        accentDark: '#14532d',
        title: '下側ABF・緑レジスト膜 ＆ ENEPIG金電極',
        metric: 'Ni/Pd/Au 3層めっき電極',
        analogyLine1: '1,400個ものハンダ球が隣とくっつかないよう仕切る「緑の防波堤」と「金色の受け皿」です。',
        analogyLine2: '銅の上へニッケル・パラジウム・金の3重めっきを施し、何年経ってもサビず強固に付きます。',
        chipHow: 'PSR-4000緑ダム＋ENEPIG 3層',
        chipBenefit: 'ショート皆無＆高強度ハンダ接合',
        chipSpec: 'Taiyo PSR-4000 / Ni-Pd-Au',
        art: (p) => `
          <!-- Left: Bottom ABF Cross-Section Showing Green Solder-Mask Dams Preventing Bridges -->
          <text x="172" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#166534">底面断面：緑の堤防(SR)がハンダ同士の合体を阻止!</text>
          <!-- Bottom ABF Substrate -->
          <rect x="28" y="88" width="288" height="44" rx="4" fill="#14532d"/>
          <text x="172" y="114" text-anchor="middle" font-size="10.2" font-weight="800" fill="#dcfce7">下側 ABF 多層ファンアウト層（上下対称で反り相殺）</text>
          <!-- Copper Pads + ENEPIG + Green Solder Mask Dam Bridges Between Them -->
          ${[64, 136, 208, 280]
            .map(
              (x) => `
                <rect x="${x - 22}" y="132" width="44" height="12" rx="2" fill="url(#${p}_gold)" stroke="#854d0e" stroke-width="1"/>
                <circle cx="${x}" cy="166" r="20" fill="url(#${p}_solder)" stroke="#475569" stroke-width="1.3"/>
                <text x="${x}" y="170" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">BGA球</text>
              `
            )
            .join('')}
          <!-- Raised Green PSR-4000 Solder Mask Dams Separating Every Ball! -->
          ${[28, 86, 158, 230, 302]
            .map(
              (x, i) =>
                `<rect x="${x}" y="132" width="${i === 0 || i === 4 ? 14 : 28}" height="18" rx="3" fill="#22c55e" stroke="#14532d" stroke-width="1.2"/>`
            )
            .join('')}
          <!-- Dam Barrier Label -->
          <line x1="172" y1="150" x2="172" y2="202" stroke="#16a34a" stroke-width="1.8"/>
          <rect x="64" y="202" width="216" height="26" rx="6" fill="#dcfce7" stroke="#16a34a"/>
          <text x="172" y="219" text-anchor="middle" font-size="9.6" font-weight="800" fill="#166534">① 緑レジスト堤防(SMD)＝ショート完全防止!</text>
          ${stepBadge(172, 141, '1', '#16a34a')}
          <text x="172" y="246" text-anchor="middle" font-size="9.4" font-weight="700" fill="#14532d">溶けたハンダを弾く性質なので、0.4mmの極狭間隔でも</text>
          <text x="172" y="261" text-anchor="middle" font-size="9.4" font-weight="700" fill="#14532d">隣のボール同士が絶対に繋がらない(ブリッジゼロ!)</text>

          <!-- Right: Microscope Loupe of 3-Layer ENEPIG (Ni/Pd/Au) Pad Metallurgy -->
          <clipPath id="${p}_loupe"><circle cx="436" cy="166" r="68"/></clipPath>
          <circle cx="436" cy="166" r="68" fill="#f8fafc"/>
          <g clip-path="url(#${p}_loupe)">
            <rect x="366" y="102" width="140" height="32" fill="url(#${p}_cu)"/>
            <text x="436" y="122" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">純銅パッド (Cu)</text>
            <rect x="366" y="134" width="140" height="24" fill="#94a3b8"/>
            <text x="436" y="150" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">ニッケル Ni（銅の拡散止め）</text>
            <rect x="366" y="158" width="140" height="22" fill="#cbd5e1" stroke="#64748b"/>
            <text x="436" y="173" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1e293b">パラジウム Pd（腐食バリア）</text>
            <rect x="366" y="180" width="140" height="20" fill="url(#${p}_gold)"/>
            <text x="436" y="194" text-anchor="middle" font-size="9.5" font-weight="800" fill="#422006">純金 Au（ハンダ濡れ抜群!）</text>
            <rect x="366" y="200" width="140" height="36" fill="url(#${p}_solder)"/>
            <text x="436" y="220" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">SAC305 ハンダ球接合</text>
          </g>
          ${loupeRing(436, 166, 68, '拡大：ENEPIG 3層膜', '#ca8a04')}
          <text x="436" y="254" text-anchor="middle" font-size="9.6" font-weight="800" fill="#854d0e">② Ni/Pd/Au の3重めっきで</text>
          <text x="436" y="269" text-anchor="middle" font-size="9.2" fill="#713f12">酸化ゼロ＆落下衝撃でも剥がれない!</text>
        `,
      });

    // =========================================================================
    // XR36. SAC305 Lead-Free BGA Solder Ball Matrix (Reflow Self-Alignment)
    // =========================================================================
    case 'xr_sac305_bga_balls':
      return renderBionzDiagram({
        code: 'xr36',
        badge: 'XR36',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        accentDark: '#0f172a',
        title: 'SAC305 鉛フリー BGAはんだボール配列',
        metric: '約1,400球 / 0.4mm間隔',
        analogyLine1: '底面びっしりに並んだ約1,400個の極小銀色ボールが、BIONZとカメラ全身の神経を結びます。',
        analogyLine2: '245℃の炉で溶けると水滴のような表面張力が働き、自動でピタッと中央へ整列します!',
        chipHow: 'Sn-3Ag-0.5Cu＋自己整列リフロー',
        chipBenefit: '1,400接点を一括ミクロン精度実装',
        chipSpec: 'ピッチ0.4mm / 245℃リフロー',
        art: (p) => `
          <!-- Left: 3-Step Self-Alignment Reflow Visual Story (Super Easy for Beginners!) -->
          <text x="172" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">245℃リフロー炉の魔法：自動でピタッと整列!</text>
          <!-- Step 1: Slightly Misaligned Before Heating -->
          <rect x="24" y="82" width="90" height="122" rx="7" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="69" y="99" text-anchor="middle" font-size="9.5" font-weight="800" fill="#475569">① 搭載直後</text>
          <rect x="44" y="108" width="54" height="14" rx="2" fill="url(#${p}_pcb)"/>
          <circle cx="75" cy="136" r="13" fill="url(#${p}_solder)" stroke="#475569"/>
          <rect x="34" y="152" width="58" height="14" rx="2" fill="#0f766e"/>
          <text x="69" y="182" text-anchor="middle" font-size="8.6" font-weight="700" fill="#dc2626">少しズレて</text>
          <text x="69" y="194" text-anchor="middle" font-size="8.6" font-weight="700" fill="#dc2626">乗せても…</text>

          <line x1="116" y1="142" x2="128" y2="142" stroke="#d97706" stroke-width="2.2" marker-end="url(#${p}_arr_gold)"/>

          <!-- Step 2: 245°C Molten Surface Tension Pulling -->
          <rect x="130" y="82" width="92" height="122" rx="7" fill="#fff7ed" stroke="#f97316"/>
          <text x="176" y="99" text-anchor="middle" font-size="9.5" font-weight="800" fill="#c2410c">② 245℃加熱</text>
          <rect x="148" y="108" width="56" height="14" rx="2" fill="url(#${p}_pcb)"/>
          <ellipse cx="176" cy="137" rx="15" ry="14" fill="#fb923c" opacity="0.7" stroke="#ea580c" stroke-width="1.5"/>
          <path d="M 196 116 H 178" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_red)"/>
          <rect x="148" y="152" width="56" height="14" rx="2" fill="#0f766e"/>
          <text x="176" y="182" text-anchor="middle" font-size="8.6" font-weight="700" fill="#c2410c">表面張力が</text>
          <text x="176" y="194" text-anchor="middle" font-size="8.6" font-weight="700" fill="#c2410c">中央へ引張!</text>

          <line x1="224" y1="142" x2="236" y2="142" stroke="#16a34a" stroke-width="2.2" marker-end="url(#${p}_arr_green)"/>

          <!-- Step 3: Perfect Self-Aligned Joint -->
          <rect x="238" y="82" width="90" height="122" rx="7" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="283" y="99" text-anchor="middle" font-size="9.5" font-weight="800" fill="#166534">③ 完璧接合!</text>
          <rect x="255" y="108" width="56" height="14" rx="2" fill="url(#${p}_pcb)"/>
          <rect x="268" y="122" width="30" height="4" fill="url(#${p}_gold)"/>
          <ellipse cx="283" cy="137" rx="14" ry="13" fill="url(#${p}_solder)" stroke="#16a34a" stroke-width="1.6"/>
          <rect x="268" y="149" width="30" height="4" fill="url(#${p}_gold)"/>
          <rect x="255" y="153" width="56" height="14" rx="2" fill="#0f766e"/>
          <text x="283" y="182" text-anchor="middle" font-size="8.6" font-weight="800" fill="#166534">ピタリと整列</text>
          <text x="283" y="194" text-anchor="middle" font-size="8.6" font-weight="700" fill="#15803d">IMC合金密着!</text>

          <!-- SAC305 Alloy Recipe Bar -->
          <rect x="24" y="212" width="304" height="58" rx="7" fill="#f1f5f9" stroke="#94a3b8"/>
          <text x="176" y="229" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f172a">鉛フリー SAC305 合金の黄金レシピ</text>
          <rect x="36" y="238" width="186" height="22" rx="4" fill="#94a3b8"/>
          <text x="129" y="253" text-anchor="middle" font-size="9" font-weight="800" fill="#0f172a">錫 Sn 96.5%（ベース）</text>
          <rect x="224" y="238" width="56" height="22" rx="4" fill="#e2e8f0" stroke="#64748b"/>
          <text x="252" y="253" text-anchor="middle" font-size="8.6" font-weight="800" fill="#1e293b">銀 3.0%</text>
          <rect x="282" y="238" width="36" height="22" rx="4" fill="url(#${p}_cu)"/>
          <text x="300" y="253" text-anchor="middle" font-size="8" font-weight="800" fill="#fff">銅0.5</text>

          <!-- Right: Bottom BGA Array Footprint Map -->
          <rect x="342" y="66" width="194" height="204" rx="8" fill="#14532d" stroke="#16a34a" stroke-width="1.5"/>
          <text x="439" y="86" text-anchor="middle" font-size="10.2" font-weight="800" fill="#dcfce7">底面 BGA ボール配置マップ</text>
          ${Array.from({ length: 9 })
            .flatMap((_, ix) =>
              Array.from({ length: 9 }).map((__, iz) => {
                if (ix >= 3 && ix <= 5 && iz >= 3 && iz <= 5) return '';
                const isCorner = (ix === 0 || ix === 8) && (iz === 0 || iz === 8);
                return `<circle cx="${375 + ix * 16}" cy="${104 + iz * 15}" r="${isCorner ? 5.6 : 4.4}" fill="${isCorner ? '#facc15' : '#e2e8f0'}" stroke="#334155" stroke-width="0.8"/>`;
              })
            )
            .join('')}
          <!-- Central MLCC Courtyard -->
          <rect x="415" y="142" width="48" height="44" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
          <text x="439" y="162" text-anchor="middle" font-size="8" font-weight="800" fill="#facc15">中央</text>
          <text x="439" y="174" text-anchor="middle" font-size="7.8" fill="#fde047">MLCC群</text>
          <text x="439" y="246" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">黄球：4隅大型アンカーGND球</text>
          <text x="439" y="261" text-anchor="middle" font-size="8.8" fill="#dcfce7">0.4mm間隔でメイン基板へ直結</text>
        `,
      });

    // =========================================================================
    // XR37. Dedicated Multi-Phase Core PMIC & Shielded 0.47uH Buck Inductors
    // =========================================================================
    case 'xr_pmic_vrm_rails':
      return renderBionzDiagram({
        code: 'xr37',
        badge: 'XR37',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        accentDark: '#92400e',
        title: '専用4相コアPMIC ＆ R47シールド降圧コイル',
        metric: '7.2V → 0.75V 超安定変換',
        analogyLine1: '電池の7.2Vをチップ用の0.75Vへ瞬時に変換する「BIONZ専属の超高速変電所」です。',
        analogyLine2: '4つのコイルが90°ずつ順番に働くため、波打ちゼロの超なめらかな大電流が届きます。',
        chipHow: '4相インターリーブ降圧＋POSCAP',
        chipBenefit: '連写・AI急起動でも電圧揺れ無',
        chipSpec: 'CXD5702GG / 0.47μH R47×4',
        art: (p) => `
          <!-- Step 1: 7.2V Battery Input -->
          <rect x="20" y="92" width="84" height="122" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.4"/>
          <rect x="46" y="84" width="32" height="10" rx="2" fill="#475569"/>
          <text x="62" y="124" text-anchor="middle" font-size="10" font-weight="800" fill="#1e293b">NP-FZ100</text>
          <text x="62" y="144" text-anchor="middle" font-size="13" font-weight="800" fill="#dc2626">7.2 V</text>
          <text x="62" y="166" text-anchor="middle" font-size="8.6" font-weight="700" fill="#991b1b">このまま入れると</text>
          <text x="62" y="179" text-anchor="middle" font-size="8.6" font-weight="700" fill="#991b1b">4nmチップが</text>
          <text x="62" y="192" text-anchor="middle" font-size="8.6" font-weight="700" fill="#991b1b">一瞬で焼損!</text>
          ${stepBadge(28, 100, '1', '#475569')}

          <line x1="106" y1="152" x2="124" y2="152" stroke="#d97706" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>

          <!-- Step 2: Multi-Phase PMIC + 4x R47 Shielded Inductors -->
          <rect x="128" y="64" width="240" height="206" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
          <text x="248" y="83" text-anchor="middle" font-size="10.6" font-weight="800" fill="#92400e">② 4相交互スイッチング変電所</text>
          <!-- PMIC QFN-48 Chip -->
          <rect x="140" y="94" width="76" height="92" rx="6" fill="url(#${p}_emc)" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="178" y="128" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff">PMIC</text>
          <text x="178" y="143" text-anchor="middle" font-size="8.2" fill="#fde047">CXD5702GG</text>
          <text x="178" y="159" text-anchor="middle" font-size="8" fill="#cbd5e1">DVFS連動</text>
          <text x="178" y="172" text-anchor="middle" font-size="8" fill="#67e8f9">90°位相ずらし</text>

          <!-- 4 Shielded R47 Metal-Alloy Inductors -->
          ${[0, 1, 2, 3]
            .map((k) => {
              const y = 94 + k * 24;
              return `
                <line x1="216" y1="${y + 10}" x2="238" y2="${y + 10}" stroke="#d97706" stroke-width="2"/>
                <rect x="238" y="${y}" width="52" height="20" rx="3" fill="#334155" stroke="#94a3b8"/>
                <text x="264" y="${y + 13.5}" text-anchor="middle" font-size="8.8" font-weight="800" fill="#f8fafc">R47 #${k + 1}</text>
                <path d="M 294 ${y + 10} l 8 0 l 0 -6 l 10 0 l 0 6 l 36 0" fill="none" stroke="${['#ef4444', '#f59e0b', '#10b981', '#3b82f6'][k]}" stroke-width="1.8" transform="translate(${k * 4},0)"/>
              `;
            })
            .join('')}
          <text x="248" y="206" text-anchor="middle" font-size="9.2" font-weight="800" fill="#92400e">鉄粉モールド密閉コイル(R47)で漏れ磁束ゼロ!</text>
          <!-- Yellow POSCAP Tantalum Caps -->
          <rect x="140" y="216" width="216" height="44" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="1.3"/>
          <rect x="140" y="216" width="16" height="44" rx="3" fill="#dc2626"/>
          <text x="256" y="234" text-anchor="middle" font-size="9.6" font-weight="800" fill="#713f12">黄色 POSCAP 大容量タンタルコンデンサ</text>
          <text x="256" y="250" text-anchor="middle" font-size="8.8" fill="#854d0e">4つの波を完全に平らにならす貯水ダム!</text>
          ${stepBadge(136, 72, '2', '#d97706')}

          <line x1="370" y1="152" x2="390" y2="152" stroke="#16a34a" stroke-width="2.8" marker-end="url(#${p}_arr_green)"/>

          <!-- Step 3: Razor-Flat Multi-Rail Output to BIONZ XR -->
          <rect x="394" y="68" width="144" height="198" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
          <text x="466" y="88" text-anchor="middle" font-size="10.2" font-weight="800" fill="#166534">③ 超静音3系統出力</text>
          <!-- Flat Output Wave Graph -->
          <rect x="406" y="98" width="120" height="46" rx="5" fill="#0f172a"/>
          <line x1="414" y1="120" x2="518" y2="120" stroke="#4ade80" stroke-width="2.8"/>
          <text x="466" y="114" text-anchor="middle" font-size="8.4" font-weight="800" fill="#4ade80">リップル1/4以下!</text>
          <text x="466" y="136" text-anchor="middle" font-size="8.4" fill="#fef08a">超フラット 0.75 V</text>
          <!-- 3 Rails -->
          <rect x="406" y="152" width="120" height="30" rx="5" fill="#16a34a"/>
          <text x="466" y="166" text-anchor="middle" font-size="9.4" font-weight="800" fill="#fff">VDD_CORE 0.75V</text>
          <text x="466" y="177" text-anchor="middle" font-size="8" fill="#dcfce7">待機0.55V⇔全力0.82V</text>

          <rect x="406" y="188" width="120" height="28" rx="5" fill="#0284c7"/>
          <text x="466" y="206" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fff">LPDDR5X 1.1V</text>

          <rect x="406" y="222" width="120" height="28" rx="5" fill="#6366f1"/>
          <text x="466" y="240" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fff">周辺I/O 1.8V</text>
          ${stepBadge(402, 76, '3', '#16a34a')}
        `,
      });

    // =========================================================================
    // XR38. Ultra-Low-Jitter 24.000 MHz Hermetic Gold-Lid TCXO Reference Clock
    // =========================================================================
    case 'xr_tcxo_24mhz_clock':
      return renderBionzDiagram({
        code: 'xr38',
        badge: 'XR38',
        accent: '#eab308',
        accentSoft: '#fefce8',
        accentDark: '#854d0e',
        title: '24.000 MHz 金封止水晶発振器（TCXO）',
        metric: '精度 ±1.5ppm / <150fs',
        analogyLine1: '雪山でも真夏の炎天下でも1秒間に2,400万回狂わず刻む「絶対メトロノーム」です。',
        analogyLine2: '動画フレームレートや48kHz音声の基準となり、何時間撮っても音ズレしません。',
        chipHow: 'ATカット水晶＋温度補償＋金蓋',
        chipBenefit: '長回し動画の音ズレ・通信エラー0',
        chipSpec: 'Kyocera KT2520 / 24.000MHz',
        art: (p) => `
          <!-- Left: Cutaway Cross-Section of Hermetic Gold-Lid TCXO -->
          <text x="160" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#854d0e">気密パッケージ断面（Kyocera KT2520型）</text>
          <!-- Gold Seam-Welded Kovar Lid -->
          <rect x="42" y="88" width="236" height="20" rx="4" fill="url(#${p}_gold)" stroke="#854d0e" stroke-width="1.6"/>
          <text x="160" y="102" text-anchor="middle" font-size="9.8" font-weight="800" fill="#422006">① 金めっきコバール気密蓋（真空シーム溶接）</text>
          <!-- Sealed Cavity Wall (White Alumina Ceramic) -->
          <rect x="48" y="108" width="224" height="86" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
          <!-- Vibrating AT-Cut Quartz Crystal Blank Suspended Inside -->
          <rect x="82" y="122" width="156" height="20" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <text x="160" y="136" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">② ATカット人工水晶振動子（2400万回/秒）</text>
          <!-- Vibration Micro Waves -->
          <path d="M 62 126 Q 68 132 62 138 M 258 126 Q 252 132 258 138" fill="none" stroke="#0284c7" stroke-width="1.8"/>
          <!-- Temperature Compensation CMOS IC Inside Cavity -->
          <rect x="96" y="156" width="128" height="28" rx="4" fill="url(#${p}_si)"/>
          <text x="160" y="174" text-anchor="middle" font-size="9.2" font-weight="700" fill="#fef08a">③ 温度センサー＆自動微調整IC</text>
          <!-- Ceramic Base & Gold Corner Castellations + 360° Guard Via Fence -->
          <rect x="34" y="194" width="252" height="18" rx="3" fill="#e2e8f0" stroke="#64748b"/>
          <text x="160" y="207" text-anchor="middle" font-size="9" font-weight="700" fill="#334155">アルミナ白セラミック土台＋4隅キャスタレーション電極</text>
          <rect x="24" y="212" width="272" height="16" rx="3" fill="url(#${p}_pcb)"/>
          <text x="160" y="224" text-anchor="middle" font-size="8.6" font-weight="700" fill="#dcfce7">360°ガードビア堀で周囲ノイズを完全隔離!</text>
          <text x="160" y="250" text-anchor="middle" font-size="9.6" font-weight="800" fill="#854d0e">ジッタ（時間揺らぎ）150フェムト秒未満!</text>
          <text x="160" y="265" text-anchor="middle" font-size="9" fill="#475569">＝ 1秒の7兆分の1しかズレない究極リズム</text>

          <!-- Right: Temperature Stability Graph (-20°C to +85°C) -->
          <rect x="308" y="66" width="230" height="204" rx="8" fill="#ffffff" stroke="#eab308" stroke-width="1.4"/>
          <text x="423" y="86" text-anchor="middle" font-size="10.5" font-weight="800" fill="#854d0e">温度が変わっても狂わない!</text>
          <rect x="320" y="96" width="206" height="106" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
          <!-- Axes -->
          <line x1="334" y1="148" x2="516" y2="148" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 2"/>
          <text x="346" y="194" font-size="8.5" font-weight="700" fill="#0284c7">-20℃雪山</text>
          <text x="424" y="194" text-anchor="middle" font-size="8.5" font-weight="700" fill="#475569">25℃</text>
          <text x="514" y="194" text-anchor="end" font-size="8.5" font-weight="700" fill="#dc2626">+85℃炎天下</text>
          <!-- Ordinary Crystal Curve (Wild S-Curve Drift) -->
          <path d="M 336 112 C 374 102, 412 148, 424 148 C 446 148, 480 184, 514 176" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="478" y="118" text-anchor="middle" font-size="8.4" font-weight="800" fill="#dc2626">普通の水晶 ±30ppm</text>
          <!-- TCXO Compensated Razor-Flat Line -->
          <path d="M 336 149 Q 380 146 424 148 Q 470 150 514 147" fill="none" stroke="#16a34a" stroke-width="3"/>
          <rect x="364" y="156" width="122" height="20" rx="4" fill="#dcfce7" stroke="#16a34a"/>
          <text x="425" y="170" text-anchor="middle" font-size="8.8" font-weight="800" fill="#166534">TCXO：±1.5ppm以内!</text>

          <!-- Output To Whole Camera -->
          <text x="423" y="222" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">この24MHzから全クロックを生成</text>
          <text x="423" y="238" text-anchor="middle" font-size="8.8" fill="#334155">23.976/59.94fps 動画・48kHz音声・</text>
          <text x="423" y="253" text-anchor="middle" font-size="8.8" fill="#334155">HDMI 2.1・USB 10G すべての基準源!</text>
        `,
      });

    // =========================================================================
    // XR39. 256 Mb Octal-SPI Boot NOR Flash & Factory Calibration ROM
    // =========================================================================
    case 'xr_qspi_boot_nor_rom':
      return renderBionzDiagram({
        code: 'xr39',
        badge: 'XR39',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        accentDark: '#5b21b6',
        title: '256Mb Octal-SPI ブート＆個体補正ROM',
        metric: '電源ON→0.4秒で爆速起動',
        analogyLine1: '電源ONの瞬間にカメラを目覚めさせる「起動レシピ＆1台ごとの個体カルテ帳」です。',
        analogyLine2: '工場で1台ずつ測ったセンサーのクセ補正表を20年間消さずに記憶し続けます。',
        chipHow: '8本並列DDR読出＋A/B二重保護',
        chipBenefit: '0.4秒起動＆個体バラつき補正',
        chipSpec: 'MX25UM25645G / 400MB/s',
        art: (p) => `
          <!-- Left: Macronix MX25UM25645G NOR Flash Internal 4-Section Map -->
          <rect x="22" y="64" width="234" height="206" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="147" y="84" text-anchor="middle" font-size="10.2" font-weight="800" fill="#5b21b6">NORフラッシュ内部（32MB金庫）</text>
          ${[
            ['セキュアブートローダ ＆ OS本体', '#7c3aed', '電源ON直後に最初に動く起動プログラム'],
            ['工場1台別 キャリブレーションLUT', '#0284c7', 'センサー欠陥画素・周辺光量・色個体差補正'],
            ['Eマウント全レンズ光学補正テーブル', '#0d9488', '歪曲・色収差・ブリージング補正データ'],
            ['A/B 二重バックアップ＆C2PAルート鍵', '#d97706', '更新中の電源断でも絶対故障しない設計!'],
          ]
            .map(
              ([t, col, sub], i) => `
                <rect x="34" y="${94 + i * 41}" width="210" height="35" rx="6" fill="#ffffff" stroke="${col}" stroke-width="1.3"/>
                <rect x="34" y="${94 + i * 41}" width="6" height="35" rx="2" fill="${col}"/>
                <text x="46" y="${108 + i * 41}" font-size="9.4" font-weight="800" fill="#0f172a">${t}</text>
                <text x="46" y="${122 + i * 41}" font-size="8.2" fill="#475569">${sub}</text>
              `
            )
            .join('')}
          ${stepBadge(30, 72, '1', '#7c3aed')}

          <!-- Center: 8-Line Parallel Octal-SPI DDR Highway -->
          <text x="310" y="102" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5b21b6">8本並列</text>
          <text x="310" y="114" text-anchor="middle" font-size="9" font-weight="700" fill="#7c3aed">Octal-SPI</text>
          ${[0, 1, 2, 3, 4, 5, 6, 7]
            .map((k) => `<line x1="258" y1="${126 + k * 12}" x2="360" y2="${126 + k * 12}" stroke="${k % 2 === 0 ? '#7c3aed' : '#d97706'}" stroke-width="2" marker-end="url(#${p}_arr_purple)"/>`)
            .join('')}
          <rect x="266" y="224" width="88" height="32" rx="5" fill="#ede9fe" stroke="#7c3aed"/>
          <text x="310" y="238" text-anchor="middle" font-size="9" font-weight="800" fill="#5b21b6">400 MB/s</text>
          <text x="310" y="250" text-anchor="middle" font-size="8" fill="#4c1d95">200MHz DDR読出</text>

          <!-- Right: 0.4-Second Cold-Boot Sequence Timeline -->
          <rect x="366" y="64" width="172" height="206" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
          <text x="452" y="84" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0f172a">② 電源ON → 0.4秒起動!</text>
          ${[
            ['0.00秒', '電源スイッチ ON', '#475569'],
            ['0.05秒', '正規ファーム署名検証', '#d97706'],
            ['0.18秒', 'OS＆個体補正を転送', '#7c3aed'],
            ['0.40秒', 'シャッター即撮影OK!', '#16a34a'],
          ]
            .map(
              ([tm, msg, col], i) => `
                <rect x="378" y="${96 + i * 40}" width="44" height="26" rx="5" fill="${col}"/>
                <text x="400" y="${113 + i * 40}" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fff">${tm}</text>
                <text x="428" y="${113 + i * 40}" font-size="9.4" font-weight="800" fill="#0f172a">${msg}</text>
                ${i < 3 ? `<line x1="400" y1="${122 + i * 40}" x2="400" y2="${134 + i * 40}" stroke="#94a3b8" stroke-width="1.8"/>` : ''}
              `
            )
            .join('')}
          <text x="452" y="258" text-anchor="middle" font-size="8.8" font-weight="700" fill="#15803d">電池を外しても20年以上記憶保持</text>
          ${stepBadge(374, 72, '2', '#16a34a')}
        `,
      });

    // =========================================================================
    // XR40. Sony α7 IV Σ-Shaped Pyrolytic Graphite Thermal Bridge & Press Clip
    // =========================================================================
    case 'xr_sigma_graphite_clamp':
      return renderBionzDiagram({
        code: 'xr40',
        badge: 'XR40',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        accentDark: '#0f172a',
        title: 'ソニー独自 Σ字グラファイト放熱シート',
        metric: '銅の約4倍速! k=1,500',
        analogyLine1: '熱を銅の4倍スピードで運ぶ「Σ（シグマ）字に畳んだ黒鉛の放熱ハイウェイ」です。',
        analogyLine2: '蛇腹のバネ構造でIBISの動きや衝撃を吸収しながら、ファン無しで4K60pを冷やします。',
        chipHow: '高配向PGS＋Σ蛇腹＋SUSクリップ',
        chipBenefit: '防塵防滴のまま4K60p長時間収録',
        chipSpec: 'P/N 500490202 / 1500 W/m·K',
        art: (p) => `
          <!-- Left: Side-Profile Cross-Section of Sony's Patented Sigma-Fold Thermal Bridge -->
          <text x="166" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">横断面：ソニー特許 Σ（シグマ）字 放熱構造</text>
          <!-- Upper Magnesium Camera Body Chassis (Heat Sink Destination) -->
          <rect x="28" y="84" width="276" height="26" rx="5" fill="url(#${p}_sus)" stroke="#334155" stroke-width="1.4"/>
          <text x="166" y="101" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">マグネシウム合金カメラ筐体（ボディ全体から放熱!）</text>

          <!-- Dramatic Σ-Shaped Accordion Folded Pyrolytic Graphite Sheet! -->
          <path d="M 102 204 L 246 204 C 276 204, 276 178, 224 172 L 136 162 C 88 156, 88 130, 144 124 L 254 114" fill="none" stroke="#1e293b" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 102 204 L 246 204 C 276 204, 276 178, 224 172 L 136 162 C 88 156, 88 130, 144 124 L 254 114" fill="none" stroke="#f97316" stroke-width="3.2" stroke-dasharray="10 6" marker-end="url(#${p}_arr_gold)"/>
          <text x="64" y="160" text-anchor="middle" font-size="18" font-weight="900" fill="#dc2626">Σ</text>
          <text x="64" y="176" text-anchor="middle" font-size="8.6" font-weight="800" fill="#334155">蛇腹バネが</text>
          <text x="64" y="188" text-anchor="middle" font-size="8.6" font-weight="800" fill="#334155">動きを吸収!</text>

          <!-- SUS301 Spring Press Clip + Titanium Screw Pressing Sheet Onto BIONZ Lid -->
          <rect x="116" y="192" width="44" height="10" rx="2" fill="#94a3b8" stroke="#334155"/>
          <rect x="134" y="186" width="8" height="16" rx="1" fill="#475569"/>
          <!-- Pink TIM2 Thermal Pad + BIONZ XR Package Lid -->
          <rect x="100" y="210" width="154" height="7" fill="#f472b6"/>
          <rect x="86" y="217" width="182" height="24" rx="4" fill="url(#${p}_teal)" stroke="#0f766e"/>
          <text x="177" y="233" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fff">BIONZ XR 放熱リッド（発熱源）</text>
          ${stepBadge(138, 196, '1', '#475569')}
          ${stepBadge(258, 174, '2', '#ea580c')}
          <text x="166" y="259" text-anchor="middle" font-size="9.4" font-weight="700" fill="#334155">① SUS301ばねクリップ＋PET縁封止で粉落ち＆浮き防止</text>

          <!-- Right: Thermal Conductivity Bar Race (PGS vs Copper vs Aluminum!) -->
          <rect x="318" y="66" width="220" height="204" rx="8" fill="#fff7ed" stroke="#f97316" stroke-width="1.4"/>
          <text x="428" y="88" text-anchor="middle" font-size="10.8" font-weight="800" fill="#9a3412">熱の伝わるスピード比較</text>
          <text x="428" y="102" text-anchor="middle" font-size="8.8" fill="#7c2d12">（数字が大きいほど超速で冷える!）</text>

          <!-- Bar 1: Aluminum -->
          <text x="330" y="124" font-size="9.2" font-weight="700" fill="#475569">アルミ合金</text>
          <rect x="330" y="129" width="34" height="16" rx="4" fill="#94a3b8"/>
          <text x="370" y="141" font-size="9.2" font-weight="700" fill="#475569">237 W/m·K</text>

          <!-- Bar 2: Oxygen-Free Copper -->
          <text x="330" y="164" font-size="9.2" font-weight="700" fill="#b45309">無酸素銅（IHS）</text>
          <rect x="330" y="169" width="58" height="16" rx="4" fill="url(#${p}_cu)"/>
          <text x="394" y="181" font-size="9.2" font-weight="800" fill="#9a3412">398 W/m·K</text>

          <!-- Bar 3: Pyrolytic Graphite Sheet (3.8x Copper!!) -->
          <text x="330" y="204" font-size="9.6" font-weight="800" fill="#dc2626">★ パイロリティック・グラファイト</text>
          <rect x="330" y="209" width="194" height="22" rx="5" fill="url(#${p}_heat)"/>
          <text x="427" y="224" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">約 1,500 W/m·K（銅の約4倍!!）</text>

          <text x="428" y="250" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f766e">冷却ファンの穴を開けずに防塵防滴＆</text>
          <text x="428" y="263" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f766e">長時間4K60p収録を実現する切り札!</text>
        `,
      });

    // =========================================================================
    // XR41. 8-Lane SLVS-EC 2.0 Differential Microstrip & AC-Coupling Bus
    // =========================================================================
    case 'xr_slvs_ec_microcoax_bus':
      return renderBionzDiagram({
        code: 'xr41',
        badge: 'XR41',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        accentDark: '#155e75',
        title: '8レーン SLVS-EC 2.0 差動高速バス＆AC容量',
        metric: '38.1Gbps / 100Ω等長配線',
        analogyLine1: 'センサーの3300万画素RAWを一滴もこぼさず運ぶ「0.1mm単位で長さを揃えた8対の高速道路」です。',
        analogyLine2: '＋線と−線のペア送信でノイズを自動相殺し、途中の極小コンデンサが直流雑音を遮断します。',
        chipHow: '100Ω差動ペア＋蛇行等長＋AC容量',
        chipBenefit: 'ノイズ皆無の高速RAWデータ伝送',
        chipSpec: '8レーン×4.76Gbps / 48pin B2B',
        art: (p) => `
          <!-- Top: Beginner-Friendly Differential Signaling Noise Cancellation Visual! -->
          <rect x="22" y="64" width="516" height="90" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.4"/>
          <text x="280" y="82" text-anchor="middle" font-size="10.6" font-weight="800" fill="#155e75">① なぜ2本ペア（差動信号）だとノイズに強いの？</text>
          <!-- + Line and - Line -->
          <text x="38" y="106" font-size="9.2" font-weight="800" fill="#0284c7">＋線:</text>
          <path d="M 74 102 L 106 102 L 114 92 L 146 92 L 154 102 L 186 102" fill="none" stroke="#0284c7" stroke-width="2.2"/>
          <text x="38" y="132" font-size="9.2" font-weight="800" fill="#ea580c">−線:</text>
          <path d="M 74 128 L 106 128 L 114 138 L 146 138 L 154 128 L 186 128" fill="none" stroke="#ea580c" stroke-width="2.2"/>
          <!-- Noise Spike Hitting Both Lines Equally -->
          <rect x="200" y="92" width="112" height="50" rx="6" fill="#fef2f2" stroke="#f87171"/>
          <text x="256" y="108" text-anchor="middle" font-size="8.8" font-weight="800" fill="#dc2626">⚡ 外来ノイズ侵入!</text>
          <text x="256" y="122" text-anchor="middle" font-size="8.4" fill="#991b1b">＋線にも−線にも</text>
          <text x="256" y="135" text-anchor="middle" font-size="8.4" fill="#991b1b">同じ量だけ乗る</text>
          <line x1="314" y1="117" x2="340" y2="117" stroke="#0891b2" stroke-width="2.4" marker-end="url(#${p}_arr_blue)"/>
          <!-- Subtract (+)-(-) Cancels Noise! -->
          <rect x="346" y="90" width="180" height="54" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.3"/>
          <text x="436" y="108" text-anchor="middle" font-size="9.6" font-weight="800" fill="#166534">受信側で（＋）−（−）を引算!</text>
          <text x="436" y="124" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f766e">→ 同じノイズが100%打ち消され</text>
          <text x="436" y="138" text-anchor="middle" font-size="9" font-weight="700" fill="#15803d">きれいな信号だけがくっきり復活!</text>

          <!-- Bottom: Top-Down PCB Bus Anatomy (48-Pin B2B -> 16x 0201 AC Caps -> Serpentine Meanders -> BIONZ) -->
          <rect x="22" y="162" width="516" height="110" rx="8" fill="#fff7ed" stroke="#d97706" stroke-width="1.4"/>
          <text x="280" y="180" text-anchor="middle" font-size="10.4" font-weight="800" fill="#9a3412">② 基板上の精密レイアウト（等長蛇行 ＋ 16個の極小ACコンデンサ）</text>
          <!-- Left: 48-Pin Shielded B2B Connector -->
          <rect x="34" y="190" width="76" height="68" rx="5" fill="#1e293b" stroke="#94a3b8" stroke-width="1.8"/>
          <text x="72" y="218" text-anchor="middle" font-size="9.4" font-weight="800" fill="#fde047">48pin B2B</text>
          <text x="72" y="233" text-anchor="middle" font-size="8.2" fill="#e2e8f0">センサー直結</text>
          <text x="72" y="246" text-anchor="middle" font-size="7.8" fill="#67e8f9">シールド枠付</text>

          <!-- Middle: Differential Pairs + 0201 AC Coupling Caps + Serpentine Length-Matching Trombone! -->
          ${[0, 1, 2]
            .map((lane) => {
              const y = 198 + lane * 22;
              return `
                <line x1="110" y1="${y}" x2="188" y2="${y}" stroke="#d97706" stroke-width="2"/>
                <line x1="110" y1="${y + 6}" x2="188" y2="${y + 6}" stroke="#eab308" stroke-width="2"/>
                <!-- 0201 AC-Coupling Cap -->
                <rect x="188" y="${y - 3}" width="22" height="12" rx="2" fill="#b45309" stroke="#fef3c7"/>
                <rect x="186" y="${y - 3}" width="4" height="12" fill="#cbd5e1"/>
                <rect x="208" y="${y - 3}" width="4" height="12" fill="#cbd5e1"/>
                <!-- Serpentine Length-Match Meander Jog -->
                <path d="M 212 ${y + 2} H 264 L 270 ${y - 5} L 278 ${y + 9} L 286 ${y - 5} L 294 ${y + 9} L 300 ${y + 2} H 416" fill="none" stroke="${lane % 2 === 0 ? '#0284c7' : '#d97706'}" stroke-width="2.2" marker-end="url(#${p}_arr_blue)"/>
              `;
            })
            .join('')}
          <!-- Callout Labels -->
          <rect x="150" y="256" width="110" height="14" rx="3" fill="#fef3c7"/>
          <text x="205" y="266" text-anchor="middle" font-size="8.2" font-weight="800" fill="#92400e">0201 AC結合MLCC×16</text>
          <rect x="272" y="256" width="128" height="14" rx="3" fill="#e0f2fe"/>
          <text x="336" y="266" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0369a1">蛇行ミアンダで0.1mm等長!</text>

          <!-- Right: BIONZ XR Receiver -->
          <rect x="422" y="190" width="104" height="68" rx="6" fill="url(#${p}_teal)"/>
          <text x="474" y="218" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">BIONZ XR</text>
          <text x="474" y="233" text-anchor="middle" font-size="8.4" fill="#ccfbf1">SLVS-EC PHY</text>
          <text x="474" y="247" text-anchor="middle" font-size="8.4" font-weight="800" fill="#fef08a">38.1 Gbps 直受</text>
        `,
      });

    // =========================================================================
    // XR42. HDMI 2.1 (48 Gbps FRL) Retimer IC (TI TDP2004) & ±15 kV ESD Array
    // =========================================================================
    case 'xr_hdmi21_retimer_esd':
      return renderBionzDiagram({
        code: 'xr42',
        badge: 'XR42',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        accentDark: '#0369a1',
        title: 'HDMI 2.1 リタイマIC ＆ ±15kV 静電気ガード',
        metric: '48Gbps波形復元＋雷ガード',
        analogyLine1: '弱った映像波をクッキリ整形する「中継ブースター」と、静電気を逃がす「超高速避雷針」です。',
        analogyLine2: '10mの長いHDMIケーブルでも映像が途切れず、抜き差し時の静電気からBIONZを守ります。',
        chipHow: 'TI TDP2004リタイマ＋0.25pF ESD',
        chipBenefit: '長尺4K/RAW出力安定＆故障防止',
        chipSpec: '48Gbps FRL / ±15kV TVS保護',
        art: (p) => `
          <!-- Top Row: Eye-Diagram Signal Restoration by TI TDP2004 Retimer -->
          <rect x="22" y="64" width="516" height="114" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.4"/>
          <text x="280" y="82" text-anchor="middle" font-size="10.6" font-weight="800" fill="#0369a1">① リタイマIC（TI TDP2004）：なまった48Gbps波形を新品同様に復元!</text>

          <!-- Weak / Blurred Input Waveform -->
          <rect x="34" y="92" width="126" height="74" rx="6" fill="#0f172a" stroke="#f87171"/>
          <path d="M 44 138 Q 68 118 96 138 Q 124 156 150 132" fill="none" stroke="#f87171" stroke-width="2" opacity="0.8"/>
          <path d="M 44 128 Q 68 148 96 128 Q 124 114 150 138" fill="none" stroke="#fb923c" stroke-width="2" opacity="0.8"/>
          <text x="97" y="108" text-anchor="middle" font-size="8.4" font-weight="800" fill="#fca5a5">基板通過で波形なまり</text>
          <text x="97" y="159" text-anchor="middle" font-size="8.2" fill="#cbd5e1">（目が潰れて読めない!）</text>

          <line x1="162" y1="129" x2="188" y2="129" stroke="#0284c7" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>

          <!-- Center: TI TDP2004 QFN-40 Retimer -->
          <rect x="192" y="92" width="166" height="74" rx="7" fill="url(#${p}_emc)" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="275" y="114" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">TI TDP2004 リタイマ</text>
          <text x="275" y="131" text-anchor="middle" font-size="8.8" fill="#67e8f9">内蔵CDR＋適応イコライザ</text>
          <text x="275" y="148" text-anchor="middle" font-size="8.6" font-weight="700" fill="#fef08a">ジッタをゼロへリセット再生成!</text>

          <line x1="360" y1="129" x2="386" y2="129" stroke="#16a34a" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>

          <!-- Restored Wide-Open Eye Pattern -->
          <rect x="390" y="92" width="136" height="74" rx="6" fill="#0f172a" stroke="#22c55e" stroke-width="1.5"/>
          <path d="M 402 150 L 424 112 L 492 112 L 514 150" fill="none" stroke="#4ade80" stroke-width="2.4"/>
          <path d="M 402 112 L 424 150 L 492 150 L 514 112" fill="none" stroke="#4ade80" stroke-width="2.4"/>
          <text x="458" y="134" text-anchor="middle" font-size="9" font-weight="800" fill="#fef08a">くっきり開口!</text>
          <text x="458" y="106" text-anchor="middle" font-size="8.2" font-weight="800" fill="#4ade80">10mケーブルでも途切れ0</text>

          <!-- Bottom Row: ±15kV Static Electricity TVS ESD Shield -->
          <rect x="22" y="186" width="516" height="86" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.4"/>
          <text x="280" y="204" text-anchor="middle" font-size="10.4" font-weight="800" fill="#92400e">② 超低容量ESD保護アレイ（Semtech RClamp0524P）：静電気の雷を1ナノ秒で逃がす!</text>
          <!-- Static Bolt at HDMI Port -> Shunted to GND by TVS Diode -> Safe BIONZ -->
          <rect x="34" y="216" width="114" height="44" rx="6" fill="#fee2e2" stroke="#dc2626"/>
          <text x="91" y="234" text-anchor="middle" font-size="9.6" font-weight="800" fill="#dc2626">⚡ HDMI端子</text>
          <text x="91" y="249" text-anchor="middle" font-size="8.6" font-weight="700" fill="#991b1b">±15,000V 静電気!</text>

          <line x1="150" y1="238" x2="210" y2="238" stroke="#dc2626" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>
          <!-- TVS Diode Diverting Surge Down to GND -->
          <rect x="214" y="214" width="154" height="48" rx="6" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>
          <text x="291" y="232" text-anchor="middle" font-size="9.4" font-weight="800" fill="#92400e">超高速TVS避雷針 (0.25pF)</text>
          <text x="291" y="247" text-anchor="middle" font-size="8.6" font-weight="700" fill="#dc2626">1nsでアース(GND)へ瞬時放電!</text>
          <text x="291" y="258" text-anchor="middle" font-size="7.8" fill="#475569">通常信号は邪魔しない超低容量</text>

          <line x1="370" y1="238" x2="404" y2="238" stroke="#16a34a" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>
          <rect x="408" y="216" width="118" height="44" rx="6" fill="#dcfce7" stroke="#16a34a"/>
          <text x="467" y="234" text-anchor="middle" font-size="9.6" font-weight="800" fill="#166534">BIONZ XR 無傷!</text>
          <text x="467" y="249" text-anchor="middle" font-size="8.4" fill="#14532d">現場での抜き差し安心</text>
        `,
      });

    // =========================================================================
    // XR43. Dedicated LPDDR5X PoP Memory Power Rail Sub-PMIC (VDD2H / VDDQ)
    // =========================================================================
    case 'xr_ddr5_vddq_pmic_sub':
      return renderBionzDiagram({
        code: 'xr43',
        badge: 'XR43',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        accentDark: '#3730a3',
        title: 'LPDDR5X専用 0.5V超静音サブPMIC電源',
        metric: 'VDDQ 0.5V / 精度 ±1%',
        analogyLine1: '頭上の超高速メモリだけを担当する「ノイズ隔離されたメモリ専属の給電係」です。',
        analogyLine2: 'わずか0.5Vという超繊細な電気を揺らさず供給し、連写バッファの省電力と安定を両立します。',
        chipHow: '独立サブPMIC＋厳密立上げ順序',
        chipBenefit: '無限連写の安定＆転送電力30%減',
        chipSpec: 'VDD2H 1.05V / VDDQ 0.5V',
        art: (p) => `
          <!-- Left: Power Isolation Comparison (Core PMIC Separated from Quiet Memory Sub-PMIC) -->
          <rect x="22" y="64" width="268" height="206" rx="8" fill="#eef2ff" stroke="#6366f1" stroke-width="1.5"/>
          <text x="156" y="83" text-anchor="middle" font-size="10.5" font-weight="800" fill="#3730a3">① コア電源から完全独立した「静音電源」</text>
          <!-- Noisy Core PMIC Block (Walled Off!) -->
          <rect x="34" y="94" width="108" height="72" rx="6" fill="#fef2f2" stroke="#f87171"/>
          <text x="88" y="112" text-anchor="middle" font-size="9.4" font-weight="800" fill="#991b1b">コア用PMIC(XR37)</text>
          <path d="M 44 134 L 54 122 L 64 146 L 76 120 L 88 148 L 100 124 L 114 142 L 130 132" fill="none" stroke="#dc2626" stroke-width="1.8"/>
          <text x="88" y="158" text-anchor="middle" font-size="8.2" fill="#991b1b">AI/CPUで電流が激変!</text>
          <!-- Isolation Wall -->
          <line x1="154" y1="94" x2="154" y2="174" stroke="#475569" stroke-width="3" stroke-dasharray="5 3"/>
          <text x="154" y="186" text-anchor="middle" font-size="8.2" font-weight="800" fill="#334155">電源アイランド隔離</text>
          <!-- Dedicated Quiet Sub-PMIC -->
          <rect x="166" y="94" width="112" height="72" rx="6" fill="#ffffff" stroke="#4f46e5" stroke-width="1.6"/>
          <text x="222" y="112" text-anchor="middle" font-size="9.4" font-weight="800" fill="#3730a3">専用サブPMIC(XR43)</text>
          <line x1="178" y1="134" x2="266" y2="134" stroke="#16a34a" stroke-width="2.8"/>
          <text x="222" y="152" text-anchor="middle" font-size="8.4" font-weight="800" fill="#16a34a">リプル &lt; 20mV!</text>
          <text x="222" y="162" text-anchor="middle" font-size="7.8" fill="#475569">0.24μHコイル×2内蔵</text>
          <!-- Arrow to PoP LPDDR5X -->
          <line x1="222" y1="168" x2="222" y2="196" stroke="#4f46e5" stroke-width="2.6" marker-end="url(#${p}_arr_purple)"/>
          <rect x="36" y="200" width="240" height="58" rx="6" fill="url(#${p}_dram)"/>
          <text x="156" y="220" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fff">2階 PoP LPDDR5X-8533 メモリ</text>
          <text x="156" y="236" text-anchor="middle" font-size="8.8" fill="#fef08a">毎秒85億回の超繊細0.5V信号をエラー0で動作!</text>
          <text x="156" y="250" text-anchor="middle" font-size="8.4" fill="#dbeafe">低電圧0.5V化で連写時の消費電力を約30%削減</text>

          <!-- Right: JEDEC Power-Up Sequence Staircase -->
          <rect x="302" y="64" width="236" height="206" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
          <text x="420" y="84" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">② 破損を防ぐ厳密な起動順序</text>
          <rect x="314" y="94" width="212" height="114" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
          <!-- 3 Staggered Power Ramp Curves -->
          <path d="M 324 196 H 344 L 358 112 H 516" fill="none" stroke="#7c3aed" stroke-width="2.6"/>
          <text x="514" y="108" text-anchor="end" font-size="8.6" font-weight="800" fill="#6d28d9">① VDD1 = 1.80V（最初に起動）</text>
          <path d="M 324 196 H 380 L 394 142 H 516" fill="none" stroke="#0284c7" stroke-width="2.6"/>
          <text x="514" y="138" text-anchor="end" font-size="8.6" font-weight="800" fill="#0369a1">② VDD2H = 1.05V</text>
          <path d="M 324 196 H 416 L 430 172 H 516" fill="none" stroke="#16a34a" stroke-width="2.6"/>
          <text x="514" y="168" text-anchor="end" font-size="8.6" font-weight="800" fill="#15803d">③ VDDQ = 0.50V</text>
          <text x="420" y="226" text-anchor="middle" font-size="9.4" font-weight="800" fill="#3730a3">マイクロ秒単位で順番通りに立上げ!</text>
          <text x="420" y="242" text-anchor="middle" font-size="8.8" fill="#475569">順番を間違えると故障(ラッチアップ)するため</text>
          <text x="420" y="256" text-anchor="middle" font-size="8.8" fill="#475569">専用シーケンサが毎回完璧に自動制御</text>
          ${stepBadge(310, 72, '2', '#4f46e5')}
        `,
      });

    // =========================================================================
    // XR44. Multi-Zone On-Die Thermal Sense Diode Array & Kelvin Telemetry Ring
    // =========================================================================
    case 'xr_die_thermal_diode_ring':
      return renderBionzDiagram({
        code: 'xr44',
        badge: 'XR44',
        accent: '#e11d48',
        accentSoft: '#fff1f2',
        accentDark: '#9f1239',
        title: 'オンダイ6点温度ダイオード＆監視リング',
        metric: '±0.5℃精度 / 1ms監視',
        analogyLine1: 'チップの中のAI・動画・CPUそれぞれに埋め込んだ「6個の超精密・内蔵体温計」です。',
        analogyLine2: '今どこが一番熱いか1/1000秒ごとに見張り、録画を止めずに賢く冷却制御します。',
        chipHow: '6点ΔV_BEダイオード＋ケルビン環',
        chipBenefit: '熱暴走防止＆限界連続録画時間',
        chipSpec: '精度±0.5℃ / 0–125℃全域',
        art: (_p) => `
          <!-- Left: Live 6-Zone Thermal Heatmap Floorplan on BIONZ XR Silicon Die -->
          <rect x="22" y="64" width="268" height="206" rx="8" fill="#0f172a" stroke="#e11d48" stroke-width="1.5"/>
          <text x="156" y="83" text-anchor="middle" font-size="10.5" font-weight="800" fill="#fda4af">① シリコン内部 6地点リアルタイム体温マップ</text>
          <!-- Die Outline + Shielded Gold Kelvin Telemetry Ring -->
          <rect x="42" y="92" width="228" height="150" rx="8" fill="#1e293b" stroke="#475569"/>
          <ellipse cx="156" cy="167" rx="84" ry="54" fill="none" stroke="#facc15" stroke-width="2.4" stroke-dasharray="6 3"/>
          <!-- 6 Thermal Diode Hotspot Zones -->
          ${[
            [86, 126, 'AI NPU', '78℃', '#f97316'],
            [156, 118, 'ARM CPU', '64℃', '#38bdf8'],
            [226, 126, '8K HEVC', '86℃!', '#ef4444'],
            [86, 206, 'RAW ISP', '71℃', '#f59e0b'],
            [156, 214, 'DDR PHY', '69℃', '#38bdf8'],
            [226, 206, 'Cetus側', '62℃', '#22c55e'],
          ]
            .map(
              ([cx, cy, lbl, temp, col]) => `
                <circle cx="${cx}" cy="${cy}" r="22" fill="${col}" opacity="0.28"/>
                <circle cx="${cx}" cy="${cy}" r="13" fill="${col}" stroke="#ffffff" stroke-width="1.5"/>
                <text x="${cx}" y="${Number(cy) + 3.5}" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">${temp}</text>
                <text x="${cx}" y="${Number(cy) + 22}" text-anchor="middle" font-size="7.8" font-weight="700" fill="#e2e8f0">${lbl}</text>
              `
            )
            .join('')}
          <!-- Central ΔΣ Thermal ADC Hub -->
          <rect x="128" y="153" width="56" height="28" rx="5" fill="#eab308" stroke="#fff"/>
          <text x="156" y="166" text-anchor="middle" font-size="8.2" font-weight="800" fill="#422006">ΔΣ ADC</text>
          <text x="156" y="177" text-anchor="middle" font-size="7.4" font-weight="700" fill="#422006">1ms集計</text>
          <text x="156" y="259" text-anchor="middle" font-size="8.8" font-weight="700" fill="#fde047">黄色リング：ノイズ遮断ケルビン計測線</text>

          <!-- Right: How ΔV_BE Diode Measures Temperature + Smart DVFS Cooling -->
          <rect x="302" y="64" width="236" height="206" rx="8" fill="#fff1f2" stroke="#fb7185" stroke-width="1.4"/>
          <text x="420" y="84" text-anchor="middle" font-size="10.5" font-weight="800" fill="#9f1239">② どうやって0.5℃精度で測るの？</text>
          <!-- Linear V_f vs Temp Mini Graph -->
          <rect x="314" y="94" width="212" height="72" rx="6" fill="#ffffff" stroke="#fecdd3"/>
          <line x1="330" y1="152" x2="512" y2="152" stroke="#64748b" stroke-width="1.2"/>
          <line x1="330" y1="104" x2="330" y2="152" stroke="#64748b" stroke-width="1.2"/>
          <line x1="336" y1="112" x2="504" y2="146" stroke="#e11d48" stroke-width="2.6"/>
          <text x="422" y="114" text-anchor="middle" font-size="8.6" font-weight="800" fill="#9f1239">温度が1℃上がると電圧が−2mV低下</text>
          <text x="422" y="148" text-anchor="middle" font-size="8.2" fill="#475569">物理法則(ΔV_BE)だから個体ズレなし!</text>

          <!-- Smart Action Steps -->
          <rect x="314" y="174" width="212" height="86" rx="6" fill="#ffffff" stroke="#e11d48"/>
          <text x="420" y="192" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">③ 熱い場所だけピンポイント制御</text>
          <text x="326" y="210" font-size="9" font-weight="700" fill="#334155">・基板温度計より100倍速く急昇温を検知</text>
          <text x="326" y="226" font-size="9" font-weight="700" fill="#334155">・熱い回路だけDVFS微調整→録画継続!</text>
          <text x="326" y="242" font-size="9" font-weight="700" fill="#dc2626">・限界温度なら安全自動シャットダウン</text>
          <text x="326" y="255" font-size="8.4" fill="#64748b">（チップの熱破壊を100%未然防止）</text>
        `,
      });

    // =========================================================================
    // XR45. Mainboard-Level 4-Corner Epoxy Edge-Bonding & Drop-Shock Stakes
    // =========================================================================
    case 'xr_bga_corner_underfill':
      return renderBionzDiagram({
        code: 'xr45',
        badge: 'XR45',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        accentDark: '#0f172a',
        title: '4隅エポキシ・エッジボンド耐落下アンカー',
        metric: '四隅応力 70%低減 / 1500G耐性',
        analogyLine1: 'カメラを落としても四隅のはんだボールが割れないようガッチリ固める「耐震アンカー」です。',
        analogyLine2: '真ん中は塗らず“四隅だけ”固定するため、頑丈さと修理交換のしやすさを両立しています!',
        chipHow: 'L字コーナー・フィレット補強',
        chipBenefit: '落下衝撃・寒暖差の故障を激減',
        chipSpec: 'Loctite 3515 / JEDEC 1500G',
        art: (p) => `
          <!-- Left: BAD (No Corner Stakes -> Drop Flex Snaps Outermost Corner BGA Balls!) -->
          <rect x="22" y="64" width="218" height="206" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          ${comparePill(32, 72, 198, false, '4隅補強なしで落下すると…')}
          <!-- Flexed Bowed Mainboard -->
          <path d="M 36 184 Q 131 158 226 184" fill="none" stroke="#15803d" stroke-width="12" stroke-linecap="round"/>
          <!-- Rigid BGA Package Above -->
          <rect x="64" y="132" width="134" height="22" rx="4" fill="url(#${p}_emc)"/>
          <text x="131" y="147" text-anchor="middle" font-size="9.4" font-weight="800" fill="#fff">BIONZ パッケージ</text>
          <!-- Center Balls Intact, Corner Balls Snapped! -->
          ${[76, 98, 120, 142, 164, 186]
            .map((x, idx) => {
              const corner = idx === 0 || idx === 5;
              return `<circle cx="${x}" cy="${corner ? 166 : 162}" r="5.5" fill="${corner ? '#dc2626' : '#cbd5e1'}" stroke="#334155"/>${corner ? `<path d="M ${x - 7} 161 L ${x + 7} 171" stroke="#fff" stroke-width="2.2"/>` : ''}`;
            })
            .join('')}
          <text x="131" y="118" text-anchor="middle" font-size="9.4" font-weight="800" fill="#dc2626">基板がたわむと一番外側の</text>
          <text x="131" y="214" text-anchor="middle" font-size="9.8" font-weight="800" fill="#991b1b">四隅ボールに力が集中(最大DNP)!</text>
          <text x="131" y="232" text-anchor="middle" font-size="9.4" fill="#7f1d1d">最初に四隅が割れて電源が入らなくなる</text>

          <!-- Right: GOOD (4-Corner L-Shaped Epoxy Stakes Top View + Concave Fillet) -->
          <rect x="252" y="64" width="286" height="206" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>
          ${comparePill(262, 72, 266, true, 'α7 IV 実機の「4隅L字エッジボンド補強」')}
          <!-- Top-Down View of 32x32 BGA Package with 4 L-Shaped Corner Epoxy Stakes! -->
          <rect x="334" y="110" width="118" height="100" rx="8" fill="url(#${p}_pcb)" stroke="#14532d" stroke-width="1.5"/>
          <text x="393" y="156" text-anchor="middle" font-size="10" font-weight="800" fill="#dcfce7">BIONZ XR</text>
          <text x="393" y="170" text-anchor="middle" font-size="8.6" fill="#fef08a">中央は空き(修理OK)</text>
          <!-- 4 Bold L-Shaped Black Epoxy Corner Stakes Hugging All 4 Corners! -->
          <path d="M 326 138 L 326 102 L 362 102" fill="none" stroke="#1e293b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 424 102 L 460 102 L 460 138" fill="none" stroke="#1e293b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 326 182 L 326 218 L 362 218" fill="none" stroke="#1e293b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 424 218 L 460 218 L 460 182" fill="none" stroke="#1e293b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Yellow Highlight Accent on Corners -->
          <circle cx="326" cy="102" r="4" fill="#facc15"/>
          <circle cx="460" cy="102" r="4" fill="#facc15"/>
          <circle cx="326" cy="218" r="4" fill="#facc15"/>
          <circle cx="460" cy="218" r="4" fill="#facc15"/>
          ${stepBadge(292, 114, '1', '#334155')}
          ${stepBadge(492, 160, '2', '#16a34a')}
          <text x="292" y="142" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">L字樹脂</text>
          <text x="292" y="154" text-anchor="middle" font-size="8.2" fill="#475569">四隅固定</text>
          <text x="498" y="184" text-anchor="middle" font-size="8.6" font-weight="800" fill="#166534">局所加熱で</text>
          <text x="498" y="196" text-anchor="middle" font-size="8.2" fill="#15803d">修理交換可</text>

          <text x="395" y="242" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">① 4隅のせん断応力を約70%カット（1,500G耐衝撃）</text>
          <text x="395" y="258" text-anchor="middle" font-size="9.2" font-weight="700" fill="#15803d">② 全面接着と違いサービスセンターで交換修理も可能!</text>
        `,
      });

    // =========================================================================
    // XR46. Factory ATE / JTAG / SWD Micro-Probe Pads & OTP Security eFuse Bank
    // =========================================================================
    case 'xr_jtag_swd_debug_header':
      return renderBionzDiagram({
        code: 'xr46',
        badge: 'XR46',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        accentDark: '#92400e',
        title: '工場ATE検査パッド ＆ OTP永久封印eFuse',
        metric: '全数検査 → 出荷時物理封印',
        analogyLine1: '工場で全機能の合格診断を終えた瞬間、二度と悪用されないよう鍵穴を焼き切る「秘密の検査口」です。',
        analogyLine2: '出荷前の100%品質チェックと、出荷後の鉄壁ハッキング防止を両立しています。',
        chipHow: '2×8金パッド検査＋eFuse永久溶断',
        chipBenefit: '不良ゼロ品質＆C2PA鍵の絶対防御',
        chipSpec: 'IEEE 1149.1 JTAG / OTP eFuse',
        art: (p) => `
          <!-- Left: Stage 1 Factory ATE Robotic Pogo-Pin Probe Testing -->
          <rect x="22" y="64" width="236" height="206" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.4"/>
          <text x="140" y="83" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0369a1">① 工場出荷前：ロボット全数診断</text>
          <!-- Spring-Loaded Crown-Tip Pogo Pins Coming Down onto Gold Pads -->
          ${[64, 102, 140, 178, 216]
            .map(
              (x) => `
                <rect x="${x - 3}" y="94" width="6" height="32" fill="#94a3b8" stroke="#475569"/>
                <polygon points="${x - 4},126 ${x + 4},126 ${x},138" fill="url(#${p}_gold)"/>
                <ellipse cx="${x}" cy="144" rx="11" ry="5" fill="url(#${p}_gold)" stroke="#854d0e" stroke-width="1.2"/>
              `
            )
            .join('')}
          <rect x="34" y="148" width="212" height="24" rx="4" fill="url(#${p}_pcb)"/>
          <text x="140" y="164" text-anchor="middle" font-size="9.4" font-weight="800" fill="#dcfce7">2×8 厚膜ENIG金プローブ検査パッド</text>
          <rect x="36" y="182" width="208" height="78" rx="6" fill="#ffffff" stroke="#7dd3fc"/>
          <text x="140" y="199" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">バウンダリスキャン（JTAG/SWD）</text>
          <text x="48" y="216" font-size="8.8" fill="#334155">・1,400個のBGAハンダ導通を数秒診断</text>
          <text x="48" y="231" font-size="8.8" fill="#334155">・カメラ個体補正データ＆鍵を書き込み</text>
          <text x="48" y="246" font-size="8.8" font-weight="800" fill="#16a34a">→ 全項目 100% 合格を確認!</text>
          ${stepBadge(30, 72, '1', '#0284c7')}

          <line x1="260" y1="158" x2="282" y2="158" stroke="#d97706" stroke-width="2.8" marker-end="url(#${p}_arr_gold)"/>

          <!-- Right: Stage 2 Permanent OTP eFuse Blow-Link Security Lock! -->
          <rect x="286" y="64" width="252" height="206" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>
          <text x="412" y="83" text-anchor="middle" font-size="10.4" font-weight="800" fill="#92400e">② 合格直後：OTP eFuse を永久焼き切り!</text>
          <!-- Exposed Quartz Window Showing 4 Intact + 4 Laser-Blown Fuse Craters -->
          <rect x="302" y="94" width="220" height="86" rx="7" fill="#0f172a" stroke="#f59e0b" stroke-width="1.6"/>
          <text x="358" y="110" text-anchor="middle" font-size="8.6" font-weight="800" fill="#4ade80">通電中（通常設定）</text>
          <text x="466" y="110" text-anchor="middle" font-size="8.6" font-weight="800" fill="#f87171">永久溶断（デバッグ封鎖!）</text>
          <line x1="412" y1="100" x2="412" y2="174" stroke="#475569" stroke-width="1.2" stroke-dasharray="3 2"/>
          <!-- Left 4 Intact Gold Links -->
          ${[322, 344, 366, 388]
            .map(
              (x) =>
                `<rect x="${x - 3}" y="118" width="6" height="48" rx="1" fill="url(#${p}_gold)"/>`
            )
            .join('')}
          <!-- Right 4 Physically Blown Open Links with Red Crater! -->
          ${[434, 456, 478, 500]
            .map(
              (x) => `
                <rect x="${x - 3}" y="118" width="6" height="16" rx="1" fill="url(#${p}_gold)"/>
                <circle cx="${x}" cy="142" r="5" fill="#dc2626" stroke="#fca5a5" stroke-width="1"/>
                <rect x="${x - 3}" y="150" width="6" height="16" rx="1" fill="url(#${p}_gold)"/>
              `
            )
            .join('')}
          <!-- Bottom Security Result -->
          <rect x="302" y="188" width="220" height="72" rx="6" fill="#ffffff" stroke="#f59e0b"/>
          <text x="412" y="206" text-anchor="middle" font-size="9.6" font-weight="800" fill="#dc2626">一度焼き切ると物理的に二度と戻せない!</text>
          <text x="412" y="223" text-anchor="middle" font-size="9" fill="#334155">出荷後は外部からデバッグ侵入不能になり、</text>
          <text x="412" y="238" text-anchor="middle" font-size="9" font-weight="800" fill="#92400e">C2PA真正性・秘密鍵(XR21)を鉄壁保護!</text>
          <text x="412" y="253" text-anchor="middle" font-size="8.2" fill="#64748b">（パッドに残る小さな丸痕が工場合格の証）</text>
          ${stepBadge(294, 72, '2', '#dc2626')}
        `,
      });

    default:
      return null;
  }
}
