import { CadPart, PartExplanation } from '../assemblies/types';

export interface ExplanationDrawerHandlers {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleIsolate: () => void;
  onHideCurrent: () => void;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

function makeSvg(inner: string, viewBox = '0 0 24 24'): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.innerHTML = inner;
  return svg;
}

function makeIconBtn(inner: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'icon-btn';
  btn.appendChild(makeSvg(inner));
  return btn;
}

const DRAWER_ICONS = {
  prev: '<polyline points="15 18 9 12 15 6"/>',
  next: '<polyline points="9 18 15 12 9 6"/>',
  isolate: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',
  hide: '<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
};

/**
 * Generate bespoke technical physics/optics schematic SVG inside the explanation card.
 */
function renderSchematicSvg(type: PartExplanation['diagramType']): string {
  const wrap = (body: string) =>
    `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${body}</svg>`;

  switch (type) {
    case 'baffle':
      return wrap(`
        <rect x="24" y="18" width="272" height="82" rx="4" fill="#ffffff" stroke="#d8dde6"/>
        <polygon points="90,26 115,26 106,44 90,44" fill="#232730"/>
        <polygon points="90,92 115,92 106,74 90,74" fill="#232730"/>
        <line x1="36" y1="59" x2="275" y2="59" stroke="#2563eb" stroke-width="1.8"/>
        <line x1="36" y1="30" x2="103" y2="38" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 2"/>
        <line x1="103" y1="38" x2="96" y2="31" stroke="#dc2626" stroke-width="1" opacity="0.5"/>
        <rect x="248" y="34" width="10" height="50" fill="#1d6d7c"/>
        <text x="124" y="34" font-size="9" fill="#525a69">ナイフエッジ遮光壁（迷光吸収）</text>
        <text x="148" y="54" font-size="9" fill="#2563eb">有効結像光束</text>
        <text x="225" y="94" font-size="8.5" fill="#1d6d7c">36×24 mm 像面</text>
      `);

    case 'sswf':
      return wrap(`
        <rect x="20" y="76" width="54" height="16" rx="2" fill="#e2dac8" stroke="#7c7566"/>
        <text x="35" y="87" font-size="8.5" fill="#222">PZT</text>
        <path d="M74 68 Q114 48 154 68 T234 68 T300 68" fill="none" stroke="#0284c7" stroke-width="2.2"/>
        <path d="M74 68 Q114 88 154 68 T234 68 T300 68" fill="none" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.55"/>
        <circle cx="154" cy="44" r="3" fill="#475569"/>
        <path d="M154 41 L162 24" stroke="#dc2626" stroke-width="1.4"/>
        <polygon points="162,24 157,28 164,30" fill="#dc2626"/>
        <circle cx="215" cy="36" r="2.3" fill="#475569"/>
        <path d="M215 33 L222 18" stroke="#dc2626" stroke-width="1.3"/>
        <text x="112" y="21" font-size="9" fill="#1e293b">30–70 kHz 超音波定在波 (a &gt; 10⁴ G)</text>
        <text x="180" y="103" font-size="8.5" fill="#0284c7">屈曲共振モード振動ガラス</text>
      `);

    case 'olpf16':
      return wrap(`
        <!-- 16-point Gaussian PSF cluster -->
        <rect x="16" y="14" width="90" height="90" rx="6" fill="#ffffff" stroke="#dbe2eb"/>
        ${[-22, -8, 8, 22]
          .flatMap((dx, ix) =>
            [-22, -8, 8, 22].map((dy, iy) => {
              const dist = Math.hypot(ix - 1.5, iy - 1.5);
              const r = Math.max(2.1, 4.3 - dist * 0.9);
              const op = Math.max(0.32, 0.95 - dist * 0.25).toFixed(2);
              return `<circle cx="${61 + dx}" cy="${59 + dy}" r="${r.toFixed(1)}" fill="#0d5bd9" opacity="${op}"/>`;
            })
          )
          .join('')}
        <text x="27" y="114" font-size="8.5" fill="#475569">16点ガウス分離 PSF</text>
        <!-- MTF Comparison curve -->
        <line x1="132" y1="96" x2="304" y2="96" stroke="#94a3b8" stroke-width="1"/>
        <line x1="132" y1="18" x2="132" y2="96" stroke="#94a3b8" stroke-width="1"/>
        <line x1="205" y1="18" x2="205" y2="96" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
        <path d="M132 24 C165 26, 190 50, 215 80 C235 94, 265 95, 300 95" fill="none" stroke="#0d5bd9" stroke-width="2.2"/>
        <path d="M132 24 C162 28, 185 68, 205 95 C225 65, 248 56, 268 88 C282 78, 294 74, 300 84" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="3 2"/>
        <text x="196" y="108" font-size="8.5" fill="#475569">f_N (Nyquist)</text>
        <text x="218" y="30" font-size="8.5" fill="#0d5bd9">16点 LPF (サイドローブ抑制)</text>
        <text x="218" y="42" font-size="8" fill="#64748b">破線: 従来4点 LPF</text>
      `);

    case 'ircut':
      return wrap(`
        <line x1="28" y1="94" x2="302" y2="94" stroke="#94a3b8" stroke-width="1"/>
        <line x1="28" y1="14" x2="28" y2="94" stroke="#94a3b8" stroke-width="1"/>
        <!-- Visible spectrum band -->
        <rect x="64" y="16" width="110" height="78" fill="url(#visGrad)" opacity="0.22"/>
        <defs>
          <linearGradient id="visGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#6366f1"/>
            <stop offset="30%" stop-color="#06b6d4"/>
            <stop offset="55%" stop-color="#22c55e"/>
            <stop offset="80%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#ef4444"/>
          </linearGradient>
        </defs>
        <!-- Silicon native sensitivity curve (extends to 1107nm) -->
        <path d="M40 92 Q125 18 195 36 Q250 56 294 92" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        <!-- Hybrid IR/UV cut filter transmittance -->
        <path d="M36 93 L58 92 L68 22 L166 22 L180 92 L296 93" fill="none" stroke="#0284c7" stroke-width="2.3"/>
        <text x="58" y="106" font-size="8" fill="#475569">400nm</text>
        <text x="160" y="106" font-size="8" fill="#475569">650nm</text>
        <text x="266" y="106" font-size="8" fill="#475569">1107nm</text>
        <text x="192" y="34" font-size="8.5" fill="#64748b">Si 原感度 (1.12 eV)</text>
        <text x="80" y="34" font-size="8.5" fill="#0284c7">ハイブリッド透過帯</text>
        <text x="196" y="84" font-size="8.5" fill="#be185d">NIR 遮断 (OD&gt;4)</text>
      `);

    case 'coverglass':
      return wrap(`
        <rect x="44" y="28" width="232" height="14" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <rect x="44" y="42" width="24" height="28" fill="#94a3b8"/>
        <rect x="252" y="42" width="24" height="28" fill="#94a3b8"/>
        <rect x="44" y="70" width="232" height="20" fill="#334155"/>
        <rect x="92" y="58" width="136" height="12" fill="#1d6d7c"/>
        <text x="116" y="22" font-size="8.5" fill="#0369a1">低α線ARカバーガラス (&gt;99.2%)</text>
        <text x="122" y="53" font-size="8.5" fill="#475569">乾燥窒素 N₂ 気密室</text>
        <text x="10" y="60" font-size="8" fill="#475569">Kovar</text>
        <text x="116" y="84" font-size="8.5" fill="#f8fafc">Al₂O₃ セラミック筐体</text>
      `);

    case 'stacked_die':
      return wrap(`
        <rect x="50" y="14" width="220" height="22" rx="3" fill="#1d6d7c"/>
        <text x="78" y="28" font-size="9" fill="#ffffff">1層目: BSI 2層トランジスタ画素 (PD+MEM)</text>
        <rect x="50" y="39" width="220" height="7" fill="#d97736"/>
        <text x="86" y="45" font-size="7.5" fill="#ffffff">Cu-Cu ダイレクトハイブリッド接合</text>
        <rect x="50" y="49" width="220" height="24" rx="3" fill="#2d4868"/>
        <text x="84" y="64" font-size="9" fill="#ffffff">2層目: 列並列 CDS / ADC ＆ GS制御</text>
        <rect x="50" y="77" width="220" height="24" rx="3" fill="#1e293b"/>
        <text x="84" y="92" font-size="9" fill="#e2e8f0">3層目: 超広帯域 DRAM バッファ (120fps)</text>
      `);

    case 'wirebond':
      return wrap(`
        <rect x="26" y="72" width="110" height="22" fill="#1d6d7c"/>
        <rect x="136" y="64" width="158" height="30" fill="#334155"/>
        <rect x="108" y="69" width="16" height="4" fill="#eab308"/>
        <rect x="182" y="61" width="22" height="4" fill="#eab308"/>
        <path d="M116 69 C118 32, 160 32, 193 61" fill="none" stroke="#eab308" stroke-width="2.4"/>
        <line x1="154" y1="40" x2="154" y2="69" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>
        <text x="160" y="34" font-size="8.5" fill="#92400e">低ループ 4N Au (55–80 μm)</text>
        <text x="48" y="86" font-size="8.5" fill="#fff">Si ダイ電極</text>
        <text x="174" y="84" font-size="8.5" fill="#e2e8f0">HTCC セラミック段棚</text>
      `);

    case 'ceramic_pkg':
      return wrap(`
        <rect x="34" y="24" width="252" height="62" rx="3" fill="#334155"/>
        <rect x="64" y="24" width="192" height="34" fill="#ffffff"/>
        <rect x="84" y="38" width="152" height="18" fill="#1d6d7c"/>
        <rect x="84" y="58" width="152" height="28" fill="#a16244"/>
        ${[48, 70, 250, 272].map((x) => `<rect x="${x - 6}" y="86" width="12" height="6" fill="#eab308"/>`).join('')}
        <text x="115" y="50" font-size="8.5" fill="#fff">36×24 mm 撮像ダイ</text>
        <text x="102" y="75" font-size="8.5" fill="#fff">CuW 高熱伝導スラグ</text>
        <text x="86" y="106" font-size="8.5" fill="#475569">12層 HTCC 高平坦焼成 (&lt;5 μm) + 金LGA電極</text>
      `);

    case 'sensor_pcb':
      return wrap(`
        <rect x="24" y="24" width="272" height="72" rx="4" fill="#14332d"/>
        <rect x="42" y="38" width="54" height="44" rx="2" fill="#22252b" stroke="#94a3b8"/>
        <text x="49" y="58" font-size="8" fill="#e2e8f0">Analog</text>
        <text x="53" y="70" font-size="8" fill="#38bdf8">LDO 2.8V</text>
        <rect x="224" y="38" width="54" height="44" rx="2" fill="#22252b" stroke="#94a3b8"/>
        <text x="232" y="58" font-size="8" fill="#e2e8f0">Digital</text>
        <text x="233" y="70" font-size="8" fill="#facc15">PMIC 1.2V</text>
        <path d="M110 46 L132 46 L138 38 L146 54 L154 38 L162 54 L170 46 L208 46" fill="none" stroke="#4ade80" stroke-width="1.8"/>
        <path d="M110 70 L208 70" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="4 2"/>
        <text x="114" y="33" font-size="8" fill="#86efac">100Ω 差動等長メアンダ配線</text>
        <text x="114" y="86" font-size="8" fill="#cbd5e1">アナログ/デジタル電源完全分離</text>
      `);

    case 'slvs_fpc':
      return wrap(`
        <!-- Eye diagram + U-loop flexure -->
        <rect x="22" y="18" width="128" height="80" rx="5" fill="#ffffff" stroke="#d8dde6"/>
        <path d="M32 34 C58 34, 68 82, 86 82 C104 82, 114 34, 140 34" fill="none" stroke="#0d5bd9" stroke-width="1.8"/>
        <path d="M32 82 C58 82, 68 34, 86 34 C104 34, 114 82, 140 82" fill="none" stroke="#0d5bd9" stroke-width="1.8"/>
        <text x="48" y="61" font-size="8.5" fill="#0d5bd9">200mV Eye</text>
        <text x="26" y="110" font-size="8.5" fill="#475569">SLVS-EC v3 (10 Gbps/lane)</text>
        <path d="M180 34 L256 34 C290 34, 290 84, 256 84 L196 84" fill="none" stroke="#c96b1c" stroke-width="6" stroke-linecap="round"/>
        <text x="176" y="24" font-size="8.5" fill="#9a3412">IBIS低剛性 U字ループ</text>
        <text x="196" y="63" font-size="8" fill="#64748b">EMI遮蔽 + 差動伝送</text>
      `);

    case 'ibis_vcm':
      return wrap(`
        <rect x="96" y="22" width="128" height="74" rx="5" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
        <rect x="114" y="34" width="92" height="50" fill="#1d6d7c" opacity="0.22" stroke="#1d6d7c"/>
        <rect x="112" y="84" width="38" height="10" rx="4" fill="#c86432"/>
        <rect x="170" y="84" width="38" height="10" rx="4" fill="#c86432"/>
        <rect x="218" y="38" width="10" height="42" rx="4" fill="#c86432"/>
        <line x1="131" y1="84" x2="131" y2="68" stroke="#0d5bd9" stroke-width="2"/>
        <line x1="189" y1="84" x2="189" y2="68" stroke="#0d5bd9" stroke-width="2"/>
        <line x1="228" y1="59" x2="254" y2="59" stroke="#d9480f" stroke-width="2"/>
        <text x="140" y="58" font-size="9" fill="#0f172a">X / Y / Roll</text>
        <text x="234" y="52" font-size="8.5" fill="#d9480f">F_x</text>
        <text x="115" y="109" font-size="8.5" fill="#0d5bd9">Y1・Y2 逆相で Roll 補正（ローレンツ力）</text>
      `);

    case 'ceramic_balls':
      return wrap(`
        <rect x="34" y="26" width="252" height="14" rx="2" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="34" y="76" width="252" height="14" rx="2" fill="#94a3b8" stroke="#475569"/>
        <circle cx="84" cy="58" r="14" fill="#1e293b"/>
        <circle cx="236" cy="58" r="14" fill="#1e293b"/>
        <circle cx="80" cy="53" r="3.5" fill="#ffffff" opacity="0.35"/>
        <circle cx="232" cy="53" r="3.5" fill="#ffffff" opacity="0.35"/>
        <path d="M160 40 L160 72" stroke="#0d5bd9" stroke-width="2" stroke-dasharray="3 2"/>
        <polygon points="160,74 155,66 165,66" fill="#0d5bd9"/>
        <text x="112" y="19" font-size="8.5" fill="#334155">可動キャリア (ΔZ チルト = 0)</text>
        <text x="122" y="56" font-size="8.5" fill="#0d5bd9">磁気予圧 F_preload</text>
        <text x="72" y="106" font-size="8.5" fill="#334155">3点 Si₃N₄ 非磁性セラミック球（キネマティック支持）</text>
      `);

    case 'magnet_yoke':
      return wrap(`
        <rect x="44" y="72" width="232" height="16" fill="#64748b"/>
        <rect x="66" y="48" width="84" height="24" fill="#dbeafe" stroke="#2563eb"/>
        <rect x="170" y="48" width="84" height="24" fill="#fee2e2" stroke="#dc2626"/>
        <text x="102" y="64" font-size="11" font-weight="bold" fill="#1d4ed8">N</text>
        <text x="206" y="64" font-size="11" font-weight="bold" fill="#b91c1c">S</text>
        <path d="M108 48 C108 16, 212 16, 212 48" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 2"/>
        <rect x="94" y="24" width="132" height="10" rx="3" fill="#c86432" opacity="0.85"/>
        <text x="120" y="16" font-size="8.5" fill="#0369a1">閉磁気回路磁束 B (~1.4 T)</text>
        <text x="98" y="102" font-size="8.5" fill="#334155">N52 ネオジム磁石 + 軟鉄バックヨーク</text>
      `);

    case 'sigma_graphite':
      return wrap(`
        <rect x="26" y="22" width="54" height="72" rx="3" fill="#14332d"/>
        <text x="34" y="61" font-size="8.5" fill="#fff">可動PCB</text>
        <rect x="80" y="34" width="14" height="48" fill="#7aa4b8"/>
        <path d="M94 58 L120 58 L164 26 L196 58 L156 90 L226 58 L244 58" fill="none" stroke="#1e293b" stroke-width="5" stroke-linejoin="round"/>
        <path d="M94 58 L120 58 L164 26 L196 58 L156 90 L226 58 L244 58" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="4 3"/>
        <rect x="244" y="22" width="48" height="72" rx="3" fill="#d07447"/>
        <text x="252" y="61" font-size="8.5" fill="#fff">銅放熱板</text>
        <text x="104" y="108" font-size="8.5" fill="#1e293b">Σ字型グラファイト (k ≈ 1600 W/m·K)</text>
      `);

    case 'microlens':
      return wrap(`
        <path d="M44 56 Q102 14 160 56 Q218 14 276 56" fill="#dff2ff" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="78" y1="8" x2="78" y2="38" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="78" y1="38" x2="96" y2="92" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="126" y1="8" x2="126" y2="38" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="126" y1="38" x2="108" y2="92" stroke="#dc2626" stroke-width="1.5"/>
        <rect x="74" y="88" width="56" height="16" fill="#3b638f"/>
        <text x="168" y="82" font-size="8.5" fill="#0369a1">ギャップレス非球面集光</text>
        <text x="168" y="96" font-size="8.5" fill="#475569">実効開口率 ≈ 100%</text>
      `);

    case 'bayer_cfa':
      return wrap(`
        <rect x="34" y="28" width="58" height="44" fill="#dc3a44" opacity="0.82"/>
        <rect x="98" y="28" width="58" height="44" fill="#2ca861" opacity="0.82"/>
        <rect x="162" y="28" width="58" height="44" fill="#2ca861" opacity="0.82"/>
        <rect x="226" y="28" width="58" height="44" fill="#2a6ee0" opacity="0.82"/>
        <rect x="92" y="24" width="6" height="54" fill="#334155"/>
        <rect x="156" y="24" width="6" height="54" fill="#334155"/>
        <rect x="220" y="24" width="6" height="54" fill="#334155"/>
        <text x="58" y="54" font-size="11" font-weight="bold" fill="#fff">R</text>
        <text x="120" y="54" font-size="11" font-weight="bold" fill="#fff">G1</text>
        <text x="184" y="54" font-size="11" font-weight="bold" fill="#fff">G2</text>
        <text x="250" y="54" font-size="11" font-weight="bold" fill="#fff">B</text>
        <text x="72" y="98" font-size="8.5" fill="#334155">タングステン光導波路隔壁で斜め混色を遮断</text>
      `);

    case 'bsi_ar':
      return wrap(`
        <polygon points="36,84 56,42 76,84 96,42 116,84 136,42 156,84 176,42 196,84 216,42 236,84 256,42 276,84" fill="#3b638f" stroke="#1e3a5f"/>
        <rect x="36" y="84" width="240" height="20" fill="#2b4c70"/>
        <line x1="116" y1="12" x2="108" y2="56" stroke="#eab308" stroke-width="1.8"/>
        <line x1="108" y1="56" x2="128" y2="96" stroke="#eab308" stroke-width="1.8"/>
        <text x="148" y="26" font-size="8.5" fill="#1e293b">モスアイ・ピラミッドナノ凹凸</text>
        <text x="148" y="38" font-size="8" fill="#0369a1">傾斜屈折率で反射率 24% → &lt;1%</text>
      `);

    case 'cross_pd':
      return wrap(`
        <!-- Left/Right Split (Vertical line AF) -->
        <rect x="34" y="22" width="46" height="58" rx="3" fill="#5c96d6" stroke="#1d4ed8"/>
        <rect x="84" y="22" width="46" height="58" rx="3" fill="#5c96d6" stroke="#1d4ed8"/>
        <text x="53" y="55" font-size="10" font-weight="bold" fill="#fff">A</text>
        <text x="103" y="55" font-size="10" font-weight="bold" fill="#fff">B</text>
        <text x="38" y="96" font-size="8.5" fill="#334155">左右分割（縦線測距）</text>
        <!-- Top/Bottom Split (Horizontal line AF) -->
        <rect x="184" y="22" width="96" height="27" rx="3" fill="#38bdf8" stroke="#0369a1"/>
        <rect x="184" y="53" width="96" height="27" rx="3" fill="#38bdf8" stroke="#0369a1"/>
        <text x="228" y="39" font-size="10" font-weight="bold" fill="#fff">C</text>
        <text x="228" y="70" font-size="10" font-weight="bold" fill="#fff">D</text>
        <text x="184" y="96" font-size="8.5" fill="#334155">上下分割（横線測距）</text>
        <text x="114" y="112" font-size="8.5" fill="#0d5bd9">Cross-Type Dual Pixel 全画素測距</text>
      `);

    case 'two_layer_gs':
      return wrap(`
        <rect x="36" y="14" width="248" height="28" rx="3" fill="#3b638f"/>
        <text x="86" y="31" font-size="9" fill="#fff">上層: 全面フォトダイオード (FWC 2×)</text>
        <rect x="104" y="42" width="16" height="16" fill="#d99b38"/>
        <text x="126" y="53" font-size="8" fill="#92400e">SVG 垂直転送ゲート</text>
        <rect x="36" y="58" width="84" height="32" rx="3" fill="#1e293b"/>
        <text x="46" y="77" font-size="8.5" fill="#38bdf8">GS遮光メモリ</text>
        <rect x="126" y="58" width="76" height="32" rx="3" fill="#c86b3c"/>
        <text x="136" y="77" font-size="8.5" fill="#fff">LOFIC 容量</text>
        <rect x="208" y="58" width="76" height="32" rx="3" fill="#475569"/>
        <text x="214" y="77" font-size="8.5" fill="#fde047">大型Amp Tr</text>
        <text x="64" y="106" font-size="8.5" fill="#334155">下層: 独立トランジスタ層（低RTN・DR &gt; 100 dB）</text>
      `);

    case 'cucu_bond':
      return wrap(`
        <rect x="36" y="16" width="248" height="26" fill="#4b5568"/>
        <text x="106" y="33" font-size="9" fill="#fff">画素ウェハー (Pixel Wafer)</text>
        <rect x="36" y="42" width="248" height="28" fill="#e2effa"/>
        ${[68, 128, 188, 248]
          .map(
            (x) =>
              `<rect x="${x - 10}" y="42" width="20" height="13" fill="#d87342"/><rect x="${x - 10}" y="57" width="20" height="13" fill="#c45c2a"/><line x1="${x - 13}" y1="56" x2="${x + 13}" y2="56" stroke="#1e293b" stroke-width="1"/>`
          )
          .join('')}
        <rect x="36" y="70" width="248" height="26" fill="#2d4868"/>
        <text x="100" y="87" font-size="9" fill="#fff">ロジックウェハー (Logic Wafer)</text>
        <text x="72" y="110" font-size="8.5" fill="#9a3412">画素直下 Cu-Cu 直接分子接合（ピッチ 1.5–4 μm）</text>
      `);

    case 'adc_dram':
      return wrap(`
        <rect x="26" y="20" width="72" height="36" rx="4" fill="#f1f5f9" stroke="#64748b"/>
        <text x="36" y="36" font-size="8.5" fill="#0f172a">CDS 差分</text>
        <text x="35" y="48" font-size="7.5" fill="#475569">kTCノイズ消去</text>
        <path d="M98 38 L120 38" stroke="#0d5bd9" stroke-width="1.8"/>
        <rect x="120" y="20" width="76" height="36" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="128" y="36" font-size="8.5" fill="#1d4ed8">列並列 ADC</text>
        <text x="131" y="48" font-size="7.5" fill="#1e40af">14/16-bit 量子化</text>
        <path d="M196 38 L218 38" stroke="#0d5bd9" stroke-width="1.8"/>
        <rect x="218" y="20" width="76" height="36" rx="4" fill="#1e293b"/>
        <text x="234" y="36" font-size="8.5" fill="#38bdf8">DRAM</text>
        <text x="228" y="48" font-size="7.5" fill="#cbd5e1">120fps 一時保持</text>
        <text x="58" y="84" font-size="8.5" fill="#334155">V_CDS = (V_sig + V_kTC) − (V_rst + V_kTC)</text>
        <text x="80" y="99" font-size="8" fill="#64748b">読み出しノイズ &lt; 1.0 e⁻ RMS（HCG時）</text>
      `);

    case 'shutter_cover':
      return wrap(`
        <rect x="20" y="14" width="280" height="90" rx="5" fill="#ffffff" stroke="#dbe2eb"/>
        <!-- Front cover wall -->
        <rect x="82" y="20" width="12" height="24" fill="#1e293b"/>
        <rect x="82" y="74" width="12" height="24" fill="#1e293b"/>
        <!-- Narrow blade chamber -->
        <rect x="104" y="22" width="4" height="74" fill="#334155"/>
        <rect x="116" y="20" width="10" height="24" fill="#475569"/>
        <rect x="116" y="74" width="10" height="24" fill="#475569"/>
        <!-- Rays -->
        <line x1="28" y1="59" x2="225" y2="59" stroke="#2563eb" stroke-width="2"/>
        <line x1="28" y1="26" x2="82" y2="34" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 2"/>
        <rect x="218" y="34" width="8" height="50" fill="#1d6d7c"/>
        <text x="135" y="32" font-size="8.5" fill="#0f172a">すき間 δ ≈ 0.2 mm（羽根室）</text>
        <text x="135" y="46" font-size="8" fill="#dc2626">斜め迷光を艶消し枠で吸収</text>
        <text x="135" y="76" font-size="8" fill="#2563eb">空気バタつき（フラッター）抑制</text>
        <text x="233" y="62" font-size="8.5" fill="#1d6d7c">センサー面</text>
      `);

    case 'shutter_shield':
      return wrap(`
        <!-- Left: Power OFF (Closed Shield) -->
        <rect x="16" y="14" width="134" height="92" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="34" y="34" width="98" height="14" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
        <rect x="34" y="48" width="98" height="14" fill="#64748b" stroke="#1e293b" stroke-width="0.8"/>
        <rect x="34" y="62" width="98" height="14" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
        <circle cx="62" cy="24" r="2.2" fill="#dc2626"/>
        <circle cx="96" cy="21" r="1.8" fill="#dc2626"/>
        <path d="M62 26 L62 32 M96 23 L96 32" stroke="#dc2626" stroke-width="1.2"/>
        <text x="30" y="94" font-size="8.5" font-weight="bold" fill="#0f172a">電源OFF：自動閉鎖（防塵）</text>
        <!-- Right: Power ON (Retracted) -->
        <rect x="170" y="14" width="134" height="92" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
        <rect x="188" y="22" width="98" height="10" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
        <rect x="188" y="36" width="98" height="40" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="3 2"/>
        <text x="212" y="59" font-size="9" fill="#0369a1">撮影ウィンドウ</text>
        <text x="184" y="94" font-size="8.5" font-weight="bold" fill="#0369a1">電源ON：上部ポケット退避</text>
      `);

    case 'shutter_curtain1':
      return wrap(`
        <!-- Expanded 4 blades -->
        <rect x="24" y="16" width="100" height="74" rx="3" fill="#f8fafc" stroke="#94a3b8"/>
        <rect x="30" y="20" width="88" height="16" fill="#1f242d" stroke="#64748b" stroke-width="0.7"/>
        <rect x="30" y="37" width="88" height="16" fill="#2b313c" stroke="#64748b" stroke-width="0.7"/>
        <rect x="30" y="54" width="88" height="16" fill="#1f242d" stroke="#64748b" stroke-width="0.7"/>
        <rect x="30" y="71" width="88" height="15" fill="#2b313c" stroke="#64748b" stroke-width="0.7"/>
        <text x="42" y="105" font-size="8.5" fill="#334155">閉鎖時（縦 24 mm）</text>
        <!-- Arrow -->
        <path d="M134 52 L172 52" stroke="#0d5bd9" stroke-width="2.4"/>
        <polygon points="176,52 167,46 167,58" fill="#0d5bd9"/>
        <text x="132" y="42" font-size="8.5" font-weight="bold" fill="#0d5bd9">約 2.2 ms</text>
        <text x="133" y="68" font-size="8" fill="#475569">時速 40 km!</text>
        <!-- Folded into bottom pocket -->
        <rect x="186" y="16" width="110" height="74" rx="3" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="206" y="48" font-size="9.5" font-weight="bold" fill="#b45309">光がセンサーへ!</text>
        <rect x="192" y="74" width="98" height="14" fill="#1f242d" stroke="#eab308" stroke-width="0.9"/>
        <text x="191" y="105" font-size="8.5" fill="#334155">4枚折り畳み収納（幅 7 mm）</text>
      `);

    case 'shutter_link1':
      return wrap(`
        <!-- Parallelogram 4-bar linkage geometry -->
        <rect x="20" y="14" width="280" height="90" rx="5" fill="#ffffff" stroke="#dbe2eb"/>
        <!-- Horizontal blade -->
        <rect x="38" y="34" width="118" height="14" rx="1" fill="#1f242d"/>
        <rect x="38" y="64" width="118" height="14" rx="1" fill="#64748b" opacity="0.45" stroke="#475569" stroke-dasharray="3 2"/>
        <!-- Upper & lower parallel arms -->
        <line x1="146" y1="38" x2="230" y2="28" stroke="#0d5bd9" stroke-width="3.2" stroke-linecap="round"/>
        <line x1="146" y1="45" x2="230" y2="35" stroke="#0284c7" stroke-width="2.4" stroke-linecap="round"/>
        <!-- Lower position ghost arms -->
        <line x1="146" y1="68" x2="230" y2="28" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="146" y1="75" x2="230" y2="35" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
        <!-- Stationary pivots -->
        <circle cx="230" cy="28" r="3.6" fill="#d4a948" stroke="#1e293b"/>
        <circle cx="230" cy="35" r="3.6" fill="#d4a948" stroke="#1e293b"/>
        <circle cx="146" cy="38" r="2.6" fill="#facc15"/>
        <circle cx="146" cy="45" r="2.6" fill="#facc15"/>
        <text x="42" y="27" font-size="8.5" fill="#0f172a">常に「水平 0°」をキープ!</text>
        <text x="192" y="62" font-size="8" fill="#0d5bd9">平行4節リンク</text>
        <text x="192" y="74" font-size="8" fill="#475569">半径 r₁&gt;r₂&gt;r₃&gt;r₄</text>
        <text x="192" y="86" font-size="8" fill="#475569">4枚同時に折り畳み</text>
      `);

    case 'shutter_midplate':
      return wrap(`
        <rect x="20" y="14" width="280" height="90" rx="5" fill="#ffffff" stroke="#dbe2eb"/>
        <!-- Left: 1st curtain chamber -->
        <rect x="44" y="24" width="70" height="68" rx="3" fill="#eff6ff" stroke="#93c5fd"/>
        <rect x="72" y="34" width="12" height="48" fill="#1f242d"/>
        <text x="53" y="102" font-size="8.5" fill="#1d4ed8">先幕の部屋</text>
        <!-- Center: Ultra-thin mid-plate -->
        <rect x="128" y="20" width="8" height="76" fill="#475569"/>
        <text x="108" y="16" font-size="8.5" font-weight="bold" fill="#0f172a">極薄中板 0.15 mm</text>
        <!-- Right: 2nd curtain chamber -->
        <rect x="150" y="24" width="70" height="68" rx="3" fill="#fefce8" stroke="#fde047"/>
        <rect x="178" y="34" width="12" height="48" fill="#56657c"/>
        <text x="160" y="102" font-size="8.5" fill="#a16207">後幕の部屋</text>
        <!-- Notes -->
        <text x="228" y="42" font-size="8" fill="#334155">時速40 kmの</text>
        <text x="228" y="54" font-size="8" fill="#334155">すれ違い衝突</text>
        <text x="228" y="66" font-size="8" fill="#dc2626">＆空気渦を遮断</text>
        <text x="228" y="82" font-size="8" fill="#0284c7">間隔 Δz≈0.5mm</text>
      `);

    case 'shutter_curtain2':
      return wrap(`
        <!-- 3-step visual of 1/8000s Slit Exposure! -->
        <!-- Step 1 -->
        <rect x="14" y="18" width="64" height="66" rx="3" fill="#fffbeb" stroke="#cbd5e1"/>
        <rect x="16" y="34" width="60" height="48" fill="#1f242d"/>
        <rect x="16" y="20" width="60" height="6" fill="#56657c"/>
        <rect x="16" y="26" width="60" height="8" fill="#fbbf24" opacity="0.75"/>
        <text x="24" y="13" font-size="8" fill="#334155">① 上端スキャン</text>
        <!-- Step 2 -->
        <rect x="92" y="18" width="64" height="66" rx="3" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.3"/>
        <rect x="94" y="20" width="60" height="26" fill="#56657c"/>
        <rect x="94" y="55" width="60" height="27" fill="#1f242d"/>
        <rect x="94" y="46" width="60" height="9" fill="#fbbf24" opacity="0.9"/>
        <text x="100" y="13" font-size="8" font-weight="bold" fill="#b45309">② 光のスリット</text>
        <!-- Step 3 -->
        <rect x="170" y="18" width="64" height="66" rx="3" fill="#fffbeb" stroke="#cbd5e1"/>
        <rect x="172" y="20" width="60" height="48" fill="#56657c"/>
        <rect x="172" y="76" width="60" height="6" fill="#1f242d"/>
        <rect x="172" y="68" width="60" height="8" fill="#fbbf24" opacity="0.75"/>
        <text x="179" y="13" font-size="8" fill="#334155">③ 下端で完了</text>
        <!-- Right callout -->
        <text x="242" y="34" font-size="8.5" font-weight="bold" fill="#b45309">1/8000秒時</text>
        <text x="242" y="48" font-size="8.5" fill="#0f172a">すき間幅</text>
        <text x="242" y="61" font-size="9.5" font-weight="bold" fill="#0d5bd9">約 1.3 mm!</text>
        <text x="242" y="76" font-size="7.5" fill="#475569">後幕が0.125ms後</text>
        <text x="242" y="86" font-size="7.5" fill="#475569">を全力追跡</text>
        <text x="16" y="102" font-size="8" fill="#475569">全開フラッシュ同調は最速1/400秒まで・メカ前後幕ならF1.2丸ボケも欠けない!</text>
      `);

    case 'shutter_link2':
      return wrap(`
        <!-- Synchronized travel curve graph: Curtain 1 & Curtain 2 parallel trajectories -->
        <line x1="34" y1="92" x2="296" y2="92" stroke="#94a3b8" stroke-width="1"/>
        <line x1="34" y1="16" x2="34" y2="92" stroke="#94a3b8" stroke-width="1"/>
        <!-- Curtain 1 curve -->
        <path d="M52 22 C82 22, 118 84, 152 86" fill="none" stroke="#1f242d" stroke-width="2.4"/>
        <!-- Curtain 2 parallel curve shifted by Δt -->
        <path d="M108 22 C138 22, 174 84, 208 86" fill="none" stroke="#0d5bd9" stroke-width="2.4"/>
        <!-- Constant Δt arrows -->
        <line x1="88" y1="42" x2="144" y2="42" stroke="#f59e0b" stroke-width="2"/>
        <line x1="114" y1="68" x2="170" y2="68" stroke="#f59e0b" stroke-width="2"/>
        <text x="150" y="45" font-size="8.5" font-weight="bold" fill="#b45309">Δt 一定（上端）</text>
        <text x="176" y="71" font-size="8.5" font-weight="bold" fill="#b45309">Δt 一定（下端）</text>
        <text x="42" y="106" font-size="8.5" fill="#334155">時間 t →（速度カーブ完全一致 ＝ 画面全域で明るさムラゼロ）</text>
        <text x="8" y="30" font-size="8" fill="#475569">上</text>
        <text x="8" y="84" font-size="8" fill="#475569">下</text>
      `);

    case 'shutter_dual_drive':
      return wrap(`
        <!-- Hybrid Spring + Electromagnetic Booster Diagram -->
        <rect x="18" y="20" width="96" height="58" rx="6" fill="#f8fafc" stroke="#64748b"/>
        <text x="32" y="41" font-size="9" font-weight="bold" fill="#0f172a">高張力バネ</text>
        <text x="27" y="56" font-size="8" fill="#475569">軽快・50万回耐久</text>
        <text x="34" y="69" font-size="8" fill="#475569">通常ベース動力</text>
        <text x="122" y="55" font-size="16" font-weight="bold" fill="#0d5bd9">+</text>
        <rect x="140" y="20" width="96" height="58" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="150" y="41" font-size="9" font-weight="bold" fill="#1d4ed8">電磁ブースター</text>
        <text x="148" y="56" font-size="8" fill="#1e40af">銅コイル＋磁石</text>
        <text x="148" y="69" font-size="8" fill="#1e40af">ローレンツ力加速</text>
        <path d="M240 49 L258 49" stroke="#d97706" stroke-width="2.4"/>
        <polygon points="262,49 254,44 254,54" fill="#d97706"/>
        <rect x="262" y="22" width="46" height="54" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="268" y="45" font-size="9" font-weight="bold" fill="#b45309">1/400</text>
        <text x="272" y="60" font-size="8" fill="#b45309">秒同調</text>
        <text x="58" y="102" font-size="8.5" fill="#334155">デュアル駆動：普段は優しく長寿命、必要時はターボ加速!</text>
      `);

    case 'shutter_magnets':
      return wrap(`
        <!-- Electronic Solenoid Pulse Timing Diagram -->
        <text x="18" y="34" font-size="8.5" font-weight="bold" fill="#1f242d">先幕電磁石</text>
        <path d="M84 22 L138 22 L138 42 L292 42" fill="none" stroke="#1f242d" stroke-width="2.2"/>
        <text x="90" y="18" font-size="7.5" fill="#0284c7">通電ON（保持）</text>
        <text x="144" y="36" font-size="7.5" fill="#dc2626">OFF → 発射!</text>

        <text x="18" y="76" font-size="8.5" font-weight="bold" fill="#0d5bd9">後幕電磁石</text>
        <path d="M84 62 L212 62 L212 82 L292 82" fill="none" stroke="#0d5bd9" stroke-width="2.2"/>
        <text x="128" y="58" font-size="7.5" fill="#0284c7">通電ON（保持）</text>
        <text x="218" y="76" font-size="7.5" fill="#dc2626">OFF → 追跡!</text>

        <!-- Δt timing bracket -->
        <line x1="138" y1="42" x2="138" y2="96" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 2"/>
        <line x1="212" y1="82" x2="212" y2="96" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 2"/>
        <line x1="140" y1="94" x2="210" y2="94" stroke="#f59e0b" stroke-width="2.2"/>
        <text x="108" y="108" font-size="8.5" font-weight="bold" fill="#b45309">Δt = シャッター速度（1/8000s = 125 μs）</text>
      `);

    case 'shutter_charge_motor':
      return wrap(`
        <rect x="18" y="24" width="68" height="48" rx="6" fill="#f1f5f9" stroke="#64748b"/>
        <text x="26" y="44" font-size="8.5" font-weight="bold" fill="#0f172a">コアレスDC</text>
        <text x="31" y="58" font-size="8" fill="#475569">超高速起動</text>
        <path d="M88 48 L108 48" stroke="#0d5bd9" stroke-width="2"/>
        <circle cx="132" cy="48" r="18" fill="#fef3c7" stroke="#d97706" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="164" cy="48" r="13" fill="#e2e8f0" stroke="#475569" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="118" y="84" font-size="8" fill="#92400e">減速ギア (30:1)</text>
        <path d="M180 48 L202 48" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="204" y="24" width="98" height="48" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="216" y="44" font-size="8.5" font-weight="bold" fill="#1d4ed8">偏心チャージカム</text>
        <text x="213" y="58" font-size="8" fill="#1e40af">約0.03秒でバネ再装填</text>
        <text x="48" y="104" font-size="8.5" fill="#334155">1枚撮るたびに自動巻き上げ → 秒間 10–15 コマ連写を実現!</text>
      `);

    case 'shutter_opt_sensor':
      return wrap(`
        <!-- IR Photo-Interrupter Closed-Loop Calibration -->
        <rect x="22" y="22" width="44" height="52" rx="4" fill="#1e293b"/>
        <text x="29" y="44" font-size="8" fill="#fda4af">940nm</text>
        <text x="30" y="56" font-size="8" fill="#fff">IR LED</text>
        <!-- IR beam -->
        <line x1="66" y1="48" x2="132" y2="48" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2"/>
        <!-- Curtain passing through beam -->
        <rect x="94" y="20" width="10" height="58" fill="#334155" stroke="#eab308"/>
        <rect x="132" y="22" width="44" height="52" rx="4" fill="#334155"/>
        <text x="138" y="45" font-size="8" fill="#e2e8f0">受光素子</text>
        <text x="142" y="58" font-size="8" fill="#38bdf8">時刻計測</text>
        <!-- Feedback arrow to CPU -->
        <path d="M176 48 L204 48" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="206" y="22" width="96" height="52" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="216" y="42" font-size="8.5" font-weight="bold" fill="#1d4ed8">自動補正 CPU</text>
        <text x="214" y="56" font-size="7.5" fill="#1e40af">寒冷・摩耗ズレを</text>
        <text x="214" y="67" font-size="7.5" fill="#1e40af">毎回 μs 単位修正!</text>
        <text x="34" y="100" font-size="8.5" fill="#be123c">羽根が赤外線を遮る時刻を実測 → 50万回まで精度維持</text>
      `);

    case 'shutter_damper':
      return wrap(`
        <!-- Left: Rebound Brake Damper -->
        <rect x="16" y="16" width="136" height="86" rx="5" fill="#fff5f5" stroke="#fecaca"/>
        <rect x="30" y="34" width="52" height="12" fill="#1f242d"/>
        <path d="M84 40 L106 40" stroke="#dc2626" stroke-width="2"/>
        <polygon points="110,40 102,35 102,45" fill="#dc2626"/>
        <rect x="112" y="24" width="24" height="44" rx="4" fill="#c44536"/>
        <text x="28" y="64" font-size="8" fill="#7f1d1d">時速40kmを跳ね返り</text>
        <text x="28" y="76" font-size="8" font-weight="bold" fill="#b91c1c">ゼロで吸収（e → 0）</text>
        <text x="28" y="94" font-size="8.5" font-weight="bold" fill="#991b1b">バウンド防止ブレーキ</text>
        <!-- Right: Floating Anti-Vib Silicone Mount -->
        <rect x="168" y="16" width="136" height="86" rx="5" fill="#eff6ff" stroke="#bfdbfe"/>
        <rect x="182" y="30" width="108" height="36" rx="4" fill="#334155"/>
        <circle cx="192" cy="40" r="6" fill="#2563eb"/>
        <circle cx="280" cy="40" r="6" fill="#2563eb"/>
        <circle cx="192" cy="56" r="6" fill="#2563eb"/>
        <circle cx="280" cy="56" r="6" fill="#2563eb"/>
        <text x="206" y="51" font-size="8" fill="#ffffff">ゴム懸架で絶縁</text>
        <text x="180" y="82" font-size="8" fill="#1e40af">IBIS・ボディへの微ブレ遮断</text>
        <text x="178" y="94" font-size="8.5" font-weight="bold" fill="#1d4ed8">4点フローティング防振</text>
      `);
  }
}

