import { PartExplanation } from '../../assemblies/types';
import {
  cmpBanner,
  dimArrow,
  kpiCard,
  nanoPin,
  renderBionzV2Hd,
} from './shared';

/**
 * Ultra-HD 720x500 Nanoscale Technical Schematics for BIONZ V2 Group E (X2-56 – X2-70):
 * TSMC A14 NanoFlex Pro & Boost Cells, Intel 14A RibbonFET 2 + PowerDirect,
 * imec A10 Outer-Wall Forksheet FET, 2nm Bulk GAA Full BDI Sub-Fin Stopper,
 * SDB + SAGC Cell Isolation, Active Backside Vertical ESD Diode & CDM Clamp,
 * ALD MoN -> Linerless Pure Mo Super-Via, 42nm CPP Self-Aligned Contact (SAC) + Air-Gap V0,
 * BSPDN SiGe Etch-Stop Thinning (TTV<40nm), Die-Perimeter Crack-Stop & MOB Seal Ring,
 * Deep Trench Isolation (DTI) Mixed-Signal Guard Ring, M3D Si-NS / BEOL DG-IGO Hybrid SRAM,
 * ISSCC 2026 71.5fs ADPLL & Dual-Ramp DTC, Dynamic Voltage Droop Detector & Adaptive FLL,
 * and ISSCC 2026 2nm Clock-Edge Architecture & Quad-Bit Pulse Latch.
 */
