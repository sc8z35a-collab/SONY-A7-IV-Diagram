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

    case 'mb_vapor':
      return wrap(`
        <!-- Two-Phase Copper Vapor Chamber Cross-Section -->
        <rect x="22" y="18" width="276" height="44" rx="5" fill="#fff7ed" stroke="#c2410c" stroke-width="2"/>
        <!-- Capillary copper wick lining -->
        <rect x="26" y="54" width="268" height="5" fill="#ea580c" opacity="0.45"/>
        <rect x="26" y="21" width="268" height="4" fill="#ea580c" opacity="0.35"/>
        <!-- Vapor arrows rising from hot ISP center to cool ends -->
        <path d="M160 52 L160 32 L54 32 M160 32 L266 32" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 2"/>
        <polygon points="50,32 58,28 58,36" fill="#dc2626"/>
        <polygon points="270,32 262,28 262,36" fill="#dc2626"/>
        <!-- Liquid return along wick -->
        <path d="M44 56 L146 56 M276 56 L174 56" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <!-- TIM pad & 4nm ISP beneath -->
        <rect x="116" y="62" width="88" height="10" fill="#f472b6"/>
        <rect x="122" y="72" width="76" height="20" rx="2" fill="#0f766e"/>
        <text x="130" y="85" font-size="8.5" font-weight="bold" fill="#fff">4nm ISP 発熱源</text>
        <text x="68" y="29" font-size="8" font-weight="bold" fill="#b91c1c">蒸気（高速拡散）</text>
        <text x="192" y="29" font-size="8" font-weight="bold" fill="#b91c1c">潜熱輸送 k≈10,000</text>
        <text x="48" y="49" font-size="7.5" fill="#0369a1">凝縮液→毛細管還流</text>
        <text x="210" y="71" font-size="7.5" fill="#be185d">ピンク TIM パッド</text>
        <text x="58" y="108" font-size="8.5" fill="#334155">密閉二相蒸発サイクル：ファンレスで 8K60p 連続放熱!</text>
      `);

    case 'mb_emi':
      return wrap(`
        <!-- Multi-Compartment Faraday Cage -->
        <rect x="24" y="22" width="272" height="62" rx="4" fill="#f8fafc" stroke="#475569" stroke-width="2.4"/>
        <line x1="114" y1="22" x2="114" y2="84" stroke="#475569" stroke-width="2.4"/>
        <line x1="206" y1="22" x2="206" y2="84" stroke="#475569" stroke-width="2.4"/>
        <rect x="44" y="48" width="50" height="26" rx="2" fill="#0f766e"/>
        <text x="54" y="64" font-size="8.5" fill="#fff">ISP SoC</text>
        <rect x="136" y="48" width="50" height="26" rx="2" fill="#6d28d9"/>
        <text x="147" y="64" font-size="8.5" fill="#fff">AI NPU</text>
        <rect x="226" y="48" width="50" height="26" rx="2" fill="#0284c7"/>
        <text x="234" y="64" font-size="8.5" fill="#fff">Wi-Fi 6E</text>
        <!-- EMI waves bounced back by walls -->
        <path d="M96 42 Q103 36 110 42" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <path d="M222 42 Q215 36 209 42" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <!-- Ground pins -->
        <rect x="24" y="84" width="272" height="8" fill="#e2b648"/>
        <text x="96" y="91" font-size="7.5" font-weight="bold" fill="#1e293b">低インピーダンス多点グラウンド接地 (GND)</text>
        <text x="54" y="108" font-size="8.5" fill="#334155">洋白金属ファラデーケージ：高周波ノイズを 60 dB 以上遮断</text>
      `);

    case 'mb_ihs':
      return wrap(`
        <!-- Hotspot Heat Spreading through Copper IHS -->
        <rect x="40" y="18" width="240" height="22" rx="3" fill="#d97d4e" stroke="#9a3412"/>
        <text x="86" y="33" font-size="9" font-weight="bold" fill="#fff">ニッケルメッキ銅 IHS（広域熱拡散）</text>
        <rect x="96" y="40" width="128" height="8" fill="#62a8d8"/>
        <rect x="104" y="48" width="112" height="26" rx="2" fill="#0f766e"/>
        <rect x="142" y="52" width="36" height="18" rx="2" fill="#ef4444" opacity="0.85"/>
        <text x="146" y="64" font-size="8" font-weight="bold" fill="#fff">局所熱</text>
        <!-- Spreading arrows -->
        <path d="M160 50 L160 36 M160 36 L82 22 M160 36 L238 22" fill="none" stroke="#fef08a" stroke-width="2"/>
        <rect x="64" y="74" width="192" height="12" fill="#164a41"/>
        <text x="98" y="83" font-size="7.5" fill="#d1fae5">FC-BGA パッケージ基板</text>
        <text x="48" y="104" font-size="8.5" fill="#334155">局所 50 W/cm² 超の熱を銅蓋で水平拡散＆ダイ割れ防止</text>
      `);

    case 'mb_isp_die':
      return wrap(`
        <!-- Dual-Stream 16-bit Linear RAW ISP Pipeline -->
        <rect x="12" y="36" width="52" height="40" rx="4" fill="#cffafe" stroke="#0891b2"/>
        <text x="17" y="53" font-size="8" font-weight="bold" fill="#155e75">SLVS-EC</text>
        <text x="17" y="65" font-size="7.5" fill="#0e7490">160 Gbps</text>
        <path d="M64 56 L82 56" stroke="#0891b2" stroke-width="2"/>
        <rect x="82" y="28" width="76" height="56" rx="5" fill="#0f766e"/>
        <text x="91" y="45" font-size="8.5" font-weight="bold" fill="#fff">16-bit RAW</text>
        <text x="90" y="58" font-size="7.5" fill="#ccfbf1">デモザイク</text>
        <text x="90" y="70" font-size="7.5" fill="#ccfbf1">3D-LUT 色変換</text>
        <!-- Dual Stream Split -->
        <path d="M158 44 L184 32 M158 68 L184 80" stroke="#0d5bd9" stroke-width="2.2"/>
        <rect x="184" y="16" width="122" height="32" rx="4" fill="#1d4ed8"/>
        <text x="192" y="30" font-size="8" font-weight="bold" fill="#fff">① 記録ストリーム</text>
        <text x="192" y="42" font-size="7.5" fill="#dbeafe">8K60p / 120fps RAW</text>
        <rect x="184" y="62" width="122" height="32" rx="4" fill="#0284c7"/>
        <text x="192" y="76" font-size="8" font-weight="bold" fill="#fff">② EVF専用ストリーム</text>
        <text x="192" y="88" font-size="7.5" fill="#e0f2fe">遅延ゼロ・暗転なし表示!</text>
        <text x="48" y="109" font-size="8.5" fill="#334155">デュアルストリーム構造で連写中も完全ブラックアウトフリー</text>
      `);

    case 'mb_interposer':
      return wrap(`
        <!-- Flip-Chip BGA Cross Section -->
        <rect x="76" y="14" width="168" height="20" rx="2" fill="#0f766e"/>
        <text x="112" y="27" font-size="8.5" font-weight="bold" fill="#fff">4nm ISP シリコンダイ</text>
        <!-- Underfill + Cu Pillar Micro-Bumps -->
        <rect x="72" y="34" width="176" height="14" fill="#334155" opacity="0.35"/>
        ${[88, 106, 124, 142, 160, 178, 196, 214, 232]
          .map((x) => `<rect x="${x - 3}" y="34" width="6" height="14" fill="#d87342"/>`)
          .join('')}
        <text x="252" y="44" font-size="7.5" fill="#9a3412">Cuマイクロ</text>
        <!-- ABF RDL Interposer Substrate -->
        <rect x="44" y="48" width="232" height="22" rx="2" fill="#164a41"/>
        <text x="80" y="62" font-size="8.5" fill="#d1fae5">多層 ABF ビルドアップ再配線基板 (RDL)</text>
        <!-- SnAgCu Solder Balls -->
        ${[64, 96, 128, 160, 192, 224, 256]
          .map((x) => `<circle cx="${x}" cy="78" r="6.5" fill="#cbd5e1" stroke="#475569"/>`)
          .join('')}
        <!-- HDI Mainboard -->
        <rect x="24" y="86" width="272" height="14" rx="2" fill="#0e5a44"/>
        <text x="72" y="96" font-size="8" fill="#fef08a">12層 HDI メインマザーボード (0.4 mm ピッチ)</text>
        <text x="68" y="112" font-size="8" fill="#334155">直下接続で寄生インダクタンス約 1/10・アンダーフィル保護</text>
      `);

    case 'mb_ai_npu':
      return wrap(`
        <!-- 2D Systolic Array MAC Grid -->
        <rect x="18" y="16" width="124" height="78" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        ${[0, 1, 2, 3]
          .flatMap((r) =>
            [0, 1, 2, 3].map(
              (c) =>
                `<rect x="${30 + c * 26}" y="${24 + r * 16}" width="20" height="12" rx="2" fill="#6d28d9" opacity="${(0.55 + ((r + c) % 4) * 0.14).toFixed(2)}"/>`
            )
          )
          .join('')}
        <text x="24" y="106" font-size="8.5" font-weight="bold" fill="#5b21b6">2D シストリックアレイ (MAC)</text>
        <!-- Flow arrows into AI outputs -->
        <path d="M146 54 L168 54" stroke="#7c3aed" stroke-width="2.4"/>
        <polygon points="172,54 164,49 164,59" fill="#7c3aed"/>
        <rect x="174" y="16" width="130" height="24" rx="4" fill="#ede9fe" stroke="#8b5cf6"/>
        <text x="184" y="31" font-size="8.5" font-weight="bold" fill="#4c1d95">骨格姿勢推定 AF (120Hz)</text>
        <rect x="174" y="44" width="130" height="24" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="184" y="59" font-size="8.5" font-weight="bold" fill="#075985">カメラ内 AI ノイズ低減</text>
        <rect x="174" y="72" width="130" height="24" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="184" y="87" font-size="8.5" font-weight="bold" fill="#92400e">カメラ内 4× 超解像 (96MP)</text>
        <text x="176" y="108" font-size="7.5" fill="#475569">INT8 量子化推論で高効率・超低遅延</text>
      `);

    case 'mb_lpddr5x':
      return wrap(`
        <!-- Pre-Capture Ring Buffer Diagram -->
        <circle cx="88" cy="54" r="32" fill="none" stroke="#cbd5e1" stroke-width="10"/>
        <path d="M88 22 A32 32 0 1 1 58 66" fill="none" stroke="#2563eb" stroke-width="10" stroke-linecap="round"/>
        <text x="64" y="51" font-size="8.5" font-weight="bold" fill="#1d4ed8">リング</text>
        <text x="62" y="63" font-size="8" fill="#1e40af">バッファ</text>
        <text x="34" y="104" font-size="8.5" fill="#1d4ed8">LPDDR5X (68 GB/s)</text>
        <!-- Arrow to CFexpress on shutter press -->
        <path d="M126 54 L172 54" stroke="#d97706" stroke-width="2.4"/>
        <polygon points="176,54 168,49 168,59" fill="#d97706"/>
        <text x="128" y="44" font-size="8" font-weight="bold" fill="#b45309">全押し!</text>
        <rect x="178" y="20" width="126" height="68" rx="6" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="188" y="38" font-size="9" font-weight="bold" fill="#92400e">プリ撮影タイムマシン</text>
        <text x="188" y="54" font-size="8" fill="#334155">半押し中に最新1秒分の</text>
        <text x="188" y="66" font-size="8" fill="#334155">RAWを常時メモリ保持し</text>
        <text x="188" y="78" font-size="8" font-weight="bold" fill="#b45309">最大1秒前まで遡及保存!</text>
      `);

    case 'mb_pmic':
      return wrap(`
        <!-- Multi-Phase Buck Ripple Cancellation -->
        <rect x="16" y="20" width="60" height="58" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="24" y="44" font-size="8.5" font-weight="bold" fill="#92400e">電池</text>
        <text x="24" y="58" font-size="9" font-weight="bold" fill="#b45309">7.2 V</text>
        <path d="M76 49 L98 49" stroke="#475569" stroke-width="2"/>
        <!-- 4-phase shifted waves -->
        <rect x="100" y="18" width="118" height="62" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <path d="M106 42 L120 26 L134 42 L148 26 L162 42 L176 26 L190 42 L204 26" fill="none" stroke="#93c5fd" stroke-width="1.4"/>
        <path d="M106 26 L120 42 L134 26 L148 42 L162 26 L176 42 L190 26 L204 42" fill="none" stroke="#60a5fa" stroke-width="1.4"/>
        <line x1="106" y1="62" x2="210" y2="62" stroke="#0d5bd9" stroke-width="2.6"/>
        <text x="112" y="74" font-size="7.5" font-weight="bold" fill="#0d5bd9">合成出力：リップル &lt;10mV!</text>
        <path d="M218 49 L238 49" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="240" y="20" width="66" height="58" rx="4" fill="#eff6ff" stroke="#2563eb"/>
        <text x="248" y="42" font-size="8.5" font-weight="bold" fill="#1d4ed8">4nm ISP</text>
        <text x="248" y="57" font-size="9" font-weight="bold" fill="#0f172a">0.75 V</text>
        <text x="250" y="69" font-size="7.5" fill="#1e40af">効率 95%</text>
        <text x="36" y="102" font-size="8.5" fill="#334155">多相同期整流（90°位相差）で波を相殺し鏡のように安定した給電</text>
      `);

    case 'mb_cfexpress':
      return wrap(`
        <!-- Storage Bandwidth Bar Comparison -->
        <text x="18" y="28" font-size="8.5" fill="#475569">SD UHS-II</text>
        <rect x="108" y="18" width="22" height="14" rx="2" fill="#94a3b8"/>
        <text x="136" y="29" font-size="8.5" fill="#475569">312 MB/s</text>

        <text x="18" y="54" font-size="8.5" fill="#334155">CFexpress 2.0 B</text>
        <rect x="108" y="44" width="96" height="14" rx="2" fill="#0284c7"/>
        <text x="210" y="55" font-size="8.5" fill="#0369a1">2,000 MB/s</text>

        <text x="18" y="80" font-size="8.5" font-weight="bold" fill="#b45309">CFexpress 4.0 B</text>
        <rect x="108" y="70" width="192" height="16" rx="3" fill="#f59e0b"/>
        <text x="172" y="81" font-size="8.5" font-weight="bold" fill="#fff">4,000 MB/s (12.8×!)</text>

        <text x="26" y="104" font-size="8.5" fill="#334155">PCIe Gen4 ×2 / NVMe 1.4c 直結 → 8K60p RAW ＆ 120fps無限連写</text>
      `);

    case 'mb_imu_mcu':
      return wrap(`
        <!-- 6-Axis Quartz IMU + Coordinated 8.5-Stop IBIS/OIS -->
        <rect x="16" y="24" width="84" height="58" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="24" y="42" font-size="8.5" font-weight="bold" fill="#854d0e">6軸水晶IMU</text>
        <text x="24" y="56" font-size="7.5" fill="#713f12">コリオリ力検出</text>
        <text x="24" y="69" font-size="8" font-weight="bold" fill="#a16207">2,000 Hz計測</text>
        <path d="M100 53 L122 53" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="122" y="28" width="64" height="50" rx="5" fill="#1e293b"/>
        <text x="131" y="48" font-size="8.5" font-weight="bold" fill="#38bdf8">制御MCU</text>
        <text x="130" y="63" font-size="7.5" fill="#e2e8f0">PID最適配分</text>
        <path d="M186 42 L208 32 M186 64 L208 74" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="210" y="16" width="96" height="30" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="218" y="34" font-size="8.5" font-weight="bold" fill="#1d4ed8">ボディ 5軸IBIS</text>
        <rect x="210" y="58" width="96" height="30" rx="4" fill="#dcfce7" stroke="#16a34a"/>
        <text x="218" y="76" font-size="8.5" font-weight="bold" fill="#15803d">レンズ側 OIS</text>
        <text x="48" y="106" font-size="8.5" fill="#334155">ボディ＋レンズ協調制御で最大 8.5 段の手ブレ補正を実現!</text>
      `);

    case 'mb_security_clock':
      return wrap(`
        <!-- Left: C2PA Cryptographic Signing -->
        <rect x="14" y="16" width="144" height="86" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="24" y="33" font-size="8.5" font-weight="bold" fill="#166534">C2PA 真正性署名チップ</text>
        <rect x="24" y="42" width="44" height="24" rx="3" fill="#1e293b"/>
        <text x="31" y="57" font-size="8" fill="#fff">RAW</text>
        <path d="M68 54 L86 54" stroke="#16a34a" stroke-width="2"/>
        <rect x="86" y="42" width="62" height="24" rx="3" fill="#16a34a"/>
        <text x="92" y="57" font-size="8" font-weight="bold" fill="#fff">ECDSA署名</text>
        <text x="22" y="82" font-size="7.5" fill="#15803d">撮影瞬間に秘密鍵で電子印</text>
        <text x="22" y="94" font-size="7.5" fill="#15803d">AI偽造・改ざんを即検出!</text>
        <!-- Right: TCXO ±0.5 ppm Clock -->
        <rect x="166" y="16" width="140" height="86" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="176" y="33" font-size="8.5" font-weight="bold" fill="#92400e">TCXO ±0.5 ppm 水晶</text>
        <path d="M178 72 Q218 42 292 78" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        <line x1="178" y1="58" x2="292" y2="58" stroke="#d97706" stroke-width="2.4"/>
        <text x="180" y="51" font-size="7.5" font-weight="bold" fill="#b45309">温度補償で周波数フラット!</text>
        <text x="176" y="93" font-size="7.5" fill="#78350f">8K長時間収録も音ズレゼロ</text>
      `);

    case 'mb_io_ports':
      return wrap(`
        <!-- External High-Speed I/O + ESD TVS Protection -->
        <rect x="18" y="14" width="96" height="20" rx="3" fill="#334155"/>
        <text x="26" y="27" font-size="8" fill="#fff">2.5GBASE-T LAN</text>
        <rect x="18" y="38" width="96" height="20" rx="3" fill="#1d4ed8"/>
        <text x="26" y="51" font-size="8" fill="#fff">HDMI 2.1 (48Gbps)</text>
        <rect x="18" y="62" width="96" height="20" rx="3" fill="#0f766e"/>
        <text x="26" y="75" font-size="8" fill="#fff">USB-C 10Gbps PD</text>
        <rect x="18" y="86" width="96" height="20" rx="3" fill="#b45309"/>
        <text x="26" y="99" font-size="8" fill="#fff">3.5mm 24bit 音声</text>
        <!-- ESD Surge Shield Wall -->
        <line x1="114" y1="48" x2="218" y2="48" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="136" y="18" width="56" height="84" rx="4" fill="#fef2f2" stroke="#dc2626" stroke-dasharray="3 2"/>
        <text x="142" y="42" font-size="8" font-weight="bold" fill="#b91c1c">TVS避雷</text>
        <text x="144" y="55" font-size="7.5" fill="#dc2626">±15 kV</text>
        <text x="142" y="67" font-size="7.5" fill="#dc2626">静電気を</text>
        <text x="143" y="79" font-size="7.5" fill="#dc2626">GNDへ逃す</text>
        <rect x="218" y="26" width="84" height="60" rx="5" fill="#0f766e"/>
        <text x="234" y="52" font-size="9" font-weight="bold" fill="#fff">4nm ISP</text>
        <text x="232" y="67" font-size="8" fill="#ccfbf1">安全に保護!</text>
      `);

    case 'mb_rf_wifi':
      return wrap(`
        <!-- 2x2 MIMO Tri-Band Wi-Fi 6E/7 Coax Antenna Architecture -->
        <rect x="18" y="24" width="86" height="62" rx="5" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="28" y="44" font-size="8.5" font-weight="bold" fill="#0369a1">Wi-Fi 6E/7</text>
        <text x="28" y="58" font-size="8" fill="#075985">2.4/5/6 GHz</text>
        <text x="28" y="72" font-size="8" fill="#075985">+ BT 5.3 SiP</text>
        <!-- Dual 50-ohm Coax Cables -->
        <path d="M104 40 C138 40, 146 28, 182 28" fill="none" stroke="#d27a44" stroke-width="3"/>
        <path d="M104 70 C138 70, 146 82, 182 82" fill="none" stroke="#d27a44" stroke-width="3"/>
        <text x="116" y="58" font-size="7.5" font-weight="bold" fill="#9a3412">50Ω同軸×2</text>
        <!-- Dual MIMO Antennas -->
        <rect x="182" y="18" width="44" height="22" rx="3" fill="#1e293b"/>
        <text x="189" y="32" font-size="8" fill="#38bdf8">ANT 1</text>
        <rect x="182" y="70" width="44" height="22" rx="3" fill="#1e293b"/>
        <text x="189" y="84" font-size="8" fill="#38bdf8">ANT 2</text>
        <!-- 2x2 MIMO Waves -->
        <path d="M236 22 Q246 29 236 36 M244 18 Q258 29 244 40" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <path d="M236 74 Q246 81 236 88 M244 70 Q258 81 244 92" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="256" y="54" font-size="8.5" font-weight="bold" fill="#0369a1">2×2 MIMO</text>
        <text x="256" y="67" font-size="7.5" fill="#475569">高速FTP送信</text>
        <text x="28" y="106" font-size="8" fill="#334155">金属ボディ外側の樹脂窓アンテナへ同軸給電し電波を空間多重</text>
      `);

    case 'mb_hdi_pcb':
      return wrap(`
        <!-- 12-Layer Any-Layer HDI Microvia Cross Section -->
        <rect x="24" y="16" width="272" height="72" rx="3" fill="#124939" stroke="#0e3b2e"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
          .map((i) => {
            const y = 21 + i * 5.6;
            const col = i === 1 || i === 4 || i === 7 || i === 10 ? '#eab308' : '#d97742';
            return `<rect x="28" y="${y.toFixed(1)}" width="264" height="2.2" fill="${col}"/>`;
          })
          .join('')}
        <!-- Stacked UV Laser Copper-Filled Microvias (Any-Layer!) -->
        <rect x="86" y="21" width="7" height="24" fill="#facc15" stroke="#1e293b" stroke-width="0.6"/>
        <rect x="136" y="38" width="7" height="28" fill="#facc15" stroke="#1e293b" stroke-width="0.6"/>
        <rect x="212" y="21" width="7" height="62" fill="#facc15" stroke="#1e293b" stroke-width="0.6"/>
        <text x="26" y="101" font-size="8.5" font-weight="bold" fill="#0e5a44">12層エニーレイヤーHDI：直径50μmレーザー銅充填ビアで任意層直結</text>
        <text x="58" y="113" font-size="8" fill="#475569">SLVS-EC 100Ω ＆ PCIe Gen4 85Ω 等長差動インピーダンス整合</text>
      `);

    case 'mb_b2b':
      return wrap(`
        <!-- G-S-S-G Differential Shielded Pinout + ZIF Flip-Lock -->
        <rect x="16" y="18" width="144" height="78" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="26" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">80ピン G-S-S-G 差動配列</text>
        ${['G', 'S+', 'S−', 'G', 'S+', 'S−', 'G']
          .map((lbl, idx) => {
            const x = 24 + idx * 19;
            const fill = lbl === 'G' ? '#475569' : '#0284c7';
            return `<rect x="${x}" y="44" width="15" height="24" rx="2" fill="${fill}"/><text x="${x + 3}" y="59" font-size="7.5" fill="#fff">${lbl}</text>`;
          })
          .join('')}
        <text x="24" y="85" font-size="7.5" fill="#475569">信号対をGNDで挟み160Gbps保護</text>
        <!-- Right: ZIF Flip Lock -->
        <rect x="170" y="18" width="136" height="78" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="180" y="34" font-size="8.5" font-weight="bold" fill="#92400e">ZIF フリップロック</text>
        <rect x="184" y="62" width="108" height="10" fill="#c76414"/>
        <rect x="206" y="46" width="64" height="16" rx="2" fill="#1e293b"/>
        <text x="215" y="57" font-size="7.5" fill="#fde047">押え蓋ロック</text>
        <text x="180" y="86" font-size="7.5" fill="#78350f">EVF/LCD/レンズ等 全12系統</text>
        <text x="64" y="110" font-size="8" fill="#334155">0.3mm狭ピッチ金端子でカメラ全身の神経リボンを確実圧接</text>
      `);

    case 'mb_chassis':
      return wrap(`
        <!-- Thermal Isolation Wall between Sensor Bay and ISP Bay -->
        <rect x="16" y="20" width="96" height="72" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="26" y="40" font-size="8.5" font-weight="bold" fill="#1d4ed8">前面：センサー室</text>
        <text x="26" y="55" font-size="7.5" fill="#1e40af">低温維持が命!</text>
        <text x="26" y="68" font-size="7.5" fill="#dc2626">+7℃で暗電流2倍</text>
        <text x="26" y="82" font-size="7.5" fill="#1e40af">前面へ独立放熱</text>
        <!-- Magnesium Mid-Frame Barrier -->
        <rect x="126" y="14" width="24" height="84" rx="3" fill="#64748b" stroke="#1e293b"/>
        <text x="133" y="44" font-size="8" font-weight="bold" fill="#fff" writing-mode="tb">マグネシウム遮熱壁</text>
        <!-- Rear ISP Bay -->
        <rect x="164" y="20" width="140" height="72" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="174" y="40" font-size="8.5" font-weight="bold" fill="#c2410c">背面：ISPメイン基板室</text>
        <text x="174" y="55" font-size="7.5" fill="#9a3412">8K処理で高温 (60–85℃)</text>
        <path d="M180 72 L288 72" stroke="#ea580c" stroke-width="2.2"/>
        <polygon points="292,72 284,67 284,77" fill="#ea580c"/>
        <text x="178" y="85" font-size="7.5" font-weight="bold" fill="#c2410c">背面ベイパーチャンバーへ逃がす!</text>
        <text x="48" y="110" font-size="8" fill="#334155">高剛性マグネシウム骨格＋熱分離構造で高画質と8K連続収録を両立</text>
      `);

    // =========================================================================
    // EVF Optical & Eye-Tracking Anatomy Schematics (14 bespoke diagrams)
    // =========================================================================
    case 'evf_eyecup':
      return wrap(`
        <!-- Eyepiece Lens + Silicone Eyecup + 25mm High Eyepoint + Spectacles -->
        <rect x="24" y="28" width="16" height="58" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
        <text x="16" y="98" font-size="7.5" fill="#0369a1">接眼最終面</text>
        <!-- Deep Eyecup Shroud -->
        <path d="M40 24 L82 14 L82 26 L48 34 Z" fill="#334155"/>
        <path d="M40 90 L82 100 L82 88 L48 80 Z" fill="#334155"/>
        <text x="50" y="12" font-size="8" font-weight="bold" fill="#1e293b">深型遮光カップ</text>
        <!-- Stray sunlight blocked -->
        <path d="M98 10 L74 20" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="98" y="16" font-size="7.5" fill="#d97706">外光遮断!</text>
        <!-- 41° FoV Ray Cone -->
        <polygon points="40,36 40,78 196,57" fill="rgba(14,165,233,0.16)" stroke="#0284c7" stroke-width="1.3"/>
        <line x1="40" y1="88" x2="196" y2="88" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="3 2"/>
        <text x="88" y="84" font-size="8.5" font-weight="bold" fill="#0f172a">ハイアイポイント 25 mm</text>
        <!-- Eyeglasses + Human Eye -->
        <line x1="158" y1="26" x2="158" y2="86" stroke="#64748b" stroke-width="2.4"/>
        <text x="148" y="22" font-size="7.5" fill="#475569">眼鏡OK</text>
        <path d="M196 57 Q226 30 264 57 Q226 84 196 57 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="1.6"/>
        <circle cx="212" cy="57" r="9" fill="#0284c7" opacity="0.75"/>
        <circle cx="210" cy="57" r="4" fill="#0f172a"/>
        <text x="198" y="99" font-size="8" font-weight="bold" fill="#0284c7">射出瞳・対角視野角 41°</text>
        <text x="56" y="114" font-size="8" fill="#334155">眼鏡着用でも四隅までケラレない25mmアイポイント＆迷光完全遮断</text>
      `);

    case 'evf_antifog':
      return wrap(`
        <!-- Cold Outside Air vs Warm Camera Interior with Airtight Dry-Air Gap -->
        <rect x="14" y="16" width="84" height="76" rx="5" fill="#eff6ff" stroke="#38bdf8"/>
        <text x="26" y="34" font-size="8.5" font-weight="bold" fill="#0369a1">外気 (極寒/多湿)</text>
        <text x="26" y="50" font-size="8" fill="#0284c7">−10℃ / 呼気</text>
        <text x="24" y="76" font-size="7.5" fill="#0369a1">フッ素撥水・撥油膜</text>
        <!-- Outer Glass -->
        <rect x="104" y="16" width="16" height="76" rx="2" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.3"/>
        <!-- Airtight Dry Air Chamber -->
        <rect x="120" y="22" width="44" height="64" fill="#f8fafc" stroke="#64748b" stroke-dasharray="3 2"/>
        <rect x="120" y="16" width="44" height="6" fill="#1e293b"/>
        <rect x="120" y="86" width="44" height="6" fill="#1e293b"/>
        <text x="124" y="50" font-size="8" font-weight="bold" fill="#0f172a">乾燥空気</text>
        <text x="125" y="63" font-size="7.5" fill="#475569">密閉断熱</text>
        <!-- Inner Glass -->
        <rect x="164" y="16" width="16" height="76" rx="2" fill="#bae6fd" stroke="#0284c7" stroke-width="1.3"/>
        <!-- Camera EVF Optics Side -->
        <rect x="186" y="16" width="118" height="76" rx="5" fill="#fff7ed" stroke="#fb923c"/>
        <text x="196" y="36" font-size="8.5" font-weight="bold" fill="#c2410c">EVF光学室 (+30℃)</text>
        <text x="196" y="53" font-size="8" fill="#9a3412">内面温度 &gt; 露点温度</text>
        <text x="196" y="70" font-size="8.5" font-weight="bold" fill="#16a34a">⇒ 結露・曇りゼロ!</text>
        <text x="196" y="84" font-size="7.5" fill="#64748b">可視光＋850nm NIR透過</text>
        <text x="48" y="110" font-size="8" fill="#334155">断熱ペアガラス構造＋Oリング気密封止で寒冷地・雨天でも曇らない</text>
      `);

    case 'evf_eye_sensor':
      return wrap(`
        <!-- 940nm VCSEL ToF Proximity + Ambient Sensor -->
        <rect x="18" y="24" width="76" height="62" rx="6" fill="#1e293b"/>
        <circle cx="40" cy="46" r="9" fill="#e11d48" stroke="#facc15" stroke-width="1.4"/>
        <text x="27" y="66" font-size="7.5" fill="#fda4af">940nm発光</text>
        <circle cx="72" cy="46" r="9" fill="#0284c7" stroke="#facc15" stroke-width="1.4"/>
        <text x="60" y="66" font-size="7.5" fill="#7dd3fc">SPAD受光</text>
        <!-- Outgoing & Returning ToF Pulses -->
        <path d="M94 42 L182 42" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5 3"/>
        <polygon points="186,42 178,38 178,46" fill="#f43f5e"/>
        <path d="M182 58 L98 58" stroke="#0284c7" stroke-width="2" stroke-dasharray="5 3"/>
        <polygon points="94,58 102,54 102,62" fill="#0284c7"/>
        <text x="108" y="34" font-size="8" font-weight="bold" fill="#be123c">往復時間 Δt 測距</text>
        <text x="104" y="74" font-size="8" fill="#0369a1">距離 d &lt; 25mm で瞬時切替</text>
        <!-- Eye / Face Profile + Auto Brightness Badge -->
        <path d="M192 32 Q216 50 192 68" fill="none" stroke="#1e293b" stroke-width="2.2"/>
        <circle cx="198" cy="50" r="6" fill="#38bdf8"/>
        <rect x="220" y="22" width="88" height="66" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="228" y="40" font-size="8.5" font-weight="bold" fill="#166534">応答 &lt; 40 ms</text>
        <text x="228" y="55" font-size="7.5" fill="#15803d">EVF ON / LCD OFF</text>
        <text x="228" y="70" font-size="7.5" fill="#0369a1">環境照度センサーで</text>
        <text x="228" y="81" font-size="7.5" fill="#0369a1">4,000nit自動調光</text>
        <text x="48" y="110" font-size="8" fill="#334155">850nm視線AFと干渉しない940nm帯ToF測距＋周囲明るさ自動順応</text>
      `);

    case 'evf_ir_leds':
      return wrap(`
        <!-- 8-LED Ring Left + Corneal Purkinje Reflection Geometry Right -->
        <ellipse cx="78" cy="56" rx="50" ry="38" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        <ellipse cx="78" cy="56" rx="34" ry="24" fill="#eff6ff" stroke="#94a3b8"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7]
          .map((i) => {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
            const cx = (78 + Math.cos(a) * 42).toFixed(1);
            const cy = (56 + Math.sin(a) * 31).toFixed(1);
            return `<circle cx="${cx}" cy="${cy}" r="4.2" fill="#e11d48" stroke="#fde047" stroke-width="1"/>`;
          })
          .join('')}
        <text x="53" y="59" font-size="8" font-weight="bold" fill="#0369a1">850nm × 8灯</text>
        <!-- Right: Pupil Center vs Purkinje Glint Vector -->
        <rect x="148" y="14" width="156" height="82" rx="6" fill="#fff1f2" stroke="#fda4af"/>
        <circle cx="224" cy="52" r="24" fill="#fff" stroke="#1e293b" stroke-width="1.6"/>
        <circle cx="231" cy="49" r="10" fill="#0f172a"/>
        <circle cx="218" cy="53" r="3.4" fill="#e11d48"/>
        <line x1="218" y1="53" x2="231" y2="49" stroke="#f59e0b" stroke-width="2"/>
        <text x="156" y="28" font-size="8" font-weight="bold" fill="#be123c">角膜反射法 (PCCR)</text>
        <text x="156" y="86" font-size="7.5" fill="#9f1239">黒目中心と角膜反射点(赤)のズレ→視線!</text>
        <text x="54" y="111" font-size="8" fill="#334155">8方向からの安全850nm近赤外光で眼鏡越しでも瞳孔と角膜反射を捕捉</text>
      `);

    case 'evf_dichroic':
      return wrap(`
        <!-- 45° Dichroic Hot Mirror: Visible Straight Through, 850nm IR 90° Down! -->
        <!-- OLED Left -->
        <rect x="14" y="34" width="32" height="40" rx="3" fill="#2563eb"/>
        <text x="17" y="57" font-size="8" font-weight="bold" fill="#fff">OLED</text>
        <!-- Visible Light Passing Straight Through (Cyan/Gold) -->
        <line x1="46" y1="50" x2="256" y2="50" stroke="#0284c7" stroke-width="2.6"/>
        <polygon points="260,50 251,45 251,55" fill="#0284c7"/>
        <text x="50" y="38" font-size="8" font-weight="bold" fill="#0369a1">可視光 98.5% 透過</text>
        <!-- 45° Dichroic Mirror Glass -->
        <line x1="146" y1="22" x2="200" y2="76" stroke="#db2777" stroke-width="5" stroke-linecap="round"/>
        <line x1="146" y1="22" x2="200" y2="76" stroke="#fbcfe8" stroke-width="1.5"/>
        <text x="176" y="21" font-size="8" font-weight="bold" fill="#be185d">45° 誘電体多層膜</text>
        <!-- Eye on Right -->
        <path d="M266 54 Q284 38 304 54 Q284 70 266 54 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="1.5"/>
        <circle cx="277" cy="54" r="5.5" fill="#0284c7"/>
        <!-- 850nm IR Reflecting 90° Downward! -->
        <line x1="264" y1="60" x2="178" y2="60" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2"/>
        <line x1="178" y1="60" x2="178" y2="94" stroke="#e11d48" stroke-width="2.6"/>
        <polygon points="178,99 173,90 183,90" fill="#e11d48"/>
        <text x="188" y="88" font-size="8" font-weight="bold" fill="#be123c">850nm赤外線 95% 反射</text>
        <rect x="152" y="99" width="52" height="14" rx="2" fill="#7e22ce"/>
        <text x="157" y="109" font-size="7.5" fill="#fff">視線CMOSへ</text>
        <text x="14" y="108" font-size="7.5" fill="#475569">画質劣化ゼロで光路分離</text>
      `);

    case 'evf_gaze_cam':
      return wrap(`
        <!-- Vertical Cross-Section: 90° IR Beam -> Aspheric Relay Lens -> 850nm BPF -> 307K NIR CMOS -> AI NPU -->
        <line x1="68" y1="10" x2="68" y2="30" stroke="#e11d48" stroke-width="2.4"/>
        <polygon points="68,34 63,26 73,26" fill="#e11d48"/>
        <text x="82" y="24" font-size="8" font-weight="bold" fill="#be123c">90°反射された眼球赤外像</text>
        <!-- Relay Lens -->
        <ellipse cx="68" cy="44" rx="24" ry="7" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="100" y="47" font-size="8" fill="#0369a1">非球面IRリレーレンズ</text>
        <!-- 850nm Bandpass Filter -->
        <rect x="44" y="58" width="48" height="7" rx="2" fill="#f43f5e" opacity="0.78"/>
        <text x="100" y="65" font-size="8" fill="#be123c">850nm狭帯域フィルター (外光遮断)</text>
        <!-- 307K-px NIR CMOS -->
        <rect x="38" y="74" width="60" height="14" rx="2" fill="#1e1b4b" stroke="#eab308" stroke-width="1.4"/>
        <text x="44" y="84" font-size="7.5" fill="#fde047">30.7万画素CMOS</text>
        <!-- Arrow to AI NPU -->
        <path d="M104 81 L176 81" stroke="#7c3aed" stroke-width="2.2"/>
        <polygon points="181,81 173,76 173,86" fill="#7c3aed"/>
        <rect x="184" y="68" width="122" height="28" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="192" y="80" font-size="8" font-weight="bold" fill="#5b21b6">AIアクセラレーター解析</text>
        <text x="192" y="91" font-size="7.5" fill="#6d28d9">2倍速でAF枠を視線先へ!</text>
        <text x="38" y="110" font-size="8" fill="#334155">メイン基板上端のEVF専用ノッチへ収容し、見るだけでピント位置を移動</text>
      `);

    case 'evf_lens_rear':
      return wrap(`
        <!-- Spherical vs Double-Aspheric Comparison (Distortion & Astigmatism) -->
        <rect x="16" y="16" width="126" height="76" rx="5" fill="#fff1f2" stroke="#fda4af"/>
        <text x="26" y="31" font-size="8" font-weight="bold" fill="#be123c">一般球面レンズ (周辺歪み)</text>
        <path d="M40 42 Q78 52 116 42 M40 80 Q78 70 116 80 M40 42 Q50 61 40 80 M116 42 Q106 61 116 80" fill="none" stroke="#e11d48" stroke-width="1.5"/>
        <text x="34" y="88" font-size="7.5" fill="#9f1239">糸巻き歪み・視線移動で像揺れ</text>
        <!-- Right: Double-Sided Aspheric G4 -->
        <rect x="156" y="16" width="150" height="76" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="166" y="31" font-size="8" font-weight="bold" fill="#0369a1">G4 大口径両面非球面 (GMo)</text>
        <rect x="182" y="42" width="96" height="36" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="214" y1="42" x2="214" y2="78" stroke="#38bdf8" stroke-width="1"/>
        <line x1="246" y1="42" x2="246" y2="78" stroke="#38bdf8" stroke-width="1"/>
        <text x="168" y="88" font-size="7.5" fill="#0369a1">視野角41°全域で直進・像揺れゼロ!</text>
        <text x="44" y="110" font-size="8" fill="#334155">高次非球面＋超低反射T*級コートにより0.90×大倍率と端までの切れを両立</text>
      `);

    case 'evf_lens_ed':
      return wrap(`
        <!-- Cemented ED Crown + High-Index Flint Doublet + Diopter Slide Arrows -->
        <!-- Left Doublet Cross Section -->
        <path d="M54 22 Q74 22 74 56 Q74 90 54 90 L44 90 Q54 56 44 22 Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="1.4"/>
        <path d="M74 22 Q98 56 74 90 Q82 56 74 22 Z" fill="#6ee7b7" stroke="#059669" stroke-width="1.4"/>
        <text x="26" y="16" font-size="7.5" font-weight="bold" fill="#4338ca">高分散凹(G2)</text>
        <text x="76" y="16" font-size="7.5" font-weight="bold" fill="#047857">ED低分散凸(G3)</text>
        <!-- R/G/B Rays Converging to Single Sharp Point (Zero Chromatic Aberration!) -->
        <line x1="94" y1="36" x2="216" y2="56" stroke="#ef4444" stroke-width="1.7"/>
        <line x1="96" y1="56" x2="216" y2="56" stroke="#10b981" stroke-width="1.7"/>
        <line x1="94" y1="76" x2="216" y2="56" stroke="#2563eb" stroke-width="1.7"/>
        <circle cx="216" cy="56" r="4.5" fill="#facc15" stroke="#0f172a" stroke-width="1.2"/>
        <text x="148" y="34" font-size="8" font-weight="bold" fill="#047857">R/G/B 完全一致(色収差ゼロ)</text>
        <!-- Diopter Movement Indicator -->
        <path d="M36 98 L104 98" stroke="#d97706" stroke-width="2.2"/>
        <polygon points="32,98 40,94 40,102" fill="#d97706"/>
        <polygon points="108,98 100,94 100,102" fill="#d97706"/>
        <text x="116" y="101" font-size="8" font-weight="bold" fill="#b45309">前後3.4mm移動 ⇒ 視度 −4.0 〜 +3.0 m⁻¹</text>
        <rect x="228" y="38" width="76" height="36" rx="4" fill="#fefce8" stroke="#eab308"/>
        <text x="234" y="53" font-size="7.5" font-weight="bold" fill="#854d0e">Δz = −f²·ΔD</text>
        <text x="234" y="66" font-size="7.5" fill="#a16207">裸眼くっきり</text>
      `);

    case 'evf_diopter':
      return wrap(`
        <!-- Pop-out Knurled Dial -> Gears -> Brass Lead Screw + Guide Rod + Anti-Backlash Spring -->
        <rect x="18" y="36" width="38" height="40" rx="5" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="26" y1="36" x2="26" y2="76" stroke="#94a3b8" stroke-width="1.2"/>
        <line x1="36" y1="36" x2="36" y2="76" stroke="#94a3b8" stroke-width="1.2"/>
        <line x1="46" y1="36" x2="46" y2="76" stroke="#94a3b8" stroke-width="1.2"/>
        <text x="16" y="90" font-size="7.5" font-weight="bold" fill="#1e293b">引出しロック</text>
        <!-- Lead Screw -->
        <rect x="56" y="51" width="144" height="10" rx="2" fill="#f59e0b" stroke="#b45309"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8]
          .map((i) => `<line x1="${66 + i * 15}" y1="51" x2="${72 + i * 15}" y2="61" stroke="#78350f" stroke-width="1.4"/>`)
          .join('')}
        <text x="86" y="44" font-size="8" font-weight="bold" fill="#b45309">真鍮リードスクリュー</text>
        <!-- Sliding Lens Carriage Nut + Anti-Backlash Spring -->
        <rect x="136" y="38" width="24" height="36" rx="3" fill="#64748b" stroke="#0f172a"/>
        <path d="M160 56 L168 48 L174 64 L180 48 L186 64 L194 56" fill="none" stroke="#0284c7" stroke-width="2"/>
        <text x="154" y="88" font-size="7.5" font-weight="bold" fill="#0369a1">予圧バネ(ガタ0)</text>
        <!-- Guide Rod -->
        <rect x="86" y="22" width="194" height="6" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="208" y="44" font-size="8" fill="#334155">2軸ガイドレール</text>
        <text x="208" y="58" font-size="7.5" fill="#475569">チルト公差 &lt; 0.02°</text>
        <text x="46" y="110" font-size="8" fill="#334155">回転をサブmm直進へ変換し、予圧スプリングとOリングでズレと水滴を防止</text>
      `);

    case 'evf_lens_field':
      return wrap(`
        <!-- Flat OLED -> Curved Petzval Error vs Flattened by G1 Field Flattener -->
        <rect x="20" y="24" width="12" height="62" rx="2" fill="#2563eb"/>
        <text x="12" y="98" font-size="7.5" font-weight="bold" fill="#1d4ed8">平面OLED</text>
        <!-- G1 Positive Meniscus Lens -->
        <path d="M68 20 Q84 55 68 90 Q96 55 68 20 Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="1.6"/>
        <text x="58" y="14" font-size="8" font-weight="bold" fill="#4338ca">G1 フィールドフラットナー</text>
        <!-- Telecentric Rays -->
        <path d="M32 32 L74 30 L178 24" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M32 55 L78 55 L178 55" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M32 78 L74 80 L178 86" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <!-- Uncorrected Curved Image Plane (dashed red) vs Corrected Flat Plane (solid green) -->
        <path d="M196 22 Q164 55 196 88" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="198" y="34" font-size="7.5" fill="#dc2626">像面湾曲 (端ボケ)</text>
        <line x1="218" y1="22" x2="218" y2="88" stroke="#16a34a" stroke-width="2.6"/>
        <text x="224" y="54" font-size="8" font-weight="bold" fill="#15803d">平坦結像!</text>
        <text x="224" y="68" font-size="7.5" fill="#166534">画面四隅まで</text>
        <text x="224" y="79" font-size="7.5" fill="#166534">シャープ</text>
        <text x="44" y="112" font-size="8" fill="#334155">ペッツバール和を補正し、OLEDのMLA指向光束を隅までムラなく集光</text>
      `);

    case 'evf_oled':
      return wrap(`
        <!-- Nano-Scale Cross-Section of 2-Stack Tandem WOLED on Silicon (OLEDoS) + Micro-Cavity + MLA! -->
        <!-- Bottom: Single-Crystal CMOS Silicon Backplane -->
        <rect x="24" y="84" width="272" height="15" rx="2" fill="#334155"/>
        <text x="64" y="95" font-size="8" font-weight="bold" fill="#f8fafc">単結晶シリコンCMOSバックプレーン (3,900 PPI駆動回路)</text>
        <!-- Reflective Al Anode -->
        <rect x="24" y="79" width="272" height="4" fill="#cbd5e1"/>
        <!-- 2-Stack Tandem OLED + CGL -->
        <rect x="24" y="61" width="272" height="17" fill="#fef3c7" stroke="#d97706" stroke-width="0.9"/>
        <text x="46" y="72.5" font-size="7.8" font-weight="bold" fill="#92400e">2スタック・タンデムWOLED ＋ 電荷発生層(CGL) 2倍効率</text>
        <!-- RGB Color Filter + Micro-Cavity Resonance -->
        <rect x="24" y="45" width="90" height="15" fill="#ef4444" opacity="0.88"/>
        <rect x="115" y="45" width="90" height="15" fill="#10b981" opacity="0.88"/>
        <rect x="206" y="45" width="90" height="15" fill="#3b82f6" opacity="0.88"/>
        <text x="46" y="56" font-size="8" font-weight="bold" fill="#fff">R 共振器</text>
        <text x="137" y="56" font-size="8" font-weight="bold" fill="#fff">G 共振器</text>
        <text x="228" y="56" font-size="8" font-weight="bold" fill="#fff">B 共振器</text>
        <!-- On-Chip Microlens Array (MLA) domes -->
        <path d="M24 45 Q69 24 114 45 M115 45 Q160 24 205 45 M206 45 Q251 24 296 45" fill="#bae6fd" opacity="0.72" stroke="#0284c7" stroke-width="1.4"/>
        <text x="50" y="20" font-size="8.5" font-weight="bold" fill="#0369a1">オンチップMLA (光取出し1.8倍 ⇒ 4,000 cd/m² &amp; DCI-P3)</text>
        <text x="46" y="112" font-size="8" fill="#334155">2階建て発光層＋波長別マイクロキャビティ＋極小レンズの三位一体構造</text>
      `);

    case 'evf_tcon':
      return wrap(`
        <!-- Dual-Stream Blackout-Free Pipeline: ISP -> Shielded FPC -> TCON Demura -> 240Hz OLED -->
        <rect x="14" y="28" width="64" height="52" rx="5" fill="#1d4ed8"/>
        <text x="24" y="50" font-size="8" font-weight="bold" fill="#fff">4nm ISP</text>
        <text x="20" y="64" font-size="7" fill="#bfdbfe">デュアル系統</text>
        <!-- Shielded FPC MIPI-DSI -->
        <path d="M78 54 L120 54" stroke="#d97706" stroke-width="6"/>
        <polygon points="124,54 116,48 116,60" fill="#b45309"/>
        <text x="80" y="42" font-size="7.5" font-weight="bold" fill="#b45309">22.6 Gbps</text>
        <text x="82" y="72" font-size="7" fill="#78350f">MIPI-DSI</text>
        <!-- TCON Board -->
        <rect x="126" y="22" width="96" height="64" rx="5" fill="#065f46" stroke="#10b981"/>
        <text x="136" y="40" font-size="8.5" font-weight="bold" fill="#fff">240Hz TCON</text>
        <text x="134" y="54" font-size="7.5" fill="#a7f3d0">・10bit HDR-PQ変換</text>
        <text x="134" y="66" font-size="7.5" fill="#a7f3d0">・944万画素Demura</text>
        <text x="134" y="78" font-size="7.5" fill="#fde047">・ELVDD/ELVSS電源</text>
        <!-- Output to OLED -->
        <path d="M222 54 L248 54" stroke="#0284c7" stroke-width="3"/>
        <polygon points="252,54 244,49 244,59" fill="#0284c7"/>
        <rect x="254" y="28" width="52" height="52" rx="5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="261" y="50" font-size="8" font-weight="bold" fill="#38bdf8">240 fps</text>
        <text x="260" y="65" font-size="7" fill="#e2e8f0">暗転ゼロ</text>
        <text x="40" y="109" font-size="8" fill="#334155">連写中も一切ブラックアウトしない専用超低遅延パイプライン(&lt;5ms)</text>
      `);

    case 'evf_heatsink':
      return wrap(`
        <!-- Micro-OLED Rear Thermal Conduction Path: Si Wafer -> TIM -> Cu Plate -> Aluminum Fins -->
        <rect x="20" y="24" width="52" height="60" rx="4" fill="#1e3a8a"/>
        <text x="26" y="50" font-size="8" font-weight="bold" fill="#fff">OLED</text>
        <text x="26" y="64" font-size="7" fill="#bfdbfe">Si基板発熱</text>
        <!-- TIM Pad -->
        <rect x="76" y="28" width="18" height="52" rx="2" fill="#38bdf8"/>
        <text x="72" y="94" font-size="7.5" fill="#0369a1">TIMパッド</text>
        <!-- Copper Spreader -->
        <rect x="98" y="24" width="22" height="60" rx="2" fill="#d97742" stroke="#9a3412"/>
        <text x="98" y="18" font-size="7.5" font-weight="bold" fill="#c2410c">純銅板</text>
        <!-- Aluminum Cooling Fins -->
        ${[0, 1, 2, 3, 4]
          .map((i) => `<rect x="120" y="${26 + i * 12}" width="32" height="7" rx="1" fill="#475569"/>`)
          .join('')}
        <!-- Heat Flow Arrows -->
        <path d="M162 40 L196 40 M162 54 L196 54 M162 68 L196 68" stroke="#ea580c" stroke-width="2"/>
        <polygon points="200,54 192,49 192,59" fill="#ea580c"/>
        <!-- Benefit Box -->
        <rect x="206" y="22" width="100" height="64" rx="5" fill="#fff7ed" stroke="#fb923c"/>
        <text x="214" y="39" font-size="8" font-weight="bold" fill="#c2410c">ΔT = −15℃ 冷却</text>
        <text x="214" y="54" font-size="7.5" fill="#9a3412">・OLED寿命 約3倍</text>
        <text x="214" y="67" font-size="7.5" fill="#9a3412">・焼き付き防止</text>
        <text x="214" y="80" font-size="7.5" fill="#9a3412">・DCI-P3色温度安定</text>
        <text x="48" y="111" font-size="8" fill="#334155">4,000 cd/m²超高輝度駆動の発熱を純銅＆フィンで逃がし劣化を防止</text>
      `);

    case 'evf_housing':
      return wrap(`
        <!-- Sawtooth Internal Anti-Reflection Baffle Ridges Trapping Stray Light -->
        <rect x="22" y="16" width="276" height="10" fill="#4b5563"/>
        <rect x="22" y="84" width="276" height="10" fill="#4b5563"/>
        <!-- Knife-edge sawtooth baffles top & bottom -->
        ${[0, 1, 2, 3, 4, 5, 6]
          .map((i) => {
            const bx = 46 + i * 36;
            return `<polygon points="${bx},26 ${bx + 10},26 ${bx + 4},37" fill="#111827"/>
                    <polygon points="${bx},84 ${bx + 10},84 ${bx + 4},73" fill="#111827"/>`;
          })
          .join('')}
        <!-- Clean Central Optical Beam -->
        <line x1="26" y1="55" x2="292" y2="55" stroke="#0284c7" stroke-width="2.5"/>
        <text x="116" y="51" font-size="8.5" font-weight="bold" fill="#0369a1">正規映像光路 (偏心 ±10μm)</text>
        <!-- Stray light ray getting trapped & killed by sawtooth baffles -->
        <polyline points="38,44 84,32 94,26 116,35" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2"/>
        <circle cx="116" cy="35" r="3.5" fill="#dc2626"/>
        <text x="124" y="38" font-size="7.5" font-weight="bold" fill="#b45309">迷光を多重反射で完全吸収!</text>
        <text x="36" y="111" font-size="8" fill="#334155">AZ91Dマグネシウム鏡筒＋鋸歯状遮光バッフルで黒浮きゼロ＆防塵防滴</text>
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
