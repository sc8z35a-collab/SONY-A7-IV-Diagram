import { PartExplanation } from '../../assemblies/types';
import { FONT_MONO, pill, shutterFrame } from './shared';

/**
 * Phase 36 Ultra-Detailed Shutter Technical Schematics — Group D (SH131–SH147, 17 bespoke 360x176 HD SVGs).
 * Blade/link crank anatomy, next-gen blades, and chassis/frame optical-mechanical micro-features.
 */
export function renderShutterHdGroupD(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    case 'shutter_crank_offset_arms':
      return shutterFrame({
        code: 'SH131',
        title: '主・補助アーム段曲げクランク＆逃げ切欠き',
        viewTag: '立体交差',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Z-cross section crank offset -->
          <rect x="12" y="29" width="166" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="95" y="42" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">Z断面：0.45 mm 羽根室内の段曲げ立体交差</text>
          <!-- Main arm (flat lower plane) -->
          <rect x="22" y="96" width="146" height="9" rx="2" fill="#334155"/>
          <text x="58" y="114" font-size="6.7" font-weight="700" fill="#334155">主アーム (SUS301)</text>
          <!-- Sub arm (crank-stepped upper plane) -->
          <path d="M22,74 L74,74 L90,56 L168,56 L168,64 L94,64 L78,82 L22,82 Z" fill="#0284c7" stroke="#0369a1" stroke-width="0.7"/>
          <text x="130" y="51" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0369a1">補助アーム（段曲げ）</text>
          <!-- Clearance bracket -->
          <line x1="126" y1="64" x2="126" y2="96" stroke="#059669" stroke-width="1.3" stroke-dasharray="2.5 1.5" marker-start="url(#a-SH131-green)" marker-end="url(#a-SH131-green)"/>
          <text x="150" y="83" text-anchor="middle" font-size="6.8" font-weight="700" fill="#047857" style="font-family:${FONT_MONO};">Δz≥0.42mm</text>
          <!-- Wave washer at pivot -->
          <path d="M32,82 Q38,87 44,82 Q50,87 56,82" fill="none" stroke="#d97706" stroke-width="1.8"/>
          <text x="44" y="93" text-anchor="middle" font-size="6.2" font-weight="700" fill="#b45309">BeCuウェーブ座金</text>
          ${pill(95, 134, 148, 13, 'US4426146A / 75°揺動でも接触ゼロ', '#ecfdf5', '#10b981', '#065f46', 6.6)}
          <!-- Right: Top view crossing relief notch -->
          <rect x="186" y="29" width="162" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="267" y="42" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">正面図：相手支点ボスの半月逃げ切欠き</text>
          <!-- Pivot bosses -->
          <circle cx="220" cy="70" r="8" fill="#64748b" stroke="#1e293b"/>
          <circle cx="220" cy="70" r="3" fill="#e2e8f0"/>
          <circle cx="268" cy="100" r="9" fill="#f59e0b" stroke="#92400e"/>
          <circle cx="268" cy="100" r="3.5" fill="#fef3c7"/>
          <!-- Sub arm with crescent relief notch around boss -->
          <path d="M214,64 L326,86 L322,102 L281,94 A13,13 0 0,0 255,90 L210,80 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="1.2"/>
          <text x="297" y="72" text-anchor="middle" font-size="6.6" font-weight="700" fill="#1d4ed8">半月逃げ切欠き</text>
          <line x1="286" y1="75" x2="271" y2="87" stroke="#2563eb" stroke-width="1" marker-end="url(#a-SH131-blue)"/>
          <text x="267" y="121" text-anchor="middle" font-size="6.6" fill="#475569">曲げR ≥ 1.5t で800G疲労亀裂を防止</text>
          ${pill(267, 135, 138, 13, 'JPO 2H081 AA20 平行4節リンク', '#eff6ff', '#3b82f6', '#1e40af', 6.6)}
        `,
        caption: '0.42 mm以上の精密段曲げ＋半月逃げ切欠きで、極薄羽根室の2本アームを無干渉交差',
      });

    case 'shutter_rivetless_boss':
      return shutterFrame({
        code: 'SH132',
        title: 'リベットレス「ボス＆穴」圧入突起連結',
        viewTag: '特許機構',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: Conventional rivet -->
          <rect x="12" y="29" width="144" height="116" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="84" y="42" text-anchor="middle" font-size="7.3" font-weight="700" fill="#b91c1c">従来：別体カシメリベット</text>
          <rect x="26" y="68" width="116" height="10" fill="#1e293b"/>
          <rect x="26" y="88" width="116" height="10" fill="#64748b"/>
          <rect x="74" y="56" width="20" height="52" rx="3" fill="#f59e0b" stroke="#92400e"/>
          <text x="84" y="122" text-anchor="middle" font-size="6.7" fill="#b91c1c">部品増・先端質量増・ガタ発生</text>
          ${pill(84, 135, 118, 12, 'カシメ変形バラつき大', '#fee2e2', '#ef4444', '#991b1b', 6.5)}
          <!-- Right: Rivetless boss & keyhole coupling -->
          <rect x="164" y="29" width="184" height="116" rx="5" fill="#f0fdf4" stroke="#86efac"/>
          <text x="256" y="42" text-anchor="middle" font-size="7.3" font-weight="700" fill="#15803d">○ 一体突起ボス連結 (US20110158635A1)</text>
          <!-- Arm with extruded cylindrical boss -->
          <path d="M178,94 L236,94 L236,64 L248,60 L264,60 L276,64 L276,94 L334,94 L334,104 L178,104 Z" fill="#0284c7" stroke="#0369a1" stroke-width="0.9"/>
          <!-- Blade with flanged keyhole engaging boss -->
          <rect x="178" y="72" width="56" height="9" fill="#0f172a"/>
          <rect x="278" y="72" width="56" height="9" fill="#0f172a"/>
          <rect x="234" y="69" width="44" height="4" rx="1.5" fill="#38bdf8"/>
          <text x="256" y="56" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0369a1">一体バーリング突起ボス</text>
          <text x="256" y="117" text-anchor="middle" font-size="6.8" font-weight="700" fill="#047857" style="font-family:${FONT_MONO};">I_link = Σ m_i·r_i² (−8〜12%削減)</text>
          ${pill(256, 134, 162, 13, 'リベットゼロ・先端慣性軽減＆超薄型化', '#dcfce7', '#16a34a', '#166534', 6.6)}
        `,
        caption: 'アーム自体に一体成形した突起ボスを羽根穴へ直接係合させ、リベット質量とガタを根絶',
      });

    case 'shutter_titanium_honeycomb':
      return shutterFrame({
        code: 'SH133',
        title: 'エッチング・チタンハニカム軽量肉抜き羽根',
        viewTag: '伝説技術',
        accent: '#0d9488',
        headerBg: '#f0fdfa',
        body: `
          <!-- Left: Etched Ti honeycomb blade face -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#1e293b" stroke="#475569"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.3" font-weight="700" fill="#5eead4">化学エッチング・チタンハニカム羽根 (FM2/FE2)</text>
          <!-- Blade outline -->
          <rect x="22" y="50" width="164" height="62" rx="3" fill="#475569" stroke="#94a3b8" stroke-width="1"/>
          <!-- Honeycomb hexagons -->
          <g fill="#0f172a" stroke="#2dd4bf" stroke-width="0.9">
            <polygon points="44,58 53,53 62,58 62,68 53,73 44,68"/>
            <polygon points="65,58 74,53 83,58 83,68 74,73 65,68"/>
            <polygon points="86,58 95,53 104,58 104,68 95,73 86,68"/>
            <polygon points="107,58 116,53 125,58 125,68 116,73 107,68"/>
            <polygon points="128,58 137,53 146,58 146,68 137,73 128,68"/>
            <polygon points="149,58 158,53 167,58 167,68 158,73 149,68"/>
            <polygon points="54,75 63,70 72,75 72,85 63,90 54,85"/>
            <polygon points="75,75 84,70 93,75 93,85 84,90 75,85"/>
            <polygon points="96,75 105,70 114,75 114,85 105,90 96,85"/>
            <polygon points="117,75 126,70 135,75 135,85 126,90 117,85"/>
            <polygon points="138,75 147,70 156,75 156,85 147,90 138,85"/>
          </g>
          <!-- Cross section bottom note -->
          <text x="104" y="106" text-anchor="middle" font-size="6.4" fill="#cbd5e1">非貫通ハーフエッチング（底面遮光膜 25 μm 残し）</text>
          ${pill(104, 130, 158, 13, '比剛性アップ × 質量−35% 達成', '#134e4a', '#2dd4bf', '#ccfbf1', 6.6)}
          <!-- Right: Speed & slit comparison -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">3.3 ms 幕速ブレイクスルー</text>
          <text x="276" y="59" text-anchor="middle" font-size="7" font-weight="700" fill="#0d9488" style="font-family:${FONT_MONO};">v = 24 mm / 3.3 ms</text>
          <text x="276" y="72" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0f766e" style="font-family:${FONT_MONO};">= 7.27 m/s</text>
          <line x1="216" y1="81" x2="336" y2="81" stroke="#e2e8f0"/>
          <text x="276" y="95" text-anchor="middle" font-size="6.8" fill="#334155">1/4000 s 時のスリット幅:</text>
          <text x="276" y="108" text-anchor="middle" font-size="7.6" font-weight="700" fill="#2563eb" style="font-family:${FONT_MONO};">w_slit = 1.82 mm</text>
          ${pill(276, 130, 126, 13, 'Xシンクロ 1/250 s 実用化', '#f0fdfa', '#0d9488', '#115e59', 6.6)}
        `,
        caption: '極薄チタン板をハニカム状にハーフエッチングし、遮光性を保ったまま3.3 ms超高速走破を実現',
      });

    case 'shutter_5blade_split':
      return shutterFrame({
        code: 'SH134',
        title: '1.8 ms (1/12000 s) 5分割高速羽根群',
        viewTag: '超高速機構',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- Left: 4-blade vs 5-blade stack height -->
          <rect x="12" y="29" width="166" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="95" y="42" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">5分割スリム羽根（1枚幅 20% 短縮）</text>
          <!-- 5 stacked narrow blades -->
          <rect x="26" y="51" width="138" height="10" rx="1.5" fill="#0f172a"/>
          <rect x="26" y="64" width="138" height="10" rx="1.5" fill="#1e293b"/>
          <rect x="26" y="77" width="138" height="10" rx="1.5" fill="#334155"/>
          <rect x="26" y="90" width="138" height="10" rx="1.5" fill="#475569"/>
          <rect x="26" y="103" width="138" height="10" rx="1.5" fill="#dc2626"/>
          <text x="95" y="58.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">#1 スリット先頭（高剛性CFRP）</text>
          <text x="95" y="84.5" text-anchor="middle" font-size="6.4" fill="#e2e8f0">#2〜#4 ジュラルミン／CFRP極薄羽根</text>
          <text x="95" y="110.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">#5 遮光補助羽根（極小収納スペース）</text>
          ${pill(95, 132, 148, 13, '1枚あたり慣性モーメント激減', '#fee2e2', '#dc2626', '#991b1b', 6.6)}
          <!-- Right: 1.8ms / 13.3 m/s physics -->
          <rect x="186" y="29" width="162" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="267" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">1/12000 s (Minolta α-9xi 系譜)</text>
          <!-- Speed bar comparison -->
          <text x="196" y="62" font-size="6.7" fill="#64748b">標準 4枚羽根 (3.6 ms)</text>
          <rect x="196" y="65" width="76" height="9" rx="2" fill="#94a3b8"/>
          <text x="276" y="72.5" font-size="6.6" fill="#475569" style="font-family:${FONT_MONO};">6.7 m/s</text>
          <text x="196" y="86" font-size="6.7" font-weight="700" fill="#dc2626">5分割超高速 (1.8 ms)</text>
          <rect x="196" y="89" width="138" height="10" rx="2" fill="#dc2626"/>
          <text x="265" y="96.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff" style="font-family:${FONT_MONO};">13.33 m/s (時速48km!)</text>
          <text x="267" y="115" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1e293b" style="font-family:${FONT_MONO};">w_slit(1/12000s) = 1.11 mm</text>
          ${pill(267, 133, 142, 13, 'X同調 1/300〜1/400 s 領域へ', '#fef2f2', '#ef4444', '#991b1b', 6.6)}
        `,
        caption: '羽根を5枚へ細分化し1枚幅と慣性を縮小、1.8 ms（秒速13.3 m）の超高速走破を実現',
      });

    case 'shutter_pi_superelastic':
      return shutterFrame({
        code: 'SH135',
        title: '2026次世代 CFRP＋ホモポリイミド超弾性羽根',
        viewTag: '次世代材料',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Left: Micro sandwich architecture -->
          <rect x="12" y="29" width="174" height="116" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
          <text x="99" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#92400e">CN121348638A (2026) 複合積層</text>
          <rect x="24" y="52" width="150" height="16" rx="2" fill="#1e293b"/>
          <text x="99" y="63" text-anchor="middle" font-size="6.8" font-weight="700" fill="#f8fafc">高弾性カーボン繊維強化層 (CFRP)</text>
          <rect x="24" y="71" width="150" height="22" rx="2" fill="#f59e0b" stroke="#b45309"/>
          <text x="99" y="81" text-anchor="middle" font-size="6.8" font-weight="800" fill="#451a03">ホモポリイミド (PI) 超靱性コア</text>
          <text x="99" y="90" text-anchor="middle" font-size="6.1" fill="#78350f">σ ≥ 180 MPa / 破断伸び ε ≥ 120%</text>
          <rect x="24" y="96" width="150" height="16" rx="2" fill="#1e293b"/>
          <text x="99" y="107" text-anchor="middle" font-size="6.8" font-weight="700" fill="#f8fafc">高弾性カーボン繊維強化層 (CFRP)</text>
          ${pill(99, 131, 152, 13, '脆性クラック進展をPI層が完全停止', '#fef3c7', '#d97706', '#78350f', 6.5)}
          <!-- Right: Stress-strain comparison -->
          <rect x="194" y="29" width="154" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="271" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">応力-ひずみ曲線（靱性比較）</text>
          <!-- Axes -->
          <line x1="212" y1="118" x2="338" y2="118" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH135-slate)"/>
          <line x1="212" y1="118" x2="212" y2="50" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH135-slate)"/>
          <text x="336" y="128" text-anchor="end" font-size="6.2" fill="#64748b">ひずみ ε</text>
          <text x="216" y="55" font-size="6.2" fill="#64748b">応力 σ</text>
          <!-- Conventional brittle CFRP -->
          <path d="M212,118 L244,58 L246,118" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
          <text x="245" y="54" font-size="6.2" fill="#64748b">通常CFRP(脆性)</text>
          <!-- 2026 PI Hybrid -->
          <path d="M212,118 L248,66 Q286,62 326,76" fill="none" stroke="#d97706" stroke-width="2.2"/>
          <text x="300" y="69" text-anchor="middle" font-size="6.6" font-weight="700" fill="#b45309">2026 CFRP+PI</text>
          <text x="284" y="96" text-anchor="middle" font-size="6.4" fill="#92400e">大面積エネルギー吸収</text>
          ${pill(271, 134, 134, 12, '100万回耐久・折損レス次世代幕', '#fffbeb', '#f59e0b', '#92400e', 6.5)}
        `,
        caption: '高剛性CFRPに破断伸び120%超のホモポリイミド層を融合し、高衝撃下での亀裂折損を防止',
      });

    case 'shutter_blade_crowning_beads':
      return shutterFrame({
        code: 'SH136',
        title: '羽根先端クラウニング加工＆補強ビードリブ',
        viewTag: '剛性強化',
        accent: '#6366f1',
        headerBg: '#eef2ff',
        body: `
          <!-- Left: Flat flutter vs Crowned stiff edge -->
          <rect x="12" y="29" width="166" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="95" y="42" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">先端断面：平板フラッター vs ビード強化</text>
          <!-- Flat blade bending -->
          <text x="22" y="58" font-size="6.6" font-weight="700" fill="#dc2626">× 平板羽根（空気抵抗でバタつく）</text>
          <path d="M24,68 Q62,60 96,71 Q130,80 166,67" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="3 2"/>
          <!-- Crowned beaded blade -->
          <text x="22" y="92" font-size="6.6" font-weight="700" fill="#4f46e5">○ マイクロ補強ビード＋微小クラウン</text>
          <path d="M24,108 L46,108 Q54,99 62,108 L112,108 Q120,99 128,108 L166,108" fill="none" stroke="#4f46e5" stroke-width="2.6"/>
          <text x="95" y="121" text-anchor="middle" font-size="6.5" fill="#312e81">厚さ 0.08 mm に高さ 0.12 mm プレスビード</text>
          ${pill(95, 134, 148, 12, '羽根同士の引っ掛かり・波打ち防止', '#e0e7ff', '#6366f1', '#312e81', 6.5)}
          <!-- Right: Bending stiffness formula -->
          <rect x="186" y="29" width="162" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="267" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">断面二次モーメント 2〜3倍化</text>
          <rect x="198" y="52" width="138" height="28" rx="4" fill="#eef2ff" stroke="#818cf8"/>
          <text x="267" y="64" text-anchor="middle" font-size="7.4" font-weight="700" fill="#3730a3" style="font-family:${FONT_MONO};">I_bead = I_flat + A·d²</text>
          <text x="267" y="75" text-anchor="middle" font-size="6.4" fill="#4338ca">重量増 0% で曲げ剛性 E·I を 2–3× 向上</text>
          <!-- Bar comparison -->
          <text x="198" y="95" font-size="6.5" fill="#64748b">平板剛性 (1.0×)</text>
          <rect x="262" y="88" width="32" height="8" rx="2" fill="#94a3b8"/>
          <text x="198" y="111" font-size="6.5" font-weight="700" fill="#4f46e5">ビード付 (2.8×)</text>
          <rect x="262" y="104" width="76" height="8" rx="2" fill="#4f46e5"/>
          ${pill(267, 132, 140, 13, '紙を折るとピンと立つ力学原理', '#eef2ff', '#6366f1', '#312e81', 6.6)}
        `,
        caption: '羽根に微小プレスビードとクラウン曲率を付与し、重量増ゼロで面外曲げ剛性を2〜3倍化',
      });

    case 'shutter_loose_slot_link':
      return shutterFrame({
        code: 'SH137',
        title: '補助羽根 遅延開放ルーズスロット長穴カム',
        viewTag: '連動機構',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- Left: Loose slot mechanism -->
          <rect x="12" y="29" width="174" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="99" y="42" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">ルーズスロット（長穴遅延カム）</text>
          <!-- Blade with elongated slot -->
          <rect x="22" y="54" width="154" height="32" rx="3" fill="#1e293b"/>
          <rect x="52" y="65" width="74" height="10" rx="5" fill="#f8fafc" stroke="#0891b2" stroke-width="1.3"/>
          <!-- Drive pin moving inside slot -->
          <circle cx="66" cy="70" r="4.5" fill="#f59e0b" stroke="#92400e"/>
          <line x1="73" y1="70" x2="118" y2="70" stroke="#0891b2" stroke-width="1.5" stroke-dasharray="2.5 2" marker-end="url(#a-SH137-cyan)"/>
          <text x="99" y="98" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0e7490">空走距離 Δ_slot で後続羽根を遅延起動</text>
          <text x="99" y="110" text-anchor="middle" font-size="6.5" fill="#475569">4枚が異なるストローク量で段違い収納</text>
          ${pill(99, 131, 152, 13, '閉鎖時は隙間ゼロ・開放時は一斉コンパクト収納', '#cffafe', '#0891b2', '#155e75', 6.4)}
          <!-- Right: 4-blade travel phase graph -->
          <rect x="194" y="29" width="154" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="271" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">各羽根の位相変位 y_k(θ)</text>
          <line x1="210" y1="114" x2="338" y2="114" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH137-slate)"/>
          <line x1="210" y1="114" x2="210" y2="50" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH137-slate)"/>
          <!-- 4 staged curves -->
          <path d="M210,114 L330,54" fill="none" stroke="#0284c7" stroke-width="1.8"/>
          <path d="M210,114 L232,114 L330,68" fill="none" stroke="#0891b2" stroke-width="1.6"/>
          <path d="M210,114 L256,114 L330,82" fill="none" stroke="#0d9488" stroke-width="1.5"/>
          <path d="M210,114 L280,114 L330,96" fill="none" stroke="#64748b" stroke-width="1.4"/>
          <text x="334" y="56" font-size="6" font-weight="700" fill="#0284c7">#1</text>
          <text x="334" y="70" font-size="6" font-weight="700" fill="#0891b2">#2</text>
          <text x="334" y="84" font-size="6" font-weight="700" fill="#0d9488">#3</text>
          <text x="334" y="98" font-size="6" font-weight="700" fill="#64748b">#4</text>
          ${pill(271, 133, 138, 12, 'ブラインドの羽根が順に畳まれる原理', '#ecfeff', '#06b6d4', '#164e63', 6.5)}
        `,
        caption: '長穴（ルーズスロット）の空走差で#1〜#4羽根の移動量を配分し、完全遮光と小型収納を両立',
      });

    case 'shutter_electroless_ni_ptfe':
      return shutterFrame({
        code: 'SH138',
        title: '黒色無電解Ni-PTFE複合めっき (1–5 μm)',
        viewTag: '表面処理',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Co-deposited PTFE particles in Ni-P matrix -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">羽根表層マイクロ断面（共析被膜）</text>
          <!-- Base substrate -->
          <rect x="22" y="102" width="164" height="22" fill="#94a3b8" stroke="#475569"/>
          <text x="104" y="116" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">金属・アルミ羽根基材</text>
          <!-- Black Ni-P matrix with PTFE spheres -->
          <rect x="22" y="68" width="164" height="34" fill="#1e293b"/>
          <g fill="#f8fafc" stroke="#38bdf8" stroke-width="0.6">
            <circle cx="38" cy="76" r="4"/><circle cx="62" cy="84" r="4.2"/><circle cx="88" cy="75" r="3.8"/>
            <circle cx="114" cy="86" r="4.2"/><circle cx="140" cy="76" r="4"/><circle cx="166" cy="85" r="4"/>
            <circle cx="48" cy="92" r="3.5"/><circle cx="100" cy="93" r="3.6"/><circle cx="152" cy="93" r="3.6"/>
          </g>
          <!-- Incident ray diffused -->
          <line x1="60" y1="48" x2="80" y2="67" stroke="#f59e0b" stroke-width="1.6" marker-end="url(#a-SH138-amber)"/>
          <text x="132" y="58" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0284c7">微細PTFE粒子が自己潤滑</text>
          ${pill(104, 134, 160, 12, '膜厚 1–5 μm・無給油で摩耗粉ゼロへ', '#e2e8f0', '#475569', '#0f172a', 6.5)}
          <!-- Right: 3-in-1 property matrix -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">三位一体の機能性被膜</text>
          <rect x="214" y="51" width="124" height="24" rx="4" fill="#f1f5f9" stroke="#64748b"/>
          <text x="276" y="61" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a">① 超低反射黒化</text>
          <text x="276" y="71" text-anchor="middle" font-size="6.4" fill="#475569" style="font-family:${FONT_MONO};">R_spec &lt; 1.2% (迷光遮断)</text>
          <rect x="214" y="80" width="124" height="24" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="276" y="90" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1d4ed8">② フッ素樹脂固体潤滑</text>
          <text x="276" y="100" text-anchor="middle" font-size="6.4" fill="#1e40af" style="font-family:${FONT_MONO};">μ_dry ≈ 0.08 (油漏れゼロ)</text>
          <rect x="214" y="109" width="124" height="26" rx="4" fill="#ecfdf5" stroke="#10b981"/>
          <text x="276" y="119" text-anchor="middle" font-size="6.8" font-weight="700" fill="#047857">③ 金属導通による除電</text>
          <text x="276" y="129" text-anchor="middle" font-size="6.4" fill="#065f46">静電気ゴミ付着をシャットアウト</text>
        `,
        caption: '黒色Niめっき中にフッ素樹脂PTFEを均一共析させ、超低反射・無給油摺動・帯電防止を三立',
      });

    case 'shutter_common_pivot_journal':
      return shutterFrame({
        code: 'SH139',
        title: '先幕・後幕 同軸共有ピボットジャーナル',
        viewTag: '省スペース',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Left: Coaxial dual-arm stack -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">1本の精密共通軸に先幕・後幕を集約</text>
          <!-- Common vertical hardened spindle -->
          <rect x="96" y="49" width="16" height="74" rx="2" fill="#64748b" stroke="#1e293b"/>
          <!-- Curtain 1 arm -->
          <rect x="28" y="60" width="90" height="12" rx="2" fill="#2563eb"/>
          <text x="60" y="68.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#ffffff">先幕アーム</text>
          <!-- PTFE spacer washer -->
          <rect x="90" y="74" width="28" height="5" rx="1" fill="#f59e0b"/>
          <text x="150" y="79" text-anchor="middle" font-size="6.2" font-weight="700" fill="#b45309">中間絶縁座金</text>
          <!-- Curtain 2 arm -->
          <rect x="90" y="82" width="90" height="12" rx="2" fill="#0d9488"/>
          <text x="148" y="90.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#ffffff">後幕アーム</text>
          <!-- Base flange -->
          <rect x="64" y="102" width="80" height="12" rx="2" fill="#cbd5e1" stroke="#475569"/>
          <text x="104" y="111" text-anchor="middle" font-size="6.4" font-weight="700" fill="#334155">地板インサート軸受</text>
          ${pill(104, 134, 160, 12, '1軸共有でユニット横幅 −3.2 mm 短縮', '#dbeafe', '#2563eb', '#1e40af', 6.5)}
          <!-- Right: Footprint comparison -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">小型ボディ化への貢献</text>
          <text x="276" y="60" text-anchor="middle" font-size="6.6" fill="#64748b">別軸配置：2軸分のボス幅が必要</text>
          <circle cx="250" cy="74" r="7" fill="#cbd5e1" stroke="#64748b"/>
          <circle cx="302" cy="74" r="7" fill="#cbd5e1" stroke="#64748b"/>
          <line x1="257" y1="74" x2="295" y2="74" stroke="#94a3b8" stroke-dasharray="2 2"/>
          <text x="276" y="95" text-anchor="middle" font-size="6.7" font-weight="700" fill="#2563eb">同軸共有：回転対称に統合</text>
          <circle cx="276" cy="110" r="9" fill="#2563eb" opacity="0.22" stroke="#2563eb" stroke-width="1.5"/>
          <circle cx="276" cy="110" r="4.5" fill="#0d9488"/>
          ${pill(276, 134, 126, 12, 'IBISアクチュエータ空間を確保', '#eff6ff', '#3b82f6', '#1e40af', 6.5)}
        `,
        caption: '先幕と後幕のアーム支点を1本の共通ジャーナル軸へ同軸集約し、横幅を約3.2 mm省スペース化',
      });

    case 'shutter_drive_pin_roller_cap':
      return shutterFrame({
        code: 'SH140',
        title: '駆動ピン先端 PEEKローラー＆ローレット軸',
        viewTag: '転がり摩擦',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- Left: Roller pin cross-section in blade slot -->
          <rect x="12" y="29" width="174" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="99" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">PEEK転がりスリーブ＋圧入ローレット軸</text>
          <!-- Drive lever base -->
          <rect x="26" y="104" width="146" height="14" rx="2" fill="#475569"/>
          <text x="99" y="114" text-anchor="middle" font-size="6.5" font-weight="700" fill="#f8fafc">駆動レバー（圧入孔）</text>
          <!-- Knurled press-fit shank -->
          <rect x="86" y="90" width="26" height="18" fill="#64748b" stroke="#1e293b"/>
          <path d="M88,92 L94,106 M94,92 L100,106 M100,92 L106,106 M106,92 L110,104" stroke="#cbd5e1" stroke-width="0.9"/>
          <!-- Hardened steel shaft -->
          <rect x="92" y="56" width="14" height="36" fill="#94a3b8" stroke="#334155"/>
          <!-- PEEK free-spinning roller sleeve -->
          <rect x="82" y="60" width="34" height="24" rx="4" fill="#d97706" opacity="0.88" stroke="#92400e" stroke-width="1.2"/>
          <text x="99" y="75" text-anchor="middle" font-size="6.8" font-weight="800" fill="#ffffff">PEEK</text>
          <!-- Rotation arrows -->
          <path d="M74,66 Q70,72 74,78" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#a-SH140-green)"/>
          <path d="M124,78 Q128,72 124,66" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#a-SH140-green)"/>
          <text x="148" y="68" text-anchor="middle" font-size="6.3" font-weight="700" fill="#047857">自由回転</text>
          <text x="48" y="98" text-anchor="middle" font-size="6.2" fill="#475569">ローレット回り止め</text>
          ${pill(99, 134, 152, 12, '金属滑り → 樹脂転がりへ摩擦変換', '#dcfce7', '#16a34a', '#166534', 6.5)}
          <!-- Right: Friction coefficient bar -->
          <rect x="194" y="29" width="154" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="271" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">摩擦係数 μ の劇的低減</text>
          <text x="204" y="64" font-size="6.7" fill="#dc2626">金属ピン直滑り (μ ≈ 0.18)</text>
          <rect x="204" y="68" width="128" height="11" rx="2" fill="#fca5a5" stroke="#dc2626"/>
          <text x="204" y="94" font-size="6.7" font-weight="700" fill="#059669">PEEKローラー (μ ≈ 0.02–0.04)</text>
          <rect x="204" y="98" width="26" height="11" rx="2" fill="#10b981"/>
          <text x="236" y="106.5" font-size="7" font-weight="800" fill="#047857">最大 1/6 の超低抵抗!</text>
          ${pill(271, 131, 138, 13, '駆動スロットの摩耗粉と遅れを根絶', '#ecfdf5', '#10b981', '#065f46', 6.5)}
        `,
        caption: '駆動ピン先端に自由回転PEEKローラーを被せ、摩擦係数を約1/6へ激減させ摩耗粉を抑止',
      });

    case 'shutter_adhesive_dust_trap':
      return shutterFrame({
        code: 'SH141',
        title: '開口下端 摩耗粉永久捕獲・粘着ダストトラップ',
        viewTag: '防塵構造',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Left: Aperture frame with bottom gel dust trap trench -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">US9241433B2 粘着帯(AD)＆捕集溝(5t)</text>
          <!-- Optical aperture frame -->
          <rect x="34" y="49" width="140" height="76" rx="3" fill="#334155"/>
          <rect x="52" y="57" width="104" height="52" rx="2" fill="#ffffff" stroke="#94a3b8"/>
          <text x="104" y="80" text-anchor="middle" font-size="7" font-weight="700" fill="#64748b">36 × 24 mm 光学開口</text>
          <!-- Falling wear dust particles -->
          <circle cx="82" cy="95" r="1.8" fill="#ea580c"/>
          <circle cx="106" cy="99" r="1.6" fill="#ea580c"/>
          <circle cx="128" cy="94" r="1.8" fill="#ea580c"/>
          <line x1="82" y1="87" x2="82" y2="108" stroke="#ea580c" stroke-width="1" stroke-dasharray="2 1.5" marker-end="url(#a-SH141-amber)"/>
          <line x1="128" y1="87" x2="128" y2="108" stroke="#ea580c" stroke-width="1" stroke-dasharray="2 1.5" marker-end="url(#a-SH141-amber)"/>
          <!-- Orange adhesive dust-trap gel strip at bottom trench -->
          <rect x="46" y="111" width="116" height="9" rx="2" fill="#fb923c" stroke="#c2410c" stroke-width="1.1"/>
          <text x="104" y="118" text-anchor="middle" font-size="6.4" font-weight="800" fill="#ffffff">高粘着ゲル帯 AD（捕集溝 5t）</text>
          ${pill(104, 136, 158, 12, 'センサーへ落ちる前に微粒子を永久固定', '#ffedd5', '#ea580c', '#9a3412', 6.5)}
          <!-- Right: Adhesion physics -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">再飛散ゼロの物理条件</text>
          <rect x="214" y="52" width="124" height="32" rx="4" fill="#fff7ed" stroke="#fb923c"/>
          <text x="276" y="65" text-anchor="middle" font-size="7.2" font-weight="700" fill="#c2410c" style="font-family:${FONT_MONO};">F_adhesion ≫ F_drag</text>
          <text x="276" y="78" text-anchor="middle" font-size="6.4" fill="#9a3412">幕風 8 m/s でも一度付いたら離さない</text>
          <text x="276" y="99" text-anchor="middle" font-size="6.6" fill="#334155">・重力＋気流渦で下溝 5t へ誘導</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.6" fill="#334155">・低アウトガス・長寿命シリコーンゲル</text>
          ${pill(276, 132, 128, 13, 'F16絞り込み時の黒点ゴミを予防', '#fff7ed', '#f97316', '#9a3412', 6.5)}
        `,
        caption: '開口下端の凹部溝に高粘着ゲル帯を配置し、高速羽根が生む摩耗粉をセンサー到達前に永久捕獲',
      });

    case 'shutter_inclined_aperture_wall':
      return shutterFrame({
        code: 'SH142',
        title: '補助地板 斜め傾斜遮光壁＆極薄ナイフエッジ',
        viewTag: '光学迷光',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Left: Vertical wall NG vs Inclined wall OK -->
          <rect x="12" y="29" width="166" height="116" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="95" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#b91c1c">× 通常の垂直開口端面</text>
          <rect x="28" y="54" width="44" height="44" fill="#334155"/>
          <rect x="28" y="112" width="136" height="10" fill="#0284c7"/>
          <text x="96" y="120" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">CMOSセンサー撮像面</text>
          <!-- Stray grazing ray reflecting onto sensor -->
          <line x1="126" y1="50" x2="73" y2="82" stroke="#f59e0b" stroke-width="1.6" marker-end="url(#a-SH142-amber)"/>
          <line x1="73" y1="82" x2="112" y2="111" stroke="#dc2626" stroke-width="1.7" marker-end="url(#a-SH142-red)"/>
          <text x="128" y="96" text-anchor="middle" font-size="6.5" font-weight="700" fill="#dc2626">斜光が反射し</text>
          <text x="128" y="105" text-anchor="middle" font-size="6.5" font-weight="700" fill="#dc2626">フレア発生!</text>
          ${pill(95, 134, 142, 12, '厚み端面が鏡のように迷光を反射', '#fee2e2', '#ef4444', '#991b1b', 6.4)}
          <!-- Right: Inclined wall 5i/5j + knife edge 5H -->
          <rect x="186" y="29" width="162" height="116" rx="5" fill="#f5f3ff" stroke="#c4b5fd"/>
          <text x="267" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#6d28d9">○ 傾斜遮光壁(5j)＋ナイフエッジ(5H)</text>
          <!-- Tapered knife-edge aperture wall -->
          <polygon points="200,54 248,54 268,94 268,98 200,98" fill="#1e293b"/>
          <rect x="200" y="112" width="136" height="10" fill="#0284c7"/>
          <text x="268" y="120" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">CMOSセンサー（迷光ゼロ！）</text>
          <!-- Ray bounced safely back toward +Z (lens side) -->
          <line x1="314" y1="52" x2="258" y2="75" stroke="#f59e0b" stroke-width="1.6" marker-end="url(#a-SH142-amber)"/>
          <line x1="258" y1="75" x2="296" y2="50" stroke="#7c3aed" stroke-width="1.7" marker-end="url(#a-SH142-purple)"/>
          <text x="304" y="88" text-anchor="middle" font-size="6.5" font-weight="700" fill="#6d28d9">レンズ側(+Z)へ</text>
          <text x="304" y="97" text-anchor="middle" font-size="6.5" font-weight="700" fill="#6d28d9">安全に弾き返す</text>
          ${pill(267, 134, 144, 12, 'US9241433B2 逆光コントラスト向上', '#ede9fe', '#7c3aed', '#4c1d95', 6.5)}
        `,
        caption: '開口縁を鋭利なナイフエッジ(5H)と傾斜遮光壁(5j)に成形し、逆光迷光をレンズ側へ偏向除去',
      });

    case 'shutter_insert_molded_bushes':
      return shutterFrame({
        code: 'SH143',
        title: '樹脂地板 インサート成形ステンレス支軸ボス',
        viewTag: '精密成形',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Insert molded steel bush in PPS chassis -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">アンカー溝付SUS支軸のインサート射出成形</text>
          <!-- PPS resin chassis body -->
          <rect x="24" y="76" width="160" height="40" rx="3" fill="#334155"/>
          <text x="52" y="100" text-anchor="middle" font-size="6.6" font-weight="700" fill="#e2e8f0">GF-PPS</text>
          <text x="156" y="100" text-anchor="middle" font-size="6.6" font-weight="700" fill="#e2e8f0">樹脂地板</text>
          <!-- Stepped stainless pin with anchor grooves -->
          <path d="M90,48 L118,48 L118,76 L124,76 L124,84 L118,84 L118,92 L124,92 L124,100 L118,100 L118,112 L90,112 L90,100 L84,100 L84,92 L90,92 L90,84 L84,84 L84,76 L90,76 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="1"/>
          <text x="104" y="64" text-anchor="middle" font-size="6.4" font-weight="800" fill="#0f172a">SUS</text>
          <line x1="146" y1="62" x2="120" y2="80" stroke="#0284c7" stroke-width="1.1" marker-end="url(#a-SH143-cyan)"/>
          <text x="156" y="60" text-anchor="middle" font-size="6.3" font-weight="700" fill="#0369a1">抜け止め溝</text>
          ${pill(104, 132, 160, 13, '樹脂の軽さ × 鋼鉄の軸精度を一体化', '#e2e8f0', '#475569', '#0f172a', 6.5)}
          <!-- Right: Tolerance specs -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">平行4節リンクの絶対精度</text>
          <rect x="214" y="52" width="124" height="28" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="276" y="64" text-anchor="middle" font-size="7" font-weight="700" fill="#1d4ed8" style="font-family:${FONT_MONO};">ΔL_pitch ≤ ±5 μm</text>
          <text x="276" y="75" text-anchor="middle" font-size="6.3" fill="#1e40af">支軸間ピッチの超精密位置決め</text>
          <rect x="214" y="86" width="124" height="28" rx="4" fill="#ecfdf5" stroke="#10b981"/>
          <text x="276" y="98" text-anchor="middle" font-size="7" font-weight="700" fill="#047857" style="font-family:${FONT_MONO};">θ_perp ≤ 0.05°</text>
          <text x="276" y="109" text-anchor="middle" font-size="6.3" fill="#065f46">50万回打撃でも傾き・緩みゼロ</text>
          ${pill(276, 132, 128, 12, '金型内で鋼軸を直接インサート固定', '#f1f5f9', '#64748b', '#1e293b', 6.4)}
        `,
        caption: '抜け止めアンカー溝付きステンレス支軸をPPS樹脂地板へインサート成形し、±5 μm精度を永久維持',
      });

    case 'shutter_midplate_lancing_tabs':
      return shutterFrame({
        code: 'SH144',
        title: '中間仕切り板 切り起こしガタ吸収ばね舌片',
        viewTag: '振動抑止',
        accent: '#0d9488',
        headerBg: '#f0fdfa',
        body: `
          <!-- Left: Mid-plate lancing spring tab pressing against cover -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">0.15 mm 仕切り板のランシング弾性舌片</text>
          <!-- Upper cover plate -->
          <rect x="24" y="54" width="160" height="11" rx="2" fill="#334155"/>
          <text x="104" y="62" text-anchor="middle" font-size="6.4" font-weight="700" fill="#f8fafc">カバー地板（Z方向基準面）</text>
          <!-- Mid-plate with bent-up lancing spring tab -->
          <path d="M24,90 L76,90 L114,66 L124,66 L124,71 L115,71 L80,95 L24,95 Z" fill="#0d9488"/>
          <rect x="126" y="90" width="58" height="5" fill="#0d9488"/>
          <text x="50" y="106" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0f766e">中間仕切り板</text>
          <!-- Preload arrow -->
          <line x1="119" y1="86" x2="119" y2="71" stroke="#ea580c" stroke-width="1.6" marker-end="url(#a-SH144-amber)"/>
          <text x="155" y="81" text-anchor="middle" font-size="6.5" font-weight="700" fill="#c2410c">予圧 F_pre</text>
          <!-- Base chassis -->
          <rect x="24" y="112" width="160" height="10" rx="2" fill="#64748b"/>
          <text x="104" y="120" text-anchor="middle" font-size="6.3" fill="#ffffff">ベース地板（3点位置決めボス）</text>
          ${pill(104, 135, 158, 12, '別部品ゼロでZガタとビビり音を完全封止', '#ccfbf1', '#0d9488', '#115e59', 6.4)}
          <!-- Right: Spring equation -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">浮き上がり防止条件</text>
          <rect x="212" y="53" width="128" height="32" rx="4" fill="#f0fdfa" stroke="#14b8a6"/>
          <text x="276" y="66" text-anchor="middle" font-size="7" font-weight="700" fill="#0f766e" style="font-family:${FONT_MONO};">F = (3EI/L³)·δ</text>
          <text x="276" y="79" text-anchor="middle" font-size="6.5" font-weight="700" fill="#047857">&gt; m_mid · a_shock</text>
          <text x="276" y="100" text-anchor="middle" font-size="6.5" fill="#334155">・先幕／後幕の狭間 0.15 mm</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.5" fill="#334155">・衝撃共振による羽根擦れを防止</text>
          ${pill(276, 132, 128, 13, '切り起こし片持ち板ばね一体造形', '#f0fdfa', '#0d9488', '#115e59', 6.5)}
        `,
        caption: '0.15 mm中間仕切り板にプレス切り起こし舌片を設け、Z方向ガタと高速衝撃ビビり音を防止',
      });

    case 'shutter_heat_stake_bayonet_clips':
      return shutterFrame({
        code: 'SH145',
        title: '鍵穴横スライド係止＆熱カシメ固定ボス',
        viewTag: '薄型組立',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Left: Keyhole bayonet slide lock -->
          <rect x="12" y="29" width="166" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="95" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">① 鍵穴（キーホール）横スライド係止</text>
          <!-- Plate with keyhole slot -->
          <rect x="24" y="54" width="142" height="46" rx="4" fill="#e2e8f0" stroke="#64748b"/>
          <circle cx="66" cy="77" r="12" fill="#ffffff" stroke="#334155" stroke-width="1.2"/>
          <rect x="66" y="71" width="54" height="12" rx="6" fill="#ffffff" stroke="#334155" stroke-width="1.2"/>
          <circle cx="114" cy="77" r="6" fill="#0284c7" stroke="#1e3a8a"/>
          <line x1="72" y1="77" x2="104" y2="77" stroke="#0284c7" stroke-width="1.8" marker-end="url(#a-SH145-blue)"/>
          <text x="95" y="114" text-anchor="middle" font-size="6.5" fill="#334155">大穴に通して横スライド → 環状溝にロック</text>
          ${pill(95, 132, 146, 13, 'ねじ頭ゼロで分解メンテ性も確保', '#eff6ff', '#3b82f6', '#1e40af', 6.5)}
          <!-- Right: Heat-stake melted mushroom boss -->
          <rect x="186" y="29" width="162" height="116" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
          <text x="267" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#92400e">② 熱カシメ（ヒートステーク）</text>
          <!-- Base plate + cover plate -->
          <rect x="200" y="96" width="134" height="14" fill="#334155"/>
          <rect x="200" y="78" width="134" height="14" fill="#94a3b8"/>
          <!-- Melted mushroom pin -->
          <path d="M259,96 L259,76 Q246,74 248,66 Q267,58 286,66 Q288,74 275,76 L275,96 Z" fill="#f59e0b" stroke="#92400e" stroke-width="1"/>
          <text x="267" y="55" text-anchor="middle" font-size="6.5" font-weight="700" fill="#b45309">熱圧着キノコ頭（突起 0.25 mm）</text>
          <text x="267" y="121" text-anchor="middle" font-size="6.6" font-weight="700" fill="#92400e">ねじ頭比 Z厚 −1.6 mm 節約!</text>
          ${pill(267, 135, 144, 12, 'ミラーレス極短フランジバック 18 mm 対応', '#fef3c7', '#d97706', '#78350f', 6.4)}
        `,
        caption: '鍵穴スライド係止と熱カシメボスでねじ頭突出を廃し、極短フランジバック内の薄型化を実現',
      });

    case 'shutter_arc_slot_relief_notches':
      return shutterFrame({
        code: 'SH146',
        title: '円弧長穴終端 応力逃がしRノッチ＆ガイドリブ',
        viewTag: '疲労強度',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: Arc slot with relief notch -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">アークスロット終端の拡大R逃がし形状</text>
          <!-- Chassis plate -->
          <rect x="22" y="50" width="164" height="72" rx="4" fill="#334155"/>
          <!-- Curved arc slot -->
          <path d="M52,106 A66,66 0 0,1 142,64" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
          <!-- Enlarged relief circular end-notches -->
          <circle cx="52" cy="106" r="9" fill="#ffffff" stroke="#0ea5e9" stroke-width="2"/>
          <circle cx="142" cy="64" r="9" fill="#ffffff" stroke="#0ea5e9" stroke-width="2"/>
          <!-- Drive pin traveling along slot -->
          <circle cx="98" cy="74" r="4.5" fill="#f59e0b" stroke="#92400e"/>
          <text x="150" y="92" text-anchor="middle" font-size="6.4" font-weight="700" fill="#38bdf8">終端大Rノッチ</text>
          <line x1="146" y1="84" x2="143" y2="74" stroke="#38bdf8" stroke-width="1.2" marker-end="url(#a-SH146-cyan)"/>
          <text x="64" y="64" text-anchor="middle" font-size="6.4" fill="#e2e8f0">摺動リブ</text>
          ${pill(104, 134, 160, 12, '応力集中係数 K_t を約 40% 低減', '#e0f2fe', '#0284c7', '#075985', 6.5)}
          <!-- Right: Stress concentration equation -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">亀裂防止の破壊力学</text>
          <rect x="214" y="52" width="124" height="28" rx="4" fill="#f0f9ff" stroke="#38bdf8"/>
          <text x="276" y="65" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0369a1" style="font-family:${FONT_MONO};">K_t = 1 + 2√(a/ρ)</text>
          <text x="276" y="76" text-anchor="middle" font-size="6.3" fill="#0284c7">曲率半径 ρ を拡大しピーク応力分散</text>
          <text x="276" y="96" text-anchor="middle" font-size="6.5" fill="#334155">・50万回の終端打撃衝撃に耐える</text>
          <text x="276" y="109" text-anchor="middle" font-size="6.5" fill="#334155">・ガイドリブがピン傾きを抑制</text>
          ${pill(276, 131, 128, 13, 'PPS樹脂地板の疲労クラック防止', '#f0f9ff', '#0ea5e9', '#0c4a6e', 6.5)}
        `,
        caption: '駆動ピンが往復する円弧長穴の終端に大R逃がしノッチを設け、50万回打撃の応力集中を40%軽減',
      });

    case 'shutter_perimeter_light_seal_foam':
      return shutterFrame({
        code: 'SH147',
        title: '全周 独立気泡モルト遮光ガスケット枠',
        viewTag: '完全暗箱',
        accent: '#1e293b',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Compressed foam seal between chassis and body -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">30〜50% 適正圧縮による完全遮光シール</text>
          <!-- Camera body Mg wall -->
          <rect x="24" y="52" width="160" height="16" rx="2" fill="#475569"/>
          <text x="104" y="63" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">カメラ本体 マグネシウム枠</text>
          <!-- Closed-cell urethane foam gasket compressed -->
          <rect x="28" y="68" width="152" height="22" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2"/>
          <!-- Micro closed cells -->
          <g fill="none" stroke="#64748b" stroke-width="0.7">
            <circle cx="44" cy="79" r="3"/><circle cx="60" cy="76" r="2.5"/><circle cx="76" cy="82" r="3"/>
            <circle cx="94" cy="77" r="2.8"/><circle cx="112" cy="81" r="3"/><circle cx="130" cy="76" r="2.6"/>
            <circle cx="148" cy="82" r="3"/><circle cx="164" cy="78" r="2.5"/>
          </g>
          <text x="104" y="81.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#fde68a">独立気泡ブラックモルト</text>
          <!-- Shutter chassis -->
          <rect x="24" y="90" width="160" height="16" rx="2" fill="#334155"/>
          <text x="104" y="101" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">シャッターユニット外周フランジ</text>
          <!-- Blocked stray light arrow -->
          <line x1="16" y1="79" x2="26" y2="79" stroke="#dc2626" stroke-width="2" marker-end="url(#a-SH147-red)"/>
          <text x="104" y="118" text-anchor="middle" font-size="6.5" font-weight="700" fill="#dc2626">外周からの漏れ光・ホコリを完全シャットアウト</text>
          ${pill(104, 134, 158, 12, '非加水分解・低圧縮永久歪みウレタン', '#e2e8f0', '#334155', '#0f172a', 6.4)}
          <!-- Right: OD > 7 metric -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">光学濃度 OD &gt; 7.0 保証</text>
          <rect x="214" y="52" width="124" height="30" rx="4" fill="#f1f5f9" stroke="#334155"/>
          <text x="276" y="65" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a" style="font-family:${FONT_MONO};">OD = −log₁₀(I/I₀) &gt; 7</text>
          <text x="276" y="77" text-anchor="middle" font-size="6.3" fill="#475569">光漏れ 1,000万分の1 未満</text>
          <text x="276" y="98" text-anchor="middle" font-size="6.5" fill="#334155">・ISO 51200 長時間露光のカブリ防止</text>
          <text x="276" y="111" text-anchor="middle" font-size="6.5" fill="#334155">・シャッター振動の副次減衰も兼用</text>
          ${pill(276, 132, 128, 13, '全周切れ目ない一体型暗箱シール', '#f8fafc', '#475569', '#0f172a', 6.5)}
        `,
        caption: 'ユニット全周を独立気泡モルトで30〜50%圧縮密封し、光学濃度OD>7の完全暗箱と防塵を確保',
      });

    default:
      return null;
  }
}
