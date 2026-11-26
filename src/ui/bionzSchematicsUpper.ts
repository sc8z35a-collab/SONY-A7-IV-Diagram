import { PartExplanation } from '../assemblies/types';
import {
  comparePill,
  loupeRing,
  renderBionzDiagram,
  stepBadge,
} from './bionzSchematicsShared';

/**
 * High-precision, beginner-friendly 560x400 SVG schematics for BIONZ XR (XR01–XR15).
 */
export function renderBionzUpperSvg(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // =========================================================================
    // XR01. Conformal Sputtered EMI Shield (SUS/Cu/SUS) & Laser-Marked Top Lid
    // =========================================================================
    case 'xr_emi_conformal_shield':
      return renderBionzDiagram({
        code: 'xr01',
        badge: 'XR01',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        accentDark: '#1e293b',
        title: '全面スパッタEMIシールド＆刻印リッド',
        metric: '極薄4μm / 遮蔽-45dB',
        analogyLine1: '高速計算チップ全体をすっぽり包む「超うす型・金属ヘルメット」です。',
        analogyLine2: '中で飛び交う邪魔な電波を閉じ込め、外からのノイズも跳ね返します。',
        chipHow: 'SUS/Cu/SUS 3層スパッタ',
        chipBenefit: '写真縞ノイズ・Wi-Fi混信防止',
        chipSpec: '膜厚4μm / 360°接地',
        art: (p) => `
          <!-- Left: Package Cross-Section Wrapped in Conformal Shield -->
          <text x="165" y="72" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1e293b">パッケージ断面：360°の電波バリア</text>
          <!-- Outer Conformal Shield Helmet -->
          <path d="M 46 218 L 46 112 Q 46 96 62 96 L 268 96 Q 284 96 284 112 L 284 218" fill="none" stroke="url(#${p}_sus)" stroke-width="11" stroke-linejoin="round"/>
          <path d="M 52 218 L 52 114 Q 52 103 63 103 L 267 103 Q 278 103 278 114 L 278 218" fill="none" stroke="url(#${p}_cu)" stroke-width="3.2"/>
          <!-- EMC Body & Internal Silicon Die -->
          <rect x="57" y="108" width="216" height="106" rx="4" fill="url(#${p}_emc)"/>
          <rect x="88" y="138" width="154" height="44" rx="4" fill="url(#${p}_teal)" stroke="#5eead4" stroke-width="1.2"/>
          <text x="165" y="157" text-anchor="middle" font-size="11.5" font-weight="800" fill="#ffffff">BIONZ XR / XR2 シリコン</text>
          <text x="165" y="172" text-anchor="middle" font-size="9.5" fill="#ccfbf1">数GHzで超高速動作（電波発生源）</text>
          <!-- PCB Ground Base & Spring Fingers -->
          <rect x="28" y="216" width="274" height="24" rx="4" fill="url(#${p}_pcb)"/>
          <text x="165" y="232" text-anchor="middle" font-size="10.5" font-weight="700" fill="#dcfce7">基板 GND（アースへ電波ノイズを逃がす）</text>
          <!-- Grounding Foot Tabs -->
          <rect x="40" y="210" width="16" height="10" rx="2" fill="url(#${p}_gold)"/>
          <rect x="274" y="210" width="16" height="10" rx="2" fill="url(#${p}_gold)"/>
          <!-- Internal EMI Waves Bouncing Back -->
          <path d="M 118 138 Q 112 121 124 112 Q 134 121 130 134" fill="none" stroke="#f43f5e" stroke-width="2" marker-end="url(#${p}_arr_red)"/>
          <path d="M 205 138 Q 212 121 200 112 Q 190 121 194 134" fill="none" stroke="#f43f5e" stroke-width="2" marker-end="url(#${p}_arr_red)"/>
          <text x="165" y="125" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fda4af">内部ノイズを跳ね返す!</text>
          <!-- External Wi-Fi/Noise Blocked -->
          <path d="M 16 146 Q 26 138 35 148" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 2"/>
          <line x1="34" y1="142" x2="40" y2="154" stroke="#dc2626" stroke-width="2.2"/>
          <line x1="40" y1="142" x2="34" y2="154" stroke="#dc2626" stroke-width="2.2"/>
          <text x="29" y="170" text-anchor="middle" font-size="7.8" font-weight="800" fill="#0369a1">外部電波</text>
          <text x="29" y="181" text-anchor="middle" font-size="7.8" font-weight="800" fill="#dc2626">侵入NG</text>
          <!-- Laser Etched Top Label Callout -->
          <line x1="165" y1="91" x2="165" y2="80" stroke="#475569" stroke-width="1.2"/>
          <text x="165" y="258" text-anchor="middle" font-size="10" font-weight="700" fill="#334155">① 4隅の接地フィンガーで全周を基板アースへ直結</text>
          ${stepBadge(48, 200, '1', '#d97706')}

          <!-- Zoom Callout Connector to Loupe -->
          <circle cx="278" cy="112" r="10" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="3 2"/>
          <line x1="288" y1="112" x2="352" y2="112" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>

          <!-- Right: Microscope Loupe of 3-Layer Sputter Film -->
          <clipPath id="${p}_loupe"><circle cx="428" cy="166" r="68"/></clipPath>
          <circle cx="428" cy="166" r="68" fill="#f8fafc"/>
          <g clip-path="url(#${p}_loupe)">
            <!-- Layer 1: Top SUS -->
            <rect x="355" y="114" width="146" height="24" fill="url(#${p}_sus)"/>
            <text x="428" y="130" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">SUS 保護膜 (0.5μm)</text>
            <!-- Layer 2: Copper Core -->
            <rect x="355" y="138" width="146" height="36" fill="url(#${p}_cu)"/>
            <text x="428" y="154" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">純銅 Cu 遮蔽層 (3μm)</text>
            <text x="428" y="167" text-anchor="middle" font-size="8.8" fill="#ffedd5">電波エネルギーを吸収!</text>
            <!-- Layer 3: Adhesion SUS -->
            <rect x="355" y="174" width="146" height="20" fill="#64748b"/>
            <text x="428" y="188" text-anchor="middle" font-size="9.5" font-weight="700" fill="#ffffff">SUS 密着下地 (0.5μm)</text>
            <!-- EMC Substrate Below -->
            <rect x="355" y="194" width="146" height="44" fill="#1e293b"/>
            <text x="428" y="214" text-anchor="middle" font-size="9.5" fill="#94a3b8">パッケージ樹脂表面</text>
          </g>
          ${loupeRing(428, 166, 68, '拡大：4μm 3層膜', '#475569')}
          ${stepBadge(368, 156, '2', '#d97706')}
          <text x="428" y="256" text-anchor="middle" font-size="10" font-weight="700" fill="#334155">② 髪の毛の1/20の薄さで</text>
          <text x="428" y="270" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">GHzノイズを1/180以下へ遮断</text>
        `,
      });

    // =========================================================================
    // XR02. Nickel-Plated Oxygen-Free Copper IHS Heat Spreader
    // =========================================================================
    case 'xr_nickel_cu_ihs':
      return renderBionzDiagram({
        code: 'xr02',
        badge: 'XR02',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        accentDark: '#9a3412',
        title: 'ニッケルめっき無酸素銅ヒートスプレッダ',
        metric: '熱拡散面積 2.5倍!',
        analogyLine1: '火の一点集中を広い面へ瞬時に広げる「分厚い銅のフライパン底」です。',
        analogyLine2: '熱いチップを直接押さえ、4K/8K長回し録画でも熱ダレを遅らせます。',
        chipHow: '無酸素銅＋Ni防錆めっき',
        chipBenefit: '4K60p/8Kの長時間録画安定',
        chipSpec: 'k=398 W/m·K / C1020',
        art: (p) => `
          <!-- Left Panel: BAD (No IHS -> Local Hotspot) -->
          <rect x="24" y="64" width="218" height="206" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          ${comparePill(34, 72, 198, false, '銅の蓋(IHS)がない場合')}
          <!-- Small Die with Intense Red Hotspot -->
          <ellipse cx="133" cy="144" rx="34" ry="30" fill="#ef4444" opacity="0.22"/>
          <ellipse cx="133" cy="150" rx="20" ry="18" fill="#dc2626" opacity="0.45"/>
          <path d="M 133 166 L 133 116" stroke="#dc2626" stroke-width="3.2" marker-end="url(#${p}_arr_red)"/>
          <rect x="93" y="168" width="80" height="28" rx="4" fill="url(#${p}_si)"/>
          <text x="133" y="186" text-anchor="middle" font-size="10.5" font-weight="700" fill="#ffffff">発熱チップ</text>
          <rect x="52" y="196" width="162" height="18" rx="3" fill="url(#${p}_pcb)"/>
          <text x="133" y="110" text-anchor="middle" font-size="10.5" font-weight="800" fill="#b91c1c">狭い1点に熱が集中!</text>
          <text x="133" y="236" text-anchor="middle" font-size="10.5" font-weight="700" fill="#991b1b">すぐに高温警告が出て</text>
          <text x="133" y="252" text-anchor="middle" font-size="10.5" font-weight="700" fill="#991b1b">動画撮影が止まってしまう</text>

          <!-- Right Panel: GOOD (OFHC Copper IHS Spreading Heat 2.5x) -->
          <rect x="256" y="64" width="280" height="206" rx="8" fill="#fff7ed" stroke="#fdba74" stroke-width="1.2"/>
          ${comparePill(266, 72, 260, true, 'Niめっき無酸素銅 IHS あり')}

          <!-- Heat Spreading Arrows Upward -->
          ${[296, 344, 396, 448, 496]
            .map(
              (x) =>
                `<line x1="${x}" y1="128" x2="${x}" y2="104" stroke="#f97316" stroke-width="2.2" marker-end="url(#${p}_arr_gold)"/>`
            )
            .join('')}
          <text x="396" y="102" text-anchor="middle" font-size="10" font-weight="800" fill="#c2410c">広い面全体からボディへ一気に放熱!</text>

          <!-- Nickel Coating Rim + Thick Copper IHS Body + Stepped Pedestal -->
          <path d="M 276 130 L 516 130 L 516 196 L 496 196 L 496 154 L 444 154 L 444 166 L 348 166 L 348 154 L 296 154 L 296 196 L 276 196 Z" fill="url(#${p}_cu)" stroke="#64748b" stroke-width="2.6" stroke-linejoin="round"/>
          <text x="396" y="144" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">無酸素銅 IHS（表面はNiめっき）</text>
          <!-- Internal Diagonal Heat Conduction Arrows -->
          <path d="M 380 168 L 320 150" stroke="#fef08a" stroke-width="2.2" marker-end="url(#${p}_arr_gold)"/>
          <path d="M 412 168 L 472 150" stroke="#fef08a" stroke-width="2.2" marker-end="url(#${p}_arr_gold)"/>
          <!-- Main Die & Cetus Companion Die Below -->
          <rect x="352" y="168" width="88" height="26" rx="3" fill="url(#${p}_teal)"/>
          <text x="396" y="185" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">BIONZ 主ダイ</text>
          <rect x="450" y="172" width="36" height="22" rx="2" fill="url(#${p}_violet)"/>
          <text x="468" y="186" text-anchor="middle" font-size="8.5" font-weight="700" fill="#ffffff">副脳</text>
          <rect x="272" y="196" width="248" height="16" rx="3" fill="url(#${p}_pcb)"/>
          ${stepBadge(286, 138, '1', '#475569')}
          ${stepBadge(396, 158, '2', '#dc2626')}
          <text x="396" y="233" text-anchor="middle" font-size="10.5" font-weight="700" fill="#9a3412">① Niめっきが錆を防ぎ外圧からダイを保護</text>
          <text x="396" y="250" text-anchor="middle" font-size="10.5" font-weight="700" fill="#9a3412">② 熱を横へ素早く広げて面積2.5倍で冷却</text>
        `,
      });

    // =========================================================================
    // XR03. Die-to-IHS Thermal Interface Material 1 (Indium STIM + BSM)
    // =========================================================================
    case 'xr_tim1_indium_bond':
      return renderBionzDiagram({
        code: 'xr03',
        badge: 'XR03',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        accentDark: '#0369a1',
        title: 'チップ直結 TIM1（インジウム金属接合）',
        metric: '熱伝導 グリス比30倍',
        analogyLine1: '目に見えない表面のデコボコを隙間なく埋める「やわらかい金属のり」です。',
        analogyLine2: '熱を通さない“空気のすき間”を追い出し、熱の渋滞をゼロにします。',
        chipHow: 'BSM金下地＋純インジウム',
        chipBenefit: '熱暴走防止・チップ割れ吸収',
        chipSpec: 'k≈86 W/m·K / 融点156℃',
        art: (p) => `
          <!-- Left: BAD (Dry Contact -> Air Gaps Block Heat) -->
          <rect x="24" y="64" width="234" height="206" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          ${comparePill(34, 72, 214, false, 'TIM1なし（ミクロの空気の隙間）')}
          <!-- Upper Copper IHS with Jagged Micro-Roughness -->
          <path d="M 38 106 L 244 106 L 244 134 L 222 142 L 198 130 L 172 144 L 146 130 L 118 143 L 92 131 L 66 142 L 38 133 Z" fill="url(#${p}_cu)"/>
          <text x="141" y="123" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">銅 IHS（拡大すると凹凸）</text>
          <!-- Air Pockets -->
          <text x="90" y="155" text-anchor="middle" font-size="9.5" font-weight="800" fill="#dc2626">空気</text>
          <text x="146" y="155" text-anchor="middle" font-size="9.5" font-weight="800" fill="#dc2626">空気</text>
          <text x="200" y="155" text-anchor="middle" font-size="9.5" font-weight="800" fill="#dc2626">空気</text>
          <!-- Lower Silicon Die with Roughness -->
          <path d="M 38 164 L 66 156 L 92 167 L 118 157 L 146 168 L 172 156 L 198 166 L 222 157 L 244 164 L 244 196 L 38 196 Z" fill="url(#${p}_si)"/>
          <text x="141" y="185" text-anchor="middle" font-size="10.5" font-weight="700" fill="#e2e8f0">シリコンダイ（高温）</text>
          <!-- Blocked Heat Arrows -->
          <path d="M 90 174 L 90 158" stroke="#dc2626" stroke-width="2.2"/>
          <path d="M 198 174 L 198 158" stroke="#dc2626" stroke-width="2.2"/>
          <text x="141" y="220" text-anchor="middle" font-size="10.5" font-weight="800" fill="#b91c1c">空気は断熱材（k=0.026）!</text>
          <text x="141" y="238" text-anchor="middle" font-size="10" font-weight="700" fill="#991b1b">点接触しかせず熱が逃げられない</text>

          <!-- Right: GOOD (Indium STIM + AuIn2 + BSM) -->
          <rect x="272" y="64" width="264" height="206" rx="8" fill="#f0f9ff" stroke="#7dd3fc" stroke-width="1.2"/>
          ${comparePill(282, 72, 244, true, 'インジウム金属TIM1で完全密着')}
          <!-- Upper IHS -->
          <path d="M 288 106 L 520 106 L 520 130 L 494 136 L 466 128 L 434 136 L 404 128 L 372 136 L 340 128 L 310 136 L 288 130 Z" fill="url(#${p}_cu)"/>
          <text x="404" y="122" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">銅ヒートスプレッダ (IHS)</text>
          <!-- Filled Indium STIM Layer -->
          <path d="M 288 130 L 310 136 L 340 128 L 372 136 L 404 128 L 434 136 L 466 128 L 494 136 L 520 130 L 520 164 L 288 164 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
          <text x="404" y="152" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0c4a6e">純インジウム金属はんだ (STIM)</text>
          <!-- Gold BSM Wetting Flash Layer -->
          <rect x="288" y="164" width="232" height="7" fill="url(#${p}_gold)"/>
          <!-- Silicon Die -->
          <rect x="288" y="171" width="232" height="25" rx="2" fill="url(#${p}_si)"/>
          <text x="404" y="188" text-anchor="middle" font-size="10.5" font-weight="700" fill="#ffffff">シリコンダイ裏面（BSM金下地）</text>
          <!-- Fast Heat Arrows Passing Smoothly -->
          ${[322, 362, 404, 446, 486]
            .map(
              (x) =>
                `<line x1="${x}" y1="176" x2="${x}" y2="112" stroke="#facc15" stroke-width="2.2" marker-end="url(#${p}_arr_gold)"/>`
            )
            .join('')}
          ${stepBadge(302, 148, '1', '#0284c7')}
          ${stepBadge(506, 167, '2', '#ca8a04')}
          <text x="404" y="218" text-anchor="middle" font-size="10.2" font-weight="700" fill="#0369a1">① 柔らかい金属が凹凸を100%充填＆膨張吸収</text>
          <text x="404" y="236" text-anchor="middle" font-size="10.2" font-weight="700" fill="#0369a1">② 金下地(BSM)＋AuIn₂合金で剥がれゼロ</text>
          <text x="404" y="254" text-anchor="middle" font-size="10" font-weight="800" fill="#0c4a6e">熱抵抗を極小化し高温からダイを守る!</text>
        `,
      });

    // =========================================================================
    // XR04. Top PoP LPDDR5X DRAM & NAND MCP Molded Encapsulant
    // =========================================================================
    case 'xr_pop_lpddr5x_package':
      return renderBionzDiagram({
        code: 'xr04',
        badge: 'XR04',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        accentDark: '#1e40af',
        title: 'PoP 2階建てメモリ封止（LPDDR5X）',
        metric: '配線長 <1mm / 面積半減',
        analogyLine1: '頭脳(SoC)のすぐ真上に作業机(メモリ)を重ねた「2階建てオフィス」です。',
        analogyLine2: '隣町まで歩く代わりに真上へ手渡しできるため、超高速＆省スペース!',
        chipHow: 'Package-on-Package積層',
        chipBenefit: '小型ボディ＆超高速連写処理',
        chipSpec: 'Micron 4NA47 D8DNH',
        art: (p) => `
          <!-- Left: Traditional Side-by-Side (Slow & Wide) -->
          <rect x="24" y="64" width="222" height="206" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          ${comparePill(34, 72, 202, false, '従来の横並び配置（PC基板型）')}
          <rect x="38" y="132" width="66" height="40" rx="5" fill="url(#${p}_teal)"/>
          <text x="71" y="150" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">SoC</text>
          <text x="71" y="163" text-anchor="middle" font-size="9" fill="#ccfbf1">頭脳</text>
          <rect x="166" y="132" width="66" height="40" rx="5" fill="url(#${p}_dram)"/>
          <text x="199" y="150" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">DRAM</text>
          <text x="199" y="163" text-anchor="middle" font-size="9" fill="#dbeafe">メモリ</text>
          <rect x="32" y="172" width="206" height="20" rx="3" fill="url(#${p}_pcb)"/>
          <!-- Long Winding Route -->
          <path d="M 104 156 L 116 182 L 154 182 L 166 156" fill="none" stroke="#dc2626" stroke-width="2.6" stroke-dasharray="4 2" marker-end="url(#${p}_arr_red)"/>
          <text x="135" y="122" text-anchor="middle" font-size="10" font-weight="800" fill="#dc2626">配線が長い (20〜40mm)</text>
          <text x="135" y="218" text-anchor="middle" font-size="10" font-weight="700" fill="#991b1b">・基板が広くなりカメラ大型化</text>
          <text x="135" y="236" text-anchor="middle" font-size="10" font-weight="700" fill="#991b1b">・長い配線で遅延＆電力ロス増</text>

          <!-- Right: PoP 2-Story Package (BIONZ XR) -->
          <rect x="260" y="64" width="276" height="206" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.2"/>
          ${comparePill(270, 72, 256, true, 'BIONZ XR の PoP 2階建て構造')}

          <!-- 2nd Floor: Molded PoP DRAM Package -->
          <rect x="296" y="106" width="166" height="42" rx="6" fill="url(#${p}_emc)" stroke="#60a5fa" stroke-width="1.6"/>
          <rect x="314" y="116" width="130" height="22" rx="3" fill="url(#${p}_dram)"/>
          <text x="379" y="131" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">2階：LPDDR5X-8533 メモリ</text>
          <!-- Vertical PoP Balls -->
          ${[312, 330, 428, 446]
            .map(
              (x) =>
                `<circle cx="${x}" cy="154" r="5" fill="url(#${p}_solder)" stroke="#475569" stroke-width="1"/><rect x="${x - 3}" y="159" width="6" height="24" fill="url(#${p}_cu)"/>`
            )
            .join('')}
          <!-- Bidirectional Vertical Data Arrow -->
          <line x1="379" y1="150" x2="379" y2="176" stroke="#2563eb" stroke-width="2.6" marker-start="url(#${p}_arr_blue)" marker-end="url(#${p}_arr_blue)"/>
          <!-- 1st Floor: BIONZ XR SoC -->
          <rect x="296" y="176" width="166" height="32" rx="5" fill="url(#${p}_teal)" stroke="#0f766e" stroke-width="1.4"/>
          <text x="379" y="196" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">1階：BIONZ XR / XR2 頭脳</text>
          <rect x="284" y="208" width="190" height="14" rx="3" fill="url(#${p}_pcb)"/>

          <!-- Right Side Annotations -->
          ${stepBadge(476, 126, '1', '#2563eb')}
          <text x="490" y="124" font-size="9.8" font-weight="800" fill="#1e3a8a">真上に</text>
          <text x="490" y="137" font-size="9.8" font-weight="800" fill="#1e3a8a">立体積層</text>
          ${stepBadge(476, 164, '2', '#d97706')}
          <text x="490" y="162" font-size="9.8" font-weight="800" fill="#9a3412">距離&lt;1mm</text>
          <text x="490" y="175" font-size="9.8" font-weight="800" fill="#9a3412">最短直結</text>
          <text x="398" y="242" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1e40af">実装面積 約50%削減 ＋ 超高速・低発熱!</text>
          <text x="398" y="258" text-anchor="middle" font-size="9.8" fill="#1e3a8a">刻印例: Micron 4NA47 D8DNH（1βプロセス）</text>
        `,
      });

    // =========================================================================
    // XR05. Quad-Die Stacked LPDDR5X-8533 Frame-Buffer DRAM Silicon Stack
    // =========================================================================
    case 'xr_pop_dram_dies':
      return renderBionzDiagram({
        code: 'xr05',
        badge: 'XR05',
        accent: '#1d4ed8',
        accentSoft: '#eff6ff',
        accentDark: '#1e3a8a',
        title: '4段積層 LPDDR5X-8533 DRAMダイ群',
        metric: '40μm極薄 × 4階建て',
        analogyLine1: 'コピー用紙の半分より薄いメモリ板を4段重ねた「超大型・高速作業机」です。',
        analogyLine2: '秒間30コマの連写RAWや8K映像を一瞬で受け止め、待ち時間を消します。',
        chipHow: '階段オフセット4段＋DAF',
        chipBenefit: '途切れない高速連写＆プリ撮影',
        chipSpec: '8533 MT/s / 16バンク×4',
        art: (p) => `
          <!-- Left: 4-Tier Staircase Stacked DRAM Silicon Dies -->
          <text x="176" y="72" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1e3a8a">4段階段スタック構造（各層に16メモリ区画）</text>
          ${[0, 1, 2, 3]
            .map((i) => {
              const x = 36 + i * 16;
              const y = 186 - i * 30;
              const w = 216 - i * 16;
              const colors = ['#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6'];
              return `
                ${i > 0 ? `<rect x="${x + 2}" y="${y + 22}" width="${w - 4}" height="7" rx="1" fill="#f59e0b" opacity="0.88"/>` : ''}
                <rect x="${x}" y="${y}" width="${w}" height="22" rx="3" fill="${colors[i]}" stroke="#93c5fd" stroke-width="1"/>
                <rect x="${x + 8}" y="${y + 4}" width="${w - 34}" height="14" rx="2" fill="#ffffff" opacity="0.14"/>
                <text x="${x + (w - 22) * 0.5}" y="${y + 14.5}" text-anchor="middle" font-size="9.8" font-weight="800" fill="#ffffff">Die ${i + 1}（16バンク / 40μm極薄）</text>
                <rect x="${x + w - 18}" y="${y + 3}" width="12" height="5" rx="1" fill="url(#${p}_gold)"/>
                <rect x="${x + w - 18}" y="${y + 13}" width="12" height="5" rx="1" fill="url(#${p}_gold)"/>
              `;
            })
            .join('')}
          <!-- Base Die Attach + Interposer -->
          <rect x="28" y="210" width="256" height="16" rx="3" fill="url(#${p}_pcb)"/>
          <text x="156" y="222" text-anchor="middle" font-size="9.5" font-weight="700" fill="#dcfce7">PoP 上層インターポーザ基板</text>
          <!-- Callout for Staggered Pad Terraces & DAF -->
          ${stepBadge(270, 128, '1', '#eab308')}
          <text x="156" y="246" text-anchor="middle" font-size="10" font-weight="700" fill="#1e3a8a">① 少しずつズラして積み、全4段の金電極を露出</text>
          <text x="156" y="262" text-anchor="middle" font-size="10" font-weight="700" fill="#b45309">② 黄色いDAF極薄接着フィルムで4層を歪みゼロ固定</text>

          <!-- Right: Thickness Comparison & Bandwidth Box -->
          <rect x="310" y="70" width="224" height="196" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.2"/>
          <text x="422" y="90" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1e3a8a">どれくらい薄くて速いの？</text>
          <!-- Hair vs DRAM Scale Comparison -->
          <rect x="330" y="104" width="184" height="18" rx="9" fill="#475569"/>
          <text x="422" y="117" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">人間の髪の毛：約 80 μm</text>
          <rect x="330" y="128" width="92" height="14" rx="7" fill="#2563eb"/>
          <text x="428" y="139" font-size="9.2" font-weight="800" fill="#1d4ed8">40μm（髪の半分!）</text>

          <!-- 4-Channel Parallel Burst Flow -->
          <rect x="326" y="158" width="192" height="94" rx="7" fill="#ffffff" stroke="#bfdbfe"/>
          <text x="422" y="176" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1e40af">4段同時アクセス＝超広帯域</text>
          ${[0, 1, 2, 3]
            .map(
              (k) =>
                `<rect x="${338 + k * 44}" y="186" width="36" height="22" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="${356 + k * 44}" y="201" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1e40af">CH${k + 1}</text>`
            )
            .join('')}
          <text x="422" y="226" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f766e">最大 64〜100 GB/s の高速書込</text>
          <text x="422" y="242" text-anchor="middle" font-size="9.6" fill="#334155">1秒間のプリ連写も丸ごと一時保管!</text>
        `,
      });

    // =========================================================================
    // XR06. Cascaded Gold Wire-Bond Array & Top PoP Interposer Substrate
    // =========================================================================
    case 'xr_pop_wirebond_interposer':
      return renderBionzDiagram({
        code: 'xr06',
        badge: 'XR06',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        accentDark: '#854d0e',
        title: '階段状・純金ワイヤボンド＆中継基板',
        metric: 'φ18μm 純金アーチ48本+',
        analogyLine1: '髪の毛の1/4の細さの「純金のつり橋」で4段のメモリと基板をつなぎます。',
        analogyLine2: '高さの違う4つの階から1本も絡まず、最短距離で電気を運びます。',
        chipHow: 'ボール→アーチ→ステッチ接合',
        chipBenefit: '高速メモリ信号のタイミング一致',
        chipSpec: 'φ18μm Au / 4層BT基板',
        art: (p) => `
          <!-- Left: Cascading Gold Wirebond Arches from 4 Stacked Dies -->
          <text x="172" y="72" text-anchor="middle" font-size="11.5" font-weight="800" fill="#854d0e">4段メモリから基板へ降りる純金アーチ橋</text>
          <!-- 4 Stacked Dies on Left -->
          ${[0, 1, 2, 3]
            .map((i) => {
              const y = 186 - i * 26;
              const w = 152 - i * 16;
              return `
                <rect x="34" y="${y}" width="${w}" height="20" rx="2" fill="url(#${p}_dram)" stroke="#93c5fd"/>
                <text x="${34 + w * 0.44}" y="${y + 13.5}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">DRAM ${i + 1}段目</text>
                <circle cx="${34 + w - 8}" cy="${y}" r="3.6" fill="url(#${p}_gold)" stroke="#854d0e" stroke-width="0.8"/>
                <path d="M ${34 + w - 8} ${y} C ${34 + w + 26} ${y - 26}, ${222 + i * 20} ${y + 12}, ${212 + i * 22} 214" fill="none" stroke="url(#${p}_gold)" stroke-width="2.4"/>
                <rect x="${204 + i * 22}" y="212" width="16" height="5" rx="1" fill="url(#${p}_gold)"/>
              `;
            })
            .join('')}
          <!-- Interposer PCB Below -->
          <rect x="24" y="216" width="296" height="22" rx="4" fill="url(#${p}_pcb)"/>
          <text x="172" y="231" text-anchor="middle" font-size="10.2" font-weight="700" fill="#dcfce7">PoP 多層インターポーザ（千鳥配列ENIG金パッド）</text>
          <!-- Micro MLCC on Corner -->
          <rect x="296" y="205" width="16" height="11" rx="2" fill="#d97706" stroke="#92400e"/>
          <rect x="294" y="205" width="4" height="11" fill="#cbd5e1"/>
          <rect x="310" y="205" width="4" height="11" fill="#cbd5e1"/>
          ${stepBadge(234, 140, '1', '#ca8a04')}
          <text x="172" y="256" text-anchor="middle" font-size="10" font-weight="700" fill="#713f12">① ループ高さを精密制御し、隣の金線と絶対ショートさせない!</text>
          <text x="172" y="271" text-anchor="middle" font-size="9.8" font-weight="700" fill="#15803d">② 等長配線＋4隅 01005コンデンサで8533MT/sの波を安定化</text>

          <!-- Right: Microscope Loupe of Ball-to-Stitch Weld -->
          <clipPath id="${p}_loupe"><circle cx="434" cy="166" r="68"/></clipPath>
          <circle cx="434" cy="166" r="68" fill="#fefce8"/>
          <g clip-path="url(#${p}_loupe)">
            <!-- Die Pad + Gold Ball Bond -->
            <rect x="366" y="176" width="52" height="58" fill="url(#${p}_dram)"/>
            <rect x="380" y="170" width="26" height="7" fill="url(#${p}_gold)"/>
            <circle cx="393" cy="162" r="10" fill="url(#${p}_gold)" stroke="#854d0e" stroke-width="1.4"/>
            <!-- Arch Wire -->
            <path d="M 393 152 C 398 118, 466 118, 474 186" fill="none" stroke="url(#${p}_gold)" stroke-width="5"/>
            <!-- Interposer Pad + Wedge Stitch -->
            <rect x="444" y="190" width="60" height="44" fill="url(#${p}_pcb)"/>
            <rect x="456" y="185" width="32" height="6" fill="url(#${p}_gold)"/>
            <ellipse cx="474" cy="184" rx="10" ry="4" fill="#facc15" stroke="#854d0e" stroke-width="1"/>
            <!-- Labels Inside Loupe -->
            <text x="394" y="140" text-anchor="middle" font-size="9" font-weight="800" fill="#854d0e">超音波ボール</text>
            <text x="466" y="152" text-anchor="middle" font-size="9" font-weight="800" fill="#854d0e">φ18μm</text>
            <text x="472" y="206" text-anchor="middle" font-size="8.8" font-weight="700" fill="#dcfce7">ステッチ圧着</text>
          </g>
          ${loupeRing(434, 166, 68, '拡大：超音波金接合', '#ca8a04')}
          <text x="434" y="254" text-anchor="middle" font-size="10" font-weight="800" fill="#854d0e">超音波振動で原子レベル接合</text>
          <text x="434" y="269" text-anchor="middle" font-size="9.5" fill="#713f12">（髪の毛80μmの約1/4の細さ!）</text>
        `,
      });

    // =========================================================================
    // XR07. PoP Inter-Package Solder Balls & TMV / TIV Vertical Copper Pillars
    // =========================================================================
    case 'xr_tmv_pop_balls':
      return renderBionzDiagram({
        code: 'xr07',
        badge: 'XR07',
        accent: '#d97706',
        accentSoft: '#fff7ed',
        accentDark: '#9a3412',
        title: 'TMV / TIV 垂直銅ピラー＆PoP接続球',
        metric: '200本超 垂直直通柱',
        analogyLine1: '1階の頭脳(SoC)と2階のメモリを直結する「200基以上の専用エレベーター」です。',
        analogyLine2: 'わずか0.3mmの上下移動だけで、写真データを秒速100GB級で運びます。',
        chipHow: 'レーザー開孔TMV＋垂直銅柱',
        chipBenefit: '超低遅延＆8K/高速連写処理',
        chipSpec: '距離0.3mm / 2重リング配列',
        art: (p) => `
          <!-- Left: Full Cross-Section of PoP Vertical Elevator Architecture -->
          <text x="176" y="72" text-anchor="middle" font-size="11.5" font-weight="800" fill="#9a3412">パッケージ断面：1階と2階を結ぶ垂直銅柱</text>
          <!-- 2nd Floor PoP DRAM Interposer -->
          <rect x="28" y="84" width="296" height="24" rx="4" fill="url(#${p}_dram)" stroke="#1e3a8a"/>
          <text x="176" y="100" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">2階：PoP LPDDR5X メモリパッケージ</text>
          <!-- Mold Compound Surrounding Central SoC -->
          <rect x="28" y="128" width="296" height="72" rx="3" fill="url(#${p}_emc)" opacity="0.92"/>
          <!-- Central BIONZ XR SoC -->
          <rect x="116" y="148" width="120" height="44" rx="4" fill="url(#${p}_teal)" stroke="#5eead4" stroke-width="1.3"/>
          <text x="176" y="168" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">1階：BIONZ XR</text>
          <text x="176" y="182" text-anchor="middle" font-size="9" fill="#ccfbf1">頭脳チップ本体</text>
          <!-- 4 Vertical TMV / TIV Copper Pillars + Conical Funnels + PoP Solder Balls -->
          ${[52, 86, 266, 300]
            .map(
              (x) => `
                <rect x="${x - 8}" y="108" width="16" height="4" fill="url(#${p}_gold)"/>
                <circle cx="${x}" cy="119" r="8.5" fill="url(#${p}_solder)" stroke="#475569" stroke-width="1.1"/>
                <polygon points="${x - 10},128 ${x + 10},128 ${x + 6},139 ${x - 6},139" fill="#94a3b8"/>
                <rect x="${x - 5.5}" y="136" width="11" height="64" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="0.9"/>
                <rect x="${x - 8}" y="198" width="16" height="4" fill="url(#${p}_gold)"/>
              `
            )
            .join('')}
          <!-- Bottom ABF Substrate with Internal Trace Routing SoC <-> Pillars -->
          <rect x="28" y="202" width="296" height="28" rx="4" fill="url(#${p}_pcb)"/>
          <path d="M 86 204 V 216 H 146 V 192" fill="none" stroke="#facc15" stroke-width="2.4" marker-end="url(#${p}_arr_gold)"/>
          <path d="M 266 204 V 216 H 206 V 192" fill="none" stroke="#facc15" stroke-width="2.4" marker-end="url(#${p}_arr_gold)"/>
          <text x="176" y="226" text-anchor="middle" font-size="9.5" font-weight="700" fill="#dcfce7">ABF基板内を経由し最短0.3mmでSoCと直結</text>
          ${stepBadge(52, 166, '1', '#d97706')}
          ${stepBadge(300, 119, '2', '#475569')}
          <text x="176" y="248" text-anchor="middle" font-size="10" font-weight="700" fill="#9a3412">① 外周2重リングに並んだ200本超の垂直銅ピラー</text>
          <text x="176" y="264" text-anchor="middle" font-size="10" font-weight="700" fill="#475569">② 上端はSAC305はんだ球で2階メモリと自動整列接合</text>

          <!-- Right: Microscope Loupe of Single TMV + Cu6Sn5 IMC Joint -->
          <clipPath id="${p}_loupe"><circle cx="436" cy="166" r="68"/></clipPath>
          <circle cx="436" cy="166" r="68" fill="#fff7ed"/>
          <g clip-path="url(#${p}_loupe)">
            <rect x="366" y="98" width="140" height="16" fill="url(#${p}_dram)"/>
            <rect x="410" y="114" width="52" height="7" fill="url(#${p}_gold)"/>
            <circle cx="436" cy="136" r="21" fill="url(#${p}_solder)" stroke="#475569" stroke-width="1.5"/>
            <text x="436" y="139" text-anchor="middle" font-size="9" font-weight="800" fill="#0f172a">SAC305球</text>
            <!-- Cu6Sn5 IMC Collar -->
            <rect x="412" y="159" width="48" height="10" rx="2" fill="#cbd5e1" stroke="#334155"/>
            <text x="436" y="167" text-anchor="middle" font-size="7.4" font-weight="800" fill="#0f172a">Cu₆Sn₅合金</text>
            <!-- Conical TMV Mold Wall -->
            <polygon points="366,154 406,154 418,174 418,236 366,236" fill="url(#${p}_emc)"/>
            <polygon points="506,154 466,154 454,174 454,236 506,236" fill="url(#${p}_emc)"/>
            <!-- Vertical Copper TIV Pillar -->
            <rect x="418" y="166" width="36" height="68" fill="url(#${p}_cu)"/>
            <text x="436" y="204" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">電解Cu</text>
            <text x="436" y="216" text-anchor="middle" font-size="9" fill="#ffedd5">垂直柱</text>
          </g>
          ${loupeRing(436, 166, 68, '拡大：TMV垂直接合', '#d97706')}
          <text x="436" y="254" text-anchor="middle" font-size="10" font-weight="800" fill="#9a3412">レーザー開孔漏斗(TMV)で</text>
          <text x="436" y="269" text-anchor="middle" font-size="9.5" fill="#7c2d12">はんだ球をズレなく確実に受け止め!</text>
        `,
      });

    // =========================================================================
    // XR08. Low-Warpage Silica EMC Mold Frame & SUS430 Anti-Warpage Stiffener
    // =========================================================================
    case 'xr_emc_mold_frame':
      return renderBionzDiagram({
        code: 'xr08',
        badge: 'XR08',
        accent: '#334155',
        accentSoft: '#f1f5f9',
        accentDark: '#0f172a',
        title: '高シリカEMC封止＆反り防止枠',
        metric: 'シリカ88%＋SUS430枠',
        analogyLine1: 'ガラスの超微粒子を88%練り込んだ「鉄筋コンクリート装甲」です。',
        analogyLine2: '氷点下の雪山から猛暑の炎天下まで、チップの歪みや湿気侵入を防ぎます。',
        chipHow: '低膨張EMC＋SUSスティフナー',
        chipBenefit: '過酷環境でも長寿命・反りゼロ',
        chipSpec: 'CTE≈8ppm / 低α線シリカ',
        art: (p) => `
          <!-- Left: Package Cross-Section Showing Stiffener + EMC + Thermal Expansion Match -->
          <text x="172" y="72" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0f172a">熱による「反り」を抑え込む2重プロテクタ</text>
          <!-- Top SUS430 Anti-Warpage Stiffener Ring -->
          <rect x="34" y="88" width="276" height="16" rx="3" fill="url(#${p}_sus)" stroke="#334155" stroke-width="1.3"/>
          <rect x="96" y="88" width="152" height="16" fill="#ffffff" stroke="#64748b" stroke-dasharray="3 2"/>
          <text x="172" y="100" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">SUS430 反り防止ステンレス枠（8スリット付）</text>
          <!-- Black Silica EMC Mold Frame -->
          <rect x="34" y="104" width="276" height="58" rx="4" fill="url(#${p}_emc)" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="108" y="114" width="128" height="36" rx="3" fill="url(#${p}_teal)"/>
          <text x="172" y="136" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">BIONZ シリコンダイ保護</text>
          <!-- ABF Substrate -->
          <rect x="34" y="162" width="276" height="14" rx="2" fill="url(#${p}_pcb)"/>
          ${stepBadge(48, 96, '1', '#475569')}
          ${stepBadge(64, 132, '2', '#0f172a')}

          <!-- CTE Thermal Expansion Bar Chart (Super Clear for Beginners!) -->
          <rect x="28" y="186" width="288" height="84" rx="7" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="172" y="202" text-anchor="middle" font-size="10.2" font-weight="800" fill="#1e293b">熱での伸びやすさ比較（近いほど割れない!）</text>
          <text x="38" y="220" font-size="9.5" font-weight="700" fill="#0f766e">シリコン</text>
          <rect x="98" y="211" width="26" height="11" rx="3" fill="#0d9488"/>
          <text x="130" y="220" font-size="9.2" font-weight="700" fill="#0f766e">3 ppm（基準）</text>
          <text x="38" y="238" font-size="9.5" font-weight="700" fill="#1e293b">高シリカEMC</text>
          <rect x="98" y="229" width="54" height="11" rx="3" fill="#334155"/>
          <text x="158" y="238" font-size="9.2" font-weight="800" fill="#16a34a">8 ppm（近い→○反らない）</text>
          <text x="38" y="256" font-size="9.5" font-weight="700" fill="#b91c1c">普通のプラ</text>
          <rect x="98" y="247" width="142" height="11" rx="3" fill="#ef4444"/>
          <text x="246" y="256" font-size="9.2" font-weight="800" fill="#dc2626">60ppm ×</text>

          <!-- Right: Microscope Loupe of 88wt% Fused-Silica Filler Beads -->
          <clipPath id="${p}_loupe"><circle cx="436" cy="166" r="68"/></clipPath>
          <circle cx="436" cy="166" r="68" fill="#1e293b"/>
          <g clip-path="url(#${p}_loupe)">
            ${[
              [400, 128, 16],
              [436, 122, 18],
              [472, 134, 15],
              [392, 164, 17],
              [430, 160, 21],
              [470, 168, 17],
              [402, 200, 18],
              [440, 202, 16],
              [476, 200, 14],
              [416, 142, 7],
              [456, 148, 8],
              [416, 182, 8],
              [456, 184, 7],
              [382, 144, 6],
              [488, 152, 7],
            ]
              .map(
                ([cx, cy, r]) =>
                  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${p}_solder)" stroke="#475569" stroke-width="1"/>`
              )
              .join('')}
            <rect x="376" y="156" width="120" height="22" rx="5" fill="#0f172a" opacity="0.86"/>
            <text x="436" y="171" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">球状シリカ 88wt%</text>
          </g>
          ${loupeRing(436, 166, 68, '拡大：EMC内部構造', '#334155')}
          <text x="436" y="254" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">極低α線シリカ球をぎっしり充填</text>
          <text x="436" y="269" text-anchor="middle" font-size="9.5" fill="#475569">湿気・衝撃・ソフトエラーも遮断</text>
        `,
      });

    // =========================================================================
    // XR09. Back-Grinded Silicon Bulk Substrate & Dual Crack-Stop Seal Ring
    // =========================================================================
    case 'xr_die_bulk_silicon':
      return renderBionzDiagram({
        code: 'xr09',
        badge: 'XR09',
        accent: '#0369a1',
        accentSoft: '#f0f9ff',
        accentDark: '#0c4a6e',
        title: '11N単結晶シリコン基板＆封止リング',
        metric: '純度 99.999999999%',
        analogyLine1: '爪先サイズ(約10mm角)の超高純度結晶の上に築かれた「電子のメガシティ」です。',
        analogyLine2: '外周を2重の銅・金城壁で囲い、切断時のヒビや湿気から街を守ります。',
        chipHow: '150μm薄化Si＋2重シール環',
        chipBenefit: '数十億回路の安定＆高放熱',
        chipSpec: '11N単結晶 / 16-IP統合',
        art: (p) => `
          <!-- Left: 300mm Wafer -> Cutout to 10x10mm BIONZ XR Die -->
          <text x="108" y="72" text-anchor="middle" font-size="11" font-weight="800" fill="#0c4a6e">300mm 11Nシリコン円盤</text>
          <circle cx="108" cy="156" r="68" fill="url(#${p}_si_blue)" stroke="#0284c7" stroke-width="2"/>
          <!-- Wafer Die Grid -->
          ${[-44, -22, 0, 22, 44]
            .map(
              (d) =>
                `<line x1="${108 + d}" y1="92" x2="${108 + d}" y2="220" stroke="#bae6fd" stroke-width="0.7" opacity="0.55"/><line x1="44" y1="${156 + d}" x2="172" y2="${156 + d}" stroke="#bae6fd" stroke-width="0.7" opacity="0.55"/>`
            )
            .join('')}
          <!-- Highlighted Single BIONZ Die on Wafer -->
          <rect x="108" y="134" width="22" height="22" fill="#facc15" stroke="#ffffff" stroke-width="1.6"/>
          <path d="M 130 134 L 224 88 M 130 156 L 224 236" stroke="#eab308" stroke-width="1.4" stroke-dasharray="4 3"/>
          <text x="108" y="246" text-anchor="middle" font-size="9.8" font-weight="700" fill="#0369a1">不純物 1000億分の1以下</text>
          <text x="108" y="261" text-anchor="middle" font-size="9.5" fill="#475569">（11ナイン単結晶ウエハ）</text>

          <!-- Center-Right: Enlarged 10x10mm Die with Dual Crack-Stop Seal Ring & 16-IP City -->
          <rect x="224" y="84" width="154" height="154" rx="8" fill="#1e293b" stroke="url(#${p}_cu)" stroke-width="5"/>
          <rect x="232" y="92" width="138" height="138" rx="5" fill="none" stroke="url(#${p}_gold)" stroke-width="2.2"/>
          <!-- 4x4 IP City Blocks -->
          ${[
            ['SLVS', '#06b6d4'],
            ['RAW', '#0ea5e9'],
            ['NR', '#14b8a6'],
            ['LUT', '#f59e0b'],
            ['AI NPU', '#8b5cf6'],
            ['ARM×4', '#2563eb'],
            ['AF DSP', '#0d9488'],
            ['8K動画', '#e11d48'],
            ['音声', '#10b981'],
            ['SRAM', '#0284c7'],
            ['DDR5X', '#1d4ed8'],
            ['C2PA', '#d97706'],
            ['CFx', '#ea580c'],
            ['EVF', '#0284c7'],
            ['USB/RF', '#6366f1'],
            ['PLL', '#ec4899'],
          ]
            .map(([lbl, col], idx) => {
              const r = Math.floor(idx / 4);
              const c = idx % 4;
              const bx = 240 + c * 31;
              const bz = 100 + r * 31;
              return `<rect x="${bx}" y="${bz}" width="27" height="27" rx="3" fill="${col}" opacity="0.92"/><text x="${bx + 13.5}" y="${bz + 16.5}" text-anchor="middle" font-size="7.2" font-weight="800" fill="#fff">${lbl}</text>`;
            })
            .join('')}
          ${stepBadge(224, 108, '1', '#d97706')}
          ${stepBadge(301, 161, '2', '#7c3aed')}
          <text x="301" y="256" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">約10×10mm に16専門区画を集積</text>

          <!-- Far Right: Vertical Back-Grind Cross-Section -->
          <rect x="394" y="84" width="142" height="154" rx="8" fill="#f0f9ff" stroke="#7dd3fc"/>
          <text x="465" y="102" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0c4a6e">横から見た断面</text>
          <rect x="410" y="114" width="110" height="16" rx="2" fill="url(#${p}_cu)"/>
          <text x="465" y="125" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fff">極薄回路層 (約10μm)</text>
          <rect x="410" y="130" width="110" height="58" rx="2" fill="url(#${p}_si)"/>
          <text x="465" y="156" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e2e8f0">裏面を150μmまで</text>
          <text x="465" y="170" text-anchor="middle" font-size="9.5" font-weight="700" fill="#38bdf8">薄く研磨して放熱!</text>
          <text x="465" y="206" text-anchor="middle" font-size="9.2" font-weight="700" fill="#9a3412">① 銅＋金の2重防壁が</text>
          <text x="465" y="220" text-anchor="middle" font-size="9.2" font-weight="700" fill="#9a3412">ダイ切断ヒビを阻止</text>
          <text x="465" y="256" text-anchor="middle" font-size="9.8" font-weight="700" fill="#0369a1">② XR2はAI NPUも1ダイ統合</text>
        `,
      });

    // =========================================================================
    // XR10. SLVS-EC v3.0 8-Lane SerDes RX PHY & Deserializer
    // =========================================================================
    case 'xr_slvsec_rx_phy':
      return renderBionzDiagram({
        code: 'xr10',
        badge: 'XR10',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        accentDark: '#155e75',
        title: 'SLVS-EC v3.0 8レーン超高速受信PHY',
        metric: '最大10Gbps × 8車線',
        analogyLine1: 'センサーから殺到する膨大な画素データを受け止める「8車線ETC料金所」です。',
        analogyLine2: '1レーン毎に時計リズムを埋め込み、ズレずに同時到着させます。',
        chipHow: 'クロック埋込 8車線SerDes',
        chipBenefit: '66MP連写・8Kを0遅延で取込',
        chipSpec: '8b/10b・ECC誤り訂正内蔵',
        art: (p) => `
          <!-- Step 1: Exmor R Full-Frame CMOS Sensor -->
          <rect x="24" y="88" width="96" height="142" rx="8" fill="url(#${p}_si)" stroke="#06b6d4" stroke-width="1.8"/>
          <rect x="34" y="102" width="76" height="72" rx="4" fill="url(#${p}_teal)"/>
          <text x="72" y="132" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">Exmor R</text>
          <text x="72" y="148" text-anchor="middle" font-size="9.5" fill="#ccfbf1">CMOSセンサー</text>
          <text x="72" y="164" text-anchor="middle" font-size="8.8" fill="#fef08a">33〜66MP RAW</text>
          <text x="72" y="196" text-anchor="middle" font-size="9.5" font-weight="700" fill="#67e8f9">毎秒数十億画素</text>
          <text x="72" y="212" text-anchor="middle" font-size="9.2" fill="#cbd5e1">の光を電気へ変換</text>
          ${stepBadge(34, 96, '1', '#0891b2')}

          <!-- Step 2: 8 Parallel SLVS-EC Differential Lanes with Embedded Clock -->
          <text x="206" y="76" text-anchor="middle" font-size="11" font-weight="800" fill="#155e75">8車線 SLVS-EC 超高速ハイウェイ</text>
          ${[0, 1, 2, 3, 4, 5, 6, 7]
            .map((lane) => {
              const y = 96 + lane * 17;
              return `
                <line x1="122" y1="${y}" x2="288" y2="${y}" stroke="${lane % 2 === 0 ? '#06b6d4' : '#0284c7'}" stroke-width="2.4" marker-end="url(#${p}_arr_blue)"/>
                <rect x="${152 + (lane % 3) * 26}" y="${y - 5}" width="24" height="10" rx="4" fill="#ffffff" stroke="#0891b2" stroke-width="1"/>
                <text x="${164 + (lane % 3) * 26}" y="${y + 3}" text-anchor="middle" font-size="7.5" font-weight="800" fill="#0e7490">L${lane}</text>
              `;
            })
            .join('')}
          <rect x="134" y="230" width="144" height="36" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
          <text x="206" y="245" text-anchor="middle" font-size="9.5" font-weight="800" fill="#155e75">クロック埋込＋低振幅200mV</text>
          <text x="206" y="259" text-anchor="middle" font-size="9" fill="#0e7490">車線ズレゼロ＆省電力伝送!</text>
          ${stepBadge(206, 88, '2', '#0284c7')}

          <!-- Step 3: On-Die RX PHY Equalizer + CDR + Deserializer + ECC -->
          <rect x="294" y="84" width="240" height="178" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.6"/>
          <text x="414" y="104" text-anchor="middle" font-size="11" font-weight="800" fill="#0369a1">BIONZ XR 内部 SLVS-EC RX PHY</text>
          <!-- Sub-stage A: CTLE & CDR -->
          <rect x="308" y="114" width="96" height="62" rx="6" fill="#ffffff" stroke="#06b6d4" stroke-width="1.3"/>
          <text x="356" y="132" text-anchor="middle" font-size="10" font-weight="800" fill="#0e7490">CTLE + CDR</text>
          <path d="M 320 156 Q 332 142 344 156 T 368 156 T 392 156" fill="none" stroke="#06b6d4" stroke-width="2"/>
          <text x="356" y="170" text-anchor="middle" font-size="8.6" fill="#334155">波形復元＆時計抽出</text>
          <!-- Arrow -->
          <line x1="406" y1="145" x2="424" y2="145" stroke="#0284c7" stroke-width="2.2" marker-end="url(#${p}_arr_blue)"/>
          <!-- Sub-stage B: Deserializer & ECC -->
          <rect x="428" y="114" width="94" height="62" rx="6" fill="#0284c7"/>
          <text x="475" y="133" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">並列復元＋ECC</text>
          <text x="475" y="149" text-anchor="middle" font-size="9" fill="#e0f2fe">直列→16bit画素</text>
          <text x="475" y="164" text-anchor="middle" font-size="9" fill="#fef08a">通信ミス自動修復</text>
          <!-- Output to ISP -->
          <rect x="308" y="190" width="214" height="58" rx="6" fill="#ffffff" stroke="#0284c7"/>
          <text x="415" y="210" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f766e">③ 次の RAW ISP（XR11）へ直送!</text>
          <text x="415" y="227" text-anchor="middle" font-size="9.5" fill="#334155">1レーン最大10Gbps級 × 8〜16車線で</text>
          <text x="415" y="241" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0369a1">プロ連写でもデータ詰まり一切なし</text>
          ${stepBadge(308, 98, '3', '#0369a1')}
        `,
      });

    // =========================================================================
    // XR11. 16-Bit Linear RAW Front-End ISP (Demosaic, DPC, Lens Correction)
    // =========================================================================
    case 'xr_raw_isp_frontend':
      return renderBionzDiagram({
        code: 'xr11',
        badge: 'XR11',
        accent: '#0284c7',
        accentSoft: '#eff6ff',
        accentDark: '#1e40af',
        title: '16bit RAW フロントエンド現像ISP',
        metric: '内部16bit / 65,536階調',
        analogyLine1: '赤・緑・青の点画(ベイヤー配列)を瞬時にフルカラー写真へ変える「最初の厨房」です。',
        analogyLine2: '同時にレンズの歪みや色のズレも自動で真っ直ぐ補正します。',
        chipHow: '16bitデモザイク＋光学補正',
        chipBenefit: '滑らかな空＆白飛び・偽色抑制',
        chipSpec: '16bit線形演算 / 欠陥補正',
        art: (p) => `
          <!-- Stage 1: Raw RGGB Bayer Mosaic Grid -->
          <rect x="22" y="72" width="128" height="196" rx="8" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="86" y="92" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1e293b">① センサーの生データ</text>
          ${[0, 1, 2, 3]
            .flatMap((r) =>
              [0, 1, 2, 3].map((c) => {
                const cols = ['#ef4444', '#22c55e', '#22c55e', '#3b82f6'];
                const lbls = ['R', 'G', 'G', 'B'];
                const k = (r % 2) * 2 + (c % 2);
                return `<rect x="${38 + c * 24}" y="${102 + r * 24}" width="22" height="22" rx="3" fill="${cols[k]}"/><text x="${49 + c * 24}" y="${117 + r * 24}" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">${lbls[k]}</text>`;
              })
            )
            .join('')}
          <text x="86" y="216" text-anchor="middle" font-size="9.5" font-weight="700" fill="#475569">各マスは1色しか</text>
          <text x="86" y="230" text-anchor="middle" font-size="9.5" font-weight="700" fill="#475569">記録していない点画</text>
          <text x="86" y="252" text-anchor="middle" font-size="9" font-weight="800" fill="#dc2626">＋ レンズ歪み・欠陥点あり</text>
          ${stepBadge(30, 80, '1', '#ef4444')}

          <!-- Arrow 1 -> 2 -->
          <line x1="152" y1="168" x2="174" y2="168" stroke="#0284c7" stroke-width="2.8" marker-end="url(#${p}_arr_blue)"/>

          <!-- Stage 2: 16-bit Front-End ISP Processing Stack -->
          <rect x="178" y="72" width="186" height="196" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
          <text x="271" y="92" text-anchor="middle" font-size="11" font-weight="800" fill="#1e40af">② RAW フロントISP (4工程)</text>
          ${[
            ['黒レベル(BLC)＆欠陥画素修復', '#0f766e', '真っ暗の基準合わせ＆白い点消し'],
            ['16bit 高精度デモザイク計算', '#2563eb', '周囲のR/G/Bから全画素をフルカラー化'],
            ['レンズ歪曲＆周辺光量補正', '#7c3aed', '樽型ゆがみ・四隅の暗さを自動修正'],
            ['倍率色収差＆ブリージング補正', '#d97706', '輪郭の紫フリンジ・画角変化を抑制'],
          ]
            .map(
              ([t, col, sub], i) => `
                <rect x="188" y="${102 + i * 39}" width="166" height="33" rx="6" fill="#ffffff" stroke="${col}" stroke-width="1.3"/>
                <rect x="188" y="${102 + i * 39}" width="6" height="33" rx="2" fill="${col}"/>
                <text x="200" y="${116 + i * 39}" font-size="9.6" font-weight="800" fill="#0f172a">${t}</text>
                <text x="200" y="${129 + i * 39}" font-size="8.4" fill="#475569">${sub}</text>
              `
            )
            .join('')}
          ${stepBadge(186, 80, '2', '#2563eb')}

          <!-- Arrow 2 -> 3 -->
          <line x1="366" y1="168" x2="388" y2="168" stroke="#16a34a" stroke-width="2.8" marker-end="url(#${p}_arr_green)"/>

          <!-- Stage 3: Smooth 16-bit Full-Color Photo Output -->
          <rect x="392" y="72" width="146" height="196" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.4"/>
          <text x="465" y="92" text-anchor="middle" font-size="10.5" font-weight="800" fill="#166534">③ 滑らかフルカラー</text>
          <!-- Mini Sunset Landscape Illustrating 16-bit Smooth Tones -->
          <defs>
            <linearGradient id="${p}_sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0284c7"/>
              <stop offset="55%" stop-color="#f97316"/>
              <stop offset="100%" stop-color="#fde047"/>
            </linearGradient>
          </defs>
          <rect x="406" y="102" width="118" height="86" rx="6" fill="url(#${p}_sky)" stroke="#16a34a" stroke-width="1.2"/>
          <circle cx="486" cy="136" r="14" fill="#fef9c3" opacity="0.92"/>
          <path d="M 406 188 L 444 150 L 474 172 L 496 154 L 524 188 Z" fill="#1e293b"/>
          <text x="465" y="208" text-anchor="middle" font-size="10.2" font-weight="800" fill="#166534">65,536階調/色</text>
          <text x="465" y="224" text-anchor="middle" font-size="9.4" fill="#14532d">夕焼けのグラデーションも</text>
          <text x="465" y="238" text-anchor="middle" font-size="9.4" fill="#14532d">段差(バンディング)ゼロ!</text>
          <text x="465" y="256" text-anchor="middle" font-size="9" font-weight="800" fill="#0369a1">偽色・モアレも大幅低減</text>
          ${stepBadge(400, 80, '3', '#16a34a')}
        `,
      });

    // =========================================================================
    // XR12. Area-Specific NR, Diffraction Compensation & 7K->4K Oversampling
    // =========================================================================
    case 'xr_nr_detail_engine':
      return renderBionzDiagram({
        code: 'xr12',
        badge: 'XR12',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        accentDark: '#115e59',
        title: '領域分割NR・回折低減＆7K縮小エンジン',
        metric: '質感維持＋7K→4K縮小',
        analogyLine1: '「ザラザラ雑音」と「まつ毛・髪の繊細な線」を自動で見分ける凄腕レタッチャーです。',
        analogyLine2: '夜空はツルツルに磨きつつ、人物の輪郭や細部の立体感はクッキリ残します。',
        chipHow: '領域分割ウェーブレットNR',
        chipBenefit: '高ISO夜景でも高精細＆立体感',
        chipSpec: '7K→4K オーバーサンプル',
        art: (_p) => `
          <!-- Top-Left: Ordinary NR (Blurs Hair Too!) -->
          <rect x="22" y="64" width="166" height="206" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          ${comparePill(30, 72, 150, false, '普通のノイズ除去')}
          <!-- Blurred Night Sky + Blurred Silhouette -->
          <rect x="34" y="102" width="142" height="94" rx="6" fill="#334155"/>
          <circle cx="105" cy="144" r="24" fill="#94a3b8" opacity="0.55"/>
          <path d="M 80 148 Q 105 112 130 148" fill="none" stroke="#cbd5e1" stroke-width="7" opacity="0.5"/>
          <text x="105" y="185" text-anchor="middle" font-size="9.2" font-weight="700" fill="#fca5a5">髪も輪郭ものっぺりボケる</text>
          <text x="105" y="216" text-anchor="middle" font-size="9.8" font-weight="700" fill="#991b1b">画面全体を一律に</text>
          <text x="105" y="232" text-anchor="middle" font-size="9.8" font-weight="700" fill="#991b1b">ぼかしてしまうため</text>
          <text x="105" y="248" text-anchor="middle" font-size="9.8" font-weight="800" fill="#dc2626">質感や解像感が失われる</text>

          <!-- Center: Area-Specific NR (BIONZ XR) -->
          <rect x="198" y="64" width="186" height="206" rx="8" fill="#f0fdfa" stroke="#2dd4bf" stroke-width="1.4"/>
          ${comparePill(206, 72, 170, true, '領域分割NR（BIONZ XR）')}
          <!-- Split Scene: Smooth Night Sky + Razor-Sharp Hair/Edge -->
          <rect x="210" y="102" width="162" height="94" rx="6" fill="#0f172a"/>
          <!-- Smooth Sky Label -->
          <rect x="216" y="108" width="70" height="22" rx="4" fill="#0d9488"/>
          <text x="251" y="122" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fff">平坦な夜空→強NR</text>
          <!-- Crisp Detail Hair/Eyelash Strands -->
          ${[0, 1, 2, 3, 4, 5]
            .map(
              (k) =>
                `<path d="M ${260 + k * 14} 188 Q ${274 + k * 12} 146 ${298 + k * 11} 138" fill="none" stroke="#facc15" stroke-width="1.8"/>`
            )
            .join('')}
          <rect x="290" y="168" width="78" height="22" rx="4" fill="#d97706"/>
          <text x="329" y="182" text-anchor="middle" font-size="8.4" font-weight="800" fill="#fff">髪・輪郭→くっきり!</text>
          ${stepBadge(214, 110, '1', '#0d9488')}
          ${stepBadge(281, 178, '2', '#d97706')}
          <text x="291" y="216" text-anchor="middle" font-size="9.8" font-weight="800" fill="#115e59">① 平坦部だけノイズ強力消去</text>
          <text x="291" y="233" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9a3412">② 繊細な線はエッジ保護＆復元</text>
          <text x="291" y="251" text-anchor="middle" font-size="9.3" font-weight="700" fill="#0f766e">＋ F16絞り時の回折ボケも補正</text>

          <!-- Right: 7K -> 4K Polyphase Oversampling Funnel -->
          <rect x="394" y="64" width="144" height="206" rx="8" fill="#eff6ff" stroke="#60a5fa" stroke-width="1.3"/>
          <text x="466" y="84" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1e40af">③ 7K→4K 縮小</text>
          <!-- 7K Dense Bars -->
          <rect x="408" y="96" width="116" height="36" rx="5" fill="#1d4ed8"/>
          <text x="466" y="112" text-anchor="middle" font-size="10.5" font-weight="800" fill="#fff">7K (33MP全域)</text>
          <text x="466" y="125" text-anchor="middle" font-size="8.6" fill="#bfdbfe">2.4倍の情報量で読出</text>
          <!-- Converging Funnel -->
          <polygon points="416,134 516,134 494,168 438,168" fill="#38bdf8" opacity="0.45" stroke="#0284c7" stroke-width="1.2"/>
          <text x="466" y="155" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0369a1">全画素凝縮!</text>
          <!-- 4K Ultra Crisp Output -->
          <rect x="424" y="170" width="84" height="36" rx="5" fill="#0d9488"/>
          <text x="466" y="186" text-anchor="middle" font-size="10.5" font-weight="800" fill="#fff">超高精細 4K</text>
          <text x="466" y="199" text-anchor="middle" font-size="8.6" fill="#ccfbf1">モアレ・偽色激減</text>
          <text x="466" y="226" text-anchor="middle" font-size="9.4" font-weight="700" fill="#1e3a8a">画素を間引かずに</text>
          <text x="466" y="241" text-anchor="middle" font-size="9.4" font-weight="700" fill="#1e3a8a">ぎゅっと凝縮するので</text>
          <text x="466" y="256" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0d9488">4Kとは思えない解像感!</text>
          ${stepBadge(404, 74, '3', '#2563eb')}
        `,
      });

    // =========================================================================
    // XR13. 3D-LUT Color Science (S-Cinetone / S-Log3 / DRO Lv8)
    // =========================================================================
    case 'xr_color_3dlut_engine':
      return renderBionzDiagram({
        code: 'xr13',
        badge: 'XR13',
        accent: '#db2777',
        accentSoft: '#fdf2f8',
        accentDark: '#9d174d',
        title: '3D-LUT 色彩科学＆階調(DRO)エンジン',
        metric: '10bit 10億色 / S-Cinetone',
        analogyLine1: '映画監督の色作りを瞬時に再現する「チップ内蔵のプロ専属カラリスト」です。',
        analogyLine2: 'AIが照明の色を見抜き、撮って出しでも人肌を美しく映画調に仕上げます。',
        chipHow: '立体3D-LUT＋AIホワイトバランス',
        chipBenefit: '編集なしでも美しい肌＆映画色',
        chipSpec: '33³立体表 / 10bit 4:2:2',
        art: (p) => `
          <!-- Left: Deep Learning AWB + 3D-LUT Isometric RGB Color Cube -->
          <rect x="22" y="64" width="234" height="206" rx="8" fill="#fdf2f8" stroke="#f9a8d4" stroke-width="1.2"/>
          <text x="139" y="84" text-anchor="middle" font-size="11" font-weight="800" fill="#9d174d">① 3D-LUT 立体カラー変換キューブ</text>
          <!-- 3D Isometric Cube -->
          <polygon points="139,96 200,122 139,148 78,122" fill="#f472b6" stroke="#831843" stroke-width="1.4"/>
          <polygon points="78,122 139,148 139,208 78,182" fill="#34d399" stroke="#065f46" stroke-width="1.4"/>
          <polygon points="200,122 139,148 139,208 200,182" fill="#60a5fa" stroke="#1e3a8a" stroke-width="1.4"/>
          <!-- Lattice Grid Lines on 3D Cube -->
          <line x1="108" y1="109" x2="170" y2="135" stroke="#fff" stroke-width="1" opacity="0.7"/>
          <line x1="170" y1="109" x2="108" y2="135" stroke="#fff" stroke-width="1" opacity="0.7"/>
          <line x1="108" y1="135" x2="108" y2="195" stroke="#fff" stroke-width="1" opacity="0.7"/>
          <line x1="170" y1="135" x2="170" y2="195" stroke="#fff" stroke-width="1" opacity="0.7"/>
          <line x1="78" y1="152" x2="139" y2="178" stroke="#fff" stroke-width="1" opacity="0.7"/>
          <line x1="200" y1="152" x2="139" y2="178" stroke="#fff" stroke-width="1" opacity="0.7"/>
          <!-- Axis Labels -->
          <text x="64" y="156" text-anchor="middle" font-size="10" font-weight="800" fill="#065f46">G(緑)</text>
          <text x="216" y="156" text-anchor="middle" font-size="10" font-weight="800" fill="#1e40af">B(青)</text>
          <text x="139" y="126" text-anchor="middle" font-size="10" font-weight="800" fill="#831843">R(赤)</text>
          <!-- Deep Learning AWB Pill -->
          <rect x="34" y="218" width="210" height="42" rx="6" fill="#ffffff" stroke="#ec4899"/>
          <text x="139" y="234" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9d174d">AIディープラーニング AWB連動</text>
          <text x="139" y="250" text-anchor="middle" font-size="9.2" fill="#475569">日陰・電球下でも人肌と白を自然に再現</text>
          ${stepBadge(34, 76, '1', '#db2777')}

          <!-- Flow Arrows -->
          <path d="M 258 124 L 284 106 M 258 164 L 284 164 M 258 204 L 284 222" stroke="#db2777" stroke-width="2.4" marker-end="url(#${p}_arr_purple)"/>

          <!-- Right: 3 Vivid Color Modes Output -->
          <!-- Mode 1: S-Cinetone -->
          <rect x="290" y="66" width="246" height="62" rx="8" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.3"/>
          <rect x="298" y="75" width="76" height="44" rx="5" fill="#e11d48"/>
          <text x="336" y="95" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">S-Cinetone</text>
          <text x="336" y="109" text-anchor="middle" font-size="8.6" fill="#ffe4e6">シネマ肌色</text>
          <text x="384" y="91" font-size="10.2" font-weight="800" fill="#9f1239">② 撮って出し映画ルック</text>
          <text x="384" y="107" font-size="9.2" fill="#475569">シネマ機VENICE譲りの</text>
          <text x="384" y="120" font-size="9.2" fill="#475569">柔らかく自然な肌とハイライト</text>

          <!-- Mode 2: S-Log3 + Custom User LUT -->
          <rect x="290" y="136" width="246" height="62" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.3"/>
          <rect x="298" y="145" width="76" height="44" rx="5" fill="#2563eb"/>
          <text x="336" y="165" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">S-Log3</text>
          <text x="336" y="179" text-anchor="middle" font-size="8.6" fill="#dbeafe">15+Stop階調</text>
          <text x="384" y="161" font-size="10.2" font-weight="800" fill="#1e40af">③ 10bit 10億色＆独自LUT</text>
          <text x="384" y="177" font-size="9.2" fill="#475569">白飛び・黒潰れを広く残し</text>
          <text x="384" y="190" font-size="9.2" fill="#475569">好みのLUT適用しながら収録可</text>

          <!-- Mode 3: Creative Look & DRO Lv8 -->
          <rect x="290" y="206" width="246" height="62" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.3"/>
          <rect x="298" y="215" width="76" height="44" rx="5" fill="#d97706"/>
          <text x="336" y="235" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">DRO Lv8</text>
          <text x="336" y="249" text-anchor="middle" font-size="8.6" fill="#fef3c7">逆光救済</text>
          <text x="384" y="231" font-size="10.2" font-weight="800" fill="#92400e">④ クリエイティブルック＆DRO</text>
          <text x="384" y="247" font-size="9.2" fill="#475569">10種の雰囲気プリセットと</text>
          <text x="384" y="260" font-size="9.2" fill="#475569">逆光の暗い顔だけ明るく補正</text>
        `,
      });

    // =========================================================================
    // XR14. BIONZ XR2 Integrated AI NPU Systolic Tensor Array
    // =========================================================================
    case 'xr_ai_npu_systolic':
      return renderBionzDiagram({
        code: 'xr14',
        badge: 'XR14',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        accentDark: '#5b21b6',
        title: '統合AIプロセッシングユニット（NPU）',
        metric: '骨格・瞳を60回/秒推論',
        analogyLine1: '何百万枚もの写真で鍛えたAI頭脳を心臓部へ合体させた「超高速・掛け算工場」です。',
        analogyLine2: '後ろ向きの人の姿勢や飛ぶ鳥の瞳まで1秒に60回見抜き、ピントを離しません。',
        chipHow: 'シストリックMAC行列(1ダイ統合)',
        chipBenefit: '人骨格・鳥・昆虫・車に爆速AF',
        chipSpec: 'INT8/FP16 並列推論エンジン',
        art: (p) => `
          <!-- Left: Input Live View Frame -->
          <rect x="22" y="76" width="114" height="178" rx="8" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="79" y="95" text-anchor="middle" font-size="10.2" font-weight="800" fill="#334155">① 入力映像</text>
          <rect x="32" y="104" width="94" height="92" rx="6" fill="#e2e8f0" stroke="#64748b"/>
          <!-- Simple Silhouette of Person Turning Away + Bird -->
          <circle cx="62" cy="130" r="10" fill="#475569"/>
          <path d="M 48 164 Q 62 142 76 164 L 72 190 L 52 190 Z" fill="#475569"/>
          <path d="M 92 126 Q 102 116 114 124 Q 104 128 96 134 Z" fill="#0f766e"/>
          <text x="79" y="216" text-anchor="middle" font-size="9.4" font-weight="700" fill="#475569">後ろ向きの人や</text>
          <text x="79" y="230" text-anchor="middle" font-size="9.4" font-weight="700" fill="#475569">高速で飛ぶ野鳥</text>
          ${stepBadge(30, 84, '1', '#64748b')}

          <!-- Arrow 1 -> 2 -->
          <line x1="138" y1="162" x2="162" y2="162" stroke="#7c3aed" stroke-width="2.6" marker-end="url(#${p}_arr_purple)"/>

          <!-- Center: Systolic MAC Tensor Array (Weights from Top, Pixels from Left) -->
          <rect x="166" y="64" width="196" height="206" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.6"/>
          <text x="264" y="83" text-anchor="middle" font-size="10.8" font-weight="800" fill="#5b21b6">② AI シストリックMAC配列</text>
          <!-- North Weight SRAM -->
          <rect x="206" y="92" width="136" height="22" rx="4" fill="#4c1d95"/>
          <text x="274" y="107" text-anchor="middle" font-size="9.4" font-weight="700" fill="#ede9fe">AI学習済み重みデータ ↓</text>
          <!-- West Activation FIFO -->
          <rect x="174" y="122" width="24" height="106" rx="4" fill="#d97706"/>
          <text x="186" y="176" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" transform="rotate(-90 186 176)">画像特徴 →</text>
          <!-- 4x4 Systolic MAC Grid -->
          ${[0, 1, 2, 3]
            .flatMap((r) =>
              [0, 1, 2, 3].map((c) => {
                const mx = 208 + c * 34;
                const my = 122 + r * 27;
                const isDiag = (r + c) % 2 === 0;
                return `<rect x="${mx}" y="${my}" width="29" height="22" rx="4" fill="${isDiag ? '#7c3aed' : '#8b5cf6'}" stroke="#ddd6fe"/><text x="${mx + 14.5}" y="${my + 14.5}" text-anchor="middle" font-size="8.2" font-weight="800" fill="#fff">×＋</text>`;
              })
            )
            .join('')}
          <text x="264" y="247" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5b21b6">数千個の「掛け算＋足し算」を同時実行!</text>
          <text x="264" y="261" text-anchor="middle" font-size="9" font-weight="700" fill="#0f766e">XR2世代は同一ダイ統合で低遅延＆省電力</text>
          ${stepBadge(174, 72, '2', '#7c3aed')}

          <!-- Arrow 2 -> 3 -->
          <line x1="364" y1="162" x2="388" y2="162" stroke="#16a34a" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>

          <!-- Right: Real-Time Skeleton Pose & Eye-AF Recognition Output -->
          <rect x="392" y="64" width="146" height="206" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.4"/>
          <text x="465" y="83" text-anchor="middle" font-size="10.5" font-weight="800" fill="#166534">③ 姿勢＆瞳ロック!</text>
          <rect x="404" y="92" width="122" height="106" rx="6" fill="#0f172a"/>
          <!-- Human Skeleton Pose Nodes + Green Eye-AF Box -->
          <circle cx="446" cy="116" r="8" fill="none" stroke="#22c55e" stroke-width="1.8"/>
          <rect x="436" y="106" width="20" height="20" fill="none" stroke="#4ade80" stroke-width="1.6"/>
          <line x1="446" y1="124" x2="446" y2="156" stroke="#38bdf8" stroke-width="2"/>
          <line x1="428" y1="138" x2="464" y2="138" stroke="#38bdf8" stroke-width="2"/>
          <line x1="446" y1="156" x2="434" y2="184" stroke="#38bdf8" stroke-width="2"/>
          <line x1="446" y1="156" x2="458" y2="184" stroke="#38bdf8" stroke-width="2"/>
          ${[
            [446, 124],
            [428, 138],
            [464, 138],
            [446, 156],
            [434, 184],
            [458, 184],
          ]
            .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#facc15"/>`)
            .join('')}
          <!-- Bird Eye AF Box -->
          <rect x="484" y="114" width="28" height="22" rx="2" fill="none" stroke="#4ade80" stroke-width="1.6"/>
          <circle cx="498" cy="125" r="3" fill="#4ade80"/>
          <text x="498" y="148" text-anchor="middle" font-size="8.2" font-weight="700" fill="#4ade80">鳥の瞳AF</text>
          <!-- Recognized Subject Chips -->
          <text x="465" y="216" text-anchor="middle" font-size="9.6" font-weight="800" fill="#166534">認識できる被写体</text>
          <text x="465" y="233" text-anchor="middle" font-size="9.2" font-weight="700" fill="#14532d">人骨格・動物・鳥・昆虫</text>
          <text x="465" y="248" text-anchor="middle" font-size="9.2" font-weight="700" fill="#14532d">車・列車・飛行機まで自動!</text>
          ${stepBadge(400, 72, '3', '#16a34a')}
        `,
      });

    // =========================================================================
    // XR15. Quad-Core ARM Cortex-A35 AMP Cluster (Linux + uITRON RTOS)
    // =========================================================================
    case 'xr_arm_cpu_cluster':
      return renderBionzDiagram({
        code: 'xr15',
        badge: 'XR15',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        accentDark: '#1e40af',
        title: '4コア ARM CPUクラスタ（2つのOS分業）',
        metric: 'Linux ＋ μITRON 協調',
        analogyLine1: 'メニュー画面係(Linux)とシャッター瞬時係(RTOS)を別チームに分けた司令塔です。',
        analogyLine2: 'Wi-Fi通信中でもシャッターの反応が0.001秒も遅れない秘密の仕組みです。',
        chipHow: '4×Cortex-A35 非対称AMP',
        chipBenefit: '0.5秒爆速起動＆無遅延シャッター',
        chipSpec: 'CXD90057 "Mira" 4コア',
        art: (p) => `
          <!-- Left Team: Core 0-1 Linux OS (UI / Network / File System) -->
          <rect x="24" y="66" width="246" height="148" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
          <rect x="34" y="74" width="226" height="24" rx="6" fill="#2563eb"/>
          <text x="147" y="90" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">① Linux OS 担当（Core 0・Core 1）</text>
          <rect x="38" y="106" width="104" height="44" rx="5" fill="#ffffff" stroke="#3b82f6" stroke-width="1.3"/>
          <text x="90" y="124" text-anchor="middle" font-size="10.2" font-weight="800" fill="#1e40af">Core 0</text>
          <text x="90" y="140" text-anchor="middle" font-size="8.8" fill="#475569">L1 I$/D$ + NEON</text>
          <rect x="152" y="106" width="104" height="44" rx="5" fill="#ffffff" stroke="#3b82f6" stroke-width="1.3"/>
          <text x="204" y="124" text-anchor="middle" font-size="10.2" font-weight="800" fill="#1e40af">Core 1</text>
          <text x="204" y="140" text-anchor="middle" font-size="8.8" fill="#475569">L1 I$/D$ + NEON</text>
          <text x="147" y="172" text-anchor="middle" font-size="10" font-weight="800" fill="#1e3a8a">担当：メニュー画面・タッチ操作</text>
          <text x="147" y="188" text-anchor="middle" font-size="9.5" fill="#334155">スマホ連携・Wi-Fi/USB・カード管理</text>
          <text x="147" y="203" text-anchor="middle" font-size="9" font-weight="700" fill="#2563eb">→ 豊富な機能と使いやすさを重視!</text>

          <!-- Right Team: Core 2-3 uITRON RTOS (Hard Real-Time Camera Control) -->
          <rect x="290" y="66" width="246" height="148" rx="8" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
          <rect x="300" y="74" width="226" height="24" rx="6" fill="#0d9488"/>
          <text x="413" y="90" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">② μITRON RTOS 担当（Core 2・3）</text>
          <rect x="304" y="106" width="104" height="44" rx="5" fill="#ffffff" stroke="#14b8a6" stroke-width="1.3"/>
          <text x="356" y="124" text-anchor="middle" font-size="10.2" font-weight="800" fill="#115e59">Core 2</text>
          <text x="356" y="140" text-anchor="middle" font-size="8.8" fill="#475569">マイクロ秒割込</text>
          <rect x="418" y="106" width="104" height="44" rx="5" fill="#ffffff" stroke="#14b8a6" stroke-width="1.3"/>
          <text x="470" y="124" text-anchor="middle" font-size="10.2" font-weight="800" fill="#115e59">Core 3</text>
          <text x="470" y="140" text-anchor="middle" font-size="8.8" fill="#475569">撮影シーケンス</text>
          <text x="413" y="172" text-anchor="middle" font-size="10" font-weight="800" fill="#115e59">担当：シャッター・露出・レンズ制御</text>
          <text x="413" y="188" text-anchor="middle" font-size="9.5" fill="#334155">AF指令・フラッシュ同調・連写リズム</text>
          <text x="413" y="203" text-anchor="middle" font-size="9" font-weight="700" fill="#0d9488">→ 1ミリ秒の遅れも許さない絶対優先!</text>

          <!-- Bottom Shared Coherent L2 Cache & IPC Crossbar -->
          <path d="M 147 214 L 147 228 M 413 214 L 413 228" stroke="#d97706" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>
          <rect x="24" y="230" width="512" height="42" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.4"/>
          <text x="280" y="248" text-anchor="middle" font-size="10.6" font-weight="800" fill="#92400e">③ 共有L2キャッシュ ＋ GIC高速割込クロスバー（2つのOSを瞬時連携）</text>
          <text x="280" y="264" text-anchor="middle" font-size="9.5" fill="#78350f">電源ONから約0.5秒で即撮影スタンバイ！通信中でもシャッターの切れ味が落ちない</text>
        `,
      });

    default:
      return null;
  }
}
