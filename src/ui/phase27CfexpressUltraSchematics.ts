import { PartExplanation } from '../assemblies/types';

function wrapSvg(inner: string): string {
  return `<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${inner}</svg>`;
}

/**
 * Phase 27B Bespoke 320x118 Beginner-Friendly Japanese Technical Schematic SVGs (+30 diagrams):
 *   - CFexpress 4.0 Card Ultra-Deep Expansion (C31–C60 -> 60 Total)
 * Every text element is strictly calibrated inside x ∈ [6, 310], y ∈ [8, 114].
 */
export function renderPhase27CfexpressUltraSchematicSvg(
  type: PartExplanation['diagramType']
): string | null {
  switch (type) {
    case 'cfe_edge_bevel_chamfer':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <polygon points="24,42 84,42 104,52 104,58 84,68 24,68" fill="#14532d" stroke="#166534" stroke-width="1.5"/>
        <rect x="28" y="38" width="54" height="5" fill="#eab308"/>
        <path d="M98 32 Q88 38 78 38" fill="none" stroke="#475569" stroke-width="2.4"/>
        <text x="68" y="31" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#854d0e">25°スロープ面取り</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#a16207">1万回挿抜・金箔めくれゼロ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#854d0e">C31 エッジ先端25°面取り加工</text>
        <text x="136" y="43" font-size="6.9" fill="#713f12">・カメラ側ピンを優しく押し広げる先端傾斜</text>
        <text x="136" y="56" font-size="6.9" fill="#713f12">・金箔セットバック0.3mmで剥離を完全防止</text>
        <text x="136" y="69" font-size="6.9" fill="#713f12">・挿入力を約40%下げ10,000回挿抜に対応</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#854d0e">先端をなだらかな滑り台に削ることで、カメラの繊細な金属バネを守り続ける精密加工</text>
      `);

    case 'cfe_staggered_hotplug_pins':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <rect x="26" y="26" width="10" height="44" rx="1" fill="#eab308"/>
        <rect x="42" y="26" width="10" height="44" rx="1" fill="#f59e0b"/>
        <rect x="58" y="26" width="10" height="34" rx="1" fill="#0284c7"/>
        <rect x="74" y="26" width="10" height="34" rx="1" fill="#0284c7"/>
        <rect x="90" y="26" width="10" height="24" rx="1" fill="#ef4444"/>
        <text x="39" y="77" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#92400e">①GND/+3V</text>
        <text x="71" y="67" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#0369a1">②PCIe</text>
        <text x="95" y="58" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#dc2626">③INS#</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b45309">段差長(スタガー)時間差接触</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">C32 先行GND＆遅延INS#ピン</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・長いGND/+3.3Vが先に触れ静電気を逃がす</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・短いINS#(Pin12)が最後に装着完了を通知</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・抜去時はINS#が真っ先に切れ安全停止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">アース→電源→高速信号→装着完了の順で握手することで故障を防ぐCFA規格の時間差設計</text>
      `);

    case 'cfe_side_guide_rails_notch':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <rect x="34" y="24" width="60" height="52" rx="4" fill="#334155" stroke="#0f172a"/>
        <rect x="30" y="28" width="5" height="44" fill="#0284c7"/>
        <rect x="93" y="44" width="6" height="12" fill="#ea580c"/>
        <polygon points="108,46 95,50 108,54" fill="#ea580c"/>
        <text x="64" y="47" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#f8fafc">Type A 20×28mm</text>
        <text x="64" y="59" text-anchor="middle" font-size="5.5" fill="#fdba74">プッシュ固定ノッチ</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#c2410c">SD兼用スロット精密位置決め</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">C33 サイドガイド＆固定ノッチ</text>
        <text x="136" y="43" font-size="6.9" fill="#7c2d12">・非対称レールが暗所での裏表逆差しを防止</text>
        <text x="136" y="56" font-size="6.9" fill="#7c2d12">・側面ノッチがプッシュ式爪とカチッと係合</text>
        <text x="136" y="69" font-size="6.9" fill="#7c2d12">・SD/CFexpress Type A両用スロットで高精度</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">押すとカチッと止まりもう一度押すとポンと出てくる、カメラ側スロットとの精密な噛み合い</text>
      `);

    case 'cfe_armor_laser_welds':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="28" y="34" width="76" height="14" rx="2" fill="#94a3b8" stroke="#334155"/>
        <rect x="28" y="52" width="76" height="14" rx="2" fill="#64748b" stroke="#1e293b"/>
        <circle cx="38" cy="50" r="3.5" fill="#f97316"/>
        <circle cx="56" cy="50" r="3.5" fill="#f97316"/>
        <circle cx="74" cy="50" r="3.5" fill="#f97316"/>
        <circle cx="92" cy="50" r="3.5" fill="#f97316"/>
        <text x="66" y="29" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#ea580c">パルスレーザー点溶接</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#334155">曲げ150N(10×) / 落下7.5m</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">C34 メタルアーマー微細レーザー溶接</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・上下金属板を閉断面ボックス構造へ一体化</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・15kgf曲げ＆7.5m落下でも基板の反りを防止</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・極短パルス溶接で内部NANDへの熱影響ゼロ</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">2枚の薄い金属を点レーザーで縫い合わせ、薄さ2.8mmの頑丈なミニ金庫へ変える接合技術</text>
      `);

    case 'cfe_emi_ground_spring_clips':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="26" y="26" width="80" height="10" rx="2" fill="#64748b"/>
        <rect x="26" y="62" width="80" height="10" rx="2" fill="#14532d"/>
        <path d="M38 62 L44 36 L52 62 M80 62 L86 36 L94 62" fill="none" stroke="#d97706" stroke-width="2.4"/>
        <text x="66" y="52" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#b45309">BeCuアースバネ</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#92400e">EMI &gt;20dB低減 (〜16GHz)</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">C35 シェル導通EMIアースクリップ</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・金属外装と基板GNDを多点バネで低抵抗直結</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・外装を完全なファラデーケージ化し電波遮断</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・Wi-Fi/GNSS/マイクへの高速ノイズ漏れ防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">金属ケースと基板のアースを小さなバネ橋で直結し、160億Hzの超高速ノイズを封じ込める</text>
      `);

    case 'cfe_micro_vapor_fin_plate':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <rect x="24" y="28" width="84" height="16" rx="2" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
        <path d="M52 44 L34 34 M80 44 L98 34" stroke="#dc2626" stroke-width="2"/>
        <rect x="46" y="50" width="40" height="20" rx="2" fill="#dc2626"/>
        <text x="66" y="63" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">SoC 4.5W</text>
        <text x="66" y="38" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#9a3412">全面拡散フィン層</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#c2410c">ΔT 35%低減 / VPG800持続</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#9a3412">C36 超薄型マイクロ放熱フィン層</text>
        <text x="136" y="43" font-size="6.9" fill="#7c2d12">・7nmコントローラの局所発熱を全面へ拡散</text>
        <text x="136" y="56" font-size="6.9" fill="#7c2d12">・8K RAW長時間録画の熱ダレ(速度低下)抑制</text>
        <text x="136" y="69" font-size="6.9" fill="#7c2d12">・厚さ0.25mm級で次世代ベイパー拡散へ進化</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#9a3412">1秒2GB書込で熱くなる頭脳チップの熱を、カード全面の金属鎧へ素早く逃がす熱の高速道路</text>
      `);

    case 'cfe_vpg800_laser_serial':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#1e293b" stroke="#facc15"/>
        <rect x="26" y="26" width="38" height="28" rx="3" fill="#0f172a" stroke="#facc15" stroke-width="1.6"/>
        <text x="45" y="39" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#facc15">VPG</text>
        <text x="45" y="49" text-anchor="middle" font-size="6.8" font-weight="bold" fill="#fff">800</text>
        <path d="M74 30 Q86 38 74 46 M86 30 Q98 38 86 46" fill="none" stroke="#f97316" stroke-width="1.8"/>
        <text x="86" y="58" text-anchor="middle" font-size="5.5" fill="#fdba74">IR放射 ε=0.9</text>
        <text x="66" y="74" text-anchor="middle" font-size="5.6" fill="#cbd5e1">S/N 2604-800G-A1</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#a16207">赤外線放熱6倍＋VPG800認証</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#854d0e">C37 高放射黒塗装＆VPG800刻印</text>
        <text x="136" y="43" font-size="6.9" fill="#713f12">・マット黒塗装が赤外線放熱を裸金属の6倍に</text>
        <text x="136" y="56" font-size="6.9" fill="#713f12">・VPG800＝最低800MB/s動画保証の公式証</text>
        <text x="136" y="69" font-size="6.9" fill="#713f12">・レーザー刻印シリアルでデータ復旧時も追跡</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#854d0e">ツヤ消しの黒は赤外線で熱を逃がす科学のワザ！さらにVPG800保証と番号も永久刻印</text>
      `);

    case 'cfe_diff_85ohm_serpentine':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <path d="M24 38 H44 V28 H54 V48 H64 V28 H74 V38 H108" fill="none" stroke="#d97706" stroke-width="2.2"/>
        <path d="M24 58 H44 V48 H54 V68 H64 V48 H74 V58 H108" fill="none" stroke="#0284c7" stroke-width="2.2"/>
        <text x="66" y="77" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#92400e">ΔL &lt; 0.125mm 同時到着!</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b45309">差動85Ω / 16GT/s等長配線</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">C38 85Ω差動ペア＆蛇行等長配線</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・クネクネ遠回りで2線の到達時間をピコ秒一致</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・85Ω整合で16GT/s信号の反射ノイズをゼロ化</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・プラス／マイナス逆相伝送で外部雑音を相殺</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">カーブの内側だけクネクネ道を作り、毎秒160億回の信号が1兆分の1秒もズレずゴール！</text>
      `);

    case 'cfe_backdrilled_microvias':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="24" y="26" width="84" height="48" fill="#14532d" opacity="0.18" stroke="#166534"/>
        <line x1="24" y1="38" x2="108" y2="38" stroke="#94a3b8" stroke-dasharray="2 2"/>
        <line x1="24" y1="50" x2="108" y2="50" stroke="#94a3b8" stroke-dasharray="2 2"/>
        <line x1="24" y1="62" x2="108" y2="62" stroke="#94a3b8" stroke-dasharray="2 2"/>
        <rect x="40" y="26" width="6" height="24" fill="#d97706"/>
        <rect x="74" y="26" width="6" height="36" fill="#0284c7"/>
        <rect x="74" y="62" width="6" height="12" fill="none" stroke="#ef4444" stroke-dasharray="2 1"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b45309">φ50μm極細ビア＋スタブ除去</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">C39 マイクロビア＆バックドリル</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・UVレーザーφ50μm縦穴で8層間を最短接続</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・余分な袋小路(スタブ)を削り信号反射を根絶</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・チップ直下の銅充填ビアが熱も裏面へ逃がす</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">8階建て基板のフロア間を最短で結び、電波が反響する袋小路を削り取るレーザー縦穴</text>
      `);

    case 'cfe_efuse_hotplug_switch':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <path d="M24 68 L38 68 Q56 68 74 34 L106 34" fill="none" stroke="#0284c7" stroke-width="2.4"/>
        <path d="M24 68 L44 26 L56 68" fill="none" stroke="#ef4444" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="48" y="25" text-anchor="middle" font-size="5.4" fill="#dc2626">突入スパイク抑制</text>
        <text x="86" y="52" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#0369a1">滑らか起動</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0369a1">OVP 3.8V遮断 &lt;2μs＋逆流防止</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#075985">C40 eFuse＆ソフトスタートIC</text>
        <text x="136" y="43" font-size="6.9" fill="#0c4a6e">・カード挿入時のドッと流れる突入電流を制御</text>
        <text x="136" y="56" font-size="6.9" fill="#0c4a6e">・粗悪リーダーの過電圧(5V誤印加)を2μs遮断</text>
        <text x="136" y="69" font-size="6.9" fill="#0c4a6e">・PLP停電時にカード電荷の逆流を完全阻止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#075985">水道蛇口をゆっくり開くように電源を立ち上げ、異常電圧は一瞬で止める電子ドアマン</text>
      `);

    case 'cfe_ferrite_cm_choke':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f8fafc" stroke="#475569"/>
        <rect x="24" y="28" width="26" height="20" rx="2" fill="#dc2626"/>
        <text x="37" y="41" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">デジタル</text>
        <rect x="54" y="32" width="20" height="12" rx="2" fill="#334155"/>
        <text x="64" y="40" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fbbf24">FB</text>
        <rect x="78" y="28" width="30" height="20" rx="2" fill="#0284c7"/>
        <text x="93" y="41" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">PCIe PHY</text>
        <text x="66" y="66" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#334155">DC通過 / GHz雑音吸収</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#475569">電源間クロストーク &gt;30dB減</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#475569"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">C41 電源系統フェライトフィルタ</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・直流電源はロスなく通し高周波雑音だけ消去</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・NAND書込の電源揺れから高速PHYを隔離</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・100MHz PLLのジッター低減で通信安定化</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">力仕事の電源揺れが繊細な超高速通信へ響かないよう仕切る、磁性体の防音カーテン</text>
      `);

    case 'cfe_pcie_sideband_logic':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <rect x="24" y="28" width="36" height="40" rx="3" fill="#dc2626"/>
        <text x="42" y="46" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#fff">録画中</text>
        <text x="42" y="58" text-anchor="middle" font-size="5.8" fill="#fecaca">3.5 W</text>
        <path d="M62 48 L72 48" stroke="#16a34a" stroke-width="2"/>
        <rect x="74" y="48" width="34" height="20" rx="3" fill="#16a34a"/>
        <text x="91" y="58" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#fff">L1.2</text>
        <text x="91" y="66" text-anchor="middle" font-size="5.2" fill="#dcfce7">5 mW!</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#15803d">CLKREQ# 待機電力99.8%減</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#166534">C42 PERST#/CLKREQ#省電力制御</text>
        <text x="136" y="43" font-size="6.9" fill="#14532d">・撮影スキマ時間に5mWの深い眠り(L1.2)へ</text>
        <text x="136" y="56" font-size="6.9" fill="#14532d">・シャッター半押し数十μsで16GT/s即復帰</text>
        <text x="136" y="69" font-size="6.9" fill="#14532d">・カメラ電池消費と待機中のカード発熱を激減</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#166534">カメラと合図し合い、撮っていない一瞬だけ0.005Wへお昼寝してバッテリーを長持ち！</text>
      `);

    case 'cfe_plp_cap_health_mcu':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fefce8" stroke="#eab308"/>
        <rect x="24" y="28" width="34" height="26" rx="3" fill="#eab308"/>
        <text x="41" y="44" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#713f12">PLP蓄電</text>
        <path d="M62 34 L82 48 L104 62" fill="none" stroke="#16a34a" stroke-width="2.2"/>
        <path d="M62 34 L76 62" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="86" y="34" text-anchor="middle" font-size="5.5" font-weight="bold" fill="#15803d">dV/dt測定</text>
        <text x="66" y="74" text-anchor="middle" font-size="5.5" fill="#854d0e">起動毎C/ESR自動診断</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#a16207">非常用エネルギー健全性保証</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#eab308"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#854d0e">C43 PLPコンデンサ健全性監視</text>
        <text x="136" y="43" font-size="6.9" fill="#713f12">・電源ONのたび停電保護コンデンサを自動検査</text>
        <text x="136" y="56" font-size="6.9" fill="#713f12">・微小放電傾きから残存容量CとESRを算出</text>
        <text x="136" y="69" font-size="6.9" fill="#713f12">・劣化検知時は警告＆安全な直書モードへ移行</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#854d0e">いざという時の非常用コンデンサが本当に働くか、毎回カメラ起動時にテストする点検係</text>
      `);

    case 'cfe_jtag_uart_test_pads':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <rect x="28" y="26" width="76" height="48" rx="3" fill="#14532d"/>
        <circle cx="42" cy="40" r="5" fill="#facc15"/>
        <circle cx="58" cy="40" r="5" fill="#facc15"/>
        <circle cx="74" cy="40" r="5" fill="#facc15"/>
        <circle cx="90" cy="40" r="5" fill="#facc15"/>
        <circle cx="42" cy="58" r="5" fill="#facc15"/>
        <circle cx="58" cy="58" r="5" fill="#facc15"/>
        <circle cx="74" cy="58" r="5" fill="#facc15"/>
        <circle cx="90" cy="58" r="5" fill="#ef4444"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b45309">UART / JTAG / ROM診断口</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">C44 工場JTAG/UARTテストパッド</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・出荷前にNAND全ブロックをRDT全数選別</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・ファーム書込とLDPC最適しきい値校正を実施</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・出荷後はJTAGを暗号ロックし不正読出を防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">工場の全数検査や専門家のデータ復旧のときだけ聴診器のように使う基板端の秘密の端子</text>
      `);

    case 'cfe_optical_fiducials':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fefce8" stroke="#fbbf24"/>
        <rect x="26" y="24" width="80" height="52" rx="3" fill="#14532d"/>
        <circle cx="66" cy="50" r="18" fill="#86efac" opacity="0.35" stroke="#fde047" stroke-dasharray="3 2"/>
        <circle cx="66" cy="50" r="9" fill="#facc15"/>
        <line x1="42" y1="50" x2="90" y2="50" stroke="#ef4444" stroke-width="1"/>
        <line x1="66" y1="26" x2="66" y2="74" stroke="#ef4444" stroke-width="1"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#a16207">±15μm ロボット視覚補正</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fefce8" stroke="#fbbf24"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#854d0e">C45 光学アライメント基準マーク</text>
        <text x="136" y="43" font-size="6.9" fill="#713f12">・基板対角の金丸をロボットカメラが自動認識</text>
        <text x="136" y="56" font-size="6.9" fill="#713f12">・基板のミクロな熱伸縮・回転ズレを補正</text>
        <text x="136" y="69" font-size="6.9" fill="#713f12">・0201砂粒部品と0.35mm BGAを正確に実装</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#854d0e">高速実装ロボットがカメラで狙いを定め、100分の1ミリ精度で部品を載せる金の二重丸</text>
      `);

    case 'cfe_conformal_nano_coat':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <rect x="26" y="58" width="80" height="14" fill="#14532d"/>
        <rect x="44" y="46" width="44" height="12" fill="#1e293b"/>
        <path d="M24 58 L24 42 H108 V58" fill="#06b6d4" opacity="0.28" stroke="#0891b2" stroke-width="1.8"/>
        <circle cx="52" cy="34" r="6" fill="#0284c7"/>
        <circle cx="80" cy="35" r="5" fill="#0284c7"/>
        <text x="66" y="27" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#0e7490">接触角 &gt;110° 超撥水</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0e7490">厚さ &lt;500nm 放熱阻害ゼロ</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfeff" stroke="#06b6d4"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#155e75">C46 プラズマ撥水ナノコーティング</text>
        <text x="136" y="43" font-size="6.9" fill="#164e63">・真空プラズマ成膜でチップ裏までピンホール零</text>
        <text x="136" y="56" font-size="6.9" fill="#164e63">・海辺の潮風塩害や結露腐食ショートを遮断</text>
        <text x="136" y="69" font-size="6.9" fill="#164e63">・髪の毛1/200の薄さで高速チップ放熱を維持</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#155e75">防水シールのさらに内側でハスの葉のように水滴を弾き、結露とサビを二重ガードする膜</text>
      `);

    case 'cfe_solder_mask_silkscreen':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0fdf4" stroke="#15803d"/>
        <rect x="24" y="26" width="84" height="10" fill="#16a34a"/>
        <text x="66" y="33" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Low-Dkレジスト</text>
        <rect x="24" y="38" width="84" height="10" fill="#fef08a" stroke="#ca8a04"/>
        <text x="66" y="45" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#854d0e">16GT/s 信号層</text>
        <rect x="24" y="50" width="84" height="10" fill="#e2e8f0"/>
        <text x="66" y="57" text-anchor="middle" font-size="5.2" fill="#334155">Low-Df絶縁 (Df&lt;0.006)</text>
        <rect x="24" y="62" width="84" height="12" fill="#d97706"/>
        <text x="66" y="70" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">全面銅GND基準面</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#166534">低損失材＋無スリットGND</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdf4" stroke="#15803d"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#166534">C47 Low-Dk絶縁＆全面銅GND層</text>
        <text x="136" y="43" font-size="6.9" fill="#14532d">・GHz電波を吸いにくい特殊低損失基板材を採用</text>
        <text x="136" y="56" font-size="6.9" fill="#14532d">・信号直下の全面銅GNDが85Ω整合を厳密維持</text>
        <text x="136" y="69" font-size="6.9" fill="#14532d">・帰還電流ループを最小化しEMIノイズも削減</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#166534">毎秒160億回のF1級信号が途中で弱らないよう、専用サーキット舗装と銅アース床を敷設</text>
      `);

    case 'cfe_flipchip_c4_bumps':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#b45309"/>
        <rect x="26" y="26" width="80" height="18" rx="2" fill="#0f766e"/>
        <text x="66" y="38" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">7nm Siダイ (うつぶせ)</text>
        <circle cx="36" cy="52" r="5" fill="#cbd5e1" stroke="#d97706" stroke-width="1.5"/>
        <circle cx="51" cy="52" r="5" fill="#cbd5e1" stroke="#d97706" stroke-width="1.5"/>
        <circle cx="66" cy="52" r="5" fill="#cbd5e1" stroke="#d97706" stroke-width="1.5"/>
        <circle cx="81" cy="52" r="5" fill="#cbd5e1" stroke="#d97706" stroke-width="1.5"/>
        <circle cx="96" cy="52" r="5" fill="#cbd5e1" stroke="#d97706" stroke-width="1.5"/>
        <rect x="24" y="58" width="84" height="14" rx="2" fill="#14532d"/>
        <text x="66" y="67" text-anchor="middle" font-size="5.4" fill="#e2e8f0">パッケージ基板</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#92400e">高さ50μm直結 / 寄生L 1/20</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#b45309"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">C48 フリップチップC4バンプ接続</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・長い金の糸を廃止し数百の極小ハンダ粒で直結</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・16GT/s PCIeと3600MT/s NANDの爆速動作を実現</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・ダイ裏面が上を向き上面放熱板へ直接排熱</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">シリコン頭脳をうつぶせにして数百個の銅柱＆ハンダ粒で最短直結する先端高速実装</text>
      `);

    case 'cfe_abf_package_substrate':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0fdfa" stroke="#0f766e"/>
        <rect x="44" y="24" width="44" height="12" fill="#0284c7"/>
        <text x="66" y="32" text-anchor="middle" font-size="5.3" font-weight="bold" fill="#fff">50μm間隔</text>
        <path d="M52 36 L34 62 M61 36 L55 62 M71 36 L77 62 M80 36 L98 62" stroke="#eab308" stroke-width="1.8"/>
        <rect x="24" y="62" width="84" height="12" rx="2" fill="#0f766e"/>
        <text x="66" y="70" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">0.4mm BGAへ8倍展開</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0f766e">線幅10μm 日本発ABF基板</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0fdfa" stroke="#0f766e"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#115e59">C49 多層ABF基板＆RDL再配線</text>
        <text x="136" y="43" font-size="6.9" fill="#134e4a">・味の素開発のABF絶縁材で線幅10μm多層配線</text>
        <text x="136" y="56" font-size="6.9" fill="#134e4a">・50μm極細端子を0.4mm基板端子へ扇状変換</text>
        <text x="136" y="69" font-size="6.9" fill="#134e4a">・厚さ0.15mm極薄で2.8mmカード厚に収容</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#115e59">ミクロのシリコン端子とカード基板のハンダ粒を扇状に美しく繋ぐ日本発の翻訳基板</text>
      `);

    case 'cfe_nand_staggered_16die':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <rect x="24" y="66" width="56" height="6" fill="#0284c7"/>
        <rect x="28" y="59" width="56" height="6" fill="#0ea5e9"/>
        <rect x="32" y="52" width="56" height="6" fill="#0284c7"/>
        <rect x="36" y="45" width="56" height="6" fill="#cbd5e1"/>
        <rect x="40" y="38" width="56" height="6" fill="#0ea5e9"/>
        <rect x="44" y="31" width="56" height="6" fill="#0284c7"/>
        <rect x="48" y="24" width="56" height="6" fill="#38bdf8"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0369a1">30μm極薄ダイ×16段階段積層</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#075985">C50 16段階段状積層NANDダイ</text>
        <text x="136" y="43" font-size="6.9" fill="#0c4a6e">・髪の毛半分の30μmまで削ったシリコンを16段</text>
        <text x="136" y="56" font-size="6.9" fill="#0c4a6e">・少しずつズラして全層の電極パッドを露出</text>
        <text x="136" y="69" font-size="6.9" fill="#0c4a6e">・16枚同時並列書込で2TB容量と爆速を両立</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#075985">トランプを階段状に16枚ズラして積み上げ、切手1枚に2TBの8K動画を詰め込む神業</text>
      `);

    case 'cfe_nand_daf_gold_wires':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <rect x="24" y="56" width="54" height="10" fill="#0284c7"/>
        <rect x="24" y="53" width="54" height="3" fill="#f59e0b"/>
        <rect x="28" y="43" width="54" height="10" fill="#0ea5e9"/>
        <rect x="28" y="40" width="54" height="3" fill="#f59e0b"/>
        <rect x="32" y="30" width="54" height="10" fill="#38bdf8"/>
        <path d="M84 35 Q102 35 102 72 M80 48 Q96 48 96 72 M76 61 Q90 61 90 72" fill="none" stroke="#eab308" stroke-width="1.8"/>
        <rect x="24" y="70" width="84" height="6" fill="#14532d"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b45309">DAF 10μm＋φ18μm多段金線</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">C51 DAF接着膜＆多段金ワイヤー</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・0.01mm固体両面テープDAFではみ出しゼロ貼付</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・クモの糸より細い金/銅線で16層を低ループ結線</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・FOW樹脂が下段ワイヤーを優しく包みショート防止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">16枚の極薄シリコンを0.01mmテープで貼り合わせ、何百本もの極細アーチ金線で結ぶ技</text>
      `);

    case 'cfe_nand_emc_mold_balls':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="24" y="24" width="84" height="36" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
        <text x="66" y="40" text-anchor="middle" font-size="6.0" font-weight="bold" fill="#e2e8f0">EMCシリカ88%封止</text>
        <text x="66" y="52" text-anchor="middle" font-size="5.4" fill="#94a3b8">低CTE・高熱伝導モールド</text>
        <circle cx="34" cy="66" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="50" cy="66" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="66" cy="66" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="82" cy="66" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <circle cx="98" cy="66" r="4.5" fill="#cbd5e1" stroke="#475569"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#334155">SAC305鉛フリー 152 BGA球</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">C52 EMC封止樹脂＆BGAボール</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・シリカ88%配合の黒樹脂が16層ダイを堅牢保護</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・-40〜+85°C温度変化でも熱膨張ズレを最小化</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・底面の鉛フリーSAC305ハンダ粒で基板へ接合</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">中の繊細な16層チップと金の糸を丸ごと固めて守る黒い鎧と、基板へ繋ぐ数百のハンダ粒</text>
      `);

    case 'cfe_hmb_sram_controller_buf':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f5f3ff" stroke="#8b5cf6"/>
        <rect x="24" y="28" width="38" height="40" rx="3" fill="#6d28d9"/>
        <text x="43" y="46" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">内蔵SRAM</text>
        <text x="43" y="57" text-anchor="middle" font-size="5.3" fill="#ddd6fe">&lt; 2 ns</text>
        <path d="M62 48 H74" stroke="#eab308" stroke-width="2.2"/>
        <rect x="74" y="28" width="34" height="40" rx="3" fill="#0284c7"/>
        <text x="91" y="46" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">HMB</text>
        <text x="91" y="57" text-anchor="middle" font-size="5.2" fill="#bae6fd">ホストRAM</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#6d28d9">DRAMレス省電力30%減＆爆速</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f5f3ff" stroke="#8b5cf6"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#5b21b6">C53 内蔵SRAM＆NVMe HMB機構</text>
        <text x="136" y="43" font-size="6.9" fill="#4c1d95">・頭脳チップ内蔵の超高速SRAMで連写を吸収</text>
        <text x="136" y="56" font-size="6.9" fill="#4c1d95">・必要時はPCIe経由でホストRAMを間借り(HMB)</text>
        <text x="136" y="69" font-size="6.9" fill="#4c1d95">・Phison E27T / SMI SM2269XT等の省発熱技術</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#5b21b6">超狭いType Aで省電力と爆速を両立する、チップ内蔵メモ帳とホストメモリ間借りの技</text>
      `);

    case 'cfe_cba_cu_hybrid_bond':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <rect x="24" y="24" width="84" height="18" rx="2" fill="#0284c7"/>
        <text x="66" y="36" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fff">3D記憶セルウェハ</text>
        <rect x="30" y="42" width="10" height="10" fill="#d97706"/>
        <rect x="48" y="42" width="10" height="10" fill="#d97706"/>
        <rect x="66" y="42" width="10" height="10" fill="#d97706"/>
        <rect x="84" y="42" width="10" height="10" fill="#d97706"/>
        <rect x="24" y="52" width="84" height="18" rx="2" fill="#1e293b"/>
        <text x="66" y="64" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#fde047">最先端CMOSウェハ</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#b45309">BiCS8 CBA: 効率+70% / 3600MT/s</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#92400e">C54 CBAウェハ直接Cu-Cu接合</text>
        <text x="136" y="43" font-size="6.9" fill="#78350f">・記憶層と高速CMOSを別工場で最適製造し合体</text>
        <text x="136" y="56" font-size="6.9" fill="#78350f">・数百万個のミクロ銅パッドで直接ハイブリッド接合</text>
        <text x="136" y="69" font-size="6.9" fill="#78350f">・BiCS8〜10/MSA-CBAで2026年大容量時代を牽引</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#92400e">マンションと管理人室を別々の最強工場で作ってから銅でピタッと合体する2026年の革命</text>
      `);

    case 'cfe_crossed_bitline_cbl':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <rect x="24" y="24" width="84" height="24" rx="2" fill="#bae6fd" stroke="#0284c7"/>
        <line x1="28" y1="32" x2="104" y2="32" stroke="#d97706" stroke-width="1.8"/>
        <line x1="28" y1="40" x2="104" y2="40" stroke="#d97706" stroke-width="1.8"/>
        <line x1="46" y1="26" x2="46" y2="46" stroke="#0369a1" stroke-width="1.8"/>
        <line x1="86" y1="26" x2="86" y2="46" stroke="#0369a1" stroke-width="1.8"/>
        <rect x="24" y="52" width="84" height="22" rx="2" fill="#334155"/>
        <text x="66" y="65" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#38bdf8">直下CMOS(CuA/4-6面並列)</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#0369a1">面積効率88%＋CBL低容量配線</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f0f9ff" stroke="#0ea5e9"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#075985">C55 クロスビットライン＆直下CMOS</text>
        <text x="136" y="43" font-size="6.9" fill="#0c4a6e">・周辺回路を記憶セルの真下へ収納し面積最大化</text>
        <text x="136" y="56" font-size="6.9" fill="#0c4a6e">・BiCS8新技術CBL立体交差でビット線容量削減</text>
        <text x="136" y="69" font-size="6.9" fill="#0c4a6e">・4〜6独立プレーン並列動作で高速連写を実現</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#075985">管理人室をマンションの真下へしまい込み、立体交差配線で信号渋滞まで解消する最新設計</text>
      `);

    case 'cfe_ono_charge_trap_stack':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <rect x="24" y="26" width="16" height="48" fill="#475569"/>
        <rect x="40" y="26" width="12" height="48" fill="#bae6fd"/>
        <rect x="52" y="26" width="18" height="48" fill="#a855f7"/>
        <rect x="70" y="26" width="16" height="48" fill="#fde68a"/>
        <rect x="86" y="26" width="22" height="48" fill="#64748b"/>
        <circle cx="61" cy="40" r="3" fill="#fff"/>
        <circle cx="61" cy="54" r="3" fill="#fff"/>
        <text x="61" y="70" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Si₃N₄</text>
        <text x="97" y="52" text-anchor="middle" font-size="5.2" font-weight="bold" fill="#fff">Gate</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#7e22ce">O(5nm)|N(6nm)|O+Al₂O₃遮断</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#faf5ff" stroke="#a855f7"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#6b21a8">C56 原子レベルONO電荷捕獲膜</text>
        <text x="136" y="43" font-size="6.9" fill="#581c87">・トンネル酸化膜を電子が量子トンネル通過</text>
        <text x="136" y="56" font-size="6.9" fill="#581c87">・窒化シリコン捕獲層が電子を無電源で長期保持</text>
        <text x="136" y="69" font-size="6.9" fill="#581c87">・アルミナ遮断膜がゲート側への電子漏れを阻止</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#6b21a8">電源を切っても写真データが消えない秘密は、わずか数ナノメートルの3重サンドイッチ壁</text>
      `);

    case 'cfe_wordline_staircase':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <rect x="24" y="66" width="84" height="7" fill="#334155"/>
        <rect x="24" y="56" width="70" height="7" fill="#475569"/>
        <rect x="24" y="46" width="56" height="7" fill="#334155"/>
        <rect x="24" y="36" width="42" height="7" fill="#475569"/>
        <line x1="100" y1="22" x2="100" y2="66" stroke="#eab308" stroke-width="2"/>
        <line x1="86" y1="22" x2="86" y2="56" stroke="#eab308" stroke-width="2"/>
        <line x1="72" y1="22" x2="72" y2="46" stroke="#eab308" stroke-width="2"/>
        <line x1="58" y1="22" x2="58" y2="36" stroke="#eab308" stroke-width="2"/>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#334155">300層W/Moワード線階段配線</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#f8fafc" stroke="#64748b"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#0f172a">C57 W/Moワード線階段デコーダ</text>
        <text x="136" y="43" font-size="6.9" fill="#334155">・アレイ端をピラミッド階段状に削り全層配線</text>
        <text x="136" y="56" font-size="6.9" fill="#334155">・232〜300+層の1階ずつへ独立して電圧印加</text>
        <text x="136" y="69" font-size="6.9" fill="#334155">・次世代モリブデン(Mo)金属化で抵抗を大幅減</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#334155">300階建て記憶マンションの端を階段状に削り、各フロアへ電線を垂直に降ろす神構造</text>
      `);

    case 'cfe_nand_charge_pump':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <rect x="24" y="56" width="14" height="16" fill="#0284c7"/>
        <rect x="42" y="48" width="14" height="24" fill="#eab308"/>
        <rect x="60" y="40" width="14" height="32" fill="#f59e0b"/>
        <rect x="78" y="32" width="14" height="40" fill="#f97316"/>
        <rect x="96" y="24" width="12" height="48" fill="#dc2626"/>
        <text x="31" y="52" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#0369a1">3.3V</text>
        <text x="100" y="22" text-anchor="middle" font-size="5.6" font-weight="bold" fill="#b91c1c">20V</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#dc2626">ISPP ΔV=0.3V 精密昇圧</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#fef2f2" stroke="#ef4444"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#991b1b">C58 20Vオンダイチャージポンプ</text>
        <text x="136" y="43" font-size="6.9" fill="#7f1d1d">・3.3V電源をチップ内で瞬間20Vへバケツリレー</text>
        <text x="136" y="56" font-size="6.9" fill="#7f1d1d">・段階的パルス(ISPP)でTLC 8階調を精密書込</text>
        <text x="136" y="69" font-size="6.9" fill="#7f1d1d">・消去時は逆20Vパルスで捕獲電子を一斉解放</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#991b1b">外部電源3.3Vからチップ内部で20Vを生み出し、電子を記憶壁へ押し込む内蔵昇圧ポンプ</text>
      `);

    case 'cfe_sense_amp_page_buf':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <path d="M24 68 Q28 42 32 68 Q38 42 42 68 Q48 42 52 68 Q58 42 62 68 Q68 42 72 68 Q78 42 82 68 Q88 42 92 68 Q98 42 104 68" fill="none" stroke="#2563eb" stroke-width="1.8"/>
        <text x="64" y="34" text-anchor="middle" font-size="5.8" font-weight="bold" fill="#1d4ed8">TLC 8段階 (000〜111)</text>
        <text x="64" y="77" text-anchor="middle" font-size="5.4" fill="#1e40af">16KB並列センス tR ≈ 35μs</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#1d4ed8">ソフト判定LLR → LDPC連携</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#1e3a8a">C59 16KBページバッファ＆センス</text>
        <text x="136" y="43" font-size="6.9" fill="#1e40af">・極微弱なナノ電流から8段階の電圧差を判定</text>
        <text x="136" y="56" font-size="6.9" fill="#1e40af">・14万ビットを35μsで並列ラッチし連続出力</text>
        <text x="136" y="69" font-size="6.9" fill="#1e40af">・曖昧なセルは確率情報(ソフト判定)で完全復元</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#1e3a8a">1セルの8段階の微妙な電圧差を何万個もの超精密な耳で一斉に聞き分ける聴覚器官</text>
      `);

    case 'cfe_read_reclaim_scrub':
      return wrapSvg(`
        <rect x="18" y="18" width="96" height="64" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <rect x="24" y="42" width="28" height="28" rx="3" fill="#fde047" stroke="#ca8a04"/>
        <text x="38" y="58" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#854d0e">薄れ予兆</text>
        <path d="M52 44 Q66 22 80 44" fill="none" stroke="#10b981" stroke-width="2.4"/>
        <polygon points="82,46 76,40 84,38" fill="#10b981"/>
        <rect x="80" y="42" width="28" height="28" rx="3" fill="#10b981" stroke="#047857"/>
        <text x="94" y="58" text-anchor="middle" font-size="5.4" font-weight="bold" fill="#fff">新品再書込</text>
        <text x="66" y="92" text-anchor="middle" font-size="5.9" font-weight="bold" fill="#047857">Early-Move / Read-Reclaim</text>
        <rect x="128" y="14" width="182" height="74" rx="5" fill="#ecfdf5" stroke="#10b981"/>
        <text x="136" y="29" font-size="7.4" font-weight="bold" fill="#065f46">C60 自動巡回データ修復パトロール</text>
        <text x="136" y="43" font-size="6.9" fill="#064e3b">・頻回再生による読出劣化(リードディスターブ)監視</text>
        <text x="136" y="56" font-size="6.9" fill="#064e3b">・エラーが増える前に自動で新鮮ブロックへ引越し</text>
        <text x="136" y="69" font-size="6.9" fill="#064e3b">・8K収録データの長期保持UBER &lt; 10⁻¹⁷を死守</text>
        <text x="160" y="106" text-anchor="middle" font-size="6.9" fill="#065f46">読みすぎや高温で電子が薄れかけた記録を、消える前に新しい部屋へ引っ越す見回り隊</text>
      `);

    default:
      return null;
  }
}
