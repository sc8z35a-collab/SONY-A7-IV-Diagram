import { PartExplanation } from '../../assemblies/types';
import {
  cmpBanner,
  dimArrow,
  kpiCard,
  nanoPin,
  renderBionzV2Hd,
} from './shared';

/**
 * Ultra-HD 720x500 Nanoscale Technical Schematics for BIONZ V2 Group F (X2-71 – X2-85):
 * ISSCC 2026 2.1 ppm/°C Super-PTAT BGR, 350mV 2nm SRAM NBL Assist + Anti-Fuse OTP,
 * IEEE 1838 3D-IC DFT + SLM Health Agents, ECTC 2026 200-450nm Cu/SiCN Hybrid Bonding,
 * EMIB-T / LSI-TSV Active Silicon Bridge, Embedded Deep-Trench Si Capacitor (eSTC) + Coaxial TGV,
 * 25-35μm Cu-Pillar Micro-Bump IMC + Nano-Silica CUF, Sintered-Ag sTIM + CVD Cu-Diamond Lid,
 * Open-Center Invar 3.5D Stiffener + Detachable Optical MT Ferrule Dock,
 * Sony α7 V BIONZ XR2 759-pt PDAF + 60Hz AI Skeletal Pose AF+, 16-Stop Dual-Gain HDR Fusion,
 * 4K 60p/120p 10-bit 4:2:2 XAVC HS / AV1 Codec, 33³ Tetrahedral 3D LUT + Lens/Breathing Warp,
 * 30fps 1.0s Pre-Capture Ring-Buffer DMA + CFexpress/Dual USB-C, and
 * Blackout-Free 240Hz Line-Sliced EVF Compositor + 48Gbps HDMI 2.1 FRL 16-bit RAW Output.
 */
