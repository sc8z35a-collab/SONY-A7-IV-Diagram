import { PartExplanation } from '../assemblies/types';

/**
 * 32 bespoke 320x118 Japanese technical SVG schematics for
 * **Phase 31 — 第1巻：超入門 ── 一眼カメラセンサーのしくみと2026年最新アーキテクチャ (`F1-01` – `F1-32`)**.
 */
export function renderPhase31SensorFabVol1SchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  const wrap = (body: string) =>
    `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Noto Sans JP', ui-sans-serif, sans-serif;">${body}</svg>`;

  switch (type) {
    case 'fab1_hero_optics_photonics':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="24" y="42" width="160" height="52" rx="4" fill="#1e293b"/>
        <path d="M52,14 L52,54" stroke="#38bdf8" stroke-width="3.5"/>
        <circle cx="52" cy="56" r="4.5" fill="#fde047"/>
        <path d="M104,14 L104,69" stroke="#22c55e" stroke-width="3.5"/>
        <circle cx="104" cy="71" r="4.5" fill="#fde047"/>
        <path d="M156,14 L156,84" stroke="#ef4444" stroke-width="3.5"/>
        <circle cx="156" cy="86" r="4.5" fill="#fde047"/>
        <rect x="38" y="34" width="28" height="8" rx="2" fill="#3b82f6"/>
        <rect x="90" y="34" width="28" height="8" rx="2" fill="#22c55e"/>
        <rect x="142" y="34" width="28" height="8" rx="2" fill="#ef4444"/>
        <text x="52" y="28" text-anchor="middle" font-size="7" fill="#0284c7" font-weight="700">青450nm</text>
        <text x="104" y="28" text-anchor="middle" font-size="7" fill="#15803d" font-weight="700">緑530nm</text>
        <text x="156" y="28" text-anchor="middle" font-size="7" fill="#b91c1c" font-weight="700">赤650nm</text>
        <rect x="194" y="20" width="110" height="74" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
        <text x="202" y="36" font-size="8" fill="#1d4ed8" font-weight="700">波長別の吸収深さ</text>
        <text x="202" y="51" font-size="7" fill="#334155">• 青：浅部(約0.4µm)で吸収</text>
        <text x="202" y="64" font-size="7" fill="#334155">• 緑：中間(約1.2µm)で吸収</text>
        <text x="202" y="77" font-size="7" fill="#334155">• 赤：深部(約3.0µm)で吸収</text>
        <text x="202" y="89" font-size="6.8" fill="#0369a1">光子1個→電子1個(光電効果)</text>
      `);

    case 'fab1_base_exhibition_deck':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="14" width="288" height="24" rx="4" fill="#dbeafe" stroke="#3b82f6"/>
        <text x="160" y="29" text-anchor="middle" font-size="8" fill="#1e40af" font-weight="700">第2章(奥): 2026年 6大アーキテクチャ＋3層DRAM 進化系統樹</text>
        <rect x="16" y="43" width="174" height="26" rx="4" fill="#f3e8ff" stroke="#9333ea"/>
        <text x="103" y="59" text-anchor="middle" font-size="7.5" fill="#6b21a8" font-weight="700">第3章(中): Sony対Canon AF＆GS</text>
        <rect x="196" y="43" width="108" height="26" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="250" y="59" text-anchor="middle" font-size="7.5" fill="#92400e" font-weight="700">第4章(右): 露光の壁</text>
        <rect x="16" y="74" width="166" height="28" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="99" y="91" text-anchor="middle" font-size="7.5" fill="#075985" font-weight="700">第1章(手前): 5ステップ＆4T-PPD</text>
        <rect x="188" y="74" width="116" height="28" rx="4" fill="#fee2e2" stroke="#dc2626"/>
        <text x="246" y="91" text-anchor="middle" font-size="7.5" fill="#991b1b" font-weight="700">下層: 300mm歩留比較</text>
      `);

    case 'fab1_step1_pd_bucket_fwc':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <path d="M36,28 L42,90 L118,90 L124,28" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>
        <rect x="43" y="44" width="74" height="44" fill="#38bdf8" opacity="0.8"/>
        <text x="80" y="22" text-anchor="middle" font-size="8" fill="#0369a1" font-weight="700">フルサイズ (3.7〜6µm)</text>
        <text x="80" y="70" text-anchor="middle" font-size="7.5" fill="#0c4a6e" font-weight="700">FWC 数万〜十数万e⁻</text>
        <text x="80" y="103" text-anchor="middle" font-size="7" fill="#334155">白飛びしにくく広DR</text>
        <path d="M168,58 L171,90 L205,90 L208,58" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <rect x="172" y="60" width="32" height="28" fill="#f87171"/>
        <ellipse cx="188" cy="56" rx="22" ry="6" fill="#ef4444" opacity="0.65"/>
        <text x="188" y="44" text-anchor="middle" font-size="7.5" fill="#b91c1c" font-weight="700">スマホ(0.6〜1.2µm)</text>
        <text x="188" y="103" text-anchor="middle" font-size="7" fill="#991b1b">すぐ満タン→白飛び</text>
        <rect x="224" y="24" width="80" height="72" rx="6" fill="#f0fdf4" stroke="#86efac"/>
        <text x="264" y="40" text-anchor="middle" font-size="7.5" fill="#166534" font-weight="700">雨水バケツ比喩</text>
        <text x="231" y="56" font-size="6.8" fill="#334155">光子＝雨粒</text>
        <text x="231" y="69" font-size="6.8" fill="#334155">PD＝光のバケツ</text>
        <text x="231" y="82" font-size="6.8" fill="#334155">FWC＝満タン容量</text>
      `);

    case 'fab1_step3_tg_sluice_gate':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="46" width="84" height="46" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
        <text x="62" y="72" text-anchor="middle" font-size="8" fill="#0c4a6e" font-weight="700">PD (バケツ)</text>
        <rect x="116" y="22" width="52" height="24" rx="3" fill="#475569"/>
        <text x="142" y="37" text-anchor="middle" font-size="8" fill="#ffffff" font-weight="700">TG 水門</text>
        <path d="M104,68 L182,68" stroke="#0ea5e9" stroke-width="3" stroke-dasharray="4 2"/>
        <polygon points="182,63 192,68 182,73" fill="#0ea5e9"/>
        <rect x="194" y="56" width="108" height="36" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <text x="248" y="77" text-anchor="middle" font-size="8" fill="#92400e" font-weight="700">FD (計量カップ)</text>
        <text x="142" y="56" text-anchor="middle" font-size="7" fill="#0369a1" font-weight="700">開(正電圧)→完全転送</text>
        <text x="160" y="104" text-anchor="middle" font-size="7" fill="#475569">露光中は負バイアスで固く閉じ暗電流も抑制</text>
      `);

    case 'fab1_step4_fd_dcg_cups':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="26" y="26" width="44" height="62" rx="4" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
        <rect x="28" y="34" width="40" height="52" fill="#4ade80" opacity="0.7"/>
        <text x="48" y="20" text-anchor="middle" font-size="7.5" fill="#854d0e" font-weight="700">小カップ(HCG)</text>
        <text x="48" y="100" text-anchor="middle" font-size="6.8" fill="#166534">暗所・ISO800低ノイズ</text>
        <rect x="86" y="48" width="48" height="20" rx="4" fill="#334155"/>
        <text x="110" y="61" text-anchor="middle" font-size="7.2" fill="#fde047" font-weight="700">DCG切替</text>
        <line x1="70" y1="58" x2="86" y2="58" stroke="#475569" stroke-width="2"/>
        <line x1="134" y1="58" x2="152" y2="58" stroke="#475569" stroke-width="2"/>
        <rect x="152" y="42" width="70" height="46" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
        <rect x="154" y="64" width="66" height="22" fill="#38bdf8" opacity="0.7"/>
        <text x="187" y="36" text-anchor="middle" font-size="7.5" fill="#0369a1" font-weight="700">補助大カップ(LCG)</text>
        <text x="187" y="100" text-anchor="middle" font-size="6.8" fill="#0369a1">明所・白飛び防止</text>
        <rect x="232" y="20" width="74" height="74" rx="5" fill="#fffbeb" stroke="#fcd34d"/>
        <text x="269" y="36" text-anchor="middle" font-size="7.5" fill="#b45309" font-weight="700">ΔV = q / C_FD</text>
        <text x="238" y="54" font-size="6.6" fill="#334155">C小→電圧変化大</text>
        <text x="238" y="67" font-size="6.6" fill="#334155">C大→満タン大</text>
        <text x="238" y="81" font-size="6.6" fill="#92400e">デュアルネイティブ</text>
      `);

    case 'fab1_step5_rst_sf_sel_cds':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="16" width="52" height="28" rx="4" fill="#ffedd5" stroke="#ea580c"/>
        <text x="42" y="33" text-anchor="middle" font-size="7.5" fill="#9a3412" font-weight="700">RST 掃除</text>
        <rect x="76" y="16" width="56" height="28" rx="4" fill="#fef9c3" stroke="#ca8a04"/>
        <text x="104" y="33" text-anchor="middle" font-size="7.5" fill="#854d0e" font-weight="700">SF 増幅伝令</text>
        <rect x="140" y="16" width="52" height="28" rx="4" fill="#dcfce7" stroke="#16a34a"/>
        <text x="166" y="33" text-anchor="middle" font-size="7.5" fill="#166534" font-weight="700">SEL 選択</text>
        <rect x="16" y="54" width="288" height="46" rx="6" fill="#f5f3ff" stroke="#8b5cf6"/>
        <text x="26" y="70" font-size="8" fill="#5b21b6" font-weight="700">CDS（相関二重サンプリング）引き算回路</text>
        <text x="26" y="86" font-size="7.5" fill="#1e293b">(空カップ基準 V_rst + kTC) − (信号後 V_sig + kTC) = kTCノイズ完全消去!</text>
        <rect x="204" y="16" width="100" height="28" rx="4" fill="#ede9fe" stroke="#7c3aed"/>
        <text x="254" y="33" text-anchor="middle" font-size="7.5" fill="#5b21b6" font-weight="700">TG込み＝4T画素</text>
      `);

    case 'fab1_column_14bit_adc':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="20" y="21" font-size="8" fill="#1e3a8a" font-weight="700">列並列 14-bit カラムADC（例：横6,000列同時動作！）</text>
        ${[0, 1, 2, 3, 4, 5]
          .map(
            (i) => `
          <rect x="${22 + i * 32}" y="28" width="24" height="44" rx="3" fill="${i % 2 === 0 ? '#dbeafe' : '#e0e7ff'}" stroke="#2563eb"/>
          <text x="${34 + i * 32}" y="53" text-anchor="middle" font-size="6.8" fill="#1e40af" font-weight="700">ADC</text>
          <path d="M${34 + i * 32},72 L${34 + i * 32},88" stroke="#0284c7" stroke-width="1.6"/>
        `
          )
          .join('')}
        <rect x="218" y="28" width="84" height="60" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="260" y="45" text-anchor="middle" font-size="8" fill="#1d4ed8" font-weight="700">14-bit 出力</text>
        <text x="260" y="59" text-anchor="middle" font-size="7.5" fill="#0f172a" font-weight="700">0 〜 16,383</text>
        <text x="260" y="72" text-anchor="middle" font-size="6.8" fill="#334155">16,384段階の階調</text>
        <text x="260" y="83" text-anchor="middle" font-size="6.5" fill="#0369a1">ランプ波比較変換</text>
        <text x="114" y="102" text-anchor="middle" font-size="7" fill="#475569">全列同時デジタル化で高速連写＆低ノイズを実現</text>
      `);

    case 'fab1_pixel_parallel_adc':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="16" width="164" height="24" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.8"/>
        <text x="102" y="31" text-anchor="middle" font-size="7.8" fill="#166534" font-weight="700">90nm 画素ウェーハ層</text>
        ${[0, 1, 2, 3, 4, 5]
          .map((i) => `<line x1="${36 + i * 26}" y1="40" x2="${36 + i * 26}" y2="58" stroke="#ea580c" stroke-width="2.6"/>`)
          .join('')}
        <text x="102" y="53" text-anchor="middle" font-size="6.5" fill="#9a3412" font-weight="700">Cu-Cu ハイブリッド直結</text>
        <rect x="20" y="58" width="164" height="32" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.8"/>
        <text x="102" y="77" text-anchor="middle" font-size="7.8" fill="#5b21b6" font-weight="700">画素真下 14-bit 並列ADC群</text>
        <rect x="196" y="18" width="108" height="78" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="250" y="35" text-anchor="middle" font-size="7.8" fill="#15803d" font-weight="700">ISSCC 2025 進化</text>
        <text x="203" y="50" font-size="6.8" fill="#334155">• 長い列配線を撤廃</text>
        <text x="203" y="63" font-size="6.8" fill="#334155">• 画素直下で即0/1化</text>
        <text x="203" y="76" font-size="6.8" fill="#334155">• 120fps / 2.66 e-rms</text>
        <text x="203" y="88" font-size="6.5" fill="#166534">[学会・論文]</text>
      `);

    case 'fab1_ccd_vs_cmos_arena':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="14" y="14" width="138" height="90" rx="6" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="83" y="29" text-anchor="middle" font-size="8" fill="#991b1b" font-weight="700">昔の CCD（バケツリレー）</text>
        <circle cx="36" cy="52" r="9" fill="#f97316"/>
        <circle cx="68" cy="52" r="9" fill="#f97316"/>
        <circle cx="100" cy="52" r="9" fill="#f97316"/>
        <path d="M45,52 L59,52 M77,52 L91,52 M109,52 L123,52" stroke="#b91c1c" stroke-width="2"/>
        <rect x="122" y="42" width="22" height="20" rx="3" fill="#dc2626"/>
        <text x="133" y="55" text-anchor="middle" font-size="6" fill="#fff">1出力</text>
        <text x="83" y="79" text-anchor="middle" font-size="6.8" fill="#7f1d1d">直列転送で時間・電力大</text>
        <text x="83" y="92" text-anchor="middle" font-size="6.8" fill="#7f1d1d">高速連写・8K動画に不向き</text>
        <rect x="166" y="14" width="140" height="90" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
        <text x="236" y="29" text-anchor="middle" font-size="8" fill="#1e40af" font-weight="700">現代 CMOS（並列統合）</text>
        ${[0, 1, 2]
          .map(
            (i) => `
          <rect x="${182 + i * 38}" y="42" width="28" height="20" rx="3" fill="#0ea5e9"/>
          <text x="${196 + i * 38}" y="55" text-anchor="middle" font-size="6" fill="#fff" font-weight="700">増+ADC</text>
        `
          )
          .join('')}
        <text x="236" y="79" text-anchor="middle" font-size="6.8" fill="#1e3a8a">各画素増幅＋1チップ/積層</text>
        <text x="236" y="92" text-anchor="middle" font-size="6.8" fill="#1e3a8a">30〜120fps連写＆8K可能!</text>
      `);

    case 'fab1_arch1_fsi_r6m3':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="28" width="136" height="12" rx="2" fill="#22c55e"/>
        <rect x="20" y="42" width="136" height="22" fill="#e2e8f0" stroke="#94a3b8"/>
        <rect x="30" y="46" width="26" height="6" fill="#d97706"/>
        <rect x="74" y="46" width="26" height="6" fill="#d97706"/>
        <rect x="118" y="46" width="26" height="6" fill="#d97706"/>
        <rect x="46" y="55" width="32" height="6" fill="#b45309"/>
        <rect x="98" y="55" width="32" height="6" fill="#b45309"/>
        <rect x="20" y="66" width="136" height="28" rx="3" fill="#0284c7"/>
        <text x="88" y="83" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">PD（配線の下）</text>
        <path d="M58,12 L68,66 M124,12 L106,52" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="170" y="18" width="134" height="80" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
        <text x="178" y="34" font-size="8" fill="#334155" font-weight="700">① 表面照射型 FSI</text>
        <text x="178" y="49" font-size="7" fill="#475569">• 配線格子が光の上にある</text>
        <text x="178" y="62" font-size="7" fill="#475569">• 安価だが斜め光がケラレ</text>
        <text x="178" y="76" font-size="7" fill="#0f172a" font-weight="700">代表: EOS R6 Mark III</text>
        <text x="178" y="89" font-size="6.6" fill="#475569">(32.5MP有効・非積層FSI)</text>
      `);

    case 'fab1_arch2_bsi_a7iv':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="24" width="136" height="12" rx="2" fill="#38bdf8"/>
        <rect x="20" y="38" width="136" height="26" rx="3" fill="#0284c7"/>
        <text x="88" y="54" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">極薄BSI PD（配線ゼロ!）</text>
        <rect x="20" y="66" width="136" height="16" fill="#fed7aa" stroke="#ea580c"/>
        <text x="88" y="77" text-anchor="middle" font-size="7" fill="#9a3412" font-weight="700">配線層は下へ退避</text>
        <rect x="20" y="84" width="136" height="14" rx="2" fill="#475569"/>
        <path d="M44,10 L58,46 M132,10 L114,46" stroke="#0ea5e9" stroke-width="2.2"/>
        <rect x="170" y="18" width="134" height="80" rx="6" fill="#e0f2fe" stroke="#38bdf8"/>
        <text x="178" y="34" font-size="8" fill="#0369a1" font-weight="700">② 裏面照射型 BSI</text>
        <text x="178" y="49" font-size="7" fill="#334155">• 量子効率QE大幅アップ</text>
        <text x="178" y="62" font-size="7" fill="#334155">• 斜め光＆暗所に強い</text>
        <text x="178" y="76" font-size="7" fill="#0f172a" font-weight="700">代表: α7 IV / α7R V</text>
        <text x="178" y="89" font-size="6.8" fill="#334155">ニコン Zf / Z5II など</text>
      `);

    case 'fab1_arch3_partial_stack_a7v':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="24" width="136" height="24" rx="3" fill="#0ea5e9"/>
        <text x="88" y="39" text-anchor="middle" font-size="7.8" fill="#fff" font-weight="700">BSI 画素層（全面）</text>
        <rect x="20" y="52" width="36" height="28" rx="3" fill="#2563eb"/>
        <text x="38" y="69" text-anchor="middle" font-size="6.5" fill="#fff" font-weight="700">高速ADC</text>
        <rect x="60" y="56" width="56" height="20" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-dasharray="3 2"/>
        <text x="88" y="69" text-anchor="middle" font-size="6.5" fill="#64748b">中央非積層</text>
        <rect x="120" y="52" width="36" height="28" rx="3" fill="#2563eb"/>
        <text x="138" y="69" text-anchor="middle" font-size="6.5" fill="#fff" font-weight="700">高速ADC</text>
        <rect x="20" y="84" width="136" height="12" rx="2" fill="#334155"/>
        <rect x="168" y="14" width="138" height="90" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="176" y="30" font-size="7.8" fill="#1d4ed8" font-weight="700">③ 部分積層(2024–26革命)</text>
        <text x="176" y="45" font-size="6.8" fill="#334155">• 上下端のみ高速回路積層</text>
        <text x="176" y="58" font-size="6.8" fill="#334155">• 低コスト＆数倍高速化</text>
        <text x="176" y="71" font-size="6.8" fill="#1e40af" font-weight="700">• 同時二重ゲインで高DR!</text>
        <text x="176" y="85" font-size="6.8" fill="#0f172a" font-weight="700">Z6III / S1II / α7 V(16stop)</text>
      `);

    case 'fab1_arch4_full_stack_a7rvi':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="20" width="134" height="24" rx="3" fill="#0ea5e9"/>
        <text x="87" y="35" text-anchor="middle" font-size="7.8" fill="#fff" font-weight="700">2階：BSI 画素チップ全面</text>
        <rect x="20" y="46" width="134" height="12" rx="2" fill="#ea580c"/>
        <text x="87" y="55" text-anchor="middle" font-size="6.6" fill="#fff" font-weight="700">全面 Cu-Cu ハイブリッド接合</text>
        <rect x="20" y="60" width="134" height="32" rx="3" fill="#1e3a8a"/>
        <text x="87" y="79" text-anchor="middle" font-size="7.8" fill="#fde047" font-weight="700">1階：ロジック・ADC全面</text>
        <rect x="166" y="14" width="140" height="90" rx="6" fill="#fffbeb" stroke="#d97706"/>
        <text x="174" y="30" font-size="7.8" fill="#92400e" font-weight="700">④ 2層フル積層フラッグシップ</text>
        <text x="174" y="45" font-size="6.8" fill="#334155">• α1 II / α7R VI(66.8MP)</text>
        <text x="174" y="58" font-size="6.8" fill="#334155">• EOS R1 / R5 II / Z9 / Z8</text>
        <text x="174" y="71" font-size="6.8" fill="#334155">• LI8030SA(4.1億画素!)</text>
        <text x="174" y="85" font-size="6.6" fill="#b45309">超高速30–40fps・8K・高価格</text>
      `);

    case 'fab1_arch4b_3layer_dram':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="24" y="16" width="130" height="22" rx="3" fill="#0ea5e9"/>
        <text x="89" y="30" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="700">3階：BSI 画素層</text>
        <rect x="24" y="44" width="130" height="22" rx="3" fill="#4f46e5"/>
        <text x="89" y="58" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="700">2階：高速 DRAM 層</text>
        <rect x="24" y="72" width="130" height="22" rx="3" fill="#1e293b"/>
        <text x="89" y="86" text-anchor="middle" font-size="7.5" fill="#fde047" font-weight="700">1階：ロジック・ADC層</text>
        <line x1="34" y1="16" x2="34" y2="94" stroke="#f59e0b" stroke-width="3"/>
        <line x1="144" y1="16" x2="144" y2="94" stroke="#f59e0b" stroke-width="3"/>
        <rect x="168" y="18" width="136" height="78" rx="6" fill="#eef2ff" stroke="#6366f1"/>
        <text x="176" y="35" font-size="7.8" fill="#3730a3" font-weight="700">第4世代A：3層DRAM内蔵</text>
        <text x="176" y="51" font-size="6.8" fill="#334155">• 3枚ウェーハ縦積み＋TSV</text>
        <text x="176" y="65" font-size="6.8" fill="#334155">• 撮像直後にDRAMへ一時退避</text>
        <text x="176" y="79" font-size="6.8" fill="#334155">• 超高速連写＆スーパースロー</text>
      `);

    case 'fab1_arch5_gs_stacked_a9iii':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="16" width="136" height="14" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="88" y="26" text-anchor="middle" font-size="7" fill="#991b1b" font-weight="700">全画素同時露光・1/80,000s同調</text>
        <rect x="20" y="34" width="136" height="20" rx="3" fill="#0ea5e9"/>
        <text x="88" y="47" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">BSI 画素全面</text>
        <rect x="20" y="56" width="136" height="16" rx="2" fill="#475569"/>
        <text x="88" y="67" text-anchor="middle" font-size="6.8" fill="#fde047" font-weight="700">画素内メモリ / 電圧保持 / 並列ADC</text>
        <rect x="20" y="74" width="136" height="22" rx="3" fill="#1e3a8a"/>
        <text x="88" y="88" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">超高速積層ロジック層</text>
        <rect x="166" y="14" width="140" height="90" rx="6" fill="#fef2f2" stroke="#ef4444"/>
        <text x="174" y="30" font-size="7.8" fill="#b91c1c" font-weight="700">⑤ グローバルシャッターGS</text>
        <text x="174" y="45" font-size="6.8" fill="#334155">• α9 III (IMX810AQL 24.6MP)</text>
        <text x="174" y="58" font-size="6.8" fill="#334155">• IMX927 (105.51MP正方1:1)</text>
        <text x="174" y="71" font-size="6.8" fill="#334155">• ISSCC2025(25.2MP 120fps)</text>
        <text x="174" y="85" font-size="6.6" fill="#991b1b">歪み・フリッカー完全ゼロ!</text>
      `);

    case 'fab1_arch6_2layer_tr_lytia':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="22" y="16" width="132" height="24" rx="3" fill="#0284c7"/>
        <text x="88" y="31" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="700">上層：PD専用層（FWC約2倍!）</text>
        <line x1="56" y1="40" x2="56" y2="50" stroke="#f59e0b" stroke-width="3"/>
        <line x1="120" y1="40" x2="120" y2="50" stroke="#f59e0b" stroke-width="3"/>
        <rect x="22" y="50" width="132" height="22" rx="3" fill="#9333ea"/>
        <text x="88" y="64" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">中層：画素Tr専用層(大型SF)</text>
        <rect x="22" y="76" width="132" height="20" rx="3" fill="#1e293b"/>
        <text x="88" y="89" text-anchor="middle" font-size="7.2" fill="#fde047" font-weight="700">下層：ロジック層</text>
        <rect x="166" y="16" width="140" height="84" rx="6" fill="#faf5ff" stroke="#a855f7"/>
        <text x="174" y="33" font-size="7.6" fill="#6b21a8" font-weight="700">⑥ 2層トランジスタ画素</text>
        <text x="174" y="48" font-size="6.8" fill="#334155">• PDと画素Trを別層分離</text>
        <text x="174" y="62" font-size="6.8" fill="#334155">• 飽和容量約2倍＋低ノイズ</text>
        <text x="174" y="76" font-size="6.8" fill="#334155">• Exmor T / LYTIA(スマホ先行)</text>
        <text x="174" y="89" font-size="6.5" fill="#7e22ce">フルサイズ一眼適用は未確認</text>
      `);

    case 'fab1_canon_dpaf_standard':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <path d="M36,44 Q92,10 148,44 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
        <rect x="36" y="48" width="53" height="38" rx="3" fill="#fb923c" stroke="#ea580c" stroke-width="1.8"/>
        <text x="62" y="70" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">PD-A像</text>
        <rect x="95" y="48" width="53" height="38" rx="3" fill="#38bdf8" stroke="#0284c7" stroke-width="1.8"/>
        <text x="121" y="70" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">PD-B像</text>
        <line x1="92" y1="46" x2="92" y2="88" stroke="#1e293b" stroke-width="2.5"/>
        <rect x="166" y="16" width="138" height="84" rx="6" fill="#fef2f2" stroke="#dc2626"/>
        <text x="174" y="33" font-size="7.8" fill="#b91c1c" font-weight="700">キヤノン DPAF（全画素）</text>
        <text x="174" y="48" font-size="6.8" fill="#334155">• 1レンズ下にPD左右2分割</text>
        <text x="174" y="62" font-size="6.8" fill="#334155">• 転送ゲートも2本(FEOL精密)</text>
        <text x="174" y="76" font-size="6.8" fill="#334155">• A+B合算で画質ロスゼロ</text>
        <text x="174" y="89" font-size="6.5" fill="#991b1b">世界シェア23年連続首位</text>
      `);

    case 'fab1_canon_r1_crosstype_af':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="22" y="18" width="26" height="38" rx="2" fill="#f97316"/>
        <rect x="50" y="18" width="26" height="38" rx="2" fill="#0ea5e9"/>
        <text x="49" y="67" text-anchor="middle" font-size="6.8" fill="#334155" font-weight="700">左右分割(縦線)</text>
        <rect x="92" y="18" width="54" height="18" rx="2" fill="#eab308"/>
        <rect x="92" y="38" width="54" height="18" rx="2" fill="#9333ea"/>
        <text x="119" y="67" text-anchor="middle" font-size="6.8" fill="#6b21a8" font-weight="700">90°回転上下(横線)</text>
        <line x1="48" y1="84" x2="122" y2="84" stroke="#dc2626" stroke-width="3"/>
        <line x1="85" y1="72" x2="85" y2="96" stroke="#ca8a04" stroke-width="3"/>
        <rect x="164" y="16" width="140" height="84" rx="6" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="172" y="33" font-size="7.8" fill="#92400e" font-weight="700">EOS R1 世界初クロスAF</text>
        <text x="172" y="48" font-size="6.8" fill="#334155">• 一部PDを90°回転混在配置</text>
        <text x="172" y="62" font-size="6.8" fill="#334155">• 縦線＋横線(鳥の翼/ネット)</text>
        <text x="172" y="76" font-size="6.8" fill="#334155">• DIGIC X + Accelerator連携</text>
        <text x="172" y="89" font-size="6.5" fill="#b45309">[確認済み]</text>
      `);

    case 'fab1_sony_pdaf_mask_ocl':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <path d="M22,42 Q50,18 78,42 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>
        <rect x="22" y="42" width="28" height="8" fill="#1e293b"/>
        <rect x="22" y="50" width="56" height="32" rx="3" fill="#22c55e"/>
        <text x="50" y="95" text-anchor="middle" font-size="7" fill="#334155" font-weight="700">遮光膜型PDAF</text>
        <path d="M94,42 Q128,12 162,42 Z" fill="#67e8f9" stroke="#0891b2" stroke-width="2"/>
        <rect x="94" y="46" width="32" height="36" rx="3" fill="#0ea5e9"/>
        <rect x="130" y="46" width="32" height="36" rx="3" fill="#0ea5e9"/>
        <text x="128" y="95" text-anchor="middle" font-size="7" fill="#0369a1" font-weight="700">2×1 / 2×2 OCL共有</text>
        <rect x="174" y="16" width="132" height="84" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="182" y="33" font-size="7.8" fill="#0e7490" font-weight="700">ソニー 像面位相差AF</text>
        <text x="182" y="48" font-size="6.8" fill="#334155">• 遮光型とOCL型を世代別選択</text>
        <text x="182" y="62" font-size="6.8" fill="#334155">• 2×1/2×2画素で1レンズ共有</text>
        <text x="182" y="76" font-size="6.8" fill="#334155">• P7マイクロレンズ成形が要</text>
        <text x="182" y="89" font-size="6.5" fill="#0891b2">[確認済み]/[業界標準]</text>
      `);

    case 'fab1_gs_rolling_vs_global':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="16" y="14" width="136" height="90" rx="6" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="84" y="29" text-anchor="middle" font-size="7.8" fill="#991b1b" font-weight="700">ローリング(上から順次)</text>
        <line x1="30" y1="42" x2="138" y2="42" stroke="#fca5a5" stroke-dasharray="3 2"/>
        <line x1="30" y1="58" x2="138" y2="58" stroke="#fca5a5" stroke-dasharray="3 2"/>
        <line x1="30" y1="74" x2="138" y2="74" stroke="#fca5a5" stroke-dasharray="3 2"/>
        <path d="M56,88 Q74,64 110,36" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
        <text x="84" y="98" text-anchor="middle" font-size="6.8" fill="#991b1b">高速動体が斜めに湾曲</text>
        <rect x="166" y="14" width="138" height="90" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="235" y="29" text-anchor="middle" font-size="7.8" fill="#0e7490" font-weight="700">グローバル(全画素同時)</text>
        <rect x="180" y="36" width="110" height="50" rx="3" fill="#cffafe" stroke="#0891b2"/>
        <line x1="235" y1="38" x2="235" y2="84" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
        <text x="235" y="98" text-anchor="middle" font-size="6.8" fill="#0369a1">歪みゼロ・1/80,000s同調</text>
      `);

    case 'fab1_gs_charge_domain':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="42" width="66" height="46" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
        <text x="53" y="69" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">PD (受光)</text>
        <path d="M86,65 L110,65" stroke="#ea580c" stroke-width="2.5"/>
        <rect x="108" y="30" width="74" height="12" rx="2" fill="#1e293b"/>
        <text x="145" y="25" text-anchor="middle" font-size="7" fill="#1e293b" font-weight="700">極厚タングステン遮光</text>
        <rect x="112" y="44" width="66" height="44" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
        <text x="145" y="69" text-anchor="middle" font-size="7.5" fill="#0f172a" font-weight="700">メモリノード</text>
        <rect x="192" y="18" width="114" height="80" rx="6" fill="#f1f5f9" stroke="#64748b"/>
        <text x="199" y="34" font-size="7.6" fill="#334155" font-weight="700">GS① 電荷ドメイン型</text>
        <text x="199" y="49" font-size="6.7" fill="#475569">• 電荷のまま隣MNへ一斉転送</text>
        <text x="199" y="63" font-size="6.7" fill="#475569">• 課題：迷光漏れ(PLS対策)</text>
        <text x="199" y="77" font-size="6.7" fill="#475569">• 産業用Pregius系で定番</text>
        <text x="199" y="90" font-size="6.5" fill="#64748b">[業界標準]</text>
      `);

    case 'fab1_gs_voltage_domain_a9iii':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="18" width="136" height="22" rx="3" fill="#0ea5e9"/>
        <text x="88" y="32" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="700">5.9µm BSI画素(全画素変換)</text>
        <rect x="20" y="46" width="64" height="26" rx="3" fill="#f59e0b"/>
        <text x="52" y="62" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">保持容量 C_S1</text>
        <rect x="92" y="46" width="64" height="26" rx="3" fill="#ea580c"/>
        <text x="124" y="62" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">保持容量 C_S2</text>
        <rect x="20" y="76" width="136" height="20" rx="3" fill="#1e3a8a"/>
        <text x="88" y="89" text-anchor="middle" font-size="7.2" fill="#fde047" font-weight="700">積層ロジック順次読出</text>
        <rect x="166" y="16" width="140" height="84" rx="6" fill="#fff7ed" stroke="#ea580c"/>
        <text x="174" y="32" font-size="7.6" fill="#9a3412" font-weight="700">GS② 電圧ドメイン(α9 III)</text>
        <text x="174" y="47" font-size="6.8" fill="#334155">• IMX810AQL(24.6MP・5.9µm)</text>
        <text x="174" y="61" font-size="6.8" fill="#334155">• 同時電圧変換→容量保持</text>
        <text x="174" y="75" font-size="6.8" fill="#334155">• 基準ISO250・120fps歪み0</text>
        <text x="174" y="89" font-size="6.5" fill="#c2410c">[確認済み] TechInsights</text>
      `);

    case 'fab1_gs_pixel_adc_isscc2025':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="18" y="16" width="142" height="22" rx="3" fill="#0284c7"/>
        <text x="89" y="30" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">90nm画素 (8×1 / 5.94µm)</text>
        ${[0, 1, 2, 3, 4, 5, 6, 7]
          .map((i) => `<line x1="${28 + i * 17}" y1="38" x2="${28 + i * 17}" y2="56" stroke="#ea580c" stroke-width="2.4"/>`)
          .join('')}
        <text x="89" y="51" text-anchor="middle" font-size="6.5" fill="#9a3412" font-weight="700">5,040万 Cu-Cu (2接点/画素)</text>
        <rect x="18" y="56" width="142" height="36" rx="3" fill="#7c3aed"/>
        <text x="89" y="72" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">40nmロジック: 4×2 14-bit ADC</text>
        <text x="89" y="85" text-anchor="middle" font-size="6.5" fill="#fde047">サブスレッショルド超低電力</text>
        <rect x="168" y="14" width="138" height="90" rx="6" fill="#faf5ff" stroke="#9333ea"/>
        <text x="175" y="30" font-size="7.6" fill="#6b21a8" font-weight="700">GS③ ソニー ISSCC 2025</text>
        <text x="175" y="45" font-size="6.8" fill="#334155">• 25.2MP フルサイズGS</text>
        <text x="175" y="58" font-size="6.8" fill="#334155">• 120 fps 全画素デジタル化</text>
        <text x="175" y="71" font-size="6.8" fill="#334155">• ノイズ 2.66 e-rms</text>
        <text x="175" y="84" font-size="6.8" fill="#334155">• 消費電力 1,545 mW</text>
        <text x="175" y="96" font-size="6.3" fill="#7e22ce">[学会・論文] Kainuma氏ら</text>
      `);

    case 'fab1_wall_field_overflow':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="22" y="28" width="138" height="62" rx="3" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <rect x="34" y="20" width="114" height="78" rx="2" fill="none" stroke="#eab308" stroke-width="2.5" stroke-dasharray="5 3"/>
        <rect x="38" y="34" width="106" height="50" fill="#bae6fd" opacity="0.75"/>
        <text x="91" y="56" text-anchor="middle" font-size="7.5" fill="#0c4a6e" font-weight="700">フルサイズ 27×38mm</text>
        <text x="91" y="69" text-anchor="middle" font-size="6.8" fill="#b91c1c" font-weight="700">(1,026 mm²)</text>
        <text x="91" y="16" text-anchor="middle" font-size="7" fill="#a16207" font-weight="700">標準露光画角 26×33mm (858mm²)</text>
        <text x="28" y="62" text-anchor="middle" font-size="6.5" fill="#b91c1c" font-weight="700">超過</text>
        <text x="154" y="62" text-anchor="middle" font-size="6.5" fill="#b91c1c" font-weight="700">超過</text>
        <rect x="172" y="20" width="132" height="76" rx="6" fill="#fef2f2" stroke="#ef4444"/>
        <text x="180" y="36" font-size="7.8" fill="#991b1b" font-weight="700">壁①：標準機に収まらない</text>
        <text x="180" y="51" font-size="6.8" fill="#334155">• 有効面 24×36mm</text>
        <text x="180" y="64" font-size="6.8" fill="#334155">• 周辺込 27×38mm</text>
        <text x="180" y="77" font-size="6.8" fill="#b91c1c">→ 一括露光機 or つなぎ露光</text>
        <text x="180" y="89" font-size="6.5" fill="#991b1b">[確認済み]</text>
      `);

    case 'fab1_canon_fpa6300esw':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="52" y="14" width="68" height="12" rx="2" fill="#475569"/>
        <polygon points="62,26 110,26 138,68 34,68" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.6"/>
        <rect x="26" y="68" width="120" height="28" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <rect x="38" y="73" width="96" height="18" rx="2" fill="#0ea5e9"/>
        <text x="86" y="85" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">33×42.2mm 一発露光!</text>
        <text x="86" y="52" text-anchor="middle" font-size="7" fill="#5b21b6" font-weight="700">KrF 248nm (1:3.125)</text>
        <rect x="160" y="16" width="144" height="84" rx="6" fill="#fffbeb" stroke="#d97706"/>
        <text x="168" y="32" font-size="7.6" fill="#92400e" font-weight="700">キヤノン FPA-6300ESW</text>
        <text x="168" y="47" font-size="6.8" fill="#334155">• 継ぎ目ゼロのワンショット!</text>
        <text x="168" y="60" font-size="6.8" fill="#334155">• 解像力 130nm以下</text>
        <text x="168" y="73" font-size="6.8" fill="#334155">• 重ね合わせ 9nm以下</text>
        <text x="168" y="86" font-size="6.5" fill="#b45309">世界唯一のFF無継ぎ目KrF機</text>
      `);

    case 'fab1_canon_fpa5550ix':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <polygon points="62,22 110,22 142,66 30,66" fill="#cffafe" stroke="#0891b2" stroke-width="1.6"/>
        <rect x="24" y="66" width="124" height="30" rx="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
        <text x="86" y="84" text-anchor="middle" font-size="7.8" fill="#0369a1" font-weight="700">50 × 50 mm 超広画角!</text>
        <line x1="34" y1="42" x2="54" y2="74" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <line x1="138" y1="42" x2="118" y2="74" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="86" y="46" text-anchor="middle" font-size="7" fill="#0e7490" font-weight="700">i線 365nm + IR透過整合</text>
        <rect x="160" y="16" width="144" height="84" rx="6" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="168" y="32" font-size="7.6" fill="#0e7490" font-weight="700">キヤノン FPA-5550iX</text>
        <text x="168" y="47" font-size="6.8" fill="#334155">• 2023年発売・50×50mm一括</text>
        <text x="168" y="60" font-size="6.8" fill="#334155">• 解像力 0.5 µm</text>
        <text x="168" y="73" font-size="6.8" fill="#334155">• シリコン透過IR裏面整合</text>
        <text x="168" y="86" font-size="6.5" fill="#0891b2">中判超え・BSI裏面光学対応</text>
      `);

    case 'fab1_stitching_exposure':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="20" y="30" width="42" height="54" rx="2" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
        <rect x="62" y="30" width="42" height="54" rx="2" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
        <rect x="104" y="30" width="42" height="54" rx="2" fill="#f3e8ff" stroke="#9333ea" stroke-width="1.8"/>
        <line x1="62" y1="22" x2="62" y2="92" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
        <line x1="104" y1="22" x2="104" y2="92" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="41" y="60" text-anchor="middle" font-size="7" fill="#1e40af" font-weight="700">左Shot</text>
        <text x="83" y="60" text-anchor="middle" font-size="7" fill="#92400e" font-weight="700">中Shot</text>
        <text x="125" y="60" text-anchor="middle" font-size="7" fill="#6b21a8" font-weight="700">右Shot</text>
        <text x="83" y="102" text-anchor="middle" font-size="6.8" fill="#b91c1c">数nm精度つなぎ目(バンディング対策)</text>
        <rect x="160" y="16" width="144" height="84" rx="6" fill="#faf5ff" stroke="#9333ea"/>
        <text x="168" y="32" font-size="7.6" fill="#6b21a8" font-weight="700">突破法② スティッチング露光</text>
        <text x="168" y="47" font-size="6.8" fill="#334155">• 既存ArF等で2〜3回分割焼付</text>
        <text x="168" y="60" font-size="6.8" fill="#334155">• 中判(44×33mm)も製造可能</text>
        <text x="168" y="73" font-size="6.8" fill="#334155">• Tower Semi公式明記[確認済み]</text>
        <text x="168" y="86" font-size="6.5" fill="#7e22ce">ソニー方式は非公開[未確認]</text>
      `);

    case 'fab1_wafer_smartphone_640':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="72" cy="59" r="42" fill="#0f172a" stroke="#10b981" stroke-width="2.5"/>
        <circle cx="72" cy="59" r="37" fill="#059669" opacity="0.35"/>
        ${[-22, -12, -2, 8, 18]
          .map((dx) =>
            [-22, -12, -2, 8, 18]
              .map(
                (dy) =>
                  `<rect x="${72 + dx - 3}" y="${59 + dy - 2.5}" width="6" height="5" fill="${
                    dx === 8 && dy === -2 ? '#ef4444' : '#34d399'
                  }"/>`
              )
              .join('')
          )
          .join('')}
        <rect x="130" y="16" width="174" height="86" rx="6" fill="#f0fdf4" stroke="#10b981"/>
        <text x="138" y="33" font-size="8" fill="#065f46" font-weight="700">① スマホ 1/1.3型 (11×9mm)</text>
        <text x="138" y="49" font-size="7.2" fill="#0f172a" font-weight="700">300mm取れ数：約 640 個</text>
        <text x="138" y="64" font-size="7.2" fill="#15803d" font-weight="700">ゴミ10個時の歩留まり：約 98%</text>
        <text x="138" y="79" font-size="6.8" fill="#334155">面積 S ≈ 99 mm² で圧倒的高歩留</text>
        <text x="138" y="92" font-size="6.5" fill="#047857">だから数百円〜数千円で量産可能 [推定]</text>
      `);

    case 'fab1_wafer_apsc_134':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="72" cy="59" r="42" fill="#0f172a" stroke="#0ea5e9" stroke-width="2.5"/>
        ${[-20, -6, 8]
          .map((dx) =>
            [-22, -10, 2, 14]
              .map(
                (dy) =>
                  `<rect x="${72 + dx - 4}" y="${59 + dy - 3}" width="11" height="8" fill="${
                    dx === 8 && dy === 2 ? '#ef4444' : '#38bdf8'
                  }"/>`
              )
              .join('')
          )
          .join('')}
        <rect x="130" y="16" width="174" height="86" rx="6" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="138" y="33" font-size="8" fill="#075985" font-weight="700">② APS-C 一眼 (25×17mm)</text>
        <text x="138" y="49" font-size="7.2" fill="#0f172a" font-weight="700">300mm取れ数：約 134 個</text>
        <text x="138" y="64" font-size="7.2" fill="#0369a1" font-weight="700">ゴミ10個時の歩留まり：約 93%</text>
        <text x="138" y="79" font-size="6.8" fill="#334155">面積 S ≈ 425 mm² (標準画角に収まる)</text>
        <text x="138" y="92" font-size="6.5" fill="#0369a1">フルサイズの約2.8倍の取れ数 [推定]</text>
      `);

    case 'fab1_wafer_fullframe_48':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="72" cy="59" r="42" fill="#0f172a" stroke="#f59e0b" stroke-width="2.5"/>
        ${[-18, 2]
          .map((dx) =>
            [-22, -8, 6, 20]
              .map(
                (dy) =>
                  `<rect x="${72 + dx}" y="${59 + dy - 5}" width="16" height="11" fill="${
                    (dx === 2 && dy === -8) || (dx === -18 && dy === 6) ? '#ef4444' : '#60a5fa'
                  }"/>`
              )
              .join('')
          )
          .join('')}
        <rect x="130" y="16" width="174" height="86" rx="6" fill="#fffbeb" stroke="#d97706"/>
        <text x="138" y="33" font-size="8" fill="#92400e" font-weight="700">③ フルサイズ一眼 (38×27mm)</text>
        <text x="138" y="49" font-size="7.2" fill="#0f172a" font-weight="700">300mm取れ数：たった約 48 個</text>
        <text x="138" y="64" font-size="7.2" fill="#b45309" font-weight="700">ゴミ10個時の歩留まり：約 81%</text>
        <text x="138" y="79" font-size="6.8" fill="#334155">面積 S ≈ 1,026 mm² (実配置40〜50個)</text>
        <text x="138" y="92" font-size="6.5" fill="#b91c1c">大きいほどゴミ命中率が激増! [推定]</text>
      `);

    case 'fab1_wafer_mediumformat_26':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="72" cy="59" r="42" fill="#0f172a" stroke="#dc2626" stroke-width="2.5"/>
        <circle cx="72" cy="59" r="38" fill="none" stroke="#f59e0b" stroke-dasharray="4 3"/>
        <rect x="48" y="32" width="22" height="16" fill="#818cf8"/>
        <rect x="74" y="32" width="22" height="16" fill="#ef4444"/>
        <rect x="48" y="52" width="22" height="16" fill="#ef4444"/>
        <rect x="74" y="52" width="22" height="16" fill="#818cf8"/>
        <rect x="60" y="72" width="22" height="16" fill="#818cf8"/>
        <rect x="130" y="16" width="174" height="86" rx="6" fill="#fef2f2" stroke="#dc2626"/>
        <text x="138" y="33" font-size="8" fill="#991b1b" font-weight="700">④ 中判 44×33mm (46×35mm)</text>
        <text x="138" y="49" font-size="7.2" fill="#0f172a" font-weight="700">300mm取れ数：約 26 個(実20-28)</text>
        <text x="138" y="64" font-size="7.2" fill="#dc2626" font-weight="700">ゴミ10個時の歩留まり：約 68%</text>
        <text x="138" y="79" font-size="6.8" fill="#334155">面積 S ≈ 1,610 mm²・周辺余白ロス大</text>
        <text x="138" y="92" font-size="6.5" fill="#991b1b">約32%が不良化する超希少ダイ [推定]</text>
      `);

    case 'fab1_stacked_yield_multiply':
      return wrap(`
        <rect x="6" y="6" width="308" height="106" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="18" y="18" width="118" height="20" rx="3" fill="#0ea5e9"/>
        <text x="77" y="31" text-anchor="middle" font-size="7.2" fill="#fff" font-weight="700">画素ウェーハ (約81%)</text>
        <text x="77" y="49" text-anchor="middle" font-size="8" fill="#dc2626" font-weight="700">× 貼り合わせ＆ボイド ×</text>
        <rect x="18" y="55" width="118" height="20" rx="3" fill="#1e3a8a"/>
        <text x="77" y="68" text-anchor="middle" font-size="7.2" fill="#fde047" font-weight="700">ロジックウェーハ (約81%)</text>
        <rect x="18" y="81" width="118" height="20" rx="3" fill="#fee2e2" stroke="#dc2626"/>
        <text x="77" y="94" text-anchor="middle" font-size="7" fill="#991b1b" font-weight="700">片側不良→ペア丸ごと廃棄!</text>
        <rect x="148" y="16" width="158" height="86" rx="6" fill="#fff7ed" stroke="#ea580c"/>
        <text x="156" y="32" font-size="7.6" fill="#9a3412" font-weight="700">積層歩留まりの掛け算の罠</text>
        <text x="156" y="47" font-size="6.8" fill="#334155">Y_total = Y_px × Y_logic × Y_bond</text>
        <text x="156" y="61" font-size="6.8" fill="#334155">→ 0.81 × 0.81 × 0.92 ≈ 60%</text>
        <text x="156" y="75" font-size="6.8" fill="#1d4ed8" font-weight="700">だから「部分積層」が大ブーム!</text>
        <text x="156" y="90" font-size="6.5" fill="#9a3412">次巻：第2巻 砂からウェーハへ →</text>
      `);

    default:
      return null;
  }
}
