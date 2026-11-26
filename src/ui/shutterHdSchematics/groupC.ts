import { PartExplanation } from '../../assemblies/types';
import { pill, shutterFrame } from './shared';

/**
 * Phase 34 Ultra-Detailed Shutter Technical Schematics — Group C (SH114–SH130, 17 schematics).
 */
export function renderShutterHdGroupC(type: PartExplanation['diagramType']): string | null {
  switch (type) {
    case 'shutter_boost_caps':
      return shutterFrame({
        code: 'SH114',
        title: '1/400s デュアル駆動・超低ESRブースト容量バンク',
        viewTag: 'パルス電源',
        accent: '#ca8a04',
        headerBg: '#fefce8',
        body: `
          <!-- Power delivery reservoir schematic -->
          <rect x="14" y="34" width="332" height="106" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="24" y="60" width="66" height="48" rx="4" fill="#f1f5f9" stroke="#64748b"/>
          <text x="57" y="81" text-anchor="middle" font-size="7" font-weight="700" fill="#334155">本体バッテリ</text>
          <text x="57" y="94" text-anchor="middle" font-size="6.4" fill="#64748b">定常充電</text>
          <line x1="90" y1="84" x2="116" y2="84" stroke="#64748b" stroke-width="1.6" marker-end="url(#a-SH114-slate)"/>
          <!-- Local Polymer Tantalum + MLCC Bank -->
          <rect x="118" y="46" width="110" height="76" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
          <text x="173" y="60" text-anchor="middle" font-size="7.1" font-weight="800" fill="#92400e">ローカル電力貯水池</text>
          <rect x="128" y="68" width="42" height="20" rx="2" fill="#eab308" stroke="#854d0e"/>
          <text x="149" y="81" text-anchor="middle" font-size="6.4" font-weight="700" fill="#422006">100μF×2</text>
          <rect x="176" y="68" width="42" height="20" rx="2" fill="#cbd5e1" stroke="#475569"/>
          <text x="197" y="81" text-anchor="middle" font-size="6.4" font-weight="700" fill="#0f172a">MLCC×4</text>
          <text x="173" y="106" text-anchor="middle" font-size="6.8" font-weight="700" fill="#b45309">合成 ESR &lt; 25 mΩ</text>
          <!-- High current surge arrow -->
          <line x1="228" y1="84" x2="258" y2="84" stroke="#dc2626" stroke-width="2.6" marker-end="url(#a-SH114-red)"/>
          <text x="243" y="74" text-anchor="middle" font-size="6.6" font-weight="800" fill="#dc2626">3–5 A!</text>
          <rect x="260" y="56" width="76" height="56" rx="5" fill="#eff6ff" stroke="#2563eb"/>
          <text x="298" y="76" text-anchor="middle" font-size="7.1" font-weight="700" fill="#1d4ed8">電磁ブースタ</text>
          <text x="298" y="89" text-anchor="middle" font-size="6.8" fill="#1e40af">2ms ターボ加速</text>
          <text x="298" y="102" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0284c7">1/400s 同調!</text>
        `,
        caption: '超低ESRタンタル＋MLCCがシャッター直近で3–5 Aの瞬間電流を供給し電圧降下を遮断',
      });

    case 'shutter_emi_pifilter':
      return shutterFrame({
        code: 'SH115',
        title: 'チャージモータEMI π型フィルタ＆PTCヒューズ',
        viewTag: 'EMC保護回路',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Pi-filter + PTC circuit diagram -->
          <rect x="14" y="32" width="332" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <!-- Motor RF source -->
          <circle cx="48" cy="78" r="18" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
          <text x="48" y="76" text-anchor="middle" font-size="7" font-weight="700" fill="#991b1b">モータ</text>
          <text x="48" y="87" text-anchor="middle" font-size="6" fill="#dc2626">ブラシRF</text>
          <!-- Series PTC + Ferrite beads -->
          <line x1="66" y1="78" x2="90" y2="78" stroke="#334155" stroke-width="1.8"/>
          <rect x="90" y="68" width="42" height="20" rx="3" fill="#dbeafe" stroke="#2563eb"/>
          <text x="111" y="81" text-anchor="middle" font-size="6.8" font-weight="700" fill="#1d4ed8">PTC保護</text>
          <line x1="132" y1="78" x2="160" y2="78" stroke="#334155" stroke-width="1.8"/>
          <!-- Shunt C1 -->
          <line x1="146" y1="78" x2="146" y2="112" stroke="#0284c7" stroke-width="1.6"/>
          <text x="146" y="123" text-anchor="middle" font-size="6.5" fill="#0284c7" font-weight="700">C1→GND</text>
          <!-- Ferrite L -->
          <rect x="160" y="68" width="52" height="20" rx="3" fill="#334155"/>
          <text x="186" y="81" text-anchor="middle" font-size="6.7" font-weight="700" fill="#fff">フェライトL</text>
          <line x1="212" y1="78" x2="246" y2="78" stroke="#334155" stroke-width="1.8"/>
          <!-- Shunt C2 -->
          <line x1="228" y1="78" x2="228" y2="112" stroke="#0284c7" stroke-width="1.6"/>
          <text x="228" y="123" text-anchor="middle" font-size="6.5" fill="#0284c7" font-weight="700">C2→GND</text>
          <!-- Clean CMOS rail -->
          <rect x="248" y="56" width="88" height="44" rx="5" fill="#dcfce7" stroke="#16a34a"/>
          <text x="292" y="74" text-anchor="middle" font-size="7" font-weight="700" fill="#166534">クリーン電源網</text>
          <text x="292" y="88" text-anchor="middle" font-size="6.8" font-weight="800" fill="#15803d">RF −40 dB 遮断</text>
          ${pill(180, 46, 180, 14, '10–300 MHz 横縞ノイズ抑止 ＋ 自動復帰ヒューズ', '#eff6ff', '#2563eb', '#1e40af', 6.5)}
        `,
        caption: 'フェライト＋MLCCのπ型フィルタがブラシ放電RFを−40 dB遮断し、PTCが拘束焼損を防止',
      });

    case 'shutter_tape_631s':
      return shutterFrame({
        code: 'SH116',
        title: 'Sony OEM 遮光テープ(631S #25)＆Ni-Cuシールド',
        viewTag: '純正実装',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- Layered tape + EMI foil + FPC cross section -->
          <rect x="16" y="32" width="206" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="28" y="46" width="182" height="18" rx="2" fill="#0f172a"/>
          <text x="119" y="58" text-anchor="middle" font-size="7" font-weight="700" fill="#f8fafc">① Ref.468 遮光テープ 631S #25 (黒)</text>
          <rect x="28" y="68" width="182" height="18" rx="2" fill="#94a3b8" stroke="#475569"/>
          <text x="119" y="80" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">② Ni-Cu 導電EMIシールド箔 (&gt;50dB)</text>
          <rect x="28" y="90" width="182" height="18" rx="2" fill="#d97706"/>
          <text x="119" y="102" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">③ シャッター駆動 FPC ケーブル</text>
          <rect x="28" y="112" width="182" height="18" rx="2" fill="#475569"/>
          <text x="119" y="124" text-anchor="middle" font-size="7" fill="#e2e8f0">④ マグネシウム筐体 GND (BeCu接地)</text>
          <!-- Right OEM box -->
          <rect x="230" y="32" width="116" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="288" y="48" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0f172a">ILCE-7M4 純正Ref</text>
          <text x="288" y="66" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0284c7">750000493</text>
          <text x="288" y="78" text-anchor="middle" font-size="6.5" fill="#475569">TAPE 631S #25 7mm</text>
          ${pill(288, 102, 102, 16, '光漏れ導光路を遮断', '#1e293b', '#0f172a', '#ffffff', 6.4)}
          ${pill(288, 124, 102, 16, 'ソレノイドEMI封止', '#e0f2fe', '#0284c7', '#0369a1', 6.4)}
        `,
        caption: 'Sony純正遮光テープ631S #25とNi-Cu導電箔でFPCからの漏光とソレノイドEMIを同時遮断',
      });

    case 'shutter_amr_angle':
      return shutterFrame({
        code: 'SH117',
        title: 'AMR磁気角度リニアエンコーダ（連続軌道追跡）',
        viewTag: '磁気センシング',
        accent: '#7c3aed',
        headerBg: '#f5f3ff',
        body: `
          <!-- Left: Rotating 2-pole magnet over AMR Wheatstone bridge -->
          <rect x="16" y="32" width="154" height="110" rx="5" fill="#f5f3ff" stroke="#c4b5fd"/>
          <path d="M52,58 L93,58 L93,74 L52,74 Z" fill="#2563eb"/>
          <path d="M93,58 L134,58 L134,74 L93,74 Z" fill="#ef4444"/>
          <text x="72" y="69" text-anchor="middle" font-size="7.5" font-weight="800" fill="#fff">N</text>
          <text x="114" y="69" text-anchor="middle" font-size="7.5" font-weight="800" fill="#fff">S</text>
          <text x="93" y="49" text-anchor="middle" font-size="6.8" font-weight="700" fill="#5b21b6">駆動軸 N52 磁石</text>
          <text x="93" y="87" text-anchor="middle" font-size="6.5" fill="#64748b">非接触 0.8 mm ギャップ</text>
          <rect x="52" y="96" width="82" height="24" rx="4" fill="#1e293b" stroke="#7c3aed" stroke-width="1.4"/>
          <text x="93" y="111" text-anchor="middle" font-size="7" font-weight="700" fill="#ddd6fe">AMR 角度IC</text>
          <text x="93" y="134" text-anchor="middle" font-size="6.6" fill="#5b21b6">分解能 0.05° / 遅延 &lt; 2μs</text>
          <!-- Right: sin(2θ) / cos(2θ) continuous waveforms -->
          <rect x="178" y="32" width="168" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="262" y="46" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0f172a">θ(t) = ½ atan2(V_sin, V_cos)</text>
          <line x1="190" y1="84" x2="336" y2="84" stroke="#cbd5e1"/>
          <path d="M192,84 Q214,52 236,84 T280,84 T324,84" fill="none" stroke="#7c3aed" stroke-width="2"/>
          <path d="M192,62 Q214,84 236,106 T280,62 T324,106" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="220" y="59" font-size="6.5" fill="#7c3aed" font-weight="700">sin(2θ)</text>
          <text x="296" y="61" font-size="6.5" fill="#0284c7" font-weight="700">cos(2θ)</text>
          ${pill(262, 126, 148, 16, '全コース連続計測→アクティブ制動制御', '#ede9fe', '#7c3aed', '#5b21b6', 6.4)}
        `,
        caption: '直交AMRブリッジが駆動軸の回転角θ(t)を0.05°精度で連続追跡し電磁サーボ制御を実現',
      });

    case 'shutter_xsync_thyristor':
      return shutterFrame({
        code: 'SH118',
        title: 'X接点保護・高耐圧フォトカプラ＆サイリスタ絶縁段',
        viewTag: '高耐圧絶縁',
        accent: '#e11d48',
        headerBg: '#fff1f2',
        body: `
          <!-- Galvanic isolation barrier between X-contact and 250V strobe -->
          <rect x="14" y="32" width="332" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <!-- Camera MCU / X-contact side -->
          <rect x="24" y="54" width="84" height="66" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
          <text x="66" y="72" text-anchor="middle" font-size="7.1" font-weight="700" fill="#15803d">機械 X接点</text>
          <text x="66" y="86" text-anchor="middle" font-size="6.8" fill="#166534">I &lt; 1 mA 微小信号</text>
          <text x="66" y="100" text-anchor="middle" font-size="6.5" font-weight="700" fill="#059669">無火花・半永久寿命</text>
          <!-- Optical Isolation Barrier -->
          <rect x="128" y="48" width="82" height="78" rx="5" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>
          <line x1="169" y1="48" x2="169" y2="126" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 2"/>
          <text x="169" y="64" text-anchor="middle" font-size="6.9" font-weight="700" fill="#854d0e">フォトカプラ</text>
          <line x1="146" y1="86" x2="192" y2="86" stroke="#f59e0b" stroke-width="2" marker-end="url(#a-SH118-amber)"/>
          <text x="169" y="104" text-anchor="middle" font-size="6.5" fill="#b91c1c" font-weight="700">沿面絶縁スリット</text>
          <text x="169" y="116" text-anchor="middle" font-size="6.3" fill="#475569">光で電気完全分離</text>
          <!-- High-voltage SCR/IGBT Strobe side -->
          <rect x="230" y="54" width="106" height="66" rx="5" fill="#fff1f2" stroke="#e11d48"/>
          <text x="283" y="72" text-anchor="middle" font-size="7.1" font-weight="700" fill="#9f1239">250V サイリスタ/IGBT</text>
          <text x="283" y="87" text-anchor="middle" font-size="6.8" fill="#be123c">スタジオ大型ストロボ</text>
          <text x="283" y="102" text-anchor="middle" font-size="6.6" font-weight="700" fill="#e11d48">遅延 &lt; 5 μs 高速点火</text>
          <line x1="108" y1="86" x2="126" y2="86" stroke="#16a34a" stroke-width="1.6" marker-end="url(#a-SH118-green)"/>
          <line x1="210" y1="86" x2="228" y2="86" stroke="#e11d48" stroke-width="1.6" marker-end="url(#a-SH118-red)"/>
        `,
        caption: 'X接点に微小電流のみ通し、250 V級ストロボ放電はフォトカプラ＋サイリスタ絶縁段が担当',
      });

    case 'shutter_jis_metrology':
      return shutterFrame({
        code: 'SH119',
        title: 'JIS B 7091 準拠 3点露出ムラ光学検査基準',
        viewTag: '規格計測',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Left: 36x24 frame with 3x 0.2mm metrology slits -->
          <rect x="16" y="32" width="144" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="46" width="108" height="72" rx="3" fill="#1e293b" stroke="#64748b"/>
          ${[62, 82, 102]
            .map(
              (y, idx) => `
            <rect x="76" y="${y - 2}" width="24" height="4" fill="#38bdf8"/>
            <text x="118" y="${y + 2.5}" font-size="6.4" fill="#e0f2fe">点${idx + 1}</text>
          `
            )
            .join('')}
          <line x1="56" y1="54" x2="56" y2="110" stroke="#facc15" stroke-width="1.5" marker-end="url(#a-SH119-amber)"/>
          <text x="88" y="134" text-anchor="middle" font-size="6.6" font-weight="700" fill="#0369a1">検出器スリット幅 ≤ 0.2 mm</text>
          <!-- Right: JIS B 7091 formula & uniformity check -->
          <rect x="168" y="32" width="178" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="257" y="47" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">JIS B 7091 評価アルゴリズム</text>
          <!-- 3 trapezoidal exposure pulses -->
          ${[64, 84, 104]
            .map(
              (y, i) => `
            <text x="180" y="${y + 3}" font-size="6.5" fill="#475569">t${i + 1}</text>
            <path d="M196,${y + 5} L216,${y + 5} L222,${y - 5} L264,${y - 5} L270,${y + 5} L294,${y + 5}" fill="none" stroke="#0284c7" stroke-width="1.6"/>
            <text x="320" y="${y + 3}" text-anchor="middle" font-size="6.4" fill="#0369a1">1±0.5% E₀</text>
          `
            )
            .join('')}
          ${pill(257, 128, 162, 16, '露出ムラ r = log₁₀(t_max / t_min) → QR校正', '#e0f2fe', '#0284c7', '#0369a1', 6.4)}
        `,
        caption: '幅0.2 mmの3点スリットで上・中・下の有効露出時間を実測し、ムラ指標rを工場保証',
      });

    case 'shutter_oem_heat_top':
      return shutterFrame({
        code: 'SH120',
        title: 'Sony OEM 上部放熱プレート (Ref.453: 474824101)',
        viewTag: '熱設計OEM',
        accent: '#d97706',
        headerBg: '#fffbeb',
        body: `
          <!-- Thermal stack vertical cutaway around mecha crown -->
          <rect x="16" y="32" width="206" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="42" width="170" height="14" rx="2" fill="#1e293b"/>
          <text x="119" y="52" text-anchor="middle" font-size="6.6" fill="#f8fafc">Ref.454 グラファイトシート TOP A</text>
          <rect x="34" y="60" width="170" height="18" rx="2" fill="#d97706" stroke="#92400e"/>
          <text x="119" y="72" text-anchor="middle" font-size="7" font-weight="800" fill="#ffffff">Ref.453 AS HEAT PLATE TOP</text>
          <rect x="52" y="82" width="134" height="14" rx="2" fill="#38bdf8" stroke="#0284c7"/>
          <text x="119" y="92" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0c4a6e">Ref.470 放熱スペーサー TOP</text>
          <rect x="34" y="102" width="170" height="28" rx="3" fill="#475569"/>
          <text x="119" y="119" text-anchor="middle" font-size="7" fill="#fff">Ref.451 メカデバイス（シャッター＆ソレノイド）</text>
          <!-- Heat upward arrows -->
          <line x1="48" y1="100" x2="48" y2="58" stroke="#ef4444" stroke-width="1.8" marker-end="url(#a-SH120-red)"/>
          <line x1="190" y1="100" x2="190" y2="58" stroke="#ef4444" stroke-width="1.8" marker-end="url(#a-SH120-red)"/>
          <!-- Right OEM spec card -->
          <rect x="230" y="32" width="116" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="288" y="48" text-anchor="middle" font-size="7.1" font-weight="700" fill="#92400e">ILCE-7M4 純正構成</text>
          <text x="288" y="66" text-anchor="middle" font-size="6.8" font-weight="700" fill="#0f172a">P/N: 474824101</text>
          <text x="288" y="82" text-anchor="middle" font-size="6.6" fill="#334155">連写ソレノイド発熱を</text>
          <text x="288" y="93" text-anchor="middle" font-size="6.6" fill="#334155">ボディ天板へ熱架橋</text>
          ${pill(288, 120, 102, 18, '暗電流＆熱膨張抑止', '#fef3c7', '#d97706', '#92400e', 6.5)}
        `,
        caption: 'Sony純正Ref.453上部放熱プレートがシャッター駆動部の熱を天板グラファイト側へバイパス',
      });

    case 'shutter_oem_heat_spacer':
      return shutterFrame({
        code: 'SH121',
        title: 'Sony OEM 放熱スペーサー (Ref.470: 503058201)',
        viewTag: '応力＆熱管理',
        accent: '#0284c7',
        headerBg: '#f0f9ff',
        body: `
          <!-- Compression limiter + TIM pad cutaway -->
          <rect x="16" y="32" width="194" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="30" y="44" width="166" height="14" fill="#d97706"/>
          <text x="113" y="54" text-anchor="middle" font-size="6.6" font-weight="700" fill="#fff">Ref.453 上部放熱プレート</text>
          <!-- Elastic TIM spacer compressed 20% -->
          <rect x="66" y="58" width="94" height="32" rx="3" fill="#38bdf8" stroke="#0284c7"/>
          <text x="113" y="77" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0c4a6e">弾性TIM (圧縮20%)</text>
          <!-- Twin brass compression limiters -->
          <rect x="42" y="58" width="18" height="32" fill="#eab308" stroke="#854d0e"/>
          <rect x="166" y="58" width="18" height="32" fill="#eab308" stroke="#854d0e"/>
          <rect x="30" y="90" width="166" height="18" fill="#475569"/>
          <text x="113" y="102" text-anchor="middle" font-size="6.6" fill="#fff">シャッター筐体（歪みストレスゼロ!）</text>
          <text x="113" y="126" text-anchor="middle" font-size="6.6" fill="#854d0e" font-weight="700">両端真鍮カラーが潰れ過ぎを機械規制</text>
          <!-- Right summary -->
          <rect x="218" y="32" width="128" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="282" y="48" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0369a1">P/N: 503058201</text>
          ${pill(282, 70, 114, 17, '① 接触熱抵抗 R_th 極小', '#e0f2fe', '#0284c7', '#0369a1', 6.5)}
          ${pill(282, 94, 114, 17, '② 羽根室 0.15mm 歪み防止', '#dcfce7', '#16a34a', '#166534', 6.4)}
          ${pill(282, 118, 114, 17, '③ 放熱板の板鳴り遮断', '#fef3c7', '#d97706', '#92400e', 6.5)}
        `,
        caption: '圧縮リミッタ付弾性熱スペーサーが、繊細なシャッター枠を歪ませず放熱板へ熱結合',
      });

    case 'shutter_oem_graphite_top':
      return shutterFrame({
        code: 'SH122',
        title: 'Sony OEM グラファイトシート TOP A (Ref.454)',
        viewTag: '異方性放熱',
        accent: '#1e293b',
        headerBg: '#f1f5f9',
        body: `
          <!-- Anisotropic lateral heat spreading diagram -->
          <rect x="16" y="32" width="200" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Polyimide sealed PGS sheet -->
          <rect x="26" y="64" width="180" height="24" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
          <rect x="34" y="69" width="164" height="14" rx="2" fill="#1e293b"/>
          <text x="116" y="79" text-anchor="middle" font-size="6.8" font-weight="700" fill="#f8fafc">25μm PGS (k ≈ 1500 W/m·K)</text>
          <!-- Hot spot beneath right side -->
          <rect x="148" y="96" width="44" height="22" rx="3" fill="#ef4444"/>
          <text x="170" y="110" text-anchor="middle" font-size="6.8" font-weight="700" fill="#fff">熱源</text>
          <!-- Rapid lateral arrows -->
          <line x1="170" y1="95" x2="170" y2="85" stroke="#ef4444" stroke-width="1.8" marker-end="url(#a-SH122-red)"/>
          <line x1="158" y1="54" x2="42" y2="54" stroke="#dc2626" stroke-width="2.2" marker-end="url(#a-SH122-red)"/>
          <text x="100" y="48" text-anchor="middle" font-size="6.8" font-weight="700" fill="#dc2626">純銅の約4倍で一気に水平拡散!</text>
          <text x="116" y="132" text-anchor="middle" font-size="6.5" fill="#b45309">周囲PET絶縁シールで炭素粉飛散ゼロ</text>
          <!-- Right OEM info -->
          <rect x="224" y="32" width="122" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="285" y="48" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0f172a">P/N: 500490202</text>
          <text x="285" y="66" text-anchor="middle" font-size="6.7" fill="#334155">面内 k_xy ≈ 1500</text>
          <text x="285" y="80" text-anchor="middle" font-size="6.7" fill="#64748b">厚み k_z ≈ 15 W/m·K</text>
          ${pill(285, 104, 108, 16, 'ホットスポット均熱化', '#fee2e2', '#dc2626', '#991b1b', 6.5)}
          ${pill(285, 126, 108, 15, '光軸熱ドリフト抑制', '#e0f2fe', '#0284c7', '#0369a1', 6.4)}
        `,
        caption: '銅の約4倍の水平熱伝導を持つ純正PGSシートが駆動部ホットスポットを瞬時に均熱拡散',
      });

    case 'shutter_oem_mask_sheet':
      return shutterFrame({
        code: 'SH123',
        title: 'Sony OEM 前面開口マスクシート (Ref.566/567)',
        viewTag: '迷光遮断',
        accent: '#0f172a',
        headerBg: '#f1f5f9',
        body: `
          <!-- Optical cone + matte black aperture mask blocking off-axis rays -->
          <rect x="14" y="30" width="218" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <!-- Matte mask top & bottom -->
          <rect x="110" y="38" width="12" height="32" fill="#0f172a"/>
          <rect x="110" y="104" width="12" height="32" fill="#0f172a"/>
          <rect x="124" y="38" width="5" height="32" fill="#d97706"/>
          <rect x="124" y="104" width="5" height="32" fill="#d97706"/>
          <!-- Valid imaging rays -->
          <line x1="24" y1="87" x2="210" y2="87" stroke="#2563eb" stroke-width="2" marker-end="url(#a-SH123-blue)"/>
          <line x1="24" y1="68" x2="210" y2="74" stroke="#3b82f6" stroke-width="1.4"/>
          <line x1="24" y1="106" x2="210" y2="100" stroke="#3b82f6" stroke-width="1.4"/>
          <!-- Stray oblique light absorbed -->
          <line x1="24" y1="42" x2="109" y2="54" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-SH123-red)"/>
          <line x1="24" y1="132" x2="109" y2="120" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 2" marker-end="url(#a-SH123-red)"/>
          <rect x="212" y="64" width="10" height="46" fill="#1d6d7c"/>
          <text x="68" y="45" font-size="6.5" fill="#dc2626" font-weight="700">画面外迷光→吸収</text>
          <text x="166" y="60" font-size="6.5" fill="#b45309" font-weight="700">Ref.567 PSA</text>
          <text x="168" y="122" font-size="6.5" fill="#1d6d7c" font-weight="700">36×24 像面</text>
          <!-- Right OEM card -->
          <rect x="240" y="30" width="106" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="293" y="46" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">Sony OEM 純正</text>
          <text x="293" y="62" text-anchor="middle" font-size="6.5" fill="#334155">Ref.566: 502816301</text>
          <text x="293" y="74" text-anchor="middle" font-size="6.5" fill="#b45309">Ref.567: 502816401</text>
          <text x="293" y="95" text-anchor="middle" font-size="8" font-weight="800" fill="#0f172a">R &lt; 0.8%</text>
          ${pill(293, 122, 92, 16, '逆光フレア根絶', '#1e293b', '#0f172a', '#ffffff', 6.6)}
        `,
        caption: 'Eマウント直後の超艶消しマスクシート＆専用PSAテープが画面外斜め光の反射フレアを吸収',
      });

    case 'shutter_oem_adjust_washer':
      return shutterFrame({
        code: 'SH124',
        title: 'Sony OEM 12段階選別厚み調整シム (Ref.456)',
        viewTag: 'ミクロ校正',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- 12-grade stepped shim bar chart (25 um to 600 um) -->
          <rect x="16" y="30" width="194" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="113" y="44" text-anchor="middle" font-size="7" font-weight="700" fill="#1d4ed8">IM ADJUST WASHER D（25–600 μm）</text>
          ${[12, 18, 25, 32, 40, 49, 58, 68]
            .map(
              (h, i) => `
            <rect x="${28 + i * 21}" y="${118 - h}" width="15" height="${h}" rx="2" fill="${i < 3 ? '#93c5fd' : i < 6 ? '#3b82f6' : '#1d4ed8'}"/>
          `
            )
            .join('')}
          <text x="36" y="132" text-anchor="middle" font-size="6.2" fill="#475569">25μm</text>
          <text x="112" y="132" text-anchor="middle" font-size="6.2" fill="#475569">刻印 10〜60 (12段階)</text>
          <text x="184" y="132" text-anchor="middle" font-size="6.2" fill="#1d4ed8" font-weight="700">600μm</text>
          <!-- Right precision alignment -->
          <rect x="218" y="30" width="128" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="282" y="46" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">3点レーザー選別</text>
          <text x="282" y="64" text-anchor="middle" font-size="6.6" fill="#334155">455838701〜468772712</text>
          <text x="282" y="82" text-anchor="middle" font-size="7.5" font-weight="800" fill="#2563eb">平行度 ±5 μm</text>
          <text x="282" y="98" text-anchor="middle" font-size="6.5" fill="#475569">F1.2 開放片ボケ根絶</text>
          ${pill(282, 122, 112, 16, 'フランジ＆d_s 精密規定', '#dbeafe', '#2563eb', '#1e40af', 6.5)}
        `,
        caption: '25–600 µmの12段階純正シムをレーザー実測選別し、平行度±5 µmでF1.2片ボケを根絶',
      });

    case 'shutter_afe3379_rib':
      return shutterFrame({
        code: 'SH125',
        title: '50万回耐久 AFE-3379 トラス補強骨格＆サブマウント',
        viewTag: '構造力学',
        accent: '#475569',
        headerBg: '#f1f5f9',
        body: `
          <!-- Truss rib + dual damped sub-mount -->
          <rect x="16" y="32" width="194" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="34" y="54" width="158" height="54" rx="4" fill="none" stroke="#334155" stroke-width="4"/>
          <!-- Triangulated truss struts -->
          <path d="M36,106 L62,56 L88,106 L114,56 L140,106 L166,56 L190,106" fill="none" stroke="#475569" stroke-width="2.4"/>
          <!-- Side damped sub-mounts -->
          <circle cx="26" cy="81" r="8" fill="#0d9488" stroke="#115e59"/>
          <circle cx="200" cy="81" r="8" fill="#0d9488" stroke="#115e59"/>
          <text x="113" y="46" text-anchor="middle" font-size="6.9" font-weight="700" fill="#0f172a">三角形トラス補強リブ（剛性 2×）</text>
          <text x="113" y="128" text-anchor="middle" font-size="6.6" fill="#0f766e" font-weight="700">両端ブチル防振サブマウント支持</text>
          <!-- Right upgrade comparison -->
          <rect x="218" y="32" width="128" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="282" y="48" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">Sony ユニット世代比較</text>
          ${pill(282, 68, 114, 17, 'AFE-3360: 標準 20万回級', '#f1f5f9', '#64748b', '#334155', 6.4)}
          <line x1="282" y1="78" x2="282" y2="88" stroke="#2563eb" stroke-width="1.5" marker-end="url(#a-SH125-blue)"/>
          ${pill(282, 99, 114, 19, 'AFE-3379: 上位 50万回級', '#dbeafe', '#2563eb', '#1d4ed8', 6.5)}
          <text x="282" y="128" text-anchor="middle" font-size="6.7" font-weight="700" fill="#059669">ねじれ共振 &gt; 2.0 kHz</text>
        `,
        caption: '三角形トラス補強でねじれ剛性を約2倍へ高め、共振周波数2 kHz超と50万回耐久を実現',
      });

    case 'shutter_micro_fasteners':
      return shutterFrame({
        code: 'SH126',
        title: '極小ねじ(M1.0/1.2)・Eリング＆嫌気性ロック剤',
        viewTag: '締結工学',
        accent: '#2563eb',
        headerBg: '#eff6ff',
        body: `
          <!-- Left: Screw with blue anaerobic thread-locker -->
          <rect x="16" y="32" width="154" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <path d="M58,48 Q93,38 128,48 L128,58 L58,58 Z" fill="#94a3b8" stroke="#334155"/>
          <rect x="82" y="58" width="22" height="54" fill="#cbd5e1" stroke="#475569"/>
          <!-- Blue anaerobic thread locker zone -->
          <rect x="79" y="76" width="28" height="28" rx="2" fill="#2563eb" opacity="0.55" stroke="#1d4ed8"/>
          <text x="93" y="128" text-anchor="middle" font-size="6.7" font-weight="700" fill="#1d4ed8">青色嫌気性ねじロック剤</text>
          <text x="93" y="138" text-anchor="middle" font-size="6.2" fill="#475569">M1.0/M1.2 振動緩みゼロ</text>
          <!-- Right: 3-prong SUS304 E-ring circlip -->
          <rect x="178" y="32" width="168" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="262" y="46" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0f172a">SUS304 3爪E形止め輪 (Eリング)</text>
          <path d="M236,68 A26,26 0 1,1 236,104 L244,98 A17,17 0 1,0 244,74 Z" fill="#64748b" stroke="#1e293b"/>
          <circle cx="262" cy="86" r="10" fill="#e2e8f0" stroke="#475569"/>
          <!-- 3 prongs -->
          <rect x="259" y="69" width="6" height="7" fill="#334155"/>
          <rect x="272" y="83" width="7" height="6" fill="#334155"/>
          <rect x="259" y="96" width="6" height="7" fill="#334155"/>
          ${pill(262, 128, 146, 15, '50万回 3,000G衝撃でも軸抜けゼロ', '#eff6ff', '#2563eb', '#1e40af', 6.5)}
        `,
        caption: '低アウトガス嫌気性ロック剤と3爪Eリングが、50万回の衝撃振動下での脱落を完全阻止',
      });

    case 'shutter_ds_bokeh_baffle':
      return shutterFrame({
        code: 'SH127',
        title: '光学距離 d_s 最小化＆F1.2丸ボケ欠け対策',
        viewTag: '光学効率式',
        accent: '#0891b2',
        headerBg: '#ecfeff',
        body: `
          <!-- Ray cone showing F1.2 vignetting when d_s is too large vs minimized -->
          <rect x="14" y="30" width="210" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <!-- Lens exit pupil on left -> sensor on right -->
          <line x1="26" y1="42" x2="206" y2="87" stroke="#0284c7" stroke-width="1.5"/>
          <line x1="26" y1="132" x2="206" y2="87" stroke="#0284c7" stroke-width="1.5"/>
          <polygon points="26,42 206,87 26,132" fill="#38bdf8" opacity="0.14"/>
          <!-- Shutter plane at distance d_s from sensor -->
          <rect x="148" y="38" width="6" height="36" fill="#0f172a"/>
          <rect x="148" y="100" width="6" height="36" fill="#0f172a"/>
          <rect x="206" y="48" width="8" height="78" fill="#1d6d7c"/>
          <!-- d_s bracket -->
          <line x1="155" y1="128" x2="204" y2="128" stroke="#dc2626" stroke-width="1.6" marker-start="url(#a-SH127-red)" marker-end="url(#a-SH127-red)"/>
          <text x="180" y="124" text-anchor="middle" font-size="7" font-weight="800" fill="#dc2626">d_s (最小化)</text>
          <text x="136" y="89" text-anchor="end" font-size="6.8" font-weight="700" fill="#0f172a">スリット W</text>
          <text x="48" y="89" font-size="7" font-weight="700" fill="#0369a1">F1.2 大口径光錐</text>
          <!-- Right JOSA efficiency formula & bokeh shape -->
          <rect x="232" y="30" width="114" height="114" rx="5" fill="#ecfeff" stroke="#67e8f9"/>
          <text x="289" y="46" text-anchor="middle" font-size="7" font-weight="700" fill="#155e75">JOSA 光学効率式</text>
          <text x="289" y="64" text-anchor="middle" font-size="7.6" font-weight="800" fill="#0e7490">η = W / (W + d_s/A)</text>
          <!-- Bokeh comparison -->
          <path d="M250,94 A12,12 0 1,1 274,94 L274,98 L250,98 Z" fill="#fca5a5" stroke="#dc2626"/>
          <text x="262" y="110" text-anchor="middle" font-size="6.2" fill="#dc2626">d_s大:欠け</text>
          <circle cx="316" cy="92" r="12" fill="#86efac" stroke="#16a34a"/>
          <text x="316" y="110" text-anchor="middle" font-size="6.2" fill="#15803d" font-weight="700">d_s小:真円</text>
          ${pill(289, 130, 100, 14, 'ナイフエッジ薄肉化', '#cffafe', '#0891b2', '#155e75', 6.4)}
        `,
        caption: 'シャッター〜像面距離d_sを0.1 mm単位で詰め、F1.2高速露光時の光学効率と真円ボケを守る',
      });

    case 'shutter_stub_shafts':
      return shutterFrame({
        code: 'SH128',
        title: '精密旋削SUS304／真鍮チャージ歯車支軸ピン',
        viewTag: '歯車軸設計',
        accent: '#64748b',
        headerBg: '#f8fafc',
        body: `
          <!-- Cross section of press-fit stub shaft with oil groove -->
          <rect x="16" y="32" width="180" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <rect x="28" y="96" width="156" height="18" fill="#475569"/>
          <!-- Brass press-fit collar -->
          <rect x="74" y="88" width="64" height="26" rx="2" fill="#eab308" stroke="#854d0e"/>
          <!-- Precision SUS304 h6 journal shaft -->
          <rect x="92" y="44" width="28" height="68" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.4"/>
          <!-- Micro oil retention groove -->
          <rect x="90" y="64" width="32" height="5" fill="#0284c7"/>
          <text x="150" y="69" font-size="6.4" font-weight="700" fill="#0284c7">油溜まり溝</text>
          <text x="106" y="130" text-anchor="middle" font-size="6.7" fill="#334155">JIS h6 (±4μm) 鏡面ジャーナル軸</text>
          <!-- Right gear center distance card -->
          <rect x="204" y="32" width="142" height="110" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="275" y="48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#0f172a">中心距離精度 Δa ≤ ±5 μm</text>
          <circle cx="250" cy="82" r="18" fill="#fef3c7" stroke="#d97706" stroke-width="1.6" stroke-dasharray="3 2"/>
          <circle cx="294" cy="82" r="24" fill="#e2e8f0" stroke="#475569" stroke-width="1.6" stroke-dasharray="3 2"/>
          <line x1="250" y1="82" x2="294" y2="82" stroke="#2563eb" stroke-width="1.5" marker-start="url(#a-SH128-blue)" marker-end="url(#a-SH128-blue)"/>
          ${pill(275, 124, 126, 16, '適正バックラッシュ・ギア鳴き0', '#eff6ff', '#2563eb', '#1e40af', 6.4)}
        `,
        caption: 'スイス自動盤削り出しh6支軸と圧入カラーで中心距離±5 µmを保ち、静かで高寿命な減速を実現',
      });

    case 'shutter_gs_sync_bus':
      return shutterFrame({
        code: 'SH129',
        title: 'メカ／EFCS／グローバルシャッター統合同期バス',
        viewTag: '時間調停',
        accent: '#4f46e5',
        headerBg: '#eef2ff',
        body: `
          <!-- Nonlinear EFCS row-reset curve matching mechanical rear curtain -->
          <rect x="16" y="30" width="204" height="114" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
          <line x1="32" y1="124" x2="208" y2="124" stroke="#94a3b8"/>
          <line x1="32" y1="44" x2="32" y2="124" stroke="#94a3b8"/>
          <!-- Electronic front curtain nonlinear curve -->
          <path d="M44,50 C76,52 104,116 138,120" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-dasharray="4 2"/>
          <!-- Mechanical rear curtain curve -->
          <path d="M98,50 C130,52 158,116 192,120" fill="none" stroke="#1e293b" stroke-width="2.4"/>
          <line x1="84" y1="74" x2="138" y2="74" stroke="#f59e0b" stroke-width="1.8" marker-start="url(#a-SH129-amber)" marker-end="url(#a-SH129-amber)"/>
          <text x="111" y="69" text-anchor="middle" font-size="6.7" font-weight="800" fill="#b45309">t_exp 一定!</text>
          <text x="58" y="96" font-size="6.5" font-weight="700" fill="#4f46e5">電子先幕(非等速)</text>
          <text x="176" y="96" text-anchor="middle" font-size="6.5" font-weight="700" fill="#0f172a">機械後幕</text>
          <text x="120" y="137" text-anchor="middle" font-size="6.5" fill="#475569">48 MHz 水晶 (21 ns 分解能) 行別同期</text>
          <!-- Right hybrid architecture -->
          <rect x="228" y="30" width="118" height="114" rx="5" fill="#eef2ff" stroke="#a5b4fc"/>
          <text x="287" y="46" text-anchor="middle" font-size="7" font-weight="700" fill="#3730a3">3方式 統合調停</text>
          ${pill(287, 67, 104, 16, '① メカ前後幕 (F1.2)', '#ffffff', '#475569', '#0f172a', 6.4)}
          ${pill(287, 90, 104, 16, '② EFCS 非線形行同期', '#dbeafe', '#2563eb', '#1d4ed8', 6.4)}
          ${pill(287, 113, 104, 16, '③ GS 1/80000s全速同調', '#ede9fe', '#7c3aed', '#5b21b6', 6.3)}
          <text x="287" y="136" text-anchor="middle" font-size="6.3" fill="#4338ca">差動LVDS 4レーン同期</text>
        `,
        caption: '48 MHz水晶基準バスが物理後幕の非線形軌道へCMOS電子先幕とGS露光をナノ秒級同期',
      });

    case 'shutter_thick_shield_cmp':
      return shutterFrame({
        code: 'SH130',
        title: 'メカシャッターレス専用・厚肉センサー保護シールド比較',
        viewTag: '次世代比較',
        accent: '#0f766e',
        headerBg: '#f0fdfa',
        body: `
          <!-- Left: Ultra-thin 0.05mm exposure curtain -->
          <rect x="14" y="32" width="156" height="110" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="92" y="46" text-anchor="middle" font-size="7.1" font-weight="700" fill="#334155">高速露光メカ幕 (α7 IV等)</text>
          <rect x="34" y="66" width="116" height="5" fill="#1e293b"/>
          <text x="92" y="84" text-anchor="middle" font-size="7" font-weight="700" fill="#0f172a">板厚 t = 0.05 mm CFRP</text>
          <text x="92" y="98" text-anchor="middle" font-size="6.6" fill="#475569">時速 40 km・3,000 G 走行</text>
          <text x="92" y="112" text-anchor="middle" font-size="6.5" fill="#dc2626">軽量最優先・接触に繊細</text>
          ${pill(92, 130, 126, 14, '剛性基準 D = 1×', '#e2e8f0', '#64748b', '#334155', 6.5)}
          <!-- Right: Dedicated thick 0.25mm armored shield (Z9/Z8 era) -->
          <rect x="180" y="32" width="166" height="110" rx="5" fill="#f0fdfa" stroke="#5eead4"/>
          <text x="263" y="46" text-anchor="middle" font-size="7.1" font-weight="700" fill="#0f766e">専用厚肉保護シールド (Z9/Z8等)</text>
          <rect x="200" y="59" width="126" height="19" rx="2" fill="#0f766e" stroke="#134e4a"/>
          <rect x="208" y="65" width="110" height="6" rx="1" fill="#99f6e4"/>
          <text x="263" y="91" text-anchor="middle" font-size="7" font-weight="800" fill="#115e59">板厚 t = 0.25 mm (5倍!)</text>
          <text x="263" y="104" text-anchor="middle" font-size="6.6" fill="#0f766e">ステッピング＋送りねじ静粛開閉</text>
          ${pill(263, 128, 142, 16, '曲げ剛性 D ∝ t³ = 125倍の堅牢性!', '#ccfbf1', '#0d9488', '#115e59', 6.6)}
        `,
        caption: '板厚5倍（0.25 mm）の専用装甲シールドは曲げ剛性125倍、ステッピング送りねじで確実防塵',
      });

    default:
      return null;
  }
}
