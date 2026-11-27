import { PartExplanation } from '../../assemblies/types';
import {
  cmpBanner,
  dimArrow,
  kpiCard,
  nanoPin,
  renderBionzV2Hd,
} from './shared';

/**
 * Ultra-HD 720x500 Nanoscale Technical Schematics for BIONZ V2 Group C (X2-31 – X2-43):
 * NanoFlex 40nm/15nm, Hybrid Si(110)/Si(100) CFET, 0.7nm 2D MoS2, O-radical/H-radical IL,
 * CFET NCI & BCT, CFET Epi-Via & Dual BDI, Samsung 42nm 3+3 eMDI, Intel 18A-P Dual Boost,
 * 16nm sRu Keyhole Air-Gap & FSAV, High-NA EUV Anamorphic & MOR, A7 2:1 Gear-Ratio M0/M1,
 * NBTI/PBTI Canary Monitor, and Backside nTSV TiSi2 Landing.
 */
export function renderBionzV2GroupC(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // X2-31. TSMC N2/A16 NanoFlex Variable-Width GAA Pair (40nm HPC vs 15nm Dense)
    case 'xv2_nanoflex_width_pair':
      return renderBionzV2Hd({
        badge: 'X2-31',
        zone: 'feol',
        nodeTag: 'TSMC N2/A16 · VLSI 2026 T1.5',
        title: 'TSMC N2/A16「NanoFlex 可変シート幅 GAAナノシート対」（40nm高速／15nm省電力）',
        analogy: '水道管の本数ではなく「太さ」をセル単位で連続調整し、同一区画に爆速と超省エネを混載',
        metric: 'W_ns = 15 nm 〜 40 nm 可変',
        scaleLabel: 'NANOFLEX CONTINUOUS WIDTH',
        accent: '#0ea5e9',
        accentSoft: '#f0f9ff',
        art: (p) => `
          <!-- Left: 40nm Wide High-Drive Cell -->
          <rect x="74" y="88" width="214" height="192" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="1.4"/>
          <text x="181" y="108" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0369a1">広幅 40 nm（高速HPC・AI臨界路）</text>
          <rect x="96" y="122" width="170" height="118" rx="6" fill="url(#${p}_gold)" stroke="#a16207"/>
          ${[134, 168, 202].map((y) => `
            <rect x="108" y="${y}" width="146" height="22" rx="4" fill="url(#${p}_cyan)" stroke="#e0f2fe"/>
            <text x="181" y="${y + 14.5}" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">40 nm 広幅ナノシート（大電流）</text>
          `).join('')}
          ${dimArrow(108, 256, 254, 256, 'W_ns = 40 nm', '#0284c7')}

          <!-- Shared Continuous Gate Bridge -->
          <rect x="288" y="168" width="38" height="24" fill="url(#${p}_gold)"/>
          <text x="307" y="160" text-anchor="middle" font-size="7.8" font-weight="800" fill="#a16207">直結</text>

          <!-- Center: 15nm Narrow Ultra-Dense Cell -->
          <rect x="326" y="88" width="166" height="192" rx="10" fill="#ffffff" stroke="#059669" stroke-width="1.4"/>
          <text x="409" y="108" text-anchor="middle" font-size="9.6" font-weight="900" fill="#065f46">狭幅 15 nm（高密度・SRAM）</text>
          <rect x="366" y="122" width="86" height="118" rx="6" fill="url(#${p}_gold)" stroke="#a16207"/>
          ${[134, 168, 202].map((y) => `
            <rect x="378" y="${y}" width="62" height="22" rx="4" fill="url(#${p}_emerald)" stroke="#d1fae5"/>
            <text x="409" y="${y + 14.5}" text-anchor="middle" font-size="8.2" font-weight="900" fill="#fff">15 nm</text>
          `).join('')}
          ${dimArrow(378, 256, 440, 256, '15 nm', '#059669')}

          <!-- Right Panel: PPA Trade-off Curve -->
          <rect x="510" y="88" width="182" height="192" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="601" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">FinFET量子化 vs NanoFlex</text>
          <line x1="528" y1="244" x2="676" y2="244" stroke="#475569" stroke-width="1.2"/>
          <line x1="528" y1="126" x2="528" y2="244" stroke="#475569" stroke-width="1.2"/>
          <!-- FinFET stepped discrete points -->
          <circle cx="556" cy="214" r="4.5" fill="#94a3b8"/>
          <circle cx="604" cy="180" r="4.5" fill="#94a3b8"/>
          <circle cx="652" cy="144" r="4.5" fill="#94a3b8"/>
          <!-- NanoFlex smooth continuous curve -->
          <path d="M 540 226 Q 596 172 666 132" fill="none" stroke="#0284c7" stroke-width="2.8"/>
          <text x="604" y="262" text-anchor="middle" font-size="8.0" font-weight="700" fill="#475569">セル面積 / リーク電力 →</text>
          <text x="604" y="125" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0284c7">連続最適化（1.7本Fin相当OK!）</text>

          ${nanoPin(181, 214, 92, 314, 1, 'I_drive ∝ 2·N·(W_ns + T_ns)', '必要箇所だけワイド幅で遅延短縮', '#0284c7', 'start')}
          ${nanoPin(409, 214, 376, 314, 2, '同一ブロック内で無段混載', 'ブロック分割ロスなしでPPA最適化', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'FinFETの整数本数制約から脱却しシート幅を15–40nm連続可変', line2: 'ショート/トール混載セルを単一ゲート列へシームレス配置' },
          { label: '撮影・画質への恩恵', line1: 'AI瞳AF・8Kデコード急所を高速化し非臨界9割を極省電力化', line2: 'チップ面積とバッテリー消費の最適バランスを自動達成' },
          { label: '実機・2026学会諸元', line1: 'TSMC N2 / N2P / A16（VLSI 2026 Paper T1.5）標準技術', line2: 'N3E比 速度+15–18% または 電力−30–36%へ直結' },
        ],
      });

    // X2-32. Hybrid-Orientation Monolithic CFET (Si(110) pMOS / Si(100) nMOS, IEDM 2025 Paper 2.2)
    case 'xv2_hybrid_orient_cfet':
      return renderBionzV2Hd({
        badge: 'X2-32',
        zone: 'feol',
        nodeTag: 'IEDM 2025 · Paper 2.2',
        title: 'ハイブリッド結晶方位モノリシックCFET「Si(110) pMOS × Si(100) nMOS」',
        analogy: '上階は電子が最速の結晶向き、下階は正孔が2.5倍速い結晶向きを直接貼り合わせた究極2階建て',
        metric: '正孔移動度 2.5倍! (Si110)',
        scaleLabel: 'DIRECT BONDED HYBRID ORIENTATION',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- Two-Story Hybrid-Orientation CFET Cross Section -->
          <rect x="74" y="88" width="384" height="196" rx="10" fill="#ffffff" stroke="#c4b5fd" stroke-width="1.3"/>
          <!-- Upper Tier: Si(100) Cubic Lattice for nMOS (Peak Electron Mobility) -->
          <rect x="96" y="102" width="340" height="68" rx="6" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.3"/>
          <text x="266" y="122" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">上層 nMOS：Si(100) 結晶方位（電子移動度 最大!）</text>
          ${Array.from({ length: 8 }, (_, i) => `<rect x="${126 + i * 36}" y="136" width="14" height="14" fill="#e0f2fe" stroke="#0369a1"/>`).join('')}
          <text x="266" y="164" text-anchor="middle" font-size="8.0" font-weight="800" fill="#e0f2fe">立方格子 &lt;100&gt; 配列 → 電子散乱最小</text>

          <!-- Direct Wafer-Bonded Ultra-Thin SiO2 Seam -->
          <rect x="90" y="176" width="352" height="18" rx="3" fill="url(#${p}_gold)" stroke="#a16207"/>
          <text x="266" y="188.5" text-anchor="middle" font-size="8.4" font-weight="900" fill="#713f12">超薄直接ウェハー接合 SiO₂ シーム（異方位結晶を無欠陥融合）</text>

          <!-- Lower Tier: Si(110) 45-deg Diamond Lattice for pMOS (2.5x Hole Mobility!) -->
          <rect x="96" y="200" width="340" height="72" rx="6" fill="url(#${p}_sige)" stroke="#9f1239" stroke-width="1.3"/>
          <text x="266" y="220" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">下層 pMOS：Si(110) 結晶方位（正孔移動度 2.5倍!）</text>
          ${Array.from({ length: 8 }, (_, i) => `<polygon points="${133 + i * 36},232 ${141 + i * 36},240 ${133 + i * 36},248 ${125 + i * 36},240" fill="#ffe4e6" stroke="#881337"/>`).join('')}
          <text x="266" y="264" text-anchor="middle" font-size="8.0" font-weight="800" fill="#ffe4e6">45°回転 &lt;110&gt; 結晶面 → 正孔有効質量を劇的軽減</text>

          <!-- Right Mobility Chart -->
          <rect x="478" y="88" width="214" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="585" y="108" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">正孔移動度 μ_h 比較</text>
          <text x="492" y="136" font-size="8.4" font-weight="700" fill="#64748b">従来 Si(100) pMOS</text>
          <rect x="492" y="142" width="68" height="16" rx="4" fill="#94a3b8"/>
          <text x="568" y="154" font-size="8.6" font-weight="800" fill="#475569">1.0×</text>

          <text x="492" y="182" font-size="8.4" font-weight="900" fill="#be123c">Hybrid Si(110) pMOS</text>
          <rect x="492" y="188" width="172" height="18" rx="4" fill="url(#${p}_sige)"/>
          <text x="578" y="201" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">2.5× 正孔駆動力!</text>
          ${kpiCard(492, 218, 186, 54, 'n/p 対称スイッチング', '立ち上がり遅延大幅短縮', 'IEDM 2025 Paper 2.2実証', '#7c3aed')}

          ${nanoPin(266, 185, 92, 314, 1, '直接ウェハー貼り合わせ接合', '単一エピでは不可能な異方位共存', '#d97706', 'start')}
          ${nanoPin(360, 240, 376, 314, 2, 'pMOSの弱点(遅い正孔)を結晶物理で突破', 'CMOSインバータ対称性大幅改善', '#be123c', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '上層nMOSへSi(100)、下層pMOSへSi(110)をウェハー直接接合', line2: '電子と正孔それぞれに最適な結晶面方位を2階建て共存' },
          { label: '撮影・画質への恩恵', line1: '従来pMOSが足を引っ張っていたCMOS遅延を根本から解消', line2: '次世代CFET世代でさらに低い電圧・高いクロック動作を実現' },
          { label: '実機・2026学会諸元', line1: '正孔移動度 最大2.5×（vs 標準Si(100)チャネル）', line2: 'IEDM 2025 Paper 2.2 ハイブリッド方位CFET実証' },
        ],
      });

    // X2-33. 0.7nm Atomic Monolayer 2D TMD (MoS2 / WSe2) Honeycomb Channel FET
    case 'xv2_2d_tmd_mos2_channel':
      return renderBionzV2Hd({
        badge: 'X2-33',
        zone: 'feol',
        nodeTag: 'IEDM 2025 / VLSI 2026 · 2D TMD',
        title: '0.7nm原子単層「2D TMD（MoS₂ / WSe₂）蜂の巣チャネルFET」',
        analogy: 'シリコンが限界を迎える1nm以下で、原子わずか3層（0.7nm）の魔法シートが電子を無散乱輸送',
        metric: 'チャネル厚 0.7 nm (原子3層)',
        scaleLabel: 'MONOLAYER 2H-MoS₂: 0.65 nm',
        accent: '#9333ea',
        accentSoft: '#faf5ff',
        art: (p) => `
          <!-- Left: Atomic-Scale Trigonal-Prismatic 2H-MoS2 Cross-Section & Bi/Sb vdW Contacts -->
          <rect x="74" y="88" width="406" height="196" rx="10" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
          <text x="277" y="107" text-anchor="middle" font-size="9.6" font-weight="800" fill="#e9d5ff">0.7nm 単層 2H-MoS₂（S–Mo–S 3原子層）＋ Bi/Sb 半金属 vdW 電極</text>

          <!-- Bi/Sb Semimetal Top Contacts (Zero Fermi-Level Pinning!) -->
          <rect x="96" y="122" width="76" height="44" rx="5" fill="url(#${p}_ru)" stroke="#cbd5e1"/>
          <text x="134" y="142" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0f172a">Bi / Sb</text>
          <text x="134" y="156" text-anchor="middle" font-size="7.6" font-weight="700" fill="#334155">Source</text>

          <rect x="382" y="122" width="76" height="44" rx="5" fill="url(#${p}_ru)" stroke="#cbd5e1"/>
          <text x="420" y="142" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0f172a">Bi / Sb</text>
          <text x="420" y="156" text-anchor="middle" font-size="7.6" font-weight="700" fill="#334155">Drain</text>

          <!-- Top Gate + High-k -->
          <rect x="206" y="118" width="142" height="24" rx="4" fill="url(#${p}_gold)"/>
          <text x="277" y="133.5" text-anchor="middle" font-size="8.4" font-weight="900" fill="#713f12">トップゲート (L_g &lt; 10nm)</text>
          <rect x="206" y="144" width="142" height="16" rx="2" fill="url(#${p}_hfo2)"/>
          <text x="277" y="155" text-anchor="middle" font-size="7.6" font-weight="800" fill="#fff">SEED + ALD HfO₂</text>

          <!-- 0.7nm S-Mo-S Atomic Monolayer Chain (Zero Dangling Bonds!) -->
          <line x1="100" y1="184" x2="454" y2="184" stroke="#a855f7" stroke-width="2" opacity="0.55"/>
          ${Array.from({ length: 9 }, (_, i) => {
            const x = 114 + i * 41;
            return `
              <line x1="${x}" y1="184" x2="${x - 10}" y2="173" stroke="#94a3b8" stroke-width="1.4"/>
              <line x1="${x}" y1="184" x2="${x - 10}" y2="195" stroke="#94a3b8" stroke-width="1.4"/>
              <line x1="${x}" y1="184" x2="${x + 12}" y2="173" stroke="#94a3b8" stroke-width="1.4"/>
              <line x1="${x}" y1="184" x2="${x + 12}" y2="195" stroke="#94a3b8" stroke-width="1.4"/>
              <circle cx="${x - 10}" cy="173" r="4.5" fill="#fde047"/>
              <circle cx="${x - 10}" cy="195" r="4.5" fill="#fde047"/>
              <circle cx="${x}" cy="184" r="6.2" fill="#38bdf8" stroke="#ffffff" stroke-width="0.9"/>
            `;
          }).join('')}
          <text x="277" y="214" text-anchor="middle" font-size="8.2" font-weight="800" fill="#fde047">黄=硫黄(S) · 青=モリブデン(Mo) — 表面未結合手ゼロ!</text>

          <!-- Back-Gate High-k Stack -->
          <rect x="96" y="224" width="362" height="16" rx="2" fill="url(#${p}_hfo2)"/>
          <rect x="96" y="242" width="362" height="24" rx="4" fill="#334155"/>
          <text x="277" y="258" text-anchor="middle" font-size="8.6" font-weight="800" fill="#cbd5e1">デュアル・バックゲート ＆ シリコン基板</text>

          <!-- Right Panel: Why Silicon Fails Below 3nm Thickness -->
          <rect x="498" y="88" width="194" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="595" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">極薄化時の移動度劣化比較</text>
          <text x="510" y="132" font-size="8.2" font-weight="700" fill="#dc2626">Si (&lt; 3nm): 表面粗さ散乱で急落!</text>
          <path d="M 514 148 Q 560 150 618 196 L 672 204" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="4 2"/>
          <text x="510" y="220" font-size="8.2" font-weight="900" fill="#7c3aed">2D MoS₂ (0.7nm): 原子平坦で維持!</text>
          <path d="M 514 148 L 672 152" fill="none" stroke="#7c3aed" stroke-width="2.6"/>
          ${kpiCard(510, 230, 170, 44, 'Bi/Sb 半金属接触', 'R_c < 100 Ω·μm', 'ファンデルワールス無損傷接合', '#9333ea')}

          ${nanoPin(134, 166, 92, 314, 1, 'ファンデルワールス無損傷接触', 'フェルミ準位ピンニングを劇的抑制', '#9333ea', 'start')}
          ${nanoPin(277, 184, 376, 314, 2, 'ゲート長 < 10nm でもリーク極小', 'シリコンの物理限界を超えるポストA7切り札', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '0.7nm単層MoS₂(n)/WSe₂(p)は表面に未結合手が存在しない', line2: 'Bi/Sb半金属コンタクトでショットキー障壁をほぼゼロ化' },
          { label: '撮影・画質への恩恵', line1: 'A7以降の超微細ゲート長でも超高オン/オフ比と省電力を維持', line2: '2Dシートを縦多段積層する超大容量AIチップへの道を拓く' },
          { label: '実機・2026学会諸元', line1: 'チャネル厚 ~0.65–0.7 nm（原子3層）・BEOL低温積層適合', line2: 'TSMC / Intel / imec IEDM 2025 & VLSI 2026 300mm実証' },
        ],
      });

    // X2-34. Radical Oxidation (O* / H*) 0.5nm Interfacial Layer (imec IEDM 2025 Paper 40-1)
    case 'xv2_radical_ox_il_layer':
      return renderBionzV2Hd({
        badge: 'X2-34',
        zone: 'feol',
        nodeTag: 'imec · IEDM 2025 40-1',
        title: '無電荷「O* / H* ラジカル酸化 0.5nmインターフェース層（IL）」',
        analogy: 'イオン衝撃ゼロの中性ラジカル霧で原子2層だけの完璧な下地膜を育て、劣化と漏れを極小化',
        metric: 'IL 0.5 nm / EOT ≈ 0.75 nm',
        scaleLabel: 'INTERFACE LAYER: 0.5 nm',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        art: (p) => `
          <!-- Atomic 5-Layer MOS Stack Diagram -->
          <rect x="74" y="88" width="388" height="196" rx="10" fill="#ffffff" stroke="#a5f3fc" stroke-width="1.3"/>
          <text x="268" y="107" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0e7490">無電荷 O* / H* ラジカル酸化による 5層原子界面断面</text>

          <rect x="96" y="120" width="344" height="28" rx="4" fill="url(#${p}_gold)"/>
          <text x="268" y="138" text-anchor="middle" font-size="9.0" font-weight="900" fill="#713f12">⑤ WFM 仕事関数メタルゲート（TiN / TiAlC）</text>

          <rect x="96" y="150" width="344" height="32" rx="4" fill="url(#${p}_hfo2)"/>
          <text x="268" y="170" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">④ High-k HfO₂ 高誘電率絶縁膜（1.5 nm）</text>

          <!-- Ultra-thin 0.5nm Defect-Free Radical-Ox IL -->
          <rect x="96" y="184" width="344" height="24" rx="3" fill="#22d3ee" stroke="#0891b2" stroke-width="1.4"/>
          <text x="268" y="200" text-anchor="middle" font-size="9.0" font-weight="900" fill="#083344">③ 無電荷 O*/H* ラジカル酸化 IL膜（0.5 nm · 欠陥界面準位 D_it 極小!）</text>

          <!-- Si Channel -->
          <rect x="96" y="210" width="344" height="44" rx="4" fill="url(#${p}_cyan)"/>
          <text x="268" y="236" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">② GAA Si ナノシート単結晶表面（無損傷・原子平坦）</text>

          <!-- Radical Mist Particles Entering Uniformly -->
          <rect x="480" y="88" width="212" height="196" rx="10" fill="#0f172a" stroke="#22d3ee" stroke-width="1.4"/>
          <text x="586" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#67e8f9">プラズマ vs 無電荷ラジカル</text>
          ${cmpBanner(494, 120, 184, '× イオン衝突: 結晶欠陥発生', false)}
          ${cmpBanner(494, 148, 184, '○ 中性O*/H*ラジカル: 損傷0', true)}
          ${[514, 548, 586, 624, 658].map((x, i) => `
            <circle cx="${x}" cy="${192 + (i % 2) * 14}" r="7" fill="${i % 2 === 0 ? '#22d3ee' : '#fde047'}"/>
            <text x="${x}" y="${195 + (i % 2) * 14}" text-anchor="middle" font-size="7.2" font-weight="900" fill="#0f172a">${i % 2 === 0 ? 'O*' : 'H*'}</text>
          `).join('')}
          ${kpiCard(496, 224, 180, 50, '等価酸化膜厚 EOT', '≈ 0.75 nm', 'NBTI/PBTI劣化を劇的抑制', '#0891b2')}

          ${nanoPin(268, 196, 94, 314, 1, '360°全周等方・均一酸化', '狭いシート裏側まで0.5nmぴったり成長', '#0891b2', 'start')}
          ${nanoPin(586, 198, 376, 314, 2, '界面トラップ密度 D_it 極小化', '経年劣化(BTI)と1/f雑音を大幅低減', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '電荷を持たない中性O*/H*ラジカルでSi表面を0.5nm等方酸化', line2: 'プラズマイオン衝撃ゼロで極めて清浄なSi/SiO₂界面を形成' },
          { label: '撮影・画質への恩恵', line1: '長年の撮影使用によるトランジスタしきい値劣化（BTI）を抑制', line2: 'EOT 0.75nmの極限薄化で2nm/A14の高速・低消費電力を実現' },
          { label: '実機・2026学会諸元', line1: 'IL膜厚 ~0.5 nm / EOT ≈ 0.75 nm / 低D_it・低リーク', line2: 'imec IEDM 2025 Paper 40-1 先端GAAゲートスタック実証' },
        ],
      });

    // X2-35. CFET Nanosheet Cut Isolation (NCI) & Vertical Butt Contact (BCT) (TSMC IEDM 2025 2.5)
    case 'xv2_cfet_nci_butt_contact':
      return renderBionzV2Hd({
        badge: 'X2-35',
        zone: 'feol',
        nodeTag: 'TSMC · IEDM 2025 2.5',
        title: 'CFET「ナノシート切断隔離（NCI）＆ 垂直バットコンタクト（BCT）」',
        analogy: '2階建てトランジスタの間を剃刀の壁で仕切り、L字の垂直はしご配線で上下を一発直結',
        metric: '48nm CPP / 101段RO実証',
        scaleLabel: 'TSMC CFET 6T SRAM: 48 nm CPP',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Cross Section: Twin CFET Cells split by NCI Razor Wall + L-Shaped BCT Bridge -->
          <rect x="74" y="88" width="424" height="196" rx="10" fill="#ffffff" stroke="#fde68a" stroke-width="1.3"/>
          <text x="286" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#92400e">TSMC 48nm CPP モノリシックCFET：NCI切断隔離 ＆ L字バットコンタクト</text>

          <!-- Left CFET Stack -->
          <rect x="98" y="122" width="114" height="58" rx="5" fill="url(#${p}_cyan)"/>
          <text x="155" y="154" text-anchor="middle" font-size="9.0" font-weight="900" fill="#fff">上層 nFET (Cell A)</text>
          <rect x="98" y="196" width="114" height="58" rx="5" fill="url(#${p}_sige)"/>
          <text x="155" y="228" text-anchor="middle" font-size="9.0" font-weight="900" fill="#fff">下層 pFET (Cell A)</text>

          <!-- NCI Razor Cut Isolation Wall -->
          <rect x="224" y="114" width="18" height="150" rx="3" fill="#475569" stroke="#0f172a" stroke-width="1.2"/>
          <text x="233" y="192" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fef08a" transform="rotate(-90 233 192)">NCI 切断隔離壁</text>

          <!-- Right CFET Stack -->
          <rect x="254" y="122" width="114" height="58" rx="5" fill="url(#${p}_cyan)"/>
          <text x="311" y="154" text-anchor="middle" font-size="9.0" font-weight="900" fill="#fff">上層 nFET (Cell B)</text>
          <rect x="254" y="196" width="114" height="58" rx="5" fill="url(#${p}_sige)"/>
          <text x="311" y="228" text-anchor="middle" font-size="9.0" font-weight="900" fill="#fff">下層 pFET (Cell B)</text>

          <!-- L-Shaped Vertical Butt Contact (BCT) shorting Upper nFET & Lower pFET Outputs Directly! -->
          <path d="M 368 150 L 424 150 L 424 226 L 368 226" fill="none" stroke="url(#${p}_gold)" stroke-width="14" stroke-linejoin="round"/>
          <path d="M 368 150 L 424 150 L 424 226 L 368 226" fill="none" stroke="#92400e" stroke-width="1.5" stroke-dasharray="4 2"/>
          <text x="454" y="192" text-anchor="middle" font-size="8.8" font-weight="900" fill="#b45309">L字 BCT</text>
          <text x="454" y="205" text-anchor="middle" font-size="7.6" font-weight="700" fill="#78350f">上下直結!</text>

          <!-- Right Panel: TSMC IEDM 2025 Proof Metrics -->
          ${kpiCard(514, 96, 178, 56, '実証インバータ鎖', '101段 Ring Osc', '高歩留まり動作を初実証', '#d97706')}
          ${kpiCard(514, 162, 178, 56, 'ゲートピッチ CPP', '48 nm', 'CFET 6T SRAMセル実証', '#0284c7')}
          ${kpiCard(514, 228, 178, 54, '上層M0配線節約', 'ローカル直結化', 'BCTがセル内結線を完結', '#059669')}

          ${nanoPin(233, 256, 94, 314, 1, 'NCI（Nanosheet Cut Isolation）', '2階建て貫通エッチングで隣接セル分離', '#475569', 'start')}
          ${nanoPin(424, 188, 376, 314, 2, '垂直バットコンタクト（BCT）', 'BEOLへ上げずセル側面で上下出力直結', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '2階建てCFET間を深掘りNCI誘電体壁で一括切断隔離', line2: 'L字型垂直BCTで上層nFETと下層pFETの出力を最短直結' },
          { label: '撮影・画質への恩恵', line1: 'CFET最大の弱点「配線大渋滞」をセル内垂直結線で解消', line2: '将来の超大容量CFET 6T SRAM＆高密度ISPロジックを実現' },
          { label: '実機・2026学会諸元', line1: 'TSMC IEDM 2025 Paper 2.5（48nm CPP 101段RO＆6T SRAM）', line2: '量産を見据えたモノリシックCFET必須モジュール実証' },
        ],
      });

    // X2-36. CFET Epi-to-Epi Vertical Via & Dual Front/Back BDI (Intel / imec VLSI 2026)
    case 'xv2_cfet_epi_via_bdi':
      return renderBionzV2Hd({
        badge: 'X2-36',
        zone: 'feol',
        nodeTag: 'Intel / imec · VLSI 2026',
        title: 'CFET「エピ対エピ垂直ビア ＆ 表裏ダブルBDI絶縁壁」（VLSI 2026）',
        analogy: '上下の結晶同士を直通エレベーター柱で繋ぎ抵抗を1/4以下へ、上下2枚の絶縁床で歩留まり倍増',
        metric: '抵抗 1753→378 Ω·μm / 歩留 85%',
        scaleLabel: 'EPI-TO-EPI VIA + DUAL BDI',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        art: (p) => `
          <!-- Cross-Section showing Upper nFET Epi, Middle BDI, Lower pFET Epi, Bottom BDI, and Direct Epi-to-Epi Via! -->
          <rect x="74" y="88" width="400" height="196" rx="10" fill="#ffffff" stroke="#99f6e4" stroke-width="1.3"/>
          <text x="274" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f766e">直接エピ対エピ垂直ビア ＋ 中間/底面ダブルBDI絶縁構造</text>

          <!-- Upper nFET Epi -->
          <rect x="104" y="122" width="286" height="44" rx="5" fill="url(#${p}_cyan)" stroke="#0369a1"/>
          <text x="218" y="148" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">上層 nFET エピタキシャル S/D</text>

          <!-- Middle BDI Wall -->
          <rect x="92" y="168" width="352" height="16" rx="2" fill="#94a3b8"/>
          <text x="220" y="179.5" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">① 中間BDI絶縁壁（上下リーク遮断）</text>

          <!-- Lower pFET Epi -->
          <rect x="104" y="186" width="286" height="44" rx="5" fill="url(#${p}_sige)" stroke="#9f1239"/>
          <text x="218" y="212" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">下層 pFET エピタキシャル S/D（電流 5倍増!）</text>

          <!-- Bottom BDI Wall -->
          <rect x="92" y="232" width="352" height="18" rx="2" fill="#0f766e"/>
          <text x="220" y="244.5" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ccfbf1">② 底面BDI絶縁壁（基板リーク完全封鎖）</text>

          <!-- Direct Vertical Epi-to-Epi Metal Via Pillar! -->
          <rect x="336" y="120" width="34" height="114" rx="4" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.6"/>
          <text x="353" y="178" text-anchor="middle" font-size="8.2" font-weight="900" fill="#713f12" transform="rotate(-90 353 178)">Epi-to-Epi Via</text>

          <!-- Right Panel: Before -> After VLSI 2026 Measured Gains -->
          <rect x="492" y="88" width="200" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="592" y="108" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">VLSI 2026 実測ブレイクスルー</text>
          ${kpiCard(504, 118, 176, 48, '垂直接続抵抗', '1753 → 378 Ω·μm', '約 1/4.6 へ劇的低抵抗化!', '#d97706')}
          ${kpiCard(504, 174, 176, 48, '下層pFET 駆動電流', '5倍向上 (5×)', '下層アクセスボトルネック突破', '#e11d48')}
          ${kpiCard(504, 230, 176, 46, 'デバイス歩留まり', '45% → 85%', 'ダブルBDIで短絡不良激減', '#059669')}

          ${nanoPin(353, 148, 92, 314, 1, 'エピ対エピ直接貫通ビア', '細長い外側回り込み配線を全廃', '#d97706', 'start')}
          ${nanoPin(220, 240, 376, 314, 2, '表裏ダブルBDI（Middle+Bottom）', '寄生リーク根絶で歩留まり85%到達', '#0d9488', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '上層nFETと下層pFETのエピタキシャル間を垂直ビア直結', line2: '中間＆底面の二重BDI絶縁壁で寄生短絡・リークを完全封鎖' },
          { label: '撮影・画質への恩恵', line1: 'CFET下層トランジスタの駆動電流5倍化で論理性能が大幅飛躍', line2: '歩留まり45%→85%改善により次世代CFETの実用コスト化を実現' },
          { label: '実機・2026学会諸元', line1: '垂直接続抵抗 1753 → 378 Ω·μm（約78%削減）', line2: 'Intel / imec VLSI 2026 CFETインテグレーション報告' },
        ],
      });

    // X2-37. Samsung VLSI 2026 Best Paper: 42nm Pitch 3+3 Nanosheet & eMDI Stacked FET
    case 'xv2_samsung_42nm_emdi_fet':
      return renderBionzV2Hd({
        badge: 'X2-37',
        zone: 'feol',
        nodeTag: 'Samsung · VLSI 2026 最優秀賞',
        title: '42nmゲートピッチ「3+3枚ナノシート＆内蔵eMDI縦積みFET」（VLSI 2026 Best Paper）',
        analogy: 'わずか42nm間隔の極狭敷地に上3枚＋下3枚＝計6枚の超薄橋を詰め込んだ世界最高密度スタック',
        metric: '42 nm CPP / 3+3＝6段シート',
        scaleLabel: 'WORLD-TIGHTEST 42 nm CPP',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        art: (p) => `
          <!-- 42nm Pitch Ultra-Tight 3+3 Nanosheet Stack with Embedded MDI -->
          <rect x="74" y="88" width="400" height="196" rx="10" fill="#ffffff" stroke="#c7d2fe" stroke-width="1.4"/>
          <text x="274" y="106" text-anchor="middle" font-size="9.6" font-weight="900" fill="#312e81">世界最狭 42 nm ゲートピッチ：3枚nMOS ＋ eMDI ＋ 3枚pMOS（計6層）</text>

          <!-- 2 Adjacent 42nm CPP Columns -->
          ${[166, 336].map((cx, ci) => `
            <rect x="${cx - 56}" y="116" width="112" height="148" rx="6" fill="url(#${p}_gold)" fill-opacity="0.32" stroke="#d97706"/>
            <!-- Top 3 nMOS Sheets -->
            ${[124, 140, 156].map((y) => `<rect x="${cx - 46}" y="${y}" width="92" height="10" rx="2" fill="url(#${p}_cyan)"/>`).join('')}
            <!-- Embedded Middle Dielectric Isolation (eMDI) -->
            <rect x="${cx - 52}" y="174" width="104" height="14" rx="2" fill="url(#${p}_gold)" stroke="#92400e"/>
            <text x="${cx}" y="184" text-anchor="middle" font-size="7.6" font-weight="900" fill="#713f12">内蔵 eMDI 仕切り</text>
            <!-- Bottom 3 pMOS Sheets -->
            ${[196, 212, 228].map((y) => `<rect x="${cx - 46}" y="${y}" width="92" height="10" rx="2" fill="url(#${p}_sige)"/>`).join('')}
            <text x="${cx}" y="256" text-anchor="middle" font-size="8.0" font-weight="800" fill="#334155">Gate #${ci + 1}</text>
          `).join('')}
          ${dimArrow(166, 272, 336, 272, 'CPP = 42 nm!', '#4f46e5')}

          <!-- Right Panel: Samsung Best Paper Achievements -->
          ${kpiCard(492, 92, 200, 56, 'VLSI 2026 受賞', 'Best Paper Award', 'Samsung先端3Dスタック実証', '#4f46e5')}
          ${kpiCard(492, 158, 200, 56, 'チャネル積層数', '上3枚 ＋ 下3枚 = 6段', '大電流駆動と超高密度を両立', '#0284c7')}
          ${kpiCard(492, 224, 200, 56, '中央分離技術', '内蔵 eMDI 構造', '42nmピッチで上下ゲート完全分離', '#d97706')}

          ${nanoPin(212, 181, 92, 314, 1, '自己整合内蔵eMDI絶縁層', '上下3+3枚の独立しきい値制御を実現', '#d97706', 'start')}
          ${nanoPin(336, 146, 376, 314, 2, '上下各3シートで駆動力1.5倍', '2+2枚CFETを超える高周波数性能', '#4f46e5', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'わずか42nmピッチ内へ上3枚nFET＋下3枚pFETを縦積み', line2: '中央に自己整合eMDI（内蔵中間絶縁層）を精密形成' },
          { label: '撮影・画質への恩恵', line1: '超高密度化しつつ上下3枚ずつの大電流で高速演算を維持', line2: '次世代エッジAI・高解像カメラSoCの面積効率を極限化' },
          { label: '実機・2026学会諸元', line1: 'ゲートピッチ 42 nm CPP / 合計6層ナノシート積層', line2: 'Samsung Electronics VLSI 2026 Best Paper 受賞技術' },
        ],
      });

    // X2-38. Intel 18A-P Power Boost Dual Frontside+Backside Power Contact (VLSI 2026)
    case 'xv2_18ap_dual_power_boost':
      return renderBionzV2Hd({
        badge: 'X2-38',
        zone: 'bspdn_cool',
        nodeTag: 'Intel 18A-P · VLSI 2026',
        title: 'Intel 18A-P「Power Boost 表裏デュアル同時給電コンタクト」（VLSI 2026）',
        analogy: '大電流を使う急所だけ「表と裏の両側からサンドイッチ給電」して瞬間パワーを倍増',
        metric: '並列抵抗 1/2 / Perf/W +8%',
        scaleLabel: 'DUAL FRONT + BACKSIDE CLAMP',
        accent: '#f97316',
        accentSoft: '#fff7ed',
        art: (p) => `
          <!-- Dual Front + Back Simultaneous Power Clamp -->
          <rect x="74" y="88" width="406" height="196" rx="10" fill="#ffffff" stroke="#fdba74" stroke-width="1.3"/>
          <text x="277" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9a3412">臨界高速セル限定：表面M0＋裏面PowerViaの表裏サンドイッチ同時給電</text>

          <!-- Top Frontside Boost Power Rail -->
          <rect x="106" y="118" width="342" height="24" rx="4" fill="url(#${p}_cu)"/>
          <text x="277" y="134" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">① 表面ブースト電源レール（臨界ブロックへ並列補助給電）</text>
          <line x1="158" y1="142" x2="158" y2="164" stroke="#dc2626" stroke-width="2.8" marker-end="url(#${p}_arr_red)"/>
          <line x1="396" y1="142" x2="396" y2="164" stroke="#dc2626" stroke-width="2.8" marker-end="url(#${p}_arr_red)"/>

          <!-- RibbonFET Core Sandwiched in Middle -->
          <rect x="128" y="166" width="298" height="46" rx="6" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.4"/>
          <text x="277" y="186" text-anchor="middle" font-size="10.0" font-weight="900" fill="#ffffff">RibbonFET GAA 高駆動セル（表裏並列給電）</text>
          <text x="277" y="202" text-anchor="middle" font-size="8.2" fill="#e0f2fe">R_total = R_front // R_back ≈ 1/2 抵抗!</text>

          <!-- Bottom Backside PowerVia Grid -->
          <line x1="158" y1="236" x2="158" y2="214" stroke="#d97706" stroke-width="2.8" marker-end="url(#${p}_arr_gold)"/>
          <line x1="396" y1="236" x2="396" y2="214" stroke="#d97706" stroke-width="2.8" marker-end="url(#${p}_arr_gold)"/>
          <rect x="106" y="238" width="342" height="28" rx="4" fill="url(#${p}_gold)" stroke="#a16207"/>
          <text x="277" y="256" text-anchor="middle" font-size="9.0" font-weight="900" fill="#713f12">② 裏面 PowerVia（nTSV主給電網 · メイン大電流ルート）</text>

          <!-- Right Panel: Parallel Resistance Formula & Gain -->
          ${kpiCard(498, 94, 194, 56, '並列電源インピーダンス', 'R_eff = R_F // R_B', '局所ホットセルのIR降下を半減', '#f97316')}
          ${kpiCard(498, 160, 194, 56, '18A-P 性能/電力向上', 'Perf/W 最大 +8%', '18A設計ルール完全互換', '#059669')}
          ${kpiCard(498, 226, 194, 54, '適用ターゲット', 'AI MAC / 時刻臨界路', '必要区画のみ選択投入', '#0284c7')}

          ${nanoPin(158, 154, 92, 314, 1, '表裏並列クランプ（Power Boost）', '大電流ピーク時の局所電圧落ちを根絶', '#ea580c', 'start')}
          ${nanoPin(396, 226, 376, 314, 2, '18A PowerViaの成熟拡張版', 'VLSI 2026 Intel 18A-P公式強化モジュール', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '裏面PowerVia主給電に加え高負荷セル上面からも並列給電', line2: '表裏の電源経路を並列接続し局所アクセス抵抗を半減' },
          { label: '撮影・画質への恩恵', line1: '高クロックAI・動画演算コアのピーク電流耐性を大幅向上', line2: '同一チップ設計のまま追加クロック＆省電力マージン獲得' },
          { label: '実機・2026学会諸元', line1: 'Intel 18A-P（50nm CPP・18A比 Perf/W最大+8%）', line2: 'VLSI 2026 Power Boost 同時表裏給電技術発表' },
        ],
      });

    // X2-39. 16nm-Pitch Subtractive Ru (sRu) Air-Gap & Fully Self-Aligned Via (FSAV)
    case 'xv2_sru_16nm_fsav_airgap':
      return renderBionzV2Hd({
        badge: 'X2-39',
        zone: 'beol',
        nodeTag: 'imec · IEDM 2025 33-7',
        title: '16nmピッチ「減算エッチング・ルテニウム（sRu）空洞配線＆完全自己整合ビア（FSAV）」',
        analogy: '溝に詰めるのをやめ、金属板を削り出して間に空気を残す逆転製法で16nm極細配線を実現',
        metric: '16 nmピッチ / 容量 -35%',
        scaleLabel: 'SUBTRACTIVE Ru: 16 nm PITCH',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        art: (p) => `
          <!-- Subtractive Ru (sRu) Cross-Section with Keyhole Air-Gaps & FSAV -->
          <rect x="74" y="88" width="420" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
          <text x="284" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">16nmピッチ減算エッチング Ru（sRu）＋ 鍵穴エアギャップ ＋ 完全自己整合ビア</text>

          <!-- Upper M(n+1) Orthogonal Bar & Fully Self-Aligned Via (FSAV) -->
          <rect x="96" y="118" width="376" height="22" rx="3" fill="url(#${p}_ru)" stroke="#334155"/>
          <text x="284" y="132.5" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f172a">上層 sRu 配線 M1（減算エッチングで高アスペクト比形成）</text>

          <!-- FSAV Self-Aligned Via sitting strictly on recessed Ru -->
          <rect x="266" y="140" width="36" height="32" fill="url(#${p}_gold)" stroke="#a16207"/>
          <text x="284" y="159" text-anchor="middle" font-size="7.8" font-weight="900" fill="#713f12">FSAV</text>

          <!-- 4 Tall Subtractive Ru Lines with Natural Keyhole Air-Gaps Between Them! -->
          ${[112, 198, 284, 370].map((x, i) => `
            <rect x="${x}" y="172" width="44" height="82" rx="2" fill="url(#${p}_ru)" stroke="#1e293b" stroke-width="1.2"/>
            <text x="${x + 22}" y="216" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0f172a">sRu</text>
            ${
              i < 3
                ? `<path d="M ${x + 50} 174 L ${x + 80} 174 Q ${x + 86} 214 ${x + 74} 252 L ${x + 56} 252 Q ${x + 44} 214 ${x + 50} 174 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="3 2"/>
                   <text x="${x + 65}" y="214" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0369a1">鍵穴</text>
                   <text x="${x + 65}" y="225" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0284c7">空気</text>`
                : ''
            }
          `).join('')}
          ${dimArrow(134, 266, 220, 266, 'Pitch = 16 nm!', '#0f172a')}

          <!-- Right Panel: Why Subtractive Beats Damascene at 16nm -->
          <rect x="510" y="88" width="184" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="602" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">ダマシン限界の突破</text>
          ${cmpBanner(520, 120, 164, '× ダマシン: 8nm溝に詰まらぬ', false)}
          ${cmpBanner(520, 148, 164, '○ 減算sRu: 全面成膜→削出!', true)}
          ${kpiCard(520, 180, 164, 46, '線間静電容量 C', '−35% 削減', '自然形成鍵穴エアギャップ', '#0284c7')}
          ${kpiCard(520, 232, 164, 44, 'FSAV 位置ズレ耐性', '短絡リスク 0', 'リセス自己整合着地', '#d97706')}

          ${nanoPin(177, 214, 94, 314, 1, '鍵穴エアギャップ自然形成', '追加マスクなしで隣接容量35%カット', '#0284c7', 'start')}
          ${nanoPin(284, 156, 376, 314, 2, '完全自己整合ビア（FSAV）', '16nm極狭ピッチの露光ズレ短絡を防止', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '全面成膜したRuをHigh-NA EUVで削り出す減算（Subtractive）法', line2: '高アスペクト比Ru間に自然に鍵穴エアギャップとFSAVを形成' },
          { label: '撮影・画質への恩恵', line1: 'A10/A7世代の極細16nm配線でもRC遅延爆発を劇的に抑止', line2: '高密度ISP・AIキャッシュ配線の電力と速度を次世代へ拡張' },
          { label: '実機・2026学会諸元', line1: '金属ピッチ 16 nm（線幅 ~8 nm）・容量−35%削減', line2: 'imec IEDM 2025 Paper 33-7 / VLSI 2026 実証' },
        ],
      });

    // X2-40. High-NA EUV (0.55 NA) Anamorphic Exposure & Metal-Oxide Resist (MOR) LER Guard
    case 'xv2_highna_euv_mor_ler':
      return renderBionzV2Hd({
        badge: 'X2-40',
        zone: 'beol',
        nodeTag: 'ASML EXE:5200B · 0.55 NA',
        title: 'High-NA EUV（0.55 NA）「アナモルフィック露光 ＆ 金属酸化物レジスト（MOR）」',
        analogy: '縦8倍・横4倍の変形レンズと超硬質スズ酸化物レジストで、8nmの極細線を一発彫刻',
        metric: '分解能 8 nm / LER大幅低減',
        scaleLabel: 'λ = 13.5 nm · 0.55 NA HIGH-NA',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- Left: High-NA Anamorphic 4x/8x Optical Path -->
          <rect x="74" y="88" width="388" height="196" rx="10" fill="#0f172a" stroke="#a78bfa" stroke-width="1.4"/>
          <text x="268" y="106" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ddd6fe">High-NA EUV（0.55 NA）アナモルフィック縮小光学系（4× / 8×）</text>

          <!-- Mo/Si Bragg Reflective Reticle at Top -->
          <rect x="132" y="116" width="272" height="18" rx="3" fill="url(#${p}_gold)"/>
          <text x="268" y="128.5" text-anchor="middle" font-size="8.2" font-weight="900" fill="#713f12">Mo/Si 多層ブラッグ反射フォトマスク（レチクル）</text>

          <!-- Asymmetric Converging EUV Beam Cone (13.5 nm) -->
          <polygon points="154,134 382,134 304,226 232,226" fill="url(#${p}_hfo2)" fill-opacity="0.34" stroke="#c4b5fd" stroke-width="1.3"/>
          <!-- Central Obscuration & High-NA 0.55 Mirrors -->
          <path d="M 140 178 Q 268 158 396 178" fill="none" stroke="#38bdf8" stroke-width="3.2"/>
          <text x="268" y="168" text-anchor="middle" font-size="8.4" font-weight="900" fill="#bae6fd">Zeiss 0.55 NA 非球面反射鏡群（X=4×, Y=8×縮小）</text>
          <text x="268" y="204" text-anchor="middle" font-size="8.6" font-weight="800" fill="#fef08a">13.5 nm 極端紫外線（単一露光で8nm解像!）</text>

          <!-- Sn-Oxo MOR Resist on Wafer -->
          <rect x="128" y="226" width="280" height="22" rx="3" fill="url(#${p}_emerald)"/>
          <text x="268" y="240.5" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">金属酸化物レジスト MOR（Sn-oxo 高EUV吸収・極薄20nm）</text>
          <rect x="116" y="248" width="304" height="22" rx="3" fill="#334155"/>
          <text x="268" y="262.5" text-anchor="middle" font-size="8.2" font-weight="800" fill="#cbd5e1">300 mm シリコンウェハー（マルチパターニング不要化）</text>

          <!-- Right Panel: CAR vs MOR Line-Edge Roughness (LER) Comparison -->
          <rect x="480" y="88" width="212" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="586" y="108" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">線幅ガタツキ（LER）比較</text>
          <text x="494" y="130" font-size="8.2" font-weight="700" fill="#dc2626">× 従来ポリマーCAR（酸拡散ぼけ）</text>
          <path d="M 498 144 Q 518 136 538 148 T 578 140 T 618 149 T 672 142" fill="none" stroke="#dc2626" stroke-width="4"/>
          <text x="494" y="176" font-size="8.2" font-weight="900" fill="#059669">○ スズ酸化物 MOR（極小分子1nm）</text>
          <line x1="498" y1="190" x2="672" y2="190" stroke="#059669" stroke-width="4.5" stroke-linecap="round"/>
          ${kpiCard(494, 212, 184, 58, '分解能（Rayleigh式）', 'CD = 8 nm（1回露光）', '0.33 NA比 1.7×解像・3×密度', '#7c3aed')}

          ${nanoPin(268, 178, 92, 314, 1, 'アナモルフィック4×/8×光学系', 'マスク斜入射シャドーイングを物理回避', '#7c3aed', 'start')}
          ${nanoPin(586, 190, 376, 314, 2, 'Sn-oxo 金属酸化物レジスト', 'EUV吸収率5倍・パターン倒壊＆LER激減', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '開口数0.33→0.55 NAへ大型化しX4倍/Y8倍の非対称縮小露光', line2: '高EUV吸収Sn-oxo金属酸化物レジストで線縁粗さLERを大幅改善' },
          { label: '撮影・画質への恩恵', line1: '複雑な二重露光を1回露光へ統合し1.4nm/A14の歩留まり向上', line2: 'トランジスタ寸法ばらつき激減により高クロック安定性を確保' },
          { label: '実機・2026学会諸元', line1: 'ASML Twinscan EXE:5200B（λ=13.5nm / NA=0.55 / 解像8nm）', line2: 'Intel 14A・imec A14/A7世代の2026年量産導入開始' },
        ],
      });

    // X2-41. A7-Node Gear Ratio 2:1 M0->M1 Pin-Access Routing Comb (imec VLSI 2026)
    case 'xv2_a7_gear_ratio_m1':
      return renderBionzV2Hd({
        badge: 'X2-41',
        zone: 'beol',
        nodeTag: 'imec · VLSI 2026 A7 DTCO',
        title: 'A7世代「ギア比 2:1 M0→M1 ピンアクセス配線コム」（imec VLSI 2026）',
        analogy: 'トランジスタ1区間に対しM1配線を2本通せる2:1歯車比で、超微細セルの配線詰まりを完全解消',
        metric: 'Gear Ratio 2:1 (CPP:M1P)',
        scaleLabel: 'CPP / M1 PITCH = 2 : 1',
        accent: '#d97736',
        accentSoft: '#fff7ed',
        art: (p) => `
          <!-- Left: GR 1:1 (Congested) vs Right: GR 2:1 (2x Pin Accessibility!) -->
          ${cmpBanner(74, 84, 196, '× 従来2nm ギア比 1:1（配線渋滞）', false)}
          <rect x="82" y="114" width="180" height="142" rx="7" fill="#ffffff" stroke="#fca5a5"/>
          <!-- Gate pitch vertical bars -->
          ${[114, 172, 230].map((x) => `<rect x="${x - 8}" y="124" width="16" height="122" fill="#e2e8f0" stroke="#94a3b8"/>`).join('')}
          <!-- M1 tracks at 1:1 pitch (only 1 track per CPP!) -->
          ${[114, 172, 230].map((x) => `<rect x="${x - 5}" y="124" width="10" height="122" fill="#ef4444" opacity="0.72"/>`).join('')}
          <text x="172" y="272" text-anchor="middle" font-size="8.4" font-weight="800" fill="#991b1b">ピン出口が1本のみ → 迂回ロス大</text>

          <!-- Right: A7 Gear Ratio 2:1 (2 M1 Tracks per 1 CPP!) -->
          ${cmpBanner(294, 84, 218, '○ A7 ギア比 2:1（ピン到達性 2倍!）', true)}
          <rect x="302" y="114" width="202" height="142" rx="7" fill="#ffffff" stroke="#86efac" stroke-width="1.3"/>
          ${[342, 412, 482].map((x) => `<rect x="${x - 8}" y="124" width="16" height="122" fill="#e2e8f0" stroke="#94a3b8"/>`).join('')}
          <!-- Horizontal M0 Pins -->
          ${[144, 184, 224].map((y) => `<rect x="314" y="${y}" width="178" height="10" rx="2" fill="url(#${p}_cyan)"/>`).join('')}
          <!-- Twice as dense M1 Vertical Tracks (GR 2:1!) -->
          ${[324, 359, 394, 429, 464].map((x, idx) => `
            <rect x="${x - 4}" y="122" width="8" height="126" rx="1" fill="url(#${p}_cu)"/>
            <circle cx="${x}" cy="${149 + (idx % 3) * 40}" r="4.5" fill="#fde047" stroke="#92400e" stroke-width="1"/>
          `).join('')}
          <text x="403" y="272" text-anchor="middle" font-size="8.4" font-weight="900" fill="#166534">1 CPPあたりM1が2本 → 面積効率最大化!</text>

          <!-- Right Panel: imec VLSI 2026 DTCO Result -->
          ${kpiCard(530, 96, 162, 66, 'ギア比定義', 'GR = CPP / M1P', '1:1 → 2:1 へ高密度化', '#d97736')}
          ${kpiCard(530, 174, 162, 74, '必須リソグラフィ', 'High-NA EUV 単露光', 'M1極細ピッチの一発形成', '#7c3aed')}

          ${nanoPin(359, 189, 92, 314, 1, 'ピンアクセス衝突の劇的減少', 'ND2D1など複合CFETセルの配線率向上', '#d97736', 'start')}
          ${nanoPin(429, 149, 376, 314, 2, 'imec VLSI 2026 DTCO実証', '電力・性能を損なわずブロック面積を圧縮', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'ゲートピッチ（CPP）対 M1配線ピッチの比を1:1から2:1へ倍増', line2: 'High-NA EUV単露光で極細M1コムを実現しピン到達性を改善' },
          { label: '撮影・画質への恩恵', line1: 'CFET時代の深刻なセル内配線渋滞を解消し実効密度を引上げ', line2: '自動配置配線（P&R）の迂回遅延を減らし省エネ化に貢献' },
          { label: '実機・2026学会諸元', line1: 'ギア比 GR = 2:1（A7ノード CFET標準セル設計）', line2: 'imec VLSI 2026 DTCO研究（ND2D1等ベンチマーク検証）' },
        ],
      });

    // X2-42. On-Die Atomic Hydrogen Trap NBTI/PBTI Aging Monitor Canary Cell
    case 'xv2_nbti_pbti_trap_monitor':
      return renderBionzV2Hd({
        badge: 'X2-42',
        zone: 'beol',
        nodeTag: 'RELIABILITY · BTI CANARY',
        title: 'オンダイ原子水素トラップ「NBTI / PBTI 経年劣化リアルタイム監視カナリアセル」',
        analogy: '炭鉱のカナリアのように少し早く年を取る監視セルを内蔵し、数年後の劣化を先読み補正',
        metric: 'ΔVth リアルタイム補償',
        scaleLabel: '10-YEAR AGING GUARD',
        accent: '#ef4444',
        accentSoft: '#fef2f2',
        art: (p) => `
          <!-- Twin Ring Oscillator Canary Architecture (Stressed vs Unstressed Reference) -->
          <rect x="74" y="88" width="388" height="196" rx="10" fill="#ffffff" stroke="#fca5a5" stroke-width="1.3"/>
          <text x="268" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#991b1b">ツイン・リングオシレータ劣化監視（ストレスセル vs 基準セル）</text>

          <!-- Top: Stressed Canary Ring (Accelerates NBTI/PBTI!) -->
          <rect x="94" y="120" width="164" height="62" rx="7" fill="#fef2f2" stroke="#ef4444" stroke-width="1.4"/>
          <text x="176" y="140" text-anchor="middle" font-size="9.0" font-weight="900" fill="#dc2626">① 加速ストレス RO</text>
          <text x="176" y="156" text-anchor="middle" font-size="7.8" font-weight="700" fill="#991b1b">常時DCバイアス印加</text>
          <text x="176" y="170" text-anchor="middle" font-size="8.0" font-weight="800" fill="#ef4444">f_stress 低下（ΔVth↑）</text>

          <!-- Bottom: Fresh Unstressed Reference Ring -->
          <rect x="94" y="198" width="164" height="62" rx="7" fill="#ecfdf5" stroke="#059669" stroke-width="1.4"/>
          <text x="176" y="218" text-anchor="middle" font-size="9.0" font-weight="900" fill="#065f46">② 無劣化リファレンス RO</text>
          <text x="176" y="234" text-anchor="middle" font-size="7.8" font-weight="700" fill="#047857">測定時のみ一瞬ON</text>
          <text x="176" y="248" text-anchor="middle" font-size="8.0" font-weight="800" fill="#059669">f_ref 一定（初期値保持）</text>

          <!-- Beat Frequency Comparator -> AVFS Voltage Trim -->
          <path d="M 258 151 L 298 184" stroke="#ef4444" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>
          <path d="M 258 229 L 298 198" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_green)"/>

          <rect x="304" y="146" width="142" height="90" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="375" y="168" text-anchor="middle" font-size="9.2" font-weight="900" fill="#fde047">ビート周波数比較器</text>
          <text x="375" y="186" text-anchor="middle" font-size="8.4" font-weight="800" fill="#38bdf8">Δf = f_ref − f_stress</text>
          <text x="375" y="204" text-anchor="middle" font-size="8.0" fill="#e2e8f0">→ PMICへ +ΔV_DD 補正</text>
          <text x="375" y="222" text-anchor="middle" font-size="8.0" font-weight="800" fill="#6ee7b7">初期ガードバンド大幅削減!</text>

          <!-- Right Panel: Si-H Bond Breaking Physics -->
          <rect x="480" y="88" width="212" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="586" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">BTI 経年劣化の原子メカニズム</text>
          <circle cx="536" cy="148" r="14" fill="url(#${p}_cyan)"/>
          <text x="536" y="152" text-anchor="middle" font-size="8.6" font-weight="900" fill="#fff">Si</text>
          <line x1="550" y1="148" x2="594" y2="148" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="3 2"/>
          <text x="572" y="140" text-anchor="middle" font-size="7.6" font-weight="900" fill="#dc2626">切断!</text>
          <circle cx="608" cy="148" r="11" fill="#fde047" stroke="#a16207"/>
          <text x="608" y="152" text-anchor="middle" font-size="8.4" font-weight="900" fill="#713f12">H</text>
          <text x="586" y="180" text-anchor="middle" font-size="8.2" font-weight="700" fill="#334155">高温＋電界でSi-H結合が乖離し</text>
          <text x="586" y="194" text-anchor="middle" font-size="8.2" font-weight="700" fill="#334155">界面トラップ(D_it)が増加 → Vth上昇</text>
          ${kpiCard(496, 212, 180, 58, 'AVFS 適応電圧補正', '初期余剰電力 −8〜12%', '10年後の劣化分を先払いしない!', '#059669')}

          ${nanoPin(375, 236, 94, 314, 1, 'ビート周波数でサブmV劣化検知', 'ΔVth変化をリアルタイム数値化', '#ef4444', 'start')}
          ${nanoPin(586, 236, 376, 314, 2, '適応電圧周波数制御（AVFS）連携', '新品時は超低電圧・経年時に最適微増', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '加速ストレスROと基準ROのビート周波数差でΔVthを測定', line2: 'Si-H結合乖離によるNBTI/PBTI進行をオンダイ常時診断' },
          { label: '撮影・画質への恩恵', line1: '新品時に10年劣化分の無駄な高電圧を掛けず省エネ撮影', line2: '何年使い込んでも30fps連写や4K録画の安定性を維持' },
          { label: '実機・2026学会諸元', line1: 'サブmV解像度 ΔVth 検知 ＋ AVFS動的電源トリミング', line2: '2nm GAA高電界環境における10年寿命保証の中核回路' },
        ],
      });

    // X2-43. Backside Nano-TSV Silicide Landing Pad & Carrier Wafer Bonding Seam
    case 'xv2_backside_ntsv_landing':
      return renderBionzV2Hd({
        badge: 'X2-43',
        zone: 'bspdn_cool',
        nodeTag: 'BSPDN · nTSV LANDING',
        title: '裏面「ナノTSV シリサイド着地パッド ＆ キャリアウェハー接合シーム」',
        analogy: '従来の1/500断面積の極細縦穴を裏側から掘り、六角形シリサイドの的にピタリ着地させる神業',
        metric: '断面積 従来TSVの 1/500',
        scaleLabel: 'nTSV DIA: ~100–250 nm',
        accent: '#b45309',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Cross Section: Carrier Wafer Bond Seam (Top) -> Frontside -> GAA -> nTSV Landing Pad -> Backside BM0 -->
          <rect x="74" y="88" width="406" height="196" rx="10" fill="#ffffff" stroke="#fde68a" stroke-width="1.3"/>
          <text x="277" y="105" text-anchor="middle" font-size="9.5" font-weight="800" fill="#92400e">反転処理構造：キャリア接合シーム ＆ 裏面nTSVシリサイド着地断面</text>

          <!-- Top Carrier Wafer + SiCN Fusion Seam -->
          <rect x="94" y="114" width="366" height="22" rx="3" fill="#475569"/>
          <text x="277" y="128.5" text-anchor="middle" font-size="8.2" font-weight="800" fill="#e2e8f0">支持キャリアウェハー（薄化時の機械剛性を保持）</text>
          <rect x="94" y="136" width="366" height="8" fill="#38bdf8"/>

          <!-- Frontside BEOL + GAA Layer -->
          <rect x="94" y="144" width="366" height="36" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="277" y="165" text-anchor="middle" font-size="8.8" font-weight="900" fill="#1e3a8a">表面 BEOL 信号配線 ＆ 2nm GAA トランジスタ層</text>

          <!-- Hexagonal TiSi2 / W Landing Pads -->
          ${[166, 277, 388].map((x) => `
            <polygon points="${x - 26},180 ${x + 26},180 ${x + 18},194 ${x - 18},194" fill="url(#${p}_gold)" stroke="#92400e" stroke-width="1.2"/>
          `).join('')}

          <!-- Thinned 300nm Silicon traversed by Tapered High-AR nTSVs with Oxide Liner! -->
          <rect x="94" y="194" width="366" height="50" fill="url(#${p}_si)"/>
          ${[166, 277, 388].map((x) => `
            <polygon points="${x - 15},194 ${x + 15},194 ${x + 19},244 ${x - 19},244" fill="#bae6fd"/>
            <polygon points="${x - 10},194 ${x + 10},194 ${x + 14},244 ${x - 14},244" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="0.9"/>
          `).join('')}

          <!-- Backside Metal BM0 -->
          <rect x="94" y="244" width="366" height="26" rx="3" fill="url(#${p}_cu)"/>
          <text x="277" y="261" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">裏面電源メタル BM0（極低抵抗 垂直給電バス）</text>

          <!-- Right Panel: Conventional 3D TSV vs BSPDN nTSV -->
          <rect x="498" y="88" width="194" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="595" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">3D TSV vs ナノTSV</text>
          <circle cx="552" cy="162" r="34" fill="#cbd5e1" stroke="#64748b" stroke-width="1.4"/>
          <text x="552" y="165" text-anchor="middle" font-size="8.0" font-weight="800" fill="#334155">従来TSV</text>
          <text x="552" y="176" text-anchor="middle" font-size="7.4" fill="#475569">φ 5 μm</text>
          <circle cx="642" cy="162" r="5" fill="#ea580c" stroke="#9a3412" stroke-width="1.2"/>
          <text x="642" y="182" text-anchor="middle" font-size="8.2" font-weight="900" fill="#b45309">nTSV</text>
          <text x="642" y="194" text-anchor="middle" font-size="7.4" font-weight="800" fill="#9a3412">φ ~150nm</text>
          ${kpiCard(510, 212, 170, 58, '断面積スケール比', '約 1 / 500 縮小!', '超高密度セル直下へ着地', '#b45309')}

          ${nanoPin(277, 187, 94, 314, 1, 'TiSi₂ シリサイド着地パッド', 'オーバーエッチを防ぎ接触抵抗を極小化', '#d97706', 'start')}
          ${nanoPin(388, 220, 376, 314, 2, '酸化膜ライナー＋W/Mo/Cu充填', '300nm極薄Siを無ボイド貫通', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'SiCN融合キャリア接合後に300nm薄化し高AR極細nTSV開口', line2: '側壁絶縁ライナー＋W/Mo充填でシリサイド着地パッドへ直結' },
          { label: '撮影・画質への恩恵', line1: '従来の1/500断面積で全セル列直下へ高密度給電を実現', line2: 'BSPDNの歩留まりと長期電気的信頼性を支える決定構造' },
          { label: '実機・2026学会諸元', line1: 'nTSV径 ~100–250 nm（従来3D-TSV比 断面積1/500）', line2: 'Intel PowerVia / TSMC A16 SPR / imec BSPDN中核工程' },
        ],
      });

    default:
      return null;
  }
}
