import { PartExplanation } from '../assemblies/types';

/**
 * Ultra-HD 720x470 Museum-Poster Vector Engineering Schematics
 * for the 220-Part Functional CNC Optical Kinetic Signboard 「ようこそ」 (WLK-220, W01–W220).
 *
 * Emits `class="evf-hd-svg" data-welcome-hd="1"` so ExplanationDrawer automatically enables
 * `.is-hd-schematic` museum styling and 1-tap Fullscreen Pinch/Pan/90° Landscape Lightbox!
 */

interface WelcomeHdCard {
  readonly label: string;
  readonly line1: string;
  readonly line2: string;
  readonly accent?: string;
}

interface WelcomeHdSpec {
  readonly badge: string;
  readonly stdTag: string;
  readonly title: string;
  readonly analogy: string;
  readonly accent: string;
  readonly accentSoft: string;
  readonly defsExtra?: string;
  readonly body: string;
  readonly cards: readonly [WelcomeHdCard, WelcomeHdCard, WelcomeHdCard];
}

const FONT_STACK =
  "'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', system-ui, -apple-system, sans-serif";
const FONT_MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

function wrapWelcomeHdSvg(spec: WelcomeHdSpec): string {
  const p = spec.badge.toLowerCase().replace(/[^a-z0-9]/g, '');
  const [c1, c2, c3] = spec.cards;

  const renderCard = (card: WelcomeHdCard, x: number, icon: string, fallback: string): string => {
    const col = card.accent || fallback;
    return `
      <g transform="translate(${x}, 356)">
        <rect x="0" y="0" width="222" height="102" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect x="0" y="0" width="222" height="27" rx="10" fill="${col}" fill-opacity="0.10"/>
        <rect x="0" y="18" width="222" height="9" fill="${col}" fill-opacity="0.10"/>
        <line x1="0" y1="27" x2="222" y2="27" stroke="${col}" stroke-opacity="0.22" stroke-width="1"/>
        <text x="10" y="18.5" font-size="10.4" font-weight="800" fill="${col}">${icon} ${card.label}</text>
        <text x="10" y="54" font-size="7.8" font-weight="600" fill="#1e293b">${card.line1}</text>
        <text x="10" y="76" font-size="7.8" font-weight="600" fill="#334155">${card.line2}</text>
      </g>`;
  };

  const titleSize = spec.title.length > 34 ? 11.4 : spec.title.length > 28 ? 12.4 : 13.4;

  return `<svg class="evf-hd-svg" data-welcome-hd="1" viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" style="font-family:${FONT_STACK};">
  <defs>
    <pattern id="${p}-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e2e8f0" stroke-width="0.65" opacity="0.65"/>
      <path d="M 12 0 L 12 24 M 0 12 L 24 12" fill="none" stroke="#f1f5f9" stroke-width="0.45"/>
    </pattern>
    <linearGradient id="${p}-alu" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f1f5f9"/>
      <stop offset="50%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <linearGradient id="${p}-dark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="${p}-cu" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdba74"/>
      <stop offset="50%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="${p}-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="#bae6fd" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="${p}-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
    <marker id="${p}-arr-b" viewBox="0 0 10 10" refX="8.2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M1,1.5 L8.8,5 L1,8.5 Z" fill="#2563eb"/>
    </marker>
    <marker id="${p}-arr-o" viewBox="0 0 10 10" refX="8.2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M1,1.5 L8.8,5 L1,8.5 Z" fill="#ea580c"/>
    </marker>
    <marker id="${p}-arr-g" viewBox="0 0 10 10" refX="8.2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M1,1.5 L8.8,5 L1,8.5 Z" fill="#059669"/>
    </marker>
    <marker id="${p}-arr-r" viewBox="0 0 10 10" refX="8.2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M1,1.5 L8.8,5 L1,8.5 Z" fill="#dc2626"/>
    </marker>
    ${spec.defsExtra ?? ''}
  </defs>

  <!-- Outer blueprint frame -->
  <rect x="2" y="2" width="716" height="466" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>

  <!-- Header band -->
  <path d="M 3 15 Q 3 3 15 3 L 705 3 Q 717 3 717 15 L 717 62 L 3 62 Z" fill="${spec.accentSoft}"/>
  <line x1="3" y1="62" x2="717" y2="62" stroke="${spec.accent}" stroke-opacity="0.25" stroke-width="1.2"/>

  <!-- Badge -->
  <rect x="14" y="13" width="66" height="24" rx="6" fill="${spec.accent}"/>
  <text x="47" y="29" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff" style="font-family:${FONT_MONO};">${spec.badge}</text>

  <!-- Title & Analogy -->
  <text x="90" y="29" font-size="${titleSize}" font-weight="800" fill="#0f172a">${spec.title}</text>
  <text x="90" y="49" font-size="10.2" font-weight="600" fill="#475569">${spec.analogy}</text>

  <!-- Standards Pill -->
  <rect x="524" y="14" width="182" height="22" rx="11" fill="#ffffff" stroke="${spec.accent}" stroke-width="1"/>
  <text x="615" y="28.5" text-anchor="middle" font-size="9.4" font-weight="700" fill="${spec.accent}" style="font-family:${FONT_MONO};">${spec.stdTag}</text>

  <!-- Technical Canvas (x: 14..706, y: 70..346) -->
  <rect x="14" y="70" width="692" height="276" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
  <rect x="15" y="71" width="690" height="274" rx="9" fill="url(#${p}-grid)"/>
  ${spec.body}

  <!-- 3 Engineering Summary Cards -->
  ${renderCard(c1, 14, '①', spec.accent)}
  ${renderCard(c2, 249, '②', '#0d9488')}
  ${renderCard(c3, 484, '③', '#d97706')}
</svg>`;
}

