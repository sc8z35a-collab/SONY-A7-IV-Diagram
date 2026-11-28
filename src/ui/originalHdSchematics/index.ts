import { PartExplanation } from '../../assemblies/types';

/**
 * 10 Bespoke Ultra-HD 720x470 Japanese Technical SVG Infographics for Original #01: RIIMOS E1.
 * Emits `class="evf-hd-svg" data-original-hd="1"` so ExplanationDrawer automatically enables
 * click-to-zoom fullscreen vector lightbox & mobile 90° landscape rotation.
 */

const FONT_STACK =
  "'Inter','Noto Sans JP','Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif";

function wrapOriginalPoster(
  code: string,
  titleJa: string,
  subtitleEn: string,
  accent: string,
  bodySvg: string,
  formulaBar: string
): string {
  return `<svg class="evf-hd-svg" data-original-hd="1" viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" style="font-family:${FONT_STACK};">
  <defs>
    <linearGradient id="ogBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <pattern id="ogGrid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e2e8f0" stroke-width="0.6"/>
    </pattern>
  </defs>
  <rect x="0" y="0" width="720" height="470" rx="14" fill="url(#ogBg)"/>
  <rect x="12" y="12" width="696" height="446" rx="10" fill="url(#ogGrid)" stroke="#cbd5e1" stroke-width="1.2"/>
  <rect x="12" y="12" width="696" height="58" rx="10" fill="#0f172a"/>
  <rect x="24" y="23" width="118" height="24" rx="5" fill="${accent}"/>
  <text x="83" y="39" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">${code}</text>
  <text x="154" y="37" font-size="15.5" font-weight="800" fill="#f8fafc">${titleJa}</text>
  <text x="154" y="56" font-size="10.5" font-weight="600" fill="#94a3b8">${subtitleEn}</text>
  ${bodySvg}
  <rect x="24" y="416" width="672" height="32" rx="7" fill="#0f172a"/>
  <text x="36" y="436" font-size="11.5" font-weight="700" fill="#38bdf8">${formulaBar}</text>
</svg>`;
}

