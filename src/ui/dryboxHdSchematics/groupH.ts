import { drawCompareFrame, drawKpiBox, drawPill, drawPin, wrapDryboxHdSvg } from './shared';

/**
 * Dry Box Ultra-HD 720x470 Vector Infographics — Group H (11 Parts: DB80–DB90):
 * ±30kV TVS ESD & Galvanic Isolator, Ideal-Diode ORing UPS, External RF Radome,
 * TCXO RTC + FRAM Logger, NASA ASTM E595 PTFE Harness, Piezo/Light-Pipe,
 * Locking PU Casters, Bullseye Level, 50mm Wall Bumpers, Cu2+ ESD Mat & NIST NFC Plate.
 */
export function renderDryboxGroupHSvg(diagramType: string): string | null {
  switch (diagramType) {
    case 'db_tvs_esd_galvanic_iso':
      return wrapDryboxHdSvg({
        badge: 'DB80',
        stepTag: '±30kV TVS / 2.5kV絶縁',
        title: '±30 kV TVS静電気保護 ＆ 2.5 kVrms I²Cガルバニック絶縁',
        analogy: '冬のドアノブ静電気を10億分の1秒で地面へ逃がす避雷針チップと、電気ノイズを切る絶縁の橋',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Dual-Stage ESD + Galvanic Isolation Schematic -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="440" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="220" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">人体静電気 ±30 kV 侵入に対する 二段ディフェンス保護経路</text>
            <!-- User Touch Port (Left) -->
            <rect x="18" y="64" width="90" height="72" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.6"/>
            <text x="63" y="88" text-anchor="middle" font-size="9.0" font-weight="900" fill="#9f1239">指紋 / E-Ink</text>
            <text x="63" y="106" text-anchor="middle" font-size="10.2" font-weight="900" fill="#e11d48">⚡ ±30 kV</text>
            <text x="63" y="122" text-anchor="middle" font-size="8.0" font-weight="700" fill="#be123c">乾燥冬の静電気</text>
            <!-- Signal Bus -->
            <line x1="108" y1="100" x2="328" y2="100" stroke="#0284c7" stroke-width="3.0"/>
            <!-- Stage 1: Ultra-Fast TVS Clamp Diode Array -->
            <rect x="136" y="74" width="76" height="52" rx="6" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.6"/>
            <text x="174" y="96" text-anchor="middle" font-size="9.2" font-weight="900" fill="#ffffff">TVS避雷針</text>
            <text x="174" y="114" text-anchor="middle" font-size="8.2" font-weight="800" fill="#fde047">&lt; 1 ns 応答</text>
            <!-- Surge Drain to Earth -->
            <line x1="174" y1="126" x2="174" y2="188" stroke="#16a34a" stroke-width="3.0" marker-end="url(#db80-arrGreen)"/>
            <rect x="116" y="192" width="116" height="26" rx="5" fill="#dcfce7" stroke="#16a34a"/>
            <text x="174" y="209" text-anchor="middle" font-size="8.6" font-weight="900" fill="#14532d">ESDアースへ瞬時逃がし</text>
            <!-- Stage 2: 2.5 kVrms Capacitive Digital Isolator -->
            <rect x="234" y="66" width="78" height="68" rx="6" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2.0" stroke-dasharray="4 2"/>
            <text x="273" y="92" text-anchor="middle" font-size="8.8" font-weight="900" fill="#5b21b6">SiO₂ 絶縁障壁</text>
            <text x="273" y="110" text-anchor="middle" font-size="9.2" font-weight="900" fill="#7c3aed">2.5 kVrms</text>
            <text x="273" y="124" text-anchor="middle" font-size="7.8" font-weight="700" fill="#6d28d9">I²C双方向絶縁</text>
            <!-- Protected MCU Core (Right) -->
            <rect x="332" y="64" width="92" height="72" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.8"/>
            <text x="378" y="92" text-anchor="middle" font-size="9.2" font-weight="900" fill="#14532d">頭脳 MCU</text>
            <text x="378" y="110" text-anchor="middle" font-size="8.6" font-weight="800" fill="#166534">クランプ &lt;9V</text>
            <text x="378" y="124" text-anchor="middle" font-size="8.2" font-weight="700" fill="#15803d">無傷・フリーズ0</text>
            <text x="220" y="242" text-anchor="middle" font-size="8.8" font-weight="800" fill="#0f172a">超低寄生容量 &lt; 0.5 pF により USB-C・I²C デジタル信号波形も劣化ゼロ</text>
          </g>

          <!-- Right: KPIs -->
          <g transform="translate(476, 80)">
            ${drawKpiBox(0, 0, 218, 78, 'IEC 61000-4-2 耐量', '±30 kV', 'Level 4 (15kV) の2倍安全余裕', '#0284c7')}
            ${drawKpiBox(0, 88, 104, 74, 'クランプ速度', '&lt; 1 ns', '10億分の1秒', '#16a34a')}
            ${drawKpiBox(114, 88, 104, 74, '絶縁耐圧', '2.5 kVrms', 'ループノイズ遮断', '#7c3aed')}
            ${drawCompareFrame(0, 172, 218, 82, 'なぜ防湿庫は静電気対策が命？', '#0c4a6e', '#f0f9ff')}
            <text x="12" y="216" font-size="8.6" font-weight="800" fill="#0c4a6e">乾燥環境では人体が容易に20kV帯電</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#0369a1">産業PLC級の保護で10年連続稼働保証</text>
          </g>
        `,
        cards: [
          { label: '核心デバイス', line1: '±30 kV TVSアレイ（&lt;0.5 pF）', line2: '2.5 kVrms I²Cガルバニック絶縁IC' },
          { label: '物理的メリット', line1: '1 ns未満で静電気を9V以下へクランプ', line2: 'パワー系〜センサー間の地絡ループ遮断' },
          { label: 'カメラを守る意味', line1: '冬の静電気による指紋錠・基板破損ゼロ', line2: 'センサー誤読と制御フリーズを根絶' },
        ],
      });

    case 'db_ideal_diode_oring_bms':
      return wrapDryboxHdSvg({
        badge: 'DB81',
        stepTag: '無瞬断 &lt;10μs',
        title: 'N-MOSFET理想ダイオードORing回路（無瞬断UPS切替＆損失−96%）',
        analogy: '停電から100分の1ミリ秒で内蔵電池へバトンタッチし、時計もWi-Fiも除湿も一瞬たりとも止めない切替係',
        accent: '#059669',
        accentSoft: '#d1fae5',
        body: `
          <!-- Left: Active Ideal-Diode ORing Architecture -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">TI LM74500級 デュアルN-MOSFET 理想ダイオードORing合流回路</text>
            <!-- Top Input: Main GaN PSU -->
            <rect x="20" y="46" width="96" height="54" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
            <text x="68" y="69" text-anchor="middle" font-size="9.0" font-weight="900" fill="#78350f">主電源 GaN</text>
            <text x="68" y="86" text-anchor="middle" font-size="8.4" font-weight="800" fill="#b45309">DC 12.0 V</text>
            <!-- Bottom Input: LiFePO4 UPS -->
            <rect x="20" y="138" width="96" height="54" rx="7" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
            <text x="68" y="161" text-anchor="middle" font-size="9.0" font-weight="900" fill="#14532d">内蔵 LiFePO₄</text>
            <text x="68" y="178" text-anchor="middle" font-size="8.4" font-weight="800" fill="#15803d">UPS 12.8 V</text>
            <!-- Ideal Diode MOSFET Switches -->
            <line x1="116" y1="73" x2="152" y2="73" stroke="#d97706" stroke-width="2.6"/>
            <rect x="152" y="50" width="110" height="46" rx="6" fill="#0f172a" stroke="#059669" stroke-width="1.6"/>
            <text x="207" y="70" text-anchor="middle" font-size="8.8" font-weight="900" fill="#34d399">N-MOSFET #1</text>
            <text x="207" y="86" text-anchor="middle" font-size="8.0" font-weight="700" fill="#ffffff">R_DS(on) &lt; 8 mΩ</text>

            <line x1="116" y1="165" x2="152" y2="165" stroke="#16a34a" stroke-width="2.6"/>
            <rect x="152" y="142" width="110" height="46" rx="6" fill="#0f172a" stroke="#059669" stroke-width="1.6"/>
            <text x="207" y="162" text-anchor="middle" font-size="8.8" font-weight="900" fill="#34d399">N-MOSFET #2</text>
            <text x="207" y="178" text-anchor="middle" font-size="8.0" font-weight="700" fill="#ffffff">逆流遮断 &lt;10 μs</text>
            <!-- ORing Junction to System Load -->
            <polyline points="262,73 296,73 296,119 322,119" fill="none" stroke="#059669" stroke-width="2.8"/>
            <polyline points="262,165 296,165 296,119" fill="none" stroke="#059669" stroke-width="2.8"/>
            <rect x="322" y="84" width="88" height="70" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
            <text x="366" y="110" text-anchor="middle" font-size="9.0" font-weight="900" fill="#0c4a6e">無瞬断バス</text>
            <text x="366" y="128" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0369a1">PEM / MCU</text>
            <text x="366" y="142" text-anchor="middle" font-size="8.2" font-weight="800" fill="#0369a1">指紋錠 / IoT</text>
            <text x="212" y="218" text-anchor="middle" font-size="9.2" font-weight="900" fill="#065f46">停電検出 → 10 μs（10万分の1秒）でUPSへ自動切替・再起動ゼロ!</text>
            <text x="212" y="238" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">データセンター冗長電源（TI SLVAE57B）同等のBMSバランス保護統合</text>
          </g>

          <!-- Right: Power Loss Comparison -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 112, 78, '無瞬断切替', '&lt; 10 μs', 'ブラウンアウト0', '#059669')}
            ${drawKpiBox(122, 0, 112, 78, '発熱ロス削減', '−96%', '0.04W vs 1.2W', '#0284c7')}
            ${drawCompareFrame(0, 88, 234, 166, 'ショットキーダイオード vs 理想ダイオード', '#065f46', '#ecfdf5')}
            <text x="12" y="130" font-size="9.0" font-weight="900" fill="#14532d">✅ N-MOSFET 理想ダイオード</text>
            <rect x="12" y="138" width="16" height="15" rx="3" fill="#16a34a"/>
            <text x="36" y="149" font-size="8.6" font-weight="800" fill="#15803d">電圧降下 16 mV（損失 0.04 W）</text>
            <text x="12" y="176" font-size="9.0" font-weight="800" fill="#9f1239">❌ 従来ショットキーダイオード</text>
            <rect x="12" y="184" width="206" height="15" rx="3" fill="#e11d48"/>
            <text x="115" y="195" text-anchor="middle" font-size="8.2" font-weight="900" fill="#ffffff">電圧降下 500 mV（常時無駄発熱 1.2 W!）</text>
            <text x="12" y="226" font-size="8.4" font-weight="700" fill="#065f46">LiFePO₄ セルバランス充電で10年スタンバイ</text>
            <text x="12" y="242" font-size="8.4" font-weight="700" fill="#065f46">停電中もPEM除湿と記録ロガーを継続稼働</text>
          </g>
        `,
        cards: [
          { label: '核心回路', line1: 'N-MOSFET 理想ダイオードORing', line2: 'R_DS &lt; 8 mΩ ＋ LiFePO₄ BMS' },
          { label: '物理的メリット', line1: '10 μs未満の完全無瞬断UPS切替', line2: '従来ダイオード比で導通発熱 −96%' },
          { label: 'カメラを守る意味', line1: '停電の瞬間もログ欠損・再起動ゼロ', line2: '災害時も指紋認証＆PEM除湿を継続' },
        ],
      });

    case 'db_external_rf_radome_ant':
      return wrapDryboxHdSvg({
        badge: 'DB82',
        stepTag: '2.4GHz / +3.2dBi外部化',
        title: '外付け2.4 GHzセラミックRFレドームアンテナ ＆ ファラデー遮蔽バイパス',
        analogy: '頑丈な鉄の箱は「電波の牢屋」になるため、屋根の上へ小さなレーダードームを出してスマホ通信バリ3に',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Faraday Cage vs External Radome Bypass -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">鋼板キャビネットのファラデーケージ遮蔽を突破する外部同軸RF構造</text>
            <!-- Top External RF Radome Dome on Roof -->
            <path d="M 164 88 A 48 38 0 0 1 260 88 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.2"/>
            <rect x="198" y="64" width="28" height="24" rx="3" fill="#0284c7"/>
            <text x="212" y="80" text-anchor="middle" font-size="7.6" font-weight="900" fill="#ffffff">2.4G</text>
            <!-- Strong External Radio Waves -->
            <path d="M 152 62 A 64 50 0 0 1 272 62" fill="none" stroke="#16a34a" stroke-width="2.2" stroke-dasharray="5 3"/>
            <path d="M 134 52 A 84 62 0 0 1 290 52" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="5 3"/>
            <text x="344" y="62" text-anchor="middle" font-size="9.4" font-weight="900" fill="#15803d">全方向 +3.2 dBi</text>
            <text x="344" y="77" text-anchor="middle" font-size="8.2" font-weight="700" fill="#166534">Matter / Wi-Fi 安定!</text>
            <!-- Steel Roof Ground Plane -->
            <rect x="44" y="88" width="336" height="14" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
            <text x="108" y="99" text-anchor="middle" font-size="8.0" font-weight="800" fill="#fde047">鉄天板＝理想グランドプレーン</text>
            <!-- Hermetic Coaxial Feedthrough + O-Ring -->
            <rect x="204" y="86" width="16" height="22" rx="2" fill="#d97706" stroke="#78350f"/>
            <!-- Inside Faraday Steel Box -->
            <rect x="54" y="102" width="316" height="114" fill="#f1f5f9" stroke="#475569" stroke-width="3"/>
            <!-- 50 Ohm Coax down to Matter IoT SoC -->
            <path d="M 212 108 L 212 154 L 274 154" fill="none" stroke="#0284c7" stroke-width="3.0"/>
            <rect x="274" y="134" width="84" height="44" rx="6" fill="#1e293b"/>
            <text x="316" y="154" text-anchor="middle" font-size="8.6" font-weight="800" fill="#38bdf8">Matter SoC</text>
            <text x="316" y="168" text-anchor="middle" font-size="7.8" font-weight="700" fill="#ffffff">(DB13)</text>
            <!-- Bad Internal Antenna Blocked inside steel box -->
            <rect x="74" y="134" width="98" height="48" rx="6" fill="#ffe4e6" stroke="#e11d48" stroke-dasharray="4 2"/>
            <text x="123" y="154" text-anchor="middle" font-size="8.6" font-weight="900" fill="#9f1239">内蔵アンテナ(✕)</text>
            <text x="123" y="170" text-anchor="middle" font-size="8.2" font-weight="800" fill="#e11d48">−40〜100 dB 遮断!</text>
            ${drawPin(212, 98, 294, 232, 1, '気密50Ω同軸フィードスルー', 'FKM Oリングで防湿完璧', '#d97706', 'end')}
          </g>

          <!-- Right: RF Link Budget KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '鋼板ファラデー遮蔽損失', '40–100 dB', '鉄箱内は電波が 1/10,000 以下へ減衰', '#e11d48')}
            ${drawKpiBox(0, 88, 112, 74, '外部アンテナ利得', '+3.2 dBi', 'VSWR &lt; 1.5 整合', '#16a34a')}
            ${drawKpiBox(122, 88, 112, 74, '対応プロトコル', '2.4 GHz', 'Thread/Wi-Fi/BLE', '#0284c7')}
            ${drawCompareFrame(0, 172, 234, 82, 'RF透過ポリカーボネート・レドーム', '#0c4a6e', '#f0f9ff')}
            <text x="12" y="216" font-size="8.6" font-weight="800" fill="#0c4a6e">再送電力ロス削減＆通信切断ゼロ</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#0369a1">緊急H₂ガス警報も確実にスマホへ届く!</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '天面外部セラミックRFレドーム', line2: '50Ω気密同軸フィードスルー＋Oリング' },
          { label: '物理的メリット', line1: '鉄箱の40–100 dB電波遮蔽をバイパス', line2: '金属天板を反射板に +3.2 dBi 利得' },
          { label: 'カメラを守る意味', line1: '遠隔湿度監視＆異常アラートが途切れない', line2: '無線再送による発熱・消費電力も削減' },
        ],
      });

    case 'db_tcxo_rtc_fram_logger':
      return wrapDryboxHdSvg({
        badge: 'DB83',
        stepTag: '±2ppm / FRAM 10¹⁴回',
        title: '±2 ppm温度補償水晶(TCXO) RTC ＆ 100兆回書換FRAM 監査データロガー',
        analogy: '飛行機のフライトレコーダー！10年分の温湿度と開扉履歴を1分も狂わず1ビットも消さず記録',
        accent: '#4f46e5',
        accentSoft: '#eef2ff',
        body: `
          <!-- Left: Endurance & Accuracy Comparison -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">メモリ書換耐久比較（対数スケール）：FRAM は EEPROM の 1億倍!</text>
            <!-- FRAM Bar -->
            <text x="22" y="56" font-size="9.4" font-weight="900" fill="#312e81">✅ 強誘電体 FRAM（本機 DB83）：10¹⁴ 回（100兆回）</text>
            <rect x="22" y="64" width="380" height="24" rx="5" fill="#4f46e5"/>
            <text x="212" y="80" text-anchor="middle" font-size="9.0" font-weight="900" fill="#ffffff">毎秒書き込んでも 300万年以上無劣化・停電破損ゼロ!</text>
            <!-- EEPROM Bar -->
            <text x="22" y="116" font-size="9.2" font-weight="800" fill="#b45309">△ 従来 EEPROM：10⁶ 回（100万回）</text>
            <rect x="22" y="124" width="110" height="20" rx="4" fill="#f59e0b"/>
            <text x="140" y="138" font-size="8.4" font-weight="700" fill="#92400e">毎分ログで数年以内に寿命＆書込時停電破損</text>
            <!-- NAND Flash Bar -->
            <text x="22" y="168" font-size="9.2" font-weight="800" fill="#9f1239">❌ 安価 NAND Flash：10⁴ 回（1万回）</text>
            <rect x="22" y="176" width="38" height="20" rx="4" fill="#e11d48"/>
            <text x="68" y="190" font-size="8.4" font-weight="700" fill="#be123c">ページ消去の摩耗で長期アーカイブ記録に不適</text>
            <!-- TCXO Accuracy Footnote -->
            <rect x="22" y="210" width="380" height="32" rx="6" fill="#eef2ff" stroke="#6366f1"/>
            <text x="212" y="230" text-anchor="middle" font-size="9.0" font-weight="900" fill="#3730a3">DS32C35級 TCXO内蔵RTC：0–40°Cで精度 ±2 ppm（年間誤差 ≤ 63秒）</text>
          </g>

          <!-- Right: Audit Trail Output -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 112, 78, '時計精度', '±2 ppm', '年誤差 ≤ 1分', '#4f46e5')}
            ${drawKpiBox(122, 0, 112, 78, '停電データ保持', '10年以上', 'PZT強誘電分極', '#059669')}
            ${drawCompareFrame(0, 88, 234, 166, 'ISO 18920 博物館・保険監査証跡', '#312e81', '#ffffff')}
            <text x="14" y="130" font-size="9.0" font-weight="800" fill="#0f172a">● 1分間隔で欠損ゼロ自動記録</text>
            <text x="22" y="146" font-size="8.4" font-weight="600" fill="#475569">上下段 温湿度・露点・VOC・開閉</text>
            <text x="14" y="172" font-size="9.0" font-weight="800" fill="#0f172a">● 改ざん検知ハッシュ付き出力</text>
            <text x="22" y="188" font-size="8.4" font-weight="600" fill="#475569">スマホからCSV / PDF証明書発行</text>
            ${drawPill(14, 212, 206, '5年超の長期保管証明を本体内蔵!', true)}
          </g>
        `,
        cards: [
          { label: '核心IC', line1: '±2 ppm 温度補償水晶（TCXO）RTC', line2: '強誘電体不揮発メモリ FRAM' },
          { label: '物理的メリット', line1: '書換耐久 10¹⁴回（EEPROMの1億倍）', line2: 'ナノ秒書込で停電ファイル破損ゼロ' },
          { label: 'カメラを守る意味', line1: '博物館・保険基準の保管証明ログ', line2: '過去5年の開扉・湿度履歴を常時保存' },
        ],
      });

    case 'db_astm595_ptfe_harness':
      return wrapDryboxHdSvg({
        badge: 'DB84',
        stepTag: 'NASA ASTM E595適合',
        title: 'NASA ASTM E595準拠 低アウトガスPTFE/FEP被覆・庫内シールドハーネス',
        analogy: '安い電線から出る「レンズを曇らせる見えない可塑剤ガス」をゼロにした宇宙衛星グレードの配線束',
        accent: '#0f766e',
        accentSoft: '#ccfbf1',
        body: `
          <!-- Left: Cable Cross-Section & Outgassing Physics -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="388" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="194" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">宇宙光学衛星グレード PTFE/FEP シールドケーブル断面</text>
            <!-- Concentric Cable Cutaway -->
            <circle cx="152" cy="134" r="76" fill="#ffffff" stroke="#0f766e" stroke-width="5"/>
            <circle cx="152" cy="134" r="60" fill="url(#db84-hatch)" stroke="#475569" stroke-width="3"/>
            <circle cx="152" cy="134" r="44" fill="#f0fdfa" stroke="#0284c7" stroke-width="3"/>
            <circle cx="136" cy="126" r="11" fill="url(#db84-copper)" stroke="#9a3412"/>
            <circle cx="168" cy="126" r="11" fill="url(#db84-copper)" stroke="#9a3412"/>
            <circle cx="152" cy="152" r="11" fill="url(#db84-copper)" stroke="#9a3412"/>
            ${drawPin(216, 86, 256, 62, 1, 'FEPフッ素外被', '可塑剤0%・CVCM&lt;0.01%', '#0f766e')}
            ${drawPin(204, 134, 256, 124, 2, '85%銅編組シールド', 'EMIノイズ完全遮蔽', '#475569')}
            ${drawPin(172, 146, 256, 184, 3, '銀メッキ銅芯＋PTFE', '低抵抗＆金接点ロック', '#d97706')}
            <text x="194" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#134e4a">結束バンドまでPTFE統一 → 密閉庫内の化学汚染源を一掃!</text>
          </g>

          <!-- Right: ASTM E595 Comparison -->
          <g transform="translate(424, 80)">
            ${drawKpiBox(0, 0, 130, 78, 'NASA基準 CVCM', '&lt; 0.1%', '実測 PTFE &lt; 0.01%', '#0f766e')}
            ${drawKpiBox(140, 0, 130, 78, 'NASA基準 TML', '&lt; 1.0%', '実測 PTFE ≈ 0.02%', '#0284c7')}
            ${drawCompareFrame(0, 88, 270, 166, '密閉箱内の「レンズ曇り」アウトガス比較', '#0f766e', '#ffffff')}
            <text x="12" y="130" font-size="9.2" font-weight="900" fill="#14532d">✅ PTFE / FEP 被覆（NASA ASTM E595）</text>
            <text x="18" y="148" font-size="8.4" font-weight="700" fill="#15803d">125°C真空24h試験でも凝縮揮発物 &lt;0.01%</text>
            <text x="18" y="164" font-size="8.4" font-weight="700" fill="#15803d">レンズAR膜・センサーへの曇り付着ゼロ!</text>
            <text x="12" y="194" font-size="9.2" font-weight="800" fill="#9f1239">❌ 安価な塩ビ（PVC）電線被覆</text>
            <text x="18" y="212" font-size="8.4" font-weight="600" fill="#be123c">フタル酸系可塑剤が長期揮発（CVCM &gt;1%）</text>
            <text x="18" y="228" font-size="8.4" font-weight="600" fill="#be123c">密閉空間でレンズ表面がうっすら白濁!</text>
          </g>
        `,
        cards: [
          { label: '核心規格', line1: 'NASA ASTM E595 宇宙光学基準', line2: 'PTFE/FEP被覆＋85%銅編組シールド' },
          { label: '物理的メリット', line1: '凝縮性揮発物 CVCM &lt; 0.01%', line2: '可塑剤ゼロ＆耐振動ロックコネクタ' },
          { label: 'カメラを守る意味', line1: '電線由来のレンズ曇り(フォギング)根絶', line2: 'センサー通信ノイズと断線も防止' },
        ],
      });

    case 'db_piezo_alarm_lightpipe':
      return wrapDryboxHdSvg({
        badge: 'DB85',
        stepTag: '全反射導光 / 82dB警報',
        title: '圧電セラミック異常警報ブザー ＆ PMMA気密導光ライトパイプ',
        analogy: '「扉が半開きだよ！」を離れた部屋からでも82dBの音と色つきランプで即座に教えてくれる見張り番',
        accent: '#d97706',
        accentSoft: '#fef3c7',
        body: `
          <!-- Left: TIR Optical Light-Pipe Path -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="396" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="198" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">PMMAライトパイプ全反射（TIR）導光 ＆ 気密一体モールド断面</text>
            <!-- Internal PCB + RGB LED -->
            <rect x="24" y="136" width="84" height="58" rx="6" fill="#065f46" stroke="#064e3b" stroke-width="1.5"/>
            <text x="66" y="162" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">制御基板</text>
            <text x="66" y="177" text-anchor="middle" font-size="8.0" font-weight="700" fill="#a7f3d0">RGB LED</text>
            <circle cx="106" cy="160" r="8" fill="#16a34a" stroke="#ffffff" stroke-width="1.5"/>
            <!-- Bent Acrylic Light Pipe Passing Through Airtight Front Header -->
            <path d="M 114 146 L 234 146 Q 262 146 262 118 L 262 92 L 336 92 L 336 122 L 292 122 Q 292 176 234 176 L 114 176 Z" fill="#bae6fd" fill-opacity="0.65" stroke="#0284c7" stroke-width="1.8"/>
            <!-- Total Internal Reflection Zigzag Ray -->
            <polyline points="114,160 168,148 214,174 268,144 277,104 332,107" fill="none" stroke="#16a34a" stroke-width="2.4" marker-end="url(#db85-arrGreen)"/>
            <!-- Front Bezel Window Glow -->
            <rect x="336" y="88" width="16" height="38" rx="4" fill="#16a34a" stroke="#14532d" stroke-width="1.4"/>
            <text x="364" y="102" font-size="8.8" font-weight="900" fill="#15803d">視認窓</text>
            <text x="364" y="116" font-size="8.0" font-weight="700" fill="#475569">気密一体</text>
            <!-- TIR Critical Angle Note -->
            <text x="198" y="64" text-anchor="middle" font-size="9.4" font-weight="900" fill="#0369a1">PMMA屈折率 n=1.49 → 全反射臨界角 θ_c = 42.2°</text>
            <text x="198" y="218" text-anchor="middle" font-size="9.0" font-weight="800" fill="#0f172a">基板を扉縁へ近づけず光だけ気密運搬 → 漏湿＆静電気ゼロ!</text>
            <text x="198" y="238" text-anchor="middle" font-size="8.4" font-weight="700" fill="#475569">緑：正常 ／ 黄：再生回復中 ／ 赤点滅：扉開60秒超・異常警報</text>
          </g>

          <!-- Right: Piezo Alarm & Modes -->
          <g transform="translate(432, 80)">
            ${drawKpiBox(0, 0, 126, 78, '警報音圧', '82 dB', '@ 1m / 4.0kHz共鳴', '#d97706')}
            ${drawKpiBox(136, 0, 126, 78, '鳴動消費電力', '15 mW', 'ヘルムホルツ共鳴腔', '#059669')}
            ${drawCompareFrame(0, 88, 262, 166, '3色ステータス ＆ 鳴動トリガー', '#92400e', '#fffbeb')}
            <circle cx="24" cy="130" r="7" fill="#16a34a"/>
            <text x="38" y="134" font-size="9.0" font-weight="800" fill="#14532d">ソフトグリーン：湿度35–45%正常</text>
            <circle cx="24" cy="160" r="7" fill="#f59e0b"/>
            <text x="38" y="164" font-size="9.0" font-weight="800" fill="#92400e">アンバー：MOF再生・急速除湿中</text>
            <circle cx="24" cy="190" r="7" fill="#dc2626"/>
            <text x="38" y="194" font-size="9.0" font-weight="900" fill="#991b1b">赤点滅＋82dB：扉開60秒 / 異常検知</text>
            <text x="16" y="226" font-size="8.4" font-weight="700" fill="#78350f">※夜間ミュート（アプリ設定・光警報のみ）対応</text>
          </g>
        `,
        cards: [
          { label: '核心部品', line1: '気密一体PMMA全反射ライトパイプ', line2: '4.0 kHz ヘルムホルツ共鳴圧電ブザー' },
          { label: '物理的メリット', line1: '臨界角42.2°全反射で低損失導光', line2: 'わずか15 mWで82 dBの高視認警報' },
          { label: 'カメラを守る意味', line1: 'うっかり扉半開き放置を60秒で警告', line2: '離れた部屋からでも異常に即気づく' },
        ],
      });

    case 'db_locking_pu_casters':
      return wrapDryboxHdSvg({
        badge: 'DB86',
        stepTag: '耐荷重270kg / 双輪ロック',
        title: '耐荷重270 kg デュアルロック・ポリウレタン静音双輪キャスター機構',
        analogy: '機材満載100kgの防湿庫を床を傷めず軽く動かせ、設置後は回転も首振りも同時固定する足回り',
        accent: '#1e293b',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Twin-Wheel Dual-Lock Cutaway -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="388" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="194" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">トータルロック双輪PUキャスター ＆ 防振脚(DB44)協調構造</text>
            <!-- Cabinet Base Plate -->
            <rect x="34" y="42" width="320" height="20" rx="3" fill="#334155"/>
            <text x="194" y="56" text-anchor="middle" font-size="8.8" font-weight="800" fill="#ffffff">高剛性スチールベースプレート</text>
            <!-- Swivel Double Ball Race -->
            <rect x="116" y="62" width="76" height="22" rx="4" fill="url(#db86-steel)" stroke="#0f172a" stroke-width="1.4"/>
            <circle cx="132" cy="73" r="4" fill="#0284c7"/><circle cx="154" cy="73" r="4" fill="#0284c7"/><circle cx="176" cy="73" r="4" fill="#0284c7"/>
            <!-- Heavy Steel Fork -->
            <path d="M 122 84 L 186 84 L 178 156 L 130 156 Z" fill="#64748b" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Twin Polyurethane Wheels -->
            <circle cx="154" cy="166" r="44" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
            <circle cx="154" cy="166" r="32" fill="#0284c7" stroke="#bae6fd" stroke-width="2"/>
            <circle cx="154" cy="166" r="12" fill="#cbd5e1" stroke="#0f172a"/>
            <!-- Red Dual-Lock Foot Pedal -->
            <path d="M 186 112 L 246 126 L 242 142 L 180 128 Z" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.5"/>
            <text x="218" y="114" text-anchor="middle" font-size="8.6" font-weight="900" fill="#dc2626">トータルロックペダル</text>
            <!-- Floor Line -->
            <line x1="24" y1="210" x2="364" y2="210" stroke="#475569" stroke-width="2.5"/>
            ${drawPin(154, 73, 256, 78, 1, '360°首振り同時固定', 'ダブル玉軸受＋歯止め', '#0284c7')}
            ${drawPin(188, 182, 256, 178, 2, '非マーキング PU双輪', 'Shore A 90・床傷ゼロ', '#0f172a')}
            <text x="194" y="238" text-anchor="middle" font-size="8.8" font-weight="800" fill="#15803d">設置後はDB44アジャスター脚を降ろして完全耐震固定!</text>
          </g>

          <!-- Right: Differential Twin-Wheel & Load KPIs -->
          <g transform="translate(424, 80)">
            ${drawKpiBox(0, 0, 130, 78, '4輪静耐荷重', '270 kg', '600 lb / 安全率2.5倍', '#1e293b')}
            ${drawKpiBox(140, 0, 130, 78, 'ロック方式', '全輪二重', '車輪＋旋回同時固定', '#dc2626')}
            ${drawCompareFrame(0, 88, 270, 166, 'なぜ「双輪（ツインホイール）」？', '#334155', '#ffffff')}
            <text x="14" y="130" font-size="9.2" font-weight="900" fill="#14532d">✅ 左右2輪の差動回転</text>
            <text x="20" y="148" font-size="8.4" font-weight="700" fill="#15803d">その場旋回でも左右が逆回転し</text>
            <text x="20" y="164" font-size="8.4" font-weight="700" fill="#15803d">フローリングの擦り傷・黒ずみを防止!</text>
            <text x="14" y="194" font-size="9.2" font-weight="800" fill="#0284c7">✅ 掃除・模様替えが機材入りのままOK</text>
            <text x="20" y="212" font-size="8.4" font-weight="600" fill="#475569">カメラを全撤去せずスッと動かして</text>
            <text x="20" y="228" font-size="8.4" font-weight="600" fill="#475569">背面清掃や配線メンテが1人で完結</text>
          </g>
        `,
        cards: [
          { label: '核心足回り', line1: '双輪ポリウレタン（Shore A 90）', line2: '全4輪トータルロック（回転＋旋回）' },
          { label: '物理的メリット', line1: '4輪合計 270 kg の高安全率耐荷重', line2: '差動双輪でフローリング擦り傷ゼロ' },
          { label: 'カメラを守る意味', line1: '機材満載でも1人で安全移動・掃除', line2: 'DB44防振脚と併用し設置後は不動固定' },
        ],
      });

    case 'db_bullseye_spirit_level':
      return wrapDryboxHdSvg({
        badge: 'DB87',
        stepTag: '360°水平 / ±0.25°',
        title: '筐体天面埋め込み 360°ブルズアイ気泡水準器による無歪み設置',
        analogy: '家の床のわずかな傾きを見抜き、泡を真ん中の黒丸に入れるだけで扉の隙間ゼロ設置が3分で完了',
        accent: '#16a34a',
        accentSoft: '#dcfce7',
        body: `
          <!-- Left: Bullseye Spirit Level Dial -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="290" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="145" y="20" text-anchor="middle" font-size="10.8" font-weight="800" fill="#0f172a">天面フラッシュ埋込 ブルズアイ水準器</text>
            <!-- Outer CNC Aluminum Bezel -->
            <circle cx="145" cy="130" r="82" fill="#334155" stroke="#0f172a" stroke-width="3"/>
            <!-- Fluorescent Green Fluid Dome -->
            <circle cx="145" cy="130" r="68" fill="#86efac" stroke="#15803d" stroke-width="2"/>
            <!-- Crosshairs & Concentric Target Rings -->
            <line x1="77" y1="130" x2="213" y2="130" stroke="#14532d" stroke-width="1.2" opacity="0.6"/>
            <line x1="145" y1="62" x2="145" y2="198" stroke="#14532d" stroke-width="1.2" opacity="0.6"/>
            <circle cx="145" cy="130" r="42" fill="none" stroke="#14532d" stroke-width="1.2" stroke-dasharray="3 2"/>
            <circle cx="145" cy="130" r="20" fill="none" stroke="#0f172a" stroke-width="2.2"/>
            <!-- Centered Air Bubble -->
            <circle cx="145" cy="130" r="14" fill="#ffffff" fill-opacity="0.88" stroke="#16a34a" stroke-width="1.8"/>
            <ellipse cx="141" cy="125" rx="4" ry="2.5" fill="#dcfce7"/>
            <text x="145" y="232" text-anchor="middle" font-size="9.4" font-weight="900" fill="#15803d">気泡が中央リング内 ＝ 傾き ≤ ±0.25°!</text>
          </g>

          <!-- Right: Why Leveling Matters for a Dry Box -->
          <g transform="translate(326, 80)">
            ${drawKpiBox(0, 0, 178, 78, '水準器感度', '30′ / 2 mm', 'X・Y直交2軸を同時視覚化', '#16a34a')}
            ${drawKpiBox(190, 0, 178, 78, '推奨設置精度', '≤ ±0.25°', 'DB44 4本脚で3分精密調整', '#0284c7')}
            ${drawCompareFrame(0, 88, 368, 166, '水平出しが防湿庫の「3大性能」を左右する理由', '#14532d', '#f0fdf4')}
            <text x="16" y="130" font-size="9.4" font-weight="900" fill="#14532d">1. 筐体のねじれ（ツイスト）をゼロに</text>
            <text x="24" y="146" font-size="8.6" font-weight="700" fill="#166534">床の凹凸による箱の歪み → 扉上部パッキン浮きを完全防止</text>
            <text x="16" y="174" font-size="9.4" font-weight="900" fill="#0369a1">2. 扉ヒンジ軸の完全鉛直化</text>
            <text x="24" y="190" font-size="8.6" font-weight="700" fill="#0c4a6e">重い強化ガラス扉が勝手に開く／閉まる偏荷重を解消</text>
            <text x="16" y="218" font-size="9.4" font-weight="900" fill="#b45309">3. 凝縮水ドレイン勾配の適正維持</text>
            <text x="24" y="234" font-size="8.6" font-weight="700" fill="#92400e">ペルチェ水受け〜ウィック(DB39)の設計流路が正しく機能</text>
          </g>
        `,
        cards: [
          { label: '核心計器', line1: '360°ブルズアイ円形気泡水準器', line2: 'CNCアルミベゼル天面フラッシュ埋込' },
          { label: '物理的メリット', line1: '前後左右2軸を同時に ±0.25° 調整', line2: '−20〜+60°C対応 UV耐性蛍光液' },
          { label: 'カメラを守る意味', line1: '床の傾きによるパッキン隙間を根絶', line2: '扉自重バランス＆ドレイン排水最適化' },
        ],
      });

    case 'db_rear_50mm_wall_bumpers':
      return wrapDryboxHdSvg({
        badge: 'DB88',
        stepTag: '背面 50mm 強制空間',
        title: '背面50 mm強制放熱クリアランス確保 衝撃吸収ウォールバンパー',
        analogy: '壁にベタ付けして放熱フィンが窒息するのを物理的に防ぐ、後ろ4隅の5 cm突っ張りクッション',
        accent: '#475569',
        accentSoft: '#f1f5f9',
        body: `
          <!-- Left: Side View Showing 50mm Convection Chimney & Cable Radius -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">側面断面：50 mm 強制煙突対流チャンネル ＆ 配線保護スペース</text>
            <!-- Cabinet Rear Body (Left) -->
            <rect x="24" y="42" width="166" height="176" rx="4" fill="#334155" stroke="#0f172a" stroke-width="1.6"/>
            <text x="107" y="134" text-anchor="middle" font-size="10.0" font-weight="900" fill="#ffffff">防湿庫 背面</text>
            <!-- Rear Heatsink protruding slightly -->
            <rect x="190" y="76" width="24" height="82" rx="2" fill="#ea580c" stroke="#9a3412"/>
            <text x="202" y="120" text-anchor="middle" font-size="7.8" font-weight="900" fill="#ffffff" transform="rotate(-90 202 120)">放熱フィン</text>
            <!-- Top & Bottom 50mm Wall Bumpers -->
            <rect x="190" y="50" width="100" height="18" rx="4" fill="#64748b" stroke="#0f172a"/>
            <rect x="282" y="47" width="18" height="24" rx="5" fill="#cbd5e1" stroke="#475569"/>
            <rect x="190" y="188" width="100" height="18" rx="4" fill="#64748b" stroke="#0f172a"/>
            <rect x="282" y="185" width="18" height="24" rx="5" fill="#cbd5e1" stroke="#475569"/>
            <!-- Safe AC Power Cord Bend -->
            <path d="M 190 168 Q 248 168 248 214" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
            <!-- Rising Natural Convection Plume in 50mm Gap -->
            <path d="M 244 176 L 244 74" fill="none" stroke="#0284c7" stroke-width="3.0" marker-end="url(#db88-arrBlue)"/>
            <path d="M 264 176 L 264 74" fill="none" stroke="#ea580c" stroke-width="2.6" stroke-dasharray="5 3" marker-end="url(#db88-arrRed)"/>
            <!-- Room Wall (Right) -->
            <rect x="300" y="38" width="32" height="184" fill="url(#db88-hatch)" stroke="#475569" stroke-width="1.5"/>
            <text x="316" y="130" text-anchor="middle" font-size="9.4" font-weight="900" fill="#334155" transform="rotate(-90 316 130)">部屋の壁（クロス）</text>
            <!-- 50mm Dimension Callout -->
            <line x1="190" y1="228" x2="300" y2="228" stroke="#0284c7" stroke-width="2"/>
            <text x="245" y="244" text-anchor="middle" font-size="9.8" font-weight="900" fill="#0369a1">強制クリアランス L = 50.0 mm</text>
            <text x="378" y="96" text-anchor="middle" font-size="8.6" font-weight="800" fill="#15803d">非移行性</text>
            <text x="378" y="112" text-anchor="middle" font-size="8.6" font-weight="800" fill="#15803d">シリコーン</text>
            <text x="378" y="128" text-anchor="middle" font-size="8.2" font-weight="700" fill="#475569">壁紙に黒色</text>
            <text x="378" y="142" text-anchor="middle" font-size="8.2" font-weight="700" fill="#475569">移りゼロ!</text>
          </g>

          <!-- Right: Thermal Impact KPIs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, '放熱フィン温度抑制', '−14°C', '壁ベタ付け窒息比の煙突効果', '#ea580c')}
            ${drawKpiBox(0, 88, 112, 74, '先端材質', '非移行ゴム', 'Shore A 55 壁保護', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, 'フールプルーフ', '説明書不要', '置くだけで最適距離', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'ACコード＆N₂配管の折れ断線防止', '#334155', '#f8fafc')}
            <text x="12" y="216" font-size="8.6" font-weight="800" fill="#0f172a">最小曲げ半径 R ≥ 40 mm を自動確保</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#475569">地震時に箱が壁を叩く衝撃も吸収!</text>
          </g>
        `,
        cards: [
          { label: '核心構造', line1: '背面4隅 50 mmアルミスタンドオフ', line2: '非移行性グレー・シリコーン先端' },
          { label: '物理的メリット', line1: '煙突対流確保で放熱温度 −14°C', line2: '電源コード・N₂管の鋭角折れ防止' },
          { label: 'カメラを守る意味', line1: '壁ベタ付けによる除湿力低下ゼロ', line2: '壁紙の色移り・地震壁打ちも防止' },
        ],
      });

    case 'db_copper_ion_esd_mat':
      return wrapDryboxHdSvg({
        badge: 'DB89',
        stepTag: 'Cu²⁺ 99.9%抗カビ+ESD',
        title: '銅イオン(Cu²⁺)抗カビ ＆ ESD帯電防止 3層カメラ室デッキマット',
        analogy: '10円玉の抗菌パワー×静電気アース×傷防止クッションを重ねた上段カメラ室の高機能カーペット',
        accent: '#0f766e',
        accentSoft: '#ccfbf1',
        body: `
          <!-- Left: 3-Layer Functional Cross-Section -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="424" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="212" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">厚さ 3.0 mm トリプル機能TPEマット 積層断面メカニズム</text>
            <!-- Camera Base Plate Resting on Top -->
            <rect x="116" y="40" width="192" height="32" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
            <text x="212" y="60" text-anchor="middle" font-size="9.2" font-weight="800" fill="#ffffff">カメラボディ底面 / 三脚プレート</text>
            <!-- Layer 1: Copper-Ion Antimicrobial Embossed Surface -->
            <rect x="34" y="82" width="356" height="36" rx="5" fill="#0f766e" stroke="#134e4a" stroke-width="1.5"/>
            <text x="212" y="104" text-anchor="middle" font-size="9.4" font-weight="900" fill="#ffffff">第1層：銅イオン（Cu²⁺）ゼオライト抗カビ表層＋キャップ置き皿</text>
            <!-- Layer 2: ESD Carbon Conductive Layer -->
            <rect x="34" y="122" width="356" height="34" rx="4" fill="#334155" stroke="#0f172a" stroke-width="1.4"/>
            <text x="212" y="143" text-anchor="middle" font-size="9.2" font-weight="800" fill="#fde047">第2層：ESD導電層（10⁶–10⁸ Ω/sq）＋ 10 mm真鍮スナップ端子</text>
            <!-- Layer 3: Plasticizer-Free TPE Cushion Base -->
            <rect x="34" y="160" width="356" height="36" rx="5" fill="#0284c7" fill-opacity="0.22" stroke="#0284c7" stroke-width="1.5"/>
            <text x="212" y="182" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0c4a6e">第3層：無可塑剤クリーンTPE緩衝ベース（塗装貼り付きゼロ）</text>
            <!-- ESD Drain Arrow to Cabinet Floor -->
            <line x1="212" y1="196" x2="212" y2="224" stroke="#16a34a" stroke-width="2.6" marker-end="url(#db89-arrGreen)"/>
            <text x="212" y="242" text-anchor="middle" font-size="9.0" font-weight="800" fill="#15803d">筐体アース(DB43)へ静電気を安全連続放電 ＆ 水洗い清掃OK!</text>
          </g>

          <!-- Right: Oligodynamic Effect & Specs -->
          <g transform="translate(460, 80)">
            ${drawKpiBox(0, 0, 234, 78, 'ISO 22196 抗菌抗カビ', '99.9%抑制', '抗菌活性値 R ≥ 3.0（Cu²⁺効果）', '#0f766e')}
            ${drawKpiBox(0, 88, 112, 74, 'ESD表面抵抗', '10⁶–10⁸ Ω', '静電気を緩徐放電', '#0284c7')}
            ${drawKpiBox(122, 88, 112, 74, '可塑剤移行', '0.0%', 'ボディ塗装無変色', '#16a34a')}
            ${drawCompareFrame(0, 172, 234, 82, 'なぜカメラ室ベース床に敷く？', '#134e4a', '#f0fdfa')}
            <text x="12" y="216" font-size="8.6" font-weight="800" fill="#134e4a">重力でホコリや胞子が最も溜まる場所</text>
            <text x="12" y="236" font-size="8.4" font-weight="600" fill="#115e59">雨天撮影帰りの仮置きでも繁殖を阻止!</text>
          </g>
        `,
        cards: [
          { label: '核心素材', line1: 'Cu²⁺銅イオン担持＋導電ESD＋TPE', line2: 'キャップ皿＆真鍮スナップ接地付' },
          { label: '物理的メリット', line1: 'ISO 22196 抗カビ活性値 R ≥ 3.0', line2: '微細エンボスでアルカプレート固着ゼロ' },
          { label: 'カメラを守る意味', line1: '底面の傷・静電気・カビ定着を3重防御', line2: '丸ごと取り外して水洗い・除菌清拭OK' },
        ],
      });

    case 'db_nist_nfc_cal_plate':
      return wrapDryboxHdSvg({
        badge: 'DB90',
        stepTag: 'ISO 17025 / オンメタルNFC',
        title: 'NISTトレーサブル校正レーザー銘板 ＆ オンメタルNFCデジタルタグ',
        analogy: '高級時計のクロノメーター証明書！スマホをかざすだけで校正証明PDFと交換部品表が一瞬で開く',
        accent: '#0284c7',
        accentSoft: '#e0f2fe',
        body: `
          <!-- Left: Laser-Etched Calibration Plate + On-Metal NFC Stack -->
          <g transform="translate(24, 80)">
            <rect x="0" y="0" width="406" height="254" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="203" y="20" text-anchor="middle" font-size="11.0" font-weight="800" fill="#0f172a">個体別 レーザー刻印校正銘板（正面）＆ オンメタルNFC断面</text>
            <!-- Black Hard-Anodized Laser Plate -->
            <rect x="24" y="36" width="358" height="106" rx="8" fill="#0f172a" stroke="#475569" stroke-width="2"/>
            <text x="40" y="58" font-size="9.4" font-weight="900" fill="#38bdf8">NIST / ISO 17025 TRACEABLE CALIBRATION</text>
            <text x="40" y="78" font-size="8.6" font-weight="700" fill="#e2e8f0">S/N: DB2026-JP-004821  |  SHT45 OFFSET: +0.12% RH</text>
            <text x="40" y="96" font-size="8.6" font-weight="700" fill="#cbd5e1">CHILLED-MIRROR REF VERIFIED: ±0.8% RH PASS</text>
            <text x="40" y="118" font-size="8.4" font-weight="800" fill="#34d399">EU DPP 2026 READY  •  NTAG424 DNA SIGNED</text>
            <!-- NFC Icon Badge on Right of Plate -->
            <rect x="308" y="48" width="60" height="82" rx="6" fill="#0284c7" stroke="#bae6fd" stroke-width="1.4"/>
            <text x="338" y="84" text-anchor="middle" font-size="10.2" font-weight="900" fill="#ffffff">NFC</text>
            <text x="338" y="100" text-anchor="middle" font-size="7.6" font-weight="800" fill="#e0f2fe">13.56MHz</text>
            <text x="338" y="114" text-anchor="middle" font-size="7.4" font-weight="700" fill="#fde047">スマホ読取</text>

            <!-- Bottom: On-Metal Ferrite Layer Cross-Section -->
            <rect x="24" y="156" width="358" height="84" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="1.3"/>
            <text x="203" y="174" text-anchor="middle" font-size="9.2" font-weight="800" fill="#0c4a6e">鉄箱の上でもNFCが確実に読める「フェライト吸収層」構造</text>
            <rect x="48" y="182" width="310" height="14" rx="2" fill="#0284c7"/><text x="203" y="192.5" text-anchor="middle" font-size="7.8" font-weight="800" fill="#ffffff">13.56 MHz NFCアンテナコイル（NTAG424 DNA暗号）</text>
            <rect x="48" y="198" width="310" height="14" rx="2" fill="#7c3aed"/><text x="203" y="208.5" text-anchor="middle" font-size="7.8" font-weight="800" fill="#ffffff">高透磁率 0.2mm フェライトシート（金属渦電流を遮断!）</text>
            <rect x="48" y="214" width="310" height="16" rx="2" fill="#475569"/><text x="203" y="225.5" text-anchor="middle" font-size="7.8" font-weight="800" fill="#e2e8f0">防湿庫 金属フレーム（通常タグは渦電流で読取不能）</text>
          </g>

          <!-- Right: Digital Product Passport KPIs -->
          <g transform="translate(442, 80)">
            ${drawKpiBox(0, 0, 252, 78, '出荷校正トレーサビリティ', 'ISO 17025', '鏡面冷却露点計照合 ±0.8% RH保証', '#0284c7')}
            ${drawCompareFrame(0, 88, 252, 166, 'スマホをかざすだけで開く4大情報', '#0c4a6e', '#f0f9ff')}
            <text x="14" y="130" font-size="9.0" font-weight="800" fill="#0f172a">1. 個体別 NIST 校正証明書 PDF</text>
            <text x="14" y="156" font-size="9.0" font-weight="800" fill="#0f172a">2. 飽和塩(DB61) 2点校正ガイド</text>
            <text x="14" y="182" font-size="9.0" font-weight="800" fill="#0f172a">3. 交換除湿コア・部品ダイレクト発注</text>
            <text x="14" y="208" font-size="9.0" font-weight="800" fill="#0f172a">4. NTAG424 DNA 正規品暗号証明</text>
            <text x="14" y="236" font-size="8.2" font-weight="700" fill="#0369a1">EUデジタルプロダクトパスポート(DPP 2026)先取り</text>
          </g>
        `,
        cards: [
          { label: '核心仕様', line1: 'レーザー永久刻印アルミ校正銘板', line2: 'フェライト層付 オンメタルNFCタグ' },
          { label: '物理的メリット', line1: '金属渦電流を遮断し確実にスマホ読取', line2: '鏡面露点計照合 ±0.8% RH個体保証' },
          { label: 'カメラを守る意味', line1: '20年保守・部品交換・校正履歴を一元化', line2: 'リセール時も品質・正規品証明が可能' },
        ],
      });

    default:
      return null;
  }
}
