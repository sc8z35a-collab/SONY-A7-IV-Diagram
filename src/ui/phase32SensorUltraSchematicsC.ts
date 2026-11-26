import { PartExplanation } from '../assemblies/types';
import { pill, sensorFrame } from './sensorUltraSchematicFrame';

/**
 * Phase 32 Ultra-Detailed Sensor & 5-Axis IBIS Technical Schematics — Part C (S61–S90)
 * Full-width 360x176 accurate Sony OEM, ultra-anatomy, and 2026 frontier optical/CMOS/IBIS cutaways.
 */
export function renderPhase32SensorUltraSchematicC(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    // =========================================================================
    // S61 — Sony Ref.511 M1.7 NEW TRUSTER P2 Tri-Lobular Screws (sensor_new_truster_screws)
    // =========================================================================
    case 'sensor_new_truster_screws':
      return sensorFrame({
        code: 'S61',
        title: '緩み止め特殊ねじ M1.7 NEW TRUSTER P2 (Ref.511)',
        viewTag: '3葉断面・締結原理',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- LEFT: True Reuleaux Tri-Lobular Cross-Section vs Conventional Circle -->
          <rect x="14" y="30" width="154" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="91" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">トライロビュラ（3葉おにぎり）断面</text>
          <!-- Conventional circle dashed reference -->
          <circle cx="91" cy="87" r="29" fill="none" stroke="#94a3b8" stroke-width="1.1" stroke-dasharray="3 2"/>
          <!-- Authentic 3-lobe Reuleaux rounded triangle -->
          <path d="M91,56 C108,56 122,74 119,98 C115,114 96,118 91,116 C86,118 67,114 63,98 C60,74 74,56 91,56 Z" fill="#cbd5e1" stroke="#1e293b" stroke-width="2"/>
          <!-- 3 radial 120° high-pressure locking contact lobes -->
          <circle cx="91" cy="57" r="3.6" fill="#dc2626"/>
          <circle cx="117" cy="100" r="3.6" fill="#dc2626"/>
          <circle cx="65" cy="100" r="3.6" fill="#dc2626"/>
          <text x="91" y="90" text-anchor="middle" font-size="7" font-weight="800" fill="#0f172a">120°×3点</text>
          <text x="91" y="100" text-anchor="middle" font-size="6.4" font-weight="700" fill="#dc2626">塑性噛合ロック</text>
          <text x="91" y="135" text-anchor="middle" font-size="6.7" font-weight="700" fill="#475569">破線: 通常丸ねじ (振動で緩む)</text>
          <!-- RIGHT: Clean Dry-Lock Optical Chamber Benefits -->
          <rect x="176" y="30" width="172" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="262" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">無接着・低発塵の光学室専用締結</text>
          <!-- Side screw profile -->
          <rect x="190" y="54" width="38" height="10" rx="2" fill="#475569"/>
          <rect x="200" y="64" width="18" height="44" fill="#94a3b8" stroke="#334155"/>
          ${[70, 77, 84, 91, 98, 105].map((y) => `<line x1="199" y1="${y}" x2="219" y2="${y - 2}" stroke="#1e293b" stroke-width="1.2"/>`).join('')}
          <text x="209" y="120" text-anchor="middle" font-size="6.7" font-weight="700" fill="#334155">M1.7 × 2.5mm</text>
          <text x="209" y="131" text-anchor="middle" font-size="6.5" fill="#64748b">× 6点締結</text>
          <!-- Clean benefit pills on right -->
          ${pill(288, 63, 104, 17, '接着剤ゼロ→曇り0', '#ecfdf5', '#059669', '#065f46', 6.9)}
          ${pill(288, 86, 104, 17, '低発塵 転造ねじ山', '#eff6ff', '#2563eb', '#1e40af', 6.9)}
          ${pill(288, 109, 104, 17, '超音波/IBIS耐振◎', '#fff7ed', '#ea580c', '#9a3412', 6.9)}
          <text x="288" y="133" text-anchor="middle" font-size="6.5" font-weight="700" fill="#475569">SONY Ref.511: 398973512</text>
        `,
        caption: '3葉おにぎり断面が雌ねじと3方向で機械噛合し、光学室を曇らせる接着剤なしで緩みを完全防止',
      });

    // =========================================================================
    // S62 — Ultra-Compliant CuBe2 Floating ESD Ground Leaf (sensor_esd_ground_leaf)
    // =========================================================================
    case 'sensor_esd_ground_leaf':
      return sensorFrame({
        code: 'S62',
        title: 'IBIS 可動〜固定間 極薄 CuBe2 アース接地バネ',
        viewTag: 'ESD接地断面',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Left: Floating IBIS Stage sitting on INSULATING Si3N4 Ceramic Ball -->
          <rect x="20" y="38" width="114" height="24" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
          <text x="77" y="53" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0f172a">IBIS 可動ステージ</text>
          <!-- Insulating Ceramic Ball (blocks electrical conduction!) -->
          <circle cx="77" cy="83" r="15" fill="#1e293b" stroke="#0f172a"/>
          <text x="77" y="86" text-anchor="middle" font-size="6.4" font-weight="700" fill="#fca5a5">絶縁球</text>
          <!-- Fixed Magnesium Base Chassis (0V GND) -->
          <rect x="20" y="102" width="234" height="22" rx="4" fill="#475569"/>
          <text x="137" y="116" text-anchor="middle" font-size="7.3" font-weight="700" fill="#ffffff">固定 Mg ベースシャーシ（本体基準 GND 0V）</text>
          <!-- Ultra-Thin 0.04mm Gold-Plated CuBe2 S-Curve Grounding Leaf Spring bridging stage -> chassis -->
          <path d="M134,50 L166,50 C196,50 196,75 166,78 C142,80 142,102 174,102 L226,102" fill="none" stroke="#eab308" stroke-width="3.6" stroke-linecap="round"/>
          <!-- Discharge current arrows flowing along leaf spring -->
          <path d="M140,44 L170,44" stroke="#059669" stroke-width="1.6" marker-end="url(#a-S62-green)"/>
          <text x="196" y="42" font-size="7" font-weight="800" fill="#059669">静電気 e⁻ 放電</text>
          <!-- Contact clip onto chassis -->
          <rect x="218" y="96" width="16" height="8" rx="1.5" fill="#ca8a04"/>
          <!-- Right specification panel -->
          <rect x="262" y="34" width="88" height="106" rx="5" fill="#fefce8" stroke="#eab308"/>
          <text x="306" y="48" text-anchor="middle" font-size="7.1" font-weight="800" fill="#854d0e">CuBe2 極薄接地</text>
          <text x="306" y="64" text-anchor="middle" font-size="7.1" font-weight="800" fill="#0f172a">t = 0.04 mm</text>
          <text x="306" y="78" text-anchor="middle" font-size="6.9" font-weight="700" fill="#059669">抵抗 &lt; 20 mΩ</text>
          <text x="306" y="92" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">反力 &lt;0.05 N/mm</text>
          <text x="306" y="108" text-anchor="middle" font-size="6.4" fill="#334155">1億回屈曲耐久</text>
          <text x="306" y="120" text-anchor="middle" font-size="6.4" fill="#334155">ESD破壊・ノイズ筋</text>
          <text x="306" y="131" text-anchor="middle" font-size="6.5" font-weight="700" fill="#b45309">常時0V同電位化</text>
          <text x="137" y="139" text-anchor="middle" font-size="6.8" font-weight="700" fill="#475569">絶縁セラミック球で宙に浮くステージの帯電をS字金めっきバネで常時接地</text>
        `,
        caption: '厚さ0.04mmのS字ベリリウム銅接地バネがIBIS動作を妨げず浮遊ステージを20mΩ以下で常時接地',
      });

    // =========================================================================
    // S63 — Factory Individual Calibration QR Tag (sensor_dra_qr_plate)
    // =========================================================================
    case 'sensor_dra_qr_plate':
      return sensorFrame({
        code: 'S63',
        title: '工場個体校正 QR 識別タグ (Sony Imager DRA Data)',
        viewTag: '個体校正フロー',
        accent: '#0f172a',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Authentic 6x6mm Laser-Engraved 2D DataMatrix Plate -->
          <rect x="16" y="34" width="94" height="96" rx="5" fill="#e2e8f0" stroke="#475569" stroke-width="1.3"/>
          <text x="63" y="47" text-anchor="middle" font-size="6.8" font-weight="800" fill="#0f172a">6×6mm レーザー刻印</text>
          <!-- Authentic DataMatrix (solid L finder left+bottom, alternating top+right clock, data modules) -->
          <rect x="33" y="53" width="60" height="60" rx="2" fill="#ffffff" stroke="#1e293b" stroke-width="1"/>
          <!-- Left & Bottom solid L-finder -->
          <rect x="37" y="57" width="5" height="52" fill="#0f172a"/>
          <rect x="37" y="104" width="52" height="5" fill="#0f172a"/>
          <!-- Top & Right alternating timing modules -->
          ${[0, 2, 4, 6, 8].map((i) => `<rect x="${42 + i * 5}" y="57" width="5" height="5" fill="#0f172a"/>`).join('')}
          ${[0, 2, 4, 6, 8].map((i) => `<rect x="84" y="${57 + i * 5}" width="5" height="5" fill="#0f172a"/>`).join('')}
          <!-- Deterministic data matrix bits -->
          ${[
            [1, 1], [3, 1], [4, 1], [6, 1],
            [1, 2], [2, 2], [5, 2], [7, 2],
            [2, 3], [4, 3], [5, 3], [6, 3],
            [1, 4], [3, 4], [6, 4], [7, 4],
            [1, 5], [2, 5], [4, 5], [7, 5],
            [2, 6], [3, 6], [5, 6], [6, 6],
            [1, 7], [4, 7], [5, 7], [7, 7],
          ]
            .map(([c, r]) => `<rect x="${37 + c * 5}" y="${57 + r * 5}" width="5" height="5" fill="#0f172a"/>`)
            .join('')}
          <text x="63" y="124" text-anchor="middle" font-size="6.4" font-weight="700" fill="#334155">DataMatrix / QR</text>
          <!-- Arrow 1: QR Reader Scan -->
          <line x1="112" y1="82" x2="140" y2="82" stroke="#2563eb" stroke-width="2" marker-end="url(#a-S63-blue)"/>
          <text x="126" y="75" text-anchor="middle" font-size="6.4" font-weight="700" fill="#1d4ed8">読取</text>
          <!-- Center: DRA Calibration Dataset -->
          <rect x="144" y="34" width="102" height="96" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="1.2"/>
          <text x="195" y="48" text-anchor="middle" font-size="7.2" font-weight="800" fill="#1e40af">Imager DRA Data</text>
          <rect x="152" y="55" width="86" height="18" rx="3" fill="#ffffff" stroke="#93c5fd"/>
          <text x="195" y="66.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0f172a">① 欠陥画素座標マップ</text>
          <rect x="152" y="77" width="86" height="18" rx="3" fill="#ffffff" stroke="#93c5fd"/>
          <text x="195" y="88.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0f172a">② 感度シェーディング</text>
          <rect x="152" y="99" width="86" height="18" rx="3" fill="#ffffff" stroke="#93c5fd"/>
          <text x="195" y="110.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0f172a">③ 色温度 / WB 個体係数</text>
          <!-- Arrow 2: Write to SY Mainboard / BIONZ XR -->
          <line x1="248" y1="82" x2="270" y2="82" stroke="#059669" stroke-width="2" marker-end="url(#a-S63-green)"/>
          <!-- Right: SY Mainboard + BIONZ XR Real-time Correction -->
          <rect x="274" y="42" width="74" height="80" rx="5" fill="#064e3b" stroke="#059669"/>
          <text x="311" y="62" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">BIONZ XR</text>
          <text x="311" y="75" text-anchor="middle" font-size="6.6" fill="#a7f3d0">SY基板 EEPROM</text>
          <text x="311" y="94" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fde047">全撮影フレーム</text>
          <text x="311" y="106" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">自動精密補正</text>
          <text x="180" y="144" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">センサーまたはSY基板交換時にソニー専用治具でDRAカルテを紐付け書込</text>
        `,
        caption: '1枚ごとの欠陥画素・感度ムラ・WB校正カルテ(DRA Data)をQR紐付けしBIONZ XRで常時補正',
      });

    // =========================================================================
    // S64 — Non-Magnetic Nickel-Silver Rear PCB EMI Shield Can (sensor_pcb_emi_shield_can)
    // =========================================================================
    case 'sensor_pcb_emi_shield_can':
      return sensorFrame({
        code: 'S64',
        title: '非磁性 洋白（ニッケル銀）EMI シールド缶断面',
        viewTag: '電磁遮蔽・非磁性',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Left/Main Cross-Section: Nickel-Silver C7521 Faraday Cage over Sensor PCB -->
          <!-- Top: External IBIS N52 Magnetic Field passing through UNDISTURBED (μ_r = 1.0!) -->
          <path d="M56,34 C112,26 196,26 248,34" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-dasharray="4 2" marker-end="url(#a-S64-blue)"/>
          <text x="152" y="42" text-anchor="middle" font-size="7" font-weight="700" fill="#1d4ed8">IBIS 静磁場には完全無干渉 (非磁性 μ_r = 1.0)</text>
          <!-- C7521 Nickel-Silver Ultra-Thin 0.15mm EMI Shield Can -->
          <path d="M36,112 L36,52 L268,52 L268,112 L258,112 L258,64 L46,64 L46,112 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.3"/>
          <text x="152" y="60.5" text-anchor="middle" font-size="6.7" font-weight="800" fill="#0f172a">洋白 C7521 (Cu-Ni-Zn) t=0.15mm / 0.6g</text>
          <!-- Inside Faraday cavity: High-speed SLVS-EC Serializer & PLL generating GHz RF waves -->
          <rect x="64" y="88" width="76" height="22" rx="2.5" fill="#1e293b"/>
          <text x="102" y="101.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#38bdf8">SLVS-EC 出力IC</text>
          <rect x="164" y="88" width="76" height="22" rx="2.5" fill="#312e81"/>
          <text x="202" y="101.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#c4b5fd">PLL クロック</text>
          <!-- GHz RF Noise waves trapped & reflected back inside the shield can -->
          <path d="M102,86 L96,74 L108,74 L102,66" fill="none" stroke="#dc2626" stroke-width="1.5"/>
          <path d="M202,86 L196,74 L208,74 L202,66" fill="none" stroke="#dc2626" stroke-width="1.5"/>
          <text x="152" y="79" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">100M–10GHz RF封込</text>
          <!-- Conductive Gasket & Solder Ground Clips -->
          <rect x="30" y="104" width="6" height="8" fill="#eab308"/>
          <rect x="268" y="104" width="6" height="8" fill="#eab308"/>
          <!-- Sensor PCB Ground Plane -->
          <rect x="24" y="112" width="256" height="14" rx="2" fill="#065f46"/>
          <text x="152" y="121.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#a7f3d0">センサー基板 外周GNDランド半田クリップ ＋ 導電ガスケット</text>
          <!-- Right specs card -->
          <rect x="288" y="42" width="62" height="92" rx="5" fill="#f5f3ff" stroke="#a78bfa"/>
          <text x="319" y="58" text-anchor="middle" font-size="7" font-weight="800" fill="#5b21b6">遮蔽性能</text>
          <text x="319" y="74" text-anchor="middle" font-size="8.2" font-weight="800" fill="#7c3aed">&gt; 35 dB</text>
          <text x="319" y="88" text-anchor="middle" font-size="6.3" fill="#334155">98%超遮断</text>
          <line x1="296" y1="96" x2="342" y2="96" stroke="#c4b5fd"/>
          <text x="319" y="109" text-anchor="middle" font-size="6.5" font-weight="700" fill="#059669">磁石につかず</text>
          <text x="319" y="120" text-anchor="middle" font-size="6.5" font-weight="700" fill="#059669">IBIS無負荷</text>
          <text x="152" y="139" text-anchor="middle" font-size="6.8" font-weight="700" fill="#5b21b6">高速信号の電波ノイズだけを遮断し、IBIS磁石には一切引き寄せられない理想シールド</text>
        `,
        caption: '完全非磁性(μ_r=1.0)の洋白C7521極薄シールド缶がIBIS磁場に干渉せずGHz帯電波を35dB超遮断',
      });

    // =========================================================================
    // S65 — Dual-Axis Birefringent Quartz OLPF & λ/4 Plate (sensor_birefringent_olpf)
    // =========================================================================
    case 'sensor_birefringent_olpf':
      return sensorFrame({
        code: 'S65',
        title: '2軸 複屈折水晶 OLPF ＆ λ/4 デポラライザー光路',
        viewTag: '3層結晶光路',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Incident 1 beam entering from left -->
          <line x1="16" y1="84" x2="52" y2="84" stroke="#1e293b" stroke-width="2.4" marker-end="url(#a-S65-slate)"/>
          <text x="34" y="75" text-anchor="middle" font-size="6.9" font-weight="700" fill="#1e293b">1点入射</text>
          <!-- Plate 1: Horizontal 45° Birefringent Quartz -->
          <rect x="56" y="42" width="46" height="86" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-width="1.3"/>
          <text x="79" y="36" text-anchor="middle" font-size="7" font-weight="800" fill="#0369a1">① 水平水晶</text>
          <line x1="56" y1="84" x2="102" y2="84" stroke="#2563eb" stroke-width="1.8"/>
          <line x1="56" y1="84" x2="102" y2="66" stroke="#dc2626" stroke-width="1.8"/>
          <text x="79" y="119" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0c4a6e">45°カット</text>
          <!-- Plate 2: λ/4 Quarter-Wave Depolarizer -->
          <rect x="114" y="42" width="38" height="86" rx="3" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.3"/>
          <text x="133" y="36" text-anchor="middle" font-size="7" font-weight="800" fill="#6d28d9">② λ/4板</text>
          <line x1="102" y1="66" x2="164" y2="66" stroke="#dc2626" stroke-width="1.6"/>
          <line x1="102" y1="84" x2="164" y2="84" stroke="#2563eb" stroke-width="1.6"/>
          <text x="133" y="106" text-anchor="middle" font-size="6.4" font-weight="700" fill="#5b21b6">円偏光</text>
          <text x="133" y="116" text-anchor="middle" font-size="6.3" fill="#5b21b6">リセット</text>
          <!-- Plate 3: Vertical 45° Birefringent Quartz -->
          <rect x="164" y="42" width="46" height="86" rx="3" fill="#a7f3d0" stroke="#059669" stroke-width="1.3"/>
          <text x="187" y="36" text-anchor="middle" font-size="7" font-weight="800" fill="#065f46">③ 垂直水晶</text>
          <!-- 2 beams split into 4 equal beams -->
          <line x1="164" y1="66" x2="210" y2="56" stroke="#dc2626" stroke-width="1.5"/>
          <line x1="164" y1="66" x2="210" y2="74" stroke="#ea580c" stroke-width="1.5"/>
          <line x1="164" y1="84" x2="210" y2="90" stroke="#2563eb" stroke-width="1.5"/>
          <line x1="164" y1="84" x2="210" y2="106" stroke="#0284c7" stroke-width="1.5"/>
          <text x="187" y="119" text-anchor="middle" font-size="6.4" font-weight="700" fill="#065f46">90°直交</text>
          <!-- 4 Output Rays into Bayer 2x2 Sub-Pixel Cluster on Right -->
          <line x1="210" y1="56" x2="246" y2="56" stroke="#dc2626" stroke-width="1.4" marker-end="url(#a-S65-red)"/>
          <line x1="210" y1="74" x2="246" y2="74" stroke="#ea580c" stroke-width="1.4" marker-end="url(#a-S65-amber)"/>
          <line x1="210" y1="90" x2="246" y2="90" stroke="#2563eb" stroke-width="1.4" marker-end="url(#a-S65-blue)"/>
          <line x1="210" y1="106" x2="246" y2="106" stroke="#0284c7" stroke-width="1.4" marker-end="url(#a-S65-cyan)"/>
          <!-- Right: 4-Point PSF on Bayer RGGB Grid -->
          <rect x="254" y="42" width="92" height="86" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="300" y="55" text-anchor="middle" font-size="7" font-weight="800" fill="#0f172a">4点分離 PSF</text>
          <rect x="272" y="62" width="26" height="22" fill="#fee2e2" stroke="#ef4444"/><circle cx="285" cy="73" r="4.5" fill="#dc2626"/>
          <rect x="302" y="62" width="26" height="22" fill="#dcfce7" stroke="#22c55e"/><circle cx="315" cy="73" r="4.5" fill="#16a34a"/>
          <rect x="272" y="88" width="26" height="22" fill="#dcfce7" stroke="#22c55e"/><circle cx="285" cy="99" r="4.5" fill="#16a34a"/>
          <rect x="302" y="88" width="26" height="22" fill="#dbeafe" stroke="#3b82f6"/><circle cx="315" cy="99" r="4.5" fill="#2563eb"/>
          <text x="300" y="122" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0369a1">分離幅 3.8〜5.9 µm</text>
          <text x="133" y="142" text-anchor="middle" font-size="6.9" font-weight="700" fill="#334155">水平水晶 ＋ λ/4板 ＋ 垂直水晶 の3枚積層で全色画素へ均等分配</text>
        `,
        caption: '水平水晶→λ/4円偏光板→垂直水晶の3層精密積層が光を1画素分だけ4点分離し偽色を根絶',
      });

    // =========================================================================
    // S66 — Hybrid CM500 Blue Phosphate Glass + 42-Layer Dichroic IR (sensor_cm500_dichroic_ir)
    // =========================================================================
    case 'sensor_cm500_dichroic_ir':
      return sensorFrame({
        code: 'S66',
        title: '青色リン酸銅ガラス (CM500) ＋ 42層誘電体ホットミラー',
        viewTag: '広角斜入射光路',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- Optical Stack Layers -->
          <!-- Layer 1: 42-Layer TiO2/SiO2 Dichroic Hot-Mirror Film -->
          <rect x="136" y="34" width="16" height="106" fill="#a855f7" stroke="#6b21a8" stroke-width="1"/>
          <line x1="141" y1="34" x2="141" y2="140" stroke="#e9d5ff" stroke-width="0.9"/>
          <line x1="147" y1="34" x2="147" y2="140" stroke="#e9d5ff" stroke-width="0.9"/>
          <!-- Layer 2: CM500 Blue Copper-Phosphate Absorptive IR Glass -->
          <rect x="152" y="34" width="68" height="106" fill="#38bdf8" opacity="0.65" stroke="#0284c7" stroke-width="1.2"/>
          <text x="186" y="78" text-anchor="middle" font-size="7.3" font-weight="800" fill="#0c4a6e">CM500系</text>
          <text x="186" y="89" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0c4a6e">青色リン酸銅</text>
          <text x="186" y="99" text-anchor="middle" font-size="6.5" fill="#0369a1">IR吸収ガラス</text>
          <!-- CMOS Sensor on far right -->
          <rect x="292" y="42" width="14" height="90" rx="2" fill="#1e3a8a"/>
          <text x="326" y="84" text-anchor="middle" font-size="7" font-weight="700" fill="#1e3a8a">CMOS</text>
          <text x="326" y="95" text-anchor="middle" font-size="6.5" fill="#059669">色転び0</text>
          <!-- Case A (Top): Normal-Incidence Visible passes & Normal NIR reflected by 42-layer film -->
          <line x1="20" y1="54" x2="288" y2="54" stroke="#22c55e" stroke-width="2" marker-end="url(#a-S66-green)"/>
          <text x="72" y="49" text-anchor="middle" font-size="6.8" font-weight="700" fill="#15803d">可視光 (420–650nm 透過)</text>
          <polyline points="20,66 135,66 78,80" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-S66-red)"/>
          <text x="64" y="90" text-anchor="middle" font-size="6.6" font-weight="700" fill="#dc2626">正面NIR: 42層で反射</text>
          <!-- Case B (Bottom): Steep Wide-Angle Oblique NIR leaks past dichroic film -> ABSORBED inside CM500! -->
          <line x1="22" y1="104" x2="184" y2="131" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4 2"/>
          <circle cx="186" cy="131" r="4" fill="#dc2626"/>
          <text x="186" y="119" text-anchor="middle" font-size="6.5" font-weight="800" fill="#991b1b">斜めNIRを吸収消滅!</text>
          <text x="76" y="132" text-anchor="middle" font-size="6.6" font-weight="700" fill="#b91c1c">広角斜入射NIR (反射漏れ)</text>
          <!-- Callout for 42-layer film -->
          <text x="255" y="114" text-anchor="middle" font-size="6.7" font-weight="700" fill="#6b21a8">42層 TiO₂/SiO₂</text>
          <text x="255" y="125" text-anchor="middle" font-size="6.5" fill="#475569">カットオフ 665nm</text>
          <text x="255" y="136" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0369a1">周辺マゼンタ被りゼロ</text>
        `,
        caption: '42層反射膜を斜め透過する広角の近赤外線も青色CM500ガラスが吸収し、周辺の色転びを根絶',
      });

    // =========================================================================
    // S67 — PZT Fired Ag-Ni Electrodes & Acoustic Impedance Bond (sensor_pzt_electrode_bond)
    // =========================================================================
    case 'sensor_pzt_electrode_bond':
      return sensorFrame({
        code: 'S67',
        title: 'PZT 両面焼成 Ag-Ni 電極 ＆ 音響インピーダンス整合層',
        viewTag: '音響伝達断面',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Layered Vertical Acoustic Stack on Left -->
          <rect x="26" y="34" width="184" height="12" rx="1.5" fill="#cbd5e1" stroke="#475569"/>
          <text x="118" y="42.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0f172a">上面 焼成 Ag-Ni 薄膜電極 (低接触抵抗)</text>
          <rect x="26" y="46" width="184" height="28" rx="1.5" fill="#f5f5f4" stroke="#78716c" stroke-width="1.2"/>
          <text x="118" y="59" text-anchor="middle" font-size="7.4" font-weight="800" fill="#292524">PZT 圧電セラミック (60–70 kHz)</text>
          <text x="118" y="69.5" text-anchor="middle" font-size="6.4" fill="#57534e">音響インピーダンス Z_PZT ≈ 30 MRayl</text>
          <rect x="26" y="74" width="184" height="11" rx="1" fill="#cbd5e1" stroke="#475569"/>
          <text x="118" y="82" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0f172a">下面 焼成 Ag-Ni 薄膜電極</text>
          <!-- Critical Acoustic Impedance-Matched High-Modulus Bond (<15 µm) -->
          <rect x="26" y="85" width="184" height="14" rx="1" fill="#fde047" stroke="#ca8a04" stroke-width="1.2"/>
          <text x="118" y="94.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#854d0e">音響整合 高弾性接着層 (&lt;15µm · 無気泡)</text>
          <!-- SSWF Optical Glass receiving full ultrasonic energy -->
          <rect x="26" y="99" width="184" height="24" rx="2" fill="#bae6fd" stroke="#0284c7" stroke-width="1.3"/>
          <text x="118" y="110" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0c4a6e">SSWF 最前面光学ガラス (Z_glass ≈ 13)</text>
          <text x="118" y="119.5" text-anchor="middle" font-size="6.4" fill="#0369a1">表面加速度 最大 8,000 G 級へ直結伝達</text>
          <!-- Acoustic wave propagation arrow cleanly along left side -->
          <line x1="16" y1="54" x2="16" y2="114" stroke="#0284c7" stroke-width="2.2" marker-end="url(#a-S67-cyan)"/>
          <!-- Right: Impedance Matching Principle Card -->
          <rect x="220" y="34" width="128" height="106" rx="5" fill="#ffffff" stroke="#7dd3fc"/>
          <text x="284" y="48" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0c4a6e">音響整合の物理</text>
          ${pill(284, 68, 114, 18, 'Z_bond ≈ √(Z₁·Z₂)', '#eff6ff', '#0284c7', '#0369a1', 7.1)}
          <text x="284" y="90" text-anchor="middle" font-size="6.7" fill="#dc2626">柔らかい接着剤: 振動が反射減衰</text>
          <text x="284" y="103" text-anchor="middle" font-size="6.7" font-weight="700" fill="#059669">高弾性整合層: 反射ロス極小!</text>
          <text x="284" y="118" text-anchor="middle" font-size="6.5" fill="#334155">・Ag-Ni焼成膜でマイグレーション防止</text>
          <text x="284" y="130" text-anchor="middle" font-size="6.5" fill="#334155">・防湿保護コートで高耐久動作</text>
          <text x="118" y="138" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0369a1">15µm未満の極薄硬質整合層が超音波エネルギーを無駄なく伝達</text>
        `,
        caption: '両面焼成Ag-Ni電極と15µm未満の音響整合接着層が反射ロスを抑え8,000G級振動を直結伝達',
      });

    // =========================================================================
    // S68 — Hardened SUS440C / ZrO2 Ceramic-Ball Race Plates (sensor_sus440c_ball_races)
    // =========================================================================
    case 'sensor_sus440c_ball_races':
      return sensorFrame({
        code: 'S68',
        title: '焼入れ SUS440C / ZrO₂ 超高硬度すべり座金 (HRC60)',
        viewTag: '接触応力断面',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Magnified Hertzian Contact Stack Cutaway -->
          <rect x="22" y="34" width="190" height="17" rx="2" fill="#cbd5e1" stroke="#64748b"/>
          <text x="117" y="45" text-anchor="middle" font-size="7" font-weight="700" fill="#334155">Mg 可動ステージ（軟らかい軽合金）</text>
          <!-- Upper Hardened SUS440C / ZrO2 Mirror-Lapped Raceway Insert -->
          <rect x="36" y="51" width="162" height="12" rx="1.5" fill="#475569" stroke="#0f172a" stroke-width="1.2"/>
          <text x="117" y="59.5" text-anchor="middle" font-size="6.5" font-weight="800" fill="#fde047">焼入れ SUS440C 座金 (HRC60 / Ra&lt;0.02µm)</text>
          <!-- Si3N4 Ceramic Ball sandwiched between mirror races -->
          <circle cx="117" cy="83" r="19" fill="#1e293b" stroke="#0f172a" stroke-width="1.3"/>
          <circle cx="110" cy="76" r="5" fill="#94a3b8" opacity="0.55"/>
          <text x="117" y="86" text-anchor="middle" font-size="7.1" font-weight="800" fill="#ffffff">Si₃N₄球</text>
          <!-- Hertzian Contact Pressure highlights (top & bottom contact points) -->
          <ellipse cx="117" cy="64" rx="10" ry="2.6" fill="#ef4444" opacity="0.85"/>
          <ellipse cx="117" cy="102" rx="10" ry="2.6" fill="#ef4444" opacity="0.85"/>
          <!-- Lower Hardened SUS440C / ZrO2 Mirror-Lapped Raceway Insert -->
          <rect x="36" y="103" width="162" height="12" rx="1.5" fill="#475569" stroke="#0f172a" stroke-width="1.2"/>
          <text x="117" y="111.5" text-anchor="middle" font-size="6.6" font-weight="800" fill="#fde047">固定側 SUS440C / ZrO₂ レース板</text>
          <!-- Fixed Magnesium Base Chassis -->
          <rect x="22" y="115" width="190" height="17" rx="2" fill="#94a3b8" stroke="#475569"/>
          <text x="117" y="126" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">IBIS 固定マグネシウム骨格</text>
          <!-- Callout pointing to Hertzian contact stress -->
          <line x1="128" y1="64" x2="220" y2="54" stroke="#dc2626" stroke-width="1"/>
          <!-- Right: Why Hardened Inserts Are Mandatory -->
          <rect x="220" y="34" width="128" height="106" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="284" y="48" text-anchor="middle" font-size="7.2" font-weight="800" fill="#dc2626">ヘルツ点接触 1.1 GPa</text>
          <text x="284" y="63" text-anchor="middle" font-size="6.6" fill="#334155">Mg直当てでは球がめり込み</text>
          <text x="284" y="74" text-anchor="middle" font-size="6.6" fill="#dc2626">圧痕(ディンプル)で引っ掛かる</text>
          <line x1="230" y1="82" x2="338" y2="82" stroke="#e2e8f0"/>
          ${pill(284, 96, 112, 16, '鏡面転がり μ < 0.002', '#ecfdf5', '#059669', '#065f46', 7)}
          <text x="284" y="117" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0f172a">固定×3 ＋ 可動×3 (3対)</text>
          <text x="284" y="130" text-anchor="middle" font-size="6.6" fill="#0369a1">0.5画素シフトも引っ掛かり0</text>
          <text x="117" y="143" text-anchor="middle" font-size="6.7" font-weight="700" fill="#334155">HRC60超の超高硬度インサートが長年の磁気予圧を無摩耗で支持</text>
        `,
        caption: 'HRC60超の鏡面SUS440C/ZrO₂レース座金が1.1GPaの点接触を受け止め、圧痕と引っ掛かりを根絶',
      });

    // =========================================================================
    // S69 — Slotted Anti-Eddy-Current Rear Flux Shunt (sensor_rear_flux_shunt)
    // =========================================================================
    case 'sensor_rear_flux_shunt':
      return sensorFrame({
        code: 'S69',
        title: '低渦電流スリット入り 背面磁気還流シャント板',
        viewTag: '渦電流低減比較',
        accent: '#0f766e',
        headerBg: '#f0fdfa',
        body: `
          <!-- LEFT: Solid Unslotted Plate -> Huge Eddy Current Braking Loops! -->
          <rect x="14" y="30" width="154" height="114" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="91" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#991b1b">スリットなし鉄板（渦電流ブレーキ大）</text>
          <rect x="34" y="52" width="114" height="62" rx="4" fill="#94a3b8" stroke="#475569" stroke-width="1.2"/>
          <!-- Huge circulating eddy-current loops -->
          <ellipse cx="66" cy="83" rx="22" ry="20" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 3"/>
          <ellipse cx="116" cy="83" rx="22" ry="20" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 3"/>
          <polygon points="88,83 84,76 92,76" fill="#dc2626"/>
          <polygon points="94,83 90,90 98,90" fill="#dc2626"/>
          <text x="91" y="126" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">大電流渦ループ → 制動ロス＆発熱</text>
          <text x="91" y="137" text-anchor="middle" font-size="6.5" fill="#7f1d1d">高周波手ブレ追従が遅れる</text>
          <!-- Arrow -->
          <line x1="170" y1="84" x2="184" y2="84" stroke="#0f766e" stroke-width="2" marker-end="url(#a-S69-green)"/>
          <!-- RIGHT: Photo-Etched Radial-Slotted 0.25mm Permalloy Shunt (Eddy 1/16, -20dB flux shield) -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.1"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#115e59">放射スリット入り 0.25mm パーマロイ</text>
          <rect x="206" y="52" width="124" height="62" rx="4" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
          <!-- Precision photo-etched radial eddy-current interruption slits -->
          ${[224, 246, 268, 290, 312]
            .map((x) => `<rect x="${x - 1.6}" y="58" width="3.2" height="50" rx="1" fill="#f0fdfa"/>`)
            .join('')}
          <rect x="218" y="75" width="100" height="16" rx="3" fill="#0f172a" stroke="#fde047" stroke-width="0.8"/>
          <text x="268" y="85.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#fde047">渦ループ細分化 → 1/16</text>
          <text x="268" y="126" text-anchor="middle" font-size="6.9" font-weight="800" fill="#0f766e">背面基板への漏れ磁束 −20 dB遮断</text>
          <text x="268" y="137" text-anchor="middle" font-size="6.6" fill="#115e59">8.5段IBIS高速応答 ＆ EMI抑制両立</text>
        `,
        caption: '放射スリット入り0.25mmパーマロイ板が渦電流ブレーキを1/16へ抑えつつ背面漏磁を20dB遮断',
      });

    // =========================================================================
    // S70 — Hydrophobic ePTFE Breather Vent & Desiccant (sensor_cavity_breather_desiccant)
    // =========================================================================
    case 'sensor_cavity_breather_desiccant':
      return sensorFrame({
        code: 'S70',
        title: '0.2µm 撥水 ePTFE 調圧ベント ＆ 防曇乾燥剤帯',
        viewTag: '調圧・防曇断面',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: Outside Atmosphere (Pressure ΔP, Water droplets & Dust) -->
          <rect x="14" y="34" width="82" height="106" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="55" y="48" text-anchor="middle" font-size="7.1" font-weight="700" fill="#475569">外気 (高山/航空)</text>
          <!-- Water droplet & dust bouncing off hydrophobic ePTFE -->
          <circle cx="48" cy="68" r="5" fill="#38bdf8" stroke="#0284c7"/>
          <path d="M54,68 L94,68 L74,77" fill="none" stroke="#dc2626" stroke-width="1.4" marker-end="url(#a-S70-red)"/>
          <text x="48" y="84" text-anchor="middle" font-size="6.4" font-weight="700" fill="#dc2626">水滴・塵 遮断</text>
          <!-- Air molecules passing freely both ways -->
          <line x1="36" y1="104" x2="146" y2="104" stroke="#059669" stroke-width="2" marker-start="url(#a-S70-green)" marker-end="url(#a-S70-green)"/>
          <text x="55" y="122" text-anchor="middle" font-size="6.6" font-weight="700" fill="#059669">空気分子のみ透過</text>
          <text x="55" y="133" text-anchor="middle" font-size="6.3" fill="#475569">内外気圧 ΔP=0</text>
          <!-- Center Wall: 0.2µm Hydrophobic Porous ePTFE Membrane -->
          <rect x="99" y="40" width="28" height="94" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="4 2"/>
          <text x="113" y="79" text-anchor="middle" font-size="6.6" font-weight="800" fill="#0369a1">ePTFE</text>
          <text x="113" y="91" text-anchor="middle" font-size="6.3" font-weight="700" fill="#0c4a6e">0.2µm</text>
          <!-- Right: Sealed Sensor Optical Cavity + Molecular-Sieve Desiccant Strip -->
          <rect x="128" y="34" width="220" height="106" rx="5" fill="#f0fdf4" stroke="#059669" stroke-width="1.2"/>
          <text x="238" y="49" text-anchor="middle" font-size="7.5" font-weight="800" fill="#065f46">乾燥光学室（内部露点 −30℃ 以下維持）</text>
          <!-- Optical glass flat (no barometric bowing!) -->
          <rect x="148" y="58" width="180" height="14" rx="2" fill="#bae6fd" stroke="#0284c7"/>
          <text x="238" y="67.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0c4a6e">光学ガラス平面維持（気圧差たわみゼロ）</text>
          <!-- Trace moisture absorbed by Molecular-Sieve Strip -->
          <rect x="156" y="106" width="164" height="24" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>
          <text x="238" y="117" text-anchor="middle" font-size="7" font-weight="800" fill="#92400e">非発塵モレキュラーシーブ乾燥帯</text>
          <text x="238" y="126.5" text-anchor="middle" font-size="6.3" fill="#b45309">残留水蒸気を細孔吸着 · SSWF振動でも粉落ちゼロ</text>
          <line x1="202" y1="84" x2="202" y2="104" stroke="#0284c7" stroke-width="1.5" marker-end="url(#a-S70-cyan)"/>
          <line x1="274" y1="84" x2="274" y2="104" stroke="#0284c7" stroke-width="1.5" marker-end="url(#a-S70-cyan)"/>
          <text x="238" y="95" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0369a1">微量湿気を常時吸着</text>
        `,
        caption: '0.2µm撥水ePTFE膜が水と塵を弾きつつ気圧差を逃がし、乾燥剤帯が高山・寒冷地の内部曇りを根絶',
      });

    // =========================================================================
    // S71 — Sony Patent Dual-Cell Liquid Crystal Electronic VND (sensor_electronic_vnd)
    // Authentic to Sony Nov 12, 2026 Patent US 2026/0358663 A1 & FX6/BURANO!
    // =========================================================================
    case 'sensor_electronic_vnd':
      return sensorFrame({
        code: 'S71',
        title: '2層ゲストホスト液晶 電子可変ND (e-ND: 1/4〜1/128)',
        viewTag: '電圧制御比較',
        accent: '#4f46e5',
        headerBg: '#eef2ff',
        body: `
          <!-- LEFT: Voltage OFF / Low -> Vertically Aligned Molecules -> Bright 1/4 ND -->
          <rect x="14" y="30" width="158" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          ${pill(93, 43, 134, 15, '低電圧：明るく透過 (ND 1/4)', '#fef9c3', '#ca8a04', '#854d0e', 7)}
          <!-- Bright incoming light rays -->
          <line x1="22" y1="74" x2="48" y2="74" stroke="#f59e0b" stroke-width="2.6" marker-end="url(#a-S71-amber)"/>
          <line x1="22" y1="96" x2="48" y2="96" stroke="#f59e0b" stroke-width="2.6" marker-end="url(#a-S71-amber)"/>
          <!-- 3 Glass Plates + Dual Stacked Guest-Host LC Cells -->
          <rect x="52" y="56" width="8" height="58" fill="#bae6fd" stroke="#0284c7" stroke-width="0.8"/>
          <rect x="60" y="56" width="22" height="58" fill="#eef2ff" stroke="#818cf8" stroke-width="0.7"/>
          <rect x="82" y="56" width="8" height="58" fill="#bae6fd" stroke="#0284c7" stroke-width="0.8"/>
          <rect x="90" y="56" width="22" height="58" fill="#eef2ff" stroke="#818cf8" stroke-width="0.7"/>
          <rect x="112" y="56" width="8" height="58" fill="#bae6fd" stroke="#0284c7" stroke-width="0.8"/>
          <!-- Molecules aligned along ray axis (horizontal rods -> minimal dye absorption!) -->
          ${[68, 85, 102].map((y) => `<ellipse cx="71" cy="${y}" rx="6.5" ry="2.2" fill="#6366f1"/><ellipse cx="101" cy="${y}" rx="6.5" ry="2.2" fill="#6366f1"/>`).join('')}
          <!-- Strong transmitted light -->
          <line x1="122" y1="74" x2="162" y2="74" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#a-S71-amber)"/>
          <line x1="122" y1="96" x2="162" y2="96" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#a-S71-amber)"/>
          <text x="93" y="126" text-anchor="middle" font-size="6.7" font-weight="700" fill="#4338ca">3枚ガラス＋2層液晶＋ITO透明電極</text>
          <text x="93" y="137" text-anchor="middle" font-size="6.5" fill="#475569">二色性色素が光軸平行 → 透過大</text>
          <!-- RIGHT: Voltage ON / High -> Molecules Tilted 90° -> Dark 1/128 ND -->
          <rect x="182" y="30" width="166" height="114" rx="5" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.2"/>
          ${pill(265, 43, 144, 15, '高電圧：無段階減光 (ND 1/128)', '#e0e7ff', '#4f46e5', '#312e81', 7)}
          <!-- Intense sunlight entering -->
          <line x1="190" y1="74" x2="216" y2="74" stroke="#f59e0b" stroke-width="2.8" marker-end="url(#a-S71-amber)"/>
          <line x1="190" y1="96" x2="216" y2="96" stroke="#f59e0b" stroke-width="2.8" marker-end="url(#a-S71-amber)"/>
          <!-- 3 Glass Plates + Darkened Dual LC Cells -->
          <rect x="220" y="56" width="8" height="58" fill="#bae6fd" stroke="#0284c7" stroke-width="0.8"/>
          <rect x="228" y="56" width="22" height="58" fill="#312e81" opacity="0.85"/>
          <rect x="250" y="56" width="8" height="58" fill="#bae6fd" stroke="#0284c7" stroke-width="0.8"/>
          <rect x="258" y="56" width="22" height="58" fill="#312e81" opacity="0.85"/>
          <rect x="280" y="56" width="8" height="58" fill="#bae6fd" stroke="#0284c7" stroke-width="0.8"/>
          <!-- Molecules upright perpendicular to light -> blocks both polarizations! -->
          ${[68, 85, 102].map((y) => `<ellipse cx="239" cy="${y}" rx="2.3" ry="6.2" fill="#a5b4fc"/><ellipse cx="269" cy="${y}" rx="2.3" ry="6.2" fill="#a5b4fc"/>`).join('')}
          <!-- Deeply attenuated transmitted beam -->
          <line x1="290" y1="85" x2="338" y2="85" stroke="#6366f1" stroke-width="1.4" stroke-dasharray="3 2" marker-end="url(#a-S71-purple)"/>
          <text x="316" y="75" text-anchor="middle" font-size="6.7" font-weight="800" fill="#3730a3">1/128</text>
          <text x="316" y="99" text-anchor="middle" font-size="6.4" fill="#4338ca">(−7段)</text>
          <text x="265" y="126" text-anchor="middle" font-size="6.7" font-weight="700" fill="#3730a3">応答 30〜50ms · 平面度 λ/4以下</text>
          <text x="265" y="137" text-anchor="middle" font-size="6.5" fill="#312e81">開放F1.2ボケのまま無段階シームレス減光</text>
        `,
        caption: '3枚ガラス・2層ゲストホスト液晶への印加電圧で分子角を連続制御し1/4〜1/128無段階減光',
      });

    // =========================================================================
    // S72 — Partially-Stacked Top/Bottom Readout Strips & DGO (sensor_partially_stacked_strips)
    // =========================================================================
    case 'sensor_partially_stacked_strips':
      return sensorFrame({
        code: 'S72',
        title: '部分積層 (Partially-Stacked) 上下高速帯 ＆ DGO',
        viewTag: '部分3D積層構造',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- LEFT: Top-Down / Cutaway View of Partially-Stacked Architecture (α7 V / Z6 III) -->
          <rect x="14" y="30" width="174" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="101" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#065f46">上下縁のみ2階建て積層（中央は単層BSI）</text>
          <!-- Top Stacked Readout Logic Strip (2-tier 3D!) -->
          <rect x="26" y="50" width="150" height="20" rx="2.5" fill="#059669" stroke="#064e3b" stroke-width="1.2"/>
          <text x="101" y="62.5" text-anchor="middle" font-size="7" font-weight="800" fill="#ffffff">上縁: 3D積層 高速ADC ＋ DGO帯</text>
          <!-- Center: Single-layer BSI 36x24mm Pixel Array (Cool & Low Noise!) -->
          <rect x="26" y="72" width="150" height="32" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2"/>
          <text x="101" y="86" text-anchor="middle" font-size="7.3" font-weight="800" fill="#0369a1">中央: 36×24mm 単層BSI画素部</text>
          <text x="101" y="97.5" text-anchor="middle" font-size="6.4" fill="#0c4a6e">直下発熱レス・低ノイズ・高歩留</text>
          <!-- Bottom Stacked Readout Logic Strip (2-tier 3D!) -->
          <rect x="26" y="106" width="150" height="20" rx="2.5" fill="#059669" stroke="#064e3b" stroke-width="1.2"/>
          <text x="101" y="118.5" text-anchor="middle" font-size="7" font-weight="800" fill="#ffffff">下縁: 3D積層 高速ADC ＋ DGO帯</text>
          <!-- Vertical dual-direction readout arrows on left/right edges -->
          <line x1="20" y1="86" x2="20" y2="58" stroke="#059669" stroke-width="1.5" marker-end="url(#a-S72-green)"/>
          <line x1="20" y1="90" x2="20" y2="118" stroke="#059669" stroke-width="1.5" marker-end="url(#a-S72-green)"/>
          <text x="101" y="138" text-anchor="middle" font-size="6.8" font-weight="700" fill="#065f46">従来BSI比 読出 3.5〜4.5 倍高速化</text>
          <!-- RIGHT: DGO (Dual Gain Output) Simultaneous HDR Merge -->
          <rect x="196" y="30" width="152" height="114" rx="5" fill="#ecfdf5" stroke="#34d399"/>
          <text x="272" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#065f46">DGO 同時2系統ゲイン合成</text>
          <rect x="206" y="52" width="60" height="26" rx="3" fill="#dbeafe" stroke="#2563eb"/>
          <text x="236" y="63.5" text-anchor="middle" font-size="6.7" font-weight="800" fill="#1e40af">高ゲイン</text>
          <text x="236" y="73" text-anchor="middle" font-size="6.1" fill="#1d4ed8">暗部ノイズ極小</text>
          <rect x="278" y="52" width="60" height="26" rx="3" fill="#fef3c7" stroke="#d97706"/>
          <text x="308" y="63.5" text-anchor="middle" font-size="6.7" font-weight="800" fill="#92400e">低ゲイン</text>
          <text x="308" y="73" text-anchor="middle" font-size="6.1" fill="#b45309">明部白飛び耐性</text>
          <line x1="236" y1="78" x2="264" y2="94" stroke="#059669" stroke-width="1.5" marker-end="url(#a-S72-green)"/>
          <line x1="308" y1="78" x2="280" y2="94" stroke="#059669" stroke-width="1.5" marker-end="url(#a-S72-green)"/>
          ${pill(272, 105, 130, 18, '1回露光で 16段 広DR合成', '#dcfce7', '#059669', '#065f46', 7)}
          <text x="272" y="131" text-anchor="middle" font-size="6.6" fill="#064e3b">Sony α7 V / Z6 III 世代標準</text>
        `,
        caption: '上下縁だけを2階建て3D積層化し、中央BSIの低発熱を保ったまま4倍高速読出と16段DGOを両立',
      });

    // =========================================================================
    // S73 — Curved Full-Frame CMOS Silicon Wafer (sensor_curved_substrate)
    // EXPLICITLY FIXED OPTICAL PHYSICS: rays DIVERGE from Lens Exit Pupil on left!
    // Concave retina curves forward at edges so diverging corner rays strike at 90°!
    // =========================================================================
    case 'sensor_curved_substrate':
      return sensorFrame({
        code: 'S73',
        title: '湾曲（カーブド）フルサイズ CMOS ＆ 網膜光学原理',
        viewTag: '平面vs湾曲光学',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- LEFT: Conventional FLAT CMOS (Diverging peripheral rays hit at steep oblique CRA!) -->
          <rect x="14" y="30" width="154" height="114" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="91" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#991b1b">従来 平面CMOS（周辺斜め入射）</text>
          <!-- Lens Exit Pupil on left -->
          <ellipse cx="32" cy="84" rx="6" ry="18" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
          <text x="32" y="112" text-anchor="middle" font-size="6.2" font-weight="700" fill="#0369a1">射出瞳</text>
          <!-- Diverging rays from exit pupil striking flat vertical sensor at steep angle -->
          <line x1="38" y1="84" x2="124" y2="54" stroke="#dc2626" stroke-width="1.6" marker-end="url(#a-S73-red)"/>
          <line x1="38" y1="84" x2="124" y2="84" stroke="#2563eb" stroke-width="1.6" marker-end="url(#a-S73-blue)"/>
          <line x1="38" y1="84" x2="124" y2="114" stroke="#dc2626" stroke-width="1.6" marker-end="url(#a-S73-red)"/>
          <!-- Flat vertical sensor -->
          <rect x="128" y="49" width="10" height="70" rx="1.5" fill="#475569"/>
          <text x="152" y="60" text-anchor="middle" font-size="6.4" font-weight="700" fill="#dc2626">斜め!</text>
          <text x="91" y="135" text-anchor="middle" font-size="6.7" fill="#991b1b">周辺減光・像面湾曲・レンズ大型化</text>
          <!-- Arrow -->
          <line x1="170" y1="84" x2="184" y2="84" stroke="#0891b2" stroke-width="2" marker-end="url(#a-S73-cyan)"/>
          <!-- RIGHT: Concave Curved CMOS (Edges curve forward toward pupil -> 90° Normal Incidence!) -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#ecfeff" stroke="#0891b2" stroke-width="1.2"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#155e75">湾曲CMOS (R≈100–150mm 網膜型)</text>
          <!-- Lens Exit Pupil on left -->
          <ellipse cx="206" cy="84" rx="6" ry="18" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
          <!-- Diverging rays hitting concave bowl strictly at 90° perpendicular! -->
          <line x1="212" y1="84" x2="294" y2="55" stroke="#0284c7" stroke-width="1.8" marker-end="url(#a-S73-cyan)"/>
          <line x1="212" y1="84" x2="310" y2="84" stroke="#0284c7" stroke-width="1.8" marker-end="url(#a-S73-cyan)"/>
          <line x1="212" y1="84" x2="294" y2="113" stroke="#0284c7" stroke-width="1.8" marker-end="url(#a-S73-cyan)"/>
          <!-- Concave Curved 50-100µm Silicon Wafer + Spherical Ceramic Bed (edges at x=296, center at x=314 -> concave facing left!) -->
          <path d="M298,50 Q320,84 298,118 L322,118 L322,50 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
          <path d="M296,50 Q318,84 296,118" fill="none" stroke="#0891b2" stroke-width="4.5" stroke-linecap="round"/>
          <!-- 90° right-angle indicators at top & bottom corners -->
          <text x="334" y="61" text-anchor="middle" font-size="6.7" font-weight="800" fill="#059669">90°</text>
          <text x="334" y="86" text-anchor="middle" font-size="6.7" font-weight="800" fill="#059669">90°</text>
          <text x="334" y="111" text-anchor="middle" font-size="6.7" font-weight="800" fill="#059669">90°</text>
          <text x="268" y="128" text-anchor="middle" font-size="6.7" font-weight="800" fill="#0e7490">50–100µm極薄Si · 周辺感度 1.4〜2倍</text>
          <text x="268" y="139" text-anchor="middle" font-size="6.4" fill="#155e75">像面湾曲を根本解消しレンズ超小型化</text>
        `,
        caption: 'レンズ射出瞳から広がる周辺光も90°垂直に受光できる網膜型湾曲Siで周辺感度最大2倍化',
      });

    // =========================================================================
    // S74 — Sony OEM IM ADJUST WASHER D 12-Step Shims (sensor_im_adjust_washers)
    // =========================================================================
    case 'sensor_im_adjust_washers':
      return sensorFrame({
        code: 'S74',
        title: '純正フランジバック選択シム IM ADJUST WASHER D',
        viewTag: '12段シム校正',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Left: E-Mount Flange Reference Plane -->
          <rect x="18" y="34" width="38" height="104" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.3"/>
          <text x="37" y="82" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0f172a">Eマウント</text>
          <text x="37" y="94" text-anchor="middle" font-size="6.6" fill="#334155">基準面</text>
          <!-- Exact 18.000 ± 0.005 mm optical flange-back distance arrow -->
          <line x1="58" y1="86" x2="152" y2="86" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="4 2" marker-start="url(#a-S74-blue)" marker-end="url(#a-S74-blue)"/>
          ${pill(105, 72, 82, 16, '18.000 ±0.005mm', '#dbeafe', '#2563eb', '#1e40af', 6.9)}
          <!-- 3 Kinematic Mounting Bosses with Different Selected Thickness Shims -->
          <!-- Boss 1 (Top): Thick shim 0.250mm -->
          <rect x="154" y="40" width="16" height="22" rx="1.5" fill="#f59e0b" stroke="#b45309"/>
          <text x="148" y="54" text-anchor="end" font-size="6.7" font-weight="700" fill="#b45309">0.250mm</text>
          <!-- Boss 2 (Middle): Medium shim 0.100mm -->
          <rect x="160" y="75" width="10" height="22" rx="1.5" fill="#2563eb" stroke="#1e40af"/>
          <text x="155" y="106" text-anchor="end" font-size="6.7" font-weight="700" fill="#1d4ed8">0.100mm</text>
          <!-- Boss 3 (Bottom): Ultra-thin shim 0.025mm -->
          <rect x="165" y="110" width="5" height="22" rx="1" fill="#059669" stroke="#065f46"/>
          <text x="155" y="124" text-anchor="end" font-size="6.7" font-weight="700" fill="#065f46">0.025mm</text>
          <!-- IBIS Base Chassis + Sensor Leveled Strictly Vertical -->
          <rect x="172" y="34" width="44" height="104" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.3"/>
          <text x="194" y="82" text-anchor="middle" font-size="7.4" font-weight="800" fill="#0c4a6e">IBIS</text>
          <text x="194" y="94" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0369a1">完全平行</text>
          <!-- Right: 12-Step Sony OEM Shim Staircase (0.025 to 0.600 mm) -->
          <rect x="226" y="34" width="122" height="104" rx="5" fill="#f8fafc" stroke="#93c5fd"/>
          <text x="287" y="47" text-anchor="middle" font-size="7.1" font-weight="800" fill="#1e40af">SONY Ref.456 (全12種)</text>
          <!-- Mini 12-step thickness bar chart -->
          ${Array.from({ length: 12 }, (_, i) => {
            const h = 6 + i * 3.4;
            const x = 236 + i * 8.6;
            return `<rect x="${x}" y="${102 - h}" width="6.2" height="${h}" rx="1" fill="${i < 4 ? '#10b981' : i < 8 ? '#3b82f6' : '#f59e0b'}"/>`;
          }).join('')}
          <text x="236" y="114" font-size="6.3" font-weight="700" fill="#059669">25µm</text>
          <text x="339" y="114" text-anchor="end" font-size="6.3" font-weight="700" fill="#b45309">600µm</text>
          <text x="287" y="128" text-anchor="middle" font-size="6.6" font-weight="700" fill="#1e3a8a">3点ボス下で片ボケ傾きゼロ校正</text>
        `,
        caption: '25〜600µmの12種純正シムを3点ボスへ最適組合せし、Eマウント18.000mmと像面平行を厳守',
      });

    // =========================================================================
    // S75 — Dedicated Mechanical Sensor Dust Shield Curtain (sensor_mechanical_dust_shield)
    // =========================================================================
    case 'sensor_mechanical_dust_shield':
      return sensorFrame({
        code: 'S75',
        title: '電源OFF自動閉鎖 独立メカニカルセンサー保護幕',
        viewTag: '開閉状態比較',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- LEFT: Power ON (Blades Retracted Completely Clear of 36x24 Aperture) -->
          <rect x="14" y="30" width="158" height="114" rx="5" fill="#f0f9ff" stroke="#7dd3fc"/>
          ${pill(93, 43, 128, 15, '電源 ON：上下完全退避', '#dbeafe', '#2563eb', '#1e40af', 7)}
          <rect x="34" y="54" width="118" height="68" rx="4" fill="#e2e8f0" stroke="#475569"/>
          <!-- Retracted top & bottom blades -->
          <rect x="42" y="56" width="102" height="8" rx="1" fill="#1e293b"/>
          <rect x="42" y="112" width="102" height="8" rx="1" fill="#1e293b"/>
          <!-- Open clear 36x24 CMOS Sensor -->
          <rect x="48" y="68" width="90" height="40" rx="2" fill="#0284c7" stroke="#0369a1"/>
          <text x="93" y="86" text-anchor="middle" font-size="7.3" font-weight="800" fill="#ffffff">36×24 CMOS</text>
          <text x="93" y="97" text-anchor="middle" font-size="6.4" fill="#bae6fd">撮影光束 100%開放</text>
          <text x="93" y="135" text-anchor="middle" font-size="6.7" fill="#0369a1">撮影シャッターと完全独立リンク</text>
          <!-- Transition arrow -->
          <line x1="173" y1="86" x2="185" y2="86" stroke="#334155" stroke-width="1.8" marker-end="url(#a-S75-slate)"/>
          <!-- RIGHT: Power OFF (0.04s Auto-Closed Interlocking Blades Blocking Dust!) -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
          ${pill(268, 43, 138, 15, '電源 OFF：0.04秒 自動密閉', '#1e293b', '#0f172a', '#fde047', 7)}
          <rect x="206" y="54" width="112" height="68" rx="4" fill="#e2e8f0" stroke="#334155"/>
          <!-- Interlocking matte-black CFRP upper & lower composite blades -->
          <rect x="212" y="59" width="100" height="28" rx="2" fill="#1e293b" stroke="#0f172a"/>
          <rect x="212" y="89" width="100" height="28" rx="2" fill="#334155" stroke="#0f172a"/>
          <line x1="212" y1="88" x2="312" y2="88" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
          <text x="262" y="76" text-anchor="middle" font-size="6.9" font-weight="700" fill="#f8fafc">高剛性 遮光保護幕 (上)</text>
          <text x="262" y="106" text-anchor="middle" font-size="6.9" font-weight="700" fill="#f8fafc">高剛性 遮光保護幕 (下)</text>
          <!-- Dust particles bounced off on right -->
          <circle cx="332" cy="74" r="2.6" fill="#dc2626"/>
          <circle cx="336" cy="96" r="2.4" fill="#dc2626"/>
          <text x="334" y="88" text-anchor="middle" font-size="6.5" font-weight="800" fill="#dc2626">遮断</text>
          <text x="268" y="135" text-anchor="middle" font-size="6.8" font-weight="700" fill="#059669">屋外レンズ交換ゴミ付着 95%削減</text>
        `,
        caption: '電源OFFで撮影シャッターとは別の高剛性専用保護幕が0.04秒で閉じ、砂埃・指接触を遮断',
      });

    // =========================================================================
    // S76 — 2x Wide-Stroke Roll IBIS & 5-Segment Halbach Magnet Array (sensor_double_roll_halbach)
    // Authentic 5-segment Halbach array (↑ → ↓ ← ↑) cancelling top field & boosting bottom +40%!
    // =========================================================================
    case 'sensor_double_roll_halbach':
      return sensorFrame({
        code: 'S76',
        title: '5分割 ハルバッハ配列 VCM ＆ 2倍ロール広ストローク',
        viewTag: 'ハルバッハ磁束',
        accent: '#ea580c',
        headerBg: '#fff7ed',
        body: `
          <!-- Top side: CANCELLED leakage flux (≈ 0 T!) -->
          <text x="128" y="39" text-anchor="middle" font-size="7.1" font-weight="800" fill="#059669">背面側：磁束が打ち消し合い 漏磁 ≈ 0（ヨーク軽量化!）</text>
          <!-- 5-Segment Halbach N52 Magnet Array: ↑  →  ↓  ←  ↑ -->
          <rect x="18" y="46" width="42" height="28" rx="2" fill="#ef4444" stroke="#991b1b"/><text x="39" y="63" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">↑ N</text>
          <rect x="62" y="46" width="42" height="28" rx="2" fill="#f97316" stroke="#9a3412"/><text x="83" y="63" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">→</text>
          <rect x="106" y="46" width="42" height="28" rx="2" fill="#2563eb" stroke="#1e40af"/><text x="127" y="63" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">↓ S</text>
          <rect x="150" y="46" width="42" height="28" rx="2" fill="#f97316" stroke="#9a3412"/><text x="171" y="63" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">←</text>
          <rect x="194" y="46" width="42" height="28" rx="2" fill="#ef4444" stroke="#991b1b"/><text x="215" y="63" text-anchor="middle" font-size="8.2" font-weight="800" fill="#ffffff">↑ N</text>
          <!-- Concentrated Flux Loops ONLY on bottom coil side (+40% B!) -->
          <path d="M39,75 C39,112 127,112 127,75" fill="none" stroke="#ea580c" stroke-width="2.5" marker-end="url(#a-S76-amber)"/>
          <path d="M215,75 C215,112 127,112 127,75" fill="none" stroke="#ea580c" stroke-width="2.5" marker-end="url(#a-S76-amber)"/>
          <!-- VCM Coil positioned cleanly in the concentrated flux belt -->
          <rect x="42" y="82" width="170" height="15" rx="3" fill="#ffedd5" stroke="#c2410c" stroke-width="1.2"/>
          <text x="127" y="92" text-anchor="middle" font-size="7" font-weight="800" fill="#9a3412">VCMコイル面へ磁束 +40% 片側集中!</text>
          <text x="127" y="123" text-anchor="middle" font-size="7" font-weight="700" fill="#c2410c">90°回転着磁 (↑→↓←↑) で片面倍増・背面打消</text>
          <text x="127" y="136" text-anchor="middle" font-size="6.7" fill="#334155">消費電力・発熱 −30% ＆ 高トルク広ストローク</text>
          <!-- Right: 2x Wide-Stroke Roll Performance Panel -->
          <rect x="246" y="34" width="102" height="106" rx="5" fill="#ffffff" stroke="#fdba74"/>
          <text x="297" y="48" text-anchor="middle" font-size="7.2" font-weight="800" fill="#9a3412">2倍ロール補正</text>
          <!-- Curved roll motion indicator -->
          <path d="M268,74 A32,32 0 0,1 326,74" fill="none" stroke="#ea580c" stroke-width="2.2" marker-start="url(#a-S76-amber)" marker-end="url(#a-S76-amber)"/>
          <text x="297" y="82" text-anchor="middle" font-size="7.2" font-weight="800" fill="#c2410c">Roll 2× 角</text>
          ${pill(297, 102, 88, 16, '中央 8.5段補正', '#fff7ed', '#ea580c', '#9a3412', 7)}
          ${pill(297, 123, 88, 16, '周辺 7.0段補正', '#eff6ff', '#2563eb', '#1e40af', 7)}
        `,
        caption: '90°回転ハルバッハ配列で磁束をコイル側へ+40%片側集中し、2倍ロール域と中央8.5/周辺7段を実現',
      });

    // =========================================================================
    // S77 — Pixel-Shift Sub-Micron Optical Linear Scale (sensor_pixelshift_submicron_scale)
    // =========================================================================
    case 'sensor_pixelshift_submicron_scale':
      return sensorFrame({
        code: 'S77',
        title: 'ピクセルシフト専用 サブミクロン光学リニアスケール',
        viewTag: '0.5画素ステップ',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- LEFT: Ultra-Low-CTE Invar/Quartz Optical Grating Scale + Readhead -->
          <rect x="14" y="30" width="166" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="97" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0c4a6e">インバー / 石英 光学微細格子スケール</text>
          <!-- Optical scale grating bar -->
          <rect x="24" y="54" width="146" height="22" rx="2" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2"/>
          ${Array.from({ length: 14 }, (_, i) => `<line x1="${32 + i * 10}" y1="55" x2="${32 + i * 10}" y2="75" stroke="#0369a1" stroke-width="1.6"/>`).join('')}
          <!-- Optical Readhead tracking sub-micron shift -->
          <rect x="64" y="84" width="66" height="22" rx="3" fill="#0f172a" stroke="#0284c7"/>
          <text x="97" y="97.5" text-anchor="middle" font-size="7" font-weight="800" fill="#38bdf8">光学読取ヘッド</text>
          <line x1="97" y1="84" x2="97" y2="76" stroke="#dc2626" stroke-width="1.6" marker-end="url(#a-S77-red)"/>
          ${pill(97, 121, 138, 15, '位置決め精度 ±0.1 µm (閉ループ)', '#e0f2fe', '#0284c7', '#0c4a6e', 6.8)}
          <text x="97" y="138" text-anchor="middle" font-size="6.6" fill="#475569">0.5画素 ≈ 1.9 µm を狂いなく制御</text>
          <!-- RIGHT: 16-Shot 0.5-Pixel Shift Super-Resolution Matrix -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#ffffff" stroke="#7dd3fc"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0c4a6e">16枚合成 0.5画素ステップ軌跡</text>
          <!-- 4x4 sub-pixel sampling grid -->
          ${[0, 1, 2, 3]
            .flatMap((r) =>
              [0, 1, 2, 3].map((c) => {
                const x = 204 + c * 17;
                const y = 52 + r * 16;
                const colors = ['#fee2e2', '#dcfce7', '#dcfce7', '#dbeafe'];
                return `<rect x="${x}" y="${y}" width="15" height="14" rx="1.5" fill="${colors[(r + c) % 4]}" stroke="#64748b" stroke-width="0.6"/>`;
              })
            )
            .join('')}
          <!-- Step arrows showing exact 0.5px zig-zag -->
          <polyline points="211,59 228,59 245,59 262,59 262,75 245,75 228,75 211,75" fill="none" stroke="#0d5bd9" stroke-width="1.5" marker-end="url(#a-S77-blue)"/>
          <!-- Right summary beside grid -->
          <text x="311" y="64" text-anchor="middle" font-size="7" font-weight="800" fill="#0d5bd9">全画素で</text>
          <text x="311" y="75" text-anchor="middle" font-size="7" font-weight="800" fill="#059669">RGB直取得</text>
          <text x="311" y="92" text-anchor="middle" font-size="7.4" font-weight="800" fill="#1e3a8a">2.4億画素</text>
          <text x="311" y="104" text-anchor="middle" font-size="6.4" fill="#475569">偽色ゼロ超解像</text>
          <text x="268" y="135" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0369a1">4枚RGB合成 ＋ 0.5画素ずらし16枚合成</text>
        `,
        caption: '低熱膨張光学リニアスケールが±0.1µm精度で0.5画素ずつ正確に動かし2.4億画素超解像を実現',
      });

    // =========================================================================
    // S78 — Filter Perimeter Sumi-Nuri Edge Blackening (sensor_filter_edge_sumi)
    // =========================================================================
    case 'sensor_filter_edge_sumi':
      return sensorFrame({
        code: 'S78',
        title: '光学フィルター端面「墨塗り」＆ 45°面取り迷光トラップ',
        viewTag: '端面迷光比較',
        accent: '#0f172a',
        headerBg: '#f1f5f9',
        body: `
          <!-- LEFT: Untreated Cut Glass Edge (Total internal reflection -> bright edge ghost!) -->
          <rect x="14" y="30" width="154" height="114" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="91" y="43" text-anchor="middle" font-size="7.2" font-weight="700" fill="#991b1b">未処理切断面（端面反射フレア）</text>
          <rect x="26" y="54" width="130" height="44" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
          <text x="91" y="79" text-anchor="middle" font-size="7" font-weight="700" fill="#0c4a6e">光学フィルター内部</text>
          <!-- Stray ray bouncing off vertical untreated left edge straight into sensor -->
          <polyline points="68,54 27,76 86,112" fill="none" stroke="#dc2626" stroke-width="1.9" marker-end="url(#a-S78-red)"/>
          <circle cx="27" cy="76" r="3.2" fill="#dc2626"/>
          <rect x="34" y="112" width="114" height="10" fill="#1e3a8a"/>
          <text x="91" y="135" text-anchor="middle" font-size="6.7" font-weight="700" fill="#dc2626">夜景・星景の画面端に謎の光輪!</text>
          <!-- Arrow -->
          <line x1="170" y1="84" x2="184" y2="84" stroke="#0f172a" stroke-width="2" marker-end="url(#a-S78-slate)"/>
          <!-- RIGHT: 45° Precision Chamfer + Index-Matched Sumi-Nuri Edge Coat (<0.5% reflectance!) -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0f172a">45°面取り ＋ 屈折率整合墨塗り</text>
          <!-- Filter with 45° beveled corners & thick matte-black sumi-nuri edge coating -->
          <polygon points="212,54 324,54 334,64 334,88 324,98 212,98 202,88 202,64" fill="#bae6fd" stroke="#0284c7" stroke-width="1"/>
          <!-- Thick black sumi-nuri coating along left & right beveled edges -->
          <polyline points="212,54 202,64 202,88 212,98" fill="none" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
          <polyline points="324,54 334,64 334,88 324,98" fill="none" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
          <!-- Stray ray enters index-matched black edge and extinguishes! -->
          <line x1="246" y1="54" x2="205" y2="76" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
          <circle cx="204" cy="76" r="4" fill="#0f172a" stroke="#fde047" stroke-width="1"/>
          <text x="274" y="79" text-anchor="middle" font-size="7" font-weight="800" fill="#0f172a">完全吸光 (&lt;0.5%)</text>
          <rect x="212" y="112" width="112" height="10" fill="#1e3a8a"/>
          <text x="268" y="135" text-anchor="middle" font-size="6.8" font-weight="700" fill="#059669">全周4辺 迷光・ゴースト根絶</text>
        `,
        caption: 'ガラス全周45°面取りへ屈折率整合のカーボン墨塗りを施し、端面反射を0.5%未満へ消滅',
      });

    // =========================================================================
    // S79 — SSWF Fluorine Repellent + Anti-Static Multi-AR Nano-Coat (sensor_sswf_fluorine_ar)
    // =========================================================================
    case 'sensor_sswf_fluorine_ar':
      return sensorFrame({
        code: 'S79',
        title: 'SSWF 最表面 超撥水フッ素 ＋ 帯電防止マルチARナノ膜',
        viewTag: 'ナノ積層断面',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Spherical oil/water droplet sitting cleanly on Fluorine layer (>110° contact angle) -->
          <path d="M88,56 A12,12 0 1,1 108,56 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>
          <line x1="108" y1="56" x2="118" y2="43" stroke="#0369a1" stroke-width="1" stroke-dasharray="2 2"/>
          <text x="98" y="34" text-anchor="middle" font-size="6.8" font-weight="800" fill="#0369a1">接触角 &gt; 110°</text>
          <!-- Dust repelled on right side -->
          <circle cx="176" cy="43" r="3" fill="#475569"/>
          <path d="M180,46 Q190,51 200,38" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#a-S79-green)"/>
          <text x="190" y="34" text-anchor="middle" font-size="6.7" font-weight="700" fill="#059669">油滴・ホコリ反発</text>
          <!-- 4-Layer Nano-Coating Stack (text aligned cleanly right of vertical blue light ray!) -->
          <rect x="20" y="56" width="218" height="15" rx="1.5" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.1"/>
          <text x="148" y="66" text-anchor="middle" font-size="6.8" font-weight="800" fill="#0369a1">① 超撥水・撥油フッ素ナノ膜 (汚れ固着0)</text>
          <rect x="20" y="73" width="218" height="16" rx="1.5" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.1"/>
          <text x="148" y="83.5" text-anchor="middle" font-size="6.8" font-weight="800" fill="#5b21b6">② 多層AR反射防止コート (反射 &lt; 0.2%)</text>
          <rect x="20" y="91" width="218" height="15" rx="1.5" fill="#dcfce7" stroke="#059669" stroke-width="1.1"/>
          <text x="148" y="101" text-anchor="middle" font-size="6.8" font-weight="800" fill="#065f46">③ 帯電防止 透明導電膜 (ITO/ATO)</text>
          <rect x="20" y="108" width="218" height="22" rx="2" fill="#bae6fd" stroke="#0369a1" stroke-width="1.2"/>
          <text x="148" y="121.5" text-anchor="middle" font-size="7.1" font-weight="800" fill="#0c4a6e">④ SSWF 超音波振動光学ガラス基材</text>
          <!-- Vertical AR transmitted light ray cleanly inside left edge (x=40, ZERO text overlap!) -->
          <line x1="40" y1="30" x2="40" y2="124" stroke="#2563eb" stroke-width="2" marker-end="url(#a-S79-blue)"/>
          <text x="40" y="45" text-anchor="middle" font-size="6.1" font-weight="700" fill="#1d4ed8" paint-order="stroke" stroke="#ffffff" stroke-width="2.2">透過</text>
          <!-- Right summary box -->
          <rect x="246" y="36" width="102" height="96" rx="5" fill="#ffffff" stroke="#7dd3fc"/>
          <text x="297" y="51" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0c4a6e">真空蒸着 複合保護</text>
          <text x="297" y="68" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0369a1">・撥水接触角 &gt; 110°</text>
          <text x="297" y="82" text-anchor="middle" font-size="6.7" font-weight="700" fill="#6d28d9">・400–700nm R&lt;0.2%</text>
          <text x="297" y="96" text-anchor="middle" font-size="6.7" font-weight="700" fill="#059669">・静電吸着をシャット</text>
          <text x="297" y="112" text-anchor="middle" font-size="6.5" fill="#475569">スワブ清掃の傷耐性も</text>
          <text x="297" y="123" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0f172a">大幅に向上</text>
          <text x="129" y="142" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0369a1">静電気除去 × 超低反射AR × ツルツル撥油フッ素の3重ナノ防護</text>
        `,
        caption: '帯電防止ITO＋反射0.2%以下の多層AR＋接触角110°超のフッ素膜で汚れと静電ホコリを撃退',
      });

    // =========================================================================
    // S80 — Black Epoxy Dam-and-Fill Wirebond Encapsulation (sensor_wirebond_dam_baffle)
    // =========================================================================
    case 'sensor_wirebond_dam_baffle':
      return sensorFrame({
        code: 'S80',
        title: '金ワイヤー 黒色「ダム＆フィル」封止 ＆ 45°遮光ベベル',
        viewTag: '2液封止断面',
        accent: '#1e293b',
        headerBg: '#f1f5f9',
        body: `
          <!-- Stray oblique light absorbed on 45° stepped matte-black bevel instead of hitting gold wire! -->
          <line x1="78" y1="30" x2="119" y2="54" stroke="#dc2626" stroke-width="1.7" stroke-dasharray="3 2" marker-end="url(#a-S80-red)"/>
          <text x="64" y="42" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">斜め迷光吸収</text>
          <!-- CMOS Silicon Die on left (Active pixels kept strictly clean outside the Dam!) -->
          <rect x="18" y="92" width="106" height="24" rx="2" fill="#1d4ed8"/>
          <text x="71" y="106.5" text-anchor="middle" font-size="7.1" font-weight="800" fill="#ffffff">CMOS 有効画素域</text>
          <!-- HTCC Stepped Shelf on right -->
          <path d="M124,116 L124,102 L198,102 L198,86 L256,86 L256,116 Z" fill="#475569" stroke="#1e293b"/>
          <!-- Black Epoxy Fill (Low-stress carbon-black resin encapsulating gold wires!) -->
          <path d="M108,92 L120,58 L246,58 L246,86 L198,86 L198,102 L124,102 L124,92 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.2"/>
          <!-- High-Viscosity Dam Wall (堤防) on inner edge preventing resin bleed onto pixels -->
          <path d="M106,92 L116,58 L128,58 L122,92 Z" fill="#0f172a" stroke="#64748b" stroke-width="1"/>
          <!-- Gold Wirebonds safely embedded inside the black resin -->
          <path d="M116,92 C122,66 154,66 176,100" fill="none" stroke="#facc15" stroke-width="2"/>
          <path d="M110,92 C122,60 178,58 218,86" fill="none" stroke="#eab308" stroke-width="2"/>
          <!-- Ceramic Base Floor -->
          <rect x="18" y="116" width="238" height="14" rx="2" fill="#334155"/>
          <text x="137" y="125.5" text-anchor="middle" font-size="6.8" font-weight="700" fill="#e2e8f0">HTCCセラミック基板底面（金線反射フレアを完全封殺）</text>
          <!-- Clear Callout Leaders with generous separation -->
          <line x1="120" y1="57" x2="146" y2="36" stroke="#0f172a" stroke-width="0.9"/>
          <text x="150" y="38" font-size="6.9" font-weight="800" fill="#0f172a">① 高粘度 黒色ダム堤防 (45°ベベル)</text>
          <line x1="208" y1="60" x2="234" y2="50" stroke="#ca8a04" stroke-width="0.9"/>
          <text x="238" y="52.5" font-size="6.8" font-weight="700" fill="#a16207">② 低応力黒色フィル充填</text>
          <!-- Right specs box -->
          <rect x="264" y="62" width="86" height="72" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="307" y="76" text-anchor="middle" font-size="7" font-weight="800" fill="#0f172a">保護＆防眩の2役</text>
          <text x="307" y="91" text-anchor="middle" font-size="6.5" fill="#334155">・金線ギラつき遮断</text>
          <text x="307" y="104" text-anchor="middle" font-size="6.5" fill="#334155">・落下/超音波断線0</text>
          <text x="307" y="117" text-anchor="middle" font-size="6.5" font-weight="700" fill="#059669">・画素へ樹脂流れ0</text>
          <text x="137" y="142" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">2液ディスペンス「ダム＆フィル」で数百本の極細金線を強固に黒色包囲</text>
        `,
        caption: '高粘度ダム堤防と低応力黒色フィルが金ワイヤーを全包囲し、乱反射フレアと振動断線を同時防止',
      });

    // =========================================================================
    // S81 — Ultra-Low-Jitter TCXO & Genlock Clock Tree (sensor_tcxo_clock_tree)
    // =========================================================================
    case 'sensor_tcxo_clock_tree':
      return sensorFrame({
        code: 'S81',
        title: '基板直載 温度補償水晶 (TCXO) ＆ 超低ジッタークロック',
        viewTag: '同期クロック系',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Left: TCXO Crystal Oscillator (±0.5 ppm) -->
          <rect x="16" y="44" width="78" height="58" rx="5" fill="#fef3c7" stroke="#ca8a04" stroke-width="1.4"/>
          <text x="55" y="61" text-anchor="middle" font-size="8" font-weight="800" fill="#854d0e">TCXO</text>
          <text x="55" y="74" text-anchor="middle" font-size="7" font-weight="700" fill="#a16207">±0.5 ppm</text>
          <text x="55" y="86" text-anchor="middle" font-size="6.3" fill="#713f12">−20〜+75℃</text>
          <text x="55" y="96" text-anchor="middle" font-size="6.2" fill="#854d0e">温度補償水晶</text>
          <!-- Arrow to PLL -->
          <line x1="94" y1="73" x2="118" y2="73" stroke="#ca8a04" stroke-width="2" marker-end="url(#a-S81-amber)"/>
          <!-- Center: Ultra-Low-Jitter PLL Distribution Tree (< 0.5 ps RMS) -->
          <rect x="122" y="44" width="84" height="58" rx="5" fill="#1e293b" stroke="#0284c7" stroke-width="1.3"/>
          <text x="164" y="61" text-anchor="middle" font-size="7.4" font-weight="800" fill="#38bdf8">低ジッター PLL</text>
          <text x="164" y="75" text-anchor="middle" font-size="7.3" font-weight="800" fill="#fde047">&lt; 0.5 ps RMS</text>
          <text x="164" y="89" text-anchor="middle" font-size="6.3" fill="#cbd5e1">同期クロック分配</text>
          <!-- 3 Matched Clock Tree Branches to Right -->
          <path d="M206,58 H222 V42 H242" fill="none" stroke="#0284c7" stroke-width="1.6" marker-end="url(#a-S81-cyan)"/>
          <line x1="206" y1="73" x2="242" y2="73" stroke="#059669" stroke-width="1.6" marker-end="url(#a-S81-green)"/>
          <path d="M206,88 H222 V104 H242" fill="none" stroke="#7c3aed" stroke-width="1.6" marker-end="url(#a-S81-purple)"/>
          <!-- 3 Target Subsystems -->
          <rect x="245" y="31" width="102" height="22" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="296" y="44.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0c4a6e">14-bit 列並列 ADC 標本</text>
          <rect x="245" y="62" width="102" height="22" rx="3" fill="#dcfce7" stroke="#059669"/>
          <text x="296" y="75.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#065f46">SLVS-EC v3 高速基準</text>
          <rect x="245" y="93" width="102" height="22" rx="3" fill="#f5f3ff" stroke="#7c3aed"/>
          <text x="296" y="106.5" text-anchor="middle" font-size="6.9" font-weight="700" fill="#5b21b6">シネマ ゲンロック同期</text>
          <!-- Bottom Crisp Square Clock Waveform (Zero phase jitter!) -->
          <rect x="16" y="116" width="218" height="26" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
          <polyline points="26,135 42,135 42,123 58,123 58,135 74,135 74,123 90,123 90,135 106,135 106,123 122,123 122,135" fill="none" stroke="#ca8a04" stroke-width="1.8"/>
          <text x="178" y="132" text-anchor="middle" font-size="6.8" font-weight="700" fill="#854d0e">揺らぎ 0.5兆分の1秒未満</text>
          <text x="296" y="133" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">マルチカメラ音ズレ0</text>
        `,
        caption: 'センサー直近のTCXO(±0.5ppm)と0.5ps未満PLLが14bit ADC精度と映画マルチカメラ同期を死守',
      });

    // =========================================================================
    // S82 — ±45° Cross-Roller Linear Guide & CuBe2 Parallel Flexure (sensor_cross_roller_guide)
    // =========================================================================
    case 'sensor_cross_roller_guide':
      return sensorFrame({
        code: 'S82',
        title: '±45° クロスローラー直動案内 ＆ 並列板バネ懸架',
        viewTag: '直動案内断面',
        accent: '#334155',
        headerBg: '#f1f5f9',
        body: `
          <!-- LEFT: True Cross-Section of ±45° Crossed Cylindrical Rollers in 90° V-Grooves -->
          <rect x="14" y="30" width="168" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="98" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0f172a">90° V溝 ＆ ±45° 交互クロスローラー</text>
          <!-- Left Fixed V-Rail & Right Moving V-Rail -->
          <polygon points="28,54 66,54 84,84 66,114 28,114" fill="#64748b" stroke="#1e293b" stroke-width="1.2"/>
          <polygon points="168,54 130,54 112,84 130,114 168,114" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.2"/>
          <text x="48" y="87" text-anchor="middle" font-size="6.8" font-weight="700" fill="#ffffff">固定V溝</text>
          <text x="148" y="87" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a">可動V溝</text>
          <!-- Front cylindrical roller tilted +45° & Rear roller tilted -45° (orthogonal line contact!) -->
          <g transform="rotate(45 98 84)">
            <rect x="85" y="75" width="26" height="18" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="1.2"/>
          </g>
          <g transform="rotate(-45 98 84)">
            <rect x="85" y="75" width="26" height="18" rx="3" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
          </g>
          <text x="98" y="126" text-anchor="middle" font-size="6.8" font-weight="800" fill="#0369a1">線接触で全方向モーメント荷重を支持</text>
          <text x="98" y="137" text-anchor="middle" font-size="6.5" fill="#475569">前後・上下・傾きガタを完全封殺</text>
          <!-- RIGHT: Notched CuBe2 Parallel Flexure Suspension -->
          <rect x="190" y="30" width="158" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="269" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#92400e">ベリリウム銅 並列板バネ (フレクシャー)</text>
          <!-- Parallel flexure beams connecting fixed block to moving stage -->
          <rect x="200" y="54" width="18" height="54" rx="2" fill="#475569"/>
          <rect x="320" y="54" width="18" height="54" rx="2" fill="#0284c7"/>
          <path d="M218,62 C252,62 286,70 320,70" fill="none" stroke="#d97706" stroke-width="3"/>
          <path d="M218,98 C252,98 286,106 320,106" fill="none" stroke="#d97706" stroke-width="3"/>
          <text x="269" y="88" text-anchor="middle" font-size="6.8" font-weight="700" fill="#b45309">摩擦・摩耗粉 ゼロ!</text>
          ${pill(269, 121, 138, 15, 'Z軸剛性 > 横剛性の1,000倍', '#eff6ff', '#2563eb', '#1e40af', 6.8)}
          <text x="269" y="138" text-anchor="middle" font-size="6.6" font-weight="700" fill="#059669">全ストローク チルト誤差 &lt; 2 秒角</text>
        `,
        caption: '90°V溝の±45°クロスローラーと並列CuBe2板バネが、無摩擦のままF1.2焦点面傾きを2秒角未満へ維持',
      });

    // =========================================================================
    // S83 — Bi2Te3 Peltier TEC Active Cooler & Anti-Dew Heater (sensor_peltier_tec_cooler)
    // Authentic P/N thermoelectric carrier heat-pumping physics + serpentine Cu bridges!
    // =========================================================================
    case 'sensor_peltier_tec_cooler':
      return sensorFrame({
        code: 'S83',
        title: 'Bi₂Te₃ ペルチェ能動冷却 (TEC) ＆ 結露防止ヒーター',
        viewTag: '熱電ヒートポンプ',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: Anti-Dew Cover Glass + Cold Finger + Bi2Te3 Peltier Module Stack -->
          <!-- Cover Glass with 0.3W Anti-Dew Perimeter Heater -->
          <rect x="26" y="30" width="194" height="11" rx="1.5" fill="#bae6fd" stroke="#0284c7"/>
          <rect x="26" y="30" width="18" height="11" fill="#f97316"/>
          <rect x="202" y="30" width="18" height="11" fill="#f97316"/>
          <text x="123" y="38" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0c4a6e">カバーガラス＋0.3W結露防止ヒーター環</text>
          <!-- Cooled CMOS Die + Cold Ceramic Plate -->
          <rect x="26" y="46" width="194" height="16" rx="2" fill="#0284c7" stroke="#0369a1"/>
          <text x="123" y="56.5" text-anchor="middle" font-size="6.9" font-weight="800" fill="#ffffff">吸熱冷却面 (外気比 −20〜−35℃)</text>
          <!-- Serpentine Top Copper Bridges -->
          <rect x="40" y="62" width="44" height="5" fill="#d97706"/>
          <rect x="102" y="62" width="44" height="5" fill="#d97706"/>
          <rect x="164" y="62" width="44" height="5" fill="#d97706"/>
          <!-- Alternating P-type & N-type Bi2Te3 Semiconductor Pellets pumping heat DOWNWARD -->
          <rect x="44" y="67" width="16" height="28" rx="1.5" fill="#ef4444"/><text x="52" y="84" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">P</text>
          <rect x="64" y="67" width="16" height="28" rx="1.5" fill="#2563eb"/><text x="72" y="84" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">N</text>
          <rect x="106" y="67" width="16" height="28" rx="1.5" fill="#ef4444"/><text x="114" y="84" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">P</text>
          <rect x="126" y="67" width="16" height="28" rx="1.5" fill="#2563eb"/><text x="134" y="84" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">N</text>
          <rect x="168" y="67" width="16" height="28" rx="1.5" fill="#ef4444"/><text x="176" y="84" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">P</text>
          <rect x="188" y="67" width="16" height="28" rx="1.5" fill="#2563eb"/><text x="196" y="84" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">N</text>
          <!-- Serpentine Bottom Copper Bridges -->
          <rect x="64" y="95" width="58" height="5" fill="#d97706"/>
          <rect x="126" y="95" width="58" height="5" fill="#d97706"/>
          <!-- Downward Heat Pumping Arrows cleanly between pellet pairs -->
          <line x1="93" y1="68" x2="93" y2="94" stroke="#f97316" stroke-width="2" marker-end="url(#a-S83-amber)"/>
          <line x1="155" y1="68" x2="155" y2="94" stroke="#f97316" stroke-width="2" marker-end="url(#a-S83-amber)"/>
          <!-- Hot Exhaust Ceramic Plate & Heatsink -->
          <rect x="26" y="100" width="194" height="17" rx="2" fill="#dc2626" stroke="#991b1b"/>
          <text x="123" y="111" text-anchor="middle" font-size="6.9" font-weight="800" fill="#ffffff">排熱面 (ヒートシンク・外部放熱へ)</text>
          <text x="123" y="131" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">直流電流で正孔(P)＆電子(N)が熱を強制汲み下げ</text>
          <text x="123" y="142" text-anchor="middle" font-size="6.5" fill="#0369a1">96% Al₂O₃ セラミック絶縁板 × 銅直列ブリッジ</text>
          <!-- Right: Astro / Cinema Cooling Impact -->
          <rect x="230" y="34" width="118" height="106" rx="5" fill="#f8fafc" stroke="#7dd3fc"/>
          <text x="289" y="48" text-anchor="middle" font-size="7.2" font-weight="800" fill="#0c4a6e">能動冷却の劇的効果</text>
          ${pill(289, 68, 104, 17, '最大冷却 ΔT −35℃', '#e0f2fe', '#0284c7', '#0369a1', 7)}
          <text x="289" y="90" text-anchor="middle" font-size="6.7" font-weight="700" fill="#059669">−6℃ごとに暗電流 半減!</text>
          <text x="289" y="104" text-anchor="middle" font-size="6.6" fill="#334155">−30℃冷却で熱ノイズ約</text>
          <text x="289" y="116" text-anchor="middle" font-size="7.6" font-weight="800" fill="#dc2626">1 / 32 以下!</text>
          <text x="289" y="131" text-anchor="middle" font-size="6.4" fill="#c2410c">防曇ヒーターで霜・結露0</text>
        `,
        caption: 'Bi₂Te₃半導体のP/N直列ペアが熱を強制汲み出し、防曇ヒーター併用で−35℃超低ノイズ撮像を実現',
      });

    // =========================================================================
    // S84 — Die-Corner Lithographic Fiducials & 6-Axis Laser Targets (sensor_die_fiducial_targets)
    // =========================================================================
    case 'sensor_die_fiducial_targets':
      return sensorFrame({
        code: 'S84',
        title: 'ウェハー四隅 フィデューシャル基準マーク ＆ 6軸調芯',
        viewTag: '基準マーク拡大',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- LEFT: Full-Frame Silicon Die with 4 Corner Gold Fiducials -->
          <rect x="14" y="30" width="160" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="94" y="43" text-anchor="middle" font-size="7.1" font-weight="800" fill="#0f172a">画素同一リソグラフィ四隅基準</text>
          <!-- Silicon Die Bezel -->
          <rect x="26" y="51" width="136" height="74" rx="3" fill="#e2e8f0" stroke="#475569" stroke-width="1.2"/>
          <!-- Active 36x24mm Pixel Zone -->
          <rect x="44" y="63" width="100" height="50" rx="1.5" fill="#1e3a8a"/>
          <text x="94" y="86" text-anchor="middle" font-size="7.4" font-weight="800" fill="#ffffff">36×24mm 画素部</text>
          <text x="94" y="97" text-anchor="middle" font-size="6.3" fill="#93c5fd">同一マスク焼付 (絶対原点)</text>
          <!-- 4 Corner Gold Fiducial Crosshairs -->
          ${[
            [35, 58],
            [153, 58],
            [35, 118],
            [153, 118],
          ]
            .map(
              ([cx, cy]) =>
                `<rect x="${cx - 4.5}" y="${cy - 4.5}" width="9" height="9" fill="#fef08a" stroke="#ca8a04" stroke-width="0.9"/><line x1="${cx - 3}" y1="${cy}" x2="${cx + 3}" y2="${cy}" stroke="#854d0e" stroke-width="1.1"/><line x1="${cx}" y1="${cy - 3}" x2="${cx}" y2="${cy + 3}" stroke="#854d0e" stroke-width="1.1"/>`
            )
            .join('')}
          <text x="94" y="137" text-anchor="middle" font-size="6.7" font-weight="700" fill="#854d0e">Cr / Au 四隅フィデューシャル ×4</text>
          <!-- RIGHT: Magnified ASML Box-in-Box Vernier Alignment Target -->
          <rect x="182" y="30" width="166" height="114" rx="5" fill="#fefce8" stroke="#eab308" stroke-width="1.2"/>
          <text x="265" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#854d0e">拡大：Box-in-Box ＆ 6軸調芯</text>
          <!-- Magnified Fiducial Target -->
          <rect x="196" y="54" width="54" height="54" fill="#1e293b" stroke="#ca8a04" stroke-width="1.5"/>
          <rect x="205" y="63" width="36" height="36" fill="none" stroke="#facc15" stroke-width="2"/>
          <rect x="215" y="73" width="16" height="16" fill="none" stroke="#38bdf8" stroke-width="1.6"/>
          <line x1="223" y1="57" x2="223" y2="105" stroke="#fde047" stroke-width="1"/>
          <line x1="199" y1="81" x2="247" y2="81" stroke="#fde047" stroke-width="1"/>
          <!-- Precision specs beside magnified mark -->
          <text x="300" y="65" text-anchor="middle" font-size="6.9" font-weight="800" fill="#0f172a">位置 ±1 µm</text>
          <text x="300" y="79" text-anchor="middle" font-size="6.9" font-weight="800" fill="#0369a1">回転 ±0.01°</text>
          <text x="300" y="94" text-anchor="middle" font-size="6.5" fill="#334155">6軸レーザーロボット</text>
          <text x="300" y="105" text-anchor="middle" font-size="6.5" fill="#334155">自動画像認識調芯</text>
          <text x="265" y="128" text-anchor="middle" font-size="6.7" font-weight="700" fill="#854d0e">髪の毛の1/50精度で水平・光軸一致組立</text>
        `,
        caption: '画素と同一露光マスクで刻んだ四隅の黄金基準マークを頼りに、位置±1µm・傾き±0.01°で自動調芯',
      });

    // =========================================================================
    // S85 — IBIS-Carrier Mounted 3-Axis MEMS Accelerometer (sensor_carrier_piezo_accel)
    // =========================================================================
    case 'sensor_carrier_piezo_accel':
      return sensorFrame({
        code: 'S85',
        title: 'IBIS直載 3軸 MEMS加速度計（シャッター衝撃逆位相打消）',
        viewTag: '逆位相制振波形',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- LEFT: 3-Aligned Cancellation Waveforms (Shutter Shock + Inverse VCM = Flat!) -->
          <rect x="14" y="30" width="214" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <!-- Row 1: Mechanical Shutter Shock Wave (Red) -->
          <text x="22" y="45" font-size="6.8" font-weight="800" fill="#dc2626">① シャッター衝撃波</text>
          <path d="M104,44 Q114,29 124,44 T144,44 T164,44 T184,44 T204,44 L220,44" fill="none" stroke="#dc2626" stroke-width="2"/>
          <!-- Plus symbol -->
          <text x="160" y="61" text-anchor="middle" font-size="8" font-weight="800" fill="#64748b">+</text>
          <!-- Row 2: Feedforward Inverse-Phase VCM Counter-Thrust (Blue) -->
          <text x="22" y="79" font-size="6.8" font-weight="800" fill="#2563eb">② VCM 逆位相推力</text>
          <path d="M104,78 Q114,93 124,78 T144,78 T164,78 T184,78 T204,78 L220,78" fill="none" stroke="#2563eb" stroke-width="2"/>
          <!-- Equals line -->
          <line x1="22" y1="98" x2="220" y2="98" stroke="#e2e8f0" stroke-width="1"/>
          <!-- Row 3: Cancelled Flat Residual Vibration (Emerald Green!) -->
          <text x="22" y="117" font-size="7" font-weight="800" fill="#059669">③ 撮像面 残留振動</text>
          <line x1="104" y1="115" x2="220" y2="115" stroke="#059669" stroke-width="2.6"/>
          <text x="162" y="135" text-anchor="middle" font-size="6.8" font-weight="700" fill="#059669">微ブレ一瞬消去（1/60s域の解像維持）</text>
          <!-- RIGHT: Carrier-Mounted 2x2mm MEMS Sensor Hardware Box -->
          <rect x="236" y="30" width="112" height="114" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="292" y="44" text-anchor="middle" font-size="7.1" font-weight="800" fill="#991b1b">可動台座へ現場直載</text>
          <!-- Mini 2x2mm MEMS chip icon -->
          <rect x="264" y="52" width="56" height="30" rx="3" fill="#1e293b" stroke="#dc2626" stroke-width="1.2"/>
          <text x="292" y="65" text-anchor="middle" font-size="7" font-weight="800" fill="#fca5a5">3軸 MEMS</text>
          <text x="292" y="76" text-anchor="middle" font-size="6.2" fill="#e2e8f0">2×2mm 直結</text>
          ${pill(292, 98, 96, 16, '2〜4 kHz 高速検知', '#fee2e2', '#dc2626', '#991b1b', 6.9)}
          <text x="292" y="119" text-anchor="middle" font-size="6.5" fill="#334155">本体ジャイロと協調し</text>
          <text x="292" y="131" text-anchor="middle" font-size="6.6" font-weight="700" fill="#1e40af">マクロ並進シフトも補正</text>
        `,
        caption: '可動ステージ直載の2×2mm MEMS加速度計が2–4kHzでシャッター衝撃を直検し逆位相推力で相殺',
      });

    // =========================================================================
    // S86 — Dual-Edge 16-Lane SLVS-EC v3.0 & Common-Mode Chokes (sensor_dual_edge_slvs16)
    // =========================================================================
    case 'sensor_dual_edge_slvs16':
      return sensorFrame({
        code: 'S86',
        title: '両端対称 16レーン SLVS-EC v3 ＆ コモンモードチョーク',
        viewTag: '高速差動・EMC',
        accent: '#059669',
        headerBg: '#ecfdf5',
        body: `
          <!-- LEFT: Symmetrical Dual-Edge 8 + 8 = 16-Lane CMOS Output -->
          <rect x="14" y="30" width="174" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="101" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#065f46">左右対称 8＋8＝16レーン (最大200Gbps)</text>
          <!-- Center CMOS Die -->
          <rect x="66" y="54" width="70" height="58" rx="4" fill="#1e3a8a"/>
          <text x="101" y="81" text-anchor="middle" font-size="7.6" font-weight="800" fill="#ffffff">CMOS</text>
          <text x="101" y="93" text-anchor="middle" font-size="6.4" fill="#93c5fd">両端並列読出</text>
          <!-- 8 lanes left & 8 lanes right with 0605 choke blocks -->
          ${[60, 68, 76, 84, 92, 100, 108]
            .map(
              (y) =>
                `<line x1="22" y1="${y}" x2="66" y2="${y}" stroke="#059669" stroke-width="1.6"/><line x1="136" y1="${y}" x2="180" y2="${y}" stroke="#059669" stroke-width="1.6"/>`
            )
            .join('')}
          <!-- 0605 Ferrite Common-Mode Choke Banks flanking die -->
          <rect x="40" y="56" width="12" height="56" rx="2" fill="#334155" stroke="#eab308" stroke-width="1"/>
          <rect x="150" y="56" width="12" height="56" rx="2" fill="#334155" stroke="#eab308" stroke-width="1"/>
          <text x="101" y="126" text-anchor="middle" font-size="6.8" font-weight="700" fill="#065f46">100Ω ±5% 等長配線 · 0605フェライト帯</text>
          <text x="101" y="137" text-anchor="middle" font-size="6.4" fill="#475569">左右均等分割で配線長・スキュー極小化</text>
          <!-- RIGHT: Magnified Common-Mode Choke Filtering Principle -->
          <rect x="196" y="30" width="152" height="114" rx="5" fill="#ecfdf5" stroke="#34d399"/>
          <text x="272" y="43" text-anchor="middle" font-size="7.2" font-weight="800" fill="#065f46">コモンモードチョークの原理</text>
          <!-- Ferrite core box -->
          <rect x="242" y="52" width="60" height="44" rx="4" fill="#334155" stroke="#0f172a"/>
          <!-- +D / -D differential pair passing through cleanly -->
          <line x1="204" y1="64" x2="338" y2="64" stroke="#059669" stroke-width="2" marker-end="url(#a-S86-green)"/>
          <line x1="338" y1="84" x2="204" y2="84" stroke="#0284c7" stroke-width="2" marker-end="url(#a-S86-cyan)"/>
          <text x="272" y="76.5" text-anchor="middle" font-size="6.4" font-weight="800" fill="#fde047">差動信号: 通過◎</text>
          <text x="218" y="60" font-size="6.4" font-weight="700" fill="#059669">+D</text>
          <text x="218" y="94" font-size="6.4" font-weight="700" fill="#0284c7">−D</text>
          <!-- Common-mode noise blocked -->
          ${pill(272, 111, 134, 15, '同相ノイズのみ高インピーダンス遮断', '#fef2f2', '#dc2626', '#991b1b', 6.5)}
          <text x="272" y="134" text-anchor="middle" font-size="6.6" font-weight="700" fill="#065f46">Wi-Fi / GNSS 電波干渉を徹底防止</text>
        `,
        caption: '左右8+8=16レーンSLVS-EC出力と0605コモンモードチョークで200Gbps伝送と電波干渉抑止を両立',
      });

    // =========================================================================
    // S87 — Filled-Copper Thermal Via Array & Nano-Ag Die-Attach (sensor_thermal_via_dieattach)
    // =========================================================================
    case 'sensor_thermal_via_dieattach':
      return sensorFrame({
        code: 'S87',
        title: 'セラミック貫通 銅サーマルビアアレイ ＆ ナノ銀焼結',
        viewTag: '垂直直通排熱',
        accent: '#c2410c',
        headerBg: '#fff7ed',
        body: `
          <!-- Layer 1: CMOS Silicon Die (8K Heat Source) -->
          <rect x="24" y="32" width="212" height="19" rx="2" fill="#1e3a8a"/>
          <text x="130" y="44" text-anchor="middle" font-size="7.2" font-weight="800" fill="#ffffff">CMOS シリコンダイ（8K連続録画 発熱源）</text>
          <!-- Layer 2: Low-Stress Porous Nano-Ag Sintered Die-Attach (k > 150 W/mK) -->
          <rect x="24" y="53" width="212" height="15" rx="1.5" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>
          <text x="130" y="63" text-anchor="middle" font-size="6.9" font-weight="800" fill="#0f172a">低応力 ナノ銀焼結緩衝層 (k &gt; 150 W/m·K)</text>
          <!-- Layer 3: HTCC Ceramic Substrate pierced by dense Solid-Copper Filled Thermal Vias -->
          <rect x="24" y="70" width="212" height="40" rx="2" fill="#334155" stroke="#0f172a"/>
          ${[42, 62, 82, 102, 122, 142, 162, 182, 202, 222]
            .map(
              (x) =>
                `<rect x="${x - 4.5}" y="70" width="9" height="40" fill="#ea580c" stroke="#7c2d12" stroke-width="0.6"/>`
            )
            .join('')}
          <!-- Clean semi-opaque pill over via array explaining structure without overlapping individual letters -->
          ${pill(130, 90, 152, 16, '数百本 純銅充填 サーマルビア格子', '#fff7ed', '#ea580c', '#9a3412', 6.9)}
          <!-- Layer 4: Rear Pure-Copper Heatsink -->
          <rect x="24" y="112" width="212" height="20" rx="2" fill="#b45309" stroke="#78350f"/>
          <text x="130" y="124.5" text-anchor="middle" font-size="7.2" font-weight="800" fill="#fffbeb">背面 純銅ヒートシンクへ最短垂直排熱</text>
          <!-- Downward heat flow arrow cleanly outside left edge -->
          <line x1="15" y1="42" x2="15" y2="122" stroke="#dc2626" stroke-width="2.2" marker-end="url(#a-S87-red)"/>
          <!-- Right summary box -->
          <rect x="246" y="32" width="102" height="106" rx="5" fill="#fff7ed" stroke="#fdba74"/>
          <text x="297" y="47" text-anchor="middle" font-size="7.2" font-weight="800" fill="#9a3412">垂直熱ハイウェイ</text>
          ${pill(297, 68, 88, 17, '撮像面 −8〜12℃', '#fef2f2', '#dc2626', '#991b1b', 7)}
          <text x="297" y="90" text-anchor="middle" font-size="6.6" fill="#334155">・セラミックの低熱伝導を</text>
          <text x="297" y="101" text-anchor="middle" font-size="6.6" font-weight="700" fill="#c2410c">　純銅柱がバイパス貫通</text>
          <text x="297" y="116" text-anchor="middle" font-size="6.6" fill="#334155">・多孔ナノ銀が熱膨張差を</text>
          <text x="297" y="127" text-anchor="middle" font-size="6.6" font-weight="700" fill="#059669">　吸収し反り歪みゼロ</text>
        `,
        caption: '低応力ナノ銀焼結とセラミック貫通純銅ビアアレイが8Kの熱を最短垂直放出し、温度を10℃低減',
      });

    // =========================================================================
    // S88 — Power-Off Magnetic Detent & Freefall Emergency Brake (sensor_freefall_ibis_brake)
    // =========================================================================
    case 'sensor_freefall_ibis_brake':
      return sensorFrame({
        code: 'S88',
        title: '電源OFF磁気ディテント ＆ 落下検知 緊急電磁ブレーキ',
        viewTag: '落下保護シーケンス',
        accent: '#dc2626',
        headerBg: '#fef2f2',
        body: `
          <!-- TOP: Millisecond Freefall Protection Timeline (0ms -> 15ms Brake -> 450ms Ground Impact) -->
          <rect x="14" y="30" width="332" height="44" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <line x1="34" y1="54" x2="326" y2="54" stroke="#94a3b8" stroke-width="2"/>
          <circle cx="44" cy="54" r="5" fill="#f59e0b"/><text x="44" y="44" text-anchor="middle" font-size="6.7" font-weight="800" fill="#b45309">0 ms 落下検知</text><text x="44" y="68" text-anchor="middle" font-size="6.2" fill="#475569">本体0G割込</text>
          <circle cx="152" cy="54" r="5.5" fill="#dc2626"/><text x="152" y="44" text-anchor="middle" font-size="6.8" font-weight="800" fill="#dc2626">15〜30 ms 保護完了!</text><text x="152" y="68" text-anchor="middle" font-size="6.2" font-weight="700" fill="#991b1b">電磁ショート制動＋クランプ</text>
          <circle cx="304" cy="54" r="5" fill="#334155"/><text x="304" y="44" text-anchor="middle" font-size="6.7" font-weight="700" fill="#334155">450 ms 着地(1m)</text><text x="304" y="68" text-anchor="middle" font-size="6.2" fill="#059669">安全固定済み!</text>
          <!-- BOTTOM LEFT: VCM Dynamic Brake + Rubber Tooth Clamps -->
          <rect x="14" y="80" width="186" height="64" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="107" y="93" text-anchor="middle" font-size="7" font-weight="800" fill="#991b1b">緊急電磁ブレーキ ＋ ゴム歯クランプ</text>
          <!-- Left & Right rubber-tooth brake shoes clamping IBIS stage -->
          <rect x="26" y="102" width="22" height="32" rx="2" fill="#dc2626"/>
          <line x1="50" y1="118" x2="66" y2="118" stroke="#dc2626" stroke-width="2" marker-end="url(#a-S88-red)"/>
          <rect x="70" y="101" width="74" height="34" rx="4" fill="#dbeafe" stroke="#2563eb" stroke-width="1.3"/>
          <text x="107" y="116" text-anchor="middle" font-size="7" font-weight="800" fill="#1e40af">IBIS可動枠</text>
          <text x="107" y="127" text-anchor="middle" font-size="6.2" fill="#1d4ed8">回生ブレーキ制動</text>
          <line x1="164" y1="118" x2="148" y2="118" stroke="#dc2626" stroke-width="2" marker-end="url(#a-S88-red)"/>
          <rect x="166" y="102" width="22" height="32" rx="2" fill="#dc2626"/>
          <!-- BOTTOM RIGHT: Power-Off Zero-Energy Magnetic Park Detent -->
          <rect x="208" y="80" width="138" height="64" rx="5" fill="#f0f9ff" stroke="#7dd3fc"/>
          <text x="277" y="93" text-anchor="middle" font-size="7" font-weight="800" fill="#0c4a6e">電源OFF 磁気ディテント</text>
          <text x="277" y="109" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0369a1">・無通電で中央パーク保持</text>
          <text x="277" y="122" text-anchor="middle" font-size="6.6" fill="#334155">・セラミック球座の打痕防止</text>
          <text x="277" y="135" text-anchor="middle" font-size="6.6" fill="#334155">・VCMコイル断線保護</text>
        `,
        caption: '0G落下検知から15–30msでVCM電磁回生ブレーキとゴム歯ロックが完了し、着地衝撃から保護',
      });

    // =========================================================================
    // S89 — Ultra-Low-Alpha (ULA) Cover Glass & Ceramic Shield Wall (sensor_low_alpha_mold)
    // =========================================================================
    case 'sensor_low_alpha_mold':
      return sensorFrame({
        code: 'S89',
        title: '低α線 (ULA) 超高純度カバーガラス ＆ ソフトエラー遮蔽壁',
        viewTag: 'α線遮断比較',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- LEFT: Ordinary Glass/Ceramic (Trace U/Th emits alpha particles -> White Spots & DRAM Errors!) -->
          <rect x="14" y="30" width="154" height="114" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="91" y="43" text-anchor="middle" font-size="7.1" font-weight="700" fill="#991b1b">通常ガラス/セラミック (微量U/Th)</text>
          <rect x="26" y="50" width="130" height="16" rx="2" fill="#e2e8f0" stroke="#64748b"/>
          <text x="91" y="60.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#475569">不純物 U / Th → α線放出</text>
          <!-- Alpha particle rays striking CMOS die & causing white pixel / DRAM bit flip -->
          <line x1="48" y1="66" x2="39" y2="96" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-S89-red)"/>
          <line x1="134" y1="66" x2="143" y2="96" stroke="#dc2626" stroke-width="1.8" marker-end="url(#a-S89-red)"/>
          <text x="91" y="84" text-anchor="middle" font-size="6.7" font-weight="800" fill="#dc2626">α粒子 (He²⁺)</text>
          <rect x="26" y="98" width="130" height="20" rx="2" fill="#1e3a8a"/>
          <circle cx="38" cy="108" r="3.2" fill="#ffffff" stroke="#ef4444"/>
          <circle cx="144" cy="108" r="3.2" fill="#ffffff" stroke="#ef4444"/>
          <text x="91" y="110.5" text-anchor="middle" font-size="6.6" font-weight="700" fill="#fde047">白点 / DRAMエラー</text>
          <text x="91" y="135" text-anchor="middle" font-size="6.6" fill="#991b1b">長秒星空写真に偽の白い点が出現</text>
          <!-- Arrow -->
          <line x1="170" y1="84" x2="184" y2="84" stroke="#7c3aed" stroke-width="2" marker-end="url(#a-S89-purple)"/>
          <!-- RIGHT: ULA Ultra-Pure Synthetic Quartz + Purified Alumina (< 0.002 cph/cm²) -->
          <rect x="188" y="30" width="160" height="114" rx="5" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.2"/>
          <text x="268" y="43" text-anchor="middle" font-size="7.1" font-weight="800" fill="#5b21b6">ULA 低α線 超高純度パッケージ</text>
          <rect x="200" y="50" width="136" height="17" rx="2" fill="#e0f2fe" stroke="#7c3aed" stroke-width="1.2"/>
          <text x="268" y="61" text-anchor="middle" font-size="6.7" font-weight="800" fill="#4c1d95">精製合成石英 (U/Th 99.9%除去)</text>
          ${pill(268, 83, 126, 16, 'α線放出 < 0.002 cph/cm²', '#ede9fe', '#7c3aed', '#5b21b6', 6.8)}
          <rect x="200" y="98" width="136" height="20" rx="2" fill="#1e3a8a"/>
          <text x="268" y="110.5" text-anchor="middle" font-size="6.9" font-weight="800" fill="#a7f3d0">CMOS ＆ 積層DRAM ソフトエラー 0</text>
          <text x="268" y="135" text-anchor="middle" font-size="6.7" font-weight="700" fill="#5b21b6">JEDEC JESD221 準拠 · 精製アルミナ壁</text>
        `,
        caption: 'ガラスとセラミックから微量U/Thを極限除去し、α線による星空の白点ノイズとDRAMエラーを防止',
      });

    // =========================================================================
    // S90 — Velvet-Flocked Labyrinth Light-Trap & Silicone Isolators (sensor_chamber_labyrinth_felt)
    // =========================================================================
    case 'sensor_chamber_labyrinth_felt':
      return sensorFrame({
        code: 'S90',
        title: '撮像室 遮光植毛ラビリンス枠 ＆ 防振シリコーン環',
        viewTag: '迷光・衝撃遮断',
        accent: '#1e293b',
        headerBg: '#f1f5f9',
        body: `
          <!-- Left: Focal-Plane Shutter Unit (Source of shock, wear dust & gap stray light) -->
          <rect x="16" y="38" width="60" height="96" rx="4" fill="#475569" stroke="#1e293b"/>
          <text x="46" y="76" text-anchor="middle" font-size="7.1" font-weight="800" fill="#ffffff">シャッター</text>
          <text x="46" y="88" text-anchor="middle" font-size="6.6" fill="#e2e8f0">ユニット背面</text>
          <text x="46" y="106" text-anchor="middle" font-size="6.3" font-weight="700" fill="#fca5a5">衝撃・摩耗粉</text>
          <!-- Top & Bottom Stepped Velvet-Flocked Labyrinth Light-Trap Channels -->
          <path d="M84,38 L224,38 L224,56 L194,56 L194,48 L166,48 L166,58 L138,58 L138,48 L110,48 L110,58 L84,58 Z" fill="#0f172a" stroke="#334155"/>
          <path d="M84,134 L224,134 L224,116 L194,116 L194,124 L166,124 L166,114 L138,114 L138,124 L110,124 L110,114 L84,114 Z" fill="#0f172a" stroke="#334155"/>
          <!-- Stray light entering labyrinth top gap and dying inside velvet grooves (<0.4% reflectance) -->
          <polyline points="78,46 118,54 132,46 150,55" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#a-S90-red)"/>
          <!-- Clean Valid Optical Path through Center -->
          <rect x="84" y="66" width="140" height="40" fill="#e0f2fe" opacity="0.45"/>
          <line x1="82" y1="86" x2="224" y2="86" stroke="#2563eb" stroke-width="2" marker-end="url(#a-S90-blue)"/>
          <text x="154" y="79" text-anchor="middle" font-size="7" font-weight="800" fill="#1d4ed8">有効結像光束 (迷光遮断)</text>
          <text x="154" y="100" text-anchor="middle" font-size="6.7" font-weight="700" fill="#0f172a">静電植毛ベルベット (反射 &lt; 0.4%)</text>
          <!-- 4-Point High-Damping Silicone Vibration Isolator Rings between Frame & Sensor -->
          <rect x="226" y="42" width="14" height="20" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="1.1"/>
          <rect x="226" y="110" width="14" height="20" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="1.1"/>
          <!-- Right: Protected Front Sensor Module -->
          <rect x="242" y="38" width="104" height="96" rx="5" fill="#f8fafc" stroke="#0284c7" stroke-width="1.3"/>
          <text x="294" y="54" text-anchor="middle" font-size="7.3" font-weight="800" fill="#0c4a6e">撮像素子ユニット</text>
          <rect x="252" y="64" width="84" height="22" rx="3" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="294" y="77.5" text-anchor="middle" font-size="6.7" font-weight="700" fill="#1e40af">迷光＆塵 侵入ゼロ</text>
          <rect x="252" y="92" width="84" height="32" rx="3" fill="#fff7ed" stroke="#ea580c"/>
          <text x="294" y="105" text-anchor="middle" font-size="6.7" font-weight="800" fill="#9a3412">4点シリコーン防振環</text>
          <text x="294" y="117" text-anchor="middle" font-size="6.3" fill="#c2410c">シャッター衝撃波を遮断</text>
          <text x="154" y="145" text-anchor="middle" font-size="6.8" font-weight="700" fill="#334155">段差ラビリンス迷路溝が迷光・摩耗粉を捕らえ、防振ゴム環が衝撃を絶縁</text>
        `,
        caption: '静電植毛ラビリンス溝(反射<0.4%)と4点シリコーン防振環でシャッター隙間迷光・塵・衝撃を最終封鎖',
      });

    default:
      return null;
  }
}