export function renderBionzV2GroupE(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // X2-56. TSMC A14 NanoFlex Pro & Boost Cell (IEDM 2026 Paper 3-2)
    case 'xv2_a14_nanoflex_pro_boost':
      return renderBionzV2Hd({
        badge: 'X2-56',
        zone: 'feol',
        nodeTag: 'TSMC A14 · IEDM 2026 3-2',
        title: 'TSMC A14「NanoFlex Pro 第2世代GAA ＆ Boost Cell 異種セル高融合」',
        analogy: '狭い小道(省電力)と広い高速道路(爆速)の2種類の幅のナノシートを1ブロック内で自在に混載',
        metric: 'SRAM < 0.017 μm²',
        scaleLabel: 'SCALE: 10 nm · A14 2nd-GAA',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        art: (p) => `
          <!-- Left: Mixed-Height Standard Cell Block (High-Density vs Boost Cell) -->
          <rect x="68" y="84" width="388" height="196" rx="10" fill="#ffffff" stroke="#7dd3fc" stroke-width="1.3"/>
          <text x="262" y="102" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">同一セルブロック内 NanoFlex Pro 異種セル幅（W_eff）ダイナミック混載</text>

          <!-- Narrow Low-Power / High-Density Cell -->
          <rect x="84" y="114" width="144" height="148" rx="7" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.15" stroke-dasharray="4 2"/>
          <text x="156" y="129" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0369a1">HD / 超省電力セル (狭W)</text>
          <!-- 3 Narrow GAA Nanosheets (nMOS + pMOS) -->
          ${[148, 172, 196].map((y) => `
            <rect x="106" y="${y}" width="36" height="10" rx="3" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="0.8"/>
            <rect x="170" y="${y}" width="36" height="10" rx="3" fill="url(#${p}_sige)" stroke="#9f1239" stroke-width="0.8"/>
          `).join('')}
          <rect x="98" y="142" width="116" height="72" rx="4" fill="url(#${p}_hfo2)" fill-opacity="0.14" stroke="#7c3aed" stroke-width="1.1"/>
          <text x="156" y="232" text-anchor="middle" font-size="8.0" font-weight="800" fill="#0f172a">待機リーク極小・面積最小</text>
          <text x="156" y="246" text-anchor="middle" font-size="7.6" font-weight="700" fill="#475569">SRAM &lt; 0.017 μm²</text>

          <!-- Wide Boost Cell (High-Speed Critical Path) -->
          <rect x="242" y="114" width="198" height="148" rx="7" fill="#fff7ed" stroke="#ea580c" stroke-width="1.35"/>
          <text x="341" y="129" text-anchor="middle" font-size="8.4" font-weight="800" fill="#c2410c">Boost Cell (広W_eff 臨界パス専用)</text>
          <!-- 4 Wide GAA Nanosheets -->
          ${[144, 164, 184, 204].map((y) => `
            <rect x="256" y="${y}" width="76" height="11" rx="3" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="0.9"/>
            <rect x="350" y="${y}" width="76" height="11" rx="3" fill="url(#${p}_sige)" stroke="#9f1239" stroke-width="0.9"/>
          `).join('')}
          <rect x="250" y="139" width="182" height="82" rx="4" fill="url(#${p}_cu)" fill-opacity="0.12" stroke="#ea580c" stroke-width="1.2"/>
          <text x="341" y="235" text-anchor="middle" font-size="8.0" font-weight="800" fill="#9a3412">駆動電流大幅ブースト (+15%速度)</text>
          <text x="341" y="248" text-anchor="middle" font-size="7.6" font-weight="700" fill="#c2410c">臨界パス遅延を局所的に即解消!</text>

          <!-- Right KPI Stack -->
          ${kpiCard(470, 86, 224, 58, 'A14 性能 / 電力ゲイン (vs N2)', '+15% 速度 ／ −30% 電力', '同電力で高速 or 同速度で省電力', '#0284c7')}
          ${kpiCard(470, 154, 224, 58, '世界最小クラス A14 SRAM', '< 0.017 μm²', '8年ぶりの大幅SRAMスケーリング', '#7c3aed')}
          ${kpiCard(470, 222, 224, 58, 'ロジック密度向上', '1.23× (異種セル最適化)', 'AI推論コアとISP制御を高密度融合', '#059669')}

          ${nanoPin(142, 177, 84, 314, 1, '第2世代GAA 狭チャネルセル', '常時稼働する背景ロジックを極小電力化', '#0284c7', 'start')}
          ${nanoPin(332, 170, 356, 314, 2, 'Boost Cell 広幅ナノシート', 'AF/AI演算のボトルネック経路だけを爆速化', '#ea580c', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '第2世代GAAナノシート幅とセル高を柔軟混載するNanoFlex Pro', line2: '臨界パスのみ広幅Boost Cellを局所配置し面積増なく動作周波数向上' },
          { label: '撮影・画質への恩恵', line1: 'AI被写体認識や30fps連写時のピーク演算を低発熱のまま瞬時処理', line2: '超高密度SRAM（<0.017μm²）でオンダイ画像キャッシュを大容量化' },
          { label: '実機・2026学会諸元', line1: 'TSMC A14（1.4nm級）：N2比 速度+15%／消費電力−30%／密度1.23×', line2: 'IEDM 2026 Paper 3-2（NanoFlex Pro & Boost Cell高融合実証）' },
        ],
      });

    // X2-57. Intel 14A RibbonFET 2 + PowerDirect + Turbo Cells (2026 PDK 0.9)
    case 'xv2_14a_ribbonfet2_powerdirect':
      return renderBionzV2Hd({
        badge: 'X2-57',
        zone: 'feol',
        nodeTag: 'Intel 14A · PDK 0.9 (2026)',
        title: 'Intel 14A「RibbonFET 2 ＋ PowerDirect 直接S/D裏面給電 ＆ Turbo Cells」',
        analogy: '電気が表面の信号線に一切寄り道せず、床下の専用エレベータで各トランジスタの足元へ直結供給',
        metric: '直接S/D裏面給電 (PowerDirect)',
        scaleLabel: 'PITCH: ~42 nm CPP · DIRECT BSPDN',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        art: (p) => `
          <!-- Cross-Section: Signal BEOL Top | RibbonFET 2 Center | PowerDirect Bottom -->
          <rect x="68" y="84" width="398" height="198" rx="10" fill="#ffffff" stroke="#93c5fd" stroke-width="1.3"/>
          <text x="267" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#1e3a8a">PowerDirect：ソース／ドレイン底面への完全直接コンタクト断面</text>

          <!-- Top: Signal-Only M0/M1 BEOL -->
          <rect x="84" y="112" width="366" height="32" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
          ${[112, 166, 224, 286, 348, 402].map((x) => `<rect x="${x}" y="118" width="28" height="10" rx="2" fill="url(#${p}_blue)"/>`).join('')}
          <text x="267" y="139" text-anchor="middle" font-size="7.6" font-weight="800" fill="#334155">表面 BEOL（信号専用・電源配線ゼロで混雑解消!）</text>

          <!-- Middle: RibbonFET 2 (4 Stacked Ribbons + Epi S/D) -->
          <rect x="116" y="152" width="66" height="62" rx="6" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.2"/>
          <text x="149" y="186" text-anchor="middle" font-size="9.0" font-weight="900" fill="#fff">Source</text>
          <rect x="352" y="152" width="66" height="62" rx="6" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.2"/>
          <text x="385" y="186" text-anchor="middle" font-size="9.0" font-weight="900" fill="#fff">Drain</text>

          <!-- Central Gate Stack wrapping 4 horizontal nanoribbons -->
          <rect x="182" y="148" width="170" height="70" rx="5" fill="url(#${p}_hfo2)" fill-opacity="0.22" stroke="#7c3aed" stroke-width="1.2"/>
          ${[156, 171, 186, 201].map((y) => `
            <rect x="184" y="${y}" width="166" height="8.5" rx="3" fill="url(#${p}_si)" stroke="#38bdf8" stroke-width="1"/>
          `).join('')}
          <text x="267" y="145" text-anchor="middle" font-size="7.8" font-weight="800" fill="#5b21b6">RibbonFET 2（第2世代 水平積層ナノリボン）</text>

          <!-- Bottom: PowerDirect Direct Backside S/D Contacts + Thick Cu BSPDN -->
          <rect x="136" y="214" width="26" height="32" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.2"/>
          <rect x="372" y="214" width="26" height="32" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.2"/>
          <line x1="149" y1="244" x2="149" y2="218" stroke="#ffffff" stroke-width="2" marker-end="url(#${p}_arr_gold)"/>
          <line x1="385" y1="244" x2="385" y2="218" stroke="#ffffff" stroke-width="2" marker-end="url(#${p}_arr_gold)"/>
          <rect x="84" y="246" width="366" height="26" rx="4" fill="url(#${p}_cu)"/>
          <text x="267" y="263" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">裏面極太電源レール BSPDN（VDD / VSS → S/D底面へ最短直結!）</text>

          <!-- Right Panel: PowerVia vs PowerDirect Comparison -->
          ${cmpBanner(482, 86, 212, '従来 PowerVia: 表面M0経由回り道', false)}
          ${cmpBanner(482, 114, 212, 'PowerDirect: S/D底面へ直接着地', true)}
          ${kpiCard(482, 146, 212, 62, '14A ワット性能 (vs 18A)', '+15–20% Perf/W', 'または同性能で消費電力 −25–35%', '#2563eb')}
          ${kpiCard(482, 218, 212, 62, 'Turbo Cells + High-NA EUV', '最高周波数を局所強化', '0.55 NA 単一露光で微細化精度向上', '#d97706')}

          ${nanoPin(149, 230, 86, 314, 1, '直接S/D裏面コンタクト', '表面M0配線や埋設レールを介さずIRドロップ極小', '#d97706', 'start')}
          ${nanoPin(267, 182, 344, 314, 2, 'RibbonFET 2 ＋ Turbo Cells', '静電制御強化と高駆動チャネルで超高速応答', '#2563eb', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '第2世代GAA RibbonFET 2のS/D底面へ裏面電源が直接着地するPowerDirect', line2: '表面M0迂回を完全排除し、配線抵抗とIRドロップを劇的に最小化' },
          { label: '撮影・画質への恩恵', line1: '4K120p＋リアルタイムAI AF同時稼働時の局所電圧降下を抑止', line2: 'Turbo Cellsの局所配置によりバッテリー持続時間と最高応答を両立' },
          { label: '実機・2026学会諸元', line1: 'Intel 14A（2026 PDK 0.9）：18A比 Perf/W +15–20%・電力−25–35%', line2: 'High-NA EUV（0.55 NA）単一パターニング＋PowerDirect量産世代' },
        ],
      });

    // X2-58. imec A10 Outer-Wall Forksheet FET (VLSI 2025/2026)
    case 'xv2_outer_wall_forksheet_fet':
      return renderBionzV2Hd({
        badge: 'X2-58',
        zone: 'feol',
        nodeTag: 'imec A10 · VLSI 2025/26',
        title: 'imec A10「アウターウォール・フォークシート（Outer-Wall Forksheet）FET」',
        analogy: '隣り合う細胞同士の間に極薄セラミック障壁を外壁として立て、狭小化と歪みパワーを同時回復',
        metric: 'SRAM −22% / 駆動 +33%',
        scaleLabel: 'p-p / n-n WALL: < 8 nm SiN',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- Side-by-side: Inner-Wall (Old) vs Outer-Wall Forksheet (2025/26 Breakthrough) -->
          <rect x="68" y="84" width="212" height="196" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          <text x="174" y="102" text-anchor="middle" font-size="8.8" font-weight="800" fill="#991b1b">従来 Inner-Wall Forksheet</text>
          <!-- Central Wall between nMOS & pMOS -->
          <rect x="167" y="118" width="14" height="114" rx="2" fill="#94a3b8" stroke="#475569"/>
          <!-- nMOS left, pMOS right touching central wall -->
          ${[132, 160, 188].map((y) => `
            <rect x="108" y="${y}" width="57" height="14" rx="2" fill="url(#${p}_cyan)"/>
            <rect x="183" y="${y}" width="57" height="14" rx="2" fill="url(#${p}_sige)"/>
          `).join('')}
          <text x="174" y="252" text-anchor="middle" font-size="8.0" font-weight="800" fill="#b91c1c">× 中央壁がp-n間の歪み応力を阻害</text>
          <text x="174" y="266" text-anchor="middle" font-size="7.6" font-weight="700" fill="#991b1b">コンタクト抵抗・プロセス難度も増大</text>

          <!-- Right: Outer-Wall Forksheet (imec A10 Breakthrough) -->
          <rect x="292" y="84" width="240" height="196" rx="10" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.45"/>
          <text x="412" y="102" text-anchor="middle" font-size="8.8" font-weight="800" fill="#5b21b6">新世代 Outer-Wall Forksheet（A10）</text>
          <!-- Outer SiN Walls on Left & Right Perimeter! -->
          <rect x="304" y="118" width="12" height="116" rx="2" fill="url(#${p}_hfo2)"/>
          <rect x="508" y="118" width="12" height="116" rx="2" fill="url(#${p}_hfo2)"/>
          <!-- Forked Gate wrapping 3 sides (top/bottom/inner) -->
          <rect x="318" y="122" width="188" height="106" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.2"/>
          ${[134, 162, 190].map((y) => `
            <rect x="318" y="${y}" width="78" height="14" rx="2" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="0.9"/>
            <rect x="428" y="${y}" width="78" height="14" rx="2" fill="url(#${p}_sige)" stroke="#9f1239" stroke-width="0.9"/>
          `).join('')}
          <!-- Stress arrows inside channel -->
          <line x1="398" y1="169" x2="426" y2="169" stroke="#059669" stroke-width="2" marker-start="url(#${p}_arr_green)" marker-end="url(#${p}_arr_green)"/>
          <text x="412" y="248" text-anchor="middle" font-size="8.0" font-weight="800" fill="#065f46">○ 外壁配置でフルひずみ応力維持!</text>
          <text x="412" y="264" text-anchor="middle" font-size="7.8" font-weight="800" fill="#5b21b6">駆動電流 +33%回復 ＆ セル間超近接</text>

          <!-- Far Right KPIs -->
          ${kpiCard(544, 86, 152, 58, 'SRAM 面積削減', '−22% (vs A14)', 'p-p / n-n間隔を極小化', '#7c3aed')}
          ${kpiCard(544, 154, 152, 58, '駆動電流回復', '+33% Ion', '完全チャネルひずみ保持', '#059669')}
          ${kpiCard(544, 222, 152, 58, '世代ブリッジ', 'GAA → CFET', 'imec A10 (1nm級) 本命', '#0284c7')}

          ${nanoPin(310, 174, 86, 314, 1, 'アウターSiN誘電体壁', 'セル外周に壁を移設し隣セルとの絶縁距離を圧縮', '#7c3aed', 'start')}
          ${nanoPin(412, 169, 368, 314, 2, '連続チャネルひずみ開放', '中央を完全解放し高移動度＋低容量を両立', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '誘電体分離壁をn-p間ではなくセル外周へ移したOuter-Wall Forksheet', line2: 'フォーク型三面ゲート制御を維持しつつチャネルひずみ応力を完全保存' },
          { label: '撮影・画質への恩恵', line1: 'GAAとCFETの狭間であるA10世代でSRAM面積をさらに22%圧縮', line2: 'ISPのフレームバッファ＆AI重み保持SRAMを高歩留まりで大規模化' },
          { label: '実機・2026学会諸元', line1: 'imec VLSI 2025/2026 実証（A10ノード向けOuter-Wall Forksheet）', line2: 'SRAM面積−22%、従来フォークシート比で駆動電流+33%回復' },
        ],
      });

    // X2-59. 2nm Bulk GAA Full BDI & Sub-Fin Punch-Through Stopper
    case 'xv2_full_bdi_subfin_stopper':
      return renderBionzV2Hd({
        badge: 'X2-59',
        zone: 'feol',
        nodeTag: '2nm Bulk GAA · Full BDI',
        title: '2nm GAA必須「全面ボトム誘電体絶縁（Full BDI）＆ サブチャネル遮断層」',
        analogy: 'トンネルの床下全面に分厚い防水コンクリートを敷き詰め、地下水(リーク電流)の抜け道を完全に塞ぐ',
        metric: '床下パンチスルー −99%',
        scaleLabel: 'Full BDI: ~12 nm SiN/SiO₂',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        art: (p) => `
          <!-- Cross-Section: Without BDI (Left) vs Full BDI (Right) -->
          <rect x="68" y="84" width="222" height="196" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          <text x="179" y="102" text-anchor="middle" font-size="8.8" font-weight="800" fill="#991b1b">× 従来PTSドープ（BDIなし）</text>
          <!-- S/D + Channels + Bulk Si -->
          <rect x="86" y="186" width="186" height="48" rx="4" fill="url(#${p}_si)"/>
          <rect x="92" y="130" width="38" height="62" rx="3" fill="url(#${p}_cyan)"/>
          <rect x="228" y="130" width="38" height="62" rx="3" fill="url(#${p}_cyan)"/>
          ${[136, 152, 168].map((y) => `<rect x="130" y="${y}" width="98" height="8" rx="2" fill="#38bdf8"/>`).join('')}
          <!-- Parasitic Sub-fin Leakage Arrows! -->
          <path d="M 112 192 C 145 216 212 216 246 192" fill="none" stroke="#ef4444" stroke-width="2.6" stroke-dasharray="5 3" marker-end="url(#${p}_arr_red)"/>
          <text x="179" y="224" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fca5a5">寄生サブチャネル漏洩!</text>
          <text x="179" y="254" text-anchor="middle" font-size="7.8" font-weight="800" fill="#b91c1c">× 不純物散乱・待機電力増大・変動大</text>

          <!-- Right: Full Bottom Dielectric Isolation (Full BDI) -->
          <rect x="302" y="84" width="248" height="196" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="1.45"/>
          <text x="426" y="102" text-anchor="middle" font-size="8.8" font-weight="800" fill="#065f46">○ 全面ボトム誘電体絶縁（Full BDI）</text>
          <!-- Bulk Si Substrate -->
          <rect x="320" y="200" width="212" height="36" rx="4" fill="url(#${p}_si)"/>
          <text x="426" y="222" text-anchor="middle" font-size="7.8" font-weight="700" fill="#94a3b8">バルクSi基板（完全電気絶縁）</text>
          <!-- FULL BDI Continuous Dielectric Barrier! -->
          <rect x="320" y="184" width="212" height="16" rx="2" fill="url(#${p}_emerald)" stroke="#047857" stroke-width="1.2"/>
          <text x="426" y="195" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">Full BDI（SiN / SiO₂ 連続絶縁床）</text>
          <!-- S/D & GAA Sheets sitting cleanly ABOVE Full BDI -->
          <rect x="328" y="126" width="42" height="58" rx="3" fill="url(#${p}_cyan)" stroke="#0369a1"/>
          <rect x="482" y="126" width="42" height="58" rx="3" fill="url(#${p}_cyan)" stroke="#0369a1"/>
          <rect x="370" y="122" width="112" height="62" rx="3" fill="url(#${p}_hfo2)" fill-opacity="0.2" stroke="#7c3aed"/>
          ${[132, 148, 164].map((y) => `<rect x="370" y="${y}" width="112" height="8.5" rx="2" fill="#0284c7"/>`).join('')}
          <text x="426" y="254" text-anchor="middle" font-size="8.0" font-weight="800" fill="#065f46">○ SOI基板並の完全絶縁をバルク安価実現!</text>
          <text x="426" y="268" text-anchor="middle" font-size="7.6" font-weight="700" fill="#047857">S/D底面〜ゲート直下の漏洩路を100%物理遮断</text>

          <!-- Right Process KPIs -->
          ${kpiCard(562, 86, 134, 58, '犠牲層エッチング', '高Ge ~45% SiGe', '最下層を選択除去→充填', '#059669')}
          ${kpiCard(562, 154, 134, 58, 'オフ電流削減', 'I_off 桁違い低減', 'PTS高濃度ドープ不要化', '#0284c7')}
          ${kpiCard(562, 222, 134, 58, '寄生容量 C_j', 'S/D底面大幅削減', '高速スイッチ＆低消費電力', '#7c3aed')}

          ${nanoPin(426, 192, 92, 314, 1, 'Full BDI 連続誘電体フロア', 'ゲート直下とS/D底面を一括遮断し寄生電流ゼロへ', '#059669', 'start')}
          ${nanoPin(426, 148, 376, 314, 2, '純粋3段GAAチャネル動作', 'サブフィン寄生がなく理想的なサブスレッショルド特性', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '最下層の高Ge（~45%）SiGe犠牲層を選択除去しSiN/SiO₂で全面充填', line2: 'ゲート直下からS/D底面まで連続絶縁するFull BDIでバルク漏洩を根絶' },
          { label: '撮影・画質への恩恵', line1: 'カメラ待機中や撮影間のアイドルリーク電流を激減し電池持ちを改善', line2: 'S/D接合容量の低減により高クロック駆動時の発熱も同時に抑制' },
          { label: '実機・2026学会諸元', line1: '2nm Bulk GAA量産必須構造（高Ge SiGe犠牲エッチ＋コンフォーマルBDI）', line2: '高価なSOIウェハーを使わずにSOI級の完全絶縁＆Vthばらつき低減を実現' },
        ],
      });

    // X2-60. SDB (Single Diffusion Break) + SAGC (Self-Aligned Gate Cut)
    case 'xv2_sdb_sagc_cell_isolation':
      return renderBionzV2Hd({
        badge: 'X2-60',
        zone: 'feol',
        nodeTag: '2nm / A14 · 1-CPP Isolation',
        title: '標準セル高縮小の極意「SDB（シングル拡散ブレーク）＆ SAGC（自己整合ゲートカット）」',
        analogy: 'マンションの部屋の間仕切りを2枚壁から極薄1枚壁(SDB)にし、廊下も幅12nm未満のレーザー刃(SAGC)で寸断',
        metric: '1 CPP分離 / カット幅 < 12 nm',
        scaleLabel: 'CPP: 42–48 nm · SAGC < 12 nm',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Top-Down SEM Layout Plan View showing orthogonal SDB (vertical) & SAGC (horizontal) -->
          <rect x="68" y="84" width="388" height="196" rx="10" fill="#ffffff" stroke="#fcd34d" stroke-width="1.35"/>
          <text x="262" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#92400e">標準セル上面レイアウト：直交する SDB（横分離）× SAGC（縦分離）</text>

          <!-- 4 Standard Cells (2x2 Grid) -->
          <!-- Active Diffusion Stripes -->
          <rect x="88" y="122" width="154" height="28" rx="4" fill="url(#${p}_cyan)" fill-opacity="0.85"/>
          <rect x="88" y="160" width="154" height="28" rx="4" fill="url(#${p}_sige)" fill-opacity="0.85"/>
          <rect x="276" y="122" width="160" height="28" rx="4" fill="url(#${p}_cyan)" fill-opacity="0.85"/>
          <rect x="276" y="160" width="160" height="28" rx="4" fill="url(#${p}_sige)" fill-opacity="0.85"/>

          <rect x="88" y="210" width="154" height="24" rx="4" fill="url(#${p}_sige)" fill-opacity="0.85"/>
          <rect x="88" y="242" width="154" height="24" rx="4" fill="url(#${p}_cyan)" fill-opacity="0.85"/>
          <rect x="276" y="210" width="160" height="24" rx="4" fill="url(#${p}_sige)" fill-opacity="0.85"/>
          <rect x="276" y="242" width="160" height="24" rx="4" fill="url(#${p}_cyan)" fill-opacity="0.85"/>

          <!-- Metal Gate Lines crossing vertically -->
          ${[112, 150, 188, 224, 298, 336, 374, 412].map((x) => `
            <rect x="${x}" y="116" width="10" height="76" rx="1.5" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="0.7"/>
            <rect x="${x}" y="206" width="10" height="64" rx="1.5" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="0.7"/>
          `).join('')}

          <!-- VERTICAL SDB (Single Diffusion Break) Trench: 1 CPP only! -->
          <rect x="250" y="112" width="18" height="160" rx="3" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.3"/>
          <text x="259" y="196" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff" transform="rotate(-90 259 196)">SDB (1 CPP SiN壁)</text>

          <!-- HORIZONTAL SAGC (Self-Aligned Gate Cut) Blade: < 12nm! -->
          <rect x="82" y="193" width="360" height="11" rx="2" fill="#7c3aed" stroke="#4c1d95" stroke-width="1.1"/>
          <text x="168" y="201.5" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">SAGC 自己整合ゲートカット (&lt;12nm)</text>

          <!-- Right Panel: DDB -> SDB Area Savings + KPIs -->
          ${cmpBanner(472, 86, 222, '旧世代 DDB: ダミー2本分ムダ (2 CPP)', false)}
          ${cmpBanner(472, 114, 222, '2nm SDB: 単一深掘り壁 (1 CPP)', true)}
          ${kpiCard(472, 146, 222, 62, 'セル面積スケーリング', '約 −15–20% 縮小', 'ダミーゲート半減＋セル高圧縮', '#d97706')}
          ${kpiCard(472, 218, 222, 62, 'SAGC 位置合わせ誤差耐性', '自己整合ゼロ短絡', 'ゲート形成前後にSiN刃で精密寸断', '#7c3aed')}

          ${nanoPin(259, 140, 86, 314, 1, 'SDB (シングル拡散ブレーク)', '単一ダミーゲートをエッチ除去し深掘りSiN絶縁壁へ置換', '#dc2626', 'start')}
          ${nanoPin(354, 198, 368, 314, 2, 'SAGC (自己整合ゲートカット)', '隣接セル上下のメタルゲートを<12nm幅で寸断し高密度化', '#7c3aed', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '単一ダミーゲートを掘削・SiN充填するSDB（1 CPP横分離）を採用', line2: '直交する自己整合ゲートカット（SAGC, <12nm幅）で上下セル間を寸断' },
          { label: '撮影・画質への恩恵', line1: '標準ロジックセル群の無駄スペースを削ぎ落としBIONZダイ面積を圧縮', line2: 'より多くのISPパイプラインとAI推論MACアレイを同一チップ内へ収容' },
          { label: '実機・2026学会諸元', line1: 'SDB（1 CPP境界絶縁トレンチ）＋ SAGC（<12nm高アスペクトSiN刃）', line2: '従来のDDB（2 CPP）比でロジック密度を15〜20%向上する2nm/A14基盤技術' },
        ],
      });

    // X2-61. Active Backside Vertical ESD Protection Diode & CDM Clamp (300nm Thinned Si)
    case 'xv2_gaa_active_backside_esd':
      return renderBionzV2Hd({
        badge: 'X2-61',
        zone: 'bspdn_cool',
        nodeTag: 'EOS/ESD Roadmap · 300nm Si',
        title: '超薄膜300nm基板「アクティブ裏面垂直ESD保護ダイオード ＆ CDMクランプ」',
        analogy: '紙のように薄い300nm基板の落雷(静電気)を、横ではなく真下の極厚金属アース海へ垂直逃がし',
        metric: 'Si厚 ~300 nm 垂直熱放散',
        scaleLabel: 'THINNED Si: ~300 nm · CDM SAFE',
        accent: '#dc2626',
        accentSoft: '#fef2f2',
        art: (p) => `
          <!-- Cross-Section: Ultra-Thin 300nm Si + Vertical Active Backside ESD Diode + BSM Heatsink -->
          <rect x="68" y="84" width="406" height="196" rx="10" fill="#ffffff" stroke="#fca5a5" stroke-width="1.35"/>
          <text x="271" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#991b1b">300nm極薄BSPDN基板の静電気（HBM/CDM）垂直シャント＆裏面放熱経路</text>

          <!-- Top ESD Surge Pad & Frontside BEOL -->
          <rect x="196" y="110" width="150" height="22" rx="4" fill="url(#${p}_gold)" stroke="#a16207"/>
          <text x="271" y="124.5" text-anchor="middle" font-size="8.6" font-weight="900" fill="#0f172a">I/O PAD（±2kV 静電サージ侵入）</text>
          <!-- Lightning Bolt -->
          <path d="M 164 106 L 176 118 L 168 118 L 182 132" fill="none" stroke="#dc2626" stroke-width="2.4"/>

          <!-- Ultra-Thin 300nm Silicon Active Layer -->
          <rect x="86" y="146" width="370" height="58" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="1.15"/>
          ${dimArrow(98, 146, 98, 204, '300nm', '#dc2626')}

          <!-- Vertical p+/n-well/n+ Active Backside Diode inside the 300nm Si! -->
          <rect x="180" y="148" width="182" height="18" fill="url(#${p}_cyan)"/>
          <text x="271" y="160.5" text-anchor="middle" font-size="8.2" font-weight="900" fill="#fff">n+ カソード（表面コンタクト直結）</text>
          <rect x="180" y="166" width="182" height="18" fill="#fef3c7"/>
          <text x="271" y="178.5" text-anchor="middle" font-size="8.0" font-weight="800" fill="#92400e">低抵抗 i / n- ドリフト層（均一垂直電流）</text>
          <rect x="180" y="184" width="182" height="18" fill="url(#${p}_sige)"/>
          <text x="271" y="196.5" text-anchor="middle" font-size="8.2" font-weight="900" fill="#fff">p+ アクティブ裏面エピ（Active Backside）</text>

          <!-- Vertical Surge Current Arrows straight down into Backside Metal! -->
          ${[216, 271, 326].map((x) => `<line x1="${x}" y1="134" x2="${x}" y2="226" stroke="#dc2626" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>`).join('')}

          <!-- Thick Backside Metal (BSM) Power/GND Plane acting as thermal & electrical sink -->
          <rect x="86" y="218" width="370" height="44" rx="5" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1.2"/>
          <text x="271" y="238" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">極厚 裏面電源/GND銅プレーン（BSM ヒートシンク兼アース海）</text>
          <text x="271" y="253" text-anchor="middle" font-size="7.8" font-weight="700" fill="#ffedd5">熱拡散長不足(4.5μm→0.3μm)による瞬時熱破壊を裏面直結で完全回避!</text>

          <!-- Right KPI Panel -->
          ${kpiCard(488, 86, 206, 58, '従来の危機 (BSPDN薄化)', '熱容量 1/15 激減', '横型ダイオードは即座に溶断破壊', '#dc2626')}
          ${kpiCard(488, 154, 206, 58, 'アクティブ裏面 垂直ESD', '均一大面積＆低C_esd', '超高速I/O（PCIe/MIPI）波形を阻害せず', '#059669')}
          ${kpiCard(488, 222, 206, 58, 'CDM 超高速クランプ', 'ピコ秒立上り保護', 'EOS/ESD 2027 ロードマップ必須解', '#0284c7')}

          ${nanoPin(271, 193, 86, 314, 1, 'p+ アクティブ裏面エピ層', '裏面全面を能動接合に活用し電流集中を防止', '#dc2626', 'start')}
          ${nanoPin(326, 240, 368, 314, 2, 'BSM極厚銅プレーン直結放熱', 'サージジュール熱を金属層へ瞬時に逃がす', '#ea580c', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '300nmまで極薄化されたSi基板にp+アクティブ裏面エピと垂直ダイオードを形成', line2: '静電気サージ電流とジュール熱を直下の極厚裏面銅（BSM）へ最短垂直放散' },
          { label: '撮影・画質への恩恵', line1: '乾燥した冬場のレンズ交換やCFexpress抜き差し時の静電破壊からBIONZを守護', line2: '寄生容量が極めて低く、高速MIPI/HDMI/USB-C信号のアイ開口を劣化させない' },
          { label: '実機・2026学会諸元', line1: '残存Si厚 ~300nm（熱拡散長4.5μm未満の極薄領域向け垂直ESD＋CDMクランプ）', line2: 'EOS/ESD Roadmap 2027 提唱のBSPDN時代必須の信頼性アーキテクチャ' },
        ],
      });

    // X2-62. ALD MoN Seed -> Linerless Pure Molybdenum Super-Via & M0 (IEDM 2025 / VLSI 2026)
    case 'xv2_ald_mon_linerless_mo_via':
      return renderBionzV2Hd({
        badge: 'X2-62',
        zone: 'beol',
        nodeTag: 'IEDM 2025 / VLSI 2026',
        title: 'ALD MoN転換「完全バリアレス・純モリブデン（Linerless Mo）超低抵抗ビア＆M0」',
        analogy: '細い水道管の内張りを丸ごと撤去し、内径いっぱいを電子がぶつかりにくい新金属モリブデンで満たす',
        metric: 'RC遅延 −30%+ / 故障 −94%',
        scaleLabel: 'MFP: Mo 11.2nm vs Cu 39nm',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        art: (p) => `
          <!-- Left: Conventional Copper + Thick TaN Barrier/Liner vs Right: Linerless Pure Mo -->
          <rect x="68" y="84" width="194" height="196" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          <text x="165" y="102" text-anchor="middle" font-size="8.8" font-weight="800" fill="#991b1b">× 従来 Cu + 厚いTaNバリア</text>
          <!-- Narrow Via Trench filled mostly by high-R TaN barrier! -->
          <rect x="114" y="118" width="102" height="120" rx="4" fill="#cbd5e1" stroke="#64748b"/>
          <path d="M 136 118 L 146 234 L 184 234 L 194 118 Z" fill="#475569"/>
          <path d="M 152 118 L 158 220 L 172 220 L 178 118 Z" fill="url(#${p}_cu)"/>
          <text x="165" y="176" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">極細Cu</text>
          <text x="165" y="254" text-anchor="middle" font-size="7.8" font-weight="800" fill="#b91c1c">× 高抵抗TaNが断面積を圧迫</text>
          <text x="165" y="268" text-anchor="middle" font-size="7.4" font-weight="700" fill="#991b1b">電子散乱増(MFP 39nm)で抵抗爆増</text>

          <!-- Center: ALD MoN Seed -> Linerless Pure Mo Bottom-Up Fill -->
          <rect x="274" y="84" width="222" height="196" rx="10" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.45"/>
          <text x="385" y="102" text-anchor="middle" font-size="8.8" font-weight="800" fill="#115e59">○ 完全バリアレス純Moボトムアップ充填</text>
          <rect x="314" y="118" width="142" height="120" rx="4" fill="#cbd5e1" stroke="#0d9488"/>
          <!-- Full-Width Pure Mo Super-Via (NO Barrier Liner!) -->
          <path d="M 334 118 L 344 234 L 426 234 L 436 118 Z" fill="url(#${p}_ru)" stroke="#0f766e" stroke-width="1.6"/>
          <!-- Bottom ALD MoN conversion seed -->
          <rect x="344" y="224" width="82" height="10" fill="#0d9488"/>
          <text x="385" y="158" text-anchor="middle" font-size="9.2" font-weight="900" fill="#0f172a">100% 純モリブデン (Mo)</text>
          <text x="385" y="174" text-anchor="middle" font-size="7.8" font-weight="800" fill="#115e59">バリア層ゼロ＝断面積最大化!</text>
          <!-- Bottom-up growth arrows -->
          <line x1="364" y1="220" x2="364" y2="188" stroke="#0d9488" stroke-width="2" marker-end="url(#${p}_arr_green)"/>
          <line x1="406" y1="220" x2="406" y2="188" stroke="#0d9488" stroke-width="2" marker-end="url(#${p}_arr_green)"/>
          <text x="385" y="254" text-anchor="middle" font-size="7.8" font-weight="800" fill="#0f766e">○ MFP 11.2nm（Cuの1/3）で超細線でも低抵抗!</text>
          <text x="385" y="268" text-anchor="middle" font-size="7.5" font-weight="700" fill="#115e59">高融点(2623°C)でEM断線ゼロ級</text>

          <!-- Right KPI Panel -->
          ${kpiCard(508, 86, 186, 58, 'ビア / M0 RC遅延', '−30% 以上削減', 'バリア除去＋サイズ効果抑制', '#0d9488')}
          ${kpiCard(508, 154, 186, 58, 'ボイド / 初期故障率', '−94% 激減', 'ALD MoNシード転換ボトムアップ', '#059669')}
          ${kpiCard(508, 222, 186, 58, '電子平均自由行程', 'Mo 11.2 nm', 'Cu 39nmより細線散乱が激小', '#0284c7')}

          ${nanoPin(385, 229, 86, 314, 1, 'ALD MoN シード転換層', '底部からの選択的結晶成長でシーム・ボイドを根絶', '#0d9488', 'start')}
          ${nanoPin(422, 162, 368, 314, 2, 'バリアレス純Mo配線導体', 'Ruより低コストかつCu超えの耐エレクトロマイグレーション', '#0f766e', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '底部ALD MoNシード転換によりバリア層不要で純モリブデンをボトムアップ充填', line2: '電子平均自由行程11.2nm（Cuの1/3以下）により10nm級細線での抵抗急増を回避' },
          { label: '撮影・画質への恩恵', line1: '最下層ローカル配線（M0/ビア）のRC遅延30%以上削減でISP演算周波数を向上', line2: '高融点Moによる圧倒的EM耐性で長期連続4K/8K録画でも配線劣化ゼロ' },
          { label: '実機・2026学会諸元', line1: 'IEDM 2025 / VLSI 2026（ALD MoN転換ライナーレス純Moビア実証）', line2: '従来Cu＋TaN比でRC遅延30%超削減、初期ボイド故障率−94%達成' },
        ],
      });

    // X2-63. 42nm CPP Self-Aligned Contact (SAC) SiN Cap + Air-Gap V0
    case 'xv2_self_aligned_sac_v0_cap':
      return renderBionzV2Hd({
        badge: 'X2-63',
        zone: 'beol',
        nodeTag: '2nm / A14 MOL · 42nm CPP',
        title: '極細42nmピッチ短絡ゼロ「自己整合コンタクト（SAC）SiNキャップ ＆ エアーギャップV0」',
        analogy: '金属ゲートの頭に頑丈な絶縁ヘルメット(SACキャップ)を被せ、隣の金属柱が少々ズレても絶対にショートしない',
        metric: 'CPP 42–48nm 短絡ゼロ',
        scaleLabel: 'CPP: 42 nm · AIR-GAP k ≈ 1.0',
        accent: '#6366f1',
        accentSoft: '#eef2ff',
        art: (p) => `
          <!-- Cross-Section of MOL SAC + Air-Gap V0 at 42nm Gate Pitch -->
          <rect x="68" y="84" width="404" height="196" rx="10" fill="#ffffff" stroke="#a5b4fc" stroke-width="1.35"/>
          <text x="270" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#3730a3">42nm ゲートピッチ（CPP）自己整合コンタクト（SAC）＆ エアーギャップV0断面</text>

          <!-- Bottom Silicon + S/D -->
          <rect x="84" y="232" width="372" height="32" rx="3" fill="url(#${p}_si)"/>
          <!-- 3 Metal Gates with Protective SiN SAC Helmets -->
          ${[112, 236, 360].map((gx) => `
            <rect x="${gx}" y="178" width="54" height="54" rx="2" fill="url(#${p}_gold)" stroke="#a16207"/>
            <text x="${gx + 27}" y="210" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0f172a">Gate</text>
            <!-- High-Selectivity SiN SAC Helmet Cap! -->
            <rect x="${gx - 6}" y="146" width="66" height="32" rx="5" fill="url(#${p}_hfo2)" stroke="#4c1d95" stroke-width="1.3"/>
            <text x="${gx + 27}" y="165" text-anchor="middle" font-size="7.8" font-weight="900" fill="#ffffff">SiN Helmet</text>
            <!-- Sidewall Low-k Spacers -->
            <rect x="${gx - 12}" y="178" width="6" height="54" fill="#c7d2fe"/>
            <rect x="${gx + 54}" y="178" width="6" height="54" fill="#c7d2fe"/>
          `).join('')}

          <!-- Self-Aligned Trench Contacts (Co/W) safely overlapping SiN Helmets! -->
          ${[178, 302].map((cx) => `
            <polygon points="${cx - 10},122 ${cx + 56},122 ${cx + 46},232 ${cx},232" fill="url(#${p}_cyan)" fill-opacity="0.88" stroke="#0369a1" stroke-width="1.2"/>
            <text x="${cx + 23}" y="198" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">SAC</text>
            <text x="${cx + 23}" y="210" text-anchor="middle" font-size="7.2" font-weight="800" fill="#e0f2fe">Co/W</text>
            <!-- Air-Gap V0 Pocket right alongside V0 -->
            <rect x="${cx - 16}" y="124" width="10" height="22" rx="3" fill="#ffffff" stroke="#0284c7" stroke-width="1" stroke-dasharray="2 1.5"/>
          `).join('')}

          <!-- M0 Local Interconnect Top -->
          <rect x="84" y="110" width="372" height="14" rx="3" fill="url(#${p}_ru)"/>
          <text x="270" y="120" text-anchor="middle" font-size="7.8" font-weight="900" fill="#0f172a">M0 ローカル配線層（V0ビア直結）</text>

          ${dimArrow(139, 250, 263, 250, '42nm CPP', '#f8fafc')}

          <!-- Right KPI Panel -->
          ${kpiCard(486, 86, 208, 58, 'エッチング選択比', 'SiN vs SiO₂ 高選択', '目合わせズレ時ヘルメットが完全防御', '#6366f1')}
          ${kpiCard(486, 154, 208, 58, 'エアーギャップV0', 'k ≈ 1.0 (空気絶縁)', 'ゲート–コンタクト寄生容量を大幅低減', '#0284c7')}
          ${kpiCard(486, 222, 208, 58, 'MOL 歩留まり効果', '短絡不良ゼロ化', '2nm / A14超高密度ロジックの要', '#059669')}

          ${nanoPin(263, 158, 86, 314, 1, 'SAC SiNゲート保護ヘルメット', 'コンタクト開口が少しズレてもゲート金属へ絶対貫通しない', '#6366f1', 'start')}
          ${nanoPin(291, 134, 376, 314, 2, 'エアーギャップV0空洞', '比誘電率1.0の空気層で隣接配線のクロストークを遮断', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '高エッチング選択比SiNゲートキャップが金属ゲート頭部を完全防護（SAC）', line2: 'Co/Wトレンチコンタクト脇に空気空洞（Air-Gap V0, k≈1.0）を設け容量低減' },
          { label: '撮影・画質への恩恵', line1: '42nm極細ゲートピッチでの寄生容量とスイッチング電力を大幅削減', line2: '高歩留まりで大規模なBIONZ XR2演算コアを安定量産できる基盤技術' },
          { label: '実機・2026学会諸元', line1: 'ゲートピッチ（CPP）42〜48nm級 MOL自己整合コンタクト＋低k SiBCNスペーサ', line2: 'ゲート–コンタクト間フリンジ容量を20%以上削減し最高周波数を向上' },
        ],
      });

    // X2-64. BSPDN SiGe Etch-Stop Thinning (775μm -> 300nm, TTV < 40nm) & IR Vernier
    case 'xv2_bspdn_sige_etch_stop_thinning':
      return renderBionzV2Hd({
        badge: 'X2-64',
        zone: 'bspdn_cool',
        nodeTag: 'BSPDN Wafer Thinning',
        title: 'BSPDN極限薄化「エピタキシャルSiGeエッチストップ（TTV < 40nm）＆ 赤外アライメント」',
        analogy: '分厚い775μmウェハーを2,500分の1の0.3μmまで削り、特殊な赤色ブレーキ層(SiGe)で原子数個手前にピタリ停止',
        metric: '775μm→300nm (TTV<40nm)',
        scaleLabel: 'STOP LAYER: Epi SiGe · IR ALIGN',
        accent: '#e11d48',
        accentSoft: '#fff1f2',
        art: (p) => `
          <!-- 4-Step Wafer Flip & Thinning Flow -->
          <rect x="68" y="84" width="626" height="196" rx="10" fill="#ffffff" stroke="#fda4af" stroke-width="1.3"/>
          <text x="381" y="102" text-anchor="middle" font-size="9.5" font-weight="800" fill="#9f1239">BSPDN 裏面電源製造：300mmウェハー極限薄化 ＆ 透過赤外（IR）ナノ位置合わせ工程</text>

          <!-- Step 1: Flip & Carrier Bond -->
          <g transform="translate(82, 114)">
            <rect x="0" y="0" width="136" height="148" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="68" y="16" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0f172a">① 反転・キャリア接合</text>
            <rect x="16" y="26" width="104" height="52" rx="2" fill="url(#${p}_si)"/>
            <text x="68" y="55" text-anchor="middle" font-size="7.8" font-weight="800" fill="#cbd5e1">Si 775 μm (上向き)</text>
            <rect x="16" y="78" width="104" height="7" fill="url(#${p}_sige)"/>
            <rect x="16" y="85" width="104" height="18" fill="url(#${p}_cyan)"/>
            <rect x="16" y="103" width="104" height="24" rx="2" fill="#94a3b8"/>
            <text x="68" y="118" text-anchor="middle" font-size="7.4" font-weight="800" fill="#fff">SiCN 仮支持基板</text>
            <text x="68" y="140" text-anchor="middle" font-size="7.2" font-weight="700" fill="#475569">表裏反転して支持接合</text>
          </g>

          <!-- Step 2: Grinding + CMP -->
          <g transform="translate(236, 114)">
            <rect x="0" y="0" width="136" height="148" rx="8" fill="#fff7ed" stroke="#fdba74"/>
            <text x="68" y="16" text-anchor="middle" font-size="8.4" font-weight="800" fill="#9a3412">② 機械研削 ＋ CMP</text>
            <rect x="16" y="34" width="104" height="14" rx="4" fill="#ea580c"/>
            <text x="68" y="44" text-anchor="middle" font-size="7.4" font-weight="900" fill="#fff">研削ホイール高速削除</text>
            <line x1="68" y1="50" x2="68" y2="66" stroke="#ea580c" stroke-width="2" marker-end="url(#${p}_arr_red)"/>
            <rect x="16" y="68" width="104" height="10" fill="#475569"/>
            <rect x="16" y="78" width="104" height="7" fill="url(#${p}_sige)"/>
            <rect x="16" y="85" width="104" height="18" fill="url(#${p}_cyan)"/>
            <rect x="16" y="103" width="104" height="24" rx="2" fill="#94a3b8"/>
            <text x="68" y="140" text-anchor="middle" font-size="7.2" font-weight="700" fill="#9a3412">残数μmまで荒削り</text>
          </g>

          <!-- Step 3: Selective SiGe Etch-Stop! -->
          <g transform="translate(390, 114)">
            <rect x="0" y="0" width="136" height="148" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="1.4"/>
            <text x="68" y="16" text-anchor="middle" font-size="8.4" font-weight="800" fill="#9f1239">③ SiGeエッチストップ</text>
            <rect x="16" y="74" width="104" height="11" fill="url(#${p}_sige)"/>
            <text x="68" y="66" text-anchor="middle" font-size="7.8" font-weight="900" fill="#be123c">高選択ウェットで自動停止!</text>
            <rect x="16" y="85" width="104" height="18" fill="url(#${p}_cyan)"/>
            <text x="68" y="97" text-anchor="middle" font-size="7.4" font-weight="900" fill="#fff">残Si 300nm (TTV&lt;40nm)</text>
            <rect x="16" y="103" width="104" height="24" rx="2" fill="#94a3b8"/>
            <text x="68" y="140" text-anchor="middle" font-size="7.2" font-weight="800" fill="#9f1239">全面均一にピタリ露出</text>
          </g>

          <!-- Step 4: Through-Si IR Alignment Vernier -->
          <g transform="translate(544, 114)">
            <rect x="0" y="0" width="136" height="148" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.3"/>
            <text x="68" y="16" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0369a1">④ 赤外透過アライメント</text>
            <!-- IR Beam passing through thin Si -->
            <line x1="68" y1="26" x2="68" y2="90" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="3 2" marker-end="url(#${p}_arr_red)"/>
            <text x="68" y="48" text-anchor="middle" font-size="7.4" font-weight="900" fill="#be123c">IR 透過光 (λ=1.2μm)</text>
            <!-- Vernier Mark -->
            <rect x="40" y="72" width="56" height="12" fill="none" stroke="#0284c7" stroke-width="1.2"/>
            <line x1="52" y1="72" x2="52" y2="84" stroke="#0284c7" stroke-width="1.2"/>
            <line x1="68" y1="72" x2="68" y2="84" stroke="#e11d48" stroke-width="1.6"/>
            <line x1="84" y1="72" x2="84" y2="84" stroke="#0284c7" stroke-width="1.2"/>
            <rect x="16" y="85" width="104" height="18" fill="url(#${p}_cyan)"/>
            <rect x="16" y="103" width="104" height="24" rx="2" fill="#94a3b8"/>
            <text x="68" y="140" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0369a1">誤差 &lt; 2nmで裏面ビア開口</text>
          </g>

          <!-- Flow arrows -->
          <line x1="220" y1="186" x2="234" y2="186" stroke="#334155" stroke-width="2" marker-end="url(#${p}_arr_dark)"/>
          <line x1="374" y1="186" x2="388" y2="186" stroke="#334155" stroke-width="2" marker-end="url(#${p}_arr_dark)"/>
          <line x1="528" y1="186" x2="542" y2="186" stroke="#334155" stroke-width="2" marker-end="url(#${p}_arr_dark)"/>

          ${nanoPin(458, 194, 86, 314, 1, 'エピSiGeエッチストップ層', '300mm全面で厚みばらつきTTV<40nmの超平坦薄化', '#e11d48', 'start')}
          ${nanoPin(612, 190, 368, 314, 2, '透過赤外バーニアマーク', 'Siを透視して表面トランジスタと裏面電源をnm精度整合', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '775μmウェハーを反転接合し、エピタキシャルSiGeエッチストップで300nmへ停止', line2: 'Siを透過する赤外（IR）アライメントバーニアで表面と裏面をサブ2nm整合' },
          { label: '撮影・画質への恩恵', line1: 'BSPDN（裏面給電）を300mmウェハー全面で高歩留まりに実現する核心工程', line2: '高密度裏面ビアの抵抗ばらつきを抑え、BIONZの高速動作安定性を担保' },
          { label: '実機・2026学会諸元', line1: '残存Si厚 300〜500nm ／ 300mmウェハー全面厚みばらつき TTV < 40 nm', line2: 'SiCNフュージョン仮接合＋高選択ウェットエッチング＋IRスルーアライメント' },
        ],
      });

    // X2-65. Die-Perimeter Crack-Stop & 6-Tier Cu MOB Seal Ring
    case 'xv2_die_crackstop_mob_seal_ring':
      return renderBionzV2Hd({
        badge: 'X2-65',
        zone: 'beol',
        nodeTag: 'Die Perimeter Armor · ULK Safe',
        title: 'ダイ外周装甲「クラックストップ（Crack-Stop）＆ 防湿酸化バリア（MOB）シールリング」',
        analogy: 'チップの城郭を囲む「地震のひび止め堀(外側)」と「湿気・錆を遮断する6重の銅城壁(内側)」の二重防御',
        metric: '6層連続Cu防湿城壁',
        scaleLabel: 'RING WIDTH: ~15–25 μm',
        accent: '#b45309',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Cross-Section from Scribe Saw Street -> Crack-Stop -> MOB Seal Ring -> Active ULK Core -->
          <rect x="68" y="84" width="444" height="196" rx="10" fill="#ffffff" stroke="#fcd34d" stroke-width="1.35"/>
          <text x="290" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#78350f">ダイ外周断面：ダイシング亀裂 ＆ 水分侵入を二重阻止する装甲構造</text>

          <!-- Substrate Base -->
          <rect x="82" y="238" width="416" height="30" rx="3" fill="url(#${p}_si)"/>
          <text x="290" y="257" text-anchor="middle" font-size="8.0" font-weight="700" fill="#cbd5e1">Si基板（アンカー接地・p+ガード拡散）</text>

          <!-- Far Left: Dicing Street with Saw Crack trying to propagate! -->
          <rect x="82" y="116" width="62" height="122" fill="#fee2e2" stroke="#fca5a5" stroke-dasharray="3 2"/>
          <text x="113" y="134" text-anchor="middle" font-size="7.8" font-weight="800" fill="#991b1b">ダイシング</text>
          <text x="113" y="146" text-anchor="middle" font-size="7.8" font-weight="800" fill="#991b1b">切断縁</text>
          <!-- Jagged Crack Stopped Dead at Crack-Stop! -->
          <polyline points="82,168 102,178 118,172 136,188 152,184" fill="none" stroke="#dc2626" stroke-width="2.6"/>
          <text x="113" y="206" text-anchor="middle" font-size="7.6" font-weight="900" fill="#dc2626">切断クラック!</text>

          <!-- Outer Layer: Crack-Stop (CS) Sacrificial Metal Anchor Wall -->
          <rect x="152" y="118" width="26" height="124" rx="2" fill="url(#${p}_ru)" stroke="#334155" stroke-width="1.3"/>
          <text x="165" y="182" text-anchor="middle" font-size="7.8" font-weight="900" fill="#0f172a" transform="rotate(-90 165 182)">Crack-Stop壁</text>
          <!-- Moisture droplets blocked -->
          <circle cx="192" cy="142" r="5" fill="#38bdf8"/>
          <circle cx="192" cy="166" r="5" fill="#38bdf8"/>
          <text x="192" y="194" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0284c7">H₂O</text>
          <text x="192" y="204" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0284c7">遮断</text>

          <!-- Inner Layer: 6-Tier Stacked Cu + Continuous Slit Via-Bar MOB Seal Ring! -->
          <g>
            ${[122, 142, 162, 182, 202, 220].map((y, idx) => `
              <rect x="210" y="${y}" width="64" height="11" rx="1.5" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="0.8"/>
              ${idx < 5 ? `<rect x="224" y="${y + 11}" width="12" height="9" fill="#d97706"/><rect x="248" y="${y + 11}" width="12" height="9" fill="#d97706"/>` : ''}
            `).join('')}
            <rect x="224" y="231" width="36" height="9" fill="#9a3412"/>
            <text x="242" y="115" text-anchor="middle" font-size="7.8" font-weight="900" fill="#9a3412">6層 Cu-MOB 防湿城壁</text>
          </g>

          <!-- Protected Core: Fragile Porous Low-k ULK Interconnects -->
          <rect x="290" y="118" width="204" height="118" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="1.3"/>
          <text x="392" y="140" text-anchor="middle" font-size="9.0" font-weight="800" fill="#065f46">保護領域：多孔質低k（ULK）内部回路</text>
          ${[156, 178, 200].map((y) => `
            <rect x="310" y="${y}" width="164" height="10" rx="2" fill="url(#${p}_cyan)"/>
          `).join('')}
          <text x="392" y="226" text-anchor="middle" font-size="7.8" font-weight="800" fill="#047857">○ 亀裂・湿気・Na+汚染を完全シャットアウト</text>

          <!-- Right KPIs -->
          ${kpiCard(524, 86, 170, 58, '外側: Crack-Stop', 'ダイシング亀裂遮断', '脆いULK層へのチッピング防止', '#dc2626')}
          ${kpiCard(524, 154, 170, 58, '内側: MOBシールリング', '水分 / イオン 100%遮断', 'M0〜最上層 連続スリットビア壁', '#b45309')}
          ${kpiCard(524, 222, 170, 58, '過酷環境信頼性', '85°C / 85%RH 耐久', '雨天・雪山・熱帯撮影で長寿命', '#059669')}

          ${nanoPin(165, 184, 86, 314, 1, '基板アンカー付クラックストップ', '切断刃の応力波を反射・吸収し内部破損を阻止', '#dc2626', 'start')}
          ${nanoPin(242, 188, 368, 314, 2, '6層銅連続スリットビア MOB壁', '多孔質ULK層への吸湿による比誘電率悪化・腐食を防止', '#b45309', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '外側にSi基板アンカー付きCrack-Stop壁、内側に6層連続CuスリットビアMOB壁', line2: '脆い多孔質ULK（低誘電率）層をダイシング亀裂・水分・移動性イオンから完全防護' },
          { label: '撮影・画質への恩恵', line1: '高温多湿のジャングルや厳冬期結露環境でもSoC内部配線の腐食・性能劣化を防止', line2: '数年〜10年クラスの過酷なプロ運用に耐えるカメラ頭脳の機械的・化学的信頼性' },
          { label: '実機・2026学会諸元', line1: '外周二重装甲（Crack-Stop ＋ M0〜最上層Cu連続MOBシールリング）', line2: '耐湿加速試験（HAST / 85°C 85%RH）および熱衝撃サイクルに対する必須防御構造' },
        ],
      });

    // X2-66. Mixed-Signal Deep Trench Isolation (DTI) & Triple-Well Guard Ring
    case 'xv2_dti_mixed_signal_guard_ring':
      return renderBionzV2Hd({
        badge: 'X2-66',
        zone: 'beol',
        nodeTag: 'Mixed-Signal Isolation · −40 dB',
        title: 'アナログ／デジタル干渉遮断「深溝分離（DTI）＆ トリプルウェル防護ガードリング」',
        analogy: '爆音のデジタル工事現場と静かな精密アナログ時計工房の間に、深い絶縁のお堀と2重の消音アース壁を建設',
        metric: '基板ノイズ遮断 −25〜40 dB',
        scaleLabel: 'DTI DEPTH: 5–10 μm SiO₂',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        art: (p) => `
          <!-- Cross-Section: Noisy Digital ISP/AI Left | DTI + Double Guard Ring | Quiet Analog PLL/BGR Right -->
          <rect x="68" y="84" width="452" height="196" rx="10" fill="#ffffff" stroke="#67e8f9" stroke-width="1.35"/>
          <text x="294" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#155e75">オンチップ混載ノイズ隔離：DTI深溝お堀 × 二重ガードリング × Deep N-Well</text>

          <!-- P-Type Bulk Silicon Substrate -->
          <rect x="82" y="156" width="424" height="110" rx="4" fill="#cbd5e1" stroke="#64748b"/>
          <text x="294" y="258" text-anchor="middle" font-size="7.8" font-weight="800" fill="#334155">共通 p-型シリコン基板（スイッチングノイズ伝搬媒質）</text>

          <!-- Left: Noisy High-Speed Digital Switching Core -->
          <rect x="94" y="122" width="118" height="36" rx="5" fill="#fee2e2" stroke="#dc2626" stroke-width="1.2"/>
          <text x="153" y="138" text-anchor="middle" font-size="8.4" font-weight="900" fill="#991b1b">高速デジタル演算核</text>
          <text x="153" y="151" text-anchor="middle" font-size="7.4" font-weight="700" fill="#b91c1c">GHz切替ノイズ発生源</text>
          <!-- Noise Ripple Waves traveling right toward DTI -->
          <path d="M 156 168 Q 178 190 212 184" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="4 2" marker-end="url(#${p}_arr_red)"/>
          <path d="M 140 176 Q 178 214 218 206" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 2" marker-end="url(#${p}_arr_red)"/>

          <!-- Center Barrier: High-Aspect-Ratio Deep Trench Isolation (DTI) Oxide Moat! -->
          <rect x="226" y="142" width="16" height="104" rx="2" fill="url(#${p}_cyan)" stroke="#0e7490" stroke-width="1.4"/>
          <text x="234" y="196" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff" transform="rotate(-90 234 196)">DTI SiO₂ 深溝</text>

          <!-- Double Concentric p+ / n+ Guard Rings -->
          <rect x="252" y="146" width="20" height="18" rx="2" fill="#059669"/>
          <text x="262" y="158" text-anchor="middle" font-size="7.2" font-weight="900" fill="#fff">p+</text>
          <rect x="278" y="146" width="20" height="18" rx="2" fill="#2563eb"/>
          <text x="288" y="158" text-anchor="middle" font-size="7.2" font-weight="900" fill="#fff">n+</text>
          <line x1="262" y1="146" x2="262" y2="122" stroke="#059669" stroke-width="1.6"/>
          <text x="275" y="118" text-anchor="middle" font-size="7.6" font-weight="900" fill="#047857">専用AVSS吸収</text>

          <!-- Right: Quiet Analog Island inside Buried Deep N-Well (Triple-Well Faraday Basin) -->
          <rect x="310" y="164" width="184" height="72" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <text x="402" y="228" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0369a1">埋込 Deep N-Well ファラデー遮蔽槽</text>
          <rect x="326" y="172" width="152" height="42" rx="5" fill="#f0fdf4" stroke="#059669" stroke-width="1.2"/>
          <rect x="334" y="122" width="136" height="36" rx="5" fill="#dcfce7" stroke="#059669" stroke-width="1.3"/>
          <text x="402" y="138" text-anchor="middle" font-size="8.4" font-weight="900" fill="#065f46">静穏アナログ精密核</text>
          <text x="402" y="151" text-anchor="middle" font-size="7.4" font-weight="700" fill="#047857">ADPLL / BGR / 温度センサ</text>
          <text x="402" y="196" text-anchor="middle" font-size="8.2" font-weight="900" fill="#065f46">静寂アイランド (−40 dB)</text>

          <!-- Right KPI Panel -->
          ${kpiCard(532, 86, 162, 58, '基板ノイズ遮断比', '−25 〜 −40 dB', '広帯域クロストーク抑止', '#0891b2')}
          ${kpiCard(532, 154, 162, 58, '三重防御アーキ', 'DTI＋二重Ring＋DNW', '水平＆垂直の回り込み遮断', '#059669')}
          ${kpiCard(532, 222, 162, 58, '画質・ジッタ効果', 'PLL位相雑音極小', 'HDMI/MIPIエラー率を劇減', '#2563eb')}

          ${nanoPin(234, 210, 86, 314, 1, '高アスペクト DTI 絶縁お堀', '水平伝搬するデジタル高周波電流を物理分断', '#0891b2', 'start')}
          ${nanoPin(402, 226, 368, 314, 2, '埋込 Deep N-Well 遮蔽槽', '底面から回り込むノイズをガードリング経由でAVSS排出', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '高アスペクト比DTI絶縁トレンチ＋p+/n+二重ガードリング＋埋込Deep N-Well', line2: 'GHzデジタル回路が基板へ吐き出すスイッチング雑音を水平・底面から三重隔離' },
          { label: '撮影・画質への恩恵', line1: '超低ジッタADPLLや2.1ppm基準電源（BGR）をデジタル爆音から完全防護', line2: '高ビットレートMIPI/HDMI通信エラーやアナログ基準揺らぎによる画質劣化を根絶' },
          { label: '実機・2026学会諸元', line1: '基板ノイズ遮断性能 −25〜−40 dB（専用AVSS分離接地配線直結）', line2: '大規模AI/ISPと精密アナログ回路を1ダイに共存させる必須ミックスドシグナル技術' },
        ],
      });

    // X2-67. Monolithic 3D Hybrid 6T SRAM: FEOL Si-NS + BEOL Double-Gate IGO (Aug 2026)
    case 'xv2_m3d_si_igo_hybrid_sram':
      return renderBionzV2Hd({
        badge: 'X2-67',
        zone: 'isp_mem',
        nodeTag: 'Aug 2026 · M3D Si+IGO',
        title: 'モノリシック3D異種積層「Siナノシート × BEOL二重ゲートIGO酸化物 6T SRAM」',
        analogy: '1階を爆速シリコン4T記憶部、2階を極低リーク酸化物半導体パスゲート2Tへ立体配置して床面積を25%削減',
        metric: '面積 −25% / 書込電力 −42.2%',
        scaleLabel: 'M3D MONOLITHIC · DG-IGO + HZH',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- 2-Story Monolithic 3D Hybrid 6T SRAM Architecture -->
          <rect x="68" y="84" width="424" height="196" rx="10" fill="#ffffff" stroke="#c4b5fd" stroke-width="1.35"/>
          <text x="280" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#5b21b6">モノリシック3D異種積層（M3D）6T SRAM：2階建セル断面構造</text>

          <!-- 2nd Floor: BEOL Double-Gate Ga-In2O3 (IGO) Oxide Pass-Gate Transistors -->
          <rect x="86" y="114" width="388" height="66" rx="7" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.3"/>
          <text x="280" y="129" text-anchor="middle" font-size="8.4" font-weight="900" fill="#5b21b6">2階（BEOL低温成膜 &lt;300°C）：二重ゲート（DG）GaドープIn₂O₃（IGO）パスゲート 2T</text>
          ${[124, 314].map((x, i) => `
            <rect x="${x}" y="138" width="122" height="8" rx="2" fill="url(#${p}_gold)"/>
            <rect x="${x + 12}" y="146" width="98" height="12" rx="2" fill="url(#${p}_emerald)" stroke="#065f46"/>
            <text x="${x + 61}" y="155" text-anchor="middle" font-size="7.4" font-weight="900" fill="#ffffff">DG-IGO PG-${i === 0 ? 'L' : 'R'} (HZH膜)</text>
            <rect x="${x}" y="158" width="122" height="8" rx="2" fill="url(#${p}_gold)"/>
          `).join('')}

          <!-- Ultra-Short Monolithic Inter-Tier Vias (MIVs, ~30nm) -->
          <rect x="178" y="180" width="14" height="24" fill="url(#${p}_cu)"/>
          <rect x="368" y="180" width="14" height="24" fill="url(#${p}_cu)"/>
          <text x="280" y="195" text-anchor="middle" font-size="7.8" font-weight="900" fill="#c2410c">← 極短 MIV 層間ビア (直結) →</text>

          <!-- 1st Floor: FEOL 2nm Si-Nanosheet 4T Cross-Coupled Latch + BPR -->
          <rect x="86" y="204" width="388" height="64" rx="7" fill="#eff6ff" stroke="#2563eb" stroke-width="1.3"/>
          <text x="280" y="219" text-anchor="middle" font-size="8.4" font-weight="900" fill="#1e3a8a">1階（FEOL 2nm GAA）：Siナノシート 4T交差結合インバータラッチ ＋ BPR</text>
          ${[106, 198, 290, 382].map((x, idx) => `
            <rect x="${x}" y="228" width="76" height="26" rx="4" fill="${idx % 2 === 0 ? 'url(#' + p + '_cyan)' : 'url(#' + p + '_sige)'}"/>
            <text x="${x + 38}" y="244" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">${['PU-L (p)', 'PD-L (n)', 'PU-R (p)', 'PD-R (n)'][idx]}</text>
          `).join('')}

          <!-- Right KPI Panel -->
          ${kpiCard(506, 86, 188, 58, 'ビットセル面積', '−25% 縮小', 'パスゲート2Tを真上へ立体積載', '#7c3aed')}
          ${kpiCard(506, 154, 188, 58, '書込エネルギー削減', '−42.2% 低減', 'HZH三層膜＋低リークIGO効果', '#059669')}
          ${kpiCard(506, 222, 188, 58, '2026年8月最新研究', 'M3D Si + DG-IGO', 'BEOL低温成膜で1階Si無劣化', '#0284c7')}

          ${nanoPin(375, 152, 86, 314, 1, 'BEOL 二重ゲート IGO ＋ HZH膜', '低温成膜酸化物チャネルでオフ電流超極小＆高駆動', '#7c3aed', 'start')}
          ${nanoPin(236, 240, 368, 314, 2, '1階 2nm Si-NS 4Tラッチ', '高速保持のSiと省電力の酸化物を単一セル内で黄金分業', '#2563eb', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '1階FEOLに2nm Siナノシート4Tラッチ、2階BEOLに二重ゲートIGOパスゲートを立体積層', line2: '三層HZHゲート絶縁膜（HfO₂/ZrO₂/HfO₂）と低温成膜で下層劣化なく高信頼化' },
          { label: '撮影・画質への恩恵', line1: 'AI推論＆RAW処理用オンダイSRAMの面積を25%縮小し書込エネルギーを42.2%削減', line2: 'チップ面積と発熱の両方を同時に抑え込み、次世代BIONZのキャッシュ壁を突破' },
          { label: '実機・2026学会諸元', line1: '2026年8月最新論文実証（M3DハイブリッドSi-NS＋BEOL DG-IGO 6T SRAM）', line2: '面積−25%、書込エネルギー−42.2%、極低ビット線リーク＆高速MIV縦接続' },
        ],
      });

    // X2-68. ISSCC 2026 71.5fs RMS Supply-Resilient Fractional-N ADPLL & Dual-Ramp DTC
    case 'xv2_sub100fs_adpll_dtcloop':
      return renderBionzV2Hd({
        badge: 'X2-68',
        zone: 'isp_mem',
        nodeTag: 'ISSCC 2026 · 71.47 fs',
        title: 'ISSCC 2026 超低ジッタ「71.5 fs 電源耐性フラクショナルN ADPLL ＆ デュアルランプDTC」',
        analogy: '1兆分の0.07秒の狂いも許さない原子時計級メトロノームで、電圧が揺れても映像・通信リズムが微動だにしない',
        metric: 'RMSジッタ 71.47 fs',
        scaleLabel: 'SPUR: −60 dBc · LC-DCO',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        art: (p) => `
          <!-- Block Diagram of Fractional-N ADPLL + Dual-Ramp Time-Amplifying DTC + Octagonal LC-DCO -->
          <rect x="68" y="84" width="438" height="196" rx="10" fill="#ffffff" stroke="#7dd3fc" stroke-width="1.35"/>
          <text x="287" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0369a1">電源揺らぎ耐性 フラクショナルN 全デジタルPLL（ADPLL）閉ループ構成</text>

          <!-- Ref Clock -> Dual-Ramp TA-DTC -> BB-PD -> DLF -> Octagonal LC-DCO -> Output -->
          <rect x="82" y="122" width="60" height="42" rx="6" fill="#f1f5f9" stroke="#64748b"/>
          <text x="112" y="140" text-anchor="middle" font-size="7.8" font-weight="900" fill="#0f172a">REF CLK</text>
          <text x="112" y="153" text-anchor="middle" font-size="7.0" font-weight="700" fill="#475569">水晶基準</text>

          <rect x="160" y="116" width="96" height="54" rx="7" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.2"/>
          <text x="208" y="136" text-anchor="middle" font-size="8.0" font-weight="900" fill="#fff">Dual-Ramp</text>
          <text x="208" y="149" text-anchor="middle" font-size="7.8" font-weight="900" fill="#e0f2fe">時間増幅 DTC</text>
          <text x="208" y="161" text-anchor="middle" font-size="6.8" font-weight="700" fill="#bae6fd">電源雑音キャンセル</text>

          <rect x="274" y="122" width="76" height="42" rx="6" fill="url(#${p}_hfo2)" stroke="#5b21b6"/>
          <text x="312" y="140" text-anchor="middle" font-size="7.8" font-weight="900" fill="#fff">PD ＋ DLF</text>
          <text x="312" y="153" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ede9fe">デジタル濾波</text>

          <!-- Octagonal LC-DCO Resonator! -->
          <polygon points="384,116 446,116 462,132 462,154 446,170 384,170 368,154 368,132" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.5"/>
          <text x="415" y="140" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0f172a">八角形</text>
          <text x="415" y="154" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0f172a">LC-DCO</text>

          <!-- Connecting Arrows -->
          <line x1="142" y1="143" x2="158" y2="143" stroke="#0284c7" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
          <line x1="256" y1="143" x2="272" y2="143" stroke="#0284c7" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
          <line x1="350" y1="143" x2="366" y2="143" stroke="#0284c7" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
          <line x1="462" y1="143" x2="496" y2="143" stroke="#059669" stroke-width="2.4" marker-end="url(#${p}_arr_green)"/>

          <!-- Feedback Fractional-N Divider + Delta-Sigma Modulator -->
          <rect x="266" y="198" width="136" height="36" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.15"/>
          <text x="334" y="214" text-anchor="middle" font-size="8.0" font-weight="800" fill="#1e3a8a">分数分周器 (÷N.f) ＋ ΔΣ変調</text>
          <text x="334" y="227" text-anchor="middle" font-size="7.2" font-weight="700" fill="#3b82f6">量子化誤差をDTCへ先読み相殺</text>
          <polyline points="476,143 476,216 404,216" fill="none" stroke="#2563eb" stroke-width="1.8" marker-end="url(#${p}_arr_blue)"/>
          <polyline points="266,216 208,216 208,172" fill="none" stroke="#2563eb" stroke-width="1.8" marker-end="url(#${p}_arr_blue)"/>

          <!-- Phase Noise / Jitter Waveform Comparison Strip -->
          <rect x="82" y="244" width="408" height="26" rx="5" fill="#0f172a"/>
          <path d="M 94 257 L 110 257 L 110 248 L 128 248 L 128 265 L 146 265 L 146 248 L 164 248 L 164 265 L 182 265 L 182 248 L 200 248" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="348" y="260.5" text-anchor="middle" font-size="8.2" font-weight="800" fill="#7dd3fc">超鮮鋭クロックエッジ：71.47 fs RMS / スプリアス −60 dBc</text>

          <!-- Right KPI Panel -->
          ${kpiCard(520, 86, 174, 58, '積分RMSジッタ', '71.47 fs', 'サブ100フェムト秒級超低雑音', '#0284c7')}
          ${kpiCard(520, 154, 174, 58, '分数スプリアス抑圧', '−60 dBc', 'Dual-Ramp DTC線形化効果', '#7c3aed')}
          ${kpiCard(520, 222, 174, 58, '電源耐性 (PSRR)', 'ドロップ環境でも安定', 'MIPI/HDMI/PCIe同期を死守', '#059669')}

          ${nanoPin(208, 152, 86, 314, 1, 'デュアルランプ時間増幅DTC', '2本の傾斜波で電源変動を相殺し超高精度な位相補正', '#0284c7', 'start')}
          ${nanoPin(415, 162, 368, 314, 2, '八角形スパイラル LC-DCO', '高Q値インダクタ共振器で熱位相雑音を物理最小化', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'デュアルランプ時間増幅DTCと八角形LC-DCOを組み合わせた分数N ADPLL', line2: '電源ノイズによる遅延揺らぎを2ランプ差分で相殺し71.47 fsの超低ジッタ達成' },
          { label: '撮影・画質への恩恵', line1: 'HDMI 2.1（48Gbps）やPCIe Gen5・超高速センサー読出のビットエラーを極小化', line2: '29.97/59.94/23.976fpsなど分数フレームレートの映像音声同期を寸分違わず維持' },
          { label: '実機・2026学会諸元', line1: 'ISSCC 2026 発表（積分RMSジッタ 71.47 fs・分数スプリアス −60 dBc）', line2: '電源電圧変動に強いSupply-Resilient構成で大規模デジタル混載SoCに最適' },
        ],
      });

    // X2-69. ISSCC 2026 Dynamic Voltage Droop Detector & Adaptive Clock Stretcher FLL
    case 'xv2_droop_adaptive_clock_fll':
      return renderBionzV2Hd({
        badge: 'X2-69',
        zone: 'isp_mem',
        nodeTag: 'ISSCC 2026 · Adaptive FLL',
        title: 'ISSCC 2026 ナノ秒応答「動的電圧ドロップ検知 ＆ 適応型クロック伸縮器（Adaptive FLL）」',
        analogy: '急に電源電圧が落ちた数ナノ秒の瞬間だけクロックの歩幅を反射的に緩め、演算ミスと余分な電圧マージンを同時解消',
        metric: '1–2サイクル応答 / 電圧−12%',
        scaleLabel: 'DROOP: 75–115 mV · GLITCHLESS',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        art: () => `
          <!-- Synchronized Dual Oscilloscope Waveform: VDD Droop (Top) + Stretched Clock (Bottom) -->
          <rect x="68" y="84" width="440" height="196" rx="10" fill="#0f172a" stroke="#fb923c" stroke-width="1.4"/>
          <text x="288" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#fed7aa">実時間波形：急峻 di/dt 電圧ドロップ発生 → ナノ秒グリッチレス伸縮</text>

          <!-- Top Scope: VDD Supply Voltage Trace -->
          <line x1="88" y1="126" x2="490" y2="126" stroke="#334155" stroke-width="0.9" stroke-dasharray="3 3"/>
          <text x="92" y="121" font-size="7.6" font-weight="800" fill="#94a3b8">V_nom ≈ 0.70V</text>
          <!-- Droop Threshold Line -->
          <line x1="88" y1="150" x2="490" y2="150" stroke="#ef4444" stroke-width="1" stroke-dasharray="4 2"/>
          <text x="486" y="146" text-anchor="end" font-size="7.4" font-weight="800" fill="#fca5a5">検知閾値 (−75mV)</text>
          <!-- VDD Waveform dropping sharply then recovering -->
          <path d="M 88 126 L 176 126 Q 192 126 206 174 Q 222 184 268 172 Q 314 156 356 128 L 490 126" fill="none" stroke="#facc15" stroke-width="2.6"/>
          <rect x="196" y="114" width="144" height="154" rx="4" fill="#ef4444" fill-opacity="0.14" stroke="#f97316" stroke-width="1" stroke-dasharray="3 2"/>
          <text x="268" y="166" text-anchor="middle" font-size="7.8" font-weight="900" fill="#fde047">di/dt ドロップ −115mV!</text>

          <!-- Bottom Scope: Adaptive Stretched Clock Waveform -->
          <text x="92" y="206" font-size="7.8" font-weight="800" fill="#7dd3fc">Adaptive FLL クロック出力</text>
          <!-- Fast normal clock -> Stretched wide pulses during droop -> Fast recovery -->
          <path d="M 88 248 L 100 248 100 218 112 218 112 248 124 248 124 218 136 218 136 248 148 248 148 218 160 218 160 248 172 248 172 218 184 218 184 248 202 248 202 218 228 218 228 248 258 248 258 218 288 218 288 248 318 248 318 218 342 218 342 248 358 248 358 218 370 218 370 248 382 248 382 218 394 218 394 248 406 248 406 218 418 218 418 248 430 248 430 218 442 218 442 248 454 248 454 218 466 218 466 248 486 248" fill="none" stroke="#38bdf8" stroke-width="2.1"/>
          <text x="268" y="264" text-anchor="middle" font-size="8.0" font-weight="900" fill="#34d399">← 1–2サイクルで即座に周期伸縮（タイミングエラー0!） →</text>

          <!-- Right KPI Panel -->
          ${kpiCard(522, 86, 172, 58, '検知〜伸縮応答', '数 ns (1–2 cycle)', 'グリッチレス反射制御', '#ea580c')}
          ${kpiCard(522, 154, 172, 58, 'ガードバンド回収', '動作電圧 −10–15%', '過剰な安全マージン電圧を削減', '#059669')}
          ${kpiCard(522, 222, 172, 58, '電力削減ゲイン', '動的電力 −20%超', 'P ∝ V²f の二乗効果で大幅省エネ', '#0284c7')}

          ${nanoPin(210, 172, 86, 314, 1, 'オンダイ高速 di/dt 検知器', '75–115mV級電圧降下を遅延線モニタでナノ秒捕捉', '#f59e0b', 'start')}
          ${nanoPin(274, 232, 368, 314, 2, '適応クロック伸縮 FLL', 'ドロップ期間だけ自動的に周波数を緩め暴走を絶対防止', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '急峻な75–115mV電源ドロップを1–2サイクル以内に検知するオンダイセンサー', line2: 'グリッチレス適応型クロック伸縮器（FLL）が周期を自動延長し誤動作をゼロ化' },
          { label: '撮影・画質への恩恵', line1: '連写開始やAI顔認識急増時の瞬間大電流でも安全マージン電圧を10–15%削れる', line2: '電圧二乗（V²）の法則でBIONZ消費電力と発熱を20%超削減し長時間4K録画を支援' },
          { label: '実機・2026学会諸元', line1: 'ISSCC 2026 実証（数ns応答 di/dt Droop Detector ＋ Adaptive FLL）', line2: 'V_nom ~0.70V環境での過剰ガードバンドを回収する最新省電力プロセッサ技術' },
        ],
      });

    // X2-70. ISSCC 2026 Paper 10.3 2nm Clock-Edge Architecture & Multi-Bit Pulse Latch
    case 'xv2_2nm_clock_edge_lowpower':
      return renderBionzV2Hd({
        badge: 'X2-70',
        zone: 'isp_mem',
        nodeTag: 'ISSCC 2026 · Paper 10.3',
        title: 'ISSCC 2026「2nm クロックエッジ駆動アーキテクチャ ＆ マルチビット・パルスラッチ」',
        analogy: '全社員が個別に腕時計(FF)を動かすのをやめ、4人班ごとに共有ストップウォッチ(パルス生成器)で電力を激減',
        metric: 'クロック電力 大幅削減',
        scaleLabel: '2nm GAA · QUAD PULSE LATCH',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        art: (p) => `
          <!-- Left: Conventional Master-Slave Flip-Flops vs Right: Shared Pulse Gen + Quad-Bit Pulse Latch -->
          <rect x="68" y="84" width="188" height="196" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
          <text x="162" y="102" text-anchor="middle" font-size="8.6" font-weight="800" fill="#991b1b">× 従来 4× 個別MS-FF</text>
          ${[116, 150, 184, 218].map((y, i) => `
            <rect x="86" y="${y}" width="64" height="24" rx="4" fill="#fecaca" stroke="#dc2626"/>
            <text x="118" y="${y + 15}" text-anchor="middle" font-size="7.6" font-weight="800" fill="#7f1d1d">Master ${i}</text>
            <rect x="156" y="${y}" width="64" height="24" rx="4" fill="#fca5a5" stroke="#dc2626"/>
            <text x="188" y="${y + 15}" text-anchor="middle" font-size="7.6" font-weight="800" fill="#7f1d1d">Slave ${i}</text>
          `).join('')}
          <text x="162" y="256" text-anchor="middle" font-size="7.6" font-weight="800" fill="#b91c1c">× 計8ラッチ＋4倍のクロック負荷</text>
          <text x="162" y="270" text-anchor="middle" font-size="7.4" font-weight="700" fill="#991b1b">全チップ電力の30–40%を空費!</text>

          <!-- Center: ISSCC 2026 Paper 10.3 Shared Clock-Edge Pulse Gen + Quad Pulse Latch -->
          <rect x="268" y="84" width="244" height="196" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="1.45"/>
          <text x="390" y="102" text-anchor="middle" font-size="8.6" font-weight="800" fill="#065f46">○ 2nm クロックエッジ駆動＋クワッドラッチ</text>

          <!-- Shared Twin-Edge Pulse Generator -->
          <rect x="282" y="138" width="76" height="84" rx="7" fill="url(#${p}_emerald)" stroke="#065f46" stroke-width="1.3"/>
          <text x="320" y="164" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">共有</text>
          <text x="320" y="177" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">エッジパルス</text>
          <text x="320" y="190" text-anchor="middle" font-size="7.6" font-weight="800" fill="#d1fae5">生成器</text>
          <path d="M 294 210 L 306 210 308 198 312 210 326 210 328 198 332 210 344 210" fill="none" stroke="#fde047" stroke-width="1.8"/>

          <!-- Quad-Bit Low-C Pulse Latches (Half transistor count!) -->
          ${[116, 150, 184, 218].map((y, i) => `
            <line x1="358" y1="180" x2="386" y2="${y + 12}" stroke="#059669" stroke-width="1.5"/>
            <rect x="388" y="${y}" width="108" height="24" rx="4" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="1.1"/>
            <text x="442" y="${y + 15}" text-anchor="middle" font-size="7.8" font-weight="900" fill="#ffffff">1段 Pulse Latch #${i}</text>
          `).join('')}
          <text x="390" y="256" text-anchor="middle" font-size="7.8" font-weight="800" fill="#065f46">○ ラッチ数半減＆ローカル配線容量C_clk激減!</text>
          <text x="390" y="270" text-anchor="middle" font-size="7.4" font-weight="700" fill="#047857">2nm高抵抗配線ボトルネックに最適化</text>

          <!-- Right KPI Panel -->
          ${kpiCard(524, 86, 170, 58, 'クロックツリー電力', '大幅削減 (共有化)', '4ビットで1パルス生成器を共用', '#059669')}
          ${kpiCard(524, 154, 170, 58, '遅延・タイムボロー', 'D-to-Q 短縮', '1段ラッチ透過で高速パイプライン', '#0284c7')}
          ${kpiCard(524, 222, 170, 58, '最新学会出典', 'ISSCC 2026 10.3', '2nm GAAプロセッサ実装検証', '#7c3aed')}

          ${nanoPin(320, 180, 86, 314, 1, '共有クロックエッジ・パルス生成器', '極細パルスを4ラッチへ一括供給し駆動電力を激減', '#059669', 'start')}
          ${nanoPin(442, 196, 368, 314, 2, '低C_clk クワッド・パルスラッチ', '従来の2段MS-FFを1段へ簡素化し面積＆発熱を大幅圧縮', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '共有クロックエッジ・パルス生成器と4ビット一括の低容量パルスラッチを統合', line2: '2段マスター・スレーブFFを1段へ置換し2nmローカル配線容量とクロック負荷を圧縮' },
          { label: '撮影・画質への恩恵', line1: 'SoC総消費電力の3〜4割を占めるクロック分配電力を根本から削減', line2: '無数のパイプライン段を持つISP/AI回路の省電力化で長時間4K60p連続撮影を支える' },
          { label: '実機・2026学会諸元', line1: 'ISSCC 2026 Paper 10.3（2nm GAAクロックエッジ駆動アーキテクチャ）', line2: '共有パルス生成＋クワッドパルスラッチにより面積・遅延・動的電力を三位一体改善' },
        ],
      });

    default:
      return null;
  }
}
