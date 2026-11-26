import { PartExplanation } from '../../assemblies/types';
import { FONT_MONO, pill, shutterFrame } from './shared';

/**
 * Phase 36 Ultra-Detailed Shutter Technical Schematics — Group E (SH148–SH164, 17 bespoke 360x176 HD SVGs).
 * Antistatic dividers, serrated baffle, internal ND bay, magnetics, rotary actuator, clutches, and non-contact/multi-stage brakes.
 */
export function renderShutterHdGroupE(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    case 'shutter_conductive_pps_divider':
      return shutterFrame({
        code: 'SH148',
        title: 'CNT/黒鉛配合 導電性PPS/LCP除電スペーサー',
        viewTag: '静電対策',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- Left: Charge bleed path -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">高速摺動による摩擦静電気を瞬間グランド放出</text>
          <!-- Moving blade generating triboelectric charges -->
          <rect x="24" y="54" width="160" height="16" rx="2" fill="#1e293b"/>
          <text x="104" y="65" text-anchor="middle" font-size="6.7" font-weight="700" fill="#f8fafc">高速シャッター羽根（摩擦帯電 +q）</text>
          <!-- Conductive CNT-PPS spacer -->
          <rect x="24" y="76" width="160" height="24" rx="2" fill="#0e7490" stroke="#155e75"/>
          <text x="104" y="87" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">CNT/黒鉛配合 導電性PPSスペーサー</text>
          <text x="104" y="96" text-anchor="middle" font-size="6.1" fill="#cffafe">表面抵抗 R ≈ 10⁵–10⁷ Ω/□（静電散逸領域）</text>
          <!-- Ground symbol -->
          <line x1="104" y1="100" x2="104" y2="112" stroke="#0891b2" stroke-width="1.6"/>
          <line x1="92" y1="112" x2="116" y2="112" stroke="#0891b2" stroke-width="1.6"/>
          <line x1="96" y1="116" x2="112" y2="116" stroke="#0891b2" stroke-width="1.4"/>
          <line x1="100" y1="120" x2="108" y2="120" stroke="#0891b2" stroke-width="1.2"/>
          <text x="148" y="117" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0369a1">GND 除電</text>
          ${pill(104, 135, 160, 12, 'ホコリ吸着＆静電貼り付き遅延を根絶', '#cffafe', '#0891b2', '#155e75', 6.5)}
          <!-- Right: Discharge time constant -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">10 μs の超高速除電時定数</text>
          <rect x="212" y="52" width="128" height="30" rx="4" fill="#ecfeff" stroke="#06b6d4"/>
          <text x="276" y="64" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0e7490" style="font-family:${FONT_MONO};">τ = R · C ≈ 10 μs</text>
          <text x="276" y="76" text-anchor="middle" font-size="6.3" fill="#155e75">10⁶ Ω × 10 pF（次ショット前に完了）</text>
          <text x="276" y="98" text-anchor="middle" font-size="6.5" fill="#334155">・絶縁樹脂だと数kV帯電→羽根癒着</text>
          <text x="276" y="111" text-anchor="middle" font-size="6.5" fill="#334155">・乾燥した厳冬地でも幕速安定</text>
          ${pill(276, 132, 128, 13, 'センサー静電ゴミ吸引も同時低減', '#ecfeff', '#0891b2', '#164e63', 6.5)}
        `,
        caption: 'CNT/黒鉛を配合した導電性PPSスペーサーで摩擦帯電を10 μsで逃がし、羽根癒着とゴミ吸引を防止',
      });

    case 'shutter_aperture_serrated_grooves':
      return shutterFrame({
        code: 'SH149',
        title: '開口内周 60°ミクロ鋸歯状（セレーション）溝',
        viewTag: '迷光吸収',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Left: 60-degree micro-serrations ray trap -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#0f172a" stroke="#475569"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#e9d5ff">60° V溝の多重反射ブラックホールトラップ</text>
          <!-- Sawtooth profile -->
          <polygon points="22,120 22,82 40,104 58,82 76,104 94,82 112,104 130,82 148,104 166,82 184,104 184,120" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
          <!-- Incoming stray ray trapped in 3 bounces -->
          <line x1="68" y1="50" x2="88" y2="89" stroke="#fbbf24" stroke-width="1.8" marker-end="url(#a-SH149-amber)"/>
          <line x1="88" y1="89" x2="96" y2="99" stroke="#f59e0b" stroke-width="1.4"/>
          <line x1="96" y1="99" x2="103" y2="91" stroke="#c084fc" stroke-width="1.1"/>
          <text x="58" y="64" font-size="6.4" font-weight="700" fill="#fde68a">強い斜光 100%</text>
          <text x="142" y="66" text-anchor="middle" font-size="6.6" font-weight="700" fill="#c084fc">3重反射で</text>
          <text x="142" y="76" text-anchor="middle" font-size="6.6" font-weight="700" fill="#c084fc">0.0027% へ減衰</text>
          ${pill(104, 133, 158, 12, 'ピッチ 0.25 mm × 60° 鋭角マイクロ溝', '#3b0764', '#c084fc', '#f3e8ff', 6.5)}
          <!-- Right: Attenuation law -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">幾何光学 3乗減衰則</text>
          <rect x="212" y="52" width="128" height="32" rx="4" fill="#f5f3ff" stroke="#8b5cf6"/>
          <text x="276" y="65" text-anchor="middle" font-size="7.2" font-weight="700" fill="#6d28d9" style="font-family:${FONT_MONO};">R_tot = R_surf^N</text>
          <text x="276" y="78" text-anchor="middle" font-size="6.4" fill="#5b21b6" style="font-family:${FONT_MONO};">0.03³ = 2.7×10⁻⁵</text>
          <text x="276" y="99" text-anchor="middle" font-size="6.5" fill="#334155">・F1.2 大口径レンズの極端な斜光</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.5" fill="#334155">・内面反射フレア・ゴーストを根絶</text>
          ${pill(276, 132, 128, 13, 'JPO 2H081 遮光迷路の高精度化', '#f5f3ff', '#7c3aed', '#4c1d95', 6.5)}
        `,
        caption: '開口フレーム内周に60°マイクロ鋸歯状溝を刻み、3重反射吸収で斜光反射を2.7×10⁻⁵へ低減',
      });

    case 'shutter_internal_nd_shield_bay':
      return shutterFrame({
        code: 'SH150',
        title: 'シャッター直後 連動格納式・内蔵ND保護機構',
        viewTag: 'シネマ連動',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: ND filter bay right behind shutter -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">シャッター幕〜センサー間の薄型NDガイド室</text>
          <!-- Shutter plane -->
          <rect x="34" y="54" width="10" height="62" rx="1.5" fill="#1e293b"/>
          <text x="39" y="125" text-anchor="middle" font-size="6.2" font-weight="700" fill="#1e293b">幕</text>
          <!-- Retractable ND filter + guide rail -->
          <rect x="70" y="52" width="16" height="66" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="2.5 1.5"/>
          <rect x="73" y="58" width="10" height="44" rx="1.5" fill="#38bdf8" opacity="0.8" stroke="#0369a1"/>
          <line x1="78" y1="106" x2="78" y2="117" stroke="#0284c7" stroke-width="1.5" marker-end="url(#a-SH150-blue)"/>
          <text x="116" y="72" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1">電動スライドND</text>
          <text x="116" y="83" text-anchor="middle" font-size="6.2" fill="#475569">保護幕インターロック</text>
          <!-- Sensor plane -->
          <rect x="156" y="54" width="12" height="62" rx="1.5" fill="#0f172a" stroke="#0ea5e9"/>
          <text x="162" y="125" text-anchor="middle" font-size="6.2" font-weight="700" fill="#0284c7">CMOS</text>
          <!-- Optical ray passing through -->
          <line x1="18" y1="84" x2="154" y2="84" stroke="#f59e0b" stroke-width="1.6" marker-end="url(#a-SH150-amber)"/>
          ${pill(104, 136, 158, 12, 'JP2023-128253A ND挿抜と幕干渉ゼロ', '#e0f2fe', '#0284c7', '#075985', 6.4)}
          <!-- Right: Optical path length shift -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">ND挿入時の光路長補償</text>
          <rect x="212" y="52" width="128" height="30" rx="4" fill="#f0f9ff" stroke="#38bdf8"/>
          <text x="276" y="65" text-anchor="middle" font-size="7" font-weight="700" fill="#0369a1" style="font-family:${FONT_MONO};">Δz = t·(1 − 1/n)</text>
          <text x="276" y="77" text-anchor="middle" font-size="6.3" fill="#0284c7">ダミーガラスorAF連携でピント維持</text>
          <text x="276" y="98" text-anchor="middle" font-size="6.5" fill="#334155">・電子可変NDと機械シャッター共存</text>
          <text x="276" y="111" text-anchor="middle" font-size="6.5" fill="#334155">・レンズ交換時の防塵シャッター協調</text>
          ${pill(276, 132, 128, 13, 'ハイブリッド機/シネマ機へ発展', '#f0f9ff', '#0ea5e9', '#0c4a6e', 6.5)}
        `,
        caption: 'シャッター直後の防塵ガイドレールで内蔵NDを安全挿抜し、保護幕インターロックと光路補償を協調',
      });

    case 'shutter_antistick_nonmag_shim':
      return shutterFrame({
        code: 'SH151',
        title: '残留磁気張り付き防止・非磁性極薄シム',
        viewTag: '電磁解除',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- Left: Yoke + Non-magnetic 50um shim + Armature -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">パーマロイ鉄心端面＋非磁性シム (30–80 μm)</text>
          <!-- U-core permalloy electromagnet -->
          <path d="M26,56 L78,56 L78,72 L44,72 L44,98 L78,98 L78,114 L26,114 Z" fill="#475569" stroke="#1e293b"/>
          <rect x="30" y="74" width="22" height="22" fill="#d97706" rx="2"/>
          <text x="41" y="87" text-anchor="middle" font-size="6.3" font-weight="700" fill="#ffffff">Coil</text>
          <!-- Ultra-thin non-magnetic BeCu / PI shim -->
          <rect x="79" y="54" width="7" height="62" fill="#eab308" stroke="#a16207"/>
          <text x="82.5" y="124" text-anchor="middle" font-size="6.3" font-weight="800" fill="#b45309">50μmシム</text>
          <!-- Armature iron block releasing cleanly -->
          <rect x="89" y="58" width="22" height="54" rx="2" fill="#94a3b8" stroke="#334155"/>
          <line x1="115" y1="85" x2="156" y2="85" stroke="#dc2626" stroke-width="2" marker-end="url(#a-SH151-red)"/>
          <text x="148" y="76" text-anchor="middle" font-size="6.8" font-weight="800" fill="#dc2626">瞬間離脱!</text>
          <text x="148" y="100" text-anchor="middle" font-size="6.2" fill="#475569">磁気回路に極小</text>
          <text x="148" y="109" text-anchor="middle" font-size="6.2" fill="#475569">空隙を強制形成</text>
          ${pill(104, 136, 160, 12, 'US3466993A 残留磁気張り付き完全防止', '#fee2e2', '#dc2626', '#991b1b', 6.4)}
          <!-- Right: Residual force drop curve -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">シム厚み vs 残留吸着力</text>
          <line x1="218" y1="108" x2="338" y2="108" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH151-slate)"/>
          <line x1="218" y1="108" x2="218" y2="52" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH151-slate)"/>
          <path d="M222,58 Q242,88 272,98 T332,104" fill="none" stroke="#dc2626" stroke-width="2.2"/>
          <circle cx="256" cy="92" r="3.5" fill="#059669"/>
          <text x="292" y="84" text-anchor="middle" font-size="6.4" font-weight="700" fill="#047857">50 μm最適点</text>
          <text x="292" y="93" text-anchor="middle" font-size="6.2" fill="#047857">分離遅延 &gt;60%削減</text>
          <text x="276" y="119" text-anchor="middle" font-size="6.2" fill="#475569" style="font-family:${FONT_MONO};">F_rem ∝ B_r²/(1+μ_r·δ/l)²</text>
          ${pill(276, 134, 126, 12, '1/8000 s 露出ジッタを極小化', '#fef2f2', '#ef4444', '#991b1b', 6.5)}
        `,
        caption: '電磁石吸着面に50 μm非磁性シムを挟み、通電OFF直後の残留磁気張り付き遅延を60%以上削減',
      });

    case 'shutter_smco_bias_shunt_screw':
      return shutterFrame({
        code: 'SH152',
        title: 'SmCo温度安定バイアス磁石＆磁束シャントねじ',
        viewTag: '磁束校正',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Left: Hybrid electromagnet + SmCo + adjustable iron shunt screw -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">無通電保持SmCo磁石＋工場ゼロ点校正ねじ</text>
          <!-- Iron yoke + SmCo magnet -->
          <rect x="28" y="64" width="32" height="44" rx="2" fill="#7c3aed"/>
          <text x="44" y="84" text-anchor="middle" font-size="6.6" font-weight="800" fill="#ffffff">SmCo</text>
          <text x="44" y="94" text-anchor="middle" font-size="5.9" fill="#ede9fe">−0.03%/°C</text>
          <rect x="60" y="64" width="76" height="14" fill="#475569"/>
          <rect x="60" y="94" width="76" height="14" fill="#475569"/>
          <!-- Release demag coil -->
          <rect x="92" y="59" width="26" height="24" rx="2" fill="#f59e0b" stroke="#92400e"/>
          <text x="105" y="73" text-anchor="middle" font-size="6" font-weight="700" fill="#ffffff">打消コイル</text>
          <!-- Adjustable shunt screw bypassing flux -->
          <rect x="70" y="75" width="12" height="22" fill="#0ea5e9" stroke="#0369a1"/>
          <line x1="76" y1="48" x2="76" y2="74" stroke="#0284c7" stroke-width="1.3" marker-end="url(#a-SH152-blue)"/>
          <text x="148" y="56" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0284c7">磁束バイパス</text>
          <text x="148" y="65" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0284c7">シャントねじ</text>
          <!-- Armature -->
          <rect x="142" y="64" width="18" height="44" rx="2" fill="#94a3b8" stroke="#334155"/>
          ${pill(104, 133, 160, 12, '−20〜+60 °Cでも保持力ほぼ不変', '#ede9fe', '#7c3aed', '#4c1d95', 6.5)}
          <!-- Right: Flux balance equation -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">3磁束バランス精密校正</text>
          <rect x="212" y="52" width="128" height="32" rx="4" fill="#f5f3ff" stroke="#8b5cf6"/>
          <text x="276" y="65" text-anchor="middle" font-size="6.8" font-weight="700" fill="#6d28d9" style="font-family:${FONT_MONO};">Φ_hold = Φ_SmCo</text>
          <text x="276" y="77" text-anchor="middle" font-size="6.6" font-weight="700" fill="#5b21b6" style="font-family:${FONT_MONO};">− Φ_shunt(z) − Φ_coil</text>
          <text x="276" y="98" text-anchor="middle" font-size="6.4" fill="#334155">・NdFeB比 温度ドリフト 1/4 のSmCo</text>
          <text x="276" y="111" text-anchor="middle" font-size="6.4" fill="#334155">・シャントねじで個体差を0点調整</text>
          ${pill(276, 132, 128, 13, '微小逆電流パルスで即座に解除', '#f5f3ff', '#7c3aed', '#4c1d95', 6.5)}
        `,
        caption: '温度安定なSmCo磁石と磁束シャント微調ねじで、極寒〜真夏まで個体差ゼロの解除タイミングを維持',
      });

    case 'shutter_self_bonding_coil_bobbin':
      return shutterFrame({
        code: 'SH153',
        title: '自己融着エナメル線＆ボビン引出スリット',
        viewTag: '高占積巻線',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Left: Orthocyclic aligned self-bonding coil cross-section -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">熱風融着・整列巻きボビン断面</text>
          <!-- Bobbin flanges -->
          <rect x="26" y="54" width="10" height="58" rx="1.5" fill="#334155"/>
          <rect x="150" y="54" width="10" height="58" rx="1.5" fill="#334155"/>
          <rect x="36" y="98" width="114" height="8" fill="#475569"/>
          <!-- Wire leadout slit & wrapping pin -->
          <rect x="160" y="96" width="24" height="7" rx="1.5" fill="#94a3b8" stroke="#334155"/>
          <text x="172" y="92" text-anchor="middle" font-size="6" font-weight="700" fill="#0f172a">からげピン</text>
          <!-- Orthocyclic hexagonal packed copper wires -->
          <g fill="#f59e0b" stroke="#92400e" stroke-width="0.7">
            <circle cx="44" cy="91" r="5.5"/><circle cx="56" cy="91" r="5.5"/><circle cx="68" cy="91" r="5.5"/><circle cx="80" cy="91" r="5.5"/><circle cx="92" cy="91" r="5.5"/><circle cx="104" cy="91" r="5.5"/><circle cx="116" cy="91" r="5.5"/><circle cx="128" cy="91" r="5.5"/><circle cx="140" cy="91" r="5.5"/>
            <circle cx="50" cy="81" r="5.5"/><circle cx="62" cy="81" r="5.5"/><circle cx="74" cy="81" r="5.5"/><circle cx="86" cy="81" r="5.5"/><circle cx="98" cy="81" r="5.5"/><circle cx="110" cy="81" r="5.5"/><circle cx="122" cy="81" r="5.5"/><circle cx="134" cy="81" r="5.5"/>
            <circle cx="44" cy="71" r="5.5"/><circle cx="56" cy="71" r="5.5"/><circle cx="68" cy="71" r="5.5"/><circle cx="80" cy="71" r="5.5"/><circle cx="92" cy="71" r="5.5"/><circle cx="104" cy="71" r="5.5"/><circle cx="116" cy="71" r="5.5"/><circle cx="128" cy="71" r="5.5"/><circle cx="140" cy="71" r="5.5"/>
          </g>
          <text x="93" y="61" text-anchor="middle" font-size="6.4" font-weight="700" fill="#b45309">熱風ボンド層で一体固化（巻崩れゼロ）</text>
          ${pill(104, 132, 160, 12, '占積率 f_fill = 0.72〜0.78 の超高密度', '#fef3c7', '#d97706', '#78350f', 6.5)}
          <!-- Right: Benefits -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">極細巻線 (φ0.05 mm) 保護</text>
          <text x="276" y="62" text-anchor="middle" font-size="6.6" font-weight="700" fill="#b45309">① 500k回振動での断線ゼロ</text>
          <text x="276" y="74" text-anchor="middle" font-size="6.3" fill="#475569">コイル全体が固まり線同士が擦れない</text>
          <text x="276" y="92" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0369a1">② 引出スリット＆からげピン</text>
          <text x="276" y="104" text-anchor="middle" font-size="6.3" fill="#475569">巻始め端線をフランジ溝で安全保護</text>
          ${pill(276, 130, 128, 13, '低抵抗・高速立ち上がり電磁石', '#fffbeb', '#f59e0b', '#92400e', 6.5)}
        `,
        caption: '熱風融着エナメル線の最密整列巻きとフランジ引出スリットで、高占積率と50万回耐振断線防止を両立',
      });

    case 'shutter_rotary_pm_direct_actuator':
      return shutterFrame({
        code: 'SH154',
        title: '永久磁石ローター直動ロータリーアクチュエータ',
        viewTag: '直動駆動',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Left: Radial magnetized rotor inside open-ring stator -->
          <rect x="12" y="29" width="174" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="99" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">径方向2極PM回転子＋開放C型ステータ</text>
          <!-- Open C-ring stator -->
          <path d="M56,64 A34,34 0 1,0 132,64 L122,71 A22,22 0 1,1 66,71 Z" fill="#475569" stroke="#1e293b"/>
          <!-- Drive coil on stator leg -->
          <rect x="82" y="106" width="24" height="14" rx="2" fill="#f59e0b" stroke="#92400e"/>
          <text x="94" y="115.5" text-anchor="middle" font-size="6" font-weight="700" fill="#ffffff">Coil</text>
          <!-- Radial magnetized N/S rotor -->
          <path d="M94,68 A16,16 0 0,1 94,100 Z" fill="#dc2626"/>
          <path d="M94,68 A16,16 0 0,0 94,100 Z" fill="#2563eb"/>
          <text x="86" y="87" text-anchor="middle" font-size="6.8" font-weight="800" fill="#ffffff">S</text>
          <text x="102" y="87" text-anchor="middle" font-size="6.8" font-weight="800" fill="#ffffff">N</text>
          <!-- Direct drive lever arm -->
          <rect x="92" y="48" width="44" height="7" rx="2" fill="#0284c7"/>
          <circle cx="132" cy="51.5" r="3" fill="#f59e0b"/>
          <text x="150" y="55" font-size="6.3" font-weight="700" fill="#1d4ed8">直結ピン</text>
          ${pill(99, 134, 152, 12, 'CN101432952A ギアレス静音直動', '#dbeafe', '#2563eb', '#1e40af', 6.5)}
          <!-- Right: Linear torque + detent formula -->
          <rect x="194" y="29" width="154" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="271" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">双安定ディテント＋線形駆動</text>
          <rect x="202" y="52" width="138" height="30" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="271" y="65" text-anchor="middle" font-size="7" font-weight="700" fill="#1d4ed8" style="font-family:${FONT_MONO};">T = K_t(θ)·I + T_det</text>
          <text x="276" y="77" text-anchor="middle" font-size="6.2" fill="#1e40af">正逆電流で開閉、終端は無通電吸着</text>
          <text x="271" y="98" text-anchor="middle" font-size="6.5" fill="#334155">・バネ・チャージカム不要の保護幕駆動</text>
          <text x="271" y="111" text-anchor="middle" font-size="6.5" fill="#334155">・極めて静かで省電力なダイレクト駆動</text>
          ${pill(271, 132, 136, 13, '保護シールド幕・補助制御に最適', '#eff6ff', '#2563eb', '#1e40af', 6.5)}
        `,
        caption: '径方向着磁PMローターと開放ステータにより、正逆パルス駆動＋無通電終端保持をギアレスで実現',
      });

    case 'shutter_intermittent_clutch_gear':
      return shutterFrame({
        code: 'SH155',
        title: 'チャージ完了自動切離し 欠歯セクタギア',
        viewTag: '慣性遮断',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- Left: Intermittent toothless sector gear -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">欠歯ゾーン到達で駆動系を自動デカップル</text>
          <!-- Sector gear (left side teeth, right side missing teeth) -->
          <circle cx="80" cy="86" r="28" fill="#cbd5e1" stroke="#334155" stroke-width="1.4"/>
          <path d="M52,72 L46,70 L47,78 L52,78 M50,86 L44,86 L45,93 L51,92 M56,100 L50,104 L55,109 L60,104" fill="#334155"/>
          <path d="M98,64 A28,28 0 0,1 98,108" fill="none" stroke="#059669" stroke-width="3" stroke-dasharray="3 2"/>
          <text x="80" y="89" text-anchor="middle" font-size="6.4" font-weight="800" fill="#0f172a">欠歯ギア</text>
          <!-- Mating curtain pinion sitting in toothless gap -->
          <circle cx="136" cy="86" r="15" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
          <text x="136" y="89" text-anchor="middle" font-size="6.3" font-weight="700" fill="#92400e">幕側ギア</text>
          <text x="113" y="61" text-anchor="middle" font-size="6.5" font-weight="700" fill="#059669">欠歯空隙</text>
          <line x1="113" y1="64" x2="113" y2="80" stroke="#059669" stroke-width="1.2" marker-end="url(#a-SH155-green)"/>
          ${pill(104, 132, 160, 12, '露光瞬間は減速機・モーター慣性ゼロ!', '#dcfce7', '#16a34a', '#166534', 6.5)}
          <!-- Right: Reflected inertia formula -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">反射慣性 N²·J_m を遮断</text>
          <rect x="212" y="52" width="128" height="32" rx="4" fill="#ecfdf5" stroke="#10b981"/>
          <text x="276" y="65" text-anchor="middle" font-size="6.8" font-weight="700" fill="#047857" style="font-family:${FONT_MONO};">J_rel = J_curt + J_link</text>
          <text x="276" y="78" text-anchor="middle" font-size="6.3" fill="#065f46">（N² × J_motor を完全カット）</text>
          <text x="276" y="99" text-anchor="middle" font-size="6.5" fill="#334155">・チャージ時だけ歯が噛み合う</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.5" fill="#334155">・走行時は羽根とリンクだけの超軽量</text>
          ${pill(276, 132, 128, 13, 'JPO 2H081 BB28 遊星スイング連動', '#ecfdf5', '#10b981', '#065f46', 6.4)}
        `,
        caption: 'チャージ完了位置に欠歯ゾーンを設け、シャッター走行瞬間のモーター反射慣性を完全遮断',
      });

    case 'shutter_oneway_wrap_spring_clutch':
      return shutterFrame({
        code: 'SH156',
        title: '一方向コイル巻き締めスプリングクラッチ',
        viewTag: '無音逆止',
        accent: '#0d9488',
        headerBg: '#f0fdfa',
        body: `
          <!-- Left: Wrap spring clutching two abutted hubs -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">突き合わせハブ外周の 7.5 ターン角線コイル</text>
          <!-- Input & Output hubs -->
          <rect x="26" y="70" width="76" height="32" rx="2" fill="#475569"/>
          <text x="64" y="89" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">入力ハブ</text>
          <rect x="104" y="70" width="76" height="32" rx="2" fill="#0284c7"/>
          <text x="142" y="89" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">出力ハブ</text>
          <!-- Helical wrap coils straddling the gap -->
          <g fill="none" stroke="#f59e0b" stroke-width="3">
            <line x1="68" y1="64" x2="74" y2="108"/><line x1="78" y1="64" x2="84" y2="108"/>
            <line x1="88" y1="64" x2="94" y2="108"/><line x1="98" y1="64" x2="104" y2="108"/>
            <line x1="108" y1="64" x2="114" y2="108"/><line x1="118" y1="64" x2="124" y2="108"/>
            <line x1="128" y1="64" x2="134" y2="108"/>
          </g>
          <text x="62" y="57" text-anchor="middle" font-size="6.3" font-weight="700" fill="#059669">正転：自己締付けロック</text>
          <text x="146" y="118" text-anchor="middle" font-size="6.3" font-weight="700" fill="#dc2626">逆転：拡径し無音空転</text>
          ${pill(104, 135, 160, 12, '爪ラチェット音ゼロ・遊び &lt; 0.5°', '#ccfbf1', '#0d9488', '#115e59', 6.5)}
          <!-- Right: Capstan / Euler belt friction law -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">オイラー指数トルク増幅</text>
          <rect x="212" y="52" width="128" height="32" rx="4" fill="#f0fdfa" stroke="#14b8a6"/>
          <text x="276" y="65" text-anchor="middle" font-size="7" font-weight="700" fill="#0f766e" style="font-family:${FONT_MONO};">T = T₀·(e^(2πμN)−1)</text>
          <text x="276" y="78" text-anchor="middle" font-size="6.3" fill="#047857">N = 7.5 巻で微小予圧を数百倍増幅</text>
          <text x="276" y="99" text-anchor="middle" font-size="6.5" fill="#334155">・直径 φ5 mm で高バネ反力を保持</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.5" fill="#334155">・静音連写時のギア逆転戻り防止</text>
          ${pill(276, 132, 128, 13, 'JPO 2H081 BB28 / CC14 逆止機構', '#f0fdfa', '#0d9488', '#115e59', 6.5)}
        `,
        caption: '角線コイルの指数摩擦締め付けで正転瞬間ロック・逆転無音空転を実現し、遊び0.5°未満で逆転阻止',
      });

    case 'shutter_cam_deadpoint_detent':
      return shutterFrame({
        code: 'SH157',
        title: 'チャージカム トグル死点ディテント＆補助爪',
        viewTag: '無電力保持',
        accent: '#6366f1',
        headerBg: '#eef2ff',
        body: `
          <!-- Left: Potential energy valley at TDC -->
          <rect x="12" y="29" width="174" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="99" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">カム頂上（死点 TDC）の安定くぼみポケット</text>
          <!-- Energy profile curve U(theta) -->
          <path d="M24,110 C48,108 66,56 86,56 C94,56 96,72 104,72 C112,72 114,56 122,56 C142,56 154,108 176,110" fill="none" stroke="#6366f1" stroke-width="2.2"/>
          <!-- Follower roller sitting snugly in TDC detent valley -->
          <circle cx="104" cy="66" r="5.5" fill="#f59e0b" stroke="#92400e" stroke-width="1.2"/>
          <line x1="104" y1="76" x2="104" y2="112" stroke="#6366f1" stroke-width="1" stroke-dasharray="2.5 2"/>
          <text x="104" y="121" text-anchor="middle" font-size="6.6" font-weight="700" fill="#4338ca">TDC 安定死点（極小ポケット）</text>
          <text x="48" y="66" text-anchor="middle" font-size="6.2" fill="#475569">チャージ</text>
          <text x="156" y="66" text-anchor="middle" font-size="6.2" fill="#059669">レリーズ補助</text>
          ${pill(99, 135, 152, 12, '電源OFFでもチャージ姿勢が絶対ズレない', '#e0e7ff', '#6366f1', '#312e81', 6.4)}
          <!-- Right: Physics & dual use -->
          <rect x="194" y="29" width="154" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="271" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">安定条件＆復帰ストローク活用</text>
          <rect x="202" y="52" width="138" height="30" rx="4" fill="#eef2ff" stroke="#818cf8"/>
          <text x="271" y="65" text-anchor="middle" font-size="6.9" font-weight="700" fill="#3730a3" style="font-family:${FONT_MONO};">dU/dθ=0, d²U/dθ²&gt;0</text>
          <text x="271" y="77" text-anchor="middle" font-size="6.2" fill="#4338ca">ポテンシャル極小による無電力ロック</text>
          <text x="271" y="98" text-anchor="middle" font-size="6.4" fill="#334155">・バネ反力がカム中心を通り負荷ゼロ</text>
          <text x="271" y="111" text-anchor="middle" font-size="6.4" fill="#334155">・復帰動作をレリーズ補助爪に再利用</text>
          ${pill(271, 132, 136, 13, 'JPO 2H081 CC15–CC16 死点機構', '#eef2ff', '#6366f1', '#312e81', 6.5)}
        `,
        caption: 'チャージカム頂上に微小な死点ディテントを設け、無電力で安定待機しつつ復帰動作をレリーズ補助',
      });

    case 'shutter_motor_pinion_sapphire_thrust':
      return shutterFrame({
        code: 'SH158',
        title: 'ヘリカルピニオン＆軸端サファイアスラスト球',
        viewTag: '静音軸受',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: Helical pinion + shaft + sapphire thrust ball -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">斜歯スラスト力を軸端の点接触球で吸収</text>
          <!-- Coreless motor body -->
          <rect x="20" y="64" width="52" height="44" rx="4" fill="#475569" stroke="#1e293b"/>
          <text x="46" y="89" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">DC Motor</text>
          <!-- SUS elastic clamp -->
          <path d="M36,59 L56,59 L56,64 L36,64 Z" fill="#94a3b8" stroke="#334155"/>
          <text x="46" y="55" text-anchor="middle" font-size="6" font-weight="700" fill="#334155">SUS弾性クランプ</text>
          <!-- Shaft + Helical pinion -->
          <rect x="72" y="82" width="84" height="8" fill="#cbd5e1" stroke="#334155"/>
          <rect x="92" y="72" width="34" height="28" rx="2" fill="#d97706" stroke="#92400e"/>
          <path d="M96,72 L104,100 M106,72 L114,100 M116,72 L124,100" stroke="#fef3c7" stroke-width="1.3"/>
          <text x="109" y="66" text-anchor="middle" font-size="6.3" font-weight="700" fill="#b45309">焼結ヘリカル斜歯</text>
          <!-- Sapphire/ceramic thrust ball + seat -->
          <circle cx="162" cy="86" r="6" fill="#38bdf8" stroke="#0369a1" stroke-width="1.2"/>
          <rect x="169" y="70" width="14" height="32" rx="2" fill="#1e293b"/>
          <line x1="128" y1="86" x2="152" y2="86" stroke="#dc2626" stroke-width="1.6" marker-end="url(#a-SH158-red)"/>
          <text x="154" y="114" text-anchor="middle" font-size="6.3" font-weight="700" fill="#0369a1">スラスト球(点接触)</text>
          ${pill(104, 134, 160, 12, '高周波ギヤ唸り音＆軸摩耗を劇的低減', '#e0f2fe', '#0284c7', '#075985', 6.5)}
          <!-- Right: Axial force & point-contact torque -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">点接触ロス極小化</text>
          <rect x="212" y="52" width="128" height="32" rx="4" fill="#f0f9ff" stroke="#38bdf8"/>
          <text x="276" y="65" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1" style="font-family:${FONT_MONO};">F_ax = F_t · tan β</text>
          <text x="276" y="78" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0284c7" style="font-family:${FONT_MONO};">T = μ·F_ax·r_c → 0</text>
          <text x="276" y="99" text-anchor="middle" font-size="6.5" fill="#334155">・接触半径 r_c ≈ 0 で摩擦トルク極小</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.5" fill="#334155">・SUS弾性クランプで熱膨張吸収</text>
          ${pill(276, 132, 128, 13, '12,000 rpm 高速チャージ耐久', '#f0f9ff', '#0ea5e9', '#0c4a6e', 6.5)}
        `,
        caption: '静音ヘリカルピニオンの軸方向推力をサファイア球の点接触で受け、摩擦トルクとギヤ唸り音を低減',
      });

    case 'shutter_uv_sealed_tension_port':
      return shutterFrame({
        code: 'SH159',
        title: '先幕・後幕張力ウォーム調整窓＆UV樹脂封印',
        viewTag: '工場校正',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Left: Factory adjustment window + worm gear + UV resin seal -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">工場調整窓 → マイクロドライバ → UV硬化封印</text>
          <!-- Chassis wall with port window -->
          <rect x="24" y="66" width="54" height="12" fill="#334155"/>
          <rect x="122" y="66" width="62" height="12" fill="#334155"/>
          <!-- UV cured violet resin dome sealing port -->
          <path d="M78,68 Q100,52 122,68 L122,78 L78,78 Z" fill="#8b5cf6" opacity="0.72" stroke="#6d28d9" stroke-width="1.2"/>
          <text x="100" y="55" text-anchor="middle" font-size="6.4" font-weight="800" fill="#6d28d9">UV硬化ロック樹脂</text>
          <!-- Tension worm drum below -->
          <circle cx="100" cy="100" r="16" fill="#f59e0b" stroke="#92400e" stroke-width="1.2"/>
          <line x1="90" y1="100" x2="110" y2="100" stroke="#451a03" stroke-width="2.2"/>
          <text x="150" y="96" text-anchor="middle" font-size="6.3" font-weight="700" fill="#92400e">張力微調</text>
          <text x="150" y="105" text-anchor="middle" font-size="6.3" font-weight="700" fill="#92400e">ウォーム</text>
          <text x="46" y="102" text-anchor="middle" font-size="6.2" fill="#475569">先幕/後幕</text>
          <text x="46" y="111" text-anchor="middle" font-size="6.2" fill="#475569">独立2窓</text>
          ${pill(104, 134, 160, 12, '調整後 365 nm UV照射で1秒完全固定', '#ede9fe', '#7c3aed', '#4c1d95', 6.5)}
          <!-- Right: Curtain speed matching -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">先幕・後幕の幕速一致精度</text>
          <rect x="212" y="52" width="128" height="32" rx="4" fill="#f5f3ff" stroke="#8b5cf6"/>
          <text x="276" y="65" text-anchor="middle" font-size="7" font-weight="700" fill="#6d28d9" style="font-family:${FONT_MONO};">|t₁ − t₂| ≤ 0.05 ms</text>
          <text x="276" y="78" text-anchor="middle" font-size="6.3" fill="#5b21b6">1/8000 s 上下露出ムラ ≤ ±0.2 EV</text>
          <text x="276" y="99" text-anchor="middle" font-size="6.5" fill="#334155">・バネ個体差を工場で全数微調</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.5" fill="#334155">・50万回振動でも絶対緩まない</text>
          ${pill(276, 132, 128, 13, '防塵封止と緩み止めを同時達成', '#f5f3ff', '#7c3aed', '#4c1d95', 6.5)}
        `,
        caption: '工場で先幕・後幕の張力ウォームを0.05 ms精度へ校正後、調整窓ごとUV硬化樹脂で永久封印',
      });

    case 'shutter_blackout_2stage_prep_cam':
      return shutterFrame({
        code: 'SH160',
        title: 'ブラックアウト短縮 2段階先幕準備カム',
        viewTag: '連写高速化',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Timeline comparison: Conventional vs 2-stage parallel prep -->
          <rect x="12" y="29" width="336" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="180" y="42" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0f172a">US20210096445A1：2段階準備カム (286A2/286B2) による暗転短縮</text>
          <!-- Row 1: Conventional sequential blackout -->
          <text x="20" y="61" font-size="6.8" font-weight="700" fill="#64748b">従来（逐次）</text>
          <rect x="76" y="52" width="54" height="16" rx="2" fill="#94a3b8"/>
          <text x="103" y="62.5" text-anchor="middle" font-size="6.3" fill="#ffffff">LV / AF</text>
          <rect x="132" y="52" width="62" height="16" rx="2" fill="#dc2626"/>
          <text x="163" y="62.5" text-anchor="middle" font-size="6.3" font-weight="700" fill="#ffffff">先幕閉鎖準備</text>
          <rect x="196" y="52" width="44" height="16" rx="2" fill="#1e293b"/>
          <text x="218" y="62.5" text-anchor="middle" font-size="6.3" fill="#ffffff">露光</text>
          <rect x="242" y="52" width="58" height="16" rx="2" fill="#dc2626"/>
          <text x="271" y="62.5" text-anchor="middle" font-size="6.3" font-weight="700" fill="#ffffff">チャージ復帰</text>
          <text x="322" y="62.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#dc2626">暗転長</text>
          <!-- Row 2: 2-stage overlapped prep -->
          <text x="20" y="96" font-size="6.8" font-weight="700" fill="#0284c7">2段階準備</text>
          <rect x="76" y="80" width="54" height="12" rx="2" fill="#38bdf8"/>
          <text x="103" y="88.5" text-anchor="middle" font-size="6.1" font-weight="700" fill="#0c4a6e">LV / AF 同時</text>
          <rect x="76" y="94" width="54" height="12" rx="2" fill="#059669"/>
          <text x="103" y="102.5" text-anchor="middle" font-size="6.1" font-weight="700" fill="#ffffff">第1段先行準備</text>
          <rect x="132" y="84" width="26" height="18" rx="2" fill="#0284c7"/>
          <text x="145" y="95.5" text-anchor="middle" font-size="6" font-weight="700" fill="#ffffff">2段</text>
          <rect x="160" y="84" width="44" height="18" rx="2" fill="#1e293b"/>
          <text x="182" y="95.5" text-anchor="middle" font-size="6.3" fill="#ffffff">露光</text>
          <rect x="206" y="84" width="44" height="18" rx="2" fill="#0284c7"/>
          <text x="228" y="95.5" text-anchor="middle" font-size="6.2" font-weight="700" fill="#ffffff">高速復帰</text>
          <!-- Saved time highlight -->
          <rect x="252" y="84" width="48" height="18" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-dasharray="2.5 1.5"/>
          <text x="276" y="95.5" text-anchor="middle" font-size="6.6" font-weight="800" fill="#15803d">−30%短縮!</text>
          <!-- Formula bar -->
          <text x="180" y="119" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0f172a" style="font-family:${FONT_MONO};">t_blackout = t_total − t_overlap(Prep1 ∥ LV_AF)</text>
          ${pill(180, 134, 290, 13, '独立第2駆動レバーで待機中に準備を先取りしEVF暗転を大幅圧縮', '#e0f2fe', '#0284c7', '#075985', 6.5)}
        `,
        caption: 'ライブビューAF中に第1段準備を先行完了させる2段階カムで、ミラーレス連写暗転を25〜35%短縮',
      });

    case 'shutter_eddy_current_self_brake':
      return shutterFrame({
        code: 'SH161',
        title: '非接触 渦電流磁気ダンピングブレーキ',
        viewTag: '非接触制動',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- Left: Copper conductor vane entering permanent magnet gap -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">JP6511143B2 / US10133153B2 渦電流ブレーキ</text>
          <!-- Upper N magnet & Lower S magnet -->
          <rect x="88" y="50" width="66" height="16" rx="2" fill="#dc2626"/>
          <text x="121" y="61" text-anchor="middle" font-size="7" font-weight="800" fill="#ffffff">N 極（固定磁石）</text>
          <rect x="88" y="102" width="66" height="16" rx="2" fill="#2563eb"/>
          <text x="121" y="113" text-anchor="middle" font-size="7" font-weight="800" fill="#ffffff">S 極（磁気ヨーク）</text>
          <!-- B field lines -->
          <line x1="104" y1="66" x2="104" y2="100" stroke="#7c3aed" stroke-width="1" stroke-dasharray="2 1.5" marker-end="url(#a-SH161-purple)"/>
          <line x1="138" y1="66" x2="138" y2="100" stroke="#7c3aed" stroke-width="1" stroke-dasharray="2 1.5" marker-end="url(#a-SH161-purple)"/>
          <!-- Moving Copper plate vane -->
          <rect x="24" y="76" width="114" height="16" rx="2" fill="#f59e0b" stroke="#92400e" stroke-width="1.2"/>
          <text x="64" y="86.5" text-anchor="middle" font-size="6.6" font-weight="800" fill="#ffffff">無酸素銅ムーバー</text>
          <!-- Eddy current swirl -->
          <ellipse cx="120" cy="84" rx="11" ry="5" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-dasharray="3 1.5"/>
          <!-- Velocity vs Braking force arrows -->
          <line x1="26" y1="67" x2="64" y2="67" stroke="#0284c7" stroke-width="1.6" marker-end="url(#a-SH161-blue)"/>
          <text x="45" y="62" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0284c7">速度 v</text>
          <line x1="176" y1="84" x2="146" y2="84" stroke="#059669" stroke-width="2" marker-end="url(#a-SH161-green)"/>
          <text x="166" y="76" text-anchor="middle" font-size="6.4" font-weight="800" fill="#047857">F_eddy</text>
          ${pill(104, 134, 160, 12, '非接触・摩耗粉ゼロ・無音ソフト制動', '#dcfce7', '#16a34a', '#166534', 6.5)}
          <!-- Right: Lorentz braking law -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">速度比例の理想ダンパー</text>
          <rect x="212" y="52" width="128" height="32" rx="4" fill="#ecfdf5" stroke="#10b981"/>
          <text x="276" y="65" text-anchor="middle" font-size="7" font-weight="700" fill="#047857" style="font-family:${FONT_MONO};">F = −σ·B²·A·d·v</text>
          <text x="276" y="78" text-anchor="middle" font-size="6.3" fill="#065f46">速いほど強く効き停止寸前にゼロ</text>
          <text x="276" y="99" text-anchor="middle" font-size="6.5" fill="#334155">・バウンド反発ゼロ（熱へ静かに散逸）</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.5" fill="#334155">・ゴム劣化なし＝永久一定性能</text>
          ${pill(276, 132, 128, 13, '物理接触ゼロの究極ブレーキ機構', '#ecfdf5', '#10b981', '#065f46', 6.5)}
        `,
        caption: '磁界中へ銅ムーバーが突入して渦電流ブレーキを発生、非接触・摩耗粉ゼロ・無反発で静かに減速',
      });

    case 'shutter_wedge_friction_brake':
      return shutterFrame({
        code: 'SH162',
        title: '12° くさび形セルフロック摩擦ブレーキ',
        viewTag: '無反発制動',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Left: 12-degree wedge brake shoe geometry -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">US7708478B2 くさび角 θ = 12° セルフロック</text>
          <!-- Fixed angled brake rail -->
          <polygon points="24,116 178,116 178,86 24,108" fill="#475569"/>
          <text x="114" y="110" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">固定傾斜ガイドレール</text>
          <!-- Wedge shoe being driven right -->
          <polygon points="62,74 132,74 132,92 62,102" fill="#f97316" stroke="#9a3412" stroke-width="1.2"/>
          <text x="97" y="88" text-anchor="middle" font-size="6.7" font-weight="800" fill="#ffffff">12° くさびシュー</text>
          <!-- Top friction guide -->
          <rect x="24" y="62" width="154" height="11" fill="#334155"/>
          <!-- Impact arrow -->
          <line x1="28" y1="86" x2="58" y2="86" stroke="#dc2626" stroke-width="2" marker-end="url(#a-SH162-red)"/>
          <text x="41" y="80" text-anchor="middle" font-size="6.3" font-weight="700" fill="#dc2626">突入</text>
          <!-- Angle callout -->
          <text x="155" y="82" text-anchor="middle" font-size="6.8" font-weight="800" fill="#c2410c" style="font-family:${FONT_MONO};">θ=12°</text>
          ${pill(104, 134, 160, 12, 'ドアストッパー原理で跳ね返りを完全殺傷', '#ffedd5', '#ea580c', '#9a3412', 6.4)}
          <!-- Right: Self-locking friction inequality -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">セルフロック数理条件</text>
          <rect x="212" y="52" width="128" height="32" rx="4" fill="#fff7ed" stroke="#fb923c"/>
          <text x="276" y="65" text-anchor="middle" font-size="7" font-weight="700" fill="#c2410c" style="font-family:${FONT_MONO};">tan 12° (0.213)</text>
          <text x="276" y="78" text-anchor="middle" font-size="7" font-weight="800" fill="#059669" style="font-family:${FONT_MONO};">&lt; μ_static (0.35)</text>
          <text x="276" y="99" text-anchor="middle" font-size="6.5" fill="#334155">・食い込むほど垂直抗力 N が増大</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.5" fill="#334155">・チャージ時に逆押しで軽く解除</text>
          ${pill(276, 132, 128, 13, '画面端バウンド露光ムラを根絶', '#fff7ed', '#f97316', '#9a3412', 6.5)}
        `,
        caption: 'くさび角12°（tan θ < μ）の自己食い込み摩擦で、終端衝突時のリバウンド跳ね返りを完全封殺',
      });

    case 'shutter_multileaf_coulomb_damper':
      return shutterFrame({
        code: 'SH163',
        title: '多層重ね板ばね クーロン層間摩擦ダンパー',
        viewTag: '層間減衰',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- Left: Multi-leaf laminated spring stack -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">JP2015219517A 4層板ばねの層間滑り摩擦</text>
          <!-- Clamped anchor block -->
          <rect x="20" y="62" width="22" height="52" rx="2" fill="#334155"/>
          <!-- 4 curved laminated phosphor-bronze leaves -->
          <path d="M42,72 Q104,70 166,86" fill="none" stroke="#d97706" stroke-width="3.6"/>
          <path d="M42,80 Q100,79 156,94" fill="none" stroke="#0284c7" stroke-width="3.6"/>
          <path d="M42,88 Q96,88 144,101" fill="none" stroke="#0891b2" stroke-width="3.6"/>
          <path d="M42,96 Q92,96 132,108" fill="none" stroke="#475569" stroke-width="3.6"/>
          <!-- Impact arrow on tip -->
          <line x1="166" y1="54" x2="166" y2="80" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-SH163-red)"/>
          <text x="140" y="61" text-anchor="middle" font-size="6.4" font-weight="700" fill="#dc2626">幕レバー衝突</text>
          <!-- Inter-leaf micro-slip arrows -->
          <text x="104" y="118" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0e7490">曲げたわみ時に板同士が微小ズレ Δs して熱散逸</text>
          ${pill(104, 134, 160, 12, '単板ばねと違い跳ね返さず衝撃吸収', '#cffafe', '#0891b2', '#155e75', 6.5)}
          <!-- Right: Hysteresis energy loop -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">ヒステリシス吸収ループ</text>
          <line x1="218" y1="108" x2="338" y2="108" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH163-slate)"/>
          <line x1="218" y1="108" x2="218" y2="52" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH163-slate)"/>
          <!-- Filled hysteresis loop -->
          <path d="M220,106 Q264,58 326,58 Q284,102 220,106 Z" fill="#06b6d4" opacity="0.28" stroke="#0891b2" stroke-width="1.8"/>
          <text x="276" y="84" text-anchor="middle" font-size="6.6" font-weight="800" fill="#0e7490">ΔE ≈ 50%</text>
          <text x="276" y="94" text-anchor="middle" font-size="6.1" fill="#155e75">1半周期で半減</text>
          <text x="276" y="119" text-anchor="middle" font-size="6.2" fill="#475569" style="font-family:${FONT_MONO};">ΔE = Σ 2·μ·N_i·Δs_i</text>
          ${pill(276, 134, 128, 12, '極寒でも硬化しない金属ダンパー', '#ecfeff', '#06b6d4', '#164e63', 6.5)}
        `,
        caption: '4枚の薄板ばねを重ねて層間クーロン摩擦を発生させ、低温でも劣化せず衝撃エネルギーの約50%を吸収',
      });

    case 'shutter_squeeze_film_air_pocket':
      return shutterFrame({
        code: 'SH164',
        title: '終端 スクイーズフィルム圧縮空気膜ブレーキ',
        viewTag: '流体減衰',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Left: Blade entering narrow air pocket with micro-orifice -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">極狭隙間 h への突入で空気膜が急硬化</text>
          <!-- Pocket wall with micro-orifice vent -->
          <path d="M26,56 L176,56 L176,112 L108,112 L108,104 L166,104 L166,64 L26,64 Z" fill="#334155"/>
          <rect x="26" y="104" width="72" height="8" fill="#334155"/>
          <!-- Micro-orifice exhaust arrow -->
          <line x1="103" y1="102" x2="103" y2="122" stroke="#0284c7" stroke-width="1.6" marker-end="url(#a-SH164-blue)"/>
          <text x="144" y="122" text-anchor="middle" font-size="6.3" font-weight="700" fill="#0369a1">φ0.3 mm オリフィス排気</text>
          <!-- Approaching blade compressing blue air cushion -->
          <rect x="34" y="76" width="118" height="12" rx="2" fill="#0f172a"/>
          <text x="93" y="84.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">高速羽根 (v_blade)</text>
          <rect x="34" y="89" width="128" height="14" rx="2" fill="#38bdf8" opacity="0.45"/>
          <text x="98" y="99" text-anchor="middle" font-size="6.6" font-weight="800" fill="#0369a1">圧縮空気クッション (隙間 h)</text>
          <line x1="93" y1="67" x2="93" y2="75" stroke="#dc2626" stroke-width="1.6" marker-end="url(#a-SH164-red)"/>
          ${pill(104, 136, 158, 12, '空気の粘性だけでソフトランディング', '#dbeafe', '#2563eb', '#1e40af', 6.5)}
          <!-- Right: Inverse cube law 1/h^3 -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">隙間 h の3乗に反比例！</text>
          <rect x="212" y="52" width="128" height="32" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="276" y="65" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1d4ed8" style="font-family:${FONT_MONO};">F ∝ (μ·L·W³/h³)·v</text>
          <text x="276" y="78" text-anchor="middle" font-size="6.3" fill="#1e40af">隙間が半分でブレーキ力 8倍!</text>
          <text x="276" y="99" text-anchor="middle" font-size="6.5" fill="#334155">・途中は空気抵抗ゼロで超高速</text>
          <text x="276" y="112" text-anchor="middle" font-size="6.5" fill="#334155">・衝突直前 0.1 mm で急峻エア制動</text>
          ${pill(276, 132, 128, 13, 'JPO 2H081 流体空圧ダンパー', '#eff6ff', '#2563eb', '#1e40af', 6.5)}
        `,
        caption: '羽根室終端の極狭ポケット＋排気オリフィスで1/h³に急増するスクイーズ空気膜ブレーキを形成',
      });

    default:
      return null;
  }
}
