import { PartExplanation } from '../../assemblies/types';
import { FONT_MONO, pill, shutterFrame } from './shared';

/**
 * Phase 36 Ultra-Detailed Shutter Technical Schematics — Group F (SH165–SH180, 16 bespoke 360x176 HD SVGs).
 * Slotted 2-stage bumper, high-speed electronics/sensors/sync/FPC, Sony ILCE-7M4 OEM parts, FRAM adaptive wear & factory QC.
 */
export function renderShutterHdGroupF(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    case 'shutter_slotted_elastomer_ring':
      return shutterFrame({
        code: 'SH165',
        title: 'U字スリット多層たわみ 2段階剛性バンパー',
        viewTag: '2段緩衝',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Left: Metal core + slotted elastomer ring -->
          <rect x="12" y="29" width="174" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="99" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">金属コア内蔵＋U字逃がしスリット構造</text>
          <!-- Outer elastomer ring with crescent air slits -->
          <circle cx="99" cy="86" r="32" fill="#f97316" stroke="#9a3412" stroke-width="1.4"/>
          <!-- Two U-shaped deflection slits -->
          <path d="M77,73 A24,24 0 0,1 121,73" fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round"/>
          <path d="M77,99 A24,24 0 0,0 121,99" fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round"/>
          <!-- Inner eccentric metal core -->
          <circle cx="99" cy="86" r="13" fill="#64748b" stroke="#1e293b" stroke-width="1.2"/>
          <circle cx="102" cy="86" r="5" fill="#e2e8f0" stroke="#334155"/>
          <text x="41" y="75" text-anchor="middle" font-size="6.3" font-weight="700" fill="#c2410c">U字スリット</text>
          <text x="155" y="100" text-anchor="middle" font-size="6.3" font-weight="700" fill="#334155">偏心金属芯</text>
          ${pill(99, 134, 152, 12, '1段目やわらか受取 → 2段目底付き防止', '#ffedd5', '#ea580c', '#9a3412', 6.4)}
          <!-- Right: Piecewise 2-stage F(x) curve -->
          <rect x="194" y="29" width="154" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="271" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">非線形 2段階ばね剛性 F(x)</text>
          <line x1="210" y1="110" x2="338" y2="110" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH165-slate)"/>
          <line x1="210" y1="110" x2="210" y2="52" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH165-slate)"/>
          <!-- Soft slope k1 then steep slope k2=4*k1 -->
          <polyline points="210,110 278,94 324,56" fill="none" stroke="#ea580c" stroke-width="2.3"/>
          <line x1="278" y1="94" x2="278" y2="110" stroke="#94a3b8" stroke-dasharray="2 2"/>
          <text x="244" y="93" text-anchor="middle" font-size="6.5" font-weight="700" fill="#059669">k₁（軟）</text>
          <text x="308" y="84" text-anchor="middle" font-size="6.5" font-weight="700" fill="#dc2626">k₂≈4k₁（硬）</text>
          <text x="278" y="120" text-anchor="middle" font-size="6.2" fill="#475569">スリット閉鎖点 δ</text>
          ${pill(271, 134, 136, 12, '低騒音着地＋フル衝撃受止め両立', '#fff7ed', '#f97316', '#9a3412', 6.5)}
        `,
        caption: 'U字スリットが軟着地し閉鎖後に4倍剛性化する2段階バンパーで衝撃音と底付き抑止',
      });

    case 'shutter_zener_active_flyback':
      return shutterFrame({
        code: 'SH166',
        title: 'ツェナー/TVS アクティブクランプ高速消磁回路',
        viewTag: '電子回路',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- Left: Solenoid + Zener 28V active clamp schematic -->
          <rect x="12" y="29" width="166" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="95" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">TI SLVAE59 高速電流遮断トポロジ</text>
          <!-- Vcc rail -->
          <line x1="26" y1="54" x2="162" y2="54" stroke="#dc2626" stroke-width="1.5"/>
          <text x="38" y="51" font-size="6.3" font-weight="700" fill="#dc2626">+V_bat</text>
          <!-- Solenoid inductor L -->
          <rect x="44" y="64" width="26" height="36" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>
          <text x="57" y="84" text-anchor="middle" font-size="6.8" font-weight="800" fill="#92400e">L_em</text>
          <line x1="57" y1="54" x2="57" y2="64" stroke="#334155" stroke-width="1.3"/>
          <line x1="57" y1="100" x2="57" y2="112" stroke="#334155" stroke-width="1.3"/>
          <!-- Zener + Diode clamp branch -->
          <line x1="57" y1="60" x2="124" y2="60" stroke="#0284c7" stroke-width="1.2"/>
          <line x1="57" y1="105" x2="124" y2="105" stroke="#0284c7" stroke-width="1.2"/>
          <rect x="100" y="68" width="48" height="28" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="1.2"/>
          <text x="124" y="80" text-anchor="middle" font-size="6.5" font-weight="800" fill="#b91c1c">TVS / Zener</text>
          <text x="124" y="91" text-anchor="middle" font-size="6.7" font-weight="800" fill="#dc2626" style="font-family:${FONT_MONO};">V_Z = 28 V</text>
          <!-- Low-side MOSFET -->
          <rect x="42" y="112" width="30" height="14" rx="2" fill="#1e293b"/>
          <text x="57" y="121.5" text-anchor="middle" font-size="6.3" font-weight="700" fill="#ffffff">FET</text>
          ${pill(95, 136, 148, 12, '逆起電力を28Vで急速消費し即消磁', '#fee2e2', '#dc2626', '#991b1b', 6.4)}
          <!-- Right: Current decay comparison -->
          <rect x="186" y="29" width="162" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="267" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">電流減衰速度の劇的差（約40倍!）</text>
          <line x1="202" y1="106" x2="338" y2="106" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH166-slate)"/>
          <line x1="202" y1="106" x2="202" y2="52" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH166-slate)"/>
          <!-- Slow diode decay -->
          <path d="M202,60 L220,60 Q254,68 332,102" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="294" y="75" text-anchor="middle" font-size="6.3" fill="#64748b">通常ダイオード 0.7V (遅い)</text>
          <!-- Fast 28V Zener decay -->
          <path d="M202,60 L220,60 L232,106" fill="none" stroke="#dc2626" stroke-width="2.4"/>
          <text x="256" y="96" text-anchor="middle" font-size="6.6" font-weight="800" fill="#dc2626">28Vクランプ (40×高速!)</text>
          <text x="267" y="119" text-anchor="middle" font-size="6.4" font-weight="700" fill="#1e293b" style="font-family:${FONT_MONO};">t_decay ≈ L·I₀ / (V_Z + V_F)</text>
          ${pill(267, 134, 144, 12, '10 μs 級シャッター幕離脱精度を実現', '#fef2f2', '#ef4444', '#991b1b', 6.5)}
        `,
        caption: '逆起電力を28 Vツェナーでアクティブクランプし、コイル電流を約40倍速く遮断',
      });

    case 'shutter_pwm_bulb_hold_chopper':
      return shutterFrame({
        code: 'SH167',
        title: 'BULB発熱防止 ピーク＆ホールドPWMチョッパ',
        viewTag: '省電力制御',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- Left: Peak & Hold current waveform -->
          <rect x="12" y="29" width="194" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="109" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">吸着時のみ100% → 保持中は25% PWMチョッパ</text>
          <line x1="24" y1="112" x2="196" y2="112" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH167-slate)"/>
          <line x1="24" y1="112" x2="24" y2="52" stroke="#64748b" stroke-width="1" marker-end="url(#a-SH167-slate)"/>
          <!-- High peak pull-in pulse then low PWM ripple -->
          <path d="M24,112 L34,58 L62,58 L66,94 L74,90 L82,95 L90,90 L98,95 L106,90 L114,95 L122,90 L130,95 L138,90 L146,95 L154,90 L162,95 L170,90 L176,112" fill="none" stroke="#059669" stroke-width="2"/>
          <rect x="34" y="58" width="28" height="54" fill="#ef4444" opacity="0.16"/>
          <text x="48" y="54" text-anchor="middle" font-size="6.3" font-weight="700" fill="#dc2626">Peak (100%)</text>
          <text x="122" y="83" text-anchor="middle" font-size="6.6" font-weight="800" fill="#047857">Hold PWM (I = 0.25·I_pk)</text>
          ${pill(109, 132, 174, 12, '長時間星景露光でもセンサー近傍が熱くならない', '#dcfce7', '#16a34a', '#166534', 6.4)}
          <!-- Right: I^2 R thermal reduction -->
          <rect x="214" y="29" width="134" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="281" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">発熱量 I²R 劇的削減</text>
          <rect x="222" y="52" width="118" height="30" rx="4" fill="#ecfdf5" stroke="#10b981"/>
          <text x="281" y="64" text-anchor="middle" font-size="7" font-weight="700" fill="#047857" style="font-family:${FONT_MONO};">P = (0.25)²·P_pk</text>
          <text x="281" y="76" text-anchor="middle" font-size="7.4" font-weight="800" fill="#059669">= 1/16 (−93.8%!)</text>
          <text x="281" y="98" text-anchor="middle" font-size="6.4" fill="#334155">・30分BULBでの暗電流カブリ</text>
          <text x="281" y="110" text-anchor="middle" font-size="6.4" fill="#334155">（アンプグロー）を根本遮断</text>
          ${pill(281, 132, 118, 12, 'バッテリー消費も1/4へ節電', '#ecfdf5', '#10b981', '#065f46', 6.5)}
        `,
        caption: '吸着後にPWMで電流を1/4へ絞るピーク＆ホールド制御で、BULB発熱を93.8%削減',
      });

    case 'shutter_motor_dynamic_brake_fet':
      return shutterFrame({
        code: 'SH168',
        title: 'チャージモーター ローサイド短絡ブレーキFET',
        viewTag: '急停止回路',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Left: H-Bridge Low-Side Short Dynamic Brake -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">Hブリッジ下段2FET同時ONで逆起電力ショート</text>
          <!-- High side FETs OFF -->
          <rect x="34" y="52" width="34" height="16" rx="2" fill="#e2e8f0" stroke="#94a3b8"/>
          <text x="51" y="62.5" text-anchor="middle" font-size="6.2" fill="#64748b">Q1 OFF</text>
          <rect x="140" y="52" width="34" height="16" rx="2" fill="#e2e8f0" stroke="#94a3b8"/>
          <text x="157" y="62.5" text-anchor="middle" font-size="6.2" fill="#64748b">Q2 OFF</text>
          <!-- Motor circle in center -->
          <circle cx="104" cy="78" r="14" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
          <text x="104" y="81" text-anchor="middle" font-size="7.2" font-weight="800" fill="#1e40af">M</text>
          <line x1="51" y1="78" x2="90" y2="78" stroke="#2563eb" stroke-width="1.6"/>
          <line x1="118" y1="78" x2="157" y2="78" stroke="#2563eb" stroke-width="1.6"/>
          <!-- Low side FETs ON forming braking loop -->
          <rect x="34" y="96" width="34" height="18" rx="2" fill="#2563eb"/>
          <text x="51" y="107.5" text-anchor="middle" font-size="6.4" font-weight="800" fill="#ffffff">Q3 ON</text>
          <rect x="140" y="96" width="34" height="18" rx="2" fill="#2563eb"/>
          <text x="157" y="107.5" text-anchor="middle" font-size="6.4" font-weight="800" fill="#ffffff">Q4 ON</text>
          <line x1="51" y1="78" x2="51" y2="96" stroke="#2563eb" stroke-width="1.6"/>
          <line x1="157" y1="78" x2="157" y2="96" stroke="#2563eb" stroke-width="1.6"/>
          <line x1="51" y1="114" x2="157" y2="114" stroke="#2563eb" stroke-width="1.8"/>
          <text x="104" y="110" text-anchor="middle" font-size="6.2" font-weight="700" fill="#1d4ed8">短絡ブレーキ電流ループ</text>
          ${pill(104, 134, 160, 12, 'カム死点オーバーランをミリ秒未満で制動', '#dbeafe', '#2563eb', '#1e40af', 6.4)}
          <!-- Right: Brake torque & stall protection -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">ダイナミック制動＆保護</text>
          <rect x="212" y="52" width="128" height="30" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="276" y="65" text-anchor="middle" font-size="7" font-weight="700" fill="#1d4ed8" style="font-family:${FONT_MONO};">T = (K_t·K_e/R)·ω</text>
          <text x="276" y="77" text-anchor="middle" font-size="6.3" fill="#1e40af">発電ブレーキで10ms以内ピタ止まり</text>
          <text x="276" y="98" text-anchor="middle" font-size="6.4" fill="#334155">・シャント抵抗で過電流ロック監視</text>
          <text x="276" y="111" text-anchor="middle" font-size="6.4" fill="#334155">・異物噛み込み時に即時保護停止</text>
          ${pill(276, 132, 128, 13, '10fps高速連写の正確なカム停止', '#eff6ff', '#2563eb', '#1e40af', 6.5)}
        `,
        caption: 'Hブリッジ下段FET同時ONで逆起電力を短絡し、カム死点オーバーランを瞬時制動',
      });

    case 'shutter_4ch_start_end_optical':
      return shutterFrame({
        code: 'SH169',
        title: '4ch独立 開始/終了端フォトリフレクタ＆サブ基板',
        viewTag: '4点光電計測',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Left: 4 hooded IR sensors at top/bottom of C1 & C2 -->
          <rect x="12" y="29" width="174" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="99" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">先幕・後幕の上端(S)＆下端(E)を4ch同時監視</text>
          <!-- Aperture frame -->
          <rect x="44" y="52" width="110" height="62" rx="3" fill="#ffffff" stroke="#334155" stroke-width="1.3"/>
          <text x="99" y="86" text-anchor="middle" font-size="6.8" font-weight="700" fill="#64748b">幕走行 24 mm</text>
          <!-- 4 hooded IR sensors -->
          <rect x="20" y="54" width="22" height="14" rx="2" fill="#7c3aed"/>
          <text x="31" y="63.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#ffffff">1S</text>
          <rect x="20" y="98" width="22" height="14" rx="2" fill="#7c3aed"/>
          <text x="31" y="107.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#ffffff">1E</text>
          <rect x="156" y="54" width="22" height="14" rx="2" fill="#0284c7"/>
          <text x="167" y="63.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#ffffff">2S</text>
          <rect x="156" y="98" width="22" height="14" rx="2" fill="#0284c7"/>
          <text x="167" y="107.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#ffffff">2E</text>
          <!-- Travel arrows -->
          <line x1="62" y1="58" x2="62" y2="108" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#a-SH169-purple)"/>
          <line x1="136" y1="58" x2="136" y2="108" stroke="#0284c7" stroke-width="1.5" marker-end="url(#a-SH169-blue)"/>
          ${pill(99, 134, 152, 12, '遮光フード付で迷光誤検知を完全ゼロ化', '#ede9fe', '#7c3aed', '#4c1d95', 6.4)}
          <!-- Right: Timing equations -->
          <rect x="194" y="29" width="154" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="271" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">毎ショット幕速＆実露光算出</text>
          <rect x="202" y="52" width="138" height="44" rx="4" fill="#f5f3ff" stroke="#8b5cf6"/>
          <text x="271" y="64" text-anchor="middle" font-size="6.7" font-weight="700" fill="#6d28d9" style="font-family:${FONT_MONO};">Δt₁=t₁E−t₁S, Δt₂=t₂E−t₂S</text>
          <text x="271" y="77" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1" style="font-family:${FONT_MONO};">t_exp = (t₂S−t₁S+t₂E−t₁E)/2</text>
          <text x="271" y="90" text-anchor="middle" font-size="6.2" fill="#4c1d95">分解能 0.1 μs のリアルタイム計測</text>
          <text x="271" y="111" text-anchor="middle" font-size="6.4" fill="#334155">経年ドリフトを次ショットへ即補正</text>
          ${pill(271, 132, 136, 13, '自己診断エラー検知＆学習データ源', '#f5f3ff', '#7c3aed', '#4c1d95', 6.5)}
        `,
        caption: '先幕・後幕の開始/終了端を遮光フード付4ch光電センサーで毎ショット実測管理',
      });

    case 'shutter_fpc_staggered_zif_tearstop':
      return shutterFrame({
        code: 'SH170',
        title: '0.3 mm千鳥2列ZIF金接点＆ティアストップ補強',
        viewTag: '高信頼FPC',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Left: Staggered 2-row ZIF tip with ear notches & tearstop -->
          <rect x="12" y="29" width="194" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="109" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">千鳥2列 ENIG 金接点＋両耳ロックノッチ</text>
          <!-- Polyimide FPC body with ear lock notches -->
          <path d="M26,56 L174,56 L174,64 L164,64 L164,70 L186,70 L186,104 L164,104 L164,110 L174,110 L174,118 L26,118 Z" fill="#d97706" stroke="#92400e" stroke-width="1"/>
          <!-- Tearstop circular copper relief -->
          <circle cx="54" cy="64" r="4" fill="#fbbf24" stroke="#78350f"/>
          <circle cx="54" cy="110" r="4" fill="#fbbf24" stroke="#78350f"/>
          <text x="64" y="88" text-anchor="middle" font-size="6.3" font-weight="800" fill="#ffffff">ティアストップ</text>
          <text x="64" y="97" text-anchor="middle" font-size="6" fill="#fef3c7">裂け止め補強銅</text>
          <!-- Staggered 2-row gold fingers -->
          <g fill="#fef08a" stroke="#a16207" stroke-width="0.6">
            <rect x="126" y="73" width="20" height="4.5"/><rect x="126" y="81" width="20" height="4.5"/>
            <rect x="126" y="89" width="20" height="4.5"/><rect x="126" y="97" width="20" height="4.5"/>
            <rect x="154" y="77" width="26" height="4.5"/><rect x="154" y="85" width="26" height="4.5"/>
            <rect x="154" y="93" width="26" height="4.5"/>
          </g>
          <text x="154" y="53" text-anchor="middle" font-size="6.3" font-weight="700" fill="#b45309">両耳抜け止めノッチ</text>
          ${pill(109, 134, 174, 12, '0.3 mm千鳥ピッチで大電流＋信号20極混載', '#fef3c7', '#d97706', '#78350f', 6.4)}
          <!-- Right: Contact & reliability specs -->
          <rect x="214" y="29" width="134" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="281" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">高振動下の接触信頼性</text>
          <rect x="222" y="52" width="118" height="28" rx="4" fill="#fffbeb" stroke="#f59e0b"/>
          <text x="281" y="64" text-anchor="middle" font-size="6.9" font-weight="700" fill="#b45309" style="font-family:${FONT_MONO};">R_cont &lt; 30 mΩ</text>
          <text x="281" y="75" text-anchor="middle" font-size="6.2" fill="#92400e">ENIG金めっき＋PI補強板</text>
          <text x="281" y="96" text-anchor="middle" font-size="6.4" fill="#334155">・両耳ノッチがZIF抜け防止</text>
          <text x="281" y="109" text-anchor="middle" font-size="6.4" fill="#334155">・曲げ隅の裂け伝播を停止</text>
          ${pill(281, 132, 118, 12, '50万回振動・低温結露でも導通維持', '#fffbeb', '#d97706', '#78350f', 6.2)}
        `,
        caption: '0.3 mm千鳥2列金接点・両耳ノッチ・補強銅箔で振動抜けとFPC裂けを防止',
      });

    case 'shutter_hss_fp_50khz_sync':
      return shutterFrame({
        code: 'SH171',
        title: 'HSS/FP発光 50 kHz連続パルス・スリット同期',
        viewTag: '高速閃光',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: Moving slit vs 50kHz flash pulse train -->
          <rect x="12" y="29" width="194" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="109" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">スリット通過 3.5 ms 間 50 kHz フラット連続発光</text>
          <!-- Slit moving across 3 frames -->
          <rect x="22" y="50" width="38" height="40" fill="#1e293b" stroke="#475569"/>
          <rect x="22" y="55" width="38" height="6" fill="#fde047"/>
          <rect x="68" y="50" width="38" height="40" fill="#1e293b" stroke="#475569"/>
          <rect x="68" y="67" width="38" height="6" fill="#fde047"/>
          <rect x="114" y="50" width="38" height="40" fill="#1e293b" stroke="#475569"/>
          <rect x="114" y="79" width="38" height="6" fill="#fde047"/>
          <text x="176" y="72" text-anchor="middle" font-size="6.4" font-weight="700" fill="#b45309">1/8000 s</text>
          <text x="176" y="82" text-anchor="middle" font-size="6.3" fill="#475569">狭スリット</text>
          <!-- 50 kHz rapid IGBT pulse train below -->
          <path d="M22,115 L26,115 L28,98 L31,115 L35,98 L38,115 L42,98 L45,115 L49,98 L52,115 L56,98 L59,115 L63,98 L66,115 L70,98 L73,115 L77,98 L80,115 L84,98 L87,115 L91,98 L94,115 L98,98 L101,115 L105,98 L108,115 L112,98 L115,115 L119,98 L122,115 L126,98 L129,115 L133,98 L136,115 L140,98 L143,115 L147,98 L150,115 L154,115" fill="none" stroke="#0284c7" stroke-width="1.3"/>
          <text x="178" y="109" text-anchor="middle" font-size="6.3" font-weight="800" fill="#0284c7">50 kHz</text>
          ${pill(109, 134, 174, 12, '175回連続パルスで画面上下を均一照射', '#e0f2fe', '#0284c7', '#075985', 6.5)}
          <!-- Right: Pulse count calculation -->
          <rect x="214" y="29" width="134" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="281" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">FP連続閃光の数式</text>
          <rect x="222" y="52" width="118" height="32" rx="4" fill="#f0f9ff" stroke="#38bdf8"/>
          <text x="281" y="65" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0369a1" style="font-family:${FONT_MONO};">N = f_HSS · t_tr</text>
          <text x="281" y="77" text-anchor="middle" font-size="6.8" font-weight="800" fill="#0284c7">50k×3.5ms = 175発</text>
          <text x="281" y="98" text-anchor="middle" font-size="6.4" fill="#334155">・単発閃光だと幕影ケラレ発生</text>
          <text x="281" y="111" text-anchor="middle" font-size="6.4" fill="#334155">・日中F1.2開放ストロボ撮影を実現</text>
          ${pill(281, 132, 118, 12, 'MIシュー経由でμs精密同期', '#f0f9ff', '#0ea5e9', '#0c4a6e', 6.5)}
        `,
        caption: '50 kHz連続パルス閃光をスリット通過と同期し1/8000 sストロボ撮影を実現',
      });

    case 'shutter_hf_antiflicker_gate':
      return shutterFrame({
        code: 'SH172',
        title: '高周波フリッカーレス 1/50.1 s 小数刻み同期',
        viewTag: 'LED対策',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Left: LED PWM wave & fractional shutter window -->
          <rect x="12" y="29" width="194" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="109" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">LED PWM点滅周期を整数倍カバーし横縞消去</text>
          <!-- LED PWM square wave -->
          <path d="M22,82 L22,62 L40,62 L40,82 L58,82 L58,62 L76,62 L76,82 L94,82 L94,62 L112,62 L112,82 L130,82 L130,62 L148,62 L148,82 L166,82 L166,62 L184,62 L184,82" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
          <text x="104" y="56" text-anchor="middle" font-size="6.3" font-weight="700" fill="#b45309">LED看板・競技場照明 高速PWM点滅</text>
          <!-- Exact integer-cycle shutter window -->
          <rect x="40" y="60" width="108" height="30" fill="#7c3aed" opacity="0.18" stroke="#7c3aed" stroke-width="1.3" stroke-dasharray="3 1.5"/>
          <text x="94" y="102" text-anchor="middle" font-size="6.8" font-weight="800" fill="#6d28d9" style="font-family:${FONT_MONO};">t_shutter = 3 × T_LED (例: 1/50.1 s)</text>
          <text x="94" y="114" text-anchor="middle" font-size="6.3" fill="#475569">全走査ラインで常に同一サイクル数を積算</text>
          ${pill(109, 133, 174, 12, '100/120Hzピーク放出＋小数刻み露光の両輪', '#ede9fe', '#7c3aed', '#4c1d95', 6.4)}
          <!-- Right: Mathematical cancellation -->
          <rect x="214" y="29" width="134" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="281" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">横縞バンディング相殺</text>
          <rect x="222" y="52" width="118" height="30" rx="4" fill="#f5f3ff" stroke="#8b5cf6"/>
          <text x="281" y="65" text-anchor="middle" font-size="7" font-weight="700" fill="#6d28d9" style="font-family:${FONT_MONO};">t_sh = k / f_PWM</text>
          <text x="281" y="77" text-anchor="middle" font-size="6.3" fill="#5b21b6">k = 1, 2, 3… 整数倍一致</text>
          <text x="281" y="98" text-anchor="middle" font-size="6.4" fill="#334155">・0.1段単位より細かい</text>
          <text x="281" y="110" text-anchor="middle" font-size="6.4" fill="#334155">  μs分解能の電磁放出ゲート</text>
          ${pill(281, 132, 118, 12, 'α7 IV/α1 搭載高周波フリッカーレス', '#f5f3ff', '#7c3aed', '#4c1d95', 6.2)}
        `,
        caption: 'LED周期を検出し1/50.1 s等へ小数刻み放出同期して横縞バンディングを相殺',
      });

    case 'shutter_powerfail_safety_cap':
      return shutterFrame({
        code: 'SH173',
        title: '電源瞬断フェイルセーフ 緊急幕退避キャパシタ',
        viewTag: '安全保護',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- Left: Battery drop -> EDLC backup -> safe curtain return -->
          <rect x="12" y="29" width="194" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="109" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">露光中の電池抜け／瞬断でも途中噛み込みゼロ</text>
          ${pill(44, 72, 52, 22, '電池瞬断!', '#fee2e2', '#dc2626', '#991b1b', 6.6)}
          <line x1="70" y1="72" x2="86" y2="72" stroke="#475569" stroke-width="1.5" marker-end="url(#a-SH173-slate)"/>
          ${pill(116, 72, 56, 26, 'EDLC蓄電', '#dcfce7', '#16a34a', '#166534', 6.8)}
          <line x1="144" y1="72" x2="160" y2="72" stroke="#059669" stroke-width="1.5" marker-end="url(#a-SH173-green)"/>
          <rect x="162" y="56" width="38" height="32" rx="4" fill="#0284c7"/>
          <text x="181" y="70" text-anchor="middle" font-size="6.4" font-weight="800" fill="#ffffff">安全</text>
          <text x="181" y="80" text-anchor="middle" font-size="6.4" font-weight="800" fill="#ffffff">幕退避</text>
          <!-- Voltage brownout hold-up line -->
          <text x="109" y="106" text-anchor="middle" font-size="6.6" font-weight="700" fill="#047857">電圧低下検知IC → 100 μs でバックアップ給電切替</text>
          <text x="109" y="117" text-anchor="middle" font-size="6.3" fill="#475569">保護幕・後幕を安全終端まで完了させロック故障回避</text>
          ${pill(109, 134, 174, 12, '中途半端な幕停止による羽根折損を防止', '#dcfce7', '#16a34a', '#166534', 6.5)}
          <!-- Right: Stored energy condition -->
          <rect x="214" y="29" width="134" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="281" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">緊急退避エネルギー式</text>
          <rect x="222" y="52" width="118" height="34" rx="4" fill="#ecfdf5" stroke="#10b981"/>
          <text x="281" y="64" text-anchor="middle" font-size="6.7" font-weight="700" fill="#047857" style="font-family:${FONT_MONO};">E=½C(V₀²−V_min²)</text>
          <text x="281" y="78" text-anchor="middle" font-size="6.6" font-weight="800" fill="#059669">&gt; E_safe_close</text>
          <text x="281" y="99" text-anchor="middle" font-size="6.4" fill="#334155">・極寒の急激な電圧降下に対応</text>
          <text x="281" y="111" text-anchor="middle" font-size="6.4" fill="#334155">・センサーへの太陽光直撃も防護</text>
          ${pill(281, 132, 118, 12, '信頼性フェイルセーフ設計', '#ecfdf5', '#10b981', '#065f46', 6.5)}
        `,
        caption: 'EDLC蓄電で露光中の電池瞬断時も羽根を安全終端へ退避しロック破損を防止',
      });

    case 'shutter_oem_mag_cut_plate':
      return shutterFrame({
        code: 'SH174',
        title: 'Sony OEM 磁気シールド板 (Ref.352)',
        viewTag: 'Sony OEM',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Magnetic field cut plate shielding IBIS VCM vs Shutter solenoids -->
          <rect x="12" y="29" width="194" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="109" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">Ref.352 (502789501) 高透磁率 磁気遮断隔壁</text>
          <!-- Shutter solenoid left -->
          <rect x="22" y="58" width="52" height="50" rx="4" fill="#fee2e2" stroke="#dc2626"/>
          <text x="48" y="79" text-anchor="middle" font-size="6.6" font-weight="700" fill="#991b1b">シャッター</text>
          <text x="48" y="90" text-anchor="middle" font-size="6.5" font-weight="700" fill="#991b1b">電磁石</text>
          <!-- High-mu Magnetic Cut Plate center -->
          <rect x="98" y="48" width="16" height="72" rx="2" fill="#334155" stroke="#0f172a" stroke-width="1.3"/>
          <text x="106" y="86" text-anchor="middle" font-size="6.2" font-weight="800" fill="#fde047" transform="rotate(-90 106 86)">MAG CUT PLATE</text>
          <!-- IBIS VCM magnets right -->
          <rect x="138" y="58" width="58" height="50" rx="4" fill="#dbeafe" stroke="#2563eb"/>
          <text x="167" y="79" text-anchor="middle" font-size="6.6" font-weight="700" fill="#1e40af">5軸 IBIS</text>
          <text x="167" y="90" text-anchor="middle" font-size="6.5" font-weight="700" fill="#1e40af">強Nd磁石</text>
          <!-- Shunted flux loop staying inside plate -->
          <path d="M138,72 C122,72 114,68 114,62 M138,94 C122,94 114,98 114,104" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="2.5 1.5"/>
          <text x="86" y="64" font-size="6.2" font-weight="800" fill="#059669">遮断!</text>
          ${pill(109, 134, 174, 12, 'IBISの強力磁界から電磁石の誤作動を隔離', '#e2e8f0', '#475569', '#0f172a', 6.4)}
          <!-- Right: Shielding factor -->
          <rect x="214" y="29" width="134" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="281" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">磁気遮蔽係数 S_mag</text>
          <rect x="222" y="52" width="118" height="32" rx="4" fill="#f1f5f9" stroke="#64748b"/>
          <text x="281" y="65" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a" style="font-family:${FONT_MONO};">S ≈ 1 + μ_r·t/(2R)</text>
          <text x="281" y="77" text-anchor="middle" font-size="6.3" fill="#475569">高透磁率軟鋼が磁束をバイパス</text>
          <text x="281" y="98" text-anchor="middle" font-size="6.4" fill="#334155">・ILCE-7M4 サービスマニュアル実在</text>
          <text x="281" y="111" text-anchor="middle" font-size="6.4" fill="#334155">・手ブレ補正駆動と幕精度の共存</text>
          ${pill(281, 132, 118, 12, 'Ref.352: 502789501 (891)', '#f1f5f9', '#475569', '#0f172a', 6.4)}
        `,
        caption: 'Sony純正磁気遮断板(Ref.352)がIBIS強磁束を遮蔽し電磁石の干渉を防止',
      });

    case 'shutter_oem_im_fix_shaft':
      return shutterFrame({
        code: 'SH175',
        title: 'Sony OEM 光軸固定シャフト (Ref.501)',
        viewTag: 'Sony OEM',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: 3-point datum shaft stack -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">Ref.501 (459775001) 3点基準＋選別シム</text>
          <!-- Mount frame, Shutter frame, Sensor plane aligned on stepped shaft -->
          <rect x="26" y="54" width="156" height="10" rx="1.5" fill="#334155"/>
          <text x="64" y="61.5" text-anchor="middle" font-size="6.2" font-weight="700" fill="#ffffff">マウント／シャッター基準</text>
          <!-- Precision stepped shaft -->
          <rect x="132" y="49" width="16" height="68" rx="1.5" fill="#94a3b8" stroke="#1e293b"/>
          <rect x="126" y="64" width="28" height="7" fill="#f59e0b" stroke="#92400e"/>
          <text x="90" y="76" text-anchor="middle" font-size="6.3" font-weight="700" fill="#b45309">25–600 μm 選別シム</text>
          <!-- Coil spring & sensor flange -->
          <rect x="26" y="96" width="156" height="12" rx="1.5" fill="#0284c7"/>
          <text x="72" y="104.5" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">イメージャー／IBISベース</text>
          <text x="140" y="124" text-anchor="middle" font-size="6.3" font-weight="700" fill="#dc2626">非再使用精密軸</text>
          ${pill(104, 136, 158, 12, 'フルサイズ36mm全幅で平行度 ≤ 10 μm', '#e0f2fe', '#0284c7', '#075985', 6.4)}
          <!-- Right: Tilt tolerance -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">片ボケゼロの光軸規定</text>
          <rect x="212" y="52" width="128" height="30" rx="4" fill="#f0f9ff" stroke="#38bdf8"/>
          <text x="276" y="65" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0369a1" style="font-family:${FONT_MONO};">Δz = L·tan θ ≤ 10 μm</text>
          <text x="276" y="77" text-anchor="middle" font-size="6.3" fill="#0284c7">F1.2 焦点深度 ±15 μm 以内へ収束</text>
          <text x="276" y="98" text-anchor="middle" font-size="6.4" fill="#334155">・サービス分解時は必ず新品交換</text>
          <text x="276" y="111" text-anchor="middle" font-size="6.4" fill="#334155">・シャッター幕〜センサー距離 d_s 保持</text>
          ${pill(276, 132, 128, 13, 'Ref.501: 459775001 (ILCE-7M4)', '#f0f9ff', '#0ea5e9', '#0c4a6e', 6.4)}
        `,
        caption: 'Sony純正固定軸(Ref.501)とシムでシャッター・センサー平行度10 μm規定',
      });

    case 'shutter_oem_im_mask_retainer':
      return shutterFrame({
        code: 'SH176',
        title: 'Sony OEM センサー遮光マスク (Ref.502)',
        viewTag: 'Sony OEM',
        accent: '#1e293b',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Mask sheet covering bright wirebond/pad perimeter of sensor -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">Ref.502/503/505 開口マスク＋防塵シート</text>
          <!-- Sensor package with shiny gold wirebond perimeter -->
          <rect x="30" y="52" width="148" height="72" rx="4" fill="#1e293b"/>
          <rect x="40" y="60" width="128" height="56" rx="2" fill="#f59e0b" opacity="0.35" stroke="#f59e0b" stroke-dasharray="2 2"/>
          <!-- Matte-black OEM Mask Window strictly hiding outer gold pads -->
          <path d="M30,52 H178 V124 H30 Z M54,66 V110 H154 V66 Z" fill="#0f172a" fill-rule="evenodd"/>
          <rect x="54" y="66" width="100" height="44" fill="#0ea5e9" opacity="0.22" stroke="#38bdf8" stroke-width="1.2"/>
          <text x="104" y="86" text-anchor="middle" font-size="7" font-weight="800" fill="#0369a1">36.4 × 24.4 mm</text>
          <text x="104" y="97" text-anchor="middle" font-size="6.3" fill="#1e293b">有効撮像エリアのみ開放</text>
          ${pill(104, 135, 160, 12, '周辺アルミ配線・金パッド反射を最終遮断', '#e2e8f0', '#334155', '#0f172a', 6.4)}
          <!-- Right: Stacked OEM assembly -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">3層構成（実機分解）</text>
          ${pill(276, 62, 124, 16, 'Ref.505 防塵スペーサーシート', '#f8fafc', '#64748b', '#1e293b', 6.5)}
          ${pill(276, 84, 124, 16, 'Ref.502 マット黒 遮光マスク板', '#1e293b', '#0f172a', '#ffffff', 6.5)}
          ${pill(276, 106, 124, 16, 'Ref.503 リテーナー保持枠', '#eff6ff', '#3b82f6', '#1e40af', 6.5)}
          ${pill(276, 132, 128, 13, '夜間点光源の周辺ゴースト根絶', '#f1f5f9', '#475569', '#0f172a', 6.5)}
        `,
        caption: 'Sony純正マスク板(Ref.502等)がセンサー周辺パッド反射を撮像直前で遮蔽',
      });

    case 'shutter_oem_rl_2stage_switch':
      return shutterFrame({
        code: 'SH177',
        title: 'Sony OEM 2段レリーズスイッチ＆起動フレキ',
        viewTag: 'Sony OEM',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- Left: Dual-dome S1 / S2 tactile switch cutaway -->
          <rect x="12" y="29" width="174" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="99" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">Ref.258 (RL88100) 2段金属ドーム構造</text>
          <!-- Release button plunger -->
          <rect x="78" y="49" width="42" height="13" rx="3" fill="#475569"/>
          <line x1="99" y1="62" x2="99" y2="71" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-SH177-red)"/>
          <!-- S1 Half-press dome -->
          <path d="M52,86 Q99,66 146,86" fill="none" stroke="#0284c7" stroke-width="2.5"/>
          <text x="42" y="78" text-anchor="middle" font-size="6.6" font-weight="800" fill="#0284c7">S1 半押し</text>
          <!-- S2 Full-press dome -->
          <path d="M64,104 Q99,88 134,104" fill="none" stroke="#dc2626" stroke-width="2.5"/>
          <text x="155" y="96" text-anchor="middle" font-size="6.6" font-weight="800" fill="#dc2626">S2 全押し</text>
          <!-- RL-1071 Flex PCB -->
          <rect x="34" y="108" width="130" height="10" rx="2" fill="#d97706"/>
          <text x="99" y="115.5" text-anchor="middle" font-size="6.3" font-weight="700" fill="#ffffff">Ref.257 RL-1071 起動フレキ</text>
          ${pill(99, 134, 152, 12, 'S1でAF/AE起動 → S2で即電磁石解放', '#fee2e2', '#dc2626', '#991b1b', 6.4)}
          <!-- Right: Release time lag breakdown -->
          <rect x="194" y="29" width="154" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="271" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">レリーズタイムラグ内訳</text>
          <rect x="204" y="54" width="32" height="18" rx="2" fill="#f59e0b"/>
          <text x="220" y="65.5" text-anchor="middle" font-size="6.2" font-weight="700" fill="#ffffff">S2</text>
          <rect x="238" y="54" width="54" height="18" rx="2" fill="#0284c7"/>
          <text x="265" y="65.5" text-anchor="middle" font-size="6.2" font-weight="700" fill="#ffffff">電子前処理</text>
          <rect x="294" y="54" width="44" height="18" rx="2" fill="#dc2626"/>
          <text x="316" y="65.5" text-anchor="middle" font-size="6.2" font-weight="700" fill="#ffffff">電磁解放</text>
          <text x="271" y="89" text-anchor="middle" font-size="6.7" font-weight="700" fill="#1e293b" style="font-family:${FONT_MONO};">t_lag = t_deb + t_prep + t_em</text>
          <text x="271" y="104" text-anchor="middle" font-size="6.4" fill="#334155">・金めっき二重接点でチャタリング極小</text>
          <text x="271" y="115" text-anchor="middle" font-size="6.4" fill="#334155">・50万回押下耐久のステンレスドーム</text>
          ${pill(271, 134, 136, 12, '決定的瞬間を逃さない超低遅延起動', '#fef2f2', '#ef4444', '#991b1b', 6.5)}
        `,
        caption: 'Sony純正2段スイッチ(RL88100)と起動フレキで低遅延・電磁解放トリガー',
      });

    case 'shutter_oem_rear_muffle_cushions':
      return shutterFrame({
        code: 'SH178',
        title: 'Sony OEM 背面吸音マッフルクッション A/B',
        viewTag: '音響チューン',
        accent: '#0d9488',
        headerBg: '#f0fdfa',
        body: `
          <!-- Left: Sound wave attenuation across cushion A/B -->
          <rect x="12" y="29" width="184" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="104" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">Ref.59/76 (502863201/301) 背面吸音層</text>
          <!-- Shutter vibration source -->
          <rect x="22" y="56" width="38" height="58" rx="3" fill="#334155"/>
          <text x="41" y="88" text-anchor="middle" font-size="6.4" font-weight="700" fill="#ffffff">Shutter</text>
          <!-- Harsh high-freq waves entering -->
          <path d="M64,74 Q70,66 76,74 Q82,82 88,74 M64,94 Q70,86 76,94 Q82,102 88,94" fill="none" stroke="#dc2626" stroke-width="1.6"/>
          <!-- Porous urethane muffle cushions A & B -->
          <rect x="92" y="54" width="22" height="62" rx="3" fill="#14b8a6" stroke="#0f766e"/>
          <text x="103" y="88" text-anchor="middle" font-size="6.4" font-weight="800" fill="#ffffff" transform="rotate(-90 103 88)">CUSHION A</text>
          <rect x="118" y="54" width="22" height="62" rx="3" fill="#0d9488" stroke="#115e59"/>
          <text x="129" y="88" text-anchor="middle" font-size="6.4" font-weight="800" fill="#ffffff" transform="rotate(-90 129 88)">CUSHION B</text>
          <!-- Softened pleasant wave exiting -->
          <path d="M146,84 Q162,78 178,84" fill="none" stroke="#059669" stroke-width="1.6"/>
          <text x="166" y="72" text-anchor="middle" font-size="6.3" font-weight="700" fill="#047857">耳に心地良い</text>
          <text x="166" y="98" text-anchor="middle" font-size="6.3" font-weight="700" fill="#047857">上質シャッター音</text>
          ${pill(104, 134, 160, 12, '1.5–6 kHz の金属耳障りピークを −4〜−7 dB', '#ccfbf1', '#0d9488', '#115e59', 6.3)}
          <!-- Right: Frequency response dB drop -->
          <rect x="204" y="29" width="144" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="276" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">吸音スペクトル低減効果</text>
          <line x1="216" y1="108" x2="338" y2="108" stroke="#64748b" stroke-width="1"/>
          <line x1="216" y1="108" x2="216" y2="52" stroke="#64748b" stroke-width="1"/>
          <!-- Unmuffled peak -->
          <path d="M220,96 Q256,88 282,56 Q308,82 334,94" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2"/>
          <!-- Muffled smooth curve -->
          <path d="M220,98 Q256,94 282,82 Q308,92 334,98" fill="none" stroke="#0d9488" stroke-width="2.2"/>
          <line x1="282" y1="58" x2="282" y2="79" stroke="#059669" stroke-width="1.4" marker-end="url(#a-SH178-green)"/>
          <text x="312" y="68" text-anchor="middle" font-size="6.5" font-weight="800" fill="#047857">−6 dB</text>
          <text x="276" y="119" text-anchor="middle" font-size="6.2" fill="#475569">周波数 1.5–6 kHz 帯域</text>
          ${pill(276, 134, 128, 12, 'メイン基板側への共鳴伝達も遮断', '#f0fdfa', '#0d9488', '#115e59', 6.4)}
        `,
        caption: 'Sony純正背面吸音クッション(Ref.59/76)で1.5–6 kHzピーク音を4〜7 dB減衰',
      });

    case 'shutter_fram_adaptive_wear_log':
      return shutterFrame({
        code: 'SH179',
        title: '不揮発FRAM回数ログ＆経年幕速アダプティブ学習',
        viewTag: '自己学習',
        accent: '#6366f1',
        headerBg: '#eef2ff',
        body: `
          <!-- Closed-loop adaptive calibration diagram -->
          <rect x="12" y="29" width="336" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="180" y="42" text-anchor="middle" font-size="7.4" font-weight="700" fill="#0f172a">50万回にわたるバネへたり・温度変化を毎ショット自動学習＆補正</text>
          <!-- 4 block feedback loop -->
          ${pill(60, 74, 80, 26, '4ch光電実測 Δt', '#ede9fe', '#7c3aed', '#4c1d95', 6.7)}
          <line x1="100" y1="74" x2="124" y2="74" stroke="#6366f1" stroke-width="1.6" marker-end="url(#a-SH179-purple)"/>
          ${pill(176, 74, 96, 28, '不揮発 FRAM 学習表', '#4f46e5', '#312e81', '#ffffff', 6.8)}
          <line x1="224" y1="74" x2="248" y2="74" stroke="#6366f1" stroke-width="1.6" marker-end="url(#a-SH179-purple)"/>
          ${pill(296, 74, 86, 26, '放出タイミング補正', '#dcfce7', '#16a34a', '#166534', 6.6)}
          <!-- NTC temperature input into FRAM -->
          ${pill(176, 112, 108, 16, 'NTC温度 + 総作動回数', '#fef3c7', '#d97706', '#92400e', 6.5)}
          <line x1="176" y1="103" x2="176" y2="90" stroke="#d97706" stroke-width="1.4" marker-end="url(#a-SH179-amber)"/>
          <!-- Formula left & right -->
          <text x="64" y="109" text-anchor="middle" font-size="6.4" font-weight="700" fill="#4338ca">10¹²回書換耐性</text>
          <text x="64" y="119" text-anchor="middle" font-size="6.2" fill="#475569">EXIF回数も記録</text>
          <text x="294" y="109" text-anchor="middle" font-size="6.4" font-weight="700" fill="#047857">±0.05 EV 維持</text>
          <text x="294" y="119" text-anchor="middle" font-size="6.2" fill="#475569">1/8000 s 新品同等</text>
          ${pill(180, 134, 306, 13, 't_rear = t_exp + (Δt₁−Δt₂)_learned + Δt_rel(I, T_NTC)', '#e0e7ff', '#6366f1', '#312e81', 6.6)}
        `,
        caption: 'FRAMが幕速ドリフトと温度特性を自動学習し、50万回後も新品同等の精度を維持',
      });

    case 'shutter_acoustic_laser_qc_rig':
      return shutterFrame({
        code: 'SH180',
        title: '工場出荷 レーザー3点幕速＆音響FFT全数検査',
        viewTag: '出荷品質保証',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: JIS B 7091 3-point laser curtain speed optical rig -->
          <rect x="12" y="29" width="166" height="116" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="95" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">① JIS B 7091 3点レーザー幕速検査</text>
          <!-- Shutter frame with 3 horizontal laser beams -->
          <rect x="44" y="50" width="102" height="58" rx="3" fill="#ffffff" stroke="#334155" stroke-width="1.3"/>
          <line x1="22" y1="60" x2="164" y2="60" stroke="#dc2626" stroke-width="1.5" marker-end="url(#a-SH180-red)"/>
          <line x1="22" y1="79" x2="164" y2="79" stroke="#dc2626" stroke-width="1.5" marker-end="url(#a-SH180-red)"/>
          <line x1="22" y1="98" x2="164" y2="98" stroke="#dc2626" stroke-width="1.5" marker-end="url(#a-SH180-red)"/>
          <text x="95" y="57.5" text-anchor="middle" font-size="6.1" font-weight="700" fill="#dc2626">上端 (Top)</text>
          <text x="95" y="76.5" text-anchor="middle" font-size="6.1" font-weight="700" fill="#dc2626">中央 (Center)</text>
          <text x="95" y="95.5" text-anchor="middle" font-size="6.1" font-weight="700" fill="#dc2626">下端 (Bottom)</text>
          <text x="95" y="120" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1" style="font-family:${FONT_MONO};">U_exp ≤ 0.25 EV / 0.1 μs</text>
          ${pill(95, 134, 148, 12, '全数で先幕・後幕ムラ＆バウンド検査', '#e0f2fe', '#0284c7', '#075985', 6.4)}
          <!-- Right: Acoustic FFT anomaly detection -->
          <rect x="186" y="29" width="162" height="116" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="267" y="42" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">② 音響波形 FFT 異常診断ポート</text>
          <line x1="198" y1="106" x2="338" y2="106" stroke="#64748b" stroke-width="1"/>
          <line x1="198" y1="106" x2="198" y2="52" stroke="#64748b" stroke-width="1"/>
          <!-- Normal spectrum -->
          <path d="M200,104 L216,84 L232,96 L252,74 L274,94 L300,88 L334,102" fill="none" stroke="#059669" stroke-width="1.9"/>
          <!-- NG resonance spike -->
          <path d="M286,91 L294,56 L302,89" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
          <text x="314" y="61" text-anchor="middle" font-size="6.2" font-weight="700" fill="#dc2626">NG異常共振</text>
          <text x="234" y="68" text-anchor="middle" font-size="6.3" font-weight="700" fill="#047857">正常波形マスク</text>
          <text x="267" y="119" text-anchor="middle" font-size="6.3" fill="#475569">羽根擦れ・ギア傷・バネ異音を音で即発見</text>
          ${pill(267, 134, 142, 12, '100%合格品のみカメラ本体へ搭載', '#dcfce7', '#16a34a', '#166534', 6.5)}
        `,
        caption: '出荷時にJIS B 7091 3点レーザー＆音響FFT全数診断で0.1 μs精度を保証',
      });

    default:
      return null;
  }
}
