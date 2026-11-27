import { PartExplanation } from '../../assemblies/types';
import {
  cmpBanner,
  dimArrow,
  escV2,
  kpiCard,
  loupeFrame,
  renderBionzV2Hd,
} from './shared';

/** Clean 2-segment orthogonal callout badge in the bottom annotation strip (zero leader-line text crossings) */
function cleanPin(
  tx: number,
  ty: number,
  _elbowX: number,
  _elbowY: number,
  lx: number,
  ly: number,
  num: number,
  title: string,
  sub: string,
  color: string
): string {
  const pinX = lx - 11;
  const textX = lx + 2;
  const gutterY = 301;
  const topOfBadge = ly - 9;
  return `
    <g>
      <polyline points="${tx},${ty} ${tx},${gutterY} ${pinX},${gutterY} ${pinX},${topOfBadge}" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="${tx},${ty} ${tx},${gutterY} ${pinX},${gutterY} ${pinX},${topOfBadge}" fill="none" stroke="${color}" stroke-width="1.35" stroke-dasharray="3 2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${tx}" cy="${ty}" r="3.0" fill="${color}" stroke="#ffffff" stroke-width="1.2"/>
      <circle cx="${pinX}" cy="${ly}" r="8.4" fill="${color}" stroke="#ffffff" stroke-width="1.4"/>
      <text x="${pinX}" y="${ly + 3.2}" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">${num}</text>
      <text x="${textX}" y="${ly - 1.2}" font-size="9.0" font-weight="800" fill="#0f172a">${escV2(title)}</text>
      <text x="${textX}" y="${ly + 10.6}" font-size="7.5" font-weight="600" fill="#475569">${escV2(sub)}</text>
    </g>`;
}

/**
 * Ultra-HD 720x500 Nature/IEEE-Grade Nanoscale Monograph Schematics — BIONZ V2 Group H (X2-96 – X2-105).
 * Features authentic 60°-slanted TFLN ridge SEM cross-sections & 4-level PAM4 eye diagrams, InP-on-Si MQW
 * DFB lasers & OSA spectra, 4F^2 VCT/FBC CoP DRAM TEM sections, Angle-D CoW CSAM comparisons, Cooley-Tukey
 * NTT butterfly graphs & C-Latch TRNG schematics, LFI BBICS transistor circuits, XR2 homography/skeleton
 * EIS, PWM variable-shutter integration timing, c-axis AlN XRD rocking curves, and Hex-Petal 3-Path boiling.
 */