/**
 * Pure-white scientific explanation drawer.
 * Hidden when no part is selected (leaving 100% zero text on screen).
 * All toolbar controls inside the drawer remain strictly zero-text SVG icons.
 */
export class ExplanationDrawer {
  private drawerEl: HTMLElement;
  private swatchEl: HTMLElement;
  private isolateBtn: HTMLButtonElement;
  private bodyEl: HTMLElement;

  constructor(root: HTMLElement, handlers: ExplanationDrawerHandlers) {
    this.drawerEl = document.createElement('aside');
    this.drawerEl.className = 'explanation-drawer';
    this.drawerEl.setAttribute('aria-hidden', 'true');

    const toolbar = document.createElement('div');
    toolbar.className = 'drawer-toolbar';

    const left = document.createElement('div');
    left.className = 'drawer-toolbar-left';

    this.swatchEl = document.createElement('span');
    this.swatchEl.className = 'drawer-swatch-pill';

    const prevBtn = makeIconBtn(DRAWER_ICONS.prev);
    const nextBtn = makeIconBtn(DRAWER_ICONS.next);
    prevBtn.addEventListener('click', handlers.onPrev);
    nextBtn.addEventListener('click', handlers.onNext);
    left.append(this.swatchEl, prevBtn, nextBtn);

    const right = document.createElement('div');
    right.className = 'drawer-toolbar-right';

    this.isolateBtn = makeIconBtn(DRAWER_ICONS.isolate);
    this.isolateBtn.addEventListener('click', handlers.onToggleIsolate);

    const hideBtn = makeIconBtn(DRAWER_ICONS.hide);
    hideBtn.addEventListener('click', handlers.onHideCurrent);

    const closeBtn = makeIconBtn(DRAWER_ICONS.close);
    closeBtn.addEventListener('click', handlers.onClose);

    right.append(this.isolateBtn, hideBtn, closeBtn);
    toolbar.append(left, right);

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'drawer-body';

    this.drawerEl.append(toolbar, this.bodyEl);
    root.appendChild(this.drawerEl);
  }

