import { PartExplanation } from '../../assemblies/types';
import { FONT_MONO, pill, shutterFrame } from './shared';

/**
 * Phase 34 Ultra-Detailed Shutter Technical Schematics — Group A (SH78–SH95, 18 schematics).
 */
export function renderShutterHdGroupA(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    case 'shutter_rivet_recesses':
      return shutterFrame({
        code: 'SH78',
        title: 'カシメ沈みポケット（エンボス凹部）断面比較',
        viewTag: '断面構造',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: NG protruding rivet -->
          <rect x="14" y="30" width="154" height="114" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="91" y="43" text-anchor="middle" font-size="7.5" font-weight="700" fill="#b91c1c">× 従来平面穴（頭が突出）</text>
          <rect x="24" y="64" width="134" height="8" fill="#1e293b"/>
          <rect x="24" y="96" width="134" height="8" fill="#334155"/>
          <path d="M78,96 L104,96 L101,84 L81,84 Z" fill="#f59e0b" stroke="#92400e"/>
          <rect x="86" y="96" width="10" height="24" fill="#d97706"/>
          <line x1="91" y1="73" x2="91" y2="83" stroke="#dc2626" stroke-width="1.6"/>
          <text x="91" y="134" text-anchor="middle" font-size="7" fill="#dc2626">隣羽根と時速40kmで激突!</text>
          <!-- Right: OK embossed pocket -->
          <rect x="180" y="30" width="166" height="114" rx="5" fill="#f0fdf4" stroke="#86efac"/>
          <text x="263" y="43" text-anchor="middle" font-size="7.5" font-weight="700" fill="#15803d">○ エンボス凹部ポケット (US4394082A)</text>
          <rect x="190" y="64" width="146" height="8" fill="#1e293b"/>
          <path d="M190,94 L236,94 L248,110 L278,110 L290,94 L336,94 L336,102 L294,102 L282,118 L244,118 L232,102 L190,102 Z" fill="#334155"/>
          <path d="M250,110 L276,110 L273,99 L253,99 Z" fill="#94a3b8" stroke="#334155"/>
          <rect x="258" y="110" width="10" height="18" fill="#64748b"/>
          <line x1="202" y1="83" x2="324" y2="83" stroke="#059669" stroke-width="1.4" stroke-dasharray="3 2" marker-end="url(#a-SH78-green)"/>
          ${pill(263, 134, 134, 13, '隙間 15μm+ 完全フラット摺動', '#dcfce7', '#16a34a', '#166534', 6.8)}
        `,
        caption: '穴周囲をすり鉢状にプレス絞りしてリベット頭を完全格納し、隣羽根との接触をゼロ化',
      });

    case 'shutter_cryst_pins':
      return shutterFrame({
        code: 'SH79',
        title: '99%結晶化・析出硬化めっき連結ピン',
        viewTag: '材料工学',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Stepped pin cross section -->
          <rect x="18" y="34" width="144" height="108" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="72" y="46" width="36" height="14" rx="3" fill="#64748b"/>
          <rect x="64" y="60" width="52" height="20" rx="2" fill="#94a3b8" stroke="#334155"/>
          <rect x="75" y="80" width="30" height="36" fill="#0ea5e9" opacity="0.28" stroke="#0284c7" stroke-width="2"/>
          <rect x="81" y="80" width="18" height="36" fill="#475569"/>
          <path d="M74,116 L106,116 L98,128 L82,128 Z" fill="#64748b"/>
          <text x="90" y="139" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">結晶化硬化層 (Hv 600–750)</text>
          <!-- Heat treatment & Archard wear chart -->
          <rect x="174" y="34" width="172" height="108" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="260" y="47" text-anchor="middle" font-size="7.5" font-weight="700" fill="#0f172a">US10649311B2 熱処理効果</text>
          ${pill(260, 62, 146, 15, '570–630 °C × 30–90 min 熱処理', '#fef3c7', '#d97706', '#92400e', 6.8)}
          <line x1="260" y1="70" x2="260" y2="80" stroke="#475569" stroke-width="1.3" marker-end="url(#a-SH79-slate)"/>
          <rect x="188" y="84" width="144" height="22" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="260" y="94" text-anchor="middle" font-size="7" font-weight="700" fill="#1d4ed8">結晶化率 &gt; 99%（非脆性・高靱性）</text>
          <text x="260" y="103" text-anchor="middle" font-size="6.5" fill="#1e40af">Hv 600–750 で 50万回摩耗粉極小</text>
          <text x="260" y="122" text-anchor="middle" font-size="7" fill="#059669" font-weight="700">V_wear = K·F·L / H_v 激減</text>
          <text x="260" y="134" text-anchor="middle" font-size="6.6" fill="#475569">センサーへの金属ダスト落下を防止</text>
        `,
        caption: '570–630 °C精密熱処理で皮膜を99%以上結晶化し、50万回連写でも剥離＆摩耗粉を抑止',
      });

    case 'shutter_5layer_blade':
      return shutterFrame({
        code: 'SH80',
        title: '5層完全対称ハイブリッド複合羽根',
        viewTag: '積層断面',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- 5 symmetric layers stack -->
          <rect x="24" y="34" width="180" height="16" rx="2" fill="#1e293b"/>
          <text x="114" y="45" text-anchor="middle" font-size="7.2" fill="#f8fafc" font-weight="700">① 表側：黒色遮光樹脂層 (56)</text>
          <rect x="24" y="53" width="180" height="18" rx="2" fill="#0284c7"/>
          <text x="114" y="65" text-anchor="middle" font-size="7.2" fill="#ffffff" font-weight="700">② 交差ガラス繊維強化層 (52)</text>
          <rect x="24" y="74" width="180" height="22" rx="2" fill="#eab308" stroke="#a16207"/>
          <text x="114" y="88" text-anchor="middle" font-size="7.4" fill="#422006" font-weight="800">③ 中央：アラミド繊維強化コア (54)</text>
          <rect x="24" y="99" width="180" height="18" rx="2" fill="#0284c7"/>
          <text x="114" y="111" text-anchor="middle" font-size="7.2" fill="#ffffff" font-weight="700">④ 交差ガラス繊維強化層 (52)</text>
          <rect x="24" y="120" width="180" height="16" rx="2" fill="#1e293b"/>
          <text x="114" y="131" text-anchor="middle" font-size="7.2" fill="#f8fafc" font-weight="700">⑤ 裏側：黒色遮光樹脂層 (56)</text>
          <!-- Symmetry bracket -->
          <line x1="212" y1="85" x2="226" y2="85" stroke="#d97706" stroke-width="1.5"/>
          <path d="M214,42 L222,42 L222,128 L214,128" fill="none" stroke="#0891b2" stroke-width="1.4"/>
          <!-- Physics callout -->
          <rect x="234" y="36" width="112" height="100" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="290" y="51" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0f172a">JP2008-299106A</text>
          <text x="290" y="67" text-anchor="middle" font-size="7" fill="#0891b2" font-weight="700">表裏 完全鏡面対称</text>
          <text x="290" y="83" text-anchor="middle" font-size="6.8" fill="#334155">温度・湿度変化でも</text>
          <text x="290" y="94" text-anchor="middle" font-size="6.8" fill="#334155">熱応力が表裏で相殺</text>
          ${pill(290, 114, 96, 15, '熱反り κ = 0 維持', '#dcfce7', '#16a34a', '#166534', 6.8)}
        `,
        caption: '中央アラミド芯を交差ガラス＋遮光樹脂で対称挟み込み、熱反りゼロと高引裂強度を両立',
      });

    case 'shutter_overlap_steps':
      return shutterFrame({
        code: 'SH81',
        title: '遮光羽根 #2〜#4 瓦状オーバーラップ段差',
        viewTag: '遮光迷路',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- Shingled 4-blade cross-section with stray light rays -->
          <rect x="16" y="32" width="210" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="36" y="44" font-size="7" fill="#dc2626" font-weight="700">レンズ側（太陽光）</text>
          <text x="150" y="44" font-size="7" fill="#0284c7" font-weight="700">センサー側（完全暗室）</text>
          <!-- 4 blades staggered in Z (X on diagram) -->
          <rect x="92" y="50" width="9" height="28" fill="#0f172a"/>
          <rect x="105" y="70" width="9" height="28" fill="#1e293b"/>
          <rect x="118" y="90" width="9" height="28" fill="#334155"/>
          <rect x="131" y="110" width="9" height="24" fill="#475569"/>
          <!-- Overlap bracket -->
          <line x1="84" y1="70" x2="84" y2="78" stroke="#d97706" stroke-width="2"/>
          <text x="58" y="77" font-size="6.8" fill="#b45309" font-weight="700">1.2mm</text>
          <!-- Incident rays blocked -->
          <line x1="28" y1="62" x2="90" y2="62" stroke="#dc2626" stroke-width="1.5" marker-end="url(#a-SH81-red)"/>
          <line x1="28" y1="84" x2="103" y2="84" stroke="#dc2626" stroke-width="1.5" marker-end="url(#a-SH81-red)"/>
          <line x1="28" y1="102" x2="116" y2="102" stroke="#dc2626" stroke-width="1.5" marker-end="url(#a-SH81-red)"/>
          <path d="M90,74 L104,76 L98,79" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 1"/>
          <text x="180" y="94" text-anchor="middle" font-size="8" font-weight="800" fill="#0f172a">OD &gt; 7</text>
          <text x="180" y="106" text-anchor="middle" font-size="6.6" fill="#475569">光漏れゼロ!</text>
          <!-- Right summary card -->
          <rect x="236" y="32" width="110" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="291" y="48" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0f172a">瓦屋根ラビリンス</text>
          <text x="291" y="65" text-anchor="middle" font-size="6.8" fill="#334155">段差ピッチ 0.15 mm</text>
          <text x="291" y="78" text-anchor="middle" font-size="6.8" fill="#334155">重なり代 1.0–1.5 mm</text>
          <text x="291" y="94" text-anchor="middle" font-size="6.8" fill="#0284c7" font-weight="700">透過率 &lt; 10⁻⁷</text>
          ${pill(291, 120, 94, 15, 'セルフキャッピング', '#fef3c7', '#d97706', '#92400e', 6.8)}
        `,
        caption: '4枚の羽根を階段状に1.2 mmずつ重ねて多段迷路遮光（OD > 7）し直射日光も完全遮断',
      });

    case 'shutter_slide_dimples':
      return shutterFrame({
        code: 'SH82',
        title: '半球状アンチスティクション摺動突起',
        viewTag: 'トライボロジー',
        accent: '#64748b',
        headerBg: '#f8fafc',
        body: `
          <!-- Top: Flat plate stiction (NG) -->
          <rect x="16" y="30" width="328" height="46" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="24" y="42" font-size="7.2" font-weight="700" fill="#b91c1c">× 平滑面同士：結露メニスカス＆負圧でベタッと張り付き（スティクション）</text>
          <rect x="30" y="50" width="210" height="7" fill="#1e293b"/>
          <rect x="30" y="57" width="210" height="4" fill="#38bdf8" opacity="0.65"/>
          <rect x="30" y="61" width="210" height="8" fill="#64748b"/>
          <text x="290" y="62" text-anchor="middle" font-size="7" font-weight="700" fill="#dc2626">接触面積 100%</text>
          <!-- Bottom: Hemispherical dimples (OK) -->
          <rect x="16" y="84" width="328" height="60" rx="5" fill="#f0fdf4" stroke="#86efac"/>
          <text x="24" y="96" font-size="7.2" font-weight="700" fill="#15803d">○ 半球マイクロディンプル：点接触（接触面積 &gt;95% 削減）＆空気逃げ道確保</text>
          <rect x="30" y="106" width="210" height="7" fill="#1e293b"/>
          <line x1="40" y1="101" x2="225" y2="101" stroke="#059669" stroke-width="1.3" marker-end="url(#a-SH82-green)"/>
          ${[48, 86, 124, 162, 200]
            .map((cx) => `<path d="M${cx - 8},124 A8,8 0 0,1 ${cx + 8},124 Z" fill="#94a3b8" stroke="#334155"/>`)
            .join('')}
          <rect x="30" y="124" width="210" height="9" fill="#64748b"/>
          ${pill(292, 120, 86, 16, '接触面積 < 5%', '#dcfce7', '#16a34a', '#166534', 7.0)}
        `,
        caption: '地板・中板の半球ディンプルが羽根を点接触で支え、高湿度・高速時の張り付きを根絶',
      });

    case 'shutter_slip_sheet':
      return shutterFrame({
        code: 'SH83',
        title: '極薄低摩擦すべりシート＆テーパ開口ベベル',
        viewTag: '特許構造',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Cross section of tapered aperture edge + slip sheet -->
          <rect x="16" y="32" width="218" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <!-- Tapered chassis wall -->
          <path d="M26,48 L120,48 L144,64 L120,76 L26,76 Z" fill="#475569"/>
          <path d="M26,110 L120,110 L144,98 L120,132 L26,132 Z" fill="#475569"/>
          <!-- Ultra-thin slip sheet -->
          <rect x="148" y="42" width="5" height="92" fill="#06b6d4"/>
          <!-- Moving blade -->
          <rect x="160" y="54" width="6" height="68" fill="#1e293b"/>
          <line x1="163" y1="42" x2="163" y2="132" stroke="#2563eb" stroke-width="1.4" marker-end="url(#a-SH83-blue)"/>
          <!-- Labels -->
          <text x="72" y="65" text-anchor="middle" font-size="7" fill="#ffffff" font-weight="700">テーパ開口縁</text>
          <text x="86" y="92" text-anchor="middle" font-size="7.2" fill="#0369a1" font-weight="700">有効光束 36×24</text>
          <text x="196" y="68" text-anchor="middle" font-size="6.8" fill="#0891b2" font-weight="700">薄板すべり</text>
          <text x="196" y="78" text-anchor="middle" font-size="6.8" fill="#0891b2" font-weight="700">シート 0.08mm</text>
          <!-- Right panel -->
          <rect x="242" y="32" width="104" height="110" rx="5" fill="#f0f9ff" stroke="#7dd3fc"/>
          <text x="294" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0369a1">JP4317237B2</text>
          <text x="294" y="64" text-anchor="middle" font-size="6.8" fill="#334155">動摩擦係数 μ_k</text>
          <text x="294" y="79" text-anchor="middle" font-size="9" font-weight="800" fill="#0284c7">0.05 – 0.09</text>
          <text x="294" y="96" text-anchor="middle" font-size="6.6" fill="#475569">開口端での羽根</text>
          <text x="294" y="106" text-anchor="middle" font-size="6.6" fill="#475569">引っ掛かり＆反射防止</text>
          ${pill(294, 127, 88, 14, 'セイコー特許技術', '#e0f2fe', '#0284c7', '#0369a1', 6.6)}
        `,
        caption: '極薄すべりシートとテーパ開口縁が羽根の引っ掛かり傷とエッジ迷光反射を同時抑止',
      });

    case 'shutter_pfpe_lube':
      return shutterFrame({
        code: 'SH84',
        title: '非拡散フッ素系固体潤滑（PFPE／MoS₂）',
        viewTag: '表面科学',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- Concentric pivot barrier schematic -->
          <rect x="16" y="32" width="166" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <circle cx="99" cy="86" r="42" fill="#e0f2fe" stroke="#06b6d4" stroke-width="5"/>
          <circle cx="99" cy="86" r="28" fill="#334155" stroke="#1e293b" stroke-width="2"/>
          <circle cx="99" cy="86" r="14" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
          <text x="99" y="89" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a">支軸</text>
          <text x="99" y="66" text-anchor="middle" font-size="6.5" fill="#fde047" font-weight="700">MoS₂固体膜</text>
          <text x="99" y="42" text-anchor="middle" font-size="6.8" fill="#0369a1" font-weight="700">PFPE 撥油バリアリング</text>
          <!-- Right comparison -->
          <rect x="190" y="32" width="156" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="268" y="46" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">オイル飛び阻止メカニズム</text>
          <!-- Contact angle droplet -->
          <line x1="206" y1="84" x2="330" y2="84" stroke="#06b6d4" stroke-width="3"/>
          <path d="M250,83 Q268,54 286,83 Z" fill="#f59e0b" opacity="0.85" stroke="#b45309"/>
          <text x="268" y="75" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">油滴</text>
          <text x="312" y="74" font-size="6.6" fill="#0369a1" font-weight="700">θ &gt; 60°</text>
          <text x="268" y="99" text-anchor="middle" font-size="6.8" fill="#334155">表面張力 γ_barrier &lt; γ_oil</text>
          <text x="268" y="111" text-anchor="middle" font-size="6.8" fill="#059669" font-weight="700">流動点 −60 °C（極寒不凍）</text>
          ${pill(268, 129, 134, 14, 'センサーへのオイルダストゼロ', '#dcfce7', '#16a34a', '#166534', 6.7)}
        `,
        caption: 'MoS₂固体潤滑とPFPE撥油バリアで油の這い上がりを阻止し、−20 °Cでも軽快に摺動',
      });

    case 'shutter_slit_bevel':
      return shutterFrame({
        code: 'SH85',
        title: 'スリット形成刃先 30°ナイフエッジ面取り',
        viewTag: '光学幾何',
        accent: '#1e293b',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Blunt edge reflection (NG) -->
          <rect x="14" y="30" width="156" height="114" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="92" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#b91c1c">× 直角切断面（かすめ反射）</text>
          <rect x="28" y="54" width="66" height="22" fill="#334155"/>
          <line x1="140" y1="48" x2="94" y2="66" stroke="#f59e0b" stroke-width="1.6" marker-end="url(#a-SH85-amber)"/>
          <line x1="94" y1="66" x2="144" y2="118" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-SH85-red)"/>
          <rect x="28" y="122" width="128" height="8" fill="#1d6d7c"/>
          <text x="116" y="96" font-size="6.8" fill="#dc2626" font-weight="700">迷光フレア!</text>
          <!-- Right: 30 deg Knife bevel (OK) -->
          <rect x="180" y="30" width="166" height="114" rx="5" fill="#f0fdf4" stroke="#86efac"/>
          <text x="263" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#15803d">○ 30°ナイフエッジ＋艶消し</text>
          <polygon points="194,54 274,54 252,76 194,76" fill="#0f172a"/>
          <text x="228" y="68" text-anchor="middle" font-size="6.8" fill="#e2e8f0">真直度 ±3μm</text>
          <!-- Clean slit width 1.3mm -->
          <line x1="274" y1="54" x2="274" y2="118" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-SH85-blue)"/>
          <line x1="312" y1="54" x2="312" y2="118" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-SH85-blue)"/>
          <rect x="276" y="78" width="34" height="16" rx="3" fill="#fef3c7" stroke="#f59e0b"/>
          <text x="293" y="89" text-anchor="middle" font-size="7" font-weight="800" fill="#b45309">1.3mm</text>
          <rect x="194" y="122" width="138" height="8" fill="#1d6d7c"/>
          <text x="263" y="139" text-anchor="middle" font-size="6.8" fill="#15803d" font-weight="700">1/8000s F1.2 でも高コントラスト</text>
        `,
        caption: 'スリット先端を30°ナイフエッジ化＆艶消し処理し、幅1.3 mm高速露光のかすめ反射を遮断',
      });

    case 'shutter_arc_shield':
      return shutterFrame({
        code: 'SH86',
        title: '駆動長孔スライド式「遮蔽部材90」',
        viewTag: '特許機構',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Arc slot + moving fan shield -->
          <rect x="16" y="30" width="184" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Baseplate arc slot -->
          <path d="M98,42 A50,50 0 0,1 98,132" fill="none" stroke="#1e293b" stroke-width="12" stroke-linecap="round"/>
          <!-- Fan shield 90 covering entire arc -->
          <path d="M62,87 L110,36 A66,66 0 0,1 110,138 Z" fill="#f59e0b" opacity="0.45" stroke="#b45309" stroke-width="1.5"/>
          <!-- Drive pin -->
          <circle cx="144" cy="87" r="7" fill="#334155" stroke="#0f172a" stroke-width="1.4"/>
          <circle cx="144" cy="87" r="3" fill="#e2e8f0"/>
          <path d="M138,62 A46,46 0 0,1 138,112" fill="none" stroke="#2563eb" stroke-width="1.6" marker-start="url(#a-SH86-blue)" marker-end="url(#a-SH86-blue)"/>
          <text x="64" y="138" font-size="6.8" fill="#92400e" font-weight="700">扇形スライド遮蔽部材 90</text>
          <!-- Right explanation -->
          <rect x="208" y="30" width="138" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="277" y="45" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">JP6216630B2 (Nidec)</text>
          <text x="277" y="61" text-anchor="middle" font-size="6.8" fill="#dc2626" font-weight="700">駆動室（摩耗粉・油煙）</text>
          <line x1="277" y1="67" x2="277" y2="81" stroke="#dc2626" stroke-width="1.4" marker-end="url(#a-SH86-red)"/>
          ${pill(277, 90, 118, 16, '長孔を常時100%密閉遮断', '#fef3c7', '#d97706', '#92400e', 6.8)}
          <text x="277" y="114" text-anchor="middle" font-size="6.8" fill="#059669" font-weight="700">撮像面側：完全クリーン</text>
          <text x="277" y="128" text-anchor="middle" font-size="6.5" fill="#475569">慣性増加 &lt; 0.02 g の極薄膜</text>
        `,
        caption: '駆動ピンと一体移動する扇形遮蔽部材90が円弧長孔を常に塞ぎ、駆動室からのダストを遮断',
      });

    case 'shutter_flag_tabs':
      return shutterFrame({
        code: 'SH87',
        title: 'パンチ抜き光学速度検出フラグ＆自己診断',
        viewTag: '閉ループ計測',
        accent: '#e11d48',
        headerBg: '#fff1f2',
        body: `
          <!-- Left: 3 flags slicing IR beams -->
          <rect x="16" y="32" width="150" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="30" y="42" width="14" height="90" rx="2" fill="#475569"/>
          ${[54, 84, 114]
            .map(
              (y, i) => `
            <rect x="44" y="${y}" width="36" height="11" fill="#0f172a"/>
            <line x1="88" y1="${y + 5.5}" x2="122" y2="${y + 5.5}" stroke="#e11d48" stroke-width="1.6" stroke-dasharray="3 2"/>
            <rect x="124" y="${y - 1}" width="32" height="13" rx="2" fill="#1e293b"/>
            <text x="140" y="${y + 8}" text-anchor="middle" font-size="6.5" fill="#fda4af" style="font-family:${FONT_MONO};">PI-${i + 1}</text>
          `
            )
            .join('')}
          <text x="90" y="138" text-anchor="middle" font-size="6.7" fill="#334155">開始・中間・終端 3点フラグ</text>
          <!-- Right: Pulse waveform & feedback -->
          <rect x="174" y="32" width="172" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="260" y="46" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">940nm PI リアルタイム計測</text>
          <path d="M186,82 L208,82 L208,60 L228,60 L228,82 L256,82 L256,60 L276,60 L276,82 L308,82 L308,60 L330,60 L330,82" fill="none" stroke="#e11d48" stroke-width="1.8"/>
          <line x1="208" y1="88" x2="256" y2="88" stroke="#2563eb" stroke-width="1.3" marker-start="url(#a-SH87-blue)" marker-end="url(#a-SH87-blue)"/>
          <text x="232" y="99" text-anchor="middle" font-size="6.7" fill="#1d4ed8" font-weight="700">Δt₁ (±1μs)</text>
          <line x1="256" y1="88" x2="308" y2="88" stroke="#059669" stroke-width="1.3" marker-start="url(#a-SH87-green)" marker-end="url(#a-SH87-green)"/>
          <text x="282" y="99" text-anchor="middle" font-size="6.7" fill="#059669" font-weight="700">Δt₂ (±1μs)</text>
          ${pill(260, 122, 150, 16, '次ショットの電磁石OFF時刻を自動補正', '#eff6ff', '#2563eb', '#1d4ed8', 6.6)}
        `,
        caption: 'アーム一体フラグが940 nm赤外ビームを切る時刻差から幕速を±1 µs実測し経年ズレを自動補正',
      });

    case 'shutter_split_trans':
      return shutterFrame({
        code: 'SH88',
        title: '主羽根／補助羽根 独立2系統スプリング伝達',
        viewTag: '特許機構',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Coaxial shaft splitting two drive paths -->
          <rect x="16" y="34" width="328" height="108" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <circle cx="64" cy="88" r="22" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
          <circle cx="64" cy="88" r="9" fill="#64748b"/>
          <text x="64" y="124" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">同軸デュアル駆動軸</text>
          <!-- Path 1: Master Slit Blade -->
          <line x1="86" y1="74" x2="128" y2="56" stroke="#2563eb" stroke-width="2" marker-end="url(#a-SH88-blue)"/>
          <rect x="132" y="42" width="90" height="28" rx="4" fill="#dbeafe" stroke="#2563eb"/>
          <text x="177" y="54" text-anchor="middle" font-size="7.2" font-weight="700" fill="#1d4ed8">主バネ k₁ ＋ 主レバー</text>
          <text x="177" y="64" text-anchor="middle" font-size="6.4" fill="#1e40af">超低慣性・無振動加速</text>
          <line x1="222" y1="56" x2="246" y2="56" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-SH88-blue)"/>
          ${pill(292, 56, 86, 22, '先頭スリット羽根 #1', '#1e293b', '#0f172a', '#f8fafc', 6.8)}
          <!-- Path 2: Aux Cover Blades -->
          <line x1="86" y1="102" x2="128" y2="116" stroke="#d97706" stroke-width="2" marker-end="url(#a-SH88-amber)"/>
          <rect x="132" y="100" width="90" height="28" rx="4" fill="#fef3c7" stroke="#d97706"/>
          <text x="177" y="112" text-anchor="middle" font-size="7.2" font-weight="700" fill="#92400e">補助バネ k₂ ＋ 補助腕</text>
          <text x="177" y="122" text-anchor="middle" font-size="6.4" fill="#b45309">高トルクで3枚群を駆動</text>
          <line x1="222" y1="114" x2="246" y2="114" stroke="#d97706" stroke-width="1.8" marker-end="url(#a-SH88-amber)"/>
          ${pill(292, 114, 86, 22, '遮光羽根群 #2–#4', '#475569', '#334155', '#ffffff', 6.8)}
          <text x="180" y="88" text-anchor="middle" font-size="6.8" font-weight="700" fill="#059669">ω₁ = √(k₁/I₁) ≈ ω₂ = √(k₂/I₂)  (US4220409A)</text>
        `,
        caption: '先頭スリット羽根と後続3枚の動力系を独立バネへ分離し、フラッタ振動と衝撃干渉を遮断',
      });

    case 'shutter_coax_drivers':
      return shutterFrame({
        code: 'SH89',
        title: '同軸2分割・先幕駆動部材（常時開放シーケンス）',
        viewTag: 'ミラーレス中核',
        accent: '#ef4444',
        headerBg: '#fef2f2',
        body: `
          <!-- 3-step Mirrorless Normally-Open sequence -->
          <rect x="14" y="32" width="102" height="110" rx="5" fill="#f0fdf4" stroke="#86efac"/>
          <text x="65" y="45" text-anchor="middle" font-size="7.2" font-weight="700" fill="#15803d">① ライブビュー待機</text>
          <circle cx="65" cy="82" r="18" fill="#fee2e2" stroke="#ef4444" stroke-width="1.6"/>
          <circle cx="65" cy="82" r="10" fill="#dbeafe" stroke="#2563eb" stroke-width="1.4"/>
          <text x="65" y="114" text-anchor="middle" font-size="6.6" fill="#334155">部材1=全開ロック</text>
          <text x="65" y="124" text-anchor="middle" font-size="6.6" fill="#15803d" font-weight="700">通電 0 mW!</text>

          <line x1="118" y1="86" x2="128" y2="86" stroke="#475569" stroke-width="1.5" marker-end="url(#a-SH89-slate)"/>

          <rect x="130" y="32" width="102" height="110" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
          <text x="181" y="45" text-anchor="middle" font-size="7.2" font-weight="700" fill="#b45309">② レリーズ直前閉鎖</text>
          <circle cx="181" cy="82" r="18" fill="#fee2e2" stroke="#ef4444" stroke-width="1.6"/>
          <rect x="176" y="61" width="10" height="8" rx="1" fill="#eab308"/>
          <text x="181" y="114" text-anchor="middle" font-size="6.6" fill="#334155">セットばねで閉鎖し</text>
          <text x="181" y="124" text-anchor="middle" font-size="6.6" fill="#b45309" font-weight="700">部材1＋部材2 係合</text>

          <line x1="234" y1="86" x2="244" y2="86" stroke="#475569" stroke-width="1.5" marker-end="url(#a-SH89-slate)"/>

          <rect x="246" y="32" width="100" height="110" rx="5" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="296" y="45" text-anchor="middle" font-size="7.2" font-weight="700" fill="#1d4ed8">③ 高速スリット露光</text>
          <circle cx="296" cy="82" r="18" fill="#2563eb" opacity="0.22" stroke="#1d4ed8" stroke-width="1.8"/>
          <path d="M286,70 A16,16 0 0,1 308,92" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#a-SH89-red)"/>
          <text x="296" y="114" text-anchor="middle" font-size="6.6" fill="#334155">一体となり2.2msで</text>
          <text x="296" y="124" text-anchor="middle" font-size="6.6" fill="#1d4ed8" font-weight="700">超高速オープン走行</text>
        `,
        caption: '同一支軸上の第一・第二回動部材が待機時分離＆露光時合体し、無電力常時開放を実現',
      });

    case 'shutter_no_lock_lever':
      return shutterFrame({
        code: 'SH90',
        title: '先幕係止ロックレバー＆単方向切替電磁石',
        viewTag: '特許機構',
        accent: '#f97316',
        headerBg: '#fff7ed',
        body: `
          <!-- Switching mechanism US20160109782A1 -->
          <rect x="16" y="32" width="186" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Electromagnet -->
          <rect x="134" y="46" width="54" height="44" rx="4" fill="#c2410c" stroke="#7c2d12"/>
          <text x="161" y="66" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">単方向</text>
          <text x="161" y="77" text-anchor="middle" font-size="7" font-weight="700" fill="#fed7aa">切替コイル</text>
          <!-- Pivoting locking lever -->
          <path d="M36,96 L96,96 L96,58 L112,58 L112,110 L36,110 Z" fill="#94a3b8" stroke="#334155"/>
          <circle cx="104" cy="103" r="4.5" fill="#eab308" stroke="#334155"/>
          <rect x="112" y="58" width="12" height="18" fill="#2563eb"/>
          <text x="118" y="54" text-anchor="middle" font-size="6.2" fill="#1d4ed8" font-weight="700">PM</text>
          <circle cx="44" cy="84" r="7" fill="#ef4444"/>
          <text x="44" y="86.5" text-anchor="middle" font-size="6.5" fill="#fff" font-weight="700">爪</text>
          <text x="90" y="132" text-anchor="middle" font-size="6.7" fill="#334155">係止部材（ロック／解除）</text>
          <!-- Right table -->
          <rect x="210" y="32" width="136" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="278" y="46" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">US20160109782A1</text>
          ${pill(278, 66, 120, 18, '通電 OFF → 吸着ロック (NO)', '#fef3c7', '#d97706', '#92400e', 6.6)}
          ${pill(278, 92, 120, 18, '単極 ON → 反発解除 (NC)', '#dbeafe', '#2563eb', '#1d4ed8', 6.6)}
          <text x="278" y="119" text-anchor="middle" font-size="6.6" fill="#059669" font-weight="700">双方向Hブリッジ不要</text>
          <text x="278" y="131" text-anchor="middle" font-size="6.5" fill="#475569">小型・低コスト・待機0mW</text>
        `,
        caption: '単方向通電ON/OFFだけで常時開放(NO)と常時閉鎖(NC)を切り替える省電力ラッチ機構',
      });

    case 'shutter_set_spring':
      return shutterFrame({
        code: 'SH91',
        title: '先幕リセット用セットばね＆偏心アンカーピン',
        viewTag: '張力調整',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Torsion spring + eccentric anchor diagram -->
          <rect x="16" y="32" width="176" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <circle cx="72" cy="86" r="24" fill="none" stroke="#d97706" stroke-width="4.5" stroke-dasharray="14 3"/>
          <circle cx="72" cy="86" r="11" fill="#e2e8f0" stroke="#475569"/>
          <!-- Spring legs -->
          <line x1="72" y1="62" x2="148" y2="62" stroke="#d97706" stroke-width="2.6"/>
          <line x1="72" y1="110" x2="128" y2="124" stroke="#d97706" stroke-width="2.6"/>
          <!-- Eccentric pin -->
          <circle cx="152" cy="66" r="14" fill="#fef08a" stroke="#a16207" stroke-width="1.5"/>
          <circle cx="157" cy="61" r="5" fill="#475569"/>
          <text x="152" y="92" text-anchor="middle" font-size="6.7" font-weight="700" fill="#92400e">偏心調整ピン</text>
          <text x="72" y="132" text-anchor="middle" font-size="6.7" fill="#334155">セットばね (閉鎖付勢)</text>
          <!-- Right timing benefit -->
          <rect x="200" y="32" width="146" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="273" y="47" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">レリーズラグ短縮調整</text>
          <text x="273" y="65" text-anchor="middle" font-size="6.8" fill="#334155">偏心角 Δθ_ecc で</text>
          <text x="273" y="77" text-anchor="middle" font-size="7.2" font-weight="700" fill="#b45309">τ = k · (θ₀ + Δθ_ecc)</text>
          <text x="273" y="94" text-anchor="middle" font-size="6.7" fill="#334155">ライブビュー全開 → 事前閉鎖</text>
          ${pill(273, 118, 128, 18, '個体差ゼロ・最短閉鎖リセット', '#fef3c7', '#d97706', '#92400e', 6.6)}
        `,
        caption: 'ライブビュー全開の先幕を一瞬で閉鎖位置へ戻し、偏心アンカーピンで初期トルクを微調整',
      });

    case 'shutter_detent_yoke':
      return shutterFrame({
        code: 'SH92',
        title: '無通電保持用「円筒補助ヨーク（ディテント）」',
        viewTag: '磁気回路',
        accent: '#4f46e5',
        headerBg: '#eef2ff',
        body: `
          <!-- Left: Detent yoke geometry -->
          <rect x="16" y="32" width="160" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <circle cx="96" cy="86" r="38" fill="none" stroke="#475569" stroke-width="8"/>
          <!-- Opposing detent projections 43b, 43c -->
          <rect x="64" y="62" width="10" height="10" transform="rotate(-35 69 67)" fill="#475569"/>
          <rect x="118" y="100" width="10" height="10" transform="rotate(-35 123 105)" fill="#475569"/>
          <!-- PM Rotor -->
          <path d="M96,64 A22,22 0 0,1 96,108 Z" fill="#2563eb"/>
          <path d="M96,64 A22,22 0 0,0 96,108 Z" fill="#ef4444"/>
          <text x="106" y="89" font-size="8" font-weight="800" fill="#fff">N</text>
          <text x="80" y="89" font-size="8" font-weight="800" fill="#fff">S</text>
          <text x="96" y="137" text-anchor="middle" font-size="6.7" fill="#334155">補助ヨーク43＆突起43b/c</text>
          <!-- Right: Bistable potential energy well -->
          <rect x="184" y="32" width="162" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="265" y="46" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">双安定磁気ポテンシャル (JP2006-101649A)</text>
          <line x1="196" y1="108" x2="334" y2="108" stroke="#94a3b8"/>
          <path d="M202,68 Q228,118 265,68 Q302,118 328,68" fill="none" stroke="#4f46e5" stroke-width="2.2"/>
          <circle cx="228" cy="93" r="4" fill="#059669"/>
          <circle cx="302" cy="93" r="4" fill="#dc2626"/>
          <text x="228" y="120" text-anchor="middle" font-size="6.8" font-weight="700" fill="#059669">全開安定</text>
          <text x="302" y="120" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">全閉安定</text>
          ${pill(265, 134, 134, 13, '電池抜去後も 0 mW で確実閉鎖', '#eef2ff', '#4f46e5', '#3730a3', 6.5)}
        `,
        caption: '円筒補助ヨークの突起が磁気エネルギーの谷を作り、無通電 0 mW でも全開・全閉を安定保持',
      });

    case 'shutter_escape_lever':
      return shutterFrame({
        code: 'SH93',
        title: 'アクチュエータ保持枠「逃げ孔貫通セクタ」',
        viewTag: '薄型設計',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Top: Stacked thick (NG) -->
          <rect x="16" y="30" width="328" height="48" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="24" y="42" font-size="7" font-weight="700" fill="#b91c1c">× 従来段積み：Z厚増大 ＋ 片持ち曲げモーメント M = F·Δz 大</text>
          <rect x="34" y="54" width="120" height="14" fill="#475569"/>
          <rect x="154" y="48" width="90" height="8" fill="#2563eb"/>
          <rect x="148" y="45" width="8" height="28" fill="#94a3b8"/>
          <text x="295" y="61" text-anchor="middle" font-size="7" fill="#dc2626" font-weight="700">厚い・軸が傾く</text>
          <!-- Bottom: Escape hole nested (OK) -->
          <rect x="16" y="84" width="328" height="60" rx="5" fill="#f0fdf4" stroke="#86efac"/>
          <text x="24" y="96" font-size="7" font-weight="700" fill="#15803d">○ US20130322866A1 逃げ孔貫通ネスト構造（厚み 0.5mm 削減・曲げ半減）</text>
          <rect x="34" y="106" width="106" height="20" fill="#475569"/>
          <rect x="140" y="112" width="100" height="8" fill="#0284c7"/>
          <rect x="140" y="103" width="24" height="6" fill="#475569"/>
          <rect x="140" y="123" width="24" height="6" fill="#475569"/>
          <rect x="134" y="103" width="8" height="26" fill="#94a3b8"/>
          ${pill(292, 118, 92, 18, 'Δz 半減・薄型高剛性', '#dcfce7', '#16a34a', '#166534', 6.8)}
        `,
        caption: '保持枠に扇形の逃げ孔を開けて駆動レバーを面一貫通させ、薄型化と支軸曲げ低減を同時達成',
      });

    case 'shutter_asym_cam':
      return shutterFrame({
        code: 'SH94',
        title: '非対称傾斜角チャージカム（先幕＜後幕）',
        viewTag: 'カム曲線',
        accent: '#e11d48',
        headerBg: '#fff1f2',
        body: `
          <!-- Cam lift profile graph vs rotation angle -->
          <rect x="16" y="30" width="218" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <line x1="34" y1="126" x2="222" y2="126" stroke="#94a3b8"/>
          <line x1="34" y1="42" x2="34" y2="126" stroke="#94a3b8"/>
          <!-- Leading cam: steep narrow drop -->
          <path d="M36,124 L132,52 L152,124 L218,124" fill="none" stroke="#e11d48" stroke-width="2.2"/>
          <!-- Trailing cam: gentler wider drop -->
          <path d="M36,124 L132,58 L194,124 L218,124" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-dasharray="4 2"/>
          <text x="84" y="72" font-size="6.8" fill="#475569">チャージ昇り</text>
          <text x="145" y="49" font-size="6.8" font-weight="700" fill="#e11d48">先幕 θ₁ (狭)</text>
          <text x="182" y="84" font-size="6.8" font-weight="700" fill="#2563eb">後幕 θ₂ (広)</text>
          <text x="130" y="138" text-anchor="middle" font-size="6.8" fill="#475569">カム回転角 θ (0° → 360°)</text>
          <!-- Right card -->
          <rect x="242" y="30" width="104" height="114" rx="5" fill="#fff1f2" stroke="#fda4af"/>
          <text x="294" y="46" text-anchor="middle" font-size="7.2" font-weight="700" fill="#9f1239">US20110103787A1</text>
          <text x="294" y="66" text-anchor="middle" font-size="7.2" font-weight="800" fill="#e11d48">θ₁ &lt; θ₂</text>
          <text x="294" y="84" text-anchor="middle" font-size="6.6" fill="#334155">先幕：急降下で</text>
          <text x="294" y="94" text-anchor="middle" font-size="6.6" fill="#334155">レリーズラグ最小化</text>
          <text x="294" y="112" text-anchor="middle" font-size="6.6" fill="#1d4ed8">後幕：緩降下で</text>
          <text x="294" y="122" text-anchor="middle" font-size="6.6" fill="#1d4ed8">鉄片着地衝撃低減</text>
        `,
        caption: '先幕カム傾斜角を後幕より狭く設計し、省電力・最短レリーズラグ・ソフト着地を三立',
      });

    case 'shutter_slip_clutch':
      return shutterFrame({
        code: 'SH95',
        title: 'チャージギア列 過負荷スリップクラッチ',
        viewTag: '安全機構',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Clutch stack cross section -->
          <rect x="16" y="32" width="184" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="30" y="82" width="154" height="10" fill="#64748b"/>
          <rect x="44" y="54" width="18" height="66" rx="2" fill="#e2e8f0" stroke="#475569"/>
          <rect x="66" y="60" width="8" height="54" fill="#334155"/>
          <rect x="78" y="58" width="14" height="58" rx="2" fill="#94a3b8" stroke="#334155"/>
          <!-- Wave spring -->
          <path d="M98,62 Q106,74 98,87 Q106,100 98,112" fill="none" stroke="#d97706" stroke-width="2.6"/>
          <rect x="118" y="68" width="24" height="38" rx="2" fill="#eab308" stroke="#a16207"/>
          <text x="53" y="48" text-anchor="middle" font-size="6.4" fill="#334155">入力ギア</text>
          <text x="72" y="128" text-anchor="middle" font-size="6.4" fill="#0f172a">摩擦板</text>
          <text x="102" y="48" text-anchor="middle" font-size="6.4" fill="#b45309">波ばね</text>
          <text x="130" y="122" text-anchor="middle" font-size="6.4" fill="#92400e">出力軸</text>
          <!-- Torque window bar -->
          <rect x="208" y="32" width="138" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="277" y="47" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">トルク制限ウィンドウ</text>
          <rect x="220" y="58" width="114" height="18" rx="3" fill="#dcfce7" stroke="#16a34a"/>
          <text x="277" y="70" text-anchor="middle" font-size="6.6" font-weight="700" fill="#166534">通常チャージ T_charge（直結）</text>
          <rect x="220" y="82" width="114" height="18" rx="3" fill="#fef3c7" stroke="#d97706"/>
          <text x="277" y="94" text-anchor="middle" font-size="6.6" font-weight="700" fill="#92400e">スリップ開始 T_slip = μFR</text>
          <rect x="220" y="106" width="114" height="18" rx="3" fill="#fee2e2" stroke="#dc2626"/>
          <text x="277" y="118" text-anchor="middle" font-size="6.6" font-weight="700" fill="#991b1b">歯車破損領域（到達前に逃がす）</text>
        `,
        caption: '波ワッシャ予圧のフリクション板が異常ロック時だけ空回りし、ギア歯欠けとモータ焼損を防止',
      });

    default:
      return null;
  }
}
