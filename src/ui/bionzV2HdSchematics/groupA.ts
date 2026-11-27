import { PartExplanation } from '../../assemblies/types';
import {
  cmpBanner,
  dimArrow,
  kpiCard,
  loupeFrame,
  nanoPin,
  renderBionzV2Hd,
  scaleBar,
} from './shared';

/**
 * Ultra-HD 720x500 Nanoscale Technical Schematics for BIONZ V2 Group A (X2-01 – X2-15):
 * 3D SoIC Hybrid Bonding, CoWoS-L Active LSI, LPDDR6 PHY, Glass Core TGV, CPO, SLVS-EC PAM4,
 * BEOL Air-Gap ULK, Ru/Mo M0, BEOL Temp Sensor, SHPMIM, EM Co-Cap, 4-Sheet GAA, 360° HKMG,
 * La/Al Vth Dipole, and Crescent SiN Inner Spacer.
 */
export function renderBionzV2GroupA(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // X2-01. TSMC SoIC 3D Sub-10um Cu-Cu Direct Hybrid Bonding
    case 'xv2_soic_hybrid_bond_3d':
      return renderBionzV2Hd({
        badge: 'X2-01',
        zone: 'pkg35d',
        nodeTag: 'TSMC SoIC · 2026量産',
        title: 'TSMC SoIC 3Dチップ積層「サブ10μmピッチ Cu-Cu直接ハイブリッド接合」',
        analogy: 'はんだ粒を全廃し鏡面の銅原子どうしを直結、2枚のチップを1つの脳に合体',
        metric: '密度 10〜100倍 / 電力 1/10',
        scaleLabel: 'PITCH: < 10 μm (9→4.5 μm)',
        accent: '#d97706',
        accentSoft: '#fff7ed',
        art: (p) => `
          <!-- Left: Conventional Micro-Bump (BAD) -->
          ${cmpBanner(72, 82, 186, '従来2.5D：はんだ粒（25–40μm）', false)}
          <rect x="82" y="114" width="166" height="32" rx="4" fill="url(#${p}_si)"/>
          <text x="165" y="134" text-anchor="middle" font-size="9.5" font-weight="800" fill="#e2e8f0">上ダイ（SRAM / AI）</text>
          ${[104, 144, 184, 224].map((x) => `<ellipse cx="${x}" cy="166" rx="13" ry="16" fill="url(#${p}_ru)" stroke="#64748b"/><text x="${x}" y="170" text-anchor="middle" font-size="7.5" font-weight="800" fill="#0f172a">Sn</text>`).join('')}
          <rect x="82" y="186" width="166" height="32" rx="4" fill="url(#${p}_cyan)"/>
          <text x="165" y="206" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">下ダイ（BIONZ コア）</text>
          ${dimArrow(104, 232, 144, 232, '40 μm', '#dc2626')}
          <text x="165" y="258" text-anchor="middle" font-size="9.2" font-weight="700" fill="#991b1b">はんだが太く本数不足＆抵抗発熱大</text>
          ${kpiCard(86, 272, 158, 56, '従来接合エネルギー', '0.5–1.0 pJ/bit', 'ピン密度 ~600本/mm²', '#dc2626')}

          <!-- Center transition arrow -->
          <path d="M 270 166 L 304 166" stroke="#d97706" stroke-width="3" marker-end="url(#${p}_arr_gold)"/>
          <text x="287" y="156" text-anchor="middle" font-size="8.5" font-weight="900" fill="#b45309">はんだ0</text>

          <!-- Right: TSMC SoIC Direct Cu-Cu Hybrid Bond (GOOD) -->
          ${cmpBanner(316, 82, 236, 'TSMC SoIC：直接Cu-Cu原子融合（<10μm）', true)}
          <rect x="322" y="114" width="224" height="36" rx="4" fill="url(#${p}_blue)"/>
          <text x="434" y="136" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">上ダイ：大容量 3D SRAM / AI NPU</text>
          <!-- SiCN Dielectric Fusion Seam -->
          <rect x="322" y="150" width="224" height="28" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="0.9"/>
          <!-- Dense Cu-Cu Direct Pads -->
          ${Array.from({ length: 10 }, (_, i) => {
            const x = 333 + i * 21;
            return `<rect x="${x}" y="150" width="11" height="28" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="0.6"/>
                    <line x1="${x}" y1="164" x2="${x + 11}" y2="164" stroke="#fde047" stroke-width="1.2"/>`;
          }).join('')}
          <rect x="322" y="178" width="224" height="36" rx="4" fill="url(#${p}_emerald)"/>
          <text x="434" y="200" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">下ダイ：BIONZ XR2 2nm ロジック</text>

          ${nanoPin(360, 164, 336, 240, 1, 'SiO₂/SiCN 常温融合', 'オーバーレイ <100nm', '#0284c7', 'start')}
          ${nanoPin(465, 164, 466, 276, 2, 'Cu-Cu 結晶熱融合', 'アニール膨張で密着', '#d97706', 'start')}

          <!-- Far Right TEM Loupe -->
          <clipPath id="${p}_lp"><circle cx="626" cy="176" r="56"/></clipPath>
          <circle cx="626" cy="176" r="56" fill="#0f172a"/>
          <g clip-path="url(#${p}_lp)">
            <rect x="568" y="120" width="116" height="56" fill="#1e3a8a"/>
            <rect x="568" y="176" width="116" height="56" fill="#065f46"/>
            <rect x="606" y="120" width="40" height="112" fill="url(#${p}_cu)"/>
            <path d="M 606 176 Q 618 170 626 176 T 646 176" fill="none" stroke="#fef08a" stroke-width="2"/>
            <text x="626" y="152" text-anchor="middle" font-size="8.5" font-weight="800" fill="#fff">Cu 結晶粒成長</text>
            <text x="626" y="205" text-anchor="middle" font-size="8.2" font-weight="800" fill="#fef08a">界面シーム消失</text>
          </g>
          ${loupeFrame(626, 176, 56, 'TEM断面拡大', '#d97706')}
          ${kpiCard(564, 250, 128, 72, 'SoIC-X 接合効率', '< 0.05 pJ/bit', '14,000+ 本/mm² (F2F)', '#059669')}
          ${scaleBar(74, 342, 64, '6 μm Pitch')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'ISOクラス1–2でSiCN絶縁膜を常温接着', line2: '熱アニール膨張でCuパッド同士を原子融合' },
          { label: '撮影・画質への恩恵', line1: '巨大3D SRAMをBIONZ直上へ遅延ゼロ直結', line2: '66MP 30fps RAW＆AI認識の省電力・高速化' },
          { label: '実機・2026学会諸元', line1: 'バンプ高0μm / ピッチ 9→6→4.5 μm世代進化', line2: 'TSMC N2/A14 SoIC量産・I/O電力 1/10以下' },
        ],
      });

    // X2-02. CoWoS-L & ISSCC 2026 Active Silicon Bridge (Active LSI)
    case 'xv2_cowos_l_active_lsi':
      return renderBionzV2Hd({
        badge: 'X2-02',
        zone: 'pkg35d',
        nodeTag: 'CoWoS-L · ISSCC 2026',
        title: 'CoWoS-L 能動シリコンブリッジ（Active LSI）内蔵リピータ＆UCIe-S',
        analogy: 'チップレット間の極小シリコン橋に信号増幅リピータを内蔵した超高速バイパス',
        metric: 'L/S 0.8–2μm / 数TB/s',
        scaleLabel: 'UCIe-S RDL: 2/2 μm',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        art: (p) => `
          <!-- RDL Molded Organic Interposer Base -->
          <rect x="76" y="210" width="440" height="72" rx="8" fill="url(#${p}_si)" stroke="#475569" stroke-width="1.2"/>
          <text x="296" y="271" text-anchor="middle" font-size="9.5" font-weight="700" fill="#94a3b8">CoWoS-L モールド再配線インターポーザ（大型化＆低反り）</text>

          <!-- Embedded Active Silicon Bridge (LSI) with internal CMOS Repeaters! -->
          <rect x="196" y="196" width="200" height="58" rx="6" fill="url(#${p}_cyan)" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="296" y="216" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">埋め込み能動シリコンブリッジ (Active LSI)</text>
          <!-- Repeater Buffer Triangles inside Bridge -->
          ${[230, 296, 362].map((x) => `
            <polygon points="${x - 12},228 ${x + 12},238 ${x - 12},248" fill="#fef08a" stroke="#a16207" stroke-width="1"/>
          `).join('')}
          <line x1="204" y1="238" x2="388" y2="238" stroke="#ffffff" stroke-width="1.8" stroke-dasharray="4 2" marker-end="url(#${p}_arr_gold)"/>

          <!-- Left Chiplet: ISP + Video Core -->
          <rect x="86" y="106" width="184" height="62" rx="7" fill="url(#${p}_emerald)" stroke="#10b981" stroke-width="1.4"/>
          <text x="178" y="132" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">ISP / 動画エンコーダ ダイ</text>
          <text x="178" y="150" text-anchor="middle" font-size="8.8" fill="#d1fae5">16bit RAW / 7K超解像パイプライン</text>

          <!-- Right Chiplet: AI NPU + C2PA Core -->
          <rect x="322" y="106" width="184" height="62" rx="7" fill="url(#${p}_hfo2)" stroke="#a78bfa" stroke-width="1.4"/>
          <text x="414" y="132" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">AI NPU / 骨格認識ダイ</text>
          <text x="414" y="150" text-anchor="middle" font-size="8.8" fill="#ede9fe">リアルタイム被写体認識＆AI-AWB</text>

          <!-- Micro-bumps connecting dies to Active LSI -->
          ${[208, 224, 240, 256, 336, 352, 368, 384].map((x) => `<rect x="${x}" y="168" width="7" height="28" rx="2" fill="url(#${p}_cu)"/>`).join('')}

          <!-- Signal Path Waveform Comparison on Right -->
          <rect x="536" y="92" width="156" height="148" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.1"/>
          <text x="614" y="110" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">橋長10mmでの波形比較</text>
          <text x="548" y="128" font-size="8.2" font-weight="700" fill="#dc2626">× 受動橋：RC減衰</text>
          <path d="M 548 152 Q 582 132 614 148 T 680 150" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="548" y="176" font-size="8.2" font-weight="700" fill="#059669">○ 能動LSI：リピータ整形</text>
          <path d="M 548 216 L 566 216 L 568 188 L 598 188 L 600 216 L 630 216 L 632 188 L 664 188 L 666 216 L 680 216" fill="none" stroke="#059669" stroke-width="2.1"/>
          <text x="614" y="232" text-anchor="middle" font-size="8.0" font-weight="700" fill="#0369a1">遅延 −45%・高周波ジッタ極小</text>

          ${nanoPin(296, 238, 178, 314, 1, '内蔵CMOSリピータ増幅器', 'ISSCC 2026 能動橋技術', '#d97706', 'start')}
          ${nanoPin(242, 182, 396, 314, 2, 'UCIe-S 超高密度配線', '1mm幅あたり数Tbps級', '#0284c7', 'start')}
          ${kpiCard(536, 250, 156, 74, '能動LSI 帯域密度', '> 4 Tbps/mm', '大型レチクル超え統合', '#0284c7')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'チップレット境界下のみへ極小シリコン橋を埋設', line2: '橋内部に能動リピータ＆デカップリング容量を内蔵' },
          { label: '撮影・画質への恩恵', line1: 'ISPとAI NPUを最適プロセスで分離製造し高速直結', line2: '巨大ワンチップ並みの低遅延でリアルタイムAI現像' },
          { label: '実機・2026学会諸元', line1: 'TSMC CoWoS-L ＋ ISSCC 2026 Active Bridge', line2: 'UCIe-S 2/2μm配線・最大3.3×レチクル面積対応' },
        ],
      });

    // X2-03. ISSCC 2026 1c nm LPDDR6 (14.4 Gb/s) Dual-Subchannel PHY
    case 'xv2_lpddr6_1c_phy':
      return renderBionzV2Hd({
        badge: 'X2-03',
        zone: 'pkg35d',
        nodeTag: 'ISSCC 2026 · 1c LPDDR6',
        title: 'ISSCC 2026最先端「1c nm LPDDR6（14.4 Gb/s）デュアルサブチャネルPHY」',
        analogy: '超高速2車線を連写時はフル開放、待機時は片車線の時計を止めて消費電力半減',
        metric: '14.4 Gb/s / 待機電力 -50%',
        scaleLabel: 'JEDEC LPDDR6 · 14.4 Gbps/pin',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        art: (p) => `
          <!-- Dual Sub-Channel Architecture -->
          <rect x="74" y="92" width="184" height="92" rx="8" fill="url(#${p}_blue)" stroke="#1d4ed8" stroke-width="1.4"/>
          <text x="166" y="114" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">Sub-Channel A（12-bit）</text>
          <text x="166" y="132" text-anchor="middle" font-size="9.2" font-weight="700" fill="#dbeafe">常時アクティブ · 14.4 Gb/s/pin</text>
          <rect x="92" y="144" width="148" height="28" rx="5" fill="#0f172a" fill-opacity="0.45"/>
          <path d="M 100 165 L 112 150 L 124 165 L 136 150 L 148 165 L 160 150 L 172 165 L 184 150 L 196 165 L 208 150 L 220 165 L 232 150" fill="none" stroke="#38bdf8" stroke-width="2"/>

          <rect x="278" y="92" width="184" height="92" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5 3"/>
          <text x="370" y="114" text-anchor="middle" font-size="11" font-weight="900" fill="#334155">Sub-Channel B（12-bit）</text>
          <text x="370" y="132" text-anchor="middle" font-size="9.2" font-weight="700" fill="#059669">軽負荷時はWCKクロック自動停止!</text>
          <rect x="296" y="144" width="148" height="28" rx="5" fill="#e2e8f0"/>
          <line x1="306" y1="158" x2="434" y2="158" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 4"/>
          <text x="370" y="162" text-anchor="middle" font-size="8.5" font-weight="800" fill="#475569">DYNAMIC EFFICIENCY MODE</text>

          <!-- Shared 2nm PHY Base + LDO WCK Tree -->
          <rect x="74" y="204" width="388" height="58" rx="8" fill="url(#${p}_si)" stroke="#2563eb" stroke-width="1.4"/>
          <text x="268" y="226" text-anchor="middle" font-size="10.8" font-weight="800" fill="#ffffff">2nm GAA LPDDR6 PHY（LDO駆動WCKツリー ＋ 動的NT-ODT）</text>
          <text x="268" y="246" text-anchor="middle" font-size="9.0" fill="#93c5fd">内蔵ECCメタデータレーン ＆ 0.9V/0.4V 超低電圧スイングI/O</text>

          <!-- Vertical arrows -->
          <line x1="166" y1="184" x2="166" y2="204" stroke="#2563eb" stroke-width="2.5" marker-end="url(#${p}_arr_blue)"/>
          <line x1="370" y1="184" x2="370" y2="204" stroke="#64748b" stroke-width="2" stroke-dasharray="3 2"/>

          <!-- Right Bandwidth Comparison Bar Chart -->
          <rect x="484" y="92" width="208" height="170" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.1"/>
          <text x="588" y="112" text-anchor="middle" font-size="10.0" font-weight="800" fill="#0f172a">ピン速度 ＆ 電力効率比較</text>
          <text x="498" y="136" font-size="8.5" font-weight="700" fill="#64748b">LPDDR5X (9.6 Gb/s)</text>
          <rect x="498" y="142" width="118" height="16" rx="4" fill="#94a3b8"/>
          <text x="622" y="154" font-size="8.5" font-weight="800" fill="#475569">1.0×</text>

          <text x="498" y="182" font-size="8.5" font-weight="800" fill="#1d4ed8">LPDDR6 1c (14.4 Gb/s)</text>
          <rect x="498" y="188" width="176" height="18" rx="4" fill="url(#${p}_blue)"/>
          <text x="586" y="201" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">+50% 帯域 / 低電圧駆動</text>

          <rect x="498" y="218" width="180" height="32" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
          <text x="588" y="232" text-anchor="middle" font-size="8.8" font-weight="800" fill="#166534">ダイナミック半幅モード動作時</text>
          <text x="588" y="245" text-anchor="middle" font-size="9.5" font-weight="900" fill="#14532d">メモリI/O電力 最大 −50% 削減</text>

          ${nanoPin(166, 226, 98, 304, 1, 'LDO駆動WCKクロック', 'ジッタ低減＆高速復帰', '#2563eb', 'start')}
          ${nanoPin(370, 226, 336, 304, 2, 'オンダイECC＆メタデータ', '高密度1cセルの宇宙線保護', '#059669', 'start')}
          ${kpiCard(538, 272, 154, 58, 'ISSCC 2026 論文', 'Paper 15.7 / 37.3', '1c nm世代 14.4 Gb/s実証', '#2563eb')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '24bit（12+12）独立デュアルサブチャネル構成', line2: 'LDO駆動WCKツリーと動的終端（NT-ODT）を統合' },
          { label: '撮影・画質への恩恵', line1: '30fps RAWプリ撮影＆8K動画の巨大帯域を確保', line2: '待機・再生時は片車線休止で電池持ちを大幅延長' },
          { label: '実機・2026学会諸元', line1: 'データ速度 14.4 Gb/s/pin（1c nm DRAM世代）', line2: 'ISSCC 2026 発表・内蔵ECCメタデータ標準対応' },
        ],
      });

    // X2-04. Next-Gen Glass Core Substrate & Laser-Modified Hourglass TGV
    case 'xv2_glass_core_tgv':
      return renderBionzV2Hd({
        badge: 'X2-04',
        zone: 'pkg35d',
        nodeTag: 'GLASS CORE · TGV',
        title: '次世代ガラスコアパッケージ基板 ＆ レーザー改質貫通ガラスビア（TGV）',
        analogy: '反りやすい樹脂板を鏡面の特殊ガラス板へ置換、砂時計型の銅柱で超高密度貫通',
        metric: '平坦度 10倍 / 高周波損 1/4',
        scaleLabel: 'TGV PITCH: 30–60 μm',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        art: (p) => `
          <!-- Top ABF Build-up Layers -->
          <rect x="74" y="102" width="384" height="24" rx="4" fill="url(#${p}_emerald)" stroke="#059669"/>
          <text x="266" y="118" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">上側 微細RDLビルドアップ層（L/S &lt; 2/2 μm 超微細露光可能!）</text>

          <!-- Center Ultra-Flat Glass Core Slab -->
          <rect x="74" y="126" width="384" height="106" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="1.8"/>
          <text x="116" y="146" font-size="8.6" font-weight="800" fill="#0369a1">特殊ホウケイ酸ガラスコア（CTE 3–5 ppm/°C）</text>

          <!-- 4 Hourglass Copper-Filled TGVs -->
          ${[128, 220, 312, 404].map((cx) => `
            <polygon points="${cx - 18},126 ${cx + 18},126 ${cx + 9},179 ${cx + 18},232 ${cx - 18},232 ${cx - 9},179" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="1.2"/>
            <polygon points="${cx - 12},126 ${cx + 12},126 ${cx + 5},179 ${cx + 12},232 ${cx - 12},232 ${cx - 5},179" fill="#fed7aa" opacity="0.35"/>
          `).join('')}
          ${dimArrow(220, 179, 312, 179, '30–60 μm', '#0f172a')}

          <!-- Bottom ABF Build-up Layers -->
          <rect x="74" y="232" width="384" height="24" rx="4" fill="url(#${p}_emerald)" stroke="#059669"/>
          <text x="266" y="248" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">下側 ビルドアップ配線 ＆ メイン基板BGAランド層</text>

          <!-- Right Comparison Panel: Organic BT Core vs Glass Core -->
          <rect x="480" y="96" width="212" height="162" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.15"/>
          <text x="586" y="114" text-anchor="middle" font-size="10.0" font-weight="800" fill="#0f172a">樹脂コア vs ガラスコア比較</text>
          ${cmpBanner(492, 124, 188, '従来有機BT基板：熱反り・粗面', false)}
          <path d="M 498 164 Q 586 146 674 164" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
          <text x="586" y="177" text-anchor="middle" font-size="8.2" font-weight="700" fill="#991b1b">大型化すると反り大・焦点ボケ</text>

          ${cmpBanner(492, 192, 188, 'ガラスコア：鏡面平坦・Si整合', true)}
          <line x1="498" y1="226" x2="674" y2="226" stroke="#0284c7" stroke-width="4.5" stroke-linecap="round"/>
          <text x="586" y="246" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0369a1">誘電正接 tanδ ≈ 0.004（超低損失）</text>

          ${nanoPin(128, 179, 98, 298, 1, '砂時計型TGV（Through-Glass Via）', 'フェムト秒レーザー改質＋選択エッチング', '#d97706', 'start')}
          ${nanoPin(360, 126, 360, 298, 2, 'サブμm鏡面平坦性', 'RDL配線の焦点深度を確保', '#0284c7', 'start')}
          ${kpiCard(538, 268, 154, 62, 'ガラスコア優位性', 'パターン密度 10×', '240mm角超大型基板対応', '#0284c7')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'フェムト秒レーザー改質＋フッ酸エッチで砂時計TGV形成', line2: 'シリコンと熱膨張率を一致させリフロー反りを極小化' },
          { label: '撮影・画質への恩恵', line1: 'SLVS-ECやPCIe Gen5のGHz帯損失を劇的低減', line2: '大型マルチチップレットを高信頼・薄型に一体化' },
          { label: '実機・2026学会諸元', line1: '誘電損失 tanδ ≈ 0.004（有機樹脂の約1/4）', line2: 'ECTC 2026最重要トラック・TGV径 15–30μm級' },
        ],
      });

    // X2-05. ISSCC 2026 Silicon Photonics Electro-Optical Router & CPO Interposer
    case 'xv2_electro_optical_cpo':
      return renderBionzV2Hd({
        badge: 'X2-05',
        zone: 'pkg35d',
        nodeTag: 'ISSCC 2026 · Si Photonics',
        title: 'ISSCC 2026 シリコンフォトニクス光電ルーター＆光インターポーザ（18ns切替）',
        analogy: '銅線の代わりに極細シリコン光導波路へレーザーを通し、マイクロリングで18ns瞬時切替',
        metric: '切替 18 ns / 電力 1/5',
        scaleLabel: 'λ = 1310 nm · WG = 450 nm',
        accent: '#db2777',
        accentSoft: '#fdf2f8',
        art: (p) => `
          <!-- Silicon Photonics Optical Interposer Substrate -->
          <rect x="72" y="96" width="440" height="178" rx="10" fill="#0f172a" stroke="#ec4899" stroke-width="1.5"/>
          <text x="292" y="116" text-anchor="middle" font-size="10.0" font-weight="800" fill="#f9a8d4">シリコンフォトニクス光導波路インターポーザ（Oバンド 1310 nm DWDM）</text>

          <!-- Horizontal Optical Bus Waveguides -->
          <line x1="88" y1="154" x2="496" y2="154" stroke="url(#${p}_laser)" stroke-width="4.5"/>
          <line x1="88" y1="226" x2="496" y2="226" stroke="#38bdf8" stroke-width="4.5"/>
          <line x1="88" y1="154" x2="496" y2="154" stroke="#ffffff" stroke-width="1.1" stroke-dasharray="8 6"/>

          <!-- 4 Tunable Micro-Ring Resonators (WDM Wavelength Switches!) -->
          ${[
            { cx: 162, col: '#f43f5e', wl: 'λ1' },
            { cx: 248, col: '#f59e0b', wl: 'λ2' },
            { cx: 334, col: '#10b981', wl: 'λ3' },
            { cx: 420, col: '#38bdf8', wl: 'λ4' },
          ].map((r) => `
            <circle cx="${r.cx}" cy="190" r="24" fill="none" stroke="${r.col}" stroke-width="4.2"/>
            <circle cx="${r.cx}" cy="190" r="16" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 2" opacity="0.65"/>
            <text x="${r.cx}" y="194" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff">${r.wl}</text>
          `).join('')}

          <!-- Laser Source & Photodiode End Caps -->
          <rect x="78" y="138" width="42" height="32" rx="4" fill="#be123c" stroke="#fda4af"/>
          <text x="99" y="158" text-anchor="middle" font-size="8.2" font-weight="900" fill="#fff">LD光源</text>
          <rect x="464" y="210" width="42" height="32" rx="4" fill="#0284c7" stroke="#bae6fd"/>
          <text x="485" y="230" text-anchor="middle" font-size="8.2" font-weight="900" fill="#fff">Ge PD</text>

          <!-- Right Panel: Electrical vs Optical Energy Comparison -->
          <rect x="528" y="96" width="166" height="142" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.1"/>
          <text x="611" y="115" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">伝送エネルギー比較</text>
          <text x="540" y="138" font-size="8.4" font-weight="700" fill="#64748b">銅配線 SerDes (10cm)</text>
          <rect x="540" y="144" width="140" height="16" rx="4" fill="#ef4444"/>
          <text x="610" y="156" text-anchor="middle" font-size="8.2" font-weight="800" fill="#fff">~10–15 pJ/bit</text>
          <text x="540" y="182" font-size="8.4" font-weight="800" fill="#be123c">SiPh 光インターポーザ</text>
          <rect x="540" y="188" width="46" height="16" rx="4" fill="url(#${p}_laser)"/>
          <text x="594" y="200" font-size="8.8" font-weight="900" fill="#db2777">~2 pJ/bit!</text>
          <text x="611" y="226" text-anchor="middle" font-size="8.4" font-weight="700" fill="#059669">距離に依存せず損失極小</text>

          ${nanoPin(248, 190, 108, 308, 1, 'PNキャリア注入マイクロリング', '熱方式(μs)の100倍速 18ns切替!', '#db2777', 'start')}
          ${nanoPin(420, 226, 366, 308, 2, 'DWDM 多波長多重導波路', '1本で数Tbpsの同時光伝送', '#0284c7', 'start')}
          ${kpiCard(538, 250, 156, 76, '光スイッチ応答速度', '18 ns', 'ISSCC 2026 CPO実証', '#db2777')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '幅450nmシリコン光導波路へ多波長レーザーを多重化', line2: 'キャリア注入マイクロリング共振器で18ns光路切替' },
          { label: '撮影・画質への恩恵', line1: '銅配線の表皮効果・発熱限界を光通信で完全突破', line2: '将来の超高解像シネマセンサー〜ISP間を極低消費電力直結' },
          { label: '実機・2026学会諸元', line1: '波長1310nm帯 DWDM / 光電変換効率 ~2 pJ/bit', line2: 'ISSCC 2026 Silicon Photonics CPO光ルーター実証' },
        ],
      });

    // X2-06. SLVS-EC v3.0 / PAM4 SerDes Receiver & DSP CDR
    case 'xv2_slvsec_pam4_cdr':
      return renderBionzV2Hd({
        badge: 'X2-06',
        zone: 'pkg35d',
        nodeTag: 'SLVS-EC v3.0 · PAM4',
        title: 'センサー直結「SLVS-EC v3.0 / PAM4多値変調 SerDes受信器＆DSP CDR」',
        analogy: '2段階(0/1)ではなく4段階の電圧の波で1本の線に2倍のRAWデータを詰め込んで受信',
        metric: '4値PAM4 / 2倍帯域密度',
        scaleLabel: 'EYE OPENING: 3-LEVEL PAM4',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        art: (p) => `
          <!-- Left: PAM4 3-Eye Oscilloscope Display -->
          <rect x="72" y="88" width="256" height="176" rx="10" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="200" y="106" text-anchor="middle" font-size="9.5" font-weight="800" fill="#67e8f9">PAM4（4値振幅変調）3連アイパターン</text>
          <!-- 3 Stacked Eyes -->
          ${[
            { y: 132, col: '#f59e0b', bits: '11' },
            { y: 172, col: '#10b981', bits: '10' },
            { y: 212, col: '#38bdf8', bits: '01' },
          ].map((e) => `
            <path d="M 88 ${e.y + 14} Q 134 ${e.y - 16} 180 ${e.y + 14} Q 226 ${e.y - 16} 272 ${e.y + 14}" fill="none" stroke="${e.col}" stroke-width="2.1"/>
            <path d="M 88 ${e.y - 14} Q 134 ${e.y + 16} 180 ${e.y - 14} Q 226 ${e.y + 16} 272 ${e.y - 14}" fill="none" stroke="${e.col}" stroke-width="2.1" opacity="0.8"/>
            <text x="294" y="${e.y - 4}" font-size="9.5" font-weight="900" fill="${e.col}" style="font-family: ui-monospace, monospace;">${e.bits}</text>
          `).join('')}
          <text x="294" y="236" font-size="9.5" font-weight="900" fill="#94a3b8" style="font-family: ui-monospace, monospace;">00</text>
          <text x="200" y="254" text-anchor="middle" font-size="8.4" font-weight="700" fill="#bae6fd">1シンボル＝2ビット同時伝送（NRZ比 2×帯域）</text>

          <!-- Right: Receiver Analog Front-End + DSP Pipeline -->
          <rect x="348" y="88" width="346" height="176" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.15"/>
          <text x="521" y="108" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">超高速レシーバ ＆ DSPクロック復元（CDR）</text>
          ${[
            { x: 360, w: 68, t: 'T-Coil', s: '帯域拡張', c: '#0891b2' },
            { x: 442, w: 72, t: 'CTLE', s: '高域補償', c: '#0284c7' },
            { x: 528, w: 72, t: 'ADC+DFE', s: '波形復元', c: '#2563eb' },
            { x: 614, w: 68, t: 'DSP CDR', s: '位相追従', c: '#059669' },
          ].map((b, idx) => `
            <rect x="${b.x}" y="128" width="${b.w}" height="52" rx="7" fill="${b.c}"/>
            <text x="${b.x + b.w / 2}" y="150" text-anchor="middle" font-size="9.8" font-weight="900" fill="#ffffff">${b.t}</text>
            <text x="${b.x + b.w / 2}" y="167" text-anchor="middle" font-size="8.2" font-weight="700" fill="#e0f2fe">${b.s}</text>
            ${idx < 3 ? `<line x1="${b.x + b.w}" y1="154" x2="${b.x + b.w + 14}" y2="154" stroke="#334155" stroke-width="2" marker-end="url(#${p}_arr_dark)"/>` : ''}
          `).join('')}

          <!-- Embedded Clock Immunity Callout -->
          <rect x="362" y="198" width="318" height="52" rx="7" fill="#ecfeff" stroke="#06b6d4" stroke-width="1"/>
          <text x="521" y="217" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0e7490">埋込クロック方式（Embedded Clock）の絶大な強み</text>
          <text x="521" y="236" text-anchor="middle" font-size="8.6" font-weight="600" fill="#155e75">5軸IBISでセンサーFPCが高速屈曲してもレーン間スキュー完全ゼロ!</text>

          ${nanoPin(180, 172, 96, 306, 1, '4値レベル識別（00/01/10/11）', '高周波減衰を抑え2倍のRAW伝送', '#0891b2', 'start')}
          ${nanoPin(564, 180, 384, 306, 2, '適応DFE＋DSP CDR', 'FPC屈曲・温度変化をリアルタイム補償', '#2563eb', 'start')}
          ${kpiCard(568, 272, 126, 56, 'センサー直結帯域', '最大 >100 Gbps', '66MP 30fps 16bit RAW', '#0891b2')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'Tコイル帯域拡張＋CTLE＋ADCベースDFEで減衰を復元', line2: 'データ内埋込クロックをDSP CDRで自動抽出・位相同期' },
          { label: '撮影・画質への恩恵', line1: '33–66MP 14/16bit RAW 30fpsを無誤差でISPへ直送', line2: 'IBIS可動FPCの配線本数を半減し手ブレ補正負荷を軽減' },
          { label: '実機・2026学会諸元', line1: 'Sony SLVS-EC v3.0 / 次世代PAM4多値SerDes互換', line2: 'ビット誤り率 BER < 10⁻¹⁵ 級・FEC誤り訂正連携' },
        ],
      });

    // X2-07. Upper BEOL Nano Air-Gap & Ultra-Low-k SiCOH (k < 2.2)
    case 'xv2_beol_airgap_ulk':
      return renderBionzV2Hd({
        badge: 'X2-07',
        zone: 'beol',
        nodeTag: 'BEOL · k < 2.2 ULK',
        title: '上層BEOL「ナノ・エアギャップ（空気絶縁すき間）＆ 超低誘電率SiCOH」',
        analogy: '銅線どうしの間に究極の絶縁体「空気のすき間」を彫り込み、電気の引っ張り合いを断つ',
        metric: '比誘電率 k ≈ 1.0 / RC -30%',
        scaleLabel: 'AIR-GAP WIDTH: 18–24 nm',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        art: (p) => `
          <!-- Cross-section of Multi-Tier BEOL with Nano Air-Gaps -->
          <rect x="74" y="88" width="420" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="284" y="108" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">BEOL上層断面：多孔質SiCOH（k&lt;2.2）＋ ナノ空気空洞（k=1.0）</text>

          <!-- Upper Passivation Cap -->
          <rect x="92" y="122" width="384" height="20" rx="3" fill="url(#${p}_glass)" stroke="#0284c7"/>
          <text x="284" y="135" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0369a1">非コンフォーマルSiCNキャップ膜（空洞の上だけフタをする！）</text>

          <!-- Alternating Copper Lines & Air-Gap Cavities -->
          ${[112, 198, 284, 370].map((x, idx) => `
            <rect x="${x}" y="142" width="48" height="72" rx="3" fill="url(#${p}_cu)" stroke="#9a3412" stroke-width="1.2"/>
            <text x="${x + 24}" y="182" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">Cu M${6 + idx}</text>
            ${
              idx < 3
                ? `<path d="M ${x + 54} 142 L ${x + 80} 142 Q ${x + 84} 178 ${x + 76} 214 L ${x + 58} 214 Q ${x + 50} 178 ${x + 54} 142 Z" fill="#ffffff" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="3 2"/>
                   <text x="${x + 67}" y="175" text-anchor="middle" font-size="8.2" font-weight="900" fill="#0284c7">空気</text>
                   <text x="${x + 67}" y="188" text-anchor="middle" font-size="7.6" font-weight="800" fill="#0369a1">k=1.0</text>`
                : ''
            }
          `).join('')}

          <!-- Porous SiCOH ULK Base -->
          <rect x="92" y="214" width="384" height="44" rx="3" fill="#e0f2fe" stroke="#38bdf8"/>
          ${Array.from({ length: 16 }, (_, i) => `<circle cx="${108 + i * 23}" cy="${228 + (i % 2) * 14}" r="3.2" fill="#ffffff" stroke="#7dd3fc"/>`).join('')}
          <text x="284" y="252" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0369a1">多孔質 ULK SiCOH 絶縁層（ナノ気孔で k &lt; 2.2）</text>

          <!-- Right Panel: Dielectric Constant Scale -->
          <rect x="514" y="88" width="180" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="604" y="108" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f172a">絶縁材料の比誘電率 k</text>
          ${[
            { y: 126, w: 146, l: 'SiO₂ (従来)', v: 'k = 3.9', c: '#94a3b8' },
            { y: 164, w: 108, l: 'Low-k SiOC', v: 'k = 2.7', c: '#f59e0b' },
            { y: 202, w: 84, l: '多孔質ULK', v: 'k &lt; 2.2', c: '#0ea5e9' },
            { y: 240, w: 42, l: 'エアギャップ', v: 'k ≈ 1.0!', c: '#059669' },
          ].map((b) => `
            <text x="526" y="${b.y}" font-size="8.2" font-weight="700" fill="#334155">${b.l}</text>
            <rect x="526" y="${b.y + 5}" width="${b.w}" height="15" rx="3" fill="${b.c}"/>
            <text x="${532 + b.w}" y="${b.y + 16}" font-size="8.5" font-weight="900" fill="${b.c}">${b.v}</text>
          `).join('')}

          ${nanoPin(179, 178, 92, 314, 1, 'ナノ・エアギャップ空洞', '隣接配線間容量 C_line を最大−35%削減', '#0284c7', 'start')}
          ${nanoPin(308, 182, 372, 314, 2, 'クロストーク＆発熱激減', '1/2 C·V²·f の配線動的電力を抑制', '#ea580c', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '配線間ULKをエッチング除去し上部のみキャップ封止', line2: '比誘電率1.0の空気空洞で線間静電容量Cを激減' },
          { label: '撮影・画質への恩恵', line1: 'BIONZ XR2内部の広域データバス遅延を最大30%短縮', line2: '高フレームレート連写・動画処理時の動的発熱を低減' },
          { label: '実機・2026学会諸元', line1: '多孔質SiCOH（k<2.2）＋ ナノ空洞（実効k≈1.4–1.8）', line2: '2nm/A16 BEOL高周波クリティカル層へ選択導入' },
        ],
      });

    // X2-08. Bottom M0/M1 21nm-Pitch Ruthenium (Ru) / Molybdenum (Mo) Barrierless Tracks
    case 'xv2_ru_mo_m0_tracks':
      return renderBionzV2Hd({
        badge: 'X2-08',
        zone: 'beol',
        nodeTag: '2nm BEOL · 21nm M0',
        title: '最下層M0/M1極細21nmピッチ「ルテニウム（Ru）／モリブデン（Mo）バリアレス配線」',
        analogy: '銅に必要な厚い保護シートを撤廃し、穴いっぱいに高融点金属を詰めて抵抗急増を回避',
        metric: '電子平均自由行程 1/6 (Ru)',
        scaleLabel: 'M0 PITCH: 21 nm (CD ~10.5 nm)',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        art: (p) => `
          <!-- Left: Copper with Thick TaN Barrier Liner (BAD) -->
          ${cmpBanner(74, 84, 200, '従来 Cu (幅10nm)：バリアで窒息', false)}
          <rect x="114" y="116" width="120" height="122" rx="6" fill="#334155"/>
          <rect x="130" y="132" width="88" height="90" rx="4" fill="#94a3b8"/>
          <rect x="148" y="150" width="52" height="54" rx="3" fill="url(#${p}_cu)"/>
          <text x="174" y="180" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">狭いCu</text>
          <text x="174" y="128" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fde047">厚いTaNバリア膜(3nm×2)</text>
          <text x="174" y="256" text-anchor="middle" font-size="8.8" font-weight="700" fill="#991b1b">Cu断面積が半分以下＆粒界散乱で抵抗爆増!</text>

          <!-- Right: Barrierless Ru / Mo (GOOD) -->
          ${cmpBanner(300, 84, 204, '次世代 Ru / Mo：完全バリアレス', true)}
          <rect x="340" y="116" width="124" height="122" rx="6" fill="url(#${p}_ru)" stroke="#0f172a" stroke-width="1.4"/>
          <text x="402" y="168" text-anchor="middle" font-size="11.5" font-weight="900" fill="#0f172a">純 Ru / Mo 100%充填</text>
          <text x="402" y="188" text-anchor="middle" font-size="9.0" font-weight="800" fill="#1e293b">バリア膜 0 nm（拡散ゼロ）</text>
          <text x="402" y="206" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0f766e">EM耐性 100倍以上</text>
          <text x="402" y="256" text-anchor="middle" font-size="8.8" font-weight="800" fill="#166534">10nm幅でも抵抗が跳ね上がらず高寿命!</text>

          <!-- Electron Mean Free Path Comparison Panel -->
          <rect x="524" y="88" width="170" height="176" rx="9" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="609" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">電子平均自由行程 (λ)</text>
          <text x="609" y="121" text-anchor="middle" font-size="7.8" fill="#64748b">短いほど極細線で低抵抗!</text>
          <text x="536" y="144" font-size="8.4" font-weight="700" fill="#dc2626">Cu（銅）: 39.0 nm</text>
          <rect x="536" y="149" width="144" height="14" rx="3" fill="#ef4444"/>
          <text x="536" y="182" font-size="8.4" font-weight="800" fill="#0284c7">Mo（モリブデン）: 11.2 nm</text>
          <rect x="536" y="187" width="48" height="14" rx="3" fill="#0284c7"/>
          <text x="536" y="220" font-size="8.4" font-weight="900" fill="#059669">Ru（ルテニウム）: 6.6 nm!</text>
          <rect x="536" y="225" width="28" height="14" rx="3" fill="#059669"/>
          <text x="609" y="254" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f172a">10nm線幅でCuを逆転!</text>

          ${nanoPin(402, 238, 118, 308, 1, 'バリア膜撤廃で断面積2倍', 'SiO₂へ拡散しない高融点金属', '#059669', 'start')}
          ${nanoPin(609, 232, 412, 308, 2, 'サイズ効果による抵抗急増を回避', '21nm→16nm M0微細化の要', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '電子平均自由行程が短いRu(6.6nm)/Mo(11.2nm)採用', line2: '絶縁膜へ拡散しないため高抵抗TaNバリア層を全廃' },
          { label: '撮影・画質への恩恵', line1: 'トランジスタ直上の極細M0遅延とジュール発熱を抑制', line2: '高密度ISP論理の高速動作と10年超EM寿命を両立' },
          { label: '実機・2026学会諸元', line1: '配線ピッチ 21 nm（線幅 ~10.5 nm）・高融点>2,300°C', line2: 'TSMC N2/A16・imec・IEDM 2025ポスト銅標準路線' },
        ],
      });

    // X2-09. ISSCC 2026 Samsung SF2 BEOL Upper-Metal Resistive Temp Sensor
    case 'xv2_beol_metal_temp_sensor':
      return renderBionzV2Hd({
        badge: 'X2-09',
        zone: 'beol',
        nodeTag: 'ISSCC 2026 · SF2 2nm',
        title: 'ISSCC 2026 Samsung SF2「BEOL上層金属抵抗式・超小型オンダイ温度センサー」',
        analogy: 'トランジスタ用地を1ミリも使わず配線層のすき間に極細温度計を何百個も分散配置',
        metric: '面積 1% / 518倍高抵抗',
        scaleLabel: 'FOOTPRINT: 1% vs BJT SENSOR',
        accent: '#ef4444',
        accentSoft: '#fef2f2',
        art: (p) => `
          <!-- Upper BEOL Meander Metal Resistor sitting ABOVE FEOL Logic! -->
          <rect x="74" y="196" width="380" height="72" rx="8" fill="url(#${p}_si)" stroke="#475569"/>
          <text x="264" y="226" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">FEOL 2nm GAA 演算ロジック（AI NPU / ISP 発熱ホットスポット）</text>
          <text x="264" y="248" text-anchor="middle" font-size="8.8" fill="#fca5a5">従来BJT温度計はここを占有 → BEOL式は占有面積 0!</text>

          <!-- Rising Heat Plumes -->
          ${[136, 222, 308, 394].map((x) => `<path d="M ${x} 196 Q ${x - 8} 178 ${x} 162" fill="none" stroke="#f97316" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>`).join('')}

          <!-- Ultra-High-Resistance BEOL Serpentine Metal Sensor -->
          <rect x="74" y="96" width="380" height="64" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="1.6"/>
          <text x="264" y="113" text-anchor="middle" font-size="9.5" font-weight="800" fill="#991b1b">BEOL上層 高抵抗サーペンタイン金属抵抗センサー（R(T) = R₀(1 + αΔT)）</text>
          <path d="M 96 146 L 116 146 L 116 124 L 138 124 L 138 146 L 160 146 L 160 124 L 182 124 L 182 146 L 204 146 L 204 124 L 226 124 L 226 146 L 248 146 L 248 124 L 270 124 L 270 146 L 292 146 L 292 124 L 314 124 L 314 146 L 336 146 L 336 124 L 358 124 L 358 146 L 380 146 L 380 124 L 402 124 L 402 146 L 432 146" fill="none" stroke="url(#${p}_heat)" stroke-width="3.2" stroke-linejoin="round"/>

          <!-- Right Linear R(T) Plot & KPIs -->
          <rect x="476" y="92" width="216" height="176" rx="9" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="584" y="111" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">金属抵抗リニア温度特性</text>
          <line x1="504" y1="226" x2="672" y2="226" stroke="#475569" stroke-width="1.3"/>
          <line x1="504" y1="126" x2="504" y2="226" stroke="#475569" stroke-width="1.3"/>
          <line x1="510" y1="216" x2="664" y2="136" stroke="#ef4444" stroke-width="2.8"/>
          <circle cx="586" cy="176" r="4" fill="#ef4444"/>
          <text x="588" y="242" text-anchor="middle" font-size="8.2" font-weight="700" fill="#475569">接合温度 Tj (−40°C → +125°C)</text>
          <text x="598" y="168" font-size="8.4" font-weight="800" fill="#dc2626">518× 高抵抗化!</text>
          <text x="598" y="182" font-size="7.8" fill="#64748b">低電流・高感度読出</text>

          ${nanoPin(226, 134, 96, 306, 1, '面積 1/100 の超小型プローブ', '発熱源の真上へ高密度マッピング', '#ef4444', 'start')}
          ${nanoPin(360, 196, 370, 306, 2, 'DVFS リアルタイム熱スロットル制御', '4K120p録画の限界温度をミリ秒監視', '#d97706', 'start')}
          ${kpiCard(546, 274, 146, 54, 'ISSCC 2026 SF2', '面積 1% / 518×R', '高精度リアルタイム熱監視', '#ef4444')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'BEOL上層金属を518倍高抵抗蛇行抵抗体として構成', line2: 'FEOL面積を奪わずホットスポット直上へ超高密度配置' },
          { label: '撮影・画質への恩恵', line1: '局所発熱をミリ秒検知し最適DVFSで熱停止を極限回避', line2: '8K/4K120p連続収録時の性能維持と安全保護を両立' },
          { label: '実機・2026学会諸元', line1: '従来BJT比 面積約1%・抵抗値518倍の高感度設計', line2: 'ISSCC 2026 Samsung 2nm SF2 オンダイ温度計実証' },
        ],
      });

    // X2-10. TSMC N2P Super-High-Performance MIM (SHPMIM) 3D Trench Decap
    case 'xv2_shpmim_decap':
      return renderBionzV2Hd({
        badge: 'X2-10',
        zone: 'beol',
        nodeTag: 'TSMC N2P · SHPMIM',
        title: 'TSMC N2P「超高密度3DトレンチSHPMIM電源安定コンデンサ」',
        analogy: '配線層の真上へ巨大な立体貯水タンクを築き、AIフル稼働時の瞬間電力を即座に補給',
        metric: '容量密度 2×超 / 抵抗 1/2',
        scaleLabel: '3D HIGH-K TRENCH MIM',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- 3D High-Aspect-Ratio Multi-Fin SHPMIM Cross-Section -->
          <rect x="74" y="92" width="400" height="176" rx="10" fill="#ffffff" stroke="#c4b5fd" stroke-width="1.3"/>
          <text x="274" y="110" text-anchor="middle" font-size="10.0" font-weight="800" fill="#4c1d95">SHPMIM（Super-High-Performance MIM）立体多層トレンチ断面</text>

          <!-- Top VDD Plate -->
          <rect x="94" y="122" width="360" height="18" rx="3" fill="url(#${p}_cu)"/>
          <text x="274" y="135" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">上部電極プレート（VDD 電源直結・超低ESR）</text>

          <!-- Interdigitated 3D Trench Fins + Conformal High-k ZrO2/HfO2 Film -->
          ${Array.from({ length: 7 }, (_, i) => {
            const x = 112 + i * 48;
            return `
              <rect x="${x}" y="140" width="16" height="84" rx="2" fill="url(#${p}_cu)"/>
              <rect x="${x + 16}" y="146" width="8" height="86" fill="url(#${p}_hfo2)"/>
              <rect x="${x + 24}" y="152" width="16" height="84" rx="2" fill="url(#${p}_ru)"/>
              <rect x="${x + 40}" y="146" width="8" height="86" fill="url(#${p}_hfo2)"/>
            `;
          }).join('')}

          <!-- Bottom VSS Plate -->
          <rect x="94" y="236" width="360" height="18" rx="3" fill="url(#${p}_si)"/>
          <text x="274" y="249" text-anchor="middle" font-size="8.6" font-weight="900" fill="#e2e8f0">下部電極プレート（VSS グランド直結）</text>

          <!-- Right Panel: Droop Suppression Waveform -->
          <rect x="494" y="92" width="198" height="176" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="593" y="111" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">瞬間負荷時の電圧降下比較</text>
          <line x1="510" y1="142" x2="676" y2="142" stroke="#94a3b8" stroke-dasharray="3 2"/>
          <text x="676" y="138" text-anchor="end" font-size="7.6" fill="#64748b">V_nom 0.72V</text>
          <!-- Conventional deep droop -->
          <path d="M 510 142 L 542 142 Q 558 228 584 176 T 676 146" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 2"/>
          <text x="582" y="226" font-size="8.0" font-weight="800" fill="#dc2626">× 従来MIM: 深いドロップ</text>
          <!-- SHPMIM shallow droop -->
          <path d="M 510 142 L 542 142 Q 558 166 584 149 T 676 143" fill="none" stroke="#7c3aed" stroke-width="2.6"/>
          <text x="594" y="180" font-size="8.2" font-weight="900" fill="#5b21b6">○ SHPMIM: 瞬時補償!</text>
          <text x="593" y="252" text-anchor="middle" font-size="8.2" font-weight="700" fill="#059669">Vminマージン大幅改善 → +5%高速</text>

          ${nanoPin(180, 186, 94, 306, 1, 'コンフォーマル高誘電ZrO₂/HfO₂', '立体壁面で実効表面積を数倍化', '#7c3aed', 'start')}
          ${nanoPin(354, 130, 356, 306, 2, '超低シート抵抗プレート', 'インダクタンス極小でGHz電流を即給電', '#d97706', 'start')}
          ${kpiCard(554, 274, 138, 54, 'TSMC N2P 採用', '容量密度 2×以上', '抵抗 1/2・電源安定化', '#7c3aed')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'BEOL上層に3D高アスペクト比トレンチ＋高誘電MIM形成', line2: '従来SHDMIM比で2倍超の容量密度とシート抵抗半減' },
          { label: '撮影・画質への恩恵', line1: 'NPUと30fps連写一斉起動時の電源電圧揺れを瞬時吸収', line2: 'BSPDNなしの表面給電N2Pでも高いクロックと安定性を達成' },
          { label: '実機・2026学会諸元', line1: 'TSMC N2P（2026年量産）標準PDN強化モジュール', line2: 'N2比 速度+5%または電力−5〜10%へ直接貢献' },
        ],
      });

    // X2-11. Electromigration Prevention Co-Cap & Redundant Double-Via Copper Stopper
    case 'xv2_em_reservoir_via':
      return renderBionzV2Hd({
        badge: 'X2-11',
        zone: 'beol',
        nodeTag: 'RELIABILITY · EM GUARD',
        title: 'エレクトロマイグレーション防止「コバルト（Co）キャップ＆冗長ダブルビア」',
        analogy: '電子の激流で銅原子が流されるのをコバルトの屋根と二股の予備階段で100倍長寿命化',
        metric: 'EM寿命 100倍超 / 冗長2ビア',
        scaleLabel: 'J_max > 10⁶ A/cm² GUARD',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Left: Single Via EM Void Failure (BAD) -->
          ${cmpBanner(74, 84, 198, '× 従来単一ビア：電子風で空洞断線', false)}
          <rect x="86" y="118" width="174" height="32" rx="4" fill="url(#${p}_cu)"/>
          <rect x="158" y="150" width="28" height="44" fill="url(#${p}_cu)"/>
          <circle cx="172" cy="156" r="10" fill="#ffffff" stroke="#dc2626" stroke-width="2" stroke-dasharray="2 2"/>
          <text x="172" y="160" text-anchor="middle" font-size="7.2" font-weight="900" fill="#dc2626">ボイド</text>
          <rect x="86" y="194" width="174" height="32" rx="4" fill="url(#${p}_cu)"/>
          <path d="M 102 210 L 160 210" stroke="#fef08a" stroke-width="2.2" marker-end="url(#${p}_arr_gold)"/>
          <text x="173" y="246" text-anchor="middle" font-size="8.6" font-weight="700" fill="#991b1b">Cu原子が電子風で流出 → オープン故障!</text>

          <!-- Right: Co-Cap + Redundant Double-Via + Reservoir (GOOD) -->
          ${cmpBanner(298, 84, 240, '○ Coキャップ ＋ 冗長ダブルビア ＋ 銅リザーバ', true)}
          <!-- Cobalt Cap Lid on Top -->
          <rect x="308" y="114" width="220" height="10" rx="2" fill="url(#${p}_cyan)" stroke="#0369a1"/>
          <text x="418" y="108" text-anchor="middle" font-size="8.4" font-weight="800" fill="#0369a1">選択ALD コバルト（Co）キャップ膜（表面拡散を完全封止）</text>
          <rect x="308" y="124" width="220" height="30" rx="3" fill="url(#${p}_cu)"/>
          <!-- Redundant Double Vias -->
          <rect x="358" y="154" width="26" height="40" fill="url(#${p}_cu)" stroke="#7c2d12"/>
          <rect x="424" y="154" width="26" height="40" fill="url(#${p}_cu)" stroke="#7c2d12"/>
          <text x="404" y="178" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0f172a">並列2ビア</text>
          <!-- Lower Cu Track + Reservoir Extension -->
          <rect x="308" y="194" width="220" height="30" rx="3" fill="url(#${p}_cu)"/>
          <rect x="470" y="194" width="58" height="30" rx="3" fill="url(#${p}_gold)" fill-opacity="0.55" stroke="#b45309" stroke-dasharray="3 2"/>
          <text x="499" y="213" text-anchor="middle" font-size="8.0" font-weight="900" fill="#78350f">Cu貯蔵端</text>
          <path d="M 322 209 L 370 209 L 370 140 L 490 140" fill="none" stroke="#fef08a" stroke-width="2" marker-end="url(#${p}_arr_gold)"/>
          <path d="M 322 213 L 437 213 L 437 140" fill="none" stroke="#fef08a" stroke-width="2"/>

          <!-- Right Black's Equation Card -->
          <rect x="554" y="96" width="140" height="148" rx="9" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="624" y="116" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">ブラックの寿命式</text>
          <text x="624" y="144" text-anchor="middle" font-size="10.2" font-weight="900" fill="#b45309" style="font-family: ui-monospace, monospace;">MTTF ∝ J⁻ⁿ·e^(Ea/kT)</text>
          <text x="624" y="170" text-anchor="middle" font-size="8.2" font-weight="700" fill="#0369a1">Coキャップで活性化</text>
          <text x="624" y="184" text-anchor="middle" font-size="8.2" font-weight="700" fill="#0369a1">エネルギーEa大幅増!</text>
          <text x="624" y="210" text-anchor="middle" font-size="8.2" font-weight="700" fill="#059669">2ビア並列で電流密度J</text>
          <text x="624" y="224" text-anchor="middle" font-size="8.2" font-weight="700" fill="#059669">を半減 → 寿命100×!</text>

          ${nanoPin(368, 119, 96, 304, 1, '選択コバルト(Co)界面蓋', 'Cu/絶縁膜界面の原子すべり移動を封鎖', '#0284c7', 'start')}
          ${nanoPin(498, 209, 366, 304, 2, 'Cuリザーバ＆冗長ダブルビア', '長年の高温撮影でも断線ゼロを保証', '#d97706', 'start')}
          ${kpiCard(554, 256, 140, 68, 'EM信頼性目標', '> 10年 @ 105°C', 'プロ用連続録画耐久', '#059669')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'Cu上面へ選択ALDコバルトキャップを被せ表面拡散を封鎖', line2: '高電流ノードへ冗長ダブルビア＆Cuリザーバ端を配置' },
          { label: '撮影・画質への恩恵', line1: '真夏の4K60p/8K長時間連続録画を何年続けても劣化ゼロ', line2: 'プロ現場で求められる10年超のSoC高信頼性を担保' },
          { label: '実機・2026学会諸元', line1: 'Black則活性化エネルギーEa向上 → EM寿命100倍超', line2: '2nm/A16 BEOL大電流電源＆クロック幹線の必須設計' },
        ],
      });

    // X2-12. 2nm / A16 4-Stack Horizontal Silicon GAA Nanosheets
    case 'xv2_gaa_si_nanosheets':
      return renderBionzV2Hd({
        badge: 'X2-12',
        zone: 'feol',
        nodeTag: 'TSMC N2 / A16 · GAA',
        title: '2nm / A16世代「4段水平積層シリコン・ナノシート（GAAチャネル）」',
        analogy: '厚さわずか原子25個分の極薄シリコン橋を4階建てに積み、360°全周から電子を自在制御',
        metric: 'シート厚 ~5 nm / 4段並列',
        scaleLabel: 'SHEET THICKNESS: ~5 nm (4-STACK)',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        art: (p) => `
          <!-- Left: FinFET (3-Side) vs Right: GAA Nanosheet (4-Side 360deg) -->
          ${cmpBanner(72, 82, 168, '旧3nm FinFET（3面制御）', false)}
          <rect x="116" y="132" width="80" height="106" rx="4" fill="url(#${p}_gold)" stroke="#a16207"/>
          <rect x="138" y="156" width="36" height="82" rx="3" fill="url(#${p}_cyan)" stroke="#0369a1"/>
          <rect x="92" y="238" width="128" height="22" rx="3" fill="url(#${p}_si)"/>
          <text x="156" y="232" text-anchor="middle" font-size="8.0" font-weight="900" fill="#dc2626">↑ 底面から漏れ電流!</text>
          <text x="156" y="276" text-anchor="middle" font-size="8.6" font-weight="700" fill="#991b1b">3面しか挟めずリーク限界</text>

          <!-- Right: True 4-Stack GAA Nanosheet Cross-Section -->
          ${cmpBanner(260, 82, 266, '2nm/A16 GAAナノシート（360°全周×4段）', true)}
          <!-- HKMG Full Surround Matrix -->
          <rect x="286" y="114" width="214" height="148" rx="8" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.5"/>
          <text x="393" y="129" text-anchor="middle" font-size="8.6" font-weight="900" fill="#713f12">360°全周包み込み HKMG ゲート</text>
          <!-- 4 Horizontal Suspended Silicon Nanosheets with HfO2 halo -->
          ${[140, 170, 200, 230].map((y, i) => `
            <rect x="304" y="${y - 3}" width="178" height="22" rx="4" fill="url(#${p}_hfo2)"/>
            <rect x="309" y="${y}" width="168" height="16" rx="3" fill="url(#${p}_cyan)" stroke="#e0f2fe" stroke-width="0.9"/>
            <text x="393" y="${y + 11.5}" text-anchor="middle" font-size="8.8" font-weight="900" fill="#ffffff">Si ナノシート #${4 - i}（厚さ ~5 nm · 弾道電子流）</text>
          `).join('')}
          <rect x="274" y="264" width="238" height="20" rx="3" fill="url(#${p}_si)"/>
          <text x="393" y="277" text-anchor="middle" font-size="8.2" font-weight="800" fill="#94a3b8">底面誘電体絶縁（BDI）＋ シリコン基板</text>

          <!-- Right Dimension & Performance Panel -->
          ${dimArrow(512, 140, 512, 156, '5 nm', '#0284c7')}
          <rect x="546" y="96" width="146" height="162" rx="9" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="619" y="116" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0f172a">2nm GAA の飛躍</text>
          <text x="558" y="140" font-size="8.6" font-weight="800" fill="#0284c7">・有効チャネル幅 W_eff</text>
          <text x="564" y="154" font-size="8.4" font-weight="700" fill="#334155">2×4×(W + T) 連続可変</text>
          <text x="558" y="178" font-size="8.6" font-weight="800" fill="#059669">・同一速度で電力削減</text>
          <text x="564" y="193" font-size="10.2" font-weight="900" fill="#059669">−25 〜 −30%</text>
          <text x="558" y="218" font-size="8.6" font-weight="800" fill="#d97706">・同一電力で高速化</text>
          <text x="564" y="233" font-size="10.2" font-weight="900" fill="#d97706">+10 〜 +15%</text>
          <text x="619" y="251" text-anchor="middle" font-size="7.8" fill="#64748b">(vs 3nm FinFET)</text>

          ${nanoPin(312, 208, 90, 312, 1, '4面完全静電制御', 'DIBL・短チャネルリークを根絶', '#0284c7', 'start')}
          ${nanoPin(472, 178, 368, 312, 2, 'Si/SiGe超格子→選択エッチ解放', '4枚同時浮遊チャネル形成', '#7c3aed', 'start')}
          ${scaleBar(560, 294, 80, '5 nm Thick')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'Si/SiGe交互エピタキシャルからSiGeを除去し4層解放', line2: '各シート厚さ約5nmの全4面をゲートで完全包囲' },
          { label: '撮影・画質への恩恵', line1: 'BIONZ XR2の消費電力を約30%削減し電池枚数大幅増', line2: '低電圧でも高駆動電流で30fps連写＆AI推論を爆速化' },
          { label: '実機・2026学会諸元', line1: 'TSMC N2（2025 Q4量産）/ Intel 18A / Samsung SF2', line2: '速度+15% または 電力−30%・チップ密度 1.15×超' },
        ],
      });

    // X2-13. 360-Degree High-k (HfO2 1.5nm) & Work-Function Metal Gate (HKMG)
    case 'xv2_hkmg_all_around':
      return renderBionzV2Hd({
        badge: 'X2-13',
        zone: 'feol',
        nodeTag: '2nm FEOL · ALD HKMG',
        title: '360°全周包み込み「High-k ハフニウム酸化膜（HfO₂）＆ TiN/TiAl 仕事関数メタル」',
        analogy: '厚さ1.5nmの原子層バリアで量子トンネル漏れを塞ぎ、金属の配合でスイッチ感度を決める',
        metric: 'EOT < 0.8 nm / 漏れ 1/1000',
        scaleLabel: 'HfO₂: 1.5 nm (ALD CONFORMAL)',
        accent: '#f59e0b',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Concentric 360-degree Atomic-Layer Gate Cross-Section around 1 Nanosheet -->
          <rect x="86" y="88" width="356" height="196" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.4"/>
          <text x="264" y="106" text-anchor="middle" font-size="9.6" font-weight="800" fill="#fde047">ナノシート1本を包む360°同心多層ゲート（ALD原子層堆積）</text>

          <!-- Outer W / Al Low-Resistance Gate Fill -->
          <rect x="112" y="118" width="304" height="148" rx="14" fill="url(#${p}_ru)"/>
          <text x="264" y="133" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f172a">低抵抗ゲート充填金属（W / TiAl）</text>
          <!-- Work-Function Metal (TiN / TiAlC WFM) -->
          <rect x="134" y="140" width="260" height="106" rx="12" fill="url(#${p}_gold)" stroke="#a16207"/>
          <text x="264" y="154" text-anchor="middle" font-size="8.4" font-weight="900" fill="#713f12">仕事関数メタル WFM（TiN / TiAlC）</text>
          <!-- High-k HfO2 (1.5nm, k≈25) -->
          <rect x="158" y="160" width="212" height="66" rx="10" fill="url(#${p}_hfo2)" stroke="#e9d5ff"/>
          <text x="264" y="173" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">High-k HfO₂ (1.5nm · k≈25)</text>
          <!-- 0.5nm Interfacial Oxide IL -->
          <rect x="176" y="178" width="176" height="32" rx="7" fill="#67e8f9"/>
          <!-- Inner Si Nanosheet Core -->
          <rect x="184" y="183" width="160" height="22" rx="5" fill="url(#${p}_cyan)" stroke="#ffffff" stroke-width="0.9"/>
          <text x="264" y="198" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">Si ナノシート（電子チャネル）</text>

          <!-- Right Panel: Quantum Tunneling Barrier Diagram -->
          <rect x="462" y="88" width="230" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="577" y="108" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f172a">なぜ HfO₂ (k≈25) なのか？</text>
          <text x="476" y="130" font-size="8.4" font-weight="700" fill="#dc2626">× SiO₂ (k=3.9): 薄すぎて電子貫通!</text>
          <rect x="526" y="138" width="16" height="44" fill="#cbd5e1" stroke="#dc2626"/>
          <path d="M 480 160 Q 505 144 526 160 Q 548 176 592 160" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#${p}_arr_red)"/>
          <text x="630" y="164" font-size="8.2" font-weight="800" fill="#dc2626">量子トンネル漏れ</text>

          <text x="476" y="204" font-size="8.4" font-weight="800" fill="#7c3aed">○ HfO₂ (k≈25): 物理的に厚く高静電!</text>
          <rect x="526" y="212" width="44" height="44" fill="url(#${p}_hfo2)"/>
          <path d="M 480 234 Q 504 218 524 234" fill="none" stroke="#059669" stroke-width="2.4"/>
          <line x1="526" y1="224" x2="526" y2="244" stroke="#ef4444" stroke-width="3"/>
          <text x="630" y="238" text-anchor="middle" font-size="8.6" font-weight="900" fill="#059669">漏れ電流 1/1000!</text>

          ${nanoPin(180, 172, 92, 314, 1, 'ALD原子層堆積（1原子ずつ）', 'シート間わずか8nmの隙間へ均一成膜', '#7c3aed', 'start')}
          ${nanoPin(380, 152, 368, 314, 2, 'WFM仕事関数エンジニアリング', 'nMOS/pMOSの最適Vthを精密設定', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'ALD原子層堆積で0.5nm IL＋1.5nm HfO₂＋WFMを360°成膜', line2: '狭いナノシート間（~8nm）へボイドゼロで金属充填' },
          { label: '撮影・画質への恩恵', line1: 'ゲート漏れ電流を1/1000以下へ封じ待機消費電力を極小化', line2: '急峻なオン／オフ特性で低電圧・高クロック動作を実現' },
          { label: '実機・2026学会諸元', line1: 'HfO₂比誘電率 k≈25 / 等価酸化膜厚 EOT < 0.8 nm', line2: '全2nm GAA（N2 / 18A / SF2）共通の中核ゲート構造' },
        ],
      });

    // X2-14. Atomic-Monolayer La/Al Interface Dipole Multi-Vth Tuning
    case 'xv2_hk_dipole_vth':
      return renderBionzV2Hd({
        badge: 'X2-14',
        zone: 'feol',
        nodeTag: 'ATOMIC DIPOLE · MULTI-Vth',
        title: '原子1層「ランタン（La）／アルミニウム（Al）界面ダイポール膜（マルチVth）」',
        analogy: 'わずか原子1〜2層の極薄シートを挟むだけで、同じ金属ゲートのままスイッチの軽さを自在調整',
        metric: 'ΔVth ±150 mV / 膜厚 0.3 nm',
        scaleLabel: 'DIPOLE LAYER: ~0.3 nm (1 MONOLAYER)',
        accent: '#9333ea',
        accentSoft: '#faf5ff',
        art: (p) => `
          <!-- Left: Atomic Dipole Layer Cross-Section -->
          <rect x="74" y="90" width="318" height="190" rx="10" fill="#ffffff" stroke="#d8b4fe" stroke-width="1.3"/>
          <text x="233" y="109" text-anchor="middle" font-size="9.8" font-weight="800" fill="#581c87">HfO₂ / SiO₂ 界面の原子1層ダイポール電界</text>

          <rect x="94" y="122" width="278" height="32" rx="4" fill="url(#${p}_gold)"/>
          <text x="233" y="142" text-anchor="middle" font-size="9.2" font-weight="900" fill="#713f12">共通 WFM メタル（厚い多層WFM不要！）</text>

          <rect x="94" y="154" width="278" height="30" fill="url(#${p}_hfo2)"/>
          <text x="233" y="173" text-anchor="middle" font-size="9.0" font-weight="800" fill="#ffffff">High-k HfO₂ 絶縁膜</text>

          <!-- Monolayer Dipole Row: Left La2O3 (nMOS Vth down) vs Right Al2O3 (pMOS Vth shift) -->
          <rect x="94" y="184" width="136" height="22" fill="#e0f2fe" stroke="#0284c7"/>
          <rect x="236" y="184" width="136" height="22" fill="#ffe4e6" stroke="#e11d48"/>
          ${[112, 138, 164, 190, 214].map((x) => `<circle cx="${x}" cy="195" r="5" fill="#0284c7"/><text x="${x}" y="198" text-anchor="middle" font-size="6.8" font-weight="900" fill="#fff">+</text>`).join('')}
          ${[254, 280, 306, 332, 356].map((x) => `<circle cx="${x}" cy="195" r="5" fill="#e11d48"/><text x="${x}" y="198" text-anchor="middle" font-size="7.6" font-weight="900" fill="#fff">−</text>`).join('')}
          <text x="162" y="218" text-anchor="middle" font-size="8.0" font-weight="900" fill="#0369a1">LaOₓ（nMOS Vth 低減）</text>
          <text x="304" y="218" text-anchor="middle" font-size="8.0" font-weight="900" fill="#be123c">AlOₓ（pMOS Vth 調整）</text>

          <rect x="94" y="226" width="278" height="38" rx="4" fill="url(#${p}_cyan)"/>
          <text x="233" y="249" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">Si ナノシート チャネル（幅5nm隙間でも省スペース）</text>

          <!-- Right: Multi-Vth Library Ladder -->
          <rect x="412" y="90" width="280" height="190" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="552" y="110" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f172a">ダイポール熱拡散による6段マルチVth設計</text>
          ${[
            { y: 126, w: 230, t: 'uLVT（超高速AI/ISP臨界路）', v: '0.18 V', c: '#dc2626' },
            { y: 162, w: 192, t: 'LVT（高速演算コア）', v: '0.24 V', c: '#f59e0b' },
            { y: 198, w: 152, t: 'SVT（標準バランス論理）', v: '0.31 V', c: '#0284c7' },
            { y: 234, w: 112, t: 'HVT（超低リーク待機/SRAM）', v: '0.38 V', c: '#059669' },
          ].map((b) => `
            <rect x="428" y="${b.y}" width="${b.w}" height="24" rx="5" fill="${b.c}"/>
            <text x="436" y="${b.y + 15.5}" font-size="8.4" font-weight="800" fill="#ffffff">${b.t}</text>
            <text x="680" y="${b.y + 15.5}" text-anchor="end" font-size="9.0" font-weight="900" fill="${b.c}" style="font-family: ui-monospace, monospace;">${b.v}</text>
          `).join('')}

          ${nanoPin(162, 195, 92, 314, 1, '体積ゼロの原子1層（0.3nm）', 'シート間の極狭空間を詰まらせない', '#9333ea', 'start')}
          ${nanoPin(540, 138, 376, 314, 2, '同一チップ内で6種のVthを混載', '爆速と超省電力を適材適所で両立', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'La₂O₃/Al₂O₃原子1層を熱拡散し界面電気双極子を形成', line2: '厚い金属種切替なしで実効仕事関数を±150mV制御' },
          { label: '撮影・画質への恩恵', line1: '高速AF推論はuLVT、待機部HVTでバッテリー寿命最大化', line2: '極狭シート間（~8nm）のGAA量産性を成立させる鍵' },
          { label: '実機・2026学会諸元', line1: 'ダイポール膜厚 ~0.3 nm（1–2原子層）・ΔVth ±150mV', line2: '2nm N2 / A14 VT-Flex マルチVthライブラリ基盤' },
        ],
      });

    // X2-15. GAA Crescent-Shaped SiN/SiBCN Inner Spacer
    case 'xv2_sige_inner_spacer':
      return renderBionzV2Hd({
        badge: 'X2-15',
        zone: 'feol',
        nodeTag: 'GAA EXCLUSIVE · INNER SPACER',
        title: 'GAA必須の極微細部品「三日月型 窒化ケイ素（SiN / SiBCN）インナースペーサー」',
        analogy: 'ナノシートのすき間へ三日月形の絶縁クサビを差し込み、ゲートと電極の短絡・寄生容量を絶つ',
        metric: '横掘り精度 ±0.5 nm / 低k SiBCN',
        scaleLabel: 'SPACER WIDTH: 5–6 nm',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        art: (p) => `
          <!-- Longitudinal Cross-Section along Channel (Source - Gate - Drain) -->
          <rect x="74" y="88" width="430" height="196" rx="10" fill="#ffffff" stroke="#c7d2fe" stroke-width="1.3"/>
          <text x="289" y="106" text-anchor="middle" font-size="9.8" font-weight="800" fill="#312e81">GAAナノシート長手断面：三日月型インナースペーサーの精密配置</text>

          <!-- Source & Drain {111} Epitaxial Blocks -->
          <polygon points="94,142 152,142 166,192 152,248 94,248" fill="url(#${p}_emerald)" stroke="#065f46" stroke-width="1.3"/>
          <text x="126" y="198" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">Source Epi</text>
          <polygon points="484,142 426,142 412,192 426,248 484,248" fill="url(#${p}_emerald)" stroke="#065f46" stroke-width="1.3"/>
          <text x="452" y="198" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ffffff">Drain Epi</text>

          <!-- Central HKMG Metal Gate Stack -->
          <rect x="218" y="118" width="142" height="142" rx="4" fill="url(#${p}_gold)" stroke="#a16207"/>
          <text x="289" y="132" text-anchor="middle" font-size="8.4" font-weight="900" fill="#713f12">HKMG メタルゲート</text>

          <!-- 3 Horizontal Si Nanosheets running from Source to Drain -->
          ${[148, 184, 220].map((y) => `
            <rect x="158" y="${y}" width="262" height="14" rx="2" fill="url(#${p}_cyan)" stroke="#0369a1" stroke-width="0.9"/>
          `).join('')}

          <!-- Crescent-Shaped SiBCN Inner Spacers sitting BETWEEN nanosheets flanking the gate! -->
          ${[162, 198, 234].map((y) => `
            <path d="M 162 ${y} L 218 ${y} Q 204 ${y + 11} 218 ${y + 22} L 162 ${y + 22} Z" fill="url(#${p}_hfo2)" stroke="#4338ca" stroke-width="1.2"/>
            <path d="M 416 ${y} L 360 ${y} Q 374 ${y + 11} 360 ${y + 22} L 416 ${y + 22} Z" fill="url(#${p}_hfo2)" stroke="#4338ca" stroke-width="1.2"/>
          `).join('')}

          <!-- Right Panel: 3-Step Self-Aligned Fabrication Flow -->
          <rect x="520" y="88" width="174" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="607" y="108" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0f172a">形成3ステップ（世界最難関）</text>
          ${[
            { y: 124, n: 'STEP 1', t: 'SiGe 横方向リセス', s: '±0.5nm等方エッチング', c: '#e11d48' },
            { y: 174, n: 'STEP 2', t: '低k SiBCN 充填', s: 'ALDコンフォーマル成膜', c: '#4f46e5' },
            { y: 224, n: 'STEP 3', t: '三日月トリム成形', s: '寄生容量 C_gd −40%!', c: '#059669' },
          ].map((st) => `
            <rect x="532" y="${st.y}" width="150" height="40" rx="6" fill="#ffffff" stroke="${st.c}" stroke-width="1.1"/>
            <text x="540" y="${st.y + 14}" font-size="7.8" font-weight="900" fill="${st.c}" style="font-family: ui-monospace, monospace;">${st.n}</text>
            <text x="582" y="${st.y + 14}" font-size="8.6" font-weight="800" fill="#0f172a">${st.t}</text>
            <text x="540" y="${st.y + 30}" font-size="8.0" font-weight="600" fill="#475569">${st.s}</text>
          `).join('')}

          ${nanoPin(190, 208, 92, 314, 1, '三日月型 SiBCN クサビ絶縁', 'ゲートとS/Dの近接短絡＆寄生容量を遮断', '#4f46e5', 'start')}
          ${nanoPin(386, 208, 384, 314, 2, '実効ゲート長 L_g を精密定義', '三日月の深さがトランジスタ速度を決定', '#d97706', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'SiGe犠牲層の端を横5nm掘り低k SiBCNを三日月充填', line2: '金属ゲートとS/Dエピタキシャルの間の寄生容量を遮断' },
          { label: '撮影・画質への恩恵', line1: 'GAA最大の弱点であるフリンジ容量C_gdを約40%削減', line2: '高周波スイッチング速度向上とBIONZ動的電力低減' },
          { label: '実機・2026学会諸元', line1: '幅 5–6 nm・低誘電率 SiBCN / SiOCN（k≈4.0–4.8）', line2: 'FinFETには存在しない2nm GAA固有の最難関モジュール' },
        ],
      });

    default:
      return null;
  }
}
