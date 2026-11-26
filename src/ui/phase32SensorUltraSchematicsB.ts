import { PartExplanation } from '../assemblies/types';
import { pill, sensorFrame } from './sensorUltraSchematicFrame';

/**
 * Phase 32 Ultra-Detailed Sensor & 5-Axis IBIS Technical Schematics — Part B (S31–S60)
 * Full-width 360x176 accurate thermal, electrical, OEM optical stack, and IBIS mechanics cutaways.
 */
export function renderPhase32SensorUltraSchematicB(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // S31 — Sigma-Folded Pyrolytic Graphite Thermal Bridge (sigma_graphite)
    // =========================================================================
    case 'sigma_graphite':
      return sensorFrame({
        code: 'S31',
        title: 'Σ字型 異方性人工グラファイト（PGS）柔軟熱橋',
        viewTag: '柔軟放熱断面',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Left: Moving IBIS Sensor PCB (Hot Source) -->
          <rect x="16" y="42" width="66" height="86" rx="4" fill="#064e3b" stroke="#047857" stroke-width="1.2"/>
          <text x="49" y="74" text-anchor="middle" font-size="7.3" font-weight="800" fill="#ffffff">IBIS可動</text>
          <text x="49" y="85" text-anchor="middle" font-size="7.1" font-weight="700" fill="#a7f3d0">センサーPCB</text>
          <text x="49" y="99" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fca5a5">発熱源 (熱)</text>
          <!-- Motion arrows on left -->
          <line x1="49" y1="30" x2="49" y2="40" stroke="#0284c7" stroke-width="1.5" marker-start="url(#a-S31-cyan)"/>
          <line x1="49" y1="130" x2="49" y2="140" stroke="#0284c7" stroke-width="1.5" marker-end="url(#a-S31-cyan)"/>
          <!-- Right: Stationary Pure Copper Heatsink -->
          <rect x="278" y="42" width="66" height="86" rx="4" fill="#b45309" stroke="#78350f" stroke-width="1.2"/>
          <text x="311" y="76" text-anchor="middle" font-size="7.3" font-weight="800" fill="#ffffff">固定側</text>
          <text x="311" y="87" text-anchor="middle" font-size="7.1" font-weight="700" fill="#fef3c7">純銅放熱板</text>
          <text x="311" y="101" text-anchor="middle" font-size="6.8" font-weight="700" fill="#bae6fd">ボディへ排熱</text>
          <!-- True Sigma (Σ) Accordion Folded PGS Bridge connecting Left -> Right -->
          <path d="M82,58 L140,58 C156,58 156,72 140,76 L112,82 C96,86 96,100 112,104 L184,104 C200,104 200,88 184,84 L160,78 C144,74 144,62 162,62 L278,62" fill="none" stroke="#1e293b" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Heat flow tracer arrows inside the graphite ribbon -->
          <path d="M84,58 L138,58 C151,58 151,72 138,76 L112,82 C101,86 101,100 112,104 L184,104 C195,104 195,88 184,84 L160,78 C149,74 149,62 162,62 L274,62" fill="none" stroke="#f97316" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#a-S31-amber)"/>
          <!-- Top spec pill -->
          ${pill(180, 40, 174, 16, '面内熱伝導 1,500–1,700 W/m·K (銅の4倍)', '#fff7ed', '#ea580c', '#9a3412', 7)}
          <!-- Bottom hexagonal graphene sp2 explanation -->
          <rect x="96" y="121" width="168" height="23" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="180" y="132" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1e293b">高配向 sp² 炭素六角網面 ＆ 低剛性蛇腹折</text>
          <text x="180" y="141" text-anchor="middle" font-size="6.4" fill="#0369a1">IBIS 8.5段の微小動作を妨げず熱だけ高速輸送</text>
        `,
        caption: '純銅の約4倍の熱伝導を持つ人工黒鉛をΣ字蛇腹折にし、IBIS追従と高速排熱を両立',
      });

    // =========================================================================
    // S32 — Perimeter Copper-Graphite Heat Transfer Tapes (sensor_heat_tapes)
    // =========================================================================
    case 'sensor_heat_tapes':
      return sensorFrame({
        code: 'S32',
        title: '外周 銅箔ラミネート・グラファイト熱伝達テープ',
        viewTag: '3層構造・並列排熱',
        accent: '#c2410c',
        headerBg: '#fff7ed',
        body: `
          <!-- LEFT: 3-Layer Laminated Tape Micro Cross-Section (0.15 mm) -->
          <rect x="14" y="30" width="144" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="86" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">総厚 0.15mm 3層ラミネート</text>
          <rect x="26" y="54" width="120" height="18" rx="2" fill="#334155"/>
          <text x="86" y="65.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#ffffff">① 人工グラファイト (面内拡散)</text>
          <rect x="26" y="74" width="120" height="16" rx="2" fill="#d97706"/>
          <text x="86" y="84.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#ffffff">② 電解銅箔 (強度＋EMI遮蔽)</text>
          <rect x="26" y="92" width="120" height="14" rx="2" fill="#fde68a" stroke="#ca8a04"/>
          <text x="86" y="101.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#854d0e">③ 導電熱粘着層 (段差密着)</text>
          <text x="86" y="122" text-anchor="middle" font-size="6.8" font-weight="700" fill="#9a3412">熱伝導 1,500 W/m·K + EMI接地</text>
          <text x="86" y="135" text-anchor="middle" font-size="6.6" fill="#475569">立体段差へピタリと密着貼付</text>
          <!-- RIGHT: 4-Edge Parallel Thermal Bridge to Chassis -->
          <rect x="166" y="30" width="182" height="114" rx="5" fill="#ffffff" stroke="#fdba74"/>
          <text x="257" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#9a3412">センサー外周4辺 → 骨格への並列排熱</text>
          <!-- Outer body chassis ring -->
          <rect x="180" y="50" width="154" height="72" rx="6" fill="#e2e8f0" stroke="#475569" stroke-width="1.2"/>
          <!-- Inner sensor frame -->
          <rect x="218" y="67" width="78" height="38" rx="3" fill="#1e3a8a"/>
          <text x="257" y="84" text-anchor="middle" font-size="7.1" font-weight="700" fill="#ffffff">IBISセンサー枠</text>
          <text x="257" y="95" text-anchor="middle" font-size="6.4" fill="#93c5fd">中央Σ橋と併用</text>
          <!-- 4 Perimeter Copper-Graphite Bridge Tapes (Top, Bottom, Left, Right) -->
          <rect x="242" y="50" width="30" height="17" fill="#ea580c" opacity="0.88"/>
          <rect x="242" y="105" width="30" height="17" fill="#ea580c" opacity="0.88"/>
          <rect x="180" y="76" width="38" height="20" fill="#ea580c" opacity="0.88"/>
          <rect x="296" y="76" width="38" height="20" fill="#ea580c" opacity="0.88"/>
          <!-- Outward heat flow arrows -->
          <line x1="257" y1="65" x2="257" y2="53" stroke="#fef08a" stroke-width="1.6" marker-end="url(#a-S32-amber)"/>
          <line x1="257" y1="107" x2="257" y2="119" stroke="#fef08a" stroke-width="1.6" marker-end="url(#a-S32-amber)"/>
          <line x1="215" y1="86" x2="185" y2="86" stroke="#fef08a" stroke-width="1.6" marker-end="url(#a-S32-amber)"/>
          <line x1="299" y1="86" x2="329" y2="86" stroke="#fef08a" stroke-width="1.6" marker-end="url(#a-S32-amber)"/>
          <text x="257" y="136" text-anchor="middle" font-size="7" font-weight="700" fill="#059669">8K/4K60p 連続撮影時の平衡温度 −4〜6℃</text>
        `,
        caption: '中央Σ熱橋に加えて外周4辺から銅箔グラファイトテープで並列放熱し連続動画温度を低減',
      });

    // =========================================================================
    // S33 — SLVS-EC B2B Connector Clamp & RF Shield Bracket (sensor_b2b_bracket)
    // =========================================================================
    case 'sensor_b2b_bracket':
      return sensorFrame({
        code: 'S33',
        title: 'SLVS-EC B2Bコネクタ固定クランプ ＆ RF遮蔽板',
        viewTag: '締結・遮蔽断面',
        accent: '#0f766e',
        headerBg: '#f0fdfa',
        body: `
          <!-- Incoming/Outgoing GHz RF noise blocked cleanly above bracket -->
          <path d="M128,36 L140,42 L134,47 L148,51" fill="none" stroke="#dc2626" stroke-width="1.5"/>
          <path d="M232,36 L220,42 L226,47 L212,51" fill="none" stroke="#dc2626" stroke-width="1.5"/>
          ${pill(180, 39, 134, 15, 'GHz帯 RF放射ノイズ遮断', '#fef2f2', '#dc2626', '#b91c1c', 7)}
          <!-- SUS304 Stamped Retention Clamp Plate with M1.4 Screws at left & right -->
          <path d="M36,64 L88,64 L96,55 L264,55 L272,64 L324,64 L324,73 L268,73 L260,64 L100,64 L92,73 L36,73 Z" fill="#94a3b8" stroke="#334155" stroke-width="1.2"/>
          <!-- M1.4 Screws -->
          <rect x="52" y="54" width="14" height="9" rx="1.5" fill="#475569"/>
          <rect x="56" y="63" width="6" height="58" fill="#64748b"/>
          <rect x="294" y="54" width="14" height="9" rx="1.5" fill="#475569"/>
          <rect x="298" y="63" width="6" height="58" fill="#64748b"/>
          <!-- High-Resilience Shock Sponge Pad pressing evenly on B2B connector -->
          <rect x="104" y="65" width="152" height="14" rx="2" fill="#fed7aa" stroke="#ea580c" stroke-width="1"/>
          <text x="180" y="74.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#9a3412">高反発 防振ウレタンスポンジ（均等押圧）</text>
          <!-- SLVS-EC FPC Plug + PCB Receptacle B2B Mated Pair -->
          <rect x="108" y="80" width="144" height="14" rx="2" fill="#f59e0b" stroke="#b45309"/>
          <text x="180" y="89.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#ffffff">SLVS-EC v3 フレキ側プラグ (128Gbps)</text>
          <rect x="108" y="95" width="144" height="13" rx="2" fill="#1e293b" stroke="#0f172a"/>
          <text x="180" y="104" text-anchor="middle" font-size="6.7" font-weight="700" fill="#93c5fd">基板側 B2B レセプタクル</text>
          <!-- Rigid PCB Base + Multi-point Chassis GND -->
          <rect x="34" y="109" width="292" height="15" rx="2" fill="#065f46" stroke="#047857"/>
          <text x="180" y="119" text-anchor="middle" font-size="7" font-weight="700" fill="#d1fae5">センサーPCB ＋ シャーシ多点GND接地（低インピーダンス）</text>
          <!-- Bottom clear callouts -->
          <text x="60" y="138" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">M1.4ビス4点固定</text>
          <text x="180" y="138" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0f766e">落下衝撃でもB2Bコネクタ浮き・抜けゼロ</text>
          <text x="300" y="138" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">SUS304絞り板</text>
        `,
        caption: 'SUS304抑え板と緩衝スポンジで128Gbps高速B2Bコネクタの衝撃脱落防止とRF遮蔽を同時達成',
      });

    // =========================================================================
    // S34 — Stationary Pure-Copper Micro-Fin Heatsink (sensor_copper_sink)
    // =========================================================================
    case 'sensor_copper_sink':
      return sensorFrame({
        code: 'S34',
        title: '背面 純銅 C1020 マイクロフィン放熱板（17条）',
        viewTag: '放熱フィン断面',
        accent: '#b45309',
        headerBg: '#fffbeb',
        body: `
          <!-- Heat arriving from Σ-graphite bridge at top center -->
          <line x1="164" y1="28" x2="164" y2="45" stroke="#dc2626" stroke-width="2" marker-end="url(#a-S34-red)"/>
          <line x1="180" y1="28" x2="180" y2="45" stroke="#dc2626" stroke-width="2" marker-end="url(#a-S34-red)"/>
          <line x1="196" y1="28" x2="196" y2="45" stroke="#dc2626" stroke-width="2" marker-end="url(#a-S34-red)"/>
          <text x="275" y="40" text-anchor="middle" font-size="7.1" font-weight="700" fill="#dc2626">Σ熱橋からの集中熱入力</text>
          <!-- Layer 1: Front Laminated PGS Graphite Lateral Spreader -->
          <rect x="28" y="48" width="304" height="12" rx="2" fill="#334155"/>
          <text x="180" y="56.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fde047">前面 ラミネート人工グラファイト拡散箔（← 水平均一拡散 →）</text>
          <!-- Layer 2: Oxygen-Free Pure Copper C1020 Base Plate (k=398 W/mK) -->
          <rect x="28" y="60" width="304" height="22" rx="1.5" fill="#d97706" stroke="#92400e" stroke-width="1"/>
          <text x="180" y="74" text-anchor="middle" font-size="7.5" font-weight="800" fill="#ffffff">無酸素純銅 C1020 ベース板（k ≈ 398 W/m·K 高熱容量）</text>
          <!-- Layer 3: 17 Skived Precision Micro-Fins on rear -->
          ${Array.from({ length: 17 }, (_, i) => {
            const x = 35 + i * 17.5;
            return `<rect x="${x}" y="82" width="8.5" height="26" rx="1" fill="#b45309" stroke="#78350f" stroke-width="0.6"/>`;
          }).join('')}
          <!-- Heat dissipation waves cleanly below fins (NO overlapping text!) -->
          ${[65, 122, 180, 238, 295]
            .map(
              (x) =>
                `<line x1="${x}" y1="110" x2="${x}" y2="122" stroke="#f97316" stroke-width="1.6" marker-end="url(#a-S34-amber)"/>`
            )
            .join('')}
          <!-- Clean bottom summary badges -->
          ${pill(92, 136, 146, 16, '17条マイクロフィン (表面積 2.4×)', '#fef3c7', '#d97706', '#92400e', 7)}
          ${pill(264, 136, 152, 16, 'マグネシウム外装へ放散 (8K長回)', '#eff6ff', '#0284c7', '#0369a1', 7)}
        `,
        caption: 'グラファイト拡散箔＋純銅C1020の17条マイクロフィンでファンレス長時間8K録画を実現',
      });

    // =========================================================================
    // S35 — Wrap-Around SLVS-EC FPC Guide Bracket (sensor_wrap_fpc_bracket)
    // =========================================================================
    case 'sensor_wrap_fpc_bracket':
      return sensorFrame({
        code: 'S35',
        title: '背面回り込み SLVS-EC フレキガイド ＆ 応力緩和板',
        viewTag: '曲げ半径R断面',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Floating IBIS Sensor Unit at top -->
          <rect x="28" y="34" width="166" height="26" rx="4" fill="#1e3a8a" stroke="#0f172a"/>
          <text x="111" y="50" text-anchor="middle" font-size="7.4" font-weight="700" fill="#ffffff">IBIS 可動センサーユニット (±4.5mm)</text>
          <!-- Fixed Mainboard below -->
          <rect x="28" y="106" width="166" height="24" rx="4" fill="#065f46" stroke="#047857"/>
          <text x="111" y="121" text-anchor="middle" font-size="7.4" font-weight="700" fill="#d1fae5">固定側メイン基板 (BIONZ XR)</text>
          <!-- SUS304 Smooth Radius Guide Bracket (R >= 1.8mm) on right -->
          <path d="M210,56 L246,56 C272,56 272,110 246,110 L210,110 L210,98 L242,98 C256,98 256,68 242,68 L210,68 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
          <!-- Low-friction protective liner on inner bend -->
          <path d="M194,48 L250,48 C288,48 288,118 250,118 L194,118" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round"/>
          <path d="M194,48 L250,48 C288,48 288,118 250,118 L194,118" fill="none" stroke="#fef08a" stroke-width="1.8" stroke-dasharray="5 3"/>
          <!-- Radius callout inside curve -->
          <line x1="246" y1="83" x2="274" y2="68" stroke="#0284c7" stroke-width="1.3" marker-end="url(#a-S35-cyan)"/>
          <circle cx="246" cy="83" r="2.4" fill="#0284c7"/>
          <rect x="196" y="75" width="44" height="13" rx="2.5" fill="#ffffff" stroke="#7dd3fc" stroke-width="0.7"/>
          <text x="218" y="84" text-anchor="middle" font-size="6.8" font-weight="800" fill="#0369a1">R ≥ 1.8mm</text>
          <!-- Right clean callout badges -->
          <text x="322" y="54" text-anchor="middle" font-size="7.1" font-weight="700" fill="#9a3412">U字折返し</text>
          <text x="322" y="65" text-anchor="middle" font-size="6.8" fill="#9a3412">16Gbps FPC</text>
          ${pill(318, 88, 62, 18, '1,000万回', '#ecfdf5', '#059669', '#065f46', 7)}
          <text x="318" y="109" text-anchor="middle" font-size="6.6" fill="#334155">屈曲断線ゼロ</text>
          <text x="318" y="121" text-anchor="middle" font-size="6.6" fill="#475569">SUS304保護</text>
          <text x="111" y="84" text-anchor="middle" font-size="7" font-weight="700" fill="#475569">急折れ・銅箔疲労クラックを物理規制</text>
          <text x="111" y="95" text-anchor="middle" font-size="6.6" fill="#0369a1">低摩擦ライナーでEMI被膜の擦過を防止</text>
        `,
        caption: 'SUS304ガイドが背面折返しフレキの曲率半径をR≥1.8mmに保ち1,000万回屈曲でも断線ゼロ',
      });

    // =========================================================================
    // S36 — Factory Laser-Interferometer Torx-T6 Calibration Collar (sensor_torx_spring_cal)
    // =========================================================================
    case 'sensor_torx_spring_cal':
      return sensorFrame({
        code: 'S36',
        title: '工場レーザー干渉計 Torx-T6 校正座 ＆ 封印樹脂',
        viewTag: '校正・封印断面',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- LEFT: Laser Interferometer Overhead Verification -->
          <rect x="14" y="30" width="148" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="88" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#1e40af">レーザー干渉計 平行度計測</text>
          <rect x="52" y="51" width="72" height="16" rx="3" fill="#1e293b"/>
          <text x="88" y="61.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#38bdf8">レーザー干渉ヘッド</text>
          <!-- 3 vertical laser measurement rays -->
          <line x1="62" y1="67" x2="62" y2="104" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="3 2" marker-end="url(#a-S36-red)"/>
          <line x1="88" y1="67" x2="88" y2="104" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="3 2" marker-end="url(#a-S36-red)"/>
          <line x1="114" y1="67" x2="114" y2="104" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="3 2" marker-end="url(#a-S36-red)"/>
          <!-- Sensor optical plane leveled to ±2um -->
          <rect x="34" y="106" width="108" height="10" rx="2" fill="#0284c7"/>
          <text x="88" y="113.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#ffffff">CMOS像面 (平行度 ±2µm)</text>
          <text x="88" y="133" text-anchor="middle" font-size="6.9" font-weight="700" fill="#059669">1°回転 ≈ 1.0 µm (P=0.35mm)</text>
          <!-- RIGHT: Torx-T6 Collar + Blue Epoxy Seal + Brass Washer Cutaway -->
          <rect x="170" y="30" width="178" height="114" rx="5" fill="#ffffff" stroke="#93c5fd"/>
          <text x="259" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">Torx-T6 極細ねじ ＆ 青色封印断面</text>
          <!-- Torx screw head + blue epoxy tamper dot -->
          <rect x="196" y="54" width="28" height="10" rx="2" fill="#334155"/>
          <circle cx="226" cy="57" r="5" fill="#2563eb" stroke="#1d4ed8"/>
          <rect x="206" y="64" width="8" height="62" fill="#64748b"/>
          <!-- Brass thrust washer -->
          <rect x="190" y="65" width="40" height="5" rx="1" fill="#eab308"/>
          <!-- IBIS plate -->
          <rect x="180" y="70" width="60" height="11" rx="2" fill="#cbd5e1" stroke="#475569"/>
          <!-- Preload coil spring -->
          <polyline points="198,83 222,88 198,94 222,100 198,106 222,111" fill="none" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/>
          <rect x="180" y="113" width="60" height="13" rx="2" fill="#475569"/>
          <!-- Right callouts -->
          <line x1="232" y1="57" x2="250" y2="57" stroke="#2563eb" stroke-width="0.9"/>
          <text x="253" y="60" font-size="6.8" font-weight="700" fill="#1d4ed8">青色エポキシ封印</text>
          <line x1="230" y1="68" x2="250" y2="73" stroke="#ca8a04" stroke-width="0.9"/>
          <text x="253" y="76" font-size="6.8" font-weight="700" fill="#a16207">低摩擦 真鍮座金</text>
          <line x1="224" y1="96" x2="250" y2="96" stroke="#d97706" stroke-width="0.9"/>
          <text x="253" y="99" font-size="6.8" font-weight="700" fill="#b45309">高直線予圧バネ</text>
          <text x="259" y="137" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1e40af">振動によるズレを永久ロック</text>
        `,
        caption: '工場レーザー干渉計で±2µm追い込んだTorx-T6座を青色エポキシ封印しF1.2片ボケを根絶',
      });

    // =========================================================================
    // S37 — 25µm Perimeter Pyrolytic Graphite Thermal Wings (sensor_perimeter_graphite)
    // =========================================================================
    case 'sensor_perimeter_graphite':
      return sensorFrame({
        code: 'S37',
        title: 'IBIS追従 25µm極薄 ペリメーターグラファイト翼',
        viewTag: '均熱・蛇腹断面',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- Top-down uniform thermal spreading across moving stage -->
          <rect x="14" y="30" width="166" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="97" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">センサー面内 均熱化 (±0.5℃以内)</text>
          <!-- Left & right accordion wings flanking IBIS stage -->
          <path d="M26,56 L42,64 L26,72 L42,80 L26,88 L42,96 L26,104 L42,112" fill="none" stroke="#334155" stroke-width="3" stroke-linejoin="round"/>
          <path d="M168,56 L152,64 L168,72 L152,80 L168,88 L152,96 L168,104 L152,112" fill="none" stroke="#334155" stroke-width="3" stroke-linejoin="round"/>
          <!-- Central moving IBIS sensor plate with even temperature gradient -->
          <rect x="46" y="54" width="102" height="60" rx="4" fill="#1e293b" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="54" y="62" width="86" height="44" rx="3" fill="#f97316" opacity="0.28"/>
          <text x="97" y="81" text-anchor="middle" font-size="7.3" font-weight="800" fill="#ffffff">IBIS可動ステージ</text>
          <text x="97" y="93" text-anchor="middle" font-size="6.7" font-weight="700" fill="#fde047">面内温度差 ≤ ±0.5℃</text>
          <!-- Lateral thermal arrows -->
          <line x1="60" y1="84" x2="36" y2="84" stroke="#f97316" stroke-width="1.6" marker-end="url(#a-S37-amber)"/>
          <line x1="134" y1="84" x2="158" y2="84" stroke="#f97316" stroke-width="1.6" marker-end="url(#a-S37-amber)"/>
          <text x="97" y="132" text-anchor="middle" font-size="6.8" font-weight="700" fill="#c2410c">画面隅の熱シェーディング(赤カブリ)防止</text>
          <!-- RIGHT: Ultra-thin 25µm PGS foil mechanical & thermal comparison -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">極薄 25µm PGS 蛇腹翼の特性</text>
          ${pill(268, 63, 136, 18, '面内熱伝導 1,650 W/m·K', '#fff7ed', '#ea580c', '#9a3412', 7.1)}
          ${pill(268, 88, 136, 18, 'IBIS復元反力 < 0.02 N', '#ecfdf5', '#059669', '#065f46', 7.1)}
          <text x="268" y="114" text-anchor="middle" font-size="6.9" fill="#334155">・コピー用紙の1/4の極薄25µm箔</text>
          <text x="268" y="126" text-anchor="middle" font-size="6.9" fill="#334155">・8.5段IBIS高速応答を一切妨害せず</text>
          <text x="268" y="138" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0369a1">・長秒夜景の周辺熱ノイズを均等抑制</text>
        `,
        caption: '厚さ25µmの蛇腹PGS放熱翼が反力0.02N未満でIBISに追従し、像面の温度ムラを±0.5℃に均熱',
      });

    // =========================================================================
    // S38 — On-Sensor Ultra-Low-Noise Analog LDO & Star-GND (sensor_analog_ldo_rail)
    // =========================================================================
    case 'sensor_analog_ldo_rail':
      return sensorFrame({
        code: 'S38',
        title: 'センサー基板直載 超低ノイズ LDO ＆ 星形GND',
        viewTag: '電源浄化回路',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Left: Noisy PMIC Input Waveform -->
          <rect x="14" y="34" width="76" height="58" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="52" y="46" text-anchor="middle" font-size="6.9" font-weight="700" fill="#b91c1c">PMIC入力</text>
          <polyline points="20,68 26,58 32,76 38,56 44,75 50,59 56,74 62,57 68,75 74,60 82,68" fill="none" stroke="#dc2626" stroke-width="1.5"/>
          <text x="52" y="86" text-anchor="middle" font-size="6.3" fill="#991b1b">スイッチング雑音</text>
          <!-- Arrow into LDO -->
          <line x1="90" y1="63" x2="112" y2="63" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-S38-red)"/>
          <!-- Center: Ultra-Low-Noise LDO IC (5mm from Die!) -->
          <rect x="115" y="34" width="96" height="58" rx="5" fill="#1e293b" stroke="#d97706" stroke-width="1.6"/>
          <text x="163" y="49" text-anchor="middle" font-size="7.6" font-weight="800" fill="#fde047">超低ノイズ LDO</text>
          <text x="163" y="63" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">PSRR &gt; 85 dB</text>
          <text x="163" y="75" text-anchor="middle" font-size="6.8" font-weight="700" fill="#a7f3d0">雑音 &lt; 4 µV_rms</text>
          <text x="163" y="86" text-anchor="middle" font-size="6.2" fill="#cbd5e1">ダイ直下 5mm最短配置</text>
          <!-- Arrow out of LDO -->
          <line x1="211" y1="63" x2="233" y2="63" stroke="#059669" stroke-width="1.8" marker-end="url(#a-S38-green)"/>
          <!-- Right: Clean Flat Analog Outputs -->
          <rect x="236" y="34" width="110" height="58" rx="4" fill="#ecfdf5" stroke="#34d399"/>
          <text x="291" y="46" text-anchor="middle" font-size="6.9" font-weight="700" fill="#065f46">独立クリーン電源</text>
          <line x1="244" y1="57" x2="338" y2="57" stroke="#059669" stroke-width="2"/>
          <text x="291" y="68" text-anchor="middle" font-size="6.6" font-weight="700" fill="#047857">V_PIX 2.8V / V_ANA 1.8V</text>
          <text x="291" y="79" text-anchor="middle" font-size="6.6" fill="#065f46">V_REF 基準電圧 (平坦!)</text>
          <text x="291" y="88" text-anchor="middle" font-size="6.2" fill="#059669">低ESRタンタル直結</text>
          <!-- Bottom: Star-Ground Copper Bar isolating Analog vs Digital return currents -->
          <rect x="14" y="102" width="332" height="40" rx="5" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.1"/>
          <text x="180" y="115" text-anchor="middle" font-size="7.3" font-weight="800" fill="#92400e">星形（スター）グラウンド銅バー — 帰還電流の回り込み完全遮断</text>
          <line x1="36" y1="130" x2="174" y2="130" stroke="#059669" stroke-width="2"/>
          <line x1="186" y1="130" x2="324" y2="130" stroke="#2563eb" stroke-width="2"/>
          <circle cx="180" cy="130" r="6" fill="#eab308" stroke="#92400e" stroke-width="1.2"/>
          <text x="102" y="126.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#065f46">アナログ AGND 帰還</text>
          <text x="258" y="126.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#1e40af">SLVS-EC デジタル DGND 帰還</text>
        `,
        caption: 'ダイ直下5mmの超低ノイズLDOと星形GNDバーが、高ISO暗部のバンディングノイズを根絶',
      });

    // =========================================================================
    // S39 — Front ITO Conductive Antistatic Ring & Gold Tab (sensor_antistatic_ring)
    // =========================================================================
    case 'sensor_antistatic_ring':
      return sensorFrame({
        code: 'S39',
        title: '前面 ITO 導電帯電防止リング ＆ 金接地タブ',
        viewTag: '静電放電断面',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- Floating static dust repelled above SSWF ITO surface -->
          <circle cx="118" cy="39" r="3.2" fill="#475569"/>
          <path d="M122,42 Q132,48 142,36" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#a-S39-green)"/>
          <circle cx="204" cy="39" r="2.8" fill="#475569"/>
          <path d="M208,42 Q218,48 228,36" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#a-S39-green)"/>
          ${pill(178, 36, 118, 14, '静電吸着ゼロ (0 V 電位)', '#dcfce7', '#059669', '#065f46', 6.9)}
          <!-- SSWF Glass with top ITO Transparent Conductive Layer -->
          <rect x="52" y="64" width="212" height="20" rx="2" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
          <rect x="52" y="60" width="212" height="5" fill="#10b981"/>
          <text x="158" y="77" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0c4a6e">SSWF 超音波ガラス (前面 ITO透明導電膜)</text>
          <!-- Conductive Carbon-Silicone Antistatic Ring pressing around perimeter -->
          <rect x="44" y="52" width="26" height="14" rx="3" fill="#1e293b" stroke="#0f172a"/>
          <rect x="246" y="52" width="26" height="14" rx="3" fill="#1e293b" stroke="#0f172a"/>
          <!-- Electron discharge path flowing rightward to Gold BeCu Spring Tab -> Chassis GND -->
          <path d="M140,62.5 L268,62.5" stroke="#fef08a" stroke-width="1.8" stroke-dasharray="4 2" marker-end="url(#a-S39-amber)"/>
          <!-- Gold-plated BeCu Grounding Leaf Spring Tab -->
          <path d="M272,58 L294,58 L302,88 L322,88" fill="none" stroke="#eab308" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Camera Chassis Ground Block -->
          <rect x="308" y="88" width="38" height="34" rx="4" fill="#334155"/>
          <text x="327" y="103" text-anchor="middle" font-size="7" font-weight="800" fill="#ffffff">本体</text>
          <text x="327" y="114" text-anchor="middle" font-size="7" font-weight="800" fill="#34d399">GND 0V</text>
          <!-- Ground symbol below -->
          <line x1="327" y1="122" x2="327" y2="132" stroke="#059669" stroke-width="1.5"/>
          <line x1="317" y1="132" x2="337" y2="132" stroke="#059669" stroke-width="1.6"/>
          <line x1="321" y1="136" x2="333" y2="136" stroke="#059669" stroke-width="1.4"/>
          <line x1="324" y1="140" x2="330" y2="140" stroke="#059669" stroke-width="1.2"/>
          <!-- Clean bottom callouts -->
          <line x1="57" y1="66" x2="57" y2="108" stroke="#1e293b" stroke-width="0.9"/>
          <text x="20" y="118" font-size="6.9" font-weight="700" fill="#1e293b">導電カーボンシリコーン環</text>
          <text x="20" y="130" font-size="6.7" fill="#475569">光束非干渉の外周360°接触</text>
          ${pill(224, 118, 128, 17, '放電抵抗 < 1 kΩ (μs逃がし)', '#fef9c3', '#ca8a04', '#854d0e', 7)}
          <text x="224" y="138" text-anchor="middle" font-size="6.7" fill="#065f46">金メッキBeCu接地ばねタブ</text>
        `,
        caption: 'シャッター摩擦で生じる静電気をITO膜→導電環→金タブで瞬時放電しホコリ吸着を防止',
      });

    // =========================================================================
    // S40 — Optical IBIS Home-Index Photo-Interrupter (sensor_ibis_optical_ref)
    // =========================================================================
    case 'sensor_ibis_optical_ref':
      return sensorFrame({
        code: 'S40',
        title: 'IBIS 原点検証 光学フォトインタラプタ ＆ 基準スリット',
        viewTag: '光学原点検出',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- LEFT: Transmissive IR Photo-Interrupter Cutaway -->
          <rect x="14" y="30" width="166" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="97" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#5b21b6">透過型 赤外フォトインタラプタ</text>
          <!-- U-shaped black optical interrupter housing -->
          <rect x="26" y="54" width="38" height="62" rx="3" fill="#1e293b"/>
          <text x="45" y="82" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fca5a5">IR LED</text>
          <text x="45" y="93" text-anchor="middle" font-size="6.2" fill="#e2e8f0">赤外投光</text>
          <rect x="130" y="54" width="38" height="62" rx="3" fill="#1e293b"/>
          <text x="149" y="82" text-anchor="middle" font-size="6.8" font-weight="700" fill="#93c5fd">PD受光</text>
          <text x="149" y="93" text-anchor="middle" font-size="6.2" fill="#e2e8f0">エッジ検知</text>
          <!-- Etched stainless slit flag attached to IBIS moving stage -->
          <rect x="92" y="52" width="10" height="27" fill="#475569"/>
          <rect x="92" y="91" width="10" height="27" fill="#475569"/>
          <!-- Narrow IR beam passing through exact 0.5mm precision slit -->
          <line x1="64" y1="85" x2="128" y2="85" stroke="#dc2626" stroke-width="2.2" marker-end="url(#a-S40-red)"/>
          <text x="97" y="131" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">低熱膨張ステンレス微細スリット標的</text>
          <!-- RIGHT: Sharp Edge Step Signal & Thermal Drift Reset -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#ffffff" stroke="#c4b5fd"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#5b21b6">受光波形：絶対機械原点 (≤ ±0.4µm)</text>
          <!-- Step waveform axes -->
          <line x1="202" y1="100" x2="334" y2="100" stroke="#64748b" stroke-width="1"/>
          <line x1="202" y1="54" x2="202" y2="100" stroke="#64748b" stroke-width="1"/>
          <!-- Sharp pulse at X=0 origin -->
          <polyline points="204,96 250,96 254,58 282,58 286,96 332,96" fill="none" stroke="#7c3aed" stroke-width="2.2"/>
          <line x1="268" y1="52" x2="268" y2="106" stroke="#dc2626" stroke-width="1" stroke-dasharray="2 2"/>
          <text x="268" y="114" text-anchor="middle" font-size="6.8" font-weight="800" fill="#dc2626">光軸絶対原点 X=0</text>
          <text x="268" y="128" text-anchor="middle" font-size="6.6" fill="#334155">N52磁石の温度変化(−0.12%/K)をゼロ点校正</text>
          <text x="268" y="139" text-anchor="middle" font-size="6.6" font-weight="700" fill="#5b21b6">16枚ピクセルシフト・天体追尾の基準点</text>
        `,
        caption: '温度ドリフトゼロの光学スリット通過で絶対機械原点を±0.4µm校正しホール誤差を解消',
      });

    // =========================================================================
    // S41 — Sony Ref.502 Optical Filter Retaining Leaf-Spring Frame (sensor_glass_retainer_plate)
    // =========================================================================
    case 'sensor_glass_retainer_plate':
      return sensorFrame({
        code: 'S41',
        title: 'フィルター押さえバネ板 IM PLATE (SONY Ref.502)',
        viewTag: '4辺均一押圧断面',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- Main cutaway: SUS301-CSP 0.25mm leaf-spring frame pressing optical filter evenly -->
          <!-- Side snap claws gripping outer housing -->
          <path d="M36,112 L36,56 L78,56 L92,72 M324,112 L324,56 L282,56 L268,72" fill="none" stroke="#1e293b" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Distributed downward leaf-spring force arrows (total ~4.5 N) -->
          <line x1="92" y1="42" x2="92" y2="66" stroke="#2563eb" stroke-width="2" marker-end="url(#a-S41-blue)"/>
          <line x1="268" y1="42" x2="268" y2="66" stroke="#2563eb" stroke-width="2" marker-end="url(#a-S41-blue)"/>
          ${pill(180, 44, 134, 16, '4辺均一バネ押圧 (計 4.5 N)', '#eff6ff', '#2563eb', '#1e40af', 7.1)}
          <!-- Optical Filter Stack Block held without glue or point-screw stress -->
          <rect x="64" y="74" width="232" height="22" rx="2" fill="#bae6fd" stroke="#0284c7" stroke-width="1.3"/>
          <text x="180" y="88" text-anchor="middle" font-size="7.4" font-weight="800" fill="#0c4a6e">光学フィルターブロック（歪み・複屈折ゼロ保持）</text>
          <!-- Compliant spacer cushion & holder base -->
          <rect x="64" y="96" width="26" height="8" fill="#475569"/>
          <rect x="270" y="96" width="26" height="8" fill="#475569"/>
          <rect x="46" y="104" width="268" height="16" rx="2.5" fill="#64748b"/>
          <text x="180" y="114.5" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffff">フィルターホルダー受け座 ＆ 精密爪係合（非接着交換対応）</text>
          <!-- Bottom clear spec badges -->
          <text x="72" y="138" text-anchor="middle" font-size="6.9" font-weight="700" fill="#334155">SUS301-CSP t=0.25mm</text>
          <text x="180" y="138" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0f172a">艶消し黒発色 (反射 &lt;2%)</text>
          <text x="292" y="138" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0369a1">IBIS急加速ガタゼロ</text>
        `,
        caption: 'SUS301板バネの4辺均一押圧(4.5N)により、ネジ歪みゼロ・接着剤不要でフィルターを強固保持',
      });

    // =========================================================================
    // S42 — Sony Ref.503 Ultra-Thin Matte-Black Mask Plate (sensor_im_mask_plate)
    // =========================================================================
    case 'sensor_im_mask_plate':
      return sensorFrame({
        code: 'S42',
        title: '極薄黒色遮光マスク板 IM MASK (SONY Ref.503)',
        viewTag: '正面・断面図',
        accent: '#0f172a',
        headerBg: '#f1f5f9',
        body: `
          <!-- LEFT: Front Plan View (36.4x24.4mm Precision Aperture) -->
          <rect x="14" y="30" width="154" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="91" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">正面図：精密開口額縁</text>
          <rect x="28" y="51" width="126" height="72" rx="3" fill="#0f172a"/>
          <rect x="48" y="65" width="86" height="44" rx="1" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.2"/>
          <text x="91" y="84.5" text-anchor="middle" font-size="7.5" font-weight="800" fill="#0369a1">36.4 × 24.4 mm</text>
          <text x="91" y="96" text-anchor="middle" font-size="6.5" fill="#0c4a6e">フルサイズ有効開口</text>
          <text x="91" y="136" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0f172a">光学濃度 OD &gt; 5.0 (透過 10⁻⁵以下)</text>
          <!-- RIGHT: Side Cutaway showing edge-reflection cutoff -->
          <rect x="176" y="30" width="172" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="262" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">断面：ガラス切断面迷光を直前遮断</text>
          <!-- Ultra-thin 0.12mm mask plate -->
          <rect x="190" y="64" width="46" height="6" fill="#0f172a"/>
          <rect x="288" y="64" width="46" height="6" fill="#0f172a"/>
          <text x="262" y="58" text-anchor="middle" font-size="6.7" font-weight="700" fill="#334155">板厚 0.12mm (端面回折極小)</text>
          <!-- Optical filter glass underneath -->
          <rect x="206" y="74" width="112" height="22" fill="#bae6fd" stroke="#0284c7"/>
          <text x="262" y="87.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0c4a6e">光学フィルターブロック</text>
          <!-- CMOS beneath -->
          <rect x="218" y="106" width="88" height="12" fill="#1d4ed8"/>
          <text x="262" y="114.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#ffffff">CMOS 像面</text>
          <!-- Valid blue rays pass cleanly inside aperture flanking center labels (ZERO text strike-through!) -->
          <line x1="222" y1="62" x2="222" y2="104" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-S42-blue)"/>
          <line x1="302" y1="62" x2="302" y2="104" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-S42-blue)"/>
          <line x1="196" y1="48" x2="212" y2="63" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-S42-red)"/>
          <text x="204" y="135" font-size="6.7" font-weight="700" fill="#dc2626">端面反射ゴースト根絶</text>
          <text x="336" y="135" text-anchor="end" font-size="6.7" font-weight="700" fill="#0369a1">Ref.503</text>
        `,
        caption: '厚さ0.12mm・遮光濃度OD>5の極薄額縁がフィルター端面の迷光反射をピシャリ遮断',
      });

    // =========================================================================
    // S43 — Non-Outgassing Silicone Dust-Catcher Strip (sensor_dust_catcher_tape)
    // =========================================================================
    case 'sensor_dust_catcher_tape':
      return sensorFrame({
        code: 'S43',
        title: '超音波落下ホコリ捕獲・粘着ダストトラップ帯',
        viewTag: '落下捕獲断面',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Chamber cross-section: Left = Vibrating vertical SSWF glass, Right = Lower Trap Channel -->
          <!-- Vertical SSWF glass on left vibrating at 50kHz -->
          <rect x="46" y="34" width="14" height="84" rx="2" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
          <path d="M40,42 Q32,58 40,74 T40,108" fill="none" stroke="#0284c7" stroke-width="1.6"/>
          <text x="27" y="78" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">SSWF</text>
          <text x="27" y="88" text-anchor="middle" font-size="6.3" fill="#0369a1">数千G</text>
          <!-- Ejected dust trajectories falling under gravity into bottom trap -->
          <path d="M62,48 Q98,48 112,114" fill="none" stroke="#64748b" stroke-width="1.3" stroke-dasharray="3 2" marker-end="url(#a-S43-slate)"/>
          <path d="M62,72 Q130,72 152,114" fill="none" stroke="#64748b" stroke-width="1.3" stroke-dasharray="3 2" marker-end="url(#a-S43-slate)"/>
          <path d="M62,94 Q166,94 192,114" fill="none" stroke="#64748b" stroke-width="1.3" stroke-dasharray="3 2" marker-end="url(#a-S43-slate)"/>
          <text x="152" y="54" text-anchor="middle" font-size="7.2" font-weight="700" fill="#475569">超音波で剥離 → 重力落下</text>
          <text x="152" y="65" text-anchor="middle" font-size="6.6" fill="#64748b">花粉・繊維・シャッター摩耗粉 (3–200µm)</text>
          <!-- Bottom Non-Outgassing Silicone Gel Dust-Catcher Strip -->
          <rect x="74" y="116" width="154" height="18" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1.4"/>
          <!-- Permanently embedded dust particles -->
          <circle cx="112" cy="123" r="3" fill="#334155"/>
          <circle cx="152" cy="124" r="3.6" fill="#1e293b"/>
          <circle cx="192" cy="122" r="2.6" fill="#475569"/>
          <text x="152" y="145" text-anchor="middle" font-size="7" font-weight="700" fill="#854d0e">無揮発シリコーンゲル粘着帯（永久捕獲）</text>
          <!-- Right: Key reliability properties -->
          <rect x="240" y="34" width="108" height="106" rx="5" fill="#ffffff" stroke="#fde047"/>
          <text x="294" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#854d0e">光学室専用ゲル仕様</text>
          ${pill(294, 67, 94, 16, 'ガス曇りゼロ', '#ecfdf5', '#059669', '#065f46', 7)}
          <text x="294" y="88" text-anchor="middle" font-size="6.7" fill="#334155">・低アウトガス精製</text>
          <text x="294" y="101" text-anchor="middle" font-size="6.7" fill="#334155">・縦位置でも再浮遊0</text>
          <text x="294" y="114" text-anchor="middle" font-size="6.7" fill="#334155">・10年以上 粘着維持</text>
          <text x="294" y="128" text-anchor="middle" font-size="6.7" font-weight="700" fill="#ca8a04">・撮像室最下部配置</text>
        `,
        caption: '超音波で落としたホコリを無揮発シリコーン粘着帯が永久捕獲し、縦位置でも再浮遊を阻止',
      });

    // =========================================================================
    // S44 — Index-Matched UV Optical Cement Layers (sensor_optical_cement_layers)
    // =========================================================================
    case 'sensor_optical_cement_layers':
      return sensorFrame({
        code: 'S44',
        title: '屈折率整合 UV光学セメント（OCA 3層貼合）',
        viewTag: '界面反射比較',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- LEFT: Air Gap Stack (4% Fresnel reflection at EVERY interface!) -->
          <rect x="14" y="30" width="146" height="114" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="87" y="43" text-anchor="middle" font-size="7.1" font-weight="700" fill="#991b1b">空気層あり (n=1.0 境界)</text>
          <rect x="26" y="50" width="122" height="15" fill="#bae6fd" stroke="#0284c7"/>
          <text x="87" y="60" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0c4a6e">水晶 OLPF (n=1.54)</text>
          <rect x="26" y="74" width="122" height="15" fill="#a7f3d0" stroke="#059669"/>
          <text x="87" y="84" text-anchor="middle" font-size="6.6" font-weight="700" fill="#065f46">λ/4 位相差板</text>
          <rect x="26" y="98" width="122" height="15" fill="#fbcfe8" stroke="#db2777"/>
          <text x="87" y="108" text-anchor="middle" font-size="6.6" font-weight="700" fill="#9d174d">IRカットガラス</text>
          <!-- Ghost reflections bouncing in air gaps on left edge cleanly away from labels -->
          <polyline points="38,46 38,73 46,66 46,97 54,89" fill="none" stroke="#dc2626" stroke-width="1.4" marker-end="url(#a-S44-red)"/>
          <text x="87" y="126" text-anchor="middle" font-size="6.7" font-weight="700" fill="#dc2626">各界面で4%反射 → ゴースト!</text>
          <text x="87" y="137" text-anchor="middle" font-size="6.5" fill="#7f1d1d">内面多重反射でコントラスト低下</text>
          <!-- Arrow -->
          <line x1="162" y1="84" x2="176" y2="84" stroke="#0284c7" stroke-width="2" marker-end="url(#a-S44-cyan)"/>
          <!-- RIGHT: Index-Matched UV Optical Cement (n=1.52, <0.01% reflection!) -->
          <rect x="180" y="30" width="168" height="114" rx="5" fill="#f0f9ff" stroke="#38bdf8" stroke-width="1.1"/>
          <text x="264" y="43" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0c4a6e">OCA光学貼合 (n=1.52 一体化)</text>
          <!-- Tightly bonded 3-glass stack with yellow 18µm UV cement layers -->
          <rect x="190" y="51" width="114" height="17" fill="#bae6fd" stroke="#0284c7"/>
          <text x="247" y="62" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0c4a6e">前面水晶 (n≈1.54)</text>
          <rect x="190" y="68" width="114" height="5" fill="#facc15"/>
          <rect x="190" y="73" width="114" height="17" fill="#a7f3d0" stroke="#059669"/>
          <text x="247" y="84" text-anchor="middle" font-size="6.7" font-weight="700" fill="#065f46">λ/4板 ＋ 垂直水晶</text>
          <rect x="190" y="90" width="114" height="5" fill="#facc15"/>
          <rect x="190" y="95" width="114" height="17" fill="#fbcfe8" stroke="#db2777"/>
          <text x="247" y="106" text-anchor="middle" font-size="6.7" font-weight="700" fill="#9d174d">IRカット吸収ガラス</text>
          <!-- Straight clean laser ray passing cleanly along right side (NO text overlap!) -->
          <line x1="326" y1="48" x2="326" y2="112" stroke="#2563eb" stroke-width="2.2" marker-end="url(#a-S44-blue)"/>
          <text x="326" y="123" text-anchor="middle" font-size="6.1" font-weight="700" fill="#1d4ed8">透過99.8%</text>
          <text x="244" y="125" text-anchor="middle" font-size="6.7" font-weight="700" fill="#b45309">18µm 真空脱泡 UVセメント</text>
          <text x="264" y="137" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0369a1">界面反射 &lt; 0.01% · 気泡ゼロ</text>
        `,
        caption: 'ガラスと同じ屈折率(n≈1.52)のUV光学ノリで空気層を排除し、フィルター間のゴーストを根絶',
      });

    // =========================================================================
    // S45 — Sony Ref.505 Dust-Sealing Optical Gap Spacer (sensor_filter_spacer_sheet)
    // =========================================================================
    case 'sensor_filter_spacer_sheet':
      return sensorFrame({
        code: 'S45',
        title: '防塵ギャップスペーサー SHEET SPACER (Ref.505)',
        viewTag: '防塵・ボケ断面',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- Dust speck sitting on OUTER surface of optical filter (shifted cleanly to left zone) -->
          <circle cx="102" cy="37" r="3.6" fill="#dc2626"/>
          <text x="198" y="39" text-anchor="middle" font-size="7" font-weight="700" fill="#dc2626">← 表面ゴミの影は距離で大きくボケる</text>
          <!-- Top Optical Filter Block (OFB-01-187) -->
          <rect x="44" y="42" width="206" height="16" rx="1.5" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
          <text x="186" y="52.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0c4a6e">光学フィルターブロック</text>
          <!-- Dust shadow cone widening cleanly across the left side of spacer gap -->
          <polygon points="102,41 82,106 122,106" fill="#ef4444" opacity="0.18"/>
          <line x1="102" y1="41" x2="82" y2="106" stroke="#dc2626" stroke-width="1" stroke-dasharray="3 2"/>
          <line x1="102" y1="41" x2="122" y2="106" stroke="#dc2626" stroke-width="1" stroke-dasharray="3 2"/>
          <!-- Ref.505 360° Sealed Spacer Sheet on left & right walls -->
          <rect x="44" y="58" width="26" height="28" fill="#1e293b" stroke="#0f172a"/>
          <rect x="224" y="58" width="26" height="28" fill="#1e293b" stroke="#0f172a"/>
          <!-- Spacer label placed cleanly to right of shadow cone (ZERO overlap!) -->
          <text x="176" y="71" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0f172a">密閉聖域ギャップ</text>
          <text x="176" y="81" text-anchor="middle" font-size="6.5" fill="#059669">(内部塵侵入ゼロ)</text>
          <!-- Cover Glass below -->
          <rect x="44" y="86" width="206" height="14" rx="1.5" fill="#e0f2fe" stroke="#0369a1" stroke-width="1.1"/>
          <text x="186" y="95.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">パッケージカバーガラス</text>
          <!-- CMOS Die at bottom -->
          <rect x="64" y="106" width="166" height="16" rx="2" fill="#1e3a8a"/>
          <text x="150" y="116.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#ffffff">CMOS 画素面（影が薄く写りにくい）</text>
          <!-- Right dimension & tolerance panel -->
          <line x1="258" y1="58" x2="258" y2="86" stroke="#0f172a" stroke-width="1.2" marker-start="url(#a-S45-slate)" marker-end="url(#a-S45-slate)"/>
          <rect x="266" y="48" width="84" height="86" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="308" y="62" text-anchor="middle" font-size="7.1" font-weight="800" fill="#0f172a">Ref.505 精度</text>
          <text x="308" y="76" text-anchor="middle" font-size="7.3" font-weight="800" fill="#0284c7">t = 0.35 mm</text>
          <text x="308" y="88" text-anchor="middle" font-size="6.9" font-weight="700" fill="#059669">公差 ±10 µm</text>
          <text x="308" y="104" text-anchor="middle" font-size="6.4" fill="#334155">遮光PET＋発泡ゴム</text>
          <text x="308" y="115" text-anchor="middle" font-size="6.4" fill="#334155">360°全周密閉枠</text>
          <text x="308" y="127" text-anchor="middle" font-size="6.4" font-weight="700" fill="#1e40af">光学長厳守</text>
          <text x="147" y="138" text-anchor="middle" font-size="6.9" font-weight="700" fill="#334155">掃除不能なフィルター裏側へのホコリ侵入を永久遮断</text>
        `,
        caption: '厚さ0.35mm±10µmの360°防塵枠が、内部密閉・光学長維持・表面ゴミ影のボカシを同時実現',
      });

    // =========================================================================
    // S46 — Dedicated High-Voltage PZT Drive Flex (sensor_piezo_drive_fpc)
    // =========================================================================
    case 'sensor_piezo_drive_fpc':
      return sensorFrame({
        code: 'S46',
        title: '超音波 PZT 専用 高電圧 2極フレキシブル給電リボン',
        viewTag: 'ノイズ隔離配線',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Left: PZT Ceramic Actuator Bar -->
          <rect x="16" y="42" width="52" height="72" rx="4" fill="#e7e5e4" stroke="#78716c" stroke-width="1.3"/>
          <text x="42" y="75" text-anchor="middle" font-size="8" font-weight="800" fill="#292524">PZT</text>
          <text x="42" y="88" text-anchor="middle" font-size="6.6" fill="#57534e">圧電バー</text>
          <!-- Solder lands -->
          <rect x="68" y="54" width="12" height="10" rx="1.5" fill="#eab308" stroke="#a16207"/>
          <rect x="68" y="88" width="12" height="10" rx="1.5" fill="#94a3b8" stroke="#475569"/>
          <!-- Dedicated 2-Pole High-Voltage PI Flex Ribbon (HOT & GND) -->
          <path d="M80,59 C118,59 124,42 164,42 L248,42" fill="none" stroke="#ea580c" stroke-width="5.5" stroke-linecap="round"/>
          <path d="M80,59 C118,59 124,42 164,42 L248,42" fill="none" stroke="#fef08a" stroke-width="1.6" stroke-dasharray="5 3"/>
          <path d="M80,93 C118,93 124,76 164,76 L248,76" fill="none" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
          <text x="192" y="36" text-anchor="middle" font-size="7" font-weight="700" fill="#c2410c">HOT 駆動線 (30–60 Vpp / 50 kHz)</text>
          <text x="192" y="70" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">独立基準 GND 帰還線 (25µm PI＋圧延銅)</text>
          <!-- High-Voltage Driver IC on right -->
          <rect x="250" y="34" width="96" height="52" rx="5" fill="#fff7ed" stroke="#ea580c" stroke-width="1.2"/>
          <text x="298" y="50" text-anchor="middle" font-size="7.3" font-weight="800" fill="#9a3412">超音波昇圧ドライバ</text>
          <path d="M264,68 Q272,56 280,68 T296,68 T312,68 T328,68" fill="none" stroke="#dc2626" stroke-width="1.8"/>
          <text x="298" y="80" text-anchor="middle" font-size="6.4" font-weight="700" fill="#dc2626">毎秒5万回 高圧交流</text>
          <!-- Physical Isolation Barrier & Delicate CMOS Image Signal Lines below -->
          <line x1="88" y1="106" x2="346" y2="106" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="5 3"/>
          <rect x="88" y="114" width="258" height="24" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="217" y="129" text-anchor="middle" font-size="7.1" font-weight="700" fill="#1e40af">完全別ルート隔離 → 繊細な撮像アナログ / SLVS-EC 線へノイズゼロ</text>
        `,
        caption: '30–60Vppの高圧超音波給電を専用2極リボンへ物理分離し、画像信号線へのノイズ混入を遮断',
      });

    // =========================================================================
    // S47 — Hermetic Glass-Frit Seal & Dry N2 Cavity (sensor_hermetic_frit_n2)
    // =========================================================================
    case 'sensor_hermetic_frit_n2':
      return sensorFrame({
        code: 'S47',
        title: '気密ガラスフリット封止環 ＆ 乾燥窒素(N₂)室',
        viewTag: '気密防曇断面',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- External humid air bounced off outside perimeter! -->
          <path d="M24,52 Q40,60 44,68 L30,78" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-S47-red)"/>
          <text x="28" y="45" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">外気H₂O</text>
          <text x="28" y="90" text-anchor="middle" font-size="6.6" font-weight="700" fill="#dc2626">遮断!</text>
          <path d="M336,52 Q320,60 316,68 L330,78" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-S47-red)"/>
          <text x="332" y="45" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">酸素O₂</text>
          <text x="332" y="90" text-anchor="middle" font-size="6.6" font-weight="700" fill="#dc2626">遮断!</text>
          <!-- Cover Glass -->
          <rect x="52" y="36" width="256" height="14" rx="1.5" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
          <text x="180" y="45.5" text-anchor="middle" font-size="7" font-weight="700" fill="#0c4a6e">低α線カバーガラス</text>
          <!-- Low-Melting Glass-Frit / Kovar Hermetic Seal Ring -->
          <rect x="56" y="50" width="26" height="12" fill="#f59e0b" stroke="#b45309" stroke-width="1.2"/>
          <rect x="278" y="50" width="26" height="12" fill="#f59e0b" stroke="#b45309" stroke-width="1.2"/>
          <!-- HTCC Ceramic Wall -->
          <path d="M52,62 L82,62 L82,114 L278,114 L278,62 L308,62 L308,132 L52,132 Z" fill="#334155" stroke="#0f172a"/>
          <!-- Dry N2 Cavity interior -->
          <rect x="82" y="50" width="196" height="64" fill="#f0fdf4"/>
          ${pill(180, 72, 168, 22, '乾燥窒素 Dry N₂ (水分<100ppm)', '#dcfce7', '#059669', '#065f46', 7.3)}
          <text x="180" y="93" text-anchor="middle" font-size="7" font-weight="700" fill="#0284c7">露点 −50℃ 以下（寒冷地でも結露ゼロ）</text>
          <!-- Protected CMOS Die & Organic Micro-lenses -->
          <rect x="110" y="102" width="140" height="12" rx="1.5" fill="#1d4ed8"/>
          <text x="180" y="110.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#ffffff">有機CF・マイクロレンズ・Au線保護</text>
          <text x="180" y="125.5" text-anchor="middle" font-size="7" font-weight="700" fill="#fde047">熱膨張整合 低融点ガラスフリット全周溶着封止</text>
          <text x="180" y="144" text-anchor="middle" font-size="6.8" font-weight="700" fill="#475569">缶詰級の気密封止で極寒ロケの内部結露・長期酸化劣化を完全防止</text>
        `,
        caption: 'ガラスフリット全周気密封止と露点−50℃以下の乾燥N₂が、内部結露とカラーフィルター劣化を防止',
      });

    // =========================================================================
    // S48 — Optical Black (OB) Shielded Reference Border (sensor_ob_shield_border)
    // =========================================================================
    case 'sensor_ob_shield_border':
      return sensorFrame({
        code: 'S48',
        title: '外周 オプティカルブラック（OB）遮光基準画素帯',
        viewTag: 'ダイ上面・補正原理',
        accent: '#1e293b',
        headerBg: '#f1f5f9',
        body: `
          <!-- LEFT: Full-Frame Die Top View showing OB Metal-Shielded Perimeter -->
          <rect x="16" y="30" width="166" height="114" rx="5" fill="#0f172a" stroke="#334155" stroke-width="1.4"/>
          <text x="99" y="42" text-anchor="middle" font-size="7" font-weight="700" fill="#fde047">OB遮光基準帯 (Al/W完全遮光膜)</text>
          <!-- Active 36x24mm imaging area inside -->
          <rect x="34" y="48" width="130" height="74" rx="2" fill="#0284c7" stroke="#7dd3fc" stroke-width="1.2"/>
          <text x="99" y="79" text-anchor="middle" font-size="8" font-weight="800" fill="#ffffff">有効撮像画素域</text>
          <text x="99" y="92" text-anchor="middle" font-size="7" fill="#e0f2fe">35.9 × 24.0 mm</text>
          <text x="99" y="106" text-anchor="middle" font-size="6.5" fill="#bae6fd">(信号光 + 暗電流ノイズ)</text>
          <!-- Bottom OB band text -->
          <text x="99" y="135" text-anchor="middle" font-size="6.7" font-weight="700" fill="#e2e8f0">総画素 − 有効画素 ≈ 100〜200万画素</text>
          <!-- RIGHT: Real-time OB Clamp Subtraction Pipeline -->
          <rect x="192" y="30" width="156" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="270" y="43" text-anchor="middle" font-size="7.3" font-weight="700" fill="#0f172a">毎フレーム リアルタイム黒基準引き算</text>
          <rect x="202" y="51" width="136" height="19" rx="3" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="270" y="63" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1e40af">有効画素生値 S_raw (光＋熱ノイズ)</text>
          <text x="270" y="79" text-anchor="middle" font-size="8" font-weight="800" fill="#dc2626">−</text>
          <rect x="202" y="83" width="136" height="19" rx="3" fill="#1e293b"/>
          <text x="270" y="95" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fde047">OB帯平均 Mean(OB) (純粋熱ノイズ)</text>
          <line x1="270" y1="102" x2="270" y2="112" stroke="#059669" stroke-width="1.6" marker-end="url(#a-S48-green)"/>
          ${pill(270, 125, 136, 19, 'S_clean = 真の黒レベル固定', '#dcfce7', '#059669', '#065f46', 7)}
        `,
        caption: '外周の完全遮光OB画素で毎フレーム暗電流の「風袋引き」を行い、黒浮きと横縞ノイズを消去',
      });

    // =========================================================================
    // S49 — 320-Pin LGA/BGA Solder Array & Corner Underfill (sensor_lga_solder_underfill)
    // =========================================================================
    case 'sensor_lga_solder_underfill':
      return sensorFrame({
        code: 'S49',
        title: '320ピン LGA/BGA ハンダ球群 ＆ 4隅アンダーフィル',
        viewTag: '実装補強断面',
        accent: '#b45309',
        headerBg: '#fffbeb',
        body: `
          <!-- Upper 12-layer HTCC Ceramic Package -->
          <rect x="34" y="34" width="292" height="28" rx="3" fill="#334155" stroke="#0f172a"/>
          <text x="180" y="51" text-anchor="middle" font-size="7.5" font-weight="800" fill="#f8fafc">12層 HTCC セラミックパッケージ (大判・高剛性)</text>
          <!-- Corner Epoxy Underfill Fillets (left & right stress-concentration edges!) -->
          <polygon points="22,84 34,62 66,62 66,84" fill="#d97706" opacity="0.82" stroke="#92400e" stroke-width="1"/>
          <polygon points="338,84 326,62 294,62 294,84" fill="#d97706" opacity="0.82" stroke="#92400e" stroke-width="1"/>
          <!-- Peripheral SAC305 Solder Balls + Large Central Thermal Pad -->
          ${[48, 66, 84, 102, 120, 240, 258, 276, 294, 312]
            .map(
              (x) =>
                `<circle cx="${x}" cy="73" r="6.5" fill="#cbd5e1" stroke="#475569" stroke-width="1.1"/><circle cx="${x - 2}" cy="71" r="1.8" fill="#ffffff"/>`
            )
            .join('')}
          <!-- Central large solder thermal pad -->
          <rect x="138" y="64" width="84" height="18" rx="2" fill="#94a3b8" stroke="#334155" stroke-width="1.1"/>
          <text x="180" y="75.5" text-anchor="middle" font-size="6.7" font-weight="800" fill="#0f172a">中央大面積 放熱パッド</text>
          <!-- Lower Sensor Rigid PCB -->
          <rect x="20" y="84" width="320" height="22" rx="3" fill="#065f46" stroke="#047857"/>
          <text x="180" y="98" text-anchor="middle" font-size="7.4" font-weight="700" fill="#d1fae5">センサーリジッド基板 (スタンドオフ 0.25 mm · 低L 0.15nH)</text>
          <!-- Clean bottom callout cards -->
          ${pill(72, 127, 118, 22, '4隅エポキシ補強樹脂', '#fef3c7', '#d97706', '#92400e', 7)}
          ${pill(180, 127, 86, 22, 'SAC305 320ピン', '#f1f5f9', '#475569', '#0f172a', 7)}
          ${pill(288, 127, 118, 22, '落下・IBIS亀裂を防止', '#ecfdf5', '#059669', '#065f46', 7)}
          <line x1="48" y1="84" x2="48" y2="116" stroke="#b45309" stroke-width="1"/>
          <line x1="312" y1="84" x2="312" y2="116" stroke="#059669" stroke-width="1"/>
        `,
        caption: '320ピン極短LGAハンダと4隅エポキシ補強で、12.5Gbps信号品質と落下耐衝撃性を両立',
      });

    // =========================================================================
    // S50 — 48x Backside Ultra-Low-ESL MLCC Bank (sensor_mlcc_decoupling_bank)
    // =========================================================================
    case 'sensor_mlcc_decoupling_bank':
      return sensorFrame({
        code: 'S50',
        title: '基板裏 48連 超低ESL MLCC バイパス電源タンク',
        viewTag: '直下デカップリング',
        accent: '#0d5bd9',
        headerBg: '#eff6ff',
        body: `
          <!-- CMOS Silicon Die & Package on top -->
          <rect x="26" y="30" width="210" height="22" rx="3" fill="#1e3a8a"/>
          <text x="131" y="44" text-anchor="middle" font-size="7.4" font-weight="800" fill="#ffffff">CMOS 撮像ダイ (120fps 同時大電流パルス)</text>
          <!-- Sensor PCB with vertical direct micro-vias (<1mm straight drop!) -->
          <rect x="26" y="54" width="210" height="20" rx="2" fill="#065f46" stroke="#047857"/>
          <!-- Ultra-short vertical current supply vias -->
          ${[48, 72, 96, 120, 144, 168, 192, 216]
            .map(
              (x) =>
                `<line x1="${x}" y1="52" x2="${x}" y2="82" stroke="#facc15" stroke-width="2"/><rect x="${x - 8}" y="82" width="16" height="12" rx="1.5" fill="#d97706" stroke="#78350f" stroke-width="0.8"/><rect x="${x - 8}" y="82" width="3.5" height="12" fill="#cbd5e1"/><rect x="${x + 4.5}" y="82" width="3.5" height="12" fill="#cbd5e1"/>`
            )
            .join('')}
          <rect x="40" y="57" width="182" height="14" rx="2.5" fill="#065f46" opacity="0.96"/>
          <text x="131" y="66.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#a7f3d0">センサーPCB (直下貫通ビア距離 &lt; 1mm)</text>
          <!-- Second row of MLCCs representing 48-cap dense bank -->
          ${[60, 84, 108, 132, 156, 180, 204]
            .map(
              (x) =>
                `<rect x="${x - 8}" y="98" width="16" height="11" rx="1.5" fill="#b45309" stroke="#78350f" stroke-width="0.7"/><rect x="${x - 8}" y="98" width="3.5" height="11" fill="#cbd5e1"/><rect x="${x + 4.5}" y="98" width="3.5" height="11" fill="#cbd5e1"/>`
            )
            .join('')}
          <text x="131" y="124" text-anchor="middle" font-size="7.1" font-weight="800" fill="#92400e">ダイ真裏 0201/0402 超低ESL MLCC × 48個</text>
          <text x="131" y="136" text-anchor="middle" font-size="6.7" fill="#334155">VAA 2.8V / VDD 1.05V / VIO 1.8V 3系統独立タンク</text>
          <!-- Right: Voltage Ripple Suppression Comparison -->
          <rect x="246" y="30" width="102" height="110" rx="5" fill="#f8fafc" stroke="#93c5fd"/>
          <text x="297" y="44" text-anchor="middle" font-size="7.1" font-weight="700" fill="#1e40af">瞬間電圧ブレ抑制</text>
          <text x="297" y="59" text-anchor="middle" font-size="6.5" fill="#dc2626">MLCC遠い (電圧降下)</text>
          <path d="M254,70 L272,70 L278,84 L288,65 L298,74 L338,70" fill="none" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 2"/>
          <text x="297" y="99" text-anchor="middle" font-size="6.7" font-weight="700" fill="#059669">真裏48連 (リップル&lt;2mV)</text>
          <line x1="254" y1="109" x2="338" y2="109" stroke="#059669" stroke-width="2.2"/>
          <text x="297" y="128" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0369a1">超低ESLで即座に電荷補給</text>
        `,
        caption: 'CMOS直下1mm以内に48個の超小型MLCCを密敷し、120fps同時読出の電源電圧降下を2mV未満に抑制',
      });

    // =========================================================================
    // S51 — Sony Ref.506 ISL-2009 Hall Feedback Flex (sensor_isl_fpc)
    // =========================================================================
    case 'sensor_isl_fpc':
      return sensorFrame({
        code: 'S51',
        title: 'IBIS 位置検知専用フレキ ISL-2009 (SONY Ref.506)',
        viewTag: '信号分離経路',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- Left: 3-Axis Hall ICs + NTC Temp Sensor -->
          <rect x="16" y="34" width="84" height="72" rx="5" fill="#ecfdf5" stroke="#059669" stroke-width="1.2"/>
          <text x="58" y="48" text-anchor="middle" font-size="7.2" font-weight="800" fill="#065f46">微小センサ群</text>
          <rect x="24" y="54" width="68" height="15" rx="2" fill="#059669"/><text x="58" y="64" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">3軸 Hall (X/Y1/Y2)</text>
          <rect x="24" y="73" width="68" height="15" rx="2" fill="#0d9488"/><text x="58" y="83" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">NTC 温度検知</text>
          <text x="58" y="99" text-anchor="middle" font-size="6.3" fill="#065f46">μV級 微弱アナログ</text>
          <!-- Compliant S-Loop Shielded ISL-2009 Flex -->
          <path d="M100,66 C134,66 134,40 168,40 C202,40 202,88 236,88 L254,88" fill="none" stroke="#059669" stroke-width="6" stroke-linecap="round"/>
          <path d="M100,66 C134,66 134,40 168,40 C202,40 202,88 236,88 L254,88" fill="none" stroke="#a7f3d0" stroke-width="1.8" stroke-dasharray="4 3"/>
          <text x="176" y="34" text-anchor="middle" font-size="7" font-weight="700" fill="#065f46">ISL-2009 圧延銅 S字ループ (1億回耐久)</text>
          <!-- Right: IBIS Servo DSP -->
          <rect x="256" y="48" width="90" height="58" rx="5" fill="#1e293b"/>
          <text x="301" y="66" text-anchor="middle" font-size="7.3" font-weight="800" fill="#34d399">IBIS サーボDSP</text>
          <text x="301" y="79" text-anchor="middle" font-size="6.8" fill="#ffffff">10 kHz 監視</text>
          <text x="301" y="92" text-anchor="middle" font-size="6.6" fill="#a7f3d0">分解能 0.2 µm</text>
          <!-- Bottom Separation Wall from ISD-2002 High-Current Flex -->
          <line x1="16" y1="114" x2="344" y2="114" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="4 3"/>
          <rect x="16" y="121" width="328" height="22" rx="4" fill="#fff7ed" stroke="#fdba74"/>
          <text x="180" y="135" text-anchor="middle" font-size="7" font-weight="700" fill="#9a3412">大電流 VCM 駆動線 (ISD-2002 / Ref.507) と完全別フレキ分離 → 誘導ノイズゼロ</text>
        `,
        caption: '微小な3軸ホール位置信号を大電流コイル線と完全分離した専用S字フレキで10kHz精密帰還',
      });

    // =========================================================================
    // S52 — Sony Ref.507 ISD-2002 High-Current VCM Drive Flex (sensor_isd_fpc)
    // =========================================================================
    case 'sensor_isd_fpc':
      return sensorFrame({
        code: 'S52',
        title: 'IBIS 大電流 VCM 駆動フレキ ISD-2002 (Ref.507)',
        viewTag: '大電流パワー経路',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Left: Mainboard PWM H-Bridge Driver -->
          <rect x="16" y="38" width="84" height="68" rx="5" fill="#1e293b"/>
          <text x="58" y="56" text-anchor="middle" font-size="7.2" font-weight="800" fill="#fde047">VCM PWMドライバ</text>
          <text x="58" y="71" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffff">3軸独立 Hブリッジ</text>
          <text x="58" y="85" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fb923c">ピーク 1.5 A 駆動</text>
          <text x="58" y="97" text-anchor="middle" font-size="6.2" fill="#cbd5e1">高速電流応答</text>
          <!-- Thick Rolled-Copper Zero-Tension U-Curve ISD-2002 Power Flex -->
          <path d="M100,56 L176,56 C206,56 206,88 176,88 L158,88 C134,88 134,108 164,108 L244,108" fill="none" stroke="#c2410c" stroke-width="8" stroke-linecap="round"/>
          <path d="M100,56 L176,56 C206,56 206,88 176,88 L158,88 C134,88 134,108 164,108 L244,108" fill="none" stroke="#fef08a" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#a-S52-amber)"/>
          ${pill(172, 38, 134, 15, '厚銅圧延箔 R < 0.15 Ω', '#fff7ed', '#ea580c', '#9a3412', 7)}
          <!-- Right: 3-Axis Air-Core VCM Coils on Floating Stage -->
          <rect x="248" y="38" width="98" height="82" rx="5" fill="#fff7ed" stroke="#ea580c" stroke-width="1.3"/>
          <text x="297" y="53" text-anchor="middle" font-size="7.3" font-weight="800" fill="#9a3412">3軸 VCM コイル群</text>
          <rect x="258" y="60" width="78" height="14" rx="2" fill="#ea580c"/><text x="297" y="69.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#ffffff">Y1 / Y2 / X1 コイル</text>
          <text x="297" y="88" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">XY ±3.0mm / Roll ±3.5°</text>
          <text x="297" y="100" text-anchor="middle" font-size="6.5" fill="#475569">−30℃でも柔軟追従</text>
          <text x="297" y="112" text-anchor="middle" font-size="6.6" font-weight="700" fill="#059669">ISL-2009と別経路隔離</text>
          <text x="172" y="138" text-anchor="middle" font-size="6.9" font-weight="700" fill="#9a3412">低抵抗パワー配線が発熱ロスを抑え、大電流スパイクの信号線干渉をゼロ化</text>
        `,
        caption: '低抵抗(<0.15Ω)の厚銅U字パワーフレキが最大1.5Aを低ロス供給し、位置検知線への干渉を遮断',
      });

    // =========================================================================
    // S53 — Sony Ref.510 TEX-5810 Anti-Shake Core Module (sensor_tex_module)
    // =========================================================================
    case 'sensor_tex_module':
      return sensorFrame({
        code: 'S53',
        title: 'IBIS 統合モジュール骨格 TEX-5810 (Ref.510)',
        viewTag: '統合ユニット構造',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: TEX-5810 Integrated Stator Core Architecture -->
          <rect x="16" y="32" width="186" height="110" rx="6" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>
          <text x="109" y="46" text-anchor="middle" font-size="7.5" font-weight="800" fill="#0f172a">TEX-5810 固定側統合コア (Ref.510)</text>
          <!-- Integrated subsystems inside TEX-5810 -->
          <rect x="26" y="54" width="76" height="34" rx="3" fill="#fee2e2" stroke="#dc2626"/>
          <text x="64" y="69" text-anchor="middle" font-size="6.9" font-weight="700" fill="#991b1b">磁気枠＆ヨーク</text>
          <text x="64" y="80" text-anchor="middle" font-size="6.3" fill="#7f1d1d">10N級吸引剛性</text>
          <rect x="112" y="54" width="80" height="34" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="152" y="69" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0c4a6e">3点球レース溝</text>
          <text x="152" y="80" text-anchor="middle" font-size="6.3" fill="#0369a1">平行度 &lt; 10 µm</text>
          <rect x="26" y="94" width="166" height="22" rx="3" fill="#334155"/>
          <text x="109" y="108" text-anchor="middle" font-size="6.9" font-weight="700" fill="#fde047">ダイカスト軽合金 ＋ GF強化PPSインサート</text>
          <text x="109" y="132" text-anchor="middle" font-size="6.7" font-weight="700" fill="#334155">フレキ保持爪・ストッパーを一括統合</text>
          <!-- Service separation interface arrow -->
          <line x1="205" y1="86" x2="233" y2="86" stroke="#2563eb" stroke-width="2" stroke-dasharray="3 2" marker-start="url(#a-S53-blue)" marker-end="url(#a-S53-blue)"/>
          <!-- Right: Independently Serviceable Imager Unit (Ref.512) -->
          <rect x="236" y="38" width="112" height="96" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="1.2"/>
          <text x="292" y="54" text-anchor="middle" font-size="7.3" font-weight="800" fill="#1e40af">撮像素子ユニット</text>
          <text x="292" y="66" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1d4ed8">(SONY Ref.512)</text>
          <rect x="250" y="74" width="84" height="26" rx="3" fill="#1d4ed8"/>
          <text x="292" y="89.5" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffff">独立モジュール交換</text>
          <text x="292" y="114" text-anchor="middle" font-size="6.6" fill="#334155">工場で単体検査・校正可</text>
          <text x="292" y="126" text-anchor="middle" font-size="6.7" font-weight="700" fill="#059669">端まで傾き &lt; 0.01°</text>
        `,
        caption: '磁石・球案内・フレキ爪を統合した高剛性TEX-5810骨格が、全可動域で10µm未満の平面度を維持',
      });

    // =========================================================================
    // S54 — Sony Ref.501 Single-Use Stepped Alignment Shafts (sensor_imager_fix_shafts)
    // =========================================================================
    case 'sensor_imager_fix_shafts':
      return sensorFrame({
        code: 'S54',
        title: '非再利用 芯出し段付き固定軸 (SONY Ref.501 ×3)',
        viewTag: '3点芯出し断面',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- LEFT: 3-Point Triangle Layout -->
          <rect x="14" y="30" width="128" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="78" y="43" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0f172a">3点キネマティック配置</text>
          <polygon points="78,56 36,114 120,114" fill="#fee2e2" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3 2"/>
          <circle cx="78" cy="56" r="6.5" fill="#dc2626"/><text x="78" y="58.5" text-anchor="middle" font-size="6.5" font-weight="800" fill="#ffffff">1</text>
          <circle cx="36" cy="114" r="6.5" fill="#dc2626"/><text x="36" y="116.5" text-anchor="middle" font-size="6.5" font-weight="800" fill="#ffffff">2</text>
          <circle cx="120" cy="114" r="6.5" fill="#dc2626"/><text x="120" y="116.5" text-anchor="middle" font-size="6.5" font-weight="800" fill="#ffffff">3</text>
          ${pill(78, 92, 66, 15, '非再利用指定', '#fef2f2', '#dc2626', '#991b1b', 6.8)}
          <text x="78" y="136" text-anchor="middle" font-size="6.7" font-weight="700" fill="#334155">ガタなくセンサー平面決定</text>
          <!-- RIGHT: Stepped Shaft Precision Seating Cutaway -->
          <rect x="150" y="30" width="198" height="114" rx="5" fill="#ffffff" stroke="#fca5a5"/>
          <text x="249" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#991b1b">段付きガイド軸 精度公差 ±3 µm 断面</text>
          <!-- Upper Imager Unit Flange (label cleanly right of shaft!) -->
          <rect x="160" y="58" width="106" height="18" rx="2" fill="#dbeafe" stroke="#2563eb"/>
          <text x="228" y="69.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#1e40af">撮像素子ユニット</text>
          <!-- Lower IBIS Moving Stage (label cleanly right of shaft!) -->
          <rect x="160" y="96" width="106" height="18" rx="2" fill="#cbd5e1" stroke="#475569"/>
          <text x="228" y="107.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0f172a">IBIS 可動ステージ</text>
          <!-- Precision Stepped Hardened Stainless Shaft cleanly on left side of both flanges -->
          <path d="M168,51 L194,51 L194,58 L188,58 L188,96 L185,96 L185,120 L177,120 L177,96 L174,96 L174,58 L168,58 Z" fill="#64748b" stroke="#0f172a" stroke-width="1.1"/>
          <!-- Precision step height dimension -->
          <line x1="202" y1="77" x2="202" y2="95" stroke="#dc2626" stroke-width="1.2" marker-start="url(#a-S54-red)" marker-end="url(#a-S54-red)"/>
          <text x="275" y="68" font-size="6.8" font-weight="800" fill="#dc2626">段差高さ ±3 µm</text>
          <text x="275" y="80" font-size="6.5" fill="#334155">焼入れステンレス</text>
          <text x="275" y="93" font-size="6.5" font-weight="700" fill="#b45309">微細なじみ変形</text>
          <text x="275" y="104" font-size="6.4" fill="#475569">(遊び &lt; 0.005mm)</text>
          <text x="249" y="136" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">公式SM: 一度外したら新品3本へ必ず交換</text>
        `,
        caption: '±3µm段差公差の3本ガイド軸が微細なじみ変形で無ガタ芯出しを実現（分解時は新品交換指定）',
      });

    // =========================================================================
    // S55 — Low-Friction POM 3-Ball Retainer Cage (sensor_ball_retainer_cage)
    // =========================================================================
    case 'sensor_ball_retainer_cage':
      return sensorFrame({
        code: 'S55',
        title: '低摩擦 POM セラミック球リテーナーケージ',
        viewTag: '転がり幾何・保持',
        accent: '#0d9488',
        headerBg: '#f0fdfa',
        body: `
          <!-- LEFT: Rolling Kinematics (x_ball = 1/2 x_stage) -->
          <rect x="14" y="30" width="178" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="103" y="42.5" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0f766e">純転がり運動：ケージは半分の速度で移動</text>
          <!-- Upper Moving Stage moving +x -->
          <rect x="34" y="57" width="138" height="13" rx="2" fill="#cbd5e1" stroke="#475569"/>
          <line x1="74" y1="63.5" x2="132" y2="63.5" stroke="#2563eb" stroke-width="1.8" marker-end="url(#a-S55-blue)"/>
          <text x="103" y="53.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#1d4ed8">ステージ変位 x_stage</text>
          <!-- POM Thin Retainer Cage Bar holding the ball in pocket -->
          <rect x="26" y="81" width="154" height="8" rx="2" fill="#5eead4" stroke="#0d9488" stroke-width="1"/>
          <!-- Si3N4 Ceramic Ball inside POM pocket with PFPE grease meniscus -->
          <circle cx="103" cy="85" r="13.5" fill="#1e293b" stroke="#0f172a" stroke-width="1.2"/>
          <circle cx="98" cy="80" r="3.5" fill="#94a3b8" opacity="0.6"/>
          <!-- Grease reservoir pockets flanking ball -->
          <circle cx="86" cy="85" r="3" fill="#facc15"/>
          <circle cx="120" cy="85" r="3" fill="#facc15"/>
          <!-- Stationary Lower Base -->
          <rect x="34" y="100" width="138" height="13" rx="2" fill="#475569"/>
          <text x="103" y="109" text-anchor="middle" font-size="6.6" font-weight="700" fill="#ffffff">固定ベース (速度 0)</text>
          ${pill(103, 130, 146, 16, 'x_cage = ½ x_stage (μ≈0.0015)', '#ccfbf1', '#0d9488', '#115e59', 7)}
          <!-- RIGHT: 3-Ball Synchronized POM Sheet Top View -->
          <rect x="200" y="30" width="148" height="114" rx="5" fill="#ffffff" stroke="#99f6e4"/>
          <text x="274" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f766e">3球同期保持シート (上面)</text>
          <!-- Thin POM retainer sheet shape -->
          <path d="M226,54 L322,54 L322,108 L226,108 Z M246,66 L302,66 L302,96 L246,96 Z" fill="#99f6e4" fill-rule="evenodd" stroke="#0d9488" stroke-width="1.1"/>
          <circle cx="236" cy="64" r="6" fill="#1e293b"/>
          <circle cx="312" cy="64" r="6" fill="#1e293b"/>
          <circle cx="274" cy="102" r="6" fill="#1e293b"/>
          <text x="274" y="80" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0f766e">3球間隔を</text>
          <text x="274" y="90" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0f766e">完全同期保持</text>
          <text x="274" y="123" text-anchor="middle" font-size="6.6" fill="#334155">・衝撃時の球偏り/脱線防止</text>
          <text x="274" y="135" text-anchor="middle" font-size="6.6" font-weight="700" fill="#b45309">・無揮発PFPEグリス溜め内蔵</text>
        `,
        caption: '自己潤滑POMケージが3個のセラミック球を半分速度で同期案内し、衝撃脱線と摩擦ロスを防止',
      });

    // =========================================================================
    // S56 — High-Temp Polyimide/LCP VCM Coil Bobbins (sensor_vcm_coil_bobbins)
    // =========================================================================
    case 'sensor_vcm_coil_bobbins':
      return sensorFrame({
        code: 'S56',
        title: '耐熱 LCP/PI ボイスコイルボビン ＆ 整列巻線断面',
        viewTag: '巻線・端子構造',
        accent: '#c2410c',
        headerBg: '#fff7ed',
        body: `
          <!-- LEFT: Orthocyclic High-Fill Winding Cross-Section (78% fill factor) -->
          <rect x="14" y="30" width="160" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="94" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#9a3412">φ0.10mm 高密度整列巻き (占積率78%)</text>
          <!-- LCP Bobbin C-channel flange cutaway -->
          <path d="M32,52 L156,52 L156,60 L44,60 L44,104 L156,104 L156,112 L32,112 Z" fill="#92400e" stroke="#78350f"/>
          <!-- Packed copper wire cross-sections (3 rows x 8 cols) -->
          ${[0, 1, 2]
            .flatMap((r) =>
              [0, 1, 2, 3, 4, 5, 6, 7].map((c) => {
                const cx = 56 + c * 13 + (r % 2 === 1 ? 6 : 0);
                const cy = 68 + r * 12;
                return `<circle cx="${cx}" cy="${cy}" r="5.3" fill="#ea580c" stroke="#7c2d12" stroke-width="0.9"/>`;
              })
            )
            .join('')}
          <text x="94" y="126" text-anchor="middle" font-size="6.9" font-weight="700" fill="#78350f">薄肉 0.2mm 耐熱260℃ LCP樹脂枠</text>
          <text x="94" y="137" text-anchor="middle" font-size="6.5" fill="#475569">自己融着ポリウレタン銅線 (コイル膨張ゼロ)</text>
          <!-- RIGHT: Strain-Relieved Gold Phosphor-Bronze Terminal Top View -->
          <rect x="184" y="30" width="164" height="114" rx="5" fill="#fff7ed" stroke="#fdba74"/>
          <text x="266" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#9a3412">耐振 金メッキ中継ターミナル構造</text>
          <!-- Racetrack coil bobbin outline -->
          <rect x="198" y="54" width="110" height="44" rx="18" fill="none" stroke="#ea580c" stroke-width="9"/>
          <rect x="198" y="54" width="110" height="44" rx="18" fill="none" stroke="#fed7aa" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="253" y="79" text-anchor="middle" font-size="7" font-weight="800" fill="#9a3412">空芯ボビン×3</text>
          <!-- Wire lead-outs wrapped securely to gold phosphor-bronze pins -->
          <line x1="306" y1="68" x2="328" y2="68" stroke="#c2410c" stroke-width="2"/>
          <line x1="306" y1="84" x2="328" y2="84" stroke="#c2410c" stroke-width="2"/>
          <rect x="326" y="63" width="14" height="10" rx="2" fill="#eab308" stroke="#a16207"/>
          <rect x="326" y="79" width="14" height="10" rx="2" fill="#eab308" stroke="#a16207"/>
          <text x="266" y="118" text-anchor="middle" font-size="6.8" font-weight="700" fill="#854d0e">金メッキリン青銅 巻付け半田端子</text>
          <text x="266" y="132" text-anchor="middle" font-size="6.6" fill="#475569">IBIS高周波振動でも極細引き出し線が断線しない</text>
        `,
        caption: '耐熱260℃の薄肉LCPボビンに銅線を占積率78%で整列巻きし、金メッキ中継端子で断線を防止',
      });

    // =========================================================================
    // S57 — Dedicated Linear-Gradient Hall Sub-Magnets & Permalloy Baffle (sensor_hall_bias_magnets)
    // =========================================================================
    case 'sensor_hall_bias_magnets':
      return sensorFrame({
        code: 'S57',
        title: 'ホール専用 直線磁場サブ磁石 ＆ 磁気仕切り板',
        viewTag: '磁気隔離断面',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: Huge Noisy VCM Drive Magnet separated by Permalloy Shield Baffle -->
          <rect x="16" y="42" width="62" height="62" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.2"/>
          <text x="47" y="68" text-anchor="middle" font-size="7.1" font-weight="800" fill="#991b1b">大推力</text>
          <text x="47" y="79" text-anchor="middle" font-size="7" font-weight="700" fill="#991b1b">VCM磁石</text>
          <text x="47" y="92" text-anchor="middle" font-size="6.2" fill="#dc2626">(強干渉磁場)</text>
          <!-- Stray field lines blocked by Permalloy wall -->
          <path d="M78,56 Q90,62 94,70" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 2"/>
          <path d="M78,88 Q90,82 94,76" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 2"/>
          <!-- Permalloy Cross-Talk Shield Baffle Wall -->
          <rect x="96" y="34" width="12" height="84" rx="2" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
          <text x="108" y="132" text-anchor="middle" font-size="6.8" font-weight="800" fill="#334155">パーマロイ磁気仕切り</text>
          <!-- Center: Clean Dedicated Linear-Gradient Sub-Magnet + Hall Sensor -->
          <rect x="128" y="38" width="114" height="22" rx="3" fill="#ffffff" stroke="#0284c7"/>
          <rect x="130" y="40" width="55" height="18" rx="2" fill="#ef4444"/><text x="157.5" y="52" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">N (SmCo系)</text>
          <rect x="185" y="40" width="55" height="18" rx="2" fill="#2563eb"/><text x="212.5" y="52" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">S (SmCo系)</text>
          <!-- Pure linear gradient arrows -->
          <line x1="158" y1="60" x2="158" y2="82" stroke="#0284c7" stroke-width="1.4" marker-end="url(#a-S57-cyan)"/>
          <line x1="212" y1="84" x2="212" y2="62" stroke="#0284c7" stroke-width="1.4" marker-end="url(#a-S57-cyan)"/>
          <!-- Hall IC -->
          <rect x="158" y="84" width="54" height="20" rx="3" fill="#059669" stroke="#064e3b"/>
          <text x="185" y="97" text-anchor="middle" font-size="7.1" font-weight="800" fill="#ffffff">Hall IC</text>
          <text x="185" y="116" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">直線誤差 &lt; 0.2%</text>
          <!-- Right: Precision Specs -->
          <rect x="252" y="34" width="96" height="104" rx="5" fill="#f8fafc" stroke="#7dd3fc"/>
          <text x="300" y="48" text-anchor="middle" font-size="7.1" font-weight="800" fill="#0c4a6e">磁気ものさし精度</text>
          ${pill(300, 68, 84, 17, '分解能 < 0.2 µm', '#e0f2fe', '#0284c7', '#0369a1', 7)}
          <text x="300" y="90" text-anchor="middle" font-size="6.6" fill="#334155">・1画素の1/20以下</text>
          <text x="300" y="103" text-anchor="middle" font-size="6.6" font-weight="700" fill="#059669">・温度係数 −0.03%/℃</text>
          <text x="300" y="116" text-anchor="middle" font-size="6.5" fill="#475569">・8K録画ドリフト極小</text>
          <text x="300" y="129" text-anchor="middle" font-size="6.6" font-weight="700" fill="#1e40af">・16枚シフト対応</text>
        `,
        caption: 'パーマロイ仕切りで駆動磁束を遮断し、温度安定な専用サブ磁石が0.2µm分解能の直線磁場を生成',
      });

    // =========================================================================
    // S58 — Sony Ref.508 IM RADIATION SHEET B (sensor_im_radiation_sheet_b)
    // =========================================================================
    case 'sensor_im_radiation_sheet_b':
      return sensorFrame({
        code: 'S58',
        title: '背面 主放熱グラファイト SHEET B (SONY Ref.508)',
        viewTag: '面内拡散構造',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Top: Localized Hotspot on Sensor PCB -->
          <rect x="24" y="32" width="196" height="24" rx="3" fill="#1e293b"/>
          <ellipse cx="122" cy="44" rx="34" ry="8" fill="#ef4444" opacity="0.88"/>
          <text x="122" y="47" text-anchor="middle" font-size="7" font-weight="800" fill="#ffffff">局所ホットスポット</text>
          <!-- Sandwich Cross-Section: PET Insulation + PGS Graphite (1300 W/mK) + PET Insulation -->
          <rect x="24" y="64" width="196" height="7" fill="#fef08a" stroke="#ca8a04" stroke-width="0.7"/>
          <rect x="24" y="71" width="196" height="24" fill="#334155" stroke="#0f172a" stroke-width="1.1"/>
          <rect x="24" y="95" width="196" height="7" fill="#fef08a" stroke="#ca8a04" stroke-width="0.7"/>
          <!-- Rapid lateral heat diffusion arrows left & right inside PGS -->
          <line x1="100" y1="83" x2="36" y2="83" stroke="#f97316" stroke-width="2.4" marker-end="url(#a-S58-amber)"/>
          <line x1="144" y1="83" x2="208" y2="83" stroke="#f97316" stroke-width="2.4" marker-end="url(#a-S58-amber)"/>
          <circle cx="122" cy="83" r="6" fill="#dc2626"/>
          <text x="122" y="116" text-anchor="middle" font-size="7.1" font-weight="800" fill="#9a3412">両面絶縁PET (&gt;1kV) ＋ PGS黒鉛 (1,300 W/m·K)</text>
          <text x="122" y="129" text-anchor="middle" font-size="6.7" fill="#334155">基板背面ショート完全防止 · 局所熱を全面へ瞬時均一化</text>
          <!-- Right: Ultra-Light Weight & Performance Card -->
          <rect x="232" y="32" width="116" height="106" rx="5" fill="#fff7ed" stroke="#fdba74"/>
          <text x="290" y="46" text-anchor="middle" font-size="7.2" font-weight="800" fill="#9a3412">Ref.508 純正仕様</text>
          ${pill(290, 66, 100, 17, '純銅の約 3 倍拡散', '#ffedd5', '#ea580c', '#9a3412', 7)}
          <text x="290" y="88" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">総厚 0.08 mm</text>
          <text x="290" y="101" text-anchor="middle" font-size="7" font-weight="700" fill="#059669">超軽量 約 0.3 g</text>
          <text x="290" y="116" text-anchor="middle" font-size="6.5" fill="#475569">IBIS可動慣性への負荷</text>
          <text x="290" y="127" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0369a1">ほぼゼロの羽根設計</text>
        `,
        caption: '厚さ0.08mm・0.3gの絶縁グラファイトSheet Bが局所発熱を純銅の3倍速で背面全面へ拡散',
      });

    // =========================================================================
    // S59 — Sony Ref.509 IM RADIATION SHEET D (sensor_im_radiation_sheet_d)
    // =========================================================================
    case 'sensor_im_radiation_sheet_d':
      return sensorFrame({
        code: 'S59',
        title: '側面 補助放熱ブリッジ SHEET D (SONY Ref.509)',
        viewTag: '側面熱橋断面',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: Moving Sensor Unit with Rear Sheet B + Side Flank Sheet D -->
          <rect x="24" y="44" width="96" height="68" rx="5" fill="#0f766e" stroke="#115e59" stroke-width="1.3"/>
          <text x="72" y="72" text-anchor="middle" font-size="7.5" font-weight="800" fill="#ffffff">撮像素子</text>
          <text x="72" y="84" text-anchor="middle" font-size="7" fill="#ccfbf1">ユニット側面</text>
          <!-- Rear Sheet B strip on left edge -->
          <rect x="18" y="48" width="6" height="60" rx="1.5" fill="#ea580c"/>
          <text x="48" y="126" text-anchor="middle" font-size="6.6" font-weight="700" fill="#c2410c">背面 Sheet B 連携</text>
          <!-- Flexible L-Bend Side Thermal Bridge Sheet D spanning across IBIS gap -->
          <path d="M120,68 C154,68 158,54 184,54 C210,54 214,74 244,74" fill="none" stroke="#334155" stroke-width="9" stroke-linecap="round"/>
          <path d="M120,68 C154,68 158,54 184,54 C210,54 214,74 244,74" fill="none" stroke="#f97316" stroke-width="2.2" stroke-dasharray="6 4" marker-end="url(#a-S59-amber)"/>
          <text x="182" y="39" text-anchor="middle" font-size="7.1" font-weight="800" fill="#9a3412">Ref.509 側面フレキ熱橋 (Sheet D)</text>
          <!-- IBIS ±3mm flexibility arrow below bridge -->
          <line x1="154" y1="86" x2="210" y2="86" stroke="#0284c7" stroke-width="1.4" marker-start="url(#a-S59-cyan)" marker-end="url(#a-S59-cyan)"/>
          <text x="182" y="97" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0369a1">IBIS ±3mm 追従カーブ</text>
          <!-- Right: Stationary Magnesium Main Body Frame -->
          <rect x="246" y="38" width="98" height="80" rx="5" fill="#475569" stroke="#1e293b" stroke-width="1.3"/>
          <text x="295" y="66" text-anchor="middle" font-size="7.5" font-weight="800" fill="#ffffff">カメラ本体</text>
          <text x="295" y="79" text-anchor="middle" font-size="7.2" font-weight="700" fill="#e2e8f0">Mg メイン骨格</text>
          <text x="295" y="96" text-anchor="middle" font-size="6.7" font-weight="700" fill="#7dd3fc">広面積ボディ放熱</text>
          <!-- Bottom impact pill -->
          ${pill(226, 132, 224, 17, '背面B＋側面D並列排熱 → 4K連続温度 −3〜4℃', '#ecfdf5', '#059669', '#065f46', 7)}
        `,
        caption: '側面からMg骨格へ熱を逃がす補助グラファイトSheet Dが、背面Bと連携して4K温度を3–4℃低減',
      });

    // =========================================================================
    // S60 — Sony Ref.453/454/470 AS HEAT PLATE TOP 3-Layer Stack (sensor_as_heat_plate_top)
    // =========================================================================
    case 'sensor_as_heat_plate_top':
      return sensorFrame({
        code: 'S60',
        title: 'IBIS上部 アルミ放熱板 ＆ トップ黒鉛 (Ref.453/454/470)',
        viewTag: '上部3層放熱断面',
        accent: '#0369a1',
        headerBg: '#f0f9ff',
        body: `
          <!-- Upward heat exhaust arrows to top magnesium deck (cleanly flanking top label!) -->
          <line x1="62" y1="45" x2="62" y2="30" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-S60-red)"/>
          <line x1="210" y1="45" x2="210" y2="30" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-S60-red)"/>
          <text x="136" y="39" text-anchor="middle" font-size="7.1" font-weight="800" fill="#dc2626">カメラ上部（軍艦部Mg骨格）へ上方排熱</text>
          <!-- Layer 1 (Top): Ref.453 AS HEAT PLATE TOP (Aluminum Plate) -->
          <rect x="34" y="48" width="204" height="19" rx="2.5" fill="#94a3b8" stroke="#334155" stroke-width="1.2"/>
          <text x="136" y="60" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0f172a">① Ref.453 アルミ放熱板 AS HEAT PLATE TOP</text>
          <!-- Layer 2: Ref.454 MB GRAPHITE SHEET TOP A -->
          <rect x="34" y="69" width="204" height="15" rx="2" fill="#334155" stroke="#0f172a"/>
          <text x="136" y="79" text-anchor="middle" font-size="6.9" font-weight="700" fill="#fde047">② Ref.454 トップグラファイトシート A</text>
          <!-- Layer 3: Ref.470 TOP SPACER (Preserves IBIS clearance!) -->
          <rect x="34" y="86" width="204" height="15" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="3 2"/>
          <text x="136" y="96" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">③ Ref.470 トップスペーサー (IBIS可動クリアランス)</text>
          <!-- Bottom: IBIS Unit Top (CMOS + VCM Coils) -->
          <rect x="34" y="106" width="204" height="28" rx="3.5" fill="#1e3a8a"/>
          <text x="136" y="118.5" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">アンチシェイク (IBIS) ユニット最上部</text>
          <text x="136" y="129.5" text-anchor="middle" font-size="6.4" fill="#bfdbfe">CMOSセンサー熱 ＋ 5軸VCMコイル発熱を同時回収</text>
          <!-- Upward heat arrows positioned ONLY on far left/right outside text! -->
          <line x1="22" y1="120" x2="22" y2="54" stroke="#f97316" stroke-width="2" marker-end="url(#a-S60-amber)"/>
          <!-- Right summary box -->
          <rect x="248" y="42" width="100" height="96" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="298" y="56" text-anchor="middle" font-size="7.1" font-weight="800" fill="#0f172a">煙突排熱ブリッジ</text>
          <text x="298" y="73" text-anchor="middle" font-size="6.7" fill="#334155">・上へ昇る熱を効率回収</text>
          <text x="298" y="87" text-anchor="middle" font-size="6.7" fill="#0369a1">・可動干渉ゼロの隙間管理</text>
          <text x="298" y="101" text-anchor="middle" font-size="6.7" fill="#c2410c">・VCMコイルも同時冷却</text>
          <text x="298" y="115" text-anchor="middle" font-size="6.7" font-weight="700" fill="#059669">・ILCE-7M4 実機3層</text>
          <text x="298" y="129" text-anchor="middle" font-size="6.5" fill="#64748b">Ref.453 / 454 / 470</text>
        `,
        caption: 'アルミ板・トップ黒鉛・ギャップスペーサーの3層煙突がIBIS干渉ゼロで熱を軍艦部へ放出',
      });

    default:
      return null;
  }
}