export function renderOriginalHdSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'orig_e1_chassis_layout':
      return wrapOriginalPoster(
        'RIIMOS E1 · 全体',
        '3層完全無干渉シャーシ ＆ スケッチ忠実パッケージング図',
        'W216 × H148 × D130 mm | 0.001mm Zero-Collision 4-Tier Verified | 2.48 kg',
        '#f97316',
        `
        <!-- Left: Top View matching image.png -->
        <rect x="28" y="84" width="318" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="42" y="106" font-size="12.5" font-weight="800" fill="#0f172a">上面図（スケッチ準拠：赤電源＋黒L字弾倉）</text>
        <rect x="52" y="124" width="270" height="196" rx="8" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
        <!-- Black L-shape Mag -->
        <path d="M 64 136 L 178 136 L 178 242 L 204 242 L 204 308 L 64 308 Z" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <text x="120" y="198" text-anchor="middle" font-size="13" font-weight="800" fill="#f8fafc">黒色 L字弾倉</text>
        <text x="120" y="218" text-anchor="middle" font-size="11" fill="#fb923c">300発 残弾ゼロ</text>
        <text x="120" y="236" text-anchor="middle" font-size="10" fill="#cbd5e1">スモーク透視窓</text>
        <!-- Red Battery Unit -->
        <rect x="190" y="136" width="120" height="126" rx="6" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/>
        <text x="250" y="186" text-anchor="middle" font-size="12.5" font-weight="800" fill="#ffffff">赤色電源ユニット</text>
        <text x="250" y="206" text-anchor="middle" font-size="10.5" fill="#fde68a">21700 × 5本 (92.5Wh)</text>
        <text x="250" y="224" text-anchor="middle" font-size="9.5" fill="#fee2e2">BMS 40A + USB-C充電</text>
        <!-- Top 360 Dome + E-Stop -->
        <circle cx="186" cy="284" r="18" fill="#38bdf8" fill-opacity="0.35" stroke="#0284c7" stroke-width="2"/>
        <text x="186" y="288" text-anchor="middle" font-size="9" font-weight="800" fill="#0369a1">360°</text>
        <circle cx="282" cy="286" r="16" fill="#ef4444" stroke="#facc15" stroke-width="3"/>
        <text x="282" y="290" text-anchor="middle" font-size="8.5" font-weight="800" fill="#ffffff">STOP</text>
        <text x="42" y="344" font-size="11" font-weight="700" fill="#334155">・4隅 45° X字ラジアル配置脚 → XYZ＋斜め360°自在</text>
        <text x="42" y="364" font-size="11" font-weight="700" fill="#334155">・中段装甲ベイに moto g52j (171×76.8mm) 完全非露出内蔵</text>
        <text x="42" y="384" font-size="11" font-weight="700" fill="#059669">・sp 0.001mm 監査: 全4ティア 干渉0 / 浮遊0 / 爆発貫通0</text>

        <!-- Right: Front Elevation matching image_2.png -->
        <rect x="358" y="84" width="334" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="372" y="106" font-size="12.5" font-weight="800" fill="#0f172a">正面立面図（表4丁＋裏4丁＝計8丁・丸カメラ・4脚）</text>
        <!-- Main Rectangular Body -->
        <rect x="412" y="148" width="226" height="148" rx="6" fill="#334155" stroke="#0f172a" stroke-width="2.2"/>
        <!-- Top Dome -->
        <path d="M 505 148 Q 525 118 545 148 Z" fill="#38bdf8" fill-opacity="0.4" stroke="#0284c7" stroke-width="2"/>
        <text x="525" y="130" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0369a1">上部360°監視</text>
        <!-- 4 Square Muzzle Ports -->
        <rect x="426" y="168" width="38" height="34" rx="3" fill="#0f172a" stroke="#f97316" stroke-width="2"/>
        <rect x="586" y="168" width="38" height="34" rx="3" fill="#0f172a" stroke="#f97316" stroke-width="2"/>
        <rect x="426" y="242" width="38" height="34" rx="3" fill="#0f172a" stroke="#f97316" stroke-width="2"/>
        <rect x="586" y="242" width="38" height="34" rx="3" fill="#0f172a" stroke="#f97316" stroke-width="2"/>
        <text x="445" y="189" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">#1</text>
        <text x="605" y="189" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">#2</text>
        <text x="445" y="263" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">#3</text>
        <text x="605" y="263" text-anchor="middle" font-size="10" font-weight="800" fill="#f8fafc">#4</text>
        <!-- Upper Center Circular Camera -->
        <circle cx="525" cy="186" r="22" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
        <circle cx="525" cy="186" r="11" fill="#0284c7"/>
        <text x="525" y="224" text-anchor="middle" font-size="10" font-weight="800" fill="#e2e8f0">120Hz カメラ (表裏2基)</text>
        <!-- Internal moto g52j Band -->
        <rect x="470" y="238" width="110" height="22" rx="4" fill="#0ea5e9" fill-opacity="0.25" stroke="#38bdf8" stroke-dasharray="4 2"/>
        <text x="525" y="253" text-anchor="middle" font-size="9.5" font-weight="700" fill="#bae6fd">中段 moto g52j (0円)</text>
        <!-- 4 Articulated Legs -->
        <polyline points="424,296 392,332 378,378" fill="none" stroke="#1e293b" stroke-width="7" stroke-linecap="round"/>
        <polyline points="468,296 456,336 446,378" fill="none" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <polyline points="582,296 594,336 604,378" fill="none" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <polyline points="626,296 658,332 672,378" fill="none" stroke="#1e293b" stroke-width="7" stroke-linecap="round"/>
        <circle cx="378" cy="380" r="7" fill="#f97316"/>
        <circle cx="446" cy="380" r="6" fill="#f97316"/>
        <circle cx="604" cy="380" r="6" fill="#f97316"/>
        <circle cx="672" cy="380" r="7" fill="#f97316"/>
        <line x1="368" y1="388" x2="682" y2="388" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 4"/>
        `,
        '原則1: 実動作保証 | 原則2: 極限最安 9,700円 (電池/弾/スマホ除) | 原則3: 妥協不可能 (0.135J安全適合)'
      );

    case 'orig_e1_battery_5s21700':
      return wrapOriginalPoster(
        'PWR · 5S1P',
        '上部赤色 充電式 21700×5本 (92.5Wh) 千鳥配置 ＆ 保護給電回路',
        '5S1P 18.5V 5000mAh | 40A Balance BMS + USB-C PD Charger + Dual Sync Buck',
        '#dc2626',
        `
        <rect x="28" y="84" width="330" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="42" y="106" font-size="12.5" font-weight="800" fill="#991b1b">千鳥ハニカム 5本最密断面 (下3本＋上2本)</text>
        <rect x="52" y="122" width="282" height="170" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
        <!-- Upper 2 cells -->
        <circle cx="154" cy="176" r="30" fill="#0284c7" stroke="#0c4a6e" stroke-width="2.5"/>
        <text x="154" y="180" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">C4</text>
        <circle cx="232" cy="176" r="30" fill="#0284c7" stroke="#0c4a6e" stroke-width="2.5"/>
        <text x="232" y="180" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">C5</text>
        <!-- Lower 3 cells -->
        <circle cx="115" cy="242" r="30" fill="#0369a1" stroke="#0c4a6e" stroke-width="2.5"/>
        <text x="115" y="246" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">C1</text>
        <circle cx="193" cy="242" r="30" fill="#0369a1" stroke="#0c4a6e" stroke-width="2.5"/>
        <text x="193" y="246" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">C2</text>
        <circle cx="271" cy="242" r="30" fill="#0369a1" stroke="#0c4a6e" stroke-width="2.5"/>
        <text x="271" y="246" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">C3</text>
        <text x="42" y="318" font-size="10.4" font-weight="700" fill="#1e293b">・中心間 21.95mm &gt; φ21.4mm（全セル間 1.35mm断熱）</text>
        <text x="42" y="338" font-size="10.4" font-weight="700" fill="#1e293b">・スポット溶接不要の脱着スプリング接点（100円）</text>
        <text x="42" y="358" font-size="10.4" font-weight="700" fill="#1e293b">・USB-C PD そのまま充電 ＋ 予備5本即交換の両対応</text>
        <text x="42" y="378" font-size="10.4" font-weight="700" fill="#dc2626">・回路部品合計 1,170円（※充電池5本代は予算外）</text>

        <rect x="370" y="84" width="322" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="384" y="106" font-size="12.5" font-weight="800" fill="#0f172a">電源保護・2系統分離配電ブロック図</text>
        <rect x="392" y="124" width="278" height="44" rx="6" fill="#0284c7"/>
        <text x="531" y="144" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">5S1P 21700 × 5 (18.5V / 92.5Wh)</text>
        <text x="531" y="160" text-anchor="middle" font-size="10" fill="#e0f2fe">USB-C 5S昇圧充電(220円) ⇄ 5S 40A BMS(220円)</text>
        <path d="M 531 168 L 531 190" stroke="#334155" stroke-width="2.5"/>
        <rect x="424" y="190" width="214" height="36" rx="6" fill="#ea580c"/>
        <text x="531" y="212" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">40Aヒューズ ＋ 物理E-Stop (NC)</text>
        <path d="M 464 226 L 464 256 M 598 226 L 598 256" stroke="#334155" stroke-width="2.5"/>
        <rect x="386" y="256" width="146" height="62" rx="6" fill="#1e293b"/>
        <text x="459" y="278" text-anchor="middle" font-size="11" font-weight="800" fill="#fbbf24">6V / 10A 同期降圧</text>
        <text x="459" y="295" text-anchor="middle" font-size="9.5" fill="#e2e8f0">MG996R×12脚 / 照準×4</text>
        <text x="459" y="310" text-anchor="middle" font-size="9.5" fill="#94a3b8">240円・効率92%</text>
        <rect x="542" y="256" width="140" height="62" rx="6" fill="#065f46"/>
        <text x="612" y="278" text-anchor="middle" font-size="11" font-weight="800" fill="#6ee7b7">5V / 5A 分離降圧</text>
        <text x="612" y="295" text-anchor="middle" font-size="9.5" fill="#ecfdf5">moto g52j / ESP32 / 3Cam</text>
        <text x="612" y="310" text-anchor="middle" font-size="9.5" fill="#a7f3d0">140円 + 0.135J上限</text>
        <rect x="386" y="334" width="296" height="52" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>
        <text x="534" y="356" text-anchor="middle" font-size="11" font-weight="800" fill="#991b1b">発射系直列 ハード安全遮断 MOSFET (110円)</text>
        <text x="534" y="374" text-anchor="middle" font-size="9.8" fill="#7f1d1d">人物検知 / E-Stop / 通信断200ms で &lt;1ms 物理カット</text>
        `,
        '92.5Wh × 効率88% = 実効81.4Wh | 5S高電圧伝送により大電流ロス I²R を 1/9 へ劇的削減'
      );

    case 'orig_e1_mag_zerowaste':
      return wrapOriginalPoster(
        'MAG · 0残弾',
        '上部黒色 L字 300発弾倉 ＆ 残弾ゼロ「追従球＋正逆分配」機構',
        '300 Rounds 6mm 0.12g BB (36g) | Reversible N20 One-Way 8-Port Auto-Loader',
        '#1e293b',
        `
        <rect x="28" y="84" width="664" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="44" y="108" font-size="13" font-weight="800" fill="#0f172a">300発すべてを1発も余さず全8丁へ撃ち切る給弾メカニズム</text>
        <!-- Step 1: L-Hopper -->
        <rect x="44" y="128" width="150" height="148" rx="8" fill="#1e293b"/>
        <text x="119" y="152" text-anchor="middle" font-size="11.5" font-weight="800" fill="#f8fafc">① L字 300発弾倉</text>
        <circle cx="80" cy="186" r="10" fill="#f1f5f9"/><circle cx="102" cy="186" r="10" fill="#f1f5f9"/><circle cx="124" cy="186" r="10" fill="#f1f5f9"/>
        <circle cx="91" cy="206" r="10" fill="#f1f5f9"/><circle cx="113" cy="206" r="10" fill="#f1f5f9"/><circle cx="135" cy="206" r="10" fill="#f1f5f9"/>
        <circle cx="157" cy="206" r="10" fill="#f97316" stroke="#ffffff" stroke-width="1.5"/>
        <text x="119" y="240" text-anchor="middle" font-size="10" fill="#fb923c">定荷重バネ (1.5N) ＋</text>
        <text x="119" y="256" text-anchor="middle" font-size="10" fill="#cbd5e1">電動撹拌羽根 (詰まり0)</text>
        <!-- Arrow -->
        <path d="M 196 202 L 228 202" stroke="#f97316" stroke-width="4" marker-end="none"/>
        <polygon points="228,195 240,202 228,209" fill="#f97316"/>
        <!-- Step 2: Zero-waste follower -->
        <rect x="242" y="128" width="194" height="148" rx="8" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>
        <text x="339" y="152" text-anchor="middle" font-size="11.5" font-weight="800" fill="#c2410c">② オレンジ非発射追従球列</text>
        <circle cx="272" cy="198" r="10" fill="#f97316"/><circle cx="294" cy="198" r="10" fill="#f97316"/><circle cx="316" cy="198" r="10" fill="#f97316"/><circle cx="338" cy="198" r="10" fill="#f97316"/>
        <line x1="272" y1="198" x2="338" y2="198" stroke="#7c2d12" stroke-width="2"/>
        <circle cx="364" cy="198" r="10" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
        <text x="364" y="202" text-anchor="middle" font-size="8" font-weight="800" fill="#0f172a">300</text>
        <text x="339" y="232" text-anchor="middle" font-size="10" font-weight="700" fill="#9a3412">数珠つなぎTPU球が300発目を</text>
        <text x="339" y="248" text-anchor="middle" font-size="10" font-weight="700" fill="#9a3412">フライホイール直前まで完全押出し</text>
        <text x="339" y="264" text-anchor="middle" font-size="9.5" fill="#ea580c">光学センサ検知で追従球は自動停止</text>
        <!-- Arrow -->
        <path d="M 438 202 L 468 202" stroke="#0f172a" stroke-width="4"/>
        <polygon points="468,195 480,202 468,209" fill="#0f172a"/>
        <!-- Step 3: N20 Reversible Distributor -->
        <rect x="482" y="128" width="194" height="148" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
        <text x="579" y="152" text-anchor="middle" font-size="11.5" font-weight="800" fill="#166534">③ 正逆N20 ワンウェイ分配</text>
        <rect x="502" y="170" width="154" height="32" rx="5" fill="#16a34a"/>
        <text x="579" y="190" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">正転 (+V) → 前面主砲 4丁</text>
        <rect x="502" y="212" width="154" height="32" rx="5" fill="#0284c7"/>
        <text x="579" y="232" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">逆転 (-V) → 背面迎撃 4丁</text>
        <text x="579" y="262" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14532d">170円モーター1基で前後切替＆撹拌</text>

        <!-- Bottom Comparison Box -->
        <rect x="44" y="294" width="632" height="92" rx="8" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="60" y="318" font-size="11.5" font-weight="800" fill="#0f172a">通常多弾マガジン vs RIIMOS E1 残弾ゼロ設計</text>
        <text x="60" y="340" font-size="10.5" fill="#64748b">・通常式：給弾チューブ長 150 mm 内に 20〜30 発が必ず残って発射不能（浪費率 ~10%）</text>
        <text x="60" y="360" font-size="10.5" font-weight="700" fill="#059669">・RIIMOS E1：最終BBの直後を連結TPU追従球8個が押し切り → 実弾消費 300/300発（残弾0発・100.0%効率！）</text>
        <text x="60" y="378" font-size="10" fill="#475569">・最安 6mm 0.12g BB弾 (約0.08円/発) × 300発 = 満タンわずか 24円・総質量 36g</text>
        `,
        'V_Lmag (212 cm³) >> V_300BBs (56.6 cm³) | M_300BBs = 36.0 g | 残弾ゼロ効率 = 100.0%'
      );

    case 'orig_e1_launcher_8x':
      return wrapOriginalPoster(
        'GUN · 8丁共有軸',
        '縦列2丁貫通共有シャフト ＆ 面連動2軸照準 0.135J 機関銃',
        '4x 180 Motors Drive All 16 Flywheels (-75% Cost & Mass) | 44.5 m/s (0.119J)',
        '#d97706',
        `
        <rect x="28" y="84" width="330" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="42" y="106" font-size="12.5" font-weight="800" fill="#92400e">縦列共有シャフト断面（180モーター1基→上下2丁）</text>
        <!-- Vertical shared shaft -->
        <rect x="176" y="130" width="12" height="236" rx="3" fill="#94a3b8" stroke="#334155"/>
        <!-- Center 180 motor -->
        <rect x="156" y="218" width="52" height="60" rx="6" fill="#d97706" stroke="#78350f" stroke-width="2"/>
        <text x="182" y="246" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">180高速</text>
        <text x="182" y="262" text-anchor="middle" font-size="9.5" fill="#fef3c7">120円</text>
        <!-- Top barrel flywheels -->
        <rect x="64" y="146" width="234" height="44" rx="6" fill="#1e293b"/>
        <circle cx="118" cy="168" r="16" fill="#f97316"/><circle cx="118" cy="168" r="6" fill="#0f172a"/>
        <circle cx="246" cy="168" r="16" fill="#f97316"/><circle cx="246" cy="168" r="6" fill="#0f172a"/>
        <text x="182" y="142" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">上段銃口 (#1/#2/#5/#6)</text>
        <!-- Bot barrel flywheels -->
        <rect x="64" y="308" width="234" height="44" rx="6" fill="#1e293b"/>
        <circle cx="118" cy="330" r="16" fill="#f97316"/><circle cx="118" cy="330" r="6" fill="#0f172a"/>
        <circle cx="246" cy="330" r="16" fill="#f97316"/><circle cx="246" cy="330" r="6" fill="#0f172a"/>
        <text x="182" y="370" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">下段銃口 (#3/#4/#7/#8)</text>
        <!-- moto g52j clearance note -->
        <rect x="44" y="232" width="102" height="32" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="3 2"/>
        <text x="95" y="252" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">スマホと9.6mm余裕</text>
        <text x="44" y="392" font-size="10.5" font-weight="700" fill="#059669">・16モーター → 4モーター (480円・総重量 390g)</text>

        <rect x="370" y="84" width="322" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="384" y="106" font-size="12.5" font-weight="800" fill="#0f172a">面連動2軸照準 ＆ 前後主砲自動スワップ</text>
        <rect x="392" y="124" width="278" height="68" rx="7" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
        <text x="531" y="146" text-anchor="middle" font-size="12" font-weight="800" fill="#1e40af">進行方向側 4丁 ＝ 主砲（アクティブ照準）</text>
        <text x="531" y="165" text-anchor="middle" font-size="10" fill="#1d4ed8">SG90 × 2（パン±22° / チルト±18°・600°/s）</text>
        <text x="531" y="182" text-anchor="middle" font-size="10" fill="#3b82f6">1丁単発精密 / 4丁リレー(20発/s) / 4丁斉射</text>
        <rect x="392" y="206" width="278" height="68" rx="7" fill="#f8fafc" stroke="#475569" stroke-width="1.8"/>
        <text x="531" y="228" text-anchor="middle" font-size="12" font-weight="800" fill="#334155">反対側 4丁 ＝ 後方迎撃／方向反転時即主砲</text>
        <text x="531" y="247" text-anchor="middle" font-size="10" fill="#475569">前後100%対称構造 → 機体180°旋回不要 (0 ms切替)</text>
        <text x="531" y="264" text-anchor="middle" font-size="10" fill="#64748b">N20 ロータリーカムシーケンサ（170円）で給弾切替</text>
        <rect x="392" y="290" width="278" height="96" rx="7" fill="#fefce8" stroke="#ca8a04" stroke-width="1.8"/>
        <text x="406" y="312" font-size="11.5" font-weight="800" fill="#854d0e">0.135J 未満 物理上限クランプ＆ホップ弾道</text>
        <text x="406" y="332" font-size="10.2" fill="#713f12">・市販φ6.1mmアルミ管(280円)＋シリコンホップ(80円)</text>
        <text x="406" y="350" font-size="10.2" fill="#713f12">・定電圧上限5.2V封印 → 最大0.125J (&lt;0.135J厳守)</text>
        <text x="406" y="368" font-size="10.2" font-weight="700" fill="#15803d">・8丁発射＋照準＋給弾 合計原価 = 1,760 円！</text>
        `,
        'E_kin = 0.5 × 0.00012 kg × (44.5 m/s)² = 0.119 J < 0.135 J (10歳以上用安全規格完全適合)'
      );

    case 'orig_e1_camera_120hz_estop':
      return wrapOriginalPoster(
        'OPT · 120Hz',
        '前後120Hz視覚 ＋ 物理1軸×GPU安定化 ＋ +85°緊急視界シャットアウト',
        'OV7720/7725 (500 JPY x2) + Top 360° GC0308 (380 JPY) | Fail-Closed Shutter',
        '#0284c7',
        `
        <rect x="28" y="84" width="330" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="42" y="106" font-size="12.5" font-weight="800" fill="#0369a1">1個130円サーボの「一人二役」スタビ＆緊急遮断</text>
        <!-- Normal Mode -->
        <rect x="44" y="122" width="298" height="114" rx="7" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.8"/>
        <text x="58" y="144" font-size="11.5" font-weight="800" fill="#075985">通常時 [-35°, +35°]：ハイブリッド2軸手ブレ補正</text>
        <circle cx="96" cy="186" r="24" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
        <circle cx="96" cy="186" r="10" fill="#38bdf8"/>
        <rect x="78" y="152" width="36" height="8" rx="2" fill="#f97316"/>
        <text x="134" y="170" font-size="10.2" fill="#0c4a6e">・ピッチ揺れ → SG90 物理逆位相駆動</text>
        <text x="134" y="188" font-size="10.2" fill="#0c4a6e">・ロール微振動 → Adreno GPU EIS (0円)</text>
        <text x="134" y="206" font-size="10.2" font-weight="700" fill="#059669">・遮光フード上端退避 → 視界遮蔽 0.0%</text>
        <!-- E-Stop Fail-Closed Mode -->
        <rect x="44" y="250" width="298" height="136" rx="7" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
        <text x="58" y="272" font-size="11.5" font-weight="800" fill="#991b1b">緊急停止／停電時 [+85°]：物理シャットアウト</text>
        <circle cx="96" cy="322" r="24" fill="#0f172a" stroke="#dc2626" stroke-width="3"/>
        <rect x="70" y="302" width="52" height="40" rx="5" fill="#f97316" stroke="#7c2d12" stroke-width="2"/>
        <text x="96" y="326" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">CLOSED</text>
        <text x="134" y="304" font-size="10.2" fill="#7f1d1d">・SG90が+85°へ振り切り遮光フード閉鎖</text>
        <text x="134" y="322" font-size="10.2" fill="#7f1d1d">・電源断でもトーションバネで自動閉鎖</text>
        <text x="134" y="340" font-size="10.2" font-weight="700" fill="#dc2626">・閉鎖時間 &lt; 65 ms（追加ソレノイド 0円！）</text>
        <text x="134" y="358" font-size="10" fill="#991b1b">・視界復帰時の緊急回復もL4で特訓済</text>

        <rect x="370" y="84" width="322" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="384" y="106" font-size="12.5" font-weight="800" fill="#0f172a">3カメラ USB 2.0 帯域収支 ＆ 360°2階層視覚</text>
        <!-- Bar chart of USB 2.0 Bandwidth -->
        <text x="388" y="138" font-size="11" font-weight="700" fill="#334155">moto g52j USB 2.0 実効上限: 38.0 MB/s</text>
        <rect x="388" y="148" width="286" height="28" rx="5" fill="#e2e8f0" stroke="#94a3b8"/>
        <rect x="388" y="148" width="53" height="28" rx="4" fill="#0284c7"/>
        <rect x="441" y="148" width="53" height="28" fill="#0369a1"/>
        <rect x="494" y="148" width="30" height="28" fill="#10b981"/>
        <rect x="524" y="148" width="8" height="28" fill="#f59e0b"/>
        <text x="458" y="166" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">合計 18.3 MB/s (48%)</text>
        <text x="612" y="166" text-anchor="middle" font-size="9.5" font-weight="700" fill="#475569">余裕 52%!</text>
        <text x="388" y="200" font-size="10.5" fill="#0369a1">■ 前面 OV7720/7725 (320×240@120fps): 7.0 MB/s</text>
        <text x="388" y="220" font-size="10.5" fill="#075985">■ 背面 OV7720/7725 (320×240@120fps): 7.0 MB/s</text>
        <text x="388" y="240" font-size="10.5" fill="#047857">■ 上部 360° 魚眼 GC0308 (640×480@30fps): 4.0 MB/s</text>
        <text x="388" y="260" font-size="10.5" fill="#b45309">■ 脊髄 ESP32-S3 UART 2Mbps 制御: 0.3 MB/s</text>
        <rect x="388" y="280" width="286" height="106" rx="7" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="402" y="302" font-size="11.5" font-weight="800" fill="#0f172a">sp ray 0.001mm 視界コーン監査結果</text>
        <text x="402" y="324" font-size="10.5" font-weight="700" fill="#059669">・前面 75° コーン (107本): 遮蔽 0% PASS</text>
        <text x="402" y="344" font-size="10.5" font-weight="700" fill="#059669">・背面 75° コーン (107本): 遮蔽 0% PASS</text>
        <text x="402" y="364" font-size="10.5" font-weight="700" fill="#059669">・頂上 360° コーン (107本): 遮蔽 0% PASS</text>
        `,
        '1/120秒 (8.33 ms) 推論 ＋ 物理ピッチ/GPUロール安定化 ＋ 0円バネ自動遮断 ＝ 視覚系総額 1,640円'
      );

    case 'orig_e1_brain_g52j_spine':
      return wrapOriginalPoster(
        'CPU · 0円頭脳',
        'Motorola moto g52j 5G (0円) ＋ ESP32-S3 脊髄 ＋ 90円角度FB',
        'Snapdragon 695 120Hz NNAPI + Built-In 400Hz IMU + CD74HC4067 12-Ch Pot MUX',
        '#059669',
        `
        <rect x="28" y="84" width="664" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <!-- Top Brain Layer -->
        <rect x="44" y="102" width="632" height="108" rx="8" fill="#0f172a"/>
        <text x="62" y="126" font-size="13" font-weight="800" fill="#38bdf8">頭脳層：Motorola moto g52j 5G（所有スマホ 0円・中段装甲完全内蔵）</text>
        <rect x="62" y="138" width="142" height="56" rx="5" fill="#1e293b" stroke="#38bdf8"/>
        <text x="133" y="160" text-anchor="middle" font-size="10.5" font-weight="800" fill="#f8fafc">120Hz AI視覚</text>
        <text x="133" y="178" text-anchor="middle" font-size="9.5" fill="#7dd3fc">NNAPI INT8 (4.5ms)</text>
        <rect x="216" y="138" width="142" height="56" rx="5" fill="#1e293b" stroke="#4ade80"/>
        <text x="287" y="160" text-anchor="middle" font-size="10.5" font-weight="800" fill="#f8fafc">内蔵400Hz IMU</text>
        <text x="287" y="178" text-anchor="middle" font-size="9.5" fill="#86efac">NDK直読 (外付0円)</text>
        <rect x="370" y="138" width="142" height="56" rx="5" fill="#1e293b" stroke="#fbbf24"/>
        <text x="441" y="160" text-anchor="middle" font-size="10.5" font-weight="800" fill="#f8fafc">L4 MJX 方策</text>
        <text x="441" y="178" text-anchor="middle" font-size="9.5" fill="#fde68a">TFLite (&lt;1.2ms)</text>
        <rect x="524" y="138" width="136" height="56" rx="5" fill="#1e293b" stroke="#f472b6"/>
        <text x="592" y="160" text-anchor="middle" font-size="10.5" font-weight="800" fill="#f8fafc">別スマホFPV操縦</text>
        <text x="592" y="178" text-anchor="middle" font-size="9.5" fill="#fbcfe8">5GHz Wi-Fi (0円)</text>

        <!-- Link Arrow -->
        <line x1="360" y1="210" x2="360" y2="240" stroke="#0f172a" stroke-width="3"/>
        <rect x="236" y="216" width="248" height="20" rx="4" fill="#f1f5f9" stroke="#64748b"/>
        <text x="360" y="230" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">USB-C PD-OTG 4ポートハブ (420円) · 2Mbps</text>

        <!-- Bottom Spine Layer -->
        <rect x="44" y="244" width="632" height="142" rx="8" fill="#f0fdf4" stroke="#059669" stroke-width="2"/>
        <text x="62" y="268" font-size="13" font-weight="800" fill="#065f46">脊髄層：ESP32-S3 SuperMini (380円・ハードリアルタイム 1kHz)</text>
        <rect x="62" y="282" width="186" height="88" rx="6" fill="#ffffff" stroke="#2563eb" stroke-width="1.8"/>
        <text x="155" y="304" text-anchor="middle" font-size="11" font-weight="800" fill="#1e40af">PCA9685 16ch PWM</text>
        <text x="155" y="324" text-anchor="middle" font-size="10" fill="#334155">12脚 + 4照準 = 16/16ch</text>
        <text x="155" y="342" text-anchor="middle" font-size="10" fill="#2563eb">12-bit 0.17°分解能</text>
        <text x="155" y="358" text-anchor="middle" font-size="10" font-weight="800" fill="#059669">実売 180 円</text>

        <rect x="264" y="282" width="196" height="88" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>
        <text x="362" y="304" text-anchor="middle" font-size="11" font-weight="800" fill="#991b1b">CD74HC4067 16ch MUX</text>
        <text x="362" y="324" text-anchor="middle" font-size="10" fill="#7f1d1d">MG996R×12 内部ポテンショ</text>
        <text x="362" y="342" text-anchor="middle" font-size="10" fill="#dc2626">1線引出し → 200Hz実角度FB</text>
        <text x="362" y="358" text-anchor="middle" font-size="10" font-weight="800" fill="#dc2626">実売 90 円（神ハック！）</text>

        <rect x="476" y="282" width="184" height="88" rx="6" fill="#fff7ed" stroke="#ea580c" stroke-width="1.8"/>
        <text x="568" y="304" text-anchor="middle" font-size="11" font-weight="800" fill="#9a3412">ハードウェア安全WDT</text>
        <text x="568" y="324" text-anchor="middle" font-size="10" fill="#7c2d12">通信断200ms / 人物検知</text>
        <text x="568" y="342" text-anchor="middle" font-size="10" fill="#ea580c">遮光フード＋MOSFET遮断</text>
        <text x="568" y="358" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">Android非依存保護</text>
        `,
        '標準＝Rootなし(開発者オプション+ADB+NNAPI)で100%実動作 | 上級＝Magisk Root充電バイパス対応'
      );

    case 'orig_e1_legs_xyz_mg996r':
      return wrapOriginalPoster(
        'LEG · XYZ自在',
        'X字4隅45°対称 12軸 MG996R 角度FB改造 ＆ XYZ全方向カニ歩行力学',
        '12x MG996R (2,940 JPY) + 90 JPY Pot-FB | Safety Factor 1.67x @ 2.48 kg',
        '#2563eb',
        `
        <rect x="28" y="84" width="324" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="42" y="106" font-size="12.5" font-weight="800" fill="#1e3a8a">X字4隅 45°対称配置 → 360°等方性カニ歩行</text>
        <!-- Center chassis rectangle -->
        <rect x="134" y="186" width="112" height="72" rx="6" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <text x="190" y="220" text-anchor="middle" font-size="11" font-weight="800" fill="#f8fafc">RIIMOS E1</text>
        <text x="190" y="236" text-anchor="middle" font-size="9.5" fill="#93c5fd">2.48 kg</text>
        <!-- 4 X-radial legs -->
        <line x1="134" y1="186" x2="72" y2="124" stroke="#f97316" stroke-width="6" stroke-linecap="round"/>
        <line x1="246" y1="186" x2="308" y2="124" stroke="#f97316" stroke-width="6" stroke-linecap="round"/>
        <line x1="134" y1="258" x2="72" y2="320" stroke="#f97316" stroke-width="6" stroke-linecap="round"/>
        <line x1="246" y1="258" x2="308" y2="320" stroke="#f97316" stroke-width="6" stroke-linecap="round"/>
        <circle cx="72" cy="124" r="9" fill="#0f172a"/><circle cx="308" cy="124" r="9" fill="#0f172a"/>
        <circle cx="72" cy="320" r="9" fill="#0f172a"/><circle cx="308" cy="320" r="9" fill="#0f172a"/>
        <!-- Omni arrows -->
        <path d="M 190 122 L 190 164 M 190 280 L 190 322 M 72 222 L 116 222 M 264 222 L 308 222" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="4 3"/>
        <text x="190" y="346" text-anchor="middle" font-size="11" font-weight="800" fill="#1d4ed8">X(左右カニ) · Y(前後) · Z(車高24-132mm) · 斜め自由</text>
        <text x="42" y="370" font-size="10.5" font-weight="700" fill="#059669">・sp 転倒角監査: 前49.1° / 後48.8° / 左55.5° / 右54.3°</text>
        <text x="42" y="388" font-size="10.5" fill="#475569">・全方向へ死角なし＆転倒時の全姿勢自己復帰対応</text>

        <rect x="364" y="84" width="328" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="378" y="106" font-size="12.5" font-weight="800" fill="#0f172a">1脚 3-DOF リンク幾何 ＆ トルク安全率証明</text>
        <!-- Side leg schematic -->
        <circle cx="420" cy="176" r="14" fill="#1e293b"/><text x="420" y="180" text-anchor="middle" font-size="8.5" font-weight="800" fill="#fff">Yaw</text>
        <line x1="434" y1="176" x2="472" y2="176" stroke="#64748b" stroke-width="6"/>
        <circle cx="482" cy="176" r="14" fill="#dc2626"/><text x="482" y="180" text-anchor="middle" font-size="8.5" font-weight="800" fill="#fff">Hip</text>
        <line x1="494" y1="180" x2="574" y2="196" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
        <text x="536" y="176" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">大腿 68 mm</text>
        <circle cx="582" cy="198" r="14" fill="#2563eb"/><text x="582" y="202" text-anchor="middle" font-size="8.5" font-weight="800" fill="#fff">Knee</text>
        <line x1="588" y1="210" x2="616" y2="286" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <text x="634" y="252" font-size="10" font-weight="800" fill="#0f172a">下腿 88mm</text>
        <circle cx="619" cy="296" r="12" fill="#f97316"/>
        <line x1="384" y1="308" x2="674" y2="308" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 3"/>
        <rect x="380" y="322" width="296" height="68" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="392" y="342" font-size="10.5" font-weight="800" fill="#1e40af">最悪2脚支持時トルク計算 (総質量 2.48 kg = 24.3 N)</text>
        <text x="392" y="360" font-size="10.5" fill="#1e3a8a">・所要: 12.15 N × 5.8 cm = 7.19 kg·cm</text>
        <text x="392" y="378" font-size="10.5" font-weight="800" fill="#059669">・MG996R @ 6V: 11–13 kg·cm → 安全率 1.53–1.81× PASS!</text>
        `,
        '245円×12軸 + 90円角度FB MUX = 3,210円 | L4バックラッシュ補償により高級バスサーボ級の体幹安定化'
      );

    case 'orig_e1_safety_interlock':
      return wrapOriginalPoster(
        'SAFE · 4重保護',
        '安全・法令適合アーキテクチャ（0.135J制限 ＆ 人物検知強制ロック）',
        'Non-Human Competition Targets Only | 4-Way Hardware Cutoff < 1ms',
        '#dc2626',
        `
        <rect x="28" y="84" width="664" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="44" y="108" font-size="13" font-weight="800" fill="#991b1b">現実世界で100%安全・合法に実動作するための絶対ハードウェア安全網</text>
        <!-- 4 Triggers -->
        <rect x="44" y="126" width="148" height="72" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
        <text x="118" y="150" text-anchor="middle" font-size="11" font-weight="800" fill="#991b1b">① 人物検知ロック</text>
        <text x="118" y="168" text-anchor="middle" font-size="9.5" fill="#7f1d1d">人体・顔シルエット検知で</text>
        <text x="118" y="184" text-anchor="middle" font-size="9.5" font-weight="800" fill="#dc2626">即時発射禁止</text>

        <rect x="206" y="126" width="148" height="72" rx="6" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>
        <text x="280" y="150" text-anchor="middle" font-size="11" font-weight="800" fill="#9a3412">② 天面物理 E-Stop</text>
        <text x="280" y="168" text-anchor="middle" font-size="9.5" fill="#7c2d12">赤マッシュルーム B接点</text>
        <text x="280" y="184" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ea580c">断線時も安全側停止</text>

        <rect x="368" y="126" width="148" height="72" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
        <text x="442" y="150" text-anchor="middle" font-size="11" font-weight="800" fill="#1e40af">③ Wi-Fi 200ms監視</text>
        <text x="442" y="168" text-anchor="middle" font-size="9.5" fill="#1e3a8a">別スマホ通信途絶で</text>
        <text x="442" y="184" text-anchor="middle" font-size="9.5" font-weight="800" fill="#2563eb">自動緊急停止</text>

        <rect x="530" y="126" width="146" height="72" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
        <text x="603" y="150" text-anchor="middle" font-size="11" font-weight="800" fill="#166534">④ 0.135J 電圧封印</text>
        <text x="603" y="168" text-anchor="middle" font-size="9.5" fill="#14532d">5.2V定電圧上限固定</text>
        <text x="603" y="184" text-anchor="middle" font-size="9.5" font-weight="800" fill="#16a34a">物理的に超過不能</text>

        <!-- AND Gate -> Hardware Action -->
        <path d="M 118 198 L 360 232 M 280 198 L 360 232 M 442 198 L 360 232 M 603 198 L 360 232" stroke="#334155" stroke-width="2"/>
        <rect x="130" y="232" width="460" height="58" rx="8" fill="#0f172a"/>
        <text x="360" y="256" text-anchor="middle" font-size="12.5" font-weight="800" fill="#fde047">ハードウェア直列遮断 MOSFET (&lt;1ms) ＋ 物理遮光フード自動閉鎖 (&lt;65ms)</text>
        <text x="360" y="276" text-anchor="middle" font-size="10.5" fill="#cbd5e1">※ 発射許可 ＝ 非人間 AprilTag/競技的ロック AND 人物不在 AND 安全回路正常</text>

        <rect x="44" y="306" width="632" height="82" rx="7" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="60" y="328" font-size="11.5" font-weight="800" fill="#0f172a">全3運用モードの安全境界</text>
        <text x="60" y="348" font-size="10.5" fill="#334155">1. 競技ターゲット自律モード：AprilTag / 電子ヒットプレート専用追跡（対人射撃は物理＋ソフト二重禁止）</text>
        <text x="60" y="366" font-size="10.5" fill="#334155">2. 別スマホ手動ラジコンモード：操縦者FPV目視＋デッドマン保持中のみ発射許可</text>
        <text x="60" y="382" font-size="10.5" fill="#334155">3. 競技精密スナイパーモード：単眼測距＋ホップ弾道落下補正による静的／動的競技的への精密射撃</text>
        `,
        '日本の銃刀法・10歳以上用安全基準 (0.135J未満) 完全準拠 | ハードウェア依存のフェイルセーフ設計'
      );

    case 'orig_e1_power_3h_budget':
      return wrapOriginalPoster(
        '3.86h · 9,700円',
        '充電式 21700×5本 3.86時間連続稼働収支 ＆ 9,700円実売BOM内訳',
        '81.4 Wh Effective / 21.1 W Avg = 3.86 h (>3.0h) | 9,700 JPY Total BOM',
        '#059669',
        `
        <!-- Left: 3.86h Power Budget -->
        <rect x="28" y="84" width="326" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="42" y="106" font-size="12.5" font-weight="800" fill="#065f46">3時間超連続稼働のエネルギー物理証明</text>
        <text x="42" y="132" font-size="10.5" font-weight="700" fill="#334155">省電力ロック待機 (40%): 10.0 W</text>
        <rect x="42" y="140" width="90" height="20" rx="4" fill="#10b981"/>
        <text x="42" y="180" font-size="10.5" font-weight="700" fill="#334155">XYZカニ巡航歩行 (45%): 24.0 W</text>
        <rect x="42" y="188" width="192" height="20" rx="4" fill="#0284c7"/>
        <text x="42" y="228" font-size="10.5" font-weight="700" fill="#334155">高速疾走＋断続射撃 (15%): 42.0 W</text>
        <rect x="42" y="236" width="286" height="20" rx="4" fill="#f97316"/>
        <rect x="42" y="274" width="296" height="114" rx="7" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
        <text x="56" y="298" font-size="12" font-weight="800" fill="#065f46">平均消費電力 ＝ 21.1 W</text>
        <text x="56" y="320" font-size="10.5" fill="#047857">実効容量：92.5 Wh × 0.88 = 81.4 Wh</text>
        <text x="56" y="344" font-size="15" font-weight="900" fill="#059669">連続稼働 ＝ 3.86 時間！</text>
        <text x="56" y="368" font-size="10" fill="#065f46">（公称3時間目標に対して +28.6% 余裕）</text>

        <!-- Right: 9,700 JPY BOM Breakdown -->
        <rect x="366" y="84" width="326" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="380" y="106" font-size="12.5" font-weight="800" fill="#0f172a">上限1万円厳守：9,700円 実売BOM内訳</text>
        <text x="382" y="134" font-size="10.5" fill="#0f172a">1. moto g52j 5G (頭脳/IMU/Wi-Fi)</text><text x="676" y="134" text-anchor="end" font-size="11" font-weight="800" fill="#059669">0 円</text>
        <text x="382" y="160" font-size="10.5" fill="#0f172a">2. 12軸脚 (MG996R×12+PCA+MUX)</text><text x="676" y="160" text-anchor="end" font-size="11" font-weight="800" fill="#1e293b">3,210 円</text>
        <text x="382" y="186" font-size="10.5" fill="#0f172a">3. 8丁機関銃＋照準＋残弾0給弾</text><text x="676" y="186" text-anchor="end" font-size="11" font-weight="800" fill="#1e293b">1,760 円</text>
        <text x="382" y="212" font-size="10.5" fill="#0f172a">4. 120Hzカメラ×2＋360°＋遮断</text><text x="676" y="212" text-anchor="end" font-size="11" font-weight="800" fill="#1e293b">1,640 円</text>
        <text x="382" y="238" font-size="10.5" fill="#0f172a">5. 電源保護・充電回路 (電池代除)</text><text x="676" y="238" text-anchor="end" font-size="11" font-weight="800" fill="#1e293b">1,170 円</text>
        <text x="382" y="264" font-size="10.5" fill="#0f172a">6. 3D骨格・100均透視窓/赤シート</text><text x="676" y="264" text-anchor="end" font-size="11" font-weight="800" fill="#1e293b">1,120 円</text>
        <text x="382" y="290" font-size="10.5" fill="#0f172a">7. ESP32-S3 + PD-OTGハブ</text><text x="676" y="290" text-anchor="end" font-size="11" font-weight="800" fill="#1e293b">800 円</text>
        <line x1="380" y1="306" x2="678" y2="306" stroke="#0f172a" stroke-width="2"/>
        <rect x="380" y="318" width="298" height="70" rx="7" fill="#0f172a"/>
        <text x="396" y="344" font-size="14" font-weight="900" fill="#fde047">実売合計：9,700 円</text>
        <text x="396" y="366" font-size="10.5" fill="#94a3b8">予算上限 10,000円 に対し 予備費 300円確保！</text>
        <text x="396" y="381" font-size="9.5" fill="#64748b">※充電式21700×5本・最安0.12g BB弾・所有スマホ除く</text>
        `,
        '総重量 2.48 kg (フル装填) × 原価 9,700 円 × 稼働 3.86 時間 — Original 三原則の完全立証'
      );

    case 'orig_e1_colab_l4_rl':
      return wrapOriginalPoster(
        'L4 · 300億回RL',
        'Google Colab Pro (NVIDIA L4 24GB) MuJoCo MJX 大規模強化学習',
        '4,096-8,192 Parallel Envs | 150k-450k steps/s | MG996R Backlash Compensation',
        '#7c3aed',
        `
        <rect x="28" y="84" width="664" height="318" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="44" y="108" font-size="13" font-weight="800" fill="#4c1d95">A100不要！即取得できる Colab Pro L4 1枚で数百億回特訓して9,700円機を最強化</text>
        <!-- Pipeline Flow -->
        <rect x="44" y="126" width="144" height="78" rx="7" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2"/>
        <text x="116" y="148" text-anchor="middle" font-size="11" font-weight="800" fill="#5b21b6">① MJCF 物理双子</text>
        <text x="116" y="166" text-anchor="middle" font-size="9.5" fill="#4c1d95">2.48kg / 12軸MG996R</text>
        <text x="116" y="182" text-anchor="middle" font-size="9.5" fill="#6d28d9">バックラッシュ±1.8°</text>
        <text x="116" y="196" text-anchor="middle" font-size="9" fill="#7c3aed">PWM遅延 15-30ms</text>

        <polygon points="194,165 206,158 206,172" fill="#7c3aed" transform="rotate(180 200 165)"/>

        <rect x="210" y="126" width="224" height="78" rx="7" fill="#0f172a"/>
        <text x="322" y="148" text-anchor="middle" font-size="11.5" font-weight="800" fill="#c4b5fd">② NVIDIA L4 (24GB VRAM)</text>
        <text x="322" y="166" text-anchor="middle" font-size="10" fill="#f8fafc">MuJoCo MJX + Brax PPO</text>
        <text x="322" y="182" text-anchor="middle" font-size="10" font-weight="800" fill="#38bdf8">4,096〜8,192 並列環境</text>
        <text x="322" y="197" text-anchor="middle" font-size="9.5" fill="#4ade80">約 30万 step/s ＝ 10.8億回/時間</text>

        <polygon points="440,165 452,158 452,172" fill="#059669" transform="rotate(180 446 165)"/>

        <rect x="456" y="126" width="220" height="78" rx="7" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
        <text x="566" y="148" text-anchor="middle" font-size="11" font-weight="800" fill="#065f46">③ moto g52j 即実機搭載</text>
        <text x="566" y="166" text-anchor="middle" font-size="9.5" fill="#047857">軽量 MLP/GRU (&lt; 600 KB)</text>
        <text x="566" y="182" text-anchor="middle" font-size="10" font-weight="800" fill="#059669">推論時間 &lt; 1.2 ms (120Hz超)</text>
        <text x="566" y="196" text-anchor="middle" font-size="9" fill="#065f46">Google Drive 自動再開対応</text>

        <!-- 8-Stage Curriculum Grid -->
        <text x="44" y="230" font-size="11.5" font-weight="800" fill="#0f172a">8段階カリキュラム（合計 150億〜300億ステップ）</text>
        <rect x="44" y="240" width="152" height="66" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="52" y="258" font-size="10" font-weight="800" fill="#1e293b">S1 (1B) 立位・省電力</text>
        <text x="52" y="274" font-size="9" fill="#475569">保持電力最小ロック姿勢</text>
        <text x="52" y="290" font-size="9" fill="#475569">外乱押返しバランス</text>

        <rect x="204" y="240" width="152" height="66" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="212" y="258" font-size="10" font-weight="800" fill="#1e293b">S2 (3B) XYZカニ高速</text>
        <text x="212" y="274" font-size="9" fill="#475569">X/Y/斜め360°/Z車高自在</text>
        <text x="212" y="290" font-size="9" fill="#475569">その場高速旋回</text>

        <rect x="364" y="240" width="152" height="66" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="372" y="258" font-size="10" font-weight="800" fill="#1e293b">S3 (3B) 段差・不整地</text>
        <text x="372" y="274" font-size="9" fill="#475569">段差2-10cm 踏破</text>
        <text x="372" y="290" font-size="9" fill="#475569">床摩擦 0.3-1.1 DR</text>

        <rect x="524" y="240" width="152" height="66" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="532" y="258" font-size="10" font-weight="800" fill="#1e293b">S4 (2B) 転倒自己復帰</text>
        <text x="532" y="274" font-size="9" fill="#475569">仰向け・横転・つまずき</text>
        <text x="532" y="290" font-size="9" fill="#475569">1.5秒以内完全正立復帰</text>

        <rect x="44" y="316" width="152" height="66" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="52" y="334" font-size="10" font-weight="800" fill="#1e293b">S5 (3B) 体幹安定化</text>
        <text x="52" y="350" font-size="9" fill="#475569">走行中胴体水平維持</text>
        <text x="52" y="366" font-size="9" fill="#475569">カメラピッチ＆GPU協調</text>

        <rect x="204" y="316" width="152" height="66" rx="5" fill="#fef2f2" stroke="#f87171"/>
        <text x="212" y="334" font-size="10" font-weight="800" fill="#991b1b">S6 (2B) 視界喪失回復</text>
        <text x="212" y="350" font-size="9" fill="#7f1d1d">遮断→急復帰・位置喪失</text>
        <text x="212" y="366" font-size="9" fill="#7f1d1d">安全停止＆再定位手順</text>

        <rect x="364" y="316" width="152" height="66" rx="5" fill="#eff6ff" stroke="#60a5fa"/>
        <text x="372" y="334" font-size="10" font-weight="800" fill="#1e40af">S7 (3B) 競技的エイム</text>
        <text x="372" y="350" font-size="9" fill="#1e3a8a">AprilTag追跡・弾道補正</text>
        <text x="372" y="366" font-size="9" fill="#dc2626">人物検知時ロック厳守</text>

        <rect x="524" y="316" width="152" height="66" rx="5" fill="#ecfdf5" stroke="#34d399"/>
        <text x="532" y="334" font-size="10" font-weight="800" fill="#065f46">S8 (3B+) 全統合ロバスト</text>
        <text x="532" y="350" font-size="9" fill="#047857">残弾300→0発重心移動</text>
        <text x="532" y="366" font-size="9" fill="#047857">電圧低下＆実機Sim2Real</text>
        `,
        'blueprints/riimos_e1/train_riimos_e1_colab_l4.py ＋ riimos_e1_mjcf.xml をリポジトリへ完全同梱！'
      );

    default:
      return null;
  }
}
