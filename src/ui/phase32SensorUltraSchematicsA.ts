import { PartExplanation } from '../assemblies/types';
import { FONT_MONO, pill, sensorFrame } from './sensorUltraSchematicFrame';

/**
 * Phase 32 Ultra-Detailed Sensor & 5-Axis IBIS Technical Schematics — Part A (S01–S30)
 * Full-width 360x176 accurate optical, semiconductor, electromagnetic, and kinematic cutaways.
 */
export function renderPhase32SensorUltraSchematicA(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // S01 — Optical Aperture Mask & Dust-Seal Bezel (baffle)
    // =========================================================================
    case 'baffle':
      return sensorFrame({
        code: 'S01',
        title: '遮光ナイフエッジ枠 ＆ EPDM防塵ガスケット',
        viewTag: '光学断面図',
        accent: '#1e293b',
        headerBg: '#f1f5f9',
        defs: `<linearGradient id="g-S01-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.10"/>
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.22"/>
        </linearGradient>`,
        body: `
          <!-- Optical axis reference -->
          <line x1="16" y1="88" x2="318" y2="88" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="4 3"/>
          <!-- Valid imaging light cone (passes through 36.6x24.6mm aperture onto 36x24mm sensor) -->
          <polygon points="18,62 150,66 286,67 286,109 150,110 18,114" fill="url(#g-S01-beam)"/>
          <line x1="18" y1="62" x2="285" y2="67" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-S01-blue)"/>
          <line x1="18" y1="114" x2="285" y2="109" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-S01-blue)"/>
          <!-- Upper 3-tier sawtooth knife-edge anodized baffle -->
          <polygon points="104,32 162,32 162,56 146,56 146,64 134,58 134,64 122,58 122,64 104,56" fill="#1e293b" stroke="#0f172a" stroke-width="1"/>
          <!-- Lower 3-tier sawtooth knife-edge anodized baffle -->
          <polygon points="104,144 162,144 162,120 146,120 146,112 134,118 134,112 122,118 122,112 104,120" fill="#1e293b" stroke="#0f172a" stroke-width="1"/>
          <!-- EPDM dust-seal perimeter gaskets compressed against optical stack -->
          <rect x="163" y="36" width="10" height="22" rx="3" fill="#475569" stroke="#0f172a" stroke-width="0.9"/>
          <rect x="163" y="118" width="10" height="22" rx="3" fill="#475569" stroke="#0f172a" stroke-width="0.9"/>
          <!-- Optical filter stack & CMOS sensor -->
          <rect x="174" y="46" width="14" height="84" rx="1.5" fill="#bae6fd" stroke="#0284c7" stroke-width="1"/>
          <rect x="288" y="54" width="12" height="68" rx="1.5" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1"/>
          <rect x="300" y="46" width="14" height="84" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="0.9"/>
          <!-- Stray oblique light trapped & attenuated inside sawtooth grooves -->
          <polyline points="20,38 128,59 116,52 130,56" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#a-S01-red)"/>
          <circle cx="129" cy="59" r="2.2" fill="#dc2626"/>
          <text x="129" y="48" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fca5a5">吸収</text>
          <!-- Clean annotations outside beam & geometry -->
          <text x="20" y="34" font-size="7.3" font-weight="700" fill="#dc2626">斜め迷光（フレア原因）</text>
          <text x="20" y="79" font-size="7.3" font-weight="700" fill="#1d4ed8">有効結像光束</text>
          <text x="20" y="136" font-size="7" fill="#475569">レンズ側（入射）→</text>
          <!-- Callouts on right/top -->
          <line x1="168" y1="36" x2="188" y2="30" stroke="#475569" stroke-width="0.8"/>
          <text x="191" y="33" font-size="7.2" font-weight="700" fill="#334155">EPDM防塵ガスケット（気密）</text>
          <line x1="181" y1="46" x2="208" y2="44" stroke="#0284c7" stroke-width="0.8"/>
          <text x="211" y="47" font-size="7" font-weight="600" fill="#0369a1">光学フィルター群</text>
          <text x="234" y="85" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0369a1">開口 36.6×24.6mm</text>
          <text x="234" y="96" text-anchor="middle" font-size="6.8" fill="#475569">反射率 &lt; 1.5%</text>
          <text x="331" y="84" text-anchor="middle" font-size="7.2" font-weight="700" fill="#1e3a8a">CMOS</text>
          <text x="331" y="95" text-anchor="middle" font-size="6.8" fill="#1e3a8a">36×24</text>
          <text x="331" y="105" text-anchor="middle" font-size="6.6" fill="#475569">像面</text>
          <line x1="138" y1="138" x2="195" y2="142" stroke="#1e293b" stroke-width="0.8"/>
          <text x="198" y="145" font-size="7.2" font-weight="700" fill="#0f172a">3段ノコギリ刃ナイフエッジ遮光壁</text>
        `,
        caption: '3段ノコギリ刃で斜め迷光を多重吸収し、EPDM枠が光学室への塵侵入を360°遮断',
      });

    // =========================================================================
    // S02 — Supersonic Wave Filter (sswf)
    // =========================================================================
    case 'sswf':
      return sensorFrame({
        code: 'S02',
        title: 'SSWF 超音波定在波ダスト除去ガラス',
        viewTag: '屈曲共振原理',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left PZT actuator bonded to glass edge -->
          <rect x="16" y="76" width="38" height="24" rx="3" fill="#e7e5e4" stroke="#78716c" stroke-width="1.2"/>
          <rect x="16" y="76" width="38" height="4" fill="#a8a29e"/>
          <rect x="16" y="96" width="38" height="4" fill="#a8a29e"/>
          <text x="35" y="91" text-anchor="middle" font-size="7.5" font-weight="800" fill="#292524">PZT</text>
          <text x="35" y="112" text-anchor="middle" font-size="6.8" font-weight="700" fill="#9a3412">30–70 kHz</text>
          <!-- Neutral equilibrium glass line -->
          <line x1="54" y1="88" x2="338" y2="88" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/>
          <!-- Flexural standing wave (phase 0° solid + phase 180° dashed) -->
          <path d="M54,88 C74,62 94,62 114,88 C134,114 154,114 174,88 C194,62 214,62 234,88 C254,114 274,114 294,88 C310,68 326,68 338,88" fill="none" stroke="#0284c7" stroke-width="2.6"/>
          <path d="M54,88 C74,114 94,114 114,88 C134,62 154,62 174,88 C194,114 214,114 234,88 C254,62 274,62 294,88 C310,108 326,108 338,88" fill="none" stroke="#38bdf8" stroke-width="1.4" stroke-dasharray="4 3"/>
          <!-- Nodal silicone supports (amplitude = 0) -->
          <rect x="108" y="92" width="12" height="14" rx="2" fill="#f59e0b" stroke="#b45309" stroke-width="0.9"/>
          <rect x="288" y="92" width="12" height="14" rx="2" fill="#f59e0b" stroke="#b45309" stroke-width="0.9"/>
          <circle cx="114" cy="88" r="3.4" fill="#d97706" stroke="#ffffff" stroke-width="1"/>
          <circle cx="294" cy="88" r="3.4" fill="#d97706" stroke="#ffffff" stroke-width="1"/>
          <text x="114" y="118" text-anchor="middle" font-size="7" font-weight="700" fill="#b45309">節 (振幅ゼロ支持)</text>
          <text x="294" y="118" text-anchor="middle" font-size="7" font-weight="700" fill="#b45309">節 (シリコーン支持)</text>
          <!-- Ejected dust particles at antinodes (>10,000 G) -->
          <circle cx="84" cy="60" r="2.8" fill="#475569"/>
          <line x1="84" y1="56" x2="84" y2="38" stroke="#dc2626" stroke-width="1.5" marker-end="url(#a-S02-red)"/>
          <circle cx="204" cy="60" r="3.2" fill="#334155"/>
          <line x1="204" y1="56" x2="210" y2="36" stroke="#dc2626" stroke-width="1.6" marker-end="url(#a-S02-red)"/>
          <circle cx="318" cy="67" r="2.4" fill="#475569"/>
          <line x1="318" y1="63" x2="324" y2="45" stroke="#dc2626" stroke-width="1.4" marker-end="url(#a-S02-red)"/>
          <!-- Antinode callout pill -->
          ${pill(148, 38, 114, 15, '腹: 最大加速度 > 10⁴ G', '#fef2f2', '#ef4444', '#b91c1c', 7.2)}
          <text x="256" y="41" font-size="7" font-weight="600" fill="#475569">ホコリを垂直に弾き飛ばす</text>
          <!-- Bottom dust catcher bar -->
          <rect x="132" y="132" width="144" height="12" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="0.9"/>
          <text x="204" y="140.5" text-anchor="middle" font-size="7" font-weight="700" fill="#92400e">下部 粘着ダストトラップ帯へ落下捕獲</text>
          <text x="36" y="42" text-anchor="middle" font-size="7" font-weight="700" fill="#0369a1">t=0.5mm</text>
          <text x="36" y="52" text-anchor="middle" font-size="6.6" fill="#475569">ITO+フッ素膜</text>
        `,
        caption: '厚さ0.5mmのガラスを30–70kHzで屈曲共振させ、1万G超の加速度でホコリを強制剥離',
      });

    // =========================================================================
    // S03 — SSWF Nodal Suspension Holder (sensor_sswf_holder)
    // =========================================================================
    case 'sensor_sswf_holder':
      return sensorFrame({
        code: 'S03',
        title: 'SSWF 超音波防振サスペンション枠（ノード支持）',
        viewTag: '防振支持断面',
        accent: '#0369a1',
        headerBg: '#f0f9ff',
        body: `
          <!-- Outer rigid IBIS holder chassis -->
          <path d="M22,42 L74,42 L74,56 L38,56 L38,118 L322,118 L322,56 L286,56 L286,42 L338,42 L338,132 L22,132 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.2"/>
          <!-- Vibrating SSWF glass spanning across -->
          <rect x="64" y="76" width="232" height="10" rx="1.5" fill="#bae6fd" stroke="#0284c7" stroke-width="1.1" opacity="0.45"/>
          <path d="M64,81 C92,61 118,61 144,81 C170,101 190,101 216,81 C242,61 268,61 296,81" fill="none" stroke="#0284c7" stroke-width="2.2"/>
          <!-- 2 Nodal silicone pads (left & right nodes at x=144 & x=216) -->
          <rect x="137" y="87" width="14" height="31" rx="2.5" fill="#f59e0b" stroke="#b45309" stroke-width="1"/>
          <rect x="209" y="87" width="14" height="31" rx="2.5" fill="#f59e0b" stroke="#b45309" stroke-width="1"/>
          <!-- Upper CuBe2 micro-pressure leaf-spring clips pressing strictly at the nodes -->
          <path d="M74,48 L120,48 L142,74" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M286,48 L240,48 L218,74" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Node markers -->
          <circle cx="144" cy="81" r="3.6" fill="#dc2626" stroke="#ffffff" stroke-width="1"/>
          <circle cx="216" cy="81" r="3.6" fill="#dc2626" stroke="#ffffff" stroke-width="1"/>
          <!-- Perimeter dust barrier gasket -->
          <rect x="44" y="64" width="14" height="54" rx="3" fill="#475569"/>
          <rect x="302" y="64" width="14" height="54" rx="3" fill="#475569"/>
          <!-- Labels -->
          ${pill(180, 38, 128, 15, 'CuBe2 微圧板バネクリップ', '#fef3c7', '#d97706', '#92400e', 7.2)}
          <line x1="144" y1="77" x2="144" y2="56" stroke="#dc2626" stroke-width="0.9" stroke-dasharray="2 2"/>
          <line x1="216" y1="77" x2="216" y2="56" stroke="#dc2626" stroke-width="0.9" stroke-dasharray="2 2"/>
          <rect x="148" y="54" width="64" height="13" rx="2.5" fill="#ffffff" opacity="0.95"/>
          <text x="180" y="63" text-anchor="middle" font-size="6.9" font-weight="700" fill="#dc2626">「節」のみ支持</text>
          <text x="180" y="109" text-anchor="middle" font-size="7" font-weight="700" fill="#b45309">低硬度シリコーン防振パッド</text>
          <text x="180" y="128" text-anchor="middle" font-size="7.1" font-weight="700" fill="#334155">IBIS側フレーム（振動流出を遮断 → 高Q値維持）</text>
          <text x="51" y="144" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">外周防塵壁</text>
          <text x="309" y="144" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">外周防塵壁</text>
          <text x="180" y="144" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0369a1">応力複屈折ゼロ ＆ 35–42 kHz 共振保持</text>
        `,
        caption: '振幅ゼロの「節」だけをシリコーンとCuBe2バネで挟み、振動を逃がさず高Q値で共振維持',
      });

    // =========================================================================
    // S04 — Multi-Layer PZT Piezo Bar (sensor_pzt_bar)
    // =========================================================================
    case 'sensor_pzt_bar':
      return sensorFrame({
        code: 'S04',
        title: '積層PZT圧電バー ＆ 左右2分割電極駆動',
        viewTag: '逆圧電駆動',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Upper bonded SSWF glass flexing -->
          <path d="M24,48 Q105,36 180,48 T336,48" fill="none" stroke="#0284c7" stroke-width="5.5" opacity="0.28"/>
          <path d="M24,48 Q105,36 180,48 T336,48" fill="none" stroke="#0284c7" stroke-width="1.8"/>
          <text x="180" y="34" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0369a1">SSWF振動ガラス板（屈曲定在波を励起）</text>
          <!-- Acoustic bond layer -->
          <rect x="44" y="65" width="272" height="5" fill="#fbbf24"/>
          <rect x="148" y="54" width="64" height="10" rx="2" fill="#ffffff" opacity="0.92"/>
          <text x="180" y="61.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#b45309">音響整合接着層</text>
          <!-- Multi-layer PZT ceramic body -->
          <rect x="44" y="69" width="272" height="34" rx="3" fill="#f5f5f4" stroke="#78716c" stroke-width="1.3"/>
          <!-- Internal interdigitated electrodes -->
          <line x1="50" y1="76" x2="168" y2="76" stroke="#a8a29e" stroke-width="1.2"/>
          <line x1="58" y1="83" x2="174" y2="83" stroke="#78716c" stroke-width="1.2"/>
          <line x1="50" y1="90" x2="168" y2="90" stroke="#a8a29e" stroke-width="1.2"/>
          <line x1="58" y1="97" x2="174" y2="97" stroke="#78716c" stroke-width="1.2"/>
          <line x1="186" y1="76" x2="304" y2="76" stroke="#a8a29e" stroke-width="1.2"/>
          <line x1="192" y1="83" x2="310" y2="83" stroke="#78716c" stroke-width="1.2"/>
          <line x1="186" y1="90" x2="304" y2="90" stroke="#a8a29e" stroke-width="1.2"/>
          <line x1="192" y1="97" x2="310" y2="97" stroke="#78716c" stroke-width="1.2"/>
          <!-- Center split divider -->
          <line x1="180" y1="69" x2="180" y2="103" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3 2"/>
          <!-- Split fired Ag bottom electrodes -->
          <rect x="52" y="103" width="118" height="12" rx="2" fill="#e2e8f0" stroke="#475569" stroke-width="1"/>
          <text x="111" y="111.5" text-anchor="middle" font-size="7.2" font-weight="700" fill="#b91c1c">左 Ag電極 (+V 伸長 ↔)</text>
          <rect x="190" y="103" width="118" height="12" rx="2" fill="#e2e8f0" stroke="#475569" stroke-width="1"/>
          <text x="249" y="111.5" text-anchor="middle" font-size="7.2" font-weight="700" fill="#1d4ed8">右 Ag電極 (−V 収縮 →←)</text>
          <!-- Expansion/contraction horizontal vectors -->
          <line x1="88" y1="86" x2="62" y2="86" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-S04-red)"/>
          <line x1="132" y1="86" x2="158" y2="86" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-S04-red)"/>
          <line x1="202" y1="86" x2="226" y2="86" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-S04-blue)"/>
          <line x1="298" y1="86" x2="274" y2="86" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-S04-blue)"/>
          <!-- AC drive wave & specs at bottom -->
          <path d="M22,135 Q32,123 42,135 T62,135 T82,135 T102,135" fill="none" stroke="#dc2626" stroke-width="1.6"/>
          <text x="112" y="138" font-size="7.2" font-weight="700" fill="#9a3412">30–70 kHz 周波数スイープ ＆ 自動位相追尾</text>
          ${pill(302, 135, 86, 15, '最大 3〜5万 G', '#fef2f2', '#dc2626', '#b91c1c', 7.2)}
        `,
        caption: '左右2分割電極に逆位相の高周波電圧を加え、積層PZTの高速伸縮でガラス全面を共振駆動',
      });

    // =========================================================================
    // S05 — Front Birefringent Quartz OLPF & 16-pt MTF (olpf16)
    // =========================================================================
    case 'olpf16':
      return sensorFrame({
        code: 'S05',
        title: '前面 人工水晶複屈折 OLPF ＆ MTF 特性',
        viewTag: '複屈折・MTF',
        accent: '#0d5bd9',
        headerBg: '#eff6ff',
        body: `
          <!-- LEFT: Crystal birefringence o-ray / e-ray split -->
          <rect x="12" y="30" width="144" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.9"/>
          <text x="84" y="42" text-anchor="middle" font-size="7.4" font-weight="700" fill="#1e3a8a">α-水晶 45°カット 複屈折分離</text>
          <!-- Incoming ray -->
          <line x1="20" y1="78" x2="54" y2="78" stroke="#1e293b" stroke-width="2" marker-end="url(#a-S05-slate)"/>
          <text x="36" y="71" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">入射光</text>
          <!-- Quartz crystal plate -->
          <rect x="56" y="50" width="44" height="58" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.3"/>
          <line x1="62" y1="102" x2="94" y2="56" stroke="#38bdf8" stroke-width="0.9" stroke-dasharray="2 2"/>
          <text x="78" y="118" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0369a1">光学軸 45°</text>
          <!-- o-ray (straight) & e-ray (displaced) -->
          <line x1="56" y1="78" x2="100" y2="78" stroke="#2563eb" stroke-width="1.8"/>
          <line x1="100" y1="78" x2="138" y2="78" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-S05-blue)"/>
          <line x1="56" y1="78" x2="100" y2="62" stroke="#dc2626" stroke-width="1.8"/>
          <line x1="100" y1="62" x2="138" y2="62" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-S05-red)"/>
          <text x="122" y="57" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">異常光 e</text>
          <text x="122" y="90" text-anchor="middle" font-size="6.8" font-weight="700" fill="#2563eb">常光 o</text>
          <text x="84" y="130" text-anchor="middle" font-size="6.7" fill="#334155">n_o=1.544 / n_e=1.553</text>
          <text x="84" y="140" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0d5bd9">水平＋±45°分離 → 16点PSF</text>
          <!-- RIGHT: Clean MTF Curve comparing 16-pt vs 4-pt -->
          <rect x="164" y="30" width="184" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.9"/>
          <text x="256" y="42" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0f172a">空間周波数 MTF（偽色モアレ抑止）</text>
          <!-- Axes -->
          <line x1="184" y1="122" x2="338" y2="122" stroke="#64748b" stroke-width="1"/>
          <line x1="184" y1="50" x2="184" y2="122" stroke="#64748b" stroke-width="1"/>
          <!-- Nyquist vertical line -->
          <line x1="252" y1="50" x2="252" y2="122" stroke="#dc2626" stroke-width="1" stroke-dasharray="3 2"/>
          <rect x="252" y="50" width="84" height="72" fill="#fee2e2" opacity="0.32"/>
          <text x="294" y="61" text-anchor="middle" font-size="6.6" font-weight="700" fill="#b91c1c">偽色モアレ帯域</text>
          <!-- Conventional 4-pt LPF (dashed with big sidelobe) -->
          <path d="M184,56 C210,60 232,96 252,121 C272,92 292,84 312,115 C322,107 330,104 336,112" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
          <!-- 16-pt Gaussian LPF (smooth blue, near-zero sidelobe) -->
          <path d="M184,56 C214,60 236,84 256,112 C272,121 300,121 336,121" fill="none" stroke="#0d5bd9" stroke-width="2.2"/>
          <!-- Legend positioned cleanly -->
          <line x1="258" y1="73" x2="272" y2="73" stroke="#0d5bd9" stroke-width="2.2"/>
          <text x="275" y="75.5" font-size="6.7" font-weight="700" fill="#0d5bd9">16点ガウスLPF</text>
          <line x1="258" y1="84" x2="272" y2="84" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
          <text x="275" y="86.5" font-size="6.6" fill="#64748b">従来4点 (漏洩)</text>
          <text x="176" y="56" text-anchor="end" font-size="6.6" fill="#475569">1.0</text>
          <text x="176" y="124" text-anchor="end" font-size="6.6" fill="#475569">0</text>
          <text x="252" y="135" text-anchor="middle" font-size="7" font-weight="700" fill="#dc2626">f_N (ナイキスト)</text>
        `,
        caption: '水晶の複屈折で光を画素ピッチ分だけ分離し、ナイキスト超の偽色・モアレを滑らかに抑制',
      });

    // =========================================================================
    // S06 — Zero-Order λ/4 Plate & Rear Vertical Quartz (sensor_qwp_plate)
    // =========================================================================
    case 'sensor_qwp_plate':
      return sensorFrame({
        code: 'S06',
        title: 'λ/4 位相差板（円偏光化）＆ 後面垂直水晶',
        viewTag: '偏光変換原理',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Stage 1: Linear Polarization from Front Quartz -->
          <rect x="14" y="38" width="76" height="90" rx="5" fill="#fef2f2" stroke="#fca5a5" stroke-width="0.9"/>
          <text x="52" y="51" text-anchor="middle" font-size="7.2" font-weight="700" fill="#b91c1c">① 直線偏光</text>
          <line x1="30" y1="84" x2="74" y2="84" stroke="#dc2626" stroke-width="2" marker-start="url(#a-S06-red)" marker-end="url(#a-S06-red)"/>
          <line x1="52" y1="62" x2="52" y2="106" stroke="#dc2626" stroke-width="2" marker-start="url(#a-S06-red)" marker-end="url(#a-S06-red)"/>
          <text x="52" y="121" text-anchor="middle" font-size="6.7" fill="#7f1d1d">前面水晶の分離後</text>
          <!-- Arrow 1->2 -->
          <line x1="91" y1="84" x2="112" y2="84" stroke="#475569" stroke-width="1.6" marker-end="url(#a-S06-slate)"/>
          <!-- Stage 2: Zero-Order λ/4 Waveplate -->
          <rect x="115" y="34" width="44" height="98" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.6"/>
          <text x="137" y="56" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5b21b6">λ/4</text>
          <text x="137" y="72" text-anchor="middle" font-size="6.8" font-weight="700" fill="#6d28d9">位相差</text>
          <text x="137" y="83" text-anchor="middle" font-size="7.2" font-weight="700" fill="#5b21b6">π/2</text>
          <line x1="123" y1="116" x2="151" y2="92" stroke="#8b5cf6" stroke-width="1.2" stroke-dasharray="2 2"/>
          <text x="137" y="125" text-anchor="middle" font-size="6.5" fill="#5b21b6">軸45°</text>
          <!-- Arrow 2->3 -->
          <line x1="160" y1="84" x2="181" y2="84" stroke="#7c3aed" stroke-width="1.6" marker-end="url(#a-S06-purple)"/>
          <!-- Stage 3: Circular Polarization (Reset) -->
          <rect x="184" y="38" width="70" height="90" rx="5" fill="#f0f9ff" stroke="#7dd3fc" stroke-width="0.9"/>
          <text x="219" y="51" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0369a1">② 円偏光化</text>
          <circle cx="219" cy="84" r="18" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="90 22"/>
          <polygon points="237,84 233,77 241,79" fill="#0284c7"/>
          <text x="219" y="86.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0284c7">偏光均一</text>
          <text x="219" y="121" text-anchor="middle" font-size="6.7" fill="#0369a1">CPL装着もOK</text>
          <!-- Arrow 3->4 -->
          <line x1="255" y1="84" x2="275" y2="84" stroke="#0284c7" stroke-width="1.6" marker-end="url(#a-S06-cyan)"/>
          <!-- Stage 4: Rear Vertical Quartz Split -->
          <rect x="278" y="34" width="68" height="98" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
          <text x="312" y="49" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0c4a6e">③ 垂直水晶</text>
          <!-- 2 vertical equal beams -->
          <circle cx="312" cy="70" r="5" fill="#0d5bd9"/>
          <circle cx="312" cy="98" r="5" fill="#0d5bd9"/>
          <line x1="312" y1="76" x2="312" y2="92" stroke="#0284c7" stroke-width="1.5" marker-start="url(#a-S06-cyan)" marker-end="url(#a-S06-cyan)"/>
          <text x="312" y="114" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">50% : 50%</text>
          <text x="312" y="125" text-anchor="middle" font-size="6.6" fill="#0c4a6e">垂直90°等分</text>
          <text x="180" y="145" text-anchor="middle" font-size="7" font-weight="600" fill="#475569">水面反射やPLフィルター撮影でも偏光偏りなく前後16点分離を完全維持</text>
        `,
        caption: 'λ/4板が偏光方向を円偏光へリセットし、後面水晶の垂直分離を常に50:50で均等動作',
      });

    // =========================================================================
    // S07 — Hybrid IR/UV Cut Filter (ircut)
    // =========================================================================
    case 'ircut':
      return sensorFrame({
        code: 'S07',
        title: 'ハイブリッド IR/UVカット 分光透過率特性',
        viewTag: '分光特性図',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        defs: `<linearGradient id="g-S07-vis" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#6366f1"/>
          <stop offset="25%" stop-color="#06b6d4"/>
          <stop offset="52%" stop-color="#22c55e"/>
          <stop offset="78%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#ef4444"/>
        </linearGradient>`,
        body: `
          <!-- LEFT/MAIN: Spectral Transmittance Plot -->
          <rect x="36" y="34" width="212" height="92" fill="#ffffff" stroke="#e2e8f0"/>
          <!-- Visible rainbow band 400-650nm -->
          <rect x="64" y="34" width="84" height="92" fill="url(#g-S07-vis)" opacity="0.22"/>
          <!-- NIR blocked zone -->
          <rect x="160" y="34" width="88" height="92" fill="#fee2e2" opacity="0.30"/>
          <!-- Grid lines -->
          <line x1="36" y1="57" x2="248" y2="57" stroke="#f1f5f9" stroke-width="0.9"/>
          <line x1="36" y1="80" x2="248" y2="80" stroke="#f1f5f9" stroke-width="0.9"/>
          <line x1="36" y1="103" x2="248" y2="103" stroke="#f1f5f9" stroke-width="0.9"/>
          <!-- Axes -->
          <line x1="36" y1="126" x2="250" y2="126" stroke="#475569" stroke-width="1.2"/>
          <line x1="36" y1="32" x2="36" y2="126" stroke="#475569" stroke-width="1.2"/>
          <!-- Raw Silicon QE curve (dashed, sensitive up to 1100nm!) -->
          <path d="M46,120 C72,62 110,42 152,48 C190,56 218,86 244,124" fill="none" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4 2.5"/>
          <!-- Hybrid IR-Cut Transmittance curve (steep >96% passband, OD>4 cut at 650nm) -->
          <path d="M40,125 L54,124 L62,40 L146,40 L158,125 L246,125" fill="none" stroke="#0284c7" stroke-width="2.4" stroke-linejoin="round"/>
          <!-- Axis ticks & labels -->
          <text x="32" y="42" text-anchor="end" font-size="6.6" fill="#475569">100%</text>
          <text x="32" y="83" text-anchor="end" font-size="6.6" fill="#475569">50%</text>
          <text x="32" y="128" text-anchor="end" font-size="6.6" fill="#475569">0%</text>
          <text x="58" y="138" text-anchor="middle" font-size="6.8" fill="#475569">400nm</text>
          <text x="150" y="138" text-anchor="middle" font-size="7" font-weight="700" fill="#dc2626">650nm</text>
          <text x="236" y="138" text-anchor="middle" font-size="6.8" fill="#475569">1100nm</text>
          <!-- Callout labels placed in clear empty areas -->
          <text x="104" y="64" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0369a1">可視光透過</text>
          <text x="104" y="74" text-anchor="middle" font-size="7" font-weight="700" fill="#0369a1">&gt; 96%</text>
          <text x="206" y="54" text-anchor="middle" font-size="6.8" font-weight="600" fill="#475569">Si生感度 (1.12eV)</text>
          ${pill(204, 108, 76, 15, 'NIR遮断 OD>4', '#fef2f2', '#dc2626', '#b91c1c', 7)}
          <!-- RIGHT: Hybrid 2-Layer Mechanism Inset -->
          <rect x="260" y="34" width="88" height="106" rx="5" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.9"/>
          <text x="304" y="46" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">ハイブリッド2層</text>
          <rect x="270" y="54" width="68" height="14" rx="2" fill="#a855f7" opacity="0.85"/>
          <text x="304" y="63.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">誘電体多層膜</text>
          <rect x="270" y="72" width="68" height="22" rx="2" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
          <text x="304" y="85.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0c4a6e">Cu²⁺青色吸収硝子</text>
          <text x="304" y="109" text-anchor="middle" font-size="6.6" font-weight="700" fill="#7c3aed">① 急峻に反射カット</text>
          <text x="304" y="121" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0369a1">② 斜め赤外も吸収</text>
          <text x="304" y="133" text-anchor="middle" font-size="6.5" fill="#475569">広角周辺色かぶりゼロ</text>
        `,
        caption: '誘電体干渉膜とCu²⁺吸収ガラスの複合で650nm超の赤外線をOD>4で遮断し人の視覚へ整合',
      });

    // =========================================================================
    // S08 — Low-Alpha Cover Glass & Kovar Hermetic Seal (coverglass)
    // =========================================================================
    case 'coverglass':
      return sensorFrame({
        code: 'S08',
        title: '低α線カバーガラス ＆ コバール気密封止断面',
        viewTag: '気密封止断面',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Incoming light arrows -->
          <line x1="145" y1="28" x2="145" y2="48" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-S08-blue)"/>
          <line x1="180" y1="28" x2="180" y2="48" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-S08-blue)"/>
          <line x1="215" y1="28" x2="215" y2="48" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-S08-blue)"/>
          <text x="278" y="40" font-size="7.1" font-weight="700" fill="#0369a1">両面ARコート &gt; 99.2%</text>
          <!-- Top AR line + Low-alpha borosilicate cover glass + Bottom AR line -->
          <rect x="64" y="51" width="232" height="14" rx="1.5" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
          <line x1="65" y1="51" x2="295" y2="51" stroke="#7c3aed" stroke-width="1.5"/>
          <line x1="65" y1="65" x2="295" y2="65" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="180" y="60.5" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0c4a6e">低α線 高純度ホウケイ酸ガラス (&lt; 0.002 cph/cm²)</text>
          <!-- Kovar Fe-Ni-Co Seal Ring (left & right walls) -->
          <rect x="68" y="65" width="24" height="16" fill="#94a3b8" stroke="#334155" stroke-width="1.1"/>
          <rect x="268" y="65" width="24" height="16" fill="#94a3b8" stroke="#334155" stroke-width="1.1"/>
          <!-- HTCC Alumina Ceramic Cavity Package -->
          <path d="M58,81 L92,81 L92,114 L268,114 L268,81 L302,81 L302,138 L58,138 Z" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
          <!-- Dry N2 Hermetic Cavity Fill -->
          <rect x="92" y="65" width="176" height="49" fill="#f0fdf4" opacity="0.82"/>
          <!-- CMOS Silicon Die inside cavity -->
          <rect x="122" y="102" width="116" height="12" rx="1" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1"/>
          <text x="180" y="110.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">フルサイズ CMOS 画素ダイ</text>
          <!-- Gold wirebonds inside cavity -->
          <path d="M122,105 Q108,88 96,98" fill="none" stroke="#eab308" stroke-width="1.4"/>
          <path d="M238,105 Q252,88 264,98" fill="none" stroke="#eab308" stroke-width="1.4"/>
          <!-- Cavity label cleanly above die -->
          ${pill(180, 82, 134, 16, '乾燥窒素 Dry N₂ 気密室', '#dcfce7', '#059669', '#065f46', 7.3)}
          <!-- Ceramic bottom label -->
          <text x="180" y="129" text-anchor="middle" font-size="7.3" font-weight="700" fill="#f8fafc">Al₂O₃ 12層 HTCC セラミック筐体</text>
          <!-- Side callouts -->
          <line x1="68" y1="73" x2="54" y2="73" stroke="#334155" stroke-width="0.9"/>
          <text x="51" y="71" text-anchor="end" font-size="7" font-weight="700" fill="#334155">コバール</text>
          <text x="51" y="81" text-anchor="end" font-size="6.5" fill="#475569">Fe-Ni-Co</text>
          <text x="307" y="73" font-size="6.8" font-weight="700" fill="#059669">湿気・塵</text>
          <text x="307" y="83" font-size="6.8" font-weight="700" fill="#dc2626">α線遮断</text>
        `,
        caption: '熱膨張を整合したコバール環で気密封止し、画素と金ワイヤーを湿気・塵・α線から隔離',
      });

    // =========================================================================
    // S09 — Wafer 1: 3-Wafer Stacked Global Shutter BSI Die (stacked_die)
    // =========================================================================
    case 'stacked_die':
      return sensorFrame({
        code: 'S09',
        title: '3ウェハー積層 グローバルシャッター BSI断面',
        viewTag: '3D積層断面',
        accent: '#1d4ed8',
        headerBg: '#eff6ff',
        body: `
          <!-- Photons arriving from top onto micro-lenses -->
          <line x1="68" y1="26" x2="68" y2="37" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a-S09-amber)"/>
          <line x1="112" y1="26" x2="112" y2="37" stroke="#22c55e" stroke-width="1.5" marker-end="url(#a-S09-green)"/>
          <line x1="156" y1="26" x2="156" y2="37" stroke="#2563eb" stroke-width="1.5" marker-end="url(#a-S09-blue)"/>
          <!-- Micro-lenses + Bayer CF bar -->
          <path d="M52,47 Q68,38 84,47 M96,47 Q112,38 128,47 M140,47 Q156,38 172,47" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.1"/>
          <rect x="52" y="47" width="32" height="5" fill="#ef4444"/>
          <rect x="96" y="47" width="32" height="5" fill="#22c55e"/>
          <rect x="140" y="47" width="32" height="5" fill="#3b82f6"/>
          <rect x="38" y="52" width="150" height="24" rx="2" fill="#0f766e" stroke="#115e59" stroke-width="1.1"/>
          <text x="113" y="63" text-anchor="middle" font-size="7.3" font-weight="700" fill="#ffffff">Wafer 1: BSI画素＋GSメモリ</text>
          <text x="113" y="72.5" text-anchor="middle" font-size="6.4" fill="#ccfbf1">全画素同時露光 (2層Tr構造)</text>
          <!-- Cu-Cu Hybrid Bond Pillars -->
          <rect x="38" y="76" width="150" height="11" fill="#ffedd5" stroke="#ea580c" stroke-width="0.8"/>
          ${[52, 72, 92, 112, 132, 152, 172].map((x) => `<rect x="${x}" y="76" width="5" height="11" fill="#ea580c"/>`).join('')}
          <!-- Wafer 2: 4nm Logic / CDS / ADC -->
          <rect x="38" y="87" width="150" height="24" rx="2" fill="#1e3a8a" stroke="#172554" stroke-width="1.1"/>
          <text x="113" y="98" text-anchor="middle" font-size="7.3" font-weight="700" fill="#ffffff">Wafer 2: 列並列 CDS / ADC</text>
          <text x="113" y="107.5" text-anchor="middle" font-size="6.4" fill="#bfdbfe">高速グローバルシャッター制御</text>
          <!-- Cu-TSV vertical links -->
          <rect x="38" y="111" width="150" height="8" fill="#e2e8f0"/>
          ${[60, 95, 130, 165].map((x) => `<rect x="${x}" y="111" width="6" height="8" fill="#d97706"/>`).join('')}
          <!-- Wafer 3: Stacked 120fps DRAM -->
          <rect x="38" y="119" width="150" height="24" rx="2" fill="#312e81" stroke="#1e1b4b" stroke-width="1.1"/>
          <text x="113" y="130" text-anchor="middle" font-size="7.3" font-weight="700" fill="#ffffff">Wafer 3: 積層 DRAM バッファ</text>
          <text x="113" y="139.5" text-anchor="middle" font-size="6.4" fill="#ddd6fe">120fps RAW 一時超高速格納</text>
          <!-- Right side clear engineering callouts -->
          <line x1="188" y1="64" x2="204" y2="54" stroke="#0f766e" stroke-width="1"/>
          ${pill(275, 52, 136, 17, '36×24mm 全面同時露光', '#f0fdfa', '#0d9488', '#115e59', 7.1)}
          <line x1="188" y1="81" x2="204" y2="81" stroke="#ea580c" stroke-width="1"/>
          ${pill(275, 81, 136, 17, '3µm Cu-Cu 直接接合', '#fff7ed', '#ea580c', '#9a3412', 7.1)}
          <line x1="188" y1="99" x2="204" y2="108" stroke="#1e3a8a" stroke-width="1"/>
          ${pill(275, 108, 136, 17, '14–16bit 並列A/D変換', '#eff6ff', '#2563eb', '#1e40af', 7.1)}
          <line x1="188" y1="131" x2="204" y2="134" stroke="#4f46e5" stroke-width="1"/>
          ${pill(275, 134, 136, 17, '動体歪みゼロ 120fps連写', '#eef2ff', '#4f46e5', '#3730a3', 7.1)}
        `,
        caption: '画素・高速ADC・大容量DRAMの3枚を立体積層し、歪みゼロの120fps同時露光を実現',
      });

    // =========================================================================
    // S10 — Cu-Cu Bumpless Hybrid Bonding (sensor_cucu_layer)
    // =========================================================================
    case 'sensor_cucu_layer':
      return sensorFrame({
        code: 'S10',
        title: 'Cu-Cu バンプレス直接ハイブリッド接合',
        viewTag: '接合比較断面',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- LEFT: Conventional TSV / Micro-bump -->
          <rect x="12" y="30" width="144" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.9"/>
          <text x="84" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#64748b">従来: 外周TSV / ハンダバンプ</text>
          <rect x="24" y="52" width="120" height="20" rx="2" fill="#cbd5e1" stroke="#64748b"/>
          <text x="84" y="64.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#334155">画素ウェハー</text>
          <!-- Large solder bumps only at outer edges -->
          <ellipse cx="36" cy="82" rx="7" ry="6" fill="#94a3b8" stroke="#475569"/>
          <ellipse cx="132" cy="82" rx="7" ry="6" fill="#94a3b8" stroke="#475569"/>
          <rect x="24" y="92" width="120" height="20" rx="2" fill="#cbd5e1" stroke="#64748b"/>
          <text x="84" y="104.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#334155">ロジックウェハー</text>
          <text x="84" y="85" text-anchor="middle" font-size="6.7" fill="#dc2626">外周迂回・高抵抗</text>
          <text x="84" y="127" text-anchor="middle" font-size="6.8" fill="#64748b">ピッチ 25〜40 µm（粗い）</text>
          <text x="84" y="138" text-anchor="middle" font-size="6.8" fill="#64748b">配線長大・遅延＆発熱増</text>
          <!-- Transition arrow -->
          <line x1="158" y1="86" x2="174" y2="86" stroke="#ea580c" stroke-width="2" marker-end="url(#a-S10-amber)"/>
          <!-- RIGHT: Bumpless Wafer-on-Wafer Cu-Cu Hybrid Bond -->
          <rect x="178" y="30" width="170" height="114" rx="5" fill="#fff7ed" stroke="#f97316" stroke-width="1.1"/>
          <text x="263" y="43" text-anchor="middle" font-size="7.4" font-weight="700" fill="#9a3412">最新: 全面 Cu-Cu 直接接合 (3µm)</text>
          <rect x="190" y="51" width="146" height="19" rx="2" fill="#0d9488" stroke="#0f766e"/>
          <text x="263" y="63" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffff">Wafer 1 (BSI画素層)</text>
          <!-- SiO2 dielectric + ultra-dense Cu-Cu direct pads -->
          <rect x="190" y="70" width="146" height="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="0.7"/>
          <line x1="190" y1="81" x2="336" y2="81" stroke="#0369a1" stroke-width="0.8" stroke-dasharray="2 2"/>
          ${[200, 214, 228, 242, 256, 270, 284, 298, 312, 326]
            .map(
              (x) =>
                `<rect x="${x - 3.5}" y="70" width="7" height="22" fill="#ea580c" stroke="#9a3412" stroke-width="0.5"/>`
            )
            .join('')}
          <rect x="190" y="92" width="146" height="19" rx="2" fill="#4f46e5" stroke="#3730a3"/>
          <text x="263" y="104" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffff">Wafer 2 (4nm ADC/ロジック)</text>
          <text x="263" y="125" text-anchor="middle" font-size="6.9" font-weight="700" fill="#9a3412">CMP平坦度 &lt;0.5nm · SiO₂＋銅原子拡散</text>
          <text x="263" y="137" text-anchor="middle" font-size="6.9" font-weight="700" fill="#c2410c">ハンダ不要 · 遅延1/100 · 熱抵抗−20%</text>
        `,
        caption: '画素真下に3µmピッチで数百万本の銅柱を原子接合し、超低遅延・高放熱な垂直配線を実現',
      });

    // =========================================================================
    // S11 — Wafer 2 & 3: Column-Parallel ADC & Stacked DRAM (sensor_logic_dram)
    // =========================================================================
    case 'sensor_logic_dram':
      return sensorFrame({
        code: 'S11',
        title: '第2・第3ウェハー：並列ADC ＆ 積層DRAM処理系',
        viewTag: '並列信号フロー',
        accent: '#4f46e5',
        headerBg: '#eef2ff',
        body: `
          <!-- Top: Wafer 1 Pixel columns -->
          <rect x="16" y="30" width="328" height="22" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1"/>
          <text x="180" y="44" text-anchor="middle" font-size="7.5" font-weight="700" fill="#0c4a6e">Wafer 1 画素アレイ（数千列からアナログ電荷を同時垂直送出）</text>
          <!-- Parallel Cu-Cu vertical arrows -->
          ${[48, 92, 136, 180, 224, 268, 312]
            .map(
              (x) =>
                `<line x1="${x}" y1="52" x2="${x}" y2="66" stroke="#ea580c" stroke-width="1.8" marker-end="url(#a-S11-amber)"/>`
            )
            .join('')}
          <!-- Middle: Wafer 2 Column-Parallel CDS + 14-16bit ADC -->
          <rect x="16" y="68" width="328" height="32" rx="4" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.2"/>
          <text x="24" y="80" font-size="7.1" font-weight="700" fill="#3730a3">Wafer 2 (微細ロジック): 列並列 CDSノイズ除去 ＋ 14–16bit 高速ADC</text>
          ${[26, 70, 114, 158, 202, 246, 290]
            .map(
              (x) =>
                `<rect x="${x}" y="84" width="38" height="12" rx="2" fill="#4f46e5"/><text x="${x + 19}" y="92.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">CDS/ADC</text>`
            )
            .join('')}
          <!-- Ultra-wide internal bus arrows -->
          ${[70, 140, 210, 280]
            .map(
              (x) =>
                `<line x1="${x}" y1="100" x2="${x}" y2="114" stroke="#4f46e5" stroke-width="2" marker-end="url(#a-S11-purple)"/>`
            )
            .join('')}
          <!-- Bottom: Wafer 3 Stacked DRAM + SLVS-EC Out -->
          <rect x="16" y="116" width="222" height="28" rx="4" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.2"/>
          <text x="127" y="128" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0f766e">Wafer 3: 積層超広帯域 DRAM バッファ</text>
          <text x="127" y="139" text-anchor="middle" font-size="6.7" fill="#115e59">120fps 全画素RAWを一瞬で吸収 · ノイズ &lt;1.5e⁻</text>
          <!-- Output arrow to BIONZ XR -->
          <line x1="238" y1="130" x2="262" y2="130" stroke="#0d9488" stroke-width="2" marker-end="url(#a-S11-green)"/>
          <rect x="265" y="116" width="79" height="28" rx="4" fill="#0f172a"/>
          <text x="304.5" y="128" text-anchor="middle" font-size="7.1" font-weight="700" fill="#38bdf8">SLVS-EC v3</text>
          <text x="304.5" y="139" text-anchor="middle" font-size="6.6" fill="#e2e8f0">BIONZ XR へ</text>
        `,
        caption: '数千列同時CDS/ADCで高速デジタル化し、直下の積層DRAMが120fps連写データを瞬時吸収',
      });

    // =========================================================================
    // S12 — Wafer 3: Stacked DRAM Die & Cu-TSV Spine (sensor_dram_wafer)
    // =========================================================================
    case 'sensor_dram_wafer':
      return sensorFrame({
        code: 'S12',
        title: '第3ウェハー DRAMダイ ＆ 貫通Cu-TSVスパイン',
        viewTag: 'TSV貫通断面',
        accent: '#3730a3',
        headerBg: '#eef2ff',
        body: `
          <!-- Wafer 1 & Wafer 2 above -->
          <rect x="20" y="30" width="186" height="17" rx="2" fill="#0d9488"/>
          <text x="113" y="41" text-anchor="middle" font-size="7.1" font-weight="700" fill="#ffffff">Wafer 1: 画素層 (Cu-Cu直結)</text>
          <rect x="20" y="51" width="186" height="19" rx="2" fill="#1d4ed8"/>
          <text x="113" y="63" text-anchor="middle" font-size="7.1" font-weight="700" fill="#ffffff">Wafer 2: 4nm ADC ロジック層</text>
          <!-- Wafer 3 DRAM die (40-60um thinned) with DRAM banks left & right and Cu-TSV spine in center -->
          <rect x="20" y="74" width="186" height="40" rx="2.5" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.2"/>
          <!-- DRAM cell banks -->
          <rect x="26" y="80" width="52" height="28" rx="2" fill="#312e81" stroke="#818cf8" stroke-width="0.8"/>
          <text x="52" y="92" text-anchor="middle" font-size="6.8" font-weight="700" fill="#e0e7ff">DRAM</text>
          <text x="52" y="102" text-anchor="middle" font-size="6.4" fill="#c7d2fe">バンク L</text>
          <rect x="148" y="80" width="52" height="28" rx="2" fill="#312e81" stroke="#818cf8" stroke-width="0.8"/>
          <text x="174" y="92" text-anchor="middle" font-size="6.8" font-weight="700" fill="#e0e7ff">DRAM</text>
          <text x="174" y="102" text-anchor="middle" font-size="6.4" fill="#c7d2fe">バンク R</text>
          <!-- Central Cu-TSV vertical spine (strictly between the two banks -> ZERO text collision!) -->
          <rect x="86" y="70" width="54" height="48" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8" stroke-dasharray="2 2"/>
          ${[94, 106, 118, 130]
            .map(
              (x) =>
                `<rect x="${x - 3.5}" y="70" width="7" height="48" fill="#e0f2fe"/><rect x="${x - 2.2}" y="70" width="4.4" height="48" fill="#f97316"/>`
            )
            .join('')}
          <!-- Nano-Ag sintered die-attach & CuW slug below -->
          <rect x="20" y="114" width="186" height="8" fill="#cbd5e1" stroke="#64748b" stroke-width="0.7"/>
          <text x="113" y="120.5" text-anchor="middle" font-size="6.3" font-weight="700" fill="#1e293b">ナノ銀焼結ダイアタッチ (k≈220 W/m·K)</text>
          <rect x="20" y="124" width="186" height="16" rx="2" fill="#b45309"/>
          <text x="113" y="134.5" text-anchor="middle" font-size="7" font-weight="700" fill="#fffbeb">CuW80 放熱ヒートスラッグ</text>
          <!-- Right side callouts -->
          <line x1="140" y1="88" x2="218" y2="52" stroke="#ea580c" stroke-width="1"/>
          ${pill(282, 50, 128, 18, '貫通 Cu-TSV 垂直スパイン', '#fff7ed', '#ea580c', '#9a3412', 7.1)}
          <text x="282" y="71" text-anchor="middle" font-size="6.8" fill="#475569">SiO₂絶縁ライナー付・超短距離貫通</text>
          ${pill(282, 92, 128, 18, '帯域 > 100 Gbps 瞬時書込', '#eef2ff', '#4f46e5', '#3730a3', 7.1)}
          <text x="282" y="112" text-anchor="middle" font-size="6.8" fill="#334155">40〜60µm極薄化 DRAMダイ</text>
          <text x="282" y="126" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0f766e">プリキャプチャー＆歪み低減</text>
        `,
        caption: '薄化DRAMダイ中央を貫くCu-TSVスパインが、120fps全画素データを超広帯域で瞬時格納',
      });

    // =========================================================================
    // S13 — Ultra-Low-Loop 4N Gold Wire Bonding (wirebond)
    // =========================================================================
    case 'wirebond':
      return sensorFrame({
        code: 'S13',
        title: '99.99% 純金 低ループ・ワイヤーボンディング',
        viewTag: 'ボンディング断面',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Top cover glass clearance reference -->
          <rect x="18" y="32" width="324" height="12" rx="1.5" fill="#bae6fd" stroke="#0284c7" stroke-width="1"/>
          <text x="180" y="40.5" text-anchor="middle" font-size="7" font-weight="700" fill="#0c4a6e">低α線光学カバーガラス（ワイヤー非接触クリアランス確保）</text>
          <!-- CMOS Silicon Die on left -->
          <rect x="22" y="102" width="124" height="24" rx="2" fill="#1e3a8a" stroke="#172554"/>
          <text x="84" y="117" text-anchor="middle" font-size="7.4" font-weight="700" fill="#ffffff">CMOS シリコンダイ</text>
          <!-- Al/Au Bond pads on die -->
          <rect x="114" y="98" width="12" height="4" fill="#eab308"/>
          <rect x="130" y="98" width="12" height="4" fill="#eab308"/>
          <!-- HTCC Stepped Dual-Tier Ceramic Shelf on right -->
          <path d="M162,126 L162,96 L216,96 L216,80 L338,80 L338,126 Z" fill="#334155" stroke="#0f172a" stroke-width="1.1"/>
          <text x="278" y="112" text-anchor="middle" font-size="7.4" font-weight="700" fill="#f8fafc">HTCC セラミック2段シェルフ</text>
          <!-- Shelf gold pads -->
          <rect x="176" y="92" width="18" height="4" fill="#eab308"/>
          <rect x="228" y="76" width="22" height="4" fill="#eab308"/>
          <!-- Low-loop Au wire 1 (inner tier) -->
          <circle cx="136" cy="96" r="3.4" fill="#facc15" stroke="#a16207" stroke-width="0.9"/>
          <path d="M136,96 C136,72 162,72 184,92" fill="none" stroke="#eab308" stroke-width="2.1"/>
          <!-- Low-loop Au wire 2 (upper tier) -->
          <circle cx="120" cy="96" r="3.4" fill="#facc15" stroke="#a16207" stroke-width="0.9"/>
          <path d="M120,96 C120,56 178,54 238,76" fill="none" stroke="#ca8a04" stroke-width="2.1"/>
          <!-- Loop height dimension -->
          <line x1="104" y1="60" x2="104" y2="97" stroke="#b45309" stroke-width="1" marker-start="url(#a-S13-amber)" marker-end="url(#a-S13-amber)"/>
          <text x="100" y="76" text-anchor="end" font-size="7" font-weight="700" fill="#b45309">低ループ高</text>
          <text x="100" y="86" text-anchor="end" font-size="7" font-weight="700" fill="#b45309">55〜80 µm</text>
          <!-- Wire & bond callouts -->
          <line x1="184" y1="59" x2="210" y2="54" stroke="#a16207" stroke-width="0.9"/>
          ${pill(276, 54, 128, 16, '4N純金 φ20–25µm (GSG)', '#fef9c3', '#ca8a04', '#854d0e', 7.1)}
          <!-- Bottom ceramic base -->
          <rect x="22" y="126" width="316" height="14" rx="2" fill="#475569"/>
          <text x="180" y="135.5" text-anchor="middle" font-size="7" font-weight="700" fill="#e2e8f0">1st ボール接合（超音波熱圧着） → 2nd ウェッジ接合（多段高密度配線）</text>
        `,
        caption: 'φ25µmの4N純金線を55–80µm低ループで2段シェルフへ接続し、高速差動信号と薄型を両立',
      });

    // =========================================================================
    // S14 — 12-Layer HTCC Alumina Ceramic LGA Package (ceramic_pkg)
    // =========================================================================
    case 'ceramic_pkg':
      return sensorFrame({
        code: 'S14',
        title: '12層 アルミナ HTCC セラミック LGA パッケージ',
        viewTag: '12層断面構造',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- Outer HTCC Alumina Ceramic Cavity Body -->
          <path d="M26,40 L74,40 L74,64 L92,64 L92,88 L268,88 L268,64 L286,64 L286,40 L334,40 L334,126 L26,126 Z" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
          <!-- 12 co-fired internal tungsten routing traces inside left & right walls -->
          ${[50, 60, 70, 80, 90, 100, 110, 118]
            .map(
              (y) =>
                `<line x1="34" y1="${y}" x2="${y < 64 ? 68 : y < 88 ? 86 : 114}" y2="${y}" stroke="#f59e0b" stroke-width="1" opacity="0.8"/>` +
                `<line x1="${y < 64 ? 292 : y < 88 ? 274 : 246}" y1="${y}" x2="326" y2="${y}" stroke="#f59e0b" stroke-width="1" opacity="0.8"/>`
            )
            .join('')}
          <!-- Vertical staggered tungsten vias -->
          <line x1="48" y1="50" x2="48" y2="126" stroke="#fbbf24" stroke-width="1.2"/>
          <line x1="62" y1="70" x2="62" y2="126" stroke="#fbbf24" stroke-width="1.2"/>
          <line x1="298" y1="70" x2="298" y2="126" stroke="#fbbf24" stroke-width="1.2"/>
          <line x1="312" y1="50" x2="312" y2="126" stroke="#fbbf24" stroke-width="1.2"/>
          <!-- CMOS Die inside cavity -->
          <rect x="108" y="72" width="144" height="16" rx="1.5" fill="#1d4ed8" stroke="#93c5fd" stroke-width="0.9"/>
          <text x="180" y="83" text-anchor="middle" font-size="7.3" font-weight="700" fill="#ffffff">36×24 mm フルサイズ CMOS ダイ</text>
          <!-- Wirebonds to stepped shelf -->
          <path d="M108,76 Q96,60 82,64" fill="none" stroke="#facc15" stroke-width="1.5"/>
          <path d="M252,76 Q264,60 278,64" fill="none" stroke="#facc15" stroke-width="1.5"/>
          <!-- Embedded CuW thermal slug under die -->
          <rect x="118" y="89" width="124" height="37" rx="1.5" fill="#b45309" stroke="#f59e0b" stroke-width="1"/>
          <text x="180" y="105" text-anchor="middle" font-size="7.4" font-weight="700" fill="#fffbeb">CuW80 背面放熱スラッグ</text>
          <text x="180" y="116.5" text-anchor="middle" font-size="6.6" fill="#fef3c7">低熱膨張・直通放熱コア</text>
          <!-- Bottom Ni/Au LGA pads -->
          ${[34, 48, 62, 76, 90, 104, 256, 270, 284, 298, 312, 326]
            .map((x) => `<rect x="${x - 4}" y="126" width="8" height="5" rx="1" fill="#eab308" stroke="#a16207" stroke-width="0.6"/>`)
            .join('')}
          <!-- Top & bottom spec pills -->
          ${pill(180, 38, 146, 15, '平坦度 < 5 µm · ヤング率 310 GPa', '#eff6ff', '#2563eb', '#1e40af', 6.9)}
          <text x="68" y="143" text-anchor="middle" font-size="7" font-weight="700" fill="#a16207">電解 Ni/Au LGA端子群</text>
          <text x="292" y="143" text-anchor="middle" font-size="7" font-weight="700" fill="#334155">12層一体焼成タングステン配線</text>
        `,
        caption: '高剛性310GPaの12層アルミナ筐体とCuWスラッグで、大判センサーを5µm未満の平坦度に維持',
      });

    // =========================================================================
    // S15 — CuW80 Thermal Slug & Nano-Ag Sintered Die-Attach (sensor_cuw_slug)
    // =========================================================================
    case 'sensor_cuw_slug':
      return sensorFrame({
        code: 'S15',
        title: 'CuW80 熱膨張整合スラッグ ＆ ナノ銀焼結接合',
        viewTag: '熱膨張整合図',
        accent: '#b45309',
        headerBg: '#fffbeb',
        body: `
          <!-- LEFT: Multi-layer thermal stack cutaway -->
          <rect x="14" y="32" width="166" height="112" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="97" y="45" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">ダイ直下 放熱・応力整合スタック</text>
          <rect x="28" y="53" width="138" height="20" rx="2" fill="#1d4ed8"/>
          <text x="97" y="65.5" text-anchor="middle" font-size="7.1" font-weight="700" fill="#ffffff">Si 撮像ダイ (CTE 2.6)</text>
          <rect x="28" y="75" width="138" height="14" rx="1.5" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>
          <text x="97" y="84.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a">ナノ銀焼結層 (k≈220 / 無ボイド)</text>
          <rect x="28" y="91" width="138" height="24" rx="2" fill="#b45309" stroke="#78350f"/>
          <text x="97" y="102" text-anchor="middle" font-size="7.2" font-weight="700" fill="#ffffff">CuW80 合金スラッグ</text>
          <text x="97" y="111.5" text-anchor="middle" font-size="6.4" fill="#fef3c7">W80% / Cu20% · k≈200 W/m·K</text>
          <rect x="28" y="117" width="138" height="16" rx="2" fill="#334155"/>
          <text x="97" y="127.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#e2e8f0">HTCC アルミナ筐体 (CTE 6.8)</text>
          <!-- RIGHT: CTE Bar Chart explaining why pure Cu warps silicon -->
          <rect x="188" y="32" width="160" height="112" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="268" y="45" text-anchor="middle" font-size="7.3" font-weight="700" fill="#92400e">線膨張係数 CTE 比較 (ppm/K)</text>
          <!-- Bar 1: Silicon -->
          <text x="195" y="64" font-size="6.9" font-weight="700" fill="#1e3a8a">Si 撮像ダイ</text>
          <rect x="254" y="56" width="14" height="10" rx="2" fill="#2563eb"/>
          <text x="272" y="64" font-size="6.9" font-weight="700" fill="#1e3a8a">2.6</text>
          <!-- Bar 2: Alumina -->
          <text x="195" y="82" font-size="6.9" font-weight="700" fill="#334155">Al₂O₃ 筐体</text>
          <rect x="254" y="74" width="36" height="10" rx="2" fill="#475569"/>
          <text x="294" y="82" font-size="6.9" font-weight="700" fill="#334155">6.8</text>
          <!-- Bar 3: CuW80 (MATCHED!) -->
          <text x="195" y="100" font-size="7" font-weight="800" fill="#b45309">CuW80 (整合)</text>
          <rect x="254" y="92" width="37" height="10" rx="2" fill="#d97706" stroke="#78350f" stroke-width="0.9"/>
          <text x="295" y="100" font-size="7" font-weight="800" fill="#b45309">7.0 ◎</text>
          <!-- Bar 4: Pure Copper (Too high -> warps die!) -->
          <text x="195" y="118" font-size="6.9" fill="#dc2626">純銅 (反り大)</text>
          <rect x="254" y="110" width="76" height="10" rx="2" fill="#fca5a5" stroke="#dc2626" stroke-width="0.8"/>
          <text x="333" y="118" font-size="6.8" font-weight="700" fill="#dc2626">17</text>
          <text x="268" y="136" text-anchor="middle" font-size="6.8" font-weight="700" fill="#059669">−20〜+65℃で平面度 ±2〜3µm 維持</text>
        `,
        caption: '純銅より低膨張なCuW80とナノ銀焼結が、8K発熱下でも像面の熱反り・片ボケを防止',
      });

    // =========================================================================
    // S16 — Multi-Layer Sensor Rigid PCB & Analog/Digital Isolation (sensor_pcb)
    // =========================================================================
    case 'sensor_pcb':
      return sensorFrame({
        code: 'S16',
        title: '8〜10層 センサー基板 ＆ アナログ/デジタル分離',
        viewTag: '基板レイアウト',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- PCB Substrate Outer Board -->
          <rect x="14" y="30" width="332" height="114" rx="6" fill="#064e3b" stroke="#022c22" stroke-width="1.3"/>
          <!-- Left Analog Island -->
          <rect x="22" y="38" width="112" height="98" rx="4" fill="#065f46" stroke="#34d399" stroke-width="1.2"/>
          <text x="78" y="51" text-anchor="middle" font-size="7.4" font-weight="800" fill="#a7f3d0">クリーン・アナログ島</text>
          <rect x="30" y="58" width="96" height="22" rx="3" fill="#047857" stroke="#6ee7b7"/>
          <text x="78" y="68" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffff">超低ノイズ LDO</text>
          <text x="78" y="77" text-anchor="middle" font-size="6.5" fill="#d1fae5">2.8V / 2.2V (画素用)</text>
          <!-- 0201 MLCC Decoupling row -->
          ${[34, 52, 70, 88, 106].map((x) => `<rect x="${x}" y="88" width="12" height="8" rx="1" fill="#d97706" stroke="#fde68a" stroke-width="0.6"/>`).join('')}
          <text x="78" y="108" text-anchor="middle" font-size="6.6" fill="#fde68a">直近 0201 MLCC アレイ</text>
          <rect x="30" y="114" width="96" height="15" rx="2.5" fill="#022c22" stroke="#10b981"/>
          <text x="78" y="124" text-anchor="middle" font-size="6.7" font-weight="700" fill="#6ee7b7">独立 AGND 基準面</text>
          <!-- Isolation Moat & 100Ω Differential Meander Traces in center -->
          <rect x="142" y="38" width="76" height="98" rx="4" fill="#022c22" stroke="#fbbf24" stroke-width="1" stroke-dasharray="3 2"/>
          <text x="180" y="51" text-anchor="middle" font-size="7" font-weight="700" fill="#fde047">100Ω 等長差動</text>
          <!-- Serpentine length-matched SLVS-EC differential pairs -->
          <path d="M148,66 H156 V60 H164 V72 H172 V60 H180 V72 H188 V60 H196 V72 H204 V66 H212" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
          <path d="M148,80 H156 V74 H164 V86 H172 V74 H180 V86 H188 V74 H196 V86 H204 V80 H212" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
          <text x="180" y="99" text-anchor="middle" font-size="6.5" fill="#bae6fd">メアンダ等長配線</text>
          <line x1="180" y1="106" x2="180" y2="128" stroke="#f59e0b" stroke-width="1.2"/>
          <circle cx="180" cy="128" r="3" fill="#facc15"/>
          <text x="180" y="121" text-anchor="middle" font-size="6.4" font-weight="700" fill="#fde047">1点スターGND</text>
          <!-- Right Digital Island -->
          <rect x="226" y="38" width="112" height="98" rx="4" fill="#1e293b" stroke="#60a5fa" stroke-width="1.2"/>
          <text x="282" y="51" text-anchor="middle" font-size="7.4" font-weight="800" fill="#93c5fd">高速デジタル島</text>
          <rect x="234" y="58" width="96" height="22" rx="3" fill="#1e3a8a" stroke="#60a5fa"/>
          <text x="282" y="68" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffff">Digital PMIC</text>
          <text x="282" y="77" text-anchor="middle" font-size="6.5" fill="#bfdbfe">1.2V / I/O 1.8V</text>
          <rect x="234" y="86" width="96" height="20" rx="3" fill="#334155" stroke="#94a3b8"/>
          <text x="282" y="98.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#f8fafc">水晶クロック ＆ 制御</text>
          <rect x="234" y="114" width="96" height="15" rx="2.5" fill="#0f172a" stroke="#3b82f6"/>
          <text x="282" y="124" text-anchor="middle" font-size="6.7" font-weight="700" fill="#93c5fd">独立 DGND 帰還面</text>
        `,
        caption: '8–10層ビルドアップ基板でアナログ電源とデジタル電源を完全分離し、横縞ノイズを根絶',
      });

    // =========================================================================
    // S17 — SLVS-EC v3 High-Speed Shielded Flex (slvs_fpc)
    // =========================================================================
    case 'slvs_fpc':
      return sensorFrame({
        code: 'S17',
        title: 'SLVS-EC v3 差動アイパターン ＆ U字フレキ',
        viewTag: '伝送・機構図',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- LEFT: Crisp SLVS-EC Eye Diagram (NO text colliding with curves!) -->
          <rect x="14" y="30" width="160" height="114" rx="5" fill="#0f172a" stroke="#334155"/>
          <text x="94" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#7dd3fc">SLVS-EC v3 アイパターン (10 Gbps/lane)</text>
          <!-- Grid -->
          <line x1="26" y1="84" x2="162" y2="84" stroke="#334155" stroke-width="0.8" stroke-dasharray="2 2"/>
          <!-- Open Eye curves -->
          <path d="M26,64 C46,64 56,104 76,104 L112,104 C132,104 142,64 162,64" fill="none" stroke="#38bdf8" stroke-width="2"/>
          <path d="M26,104 C46,104 56,64 76,64 L112,64 C132,64 142,104 162,104" fill="none" stroke="#38bdf8" stroke-width="2"/>
          <path d="M26,68 C48,68 58,100 76,100 L112,100 C130,100 140,68 162,68" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.6"/>
          <path d="M26,100 C48,100 58,68 76,68 L112,68 C130,68 140,100 162,100" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.6"/>
          <!-- Eye height measurement cleanly inside wide center -->
          <line x1="94" y1="70" x2="94" y2="98" stroke="#fde047" stroke-width="1.2" marker-start="url(#a-S17-amber)" marker-end="url(#a-S17-amber)"/>
          <rect x="74" y="78" width="40" height="12" rx="2" fill="#0f172a"/>
          <text x="94" y="86.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#fde047">200mV</text>
          <text x="94" y="122" text-anchor="middle" font-size="6.9" font-weight="700" fill="#a7f3d0">8b/10b 埋込クロック (スキューゼロ)</text>
          <text x="94" y="135" text-anchor="middle" font-size="6.6" fill="#cbd5e1">低振幅差動でEMI放射を極小化</text>
          <!-- RIGHT: Symmetric U-Loop Low-Stiffness Shielded FPC -->
          <rect x="184" y="30" width="164" height="114" rx="5" fill="#fff7ed" stroke="#fdba74"/>
          <text x="266" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#9a3412">IBIS低剛性 U字フレキシャルループ</text>
          <!-- Moving Sensor PCB -->
          <rect x="194" y="54" width="66" height="16" rx="2.5" fill="#065f46" stroke="#047857"/>
          <text x="227" y="64.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">IBIS可動基板</text>
          <!-- Bidirectional IBIS motion arrow -->
          <line x1="202" y1="78" x2="252" y2="78" stroke="#0284c7" stroke-width="1.4" marker-start="url(#a-S17-cyan)" marker-end="url(#a-S17-cyan)"/>
          <text x="227" y="88" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1">±5.5mm追従</text>
          <!-- Fixed Mainboard -->
          <rect x="194" y="102" width="66" height="16" rx="2.5" fill="#334155"/>
          <text x="227" y="112.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">固定メイン基板</text>
          <!-- U-loop shielded flex cable curving smoothly on right -->
          <path d="M260,62 L302,62 C332,62 332,110 302,110 L260,110" fill="none" stroke="#c2410c" stroke-width="7" stroke-linecap="round"/>
          <path d="M260,62 L302,62 C332,62 332,110 302,110 L260,110" fill="none" stroke="#fef08a" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="291" y="88.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#9a3412">EMI遮蔽</text>
          <text x="266" y="135" text-anchor="middle" font-size="6.8" font-weight="700" fill="#9a3412">ポリイミド極薄箔 · 反力ほぼゼロ</text>
        `,
        caption: '埋込クロック式10Gbps差動伝送と極薄U字ループで、IBIS浮上動作を妨げず超高速伝送',
      });

    // =========================================================================
    // S18 — Precision NTC Die-Temp Sensor & Dark Current Curve (sensor_temp_ntc)
    // =========================================================================
    case 'sensor_temp_ntc':
      return sensorFrame({
        code: 'S18',
        title: '高精度 NTC 温度計測 ＆ 暗電流リアルタイム補正',
        viewTag: '温度特性・補正',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- LEFT: Exponential Dark Current Graph (ZERO text overlap!) -->
          <rect x="14" y="30" width="164" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="96" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#991b1b">温度上昇と暗電流の指数増加</text>
          <!-- Axes -->
          <line x1="38" y1="122" x2="168" y2="122" stroke="#475569" stroke-width="1.1"/>
          <line x1="38" y1="52" x2="38" y2="122" stroke="#475569" stroke-width="1.1"/>
          <!-- Curve doubling every +6°C -->
          <path d="M40,119 C68,118 98,112 122,95 C140,82 152,66 162,53" fill="none" stroke="#dc2626" stroke-width="2.2"/>
          <!-- Highlight +6°C step -->
          <circle cx="116" cy="99" r="3" fill="#dc2626"/>
          <circle cx="144" cy="76" r="3" fill="#dc2626"/>
          <line x1="116" y1="99" x2="144" y2="99" stroke="#f97316" stroke-width="1" stroke-dasharray="2 2"/>
          <line x1="144" y1="99" x2="144" y2="76" stroke="#f97316" stroke-width="1" stroke-dasharray="2 2"/>
          <!-- Formula pill placed in open upper-left space -->
          ${pill(84, 65, 82, 16, 'I_dark ∝ 2^(ΔT/6℃)', '#fef2f2', '#ef4444', '#b91c1c', 7)}
          <text x="155" y="106" text-anchor="end" font-size="6.6" font-weight="700" fill="#c2410c">+6℃で2倍!</text>
          <text x="103" y="135" text-anchor="middle" font-size="6.8" fill="#475569">センサー温度 T (℃) →</text>
          <text x="33" y="59" text-anchor="end" font-size="6.4" fill="#475569">大</text>
          <text x="33" y="121" text-anchor="end" font-size="6.4" fill="#475569">小</text>
          <!-- RIGHT: Real-time NTC Calibration Pipeline -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#fff7ed" stroke="#fdba74"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#9a3412">±0.1℃ 常時監視フィードバック</text>
          <rect x="200" y="51" width="136" height="20" rx="3" fill="#ffffff" stroke="#dc2626" stroke-width="1.1"/>
          <text x="268" y="63.5" text-anchor="middle" font-size="7" font-weight="700" fill="#991b1b">HTCC熱結合 薄膜NTC (±0.1℃)</text>
          <line x1="268" y1="71" x2="268" y2="83" stroke="#ea580c" stroke-width="1.6" marker-end="url(#a-S18-amber)"/>
          <rect x="200" y="85" width="136" height="19" rx="3" fill="#1e3a8a"/>
          <text x="268" y="97" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffff">24-bit Σ-Δ ADC (0.01℃分解能)</text>
          <line x1="268" y1="104" x2="268" y2="115" stroke="#1e3a8a" stroke-width="1.6" marker-end="url(#a-S18-blue)"/>
          <rect x="200" y="117" width="136" height="20" rx="3" fill="#dcfce7" stroke="#059669"/>
          <text x="268" y="129.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#065f46">暗電流オフセット補正 ＆ 8K熱保護</text>
        `,
        caption: 'ダイ直近温度を±0.1℃精度で常時計測し、6℃で倍増する暗電流ムラと黒浮きを精密補正',
      });

    // =========================================================================
    // S19 — 5-Axis IBIS Floating Magnesium Stage (ibis_vcm)
    // =========================================================================
    case 'ibis_vcm':
      return sensorFrame({
        code: 'S19',
        title: '5軸IBIS マグネシウム可動ステージ ＆ 3自由度制御',
        viewTag: '5軸制御上面図',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Outer Fixed Chassis boundary -->
          <rect x="22" y="30" width="196" height="114" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-dasharray="4 3"/>
          <!-- Topology-optimized Die-Cast Magnesium Floating Stage -->
          <rect x="52" y="42" width="136" height="84" rx="6" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
          <!-- Central thermal window + 36x24 sensor footprint -->
          <rect x="82" y="56" width="76" height="54" rx="3" fill="#1e3a8a" stroke="#0f172a" stroke-width="1"/>
          <text x="120" y="79" text-anchor="middle" font-size="7.4" font-weight="700" fill="#ffffff">36×24 撮像部</text>
          <text x="120" y="90" text-anchor="middle" font-size="6.4" fill="#93c5fd">中央Σ放熱窓</text>
          <!-- Roll curved arrows inside stage corners -->
          <path d="M62,62 A18,18 0 0,1 74,48" fill="none" stroke="#7c3aed" stroke-width="1.6" marker-end="url(#a-S19-purple)"/>
          <path d="M178,104 A18,18 0 0,1 166,118" fill="none" stroke="#7c3aed" stroke-width="1.6" marker-end="url(#a-S19-purple)"/>
          <!-- VCM Y1 (Left) -->
          <rect x="30" y="56" width="16" height="48" rx="3" fill="#ea580c" stroke="#9a3412"/>
          <text x="38" y="83" text-anchor="middle" font-size="6.9" font-weight="800" fill="#ffffff">Y1</text>
          <line x1="38" y1="53" x2="38" y2="39" stroke="#dc2626" stroke-width="1.7" marker-end="url(#a-S19-red)"/>
          <!-- VCM Y2 (Right) -->
          <rect x="194" y="56" width="16" height="48" rx="3" fill="#ea580c" stroke="#9a3412"/>
          <text x="202" y="83" text-anchor="middle" font-size="6.9" font-weight="800" fill="#ffffff">Y2</text>
          <line x1="202" y1="107" x2="202" y2="121" stroke="#dc2626" stroke-width="1.7" marker-end="url(#a-S19-red)"/>
          <!-- VCM X1 (Bottom) -->
          <rect x="94" y="128" width="52" height="12" rx="3" fill="#0284c7" stroke="#0369a1"/>
          <text x="120" y="136.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#ffffff">X1 駆動</text>
          <line x1="150" y1="134" x2="174" y2="134" stroke="#0284c7" stroke-width="1.7" marker-end="url(#a-S19-cyan)"/>
          <!-- Right control truth-table card -->
          <rect x="228" y="30" width="120" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="288" y="44" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0f172a">3基VCM → 5軸補正</text>
          <rect x="236" y="51" width="104" height="22" rx="3" fill="#f0f9ff" stroke="#7dd3fc"/>
          <text x="288" y="61" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0369a1">X1 単独駆動</text>
          <text x="288" y="70" text-anchor="middle" font-size="6.5" fill="#334155">→ 左右シフト + Yaw</text>
          <rect x="236" y="77" width="104" height="22" rx="3" fill="#fff7ed" stroke="#fdba74"/>
          <text x="288" y="87" text-anchor="middle" font-size="6.9" font-weight="700" fill="#c2410c">Y1・Y2 同相駆動</text>
          <text x="288" y="96" text-anchor="middle" font-size="6.5" fill="#334155">→ 上下シフト + Pitch</text>
          <rect x="236" y="103" width="104" height="22" rx="3" fill="#f5f3ff" stroke="#c4b5fd"/>
          <text x="288" y="113" text-anchor="middle" font-size="6.9" font-weight="700" fill="#6d28d9">Y1・Y2 逆相駆動</text>
          <text x="288" y="122" text-anchor="middle" font-size="6.5" fill="#334155">→ 光軸回転 (Roll)</text>
          <text x="288" y="138" text-anchor="middle" font-size="6.7" font-weight="700" fill="#059669">固有共振 &gt;500Hz · 8.5段</text>
        `,
        caption: '高剛性Mg浮遊ステージをY1/Y2/X1の3基VCMで自在駆動し、並進＋回転の5軸ブレを相殺',
      });

    // =========================================================================
    // S20 — Front Soft-Iron Flux-Closing Yoke Plate (sensor_front_yoke)
    // =========================================================================
    case 'sensor_front_yoke':
      return sensorFrame({
        code: 'S20',
        title: '前面 軟鉄フラックス閉鎖ヨーク（両面磁気ギャップ）',
        viewTag: '閉磁気回路比較',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- LEFT: Open Magnetic Circuit (leaking upward, weak field) -->
          <rect x="14" y="30" width="154" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="91" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#64748b">片側開放（前面ヨークなし）</text>
          <!-- Spreading weak leakage lines -->
          <path d="M62,92 C52,52 130,52 120,92" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 2"/>
          <path d="M54,92 C36,44 146,44 128,92" fill="none" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 2"/>
          <text x="91" y="57" text-anchor="middle" font-size="6.6" fill="#dc2626">上方へ磁束が拡散・漏洩</text>
          <!-- VCM Coil -->
          <rect x="52" y="74" width="78" height="12" rx="2" fill="#fed7aa" stroke="#ea580c"/>
          <text x="91" y="82.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#9a3412">VCMコイル (磁束弱)</text>
          <!-- N / S magnets & Back yoke -->
          <rect x="46" y="92" width="43" height="16" fill="#ef4444"/><text x="67.5" y="103" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">N</text>
          <rect x="93" y="92" width="43" height="16" fill="#2563eb"/><text x="114.5" y="103" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">S</text>
          <rect x="42" y="108" width="98" height="10" fill="#475569"/>
          <text x="91" y="133" text-anchor="middle" font-size="6.8" fill="#64748b">推力効率低 · シャッターへ漏磁</text>
          <!-- Arrow -->
          <line x1="170" y1="86" x2="184" y2="86" stroke="#0284c7" stroke-width="2" marker-end="url(#a-S20-cyan)"/>
          <!-- RIGHT: Closed Dual-Yoke Air Gap (1.7x B, -65% heat) -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.1"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#1e40af">閉磁気回路（前面軟鉄ヨーク付）</text>
          <!-- Front Soft-Iron Yoke Plate (closes loop cleanly!) -->
          <rect x="214" y="54" width="108" height="12" rx="1.5" fill="#334155" stroke="#0f172a"/>
          <text x="268" y="62.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#fde047">前面 閉鎖ヨーク (漏磁ゼロ)</text>
          <!-- Dense vertical flux arrows right through VCM coil -->
          <line x1="234" y1="92" x2="234" y2="68" stroke="#f59e0b" stroke-width="1.9" marker-end="url(#a-S20-amber)"/>
          <line x1="250" y1="92" x2="250" y2="68" stroke="#f59e0b" stroke-width="1.9" marker-end="url(#a-S20-amber)"/>
          <line x1="286" y1="66" x2="286" y2="90" stroke="#f59e0b" stroke-width="1.9" marker-end="url(#a-S20-amber)"/>
          <line x1="302" y1="66" x2="302" y2="90" stroke="#f59e0b" stroke-width="1.9" marker-end="url(#a-S20-amber)"/>
          <!-- VCM Coil inside concentrated gap -->
          <rect x="224" y="74" width="88" height="12" rx="2" fill="#ea580c" opacity="0.88" stroke="#7c2d12"/>
          <text x="268" y="82.5" text-anchor="middle" font-size="6.7" font-weight="800" fill="#ffffff">VCMコイル (B × 1.7倍)</text>
          <!-- N / S magnets & Back yoke -->
          <rect x="220" y="92" width="46" height="16" fill="#ef4444"/><text x="243" y="103" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">N</text>
          <rect x="270" y="92" width="46" height="16" fill="#2563eb"/><text x="293" y="103" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">S</text>
          <rect x="214" y="108" width="108" height="10" fill="#334155"/>
          <text x="268" y="115.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#e2e8f0">背面 軟鉄ヨーク</text>
          <text x="268" y="135" text-anchor="middle" font-size="7" font-weight="700" fill="#059669">磁束1.7倍集中 · 発熱 −65% 省電力</text>
        `,
        caption: '前面軟鉄ヨークで磁気回路を閉じ、コイル貫通磁束を1.7倍化して発熱65%減と磁気遮蔽を両立',
      });

    // =========================================================================
    // S21 — Air-Core Flat Copper VCM Coils & Lorentz Force (sensor_vcm_coils)
    // =========================================================================
    case 'sensor_vcm_coils':
      return sensorFrame({
        code: 'S21',
        title: '空芯平面ボイスコイル ＆ ローレンツ力推力原理',
        viewTag: '電磁気原理断面',
        accent: '#c2410c',
        headerBg: '#fff7ed',
        body: `
          <!-- Top Front Yoke -->
          <rect x="24" y="28" width="206" height="11" rx="2" fill="#334155"/>
          <text x="127" y="36" text-anchor="middle" font-size="6.7" font-weight="700" fill="#e2e8f0">前面閉鎖ヨーク</text>
          <!-- Magnetic flux arrows B (Left: upward from N, Right: downward into S) -->
          <line x1="68" y1="98" x2="68" y2="42" stroke="#3b82f6" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-S21-blue)"/>
          <line x1="186" y1="41" x2="186" y2="96" stroke="#3b82f6" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-S21-blue)"/>
          <text x="42" y="54" font-size="7.2" font-weight="800" fill="#1d4ed8">B ↑</text>
          <text x="200" y="54" font-size="7.2" font-weight="800" fill="#1d4ed8">B ↓</text>
          <!-- Air-Core Flat Copper Coil Cross-Section (Left bundle: I into page ⊗, Right bundle: I out ⊙) -->
          <rect x="48" y="61" width="40" height="22" rx="3" fill="#ea580c" stroke="#7c2d12" stroke-width="1.2"/>
          <circle cx="68" cy="72" r="6.5" fill="#fff7ed" stroke="#9a3412" stroke-width="1.1"/>
          <line x1="64" y1="68" x2="72" y2="76" stroke="#9a3412" stroke-width="1.4"/>
          <line x1="72" y1="68" x2="64" y2="76" stroke="#9a3412" stroke-width="1.4"/>
          <rect x="166" y="61" width="40" height="22" rx="3" fill="#ea580c" stroke="#7c2d12" stroke-width="1.2"/>
          <circle cx="186" cy="72" r="6.5" fill="#fff7ed" stroke="#9a3412" stroke-width="1.1"/>
          <circle cx="186" cy="72" r="2.5" fill="#9a3412"/>
          <!-- Hollow air core bridge (NO iron core -> zero cogging!) -->
          <rect x="88" y="67" width="78" height="10" fill="#fef3c7" stroke="#d97706" stroke-width="0.9" stroke-dasharray="3 2"/>
          <text x="127" y="74.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#92400e">空芯（鉄心なし）</text>
          <!-- Resulting additive Lorentz Force arrows pointing right -->
          <text x="127" y="48.5" text-anchor="middle" font-size="7" font-weight="800" fill="#dc2626">推力 F (左右両辺が同方向加算!)</text>
          <line x1="94" y1="55.5" x2="158" y2="55.5" stroke="#dc2626" stroke-width="2.4" marker-end="url(#a-S21-red)"/>
          <!-- Bottom Dual-Pole N52 Magnets -->
          <rect x="36" y="99" width="88" height="20" rx="2" fill="#ef4444"/><text x="80" y="112" text-anchor="middle" font-size="8" font-weight="800" fill="#ffffff">N52 磁石 (N極)</text>
          <rect x="130" y="99" width="88" height="20" rx="2" fill="#2563eb"/><text x="174" y="112" text-anchor="middle" font-size="8" font-weight="800" fill="#ffffff">N52 磁石 (S極)</text>
          <rect x="24" y="119" width="206" height="11" rx="2" fill="#334155"/>
          <text x="127" y="127" text-anchor="middle" font-size="6.7" font-weight="700" fill="#e2e8f0">背面 軟鉄バックヨーク</text>
          <!-- Right physics spec card -->
          <rect x="240" y="32" width="108" height="108" rx="5" fill="#ffffff" stroke="#fdba74"/>
          <text x="294" y="46" text-anchor="middle" font-size="7.3" font-weight="700" fill="#9a3412">ローレンツ駆動式</text>
          ${pill(294, 65, 96, 18, 'F = N·I·(L × B)', '#fef2f2', '#dc2626', '#991b1b', 7.3)}
          <text x="294" y="88" text-anchor="middle" font-size="6.9" font-weight="700" fill="#334155">⊗ 電流奥 / ⊙ 電流手前</text>
          <text x="294" y="102" text-anchor="middle" font-size="6.8" fill="#059669">・鉄心ゼロ→コギング皆無</text>
          <text x="294" y="115" text-anchor="middle" font-size="6.8" fill="#0369a1">・平角無酸素銅で高占積</text>
          <text x="294" y="128" text-anchor="middle" font-size="6.8" fill="#475569">・数kHz PWM閉ループ制御</text>
        `,
        caption: 'N/S磁極上で往復電流に同方向のローレンツ力が働き、歯車・鉄心ゼロでミリ秒未満制御',
      });

    // =========================================================================
    // S22 — 3-Axis Sub-Micron Hall Position Sensor (sensor_hall_pcb)
    // =========================================================================
    case 'sensor_hall_pcb':
      return sensorFrame({
        code: 'S22',
        title: '3軸 ホール効果位置センサー（分解能 < 0.1 µm）',
        viewTag: '位置検出原理',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- LEFT: Hall IC riding over N/S Magnet Boundary inside Air-Core Coil -->
          <rect x="14" y="30" width="164" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="96" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#065f46">コイル中央空洞のホールIC配置</text>
          <!-- Coil cross-sections flanking Hall IC -->
          <rect x="24" y="58" width="26" height="20" rx="2" fill="#ea580c"/>
          <text x="37" y="70.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">コイル</text>
          <rect x="142" y="58" width="26" height="20" rx="2" fill="#ea580c"/>
          <text x="155" y="70.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">コイル</text>
          <!-- Hall IC cleanly centered with generous width -->
          <rect x="64" y="54" width="64" height="24" rx="3" fill="#059669" stroke="#064e3b" stroke-width="1.2"/>
          <text x="96" y="65" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">Hall IC</text>
          <text x="96" y="74" text-anchor="middle" font-size="6.2" fill="#d1fae5">InSb / GaAs</text>
          <!-- Motion Δx arrow -->
          <line x1="68" y1="87" x2="124" y2="87" stroke="#0f172a" stroke-width="1.4" marker-start="url(#a-S22-slate)" marker-end="url(#a-S22-slate)"/>
          <text x="96" y="96.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a">ステージ変位 Δx</text>
          <!-- Dual-pole N/S magnet below -->
          <rect x="26" y="102" width="68" height="20" rx="2" fill="#ef4444"/><text x="60" y="115" text-anchor="middle" font-size="7.6" font-weight="800" fill="#ffffff">N 極 (+B)</text>
          <rect x="98" y="102" width="68" height="20" rx="2" fill="#2563eb"/><text x="132" y="115" text-anchor="middle" font-size="7.6" font-weight="800" fill="#ffffff">S 極 (−B)</text>
          <line x1="96" y1="80" x2="96" y2="124" stroke="#64748b" stroke-width="0.9" stroke-dasharray="2 2"/>
          <text x="96" y="136" text-anchor="middle" font-size="6.7" font-weight="700" fill="#065f46">N/S境界の急峻な磁場勾配を非接触検出</text>
          <!-- RIGHT: Linear Hall Voltage vs Displacement Plot -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#ffffff" stroke="#86efac"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#065f46">ホール出力電圧 V_H (直線領域)</text>
          <!-- Axes crossing at center -->
          <line x1="202" y1="88" x2="334" y2="88" stroke="#64748b" stroke-width="1"/>
          <line x1="268" y1="52" x2="268" y2="124" stroke="#64748b" stroke-width="1"/>
          <!-- Linear zone highlight -->
          <rect x="234" y="58" width="68" height="60" fill="#dcfce7" opacity="0.5"/>
          <!-- S-curve with dead-linear center -->
          <path d="M206,116 C220,116 232,112 240,104 L296,72 C304,64 316,60 330,60" fill="none" stroke="#059669" stroke-width="2.2"/>
          <text x="328" y="84" text-anchor="end" font-size="6.6" fill="#475569">+Δx</text>
          <text x="204" y="84" font-size="6.6" fill="#475569">−Δx</text>
          <text x="273" y="58" font-size="6.6" font-weight="700" fill="#059669">+V_H</text>
          ${pill(268, 134, 138, 15, '分解能 <0.1µm (0.006°) · 摩耗ゼロ', '#ecfdf5', '#059669', '#065f46', 6.8)}
        `,
        caption: 'N/S磁極境界の急峻な磁場変化をホール電圧へ変換し、非接触で0.1µm未満の位置を常時監視',
      });

    // =========================================================================
    // S23 — Kinematic 3-Point Si3N4 Ceramic Balls (ceramic_balls)
    // =========================================================================
    case 'ceramic_balls':
      return sensorFrame({
        code: 'S23',
        title: '3点 窒化ケイ素 (Si₃N₄) セラミック球 ＆ 焼入れレース',
        viewTag: 'キネマティック支持',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- LEFT: Top-down 3-Point Kinematic Triangle -->
          <rect x="14" y="30" width="122" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="75" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">3点平面拘束 (上面図)</text>
          <polygon points="75,56 36,118 114,118" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="3 2"/>
          <circle cx="75" cy="56" r="7" fill="#1e293b" stroke="#94a3b8" stroke-width="1.2"/>
          <circle cx="36" cy="118" r="7" fill="#1e293b" stroke="#94a3b8" stroke-width="1.2"/>
          <circle cx="114" cy="118" r="7" fill="#1e293b" stroke="#94a3b8" stroke-width="1.2"/>
          <circle cx="73" cy="54" r="2" fill="#cbd5e1"/>
          <circle cx="34" cy="116" r="2" fill="#cbd5e1"/>
          <circle cx="112" cy="116" r="2" fill="#cbd5e1"/>
          <text x="75" y="96" text-anchor="middle" font-size="7" font-weight="700" fill="#0369a1">ガタゼロ</text>
          <text x="75" y="106" text-anchor="middle" font-size="6.6" fill="#0369a1">一意平面</text>
          <text x="75" y="137" text-anchor="middle" font-size="6.7" font-weight="700" fill="#334155">3脚イス原理でチルト皆無</text>
          <!-- RIGHT: Side Cutaway under Magnetic Preload -->
          <rect x="144" y="30" width="204" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="246" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">断面構造：磁気予圧 × 超低摩擦転がり</text>
          <!-- Movable carrier -->
          <rect x="160" y="54" width="172" height="14" rx="2" fill="#cbd5e1" stroke="#475569"/>
          <text x="246" y="63.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0f172a">可動キャリア (XY / Roll 自由滑走)</text>
          <!-- Upper hardened races -->
          <rect x="176" y="68" width="32" height="4" fill="#64748b"/>
          <rect x="284" y="68" width="32" height="4" fill="#64748b"/>
          <!-- Si3N4 Ceramic Balls -->
          <circle cx="192" cy="84" r="11" fill="#1e293b" stroke="#0f172a" stroke-width="1.2"/>
          <circle cx="188" cy="80" r="3" fill="#94a3b8" opacity="0.65"/>
          <circle cx="300" cy="84" r="11" fill="#1e293b" stroke="#0f172a" stroke-width="1.2"/>
          <circle cx="296" cy="80" r="3" fill="#94a3b8" opacity="0.65"/>
          <!-- Lower hardened races -->
          <rect x="176" y="95" width="32" height="4" fill="#64748b"/>
          <rect x="284" y="95" width="32" height="4" fill="#64748b"/>
          <!-- Fixed base chassis -->
          <rect x="160" y="99" width="172" height="14" rx="2" fill="#475569"/>
          <text x="246" y="108.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#ffffff">IBIS固定ベースシャーシ</text>
          <!-- Clean center magnetic preload arrows (NO text collision!) -->
          <line x1="224" y1="71" x2="224" y2="94" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-S23-blue)"/>
          <line x1="268" y1="71" x2="268" y2="94" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-S23-blue)"/>
          <text x="246" y="81" text-anchor="middle" font-size="6.9" font-weight="800" fill="#1d4ed8">磁気予圧</text>
          <text x="246" y="91" text-anchor="middle" font-size="6.5" font-weight="700" fill="#1d4ed8">F_preload</text>
          <text x="246" y="126" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">真球度 0.1µm · 硬度 1,500 HV · 非磁性</text>
          <text x="246" y="137" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">全ストロークで光軸チルト誤差 &lt; 1.0 µm</text>
        `,
        caption: '非磁性・超高硬度Si₃N₄球の3点支持と磁気予圧で、Z軸ガタゼロのまま滑らかに平面転動',
      });

    // =========================================================================
    // S24 — Magnetic Preload Plates & CuW Counterbalance (sensor_preload_plates)
    // =========================================================================
    case 'sensor_preload_plates':
      return sensorFrame({
        code: 'S24',
        title: '磁気プリロード吸引板 ＆ 重心バランスウェイト',
        viewTag: '力学的釣合図',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Movable Stage with CuW Counterbalance on left & Preload Iron Plates on bottom -->
          <rect x="34" y="42" width="218" height="22" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
          <!-- CuW Counterbalance Weight on left end -->
          <rect x="34" y="42" width="46" height="22" rx="3" fill="#b45309" stroke="#78350f" stroke-width="1.2"/>
          <text x="57" y="55.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#fffbeb">CuWおもり</text>
          <!-- Sensor optical center / CoG marker -->
          <circle cx="152" cy="53" r="6" fill="none" stroke="#dc2626" stroke-width="1.4"/>
          <line x1="146" y1="53" x2="158" y2="53" stroke="#dc2626" stroke-width="1.1"/>
          <line x1="152" y1="47" x2="152" y2="59" stroke="#dc2626" stroke-width="1.1"/>
          <text x="196" y="55.5" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">重心 CoG 一致</text>
          <!-- Ferromagnetic soft-iron preload plates attached under stage -->
          <rect x="92" y="64" width="48" height="7" fill="#334155"/>
          <rect x="184" y="64" width="48" height="7" fill="#334155"/>
          <!-- Ceramic balls flanking -->
          <circle cx="72" cy="82" r="9.5" fill="#1e293b" stroke="#0f172a"/>
          <circle cx="242" cy="82" r="9.5" fill="#1e293b" stroke="#0f172a"/>
          <!-- Magnetic attraction downward arrows (Z-preload) -->
          <line x1="116" y1="73" x2="116" y2="96" stroke="#2563eb" stroke-width="2" marker-end="url(#a-S24-blue)"/>
          <line x1="208" y1="73" x2="208" y2="96" stroke="#2563eb" stroke-width="2" marker-end="url(#a-S24-blue)"/>
          ${pill(162, 84, 70, 15, '磁気吸引予圧', '#dbeafe', '#2563eb', '#1e40af', 6.9)}
          <!-- Fixed N52 magnets & chassis -->
          <rect x="92" y="100" width="48" height="14" rx="2" fill="#ef4444"/><text x="116" y="109.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#ffffff">N52 磁石</text>
          <rect x="184" y="100" width="48" height="14" rx="2" fill="#2563eb"/><text x="208" y="109.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#ffffff">N52 磁石</text>
          <rect x="34" y="114" width="218" height="14" rx="3" fill="#475569"/>
          <text x="143" y="123.5" text-anchor="middle" font-size="7" font-weight="700" fill="#f8fafc">固定ベースシャーシ（全姿勢で球へ密着保持）</text>
          <!-- Right: All-attitude benefit card -->
          <rect x="262" y="34" width="88" height="106" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="306" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#1e40af">全姿勢ゼロガタ</text>
          <text x="306" y="65" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">↓ 真下向き撮影</text>
          <text x="306" y="76" text-anchor="middle" font-size="6.5" fill="#059669">重力に勝つ磁気予圧</text>
          <text x="306" y="94" text-anchor="middle" font-size="6.8" font-weight="700" fill="#b45309">⚖ 重心バランス</text>
          <text x="306" y="105" text-anchor="middle" font-size="6.5" fill="#475569">Roll回転慣性モーメント</text>
          <text x="306" y="115" text-anchor="middle" font-size="6.5" fill="#475569">最小化・バネ反力ゼロ</text>
          <text x="306" y="132" text-anchor="middle" font-size="6.6" font-weight="700" fill="#2563eb">片ボケ・垂れ下がり0</text>
        `,
        caption: '軟鉄板×N52磁石の磁気予圧とCuWおもりで、真下向き撮影でも焦点面垂れと横抵抗をゼロ化',
      });

    // =========================================================================
    // S25 — 4-Corner Progressive Elastomer Stoppers (sensor_ibis_stoppers)
    // =========================================================================
    case 'sensor_ibis_stoppers':
      return sensorFrame({
        code: 'S25',
        title: '4隅 プログレッシブ・エラストマー緩衝ストッパー',
        viewTag: '配置・緩衝特性',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- LEFT: 4-corner frame layout -->
          <rect x="14" y="30" width="152" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="90" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">IBIS 4隅 対称ガード配置</text>
          <!-- Outer frame -->
          <rect x="28" y="51" width="124" height="72" rx="6" fill="#e2e8f0" stroke="#475569" stroke-width="1.2"/>
          <!-- Inner movable stage -->
          <rect x="48" y="64" width="84" height="46" rx="4" fill="#dbeafe" stroke="#2563eb" stroke-width="1.2"/>
          <text x="90" y="84" text-anchor="middle" font-size="7.1" font-weight="700" fill="#1e40af">IBIS可動枠</text>
          <text x="90" y="95" text-anchor="middle" font-size="6.5" fill="#1d4ed8">±5.5mm / ±3.0°</text>
          <!-- 4 corner tapered elastomer bumpers -->
          <polygon points="32,55 47,55 44,67 32,67" fill="#f59e0b" stroke="#b45309"/>
          <polygon points="148,55 133,55 136,67 148,67" fill="#f59e0b" stroke="#b45309"/>
          <polygon points="32,119 47,119 44,107 32,107" fill="#f59e0b" stroke="#b45309"/>
          <polygon points="148,119 133,119 136,107 148,107" fill="#f59e0b" stroke="#b45309"/>
          <text x="90" y="136" text-anchor="middle" font-size="6.8" font-weight="700" fill="#b45309">Shore A 45 低反発エラストマー ×4</text>
          <!-- RIGHT: Progressive Nonlinear Damping Curve -->
          <rect x="176" y="30" width="172" height="114" rx="5" fill="#ffffff" stroke="#fde68a"/>
          <text x="262" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#92400e">テーパー断面 非線形ソフト緩衝特性</text>
          <!-- Mini tapered bumper icon -->
          <polygon points="190,66 206,58 206,74" fill="#f59e0b" stroke="#b45309"/>
          <text x="198" y="84" text-anchor="middle" font-size="6.3" font-weight="700" fill="#b45309">先端細</text>
          <!-- Graph axes -->
          <line x1="222" y1="118" x2="338" y2="118" stroke="#64748b" stroke-width="1"/>
          <line x1="222" y1="52" x2="222" y2="118" stroke="#64748b" stroke-width="1"/>
          <!-- Hard stop (dashed vertical spike) -->
          <path d="M222,118 L302,118 L306,56" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="3 2"/>
          <!-- Progressive elastomer curve (smooth J-curve) -->
          <path d="M222,118 C258,117 288,112 310,92 C322,80 328,66 333,55" fill="none" stroke="#d97706" stroke-width="2.3"/>
          <text x="256" y="70" text-anchor="middle" font-size="6.6" fill="#64748b">金属直当て</text>
          <text x="256" y="79" text-anchor="middle" font-size="6.5" fill="#dc2626">(衝撃大・音大)</text>
          <text x="280" y="132" text-anchor="middle" font-size="6.8" font-weight="700" fill="#b45309">圧縮量 → ソフト減速＆静音停止</text>
        `,
        caption: '4隅のテーパー型高減衰エラストマーが可動端衝撃を滑らかに吸収し、セラミック球割れを防止',
      });

    // =========================================================================
    // S26 — Power-Off Mechanical IBIS Park-Lock (sensor_ibis_lock)
    // =========================================================================
    case 'sensor_ibis_lock':
      return sensorFrame({
        code: 'S26',
        title: '電源OFF時 メカニカルIBISパークロック機構',
        viewTag: 'ON/OFF動作比較',
        accent: '#0f766e',
        headerBg: '#f0fdfa',
        body: `
          <!-- LEFT: Power ON (Unlocked, Free Floating) -->
          <rect x="14" y="30" width="160" height="114" rx="5" fill="#f0f9ff" stroke="#7dd3fc"/>
          ${pill(94, 43, 126, 15, '電源 ON：解放 (< 15 ms)', '#dbeafe', '#2563eb', '#1e40af', 7.1)}
          <!-- Pulse solenoid energized -->
          <rect x="24" y="64" width="44" height="34" rx="3" fill="#0284c7" stroke="#0369a1"/>
          <text x="46" y="79" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">ソレノイド</text>
          <text x="46" y="90" text-anchor="middle" font-size="6.3" fill="#bae6fd">励磁吸引</text>
          <!-- Retracted tapered pin -->
          <polygon points="68,75 96,75 106,81 96,87 68,87" fill="#64748b" stroke="#334155"/>
          <line x1="94" y1="68" x2="74" y2="68" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-S26-blue)"/>
          <!-- Floating IBIS stage with V-notch cleanly separated -->
          <path d="M126,58 L164,58 L164,104 L126,104 L126,90 L138,81 L126,72 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
          <text x="147" y="83.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0f172a">可動枠</text>
          <line x1="146" y1="108" x2="146" y2="122" stroke="#0284c7" stroke-width="1.4" marker-start="url(#a-S26-cyan)" marker-end="url(#a-S26-cyan)"/>
          <text x="94" y="135" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">非接触浮遊 → 5軸8.5段補正動作</text>
          <!-- RIGHT: Power OFF (Mechanical Taper-Pin Clamp, 0 mW) -->
          <rect x="186" y="30" width="162" height="114" rx="5" fill="#f0fdfa" stroke="#2dd4bf" stroke-width="1.1"/>
          ${pill(267, 43, 134, 15, '電源 OFF：機械ロック (0 mW)', '#ccfbf1', '#0f766e', '#115e59', 7.1)}
          <!-- De-energized solenoid + return spring pushing right -->
          <rect x="196" y="64" width="40" height="34" rx="3" fill="#64748b" stroke="#334155"/>
          <text x="216" y="79" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">無通電</text>
          <text x="216" y="90" text-anchor="middle" font-size="6.3" fill="#e2e8f0">0 mW</text>
          <!-- Spring zig-zag -->
          <polyline points="236,81 241,75 246,87 251,75 256,87 261,81" fill="none" stroke="#d97706" stroke-width="1.6"/>
          <!-- Tapered pin fully seated into V-notch! -->
          <polygon points="261,74 294,74 308,81 294,88 261,88" fill="#0f766e" stroke="#115e59" stroke-width="1.1"/>
          <line x1="258" y1="66" x2="282" y2="66" stroke="#0f766e" stroke-width="1.6" marker-end="url(#a-S26-green)"/>
          <!-- Clamped IBIS stage -->
          <path d="M294,58 L338,58 L338,104 L294,104 L294,89 L308,81 L294,73 Z" fill="#cbd5e1" stroke="#0f766e" stroke-width="1.3"/>
          <text x="322" y="83.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0f172a">固定</text>
          <text x="267" y="120" text-anchor="middle" font-size="6.8" font-weight="700" fill="#b45309">復帰ばねでテーパーピンを自動圧入</text>
          <text x="267" y="135" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f766e">搬送振動・落下衝撃からセンサーを完全保護</text>
        `,
        caption: '電源OFFで無通電0mWのままテーパーピンが自動噛合し、携帯時の振動・衝撃からIBISを固定',
      });

    // =========================================================================
    // S27 — Dual-Pole N52 NdFeB Magnets & Back Yoke (sensor_n52_magnets)
    // (Explicitly fixes the old "S52" typo -> proper N52 N-pole & S-pole!)
    // =========================================================================
    case 'sensor_n52_magnets':
      return sensorFrame({
        code: 'S27',
        title: 'N52 2極ネオジム磁石アレイ ＆ 閉磁気軟鉄ヨーク',
        viewTag: '磁気回路断面',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- Closed Magnetic Circuit Flux Loops -->
          <path d="M84,86 C84,42 186,42 186,86" fill="none" stroke="#f59e0b" stroke-width="2.2" marker-end="url(#a-S27-amber)"/>
          <path d="M108,86 C108,56 162,56 162,86" fill="none" stroke="#f59e0b" stroke-width="1.8" marker-end="url(#a-S27-amber)"/>
          <!-- VCM Coil riding in air gap -->
          <rect x="64" y="54" width="142" height="16" rx="3" fill="#ea580c" stroke="#7c2d12" stroke-width="1.1"/>
          <text x="135" y="64.5" text-anchor="middle" font-size="7.1" font-weight="800" fill="#ffffff">VCM 往復銅コイル (推力2倍加算)</text>
          <!-- Dual-Pole N52 Magnets (N-up on left, S-down on right) with Ni-Cu-Ni plating -->
          <rect x="52" y="84" width="76" height="28" rx="2.5" fill="#ef4444" stroke="#94a3b8" stroke-width="2"/>
          <text x="90" y="96.5" text-anchor="middle" font-size="8" font-weight="800" fill="#ffffff">N 極 (↑)</text>
          <text x="90" y="106.5" text-anchor="middle" font-size="6.4" fill="#fee2e2">N52 Nd₂Fe₁₄B</text>
          <rect x="142" y="84" width="76" height="28" rx="2.5" fill="#2563eb" stroke="#94a3b8" stroke-width="2"/>
          <text x="180" y="96.5" text-anchor="middle" font-size="8" font-weight="800" fill="#ffffff">S 極 (↓)</text>
          <text x="180" y="106.5" text-anchor="middle" font-size="6.4" fill="#dbeafe">N52 Nd₂Fe₁₄B</text>
          <!-- Soft-Iron Back Yoke closing return flux path -->
          <rect x="44" y="113" width="182" height="18" rx="2.5" fill="#334155" stroke="#0f172a"/>
          <path d="M180,122 L90,122" stroke="#fbbf24" stroke-width="2" marker-end="url(#a-S27-amber)"/>
          <text x="135" y="143" text-anchor="middle" font-size="7" font-weight="700" fill="#334155">高透磁率 軟鉄バックヨーク（背面磁束帰還・漏磁遮断）</text>
          <!-- Right specs card -->
          <rect x="236" y="32" width="112" height="108" rx="5" fill="#ffffff" stroke="#fca5a5"/>
          <text x="292" y="46" text-anchor="middle" font-size="7.3" font-weight="700" fill="#991b1b">最高級 N52 磁気仕様</text>
          ${pill(292, 65, 98, 17, '残留磁束 ~1.43 T', '#fef2f2', '#dc2626', '#991b1b', 7.1)}
          <text x="292" y="87" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">・2極 × 3軸 (計6磁石)</text>
          <text x="292" y="100" text-anchor="middle" font-size="6.8" fill="#475569">・Ni-Cu-Ni 3層防錆めっき</text>
          <text x="292" y="113" text-anchor="middle" font-size="6.8" fill="#0369a1">・往復導体で推力2倍</text>
          <text x="292" y="128" text-anchor="middle" font-size="6.8" font-weight="700" fill="#b45309">・薄型ボディで最大推力</text>
        `,
        caption: '1.43T級N52磁石のN/S隣接ペアと軟鉄ヨークが磁束を集中還流し、薄型で最大推力を発生',
      });

    // =========================================================================
    // S28 — Stationary Die-Cast Magnesium IBIS Base Chassis (magnet_yoke)
    // =========================================================================
    case 'magnet_yoke':
      return sensorFrame({
        code: 'S28',
        title: 'IBIS 固定マグネシウム・ベースシャーシ構造',
        viewTag: '基準骨格正面図',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- Main AZ91D Die-Cast Magnesium Base Chassis Outline -->
          <rect x="44" y="34" width="184" height="106" rx="8" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>
          <!-- 3 Outer Tripod Calibration Mounting Bosses -->
          <circle cx="52" cy="42" r="7.5" fill="#94a3b8" stroke="#1e293b" stroke-width="1.2"/>
          <circle cx="52" cy="42" r="3" fill="#ffffff"/>
          <circle cx="220" cy="42" r="7.5" fill="#94a3b8" stroke="#1e293b" stroke-width="1.2"/>
          <circle cx="220" cy="42" r="3" fill="#ffffff"/>
          <circle cx="136" cy="134" r="7.5" fill="#94a3b8" stroke="#1e293b" stroke-width="1.2"/>
          <circle cx="136" cy="134" r="3" fill="#ffffff"/>
          <!-- Central 38x28mm Thermal Window for Σ-Graphite pass-through -->
          <rect x="92" y="56" width="88" height="54" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="1.3" stroke-dasharray="4 2"/>
          <text x="136" y="79" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">中央放熱貫通窓</text>
          <text x="136" y="90" text-anchor="middle" font-size="6.8" fill="#475569">38 × 28 mm</text>
          <text x="136" y="100" text-anchor="middle" font-size="6.4" font-weight="700" fill="#b45309">(Σグラファイト通過)</text>
          <!-- 3 Recessed N52 Magnet Yoke Seats -->
          <rect x="52" y="56" width="24" height="54" rx="2" fill="#fee2e2" stroke="#dc2626" stroke-width="1"/>
          <text x="64" y="85" text-anchor="middle" font-size="6.5" font-weight="700" fill="#991b1b">Y1座</text>
          <rect x="196" y="56" width="24" height="54" rx="2" fill="#fee2e2" stroke="#dc2626" stroke-width="1"/>
          <text x="208" y="85" text-anchor="middle" font-size="6.5" font-weight="700" fill="#991b1b">Y2座</text>
          <rect x="96" y="114" width="80" height="13" rx="2" fill="#dbeafe" stroke="#2563eb" stroke-width="1"/>
          <text x="136" y="123" text-anchor="middle" font-size="6.4" font-weight="700" fill="#1e40af">X1 磁石ヨーク座</text>
          <!-- 3 Ceramic Ball Race Pockets -->
          <circle cx="84" cy="48" r="4.5" fill="#1e293b"/>
          <circle cx="188" cy="48" r="4.5" fill="#1e293b"/>
          <circle cx="84" cy="122" r="4.5" fill="#1e293b"/>
          <!-- Right Legend & Engineering Specs -->
          <rect x="240" y="34" width="108" height="106" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="294" y="48" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">AZ91D 基準骨格</text>
          <circle cx="252" cy="64" r="4" fill="#94a3b8" stroke="#1e293b"/>
          <text x="261" y="66.5" font-size="6.8" font-weight="700" fill="#334155">3点校正ボス座面</text>
          <circle cx="252" cy="81" r="4" fill="#1e293b"/>
          <text x="261" y="83.5" font-size="6.8" font-weight="700" fill="#334155">セラミック球レース</text>
          <rect x="248" y="94" width="8" height="8" rx="1" fill="#fee2e2" stroke="#dc2626"/>
          <text x="261" y="100.5" font-size="6.8" font-weight="700" fill="#991b1b">N52磁石ヨーク台</text>
          <text x="294" y="119" text-anchor="middle" font-size="6.6" fill="#475569">ボディ骨格へ高剛性直結</text>
          <text x="294" y="131" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0369a1">全IBIS機構の機械原点</text>
        `,
        caption: '3点校正ボス・磁石座・球レース・放熱窓を一体鋳造したAZ91Dマグネシウム基準骨格',
      });

    // =========================================================================
    // S29 — 3-Point Flange-Back & Tilt Calibration Springs (sensor_tilt_springs)
    // =========================================================================
    case 'sensor_tilt_springs':
      return sensorFrame({
        code: 'S29',
        title: '3点 フランジバック ＆ 像面傾きミクロン校正',
        viewTag: '校正機構断面',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- LEFT: 3-Vertex Tripod Plane Control -->
          <rect x="14" y="30" width="144" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="86" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#065f46">3頂点 独立Z調整 (平面決定)</text>
          <polygon points="86,56 38,118 134,118" fill="#dcfce7" stroke="#059669" stroke-width="1.3" stroke-dasharray="3 2"/>
          <circle cx="86" cy="56" r="9" fill="#059669"/><text x="86" y="59" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">P1</text>
          <circle cx="38" cy="118" r="9" fill="#059669"/><text x="38" y="121" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">P2</text>
          <circle cx="134" cy="118" r="9" fill="#059669"/><text x="134" y="121" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">P3</text>
          <rect x="54" y="84" width="64" height="22" rx="3" fill="#ffffff" stroke="#059669" stroke-width="0.9"/>
          <text x="86" y="94" text-anchor="middle" font-size="6.8" font-weight="700" fill="#065f46">Z + Pitch/Yaw</text>
          <text x="86" y="103" text-anchor="middle" font-size="6.4" fill="#334155">±2〜3 µm校正</text>
          <text x="86" y="138" text-anchor="middle" font-size="6.8" font-weight="700" fill="#059669">F1.2極薄ピントの片ボケ根絶</text>
          <!-- RIGHT: Single Calibration Post Cutaway -->
          <rect x="166" y="30" width="182" height="114" rx="5" fill="#ffffff" stroke="#86efac"/>
          <text x="257" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">1箇所あたりの精密バネ予圧断面</text>
          <!-- Fine-pitch screw head + shaft -->
          <rect x="196" y="51" width="24" height="8" rx="1.5" fill="#334155"/>
          <rect x="204" y="59" width="8" height="68" fill="#64748b"/>
          <!-- UV lock resin seal dot on head -->
          <circle cx="220" cy="54" r="4" fill="#2563eb"/>
          <!-- IBIS base flange -->
          <rect x="178" y="68" width="60" height="12" rx="2" fill="#cbd5e1" stroke="#475569"/>
          <!-- Helical Compression Spring pushing upward to eliminate thread backlash -->
          <polyline points="196,82 220,86 196,91 220,96 196,101 220,106 196,110" fill="none" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/>
          <!-- Camera body mount frame -->
          <rect x="178" y="112" width="60" height="14" rx="2" fill="#475569"/>
          <text x="208" y="121.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">本体骨格</text>
          <!-- Right callouts -->
          <line x1="224" y1="54" x2="246" y2="54" stroke="#2563eb" stroke-width="0.9"/>
          <text x="249" y="57" font-size="6.9" font-weight="700" fill="#1d4ed8">校正後 UVロック封印</text>
          <line x1="238" y1="74" x2="246" y2="74" stroke="#475569" stroke-width="0.9"/>
          <text x="249" y="77" font-size="6.9" font-weight="700" fill="#334155">IBISベース座 (Z微動)</text>
          <line x1="222" y1="95" x2="246" y2="95" stroke="#d97706" stroke-width="0.9"/>
          <text x="249" y="94" font-size="6.9" font-weight="700" fill="#b45309">圧縮コイルバネ</text>
          <text x="249" y="104" font-size="6.5" fill="#475569">(ねじ遊びガタ完全除去)</text>
          <text x="257" y="137" text-anchor="middle" font-size="6.9" font-weight="700" fill="#059669">1°回転≈1µm · レーザー干渉計校正</text>
        `,
        caption: '3頂点の細目ねじと圧縮バネがねじ遊びを消し、フランジバックと像面平行度を±2µm校正',
      });

    // =========================================================================
    // S30 — High-Conductivity Compliant Silicone TIM Pad (sensor_tim_pad)
    // =========================================================================
    case 'sensor_tim_pad':
      return sensorFrame({
        code: 'S30',
        title: '高熱伝導シリコーン TIM パッド（界面熱抵抗低減）',
        viewTag: '微細界面比較',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- LEFT: Without TIM (Microscopic air gaps = thermal bottleneck) -->
          <rect x="14" y="30" width="154" height="114" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="91" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#991b1b">TIMなし：微細凹凸に空気層</text>
          <!-- Rough upper PCB -->
          <path d="M26,52 L156,52 L156,74 L144,70 L130,76 L116,71 L100,77 L84,70 L68,76 L52,71 L38,76 L26,72 Z" fill="#065f46" stroke="#047857"/>
          <text x="91" y="64.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">センサーPCB 発熱源</text>
          <!-- Trapped insulating air pockets -->
          <text x="91" y="88" text-anchor="middle" font-size="6.9" font-weight="700" fill="#dc2626">断熱空気層 k=0.026 W/m·K</text>
          <!-- Rough lower graphite -->
          <path d="M26,97 L42,93 L58,98 L76,94 L94,99 L112,93 L130,98 L146,94 L156,97 L156,115 L26,115 Z" fill="#334155"/>
          <text x="91" y="109" text-anchor="middle" font-size="6.8" font-weight="700" fill="#f8fafc">Σグラファイト熱橋</text>
          <text x="91" y="133" text-anchor="middle" font-size="6.8" fill="#b91c1c">点接触のみで熱が逃げない!</text>
          <!-- Arrow -->
          <line x1="170" y1="84" x2="184" y2="84" stroke="#0284c7" stroke-width="2" marker-end="url(#a-S30-cyan)"/>
          <!-- RIGHT: With Compliant TIM Pad (Fills every micro-void -> 1/10 resistance) -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#f0f9ff" stroke="#38bdf8" stroke-width="1.1"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0c4a6e">TIM密着：空気排除で熱抵抗 1/10</text>
          <!-- Upper PCB -->
          <path d="M200,52 L336,52 L336,70 L322,67 L306,72 L290,67 L272,72 L254,67 L236,72 L218,67 L200,70 Z" fill="#065f46"/>
          <text x="268" y="63.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">センサーPCB サーマルビア直下</text>
          <!-- Compliant TIM Pad filling all micro-grooves completely -->
          <path d="M200,70 L218,67 L236,72 L254,67 L272,72 L290,67 L306,72 L322,67 L336,70 L336,97 L320,94 L302,99 L284,94 L266,99 L248,94 L230,99 L212,94 L200,97 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="0.9"/>
          <!-- Dense downward heat arrows -->
          <line x1="226" y1="73" x2="226" y2="94" stroke="#dc2626" stroke-width="1.6" marker-end="url(#a-S30-red)"/>
          <line x1="268" y1="73" x2="268" y2="94" stroke="#dc2626" stroke-width="1.6" marker-end="url(#a-S30-red)"/>
          <line x1="310" y1="73" x2="310" y2="94" stroke="#dc2626" stroke-width="1.6" marker-end="url(#a-S30-red)"/>
          <rect x="234" y="77" width="68" height="12" rx="2" fill="#e0f2fe"/>
          <text x="268" y="85.5" text-anchor="middle" font-size="6.6" font-weight="800" fill="#0369a1">TIM (8–12 W/mK)</text>
          <!-- Lower graphite -->
          <path d="M200,97 L212,94 L230,99 L248,94 L266,99 L284,94 L302,99 L320,94 L336,97 L336,115 L200,115 Z" fill="#334155"/>
          <text x="268" y="109" text-anchor="middle" font-size="6.8" font-weight="700" fill="#f8fafc">Σグラファイト熱橋へ高速放熱</text>
          <text x="268" y="133" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">電気絶縁 &gt;5kV/mm · 低硬度でIBIS無負荷</text>
        `,
        caption: '高充填シリコーンTIMがミクロの空気隙間を埋めて界面熱抵抗を1/10以下へ劇的低減',
      });

    default:
      return null;
  }
}

export { FONT_MONO };
