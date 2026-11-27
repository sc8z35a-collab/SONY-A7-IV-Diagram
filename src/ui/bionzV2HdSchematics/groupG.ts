import { PartExplanation } from '../../assemblies/types';
import {
  cmpBanner,
  dimArrow,
  escV2,
  kpiCard,
  loupeFrame,
  renderBionzV2Hd,
} from './shared';

/**
 * Clean 2-segment orthogonal/elbow callout badge placed in the bottom annotation band (y=302..346)
 * so leader lines route cleanly around panels and NEVER cross over diagram text.
 */
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
 * Ultra-HD 720x500 Nature/IEEE-Grade Nanoscale Monograph Schematics — BIONZ V2 Group G (X2-86 – X2-95).
 * Every plate embeds authentic TEM/SEM atomic cross-sections, energy-band diagrams, transistor circuits,
 * oscilloscope traces, circular microscope loupe insets, and published quantitative plots.
 */
export function renderBionzV2GroupG(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // =========================================================================
    // X2-86. 2D TMD Semimetal van der Waals Contacts (Sb(01-12) 0.285nm Gap / 42 Ω·μm & Sb-Pt / SnS2 pFET)
    // =========================================================================
    case 'xv2_2d_tmd_sb_bi_vdw_contact':
      return renderBionzV2Hd({
        badge: 'X2-86',
        zone: 'feol',
        nodeTag: 'NSR 2026 · TSMC / IEDM',
        title: '2D半導体 vdW半金属コンタクト「Sb(01-12) 0.285nm極近接 ＆ Sb-Pt MIGS消去接合」',
        analogy: '原子1層の極薄シートを傷つけず0.285nmの量子距離で重ね、電気の関所(MIGS)をゼロにするオーミック橋',
        metric: 'Rc 42 Ω·μm · 1.23 mA/μm',
        scaleLabel: 'vdW GAP 0.285nm · EOT 0.67nm',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        defsExtra: (p) => `
          <radialGradient id="${p}_sb_atom" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fde68a"/><stop offset="55%" stop-color="#d97706"/><stop offset="100%" stop-color="#78350f"/>
          </radialGradient>
          <radialGradient id="${p}_mo_atom" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#67e8f9"/><stop offset="55%" stop-color="#0284c7"/><stop offset="100%" stop-color="#0c4a6e"/>
          </radialGradient>
          <radialGradient id="${p}_s_atom" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fef08a"/><stop offset="65%" stop-color="#eab308"/><stop offset="100%" stop-color="#854d0e"/>
          </radialGradient>
        `,
        art: (p) => `
          <!-- LEFT PANEL: Authentic HAADF-STEM Atomic Ball-and-Stick Lattice Cross-Section -->
          <rect x="64" y="78" width="322" height="214" rx="9" fill="#0f172a" stroke="#0891b2" stroke-width="1.35"/>
          <rect x="64" y="78" width="322" height="22" rx="9" fill="#164e63"/>
          <rect x="64" y="90" width="322" height="10" fill="#164e63"/>
          <text x="225" y="93" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ecfeff">HAADF-STEM 原子分解能断面：Sb(01-12) / 1L MoS₂ 圧縮vdW界面</text>

          <!-- Top 4-layer Rhombohedral Sb(01-12) Semimetal Crystal Bilayers -->
          ${[0, 1, 2].map((row) =>
            Array.from({ length: 10 }, (_, col) => {
              const cx = 84 + col * 24 + (row % 2) * 11;
              const cy = 114 + row * 17;
              return `
                ${col < 9 ? `<line x1="${cx}" y1="${cy}" x2="${cx + 24}" y2="${cy}" stroke="#f59e0b" stroke-width="1.1" opacity="0.55"/>` : ''}
                ${row < 2 ? `<line x1="${cx}" y1="${cy}" x2="${cx + (row % 2 === 0 ? 11 : -11)}" y2="${cy + 17}" stroke="#fbbf24" stroke-width="1.2" opacity="0.65"/>` : ''}
                <circle cx="${cx}" cy="${cy}" r="5.4" fill="url(#${p}_sb_atom)" stroke="#fef3c7" stroke-width="0.6"/>
              `;
            }).join('')
          ).join('')}
          <text x="348" y="124" text-anchor="middle" font-size="7.4" font-weight="900" fill="#fde68a">Sb(01-12)</text>
          <text x="348" y="136" text-anchor="middle" font-size="6.4" font-weight="700" fill="#cbd5e1">融点 &gt;600°C</text>
          <text x="348" y="147" text-anchor="middle" font-size="6.4" font-weight="700" fill="#94a3b8">d=0.315nm</text>

          <!-- Compressed 0.285 nm (2.85 Å) van der Waals Tunneling Plane (Zero Covalent Damage!) -->
          <rect x="74" y="158" width="242" height="19" rx="3" fill="#0891b2" fill-opacity="0.22" stroke="#22d3ee" stroke-width="1" stroke-dasharray="4 2"/>
          ${Array.from({ length: 8 }, (_, k) => `<line x1="${92 + k * 28}" y1="159" x2="${92 + k * 28}" y2="176" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2 2"/>`).join('')}
          <rect x="319" y="159" width="60" height="17" rx="4" fill="#06b6d4"/>
          <text x="349" y="170.5" text-anchor="middle" font-size="7.2" font-weight="900" fill="#0f172a">0.285 nm!</text>

          <!-- Trigonal-Prismatic 1L MoS2 (S - Mo - S atomic sandwich) -->
          ${Array.from({ length: 10 }, (_, col) => {
            const mx = 86 + col * 23;
            const sx = mx + 11.5;
            return `
              <line x1="${mx}" y1="196" x2="${sx}" y2="183" stroke="#38bdf8" stroke-width="1.35"/>
              <line x1="${mx}" y1="196" x2="${sx}" y2="209" stroke="#38bdf8" stroke-width="1.35"/>
              ${col > 0 ? `<line x1="${mx}" y1="196" x2="${mx - 11.5}" y2="183" stroke="#38bdf8" stroke-width="1.35"/><line x1="${mx}" y1="196" x2="${mx - 11.5}" y2="209" stroke="#38bdf8" stroke-width="1.35"/>` : ''}
              <circle cx="${sx}" cy="183" r="4.0" fill="url(#${p}_s_atom)"/>
              <circle cx="${sx}" cy="209" r="4.0" fill="url(#${p}_s_atom)"/>
              <circle cx="${mx}" cy="196" r="5.2" fill="url(#${p}_mo_atom)" stroke="#e0f2fe" stroke-width="0.6"/>
            `;
          }).join('')}
          <text x="350" y="194" text-anchor="middle" font-size="7.4" font-weight="900" fill="#38bdf8">1L MoS₂</text>
          <text x="350" y="206" text-anchor="middle" font-size="6.4" font-weight="700" fill="#fde047">S-Mo-S 無損傷</text>

          <!-- Hybrid Gate Dielectric Stack: 1nm Sb2O3 Seed + 2nm HfO2 (EOT = 0.67 nm, SS = 62.8 mV/dec) -->
          <rect x="74" y="220" width="302" height="14" rx="2" fill="#7c3aed" fill-opacity="0.75" stroke="#c4b5fd" stroke-width="0.8"/>
          <text x="225" y="230" text-anchor="middle" font-size="7.0" font-weight="800" fill="#f5f3ff">1 nm vdW Sb₂O₃ 緩衝層 ＋ 2 nm HfO₂ ゲート絶縁膜（EOT = 0.67 nm）</text>
          <rect x="74" y="237" width="302" height="16" rx="2" fill="url(#${p}_ru)"/>
          <text x="225" y="248" text-anchor="middle" font-size="7.2" font-weight="900" fill="#0f172a">バックゲート電極（SS = 62.8 mV/dec @ V_DD = 0.4 V）</text>

          <!-- Bottom pFET Complement Strip inside Left Panel -->
          <rect x="74" y="258" width="302" height="26" rx="5" fill="#064e3b" stroke="#34d399" stroke-width="1"/>
          <text x="225" y="269" text-anchor="middle" font-size="7.4" font-weight="900" fill="#6ee7b7">相補 pFET (1L WSe₂): SnS₂/WSe₂ vdW電荷移動 ＆ Sb-Pt合金コンタクト</text>
          <text x="225" y="280.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#d1fae5">Rc = 41 Ω·μm · I_on = 2.30 mA/μm (20nm長) · 正孔密度 p_2D = 1.49×10¹⁴ cm⁻²</text>

          <!-- RIGHT TOP PANEL: Authentic Quantum Energy-Band & DOS(E) Comparison (MIGS Pinning vs Semimetal) -->
          <rect x="394" y="78" width="304" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="546" y="93" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">金属−2D界面 エネルギーバンド図 ＆ 状態密度 DOS(E)</text>

          <!-- Sub-box A: Conventional 3D Metal (Huge DOS -> MIGS Pinning -> High Φ_SB) -->
          ${cmpBanner(402, 99, 138, '従来金属: MIGSピニング', false)}
          <rect x="404" y="124" width="48" height="76" fill="#e2e8f0" stroke="#64748b" stroke-width="0.9"/>
          <!-- Filled metal DOS -->
          <path d="M 404 156 L 444 156 L 444 200 L 404 200 Z" fill="#94a3b8" opacity="0.6"/>
          <line x1="404" y1="156" x2="538" y2="156" stroke="#dc2626" stroke-width="1.1" stroke-dasharray="3 2"/>
          <text x="428" y="152" text-anchor="middle" font-size="6.8" font-weight="900" fill="#0f172a">E_F (高DOS)</text>
          <!-- MIGS gap states leaking into MoS2 -->
          <path d="M 452 140 Q 472 158 452 178" fill="#ef4444" fill-opacity="0.45" stroke="#dc2626" stroke-width="1"/>
          <text x="478" y="164" font-size="6.4" font-weight="900" fill="#b91c1c">MIGS</text>
          <!-- Bent conduction & valence bands showing large Schottky barrier Φ_SB -->
          <path d="M 452 130 Q 486 138 536 144" fill="none" stroke="#0284c7" stroke-width="2"/>
          <path d="M 452 178 Q 486 186 536 192" fill="none" stroke="#0284c7" stroke-width="2"/>
          <text x="526" y="138" text-anchor="end" font-size="6.8" font-weight="800" fill="#0369a1">E_c</text>
          <text x="526" y="197" text-anchor="end" font-size="6.8" font-weight="800" fill="#0369a1">E_v</text>
          <line x1="459" y1="132" x2="459" y2="156" stroke="#dc2626" stroke-width="1.5"/>
          <text x="498" y="149" text-anchor="middle" font-size="6.8" font-weight="900" fill="#dc2626">Φ_SB 大 (高Rc)</text>

          <!-- Sub-box B: Semimetal Sb(01-12) (Dirac pinch DOS≈0 -> MIGS vanishes -> Ohmic!) -->
          ${cmpBanner(550, 99, 140, 'Sb半金属: Φ_SB≈0 導通!', true)}
          <rect x="552" y="124" width="46" height="76" fill="#fefce8" stroke="#d97706" stroke-width="0.9"/>
          <!-- Dirac-cone semimetal DOS pinch right at E_F! -->
          <polygon points="552,124 584,124 596,154 552,154" fill="#fde047" opacity="0.55"/>
          <polygon points="552,154 596,154 584,200 552,200" fill="#f59e0b" opacity="0.65"/>
          <path d="M 584 124 L 596 154 L 584 200" fill="none" stroke="#b45309" stroke-width="1.3"/>
          <text x="574" y="148" text-anchor="middle" font-size="6.4" font-weight="900" fill="#78350f">DOS→0</text>
          <!-- Clean vdW gap & flat E_c aligned to E_F (Ohmic electron injection!) -->
          <rect x="598" y="124" width="8" height="76" fill="#e0f2fe" stroke="#06b6d4" stroke-dasharray="2 1" stroke-width="0.8"/>
          <line x1="552" y1="154" x2="688" y2="154" stroke="#059669" stroke-width="1.2" stroke-dasharray="3 2"/>
          <path d="M 606 152 L 688 152" fill="none" stroke="#059669" stroke-width="2.2"/>
          <path d="M 606 192 L 688 192" fill="none" stroke="#059669" stroke-width="2"/>
          <line x1="590" y1="146" x2="660" y2="146" stroke="#0284c7" stroke-width="1.8" marker-end="url(#${p}_arr_blue)"/>
          <text x="648" y="141" text-anchor="middle" font-size="6.8" font-weight="900" fill="#047857">e⁻ 無障壁注入!</text>
          <text x="684" y="164" text-anchor="end" font-size="6.8" font-weight="800" fill="#065f46">E_c≈E_F</text>
          <text x="648" y="182" text-anchor="middle" font-size="6.6" font-weight="800" fill="#0369a1">n_2D=3×10¹³cm⁻²</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(394, 219, 148, 73, '世界最小級 接触抵抗 Rc', '42 / 41 Ω·μm', 'n-MoS₂ / p-WSe₂ 量子限界肉薄', '#0891b2')}
          ${kpiCard(550, 219, 148, 73, '駆動電流 I_on & 耐熱', '1.23–2.3 mA/μm', 'Sb融点 >600°C (BEOL互換)', '#059669')}

          <!-- CLEAN UNOBSTRUCTED BOTTOM PINS (ZERO LINE CROSSINGS OVER TEXT!) -->
          ${cleanPin(154, 290, 154, 300, 82, 319, 1, '0.285 nm 超近接ファンデルワールス界面', 'MoS₂層間(0.615nm)より短く、共有結合損傷ゼロで波動関数が直接重畳', '#0891b2')}
          ${cleanPin(472, 292, 472, 300, 380, 319, 2, 'n/p相補 2D-CFET ＋ 極薄EOT 0.67nm', 'Sb(01-12)とSnS₂/Sb-Ptで両極オーミック化、A5以降ポストSi CMOSへ', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'フェルミ面の状態密度が極小の半金属Sb(01-12)を1L MoS₂上へ0.285nm間隔で非破壊接合', line2: '金属誘起ギャップ準位(MIGS)を根本消滅させ、ショットキー障壁Φ_SB≈0のオーミック注入を実現' },
          { label: '撮影・画質への恩恵', line1: 'A5〜A2世代2D-CFETの寄生抵抗を42Ω·μmへ極小化し1.23–2.30mA/μmの高駆動電流を解放', line2: 'EOT 0.67nm(SS 62.8mV/dec)の0.4V超低電圧動作で8K動画やAI推論の電力を劇的削減' },
          { label: '実機・2025/26学会諸元', line1: 'National Science Review 2026年3月 / TSMC IEDM実証（vdW距離 0.285nm・Rc 42/41 Ω·μm）', line2: 'n_2D = 3×10¹³ / p_2D = 1.49×10¹⁴ cm⁻²・1nm Sb₂O₃+2nm HfO₂・Sb高融点 >600°C' },
        ],
      });

    // =========================================================================
    // X2-87. MW-ALD Amorphous Ternary High-k Hf0.44Al0.56O Gate / MIM Stack
    // =========================================================================
    case 'xv2_mwald_hfalo_gate_dielectric':
      return renderBionzV2Hd({
        badge: 'X2-87',
        zone: 'feol',
        nodeTag: 'AVS / IEDM 2025 · MW-ALD',
        title: '2.45 GHz マイクロ波支援ALD「完全無粒界アモルファス高誘電合金 Hf₀.₄₄Al₀.₅₆O 絶縁膜」',
        analogy: 'マイクロ波プラズマで原子膜の隙間を締め上げ、結晶のひび割れリークを完全に塞ぐ8 MV/cm耐圧バリア',
        metric: '8 MV/cm · 10 nA/cm²',
        scaleLabel: 'κ +68% vs Al₂O₃ · 2.45 GHz ECR',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        defsExtra: (p) => `
          <clipPath id="${p}_loupe"><circle cx="334" cy="193" r="41"/></clipPath>
        `,
        art: (p) => `
          <!-- LEFT PANEL: High-Aspect Trench TEM Cutaway (Crystalline HfO2 Leakage vs MW-ALD Amorphous HfAlO) -->
          <rect x="64" y="78" width="328" height="214" rx="9" fill="#ffffff" stroke="#c4b5fd" stroke-width="1.3"/>
          <rect x="64" y="78" width="328" height="21" rx="9" fill="#f5f3ff"/>
          <rect x="64" y="89" width="328" height="10" fill="#f5f3ff"/>
          <text x="228" y="92.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#5b21b6">高温アニール後 TEM構造比較：多結晶HfO₂粒界リーク vs MW-ALD Hf₀.₄₄Al₀.₅₆O</text>

          <!-- Left Trench: Crystallized HfO2 with grain boundaries & V_O percolation leakage -->
          ${cmpBanner(74, 104, 118, '純HfO₂: 結晶粒界リーク', false)}
          <rect x="76" y="130" width="114" height="14" fill="url(#${p}_ru)"/>
          <text x="133" y="140" text-anchor="middle" font-size="6.6" font-weight="900" fill="#0f172a">TiN 上部ゲート電極</text>
          <!-- Polygonal crystalline grains -->
          <rect x="76" y="144" width="114" height="72" fill="#ede9fe" stroke="#7c3aed" stroke-width="1"/>
          <polygon points="76,144 114,144 106,182 76,176" fill="#ddd6fe" stroke="#8b5cf6" stroke-width="0.8"/>
          <polygon points="114,144 156,144 162,188 106,182" fill="#c4b5fd" stroke="#8b5cf6" stroke-width="0.8"/>
          <polygon points="156,144 190,144 190,180 162,188" fill="#ddd6fe" stroke="#8b5cf6" stroke-width="0.8"/>
          <polygon points="76,176 106,182 118,216 76,216" fill="#c4b5fd" stroke="#8b5cf6" stroke-width="0.8"/>
          <polygon points="106,182 162,188 152,216 118,216" fill="#ede9fe" stroke="#8b5cf6" stroke-width="0.8"/>
          <!-- Red V_O grain-boundary hopping leakage arrows -->
          <polyline points="114,144 106,182 118,216" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="3 2" marker-end="url(#${p}_arr_red)"/>
          <polyline points="156,144 162,188 152,216" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="3 2" marker-end="url(#${p}_arr_red)"/>
          ${[[111, 158], [108, 178], [113, 198], [159, 166], [158, 196]].map(([vx, vy]) => `<circle cx="${vx}" cy="${vy}" r="2.6" fill="#fef08a" stroke="#dc2626" stroke-width="1"/>`).join('')}
          <rect x="76" y="216" width="114" height="14" fill="url(#${p}_si)"/>
          <text x="133" y="226" text-anchor="middle" font-size="6.6" font-weight="800" fill="#e2e8f0">Siチャネル / 下部電極</text>
          <text x="133" y="244" text-anchor="middle" font-size="6.9" font-weight="900" fill="#b91c1c">酸素欠損 V_O 沿いTAT漏れ</text>
          <text x="133" y="255" text-anchor="middle" font-size="6.6" font-weight="700" fill="#7f1d1d">450°Cで多結晶化→早期破壊</text>

          <!-- Center Trench: 2.45GHz MW-ALD Conformal Super-Cycle Amorphous Hf0.44Al0.56O -->
          ${cmpBanner(200, 104, 182, 'MW-ALD Hf₀.₄₄Al₀.₅₆O: 完全無粒界!', true)}
          <!-- 2.45 GHz ECR Microwave Plasma Shower -->
          <path d="M 206 130 Q 214 124 222 130 T 238 130 T 254 130 T 270 130" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
          <text x="238" y="139" text-anchor="middle" font-size="6.4" font-weight="900" fill="#b45309">2.45GHz O₂*ラジカル</text>
          <!-- Smooth Conformal 5-Layer Super-Cycle Trench Cutaway -->
          <rect x="202" y="144" width="76" height="72" rx="3" fill="url(#${p}_hfo2)"/>
          ${[156, 168, 180, 192, 204].map((ly) => `<line x1="204" y1="${ly}" x2="276" y2="${ly}" stroke="#ede9fe" stroke-width="0.9" stroke-dasharray="4 2" opacity="0.65"/>`).join('')}
          <text x="240" y="176" text-anchor="middle" font-size="7.4" font-weight="900" fill="#ffffff">Hf₀.₄₄Al₀.₅₆O</text>
          <text x="240" y="189" text-anchor="middle" font-size="6.3" font-weight="700" fill="#fde047">アモルファス緻密</text>
          <text x="240" y="201" text-anchor="middle" font-size="6.3" font-weight="700" fill="#e0f2fe">粒界 0 · V_O消去</text>
          <rect x="202" y="216" width="76" height="14" fill="url(#${p}_si)"/>

          <!-- Circular TEM Magnified Loupe Inset: Amorphous Hf-O-Al Random Tetrahedral Network -->
          <g clip-path="url(#${p}_loupe)">
            <circle cx="334" cy="193" r="41" fill="#1e1b4b"/>
            ${[
              [316, 177, 333, 186], [333, 186, 352, 175], [333, 186, 329, 206], [329, 206, 351, 211],
              [316, 177, 309, 198], [309, 198, 329, 206], [352, 175, 359, 197], [359, 197, 351, 211],
            ].map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#a78bfa" stroke-width="1.3"/>`).join('')}
            ${[[316, 177, '#7c3aed', 'Hf'], [352, 175, '#7c3aed', 'Hf'], [329, 206, '#7c3aed', 'Hf'], [333, 186, '#06b6d4', 'Al'], [309, 198, '#06b6d4', 'Al'], [359, 197, '#06b6d4', 'Al'], [351, 211, '#ef4444', 'O']].map(([ax, ay, col, sym]) => `
              <circle cx="${ax}" cy="${ay}" r="5.6" fill="${col}" stroke="#ffffff" stroke-width="0.9"/>
              <text x="${ax}" y="${(ay as number) + 2.1}" text-anchor="middle" font-size="5.3" font-weight="900" fill="#ffffff">${sym}</text>
            `).join('')}
            <text x="334" y="226" text-anchor="middle" font-size="5.8" font-weight="800" fill="#fde047">無秩序網目(無結晶)</text>
          </g>
          ${loupeFrame(334, 193, 41, 'アモルファス原子網', '#7c3aed')}

          <!-- Bottom Super-Cycle Timing Waveform Bar inside Left Panel -->
          <rect x="74" y="264" width="308" height="22" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="80" y="278" font-size="6.6" font-weight="900" fill="#4c1d95">ALD周期:</text>
          <path d="M 122 281 L 128 281 L 128 269 L 152 269 L 152 281 L 166 281 L 166 269 L 194 269 L 194 281 L 208 281 L 208 269 L 234 269 L 234 281 L 248 281 L 248 269 L 278 269 L 278 281 L 372 281" fill="none" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="140" y="278" text-anchor="middle" font-size="6.0" font-weight="900" fill="#5b21b6">Hf</text>
          <text x="180" y="278" text-anchor="middle" font-size="6.0" font-weight="900" fill="#d97706">MW O₂*</text>
          <text x="221" y="278" text-anchor="middle" font-size="6.0" font-weight="900" fill="#0284c7">Al</text>
          <text x="263" y="278" text-anchor="middle" font-size="6.0" font-weight="900" fill="#d97706">MW O₂*</text>
          <text x="328" y="278" text-anchor="middle" font-size="6.2" font-weight="800" fill="#059669">C/V_O極限除去</text>

          <!-- RIGHT TOP PANEL: Authentic Log-Scale J-E Leakage & Dielectric Breakdown Plot -->
          <rect x="400" y="78" width="298" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="549" y="93" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">電界強度 E vs リーク電流密度 J（実測対数プロット）</text>
          <!-- Plot axes & gridlines -->
          <line x1="436" y1="104" x2="436" y2="192" stroke="#475569" stroke-width="1.1"/>
          <line x1="436" y1="192" x2="684" y2="192" stroke="#475569" stroke-width="1.1"/>
          ${[118, 142, 166, 190].map((gy, idx) => `
            <line x1="436" y1="${gy}" x2="684" y2="${gy}" stroke="#e2e8f0" stroke-width="0.8"/>
            <text x="432" y="${gy + 2.5}" text-anchor="end" font-size="6.3" font-weight="700" fill="#64748b">${['10⁻²', '10⁻⁴', '10⁻⁶', '10⁻⁸'][idx]}</text>
          `).join('')}
          ${[0, 2, 4, 6, 8, 10].map((ev, i) => `
            <line x1="${436 + i * 48}" y1="104" x2="${436 + i * 48}" y2="192" stroke="#f1f5f9" stroke-width="0.8"/>
            <text x="${436 + i * 48}" y="203" text-anchor="middle" font-size="6.5" font-weight="700" fill="#475569">${ev}</text>
          `).join('')}
          <text x="560" y="210.5" text-anchor="middle" font-size="6.6" font-weight="800" fill="#334155">印加電界 E (MV/cm)</text>

          <!-- Curve 1: Pure crystallized HfO2 breaks down around 4.5 MV/cm -->
          <path d="M 438 176 Q 486 168 522 146 L 544 108" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 2"/>
          <circle cx="544" cy="108" r="3" fill="#dc2626"/>
          <text x="536" y="119" text-anchor="end" font-size="6.6" font-weight="900" fill="#b91c1c">純HfO₂ (早期破壊)</text>

          <!-- Curve 2: MW-ALD Hf0.44Al0.56O holds 10 nA/cm2 @ 3 MV/cm up to 8 MV/cm! -->
          <path d="M 438 189 L 508 186 Q 574 182 612 162 L 628 110" fill="none" stroke="#7c3aed" stroke-width="2.6"/>
          <circle cx="508" cy="186" r="3.6" fill="#059669" stroke="#ffffff" stroke-width="1"/>
          <text x="514" y="175" font-size="6.5" font-weight="900" fill="#047857">10 nA/cm² @3MV/cm</text>
          <circle cx="628" cy="110" r="3.8" fill="#7c3aed" stroke="#ffffff" stroke-width="1"/>
          <line x1="628" y1="110" x2="628" y2="192" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3 2"/>
          <text x="692" y="124" text-anchor="end" font-size="6.6" font-weight="900" fill="#5b21b6">E_BD = 8 MV/cm</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(400, 219, 145, 73, '比誘電率 κ 向上', '+68% vs Al₂O₃', '高密度MIM & 薄EOT両立', '#7c3aed')}
          ${kpiCard(553, 219, 145, 73, 'リーク電流密度 J', '10 nA/cm²', '@ 3 MV/cm · E_BD 8 MV/cm', '#059669')}

          ${cleanPin(240, 290, 240, 300, 82, 319, 1, 'Hf₀.₄₄Al₀.₅₆O アモルファス相安定化', 'Al混晶で結晶化温度を上昇させ高温アニール後も粒界リーク経路を絶無化', '#7c3aed')}
          ${cleanPin(548, 292, 548, 300, 386, 319, 2, '2.45GHz ECRプラズマ MW-ALD緻密化', '低温高密度O₂*ラジカルで酸素欠損V_Oと残留炭素を修復しTDDB寿命延伸', '#d97706')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '2.45 GHzマイクロ波プラズマ支援ALDでHfO₂/Al₂O₃を原子層混晶化したHf₀.₄₄Al₀.₅₆O', line2: '高温アニール後も完全アモルファス網目を維持し、多結晶粒界沿いのTATリーク経路を遮断' },
          { label: '撮影・画質への恩恵', line1: '高κ(+68%)と極低リーク(10 nA/cm²)を両立し、待機電力と高温撮影時の暗電流熱源を削減', line2: '8 MV/cmの高耐圧によりBIONZ XR2の高密度オンチップMIM容量と長期TDDB信頼性を確保' },
          { label: '実機・2025学会諸元', line1: 'AVS 2025 / IEDM 2025 実証（Al₂O₃比 +68%高κ・絶縁破壊電界 E_BD = 8 MV/cm）', line2: '3 MV/cm印加時 J_leak = 10 nA/cm²・2.45 GHz ECR酸素ラジカル低温緻密化プロセス' },
        ],
      });

    // =========================================================================
    // X2-88. IEEE CICC 2025 Beat-Frequency Odometer Aging & Single-Trap RTN Monitor
    // =========================================================================
    case 'xv2_odometer_fmax_aging_rtn_sensor':
      return renderBionzV2Hd({
        badge: 'X2-88',
        zone: 'feol',
        nodeTag: 'IEEE CICC 2025 · UMN RARE',
        title: 'IEEE CICC 2025「ビート周波数オドメータ劣化計 ＆ 8bit DCO / RTN・HCIリアルタイム診断」',
        analogy: '新品リング発振器と酷使リング発振器の「うなり」を1万分の1精度で数え、チップの老化を走行距離計のように監視',
        metric: '42マクロ · Δf <0.01%',
        scaleLabel: '0.3–1.6 GHz DCO · INV/NAND/NOR',
        accent: '#e11d48',
        accentSoft: '#fff1f2',
        art: (p) => `
          <!-- LEFT PANEL: Authentic Gate-Level Synthesizable Beat-Frequency Odometer Circuit + Beat Waveform -->
          <rect x="64" y="78" width="356" height="214" rx="9" fill="#ffffff" stroke="#fda4af" stroke-width="1.3"/>
          <rect x="64" y="78" width="356" height="21" rx="9" fill="#fff1f2"/>
          <rect x="64" y="89" width="356" height="10" fill="#fff1f2"/>
          <text x="242" y="92.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#9f1239">標準セル合成オドメータ回路：基準RO vs ストレスRO 位相比較 ＆ ビート波形</text>

          <!-- Top Ring: Unstressed Reference RO (INV/NAND/NOR Logic Gate Symbols!) -->
          <rect x="74" y="105" width="164" height="44" rx="6" fill="#ecfeff" stroke="#0891b2" stroke-width="1.1"/>
          <text x="80" y="116" font-size="6.8" font-weight="900" fill="#0e7490">非ストレス基準 RO (f_REF · 通常OFF)</text>
          ${[0, 1, 2, 3, 4].map((i) => {
            const gx = 84 + i * 28;
            return `
              <polygon points="${gx},122 ${gx + 14},129 ${gx},136" fill="#ffffff" stroke="#0284c7" stroke-width="1.2"/>
              <circle cx="${gx + 16.5}" cy="129" r="2.2" fill="#ffffff" stroke="#0284c7" stroke-width="1.1"/>
              ${i < 4 ? `<line x1="${gx + 19}" y1="129" x2="${gx + 28}" y2="129" stroke="#0284c7" stroke-width="1.2"/>` : ''}
            `;
          }).join('')}
          <polyline points="215,129 224,129 224,143 79,143 79,129 84,129" fill="none" stroke="#0284c7" stroke-width="1.1"/>

          <!-- Bottom Ring: Stressed Aged RO (Switchable INV / NAND / NOR separating BTI/HCI/RTN) -->
          <rect x="74" y="154" width="164" height="44" rx="6" fill="#fff1f2" stroke="#e11d48" stroke-width="1.1"/>
          <text x="80" y="165" font-size="6.8" font-weight="900" fill="#be123c">ストレス負荷 RO (f_AGED · INV/NAND/NOR)</text>
          ${[0, 1, 2, 3, 4].map((i) => {
            const gx = 84 + i * 28;
            return `
              <polygon points="${gx},171 ${gx + 14},178 ${gx},185" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.2"/>
              <circle cx="${gx + 16.5}" cy="178" r="2.2" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.1"/>
              ${i < 4 ? `<line x1="${gx + 19}" y1="178" x2="${gx + 28}" y2="178" stroke="#e11d48" stroke-width="1.2"/>` : ''}
            `;
          }).join('')}
          <polyline points="215,178 224,178 224,192 79,192 79,178 84,178" fill="none" stroke="#e11d48" stroke-width="1.1"/>

          <!-- Phase Detector D-FF (Samples f_REF with f_AGED clock -> extracts beat frequency Δf!) -->
          <line x1="238" y1="129" x2="262" y2="142" stroke="#0891b2" stroke-width="1.6" marker-end="url(#${p}_arr_blue)"/>
          <line x1="238" y1="178" x2="262" y2="164" stroke="#e11d48" stroke-width="1.6" marker-end="url(#${p}_arr_red)"/>
          <rect x="266" y="126" width="56" height="52" rx="6" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.1"/>
          <text x="274" y="143" font-size="7.2" font-weight="900" fill="#0f172a">D</text>
          <polygon points="266,161 273,165 266,169" fill="#0f172a"/>
          <text x="296" y="148" text-anchor="middle" font-size="7.4" font-weight="900" fill="#0f172a">PFD</text>
          <text x="296" y="160" text-anchor="middle" font-size="6.8" font-weight="800" fill="#78350f">D-FF</text>
          <text x="296" y="172" text-anchor="middle" font-size="6.4" font-weight="900" fill="#0f172a">Δf抽出</text>

          <!-- Digital Beat Counter & Shift-Scan Out -->
          <line x1="322" y1="152" x2="340" y2="152" stroke="#334155" stroke-width="1.6" marker-end="url(#${p}_arr_dark)"/>
          <rect x="344" y="126" width="66" height="52" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.1"/>
          <text x="377" y="142" text-anchor="middle" font-size="7.0" font-weight="900" fill="#38bdf8">ビート計数</text>
          <text x="377" y="155" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fde047">N_beat</text>
          <text x="377" y="169" text-anchor="middle" font-size="6.4" font-weight="700" fill="#cbd5e1">Δf/f=1/N</text>

          <!-- Real Beat-Frequency Oscilloscope Trace Window (Dark CRT) -->
          <rect x="74" y="205" width="336" height="78" rx="6" fill="#0f172a" stroke="#334155"/>
          <text x="82" y="216" font-size="6.6" font-weight="800" fill="#38bdf8">f_REF</text>
          <text x="82" y="236" font-size="6.6" font-weight="800" fill="#fb7185">f_AGED</text>
          <text x="82" y="264" font-size="6.6" font-weight="900" fill="#fde047">BEAT</text>
          <!-- Fast Ref square wave -->
          <path d="M 114 218 ${Array.from({ length: 14 }, (_, k) => `L ${114 + k * 20} 210 L ${124 + k * 20} 210 L ${124 + k * 20} 218 L ${134 + k * 20} 218`).join(' ')}" fill="none" stroke="#38bdf8" stroke-width="1.2"/>
          <!-- Slightly slower Aged square wave (phase visibly slipping!) -->
          <path d="M 114 238 ${Array.from({ length: 13 }, (_, k) => `L ${114 + k * 21.8} 230 L ${125 + k * 21.8} 230 L ${125 + k * 21.8} 238 L ${135.8 + k * 21.8} 238`).join(' ')}" fill="none" stroke="#fb7185" stroke-width="1.2"/>
          <!-- Extracted Beat Envelope Output -->
          <path d="M 114 268 L 114 252 L 246 252 L 246 268 L 382 268 L 382 252 L 402 252" fill="none" stroke="#fde047" stroke-width="2.0"/>
          <text x="180" y="263" text-anchor="middle" font-size="6.8" font-weight="900" fill="#fde047">← T_beat = 1 / (f_REF − f_AGED) →</text>
          <text x="314" y="279" text-anchor="middle" font-size="6.3" font-weight="700" fill="#94a3b8">PVT温度/電圧ドリフト共通モード相殺</text>

          <!-- RIGHT TOP PANEL: Log-Log Power-Law Aging Plot (Δf = A·t^n) + Single-Trap RTN Step Inset -->
          <rect x="428" y="78" width="270" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="563" y="93" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">ストレス時間 vs Δf/f₀ べき乗則 (Δf = A·tⁿ) ＆ RTN跳躍</text>
          <line x1="460" y1="104" x2="460" y2="192" stroke="#475569" stroke-width="1.1"/>
          <line x1="460" y1="192" x2="686" y2="192" stroke="#475569" stroke-width="1.1"/>
          ${[116, 141, 166, 191].map((gy, i) => `
            <line x1="460" y1="${gy}" x2="686" y2="${gy}" stroke="#e2e8f0" stroke-width="0.8"/>
            <text x="456" y="${gy + 2.5}" text-anchor="end" font-size="6.2" font-weight="700" fill="#64748b">${['10%', '1%', '0.1%', '0.01%'][i]}</text>
          `).join('')}
          ${['10¹s', '10³s', '10⁵s', '10⁷s (10yr)'].map((t, i) => `<text x="${474 + i * 64}" y="203" text-anchor="middle" font-size="6.3" font-weight="700" fill="#475569">${t}</text>`).join('')}
          <!-- 25°C Log-Log Power Law Line -->
          <line x1="468" y1="184" x2="678" y2="146" stroke="#0284c7" stroke-width="2.1"/>
          <text x="676" y="168" text-anchor="end" font-size="6.8" font-weight="800" fill="#0284c7">25°C (n≈0.18)</text>
          <!-- 100°C Accelerated Aging Line + discrete RTN telegraphic trap jumps -->
          <polyline points="468,170 520,154 522,149 560,140 562,145 612,131 678,116" fill="none" stroke="#e11d48" stroke-width="2.3"/>
          <circle cx="522" cy="149" r="3" fill="#f59e0b" stroke="#e11d48"/>
          <text x="518" y="130" text-anchor="middle" font-size="6.4" font-weight="900" fill="#b45309">単一トラップRTN跳躍</text>
          <text x="676" y="112" text-anchor="end" font-size="6.8" font-weight="900" fill="#be123c">100°C 加速劣化</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(428, 219, 131, 73, 'CICC 2025 実証', '42基 · 3ドメイン', '8bit DCO 0.3–1.6 GHz', '#e11d48')}
          ${kpiCard(567, 219, 131, 73, '周波数シフト分解能', '< 0.01%', '過剰電圧マージン削減', '#0284c7')}

          ${cleanPin(294, 290, 294, 300, 82, 319, 1, 'ビート周波数差動カウント (Δf = f₁−f₂)', 'INV/NAND/NOR切替でBTI・HCI・TDDB・単一トラップRTNを分離診断', '#e11d48')}
          ${cleanPin(563, 292, 563, 300, 386, 319, 2, 'RARE 3ドメイン適応ガードバンド制御', 'ロックステップCPU＋ノイズ注入器と連動し10年運用の最適DVFSを実現', '#0284c7')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '無劣化の基準ROと負荷ROの周波数差(ビート)をPFDとカウンタで計数する合成可能オドメータ', line2: 'INV/NAND/NOR切替によりNBTI・PBTI・HCI・単一トラップRTNのFmax劣化寄与を分離測定' },
          { label: '撮影・画質への恩恵', line1: '新品時の過剰な安全マージン電圧を削減し8K長時間録画や30fps連写時の消費電力を低減', line2: 'プロ機10年運用に伴う経年劣化を常時監視し、実寿命に応じた最適DVFSで信頼性を確保' },
          { label: '実機・2025学会諸元', line1: 'IEEE CICC 2025 (Chris Kim / UMN RAREチップ)・42基メモリマップド構成・3電源ドメイン', line2: '8bit DCO (300 MHz–1.6 GHz @ 0.9V)・Δf分解能 <0.01%・対数べき乗則Δf=A·tⁿ追跡' },
        ],
      });

    // =========================================================================
    // X2-89. Stanford Science 2025 Ultrathin 1.5nm NbP Weyl Topological Semimetal Interconnect
    // =========================================================================
    case 'xv2_nbp_topological_semimetal_line':
      return renderBionzV2Hd({
        badge: 'X2-89',
        zone: 'beol',
        nodeTag: 'Stanford · Science Jan 2025',
        title: 'Stanford Science 2025「極薄1.5nm NbP ワイル半金属・フェルミアーク表面伝導配線」',
        analogy: '細いほど渋滞する銅配線とは真逆に、薄くするほど表面の量子高速レーンが効いて抵抗が1/6へ激減する革新的配線',
        metric: '34 μΩ·cm @ 1.5 nm',
        scaleLabel: '−66% vs Cu (<5nm) · 400°C BEOL',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        art: (p) => `
          <!-- LEFT PANEL: Authentic Published Log-Log Resistivity ρ(t) vs Film Thickness (1–100 nm) -->
          <rect x="64" y="78" width="332" height="214" rx="9" fill="#ffffff" stroke="#7dd3fc" stroke-width="1.3"/>
          <rect x="64" y="78" width="332" height="21" rx="9" fill="#e0f2fe"/>
          <rect x="64" y="89" width="332" height="10" fill="#e0f2fe"/>
          <text x="230" y="92.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#0369a1">Science 2025 実測：膜厚 t vs 室温抵抗率 ρ（5nm以下でCuと逆転!）</text>

          <!-- Quantum Surface-Dominated Shaded Crossover Zone (<5 nm) -->
          <rect x="102" y="106" width="114" height="154" fill="#e0f2fe" fill-opacity="0.55"/>
          <text x="159" y="117" text-anchor="middle" font-size="6.8" font-weight="900" fill="#0369a1">表面伝導支配域 (&lt;5nm)</text>

          <!-- Axes & Log Gridlines -->
          <line x1="102" y1="106" x2="102" y2="260" stroke="#475569" stroke-width="1.2"/>
          <line x1="102" y1="260" x2="384" y2="260" stroke="#475569" stroke-width="1.2"/>
          ${[
            { y: 120, lbl: '300' },
            { y: 162, lbl: '100' },
            { y: 208, lbl: '34' },
            { y: 244, lbl: '10' },
          ].map((g) => `
            <line x1="102" y1="${g.y}" x2="384" y2="${g.y}" stroke="#e2e8f0" stroke-width="0.9"/>
            <text x="98" y="${g.y + 2.8}" text-anchor="end" font-size="6.6" font-weight="800" fill="${g.lbl === '34' ? '#0284c7' : '#64748b'}">${g.lbl}</text>
          `).join('')}
          <text x="72" y="185" text-anchor="middle" font-size="6.8" font-weight="800" fill="#334155" transform="rotate(-90 72 185)">抵抗率 ρ (μΩ·cm)</text>
          ${[
            { x: 118, lbl: '1.5nm' },
            { x: 162, lbl: '3nm' },
            { x: 216, lbl: '5nm' },
            { x: 266, lbl: '10nm' },
            { x: 332, lbl: '50nm' },
            { x: 374, lbl: '80nm' },
          ].map((tk) => `
            <line x1="${tk.x}" y1="106" x2="${tk.x}" y2="260" stroke="${tk.lbl === '5nm' ? '#f59e0b' : '#f1f5f9'}" stroke-width="${tk.lbl === '5nm' ? '1.3' : '0.8'}" ${tk.lbl === '5nm' ? 'stroke-dasharray="4 2"' : ''}/>
            <text x="${tk.x}" y="272" text-anchor="middle" font-size="6.6" font-weight="${tk.lbl === '1.5nm' || tk.lbl === '5nm' ? '900' : '700'}" fill="${tk.lbl === '5nm' ? '#b45309' : tk.lbl === '1.5nm' ? '#0284c7' : '#475569'}">${tk.lbl}</text>
          `).join('')}
          <text x="242" y="284" text-anchor="middle" font-size="6.8" font-weight="800" fill="#334155">配線膜厚 t (nm · 対数スケール)</text>

          <!-- Curve 1: Conventional Copper (Fuchs-Sondheimer + TaN barrier skyrocketing <5nm!) -->
          <path d="M 374 252 C 324 250 278 242 246 218 C 216 192 178 152 118 118" fill="none" stroke="#ea580c" stroke-width="2.4"/>
          <text x="176" y="138" font-size="7.2" font-weight="900" fill="#c2410c">× Cu (表面散乱+TaNで急騰)</text>
          <!-- Curve 2: Ru reference -->
          <path d="M 374 236 C 310 232 256 218 216 196 C 176 172 142 150 118 138" fill="none" stroke="#64748b" stroke-width="1.6" stroke-dasharray="4 2"/>
          <text x="292" y="232" font-size="6.6" font-weight="800" fill="#475569">Ru 単体</text>

          <!-- Curve 3: Stanford NbP Weyl Semimetal (DROPS 6x as thickness shrinks from 80nm -> 1.5nm!) -->
          <path d="M 374 134 C 330 140 282 156 244 176 C 204 196 154 206 118 208" fill="none" stroke="#0284c7" stroke-width="3.0"/>
          ${[[374, 134], [326, 144], [266, 166], [202, 196], [154, 205], [118, 208]].map(([dx, dy]) => `<circle cx="${dx}" cy="${dy}" r="3.4" fill="#0284c7" stroke="#ffffff" stroke-width="1.1"/>`).join('')}
          <circle cx="118" cy="208" r="5.2" fill="#0284c7" stroke="#fde047" stroke-width="1.6"/>
          <rect x="126" y="213" width="84" height="17" rx="4" fill="#0284c7"/>
          <text x="168" y="224.5" text-anchor="middle" font-size="7.0" font-weight="900" fill="#ffffff">34 μΩ·cm @1.5nm</text>
          <text x="318" y="128" text-anchor="middle" font-size="7.2" font-weight="900" fill="#0369a1">○ NbP (薄化で1/6へ低下!)</text>

          <!-- RIGHT TOP PANEL: HAADF-STEM Stack Cross-Section + Weyl k-Space Fermi-Arc Diagram -->
          <rect x="404" y="78" width="294" height="134" rx="9" fill="#0f172a" stroke="#0284c7" stroke-width="1.2"/>
          <text x="551" y="93" text-anchor="middle" font-size="8.2" font-weight="800" fill="#e0f2fe">HAADF-STEM 多層断面 ＆ Weylノード Fermi-Arc 表面伝導</text>

          <!-- Left Half: Physical Stack (SiN Cap / 1.5nm NbP / Nb(001) Seed / SiO2) -->
          <rect x="414" y="102" width="164" height="13" rx="2" fill="#475569"/>
          <text x="496" y="111.5" text-anchor="middle" font-size="6.4" font-weight="800" fill="#e2e8f0">SiN 酸化保護キャップ (空気劣化&lt;10%)</text>
          <!-- Top Fermi-Arc Highway -->
          <rect x="414" y="116" width="164" height="11" fill="url(#${p}_cyan)"/>
          <line x1="422" y1="121.5" x2="570" y2="121.5" stroke="#fde047" stroke-width="1.6" stroke-dasharray="6 3" marker-end="url(#${p}_arr_gold)"/>
          <!-- 1.5nm Amorphous+Nanocrystalline NbP Core -->
          <rect x="414" y="127" width="164" height="24" fill="#64748b"/>
          <text x="496" y="138" text-anchor="middle" font-size="7.2" font-weight="900" fill="#ffffff">1.5–2.6 nm 非晶質/ナノ結晶 NbP</text>
          <text x="496" y="148" text-anchor="middle" font-size="6.0" font-weight="700" fill="#fde047">4a_NbP ≈ 1.34 nm · 400°C成膜</text>
          <!-- Bottom Fermi-Arc Highway -->
          <rect x="414" y="151" width="164" height="11" fill="url(#${p}_cyan)"/>
          <line x1="422" y1="156.5" x2="570" y2="156.5" stroke="#fde047" stroke-width="1.6" stroke-dasharray="6 3" marker-end="url(#${p}_arr_gold)"/>
          <!-- Nb(001) Seed Layer -->
          <rect x="414" y="163" width="164" height="13" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="0.7"/>
          <text x="496" y="172.5" text-anchor="middle" font-size="6.3" font-weight="800" fill="#cbd5e1">1–4 nm Nb(001) シード層 / SiO₂</text>
          <text x="496" y="191" text-anchor="middle" font-size="6.5" font-weight="800" fill="#34d399">金属的 dρ/dT &gt; 0 を 5 K 低温まで維持!</text>
          <text x="496" y="203" text-anchor="middle" font-size="6.2" font-weight="700" fill="#94a3b8">対比: 純4nm Nbは4日で90%酸化劣化</text>

          <!-- Right Half: Weyl k-Space Fermi-Arc Box -->
          <rect x="586" y="102" width="104" height="102" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="0.9"/>
          <text x="638" y="114" text-anchor="middle" font-size="6.7" font-weight="900" fill="#7dd3fc">k空間 Fermi-Arc</text>
          <line x1="596" y1="154" x2="680" y2="154" stroke="#475569" stroke-width="0.8"/>
          <line x1="638" y1="118" x2="638" y2="190" stroke="#475569" stroke-width="0.8"/>
          <!-- Chiral Weyl Nodes W+ / W- linked by open Fermi Arc -->
          <path d="M 612 142 Q 638 124 664 142" fill="none" stroke="#fde047" stroke-width="2.2"/>
          <path d="M 612 166 Q 638 184 664 166" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
          <circle cx="612" cy="142" r="4" fill="#ef4444"/><text x="605" y="136" font-size="6.2" font-weight="900" fill="#fca5a5">W⁺</text>
          <circle cx="664" cy="142" r="4" fill="#22c55e"/><text x="671" y="136" font-size="6.2" font-weight="900" fill="#86efac">W⁻</text>
          <circle cx="612" cy="166" r="4" fill="#22c55e"/>
          <circle cx="664" cy="166" r="4" fill="#ef4444"/>
          <text x="638" y="198" text-anchor="middle" font-size="6.2" font-weight="800" fill="#fde047">後方散乱抑止チャネル</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(404, 219, 143, 73, '1.5 nm 室温抵抗率', '34 μΩ·cm', '80nmバルク比 1/6 へ激減', '#0284c7')}
          ${kpiCard(555, 219, 143, 73, '対Cu抵抗率削減', '−66% 以上', '単結晶不要 400°C成膜', '#059669')}

          ${cleanPin(158, 290, 158, 300, 82, 319, 1, '膜厚5nm以下の銅限界を逆転', '細線化するほど表面フェルミアーク伝導比が増し平均抵抗率が低下', '#0284c7')}
          ${cleanPin(496, 292, 496, 300, 386, 319, 2, '非晶質/ナノ結晶 BEOL完全互換', '400°Cスパッタ＋SiN保護で酸化耐性<10%と量産性を同時クリア', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'ワイル型トポロジカル半金属NbPをNb(001)シード上へ1.5nm成膜した表面伝導ナノ配線', line2: 'トポロジカル保護されたFermi-Arc表面チャネルが支配的となり細線ほど抵抗率が低下' },
          { label: '撮影・画質への恩恵', line1: 'A5〜A2世代の超微細BEOLにおけるRC遅延と発熱の壁を打ち破り動作クロックを延伸', line2: '単結晶不要の400°C成膜・高耐酸化性(<10%劣化)により次世代BIONZ量産ラインへ直結' },
          { label: '実機・2025学会諸元', line1: 'Stanford Eric Pop研 (Khan et al., Science 2025年1月) 実証・1.5nmで ~34 μΩ·cm', line2: '5nm以下Cu(>100 μΩ·cm)比で66%以上低抵抗・5 K低温まで金属的dρ/dT>0を保持' },
        ],
      });

    // =========================================================================
    // X2-90. imec IEDM 2025 RuAl Intermetallic / Graphene-Cu & M0->M2 Supervia
    // =========================================================================
    case 'xv2_rual_intermetallic_supervia':
      return renderBionzV2Hd({
        badge: 'X2-90',
        zone: 'beol',
        nodeTag: 'imec · IEDM 2025 BEOL',
        title: 'imec IEDM 2025「B2規則合金RuAl ＆ グラフェン被覆Cu・1層スキップM0→M2スーパービア」',
        analogy: '途中階(M1)の乗換えと狭いバリア壁を撤去し、M0からM2へ直通ノンストップで繋ぐ超低抵抗エレベーター',
        metric: '垂直RC −35% · MFP ~6nm',
        scaleLabel: '16–21 nm PITCH · SKIP-M1',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        defsExtra: (p) => `
          <clipPath id="${p}_loupe"><circle cx="352" cy="198" r="37"/></clipPath>
        `,
        art: (p) => `
          <!-- LEFT PANEL: Dual-Damascene Stacked Via vs Monolithic Barrierless M0->M2 Supervia + B2 RuAl Atomic Loupe -->
          <rect x="64" y="78" width="336" height="214" rx="9" fill="#ffffff" stroke="#fcd34d" stroke-width="1.3"/>
          <rect x="64" y="78" width="336" height="21" rx="9" fill="#fffbeb"/>
          <rect x="64" y="89" width="336" height="10" fill="#fffbeb"/>
          <text x="232" y="92.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#92400e">BEOL多層断面比較：従来2段スタックビア vs バリアレスM0→M2スーパービア</text>

          ${cmpBanner(74, 104, 126, '従来: TaN×2+M1占有', false)}
          ${cmpBanner(208, 104, 182, 'Supervia: M1貫通直結!', true)}

          <!-- Conventional Stacked Via (M2 -> V1+TaN -> M1 landing pad -> V0+TaN -> M0) -->
          <rect x="78" y="132" width="118" height="18" rx="2" fill="url(#${p}_cu)"/>
          <text x="137" y="144" text-anchor="middle" font-size="7.2" font-weight="900" fill="#ffffff">M2 Cu</text>
          <!-- V1 with thick red TaN barrier liner -->
          <rect x="122" y="150" width="30" height="28" fill="#dc2626"/>
          <rect x="127" y="150" width="20" height="24" fill="url(#${p}_cu)"/>
          <text x="100" y="166" text-anchor="middle" font-size="6.2" font-weight="900" fill="#b91c1c">2nm TaN</text>
          <!-- M1 Landing Pad wasting an entire routing track! -->
          <rect x="78" y="178" width="118" height="18" rx="2" fill="url(#${p}_cu)" stroke="#b91c1c" stroke-width="1"/>
          <text x="137" y="190" text-anchor="middle" font-size="6.8" font-weight="900" fill="#ffffff">M1着地パッド(配線渋滞)</text>
          <!-- V0 with thick red TaN barrier liner -->
          <rect x="122" y="196" width="30" height="28" fill="#dc2626"/>
          <rect x="127" y="196" width="20" height="24" fill="url(#${p}_cu)"/>
          <rect x="78" y="224" width="118" height="18" rx="2" fill="url(#${p}_cu)"/>
          <text x="137" y="236" text-anchor="middle" font-size="7.2" font-weight="900" fill="#ffffff">M0 Cu</text>
          <text x="137" y="256" text-anchor="middle" font-size="6.8" font-weight="900" fill="#b91c1c">4界面抵抗 ＋ 寄生容量C_f増</text>
          <text x="137" y="268" text-anchor="middle" font-size="6.4" font-weight="700" fill="#7f1d1d">目ズレ(EPE)でM1短絡リスク</text>

          <!-- Monolithic Barrierless M0->M2 Supervia threading cleanly between Graphene-capped Cu M1 tracks -->
          <rect x="210" y="132" width="102" height="18" rx="2" fill="url(#${p}_gold)" stroke="#a16207"/>
          <text x="261" y="144" text-anchor="middle" font-size="7.0" font-weight="900" fill="#0f172a">M2 (Gr-Cu / RuAl)</text>
          <!-- Intact adjacent M1 tracks capped with 1L Graphene (black top cap) -->
          <rect x="210" y="178" width="34" height="18" rx="2" fill="url(#${p}_cu)"/>
          <rect x="210" y="174" width="34" height="4" fill="#0f172a"/>
          <text x="227" y="190" text-anchor="middle" font-size="6.2" font-weight="900" fill="#ffffff">M1</text>
          <rect x="278" y="178" width="34" height="18" rx="2" fill="url(#${p}_cu)"/>
          <rect x="278" y="174" width="34" height="4" fill="#0f172a"/>
          <text x="295" y="190" text-anchor="middle" font-size="6.2" font-weight="900" fill="#ffffff">M1</text>
          <!-- Straight Barrierless Monolithic Supervia Pillar! -->
          <rect x="250" y="150" width="22" height="74" fill="url(#${p}_ru)" stroke="#059669" stroke-width="1.5"/>
          <line x1="261" y1="218" x2="261" y2="156" stroke="#fde047" stroke-width="1.8" marker-end="url(#${p}_arr_gold)"/>
          <!-- Bottom B2 Ordered RuAl M0 Rail -->
          <rect x="210" y="224" width="102" height="18" rx="2" fill="url(#${p}_ru)" stroke="#475569"/>
          <text x="261" y="236" text-anchor="middle" font-size="7.0" font-weight="900" fill="#0f172a">M0 B2-RuAl (16nm)</text>
          <text x="261" y="256" text-anchor="middle" font-size="6.8" font-weight="900" fill="#047857">バリアレス直通 → RC −35%!</text>
          <text x="261" y="268" text-anchor="middle" font-size="6.4" font-weight="700" fill="#065f46">M1配線トラック完全開放</text>

          <!-- Circular TEM Loupe: B2 CsCl-Type Ordered RuAl Cubic Lattice + 1L Graphene Cap -->
          <g clip-path="url(#${p}_loupe)">
            <circle cx="352" cy="198" r="37" fill="#0f172a"/>
            <!-- 3D B2 Cubic Cell Wireframe -->
            <rect x="333" y="182" width="28" height="28" fill="none" stroke="#94a3b8" stroke-width="1.1"/>
            <rect x="343" y="174" width="28" height="28" fill="none" stroke="#64748b" stroke-width="1.0" stroke-dasharray="2 1"/>
            <line x1="333" y1="182" x2="343" y2="174" stroke="#94a3b8" stroke-width="1"/>
            <line x1="361" y1="182" x2="371" y2="174" stroke="#94a3b8" stroke-width="1"/>
            <line x1="333" y1="210" x2="343" y2="202" stroke="#94a3b8" stroke-width="1"/>
            <line x1="361" y1="210" x2="371" y2="202" stroke="#94a3b8" stroke-width="1"/>
            <!-- Corner Ru atoms + Body-Center Al atom -->
            ${[[333, 182], [361, 182], [333, 210], [361, 210], [343, 174], [371, 174], [371, 202]].map(([rx, ry]) => `<circle cx="${rx}" cy="${ry}" r="3.8" fill="#e2e8f0" stroke="#475569" stroke-width="0.8"/>`).join('')}
            <circle cx="352" cy="192" r="5.4" fill="#f59e0b" stroke="#fef3c7" stroke-width="1"/>
            <text x="352" y="194.2" text-anchor="middle" font-size="5.5" font-weight="900" fill="#0f172a">Al</text>
            <text x="352" y="225" text-anchor="middle" font-size="5.6" font-weight="900" fill="#fde047">B2 RuAl (λ≈6nm)</text>
          </g>
          ${loupeFrame(352, 198, 37, 'B2規則 RuAl', '#d97706')}

          <!-- RIGHT TOP PANEL: Quantitative ρ₀×λ FOM & Via Resistance Breakdown Chart -->
          <rect x="408" y="78" width="290" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="553" y="93" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">細線サイズ効果指標 ρ₀×λ ＆ 垂直ビア抵抗 R_via 削減内訳</text>

          ${[
            { name: 'Cu+2nm TaN', val: 'MFP 39nm (細線激増)', w: 146, col: '#ea580c' },
            { name: '単体 Ru', val: 'MFP 6.6nm (バリア無)', w: 84, col: '#64748b' },
            { name: 'B2 RuAl', val: 'MFP ~6.0nm (高EM)', w: 72, col: '#d97706' },
            { name: 'Supervia', val: 'R_via −35% (直通!)', w: 48, col: '#059669' },
          ].map((b, i) => `
            <text x="416" y="${116 + i * 23}" font-size="7.2" font-weight="800" fill="#0f172a">${b.name}</text>
            <rect x="486" y="${106 + i * 23}" width="${b.w}" height="13" rx="3" fill="${b.col}"/>
            <text x="${492 + b.w}" y="${115.5 + i * 23}" font-size="6.6" font-weight="800" fill="${i === 3 ? '#047857' : '#334155'}">${b.val}</text>
          `).join('')}
          <rect x="416" y="195" width="274" height="13" rx="3" fill="#ecfdf5"/>
          <text x="553" y="204" text-anchor="middle" font-size="6.6" font-weight="800" fill="#065f46">単層グラフェン被覆(Gr-Cu)でCu拡散・酸化を封止しエレクトロマイグレーション寿命倍増</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(408, 219, 141, 73, '垂直RC遅延削減', '−30〜40%', 'M1着地パッド＆TaN撤廃', '#d97706')}
          ${kpiCard(557, 219, 141, 73, '最先端BEOLピッチ', '16–21 nm', '3層スキップSupervia実証', '#059669')}

          ${cleanPin(261, 290, 261, 300, 82, 319, 1, 'バリアレス M0→M2 貫通スーパービア', 'V0+M1着地+V1の4界面を1本の直通柱へ統合し垂直抵抗と容量を同時削減', '#d97706')}
          ${cleanPin(553, 292, 553, 300, 386, 319, 2, 'B2規則合金RuAl ＋ グラフェン被覆Cu', '短い電子MFP(~6nm)と高凝集エネルギーで16nm細線でも低抵抗・高信頼維持', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'B2規則金属間化合物RuAl・グラフェン被覆Cuと、M1を飛び越す直通M0→M2スーパービア', line2: '中間層の着地パッドと高抵抗TaNバリア界面を丸ごと廃し垂直RC遅延を30〜40%短縮' },
          { label: '撮影・画質への恩恵', line1: '高密度AI積和アレイやSRAMマクロのM1配線詰まりを解消しSoC面積と消費電力を削減', line2: '高EM信頼性により高温8K/4K120p長時間録画での微細配線ボイド断線を防止' },
          { label: '実機・2025学会諸元', line1: 'imec IEDM 2025 / arXiv 2504.19676 実証（16–21 nmピッチ・バリアレスSupervia）', line2: 'B2 RuAl MFP ~6.0 nm（Cu 39 nmの約1/6）・単層グラフェン拡散防止キャップ併用' },
        ],
      });

    // =========================================================================
    // X2-91. ISSCC 2026 Paper 8.5 Command-Aware Hybrid LDO (CA-HLDO, 8.7mV Droop / 400ps)
    // =========================================================================
    case 'xv2_isscc26_ca_hybrid_dldo':
      return renderBionzV2Hd({
        badge: 'X2-91',
        zone: 'beol',
        nodeTag: 'ISSCC 2026 · Paper 8.5 SNU',
        title: 'ISSCC 2026「コマンド先読み複合電源 CA-HLDO（8.7mV極小ドループ・400ps整定）」',
        analogy: '大電流が来る0.4ナノ秒前にメモリ命令を先読みして電気を先行注入し、電圧の落ち込みを95%防ぐ予知電源',
        metric: '8.7 mV · 400 ps整定',
        scaleLabel: 'ONLY 20 pF · PSIJ 10.8 ps',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        art: (p) => `
          <!-- LEFT PANEL: Authentic Transistor-Level Hybrid Analog+Digital CA-HLDO Circuit Schematic -->
          <rect x="64" y="78" width="346" height="214" rx="9" fill="#ffffff" stroke="#6ee7b7" stroke-width="1.3"/>
          <rect x="64" y="78" width="346" height="21" rx="9" fill="#ecfdf5"/>
          <rect x="64" y="89" width="346" height="10" fill="#ecfdf5"/>
          <text x="237" y="92.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#065f46">CA-HLDO トランジスタ級回路構成：先読みDLDO ＋ 並列Op-Amp ALDO</text>

          <!-- Top VDD_IN Power Rail -->
          <line x1="78" y1="112" x2="394" y2="112" stroke="#dc2626" stroke-width="2.2"/>
          <text x="82" y="109" font-size="7.0" font-weight="900" fill="#b91c1c">VDD_IN (1.1V)</text>

          <!-- Left: Command Snooper & Lookahead Decoder (ACTCMD / WDQS) -->
          <rect x="74" y="124" width="102" height="54" rx="6" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.1"/>
          <text x="125" y="140" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0f172a">コマンド先読み器</text>
          <text x="125" y="153" text-anchor="middle" font-size="6.9" font-weight="800" fill="#78350f">ACTCMD / WDQS</text>
          <text x="125" y="166" text-anchor="middle" font-size="6.3" font-weight="800" fill="#0f172a">負荷急変を事前復号</text>

          <!-- Feedforward Bus to Segmented PMOS DLDO Power Array -->
          <line x1="176" y1="151" x2="210" y2="151" stroke="#d97706" stroke-width="2.2" marker-end="url(#${p}_arr_gold)"/>
          <text x="193" y="144" text-anchor="middle" font-size="6.2" font-weight="900" fill="#b45309">先行FF</text>

          <!-- Segmented Binary-Weighted PMOS DLDO Array (Real MOSFET Symbols!) -->
          <rect x="214" y="122" width="128" height="62" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.1"/>
          <text x="278" y="134" text-anchor="middle" font-size="7.2" font-weight="900" fill="#0369a1">デジタルLDO (2ⁿ PMOSアレイ)</text>
          ${[0, 1, 2, 3].map((k) => {
            const mx = 228 + k * 28;
            return `
              <line x1="${mx + 8}" y1="112" x2="${mx + 8}" y2="145" stroke="#dc2626" stroke-width="1.2"/>
              <line x1="${mx}" y1="145" x2="${mx}" y2="165" stroke="#0284c7" stroke-width="1.6"/>
              <circle cx="${mx - 2.6}" cy="155" r="2.2" fill="#ffffff" stroke="#0284c7" stroke-width="1"/>
              <line x1="${mx + 4}" y1="145" x2="${mx + 4}" y2="165" stroke="#0f172a" stroke-width="1.4"/>
              <line x1="${mx + 4}" y1="147" x2="${mx + 12}" y2="147" stroke="#0f172a" stroke-width="1.2"/>
              <line x1="${mx + 4}" y1="163" x2="${mx + 12}" y2="163" stroke="#0f172a" stroke-width="1.2"/>
              <line x1="${mx + 12}" y1="163" x2="${mx + 12}" y2="196" stroke="#059669" stroke-width="1.2"/>
              <text x="${mx + 6}" y="177" text-anchor="middle" font-size="5.8" font-weight="800" fill="#0369a1">${['1×', '2×', '4×', '8×'][k]}</text>
            `;
          }).join('')}

          <!-- Bottom-Left: Continuous Parallel Analog LDO (Error Op-Amp Triangle + PMOS Pass Device) -->
          <rect x="74" y="198" width="174" height="72" rx="6" fill="#f0fdf4" stroke="#059669" stroke-width="1.1"/>
          <text x="161" y="210" text-anchor="middle" font-size="7.2" font-weight="900" fill="#065f46">並列アナログLDO (ALDO 残留リップル補償)</text>
          <!-- Op-Amp Symbol -->
          <polygon points="104,220 104,256 140,238" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
          <text x="110" y="233" font-size="8.0" font-weight="900" fill="#059669">−</text>
          <text x="110" y="250" font-size="8.0" font-weight="900" fill="#dc2626">+</text>
          <text x="88" y="232" text-anchor="middle" font-size="6.4" font-weight="800" fill="#0f172a">V_REF</text>
          <line x1="94" y1="229" x2="104" y2="229" stroke="#334155" stroke-width="1.1"/>
          <line x1="140" y1="238" x2="178" y2="238" stroke="#059669" stroke-width="1.4"/>
          <!-- ALDO PMOS Pass Transistor -->
          <line x1="184" y1="224" x2="184" y2="252" stroke="#059669" stroke-width="1.8"/>
          <circle cx="180.5" cy="238" r="2.6" fill="#ffffff" stroke="#059669" stroke-width="1.1"/>
          <line x1="190" y1="224" x2="190" y2="252" stroke="#0f172a" stroke-width="1.6"/>
          <line x1="190" y1="228" x2="206" y2="228" stroke="#dc2626" stroke-width="1.3"/>
          <line x1="190" y1="248" x2="206" y2="248" stroke="#059669" stroke-width="1.4"/>
          <line x1="206" y1="248" x2="206" y2="196" stroke="#059669" stroke-width="1.5"/>
          <text x="226" y="236" text-anchor="middle" font-size="6.3" font-weight="800" fill="#047857">連続線形</text>
          <text x="226" y="247" text-anchor="middle" font-size="6.3" font-weight="800" fill="#047857">精密制御</text>

          <!-- Shared Regulated Output Bus VDD_IO + Tiny 20pF Cap + HBM/DDR Load -->
          <line x1="206" y1="196" x2="394" y2="196" stroke="#059669" stroke-width="2.6"/>
          <text x="348" y="191" font-size="7.2" font-weight="900" fill="#047857">VDD_IO 出力</text>
          <!-- 20 pF Capacitor Symbol -->
          <line x1="286" y1="196" x2="286" y2="226" stroke="#0f172a" stroke-width="1.4"/>
          <line x1="272" y1="226" x2="300" y2="226" stroke="#d97706" stroke-width="2.2"/>
          <line x1="272" y1="234" x2="300" y2="234" stroke="#d97706" stroke-width="2.2"/>
          <line x1="286" y1="234" x2="286" y2="258" stroke="#0f172a" stroke-width="1.4"/>
          <line x1="276" y1="258" x2="296" y2="258" stroke="#0f172a" stroke-width="1.4"/>
          <text x="286" y="272" text-anchor="middle" font-size="7.2" font-weight="900" fill="#b45309">C_out = 20 pF</text>
          <!-- High-Speed I/O Load Block -->
          <rect x="330" y="212" width="68" height="44" rx="5" fill="#0f172a" stroke="#34d399"/>
          <text x="364" y="231" text-anchor="middle" font-size="7.0" font-weight="900" fill="#34d399">高速I/O負荷</text>
          <text x="364" y="244" text-anchor="middle" font-size="6.4" font-weight="700" fill="#fde047">HBM4/DDR</text>

          <!-- RIGHT TOP PANEL: Synchronized Transient Oscilloscope (ACTCMD Trigger + 185mV vs 8.7mV Droop) -->
          <rect x="418" y="78" width="280" height="134" rx="9" fill="#0f172a" stroke="#059669" stroke-width="1.2"/>
          <text x="558" y="93" text-anchor="middle" font-size="8.2" font-weight="800" fill="#d1fae5">負荷ステップ応答波形：従来ALDO (−185mV) vs CA-HLDO (−8.7mV)</text>
          <!-- Grid -->
          <line x1="432" y1="128" x2="686" y2="128" stroke="#334155" stroke-dasharray="3 2"/>
          <line x1="432" y1="158" x2="686" y2="158" stroke="#1e293b" stroke-dasharray="3 2"/>
          <line x1="432" y1="186" x2="686" y2="186" stroke="#1e293b" stroke-dasharray="3 2"/>

          <!-- Pre-Trigger ACTCMD pulse (arrives BEFORE load step!) -->
          <path d="M 434 116 L 460 116 L 460 103 L 488 103 L 488 116 L 494 116" fill="none" stroke="#fde047" stroke-width="1.6"/>
          <path d="M 488 103 L 540 103" fill="none" stroke="#fde047" stroke-width="0.9" stroke-dasharray="2 2"/>
          <text x="544" y="106.5" font-size="6.4" font-weight="900" fill="#fde047">← ACTCMD 先読み発火!</text>

          <!-- Conventional ALDO Massive -185 mV Droop Crash -->
          <path d="M 434 126 L 494 126 L 512 192 C 534 192 568 152 624 132 L 684 127" fill="none" stroke="#f87171" stroke-width="2.1" stroke-dasharray="4 2"/>
          <text x="598" y="187" text-anchor="middle" font-size="7.2" font-weight="900" fill="#f87171">× 従来ALDO: −185 mV 暴落</text>

          <!-- CA-HLDO Ultra-Tight -8.7 mV Dip settled in 400 ps! -->
          <path d="M 434 126 L 494 126 L 502 135 L 518 126 L 684 126" fill="none" stroke="#34d399" stroke-width="2.8"/>
          <circle cx="502" cy="135" r="3.4" fill="#34d399" stroke="#ffffff" stroke-width="1"/>
          <rect x="526" y="136" width="144" height="19" rx="4" fill="#065f46" stroke="#34d399"/>
          <text x="598" y="148.5" text-anchor="middle" font-size="7.3" font-weight="900" fill="#ffffff">○ CA-HLDO: 僅か 8.7 mV (400 ps!)</text>
          ${dimArrow(494, 118, 520, 118, '400ps', '#34d399')}
          <text x="558" y="205" text-anchor="middle" font-size="6.6" font-weight="700" fill="#94a3b8">全帯域 電源除去比 PSR ≤ −10 dB · PSIJ = 10.8 ps</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(418, 219, 136, 73, 'ドループ 95.3% 削減', '185 → 8.7 mV', '400 ps 超速整定', '#059669')}
          ${kpiCard(562, 219, 136, 73, '電源起因ジッタ PSIJ', '10.8 ps', 'オンチップ容量 僅か20pF', '#0284c7')}

          ${cleanPin(125, 290, 125, 300, 82, 319, 1, 'ACTCMD / WDQS コマンド先読み注入', '大電流バーストの直前に2ⁿ PMOS DLDOを先制開放し帰還遅延を突破', '#d97706')}
          ${cleanPin(558, 292, 558, 300, 386, 319, 2, '僅か20pFで8.7mV抑圧＆PSIJ 10.8ps', '巨大デカップ容量を不要化しHBM4/LPDDR6高速I/Oのジッタを最小化', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'メモリアクセス命令(ACTCMD/WDQS)を先読みしDLDOで即時電流注入＋並列ALDOで残留補償', line2: 'フィードバック遅延の壁を超え僅か20pF容量で8.7mVドループ・400ps整定を実現' },
          { label: '撮影・画質への恩恵', line1: '30fps連写時のHBM4/LPDDR6バースト書込に伴う電源起因ジッタ(PSIJ)を10.8psへ圧縮', line2: '高速SerDesやクロックのビットエラーを根絶し大容量RAW/8K動画の転送信頼性を確保' },
          { label: '実機・2026学会諸元', line1: 'ISSCC 2026 Paper 8.5 (ソウル大学) 実証（185mV→8.7mV・95.3%ドループ削減）', line2: '整定時間 400 ps・オンチップ容量 20 pF・全周波数帯域 PSR ≤ −10 dB' },
        ],
      });

    // =========================================================================
    // X2-92. On-Die Supply-Noise Oscilloscope & Active PDN Impedance Profiler (VCO-TDC PDM)
    // =========================================================================
    case 'xv2_tdc_supply_noise_oscilloscope':
      return renderBionzV2Hd({
        badge: 'X2-92',
        zone: 'beol',
        nodeTag: 'IEEE JSSC / ISSCC · PDM',
        title: 'オンダイ電源オシロスコープ「全デジタルVCO＋バーニアTDC 電源ノイズ波形サンプラ」',
        analogy: 'チップ内部の電源直下に埋め込んだピコ秒オシロで、1次ドループとパッケージ共振Z_PDNを実稼働中に生観測',
        metric: '<2 ps 分解能 · Z_PDN同定',
        scaleLabel: 'VERNIER TDC · 1st+2nd DROOP',
        accent: '#db2777',
        accentSoft: '#fdf2f8',
        art: (p) => `
          <!-- LEFT PANEL: Calibrated High-Speed Droop CRT + Real Vernier Delay-Line TDC Schematic -->
          <rect x="64" y="78" width="346" height="214" rx="9" fill="#ffffff" stroke="#f9a8d4" stroke-width="1.3"/>
          <rect x="64" y="78" width="346" height="21" rx="9" fill="#fdf2f8"/>
          <rect x="64" y="89" width="346" height="10" fill="#fdf2f8"/>
          <text x="237" y="92.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#9d174d">オンダイ電源過渡キャプチャ画面 ＆ 全デジタル VCO＋バーニアTDC回路</text>

          <!-- Calibrated Dark CRT Oscilloscope showing 1st Droop (L·di/dt) + 2nd Droop -->
          <rect x="74" y="104" width="326" height="84" rx="6" fill="#0b1120" stroke="#334155"/>
          ${[122, 144, 166].map((gy) => `<line x1="82" y1="${gy}" x2="392" y2="${gy}" stroke="#1e293b" stroke-width="0.9"/>`).join('')}
          ${[120, 165, 210, 255, 300, 345].map((gx) => `<line x1="${gx}" y1="108" x2="${gx}" y2="184" stroke="#1e293b" stroke-width="0.8"/>`).join('')}
          <line x1="82" y1="126" x2="392" y2="126" stroke="#475569" stroke-dasharray="3 2"/>
          <!-- Trigger marker -->
          <line x1="126" y1="108" x2="126" y2="184" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2"/>
          <text x="129" y="117" font-size="6.2" font-weight="900" fill="#fbbf24">TRIG (di/dt励振)</text>
          <!-- Captured Damped Ringing Waveform (1st Droop ~100MHz + 2nd Droop envelope) -->
          <path d="M 82 126 L 126 126 L 138 176 L 154 116 L 172 164 L 192 122 L 214 152 L 238 128 L 266 144 L 298 134 L 336 142 L 390 128" fill="none" stroke="#f472b6" stroke-width="2.2"/>
          <text x="144" y="180" font-size="6.4" font-weight="900" fill="#fb7185">1st Droop (L_pkg·di/dt)</text>
          <text x="322" y="156" text-anchor="middle" font-size="6.3" font-weight="800" fill="#38bdf8">2nd Droop</text>
          <text x="388" y="117" text-anchor="end" font-size="6.3" font-weight="800" fill="#34d399">Δτ = τ₁−τ₂ = 1.5 ps</text>

          <!-- Lower Schematic: Local VDD -> VCO -> Dual-Chain Vernier TDC (τ1 vs τ2 + Arbiters) -> SRAM Trace -->
          <rect x="74" y="196" width="76" height="84" rx="5" fill="#eff6ff" stroke="#2563eb"/>
          <text x="112" y="210" text-anchor="middle" font-size="7.0" font-weight="900" fill="#1e40af">VCO 電圧→周期</text>
          <circle cx="112" cy="236" r="15" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-dasharray="6 3"/>
          <text x="112" y="239" text-anchor="middle" font-size="6.6" font-weight="900" fill="#1e40af">f(VDD)</text>
          <text x="112" y="264" text-anchor="middle" font-size="6.0" font-weight="700" fill="#334155">標準デジタルセル</text>
          <text x="112" y="274" text-anchor="middle" font-size="6.0" font-weight="800" fill="#2563eb">アナログADC不要</text>

          <line x1="150" y1="226" x2="164" y2="226" stroke="#2563eb" stroke-width="1.5" marker-end="url(#${p}_arr_blue)"/>
          <line x1="150" y1="252" x2="164" y2="252" stroke="#db2777" stroke-width="1.5" marker-end="url(#${p}_arr_pink)"/>

          <!-- Vernier Delay-Line TDC Chains -->
          <rect x="166" y="196" width="152" height="84" rx="5" fill="#fdf2f8" stroke="#db2777"/>
          <text x="242" y="209" text-anchor="middle" font-size="7.0" font-weight="900" fill="#9d174d">バーニア遅延線 TDC (τ₁ vs τ₂)</text>
          <!-- Chain 1 (slow τ1) & Chain 2 (fast τ2) + D-FF Arbiters -->
          ${[0, 1, 2, 3].map((s) => {
            const sx = 176 + s * 34;
            return `
              <polygon points="${sx},216 ${sx + 13},222 ${sx},228" fill="#dbeafe" stroke="#2563eb" stroke-width="1"/>
              <polygon points="${sx},246 ${sx + 13},252 ${sx},258" fill="#fce7f3" stroke="#db2777" stroke-width="1"/>
              <rect x="${sx + 16}" y="229" width="12" height="16" rx="2" fill="#0f172a"/>
              <text x="${sx + 22}" y="239" text-anchor="middle" font-size="5.6" font-weight="900" fill="#fde047">FF</text>
              ${s < 3 ? `<line x1="${sx + 13}" y1="222" x2="${sx + 34}" y2="222" stroke="#2563eb" stroke-width="1"/><line x1="${sx + 13}" y1="252" x2="${sx + 34}" y2="252" stroke="#db2777" stroke-width="1"/>` : ''}
            `;
          }).join('')}
          <text x="242" y="272" text-anchor="middle" font-size="6.2" font-weight="800" fill="#9d174d">τ₁=15ps · τ₂=13.5ps → Δτ=1.5ps</text>

          <!-- Synthetic Crowbar Load & SRAM Buffer -->
          <line x1="318" y1="238" x2="328" y2="238" stroke="#334155" stroke-width="1.5" marker-end="url(#${p}_arr_dark)"/>
          <rect x="330" y="196" width="70" height="40" rx="5" fill="#0f172a"/>
          <text x="365" y="213" text-anchor="middle" font-size="6.8" font-weight="900" fill="#38bdf8">SRAMトレース</text>
          <text x="365" y="227" text-anchor="middle" font-size="6.0" font-weight="700" fill="#cbd5e1">波形連続格納</text>
          <rect x="330" y="240" width="70" height="40" rx="5" fill="#fffbeb" stroke="#d97706"/>
          <text x="365" y="257" text-anchor="middle" font-size="6.8" font-weight="900" fill="#92400e">合成負荷バンク</text>
          <text x="365" y="271" text-anchor="middle" font-size="6.0" font-weight="700" fill="#b45309">di/dt掃引励振</text>

          <!-- RIGHT TOP PANEL: Log-Log PDN Impedance Profile |Z_PDN(f)| (1MHz - 10GHz) -->
          <rect x="418" y="78" width="280" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="558" y="93" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">オンダイ実測 PDNインピーダンス |Z_PDN(f)| 共振解析</text>
          <line x1="452" y1="104" x2="452" y2="192" stroke="#475569" stroke-width="1.1"/>
          <line x1="452" y1="192" x2="686" y2="192" stroke="#475569" stroke-width="1.1"/>
          <!-- Z_target limit dashed line -->
          <line x1="452" y1="138" x2="686" y2="138" stroke="#059669" stroke-width="1.2" stroke-dasharray="4 2"/>
          <text x="684" y="135" text-anchor="end" font-size="6.4" font-weight="900" fill="#059669">Z_target 上限</text>
          ${['1MHz', '10MHz', '100MHz', '1GHz', '10GHz'].map((f, i) => `
            <line x1="${462 + i * 54}" y1="104" x2="${462 + i * 54}" y2="192" stroke="#f1f5f9" stroke-width="0.8"/>
            <text x="${462 + i * 54}" y="203" text-anchor="middle" font-size="6.2" font-weight="700" fill="#475569">${f}</text>
          `).join('')}
          <text x="448" y="114" text-anchor="end" font-size="6.1" font-weight="700" fill="#64748b">100mΩ</text>
          <text x="448" y="152" text-anchor="end" font-size="6.1" font-weight="700" fill="#64748b">10mΩ</text>
          <text x="448" y="188" text-anchor="end" font-size="6.1" font-weight="700" fill="#64748b">1mΩ</text>
          <!-- Impedance Curve with prominent Package-Die Anti-Resonance Peak ~85 MHz -->
          <path d="M 456 184 Q 492 178 514 166 Q 536 172 562 114 Q 588 168 626 176 L 682 154" fill="none" stroke="#db2777" stroke-width="2.5"/>
          <circle cx="562" cy="114" r="4" fill="#db2777" stroke="#ffffff" stroke-width="1"/>
          <text x="572" y="116" font-size="6.9" font-weight="900" fill="#be185d">反共振ピーク f_res (85MHz)</text>
          <text x="492" y="186" font-size="6.0" font-weight="700" fill="#64748b">PCB</text>
          <text x="636" y="186" font-size="6.0" font-weight="700" fill="#0284c7">On-Die MIM</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(418, 219, 136, 73, '実装アーキテクチャ', '100% デジタル', '標準セルのみで配置可', '#db2777')}
          ${kpiCard(562, 219, 136, 73, '実機PIデバッグ', 'Z_PDN(f) 自動掃引', 'OS稼働中/BSPDN直下観測', '#2563eb')}

          ${cleanPin(242, 290, 242, 300, 82, 319, 1, 'バーニアTDC ピコ秒波形サンプラ', '2系統遅延線の時間差Δτ=1.5psで外部プローブ不能な1次ドループを生録', '#db2777')}
          ${cleanPin(558, 292, 558, 300, 386, 319, 2, '合成di/dt負荷による反共振ピーク同定', 'パッケージLとダイCの共振f_resを特定しクロック/電源ゲーティングを最適化', '#d97706')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '標準デジタルセルのリングVCO＋2系統バーニア遅延線TDC(Δτ<2ps)＋合成di/dt電流負荷', line2: 'パッケージ内部のローカルVDD 1次/2次ドループ波形と共振インピーダンスZ_PDN(f)を実測' },
          { label: '撮影・画質への恩恵', line1: '8K録画・AF・NPU同時起動時の最悪電源共振を特定し電源/クロックゲーティングを精密制御', line2: '外部計測不可能な2nm BSPDN直下の電源品質を保証しフリーズやノイズ画質劣化を防止' },
          { label: '実機・学会諸元', line1: 'IEEE JSSC / ISSCC Power Delivery Monitor (PDM) 全デジタル構成・スキャン/OS稼働時対応', line2: 'バーニアTDCピコ秒時間分解能・50–250 MHz パッケージ共振ピーク自動検出＆SRAMトレース内蔵' },
        ],
      });

    // =========================================================================
    // X2-93. Monolithic CMOS Thin-Film CoZrTa (CZTB) / 4nm AlN Magnetic FIVR Inductor
    // =========================================================================
    case 'xv2_cozrta_magnetic_fivr_inductor':
      return renderBionzV2Hd({
        badge: 'X2-93',
        zone: 'beol',
        nodeTag: 'CMOS FIVR · CoZrTaB / 4nm AlN',
        title: 'BEOL薄膜磁性インダクタ「積層CoZrTa(CZTB)/4nm AlN 閉磁路FIVRインダクタアレイ」',
        analogy: '基板上の大きなコイルを積層ナノ磁性フィルムへ圧縮し、空芯比51倍の電力変換密度を生むオンチップ磁心',
        metric: '127–290 nH/mm² · 97.8%',
        scaleLabel: '100–200 MHz · Q=15–30 · k=0.89',
        accent: '#b45309',
        accentSoft: '#fef3c7',
        defsExtra: (p) => `
          <clipPath id="${p}_loupe"><circle cx="342" cy="186" r="42"/></clipPath>
        `,
        art: (p) => `
          <!-- LEFT PANEL: Detailed Foundry Cross-Section of Laminated CoZrTaB/4nm AlN + Finger-Patterned Closure Vias -->
          <rect x="64" y="78" width="336" height="214" rx="9" fill="#ffffff" stroke="#fbbf24" stroke-width="1.3"/>
          <rect x="64" y="78" width="336" height="21" rx="9" fill="#fef3c7"/>
          <rect x="64" y="89" width="336" height="10" fill="#fef3c7"/>
          <text x="232" y="92.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#92400e">積層CoZrTaB/4nm AlN 閉磁路ソレノイド断面 ＆ フィンガー型磁性ビア</text>

          <!-- Top 5-Layer Laminated CoZrTaB / 4nm AlN Soft-Magnetic Yoke -->
          <rect x="78" y="114" width="218" height="24" rx="3" fill="url(#${p}_si)"/>
          ${[119, 124, 129, 134].map((ly) => `<line x1="81" y1="${ly}" x2="293" y2="${ly}" stroke="#38bdf8" stroke-width="1.2"/>`).join('')}
          <text x="187" y="110" text-anchor="middle" font-size="6.9" font-weight="900" fill="#1e293b">上部 5層積層 CoZrTaB / 4nm AlN ヨーク（渦電流遮断）</text>

          <!-- Finger-Patterned CZTB Magnetic Closure Vias (+30% GHz Q-Factor!) -->
          <rect x="78" y="138" width="16" height="66" fill="url(#${p}_si)"/>
          <line x1="86" y1="142" x2="86" y2="200" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 2"/>
          <rect x="280" y="138" width="16" height="66" fill="url(#${p}_si)"/>
          <line x1="288" y1="142" x2="288" y2="200" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 2"/>

          <!-- Thick 5μm Electroplated Cu Helical Windings with Current ⊙ / ⊗ & Closed B-Flux Arrows -->
          ${[0, 1, 2, 3].map((i) => {
            const cx = 104 + i * 44;
            return `
              <rect x="${cx}" y="146" width="32" height="50" rx="4" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1.1"/>
              <circle cx="${cx + 16}" cy="171" r="7.5" fill="#fffbeb" stroke="#7c2d12" stroke-width="1"/>
              ${i % 2 === 0
                ? `<circle cx="${cx + 16}" cy="171" r="2.6" fill="#7c2d12"/>`
                : `<path d="M ${cx + 12} 167 L ${cx + 20} 175 M ${cx + 20} 167 L ${cx + 12} 175" stroke="#7c2d12" stroke-width="1.4"/>`
              }
            `;
          }).join('')}

          <!-- Closed Magnetic Flux Loop (B-field dashed cyan/gold circuit around Cu windings) -->
          <rect x="86" y="126" width="202" height="90" rx="8" fill="none" stroke="#fde047" stroke-width="1.6" stroke-dasharray="6 3"/>
          <line x1="168" y1="126" x2="206" y2="126" stroke="#fde047" stroke-width="2" marker-end="url(#${p}_arr_gold)"/>
          <line x1="206" y1="216" x2="168" y2="216" stroke="#fde047" stroke-width="2" marker-end="url(#${p}_arr_gold)"/>

          <!-- Bottom 5-Layer Laminated CoZrTaB / 4nm AlN Yoke -->
          <rect x="78" y="204" width="218" height="24" rx="3" fill="url(#${p}_si)"/>
          ${[209, 214, 219, 224].map((ly) => `<line x1="81" y1="${ly}" x2="293" y2="${ly}" stroke="#38bdf8" stroke-width="1.2"/>`).join('')}
          <text x="187" y="241" text-anchor="middle" font-size="6.9" font-weight="900" fill="#92400e">フィンガー分割磁性ビア（GHz Q値 +30%）＋ 閉磁路Bループ</text>
          <rect x="76" y="249" width="222" height="32" rx="5" fill="#fef3c7" stroke="#d97706"/>
          <text x="187" y="262" text-anchor="middle" font-size="7.1" font-weight="900" fill="#78350f">空芯比 51× 密度 (L利得 最大9.1×)</text>
          <text x="187" y="274.5" text-anchor="middle" font-size="6.6" font-weight="800" fill="#92400e">5μm厚Cu 39巻 · 高さ150μm · k = 0.5–0.89</text>

          <!-- Circular Microscope Loupe: Hard-Axis Anisotropic Domain Rotation (No Domain-Wall Hysteresis!) -->
          <g clip-path="url(#${p}_loupe)">
            <circle cx="342" cy="186" r="42" fill="#0f172a"/>
            <!-- Easy-axis parallel magnetic spins rotating coherently under RF H_rf field -->
            ${[-20, -6, 8, 22].map((dy) => `
              <line x1="312" y1="${186 + dy}" x2="368" y2="${186 + dy}" stroke="#38bdf8" stroke-width="1.2" opacity="0.45"/>
              <line x1="322" y1="${186 + dy}" x2="358" y2="${186 + dy - 7}" stroke="#fde047" stroke-width="1.7" marker-end="url(#${p}_arr_gold)"/>
            `).join('')}
            <text x="342" y="156" text-anchor="middle" font-size="6.2" font-weight="900" fill="#38bdf8">H_rf 困難軸励磁</text>
            <text x="342" y="220" text-anchor="middle" font-size="6.0" font-weight="900" fill="#fde047">磁壁損失ゼロ!</text>
          </g>
          ${loupeFrame(342, 186, 42, '困難軸スピン回転', '#b45309')}

          <!-- RIGHT TOP PANEL: L-Density & Quality Factor Q vs Frequency Plot (10 MHz - 1 GHz) -->
          <rect x="408" y="78" width="290" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="553" y="93" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">周波数 vs インダクタンス密度 ＆ Q値（100–200 MHz帯域）</text>
          <line x1="444" y1="104" x2="444" y2="190" stroke="#475569" stroke-width="1.1"/>
          <line x1="444" y1="190" x2="684" y2="190" stroke="#475569" stroke-width="1.1"/>
          ${['10M', '50M', '100M', '200M', '500M', '1GHz'].map((f, i) => `
            <line x1="${452 + i * 44}" y1="104" x2="${452 + i * 44}" y2="190" stroke="#f1f5f9" stroke-width="0.8"/>
            <text x="${452 + i * 44}" y="201" text-anchor="middle" font-size="6.1" font-weight="700" fill="#475569">${f}</text>
          `).join('')}
          <!-- Air-core flat low line -->
          <line x1="446" y1="184" x2="682" y2="184" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="3 2"/>
          <text x="486" y="181" font-size="6.3" font-weight="800" fill="#64748b">空芯 (~5 nH/mm²)</text>
          <!-- Laminated CZTB/AlN L-density flat plateau -->
          <path d="M 446 118 L 584 118 Q 624 120 656 144 L 680 166" fill="none" stroke="#b45309" stroke-width="2.5"/>
          <text x="518" y="114" text-anchor="middle" font-size="6.9" font-weight="900" fill="#b45309">CZTB/AlN: 127–290 nH/mm²</text>
          <!-- Q-factor bell curve peaking 100-200 MHz -->
          <path d="M 446 176 Q 510 144 558 128 Q 604 134 654 176" fill="none" stroke="#0284c7" stroke-width="2.2"/>
          <circle cx="562" cy="128" r="3.6" fill="#0284c7" stroke="#ffffff" stroke-width="1"/>
          <text x="562" y="144" text-anchor="middle" font-size="6.8" font-weight="900" fill="#0369a1">Q = 15–30</text>
          <text x="564" y="209.5" text-anchor="middle" font-size="6.4" font-weight="800" fill="#059669">FIVR 1.8V→0.9V · 効率 96.0–97.8% · L/R_DC=323 nH/Ω · &lt;100ns DVFS</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(408, 219, 141, 73, 'L密度 & 電流密度', '127–290 nH/mm²', '>11 A/mm² · HF 3500nH記録', '#b45309')}
          ${kpiCard(557, 219, 141, 73, 'ピーク変換効率 η', '96.0–97.8%', 'L/R_DC = 323 nH/Ω', '#059669')}

          ${cleanPin(187, 290, 187, 300, 82, 319, 1, '積層CoZrTaB / 4nm AlN ＋ 磁性ビア', '4nm絶縁層とフィンガー分割ビアで200MHz帯の渦電流損を徹底抑制', '#b45309')}
          ${cleanPin(553, 292, 553, 300, 386, 319, 2, '多相結合FIVR (<100ns独立DVFS)', 'NPU/ISP/CPU各コアへ最適電圧を瞬間供給し撮影と待機の電池寿命を延伸', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '異方性軟磁性CoZrTaB(CZTB)と4nm AlN絶縁膜を多層積層＋フィンガー磁性ビアで閉磁路化', line2: '困難軸スピン回転と厚膜Cuソレノイド巻線で100–200MHz帯の高Q(15–30)と空芯比51倍密度を実現' },
          { label: '撮影・画質への恩恵', line1: '基板外の大型コイルをチップ上へ統合し100ns未満の超高速コア別DVFS省電力制御を実現', line2: '96.0–97.8%の高効率変換により8K動画やAI処理中の発熱とバッテリー消費を劇的低減' },
          { label: '実機・学会諸元', line1: 'モノリシックCMOS薄膜磁性FIVR実証（127–290 nH/mm²・L/R_DC = 323 nH/Ω・最大9.1×L利得）', line2: '電流密度 >11 A/mm²・結合係数 k = 0.5–0.89・フィンガー磁性ビアでGHz帯Q値 +30%向上' },
        ],
      });

    // =========================================================================
    // X2-94. TSMC 2026 Single-Crystal 4H-SiC Thermal/Mechanical/Optical Interposer
    // =========================================================================
    case 'xv2_sic_single_crystal_interposer':
      return renderBionzV2Hd({
        badge: 'X2-94',
        zone: 'pkg35d',
        nodeTag: 'TSMC 2026 · 4H-SiC Interposer',
        title: 'TSMC 2026「単結晶4H-SiC 超高熱伝導・高剛性・光電統合インターポーザ」',
        analogy: '銅より速く熱を逃がしシリコンの2.6倍硬い宝石級基板で、巨大3Dチップの反り・熱・高圧電源・光配線を一挙制圧',
        metric: '~490 W/m·K · 410 GPa',
        scaleLabel: '3.3× Si THERMAL · 2.6× STIFF',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        defsExtra: (p) => `
          <clipPath id="${p}_loupe"><circle cx="354" cy="190" r="36"/></clipPath>
        `,
        art: (p) => `
          <!-- LEFT PANEL: 3-in-1 Multi-Physics 4H-SiC Interposer Cross-Section + 4H ABCB Stacking Loupe -->
          <rect x="64" y="78" width="338" height="214" rx="9" fill="#ffffff" stroke="#5eead4" stroke-width="1.3"/>
          <rect x="64" y="78" width="338" height="21" rx="9" fill="#f0fdfa"/>
          <rect x="64" y="89" width="338" height="10" fill="#f0fdfa"/>
          <text x="233" y="92.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#115e59">熱・電力・光 三位一体 4H-SiC インターポーザ断面 ＆ レーザTSCV貫通構造</text>

          <!-- Top Chiplets: 2nm XR2 SoC + 8-Hi HBM4 Tower + HV-IVR + Optical Engine -->
          <rect x="74" y="114" width="66" height="32" rx="3" fill="url(#${p}_blue)"/>
          <text x="107" y="128" text-anchor="middle" font-size="7.0" font-weight="900" fill="#ffffff">2nm SoC</text>
          <text x="107" y="139" text-anchor="middle" font-size="6.0" font-weight="700" fill="#fde047">高熱流束源</text>

          <!-- 8-Hi Discrete HBM4 Tower -->
          ${Array.from({ length: 8 }, (_, k) => `<rect x="148" y="${142 - k * 4.2}" width="54" height="3.2" rx="0.8" fill="${k === 0 ? '#0f172a' : '#eab308'}" stroke="#78350f" stroke-width="0.4"/>`).join('')}
          <text x="175" y="109" text-anchor="middle" font-size="6.6" font-weight="900" fill="#92400e">8-Hi HBM4</text>

          <!-- HV-IVR & Optical Engine -->
          <rect x="210" y="120" width="44" height="26" rx="3" fill="url(#${p}_hfo2)"/>
          <text x="232" y="135" text-anchor="middle" font-size="6.4" font-weight="900" fill="#ffffff">HV-IVR</text>
          <rect x="260" y="120" width="44" height="26" rx="3" fill="url(#${p}_laser)"/>
          <text x="282" y="135" text-anchor="middle" font-size="6.4" font-weight="900" fill="#ffffff">CPO光</text>

          <!-- Fine 2/2 μm RDL Routing Layer + Micro-bumps -->
          <rect x="74" y="150" width="230" height="12" rx="2" fill="url(#${p}_cu)"/>
          <text x="189" y="158.5" text-anchor="middle" font-size="6.4" font-weight="900" fill="#ffffff">2/2 μm 微細RDL再配線 ＋ ハイブリッド接合</text>

          <!-- Main Single-Crystal 4H-SiC Interposer Slab with Laser-Drilled TSCVs + Lateral Heat Spread Arrows -->
          <rect x="74" y="164" width="230" height="72" rx="4" fill="url(#${p}_emerald)" stroke="#0f766e" stroke-width="1.2"/>
          <!-- 4 Laser-Drilled TSCVs with Annular SiO2 Isolation Liners -->
          ${[94, 152, 224, 280].map((vx) => `
            <rect x="${vx - 7}" y="164" width="14" height="72" fill="#e0f2fe"/>
            <rect x="${vx - 4}" y="164" width="8" height="72" fill="url(#${p}_cu)"/>
          `).join('')}
          <!-- Lateral 490 W/mK Heat Spreading Arrows (Faster than Copper!) -->
          <line x1="112" y1="184" x2="210" y2="184" stroke="#fde047" stroke-width="2.2" marker-end="url(#${p}_arr_gold)"/>
          <line x1="112" y1="204" x2="186" y2="204" stroke="#fde047" stroke-width="1.8" marker-end="url(#${p}_arr_gold)"/>
          <rect x="116" y="168" width="102" height="13" rx="3" fill="#064e3b" fill-opacity="0.88"/>
          <text x="167" y="177" text-anchor="middle" font-size="6.6" font-weight="900" fill="#fde047">水平放熱 490 W/m·K!</text>
          <!-- Optical Waveguide Core inside Transparent SiC -->
          <line x1="234" y1="220" x2="298" y2="220" stroke="#f472b6" stroke-width="2.6" marker-end="url(#${p}_arr_pink)"/>
          <text x="258" y="213" text-anchor="middle" font-size="6.0" font-weight="900" fill="#fbcfe8">低損失光導波</text>

          <!-- Bottom Package Substrate + C4 Bumps -->
          ${Array.from({ length: 10 }, (_, k) => `<circle cx="${86 + k * 23}" cy="242" r="4.5" fill="url(#${p}_ru)"/>`).join('')}
          <rect x="74" y="248" width="230" height="16" rx="3" fill="#334155"/>
          <text x="189" y="259" text-anchor="middle" font-size="6.8" font-weight="800" fill="#e2e8f0">大型ABFパッケージ基板（反り激減：410–450 GPa高剛性）</text>
          <text x="189" y="278" text-anchor="middle" font-size="6.7" font-weight="900" fill="#0f766e">レーザ貫通TSCV＋SiO₂ライナで熱・高耐圧電源(2.8MV/cm)・光を単一基板化</text>

          <!-- Circular Crystal Loupe: 4H-SiC Hexagonal ABCB Stacking Polytype -->
          <g clip-path="url(#${p}_loupe)">
            <circle cx="354" cy="190" r="36" fill="#0f172a"/>
            ${[
              { y: 166, lbl: 'A', off: 0 },
              { y: 180, lbl: 'B', off: 7 },
              { y: 194, lbl: 'C', off: 14 },
              { y: 208, lbl: 'B', off: 7 },
            ].map((st, idx) => `
              <line x1="330" y1="${st.y}" x2="378" y2="${st.y}" stroke="#14b8a6" stroke-width="1" opacity="0.6"/>
              <circle cx="${338 + st.off}" cy="${st.y}" r="4.0" fill="#14b8a6" stroke="#ffffff" stroke-width="0.6"/>
              <circle cx="${358 + st.off * 0.5}" cy="${st.y}" r="3.0" fill="#fde047"/>
              <text x="325" y="${st.y + 2.3}" font-size="6.0" font-weight="900" fill="#5eead4">${st.lbl}</text>
              ${idx < 3 ? `<line x1="${338 + st.off}" y1="${st.y}" x2="${338 + [7, 14, 7][idx]}" y2="${st.y + 14}" stroke="#5eead4" stroke-width="1.2"/>` : ''}
            `).join('')}
            <text x="354" y="220" text-anchor="middle" font-size="5.6" font-weight="900" fill="#fde047">4H-SiC 強共有結合</text>
          </g>
          ${loupeFrame(354, 190, 36, '4H-SiC ABCB', '#0d9488')}

          <!-- RIGHT TOP PANEL: Multi-Physics Benchmark (Si vs Glass vs Single-Crystal 4H-SiC) -->
          <rect x="410" y="78" width="288" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="554" y="93" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">インターポーザ材料3大物性比較：Si vs ガラス vs 4H-SiC</text>
          ${[
            { lbl: '熱伝導 κ (W/m·K)', bars: [{ n: 'Si', v: '148', w: 48, c: '#94a3b8' }, { n: '4H-SiC', v: '490 (3.3×!)', w: 158, c: '#0d9488' }] },
            { lbl: 'ヤング率 E (GPa)', bars: [{ n: 'Si', v: '165', w: 58, c: '#94a3b8' }, { n: '4H-SiC', v: '410–450 (2.6×!)', w: 146, c: '#0284c7' }] },
            { lbl: '破壊電界 (MV/cm)', bars: [{ n: 'Si', v: '0.3', w: 18, c: '#94a3b8' }, { n: '4H-SiC', v: '2.8 (9.3×!)', w: 156, c: '#7c3aed' }] },
          ].map((m, idx) => `
            <text x="418" y="${111 + idx * 34}" font-size="6.9" font-weight="900" fill="#0f172a">${m.lbl}</text>
            <rect x="418" y="${114 + idx * 34}" width="${m.bars[0].w}" height="9" rx="2" fill="${m.bars[0].c}"/>
            <text x="${422 + m.bars[0].w}" y="${121 + idx * 34}" font-size="6.2" font-weight="800" fill="#475569">${m.bars[0].n}: ${m.bars[0].v}</text>
            <rect x="418" y="${125 + idx * 34}" width="${m.bars[1].w}" height="11" rx="2.5" fill="${m.bars[1].c}"/>
            <text x="${423 + m.bars[1].w}" y="${133 + idx * 34}" font-size="6.6" font-weight="900" fill="${m.bars[1].c}">${m.bars[1].v}</text>
          `).join('')}

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(410, 219, 140, 73, '銅(400)超え熱拡散', '~490 W/m·K', 'HBM4/光素子への熱干渉遮断', '#0d9488')}
          ${kpiCard(558, 219, 140, 73, '超大型反り抑制', '410–450 GPa', '9.5×レチクル平坦維持', '#0284c7')}

          ${cleanPin(189, 290, 189, 300, 82, 319, 1, '銅を上回る単結晶4H-SiC横方向放熱', '基板自体がヒートスプレッダとなりSoCの熱からHBM4・光変調器を隔離', '#0d9488')}
          ${cleanPin(554, 292, 554, 300, 386, 319, 2, '2.8 MV/cm高耐圧＋光透過の3機能統合', 'HV-IVR電源とCPO光導波路を単一SiCインターポーザへ直接集積', '#7c3aed')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'シリコンに替わり単結晶4H-SiCとレーザ貫通TSCVを採用した次世代3機能統合インターポーザ', line2: '銅を超える約490 W/m·Kの熱伝導率と410–450 GPaの高剛性で巨大3Dパッケージ反りを制圧' },
          { label: '撮影・画質への恩恵', line1: '発熱の激しいAI/ISPチップレットから隣接する熱敏感な8-Hi HBM4や光素子への熱漏れを遮断', line2: '極低反りと高耐圧により長時間撮影の温度サイクル下でも微細ハイブリッド接合の信頼性を保護' },
          { label: '実機・2026学会諸元', line1: 'TSMC 2026先端パッケージ探索戦略（9.5×レチクル次世代CoWoS・HV-IVR/CPO統合）', line2: '熱伝導率 ~370–490 W/m·K (Si比 3.3×)・ヤング率 410–450 GPa (2.6×)・破壊電界 2.8 MV/cm' },
        ],
      });

    // =========================================================================
    // X2-95. TSMC CoPoS 310x310mm Rectangular Panel-Level RDL Packaging
    // =========================================================================
    case 'xv2_tsmc_copos_panel_packaging':
      return renderBionzV2Hd({
        badge: 'X2-95',
        zone: 'pkg35d',
        nodeTag: 'TSMC 2026 · CoPoS 310mm',
        title: 'TSMC CoPoS（Chip-on-Panel-on-Substrate）「310×310 mm 角型パネルレベルRDL」',
        analogy: '丸いウェハ外周の無駄な切り落としを無くし、18インチ相当の角型パネルへ大型パッケージを隙間なく敷き詰める革命',
        metric: '310×310 mm · 96,100 mm²',
        scaleLabel: 'TTV ≤2μm · Ra<0.5nm · 128-CMP',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        art: (p) => `
          <!-- LEFT PANEL: Geometric Ø300mm Wafer Waste vs 310x310mm Chamfered CoPoS Panel + Stack Cross-Section -->
          <rect x="64" y="78" width="342" height="214" rx="9" fill="#ffffff" stroke="#a5b4fc" stroke-width="1.3"/>
          <rect x="64" y="78" width="342" height="21" rx="9" fill="#eef2ff"/>
          <rect x="64" y="89" width="342" height="10" fill="#eef2ff"/>
          <text x="235" y="92.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#3730a3">丸型Ø300mmウェハ(CoWoS) vs 角型310×310mmパネル(CoPoS) 取得面積比較</text>

          <!-- Left Circle: Ø300 mm Wafer with Red Hatched Edge Waste -->
          <circle cx="144" cy="166" r="56" fill="#fee2e2" stroke="#dc2626" stroke-width="1.3"/>
          <circle cx="144" cy="166" r="56" fill="url(#${p}_hatch)"/>
          ${[0, 1].map((r) => [0, 1].map((c) => `
            <rect x="${109 + c * 36}" y="${133 + r * 34}" width="33" height="31" rx="2.5" fill="url(#${p}_ru)" stroke="#334155" stroke-width="0.9"/>
          `).join('')).join('')}
          <text x="144" y="233" text-anchor="middle" font-size="6.9" font-weight="900" fill="#b91c1c">× Ø300mm円盤 (70,685 mm²)</text>
          <text x="144" y="243" text-anchor="middle" font-size="6.3" font-weight="700" fill="#7f1d1d">外周デッド域大 → 大型4個のみ</text>

          <!-- Transition Arrow -->
          <line x1="205" y1="166" x2="232" y2="166" stroke="#4f46e5" stroke-width="2.2" marker-end="url(#${p}_arr_blue)"/>
          <text x="218" y="159" text-anchor="middle" font-size="6.3" font-weight="900" fill="#4f46e5">+36%</text>

          <!-- Right Square: 310x310mm Chamfered-Corner CoPoS Panel (438mm diag = 18" ingot) -->
          <polygon points="246,108 352,108 360,116 360,216 352,224 246,224 238,216 238,116" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.8"/>
          ${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `
            <rect x="${244 + c * 37}" y="${114 + r * 35}" width="34" height="32" rx="2" fill="url(#${p}_blue)"/>
            <rect x="${247 + c * 37}" y="${118 + r * 35}" width="15" height="24" rx="1" fill="url(#${p}_cyan)"/>
            <rect x="${264 + c * 37}" y="${118 + r * 35}" width="10" height="10" rx="1" fill="url(#${p}_gold)"/>
            <rect x="${264 + c * 37}" y="${132 + r * 35}" width="10" height="10" rx="1" fill="url(#${p}_gold)"/>
          `).join('')).join('')}
          <text x="299" y="233" text-anchor="middle" font-size="6.9" font-weight="900" fill="#047857">○ 310×310mm角型 (96,100 mm²)</text>
          <text x="299" y="243" text-anchor="middle" font-size="6.3" font-weight="800" fill="#065f46">4辺面取りEFEM · 9個高密度取得!</text>

          <!-- Bottom Mini Cross-Section: 128-Zone Dynamic CMP + Si3N4 Stress-Comp + Glass Core TGV -->
          <rect x="74" y="250" width="322" height="34" rx="5" fill="#0f172a" stroke="#6366f1"/>
          <rect x="82" y="255" width="306" height="8" rx="1.5" fill="url(#${p}_cu)"/>
          <text x="235" y="261.5" text-anchor="middle" font-size="6.0" font-weight="900" fill="#ffffff">128ゾーン動的圧力CMP (±3% · TTV ≤ 2 μm · Ra &lt; 0.5 nm RMS) ＋ 2/2 μm RDL</text>
          <rect x="82" y="265" width="306" height="9" rx="1.5" fill="url(#${p}_glass)" stroke="#6366f1"/>
          <text x="235" y="272" text-anchor="middle" font-size="6.0" font-weight="900" fill="#1e1b4b">400–800 μm ガラスコア(TGV) ＋ 裏面 Si₃N₄ 応力補償膜 (反り ≤ 75 μm)</text>

          <!-- RIGHT TOP PANEL: TSMC CoPoS Scaling Roadmap (2026 Pilot -> 2028 HVM -> 2030 510x515mm) -->
          <rect x="414" y="78" width="284" height="134" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="556" y="93" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">TSMC CoPoS 量産ロードマップ ＆ 帯域拡張カーブ</text>
          <line x1="444" y1="106" x2="444" y2="188" stroke="#475569" stroke-width="1.1"/>
          <line x1="444" y1="188" x2="684" y2="188" stroke="#475569" stroke-width="1.1"/>
          <!-- Roadmap Milestones as Ascending Bar + Bandwidth Curve -->
          ${[
            { x: 462, yr: '2026 試作', sz: '310×310', bw: '歩留68%', h: 36, c: '#818cf8' },
            { x: 540, yr: '2028 量産', sz: '310×310', bw: '15 TB/s', h: 58, c: '#4f46e5' },
            { x: 618, yr: '2030 次世代', sz: '510×515', bw: '30 TB/s!', h: 78, c: '#059669' },
          ].map((m) => `
            <rect x="${m.x}" y="${188 - m.h}" width="54" height="${m.h}" rx="4" fill="${m.c}"/>
            <text x="${m.x + 27}" y="${184 - m.h}" text-anchor="middle" font-size="6.8" font-weight="900" fill="${m.c}">${m.bw}</text>
            <text x="${m.x + 27}" y="${198}" text-anchor="middle" font-size="6.4" font-weight="800" fill="#0f172a">${m.yr}</text>
            <text x="${m.x + 27}" y="${178}" text-anchor="middle" font-size="6.2" font-weight="900" fill="#ffffff">${m.sz}</text>
          `).join('')}
          <text x="564" y="209" text-anchor="middle" font-size="6.3" font-weight="800" fill="#3730a3">4× Rubin級SoC+12 HBM4 (2028) → 9-Reticle+36 HBM4E (2030)</text>

          <!-- RIGHT BOTTOM KPI CARDS -->
          ${kpiCard(414, 219, 138, 73, 'パネル平面度 / 粗さ', 'TTV ≤ 2 μm', 'Ra < 0.5 nm · 反り ≤ 75μm', '#4f46e5')}
          ${kpiCard(560, 219, 138, 73, '大型ダイ有効取得', '最大 2.0× 増', '18"相当角型インゴット切出', '#059669')}

          ${cleanPin(235, 290, 235, 300, 82, 319, 1, '128ゾーンCMP ＋ Si₃N₄反り補償ガラスコア', '310mm角型の巨大反りを75μm以下へ抑え2/2μm微細RDL歩留りを確立', '#4f46e5')}
          ${cleanPin(556, 292, 556, 300, 386, 319, 2, '310×310mm → 510×515mm パネル拡張', '大型マルチレチクル実装コストを劇減させ先端3.5D実装をカメラSoCへ波及', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '円形Ø300mmウェハから角型310×310mm(96,100mm²・対角438mm)へ移行するTSMC CoPoS', line2: '128ゾーン動的圧力CMP(TTV≤2μm・Ra<0.5nm)とSi₃N₄応力補償ガラスコアで2/2μm RDLを統合' },
          { label: '撮影・画質への恩恵', line1: 'BIONZ XR2＋AIチップレット＋HBM4の超大型マルチダイ実装コストと供給制約を根本解消', line2: '外周ロス撲滅により大型パッケージ有効取得数を最大2倍へ引き上げ先端3.5D実装を普及' },
          { label: '実機・2026学会諸元', line1: 'TSMC 2026年パイロット(歩留68%)→2028年量産(13–15 TB/s)→510×515mm(9レチクル・36 HBM4E)', line2: '面積 96,100 mm²(300mm比+36%)・Siインターポーザ100–200μm/ガラスコア400–800μm・反り≤75μm' },
        ],
      });

    default:
      return null;
  }
}
