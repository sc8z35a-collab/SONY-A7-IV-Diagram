import { PartExplanation } from '../assemblies/types';
import { comparePill, renderBionzDiagram, stepBadge } from './bionzSchematicsShared';

/**
 * Phase 33 High-Precision 560x400 Beginner-Friendly Japanese Technical Schematic SVGs (24/24 unique: XR47–XR70).
 * Every single newly added BIONZ XR / XR2 deep-package & SY-1122 companion part has its own bespoke vector diagram.
 */
export function renderBionzExtraSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'xr_die_io_esd_ring':
      return renderBionzDiagram({
        code: 'xr47',
        badge: 'XR47',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        accentDark: '#92400e',
        title: 'ダイ外周 ESD静電気クランプ保護リング',
        metric: 'HBM ±2kV / <1ns',
        analogyLine1: '冬のドアノブ静電気（数千V）がチップ内部へ飛び込む直前に、',
        analogyLine2: '外周ぐるり一周の「避雷針ダイオード」が10億分の1秒でアースへ逃がす！',
        chipHow: '二重ダイオード＋Big-FET',
        chipBenefit: '静電気破壊ゼロで長期信頼',
        chipSpec: '±2kV / C≤0.15pF',
        art: (p) => `
          <!-- Left: Die perimeter ring schematic -->
          <rect x="34" y="72" width="184" height="184" rx="14" fill="url(#${p}_gold)" stroke="#92400e" stroke-width="2" filter="url(#${p}_shadow)"/>
          <rect x="64" y="102" width="124" height="124" rx="8" fill="url(#${p}_si)" stroke="#38bdf8" stroke-width="2"/>
          <text x="126" y="158" text-anchor="middle" font-size="11.5" font-weight="800" fill="#f8fafc">BIONZ XR</text>
          <text x="126" y="176" text-anchor="middle" font-size="9.5" font-weight="700" fill="#7dd3fc">コア論理回路（安全）</text>
          <text x="126" y="92" text-anchor="middle" font-size="9" font-weight="800" fill="#78350f">360° ESD クランプ保護リング</text>
          <text x="126" y="246" text-anchor="middle" font-size="9" font-weight="800" fill="#78350f">四隅 Big-FET レールクランプ</text>
          ${stepBadge(46, 84, '1', '#dc2626')}

          <!-- Right: ESD surge bypass circuit -->
          <rect x="242" y="68" width="286" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
          <text x="385" y="88" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">静電気サージ（±2,000 V）の瞬間バイパス経路</text>
          <rect x="256" y="138" width="66" height="44" rx="7" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
          <text x="289" y="157" text-anchor="middle" font-size="10" font-weight="800" fill="#991b1b">外部I/O</text>
          <text x="289" y="172" text-anchor="middle" font-size="9" font-weight="700" fill="#dc2626">⚡ +2kV</text>

          <line x1="322" y1="160" x2="368" y2="160" stroke="#dc2626" stroke-width="2.5" marker-end="url(#${p}_arr_red)"/>
          <line x1="368" y1="160" x2="368" y2="112" stroke="#dc2626" stroke-width="2.5" marker-end="url(#${p}_arr_red)"/>
          <line x1="368" y1="112" x2="430" y2="112" stroke="#dc2626" stroke-width="2.5" marker-end="url(#${p}_arr_red)"/>
          <line x1="430" y1="112" x2="430" y2="212" stroke="#dc2626" stroke-width="2.5" marker-end="url(#${p}_arr_red)"/>

          <rect x="348" y="122" width="40" height="24" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
          <text x="368" y="138" text-anchor="middle" font-size="9" font-weight="800" fill="#92400e">D1</text>
          <rect x="348" y="176" width="40" height="24" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.4"/>
          <text x="368" y="192" text-anchor="middle" font-size="9" font-weight="800" fill="#0369a1">D2</text>

          <rect x="404" y="144" width="54" height="36" rx="6" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
          <text x="431" y="160" text-anchor="middle" font-size="9" font-weight="800" fill="#78350f">Big-FET</text>
          <text x="431" y="172" text-anchor="middle" font-size="8.2" font-weight="700" fill="#b45309">&lt;1ns ON</text>

          <line x1="388" y1="160" x2="474" y2="160" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="4 3"/>
          <rect x="474" y="140" width="46" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
          <text x="497" y="158" text-anchor="middle" font-size="9.2" font-weight="800" fill="#166534">コア</text>
          <text x="497" y="171" text-anchor="middle" font-size="8.5" font-weight="700" fill="#15803d">0.75V安全</text>

          <rect x="396" y="216" width="68" height="24" rx="5" fill="#0f172a"/>
          <text x="430" y="232" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fde047">GND へ放電</text>
          ${stepBadge(430, 112, '2', '#d97706')}
          ${stepBadge(497, 134, '3', '#16a34a')}
        `,
      });

    case 'xr_mtcmos_power_gate_ring':
      return renderBionzDiagram({
        code: 'xr48',
        badge: 'XR48',
        accent: '#2563eb',
        accentSoft: '#dbeafe',
        accentDark: '#1e40af',
        title: 'MTCMOS 多電源パワーゲーティング網',
        metric: '待機リーク -96%',
        analogyLine1: '誰もいない部屋のブレーカーを400億分の1秒でパチッと切る節電スイッチ。',
        analogyLine2: '静止画撮影中は動画コーデックの電気を根元から断ち、電池持ちと発熱を改善！',
        chipHow: 'High-Vt pMOS 遮断スイッチ',
        chipBenefit: '待機発熱・電池消費を激減',
        chipSpec: '12+ドメイン / <40ns',
        art: (p) => `
          <!-- Top Power Rail -->
          <rect x="36" y="68" width="488" height="22" rx="6" fill="url(#${p}_cu)"/>
          <text x="280" y="83" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">常時メイン電源レール VDD_CORE（0.75 V）</text>

          <!-- 3 Power Islands -->
          ${[
            { x: 46, name: 'RAW ISP', on: true, status: 'ON（稼働中）', col: '#16a34a', bg: '#dcfce7' },
            { x: 204, name: 'AI NPU', on: true, status: 'ON（瞳認識）', col: '#7c3aed', bg: '#ede9fe' },
            { x: 362, name: 'HEVC動画', on: false, status: 'OFF（完全遮断！）', col: '#64748b', bg: '#f1f5f9' },
          ]
            .map(
              (d, i) => `
            <line x1="${d.x + 76}" y1="90" x2="${d.x + 76}" y2="112" stroke="${d.on ? '#d97706' : '#94a3b8'}" stroke-width="3"/>
            <rect x="${d.x + 28}" y="112" width="96" height="30" rx="6" fill="${d.on ? '#fef3c7' : '#fee2e2'}" stroke="${d.on ? '#d97706' : '#dc2626'}" stroke-width="1.5"/>
            <text x="${d.x + 76}" y="126" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">High-Vt スイッチ</text>
            <text x="${d.x + 76}" y="137" text-anchor="middle" font-size="8.5" font-weight="800" fill="${d.on ? '#15803d' : '#dc2626'}">${d.on ? '● 閉（通電）' : '✕ 開（遮断）'}</text>
            <line x1="${d.x + 76}" y1="142" x2="${d.x + 76}" y2="164" stroke="${d.on ? d.col : '#cbd5e1'}" stroke-width="2.6" ${d.on ? '' : 'stroke-dasharray="4 3"'}/>
            <rect x="${d.x}" y="164" width="152" height="74" rx="9" fill="${d.bg}" stroke="${d.col}" stroke-width="1.8"/>
            <text x="${d.x + 76}" y="190" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">${d.name}</text>
            <text x="${d.x + 76}" y="209" text-anchor="middle" font-size="10" font-weight="800" fill="${d.col}">${d.status}</text>
            <text x="${d.x + 76}" y="226" text-anchor="middle" font-size="8.8" font-weight="600" fill="#475569">${d.on ? '高速 Low-Vt 動作' : 'リーク電流 -96%！'}</text>
            ${stepBadge(d.x + 16, 174, String(i + 1), d.col)}
          `
            )
            .join('')}

          ${comparePill(36, 248, 236, false, '常時通電：使わぬ回路も発熱＆電池消費')}
          ${comparePill(288, 248, 236, true, 'MTCMOS遮断：40ns復帰で極限省電力')}
        `,
      });

    case 'xr_mbist_dummy_si_spacer':
      return renderBionzDiagram({
        code: 'xr49',
        badge: 'XR49',
        accent: '#475569',
        accentSoft: '#e2e8f0',
        accentDark: '#1e293b',
        title: '左翼シリコンダミー放熱 ＆ MBIST検査',
        metric: '反り応力 -45%',
        analogyLine1: '右側のサブチップ（Cetus）と左右対称にシリコンの重りを置く「やじろべえ均衡」構造。',
        analogyLine2: '高温時のパッケージ反りを防ぎ、さらに工場出荷前にSRAM欠陥を全数自動検査！',
        chipHow: '左右対称Si充填＋IJTAG',
        chipBenefit: 'ハンダ割れ防止・長期耐久',
        chipSpec: 'CTE 2.6ppm / March-C+',
        art: (p) => `
          <!-- Symmetric Package Cross-Section -->
          <rect x="44" y="76" width="472" height="24" rx="5" fill="url(#${p}_cu)"/>
          <text x="280" y="92" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">銅ヒートスプレッダ IHS（XR02）— 水平フラットを維持！</text>

          <!-- Left: XR49 Dummy Silicon + MBIST -->
          <rect x="56" y="108" width="96" height="74" rx="6" fill="url(#${p}_si)" stroke="#38bdf8" stroke-width="2.2"/>
          <text x="104" y="136" text-anchor="middle" font-size="10" font-weight="800" fill="#7dd3fc">XR49 左翼</text>
          <text x="104" y="152" text-anchor="middle" font-size="9.2" font-weight="700" fill="#ffffff">ダミーSi + MBIST</text>
          <text x="104" y="168" text-anchor="middle" font-size="8.4" fill="#cbd5e1">CTE 2.6 ppm/K</text>
          ${stepBadge(64, 118, '1', '#0284c7')}

          <!-- Center: Main BIONZ XR Die -->
          <rect x="172" y="108" width="216" height="74" rx="6" fill="url(#${p}_si_blue)" stroke="#0369a1" stroke-width="1.8"/>
          <text x="280" y="142" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">BIONZ XR メインダイ（XR09）</text>
          <text x="280" y="162" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e0f2fe">March-C+ で全SRAM自動診断＆冗長救済</text>

          <!-- Right: XR28 Cetus Chiplet -->
          <rect x="408" y="108" width="96" height="74" rx="6" fill="url(#${p}_violet)" stroke="#6d28d9" stroke-width="1.8"/>
          <text x="456" y="136" text-anchor="middle" font-size="10" font-weight="800" fill="#ede9fe">XR28 右翼</text>
          <text x="456" y="152" text-anchor="middle" font-size="9.2" font-weight="700" fill="#ffffff">Cetus チップレット</text>
          <text x="456" y="168" text-anchor="middle" font-size="8.4" fill="#ddd6fe">CTE 2.6 ppm/K</text>
          ${stepBadge(496, 118, '2', '#7c3aed')}

          <!-- Thermal TSV pillars under XR49 -->
          ${[68, 86, 104, 122, 140].map((tx) => `<rect x="${tx - 3}" y="182" width="6" height="16" fill="url(#${p}_cu)"/>`).join('')}

          <!-- ABF Substrate -->
          <rect x="44" y="198" width="472" height="24" rx="5" fill="url(#${p}_pcb)"/>
          <text x="280" y="214" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">ABF ビルドアップ基板（左右の熱膨張バランスが完全対称 → 反りゼロ！）</text>

          ${comparePill(44, 240, 228, false, '片側配置：高温で「への字」反り発生')}
          ${comparePill(288, 240, 228, true, '左右対称ダミーSi：反り45%低減＋放熱')}
        `,
      });

    case 'xr_mg_chassis_tim3_sink':
      return renderBionzDiagram({
        code: 'xr50',
        badge: 'XR50',
        accent: '#64748b',
        accentSoft: '#f1f5f9',
        accentDark: '#334155',
        title: 'マグネシウム骨格 放熱ペデスタル＆TIM3',
        metric: 'AZ91D 72W/m·K',
        analogyLine1: 'チップから逃がした熱を最終的にカメラの「頑丈な金属骨格」全体へ流し込む放熱ダム。',
        analogyLine2: '柔らかい放熱パテ（TIM3）で隙間を埋め、ファン無しボディで長回し4K録画を支える！',
        chipHow: 'AZ91D骨格＋圧縮TIM3パテ',
        chipBenefit: 'ファンレス防塵防滴で長回し',
        chipSpec: '72W/mK + 4.5W/mK',
        art: (p) => `
          <!-- Thermal Stack Bottom to Top -->
          <rect x="74" y="68" width="412" height="44" rx="9" fill="url(#${p}_sus)" stroke="#334155" stroke-width="2" filter="url(#${p}_shadow)"/>
          <text x="280" y="88" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0f172a">XR50: AZ91D マグネシウム合金ダイカスト骨格（熱容量 147 J/K）</text>
          <text x="280" y="103" text-anchor="middle" font-size="9.2" font-weight="700" fill="#1e293b">M1.7真鍮ボス ×4（トルク 0.14 N·m）で均等圧着 → ボディ全体へ自然放熱</text>
          ${stepBadge(92, 84, '4', '#334155')}

          <rect x="132" y="116" width="296" height="24" rx="5" fill="#fbcfe8" stroke="#db2777" stroke-width="1.5"/>
          <text x="280" y="132" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9d174d">圧縮性 TIM3 シリコーン放熱パテ（4.5 W/m·K・±0.25mm公差吸収）</text>
          ${stepBadge(148, 128, '3', '#db2777')}

          <rect x="116" y="144" width="328" height="24" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1.4"/>
          <text x="280" y="160" text-anchor="middle" font-size="9.8" font-weight="800" fill="#f8fafc">XR40: Sony Σ字熱分解グラファイトシート（面内 1,500 W/m·K）</text>
          ${stepBadge(132, 156, '2', '#0f172a')}

          <rect x="150" y="172" width="260" height="28" rx="5" fill="url(#${p}_cu)"/>
          <text x="280" y="190" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">XR02: 無酸素銅 IHS（398 W/m·K）</text>

          <rect x="184" y="206" width="192" height="32" rx="6" fill="url(#${p}_heat)"/>
          <text x="280" y="226" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">BIONZ XR 発熱源（4〜8 W）</text>
          ${stepBadge(200, 222, '1', '#dc2626')}

          <!-- Upward thermal flux arrows -->
          <line x1="56" y1="232" x2="56" y2="78" stroke="#dc2626" stroke-width="3.2" stroke-dasharray="5 3" marker-end="url(#${p}_arr_red)"/>
          <text x="38" y="162" text-anchor="middle" font-size="9.5" font-weight="800" fill="#dc2626" transform="rotate(-90 38 162)">垂直放熱パス</text>
          <line x1="504" y1="232" x2="504" y2="78" stroke="#dc2626" stroke-width="3.2" stroke-dasharray="5 3" marker-end="url(#${p}_arr_red)"/>

          <text x="280" y="264" text-anchor="middle" font-size="10" font-weight="700" fill="#475569">4段の熱リレーでホットスポットをボディ全体へ拡散 → 4K60p連続撮影を安定継続！</text>
        `,
      });

    case 'xr_sy1122_hdi_mainboard':
      return renderBionzDiagram({
        code: 'xr51',
        badge: 'XR51',
        accent: '#15803d',
        accentSoft: '#dcfce7',
        accentDark: '#166534',
        title: 'Sony α7 IV 純正 SY-1122 12層HDI母艦基板',
        metric: '12層 Any-Layer',
        analogyLine1: '厚さわずか1.3mmの緑の板の中に、レーザーで縦穴を掘った「12階建て高速道路網」。',
        analogyLine2: '中央のBIONZ XRからカメラ中の全ICへ、超高速データ信号がぶつからず届く母艦！',
        chipHow: '全層レーザーμビア12層HDI',
        chipBenefit: '小型ボディに超高速バス集約',
        chipSpec: 'SY-1122 / 85-100Ω',
        art: (p) => `
          <!-- Left: 12-Layer Any-Layer HDI Stackup Cross-Section -->
          <rect x="28" y="68" width="234" height="196" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
          <text x="145" y="88" text-anchor="middle" font-size="10.8" font-weight="800" fill="#14532d">12層 Any-Layer HDI 断面構造</text>
          ${Array.from({ length: 12 }, (_, idx) => {
            const y = 98 + idx * 12.2;
            const isGnd = idx === 1 || idx === 4 || idx === 7 || idx === 10;
            return `<rect x="44" y="${y}" width="202" height="7.2" rx="2" fill="${isGnd ? '#d97706' : '#16a34a'}" opacity="${isGnd ? '0.9' : '0.78'}"/>
              <text x="36" y="${y + 6.5}" text-anchor="end" font-size="7.2" font-weight="700" fill="#475569">L${idx + 1}</text>`;
          }).join('')}
          <!-- Stacked laser microvias -->
          <rect x="92" y="98" width="6" height="68" fill="#fde047" stroke="#92400e" stroke-width="0.9"/>
          <rect x="148" y="98" width="6" height="142" fill="#fde047" stroke="#92400e" stroke-width="0.9"/>
          <rect x="202" y="158" width="6" height="82" fill="#fde047" stroke="#92400e" stroke-width="0.9"/>
          <text x="145" y="256" text-anchor="middle" font-size="9" font-weight="800" fill="#166534">φ50μm レーザー充填μビア（任意層直結）</text>

          <!-- Right: SY-1122 Star Topology Hub -->
          <rect x="280" y="68" width="252" height="196" rx="10" fill="url(#${p}_pcb)" stroke="#14532d" stroke-width="1.6"/>
          <text x="406" y="88" text-anchor="middle" font-size="10.5" font-weight="800" fill="#dcfce7">SONY SY-1122（1-009-592-41）</text>
          <rect x="360" y="132" width="92" height="64" rx="8" fill="#0f172a" stroke="#fde047" stroke-width="2"/>
          <text x="406" y="160" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">BIONZ XR</text>
          <text x="406" y="176" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fde047">ENIG BGAランド</text>

          <!-- Peripheral Zone Callouts -->
          <rect x="292" y="102" width="64" height="24" rx="5" fill="#ede9fe"/><text x="324" y="118" text-anchor="middle" font-size="8.5" font-weight="800" fill="#5b21b6">AI / 電源</text>
          <rect x="456" y="102" width="64" height="24" rx="5" fill="#dcfce7"/><text x="488" y="118" text-anchor="middle" font-size="8.5" font-weight="800" fill="#166534">Wi-Fi 6E</text>
          <rect x="292" y="206" width="64" height="24" rx="5" fill="#fef3c7"/><text x="324" y="222" text-anchor="middle" font-size="8.5" font-weight="800" fill="#92400e">IBIS/音声</text>
          <rect x="456" y="206" width="64" height="24" rx="5" fill="#e0f2fe"/><text x="488" y="222" text-anchor="middle" font-size="8.5" font-weight="800" fill="#0369a1">USB/CFx</text>
          <text x="406" y="252" text-anchor="middle" font-size="9" font-weight="700" fill="#bbf7d0">85Ω/90Ω/100Ω 差動インピーダンス厳密整合</text>
        `,
      });

    case 'xr_backside_mlcc_emi_cage':
      return renderBionzDiagram({
        code: 'xr52',
        badge: 'XR52',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        accentDark: '#1e293b',
        title: '裏面BGA直下01005 MLCC ＆ EMIシールド缶',
        metric: '80個 / -58 dB',
        analogyLine1: 'チップの真裏に極小コンデンサを80個敷き詰めて瞬間的に電気を補給し、',
        analogyLine2: 'さらにステンレスの金属フタで裏側からの電波ノイズ漏れを鉄壁封印！',
        chipHow: 'BGA直下ビア＋SUS304蓋',
        chipBenefit: '超高ISOでも基板ノイズゼロ',
        chipSpec: '01005×80 / L≤0.15nH',
        art: (p) => `
          <!-- Cross Section: BIONZ -> SY-1122 -> Backside 01005 MLCC -> SUS304 Shield Can -->
          <rect x="112" y="66" width="336" height="30" rx="6" fill="url(#${p}_si)"/>
          <text x="280" y="85" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">BIONZ XR パッケージ（表側）</text>

          <!-- BGA Balls -->
          ${Array.from({ length: 11 }, (_, i) => `<circle cx="${136 + i * 28.8}" cy="103" r="5" fill="url(#${p}_solder)"/>`).join('')}

          <!-- SY-1122 Board -->
          <rect x="64" y="110" width="432" height="24" rx="5" fill="url(#${p}_pcb)"/>
          <text x="280" y="126" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">SY-1122 12層HDI基板（垂直μビア直結で最短 1.3 mm！）</text>

          <!-- 01005 MLCC array directly underneath -->
          ${Array.from({ length: 8 }, (_, i) => {
            const cx = 136 + i * 38;
            return `<line x1="${cx + 12}" y1="134" x2="${cx + 12}" y2="146" stroke="#eab308" stroke-width="2.2"/>
              <rect x="${cx}" y="146" width="24" height="16" rx="3" fill="#b45309" stroke="#cbd5e1" stroke-width="2"/>`;
          }).join('')}
          <text x="280" y="180" text-anchor="middle" font-size="10" font-weight="800" fill="#92400e">01005 超小型MLCC ×80個（ループL ≤ 0.15 nH で電源リップル即吸収）</text>
          ${stepBadge(120, 154, '1', '#d97706')}

          <!-- SUS304 Stamped EMI Shield Can enclosing bottom -->
          <path d="M 96 134 L 96 226 L 464 226 L 464 134" fill="none" stroke="#475569" stroke-width="8" stroke-linejoin="round"/>
          <path d="M 96 134 L 96 226 L 464 226 L 464 134" fill="none" stroke="#cbd5e1" stroke-width="3.2" stroke-linejoin="round"/>
          ${[160, 208, 256, 304, 352, 400].map((hx) => `<circle cx="${hx}" cy="226" r="3.4" fill="#0f172a"/>`).join('')}
          <text x="280" y="212" text-anchor="middle" font-size="10" font-weight="800" fill="#1e293b">SUS304 背面ファラデーシールド缶（遮蔽 -58 dB・カットオフ換気孔）</text>
          ${stepBadge(478, 218, '2', '#475569')}

          <text x="280" y="258" text-anchor="middle" font-size="9.8" font-weight="700" fill="#166534">表（XR01コンフォーマル膜）＋裏（XR52金属缶）の両面サンドイッチ完全遮蔽！</text>
        `,
      });

    case 'xr_dedicated_ai_coproc':
      return renderBionzDiagram({
        code: 'xr53',
        badge: 'XR53',
        accent: '#7c3aed',
        accentSoft: '#ede9fe',
        accentDark: '#5b21b6',
        title: '専用AIユニット外付けBGA vs XR2統合比較',
        metric: '骨格AF 7種認識',
        analogyLine1: 'α7R Vやα9 IIIではBIONZ XRの横に「AI専門の相棒チップ＋2GBメモリ」を並べていた！',
        analogyLine2: '次世代BIONZ XR2ではこの丸ごと1セットがメインチップ内へ合体し超高速・省電力化！',
        chipHow: '外付けAI＋2GB LPDDR4対比',
        chipBenefit: '後ろ姿でも骨格で瞳を追尾',
        chipSpec: 'α7R V → XR2ワンチップ',
        art: (p) => `
          <!-- Left Box: α7R V / α9 III Discrete AI Coprocessor -->
          <rect x="26" y="68" width="244" height="196" rx="10" fill="#faf5ff" stroke="#7c3aed" stroke-width="1.6"/>
          <text x="148" y="88" text-anchor="middle" font-size="10.8" font-weight="800" fill="#5b21b6">α7R V / α9 III（外付けAI構成）</text>
          <rect x="42" y="106" width="96" height="58" rx="7" fill="url(#${p}_si)"/>
          <text x="90" y="132" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">BIONZ XR</text>
          <text x="90" y="148" text-anchor="middle" font-size="8.2" fill="#94a3b8">画像処理本体</text>

          <line x1="138" y1="135" x2="164" y2="135" stroke="#7c3aed" stroke-width="2.4" marker-end="url(#${p}_arr_purple)"/>
          <rect x="166" y="106" width="90" height="58" rx="7" fill="url(#${p}_violet)"/>
          <text x="211" y="131" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">XR53 AI-PU</text>
          <text x="211" y="147" text-anchor="middle" font-size="8.2" fill="#ede9fe">専用推論BGA</text>

          <rect x="166" y="176" width="90" height="32" rx="6" fill="url(#${p}_dram)"/>
          <text x="211" y="196" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">専用 2GB LPDDR4</text>
          <text x="148" y="232" text-anchor="middle" font-size="9" font-weight="700" fill="#6b21a8">人物骨格・動物・鳥・昆虫・車・飛行機</text>
          <text x="148" y="250" text-anchor="middle" font-size="8.6" font-weight="600" fill="#64748b">基板外バス通信あり（2チップ構成）</text>

          <!-- Arrow Evolution -->
          <line x1="274" y1="162" x2="296" y2="162" stroke="#16a34a" stroke-width="3.2" marker-end="url(#${p}_arr_green)"/>

          <!-- Right Box: BIONZ XR2 Monolithic Integration -->
          <rect x="302" y="68" width="232" height="196" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>
          <text x="418" y="88" text-anchor="middle" font-size="10.8" font-weight="800" fill="#166534">α7 V BIONZ XR2（完全統合！）</text>
          <rect x="328" y="106" width="180" height="102" rx="10" fill="url(#${p}_si)" stroke="#22c55e" stroke-width="2"/>
          <text x="418" y="128" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">BIONZ XR2 単一パッケージ</text>
          <rect x="342" y="140" width="72" height="52" rx="6" fill="url(#${p}_si_blue)"/>
          <text x="378" y="164" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">RAW ISP</text>
          <text x="378" y="179" text-anchor="middle" font-size="8" fill="#e0f2fe">直結NoC</text>
          <rect x="424" y="140" width="72" height="52" rx="6" fill="url(#${p}_violet)"/>
          <text x="460" y="164" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">XR14 AI</text>
          <text x="460" y="179" text-anchor="middle" font-size="8" fill="#ede9fe">内蔵NPU</text>
          <text x="418" y="232" text-anchor="middle" font-size="9.2" font-weight="800" fill="#15803d">遅延 1/4以下・8GB LPDDR5X共有</text>
          <text x="418" y="250" text-anchor="middle" font-size="8.6" font-weight="700" fill="#166534">60回/秒 AF/AE ＆ 省電力化を実現！</text>
        `,
      });

    case 'xr_wifi6e_bt_sip_module':
      return renderBionzDiagram({
        code: 'xr54',
        badge: 'XR54',
        accent: '#059669',
        accentSoft: '#d1fae5',
        accentDark: '#065f46',
        title: '村田 Wi-Fi 6E 2×2 MIMO ＆ BT 5.3 SiP',
        metric: '1.2 Gbps / 2×2',
        analogyLine1: 'カメラの撮れたてRAW/動画をスマホやFTPへ飛ばす「銀色シールド入りの超小型無線基地」。',
        analogyLine2: '2本の金メッキ同軸（MHF4）から同時送受信し、さらにBTで位置情報も常時リンク！',
        chipHow: 'シールドLGA＋2×2 MIMO',
        chipBenefit: 'スマホ転送・FTPが最大2倍速',
        chipSpec: 'Wi-Fi 6E + BT 5.3',
        art: (p) => `
          <!-- Shielded Murata SiP Block -->
          <rect x="34" y="84" width="218" height="156" rx="10" fill="url(#${p}_sus)" stroke="#334155" stroke-width="2" filter="url(#${p}_shadow)"/>
          <text x="143" y="112" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">muRata Type 2BC SiP</text>
          <rect x="52" y="124" width="182" height="44" rx="6" fill="#0f172a"/>
          <text x="143" y="144" text-anchor="middle" font-size="10" font-weight="800" fill="#34d399">Wi-Fi 6E (2.4/5/6 GHz)</text>
          <text x="143" y="160" text-anchor="middle" font-size="9" font-weight="700" fill="#93c5fd">＋ Bluetooth 5.3 BLE コンボ</text>
          <text x="143" y="196" text-anchor="middle" font-size="9.2" font-weight="700" fill="#1e293b">ニッケル銀コンフォーマル遮蔽</text>
          <text x="143" y="216" text-anchor="middle" font-size="8.8" font-weight="700" fill="#065f46">送信ノイズのセンサー混入を遮断</text>
          ${stepBadge(50, 98, '1', '#059669')}

          <!-- Dual MHF4 Coax Links -->
          ${[122, 198]
            .map(
              (cy, i) => `
            <circle cx="294" cy="${cy}" r="16" fill="url(#${p}_gold)" stroke="#92400e" stroke-width="1.6"/>
            <circle cx="294" cy="${cy}" r="6" fill="#0f172a"/>
            <line x1="252" y1="${cy}" x2="276" y2="${cy}" stroke="#059669" stroke-width="2.6"/>
            <line x1="312" y1="${cy}" x2="386" y2="${cy}" stroke="#059669" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>
            <text x="294" y="${cy + 30}" text-anchor="middle" font-size="8.5" font-weight="800" fill="#92400e">MHF4 ANT${i}</text>
          `
            )
            .join('')}

          <!-- AN-1043 Dual Antenna Board -->
          <rect x="392" y="84" width="136" height="156" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.8"/>
          <text x="460" y="110" text-anchor="middle" font-size="10.5" font-weight="800" fill="#065f46">AN-1043 アンテナ</text>
          <path d="M 424 144 Q 460 120 496 144" fill="none" stroke="#059669" stroke-width="2.4"/>
          <path d="M 434 156 Q 460 138 486 156" fill="none" stroke="#10b981" stroke-width="2"/>
          <text x="460" y="178" text-anchor="middle" font-size="9.5" font-weight="800" fill="#047857">2×2 空間多重</text>
          <text x="460" y="198" text-anchor="middle" font-size="9" font-weight="700" fill="#0f172a">Creators’ App</text>
          <text x="460" y="216" text-anchor="middle" font-size="9" font-weight="700" fill="#0f172a">報道FTP / BLE GPS</text>
          ${stepBadge(408, 98, '2', '#0284c7')}
        `,
      });

    case 'xr_usbc_pd_10g_redriver':
      return renderBionzDiagram({
        code: 'xr55',
        badge: 'XR55',
        accent: '#0891b2',
        accentSoft: '#cffafe',
        accentDark: '#155e75',
        title: 'USB-C PD 3.1 ＆ 10Gbps リドライバ',
        metric: '10 Gbps / +14dB',
        analogyLine1: 'ケーブルの表裏と充電パワーを自動交渉（TPS65987D）しつつ、',
        analogyLine2: '弱った10Gbps超高速信号に元気を注入（TUSB1044）して4K配信を安定化！',
        chipHow: 'PD交渉IC＋CTLE線形増幅',
        chipBenefit: '表裏フリー10G転送＆4K配信',
        chipSpec: 'TPS65987D+TUSB1044',
        art: (p) => `
          <!-- Flow: BIONZ -> TUSB1044 + TPS65987D -> USB-C -->
          <rect x="28" y="96" width="96" height="96" rx="8" fill="url(#${p}_si)"/>
          <text x="76" y="140" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">BIONZ XR</text>
          <text x="76" y="158" text-anchor="middle" font-size="8.6" fill="#67e8f9">USB 3.2 Gen2</text>

          <line x1="124" y1="124" x2="178" y2="124" stroke="#0891b2" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>
          <rect x="182" y="84" width="154" height="72" rx="8" fill="#ecfeff" stroke="#0891b2" stroke-width="1.8"/>
          <text x="259" y="106" text-anchor="middle" font-size="10.2" font-weight="800" fill="#155e75">TI TUSB1044 リドライバ</text>
          <text x="259" y="124" text-anchor="middle" font-size="9" font-weight="700" fill="#0e7490">10Gbps CTLE イコライザ (+14dB)</text>
          <text x="259" y="142" text-anchor="middle" font-size="8.6" font-weight="600" fill="#475569">表裏反転クロスポイント切替内蔵</text>
          ${stepBadge(194, 96, '1', '#0891b2')}

          <rect x="182" y="170" width="154" height="62" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
          <text x="259" y="192" text-anchor="middle" font-size="10.2" font-weight="800" fill="#92400e">TI TPS65987D PD制御</text>
          <text x="259" y="210" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">CC1/CC2 向き検出＆PD 3.1交渉</text>
          <text x="259" y="224" text-anchor="middle" font-size="8.5" font-weight="600" fill="#78350f">5V / 9V / 15V 急速給電切替</text>
          ${stepBadge(194, 182, '2', '#d97706')}

          <line x1="336" y1="124" x2="394" y2="124" stroke="#0891b2" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>
          <line x1="336" y1="198" x2="394" y2="174" stroke="#d97706" stroke-width="2.4" marker-end="url(#${p}_arr_gold)"/>

          <!-- USB Type-C 24-pin Receptacle -->
          <rect x="398" y="96" width="132" height="114" rx="18" fill="url(#${p}_sus)" stroke="#334155" stroke-width="2"/>
          <rect x="416" y="124" width="96" height="34" rx="14" fill="#0f172a"/>
          <rect x="426" y="138" width="76" height="6" rx="2" fill="url(#${p}_gold)"/>
          <text x="464" y="116" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">USB Type-C</text>
          <text x="464" y="180" text-anchor="middle" font-size="9" font-weight="800" fill="#0f172a">24ピン リバーシブル</text>
          <text x="464" y="196" text-anchor="middle" font-size="8.4" font-weight="700" fill="#155e75">UVC 4K配信 / テザー</text>

          <text x="280" y="262" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0e7490">ナイキスト周波数 5 GHz の減衰を高域補償 → 長尺ケーブルでもアイ開口くっきり！</text>
        `,
      });

    case 'xr_usbc_charger_efuse':
      return renderBionzDiagram({
        code: 'xr56',
        badge: 'XR56',
        accent: '#ea580c',
        accentSoft: '#ffedd5',
        accentDark: '#9a3412',
        title: 'USB-PD 昇降圧充電 ＆ 15A電子ヒューズ',
        metric: '2.7mΩ / 15A',
        analogyLine1: '5Vでも15Vでも7.2V電池に自動で電圧変換して充電する賢い変圧器（BQ25713）。',
        analogyLine2: '異常サージが来た瞬間にマイクロ秒で電気を止める「何度でも使える電子ヒューズ」付き！',
        chipHow: 'NVDC昇降圧＋スマートeFuse',
        chipBenefit: '電池空でもUSB給電で即撮影',
        chipSpec: 'BQ25713 + TPS25982',
        art: (p) => `
          <rect x="26" y="96" width="94" height="90" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.6"/>
          <text x="73" y="128" text-anchor="middle" font-size="10" font-weight="800" fill="#9a3412">USB-PD入力</text>
          <text x="73" y="148" text-anchor="middle" font-size="9.2" font-weight="700" fill="#c2410c">5V / 9V / 15V</text>
          <text x="73" y="168" text-anchor="middle" font-size="8.4" fill="#7c2d12">どんな充電器もOK</text>

          <line x1="120" y1="141" x2="152" y2="141" stroke="#ea580c" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>

          <rect x="156" y="88" width="124" height="106" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>
          <text x="218" y="112" text-anchor="middle" font-size="10" font-weight="800" fill="#991b1b">TI TPS25982</text>
          <text x="218" y="130" text-anchor="middle" font-size="9.5" font-weight="800" fill="#dc2626">15A スマートeFuse</text>
          <text x="218" y="150" text-anchor="middle" font-size="8.8" font-weight="700" fill="#7f1d1d">超低抵抗 2.7 mΩ</text>
          <text x="218" y="168" text-anchor="middle" font-size="8.4" font-weight="600" fill="#991b1b">短絡・30Vサージ即遮断</text>
          ${stepBadge(168, 100, '1', '#dc2626')}

          <line x1="280" y1="141" x2="312" y2="141" stroke="#ea580c" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>

          <rect x="316" y="84" width="124" height="114" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
          <text x="378" y="106" text-anchor="middle" font-size="10" font-weight="800" fill="#92400e">TI BQ25713</text>
          <text x="378" y="124" text-anchor="middle" font-size="9.2" font-weight="800" fill="#b45309">Hブリッジ昇降圧</text>
          <text x="378" y="144" text-anchor="middle" font-size="8.6" font-weight="700" fill="#78350f">5V → 昇圧 8.4V</text>
          <text x="378" y="162" text-anchor="middle" font-size="8.6" font-weight="700" fill="#78350f">15V → 降圧 8.4V</text>
          <text x="378" y="182" text-anchor="middle" font-size="8.4" font-weight="700" fill="#15803d">NVDC 同時給電</text>
          ${stepBadge(328, 96, '2', '#d97706')}

          <line x1="440" y1="116" x2="466" y2="116" stroke="#16a34a" stroke-width="2.4" marker-end="url(#${p}_arr_green)"/>
          <line x1="440" y1="168" x2="466" y2="168" stroke="#0284c7" stroke-width="2.4" marker-end="url(#${p}_arr_blue)"/>

          <rect x="468" y="88" width="66" height="50" rx="7" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
          <text x="501" y="110" text-anchor="middle" font-size="8.8" font-weight="800" fill="#166534">NP-FZ100</text>
          <text x="501" y="126" text-anchor="middle" font-size="8.4" font-weight="700" fill="#15803d">7.2V充電</text>

          <rect x="468" y="148" width="66" height="50" rx="7" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
          <text x="501" y="170" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">BIONZ XR</text>
          <text x="501" y="186" text-anchor="middle" font-size="8.4" font-weight="700" fill="#0284c7">撮影給電</text>

          ${comparePill(36, 232, 488, true, 'eFuse損失わずか 0.068 W（5A時）＋ 昇降圧効率 >95% で長回しUSB給電を完全守護')}
        `,
      });

    case 'xr_pcie_cfx_clock_mux':
      return renderBionzDiagram({
        code: 'xr57',
        badge: 'XR57',
        accent: '#db2777',
        accentSoft: '#fce7f3',
        accentDark: '#9d174d',
        title: 'PCIe Gen4 100MHzクロック ＆ コンボMUX',
        metric: 'Jitter <0.5ps',
        analogyLine1: '1つのスロットに「CFexpress Type A」と「SDカード」両方挿せる秘密の高速切替器！',
        analogyLine2: 'Renesas製100MHz超高精度クロックが、800MB/s超の連写書込リズムを正確に刻む。',
        chipHow: '100MHz HCSL＋2:1高速MUX',
        chipBenefit: 'CFx/SD共用＆無限連写書込',
        chipSpec: '9FGV0241 + PI3PCIE3412',
        art: (p) => `
          <!-- Top Clock Gen -->
          <rect x="34" y="72" width="166" height="68" rx="8" fill="#fdf2f8" stroke="#db2777" stroke-width="1.8"/>
          <text x="117" y="96" text-anchor="middle" font-size="10.2" font-weight="800" fill="#9d174d">Renesas 9FGV0241</text>
          <text x="117" y="114" text-anchor="middle" font-size="9" font-weight="700" fill="#be185d">100.000 MHz HCSL (Zo=100Ω)</text>
          <text x="117" y="130" text-anchor="middle" font-size="8.4" fill="#64748b">ジッタ &lt; 0.5 ps（PCIe Gen4）</text>
          ${stepBadge(46, 84, '1', '#db2777')}

          <!-- Bottom BIONZ PCIe/SDIO Host -->
          <rect x="34" y="162" width="166" height="72" rx="8" fill="url(#${p}_si)"/>
          <text x="117" y="194" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">BIONZ XR ストレージDMA</text>
          <text x="117" y="214" text-anchor="middle" font-size="8.8" fill="#f9a8d4">PCIe Gen3/4 ＋ SD UHS-II</text>

          <line x1="200" y1="106" x2="246" y2="138" stroke="#db2777" stroke-width="2.2" marker-end="url(#${p}_arr_red)"/>
          <line x1="200" y1="198" x2="246" y2="174" stroke="#0284c7" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>

          <!-- Center Diodes PI3PCIE3412 2:1 High-Speed MUX -->
          <rect x="250" y="96" width="132" height="122" rx="9" fill="url(#${p}_violet)" stroke="#5b21b6" stroke-width="1.8"/>
          <text x="316" y="124" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">PI3PCIE3412</text>
          <text x="316" y="144" text-anchor="middle" font-size="9.5" font-weight="700" fill="#ede9fe">42ピン TQFN</text>
          <text x="316" y="164" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fde047">2 : 1 超広帯域 MUX</text>
          <text x="316" y="186" text-anchor="middle" font-size="8.5" fill="#e0e7ff">挿入カード自動判別</text>
          <text x="316" y="204" text-anchor="middle" font-size="8.4" fill="#c4b5fd">挿入損失 &lt; 1.0 dB</text>
          ${stepBadge(264, 110, '2', '#7c3aed')}

          <!-- Dual Output Cards -->
          <line x1="382" y1="126" x2="418" y2="112" stroke="#db2777" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>
          <line x1="382" y1="186" x2="418" y2="200" stroke="#0284c7" stroke-width="2.6" marker-end="url(#${p}_arr_blue)"/>

          <rect x="422" y="78" width="108" height="62" rx="8" fill="#fce7f3" stroke="#db2777" stroke-width="1.6"/>
          <text x="476" y="103" text-anchor="middle" font-size="9.6" font-weight="800" fill="#9d174d">CFexpress Type A</text>
          <text x="476" y="122" text-anchor="middle" font-size="8.8" font-weight="700" fill="#be185d">PCIe 800〜1800MB/s</text>

          <rect x="422" y="172" width="108" height="62" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <text x="476" y="197" text-anchor="middle" font-size="9.6" font-weight="800" fill="#0369a1">SDXC UHS-II</text>
          <text x="476" y="216" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0284c7">LVDS 300 MB/s</text>

          <text x="280" y="260" text-anchor="middle" font-size="9.5" font-weight="700" fill="#475569">85 Ω 蛇行等長配線（スキュー ±0.1 mm 以内）でカードスロット1の共用を完全成立！</text>
        `,
      });

    case 'xr_mipi_evf_lcd_bridge':
      return renderBionzDiagram({
        code: 'xr58',
        badge: 'XR58',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        accentDark: '#075985',
        title: 'MIPI-DSI EVF/液晶ブリッジ ＆ CMチョーク',
        metric: '90Ω CM遮断',
        analogyLine1: 'ファインダーと液晶へ超滑らかな映像を送りつつ、ケーブルからの電波漏れを止める関所。',
        analogyLine2: '5個の村田コイルが「正しい映像信号だけ素通し・邪魔なノイズ電波だけ遮断」する！',
        chipHow: '村田 DLM0NSN ×5 コイル',
        chipBenefit: '240Hz表示とWi-Fi感度を両立',
        chipSpec: 'MIPI 4L / 90Ω@100MHz',
        art: (p) => `
          <rect x="28" y="84" width="118" height="140" rx="9" fill="url(#${p}_si)"/>
          <text x="87" y="138" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">MIPI-DSI</text>
          <text x="87" y="156" text-anchor="middle" font-size="9.2" font-weight="700" fill="#7dd3fc">ブリッジ BGA</text>
          <text x="87" y="176" text-anchor="middle" font-size="8.4" fill="#cbd5e1">4 Data + 1 Clk</text>

          <!-- Common Mode Choke Bank -->
          <rect x="176" y="72" width="186" height="164" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.8"/>
          <text x="269" y="92" text-anchor="middle" font-size="10" font-weight="800" fill="#075985">村田 DLM0NSN900HY2 ×5</text>
          ${[112, 134, 156, 178, 200]
            .map(
              (y, i) => `
            <line x1="146" y1="${y}" x2="210" y2="${y}" stroke="#0284c7" stroke-width="2"/>
            <rect x="210" y="${y - 7}" width="118" height="14" rx="4" fill="#0369a1"/>
            <text x="269" y="${y + 3.5}" text-anchor="middle" font-size="8" font-weight="700" fill="#e0f2fe">${i < 4 ? `Data Lane ${i} (D+/D−)` : 'Clock Lane (CLK±)'}</text>
            <line x1="328" y1="${y}" x2="394" y2="${y}" stroke="#0284c7" stroke-width="2"/>
          `
            )
            .join('')}
          <text x="269" y="226" text-anchor="middle" font-size="8.6" font-weight="800" fill="#dc2626">同相ノイズ 90Ω 遮断 ／ 逆相映像 無減衰！</text>
          ${stepBadge(190, 84, '1', '#0284c7')}

          <!-- Right: EVF + LCD 40-pin FPC Connectors -->
          <rect x="396" y="78" width="134" height="68" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
          <text x="463" y="106" text-anchor="middle" font-size="10" font-weight="800" fill="#1e3a8a">OLED EVF (40pin)</text>
          <text x="463" y="126" text-anchor="middle" font-size="8.8" font-weight="700" fill="#1d4ed8">120 / 240 Hz 滑らか表示</text>

          <rect x="396" y="162" width="134" height="68" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>
          <text x="463" y="190" text-anchor="middle" font-size="10" font-weight="800" fill="#14532d">バリアングルLCD</text>
          <text x="463" y="210" text-anchor="middle" font-size="8.8" font-weight="700" fill="#15803d">同軸ヒンジ経由出力</text>

          ${comparePill(34, 246, 492, true, '液晶ヒンジ配線からのGHz帯輻射ノイズを食い止め、Wi-Fi感度低下をゼロ化')}
        `,
      });

    case 'xr_akm_audio_codec_afe':
      return renderBionzDiagram({
        code: 'xr59',
        badge: 'XR59',
        accent: '#9333ea',
        accentSoft: '#f3e8ff',
        accentDark: '#6b21a8',
        title: 'AKM AK4619VN 4ch オーディオCODEC',
        metric: 'SNR 106 dB',
        analogyLine1: '基板に金色の「お堀（AGND/DGND分離スリット）」を掘ってデジタル雑音を完全遮断。',
        analogyLine2: '旭化成AKM製の32-QFNチップが、ささやき声まで「サーッ」というノイズ無しで録音！',
        chipHow: 'AGND/DGNDお堀＋AKM 4ch',
        chipBenefit: '極低ノイズなプロ級動画音声',
        chipSpec: 'AK4619VN / 24-32b',
        art: (p) => `
          <!-- Split Ground Island Diagram -->
          <rect x="30" y="72" width="218" height="162" rx="10" fill="#fefce8" stroke="#eab308" stroke-width="2"/>
          <text x="139" y="92" text-anchor="middle" font-size="10.5" font-weight="800" fill="#854d0e">静寂アナログ島（AGND）</text>
          <rect x="46" y="108" width="100" height="44" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
          <text x="96" y="128" text-anchor="middle" font-size="9.5" font-weight="800" fill="#78350f">内蔵/3.5mmマイク</text>
          <text x="96" y="143" text-anchor="middle" font-size="8.2" fill="#92400e">数mV 微弱信号</text>
          <rect x="46" y="164" width="100" height="48" rx="7" fill="#fde68a" stroke="#b45309" stroke-width="1.4"/>
          <text x="96" y="185" text-anchor="middle" font-size="9.2" font-weight="800" fill="#78350f">差動プリアンプ</text>
          <text x="96" y="201" text-anchor="middle" font-size="8.2" fill="#92400e">C0G 音響コンデンサ</text>

          <!-- Gold Isolation Moat -->
          <rect x="256" y="72" width="28" height="162" rx="5" fill="#0f172a"/>
          <text x="270" y="156" text-anchor="middle" font-size="8.8" font-weight="800" fill="#fde047" transform="rotate(-90 270 156)">GND 分離お堀（雑音遮断）</text>

          <!-- Digital Island -->
          <rect x="292" y="72" width="238" height="162" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2"/>
          <text x="411" y="92" text-anchor="middle" font-size="10.5" font-weight="800" fill="#5b21b6">高速デジタル島（DGND）</text>

          <!-- AKM AK4619VN Straddling the moat! -->
          <rect x="200" y="114" width="144" height="82" rx="9" fill="url(#${p}_violet)" stroke="#fde047" stroke-width="2.2" filter="url(#${p}_shadow)"/>
          <text x="272" y="138" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">AKM AK4619VN</text>
          <text x="272" y="156" text-anchor="middle" font-size="9.2" font-weight="700" fill="#fef08a">32-QFN (5×5 mm)</text>
          <text x="272" y="174" text-anchor="middle" font-size="8.8" font-weight="700" fill="#ede9fe">4ch 24b ADC / 32b DAC</text>
          <text x="272" y="188" text-anchor="middle" font-size="8.2" fill="#ddd6fe">192 kHz / SNR 106 dB</text>
          ${stepBadge(214, 126, '1', '#eab308')}

          <line x1="344" y1="155" x2="394" y2="155" stroke="#7c3aed" stroke-width="2.6" marker-end="url(#${p}_arr_purple)"/>
          <rect x="398" y="122" width="118" height="66" rx="8" fill="url(#${p}_si)"/>
          <text x="457" y="150" text-anchor="middle" font-size="9.8" font-weight="800" fill="#ffffff">XR18 音声DSP</text>
          <text x="457" y="168" text-anchor="middle" font-size="8.5" fill="#c4b5fd">I²S / TDM 直結</text>

          <text x="280" y="258" text-anchor="middle" font-size="9.6" font-weight="700" fill="#6b21a8">アナログ接地とデジタル接地を1点分離 → 20万対1のクリアなダイナミックレンジ！</text>
        `,
      });

    case 'xr_mishoe_digital_if':
      return renderBionzDiagram({
        code: 'xr60',
        badge: 'XR60',
        accent: '#ca8a04',
        accentSoft: '#fef9c3',
        accentDark: '#854d0e',
        title: 'MIシュー(MIS-2006) デジタル音声＆250V保護',
        metric: '21ピン / 250V耐圧',
        analogyLine1: 'ホットシュー奥の21ピンからケーブル無しで純デジタル音声を取り込みつつ、',
        analogyLine2: '古いストロボの高電圧逆流や雨滴ショートを250V耐圧スイッチで完全ガード！',
        chipHow: 'I²Sアイソレータ＋250V IGBT',
        chipBenefit: '配線ゼロ4ch高音質＋安全保護',
        chipSpec: 'MIS-2006 / 21-Pin',
        art: (p) => `
          <rect x="28" y="80" width="142" height="150" rx="9" fill="#fefce8" stroke="#ca8a04" stroke-width="1.8"/>
          <text x="99" y="102" text-anchor="middle" font-size="10.2" font-weight="800" fill="#854d0e">MIS-2006 (21ピン)</text>
          ${Array.from({ length: 9 }, (_, i) => `<rect x="${42 + i * 13}" y="114" width="8" height="18" rx="2" fill="url(#${p}_gold)"/>`).join('')}
          <text x="99" y="154" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">ECM-B1M / XLR-K3M</text>
          <text x="99" y="172" text-anchor="middle" font-size="8.5" fill="#475569">4ch 24-bit デジタル音声</text>
          <text x="99" y="200" text-anchor="middle" font-size="9.2" font-weight="800" fill="#dc2626">⚡ ストロボ X接点</text>
          <text x="99" y="216" text-anchor="middle" font-size="8.4" fill="#991b1b">最大 250V 高圧サージ</text>

          <!-- Upper Path: Digital Audio Isolator -->
          <line x1="170" y1="138" x2="216" y2="122" stroke="#0284c7" stroke-width="2.5" marker-end="url(#${p}_arr_blue)"/>
          <rect x="220" y="84" width="160" height="66" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
          <text x="300" y="108" text-anchor="middle" font-size="9.8" font-weight="800" fill="#075985">I²S デジタル音声アイソレータ</text>
          <text x="300" y="126" text-anchor="middle" font-size="8.6" font-weight="700" fill="#0369a1">アナログ変換ゼロでノイズ根絶</text>
          <text x="300" y="142" text-anchor="middle" font-size="8.2" fill="#475569">雨滴ショート時・自動電流制限</text>
          ${stepBadge(232, 96, '1', '#0284c7')}

          <!-- Lower Path: 250V IGBT Sync Guard -->
          <line x1="170" y1="196" x2="216" y2="196" stroke="#dc2626" stroke-width="2.5" marker-end="url(#${p}_arr_red)"/>
          <rect x="220" y="164" width="160" height="66" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.6"/>
          <text x="300" y="188" text-anchor="middle" font-size="9.8" font-weight="800" fill="#991b1b">250V IGBT 同期スイッチ</text>
          <text x="300" y="206" text-anchor="middle" font-size="8.6" font-weight="700" fill="#b91c1c">＋ TVS サージ保護ダイオード</text>
          <text x="300" y="222" text-anchor="middle" font-size="8.2" fill="#7f1d1d">330倍の高電圧差を完全隔離</text>
          ${stepBadge(232, 176, '2', '#dc2626')}

          <line x1="380" y1="118" x2="420" y2="144" stroke="#0284c7" stroke-width="2.4" marker-end="url(#${p}_arr_blue)"/>
          <line x1="380" y1="196" x2="420" y2="170" stroke="#16a34a" stroke-width="2.4" marker-end="url(#${p}_arr_green)"/>

          <rect x="424" y="108" width="106" height="96" rx="9" fill="url(#${p}_si)"/>
          <text x="477" y="150" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">BIONZ XR</text>
          <text x="477" y="168" text-anchor="middle" font-size="8.6" font-weight="700" fill="#fde047">1.8V ロジック安全</text>

          <text x="280" y="258" text-anchor="middle" font-size="9.5" font-weight="700" fill="#854d0e">1つのホットシューで「4ch高音質デジタルマイク」と「高耐圧ストロボ安全同期」を両立！</text>
        `,
      });

    case 'xr_emount_lens_comm_if':
      return renderBionzDiagram({
        code: 'xr61',
        badge: 'XR61',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        accentDark: '#9f1239',
        title: 'Eマウント 10ピン高速通信 ＆ 8.4V給電',
        metric: '120Hz AF / 8.4V',
        analogyLine1: 'カメラとレンズが1秒間に最大120回ピント作戦会議をする「10本の神経＆電源動脈」。',
        analogyLine2: '1.8V⇔3.3Vの通訳チップと、XDリニアモーター用の大電流8.4V電源スイッチを搭載！',
        chipHow: '高速レベルシフタ＋8.4V電源',
        chipBenefit: '爆速瞳AF＆ブリージング補正',
        chipSpec: 'EBL 10-Pin / POSCAP',
        art: (p) => `
          <rect x="28" y="86" width="112" height="136" rx="9" fill="url(#${p}_si)"/>
          <text x="84" y="138" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">BIONZ XR</text>
          <text x="84" y="156" text-anchor="middle" font-size="8.6" fill="#fda4af">1.8 V 像面位相差</text>
          <text x="84" y="174" text-anchor="middle" font-size="8.4" fill="#cbd5e1">60〜120 回/秒</text>

          <!-- Level Shifter -->
          <line x1="140" y1="120" x2="184" y2="120" stroke="#e11d48" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>
          <rect x="188" y="84" width="166" height="68" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="1.6"/>
          <text x="271" y="106" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">高速双方向レベルシフタ</text>
          <text x="271" y="124" text-anchor="middle" font-size="9" font-weight="700" fill="#be123c">1.8 V ⇔ 3.3 V SPI / UART</text>
          <text x="271" y="142" text-anchor="middle" font-size="8.3" fill="#475569">AF位置・絞り・収差・OSS協調</text>
          ${stepBadge(200, 96, '1', '#e11d48')}

          <!-- 8.4V Lens Motor Power Switch + POSCAP -->
          <rect x="188" y="166" width="166" height="68" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
          <text x="271" y="188" text-anchor="middle" font-size="9.8" font-weight="800" fill="#92400e">8.4 V 大電流ロードスイッチ</text>
          <text x="271" y="206" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">＋ 低ESR POSCAP 電力タンク</text>
          <text x="271" y="224" text-anchor="middle" font-size="8.3" fill="#78350f">活線着脱保護・XDモーター瞬発対応</text>
          ${stepBadge(200, 178, '2', '#d97706')}

          <line x1="354" y1="118" x2="396" y2="132" stroke="#e11d48" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>
          <line x1="354" y1="200" x2="396" y2="184" stroke="#d97706" stroke-width="2.6" marker-end="url(#${p}_arr_gold)"/>

          <!-- EBL 10-Pin Lens Mount -->
          <rect x="400" y="84" width="132" height="148" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="466" y="108" text-anchor="middle" font-size="10" font-weight="800" fill="#fde047">EBL 10ピン接点</text>
          ${Array.from({ length: 10 }, (_, i) => `<circle cx="${418 + (i % 5) * 24}" cy="${128 + Math.floor(i / 5) * 20}" r="6" fill="url(#${p}_gold)"/>`).join('')}
          <text x="466" y="180" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">G Master レンズ</text>
          <text x="466" y="198" text-anchor="middle" font-size="8.6" fill="#fda4af">XDリニアモーター駆動</text>
          <text x="466" y="216" text-anchor="middle" font-size="8.4" fill="#cbd5e1">ブリージング補正連動</text>

          <text x="280" y="260" text-anchor="middle" font-size="9.5" font-weight="700" fill="#9f1239">ボディとレンズを1ミリ秒級の神経網で直結 → 動体への瞳追従と協調手ブレ補正を実現！</text>
        `,
      });

    case 'xr_genlock_timecode_mcu':
      return renderBionzDiagram({
        code: 'xr62',
        badge: 'XR62',
        accent: '#4f46e5',
        accentSoft: '#e0e7ff',
        accentDark: '#3730a3',
        title: 'Genlock / タイムコード同期 STM32 MCU',
        metric: '±1ppm / 27MHz',
        analogyLine1: '複数台のカメラを並べて映画やライブを撮るとき、1フレームの音ズレも許さない専属時計番。',
        analogyLine2: 'STマイクロ製Cortex-M0と27MHz可変水晶で、外部タイムコードへマイクロ秒同期！',
        chipHow: 'STM32F031 + 27MHz VCXO',
        chipBenefit: 'マルチカム編集の音ズレゼロ',
        chipSpec: 'STM32F031E6 / LTC',
        art: (p) => `
          <!-- Top: STM32F031E6 Genlock Hub -->
          <rect x="34" y="74" width="184" height="104" rx="9" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.8"/>
          <text x="126" y="98" text-anchor="middle" font-size="10.5" font-weight="800" fill="#3730a3">ST STM32F031E6</text>
          <text x="126" y="116" text-anchor="middle" font-size="9.2" font-weight="700" fill="#4f46e5">ARM Cortex-M0 "Genlock"</text>
          <text x="126" y="138" text-anchor="middle" font-size="8.8" font-weight="700" fill="#1e293b">SMPTE 23.976 / 29.97 / 59.94</text>
          <text x="126" y="158" text-anchor="middle" font-size="8.4" fill="#64748b">OS負荷から独立した専用タイマー</text>
          ${stepBadge(46, 86, '1', '#4f46e5')}

          <!-- 27MHz VCXO Crystal -->
          <rect x="34" y="190" width="184" height="48" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
          <text x="126" y="210" text-anchor="middle" font-size="9.8" font-weight="800" fill="#92400e">27.000 MHz 可変水晶 (VCXO)</text>
          <text x="126" y="227" text-anchor="middle" font-size="8.5" font-weight="700" fill="#b45309">微小電圧で位相をピタッとロック</text>

          <line x1="218" y1="126" x2="266" y2="126" stroke="#4f46e5" stroke-width="2.6" marker-end="url(#${p}_arr_purple)"/>

          <!-- Right: Multi-Cam Synced Frame Waveform -->
          <rect x="270" y="74" width="260" height="164" rx="10" fill="#0f172a" stroke="#6366f1" stroke-width="1.6"/>
          <text x="400" y="96" text-anchor="middle" font-size="10.2" font-weight="800" fill="#c7d2fe">マルチカメラ フレーム完全同期（00:42:18:09）</text>
          ${[
            { y: 124, label: 'CAM A (α7 IV)', col: '#38bdf8' },
            { y: 162, label: 'CAM B (FX3)', col: '#4ade80' },
            { y: 200, label: '音声レコーダ', col: '#facc15' },
          ]
            .map(
              (r) => `
            <text x="282" y="${r.y + 4}" font-size="8.5" font-weight="700" fill="${r.col}">${r.label}</text>
            <polyline points="354,${r.y + 8} 370,${r.y + 8} 370,${r.y - 10} 388,${r.y - 10} 388,${r.y + 8} 422,${r.y + 8} 422,${r.y - 10} 440,${r.y - 10} 440,${r.y + 8} 474,${r.y + 8} 474,${r.y - 10} 492,${r.y - 10} 492,${r.y + 8} 518,${r.y + 8}" fill="none" stroke="${r.col}" stroke-width="2.2"/>
          `
            )
            .join('')}
          <!-- Vertical alignment reference lines -->
          <line x1="370" y1="106" x2="370" y2="218" stroke="#f43f5e" stroke-width="1.2" stroke-dasharray="3 2"/>
          <line x1="422" y1="106" x2="422" y2="218" stroke="#f43f5e" stroke-width="1.2" stroke-dasharray="3 2"/>
          <line x1="474" y1="106" x2="474" y2="218" stroke="#f43f5e" stroke-width="1.2" stroke-dasharray="3 2"/>
          <text x="400" y="230" text-anchor="middle" font-size="8.6" font-weight="700" fill="#fda4af">1時間撮影してもズレ &lt; 0.1フレーム（3.6 ms）！</text>
        `,
      });

    case 'xr_ibis_servo_mcu':
      return renderBionzDiagram({
        code: 'xr63',
        badge: 'XR63',
        accent: '#ca8a04',
        accentSoft: '#fef9c3',
        accentDark: '#854d0e',
        title: '5軸IBIS専用サーボMCU（Bonobo）',
        metric: '1 kHz 閉ループ',
        analogyLine1: '1秒間に1,000回センサーの揺れを監視し、磁石で逆向きに動かして静止させる専属操縦士！',
        analogyLine2: 'ルネサス製R2J30503LGがBIONZ XRの代わりに手ブレ補正とピクセルシフトを単独完遂。',
        chipHow: '1kHz PIDサーボ＋ホールADC',
        chipBenefit: '5.5〜8段手持ち静止＆超解像',
        chipSpec: 'Renesas R2J30503LG',
        art: (p) => `
          <!-- Closed-Loop Servo Control Diagram -->
          <rect x="28" y="78" width="124" height="62" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
          <text x="90" y="102" text-anchor="middle" font-size="9.5" font-weight="800" fill="#92400e">XR64 水晶ジャイロ</text>
          <text x="90" y="122" text-anchor="middle" font-size="8.6" font-weight="700" fill="#b45309">角速度 ω・加速度</text>

          <line x1="152" y1="109" x2="188" y2="124" stroke="#d97706" stroke-width="2.5" marker-end="url(#${p}_arr_gold)"/>

          <rect x="192" y="88" width="176" height="96" rx="10" fill="url(#${p}_si)" stroke="#eab308" stroke-width="2.2" filter="url(#${p}_shadow)"/>
          <text x="280" y="114" text-anchor="middle" font-size="10.5" font-weight="800" fill="#fde047">Renesas R2J30503LG</text>
          <text x="280" y="132" text-anchor="middle" font-size="9.2" font-weight="700" fill="#ffffff">"Bonobo" IBIS サーボMCU</text>
          <text x="280" y="152" text-anchor="middle" font-size="8.6" font-weight="700" fill="#93c5fd">1 kHz 5軸 PID リアルタイム演算</text>
          <text x="280" y="170" text-anchor="middle" font-size="8.4" fill="#cbd5e1">＋ 3軸16-bit ホール位置ADC</text>
          ${stepBadge(204, 100, '1', '#eab308')}

          <line x1="368" y1="124" x2="404" y2="124" stroke="#16a34a" stroke-width="2.8" marker-end="url(#${p}_arr_green)"/>
          <rect x="408" y="84" width="122" height="86" rx="9" fill="#dcfce7" stroke="#16a34a" stroke-width="1.8"/>
          <text x="469" y="108" text-anchor="middle" font-size="9.6" font-weight="800" fill="#14532d">IBIS TEX-5810</text>
          <text x="469" y="128" text-anchor="middle" font-size="9" font-weight="700" fill="#15803d">X / Y / θ 3系統 VCM</text>
          <text x="469" y="148" text-anchor="middle" font-size="8.4" fill="#166534">サブミクロン位置制御</text>
          ${stepBadge(420, 96, '2', '#16a34a')}

          <!-- Hall Effect Feedback Path Bottom -->
          <path d="M 469 170 L 469 224 L 280 224 L 280 186" fill="none" stroke="#0284c7" stroke-width="2.4" marker-end="url(#${p}_arr_blue)"/>
          <rect x="306" y="210" width="144" height="26" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.3"/>
          <text x="378" y="227" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">ホール素子 現在位置帰還</text>

          <rect x="28" y="168" width="124" height="62" rx="8" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="90" y="194" text-anchor="middle" font-size="9.4" font-weight="800" fill="#5b21b6">BIONZ XR / レンズ</text>
          <text x="90" y="212" text-anchor="middle" font-size="8.4" fill="#6b21a8">焦点距離・倍率を通知</text>
          <line x1="152" y1="196" x2="188" y2="162" stroke="#7c3aed" stroke-width="2" marker-end="url(#${p}_arr_purple)"/>

          <text x="280" y="262" text-anchor="middle" font-size="9.5" font-weight="700" fill="#854d0e">ジャイロ予測 × ホール実測の1ms超高速フィードバック → センサーを空中にピタリ静止！</text>
        `,
      });

    case 'xr_epson_quartz_gyro_imu':
      return renderBionzDiagram({
        code: 'xr64',
        badge: 'XR64',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        accentDark: '#92400e',
        title: '直交デュアル水晶ジャイロ（Epson XV7011BB）',
        metric: '±1°/s 水晶音叉',
        analogyLine1: 'カメラの「三半規管」。時計と同じ超精密な単結晶水晶の音叉を90°直角に2個配置！',
        analogyLine2: '温度が変わってもゼロ点が狂いにくく、夜景の手持ち撮影でも星が点に写る精度を実現。',
        chipHow: '0°/90° 直交ダブルT水晶',
        chipBenefit: '低ドリフトで夜景もピタ止まり',
        chipSpec: 'XV7011BB 5.0×3.2mm',
        art: (p) => `
          <!-- Left: Orthogonal Dual Quartz Gyro Layout -->
          <rect x="28" y="68" width="252" height="196" rx="10" fill="#0f2f25" stroke="#eab308" stroke-width="1.8"/>
          <text x="154" y="88" text-anchor="middle" font-size="10.2" font-weight="800" fill="#fef08a">防振アイランド上の直交90°実装</text>

          <!-- Pitch Gyro 0 deg -->
          <rect x="48" y="106" width="94" height="58" rx="6" fill="url(#${p}_gold)" stroke="#78350f" stroke-width="1.6"/>
          <text x="95" y="132" text-anchor="middle" font-size="9.5" font-weight="800" fill="#0f172a">XV7011BB</text>
          <text x="95" y="148" text-anchor="middle" font-size="8.6" font-weight="800" fill="#78350f">PITCH (0° 縦揺れ)</text>

          <!-- Yaw Gyro 90 deg -->
          <rect x="184" y="102" width="60" height="94" rx="6" fill="url(#${p}_gold)" stroke="#78350f" stroke-width="1.6"/>
          <text x="214" y="144" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">XV7011</text>
          <text x="214" y="160" text-anchor="middle" font-size="8.4" font-weight="800" fill="#78350f">YAW 90°</text>

          <!-- 3-Axis Accel IMU -->
          <rect x="58" y="182" width="76" height="42" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.4"/>
          <text x="96" y="201" text-anchor="middle" font-size="8.8" font-weight="800" fill="#7dd3fc">3軸加速度</text>
          <text x="96" y="215" text-anchor="middle" font-size="8" fill="#cbd5e1">X/Yシフト</text>

          <text x="154" y="248" text-anchor="middle" font-size="8.8" font-weight="700" fill="#bbf7d0">5.0×3.2×1.3mm 気密セラミック金リッド</text>

          <!-- Right: Double-T Quartz Coriolis Principle -->
          <rect x="298" y="68" width="234" height="196" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
          <text x="415" y="88" text-anchor="middle" font-size="10.2" font-weight="800" fill="#92400e">ダブルT型水晶とコリオリ力</text>
          <!-- Stylized Double-T tuning fork -->
          <rect x="405" y="108" width="20" height="72" rx="3" fill="#38bdf8" stroke="#0369a1" stroke-width="1.4"/>
          <rect x="358" y="108" width="114" height="14" rx="3" fill="#38bdf8" stroke="#0369a1" stroke-width="1.4"/>
          <rect x="358" y="166" width="114" height="14" rx="3" fill="#38bdf8" stroke="#0369a1" stroke-width="1.4"/>
          <text x="415" y="148" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0369a1">水晶駆動振動 v</text>
          <text x="415" y="202" text-anchor="middle" font-size="9.2" font-weight="800" fill="#dc2626">回転 ω → コリオリ力 F = −2m(ω×v)</text>
          ${comparePill(314, 214, 202, false, '安価MEMS：温度変化でゼロ点漂流')}
          ${comparePill(314, 239, 202, true, '水晶XV7011BB：±1°/s 超安定＋Catalyst対応')}
        `,
      });

    case 'xr_shutter_hbridge_driver':
      return renderBionzDiagram({
        code: 'xr65',
        badge: 'XR65',
        accent: '#dc2626',
        accentSoft: '#fee2e2',
        accentDark: '#991b1b',
        title: 'メカシャッター 1.8A デュアルHブリッジ',
        metric: '1.8A / 280mΩ',
        analogyLine1: 'わずか2mm角チップ内の4つのスイッチ（H型）を切替えて、1.8Aの大電流を正逆自在に流す。',
        analogyLine2: '1/8000秒の先幕・後幕走行と10コマ/秒の高速チャージをマイクロ秒精度で制御！',
        chipHow: 'TI DRV8837 ×2 + 100μF',
        chipBenefit: '1/8000秒精度＆10fps連写',
        chipSpec: 'WSON-8 2×2mm / 1.8A',
        art: (p) => `
          <!-- Left: H-Bridge 4-MOSFET Topology -->
          <rect x="30" y="68" width="238" height="196" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
          <text x="149" y="88" text-anchor="middle" font-size="10.4" font-weight="800" fill="#991b1b">TI DRV8837 内部 Hブリッジ構造</text>
          <!-- 4 switches -->
          <rect x="54" y="104" width="54" height="28" rx="5" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
          <text x="81" y="122" text-anchor="middle" font-size="9" font-weight="800" fill="#166534">Q1 ON</text>
          <rect x="190" y="104" width="54" height="28" rx="5" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.3"/>
          <text x="217" y="122" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b">Q2 OFF</text>

          <rect x="112" y="148" width="74" height="34" rx="7" fill="url(#${p}_cu)"/>
          <text x="149" y="169" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">幕モーター</text>
          <line x1="81" y1="132" x2="81" y2="165" stroke="#dc2626" stroke-width="2.6"/>
          <line x1="81" y1="165" x2="112" y2="165" stroke="#dc2626" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>
          <line x1="186" y1="165" x2="217" y2="165" stroke="#dc2626" stroke-width="2.6"/>
          <line x1="217" y1="165" x2="217" y2="198" stroke="#dc2626" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>

          <rect x="54" y="198" width="54" height="28" rx="5" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.3"/>
          <text x="81" y="216" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b">Q3 OFF</text>
          <rect x="190" y="198" width="54" height="28" rx="5" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
          <text x="217" y="216" text-anchor="middle" font-size="9" font-weight="800" fill="#166534">Q4 ON</text>
          <text x="149" y="250" text-anchor="middle" font-size="8.8" font-weight="800" fill="#991b1b">正転・逆転・急ブレーキを280mΩで切替</text>

          <!-- Right: Dual Curtain + POSCAP Pulse Reservoir -->
          <rect x="288" y="68" width="244" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
          <text x="410" y="88" text-anchor="middle" font-size="10.4" font-weight="800" fill="#0f172a">デュアル駆動＋100μF電力タンク</text>
          <rect x="306" y="104" width="208" height="38" rx="7" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
          <text x="410" y="121" text-anchor="middle" font-size="9.5" font-weight="800" fill="#991b1b">DRV8837 #1：先幕＆後幕ソレノイド</text>
          <text x="410" y="135" text-anchor="middle" font-size="8.4" fill="#7f1d1d">1/8000秒 露光スリット幅を精密制御</text>

          <rect x="306" y="152" width="208" height="38" rx="7" fill="#ffedd5" stroke="#ea580c" stroke-width="1.4"/>
          <text x="410" y="169" text-anchor="middle" font-size="9.5" font-weight="800" fill="#9a3412">DRV8837 #2：チャージ巻上げモーター</text>
          <text x="410" y="183" text-anchor="middle" font-size="8.4" fill="#7c2d12">10fps連写＋電源OFFダスト防塵閉鎖</text>

          <rect x="306" y="202" width="208" height="46" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
          <text x="410" y="221" text-anchor="middle" font-size="9.5" font-weight="800" fill="#92400e">100 μF POSCAP パルス電力タンク</text>
          <text x="410" y="238" text-anchor="middle" font-size="8.4" fill="#78350f">瞬間大電流でもメイン電源を揺らさない！</text>
        `,
      });

    case 'xr_rtc_power_seq_backup':
      return renderBionzDiagram({
        code: 'xr66',
        badge: 'XR66',
        accent: '#475569',
        accentSoft: '#e2e8f0',
        accentDark: '#1e293b',
        title: '常時RTC Power IC・FC-135水晶・MS621FE電池',
        metric: '32.768kHz / 3V',
        analogyLine1: 'バッテリーを抜いても日付が消えない秘密は、基板の隅の極小充電コイン電池と腕時計水晶！',
        analogyLine2: '電源ONの瞬間にPower ICが真っ先に目覚め、BIONZ XRを正しい順番で安全起動する。',
        chipHow: '3V二次電池＋2¹⁵Hz水晶',
        chipBenefit: '電池交換でも日時保持・即起動',
        chipSpec: 'MS621FE + FC-135',
        art: (p) => `
          <!-- Seiko MS621FE Coin Cell -->
          <circle cx="110" cy="156" r="58" fill="url(#${p}_sus)" stroke="#334155" stroke-width="2.2" filter="url(#${p}_shadow)"/>
          <circle cx="110" cy="156" r="46" fill="none" stroke="#f8fafc" stroke-width="1.4" stroke-dasharray="4 3"/>
          <text x="110" y="144" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">SEIKO</text>
          <text x="110" y="160" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0f172a">MS621FE</text>
          <text x="110" y="176" text-anchor="middle" font-size="8.6" font-weight="700" fill="#334155">3.0V / 5.5mAh</text>
          <text x="110" y="232" text-anchor="middle" font-size="9" font-weight="800" fill="#475569">充電式Li-MnO₂二次電池</text>
          ${stepBadge(68, 108, '1', '#475569')}

          <!-- Epson FC-135 Crystal -->
          <rect x="206" y="80" width="142" height="54" rx="8" fill="url(#${p}_gold)" stroke="#92400e" stroke-width="1.6"/>
          <text x="277" y="102" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a">Epson FC-135</text>
          <text x="277" y="120" text-anchor="middle" font-size="9" font-weight="700" fill="#78350f">32.768 kHz (±20ppm)</text>
          ${stepBadge(218, 92, '2', '#d97706')}

          <!-- Always-On Power IC -->
          <rect x="206" y="160" width="142" height="74" rx="9" fill="url(#${p}_si)" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="277" y="186" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">常時RTC Power IC</text>
          <text x="277" y="204" text-anchor="middle" font-size="8.8" font-weight="700" fill="#7dd3fc">待機消費 1〜2 μA</text>
          <text x="277" y="220" text-anchor="middle" font-size="8.4" fill="#cbd5e1">32,768 ÷ 2¹⁵ = 1.000秒</text>
          <line x1="168" y1="184" x2="204" y2="194" stroke="#475569" stroke-width="2.4" marker-end="url(#${p}_arr_dark)"/>
          <line x1="277" y1="134" x2="277" y2="158" stroke="#d97706" stroke-width="2.4" marker-end="url(#${p}_arr_gold)"/>

          <!-- Power-On Sequence Ladder -->
          <line x1="348" y1="196" x2="384" y2="160" stroke="#16a34a" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>
          <rect x="388" y="80" width="142" height="156" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>
          <text x="459" y="102" text-anchor="middle" font-size="9.8" font-weight="800" fill="#14532d">電源ON 起動シーケンス</text>
          <rect x="402" y="114" width="114" height="24" rx="5" fill="#dcfce7"/><text x="459" y="130" text-anchor="middle" font-size="8.8" font-weight="800" fill="#166534">① Core 0.75V 起動</text>
          <rect x="402" y="146" width="114" height="24" rx="5" fill="#dbeafe"/><text x="459" y="162" text-anchor="middle" font-size="8.8" font-weight="800" fill="#1e40af">② LPDDR5X 1.05V</text>
          <rect x="402" y="178" width="114" height="24" rx="5" fill="#fef3c7"/><text x="459" y="194" text-anchor="middle" font-size="8.8" font-weight="800" fill="#92400e">③ I/O 1.8V → 起動！</text>
          <text x="459" y="222" text-anchor="middle" font-size="8.4" font-weight="700" fill="#15803d">ラッチアップ完全防止</text>
        `,
      });

    case 'xr_battery_fuel_auth_if':
      return renderBionzDiagram({
        code: 'xr67',
        badge: 'XR67',
        accent: '#16a34a',
        accentSoft: '#dcfce7',
        accentDark: '#166534',
        title: '1%高精度残量ゲージ（TI BQ27441-G1）',
        metric: '1%刻み / 10mΩ',
        analogyLine1: '電池から流れ出た電気の粒を10mΩ精密抵抗で数え上げ、劣化や寒さまで補正する残量鑑定士！',
        analogyLine2: 'だからソニーαは「残り37%」と1%単位で正確に分かり、撮影中の突然ダウンを防げる。',
        chipHow: 'Impedance Track™＋認証',
        chipBenefit: '極寒でも正確な1%残量表示',
        chipSpec: 'BQ27441-G1 / 400kHz',
        art: (p) => `
          <!-- NP-FZ100 4-blade terminal -->
          <rect x="28" y="80" width="132" height="154" rx="9" fill="#1e293b" stroke="#22c55e" stroke-width="1.8"/>
          <text x="94" y="104" text-anchor="middle" font-size="10" font-weight="800" fill="#86efac">NP-FZ100 4極端子</text>
          ${[
            { y: 122, t: 'B+  電池プラス (+7.2V)', c: '#f87171' },
            { y: 148, t: 'TH  内蔵温度サーミスタ', c: '#fbbf24' },
            { y: 174, t: 'C   InfoLITHIUM認証', c: '#38bdf8' },
            { y: 200, t: 'B−  電池マイナス (GND)', c: '#94a3b8' },
          ]
            .map(
              (b) => `
            <rect x="40" y="${b.y - 10}" width="108" height="20" rx="4" fill="#0f172a" stroke="${b.c}" stroke-width="1.2"/>
            <text x="94" y="${b.y + 3}" text-anchor="middle" font-size="8.2" font-weight="700" fill="${b.c}">${b.t}</text>
          `
            )
            .join('')}

          <line x1="160" y1="156" x2="204" y2="156" stroke="#16a34a" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>

          <!-- Shunt + TI BQ27441-G1 -->
          <rect x="208" y="80" width="174" height="154" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>
          <text x="295" y="102" text-anchor="middle" font-size="10.2" font-weight="800" fill="#14532d">TI BQ27441-G1 燃料計</text>
          <rect x="224" y="114" width="142" height="32" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
          <text x="295" y="134" text-anchor="middle" font-size="9" font-weight="800" fill="#92400e">10 mΩ ケルビン電流積算</text>
          <rect x="224" y="156" width="142" height="32" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.4"/>
          <text x="295" y="176" text-anchor="middle" font-size="9" font-weight="800" fill="#1e40af">内部抵抗 R_int 経年学習</text>
          <text x="295" y="210" text-anchor="middle" font-size="8.6" font-weight="700" fill="#15803d">Impedance Track™ アルゴリズム</text>
          <text x="295" y="224" text-anchor="middle" font-size="8.2" fill="#475569">400 kHz I²C / SMBus 報告</text>
          ${stepBadge(220, 92, '1', '#16a34a')}

          <line x1="382" y1="156" x2="414" y2="156" stroke="#16a34a" stroke-width="2.6" marker-end="url(#${p}_arr_green)"/>

          <!-- Display Battery Gauge -->
          <rect x="418" y="96" width="112" height="122" rx="10" fill="#0f172a" stroke="#22c55e" stroke-width="1.8"/>
          <text x="474" y="122" text-anchor="middle" font-size="9.5" font-weight="700" fill="#94a3b8">EVF 残量表示</text>
          <text x="474" y="160" text-anchor="middle" font-size="26" font-weight="800" fill="#4ade80">78%</text>
          <rect x="434" y="174" width="80" height="14" rx="4" fill="#1e293b" stroke="#4ade80" stroke-width="1.2"/>
          <rect x="436" y="176" width="60" height="10" rx="2" fill="#22c55e"/>
          <text x="474" y="206" text-anchor="middle" font-size="8.4" font-weight="700" fill="#86efac">動画残り 94分</text>
        `,
      });

    case 'xr_thermal_ntc_telemetry_hub':
      return renderBionzDiagram({
        code: 'xr68',
        badge: 'XR68',
        accent: '#e11d48',
        accentSoft: '#ffe4e6',
        accentDark: '#9f1239',
        title: '多点 ±0.1°C 温度テレメトリ（TI TMP117）',
        metric: '精度 ±0.1 °C',
        analogyLine1: '医療用体温計なみの±0.1℃精度で、基板・グリップ・カード室・IBISの4箇所を同時監視！',
        analogyLine2: '手が熱くなる低温やけどを防ぎつつ、録画ファイルを壊さずに安全保護する熱の見張り番。',
        chipHow: 'TMP117 ±0.1°C ＋ 4ch NTC',
        chipBenefit: '安全な長回し＆データ保全',
        chipSpec: '16-bit 0.0078°C/LSB',
        art: (p) => `
          <!-- 4 Remote NTC Sensors Left -->
          ${[
            { y: 74, name: '① メイン基板 (MB)', temp: '54.2 °C', col: '#f97316' },
            { y: 122, name: '② 右手グリップ (GRIP)', temp: '38.4 °C', col: '#22c55e' },
            { y: 170, name: '③ CFxカード室 (CARD)', temp: '61.8 °C', col: '#ef4444' },
            { y: 218, name: '④ IBISコイル周辺', temp: '49.1 °C', col: '#eab308' },
          ]
            .map(
              (s) => `
            <rect x="30" y="${s.y}" width="176" height="38" rx="7" fill="#ffffff" stroke="${s.col}" stroke-width="1.6"/>
            <text x="42" y="${s.y + 16}" font-size="9" font-weight="800" fill="#0f172a">${s.name}</text>
            <text x="42" y="${s.y + 31}" font-size="8.4" font-weight="700" fill="#64748b">10 kΩ NTC 銅フィンガー</text>
            <text x="196" y="${s.y + 24}" text-anchor="end" font-size="10.2" font-weight="800" fill="${s.col}">${s.temp}</text>
            <line x1="206" y1="${s.y + 19}" x2="252" y2="156" stroke="${s.col}" stroke-width="2"/>
          `
            )
            .join('')}

          <!-- Center TMP117 Hub -->
          <rect x="254" y="104" width="136" height="106" rx="10" fill="url(#${p}_si)" stroke="#f43f5e" stroke-width="2"/>
          <text x="322" y="128" text-anchor="middle" font-size="10.5" font-weight="800" fill="#fda4af">TI TMP117</text>
          <text x="322" y="146" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">±0.1 °C 基準温度計</text>
          <text x="322" y="166" text-anchor="middle" font-size="8.6" font-weight="700" fill="#fde047">16-bit (0.0078°C)</text>
          <text x="322" y="186" text-anchor="middle" font-size="8.4" fill="#cbd5e1">I²C / SMBus 4chハブ</text>
          ${stepBadge(266, 116, '1', '#e11d48')}

          <line x1="390" y1="156" x2="418" y2="156" stroke="#e11d48" stroke-width="2.6" marker-end="url(#${p}_arr_red)"/>

          <!-- Right: Safety Policy Action -->
          <rect x="422" y="88" width="108" height="140" rx="9" fill="#fff1f2" stroke="#e11d48" stroke-width="1.6"/>
          <text x="476" y="112" text-anchor="middle" font-size="9.8" font-weight="800" fill="#9f1239">3D熱予測制御</text>
          <text x="476" y="138" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0f172a">・低温やけど防止</text>
          <text x="476" y="158" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0f172a">・段階的警告表示</text>
          <text x="476" y="178" text-anchor="middle" font-size="8.8" font-weight="700" fill="#0f172a">・動画安全クローズ</text>
          <text x="476" y="206" text-anchor="middle" font-size="8.2" font-weight="800" fill="#be123c">IEC 62368-1 準拠</text>
        `,
      });

    case 'xr_watchdog_pg_supervisor':
      return renderBionzDiagram({
        code: 'xr69',
        badge: 'XR69',
        accent: '#0d9488',
        accentSoft: '#ccfbf1',
        accentDark: '#115e59',
        title: '電圧監視・ウォッチドッグ ＆ PGラダー',
        metric: '±0.5% / 2.4μA',
        analogyLine1: 'SDカード書込中の電圧低下や頭脳のフリーズを見張り、データ破損を絶対に防ぐ「番犬IC」。',
        analogyLine2: '4本の重要電源が100%安定した瞬間を確認してからリセット解除し、確実起動を保証！',
        chipHow: '4系統PG確認＋WDT番犬',
        chipBenefit: '写真・動画ファイル破損を防止',
        chipSpec: 'TI TPS3808 / ±0.5%',
        art: (p) => `
          <!-- 4 Power-Good Rails Ladder -->
          ${[
            { y: 74, lbl: 'PG_CORE (0.75 V)', ok: 'OK ✓' },
            { y: 112, lbl: 'PG_DDR  (1.05 V)', ok: 'OK ✓' },
            { y: 150, lbl: 'PG_IO   (1.80 V)', ok: 'OK ✓' },
            { y: 188, lbl: 'PG_CARD (3.30 V)', ok: 'OK ✓' },
          ]
            .map(
              (r) => `
            <rect x="30" y="${r.y}" width="166" height="30" rx="6" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
            <text x="42" y="${r.y + 19}" font-size="9.2" font-weight="800" fill="#134e4a">${r.lbl}</text>
            <text x="184" y="${r.y + 19}" text-anchor="end" font-size="9.2" font-weight="800" fill="#16a34a">${r.ok}</text>
            <line x1="196" y1="${r.y + 15}" x2="238" y2="146" stroke="#0d9488" stroke-width="2"/>
          `
            )
            .join('')}

          <!-- TI TPS3808 Supervisor + Watchdog -->
          <rect x="242" y="88" width="154" height="118" rx="10" fill="url(#${p}_teal)" stroke="#0f766e" stroke-width="2"/>
          <text x="319" y="114" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">TI TPS3808 番犬IC</text>
          <text x="319" y="134" text-anchor="middle" font-size="9" font-weight="700" fill="#ccfbf1">全レール ±0.5% 厳密監視</text>
          <text x="319" y="154" text-anchor="middle" font-size="8.8" font-weight="700" fill="#fef08a">遅延タイマ後 nRST 解除</text>
          <text x="319" y="174" text-anchor="middle" font-size="8.4" fill="#e2e8f0">生存パルス監視 (Watchdog)</text>
          <text x="319" y="192" text-anchor="middle" font-size="8.2" fill="#99f6e4">常時消費わずか 2.4 μA</text>
          ${stepBadge(254, 100, '1', '#0f766e')}

          <line x1="396" y1="146" x2="424" y2="146" stroke="#0d9488" stroke-width="2.8" marker-end="url(#${p}_arr_green)"/>

          <rect x="428" y="96" width="102" height="100" rx="9" fill="url(#${p}_si)"/>
          <text x="479" y="134" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">BIONZ XR</text>
          <text x="479" y="154" text-anchor="middle" font-size="9" font-weight="800" fill="#5eead4">nRST 安全起動</text>
          <text x="479" y="174" text-anchor="middle" font-size="8.2" fill="#cbd5e1">異常時は即保護</text>

          ${comparePill(30, 234, 240, false, '監視無し：電池切れ直前にカード破損')}
          ${comparePill(290, 234, 240, true, 'TPS3808監視：誤書込ゼロ＆自動復帰')}
        `,
      });

    case 'xr_active_vapor_ground_if':
      return renderBionzDiagram({
        code: 'xr70',
        badge: 'XR70',
        accent: '#b45309',
        accentSoft: '#fef3c7',
        accentDark: '#78350f',
        title: 'ベイパーチャンバー着座ドック ＆ BeCu接地ばね',
        metric: '2,000 W/mK級',
        analogyLine1: 'Cinema Line（FX3等）の冷却ファンや次世代蒸気放熱板へ熱を渡せる「銅の放熱ドック」。',
        analogyLine2: '横に並ぶ6本の金メッキばねが背面カバーと確実に触れ、電波ノイズを10mΩ以下で接地！',
        chipHow: '相変化PCM＋焼結銅＋BeCuばね',
        chipBenefit: '8K長回し冷却＆EMI低減',
        chipSpec: 'PCM 45°C / R<10mΩ',
        art: (p) => `
          <!-- Cross section of Vapor Chamber Dock + PCM + BeCu Spring Gasket -->
          <rect x="34" y="72" width="320" height="44" rx="8" fill="url(#${p}_cu)" stroke="#7c2d12" stroke-width="1.8" filter="url(#${p}_shadow)"/>
          <text x="194" y="92" text-anchor="middle" font-size="10.4" font-weight="800" fill="#ffffff">焼結銅マイクロ・ベイパーチャンバー着座ドック</text>
          <text x="194" y="108" text-anchor="middle" font-size="8.6" font-weight="700" fill="#fef3c7">実効熱伝導率 ~2,000 W/m·K（純銅の約5倍！）</text>
          ${stepBadge(48, 86, '1', '#b45309')}

          <!-- PCM Phase Change Pad -->
          <rect x="64" y="122" width="260" height="28" rx="6" fill="#334155" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="194" y="140" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fde047">相変化グラファイト・マトリックス PCM（45°Cで軟化密着）</text>

          <!-- SY-1122 Mainboard Base -->
          <rect x="34" y="156" width="492" height="32" rx="6" fill="url(#${p}_pcb)"/>
          <text x="280" y="176" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">SY-1122 メイン基板 放熱＆マルチポイント接地ゾーン（M1.4 真鍮ボス締結）</text>

          <!-- Right: 6 Beryllium-Copper EMI Spring Fingers -->
          <rect x="374" y="72" width="152" height="78" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="1.6"/>
          <text x="450" y="92" text-anchor="middle" font-size="9.6" font-weight="800" fill="#854d0e">6連 BeCu EMI接地ばね</text>
          ${Array.from({ length: 6 }, (_, i) => `<path d="M ${390 + i * 22} 144 Q ${396 + i * 22} 108 ${404 + i * 22} 118" fill="none" stroke="#eab308" stroke-width="3.2" stroke-linecap="round"/>`).join('')}
          <text x="450" y="142" text-anchor="middle" font-size="8.5" font-weight="800" fill="#92400e">接触抵抗 &lt; 10 mΩ 確実アース</text>
          ${stepBadge(388, 86, '2', '#ca8a04')}

          ${comparePill(34, 210, 236, true, 'α7 IV：ファンレスΣグラファイト直結')}
          ${comparePill(290, 210, 236, true, 'FX3 / 次世代：ベイパー＆ファン拡張対応')}
          <text x="280" y="258" text-anchor="middle" font-size="9.5" font-weight="700" fill="#78350f">スチル機とCinema Lineが共通のBIONZ XRプラットフォームで冷却拡張できる設計の象徴！</text>
        `,
      });

    default:
      return null;
  }
}
