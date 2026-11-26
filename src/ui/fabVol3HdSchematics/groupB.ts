import { drawCompareFrame, drawKpiBox, drawPill, wrapFab3HdSvg } from './shared';

/**
 * Vol.3 Ultra-HD 720x470 Vector Infographics — Group B (12 Parts: F3-13–F3-24):
 * Block 2-B (P02-011–P02-022): ADC, AFE/CDS/DCG, Row Driver, SLVS-EC SerDes,
 * On-Sensor ISP/SRAM, 3D Cu-Cu Floorplan, Pixel Array, OB/Dummy, Logic P&R,
 * Partial Stack Chiplet, CMP Dummy Fill, Full-Chip OASIS + Guard Ring.
 */
export function renderVol3GroupBSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'fab3_p11_adc_circuit_design':
      return wrapFab3HdSvg({
        badge: 'F3-13',
        stepTag: 'P02-011 [論文/標準]',
        title: '列並列ADC / 画素並列ADC回路設計（14bit・1〜3 e-rms）',
        analogy: '微弱な光電圧を16,384段階の正確なデジタル値へ測り取る超低ノイズ電子秤の大軍団',
        accent: '#2563eb',
        accentSoft: '#eff6ff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="400" height="250" rx="10" fill="#f8fafc" stroke="#2563eb" stroke-width="1.4"/>
            <text x="200" y="20" text-anchor="middle" font-size="11.2" font-weight="800" fill="#1e3a8a">シングルスロープ列並列ADC ＆ 画素並列サブスレッショルドADC</text>
            <!-- Ramp waveform vs Pixel Voltage Crossing -->
            <rect x="20" y="34" width="218" height="132" rx="7" fill="#0f172a"/>
            <line x1="34" y1="150" x2="224" y2="150" stroke="#475569" stroke-width="1.2"/>
            <line x1="34" y1="46" x2="34" y2="150" stroke="#475569" stroke-width="1.2"/>
            <!-- Ramp slope -->
            <line x1="40" y1="52" x2="216" y2="146" stroke="#38bdf8" stroke-width="2.8"/>
            <!-- Pixel analog voltage line -->
            <line x1="34" y1="98" x2="220" y2="98" stroke="#f59e0b" stroke-width="2.2" stroke-dasharray="5 3"/>
            <!-- Intersection -->
            <circle cx="126" cy="98" r="6" fill="#22c55e" stroke="#ffffff" stroke-width="1.5"/>
            <line x1="126" y1="98" x2="126" y2="150" stroke="#22c55e" stroke-width="2" stroke-dasharray="3 2"/>
            <text x="128" y="72" font-size="9.2" font-weight="800" fill="#38bdf8">高精度ランプ波</text>
            <text x="166" y="92" font-size="9" font-weight="800" fill="#fbbf24">画素アナログ電圧</text>
            <text x="126" y="162" text-anchor="middle" font-size="9" font-weight="800" fill="#4ade80">交差時刻 → 14bit値確定！</text>
            <!-- 14bit counter stack on right -->
            <rect x="250" y="34" width="134" height="132" rx="7" fill="#eff6ff" stroke="#2563eb"/>
            <text x="317" y="54" text-anchor="middle" font-size="10.2" font-weight="800" fill="#1e40af">14bit デジタル出力</text>
            <text x="317" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="#0f172a">16,384 階調</text>
            <text x="317" y="98" text-anchor="middle" font-size="9.4" font-weight="700" fill="#0369a1">ランダムノイズ</text>
            <text x="317" y="116" text-anchor="middle" font-size="12" font-weight="900" fill="#059669">1 〜 3 e-rms級</text>
            <text x="317" y="142" text-anchor="middle" font-size="8.6" font-weight="700" fill="#475569">ISSCC 2025: 画素並列ADC</text>
            <!-- Smooth sky gradient vs Banding comparison -->
            <rect x="20" y="180" width="364" height="58" rx="8" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="202" y="198" text-anchor="middle" font-size="9.8" font-weight="800" fill="#0f172a">14bit精度が守る夕焼け・青空の滑らかさ</text>
            <rect x="34" y="206" width="160" height="22" rx="4" fill="url(#f313-eb)"/>
            <text x="114" y="220.5" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">✅ 滑らかな14bit階調</text>
            <g transform="translate(208, 206)">
              <rect x="0" y="0" width="32" height="22" fill="#1d4ed8"/><rect x="32" y="0" width="32" height="22" fill="#3b82f6"/>
              <rect x="64" y="0" width="32" height="22" fill="#60a5fa"/><rect x="96" y="0" width="32" height="22" fill="#93c5fd"/>
              <rect x="128" y="0" width="32" height="22" fill="#dbeafe"/>
              <text x="80" y="14.5" text-anchor="middle" font-size="9" font-weight="900" fill="#9f1239">❌ 縞(バンディング)</text>
            </g>
          </g>
          <g transform="translate(442, 82)">
            ${drawKpiBox(0, 0, 250, 78, '主要設計ツール', 'Virtuoso / SPICE', '過渡ノイズシミュレーション検証', '#2563eb')}
            ${drawKpiBox(0, 88, 250, 74, '先端アーキテクチャ', 'ISSCC 2025 画素並列', 'サブスレッショルド超省電力ADC', '#4f46e5')}
            ${drawPill(0, 174, 250, '1段偏る→空にバンディング縞模様', false)}
            ${drawPill(0, 208, 250, '14bit RAW現像でも階調破綻ゼロ', true)}
          </g>
        `,
        cards: [
          { label: '変換方式', line1: 'シングルスロープ / ΔΣ / ソニー', line2: 'ISSCC 2025画素並列ADC等' },
          { label: '目標性能', line1: '14bit（16,384階調）分解能＆', line2: 'ランダムノイズ 1〜3 e-rms級' },
          { label: '失敗すると写真に？', line1: 'ADC精度が1段階でも偏ると空の', line2: 'グラデーションに縞模様（バンディング）' },
        ],
      });

    case 'fab3_p12_afe_cds_dcg_design':
      return wrapFab3HdSvg({
        badge: 'F3-14',
        stepTag: 'P02-012 [確認済み/標準]',
        title: 'アナログフロントエンド＆CDS／同時二重ゲイン（DCG）設計',
        analogy: '風袋を引いて誤差を消すCDSと、暗部・明部を同時撮影する二重ゲイン回路',
        accent: '#3b82f6',
        accentSoft: '#eff6ff',
        body: `
          <g transform="translate(26, 82)">
            <!-- CDS Cancellation Diagram -->
            <rect x="0" y="0" width="328" height="250" rx="10" fill="#f8fafc" stroke="#3b82f6" stroke-width="1.4"/>
            <text x="164" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#1e40af">① CDS（相関二重サンプリング）引き算魔法</text>
            <rect x="20" y="36" width="128" height="66" rx="8" fill="#fee2e2" stroke="#e11d48"/>
            <text x="84" y="57" text-anchor="middle" font-size="10" font-weight="800" fill="#9f1239">リセット直後(V_rst)</text>
            <text x="84" y="75" text-anchor="middle" font-size="9.4" font-weight="700" fill="#881337">熱雑音 kTC ＋ 個体差</text>
            <text x="84" y="92" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">（ゼロ点サンプル）</text>
            <rect x="180" y="36" width="128" height="66" rx="8" fill="#dbeafe" stroke="#2563eb"/>
            <text x="244" y="57" text-anchor="middle" font-size="10" font-weight="800" fill="#1e40af">転送後(V_sig)</text>
            <text x="244" y="75" text-anchor="middle" font-size="9.4" font-weight="700" fill="#1d4ed8">光信号 ＋ 熱雑音 ＋ 個体差</text>
            <text x="244" y="92" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">（信号サンプル）</text>
            <!-- Subtract circle -->
            <circle cx="164" cy="134" r="18" fill="#059669"/>
            <text x="164" y="140" text-anchor="middle" font-size="18" font-weight="900" fill="#ffffff">−</text>
            <line x1="84" y1="102" x2="148" y2="128" stroke="#e11d48" stroke-width="2"/>
            <line x1="244" y1="102" x2="180" y2="128" stroke="#2563eb" stroke-width="2"/>
            <line x1="164" y1="152" x2="164" y2="176" stroke="#059669" stroke-width="2.5" marker-end="url(#f314-arrGreen)"/>
            <rect x="34" y="180" width="260" height="54" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
            <text x="164" y="201" text-anchor="middle" font-size="11" font-weight="900" fill="#14532d">純粋な光信号 V_sig のみ抽出！</text>
            <text x="164" y="220" text-anchor="middle" font-size="9.4" font-weight="700" fill="#166534">入力換算ノイズ：数十〜百数十 µVrms</text>
          </g>
          <g transform="translate(370, 82)">
            <rect x="0" y="0" width="322" height="162" rx="10" fill="#ffffff" stroke="#7c3aed" stroke-width="1.4"/>
            <text x="161" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="#5b21b6">② 同時二重ゲイン（α7 V / α7R VI / S1II）</text>
            <rect x="16" y="36" width="136" height="58" rx="8" fill="#eef2ff" stroke="#4f46e5"/>
            <text x="84" y="56" text-anchor="middle" font-size="10" font-weight="800" fill="#312e81">高変換ゲイン (HCG)</text>
            <text x="84" y="74" text-anchor="middle" font-size="9.2" font-weight="700" fill="#4338ca">暗部を超低ノイズ増幅</text>
            <rect x="170" y="36" width="136" height="58" rx="8" fill="#fffbeb" stroke="#d97706"/>
            <text x="238" y="56" text-anchor="middle" font-size="10" font-weight="800" fill="#92400e">低変換ゲイン (LCG)</text>
            <text x="238" y="74" text-anchor="middle" font-size="9.2" font-weight="700" fill="#b45309">明部の白飛びを粘る</text>
            <rect x="44" y="110" width="234" height="38" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.4"/>
            <text x="161" y="133" text-anchor="middle" font-size="10.2" font-weight="800" fill="#5b21b6">同時S&amp;H合成 → 驚異的ダイナミックレンジ！</text>
            ${drawPill(0, 174, 322, '設計不良→高ISOで縦縞・横縞(FPN)', false)}
            ${drawPill(0, 208, 322, 'Spectreモンテカルロ解析で縞ゼロ', true)}
          </g>
        `,
        cards: [
          { label: '主要回路', line1: 'CDS雑音キャンセル・PGA・', line2: '同時二重ゲイン用S&amp;H回路' },
          { label: '精度・検証', line1: '入力換算ノイズ 数十〜百数十µVrms', line2: 'SPICE/Spectreモンテカルロ解析' },
          { label: '失敗すると写真に？', line1: '高ISOの暗い写真に目障りな', line2: '「縦縞・横縞ノイズ(FPN)」が浮き出る' },
        ],
      });

    case 'fab3_p13_row_driver_tg':
      return wrapFab3HdSvg({
        badge: 'F3-15',
        stepTag: 'P02-013 [業界標準]',
        title: '行ドライバ＆タイミングジェネレーター（36mm長距離同時駆動）',
        analogy: '横36mmもの大ホールの全画素行をピコ秒狂いなく指揮する超精密メトロノーム',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="440" height="250" rx="10" fill="#f8fafc" stroke="#0284c7" stroke-width="1.4"/>
            <text x="220" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0c4a6e">横幅 36mm 画素アレイの左右デュアル行駆動＆RC遅延対策</text>
            <!-- Left & Right Row Drivers -->
            <rect x="18" y="40" width="66" height="154" rx="7" fill="#1e293b" stroke="#0284c7" stroke-width="1.6"/>
            <text x="51" y="114" text-anchor="middle" font-size="10" font-weight="800" fill="#38bdf8">左・行ドライバ</text>
            <text x="51" y="130" text-anchor="middle" font-size="8.8" font-weight="700" fill="#cbd5e1">TG/RST/SEL</text>
            <rect x="356" y="40" width="66" height="154" rx="7" fill="#1e293b" stroke="#0284c7" stroke-width="1.6"/>
            <text x="389" y="114" text-anchor="middle" font-size="10" font-weight="800" fill="#38bdf8">右・行ドライバ</text>
            <text x="389" y="130" text-anchor="middle" font-size="8.8" font-weight="700" fill="#cbd5e1">両端同期駆動</text>
            <!-- 36mm Horizontal Pixel Rows -->
            <rect x="94" y="44" width="252" height="146" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="4 2"/>
            ${[0, 1, 2, 3, 4]
              .map((i) => {
                const y = 60 + i * 28;
                return `<line x1="84" y1="${y}" x2="356" y2="${y}" stroke="${i === 2 ? '#ea580c' : '#0284c7'}" stroke-width="${i === 2 ? '3' : '1.6'}"/>`;
              })
              .join('')}
            <rect x="148" y="102" width="144" height="24" rx="12" fill="#ea580c"/>
            <text x="220" y="117.5" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">← 36 mm 同時転送パルス →</text>
            <!-- Clock precision strip -->
            <rect x="20" y="204" width="400" height="34" rx="7" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="220" y="225" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0f172a">タイミングジェネレーター精度：ピコ秒（ps）〜 ナノ秒（ns）級</text>
          </g>
          <g transform="translate(480, 82)">
            ${drawKpiBox(0, 0, 212, 76, '設計言語・検証', 'Verilog / STA', '静的タイミング解析で遅延保証', '#0284c7')}
            ${drawKpiBox(0, 86, 212, 76, '駆動スパン', '横 36 mm 全幅', '両端駆動で配線遅延差を消去', '#0891b2')}
            ${drawPill(0, 174, 212, '遅延→左右で明るさムラ発生', false)}
            ${drawPill(0, 208, 212, '画面左右端まで均一露光！', true)}
          </g>
        `,
        cards: [
          { label: '駆動精度', line1: '数千行のTG/RSTパルスを', line2: 'ピコ秒〜ナノ秒級で一斉・順次駆動' },
          { label: '設計・検証', line1: 'Verilog / SystemVerilog合成＆', line2: '静的タイミング検証（STA）' },
          { label: '失敗すると写真に？', line1: '36mm幅の配線で信号が遅れると', line2: '画面左右端で明るさが変わる横シェーディング' },
        ],
      });

    case 'fab3_p14_serdes_slvsec_design':
      return wrapFab3HdSvg({
        badge: 'F3-16',
        stepTag: 'P02-014 [確認済み/標準]',
        title: '超高速シリアル出力設計（SLVS-EC 12.5Gbps/レーン・16レーン）',
        analogy: '秒間何十億画素の14bit生データを16車線リニア専用線でエンジンへ一気に送る',
        accent: '#06b6d4',
        accentSoft: '#ecfeff',
        body: `
          <!-- Left: SerDes Eye Diagram Oscilloscope -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="332" height="250" rx="10" fill="#0f172a" stroke="#06b6d4" stroke-width="1.6"/>
            <text x="166" y="22" text-anchor="middle" font-size="11.2" font-weight="800" fill="#22d3ee">高速SerDes アイダイアグラム（SI検証）</text>
            <!-- Grid -->
            <line x1="28" y1="126" x2="304" y2="126" stroke="#334155" stroke-dasharray="4 3"/>
            <line x1="166" y1="42" x2="166" y2="210" stroke="#334155" stroke-dasharray="4 3"/>
            <!-- Open crisp eye curves -->
            <path d="M 32 64 C 90 64 114 190 166 190 C 218 190 242 64 300 64" fill="none" stroke="#22d3ee" stroke-width="3.2"/>
            <path d="M 32 190 C 90 190 114 64 166 64 C 218 64 242 190 300 190" fill="none" stroke="#38bdf8" stroke-width="3.2"/>
            <path d="M 32 72 C 94 72 118 182 166 182 C 214 182 238 72 300 72" fill="none" stroke="#a5f3fc" stroke-width="1.3" opacity="0.7"/>
            <path d="M 32 182 C 94 182 118 72 166 72 C 214 72 238 182 300 182" fill="none" stroke="#a5f3fc" stroke-width="1.3" opacity="0.7"/>
            <!-- Eye Opening Mask Hexagon -->
            <polygon points="122,126 146,96 186,96 210,126 186,156 146,156" fill="#10b981" fill-opacity="0.28" stroke="#34d399" stroke-width="2"/>
            <text x="166" y="130" text-anchor="middle" font-size="11" font-weight="900" fill="#6ee7b7">CLEAR EYE!</text>
            <text x="166" y="232" text-anchor="middle" font-size="9.6" font-weight="700" fill="#94a3b8">エンベデッドクロック差動伝送でスキュー解消</text>
          </g>
          <!-- Right: 16-Lane Benchmarks -->
          <g transform="translate(374, 82)">
            ${drawKpiBox(0, 0, 318, 76, 'ソニー SLVS-EC 規格 [確認済み]', '最大 12.5 Gbps / レーン', 'エンベデッドクロック超高速シリアルIF', '#0284c7')}
            ${drawKpiBox(0, 86, 318, 76, 'キヤノン 4.1億画素 LI8030SA [確認済み]', '32.8億画素/秒（16レーンSLVS）', '膨大な14bitデータをリアルタイム伝送', '#0891b2')}
            ${drawPill(0, 174, 318, '通信エラー→連写低下・画像にノイズ線', false)}
            ${drawPill(0, 208, 318, 'アイ開口確保→120fps / 8K RAW安定伝送', true)}
          </g>
        `,
        cards: [
          { label: '超高速規格', line1: 'ソニー SLVS-EC: 最大12.5Gbps/lane', line2: 'キヤノンLI8030SA: 32.8億画素/秒' },
          { label: '検証ツール', line1: '高速SerDes IP＋アイダイアグラム', line2: 'シグナルインテグリティ（SI）検証' },
          { label: '失敗すると写真に？', line1: '通信エラーで最高連写コマ数が落ち', line2: '画像に鋭いノイズのゴミ線が走る！' },
        ],
      });

    case 'fab3_p15_on_sensor_isp_sram':
      return wrapFab3HdSvg({
        badge: 'F3-17',
        stepTag: 'P02-015 [標準/推定]',
        title: 'ロジック側ISP前処理・バッファメモリ設計（40/28/22nm級）',
        analogy: 'センサー裏側に常駐し、白キズ補正・黒基準・連写バッファを捌く高速キッチン',
        accent: '#0891b2',
        accentSoft: '#ecfeff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="668" height="250" rx="10" fill="#f8fafc" stroke="#0891b2" stroke-width="1.4"/>
            <text x="334" y="22" text-anchor="middle" font-size="11.4" font-weight="800" fill="#155e75">ロジックウェーハ上 オンセンサー前処理パイプライン（40nm / 28nm / 22nm級 [推定]）</text>
            <!-- Pipeline Stages -->
            <rect x="20" y="42" width="134" height="92" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
            <text x="87" y="64" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0369a1">① 欠陥画素補正</text>
            <text x="87" y="84" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">白キズ・黒点を</text>
            <text x="87" y="99" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">リアルタイム自動補完</text>
            <line x1="156" y1="88" x2="178" y2="88" stroke="#0284c7" stroke-width="2.4" marker-end="url(#f317-arrBlue)"/>

            <rect x="182" y="42" width="134" height="92" rx="8" fill="#ffffff" stroke="#0891b2" stroke-width="1.5"/>
            <text x="249" y="64" text-anchor="middle" font-size="10.2" font-weight="800" fill="#0e7490">② OBクランプ</text>
            <text x="249" y="84" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">外周OB画素で毎行</text>
            <text x="249" y="99" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">真の黒レベルを固定</text>
            <line x1="318" y1="88" x2="340" y2="88" stroke="#0891b2" stroke-width="2.4" marker-end="url(#f317-arrBlue)"/>

            <rect x="344" y="42" width="134" height="92" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
            <text x="411" y="64" text-anchor="middle" font-size="10.2" font-weight="800" fill="#6d28d9">③ 4画素ビニング</text>
            <text x="411" y="84" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">動画・高感度時に</text>
            <text x="411" y="99" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">4画素加算で高速化</text>
            <line x1="480" y1="88" x2="502" y2="88" stroke="#7c3aed" stroke-width="2.4" marker-end="url(#f317-arrPurple)"/>

            <rect x="506" y="42" width="142" height="92" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
            <text x="577" y="64" text-anchor="middle" font-size="10.2" font-weight="800" fill="#047857">④ SRAM / 3層DRAM</text>
            <text x="577" y="84" text-anchor="middle" font-size="9.2" font-weight="600" fill="#065f46">超高速フレームバッファ</text>
            <text x="577" y="99" text-anchor="middle" font-size="9.2" font-weight="600" fill="#065f46">ブラックアウトフリー連写</text>

            <!-- EDA Flow & Bottom Status -->
            <rect x="20" y="150" width="628" height="36" rx="8" fill="#1e293b"/>
            <text x="334" y="172" text-anchor="middle" font-size="10.2" font-weight="800" fill="#38bdf8">論理合成：Synopsys Design Compiler / Cadence Genus  →  大規模 RTL 機能シミュレーション検証</text>
            ${drawPill(20, 200, 304, '処理詰まり→ブラックアウトフリー連写が途切れる', false)}
            ${drawPill(344, 200, 304, '超低遅延パイプライン→120fps途切れゼロ', true)}
          </g>
        `,
        cards: [
          { label: '搭載回路', line1: '欠陥画素補正・OBクランプ・', line2: '4画素加算ビニング・SRAM/DRAM IF' },
          { label: '論理世代', line1: '40nm / 28nm / 22nm級 [推定]', line2: 'Design Compiler / Genus 合成' },
          { label: '失敗すると写真に？', line1: 'リアルタイム処理が詰まると電子', line2: 'シャッターのブラックアウトフリー連写停止' },
        ],
      });

    case 'fab3_p16_cucu_3d_floorplan':
      return wrapFab3HdSvg({
        badge: 'F3-18',
        stepTag: 'P02-016 [論文/標準]',
        title: '3D積層インタコネクト（Cu-Cu接合）フロアプラン（5,040万接点）',
        analogy: '2階（画素）と1階（ロジック）を結ぶ何千万本もの銅製エレベーター配置図',
        accent: '#d97706',
        accentSoft: '#fffbeb',
        body: `
          <!-- 3D Cutaway of Pixel Wafer + Cu-Cu Pillar Matrix + Logic Wafer -->
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="420" height="250" rx="10" fill="#0f172a" stroke="#d97706" stroke-width="1.5"/>
            <text x="210" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#fde68a">上下階の銅エレベーター配置（ピッチ 1〜6µm級）</text>
            <!-- Top Pixel Wafer -->
            <rect x="34" y="38" width="352" height="44" rx="6" fill="#0284c7" stroke="#7dd3fc" stroke-width="1.5"/>
            <text x="210" y="65" text-anchor="middle" font-size="11.5" font-weight="800" fill="#ffffff">上階：画素ウェーハ裏面（配線最上層）</text>
            <!-- Dense Cu-Cu Hybrid Bond Pillars -->
            ${[0, 1, 2, 3, 4, 5, 6, 7]
              .map((i) => {
                const x = 52 + i * 44;
                const col = i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#ea580c' : '#38bdf8';
                const lbl = i % 3 === 0 ? 'VDD' : i % 3 === 1 ? 'SIG' : 'GND';
                return `<rect x="${x}" y="82" width="16" height="72" fill="${col}" stroke="#fef3c7" stroke-width="0.9"/>
                  <text x="${x + 8}" y="122" text-anchor="middle" font-size="7.6" font-weight="900" fill="#0f172a">${lbl}</text>`;
              })
              .join('')}
            <!-- Bottom Logic Wafer -->
            <rect x="34" y="154" width="352" height="46" rx="6" fill="#4f46e5" stroke="#a5b4fc" stroke-width="1.5"/>
            <text x="210" y="182" text-anchor="middle" font-size="11.5" font-weight="800" fill="#ffffff">下階：ロジックウェーハ表側（ADC・電源網）</text>
            <text x="210" y="226" text-anchor="middle" font-size="9.8" font-weight="700" fill="#fbbf24">画面中央の真下から直接電源を供給 → IRドロップ輝度ムラ解消！</text>
          </g>
          <g transform="translate(462, 82)">
            ${drawKpiBox(0, 0, 230, 76, '最先端接点数 [学会・論文]', '5,040万 接点', 'ISSCC 2025 発表 / 1〜6µmピッチ', '#d97706')}
            ${drawKpiBox(0, 86, 230, 76, '3D-IC EDAツール', 'Integrity 3D-IC', '3D IRドロップ・クロストーク解析', '#2563eb')}
            ${drawPill(0, 174, 230, '柱が偏る→画面中央IRドロップムラ', false)}
            ${drawPill(0, 208, 230, '均等配置→全面均一な電源電圧', true)}
          </g>
        `,
        cards: [
          { label: '接合密度', line1: 'Cu-Cu接合ピッチ 1〜6µm級', line2: 'ISSCC 2025では5,040万接点達成' },
          { label: '設計・解析', line1: 'Cadence Integrity 3D-IC等で', line2: '3D IRドロップ・クロストーク検証' },
          { label: '失敗すると写真に？', line1: '電源柱の配置が偏ると画面中央で', line2: '電圧降下（IRドロップ）し輝度ムラに' },
        ],
      });

    case 'fab3_p17_pixel_array_layout':
      return wrapFab3HdSvg({
        badge: 'F3-19',
        stepTag: 'P02-017 [業界標準]',
        title: '画素アレイ・カスタムレイアウト描画（1〜5nmグリッド対称配列）',
        analogy: '完璧な1画素図形を縦横4,000×6,000〜16,704×24,592回、1nmの隙間もなく敷く',
        accent: '#10b981',
        accentSoft: '#ecfdf5',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="356" height="250" rx="10" fill="#f8fafc" stroke="#10b981" stroke-width="1.4"/>
            <text x="178" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#065f46">2×2共有画素 鏡像対称レイアウト（グリッド 1〜5nm）</text>
            <!-- 2x2 Shared Pixel Precision Grid -->
            <g transform="translate(46, 36)">
              <rect x="0" y="0" width="124" height="90" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.8"/>
              <text x="62" y="48" text-anchor="middle" font-size="13" font-weight="900" fill="#991b1b">R 画素</text>
              <rect x="140" y="0" width="124" height="90" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="1.8"/>
              <text x="202" y="48" text-anchor="middle" font-size="13" font-weight="900" fill="#166534">Gr 画素</text>
              <rect x="0" y="106" width="124" height="90" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="1.8"/>
              <text x="62" y="154" text-anchor="middle" font-size="13" font-weight="900" fill="#166534">Gb 画素</text>
              <rect x="140" y="106" width="124" height="90" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.8"/>
              <text x="202" y="154" text-anchor="middle" font-size="13" font-weight="900" fill="#1e40af">B 画素</text>
              <!-- Shared Central FD Node -->
              <circle cx="132" cy="98" r="22" fill="#f59e0b" stroke="#ffffff" stroke-width="2.5"/>
              <text x="132" y="102" text-anchor="middle" font-size="10.5" font-weight="900" fill="#ffffff">共有FD</text>
            </g>
          </g>
          <g transform="translate(398, 82)">
            ${drawKpiBox(0, 0, 294, 76, 'アレイ繰り返し回数', '最大 16,704 × 24,592', '4,000×6,000 〜 4.1億画素まで隙間ゼロ', '#10b981')}
            ${drawKpiBox(0, 86, 294, 76, '設計ツール＆抽出検証', 'Virtuoso / PEX抽出', 'グリッド1〜5nm・寄生容量完全対称化', '#0284c7')}
            ${drawPill(0, 174, 294, 'Gr/Gb非対称→写真に市松格子ノイズ', false)}
            ${drawPill(0, 208, 294, '1nm完全対称→滑らかで均質な階調', true)}
          </g>
        `,
        cards: [
          { label: '描画精度', line1: 'Cadence Virtuoso上で1〜5nmグリッド', line2: '4,000×6,000〜16,704×24,592配列' },
          { label: '検証ポイント', line1: 'Gr/Gb間の寄生容量抽出（PEX）と', line2: '幾何学的完全対称性チェック' },
          { label: '失敗すると写真に？', line1: '繰り返しのわずかな非対称性で', line2: '規則的な格子模様（市松ノイズ）出現' },
        ],
      });

    case 'fab3_p18_ob_dummy_border':
      return wrapFab3HdSvg({
        badge: 'F3-20',
        stepTag: 'P02-018 [業界標準]',
        title: 'オプティカルブラック（OB）＆ダミー画素帯レイアウト',
        analogy: '画面を囲む「真の黒の物差し（OB）」と端っこの崩れを身代わりで受ける「緩衝帯」',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="420" height="250" rx="10" fill="#f8fafc" stroke="#475569" stroke-width="1.4"/>
            <text x="210" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#0f172a">3重の額縁構造（最外周：ダミー帯 → 中間：OB遮光帯 → 中央：有効画素）</text>
            <!-- Outer Dummy Pixel Frame -->
            <rect x="24" y="34" width="372" height="202" rx="8" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
            <text x="210" y="51" text-anchor="middle" font-size="9.6" font-weight="800" fill="#334155">① 最外周：ダミー画素帯（数十〜百数十列・エッチング/CMP端ムラ吸収）</text>
            <!-- Middle Optical Black Frame -->
            <rect x="52" y="60" width="316" height="154" rx="6" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
            <text x="210" y="77" text-anchor="middle" font-size="9.6" font-weight="800" fill="#f8fafc">② 中間帯：オプティカルブラック OB（金属完全遮光＝真の黒ゼロ基準）</text>
            <!-- Inner Active Full-Frame 36x24mm -->
            <rect x="88" y="88" width="244" height="104" rx="5" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
            <text x="210" y="135" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">有効画素エリア 36×24mm</text>
            <text x="210" y="156" text-anchor="middle" font-size="9.8" font-weight="700" fill="#bae6fd">端から端まで均一な形状と締まった黒！</text>
          </g>
          <g transform="translate(462, 82)">
            ${drawKpiBox(0, 0, 230, 76, '配置列数', '数十 〜 百数十列', '有効36×24mmの外周360°を包囲', '#475569')}
            ${drawKpiBox(0, 86, 230, 76, '検証項目', '境界連続性検証', 'CMP/エッチングのローディング均一化', '#0284c7')}
            ${drawPill(0, 174, 230, 'ダミー省略→画面端だけ光る・色変化', false)}
            ${drawPill(0, 208, 230, 'OB＋ダミー→四隅まで完全均質画質', true)}
          </g>
        `,
        cards: [
          { label: 'OB画素の役割', line1: '金属膜で完全遮光した画素で毎撮影', line2: '温度連動の「ゼロ基準（黒）」を測定' },
          { label: 'ダミー画素の役割', line1: '外周数十〜百数十列に配置し加工の', line2: '端っこの形状崩れを身代わり吸収' },
          { label: '失敗すると写真に？', line1: '画面の最外周の画素だけ形が崩れて', line2: 'フチが明るく光ったり色が変わる！' },
        ],
      });

    case 'fab3_p19_logic_place_route':
      return wrapFab3HdSvg({
        badge: 'F3-21',
        stepTag: 'P02-019 [標準/推定]',
        title: 'ロジックウェーハ自動配置配線（P&R：6〜8層配線＆ノイズ遮断）',
        analogy: '何億ものデジタル回路を立体高架道路（6〜8層）で結び、防音壁で上の画素を守る',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="420" height="250" rx="10" fill="#0f172a" stroke="#4f46e5" stroke-width="1.5"/>
            <text x="210" y="21" text-anchor="middle" font-size="11.2" font-weight="800" fill="#c7d2fe">6〜8層 銅配線スタック＆アナログノイズ遮断シールド断面</text>
            <!-- Top Analog Pixel Layer -->
            <rect x="28" y="34" width="364" height="32" rx="5" fill="#0284c7"/>
            <text x="210" y="54" text-anchor="middle" font-size="10.4" font-weight="800" fill="#ffffff">真上に載る超繊細アナログ画素（ノイズ厳禁！）</text>
            <!-- Noise Shield Ground Plane -->
            <rect x="28" y="74" width="364" height="18" rx="3" fill="#10b981"/>
            <text x="210" y="87" text-anchor="middle" font-size="9.5" font-weight="900" fill="#064e3b">🛡️ GND 静電シールド層（スイッチング雑音を完全遮断）</text>
            <!-- 6 Orthogonal Metal Layers (M6 down to M1) -->
            ${[
              { y: 100, lbl: 'M6–M8: 厚銅電源メッシュ＆Cu-Cu再配線', col: '#f59e0b' },
              { y: 124, lbl: 'M4–M5: 列並列ADCデータバス・クロック網', col: '#ea580c' },
              { y: 148, lbl: 'M2–M3: デジタルISP・SRAM中距離配線', col: '#6366f1' },
              { y: 172, lbl: 'M1: 数億デジタル標準セル超微細ローカル配線', col: '#38bdf8' },
            ]
              .map(
                (m) =>
                  `<rect x="34" y="${m.y}" width="352" height="19" rx="3" fill="${m.col}" fill-opacity="0.86"/>
                   <text x="210" y="${m.y + 13}" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0f172a">${m.lbl}</text>`
              )
              .join('')}
            <rect x="28" y="198" width="364" height="36" rx="5" fill="#334155"/>
            <text x="210" y="220" text-anchor="middle" font-size="10" font-weight="800" fill="#e2e8f0">ロジックトランジスタ基板（28/22nm級 [推定]）</text>
          </g>
          <g transform="translate(462, 82)">
            ${drawKpiBox(0, 0, 230, 76, '主なP&Rツール', 'IC Compiler II / Innovus', 'Synopsys・Cadence自動配置配線', '#4f46e5')}
            ${drawKpiBox(0, 86, 230, 76, '配線層数 [推定]', '6 〜 8 層前後', 'Cu-Cu座標と完全整合配置', '#0284c7')}
            ${drawPill(0, 174, 230, '雑音飛込→アナログ画素に縞ノイズ', false)}
            ${drawPill(0, 208, 230, 'シールド検証→暗部ノイズ極小化', true)}
          </g>
        `,
        cards: [
          { label: '自動配置配線', line1: '数千万〜数億ゲートと列並列ADCを', line2: 'Cu-Cu座標に合わせ6〜8層へ配線' },
          { label: 'ノイズ対策', line1: 'デジタルの激しい切替雑音を防ぐ', line2: 'クロストーク＆ノイズシールド検証' },
          { label: '失敗すると写真に？', line1: 'デジタル雑音が真上の繊細な画素へ', line2: '飛び込んで目立つ「縞ノイズ」に！' },
        ],
      });

    case 'fab3_p20_partial_stack_chiplet':
      return wrapFab3HdSvg({
        badge: 'F3-22',
        stepTag: 'P02-020 [確認済み/推定]',
        title: '部分積層型向けチップレット分割設計（α7 V / Z6III / S1II）',
        analogy: '中央は平屋のまま高画質・低コストにし、上下の端だけ高速チップレットを載せる',
        accent: '#7c3aed',
        accentSoft: '#f5f3ff',
        body: `
          ${drawCompareFrame(24, 82, 316, 250, '従来の全面フル積層（ハイエンド機）', '#0284c7', '#f0f9ff')}
          <g transform="translate(42, 122)">
            <rect x="18" y="12" width="244" height="58" rx="6" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>
            <text x="140" y="45" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">36×24mm 画素ダイ</text>
            <rect x="18" y="78" width="244" height="58" rx="6" fill="#4f46e5" stroke="#312e81" stroke-width="1.6"/>
            <text x="140" y="111" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">36×24mm 全面ロジックダイ</text>
            <text x="140" y="160" text-anchor="middle" font-size="9.6" font-weight="700" fill="#0369a1">最高速だがロジックも巨大で超コスト高</text>
            <text x="140" y="178" text-anchor="middle" font-size="9.2" font-weight="600" fill="#475569">例：α1 II / α9 III / Z9 / R1</text>
          </g>

          ${drawCompareFrame(354, 82, 342, 250, '★ 2024–2026革新：部分積層型（α7 V / Z6III / S1II）', '#7c3aed', '#faf5ff')}
          <g transform="translate(370, 122)">
            <!-- Bare Central Pixel Die -->
            <rect x="18" y="12" width="274" height="58" rx="6" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6"/>
            <text x="155" y="45" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">中央36×24mm 画素ダイ（中央裏はロジック無し！）</text>
            <!-- Twin Edge-Only Stacked Logic Chiplets (Top & Bottom edges shown left & right in section) -->
            <rect x="18" y="78" width="76" height="52" rx="6" fill="#7c3aed" stroke="#4c1d95" stroke-width="1.6"/>
            <text x="56" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">上端高速</text>
            <text x="56" y="116" text-anchor="middle" font-size="9" font-weight="700" fill="#e9d5ff">チップレット</text>
            <rect x="216" y="78" width="76" height="52" rx="6" fill="#7c3aed" stroke="#4c1d95" stroke-width="1.6"/>
            <text x="254" y="102" text-anchor="middle" font-size="9.4" font-weight="800" fill="#ffffff">下端高速</text>
            <text x="254" y="116" text-anchor="middle" font-size="9" font-weight="700" fill="#e9d5ff">チップレット</text>
            <text x="155" y="108" text-anchor="middle" font-size="9.2" font-weight="800" fill="#059669">← 空き地でコスト大幅削減！ →</text>
            <text x="155" y="156" text-anchor="middle" font-size="9.6" font-weight="800" fill="#5b21b6">上下エッジ熱集中＆垂直信号遅延を精密制御</text>
            <text x="155" y="175" text-anchor="middle" font-size="9.2" font-weight="700" fill="#059669">✅ 高画質(広DR)＋高速読み出し＋価格を両立！</text>
          </g>
        `,
        cards: [
          { label: '搭載代表機種', line1: 'ソニー α7 V / ニコン Z6III', line2: 'LUMIX S1II 等の部分積層型 [確認済み]' },
          { label: '構造の妙', line1: '中央にロジックを置かず上下両端に', line2: '細長い高速チップレットを微細接合' },
          { label: '失敗すると写真に？', line1: '上下エッジ熱集中と長い垂直信号線の', line2: '遅延バランスが崩れ画質と速度が両立不可' },
        ],
      });

    case 'fab3_p21_cmp_dummy_alignment':
      return wrapFab3HdSvg({
        badge: 'F3-23',
        stepTag: 'P02-021 [業界標準]',
        title: 'CMPダミーメタル＆アライメントマーク配置（金属密度±5%）',
        analogy: '研磨時に空き地だけ凹むのを防ぐ飾りタイルと、切りしろに埋める露光の十字目印',
        accent: '#f59e0b',
        accentSoft: '#fffbeb',
        body: `
          ${drawCompareFrame(24, 82, 324, 250, '❌ ダミーメタル無し → CMP研磨で波打ち＆ボイド', '#e11d48', '#fff1f2')}
          <g transform="translate(40, 124)">
            <rect x="10" y="78" width="272" height="58" fill="#475569"/>
            <!-- Dense copper on left, empty oxide on right that dishes deeply! -->
            <rect x="20" y="64" width="24" height="22" fill="#ea580c"/><rect x="52" y="64" width="24" height="22" fill="#ea580c"/><rect x="84" y="64" width="24" height="22" fill="#ea580c"/>
            <!-- Curved dishing profile -->
            <path d="M 10 64 L 116 64 Q 198 106 282 64" fill="none" stroke="#e11d48" stroke-width="3"/>
            <text x="198" y="54" text-anchor="middle" font-size="10.2" font-weight="900" fill="#be123c">空き地が凹む（ディッシング）！</text>
            <text x="146" y="160" text-anchor="middle" font-size="9.6" font-weight="800" fill="#881337">→ Cu-Cuハイブリッド接合で隙間(ボイド)発生！</text>
          </g>

          ${drawCompareFrame(364, 82, 332, 250, '✅ ダミーフィル均一化（±5%以内）＋目印配置', '#059669', '#f0fdf4')}
          <g transform="translate(380, 124)">
            <rect x="10" y="78" width="280" height="58" fill="#475569"/>
            <!-- Real copper + uniform dummy tiles -->
            <rect x="20" y="64" width="24" height="22" fill="#ea580c"/><rect x="52" y="64" width="24" height="22" fill="#ea580c"/><rect x="84" y="64" width="24" height="22" fill="#ea580c"/>
            <rect x="122" y="64" width="22" height="22" fill="#f59e0b"/><rect x="152" y="64" width="22" height="22" fill="#f59e0b"/><rect x="182" y="64" width="22" height="22" fill="#f59e0b"/><rect x="212" y="64" width="22" height="22" fill="#f59e0b"/>
            <!-- Scribe line alignment mark cross -->
            <line x1="258" y1="68" x2="282" y2="68" stroke="#0284c7" stroke-width="3"/>
            <line x1="270" y1="56" x2="270" y2="80" stroke="#0284c7" stroke-width="3"/>
            <line x1="10" y1="62" x2="290" y2="62" stroke="#10b981" stroke-width="3"/>
            <text x="150" y="48" text-anchor="middle" font-size="10.2" font-weight="800" fill="#047857">鏡のように平坦（Density DRC合格）</text>
            <text x="270" y="104" text-anchor="middle" font-size="8.6" font-weight="800" fill="#bae6fd">目印＋TEG</text>
            <text x="150" y="160" text-anchor="middle" font-size="9.6" font-weight="800" fill="#065f46">→ Cu-Cu全面がボイドゼロでピタリ接合！</text>
          </g>
        `,
        cards: [
          { label: 'ダミーフィル', line1: '自動生成ツールで金属密度を', line2: 'チップ全面 ±5%以内に均一化' },
          { label: 'スクライブライン', line1: '切りしろに露光アライメントマークと', line2: '電気検査モニター（TEG）を配置' },
          { label: '失敗すると写真に？', line1: 'CMP研磨面が波打ってCu-Cu接合に', line2: 'ボイド（隙間）が生じ貼り合わせ失敗！' },
        ],
      });

    case 'fab3_p22_fullchip_oasis_guard':
      return wrapFab3HdSvg({
        badge: 'F3-24',
        stepTag: 'P02-022 [業界標準]',
        title: 'チップ全体トップレベル統合（ガードリング＆OASIS出力）',
        analogy: '画素・OB・回路・湿気と割れを阻む金属城壁を1冊の数百GB設計書へ製本',
        accent: '#0ea5e9',
        accentSoft: '#e0f2fe',
        body: `
          <g transform="translate(26, 82)">
            <rect x="0" y="0" width="420" height="250" rx="10" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5"/>
            <!-- Copper Crack-Stop Guard Ring Fortress -->
            <rect x="20" y="18" width="380" height="214" rx="8" fill="none" stroke="#f59e0b" stroke-width="8"/>
            <rect x="30" y="28" width="360" height="194" rx="5" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
            <text x="210" y="46" text-anchor="middle" font-size="9.8" font-weight="800" fill="#fbbf24">🛡️ 銅製ガードリング（ダイシング割れ＆湿気侵入を360°阻止）</text>
            <!-- Bonding pads & SerDes top/bottom -->
            <rect x="46" y="54" width="328" height="20" rx="3" fill="#2563eb"/>
            <text x="210" y="67.5" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">ボンディングパッド ＋ 列並列ADC / SLVS-EC 周辺回路</text>
            <!-- OB + Active 36x24mm center -->
            <rect x="64" y="82" width="292" height="96" rx="4" fill="#334155" stroke="#94a3b8"/>
            <rect x="84" y="94" width="252" height="72" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.6"/>
            <text x="210" y="128" text-anchor="middle" font-size="13" font-weight="900" fill="#ffffff">フルサイズ有効画素アレイ</text>
            <text x="210" y="146" text-anchor="middle" font-size="9.5" font-weight="700" fill="#bae6fd">OB帯＋ダミー帯＋ロジック全層統合</text>
            <rect x="46" y="186" width="328" height="20" rx="3" fill="#2563eb"/>
            <text x="210" y="199.5" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">下部ADC・電源パッド ＋ 3D Cu-Cuフロアプラン</text>
          </g>
          <g transform="translate(462, 82)">
            ${drawKpiBox(0, 0, 230, 76, '統合ファイル形式', 'OASIS / GDSII', 'データ容量：数十 〜 数百 GB 級', '#0ea5e9')}
            ${drawKpiBox(0, 86, 230, 76, '最終チェック', '全層整合性確認', '座標・階層・ガードリング連続性', '#059669')}
            ${drawPill(0, 174, 230, '城壁途切れ→切断ヒビが画素へ侵入', false)}
            ${drawPill(0, 208, 230, '完全統合→ブロック2-C最終検閲へ', true)}
          </g>
        `,
        cards: [
          { label: '統合要素', line1: '画素・OB・周辺回路・ガードリング', line2: 'パッド・ロジック全層を一体化' },
          { label: 'データ規模', line1: '数十GB〜数百GB級の巨大OASIS', line2: 'ファイルへ製本し全層整合チェック' },
          { label: '失敗すると写真に？', line1: 'ガードリングが1か所でも途切れると', line2: 'ダイシング衝撃ヒビが画素内部へ走る！' },
        ],
      });

    default:
      return null;
  }
}