export function renderWelcomeHdSchematicSvg(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    // =========================================================================
    // 1. GLYPH 8-LAYER OPTICAL & CNC STRUCTURAL CROSS-SECTION
    // =========================================================================
    case 'welcome_glyph_layer':
      return wrapWelcomeHdSvg({
        badge: 'WLK-01',
        stdTag: 'JIS H4000 / IEC 60529 IP65',
        title: '立体文字モジュール 8層光学・CNC構造 断面図（Z軸積層）',
        analogy: '背面マグネシウム放熱フィンから前面サファイア拡散レンズまで全8層が機能連動する実動作構造',
        accent: '#0284c7',
        accentSoft: '#f0f9ff',
        body: `
          <!-- Z-Axis Datum Line & Clear Top Direction Legend -->
          <line x1="34" y1="210" x2="536" y2="210" stroke="#94a3b8" stroke-width="1" stroke-dasharray="6 4"/>
          <rect x="26" y="78" width="112" height="16" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="82" y="89.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#475569" style="font-family:${FONT_MONO};">← -Z 背面自然放熱</text>
          <rect x="412" y="78" width="118" height="16" rx="4" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="471" y="89.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#1d4ed8" style="font-family:${FONT_MONO};">+Z 正面発光方向 →</text>

          <!-- Layer 1: AZ91D 3D Finned Backplate -->
          <g transform="translate(38, 118)">
            <rect x="18" y="0" width="20" height="180" rx="3" fill="url(#wlk01-dark)" stroke="#0f172a" stroke-width="1.3"/>
            <rect x="0" y="8" width="18" height="10" rx="2" fill="#334155"/>
            <rect x="0" y="28" width="18" height="10" rx="2" fill="#334155"/>
            <rect x="0" y="48" width="18" height="10" rx="2" fill="#334155"/>
            <rect x="0" y="68" width="18" height="10" rx="2" fill="#334155"/>
            <rect x="0" y="88" width="18" height="10" rx="2" fill="#334155"/>
            <rect x="0" y="108" width="18" height="10" rx="2" fill="#334155"/>
            <rect x="0" y="128" width="18" height="10" rx="2" fill="#334155"/>
            <rect x="0" y="148" width="18" height="10" rx="2" fill="#334155"/>
            <rect x="0" y="166" width="18" height="10" rx="2" fill="#334155"/>
            <text x="19" y="-8" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">① AZ91D</text>
            <text x="19" y="198" text-anchor="middle" font-size="8.2" font-weight="700" fill="#334155">3D放熱フィン</text>
          </g>

          <!-- Layer 2: CNC A6061-T6 Hollow Pocket Chassis + Internal Ribs -->
          <g transform="translate(98, 112)">
            <rect x="0" y="0" width="74" height="192" rx="5" fill="url(#wlk01-alu)" stroke="#475569" stroke-width="1.5"/>
            <rect x="13" y="18" width="52" height="70" rx="3" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
            <rect x="13" y="104" width="52" height="70" rx="3" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
            <text x="39" y="56" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">肉抜き</text>
            <text x="39" y="68" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">ポケット</text>
            <text x="39" y="138" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">ドライバ</text>
            <text x="39" y="150" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">収納室</text>
            <rect x="13" y="90" width="52" height="12" fill="#94a3b8"/>
            <text x="39" y="99" text-anchor="middle" font-size="7.4" font-weight="800" fill="#ffffff">補強リブ</text>
            <text x="37" y="-8" text-anchor="middle" font-size="8.8" font-weight="800" fill="#1e293b">② A6061-T6</text>
            <text x="37" y="208" text-anchor="middle" font-size="8.2" font-weight="700" fill="#334155">5軸CNC骨格</text>
          </g>

          <!-- Layer 3: Al-MCPCB + CRI97 LED + 98% PET Reflector -->
          <g transform="translate(196, 124)">
            <rect x="0" y="0" width="15" height="166" rx="2" fill="url(#wlk01-cu)" stroke="#9a3412" stroke-width="1.1"/>
            <rect x="15" y="18" width="10" height="18" rx="1.5" fill="#facc15" stroke="#ca8a04"/>
            <rect x="15" y="74" width="10" height="18" rx="1.5" fill="#facc15" stroke="#ca8a04"/>
            <rect x="15" y="130" width="10" height="18" rx="1.5" fill="#facc15" stroke="#ca8a04"/>
            <rect x="33" y="0" width="8" height="166" rx="1.5" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="20" y="-12" text-anchor="middle" font-size="8.6" font-weight="800" fill="#9a3412">③ LED+反射</text>
            <text x="20" y="186" text-anchor="middle" font-size="8.0" font-weight="700" fill="#9a3412">CRI97 / 98%</text>
          </g>

          <!-- Layer 4: Laser-Dot PMMA LGP (TIR Rays inside!) -->
          <g transform="translate(268, 120)">
            <rect x="0" y="0" width="64" height="174" rx="4" fill="url(#wlk01-glass)" stroke="#0284c7" stroke-width="1.5"/>
            <circle cx="8" cy="22" r="2.2" fill="#0369a1"/><circle cx="8" cy="46" r="2.5" fill="#0369a1"/>
            <circle cx="8" cy="70" r="2.8" fill="#0369a1"/><circle cx="8" cy="94" r="3.1" fill="#0369a1"/>
            <circle cx="8" cy="118" r="3.4" fill="#0369a1"/><circle cx="8" cy="142" r="3.7" fill="#0369a1"/>
            <polyline points="2,156 56,126 10,94 56,62 10,30 62,18" fill="none" stroke="#ea580c" stroke-width="1.8" marker-end="url(#wlk01-arr-o)"/>
            <text x="32" y="-8" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0369a1">④ PMMA導光板</text>
            <text x="32" y="190" text-anchor="middle" font-size="8.0" font-weight="700" fill="#0369a1">n=1.491 TIR</text>
          </g>

          <!-- Layer 5: 90° Micro-Prism BEF Film -->
          <g transform="translate(360, 124)">
            <path d="M0,0 L11,0 L19,10 L11,20 L19,30 L11,40 L19,50 L11,60 L19,70 L11,80 L19,90 L11,100 L19,110 L11,120 L19,130 L11,140 L19,150 L11,160 L19,166 L0,166 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="1.2"/>
            <text x="10" y="-12" text-anchor="middle" font-size="8.6" font-weight="800" fill="#1d4ed8">⑤ BEF</text>
            <text x="10" y="186" text-anchor="middle" font-size="8.0" font-weight="700" fill="#1d4ed8">1.55×集光</text>
          </g>

          <!-- Layer 6: IP65 Silicone O-Ring + Stepped Sapphire Diffuser + Ti-6Al-4V Bezel -->
          <g transform="translate(414, 114)">
            <circle cx="8" cy="14" r="6.5" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
            <circle cx="8" cy="172" r="6.5" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
            <path d="M22,6 L42,6 L42,22 L54,28 L54,158 L42,164 L42,180 L22,180 Z" fill="url(#wlk01-glass)" stroke="#0284c7" stroke-width="1.5"/>
            <rect x="64" y="0" width="15" height="28" rx="2.5" fill="url(#wlk01-alu)" stroke="#334155" stroke-width="1.3"/>
            <rect x="64" y="158" width="15" height="28" rx="2.5" fill="url(#wlk01-alu)" stroke="#334155" stroke-width="1.3"/>
            <line x1="56" y1="58" x2="106" y2="58" stroke="#2563eb" stroke-width="2" marker-end="url(#wlk01-arr-b)"/>
            <line x1="56" y1="93" x2="106" y2="93" stroke="#2563eb" stroke-width="2" marker-end="url(#wlk01-arr-b)"/>
            <line x1="56" y1="128" x2="106" y2="128" stroke="#2563eb" stroke-width="2" marker-end="url(#wlk01-arr-b)"/>
            <text x="42" y="-6" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">⑥ Oリング+レンズ+Ti枠</text>
            <text x="42" y="202" text-anchor="middle" font-size="8.0" font-weight="700" fill="#334155">IP65密閉 / 93.5%</text>
          </g>

          <!-- Optical Metric Box on Right -->
          <g transform="translate(546, 98)">
            <rect x="0" y="0" width="146" height="218" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
            <rect x="0" y="0" width="146" height="26" rx="8" fill="#0284c7"/>
            <rect x="0" y="16" width="146" height="10" fill="#0284c7"/>
            <text x="73" y="17" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">光学・機械 設計諸元</text>
            <text x="10" y="46" font-size="9.2" font-weight="700" fill="#0f172a">全反射臨界角 (PMMA)</text>
            <text x="10" y="62" font-size="10.5" font-weight="800" fill="#0284c7" style="font-family:${FONT_MONO};">θc = arcsin(1/1.491)</text>
            <text x="10" y="76" font-size="9.5" font-weight="700" fill="#334155" style="font-family:${FONT_MONO};">   = 42.12° (TIR)</text>
            <line x1="10" y1="88" x2="136" y2="88" stroke="#e2e8f0"/>
            <text x="10" y="106" font-size="9.2" font-weight="700" fill="#0f172a">輝度均一性 / 視野角</text>
            <text x="10" y="122" font-size="9.6" font-weight="700" fill="#059669" style="font-family:${FONT_MONO};">≥ 92% / 170° FWHM</text>
            <line x1="10" y1="134" x2="136" y2="134" stroke="#e2e8f0"/>
            <text x="10" y="152" font-size="9.2" font-weight="700" fill="#0f172a">防塵防滴シール圧縮</text>
            <text x="10" y="168" font-size="9.6" font-weight="700" fill="#334155" style="font-family:${FONT_MONO};">22% Squeeze / IP65</text>
            <line x1="10" y1="180" x2="136" y2="180" stroke="#e2e8f0"/>
            <text x="10" y="198" font-size="9.2" font-weight="700" fill="#0f172a">CNC加工公差</text>
            <text x="10" y="212" font-size="9.6" font-weight="700" fill="#ea580c" style="font-family:${FONT_MONO};">±0.02 mm (5軸切削)</text>
          </g>
        `,
        cards: [
          {
            label: '5軸CNC肉抜き骨格 & 放熱',
            line1: 'A6061-T6 (k=167 W/mK) に補強リブとM2ボスを一体切削',
            line2: '背面AZ91D 3Dフィンへ直接熱伝導しファンレス連続点灯',
          },
          {
            label: 'TIR導光＋BEF 1.55×集光',
            line1: 'レーザー微細ドット密度勾配で遠端まで輝度均一性92%超',
            line2: '98%発泡PET反射シート＋90°プリズムで消費電力を35%削減',
          },
          {
            label: 'IP65全周密閉＋Ti-6Al-4V枠',
            line1: '段付きサファイア拡散レンズがShore50A Oリングを22%圧縮',
            line2: 'Grade-5チタン保護ベゼルがエッジ迷光と衝撃を同時遮断',
          },
        ],
      });

    // =========================================================================
    // 2. CRI97 LED + MCPCB + COPPER HEATPIPE + 3D FIN THERMAL NETWORK
    // =========================================================================
    case 'welcome_led_thermal':
      return wrapWelcomeHdSvg({
        badge: 'WLK-02',
        stdTag: 'IES LM-80 / JEDEC JESD51-14',
        title: 'CRI97 2835 LED・アルミMCPCB・銅ヒートパイプ 熱抵抗ネットワーク図',
        analogy: 'LEDチップの発熱を「銅→アルミ→焼結ヒートパイプ→3Dフィン」の最短経路で空冷し5万時間寿命を保証',
        accent: '#ea580c',
        accentSoft: '#fff7ed',
        body: `
          <!-- Thermal Resistance Chain Diagram (Top) -->
          <g transform="translate(28, 86)">
            <rect x="0" y="0" width="96" height="58" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
            <text x="48" y="21" text-anchor="middle" font-size="10" font-weight="800" fill="#92400e">CRI97 LED</text>
            <text x="48" y="36" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309" style="font-family:${FONT_MONO};">Tj = 58.4°C</text>
            <text x="48" y="50" text-anchor="middle" font-size="8.2" fill="#78350f">Ra≥97 / R9≥90</text>

            <line x1="96" y1="29" x2="132" y2="29" stroke="#ea580c" stroke-width="2.2" marker-end="url(#wlk02-arr-o)"/>
            <text x="114" y="21" text-anchor="middle" font-size="8" font-weight="700" fill="#c2410c">Rjc</text>

            <rect x="134" y="0" width="114" height="58" rx="7" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>
            <text x="191" y="21" text-anchor="middle" font-size="10" font-weight="800" fill="#9a3412">アルミMCPCB</text>
            <text x="191" y="36" text-anchor="middle" font-size="9" font-weight="700" fill="#c2410c" style="font-family:${FONT_MONO};">2.0 W/(m·K)絶縁</text>
            <text x="191" y="50" text-anchor="middle" font-size="8.2" fill="#7c2d12">2oz Cu + SnAg3Cu0.5</text>

            <line x1="248" y1="29" x2="284" y2="29" stroke="#ea580c" stroke-width="2.2" marker-end="url(#wlk02-arr-o)"/>
            <text x="266" y="21" text-anchor="middle" font-size="8" font-weight="700" fill="#c2410c">TIM</text>

            <rect x="286" y="0" width="124" height="58" rx="7" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
            <text x="348" y="21" text-anchor="middle" font-size="10" font-weight="800" fill="#991b1b">Ø3mm 銅ヒートパイプ</text>
            <text x="348" y="36" text-anchor="middle" font-size="9" font-weight="700" fill="#dc2626" style="font-family:${FONT_MONO};">k_eff ≈ 8,000 W/mK</text>
            <text x="348" y="50" text-anchor="middle" font-size="8.2" fill="#7f1d1d">焼結銅ウィック相変化</text>

            <line x1="410" y1="29" x2="446" y2="29" stroke="#ea580c" stroke-width="2.2" marker-end="url(#wlk02-arr-o)"/>
            <text x="428" y="21" text-anchor="middle" font-size="8" font-weight="700" fill="#c2410c">伝導</text>

            <rect x="448" y="0" width="110" height="58" rx="7" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
            <text x="503" y="21" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">AZ91D 3Dフィン</text>
            <text x="503" y="36" text-anchor="middle" font-size="9" font-weight="700" fill="#334155" style="font-family:${FONT_MONO};">表面積 2.6× 拡張</text>
            <text x="503" y="50" text-anchor="middle" font-size="8.2" fill="#475569">T_case = 41.2°C</text>

            <line x1="558" y1="29" x2="594" y2="29" stroke="#2563eb" stroke-width="2.2" marker-end="url(#wlk02-arr-b)"/>

            <rect x="596" y="0" width="68" height="58" rx="7" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
            <text x="630" y="24" text-anchor="middle" font-size="10" font-weight="800" fill="#1d4ed8">自然対流</text>
            <text x="630" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#1e40af" style="font-family:${FONT_MONO};">Ta=25°C</text>
          </g>

          <!-- Phase-Change Heatpipe Cutaway + Temperature Plot (Bottom) -->
          <g transform="translate(28, 166)">
            <!-- Heatpipe evaporation-condensation visual -->
            <rect x="0" y="0" width="336" height="162" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="12" y="20" font-size="10" font-weight="800" fill="#0f172a">C10200焼結銅ウィック ヒートパイプ動作断面</text>
            <!-- Outer copper wall -->
            <rect x="18" y="42" width="300" height="54" rx="22" fill="url(#wlk02-cu)" stroke="#7c2d12" stroke-width="1.5"/>
            <!-- Sintered copper wick layer -->
            <rect x="26" y="50" width="284" height="38" rx="15" fill="#fed7aa" stroke="#ea580c" stroke-width="1" stroke-dasharray="3 2"/>
            <!-- Vapor core -->
            <rect x="34" y="58" width="268" height="22" rx="9" fill="#fef2f2"/>
            <!-- Vapor arrows (Hot -> Cold) -->
            <line x1="58" y1="69" x2="274" y2="69" stroke="#dc2626" stroke-width="2.4" marker-end="url(#wlk02-arr-r)"/>
            <text x="168" y="65" text-anchor="middle" font-size="8.6" font-weight="800" fill="#b91c1c">作動液蒸気 (蒸発潜熱 2,260 kJ/kg) →</text>
            <!-- Liquid return arrows in wick -->
            <line x1="266" y1="53" x2="72" y2="53" stroke="#2563eb" stroke-width="1.6" marker-end="url(#wlk02-arr-b)"/>
            <line x1="266" y1="85" x2="72" y2="85" stroke="#2563eb" stroke-width="1.6" marker-end="url(#wlk02-arr-b)"/>
            <text x="58" y="114" text-anchor="middle" font-size="8.8" font-weight="800" fill="#dc2626">蒸発部 (LED直下)</text>
            <text x="168" y="114" text-anchor="middle" font-size="8.5" font-weight="700" fill="#2563eb">← 毛細管力による凝縮液還流 (焼結銅粉)</text>
            <text x="284" y="114" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0284c7">凝縮部 (背面フィン)</text>
            <rect x="14" y="126" width="308" height="26" rx="5" fill="#fff7ed" stroke="#fdba74"/>
            <text x="168" y="143" text-anchor="middle" font-size="9.4" font-weight="800" fill="#9a3412" style="font-family:${FONT_MONO};">Tj = Ta + P_loss × ΣR_th = 25 + 4.2W × 7.95 K/W = 58.4°C</text>
          </g>

          <!-- LM-80 Thermal Safety Margin Bar Chart (Bottom Right) -->
          <g transform="translate(382, 166)">
            <rect x="0" y="0" width="310" height="162" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="12" y="20" font-size="10" font-weight="800" fill="#0f172a">LEDジャンクション温度マージン (IES LM-80 L70)</text>
            <!-- Grid bars -->
            <text x="14" y="50" font-size="9" font-weight="700" fill="#334155">WLK-220 実測設計</text>
            <rect x="124" y="38" width="108" height="16" rx="4" fill="#10b981"/>
            <text x="238" y="50" font-size="9.2" font-weight="800" fill="#059669" style="font-family:${FONT_MONO};">58.4°C</text>

            <text x="14" y="80" font-size="9" font-weight="700" fill="#334155">NTC自動ディレーティング</text>
            <rect x="124" y="68" width="132" height="16" rx="4" fill="#f59e0b"/>
            <text x="262" y="80" font-size="9.2" font-weight="800" fill="#d97706" style="font-family:${FONT_MONO};">72.0°C</text>

            <text x="14" y="110" font-size="9" font-weight="700" fill="#334155">LM-80 5万時間上限</text>
            <rect x="124" y="98" width="156" height="16" rx="4" fill="#ef4444" fill-opacity="0.78"/>
            <text x="284" y="110" font-size="9.2" font-weight="800" fill="#dc2626" style="font-family:${FONT_MONO};">85°C</text>

            <rect x="14" y="126" width="282" height="26" rx="5" fill="#ecfdf5" stroke="#6ee7b7"/>
            <text x="155" y="143" text-anchor="middle" font-size="9.2" font-weight="700" fill="#065f46">26.6°Cの安全余裕で 100%連続点灯 L70 &gt; 60,000時間</text>
          </g>
        `,
        cards: [
          {
            label: '高演色CRI97 & 2.0 W/mK基板',
            line1: 'Ra≥97・R9≥90の2835 LEDを2oz銅箔アルミMCPCBへ実装',
            line2: 'FR-4比で熱伝導率約8倍、チップ直下の熱だまりを解消',
          },
          {
            label: '焼結銅ヒートパイプ均熱輸送',
            line1: 'Ø3mm無酸素銅管＋減圧純水相変化で実効熱伝導8,000 W/mK',
            line2: 'LED局所発熱を文字全体と背面3Dフィンへ瞬時に均熱拡散',
          },
          {
            label: 'NTC 10kΩ閉ループ保護',
            line1: 'B定数3435KのNTCサーミスタが100Hzで基板温度を常時監視',
            line2: '72℃到達時にPWMデューティを滑らか制御し熱暴走を防止',
          },
        ],
      });

    // =========================================================================
    // 3. 16-BIT PWM CONSTANT-CURRENT LED DRIVER & ISO 11898-2 CAN-FD BUS
    // =========================================================================
    case 'welcome_driver_canfd':
      return wrapWelcomeHdSvg({
        badge: 'WLK-03',
        stdTag: 'ISO 11898-2 CAN-FD / IEEE 1789',
        title: '16-bit定電流PWMドライバ & 5Mbps CAN-FD 4文字同期制御回路図',
        analogy: 'カメラ撮影でも一切フリッカー（縞模様）が映らない32kHz超高速PWMと、ノイズに強い車載級CAN-FD通信',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        body: `
          <!-- Master MCU -> CAN-FD Bus -> 4 Glyph Driver Nodes -->
          <g transform="translate(26, 86)">
            <!-- Host MCU -->
            <rect x="0" y="16" width="128" height="104" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.6"/>
            <text x="64" y="38" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">STM32H743</text>
            <text x="64" y="54" text-anchor="middle" font-size="8.6" fill="#c7d2fe" style="font-family:${FONT_MONO};">Cortex-M7 480MHz</text>
            <rect x="12" y="66" width="104" height="20" rx="4" fill="#312e81"/>
            <text x="64" y="79" text-anchor="middle" font-size="8.4" font-weight="700" fill="#a5b4fc">60fps 光演出エンジン</text>
            <rect x="12" y="92" width="104" height="20" rx="4" fill="#4338ca"/>
            <text x="64" y="105" text-anchor="middle" font-size="8.4" font-weight="700" fill="#e0e7ff">FDCAN1 5Mbps</text>

            <!-- Differential CAN-FD Bus Lines -->
            <line x1="128" y1="54" x2="652" y2="54" stroke="#7c3aed" stroke-width="2.4"/>
            <line x1="128" y1="78" x2="652" y2="78" stroke="#0284c7" stroke-width="2.4"/>
            <text x="180" y="47" font-size="8.5" font-weight="800" fill="#7c3aed" style="font-family:${FONT_MONO};">CAN_H (差動 +3.5V)</text>
            <text x="180" y="92" font-size="8.5" font-weight="800" fill="#0284c7" style="font-family:${FONT_MONO};">CAN_L (差動 +1.5V)</text>

            <!-- 120 Ohm Termination Resistors -->
            <rect x="142" y="54" width="12" height="24" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>
            <text x="148" y="106" text-anchor="middle" font-size="7.8" font-weight="800" fill="#b45309">120Ω</text>
            <rect x="646" y="54" width="12" height="24" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>
            <text x="652" y="106" text-anchor="middle" font-size="7.8" font-weight="800" fill="#b45309">120Ω</text>

            <!-- 4 Glyph Node Drops -->
            ${[
              { x: 224, ch: 'よ', id: '0x101' },
              { x: 332, ch: 'う', id: '0x102' },
              { x: 440, ch: 'こ', id: '0x103' },
              { x: 548, ch: 'そ', id: '0x104' },
            ]
              .map(
                (n) => `
              <line x1="${n.x + 42}" y1="54" x2="${n.x + 42}" y2="112" stroke="#7c3aed" stroke-width="1.4"/>
              <line x1="${n.x + 52}" y1="78" x2="${n.x + 52}" y2="112" stroke="#0284c7" stroke-width="1.4"/>
              <circle cx="${n.x + 42}" cy="54" r="3" fill="#7c3aed"/>
              <circle cx="${n.x + 52}" cy="78" r="3" fill="#0284c7"/>
              <rect x="${n.x}" y="112" width="94" height="58" rx="7" fill="#ffffff" stroke="#7c3aed" stroke-width="1.4"/>
              <rect x="${n.x}" y="112" width="94" height="20" rx="7" fill="#ede9fe"/>
              <text x="${n.x + 47}" y="125" text-anchor="middle" font-size="9.5" font-weight="800" fill="#5b21b6">「${n.ch}」 ${n.id}</text>
              <text x="${n.x + 47}" y="142" text-anchor="middle" font-size="8.2" font-weight="700" fill="#1e293b">16-bit PWM IC</text>
              <text x="${n.x + 47}" y="156" text-anchor="middle" font-size="8" font-weight="700" fill="#059669" style="font-family:${FONT_MONO};">65,536階調</text>
            `
              )
              .join('')}
          </g>

          <!-- Bottom Left: 32kHz Flicker-Free PWM Waveform vs Camera Shutter -->
          <g transform="translate(28, 266)">
            <rect x="0" y="0" width="336" height="72" rx="7" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.1"/>
            <text x="10" y="16" font-size="9.2" font-weight="800" fill="#0f172a">32 kHz 高周波PWM波形 (IEEE 1789 No-Effect領域)</text>
            <polyline points="12,56 12,30 30,30 30,56 54,56 54,30 72,30 72,56 96,56 96,30 114,30 114,56 138,56 138,30 156,30 156,56 180,56 180,30 198,30 198,56 222,56" fill="none" stroke="#7c3aed" stroke-width="2"/>
            <rect x="232" y="24" width="94" height="38" rx="5" fill="#ecfdf5" stroke="#10b981"/>
            <text x="279" y="40" text-anchor="middle" font-size="8.8" font-weight="800" fill="#047857">1/8000s撮影</text>
            <text x="279" y="54" text-anchor="middle" font-size="8.4" font-weight="700" fill="#059669">フリッカー 0%</text>
          </g>

          <!-- Bottom Right: Protection & ZIF FPC Architecture -->
          <g transform="translate(380, 266)">
            <rect x="0" y="0" width="312" height="72" rx="7" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.1"/>
            <text x="10" y="16" font-size="9.2" font-weight="800" fill="#0f172a">EMC・静電保護 &amp; 0.5mm ZIFポリイミドFPC接続</text>
            <text x="12" y="34" font-size="8.8" font-weight="700" fill="#334155">• TVS ESDダイオード: IEC 61000-4-2 ±15kV 気中放電保護</text>
            <text x="12" y="49" font-size="8.8" font-weight="700" fill="#334155">• 同期降圧DC-DC: 12V→5V 効率93% (2.2MHz低リップル)</text>
            <text x="12" y="64" font-size="8.8" font-weight="700" fill="#5b21b6">• ガンマ2.2補正テーブル内蔵で暗部0.1%でも滑らか調光</text>
          </g>
        `,
        cards: [
          {
            label: '16-bit 65,536階調定電流',
            line1: '電流精度±1.5%の定電流シンクICで文字間の色味バラつきゼロ',
            line2: '32kHz高速PWMによりミラーレス1/8000s撮影でも縞模様なし',
          },
          {
            label: '5Mbps CAN-FD 差動同期バス',
            line1: '120Ω終端のISO 11898-2差動伝送でジッタ10μs未満の完全同期',
            line2: '文字単体を取り外してもバス全体が落ちないホットスワップ耐性',
          },
          {
            label: 'ZIFワンタッチFPC＆EMI遮蔽',
            line1: '0.5mmピッチZIFフリップロックコネクタで無ハンダ保守交換',
            line2: '洋白シールド缶＆MLCCバイパス網でCISPR 32 Class B適合',
          },
        ],
      });

    // =========================================================================
    // 4. FUSED SILICA QUARTZ OPTICAL POWER COLUMNS & 45° CORNER PRISMS
    // =========================================================================
    case 'welcome_quartz_bridge':
      return wrapWelcomeHdSvg({
        badge: 'WLK-04',
        stdTag: 'Corning 7980 / JIS C3102 OFC',
        title: '透明溶融石英ガラス電力橋脚 & 45°全反射プリズム 構造図',
        analogy: '「う」「こ」「よ」の離れた画を浮いたように見せながら、内部の極細銅バスバーで確実に電力を運ぶ光学橋脚',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        body: `
          <!-- Left: Quartz Optical Power Column Cutaway -->
          <g transform="translate(28, 86)">
            <rect x="0" y="0" width="356" height="244" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="12" y="21" font-size="10.2" font-weight="800" fill="#0f172a">溶融石英ガラス橋脚 (Coaxial Power Column) 縦断面</text>

            <!-- Upper Stroke CNC Frame -->
            <rect x="34" y="34" width="288" height="26" rx="4" fill="url(#wlk04-alu)" stroke="#475569" stroke-width="1.3"/>
            <text x="178" y="51" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">分離サブストローク筐体（例：「う」上点 / 「こ」上画）</text>

            <!-- Upper Brass Collar + PTFE Washer -->
            <rect x="136" y="60" width="84" height="16" rx="2" fill="url(#wlk04-gold)" stroke="#a16207" stroke-width="1.2"/>
            <rect x="142" y="76" width="72" height="5" fill="#f8fafc" stroke="#94a3b8"/>

            <!-- Transparent Fused Silica Quartz Cylinder -->
            <rect x="146" y="81" width="64" height="92" rx="3" fill="url(#wlk04-glass)" stroke="#0891b2" stroke-width="1.6"/>
            <!-- Internal Twin OFC Copper Busbars (+12V / GND) -->
            <rect x="166" y="60" width="7" height="134" fill="url(#wlk04-cu)" stroke="#7c2d12" stroke-width="0.9"/>
            <rect x="183" y="60" width="7" height="134" fill="url(#wlk04-cu)" stroke="#7c2d12" stroke-width="0.9"/>

            <!-- Lower PTFE Washer + Brass Collar -->
            <rect x="142" y="173" width="72" height="5" fill="#f8fafc" stroke="#94a3b8"/>
            <rect x="136" y="178" width="84" height="16" rx="2" fill="url(#wlk04-gold)" stroke="#a16207" stroke-width="1.2"/>

            <!-- Lower Main Stroke CNC Frame -->
            <rect x="34" y="194" width="288" height="26" rx="4" fill="url(#wlk04-dark)" stroke="#0f172a" stroke-width="1.3"/>
            <text x="178" y="211" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">主ストローク筐体 / 光学ベンチ給電母線</text>

            <!-- Callout Labels -->
            <line x1="210" y1="106" x2="246" y2="96" stroke="#0891b2" stroke-width="1.2"/>
            <text x="250" y="99" font-size="8.6" font-weight="800" fill="#0e7490">JGS1溶融石英</text>
            <text x="250" y="111" font-size="8" fill="#334155">透過率93% / 低膨張</text>

            <line x1="190" y1="136" x2="246" y2="140" stroke="#ea580c" stroke-width="1.2"/>
            <text x="250" y="143" font-size="8.6" font-weight="800" fill="#c2410c">C10200 OFC銅芯</text>
            <text x="250" y="155" font-size="8" fill="#334155">12V電源 + PWM伝送</text>

            <line x1="136" y1="68" x2="96" y2="82" stroke="#a16207" stroke-width="1.2"/>
            <text x="16" y="85" font-size="8.6" font-weight="800" fill="#854d0e">C3604真鍮カラー</text>
            <text x="16" y="97" font-size="8" fill="#334155">+ PTFE緩衝座金</text>
          </g>

          <!-- Right: 45° BK7 Optical Corner Prism Ray Bending -->
          <g transform="translate(400, 86)">
            <rect x="0" y="0" width="292" height="244" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="12" y="21" font-size="10.2" font-weight="800" fill="#0f172a">45° BK7光学コーナープリズム 全反射結合</text>

            <!-- Incoming LGP Horizontal Arm -->
            <rect x="20" y="64" width="110" height="44" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.3"/>
            <text x="72" y="56" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0369a1">横画 導光板</text>

            <!-- 45-deg Right-Angle BK7 Prism -->
            <polygon points="130,64 196,64 130,130" fill="url(#wlk04-glass)" stroke="#0891b2" stroke-width="2"/>
            <!-- Silver / AR hypotenuse mirror -->
            <line x1="196" y1="64" x2="130" y2="130" stroke="#0f172a" stroke-width="2.6"/>
            <text x="192" y="106" font-size="8.4" font-weight="800" fill="#0f172a">45° 全反射斜面</text>
            <text x="192" y="118" font-size="8" fill="#0e7490">(θ=45° &gt; θc=41.2°)</text>

            <!-- Vertical LGP Arm -->
            <rect x="130" y="130" width="44" height="84" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.3"/>
            <text x="220" y="176" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0369a1">縦画 導光板</text>

            <!-- Light rays bending 90 deg cleanly -->
            <polyline points="26,78 168,78 168,204" fill="none" stroke="#ea580c" stroke-width="2" marker-end="url(#wlk04-arr-o)"/>
            <polyline points="26,94 152,94 152,204" fill="none" stroke="#f59e0b" stroke-width="2" marker-end="url(#wlk04-arr-o)"/>

            <rect x="14" y="218" width="264" height="18" rx="4" fill="#ecfeff" stroke="#67e8f9"/>
            <text x="146" y="230.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="#0e7490">「そ」「よ」屈曲部の暗点（ダークスポット）を完全解消</text>
          </g>
        `,
        cards: [
          {
            label: '宙に浮く分離画の実体給電',
            line1: 'JGS1溶融石英円柱 (n=1.4585) の透明感で浮遊意匠を維持',
            line2: '内部の中空穴を通る無酸素銅芯線が+12V/PWMを確実伝送',
          },
          {
            label: '応力分散 C3604真鍮＋PTFE',
            line1: '石英ガラス端面をPTFE座金で挟み熱膨張差による割れを防止',
            line2: '真鍮カラー＋M2止めねじで50N以上の引抜・せん断耐力を確保',
          },
          {
            label: '45° N-BK7 プリズム無損失屈曲',
            line1: '屈折率1.5168のN-BK7臨界角41.2°を超え反射率99.6%達成',
            line2: '急角度に折れ曲がる日本語ストローク先端まで均一発光を実現',
          },
        ],
      });

    // =========================================================================
    // 5. 60° CNC DOVETAIL LOCK & 6-PIN GOLD POGO-PIN SOCKET
    // =========================================================================
    case 'welcome_dock_pogo':
      return wrapWelcomeHdSvg({
        badge: 'WLK-05',
        stdTag: 'ISO 286 H7/g6 / DIN 6325',
        title: '60° CNCダブテール結合 & 6ピン金めっき伸縮ポゴピン給電ソケット図',
        analogy: 'カメラレンズ交換のように、文字モジュールを台座へカチッと差し込むだけで固定・給電・通信が一括完了',
        accent: '#b45309',
        accentSoft: '#fffbeb',
        body: `
          <!-- Left: 60-degree Dovetail Mechanical Lock Cutaway -->
          <g transform="translate(28, 86)">
            <rect x="0" y="0" width="320" height="244" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="12" y="21" font-size="10.2" font-weight="800" fill="#0f172a">60° CNCダブテール締結 &amp; ノックピン位置決め</text>

            <!-- Glyph Bottom Base -->
            <rect x="40" y="38" width="240" height="36" rx="4" fill="url(#wlk05-alu)" stroke="#475569" stroke-width="1.4"/>
            <text x="160" y="60" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">文字側 A6061-T6 マウントベース</text>

            <!-- Male 60-deg Dovetail Foot -->
            <polygon points="104,74 216,74 236,126 84,126" fill="#64748b" stroke="#1e293b" stroke-width="1.6"/>
            <text x="160" y="104" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">雄ダブテール (60°)</text>

            <!-- Female Plinth Socket Walls -->
            <polygon points="36,88 94,88 80,130 240,130 226,88 284,88 284,178 36,178" fill="url(#wlk05-dark)" stroke="#0f172a" stroke-width="1.5"/>
            <text x="160" y="160" text-anchor="middle" font-size="9.4" font-weight="800" fill="#f8fafc">台座側 SUS304 ダブテール受け溝</text>

            <!-- DIN 6325 Dowel Pins -->
            <rect x="58" y="62" width="8" height="44" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.2"/>
            <rect x="254" y="62" width="8" height="44" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.2"/>
            <text x="58" y="196" text-anchor="middle" font-size="8.2" font-weight="700" fill="#0369a1">Ø2mmノックピン</text>
            <text x="254" y="196" text-anchor="middle" font-size="8.2" font-weight="700" fill="#0369a1">H7/g6公差</text>

            <!-- M3 Lock Screw on Side -->
            <rect x="266" y="102" width="38" height="12" rx="2" fill="#ea580c" stroke="#7c2d12" stroke-width="1.2"/>
            <text x="278" y="128" text-anchor="middle" font-size="8" font-weight="800" fill="#c2410c">M3固定</text>

            <!-- Tolerance bar -->
            <rect x="16" y="210" width="288" height="24" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
            <text x="160" y="226" text-anchor="middle" font-size="8.8" font-weight="800" fill="#92400e" style="font-family:${FONT_MONO};">位置再現精度 ±0.015 mm / 締結トルク 0.8 N·m</text>
          </g>

          <!-- Right: 6-Pin Spring-Loaded Gold Pogo-Pin Block -->
          <g transform="translate(364, 86)">
            <rect x="0" y="0" width="328" height="244" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="12" y="21" font-size="10.2" font-weight="800" fill="#0f172a">6ピン金めっき伸縮ポゴピン 信号・電力ピンアサイン</text>

            <!-- Upper Target Gold Pads on Glyph -->
            <rect x="24" y="42" width="280" height="22" rx="3" fill="#1e293b"/>
            <!-- 6 Gold Pogo Pins with Internal Coil Springs -->
            ${[
              { idx: 1, name: '12V', col: '#dc2626' },
              { idx: 2, name: '12V', col: '#dc2626' },
              { idx: 3, name: 'GND', col: '#334155' },
              { idx: 4, name: 'CAN+', col: '#7c3aed' },
              { idx: 5, name: 'CAN-', col: '#0284c7' },
              { idx: 6, name: 'ID/T', col: '#059669' },
            ]
              .map((pin, i) => {
                const x = 44 + i * 46;
                return `
                  <rect x="${x - 10}" y="58" width="20" height="7" rx="1" fill="url(#wlk05-gold)" stroke="#a16207"/>
                  <!-- Telescoping plunger -->
                  <rect x="${x - 4}" y="65" width="8" height="26" rx="3" fill="url(#wlk05-gold)" stroke="#a16207" stroke-width="1"/>
                  <!-- Outer barrel with coil spring inside -->
                  <rect x="${x - 7}" y="88" width="14" height="58" rx="2" fill="#fef08a" stroke="#a16207" stroke-width="1.2"/>
                  <polyline points="${x - 4},96 ${x + 4},104 ${x - 4},112 ${x + 4},120 ${x - 4},128 ${x + 4},136" fill="none" stroke="#92400e" stroke-width="1.4"/>
                  <!-- Pin Label Pill -->
                  <rect x="${x - 17}" y="156" width="34" height="19" rx="4" fill="${pin.col}"/>
                  <text x="${x}" y="169" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff" style="font-family:${FONT_MONO};">${pin.name}</text>
                `;
              })
              .join('')}

            <!-- Lower PEEK Housing -->
            <rect x="24" y="142" width="280" height="10" rx="2" fill="#475569"/>

            <!-- Electrical Specs Box -->
            <rect x="16" y="186" width="296" height="48" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="26" y="204" font-size="8.8" font-weight="700" fill="#1e293b">• 接点仕様: BeCu＋0.76μm硬質金めっき / 接触抵抗 &lt; 18 mΩ</text>
            <text x="26" y="222" font-size="8.8" font-weight="700" fill="#b45309">• 定格: 5.0A/ピン連続 / 1.5mmストローク / 挿抜100,000回保証</text>
          </g>
        `,
        cards: [
          {
            label: '±15μm 60°ダブテール機構',
            line1: '望遠鏡・光学ベンチ標準の60°アリ溝構造で文字の傾きを零化',
            line2: 'DIN 6325焼入れノックピン2本がX/Z位置を毎回厳密再現',
          },
          {
            label: '6ピン無ケーブル一括接続',
            line1: '電源(12V×2, GND)＋CAN-FD差動＋1-Wire文字IDを一括接触',
            line2: '文字を外してもハーネス引き千切り事故が起きない安全構造',
          },
          {
            label: 'SUS304黒染め＋M3抜け止め',
            line1: 'ISO 4762 M3六角穴付ボルトを背面締結し耐振性3Gをクリア',
            line2: '絶縁ハウジングは耐熱260℃ LCP/PEEK樹脂で連続大電流対応',
          },
        ],
      });

    // =========================================================================
    // 6. USB-C PD 3.1 65W + 2S LiFePO4 UPS POWER ARCHITECTURE
    // =========================================================================
    case 'welcome_power_lifepo4':
      return wrapWelcomeHdSvg({
        badge: 'WLK-06',
        stdTag: 'USB-PD 3.1 / IEC 62133-2',
        title: 'USB-C PD 65W & 2S LiFePO4 無停電バッテリー電源ツリー図',
        analogy: 'USB-Cケーブル1本で急速充電しながら、ケーブルを抜いても一瞬も消えず4時間以上光り続ける安全UPS電源',
        accent: '#059669',
        accentSoft: '#ecfdf5',
        body: `
          <!-- Power Tree Flow Diagram -->
          <g transform="translate(24, 92)">
            <!-- USB-C PD Receptacle -->
            <rect x="0" y="18" width="114" height="96" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.6"/>
            <text x="57" y="40" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">USB-C PD 3.1</text>
            <text x="57" y="56" text-anchor="middle" font-size="9" font-weight="700" fill="#34d399" style="font-family:${FONT_MONO};">20V / 3.25A</text>
            <text x="57" y="72" text-anchor="middle" font-size="8.6" fill="#cbd5e1">Max 65W EPR</text>
            <rect x="12" y="84" width="90" height="20" rx="4" fill="#065f46"/>
            <text x="57" y="97" text-anchor="middle" font-size="8" font-weight="700" fill="#a7f3d0">CC1/CC2 + TVS</text>

            <line x1="114" y1="66" x2="152" y2="66" stroke="#059669" stroke-width="2.4" marker-end="url(#wlk06-arr-g)"/>

            <!-- Bidirectional Buck-Boost Charger + Power-Path -->
            <rect x="154" y="12" width="154" height="108" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
            <text x="231" y="34" text-anchor="middle" font-size="10" font-weight="800" fill="#065f46">双方向昇降圧チャージャ</text>
            <text x="231" y="50" text-anchor="middle" font-size="8.8" font-weight="700" fill="#047857" style="font-family:${FONT_MONO};">η = 96.2% (4-FET)</text>
            <rect x="166" y="60" width="130" height="22" rx="4" fill="#d1fae5"/>
            <text x="231" y="74" text-anchor="middle" font-size="8.4" font-weight="800" fill="#065f46">0ms 無停電Power-Path</text>
            <text x="231" y="104" text-anchor="middle" font-size="8.4" font-weight="700" fill="#334155">CC/CV 3.65V/cell精密充電</text>

            <!-- Downward branch to 2S LiFePO4 Battery + BMS -->
            <line x1="231" y1="120" x2="231" y2="154" stroke="#059669" stroke-width="2.2" marker-end="url(#wlk06-arr-g)"/>
            <rect x="116" y="156" width="230" height="82" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
            <text x="231" y="176" text-anchor="middle" font-size="9.8" font-weight="800" fill="#065f46">2S1P リン酸鉄リチウム (LiFePO4) + BMS</text>
            <!-- Two cylindrical cells -->
            <rect x="130" y="186" width="84" height="22" rx="4" fill="#10b981" stroke="#047857"/>
            <text x="172" y="200.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#ffffff">Cell 1 (3.2V)</text>
            <rect x="220" y="186" width="84" height="22" rx="4" fill="#10b981" stroke="#047857"/>
            <text x="262" y="200.5" text-anchor="middle" font-size="8.4" font-weight="800" fill="#ffffff">Cell 2 (3.2V)</text>
            <rect x="308" y="186" width="28" height="22" rx="3" fill="#0f172a"/>
            <text x="322" y="200.5" text-anchor="middle" font-size="7.5" font-weight="800" fill="#fbbf24">BMS</text>
            <text x="231" y="226" text-anchor="middle" font-size="8.2" font-weight="700" fill="#334155" style="font-family:${FONT_MONO};">6.4V 160mAh (1.02Wh / 20C角形) / 3,000サイクル / 熱暴走ゼロ</text>

            <!-- Output Rails on Right -->
            <line x1="308" y1="42" x2="386" y2="42" stroke="#ea580c" stroke-width="2.4" marker-end="url(#wlk06-arr-o)"/>
            <line x1="308" y1="92" x2="386" y2="92" stroke="#2563eb" stroke-width="2.4" marker-end="url(#wlk06-arr-b)"/>

            <!-- 12V Boost LED Rail -->
            <rect x="388" y="8" width="284" height="66" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
            <text x="400" y="28" font-size="9.8" font-weight="800" fill="#9a3412">12.0V / 3.5A 定格母線 (定常展示 9.2W / 2.3倍余力)</text>
            <text x="400" y="45" font-size="8.4" font-weight="700" fill="#c2410c" style="font-family:${FONT_MONO};">定常 9.2W (表面39.7℃) / UPS ECO 3.0W (約20分無停電)</text>
            <text x="400" y="61" font-size="8.4" fill="#7c2d12">eFuse電子ヒューズ＋突入電流ソフトスタート内蔵</text>

            <!-- 3.3V / 5V Logic & Audio Rail -->
            <rect x="388" y="86" width="284" height="66" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
            <text x="400" y="106" font-size="9.8" font-weight="800" fill="#1e3a8a">5.0V音響 / 3.3V超低ノイズLDOロジック母線</text>
            <text x="400" y="123" font-size="8.6" font-weight="700" fill="#1d4ed8" style="font-family:${FONT_MONO};">PSRR 78dB / 出力ノイズ &lt; 15 μVrms</text>
            <text x="400" y="139" font-size="8.4" fill="#1e40af">STM32H7・VL53L5CX ToF・24bit DACへクリーン給電</text>

            <!-- Safety Protection Summary -->
            <rect x="388" y="166" width="284" height="72" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="400" y="185" font-size="9.4" font-weight="800" fill="#0f172a">多重安全保護 (UL 1642 / UN38.3 準拠)</text>
            <text x="400" y="202" font-size="8.5" font-weight="700" fill="#334155">• 過充電(3.65V) / 過放電(2.50V) / 過電流(5A) 遮断</text>
            <text x="400" y="218" font-size="8.5" font-weight="700" fill="#334155">• セル間アクティブバランス &amp; NTC 0〜45℃充電制限</text>
            <text x="400" y="232" font-size="8.5" font-weight="700" fill="#059669">• 待機時ハードウェア物理SWで暗電流 0.0 μA</text>
          </g>
        `,
        cards: [
          {
            label: 'USB-C PD 3.1 65W 急速給電',
            line1: 'USB-IF準拠PDコントローラが20V/3.25Aを自動ネゴシエーション',
            line2: '24ピンSUS304シェル＋TVS保護で10,000回挿抜とESDに耐える',
          },
          {
            label: 'オリビン構造 LiFePO4 UPSパック',
            line1: '2.58cc角形積層LiFePO4(1.02Wh/20C)で釘刺し・過熱でも発火ゼロ',
            line2: '充放電3,000回超・定常9.2W自然対流39.7℃で安全連続展示',
          },
          {
            label: '0ms無停電UPS＆超高効率96%',
            line1: 'コードを抜いてもパワーパス切替で文字が瞬断せず約20分ECO点灯',
            line2: '4-FET同期昇降圧と超低ノイズLDOで発熱・音質劣化を抑制',
          },
        ],
      });

    // =========================================================================
    // 7. 8x8 ToF PROXIMITY + N52 BASS-REFLEX SPEAKER + OPTICAL ROTARY HMI
    // =========================================================================
    case 'welcome_tof_audio_hmi':
      return wrapWelcomeHdSvg({
        badge: 'WLK-07',
        stdTag: 'IEC 60825-1 Class 1 / AES2-2012',
        title: '8×8マルチゾーンToF測距・N52音響チャイム・光学ロータリーHMI図',
        analogy: '人が近づくのを64分割の赤外線レーザーで検知し、光の波紋と澄んだチャイム音でお出迎えする知覚・表現系',
        accent: '#db2777',
        accentSoft: '#fdf2f8',
        body: `
          <!-- Left: VL53L5CX 8x8 940nm VCSEL ToF Sensor -->
          <g transform="translate(24, 86)">
            <rect x="0" y="0" width="218" height="244" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="10" y="21" font-size="9.8" font-weight="800" fill="#9d174d">① 8×8 ToF測距 (VL53L5CX)</text>
            <!-- IR window + sensor -->
            <rect x="16" y="34" width="24" height="58" rx="4" fill="#1e293b" stroke="#db2777" stroke-width="1.4"/>
            <text x="28" y="66" text-anchor="middle" font-size="8" font-weight="800" fill="#f472b6">ToF</text>
            <!-- 63 deg FoV cone -->
            <polygon points="40,56 198,28 198,108 40,72" fill="#fce7f3" fill-opacity="0.72" stroke="#db2777" stroke-dasharray="4 3"/>
            <text x="132" y="54" text-anchor="middle" font-size="8.6" font-weight="800" fill="#be185d">940nm VCSEL</text>
            <text x="132" y="68" text-anchor="middle" font-size="8.2" font-weight="700" fill="#9d174d">63°対角FoV / 4.0m</text>
            <text x="132" y="83" text-anchor="middle" font-size="8" font-weight="700" fill="#334155" style="font-family:${FONT_MONO};">d = c · Δt / 2</text>

            <!-- 8x8 Heatmap Matrix Preview -->
            <text x="12" y="128" font-size="8.8" font-weight="800" fill="#0f172a">64ゾーン距離マップ (来訪者検知)</text>
            ${Array.from({ length: 6 })
              .map((_, r) =>
                Array.from({ length: 8 })
                  .map((__, c) => {
                    const dist = Math.hypot(c - 3.5, r - 2.5);
                    const fill = dist < 1.7 ? '#db2777' : dist < 2.9 ? '#f472b6' : '#fce7f3';
                    return `<rect x="${18 + c * 22}" y="${136 + r * 14}" width="19" height="11" rx="2" fill="${fill}"/>`;
                  })
                  .join('')
              )
              .join('')}
            <text x="109" y="234" text-anchor="middle" font-size="8.2" font-weight="700" fill="#be185d">Class 1 眼安全・左右移動方向も判定</text>
          </g>

          <!-- Middle: N52 Bass-Reflex Acoustic Chamber -->
          <g transform="translate(254, 86)">
            <rect x="0" y="0" width="218" height="244" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="10" y="21" font-size="9.8" font-weight="800" fill="#1d4ed8">② N52 3Wバスレフ音響機構</text>

            <!-- 2.0cc Micro-Labyrinth Sealed + Ported Enclosure -->
            <rect x="18" y="38" width="182" height="118" rx="8" fill="#f1f5f9" stroke="#334155" stroke-width="2"/>
            <!-- N52 Speaker Cone on top wall -->
            <polygon points="56,38 158,38 140,62 74,62" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.3"/>
            <rect x="88" y="62" width="38" height="16" rx="2" fill="url(#wlk07-cu)" stroke="#7c2d12"/>
            <text x="107" y="73" text-anchor="middle" font-size="7.6" font-weight="800" fill="#ffffff">N52磁気</text>
            <!-- Acoustic waves inside -->
            <path d="M 64 96 Q 107 84 150 96" fill="none" stroke="#2563eb" stroke-width="1.6"/>
            <path d="M 52 114 Q 107 100 162 114" fill="none" stroke="#2563eb" stroke-width="1.6"/>
            <!-- Bass-reflex port duct -->
            <rect x="150" y="130" width="48" height="16" rx="3" fill="#dbeafe" stroke="#2563eb" stroke-width="1.3"/>
            <text x="100" y="142" text-anchor="middle" font-size="8.0" font-weight="800" fill="#1e40af">2.0cc / f₀=440Hz(A4)</text>

            <!-- I2S DAC + Class-D Amp chain -->
            <rect x="18" y="168" width="182" height="64" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
            <text x="109" y="186" text-anchor="middle" font-size="8.8" font-weight="800" fill="#1e3a8a">24bit/96kHz I²S → Class-D</text>
            <text x="109" y="203" text-anchor="middle" font-size="8.4" font-weight="700" fill="#2563eb" style="font-family:${FONT_MONO};">SNR 102 dB / 効率 91%</text>
            <text x="109" y="220" text-anchor="middle" font-size="8.2" fill="#334155">THD+N &lt; 0.04% 澄んだ倍音再生</text>
          </g>

          <!-- Right: 36-Tooth Knurled Optical Rotary Encoder -->
          <g transform="translate(484, 86)">
            <rect x="0" y="0" width="212" height="244" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <text x="10" y="21" font-size="9.8" font-weight="800" fill="#c2410c">③ 光学式ロータリーHMI</text>

            <!-- Knurled Aluminum Dial Cross-Section -->
            <circle cx="106" cy="96" r="46" fill="url(#wlk07-alu)" stroke="#475569" stroke-width="2" stroke-dasharray="4 3"/>
            <circle cx="106" cy="96" r="35" fill="#1e293b" stroke="#ea580c" stroke-width="3"/>
            <!-- Slotted optical encoder disc -->
            <circle cx="106" cy="96" r="22" fill="none" stroke="#38bdf8" stroke-width="5" stroke-dasharray="4 4"/>
            <circle cx="106" cy="96" r="8" fill="#f8fafc" stroke="#334155" stroke-width="1.4"/>
            <text x="106" y="158" text-anchor="middle" font-size="8.6" font-weight="800" fill="#0f172a">36歯ダイヤモンドローレット</text>

            <!-- Quadrature A/B Phase Signals -->
            <rect x="14" y="168" width="184" height="64" rx="6" fill="#fff7ed" stroke="#fdba74"/>
            <text x="24" y="184" font-size="8.2" font-weight="800" fill="#9a3412">A相 / B相 90°位相差光学パルス</text>
            <polyline points="24,202 38,202 38,192 58,192 58,202 78,202 78,192 98,192 98,202 118,202" fill="none" stroke="#ea580c" stroke-width="1.6"/>
            <polyline points="24,218 48,218 48,208 68,208 68,218 88,218 88,208 108,208 108,218 128,218" fill="none" stroke="#0284c7" stroke-width="1.6"/>
            <text x="160" y="206" text-anchor="middle" font-size="8" font-weight="800" fill="#c2410c">24click/rev</text>
            <text x="160" y="220" text-anchor="middle" font-size="7.8" font-weight="700" fill="#334155">100万回無接点</text>
          </g>
        `,
        cards: [
          {
            label: '64ゾーンToF＋環境照度連動',
            line1: '人の接近距離・移動方向を検知し「よ→う→こ→そ」へ光の波紋',
            line2: 'RGB/ALS照度センサが昼夜の外光に応じ輝度・色温度を自動最適化',
          },
          {
            label: 'ヘルムホルツ共鳴2.0cc音響箱',
            line1: 'N52ネオジム磁気＋折返しラビリンスf₀=440Hz(A4)で豊かな響き',
            line2: 'デジタルI²S直結で基板内アナログノイズ混入を完全排除',
          },
          {
            label: 'カメラ級ローレット光学ダイヤル',
            line1: '無接点フォトインタラプタA/B相検出でチャタリング・摩耗ゼロ',
            line2: '回転で輝度無段階調整、押し込みで演出モード切替を実現',
          },
        ],
      });

    // =========================================================================
    // 8. WLK-435 OPTICAL BENCH PLINTH & 435-PART MASTER SYSTEM ARCHITECTURE
    // =========================================================================
    case 'welcome_optical_plinth':
      return wrapWelcomeHdSvg({
        badge: 'WLK-08',
        stdTag: 'JIS B7513 Grade-0 / WLK-435',
        title: 'WLK-435 光学ベンチ基準定盤 & 全435パーツ実動作システム系統図',
        analogy: '4文字(各62p)の独立光学モジュールを±10μm平面度で整列し、4重人感・PoE++・DMX512・JJY電波時計を統合する計装台座',
        accent: '#e65a28',
        accentSoft: '#fff7ed',
        body: `
          <!-- Top: 4 Glyphs Mounted at Precision Pitch on Optical Bench Plinth -->
          <g transform="translate(30, 86)">
            ${[
              { x: 46, ch: 'よ', pos: 'X=-66mm', cnt: '62 parts' },
              { x: 196, ch: 'う', pos: 'X=-22mm', cnt: '62 parts' },
              { x: 346, ch: 'こ', pos: 'X=+22mm', cnt: '62 parts' },
              { x: 496, ch: 'そ', pos: 'X=+66mm', cnt: '62 parts' },
            ]
              .map(
                (g) => `
              <rect x="${g.x}" y="6" width="118" height="72" rx="8" fill="#ffffff" stroke="#334155" stroke-width="1.6"/>
              <text x="${g.x + 59}" y="42" text-anchor="middle" font-size="24" font-weight="900" fill="#0f172a">${g.ch}</text>
              <text x="${g.x + 59}" y="58" text-anchor="middle" font-size="8.2" font-weight="700" fill="#0284c7" style="font-family:${FONT_MONO};">${g.pos}</text>
              <text x="${g.x + 59}" y="71" text-anchor="middle" font-size="7.2" font-weight="700" fill="#64748b">${g.cnt} (CNC+光学+熱)</text>
              <!-- Dovetail + 6-pin pogo stem -->
              <rect x="${g.x + 42}" y="78" width="34" height="14" rx="2" fill="url(#wlk08-gold)" stroke="#a16207"/>
            `
              )
              .join('')}

            <!-- Main 194mm A6061-T6 Optical Bench Plinth -->
            <rect x="24" y="92" width="612" height="62" rx="9" fill="url(#wlk08-dark)" stroke="#0f172a" stroke-width="1.8"/>
            <!-- Left & Right SUS304 Bayonet End Caps -->
            <rect x="6" y="88" width="22" height="70" rx="5" fill="url(#wlk08-alu)" stroke="#475569" stroke-width="1.5"/>
            <rect x="632" y="88" width="22" height="70" rx="5" fill="url(#wlk08-alu)" stroke="#475569" stroke-width="1.5"/>
            <!-- Sony Alpha Cinnabar Horizon Signature Bar -->
            <rect x="38" y="102" width="584" height="7" rx="3" fill="#e65a28"/>

            <!-- Internal Subsystems inside Plinth Cutaway -->
            <rect x="44" y="116" width="128" height="30" rx="4" fill="#065f46" stroke="#10b981"/>
            <text x="108" y="130" text-anchor="middle" font-size="8.1" font-weight="800" fill="#ffffff">PD 65W / PoE++ 71W</text>
            <text x="108" y="141" text-anchor="middle" font-size="7.3" fill="#a7f3d0">eFuse+LiFePO4+予熱/破裂弁</text>

            <rect x="182" y="116" width="150" height="30" rx="4" fill="#312e81" stroke="#818cf8"/>
            <text x="257" y="130" text-anchor="middle" font-size="8.1" font-weight="800" fill="#ffffff">絶縁CAN-FD / DMX / PTP</text>
            <text x="257" y="141" text-anchor="middle" font-size="7.3" fill="#c7d2fe">STM32H7+7.5fs+JJY+OLED</text>

            <rect x="342" y="116" width="134" height="30" rx="4" fill="#831843" stroke="#f472b6"/>
            <text x="409" y="130" text-anchor="middle" font-size="8.1" font-weight="800" fill="#ffffff">4重人感 + 11ch分光</text>
            <text x="409" y="141" text-anchor="middle" font-size="7.3" fill="#fbcfe8">ToF+60GHz+UWB+遠IR+BG40</text>

            <rect x="486" y="116" width="130" height="30" rx="4" fill="#1e3a8a" stroke="#60a5fa"/>
            <text x="551" y="130" text-anchor="middle" font-size="8.1" font-weight="800" fill="#ffffff">音響+175Hz LRA+定盤</text>
            <text x="551" y="141" text-anchor="middle" font-size="7.3" fill="#bfdbfe">M4×0.25脚+ARRI+DGUV</text>

            <!-- Sorbothane Anti-Vibration Feet + M4x0.25 Leveling Feet -->
            <rect x="64" y="154" width="38" height="10" rx="3" fill="#334155"/>
            <rect x="298" y="154" width="64" height="10" rx="3" fill="#334155"/>
            <rect x="558" y="154" width="38" height="10" rx="3" fill="#334155"/>

            <!-- Datum Dimension Line -->
            <line x1="24" y1="180" x2="636" y2="180" stroke="#0284c7" stroke-width="1.4" marker-start="url(#wlk08-arr-b)" marker-end="url(#wlk08-arr-b)"/>
            <rect x="202" y="170" width="256" height="20" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
            <text x="330" y="183.5" text-anchor="middle" font-size="9" font-weight="800" fill="#0369a1" style="font-family:${FONT_MONO};">光学基準定盤 194.0 mm (±0.010 mm 平面度)</text>

            <!-- Bottom Part Count Breakdown Strip -->
            <rect x="10" y="202" width="640" height="34" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="330" y="223" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">
              総構成 435実動作パーツ = 「よ」62 + 「う」62 + 「こ」62 + 「そ」62 + 光学ベンチ台座 187 (装飾部品 0)
            </text>
          </g>
        `,
        cards: [
          {
            label: '定盤メトロロジー＆安全リギング',
            line1: 'コーナーキューブ・Spectralon白板・M4微調脚',
            line2: 'ARRI/Arca-Swiss・NATOレール・DGUV安全環',
          },
          {
            label: '4重人感融合＆舞台/建築インフラ',
            line1: 'ToF・60GHzレーダー・UWB・遠IR＋11ch分光',
            line2: 'ix Industrial PoE++・PTP・DMX512・5kV CAN',
          },
          {
            label: '100%実製造可能な435パーツ設計',
            line1: 'eFuse・能動バランサ・0℃予熱・破裂弁・TEC',
            line2: '分解スライダーで全435パーツの熱・光経路を検証',
          },
        ],
      });

    default:
      return null;
  }
}
