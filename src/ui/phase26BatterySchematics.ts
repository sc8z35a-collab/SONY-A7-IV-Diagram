import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 26A Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (30 diagrams):
 *   - Standalone Flagship Camera Battery Pack Ultra-Dissection (Sony NP-FZ100 & Next-Gen: P01–P30)
 * Every text element is strictly calibrated inside x ∈ [6, 310], y ∈ [8, 114].
 */
export function renderPhase26BatterySchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'bat_outer_shell_front':
      return wrapSvg(`
        <rect x="20" y="18" width="90" height="64" rx="8" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <rect x="26" y="24" width="78" height="52" rx="5" fill="#475569" stroke="#94a3b8" stroke-dasharray="3 2"/>
        <text x="65" y="47" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#f8fafc">UL94 V-0難燃殻</text>
        <text x="65" y="61" text-anchor="middle" font-size="5.8" fill="#cbd5e1">超音波溶着シーム</text>
        <text x="65" y="92" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">38.7×51.7×22.7mm</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#334155"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">P01 難燃PC外装＆超音波溶着リブ</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・炎が消える最高難燃グレードUL94 V-0</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・ネジ不要の超音波溶着で高剛性＆防滴</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・1.5m落下衝撃から2本のセルを保護</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">防弾ガラス系の丈夫な樹脂を超音波でピタッと溶着した、電池を守る頑丈な防火スーツ</text>
      `);

    case 'bat_outer_shell_rear':
      return wrapSvg(`
        <rect x="22" y="18" width="84" height="64" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="1.6"/>
        <rect x="22" y="26" width="8" height="46" fill="#0284c7"/>
        <rect x="78" y="68" width="18" height="8" rx="1" fill="#f59e0b"/>
        <text x="64" y="44" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#f8fafc">非対称カギ溝</text>
        <text x="64" y="58" text-anchor="middle" font-size="5.8" fill="#fbbf24">ロック爪くぼみ</text>
        <text x="64" y="92" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">逆差し率 0% ポカヨケ形状</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#1e293b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">P02 背面シェル＆逆差し防止溝</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・片側ガイド溝で暗所でも逆挿入ゼロ</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・ラッチ凹部が電池フタ開閉時の落下防止</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・内壁アールリブが円筒セルをガタなく保持</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">家のカギと同じ非対称の溝で、真っ暗な現場でも絶対にプラスマイナスを間違えない</text>
      `);

    case 'bat_hologram_label':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="4" fill="#1e293b" stroke="#7c3aed" stroke-width="1.5"/>
        <rect x="76" y="24" width="30" height="26" rx="3" fill="#ddd6fe" stroke="#a855f7"/>
        <text x="91" y="40" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#6b21a8">3Dホロ</text>
        <text x="46" y="36" text-anchor="middle" font-size="6.6" font-weight="bold" fill="#f8fafc">7.2V 16.4Wh</text>
        <text x="46" y="50" text-anchor="middle" font-size="6.0" fill="#94a3b8">2280 mAh</text>
        <text x="66" y="69" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#fbbf24">PSE / UN38.3 適合</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" fill="#6b21a8">航空機持込(100Wh未満)クリア</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#6b21a8">P03 ホログラム＆安全認証銘板</text>
        <text x="136" y="43" font-size="7.0" fill="#581c87">・微細回折格子ホログラムで偽造品を判別</text>
        <text x="136" y="56" font-size="7.0" fill="#581c87">・16.4Wh明記で世界中の飛行機へ安心搭乗</text>
        <text x="136" y="69" font-size="7.0" fill="#581c87">・PSE/UL/CE/UN38.3の安全証明パスポート</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#6b21a8">お札と同じキラキラホログラムと国際空輸の安全証明を刻んだバッテリーのパスポート</text>
      `);

    case 'bat_terminal_block_4pin':
      return wrapSvg(`
        <rect x="16" y="24" width="100" height="46" rx="4" fill="#fefce8" stroke="#ca8a04" stroke-width="1.6"/>
        <rect x="24" y="34" width="14" height="24" rx="2" fill="#eab308"/>
        <rect x="46" y="34" width="14" height="24" rx="2" fill="#eab308"/>
        <rect x="68" y="34" width="14" height="24" rx="2" fill="#eab308"/>
        <rect x="90" y="34" width="14" height="24" rx="2" fill="#eab308"/>
        <text x="31" y="50" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#422006">＋</text>
        <text x="53" y="50" text-anchor="middle" font-size="7.0" font-weight="bold" fill="#422006">T</text>
        <text x="75" y="50" text-anchor="middle" font-size="7.0" font-weight="bold" fill="#422006">S</text>
        <text x="97" y="50" text-anchor="middle" font-size="7.2" font-weight="bold" fill="#422006">−</text>
        <text x="66" y="86" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#854d0e">電力＋温度T＋InfoLITHIUM通信S</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#854d0e">P04 4ピン凹型金メッキ端子ブロック</text>
        <text x="136" y="43" font-size="7.0" fill="#713f12">・二股フォーク接点で接触抵抗10mΩ未満</text>
        <text x="136" y="56" font-size="7.0" fill="#713f12">・硬質金メッキでサビと電圧降下を完全防止</text>
        <text x="136" y="69" font-size="7.0" fill="#713f12">・電気だけでなく残量%と温度も同時会話</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#854d0e">カメラへ大電流・温度・残り%データを一気に手渡す、酸化知らずの4本の黄金の口</text>
      `);

    case 'bat_terminal_guide_ribs':
      return wrapSvg(`
        <rect x="20" y="40" width="92" height="34" rx="3" fill="#e2e8f0" stroke="#475569"/>
        <rect x="24" y="28" width="8" height="44" fill="#334155"/>
        <rect x="46" y="28" width="8" height="44" fill="#334155"/>
        <rect x="68" y="28" width="8" height="44" fill="#334155"/>
        <rect x="90" y="28" width="8" height="44" fill="#334155"/>
        <circle cx="62" cy="19" r="9" fill="#f59e0b" stroke="#b45309"/>
        <text x="62" y="22" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#451a03">硬貨</text>
        <text x="66" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#dc2626">深さ3.5mm隔壁で異物到達不可!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">P05 端子間・絶縁隔壁フィン</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・金属端子を3.5mm奥へ後退＆幅1.2mm溝</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・ポケット内の硬貨や鍵による短絡発火ゼロ</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・カメラ側ブレード接点の精密挿入ガイド</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">端子の間に背の高い絶縁の壁を立て、カバンの中の鍵や小銭が触れて火花が出るのを防ぐ</text>
      `);

    case 'bat_bms_pcb':
      return wrapSvg(`
        <rect x="18" y="22" width="96" height="54" rx="4" fill="#166534" stroke="#14532d" stroke-width="1.6"/>
        <rect x="26" y="30" width="22" height="16" rx="2" fill="#0f172a"/>
        <rect x="54" y="30" width="22" height="16" rx="2" fill="#0f172a"/>
        <rect x="82" y="30" width="24" height="16" rx="2" fill="#dc2626"/>
        <rect x="26" y="52" width="80" height="14" rx="2" fill="#ca8a04"/>
        <text x="66" y="62" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#422006">2oz厚銅箔大電流バス</text>
        <text x="66" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#15803d">防湿コート4層BMS司令塔基板</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#15803d"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#166534">P06 多層BMS保護・制御メイン基板</text>
        <text x="136" y="43" font-size="7.0" fill="#14532d">・2oz厚銅箔で4A大電流も低抵抗・低発熱</text>
        <text x="136" y="56" font-size="7.0" fill="#14532d">・防湿コーティングで結露や湿気から保護</text>
        <text x="136" y="69" font-size="7.0" fill="#14532d">・待機消費&lt;20µAで数ヶ月放置でも長持ち</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#166534">電池の安全保護・残量計算・純正通信のすべてを親指サイズに凝縮した小さな司令塔ボード</text>
      `);

    case 'bat_infolithium_fuelgauge':
      return wrapSvg(`
        <rect x="18" y="22" width="44" height="44" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <text x="40" y="42" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#0369a1">∫ I(t) dt</text>
        <text x="40" y="55" text-anchor="middle" font-size="5.6" fill="#0369a1">電流積算</text>
        <path d="M62 44 H78" stroke="#0284c7" stroke-width="2"/>
        <rect x="78" y="22" width="42" height="44" rx="4" fill="#0f172a"/>
        <text x="99" y="42" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#38bdf8">73%</text>
        <text x="99" y="57" text-anchor="middle" font-size="5.6" fill="#94a3b8">1%刻み!</text>
        <text x="66" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">温度＋劣化度(SOH)を自動補正</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0369a1">P07 InfoLITHIUM残量計測IC</text>
        <text x="136" y="43" font-size="7.0" fill="#0c4a6e">・出入りする電荷を1msごとに全積算記録</text>
        <text x="136" y="56" font-size="7.0" fill="#0c4a6e">・電圧降下や寒さに騙されず1%単位正確表示</text>
        <text x="136" y="69" font-size="7.0" fill="#0c4a6e">・充放電回数と劣化度(SOH)を内部学習</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">出入りした電気のツブを家計簿のように数え、寒い冬でも突然0%落ちさせない賢いチップ</text>
      `);

    case 'bat_auth_crypto_ic':
      return wrapSvg(`
        <rect x="16" y="28" width="36" height="34" rx="4" fill="#e2e8f0" stroke="#475569"/>
        <text x="34" y="48" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#1e293b">カメラ</text>
        <path d="M52 38 H74 M74 52 H52" stroke="#7c3aed" stroke-width="1.8"/>
        <text x="63" y="34" text-anchor="middle" font-size="5.4" fill="#6d28d9">乱数</text>
        <text x="63" y="62" text-anchor="middle" font-size="5.4" fill="#6d28d9">暗号署名</text>
        <rect x="74" y="28" width="44" height="34" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.6"/>
        <text x="96" y="43" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#5b21b6">認証MCU</text>
        <text x="96" y="55" text-anchor="middle" font-size="5.6" fill="#6d28d9">&lt;15ms</text>
        <text x="66" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#5b21b6">純正安全プロファイル確立</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f5f3ff" stroke="#8b5cf6"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#5b21b6">P08 純正認証・暗号化マイコン</text>
        <text x="136" y="43" font-size="7.0" fill="#4c1d95">・起動15ms以内に秘密鍵で合言葉認証</text>
        <text x="136" y="56" font-size="7.0" fill="#4c1d95">・安全な最大放電電流と急速充電を通知</text>
        <text x="136" y="69" font-size="7.0" fill="#4c1d95">・粗悪コピー電池の発熱事故から本体保護</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#5b21b6">カメラと秘密の合言葉を交わして安全仕様を証明し、8Kや急速充電を安心して解禁する番人</text>
      `);

    case 'bat_protection_mosfet':
      return wrapSvg(`
        <rect x="16" y="30" width="42" height="34" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.6"/>
        <text x="37" y="45" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#991b1b">C-FET</text>
        <text x="37" y="57" text-anchor="middle" font-size="5.6" fill="#991b1b">充電門番</text>
        <line x1="58" y1="47" x2="72" y2="47" stroke="#dc2626" stroke-width="2.5"/>
        <rect x="72" y="30" width="42" height="34" rx="4" fill="#ffedd5" stroke="#ea580c" stroke-width="1.6"/>
        <text x="93" y="45" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#9a3412">D-FET</text>
        <text x="93" y="57" text-anchor="middle" font-size="5.6" fill="#9a3412">放電門番</text>
        <text x="65" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#dc2626">異常時 0.5ミリ秒未満で完全遮断!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#991b1b">P09 デュアル保護MOSFETスイッチ</text>
        <text x="136" y="43" font-size="7.0" fill="#7f1d1d">・充電用と放電用の2個を逆直列で制御</text>
        <text x="136" y="56" font-size="7.0" fill="#7f1d1d">・過充電/過放電/短絡を0.001秒未満で遮断</text>
        <text x="136" y="69" font-size="7.0" fill="#7f1d1d">・通常時は合計約10mΩの超低抵抗で低発熱</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#991b1b">危ない電気が流れた瞬間に0.001秒以下で電気の門をバタンと閉じる最強の電子ブレーカー</text>
      `);

    case 'bat_shunt_resistor':
      return wrapSvg(`
        <line x1="16" y1="44" x2="36" y2="44" stroke="#d97706" stroke-width="3"/>
        <rect x="36" y="32" width="58" height="24" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
        <text x="65" y="47" text-anchor="middle" font-size="7.0" font-weight="bold" fill="#92400e">5 mΩ 金属板</text>
        <line x1="94" y1="44" x2="114" y2="44" stroke="#d97706" stroke-width="3"/>
        <path d="M46 56 V70 H84 V56" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <text x="65" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">4端子ケルビン電圧測定 (I=V/R)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#92400e">P10 超低抵抗電流シャント抵抗(5mΩ)</text>
        <text x="136" y="43" font-size="7.0" fill="#78350f">・0.005Ω金属板の微小電圧から電流を実測</text>
        <text x="136" y="56" font-size="7.0" fill="#78350f">・温度変化に強いマンガニン合金(±1%)</text>
        <text x="136" y="69" font-size="7.0" fill="#78350f">・1%残量計測と短絡過電流監視の目</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">電気をほとんど邪魔せずに流れる勢いを1ミリ秒ごとに正確に測る電気の水道メーター</text>
      `);

    case 'bat_cell_balancer_ic':
      return wrapSvg(`
        <rect x="20" y="22" width="34" height="50" rx="4" fill="#ccfbf1" stroke="#0d9488" stroke-width="1.5"/>
        <rect x="24" y="30" width="26" height="38" fill="#14b8a6"/>
        <text x="37" y="52" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#fff">4.18V</text>
        <rect x="74" y="22" width="34" height="50" rx="4" fill="#ccfbf1" stroke="#0d9488" stroke-width="1.5"/>
        <rect x="78" y="42" width="26" height="26" fill="#2dd4bf"/>
        <text x="91" y="58" text-anchor="middle" font-size="6.4" font-weight="bold" fill="#134e4a">4.02V</text>
        <path d="M54 38 H74" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="64" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0f766e">高い方をバイパス放電して均等化!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#14b8a6"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#115e59">P11 2Sセル電圧監視＆バランサー</text>
        <text x="136" y="43" font-size="7.0" fill="#134e4a">・2本の直列セル電圧を±15mVで個別監視</text>
        <text x="136" y="56" font-size="7.0" fill="#134e4a">・充電終盤に高電圧側を逃がし高さ揃え</text>
        <text x="136" y="69" font-size="7.0" fill="#134e4a">・片セル過充電・早期劣化を徹底ブロック</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#115e59">2本の電池の元気さの差を自動でピッタリ揃え、バッテリー寿命を何年も長持ちさせる</text>
      `);

    case 'bat_ntc_thermistor':
      return wrapSvg(`
        <circle cx="34" cy="48" r="18" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="94" cy="48" r="18" fill="#cbd5e1" stroke="#475569"/>
        <text x="34" y="50" text-anchor="middle" font-size="6.0" fill="#1e293b">Cell 1</text>
        <text x="94" y="50" text-anchor="middle" font-size="6.0" fill="#1e293b">Cell 2</text>
        <circle cx="64" cy="48" r="7" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
        <text x="64" y="50" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#fff">NTC</text>
        <text x="64" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#c2410c">最も熱い谷間に直貼り (0〜45℃制御)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9a3412">P12 セル密着NTCサーミスタ温度計</text>
        <text x="136" y="43" font-size="7.0" fill="#7c2d12">・2本のセルの谷間へ熱伝導接着で密着</text>
        <text x="136" y="56" font-size="7.0" fill="#7c2d12">・氷点下充電の劣化＆真夏過熱を自動停止</text>
        <text x="136" y="69" font-size="7.0" fill="#7c2d12">・BMSとT端子経由カメラ双方へ温度伝達</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">2本の電池の真ん中にペタッと貼り付いた極小体温計が、熱が出たら即セーブして安全確保</text>
      `);

    case 'bat_thermal_fuse_ptc':
      return wrapSvg(`
        <rect x="16" y="24" width="44" height="44" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="38" y="43" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#92400e">PTC</text>
        <text x="38" y="56" text-anchor="middle" font-size="5.6" fill="#92400e">自動復帰</text>
        <path d="M60 46 H72" stroke="#dc2626" stroke-width="2.2"/>
        <rect x="72" y="24" width="46" height="44" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.6"/>
        <text x="95" y="43" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#991b1b">SCPヒューズ</text>
        <text x="95" y="56" text-anchor="middle" font-size="5.6" fill="#dc2626">永久溶断</text>
        <text x="66" y="86" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#991b1b">二重物理フェイルセーフ(UL2054)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#991b1b">P13 パックPTC＆永久サーマルヒューズ</text>
        <text x="136" y="43" font-size="7.0" fill="#7f1d1d">・電子FETとは独立した物理熱安全バリア</text>
        <text x="136" y="56" font-size="7.0" fill="#7f1d1d">・85℃超でPTC制限→異常時は永久溶断</text>
        <text x="136" y="69" font-size="7.0" fill="#7f1d1d">・純正品と粗悪コピーを分ける最後の砦</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#991b1b">万一電子回路が壊れても物理現象だけで確実に電気を絶つ、2段構えの最終命綱ヒューズ</text>
      `);

    case 'bat_nickel_busbar_weld':
      return wrapSvg(`
        <rect x="20" y="26" width="32" height="44" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <rect x="74" y="26" width="32" height="44" rx="4" fill="#cbd5e1" stroke="#475569"/>
        <text x="36" y="51" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#1e293b">3.6V</text>
        <text x="90" y="51" text-anchor="middle" font-size="6.3" font-weight="bold" fill="#1e293b">3.6V</text>
        <rect x="30" y="70" width="66" height="8" rx="2" fill="#94a3b8" stroke="#1e293b"/>
        <circle cx="38" cy="74" r="2" fill="#f59e0b"/>
        <circle cx="88" cy="74" r="2" fill="#f59e0b"/>
        <text x="63" y="91" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">純Ni-200スポット溶接 → 7.2V直列</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">P14 純ニッケル溶接タブ＆2Sバスバー</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・ハンダ熱を避け数msの電気溶接で結合</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・純度99.6%ニッケルで低抵抗＆赤錆ゼロ</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・U字応力逃がしで落下衝撃を吸収</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">電池を熱で傷めず一瞬のスポット溶接で2本を直列7.2Vへ結ぶ、錆びない純ニッケルの橋</text>
      `);

    case 'bat_cell_holder_frame':
      return wrapSvg(`
        <rect x="18" y="22" width="94" height="54" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
        <circle cx="42" cy="49" r="17" fill="#94a3b8" stroke="#334155"/>
        <circle cx="88" cy="49" r="17" fill="#94a3b8" stroke="#334155"/>
        <rect x="62" y="24" width="6" height="50" fill="#0284c7"/>
        <text x="65" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">0.8mm絶縁隔壁＋シリコーン耐震充填</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#38bdf8"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0369a1">P15 ツインセル骨格＆防振ポッティング</text>
        <text x="136" y="43" font-size="7.0" fill="#0c4a6e">・電位差のある2本のセル擦れショート防止</text>
        <text x="136" y="56" font-size="7.0" fill="#0c4a6e">・難燃シリコーン充填が落下衝撃Gを吸収</text>
        <text x="136" y="69" font-size="7.0" fill="#0c4a6e">・片側異常発熱時の隣セルへの熱伝播遅延</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">2本の重い円筒セル同士が擦れ合わないよう専用仕切り枠と弾性ゴムで抱え込む耐震構造</text>
      `);

    case 'bat_kapton_barley_paper':
      return wrapSvg(`
        <circle cx="58" cy="46" r="24" fill="#94a3b8" stroke="#334155"/>
        <circle cx="58" cy="46" r="21" fill="none" stroke="#2563eb" stroke-width="6"/>
        <circle cx="58" cy="46" r="9" fill="#f8fafc" stroke="#1e293b"/>
        <text x="58" y="49" text-anchor="middle" font-size="7.0" font-weight="bold" fill="#dc2626">＋</text>
        <rect x="86" y="28" width="26" height="36" rx="3" fill="#f59e0b" opacity="0.82" stroke="#b45309"/>
        <text x="99" y="49" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#451a03">カプトン</text>
        <text x="64" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#1d4ed8">青紙リング(5kV)＋耐熱260℃テープ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#1e40af">P16 青紙絶縁環＆耐熱カプトンテープ</text>
        <text x="136" y="43" font-size="7.0" fill="#1e3a8a">・正極と負極缶が1mm近接する肩部を保護</text>
        <text x="136" y="56" font-size="7.0" fill="#1e3a8a">・引き裂きに強い青紙でタブの食い込み防止</text>
        <text x="136" y="69" font-size="7.0" fill="#1e3a8a">・260℃耐熱カプトンで基板裏面を徹底絶縁</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">プラスとマイナスが1ミリしか離れていない危険地帯を青い絶縁環と琥珀テープで鉄壁防御</text>
      `);

    case 'bat_18500_steel_can':
      return wrapSvg(`
        <rect x="26" y="22" width="32" height="54" rx="5" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <rect x="35" y="17" width="14" height="5" rx="1" fill="#64748b"/>
        <rect x="70" y="22" width="32" height="54" rx="5" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
        <rect x="79" y="17" width="14" height="5" rx="1" fill="#64748b"/>
        <text x="42" y="46" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">18500</text>
        <text x="42" y="58" text-anchor="middle" font-size="5.6" fill="#334155">Ø18×50</text>
        <text x="86" y="46" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">18500</text>
        <text x="86" y="58" text-anchor="middle" font-size="5.6" fill="#334155">缶=負極</text>
        <text x="64" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">膨らまない頑丈スチール圧力容器</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">P17 18500ニッケル鋼スチール缶</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・直径18mm×長さ50mmの円筒セルを2本内蔵</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・スマホ袋電池と違い劣化しても膨らまない</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・金属缶全体がマイナス極と放熱フィン兼任</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">カメラの中でパンパンに膨らんで抜けなくなる事故を防ぐ、強靭な鋼鉄の円筒圧力容器</text>
      `);

    case 'bat_cell_pvc_sleeve':
      return wrapSvg(`
        <rect x="34" y="20" width="58" height="58" rx="6" fill="#16a34a" stroke="#14532d" stroke-width="1.8"/>
        <rect x="44" y="26" width="38" height="46" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <text x="63" y="46" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">スチール缶</text>
        <text x="63" y="58" text-anchor="middle" font-size="5.5" fill="#14532d">LOT:26A4</text>
        <text x="63" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#15803d">90µm熱収縮絶縁ジャケット(4kV)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#166534">P18 熱収縮PET/PVC絶縁スリーブ</text>
        <text x="136" y="43" font-size="7.0" fill="#14532d">・マイナス極の金属缶全面を熱収縮で密着絶縁</text>
        <text x="136" y="56" font-size="7.0" fill="#14532d">・絶縁破壊電圧4kV超の難燃フィルム被覆</text>
        <text x="136" y="69" font-size="7.0" fill="#14532d">・製造ロットと性能選別コードを個体印字</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#166534">全面マイナス極の金属缶に熱でピッタリ縮む絶縁ジャケットを着せ、接触ショートを防ぐ</text>
      `);

    case 'bat_cid_pressure_disc':
      return wrapSvg(`
        <path d="M22 44 Q64 30 106 44" fill="none" stroke="#e11d48" stroke-width="3"/>
        <line x1="22" y1="62" x2="106" y2="62" stroke="#475569" stroke-width="2.5"/>
        <path d="M64 78 V66 M50 78 V66 M78 78 V66" stroke="#dc2626" stroke-width="1.8"/>
        <text x="64" y="26" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#be123c">パチン!と上へ反転破断</text>
        <text x="64" y="56" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#dc2626">× 接点切断 (0 A)</text>
        <text x="64" y="91" text-anchor="middle" font-size="5.9" fill="#9f1239">内圧 1.0 MPa で物理的永久遮断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#e11d48"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9f1239">P19 セル内蔵CID(電流遮断ディスク)</text>
        <text x="136" y="43" font-size="7.0" fill="#881337">・異常ガス内圧が約10気圧に達すると反転</text>
        <text x="136" y="56" font-size="7.0" fill="#881337">・電極溶接点を物理的に引きちぎり永久停止</text>
        <text x="136" y="69" font-size="7.0" fill="#881337">・電子回路不要で働く円筒セル最強の安全弁</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9f1239">ジャム瓶のフタのように内圧でパチンと反り返り、発火前に電気を物理切断する内蔵安全盤</text>
      `);

    case 'bat_cell_ptc_ring':
      return wrapSvg(`
        <circle cx="62" cy="48" r="24" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
        <circle cx="62" cy="48" r="11" fill="#ffffff" stroke="#c2410c" stroke-width="1.5"/>
        <text x="62" y="34" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#9a3412">PTC環</text>
        <text x="62" y="67" text-anchor="middle" font-size="5.6" fill="#7c2d12">高温で抵抗1000倍</text>
        <text x="62" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#c2410c">冷えれば自動復帰する自己防衛環</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#9a3412">P20 セル頭部ドーナツ型PTC環</text>
        <text x="136" y="43" font-size="7.0" fill="#7c2d12">・常温20mΩ→110℃超で100Ω以上へ急変</text>
        <text x="136" y="56" font-size="7.0" fill="#7c2d12">・大電流短絡時に自動で電流にブレーキ</text>
        <text x="136" y="69" font-size="7.0" fill="#7c2d12">・CID永久停止の手前で穏やかに過熱鎮静</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#9a3412">セルが熱くなりすぎると電気の通り道をギュッと狭めて冷ます、頭部に内蔵の魔法ドーナツ</text>
      `);

    case 'bat_safety_vent_gasket':
      return wrapSvg(`
        <rect x="34" y="24" width="58" height="16" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
        <path d="M34 32 L16 24 M92 32 L110 24" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="63" y="35" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">正極排気キャップ</text>
        <rect x="22" y="42" width="82" height="12" rx="3" fill="#f1f5f9" stroke="#64748b"/>
        <text x="63" y="51" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">PP気密クリンプ・ガスケット</text>
        <path d="M34 62 L63 56 L92 62" fill="none" stroke="#dc2626" stroke-width="2"/>
        <text x="63" y="76" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#dc2626">スコア安全弁 (2.0 MPa開裂)</text>
        <text x="63" y="90" text-anchor="middle" font-size="5.7" fill="#475569">電解液漏れ＆湿気侵入ゼロ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">P21 防爆安全弁＆気密ガスケット</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・2.0MPaで切り込み弁が開き破裂前に排気</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・PPガスケットが正極と缶を10年気密絶縁</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・水分大敵のリチウム内部を完全ガード</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">圧力鍋の蒸気弁のように安全にガスだけ逃がす防爆溝と、液漏れを許さない気密パッキン</text>
      `);

    case 'bat_cathode_nmc_al':
      return wrapSvg(`
        <rect x="20" y="24" width="90" height="18" rx="2" fill="#334155"/>
        <text x="65" y="36" text-anchor="middle" font-size="6.1" fill="#f8fafc">高Ni NMC/NCA 活物質</text>
        <rect x="20" y="42" width="90" height="12" fill="#e2e8f0" stroke="#64748b"/>
        <text x="65" y="51" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#1e293b">12µm アルミ集電箔</text>
        <rect x="20" y="54" width="90" height="18" rx="2" fill="#334155"/>
        <text x="65" y="66" text-anchor="middle" font-size="6.1" fill="#f8fafc">高Ni NMC/NCA 活物質</text>
        <text x="65" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">正極(＋)：Li⁺を出し入れする層状結晶</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0369a1">P22 正極(カソード) NMC＆アルミ箔</text>
        <text x="136" y="43" font-size="7.0" fill="#0c4a6e">・極薄アルミ箔両面にリチウム酸化物を塗工</text>
        <text x="136" y="56" font-size="7.0" fill="#0c4a6e">・4.2Vの高電圧でも溶けないアルミ集電体</text>
        <text x="136" y="69" font-size="7.0" fill="#0c4a6e">・ハイニッケル組成で小型大容量600枚超</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#0369a1">キッチン箔より薄いアルミホイルの両面にリチウムの部屋を敷き詰めたプラス極シート</text>
      `);

    case 'bat_anode_siox_cu':
      return wrapSvg(`
        <rect x="20" y="24" width="90" height="18" rx="2" fill="#451a03"/>
        <text x="65" y="36" text-anchor="middle" font-size="6.1" fill="#fde68a">黒鉛＋Si-C(シリコン)負極</text>
        <rect x="20" y="42" width="90" height="12" fill="#f59e0b" stroke="#b45309"/>
        <text x="65" y="51" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#451a03">8µm 極薄電解銅箔</text>
        <rect x="20" y="54" width="90" height="18" rx="2" fill="#451a03"/>
        <text x="65" y="66" text-anchor="middle" font-size="6.1" fill="#fde68a">黒鉛＋Si-C(シリコン)負極</text>
        <text x="65" y="88" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#b45309">2025–2026革新：Si配合で容量急増!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#92400e">P23 負極(アノード) Si-C黒鉛＆銅箔</text>
        <text x="136" y="43" font-size="7.0" fill="#78350f">・充電したLi⁺を黒鉛の層間とSiへ高密度貯蔵</text>
        <text x="136" y="56" font-size="7.0" fill="#78350f">・シリコンは黒鉛の理論10倍のリチウム保持</text>
        <text x="136" y="69" font-size="7.0" fill="#78350f">・低電位で安定＆超低抵抗な8µm銅箔使用</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">極薄の銅箔に黒鉛と最新シリコン粒を塗り、同じサイズでスタミナを伸ばすマイナス極</text>
      `);

    case 'bat_ceramic_separator':
      return wrapSvg(`
        <rect x="18" y="24" width="24" height="50" rx="2" fill="#334155"/>
        <text x="30" y="52" text-anchor="middle" font-size="6.0" fill="#fff">正極</text>
        <rect x="46" y="20" width="34" height="58" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="63" y="44" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">アルミナ</text>
        <text x="63" y="56" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">微多孔膜</text>
        <rect x="84" y="24" width="24" height="50" rx="2" fill="#78350f"/>
        <text x="96" y="52" text-anchor="middle" font-size="6.0" fill="#fde68a">負極</text>
        <path d="M40 36 H86" stroke="#06b6d4" stroke-width="2"/>
        <text x="63" y="90" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0284c7">Li⁺通過／電子遮断／130℃自動閉塞!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">P24 セラミック耐熱微多孔セパレーター</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・16µm膜の極小穴がイオンだけを通過許可</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・130℃で穴が自ら溶けて閉鎖し反応停止</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・アルミナ耐熱層が180℃超でも破膜を防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">プラスとマイナスを隔ててイオンだけ通し、異常過熱したら自分で穴を閉じる賢い白い膜</text>
      `);

    case 'bat_electrolyte_sei':
      return wrapSvg(`
        <rect x="18" y="22" width="96" height="54" rx="5" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5"/>
        <rect x="18" y="22" width="18" height="54" fill="#78350f"/>
        <rect x="36" y="22" width="10" height="54" fill="#a855f7" opacity="0.5"/>
        <text x="41" y="52" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#581c87">SEI</text>
        <circle cx="64" cy="36" r="6" fill="#06b6d4"/>
        <text x="64" y="38.5" text-anchor="middle" font-size="5.6" fill="#fff">Li⁺</text>
        <circle cx="88" cy="56" r="6" fill="#06b6d4"/>
        <text x="88" y="58.5" text-anchor="middle" font-size="5.6" fill="#fff">Li⁺</text>
        <text x="66" y="90" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0e7490">非水LiPF₆電解液＋20nm SEI守護膜</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#22d3ee"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#155e75">P25 有機電解液＆ナノSEI保護皮膜</text>
        <text x="136" y="43" font-size="7.0" fill="#164e63">・4.2Vに耐える水分ゼロ有機カーボネート海</text>
        <text x="136" y="56" font-size="7.0" fill="#164e63">・初回充電で負極表面に20nmのSEI層が形成</text>
        <text x="136" y="69" font-size="7.0" fill="#164e63">・劣化防止と-10℃極寒撮影の電圧維持の鍵</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">リチウムイオンが泳ぐ魔法のプールと、負極を守り続けて長寿命を生む極薄ナノ皮膜</text>
      `);

    case 'bat_center_mandrel_pin':
      return wrapSvg(`
        <rect x="24" y="22" width="76" height="54" rx="6" fill="#e2e8f0" stroke="#475569"/>
        <rect x="52" y="18" width="20" height="60" rx="2" fill="#f8fafc" stroke="#1e293b" stroke-width="1.8"/>
        <path d="M62 72 V24" stroke="#ef4444" stroke-width="2.2" stroke-dasharray="3 2"/>
        <polygon points="62,18 57,26 67,26" fill="#ef4444"/>
        <text x="62" y="90" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#334155">巻回支え＋異常ガス頂部排気ストロー</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#0f172a">P26 中空ステンレス・マンドレル軸</text>
        <text x="136" y="43" font-size="7.0" fill="#334155">・巻回シート中心の膨張収縮座屈を防止</text>
        <text x="136" y="56" font-size="7.0" fill="#334155">・異常時の下部ガスを中空管で安全弁へ直通</text>
        <text x="136" y="69" font-size="7.0" fill="#334155">・CIDと防爆弁を確実に作動させる命の煙突</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#334155">トイレットペーパーの芯のように巻物を支え、万一時はガスを上の安全弁へ導くストロー</text>
      `);

    case 'bat_electrode_tabs_weld':
      return wrapSvg(`
        <rect x="26" y="30" width="72" height="40" rx="4" fill="#e2e8f0" stroke="#475569"/>
        <rect x="44" y="16" width="12" height="18" fill="#cbd5e1" stroke="#334155"/>
        <text x="78" y="27" font-size="6.0" font-weight="bold" fill="#334155">Al正極タブ</text>
        <rect x="68" y="66" width="12" height="16" fill="#f59e0b" stroke="#b45309"/>
        <text x="42" y="80" font-size="6.0" font-weight="bold" fill="#92400e">Ni負極タブ</text>
        <text x="62" y="53" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1e293b">超音波低温溶接</text>
        <text x="62" y="92" text-anchor="middle" font-size="5.8" fill="#b45309">バリ短絡防止カプトン保護付</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#fbbf24"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#92400e">P27 セル内部アルミ/ニッケル集電タブ</text>
        <text x="136" y="43" font-size="7.0" fill="#78350f">・極薄箔に穴を開けない超音波摩擦溶接</text>
        <text x="136" y="56" font-size="7.0" fill="#78350f">・正極はAlタブで頭へ、負極はNiタブで底へ</text>
        <text x="136" y="69" font-size="7.0" fill="#78350f">・低抵抗設計が8K大電流時の発熱を抑える</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#92400e">グルグル巻いたシートの電気を集めて蓋と底へ運ぶ、極薄箔を超音波で繋いだ電気ロープ</text>
      `);

    case 'bat_usbc_pd_charger_ic':
      return wrapSvg(`
        <rect x="16" y="34" width="32" height="24" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
        <text x="32" y="49" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1e40af">USB-C</text>
        <path d="M48 46 H64" stroke="#2563eb" stroke-width="2"/>
        <rect x="64" y="26" width="52" height="40" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="90" y="43" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#1d4ed8">5V→8.4V</text>
        <text x="90" y="56" text-anchor="middle" font-size="5.8" fill="#1e40af">昇圧CC/CV</text>
        <text x="66" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#1d4ed8">専用充電器不要! 約2.5h満充電</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#1e40af">P28 直結USB-C急速充電ポート＆IC</text>
        <text x="136" y="43" font-size="7.0" fill="#1e3a8a">・スマホ用USB-Cケーブルを電池へ直接挿入</text>
        <text x="136" y="56" font-size="7.0" fill="#1e3a8a">・効率94%昇圧ICで2S満充電8.4Vへ制御</text>
        <text x="136" y="69" font-size="7.0" fill="#1e3a8a">・2025–2026最新ロケ携行の革命機能</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#1e40af">旅先で専用充電器がなくても、モバイルバッテリーから電池へ直結充電できる次世代装備</text>
      `);

    case 'bat_touch_4led_gauge':
      return wrapSvg(`
        <rect x="16" y="28" width="98" height="38" rx="6" fill="#0f172a" stroke="#06b6d4" stroke-width="1.6"/>
        <circle cx="32" cy="47" r="7" fill="#eab308"/>
        <text x="32" y="49.5" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#422006">触る</text>
        <circle cx="54" cy="47" r="4.5" fill="#22d3ee"/>
        <circle cx="69" cy="47" r="4.5" fill="#22d3ee"/>
        <circle cx="84" cy="47" r="4.5" fill="#22d3ee"/>
        <circle cx="99" cy="47" r="4.5" fill="#334155" stroke="#64748b"/>
        <text x="65" y="84" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0891b2">カメラ不要! 親指タッチで75%即表示</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#155e75">P29 タッチ式4段階LED残量チェッカー</text>
        <text x="136" y="43" font-size="7.0" fill="#164e63">・穴を開けない静電容量タッチで防水維持</text>
        <text x="136" y="56" font-size="7.0" fill="#164e63">・4つの光で25/50/75/100%を3秒間表示</text>
        <text x="136" y="69" font-size="7.0" fill="#164e63">・予備電池の選別を一瞬にする現場神機能</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#155e75">カバンの中の予備電池をポンと触るだけで残量がパッと光ってわかるスマートチェッカー</text>
      `);

    case 'bat_thermal_graphite_wrap':
      return wrapSvg(`
        <rect x="18" y="20" width="96" height="58" rx="5" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.6"/>
        <rect x="26" y="28" width="34" height="42" rx="4" fill="#fca5a5" stroke="#dc2626"/>
        <rect x="72" y="28" width="34" height="42" rx="4" fill="#93c5fd" stroke="#2563eb"/>
        <path d="M56 49 H76" stroke="#4f46e5" stroke-width="3"/>
        <text x="43" y="52" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#7f1d1d">熱側</text>
        <text x="89" y="52" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#1e3a8a">冷側</text>
        <text x="66" y="90" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#4338ca">ΔT&lt;1.5℃均熱＋極寒急冷クッション</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="136" y="29" font-size="7.5" font-weight="bold" fill="#3730a3">P30 グラファイト均熱＆耐寒シート</text>
        <text x="136" y="43" font-size="7.0" fill="#312e81">・k=1200W/m·Kシートで2本セルを均温化</text>
        <text x="136" y="56" font-size="7.0" fill="#312e81">・片側だけの劣化を防ぎパック寿命+30%</text>
        <text x="136" y="69" font-size="7.0" fill="#312e81">・断熱緩衝層が雪山ロケの急冷電圧落ち緩和</text>
        <text x="160" y="106" text-anchor="middle" font-size="7.0" fill="#3730a3">2本の電池の温度差を消して均等に長生きさせ、夏の8K発熱も冬の極寒も和らげる毛布</text>
      `);

    default:
      return null;
  }
}