export function renderBionzV2GroupF(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // X2-71. ISSCC 2026 2.1 ppm/°C Curvature-Compensated Super-PTAT BGR
    case 'xv2_curvature_comp_bgr_ref':
      return renderBionzV2Hd({
        badge: 'X2-71',
        zone: 'isp_mem',
        nodeTag: 'ISSCC 2026 · 2.1 ppm/°C',
        title: 'ISSCC 2026「2.1 ppm/°C 高次曲率補償バンドギャップ基準電源（Super-PTAT BGR）」',
        analogy: '真夏の砂漠(+125°C)でも極寒の雪山(−40°C)でも目盛りが0.06%しか狂わない超精密・温度無敵の電圧ものさし',
        metric: '2.1–3.7 ppm/°C (±0.06%)',
        scaleLabel: 'RANGE: −40°C to +125°C',
        accent: '#0d9488',
        accentSoft: '#f0fdfa',
        art: (p) => `
          <!-- Left: Temperature Compensation Curve Plot (-40°C to +125°C) -->
          <rect x="68" y="84" width="386" height="196" rx="10" fill="#ffffff" stroke="#5eead4" stroke-width="1.35"/>
          <text x="261" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#115e59">温度補償カーブ：CTAT ＋ PTAT ＋ 高次Super-PTAT（T·ln T）相殺</text>

          <!-- Axes -->
          <line x1="104" y1="238" x2="432" y2="238" stroke="#64748b" stroke-width="1.2"/>
          <line x1="104" y1="116" x2="104" y2="238" stroke="#64748b" stroke-width="1.2"/>
          <text x="104" y="252" text-anchor="middle" font-size="7.6" font-weight="700" fill="#475569">−40°C</text>
          <text x="268" y="252" text-anchor="middle" font-size="7.6" font-weight="700" fill="#475569">+40°C</text>
          <text x="424" y="252" text-anchor="middle" font-size="7.6" font-weight="700" fill="#475569">+125°C</text>

          <!-- Component Curves: CTAT (falling), PTAT (rising) -->
          <path d="M 110 134 L 424 222" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="122" y="128" font-size="7.6" font-weight="800" fill="#64748b">CTAT (V_BE 負勾配)</text>
          <path d="M 110 222 L 424 134" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="352" y="128" font-size="7.6" font-weight="800" fill="#64748b">PTAT (ΔV_BE 正勾配)</text>

          <!-- Conventional 1st-Order Bowed BGR Curve -->
          <path d="M 110 194 Q 268 158 424 196" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 2"/>
          <text x="268" y="206" text-anchor="middle" font-size="7.8" font-weight="800" fill="#dc2626">× 従来1次BGR（放物線曲がり ~20 ppm/°C）</text>

          <!-- ISSCC 2026 Super-PTAT Curvature-Compensated Flat Line! -->
          <path d="M 110 172 C 190 170 340 174 424 172" fill="none" stroke="#0d9488" stroke-width="3.2"/>
          <rect x="172" y="148" width="196" height="18" rx="9" fill="#0d9488"/>
          <text x="270" y="160.5" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">○ Super-PTAT 高次平坦化 (2.1 ppm/°C!)</text>

          <!-- Right Panel: 3x3 Common-Centroid PNP Array + KPIs -->
          <rect x="468" y="84" width="226" height="92" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="581" y="101" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">3×3 共通重心（Common-Centroid）PNP</text>
          ${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `
            <rect x="${531 + c * 34}" y="${108 + r * 20}" width="28" height="16" rx="3" fill="${r === 1 && c === 1 ? 'url(#' + p + '_gold)' : 'url(#' + p + '_cyan)'}" stroke="#0f172a" stroke-width="0.6"/>
            <text x="${545 + c * 34}" y="${119 + r * 20}" text-anchor="middle" font-size="7.0" font-weight="900" fill="${r === 1 && c === 1 ? '#0f172a' : '#fff'}">${r === 1 && c === 1 ? 'Q1' : 'Q2'}</text>
          `).join('')).join('')}
          ${kpiCard(468, 184, 110, 96, '温度係数 TC', '2.1 ppm/°C', 'ピンポンチョッパ搭載', '#0d9488')}
          ${kpiCard(584, 184, 110, 96, '3σ 電圧精度', '±0.06%', '2点工場トリミング', '#2563eb')}

          ${nanoPin(270, 172, 86, 314, 1, '高次 Super-PTAT 曲率相殺', 'V_BEの非線形T·ln(T)項を精密打ち消しし超平坦基準', '#0d9488', 'start')}
          ${nanoPin(581, 136, 368, 314, 2, '3×3 共通重心PNP＋チョッパ', '応力勾配とオフセット雑音を空間・時間で完全平均化', '#2563eb', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'CTAT＋PTATに非線形Super-PTAT項を加算し高次温度曲率を打ち消すBGR', line2: '3×3共通重心PNPアレイ＋ピンポンチョッパによりオフセットと応力勾配を除去' },
          { label: '撮影・画質への恩恵', line1: '極寒−40°Cから酷暑・連続録画時の高温ダイまで内部ADC・電源基準が狂わない', line2: '正確なダイ温度監視（サーマルスロットリング制御）と色・露出演算精度を保証' },
          { label: '実機・2026学会諸元', line1: 'ISSCC 2026 実証（温度係数 2.1–3.7 ppm/°C、3σ精度 ±0.06%）', line2: '2点トリミング・動作範囲 −40°C〜+125°C の超高精度オンチップ電圧標準' },
        ],
      });

    // X2-72. ISSCC 2026 Paper 15.2 350mV Single-Rail 2nm SRAM NBL Assist + Anti-Fuse OTP
    case 'xv2_350mv_sram_assist_otp':
      return renderBionzV2Hd({
        badge: 'X2-72',
        zone: 'isp_mem',
        nodeTag: 'ISSCC 2026 · Paper 15.2',
        title: 'ISSCC 2026「350mV 単一電源2nm SRAM書込アシスト（NBL）＆ アンチヒューズOTP冗長救済」',
        analogy: '超低電圧0.35Vでもビット線を一瞬だけマイナスへ引っ張り確実に書き込み、不良行は不可逆ヒューズで自動置換',
        metric: 'V_min 350mV · 21.04 Mb/mm²',
        scaleLabel: '2nm GAA · ACCESS 102 ps',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        art: (p) => `
          <!-- Left: Negative Bitline (NBL) Write-Assist Circuit & Waveform -->
          <rect x="68" y="84" width="322" height="196" rx="10" fill="#ffffff" stroke="#93c5fd" stroke-width="1.35"/>
          <text x="229" y="102" text-anchor="middle" font-size="9.2" font-weight="800" fill="#1e3a8a">350mV 単一電源 負ビット線（NBL）書込アシスト</text>

          <!-- 6T SRAM Core + Boost Cap -->
          <rect x="90" y="118" width="128" height="72" rx="7" fill="#eff6ff" stroke="#2563eb" stroke-width="1.2"/>
          <text x="154" y="138" text-anchor="middle" font-size="8.4" font-weight="900" fill="#1e3a8a">2nm GAA 6T セル</text>
          <text x="154" y="155" text-anchor="middle" font-size="7.8" font-weight="800" fill="#0369a1">VDD = 350 mV (極低)</text>
          <text x="154" y="172" text-anchor="middle" font-size="7.6" font-weight="800" fill="#059669">密度 21.04 Mb/mm²</text>

          <!-- Capacitive Coupling NBL Driver -->
          <rect x="242" y="118" width="132" height="72" rx="7" fill="#fffbeb" stroke="#d97706" stroke-width="1.25"/>
          <text x="308" y="136" text-anchor="middle" font-size="8.2" font-weight="900" fill="#92400e">NBL 容量結合ブースタ</text>
          <!-- NBL Pulse dipping below 0V! -->
          <line x1="256" y1="164" x2="360" y2="164" stroke="#94a3b8" stroke-width="0.9" stroke-dasharray="3 2"/>
          <text x="258" y="160" font-size="7.0" font-weight="700" fill="#64748b">0V</text>
          <path d="M 258 148 L 284 148 L 292 180 L 332 180 L 340 148 L 360 148" fill="none" stroke="#dc2626" stroke-width="2.2"/>
          <text x="312" y="176" text-anchor="middle" font-size="7.4" font-weight="900" fill="#dc2626">−ΔV_NBL!</text>

          <line x1="242" y1="154" x2="220" y2="154" stroke="#dc2626" stroke-width="2" marker-end="url(#${p}_arr_red)"/>

          <!-- Bottom Speed & Margin Strip -->
          <rect x="86" y="204" width="288" height="62" rx="7" fill="#f0fdf4" stroke="#10b981"/>
          <text x="230" y="224" text-anchor="middle" font-size="8.6" font-weight="900" fill="#065f46">V_gs = VDD − (−ΔV_NBL) で書込駆動力を大幅増強!</text>
          <text x="230" y="242" text-anchor="middle" font-size="8.0" font-weight="800" fill="#047857">読出アクセス時間：102 ps（超高速 ＆ 単一電源で実装簡単）</text>
          <text x="230" y="258" text-anchor="middle" font-size="7.4" font-weight="700" fill="#334155">デュアルレール電源不要でチップ配線面積も節約</text>

          <!-- Right Panel: Gate-Oxide Breakdown Anti-Fuse OTP Redundancy -->
          <rect x="404" y="84" width="290" height="196" rx="10" fill="#ffffff" stroke="#c4b5fd" stroke-width="1.35"/>
          <text x="549" y="102" text-anchor="middle" font-size="9.0" font-weight="800" fill="#5b21b6">アンチヒューズOTP 不揮発冗長救済＆鍵格納</text>

          <!-- SRAM Array with 1 Faulty Row -> Remapped to Spare Row via OTP -->
          <rect x="420" y="114" width="124" height="84" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          ${[122, 136, 150, 164, 178].map((y, idx) => `
            <rect x="428" y="${y}" width="108" height="10" rx="2" fill="${idx === 2 ? '#fee2e2' : idx === 4 ? '#dcfce7' : '#e0f2fe'}" stroke="${idx === 2 ? '#dc2626' : idx === 4 ? '#16a34a' : '#38bdf8'}"/>
            <text x="482" y="${y + 8}" text-anchor="middle" font-size="6.8" font-weight="800" fill="${idx === 2 ? '#b91c1c' : idx === 4 ? '#166534' : '#0369a1'}">${idx === 2 ? '× 欠陥行 (自動切離)' : idx === 4 ? '○ 予備冗長行へ置換!' : '正常SRAM行 #' + idx}</text>
          `).join('')}

          <!-- Anti-Fuse Breakdown Cell Illustration -->
          <rect x="556" y="114" width="124" height="84" rx="5" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.2"/>
          <text x="618" y="128" text-anchor="middle" font-size="7.6" font-weight="900" fill="#5b21b6">ゲート絶縁膜 破壊OTP</text>
          <rect x="576" y="138" width="84" height="14" fill="url(#${p}_gold)"/>
          <rect x="576" y="152" width="84" height="8" fill="url(#${p}_hfo2)"/>
          <!-- Breakdown conductive filament -->
          <rect x="614" y="152" width="8" height="10" fill="#dc2626"/>
          <rect x="576" y="160" width="84" height="14" fill="url(#${p}_si)"/>
          <text x="618" y="188" text-anchor="middle" font-size="7.2" font-weight="800" fill="#6d28d9">不可逆フィラメント導通</text>

          ${kpiCard(420, 206, 260, 62, 'OTP マルチ用途（工場出荷焼込）', '不良行救済 ＋ 暗号鍵 ＋ 個体校正', '高電圧1回書込で電源OFFも永久保持', '#7c3aed')}

          ${nanoPin(312, 178, 86, 314, 1, 'NBL 負ビット線アシスト', '350mV極低電圧でも確実書込し待機電力を極小化', '#dc2626', 'start')}
          ${nanoPin(618, 156, 368, 314, 2, 'ゲート酸化膜アンチヒューズOTP', '追加マスクゼロで冗長アドレスとカメラ固有鍵を永久記録', '#7c3aed', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '単一電源350mVで負ビット線（NBL）アシストを搭載した超高密度2nm SRAM', line2: 'ゲート酸化膜の不可逆絶縁破壊を使うアンチヒューズOTPで欠陥行置換＆鍵保存' },
          { label: '撮影・画質への恩恵', line1: '102psの高速アクセスと350mV極低電圧動作でAI/ISPキャッシュの電力と発熱を最小化', line2: 'カメラ個体ごとのレンズ校正・認証鍵・冗長救済情報をセキュアかつ永久保持' },
          { label: '実機・2026学会諸元', line1: 'ISSCC 2026 Paper 15.2（V_min 350mV・密度 21.04 Mb/mm²・読出 102 ps）', line2: '追加マスク不要の標準2nm GAA互換アンチヒューズOTP＋BIST自動修復回路' },
        ],
      });

    // X2-73. IEEE Std 1838 3D-IC DFT (PTAP/STAP/DWR/FPP) & SLM Telemetry
    case 'xv2_ieee1838_3dic_dft_slm':
      return renderBionzV2Hd({
        badge: 'X2-73',
        zone: 'pkg35d',
        nodeTag: 'IEEE Std 1838 · 3D-IC DFT',
        title: '3D積層チップ検査網「IEEE 1838 ダイラッパー（DWR）／FPP ＆ シリコン寿命監視（SLM）」',
        analogy: '何層にも積み重なった3Dチップの全フロアをエレベータ検査管で貫通し、出荷後も老化(寿命)を24時間健康診断',
        metric: 'IEEE 1838 ＋ SLM健康監視',
        scaleLabel: 'PTAP / STAP / FPP / UCIe REPAIR',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        art: (p) => `
          <!-- 3-Tier Stacked 3D-IC with IEEE 1838 Serial & Flexible Parallel Port (FPP) Elevator -->
          <rect x="68" y="84" width="424" height="196" rx="10" fill="#ffffff" stroke="#67e8f9" stroke-width="1.35"/>
          <text x="280" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#155e75">IEEE Std 1838 垂直3Dテスト階梯（PTAP / STAP / DWR / FPP）＋ SLM</text>

          <!-- 3 Stacked Dies -->
          ${[
            { y: 114, name: 'Die 2（上層：AI / HBM4スタック）', col: '#ede9fe', stroke: '#7c3aed', slm: 'SLM 温度/遅延モニタ' },
            { y: 164, name: 'Die 1（中層：BIONZ XR2 演算ダイ）', col: '#e0f2fe', stroke: '#0284c7', slm: 'UCIe 冗長レーン修復' },
            { y: 214, name: 'Die 0（下層：ベースインターポーザ）', col: '#ecfdf5', stroke: '#059669', slm: 'Primary TAP (PTAP)' },
          ].map((d) => `
            <rect x="86" y="${d.y}" width="388" height="38" rx="6" fill="${d.col}" stroke="${d.stroke}" stroke-width="1.25"/>
            <text x="150" y="${d.y + 16}" font-size="8.2" font-weight="900" fill="#0f172a">${d.name}</text>
            <rect x="150" y="${d.y + 21}" width="114" height="13" rx="3" fill="#ffffff" stroke="${d.stroke}" stroke-width="0.9"/>
            <text x="207" y="${d.y + 30.5}" text-anchor="middle" font-size="7.2" font-weight="800" fill="${d.stroke}">DWR (Die Wrapper Reg)</text>
            <rect x="334" y="${d.y + 10}" width="130" height="20" rx="4" fill="${d.stroke}"/>
            <text x="399" y="${d.y + 23}" text-anchor="middle" font-size="7.4" font-weight="800" fill="#ffffff">${d.slm}</text>
          `).join('')}

          <!-- Vertical IEEE 1838 Serial & FPP High-Speed Scan Elevators piercing all 3 dies! -->
          <rect x="98" y="108" width="16" height="156" rx="3" fill="url(#${p}_gold)" stroke="#a16207"/>
          <text x="106" y="186" text-anchor="middle" font-size="7.2" font-weight="900" fill="#0f172a" transform="rotate(-90 106 186)">Serial TAP</text>
          <rect x="120" y="108" width="22" height="156" rx="3" fill="url(#${p}_cyan)" stroke="#0369a1"/>
          <text x="131" y="186" text-anchor="middle" font-size="7.4" font-weight="900" fill="#ffffff" transform="rotate(-90 131 186)">FPP 並列高速網</text>

          <!-- Vertical Repair / Health bus -->
          <line x1="296" y1="252" x2="296" y2="116" stroke="#059669" stroke-width="2.4" stroke-dasharray="4 2" marker-end="url(#${p}_arr_green)"/>
          <text x="304" y="190" font-size="7.2" font-weight="900" fill="#047857" transform="rotate(-90 304 190)">SSN / SLM監視</text>

          <!-- Right KPI Panel -->
          ${kpiCard(506, 86, 188, 58, '並列スキャン帯域', 'FPP + SSN 網', '巨大3Dチップのテスト時間激減', '#0891b2')}
          ${kpiCard(506, 154, 188, 58, 'ハイブリッド接合診断', 'UCIe レーン修復', '断線バンプを予備レーンへ切替', '#2563eb')}
          ${kpiCard(506, 222, 188, 58, 'SLM 経年劣化予兆', 'BTI / HCI 実時間検知', '10年運用でも故障前に電圧補正', '#059669')}

          ${nanoPin(131, 146, 86, 314, 1, 'FPP 柔軟並列ポート', '積層した全ダイの内部をピン制約なく超高速並列テスト', '#0284c7', 'start')}
          ${nanoPin(399, 134, 368, 314, 2, 'SLM シリコン寿命モニタ', '実稼働中の遅延劣化・温度を監視し長期信頼性を維持', '#7c3aed', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'IEEE Std 1838準拠のPTAP/STAP/DWR/FPPテストエレベータで3D全層を貫通検査', line2: 'UCIeレーン自動修復とSLM（シリコン寿命監視）パス遅延エージェントをオンダイ統合' },
          { label: '撮影・画質への恩恵', line1: '超複雑な3.5D積層BIONZの不良混入を出荷前に100%摘出し歩留まりと信頼性を担保', line2: '経年劣化（BTI/EM）の予兆をカメラ実運用中に自動検知し長期安定動作を実現' },
          { label: '実機・2026学会諸元', line1: 'IEEE Std 1838-2019 ＋ ストリーミングスキャン網（SSN）＋ 予備レーン自動救済', line2: '3D-ICハイブリッド接合・チップレット時代の必須DFT＆ライフサイクル管理規格' },
        ],
      });

    // X2-74. ECTC 2026 200-450nm Cu/SiCN Hybrid Bonding & Bonding-Front Angle Void Elimination
    case 'xv2_sub500nm_sicn_hybrid_bond':
      return renderBionzV2Hd({
        badge: 'X2-74',
        zone: 'pkg35d',
        nodeTag: 'ECTC 2026 · 200–450nm HB',
        title: 'ECTC 2026 限界突破「200–450nmピッチ Cu/SiCN直接接合 ＆ 曲面波ボイド零化界面」',
        analogy: '鏡より滑らかな2枚のチップを中央1点から波紋のように押し広げ、空気の泡(ボイド)をゼロで銅同士を原子融合',
        metric: '200nm W2W / 歩留 98–99%',
        scaleLabel: 'OVERLAY < 40 nm · Cu/SiCN',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        art: (p) => `
          <!-- Left: Center-to-Edge Curved Bonding Wave (ASE ECTC 2026 Void 2.8% -> 99% Yield) -->
          <rect x="68" y="84" width="210" height="196" rx="10" fill="#fff7ed" stroke="#fdba74" stroke-width="1.35"/>
          <text x="173" y="102" text-anchor="middle" font-size="8.6" font-weight="800" fill="#9a3412">曲面ボンディング波・ボイド追出し</text>

          <!-- Top Wafer curving down at center pin -->
          <line x1="173" y1="112" x2="173" y2="146" stroke="#ea580c" stroke-width="2.4" marker-end="url(#${p}_arr_red)"/>
          <path d="M 88 134 Q 173 166 258 134 L 258 148 Q 173 180 88 148 Z" fill="url(#${p}_cyan)" stroke="#0369a1"/>
          <!-- Bottom Wafer flat -->
          <rect x="88" y="168" width="170" height="16" rx="2" fill="url(#${p}_si)"/>
          <!-- Outward air-expulsion arrows -->
          <line x1="158" y1="163" x2="96" y2="152" stroke="#059669" stroke-width="2" marker-end="url(#${p}_arr_green)"/>
          <line x1="188" y1="163" x2="250" y2="152" stroke="#059669" stroke-width="2" marker-end="url(#${p}_arr_green)"/>
          <text x="173" y="206" text-anchor="middle" font-size="8.2" font-weight="900" fill="#065f46">中央→外周 最適波面角制御!</text>
          ${cmpBanner(82, 218, 182, '平面接触: ボイド残留 2.8%', false)}
          ${cmpBanner(82, 246, 182, '波面角最適化: 無ボイド 99%', true)}

          <!-- Center: 200-450nm Pitch Sub-nm CMP Dishing Cu/SiCN Atomic Diffusion -->
          <rect x="290" y="84" width="218" height="196" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
          <text x="399" y="102" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">200–450nm Cu/SiCN 原子拡散界面</text>
          <!-- Top Die SiCN + Cu Pads -->
          <rect x="306" y="114" width="186" height="44" fill="#cbd5e1" stroke="#475569"/>
          <!-- Bottom Die SiCN + Cu Pads -->
          <rect x="306" y="158" width="186" height="44" fill="#e2e8f0" stroke="#475569"/>
          <!-- Plasma-activated SiCN Interface Line -->
          <line x1="306" y1="158" x2="492" y2="158" stroke="#7c3aed" stroke-width="2.2"/>
          <!-- 4 Sub-500nm Cu Direct Bond Columns (fused thermally!) -->
          ${[322, 366, 410, 454].map((x) => `
            <rect x="${x}" y="118" width="24" height="80" rx="2" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1"/>
            <line x1="${x + 2}" y1="158" x2="${x + 22}" y2="158" stroke="#fde047" stroke-width="1.4" stroke-dasharray="2 1"/>
          `).join('')}
          ${dimArrow(334, 214, 378, 214, '200–450nm', '#ea580c')}
          <text x="399" y="242" text-anchor="middle" font-size="8.0" font-weight="900" fill="#5b21b6">SiCNプラズマ共有結合（室温）</text>
          <text x="399" y="258" text-anchor="middle" font-size="7.8" font-weight="800" fill="#c2410c">＋ 低温アニールでCu熱膨張・直接融合</text>

          <!-- Right KPI Panel -->
          ${kpiCard(520, 86, 174, 58, 'W2W 世界最微細', '200 nm ピッチ', 'imec/EVG 精度 <40nm 3σ', '#ea580c')}
          ${kpiCard(520, 154, 174, 58, '量産実証 (450nm)', '歩留まり 98%+', 'AMAT/EVG 高速量産領域', '#059669')}
          ${kpiCard(520, 222, 174, 58, '接続密度 / 電力', '2,500万本/mm²', 'バンプレス極低インダクタンス', '#0284c7')}

          ${nanoPin(173, 166, 86, 314, 1, '中心開始ボイド零化波面', '接合波角度を制御し界面エアトラップを完全排除', '#ea580c', 'start')}
          ${nanoPin(422, 158, 368, 314, 2, 'Cu/SiCN サブnmディッシング界面', 'はんだ完全不要の原子間銅融合で超広帯域3D接続', '#7c3aed', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'プラズマ活性化SiCN絶縁体とサブnmディッシング微細Cuによる200–450nm直接接合', line2: '中央から外周へ波面角を制御して押し広げる接合波によりボイドを完全排除（99%）' },
          { label: '撮影・画質への恩恵', line1: 'BIONZ演算ダイ・AIエンジン・積層メモリ間を数千万本/mm²の超並列配線で直結', line2: 'はんだレス化により信号遅延と消費電力を1桁以上削減し超高速RAW処理を加速' },
          { label: '実機・2026学会諸元', line1: 'ECTC 2026 実証（200nm W2W <40nm精度 ／ 450nm 歩留98% ／ ASEボイド改善99%）', line2: '次世代3D積層センサー＆3.5D BIONZ XR2統合チップレットの心臓接合技術' },
        ],
      });

    // X2-75. EMIB-T / LSI-TSV Power-Through Active Silicon Bridge
    case 'xv2_emib_t_silicon_bridge_tsv':
      return renderBionzV2Hd({
        badge: 'X2-75',
        zone: 'pkg35d',
        nodeTag: 'EMIB-T / LSI-TSV · 3.5D',
        title: '次世代3.5D「貫通TSV内蔵・能動シリコンブリッジ（EMIB-T / LSI-TSV）」',
        analogy: '隣チップ同士を結ぶ高架の超高速データ橋の橋脚そのものに、真下から電力を送る極太パイプ(TSV)を内蔵',
        metric: 'RDL 0.8/0.8μm ⊥ TSV給電',
        scaleLabel: 'UCIe-S / HBM4 POWER-THROUGH',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        art: (p) => `
          <!-- Cross-Section: Two Chiplets (Compute + HBM4) bridged by EMIB-T with Vertical Power TSVs inside Substrate -->
          <rect x="68" y="84" width="446" height="196" rx="10" fill="#ffffff" stroke="#7dd3fc" stroke-width="1.35"/>
          <text x="291" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#0369a1">EMIB-T / LSI-TSV 断面：水平データ超高速RDL ⊥ 垂直TSV電力貫通</text>

          <!-- Top Two Chiplets -->
          <rect x="88" y="114" width="186" height="44" rx="6" fill="url(#${p}_blue)" stroke="#1e3a8a" stroke-width="1.2"/>
          <text x="181" y="133" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">BIONZ XR2 演算チップレット</text>
          <text x="181" y="148" text-anchor="middle" font-size="7.4" font-weight="700" fill="#dbeafe">2nm / A14 SoC Die</text>

          <rect x="308" y="114" width="186" height="44" rx="6" fill="url(#${p}_hfo2)" stroke="#4c1d95" stroke-width="1.2"/>
          <text x="401" y="133" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">HBM4 / AIアクセラレータ</text>
          <text x="401" y="148" text-anchor="middle" font-size="7.4" font-weight="700" fill="#ede9fe">2048-bit 超広帯域</text>

          <!-- Micro-Bumps -->
          ${Array.from({ length: 14 }, (_, i) => `<circle cx="${106 + i * 28}" cy="164" r="3.6" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="0.6"/>`).join('')}

          <!-- Organic / Glass Package Substrate with Embedded EMIB-T Silicon Bridge! -->
          <rect x="82" y="170" width="418" height="96" rx="6" fill="#e2e8f0" stroke="#64748b" stroke-width="1.15"/>
          <text x="134" y="254" text-anchor="middle" font-size="7.6" font-weight="800" fill="#475569">有機 / ガラスコア基板</text>
          <text x="448" y="254" text-anchor="middle" font-size="7.6" font-weight="800" fill="#475569">基板貫通ビア (TGV)</text>

          <!-- Embedded Silicon Bridge (EMIB-T) in center cavity -->
          <rect x="196" y="172" width="190" height="66" rx="5" fill="url(#${p}_si)" stroke="#0284c7" stroke-width="1.8"/>
          <!-- Fine Horizontal RDL Layers at top of bridge (0.8/0.8 μm) -->
          <line x1="210" y1="182" x2="372" y2="182" stroke="#38bdf8" stroke-width="2.4" marker-start="url(#${p}_arr_blue)" marker-end="url(#${p}_arr_blue)"/>
          <line x1="210" y1="191" x2="372" y2="191" stroke="#7dd3fc" stroke-width="2"/>
          <text x="291" y="205" text-anchor="middle" font-size="7.6" font-weight="900" fill="#bae6fd">微細RDL (L/S=0.8μm 水平UCIe-S)</text>

          <!-- VERTICAL Cu-TSVs piercing straight through EMIB-T Bridge for Power! -->
          ${[228, 268, 314, 354].map((x) => `
            <rect x="${x}" y="170" width="10" height="96" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="0.8"/>
            <line x1="${x + 5}" y1="262" x2="${x + 5}" y2="176" stroke="#fef08a" stroke-width="1.3" marker-end="url(#${p}_arr_gold)"/>
          `).join('')}
          <text x="291" y="232" text-anchor="middle" font-size="7.4" font-weight="900" fill="#fed7aa">貫通 Cu-TSV 垂直電力柱 (EMIB-T)</text>

          <!-- Right KPI Panel -->
          ${kpiCard(526, 86, 168, 58, '水平信号密度', '0.8 / 0.8 μm RDL', '高価な巨大インターポーザ不要', '#0284c7')}
          ${kpiCard(526, 154, 168, 58, '垂直給電革新', 'ブリッジ貫通 Cu-TSV', 'チップレット縁の電源遮蔽を解消', '#ea580c')}
          ${kpiCard(526, 222, 168, 58, 'コスト / 反り利点', '部分埋設ブリッジ', '大型ガラスコア基板と相性抜群', '#059669')}

          ${nanoPin(291, 186, 86, 314, 1, '水平微細RDL (0.8μmピッチ)', '演算ダイとHBM4/AI間を数千本の超高速信号で直結', '#0284c7', 'start')}
          ${nanoPin(319, 224, 368, 314, 2, '垂直貫通 Cu-TSV 電力列', '従来EMIBの弱点だったブリッジ直上の電力影を完全解消', '#ea580c', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '基板に埋設した局所シリコンブリッジに貫通Cu-TSVを統合したEMIB-T構造', line2: '水平0.8μm微細RDL信号配線と垂直TSV大電流給電を立体直交で同時実現' },
          { label: '撮影・画質への恩恵', line1: 'BIONZ演算コアとAI・HBM4チップレットを低遅延・低コスト・低反りで超高密度統合', line2: 'ブリッジ直上領域への給電インピーダンスを劇減し高負荷時の電圧安定性を確保' },
          { label: '実機・2026学会諸元', line1: 'EMIB-T / LSI-TSV（水平RDL L/S=0.8/0.8μm ＋ 垂直Cu-TSVパワー貫通）', line2: 'ガラスコア基板＆UCIe-S / HBM4 3.5Dパッケージングの最新主流アーキテクチャ' },
        ],
      });

    // X2-76. Embedded Deep-Trench Silicon Capacitor (eSTC) & Coaxial-Shielded TGV
    case 'xv2_embedded_stc_package_decap':
      return renderBionzV2Hd({
        badge: 'X2-76',
        zone: 'pkg35d',
        nodeTag: 'Glass Core · eSTC + Coax TGV',
        title: 'パッケージ直下内蔵「超高密度シリコン・トレンチコンデンサ（eSTC）＆ 同軸シールドTGV」',
        analogy: 'チップの真下の床下に極微細な蜂の巣タンク(eSTC)を埋め込み、同軸ケーブル型エレベータで電気の瞬発力を極限化',
        metric: '>1.5 μF/mm² · ESL < 10 pH',
        scaleLabel: 'DRIE TRENCH MIM · 5-VIA COAX TGV',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        art: (p) => `
          <!-- Left: Embedded eSTC inside Glass-Core Cavity directly below BIONZ Die -->
          <rect x="68" y="84" width="268" height="196" rx="10" fill="#ffffff" stroke="#6ee7b7" stroke-width="1.35"/>
          <text x="202" y="102" text-anchor="middle" font-size="8.8" font-weight="800" fill="#065f46">演算ダイ直下埋設：DRIE深溝 eSTC</text>

          <!-- BIONZ Compute Die on Top -->
          <rect x="92" y="112" width="220" height="24" rx="4" fill="url(#${p}_blue)"/>
          <text x="202" y="127.5" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">BIONZ XR2 演算ダイ（瞬時電流需要）</text>

          <!-- Glass Core Substrate Cavity housing eSTC -->
          <rect x="82" y="144" width="240" height="106" rx="6" fill="url(#${p}_glass)" stroke="#0284c7" stroke-width="1.2"/>
          <!-- Deep-Trench Si Capacitor (eSTC) with high-aspect DRIE pillars! -->
          <rect x="114" y="156" width="176" height="72" rx="4" fill="url(#${p}_si)" stroke="#059669" stroke-width="1.5"/>
          ${Array.from({ length: 12 }, (_, i) => `
            <rect x="${124 + i * 13}" y="162" width="6" height="58" rx="1.5" fill="url(#${p}_emerald)" stroke="#a7f3d0" stroke-width="0.6"/>
          `).join('')}
          <text x="202" y="242" text-anchor="middle" font-size="7.8" font-weight="900" fill="#0369a1">ガラスコア内キャビティ直下配置 (ESL &lt; 10pH!)</text>
          <!-- Ultra-short vertical current arrows -->
          <line x1="156" y1="156" x2="156" y2="138" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_green)"/>
          <line x1="248" y1="156" x2="248" y2="138" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_green)"/>
          <text x="202" y="268" text-anchor="middle" font-size="7.8" font-weight="800" fill="#065f46">高アスペクトDRIE深溝MIM：表面積 100× 拡大</text>

          <!-- Center/Right: 5-Via Coaxial-Shielded Through-Glass Via (TGV) Top View -->
          <rect x="348" y="84" width="186" height="196" rx="10" fill="#f0f9ff" stroke="#38bdf8" stroke-width="1.35"/>
          <text x="441" y="102" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">5ビア同軸シールド TGV</text>
          <!-- Center Signal TGV surrounded by 4 Ground Shield TGVs in Glass -->
          <circle cx="441" cy="174" r="56" fill="none" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="4 2"/>
          <!-- 4 Outer GND TGVs -->
          ${[
            [441, 130],
            [441, 218],
            [397, 174],
            [485, 174],
          ].map(([cx, cy]) => `
            <circle cx="${cx}" cy="${cy}" r="14" fill="url(#${p}_ru)" stroke="#334155" stroke-width="1.3"/>
            <text x="${cx}" y="${cy + 3}" text-anchor="middle" font-size="7.2" font-weight="900" fill="#0f172a">GND</text>
          `).join('')}
          <!-- Center High-Speed Signal TGV -->
          <circle cx="441" cy="174" r="16" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1.6"/>
          <text x="441" y="177" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">SIG</text>
          <text x="441" y="250" text-anchor="middle" font-size="7.8" font-weight="800" fill="#0369a1">擬似同軸50Ωインピーダンス整合</text>
          <text x="441" y="264" text-anchor="middle" font-size="7.4" font-weight="700" fill="#475569">224G PAM4 高周波損失を極小化</text>

          <!-- Far Right KPIs -->
          ${kpiCard(546, 86, 148, 58, 'eSTC 静電容量密度', '> 1.5 μF/mm²', 'MLCCより圧倒的低ESL', '#059669')}
          ${kpiCard(546, 154, 148, 58, '寄生インダクタンス', 'ESL < 10 pH', 'GHz帯インピーダンス平坦', '#0284c7')}
          ${kpiCard(546, 222, 148, 58, '同軸TGV クロストーク', '−40 dB 以下', 'ガラス低tanδ＋4重GND遮蔽', '#7c3aed')}

          ${nanoPin(202, 192, 86, 314, 1, 'DRIE 深溝シリコンキャパシタ', 'ダイ真下へ最短距離埋設しナノ秒の突入電流を即供給', '#059669', 'start')}
          ${nanoPin(441, 174, 368, 314, 2, '同軸シールド貫通ガラスビア', '4本のGNDビアで信号線を包囲し超高速通信波形を死守', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'ガラスコア直下キャビティにDRIE深溝MIMキャパシタ（eSTC, >1.5μF/mm²）を埋設', line2: '信号TGVを4本のGND TGVで囲む5ビア同軸シールド構造で高周波反射と漏話を抑制' },
          { label: '撮影・画質への恩恵', line1: '10pH未満の超低ESLで数GHz帯の瞬間電圧ドロップをゼロ遅延で緩衝吸収', line2: '超高速センサー入力・HBM4・光通信I/Oの信号品質（SI）と電源品質（PI）を両立' },
          { label: '実機・2026学会諸元', line1: '内蔵eSTC（>1.5 μF/mm²・ESL <10 pH）＋ ガラスコア同軸シールドTGV', line2: '従来の表面実装MLCCでは届かない数GHz領域を制圧する次世代3.5D PDN基盤' },
        ],
      });

    // X2-77. 25-35μm Cu-Pillar Micro-Bump (Cu/Ni/SnAg IMC) & Nano-Silica CUF
    case 'xv2_bga_micro_c4_imc_underfill':
      return renderBionzV2Hd({
        badge: 'X2-77',
        zone: 'pkg35d',
        nodeTag: '25–35μm μBump · IMC + CUF',
        title: 'パッケージ接合信頼性「無鉛Cuピラー・マイクロバンプ（IMC）＆ ナノシリカ・アンダーフィル」',
        analogy: '銅の柱とニッケルの防波堤で無鉛はんだを支え、隙間を70%シリカ入り特殊樹脂で固めて熱伸縮の破壊を防ぐ',
        metric: 'ピッチ 25–35 μm · 70wt% CUF',
        scaleLabel: 'Cu / Ni BARRIER / SnAg Cu₆Sn₅',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Magnified Micro-Bump Metallurgical Stack surrounded by Nano-Silica Capillary Underfill -->
          <rect x="68" y="84" width="414" height="196" rx="10" fill="#ffffff" stroke="#fcd34d" stroke-width="1.35"/>
          <text x="275" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#92400e">25–35μm マイクロバンプ金属間化合物（IMC）＆ ナノシリカCUF断面</text>

          <!-- Top Silicon Die -->
          <rect x="86" y="112" width="378" height="22" rx="3" fill="url(#${p}_si)"/>
          <text x="275" y="126.5" text-anchor="middle" font-size="8.0" font-weight="800" fill="#e2e8f0">上層チップレット Si（CTE ≈ 2.6 ppm/°C）</text>

          <!-- Capillary Underfill (CUF) Resin Matrix with 60-70wt% Nano-Silica Spheres! -->
          <rect x="86" y="134" width="378" height="106" fill="#fef3c7" fill-opacity="0.55"/>
          ${[
            [106, 154], [122, 178], [104, 206], [128, 224],
            [248, 152], [268, 174], [254, 198], [282, 222], [300, 158], [296, 192],
            [426, 154], [444, 182], [430, 216], [448, 226],
          ].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="5.5" fill="#ffffff" stroke="#b45309" stroke-width="0.9"/>`).join('')}

          <!-- 2 Detailed Cu-Pillar Micro-Bumps -->
          ${[184, 366].map((cx) => `
            <!-- UBM + Electrolytic Cu Pillar -->
            <rect x="${cx - 32}" y="134" width="64" height="36" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1.1"/>
            <text x="${cx}" y="156" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">電解Cuピラー</text>
            <!-- Ni Diffusion Barrier -->
            <rect x="${cx - 32}" y="170" width="64" height="10" fill="url(#${p}_ru)" stroke="#334155" stroke-width="0.8"/>
            <text x="${cx}" y="177.5" text-anchor="middle" font-size="6.8" font-weight="900" fill="#0f172a">Ni 拡散バリア</text>
            <!-- Scalloped Cu6Sn5 / (Cu,Ni)6Sn5 IMC + SnAg Solder Cap -->
            <path d="M ${cx - 34} 180 Q ${cx - 42} 206 ${cx - 30} 228 L ${cx + 30} 228 Q ${cx + 42} 206 ${cx + 34} 180 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
            <text x="${cx}" y="201" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0f172a">SnAg 無鉛はんだ</text>
            <path d="M ${cx - 30} 218 Q ${cx - 16} 211 ${cx} 218 Q ${cx + 16} 211 ${cx + 30} 218 L ${cx + 30} 228 L ${cx - 30} 228 Z" fill="#f59e0b" stroke="#92400e" stroke-width="0.8"/>
            <text x="${cx}" y="226" text-anchor="middle" font-size="6.6" font-weight="900" fill="#451a03">Cu₆Sn₅ IMC層</text>
            <!-- Substrate Cu Pad -->
            <rect x="${cx - 34}" y="228" width="68" height="12" fill="url(#${p}_cu)"/>
          `).join('')}

          <!-- Bottom Interposer / Substrate -->
          <rect x="86" y="240" width="378" height="24" rx="3" fill="#0f766e"/>
          <text x="275" y="255.5" text-anchor="middle" font-size="8.0" font-weight="800" fill="#ccfbf1">パッケージ基板（CTE ≈ 12–15 ppm/°C → CUFで応力分散!）</text>

          ${dimArrow(184, 272, 366, 272, 'ピッチ 25–35 μm', '#b45309')}

          <!-- Right KPI Panel -->
          ${kpiCard(496, 86, 198, 58, 'Ni 拡散バリア役割', 'カーケンダル空孔抑止', '過度のCu-Sn合金化・脆化を防ぐ', '#475569')}
          ${kpiCard(496, 154, 198, 58, 'ナノシリカ CUF樹脂', 'フィラー 60–70 wt%', '低CTE化で熱サイクル疲労10×長寿命', '#d97706')}
          ${kpiCard(496, 222, 198, 58, '耐落下・熱衝撃性能', 'プロ機−20〜+85°C', '毛細管充填でボイドゼロ密着', '#059669')}

          ${nanoPin(184, 175, 86, 314, 1, 'Cuピラー＋Ni拡散バリア＋IMC', 'エレクトロマイグレーションと脆性破断を冶金制御', '#b45309', 'start')}
          ${nanoPin(276, 194, 368, 314, 2, '高充填ナノシリカ CUF', 'Siと基板の熱膨張差せん断応力を全面へ均一分散', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '電解Cuピラー＋Ni拡散バリア＋無鉛SnAgはんだ（Cu₆Sn₅ IMC制御）による25–35μm接続', line2: '60–70wt%ナノシリカ球を含む低CTEキャピラリアンダーフィル（CUF）で隙間を毛細管充填' },
          { label: '撮影・画質への恩恵', line1: '4K60p録画の発熱と寒冷地電源OFFを繰り返す激しい熱衝撃でもはんだクラックを防止', line2: 'カメラ落下や激しい振動でもチップレット接合断線ゼロの堅牢なプロ機信頼性を維持' },
          { label: '実機・2026学会諸元', line1: '25–35μmピッチ Cuピラー/Ni/SnAgマイクロバンプ ＋ 60–70wt%ナノシリカCUF', line2: 'Niバリアによるカーケンダルボイド抑止と熱疲労寿命10倍以上向上を同時達成' },
        ],
      });

    // X2-78. Bottom Grand Crown: Sintered-Ag / Indium sTIM & CVD Cu-Diamond Heat Spreader Lid
    case 'xv2_stim_cu_diamond_thermal_lid':
      return renderBionzV2Hd({
        badge: 'X2-78',
        zone: 'bspdn_cool',
        nodeTag: 'BOTTOM GRAND CROWN · 600 W/m·K',
        title: '【底面グランド構造】銀焼結／インジウム金属sTIM ＆ CVD銅ダイヤモンド複合ヒートスプレッダ',
        analogy: 'グリスではなく純金属(銀・インジウム)で接着し、銅の1.5倍も熱を運ぶ人工ダイヤモンド複合金属蓋で瞬時拡散',
        metric: 'Cu-Diamond ~600 W/m·K',
        scaleLabel: 'sTIM: ~220 W/m·K · LOW-CTE LID',
        accent: '#dc2626',
        accentSoft: '#fef2f2',
        art: (p) => `
          <!-- Thermal Stack Cross-Section: BIONZ Die -> Sintered-Ag sTIM -> CVD Cu-Diamond Composite Lid -> Chassis -->
          <rect x="68" y="84" width="424" height="196" rx="10" fill="#ffffff" stroke="#fca5a5" stroke-width="1.35"/>
          <text x="280" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#991b1b">超低熱抵抗スタック：焼結ナノ銀 sTIM × CVD銅ダイヤモンド複合蓋</text>

          <!-- Top: Hot BIONZ XR2 Die -->
          <rect x="132" y="112" width="296" height="28" rx="4" fill="url(#${p}_heat)" stroke="#991b1b"/>
          <text x="280" y="129.5" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">BIONZ XR2 演算ダイ（局所ホットスポット熱流束）</text>

          <!-- Sintered Nano-Ag / Indium Metallic sTIM Layer (~220 W/mK!) -->
          <rect x="132" y="140" width="296" height="16" fill="url(#${p}_ru)" stroke="#475569" stroke-width="1.1"/>
          <text x="280" y="151" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0f172a">銀焼結ナノAg / In 金属 sTIM (~220 W/m·K ・熱抵抗極小!)</text>

          <!-- Grand Crown: CVD Cu-Diamond Composite Heat Spreader Lid (~600 W/mK) with Diamond Grains! -->
          <path d="M 86 156 L 474 156 L 474 228 L 434 228 L 434 206 L 126 206 L 126 228 L 86 228 Z" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1.4"/>
          <!-- Synthetic Diamond Particles embedded inside Cu matrix -->
          ${[
            [114, 178], [148, 184], [186, 174], [222, 188], [260, 176], [298, 186],
            [336, 174], [374, 188], [412, 178], [448, 184],
          ].map(([x, y]) => `<polygon points="${x},${y - 8} ${x + 8},${y} ${x},${y + 8} ${x - 8},${y}" fill="#e0f2fe" stroke="#0284c7" stroke-width="1"/>`).join('')}
          <text x="280" y="200" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">CVD 銅ダイヤモンド複合ヒートスプレッダ（Cu-Diamond ≈ 600 W/m·K）</text>

          <!-- Heat Spreading Fan-Out Arrows -->
          <line x1="220" y1="138" x2="148" y2="236" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>
          <line x1="280" y1="138" x2="280" y2="236" stroke="#dc2626" stroke-width="2.4" marker-end="url(#${p}_arr_red)"/>
          <line x1="340" y1="138" x2="412" y2="236" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>

          <!-- Magnesium Chassis / Graphite Sheet Sink -->
          <rect x="86" y="242" width="388" height="24" rx="4" fill="#1e293b"/>
          <text x="280" y="257.5" text-anchor="middle" font-size="8.0" font-weight="800" fill="#f8fafc">カメラ Σ型グラファイト放熱シート ＆ Mg合金ボディ筐体へ広域排熱</text>

          <!-- Right Panel: Thermal Conductivity Bar Comparison -->
          <rect x="506" y="84" width="188" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="600" y="102" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">熱伝導率比較 (W/m·K)</text>
          ${[
            { y: 118, name: '従来グリス TIM', val: '8', w: 12, col: '#94a3b8' },
            { y: 152, name: '銀焼結 sTIM', val: '220', w: 68, col: '#0284c7' },
            { y: 186, name: '純銅 IHS', val: '400', w: 110, col: '#ea580c' },
            { y: 220, name: 'Cu-Diamond', val: '600+', w: 158, col: '#dc2626' },
          ].map((b) => `
            <text x="518" y="${b.y}" font-size="7.8" font-weight="800" fill="#334155">${b.name}</text>
            <rect x="518" y="${b.y + 4}" width="${b.w}" height="14" rx="3" fill="${b.col}"/>
            <text x="${524 + b.w}" y="${b.y + 14}" font-size="7.8" font-weight="900" fill="${b.col}">${b.val}</text>
          `).join('')}
          <text x="600" y="264" text-anchor="middle" font-size="7.6" font-weight="800" fill="#059669">CTEもSiに近い ~7 ppm/°C!</text>

          ${nanoPin(210, 148, 86, 314, 1, '焼結ナノ銀 / In 金属sTIM', 'グリス比25倍超の熱伝導＆ポンプアウト劣化ゼロ', '#475569', 'start')}
          ${nanoPin(336, 174, 368, 314, 2, 'CVD 銅ダイヤモンド複合母材', '600W/m·K超の水平拡散と低CTEで反り・熱停止を同時克服', '#dc2626', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '焼結ナノ銀（~220 W/m·K）金属sTIMでダイとCVD銅ダイヤモンド蓋（~600 W/m·K）を直結', line2: '人工ダイヤモンド粒子の超高熱伝導と低CTE（~7ppm/°C）により水平拡散と低応力を両立' },
          { label: '撮影・画質への恩恵', line1: '4K60p/120p 10bit動画の長時間連続撮影で悩まされる「熱停止」限界を劇的に引き上げ', line2: '高負荷AI演算時の局所ホットスポット温度（T_j）を大幅低下させリーク電力も削減' },
          { label: '実機・2026学会諸元', line1: '金属sTIM（焼結Ag ~220 / In ~82 W/m·K）＋ CVD Cu-Diamond蓋（550–650 W/m·K）', line2: '底面グランド構造としてインバー固定スカートと一体でパッケージ反りも強力抑制' },
        ],
      });

    // X2-79. Top Grand Crown: 3.5D Low-CTE Invar Stiffener & Detachable Optical MT Ferrule Dock (ECTC 2026)
    case 'xv2_35d_stiffener_mt_ferrule_frame':
      return renderBionzV2Hd({
        badge: 'X2-79',
        zone: 'pkg35d',
        nodeTag: 'TOP GRAND CROWN · ECTC 2026',
        title: '【頂面グランド構造】3.5D 低CTEインバー反り抑制枠 ＆ 着脱式光MTフェルール結合ドック',
        analogy: '大型3.5D基板を反り15μm未満に保つ最強の金属額縁と、4隅へ光ファイバーをカチッと着脱できる精密光学ドック',
        metric: '平坦度 < 15 μm · 4隅MT光着脱',
        scaleLabel: 'INVAR STIFFENER + DFAU MT LATCH',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- Top-Down Isometric Blueprint of Open-Center Invar Stiffener + 4-Corner Optical MT Ferrule Docks -->
          <rect x="68" y="84" width="424" height="196" rx="10" fill="#ffffff" stroke="#c4b5fd" stroke-width="1.35"/>
          <text x="280" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#5b21b6">頂面グランド構造：中空開口インバースティフナー ＆ 4隅着脱式光MTドック</text>

          <!-- Outer Invar Open-Center Stiffener Frame -->
          <rect x="116" y="114" width="328" height="150" rx="10" fill="url(#${p}_ru)" stroke="#334155" stroke-width="1.8"/>
          <!-- Open Center Window exposing BIONZ XR2 + HBM4 + CPO Dies -->
          <rect x="150" y="138" width="260" height="102" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="1.2"/>
          <rect x="196" y="152" width="108" height="74" rx="4" fill="url(#${p}_blue)" stroke="#7dd3fc"/>
          <text x="250" y="185" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">BIONZ XR2</text>
          <text x="250" y="199" text-anchor="middle" font-size="7.2" font-weight="700" fill="#bae6fd">3.5D Compute</text>
          <rect x="312" y="152" width="44" height="74" rx="3" fill="url(#${p}_hfo2)"/>
          <text x="334" y="192" text-anchor="middle" font-size="7.2" font-weight="900" fill="#fff">HBM4</text>
          <rect x="362" y="152" width="38" height="74" rx="3" fill="url(#${p}_emerald)"/>
          <text x="381" y="192" text-anchor="middle" font-size="7.0" font-weight="900" fill="#fff">CPO</text>

          <!-- BeCu EMI Spring Fingers along frame edge -->
          ${[184, 214, 244, 274, 304, 334, 364].map((x) => `
            <rect x="${x}" y="117" width="14" height="8" rx="1.5" fill="url(#${p}_gold)"/>
            <rect x="${x}" y="253" width="14" height="8" rx="1.5" fill="url(#${p}_gold)"/>
          `).join('')}

          <!-- 4-Corner Detachable Optical MT/MPO Ferrule Latch Docks (DFAU) + Optical Ribbons! -->
          ${[
            { x: 96, y: 120, side: 'L' },
            { x: 96, y: 224, side: 'L' },
            { x: 430, y: 120, side: 'R' },
            { x: 430, y: 224, side: 'R' },
          ].map((d) => `
            <rect x="${d.x}" y="${d.y}" width="34" height="32" rx="4" fill="url(#${p}_laser)" stroke="#831843" stroke-width="1.2"/>
            <!-- Precision Guide Dowel Pins -->
            <circle cx="${d.x + 17}" cy="${d.y + 8}" r="2.6" fill="#fde047"/>
            <circle cx="${d.x + 17}" cy="${d.y + 24}" r="2.6" fill="#fde047"/>
            <!-- Fiber Ribbon entering/leaving -->
            <line x1="${d.side === 'L' ? 74 : 464}" y1="${d.y + 16}" x2="${d.side === 'L' ? d.x : 486}" y2="${d.y + 16}" stroke="#ec4899" stroke-width="3.2"/>
          `).join('')}

          <!-- Right KPI Panel -->
          ${kpiCard(506, 86, 188, 58, '大型3.5D 反り抑制', '平坦度 < 15 μm', '低CTEインバー額縁剛性', '#475569')}
          ${kpiCard(506, 154, 188, 58, '着脱式光結合 (DFAU)', '4隅 MTフェルール', 'リフロー後に光ファイバー装着', '#db2777')}
          ${kpiCard(506, 222, 188, 58, 'EMI 遮蔽スプリング', 'BeCu 接地フィンガー', '2.4/5/6GHz Wi-Fiノイズ封鎖', '#d97706')}

          ${nanoPin(140, 126, 86, 314, 1, '中空インバー反り抑制枠', '熱膨張極小の金属フレームで3.5D基板の反りを15μm未満へ', '#334155', 'start')}
          ${nanoPin(447, 136, 368, 314, 2, '着脱式 MTフェルール光ドック', 'ダウエルピンμm位置決めでリフロー熱を回避し光保守も自在', '#db2777', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '低熱膨張インバー中空開口スティフナー枠で大型3.5D基板の反りを15μm未満に拘束', line2: '4隅に精密ガイドピン付き着脱式MT/MPO光フェルールドック（DFAU）とBeCu EMI接触子を統合' },
          { label: '撮影・画質への恩恵', line1: 'はんだリフロー高温工程の後に光ファイバーをワンタッチ着脱でき量産性と保守性を劇的向上', line2: 'BeCu接地バネが高速GHzクロック放射ノイズを封鎖しWi-Fi 6Eやマイク音声への干渉を防止' },
          { label: '実機・2026学会諸元', line1: 'ECTC 2026 最新動向（Detachable Fiber Attach Unit / 低CTEインバー枠・平坦度<15μm）', line2: '光電融合CPOチップレット時代の3.5Dパッケージ頂面を完成させる機械・光学グランド構造' },
        ],
      });

    // X2-80. Sony α7 V BIONZ XR2 759-pt PDAF & 60Hz AI Skeletal Pose/Eye AF+
    case 'xv2_pdaf_759_pose_af_engine':
      return renderBionzV2Hd({
        badge: 'X2-80',
        zone: 'isp_mem',
        nodeTag: 'α7 V · BIONZ XR2 AF+',
        title: 'BIONZ XR2「759点像面位相差AF相関演算器 ＆ 60回/秒 AI骨格・瞳3D姿勢推定」',
        analogy: '画面の94%を覆う759個の測距眼と、骨格から「振り返る前から瞳の位置を予測する」毎秒60回の超人AI脳が直結',
        metric: '759点PDAF · 60回/秒 AF',
        scaleLabel: 'COVERAGE: 94% · REAL-TIME AF+',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        art: () => `
          <!-- Viewfinder 759-Point PDAF Grid + 3D Skeletal Pose & Eye Lock-On Visualization -->
          <rect x="68" y="84" width="388" height="196" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="1.4"/>
          <text x="262" y="101" text-anchor="middle" font-size="9.2" font-weight="800" fill="#bae6fd">撮像領域 94% カバー：759点像面位相差（PDAF）× 3D骨格姿勢推定マップ</text>

          <!-- 94% AF Frame Area with 759-pt Micro Grid -->
          <rect x="88" y="110" width="348" height="156" rx="4" fill="#1e293b" stroke="#0284c7" stroke-width="1.1" stroke-dasharray="4 2"/>
          ${Array.from({ length: 11 }, (_, c) => Array.from({ length: 5 }, (_, r) => `
            <rect x="${102 + c * 31}" y="${122 + r * 28}" width="10" height="8" rx="1" fill="#38bdf8" fill-opacity="0.22"/>
          `).join('')).join('')}

          <!-- AI 3D Skeletal Pose Wireframe (Runner / Portrait Subject) -->
          <g stroke="#34d399" stroke-width="2.4" stroke-linecap="round">
            <!-- Head -> Neck -> Shoulders -> Spine -> Hips -> Limbs -->
            <circle cx="242" cy="144" r="16" fill="#065f46" fill-opacity="0.35" stroke="#34d399" stroke-width="2"/>
            <line x1="242" y1="160" x2="242" y2="210"/>
            <line x1="210" y1="172" x2="274" y2="172"/>
            <line x1="210" y1="172" x2="188" y2="202"/>
            <line x1="274" y1="172" x2="300" y2="196"/>
            <line x1="242" y1="210" x2="218" y2="252"/>
            <line x1="242" y1="210" x2="268" y2="252"/>
          </g>
          <!-- Skeletal Keypoint Nodes -->
          ${[[242, 160], [210, 172], [274, 172], [242, 210], [188, 202], [300, 196]].map(([x, y]) => `
            <circle cx="${x}" cy="${y}" r="3.4" fill="#fde047" stroke="#0f172a" stroke-width="1"/>
          `).join('')}

          <!-- Real-Time Eye AF Lock-On Green Box! -->
          <rect x="234" y="136" width="18" height="16" rx="2" fill="none" stroke="#22c55e" stroke-width="2.2"/>
          <circle cx="243" cy="144" r="2.5" fill="#22c55e"/>
          <text x="262" y="138" font-size="8.0" font-weight="900" fill="#4ade80">EYE LOCK (60Hz)</text>

          <!-- Phase Correlation Curve Mini-Inset (L vs R pupil shift Δx) -->
          <rect x="322" y="196" width="104" height="62" rx="5" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
          <text x="374" y="208" text-anchor="middle" font-size="7.2" font-weight="800" fill="#7dd3fc">位相差相関 Δx</text>
          <path d="M 332 246 Q 354 214 374 246" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <path d="M 350 246 Q 372 214 392 246" fill="none" stroke="#f472b6" stroke-width="1.8"/>
          <line x1="354" y1="226" x2="372" y2="226" stroke="#fde047" stroke-width="1.6"/>
          <text x="374" y="255" text-anchor="middle" font-size="6.8" font-weight="800" fill="#fde047">デフォーカス量即算出</text>

          <!-- Right KPI Panel -->
          ${kpiCard(470, 86, 224, 58, '像面位相差測距点', '759点 (画面94%)', '低輝度EV-4.0でも高速合焦', '#0284c7')}
          ${kpiCard(470, 154, 224, 58, 'AF / AE 追従演算', '最大 60回 / 秒', '30fps連写中に倍速でピント補正', '#059669')}
          ${kpiCard(470, 222, 224, 58, 'AI認識対象 (内蔵NPU)', '人/動物/鳥/昆虫/車/飛行機', '後ろ姿でも骨格姿勢から頭部予測', '#7c3aed')}

          ${nanoPin(243, 144, 86, 314, 1, '骨格3D姿勢＋瞳認識 AF+', 'BIONZ XR2統合AI処理で従来機比+30%認識精度向上', '#059669', 'start')}
          ${nanoPin(374, 228, 368, 314, 2, '759点 ハードウェア相関DSP', '左右像ズレΔxを1パス演算しXDリニアモーターへ指令', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '759点像面位相差（画面94%）専用相関DSPとBIONZ XR2統合AI骨格推定核が直結', line2: '毎秒60回のAF/AE演算と3D姿勢推定により顔が見えない後ろ姿や鳥の瞳まで粘着追従' },
          { label: '撮影・画質への恩恵', line1: '秒間30コマの高速連写中も1コマ間に2回のピント再計算を行い歩留まりを劇的改善', line2: 'AIユニットとISPのオンダイ統合により認識遅延を最小化し突発的な動きにも対応' },
          { label: '実機・2026学会諸元', line1: 'Sony α7 V（BIONZ XR2）：759点像面位相差AF・最大60回/秒演算・認識精度+30%', line2: 'Real-time Recognition AF+（人物骨格・瞳・動物・鳥・昆虫・車・列車・飛行機）' },
        ],
      });

    // X2-81. Sony α7 V 16-Stop Dual-Gain HDR Fusion & Composite RAW MFNR
    case 'xv2_16stop_dual_gain_hdr_fusion':
      return renderBionzV2Hd({
        badge: 'X2-81',
        zone: 'isp_mem',
        nodeTag: 'α7 V · 16-Stop HDR Fusion',
        title: 'BIONZ XR2「16ストップ広DR デュアルゲイン合成 ＆ コンポジットRAWマルチフレームNR」',
        analogy: '暗部くっきり高ゲイン像と白飛び知らず低ゲイン像を16bit空間で継ぎ目なく融合し、さらに複数枚重ねでノイズを消去',
        metric: '16ストップ DR · 16-bit融合',
        scaleLabel: 'HCG + LCG BLEND · 1/√N MFNR',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        art: (p) => `
          <!-- Left: HCG + LCG Dual-Gain 16-Stop Tone Curve Blending Diagram -->
          <rect x="68" y="84" width="386" height="196" rx="10" fill="#ffffff" stroke="#fcd34d" stroke-width="1.35"/>
          <text x="261" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#92400e">16-bit リニア Dual-Gain（HCG / LCG）最適SNR合成パイプライン</text>

          <!-- Input Stream 1: HCG (Shadow Clear) -->
          <rect x="82" y="116" width="118" height="46" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2"/>
          <text x="141" y="135" text-anchor="middle" font-size="8.2" font-weight="900" fill="#38bdf8">HCG 高ゲイン信号</text>
          <text x="141" y="150" text-anchor="middle" font-size="7.2" font-weight="700" fill="#cbd5e1">暗部ノイズ極小・黒潰れゼロ</text>

          <!-- Input Stream 2: LCG (Highlight Rich) -->
          <rect x="82" y="172" width="118" height="46" rx="6" fill="#fff7ed" stroke="#ea580c" stroke-width="1.2"/>
          <text x="141" y="191" text-anchor="middle" font-size="8.2" font-weight="900" fill="#c2410c">LCG 低ゲイン信号</text>
          <text x="141" y="206" text-anchor="middle" font-size="7.2" font-weight="700" fill="#9a3412">強烈な太陽光も白飛びゼロ</text>

          <!-- 16-bit Linear Optimal-SNR Blender Core -->
          <rect x="224" y="128" width="100" height="78" rx="8" fill="url(#${p}_gold)" stroke="#a16207" stroke-width="1.4"/>
          <text x="274" y="154" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f172a">16-bit リニア</text>
          <text x="274" y="169" text-anchor="middle" font-size="8.4" font-weight="900" fill="#0f172a">SNR重み融合</text>
          <text x="274" y="186" text-anchor="middle" font-size="7.2" font-weight="800" fill="#78350f">α·HCG + (1−α)·LCG</text>

          <line x1="200" y1="139" x2="222" y2="154" stroke="#0284c7" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
          <line x1="200" y1="195" x2="222" y2="180" stroke="#ea580c" stroke-width="2" marker-end="url(#${p}_arr_red)"/>

          <!-- Output: 16-Stop Smooth Gradient Strip -->
          <rect x="344" y="124" width="98" height="86" rx="7" fill="url(#${p}_si)" stroke="#059669" stroke-width="1.4"/>
          <rect x="352" y="134" width="82" height="24" rx="3" fill="url(#${p}_heat)"/>
          <text x="393" y="150" text-anchor="middle" font-size="8.4" font-weight="900" fill="#ffffff">16 STOPS!</text>
          <text x="393" y="176" text-anchor="middle" font-size="7.6" font-weight="800" fill="#a7f3d0">階調段差ゼロ</text>
          <text x="393" y="191" text-anchor="middle" font-size="7.2" font-weight="700" fill="#e2e8f0">14bit/16bit RAW</text>
          <line x1="324" y1="167" x2="342" y2="167" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_green)"/>

          <!-- Bottom Bar: Sub-Pixel Motion-Compensated Composite RAW MFNR (4–32 frames) -->
          <rect x="82" y="228" width="360" height="40" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="1.2"/>
          <text x="262" y="244" text-anchor="middle" font-size="8.2" font-weight="900" fill="#065f46">コンポジットRAW MFNR（4〜32枚サブピクセル動き補償合成）</text>
          <text x="262" y="259" text-anchor="middle" font-size="7.6" font-weight="800" fill="#047857">ランダムショット雑音を 1/√N に低減（16枚で −12 dB = ISO 4段分改善!）</text>

          <!-- Right KPI Panel -->
          ${kpiCard(470, 86, 224, 58, '公称ダイナミックレンジ', '最大 16 ストップ', 'α7 V × BIONZ XR2 驚異の階調', '#d97706')}
          ${kpiCard(470, 154, 224, 58, 'デュアルゲイン融合', '16-bit リニア演算', '暗部〜ハイライト継ぎ目ゼロ', '#0284c7')}
          ${kpiCard(470, 222, 224, 58, 'マルチフレームNR', '4〜32枚 コンポジット', '手持ち夜景でもISO100級クリア', '#059669')}

          ${nanoPin(274, 168, 86, 314, 1, '最適SNR 16bit ブレンダー', 'HCG/LCGの切替境界をノイズ最小重みで滑らか合成', '#d97706', 'start')}
          ${nanoPin(262, 248, 368, 314, 2, 'サブピクセル動体補償 MFNR', '手ブレや揺れを画素未満で位置合わせしゴーストなしNR', '#059669', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '暗部用高ゲイン（HCG）と明部用低ゲイン（LCG）を16-bitリニア空間で最適SNR合成', line2: 'さらにサブピクセル動き補償付きコンポジットRAW NRで最大32枚を重ねノイズ1/√N低減' },
          { label: '撮影・画質への恩恵', line1: '逆光ポートレートや明暗差の激しい建築・風景でも白飛び黒潰れのない16ストップ階調', line2: '暗所高感度撮影でもディテールを潰さず驚異的な低ノイズRAWファイルを生成' },
          { label: '実機・2026学会諸元', line1: 'Sony α7 V 公式スペック：最大16ストップ・ダイナミックレンジ（メカ/デュアルゲイン）', line2: '16-bitリニアHDR融合パイプライン ＋ マルチフレームコンポジットRAW NR演算器' },
        ],
      });

    // X2-82. BIONZ XR2 4K 60p/120p 10-bit 4:2:2 XAVC HS (HEVC / AV1) Hardware Codec
    case 'xv2_xavc_hs_10bit_422_codec':
      return renderBionzV2Hd({
        badge: 'X2-82',
        zone: 'isp_mem',
        nodeTag: 'BIONZ XR2 · XAVC HS / AV1',
        title: 'BIONZ XR2 映像圧縮核「4K 60p/120p 10bit 4:2:2 XAVC HS（HEVC / AV1）エンコーダ」',
        analogy: '毎秒ギガバイト級の生4K映像を、動き予測と周波数圧縮の専用工場ラインで低発熱・超高画質のままリアルタイム凝縮',
        metric: '7K→4K 60p / S35 4K 120p',
        scaleLabel: '10-BIT 4:2:2 · HEVC / S-I / AV1',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        art: (p) => `
          <!-- Hardware Video Encoder Pipeline Diagram -->
          <rect x="68" y="84" width="626" height="196" rx="10" fill="#ffffff" stroke="#c4b5fd" stroke-width="1.35"/>
          <text x="381" y="102" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5b21b6">ハードウェア動画圧縮パイプライン：7K超解像4K60p ／ 4K120p 10-bit 4:2:2 リアルタイム符号化</text>

          <!-- Stage 1: 7K -> 4K Oversampling / CTU Quadtree Split -->
          <g transform="translate(82, 116)">
            <rect x="0" y="0" width="116" height="96" rx="7" fill="#eff6ff" stroke="#2563eb" stroke-width="1.2"/>
            <text x="58" y="16" text-anchor="middle" font-size="8.0" font-weight="900" fill="#1e3a8a">① CTU 適応分割</text>
            <!-- Quadtree block split visual -->
            <rect x="22" y="24" width="72" height="52" fill="#dbeafe" stroke="#2563eb" stroke-width="1.2"/>
            <line x1="58" y1="24" x2="58" y2="76" stroke="#2563eb" stroke-width="1"/>
            <line x1="22" y1="50" x2="94" y2="50" stroke="#2563eb" stroke-width="1"/>
            <line x1="76" y1="24" x2="76" y2="50" stroke="#0284c7" stroke-width="0.9"/>
            <line x1="58" y1="37" x2="94" y2="37" stroke="#0284c7" stroke-width="0.9"/>
            <text x="58" y="89" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0369a1">64×64→4×4 細分化</text>
          </g>

          <!-- Stage 2: Parallel Motion Estimation (ME/MC) -->
          <g transform="translate(212, 116)">
            <rect x="0" y="0" width="120" height="96" rx="7" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.3"/>
            <text x="60" y="16" text-anchor="middle" font-size="8.0" font-weight="900" fill="#5b21b6">② 並列動き推定</text>
            <rect x="16" y="28" width="38" height="36" rx="3" fill="#ddd6fe" stroke="#7c3aed"/>
            <rect x="64" y="34" width="38" height="36" rx="3" fill="#c4b5fd" stroke="#5b21b6"/>
            <line x1="36" y1="46" x2="80" y2="52" stroke="#dc2626" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>
            <text x="60" y="88" text-anchor="middle" font-size="7.2" font-weight="800" fill="#6d28d9">1/4画素ベクトル探索</text>
          </g>

          <!-- Stage 3: Systolic DCT/DST + Quantization + SAO -->
          <g transform="translate(346, 116)">
            <rect x="0" y="0" width="120" height="96" rx="7" fill="#ecfdf5" stroke="#059669" stroke-width="1.25"/>
            <text x="60" y="16" text-anchor="middle" font-size="8.0" font-weight="900" fill="#065f46">③ DCT変換＋量子化</text>
            <rect x="16" y="26" width="88" height="22" rx="4" fill="url(#${p}_emerald)"/>
            <text x="60" y="40" text-anchor="middle" font-size="7.6" font-weight="900" fill="#fff">シストリックDCT</text>
            <rect x="16" y="54" width="88" height="22" rx="4" fill="#d1fae5" stroke="#059669"/>
            <text x="60" y="68" text-anchor="middle" font-size="7.4" font-weight="800" fill="#065f46">デブロック＋SAO濾波</text>
            <text x="60" y="89" text-anchor="middle" font-size="7.2" font-weight="800" fill="#047857">10-bit 4:2:2 維持</text>
          </g>

          <!-- Stage 4: CABAC Entropy Coder -> Bitstream -->
          <g transform="translate(480, 116)">
            <rect x="0" y="0" width="198" height="96" rx="7" fill="#0f172a" stroke="#a855f7" stroke-width="1.4"/>
            <text x="99" y="17" text-anchor="middle" font-size="8.2" font-weight="900" fill="#e9d5ff">④ CABAC 算術エントロピー符号化</text>
            <rect x="14" y="26" width="170" height="22" rx="4" fill="#7c3aed"/>
            <text x="99" y="40" text-anchor="middle" font-size="7.8" font-weight="900" fill="#fff">XAVC HS (HEVC) / XAVC S-I</text>
            <rect x="14" y="54" width="170" height="20" rx="4" fill="#0284c7"/>
            <text x="99" y="67" text-anchor="middle" font-size="7.6" font-weight="900" fill="#fff">次世代 AV1 ハードウェア対応</text>
            <text x="99" y="88" text-anchor="middle" font-size="7.2" font-weight="800" fill="#fde047">生データ比 1/20〜1/50 超高効率圧縮!</text>
          </g>

          <!-- Stage Connecting Arrows -->
          <line x1="198" y1="164" x2="210" y2="164" stroke="#334155" stroke-width="2" marker-end="url(#${p}_arr_dark)"/>
          <line x1="332" y1="164" x2="344" y2="164" stroke="#334155" stroke-width="2" marker-end="url(#${p}_arr_dark)"/>
          <line x1="466" y1="164" x2="478" y2="164" stroke="#334155" stroke-width="2" marker-end="url(#${p}_arr_dark)"/>

          <!-- Bottom Performance Metrics Strip -->
          <rect x="82" y="224" width="596" height="44" rx="7" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="182" y="243" text-anchor="middle" font-size="8.4" font-weight="900" fill="#1e3a8a">FF 7K超解像 → 4K 60p</text>
          <text x="182" y="258" text-anchor="middle" font-size="7.4" font-weight="700" fill="#475569">モアレ極小＆先鋭シネマ解像</text>
          <line x1="286" y1="230" x2="286" y2="262" stroke="#cbd5e1"/>
          <text x="386" y="243" text-anchor="middle" font-size="8.4" font-weight="900" fill="#7c3aed">S35 4K 120p 10-bit 4:2:2</text>
          <text x="386" y="258" text-anchor="middle" font-size="7.4" font-weight="700" fill="#475569">5倍滑らかスローモーション収録</text>
          <line x1="486" y1="230" x2="486" y2="262" stroke="#cbd5e1"/>
          <text x="582" y="243" text-anchor="middle" font-size="8.4" font-weight="900" fill="#059669">専用ASIC 低消費電力</text>
          <text x="582" y="258" text-anchor="middle" font-size="7.4" font-weight="700" fill="#475569">CPU比1/100電力で熱停止抑止</text>

          ${nanoPin(272, 168, 86, 314, 1, '並列CTU 動き推定エンジン', 'フレーム間差分を専用ハードで超高速探索しビットレート圧縮', '#7c3aed', 'start')}
          ${nanoPin(579, 174, 368, 314, 2, '10-bit 4:2:2 XAVC HS / S-I / AV1', '10億色グレーディング耐性と極小容量を両立する放送・映画規格', '#0284c7', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '並列CTU動き推定・シストリックDCT/量子化・SAO・CABACを専用ハードウェア化', line2: '7Kオーバーサンプリング4K60pと4K120p 10bit 4:2:2を極低消費電力で実時間圧縮' },
          { label: '撮影・画質への恩恵', line1: '10bit（10億色）4:2:2色情報を残したまま高効率記録し、Logカラーグレーディングで破綻ゼロ', line2: 'CPU処理より圧倒的に低発熱な専用ASIC符号化により長回し4K動画収録を支える' },
          { label: '実機・2026学会諸元', line1: 'フルサイズ7K→4K 60p ／ Super 35 4K 120p（10-bit 4:2:2）リアルタイム対応', line2: 'XAVC HS（HEVC/H.265）・XAVC S-I（All-Intra）・次世代AV1ハードウェアエンコーダ' },
        ],
      });

    // X2-83. BIONZ XR2 33³ Tetrahedral 3D LUT & Single-Pass Geometry Warp Engine
    case 'xv2_3d_lut_breathing_warp_isp':
      return renderBionzV2Hd({
        badge: 'X2-83',
        zone: 'isp_mem',
        nodeTag: 'BIONZ XR2 · 33³ LUT + Warp',
        title: 'BIONZ XR2 光学・色彩核「33³四面体3D LUT ＆ 1パス収差・ブリージング補正ワープ回路」',
        analogy: 'レンズの歪み・色ズレ・ピント呼吸をゴム地図のように1回で矯正し、直後に3万5千点の立体色キューブで映画色へ変換',
        metric: '33³ (35,937点) ＆ 1パス補正',
        scaleLabel: 'TETRAHEDRAL 3D LUT · BICUBIC WARP',
        accent: '#db2777',
        accentSoft: '#fdf2f8',
        art: (p) => `
          <!-- Left: Single-Pass Bicubic Lens Distortion / LatCA / Breathing / Active-IS Geometry Warp -->
          <rect x="68" y="84" width="302" height="196" rx="10" fill="#ffffff" stroke="#f9a8d4" stroke-width="1.35"/>
          <text x="219" y="102" text-anchor="middle" font-size="9.0" font-weight="800" fill="#9d174d">① 1パス 2Dジオメトリワープ補正（歪曲/色収差/呼吸/手ブレ）</text>

          <!-- Distorted Barrel Grid (Before) -->
          <g transform="translate(84, 118)">
            <text x="48" y="10" text-anchor="middle" font-size="7.6" font-weight="800" fill="#b91c1c">歪曲＋呼吸＋揺れ</text>
            <path d="M 16 24 Q 48 16 80 24 Q 88 54 80 84 Q 48 92 16 84 Q 8 54 16 24 Z" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
            <path d="M 14 54 Q 48 50 82 54 M 48 20 Q 52 54 48 88" fill="none" stroke="#f87171" stroke-width="1"/>
            <!-- LatCA RGB fringe hint -->
            <path d="M 18 24 Q 48 17 78 24" fill="none" stroke="#2563eb" stroke-width="1.2" opacity="0.7"/>
          </g>

          <line x1="184" y1="172" x2="218" y2="172" stroke="#db2777" stroke-width="2.4" marker-end="url(#${p}_arr_pink)"/>
          <text x="201" y="164" text-anchor="middle" font-size="7.2" font-weight="900" fill="#9d174d">1パス</text>
          <text x="201" y="185" text-anchor="middle" font-size="7.2" font-weight="800" fill="#9d174d">Bicubic</text>

          <!-- Rectified Crisp Grid (After) -->
          <g transform="translate(226, 118)">
            <text x="64" y="10" text-anchor="middle" font-size="7.6" font-weight="800" fill="#065f46">完全直線・画角固定!</text>
            <rect x="20" y="22" width="88" height="66" rx="2" fill="#ecfdf5" stroke="#059669" stroke-width="1.8"/>
            <line x1="20" y1="55" x2="108" y2="55" stroke="#10b981" stroke-width="1"/>
            <line x1="64" y1="22" x2="64" y2="88" stroke="#10b981" stroke-width="1"/>
          </g>

          <rect x="84" y="224" width="270" height="44" rx="6" fill="#fdf2f8" stroke="#f472b6"/>
          <text x="219" y="241" text-anchor="middle" font-size="7.8" font-weight="900" fill="#9d174d">歪曲・R/G/B倍率色収差・ブリージング・Active IS統合</text>
          <text x="219" y="257" text-anchor="middle" font-size="7.4" font-weight="700" fill="#be185d">再サンプリング劣化を1回のみに抑え極上のシャープネス保持!</text>

          <!-- Right: 33x33x33 Tetrahedral 3D Color LUT Cube (35,937 Lattice Points) -->
          <rect x="382" y="84" width="312" height="196" rx="10" fill="#ffffff" stroke="#a5b4fc" stroke-width="1.35"/>
          <text x="538" y="102" text-anchor="middle" font-size="9.0" font-weight="800" fill="#3730a3">② 33³（35,937点）四面体補間 3D Color LUT</text>

          <!-- Isometric 3D RGB Color Cube -->
          <g transform="translate(412, 114)">
            <!-- Cube Faces -->
            <polygon points="56,12 118,36 56,60 -6,36" fill="#fef08a" fill-opacity="0.7" stroke="#4f46e5" stroke-width="1.3"/>
            <polygon points="-6,36 56,60 56,124 -6,100" fill="#60a5fa" fill-opacity="0.65" stroke="#4f46e5" stroke-width="1.3"/>
            <polygon points="56,60 118,36 118,100 56,124" fill="#f472b6" fill-opacity="0.68" stroke="#4f46e5" stroke-width="1.3"/>
            <!-- Highlighted Tetrahedral Interpolation Sub-Simplex inside Cube -->
            <polygon points="56,60 88,48 76,88 34,82" fill="#ffffff" fill-opacity="0.65" stroke="#dc2626" stroke-width="1.8"/>
            <circle cx="64" cy="70" r="3.5" fill="#dc2626"/>
            <text x="56" y="140" text-anchor="middle" font-size="7.8" font-weight="900" fill="#3730a3">R × G × B 33³ 立体格子</text>
          </g>

          <!-- Cinema Looks & User LUT Stack -->
          ${kpiCard(548, 114, 134, 48, 'シネマ色彩再現', 'S-Cinetone', 'VENICE譲りの人肌表現', '#db2777')}
          ${kpiCard(548, 168, 134, 48, '広階調Log収録', 'S-Log3 / .cube', 'ユーザーLUT実時間焼込', '#4f46e5')}
          ${kpiCard(548, 222, 134, 48, '四面体補間精度', '無彩色ズレ 0', '三線形より色相再現が精密', '#059669')}

          ${nanoPin(219, 172, 86, 314, 1, '1パス統合 光学メッシュワープ', '複数補正を座標変換合成し解像感劣化なくブリージング除去', '#db2777', 'start')}
          ${nanoPin(476, 184, 368, 314, 2, '33³ 四面体補間 3D LUT', '立方体を6個の四面体へ分割し人肌や空のグラデを滑らか変換', '#4f46e5', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: '歪曲・倍率色収差・フォーカスブリージング・Active IS手ブレを1パスで統合座標ワープ', line2: '直後に33×33×33（35,937点）四面体補間3D LUTでS-Cinetoneやユーザー.cube LUTを適用' },
          { label: '撮影・画質への恩恵', line1: '動画のピント送り時に画角が変わる不自然さを自動除去しシネマレンズ級の品位を実現', line2: '編集なし撮って出しでも映画機VENICE譲りの美しい人肌と深みある発色をゼロ遅延再現' },
          { label: '実機・2026学会諸元', line1: '33³（35,937点）四面体補間ハードウェア3D LUT ＋ 1パスBicubicジオメトリワープ', line2: 'S-Cinetone / S-Log3 / S-Gamut3.Cine / Creative Look / ユーザーLUT即時プレビュー＆記録' },
        ],
      });

    // X2-84. Sony α7 V 30fps 1.0s Pre-Capture Ring-Buffer DMA & CFexpress / Dual USB-C
    case 'xv2_precapture_ring_dma_cfe':
      return renderBionzV2Hd({
        badge: 'X2-84',
        zone: 'isp_mem',
        nodeTag: 'α7 V · Pre-Capture DMA',
        title: 'BIONZ XR2 高速記録核「30fps 1秒遡りプリ撮影リングDMA ＆ CFexpress / デュアルUSB-C」',
        analogy: 'シャッター半押し中ずっと30fps RAWを回転メリーゴーランドに蓄え、全押し瞬間に1秒過去まで遡って超高速書出し',
        metric: '30fps · 最大1.0秒遡り記録',
        scaleLabel: 'ZERO-COPY RING DMA · PCIe / USB-C×2',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        art: (p) => `
          <!-- Left: Circular 1.0s Pre-Capture Zero-Copy Ring Buffer (30 RAW Slots) -->
          <rect x="68" y="84" width="286" height="196" rx="10" fill="#ffffff" stroke="#6ee7b7" stroke-width="1.35"/>
          <text x="211" y="102" text-anchor="middle" font-size="9.0" font-weight="800" fill="#065f46">1.0秒遡り プリ撮影（Pre-Capture）円環リングバッファ</text>

          <!-- Circular Ring Slots (representing 30fps x 1.0s = 30 14-bit RAW frames) -->
          <circle cx="192" cy="184" r="64" fill="none" stroke="#e2e8f0" stroke-width="16"/>
          <path d="M 192 120 A 64 64 0 1 1 130 202" fill="none" stroke="#10b981" stroke-width="16" stroke-dasharray="9 3"/>
          <path d="M 130 202 A 64 64 0 0 1 192 120" fill="none" stroke="#f59e0b" stroke-width="16" stroke-dasharray="9 3"/>
          <!-- Center Shutter Trigger Indicator -->
          <circle cx="192" cy="184" r="42" fill="#0f172a" stroke="#059669" stroke-width="2"/>
          <text x="192" y="176" text-anchor="middle" font-size="9.0" font-weight="900" fill="#34d399">30 fps RAW</text>
          <text x="192" y="191" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fde047">最大 −1.0秒</text>
          <text x="192" y="204" text-anchor="middle" font-size="7.2" font-weight="700" fill="#cbd5e1">循環上書き保持</text>

          <!-- Trigger Callout -->
          <rect x="266" y="122" width="78" height="44" rx="6" fill="#fef3c7" stroke="#d97706"/>
          <text x="305" y="140" text-anchor="middle" font-size="7.8" font-weight="900" fill="#92400e">全押し瞬間!</text>
          <text x="305" y="155" text-anchor="middle" font-size="7.2" font-weight="800" fill="#b45309">過去30枚即凍結</text>
          <line x1="266" y1="144" x2="246" y2="152" stroke="#d97706" stroke-width="2" marker-end="url(#${p}_arr_gold)"/>

          <text x="211" y="268" text-anchor="middle" font-size="7.8" font-weight="800" fill="#047857">CPUコピー無しのゼロコピーDMAポインタ切替!</text>

          <!-- Right: Multi-Lane High-Speed Storage & External I/O DMA Hub -->
          <rect x="366" y="84" width="328" height="196" rx="10" fill="#f8fafc" stroke="#93c5fd" stroke-width="1.35"/>
          <text x="530" y="102" text-anchor="middle" font-size="9.0" font-weight="800" fill="#1e3a8a">超高速 並列ゼロコピー DMA コントローラ群</text>

          <!-- Central DMA Switch -->
          <rect x="380" y="138" width="76" height="92" rx="7" fill="url(#${p}_blue)" stroke="#1e3a8a"/>
          <text x="418" y="176" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">Ring</text>
          <text x="418" y="191" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">DMA</text>
          <text x="418" y="206" text-anchor="middle" font-size="7.2" font-weight="700" fill="#dbeafe">司令塔</text>

          <!-- Output Targets -->
          ${[
            { y: 116, title: 'CFexpress Type A (NVMe)', sub: 'PCIe Gen4/5 超高速連続書込', col: '#0284c7' },
            { y: 164, title: 'デュアル UHS-II SD 同時記録', sub: 'プロ現場向けリアルタイム冗長', col: '#059669' },
            { y: 212, title: 'デュアル USB-C (10Gbps+PD) / Wi-Fi 6E', sub: 'α7 V新搭載・給電しながら高速テザー', col: '#7c3aed' },
          ].map((o) => `
            <line x1="456" y1="184" x2="484" y2="${o.y + 19}" stroke="${o.col}" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
            <rect x="488" y="${o.y}" width="194" height="38" rx="6" fill="#ffffff" stroke="${o.col}" stroke-width="1.3"/>
            <text x="498" y="${o.y + 15}" font-size="8.0" font-weight="900" fill="${o.col}">${o.title}</text>
            <text x="498" y="${o.y + 29}" font-size="7.2" font-weight="700" fill="#475569">${o.sub}</text>
          `).join('')}

          <line x1="354" y1="184" x2="378" y2="184" stroke="#059669" stroke-width="2.4" marker-end="url(#${p}_arr_green)"/>

          ${nanoPin(192, 120, 86, 314, 1, '円環ゼロコピー・リングバッファ', '半押し中14bit RAWを30fps循環記憶し決定的瞬間を遡り捕獲', '#059669', 'start')}
          ${nanoPin(585, 231, 368, 314, 2, 'α7 V デュアルUSB-C ＆ Wi-Fi 6E', 'PD給電と10Gbps高速データ転送・6GHz無線送信を同時捌き', '#7c3aed', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'シャッター半押し中に30fps 14-bit RAWを最大1.0秒分循環保持する円環リングDMA', line2: '全押しと同時にポインタを凍結しCFexpress Type A / SD / デュアルUSB-Cへゼロコピー転送' },
          { label: '撮影・画質への恩恵', line1: '野鳥の飛び立ちやスポーツの決定的瞬間を人間の反射神経の遅れを帳消しにして確実に捕獲', line2: 'α7 V新搭載のデュアルUSB-CによりPD給電しながらの高速スタジオテザーやSSD収録に対応' },
          { label: '実機・2026学会諸元', line1: 'Sony α7 V プリ撮影（最大1.0秒・30fps RAW）＋ CFexpress Type A（NVMe PCIe）', line2: 'デュアルUSB-C（10Gbpsデータ＋USB-PD独立制御）＆ Wi-Fi 6E（6GHz帯）DMA統合' },
        ],
      });

    // X2-85. BIONZ XR2 Blackout-Free 240Hz EVF Compositor & 48Gbps HDMI 2.1 FRL 16-bit RAW Output
    case 'xv2_blackoutfree_evf_hdmi_disp':
      return renderBionzV2Hd({
        badge: 'X2-85',
        zone: 'isp_mem',
        nodeTag: 'BIONZ XR2 · EVF + HDMI 2.1',
        title: 'BIONZ XR2 映像出力核「ブラックアウトフリー240Hz EVF合成器 ＆ 48Gbps HDMI 2.1 16bit RAW」',
        analogy: 'フレーム丸ごと待たず「数ライン単位」で即座にEVFへ流し込み、30fps連写中も暗転ゼロでプロ用外部録画も同時出力',
        metric: '遅延 < 5ms · HDMI 48 Gbps',
        scaleLabel: 'LINE-SLICED 240Hz · 4-LANE FRL',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        art: (p) => `
          <!-- Top Branch: Line-Sliced Ultra-Low-Latency Blackout-Free EVF Compositor (<5ms) -->
          <rect x="68" y="84" width="440" height="106" rx="10" fill="#ffffff" stroke="#7dd3fc" stroke-width="1.35"/>
          <text x="288" y="101" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0369a1">① ラインスライス超低遅延 ブラックアウトフリー EVFコンポジタ（&lt; 5 ms）</text>

          <!-- Line-Sliced Streaming Illustration -->
          <rect x="82" y="110" width="96" height="68" rx="6" fill="#0f172a" stroke="#38bdf8"/>
          <text x="130" y="124" text-anchor="middle" font-size="7.4" font-weight="800" fill="#bae6fd">数ライン即転送</text>
          ${[132, 143, 154, 165].map((y, i) => `
            <rect x="92" y="${y}" width="76" height="7" rx="1.5" fill="${i < 3 ? '#38bdf8' : '#facc15'}"/>
          `).join('')}

          <line x1="178" y1="144" x2="204" y2="144" stroke="#0284c7" stroke-width="2.2" marker-end="url(#${p}_arr_blue)"/>

          <!-- Multi-Layer OSD Hardware Blender -->
          <rect x="208" y="110" width="128" height="68" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.2"/>
          <text x="272" y="125" text-anchor="middle" font-size="7.8" font-weight="900" fill="#1e3a8a">多層OSDリアルタイム合成</text>
          <rect x="218" y="132" width="108" height="11" rx="2" fill="#dcfce7"/><text x="272" y="140.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#166534">AI瞳AF枠 ＋ 電子水準器</text>
          <rect x="218" y="146" width="108" height="11" rx="2" fill="#fef3c7"/><text x="272" y="154.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#92400e">ピーキング ＋ ゼブラ</text>
          <rect x="218" y="160" width="108" height="11" rx="2" fill="#e0f2fe"/><text x="272" y="168.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#0369a1">波形モニタ / LUTプレビュー</text>

          <line x1="336" y1="144" x2="362" y2="144" stroke="#059669" stroke-width="2.2" marker-end="url(#${p}_arr_green)"/>

          <!-- 120/240Hz OLED EVF -->
          <rect x="366" y="110" width="128" height="68" rx="7" fill="url(#${p}_emerald)" stroke="#065f46" stroke-width="1.3"/>
          <text x="430" y="133" text-anchor="middle" font-size="8.6" font-weight="900" fill="#ffffff">120 / 240Hz</text>
          <text x="430" y="148" text-anchor="middle" font-size="8.2" font-weight="900" fill="#d1fae5">OLED EVF</text>
          <text x="430" y="165" text-anchor="middle" font-size="7.2" font-weight="800" fill="#fef08a">30fps連写中も暗転ゼロ!</text>

          <!-- Bottom Branch: 4-Lane 48Gbps HDMI 2.1 FRL 16-bit RAW External Output -->
          <rect x="68" y="198" width="440" height="82" rx="10" fill="#f8fafc" stroke="#c4b5fd" stroke-width="1.35"/>
          <text x="288" y="215" text-anchor="middle" font-size="9.0" font-weight="800" fill="#5b21b6">② 4レーン 48Gbps HDMI 2.1（FRL）非圧縮 16-bit RAW 出力エンジン</text>
          <rect x="82" y="224" width="128" height="44" rx="6" fill="url(#${p}_hfo2)"/>
          <text x="146" y="242" text-anchor="middle" font-size="8.0" font-weight="900" fill="#ffffff">16-bit Linear RAW</text>
          <text x="146" y="256" text-anchor="middle" font-size="7.2" font-weight="700" fill="#ede9fe">or 4K60 10-bit 4:2:2</text>

          <!-- 4 FRL High-Speed Differential Lanes -->
          ${[230, 240, 250, 260].map((y, i) => `
            <line x1="212" y1="${y}" x2="344" y2="${y}" stroke="#7c3aed" stroke-width="2" marker-end="url(#${p}_arr_blue)"/>
            ${i === 0 ? `<text x="278" y="227" text-anchor="middle" font-size="7.2" font-weight="900" fill="#5b21b6">4×12Gbps FRL (48Gbps)</text>` : ''}
          `).join('')}

          <rect x="348" y="224" width="146" height="44" rx="6" fill="#0f172a" stroke="#a855f7" stroke-width="1.2"/>
          <text x="421" y="242" text-anchor="middle" font-size="8.0" font-weight="900" fill="#e9d5ff">外部シネマレコーダ</text>
          <text x="421" y="256" text-anchor="middle" font-size="7.2" font-weight="700" fill="#94a3b8">フルサイズType-A HDMI</text>

          <!-- Right KPI Panel -->
          ${kpiCard(522, 86, 172, 58, 'EVF 表示遅延', '< 5 ms (ライン分割)', '光学ファインダー並の追従感', '#059669')}
          ${kpiCard(522, 154, 172, 58, '連写ブラックアウト', '完全ゼロ (30fps)', '動体を一瞬も見失わない', '#0284c7')}
          ${kpiCard(522, 222, 172, 58, 'HDMI 2.1 FRL 帯域', '最大 48 Gbps', '16-bit RAW / 4K60p同時出力', '#7c3aed')}

          ${nanoPin(130, 148, 86, 314, 1, 'ラインスライス直結駆動', '1フレーム蓄積を待たず走査線単位でMIPI-DSIへ即時送出', '#0284c7', 'start')}
          ${nanoPin(278, 246, 368, 314, 2, '4レーン HDMI 2.1 FRL PHY', '71.5fs ADPLLクロック同期で非圧縮16bit RAWを外部出力', '#7c3aed', 'start')}
        `,
        cards: [
          { label: '構造・メカニズム', line1: 'フレーム蓄積を待たず数ライン単位で流すラインスライスEVFコンポジタ＋多層OSD重畳', line2: '並行して4レーン最大48GbpsのHDMI 2.1（FRL）が非圧縮16-bit RAWを外部レコーダーへ出力' },
          { label: '撮影・画質への恩恵', line1: '30fps連写中でもEVFが1ミリ秒も暗転（ブラックアウト）せず高速スポーツ・野鳥を追従可能', line2: 'ピーキング・ゼブラ・LUT適用済み映像をEVFで見ながら外部レコーダーへ生16bit RAW記録' },
          { label: '実機・2026学会諸元', line1: '120Hz/240Hz ブラックアウトフリーEVF（表示遅延<5ms・MIPI-DSI直結）', line2: 'フルサイズHDMI Type-A：HDMI 2.1 FRL（48Gbps・16-bit RAW / 4K60 10-bit 4:2:2出力）' },
        ],
      });

    default:
      return null;
  }
}