export function renderBionzV2GroupH(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // =========================================================================
    // X2-96. OFC 2026 400G/512G TFLN 60°-Slanted Ridge-Waveguide CL-TWE Pockels MZM
    // =========================================================================
    case 'xv2_tfln_400g_pockels_modulator':
      return renderBionzV2Hd({
        badge: 'X2-96',
        zone: 'pkg35d',
        nodeTag: 'OFC 2026 · TFLN 400G/512G',
        title: 'OFC 2026「60°傾斜TFLNリッジ導波路 ＆ 容量装荷CL-TWE 400G/512Gポッケルス光変調器」',
        analogy: 'シリコン光変調の壁(75GHz)を超え、電界で結晶の屈折率を直線的に瞬間変調する220GHz級無歪み光シャッター',
        metric: '0.77 dB @110GHz · 512G',
        scaleLabel: '60° 1μm×200nm · VπL 1.08V·cm',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        art: (p) => `
          <!-- LEFT PANEL TOP: True 60°-Slanted Etched Trapezoidal TFLN Ridge Waveguide SEM Cross-Section -->
          <rect x="64" y="78" width="346" height="106" rx="9" fill="#0f172a" stroke="#38bdf8" stroke-width="1.25"/>
          <text x="237" y="92" text-anchor="middle" font-size="8.2" font-weight="800" fill="#e0f2fe">SEM横断面：X-Cut LNOI 60°傾斜リッジ導波路 ＋ 1.4μm Au CL-TWE電極</text>

          <!-- 600nm SiO2 Upper Cladding + 4.7um BOX Oxide -->
          <rect x="76" y="102" width="322" height="46" fill="#1e293b"/>
          <rect x="76" y="148" width="322" height="18" fill="#334155"/>
          <text x="237" y="160" text-anchor="middle" font-size="6.6" font-weight="800" fill="#cbd5e1">4.7 μm BOX SiO₂ 埋込酸化膜 / 高抵抗Si基板</text>
          <!-- Thin-Film LiNbO3 Slab + Two 60°-Slanted Trapezoidal 1um x 200nm Ridges -->
          <rect x="76" y="139" width="322" height="9" fill="url(#${p}_cyan)" opacity="0.85"/>
          <polygon points="154,139 162,123 182,123 190,139" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1"/>
          <polygon points="284,139 292,123 312,123 320,139" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1"/>
          <!-- Glowing TE0 Optical Mode Ovals inside both 60° ridges -->
          <ellipse cx="172" cy="133" rx="9" ry="5" fill="#fde047" opacity="0.9"/>
          <ellipse cx="302" cy="133" rx="9" ry="5" fill="#fde047" opacity="0.9"/>

          <!-- 1.4um Electroplated Au GSG CL-TWE Electrodes flanking the G=5-6um gaps -->
          <rect x="86" y="108" width="54" height="28" rx="2" fill="url(#${p}_gold)"/>
          <text x="113" y="125" text-anchor="middle" font-size="7.4" font-weight="900" fill="#0f172a">GND</text>
          <rect x="206" y="108" width="62" height="28" rx="2" fill="url(#${p}_cu)"/>
          <text x="237" y="125" text-anchor="middle" font-size="7.4" font-weight="900" fill="#ffffff">SIG (1.4μm)</text>
          <rect x="334" y="108" width="54" height="28" rx="2" fill="url(#${p}_gold)"/>
          <text x="361" y="125" text-anchor="middle" font-size="7.4" font-weight="900" fill="#0f172a">GND</text>

          <!-- Push-Pull Horizontal Pockels Electric Field Arrows (E_z pointing opposite through left/right ridges!) -->
          <line x1="204" y1="131" x2="144" y2="131" stroke="#f43f5e" stroke-width="1.6" marker-end="url(#${p}_arr_red)"/>
          <line x1="270" y1="131" x2="330" y2="131" stroke="#f43f5e" stroke-width="1.6" marker-end="url(#${p}_arr_red)"/>
          <text x="172" y="116" text-anchor="middle" font-size="6.4" font-weight="900" fill="#fca5a5">← E_z (+Δn)</text>
          <text x="302" y="116" text-anchor="middle" font-size="6.4" font-weight="900" fill="#fca5a5">E_z (−Δn) →</text>
          <text x="237" y="177" text-anchor="middle" font-size="6.6" font-weight="800" fill="#38bdf8">60°側壁 1μm×200nm リッジ · ギャップ G=5–6μm · 600nm SiO₂クラッド · n_RF = n_opt</text>

          <!-- LEFT PANEL BOTTOM: Top-Down Push-Pull MZI + Periodic Capacitive T-Rail Stubs + 50Ω TaN Load -->
          <rect x="64" y="190" width="346" height="102" rx="9" fill="#ffffff" stroke="#7dd3fc" stroke-width="1.2"/>
          <text x="237" y="203" text-anchor="middle" font-size="8.0" font-weight="800" fill="#0369a1">上面レイアウト：1×2 MMI/PSR ＋ 周期TレールCL-TWE ＋ 50Ω TaN終端</text>
          <!-- GSG Bars + 10 Periodic Capacitive T-Stubs -->
          <rect x="130" y="210" width="204" height="12" rx="2" fill="url(#${p}_gold)"/>
          <rect x="130" y="238" width="204" height="13" rx="2" fill="url(#${p}_cu)"/>
          <rect x="130" y="267" width="204" height="12" rx="2" fill="url(#${p}_gold)"/>
          ${Array.from({ length: 10 }, (_, k) => {
            const sx = 138 + k * 20;
            return `
              <rect x="${sx}" y="222" width="4" height="7" fill="#d97706"/>
              <rect x="${sx - 3}" y="227" width="10" height="3" fill="#eab308"/>
              <rect x="${sx}" y="232" width="4" height="6" fill="#ea580c"/>
              <rect x="${sx}" y="251" width="4" height="6" fill="#ea580c"/>
              <rect x="${sx - 3}" y="255" width="10" height="3" fill="#eab308"/>
              <rect x="${sx}" y="260" width="4" height="7" fill="#d97706"/>
            `;
          }).join('')}
          <!-- MZI Optical Waveguides + MMI Splitter/Combiner + 50-Ohm Load -->
          <path d="M 74 244 L 106 244 L 130 231 L 334 231 L 358 244 L 398 244" fill="none" stroke="#0284c7" stroke-width="2.6"/>
          <path d="M 106 244 L 130 258 L 334 258 L 358 244" fill="none" stroke="#06b6d4" stroke-width="2.6"/>
          <rect x="94" y="236" width="22" height="16" rx="2" fill="#0f172a"/><text x="105" y="246.5" text-anchor="middle" font-size="5.6" font-weight="900" fill="#38bdf8">MMI</text>
          <rect x="348" y="236" width="22" height="16" rx="2" fill="#0f172a"/><text x="359" y="246.5" text-anchor="middle" font-size="5.6" font-weight="900" fill="#38bdf8">MMI</text>
          <rect x="336" y="210" width="14" height="69" rx="2" fill="#dc2626"/><text x="343" y="247" text-anchor="middle" font-size="5.5" font-weight="900" fill="#fff" transform="rotate(-90 343 247)">50Ω TaN</text>
          <text x="84" y="236" text-anchor="middle" font-size="6.2" font-weight="900" fill="#0369a1">CW光</text>
          <text x="388" y="236" text-anchor="middle" font-size="6.2" font-weight="900" fill="#dc2626">512G</text>
          <text x="237" y="288" text-anchor="middle" font-size="6.4" font-weight="800" fill="#0369a1">自由キャリア吸収 0 · チャープ 0 · 電気光学係数 r₃₃ = 30.8 pm/V</text>

          <!-- RIGHT TOP PANEL: 4-Level 400G/512G PAM4 Open Optical Eye Diagram + EO S21 Bandwidth Plot -->
          <rect x="418" y="78" width="280" height="134" rx="9" fill="#0b1120" stroke="#0284c7" stroke-width="1.2"/>
          <text x="558" y="92" text-anchor="middle" font-size="8.0" font-weight="800" fill="#e0f2fe">400G/512G PAM4 光アイ開口 ＆ EO S21 帯域特性</text>

          <!-- Left Half: Authentic 4-Level PAM4 Eye Diagram (3 crisp vertically stacked open eyes!) -->
          <rect x="426" y="100" width="124" height="94" rx="5" fill="#020617" stroke="#334155"/>
          ${[112, 134, 156, 178].map((y, idx) => `
            <line x1="432" y1="${y}" x2="544" y2="${y}" stroke="#1e293b" stroke-width="0.8"/>
            <text x="541" y="${y + 2.5}" text-anchor="end" font-size="5.8" font-weight="800" fill="#94a3b8">${['11', '10', '01', '00'][idx]}</text>
          `).join('')}
          <!-- PAM4 Eye Traces spanning 2 UI -->
          ${[
            'M 432 112 C 452 112 464 134 484 134 C 504 134 516 112 536 112',
            'M 432 134 C 452 134 464 112 484 112 C 504 112 516 134 536 134',
            'M 432 134 C 452 134 464 156 484 156 C 504 156 516 134 536 134',
            'M 432 156 C 452 156 464 134 484 134 C 504 134 516 156 536 156',
            'M 432 156 C 452 156 464 178 484 178 C 504 178 516 156 536 156',
            'M 432 178 C 452 178 464 156 484 156 C 504 156 516 178 536 178',
            'M 432 112 C 454 112 464 178 484 178 C 504 178 516 112 536 112',
            'M 432 178 C 454 178 464 112 484 112 C 504 112 516 178 536 178',
          ].map((d) => `<path d="${d}" fill="none" stroke="#38bdf8" stroke-width="1.35" opacity="0.82"/>`).join('')}
          <text x="488" y="205" text-anchor="middle" font-size="6.4" font-weight="900" fill="#38bdf8">PAM4 3段アイ鮮明開口</text>

          <!-- Right Half: EO S21 Roll-off Plot (0.77 dB @ 110 GHz -> 220 GHz extrapolated!) -->
          <rect x="556" y="100" width="134" height="94" rx="5" fill="#0f172a" stroke="#334155"/>
          <line x1="568" y1="146" x2="684" y2="146" stroke="#64748b" stroke-width="0.9" stroke-dasharray="3 2"/>
          <text x="571" y="142" font-size="5.8" font-weight="800" fill="#94a3b8">−3dB</text>
          <!-- Si PN curve falling off at ~75 GHz -->
          <path d="M 568 112 C 588 114 604 134 618 184" fill="none" stroke="#f87171" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="572" y="176" font-size="6.0" font-weight="800" fill="#f87171">Si PN (~75G)</text>
          <!-- TFLN CL-TWE curve: only 0.77 dB drop at 110 GHz -> 220 GHz 3dB! -->
          <path d="M 568 112 C 606 113 640 120 682 146" fill="none" stroke="#34d399" stroke-width="2.4"/>
          <circle cx="628" cy="120" r="3.2" fill="#fde047" stroke="#0f172a"/>
          <text x="628" y="112" text-anchor="middle" font-size="6.1" font-weight="900" fill="#fde047">0.77dB@110G</text>
          <text x="682" y="160" text-anchor="end" font-size="6.2" font-weight="900" fill="#34d399">外挿220GHz!</text>
          <text x="624" y="205" text-anchor="middle" font-size="6.4" font-weight="800" fill="#34d399">EO S21 帯域 vs Si限界</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(418, 219, 136, 73, 'EO S21 減衰 & 帯域', '0.77dB @110G', '外挿3dB帯域 220 GHz!', '#0284c7')}
          ${kpiCard(562, 219, 136, 73, '駆動効率 Vπ·L & 速度', '1.08–1.33 V·cm', '400G / 512G DP-TFLN', '#059669')}

          ${cleanPin(237, 290, 237, 300, 82, 319, 1, '60°傾斜リッジ＋周期容量装荷CL-TWE', '1.4μm Au Tレールで群速度整合し0.77dB@110GHzを実現', '#0284c7')}
          ${cleanPin(558, 292, 558, 300, 386, 319, 2, '純粋ポッケルス線形変調 (400G/512G)', '自由キャリア損失ゼロで200GBaud PAM4の3段アイを開口', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'X-cut LNOIに60°傾斜1μm×200nmリッジ導波路と1.4μm Au容量装荷CL-TWEを統合', line2: '1×2 MMI/PSR・EO等化器・50Ω TaN終端により光波とRF群速度を完全一致させ220GHz級動作' },
          { label: '撮影・画質への恩恵', line1: '非圧縮16bit RAW 8K/120p級の大容量データを外部レコーダーやAI演算器へ超低遅延光伝送', line2: 'Vπ·L 1.08–1.33 V·cmの低振幅駆動と無チャープ線形変調で光I/Oの電力効率を飛躍向上' },
          { label: '実機・2026学会諸元', line1: 'OFC 2026 / Nov 2025実証（110 GHzで僅か0.77 dB減衰・外挿3dB帯域 220 GHz）', line2: '400G/レーン・512 Gb/s/λ DP-TFLN対応・G=5–6μmギャップ・600nm SiO₂クラッド' },
        ],
      });

    // =========================================================================
    // X2-97. OFC 2026 Heterogeneous InP-on-Si CW-DFB Laser-Integrated PIC & 400G DD-EML
    // =========================================================================
    case 'xv2_inp_on_si_cwdfb_laser_pic':
      return renderBionzV2Hd({
        badge: 'X2-97',
        zone: 'pkg35d',
        nodeTag: 'OFC 2026 · OpenLight PH18DA',
        title: 'OFC 2026「InP-on-Si 直接接合CW-DFBレーザー集積PIC ＆ 99GHz 400G差動駆動EML」',
        analogy: '発光できないシリコン導波路へ直接遷移InP量子井戸を常温直接接合し、チップ自身が単色発光する光集積回路',
        metric: '1.6T / 3.2T DR8 PIC',
        scaleLabel: '350nm MQW · 99GHz · >50dB',
        accent: '#dc2626',
        accentSoft: '#fef2f2',
        art: (p) => `
          <!-- LEFT PANEL: Full Longitudinal Heterogeneous InP-on-Si CW-DFB -> Adiabatic Taper -> 400G DD-EML -> V-Groove -->
          <rect x="64" y="78" width="352" height="214" rx="9" fill="#ffffff" stroke="#fca5a5" stroke-width="1.3"/>
          <rect x="64" y="78" width="352" height="21" rx="9" fill="#fef2f2"/>
          <rect x="64" y="89" width="352" height="10" fill="#fef2f2"/>
          <text x="240" y="92.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#991b1b">III-V/Si 異種直接接合断面：CW-DFBレーザー → 断熱テーパ → 差動EML → V溝</text>

          <!-- Direct-Bonded 350nm AlGaInAs/InGaAsP MQW PIN Mesa Stack -->
          <rect x="82" y="108" width="138" height="11" rx="2" fill="url(#${p}_gold)"/>
          <text x="151" y="116" text-anchor="middle" font-size="6.4" font-weight="900" fill="#0f172a">Au p側アノード (H⁺プロトン閉じ込め)</text>
          <rect x="82" y="119" width="138" height="14" fill="#be123c"/>
          <text x="151" y="129" text-anchor="middle" font-size="6.5" font-weight="900" fill="#ffffff">p-InP クラッドリブ</text>
          <!-- 5-Layer Active MQW Quantum Wells Stripes! -->
          <rect x="82" y="133" width="138" height="16" fill="#fef08a" stroke="#dc2626" stroke-width="0.9"/>
          ${[136, 140, 144, 147].map((wy) => `<line x1="84" y1="${wy}" x2="218" y2="${wy}" stroke="#dc2626" stroke-width="1.2"/>`).join('')}
          <text x="151" y="144" text-anchor="middle" font-size="6.2" font-weight="900" fill="#7f1d1d">350nm AlGaInAs MQW発光層</text>
          <rect x="82" y="149" width="138" height="12" fill="#9f1239"/>
          <text x="151" y="158" text-anchor="middle" font-size="6.3" font-weight="800" fill="#ffe4e6">n-InP 接合層 (RT直接接合+300°C 2h)</text>

          <!-- Adiabatic III-V-to-Si Inverted Taper Horn -->
          <polygon points="220,133 266,161 220,161" fill="url(#${p}_sige)"/>
          <text x="244" y="122" text-anchor="middle" font-size="6.1" font-weight="900" fill="#be123c">断熱テーパ</text>
          <text x="244" y="131" text-anchor="middle" font-size="5.5" font-weight="800" fill="#475569">光結合</text>

          <!-- SOI Silicon Waveguide with λ/4 Phase-Shifted Bragg Grating (center phase defect highlighted!) -->
          <rect x="74" y="162" width="332" height="22" rx="2" fill="url(#${p}_cyan)"/>
          ${Array.from({ length: 12 }, (_, i) => {
            const gx = 86 + i * 10 + (i >= 6 ? 5 : 0);
            return `<rect x="${gx}" y="162" width="5" height="6" fill="#0f172a"/>`;
          }).join('')}
          <rect x="145" y="161" width="6" height="8" fill="#fde047"/>
          <text x="176" y="179" text-anchor="middle" font-size="6.4" font-weight="900" fill="#ffffff">Si導波路 ＋ λ/4 Bragg格子 (200–353nm)</text>

          <!-- Downstream 400G Differential-Drive EML (99 GHz 6-dB, 0.75 Vpp/arm) -->
          <rect x="274" y="118" width="78" height="44" rx="5" fill="url(#${p}_hfo2)" stroke="#4c1d95"/>
          <text x="313" y="134" text-anchor="middle" font-size="7.2" font-weight="900" fill="#ffffff">400G 差動EML</text>
          <text x="313" y="146" text-anchor="middle" font-size="6.4" font-weight="800" fill="#fde047">99 GHz 6-dB</text>
          <text x="313" y="157" text-anchor="middle" font-size="6.2" font-weight="800" fill="#ede9fe">0.75 Vpp/arm</text>
          <!-- Optical Output Beam into Etched Si V-Groove Passive Fiber Array -->
          <line x1="220" y1="173" x2="360" y2="173" stroke="#fde047" stroke-width="2.4" marker-end="url(#${p}_arr_gold)"/>
          <polygon points="362,158 406,158 406,188 362,188 370,173" fill="#e2e8f0" stroke="#475569" stroke-width="1"/>
          <line x1="366" y1="173" x2="404" y2="173" stroke="#ef4444" stroke-width="3.2"/>
          <text x="385" y="153" text-anchor="middle" font-size="6.2" font-weight="900" fill="#334155">Si V溝調心</text>

          <!-- BOX & Si Substrate + Transverse Cross-Section Mini Inset -->
          <rect x="74" y="185" width="332" height="17" fill="url(#${p}_glass)" stroke="#94a3b8"/>
          <text x="240" y="196.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#0f172a">BOX 埋込酸化膜 ＋ 200/300mm Si量産ウェハー（InP基板は剥離除去済）</text>

          <!-- Bottom 8-Channel LAN-WDM Integration Strip -->
          <rect x="74" y="210" width="332" height="72" rx="6" fill="#0f172a" stroke="#ef4444"/>
          <text x="240" y="224" text-anchor="middle" font-size="7.4" font-weight="900" fill="#fca5a5">8チャネル LAN-WDM 集積PIC（1272.55 – 1310.19 nm Oバンド無分散）</text>
          ${Array.from({ length: 8 }, (_, ch) => {
            const x = 86 + ch * 39;
            return `
              <rect x="${x}" y="232" width="32" height="16" rx="2.5" fill="url(#${p}_sige)"/>
              <text x="${x + 16}" y="242.5" text-anchor="middle" font-size="6.0" font-weight="900" fill="#ffffff">λ${ch + 1}</text>
              <line x1="${x + 16}" y1="248" x2="${x + 16}" y2="262" stroke="#fde047" stroke-width="1.3"/>
              <rect x="${x}" y="262" width="32" height="12" rx="2" fill="#4f46e5"/>
              <text x="${x + 16}" y="270.5" text-anchor="middle" font-size="5.6" font-weight="800" fill="#ffffff">400G</text>
            `;
          }).join('')}

          <!-- RIGHT TOP PANEL: Authentic Optical Spectrum Analyzer (OSA) Trace (SMSR > 50 dB!) -->
          <rect x="424" y="78" width="274" height="134" rx="9" fill="#0b1120" stroke="#dc2626" stroke-width="1.2"/>
          <text x="561" y="92" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fee2e2">光スペクトラムアナライザ実測：DFB単一モード (SMSR &gt;50dB)</text>
          <line x1="454" y1="102" x2="454" y2="188" stroke="#475569" stroke-width="1"/>
          <line x1="454" y1="188" x2="686" y2="188" stroke="#475569" stroke-width="1"/>
          ${[112, 138, 164, 186].map((gy, idx) => `
            <line x1="454" y1="${gy}" x2="686" y2="${gy}" stroke="#1e293b" stroke-width="0.8"/>
            <text x="450" y="${gy + 2.5}" text-anchor="end" font-size="6.0" font-weight="700" fill="#94a3b8">${['0', '-20', '-40', '-60dB'][idx]}</text>
          `).join('')}
          <!-- Noise floor + Bragg stopband + towering single λ/4 mode peak -->
          <path d="M 456 184 L 486 182 L 496 172 L 504 182 L 534 182 L 544 170 L 552 182 L 566 110 L 574 182 L 594 171 L 604 182 L 642 183 L 684 184" fill="none" stroke="#f43f5e" stroke-width="2.2"/>
          <circle cx="566" cy="110" r="3.4" fill="#fde047" stroke="#dc2626"/>
          <!-- SMSR vertical dimension arrow -->
          ${dimArrow(592, 110, 592, 171, '>50dB', '#34d399')}
          <text x="566" y="106" text-anchor="middle" font-size="6.6" font-weight="900" fill="#fde047">λ₀ = 1310 nm</text>
          <text x="646" y="138" text-anchor="middle" font-size="6.5" font-weight="800" fill="#38bdf8">線幅 &lt;100 kHz</text>
          <text x="646" y="150" text-anchor="middle" font-size="6.3" font-weight="700" fill="#cbd5e1">効率 &gt;0.35 W/A</text>
          <text x="570" y="203" text-anchor="middle" font-size="6.4" font-weight="700" fill="#94a3b8">波長 λ (nm) · 外部レーザー調心レスで3.2T DR8高密度化</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(424, 219, 133, 73, '異種接合PIC帯域', '1.6T / 3.2T DR8', 'OpenLight / Tower PH18DA', '#dc2626')}
          ${kpiCard(565, 219, 133, 73, '400G 差動駆動EML', '0.75 Vpp/arm', '99 GHz 6-dB · 低消費電力', '#7c3aed')}

          ${cleanPin(151, 290, 151, 300, 82, 319, 1, 'RT直接接合 350nm AlGaInAs MQW + λ/4格子', 'InP基板剥離後にSi側Bragg格子へ光結合しSMSR>50dB単一波長発振', '#dc2626')}
          ${cleanPin(561, 292, 561, 300, 386, 319, 2, '99 GHz 400G差動EML ＋ Si V溝パッシブ調心', '外付けレーザー結合ロスを撲滅し8ch 3.2T超小型光エンジンを量産', '#7c3aed')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'SOI Si導波路上へ350nm AlGaInAs MQWを常温直接接合＋300°CアニールしたCW-DFB PIC', line2: 'Si側のλ/4位相シフトBragg格子と断熱テーパで光を移し99GHz 400G差動EML・Si V溝へ直結' },
          { label: '撮影・画質への恩恵', line1: '外付けレーザー光源や精密光ファイバ調心を廃し、カメラ内部の超小型・低損光バスを実現', line2: '0.75 Vpp/armの極小振幅駆動と1310nm無分散伝送で超高速イメージャー直結リンクを省電力化' },
          { label: '実機・2026学会諸元', line1: 'OFC 2026 (OpenLight / Tower PH18DA 1.6T・3.2T DR8 PIC / Paper Tu3J.6)', line2: '99 GHz 6-dB EO帯域・SMSR >50 dB・スロープ効率 >0.35 W/A・Oバンド8波長対応' },
        ],
      });

    // =========================================================================
    // X2-98. ISSCC / IEDM 2026 4F^2 Vertical-Channel Transistor (VCT) & CoP 3D DRAM
    // =========================================================================
    case 'xv2_4f2_vct_cop_3d_dram':
      return renderBionzV2Hd({
        badge: 'X2-98',
        zone: 'pkg35d',
        nodeTag: 'ISSCC / IEDM 2026 · 4F² VCT',
        title: 'ISSCC / IEDM 2026「4F² 垂直チャネルVCT / FBC ＆ Cu-Cuウェハー貼合（CoP）3D DRAM」',
        analogy: '平屋の6F²メモリを縦に起立させ、さらに制御回路を地下階(CoP)へ直結して記憶密度を2倍にする立体高層DRAM',
        metric: '4F² (−33%) · 85°C 170s',
        scaleLabel: '41×47.3nm PITCH · Cu-Cu CoP',
        accent: '#9333ea',
        accentSoft: '#faf5ff',
        defsExtra: (p) => `
          <clipPath id="${p}_loupe"><circle cx="348" cy="182" r="41"/></clipPath>
        `,
        art: (p) => `
          <!-- LEFT PANEL: Authentic TEM Cross-Section of 4F^2 VCT + Shielded BL + Cu-Cu CoP + 6F^2 vs 4F^2 Cell Loupe -->
          <rect x="64" y="78" width="342" height="214" rx="9" fill="#ffffff" stroke="#d8b4fe" stroke-width="1.3"/>
          <rect x="64" y="78" width="342" height="21" rx="9" fill="#faf5ff"/>
          <rect x="64" y="89" width="342" height="10" fill="#faf5ff"/>
          <text x="235" y="92.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#6b21a8">4F² 垂直ゲート柱（VCT/FBC）＋ シールドBL ＋ Cu-Cu周辺貼合（CoP）TEM断面</text>

          <!-- Top Common Plate Electrode V_plate -->
          <rect x="74" y="106" width="226" height="11" rx="2" fill="url(#${p}_ru)"/>
          <text x="187" y="114" text-anchor="middle" font-size="6.4" font-weight="900" fill="#0f172a">上部共通プレート電極 V_plate</text>

          <!-- 4 Vertical 4F^2 VCT Columns: Cylindrical TiN/ZrO2/TiN Cap -> GIDL Underlap -> Asymmetric Double-Gate -> Shielded BL -->
          ${[0, 1, 2, 3].map((i) => {
            const cx = 100 + i * 56;
            return `
              <!-- Cylindrical TiN/ZrO2/TiN Storage Cap (concentric cut!) -->
              <rect x="${cx - 14}" y="117" width="28" height="36" rx="3" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="0.9"/>
              <rect x="${cx - 8}" y="119" width="16" height="32" rx="1.5" fill="#e0f2fe"/>
              <rect x="${cx - 4}" y="121" width="8" height="28" rx="1" fill="url(#${p}_gold)"/>
              <!-- GIDL-suppressing Underlap Neck -->
              <rect x="${cx - 7}" y="153" width="14" height="10" fill="#c4b5fd"/>
              <!-- Vertical Single-Crystal Si Channel Pillar -->
              <rect x="${cx - 8}" y="163" width="16" height="34" fill="url(#${p}_si)"/>
              <!-- Asymmetric Double-Gate (Front WL + Back-Gate Oxide) -->
              <rect x="${cx - 18}" y="167" width="10" height="22" rx="1.5" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="0.8"/>
              <rect x="${cx + 8}" y="167" width="7" height="22" rx="1.5" fill="#9333ea"/>
              <!-- Shielded Bitline Crosstalk Wall between adjacent columns -->
              ${i < 3 ? `<rect x="${cx + 25}" y="193" width="6" height="16" fill="#475569"/>` : ''}
            `;
          }).join('')}
          <rect x="118" y="153" width="138" height="11" rx="3" fill="#ffffff" fill-opacity="0.92" stroke="#c4b5fd" stroke-width="0.7"/>
          <text x="187" y="160.8" text-anchor="middle" font-size="6.0" font-weight="900" fill="#5b21b6">GIDL抑制アンダーラップ</text>
          <rect x="116" y="173" width="142" height="12" rx="3" fill="#0f172a" fill-opacity="0.88" stroke="#fde047" stroke-width="0.7"/>
          <text x="187" y="181.2" text-anchor="middle" font-size="6.1" font-weight="900" fill="#fef08a">非対称二重ゲート柱 (41×47.3nm)</text>

          <!-- Shielded Bitlines + Cu-Cu Direct Wafer-Bonding Hybrid Plane -->
          <rect x="74" y="198" width="226" height="11" fill="url(#${p}_ru)"/>
          <text x="187" y="206" text-anchor="middle" font-size="6.3" font-weight="900" fill="#0f172a">クロストーク遮蔽シールド付ビット線 (BL)</text>
          <rect x="74" y="211" width="226" height="13" fill="#ede9fe" stroke="#9333ea" stroke-width="0.8"/>
          ${Array.from({ length: 8 }, (_, k) => `<rect x="${84 + k * 28}" y="212" width="14" height="11" rx="1" fill="url(#${p}_cu)"/>`).join('')}
          <rect x="128" y="212.5" width="118" height="10" rx="2.5" fill="#0f172a" fill-opacity="0.84"/>
          <text x="187" y="219.8" text-anchor="middle" font-size="6.0" font-weight="900" fill="#fde047">Cu-Cu ウェハー直接貼合界面</text>

          <!-- Bottom Bonded CoP Peripheral CMOS Sense-Amp & Near-Memory Processing (NMP) Die -->
          <rect x="74" y="226" width="226" height="36" rx="4" fill="url(#${p}_hfo2)"/>
          <text x="187" y="241" text-anchor="middle" font-size="7.4" font-weight="900" fill="#ffffff">貼合周辺回路ダイ (CoP / POC)</text>
          <text x="187" y="254" text-anchor="middle" font-size="6.4" font-weight="700" fill="#f3e8ff">センスアンプ ＋ 近メモリ演算NMP直下統合</text>
          <text x="187" y="278" text-anchor="middle" font-size="6.7" font-weight="900" fill="#6b21a8">ウェハー取得ダイ数 +20%超 (Samsung ISSCC26) · 実効密度 ~2.0×</text>

          <!-- Circular Plan-View Loupe: 6F^2 Planar Cell vs 4F^2 Vertical Pillar Cell (-33% Area!) -->
          <g clip-path="url(#${p}_loupe)">
            <circle cx="348" cy="182" r="41" fill="#0f172a"/>
            <!-- 6F^2 dashed rectangle -->
            <rect x="321" y="160" width="54" height="36" fill="none" stroke="#f87171" stroke-width="1.3" stroke-dasharray="3 2"/>
            <text x="348" y="156" text-anchor="middle" font-size="5.8" font-weight="900" fill="#fca5a5">従来 6F²</text>
            <!-- 4F^2 compact square (2F x 2F) -->
            <rect x="321" y="160" width="36" height="36" fill="#9333ea" fill-opacity="0.4" stroke="#34d399" stroke-width="1.8"/>
            <circle cx="339" cy="178" r="9.5" fill="#38bdf8" stroke="#fde047" stroke-width="1.5"/>
            <text x="339" y="180.5" text-anchor="middle" font-size="6.3" font-weight="900" fill="#0f172a">4F²</text>
            <text x="348" y="209" text-anchor="middle" font-size="6.2" font-weight="900" fill="#34d399">面積 −33%!</text>
          </g>
          ${loupeFrame(348, 182, 41, '上面 6F²→4F²', '#9333ea')}

          <!-- RIGHT TOP PANEL: SK hynix IEDM 2026 Paper 11-1 Capacitorless 4F^2 FBC Retention Plot -->
          <rect x="414" y="78" width="284" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="556" y="93" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f172a">IEDM 2026 講演11-1：4F²浮遊ボディ(FBC) 驚異のデータ保持時間</text>
          <line x1="448" y1="106" x2="448" y2="188" stroke="#475569" stroke-width="1.1"/>
          <line x1="448" y1="188" x2="684" y2="188" stroke="#475569" stroke-width="1.1"/>
          <!-- Log-scale Retention Bar Comparison -->
          ${[
            { x: 464, lbl: '従来DRAM規格', val: '64 ms', h: 14, c: '#94a3b8' },
            { x: 540, lbl: 'FBC @ 85°C', val: '170 秒!', h: 48, c: '#9333ea' },
            { x: 616, lbl: 'FBC @ 25°C', val: '8,000 秒!', h: 72, c: '#059669' },
          ].map((b) => `
            <rect x="${b.x}" y="${188 - b.h}" width="54" height="${b.h}" rx="4" fill="${b.c}"/>
            <text x="${b.x + 27}" y="${183 - b.h}" text-anchor="middle" font-size="7.2" font-weight="900" fill="${b.c}">${b.val}</text>
            <text x="${b.x + 27}" y="199" text-anchor="middle" font-size="6.4" font-weight="800" fill="#0f172a">${b.lbl}</text>
          `).join('')}
          <text x="566" y="209.5" text-anchor="middle" font-size="6.3" font-weight="800" fill="#6b21a8">対数スケール：非対称二重ゲート＋バックゲート酸化膜でリフレッシュ激減!</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(414, 219, 138, 73, 'ISSCC 2026 Samsung', '16Gb 4F² VCT', '41×47.3nm · ダイ数+20%', '#9333ea')}
          ${kpiCard(560, 219, 138, 73, 'IEDM 2026 SK hynix', '85°C 170秒保持', '25°C 8,000s (キャパシタ無)', '#059669')}

          ${cleanPin(187, 290, 187, 300, 82, 319, 1, '4F² 垂直ゲート柱＋シールド付ビット線', '平面セルを垂直起立し非対称ゲートとアンダーラップでGIDLリークを激減', '#9333ea')}
          ${cleanPin(556, 292, 556, 300, 386, 319, 2, 'Cu-Cu貼合CoP ＋ 近メモリ演算NMP統合', '周辺回路をセル真下へ移し30fps無限連写バッファとAI重み容量を倍増', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'アクセストランジスタを垂直起立した4F² VCT/FBCセルと周辺回路Cu-Cu貼合(CoP)の融合', line2: 'シールド付ビット線・非対称二重ゲート・アンダーラップ接合でGIDLリークを極小化' },
          { label: '撮影・画質への恩恵', line1: '同一フットプリントでDRAM容量を約2倍へ拡張し30fps連写バッファや巨大AIモデルを常駐', line2: 'リフレッシュ電力激減と周辺ダイ近メモリ演算(NMP)で8K長時間撮影の電池持ちを延伸' },
          { label: '実機・2026学会諸元', line1: 'Samsung ISSCC 2026 (16Gb 4F² VCT・41×47.3nm・ダイ数+20%超) ＆ SK hynix IEDM 2026', line2: 'SK hynix 講演11-1 4F²浮遊ボディ(FBC)は85°C 170秒 / 25°C 8,000秒のデータ保持を実証' },
        ],
      });

    // =========================================================================
    // X2-99. ECTC 2026 Void-Free Chip-on-Wafer (CoW) Bonding-Front Angle-D Wave & Plasma Dicing
    // =========================================================================
    case 'xv2_ectc26_cow_angle_d_hb_wave':
      return renderBionzV2Hd({
        badge: 'X2-99',
        zone: 'pkg35d',
        nodeTag: 'IEEE ECTC 2026 · ASE / Shibaura',
        title: 'ECTC 2026「ボンド波面角度(Angle D)制御 ＆ Boschプラズマダイシング 無ボイドCoW接合」',
        analogy: '保護フィルムを中央から計算された角度で空気を押し出しながら貼り、気泡ゼロ・歩留99%を叩き出す接合力学',
        metric: '歩留 2.8% → 99%!',
        scaleLabel: '0.03mm DIE · 102.4μm WARP',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        art: (p) => `
          <!-- LEFT PANEL: Angle A (Trapped Air Voids + Dark CSAM) vs Angle D (Center-to-Edge Gas Expulsion + Clean CSAM) -->
          <rect x="64" y="78" width="346" height="214" rx="9" fill="#ffffff" stroke="#fdba74" stroke-width="1.3"/>
          <rect x="64" y="78" width="346" height="21" rx="9" fill="#fff7ed"/>
          <rect x="64" y="89" width="346" height="10" fill="#fff7ed"/>
          <text x="237" y="92.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#9a3412">CoWハイブリッド接合力学：Angle A 気泡封込 vs Angle D 完全排気 ＆ CSAM像</text>

          ${cmpBanner(74, 104, 152, 'Angle A: 多点接触→ボイド', false)}
          ${cmpBanner(234, 104, 166, 'Angle D: 波面排気→99%!', true)}

          <!-- Angle A Side Cross-Section (Flat touch trapping central gas pocket!) -->
          <rect x="82" y="132" width="136" height="14" rx="2" fill="url(#${p}_blue)"/>
          <ellipse cx="150" cy="153" rx="34" ry="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
          <text x="150" y="155.5" text-anchor="middle" font-size="6.4" font-weight="900" fill="#b91c1c">封込ボイド!</text>
          <rect x="82" y="162" width="136" height="16" rx="2" fill="url(#${p}_si)"/>
          ${[94, 114, 134, 166, 186, 206].map((cx) => `<rect x="${cx - 4}" y="159" width="8" height="4" fill="url(#${p}_cu)"/>`).join('')}

          <!-- Angle A CSAM Ultrasonic Scan Box (blotchy white/red void defects!) -->
          <rect x="92" y="184" width="116" height="44" rx="4" fill="#1e293b" stroke="#dc2626" stroke-width="1.2"/>
          <text x="150" y="194" text-anchor="middle" font-size="6.0" font-weight="800" fill="#fca5a5">CSAM 超音波探傷像 (歩留 2.8%)</text>
          <ellipse cx="132" cy="212" rx="16" ry="9" fill="#fef2f2" stroke="#ef4444" stroke-width="1.2"/>
          <ellipse cx="168" cy="209" rx="12" ry="7" fill="#fee2e2" stroke="#ef4444" stroke-width="1.2"/>
          <circle cx="152" cy="218" r="5" fill="#ffffff"/>

          <!-- Angle D Side Cross-Section (Shibaura TFC-6500 Plunger initiating controlled tilt wave expelling air!) -->
          <rect x="306" y="124" width="22" height="12" rx="2" fill="#475569"/>
          <g transform="translate(317, 141) rotate(-9)">
            <rect x="-66" y="-8" width="132" height="12" rx="2" fill="url(#${p}_emerald)"/>
          </g>
          <line x1="296" y1="156" x2="386" y2="152" stroke="#0284c7" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
          <text x="348" y="160" text-anchor="middle" font-size="6.0" font-weight="900" fill="#0369a1">波面→排気!</text>
          <rect x="248" y="162" width="138" height="16" rx="2" fill="url(#${p}_si)"/>
          ${[260, 280, 300, 320, 340, 360, 376].map((cx) => `<rect x="${cx - 4}" y="159" width="8" height="4" fill="url(#${p}_cu)"/>`).join('')}

          <!-- Angle D CSAM Ultrasonic Scan Box (100% uniform spotless bonding!) -->
          <rect x="256" y="184" width="124" height="44" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1.3"/>
          <text x="318" y="194" text-anchor="middle" font-size="6.0" font-weight="900" fill="#6ee7b7">CSAM 像：完全無ボイド (95–99%!)</text>
          <rect x="266" y="199" width="104" height="23" rx="2" fill="#0f766e" stroke="#34d399" stroke-width="0.8"/>
          <text x="318" y="213.5" text-anchor="middle" font-size="6.8" font-weight="900" fill="#ecfdf5">6μmピッチ (3μm Cu) 全面密着</text>

          <!-- Bottom Clean Pre-Process Flow: Water-Soluble PL -> Laser Groove -> Bosch Plasma Dicing -> Rinse -->
          <rect x="74" y="238" width="326" height="44" rx="6" fill="#fff7ed" stroke="#ea580c"/>
          <text x="237" y="251" text-anchor="middle" font-size="7.1" font-weight="900" fill="#9a3412">無塵前工程：水溶性保護膜(PL) → レーザ溝 → Boschプラズマダイシング → 純水洗浄</text>
          ${['1. 水溶性PL保護', '2. レーザ溝加工', '3. Boschプラズマ', '4. 無塵0.03mmダイ'].map((st, idx) => `
            <rect x="${80 + idx * 80}" y="257" width="74" height="19" rx="4" fill="${idx === 2 ? '#ea580c' : '#ffffff'}" stroke="#ea580c" stroke-width="0.9"/>
            <text x="${117 + idx * 80}" y="269.5" text-anchor="middle" font-size="6.1" font-weight="900" fill="${idx === 2 ? '#ffffff' : '#9a3412'}">${st}</text>
          `).join('')}

          <!-- RIGHT TOP PANEL: Ultra-Thin Die Warpage Tolerance Chart (0.10 / 0.05 / 0.03 mm -> 102.4 um warp!) -->
          <rect x="418" y="78" width="280" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="558" y="93" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f172a">極薄ダイ反り量 vs Angle D 無ボイド接合実績 (ASE ECTC26)</text>
          ${[
            { t: '0.10mm 厚', warp: '反り 14.7 μm', res: '○ 0ボイド', w: 28, c: '#f59e0b', inside: false },
            { t: '0.05mm 厚', warp: '反り 41.3 μm', res: '○ 2.8%→99%!', w: 68, c: '#f97316', inside: true },
            { t: '0.03mm 極薄', warp: '反り 102.4 μm!', res: '○ 0ボイド達成!', w: 120, c: '#dc2626', inside: true },
          ].map((r, idx) => `
            <text x="426" y="${120 + idx * 29}" font-size="7.1" font-weight="900" fill="#0f172a">${r.t}</text>
            <rect x="488" y="${108 + idx * 29}" width="${r.w}" height="17" rx="3.5" fill="${r.c}"/>
            <text x="${r.inside ? 493 : 493 + r.w}" y="${119.5 + idx * 29}" font-size="6.6" font-weight="900" fill="${r.inside ? '#ffffff' : '#b45309'}">${r.warp}</text>
            <text x="690" y="${119.5 + idx * 29}" text-anchor="end" font-size="7.0" font-weight="900" fill="#047857">${r.res}</text>
          `).join('')}
          <rect x="426" y="194" width="264" height="13" rx="3" fill="#ecfdf5"/>
          <text x="558" y="203" text-anchor="middle" font-size="6.4" font-weight="800" fill="#065f46">SiCN / TEOS / 有機ハイブリッド異種界面すべてで 95–99% CSAM歩留り実証</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(418, 219, 136, 73, '歩留り劇的改善', '2.8% → 99%', '8×12×0.05mmダイ実証', '#ea580c')}
          ${kpiCard(562, 219, 136, 73, '高精度ボンダー', '1 μm (3σ)', 'Shibaura TFC-6500制御', '#0284c7')}

          ${cleanPin(318, 290, 318, 300, 82, 319, 1, '初期接触角 Angle D による単一波面排気', '多点接触による気泡封じ込めを防ぎ30μm極薄102μm反りダイも無ボイド化', '#ea580c')}
          ${cleanPin(558, 292, 558, 300, 386, 319, 2, 'Boschプラズマダイシング ＋ 6μmピッチ', '機械ブレード屑ゼロの清浄端面と1μm 3σ精度でCoW量産品質を確立', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'Shibaura TFC-6500でCoW接合初期角(Angle D)を精密制御し中央→外周へ界面ガスを完全排出', line2: '水溶性保護膜(PL)＋レーザ溝＋Boschプラズマダイシングで微粒子・再凝固屑を根本遮断' },
          { label: '撮影・画質への恩恵', line1: '良品チップレットのみを積層するCoW実装の致命傷(界面ボイド)を撲滅し長期品質を保証', line2: '0.03mm極薄ダイの102.4μm大反りでも無ボイド接合し超薄型3DカメラSoCパッケージを実現' },
          { label: '実機・2026学会諸元', line1: 'IEEE 76th ECTC 2026 (ASE発表)・8×12×0.05mmダイでCSAM歩留り 2.8% → 99% 改善', line2: '6μmピッチ(3μm Cuパッド) SiCN/TEOS/有機異種界面で95–99%歩留・精度 1 μm (3σ)' },
        ],
      });

    // =========================================================================
    // X2-100. Post-Quantum Cryptography (ML-KEM / ML-DSA Unified NTT) & 38.1 fJ/bit C-Latch TRNG
    // =========================================================================
    case 'xv2_pqc_mlkem_mldsa_clatch_trng':
      return renderBionzV2Hd({
        badge: 'X2-100',
        zone: 'isp_mem',
        nodeTag: 'NIST FIPS 203/204 · OJCAS 2026',
        title: '耐量子暗号PQC「ML-KEM/ML-DSA 統合バタフライNTT核 ＆ 38.1 fJ/bit 自動零点C-Latch乱数器」',
        analogy: '未来の量子計算機でも破れない格子暗号で写真署名を永年保護し、極小電力で完全な熱雑音乱数を生む金庫',
        metric: 'FIPS 203/204 · 38.1 fJ/b',
        scaleLabel: '162.48 Mb/s TRNG · 6σ AUTO-ZERO',
        accent: '#ca8a04',
        accentSoft: '#fefce8',
        art: (p) => `
          <!-- LEFT PANEL: Authentic Cooley-Tukey / Gentleman-Sande Butterfly NTT Signal-Flow Graph + Module-LWE Lattice -->
          <rect x="64" y="78" width="346" height="214" rx="9" fill="#ffffff" stroke="#fde047" stroke-width="1.3"/>
          <rect x="64" y="78" width="346" height="21" rx="9" fill="#fefce8"/>
          <rect x="64" y="89" width="346" height="10" fill="#fefce8"/>
          <text x="237" y="92.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#854d0e">統合多項式NTTバタフライ演算網（ML-KEM q=3329 / ML-DSA q=8380417共用）</text>

          <!-- Top-Left: Mini 2D Module-LWE Lattice & SVP Shortest Vector Hardness Diagram -->
          <rect x="74" y="106" width="110" height="96" rx="6" fill="#0f172a" stroke="#eab308"/>
          <text x="129" y="118" text-anchor="middle" font-size="6.6" font-weight="900" fill="#fde047">Module-LWE 格子空間</text>
          ${[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => `
            <circle cx="${90 + c * 24 + r * 4}" cy="${130 + r * 17}" r="2.6" fill="${(r + c) % 2 === 0 ? '#38bdf8' : '#fde047'}"/>
          `).join('')).join('')}
          <line x1="90" y1="181" x2="118" y2="164" stroke="#34d399" stroke-width="1.6" marker-end="url(#${p}_arr_green)"/>
          <line x1="90" y1="181" x2="146" y2="132" stroke="#f43f5e" stroke-width="2.0" marker-end="url(#${p}_arr_red)"/>
          <text x="148" y="195" text-anchor="end" font-size="6.0" font-weight="800" fill="#fca5a5">b = A·s + e (量子解読不能)</text>

          <!-- Top-Right: Authentic Mixed-Radix-4/2 Cooley-Tukey / Gentleman-Sande Butterfly Graph -->
          <rect x="192" y="106" width="208" height="96" rx="6" fill="#fefce8" stroke="#ca8a04"/>
          <text x="296" y="118" text-anchor="middle" font-size="6.8" font-weight="900" fill="#713f12">CT / GS 切替バタフライ (a ± ω·b mod q)</text>
          <!-- 4 Input/Output Lanes with Crossed Butterfly Edges + Modular Multiplier Nodes -->
          ${[132, 150, 168, 186].map((y, i) => `
            <circle cx="206" cy="${y}" r="3.4" fill="#0284c7"/>
            <text x="199" y="${y + 2.5}" text-anchor="end" font-size="5.8" font-weight="900" fill="#0f172a">x${i}</text>
            <circle cx="386" cy="${y}" r="3.4" fill="#059669"/>
          `).join('')}
          <!-- Stage 1 Crosses (0-1, 2-3) -->
          <line x1="206" y1="132" x2="274" y2="132" stroke="#0284c7" stroke-width="1.2"/>
          <line x1="206" y1="132" x2="274" y2="150" stroke="#ca8a04" stroke-width="1.2"/>
          <line x1="206" y1="150" x2="274" y2="132" stroke="#ca8a04" stroke-width="1.2"/>
          <line x1="206" y1="150" x2="274" y2="150" stroke="#0284c7" stroke-width="1.2"/>
          <line x1="206" y1="168" x2="274" y2="168" stroke="#0284c7" stroke-width="1.2"/>
          <line x1="206" y1="168" x2="274" y2="186" stroke="#ca8a04" stroke-width="1.2"/>
          <line x1="206" y1="186" x2="274" y2="168" stroke="#ca8a04" stroke-width="1.2"/>
          <line x1="206" y1="186" x2="274" y2="186" stroke="#0284c7" stroke-width="1.2"/>
          <!-- Twiddle-Factor Montgomery Multiplier Pills -->
          <rect x="274" y="125" width="38" height="68" rx="4" fill="#0f172a" stroke="#eab308"/>
          <text x="293" y="148" text-anchor="middle" font-size="6.4" font-weight="900" fill="#fde047">× ω^k</text>
          <text x="293" y="162" text-anchor="middle" font-size="5.6" font-weight="800" fill="#38bdf8">Barrett</text>
          <text x="293" y="174" text-anchor="middle" font-size="5.6" font-weight="800" fill="#34d399">mod q</text>
          <!-- Stage 2 Crosses (0-2, 1-3) -->
          <line x1="312" y1="132" x2="386" y2="132" stroke="#059669" stroke-width="1.2"/>
          <line x1="312" y1="132" x2="386" y2="168" stroke="#d97706" stroke-width="1.2"/>
          <line x1="312" y1="168" x2="386" y2="132" stroke="#d97706" stroke-width="1.2"/>
          <line x1="312" y1="150" x2="386" y2="186" stroke="#d97706" stroke-width="1.2"/>
          <line x1="312" y1="186" x2="386" y2="150" stroke="#d97706" stroke-width="1.2"/>
          <line x1="312" y1="186" x2="386" y2="186" stroke="#059669" stroke-width="1.2"/>

          <!-- Bottom Flow: SHAKE-256 Keccak-f[1600] + C2PA Quantum-Safe Photo Signing Pipeline -->
          <rect x="74" y="210" width="326" height="72" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="237" y="224" text-anchor="middle" font-size="7.4" font-weight="900" fill="#0f172a">30fps RAW写真 リアルタイム耐量子C2PA署名パイプライン</text>
          ${[
            { t: 'RAW画像ハッシュ', s: 'SHAKE-256 XOF', c: '#eff6ff', b: '#2563eb' },
            { t: 'Keccak-f[1600]', s: '5×5スポンジ棄却', c: '#fefce8', b: '#ca8a04' },
            { t: 'UniPAM NTT', s: 'ML-DSA(Dilithium)', c: '#ecfdf5', b: '#059669' },
          ].map((blk, i) => `
            <rect x="${82 + i * 106}" y="232" width="94" height="36" rx="5" fill="${blk.c}" stroke="${blk.b}"/>
            <text x="${129 + i * 106}" y="247" text-anchor="middle" font-size="6.8" font-weight="900" fill="#0f172a">${blk.t}</text>
            <text x="${129 + i * 106}" y="260" text-anchor="middle" font-size="6.1" font-weight="700" fill="#475569">${blk.s}</text>
            ${i < 2 ? `<line x1="${176 + i * 106}" y1="250" x2="${186 + i * 106}" y2="250" stroke="#334155" stroke-width="1.5" marker-end="url(#${p}_arr_dark)"/>` : ''}
          `).join('')}

          <!-- RIGHT TOP PANEL: Authentic Transistor-Level Mismatch Auto-Zeroing C-Latch TRNG Circuit -->
          <rect x="418" y="78" width="280" height="134" rx="9" fill="#ffffff" stroke="#059669" stroke-width="1.2"/>
          <text x="558" y="93" text-anchor="middle" font-size="8.2" font-weight="800" fill="#065f46">2026 ミスマッチ自動零点 C-Latch 真性乱数器 (TRNG) 回路</text>

          <!-- Auto-Zeroing Coupling Capacitors + Cross-Coupled Inverter Pair -->
          <rect x="428" y="102" width="160" height="84" rx="6" fill="#ecfdf5" stroke="#059669"/>
          <!-- Left Inverter + C_az1 -->
          <polygon points="444,124 468,136 444,148" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>
          <circle cx="471" cy="136" r="2.6" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
          <!-- Coupling Cap C_az1 -->
          <line x1="474" y1="136" x2="492" y2="136" stroke="#059669" stroke-width="1.4"/>
          <line x1="492" y1="127" x2="492" y2="145" stroke="#ca8a04" stroke-width="2.2"/>
          <line x1="498" y1="127" x2="498" y2="145" stroke="#ca8a04" stroke-width="2.2"/>
          <line x1="498" y1="136" x2="520" y2="136" stroke="#059669" stroke-width="1.4"/>
          <text x="495" y="123" text-anchor="middle" font-size="6.0" font-weight="900" fill="#b45309">C_az</text>
          <!-- Right Inverter (flipped feedback!) -->
          <polygon points="564,148 540,160 564,172" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>
          <circle cx="537" cy="160" r="2.6" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
          <!-- Coupling Cap C_az2 -->
          <line x1="534" y1="160" x2="514" y2="160" stroke="#059669" stroke-width="1.4"/>
          <line x1="514" y1="151" x2="514" y2="169" stroke="#ca8a04" stroke-width="2.2"/>
          <line x1="508" y1="151" x2="508" y2="169" stroke="#ca8a04" stroke-width="2.2"/>
          <line x1="508" y1="160" x2="438" y2="160" stroke="#059669" stroke-width="1.4"/>
          <!-- Cross-feedback loop wires -->
          <polyline points="438,160 438,136 444,136" fill="none" stroke="#059669" stroke-width="1.3"/>
          <polyline points="520,136 574,136 574,160 564,160" fill="none" stroke="#059669" stroke-width="1.3"/>
          <text x="508" y="114" text-anchor="middle" font-size="6.4" font-weight="900" fill="#065f46">Φ_AZ(6σ自動零点) → Φ_EVAL(熱雑音)</text>
          <text x="508" y="180" text-anchor="middle" font-size="6.0" font-weight="800" fill="#047857">電源ノイズ注入攻撃を容量平衡で無効化</text>

          <!-- 4-bit von Neumann Debiaser + NIST SP800-90B -->
          <line x1="588" y1="144" x2="602" y2="144" stroke="#059669" stroke-width="1.8" marker-end="url(#${p}_arr_green)"/>
          <rect x="606" y="104" width="84" height="80" rx="6" fill="#0f172a" stroke="#38bdf8"/>
          <text x="648" y="122" text-anchor="middle" font-size="6.8" font-weight="900" fill="#38bdf8">4bit</text>
          <text x="648" y="135" text-anchor="middle" font-size="6.8" font-weight="900" fill="#fde047">フォンノイマン</text>
          <text x="648" y="149" text-anchor="middle" font-size="6.2" font-weight="700" fill="#cbd5e1">バイアス除去</text>
          <text x="648" y="166" text-anchor="middle" font-size="6.0" font-weight="800" fill="#34d399">NIST SP800</text>
          <text x="648" y="177" text-anchor="middle" font-size="6.0" font-weight="800" fill="#34d399">-22 / 90B 適合</text>
          <text x="558" y="203" text-anchor="middle" font-size="6.4" font-weight="800" fill="#334155">0.4V〜0.9V 広動作電圧 · 真性エントロピー 0.9999/bit</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(418, 219, 136, 73, 'TRNG エネルギー効率', '38.1 fJ/bit', '@ 0.4V 超省エネ熱雑音', '#059669')}
          ${kpiCard(562, 219, 136, 73, '乱数スループット', '162.48 Mb/s', '@ 0.9V 30fps即時鍵生成', '#ca8a04')}

          ${cleanPin(237, 290, 237, 300, 82, 319, 1, 'Mixed-Radix-4/2 統合NTTバタフライ', 'ML-KEM(鍵交換)とML-DSA(電子署名)の多項式乗算を単一核で共用', '#ca8a04')}
          ${cleanPin(558, 292, 558, 300, 386, 319, 2, '結合容量C_az 自動零点C-Latch TRNG', '6σプロセスばらつきを消去し純粋熱雑音のみで耐量子秘密鍵を生成', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'NIST標準FIPS 203(ML-KEM)＆204(ML-DSA)を単一CT/GSバタフライNTTで処理する耐量子核', line2: '結合容量インバータ自動零点化(6σ耐性)＋4bitフォンノイマン補正のC-Latch TRNGを直結' },
          { label: '撮影・画質への恩恵', line1: '報道・法執行向けソニーC2PA写真真正性署名を将来の量子コンピュータ解読から永続防衛', line2: '38.1 fJ/bitの極小エネルギー乱数供給により30fps連写の全コマへ遅延ゼロで鍵署名' },
          { label: '実機・2026学会諸元', line1: 'IEEE OJCAS 2025/2026 UniPAM 統合ML-KEM/ML-DSA ＋ 2026 自動零点C-Latch TRNG', line2: 'TRNG効率 38.1 fJ/bit (@0.4V)・速度 162.48 Mb/s (@0.9V)・NIST SP800-22/90B完全適合' },
        ],
      });

    // =========================================================================
    // X2-101. Optical LFI 286 F^2/Cell Distributed Bulk-Current Sensor (BBICS) & Secure Flush
    // =========================================================================
    case 'xv2_lfi_optical_bulk_current_mesh':
      return renderBionzV2Hd({
        badge: 'X2-101',
        zone: 'isp_mem',
        nodeTag: 'ISSCC / IEEE TDMR · LFI Defense',
        title: 'レーザー物理攻撃防御網「286 F²/cell バルク電流センサ(BBICS) ＆ 1サイクル鍵消去」',
        analogy: 'チップ裏から秘密鍵を盗む近赤外レーザー攻撃を、基板全域の光電流センサが1ナノ秒未満で検知し即自爆消去',
        metric: '286 F²/cell · <1ns検知',
        scaleLabel: '1064 nm NIR LFI · BULK CURRENT',
        accent: '#dc2626',
        accentSoft: '#fef2f2',
        art: (p) => `
          <!-- LEFT PANEL: Silicon Depth Cross-Section + Transistor-Level BBICS Current-Mirror Sensor -->
          <rect x="64" y="78" width="346" height="214" rx="9" fill="#ffffff" stroke="#fca5a5" stroke-width="1.3"/>
          <rect x="64" y="78" width="346" height="21" rx="9" fill="#fef2f2"/>
          <rect x="64" y="89" width="346" height="10" fill="#fef2f2"/>
          <text x="237" y="92.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#991b1b">裏面1064nmレーザー攻撃(LFI) 光電キャリア発生 ＆ BBICSカレントミラー検知</text>

          <!-- Top Metal Serpentine Active Anti-Probe Shield + C2PA Crypto Vault -->
          <rect x="74" y="104" width="326" height="11" rx="2" fill="url(#${p}_cu)"/>
          <text x="237" y="112" text-anchor="middle" font-size="6.3" font-weight="900" fill="#ffffff">最上層蛇行アクティブ防探針メッシュ（表面FIB改ざん検知）</text>

          <!-- BBICS Transistor-Level Current-Mirror & Latch Strip monitoring N/P Wells -->
          <rect x="74" y="118" width="326" height="50" rx="5" fill="#0f172a" stroke="#dc2626"/>
          <text x="152" y="131" text-anchor="middle" font-size="7.0" font-weight="900" fill="#fde047">暗号コア (C2PA/PQC秘密鍵レジスタ)</text>
          <rect x="86" y="137" width="132" height="24" rx="3" fill="#1e293b" stroke="#38bdf8"/>
          <text x="152" y="152" text-anchor="middle" font-size="6.8" font-weight="900" fill="#38bdf8">1サイクル セキュアフラッシュ → 0x00</text>
          <!-- Mini BBICS Current-Mirror Schematic Box -->
          <rect x="232" y="123" width="160" height="40" rx="4" fill="#450a0a" stroke="#f87171"/>
          <text x="312" y="134" text-anchor="middle" font-size="6.6" font-weight="900" fill="#fca5a5">286 F²/cell BBICS カレントミラー検知</text>
          <text x="312" y="146" text-anchor="middle" font-size="6.3" font-weight="800" fill="#fde047">I_bulk &gt; I_th → ラッチ即トリップ!</text>
          <text x="312" y="157" text-anchor="middle" font-size="5.9" font-weight="700" fill="#fecaca">M1–M4最小構成 · 時分割で極低待機電力</text>
          <line x1="232" y1="148" x2="220" y2="148" stroke="#fde047" stroke-width="2" marker-end="url(#${p}_arr_gold)"/>

          <!-- Twin P-Well / N-Well Active Layer with Distributed Well-Tap Sensors -->
          <rect x="74" y="170" width="106" height="32" fill="#e2e8f0" stroke="#64748b"/>
          <text x="127" y="189" text-anchor="middle" font-size="6.8" font-weight="800" fill="#334155">正常 P-Well</text>
          <rect x="180" y="170" width="114" height="32" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
          <text x="237" y="184" text-anchor="middle" font-size="7.0" font-weight="900" fill="#b91c1c">被弾 N/P-Well!</text>
          <text x="237" y="196" text-anchor="middle" font-size="6.3" font-weight="900" fill="#dc2626">I_ph スパイク流出 ↑</text>
          <rect x="294" y="170" width="106" height="32" fill="#e2e8f0" stroke="#64748b"/>
          <text x="347" y="189" text-anchor="middle" font-size="6.8" font-weight="800" fill="#334155">正常 N-Well</text>
          <!-- Upward bulk current arrows into BBICS -->
          <line x1="237" y1="176" x2="237" y2="162" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>

          <!-- Transmissive Silicon Substrate + Backside 1064nm NIR Laser Cone + e-/h+ Plasma Funnel -->
          <rect x="74" y="202" width="326" height="38" fill="url(#${p}_ru)"/>
          <text x="128" y="224" text-anchor="middle" font-size="6.8" font-weight="800" fill="#0f172a">Si基板 (1064nm透過)</text>
          <!-- Glowing Laser Cone + Electron-Hole Pairs -->
          <polygon points="237,278 208,200 266,200" fill="url(#${p}_laser)" opacity="0.82"/>
          ${[[228, 212], [244, 216], [236, 226], [226, 232], [248, 228]].map(([ex, ey]) => `<circle cx="${ex}" cy="${ey}" r="2.5" fill="#fde047" stroke="#dc2626" stroke-width="0.7"/>`).join('')}
          <text x="342" y="224" text-anchor="middle" font-size="6.4" font-weight="900" fill="#7f1d1d">e⁻/h⁺光電プラズマ</text>
          <!-- Micro-Objective Lens below backside -->
          <ellipse cx="237" cy="276" rx="28" ry="6" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="1.2"/>
          <text x="338" y="274" text-anchor="middle" font-size="6.8" font-weight="900" fill="#be123c">▲ 裏面 1064nm NIR攻撃</text>

          <!-- RIGHT TOP PANEL: Synchronized Attack-vs-Zeroization High-Speed Timing Waveform (Dark CRT) -->
          <rect x="418" y="78" width="280" height="134" rx="9" fill="#0b1120" stroke="#dc2626" stroke-width="1.2"/>
          <text x="558" y="92" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fee2e2">LFI検知 → 単一サイクル秘密鍵消去 タイミング波形</text>

          <!-- Trace 1: 1064nm Laser Pulse -->
          <text x="426" y="114" font-size="6.2" font-weight="800" fill="#f472b6">LASER</text>
          <path d="M 464 118 L 510 118 L 516 102 L 534 102 L 540 118 L 686 118" fill="none" stroke="#f43f5e" stroke-width="2"/>
          <!-- Trace 2: Well Bulk Photocurrent I_ph crossing I_th -->
          <text x="426" y="142" font-size="6.2" font-weight="800" fill="#fbbf24">I_bulk</text>
          <line x1="464" y1="136" x2="686" y2="136" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3 2"/>
          <text x="684" y="133" text-anchor="end" font-size="5.8" font-weight="800" fill="#94a3b8">I_th 閾値</text>
          <path d="M 464 148 L 514 148 L 524 124 Q 542 132 568 148 L 686 148" fill="none" stroke="#fbbf24" stroke-width="2.1"/>
          <!-- Trace 3: BBICS Alarm Trip (<1ns!) -->
          <text x="426" y="169" font-size="6.2" font-weight="800" fill="#38bdf8">ALARM</text>
          <path d="M 464 174 L 524 174 L 526 158 L 686 158" fill="none" stroke="#38bdf8" stroke-width="2"/>
          <!-- Trace 4: C2PA Key Vault State (Wiped to 0x0000 BEFORE faulty output!) -->
          <text x="426" y="196" font-size="6.2" font-weight="800" fill="#34d399">KEY</text>
          <rect x="464" y="185" width="76" height="14" rx="2" fill="#1e3a8a" stroke="#38bdf8"/>
          <text x="502" y="194.5" text-anchor="middle" font-size="6.0" font-weight="900" fill="#ffffff">C2PA 秘密鍵</text>
          <rect x="542" y="185" width="142" height="14" rx="2" fill="#065f46" stroke="#34d399"/>
          <text x="613" y="194.5" text-anchor="middle" font-size="6.2" font-weight="900" fill="#ffffff">0x0000... (即時ゼロ化完了!)</text>
          <line x1="524" y1="100" x2="524" y2="202" stroke="#fde047" stroke-width="1" stroke-dasharray="2 2"/>
          <text x="598" y="114" text-anchor="middle" font-size="6.4" font-weight="900" fill="#fde047">&lt; 1 ns 異常検知 → 改ざん阻止</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(418, 219, 136, 73, '超小型センサ面積', '286 F²/cell', '暗号全面へ高密度分散', '#dc2626')}
          ${kpiCard(562, 219, 136, 73, '多層物理防御', '裏面NIR + FIB', 'TDC IRドロップ検知併用', '#059669')}

          ${cleanPin(237, 290, 237, 300, 82, 319, 1, '裏面1064nm貫通レーザー光電流検知', 'Siを透過する近赤外光で生じるウエル基板バウンス電流を局所捕捉', '#dc2626')}
          ${cleanPin(558, 292, 558, 300, 386, 319, 2, 'セキュアフラッシュ 1サイクル鍵消去', 'フォールト誘発の偽C2PA署名が出力される前に秘密鍵を完全ゼロ化', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '286 F²/cellの極小バルク組込電流センサ(BBICS)を暗号領域ウエル全域に高密度分散配置', line2: 'シリコンを透過する1064nm裏面レーザー照射時の光電バルク電流を<1nsでカレントミラー検知' },
          { label: '撮影・画質への恩恵', line1: 'カメラ分解でC2PA秘密鍵を抜き取る物理フォールト攻撃(LFI)をハードウェア層で完全阻止', line2: '異常検知と同時にセキュアフラッシュが1クロックで鍵をゼロ化し報道写真真正性を死守' },
          { label: '実機・学会諸元', line1: 'ISSCC / IEEE TDMR 2024–2026 実証（286 F²/cell 分散BBICS＋セキュアフラッシュ鍵消去）', line2: '時分割監視による極低待機電力・最上層アクティブメッシュ＆TDC電圧降下検知と多層協調' },
        ],
      });

    // =========================================================================
    // X2-102. Sony BIONZ XR2 Dynamic Active Mode (+30% EIS) & AI Auto Framing / Framing Stabilizer
    // =========================================================================
    case 'xv2_xr2_dynamic_active_framing_eis':
      return renderBionzV2Hd({
        badge: 'X2-102',
        zone: 'isp_mem',
        nodeTag: 'Sony α7 V / α1 II · BIONZ XR2',
        title: 'BIONZ XR2「ダイナミックアクティブ(+30% EIS) ＆ AI姿勢推定オートフレーミング核」',
        analogy: '走りながら撮ってもジンバル級の水平を保ち、17関節AI骨格認識でカメラ内カメラマンが被写体を常時追尾',
        metric: '手ブレ補正 +30%強化',
        scaleLabel: '7K→4K60p · GYRO + FLOW + AI POSE',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        art: (p) => `
          <!-- LEFT PANEL: 7K Full-Sensor Overscan Homography + Rolling-Shutter Mesh Warp + 17-Keypoint AI Skeleton -->
          <rect x="64" y="78" width="346" height="214" rx="9" fill="#0f172a" stroke="#38bdf8" stroke-width="1.3"/>
          <rect x="64" y="78" width="346" height="21" rx="9" fill="#0c4a6e"/>
          <rect x="64" y="89" width="346" height="10" fill="#0c4a6e"/>
          <text x="237" y="92.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#e0f2fe">7K全画素読出余白ホモグラフィ歪み補正 ＋ 密オプティカルフロー ＋ AI骨格追尾</text>

          <!-- Outer 7K Overscan Margin Frame -->
          <rect x="78" y="108" width="318" height="156" rx="5" fill="#1e293b" stroke="#64748b" stroke-width="1.3" stroke-dasharray="5 3"/>
          <text x="86" y="119" font-size="6.4" font-weight="800" fill="#94a3b8">7Kオーバーサンプリング読出面 (動的EISマージン)</text>

          <!-- Curved Rolling-Shutter Warped Perspective Grid showing raw shake compensation -->
          ${[0, 1, 2, 3, 4].map((i) => `<path d="M ${86} ${128 + i * 28} Q 237 ${120 + i * 28 + (i - 2) * 3} ${388} ${134 + i * 28}" fill="none" stroke="#475569" stroke-width="0.9"/>`).join('')}
          ${[0, 1, 2, 3, 4, 5].map((j) => `<path d="M ${108 + j * 52} 118 Q ${100 + j * 52} 186 ${118 + j * 52} 256" fill="none" stroke="#475569" stroke-width="0.9"/>`).join('')}

          <!-- Dense Golden Optical-Flow Motion Vectors around perimeter -->
          ${[
            [94, 140, 118, 148], [94, 186, 120, 192], [94, 232, 118, 224],
            [380, 140, 356, 148], [380, 186, 354, 192], [380, 232, 356, 224],
          ].map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fde047" stroke-width="1.6" marker-end="url(#${p}_arr_gold)"/>`).join('')}

          <!-- Floating Dead-Level Stabilized 4K Dynamic Active Output Window -->
          <rect x="134" y="130" width="206" height="114" rx="4" fill="#0284c7" fill-opacity="0.22" stroke="#38bdf8" stroke-width="2.2"/>
          <text x="237" y="238" text-anchor="middle" font-size="7.0" font-weight="900" fill="#7dd3fc">出力 4K60p フレーム（水平＆被写体位置ロック!）</text>

          <!-- Articulated AI Human Pose Skeleton inside Crimson Framing-Stabilizer Target Reticle -->
          <rect x="196" y="138" width="82" height="86" rx="4" fill="none" stroke="#f43f5e" stroke-width="1.3" stroke-dasharray="6 3"/>
          <!-- Reticle corner ticks -->
          <path d="M 196 150 L 196 138 L 208 138 M 266 138 L 278 138 L 278 150 M 196 212 L 196 224 L 208 224 M 266 224 L 278 224 L 278 212" fill="none" stroke="#f43f5e" stroke-width="2.2"/>
          <!-- Skeleton bones & joints (head, shoulders, elbows, wrists, spine, hips, knees) -->
          <circle cx="237" cy="152" r="7.5" fill="none" stroke="#fde047" stroke-width="1.8"/>
          <line x1="237" y1="160" x2="237" y2="188" stroke="#34d399" stroke-width="2.2"/>
          <line x1="216" y1="166" x2="258" y2="166" stroke="#34d399" stroke-width="2.0"/>
          <line x1="216" y1="166" x2="207" y2="184" stroke="#38bdf8" stroke-width="1.8"/>
          <line x1="258" y1="166" x2="268" y2="180" stroke="#38bdf8" stroke-width="1.8"/>
          <line x1="237" y1="188" x2="225" y2="216" stroke="#38bdf8" stroke-width="2.0"/>
          <line x1="237" y1="188" x2="250" y2="216" stroke="#38bdf8" stroke-width="2.0"/>
          ${[[237, 152], [237, 166], [216, 166], [258, 166], [207, 184], [268, 180], [237, 188], [225, 216], [250, 216]].map(([jx, jy]) => `<circle cx="${jx}" cy="${jy}" r="2.6" fill="#f43f5e" stroke="#ffffff" stroke-width="0.7"/>`).join('')}
          <text x="237" y="280" text-anchor="middle" font-size="6.8" font-weight="800" fill="#fde047">6軸ジャイロ四元数 × 密動きベクトル × AI骨格座標(17関節) リアルタイム融合</text>

          <!-- RIGHT TOP PANEL: Residual Camera-Shake Attenuation Spectrum (0.5–20 Hz Jogging/Walk) -->
          <rect x="418" y="78" width="280" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="558" y="93" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f172a">手持ち走行時の残留ブレ振幅スペクトル（IBIS vs Dynamic Active）</text>
          <line x1="450" y1="104" x2="450" y2="188" stroke="#475569" stroke-width="1.1"/>
          <line x1="450" y1="188" x2="686" y2="188" stroke="#475569" stroke-width="1.1"/>
          ${['0.5Hz', '2Hz(歩行)', '5Hz(走行)', '10Hz', '20Hz'].map((f, i) => `
            <line x1="${460 + i * 54}" y1="104" x2="${460 + i * 54}" y2="188" stroke="#f1f5f9" stroke-width="0.8"/>
            <text x="${460 + i * 54}" y="199" text-anchor="middle" font-size="6.1" font-weight="700" fill="#475569">${f}</text>
          `).join('')}
          <!-- Curve 1: IBIS Off (huge shake peak around 2-5 Hz!) -->
          <path d="M 454 148 Q 492 108 534 114 Q 584 128 682 162" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4 2"/>
          <text x="536" y="111" text-anchor="middle" font-size="6.3" font-weight="800" fill="#64748b">補正OFF (大ブレ)</text>
          <!-- Curve 2: Conventional Active Mode -->
          <path d="M 454 166 Q 504 146 558 148 Q 618 156 682 176" fill="none" stroke="#f59e0b" stroke-width="2.1"/>
          <text x="612" y="140" font-size="6.4" font-weight="800" fill="#b45309">従来アクティブ</text>
          <!-- Curve 3: BIONZ XR2 Dynamic Active (+30% further reduction!) -->
          <path d="M 454 178 Q 512 168 564 170 Q 624 176 682 184" fill="none" stroke="#0284c7" stroke-width="2.8"/>
          ${dimArrow(558, 148, 558, 170, '+30%抑制!', '#0284c7')}
          <text x="568" y="209.5" text-anchor="middle" font-size="6.3" font-weight="800" fill="#0369a1">Catalyst Browse用高精度ジャイロメタデータ同期記録にも対応</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(418, 219, 136, 73, '手ブレ補正強化', '約 +30% 向上', '対アクティブ比 (走行安定)', '#0284c7')}
          ${kpiCard(562, 219, 136, 73, 'AIオートフレーミング', '被写体構図固定', '三脚自動パン/並走追尾', '#059669')}

          ${cleanPin(237, 290, 237, 300, 82, 319, 1, 'ライン毎RS歪み除去 ＋ 密オプティカルフロー', '7K全画素余白と6軸ジャイロ四元数で手持ち走行でもジンバル級安定化', '#0284c7')}
          ${cleanPin(558, 292, 558, 300, 386, 319, 2, 'AI骨格推定連動 フレーミング補正', '被写体の頭・骨格座標へ4K切出窓を滑らかに追従させ理想構図を維持', '#dc2626')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '6軸ジャイロ四元数・ライン毎RS歪み除去・密オプティカルフローを統合する動画ワープ核', line2: '17関節AI姿勢推定座標へ動的4Kクロップ窓を追従させるフレーミング補正＆オートフレーミング内蔵' },
          { label: '撮影・画質への恩恵', line1: 'ジンバル無しの手持ち走り撮りでも従来アクティブ比約+30%強力な極滑らか4K60p動画を実現', line2: 'ワンマン三脚収録や並走撮影でもカメラが自動でパン・ズームしプロ並みの構図を自動維持' },
          { label: '実機・ソニー仕様', line1: 'Sony α7 V / α1 II / ZV-E1 / FX2 搭載 BIONZ XR2 専用動画EIS・AI構図エンジン', line2: '7Kオーバーサンプリング4K60p対応・Catalyst Browse向け高精度ジャイロメタデータ同期出力' },
        ],
      });

    // =========================================================================
    // X2-103. Sony BIONZ XR2 Variable Shutter (1/100.3s) & Lossless RAW / 10-bit HEIF
    // =========================================================================
    case 'xv2_xr2_var_shutter_lossless_raw':
      return renderBionzV2Hd({
        badge: 'X2-103',
        zone: 'isp_mem',
        nodeTag: 'Sony α7 V / α1 II · XR2 ISP',
        title: 'BIONZ XR2「高周波フリッカーレス可変シャッター(1/100.3s) ＆ ロスレスRAW／10bit HEIF核」',
        analogy: 'LED看板の高速点滅に0.1刻みでシャッターをピタリ同期して縞を消し、14bit RAWを無劣化で半分へ圧縮',
        metric: '0.1刻み同期 · RAW −50%',
        scaleLabel: 'T_exp = N·T_PWM · 14bit LOSSLESS',
        accent: '#16a34a',
        accentSoft: '#f0fdf4',
        art: (p) => `
          <!-- LEFT PANEL: Authentic High-Frequency LED PWM Phase-Lock Timing & Rolling-Shutter Integration -->
          <rect x="64" y="78" width="332" height="214" rx="9" fill="#ffffff" stroke="#86efac" stroke-width="1.3"/>
          <rect x="64" y="78" width="332" height="21" rx="9" fill="#f0fdf4"/>
          <rect x="64" y="89" width="332" height="10" fill="#f0fdf4"/>
          <text x="230" y="92.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#166534">LED高速PWM点滅周期 vs 電子シャッター露光窓 T_exp 位相同期原理</text>

          <!-- Top Dark Timing Oscilloscope: High-Frequency LED PWM Square Wave -->
          <rect x="74" y="104" width="312" height="66" rx="5" fill="#0f172a" stroke="#334155"/>
          <text x="80" y="115" font-size="6.2" font-weight="900" fill="#fde047">LED PWM光源 (f_PWM = 1003 Hz)</text>
          <path d="M 80 135 ${Array.from({ length: 12 }, (_, k) => `L ${80 + k * 25} 135 L ${80 + k * 25} 120 L ${94 + k * 25} 120 L ${94 + k * 25} 135`).join(' ')} L 380 135" fill="none" stroke="#fde047" stroke-width="1.5"/>
          <!-- Conventional 1/100s non-integer window (red) vs Variable 1/100.3s exact integer window (green)! -->
          <rect x="86" y="140" width="136" height="11" rx="2" fill="#dc2626" fill-opacity="0.6" stroke="#f87171"/>
          <text x="154" y="148" text-anchor="middle" font-size="6.0" font-weight="900" fill="#ffffff">× 1/100s (非整数倍→行毎に光量差!)</text>
          <rect x="80" y="155" width="150" height="11" rx="2" fill="#16a34a" fill-opacity="0.7" stroke="#4ade80"/>
          <text x="155" y="163" text-anchor="middle" font-size="6.0" font-weight="900" fill="#ffffff">○ 1/100.3s = N × T_PWM (全行同一光量!)</text>
          <text x="378" y="163" text-anchor="end" font-size="6.1" font-weight="900" fill="#34d399">μs精度自動同調</text>

          <!-- Side-by-Side Visual Banding Result Comparison -->
          ${cmpBanner(74, 177, 150, '1/100s: 黒縞バンディング', false)}
          ${cmpBanner(234, 177, 152, '1/100.3s: 縞完全消去!', true)}

          <!-- Banded LED Stadium Frame -->
          <rect x="78" y="203" width="142" height="58" rx="4" fill="#cbd5e1" stroke="#64748b"/>
          ${[208, 222, 236, 250].map((by) => `<rect x="78" y="${by}" width="142" height="7" fill="#0f172a" opacity="0.76"/>`).join('')}
          <text x="149" y="274" text-anchor="middle" font-size="6.6" font-weight="800" fill="#b91c1c">数kHz LEDビジョンで明暗縞が発生</text>

          <!-- Uniform Clean LED Stadium Frame -->
          <rect x="238" y="203" width="144" height="58" rx="4" fill="url(#${p}_glass)" stroke="#16a34a" stroke-width="1.5"/>
          <text x="310" y="229" text-anchor="middle" font-size="8.0" font-weight="900" fill="#14532d">完全均一露光!</text>
          <text x="310" y="244" text-anchor="middle" font-size="6.6" font-weight="800" fill="#047857">サイレント電子シャッター無縞</text>
          <text x="310" y="274" text-anchor="middle" font-size="6.6" font-weight="900" fill="#047857">0.1刻み可変シャッター(1/64.2s等)</text>

          <!-- RIGHT TOP PANEL: Bit-Exact 14-bit Lossless RAW (L/M/S) Predictor + Residual Distribution + Golomb-Rice -->
          <rect x="404" y="78" width="294" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="551" y="93" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f172a">完全可逆14bit RAW圧縮（L/M/S）＆ 10bit 4:2:2 HEIF 処理核</text>

          <!-- Mini RGGB Bayer 2x2 Grid -> 2D Causal Predictor -> Laplacian Residual Peak -> Golomb-Rice -->
          <rect x="414" y="106" width="18" height="18" fill="#ef4444"/><text x="423" y="118" text-anchor="middle" font-size="7.0" font-weight="900" fill="#fff">R</text>
          <rect x="432" y="106" width="18" height="18" fill="#22c55e"/><text x="441" y="118" text-anchor="middle" font-size="7.0" font-weight="900" fill="#fff">G</text>
          <rect x="414" y="124" width="18" height="18" fill="#22c55e"/><text x="423" y="136" text-anchor="middle" font-size="7.0" font-weight="900" fill="#fff">G</text>
          <rect x="432" y="124" width="18" height="18" fill="#0ea5e9"/><text x="441" y="136" text-anchor="middle" font-size="7.0" font-weight="900" fill="#fff">B</text>
          <text x="432" y="154" text-anchor="middle" font-size="6.1" font-weight="800" fill="#334155">14bit Bayer</text>

          <line x1="452" y1="124" x2="466" y2="124" stroke="#334155" stroke-width="1.5" marker-end="url(#${p}_arr_dark)"/>
          <!-- 2D Spatial Predictor + Laplacian Residual Histogram -->
          <rect x="468" y="104" width="108" height="58" rx="5" fill="#eff6ff" stroke="#2563eb"/>
          <text x="522" y="115" text-anchor="middle" font-size="6.4" font-weight="900" fill="#1e40af">2D空間予測 e=x−(N+W)/2</text>
          <!-- Sharp Laplacian zero-centered peak -->
          <path d="M 476 156 Q 508 154 522 122 Q 536 154 568 156" fill="#38bdf8" fill-opacity="0.35" stroke="#0284c7" stroke-width="1.8"/>
          <text x="522" y="154" text-anchor="middle" font-size="6.0" font-weight="900" fill="#0369a1">残差0集中分布</text>

          <line x1="576" y1="133" x2="590" y2="133" stroke="#334155" stroke-width="1.5" marker-end="url(#${p}_arr_dark)"/>
          <!-- Adaptive Golomb-Rice Bit-Exact Encoder -->
          <rect x="592" y="104" width="96" height="58" rx="5" fill="#dcfce7" stroke="#16a34a"/>
          <text x="640" y="119" text-anchor="middle" font-size="6.8" font-weight="900" fill="#166534">適応ゴロム・ライス</text>
          <text x="640" y="132" text-anchor="middle" font-size="6.5" font-weight="900" fill="#b45309">完全可逆 (誤差 0)</text>
          <text x="640" y="145" text-anchor="middle" font-size="6.6" font-weight="900" fill="#047857">容量 −45〜50%!</text>
          <text x="640" y="156" text-anchor="middle" font-size="5.9" font-weight="800" fill="#334155">L / M / S 30fps並列</text>

          <!-- Bottom Strip inside Right Top Panel: 10-bit HEIF + 16-Shot Pixel-Shift -->
          <rect x="414" y="170" width="274" height="34" rx="5" fill="#faf5ff" stroke="#7c3aed"/>
          <text x="551" y="184" text-anchor="middle" font-size="7.0" font-weight="900" fill="#5b21b6">10bit 4:2:2 HEIF (10億色・JPEG比1/2容量) ＆ 16枚ピクセルシフト同期</text>
          <text x="551" y="197" text-anchor="middle" font-size="6.3" font-weight="700" fill="#475569">IBIS 0.5px精密シフトと連写タイミングを直結し最大240MP合成を支援</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(404, 219, 143, 73, '高周波フリッカーレス', '0.1刻み同期', '1/100.3s等 LED縞ゼロ', '#16a34a')}
          ${kpiCard(555, 219, 143, 73, '完全可逆RAW圧縮', '−45〜50% 容量', '画質劣化0 · 連写数倍増', '#d97706')}

          ${cleanPin(230, 290, 230, 300, 82, 319, 1, 'LED PWM整数倍位相同期シャッター', '露光時間T_expをLED点滅周期の厳密整数倍へ合わせ電子シャッター縞を根絶', '#16a34a')}
          ${cleanPin(551, 292, 551, 300, 386, 319, 2, '2D空間予測＋ゴロム・ライス完全可逆核', '14bit RAWをビット誤差ゼロで半減圧縮しバッファ詰まりと容量を同時解決', '#d97706')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '数kHz LED光源のPWM周期を解析し0.1刻み(1/100.3s等)で厳密同期する可変シャッター制御核', line2: '14bit Bayer 2D空間予測＋適応ゴロム・ライス完全可逆RAW圧縮＆10bit 4:2:2 HEIF符号化器' },
          { label: '撮影・画質への恩恵', line1: 'LEDビジョン背景のスポーツ・コンサートでもサイレント電子シャッターの黒縞を完全回避', line2: '画質劣化ゼロでRAWサイズを約半分へ圧縮し30fps連写継続枚数の倍増とカード節約を両立' },
          { label: '実機・ソニー仕様', line1: 'Sony α7 V / α1 II / α7R V 搭載 高周波フリッカーレス撮影＋ロスレス圧縮RAW (L/M/S)', line2: '10bit HEIF (4:2:2/4:2:0) ハードウェア出力・4/16枚ピクセルシフトマルチ撮影同期内蔵' },
        ],
      });

    // =========================================================================
    // X2-104. Stanford AFM 2025 / IEDM 2025 [0001] c-Axis (0002) AlN Phonon Thermal Dielectric
    // =========================================================================
    case 'xv2_aln_phonon_thermal_dielectric':
      return renderBionzV2Hd({
        badge: 'X2-104',
        zone: 'bspdn_cool',
        nodeTag: 'Stanford AFM 2025 · IEDM 2025',
        title: 'Stanford AFM 2025「<200°C c軸[0001]配向 柱状AlNフォノン導熱絶縁膜 (92–150 W/m·K)」',
        analogy: '電気は6.2eVの壁で完全遮断しつつ、熱(フォノン)だけは従来SiO₂の100倍の速さで縦に逃がす魔法の柱状結晶膜',
        metric: '92–150 W/m·K (100×)',
        scaleLabel: '20–30nm GRAIN · TBC 300MW/m²K',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        defsExtra: (p) => `
          <clipPath id="${p}_loupe"><circle cx="352" cy="186" r="40"/></clipPath>
        `,
        art: (p) => `
          <!-- LEFT PANEL: TEM Columnar Grain Cross-Section (Amorphous SiO2 Trap vs Type-II [0001] AlN + Wurtzite Loupe) -->
          <rect x="64" y="78" width="342" height="214" rx="9" fill="#ffffff" stroke="#67e8f9" stroke-width="1.3"/>
          <rect x="64" y="78" width="342" height="21" rx="9" fill="#ecfeff"/>
          <rect x="64" y="89" width="342" height="10" fill="#ecfeff"/>
          <text x="235" y="92.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#155e75">3D-IC 層間絶縁膜 TEM断面：非晶質SiO₂熱封込 vs c軸[0001]柱状AlNフォノン高速路</text>

          ${cmpBanner(74, 104, 100, 'SiO₂: 1.4 W/mK', false)}
          ${cmpBanner(180, 104, 128, 'Type-II AlN: ~150!', true)}

          <!-- Left Slice: Amorphous SiO2 Thermal Trap with Bouncing Red Phonon Paths -->
          <rect x="76" y="130" width="96" height="14" fill="url(#${p}_si)"/>
          <rect x="76" y="144" width="96" height="84" fill="#fef2f2" stroke="#dc2626"/>
          <!-- Chaotic bounced phonon zigzag -->
          <polyline points="94,222 108,198 88,186 122,174 102,162 138,182 124,208" fill="none" stroke="#dc2626" stroke-width="1.7"/>
          <polyline points="146,222 136,196 160,180 144,158" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 2"/>
          <text x="124" y="156" text-anchor="middle" font-size="6.4" font-weight="900" fill="#991b1b">非晶質SiO₂ 散乱蓄熱</text>
          <rect x="76" y="228" width="96" height="18" fill="url(#${p}_heat)"/>
          <text x="124" y="240" text-anchor="middle" font-size="6.6" font-weight="900" fill="#ffffff">GAA 過熱ホットスポット</text>

          <!-- Center Slice: Type-II Columnar 20-30nm [0001] AlN Grains + 14nm SiO2 TBC Interface + CVD Diamond Cap -->
          <rect x="182" y="130" width="124" height="14" fill="url(#${p}_glass)" stroke="#0891b2"/>
          <text x="244" y="140" text-anchor="middle" font-size="6.3" font-weight="900" fill="#0e7490">CVDダイヤモンド拡散層</text>
          <rect x="182" y="144" width="124" height="74" fill="#ecfeff" stroke="#0891b2"/>
          <!-- 5 Tall Columnar 20-30nm [0001] AlN Grains + Straight Upward Ballistic Phonon Vectors! -->
          ${[0, 1, 2, 3, 4].map((i) => `
            <rect x="${187 + i * 23.5}" y="146" width="20" height="70" rx="2" fill="url(#${p}_cyan)" opacity="0.88" stroke="#0369a1" stroke-width="0.6"/>
            <line x1="${197 + i * 23.5}" y1="212" x2="${197 + i * 23.5}" y2="152" stroke="#fde047" stroke-width="1.8" marker-end="url(#${p}_arr_gold)"/>
          `).join('')}
          <!-- 14nm amorphous SiO2 interface (TBC 150-300 MW/m^2K) -->
          <rect x="182" y="218" width="124" height="10" fill="#c4b5fd"/>
          <text x="244" y="225.5" text-anchor="middle" font-size="5.8" font-weight="900" fill="#3b0764">14nm SiO₂ (TBC 150–300MW/m²K)</text>
          <rect x="182" y="228" width="124" height="18" fill="url(#${p}_emerald)"/>
          <text x="244" y="240" text-anchor="middle" font-size="6.6" font-weight="900" fill="#ffffff">低温冷却された3D GAA層!</text>

          <text x="190" y="264" text-anchor="middle" font-size="6.9" font-weight="900" fill="#0e7490">E_g = 6.2 eV (完全電気絶縁) × [0001]フォノン縦貫通</text>
          <text x="190" y="276" text-anchor="middle" font-size="6.4" font-weight="700" fill="#475569">酸素不純物 O &lt; 5% · 反応性DCスパッタ &lt;200°C成膜 (BEOL適合)</text>

          <!-- Circular Crystal Loupe: Hexagonal Wurtzite Al-N [0001] c-Axis Crystal Cell -->
          <g clip-path="url(#${p}_loupe)">
            <circle cx="352" cy="186" r="40" fill="#0f172a"/>
            <!-- Hexagonal prism wireframe + vertical [0001] c-axis arrow -->
            <polygon points="352,156 374,166 374,194 352,204 330,194 330,166" fill="#0891b2" fill-opacity="0.25" stroke="#38bdf8" stroke-width="1.3"/>
            <line x1="352" y1="156" x2="352" y2="204" stroke="#fde047" stroke-width="2" marker-end="url(#${p}_arr_gold)"/>
            ${[[352, 156], [374, 166], [330, 166], [352, 180], [374, 194], [330, 194], [352, 204]].map(([ax, ay], idx) => `<circle cx="${ax}" cy="${ay}" r="${idx % 2 === 0 ? 4.2 : 3.2}" fill="${idx % 2 === 0 ? '#38bdf8' : '#fde047'}"/>`).join('')}
            <text x="352" y="218" text-anchor="middle" font-size="6.2" font-weight="900" fill="#fde047">[0001] c軸配向</text>
          </g>
          ${loupeFrame(352, 186, 40, 'ウルツ鉱 AlN結晶', '#0891b2')}

          <!-- RIGHT TOP PANEL: Authentic XRD (0002) Rocking Curve (2θ = 35.95°) & TDTR Type-I vs Type-II Plot -->
          <rect x="414" y="78" width="284" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="556" y="93" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f172a">XRD (0002) 結晶配向ピーク (2θ=35.95°) ＆ TDTR実測熱伝導</text>
          <line x1="448" y1="104" x2="448" y2="188" stroke="#475569" stroke-width="1.1"/>
          <line x1="448" y1="188" x2="684" y2="188" stroke="#475569" stroke-width="1.1"/>
          <!-- Broad weak Type-I peak (O > 5%, κ < 25 W/mK) -->
          <path d="M 454 185 Q 520 184 558 168 Q 596 184 676 185" fill="#fee2e2" fill-opacity="0.55" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4 2"/>
          <text x="454" y="156" font-size="6.3" font-weight="800" fill="#b91c1c">Type-I (O&gt;5%): &lt;25 W/m·K</text>
          <!-- Razor-sharp towering Type-II (0002) peak at 2θ = 35.95°! -->
          <path d="M 454 186 L 544 184 Q 554 178 560 110 Q 566 178 576 184 L 676 186" fill="#06b6d4" fill-opacity="0.28" stroke="#0891b2" stroke-width="2.6"/>
          <circle cx="560" cy="110" r="3.6" fill="#0891b2" stroke="#ffffff" stroke-width="1"/>
          <text x="628" y="118" text-anchor="middle" font-size="6.9" font-weight="900" fill="#0e7490">Type-II AlN (O&lt;5%)</text>
          <text x="628" y="130" text-anchor="middle" font-size="6.8" font-weight="900" fill="#059669">κ_⊥ = 92±20 → 150 W/m·K</text>
          <text x="628" y="142" text-anchor="middle" font-size="6.2" font-weight="700" fill="#475569">ピコ秒TDTR実測 (sub-300nm)</text>
          <text x="560" y="199" text-anchor="middle" font-size="6.5" font-weight="900" fill="#0f172a">2θ = 35.95° — AlN (0002) Braggピーク</text>
          <text x="566" y="209.5" text-anchor="middle" font-size="6.2" font-weight="700" fill="#64748b">結晶粒径 20–30 nm 柱状グレイン · 界面コンダクタンス TBC 150–300 MW/m²K</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(414, 219, 138, 73, '垂直熱伝導率 κ_⊥', '92–150 W/m·K', 'SiO₂(1.4)の約100倍!', '#0891b2')}
          ${kpiCard(560, 219, 138, 73, '界面熱伝導 TBC', '150–300 MW/m²K', '<200°C BEOL低温成膜', '#059669')}

          ${cleanPin(244, 290, 244, 300, 82, 319, 1, '20–30nm 柱状[0001] c軸配向AlN結晶', '低酸素(O<5%)反応性スパッタでフォノンを結晶柱沿いに垂直高速排出', '#0891b2')}
          ${cleanPin(556, 292, 556, 300, 386, 319, 2, '200°C未満BEOL適合＋ダイヤモンド熱橋', '3D積層GAAの層間絶縁膜断熱問題を打破し炎天下8K録画の熱停止を遅延', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '200°C未満の反応性DCスパッタで成膜する20–30nm柱状[0001] c軸配向Type-II AlN熱絶縁膜', line2: '6.2eVワイドギャップで電気を完全絶縁しつつSiO₂比約100倍(92–150 W/m·K)のフォノン導熱を実現' },
          { label: '撮影・画質への恩恵', line1: '3D積層チップ内部の絶縁膜が熱の壁になる宿命を打破しGAA局所ホットスポット温度を激減', line2: '炎天下での4K120p・8K連続収録時におけるサーマルスロットリングと暗電流ノイズ上昇を抑制' },
          { label: '実機・2025学会諸元', line1: 'Stanford Eric Pop研 (Vaziri et al., AFM 2025) ＆ NTU/NYCU IEDM 2025 実証', line2: 'sub-300nm薄膜でκ_⊥ 92±20〜150 W/m·K・XRD (0002) 2θ=35.95°・TBC 150–300 MW/m²K' },
        ],
      });

    // =========================================================================
    // X2-105. ASME JEP 2025/2026 & IEEE ITherm 2025 Hexagonal LPBF Copper Wick + 3-Path SLM 316L Manifold
    // =========================================================================
    case 'xv2_twophase_evaporative_pinfin_jet':
      return renderBionzV2Hd({
        badge: 'X2-105',
        zone: 'bspdn_cool',
        nodeTag: 'ASME JEP 25/26 · ITherm 25',
        title: 'ASME/ITherm「Si直印6花弁六角LPBF銅ウィック ＆ 3経路SLM相分離二相ジェット冷却器」',
        analogy: 'グリス無しでSiへ直印した六角形6花弁ウィックへ液ジェットを噴射し、液と蒸気の経路を完全分離する最強二相冷却',
        metric: 'CHF 1,000 W/cm² · R_th −29%',
        scaleLabel: '0 TIM · 3-PATH · R1233zd(E)',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        art: (p) => `
          <!-- LEFT PANEL: Dual View — Top-Down 6-Petal Hexagonal LPBF Copper Wick Unit Cell + 3-Path SLM 316L Cross-Section -->
          <rect x="64" y="78" width="352" height="214" rx="9" fill="#ffffff" stroke="#93c5fd" stroke-width="1.3"/>
          <rect x="64" y="78" width="352" height="21" rx="9" fill="#eff6ff"/>
          <rect x="64" y="89" width="352" height="10" fill="#eff6ff"/>
          <text x="240" y="92.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#1e3a8a">Si直印六角6花弁LPBF銅ウィック（上面）＆ 3経路SLM 316L相分離断面（右）</text>

          <!-- Left Half: Authentic Top-Down 6-Petal Hexagonal LPBF Copper Wick Unit Cell! -->
          <rect x="72" y="104" width="154" height="150" rx="6" fill="#0f172a" stroke="#3b82f6"/>
          <text x="149" y="116" text-anchor="middle" font-size="6.8" font-weight="900" fill="#93c5fd">六角セル上面 (6花弁＋6放射溝)</text>
          <!-- 6 Triangular Porous Copper Boiling Petals arranged radially around central liquid jet hub! -->
          ${Array.from({ length: 6 }, (_, k) => {
            const a1 = (Math.PI / 3) * k - 0.36;
            const a2 = (Math.PI / 3) * k + 0.36;
            const cx = 149;
            const cy = 180;
            const rIn = 14;
            const rOut = 54;
            const pts = [
              `${(cx + Math.cos(a1) * rIn).toFixed(1)},${(cy + Math.sin(a1) * rIn).toFixed(1)}`,
              `${(cx + Math.cos(a1) * rOut).toFixed(1)},${(cy + Math.sin(a1) * rOut).toFixed(1)}`,
              `${(cx + Math.cos(a2) * rOut).toFixed(1)},${(cy + Math.sin(a2) * rOut).toFixed(1)}`,
              `${(cx + Math.cos(a2) * rIn).toFixed(1)},${(cy + Math.sin(a2) * rIn).toFixed(1)}`,
            ].join(' ');
            // Groove angle + peripheral liquid outlet port
            const ga = (Math.PI / 3) * k + Math.PI / 6;
            const gx1 = cx + Math.cos(ga) * 14;
            const gy1 = cy + Math.sin(ga) * 14;
            const gx2 = cx + Math.cos(ga) * 56;
            const gy2 = cy + Math.sin(ga) * 56;
            return `
              <polygon points="${pts}" fill="url(#${p}_cu)" stroke="#fde68a" stroke-width="0.9"/>
              <line x1="${gx1.toFixed(1)}" y1="${gy1.toFixed(1)}" x2="${gx2.toFixed(1)}" y2="${gy2.toFixed(1)}" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="3 2"/>
              <circle cx="${gx2.toFixed(1)}" cy="${gy2.toFixed(1)}" r="4.4" fill="#94a3b8" stroke="#38bdf8" stroke-width="1"/>
            `;
          }).join('')}
          <!-- Central Liquid Inlet Jet Nozzle Hub -->
          <circle cx="149" cy="180" r="11" fill="#2563eb" stroke="#ffffff" stroke-width="1.4"/>
          <text x="149" y="182.5" text-anchor="middle" font-size="6.2" font-weight="900" fill="#ffffff">JET</text>
          <text x="149" y="247" text-anchor="middle" font-size="6.1" font-weight="800" fill="#fde047">橙:露出沸騰花弁 · 青:被覆給液溝 · 灰:6液排口</text>

          <!-- Right Half: Authentic 3-Path SLM 316L Phase-Separating Cross-Section (ZERO TIM on Si!) -->
          <rect x="232" y="104" width="176" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="320" y="116" text-anchor="middle" font-size="6.8" font-weight="900" fill="#1e3a8a">SLM 316L 3経路・液気相分離断面</text>

          <!-- Path 3: Separate Top Vapor Exhaust Plenum -->
          <rect x="240" y="121" width="160" height="18" rx="3" fill="#fef3c7" stroke="#d97706"/>
          <text x="320" y="132.5" text-anchor="middle" font-size="6.3" font-weight="900" fill="#92400e">経路3: 分離蒸気排気プレナム ↑</text>

          <!-- Path 1 (Center Liquid Jet Nozzle) & Path 2 (Side Saturated Liquid Return + Ligament Covers) -->
          <rect x="307" y="139" width="26" height="32" fill="url(#${p}_blue)"/>
          <text x="320" y="148.5" text-anchor="middle" font-size="5.8" font-weight="900" fill="#fde047">経路1</text>
          <line x1="320" y1="152" x2="320" y2="188" stroke="#ffffff" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>

          <!-- Ligament cover plates & Rising dry vapor bubbles escaping straight up from exposed petals! -->
          <rect x="244" y="160" width="22" height="12" rx="1.5" fill="#64748b"/>
          <rect x="374" y="160" width="22" height="12" rx="1.5" fill="#64748b"/>
          <line x1="255" y1="176" x2="255" y2="144" stroke="#0284c7" stroke-width="1.5" marker-end="url(#${p}_arr_blue)"/>
          <line x1="385" y1="176" x2="385" y2="144" stroke="#0284c7" stroke-width="1.5" marker-end="url(#${p}_arr_blue)"/>
          <!-- Rising Vapor Plumes from Exposed Petals (Path 3!) -->
          ${[286, 354].map((vx) => `
            <circle cx="${vx}" cy="176" r="4.2" fill="#e0f2fe" stroke="#d97706" stroke-width="1"/>
            <circle cx="${vx + 3}" cy="162" r="5" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
            <line x1="${vx}" y1="158" x2="${vx}" y2="140" stroke="#d97706" stroke-width="1.6" marker-end="url(#${p}_arr_gold)"/>
          `).join('')}

          <!-- Direct-on-Si LPBF Porous Copper Wick (ZERO TIM!) -->
          <rect x="240" y="190" width="160" height="22" rx="2" fill="url(#${p}_cu)" stroke="#7c2d12"/>
          <text x="320" y="203.5" text-anchor="middle" font-size="6.4" font-weight="900" fill="#ffffff">LPBF多孔質銅ウィック (Si直接印刷!)</text>
          <rect x="240" y="212" width="160" height="18" rx="2" fill="url(#${p}_heat)"/>
          <text x="320" y="223.5" text-anchor="middle" font-size="6.4" font-weight="900" fill="#ffffff">Si熱源ダイ (TIMゼロ・界面抵抗極小!)</text>
          <text x="320" y="245" text-anchor="middle" font-size="6.2" font-weight="900" fill="#047857">液気衝突を遮断 → 熱抵抗 R_th −23〜29%!</text>

          <text x="240" y="276" text-anchor="middle" font-size="6.9" font-weight="900" fill="#1e40af">誘電冷媒 R1233zd(E) 1U GPU 200時間実証 ＋ 水二相ジェット CHF 1,000 W/cm²</text>

          <!-- RIGHT TOP PANEL: Authentic Nukiyama Boiling Curve (Heat Flux q'' vs Wall Superheat ΔT_sat) -->
          <rect x="424" y="78" width="274" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="561" y="93" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f172a">沸騰熱伝達曲線：壁面過熱度 ΔT_sat vs 熱流束 q″ (W/cm²)</text>
          <line x1="458" y1="104" x2="458" y2="188" stroke="#475569" stroke-width="1.1"/>
          <line x1="458" y1="188" x2="686" y2="188" stroke="#475569" stroke-width="1.1"/>
          ${[
            { y: 112, l: '1000' },
            { y: 138, l: '350' },
            { y: 162, l: '150' },
            { y: 184, l: '50' },
          ].map((g) => `
            <line x1="458" y1="${g.y}" x2="686" y2="${g.y}" stroke="#e2e8f0" stroke-width="0.8"/>
            <text x="454" y="${g.y + 2.5}" text-anchor="end" font-size="6.1" font-weight="800" fill="#64748b">${g.l}</text>
          `).join('')}
          ${['5K', '10K', '20K', '40K'].map((t, i) => `<text x="${486 + i * 56}" y="199" text-anchor="middle" font-size="6.2" font-weight="700" fill="#475569">${t}</text>`).join('')}

          <!-- Single-Phase Cold Plate (linear, steep ΔT penalty!) -->
          <line x1="460" y1="186" x2="674" y2="152" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4 2"/>
          <text x="676" y="164" text-anchor="end" font-size="6.2" font-weight="800" fill="#64748b">単相液冷板</text>

          <!-- Dielectric R1233zd(E) 3-Path Hex Wick -->
          <path d="M 462 186 Q 518 176 558 142" fill="none" stroke="#0ea5e9" stroke-width="2.2"/>
          <circle cx="558" cy="142" r="3.2" fill="#0ea5e9"/>
          <text x="580" y="144" font-size="6.4" font-weight="900" fill="#0284c7">誘電液 R1233zd(E)</text>

          <!-- Two-Phase Water Jet + LPBF Capillary Wick shooting to CHF 1,000 W/cm2 at low ΔT! -->
          <path d="M 462 186 Q 496 168 518 112" fill="none" stroke="#2563eb" stroke-width="2.8"/>
          <circle cx="518" cy="112" r="4.0" fill="#2563eb" stroke="#fde047" stroke-width="1.4"/>
          <text x="526" y="114" font-size="6.9" font-weight="900" fill="#1e40af">水ジェット二相 CHF 1,000!</text>
          <text x="572" y="209.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#059669">潜熱 ΔH_vap により極小ΔTで全面等温化 (HTC 30–400 kW/m²K)</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(424, 219, 133, 73, '限界熱流束 & HTC', '1,000 W/cm²', 'HTC 30–400 kW/m²·K', '#2563eb')}
          ${kpiCard(565, 219, 133, 73, '相分離 熱抵抗削減', '−23〜29% R_th', '0.247°C/W · 0 TIM直印', '#059669')}

          ${cleanPin(149, 290, 149, 300, 82, 319, 1, 'Si直印 六角6花弁LPBF多孔質銅ウィック', 'TIMを介さず6つの露出沸騰花弁と放射給液溝でドライアウトを完全防止', '#ea580c')}
          ${cleanPin(561, 292, 561, 300, 386, 319, 2, '3経路SLM 316Lマニホールド液気相分離', '中央液ジェット・外周液回収・上部蒸気排気を分離し熱抵抗を最大29%低減', '#2563eb')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'TIM無しでSi裏面へLPBF直印した六角6花弁多孔質銅ウィック＋3経路SLM 316L相分離マニホールド', line2: '中央液ジェット・リガメント被覆放射溝・露出花弁からの上部蒸気排気を完全分離し−23〜29%低熱抵抗' },
          { label: '撮影・画質への恩恵', line1: '将来のキロワット級シネマカメラ・3D積層AI演算チップの熱密度限界を潜熱沸騰で突破', line2: 'ダイ全面を極小ΔTで等温化し、隣接イメージセンサーへの熱拡散と暗電流ノイズを極限抑制' },
          { label: '実機・2025/26学会諸元', line1: 'ASME JEP 2025/2026 (R1233zd(E) 1U GPU 200h実証・−23〜29% R_th) ＆ IEEE ITherm 2025', line2: '水ジェット二相 CHF 350–1,000 W/cm²・HTC 30–400 kW/m²·K・熱抵抗 R_th = 0.247 °C/W' },
        ],
      });

    default:
      return null;
  }
}