  public show(part: CadPart, isIsolated: boolean): void {
    const exp = part.explanation;
    this.swatchEl.style.backgroundColor = part.swatchColor;
    this.isolateBtn.classList.toggle('is-active', isIsolated);

    const specsHtml = exp.specs
      .map(
        (s) => `
          <div class="exp-spec-row">
            <span class="exp-spec-label">${s.label}</span>
            <span class="exp-spec-value">${s.value}</span>
          </div>`
      )
      .join('');

    const physicsListHtml = exp.opticsAndPhysics
      .map((item) => `<li>${item}</li>`)
      .join('');

    const analogyHtml = exp.plainAnalogy
      ? `
        <div class="exp-analogy">
          <div class="exp-analogy-badge">やさしい解説</div>
          <p class="exp-analogy-text">${exp.plainAnalogy}</p>
        </div>`
      : '';

    const formulaHtml = exp.formula
      ? `
        <div class="exp-formula">
          <div class="exp-formula-expr">${exp.formula.expression}</div>
          <div class="exp-formula-desc">${exp.formula.description}</div>
        </div>`
      : '';

    this.bodyEl.innerHTML = `
      <div>
        <div class="exp-category">${exp.category}</div>
        <h2 class="exp-title">${exp.title}</h2>
        <div class="exp-subtitle">${exp.subtitle}</div>
      </div>

      ${analogyHtml}

      <div class="exp-diagram-box">
        ${renderSchematicSvg(exp.diagramType)}
      </div>

      <p class="exp-summary">${exp.summary}</p>

      <div class="exp-section">
        <div class="exp-section-heading">光学的・科学的原理</div>
        <ul class="exp-list">${physicsListHtml}</ul>
        ${formulaHtml}
      </div>

      <div class="exp-section">
        <div class="exp-section-heading">最新世代（2024–2026）の技術革新</div>
        <div class="exp-innovation">${exp.nextGenInnovation}</div>
      </div>

      <div class="exp-section">
        <div class="exp-section-heading">主要物理・設計諸元</div>
        <div class="exp-specs">${specsHtml}</div>
      </div>
    `;

    this.bodyEl.scrollTop = 0;
    this.drawerEl.classList.add('is-open');
    this.drawerEl.setAttribute('aria-hidden', 'false');
  }

  public setIsolatedState(isIsolated: boolean): void {
    this.isolateBtn.classList.toggle('is-active', isIsolated);
  }

  public hide(): void {
    this.drawerEl.classList.remove('is-open');
    this.drawerEl.setAttribute('aria-hidden', 'true');
    // Clear explanation text when closed so zero text exists in DOM during pure CAD inspection
    window.setTimeout(() => {
      if (!this.drawerEl.classList.contains('is-open')) {
        this.bodyEl.replaceChildren();
      }
    }, 360);
  }
}
