import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 36 Part B — Full-Width 320x118 Scientific Cutaway Schematics (MC131–MC150).
 */
export function renderPhase36MicUltraSchematicSvgB(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'mc_c0g_antimicrophonic_coupling_cap':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#d4a373" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fde68a">MC131 ノンマイクロフォニック C0G/NP0 ＆ 金属脚防振ACカップリング対</text>
        <rect x="18" y="26" width="134" height="62" rx="4" fill="#1e293b" stroke="#ef4444"/>
        <text x="85" y="39" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fca5a5">通常 X7R (圧電あり)</text>
        <path d="M28 62 L52 62 L62 46 L72 78 L82 48 L92 74 L102 62 L142 62" fill="none" stroke="#ef4444" stroke-width="1.6"/>
        <text x="85" y="82" text-anchor="middle" font-size="4.8" fill="#fecaca">シャッター振動 → 500 μV偽雑音!</text>
        <rect x="164" y="26" width="140" height="62" rx="4" fill="#052e16" stroke="#34d399"/>
        <text x="234" y="39" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#86efac">C0G/NP0 ＋ 浮かせ金属脚</text>
        <rect x="196" y="46" width="76" height="16" rx="2" fill="#d4a373" stroke="#e2e8f0"/>
        <path d="M196 54 L188 54 L188 70 L198 70 M272 54 L280 54 L280 70 L270 70" fill="none" stroke="#cbd5e1" stroke-width="2"/>
        <text x="234" y="82" text-anchor="middle" font-size="4.8" fill="#a7f3d0">圧電ゼロ・THD &lt; -120 dB</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">常誘電体C0Gと金属Jリード浮かせ脚で、シャッター衝撃が音に化ける現象を根絶</text>
      `);

    case 'mc_thinfilm_005pct_gain_network':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#082f49" stroke="#0ea5e9" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#7dd3fc">MC132 Susumu RG ±0.05% / ±5 ppm/°C NiCr金属薄膜プリアンプ抵抗網</text>
        <rect x="18" y="26" width="140" height="62" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <path d="M28 56 L42 56 L42 38 L58 38 L58 72 L74 72 L74 38 L90 38 L90 72 L106 72 L106 38 L122 38 L122 56 L146 56" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
        <path d="M82 78 L82 62 L98 62" fill="none" stroke="#facc15" stroke-width="1.4"/>
        <text x="88" y="84" text-anchor="middle" font-size="4.7" fill="#fde047">レーザーLカット 0.05%トリム</text>
        <rect x="168" y="26" width="136" height="62" rx="4" fill="#0f172a" stroke="#facc15"/>
        <text x="236" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fef08a">厚膜比 30 dB以上の静粛性</text>
        <text x="236" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・過剰電流雑音 CNI &lt; -40 dB</text>
        <text x="236" y="67" text-anchor="middle" font-size="4.9" fill="#34d399">・差動整合 → CMRR &gt; 80 dB</text>
        <text x="236" y="79" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・等温銅橋で熱ドリフト±5ppm</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">ナノ均質なNiCr金属薄膜を0.05%精度で揃え、+60 dB増幅でも澄み渡る無雑音を実現</text>
      `);

    case 'mc_capless_hp_chargepump_rail':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#93c5fd">MC133 AK4954A/4951 反転チャージポンプ負電源(-AVDD) ＆ キャップレスHPアンプ</text>
        <rect x="18" y="28" width="68" height="56" rx="4" fill="#1e3a8a" stroke="#60a5fa"/>
        <text x="52" y="49" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#dbeafe">+1.8 V</text>
        <text x="52" y="62" text-anchor="middle" font-size="4.8" fill="#fef08a">CFLY 2.2μF</text>
        <text x="52" y="74" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#38bdf8">→ −1.8 V</text>
        <line x1="86" y1="56" x2="112" y2="56" stroke="#facc15" stroke-width="2"/>
        <rect x="112" y="28" width="192" height="56" rx="4" fill="#020617" stroke="#34d399"/>
        <line x1="122" y1="56" x2="294" y2="56" stroke="#64748b" stroke-dasharray="3 2"/>
        <path d="M126 56 Q146 32 166 56 T206 56 T246 56 T286 56" fill="none" stroke="#34d399" stroke-width="2"/>
        <text x="208" y="40" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#6ee7b7">真の 0 V 中心出力 (Capless!)</text>
        <text x="208" y="78" text-anchor="middle" font-size="4.8" fill="#cbd5e1">220μF電解不要・10 Hz重低音フラット</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">2.2 μFコンデンサで負電源を自家発電し、巨大DCカットコンデンサ無しで低音再生</text>
      `);

    case 'mc_vcom_vref_bandgap_bypass':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#eab308" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fef08a">MC134 超低雑音 VREF / VCOM 1.25 V バンドギャップ基準 ＆ 10 μFバイパス</text>
        <rect x="18" y="28" width="90" height="58" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.6"/>
        <text x="63" y="48" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fde047">Bandgap VREF</text>
        <text x="63" y="61" text-anchor="middle" font-size="5.0" fill="#e2e8f0">1.250 V 基準</text>
        <text x="63" y="74" text-anchor="middle" font-size="4.6" fill="#38bdf8">&lt; 10 nV/√Hz</text>
        <rect x="122" y="34" width="54" height="46" rx="3" fill="#ca8a04" stroke="#fef08a"/>
        <text x="149" y="54" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#0f172a">10 μF</text>
        <text x="149" y="66" text-anchor="middle" font-size="4.6" fill="#0f172a">ポリマー</text>
        <rect x="188" y="28" width="116" height="58" rx="4" fill="#052e16" stroke="#34d399"/>
        <text x="246" y="44" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#6ee7b7">24/32-bit ADC モノサシ</text>
        <text x="246" y="58" text-anchor="middle" font-size="4.8" fill="#dcfce7">D_out = (V_mic/VREF)·2²⁴</text>
        <text x="246" y="72" text-anchor="middle" font-size="4.8" fill="#fde047">金ケルビンガード環で完全保護</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">ADC変換の絶対基準となるVREFを10 μF低ESRタンクと金ガードで岩のように安定化</text>
      `);

    case 'mc_avdd_dvdd_ferrite_powertree':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#ddd6fe">MC135 4系統オーディオ電源分離ツリー (AVDD / DVDD / CPVDD / MICBIAS)</text>
        ${[
          ['AVDD (アナログΔΣ)', '#ef4444', 27],
          ['MICBIAS (2.8 V静寂)', '#22c55e', 43],
          ['CPVDD (負電源昇圧)', '#eab308', 59],
          ['DVDD (デジタルI²S)', '#38bdf8', 75],
        ]
          .map(
            ([lbl, col, y]) => `
            <rect x="16" y="${y}" width="88" height="13" rx="2" fill="#1e293b" stroke="${col}"/>
            <text x="60" y="${Number(y) + 9}" text-anchor="middle" font-size="4.8" fill="${col}">${lbl}</text>
            <rect x="114" y="${y}" width="54" height="13" rx="2" fill="#475569"/>
            <text x="141" y="${Number(y) + 9}" text-anchor="middle" font-size="4.6" fill="#f8fafc">FB 600Ω</text>
            <rect x="176" y="${y}" width="52" height="13" rx="2" fill="#854d0e"/>
            <text x="202" y="${Number(y) + 9}" text-anchor="middle" font-size="4.6" fill="#fef08a">10μF+0.1μF</text>
            <line x1="104" y1="${Number(y) + 6}" x2="114" y2="${Number(y) + 6}" stroke="${col}"/>
            <line x1="168" y1="${Number(y) + 6}" x2="176" y2="${Number(y) + 6}" stroke="${col}"/>
          `
          )
          .join('')}
        <rect x="236" y="27" width="68" height="61" rx="4" fill="#1e1b4b" stroke="#a78bfa"/>
        <text x="270" y="49" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#e9d5ff">PSRR</text>
        <text x="270" y="62" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#34d399">&gt;120 dB</text>
        <text x="270" y="75" text-anchor="middle" font-size="4.6" fill="#cbd5e1">分離堀＋一点接地</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">4系統をフェライトπ防波堤で完全分離し、デジタル電流のアナログ逆流を遮断</text>
      `);

    case 'mc_c7701_audio_emi_shield_can':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#f8fafc">MC136 SY-1122 2ピース C7701洋白 (CuNi18Zn20) 着脱式EMIシールド缶</text>
        <rect x="22" y="28" width="132" height="12" rx="3" fill="#cbd5e1" stroke="#38bdf8"/>
        <text x="88" y="36" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0f172a">着脱スナップ上蓋 (0.2 mm)</text>
        <path d="M26 44 L26 82 L150 82 L150 44" fill="none" stroke="#94a3b8" stroke-width="4"/>
        <rect x="52" y="56" width="72" height="20" rx="2" fill="#1e293b" stroke="#facc15"/>
        <text x="88" y="68" text-anchor="middle" font-size="5.0" fill="#fef08a">オーディオコーデック島</text>
        <rect x="168" y="26" width="136" height="62" rx="4" fill="#1e293b" stroke="#94a3b8"/>
        <text x="236" y="41" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#f1f5f9">洋白C7701 銀色ファラデー要塞</text>
        <text x="236" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・無めっき高はんだ濡れ・耐食性</text>
        <text x="236" y="67" text-anchor="middle" font-size="4.9" fill="#34d399">・2.4/5 GHz Wi-Fi &gt; 60 dB遮断</text>
        <text x="236" y="79" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・修理時フタのみ着脱点検可能</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">フレームを360°ハンダ固定し上蓋をパチンと嵌める2ピース構造でGHz電波を封殺</text>
      `);

    case 'mc_i2s_33ohm_series_termination':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#14b8a6" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#99f6e4">MC137 I²S / TDM8 バス 33 Ω ソース直列ダンピング抵抗アレイ (MCLK/BCLK)</text>
        <rect x="16" y="28" width="52" height="58" rx="3" fill="#1e293b" stroke="#38bdf8"/>
        <text x="42" y="55" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#bae6fd">CODEC</text>
        <text x="42" y="67" text-anchor="middle" font-size="4.6" fill="#94a3b8">R_out~17Ω</text>
        ${[36, 50, 64, 78]
          .map(
            (y, idx) => `
            <line x1="68" y1="${y}" x2="92" y2="${y}" stroke="#facc15" stroke-width="1.6"/>
            <rect x="92" y="${y - 4}" width="32" height="8" rx="1" fill="#0f766e" stroke="#5eead4"/>
            <text x="108" y="${y + 2}" text-anchor="middle" font-size="4.5" fill="#fff">33Ω</text>
            <line x1="124" y1="${y}" x2="188" y2="${y}" stroke="#2dd4bf" stroke-width="1.6"/>
            <text x="156" y="${y - 2}" text-anchor="middle" font-size="4.4" fill="#cbd5e1">${['MCLK 24.5M', 'BCLK', 'LRCLK', 'SDOUT'][idx]}</text>
          `
          )
          .join('')}
        <rect x="192" y="28" width="112" height="58" rx="4" fill="#042f2e" stroke="#2dd4bf"/>
        <text x="248" y="44" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#5eead4">Z₀ = 50 Ω 完全整合</text>
        <text x="248" y="58" text-anchor="middle" font-size="4.9" fill="#ccfbf1">17Ω + 33Ω = 50Ω</text>
        <text x="248" y="72" text-anchor="middle" font-size="4.8" fill="#fde047">リンギング反射＆EMI 15dB減</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">出口直後の33 Ω直列抵抗で高速クロックの跳ね返りと電波放射をピタリと鎮める</text>
      `);

    case 'mc_dlw21_jack_cm_choke':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#1c1208" stroke="#ea580c" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fed7aa">MC138 3.5 mm端子直結 Murata DLW21 巻線コモンモードRFチョーク (180 Ω)</text>
        <rect x="16" y="28" width="144" height="58" rx="4" fill="#0f172a" stroke="#f97316"/>
        <rect x="44" y="42" width="88" height="30" rx="4" fill="#44403c" stroke="#fdba74"/>
        <path d="M54 42 L54 72 M68 42 L68 72 M82 42 L82 72 M96 42 L96 72 M110 42 L110 72 M122 42 L122 72" stroke="#f59e0b" stroke-width="2.4"/>
        <text x="88" y="38" text-anchor="middle" font-size="4.8" fill="#34d399">差動音声 (→←): 磁束打消で素通し</text>
        <text x="88" y="82" text-anchor="middle" font-size="4.8" fill="#fca5a5">同相RF電波 (→→): 180Ω壁で遮断!</text>
        <rect x="170" y="28" width="134" height="58" rx="4" fill="#0f172a" stroke="#fb923c"/>
        <text x="237" y="43" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fdba74">外部ケーブル・アンテナ対策</text>
        <text x="237" y="57" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・DLW21HN181 (2.0×1.2mm)</text>
        <text x="237" y="69" text-anchor="middle" font-size="4.9" fill="#34d399">・DCR ≤ 0.38 Ω 音質劣化ゼロ</text>
        <text x="237" y="80" text-anchor="middle" font-size="4.9" fill="#fde047">・LTE/5G/GSM 217Hz撃退</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">1.5 mピンマイクケーブルが拾うスマホ電波だけを双子フェライト巻線で門前払い</text>
      `);

    case 'mc_mic_line_attenuator_cmos_mux':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#f43f5e" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fda4af">MC139 ハードウェア 0/-10/-20 dB Uパッド減衰 ＆ MIC/LINE CMOSスイッチ網</text>
        <rect x="16" y="28" width="84" height="58" rx="4" fill="#1e293b" stroke="#fb7185"/>
        <text x="58" y="44" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fecdd3">入力ソース</text>
        <text x="58" y="58" text-anchor="middle" font-size="4.8" fill="#7dd3fc">MIC: -50dBV / 2.2kΩ</text>
        <text x="58" y="72" text-anchor="middle" font-size="4.8" fill="#fde047">LINE: +4dBu / 47kΩ</text>
        <rect x="112" y="28" width="90" height="58" rx="4" fill="#3b0764" stroke="#f43f5e"/>
        <text x="157" y="44" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#f9a8d4">Uパッド減衰網</text>
        <text x="157" y="58" text-anchor="middle" font-size="5.0" fill="#fff">0 / -10 / -20 dB</text>
        <text x="157" y="72" text-anchor="middle" font-size="4.7" fill="#fde047">CMOS Ron &lt; 2 Ω</text>
        <rect x="212" y="28" width="92" height="58" rx="4" fill="#052e16" stroke="#34d399"/>
        <text x="258" y="46" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#6ee7b7">初段クリップ0</text>
        <text x="258" y="61" text-anchor="middle" font-size="4.8" fill="#dcfce7">THD &lt; -110 dB</text>
        <text x="258" y="74" text-anchor="middle" font-size="4.7" fill="#a7f3d0">LINE時PIP自動遮断</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">大音量のミキサー出力や爆音ライブもアンプ手前の精密抵抗パッドで安全減速</text>
      `);

    case 'mc_05db_r2r_volume_headphone_stage':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#052e16" stroke="#22c55e" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#86efac">MC140 0.5 dBステップ R-2R抵抗ラダー音量 ＆ Class-G適応電源HP出力段</text>
        <rect x="16" y="27" width="142" height="60" rx="4" fill="#0f172a" stroke="#22c55e"/>
        ${Array.from({ length: 8 }, (_, i) => {
          const x = 24 + i * 16;
          const h = 10 + i * 5;
          return `<rect x="${x}" y="${78 - h}" width="11" height="${h}" rx="1" fill="${i === 5 ? '#facc15' : '#22c55e'}"/>`;
        }).join('')}
        <text x="87" y="38" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#fde047">0.5 dB ゼロクロス切替階段</text>
        <rect x="168" y="27" width="136" height="60" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <text x="236" y="42" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#7dd3fc">Class-G 適応両電源アンプ</text>
        <text x="236" y="56" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・小音量 ±0.9V / ピーク ±1.8V</text>
        <text x="236" y="68" text-anchor="middle" font-size="4.9" fill="#34d399">・ジッパー雑音ゼロ＆50%省電力</text>
        <text x="236" y="80" text-anchor="middle" font-size="4.9" fill="#fde047">・THD+N &lt; 0.01% (32 Ω負荷)</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">波形が0 Vを通る瞬間だけ0.5 dBずつ切り替え、無雑音＆省電力モニターを両立</text>
      `);

    case 'mc_ecmm1_4cap_diamond_array':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#7dd3fc">MC141 Sony ECM-M1 4カプセル・ダイヤモンド配列 ＆ 8指向性ビーム合成</text>
        <rect x="18" y="26" width="128" height="62" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <polygon points="82,34 114,57 82,80 50,57" fill="none" stroke="#facc15" stroke-width="1.5"/>
        <circle cx="82" cy="34" r="7" fill="#38bdf8"/><text x="82" y="36" text-anchor="middle" font-size="4.6" fill="#020617">前</text>
        <circle cx="82" cy="80" r="7" fill="#a78bfa"/><text x="82" y="82" text-anchor="middle" font-size="4.6" fill="#020617">後</text>
        <circle cx="50" cy="57" r="7" fill="#34d399"/><text x="50" y="59" text-anchor="middle" font-size="4.6" fill="#020617">左</text>
        <circle cx="114" cy="57" r="7" fill="#f472b6"/><text x="114" y="59" text-anchor="middle" font-size="4.6" fill="#020617">右</text>
        <rect x="156" y="26" width="148" height="62" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <text x="230" y="40" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fef08a">全長 64.4 mm / 65 g で8役!</text>
        <text x="230" y="54" text-anchor="middle" font-size="4.8" fill="#e2e8f0">超鋭・単一・全指向・後方・前後</text>
        <text x="230" y="66" text-anchor="middle" font-size="4.8" fill="#7dd3fc">前後分離・ステレオ・ウルトラ鋭</text>
        <text x="230" y="79" text-anchor="middle" font-size="4.8" fill="#34d399">固有雑音 ≤ 14 dB / DR ≥ 106 dB</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">前後左右ひし形4カプセルの時間差合成により、1台で8種類の指向性を自在に生成</text>
      `);

    case 'mc_ecmm1_8mode_dial_switches':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#f43f5e" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fda4af">MC142 Sony ECM-M1 ロック付8モードダイヤル ＆ ATT / NC・LC 背面操作盤</text>
        <circle cx="76" cy="57" r="26" fill="#1e293b" stroke="#94a3b8" stroke-width="1.8"/>
        <circle cx="76" cy="57" r="10" fill="#475569" stroke="#f8fafc"/>
        <text x="76" y="59" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fff">LOCK</text>
        ${Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return `<circle cx="${(76 + Math.cos(a) * 19).toFixed(1)}" cy="${(57 + Math.sin(a) * 19).toFixed(1)}" r="2.6" fill="#38bdf8"/>`;
        }).join('')}
        <rect x="122" y="26" width="182" height="62" rx="4" fill="#1e293b" stroke="#fb7185"/>
        <text x="213" y="40" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fef08a">防滴ハードウェア即応スイッチ群</text>
        <text x="213" y="54" text-anchor="middle" font-size="4.9" fill="#fca5a5">・ATT: 0 dB / 10 dB / 20 dB</text>
        <text x="213" y="66" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・FILTER: NC (雑音除去) / LC (低域) / OFF</text>
        <text x="213" y="79" text-anchor="middle" font-size="4.9" fill="#34d399">・INTERFACE: DIGITAL / ANALOG 切替</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">中央ロック付ダイヤルと3連防滴スイッチで、メニューを開かず現場で即設定変更</text>
      `);

    case 'mc_ecmm1_shock_suspension_cradle':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#e2e8f0">MC143 Sony ECM-M1 / ECM-B1M 内蔵2軸シリコーン防振サスペンション機構</text>
        <rect x="34" y="26" width="108" height="14" rx="3" fill="#334155" stroke="#38bdf8"/>
        <text x="88" y="35" text-anchor="middle" font-size="5.0" fill="#e0f2fe">浮遊カプセルヘッド部</text>
        <line x1="48" y1="40" x2="40" y2="72" stroke="#f59e0b" stroke-width="4"/>
        <line x1="128" y1="40" x2="136" y2="72" stroke="#f59e0b" stroke-width="4"/>
        <path d="M88 40 C74 50, 102 62, 88 72" fill="none" stroke="#facc15" stroke-width="1.8"/>
        <rect x="28" y="72" width="120" height="14" rx="3" fill="#94a3b8"/>
        <text x="88" y="81" text-anchor="middle" font-size="5.0" font-weight="bold" fill="#0f172a">MIシュー固定ベース</text>
        <rect x="164" y="26" width="140" height="62" rx="4" fill="#1e293b" stroke="#f59e0b"/>
        <text x="234" y="41" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fde047">ケーブルレス＋内蔵浮遊防振</text>
        <text x="234" y="55" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・Shore 35A 4軸シリコーン脚</text>
        <text x="234" y="67" text-anchor="middle" font-size="4.9" fill="#34d399">・無張力S字FPCで振動伝達0</text>
        <text x="234" y="79" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・AF/ズーム駆動ランブル遮断</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">首の内部に4本の柔らかシリコーン脚とたるみFPCを隠し、カメラ振動を大幅吸収</text>
      `);

    case 'mc_xlrk3m_phantom48v_681k_pair':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#1c1205" stroke="#f59e0b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fde68a">MC144 Sony XLR-K3M / A4 IEC 61938 +48 V昇圧 ＆ 6.81 kΩ ±0.1%整合抵抗対</text>
        <rect x="16" y="28" width="66" height="58" rx="4" fill="#451a03" stroke="#f59e0b"/>
        <text x="49" y="49" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fef08a">MI 5 V</text>
        <text x="49" y="63" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#ef4444">→ +48 V</text>
        <text x="49" y="76" text-anchor="middle" font-size="4.5" fill="#fde68a">絶縁DC-DC</text>
        <rect x="94" y="30" width="96" height="22" rx="3" fill="#0f172a" stroke="#38bdf8"/>
        <text x="142" y="44" text-anchor="middle" font-size="5.0" fill="#7dd3fc">Pin2 HOT: 6.81kΩ ±0.1%</text>
        <rect x="94" y="62" width="96" height="22" rx="3" fill="#0f172a" stroke="#38bdf8"/>
        <text x="142" y="76" text-anchor="middle" font-size="5.0" fill="#7dd3fc">Pin3 COLD: 6.81kΩ ±0.1%</text>
        <rect x="202" y="28" width="102" height="58" rx="4" fill="#111827" stroke="#ef4444"/>
        <text x="253" y="44" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fca5a5">IEC 61938 P48</text>
        <text x="253" y="58" text-anchor="middle" font-size="4.8" fill="#e2e8f0">短絡上限 14.1 mA</text>
        <text x="253" y="71" text-anchor="middle" font-size="4.8" fill="#34d399">3ピンロックXLR/TRS</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">0.1%精度の6.81 kΩ双子抵抗で+48 Vを平衡供給し、プロ用コンデンサーマイクを電池レス駆動</text>
      `);

    case 'mc_xlra4_2026_32bit_96k_bridge':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#082f49" stroke="#0284c7" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#bae6fd">MC145 2026 Sony XLR-A4 4ch 32-bit Float / 96 kHz デュアルADC MIアダプター</text>
        <rect x="16" y="28" width="84" height="26" rx="3" fill="#0f172a" stroke="#22c55e"/>
        <text x="58" y="43" text-anchor="middle" font-size="5.0" fill="#86efac">High-Gain ADC (小声)</text>
        <rect x="16" y="60" width="84" height="26" rx="3" fill="#0f172a" stroke="#f59e0b"/>
        <text x="58" y="75" text-anchor="middle" font-size="5.0" fill="#fde047">Low-Gain ADC (爆音)</text>
        <rect x="114" y="34" width="76" height="46" rx="4" fill="#1e3a8a" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="152" y="53" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">32-bit Float</text>
        <text x="152" y="67" text-anchor="middle" font-size="5.0" fill="#7dd3fc">96 kHz 4ch</text>
        <rect x="202" y="28" width="102" height="58" rx="4" fill="#0f172a" stroke="#34d399"/>
        <text x="253" y="43" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#6ee7b7">α7 V世代フラッグシップ</text>
        <text x="253" y="57" text-anchor="middle" font-size="4.8" fill="#e2e8f0">・音割れゼロ (136 dB DR)</text>
        <text x="253" y="69" text-anchor="middle" font-size="4.8" fill="#fde047">・60cm延長＋USB-C直結</text>
        <text x="253" y="80" text-anchor="middle" font-size="4.8" fill="#cbd5e1">・低重心198 gリグ対応</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">デュアルADCの32-bit浮動小数点×96 kHzハイレゾをMIシュー経由で4chダイレクト収録</text>
      `);

    case 'mc_ecmw3_bt53_lc3plus_rf':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#c7d2fe">MC146 Sony ECM-W3 Bluetooth 5.3 LC3plus 無線RF・チップアンテナ＆SAW</text>
        <rect x="16" y="28" width="70" height="58" rx="4" fill="#0f172a" stroke="#818cf8"/>
        <text x="51" y="46" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#a5b4fc">TX × 2 (17g)</text>
        <text x="51" y="59" text-anchor="middle" font-size="4.8" fill="#e2e8f0">高SNR MEMS</text>
        <text x="51" y="72" text-anchor="middle" font-size="4.7" fill="#34d399">最大 150 m</text>
        <path d="M90 57 Q108 42 126 57 T162 57" fill="none" stroke="#38bdf8" stroke-width="2"/>
        <text x="126" y="42" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fde047">BT 5.3 LC3plus</text>
        <rect x="166" y="28" width="138" height="58" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <text x="235" y="42" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#7dd3fc">MI直結レシーバー (25 g)</text>
        <text x="235" y="55" text-anchor="middle" font-size="4.8" fill="#e2e8f0">・2.4GHz積層セラミックアンテナ</text>
        <text x="235" y="67" text-anchor="middle" font-size="4.8" fill="#fde047">・圧電SAWフィルタで混信 &gt;35dB減</text>
        <text x="235" y="79" text-anchor="middle" font-size="4.8" fill="#34d399">・MIシュー劣化ゼロ直結＋USB-C</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">150 m先から低遅延LC3plusデジタル無線で受信し、SAWフィルタ経由でMIシュー直結</text>
      `);

    case 'mc_hdmi_acr_n6144_lpcm_tx':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#082f49" stroke="#0ea5e9" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#bae6fd">MC147 フルサイズHDMI Type-A 4ch LPCM ＆ ACR (N=6144 / CTS) 同期エンジン</text>
        <rect x="16" y="28" width="136" height="58" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <rect x="24" y="36" width="52" height="22" rx="2" fill="#1e40af"/><text x="50" y="49" text-anchor="middle" font-size="4.8" fill="#fff">4K60映像</text>
        <rect x="80" y="36" width="64" height="22" rx="2" fill="#0f766e"/><text x="112" y="49" text-anchor="middle" font-size="4.8" fill="#fff">Data Island 4ch</text>
        <rect x="24" y="62" width="120" height="18" rx="2" fill="#854d0e"/><text x="84" y="73" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#fef08a">ACR: N=6144 / CTS=148500</text>
        <rect x="164" y="28" width="140" height="58" rx="4" fill="#0f172a" stroke="#22c55e"/>
        <text x="234" y="43" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#86efac">1サンプルもズレないHDMI音声</text>
        <text x="234" y="57" text-anchor="middle" font-size="4.8" fill="#e2e8f0">128·fs = f_TMDS · (N / CTS)</text>
        <text x="234" y="70" text-anchor="middle" font-size="4.8" fill="#7dd3fc">24-bit/48 kHz 4ch LPCM出力</text>
        <text x="234" y="81" text-anchor="middle" font-size="4.7" fill="#cbd5e1">外部Atomos等と完全リップシンク</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">映像ブランキング期間に4ch音声とN/CTS時計補正値を埋め込み外部収録と完全同期</text>
      `);

    case 'mc_uac2_usb_c_async_bridge':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#052e16" stroke="#10b981" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#6ee7b7">MC148 USB-C UAC 2.0 非同期アイソクロナス配信 ＆ 明示的フィードバック</text>
        <rect x="16" y="28" width="96" height="58" rx="4" fill="#0f172a" stroke="#34d399"/>
        <text x="64" y="45" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#6ee7b7">カメラ高精度水晶</text>
        <text x="64" y="58" text-anchor="middle" font-size="4.8" fill="#fde047">24.576 MHz 主導</text>
        <text x="64" y="72" text-anchor="middle" font-size="4.7" fill="#e2e8f0">48 kHz LPCM配信</text>
        <path d="M114 44 L176 44" stroke="#38bdf8" stroke-width="2"/><text x="145" y="40" text-anchor="middle" font-size="4.6" fill="#7dd3fc">音声Isoch →</text>
        <path d="M176 68 L114 68" stroke="#facc15" stroke-width="2" stroke-dasharray="3 2"/><text x="145" y="80" text-anchor="middle" font-size="4.6" fill="#fde047">← Rate FB制御</text>
        <rect x="180" y="28" width="124" height="58" rx="4" fill="#0f172a" stroke="#38bdf8"/>
        <text x="242" y="44" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#bae6fd">PC / ライブ配信ホスト</text>
        <text x="242" y="58" text-anchor="middle" font-size="4.8" fill="#e2e8f0">・キャプチャーボード不要</text>
        <text x="242" y="70" text-anchor="middle" font-size="4.8" fill="#34d399">・本体同時録画＋USB PD対応</text>
        <text x="242" y="81" text-anchor="middle" font-size="4.7" fill="#fde047">・PC時計ジッター完全遮断</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">カメラ側の高精度水晶を主役に非同期フィードバック制御し、USB-C 1本で途切れゼロ配信</text>
      `);

    case 'mc_xavc_audio_dma_ringbuffer':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#1c1205" stroke="#f59e0b" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fde68a">MC149 XAVC-S/HS ハードウェア音声エンコーダー ＆ 無欠損DMAリングバッファ</text>
        <circle cx="80" cy="57" r="24" fill="none" stroke="#facc15" stroke-width="8" stroke-dasharray="16 3"/>
        <circle cx="80" cy="57" r="14" fill="#0f172a" stroke="#38bdf8"/>
        <text x="80" y="56" text-anchor="middle" font-size="4.8" font-weight="bold" fill="#7dd3fc">DMA</text>
        <text x="80" y="64" text-anchor="middle" font-size="4.4" fill="#fef08a">FIFO環</text>
        <rect x="132" y="28" width="172" height="58" rx="4" fill="#0f172a" stroke="#f59e0b"/>
        <text x="218" y="42" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fde047">ピンポンSDRAM貯水池 → XAVC多重化</text>
        <text x="218" y="56" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・LPCM 4ch 24-bit/48kHz &amp; AAC-LC</text>
        <text x="218" y="68" text-anchor="middle" font-size="4.9" fill="#34d399">・カード書込詰まり(GC)時も音欠け0</text>
        <text x="218" y="80" text-anchor="middle" font-size="4.9" fill="#7dd3fc">・Slot1 CFexpress + Slot2 SD同時記録</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">円形DMAバッファが600 Mbps 4K動画書込スパイクを吸収し、MP4へ無欠損インターリーブ</text>
      `);

    case 'mc_shutter_click_transient_inpainter':
      return wrapSvg(`
        <rect x="6" y="4" width="308" height="94" rx="6" fill="#1f0a1d" stroke="#ec4899" stroke-width="1.2"/>
        <text x="16" y="17" font-size="7.0" font-weight="bold" fill="#fbcfe8">MC150 シャッター幕・絞りトリガー同期 衝撃クリックゲート ＆ AI波形補間</text>
        <rect x="16" y="27" width="144" height="60" rx="4" fill="#0f172a" stroke="#f43f5e"/>
        <path d="M24 58 Q40 42 56 58 T82 58" fill="none" stroke="#34d399" stroke-width="1.8"/>
        <path d="M82 58 L88 30 L94 82 L100 34 L106 58" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="2 2"/>
        <path d="M82 58 Q94 46 106 58" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
        <path d="M106 58 Q122 72 138 58 T154 58" fill="none" stroke="#34d399" stroke-width="1.8"/>
        <text x="94" y="83" text-anchor="middle" font-size="4.6" fill="#7dd3fc">&lt;15ms AI波形描き直し</text>
        <rect x="170" y="27" width="134" height="60" rx="4" fill="#0f172a" stroke="#ec4899"/>
        <text x="237" y="42" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#f9a8d4">AFE-3360 HW同期トリガー</text>
        <text x="237" y="56" text-anchor="middle" font-size="4.9" fill="#e2e8f0">・幕＆絞り駆動をμs先読み</text>
        <text x="237" y="68" text-anchor="middle" font-size="4.9" fill="#34d399">・人の破裂音(p/t/k)誤消去0</text>
        <text x="237" y="80" text-anchor="middle" font-size="4.9" fill="#fde047">・無音穴あきゼロの自然修復</text>
        <text x="160" y="111" text-anchor="middle" font-size="6.3" fill="#1e293b">カメラ本体の駆動合図で衝撃15 msだけを外科的消去し、前後の声からAIで滑らか補間</text>
      `);

    default:
      return null;
  }
}
