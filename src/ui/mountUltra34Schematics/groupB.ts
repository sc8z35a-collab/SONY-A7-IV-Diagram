import { PartExplanation } from '../../assemblies/types';
import { mountHdFrame, pill } from './shared';

/**
 * Phase 34B — 20 Bespoke Ultra-HD Technical Schematics (M81–M100).
 */
export function renderMountUltra34SchematicGroupB(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // M81: 100 μF Low-ESR MLCC Bank & Schottky Flyback Clamp
    case 'mount_mlcc_flyback_bank':
      return mountHdFrame({
        code: 'M81',
        title: '100 μF低ESR MLCC＆ショットキークランプ',
        viewTag: 'サージ吸収',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Left: Inductive Kickback vs Clamped Waveform -->
          <rect x="18" y="36" width="166" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <line x1="30" y1="96" x2="174" y2="96" stroke="#94a3b8"/>
          <line x1="30" y1="48" x2="30" y2="128" stroke="#94a3b8"/>
          <!-- Unclamped spike (dashed red) -->
          <path d="M32 82 L68 82 L76 48 L84 124 L94 74 L106 90 L170 82" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 2"/>
          <!-- Clamped smooth rail (solid green) -->
          <path d="M32 82 L68 82 Q78 76 92 84 Q112 81 170 82" fill="none" stroke="#16a34a" stroke-width="2.4"/>
          <text x="116" y="56" font-size="6.4" font-weight="700" fill="#dc2626">無対策: L(di/dt)サージ</text>
          <text x="112" y="114" font-size="6.6" font-weight="700" fill="#15803d">対策後: ΔV &lt; 40 mV</text>

          <!-- Right: Parallel MLCC + Schottky Circuit -->
          <rect x="196" y="36" width="148" height="104" rx="5" fill="#fefce8" stroke="#fde047"/>
          <text x="270" y="51" text-anchor="middle" font-size="7.2" font-weight="700" fill="#854d0e">Pin 2 直下 2oz厚銅バス</text>
          ${[214, 240, 266]
            .map(
              (x) =>
                `<rect x="${x}" y="66" width="14" height="24" rx="2" fill="#d97706" stroke="#78350f"/><text x="${x + 7}" y="80" text-anchor="middle" font-size="5.6" font-weight="700" fill="#fff">C</text>`
            )
            .join('')}
          <rect x="294" y="64" width="36" height="28" rx="3" fill="#1e293b"/>
          <text x="312" y="80" text-anchor="middle" font-size="6.2" font-weight="700" fill="#fde047">SBD</text>
          <line x1="208" y1="60" x2="334" y2="60" stroke="#dc2626" stroke-width="2"/>
          <line x1="208" y1="98" x2="334" y2="98" stroke="#0f172a" stroke-width="2"/>
          <text x="270" y="116" text-anchor="middle" font-size="6.7" fill="#1e293b">6× X6S MLCC + タンタル &gt;100μF</text>
          <text x="270" y="129" text-anchor="middle" font-size="6.6" font-weight="700" fill="#a16207">4基XDモーター逆起電力クランプ</text>
        `,
        caption: '接点根元の低ESR MLCC並列バンクとショットキークランプで120fpsモーター急反転ノイズを吸収',
      });

    // M82: Radial Centering Pilot Spigot Bore (H7/g6 ±4 μm)
    case 'mount_pilot_spigot_bore':
      return mountHdFrame({
        code: 'M82',
        title: 'パイロット・スピゴット内径基準壁 (H7/g6)',
        viewTag: '同心度管理',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Cross section of flange face + corner relief + H7/g6 bore -->
          <rect x="20" y="36" width="184" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Body mount wall (lower) -->
          <path d="M36 96 L112 96 L112 104 L122 104 L122 96 L186 96 L186 128 L36 128 Z" fill="#64748b" stroke="#1e293b"/>
          <!-- Lens spigot mating (upper) -->
          <path d="M36 52 L116 52 L116 92 L180 92 L180 62 L116 52 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.3"/>
          <!-- 30 deg entry chamfer -->
          <path d="M180 92 L186 84" stroke="#0284c7" stroke-width="1.8"/>
          <!-- Undercut relief callout -->
          <circle cx="117" cy="100" r="7" fill="none" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="2 1"/>
          <text x="78" y="47" font-size="6.6" font-weight="700" fill="#0369a1">レンズ側スピゴット (g6)</text>
          <text x="150" y="116" text-anchor="middle" font-size="6.6" font-weight="700" fill="#fff">ボディ内径 (H7)</text>
          <text x="68" y="116" text-anchor="middle" font-size="6.4" font-weight="700" fill="#fde68a">逃げ溝 (R干渉防止)</text>
          <text x="152" y="74" text-anchor="middle" font-size="6.5" font-weight="700" fill="#1d4ed8">隙間 ±4–6 μm</text>

          <!-- Right: Concentricity impact -->
          <rect x="216" y="36" width="128" height="104" rx="5" fill="#f0f9ff" stroke="#7dd3fc"/>
          <circle cx="280" cy="76" r="24" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
          <line x1="252" y1="76" x2="308" y2="76" stroke="#94a3b8" stroke-dasharray="2 2"/>
          <line x1="280" y1="48" x2="280" y2="104" stroke="#94a3b8" stroke-dasharray="2 2"/>
          <circle cx="280" cy="76" r="3" fill="#dc2626"/>
          <text x="280" y="114" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">X/Y 光軸偏心 &lt; 5 μm</text>
          <text x="280" y="128" text-anchor="middle" font-size="6.4" fill="#475569">3点ラップ座で真円度2μm</text>
        `,
        caption: 'H7/g6精密円筒内径とコーナー逃げ溝により、F1.2大口径でも光軸X/Y偏心を5μm以下に拘束',
      });

    // M83: Asymmetric Bayonet Lug Keying & 2.2° Helical Wedge
    case 'mount_asymmetric_lug_keying':
      return mountHdFrame({
        code: 'M83',
        title: '非対称バヨネット爪キーイング＆2.2°楔傾斜',
        viewTag: 'ポカヨケ',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Left: Polar diagram showing 52° / 46° / 42° unequal lugs -->
          <circle cx="96" cy="88" r="46" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
          <circle cx="96" cy="88" r="32" fill="#ffffff" stroke="#94a3b8"/>
          <!-- 3 Unequal Arcs -->
          <path d="M138 72 A44 44 0 0 1 132 114" fill="none" stroke="#dc2626" stroke-width="9"/>
          <path d="M68 48 A44 44 0 0 1 106 44" fill="none" stroke="#2563eb" stroke-width="9"/>
          <path d="M56 106 A44 44 0 0 1 78 130" fill="none" stroke="#059669" stroke-width="9"/>
          <text x="148" y="96" font-size="7" font-weight="700" fill="#b91c1c">52°</text>
          <text x="88" y="38" text-anchor="middle" font-size="7" font-weight="700" fill="#1d4ed8">46°</text>
          <text x="50" y="132" text-anchor="middle" font-size="7" font-weight="700" fill="#047857">42°</text>
          <text x="96" y="91" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">1方向限定</text>

          <!-- Right: 2.2° Helical Wedge Clamping Ramp -->
          <rect x="172" y="36" width="172" height="104" rx="6" fill="#fffbeb" stroke="#fcd34d"/>
          <text x="258" y="52" text-anchor="middle" font-size="7.4" font-weight="700" fill="#92400e">60°回転 ヘリカル楔クランプ</text>
          <polygon points="188,100 326,100 326,76 188,92" fill="#d97706" opacity="0.3" stroke="#b45309" stroke-width="1.3"/>
          <rect x="242" y="64" width="38" height="14" rx="2" fill="#475569"/>
          <line x1="220" y1="71" x2="238" y2="71" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-M83-red)"/>
          <line x1="261" y1="80" x2="261" y2="96" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-M83-blue)"/>
          <text x="206" y="73" font-size="6.5" font-weight="700" fill="#b91c1c">回転</text>
          <text x="304" y="91" text-anchor="middle" font-size="6.6" font-weight="700" fill="#92400e">α ≈ 2.2°</text>
          <text x="258" y="118" text-anchor="middle" font-size="6.8" fill="#1e293b">F_axial = T / (r · tan(α + ρ))</text>
          <text x="258" y="131" text-anchor="middle" font-size="6.5" fill="#78350f">暗所誤挿入・接点逆ショートを物理防止</text>
        `,
        caption: '不等幅3爪で単一装着角を強制し、2.2°ヘリカル楔傾斜で軽い回転力から強固な軸力を発生',
      });

    // M84: Lock-Pin Self-Retracting 35° Lead-Ramp & D-Flat Keyway
    case 'mount_lockpin_ramp_dflat':
      return mountHdFrame({
        code: 'M84',
        title: 'ロックピン 35°自動退避ランプ＆Dカット回り止め',
        viewTag: 'ラチェット',
        accent: '#475569',
        headerBg: '#f8fafc',
        body: `
          <!-- Left: Asymmetric 35° ramp vs 90° lock edge -->
          <rect x="18" y="36" width="184" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Lens bayonet moving left-to-right -->
          <rect x="30" y="48" width="54" height="16" rx="2" fill="#0284c7" opacity="0.25" stroke="#0284c7"/>
          <line x1="34" y1="56" x2="78" y2="56" stroke="#0284c7" stroke-width="1.8" marker-end="url(#a-M84-cyan)"/>
          <text x="57" y="44" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1">装着回転 (自動退避)</text>
          <!-- Pin tip profile: 35° bevel on left, 90° wall on right -->
          <polygon points="88,82 114,62 126,62 126,124 88,124" fill="#64748b" stroke="#0f172a" stroke-width="1.3"/>
          <line x1="107" y1="88" x2="107" y2="114" stroke="#16a34a" stroke-width="1.8" marker-end="url(#a-M84-green)"/>
          <text x="72" y="76" font-size="6.8" font-weight="700" fill="#15803d">35°斜面</text>
          <!-- Reverse lock blocked -->
          <line x1="168" y1="70" x2="132" y2="70" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-M84-red)"/>
          <text x="164" y="62" text-anchor="middle" font-size="6.5" font-weight="700" fill="#b91c1c">90°垂直壁</text>
          <text x="164" y="84" text-anchor="middle" font-size="6.4" fill="#b91c1c">逆転ロック!</text>

          <!-- Right: D-Flat Cross Section -->
          <rect x="214" y="36" width="130" height="104" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
          <text x="279" y="51" text-anchor="middle" font-size="7.2" font-weight="700" fill="#92400e">Dカット回り止め断面</text>
          <!-- Bronze guide plate -->
          <rect x="242" y="60" width="74" height="52" rx="8" fill="#d97706" opacity="0.28" stroke="#b45309"/>
          <!-- D-flat pin cross section -->
          <path d="M270 70 A16 16 0 1 1 270 102 Z" fill="#475569" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="270" y1="68" x2="270" y2="104" stroke="#dc2626" stroke-width="2"/>
          <text x="279" y="128" text-anchor="middle" font-size="6.5" font-weight="700" fill="#78350f">斜面の向きを永久固定</text>
        `,
        caption: '装着側は35°斜面でボタン無操作退避、脱落側は90°垂直壁で完全ロック（Dカット回り止め付）',
      });

    // M85: Sacrificial Breakaway Shear-Neck Fasteners
    case 'mount_breakaway_shear_bolts':
      return mountHdFrame({
        code: 'M85',
        title: '制御破断シャーネックボルト＆落下保護ヒューズ',
        viewTag: '安全工学',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- Bolt cross-section with V-notch shear waist -->
          <rect x="18" y="36" width="154" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="44" y="46" width="52" height="16" rx="3" fill="#475569"/>
          <path d="M56 62 L84 62 L84 74 L76 80 L76 90 L84 96 L84 126 L56 126 L56 96 L64 90 L64 80 L56 74 Z" fill="#94a3b8" stroke="#1e293b"/>
          <line x1="46" y1="85" x2="94" y2="85" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2"/>
          <text x="132" y="76" text-anchor="middle" font-size="6.8" font-weight="700" fill="#b91c1c">縮径ヒューズ</text>
          <text x="132" y="88" text-anchor="middle" font-size="6.5" fill="#dc2626">断面積 58%</text>
          <text x="132" y="114" text-anchor="middle" font-size="6.4" fill="#475569">Mg筐体側ねじ</text>

          <!-- Strength Hierarchy Bar Chart -->
          <rect x="184" y="36" width="160" height="104" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="264" y="51" text-anchor="middle" font-size="7.4" font-weight="700" fill="#991b1b">構造強度ヒエラルキー設計</text>
          <text x="194" y="68" font-size="6.4" fill="#166534">通常最大荷重 (SF &gt; 5)</text>
          <rect x="194" y="72" width="38" height="9" rx="2" fill="#16a34a"/>
          <text x="194" y="94" font-size="6.5" font-weight="700" fill="#dc2626">① ボルト先行破断 (75%)</text>
          <rect x="194" y="98" width="96" height="10" rx="2" fill="#dc2626"/>
          <text x="194" y="120" font-size="6.5" font-weight="700" fill="#334155">② Mg主骨格破壊限界 (100%)</text>
          <rect x="194" y="124" width="134" height="10" rx="2" fill="#334155"/>
        `,
        caption: '極限落下時に縮径シャーネックが先行破断し、高価なMg骨格とセンサーを致命破損から救う',
      });

    // M86: Hydrophobic Microporous ePTFE Breather Vent
    case 'mount_eptfe_breather_vent':
      return mountHdFrame({
        code: 'M86',
        title: '撥水微多孔 ePTFE 気圧平衡ブリーザーベント',
        viewTag: '微多孔膜',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Outside (Rain + Air) vs ePTFE Membrane vs Inside Mount Chamber -->
          <rect x="18" y="36" width="114" height="104" rx="5" fill="#e0f2fe" stroke="#7dd3fc"/>
          <text x="75" y="50" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0369a1">外気（雨滴・砂塵）</text>
          <!-- Large water droplet >50μm blocked -->
          <circle cx="96" cy="76" r="14" fill="#0284c7" opacity="0.65" stroke="#0369a1"/>
          <text x="96" y="78.5" text-anchor="middle" font-size="6.3" font-weight="700" fill="#fff">&gt;50μm</text>
          <path d="M112 76 L132 76" stroke="#dc2626" stroke-width="1.8"/>
          <text x="60" y="78" text-anchor="middle" font-size="6.4" font-weight="700" fill="#b91c1c">撥水遮断!</text>

          <!-- Microporous ePTFE Membrane -->
          <rect x="142" y="36" width="28" height="104" rx="3" fill="#ffffff" stroke="#0284c7" stroke-width="1.6"/>
          <path d="M146 46 L166 56 M146 66 L166 58 M146 84 L166 96 M146 106 L166 116 M146 124 L166 112" stroke="#94a3b8" stroke-width="1.2"/>
          <text x="156" y="135" text-anchor="middle" font-size="6" font-weight="700" fill="#0369a1">0.2μm</text>

          <!-- Gas / Water vapor molecules passing freely -->
          <line x1="64" y1="112" x2="220" y2="112" stroke="#16a34a" stroke-width="2" stroke-dasharray="4 2" marker-start="url(#a-M86-green)" marker-end="url(#a-M86-green)"/>
          <text x="75" y="126" text-anchor="middle" font-size="6.5" font-weight="700" fill="#15803d">空気・水蒸気透過</text>

          <!-- Mount Chamber -->
          <rect x="180" y="36" width="164" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="262" y="54" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0f172a">マウント室内（ΔP = 0 平衡）</text>
          ${pill(262, 74, 142, 17, '耐水圧 > 120 kPa (θ ≈ 125°)', '#ffffff', '#0284c7', '#0369a1', 6.8)}
          <text x="192" y="102" font-size="6.8" fill="#1e293b">• ズーム伸縮の空気ポンプ吸収</text>
          <text x="192" y="126" font-size="6.8" fill="#1e293b">• 高山・航空機移動時の結露防止</text>
        `,
        caption: '孔径0.2μmの撥水ePTFE膜で雨滴を完全遮断しつつ、ズーム呼吸と高山気圧差を即時平衡化',
      });

    // M87: Dedicated Power-Off Protective Sensor Dust Curtain
    case 'mount_protective_dust_curtain':
      return mountHdFrame({
        code: 'M87',
        title: 'レンズ交換時自動閉鎖・専用防塵保護シールド幕',
        viewTag: '防塵保護',
        accent: '#334155',
        headerBg: '#f8fafc',
        body: `
          <!-- Left: Power OFF (Closed + 0mW Latch) -->
          <rect x="18" y="36" width="152" height="104" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="94" y="50" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">電源OFF：自動閉鎖（0 mW保持）</text>
          <rect x="34" y="58" width="96" height="18" fill="#334155" stroke="#0f172a"/>
          <rect x="34" y="77" width="96" height="18" fill="#475569" stroke="#0f172a"/>
          <rect x="34" y="96" width="96" height="18" fill="#334155" stroke="#0f172a"/>
          <rect x="136" y="64" width="22" height="44" rx="3" fill="#d97706"/>
          <text x="147" y="88" text-anchor="middle" font-size="6" font-weight="700" fill="#fff">磁石</text>
          <text x="94" y="130" text-anchor="middle" font-size="6.6" fill="#334155">高剛性3枚羽根（露出幕の6倍剛性）</text>

          <!-- Right: Power ON (Retracted + Ready) -->
          <rect x="186" y="36" width="156" height="104" rx="5" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="264" y="50" text-anchor="middle" font-size="7.2" font-weight="700" fill="#1d4ed8">電源ON：高速退避（撮像全開）</text>
          <rect x="206" y="56" width="116" height="12" rx="2" fill="#334155"/>
          <rect x="206" y="72" width="116" height="42" rx="3" fill="#dbeafe" stroke="#2563eb" stroke-dasharray="3 2"/>
          <text x="264" y="96" text-anchor="middle" font-size="7.4" font-weight="700" fill="#1e40af">36×24 mm 開放光路</text>
          <text x="264" y="130" text-anchor="middle" font-size="6.6" fill="#1e3a8a">Z9 / α9 III型 露出シャッター独立保護</text>
        `,
        caption: '露出幕と独立した高剛性保護羽根と無電力ラッチソレノイドでレンズ交換時のゴミ付着を激減',
      });

    // M88: Cryo-Stabilized (-196°C) Rim & 2D DataMatrix Metrology
    case 'mount_cryo_datamatrix_metrology':
      return mountHdFrame({
        code: 'M88',
        title: '深冷処理(−196℃)安定化＆2D DataMatrix管理',
        viewTag: '冶金計測',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- Left: Retained Austenite -> Martensite Cryo Transformation -->
          <rect x="18" y="36" width="178" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="107" y="50" text-anchor="middle" font-size="7.2" font-weight="700" fill="#155e75">−196℃ 液体窒素サブゼロ安定化</text>
          <line x1="34" y1="118" x2="184" y2="118" stroke="#94a3b8"/>
          <line x1="34" y1="60" x2="34" y2="118" stroke="#94a3b8"/>
          <!-- Normal steel creep -->
          <path d="M36 112 Q100 94 180 72" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="140" y="72" font-size="6.2" font-weight="700" fill="#dc2626">未処理(数μm膨張)</text>
          <!-- Cryo steel flat line -->
          <path d="M36 112 L180 110" fill="none" stroke="#0891b2" stroke-width="2.4"/>
          <text x="128" y="105" font-size="6.5" font-weight="700" fill="#0e7490">深冷処理 &lt; 0.5μm/10年</text>
          <text x="107" y="132" text-anchor="middle" font-size="6.4" fill="#475569">経年時間 (0 → 10年) →</text>

          <!-- Right: 2D DataMatrix & QR_Code_Reader Factory Flow -->
          <rect x="208" y="36" width="136" height="104" rx="5" fill="#ecfeff" stroke="#67e8f9"/>
          <text x="276" y="51" text-anchor="middle" font-size="7.2" font-weight="700" fill="#155e75">個体2D DataMatrix連携</text>
          <rect x="252" y="58" width="48" height="48" rx="3" fill="#0f172a"/>
          <!-- Stylized DataMatrix modules -->
          ${[
            [0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[0,2],[0,3],[0,4],[2,1],[4,1],[1,2],[3,2],[2,3],[4,3],[1,4],[3,4]
          ]
            .map(([c, r]) => `<rect x="${258 + c * 7.2}" y="${64 + r * 7.2}" width="5.8" height="5.8" fill="#f8fafc"/>`)
            .join('')}
          <text x="276" y="120" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0e7490">QR_Code_Reader 自動読取</text>
          <text x="276" y="132" text-anchor="middle" font-size="6.3" fill="#475569">干渉計実測厚み→シム自動選別</text>
        `,
        caption: '−196℃深冷変態で10年寸法変動を0.5μm未満へ凍結し、2Dレーザー刻印で工場校正値を個体管理',
      });

    // M89: Contact-Block Side Stray-Light Labyrinth & Rear-Element Guard
    case 'mount_contact_stray_labyrinth':
      return mountHdFrame({
        code: 'M89',
        title: '接点両翼 迷光遮断ラビリンス＆後玉衝突ガード',
        viewTag: '光学防護',
        accent: '#18181b',
        headerBg: '#f8fafc',
        body: `
          <!-- Left: Contact block flanked by labyrinth wings -->
          <rect x="18" y="36" width="166" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="64" y="96" width="74" height="24" rx="3" fill="#334155"/>
          <text x="101" y="111" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fde047">12ピン接点アーク</text>
          <!-- Twin labyrinth wings -->
          <polygon points="34,70 62,70 62,120 46,120 46,84 34,84" fill="#0f172a"/>
          <polygon points="168,70 140,70 140,120 156,120 156,84 168,84" fill="#0f172a"/>
          <!-- Oblique stray light extinguished -->
          <line x1="28" y1="46" x2="52" y2="76" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-M89-red)"/>
          <line x1="174" y1="46" x2="150" y2="76" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-M89-red)"/>
          <text x="101" y="54" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">斜め逆光を両翼植毛壁で吸収</text>
          <text x="101" y="84" text-anchor="middle" font-size="6.5" fill="#0f172a">反射率 R &lt; 0.25%</text>

          <!-- Right: Rear Element Protrusion Stop Guard -->
          <rect x="196" y="36" width="148" height="104" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="270" y="51" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">深突出後玉〜シャッター防護</text>
          <path d="M214 66 Q244 66 254 90 Q244 114 214 114 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
          <text x="230" y="93" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1">後玉</text>
          <!-- Guard lip -->
          <rect x="264" y="64" width="12" height="54" rx="2" fill="#dc2626"/>
          <!-- Shutter plane safely behind -->
          <rect x="300" y="58" width="8" height="66" rx="1" fill="#1e293b"/>
          <line x1="278" y1="90" x2="298" y2="90" stroke="#16a34a" stroke-width="1.4" marker-start="url(#a-M89-green)" marker-end="url(#a-M89-green)"/>
          <text x="288" y="132" text-anchor="middle" font-size="6.4" font-weight="700" fill="#15803d">安全隙間 1.8mm 確保</text>
        `,
        caption: '接点脇の斜めゴーストを植毛ラビリンスで遮断しつつ、深突出後玉からシャッター幕を物理保護',
      });

    // M90: 3-Zone 1/3-Arc Cinema Tilt Calibration Shims
    case 'mount_cinema_arc_tilt_shims':
      return mountHdFrame({
        code: 'M90',
        title: '3分割 120°アーチ型シネマチルト調整シム',
        viewTag: '片ボケ零化',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Left: 3 independent 120° color-coded arc shims -->
          <circle cx="96" cy="88" r="46" fill="#f8fafc" stroke="#e2e8f0"/>
          <path d="M98 44 A44 44 0 0 1 134 108" fill="none" stroke="#94a3b8" stroke-width="11"/>
          <path d="M132 112 A44 44 0 0 1 58 112" fill="none" stroke="#2563eb" stroke-width="11"/>
          <path d="M56 108 A44 44 0 0 1 92 44" fill="none" stroke="#eab308" stroke-width="11"/>
          <text x="142" y="66" font-size="6.5" font-weight="700" fill="#475569">A: 10μm</text>
          <text x="96" y="146" text-anchor="middle" font-size="6.5" font-weight="700" fill="#1d4ed8">C: 50μm</text>
          <text x="48" y="66" text-anchor="end" font-size="6.5" font-weight="700" fill="#a16207">B: 25μm</text>
          <text x="96" y="91" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a">3方位独立</text>

          <!-- Right: Tilt Zeroing Before/After -->
          <rect x="174" y="36" width="170" height="104" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
          <text x="259" y="51" text-anchor="middle" font-size="7.3" font-weight="700" fill="#1e3a8a">コリメータ X/Y 像面チルト補正</text>
          <!-- Tilted line (before) -->
          <line x1="194" y1="84" x2="324" y2="66" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="290" y="63" font-size="6.3" fill="#dc2626">補正前(片ボケ12μm)</text>
          <!-- Zeroed flat line (after) -->
          <line x1="194" y1="98" x2="324" y2="98" stroke="#16a34a" stroke-width="2.4"/>
          <text x="259" y="112" text-anchor="middle" font-size="6.8" font-weight="700" fill="#15803d">補正後：全面平坦度 &lt; 2 μm</text>
          <text x="259" y="128" text-anchor="middle" font-size="6.5" fill="#334155">VENICE 2 同梱 15× 1/3 Arc Shim 方式</text>
        `,
        caption: '120°三分割の極薄シム厚を方位別に変えることで、画面端の微小チルト（片ボケ）を完全零化',
      });

    // M91: Cinema Line Lever-Lock (Breech-Lock) Rotating Collar
    case 'mount_cine_lever_lock_collar':
      return mountHdFrame({
        code: 'M91',
        title: 'Cinema Line レバーロック（無回転ブリーチ）',
        viewTag: 'シネマ固定',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- Left: Straight Insertion (0° twist) + Collar Rotation -->
          <rect x="18" y="36" width="168" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="30" y="64" width="58" height="48" rx="4" fill="#334155"/>
          <text x="59" y="86" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fff">シネレンズ</text>
          <text x="59" y="98" text-anchor="middle" font-size="6.2" fill="#93c5fd">FIZギア付</text>
          <!-- Straight arrow 0 deg twist -->
          <line x1="92" y1="88" x2="122" y2="88" stroke="#2563eb" stroke-width="2.2" marker-end="url(#a-M91-blue)"/>
          <text x="107" y="80" text-anchor="middle" font-size="6.4" font-weight="700" fill="#1d4ed8">直挿し 0°</text>
          <!-- Rotating Breech Collar -->
          <rect x="128" y="52" width="22" height="72" rx="4" fill="#1e293b"/>
          <rect x="132" y="42" width="14" height="10" rx="2" fill="#dc2626"/>
          <path d="M164 64 A28 28 0 0 1 164 112" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#a-M91-red)"/>
          <text x="156" y="132" text-anchor="middle" font-size="6.4" font-weight="700" fill="#b91c1c">レバー締付</text>

          <!-- Right: Advantages over standard bayonet -->
          <rect x="198" y="36" width="146" height="104" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="271" y="52" text-anchor="middle" font-size="7.3" font-weight="700" fill="#991b1b">FS7 II / FX9 / BURANO 方式</text>
          ${pill(271, 72, 130, 17, '軸方向締付 > 120 N (3.5×)', '#ffffff', '#dc2626', '#b91c1c', 6.8)}
          <text x="208" y="98" font-size="6.7" fill="#1e293b">• レンズ無回転でロッド装着可</text>
          <text x="208" y="112" font-size="6.7" fill="#1e293b">• FIZ高トルク駆動でガタゼロ</text>
          <text x="208" y="126" font-size="6.7" fill="#1e293b">• 12時赤色二段階安全ラッチ</text>
        `,
        caption: 'レンズを回さず直挿しし、外周レバーリングで強力軸締付することでFIZリグ運用と無ガタを両立',
      });

    // M92: Breech-Lock Ball-Roller Cam Followers & Wave-Spring Brake
    case 'mount_breech_cam_rollers':
      return mountHdFrame({
        code: 'M92',
        title: 'ブリーチロック球面カムフォロワー＆波座金ブレーキ',
        viewTag: '転がりカム',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Cam ramp + rolling cylinder follower -->
          <rect x="18" y="36" width="184" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <polygon points="30,68 188,52 188,68" fill="#334155"/>
          <circle cx="108" cy="74" r="14" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5"/>
          <circle cx="108" cy="74" r="5" fill="#d97706"/>
          <line x1="68" y1="74" x2="90" y2="74" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-M92-blue)"/>
          <line x1="108" y1="90" x2="108" y2="112" stroke="#dc2626" stroke-width="2" marker-end="url(#a-M92-red)"/>
          <!-- Wave spring brake underneath -->
          <path d="M36 122 Q54 112 72 122 T108 122 T144 122 T180 122" fill="none" stroke="#d97706" stroke-width="2.4"/>
          <text x="150" y="92" font-size="6.5" font-weight="700" fill="#b91c1c">軸力 &gt;120N</text>
          <text x="108" y="136" text-anchor="middle" font-size="6.5" font-weight="700" fill="#92400e">6山 BeCu 波座金ブレーキ</text>

          <!-- Efficiency comparison -->
          <rect x="214" y="36" width="130" height="104" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
          <text x="279" y="52" text-anchor="middle" font-size="7.2" font-weight="700" fill="#92400e">転がりカム高効率変換</text>
          <text x="224" y="72" font-size="6.5" fill="#64748b">滑りカム (μ≈0.25)</text>
          <rect x="224" y="76" width="44" height="9" rx="2" fill="#94a3b8"/>
          <text x="224" y="100" font-size="6.6" font-weight="700" fill="#b45309">転がりカム (μ≈0.005)</text>
          <rect x="224" y="104" width="104" height="10" rx="2" fill="#d97706"/>
          <text x="279" y="129" text-anchor="middle" font-size="6.7" font-weight="700" fill="#78350f">変換効率 η &gt; 88%・無かじり</text>
        `,
        caption: '3点転がりカムローラーで軽い操作力から120N超の軸力を生み、波座金ブレーキで振動緩みを抑止',
      });

    // M93: In-Mount Electronic Variable Liquid-Crystal ND Filter (e-ND)
    case 'mount_electronic_variable_nd':
      return mountHdFrame({
        code: 'M93',
        title: 'マウント内蔵 電子式可変液晶ND (e-ND 2〜7段)',
        viewTag: '液晶光学',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Left: Low Voltage (ND 1/4 Clear-ish) -->
          <rect x="18" y="36" width="152" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="94" y="50" text-anchor="middle" font-size="7.1" font-weight="700" fill="#1e293b">低電圧 V_low → ND 1/4 (2段)</text>
          <rect x="34" y="60" width="120" height="44" rx="3" fill="#e9d5ff" opacity="0.45" stroke="#7c3aed"/>
          <!-- Horizontally aligned dichroic LC molecules -->
          ${[52, 74, 96, 118, 140]
            .map((x) => `<ellipse cx="${x}" cy="74" rx="7" ry="2.6" fill="#6d28d9"/><ellipse cx="${x}" cy="90" rx="7" ry="2.6" fill="#6d28d9"/>`)
            .join('')}
          <line x1="94" y1="106" x2="94" y2="132" stroke="#eab308" stroke-width="2.8" marker-end="url(#a-M93-amber)"/>
          <text x="130" y="124" font-size="6.6" font-weight="700" fill="#b45309">透過 25%</text>

          <!-- Right: High Voltage (ND 1/128 Dark) -->
          <rect x="186" y="36" width="156" height="104" rx="5" fill="#f5f3ff" stroke="#a78bfa"/>
          <text x="264" y="50" text-anchor="middle" font-size="7.1" font-weight="700" fill="#5b21b6">高電圧 V_high → ND 1/128 (7段)</text>
          <rect x="204" y="60" width="120" height="44" rx="3" fill="#3b0764" opacity="0.72" stroke="#5b21b6"/>
          <!-- Vertically rotated molecules absorbing light -->
          ${[222, 244, 266, 288, 310]
            .map((x) => `<ellipse cx="${x}" cy="82" rx="3" ry="12" fill="#e9d5ff"/>`)
            .join('')}
          <line x1="264" y1="106" x2="264" y2="132" stroke="#eab308" stroke-width="1" stroke-dasharray="2 2" marker-end="url(#a-M93-amber)"/>
          <text x="304" y="124" font-size="6.6" font-weight="700" fill="#5b21b6">透過 0.78%</text>
        `,
        caption: 'ITO電極の交流電圧でゲストホスト液晶分子を無段階配向し、F値・シャッター角不変で2〜7段調光',
      });

    // M94: OPL Focus-Shift Compensating Clear Glass Plate
    case 'mount_opl_compensator_glass':
      return mountHdFrame({
        code: 'M94',
        title: '光路長 Δd = t(1−1/n) 焦点シフト補償クリアガラス',
        viewTag: '幾何光学',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Optical ray shift diagram -->
          <rect x="18" y="34" width="324" height="108" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Converging rays without glass (dashed red -> focus shifts forward!) -->
          <line x1="34" y1="48" x2="254" y2="88" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3 2"/>
          <line x1="34" y1="128" x2="254" y2="88" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3 2"/>
          <circle cx="254" cy="88" r="3" fill="#dc2626"/>
          <text x="234" y="68" text-anchor="middle" font-size="6.4" fill="#dc2626">ガラス無し(ピンズレ!)</text>

          <!-- Matched OPL Clear Glass Plate -->
          <rect x="128" y="46" width="24" height="84" rx="2" fill="#bae6fd" opacity="0.72" stroke="#0284c7" stroke-width="1.6"/>
          <text x="140" y="42" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1">t=0.85mm (n=1.52)</text>

          <!-- Refracted rays hitting exact sensor plane -->
          <polyline points="34,48 128,65 152,68 286,88" fill="none" stroke="#0284c7" stroke-width="2"/>
          <polyline points="34,128 128,111 152,108 286,88" fill="none" stroke="#0284c7" stroke-width="2"/>
          <!-- Sensor plane -->
          <rect x="286" y="54" width="8" height="68" rx="1" fill="#16a34a"/>
          <circle cx="286" cy="88" r="3.4" fill="#16a34a"/>
          <line x1="254" y1="112" x2="286" y2="112" stroke="#0284c7" stroke-width="1.5" marker-start="url(#a-M94-cyan)" marker-end="url(#a-M94-cyan)"/>
          <text x="270" y="125" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">Δd = +0.29mm</text>
          <text x="316" y="88" text-anchor="middle" font-size="6.6" font-weight="700" fill="#15803d">撮像面</text>
          <text x="316" y="99" text-anchor="middle" font-size="6.2" fill="#15803d">一致!</text>
        `,
        caption: 'e-ND退避時に等価クリアガラスを挿入し、Δd=t(1-1/n)を一致させて無限遠ズレを零化',
      });

    // M95: PL-to-E Modular Adapter Base Ring
    case 'mount_pl_modular_adapter_ring':
      return mountHdFrame({
        code: 'M95',
        title: 'シネマ PL-to-E モジュラー換装ベースリング',
        viewTag: '規格橋渡し',
        accent: '#475569',
        headerBg: '#f8fafc',
        body: `
          <!-- Side elevation showing 18mm E vs 52mm PL = 34mm modular bridge -->
          <rect x="18" y="36" width="324" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Sensor plane -->
          <rect x="298" y="52" width="10" height="72" rx="2" fill="#0284c7"/>
          <text x="324" y="90" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">撮像面</text>
          <!-- E-mount native flange (18mm ahead) -->
          <rect x="216" y="50" width="14" height="76" rx="2" fill="#64748b"/>
          <text x="223" y="46" text-anchor="middle" font-size="6.5" font-weight="700" fill="#334155">E基準</text>
          <!-- Modular PL-to-E Base Ring (34mm bridge) -->
          <rect x="64" y="48" width="150" height="80" rx="4" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
          <rect x="64" y="64" width="150" height="48" fill="#ffffff" stroke="#93c5fd" stroke-dasharray="3 2"/>
          <text x="139" y="85" text-anchor="middle" font-size="7.6" font-weight="700" fill="#1e3a8a">PL-to-E モジュラー換装部</text>
          <text x="139" y="98" text-anchor="middle" font-size="6.6" fill="#1d4ed8">4× M3ボルト ＋ 12時基準キー</text>
          <!-- Dimensions -->
          <line x1="223" y1="133" x2="298" y2="133" stroke="#0284c7" stroke-width="1.4" marker-start="url(#a-M95-cyan)" marker-end="url(#a-M95-cyan)"/>
          <text x="260" y="130" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1">18.0 mm</text>
          <line x1="64" y1="133" x2="216" y2="133" stroke="#2563eb" stroke-width="1.4" marker-start="url(#a-M95-blue)" marker-end="url(#a-M95-blue)"/>
          <text x="140" y="130" text-anchor="middle" font-size="6.5" font-weight="700" fill="#1d4ed8">ΔZ = 34.0 mm（光学劣化ゼロ）</text>
        `,
        caption: 'E(18mm)とPL(52mm)の34mm差を活かし、4本ボルト＋12時キーで±3μm再現性の換装を実現',
      });

    // M96: Cinema Metadata Contact Pod (Cooke /i & ARRI LDS-2)
    case 'mount_cine_metadata_pod':
      return mountHdFrame({
        code: 'M96',
        title: 'シネマメタデータ接点ポッド (Cooke /i・LDS-2)',
        viewTag: 'VFX連携',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Top 12-o'clock 8-pin contact pod -->
          <rect x="20" y="36" width="136" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <path d="M36 68 Q88 46 140 68 L134 92 Q88 74 42 92 Z" fill="#1e293b"/>
          ${[48, 60, 72, 84, 96, 108, 120, 132]
            .map((x, i) => `<circle cx="${x}" cy="${74 - Math.sin((i / 7) * Math.PI) * 10}" r="3.4" fill="${i < 4 ? '#eab308' : '#38bdf8'}"/>`)
            .join('')}
          <text x="64" y="108" text-anchor="middle" font-size="6.6" font-weight="700" fill="#b45309">Cooke /i (4P)</text>
          <text x="116" y="108" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0284c7">LDS-2 (8P)</text>
          <text x="88" y="128" text-anchor="middle" font-size="6.4" fill="#475569">12時方向 EMI遮蔽ポッド</text>

          <!-- Right: Real-Time VFX Data Pipeline -->
          <rect x="168" y="36" width="176" height="104" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
          <text x="256" y="51" text-anchor="middle" font-size="7.3" font-weight="700" fill="#92400e">毎フレーム絶対エンコーダ同期</text>
          ${pill(212, 72, 76, 17, 'Focus / T値', '#ffffff', '#d97706', '#92400e', 6.6)}
          ${pill(300, 72, 76, 17, '入射瞳・歪曲', '#ffffff', '#0284c7', '#0369a1', 6.6)}
          <line x1="256" y1="84" x2="256" y2="100" stroke="#d97706" stroke-width="1.6" marker-end="url(#a-M96-amber)"/>
          ${pill(256, 114, 152, 20, 'Unreal / LEDウォール CG同期 (<0.1px)', '#1e293b', '#eab308', '#fde047', 6.6)}
        `,
        caption: 'Cooke /i・LDS-2接点でピント・T値・歪曲マップを毎コマ取得し、インカメラVFXを完全同期',
      });

    // M97: Next-Gen Optical / 60 GHz Contactless Transceiver
    case 'mount_optical_mmwave_link':
      return mountHdFrame({
        code: 'M97',
        title: '光／60 GHzミリ波 非接触超高速通信 (>1 Gbps)',
        viewTag: '2026次世代',
        accent: '#06b6d4',
        headerBg: '#ecfeff',
        body: `
          <!-- Lens side vs Air Gap (<1.5mm) vs Body side -->
          <rect x="18" y="38" width="112" height="100" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="74" y="53" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">レンズ側</text>
          ${pill(74, 74, 88, 17, '850nm VCSEL', '#e0f2fe', '#0284c7', '#0369a1', 6.8)}
          ${pill(74, 100, 88, 17, '60 GHz カプラ', '#fef3c7', '#d97706', '#92400e', 6.8)}
          <rect x="122" y="58" width="8" height="66" rx="2" fill="#38bdf8"/>

          <!-- Contactless Air Gap -->
          <line x1="134" y1="74" x2="178" y2="74" stroke="#06b6d4" stroke-width="2" stroke-dasharray="3 2" marker-start="url(#a-M97-cyan)" marker-end="url(#a-M97-cyan)"/>
          <path d="M134 100 Q145 92 156 100 T178 100" fill="none" stroke="#d97706" stroke-width="2"/>
          <text x="156" y="64" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0e7490">非接触</text>
          <text x="156" y="122" text-anchor="middle" font-size="6.3" fill="#475569">&lt;1.5mm</text>

          <!-- Body side with Sapphire window -->
          <rect x="182" y="38" width="162" height="100" rx="5" fill="#ecfeff" stroke="#67e8f9"/>
          <rect x="182" y="58" width="8" height="66" rx="2" fill="#38bdf8"/>
          <text x="266" y="53" text-anchor="middle" font-size="7.2" font-weight="700" fill="#155e75">ボディ側（サファイア気密窓）</text>
          ${pill(266, 76, 134, 18, 'PIN PD + 60GHz SerDes', '#ffffff', '#0891b2', '#0e7490', 6.8)}
          <text x="200" y="106" font-size="6.7" fill="#0f172a">• 帯域 1〜6 Gbps（従来比1000×）</text>
          <text x="200" y="120" font-size="6.7" fill="#0f172a">• 金属摩耗・塩害腐食・防水懸念ゼロ</text>
        `,
        caption: 'ハーメチックサファイア窓越しの光／60GHz非接触結合で摩耗ゼロ＆ギガビット光学連携を解放',
      });

    // M98: 3-Axis Piezoresistive Bayonet Strain-Gauge Bridge
    case 'mount_strain_gauge_bridge':
      return mountHdFrame({
        code: 'M98',
        title: '3軸歪みゲージ＆超望遠片持ち撓み補正ブリッジ',
        viewTag: 'スマート構造',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Left: 3-point rosette & Wheatstone Bridge -->
          <rect x="18" y="36" width="144" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Wheatstone Diamond -->
          <polygon points="90,48 130,84 90,120 50,84" fill="none" stroke="#ea580c" stroke-width="1.6"/>
          <rect x="61" y="56" width="14" height="10" rx="2" fill="#fed7aa" stroke="#ea580c" transform="rotate(-42 68 61)"/>
          <rect x="105" y="56" width="14" height="10" rx="2" fill="#fed7aa" stroke="#ea580c" transform="rotate(42 112 61)"/>
          <rect x="61" y="102" width="14" height="10" rx="2" fill="#fed7aa" stroke="#ea580c" transform="rotate(42 68 107)"/>
          <rect x="105" y="102" width="14" height="10" rx="2" fill="#fed7aa" stroke="#ea580c" transform="rotate(-42 112 107)"/>
          <text x="90" y="87" text-anchor="middle" font-size="7" font-weight="700" fill="#9a3412">ΔV_bridge</text>
          <text x="90" y="135" text-anchor="middle" font-size="6.4" fill="#475569">90°/210°/330° 3軸ロゼット</text>

          <!-- Right: Closed-Loop Sag Pre-Compensation -->
          <rect x="174" y="36" width="170" height="104" rx="5" fill="#fff7ed" stroke="#fdba74"/>
          <text x="259" y="52" text-anchor="middle" font-size="7.3" font-weight="700" fill="#9a3412">リアルタイム片持ち撓み補償</text>
          ${pill(259, 71, 146, 17, '24-bit ΔΣ ADC (1 kHz 計測)', '#ffffff', '#ea580c', '#c2410c', 6.8)}
          <line x1="259" y1="81" x2="259" y2="95" stroke="#ea580c" stroke-width="1.6" marker-end="url(#a-M98-amber)"/>
          ${pill(259, 108, 146, 18, 'IBISチルト＆AF先読み補正 (0.1″)', '#dcfce7', '#16a34a', '#166534', 6.6)}
          <text x="259" y="132" text-anchor="middle" font-size="6.4" fill="#7c2d12">600mm F4仰角変化の微小お辞儀を能動打消し</text>
        `,
        caption: '3点ホイートストン歪みゲージで超望遠レンズの微小たわみを常時検出し、IBIS・AFを先読み補償',
      });

    // M99: Active Piezo Zero-Play Micro-Actuated Lock Ring
    case 'mount_active_piezo_lock':
      return mountHdFrame({
        code: 'M99',
        title: 'アクティブ圧電マイクロ楔・ゼロガタ電磁クランプ',
        viewTag: '能動固定',
        accent: '#9333ea',
        headerBg: '#faf5ff',
        body: `
          <!-- Piezo stack + compliant flexure hinge amplifying displacement -->
          <rect x="18" y="36" width="184" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Titanium compliant frame -->
          <rect x="30" y="52" width="106" height="72" rx="6" fill="#e2e8f0" stroke="#475569"/>
          <!-- Multi-layer PZT stack -->
          <rect x="44" y="68" width="52" height="40" rx="3" fill="#9333ea"/>
          ${[52, 60, 68, 76, 84].map((x) => `<line x1="${x}" y1="68" x2="${x}" y2="108" stroke="#e9d5ff" stroke-width="1.2"/>`).join('')}
          <text x="70" y="90" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffff">積層PZT</text>
          <!-- Amplified Wedge pushing into bayonet lug -->
          <polygon points="102,74 146,80 146,96 102,102" fill="#475569" stroke="#0f172a"/>
          <line x1="126" y1="88" x2="158" y2="88" stroke="#9333ea" stroke-width="2" marker-end="url(#a-M99-purple)"/>
          <!-- Bayonet lug clamped zero-play -->
          <rect x="162" y="58" width="28" height="60" rx="3" fill="#0284c7" opacity="0.3" stroke="#0284c7"/>
          <text x="176" y="90" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0369a1">爪</text>
          <text x="110" y="135" text-anchor="middle" font-size="6.5" font-weight="700" fill="#6b21a8">弾性ヒンジ拡大 Δx ≈ 45 μm</text>

          <!-- Right: Play elimination -->
          <rect x="214" y="36" width="130" height="104" rx="5" fill="#faf5ff" stroke="#d8b4fe"/>
          <text x="279" y="52" text-anchor="middle" font-size="7.2" font-weight="700" fill="#6b21a8">回転遊び δ_θ → 0.000°</text>
          ${pill(279, 74, 114, 17, 'クランプ力 > 80 N / 5ms', '#ffffff', '#9333ea', '#7e22ce', 6.8)}
          <text x="224" y="100" font-size="6.7" fill="#1e293b">• 着脱時は電圧OFFで軽快</text>
          <text x="224" y="114" font-size="6.7" fill="#1e293b">• 装着検知後に3点自動締付</text>
          <text x="224" y="128" font-size="6.7" fill="#1e293b">• FIZ急反転ブレ完全消去</text>
        `,
        caption: '積層PZT圧電マイクロ楔で装着後にバヨネット隙間を自動消去し、着脱の軽さと無ガタを両立',
      });

    // M100: Low-CTE Titanium / Invar-36 Thermal-Compensated Flange
    case 'mount_ti_invar_thermal_flange':
      return mountHdFrame({
        code: 'M100',
        title: '低熱膨張 チタン／インバー36複合基準フランジ',
        viewTag: '熱ドリフト0',
        accent: '#0d9488',
        headerBg: '#f0fdfa',
        body: `
          <!-- Left: CTE Bar Chart (Mg vs SUS304 vs Ti vs Invar-36) -->
          <rect x="18" y="36" width="182" height="104" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="109" y="50" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0f172a">線膨張係数 CTE (ppm/K) 比較</text>
          <text x="26" y="68" font-size="6.4" fill="#64748b">Mg (26.0)</text>
          <rect x="78" y="61" width="110" height="9" rx="2" fill="#94a3b8"/>
          <text x="26" y="86" font-size="6.4" fill="#475569">SUS (17.3)</text>
          <rect x="78" y="79" width="74" height="9" rx="2" fill="#64748b"/>
          <text x="26" y="104" font-size="6.4" fill="#0284c7">Ti-6Al-4V (8.6)</text>
          <rect x="78" y="97" width="38" height="9" rx="2" fill="#0284c7"/>
          <text x="26" y="122" font-size="6.5" font-weight="700" fill="#0f766e">Invar-36 (1.2)</text>
          <rect x="78" y="115" width="8" height="10" rx="2" fill="#0d9488"/>
          <text x="92" y="123" font-size="6.6" font-weight="700" fill="#0f766e">SUSの 1/14 !</text>

          <!-- Right: Hybrid Flange Concentric Structure -->
          <rect x="212" y="36" width="132" height="104" rx="5" fill="#f0fdfa" stroke="#5eead4"/>
          <circle cx="278" cy="78" r="30" fill="#0284c7" opacity="0.22" stroke="#0284c7" stroke-width="2"/>
          <circle cx="278" cy="78" r="20" fill="#0d9488" opacity="0.32" stroke="#0f766e" stroke-width="2"/>
          <circle cx="278" cy="78" r="11" fill="#ffffff" stroke="#0f766e"/>
          <text x="278" y="80" text-anchor="middle" font-size="5.6" font-weight="700" fill="#115e59">Invar</text>
          <text x="278" y="120" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f766e">ΔT=40℃ ⇒ ΔFFD &lt; 0.9μm</text>
          <text x="278" y="132" text-anchor="middle" font-size="6.3" fill="#475569">セラミック断熱座＋グラファイト熱橋</text>
        `,
        caption: 'Ti-6Al-4V外殻×インバー36光学コア＋セラミック断熱で8K録画・天体撮影の熱ピントズレを根絶',
      });

    default:
      return null;
  }
}
