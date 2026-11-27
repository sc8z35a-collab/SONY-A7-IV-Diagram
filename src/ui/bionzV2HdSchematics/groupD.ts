import { PartExplanation } from '../../assemblies/types';
import {
  cmpBanner,
  kpiCard,
  nanoPin,
  renderBionzV2Hd,
} from './shared';

/**
 * Ultra-HD 720x500 Nanoscale Technical Schematics for BIONZ V2 Group D (X2-44 – X2-55):
 * imec 5T+1 sCFET SRAM, 3D 2TnF HfZrO2 FeFET CIM, PE-ALD IGZO 2T0C eDRAM,
 * Perpendicular SOT-MRAM MTJ, Monolithic GaN/Si IVR, UCIe-S 56G D2D PHY,
 * HBM4 2048-bit Base Die, >110GHz GeSi EAM CPO, Direct-to-Si Microfluidic Cooler,
 * Multi-Shear Si BAW Resonator, Dual-Rail Side-Channel & ECC Guard, and TSMC 3.5D COUPE.
 */
export function renderBionzV2GroupD(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // X2-44. imec VLSI 2026 5T+1 Split-Gate sCFET SRAM (Area -12.5%)
    case 'xv2_scfet_5t1_sram':
      return renderBionzV2Hd({
        badge: 'X2-44',
        zone: 'isp_mem',
        nodeTag: 'imec · VLSI 2026 sCFET',
        title: 'imec VLSI 2026「5T+1 スプリットゲート sCFET 超高密度SRAMセル」（面積−12.5%）',
        analogy: '2階建てCFETのゲートを上下別々に動かせるスプリット構造で、6T SRAMをさらに12.5%縮小',
        metric: 'セル面積 −12.5% (5T+1)',
        scaleLabel: 'SPLIT-GATE sCFET BITCELL',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        art: (p) => `
          <!-- Split-Gate sCFET 5T+1 Topology vs Standard 6T CFET -->
          <rect x="74" y="88" width="402" height="196" rx="10" fill="#ffffff" stroke="#93c5fd" stroke-width="1.3"/>
          <text x="275" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#1e3a8a">スプリットゲート sCFET 5T+1 SRAM（独立上下ゲート制御）</text>

          <!-- 3 Vertical CFET Columns inside Bitcell -->
          ${[
            { x: 112, top: 'PG-L (n)', bot: 'PD-L (n)', split: true },
            { x: 226, top: 'PU-L (p)', bot: 'PU-R (p)', split: false },
            { x: 340, top: 'PG-R (n)', bot: 'PD-R (n)', split: true },
          ].map((col) => `
            <rect x="${col.x}" y="124" width="84" height="46" rx="5" fill="${col.split ? 'url(#' + p + '_cyan)' : 'url(#' + p + '_sige)'}"/>
            <text x="${col.x + 42}" y="151" text-anchor="middle" font-size="8.8" font-weight="900" fill="#fff">${col.top}</text>
            <rect x="${col.x - 4}" y="174" width="92" height="12" rx="2" fill="${col.split ? '#f59e0b' : '#94a3b8'}"/>
            <text x="${col.x + 42}" y="183" text-anchor="middle" font-size="7.2" font-weight="900" fill="#0f172a">${col.split ? 'SPLIT GATE' : 'SHARED'}</text>
            <rect x="${col.x}" y="190" width="84" height="46" rx="5" fill="${col.split ? 'url(#' + p + '_blue)' : 'url(#' + p + '_sige)'}"/>
            <text x="${col.x + 42}" y="217" text-anchor="middle" font-size="8.8" font-weight="900" fill="#fff">${col.bot}</text>
          `).join('')}

          <text x="275" y="258" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0369a1">通常CFETでは別列が必要なパスゲート(PG)を真上へ統合!</text>

          <!-- Right Panel: Area Reduction Chart -->
          ${kpiCard(494, 94, 198, 58, 'SRAMセル面積削減', '−12.5%（vs 標準CFET）', 'GAA比では約−45%級圧縮', '#2563eb')}
          ${kpiCard(494, 162, 198, 56, 'ビットセル構造', '5T + 1 Split-Gate', '読出・書込マージン維持', '#059669')}
          ${kpiCard(494, 228, 198, 52, '最新学会出典', 'imec VLSI 2026', 'A7世代超高密度キャッシュ', '#7c3aed')}

          ${nanoPin(154, 180, 92, 314, 1, '上下分離スプリットゲート', 'ワード線(WL)と記憶ノードを縦に独立制御', '#d97706', 'start')}
          ${nanoPin(382, 214, 376, 314, 2, '超コンパクト3列構成', 'オンダイAI/ISPキャッシュ容量を大幅増', '#2563eb', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '2階建てCFETのゲートを上下分離し独立制御するsCFET構造', line2: '5T＋1スプリットゲート配置で標準CFET 6T比面積−12.5%' },
          { label: '撮影・画質への恩恵', line1: '超微細世代でも大容量L1/L2キャッシュの面積壁を突破', line2: 'BIONZ次世代のオンチップAI推論＆RAW処理速度を引上げ' },
          { label: '実機・2026学会諸元', line1: 'imec VLSI 2026 発表（sCFET 5T+1 SRAMセル）', line2: 'A7ノード（CFET＋BSPDN）におけるSRAMスケーリング本命' },
        ],
      });

    // X2-45. 3D Vertical 2TnF HfZrO2 Ferroelectric Gain-Cell AI-Attention CIM (IEDM 2025 5.7/28.3)
    case 'xv2_3d_fefet_2tnf_cim':
      return renderBionzV2Hd({
        badge: 'X2-45',
        zone: 'isp_mem',
        nodeTag: 'IEDM 2025 · 5.7 / 28.3',
        title: '3D垂直「2TnF HfZrO₂ 強誘電体ゲインセル AI-Attention CIM」',
        analogy: 'データを置いたメモリ柱の中でそのままAIの掛け算を実行し、データ移動エネルギーを激減',
        metric: '不揮発メモリ内演算 (CIM)',
        scaleLabel: '3D VERTICAL HfZrO₂ FeFET',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- 3D Vertical 2TnF FeFET Pillar Cross-Section -->
          <rect x="74" y="88" width="388" height="196" rx="10" fill="#0f172a" stroke="#a78bfa" stroke-width="1.5"/>
          <text x="268" y="106" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ddd6fe">3D垂直 Hf₀.₅Zr₀.₅O₂（HZO）強誘電体 FeFET マルチレベルCIM柱</text>

          <!-- 3 Vertical 3D FeFET Pillars with Stacked Wordline Rings -->
          ${[156, 268, 380].map((cx, ci) => `
            <!-- Vertical Oxide Channel Core -->
            <rect x="${cx - 14}" y="122" width="28" height="142" rx="4" fill="url(#${p}_cyan)"/>
            <!-- Ferroelectric HfZrO2 Collar -->
            <rect x="${cx - 22}" y="132" width="8" height="122" fill="url(#${p}_hfo2)"/>
            <rect x="${cx + 14}" y="132" width="8" height="122" fill="url(#${p}_hfo2)"/>
            <!-- 3 Stacked Gate Wordline Rings (nF Ferroelectric Weights!) -->
            ${[142, 182, 222].map((y, ri) => `
              <rect x="${cx - 44}" y="${y}" width="22" height="20" rx="2" fill="url(#${p}_gold)"/>
              <rect x="${cx + 22}" y="${y}" width="22" height="20" rx="2" fill="url(#${p}_gold)"/>
              <text x="${cx}" y="${y + 13}" text-anchor="middle" font-size="7.8" font-weight="900" fill="#ffffff">W${ci}${ri}</text>
            `).join('')}
          `).join('')}
          <text x="268" y="276" text-anchor="middle" font-size="8.4" font-weight="800" fill="#fde047">キルヒホッフ電流和 I_out = Σ(V_in · G_ij) で行列積を一発演算!</text>

          <!-- Right Panel: Ferroelectric Polarization Hysteresis & CIM Gain -->
          <rect x="480" y="88" width="212" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="586" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">HZO 強誘電体ヒステリシス</text>
          <!-- Hysteresis Loop -->
          <path d="M 526 196 C 546 196 558 134 612 134 L 646 134 C 626 134 614 196 560 196 Z" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2.2"/>
          <line x1="516" y1="165" x2="656" y2="165" stroke="#94a3b8" stroke-width="1"/>
          <line x1="586" y1="122" x2="586" y2="206" stroke="#94a3b8" stroke-width="1"/>
          <text x="646" y="146" font-size="8.0" font-weight="900" fill="#7c3aed">+P (多値)</text>
          <text x="524" y="190" font-size="8.0" font-weight="900" fill="#0284c7">−P (保持)</text>
          ${kpiCard(496, 214, 180, 56, 'Compute-in-Memory', 'データ移動電力 −90%', 'Transformer Attention直結', '#7c3aed')}

          ${nanoPin(248, 192, 92, 314, 1, 'HfZrO₂(HZO) 直交相強誘電体', 'CMOS完全互換・電源OFFでも重み保持', '#7c3aed', 'start')}
          ${nanoPin(380, 260, 376, 314, 2, '3D垂直2TnFゲインセル構成', '超高密度＆非破壊アナログ積和演算', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '垂直チャネル周囲に強誘電体HfZrO₂膜を巻き付けた3D FeFET', line2: '各セルのコンダクタンス重みでアナログ積和演算（CIM）を直接実行' },
          { label: '撮影・画質への恩恵', line1: 'AI被写体認識Transformerのメモリ帯域ボトルネックを打破', line2: '不揮発性によりカメラ起動0.1秒で即AI認識スタンバイ可能' },
          { label: '実機・2026学会諸元', line1: '3D 2TnF HfZrO₂ FeFET（多値記憶・超高耐久・低書込電圧）', line2: 'IEDM 2025 Paper 5.7 / 28.3 AI-Attention CIM実証' },
        ],
      });

    // X2-46. PE-ALD Hydrogen-Annealed IGZO 2T0C Capacitorless eDRAM (IEDM 2025 40-5)
    case 'xv2_igzo_2t0c_edram':
      return renderBionzV2Hd({
        badge: 'X2-46',
        zone: 'isp_mem',
        nodeTag: 'IEDM 2025 40-5 · IGZO 2T0C',
        title: 'PE-ALD水素アニール「IGZO 2T0C コンデンサレス組込みDRAM」',
        analogy: '漏れ電流が100億分の1の酸化物スイッチを使い、巨大コンデンサなしで記憶を長時間保持',
        metric: 'I_off < 10⁻²⁰ A / 保持 >1000s',
        scaleLabel: 'CAPACITORLESS 2T0C BEOL',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        art: (p) => `
          <!-- Left: 2T0C Circuit & BEOL Stacked Cross-Section -->
          <rect x="74" y="88" width="388" height="196" rx="10" fill="#ffffff" stroke="#6ee7b7" stroke-width="1.3"/>
          <text x="268" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">IGZO 2T0C コンデンサレス eDRAM（配線層BEOLへ3D直接積層!）</text>

          <!-- Write Transistor (IGZO Ultra-Low Leakage!) -->
          <rect x="96" y="128" width="128" height="58" rx="7" fill="url(#${p}_emerald)" stroke="#065f46" stroke-width="1.3"/>
          <text x="160" y="150" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">Write Tr (IGZO)</text>
          <text x="160" y="168" text-anchor="middle" font-size="8.0" font-weight="800" fill="#d1fae5">I_off &lt; 10⁻²⁰ A/μm!</text>

          <!-- Floating Storage Node SN (Zero External Capacitor Needed!) -->
          <line x1="224" y1="157" x2="294" y2="157" stroke="#059669" stroke-width="3"/>
          <circle cx="259" cy="157" r="14" fill="#fef08a" stroke="#d97706" stroke-width="2"/>
          <text x="259" y="161" text-anchor="middle" font-size="9.0" font-weight="900" fill="#78350f">SN</text>
          <text x="259" y="186" text-anchor="middle" font-size="7.8" font-weight="800" fill="#b45309">ゲート容量のみで記憶!</text>

          <!-- Read Transistor (Non-Destructive Gain Read!) -->
          <rect x="294" y="128" width="144" height="58" rx="7" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.3"/>
          <text x="366" y="150" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">Read Tr（非破壊読出）</text>
          <text x="366" y="168" text-anchor="middle" font-size="8.0" font-weight="800" fill="#e0f2fe">リフレッシュ電力 −99%!</text>

          <!-- Stacked above 2nm Si CMOS Logic -->
          <rect x="96" y="210" width="342" height="54" rx="6" fill="url(#${p}_si)"/>
          <text x="267" y="233" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">下層：2nm GAA ISP / AI ロジック（低温&lt;350°Cで熱損傷ゼロ）</text>
          <text x="267" y="250" text-anchor="middle" font-size="8.0" fill="#6ee7b7">PE-ALD 成膜 ＋ 精密水素アニールで移動度・信頼性を同時向上</text>

          <!-- Right Panel: Retention Comparison -->
          <rect x="480" y="88" width="212" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="586" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">データ保持時間（無電源更新）</text>
          <text x="494" y="136" font-size="8.2" font-weight="700" fill="#dc2626">通常Si 1T1C DRAM</text>
          <rect x="494" y="142" width="32" height="16" rx="3" fill="#ef4444"/>
          <text x="534" y="154" font-size="8.6" font-weight="800" fill="#dc2626">64 ms（頻繁リフレッシュ）</text>
          <text x="494" y="182" font-size="8.2" font-weight="900" fill="#059669">IGZO 2T0C eDRAM</text>
          <rect x="494" y="188" width="180" height="18" rx="4" fill="url(#${p}_emerald)"/>
          <text x="584" y="201" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">&gt; 1,000 秒超（15,000倍!）</text>
          ${kpiCard(496, 218, 180, 52, 'SRAM比セル密度', '3× 〜 4× 高密度', 'コンデンサ0個の極小2T構造', '#059669')}

          ${nanoPin(160, 186, 92, 314, 1, 'ワイドバンドギャップ酸化物IGZO', '電子1個すら通さない超高絶縁オフ状態', '#059669', 'start')}
          ${nanoPin(366, 186, 376, 314, 2, 'BEOL配線層への多段3D積層', 'ISP直上へ数百MBの超高速キャッシュ実現', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '超低リークIGZO書込Tr＋読出Trの2T0C（コンデンサゼロ）構成', line2: 'PE-ALD＋水素アニール制御で350°C以下のBEOL直接積層を実現' },
          { label: '撮影・画質への恩恵', line1: 'SRAMの3–4倍密度で巨大フレームバッファを演算直上へ内蔵', line2: 'リフレッシュ電力ほぼゼロでプリ撮影待機時の電池消耗を激減' },
          { label: '実機・2026学会諸元', line1: 'オフ電流 <10⁻²⁰ A/μm・データ保持 >1,000s（DRAM比1.5万倍）', line2: 'IEDM 2025 Paper 40-5 / ACS Nano 2026 実証' },
        ],
      });

    // X2-47. Perpendicular SOT-MRAM Spin-Orbit Torque MTJ Weight Nanopillar (IEDM 2025)
    case 'xv2_sot_mram_mtj_weights':
      return renderBionzV2Hd({
        badge: 'X2-47',
        zone: 'isp_mem',
        nodeTag: 'IEDM 2025 · SOT-MRAM',
        title: '垂直磁化「SOT-MRAM スピン軌道トルク MTJ重みナノ柱」（IEDM 2025実証）',
        analogy: '電子の磁石の向き(スピン)を横流し電流でサブナノ秒反転し、AIモデルを無劣化・不揮発記憶',
        metric: '書込 < 1 ns / 耐久 > 10¹⁵回',
        scaleLabel: 'p-MTJ NANOPILLAR: φ ~25 nm',
        accent: '#db2777',
        accentSoft: '#fdf2f8',
        art: (p) => `
          <!-- Perpendicular SOT-MRAM MTJ Nanopillar Cross-Section -->
          <rect x="74" y="88" width="388" height="196" rx="10" fill="#0f172a" stroke="#f472b6" stroke-width="1.5"/>
          <text x="268" y="106" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fbcfe8">3端子 垂直磁化 SOT-MRAM（読出経路と高速書込経路を完全分離!）</text>

          <!-- Top Electrode -->
          <rect x="206" y="118" width="124" height="16" rx="3" fill="url(#${p}_gold)"/>
          <text x="268" y="129.5" text-anchor="middle" font-size="7.8" font-weight="900" fill="#713f12">上部読出電極 (BL)</text>

          <!-- SAF Reference Layer (Fixed Magnetization UP) -->
          <rect x="218" y="136" width="100" height="26" rx="3" fill="url(#${p}_cyan)"/>
          <text x="268" y="153" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">↑ 固定磁化 SAF層 ↑</text>

          <!-- 1nm MgO Tunnel Barrier -->
          <rect x="218" y="164" width="100" height="12" fill="#fef08a"/>
          <text x="268" y="173" text-anchor="middle" font-size="7.4" font-weight="900" fill="#78350f">MgO トンネル障壁 (~1 nm)</text>

          <!-- Free Magnetic Layer (CoFeB: Switches UP/DOWN via Spin Hall Torque!) -->
          <rect x="218" y="178" width="100" height="28" rx="3" fill="url(#${p}_laser)" stroke="#ffffff" stroke-width="1.1"/>
          <text x="268" y="196" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">↕ 自由磁化 CoFeB層</text>

          <!-- Heavy-Metal Spin-Orbit Channel (β-W / Pt) carrying lateral write current! -->
          <rect x="106" y="208" width="324" height="28" rx="4" fill="url(#${p}_ru)" stroke="#e2e8f0" stroke-width="1.2"/>
          <line x1="124" y1="222" x2="404" y2="222" stroke="#f43f5e" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>
          <text x="268" y="225.5" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f172a">重金属SOTチャネル（β-W / Pt：横電流 → 垂直スピン注入!）</text>
          <text x="268" y="258" text-anchor="middle" font-size="8.2" font-weight="700" fill="#f9a8d4">書込大電流がMgO障壁を通らない → 絶縁破壊ゼロ＆10¹⁵回書換耐久!</text>

          <!-- Right Panel: TMR & Speed KPIs -->
          ${kpiCard(480, 94, 212, 56, '超高速スイッチング', '< 0.5 〜 1.0 ns', 'L2/L3キャッシュ置換級速度', '#db2777')}
          ${kpiCard(480, 160, 212, 56, '書換耐久・不揮発', '> 10¹⁵ サイクル', '電源OFFでもAI重みを保持', '#059669')}
          ${kpiCard(480, 226, 212, 54, '待機電力（リーク）', '完全 0 W', 'インスタント起動カメラ実現', '#0284c7')}

          ${nanoPin(268, 170, 92, 314, 1, '磁気抵抗比 TMR > 200%', '平行(低抵抗0)/反平行(高抵抗1)を高速判定', '#d97706', 'start')}
          ${nanoPin(164, 222, 376, 314, 2, 'スピンホール効果による無磁界反転', 'IEDM 2025 垂直SOT-MRAM量産適合実証', '#db2777', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'β-W/Pt重金属のスピン軌道トルクでCoFeB磁化をサブns反転', line2: '書込電流がMgO障壁を通過しない3端子分離で耐久10¹⁵回超' },
          { label: '撮影・画質への恩恵', line1: 'AI被写体認識の全重みを不揮発保持し電源ON即AF作動', line2: 'SRAMの待機リーク電力を完全にゼロ化しバッテリー長寿命化' },
          { label: '実機・2026学会諸元', line1: '書込 <1 ns / 耐久 >10¹⁵回 / TMR >200% / 宇宙線耐性◎', line2: 'IEDM 2025 垂直磁化SOT-MRAM＋BEOL統合実証' },
        ],
      });

    // X2-48. 300mm Monolithic GaN nMOS + Si pMOS On-Die IVR Power Stage (Intel/UCSD VLSI 2026)
    case 'xv2_gan_si_monolithic_ivr':
      return renderBionzV2Hd({
        badge: 'X2-48',
        zone: 'bspdn_cool',
        nodeTag: 'Intel / UCSD · VLSI 2026',
        title: '300mmモノリシック「GaN nMOS ＋ Si pMOS オンダイIVR電源ステージ」',
        analogy: '従来は基板の外に並べていた大電力降圧回路を、次世代GaN半導体でチップ内部へ直載せ',
        metric: '100MHz+ 駆動 / 効率 >90%',
        scaleLabel: '300mm MONOLITHIC GaN-on-Si',
        accent: '#eab308',
        accentSoft: '#fefce8',
        art: (p) => `
          <!-- Monolithic 300mm GaN-on-Si Power Stage + On-Die Magnetic Inductor -->
          <rect x="74" y="88" width="424" height="196" rx="10" fill="#ffffff" stroke="#fde047" stroke-width="1.4"/>
          <text x="286" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#854d0e">300mmモノリシック GaN HEMT (高耐圧nMOS) ＋ Si pMOS オンダイ降圧IVR</text>

          <!-- High-Side GaN HEMT + Low-Side Si pMOS Bridge -->
          <rect x="94" y="122" width="144" height="72" rx="7" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.4"/>
          <text x="166" y="144" text-anchor="middle" font-size="9.8" font-weight="900" fill="#713f12">GaN HEMT (nMOS)</text>
          <text x="166" y="162" text-anchor="middle" font-size="8.0" font-weight="800" fill="#78350f">2DEG 高移動度電子ガス</text>
          <text x="166" y="178" text-anchor="middle" font-size="7.8" font-weight="700" fill="#92400e">バッテリー 7.2V→0.7V直変換!</text>

          <rect x="256" y="122" width="110" height="72" rx="7" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.3"/>
          <text x="311" y="146" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">Si pMOS</text>
          <text x="311" y="164" text-anchor="middle" font-size="7.8" fill="#e0f2fe">同一300mmウェハー</text>
          <text x="311" y="178" text-anchor="middle" font-size="7.8" font-weight="800" fill="#fef08a">3Dモノリシック融合</text>

          <!-- On-Die Spiral Magnetic Core Inductor -->
          <rect x="382" y="122" width="98" height="72" rx="7" fill="#0f172a" stroke="#eab308"/>
          <ellipse cx="431" cy="154" rx="34" ry="18" fill="none" stroke="#f59e0b" stroke-width="3.2"/>
          <ellipse cx="431" cy="154" rx="22" ry="10" fill="none" stroke="#fde047" stroke-width="2.2"/>
          <text x="431" y="185" text-anchor="middle" font-size="7.8" font-weight="800" fill="#fef08a">オンダイ極小コイル</text>

          <!-- Output Clean Multi-Domain Rails -->
          <rect x="94" y="212" width="386" height="52" rx="6" fill="#0f172a"/>
          <text x="287" y="232" text-anchor="middle" font-size="9.0" font-weight="900" fill="#6ee7b7">ドメイン別超高速DVFS出力（ナノ秒単位で電圧個別調整!）</text>
          <text x="287" y="250" text-anchor="middle" font-size="8.2" fill="#e2e8f0">ISP: 0.68V  |  AI NPU: 0.74V  |  SRAM: 0.55V  |  待機島: 0.0V</text>

          <!-- Right Panel: GaN Advantage Metrics -->
          ${kpiCard(514, 94, 178, 56, 'スイッチング周波数', '> 100 MHz', '外付け大型コイル全廃!', '#eab308')}
          ${kpiCard(514, 160, 178, 56, 'オンダイ変換効率', 'ピーク > 90%', 'GaN低オン抵抗×低Q_g', '#059669')}
          ${kpiCard(514, 226, 178, 54, '基板面積削減', '外付けPMIC縮小', '超小型αボディ実現', '#0284c7')}

          ${nanoPin(166, 194, 92, 314, 1, '300mm GaN-on-Si 異種統合', 'シリコンCMOS工場ラインで量産適合', '#d97706', 'start')}
          ${nanoPin(431, 194, 376, 314, 2, '100MHz超高速オンダイIVR', '30fps連写起動の電圧切替をナノ秒応答', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '300mmウェハー上で高耐圧GaN nMOSとSi pMOSをモノリシック融合', line2: '100MHz超の超高速スイッチングでオンダイ極小コイル降圧を実現' },
          { label: '撮影・画質への恩恵', line1: '外付け大型PMIC・インダクタを激減しカメラ本体をさらに小型化', line2: '各ISP/AIブロック電圧をナノ秒最適化し電力効率を極限まで向上' },
          { label: '実機・2026学会諸元', line1: 'Intel / UCSD VLSI 2026 300mm GaN+Si オンダイIVR実証', line2: '駆動 >100 MHz・変換効率 >90%・高電力密度供給' },
        ],
      });

    // X2-49. ISSCC 2026 UCIe-S 56 Gb/s/lane High-Density Chiplet D2D PHY (>4 Tbps/mm)
    case 'xv2_ucie_s_56g_d2d_phy':
      return renderBionzV2Hd({
        badge: 'X2-49',
        zone: 'pkg35d',
        nodeTag: 'ISSCC 2026 · UCIe-S 56G',
        title: 'ISSCC 2026「UCIe-S 56 Gb/s/lane 超高密度チップレットD2D PHY」（>4 Tbps/mm）',
        analogy: 'チップの端わずか1ミリ幅から毎秒4テラビット超のデータを送り出す、世界標準チップレット高速港',
        metric: '> 4 Tbps/mm / 0.25 pJ/bit',
        scaleLabel: 'UCIe-S: 56 Gb/s/LANE',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        art: (p) => `
          <!-- Chiplet A <-> UCIe-S Shoreline Micro-Bundle <-> Chiplet B -->
          <rect x="74" y="90" width="164" height="178" rx="9" fill="url(#${p}_emerald)" stroke="#059669" stroke-width="1.4"/>
          <text x="156" y="116" text-anchor="middle" font-size="10.2" font-weight="900" fill="#fff">Chiplet A (ISP)</text>
          <rect x="92" y="132" width="128" height="44" rx="5" fill="#0f172a" fill-opacity="0.35"/>
          <text x="156" y="152" text-anchor="middle" font-size="8.6" font-weight="800" fill="#d1fae5">UCIe Protocol Layer</text>
          <text x="156" y="166" text-anchor="middle" font-size="7.6" fill="#fef08a">CRC + リトライ自動再送</text>
          <rect x="92" y="186" width="128" height="64" rx="5" fill="#0f172a" fill-opacity="0.55"/>
          <text x="156" y="208" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">56G TX/RX PHY</text>
          <text x="156" y="224" text-anchor="middle" font-size="7.8" fill="#6ee7b7">64データ＋冗長レーン</text>
          <text x="156" y="238" text-anchor="middle" font-size="7.8" fill="#fde047">省エネ 0.25 pJ/bit!</text>

          <!-- Ultra-Dense Shoreline Lanes (1mm edge > 4 Tbps!) -->
          <rect x="238" y="128" width="132" height="118" rx="4" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.3"/>
          ${Array.from({ length: 8 }, (_, i) => {
            const y = 140 + i * 13;
            const spare = i === 7;
            return `<line x1="242" y1="${y}" x2="366" y2="${y}" stroke="${spare ? '#f59e0b' : '#0284c7'}" stroke-width="${spare ? '2' : '2.4'}" stroke-dasharray="${spare ? '4 2' : 'none'}"/>`;
          }).join('')}
          <text x="304" y="118" text-anchor="middle" font-size="8.8" font-weight="900" fill="#0369a1">56 Gb/s × 高密度マイクロレーン</text>
          <text x="304" y="262" text-anchor="middle" font-size="8.2" font-weight="800" fill="#d97706">破線＝自動リペア予備レーン</text>

          <!-- Chiplet B -->
          <rect x="370" y="90" width="144" height="178" rx="9" fill="url(#${p}_hfo2)" stroke="#7c3aed" stroke-width="1.4"/>
          <text x="442" y="116" text-anchor="middle" font-size="10.2" font-weight="900" fill="#fff">Chiplet B (AI)</text>
          <rect x="384" y="138" width="116" height="50" rx="5" fill="#0f172a" fill-opacity="0.4"/>
          <text x="442" y="160" text-anchor="middle" font-size="8.6" font-weight="800" fill="#ede9fe">先進パッケージ直結</text>
          <text x="442" y="176" text-anchor="middle" font-size="7.6" fill="#fef08a">CoWoS-L / EMIB-T</text>
          <rect x="384" y="198" width="116" height="52" rx="5" fill="#0f172a" fill-opacity="0.55"/>
          <text x="442" y="220" text-anchor="middle" font-size="8.6" font-weight="900" fill="#fff">レイテンシ &lt; 2 ns</text>
          <text x="442" y="236" text-anchor="middle" font-size="7.8" fill="#c4b5fd">モノリシック同等遅延!</text>

          <!-- Right Panel KPIs -->
          ${kpiCard(530, 94, 162, 56, '海岸線帯域密度', '> 4.0 Tbps/mm', '1mm幅で4K動画2万本分', '#0284c7')}
          ${kpiCard(530, 160, 162, 56, '転送エネルギー効率', '~0.25 pJ/bit', '従来PCIeの約 1/20', '#059669')}
          ${kpiCard(530, 226, 162, 54, '標準化規格', 'UCIe 2.0 / 3.0', 'ISSCC 2026 56G実証', '#7c3aed')}

          ${nanoPin(304, 178, 92, 314, 1, 'ソース同期フォワードクロック', '低消費電力で56G PAM4/NRZを受信', '#0284c7', 'start')}
          ${nanoPin(304, 232, 376, 314, 2, 'IEEE 1838連携レーン自動修復', 'バンプ不良1本でも予備線へ即切替', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'UCIe-S標準に準拠した56 Gb/s/lane超高密度ダイ間PHY', line2: 'シリコンブリッジ直結＋フォワードクロック＋予備レーン修復' },
          { label: '撮影・画質への恩恵', line1: 'ISP・AI・動画チップレットを1枚の巨大チップのように結合', line2: 'α・FX・VENICE各機種へ共通チップレットを自在組合せ展開' },
          { label: '実機・2026学会諸元', line1: '帯域密度 >4 Tbps/mm・エネルギー ~0.25 pJ/bit・遅延<2ns', line2: 'ISSCC 2026 UCIe-S 56G/lane チップレットD2D最新実証' },
        ],
      });

    // X2-50. HBM4 2048-bit Ultra-Wide Base-Die Logic Interface (ISSCC 2026 / >2 TB/s)
    case 'xv2_hbm4_2048b_base_die':
      return renderBionzV2Hd({
        badge: 'X2-50',
        zone: 'pkg35d',
        nodeTag: 'ISSCC 2026 · HBM4 2048b',
        title: 'HBM4「2048ビット超広幅ベースダイ・ロジックインターフェース」（>2 TB/s）',
        analogy: 'データ道路の幅を一気に2,048車線へ倍増し、底面のカスタム演算ベースダイで超広帯域処理',
        metric: '2048-bit / > 2.0 TB/s',
        scaleLabel: 'HBM4: 12-HI / 16-HI + LOGIC BASE',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        art: (p) => `
          <!-- Left: 12-Hi HBM4 DRAM Stack + Custom Foundry Logic Base Die -->
          <rect x="76" y="88" width="290" height="196" rx="10" fill="#ffffff" stroke="#93c5fd" stroke-width="1.3"/>
          <text x="221" y="106" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1e3a8a">HBM4 12–16段積層DRAM ＋ ロジックベースダイ</text>

          <!-- 8 Visual DRAM Tiers representing 12-16 Hi Stack pierced by TSVs -->
          ${Array.from({ length: 6 }, (_, i) => `
            <rect x="100" y="${116 + i * 16}" width="242" height="12" rx="2" fill="url(#${p}_blue)" stroke="#1e40af" stroke-width="0.7"/>
          `).join('')}
          ${[138, 178, 221, 264, 304].map((x) => `<rect x="${x - 3}" y="116" width="6" height="96" fill="#fde047" opacity="0.88"/>`).join('')}
          <text x="221" y="166" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">12〜16段積層 1c DRAM ダイ群（TSV貫通）</text>

          <!-- Custom Foundry Logic Base Die (TSMC N4/N3/N2 Base Die!) -->
          <rect x="92" y="216" width="258" height="32" rx="4" fill="url(#${p}_emerald)" stroke="#065f46" stroke-width="1.3"/>
          <text x="221" y="236" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">先端ファウンドリ製 カスタムロジックベースダイ</text>

          <!-- 2048-bit Ultra-Wide Micro-Bump Highway -->
          ${Array.from({ length: 16 }, (_, i) => `<rect x="${104 + i * 15}" y="250" width="7" height="16" rx="1" fill="url(#${p}_cu)"/>`).join('')}
          <text x="221" y="278" text-anchor="middle" font-size="8.4" font-weight="900" fill="#b45309">2,048-bit 超広幅並列バス（HBM3E 1024-bitの2倍!）</text>

          <!-- Right Panel: HBM3E vs HBM4 Comparison -->
          <rect x="386" y="88" width="306" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="539" y="108" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f172a">HBM3E vs HBM4 世代比較（1スタック）</text>
          ${kpiCard(398, 120, 134, 68, 'I/O バス幅', '1024 → 2048 bit', '2倍の超並列車線化!', '#2563eb')}
          ${kpiCard(546, 120, 134, 68, '実効帯域/スタック', '> 2.0 TB/s', '16K RAW・巨大AIモデル即読', '#059669')}
          <rect x="398" y="200" width="282" height="72" rx="7" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="539" y="220" text-anchor="middle" font-size="9.0" font-weight="900" fill="#1e40af">ベースダイ・ロジック化の革新（2026年標準）</text>
          <text x="539" y="238" text-anchor="middle" font-size="8.2" font-weight="600" fill="#1e3a8a">最下層ベースダイへ先端CMOSロジック（カスタムPHY・</text>
          <text x="539" y="254" text-anchor="middle" font-size="8.2" font-weight="600" fill="#1e3a8a">Near-Memory AI前処理）を直接作り込み低電圧・高速化!</text>

          ${nanoPin(221, 232, 92, 314, 1, '32独立チャネル×64bit並列制御', 'マルチストリームISP＆AIアクセス無衝突', '#059669', 'start')}
          ${nanoPin(221, 260, 376, 314, 2, '2048本同時・低クロック省エネ駆動', '高周波化せず帯域倍増で発熱を抑制', '#2563eb', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'I/O幅を1024→2048bitへ倍増し32独立チャネルで並列アクセス', line2: '最下層ベースダイに先端ロジックCMOSを採用しPHY/演算統合' },
          { label: '撮影・画質への恩恵', line1: '将来のプロシネマ機で16K RAW連写＆マルチモーダルAIを同時処理', line2: '低動作クロックのまま2TB/s超帯域を稼ぎ省電力化を実現' },
          { label: '実機・2026学会諸元', line1: 'JEDEC HBM4（2048-bit・>2.0 TB/s/stack・12–16Hi積層）', line2: 'ISSCC 2026 発表・2026年サンプル→量産立ち上げ世代' },
        ],
      });

    // X2-51. >110 GHz C-Band GeSi Electro-Absorption Modulator (EAM) & Ge PD (imec IEDM 2025 41-3)
    case 'xv2_gesi_110ghz_eam_cpo':
      return renderBionzV2Hd({
        badge: 'X2-51',
        zone: 'pkg35d',
        nodeTag: 'imec · IEDM 2025 41-3',
        title: '>110 GHz Cバンド「GeSi電界吸収型光変調器（EAM）＆ Ge受光素子」',
        analogy: 'わずか数十μmの極小GeSi結晶で毎秒1100億回以上レーザー光を点滅させる超高速光シャッター',
        metric: '帯域 >110 GHz / 200G+/lane',
        scaleLabel: 'GeSi EAM: LENGTH ~40 μm',
        accent: '#e11d48',
        accentSoft: '#fff1f2',
        art: (p) => `
          <!-- GeSi EAM Waveguide + GSG RF Traveling-Wave Electrodes -->
          <rect x="74" y="88" width="424" height="196" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="1.5"/>
          <text x="286" y="106" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fda4af">Cバンド（1550 nm）GeSi 量子閉じ込めシュタルク効果（FK効果）光変調器</text>

          <!-- Continuous CW Laser In -->
          <line x1="88" y1="186" x2="174" y2="186" stroke="#f43f5e" stroke-width="5"/>
          <text x="128" y="174" text-anchor="middle" font-size="8.4" font-weight="900" fill="#fda4af">CW 連続レーザー</text>
          <text x="128" y="206" text-anchor="middle" font-size="7.6" fill="#94a3b8">1550 nm C-Band</text>

          <!-- Compact GeSi EAM Active Core sandwiched by GSG RF Electrodes -->
          <rect x="174" y="132" width="142" height="24" rx="3" fill="url(#${p}_gold)"/>
          <text x="245" y="147.5" text-anchor="middle" font-size="8.0" font-weight="900" fill="#713f12">GSG 高周波RF電極 (>110GHz)</text>
          <rect x="174" y="160" width="142" height="52" rx="6" fill="url(#${p}_sige)" stroke="#fda4af" stroke-width="1.5"/>
          <text x="245" y="182" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">GeSi 電界吸収コア</text>
          <text x="245" y="198" text-anchor="middle" font-size="7.8" fill="#ffe4e6">電界ONで光吸収 / OFFで透過</text>
          <rect x="174" y="216" width="142" height="20" rx="3" fill="url(#${p}_gold)"/>
          <text x="245" y="229.5" text-anchor="middle" font-size="7.8" font-weight="900" fill="#713f12">GND 電極（超低容量 &lt; 20 fF）</text>

          <!-- Modulated >200 Gb/s Optical Pulses Out -> Ge Photodiode -->
          ${[328, 356, 384, 412].map((x) => `<rect x="${x}" y="178" width="16" height="16" rx="8" fill="#ec4899" stroke="#ffffff" stroke-width="0.9"/>`).join('')}
          <rect x="440" y="162" width="46" height="48" rx="6" fill="url(#${p}_cyan)" stroke="#bae6fd"/>
          <text x="463" y="184" text-anchor="middle" font-size="8.6" font-weight="900" fill="#fff">Ge</text>
          <text x="463" y="198" text-anchor="middle" font-size="7.6" font-weight="800" fill="#e0f2fe">PD受光</text>
          <text x="380" y="214" text-anchor="middle" font-size="8.2" font-weight="900" fill="#f9a8d4">200+ Gb/s PAM4 光パルス!</text>

          <!-- Right Panel: Frequency Response Plot >110 GHz -->
          <rect x="514" y="88" width="178" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="603" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">光電応答帯域（S₂₁）</text>
          <line x1="530" y1="208" x2="678" y2="208" stroke="#475569" stroke-width="1.2"/>
          <line x1="530" y1="126" x2="530" y2="208" stroke="#475569" stroke-width="1.2"/>
          <line x1="530" y1="164" x2="676" y2="164" stroke="#94a3b8" stroke-dasharray="3 2"/>
          <text x="676" y="160" text-anchor="end" font-size="7.4" fill="#64748b">−3 dBライン</text>
          <path d="M 530 134 L 610 140 Q 648 148 662 168 L 674 192" fill="none" stroke="#e11d48" stroke-width="2.6"/>
          <circle cx="660" cy="164" r="4" fill="#e11d48"/>
          <text x="646" y="198" text-anchor="end" font-size="8.6" font-weight="900" fill="#be123c">&gt; 110 GHz!</text>
          ${kpiCard(524, 218, 158, 54, '素子長（超小型）', '~40 μm（MZMの1/50）', '低消費電力・高密度実装', '#e11d48')}

          ${nanoPin(245, 186, 92, 314, 1, 'フランツ・ケルディッシュ電界吸収', 'リング型と違い温度ドリフト耐性が抜群', '#e11d48', 'start')}
          ${nanoPin(463, 210, 376, 314, 2, '同一Siフォトニクス上のGe受光器', '送受信ワンチップCPOの心臓部', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '長さ約40μmのGeSi導波路で電界により光吸収率を高速変調', line2: '従来マッハツェンダー変調器の1/50サイズで110GHz超を達成' },
          { label: '撮影・画質への恩恵', line1: '温度変化に強く放送・シネマ撮影現場の屋外でも安定光通信', line2: '1レーン200Gb/s超の光伝送を極小フットプリントで実現' },
          { label: '実機・2026学会諸元', line1: 'EO帯域 >110 GHz（Cバンド 1550 nm）/ 極小容量 <20 fF', line2: 'imec IEDM 2025 Paper 41-3 GeSi EAM＆Ge PD実証' },
        ],
      });

    // X2-52. Direct-to-Silicon 3D IC Microfluidic Pin-Fin Liquid Cooler (imec IEDM 2025 17-3)
    case 'xv2_microfluidic_si_cooler':
      return renderBionzV2Hd({
        badge: 'X2-52',
        zone: 'bspdn_cool',
        nodeTag: 'imec · IEDM 2025 17-3',
        title: 'シリコン直彫り「3D ICマイクロ流体・極微ピンフィン液冷マニホールド」',
        analogy: 'グリスも銅板も介さず、チップのシリコン背面へ直接ミクロの水路を彫り冷却液を流す究極放熱',
        metric: '熱流束 > 1 kW/cm² / TIM不要',
        scaleLabel: 'MICRO-PIN FIN: 50 μm PITCH',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        art: (p) => `
          <!-- Direct-to-Silicon Microfluidic Cutaway Cross-Section -->
          <rect x="74" y="88" width="424" height="196" rx="10" fill="#ffffff" stroke="#67e8f9" stroke-width="1.4"/>
          <text x="286" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0e7490">チップ背面シリコン直彫り マイクロ流体ジェット衝突＆ピンフィン冷却</text>

          <!-- Top: Active 2nm GAA / 3D IC Heat-Generating Core -->
          <rect x="94" y="116" width="384" height="32" rx="4" fill="url(#${p}_heat)"/>
          <text x="286" y="136" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">2nm GAA / 3D積層チップ 発熱面（ホットスポット直下）</text>

          <!-- Direct-Etched Silicon Micro-Pin-Fin Array bathed in Coolant! -->
          <rect x="94" y="148" width="384" height="68" fill="#cffafe" stroke="#06b6d4" stroke-width="1.3"/>
          ${Array.from({ length: 11 }, (_, i) => `
            <rect x="${112 + i * 33}" y="148" width="14" height="48" rx="2" fill="url(#${p}_si)" stroke="#0e7490" stroke-width="0.7"/>
          `).join('')}
          <!-- Turbulent Coolant Flow Arrows -->
          <path d="M 102 204 Q 148 186 196 204 T 290 204 T 384 204 T 466 204" fill="none" stroke="#0284c7" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>
          <text x="286" y="212" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0369a1">冷却流体（誘電液／純水）高速乱流通過 — 熱界面抵抗 R_TIM = 0!</text>

          <!-- Bottom Jet-Impingement Nozzle Manifold -->
          <rect x="94" y="218" width="384" height="44" rx="5" fill="#1e293b"/>
          <text x="158" y="244" text-anchor="middle" font-size="8.8" font-weight="900" fill="#38bdf8">← 低温流入 (Inlet)</text>
          <text x="412" y="244" text-anchor="middle" font-size="8.8" font-weight="900" fill="#fb7185">温水排出 (Outlet) →</text>
          <path d="M 244 252 L 244 218 M 328 252 L 328 218" stroke="#38bdf8" stroke-width="2.4" marker-end="url(#${p}_arr_blue)"/>

          <!-- Right Panel: Thermal Resistance Comparison -->
          <rect x="514" y="88" width="178" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="603" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">界面熱抵抗 R_th 比較</text>
          ${cmpBanner(524, 120, 158, '× 従来TIM+IHS: 界面大', false)}
          ${cmpBanner(524, 148, 158, '○ Si直彫液冷: 界面ゼロ!', true)}
          ${kpiCard(524, 178, 158, 46, '除去可能熱流束', '> 1,000 W/cm²', '空冷の約10倍の冷却力', '#0891b2')}
          ${kpiCard(524, 230, 158, 44, '温度上昇 ΔT', '従来比 −50%以下', 'imec IEDM 2025 17-3', '#059669')}

          ${nanoPin(216, 174, 92, 314, 1, 'DRIEシリコン直彫りピンフィン', '熱伝達表面積を数倍化し乱流熱交換', '#0891b2', 'start')}
          ${nanoPin(328, 224, 376, 314, 2, 'マイクロジェット衝突ノズル', '局所ホットスポットをピンポイント冷却', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'シリコンダイ背面を直接DRIEエッチングして極微ピンフィン形成', line2: 'TIMグリスを排除し発熱源から数十μmの位置へ冷却液を直噴射' },
          { label: '撮影・画質への恩恵', line1: '3D積層チップの熱密度限界を突破し8K/120p無制限収録へ道筋', line2: 'ジャンクション温度を劇的に下げリーク電力と暗電流雑音を抑制' },
          { label: '実機・2026学会諸元', line1: 'ピンフィンピッチ ~50 μm / 冷却能力 >1 kW/cm² 級', line2: 'imec IEDM 2025 Paper 17-3 3D-ICオンチップ液冷実証' },
        ],
      });

    // X2-53. Multi-Shear Mode Silicon BAW On-Die Clock Resonator (IEDM 2025 Paper 13-1)
    case 'xv2_si_baw_clock_resonator':
      return renderBionzV2Hd({
        badge: 'X2-53',
        zone: 'bspdn_cool',
        nodeTag: 'IEDM 2025 · Paper 13-1',
        title: 'マルチせん断モード「シリコンBAW オンダイ超高精度クロック共振器」',
        analogy: '外付け水晶振動子を追放し、チップ内部の極小AlScN/Si音叉で超高純度GHz基準拍を刻む',
        metric: '外付け水晶不要 / 高Q値',
        scaleLabel: 'AlScN / Si BRAGG BAW',
        accent: '#eab308',
        accentSoft: '#fefce8',
        art: (p) => `
          <!-- Multi-Shear Mode AlScN/Si BAW Resonator over Acoustic Bragg Reflector -->
          <rect x="74" y="88" width="414" height="196" rx="10" fill="#ffffff" stroke="#fde047" stroke-width="1.4"/>
          <text x="281" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#854d0e">オンダイ AlScN圧電 ／ シリコンマルチせん断モード BAW共振器断面</text>

          <!-- Top Interdigitated Excitation Electrodes -->
          ${[166, 224, 282, 340, 398].map((x) => `<rect x="${x - 16}" y="118" width="32" height="14" rx="2" fill="url(#${p}_gold)" stroke="#a16207"/>`).join('')}
          <!-- AlScN Piezo Film -->
          <rect x="130" y="132" width="302" height="24" rx="3" fill="url(#${p}_emerald)"/>
          <text x="281" y="147.5" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">AlScN 圧電励振膜（電気 ⇄ 超高周波せん断音波）</text>

          <!-- Single-Crystal Silicon Acoustic Resonant Body with Standing Shear Wave! -->
          <rect x="130" y="158" width="302" height="44" rx="3" fill="url(#${p}_cyan)"/>
          <path d="M 142 180 Q 178 162 214 180 T 286 180 T 358 180 T 420 180" fill="none" stroke="#fef08a" stroke-width="2.6"/>
          <path d="M 142 180 Q 178 198 214 180 T 286 180 T 358 180 T 420 180" fill="none" stroke="#ffffff" stroke-width="1.4" stroke-dasharray="3 2"/>
          <text x="281" y="197" text-anchor="middle" font-size="7.8" font-weight="900" fill="#083344">単結晶Si マルチせん断モード定在波（高Q値・低TCF）</text>

          <!-- Acoustic Bragg Reflector Mirror (Alternating High/Low Impedance SiO2 / W Layers!) -->
          ${[204, 218, 232, 246].map((y, i) => `
            <rect x="116" y="${y}" width="330" height="11" fill="${i % 2 === 0 ? '#cbd5e1' : '#334155'}"/>
          `).join('')}
          <text x="281" y="272" text-anchor="middle" font-size="8.2" font-weight="800" fill="#334155">音響ブラッグ反射鏡（SiO₂/W多層膜で振動エネルギーを完全閉じ込め!）</text>

          <!-- Right Panel: Benefits vs External Quartz Crystal -->
          ${kpiCard(506, 94, 186, 56, '外付けTCXO比較', '体積 1/100 統合', '基板実装面積＆耐衝撃性向上', '#eab308')}
          ${kpiCard(506, 160, 186, 56, '共振モード', 'マルチせん断BAW', '高Q値・サブ100fs基準源', '#059669')}
          ${kpiCard(506, 226, 186, 54, '最新学会出典', 'IEDM 2025 Paper 13-1', 'CMOSオンダイ直接集積', '#0284c7')}

          ${nanoPin(281, 180, 92, 314, 1, 'AlScN＋単結晶Si複合共振', '落下衝撃・シャッター振動でも周波数不変', '#059669', 'start')}
          ${nanoPin(380, 232, 376, 314, 2, '音響ブラッグミラー反射壁', '基板への音響漏れを防ぎ超高Q値達成', '#475569', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'AlScN圧電膜と単結晶Siのマルチせん断モード音響共振を利用', line2: '直下のSiO₂/W音響ブラッグ鏡で振動を閉じ込め超高Q値を実現' },
          { label: '撮影・画質への恩恵', line1: '外付け水晶振動子の落下割れリスクと基板占有スペースを解消', line2: '高周波GHz直接発振でADPLLのジッタと消費電力を大幅削減' },
          { label: '実機・2026学会諸元', line1: 'CMOSプロセス完全適合オンダイBAW共振器（高Q・耐振動）', line2: 'IEDM 2025 Paper 13-1 オンダイ高精度クロック源実証' },
        ],
      });

    // X2-54. Dual-Rail Side-Channel Power Masking & AI-Weight ECC Scrubbing Guard
    case 'xv2_sidechannel_ecc_guard':
      return renderBionzV2Hd({
        badge: 'X2-54',
        zone: 'bspdn_cool',
        nodeTag: '2026 SECURITY · WDDL + ECC',
        title: 'デュアルレール「サイドチャネル電力マスキング ＆ AI重みECC自動修復ガード」',
        analogy: '常に「表と裏のペア」で同じ電気を使い秘密鍵のクセを消し去り、宇宙線1bit化けも即修復',
        metric: 'DPA相関 → 0 / SECDED ECC',
        scaleLabel: 'WDDL MASKING + ACTIVE SHIELD',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        art: (p) => `
          <!-- Top Active Faraday Tamper Mesh Canopy -->
          <rect x="74" y="86" width="424" height="32" rx="6" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="1.3"/>
          <path d="M 88 102 H 484 M 118 88 V 116 M 178 88 V 116 M 238 88 V 116 M 298 88 V 116 M 358 88 V 116 M 418 88 V 116" stroke="#fde047" stroke-width="1.3" opacity="0.75"/>
          <text x="286" y="106" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">最上層アクティブ・ファラデー改ざん検知メッシュ（プローブ切断→鍵即消去）</text>

          <!-- Left: Conventional Single-Rail Power Trace (Leaks Secret Key!) -->
          <rect x="74" y="130" width="204" height="154" rx="8" fill="#ffffff" stroke="#fca5a5"/>
          ${cmpBanner(84, 138, 184, '× 通常回路: 電力波形で鍵漏洩', false)}
          <path d="M 92 224 L 108 176 L 124 224 L 146 218 L 166 176 L 184 224 L 204 220 L 224 176 L 244 224" fill="none" stroke="#dc2626" stroke-width="2.2"/>
          <text x="108" y="172" text-anchor="middle" font-size="8.0" font-weight="900" fill="#dc2626">1</text>
          <text x="146" y="212" text-anchor="middle" font-size="8.0" font-weight="900" fill="#64748b">0</text>
          <text x="166" y="172" text-anchor="middle" font-size="8.0" font-weight="900" fill="#dc2626">1</text>
          <text x="204" y="212" text-anchor="middle" font-size="8.0" font-weight="900" fill="#64748b">0</text>
          <text x="176" y="260" text-anchor="middle" font-size="8.2" font-weight="700" fill="#991b1b">「1」だけ電力スパイク → 秘密鍵解読!</text>

          <!-- Right: Dual-Rail WDDL Masked Trace (Flat Constant Power!) -->
          <rect x="292" y="130" width="206" height="154" rx="8" fill="#ffffff" stroke="#5eead4" stroke-width="1.3"/>
          ${cmpBanner(302, 138, 186, '○ デュアルレール: 電力完全平坦', true)}
          <!-- True + Complement Rails summing to FLAT line! -->
          <path d="M 310 210 L 328 182 L 346 210 L 368 210 L 386 182 L 404 210" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3 2"/>
          <path d="M 310 182 L 328 210 L 346 182 L 368 182 L 386 210 L 404 182" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 2"/>
          <line x1="308" y1="172" x2="482" y2="172" stroke="#0d9488" stroke-width="3.2"/>
          <text x="395" y="236" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f766e">I(True) + I(Comp) = 常に一定!</text>
          <text x="395" y="256" text-anchor="middle" font-size="8.0" font-weight="700" fill="#047857">DPA/EMAサイドチャネル相関 → 0</text>

          <!-- Far Right: Cosmic-Ray AI Weight SECDED ECC Scrubber -->
          <rect x="514" y="88" width="178" height="196" rx="10" fill="#0f172a" stroke="#14b8a6" stroke-width="1.4"/>
          <text x="603" y="108" text-anchor="middle" font-size="9.4" font-weight="900" fill="#5eead4">宇宙線ソフトエラー修復</text>
          <rect x="526" y="122" width="154" height="44" rx="5" fill="#1e293b" stroke="#f43f5e"/>
          <text x="603" y="140" text-anchor="middle" font-size="8.4" font-weight="800" fill="#fda4af">高山・航空機で中性子衝突</text>
          <text x="603" y="156" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff" style="font-family: ui-monospace, monospace;">0110[1→0]101</text>
          <path d="M 603 166 L 603 190" stroke="#10b981" stroke-width="2.4" marker-end="url(#${p}_arr_green)"/>
          <rect x="526" y="194" width="154" height="46" rx="5" fill="#065f46" stroke="#34d399"/>
          <text x="603" y="213" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">SECDED ECC 常時巡回</text>
          <text x="603" y="229" text-anchor="middle" font-size="8.0" fill="#a7f3d0">1-bit 即自動修復・2-bit 検知</text>
          <text x="603" y="264" text-anchor="middle" font-size="8.0" font-weight="700" fill="#99f6e4">AI重み・SRAM無停止保護</text>

          ${nanoPin(395, 172, 92, 314, 1, '相補デュアルレール WDDL論理', 'C2PA ECDSA秘密鍵への電力解析を無効化', '#0d9488', 'start')}
          ${nanoPin(603, 218, 376, 314, 2, 'バックグラウンドECCスクラビング', '2nm極小電荷セルの宇宙線誤動作ゼロ', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '相補デュアルレール電力平坦化＋最上層アクティブ改ざん遮蔽網', line2: 'AI重み＆SRAMキャッシュの常時SECDED ECCバックグラウンド修復' },
          { label: '撮影・画質への恩恵', line1: '報道用C2PA電子署名の秘密鍵を高度な物理攻撃から鉄壁防御', line2: '航空機・高山など放射線が多い環境でもAI-AF暴走・停止を防止' },
          { label: '実機・2026学会諸元', line1: 'WDDL電力マスキング ＋ Active Shield ＋ SECDED ECC', line2: '2026年フラッグシップC2PA真正性カメラ必須セキュリティ基盤' },
        ],
      });

    // X2-55. TSMC 3.5D COUPE 4.5um-Pitch Optical-Electrical Interposer (VLSI 2026)
    case 'xv2_coupe_35d_interposer':
      return renderBionzV2Hd({
        badge: 'X2-55',
        zone: 'pkg35d',
        nodeTag: 'TSMC 3.5D · COUPE VLSI 2026',
        title: 'TSMC 3.5D「COUPE 4.5μmピッチ光電融合マイクロインターポーザ」（VLSI 2026）',
        analogy: '電子ICと光ICを4.5μm縦積み直結し、4隅のV溝マイクロレンズから毎秒200Gbps超の光を放つ王冠',
        metric: '4.5 μm SoIC / >200 Gb/s/lane',
        scaleLabel: 'TSMC COUPE: 4.5 μm EIC-on-PIC',
        accent: '#db2777',
        accentSoft: '#fdf2f8',
        art: (p) => `
          <!-- Cross Section: EIC Stacked via 4.5um SoIC directly on PIC + KOH V-Groove Microlens Fiber Dock! -->
          <rect x="74" y="88" width="446" height="196" rx="10" fill="#ffffff" stroke="#f9a8d4" stroke-width="1.4"/>
          <text x="297" y="106" text-anchor="middle" font-size="9.6" font-weight="900" fill="#9d174d">TSMC 3.5D COUPE：電子IC（EIC）を光IC（PIC）真上へ 4.5 μm SoIC 直積!</text>

          <!-- Upper EIC Driver Die (N6 / 65nm CMOS) -->
          <rect x="96" y="118" width="212" height="44" rx="6" fill="url(#${p}_blue)" stroke="#1d4ed8" stroke-width="1.3"/>
          <text x="202" y="138" text-anchor="middle" font-size="9.6" font-weight="900" fill="#ffffff">上層 電子IC（EIC：N6 高速ドライバ）</text>
          <text x="202" y="153" text-anchor="middle" font-size="7.8" fill="#dbeafe">寄生容量激減・超省エネ200G+変調駆動</text>

          <!-- 4.5um-Pitch SoIC-X Cu-Cu Vertical Micro-Columns -->
          ${Array.from({ length: 9 }, (_, i) => `<rect x="${112 + i * 22}" y="162" width="10" height="22" fill="url(#${p}_cu)"/>`).join('')}
          <text x="202" y="176.5" text-anchor="middle" font-size="7.8" font-weight="900" fill="#ffffff">4.5 μm SoIC-X 垂直接合</text>

          <!-- Lower PIC Silicon Photonics Die + Optical Waveguide -->
          <rect x="96" y="184" width="276" height="48" rx="6" fill="#0f172a" stroke="#ec4899" stroke-width="1.4"/>
          <line x1="112" y1="208" x2="366" y2="208" stroke="url(#${p}_laser)" stroke-width="4.2"/>
          <circle cx="176" cy="208" r="11" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
          <circle cx="242" cy="208" r="11" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
          <text x="202" y="226" text-anchor="middle" font-size="8.0" font-weight="800" fill="#f9a8d4">下層 光IC（PIC：Si導波路＋WDM共振器）</text>

          <!-- Microlens + KOH-Etched V-Groove Single-Mode Fiber Array -->
          <ellipse cx="384" cy="208" rx="10" ry="18" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="1.6"/>
          <polygon points="400,224 504,224 504,242 400,242" fill="#94a3b8"/>
          <rect x="402" y="198" width="102" height="20" rx="10" fill="url(#${p}_laser)" stroke="#ffffff" stroke-width="1.2"/>
          <text x="453" y="211" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">単一モード光ファイバ</text>
          <text x="453" y="256" text-anchor="middle" font-size="8.0" font-weight="800" fill="#0369a1">V溝自己整合＋レンズ (&lt;1dB)</text>

          <!-- CoWoS Base Interposer -->
          <rect x="96" y="242" width="276" height="28" rx="4" fill="url(#${p}_emerald)"/>
          <text x="234" y="260" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">3.5D CoWoS パッケージ基板（演算ダイ＋HBM4＋光統合）</text>

          <!-- Right Panel: COUPE Roadmap -->
          ${kpiCard(534, 94, 158, 56, 'EIC–PIC 垂直接合', '4.5 μm SoIC-X', '電気配線比 電力 1/3–1/5', '#db2777')}
          ${kpiCard(534, 160, 158, 56, '光伝送レート', '> 200 Gb/s/lane', '1.6T → 6.4T 光エンジン', '#0284c7')}
          ${kpiCard(534, 226, 158, 54, '光結合損失', '< 1.0 dB', 'KOH V溝＋マイクロレンズ', '#059669')}

          ${nanoPin(202, 173, 92, 314, 1, '4.5μm SoIC-X 3D光電融合', '横並び配線を廃し寄生インダクタンス0', '#db2777', 'start')}
          ${nanoPin(384, 208, 376, 314, 2, '4隅V溝＋マイクロレンズ結合', '銅配線の物理限界を超える光の王冠', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '電子IC（EIC）を光IC（PIC）真上へ4.5μm SoIC-Xで垂直接合', line2: '4隅KOHエッチングV溝とマイクロレンズで光ファイバー低損失結合' },
          { label: '撮影・画質への恩恵', line1: '電気配線の距離・発熱限界を突破し超高速・超省エネデータ伝送', line2: '次世代プロシネマ・超高解像システムの光電融合標準インターフェース' },
          { label: '実機・2026学会諸元', line1: 'TSMC 3.5D COUPE（SoIC 4.5μm + CoWoS + >200Gb/s/lane）', line2: 'VLSI 2026 / TSMC 3DFabric 2026–2028年実用展開ロードマップ' },
        ],
      });

    default:
      return null;
  }
}
