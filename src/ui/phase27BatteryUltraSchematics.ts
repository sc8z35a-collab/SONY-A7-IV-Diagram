import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 27A Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (+30 diagrams):
 *   - Camera Battery Pack Ultra-Deep Expansion (P31–P60 -> 60 Total)
 * Every text element is strictly calibrated inside x ∈ [6, 310], y ∈ [8, 114].
 */
export function renderPhase27BatteryUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'bat_terminal_contact_springs':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="60" y="20" width="12" height="34" rx="2" fill="#94a3b8" stroke="#475569"/>
        <path d="M40 72 Q42 36 58 40 M92 72 Q90 36 74 40" fill="none" stroke="#d97706" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="58" cy="40" r="3" fill="#eab308"/>
        <circle cx="74" cy="40" r="3" fill="#eab308"/>
        <text x="66" y="77" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#92400e">二股2点クリップ挟持</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" fill="#b45309">接触抵抗 &lt; 5mΩ / 1000+回</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">P31 リン青銅・二股U字バネ接点</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・2本指バネがカメラピンを左右から挟む</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・片方にゴミが噛んでももう片方が通電</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・挿抜のたび酸化膜を削るセルフワイプ</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">激しい手持ち撮影でも絶対に電源が途切れない、金メッキ2本指ピンセット接点</text>
      `);

    case 'bat_latch_catch_pocket':
      return wrapSvg(`
        <rect x="20" y="20" width="90" height="62" rx="5" fill="#334155" stroke="#0f172a"/>
        <rect x="20" y="44" width="18" height="14" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5"/>
        <polygon points="10,47 32,51 10,55" fill="#0284c7"/>
        <rect x="92" y="68" width="18" height="12" rx="2" fill="#ea580c"/>
        <text x="68" y="37" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#f8fafc">ロック爪ポケット</text>
        <text x="66" y="75" text-anchor="middle" font-size="5.8" fill="#fdba74">手袋リップ</text>
        <text x="65" y="92" text-anchor="middle" font-size="5.9" fill="#c2410c">脱落耐荷重 &gt; 18 N 係合</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">P32 ロック爪凹部＆引抜リップ</text>
        <text x="136" y="43" font-size="6.9" fill="#7c2d12">・電池フタを開けても落下しない爪受け溝</text>
        <text x="136" y="56" font-size="6.9" fill="#7c2d12">・ギザギザ引抜リップで冬の手袋でもOK</text>
        <text x="136" y="69" font-size="6.9" fill="#7c2d12">・数千回の着脱で摩耗しない肉厚リブ成形</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">青いロック爪がカチッと掛かり、暗所や雪山でも安全に電池交換できる人間工学設計</text>
      `);

    case 'bat_usbc_silicone_dustplug':
      return wrapSvg(`
        <rect x="22" y="24" width="86" height="54" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="1.8"/>
        <rect x="34" y="38" width="62" height="24" rx="10" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <rect x="44" y="44" width="42" height="12" rx="5" fill="#1e293b"/>
        <circle cx="30" cy="70" r="4" fill="#0284c7"/>
        <text x="65" y="34" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#334155">SUS補強枠＋防塵栓</text>
        <text x="65" y="92" text-anchor="middle" font-size="5.9" fill="#475569">IP54相当 / 1万回挿抜補強</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">P33 USB-C防塵キャップ＆SUS枠</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・雨粒やホコリを塞ぐ紛失防止シリコーン栓</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・ステンレス枠がこじり力から基板を保護</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・電池室で引っかからないフラット沈込設計</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">便利なUSB-C直挿し充電口を雨やポケットの糸くずから守る、ゴム栓と金属の額縁</text>
      `);

    case 'bat_laser_datamatrix_lot':
      return wrapSvg(`
        <rect x="18" y="20" width="96" height="60" rx="4" fill="#1e293b" stroke="#94a3b8"/>
        <rect x="26" y="28" width="28" height="28" fill="#f8fafc"/>
        <rect x="28" y="30" width="6" height="24" fill="#0f172a"/>
        <rect x="28" y="48" width="24" height="6" fill="#0f172a"/>
        <rect x="38" y="32" width="5" height="5" fill="#0f172a"/>
        <rect x="46" y="38" width="5" height="5" fill="#0f172a"/>
        <rect x="38" y="40" width="5" height="5" fill="#0f172a"/>
        <text x="84" y="38" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#e2e8f0">LOT 26A4</text>
        <text x="84" y="51" text-anchor="middle" font-size="5.6" fill="#94a3b8">ECC200 2D</text>
        <text x="66" y="72" text-anchor="middle" font-size="5.8" fill="#fbbf24">消えないレーザー刻印</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" fill="#475569">全数検査ログ＆ペア選別ID</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">P34 レーザーロット＆2Dコード</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・摩擦や溶剤で絶対消えないレーザー刻印</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・同一ロット2セルのペア選別履歴を紐付</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・EUバッテリーパスポート＆偽造防止対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">いつどの工場で生まれ検査に合格したかを証明する、電池の消えないマイナンバー</text>
      `);

    case 'bat_swelling_foam_bumper':
      return wrapSvg(`
        <rect x="20" y="18" width="92" height="64" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <rect x="26" y="24" width="10" height="52" rx="2" fill="#475569"/>
        <rect x="96" y="24" width="10" height="52" rx="2" fill="#475569"/>
        <rect x="26" y="68" width="80" height="10" rx="2" fill="#334155"/>
        <rect x="40" y="26" width="22" height="38" rx="4" fill="#0284c7"/>
        <rect x="68" y="26" width="22" height="38" rx="4" fill="#0ea5e9"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#334155">落下G 60〜75% 低減PORON</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">P35 衝撃吸収PORON緩衝パッド</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・落下時の衝撃Gを吸収し溶接切れを防止</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・Si-Cセル充放電時の微細膨張を優しく受容</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・圧縮ヘタり5%未満の難燃独立気泡フォーム</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">高級スニーカーの中敷きみたいに衝撃を吸収し、セルのガタつきと膨らみを支えるクッション</text>
      `);

    case 'bat_secondary_ovp_ic':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <rect x="26" y="26" width="38" height="20" rx="2" fill="#475569"/>
        <text x="45" y="39" text-anchor="middle" font-size="5.8" fill="#cbd5e1">1次BMS(故障)</text>
        <rect x="26" y="54" width="42" height="22" rx="2" fill="#dc2626"/>
        <text x="47" y="67" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">2次OVP IC</text>
        <path d="M68 65 L82 65" stroke="#dc2626" stroke-width="2"/>
        <rect x="82" y="52" width="26" height="24" rx="3" fill="#f59e0b"/>
        <text x="95" y="66" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">SCP断</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b91c1c">&gt;4.35V 独立強制溶断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#991b1b">P36 独立セカンダリ過電圧保護IC</text>
        <text x="136" y="43" font-size="6.9" fill="#7f1d1d">・ソフト不要の純ハード監視(フリーズ不可)</text>
        <text x="136" y="56" font-size="6.9" fill="#7f1d1d">・1次保護が壊れても4.35V超で強制遮断</text>
        <text x="136" y="69" font-size="6.9" fill="#7f1d1d">・待機消費わずか2μAでIEC62133適合</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#991b1b">メイン頭脳が故障しても別ルートで非常ブレーキを引いて発火を絶対防ぐ第二の番人</text>
      `);

    case 'bat_esd_tvs_diode_pack':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <path d="M26 32 L38 42 L31 44 L44 56" fill="none" stroke="#eab308" stroke-width="2.2"/>
        <text x="40" y="28" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">±15kV静電気</text>
        <polygon points="62,38 72,48 62,58" fill="#2563eb"/>
        <polygon points="82,38 72,48 82,58" fill="#2563eb"/>
        <line x1="72" y1="36" x2="72" y2="74" stroke="#1d4ed8" stroke-width="2"/>
        <line x1="62" y1="74" x2="82" y2="74" stroke="#1d4ed8" stroke-width="2"/>
        <text x="96" y="51" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1e40af">MCU無事</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#1d4ed8">応答 &lt; 1ns 避雷クランプ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#1e3a8a">P37 ±15kV ESD保護TVSアレイ</text>
        <text x="136" y="43" font-size="6.9" fill="#1e40af">・冬の静電気ショックを10億分の1秒で吸収</text>
        <text x="136" y="56" font-size="6.9" fill="#1e40af">・S通信線・T温度線のマイコン破壊を防止</text>
        <text x="136" y="69" font-size="6.9" fill="#1e40af">・低容量設計で高速デジタル波形を保持</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#1e3a8a">セーターの静電気バチッ！を瞬時にアースへ逃がして繊細な頭脳チップを守る避雷針</text>
      `);

    case 'bat_ldo_reference_vreg':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <path d="M24 38 Q34 26 44 44 T56 38" fill="none" stroke="#f97316" stroke-width="2"/>
        <text x="38" y="62" text-anchor="middle" font-size="5.6" fill="#c2410c">5.0–8.4V変動</text>
        <rect x="58" y="34" width="24" height="24" rx="3" fill="#0891b2"/>
        <text x="70" y="49" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">LDO</text>
        <line x1="82" y1="46" x2="108" y2="46" stroke="#0284c7" stroke-width="2.4"/>
        <text x="95" y="38" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0369a1">3.300V</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0e7490">精度 ±0.5% / 待機 &lt; 2μA</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#0891b2"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#155e75">P38 超低消費LDO＆基準電圧源</text>
        <text x="136" y="43" font-size="6.9" fill="#164e63">・電池電圧が上下しても常に一定の基準電圧</text>
        <text x="136" y="56" font-size="6.9" fill="#164e63">・±2mV精度の残量測定を支えるモノサシ</text>
        <text x="136" y="69" font-size="6.9" fill="#164e63">・待機消費2μA未満で長期保管時も減らない</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#155e75">満タンでも空近くでもピタッと一定電圧を作り、正確な残量計測を支える精密モノサシ</text>
      `);

    case 'bat_eeprom_cal_memory':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <rect x="30" y="26" width="72" height="44" rx="3" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="66" y="39" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#c4b5fd">DataFlash / EEPROM</text>
        <text x="66" y="51" text-anchor="middle" font-size="5.6" fill="#e2e8f0">SOH 94% / 128回</text>
        <text x="66" y="62" text-anchor="middle" font-size="5.5" fill="#fde047">OCV曲線＋障害ログ</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#6d28d9">電源0Vでも20年記憶保持</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#5b21b6">P39 不揮発DataFlash / EEPROM</text>
        <text x="136" y="43" font-size="6.9" fill="#4c1d95">・充電回数・内部抵抗劣化・最高温度を記録</text>
        <text x="136" y="56" font-size="6.9" fill="#4c1d95">・3年目の古い電池でも残量ズレを自動学習</text>
        <text x="136" y="69" font-size="6.9" fill="#4c1d95">・異常停止ログを保持し原因究明にも活用</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#5b21b6">何度充電したか・今の体力は何%かを電池が空になっても絶対に忘れない健康手帳</text>
      `);

    case 'bat_precharge_shipmode_fet':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <rect x="24" y="26" width="38" height="22" rx="3" fill="#334155"/>
        <text x="43" y="39" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#93c5fd">冬眠 &lt;1μA</text>
        <path d="M64 37 L74 37" stroke="#059669" stroke-width="2"/>
        <rect x="74" y="26" width="34" height="22" rx="3" fill="#059669"/>
        <text x="91" y="39" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">起動OK</text>
        <path d="M26 70 L52 62 L78 56 L106 56" fill="none" stroke="#10b981" stroke-width="2.2"/>
        <text x="66" y="76" text-anchor="middle" font-size="5.6" fill="#065f46">0.05C 優しくプリ充電</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#047857">輸送冬眠＋深放電保護回復</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#059669"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#065f46">P40 プリチャージ＆出荷冬眠回路</text>
        <text x="136" y="43" font-size="6.9" fill="#064e3b">・工場出荷時は完全遮断(Ship Mode &lt;1μA)</text>
        <text x="136" y="56" font-size="6.9" fill="#064e3b">・初回充電接続で自動ウェイクアップ復帰</text>
        <text x="136" y="69" font-size="6.9" fill="#064e3b">・過放電セル(&lt;3V)を小電流で安全回復</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#065f46">お店に届くまで冬眠して電池を守り、空っぽの電池も最初はそっと優しく起こす回路</text>
      `);

    case 'bat_usbc_pd_cc_inductor':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="24" y="34" width="24" height="24" rx="3" fill="#334155"/>
        <text x="36" y="49" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fde047">5V</text>
        <path d="M50 46 Q55 34 60 46 T70 46 T80 46" fill="none" stroke="#d97706" stroke-width="2.4"/>
        <text x="65" y="31" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">昇圧コイル</text>
        <rect x="82" y="32" width="26" height="28" rx="3" fill="#059669"/>
        <text x="95" y="49" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">8.4V</text>
        <text x="66" y="72" text-anchor="middle" font-size="5.6" fill="#92400e">CC1/CC2 PD交渉 + η93%</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b45309">1.2MHz高効率シールド昇圧</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">P41 USB-C CC制御＆昇圧コイル</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・スマホ用5V入力を2S満充電8.4Vへ昇圧</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・CC1/CC2チップが充電器の能力を自動交渉</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・磁気シールドインダクタでノイズ漏れ抑制</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">専用充電器がなくてもUSB-Cの5Vを電池の中で8.4Vへグイッと持ち上げる電気の階段</text>
      `);

    case 'bat_comm_pullup_rc_filter':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <path d="M24 44 L30 34 L34 52 L38 36 L44 44" fill="none" stroke="#ef4444" stroke-width="1.6"/>
        <rect x="48" y="38" width="22" height="12" rx="2" fill="#475569"/>
        <text x="59" y="46" text-anchor="middle" font-size="5.5" fill="#fff">FB+R</text>
        <line x1="76" y1="44" x2="76" y2="66" stroke="#6366f1" stroke-width="1.6"/>
        <line x1="70" y1="66" x2="82" y2="66" stroke="#6366f1" stroke-width="2"/>
        <path d="M76 44 L86 44 L86 34 L96 34 L96 44 L106 44" fill="none" stroke="#16a34a" stroke-width="2"/>
        <text x="66" y="77" text-anchor="middle" font-size="5.6" fill="#4338ca">雑音除去→クリア通信</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#4f46e5">10MHz〜2.4GHz EMI遮断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eef2ff" stroke="#6366f1"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#3730a3">P42 通信RCフィルタ＆フェライト</text>
        <text x="136" y="43" font-size="6.9" fill="#312e81">・IBISやWi-Fiの高周波雑音をフェライト吸収</text>
        <text x="136" y="56" font-size="6.9" fill="#312e81">・残量%通信(S端子)のビット化けを防止</text>
        <text x="136" y="69" font-size="6.9" fill="#312e81">・連写パルスによる電圧計測ブレも平滑化</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#3730a3">カメラ内部の激しいモーター雑音を吸い取り、残量データをクリアに届ける耳栓フィルタ</text>
      `);

    case 'bat_bms_test_calib_pads':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <rect x="26" y="56" width="80" height="16" rx="2" fill="#14532d"/>
        <circle cx="38" cy="64" r="4" fill="#facc15"/>
        <circle cx="56" cy="64" r="4" fill="#facc15"/>
        <circle cx="74" cy="64" r="4" fill="#facc15"/>
        <circle cx="92" cy="64" r="4" fill="#facc15"/>
        <line x1="38" y1="26" x2="38" y2="59" stroke="#64748b" stroke-width="1.8"/>
        <line x1="56" y1="26" x2="56" y2="59" stroke="#64748b" stroke-width="1.8"/>
        <line x1="74" y1="26" x2="74" y2="59" stroke="#64748b" stroke-width="1.8"/>
        <line x1="92" y1="26" x2="92" y2="59" stroke="#64748b" stroke-width="1.8"/>
        <text x="66" y="25" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#854d0e">自動検査プローブ針</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#a16207">全数 ±2mV / ±0.5% 校正</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#854d0e">P43 工場校正用金テストパッド</text>
        <text x="136" y="43" font-size="6.9" fill="#713f12">・出荷前にロボットが針を当て全数自動校正</text>
        <text x="136" y="56" font-size="6.9" fill="#713f12">・シャント抵抗の個体差を1個ずつトリミング</text>
        <text x="136" y="69" font-size="6.9" fill="#713f12">・検査後に改ざん禁止ロックして超音波封止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#854d0e">フタを閉じる直前に検査ロボットが針を当て、残量計と安全動作を全数チェックする検査口</text>
      `);

    case 'bat_second_ntc_pcb_sensor':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <rect x="26" y="28" width="32" height="24" rx="3" fill="#1e293b"/>
        <text x="42" y="43" text-anchor="middle" font-size="5.6" fill="#fdba74">MOSFET</text>
        <rect x="66" y="34" width="16" height="12" rx="2" fill="#ea580c"/>
        <text x="74" y="42" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">NTC2</text>
        <rect x="86" y="28" width="22" height="44" rx="3" fill="#0284c7"/>
        <text x="97" y="53" text-anchor="middle" font-size="5.4" fill="#fff">NTC1</text>
        <text x="52" y="69" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#c2410c">基板+セル 2点同時監視</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#ea580c">80°Cホットスポット抑制</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">P44 基板側セカンドNTC温度計</text>
        <text x="136" y="43" font-size="6.9" fill="#7c2d12">・MOSFETやUSB-C昇圧ICの局所発熱を監視</text>
        <text x="136" y="56" font-size="6.9" fill="#7c2d12">・高温時は自動で充電電流を絞る安全制御</text>
        <text x="136" y="69" font-size="6.9" fill="#7c2d12">・セルNTC(P12)との温度差で異常も自己診断</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">セル本体だけでなく制御基板の熱くなりやすい部品も別に見張る、米粒より小さな温度計</text>
      `);

    case 'bat_nfc_health_telemetry':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <rect x="30" y="26" width="52" height="44" rx="6" fill="none" stroke="#d97706" stroke-width="2.2"/>
        <rect x="36" y="32" width="40" height="32" rx="4" fill="none" stroke="#d97706" stroke-width="1.6"/>
        <rect x="48" y="42" width="16" height="12" rx="2" fill="#0f172a"/>
        <path d="M88 38 Q98 48 88 58 M94 33 Q108 48 94 63" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0369a1">13.56MHz 無電源スマホ診断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#075985">P45 次世代NFC健康診断タグ</text>
        <text x="136" y="43" font-size="6.9" fill="#0c4a6e">・スマホをかざすだけで残量%・劣化度を表示</text>
        <text x="136" y="56" font-size="6.9" fill="#0c4a6e">・電池0%でも電波給電でシリアル読取OK</text>
        <text x="136" y="69" font-size="6.9" fill="#0c4a6e">・フェライト遮蔽シートで金属缶の干渉防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#075985">バッグの中の複数バッテリーもカメラに入れずスマホをかざすだけで健康診断できる未来タグ</text>
      `);

    case 'bat_aerogel_mica_barrier':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <rect x="24" y="26" width="28" height="48" rx="4" fill="#ef4444"/>
        <text x="38" y="53" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">1100°C</text>
        <rect x="58" y="22" width="14" height="56" rx="2" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
        <text x="65" y="53" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#92400e">遮断</text>
        <rect x="78" y="26" width="28" height="48" rx="4" fill="#0284c7"/>
        <text x="92" y="53" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">安全!</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b45309">k ≤ 0.020 W/m·K 断熱防火壁</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">P46 エアロゲル＆マイカ防火壁</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・宇宙服級エアロゲルで2本のセル間を断熱</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・金雲母マイカが1,100°Cの火炎噴流を遮断</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・片側異常時のドミノ熱暴走連鎖を完全阻止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">万一片方のセルが故障しても隣のセルへ熱を絶対移さない、2025–2026年究極の防火壁</text>
      `);

    case 'bat_cold_polyimide_heater':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <rect x="34" y="24" width="64" height="52" rx="6" fill="#0ea5e9" opacity="0.22" stroke="#0284c7"/>
        <path d="M42 32 H90 V42 H42 V52 H90 V62 H42 V70 H90" fill="none" stroke="#ea580c" stroke-width="2.4"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#c2410c">-20°C → +5°C コア予熱</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#f97316"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">P47 寒冷地ポリイミド自己ヒーター</text>
        <text x="136" y="43" font-size="6.9" fill="#7c2d12">・0°C以下を検知するとセルを内側から予熱</text>
        <text x="136" y="56" font-size="6.9" fill="#7c2d12">・低温充電のリチウム針状析出劣化を防止</text>
        <text x="136" y="69" font-size="6.9" fill="#7c2d12">・直接密着加熱で外部保温より省エネ30%</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">雪山やオーロラ撮影の氷点下でもセルをホカホカ温めてパワーを復活させる電気毛布膜</text>
      `);

    case 'bat_moisture_lci_breather':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <circle cx="46" cy="48" r="18" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
        <text x="46" y="46" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0284c7">ePTFE</text>
        <text x="46" y="55" text-anchor="middle" font-size="5.0" fill="#475569">空気OK/水NG</text>
        <rect x="76" y="32" width="28" height="32" rx="3" fill="#ffffff" stroke="#ef4444" stroke-width="1.5"/>
        <circle cx="90" cy="48" r="7" fill="#ef4444"/>
        <text x="90" y="74" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#dc2626">LCI水没</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b91c1c">0.2μm防水呼吸膜＋水没判定</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#991b1b">P48 水没検知LCI＆ePTFE呼吸膜</text>
        <text x="136" y="43" font-size="6.9" fill="#7f1d1d">・0.2μm微細孔が雨粒を弾き気圧だけ調整</text>
        <text x="136" y="56" font-size="6.9" fill="#7f1d1d">・飛行機や登山時のケース膨張応力を解消</text>
        <text x="136" y="69" font-size="6.9" fill="#7f1d1d">・浸水時のみ白→赤へ変色するLCI診断貼付</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#991b1b">ゴアテックスと同じミクロ膜で空気だけ呼吸させ、万一の浸水も赤変で知らせる窓</text>
      `);

    case 'bat_conformal_pcb_coat':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <rect x="26" y="54" width="80" height="16" fill="#14532d"/>
        <rect x="34" y="42" width="24" height="12" fill="#1e293b"/>
        <rect x="70" y="42" width="26" height="12" fill="#1e293b"/>
        <path d="M24 54 L24 38 Q66 32 108 38 L108 54" fill="#06b6d4" opacity="0.28" stroke="#0891b2" stroke-width="2"/>
        <circle cx="50" cy="28" r="4" fill="#0284c7"/>
        <circle cx="82" cy="27" r="3.5" fill="#0284c7"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0e7490">25μm 撥水・防結露コート</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#155e75">P49 BMS基板コンフォーマル被膜</text>
        <text x="136" y="43" font-size="6.9" fill="#164e63">・寒暖差の結露水滴によるピン間短絡を防止</text>
        <text x="136" y="56" font-size="6.9" fill="#164e63">・40kV/mm高絶縁膜で潮風の塩害腐食も遮断</text>
        <text x="136" y="69" font-size="6.9" fill="#164e63">・UV蛍光剤入りで工場の塗りムラ検査100%</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#155e75">雪山から暖かい室内へ入った瞬間の結露ショートから電子基板を守る透明レインコート</text>
      `);

    case 'bat_cell_top_insulator_ring':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <circle cx="66" cy="48" r="24" fill="#475569"/>
        <circle cx="66" cy="48" r="20" fill="#16a34a" stroke="#14532d" stroke-width="1.5"/>
        <circle cx="66" cy="48" r="10" fill="#e2e8f0" stroke="#94a3b8"/>
        <text x="66" y="50" text-anchor="middle" font-size="6.2" font-weight="bold" fill="#0f172a">正極+</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#15803d">外径17mm 0.25mm絶縁リング</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#166534">P50 上部絶縁座金＆ドーナツ紙</text>
        <text x="136" y="43" font-size="6.9" fill="#14532d">・1mm隣にある正極と負極鋼缶の短絡を防止</text>
        <text x="136" y="56" font-size="6.9" fill="#14532d">・外側バーレー紙＋内側PBT座金の二重絶縁</text>
        <text x="136" y="69" font-size="6.9" fill="#14532d">・バスバー溶接時の熱や摩耗にも強い耐圧紙</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#166534">プラス端子とたった1mm隣のマイナス鉄缶が絶対に触れ合わないためのドーナツ防壁</text>
      `);

    case 'bat_cell_bottom_insulator':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="28" y="64" width="76" height="10" fill="#475569"/>
        <rect x="32" y="56" width="28" height="7" fill="#e2e8f0" stroke="#64748b"/>
        <rect x="72" y="56" width="28" height="7" fill="#e2e8f0" stroke="#64748b"/>
        <rect x="34" y="26" width="64" height="28" rx="2" fill="#0284c7" opacity="0.75"/>
        <line x1="66" y1="54" x2="66" y2="66" stroke="#f59e0b" stroke-width="3"/>
        <text x="66" y="43" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">ジェリーロール</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#334155">底面絶縁座金＋中央溶接穴</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">P51 セル底部絶縁ディスク</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・正極シート下端が缶底へ触れる短絡を防止</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・中央穴だけ負極タブの底面溶接を通す構造</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・落下時の重い電極体の衝撃を受け止める</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">渦巻き電極の底面がマイナス極の鉄缶の床に擦れてショートするのを防ぐ丸い座布団</text>
      `);

    case 'bat_cell_crimp_bead_groove':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <path d="M34 74 V44 L45 38 L34 32 V22 H48" fill="none" stroke="#334155" stroke-width="3.0"/>
        <path d="M98 74 V44 L87 38 L98 32 V22 H84" fill="none" stroke="#334155" stroke-width="3.0"/>
        <rect x="47" y="25" width="38" height="12" rx="2" fill="#0284c7"/>
        <text x="66" y="33" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">封口キャップ</text>
        <text x="66" y="56" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#475569">1.2mmくびれ溝</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#334155">気密ロールクリンプ &gt;1.3MPa</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">P52 鋼缶くびれ溝＆クリンプ封口</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・内向きくびれ棚が内部ジェリーロールを固定</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・缶詰式の巻き締めで電解液漏れゼロ密閉</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・大気中の水分の侵入も数ppm以下へ遮断</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">電池の首もとをグルッとへこませて中身を固定し、缶詰みたいに密閉する精密プレス構造</text>
      `);

    case 'bat_positive_cap_button':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f8fafc" stroke="#475569"/>
        <path d="M30 64 H42 L48 39 H84 L90 64 H102" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <rect x="46" y="50" width="8" height="6" fill="#0f172a"/>
        <rect x="78" y="50" width="8" height="6" fill="#0f172a"/>
        <path d="M44 53 L24 49 M88 53 L108 49" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="66" y="30" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0f172a">正極凸キャップ</text>
        <text x="66" y="76" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#dc2626">放射ガス排気孔×4</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" fill="#475569">開裂圧 1.3〜2.0 MPa 安全排気</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">P53 排気孔付き正極トップキャップ</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・普段はバスバー溶接を受ける頑丈なプラス極</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・非常時は側面4孔から内圧ガスを安全放出</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・厚膜ニッケルメッキで酸化と接触抵抗を抑制</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">普段はプラス端子の帽子、非常時は横の小窓からガスを逃がして破裂を防ぐ王冠フタ</text>
      `);

    case 'bat_bottom_neg_spotweld':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fefce8" stroke="#eab308"/>
        <rect x="26" y="62" width="80" height="12" fill="#475569"/>
        <rect x="36" y="54" width="60" height="6" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="61" y="22" width="10" height="34" fill="#d97706"/>
        <circle cx="58" cy="61" r="4.5" fill="#facc15" stroke="#b45309"/>
        <circle cx="74" cy="61" r="4.5" fill="#facc15" stroke="#b45309"/>
        <text x="92" y="38" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#b45309">溶接電極棒</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#a16207">底面2点ナゲット &lt; 0.5mΩ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#854d0e">P54 セル底面・負極スポット溶接</text>
        <text x="136" y="43" font-size="6.9" fill="#713f12">・中空巻芯を通して缶の内底へ直接点溶接</text>
        <text x="136" y="56" font-size="6.9" fill="#713f12">・鉄缶全体を低抵抗なマイナス電極へ一体化</text>
        <text x="136" y="69" font-size="6.9" fill="#713f12">・外側の防錆ニッケル層を焼かない精密制御</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#854d0e">真ん中の穴から溶接棒を差し込み、電気の熱で負極タブと鉄缶の底をガッチリ一体化</text>
      `);

    case 'bat_jellyroll_end_tape':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0fdf4" stroke="#22c55e"/>
        <circle cx="56" cy="50" r="22" fill="#e2e8f0" stroke="#334155" stroke-width="1.6"/>
        <circle cx="56" cy="50" r="15" fill="none" stroke="#0284c7" stroke-width="1.5"/>
        <circle cx="56" cy="50" r="8" fill="none" stroke="#ea580c" stroke-width="1.5"/>
        <rect x="74" y="34" width="10" height="32" rx="2" fill="#22c55e" stroke="#15803d"/>
        <rect x="88" y="38" width="16" height="10" rx="1" fill="#f59e0b"/>
        <text x="96" y="60" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#92400e">バリ保護</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#15803d">耐電解液 30μm PP終端テープ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#166534">P55 巻回止め＆バリ保護テープ</text>
        <text x="136" y="43" font-size="6.9" fill="#14532d">・渦巻きの端を止めてほどけと変形を防止</text>
        <text x="136" y="56" font-size="6.9" fill="#14532d">・タブ溶接部の微細金属バリを覆い貫通遮断</text>
        <text x="136" y="69" font-size="6.9" fill="#14532d">・電解液に溶け出さない超高純度粘着剤採用</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#166534">太巻き寿司を止めるように渦巻きを固定し、鋭い金属の角を包んで内部短絡を防ぐテープ</text>
      `);

    case 'bat_tabless_collector_disc':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <circle cx="66" cy="49" r="24" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
        <line x1="42" y1="49" x2="90" y2="49" stroke="#d97706" stroke-width="2"/>
        <line x1="66" y1="25" x2="66" y2="73" stroke="#d97706" stroke-width="2"/>
        <line x1="49" y1="32" x2="83" y2="66" stroke="#d97706" stroke-width="1.6"/>
        <line x1="83" y1="32" x2="49" y2="66" stroke="#d97706" stroke-width="1.6"/>
        <circle cx="66" cy="49" r="14" fill="none" stroke="#eab308" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b45309">内部抵抗 50〜70% 劇的削減!</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">P56 次世代タブレス花弁集電盤</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・電極フチ全周を折り畳み360°レーザー溶接</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・電子移動距離を1/15へ短縮し発熱を激減</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・2025–2026年高出力円筒セルの革命構造</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">1本の細い橋を360度ぐるっと全周の広い橋に変え、電気渋滞と発熱を半分以下にする革新</text>
      `);

    case 'bat_al_cu_current_foils':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="26" y="26" width="80" height="18" rx="2" fill="#e2e8f0" stroke="#64748b"/>
        <text x="66" y="38" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#0f172a">正極 Al箔 12μm (4.3V耐性)</text>
        <rect x="26" y="52" width="80" height="14" rx="2" fill="#d97706" stroke="#92400e"/>
        <text x="66" y="61" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">負極 Cu箔 6μm (0.05V耐性)</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#92400e">髪の毛の1/10厚の極薄集電箔</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">P57 12μmアルミ箔＆6μm銅箔</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・アルミは高電圧でも溶けず正極の土台に</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・銅は低電圧でリチウムと反応せず負極に</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・箔を極薄化するほど同じ缶へ大容量を充填</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">プラスはアルミ、マイナスは銅！化学的に一番壊れにくい組み合わせの極薄金属ホイル</text>
      `);

    case 'bat_binder_conductive_cnt':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0fdfa" stroke="#0f766e"/>
        <circle cx="38" cy="40" r="10" fill="#334155"/>
        <circle cx="70" cy="36" r="11" fill="#475569"/>
        <circle cx="94" cy="54" r="9" fill="#334155"/>
        <circle cx="52" cy="64" r="10" fill="#475569"/>
        <path d="M38 40 Q54 30 70 36 T94 54 M38 40 Q42 54 52 64 T94 54" fill="none" stroke="#06b6d4" stroke-width="2.2"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0f766e">SWCNT 0.1%で立体導電網</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#0f766e"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#115e59">P58 バインダー＆SWCNT導電網</text>
        <text x="136" y="43" font-size="6.9" fill="#134e4a">・弾性バインダーがSi-C膨張でも剥離防止</text>
        <text x="136" y="56" font-size="6.9" fill="#134e4a">・極細カーボンナノチューブが粒子間を配線</text>
        <text x="136" y="69" font-size="6.9" fill="#134e4a">・わずか0.1%添加で高容量と長寿命を両立</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#115e59">伸び縮みするノリと炭素のクモの巣配線で、シリコン負極が膨らんでも電気を切らさない</text>
      `);

    case 'bat_semisolid_gel_matrix':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <rect x="24" y="24" width="84" height="52" rx="6" fill="#cffafe" stroke="#0891b2"/>
        <path d="M28 36 Q46 28 66 36 T104 36 M28 52 Q46 44 66 52 T104 52 M28 66 Q46 58 66 66 T104 66" fill="none" stroke="#0284c7" stroke-width="1.5"/>
        <circle cx="44" cy="44" r="4" fill="#8b5cf6"/>
        <circle cx="72" cy="44" r="4" fill="#8b5cf6"/>
        <circle cx="58" cy="60" r="4" fill="#8b5cf6"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0e7490">2026半固体 2,000回長寿命</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#155e75">P59 次世代半固体ゲル電解質</text>
        <text x="136" y="43" font-size="6.9" fill="#164e63">・液体をポリマー＋セラミックの網目へ固定</text>
        <text x="136" y="56" font-size="6.9" fill="#164e63">・液漏れゼロ・釘刺しでも極めて燃えにくい</text>
        <text x="136" y="69" font-size="6.9" fill="#164e63">・2026年商用化・1,500〜2,000回超長寿命</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#155e75">燃えやすい液体をゼリー状ゲルへ閉じ込め、安全性と長寿命を激変させる2026年の新技術</text>
      `);

    case 'bat_can_bottom_vent_valve':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fff1f2" stroke="#be123c"/>
        <circle cx="66" cy="49" r="24" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
        <path d="M50 38 A 18 18 0 1 1 50 60" fill="none" stroke="#be123c" stroke-width="2.4" stroke-dasharray="4 2"/>
        <rect x="52" y="45" width="28" height="8" rx="1" fill="#1e293b"/>
        <text x="66" y="51" text-anchor="middle" font-size="5.0" fill="#f8fafc">US18500G</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#9f1239">二次開裂 2.5MPa 底面スコア</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff1f2" stroke="#be123c"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#881337">P60 缶底レーザーID＆二次安全溝</text>
        <text x="136" y="43" font-size="6.9" fill="#881337">・トップ弁が間に合わない急圧を底から開放</text>
        <text x="136" y="56" font-size="6.9" fill="#881337">・残厚0.08mmのC字スコアで横破裂を防止</text>
        <text x="136" y="69" font-size="6.9" fill="#881337">・セル単体のメーカー型番とAグレード刻印</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#881337">上下ダブルの安全弁で最悪の内部短絡でも缶の破裂を防ぎ、セルの素性も刻んだ底面構造</text>
      `);

    default:
      return null;
  }
}
